import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { FoundationAssessmentScreen } from "../components/FoundationLearning";
import { COURSE } from "../data/course";
import {
  advanceFoundationAssessment,
  createEmptyLearnerProfile,
  createFoundationAssessment,
  getFoundationWordBank,
  getSessionProgress,
  submitFoundationAssessmentAnswer
} from "../services/foundationAssessment";
import { playGameSound } from "../services/gameAudio";
import type { FoundationAssessmentState, FoundationQuestion, LearningNodeView } from "../types";
import { LessonComplete } from "../ui/lesson";
import { LearnPath, testOutGoalLine, type PathUnit } from "../ui/screens";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

type Answer = string | string[] | Record<string, string>;

const foundation = COURSE.sections.find((section) => section.topicId === "foundation")!;
const view = (index: number, status: LearningNodeView["status"]): LearningNodeView => ({
  ...foundation.nodes[index],
  status,
  firstLessonId: foundation.nodes[index].lessonIds[0]
});

describe("LessonComplete sounds", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  async function soundsFor(xp: number) {
    jest.useFakeTimers();
    jest.mocked(playGameSound).mockClear();
    await render(<LessonComplete title="Replay" xp={xp} stars={3} streakDays={2} mascotVariant="hijabi" accent="#21B573" onContinue={jest.fn()} />);
    await act(async () => {
      jest.advanceTimersByTime(4000);
    });
    return jest.mocked(playGameSound).mock.calls.map(([event]) => event);
  }

  it("plays the XP count-up sound when the lesson paid XP", async () => {
    expect(await soundsFor(12)).toEqual(expect.arrayContaining(["lesson_complete", "xp"]));
  });

  it("plays no XP sound on a replay that paid 0 XP", async () => {
    const sounds = await soundsFor(0);
    expect(sounds).toContain("lesson_complete");
    expect(sounds).not.toContain("xp");
  });
});

describe("the Jump ahead sheet's goal", () => {
  it("says the pass mark and the miss that ends the test", () => {
    expect(testOutGoalLine({ total: 10, passingScore: 8 })).toBe("Get 8 of 10 right. 3 misses end it.");
    expect(testOutGoalLine({ total: 5, passingScore: 4 })).toBe("Get 4 of 5 right. 2 misses end it.");
    expect(testOutGoalLine({ total: 3, passingScore: 3 })).toBe("Get 3 of 3 right. 1 miss ends it.");
  });
});

describe("LearnPath's circle to play next", () => {
  const units: PathUnit[] = [
    {
      id: "unit-a",
      number: 1,
      title: "First",
      done: 0,
      total: 2,
      items: [
        { kind: "node", node: view(0, "current"), lessonNumber: 1 },
        { kind: "node", node: view(1, "locked"), lessonNumber: 2 }
      ]
    },
    {
      id: "unit-b",
      number: 2,
      title: "Second",
      done: 1,
      total: 3,
      canTestOut: true,
      items: [
        { kind: "node", node: view(2, "completed"), lessonNumber: 3 },
        { kind: "node", node: view(3, "available"), lessonNumber: 4 },
        { kind: "node", node: view(4, "locked"), lessonNumber: 5 }
      ]
    }
  ];
  const label = (index: number) => screen.getByTestId(`path-node-${foundation.nodes[index].id}`).props.accessibilityLabel as string;
  const base = {
    accent: foundation.accentColor,
    topicId: "foundation",
    mascotVariant: "hijabi",
    units,
    xpForNode: () => 10,
    onStartNode: jest.fn(),
    onClaimChest: jest.fn(),
    onTestOut: jest.fn()
  };

  it("puts START on the first current circle by default", async () => {
    await render(<LearnPath {...base} />);
    expect(label(0)).toMatch(/, start$/);
    expect(label(3)).not.toMatch(/, start$/);
    expect(screen.queryByTestId("unit-test-out-unit-b")).toBeNull();
  });

  it("puts START, and the unit's key, on the circle the caller names while it is open", async () => {
    await render(<LearnPath {...base} currentNodeId={foundation.nodes[3].id} />);
    expect(label(3)).toMatch(/, start$/);
    expect(label(0)).not.toMatch(/, start$/);
    expect(screen.getByTestId("unit-test-out-unit-b")).toBeTruthy();
  });

  it("ignores a named circle that is locked", async () => {
    await render(<LearnPath {...base} currentNodeId={foundation.nodes[4].id} />);
    expect(label(0)).toMatch(/, start$/);
  });

  it("says the test's goal on the sheet before it starts", async () => {
    const testOutGoal = jest.fn(() => ({ total: 5, passingScore: 4 }));
    await render(<LearnPath {...base} currentNodeId={foundation.nodes[3].id} testOutGoal={testOutGoal} />);
    await act(async () => {
      fireEvent.press(screen.getByTestId("unit-test-out-unit-b"));
    });
    expect(testOutGoal).toHaveBeenCalledWith("unit-b", undefined);
    expect(screen.getByTestId("test-out-sheet-goal")).toHaveTextContent("Get 4 of 5 right. 2 misses end it.");
  });
});

