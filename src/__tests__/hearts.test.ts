import { applyShopItem, grantHearts, loseHeart, refillHeartsForToday } from "../api/islamicLearningApi";
import { SHOP_ITEMS } from "../data/course";
import { makeUser } from "./testUtils";

const today = () => new Date().toISOString().slice(0, 10);
const shopItem = (id: string) => {
  const item = SHOP_ITEMS.find((candidate) => candidate.id === id);
  if (!item) {
    throw new Error(`Missing shop item ${id}`);
  }
  return item;
};

describe("loseHeart", () => {
  it("takes one heart away", () => {
    const user = makeUser({ hearts: { current: 3, max: 5, unlimited: false, lastRefillDate: today() } });

    expect(loseHeart(user).hearts.current).toBe(2);
  });

  it("never goes below zero", () => {
    const user = makeUser({ hearts: { current: 0, max: 5, unlimited: false, lastRefillDate: today() } });

    expect(loseHeart(user).hearts.current).toBe(0);
  });

  it("does nothing for members with unlimited hearts", () => {
    const user = makeUser({ hearts: { current: 5, max: 5, unlimited: true, lastRefillDate: today() } });

    expect(loseHeart(user)).toBe(user);
  });
});

describe("grantHearts", () => {
  const user = makeUser({ hearts: { current: 4, max: 5, unlimited: false, lastRefillDate: today() } });

  it("can stack hearts above the max", () => {
    expect(grantHearts(user, 5).hearts.current).toBe(9);
  });

  it("caps at the max when asked to", () => {
    expect(grantHearts(user, 5, true).hearts.current).toBe(5);
  });
});

describe("refillHeartsForToday", () => {
  it("refills to max on a new day", () => {
    const user = makeUser({ hearts: { current: 1, max: 5, unlimited: false, lastRefillDate: "2000-01-01" } });
    const next = refillHeartsForToday(user);

    expect(next.hearts.current).toBe(5);
    expect(next.hearts.lastRefillDate).toBe(today());
  });

  it("does not refill twice on the same day", () => {
    const user = makeUser({ hearts: { current: 1, max: 5, unlimited: false, lastRefillDate: today() } });

    expect(refillHeartsForToday(user)).toBe(user);
  });
});

describe("applyShopItem", () => {
  it("gives unlimited hearts for a membership", () => {
    const user = makeUser({ hearts: { current: 1, max: 5, unlimited: false, lastRefillDate: today() } });
    const next = applyShopItem(user, shopItem("membership-monthly"));

    expect(next.hearts).toMatchObject({ current: 5, unlimited: true });
    expect(next.activeSubscriptionId).toBeTruthy();
  });

  it("adds the pack's hearts for a heart pack", () => {
    const user = makeUser({ hearts: { current: 2, max: 5, unlimited: false, lastRefillDate: today() } });
    const pack = shopItem("heart-pack-small");

    expect(applyShopItem(user, pack).hearts.current).toBe(2 + (pack.heartsGranted ?? 0));
  });

  it("leaves the user unchanged for a rewarded ad item", () => {
    const user = makeUser();

    expect(applyShopItem(user, shopItem("watch-ad-heart"))).toBe(user);
  });
});
