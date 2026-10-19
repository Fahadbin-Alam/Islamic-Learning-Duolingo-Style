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
    showRewardedHeartAd: jest.fn(async () => ({ ok: false })),
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
import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react-native";
import TopicApp from "../TopicApp";
import { createTestOutSession, getTestOutPlan, learningApi, testOutPassingScore } from "../api/islamicLearningApi";
import { COURSE } from "../data/course";
import { removeStoredItem, setStoredItem } from "../services/appStorage";
import { answerLessonStep, isLastLessonStep, startLessonQueue } from "../services/lessonQueue";
import { clearActiveAssessment, loadActiveAssessment, saveActiveAssessment } from "../services/localProgress";
import { clearLocalAuthAccount, createLocalAuthAccount, signOutLocalAuthAccount } from "../services/localAuth";
import { playGameSound } from "../services/gameAudio";
import { createEmptyLearnerProfile, createFoundationAssessment } from "../services/foundationAssessment";
import { getLessonProgress, lessonStars } from "../ui/lesson";
import type { Challenge, LessonSession, UserProfile } from "../types";
import { makeUser } from "./testUtils";

describe("lesson queue", () => {
  it("asks each question once, then a first-try miss once more at the end", () => {
    let queue = startLessonQueue(3);
    expect(queue).toEqual([
      { index: 0, attempt: 0 },
      { index: 1, attempt: 0 },
      { index: 2, attempt: 0 }
    ]);

    const miss = answerLessonStep(queue, 0, false, false);
    expect(miss.requeued).toBe(true);
    expect(miss.done).toBe(false);
    queue = miss.queue;
    expect(queue[3]).toEqual({ index: 0, attempt: 1 });
    expect(isLastLessonStep(queue, 2)).toBe(false);

    // Missed again when it comes back: it is done, and it does not come back a third time.
    const again = answerLessonStep(queue, 3, false, false);
    expect(again.requeued).toBe(false);
    expect(again.done).toBe(true);
    expect(again.queue).toHaveLength(4);
    expect(isLastLessonStep(again.queue, 3)).toBe(true);
  });

  it("never asks a test question again", () => {
    const queue = startLessonQueue(2);
    const miss = answerLessonStep(queue, 0, false, true);
    expect(miss.requeued).toBe(false);
    expect(miss.done).toBe(true);
    expect(miss.queue).toBe(queue);
  });

  it("keeps the progress bar still on a first miss and fills it as questions are done", () => {
    const base = { hasTeach: true, hasPractice: false, challengeCount: 3 };
    expect(getLessonProgress({ ...base, screen: "lesson_feedback", done: 0 })).toBe(0.25);
    expect(getLessonProgress({ ...base, screen: "lesson_question", done: 2 })).toBe(0.75);
    expect(getLessonProgress({ ...base, screen: "lesson_feedback", done: 3 })).toBe(1);
    // Never past the lesson's own questions, however many comebacks there were.
    expect(getLessonProgress({ ...base, screen: "lesson_question", done: 9 })).toBe(1);
  });

  it("gives 3 stars with no mistakes, 2 with one or two, 1 with more", () => {
    expect(lessonStars(0)).toBe(3);
    expect(lessonStars(1)).toBe(2);
    expect(lessonStars(2)).toBe(2);
    expect(lessonStars(3)).toBe(1);
    expect(lessonStars(7)).toBe(1);
  });
});

describe("saved practice session", () => {
  afterEach(() => clearActiveAssessment());

  it("comes back for the same learner only", () => {
    const assessment = createFoundationAssessment(createEmptyLearnerProfile(), "review");
    saveActiveAssessment("guest", assessment);
    expect(loadActiveAssessment("guest")?.currentQuestion.id).toBe(assessment.currentQuestion.id);
    expect(loadActiveAssessment("sara@example.com")).toBeNull();
    clearActiveAssessment();
    expect(loadActiveAssessment("guest")).toBeNull();
  });
});

const PROFILE_KEY = "sira-path-user-profile";

function seedUser(user: UserProfile) {
  setStoredItem(PROFILE_KEY, JSON.stringify(user));
}

async function renderApp() {
  await render(<TopicApp />);
  await screen.findByTestId("learn-path-foundation");
}

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

// The question on screen: its tiles' testIDs, and the start of its prompt (up to a hyphen, quote, Arabic
// or ﷺ, which the screen draws with other characters).
function shownChallenge(challenges: Challenge[]) {
  return challenges.find((challenge) =>
    challenge.choices.every((choice) => screen.queryByTestId(`choice-${choice.id}`)) &&
    screen.queryAllByText(challenge.prompt.slice(0, 40).split(/[^A-Za-z0-9 ,.?!]/)[0].trim(), { exact: false }).length > 0
  );
}

async function answer(challenge: Challenge, right: boolean) {
  const pick = right ? challenge.correctChoiceId : challenge.choices.find((choice) => choice.id !== challenge.correctChoiceId)!.id;
  await press(`choice-${pick}`);
  await press("exercise-check");
  await press("feedback-continue");
}

