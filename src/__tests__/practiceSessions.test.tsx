import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { FoundationAssessmentScreen, PracticeComplete } from "../components/FoundationLearning";
import { FOUNDATION_QUESTION_BANK } from "../data/foundationQuestionBank";
import { getUiStrings } from "../i18n";
import { playGameSound } from "../services/gameAudio";
import {
  advanceFoundationAssessment,
  createEmptyLearnerProfile,
  createFoundationAssessment,
  finalizeFoundationAssessment,
  getFoundationWordBank,
  getSessionPlan,
  getShuffledOrderItems,
  isRetryQuestion,
  submitFoundationAssessmentAnswer,
  summarizeFoundationSession
} from "../services/foundationAssessment";
import type { FoundationAssessmentState, FoundationCategoryId, FoundationQuestion, LearnerProfile, UserProfile } from "../types";
import { QuitSheet } from "../ui/lesson";
import { shortWhy } from "../ui/lesson/lessonText";
import { PracticeHub } from "../ui/screens";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

// The mascot as a plain box that shows its accent.
jest.mock("../ui/Mascot", () => {
  const actual = jest.requireActual("../ui/Mascot");
  const { createElement } = jest.requireActual("react");
  const { View } = jest.requireActual("react-native");
  return { ...actual, Mascot: ({ accent }: { accent?: string }) => createElement(View, { testID: "mascot", accessibilityHint: accent ?? "default" }) };
});

// Count shakes without running the animation.
const mockShake = jest.fn();
jest.mock("../ui/PopIn", () => {
  const actual = jest.requireActual("../ui/PopIn");
  return { ...actual, useShake: () => ({ style: {}, shake: mockShake }) };
});

type Answer = NonNullable<FoundationAssessmentState["selectedAnswer"]>;

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
  const words = question.type === "fill_in_blank" ? getFoundationWordBank(question) : question.options ?? [];
  return words.find((option) => option !== answer) ?? "not the answer";
}

/** Plays a whole session; `right(n, question)` says whether question n (from 1) is answered correctly. */
function playSession(
  profile: LearnerProfile,
  mode: FoundationAssessmentState["mode"],
  right: (questionNumber: number, question: FoundationQuestion) => boolean = () => true,
  focus?: FoundationCategoryId
) {
  let state: FoundationAssessmentState | null = createFoundationAssessment(profile, mode, { focus });
  const first = state;
  let current = profile;
  const questions: FoundationQuestion[] = [];
  let last = state;
  while (state) {
    const question = state.currentQuestion;
    questions.push(question);
    const selectedAnswer = right(state.questionNumber, question) ? (question.correctAnswer as Answer) : wrongAnswerFor(question);
    const result = submitFoundationAssessmentAnswer({ profile: current, state, selectedAnswer, responseTimeMs: 4000 });
    current = result.nextProfile;
    last = result.stateWithFeedback;
    state = advanceFoundationAssessment(current, result.stateWithFeedback);
  }
  return { first, questions, ids: questions.map((question) => question.id), state: last, profile: finalizeFoundationAssessment(current, mode, last.askedQuestionIds) };
}

const ids = (...values: string[]) => values;

describe("Review", () => {
  // The QA case: every answer wrong used to keep the whole review on Wudu.
  const missed = ids("taharah_02", "shahadah_06", "taharah_04", "iman_11", "zakat_07", "fasting_10");
  const withMissed = (list: string[]): LearnerProfile => ({ ...createEmptyLearnerProfile(), needs_review_question_ids: list });

  it("asks exactly the missed questions, in order, before anything else", () => {
    const { ids: asked } = playSession(withMissed(missed), "review");
    expect(asked).toEqual(missed);
  });

  it("stays on the missed questions after a wrong answer, then asks the missed one again", () => {
    const { ids: asked, state } = playSession(withMissed(missed), "review", (questionNumber) => questionNumber !== 1);
    expect(asked).toEqual([...missed, missed[0]]);
    expect(state.totalQuestions).toBe(7);
  });

  it("asks each missed question once more when all are wrong, and no more", () => {
    const { ids: asked } = playSession(withMissed(missed), "review", () => false);
    expect(asked).toEqual([...missed, ...missed]);
  });

  it("tops up a short list after the missed ones", () => {
    const { ids: asked } = playSession({ ...withMissed(["hajj_01"]), weak_areas: ["zakat"] }, "review");
    expect(asked[0]).toBe("hajj_01");
    expect(asked).toHaveLength(3);
    expect(new Set(asked).size).toBe(3);
  });
});

