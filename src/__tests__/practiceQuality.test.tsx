import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { FoundationAssessmentScreen, PracticeComplete, SKILL_ARABIC } from "../components/FoundationLearning";
import { BRANCH_ARABIC, NODE_ARABIC, TOPIC_ARABIC, withoutVowels } from "../data/arabicTerms";
import { FOUNDATION_CATEGORY_ORDER, FOUNDATION_QUESTION_BANK } from "../data/foundationQuestionBank";
import { getUiStrings } from "../i18n";
import { playGameSound } from "../services/gameAudio";
import {
  advanceFoundationAssessment,
  createEmptyLearnerProfile,
  createFoundationAssessment,
  finalizeFoundationAssessment,
  readPracticeResult,
  submitFoundationAssessmentAnswer
} from "../services/foundationAssessment";
import type { AssessmentAnswerRecord, FoundationAssessmentState, FoundationQuestion, LearnerProfile, UserProfile } from "../types";
import { PracticeHub } from "../ui/screens";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

type Answer = NonNullable<FoundationAssessmentState["selectedAnswer"]>;

function wrongAnswerFor(question: FoundationQuestion): Answer {
  const answer = question.correctAnswer;
  if (question.type === "correct_order" && Array.isArray(answer)) return [...answer].reverse();
  if (question.type === "match_pairs" && answer && typeof answer === "object" && !Array.isArray(answer)) {
    const lefts = Object.keys(answer);
    return Object.fromEntries(lefts.map((left, index) => [left, answer[lefts[(index + 1) % lefts.length]]]));
  }
  if (Array.isArray(answer)) return (question.options ?? []).filter((option) => !answer.includes(option)).slice(0, 1);
  return (question.options ?? []).find((option) => option !== answer) ?? "not the answer";
}

/** Plays a whole session; `right(n)` says whether question n (from 1) is answered correctly. */
function playSession(profile: LearnerProfile, mode: FoundationAssessmentState["mode"], right: (questionNumber: number) => boolean = () => true) {
  let state: FoundationAssessmentState | null = createFoundationAssessment(profile, mode);
  let current = profile;
  const ids: string[] = [];
  let last = state;
  while (state) {
    ids.push(state.currentQuestion.id);
    const selectedAnswer = right(state.questionNumber) ? (state.currentQuestion.correctAnswer as Answer) : wrongAnswerFor(state.currentQuestion);
    const result = submitFoundationAssessmentAnswer({ profile: current, state, selectedAnswer, responseTimeMs: 4000 });
    current = result.nextProfile;
    last = result.stateWithFeedback;
    state = advanceFoundationAssessment(current, result.stateWithFeedback);
  }
  return { ids, state: last, profile: finalizeFoundationAssessment(current, last.mode, last.askedQuestionIds) };
}

function answered(question: FoundationQuestion, isCorrect: boolean): AssessmentAnswerRecord {
  return { questionId: question.id, category: question.category, difficulty: question.difficulty, selectedAnswer: "", isCorrect, confidence: 3, responseTimeMs: 4000, answeredAt: "2026-10-01T10:00:00.000Z" };
}

const scored = FOUNDATION_QUESTION_BANK.filter((question) => question.type !== "reflection_prompt" && question.type !== "confidence_check");

