jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);
jest.mock("expo-speech", () => ({
  getAvailableVoicesAsync: jest.fn(async () => []),
  speak: jest.fn(),
  stop: jest.fn(() => Promise.resolve())
}));
jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));
jest.mock("../services/ayahPlayer", () => ({
  ...jest.requireActual("../services/ayahPlayer"),
  playAyah: jest.fn(),
  stopAyah: jest.fn()
}));
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
import { ScrollView } from "react-native";
import TopicApp from "../TopicApp";
import { createMemorizeSession } from "../api/islamicLearningApi";
import { removeStoredItem, setStoredItem } from "../services/appStorage";
import { resetDeviceSettingsForTests, setDeviceSetting } from "../services/deviceSettings";
import { playGameSound } from "../services/gameAudio";
import { clearActiveAssessment } from "../services/localProgress";
import { memorizeStars, recordMemorized, resetMemorizeForTests } from "../services/memorizeSurahs";
import { resetNetworkForTests } from "../services/network";
import type { UserProfile } from "../types";
import { LessonComplete } from "../ui/lesson";
import { completeSurahs, hifzAyahs, memorizeParts, memorizeSurahNumbers } from "../ui/lesson/reciteQuestion";
import type { SurahComplete } from "../ui/lesson/SurahCompleteBadge";
import { MemorizeSheet, surahsComplete, type MemorizeSheetRow } from "../ui/screens/MemorizeSheet";
import { makeUser } from "./testUtils";

// Round 13 of "make the app better and more fun", after Memorize surahs (rounds 9 to 12): a surah practised to the
// end, every part of it, is complete. The practice that completes it ends on a gold "Surah complete!" badge, and a bar
// on top of the surahs counts how many are complete.

const PROFILE_KEY = "sira-path-user-profile";
const part = (id: string) => memorizeParts().find((item) => item.id === id)!;
const partsOf = (surah: number) => memorizeParts().filter((item) => item.surah === surah).map((item) => item.id);
const IKHLAS: SurahComplete = { surah: 112, title: "Surah Al-Ikhlas", arabic: "سورة الإخلاص", done: 3, total: 35 };
const hidden = { includeHiddenElements: true };

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

describe("a complete surah (which surahs)", () => {
  it("is a surah with stars on every part, in the list's order", () => {
    expect(memorizeSurahNumbers()).toHaveLength(35);
    expect(completeSurahs({})).toEqual([]);
    // "Which surah is it?" keeps its stars with the surahs' stars, but it is not a surah.
    expect(completeSurahs({ "112": 3, "1": 1, "which-surah": 3 })).toEqual([1, 112]);
    expect(completeSurahs({ "112": 0 })).toEqual([]);
    // 'Abasa comes in 5 parts: with stars on 4 of them it is not complete yet.
    const abasa = partsOf(80);
    expect(abasa).toHaveLength(5);
    const four = Object.fromEntries(abasa.slice(0, 4).map((id) => [id, 2]));
    expect(completeSurahs(four)).toEqual([]);
    expect(completeSurahs({ ...four, [abasa[4]]: 1 })).toEqual([80]);
  });
});

describe("a complete surah (the bar on the surahs)", () => {
  const row = (id: string, stars: number): MemorizeSheetRow => {
    const item = part(id);
    return { id, surah: item.surah, title: `Surah ${item.surah}`, line: "", stars, ayahs: hifzAyahs(item), surahAyahs: item.ayahs };
  };

  it("counts a surah in parts once all its parts have stars", async () => {
    const rows = [row("1", 3), row("91:1-8", 2), row("91:8-15", 0), row("112", 0)];
    expect(surahsComplete(rows)).toEqual({ done: 1, total: 3 });
    expect(surahsComplete([row("1", 3), row("91:1-8", 2), row("91:8-15", 1)])).toEqual({ done: 2, total: 2 });
    await render(<MemorizeSheet visible onClose={() => undefined} rows={rows} onStart={jest.fn()} />);
    expect(screen.getByTestId("memorize-progress").props.accessibilityLabel).toBe("1 of 3 surahs complete");
    expect(screen.getByTestId("memorize-progress-count").props.children).toBe("1 of 3 surahs complete");
    expect(screen.getByTestId("memorize-progress-bar").props.accessibilityValue).toEqual({ min: 0, max: 100, now: 33 });
  });
});

