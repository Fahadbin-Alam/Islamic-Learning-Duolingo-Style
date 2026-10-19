import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { FoundationAssessmentScreen, PracticeComplete } from "../components/FoundationLearning";
import { FOUNDATION_CATEGORY_ORDER, FOUNDATION_QUESTION_BANK } from "../data/foundationQuestionBank";
import { playGameSound } from "../services/gameAudio";
import {
  advanceFoundationAssessment,
  createEmptyLearnerProfile,
  createFoundationAssessment,
  finalizeFoundationAssessment,
  getFoundationWordBank,
  getLearnerLevel,
  getShuffledOrderItems,
  seededShuffle,
  submitFoundationAssessmentAnswer,
  summarizeFoundationSession
} from "../services/foundationAssessment";
import type { FoundationAssessmentState, FoundationQuestion, LearnerProfile } from "../types";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

type Answer = FoundationAssessmentState["selectedAnswer"] & {};

/** A wrong answer of the same shape as the right one. */
function wrongAnswerFor(question: FoundationQuestion): Answer {
  const answer = question.correctAnswer;
  if (question.type === "correct_order" && Array.isArray(answer)) return [...answer].reverse();
  if (question.type === "match_pairs" && answer && typeof answer === "object" && !Array.isArray(answer)) {
    const lefts = Object.keys(answer);
    const rights = lefts.map((left) => answer[left]);
    return Object.fromEntries(lefts.map((left, index) => [left, rights[(index + 1) % rights.length]]));
  }
  if (Array.isArray(answer)) return (question.options ?? []).filter((option) => !answer.includes(option)).slice(0, 1);
  const other = (question.options ?? []).find((option) => option !== answer);
  return other ?? "not the answer";
}

/** Plays a whole session; `right(n)` says whether question n (from 1) is answered correctly. */
function playSession(profile: LearnerProfile, mode: FoundationAssessmentState["mode"], right: (questionNumber: number) => boolean = () => true) {
  let state: FoundationAssessmentState | null = createFoundationAssessment(profile, mode);
  let current = profile;
  const questions: FoundationQuestion[] = [];
  let last = state;
  while (state) {
    const question = state.currentQuestion;
    questions.push(question);
    const selectedAnswer = right(state.questionNumber) ? (question.correctAnswer as Answer) : wrongAnswerFor(question);
    const result = submitFoundationAssessmentAnswer({ profile: current, state, selectedAnswer, responseTimeMs: 4000 });
    current = result.nextProfile;
    last = result.stateWithFeedback;
    state = advanceFoundationAssessment(current, result.stateWithFeedback);
  }
  const finished = finalizeFoundationAssessment(current, mode, last.askedQuestionIds);
  return { questions, state: last, profile: finished };
}

