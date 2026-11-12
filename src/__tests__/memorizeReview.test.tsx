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
import TopicApp from "../TopicApp";
import { createMemorizeSession } from "../api/islamicLearningApi";
import { getStoredItem, removeStoredItem, setStoredItem } from "../services/appStorage";
import { clearActiveAssessment } from "../services/localProgress";
import {
  isReviewDue,
  localDay,
  memorizeReviews,
  memorizeStars,
  recordMemorized,
  recordReview,
  resetMemorizeForTests,
  reviewDay
} from "../services/memorizeSurahs";
import { resetNetworkForTests } from "../services/network";
import type { UserProfile } from "../types";
import { LessonComplete } from "../ui/lesson";
import { hifzAyahs, memorizeParts } from "../ui/lesson/reciteQuestion";
import { MemorizeSheet, type MemorizeSheetRow } from "../ui/screens/MemorizeSheet";
import { makeUser } from "./testUtils";

// Round 17 of "make the app better and more fun", after Memorize surahs (rounds 9 to 13): a surah memorized with no
// mistake comes back for review, as those who memorize the Quran go back over what they hold. The next day, then
// after 3 days, a week, two weeks and a month; any mistake brings it back the next day. Nothing pops up or nags: the
// surahs, Practice and the finish card simply say what is ready.

const PROFILE_KEY = "sira-path-user-profile";
const REVIEW_KEY = "sira-path-memorize-review";
const part = (id: string) => memorizeParts().find((item) => item.id === id)!;
const hidden = { includeHiddenElements: true };
/** The local day so many days before today. */
const daysAgo = (days: number) => {
  const now = new Date();
  return localDay(new Date(now.getFullYear(), now.getMonth(), now.getDate() - days, 12));
};

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

afterEach(() => {
  resetMemorizeForTests();
});

describe("reviewing a memorized surah (the days)", () => {
  it("brings a surah memorized with no mistake back the next day, then after 3, 7, 14 and 30 days", () => {
    expect(recordMemorized("112", 3)).toBe(true);
    expect(recordReview("112", 3, "2026-01-01")).toBe(1);
    expect(isReviewDue("112", memorizeStars(), memorizeReviews(), "2026-01-01")).toBe(false);
    expect(isReviewDue("112", memorizeStars(), memorizeReviews(), "2026-01-02")).toBe(true);

    // Each review on its day with no mistake moves it to the next gap, across months, and a month is the longest.
    const days = [
      ["2026-01-02", 3, "2026-01-05"],
      ["2026-01-05", 7, "2026-01-12"],
      ["2026-01-12", 14, "2026-01-26"],
      ["2026-01-26", 30, "2026-02-25"],
      ["2026-02-25", 30, "2026-03-27"]
    ] as const;
    for (const [today, gap, next] of days) {
      expect(isReviewDue("112", memorizeStars(), memorizeReviews(), today)).toBe(true);
      expect(recordReview("112", 3, today)).toBe(gap);
      expect(reviewDay(memorizeReviews()["112"])).toBe(next);
      expect(isReviewDue("112", memorizeStars(), memorizeReviews(), today)).toBe(false);
    }
    expect(memorizeReviews()["112"]).toEqual({ day: "2026-02-25", step: 4 });
  });

  it("leaves a review done early as it was, and moves a late one on from the day it is done", () => {
    recordMemorized("112", 3);
    recordReview("112", 3, "2026-01-01");
    recordReview("112", 3, "2026-01-02");
    // Due on the 5th: practised again on the 3rd, it still comes back on the 5th, in 2 days.
    expect(recordReview("112", 3, "2026-01-03")).toBe(2);
    expect(memorizeReviews()["112"]).toEqual({ day: "2026-01-02", step: 1 });
    // Ten days late, it goes on to a week from then.
    expect(recordReview("112", 3, "2026-01-15")).toBe(7);
    expect(memorizeReviews()["112"]).toEqual({ day: "2026-01-15", step: 2 });
  });

  it("brings it back the next day after any mistake, even before its day, keeping its best stars", () => {
    recordMemorized("112", 3);
    recordReview("112", 3, "2026-01-01");
    recordReview("112", 3, "2026-01-02");
    recordReview("112", 3, "2026-01-05");
    expect(memorizeReviews()["112"].step).toBe(2);
    // A try with a mistake keeps two stars at most; the surah keeps its three.
    expect(recordMemorized("112", 2)).toBe(false);
    expect(recordReview("112", 2, "2026-01-08")).toBe(1);
    expect(memorizeReviews()["112"]).toEqual({ day: "2026-01-08", step: 0 });
    expect(memorizeStars()["112"]).toBe(3);
    expect(isReviewDue("112", memorizeStars(), memorizeReviews(), "2026-01-09")).toBe(true);
  });

  it("is only ever for a surah with three stars; one with three from before reviews began is ready now", () => {
    // Not memorized yet: no day to come back.
    recordMemorized("113", 2);
    expect(recordReview("113", 2, "2026-01-01")).toBeUndefined();
    expect(memorizeReviews()).toEqual({});
    expect(isReviewDue("113", memorizeStars(), memorizeReviews(), "2026-03-01")).toBe(false);
    expect(isReviewDue("114", memorizeStars(), memorizeReviews(), "2026-03-01")).toBe(false);
    // Three stars, kept before reviews began: ready the first time it is looked at.
    recordMemorized("114", 3);
    expect(isReviewDue("114", memorizeStars(), memorizeReviews(), "2026-03-01")).toBe(true);
  });

  it("counts calendar days, so a leap day is one of them", () => {
    recordMemorized("1", 3);
    expect(recordReview("1", 3, "2028-02-28")).toBe(1);
    expect(reviewDay(memorizeReviews()["1"])).toBe("2028-02-29");
    expect(recordReview("1", 3, "2028-02-29")).toBe(3);
    expect(reviewDay(memorizeReviews()["1"])).toBe("2028-03-03");
  });

  it("keeps the days on the phone, leaving out anything that is not a day", () => {
    recordMemorized("112", 3);
    recordReview("112", 3, "2026-01-01");
    expect(JSON.parse(getStoredItem(REVIEW_KEY) ?? "{}")).toEqual({ "112": { day: "2026-01-01", step: 0 } });
    // What the phone kept is read once a run.
    resetMemorizeForTests();
    setStoredItem(
      REVIEW_KEY,
      JSON.stringify({
        "112": { day: "2026-01-01", step: 2 },
        "113": { day: "soon", step: 1 },
        "114": { day: "2026-01-01" },
        "1": { day: "2026-01-01", step: 99 },
        "2": null
      })
    );
    expect(memorizeReviews()).toEqual({ "112": { day: "2026-01-01", step: 2 }, "1": { day: "2026-01-01", step: 4 } });
  });
});

