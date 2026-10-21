import { learningApi } from "../api/islamicLearningApi";
import { LESSONS_BY_ID, allNodes } from "../data/course";
import { asksSameLine } from "../data/scalableCurriculum";
import type { Challenge } from "../types";
import { makeUser } from "./testUtils";

// A fill-in and the sentence it was cut from ask the same thing: shown first, the sentence hands the
// fill-in its answer ("... his Islam at the market." then "... his Islam at the ____."). The review question
// a session adds must never ask the same line as one of the lesson's own questions, either way round.

const fillIn = (challenge: Challenge) => challenge.prompt.includes("____");
const pathLessonIds = [...new Set(allNodes.flatMap((node) => node.lessonIds))].filter((lessonId) => LESSONS_BY_ID[lessonId]);

describe("session review questions never ask a line the lesson already asks", () => {
  it("drops the Abu Dharr market fill-in from the Big quiz, whose True/False already says the line", async () => {
    const lessonId = "lesson-sahabi-abu-dharr-al-ghifari-mastery-lessons";
    expect(LESSONS_BY_ID[lessonId]).toBeDefined();
    const { lesson } = await learningApi.getLessonSession(lessonId, makeUser());
    const prompts = lesson.challenges.map((challenge) => challenge.prompt);
    expect(prompts.filter((prompt) => /called out his Islam at the/.test(prompt))).toHaveLength(
      prompts.filter((prompt) => /called out his Islam at the/.test(prompt) && !prompt.includes("____")).length
    );
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
