import type { LeagueState, UserProfile } from "../types";

// Weekly leagues, like Duolingo's, but against the learner's own XP: no strangers are ever shown, so it is safe for
// children and works with no server. A week runs Monday to Sunday on the learner's clock. At the end of a week, XP at
// or above `up` moves the learner one league up, XP below `keep` moves them one down, anything between stays.
export type LeagueId = "bronze" | "silver" | "gold" | "pearl" | "ruby" | "emerald" | "diamond";

export type League = {
  id: LeagueId;
  /** Weekly XP that moves the learner up. The top league has none. */
  up?: number;
  /** Weekly XP needed to stay. Under it the learner drops one league; Bronze has no floor. */
  keep: number;
  color: string;
};

// A lesson pays about 10 XP and the daily goal is 40, so Bronze to Silver takes a few lessons, and Diamond asks for
// most of a daily goal every day.
export const LEAGUES: League[] = [
  { id: "bronze", up: 60, keep: 0, color: "#C77B3B" },
  { id: "silver", up: 100, keep: 20, color: "#9AA9B2" },
  { id: "gold", up: 140, keep: 40, color: "#F2B705" },
  { id: "pearl", up: 180, keep: 60, color: "#C9B8E8" },
  { id: "ruby", up: 220, keep: 80, color: "#E5456A" },
  { id: "emerald", up: 260, keep: 100, color: "#21B573" },
  { id: "diamond", keep: 120, color: "#2FA8FF" }
];

export const TOP_TIER = LEAGUES.length - 1;

export function leagueAt(tier: number) {
  return LEAGUES[Math.max(0, Math.min(TOP_TIER, Math.floor(tier) || 0))];
}

function dateKey(date: Date) {
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function weekStart(now: Date) {
  // getDay(): Sunday 0 ... Saturday 6; Monday starts the week.
  const back = (now.getDay() + 6) % 7;
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() - back);
}

/** The local date (YYYY-MM-DD) of the Monday that starts this league week. */
export function leagueWeekKey(now = new Date()) {
  return dateKey(weekStart(now));
}

/** Whole days left in this league week, today included (Monday 7, Sunday 1). */
export function leagueDaysLeft(now = new Date()) {
  return 7 - ((now.getDay() + 6) % 7);
}

/** Where a week's XP leaves the learner: one league up, one down, or the same. */
export function nextTier(tier: number, xp: number) {
  const league = leagueAt(tier);
  if (league.up !== undefined && xp >= league.up) return Math.min(TOP_TIER, tier + 1);
  if (xp < league.keep) return Math.max(0, tier - 1);
  return tier;
}

export type LeagueZone = "up" | "safe" | "down";

/** How this week is going so far: moving up, staying, or about to drop. */
export function leagueZone(state: Pick<LeagueState, "tier" | "xp">): LeagueZone {
  const to = nextTier(state.tier, state.xp);
  return to > state.tier ? "up" : to < state.tier ? "down" : "safe";
}

/**
 * Ends any week that is over: the learner moves for the week their XP was earned in, and the result waits to be shown.
 * Weeks skipped entirely move nobody, so coming back after a month away costs one league at most.
 */
export function settleLeague(user: UserProfile, now = new Date()): UserProfile {
  const week = leagueWeekKey(now);
  const league = user.league;

  if (!league || typeof league.weekStart !== "string") {
    return { ...user, league: { tier: 0, weekStart: week, xp: 0 } };
  }
  // Same week, or a clock set back: nothing to end.
  if (league.weekStart >= week) {
    return user;
  }

  const tier = Number.isInteger(league.tier) && league.tier >= 0 && league.tier <= TOP_TIER ? league.tier : 0;
  const xp = Math.max(0, league.xp || 0);
  const to = nextTier(tier, xp);
  // A week in Bronze with no XP is no league at all: nothing to tell.
  const last = xp > 0 || to !== tier ? { weekStart: league.weekStart, from: tier, to, xp } : league.last;

  return { ...user, league: { tier: to, weekStart: week, xp: 0, ...(last ? { last } : {}) } };
}

/** Adds XP to this league week, ending a finished week first. addXp calls it for every XP the learner earns. */
export function addLeagueXp(user: UserProfile, amount: number, now = new Date()): UserProfile {
  const settled = settleLeague(user, now);
  const league = settled.league as LeagueState;
  return { ...settled, league: { ...league, xp: league.xp + Math.max(0, amount) } };
}

/** The result of the week that just ended, while the learner has not seen it yet. */
export function unseenLeagueResult(user: Pick<UserProfile, "league">) {
  const last = user.league?.last;
  return last && !last.seen ? last : undefined;
}

export function markLeagueResultSeen(user: UserProfile): UserProfile {
  if (!user.league?.last || user.league.last.seen) return user;
  return { ...user, league: { ...user.league, last: { ...user.league.last, seen: true } } };
}