describe("a complete surah (the complete card)", () => {
  const card = (surahComplete?: SurahComplete) => (
    <LessonComplete title="Surah Al-Ikhlas" xp={8} stars={3} streakDays={1} surahComplete={surahComplete} mascotVariant="girl" accent="#21B573" onContinue={jest.fn()} />
  );
  const barNow = () => screen.getByTestId("complete-surah-bar", hidden).props.accessibilityValue.now;
  const unlocked = () => jest.mocked(playGameSound).mock.calls.filter(([event]) => event === "unlock").length;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.mocked(playGameSound).mockClear();
  });
  afterEach(() => {
    jest.useRealTimers();
    // Calm mode off again, telling what listens for it (resetting alone tells no one).
    setDeviceSetting("calm", false);
    resetDeviceSettingsForTests();
  });

  it("gives the surah its gold badge: the bar grows by one and the fanfare plays as its star lands", async () => {
    await render(card(IKHLAS));
    expect(screen.getByTestId("complete-surah", hidden).props.accessibilityLabel).toBe("Surah complete! Surah Al-Ikhlas. 3 of 35 surahs complete");
    expect(screen.getByText("سورة الإخلاص", hidden)).toBeTruthy();
    expect(screen.getByTestId("complete-surah-count", hidden).props.children).toBe("3 of 35 surahs complete");
    // First the surahs that were complete before (2 of 35), then this one too, once its star has landed.
    expect(barNow()).toBe(6);
    expect(unlocked()).toBe(0);
    await act(async () => {
      jest.advanceTimersByTime(4000);
    });
    expect(barNow()).toBe(9);
    expect(unlocked()).toBe(1);
  });

  it("has no badge when the practice did not complete a surah", async () => {
    await render(card());
    await act(async () => {
      jest.advanceTimersByTime(4000);
    });
    expect(screen.queryByTestId("complete-surah", hidden)).toBeNull();
    expect(unlocked()).toBe(0);
  });

  it("with less motion, simply shows the badge with its bar at the new count", async () => {
    setDeviceSetting("calm", true);
    await render(card(IKHLAS));
    expect(barNow()).toBe(9);
  });

  // The card's scroll view (400 high, its content 700) and where the badge sits in it.
  async function laidOut(badgeTop: number) {
    const place = screen.getByTestId("complete-surah-place", hidden);
    let scroll = place.parent!;
    while (!scroll.props.onContentSizeChange) scroll = scroll.parent!;
    await fireEvent(scroll, "layout", { nativeEvent: { layout: { x: 0, y: 0, width: 320, height: 400 } } });
    await fireEvent(scroll, "contentSizeChange", 320, 700);
    await fireEvent(place, "layout", { nativeEvent: { layout: { x: 16, y: badgeTop, width: 288, height: 120 } } });
  }

  it("on a small phone, scrolls just enough to show the badge when it pops in below the fold", async () => {
    const scrollTo = jest.spyOn(ScrollView.prototype as unknown as { scrollTo: (options: object) => void }, "scrollTo");
    scrollTo.mockClear();
    try {
      await render(card(IKHLAS));
      await laidOut(380);
      expect(scrollTo).not.toHaveBeenCalled();
      await act(async () => {
        jest.advanceTimersByTime(4000);
      });
      // Its bottom (500) and a little room, at the bottom of the 400 shown.
      expect(scrollTo).toHaveBeenCalledWith({ y: 380 + 120 + 12 - 400, animated: true });
    } finally {
      scrollTo.mockRestore();
    }
  });

  it("does not scroll when the badge is in view already", async () => {
    const scrollTo = jest.spyOn(ScrollView.prototype as unknown as { scrollTo: (options: object) => void }, "scrollTo");
    scrollTo.mockClear();
    try {
      await render(card(IKHLAS));
      await laidOut(200);
      await act(async () => {
        jest.advanceTimersByTime(4000);
      });
      expect(scrollTo).not.toHaveBeenCalled();
    } finally {
      scrollTo.mockRestore();
    }
  });
});

describe("a complete surah (Practice tab)", () => {
  afterEach(() => {
    removeStoredItem(PROFILE_KEY);
    clearActiveAssessment();
    resetMemorizeForTests();
    resetNetworkForTests();
  });

  async function openSurahs(user: UserProfile) {
    setStoredItem(PROFILE_KEY, JSON.stringify(user));
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    await press("tab-practice");
    await press("practice-memorize");
    expect(screen.getByTestId("memorize-sheet")).toBeTruthy();
  }

  // A part of a surah, from its row, with every answer right, to its complete card.
  async function practise(user: UserProfile, id: string) {
    const questions = createMemorizeSession(user, part(id), 0)!.lesson.challenges;
    await press(`memorize-${id}`);
    await press("memorize-practice");
    for (let step = 0; step < questions.length; step += 1) {
      const question = questions.find((item) => item.choices.every((choice) => screen.queryByTestId(`choice-${choice.id}`)))!;
      await press(`choice-${question.correctChoiceId}`);
      await press("exercise-check");
      await press("feedback-continue");
    }
    expect(await screen.findByTestId("lesson-complete")).toBeTruthy();
    expect(screen.getByText("Every ayah right!")).toBeTruthy();
  }

  // CONTINUE (after the streak moment, on the day's first lesson): back to the surahs.
  async function backToSurahs() {
    await press("complete-continue");
    if (screen.queryByTestId("streak-moment-continue")) await press("streak-moment-continue");
    expect(screen.getByTestId("memorize-sheet")).toBeTruthy();
  }

  const progress = () => screen.getByTestId("memorize-progress-count").props.children;

  it("finishing the last part of Ash-Shams completes it: its gold badge, then one more on the bar", async () => {
    const user = makeUser();
    await openSurahs(user);
    expect(progress()).toBe("0 of 35 surahs complete");

    // Its first part alone does not complete it.
    await practise(user, "91:1-8");
    expect(screen.queryByTestId("complete-surah", hidden)).toBeNull();
    await backToSurahs();
    expect(progress()).toBe("0 of 35 surahs complete");

    // Its last part does.
    await practise(user, "91:8-15");
    expect(screen.getByTestId("complete-surah", hidden).props.accessibilityLabel).toBe("Surah complete! Surah Ash-Shams. 1 of 35 surahs complete");
    await backToSurahs();
    expect(progress()).toBe("1 of 35 surahs complete");
    expect(completeSurahs(memorizeStars())).toEqual([91]);
  });

  it("a surah complete already has no badge the next time", async () => {
    recordMemorized("112", 2);
    const user = makeUser();
    await openSurahs(user);
    expect(progress()).toBe("1 of 35 surahs complete");
    await practise(user, "112");
    expect(screen.queryByTestId("complete-surah", hidden)).toBeNull();
    expect(memorizeStars()).toEqual({ "112": 3 });
  });
});
