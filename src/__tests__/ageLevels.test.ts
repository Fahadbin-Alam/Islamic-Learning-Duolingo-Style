import { learningApi } from "../api/islamicLearningApi";
import { lessonForAge } from "../data/ageLevels";
import { LESSONS_BY_ID, STARTER_USER } from "../data/course";
import { asksSameLine, givesAway, withoutGiveaways } from "../data/scalableCurriculum";
import type { AgeGroup } from "../services/monetizationConfig";
import type { Challenge } from "../types";

// Fahad: young children need true/false and a few 4-choice questions; older learners get easy ones and harder ones.
// The age picked at the start sets that: 13 and over get the full climb, younger learners an easier mix.

// The hand-written deep units (deepUnits.ts) and surah meanings (surahMeanings/) have no questions set aside, so they
// are the same at every age.
const lessons = Object.values(LESSONS_BY_ID).filter((lesson) => !lesson.id.startsWith("lesson-deep-") && !lesson.id.startsWith("lesson-surah-meaning-"));
const asked = (ageGroup?: AgeGroup) => lessons.flatMap((lesson) => lessonForAge(lesson, ageGroup).challenges);
const share = (questions: Challenge[], keep: (question: Challenge) => boolean) => questions.filter(keep).length / questions.length;
const isTrueFalse = (question: Challenge) => question.type === "true_false";

describe("lessons by age", () => {
  it("leaves lessons as they are for 13 and over, and for anyone who has not said", () => {
    for (const ageGroup of ["13-17", "18+", undefined] as const) {
      expect(lessons.every((lesson) => lessonForAge(lesson, ageGroup) === lesson)).toBe(true);
    }
  });

  it("gives young children more true/false and fewer from-memory questions", () => {
    const adult = asked("18+");
    const young = asked("6-9");
    const middle = asked("10-12");
    expect(share(young, isTrueFalse)).toBeGreaterThan(share(adult, isTrueFalse) + 0.1);
    expect(share(middle, isTrueFalse)).toBeGreaterThanOrEqual(share(young, isTrueFalse) - 0.05);
    const fromMemory = (questions: Challenge[]) => questions.filter((question) => question.isReview).length;
    expect(fromMemory(young)).toBeLessThan(fromMemory(middle));
    expect(fromMemory(middle)).toBeLessThan(fromMemory(adult));
  });

  it("keeps every changed lesson playable: no from-memory question asking a line twice, no answer named before it is asked, 4 choices at most", () => {
    for (const ageGroup of ["6-9", "10-12"] as const) {
      for (const lesson of lessons) {
        const easier = lessonForAge(lesson, ageGroup);
        if (easier === lesson) continue;
        const { challenges } = easier;
        expect(challenges.length).toBeGreaterThanOrEqual(Math.min(2, lesson.challenges.length));
        expect(new Set(challenges.map((question) => question.id)).size).toBe(challenges.length);
        expect(withoutGiveaways(challenges)).toEqual(challenges);
        challenges.forEach((question, index) =>
          challenges.slice(index + 1).forEach((later) => {
            if (question.isReview || later.isReview) expect(asksSameLine(question, later)).toBe(false);
            expect(givesAway(question, later)).toBe(false);
          })
        );
        if (ageGroup === "6-9") expect(challenges.every((question) => question.choices.length <= 4)).toBe(true);
      }
    }
  });

  it("asks a young child's lesson session with the easier mix", async () => {
    const lesson = lessons.find((item) => lessonForAge(item, "6-9") !== item)!;
    const young = await learningApi.getLessonSession(lesson.id, STARTER_USER, "6-9");
    const adult = await learningApi.getLessonSession(lesson.id, STARTER_USER, "18+");
    expect(young.lesson.challenges.some(isTrueFalse)).toBe(true);
    expect(young.lesson.challenges.filter((question) => question.isReview).length).toBeLessThan(adult.lesson.challenges.filter((question) => question.isReview).length);
  });
});
