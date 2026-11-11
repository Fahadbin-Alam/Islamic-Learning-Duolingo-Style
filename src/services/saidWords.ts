import { useSyncExternalStore } from "react";

/**
 * "Say it out loud": the words a learner has said with the teacher, kept on this phone so the list can tick them
 * off. Practice only: never scored, never sent anywhere.
 */
const KEY = "sira-path-said-words" as const;
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

export function saidWordIds() {
  return read();
}

/** Marks a word as said. Returns true the first time. */
export function markWordSaid(id: string) {
  const have = read();
  if (have.includes(id)) return false;
  memory = [...have, id];
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

export function useSaidWords() {
  return useSyncExternalStore(subscribe, read, read);
}

/** For tests. */
export function resetSaidWordsForTests() {
  memory = undefined;
  storage()?.setStoredItem(KEY, "");
}
