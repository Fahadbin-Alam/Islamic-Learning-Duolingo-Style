import type { AgeGroup } from "../services/monetizationConfig";
import type { Lesson } from "../types";
import { asksSameLine, givesAway, SET_ASIDE, withoutGiveaways } from "./scalableCurriculum";

/**
 * How many from-memory questions (asked again from an earlier lesson) a lesson keeps for each age. Past the first
 * steps of a unit, a lesson swaps its true/false question for some of these; young learners keep the true/false and
 * get fewer of them, so a lesson stays a quick true/false plus a few 4-choice questions. Older learners, and anyone
 * who has not said their age, get the full climb.
 */
const FROM_MEMORY_LIMIT: Partial<Record<AgeGroup, number>> = { "6-9": 0, "10-12": 1 };

/** The lesson as asked at this age: the same lesson for 13 and over, an easier mix for younger learners. */
export function lessonForAge(lesson: Lesson, ageGroup: AgeGroup | null | undefined): Lesson {
  const limit = ageGroup ? FROM_MEMORY_LIMIT[ageGroup] : undefined;
  const setAside = SET_ASIDE.get(lesson.id);
  if (limit === undefined || !setAside) return lesson;
  // Only teaching lessons have questions set aside; a review asks nothing but questions from earlier lessons.
  const fromMemory = lesson.challenges.filter((question) => question.isReview);
  if (!fromMemory.length || fromMemory.length === lesson.challenges.length) return lesson;
  const asked = new Set(lesson.challenges.map((question) => question.id));
  const back = setAside.filter((question) => !asked.has(question.id));
  // A from-memory question that asks a returning true/false's line, or names its answer either way round, goes.
  const clashes = (question: Lesson["challenges"][number]) =>
    back.some((other) => asksSameLine(other, question) || givesAway(other, question) || givesAway(question, other));
  const keep = new Set(fromMemory.filter((question) => !clashes(question)).slice(0, limit).map((question) => question.id));
  const kept = lesson.challenges.filter((question) => !question.isReview || keep.has(question.id));
  return { ...lesson, challenges: withoutGiveaways([...kept, ...back]) };
}