describe("practice sessions", () => {
  it("keeps the level check to one scored question per skill", () => {
    const { questions, state } = playSession(createEmptyLearnerProfile(), "placement");

    expect(state.totalQuestions).toBe(FOUNDATION_CATEGORY_ORDER.length);
    expect(questions).toHaveLength(FOUNDATION_CATEGORY_ORDER.length);
    expect(new Set(questions.map((question) => question.category)).size).toBe(FOUNDATION_CATEGORY_ORDER.length);
    expect(new Set(questions.map((question) => question.id)).size).toBe(questions.length);
    // Free-text reflections cannot be marked, so they are never asked.
    expect(questions.some((question) => question.type === "reflection_prompt" || question.type === "confidence_check")).toBe(false);
  });

  it("sets confidence from the answer when the screen does not ask", () => {
    const profile = createEmptyLearnerProfile();
    const state = createFoundationAssessment(profile, "placement");
    const question = state.currentQuestion;

    const right = submitFoundationAssessmentAnswer({ profile, state, selectedAnswer: question.correctAnswer as Answer, responseTimeMs: 3000 });
    const wrong = submitFoundationAssessmentAnswer({ profile, state, selectedAnswer: wrongAnswerFor(question), responseTimeMs: 3000 });
    const asked = submitFoundationAssessmentAnswer({ profile, state, selectedAnswer: question.correctAnswer as Answer, confidence: 4, responseTimeMs: 3000 });

    expect(state.confidence).toBe(0);
    expect(right.stateWithFeedback.answerHistory[0].confidence).toBe(3);
    expect(wrong.stateWithFeedback.answerHistory[0].confidence).toBe(2);
    expect(asked.stateWithFeedback.answerHistory[0].confidence).toBe(4);
  });

  it("gives each wrong answer its reasons once, with no filler", () => {
    for (const question of FOUNDATION_QUESTION_BANK.filter((candidate) => candidate.type !== "reflection_prompt")) {
      const state = { ...createFoundationAssessment(createEmptyLearnerProfile(), "review"), currentQuestion: question };
      const { feedback } = submitFoundationAssessmentAnswer({ profile: createEmptyLearnerProfile(), state, selectedAnswer: wrongAnswerFor(question), responseTimeMs: 3000 });
      const reasons = feedback.wrongAnswerReasons;
      expect(new Set(reasons).size).toBe(reasons.length);
      expect(reasons.every((reason) => reason.trim().length > 0)).toBe(true);
    }
  });

  it("spreads the daily challenge over six skills and changes it on a replay", () => {
    const first = playSession(createEmptyLearnerProfile(), "daily_challenge");
    const second = playSession(first.profile, "daily_challenge");

    expect(first.questions).toHaveLength(6);
    expect(new Set(first.questions.map((question) => question.category)).size).toBe(6);
    const firstIds = new Set(first.questions.map((question) => question.id));
    expect(second.questions.filter((question) => firstIds.has(question.id))).toEqual([]);
  });

  it("starts the daily challenge with a weak skill and mixes in others", () => {
    // Miss the first three level-check questions so those skills become weak.
    const placed = playSession(createEmptyLearnerProfile(), "placement", (questionNumber) => questionNumber > 3);
    const weak = placed.profile.weak_areas;
    expect(weak.length).toBeGreaterThan(0);

    const daily = playSession(placed.profile, "daily_challenge");
    expect(weak).toContain(daily.questions[0].category);
    expect(daily.questions.some((question) => !weak.includes(question.category))).toBe(true);
  });

  it("never shows put-in-order steps already in the right order", () => {
    const orderQuestions = FOUNDATION_QUESTION_BANK.filter((question) => question.type === "correct_order");
    expect(orderQuestions.length).toBeGreaterThan(0);
    for (const question of orderQuestions) {
      const items = getShuffledOrderItems(question);
      expect([...items].sort()).toEqual([...(question.orderItems ?? [])].sort());
      expect(items).not.toEqual(question.correctAnswer);
      // Same order every time for the same question.
      expect(getShuffledOrderItems(question)).toEqual(items);
    }
  });

  it("shuffles the same way for the same seed", () => {
    const items = ["a", "b", "c", "d", "e"];
    expect(seededShuffle(items, "salah_04")).toEqual(seededShuffle(items, "salah_04"));
    expect([...seededShuffle(items, "salah_04")].sort()).toEqual(items);
  });

  it("gives every fill-in blank a small word bank with the answer in it", () => {
    for (const question of FOUNDATION_QUESTION_BANK.filter((candidate) => candidate.type === "fill_in_blank")) {
      const words = getFoundationWordBank(question);
      expect(words).toContain(question.correctAnswer);
      expect(words.length).toBeGreaterThanOrEqual(2);
      expect(words.length).toBeLessThanOrEqual(4);
      expect(new Set(words).size).toBe(words.length);
      expect(getFoundationWordBank(question)).toEqual(words);
    }
  });

  it("sums up a session for the end screen", () => {
    const { state, profile } = playSession(createEmptyLearnerProfile(), "placement", (questionNumber) => questionNumber % 2 === 0);
    const summary = summarizeFoundationSession(state, profile);

    expect(summary.answered).toBe(10);
    expect(summary.correct).toBe(5);
    expect(summary.level).toBe(getLearnerLevel(profile.readiness_label));
    expect(summary.practiceNext.length).toBeLessThanOrEqual(3);
    expect(summary.practiceNext.every((category) => profile.weak_areas.includes(category))).toBe(true);
    expect(getLearnerLevel("New learner")).toBe(1);
  });
});

/** The progress bar's value (0 to 100). The bar is not a separate accessibility element, so walk the tree. */
function progressNow() {
  let now: number | undefined;
  const walk = (node: unknown) => {
    if (!node || typeof node !== "object" || now !== undefined) return;
    const { props, children } = node as { props?: { accessibilityRole?: string; accessibilityValue?: { now?: number } }; children?: unknown[] };
    if (props?.accessibilityRole === "progressbar") now = props.accessibilityValue?.now;
    (Array.isArray(children) ? children : []).forEach(walk);
  };
  const tree = screen.toJSON();
  (Array.isArray(tree) ? tree : [tree]).forEach(walk);
  return now;
}

