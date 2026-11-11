import { useSyncExternalStore } from "react";

/**
 * The picture album: every lesson picture a learner has met (Makkah long ago, the Ark, the ant hill...) is kept, so
 * finishing lessons fills an album of living pictures, like collecting postcards of the places Islam's story
 * happened. Kept on this phone (a collection to enjoy, not progress to sync).
 */
const KEY = "sira-path-picture-album" as const;

const listeners = new Set<() => void>();
let memory: string[] | undefined;

function storage(): typeof import("./appStorage") | null {
  try {
    return require("./appStorage") as typeof import("./appStorage");
  } catch {
    return null;
  }
}

function read(): string[] {
  if (memory) return memory;
  try {
    const raw = storage()?.getStoredItem(KEY);
    const saved = raw ? (JSON.parse(raw) as unknown) : [];
    memory = Array.isArray(saved) ? saved.filter((id): id is string => typeof id === "string") : [];
  } catch {
    memory = [];
  }
  return memory;
}

/** The pictures in the album, in the order they were found. */
export function albumPictureIds(): string[] {
  return read();
}

/** Puts the pictures a lesson showed in the album. Returns the ones that are new to it, in the order given. */
export function addToAlbum(ids: (string | undefined)[]): string[] {
  const have = read();
  const fresh = [...new Set(ids.filter((id): id is string => Boolean(id)))].filter((id) => !have.includes(id));
  if (!fresh.length) return [];
  memory = [...have, ...fresh];
  try {
    storage()?.setStoredItem(KEY, JSON.stringify(memory));
  } catch {
    // Kept in memory for this run.
  }
  for (const listener of listeners) listener();
  return fresh;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** The album's pictures, drawn again when one is added. */
export function useAlbum() {
  return useSyncExternalStore(subscribe, read, read);
}

/** For tests: an empty album. */
export function resetAlbumForTests() {
  memory = undefined;
  storage()?.setStoredItem(KEY, "");
}
