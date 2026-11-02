import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { COURSE, LESSONS_BY_ID } from "../data/course";
import { isUnitTestLesson } from "../api/islamicLearningApi";
import { buildLessonFlow, isMatchStep, isQuestionStep, isRecallLesson } from "../ui/lesson/lessonPages";
import {
  CHECK_FALSE,
  CHECK_TRUE,
  WRONG_BUILD,
  canBuild,
  checkAnswerId,
  checkCandidate,
  matchPicks,
  puzzleExtras,
  puzzleWords,
  questionFormat,
  sameWords
} from "../ui/lesson/questionFormats";
import { BuildGame, GapGame, MatchGame } from "../ui/lesson/WordGames";
import type { Challenge } from "../types";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

// This file tests the other ways of asking, so it turns them on (scripts/jest/setup.js turns them off for the rest).
(globalThis as { __QUESTION_VARIETY__?: boolean }).__QUESTION_VARIETY__ = true;

const LESSONS = Object.values(LESSONS_BY_ID);
const ALL = LESSONS.flatMap((lesson) => lesson.challenges);

const mc: Challenge = {
  id: "q-first-caliph",
  type: "multiple_choice",
  prompt: "Who was the first caliph after the Prophet ﷺ?",
  choices: [
    { id: "a", label: "Abu Bakr as-Siddiq" },
    { id: "b", label: "Umar ibn al-Khattab" },
    { id: "c", label: "Uthman ibn Affan" }
  ],
  correctChoiceId: "a",
  explanation: "Abu Bakr was chosen first."
};

describe("asking one question in more than one way", () => {
  it("keeps true / false as it is and turns every English gap sentence into a gap to fill", () => {
    for (const challenge of ALL.slice(0, 4000)) {
      const format = questionFormat(challenge);
      if (challenge.type === "true_false") expect(format).toBe("choose");
      if (format === "blank") expect(challenge.prompt).toMatch(/_{2,}/);
      if (format === "build") expect(canBuild(challenge)).toBe(true);
    }
  });

  it("mixes the formats across the course, and leans away from plain tiles when a question comes back", () => {
    const count = (recall: boolean) => {
      const tally: Record<string, number> = { choose: 0, blank: 0, build: 0, check: 0 };
      ALL.forEach((challenge) => (tally[questionFormat(challenge, { recall })] += 1));
      return tally;
    };
    const learn = count(false);
    const recall = count(true);
    expect(learn.build).toBeGreaterThan(100);
    expect(learn.check).toBeGreaterThan(100);
    expect(learn.blank).toBeGreaterThan(10);
    expect(recall.choose).toBeLessThan(learn.choose);
  });

  it("makes word puzzles only for English", () => {
    const buildable = ALL.find((challenge) => questionFormat(challenge) === "build")!;
    expect(questionFormat(buildable, { language: "bn" })).not.toBe("build");
  });

  it("scores true-or-false as the real answer: right when the shown choice was judged right", () => {
    const shown = checkCandidate(mc);
    const shownRight = shown.id === mc.correctChoiceId;
    expect(checkAnswerId(mc, shownRight ? CHECK_TRUE : CHECK_FALSE)).toBe(mc.correctChoiceId);
    expect(checkAnswerId(mc, shownRight ? CHECK_FALSE : CHECK_TRUE)).not.toBe(mc.correctChoiceId);
    // Across many questions the shown choice is sometimes right and sometimes wrong.
    const rights = ALL.slice(0, 400).filter((challenge) => checkCandidate(challenge).id === challenge.correctChoiceId).length;
    expect(rights).toBeGreaterThan(100);
    expect(rights).toBeLessThan(300);
  });

  it("builds puzzles from the answer's words plus words of the wrong choices", () => {
    expect(puzzleWords("Abu Bakr as-Siddiq.")).toEqual(["Abu", "Bakr", "as-Siddiq"]);
    const extras = puzzleExtras(mc);
    expect(extras.length).toBeGreaterThanOrEqual(2);
    extras.forEach((word) => expect(["abu", "bakr", "as-siddiq"]).not.toContain(word.toLowerCase()));
    expect(sameWords(["abu", "Bakr", "as-Siddiq"], puzzleWords("Abu Bakr as-Siddiq"))).toBe(true);
  });

  it("picks 3 or 4 short questions with different answers for a matching round", () => {
    const review = LESSONS.find((lesson) => isRecallLesson(lesson) && matchPicks(lesson.challenges).length)!;
    const picks = matchPicks(review.challenges);
    expect(picks.length).toBeGreaterThanOrEqual(3);
    expect(picks.length).toBeLessThanOrEqual(4);
    const answers = picks.map((index) => review.challenges[index].choices.find((choice) => choice.id === review.challenges[index].correctChoiceId)!.label);
    expect(new Set(answers).size).toBe(answers.length);
  });
});

