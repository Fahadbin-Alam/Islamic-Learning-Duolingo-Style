import type { TopicId, UserProfile } from "../types";

// Family view with no server: the child's phone makes a short code of its progress, a parent sends it to
// themselves (the share sheet, so only when a grown-up asks), and pastes it into Muslimo on their own phone.
// The code holds numbers only: no name, email or anything that says who the child is. The parent picks
// a nickname on their own phone, and it stays there.

/** Every topic, in a fixed order the code relies on: new topics go on the end. */
export const FAMILY_TOPIC_ORDER: TopicId[] = [
  "foundation",
  "prayer",
  "aqidah",
  "fasting",
  "zakat",
  "hajj",
  "manners",
  "marriage",
  "sahabah",
  "prophets",
  "women_of_the_book",
  "quran_tafseer",
  "hadith"
];

export const FAMILY_WEEK_DAYS = 7;
/** Days of XP kept on the profile for the week chart; a little more than a week. */
export const XP_HISTORY_DAYS = 14;
export const MAX_FAMILY_KIDS = 10;
export const MAX_NICKNAME_LENGTH = 20;

const CODE_PREFIX = "MUSLIMO-1";
const CODE_PATTERN = /muslimo-1-([0-9a-z]{4,12})-([0-9a-z.]+)-([0-9a-z]{2})/i;

export type FamilySnapshot = {
  /** Random id of the learner's phone, so a newer code updates the same child. */
  id: string;
  /** Local day the code was made (YYYY-MM-DD). */
  date: string;
  /** Local day of the last finished lesson, if any. */
  lastLearnedDate?: string;
  streakDays: number;
  totalXp: number;
  lessonsDone: number;
  stars: number;
  /** XP on each of the 7 days up to `date`, oldest first. */
  weekXp: number[];
  /** Finished circles per topic. */
  topicsDone: Partial<Record<TopicId, number>>;
};

export type FamilyKid = {
  nickname: string;
  snapshot: FamilySnapshot;
  addedAt: string;
};

// Days are counted from the epoch on a calendar date, so the learner's clock and the parent's agree.
function dayNumber(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return Math.round(Date.UTC(year, month - 1, day) / 86_400_000);
}

function dateKeyFromDay(day: number) {
  const date = new Date(day * 86_400_000);
  const month = `${date.getUTCMonth() + 1}`.padStart(2, "0");
  const dayOfMonth = `${date.getUTCDate()}`.padStart(2, "0");
  return `${date.getUTCFullYear()}-${month}-${dayOfMonth}`;
}