describe("missed questions come back", () => {
  it("asks a missed daily question once more at the end", () => {
    const { questions, state } = playSession(createEmptyLearnerProfile(), "daily_challenge", (questionNumber) => questionNumber !== 1);
    expect(questions).toHaveLength(7);
    expect(questions[6].id).toBe(questions[0].id);
    expect(state.totalQuestions).toBe(7);
    // The retry is not listed twice.
    expect(new Set(state.askedQuestionIds).size).toBe(state.askedQuestionIds.length);
  });

  it("keeps the level check to its ten questions", () => {
    const { questions } = playSession(createEmptyLearnerProfile(), "placement", () => false);
    expect(questions).toHaveLength(10);
  });

  it("knows when the question on screen is a retry, before and after CHECK", () => {
    const start = createFoundationAssessment(createEmptyLearnerProfile(), "daily_challenge");
    expect(isRetryQuestion(start)).toBe(false);
    const checked = submitFoundationAssessmentAnswer({ profile: createEmptyLearnerProfile(), state: start, selectedAnswer: wrongAnswerFor(start.currentQuestion), responseTimeMs: 3000 });
    expect(isRetryQuestion(checked.stateWithFeedback)).toBe(false);
    const again = { ...checked.stateWithFeedback, feedback: undefined, selectedAnswer: undefined };
    expect(isRetryQuestion(again)).toBe(true);
  });

  it("deals the words and order steps again in another order", () => {
    for (const question of FOUNDATION_QUESTION_BANK.filter((candidate) => candidate.type === "fill_in_blank")) {
      const first = getFoundationWordBank(question);
      const retry = getFoundationWordBank(question, true);
      expect([...retry].sort()).toEqual([...first].sort());
      retry.forEach((word, index) => expect(word).not.toBe(first[index]));
    }
    for (const question of FOUNDATION_QUESTION_BANK.filter((candidate) => candidate.type === "correct_order" && (candidate.orderItems?.length ?? 0) > 2)) {
      const first = getShuffledOrderItems(question);
      const retry = getShuffledOrderItems(question, true);
      expect([...retry].sort()).toEqual([...first].sort());
      expect(retry).not.toEqual(first);
      expect(retry).not.toEqual(question.correctAnswer);
    }
  });
});

describe("Daily challenge", () => {
  // Miss the first four level-check questions so some skills are weak.
  const placed = playSession(createEmptyLearnerProfile(), "placement", (questionNumber) => questionNumber > 4).profile;

  it("plans one skill per question at the start, weak skills first, and keeps to it", () => {
    const weak = placed.weak_areas;
    expect(weak.length).toBeGreaterThan(1);
    const practiceNext = summarizeFoundationSession(createFoundationAssessment(placed, "review"), placed).practiceNext;
    // All wrong, so the profile changes after every answer; the plan must not drift.
    const { first, questions } = playSession(placed, "daily_challenge", () => false);
    const planned = getSessionPlan(first)!.steps.map((step) => ("category" in step ? step.category : undefined));
    const asked = questions.slice(0, 6).map((question) => question.category);

    expect(asked).toEqual(planned);
    expect(new Set(asked).size).toBe(6);
    expect(asked.slice(0, Math.min(weak.length, 6)).every((category) => weak.includes(category))).toBe(true);
    // The skills the end screen recommends are the ones asked.
    practiceNext.forEach((category) => expect(asked).toContain(category));
  });

  it("moves on to other skills on a replay", () => {
    const first = playSession(createEmptyLearnerProfile(), "daily_challenge");
    const second = playSession(first.profile, "daily_challenge");
    const firstSkills = new Set(first.questions.map((question) => question.category));
    expect(second.questions.filter((question) => firstSkills.has(question.category)).length).toBeLessThan(6);
  });
});

describe("skill practice", () => {
  it("asks that skill only, its missed questions first", () => {
    const profile: LearnerProfile = { ...createEmptyLearnerProfile(), needs_review_question_ids: ["salah_03", "hajj_02", "hajj_05"] };
    const { questions, first } = playSession(profile, "review", () => true, "hajj");
    expect(getSessionPlan(first)?.focus).toBe("hajj");
    expect(questions.slice(0, 2).map((question) => question.id)).toEqual(["hajj_02", "hajj_05"]);
    expect(questions.every((question) => question.category === "hajj")).toBe(true);
    expect(questions).toHaveLength(5);
  });
});

describe("word bank", () => {
  const SACRED = /\b(allah|god|lord|rabb|rahman|rahim|muhammad|ahmad|prophet|messenger|rasul)\b/i;
  const blanks = FOUNDATION_QUESTION_BANK.filter((question) => question.type === "fill_in_blank");

  it("never offers a name of Allah or of the Prophet as a wrong word", () => {
    for (const question of blanks) {
      const wrong = getFoundationWordBank(question).filter((word) => word !== question.correctAnswer);
      expect(wrong.filter((word) => SACRED.test(word))).toEqual([]);
    }
  });

  it("gives every blank its own words, not the answers of other blanks", () => {
    const otherAnswers = new Set(blanks.map((question) => String(question.correctAnswer)));
    for (const question of blanks) {
      const words = getFoundationWordBank(question);
      expect(question.options).toEqual(expect.arrayContaining([question.correctAnswer]));
      expect(words.filter((word) => word !== question.correctAnswer && otherAnswers.has(word))).toEqual([]);
    }
  });
});

