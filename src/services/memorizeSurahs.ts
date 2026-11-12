import { useSyncExternalStore } from "react";

/**
 * "Memorize surahs" in Practice: the stars each surah (or part of a longer one) has on this phone, the best of its
 * tries. Like a lesson's: three with no mistake, two with one or two, one with more.
 */
const KEY = "sira-path-memorize-stars" as const;
export type MemorizeStars = Readonly<Record<string, number>>;
const listeners = new Set<() => void>();
let memory: MemorizeStars | undefined;
const EMPTY: MemorizeStars = {};

function storage(): typeof import("./appStorage") | null {
  try {
    return require("./appStorage") as typeof import("./appStorage");
  } catch {
    return null;
  }
}

function read(): MemorizeStars {
  if (memory) return memory;
  try {
    const raw = storage()?.getStoredItem(KEY);
    const saved = raw ? (JSON.parse(raw) as Record<string, unknown>) : {};
    const kept: Record<string, number> = {};
    for (const [part, stars] of Object.entries(saved ?? {})) {
      if (typeof stars === "number" && Number.isFinite(stars) && stars >= 1) kept[part] = Math.min(3, Math.floor(stars));
    }
    memory = kept;
  } catch {
    memory = EMPTY;
  }
  return memory;
}

export function memorizeStars() {
  return read();
}

/** Keeps a finished try's stars. True when they are more than the part had. */
export function recordMemorized(part: string, stars: number) {
  const before = read();
  const earned = Math.max(1, Math.min(3, Math.floor(stars)));
  if ((before[part] ?? 0) >= earned) return false;
  memory = { ...before, [part]: earned };
  try {
    storage()?.setStoredItem(KEY, JSON.stringify(memory));
  } catch {
    // Kept for this run.
  }
  for (const listener of listeners) listener();
  return true;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useMemorizeStars() {
  return useSyncExternalStore(subscribe, read, read);
}

/** For tests. */
export function resetMemorizeForTests() {
  memory = undefined;
  storage()?.setStoredItem(KEY, "");
}
