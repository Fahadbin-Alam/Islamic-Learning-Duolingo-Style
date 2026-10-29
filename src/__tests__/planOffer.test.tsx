jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);
jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));
jest.mock("expo-speech", () => ({ speak: jest.fn(), stop: jest.fn(() => Promise.resolve()) }));
// A build that can sell plans and play videos (the simulated store).
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
import { createLessonPracticeSession, learningApi, localDateKey } from "../api/islamicLearningApi";
import { COURSE, SHOP_ITEMS } from "../data/course";
import { getStoredItem, removeStoredItem, setStoredItem } from "../services/appStorage";
import { monetizationClient } from "../services/monetization";
import {
  addHeartVideo,
  canSellInStore,
  LESSONS_BETWEEN_PLAN_OFFERS,
  mayOfferPlans,
  MIN_MS_BETWEEN_PLAN_OFFERS,
  shouldOfferPlansAfterLesson,
  VIDEOS_PER_HEART
} from "../services/monetizationConfig";
import { clearActiveAssessment } from "../services/localProgress";
import type { Challenge, LearningNodeView, UserProfile } from "../types";
import { PlanOfferSheet } from "../ui/screens/PlanOfferSheet";
import { makeUser } from "./testUtils";

const PROFILE_KEY = "sira-path-user-profile";
const OFFER_AT_KEY = "sira-path-plan-offer-at";
const hearts = (current: number, unlimited = false) => ({ current, max: 5, unlimited, lastRefillDate: localDateKey() });
const savedUser = () => JSON.parse(getStoredItem(PROFILE_KEY) ?? "{}") as UserProfile;
const purchaseShopItem = monetizationClient.purchaseShopItem as jest.Mock;

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

