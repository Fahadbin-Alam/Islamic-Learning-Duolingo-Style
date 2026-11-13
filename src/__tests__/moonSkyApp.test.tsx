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
import { learningApi } from "../api/islamicLearningApi";
import { removeStoredItem, setStoredItem } from "../services/appStorage";
import type { TopicId, UserProfile } from "../types";
import { makeUser } from "./testUtils";

const PROFILE_KEY = "sira-path-user-profile";
// The app's first draw can take a few seconds when many test files run at once.
const SLOW = { timeout: 10000 };
jest.setTimeout(60000);

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

/** A learner who has done every circle of `topicId` before the one that teaches `lessonId`. */
function learnerAt(topicId: TopicId, lessonId: string): { user: UserProfile; nodeId: string } {
  const base = makeUser({ lastTopicId: topicId, hearts: { current: 5, max: 5, unlimited: true, lastRefillDate: "2026-11-13" } });
  const nodes = learningApi.getPathNodes(base).filter((node) => node.topicId === topicId);
  const at = nodes.findIndex((node) => node.lessonIds[0] === lessonId);
  expect(at).toBeGreaterThan(0);
  const done = nodes.slice(0, at);
  const user = { ...base, completedNodeIds: done.map((node) => node.id), completedLessonIds: done.flatMap((node) => node.lessonIds) };
  return { user, nodeId: nodes[at].id };
}

/** Opens the lesson, and gives its moon card a size, as a phone 390 px wide does. */
async function openLesson(topicId: TopicId, lessonId: string) {
  const { user, nodeId } = learnerAt(topicId, lessonId);
  setStoredItem(PROFILE_KEY, JSON.stringify(user));
  await render(<TopicApp />);
  await screen.findByTestId(`learn-path-${topicId}`, undefined, SLOW);
  await press(`path-node-${nodeId}`);
  await press("node-card-start");
  expect(await screen.findByTestId("learn-card", undefined, SLOW)).toBeTruthy();
  expect(screen.getByTestId("moon-card")).toBeTruthy();
  expect(screen.queryByTestId("lesson-photo")).toBeNull();
  await act(async () => {
    fireEvent(screen.getByTestId("moon-card-frame"), "layout", { nativeEvent: { layout: { width: 362, height: 270 } } });
  });
}

describe("the moon in the sky, in the app", () => {
  afterEach(() => removeStoredItem(PROFILE_KEY));

  it("opens the lesson about the moon split on the moon over Hira, not a photo", async () => {
    await openLesson("akhirah", "lesson-deep-lastday-moon-split");
    expect(screen.getByTestId("moon-caption")).toHaveTextContent("The moon split in two, and the mountain of Hira was seen between its halves.");
    expect(screen.getByTestId("moon-sky-half-left")).toBeTruthy();
    expect(screen.getByTestId("moon-sky-half-right")).toBeTruthy();
    expect(screen.getByText("Sahih al-Bukhari 3868")).toBeTruthy();
  });

  it("opens a lesson about fasting in Sha'ban on the twelve months, with Sha'ban lit", async () => {
    await openLesson("fasting", "lesson-deep-fast-extra-shaban");
    expect(screen.getAllByTestId(/^moon-month-/)).toHaveLength(12);
    expect(screen.getByTestId("moon-month-7-mine")).toHaveTextContent("Sha'ban");
    expect(screen.getByTestId("moon-month-6-sacred")).toHaveTextContent("Rajab");
  });
});
