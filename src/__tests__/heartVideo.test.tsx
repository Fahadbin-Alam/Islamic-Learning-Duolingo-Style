jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);
jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));
jest.mock("expo-speech", () => ({ speak: jest.fn(), stop: jest.fn(() => Promise.resolve()) }));
// A build with ads, so videos can play.
jest.mock("../services/monetizationConfig", () => ({ ...jest.requireActual("../services/monetizationConfig"), monetizationMode: "sandbox" }));
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
import { monetizationClient } from "../services/monetization";
import { clearActiveAssessment } from "../services/localProgress";
import type { Challenge, LearningNodeView, UserProfile } from "../types";
import { RefillSheet } from "../ui/screens/RefillSheet";
import { makeUser } from "./testUtils";

const PROFILE_KEY = "sira-path-user-profile";
const hearts = (current: number, unlimited = false) => ({ current, max: 5, unlimited, lastRefillDate: localDateKey() });
const savedUser = () => JSON.parse(getStoredItem(PROFILE_KEY) ?? "{}") as UserProfile;
const showRewardedAd = monetizationClient.showRewardedAd as jest.Mock;

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

/** Opens the first lesson with one heart left and the free refill used, misses a question, and taps GOT IT. */
async function runOutOfHearts(user: UserProfile = makeUser({ hearts: hearts(1), reviewHeartRestoreUsed: true })) {
  setStoredItem(PROFILE_KEY, JSON.stringify(user));
  const node = learningApi.getPathNodes(user).find((item) => item.topicId === "foundation" && item.status === "current") as LearningNodeView;
  const challenges: Challenge[] = (await learningApi.getLessonSession(node.firstLessonId, user)).lesson.challenges;
  await render(<TopicApp />);
  await screen.findByTestId("learn-path-foundation");
  await press(`path-node-${node.id}`);
  await press("node-card-start");
  await press("learn-continue");
  const first = challenges[0];
  await press(`choice-${first.choices.find((choice) => choice.id !== first.correctChoiceId)!.id}`);
  await press("exercise-check");
  await press("feedback-continue");
}

describe("a video for a heart on the out-of-hearts sheet", () => {
  afterEach(() => {
    removeStoredItem(PROFILE_KEY);
    clearActiveAssessment();
    showRewardedAd.mockReset();
    showRewardedAd.mockResolvedValue({ ok: false });
  });

  it("plays the shop's heart video right there, then the lesson goes on with one heart", async () => {
    showRewardedAd.mockResolvedValue({ ok: true, heartsGranted: 1, gemsGranted: 0, transactionId: "ad" });
    await runOutOfHearts();
    expect(screen.getByTestId("refill-tomorrow")).toBeTruthy();
    await press("refill-video");

    expect(showRewardedAd).toHaveBeenCalledWith(expect.objectContaining({ id: "watch-ad-heart" }));
    expect(screen.getByTestId("exercise-view")).toBeTruthy();
    expect(screen.getByTestId("lesson-hearts").props.accessibilityLabel).toBe("1 of 5 hearts");
    expect(savedUser().hearts.current).toBe(1);
  });

  it("keeps the sheet up when no video can play, and says so", async () => {
    showRewardedAd.mockResolvedValue({ ok: false, message: "No fill" });
    await runOutOfHearts();
    await press("refill-video");
    expect(screen.getByTestId("refill-tomorrow")).toBeTruthy();
    expect(screen.getByText("No video right now")).toBeTruthy();
    expect(savedUser().hearts.current).toBe(0);
  });

  it("never offers the video while the free refill is still there", async () => {
    await runOutOfHearts(makeUser({ hearts: hearts(1) }));
    expect(screen.getByTestId("refill-claim")).toBeTruthy();
    expect(screen.queryByTestId("refill-video")).toBeNull();
  });
});

describe("the out-of-hearts sheet's video button", () => {
  const props = { visible: true, variant: "shop" as const, maxHearts: 5, mascotVariant: "hijabi", onShop: jest.fn(), onEndLesson: jest.fn() };

  it("leads with FREE HEART and keeps GET HEARTS and END LESSON under it", async () => {
    const onWatchVideo = jest.fn();
    await render(<RefillSheet {...props} onWatchVideo={onWatchVideo} />);
    await press("refill-video");
    expect(onWatchVideo).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("refill-get")).toBeTruthy();
    expect(screen.getByTestId("refill-end")).toBeTruthy();
  });

  it("spins while the video loads, and no other button closes the sheet under it", async () => {
    const onShop = jest.fn();
    const onEndLesson = jest.fn();
    await render(<RefillSheet {...props} onShop={onShop} onEndLesson={onEndLesson} onWatchVideo={jest.fn()} videoBusy />);
    expect(screen.getByTestId("refill-video-busy")).toBeTruthy();
    expect(screen.queryByTestId("refill-video")).toBeNull();
    await press("refill-get");
    await press("refill-end");
    expect(onShop).not.toHaveBeenCalled();
    expect(onEndLesson).not.toHaveBeenCalled();
  });

  it("is left out when videos can't play", async () => {
    await render(<RefillSheet {...props} />);
    expect(screen.queryByTestId("refill-video")).toBeNull();
  });
});
