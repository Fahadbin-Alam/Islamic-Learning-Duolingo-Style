import { daysBetween, shiftDateKey } from "./familyCode";
import type { UserProfile } from "../types";

/**
 * Streak freezes, as on Duolingo: bought with gems, kept on the phone (they work offline), and spent on their
 * own when the app opens after missed days. Each covers one whole missed day; if the learner owns fewer than
 * the days missed, none are spent and the streak is lost as before. A frozen day keeps the streak but adds no day to it.
 */
export const STREAK_FREEZE_PRICE = 50;
export const MAX_STREAK_FREEZES = 2;
/** Frozen days kept for the streak sheet. */
const FROZEN_DAYS_KEPT = 30;

export function streakFreezeCount(user: Pick<UserProfile, "streakFreezes">) {
  return Math.max(0, Math.min(MAX_STREAK_FREEZES, Math.floor(user.streakFreezes ?? 0)));
}

export function canBuyStreakFreeze(user: Pick<UserProfile, "streakFreezes" | "gems">) {
  return streakFreezeCount(user) < MAX_STREAK_FREEZES && user.gems >= STREAK_FREEZE_PRICE;
}

export function buyStreakFreeze(user: UserProfile): UserProfile {
  if (!canBuyStreakFreeze(user)) return user;
  return { ...user, gems: user.gems - STREAK_FREEZE_PRICE, streakFreezes: streakFreezeCount(user) + 1 };
}

/**
 * Spends freezes on the whole days missed since the last lesson, up to yesterday, so the streak carries on.
 * `today` is the local YYYY-MM-DD. Nothing changes when no day was missed, there is no streak, or there are too few freezes.
 */
export function applyStreakFreezes(user: UserProfile, today: string): UserProfile {
  if (!user.lastStreakDate || user.streakDays <= 0) return user;
  const missed = daysBetween(user.lastStreakDate, today) - 1;
  const owned = streakFreezeCount(user);
  if (missed <= 0 || missed > owned) return user;

  const covered = Array.from({ length: missed }, (_, index) => shiftDateKey(user.lastStreakDate as string, index + 1));
  return {
    ...user,
    streakFreezes: owned - missed,
    lastStreakDate: covered[covered.length - 1],
    frozenDays: [...(user.frozenDays ?? []), ...covered].slice(-FROZEN_DAYS_KEPT),
    freezeSave: { date: today, days: missed, streak: user.streakDays }
  };
}

/** The "your freeze saved your streak" card to show once, if any. */
export function unseenFreezeSave(user: Pick<UserProfile, "freezeSave">) {
  return user.freezeSave && !user.freezeSave.seen ? user.freezeSave : undefined;
}

export function markFreezeSaveSeen(user: UserProfile): UserProfile {
  return user.freezeSave && !user.freezeSave.seen ? { ...user, freezeSave: { ...user.freezeSave, seen: true } } : user;
}
