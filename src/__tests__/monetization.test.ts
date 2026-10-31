jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

import { applyPremiumStatus, applyShopItem, canSpendGems, hasPremiumLessons, isPremiumUser, localDateKey } from "../api/islamicLearningApi";
import { removeStoredItem } from "../services/appStorage";
import { createSandboxClient } from "../services/monetizationShared";
import {
  adAudienceFor,
  canSellInStore,
  adSettingsFor,
  isRealAdUnitId,
  MIN_MS_BETWEEN_FULL_SCREEN_ADS,
  planForProduct,
  resolveMode,
  storePlatform,
  rewardedGemVideosLeft,
  shouldShowLessonBreakAd
} from "../services/monetizationConfig";
import { SHOP_ITEMS_WITH_GEMS, makeUser } from "./testUtils";

const today = () => localDateKey();
const shopItem = (id: string) => {
  const item = SHOP_ITEMS_WITH_GEMS.find((candidate) => candidate.id === id);
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

  it("takes the ads away for No ads, but not the heart limit or the premium units", () => {
    const user = makeUser({ hearts: hearts(3) });

    const next = applyPremiumStatus(user, { active: true, plan: "no_ads", productId: "no_ads_yearly" });

    expect(isPremiumUser(next)).toBe(true);
    expect(hasPremiumLessons(next)).toBe(false);
    expect(next.hearts).toMatchObject({ current: 3, unlimited: false });
    expect(applyPremiumStatus(next, { active: true, plan: "no_ads", productId: "no_ads_yearly" })).toBe(next);
  });

  it("reads the plan from a Google product id when the store does not name it", () => {
    const next = applyPremiumStatus(makeUser({ hearts: hearts(3) }), { active: true, productId: "no_ads_monthly:monthly" });

    expect(next.hearts.unlimited).toBe(false);
    expect(hasPremiumLessons(next)).toBe(false);
  });

  it("moves a No ads learner up to Premium, and a lapsed Premium learner down to No ads", () => {
    const noAds = makeUser({ activeSubscriptionId: "no_ads_monthly", hearts: hearts(2) });

    const premium = applyPremiumStatus(noAds, { active: true, plan: "premium", productId: "membership_monthly" });
    expect(hasPremiumLessons(premium)).toBe(true);
    expect(premium.hearts).toMatchObject({ current: 5, unlimited: true });

    const back = applyPremiumStatus(premium, { active: true, plan: "no_ads", productId: "no_ads_monthly" });
    expect(back.activeSubscriptionId).toBe("no_ads_monthly");
    expect(back.hearts.unlimited).toBe(false);
  });

  it("counts an older plan id as Premium, as every plan was before No ads", () => {
    expect(hasPremiumLessons(makeUser({ activeSubscriptionId: "premium_monthly" }))).toBe(true);
    expect(planForProduct("membership_yearly:yearly")).toBe("premium");
    expect(planForProduct("no_ads_yearly")).toBe("no_ads");
    expect(planForProduct(undefined)).toBeUndefined();
  });
});

describe("monetization config", () => {
  it("defaults to the simulated store in development and to off in release builds", () => {
    expect(resolveMode(undefined, true)).toBe("sandbox");
    expect(resolveMode(undefined, false)).toBe("disabled");
    expect(resolveMode(" LIVE ", false)).toBe("live");
  });

  it("sells only when the store can take the payment, while ads can run on their own", () => {
    expect(canSellInStore("sandbox", "android")).toBe(true);
    // No RevenueCat key in this test run: a live build with ads alone hides every paid item.
    expect(canSellInStore("live", "android")).toBe(false);
    expect(canSellInStore("disabled", "ios")).toBe(false);
    expect(storePlatform("ios")).toBe("ios");
    expect(storePlatform("windows")).toBe("web");
  });

  it("only accepts real AdMob unit ids, never Google's sample ones", () => {
    expect(isRealAdUnitId("ca-app-pub-1234567890123456/1234567890")).toBe(true);
    expect(isRealAdUnitId("ca-app-pub-3940256099942544/5224354917")).toBe(false);
    expect(isRealAdUnitId("rewarded_heart_test")).toBe(false);
  });

  it("shows a break ad every other finished lesson for free learners only", () => {
    expect([1, 2, 3, 4, 5, 6].map((count) => shouldShowLessonBreakAd(count, false))).toEqual([false, true, false, true, false, true]);
    expect(shouldShowLessonBreakAd(2, true)).toBe(false);
  });

  it("never shows two full-screen ads close together", () => {
    expect(shouldShowLessonBreakAd(2, false, 10_000)).toBe(false);
    expect(shouldShowLessonBreakAd(2, false, MIN_MS_BETWEEN_FULL_SCREEN_ADS)).toBe(true);
  });

  it("caps gem videos at five a day and starts again the next day", () => {
    expect(rewardedGemVideosLeft(null, "2026-10-21")).toBe(5);
    expect(rewardedGemVideosLeft({ date: "2026-10-21", count: 3 }, "2026-10-21")).toBe(2);
    expect(rewardedGemVideosLeft({ date: "2026-10-21", count: 9 }, "2026-10-21")).toBe(0);
    expect(rewardedGemVideosLeft({ date: "2026-10-20", count: 5 }, "2026-10-21")).toBe(5);
  });
});

