import { COURSE, findNodeByLessonId } from "../data/course";
import type { QuizScope, QuizScore, UserProfile } from "../types";

// Quizzes (Practice tab): a scored check of a whole topic or one unit, to see how much a learner knows. The
// questions come from createQuizSession (src/api/islamicLearningApi.ts); this file keeps the scores.

/** Gems for the first perfect score on each quiz, once. */
export const QUIZ_PERFECT_GEMS = 10;

export function quizId(scope: QuizScope) {
  return scope.kind === "topic" ? `topic:${scope.topicId}` : `unit:${scope.unitId}`;
}

export function getQuizScore(user: Pick<UserProfile, "quizScores"> | undefined, scope: QuizScope): QuizScore | undefined {
  return user?.quizScores?.[quizId(scope)];
}

export function quizPercent(correct: number, total: number) {
  return total > 0 ? Math.round((Math.max(0, Math.min(correct, total)) / total) * 100) : 0;
}

export type QuizGrade = "perfect" | "strong" | "growing" | "starting";

/** How the score reads: 100 perfect, 80 and up strong, 50 and up growing, below that just starting. */
export function quizGrade(percent: number): QuizGrade {
  if (percent >= 100) return "perfect";
  if (percent >= 80) return "strong";
  if (percent >= 50) return "growing";
  return "starting";
}

export type QuizRecord = {
  user: UserProfile;
  percent: number;
  /** The best before this try (undefined on a first try). */
  previousBest?: number;
  newBest: boolean;
  gems: number;
};

/** Saves a finished quiz: last and best score, one more try, and the one-time gems for a first perfect score. */
export function recordQuizScore(user: UserProfile, scope: QuizScope, correct: number, total: number, now = new Date()): QuizRecord {
  const id = quizId(scope);
  const before = user.quizScores?.[id];
  const percent = quizPercent(correct, total);
  const gems = percent >= 100 && !before?.perfectRewarded ? QUIZ_PERFECT_GEMS : 0;
  const score: QuizScore = {
    best: Math.max(before?.best ?? 0, percent),
    last: percent,
    taken: (before?.taken ?? 0) + 1,
    takenAt: now.toISOString(),
    ...(before?.perfectRewarded || gems ? { perfectRewarded: true } : {})
  };

  return {
    user: { ...user, gems: user.gems + gems, quizScores: { ...user.quizScores, [id]: score } },
    percent,
    previousBest: before?.best,
    newBest: before !== undefined && percent > before.best,
    gems
  };
}

/** The units a quiz's missed questions came from, most misses first (ties in path order). */
export function unitsToGoOver(missedLessonIds: string[], topicId: string): string[] {
  const section = COURSE.sections.find((item) => item.topicId === topicId);
  const order = new Map((section?.branches ?? []).map((branch, index) => [branch.id, index]));
  const misses = new Map<string, number>();

  for (const lessonId of missedLessonIds) {
    const unitId = findNodeByLessonId(lessonId)?.branchId;

    if (unitId && order.has(unitId)) {
      misses.set(unitId, (misses.get(unitId) ?? 0) + 1);
    }
  }

  return Array.from(misses.keys()).sort(
    (left, right) => (misses.get(right) ?? 0) - (misses.get(left) ?? 0) || (order.get(left) ?? 0) - (order.get(right) ?? 0)
  );
}