function isDateKey(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

/** The day `days` after `dateKey` (YYYY-MM-DD); negative goes back. */
export function shiftDateKey(dateKey: string, days: number) {
  return dateKeyFromDay(dayNumber(dateKey) + days);
}

/** Days from `from` to `to` (both YYYY-MM-DD); negative when `to` is earlier. */
export function daysBetween(from: string, to: string) {
  return dayNumber(to) - dayNumber(from);
}

/** XP on each of the `days` days up to `today`, oldest first, from the profile's day log. */
export function recentDailyXp(user: Pick<UserProfile, "xpByDay" | "dailyXp">, today: string, days = FAMILY_WEEK_DAYS) {
  const end = dayNumber(today);
  return Array.from({ length: days }, (_, index) => {
    const key = dateKeyFromDay(end - (days - 1 - index));
    const logged = user.xpByDay?.[key];
    if (typeof logged === "number") return Math.max(0, Math.round(logged));
    // A save from before the day log only knows today's XP.
    return user.dailyXp?.date === key ? Math.max(0, Math.round(user.dailyXp.xp)) : 0;
  });
}

/** The day log with `amount` added on `today`, keeping the last XP_HISTORY_DAYS days only. */
export function logDailyXp(history: Record<string, number> | undefined, today: string, amount: number) {
  const next: Record<string, number> = { ...(history ?? {}), [today]: (history?.[today] ?? 0) + amount };
  const oldest = dayNumber(today) - (XP_HISTORY_DAYS - 1);
  for (const key of Object.keys(next)) {
    if (!isDateKey(key) || dayNumber(key) < oldest || dayNumber(key) > dayNumber(today)) delete next[key];
  }
  return next;
}

export function buildFamilySnapshot(input: {
  id: string;
  today: string;
  user: Pick<UserProfile, "xpByDay" | "dailyXp" | "streakDays" | "totalXp" | "completedLessonIds" | "lastStreakDate">;
  stars: number;
  topicsDone: Partial<Record<TopicId, number>>;
}): FamilySnapshot {
  const { user } = input;
  return {
    id: input.id,
    date: input.today,
    lastLearnedDate: isDateKey(user.lastStreakDate) ? user.lastStreakDate : undefined,
    streakDays: Math.max(0, user.streakDays),
    totalXp: Math.max(0, Math.round(user.totalXp)),
    lessonsDone: user.completedLessonIds.length,
    stars: Math.max(0, Math.round(input.stars)),
    weekXp: recentDailyXp(user, input.today),
    topicsDone: input.topicsDone
  };
}

function checksum(body: string) {
  let sum = 0;
  for (let index = 0; index < body.length; index += 1) {
    sum = (sum * 31 + body.charCodeAt(index)) % 1296;
  }
  return sum.toString(36).padStart(2, "0");
}

const toBase36 = (value: number) => Math.max(0, Math.round(value)).toString(36);

/** MUSLIMO-1-<id>-<numbers>-<check>. Numbers: day, last learned day (0 = none), streak, XP, lessons, stars, 7 days of XP, topics. */
export function encodeFamilyCode(snapshot: FamilySnapshot) {
  const day = dayNumber(snapshot.date);
  const numbers = [
    day,
    snapshot.lastLearnedDate ? day - dayNumber(snapshot.lastLearnedDate) + 1 : 0,
    snapshot.streakDays,
    snapshot.totalXp,
    snapshot.lessonsDone,
    snapshot.stars,
    ...Array.from({ length: FAMILY_WEEK_DAYS }, (_, index) => snapshot.weekXp[index] ?? 0),
    ...FAMILY_TOPIC_ORDER.map((topicId) => snapshot.topicsDone[topicId] ?? 0)
  ];
  const body = `${snapshot.id.toLowerCase()}-${numbers.map(toBase36).join(".")}`;
  return `${CODE_PREFIX}-${body}-${checksum(body)}`.toUpperCase();
}

/** Finds a family code anywhere in pasted text (the whole shared message works). Undefined if there is none or it is broken. */
export function decodeFamilyCode(text: string): FamilySnapshot | undefined {
  const match = CODE_PATTERN.exec(text.replace(/\s+/g, ""));
  if (!match) return undefined;
  const id = match[1].toLowerCase();
  const numbersText = match[2].toLowerCase();
  if (checksum(`${id}-${numbersText}`) !== match[3].toLowerCase()) return undefined;

  const numbers = numbersText.split(".").map((part) => (/^[0-9a-z]+$/.test(part) ? parseInt(part, 36) : NaN));
  if (numbers.length < 6 + FAMILY_WEEK_DAYS || numbers.some((value) => !Number.isFinite(value))) return undefined;

  const [day, lastLearnedOffset, streakDays, totalXp, lessonsDone, stars] = numbers;
  const weekXp = numbers.slice(6, 6 + FAMILY_WEEK_DAYS);
  const topicNumbers = numbers.slice(6 + FAMILY_WEEK_DAYS);
  const topicsDone: Partial<Record<TopicId, number>> = {};
  FAMILY_TOPIC_ORDER.forEach((topicId, index) => {
    if (topicNumbers[index]) topicsDone[topicId] = topicNumbers[index];
  });

  return {
    id,
    date: dateKeyFromDay(day),
    lastLearnedDate: lastLearnedOffset > 0 ? dateKeyFromDay(day - (lastLearnedOffset - 1)) : undefined,
    streakDays,
    totalXp,
    lessonsDone,
    stars,
    weekXp,
    topicsDone
  };
}

/** The streak as the parent should see it today: a streak whose last lesson is more than a day old has ended. */
export function streakOnDay(snapshot: FamilySnapshot, today: string) {
  if (!snapshot.lastLearnedDate || snapshot.streakDays <= 0) return 0;
  return daysBetween(snapshot.lastLearnedDate, today) <= 1 ? snapshot.streakDays : 0;
}

export function weekTotal(snapshot: Pick<FamilySnapshot, "weekXp">) {
  return snapshot.weekXp.reduce((sum, xp) => sum + xp, 0);
}

export function daysLearned(snapshot: Pick<FamilySnapshot, "weekXp">) {
  return snapshot.weekXp.filter((xp) => xp > 0).length;
}

export type AddKidResult =
  | { status: "added" | "updated"; kids: FamilyKid[]; kid: FamilyKid }
  | { status: "invalid" | "older" | "full" | "self"; kids: FamilyKid[] };

/**
 * Adds the child in a pasted code, or updates the one with the same id. An older code than the one saved
 * changes nothing; a code made on this very phone is refused, since it is the parent's own progress.
 */
export function addFamilyKid(kids: FamilyKid[], text: string, nickname: string, ownId: string | undefined, now: string): AddKidResult {
  const snapshot = decodeFamilyCode(text);
  if (!snapshot) return { status: "invalid", kids };
  if (ownId && snapshot.id === ownId.toLowerCase()) return { status: "self", kids };

  const name = nickname.trim().slice(0, MAX_NICKNAME_LENGTH);
  const existing = kids.find((kid) => kid.snapshot.id === snapshot.id);
  if (existing) {
    if (daysBetween(existing.snapshot.date, snapshot.date) < 0) return { status: "older", kids };
    const kid = { ...existing, nickname: name || existing.nickname, snapshot };
    return { status: "updated", kids: kids.map((entry) => (entry === existing ? kid : entry)), kid };
  }

  if (kids.length >= MAX_FAMILY_KIDS) return { status: "full", kids };
  const kid = { nickname: name, snapshot, addedAt: now };
  return { status: "added", kids: [...kids, kid], kid };
}

export function removeFamilyKid(kids: FamilyKid[], id: string) {
  return kids.filter((kid) => kid.snapshot.id !== id);
}

/** Saved kids, dropping anything that does not look like one. */
export function readFamilyKids(raw: string | null): FamilyKid[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (entry): entry is FamilyKid =>
          Boolean(entry) &&
          typeof entry.nickname === "string" &&
          Boolean(entry.snapshot) &&
          typeof entry.snapshot.id === "string" &&
          isDateKey(entry.snapshot.date) &&
          Array.isArray(entry.snapshot.weekXp)
      )
      .slice(0, MAX_FAMILY_KIDS);
  } catch {
    return [];
  }
}

export function makeFamilyId(random: () => number = Math.random) {
  return Array.from({ length: 8 }, () => Math.floor(random() * 36).toString(36)).join("");
}
