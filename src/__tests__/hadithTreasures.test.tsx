import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { HADITH_CARD_PRICE, HADITH_TREASURES, buyHadith, nextHadith, ownedHadith } from "../data/hadithTreasures";
import { SECRET_LESSONS } from "../data/secretLessons";
import { HadithListSheet, ShopView } from "../ui/screens";
import { makeUser } from "./testUtils";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

// The counting numbers animate on timers; render them as plain text here.
jest.mock("../ui/screens/FormattedCount", () => {
  const actual = jest.requireActual("../ui/screens/FormattedCount");
  const { Text } = require("react-native");
  return { ...actual, FormattedCount: ({ value, style }: { value: number; style?: object }) => <Text style={style}>{actual.formatNumber(value)}</Text> };
});

function shop(gems: number, hadith: string[] = [], handlers: { onBuyHadith?: () => void; onOpenHadith?: () => void } = {}) {
  return render(
    <ShopView
      user={makeUser({ gems, ummah: { trophies: 0, best: 0, battles: 0, wins: 0, hadith } })}
      strings={{} as never}
      items={[]}
      storePrices={{}}
      busy={false}
      section={{ mascot: "muslim_man", accentColor: "#21B573" } as never}
      onUseItem={jest.fn()}
      onRestore={jest.fn()}
      canBuyWithMoney={false}
      canWatchAds={false}
      onBuyHadith={handlers.onBuyHadith ?? jest.fn()}
      onOpenHadith={handlers.onOpenHadith ?? jest.fn()}
    />
  );
}

describe("hadith treasures", () => {
  it("are sahih al-Bukhari cards with their own sunnah.com link, none shared with a secret lesson", () => {
    const ids = new Set(HADITH_TREASURES.map((card) => card.id));
    expect(ids.size).toBe(HADITH_TREASURES.length);
    const secretQuotes = new Set(SECRET_LESSONS.map((secret) => secret.quote));
    for (const card of HADITH_TREASURES) {
      const number = card.reference.replace("Sahih al-Bukhari ", "");
      expect(card.source.url).toBe(`https://sunnah.com/bukhari:${number}`);
      expect(card.source.grade).toBe("Sahih");
      expect(card.quote).toMatch(/[.!]$/);
      expect(secretQuotes.has(card.quote)).toBe(false);
    }
  });

  it("gives the next card for its gems, each card once, and nothing when gems are short", () => {
    const first = buyHadith(makeUser({ gems: HADITH_CARD_PRICE * 2 }));
    expect(first.card?.id).toBe(HADITH_TREASURES[0].id);
    expect(first.user.gems).toBe(HADITH_CARD_PRICE);
    const second = buyHadith(first.user);
    expect(second.card?.id).toBe(HADITH_TREASURES[1].id);
    expect(ownedHadith(second.user).map((card) => card.id)).toEqual([HADITH_TREASURES[0].id, HADITH_TREASURES[1].id]);

    const broke = buyHadith(second.user);
    expect(broke.card).toBeUndefined();
    expect(broke.user).toBe(second.user);
  });

  it("stops once every card is owned", () => {
    const all = makeUser({ gems: 999, ummah: { trophies: 0, best: 0, battles: 0, wins: 0, hadith: HADITH_TREASURES.map((card) => card.id) } });
    expect(nextHadith(all)).toBeUndefined();
    expect(buyHadith(all).user).toBe(all);
  });
});

describe("shop hadith rows", () => {
  it("opens the chest when gems are enough", async () => {
    const onBuyHadith = jest.fn();
    await shop(HADITH_CARD_PRICE, [], { onBuyHadith });
    expect(screen.queryByTestId("shop-my-hadith")).toBeNull();
    await fireEvent.press(screen.getByTestId("shop-buy-hadith"));
    expect(onBuyHadith).toHaveBeenCalled();
  });

  it("says how many gems are missing and does not buy", async () => {
    const onBuyHadith = jest.fn();
    await shop(HADITH_CARD_PRICE - 15, [], { onBuyHadith });
    expect(screen.getByTestId("shop-hadith-line").props.children).toBe("Need 15 more");
    await fireEvent.press(screen.getByTestId("shop-buy-hadith"));
    expect(onBuyHadith).not.toHaveBeenCalled();
  });

  it("shows My hadith once a card is owned, and hides the chest when all are owned", async () => {
    const onOpenHadith = jest.fn();
    await shop(500, HADITH_TREASURES.map((card) => card.id), { onOpenHadith });
    expect(screen.queryByTestId("shop-hadith-chest")).toBeNull();
    await fireEvent.press(screen.getByTestId("shop-my-hadith"));
    expect(onOpenHadith).toHaveBeenCalled();
  });

  it("lists owned cards and opens one", async () => {
    const owned = [HADITH_TREASURES[0].id];
    await render(<HadithListSheet visible user={makeUser({ ummah: { trophies: 0, best: 0, battles: 0, wins: 0, hadith: owned } })} onClose={jest.fn()} />);
    expect(screen.getByTestId("hadith-row-locked")).toBeTruthy();
    await fireEvent.press(screen.getByTestId(`hadith-row-${HADITH_TREASURES[0].id}`));
    expect(screen.getByTestId("secret-quote").props.children).toContain(HADITH_TREASURES[0].quote);
  });
});
