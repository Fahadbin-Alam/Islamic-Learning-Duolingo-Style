import type { AccountRole, TopicId, UserProfile } from "../types";
import { getStoredItem, setStoredItem } from "./appStorage";
import type { AgeGroup } from "./monetizationConfig";

// Kids mode: simpler lessons for a young learner, and ads that are always the child-directed, non-personalised kind.
// It is on by itself for anyone under 13 and for a Kid account; a grown-up turns it on or off on the Family page,
// which sits behind the grown-up gate. The choice stays on this phone.

export type KidsModeChoice = "on" | "off";

const KIDS_MODE_KEY = "sira-path-kids-mode";

/** Topics a young child doesn't get in Kids mode: marriage (rights of spouses, 4:34, divorce) is for grown-ups. */
export const KIDS_HIDDEN_TOPICS: ReadonlySet<TopicId> = new Set<TopicId>(["marriage"]);

export function isKidsModeChoice(value: unknown): value is KidsModeChoice {
  return value === "on" || value === "off";
}

export function readKidsModeChoice(): KidsModeChoice | undefined {
  const saved = getStoredItem(KIDS_MODE_KEY);
  return isKidsModeChoice(saved) ? saved : undefined;
}

export function saveKidsModeChoice(choice: KidsModeChoice) {
  setStoredItem(KIDS_MODE_KEY, choice);
}

/** A grown-up's choice wins; with none, Kids mode is on for an age under 13 or a Kid account. */
export function isKidsMode(choice: KidsModeChoice | undefined, ageGroup: AgeGroup | null | undefined, role: AccountRole | undefined) {
  if (choice) return choice === "on";
  return ageGroup === "6-9" || ageGroup === "10-12" || role === "child";
}

/**
 * The learner as Kids mode asks lessons of them: the easiest level and the youngest question mix (true/false kept,
 * no questions from memory, nothing from the hard bank), whatever difficulty or "Want it harder?" said before.
 * Only for building a lesson; the saved profile keeps its own choice for when Kids mode is turned off.
 */
export function kidsLearner<T extends Pick<UserProfile, "difficulty" | "challengeBoost">>(user: T): T {
  return { ...user, difficulty: "easy", challengeBoost: 0 };
}

export function isKidsTopic(topicId: TopicId) {
  return !KIDS_HIDDEN_TOPICS.has(topicId);
}
