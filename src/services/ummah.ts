import type { UmmahState, UserProfile } from "../types";

// The Ummah tab, like Clash Royale's trophy road: quiz battles win or lose trophies, and trophies climb arenas.
// A battle is the learner against hard questions and the clock, never a made-up opponent. The ranking of everyone
// lives on the server and shows only a nickname built from the word lists below, so no real name or photo is ever
// shown to strangers (the app is listed for all ages).
export type ArenaId = "dunes" | "oasis" | "palms" | "lanterns" | "stars" | "crescent" | "legend";

export type Arena = {
  id: ArenaId;
  /** Trophies that open this arena. Trophies never fall below the start of the best arena reached. */
  trophies: number;
  color: string;
};

export const ARENAS: Arena[] = [
  { id: "dunes", trophies: 0, color: "#E0A04B" },
  { id: "oasis", trophies: 100, color: "#2FB8C9" },
  { id: "palms", trophies: 250, color: "#21B573" },
  { id: "lanterns", trophies: 450, color: "#FF8A1F" },
  { id: "stars", trophies: 700, color: "#6F6AE8" },
  { id: "crescent", trophies: 1000, color: "#2FA8FF" },
  { id: "legend", trophies: 1400, color: "#F2B705" }
];

export const BATTLE_QUESTIONS = 5;
/** Seconds for each question. */
export const BATTLE_SECONDS = 20;
/** Right answers out of BATTLE_QUESTIONS that win. */
export const BATTLE_WIN_SCORE = 4;
export const BATTLE_WIN_GEMS = 5;

export function arenaIndex(trophies: number) {
  let index = 0;
  ARENAS.forEach((arena, at) => {
    if (trophies >= arena.trophies) index = at;
  });
  return index;
}

export function arenaFor(trophies: number) {
  return ARENAS[arenaIndex(trophies)];
}

/** Trophies left to the next arena, or undefined at the top. */
export function trophiesToNextArena(trophies: number) {
  const next = ARENAS[arenaIndex(trophies) + 1];
  return next ? next.trophies - trophies : undefined;
}

export const EMPTY_UMMAH: UmmahState = { trophies: 0, best: 0, battles: 0, wins: 0 };

export function ummahOf(user: Pick<UserProfile, "ummah">): UmmahState {
  return { ...EMPTY_UMMAH, ...(user.ummah ?? {}) };
}

export type BattleOutcome = "win" | "draw" | "loss";

export function battleOutcome(correct: number): BattleOutcome {
  if (correct >= BATTLE_WIN_SCORE) return "win";
  return correct === BATTLE_WIN_SCORE - 1 ? "draw" : "loss";
}

/** Trophies a battle wins or loses: a perfect run +35, a win +25, one short of a win 0, less -15. */
export function battleTrophies(correct: number) {
  if (correct >= BATTLE_QUESTIONS) return 35;
  const outcome = battleOutcome(correct);
  return outcome === "win" ? 25 : outcome === "draw" ? 0 : -15;
}

export type BattleResult = { correct: number; outcome: BattleOutcome; change: number; trophies: number; newArena: boolean; gems: number };

/** Records a finished battle. A loss never drops the learner out of the best arena they reached. */
export function applyBattle(user: UserProfile, correct: number): { user: UserProfile; result: BattleResult } {
  const before = ummahOf(user);
  const floor = arenaFor(before.best).trophies;
  const outcome = battleOutcome(correct);
  const trophies = Math.max(floor, before.trophies + battleTrophies(correct));
  const best = Math.max(before.best, trophies);
  const gems = outcome === "win" ? BATTLE_WIN_GEMS : 0;
  const ummah: UmmahState = { ...before, trophies, best, battles: before.battles + 1, wins: before.wins + (outcome === "win" ? 1 : 0) };
  return {
    user: { ...user, gems: user.gems + gems, ummah },
    result: { correct, outcome, change: trophies - before.trophies, trophies, newArena: arenaIndex(best) > arenaIndex(before.best), gems }
  };
}

