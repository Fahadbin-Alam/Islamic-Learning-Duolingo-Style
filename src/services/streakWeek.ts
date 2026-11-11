import { daysBetween, shiftDateKey } from "./familyCode";
import { familyWeekStart } from "./familyWeek";

/**
 * This week's days for the streak moment after the day's first lesson: Monday to Sunday, like the league and the
 * family week. A streak is a run of days that ends today, so the days it covers follow from its length alone:
 * walking back from today, a day a streak freeze covered keeps the run going but adds no day to it (as on the streak
 * sheet), and every other day is one of the streak's own until they are all counted.
 */

export type StreakDayState = "lit" | "frozen" | "today" | "later" | "none";

export type StreakDay = {
  /** YYYY-MM-DD. */
  date: string;
  /** "Mon" .. "Sun": the English short name, translated where it is shown. */
  name: (typeof WEEKDAY_NAMES)[number];
  state: StreakDayState;
};

export const WEEKDAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export function streakWeek(today: string, streakDays: number, frozenDays: readonly string[] = []): StreakDay[] {
  const start = familyWeekStart(today);
  const frozen = new Set(frozenDays);
  const states = new Map<string, StreakDayState>();
  // Today is the streak's newest day; the rest of the run lies behind it.
  let left = Math.max(1, Math.floor(streakDays)) - 1;
  for (let back = 1; back <= daysBetween(start, today); back += 1) {
    const day = shiftDateKey(today, -back);
    if (frozen.has(day)) {
      states.set(day, "frozen");
      continue;
    }
    if (left <= 0) break;
    states.set(day, "lit");
    left -= 1;
  }
  return WEEKDAY_NAMES.map((name, offset) => {
    const date = shiftDateKey(start, offset);
    const state: StreakDayState = date === today ? "today" : date > today ? "later" : states.get(date) ?? "none";
    return { date, name, state };
  });
}

/** Streak days worth a bigger party: confetti, a fanfare and the hadith on keeping at a deed. */
export function isStreakMilestone(days: number) {
  if (days === 3 || days === 7 || days === 14 || days === 21 || days === 30 || days === 50 || days === 100 || days === 365) return true;
  return days > 100 && days % 50 === 0;
}

/** What the streak moment says under its title (translated where it is shown). */
export const STREAK_LINES = {
  first: "You started a streak! Come back tomorrow to keep it going.",
  week: "A whole week in a row! MashaAllah!",
  month: "A whole month in a row! MashaAllah!",
  year: "A whole year in a row! MashaAllah!",
  milestone: "{count} days in a row! MashaAllah!",
  tomorrow: "Come back tomorrow to make it {count}!"
} as const;

/** The line for a first streak, a week, a month, a year, another big day or a plain day. */
export function streakLine(days: number): { text: string; values?: Record<string, number> } {
  if (days <= 1) return { text: STREAK_LINES.first };
  if (days === 7) return { text: STREAK_LINES.week };
  if (days === 30) return { text: STREAK_LINES.month };
  if (days === 365) return { text: STREAK_LINES.year };
  if (isStreakMilestone(days)) return { text: STREAK_LINES.milestone, values: { count: days } };
  return { text: STREAK_LINES.tomorrow, values: { count: days + 1 } };
}
