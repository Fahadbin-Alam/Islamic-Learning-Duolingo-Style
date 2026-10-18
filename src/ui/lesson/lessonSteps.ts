import type { Lesson, LessonPracticeActivity } from "../../types";

// Only real ordering games are worth a step; the generic "pick the takeaway" drills just repeat the question.
export function isPlayablePractice(activity: LessonPracticeActivity) {
  return activity.kind === "sequence" && !activity.id.endsWith("_story_arc");
}

export type LessonStepScreen = "lesson_teach" | "lesson_practice" | "lesson_question" | "lesson_feedback" | "lesson_complete";

// Steps in a lesson: the learn card, the ordering game (if any), then one per question.
export function getLessonProgress({
  screen,
  hasTeach,
  hasPractice,
  challengeIndex,
  challengeCount,
  answeredCorrectly
}: {
  screen: string;
  hasTeach: boolean;
  hasPractice: boolean;
  challengeIndex: number;
  challengeCount: number;
  answeredCorrectly: boolean;
}) {
  const before = (hasTeach ? 1 : 0) + (hasPractice ? 1 : 0);
  const total = Math.max(1, before + challengeCount);

  switch (screen as LessonStepScreen) {
    case "lesson_teach":
      return 0;
    case "lesson_practice":
      return (hasTeach ? 1 : 0) / total;
    case "lesson_question":
      return (before + challengeIndex) / total;
    case "lesson_feedback":
      return (before + challengeIndex + (answeredCorrectly ? 1 : 0)) / total;
    case "lesson_complete":
      return 1;
    default:
      return 0;
  }
}

// The mascot says one short line, so keep only the lesson's opening sentence.
export function getLessonLine(lesson: Pick<Lesson, "intro" | "title">) {
  const intro = lesson.intro?.trim() ?? "";
  const firstSentence = intro.match(/^.+?[.!?](?=\s|$)/)?.[0] ?? intro;
  return (firstSentence || lesson.title).trim();
}
