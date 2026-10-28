import { learningApi } from "../api/islamicLearningApi";
import { LESSONS_BY_ID, allNodes } from "../data/course";
import { asksSameLine, givesAway } from "../data/scalableCurriculum";
import type { Challenge } from "../types";
import { makeUser } from "./testUtils";

// A fill-in and the sentence it was cut from ask the same thing: shown first, the sentence hands the
// fill-in its answer ("... his Islam at the market." then "... his Islam at the ____."). The review question
// a session adds must never ask the same line as one of the lesson's own questions, either way round.

const fillIn = (challenge: Challenge) => challenge.prompt.includes("____");
const pathLessonIds = [...new Set(allNodes.flatMap((node) => node.lessonIds))].filter((lessonId) => LESSONS_BY_ID[lessonId]);

describe("session review questions never ask a line the lesson already asks", () => {
  it("asks the Abu Dharr market line once in the Big quiz, never as a sentence and a fill-in both", async () => {
    const lessonId = "lesson-sahabi-abu-dharr-al-ghifari-mastery-lessons";
    expect(LESSONS_BY_ID[lessonId]).toBeDefined();
    const { lesson } = await learningApi.getLessonSession(lessonId, makeUser());
    const prompts = lesson.challenges.map((challenge) => challenge.prompt);
    expect(prompts.filter((prompt) => /called out his Islam at the/.test(prompt)).length).toBeLessThanOrEqual(1);
  });

  it("finds no sentence before a fill-in of the same line, and no added review sharing a line, in any path lesson", async () => {
    expect(pathLessonIds.length).toBeGreaterThan(500);
    const before: string[] = [];
    const added: string[] = [];

    for (const lessonId of pathLessonIds) {
      const own = LESSONS_BY_ID[lessonId].challenges;
      const { lesson } = await learningApi.getLessonSession(lessonId, makeUser());
      const asked = lesson.challenges;

      asked.forEach((question, index) => {
        if (!fillIn(question)) {
          return;
        }
        // Any sentence (True/False or not) asked earlier in the lesson that is this fill-in's line.
        asked.slice(0, index).forEach((earlier) => {
          if (!fillIn(earlier) && asksSameLine(earlier, question)) {
            before.push(`${lessonId}: "${earlier.prompt}" before "${question.prompt}"`);
          }
        });
      });

      // What the session added to the lesson's own questions: none of it may share a line with them.
      const ownIds = new Set(own.map((challenge) => challenge.id));
      asked
        .filter((question) => !ownIds.has(question.id))
        .forEach((extra) => {
          own.forEach((question) => {
            if (asksSameLine(extra, question)) {
              added.push(`${lessonId}: added "${extra.prompt}" shares a line with "${question.prompt}"`);
            }
          });
        });
    }

    expect(before).toEqual([]);
    expect(added).toEqual([]);
  });
});

describe("no question hands the learner the answer to a fill-in after it", () => {
  it("makes the Abu Dharr Big quiz a long multiple-choice quiz, with a review from further back in the unit", async () => {
    const { lesson } = await learningApi.getLessonSession("lesson-sahabi-abu-dharr-al-ghifari-mastery-lessons", makeUser());
    expect(lesson.challenges.length).toBeGreaterThanOrEqual(6);
    expect(lesson.challenges.every((challenge) => challenge.type === "multiple_choice")).toBe(true);
    expect(lesson.challenges.filter((challenge) => challenge.isReview && /_review_/.test(challenge.id)).length).toBeGreaterThan(0);
  });

  it("asks a fill-in before any question whose prompt, right answer or Why line names its answer, in every session", async () => {
    const problems: string[] = [];
    for (const lessonId of pathLessonIds) {
      const { lesson } = await learningApi.getLessonSession(lessonId, makeUser());
      lesson.challenges.forEach((question, index) => {
        lesson.challenges.slice(0, index).forEach((earlier) => {
          // Two questions that name each other's answer cannot both go first; the lesson keeps its own order.
          if (givesAway(earlier, question) && !givesAway(question, earlier)) problems.push(`${lessonId}: "${earlier.prompt}" before "${question.prompt}"`);
        });
      });
    }
    expect(problems).toEqual([]);
  });

  it("finds the Talhah, Musa and Harun, and prayer times giveaways the old order had", () => {
    const index = (lessonId: string, pattern: RegExp) => LESSONS_BY_ID[lessonId].challenges.findIndex((challenge) => pattern.test(challenge.prompt));
    // When a harder review no longer asks one of the two (it asks multiple-choice questions), nothing is given away.
    const fillInFirst = (lessonId: string, fill: RegExp, sentence: RegExp) => {
      const [at, later] = [index(lessonId, fill), index(lessonId, sentence)];
      return at < 0 || later < 0 || at < later;
    };
    expect(fillInFirst("lesson-sahabi-talhah-ibn-ubaydillah-mastery-lessons", /invited by ____/, /same clan as Abu Bakr/)).toBe(true);
    expect(fillInFirst("lesson-prophets-power-and-deliverance-power-review", /his brother ____/, /Musa and Harun/)).toBe(true);
    expect(fillInFirst("lesson-prayer-times-times-review", /begins with ____/, /Fajr is just after midday/)).toBe(true);
  });
});
