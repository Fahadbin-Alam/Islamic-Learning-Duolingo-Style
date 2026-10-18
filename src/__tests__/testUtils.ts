import { STARTER_USER } from "../data/course";
import type { UserProfile } from "../types";

export function makeUser(overrides: Partial<UserProfile> = {}): UserProfile {
  return {
    ...STARTER_USER,
    hearts: { ...STARTER_USER.hearts },
    completedLessonIds: [],
    completedNodeIds: [],
    ...overrides
  };
}
