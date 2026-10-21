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
import { StyleSheet } from "react-native";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TopicApp from "../TopicApp";
import { learningApi } from "../api/islamicLearningApi";
import { setStoredItem } from "../services/appStorage";
import type { LearningNodeView } from "../types";
import { makeUser } from "./testUtils";

// Android draws the app under its status bar (edge to edge), so the top bar and the lesson header
// must sit below the phone's real insets, and the tabs above its navigation bar.
const PHONE = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 36, right: 0, bottom: 24, left: 0 }
};

const padding = () => {
  const style = StyleSheet.flatten(screen.getByTestId("safe-area").props.style);
  return { top: style.paddingTop, bottom: style.paddingBottom };
};

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

describe("safe area", () => {
  it("keeps the top bar, lessons and tabs clear of the phone's status and navigation bars", async () => {
    const user = makeUser();
    setStoredItem("sira-path-user-profile", JSON.stringify(user));
    const node = learningApi.getPathNodes(user).find((item) => item.topicId === "foundation" && item.status === "current") as LearningNodeView;
    await render(
      <SafeAreaProvider initialMetrics={PHONE}>
        <TopicApp />
      </SafeAreaProvider>
    );
    await screen.findByTestId("learn-path-foundation");
    expect(screen.getByTestId("app-top-bar")).toBeTruthy();
    expect(padding()).toEqual({ top: 36, bottom: 24 });

    await press(`path-node-${node.id}`);
    await press("node-card-start");
    expect(screen.queryByTestId("app-top-bar")).toBeNull();
    expect(screen.getByTestId("lesson-progress")).toBeTruthy();
    expect(padding()).toEqual({ top: 36, bottom: 24 });
  });

  it("adds no padding where there are no insets", async () => {
    setStoredItem("sira-path-user-profile", JSON.stringify(makeUser()));
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    expect(padding()).toEqual({ top: 0, bottom: 0 });
  });
});