async function passGrownUp() {
  const [a, b] = (String(screen.getByTestId("grownup-question").props.children).match(/\d+/g) ?? []).map(Number);
  await press(`grownup-option-${a * b}`);
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

afterEach(() => {
  removeStoredItem(PROFILE_KEY);
  removeStoredItem(OFFER_AT_KEY);
  removeStoredItem("sira-path-age-group");
  clearActiveAssessment();
  purchaseShopItem.mockReset();
  purchaseShopItem.mockResolvedValue({ ok: false, cancelled: true });
});

describe("plan offer rules", () => {
  const check = { canSell: true, hasPremium: false, child: false, msSinceLastOffer: Infinity };

  it("three videos make one heart, and the count starts again", () => {
    expect(VIDEOS_PER_HEART).toBe(3);
    expect(addHeartVideo(0)).toEqual({ watched: 1, heartEarned: false });
    expect(addHeartVideo(1)).toEqual({ watched: 2, heartEarned: false });
    expect(addHeartVideo(2)).toEqual({ watched: 0, heartEarned: true });
  });

  it("offers the plans after every third finished lesson", () => {
    const due = Array.from({ length: 9 }, (_, index) => index + 1).filter((count) => shouldOfferPlansAfterLesson(count, check));
    expect(due).toEqual([LESSONS_BETWEEN_PLAN_OFFERS, LESSONS_BETWEEN_PLAN_OFFERS * 2, LESSONS_BETWEEN_PLAN_OFFERS * 3]);
  });

  it("never to a child, a Premium learner, a build that cannot sell, or again within a few hours", () => {
    expect(mayOfferPlans(check)).toBe(true);
    expect(mayOfferPlans({ ...check, child: true })).toBe(false);
    expect(mayOfferPlans({ ...check, hasPremium: true })).toBe(false);
    expect(mayOfferPlans({ ...check, canSell: false })).toBe(false);
    expect(mayOfferPlans({ ...check, msSinceLastOffer: MIN_MS_BETWEEN_PLAN_OFFERS - 1 })).toBe(false);
    expect(mayOfferPlans({ ...check, msSinceLastOffer: MIN_MS_BETWEEN_PLAN_OFFERS })).toBe(true);
  });

  it("is never offered in a live build whose store is not set up yet (the tester builds)", () => {
    expect(canSellInStore("live", "android")).toBe(false);
    expect(canSellInStore("disabled", "android")).toBe(false);
  });
});

describe("the plans sheet", () => {
  const base = { visible: true, reason: "lessons" as const, items: SHOP_ITEMS, storePrices: {}, busy: false, mascotVariant: "hijabi", onBuy: jest.fn(), onRestore: jest.fn(), onClose: jest.fn() };

  it("shows both Premium plans with how often they charge, the no-ads plan, renewal terms and the links", async () => {
    await render(<PlanOfferSheet {...base} />);
    expect(screen.getByTestId("plan-offer-buy-membership-yearly")).toHaveTextContent("$49.99/YR");
    expect(screen.getByTestId("plan-offer-buy-membership-monthly")).toHaveTextContent("$6.99/MO");
    expect(screen.getByTestId("plan-offer-buy-no-ads-monthly")).toHaveTextContent("$2.99/MO");
    expect(screen.getByText("Renews automatically. Cancel anytime in store settings.")).toBeTruthy();
    expect(screen.getByTestId("plan-offer-restore")).toBeTruthy();
    expect(screen.getByTestId("plan-offer-terms")).toBeTruthy();
    expect(screen.getByTestId("plan-offer-privacy")).toBeTruthy();
  });

  it("closes from the X and from NO THANKS", async () => {
    const onClose = jest.fn();
    await render(<PlanOfferSheet {...base} onClose={onClose} />);
    await press("plan-offer-close");
    await press("plan-offer-no-thanks");
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it("asks a grown-up before any real money", async () => {
    const onBuy = jest.fn();
    await render(<PlanOfferSheet {...base} onBuy={onBuy} />);
    await press("plan-offer-buy-membership-yearly");
    expect(onBuy).not.toHaveBeenCalled();
    expect(screen.getByTestId("grownup-check")).toBeTruthy();
    await passGrownUp();
    expect(onBuy).toHaveBeenCalledWith(expect.objectContaining({ id: "membership-yearly" }));
  });
});

describe("the plans when hearts run out", () => {
  it("opens first, and NO THANKS brings up the hearts sheet with the videos", async () => {
    await runOutOfHearts();
    expect(screen.getByTestId("plan-offer-sheet")).toBeTruthy();
    expect(screen.getByTestId("plan-offer-line")).toHaveTextContent("Never run out of hearts!");
    expect(Number(getStoredItem(OFFER_AT_KEY))).toBeGreaterThan(0);

    await press("plan-offer-no-thanks");
    expect(screen.getByTestId("refill-tomorrow")).toBeTruthy();
    expect(screen.getByTestId("refill-video")).toBeTruthy();

    // UNLIMITED HEARTS on that sheet opens the plans again.
    await press("refill-plans");
    expect(screen.getByTestId("plan-offer-line")).toHaveTextContent("Never run out of hearts!");
  });

  it("buying Premium carries the lesson on with unlimited hearts", async () => {
    purchaseShopItem.mockResolvedValue({ ok: true, itemId: "membership-yearly", transactionId: "t1", premium: { active: true, productId: "membership_yearly" } });
    await runOutOfHearts();
    await press("plan-offer-buy-membership-yearly");
    await passGrownUp();
    expect(purchaseShopItem).toHaveBeenCalledWith(expect.objectContaining({ id: "membership-yearly" }));
    expect(screen.getByTestId("exercise-view")).toBeTruthy();
    expect(savedUser().hearts.unlimited).toBe(true);
  });

  it("waits a few hours before opening by itself again", async () => {
    setStoredItem(OFFER_AT_KEY, String(Date.now() - 60_000));
    await runOutOfHearts();
    expect(screen.queryByTestId("plan-offer-sheet")).toBeNull();
    expect(screen.getByTestId("refill-tomorrow")).toBeTruthy();
    expect(screen.getByTestId("refill-plans")).toBeTruthy();
  });

  it("never opens for a child, and the hearts sheet offers no plans", async () => {
    setStoredItem("sira-path-age-group", "6-9");
    await runOutOfHearts();
    expect(screen.queryByTestId("plan-offer-sheet")).toBeNull();
    expect(screen.getByTestId("refill-tomorrow")).toBeTruthy();
    expect(screen.queryByTestId("refill-plans")).toBeNull();
  });
});

describe("the plans after a few lessons", () => {
  const sectionLessons = (topicId: string, count: number) =>
    COURSE.sections.find((section) => section.topicId === topicId)!.nodes.flatMap((node) => node.lessonIds).slice(0, count);
  const finished = [...sectionLessons("foundation", 3), ...sectionLessons("quran_tafseer", 2)];

  /** One MY LESSONS run, every answer right, to its complete screen. */
  async function practiceRun(user: UserProfile, run: number) {
    const pool = createLessonPracticeSession(user, run)!.lesson.challenges;
    await press("tab-practice");
    await press("practice-lessons");
    const onScreen = (challenge: Challenge) => challenge.choices.every((choice) => screen.queryByTestId(`choice-${choice.id}`));
    const shown = () =>
      pool.find((challenge) => onScreen(challenge) && screen.queryAllByText(challenge.prompt).length > 0) ??
      pool.find((challenge) => onScreen(challenge) && screen.queryAllByText(challenge.prompt.slice(0, 40).split(/[^A-Za-z0-9 ,.?!]/)[0].trim(), { exact: false }).length > 0)!;
    for (let step = 0; step < 30 && !screen.queryByTestId("lesson-complete"); step += 1) {
      await press(`choice-${shown().correctChoiceId}`);
      await press("exercise-check");
      await press("feedback-continue");
    }
    expect(await screen.findByTestId("lesson-complete")).toBeTruthy();
  }

  it("open after the third finished lesson, as the learner leaves its complete screen", async () => {
    const user = makeUser({ completedLessonIds: finished, hearts: hearts(5) });
    setStoredItem(PROFILE_KEY, JSON.stringify(user));
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");

    for (let run = 0; run < LESSONS_BETWEEN_PLAN_OFFERS; run += 1) {
      await practiceRun(user, run);
      expect(screen.queryByTestId("plan-offer-sheet")).toBeNull();
      // Back to the path (NEXT LESSON would start a lesson from the path, not another practice run).
      await press(screen.queryByTestId("complete-back") ? "complete-back" : "complete-continue");
      if (run < LESSONS_BETWEEN_PLAN_OFFERS - 1) expect(screen.queryByTestId("plan-offer-sheet")).toBeNull();
    }

    expect(screen.getByTestId("plan-offer-sheet")).toBeTruthy();
    expect(screen.getByTestId("plan-offer-line")).toHaveTextContent("Learn with no limits!");
    // The plans took that lesson's break: no break ad on top of them.
    expect(monetizationClient.showLessonBreakAd).toHaveBeenCalledTimes(1);
    await press("plan-offer-no-thanks");
    // The sheet slides away (or is gone): no longer taking taps.
    expect(screen.queryByTestId("plan-offer-sheet")?.props.pointerEvents ?? "none").toBe("none");
  });
});
