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
import type { UserProfile } from "../types";
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

/** A learner who has done every Prophets circle before the one that teaches `lessonId`. */
function learnerAt(lessonId: string): { user: UserProfile; nodeId: string } {
  const base = makeUser({ lastTopicId: "prophets", hearts: { current: 5, max: 5, unlimited: true, lastRefillDate: "2026-11-11" } });
  const nodes = learningApi.getPathNodes(base).filter((node) => node.topicId === "prophets");
  const at = nodes.findIndex((node) => node.lessonIds.includes(lessonId));
  expect(at).toBeGreaterThan(0);
  const done = nodes.slice(0, at);
  const user = { ...base, completedNodeIds: done.map((node) => node.id), completedLessonIds: done.flatMap((node) => node.lessonIds) };
  return { user, nodeId: nodes[at].id };
}

describe("the Seerah maps in the app", () => {
  afterEach(() => removeStoredItem(PROFILE_KEY));

  it("opens a Seerah lesson on its map, not a photo", async () => {
    const { user, nodeId } = learnerAt("lesson-deep-seerah-hijrah-quba");
    setStoredItem(PROFILE_KEY, JSON.stringify(user));
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-prophets", undefined, SLOW);
    await press(`path-node-${nodeId}`);
    await press("node-card-start");
    expect(await screen.findByTestId("learn-card", undefined, SLOW)).toBeTruthy();
    expect(screen.getByTestId("journey-map")).toBeTruthy();
    expect(screen.queryByTestId("lesson-photo")).toBeNull();
    expect(screen.getByTestId("journey-life-on-madinah")).toBeTruthy();
  });

  it("puts the map of his life ﷺ on the Prophets path only, and opens and closes it", async () => {
    setStoredItem(PROFILE_KEY, JSON.stringify(makeUser({ lastTopicId: "prophets" })));
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-prophets", undefined, SLOW);
    expect(screen.queryByTestId("life-map-sheet")).toBeNull();
    await press("life-map-banner");
    expect(await screen.findByTestId("life-map-sheet", undefined, SLOW)).toBeTruthy();
    expect(screen.getByTestId("life-map-title")).toHaveTextContent("Seerah: the early years");
    await press("life-map-close");
    expect(screen.queryByTestId("life-map-title")).toBeNull();
  });

  it("leaves other paths without it", async () => {
    setStoredItem(PROFILE_KEY, JSON.stringify(makeUser({ lastTopicId: "sahabah" })));
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-sahabah", undefined, SLOW);
    expect(screen.queryByTestId("life-map-banner")).toBeNull();
  });
});