describe("ads by age", () => {
  it("treats an unanswered age screen and Kid accounts as a child", () => {
    expect(adAudienceFor(undefined)).toBe("child");
    expect(adAudienceFor("6-9")).toBe("child");
    expect(adAudienceFor("10-12")).toBe("child");
    expect(adAudienceFor("18+", true)).toBe("child");
    expect(adAudienceFor("13-17")).toBe("teen");
    expect(adAudienceFor("18+")).toBe("adult");
  });

  it("asks for child-directed, non-personalised ads for children", () => {
    expect(adSettingsFor("child", "android")).toEqual({
      tagForChildDirectedTreatment: true,
      tagForUnderAgeOfConsent: true,
      requestNonPersonalizedAdsOnly: true
    });
  });

  it("keeps teens under the age of consent and non-personalised", () => {
    expect(adSettingsFor("teen", "android")).toEqual({
      tagForChildDirectedTreatment: false,
      tagForUnderAgeOfConsent: true,
      requestNonPersonalizedAdsOnly: true
    });
  });

  it("lets adults on Android follow their consent, but keeps iOS non-personalised without ATT", () => {
    expect(adSettingsFor("adult", "android").requestNonPersonalizedAdsOnly).toBe(false);
    expect(adSettingsFor("adult", "ios").requestNonPersonalizedAdsOnly).toBe(true);
    expect(adSettingsFor("adult", "ios").tagForChildDirectedTreatment).toBe(false);
  });
});

describe("sandbox store", () => {
  beforeEach(() => removeStoredItem("sira-path-sandbox-premium"));

  it("simulates a subscription purchase and restore in development", async () => {
    const client = createSandboxClient("sandbox");

    const purchase = await client.purchaseShopItem(shopItem("membership-monthly"));
    const restored = await client.restorePurchases();

    expect(purchase.ok).toBe(true);
    expect(purchase.premium?.active).toBe(true);
    expect(restored.premium?.active).toBe(true);
    expect(await client.getPremiumStatus()).toMatchObject({ active: true });
  });

  it("simulates the No ads plan as its own plan", async () => {
    const purchase = await createSandboxClient("sandbox").purchaseShopItem(shopItem("no-ads-yearly"));

    expect(purchase.premium).toMatchObject({ active: true, plan: "no_ads", productId: "no_ads_yearly" });
  });

  it("keeps a simulated membership after the app reloads", async () => {
    expect(await createSandboxClient("sandbox").getPremiumStatus()).toMatchObject({ active: false });
    await createSandboxClient("sandbox").purchaseShopItem(shopItem("membership-yearly"));

    expect(await createSandboxClient("sandbox").getPremiumStatus()).toMatchObject({ active: true });
  });

  it("pays gems for a gem video and a heart for a heart video", async () => {
    const client = createSandboxClient("sandbox");

    expect(await client.showRewardedAd(shopItem("watch-ad-gems"))).toMatchObject({ ok: true, gemsGranted: 20, heartsGranted: 0 });
    expect(await client.showRewardedAd(shopItem("watch-ad-heart"))).toMatchObject({ ok: true, gemsGranted: 0, heartsGranted: 1 });
  });

  it("refuses purchases and reports no store state when monetization is off", async () => {
    const client = createSandboxClient("disabled");

    expect((await client.purchaseShopItem(shopItem("heart-pack-small"))).ok).toBe(false);
    expect((await client.showRewardedAd(shopItem("watch-ad-heart"))).ok).toBe(false);
    expect(await client.getPremiumStatus()).toBeNull();
  });
});
