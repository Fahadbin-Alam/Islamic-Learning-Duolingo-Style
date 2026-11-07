import { Platform } from "react-native";
import Purchases, {
  PACKAGE_TYPE,
  PRODUCT_CATEGORY,
  type CustomerInfo,
  type PurchasesPackage,
  type PurchasesStoreProduct
} from "react-native-purchases";

import type { PremiumStatus, ShopItem } from "../types";
import {
  createSandboxClient,
  disabledAd,
  disabledPurchase,
  isSubscriptionItem,
  rewardFor,
  type MonetizationClient
} from "./monetizationShared";
import {
  adSettingsFor,
  isRealAdUnitId,
  liveAdUnitIds,
  monetizationMode,
  monetizationProductIds,
  noAdsEntitlementId,
  planForProduct,
  premiumEntitlementId,
  revenueCatApiKey,
  type AdAudience,
  type AdUnitIds,
  type StorePlatform
} from "./monetizationConfig";

declare const __DEV__: boolean | undefined;

type AdsModule = typeof import("react-native-google-mobile-ads");
type FullScreenAd = {
  load(): void;
  show(): Promise<void>;
  addAdEventListener(type: string, listener: () => void): () => void;
};
type FullScreenKind = "rewarded" | "interstitial";

const platform: StorePlatform = Platform.OS === "ios" ? "ios" : "android";

// The ads SDK is a native module that Expo Go does not ship, so it is loaded lazily and treated as optional.
let adsModule: AdsModule | null | undefined;

export function loadAdsModule(): AdsModule | null {
  if (adsModule === undefined) {
    try {
      adsModule = require("react-native-google-mobile-ads") as AdsModule;
    } catch {
      adsModule = null;
    }
  }

  return adsModule;
}

// The banner waits on this, so it is never asked for before the age screen, the consent form and the
// child-safe request settings (rating G, child-directed) are in place. It resolves once, true when ads can run.
let markAdsStarted: (ready: boolean) => void = () => undefined;
const adsStarted = new Promise<boolean>((resolve) => {
  markAdsStarted = resolve;
});

export function whenAdsStarted() {
  return adsStarted;
}

// Until the age screen is answered every ad is requested as if a child were watching.
let adAudience: AdAudience = "child";

export function currentAdAudience() {
  return adAudience;
}

// The app does not ask for App Tracking Transparency, so iOS only ever requests non-personalised ads.
// On Android an adult's ads follow Google's consent form (EEA/UK) and the device's ad settings; children and teens
// only ever get non-personalised ones.
export function adRequestOptions() {
  return { requestNonPersonalizedAdsOnly: adSettingsFor(adAudience, platform).requestNonPersonalizedAdsOnly };
}

// Google's test units are always used in development builds so real ad accounts are never put at risk.
export function activeAdUnitIds(): AdUnitIds | null {
  const ads = loadAdsModule();

  if (!ads || monetizationMode === "disabled") {
    return null;
  }

  if (monetizationMode === "sandbox" || (typeof __DEV__ !== "undefined" && __DEV__)) {
    return { banner: ads.TestIds.ADAPTIVE_BANNER, rewarded: ads.TestIds.REWARDED, interstitial: ads.TestIds.INTERSTITIAL };
  }

  const live = liveAdUnitIds(platform);

  return {
    banner: isRealAdUnitId(live.banner) ? live.banner : "",
    rewarded: isRealAdUnitId(live.rewarded) ? live.rewarded : "",
    interstitial: isRealAdUnitId(live.interstitial) ? live.interstitial : ""
  };
}

// Premium wins over "No ads": Premium products give both entitlements in RevenueCat, and a learner moving
// up from "No ads" can hold both for a moment.
function premiumFrom(info: CustomerInfo): PremiumStatus {
  const premium = info.entitlements.active[premiumEntitlementId];
  const entitlement = premium ?? info.entitlements.active[noAdsEntitlementId];

  if (!entitlement) {
    return { active: false };
  }

  return {
    active: true,
    plan: premium ? "premium" : "no_ads",
    productId: entitlement.productIdentifier,
    expiresAt: entitlement.expirationDate,
    willRenew: entitlement.willRenew
  };
}

