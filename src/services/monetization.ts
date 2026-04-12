import type { PurchaseResult, RewardedAdResult, ShopItem } from "../types";

export interface MonetizationClient {
  showRewardedHeartAd(item: ShopItem): Promise<RewardedAdResult>;
  purchaseShopItem(item: ShopItem): Promise<PurchaseResult>;
}

export const monetizationProductIds = {
  heartPackSmall: "heart_pack_small",
  membershipMonthly: "membership_monthly"
};

export const adUnitIds = {
  rewardedHeart: "rewarded_heart_test",
  banner: "banner_test"
};

export const sandboxMonetizationClient: MonetizationClient = {
  async showRewardedHeartAd(item) {
    return {
      ok: true,
      heartsGranted: item.heartsGranted ?? 1,
      transactionId: `ad_${Date.now()}`
    };
  },
  async purchaseShopItem(item) {
    return {
      ok: true,
      itemId: item.id,
      transactionId: `purchase_${item.productId ?? item.id}_${Date.now()}`
    };
  }
};
