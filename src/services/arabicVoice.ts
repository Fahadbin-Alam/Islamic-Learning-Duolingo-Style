import * as Speech from "expo-speech";
import { QURAN_AYAHS } from "../data/quranAyahs";
import { QURAN_AUDIO_SOURCE, globalAyahNumber, parseQuranReference } from "./quranAudio";

/**
 * How a learn card's Arabic word is said aloud:
 * - a word that is a whole ayah, or part of the ayah its card cites, plays the reciter (see quranAudio.ts),
 *   never a robot voice;
 * - any other word uses the phone's own Arabic voice, but only when the phone has one. Without one
 *   the browser or phone reads the Arabic letters with an English voice and says the wrong thing, so the
 *   speaker button is hidden instead.
 */

/** Letters only: no vowel marks, Quran stop signs, tatweel or alifs, and one form of alif/ya/ta marbuta. */
export function arabicLetters(text: string) {
  return text
    .replace(/[ؐ-ًؚ-ٰٟۖ-ۭـ]/g, "")
    .replace(/[ٱأإآا]/g, "")
    .replace(/[ىی]/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/\s+/g, " ")
    .trim();
}

const AYAH_BY_LETTERS = new Map(
  Object.keys(QURAN_AYAHS).map((key) => {
    const [surah, ayah] = key.split(":").map(Number);
    return [arabicLetters(QURAN_AYAHS[key]), { surah, ayah }] as const;
  })
);

const recitationUrl = (key: { surah: number; ayah: number }) => QURAN_AUDIO_SOURCE.urlTemplate.replace("{n}", String(globalAyahNumber(key)));

/**
 * The recitation for a learn card's Arabic word, or null:
 * - a word that is exactly one whole ayah (Al-hamdu lillahi rabbil-alamin) plays that ayah;
 * - a word taken from the one ayah the card cites (As-sirat al-mustaqim from "Quran 1:6") plays that ayah,
 *   but only when the word really is in it, so a word that merely cites an ayah never plays the wrong verse.
 */
export function recitationForArabic(text: string, references: Array<string | undefined> = []) {
  const letters = arabicLetters(text);
  const whole = AYAH_BY_LETTERS.get(letters);
  if (whole) {
    return recitationUrl(whole);
  }
  for (const reference of references) {
    const key = parseQuranReference(reference);
    const ayah = key ? QURAN_AYAHS[`${key.surah}:${key.ayah}`] : undefined;
    if (key && ayah && letters.length > 0 && arabicLetters(ayah).includes(letters)) {
      return recitationUrl(key);
    }
  }
  return null;
}

let arabicVoice: Promise<string | null> | null = null;

async function listVoices(): Promise<Speech.Voice[]> {
  // The web list can stay empty with no event when the browser has no voices: give up after a moment.
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<Speech.Voice[]>((resolve) => {
    timer = setTimeout(() => resolve([]), 1500);
  });
  try {
    return await Promise.race([Speech.getAvailableVoicesAsync(), timeout]);
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

/**
 * The id of an Arabic voice on this device, or null when it has none. A voice found is kept; "none" is asked
 * again next time, since the speech engine can still be starting, or the learner may install a voice.
 */
export function findArabicVoice(): Promise<string | null> {
  if (!arabicVoice) {
    const lookup = (async () => {
      let voices = await listVoices();
      if (voices.length === 0) {
        // Android and browsers fill the list a moment after start-up.
        await new Promise((resolve) => setTimeout(resolve, 1000));
        voices = await listVoices();
      }
      return voices.find((voice) => voice.language?.toLowerCase().startsWith("ar"))?.identifier ?? null;
    })();
    arabicVoice = lookup;
    void lookup.then((id) => {
      if (!id && arabicVoice === lookup) {
        arabicVoice = null;
      }
    });
  }
  return arabicVoice;
}

/** Tests only. */
export function resetArabicVoiceForTests() {
  arabicVoice = null;
}
