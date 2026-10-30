import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { DAILY_AYAHS, DAILY_HADITH, getDailyCard, localDayNumber } from "../data/dailyCard";
import { setActiveLanguage } from "../i18n";
import { getCatalog } from "../translations";
import { AppTopBar } from "../ui/screens";
import { DailySheet } from "../ui/screens/DailySheet";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

const ARABIC = /[؀-ۿ]/;
const BANGLA = /[ঀ-৿]/;

describe("daily ayah and hadith", () => {
  it("has each ayah once, in Arabic with its English, Bangla and Urdu meaning", () => {
    expect(new Set(DAILY_AYAHS.map((ayah) => ayah.ref)).size).toBe(DAILY_AYAHS.length);
    for (const ayah of DAILY_AYAHS) {
      expect(ayah.ref).toMatch(/^\d{1,3}:\d{1,3}$/);
      expect(ayah.ar).toMatch(ARABIC);
      expect(ayah.ar).not.toMatch(/[A-Za-z]/);
      expect(ayah.en).toMatch(/^[^؀-ۿঀ-৿]+[.?]$/);
      expect(ayah.bn).toMatch(BANGLA);
      expect(ayah.ur).toMatch(ARABIC);
    }
  });

  it("only uses hadith that are translated in every language", () => {
    expect(DAILY_HADITH.length).toBeGreaterThanOrEqual(10);
    for (const language of ["bn", "ur", "ar"] as const) {
      const catalog = getCatalog(language);
      const missing = DAILY_HADITH.flatMap((hadith) => [hadith.line, hadith.quote, hadith.reference]).filter((text) => !catalog[text]);
      expect({ language, missing }).toEqual({ language, missing: [] });
    }
    DAILY_HADITH.forEach((hadith) => expect(hadith.url).toMatch(/^https:\/\/sunnah\.com\/\w+:\w+$/));
  });

  it("keeps one pair all day and turns over at local midnight", () => {
    const morning = getDailyCard("en", new Date(2026, 9, 28, 0, 5));
    const night = getDailyCard("en", new Date(2026, 9, 28, 23, 55));
    const tomorrow = getDailyCard("en", new Date(2026, 9, 29, 0, 5));
    expect(night).toEqual(morning);
    expect(tomorrow.day).toBe(morning.day + 1);
    expect(tomorrow.ayah.ref).not.toBe(morning.ayah.ref);
    expect(tomorrow.hadith).not.toBe(morning.hadith);
  });

  it("shows every ayah within a cycle, and no meaning on the Arabic screen", () => {
    const start = new Date(2026, 0, 1, 12);
    const refs = new Set(DAILY_AYAHS.map((_, offset) => getDailyCard("bn", new Date(2026, 0, 1 + offset, 12)).ayah.ref));
    expect(refs.size).toBe(DAILY_AYAHS.length);
    expect(getDailyCard("bn", start).ayah.meaning).toMatch(BANGLA);
    expect(getDailyCard("ar", start).ayah.meaning).toBeUndefined();
    expect(localDayNumber(start)).toBe(localDayNumber(new Date(2026, 0, 1, 23, 59)));
  });
});

describe("DailySheet", () => {
  afterEach(() => setActiveLanguage("en"));

  it("shows the day's ayah and hadith with their sources", async () => {
    const date = new Date(2026, 9, 28, 9);
    const card = getDailyCard("en", date);
    await render(<DailySheet visible onClose={jest.fn()} date={date} />);
    expect(screen.getByTestId("daily-ayah-arabic")).toHaveTextContent(card.ayah.arabic);
    expect(screen.getByTestId("daily-ayah-meaning")).toHaveTextContent(card.ayah.meaning!);
    expect(screen.getByTestId("daily-ayah-ref")).toHaveTextContent(`Quran ${card.ayah.ref}`);
    expect(screen.getByTestId("daily-hadith-line")).toHaveTextContent(card.hadith.line);
    expect(screen.getByTestId("daily-hadith-ref")).toHaveTextContent(card.hadith.reference);
  });

  it("speaks the learner's language", async () => {
    setActiveLanguage("ar");
    const date = new Date(2026, 9, 28, 9);
    const { hadith } = getDailyCard("ar", date);
    await render(<DailySheet visible onClose={jest.fn()} date={date} />);
    expect(screen.queryByTestId("daily-ayah-meaning")).toBeNull();
    expect(screen.getByTestId("daily-hadith-quote")).toHaveTextContent(getCatalog("ar")[hadith.quote]);
    expect(screen.getByText("آية اليوم")).toBeTruthy();
  });
});

describe("AppTopBar daily button", () => {
  const bar = {
    topicId: "prayer",
    topicTitle: "Prayer",
    accent: "#3A9FE8",
    streakDays: 3,
    gems: 120,
    hearts: { current: 4, max: 5, unlimited: false },
    onOpenTopics: jest.fn(),
    onOpenShop: jest.fn()
  };

  it("wears a dot until today's card is opened", async () => {
    const onDailyOpened = jest.fn();
    await render(<AppTopBar {...bar} onDailyOpened={onDailyOpened} />);
    expect(screen.getByTestId("top-bar-daily-new")).toBeTruthy();
    expect(screen.queryByTestId("daily-ayah")).toBeNull();

    await fireEvent.press(screen.getByRole("button", { name: "Today's ayah and hadith. New!" }));
    expect(screen.getByTestId("daily-ayah")).toBeTruthy();
    expect(screen.getByTestId("daily-hadith")).toBeTruthy();

    expect(onDailyOpened).toHaveBeenCalledTimes(1);
  });

  it("shows no dot once today's card was seen", async () => {
    await render(<AppTopBar {...bar} dailySeen />);
    expect(screen.queryByTestId("top-bar-daily-new")).toBeNull();
    expect(screen.getByRole("button", { name: "Today's ayah and hadith" })).toBeTruthy();
  });
});
