import type { AgeGroup } from "../services/monetizationConfig";
import type { DifficultyChoice, UserProfile } from "../types";

export type { DifficultyChoice };

// How hard lessons are, as the learner picks it in Settings. "auto" (the default) climbs on its own with the
// learner's streak and how much they have learned; the others hold it at one level.
export const DIFFICULTY_CHOICES: DifficultyChoice[] = ["auto", "easy", "hard", "really_hard"];

/**
 * 0 (as the lesson is) to 5 (really hard). Each level asks more questions from memory, taken from lessons the
 * learner has already finished in the same topic; from level 2 a true/false question gives way to a 4-choice one,
 * and from level 3 the topic's harder questions (hardQuestions.ts) come in. Auto reaches 4 at most; only picking
 * "Really hard" gives 5.
 */
export type ChallengeLevel = 0 | 1 | 2 | 3 | 4 | 5;

/** Extra questions a lesson asks at each level. */
export const EXTRA_QUESTIONS: Record<ChallengeLevel, number> = { 0: 0, 1: 1, 2: 1, 3: 2, 4: 3, 5: 4 };
/** From this level, a lesson's true/false questions are swapped for 4-choice ones when there are some to ask. */
export const SWAP_TRUE_FALSE_FROM: ChallengeLevel = 2;
/** From this level, the topic's harder questions come in: one at 3, two at 4, three at 5. */
export const HARD_BANK_FROM: ChallengeLevel = 3;

// How far Auto may climb at each age. Young learners climb more gently and not as far; 13 and over (and anyone
// who has not said their age) get the whole climb.
const AUTO_CAP: Record<AgeGroup, ChallengeLevel> = { "6-9": 1, "10-12": 2, "13-17": 4, "18+": 4 };

// A streak of 3, 7, 14 and 30 days, and 10, 40, 100 and 250 lessons finished, each add a point.
const STREAK_STEPS = [3, 7, 14, 30];
const LESSON_STEPS = [10, 40, 100, 250];

const points = (value: number, steps: number[]) => steps.filter((step) => value >= step).length;

/** Auto's level: half the streak points plus half the lesson points, rounded up, then capped for the learner's age. */
export function autoChallengeLevel(user: Pick<UserProfile, "streakDays" | "completedLessonIds">, ageGroup?: AgeGroup | null): ChallengeLevel {
  const score = points(user.streakDays ?? 0, STREAK_STEPS) + points(user.completedLessonIds?.length ?? 0, LESSON_STEPS);
  const level = Math.ceil(score / 2);
  return Math.min(level, ageGroup ? AUTO_CAP[ageGroup] : 4) as ChallengeLevel;
}

/** The level a learner's lessons are asked at: Auto's climb, or the level they picked. */
export function challengeLevel(user: Pick<UserProfile, "streakDays" | "completedLessonIds" | "difficulty">, ageGroup?: AgeGroup | null): ChallengeLevel {
  switch (user.difficulty) {
    case "easy":
      return 0;
    // Hard is at least level 3, and climbs to 4 with Auto (an older learner's long streak).
    case "hard":
      return Math.max(3, autoChallengeLevel(user, null)) as ChallengeLevel;
    case "really_hard":
      return 5;
    default:
      return autoChallengeLevel(user, ageGroup);
  }
}

/**
 * The age a lesson's question mix is picked for (ageLevels.ts). "Easy" asks the youngest learners' mix (true/false
 * kept, no questions from memory) at any age; "Hard" and "Really hard" ask the full mix even for a young learner,
 * since they chose it.
 */
export function mixAgeFor(user: Pick<UserProfile, "difficulty">, ageGroup?: AgeGroup | null): AgeGroup | null | undefined {
  if (user.difficulty === "easy") return "6-9";
  if (user.difficulty === "hard" || user.difficulty === "really_hard") return null;
  return ageGroup;
}

export function isDifficultyChoice(value: unknown): value is DifficultyChoice {
  return typeof value === "string" && (DIFFICULTY_CHOICES as string[]).includes(value);
}
