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
import { learningApi, localDateKey } from "../api/islamicLearningApi";
import { getStoredItem, removeStoredItem, setStoredItem } from "../services/appStorage";
import { shiftDateKey } from "../services/familyCode";
import type { LearningNodeView, UserProfile } from "../types";
import { finishLessonRight } from "./lessonDriver";
import { makeUser } from "./testUtils";

const PROFILE_KEY = "sira-path-user-profile";
const savedUser = () => JSON.parse(getStoredItem(PROFILE_KEY) ?? "{}") as UserProfile;
const ALL = { includeHiddenElements: true };

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

/** Plays the circle START is on, right, to its complete screen. */
async function playNextLesson() {
  const node = learningApi.getPathNodes(savedUser()).find((item) => item.topicId === "foundation" && item.status !== "locked" && item.status !== "completed") as LearningNodeView;
  const session = await learningApi.getLessonSession(node.firstLessonId, savedUser());
  await press(`path-node-${node.id}`);
  await press("node-card-start");
  await finishLessonRight(session.lesson.challenges);
  expect(await screen.findByTestId("lesson-complete")).toBeTruthy();
}

afterEach(() => {
  removeStoredItem(PROFILE_KEY);
});

describe("the streak moment in the app", () => {
  it("comes after the day's first lesson, between its complete screen and the path, and not after the next one", async () => {
    // Yesterday was day 4 of the streak.
    const today = localDateKey();
    setStoredItem(
      PROFILE_KEY,
      JSON.stringify(
        makeUser({
          lastTopicId: "foundation",
          streakDays: 4,
          lastStreakDate: shiftDateKey(today, -1),
          hearts: { current: 5, max: 5, unlimited: true, lastRefillDate: today }
        })
      )
    );
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");

    await playNextLesson();
    expect(savedUser().streakDays).toBe(5);
    await press("complete-back");
    expect(screen.getByTestId("streak-moment")).toBeTruthy();
    expect(screen.getByTestId("streak-moment-title", ALL)).toHaveTextContent("5 day streak!");
    // Today is lit in the week, with the days before it that the streak covers.
    expect(screen.getByTestId("streak-day-today", ALL)).toBeTruthy();
    await press("streak-moment-continue");
    expect(screen.queryByTestId("streak-moment")).toBeNull();
    expect(await screen.findByTestId("learn-path-foundation")).toBeTruthy();

    // A second lesson the same day: the streak stays 5 and the complete screen goes straight back to the path.
    await playNextLesson();
    expect(savedUser().streakDays).toBe(5);
    await press("complete-back");
    expect(screen.queryByTestId("streak-moment")).toBeNull();
    expect(await screen.findByTestId("learn-path-foundation")).toBeTruthy();
  });
});
