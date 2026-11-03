import { addXp, keepStreak, PRACTICE_XP_PER_CORRECT_ANSWER } from "../api/islamicLearningApi";
import type { StoryProgress, UserProfile } from "../types";

// Story mode progress (src/data/stories.ts): which stories are read, and the XP for reading one.

/** XP the first time a story is read to the end, on top of the XP for its questions. */
export const STORY_FIRST_READ_XP = 5;

export function getStoryProgress(user: Pick<UserProfile, "stories"> | undefined, storyId: string): StoryProgress | undefined {
  return user?.stories?.[storyId];
}

export function isStoryRead(user: Pick<UserProfile, "stories"> | undefined, storyId: string) {
  return Boolean(getStoryProgress(user, storyId)?.readAt);
}

/** XP for a story read to the end: practice pay for each question right on the first try, and a bonus the first time. */
export function storyXp(firstTryRight: number, firstRead: boolean) {
  return Math.max(0, firstTryRight) * PRACTICE_XP_PER_CORRECT_ANSWER + (firstRead ? STORY_FIRST_READ_XP : 0);
}

export type StoryRecord = { user: UserProfile; xp: number; firstRead: boolean };

/** Saves a story read to the end: its XP, one more read, and the streak kept, as a lesson would. */
export function recordStoryRead(user: UserProfile, storyId: string, firstTryRight: number, now = new Date()): StoryRecord {
  const before = user.stories?.[storyId];
  const firstRead = !before?.readAt;
  const xp = storyXp(firstTryRight, firstRead);
  const progress: StoryProgress = { readAt: now.toISOString(), reads: (before?.reads ?? 0) + 1 };
  const withXp = keepStreak(addXp(user, xp, now), now);
  return {
    user: { ...withXp, stories: { ...user.stories, [storyId]: progress }, lastLearningAt: now.toISOString() },
    xp,
    firstRead
  };
}
