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
import { getStoredItem, removeStoredItem, setStoredItem } from "../services/appStorage";
import { makeUser } from "./testUtils";

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

// Every new learner picks a language before the first lesson, not only those on a Bangla, Urdu or Arabic phone.
describe("language on first launch", () => {
  beforeEach(() => removeStoredItem("sira-path-user-profile"));

  it("asks a brand-new learner on an English phone, with English picked and no way to skip", async () => {
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    expect(screen.getByTestId("language-sheet")).toBeTruthy();
    expect(screen.getByTestId("language-en").props.accessibilityState).toMatchObject({ selected: true });
    expect(screen.queryByTestId("language-later")).toBeNull();

    await press("language-bn");
    await press("language-save");
    expect(screen.queryByTestId("language-sheet")).toBeNull();
    expect(JSON.parse(getStoredItem("sira-path-user-profile") ?? "{}").preferredLanguage).toBe("bn");
  });

  it("does not ask again once a language is chosen", async () => {
    setStoredItem("sira-path-user-profile", JSON.stringify(makeUser({ preferredLanguage: "en" })));
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    expect(screen.queryByTestId("language-sheet")).toBeNull();
  });
});
