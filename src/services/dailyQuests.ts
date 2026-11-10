import { useSyncExternalStore } from "react";

/**
 * Daily quests: three small goals a day (finish lessons, get answers right in a row, a perfect lesson...), and a
 * chest of dates once all three are done. A new set each day, the same for the whole day. Kept on this phone (a day's
 * quests are a game, not progress to sync); the dates from the chest go on the learner's profile like any reward.
 */
export type QuestKind = "lessons" | "inARow" | "perfect" | "correct" | "xp";
export type Quest = { id: string; kind: QuestKind; target: number };
export type QuestDay = { day: string; progress: Partial<Record<string, number>>; claimed: boolean };

/** Dates in the chest for finishing all of a day's quests. */
export const QUEST_CHEST_DATES = 10;

const KEY = "sira-path-daily-quests" as const;

/** What can be asked, with a few sizes each; the day picks one size. */
const POOL: { kind: QuestKind; targets: number[] }[] = [
  { kind: "inARow", targets: [5, 6, 8] },
  { kind: "perfect", targets: [1] },
  { kind: "correct", targets: [12, 15, 20] },
  { kind: "xp", targets: [30, 40, 50] }
];

/** Local calendar day, "2026-11-10". */
export function dayKey(now = new Date()) {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function seedOf(text: string) {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/** The day's three quests: always "finish 2 lessons", and two of the others, steady for the day. */
export function questsFor(day: string): Quest[] {
  const seed = seedOf(day);
  const first = seed % POOL.length;
  const second = (first + 1 + ((seed >>> 4) % (POOL.length - 1))) % POOL.length;
  const pick = (index: number, salt: number) => {
    const { kind, targets } = POOL[index];
    return { id: kind, kind, target: targets[(seed >>> salt) % targets.length] };
  };
  return [{ id: "lessons", kind: "lessons", target: 2 }, pick(first, 8), pick(second, 12)];
}

const listeners = new Set<() => void>();
let memory: QuestDay | undefined;

function storage(): typeof import("./appStorage") | null {
  try {
    return require("./appStorage") as typeof import("./appStorage");
  } catch {
    return null;
  }
}

function read(now = new Date()): QuestDay {
  const today = dayKey(now);
  let saved: QuestDay | undefined = memory;
  try {
    const raw = storage()?.getStoredItem(KEY);
    if (raw) saved = JSON.parse(raw) as QuestDay;
  } catch {
    // A broken save starts the day fresh.
  }
  return saved && saved.day === today ? saved : { day: today, progress: {}, claimed: false };
}

function write(next: QuestDay) {
  memory = next;
  cached = undefined;
  try {
    storage()?.setStoredItem(KEY, JSON.stringify(next));
  } catch {
    // Kept in memory for this run.
  }
  for (const listener of listeners) listener();
}

export type QuestStatus = { quest: Quest; progress: number; done: boolean };
export type QuestBoard = { day: string; quests: QuestStatus[]; doneCount: number; allDone: boolean; claimed: boolean };

export function questBoard(now = new Date()): QuestBoard {
  const saved = read(now);
  const quests = questsFor(saved.day).map((quest) => {
    const progress = Math.min(quest.target, saved.progress[quest.id] ?? 0);
    return { quest, progress, done: progress >= quest.target };
  });
  const doneCount = quests.filter((quest) => quest.done).length;
  return { day: saved.day, quests, doneCount, allDone: doneCount === quests.length, claimed: saved.claimed };
}

export type QuestEvent =
  | { type: "answer"; correct: boolean; inARow: number }
  | { type: "lesson"; perfect: boolean; xp: number };

/** Counts what just happened towards today's quests. Returns the quests this finished (to cheer them). */
export function recordQuestEvent(event: QuestEvent, now = new Date()): Quest[] {
  const saved = read(now);
  const quests = questsFor(saved.day);
  const progress = { ...saved.progress };
  const add = (kind: QuestKind, amount: number) => {
    if (quests.some((quest) => quest.kind === kind)) progress[kind] = (progress[kind] ?? 0) + amount;
  };
  if (event.type === "answer") {
    if (event.correct) add("correct", 1);
    if (quests.some((quest) => quest.kind === "inARow")) progress.inARow = Math.max(progress.inARow ?? 0, event.inARow);
  } else {
    add("lessons", 1);
    if (event.perfect) add("perfect", 1);
    if (event.xp > 0) add("xp", event.xp);
  }
  const finished = quests.filter((quest) => (saved.progress[quest.id] ?? 0) < quest.target && (progress[quest.id] ?? 0) >= quest.target);
  write({ ...saved, progress });
  return finished;
}

/** Opens the day's chest once all three quests are done. Returns the dates it pays (0 if not ready or already open). */
export function claimQuestChest(now = new Date()): number {
  const board = questBoard(now);
  if (!board.allDone || board.claimed) return 0;
  write({ ...read(now), claimed: true });
  return QUEST_CHEST_DATES;
}

let cached: QuestBoard | undefined;
let cachedDay = "";

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function snapshot() {
  const today = dayKey();
  if (!cached || cachedDay !== today) {
    cached = questBoard();
    cachedDay = today;
  }
  return cached;
}

/** Today's quests, drawn again whenever one moves on. */
export function useQuestBoard() {
  return useSyncExternalStore(subscribe, snapshot, snapshot);
}

/** For tests: forget the day. */
export function resetQuestsForTests() {
  memory = undefined;
  cached = undefined;
  storage()?.setStoredItem(KEY, "");
}