describe("FoundationAssessmentScreen plays like a lesson", () => {
  const base = createFoundationAssessment(createEmptyLearnerProfile(), "placement");
  const handlers = () => ({ onChangeSelectedAnswer: jest.fn(), onSubmit: jest.fn(), onContinue: jest.fn(), onExit: jest.fn() });
  const checked = (question: FoundationQuestion, selectedAnswer: Answer) =>
    submitFoundationAssessmentAnswer({ profile: createEmptyLearnerProfile(), state: { ...base, currentQuestion: question }, selectedAnswer, responseTimeMs: 3000 }).stateWithFeedback;

  beforeEach(() => {
    (playGameSound as jest.Mock).mockClear();
  });

  it("starts with an empty progress bar and fills it when the answer is checked", async () => {
    const question = base.currentQuestion;
    const props = handlers();
    const { rerender } = await render(<FoundationAssessmentScreen assessment={base} language="en" selectedAnswer={undefined} {...props} />);
    expect(progressNow()).toBe(0);
    expect(screen.getByText(`1/${base.totalQuestions}`)).toBeTruthy();

    await rerender(<FoundationAssessmentScreen assessment={checked(question, question.correctAnswer as Answer)} language="en" selectedAnswer={question.correctAnswer as Answer} {...props} />);
    expect(progressNow()).toBe(Math.round(100 / base.totalQuestions));
  });

  it("plays the wrong sound and shows the right answer", async () => {
    const question = FOUNDATION_QUESTION_BANK.find((candidate) => candidate.type === "multiple_choice")!;
    const wrong = wrongAnswerFor(question);
    const props = handlers();
    const { rerender } = await render(<FoundationAssessmentScreen assessment={{ ...base, currentQuestion: question }} language="en" selectedAnswer={wrong} {...props} />);
    expect(playGameSound).not.toHaveBeenCalledWith("wrong", expect.anything());

    await rerender(<FoundationAssessmentScreen assessment={checked(question, wrong)} language="en" selectedAnswer={wrong} {...props} />);
    expect(playGameSound).toHaveBeenCalledWith("wrong", expect.anything());
    expect(screen.getByText("Correct answer:")).toBeTruthy();
    expect(screen.getByTestId("feedback-answer").props.children).toBe(String(question.correctAnswer));
    await fireEvent.press(screen.getByTestId("feedback-continue"));
    expect(props.onContinue).toHaveBeenCalledTimes(1);
  });

  it("plays the correct sound with praise and no answer line", async () => {
    const question = FOUNDATION_QUESTION_BANK.find((candidate) => candidate.type === "true_false")!;
    const right = question.correctAnswer as Answer;
    await render(<FoundationAssessmentScreen assessment={checked(question, right)} language="en" selectedAnswer={right} {...handlers()} />);

    expect(playGameSound).toHaveBeenCalledWith("correct", expect.anything());
    expect(screen.queryByText("Correct answer:")).toBeNull();
    expect(screen.queryByTestId("feedback-why")).toBeNull();
  });

  it("marks a right box the learner did not tick as missed", async () => {
    const question = FOUNDATION_QUESTION_BANK.find((candidate) => candidate.type === "multi_select" && Array.isArray(candidate.correctAnswer) && candidate.correctAnswer.length > 1)!;
    const answers = question.correctAnswer as string[];
    const picked = [answers[0]];
    await render(<FoundationAssessmentScreen assessment={checked(question, picked)} language="en" selectedAnswer={picked} {...handlers()} />);

    expect(screen.getByLabelText(`${answers[1]}, missed`)).toBeTruthy();
    expect(screen.queryByLabelText(`${answers[0]}, missed`)).toBeNull();
  });

  it("numbers every match tile by its right pair after a wrong check", async () => {
    const question = FOUNDATION_QUESTION_BANK.find((candidate) => candidate.type === "match_pairs" && (candidate.pairs?.length ?? 0) > 2)!;
    const wrong = wrongAnswerFor(question);
    await render(<FoundationAssessmentScreen assessment={checked(question, wrong)} language="en" selectedAnswer={wrong} {...handlers()} />);

    question.pairs!.forEach((pair, index) => {
      expect(screen.getByLabelText(`${pair.left}, pair ${index + 1}`)).toBeTruthy();
      expect(screen.getByLabelText(`${pair.right}, pair ${index + 1}`)).toBeTruthy();
    });
    // The sheet lists the right pairs.
    expect(screen.getByText(`${question.pairs![0].left} = ${question.pairs![0].right}`)).toBeTruthy();
  });

  it("deals the order steps shuffled, never in the right order", async () => {
    const question = FOUNDATION_QUESTION_BANK.find((candidate) => candidate.type === "correct_order")!;
    await render(<FoundationAssessmentScreen assessment={{ ...base, currentQuestion: question }} language="en" selectedAnswer={[]} {...handlers()} />);

    const shown = screen.getAllByTestId(/^order-/).map((node) => String(node.props.testID).replace(/^order-/, ""));
    expect([...shown].sort()).toEqual([...(question.orderItems ?? [])].sort());
    expect(shown).not.toEqual(question.correctAnswer);
  });

  it("fills the blank by tapping a word", async () => {
    const question = FOUNDATION_QUESTION_BANK.find((candidate) => candidate.type === "fill_in_blank")!;
    const answer = question.correctAnswer as string;
    const props = handlers();
    const { rerender } = await render(<FoundationAssessmentScreen assessment={{ ...base, currentQuestion: question }} language="en" selectedAnswer={undefined} {...props} />);

    await fireEvent.press(screen.getByTestId(`word-${answer}`));
    expect(props.onChangeSelectedAnswer).toHaveBeenCalledWith(answer);
    await rerender(<FoundationAssessmentScreen assessment={{ ...base, currentQuestion: question }} language="en" selectedAnswer={answer} {...props} />);
    expect(screen.getByTestId("blank-prompt")).toHaveTextContent(answer, { exact: false });
  });

  it("keeps learning when the learner changes their mind on the quit sheet", async () => {
    const props = handlers();
    await render(<FoundationAssessmentScreen assessment={base} language="en" selectedAnswer={undefined} {...props} />);

    await fireEvent.press(screen.getByTestId("assessment-close"));
    // The level check keeps the answers given so far, so the sheet says so (not the lesson's "lose progress").
    expect(screen.getByText("Stop the level check?")).toBeTruthy();
    expect(screen.getByText("Your answers so far are saved.")).toBeTruthy();
    expect(screen.getByText("STOP")).toBeTruthy();
    await fireEvent.press(screen.getByTestId("quit-keep"));
    expect(props.onExit).not.toHaveBeenCalled();
  });
});