function wrongAnswerFor(question: FoundationQuestion): Answer {
  const answer = question.correctAnswer;
  if (question.type === "correct_order" && Array.isArray(answer)) return [...answer].reverse();
  if (question.type === "match_pairs" && answer && typeof answer === "object" && !Array.isArray(answer)) {
    const lefts = Object.keys(answer);
    const rights = lefts.map((left) => answer[left]);
    return Object.fromEntries(lefts.map((left, index) => [left, rights[(index + 1) % rights.length]]));
  }
  if (Array.isArray(answer)) return (question.options ?? []).filter((option) => !answer.includes(option)).slice(0, 1);
  const words = question.type === "fill_in_blank" ? getFoundationWordBank(question) : question.options ?? [];
  return words.find((option) => option !== answer) ?? "not the answer";
}

describe("the practice counter", () => {
  // A daily challenge with its third question missed: every state it shows, after each CHECK.
  function dailyWithAMiss() {
    let profile = createEmptyLearnerProfile();
    let state: FoundationAssessmentState | null = createFoundationAssessment(profile, "daily_challenge");
    const planned = state.totalQuestions;
    const shown: { state: FoundationAssessmentState; checked: FoundationAssessmentState }[] = [];
    while (state) {
      const question = state.currentQuestion;
      const right = state.questionNumber !== 3;
      const result = submitFoundationAssessmentAnswer({ profile, state, selectedAnswer: right ? (question.correctAnswer as Answer) : wrongAnswerFor(question), responseTimeMs: 3000 });
      profile = result.nextProfile;
      shown.push({ state, checked: result.stateWithFeedback });
      state = advanceFoundationAssessment(profile, result.stateWithFeedback);
    }
    return { planned, shown };
  }

  it("keeps the total it started with, and the missed question comes back at the last number", () => {
    const { planned, shown } = dailyWithAMiss();
    expect(shown).toHaveLength(planned + 1);
    expect(shown.map(({ state }) => getSessionProgress(state).total)).toEqual(shown.map(() => planned));
    expect(shown.map(({ checked }) => getSessionProgress(checked).total)).toEqual(shown.map(() => planned));
    expect(shown.map(({ state }) => getSessionProgress(state).number)).toEqual([...Array.from({ length: planned }, (_, index) => index + 1), planned]);
    // The bar never moves back: the miss is done only once it is answered again, and then the bar is full.
    const done = shown.map(({ checked }) => getSessionProgress(checked).done);
    expect(done).toEqual([...done].sort((a, b) => a - b));
    expect(done[2]).toBe(done[1]);
    expect(done[done.length - 1]).toBe(planned);
  });

  it("shows the retry with its Try again! chip, out of the same total", async () => {
    const { planned, shown } = dailyWithAMiss();
    const retry = shown[shown.length - 1].state;
    await render(
      <FoundationAssessmentScreen
        assessment={retry}
        language="en"
        selectedAnswer={undefined}
        onChangeSelectedAnswer={jest.fn()}
        onSubmit={jest.fn()}
        onContinue={jest.fn()}
        onExit={jest.fn()}
      />
    );
    expect(screen.getByTestId("assessment-retry")).toHaveTextContent("Try again!");
    expect(screen.getByText(`${planned}/${planned}`)).toBeTruthy();
    expect(screen.queryByText(`${planned + 1}/${planned + 1}`)).toBeNull();
  });

  it("counts every answer of the level check, which asks each question once", () => {
    let profile = createEmptyLearnerProfile();
    const state = createFoundationAssessment(profile, "placement");
    const question = state.currentQuestion;
    const result = submitFoundationAssessmentAnswer({ profile, state, selectedAnswer: wrongAnswerFor(question), responseTimeMs: 3000 });
    profile = result.nextProfile;
    expect(getSessionProgress(result.stateWithFeedback)).toEqual({ number: 1, total: state.totalQuestions, done: 1 });
  });
});
