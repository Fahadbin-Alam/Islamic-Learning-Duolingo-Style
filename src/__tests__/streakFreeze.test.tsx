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
import { keepStreak, localDateKey, prepareUserForToday, refreshStreak } from "../api/islamicLearningApi";
import { getStoredItem, setStoredItem } from "../services/appStorage";
import {
  MAX_STREAK_FREEZES,
  STREAK_FREEZE_PRICE,
  applyStreakFreezes,
  buyStreakFreeze,
  markFreezeSaveSeen,
  unseenFreezeSave
} from "../services/streakFreeze";
import { ShopView, StreakSheet } from "../ui/screens";
import type { UserProfile } from "../types";
import { makeUser } from "./testUtils";
import { isDailyLink } from "../data/dailyCard";
import { Linking } from "react-native";

const PROFILE_KEY = "sira-path-user-profile";
const day = (date: string) => new Date(`${date}T12:00:00`);
const daysAgo = (count: number) => {
  const now = new Date();
  return localDateKey(new Date(now.getFullYear(), now.getMonth(), now.getDate() - count));
};

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

describe("buying streak freezes", () => {
  it("costs gems and stops at two", () => {
    let user = makeUser({ gems: STREAK_FREEZE_PRICE * 3 });
    user = buyStreakFreeze(user);
    expect(user.streakFreezes).toBe(1);
    expect(user.gems).toBe(STREAK_FREEZE_PRICE * 2);
    user = buyStreakFreeze(buyStreakFreeze(user));
    expect(user.streakFreezes).toBe(MAX_STREAK_FREEZES);
    expect(user.gems).toBe(STREAK_FREEZE_PRICE);
  });

  it("needs enough gems", () => {
    const user = makeUser({ gems: STREAK_FREEZE_PRICE - 1 });
    expect(buyStreakFreeze(user)).toBe(user);
  });
});

describe("spending streak freezes", () => {
  it("covers one missed day so the next lesson adds to the streak", () => {
    const user = makeUser({ streakDays: 9, lastStreakDate: "2026-10-16", streakFreezes: 1 });
    const opened = refreshStreak(user, day("2026-10-18"));
    expect(opened.streakDays).toBe(9);
    expect(opened.streakFreezes).toBe(0);
    expect(opened.lastStreakDate).toBe("2026-10-17");
    expect(opened.frozenDays).toEqual(["2026-10-17"]);
    expect(unseenFreezeSave(opened)).toEqual({ date: "2026-10-18", days: 1, streak: 9 });
    expect(keepStreak(opened, day("2026-10-18")).streakDays).toBe(10);
  });

  it("covers two missed days with two freezes, across a month end", () => {
    const user = makeUser({ streakDays: 4, lastStreakDate: "2026-10-30", streakFreezes: 2 });
    const opened = prepareUserForToday(user, day("2026-11-02"));
    expect(opened.streakDays).toBe(4);
    expect(opened.streakFreezes).toBe(0);
    expect(opened.frozenDays).toEqual(["2026-10-31", "2026-11-01"]);
  });

  it("spends nothing and loses the streak when the freezes are too few", () => {
    const user = makeUser({ streakDays: 4, lastStreakDate: "2026-10-14", streakFreezes: 2 });
    const opened = refreshStreak(user, day("2026-10-18"));
    expect(opened.streakDays).toBe(0);
    expect(opened.streakFreezes).toBe(2);
  });

  it("spends nothing on a day with no miss, or with no streak", () => {
    const kept = makeUser({ streakDays: 4, lastStreakDate: "2026-10-17", streakFreezes: 1 });
    expect(applyStreakFreezes(kept, "2026-10-18")).toBe(kept);
    const none = makeUser({ streakDays: 0, lastStreakDate: "2026-10-10", streakFreezes: 1 });
    expect(applyStreakFreezes(none, "2026-10-18")).toBe(none);
  });

  it("is used when a lesson is finished in an app left open over the missed day", () => {
    const user = makeUser({ streakDays: 3, lastStreakDate: "2026-10-16", streakFreezes: 1 });
    const after = keepStreak(user, day("2026-10-18"));
    expect(after.streakDays).toBe(4);
    expect(after.streakFreezes).toBe(0);
  });

  it("says so only once", () => {
    const opened = refreshStreak(makeUser({ streakDays: 2, lastStreakDate: "2026-10-16", streakFreezes: 1 }), day("2026-10-18"));
    expect(unseenFreezeSave(markFreezeSaveSeen(opened))).toBeUndefined();
  });
});