describe("lesson, question, lesson, question; quizzes and tests come later", () => {
  it("never asks a circle's own question twice in a lesson", () => {
    for (const lesson of LESSONS.filter((each) => !isRecallLesson(each)).slice(0, 1500)) {
      const asked = buildLessonFlow(lesson).filter(isQuestionStep).map((step) => step.index);
      expect(new Set(asked).size).toBe(asked.length);
      expect(asked.length).toBe(lesson.challenges.length);
    }
  });

  it("opens a quiz circle with a matching round and asks the rest one by one; a unit test asks each question on its own", () => {
    const quizzes = LESSONS.filter((lesson) => isRecallLesson(lesson) && matchPicks(lesson.challenges).length);
    expect(quizzes.length).toBeGreaterThan(50);
    for (const lesson of quizzes.slice(0, 200)) {
      const flow = buildLessonFlow(lesson);
      const match = flow.find(isMatchStep)!;
      expect(match).toBeDefined();
      const asked = flow.filter(isQuestionStep).map((step) => step.index);
      expect([...asked, ...match.indices].sort((a, b) => a - b)).toEqual(lesson.challenges.map((_, index) => index));
      const test = buildLessonFlow(lesson, { test: true });
      expect(test.some(isMatchStep)).toBe(false);
      expect(test.filter(isQuestionStep).length).toBe(lesson.challenges.length);
    }
  });

  it("makes the quiz circle that ends each unit its test, and the ones in the middle quizzes", () => {
    let tests = 0;
    let middles = 0;
    for (const section of COURSE.sections) {
      for (const branch of section.branches) {
        const nodes = section.nodes.filter((node) => node.branchId === branch.id);
        nodes.forEach((node, index) => {
          const lesson = LESSONS_BY_ID[node.lessonIds[0]];
          if (!lesson || !isRecallLesson(lesson)) return;
          if (index === nodes.length - 1) {
            expect(isUnitTestLesson(lesson)).toBe(true);
            tests += 1;
          } else {
            expect(isUnitTestLesson(lesson)).toBe(false);
            middles += 1;
          }
        });
      }
    }
    expect(tests).toBeGreaterThan(200);
    expect(middles).toBeGreaterThan(50);
  });
});

describe("the games", () => {
  const base = { mascotVariant: "camel", accent: "#21B573", onCheck: jest.fn(), onContinue: jest.fn() };

  it("fills the gap with a tapped word", async () => {
    const onSelect = jest.fn();
    await act(async () => {
      render(
        <GapGame
          {...base}
          prompt="The first pillar of Islam is the ____."
          choices={[
            { id: "s", label: "Shahadah" },
            { id: "z", label: "Zakat" }
          ]}
          correctChoiceId="s"
          onSelect={onSelect}
        />
      );
    });
    expect(screen.getByTestId("gap-sentence")).toBeTruthy();
    await act(async () => {
      fireEvent.press(screen.getByTestId("choice-s"));
    });
    expect(onSelect).toHaveBeenCalledWith("s");
  });

  it("builds the answer from tiles and reports it right only when the words are in order", async () => {
    const onSelect = jest.fn();
    await act(async () => {
      render(<BuildGame {...base} prompt={mc.prompt} answer="Abu Bakr as-Siddiq" correctChoiceId="a" extras={["Umar", "Uthman"]} onSelect={onSelect} />);
    });
    for (const word of ["Bakr", "Abu", "as-Siddiq"]) {
      await act(async () => {
        fireEvent.press(screen.getByTestId(`build-tile-${word}`));
      });
    }
    expect(onSelect).toHaveBeenLastCalledWith(WRONG_BUILD);
  });

  it("builds the right answer", async () => {
    const onSelect = jest.fn();
    await act(async () => {
      render(<BuildGame {...base} prompt={mc.prompt} answer="Abu Bakr as-Siddiq" correctChoiceId="a" extras={["Umar", "Uthman"]} onSelect={onSelect} />);
    });
    for (const word of ["Abu", "Bakr", "as-Siddiq"]) {
      await act(async () => {
        fireEvent.press(screen.getByTestId(`build-tile-${word}`));
      });
    }
    expect(onSelect).toHaveBeenLastCalledWith("a");
  });

  it("matches pairs, shakes on a wrong pair, and continues once all are matched", async () => {
    const onDone = jest.fn();
    const pairs = [
      { index: 0, left: "First caliph?", right: "Abu Bakr" },
      { index: 1, left: "Second caliph?", right: "Umar" },
      { index: 2, left: "Third caliph?", right: "Uthman" }
    ];
    await act(async () => {
      render(<MatchGame pairs={pairs} mascotVariant="camel" accent="#21B573" onDone={onDone} playSound={false} />);
    });
    const tap = async (id: string) =>
      act(async () => {
        fireEvent.press(screen.getByTestId(id));
      });
    await tap("match-question-0");
    await tap("match-answer-1");
    expect(screen.queryByText("Abu Bakr", { exact: true })).toBeTruthy();
    for (const index of [0, 1, 2]) {
      await tap(`match-question-${index}`);
      await tap(`match-answer-${index}`);
    }
    await tap("feedback-continue");
    expect(onDone).toHaveBeenCalled();
  });
});
