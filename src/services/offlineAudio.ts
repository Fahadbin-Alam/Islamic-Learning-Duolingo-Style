import { Platform } from "react-native";
import type { Directory, File } from "expo-file-system";
import { QURAN_AYAHS } from "../data/quranAyahs";
import { QURAN_AUDIO_SOURCE, globalAyahNumber } from "./quranAudio";

/**
 * Quran recitations kept on the phone, so Listen works with no internet.
 * - Settings has "Quran audio offline": it saves every ayah the app can recite (the ones in QURAN_AYAHS,
 *   which the lesson quotes and word cards take their Arabic from) in one go, and can remove them again.
 * - An ayah that played once from the internet is saved too, so the ayahs a learner already met keep working
 *   offline even without the full download.
 * Files live in the app's own documents folder, one per ayah, named by its number through the whole Quran.
 * The web app has no file storage for this, and streams as before.
 */
export type QuranPack = {
  saved: number;
  total: number;
  /** Bytes on the phone, 0 when nothing is saved. */
  bytes: number;
  status: "idle" | "saving" | "error";
};

// Loaded on first use, so screens and tests that never save audio do not start the file module.
const fileSystem = () => require("expo-file-system") as typeof import("expo-file-system");

/** How many recitations download at the same time. */
const PARALLEL_DOWNLOADS = 4;

export function offlineAudioSupported() {
  return Platform.OS === "ios" || Platform.OS === "android";
}

/** The recitation urls of every ayah the app can play, in Quran order. */
export function offlineAyahUrls() {
  return Object.keys(QURAN_AYAHS)
    .map((key) => {
      const [surah, ayah] = key.split(":").map(Number);
      return globalAyahNumber({ surah, ayah });
    })
    .sort((a, b) => a - b)
    .map((number) => QURAN_AUDIO_SOURCE.urlTemplate.replace("{n}", String(number)));
}

function folder(): Directory {
  const { Directory: Folder, Paths } = fileSystem();
  return new Folder(Paths.document, QURAN_AUDIO_SOURCE.offlineFolder);
}

/** "…/ar.alafasy/2.mp3" is kept as "2.mp3". Only this source's recitations are saved. */
function fileName(url: string) {
  const [prefix, suffix] = QURAN_AUDIO_SOURCE.urlTemplate.split("{n}");
  if (!url.startsWith(prefix) || !url.endsWith(suffix)) {
    return null;
  }
  const number = url.slice(prefix.length, url.length - suffix.length);
  return /^\d{1,4}$/.test(number) ? `${number}${suffix.slice(suffix.lastIndexOf("."))}` : null;
}

function savedFile(url: string): File | null {
  const name = fileName(url);
  if (!name || !offlineAudioSupported()) {
    return null;
  }
  const { File: SavedFile } = fileSystem();
  return new SavedFile(folder(), name);
}

/** The saved copy's file uri to play, or null when the ayah is not on the phone. */
export function localAyahUri(url: string) {
  try {
    const file = savedFile(url);
    return file && file.exists && file.size > 0 ? file.uri : null;
  } catch {
    return null;
  }
}

/** Saves one recitation. True when it is on the phone afterwards. A failed download leaves nothing behind. */
export async function saveAyahForOffline(url: string) {
  try {
    const file = savedFile(url);
    if (!file) {
      return false;
    }
    if (file.exists && file.size > 0) {
      return true;
    }
    const { File: SavedFile } = fileSystem();
    const dir = folder();
    dir.create({ intermediates: true, idempotent: true });
    // Downloaded under another name first, so a cut-off download never looks like a saved ayah.
    const part = new SavedFile(dir, `${file.name}.part`);
    if (part.exists) {
      part.delete();
    }
    try {
      const downloaded = await SavedFile.downloadFileAsync(url, part, { idempotent: true });
      downloaded.move(file);
    } catch (error) {
      if (part.exists) {
        part.delete();
      }
      throw error;
    }
    return true;
  } catch {
    return false;
  }
}

let pack: QuranPack = { saved: 0, total: 0, bytes: 0, status: "idle" };
let stopRequested = false;
const listeners = new Set<(next: QuranPack) => void>();

function setPack(next: Partial<QuranPack>) {
  pack = { ...pack, ...next };
  listeners.forEach((listener) => listener(pack));
}

function countSaved() {
  const urls = offlineAyahUrls();
  let saved = 0;
  let bytes = 0;
  for (const url of urls) {
    try {
      const file = savedFile(url);
      if (file?.exists && file.size > 0) {
        saved += 1;
        bytes += file.size;
      }
    } catch {
      // An unreadable file counts as not saved.
    }
  }
  return { saved, total: urls.length, bytes };
}

/** What is on the phone now. Reads the folder again, unless a download is running. */
export function getQuranPack() {
  if (pack.status !== "saving") {
    pack = { ...pack, ...countSaved() };
  }
  return pack;
}

export function subscribeQuranPack(listener: (next: QuranPack) => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Saves every ayah not saved yet. Run again after an error to pick up where it stopped. */
export async function downloadQuranPack() {
  if (pack.status === "saving" || !offlineAudioSupported()) {
    return pack;
  }
  stopRequested = false;
  const urls = offlineAyahUrls();
  const missing = urls.filter((url) => !localAyahUri(url));
  setPack({ ...countSaved(), status: "saving" });
  let failed = false;
  let next = 0;

  const worker = async () => {
    while (!stopRequested && next < missing.length) {
      const url = missing[next];
      next += 1;
      if (await saveAyahForOffline(url)) {
        setPack({ saved: pack.saved + 1 });
      } else {
        failed = true;
      }
    }
  };

  await Promise.all(Array.from({ length: Math.min(PARALLEL_DOWNLOADS, missing.length) }, worker));
  setPack({ ...countSaved(), status: failed && !stopRequested ? "error" : "idle" });
  return pack;
}

/** Stops a running download; what was saved stays. */
export function stopQuranPack() {
  stopRequested = true;
}

/** Deletes every saved recitation. */
export function removeQuranPack() {
  stopRequested = true;
  try {
    const dir = folder();
    if (dir.exists) {
      dir.delete();
    }
  } catch {
    // Nothing to remove.
  }
  setPack({ ...countSaved(), status: "idle" });
}

/** Tests only. */
export function resetQuranPackForTests() {
  pack = { saved: 0, total: 0, bytes: 0, status: "idle" };
  stopRequested = false;
  listeners.clear();
}
