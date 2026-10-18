import type { PremiumStatus, PurchaseResult, RewardedAdResult, ShopItem } from "../types";
import { getStoredItem, setStoredItem } from "./appStorage";
import { monetizationMode, type MonetizationMode } from "./monetizationConfig";

const SANDBOX_PREMIUM_KEY = "sira-path-sandbox-premium";

export interface RestoreResult {
  ok: boolean;
  premium?: PremiumStatus;
  message?: string;
}

export interface MonetizationClient {
  mode: MonetizationMode;
  // Starts the store and ad SDKs. Pass the signed-in account id so purchases follow the learner across devices.
  initialize(appUserId?: string): Promise<void>;
  // null means the store could not be asked, so local premium state should be left alone.
  getPremiumStatus(): Promise<PremiumStatus | null>;
  // Localized store prices keyed by shop item id, e.g. { "membership-monthly": "£8.99" }.
  getStorePrices(items: ShopItem[]): Promise<Record<string, string>>;
  purchaseShopItem(item: ShopItem): Promise<PurchaseResult>;
  restorePurchases(): Promise<RestoreResult>;
  showRewardedHeartAd(item: ShopItem): Promise<RewardedAdResult>;
  showLessonBreakAd(): Promise<boolean>;
}

export function disabledPurchase(item: ShopItem, message: string): PurchaseResult {
  return { ok: false, itemId: item.id, transactionId: `disabled_${item.id}`, message };
}

export function disabledAd(item: ShopItem, message: string): RewardedAdResult {
  return { ok: false, heartsGranted: item.heartsGranted ?? 0, transactionId: `disabled_${item.id}`, message };
}

export function isSubscriptionItem(item: ShopItem) {
  return item.type === "monthly_membership" || item.type === "yearly_membership";
}

// Simulated store used in development and on web, where there is no App Store or Google Play.
// A simulated membership is saved like a real store receipt, so it survives a reload.
export function createSandboxClient(mode: MonetizationMode): MonetizationClient {
  let premium: PremiumStatus | undefined;

  function loadPremium(): PremiumStatus {
    if (!premium) {
      try {
        premium = JSON.parse(getStoredItem(SANDBOX_PREMIUM_KEY) ?? "null") ?? { active: false };
      } catch {
        premium = { active: false };
      }
    }

    return premium as PremiumStatus;
  }

  return {
    mode,
    async initialize() {},
    async getPremiumStatus() {
      return mode === "sandbox" ? loadPremium() : null;
    },
    async getStorePrices() {
      return {};
    },
    async purchaseShopItem(item) {
      if (mode !== "sandbox") {
        return disabledPurchase(item, "Purchases are available in the iPhone and Android apps.");
      }

      if (isSubscriptionItem(item)) {
        premium = { active: true, productId: item.productId ?? item.id, willRenew: true };
        setStoredItem(SANDBOX_PREMIUM_KEY, JSON.stringify(premium));
      }

      return {
        ok: true,
        itemId: item.id,
        transactionId: `sandbox_${item.productId ?? item.id}_${Date.now()}`,
        premium: isSubscriptionItem(item) ? loadPremium() : undefined
      };
    },
    async restorePurchases() {
      if (mode !== "sandbox") {
        return { ok: false, message: "Restore purchases from the iPhone or Android app you bought on." };
      }

      return { ok: true, premium: loadPremium() };
    },
    async showRewardedHeartAd(item) {
      if (mode !== "sandbox") {
        return disabledAd(item, "Sponsor breaks are available in the iPhone and Android apps.");
      }

      return { ok: true, heartsGranted: item.heartsGranted ?? 1, transactionId: `sandbox_ad_${Date.now()}` };
    },
    async showLessonBreakAd() {
      return false;
    }
  };
}
