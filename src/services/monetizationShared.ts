import type { PlanDetails, PremiumStatus, PurchaseResult, RewardedAdResult, ShopItem } from "../types";
import { getStoredItem, setStoredItem } from "./appStorage";
import { monetizationMode, planForProduct, type AdAudience, type MonetizationMode } from "./monetizationConfig";

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
  // Per plan id: the free trial the store would give this learner now (none once used), and the price per month.
  getPlanDetails?(items: ShopItem[]): Promise<Record<string, PlanDetails>>;
  purchaseShopItem(item: ShopItem): Promise<PurchaseResult>;
  restorePurchases(): Promise<RestoreResult>;
  // Who is watching decides which ads may be asked for. Call before initialize, and again if it changes.
  setAdAudience(audience: AdAudience): void;
  // A video the learner chose to watch, paying out the item's hearts or gems once it has been watched to the end.
  showRewardedAd(item: ShopItem): Promise<RewardedAdResult>;
  showLessonBreakAd(): Promise<boolean>;
}

export function disabledPurchase(item: ShopItem, message: string): PurchaseResult {
  return { ok: false, itemId: item.id, transactionId: `disabled_${item.id}`, message };
}

export function disabledAd(item: ShopItem, message: string): RewardedAdResult {
  return { ok: false, heartsGranted: 0, gemsGranted: 0, transactionId: `disabled_${item.id}`, message };
}

export function rewardFor(item: ShopItem, transactionId: string): RewardedAdResult {
  // A video with no reward written on it pays one heart, like the original "watch and recover".
  const gemsGranted = item.gemsGranted ?? 0;
  return { ok: true, heartsGranted: item.heartsGranted ?? (gemsGranted ? 0 : 1), gemsGranted, transactionId };
}

export function isSubscriptionItem(item: ShopItem) {
  return item.type === "monthly_membership" || item.type === "yearly_membership";
}

/** A store period (e.g. 1 WEEK) in days, for "7 days free". Unknown units give 0: no trial is promised. */
export function periodInDays(unit: string | undefined, value: number | undefined) {
  const count = Math.max(0, Math.floor(value ?? 0));
  switch ((unit ?? "").toUpperCase()) {
    case "DAY":
      return count;
    case "WEEK":
      return count * 7;
    case "MONTH":
      return count * 30;
    case "YEAR":
      return count * 365;
    default:
      return 0;
  }
}

/** The catalog's own trial and per-month price, for the simulated store (US dollars). */
export function catalogPlanDetails(items: ShopItem[]): Record<string, PlanDetails> {
  const details: Record<string, PlanDetails> = {};
  for (const item of items) {
    if (!isSubscriptionItem(item)) continue;
    details[item.id] = {
      trialDays: item.trialDays,
      perMonth: (item.durationDays ?? 0) >= 365 ? `$${(Math.floor((item.price / 12) * 100) / 100).toFixed(2)}` : undefined
    };
  }
  return details;
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
    async getPlanDetails(items) {
      // A simulated trial is used up once any plan was bought, as in the real stores.
      return mode === "sandbox" && !loadPremium().productId ? catalogPlanDetails(items) : {};
    },
    async purchaseShopItem(item) {
      if (mode !== "sandbox") {
        return disabledPurchase(item, "Purchases are available in the iPhone and Android apps.");
      }

      if (isSubscriptionItem(item)) {
        const productId = item.productId ?? item.id;
        premium = { active: true, plan: planForProduct(productId), productId, willRenew: true };
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
    setAdAudience() {},
    async showRewardedAd(item) {
      if (mode !== "sandbox") {
        return disabledAd(item, "Sponsor breaks are available in the iPhone and Android apps.");
      }

      return rewardFor(item, `sandbox_ad_${Date.now()}`);
    },
    async showLessonBreakAd() {
      return false;
    }
  };
}
