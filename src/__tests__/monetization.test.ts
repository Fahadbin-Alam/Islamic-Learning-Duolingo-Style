import { applyPremiumStatus, applyShopItem, canSpendGems, isPremiumUser } from "../api/islamicLearningApi";
import { SHOP_ITEMS } from "../data/course";
import { createSandboxClient } from "../services/monetizationShared";
import { isRealAdUnitId, resolveMode, shouldShowLessonBreakAd } from "../services/monetizationConfig";
import { makeUser } from "./testUtils";

const today = () => new Date().toISOString().slice(0, 10);
const shopItem = (id: string) => {
  const item = SHOP_ITEMS.find((candidate) => candidate.id === id);
  if (!item) {
    throw new Error(`Missing shop item ${id}`);
  }
  return item;
};
const hearts = (current: number, unlimited = false) => ({ current, max: 5, unlimited, lastRefillDate: today() });

describe("spending gems on a heart refill", () => {
  const refill = shopItem("gem-heart-refill");

  it("refills every heart and takes the gems", () => {
    const user = makeUser({ gems: 400, hearts: hearts(1) });

    const next = applyShopItem(user, refill);

    expect(next.hearts.current).toBe(5);
    expect(next.gems).toBe(400 - refill.price);
  });

  it("does nothing without enough gems", () => {
    const user = makeUser({ gems: refill.price - 1, hearts: hearts(0) });

    expect(canSpendGems(user, refill)).toBe(false);
    expect(applyShopItem(user, refill)).toBe(user);
  });

  it("does not charge when hearts are already full", () => {
    const user = makeUser({ gems: 1000, hearts: hearts(5) });

    expect(canSpendGems(user, refill)).toBe(false);
    expect(applyShopItem(user, refill).gems).toBe(1000);
  });
});

describe("buying a gem chest", () => {
  it("adds the gems it promises", () => {
    const chest = shopItem("gem-pack-medium");
    const user = makeUser({ gems: 10 });

    expect(applyShopItem(user, chest).gems).toBe(10 + (chest.gemsGranted ?? 0));
  });
});

describe("applyPremiumStatus", () => {
  it("turns on premium when the store says the plan is active", () => {
    const user = makeUser({ hearts: hearts(2) });

    const next = applyPremiumStatus(user, { active: true, productId: "membership_yearly" });

    expect(isPremiumUser(next)).toBe(true);
    expect(next.activeSubscriptionId).toBe("membership_yearly");
    expect(next.hearts).toMatchObject({ current: 5, unlimited: true });
  });

  it("removes premium and unlimited hearts once the plan lapses", () => {
    const user = makeUser({ activeSubscriptionId: "membership_monthly", hearts: hearts(5, true) });

    const next = applyPremiumStatus(user, { active: false });

    expect(isPremiumUser(next)).toBe(false);
    expect(next.hearts.unlimited).toBe(false);
    expect(next.hearts.current).toBe(5);
  });

  it("leaves a free learner untouched", () => {
    const user = makeUser({ hearts: hearts(3) });

    expect(applyPremiumStatus(user, { active: false })).toBe(user);
  });
});

describe("monetization config", () => {
  it("defaults to the simulated store in development and to off in release builds", () => {
    expect(resolveMode(undefined, true)).toBe("sandbox");
    expect(resolveMode(undefined, false)).toBe("disabled");
    expect(resolveMode(" LIVE ", false)).toBe("live");
  });

  it("only accepts real AdMob unit ids, never Google's sample ones", () => {
    expect(isRealAdUnitId("ca-app-pub-1234567890123456/1234567890")).toBe(true);
    expect(isRealAdUnitId("ca-app-pub-3940256099942544/5224354917")).toBe(false);
    expect(isRealAdUnitId("rewarded_heart_test")).toBe(false);
  });

  it("shows a break ad every third finished lesson for free learners only", () => {
    expect([1, 2, 3, 4, 5, 6].map((count) => shouldShowLessonBreakAd(count, false))).toEqual([false, false, true, false, false, true]);
    expect(shouldShowLessonBreakAd(3, true)).toBe(false);
  });
});

describe("sandbox store", () => {
  it("simulates a subscription purchase and restore in development", async () => {
    const client = createSandboxClient("sandbox");

    const purchase = await client.purchaseShopItem(shopItem("membership-monthly"));
    const restored = await client.restorePurchases();

    expect(purchase.ok).toBe(true);
    expect(purchase.premium?.active).toBe(true);
    expect(restored.premium?.active).toBe(true);
    expect(await client.getPremiumStatus()).toMatchObject({ active: true });
  });

  it("refuses purchases and reports no store state when monetization is off", async () => {
    const client = createSandboxClient("disabled");

    expect((await client.purchaseShopItem(shopItem("heart-pack-small"))).ok).toBe(false);
    expect((await client.showRewardedHeartAd(shopItem("watch-ad-heart"))).ok).toBe(false);
    expect(await client.getPremiumStatus()).toBeNull();
  });
});