// Nicknames are two words and a number from these lists only, so nobody can put a real name on the ranking.
// The server checks the same lists (backend/app/api/routes/ummah.py).
export const NICKNAME_WORDS = ["Brave", "Kind", "Swift", "Bright", "Patient", "Honest", "Gentle", "Wise", "Calm", "Steady", "Happy", "Noble"];
export const NICKNAME_ANIMALS = ["Falcon", "Camel", "Gazelle", "Eagle", "Lion", "Horse", "Dove", "Owl", "Oryx", "Hoopoe", "Dolphin", "Panther"];

export function makeNickname(random: () => number = Math.random) {
  const pick = <T,>(list: T[]) => list[Math.floor(random() * list.length) % list.length];
  return `${pick(NICKNAME_WORDS)} ${pick(NICKNAME_ANIMALS)} ${10 + (Math.floor(random() * 90) % 90)}`;
}

const NICKNAME = new RegExp(`^(${NICKNAME_WORDS.join("|")}) (${NICKNAME_ANIMALS.join("|")}) [1-9][0-9]$`);

export function isValidNickname(value: unknown): value is string {
  return typeof value === "string" && NICKNAME.test(value);
}

/** The learner's nickname, made once and kept. */
export function withNickname(user: UserProfile, random?: () => number): UserProfile {
  const ummah = ummahOf(user);
  if (isValidNickname(ummah.nickname)) return user;
  return { ...user, ummah: { ...ummah, nickname: makeNickname(random) } };
}

export function setUmmahJoined(user: UserProfile, joined: boolean): UserProfile {
  const named = joined ? withNickname(user) : user;
  return { ...named, ummah: { ...ummahOf(named), joined } };
}

export function rerollNickname(user: UserProfile, random?: () => number): UserProfile {
  return { ...user, ummah: { ...ummahOf(user), nickname: makeNickname(random) } };
}

// Profile icons bought with gems. Only plain pictures: no faces, nothing sacred to sit on a profile.
export type ProfileIconId = "lantern" | "palm" | "moon" | "star8" | "dates" | "sun" | "water" | "trophy" | "crown";

export const PROFILE_ICONS: Array<{ id: ProfileIconId; price: number }> = [
  { id: "lantern", price: 40 },
  { id: "palm", price: 40 },
  { id: "dates", price: 40 },
  { id: "moon", price: 60 },
  { id: "sun", price: 60 },
  { id: "water", price: 60 },
  { id: "star8", price: 90 },
  { id: "trophy", price: 120 },
  { id: "crown", price: 200 }
];

export function isProfileIcon(id: unknown): id is ProfileIconId {
  return PROFILE_ICONS.some((icon) => icon.id === id);
}

export function ownsIcon(user: Pick<UserProfile, "ummah">, id: string) {
  return Boolean(user.ummah?.icons?.includes(id));
}

/** Buys an icon and puts it on, or does nothing when it is owned already or costs too much. */
export function buyIcon(user: UserProfile, id: ProfileIconId): UserProfile {
  const item = PROFILE_ICONS.find((icon) => icon.id === id);
  if (!item || ownsIcon(user, id) || user.gems < item.price) return user;
  const ummah = ummahOf(user);
  return { ...user, gems: user.gems - item.price, ummah: { ...ummah, icons: [...(ummah.icons ?? []), id], icon: id } };
}

/** Puts on an owned icon; undefined goes back to initials. */
export function wearIcon(user: UserProfile, id: ProfileIconId | undefined): UserProfile {
  if (id && !ownsIcon(user, id)) return user;
  return { ...user, ummah: { ...ummahOf(user), icon: id } };
}

export function activeIcon(user: Pick<UserProfile, "ummah">): ProfileIconId | undefined {
  const id = user.ummah?.icon;
  return isProfileIcon(id) && ownsIcon(user, id) ? id : undefined;
}

/** One row of the Ummah ranking from the server: a nickname and trophies, nothing else about the learner. */
export type UmmahRankRow = { rank: number; nickname: string; trophies: number; icon?: string; you?: boolean };

export type UmmahRankings = {
  top: UmmahRankRow[];
  /** The learner's own row, also when it is below the top list. Missing until they join. */
  me?: UmmahRankRow;
  total: number;
};
