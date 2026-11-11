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
import { removeStoredItem, setStoredItem } from "../services/appStorage";
import { getCatalog, loadedLanguages, translationOf } from "../translations";
import type { SupportedLanguage } from "../types";
import { makeUser } from "./testUtils";

// Each language's text is over 140,000 lines. The app holds only the language it shows; the search (which finds
// names in every language) loads another only when something is typed in its letters. These run in order: what a
// test loads stays loaded for the next.
const PROFILE_KEY = "sira-path-user-profile";

async function openApp(language: SupportedLanguage) {
  setStoredItem(PROFILE_KEY, JSON.stringify(makeUser({ lastTopicId: "foundation", preferredLanguage: language })));
  const view = await render(<TopicApp />);
  await screen.findByTestId("learn-path-foundation");
  return view;
}

afterEach(() => {
  removeStoredItem(PROFILE_KEY);
});

describe("languages in memory", () => {
  it("opens in English without loading any other language", async () => {
    const view = await openApp("en");
    expect(loadedLanguages()).toEqual([]);
    view.unmount();
  });

  it("opens in Bengali with only Bengali loaded", async () => {
    const view = await openApp("bn");
    expect(loadedLanguages()).toEqual(["bn"]);
    view.unmount();
  });

  it("searches in English letters without loading another language, and takes one in when its letters are typed", async () => {
    const view = await openApp("en");
    await act(async () => {
      fireEvent.press(screen.getByTestId("top-bar-topic"));
    });
    await act(async () => {
      fireEvent(screen.getByTestId("topic-search"), "focus");
      await new Promise((done) => setTimeout(done, 200));
    });
    // Bengali is still here from the test before; touching the field and searching in English letters load nothing.
    expect(loadedLanguages()).toEqual(["bn"]);
    await act(async () => {
      fireEvent.changeText(screen.getByTestId("topic-search"), "husayn");
    });
    expect(screen.getByText("Al-Husayn ibn Ali")).toBeTruthy();
    expect(loadedLanguages()).toEqual(["bn"]);
    await act(async () => {
      fireEvent.changeText(screen.getByTestId("topic-search"), "হুসাইন");
    });
    expect(screen.getByText("Al-Husayn ibn Ali")).toBeTruthy();
    expect(loadedLanguages()).toEqual(["bn"]);
    // Arabic letters: Arabic and Urdu are written in them.
    await act(async () => {
      fireEvent.changeText(screen.getByTestId("topic-search"), "حسين");
    });
    expect(screen.getByText("Al-Husayn ibn Ali")).toBeTruthy();
    expect([...loadedLanguages()].sort()).toEqual(["ar", "bn", "ur"]);
    view.unmount();
  });
});

describe("reading a line", () => {
  it("gives a screen's line before a lesson's, and nothing for a line without one", () => {
    for (const language of ["bn", "ur", "ar"] as const) {
      const catalog = getCatalog(language);
      for (const text of ["Choose a topic", "Search topics and people", "Al-Husayn ibn Ali"]) {
        expect(translationOf(language, text)).toBe(catalog[text]);
      }
      expect(translationOf(language, "zzqxv no such line")).toBeUndefined();
      // Names on every object are not lines.
      expect(translationOf(language, "constructor")).toBeUndefined();
      expect(translationOf(language, "toString")).toBeUndefined();
    }
    expect(translationOf("en", "Choose a topic")).toBeUndefined();
  });
});