describe("reviewing a memorized surah (on screen)", () => {
  const rows: MemorizeSheetRow[] = [
    { id: "1", surah: 1, title: "Surah Al-Fatihah", line: "7 ayahs", stars: 3, due: true, ayahs: hifzAyahs(part("1")), surahAyahs: 7 },
    { id: "114", surah: 114, title: "Surah An-Nas", line: "6 ayahs", stars: 3, ayahs: hifzAyahs(part("114")), surahAyahs: 6 },
    { id: "113", surah: 113, title: "Surah Al-Falaq", line: "5 ayahs", stars: 3, due: true, ayahs: hifzAyahs(part("113")), surahAyahs: 5 }
  ];

  it("the card on top starts the first surah ready to review, and each one ready says so", async () => {
    const onStart = jest.fn();
    await render(<MemorizeSheet visible onClose={() => undefined} rows={rows} onStart={onStart} />);
    expect(screen.getByTestId("memorize-review").props.accessibilityLabel).toBe("Review today, Surah Al-Fatihah and 1 more");
    expect(screen.getByTestId("memorize-due-1")).toBeTruthy();
    expect(screen.getByTestId("memorize-due-113")).toBeTruthy();
    expect(screen.queryByTestId("memorize-due-114")).toBeNull();
    expect(screen.getByTestId("memorize-113").props.accessibilityLabel).toBe("Surah Al-Falaq, 5 ayahs, 3 of 3 stars, Review today");
    expect(screen.getByTestId("memorize-114").props.accessibilityLabel).toBe("Surah An-Nas, 6 ayahs, 3 of 3 stars");
    // Straight to its questions: a review is said from memory.
    await press("memorize-review");
    expect(onStart).toHaveBeenCalledWith("1");
    // Its page says so too.
    await press("memorize-113");
    expect(screen.getByTestId("memorize-page-due")).toBeTruthy();
  });

  it("names the one surah ready, and has no card when none is", async () => {
    const one = rows.map((row) => ({ ...row, due: row.id === "113" }));
    const { rerender } = await render(<MemorizeSheet visible onClose={() => undefined} rows={one} onStart={jest.fn()} />);
    expect(screen.getByTestId("memorize-review-line").props.children).toBe("Surah Al-Falaq");
    await rerender(<MemorizeSheet visible onClose={() => undefined} rows={rows.map((row) => ({ ...row, due: false }))} onStart={jest.fn()} />);
    expect(screen.queryByTestId("memorize-review")).toBeNull();
    expect(screen.queryByTestId("memorize-due-1")).toBeNull();
  });

  describe("the finish card", () => {
    const card = (nextReview?: number) => (
      <LessonComplete title="Surah Al-Ikhlas" xp={8} stars={3} streakDays={1} nextReview={nextReview} mascotVariant="girl" accent="#21B573" onContinue={jest.fn()} />
    );
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    it("says when the surah comes back to review", async () => {
      const { rerender } = await render(card(1));
      expect(screen.getByTestId("complete-next-review", hidden).props.children).toBe("Review it again tomorrow");
      await rerender(card(7));
      expect(screen.getByTestId("complete-next-review", hidden).props.children).toBe("Review it again in 7 days");
      await rerender(card());
      expect(screen.queryByTestId("complete-next-review", hidden)).toBeNull();
    });
  });
});

