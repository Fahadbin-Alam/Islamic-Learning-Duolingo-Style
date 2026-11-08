import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { Camel } from "../ui/Camel";
import { Mascot } from "../ui/Mascot";
import { SECRET_GAP_MS, SECRET_TAPS, SecretHadithProvider, pickSecretHadith } from "../ui/secretHadith";
import { DAILY_HADITH } from "../data/dailyCard";
import { HADITH_BASICS_SAYINGS } from "../data/hadithBasics";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

const sheetOpen = () => screen.queryByTestId("secret-hadith") !== null;

async function tap(testID: string, times: number) {
  for (let index = 0; index < times; index += 1) {
    await fireEvent.press(screen.getByTestId(testID));
  }
}

describe("the hidden hadith after 25 taps", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("pops up a sourced hadith on the 25th tap in a row on one picture", async () => {
    await render(
      <SecretHadithProvider>
        <Camel size={64} tappable testID="camel" />
      </SecretHadithProvider>
    );
    await tap("camel", SECRET_TAPS - 1);
    expect(sheetOpen()).toBe(false);
    await tap("camel", 1);
    expect(sheetOpen()).toBe(true);
    const quote = screen.getByTestId("secret-hadith-quote");
    expect(DAILY_HADITH.some((hadith) => String(quote.props.children).includes(hadith.quote))).toBe(true);
    expect(screen.getByTestId("secret-hadith-ref")).toBeTruthy();
  });

  it("starts the count again after another picture or a long pause", async () => {
    await render(
      <SecretHadithProvider>
        <Camel size={64} tappable testID="camel" />
        <Mascot mood="happy" tappable testID="kid" />
      </SecretHadithProvider>
    );
    await tap("camel", SECRET_TAPS - 1);
    await tap("kid", 1);
    await tap("camel", 1);
    expect(sheetOpen()).toBe(false);
    await tap("camel", SECRET_TAPS - 2);
    await act(async () => {
      jest.advanceTimersByTime(SECRET_GAP_MS + 100);
    });
    await tap("camel", 1);
    expect(sheetOpen()).toBe(false);
  });

  it("does nothing off the home path", async () => {
    await render(<Camel size={64} tappable testID="camel" />);
    await tap("camel", SECRET_TAPS);
    expect(sheetOpen()).toBe(false);
  });

  it("never shows the same hadith twice running", () => {
    for (let last = 0; last < DAILY_HADITH.length; last += 1) {
      for (const roll of [0, 0.3, 0.6, 0.999]) {
        const pick = pickSecretHadith(last, () => roll);
        expect(pick).not.toBe(last);
        expect(pick).toBeGreaterThanOrEqual(0);
        expect(pick).toBeLessThan(DAILY_HADITH.length);
      }
    }
  });

  it("only uses hadith that carry a sunnah.com link and reference", () => {
    expect(DAILY_HADITH).toBe(HADITH_BASICS_SAYINGS);
    for (const hadith of DAILY_HADITH) {
      expect(hadith.url).toMatch(/^https:\/\/sunnah\.com\//);
      expect(hadith.reference.length).toBeGreaterThan(0);
    }
  });
});
