import { useSyncExternalStore } from "react";
import { daysBetween, shiftDateKey, type FamilyKid } from "./familyCode";
import type { FamilyWeekPayload, LinkedKid } from "./backendSync";
import type { UserProfile } from "../types";

/**
 * The family challenge week: every day someone in the family learns lights one lantern, and the family lights them
 * together from Monday to Sunday (the league's week). The goal is three lanterns a person. Nobody loses and nobody
 * is set work: an unfinished week simply ends, and the next one starts with every lantern out.
 *
 * Linked accounts get the family from the server (backend/app/api/routes/family.py family_week), so every phone in
 * the family counts the same people. Without it (an older server, no account, offline) a grown-up's phone counts
 * itself and the learners it follows.
 */
export const LANTERNS_PER_PERSON = 3;
/** A grown-up following more learners than this is a teacher: a class is not one family (as on the server). */
export const FAMILY_SIZE_LIMIT = 10;

export type FamilyWeekPerson = { key: string; name: string; initials: string; learnedToday: boolean; self?: boolean };

export type FamilyWeek = {
  /** The Monday the week started (YYYY-MM-DD). */
  weekStart: string;
  today: string;
  members: number;
  goal: number;
  /** Lanterns lit so far: one per person per day they learned. It can pass the goal. */
  lit: number;
  /** The people this phone may name, this phone first. */
  people: FamilyWeekPerson[];
  /** Family members counted but not named here (another child, a co-parent). */
  others: number;
};

/** The Monday of the week `today` falls in (both YYYY-MM-DD). */
export function familyWeekStart(today: string) {
  const [year, month, day] = today.split("-").map(Number);
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return shiftDateKey(today, -((weekday + 6) % 7));
}

/** Days left in the week, today included: Monday 7, Sunday 1. */
export function familyWeekDaysLeft(today: string) {
  return 7 - daysBetween(familyWeekStart(today), today);
}

/** This week's days, Monday to today, that have XP. */
export function learnedDaysThisWeek(xpByDay: Record<string, number> | undefined, today: string) {
  const start = familyWeekStart(today);
  return Array.from({ length: daysBetween(start, today) + 1 }, (_, offset) => shiftDateKey(start, offset)).filter((day) => (xpByDay?.[day] ?? 0) > 0);
}

/** This phone's XP by day, with today's XP from a save made before the day log existed. */
export function ownXpByDay(user: Pick<UserProfile, "xpByDay" | "dailyXp">) {
  const days = { ...(user.xpByDay ?? {}) };
  if (user.dailyXp?.date) days[user.dailyXp.date] = Math.max(days[user.dailyXp.date] ?? 0, user.dailyXp.xp ?? 0);
  return days;
}

/** A pasted code's last seven days (oldest first, up to the day it was made) as XP by day. */
function pastedXpByDay(kid: FamilyKid) {
  const { date, weekXp } = kid.snapshot;
  return Object.fromEntries(weekXp.map((xp, index) => [shiftDateKey(date, index - (weekXp.length - 1)), xp]));
}

function learner(key: string, name: string, initials: string, xpByDay: Record<string, number>, today: string) {
  const days = learnedDaysThisWeek(xpByDay, today);
  return { person: { key, name, initials, learnedToday: days.includes(today) }, days: days.length };
}

export type FamilyWeekInput = {
  /** What the server sent, when it knows the family. */
  server?: FamilyWeekPayload | null;
  self: { xpByDay: Record<string, number>; initials: string };
  /** Learners this phone follows live, and from pasted codes (a server family has the live ones already). */
  liveKids: Pick<LinkedKid, "id" | "name" | "avatarInitials" | "xpByDay">[];
  pastedKids: FamilyKid[];
  today: string;
};

/** The family week to show on this phone, or undefined when it has no family to share one with. */
export function buildFamilyWeek({ server, self, liveKids, pastedKids, today }: FamilyWeekInput): FamilyWeek | undefined {
  const weekStart = familyWeekStart(today);
  const mine = learnedDaysThisWeek(self.xpByDay, today);
  // Pasted codes are only on this phone, so the server never counts them.
  const pasted = pastedKids.map((kid) => learner(kid.snapshot.id, kid.nickname, (Array.from(kid.nickname.trim())[0] ?? "?").toUpperCase(), pastedXpByDay(kid), today));
  const pastedLit = pasted.reduce((sum, entry) => sum + entry.days, 0);

  if (server && server.members >= 2 && server.weekStart === weekStart) {
    // This phone's own days join the server's: a lesson just finished may not have reached it yet.
    const serverMine = new Set(server.selfDays ?? []);
    const allMine = new Set([...serverMine, ...mine]);
    const [first, ...rest] = server.people ?? [];
    const people: FamilyWeekPerson[] = [
      { key: `you-${first?.id ?? 0}`, name: first?.name ?? "", initials: first?.avatarInitials ?? self.initials, learnedToday: allMine.has(today), self: true },
      ...rest.map((person) => ({ key: `p-${person.id}`, name: person.name, initials: person.avatarInitials, learnedToday: person.today })),
      ...pasted.map((entry) => entry.person)
    ];
    const members = server.members + pasted.length;
    return {
      weekStart,
      today,
      members,
      goal: server.goal + pasted.length * LANTERNS_PER_PERSON,
      lit: Math.max(0, server.lit - serverMine.size) + allMine.size + pastedLit,
      people,
      others: Math.max(0, members - people.length)
    };
  }

  // No family from the server: a grown-up's phone counts itself and the learners it follows, unless that is a class.
  const family = liveKids.length > FAMILY_SIZE_LIMIT ? [] : liveKids;
  const live = family.map((kid) => learner(`p-${kid.id}`, kid.name, kid.avatarInitials, kid.xpByDay ?? {}, today));
  const followed = [...live, ...pasted];
  if (followed.length === 0) return undefined;
  const members = 1 + followed.length;
  return {
    weekStart,
    today,
    members,
    goal: members * LANTERNS_PER_PERSON,
    lit: mine.length + followed.reduce((sum, entry) => sum + entry.days, 0),
    people: [{ key: "you", name: "", initials: self.initials, learnedToday: mine.includes(today), self: true }, ...followed.map((entry) => entry.person)],
    others: 0
  };
}

// The weeks this phone saw the family light every lantern, so each is celebrated once and counted.
const KEY = "sira-path-family-weeks" as const;
const MAX_WEEKS = 520;
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
    memory = Array.isArray(saved) ? saved.filter((week): week is string => typeof week === "string" && /^\d{4}-\d{2}-\d{2}$/.test(week)) : [];
  } catch {
    memory = [];
  }
  return memory;
}

export function litFamilyWeeks() {
  return read();
}

/** Records a week the family lit every lantern. True the first time, so the celebration plays once. */
export function markFamilyWeekLit(weekStart: string) {
  const weeks = read();
  if (weeks.includes(weekStart)) return false;
  memory = [...weeks, weekStart].slice(-MAX_WEEKS);
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

export function useLitFamilyWeeks() {
  return useSyncExternalStore(subscribe, read, read);
}

/** For tests. */
export function resetFamilyWeeksForTests() {
  memory = undefined;
  storage()?.setStoredItem(KEY, "");
}