describe("a daily challenge asks new questions first", () => {
  it("asks none of the level check's questions right after it", () => {
    const placed = playSession(createEmptyLearnerProfile(), "placement", (questionNumber) => questionNumber % 3 !== 0);
    const daily = playSession(placed.profile, "daily_challenge");
    expect(daily.ids.filter((questionId) => placed.ids.includes(questionId))).toEqual([]);
  });

  it("gives a level check taken after a daily challenge new questions too", () => {
    const daily = playSession(createEmptyLearnerProfile(), "daily_challenge");
    const placed = playSession(daily.profile, "placement");
    expect(placed.ids.filter((questionId) => daily.ids.includes(questionId))).toEqual([]);
  });

  it("brings back a missed question once a skill has no new ones, and keeps the latest answers for last", () => {
    // Every question seen and answered right; then five of each of the first six skills again, one Salah question missed.
    const missed = "salah_05";
    const latest = FOUNDATION_CATEGORY_ORDER.slice(0, 6).flatMap((category) => scored.filter((question) => question.category === category).slice(0, 5));
    expect(latest.map((question) => question.id)).toContain(missed);
    const history = [...scored.map((question) => answered(question, true)), ...latest.map((question) => answered(question, question.id !== missed))];
    const profile: LearnerProfile = { ...createEmptyLearnerProfile(), assessmentHistory: history, needs_review_question_ids: [missed], totalQuestionsAnswered: history.length };
    const daily = playSession(profile, "daily_challenge");

    expect(daily.ids.filter((questionId) => questionId.startsWith("salah_"))).toEqual([missed]);
    const recent = new Set(latest.map((question) => question.id));
    expect(daily.ids.filter((questionId) => questionId !== missed && recent.has(questionId))).toEqual([]);
  });
});

