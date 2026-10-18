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
  type MonetizationClient
} from "./monetizationShared";
import {
  isRealAdUnitId,
  liveAdUnitIds,
  monetizationMode,
  monetizationProductIds,
  premiumEntitlementId,
  revenueCatApiKey,
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

function premiumFrom(info: CustomerInfo): PremiumStatus {
  const entitlement = info.entitlements.active[premiumEntitlementId];

  if (!entitlement) {
    return { active: false };
  }

  return {
    active: true,
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
  return item.type === "yearly_membership" ? monetizationProductIds.membershipYearly : monetizationProductIds.membershipMonthly;
}

// Google Play subscription ids come back as "productId:basePlanId", so match on the prefix as well.
function matchesProduct(identifier: string, productId: string) {
  return identifier === productId || identifier.startsWith(`${productId}:`);
}

async function findSubscriptionPackage(item: ShopItem): Promise<PurchasesPackage | undefined> {
  const offerings = await Purchases.getOfferings();
  const packages = offerings.current?.availablePackages ?? [];
  const productId = subscriptionProductId(item);
  const packageType = item.type === "yearly_membership" ? PACKAGE_TYPE.ANNUAL : PACKAGE_TYPE.MONTHLY;

  return (
    packages.find((candidate) => matchesProduct(candidate.product.identifier, productId)) ??
    packages.find((candidate) => candidate.packageType === packageType)
  );
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

  function startAds() {
    if (!adsReady) {
      adsReady = (async () => {
        const ads = loadAdsModule();

        if (!ads || !activeAdUnitIds()) {
          return false;
        }

        try {
          // Ask for consent where the law requires it (EEA, UK) before any ad request is made.
          await ads.AdsConsent.gatherConsent().catch(() => undefined);
          await ads.default().setRequestConfiguration({ maxAdContentRating: ads.MaxAdContentRating.G });
          await ads.default().initialize();
          return true;
        } catch {
          return false;
        }
      })();
    }

    return adsReady;
  }

  function showFullScreenAd(kind: "rewarded" | "interstitial"): Promise<{ shown: boolean; rewarded: boolean }> {
    return new Promise((resolve) => {
      const ads = loadAdsModule();
      const unitId = activeAdUnitIds()?.[kind];

      if (!ads || !unitId) {
        resolve({ shown: false, rewarded: false });
        return;
      }

      const ad = (
        kind === "rewarded" ? ads.RewardedAd.createForAdRequest(unitId) : ads.InterstitialAd.createForAdRequest(unitId)
      ) as unknown as FullScreenAd;
      let rewarded = false;
      let settled = false;
      const unsubscribers: Array<() => void> = [];
      const finish = (shown: boolean) => {
        if (!settled) {
          settled = true;
          clearTimeout(timeout);
          unsubscribers.forEach((unsubscribe) => unsubscribe());
          resolve({ shown, rewarded });
        }
      };
      const timeout = setTimeout(() => finish(false), 12000);
      const loadedEvent = kind === "rewarded" ? ads.RewardedAdEventType.LOADED : ads.AdEventType.LOADED;

      unsubscribers.push(
        ad.addAdEventListener(loadedEvent, () => {
          clearTimeout(timeout);
          ad.show().catch(() => finish(false));
        }),
        ad.addAdEventListener(ads.AdEventType.CLOSED, () => finish(true)),
        ad.addAdEventListener(ads.AdEventType.ERROR, () => finish(false))
      );

      if (kind === "rewarded") {
        unsubscribers.push(
          ad.addAdEventListener(ads.RewardedAdEventType.EARNED_REWARD, () => {
            rewarded = true;
          })
        );
      }

      ad.load();
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

          const result = await Purchases.purchasePackage(found);
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

    async showRewardedHeartAd(item) {
      if (!(await startAds())) {
        return disabledAd(item, "Sponsor breaks are not available right now. Try again later or pick up a heart pack.");
      }

      const result = await showFullScreenAd("rewarded");

      if (!result.shown) {
        return disabledAd(item, "No sponsor break is ready right now. Please try again in a moment.");
      }

      if (!result.rewarded) {
        return disabledAd(item, "Watch the whole sponsor break to earn a heart.");
      }

      return { ok: true, heartsGranted: item.heartsGranted ?? 1, transactionId: `ad_${Date.now()}` };
    },

    async showLessonBreakAd() {
      if (!(await startAds())) {
        return false;
      }

      return (await showFullScreenAd("interstitial")).shown;
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
      showLessonBreakAd: live.showLessonBreakAd,
      async showRewardedHeartAd(item) {
        return loadAdsModule() ? live.showRewardedHeartAd(item) : sandbox.showRewardedHeartAd(item);
      }
    };
  }

  return createLiveClient();
}

export type { MonetizationClient, RestoreResult } from "./monetizationShared";

export const monetizationClient: MonetizationClient = createNativeClient();
