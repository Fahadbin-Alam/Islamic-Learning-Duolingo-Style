import { COURSE, LESSONS_BY_ID } from "../data/course";
import { choiceQuestionsOf, harderQuestions, lessonStep, recallQuestions } from "../data/scalableCurriculum";
import type { Challenge } from "../types";

// Testers found the questions too easy: each lesson asked only what its card had just shown, half of it true or
// false. Now each unit gets harder as it goes: further on, a lesson also asks earlier lessons' questions from
// memory, with choices, in place of its true/false one, and the quizzes at the end of a companion unit are longer.

const mc = (id: string, prompt: string, answer: string, wrong: string[]): Challenge => ({
  id,
  type: "multiple_choice",
  prompt,
  choices: [answer, ...wrong].map((label, index) => ({ id: String.fromCharCode(97 + index), label })),
  correctChoiceId: "a",
  explanation: prompt.replace("____", answer)
});
const tf = (id: string, prompt: string): Challenge => ({
  id,
  type: "true_false",
  prompt,
  choices: [
    { id: "true", label: "True" },
    { id: "false", label: "False" }
  ],
  correctChoiceId: "true",
  explanation: prompt
});

describe("lessonStep", () => {
  it("starts easy and gets harder along a unit", () => {
    const steps = Array.from({ length: 10 }, (_, index) => lessonStep(index, 10));
    expect(steps.slice(0, 3)).toEqual([0, 0, 0]);
    expect(steps[9]).toBe(2);
    expect(steps).toEqual([...steps].sort());
  });

  it("starts a later unit of a one-course topic a step further on", () => {
    expect(lessonStep(1, 10, true)).toBeGreaterThan(lessonStep(1, 10));
  });
});

describe("harderQuestions", () => {
  const own = [mc("l3_fill", "The sky is ____.", "blue", ["green", "red"]), tf("l3_tf", "The sky is blue.")];
  const earlier = [
    { lessonId: "l1", nodeId: "n1", questions: [mc("l1_fill", "Grass is ____.", "green", ["pink", "black"]), tf("l1_tf", "Grass is green.")] },
    { lessonId: "l2", nodeId: "n2", questions: [mc("l2_fill", "Snow is ____.", "white", ["purple", "orange"])] }
  ];

  it("keeps the lesson's own questions at the first step", () => {
    expect(harderQuestions("l3", own, earlier, 0)).toBe(own);
  });

  it("swaps the true/false question for earlier multiple-choice ones, the lesson's own fill-in first", () => {
    const one = harderQuestions("l3", own, earlier, 1);
    expect(one.map((question) => question.type)).toEqual(["multiple_choice", "multiple_choice"]);
    expect(one[0].id).toBe("l3_fill");
    expect(one[1].isReview).toBe(true);
    expect(["l1", "l2"]).toContain(one[1].sourceLessonId);
    expect(harderQuestions("l3", own, earlier, 2)).toHaveLength(3);
  });

  it("keeps the true/false question when there is nothing earlier to ask", () => {
    expect(harderQuestions("l3", own, [], 2)).toBe(own);
  });

  it("never asks from memory a question whose answer another question names", () => {
    const kept = [mc("l3_fill", "Green grass grows ____.", "tall", ["short", "wide"])];
    expect(recallQuestions("l3", kept, choiceQuestionsOf(earlier), 2).map((question) => question.sourceLessonId)).toEqual(["l2"]);
  });
});

describe("the course", () => {
  const units = COURSE.sections.flatMap((section) =>
    section.branches.map((branch) =>
      section.nodes.filter((node) => node.branchId === branch.id).map((node) => LESSONS_BY_ID[node.lessonIds[0]]).filter(Boolean)
    )
  );
  // Notes lessons and the hand-written deep units (deepUnits.ts) set their own questions, so the ramp is not theirs.
  // A unit's generated circles are checked without the deep lessons that follow them.
  const generated = units
    .map((unit) => unit.filter((lesson) => !lesson.id.startsWith("lesson-deep-")))
    .filter((unit) => unit.length >= 6 && unit.every((lesson) => !lesson.id.startsWith("lesson-notes-")));
  const share = (lessons: typeof generated[number], test: (question: Challenge) => boolean) => {
    const questions = lessons.flatMap((lesson) => lesson.challenges);
    return questions.filter(test).length / Math.max(1, questions.length);
  };

  it("asks fewer true/false questions and more from memory near the end of a unit than at its start", () => {
    const starts = generated.flatMap((unit) => unit.slice(0, Math.ceil(unit.length / 3)));
    const ends = generated.flatMap((unit) => unit.slice(-Math.ceil(unit.length / 3)));
    const trueFalse = (question: Challenge) => question.type === "true_false";
    const recalled = (question: Challenge) => Boolean(question.isReview);
    expect(share(ends, trueFalse)).toBeLessThan(share(starts, trueFalse) / 2);
    expect(share(ends, recalled)).toBeGreaterThan(share(starts, recalled) + 0.3);
  });

  it("asks from memory, in a lesson that teaches a line, only lessons earlier in the same unit", () => {
    const problems: string[] = [];
    for (const unit of units) {
      unit.forEach((lesson, index) => {
        if (!lesson.challenges.some((question) => !question.isReview && !question.id.endsWith("_first"))) return;
        const before = new Set(unit.slice(0, index).map((item) => item.id));
        for (const question of lesson.challenges) {
          if (question.isReview && question.sourceLessonId && !before.has(question.sourceLessonId)) problems.push(`${question.id} asks ${question.sourceLessonId}`);
        }
      });
    }
    expect(problems).toEqual([]);
  });
});
