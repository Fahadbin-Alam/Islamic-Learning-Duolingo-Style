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
jest.mock("../services/ayahPlayer", () => ({
  ...jest.requireActual("../services/ayahPlayer"),
  playAyah: jest.fn(),
  stopAyah: jest.fn()
}));

import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import TopicApp from "../TopicApp";
import { localDayNumber } from "../data/dailyCard";
import { getStoredItem, setStoredItem } from "../services/appStorage";
import { playAyah } from "../services/ayahPlayer";
import { makeUser } from "./testUtils";

describe("ayah and hadith of the day on opening the app", () => {
  beforeEach(() => {
    (playAyah as jest.Mock).mockClear();
    setStoredItem("sira-path-user-profile", JSON.stringify(makeUser({ preferredLanguage: "en" })));
    setStoredItem("sira-path-age-group", "18+");
    setStoredItem("sira-path-learner-background", "muslim");
  });

  async function open() {
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    // The card waits a moment for the app to settle (DAILY_AUTO_OPEN_MS).
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1300));
    });
  }

  it("opens by itself on the first open of the day and recites the ayah", async () => {
    setStoredItem("sira-path-daily-seen", "0");
    await open();
    expect(screen.getByTestId("daily-hadith")).toBeTruthy();
    expect(playAyah).toHaveBeenCalledWith(expect.stringContaining(".mp3"), { once: true });
    expect(getStoredItem("sira-path-daily-seen")).toBe(String(localDayNumber()));
    await act(async () => {
      fireEvent.press(screen.getByTestId("daily-close"));
    });
  });

  it("stays shut once today's card was seen", async () => {
    // Opened by hand from the top bar's book, the ayah waits for LISTEN.
    setStoredItem("sira-path-daily-seen", String(localDayNumber()));
    await open();
    expect(screen.queryByTestId("daily-hadith")).toBeNull();
    await act(async () => {
      fireEvent.press(screen.getByTestId("top-bar-daily"));
    });
    expect(screen.getByTestId("daily-hadith")).toBeTruthy();
    expect(screen.getByTestId("ayah-listen-play")).toBeTruthy();
    expect(playAyah).not.toHaveBeenCalled();
  });
});

describe("the card opens by itself twice a day at most", () => {
  const { dailyAutoDue, markDailyShown } = require("../data/dailyCard") as typeof import("../data/dailyCard");
  const morning = new Date(2026, 10, 1, 8, 0);
  const at = (hours: number) => new Date(morning.getTime() + hours * 3600000);

  it("opens on the first open of the day, again four hours later, then not again that day", () => {
    expect(dailyAutoDue(undefined, morning)).toBe(true);
    const once = markDailyShown(undefined, morning);
    expect(dailyAutoDue(once, at(1))).toBe(false);
    expect(dailyAutoDue(once, at(4))).toBe(true);
    const twice = markDailyShown(once, at(4));
    expect(twice.count).toBe(2);
    expect(dailyAutoDue(twice, at(10))).toBe(false);
    // A new day starts over.
    expect(dailyAutoDue(twice, at(24))).toBe(true);
  });
});
