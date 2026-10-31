jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);
jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));
jest.mock("expo-speech", () => ({ speak: jest.fn(), stop: jest.fn(() => Promise.resolve()) }));
jest.mock("../services/monetization", () => ({
  monetizationClient: {
    initialize: jest.fn(async () => undefined),
    getPremiumStatus: jest.fn(async () => null),
    getStorePrices: jest.fn(async () => ({})),
    showLessonBreakAd: jest.fn(async () => undefined),
    setAdAudience: jest.fn(),
    showRewardedAd: jest.fn(async () => ({ ok: false })),
    purchaseShopItem: jest.fn(async () => ({ ok: false, cancelled: true })),
    restorePurchases: jest.fn(async () => ({}))
  }
}));
jest.mock("../components/AdBanner", () => ({ AdBanner: () => null }));
jest.mock("../services/islamicNotifications", () => ({
  requestIslamicNotificationPermission: jest.fn(async () => false),
  scheduleIslamicReminderChecks: jest.fn(() => () => undefined)
}));

import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import TopicApp from "../TopicApp";
import {
  canQuiz,
  createQuizSession,
  isTestLost,
  localDateKey,
  loseHeart,
  PRACTICE_XP_PER_CORRECT_ANSWER,
  QUIZ_MAX_QUESTIONS,
  quizLessonsFor
} from "../api/islamicLearningApi";
import { COURSE, findNodeByLessonId } from "../data/course";
import { getStoredItem, removeStoredItem, setStoredItem } from "../services/appStorage";
import { clearActiveAssessment } from "../services/localProgress";
import { QUIZ_PERFECT_GEMS, quizGrade, quizId, quizPercent, recordQuizScore, unitsToGoOver } from "../services/quizzes";
import type { Challenge, QuizScope, UserProfile } from "../types";
import { makeUser } from "./testUtils";

const PROFILE_KEY = "sira-path-user-profile";
const hearts = (current: number) => ({ current, max: 5, unlimited: false, lastRefillDate: localDateKey() });
const savedUser = () => JSON.parse(getStoredItem(PROFILE_KEY) ?? "{}") as UserProfile;
const section = (topicId: string) => COURSE.sections.find((item) => item.topicId === topicId)!;
const unitOf = (challenge: Challenge) => findNodeByLessonId(challenge.sourceLessonId ?? "")?.branchId;
const SAHABAH: QuizScope = { kind: "topic", topicId: "sahabah" };

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

