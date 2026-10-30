jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

import { prepareUserForToday, refreshStreak, STREAK_SHIELD_DAYS, streakShieldReady } from "../api/islamicLearningApi";
import { SHOP_ITEMS } from "../data/course";
import { catalogPlanDetails, createSandboxClient, periodInDays } from "../services/monetizationShared";
import { removeStoredItem } from "../services/appStorage";
import { makeUser } from "./testUtils";

const day = (offset: number) => {
  const date = new Date(2026, 9, 30 + offset, 12);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};
const NOW = new Date(2026, 9, 30, 12);

describe("Premium's streak shield", () => {
  const premium = { activeSubscriptionId: "membership_yearly" };

  it("covers one missed day for a Premium learner: the streak waits, and a lesson today carries it on", () => {
    const user = makeUser({ ...premium, streakDays: 12, lastStreakDate: day(-2) });
    const kept = refreshStreak(user, NOW);
    expect(kept.streakDays).toBe(12);
    expect(kept.lastStreakDate).toBe(day(-1));
    expect(kept.streakShieldUsedOn).toBe(day(0));
    expect(prepareUserForToday(user, NOW).streakDays).toBe(12);
  });

  it("is not there for free or No ads learners", () => {
    expect(refreshStreak(makeUser({ streakDays: 12, lastStreakDate: day(-2) }), NOW).streakDays).toBe(0);
    expect(refreshStreak(makeUser({ activeSubscriptionId: "no_ads_monthly", streakDays: 12, lastStreakDate: day(-2) }), NOW).streakDays).toBe(0);
  });

  it("covers only one missed day, and only once a week", () => {
    expect(refreshStreak(makeUser({ ...premium, streakDays: 12, lastStreakDate: day(-3) }), NOW).streakDays).toBe(0);
    const usedRecently = makeUser({ ...premium, streakDays: 12, lastStreakDate: day(-2), streakShieldUsedOn: day(-3) });
    expect(streakShieldReady(usedRecently, NOW)).toBe(false);
    expect(refreshStreak(usedRecently, NOW).streakDays).toBe(0);
    const usedAWeekAgo = { ...usedRecently, streakShieldUsedOn: day(-STREAK_SHIELD_DAYS) };
    expect(refreshStreak(usedAWeekAgo, NOW).streakDays).toBe(12);
  });

  it("leaves a streak that is still going alone", () => {
    const user = makeUser({ ...premium, streakDays: 4, lastStreakDate: day(-1) });
    expect(refreshStreak(user, NOW)).toBe(user);
  });
});

describe("plan details", () => {
  it("turns a store period into days", () => {
    expect(periodInDays("DAY", 3)).toBe(3);
    expect(periodInDays("WEEK", 1)).toBe(7);
    expect(periodInDays("MONTH", 1)).toBe(30);
    expect(periodInDays("UNKNOWN", 1)).toBe(0);
    expect(periodInDays(undefined, undefined)).toBe(0);
  });

  it("the catalog gives Yearly Premium a week free and a price per month, never rounded up", () => {
    const details = catalogPlanDetails(SHOP_ITEMS);
    expect(details["membership-yearly"]).toEqual({ trialDays: 7, perMonth: "$4.16" });
    expect(details["membership-monthly"]).toEqual({ trialDays: undefined, perMonth: undefined });
    expect(details["heart-pack-small"]).toBeUndefined();
  });

  it("the simulated store's trial is used up once a plan is bought", async () => {
    removeStoredItem("sira-path-sandbox-premium");
    const client = createSandboxClient("sandbox");
    expect((await client.getPlanDetails!(SHOP_ITEMS))["membership-yearly"]?.trialDays).toBe(7);
    await client.purchaseShopItem(SHOP_ITEMS.find((item) => item.id === "membership-monthly")!);
    expect(await client.getPlanDetails!(SHOP_ITEMS)).toEqual({});
    removeStoredItem("sira-path-sandbox-premium");
  });
});
