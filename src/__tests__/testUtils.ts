import { SHOP_ITEMS, STARTER_USER } from "../data/course";
import type { ShopItem, UserProfile } from "../types";

// The app no longer sells hearts for gems or gems for money, but ShopView still draws any such item, so its tests add
// the two old ones back to the shop.
export const SHOP_ITEMS_WITH_GEMS: ShopItem[] = [
  ...SHOP_ITEMS,
  {
    id: "gem-heart-refill",
    type: "gem_heart_refill",
    name: "Refill hearts with gems",
    localizedDescription: "Spend the gems you earned on the path to refill every heart.",
    price: 350,
    currencyType: "gems",
    refillsHearts: true
  },
  {
    id: "gem-pack-medium",
    type: "gem_pack",
    name: "Gem chest",
    localizedDescription: "Add 1,200 gems.",
    price: 4.99,
    currencyType: "USD",
    productId: "gem_pack_medium",
    gemsGranted: 1200
  }
];

export function makeUser(overrides: Partial<UserProfile> = {}): UserProfile {
  return {
    ...STARTER_USER,
    hearts: { ...STARTER_USER.hearts },
    // Past the warm-up lessons (they cost no hearts); a test for a brand-new learner passes [] itself.
    completedLessonIds: ["warm-up-1", "warm-up-2", "warm-up-3"],
    completedNodeIds: [],
    ...overrides
  };
}
