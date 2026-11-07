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
import { isUnitTestLesson, learningApi, localDateKey } from "../api/islamicLearningApi";
import { COURSE, LESSONS_BY_ID } from "../data/course";
import { getStoredItem, setStoredItem } from "../services/appStorage";
import type { LearningNodeView, UserProfile } from "../types";
import { finishLessonRight, questionOnScreen, toQuestion } from "./lessonDriver";
import { makeUser } from "./testUtils";

// Fahad: lesson, Q&A, lesson, Q&A; a quiz once a learner has many questions behind them; a test to pass a unit.
// Questions come in many ways (gap, puzzle, true or false, matching), like Duolingo.

const PROFILE_KEY = "sira-path-user-profile";
const variety = (on: boolean) => ((globalThis as { __QUESTION_VARIETY__?: boolean }).__QUESTION_VARIETY__ = on);
const savedUser = () => JSON.parse(getStoredItem(PROFILE_KEY) ?? "{}") as UserProfile;

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

const foundation = COURSE.sections.find((section) => section.topicId === "foundation")!;
// The first Basics unit that ends with a test.
const testNode = foundation.nodes.find((node) => isUnitTestLesson(LESSONS_BY_ID[node.lessonIds[0]]) && LESSONS_BY_ID[node.lessonIds[0]].challenges.length >= 3)!;

async function openNode(user: UserProfile, nodeId: string) {
  setStoredItem(PROFILE_KEY, JSON.stringify(user));
  const node = learningApi.getPathNodes(user).find((item) => item.id === nodeId) as LearningNodeView;
  const session = await learningApi.getLessonSession(node.firstLessonId, user);
  await render(<TopicApp />);
  await screen.findByTestId("learn-path-foundation");
  await press(`path-node-${node.id}`);
  await press("node-card-start");
  return session;
}

afterEach(() => variety(false));

describe("questions in many ways, in the app", () => {
  it("plays a whole lesson through gaps, puzzles, true-or-false and tiles", async () => {
    variety(true);
    const user = makeUser({ hearts: { current: 5, max: 5, unlimited: true, lastRefillDate: localDateKey() } });
    const node = learningApi.getPathNodes(user).find((item) => item.topicId === "foundation" && item.status === "current")!;
    const session = await openNode(user, node.id);
    await finishLessonRight(session.lesson.challenges);
    expect(await screen.findByTestId("stat-stars")).toBeTruthy();
    expect(screen.getByLabelText("3 of 3 stars")).toBeTruthy();
  });
});

describe("a unit's test", () => {
  const before = foundation.nodes.slice(0, foundation.nodes.indexOf(testNode));
  const learner = () =>
    makeUser({
      hearts: { current: 5, max: 5, unlimited: true, lastRefillDate: localDateKey() },
      completedLessonIds: ["warm-up-1", "warm-up-2", "warm-up-3", ...before.flatMap((node) => node.lessonIds)],
      completedNodeIds: before.map((node) => node.id)
    });

  it("says Test time with its pass mark, and a fail keeps the unit open with TRY AGAIN", async () => {
    const session = await openNode(learner(), testNode.id);
    expect(session.unitTest).toBe(true);
    await press("learn-continue");
    expect(screen.getByText("Test time!")).toBeTruthy();
    await toQuestion();
    const challenges = session.lesson.challenges;
    for (let turn = 0; turn < challenges.length && !screen.queryByTestId("test-out-result"); turn += 1) {
      await toQuestion();
      const shown = questionOnScreen(challenges);
      if (!shown) break;
      const wrong = shown.choices.find((choice) => choice.id !== shown.correctChoiceId)!;
      await press(`choice-${wrong.id}`);
      await press("exercise-check");
      await press("feedback-continue");
    }
    expect(screen.getByTestId("test-out-result")).toBeTruthy();
    expect(screen.getByText(/to pass the unit test/)).toBeTruthy();
    expect(savedUser().completedNodeIds).not.toContain(testNode.id);
  });

  it("finishes the unit when the test is passed", async () => {
    const session = await openNode(learner(), testNode.id);
    await finishLessonRight(session.lesson.challenges);
    expect(await screen.findByTestId("stat-stars")).toBeTruthy();
    expect(savedUser().completedNodeIds).toContain(testNode.id);
  });
});