describe("Why lines", () => {
  it("are one short sentence", () => {
    const long: string[] = [];
    for (const question of FOUNDATION_QUESTION_BANK.filter((candidate) => candidate.type !== "reflection_prompt" && candidate.type !== "confidence_check")) {
      const answer = question.correctAnswer;
      const correctLabel = question.type === "match_pairs" || question.type === "correct_order" ? undefined : Array.isArray(answer) ? answer.join(", ") : typeof answer === "string" ? answer : undefined;
      for (const pick of [undefined, ...Object.keys(question.wrongAnswerNotes ?? {})]) {
        const why = shortWhy({
          easierExplanation: pick ? question.wrongAnswerNotes?.[pick] : undefined,
          explanation: `${question.explanationShort} ${question.explanationLong}`,
          prompt: question.prompt,
          correctLabel
        });
        if (why && (why.split(/\s+/).length > 10 || /[.!?]\s+\S/.test(why))) long.push(`${question.id}: ${why}`);
      }
    }
    expect(long).toEqual([]);
  });
});

describe("QuitSheet", () => {
  it("keeps the lesson copy by default", async () => {
    await render(<QuitSheet visible onKeepLearning={jest.fn()} onQuit={jest.fn()} />);
    expect(screen.getByText("Wait, don't go!")).toBeTruthy();
    expect(screen.getByText("You'll lose this lesson's progress.")).toBeTruthy();
    expect(screen.getByText("END LESSON")).toBeTruthy();
  });

  it("takes its own title, line and buttons", async () => {
    const onQuit = jest.fn();
    await render(<QuitSheet visible title="Stop the review?" line="Your answers so far are saved." keepLabel="Keep going" quitLabel="Stop" onKeepLearning={jest.fn()} onQuit={onQuit} />);
    expect(screen.getByText("Stop the review?")).toBeTruthy();
    expect(screen.getByText("Your answers so far are saved.")).toBeTruthy();
    expect(screen.getByText("KEEP GOING")).toBeTruthy();
    await fireEvent.press(screen.getByText("STOP"));
    expect(onQuit).toHaveBeenCalledTimes(1);
  });
});

/** Every text in render order (inside `testID` when given). */
function texts(testID?: string) {
  const found: string[] = [];
  const walk = (node: unknown) => {
    if (typeof node === "string") {
      found.push(node);
      return;
    }
    if (!node || typeof node !== "object") return;
    const { children } = node as { children?: unknown[] };
    (Array.isArray(children) ? children : []).forEach(walk);
  };
  if (testID) {
    walk(screen.getByTestId(testID));
    return found;
  }
  const tree = screen.toJSON();
  (Array.isArray(tree) ? tree : [tree]).forEach(walk);
  return found;
}

/** The accent of every mascot on screen. */
function mascotAccents() {
  return screen.getAllByTestId("mascot").map((node) => node.props.accessibilityHint);
}

const ACCENT = "#1CB66D";