describe("reviewing a memorized surah (Practice tab)", () => {
  afterEach(() => {
    removeStoredItem(PROFILE_KEY);
    clearActiveAssessment();
    resetNetworkForTests();
  });

  async function openPractice(user: UserProfile) {
    setStoredItem(PROFILE_KEY, JSON.stringify(user));
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    await press("tab-practice");
  }

  // Through the questions on screen to the finish card: every answer right, or the first one wrong once.
  async function answer(user: UserProfile, id: string, { mistake = false } = {}) {
    const questions = createMemorizeSession(user, part(id), 0)!.lesson.challenges;
    let wrongOnce = mistake;
    for (let step = 0; step < questions.length * 2 && !screen.queryByTestId("lesson-complete"); step += 1) {
      const question = questions.find((item) => item.choices.every((choice) => screen.queryByTestId(`choice-${choice.id}`)))!;
      const choice = wrongOnce ? question.choices.find((item) => item.id !== question.correctChoiceId)! : question.choices.find((item) => item.id === question.correctChoiceId)!;
      wrongOnce = false;
      await press(`choice-${choice.id}`);
      await press("exercise-check");
      await press("feedback-continue");
    }
    expect(await screen.findByTestId("lesson-complete")).toBeTruthy();
  }

  async function backToSurahs() {
    await press("complete-continue");
    if (screen.queryByTestId("streak-moment-continue")) await press("streak-moment-continue");
    expect(screen.getByTestId("memorize-sheet")).toBeTruthy();
  }

  it("a surah memorized before is ready to review: Practice says so, the card starts it, and it comes back tomorrow", async () => {
    recordMemorized("112", 3);
    const user = makeUser();
    await openPractice(user);
    expect(screen.getByTestId("practice-memorize-review")).toBeTruthy();
    expect(screen.getByText("1 ready to review today")).toBeTruthy();
    expect(screen.getByTestId("practice-memorize").props.accessibilityLabel).toBe(`Memorize surahs, 1/${memorizeParts().length}, 1 ready to review today`);

    await press("practice-memorize");
    expect(screen.getByTestId("memorize-review").props.accessibilityLabel).toBe("Review today, Surah Al-Ikhlas");
    expect(screen.getByTestId("memorize-due-112")).toBeTruthy();
    await press("memorize-review");
    expect(screen.getByTestId("exercise-view")).toBeTruthy();
    await answer(user, "112");
    expect(screen.getByText("Every ayah right!")).toBeTruthy();
    expect(screen.getByTestId("complete-next-review", hidden).props.children).toBe("Review it again tomorrow");
    expect(memorizeReviews()).toEqual({ "112": { day: localDay(), step: 0 } });

    // Back on the surahs, nothing is left to review today, and Practice says what it said before.
    await backToSurahs();
    expect(screen.queryByTestId("memorize-review")).toBeNull();
    expect(screen.queryByTestId("memorize-due-112")).toBeNull();
    await press("memorize-sheet-close");
    expect(screen.queryByTestId("practice-memorize-review")).toBeNull();
    expect(screen.getByText("Short surahs, ayah by ayah, with the reciter")).toBeTruthy();
  });

  it("a review on its day moves it on: reviewed 3 days after the last, it comes back in a week", async () => {
    recordMemorized("112", 3);
    recordReview("112", 3, daysAgo(4));
    recordReview("112", 3, daysAgo(3));
    // Memorized today: not ready yet.
    recordMemorized("113", 3);
    recordReview("113", 3);
    const user = makeUser();
    await openPractice(user);
    expect(screen.getByText("1 ready to review today")).toBeTruthy();
    await press("practice-memorize");
    expect(screen.getByTestId("memorize-review-line").props.children).toBe("Surah Al-Ikhlas");
    expect(screen.queryByTestId("memorize-due-113")).toBeNull();

    await press("memorize-review");
    await answer(user, "112");
    expect(screen.getByTestId("complete-next-review", hidden).props.children).toBe("Review it again in 7 days");
    expect(memorizeReviews()["112"]).toEqual({ day: localDay(), step: 2 });
  });

  it("a mistake in a review brings the surah back tomorrow, with its three stars kept", async () => {
    recordMemorized("112", 3);
    recordReview("112", 3, daysAgo(4));
    recordReview("112", 3, daysAgo(3));
    const user = makeUser();
    await openPractice(user);
    await press("practice-memorize");
    await press("memorize-review");
    await answer(user, "112", { mistake: true });
    expect(screen.queryByText("Every ayah right!")).toBeNull();
    expect(screen.getByTestId("complete-next-review", hidden).props.children).toBe("Review it again tomorrow");
    expect(memorizeReviews()["112"]).toEqual({ day: localDay(), step: 0 });
    expect(memorizeStars()["112"]).toBe(3);
  });

  it("a surah practised without being memorized yet has no review day", async () => {
    const user = makeUser();
    await openPractice(user);
    await press("practice-memorize");
    await press("memorize-114");
    await press("memorize-practice");
    await answer(user, "114", { mistake: true });
    expect(screen.queryByTestId("complete-next-review", hidden)).toBeNull();
    expect(memorizeReviews()).toEqual({});
  });
});