describe("PracticeComplete", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it("shows the level check result with no XP card and continues", async () => {
    jest.useFakeTimers();
    const { state, profile } = playSession(createEmptyLearnerProfile(), "placement", (questionNumber) => questionNumber > 3);
    const onContinue = jest.fn();
    await render(<PracticeComplete assessment={state} learnerProfile={profile} onContinue={onContinue} />);

    expect(screen.getByText("Level found!")).toBeTruthy();
    expect(screen.getByLabelText("CORRECT 7 of 10")).toBeTruthy();
    expect(screen.getByLabelText(`LEVEL ${getLearnerLevel(profile.readiness_label)}`)).toBeTruthy();
    expect(screen.queryByTestId("result-xp")).toBeNull();
    expect(screen.getByText("Practice next")).toBeTruthy();
    for (const category of summarizeFoundationSession(state, profile).practiceNext) {
      expect(screen.getByTestId(`next-${category}`)).toBeTruthy();
    }
    expect(playGameSound).toHaveBeenCalledWith("lesson_complete", expect.anything());

    await fireEvent.press(screen.getByTestId("practice-complete-continue"));
    expect(onContinue).toHaveBeenCalledTimes(1);
    await act(async () => {
      jest.advanceTimersByTime(3000);
    });
  });

  it("pays 2 XP per right answer in a daily challenge", async () => {
    jest.useFakeTimers();
    // Question 2 is missed, so it comes back as question 7 (answered right).
    const { state, profile } = playSession(createEmptyLearnerProfile(), "daily_challenge", (questionNumber) => questionNumber !== 2);
    await render(<PracticeComplete assessment={state} learnerProfile={profile} onContinue={jest.fn()} playSounds={false} />);

    expect(screen.getByText("Challenge done!")).toBeTruthy();
    expect(screen.getByLabelText("CORRECT 6 of 7")).toBeTruthy();
    expect(screen.getByLabelText("TOTAL XP 12")).toBeTruthy();
    // No level check yet, so no level card (the Practice hub shows none either).
    expect(screen.queryByTestId("result-level")).toBeNull();
    await act(async () => {
      jest.advanceTimersByTime(3000);
    });
  });
});