describe("practice screens", () => {
  const daily = createFoundationAssessment(createEmptyLearnerProfile(), "daily_challenge");
  const handlers = () => ({ onChangeSelectedAnswer: jest.fn(), onSubmit: jest.fn(), onContinue: jest.fn(), onExit: jest.fn() });
  const checked = (state: FoundationAssessmentState, selectedAnswer: Answer) =>
    submitFoundationAssessmentAnswer({ profile: createEmptyLearnerProfile(), state, selectedAnswer, responseTimeMs: 3000 }).stateWithFeedback;

  beforeEach(() => {
    mockShake.mockClear();
    (playGameSound as jest.Mock).mockClear();
  });

  it("shows a missed question again with a Try again chip and the tiles moved", async () => {
    const question = FOUNDATION_QUESTION_BANK.find((candidate) => candidate.type === "multiple_choice" && (candidate.options?.length ?? 0) > 2)!;
    const state = { ...daily, currentQuestion: question };
    const onScreen = () => texts("assessment-answers").filter((value) => question.options!.includes(value));

    const { rerender } = await render(<FoundationAssessmentScreen assessment={state} language="en" selectedAnswer={undefined} {...handlers()} />);
    expect(screen.queryByTestId("assessment-retry")).toBeNull();
    const firstOrder = onScreen();

    const missed = checked(state, wrongAnswerFor(question));
    await rerender(<FoundationAssessmentScreen assessment={{ ...missed, feedback: undefined, selectedAnswer: undefined }} language="en" selectedAnswer={undefined} {...handlers()} />);
    expect(screen.getByText("Try again!")).toBeTruthy();
    const retryOrder = onScreen();
    expect([...retryOrder].sort()).toEqual([...firstOrder].sort());
    retryOrder.forEach((label, index) => expect(label).not.toBe(firstOrder[index]));
  });

  it("says the challenge keeps the answers on the quit sheet", async () => {
    await render(<FoundationAssessmentScreen assessment={daily} language="en" selectedAnswer={undefined} {...handlers()} />);
    await fireEvent.press(screen.getByTestId("assessment-close"));
    expect(screen.getByText("Stop the challenge?")).toBeTruthy();
    expect(screen.getByText("Your answers so far are saved.")).toBeTruthy();
  });

  it.each(["multi_select", "match_pairs", "correct_order"] as const)("shakes the red %s tiles after a wrong CHECK", async (type) => {
    const question = FOUNDATION_QUESTION_BANK.find((candidate) => candidate.type === type)!;
    const state = { ...daily, currentQuestion: question };
    const wrong = type === "multi_select" ? [(question.options ?? []).find((option) => !(question.correctAnswer as string[]).includes(option))!] : wrongAnswerFor(question);
    const { rerender } = await render(<FoundationAssessmentScreen assessment={state} language="en" selectedAnswer={wrong} {...handlers()} />);
    expect(mockShake).not.toHaveBeenCalled();
    await rerender(<FoundationAssessmentScreen assessment={checked(state, wrong)} language="en" selectedAnswer={wrong} {...handlers()} />);
    expect(mockShake).toHaveBeenCalled();
  });

  it("dresses the mascot in the topic accent", async () => {
    await render(<FoundationAssessmentScreen assessment={daily} language="en" selectedAnswer={undefined} accent={ACCENT} {...handlers()} />);
    expect(mascotAccents()).toContain(ACCENT);
    expect(mascotAccents().every((accent) => accent === ACCENT)).toBe(true);
  });

  it("starts a skill's practice from a Practice next chip, with a tap sound", async () => {
    jest.useFakeTimers();
    const { state, profile } = playSession(createEmptyLearnerProfile(), "placement", (questionNumber) => questionNumber > 3);
    const onPracticeSkill = jest.fn();
    await render(<PracticeComplete assessment={state} learnerProfile={profile} accent={ACCENT} onContinue={jest.fn()} onPracticeSkill={onPracticeSkill} playSounds={false} />);

    const [skill] = summarizeFoundationSession(state, profile).practiceNext;
    await fireEvent.press(screen.getByTestId(`next-${skill}`));
    expect(onPracticeSkill).toHaveBeenCalledWith(skill);
    expect(playGameSound).toHaveBeenCalledWith("soft_ui", expect.anything());
    // Placed now, so the level card shows.
    expect(screen.getByTestId("result-level")).toBeTruthy();
    expect(mascotAccents()).toEqual([ACCENT]);
    await act(async () => {
      jest.advanceTimersByTime(3000);
    });
    jest.useRealTimers();
  });

  it("calls a one-skill session Practice done", async () => {
    jest.useFakeTimers();
    const { state, profile } = playSession(createEmptyLearnerProfile(), "review", () => true, "zakat");
    await render(<PracticeComplete assessment={state} learnerProfile={profile} onContinue={jest.fn()} playSounds={false} />);
    expect(screen.getByText("Practice done!")).toBeTruthy();
    await act(async () => {
      jest.advanceTimersByTime(3000);
    });
    jest.useRealTimers();
  });

  it("lets the hub's Arabic wrap and dresses its mascot in the topic accent", async () => {
    const user = { id: 1, username: "a", displayName: "A", avatarInitials: "A", hasAccount: false, streakDays: 0, totalXp: 0, dailyGoalXp: 30, gems: 0, hearts: { current: 5, max: 5, unlimited: false, lastRefillDate: "2026-10-19" }, completedLessonIds: [], completedNodeIds: [] } as UserProfile;
    await render(
      <PracticeHub
        user={user}
        learnerProfile={createEmptyLearnerProfile()}
        language="en"
        strings={getUiStrings("en")}
        accent={ACCENT}
        onStartPlacement={jest.fn()}
        onStartReview={jest.fn()}
        onStartDailyChallenge={jest.fn()}
        onGoFoundation={jest.fn()}
      />
    );
    const arabic = screen.getAllByText(/[؀-ۿ]/);
    expect(arabic.length).toBeGreaterThan(0);
    arabic.forEach((node) => expect(node.props.numberOfLines).toBeUndefined());
    expect(mascotAccents()).toEqual([ACCENT]);
  });
});
