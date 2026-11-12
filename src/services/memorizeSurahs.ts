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

/**
 * Review, as those who memorize the Quran go back over what they hold: a part practised with no mistake comes back
 * after a day, then three days, a week, two weeks and a month. A review with no mistake on or after its day moves it
 * to the next gap; a try with any mistake brings it back the next day. A part with three stars from before reviews
 * began, and so no day yet, is ready now.
 */
const REVIEW_KEY = "sira-path-memorize-review" as const;
export const REVIEW_DAYS = [1, 3, 7, 14, 30] as const;
export type MemorizeReview = Readonly<{ /** The local day of its last counted try, "2026-11-12". */ day: string; /** Its gap in REVIEW_DAYS. */ step: number }>;
export type MemorizeReviews = Readonly<Record<string, MemorizeReview>>;
const reviewListeners = new Set<() => void>();
let reviewMemory: MemorizeReviews | undefined;
const DAY = /^\d{4}-\d{2}-\d{2}$/;

/** Local calendar day, "2026-11-12". */
export function localDay(now = new Date()) {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function addDays(day: string, days: number) {
  const [year, month, date] = day.split("-").map(Number);
  // Noon, so a clock change never moves it to another day.
  return localDay(new Date(year, month - 1, date + days, 12));
}

function readReviews(): MemorizeReviews {
  if (reviewMemory) return reviewMemory;
  try {
    const raw = storage()?.getStoredItem(REVIEW_KEY);
    const saved = raw ? (JSON.parse(raw) as Record<string, unknown>) : {};
    const kept: Record<string, MemorizeReview> = {};
    for (const [part, value] of Object.entries(saved ?? {})) {
      const review = value as Partial<MemorizeReview> | null;
      if (review && typeof review.day === "string" && DAY.test(review.day) && typeof review.step === "number" && Number.isFinite(review.step)) {
        kept[part] = { day: review.day, step: Math.max(0, Math.min(REVIEW_DAYS.length - 1, Math.floor(review.step))) };
      }
    }
    reviewMemory = kept;
  } catch {
    reviewMemory = {};
  }
  return reviewMemory;
}

export function memorizeReviews() {
  return readReviews();
}

/** The day a part comes back for review. */
export function reviewDay(review: MemorizeReview) {
  return addDays(review.day, REVIEW_DAYS[review.step] ?? REVIEW_DAYS[REVIEW_DAYS.length - 1]);
}

/** Is the part ready to review today? Only a part memorized with three stars ever is. */
export function isReviewDue(part: string, stars: MemorizeStars, reviews: MemorizeReviews, today = localDay()) {
  if ((stars[part] ?? 0) < 3) return false;
  const review = reviews[part];
  return !review || reviewDay(review) <= today;
}

/**
 * After a finished try at a part (with its stars already kept by recordMemorized): moves its review on. Returns in how
 * many days it comes back, or undefined for a part not memorized yet.
 */
export function recordReview(part: string, stars: number, today = localDay()) {
  const before = readReviews();
  const review = before[part];
  const best = read()[part] ?? 0;
  let next: MemorizeReview | undefined;
  if (stars < 3) {
    // A mistake: back tomorrow, once the part has been memorized.
    if (best >= 3) next = { day: today, step: 0 };
  } else if (!review) {
    next = { day: today, step: 0 };
  } else if (reviewDay(review) <= today) {
    next = { day: today, step: Math.min(REVIEW_DAYS.length - 1, review.step + 1) };
  }
  const kept = next ?? review;
  if (next) {
    reviewMemory = { ...before, [part]: next };
    try {
      storage()?.setStoredItem(REVIEW_KEY, JSON.stringify(reviewMemory));
    } catch {
      // Kept for this run.
    }
    for (const listener of reviewListeners) listener();
  }
  if (!kept) return undefined;
  const [year, month, date] = reviewDay(kept).split("-").map(Number);
  const [nowYear, nowMonth, nowDate] = today.split("-").map(Number);
  return Math.round((new Date(year, month - 1, date, 12).getTime() - new Date(nowYear, nowMonth - 1, nowDate, 12).getTime()) / 86_400_000);
}

function subscribeReviews(listener: () => void) {
  reviewListeners.add(listener);
  return () => {
    reviewListeners.delete(listener);
  };
}

export function useMemorizeReviews() {
  return useSyncExternalStore(subscribeReviews, readReviews, readReviews);
}

/** For tests. */
export function resetMemorizeForTests() {
  memory = undefined;
  reviewMemory = undefined;
  storage()?.setStoredItem(KEY, "");
  storage()?.setStoredItem(REVIEW_KEY, "");
}
