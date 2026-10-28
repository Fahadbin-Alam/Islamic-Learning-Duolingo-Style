import type { UserProfile } from "../types";

// When Ramadan is, for Ramadan mode: the first day of Ramadan and the day of Eid al-Fitr (1 Shawwal) by the Umm
// al-Qura calendar, from the "islamic-umalqura" calendar of the ICU data in Node and browsers (Hermes on phones has
// no Islamic calendar, so the days are written out here; src/__tests__/ramadan.test.tsx checks them against ICU).
// Where the month starts on a moon sighting it can be a day later; Ramadan mode is a reminder, so a day either way
// only moves the banner's day number.
const RAMADANS: readonly { start: string; eid: string }[] = [
  { start: "2026-02-18", eid: "2026-03-20" },
  { start: "2027-02-08", eid: "2027-03-09" },
  { start: "2028-01-28", eid: "2028-02-26" },
  { start: "2029-01-16", eid: "2029-02-14" },
  { start: "2030-01-05", eid: "2030-02-04" },
  { start: "2030-12-26", eid: "2031-01-24" },
  { start: "2031-12-16", eid: "2032-01-14" },
  { start: "2032-12-04", eid: "2033-01-03" },
  { start: "2033-11-23", eid: "2033-12-23" },
  { start: "2034-11-12", eid: "2034-12-12" },
  { start: "2035-11-01", eid: "2035-12-01" }
];

export const RAMADAN_DATES = RAMADANS;

/** The "Ramadan is coming" banner shows this many days before the month starts. */
export const RAMADAN_SOON_DAYS = 14;

const DAY_MS = 24 * 60 * 60 * 1000;

// Whole days between two YYYY-MM-DD keys, counted on the calendar (no clock or time zone in it).
function daysBetween(from: string, to: string) {
  const utc = (key: string) => {
    const [year, month, day] = key.split("-").map(Number);
    return Date.UTC(year, month - 1, day);
  };
  return Math.round((utc(to) - utc(from)) / DAY_MS);
}

// The learner's own calendar day, as the streak counts it (localDateKey in the api).
function dayKey(date: Date) {
  return `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, "0")}-${`${date.getDate()}`.padStart(2, "0")}`;
}

export type RamadanSeason =
  | { phase: "ramadan"; day: number; length: number; start: string }
  | { phase: "soon"; daysLeft: number; start: string };

/** Where today is: a day of Ramadan (1 to 29 or 30), the days before it starts, or undefined the rest of the year. */
export function ramadanSeason(now = new Date()): RamadanSeason | undefined {
  const today = dayKey(now);
  for (const { start, eid } of RAMADANS) {
    const sinceStart = daysBetween(start, today);
    const length = daysBetween(start, eid);
    if (sinceStart >= 0 && sinceStart < length) return { phase: "ramadan", day: sinceStart + 1, length, start };
    if (sinceStart < 0 && -sinceStart <= RAMADAN_SOON_DAYS) return { phase: "soon", daysLeft: -sinceStart, start };
  }
  return undefined;
}

/** The days of this Ramadan with a Ramadan lesson done, with today's added when it is one. */
export function withRamadanDay(user: UserProfile, now = new Date()): UserProfile {
  const season = ramadanSeason(now);
  if (season?.phase !== "ramadan") return user;
  const today = dayKey(now);
  const kept = (user.ramadanDays ?? []).filter((day) => daysBetween(season.start, day) >= 0);
  return kept.includes(today) ? user : { ...user, ramadanDays: [...kept, today] };
}

/**
 * The Ramadan streak: days in a row this Ramadan with a Ramadan lesson done, up to today, or up to yesterday while
 * today's lesson is still to do. 0 outside Ramadan.
 */
export function ramadanStreak(user: UserProfile, now = new Date()): number {
  const season = ramadanSeason(now);
  if (season?.phase !== "ramadan") return 0;
  const done = new Set(user.ramadanDays ?? []);
  const day = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (!done.has(dayKey(day))) day.setDate(day.getDate() - 1);
  let streak = 0;
  while (done.has(dayKey(day)) && daysBetween(season.start, dayKey(day)) >= 0) {
    streak += 1;
    day.setDate(day.getDate() - 1);
  }
  return streak;
}

/** True when today's Ramadan lesson is done. */
export function didRamadanToday(user: UserProfile, now = new Date()): boolean {
  return ramadanSeason(now)?.phase === "ramadan" && (user.ramadanDays ?? []).includes(dayKey(now));
}