describe("Quizzes (session)", () => {
  it("asks up to 10 questions spread over a whole topic, lessons not done yet included", () => {
    const user = makeUser();
    const session = createQuizSession({ user, scope: SAHABAH, title: "Sahabah quiz" })!;
    expect(session.mode).toBe("quiz");
    expect(session.quizScope).toEqual(SAHABAH);
    expect(session.lesson.challenges.length).toBeGreaterThanOrEqual(5);
    expect(session.lesson.challenges.length).toBeLessThanOrEqual(QUIZ_MAX_QUESTIONS);
    const units = new Set(session.lesson.challenges.map(unitOf));
    expect(units.size).toBeGreaterThan(2);
    units.forEach((unitId) => expect(section("sahabah").branches.map((branch) => branch.id)).toContain(unitId));
    // No question asked twice.
    const prompts = session.lesson.challenges.map((challenge) => challenge.prompt);
    expect(new Set(prompts).size).toBe(prompts.length);
  });

  it("keeps a unit quiz inside its unit", () => {
    const unit = section("sahabah").branches[1];
    const session = createQuizSession({ user: makeUser(), scope: { kind: "unit", topicId: "sahabah", unitId: unit.id }, title: unit.title })!;
    expect(session.lesson.challenges.length).toBeGreaterThanOrEqual(3);
    session.lesson.challenges.forEach((challenge) => expect(unitOf(challenge)).toBe(unit.id));
  });

  it("leaves out premium units for a free learner and gated units for everyone", () => {
    for (const item of COURSE.sections) {
      const lessons = new Set(quizLessonsFor(makeUser(), { kind: "topic", topicId: item.topicId }).map((lesson) => lesson.id));
      for (const branch of item.branches.filter((entry) => entry.premiumOnly || entry.gated)) {
        const ids = item.nodes.filter((node) => node.branchId === branch.id).flatMap((node) => node.lessonIds);
        ids.forEach((id) => expect(lessons.has(id)).toBe(false));
      }
    }
  });

  it("costs no hearts, has no pass mark and never ends early", () => {
    const user = makeUser({ hearts: hearts(2) });
    const session = createQuizSession({ user, scope: SAHABAH, title: "Sahabah quiz" })!;
    expect(loseHeart(user, session).hearts.current).toBe(2);
    expect(isTestLost(session, session.lesson.challenges.length)).toBe(false);
    expect(session.passingScore).toBeUndefined();
  });

  it("asks other questions on the next try", () => {
    const user = makeUser();
    const first = createQuizSession({ user, scope: SAHABAH, title: "", attempt: 0 })!.lesson.challenges.map((challenge) => challenge.prompt);
    const second = createQuizSession({ user, scope: SAHABAH, title: "", attempt: 1 })!.lesson.challenges.map((challenge) => challenge.prompt);
    expect(second).not.toEqual(first);
  });

  it("is offered for every topic in the course", () => {
    const missing = COURSE.sections.filter((item) => !canQuiz(makeUser(), { kind: "topic", topicId: item.topicId })).map((item) => item.topicId);
    expect(missing).toEqual([]);
  });
});

describe("Quiz scores", () => {
  it("rounds to a percent and reads it kindly", () => {
    expect(quizPercent(7, 9)).toBe(78);
    expect(quizPercent(0, 0)).toBe(0);
    expect([100, 80, 79, 50, 49, 0].map(quizGrade)).toEqual(["perfect", "strong", "growing", "growing", "starting", "starting"]);
  });

  it("keeps the best and last score, counts tries, and pays the perfect gems once", () => {
    const user = makeUser({ gems: 5 });
    const first = recordQuizScore(user, SAHABAH, 6, 10);
    expect(first.percent).toBe(60);
    expect(first.newBest).toBe(false);
    expect(first.previousBest).toBeUndefined();
    expect(first.user.quizScores?.[quizId(SAHABAH)]).toMatchObject({ best: 60, last: 60, taken: 1 });

    const perfect = recordQuizScore(first.user, SAHABAH, 10, 10);
    expect(perfect).toMatchObject({ percent: 100, newBest: true, previousBest: 60, gems: QUIZ_PERFECT_GEMS });
    expect(perfect.user.gems).toBe(5 + QUIZ_PERFECT_GEMS);

    const lower = recordQuizScore(perfect.user, SAHABAH, 10, 10);
    expect(lower.gems).toBe(0);
    const worse = recordQuizScore(lower.user, SAHABAH, 3, 10);
    expect(worse.user.quizScores?.[quizId(SAHABAH)]).toMatchObject({ best: 100, last: 30, taken: 4, perfectRewarded: true });
  });

  it("names the units with the most misses first", () => {
    const branches = section("sahabah").branches;
    const lessonIn = (index: number, nth = 0) =>
      section("sahabah").nodes.filter((node) => node.branchId === branches[index].id).flatMap((node) => node.lessonIds)[nth];
    expect(unitsToGoOver([lessonIn(0), lessonIn(2), lessonIn(2, 1)], "sahabah")).toEqual([branches[2].id, branches[0].id]);
  });
});

