import { STARTER_USER } from "../data/course";
import type { UserProfile } from "../types";

export function makeUser(overrides: Partial<UserProfile> = {}): UserProfile {
  return {
    ...STARTER_USER,
    hearts: { ...STARTER_USER.hearts },
    // Past the warm-up lessons (they cost no hearts); a test for a brand-new learner passes [] itself.
    completedLessonIds: ["warm-up-1", "warm-up-2", "warm-up-3"],
    completedNodeIds: [],
    ...overrides
  };
}