function consumableProductId(item: ShopItem) {
  if (item.type === "heart_pack") {
    return item.productId ?? monetizationProductIds.heartPackSmall;
  }

  if (item.type === "gem_pack") {
    return item.productId ?? monetizationProductIds.gemPackMedium;
  }

  return "";
}

function subscriptionProductId(item: ShopItem) {
  const yearly = item.type === "yearly_membership";
  if (planForProduct(item.productId) === "no_ads") {
    return yearly ? monetizationProductIds.noAdsYearly : monetizationProductIds.noAdsMonthly;
  }
  return yearly ? monetizationProductIds.membershipYearly : monetizationProductIds.membershipMonthly;
}

// Google Play subscription ids come back as "productId:basePlanId", so match on the prefix as well.
function matchesProduct(identifier: string, productId: string) {
  return identifier === productId || identifier.startsWith(`${productId}:`);
}

// Both plans may sit in one offering or in two, so every offering is searched by product id. Only Premium
// falls back to "the current offering's Monthly or Annual package", as before "No ads" existed: with two
// plans that fallback could sell the wrong one.
async function findSubscriptionPackage(item: ShopItem): Promise<PurchasesPackage | undefined> {
  const offerings = await Purchases.getOfferings();
  const current = offerings.current?.availablePackages ?? [];
  const everyPackage = [...current, ...Object.values(offerings.all ?? {}).flatMap((offering) => offering.availablePackages)];
  const productId = subscriptionProductId(item);
  const packageType = item.type === "yearly_membership" ? PACKAGE_TYPE.ANNUAL : PACKAGE_TYPE.MONTHLY;
  const byProduct = everyPackage.find((candidate) => matchesProduct(candidate.product.identifier, productId));

  if (byProduct || planForProduct(productId) === "no_ads") {
    return byProduct;
  }

  return current.find((candidate) => candidate.packageType === packageType && planForProduct(candidate.product.identifier) !== "no_ads");
}

async function findConsumable(item: ShopItem): Promise<PurchasesStoreProduct | undefined> {
  const productId = consumableProductId(item);
  const products = await Purchases.getProducts([productId], PRODUCT_CATEGORY.NON_SUBSCRIPTION);
  return products.find((product) => product.identifier === productId);
}

function isCancelled(error: unknown) {
  return Boolean(error && typeof error === "object" && "userCancelled" in error && (error as { userCancelled?: boolean }).userCancelled);
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "The store could not finish this purchase. Please try again.";
}

