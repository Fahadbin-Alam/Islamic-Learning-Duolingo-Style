import { act, fireEvent, screen } from "@testing-library/react-native";
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

/**
 * Scrolls the learn path so a unit is on screen. Far units draw no circles (see LearnPath's MOUNT_MARGIN), and the
 * test renderer never lays anything out, so this gives every unit a made-up place 1000 px apart and scrolls there.
 */
export async function scrollPathTo(topicId: string, unitId: string) {

  const scroll = screen.getByTestId(`learn-path-${topicId}`);
  await fireEvent(scroll, "layout", { nativeEvent: { layout: { x: 0, y: 0, width: 390, height: 800 } } });
  const units = screen.queryAllByTestId(/^path-unit-/);
  let targetY = 0;
  for (const [index, view] of units.entries()) {
    await fireEvent(view, "layout", { nativeEvent: { layout: { x: 0, y: index * 1000, width: 390, height: 1000 } } });
    if (view.props.testID === `path-unit-${unitId}`) targetY = index * 1000;
  }
  await fireEvent(scroll, "scroll", { nativeEvent: { contentOffset: { x: 0, y: targetY }, contentSize: { width: 390, height: units.length * 1000 }, layoutMeasurement: { width: 390, height: 800 } } });
}

/**
 * Leaves the lesson's complete screen as the learner does: its button, then, after the day's first lesson, the
 * streak moment's CONTINUE (src/ui/lesson/StreakMoment.tsx).
 */
export async function leaveComplete(testID: "complete-continue" | "complete-back") {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
  if (screen.queryByTestId("streak-moment")) {
    await act(async () => {
      fireEvent.press(screen.getByTestId("streak-moment-continue"));
    });
  }
}