describe("Quizzes (Practice tab)", () => {
  afterEach(() => {
    removeStoredItem(PROFILE_KEY);
    clearActiveAssessment();
  });

  it("opens on the path's topic, plays with no hearts, scores the quiz and saves the best", async () => {
    const user = makeUser({ hearts: hearts(0), reviewHeartRestoreUsed: true, totalXp: 100, lastTopicId: "sahabah" });
    setStoredItem(PROFILE_KEY, JSON.stringify(user));
    const session = createQuizSession({ user, scope: SAHABAH, title: "" })!;
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-sahabah");
    await press("tab-practice");
    await press("practice-quizzes");
    expect(screen.getByTestId("quiz-topic-page-sahabah")).toBeTruthy();
    expect(screen.getAllByText("NEW").length).toBeGreaterThan(0);
    await press("quiz-start-topic");
    expect(screen.getByTestId("exercise-view")).toBeTruthy();
    expect(screen.getByTestId("quiz-label")).toBeTruthy();

    const challenges = session.lesson.challenges;
    const pick = (challenge: Challenge, right: boolean) =>
      right ? challenge.correctChoiceId : challenge.choices.find((choice) => choice.id !== challenge.correctChoiceId)!.id;
    // Each question shows its own choices; the first one on screen not yet answered is the one asked.
    const answered = new Set<Challenge>();
    const shown = () =>
      challenges.find((challenge) => !answered.has(challenge) && challenge.choices.every((choice) => screen.queryByTestId(`choice-${choice.id}`)))!;
    // The first question wrong and the rest right: a quiz asks each question once.
    for (let step = 0; step < challenges.length; step += 1) {
      const challenge = shown();
      answered.add(challenge);
      await press(`choice-${pick(challenge, step > 0)}`);
      await press("exercise-check");
      await press("feedback-continue");
      if (screen.queryByTestId("quiz-complete")) break;
      if (!screen.queryByTestId("exercise-view")) throw new Error("left the quiz at step " + step);
    }

    expect(await screen.findByTestId("quiz-complete")).toBeTruthy();
    const right = challenges.length - 1;
    const percent = quizPercent(right, challenges.length);
    expect(screen.getByTestId("quiz-right").props.children).toBe(`${right} of ${challenges.length} right`);
    // The missed question's unit is the one to go over.
    expect(screen.getByTestId(`quiz-go-over-${unitOf(challenges[0])}`)).toBeTruthy();
    const saved = savedUser();
    expect(saved.quizScores?.[quizId(SAHABAH)]).toMatchObject({ best: percent, last: percent, taken: 1 });
    expect(saved.hearts.current).toBe(0);
    expect(saved.totalXp).toBe(100 + right * PRACTICE_XP_PER_CORRECT_ANSWER);
    // A quiz only measures: nothing is marked done.
    expect(saved.completedLessonIds).toEqual(user.completedLessonIds);
    expect(saved.completedNodeIds).toEqual([]);

    await press("quiz-continue");
    expect(screen.getByTestId("practice-hub")).toBeTruthy();
    expect(screen.getByTestId("practice-quiz-best").props.children).toBeTruthy();
  });

  it("asks a unit quiz from its row, and quitting goes back to Practice", async () => {
    setStoredItem(PROFILE_KEY, JSON.stringify(makeUser({ lastTopicId: "sahabah" })));
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-sahabah");
    await press("tab-practice");
    await press("practice-quizzes");
    const unit = section("sahabah").branches[0];
    await press(`quiz-unit-${unit.id}`);
    expect(screen.getByTestId("quiz-label")).toBeTruthy();
    await press("lesson-close");
    await press("quit-end");
    expect(screen.getByTestId("practice-hub")).toBeTruthy();
  });

  it("lists every topic one tap back", async () => {
    setStoredItem(PROFILE_KEY, JSON.stringify(makeUser()));
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    await press("tab-practice");
    await press("practice-quizzes");
    await press("quiz-sheet-back");
    expect(screen.getByTestId("quiz-topic-list")).toBeTruthy();
    await press("quiz-topic-sahabah");
    expect(screen.getByTestId("quiz-topic-page-sahabah")).toBeTruthy();
  });
});