function createLiveClient(): MonetizationClient {
  const apiKey = revenueCatApiKey(platform);
  let storeReady = false;
  let adsReady: Promise<boolean> | null = null;
  // One interstitial and one rewarded video are kept loaded, so a break never makes the learner wait
  // and a "watch" tap plays at once. Most of an ads-first app's money is lost to ads that were not ready.
  const slots: Record<FullScreenKind, { ad: FullScreenAd; loaded: boolean; showing: boolean; stop: Array<() => void> } | null> = {
    rewarded: null,
    interstitial: null
  };
  const retryTimers: Partial<Record<FullScreenKind, ReturnType<typeof setTimeout>>> = {};

  async function applyAudience() {
    const ads = loadAdsModule();

    if (!ads) {
      return;
    }

    const settings = adSettingsFor(adAudience, platform);
    await ads.default().setRequestConfiguration({
      maxAdContentRating: ads.MaxAdContentRating.G,
      tagForChildDirectedTreatment: settings.tagForChildDirectedTreatment,
      tagForUnderAgeOfConsent: settings.tagForUnderAgeOfConsent
    });
  }

  function startAds() {
    if (!adsReady) {
      adsReady = (async () => {
        const ads = loadAdsModule();

        if (!ads || !activeAdUnitIds()) {
          return false;
        }

        try {
          // Ask for consent where the law requires it (EEA, UK, some US states) before any ad request is made.
          // Under the age of consent the form is skipped and only limited, non-personalised ads are served.
          await ads.AdsConsent.gatherConsent({ tagForUnderAgeOfConsent: adSettingsFor(adAudience, platform).tagForUnderAgeOfConsent }).catch(() => undefined);
          await applyAudience();
          await ads.default().initialize();
          preload("interstitial");
          preload("rewarded");
          return true;
        } catch {
          return false;
        }
      })();
      void adsReady.then(markAdsStarted);
    }

    return adsReady;
  }

  function drop(kind: FullScreenKind) {
    slots[kind]?.stop.forEach((unsubscribe) => unsubscribe());
    slots[kind] = null;
  }

  function preload(kind: FullScreenKind) {
    const ads = loadAdsModule();
    const unitId = activeAdUnitIds()?.[kind];

    if (slots[kind] || !ads || !unitId) {
      return;
    }

    clearTimeout(retryTimers[kind]);
    const ad = (
      kind === "rewarded" ? ads.RewardedAd.createForAdRequest(unitId, adRequestOptions()) : ads.InterstitialAd.createForAdRequest(unitId, adRequestOptions())
    ) as unknown as FullScreenAd;
    const slot = { ad, loaded: false, showing: false, stop: [] as Array<() => void> };
    slots[kind] = slot;
    slot.stop.push(
      ad.addAdEventListener(kind === "rewarded" ? ads.RewardedAdEventType.LOADED : ads.AdEventType.LOADED, () => {
        slot.loaded = true;
      }),
      ad.addAdEventListener(ads.AdEventType.ERROR, () => {
        if (slots[kind] === slot && !slot.showing) {
          // No fill or no network: try again in a minute instead of hammering the ad server.
          drop(kind);
          retryTimers[kind] = setTimeout(() => preload(kind), 60_000);
        }
      })
    );
    ad.load();
  }

  function waitForLoad(kind: FullScreenKind, ms: number) {
    return new Promise<boolean>((resolve) => {
      const started = Date.now();
      const check = () => {
        const slot = slots[kind];
        if (slot?.loaded) resolve(true);
        else if (!slot || Date.now() - started >= ms) resolve(false);
        else setTimeout(check, 250);
      };
      check();
    });
  }

  // Shows the ready ad of this kind and loads the next one as soon as it closes.
  // waitMs: how long a learner who asked for the video waits for one still loading. A break ad never waits.
  async function showFullScreenAd(kind: FullScreenKind, waitMs: number): Promise<{ shown: boolean; rewarded: boolean }> {
    const ads = loadAdsModule();
    preload(kind);

    if (!ads || !(await waitForLoad(kind, waitMs))) {
      return { shown: false, rewarded: false };
    }

    const slot = slots[kind];

    if (!slot) {
      return { shown: false, rewarded: false };
    }

    slot.showing = true;

    return new Promise((resolve) => {
      let rewarded = false;
      let settled = false;
      const finish = (shown: boolean) => {
        if (!settled) {
          settled = true;
          if (slots[kind] === slot) drop(kind);
          preload(kind);
          resolve({ shown, rewarded });
        }
      };

      slot.stop.push(
        slot.ad.addAdEventListener(ads.AdEventType.CLOSED, () => finish(true)),
        slot.ad.addAdEventListener(ads.AdEventType.ERROR, () => finish(false))
      );

      if (kind === "rewarded") {
        slot.stop.push(
          slot.ad.addAdEventListener(ads.RewardedAdEventType.EARNED_REWARD, () => {
            rewarded = true;
          })
        );
      }

      slot.ad.show().catch(() => finish(false));
    });
  }

  return {
    mode: monetizationMode,

    async initialize(appUserId) {
      void startAds();

      if (!apiKey) {
        return;
      }

      try {
        if (!storeReady) {
          Purchases.configure({ apiKey, appUserID: appUserId ?? null });
          storeReady = true;
        } else if (appUserId) {
          await Purchases.logIn(appUserId);
        }
      } catch {
        storeReady = false;
      }
    },

    async getPremiumStatus() {
      if (!storeReady) {
        return null;
      }

      try {
        return premiumFrom(await Purchases.getCustomerInfo());
      } catch {
        return null;
      }
    },

    async getStorePrices(items) {
      if (!storeReady) {
        return {};
      }

      const prices: Record<string, string> = {};

      await Promise.all(
        items.map(async (item) => {
          try {
            if (isSubscriptionItem(item)) {
              const found = await findSubscriptionPackage(item);
              if (found) prices[item.id] = found.product.priceString;
            } else if (consumableProductId(item)) {
              const found = await findConsumable(item);
              if (found) prices[item.id] = found.priceString;
            }
          } catch {
            // Fall back to the price written in the shop catalog.
          }
        })
      );

      return prices;
    },

    async purchaseShopItem(item) {
      if (!storeReady) {
        return disabledPurchase(item, "The store is not connected in this build yet. Add the RevenueCat API keys before selling.");
      }

      try {
        if (isSubscriptionItem(item)) {
          const found = await findSubscriptionPackage(item);

          if (!found) {
            return disabledPurchase(item, "This plan is not available in the store yet.");
          }

          // Google Play keeps two subscriptions side by side unless it is told to swap one for the other, so a
          // learner moving between plans on Android replaces the old one. App Store does this by itself when
          // both plans are in one subscription group.
          const current = platform === "android" ? premiumFrom(await Purchases.getCustomerInfo()) : undefined;
          const oldProductIdentifier = current?.active ? current.productId?.split(":")[0] : undefined;
          const changeInfo =
            oldProductIdentifier && !matchesProduct(found.product.identifier, oldProductIdentifier) ? { oldProductIdentifier } : null;
          const result = await Purchases.purchasePackage(found, null, changeInfo);
          const premium = premiumFrom(result.customerInfo);
          return { ok: premium.active, itemId: item.id, transactionId: result.transaction?.transactionIdentifier ?? `sub_${Date.now()}`, premium };
        }

        const product = await findConsumable(item);

        if (!product) {
          return disabledPurchase(item, "This item is not available in the store yet.");
        }

        const result = await Purchases.purchaseStoreProduct(product);
        return { ok: true, itemId: item.id, transactionId: result.transaction?.transactionIdentifier ?? `iap_${Date.now()}` };
      } catch (error) {
        if (isCancelled(error)) {
          return { ok: false, cancelled: true, itemId: item.id, transactionId: `cancelled_${item.id}` };
        }

        return disabledPurchase(item, errorMessage(error));
      }
    },

    async restorePurchases() {
      if (!storeReady) {
        return { ok: false, message: "The store is not connected in this build yet." };
      }

      try {
        const premium = premiumFrom(await Purchases.restorePurchases());
        return {
          ok: true,
          premium,
          message: premium.active ? undefined : "No active premium plan was found for this store account."
        };
      } catch (error) {
        return { ok: false, message: errorMessage(error) };
      }
    },

    setAdAudience(audience) {
      if (audience === adAudience) {
        return;
      }

      adAudience = audience;

      // Ads already loaded were asked for with the old settings, so they are thrown away and loaded again.
      if (adsReady) {
        void adsReady.then(async (ready) => {
          if (!ready) return;
          await applyAudience().catch(() => undefined);
          (["interstitial", "rewarded"] as const).forEach((kind) => {
            if (!slots[kind]?.showing) {
              drop(kind);
              preload(kind);
            }
          });
        });
      }
    },

    async showRewardedAd(item) {
      if (!(await startAds())) {
        return disabledAd(item, "Sponsor breaks are not available right now. Try again later.");
      }

      const result = await showFullScreenAd("rewarded", 8000);

      if (!result.shown) {
        return disabledAd(item, "No sponsor break is ready right now. Please try again in a moment.");
      }

      if (!result.rewarded) {
        return disabledAd(item, "Watch the whole sponsor break to earn the reward.");
      }

      return rewardFor(item, `ad_${Date.now()}`);
    },

    async showLessonBreakAd() {
      if (!(await startAds())) {
        return false;
      }

      return (await showFullScreenAd("interstitial", 0)).shown;
    }
  };
}

function createNativeClient(): MonetizationClient {
  if (monetizationMode === "disabled") {
    return createSandboxClient("disabled");
  }

  // Without RevenueCat keys a development build keeps the simulated store but still shows Google's test ads.
  if (monetizationMode === "sandbox" && !revenueCatApiKey(platform)) {
    const sandbox = createSandboxClient("sandbox");
    const live = createLiveClient();
    return {
      ...sandbox,
      initialize: live.initialize,
      setAdAudience: live.setAdAudience,
      showLessonBreakAd: live.showLessonBreakAd,
      async showRewardedAd(item) {
        return loadAdsModule() ? live.showRewardedAd(item) : sandbox.showRewardedAd(item);
      }
    };
  }

  return createLiveClient();
}

export type { MonetizationClient, RestoreResult } from "./monetizationShared";

export const monetizationClient: MonetizationClient = createNativeClient();
