import type { Challenge } from "../../types";

/** Dates paid for a lesson finished for the first time with no mistakes. */
export const PERFECT_LESSON_DATES = 5;

/** How many of a lesson's questions the end-of-lesson recap shows again. */
export const RECAP_SIZE = 3;

export type LessonRecapItem = { question: string; answer: string; missed: boolean };

/** True / false answers say nothing on their own ("True"), so they are left out of the recap. */
function plainAnswer(label: string) {
  return !/^(true|false|yes|no)$/i.test(label.trim());
}

/**
 * The lesson's own questions with their right answers, to read once more at the end: those missed on their first try
 * first (they need it most), then the others in lesson order. Review questions from other lessons are left out, and
 * no question is shown twice.
 */
export function lessonRecap(challenges: Challenge[], missedIds: string[] = [], size = RECAP_SIZE): LessonRecapItem[] {
  const missed = new Set(missedIds);
  const own = challenges.filter((challenge) => !challenge.isReview && !challenge.missedBefore && !challenge.listen);
  const ordered = [...own.filter((challenge) => missed.has(challenge.id)), ...own.filter((challenge) => !missed.has(challenge.id))];
  const seen = new Set<string>();
  const items: LessonRecapItem[] = [];
  for (const challenge of ordered) {
    const answer = challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label;
    const key = challenge.prompt.trim().toLowerCase();
    if (!answer || !plainAnswer(answer) || seen.has(key) || /_{2,}/.test(challenge.prompt)) continue;
    seen.add(key);
    items.push({ question: challenge.prompt, answer, missed: missed.has(challenge.id) });
    if (items.length >= size) break;
  }
  return items;
}