describe("question bank copy", () => {
  const shown = (question: FoundationQuestion) => [
    question.prompt,
    question.scenario ?? "",
    ...(question.options ?? []),
    ...(question.pairs ?? []).flatMap((pair) => [pair.left, pair.right]),
    ...(question.orderItems ?? []),
    question.explanationShort,
    question.explanationLong,
    ...question.misconceptionNotes,
    ...Object.values(question.wrongAnswerNotes ?? {})
  ];

  it("puts ﷺ after the Prophet Muhammad's name in every sentence that names him", () => {
    const missing: string[] = [];
    for (const question of FOUNDATION_QUESTION_BANK) {
      for (const text of shown(question)) {
        for (const sentence of text.replace(/Prophet Muhammad/g, "Muhammad").split(/(?<=[.!?])\s+/)) {
          const first = /\b(Muhammad|Prophet|Messenger)\b('s)?/.exec(sentence);
          if (first && !sentence.slice(first.index + first[0].length).startsWith(" ﷺ")) missing.push(`${question.id}: ${sentence}`);
        }
      }
    }
    expect(missing).toEqual([]);
  });

  it("never lets a wrong word stand in for Allah or the Prophet ﷺ in a blank", () => {
    const sacred = /\b(allah|god|lord|muhammad|prophet|messenger)\b/i;
    const blanks = FOUNDATION_QUESTION_BANK.filter((question) => question.type === "fill_in_blank");
    expect(blanks.filter((question) => sacred.test(String(question.correctAnswer))).map((question) => question.id)).toEqual([]);
  });

  it("asks what the first half of the Shahadah means, with other good phrases as the wrong choices", () => {
    const question = FOUNDATION_QUESTION_BANK.find((candidate) => candidate.id === "shahadah_03")!;
    expect(question.type).toBe("multiple_choice");
    expect(question.correctAnswer).toBe("No one is worthy of worship except Allah");
    expect(Object.keys(question.wrongAnswerNotes ?? {}).sort()).toEqual((question.options ?? []).filter((option) => option !== question.correctAnswer).sort());
  });
});

describe("skill Arabic", () => {
  const VOWEL = /[ً-ْ]/;
  const bareWords = [...Object.values(TOPIC_ARABIC), ...Object.values(BRANCH_ARABIC), ...Object.values(NODE_ARABIC)].map((term) => ` ${withoutVowels(term.ar)} `);

  it("gives every skill its word, all with vowel marks, each a word of the checked terms", () => {
    for (const category of FOUNDATION_CATEGORY_ORDER) {
      const arabic = SKILL_ARABIC[category];
      expect(VOWEL.test(arabic)).toBe(true);
      // The Shahadah has no checked term yet.
      if (category !== "shahadah") {
        expect(bareWords.some((words) => words.includes(` ${withoutVowels(arabic)} `))).toBe(true);
      }
    }
  });

  it("shows the Shahadah's Arabic next to its skill name", async () => {
    const question = FOUNDATION_QUESTION_BANK.find((candidate) => candidate.id === "shahadah_02")!;
    const state = { ...createFoundationAssessment(createEmptyLearnerProfile(), "placement"), currentQuestion: question };
    await render(<FoundationAssessmentScreen assessment={state} language="en" selectedAnswer={undefined} onChangeSelectedAnswer={jest.fn()} onSubmit={jest.fn()} onContinue={jest.fn()} onExit={jest.fn()} />);
    expect(screen.getByText(SKILL_ARABIC.shahadah)).toBeTruthy();
  });
});

describe("Practice hub card", () => {
  const user = { id: 1, username: "a", displayName: "A", avatarInitials: "A", hasAccount: false, streakDays: 0, totalXp: 0, dailyGoalXp: 30, gems: 0, hearts: { current: 5, max: 5, unlimited: false, lastRefillDate: "2026-10-19" }, completedLessonIds: [], completedNodeIds: [] } as UserProfile;
  const handlers = () => ({ onStartPlacement: jest.fn(), onStartReview: jest.fn(), onStartDailyChallenge: jest.fn(), onGoFoundation: jest.fn() });

  beforeEach(() => (playGameSound as jest.Mock).mockClear());

  it("starts the level check from a tap anywhere on the card, with the tap sound", async () => {
    const h = handlers();
    await render(<PracticeHub user={user} learnerProfile={createEmptyLearnerProfile()} language="en" strings={getUiStrings("en")} {...h} />);
    await fireEvent.press(screen.getByText("Level check"));
    expect(h.onStartPlacement).toHaveBeenCalledTimes(1);
    expect(playGameSound).toHaveBeenCalledWith("soft_ui", expect.anything());
    // The bar inside still starts it once, not twice.
    await fireEvent.press(screen.getByText("START"));
    expect(h.onStartPlacement).toHaveBeenCalledTimes(2);
  });

  it("starts the daily challenge from its card once placed", async () => {
    const h = handlers();
    const profile = { ...createEmptyLearnerProfile(), assessmentCompleted: true };
    await render(<PracticeHub user={user} learnerProfile={profile} language="en" strings={getUiStrings("en")} {...h} />);
    await fireEvent.press(screen.getByTestId("practice-daily"));
    expect(h.onStartDailyChallenge).toHaveBeenCalledTimes(1);
  });
});

describe("a finished session survives a reload", () => {
  afterEach(() => jest.useRealTimers());

  it("reads back a saved result and shows the same end screen", async () => {
    jest.useFakeTimers();
    const { state, profile } = playSession(createEmptyLearnerProfile(), "placement", (questionNumber) => questionNumber > 3);
    const restored = readPracticeResult(JSON.parse(JSON.stringify({ assessment: state, profile })));
    expect(restored).toBeDefined();
    await render(<PracticeComplete assessment={restored!.assessment} learnerProfile={restored!.profile} onContinue={jest.fn()} playSounds={false} />);
    expect(screen.getByText("Level found!")).toBeTruthy();
    expect(screen.getByLabelText("CORRECT 7 of 10")).toBeTruthy();
    expect(screen.getByText("Practice next")).toBeTruthy();
    await act(async () => {
      jest.advanceTimersByTime(3000);
    });
  });

  it("turns down a save that is not a result", () => {
    const { state, profile } = playSession(createEmptyLearnerProfile(), "review");
    expect(readPracticeResult(null)).toBeUndefined();
    expect(readPracticeResult({ assessment: state })).toBeUndefined();
    expect(readPracticeResult({ assessment: { ...state, mode: "lesson" }, profile })).toBeUndefined();
    expect(readPracticeResult({ assessment: state, profile: { ...profile, weak_areas: "zakat" } })).toBeUndefined();
  });
});
