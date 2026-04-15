import type { PurchaseResult, RewardedAdResult, ShopItem } from "../types";

declare const __DEV__: boolean | undefined;

export interface MonetizationClient {
  showRewardedHeartAd(item: ShopItem): Promise<RewardedAdResult>;
  purchaseShopItem(item: ShopItem): Promise<PurchaseResult>;
}

type MonetizationMode = "disabled" | "sandbox" | "live";

const env = typeof process !== "undefined" ? ((process as { env?: Record<string, string | undefined> }).env ?? {}) : {};

function readEnv(name: string) {
  return env[name]?.trim() ?? "";
}

function normalizeProductId(value: string, fallback: string) {
  return value || fallback;
}

function normalizeAdUnitId(value: string, fallback: string) {
  return value || fallback;
}

function configured(value: string) {
  return Boolean(value) && !value.includes("_test") && !value.startsWith("ADD_");
}

function resolveMode(): MonetizationMode {
  const requestedMode = readEnv("EXPO_PUBLIC_MONETIZATION_MODE").toLowerCase();

  if (requestedMode === "live" || requestedMode === "sandbox" || requestedMode === "disabled") {
    return requestedMode;
  }

  return typeof __DEV__ !== "undefined" && __DEV__ ? "sandbox" : "disabled";
}

export const monetizationProductIds = {
  heartPackSmall: normalizeProductId(readEnv("EXPO_PUBLIC_PLAY_BILLING_HEART_PACK_PRODUCT_ID"), "heart_pack_small"),
  membershipMonthly: normalizeProductId(readEnv("EXPO_PUBLIC_PLAY_BILLING_MONTHLY_PRODUCT_ID"), "membership_monthly"),
  membershipYearly: normalizeProductId(readEnv("EXPO_PUBLIC_PLAY_BILLING_YEARLY_PRODUCT_ID"), "membership_yearly")
};

export const adUnitIds = {
  rewardedHeart: normalizeAdUnitId(readEnv("EXPO_PUBLIC_ADMOB_REWARDED_UNIT_ID"), "rewarded_heart_test"),
  banner: normalizeAdUnitId(readEnv("EXPO_PUBLIC_ADMOB_BANNER_UNIT_ID"), "banner_test")
};

export const monetizationStatus = {
  mode: resolveMode(),
  paymentsConfigured:
    configured(monetizationProductIds.heartPackSmall) &&
    configured(monetizationProductIds.membershipMonthly) &&
    configured(monetizationProductIds.membershipYearly),
  adsConfigured: configured(adUnitIds.rewardedHeart) && configured(adUnitIds.banner)
} as const;

function disabledPurchase(item: ShopItem, message: string): PurchaseResult {
  return {
    ok: false,
    itemId: item.id,
    transactionId: `disabled_${item.id}`,
    message
  };
}

function disabledAd(item: ShopItem, message: string): RewardedAdResult {
  return {
    ok: false,
    heartsGranted: item.heartsGranted ?? 0,
    transactionId: `disabled_${item.id}`,
    message
  };
}

export const monetizationClient: MonetizationClient = {
  async showRewardedHeartAd(item) {
    if (monetizationStatus.mode === "disabled") {
      return disabledAd(item, "Rewarded ads are turned off in this build until Android ad units are connected.");
    }

    if (monetizationStatus.mode === "live" && !monetizationStatus.adsConfigured) {
      return disabledAd(item, "Android ad units are missing. Add real AdMob IDs before enabling rewarded hearts.");
    }

    if (monetizationStatus.mode === "sandbox") {
      return {
        ok: true,
        heartsGranted: item.heartsGranted ?? 1,
        transactionId: `ad_${Date.now()}`
      };
    }

    return disabledAd(item, "Live rewarded ads still need native Android integration.");
  },

  async purchaseShopItem(item) {
    if (monetizationStatus.mode === "disabled") {
      return disabledPurchase(item, "Premium purchases are turned off in this build until Google Play Billing is connected.");
    }

    if (monetizationStatus.mode === "live" && !monetizationStatus.paymentsConfigured) {
      return disabledPurchase(item, "Google Play product IDs are missing. Add the live Android product IDs before selling premium.");
    }

    if (monetizationStatus.mode === "sandbox") {
      return {
        ok: true,
        itemId: item.id,
        transactionId: `purchase_${item.productId ?? item.id}_${Date.now()}`
      };
    }

    return disabledPurchase(item, "Live Google Play Billing still needs native Android purchase integration.");
  }
};