describe("streak freeze screens", () => {
  it("shows the freezes on the streak sheet and buys one there", async () => {
    const onBuy = jest.fn();
    await render(<StreakSheet visible streakDays={5} freezes={1} gems={200} onBuyFreeze={onBuy} onClose={jest.fn()} />);
    expect(screen.getAllByTestId("streak-freeze-on")).toHaveLength(1);
    expect(screen.getAllByTestId("streak-freeze-off")).toHaveLength(1);
    await press("streak-buy-freeze");
    expect(onBuy).toHaveBeenCalledTimes(1);
  });

  it("says how many gems are missing instead of buying", async () => {
    const onBuy = jest.fn();
    await render(<StreakSheet visible streakDays={5} freezes={0} gems={20} onBuyFreeze={onBuy} onClose={jest.fn()} />);
    await press("streak-buy-freeze");
    expect(onBuy).not.toHaveBeenCalled();
    expect(screen.getByTestId("streak-freeze-line")).toHaveTextContent("Need 30 more");
  });

  it("hides the buy button once both slots are full", async () => {
    await render(<StreakSheet visible streakDays={5} freezes={2} gems={500} onBuyFreeze={jest.fn()} onClose={jest.fn()} />);
    expect(screen.queryByTestId("streak-buy-freeze")).toBeNull();
    expect(screen.getAllByTestId("streak-freeze-on")).toHaveLength(2);
  });

  it("sells freezes in the shop", async () => {
    const onBuy = jest.fn();
    await render(
      <ShopView
        user={makeUser({ gems: 100 })}
        strings={{} as never}
        items={[]}
        storePrices={{}}
        busy={false}
        section={{ mascot: "muslim_man", accentColor: "#21B573" } as never}
        onUseItem={jest.fn()}
        onRestore={jest.fn()}
        canBuyWithMoney={false}
        canWatchAds={false}
        onBuyStreakFreeze={onBuy}
      />
    );
    expect(screen.getByTestId("shop-streak-freeze-line")).toHaveTextContent("0 of 2 streak freezes");
    await press("shop-buy-streak-freeze");
    expect(onBuy).toHaveBeenCalledTimes(1);
  });
});

describe("the home-screen widget's link", () => {
  it("is known as the daily card link, and nothing else is", () => {
    expect(isDailyLink("muslimo://daily")).toBe(true);
    expect(isDailyLink("muslimo:///daily?from=widget")).toBe(true);
    expect(isDailyLink("muslimo://dailyx")).toBe(false);
    expect(isDailyLink("https://example.com/daily")).toBe(false);
    expect(isDailyLink(null)).toBe(false);
  });
});

describe("streak freezes in the app", () => {
  function seed(user: UserProfile) {
    setStoredItem(PROFILE_KEY, JSON.stringify(user));
  }
  const saved = () => JSON.parse(getStoredItem(PROFILE_KEY) ?? "{}") as UserProfile;

  it("buys a freeze from the flame and keeps it after a reload", async () => {
    seed(makeUser({ gems: 120 }));
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    await press("top-bar-streak");
    await press("streak-buy-freeze");
    expect(screen.getAllByTestId("streak-freeze-on")).toHaveLength(1);
    expect(screen.getByTestId("top-bar-gems")).toHaveTextContent(String(120 - STREAK_FREEZE_PRICE));
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    });
    expect(saved().streakFreezes).toBe(1);
  });

  it("tells the learner a freeze saved their streak", async () => {
    // Waits for the first-launch language question to close.
    seed(makeUser({ streakDays: 6, lastStreakDate: daysAgo(2), streakFreezes: 1, preferredLanguage: "en" }));
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    expect(await screen.findByText("Streak saved!")).toBeTruthy();
    expect(screen.getByText("A streak freeze kept your 6 day streak.")).toBeTruthy();
    expect(screen.getByTestId("top-bar-streak")).toHaveTextContent("6");
  });

  it("opens today's ayah and hadith when the widget opens the app", async () => {
    const initial = jest.spyOn(Linking, "getInitialURL").mockResolvedValue("muslimo://daily");
    seed(makeUser({ preferredLanguage: "en" }));
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    expect(await screen.findByTestId("daily-ayah")).toBeTruthy();
    expect(screen.queryByTestId("top-bar-daily-new")).toBeNull();
    initial.mockRestore();
  });
});