describe("TopicApp lesson flow", () => {
  afterEach(() => {
    removeStoredItem(PROFILE_KEY);
    clearActiveAssessment();
  });

  it("brings a missed question back once at the end, with no free retry in between, and rates the stars", async () => {
    const user = makeUser({ hearts: { current: 5, max: 5, unlimited: true, lastRefillDate: "2026-10-19" } });
    seedUser(user);
    const node = learningApi.getPathNodes(user).find((item) => item.topicId === "foundation" && item.status === "current")!;
    const session: LessonSession = await learningApi.getLessonSession(node.firstLessonId, user);
    const challenges = session.lesson.challenges;
    expect(challenges.length).toBeGreaterThan(1);

    await renderApp();
    await press(`path-node-${node.id}`);
    await press("node-card-start");
    await screen.findByTestId("learn-card");
    await press("learn-continue");

    const first = shownChallenge(challenges)!;
    expect(first.id).toBe(challenges[0].id);
    await answer(first, false);

    // The next question, not the one just missed.
    const second = shownChallenge(challenges)!;
    expect(second.id).toBe(challenges[1].id);
    expect(screen.queryByText("Try again!")).toBeNull();
    await answer(second, true);

    for (const challenge of challenges.slice(2)) {
      expect(shownChallenge(challenges)!.id).toBe(challenge.id);
      await answer(challenge, true);
    }

    // The missed one comes back at the end as a new try.
    expect(shownChallenge(challenges)!.id).toBe(first.id);
    expect(screen.getByText("Try again!")).toBeTruthy();
    await answer(first, true);

    expect(await screen.findByTestId("stat-stars")).toBeTruthy();
    expect(screen.getByLabelText("2 of 3 stars")).toBeTruthy();
  });

  it("asks a test-out once per question, says it is a test, and TRY AGAIN starts other questions", async () => {
    const user = makeUser({ hearts: { current: 5, max: 5, unlimited: true, lastRefillDate: "2026-10-19" } });
    seedUser(user);
    const unit = COURSE.sections.find((section) => section.topicId === "foundation")!.branches[0];
    const plan = getTestOutPlan(user, unit.id)!;
    const testSession = (attempt: number) =>
      createTestOutSession({ branchTitle: unit.title, branchId: unit.id, lessons: plan.lessons, nodeIds: plan.nodeIds, heartsAtStart: 5, attempt });
    const firstTry = testSession(0).lesson.challenges;

    await renderApp();
    await press(`unit-test-out-${unit.id}`);
    await press("test-out-start");

    expect(screen.getByTestId("test-out-label")).toBeTruthy();
    expect(screen.getByTestId("test-out-goal").props.children.join("")).toBe(`Get ${testOutPassingScore(firstTry.length)} of ${firstTry.length} right`);

    // Every answer wrong: no "Try again!", each question once, in order.
    for (const challenge of firstTry) {
      expect(shownChallenge(firstTry)?.id).toBe(challenge.id);
      expect(screen.queryByText("Try again!")).toBeNull();
      await answer(challenge, false);
    }

    // The result opens once the last question has gone, not over it.
    expect(screen.getByTestId("test-out-result")).toBeTruthy();
    expect(screen.queryByTestId("exercise-view")).toBeNull();
    expect(screen.getByText(`0 of ${firstTry.length} right`)).toBeTruthy();

    await press("test-out-result-confirm");
    const secondTry = testSession(1).lesson.challenges;
    expect(shownChallenge(secondTry)?.id).toBe(secondTry[0].id);
    expect(secondTry[0].id).not.toBe(firstTry[0].id);
  });
});

describe("TopicApp practice and account", () => {
  afterEach(() => {
    removeStoredItem(PROFILE_KEY);
    clearActiveAssessment();
    clearLocalAuthAccount();
  });

  it("resumes a practice session cut off by a reload, on the same question", async () => {
    seedUser(makeUser());
    const assessment = createFoundationAssessment(createEmptyLearnerProfile(), "review");
    saveActiveAssessment("guest", assessment);

    await render(<TopicApp />);
    expect(await screen.findByTestId("assessment-screen")).toBeTruthy();
    expect(screen.getByText(`${assessment.questionNumber}/${assessment.totalQuestions}`)).toBeTruthy();
  });

  it("says LOG IN to a guest whose account logged out, and a wrong password plays the wrong sound every time", async () => {
    seedUser(makeUser());
    createLocalAuthAccount({ name: "Sara", email: "sara@example.com", password: "right-pass", createdAt: "2026-10-18T00:00:00.000Z" });
    signOutLocalAuthAccount();

    await renderApp();
    await press("tab-me");
    expect(screen.getByTestId("profile-create")).toHaveTextContent(/log in/i);
    await press("profile-create");
    expect(within(screen.getByTestId("account-sheet")).getByText("Welcome back!")).toBeTruthy();

    await act(async () => {
      fireEvent.changeText(screen.getByTestId("account-password"), "wrong-pass");
    });
    const wrongSounds = () => (playGameSound as jest.Mock).mock.calls.filter(([event]) => event === "wrong").length;
    // The log in answers after a few async steps, so wait for its feedback.
    (playGameSound as jest.Mock).mockClear();
    await press("account-submit");
    await waitFor(() => expect(wrongSounds()).toBe(1));
    expect(screen.getByTestId("account-error")).toHaveTextContent("Wrong email or password.");
    // The same message again still plays it (the sheet gets a new errorKey).
    (playGameSound as jest.Mock).mockClear();
    await press("account-submit");
    await waitFor(() => expect(wrongSounds()).toBe(1));
  });
});
