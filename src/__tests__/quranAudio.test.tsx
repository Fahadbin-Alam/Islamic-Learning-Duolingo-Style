import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { QURAN_AYAHS } from "../data/quranAyahs";
import { DEEP_UNITS } from "../data/deepUnits";
import { AYAH_LOAD_TIMEOUT_MS, getAyahPlayback, resetAyahPlayerForTests } from "../services/ayahPlayer";
import { SURAH_AYAH_COUNTS, globalAyahNumber, parseQuranReference, quranAudioUrl } from "../services/quranAudio";
import { LearnCard } from "../ui/lesson";

type Listener = (status: { playing: boolean; didJustFinish: boolean }) => void;
const mockPlayers: Array<{ source: string; loop: boolean; play: jest.Mock; pause: jest.Mock; replace: jest.Mock; seekTo: jest.Mock; emit: Listener }> = [];

jest.mock("expo-audio", () => ({
  setAudioModeAsync: jest.fn(() => Promise.resolve()),
  createAudioPlayer: jest.fn((source: string) => {
    let listener: Listener = () => undefined;
    const player = {
      source,
      loop: false,
      play: jest.fn(),
      pause: jest.fn(),
      replace: jest.fn((next: string) => {
        player.source = next;
      }),
      seekTo: jest.fn(() => Promise.resolve()),
      addListener: jest.fn((_event: string, next: Listener) => {
        listener = next;
        return { remove: jest.fn() };
      }),
      emit: (status: { playing: boolean; didJustFinish: boolean }) => listener(status)
    };
    mockPlayers.push(player);
    return player;
  })
}));

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

const FATIHAH_2 = "https://cdn.islamic.network/quran/audio/128/ar.alafasy/2.mp3";
const card = (reference: string, text = QURAN_AYAHS["1:2"]) => (
  <LearnCard title="Al-Hamd" line="All praise is for Allah." quote={{ text, reference }} mascotVariant="girl" accent="#1CB66D" onContinue={jest.fn()} />
);

beforeEach(() => {
  resetAyahPlayerForTests();
  mockPlayers.length = 0;
});

describe("ayah numbers", () => {
  test("the surah table has 114 surahs and 6236 ayahs", () => {
    expect(SURAH_AYAH_COUNTS).toHaveLength(114);
    expect(SURAH_AYAH_COUNTS.reduce((sum, count) => sum + count, 0)).toBe(6236);
  });

  test("counts through the whole Quran", () => {
    expect(globalAyahNumber({ surah: 1, ayah: 1 })).toBe(1);
    expect(globalAyahNumber({ surah: 2, ayah: 1 })).toBe(8);
    expect(globalAyahNumber({ surah: 2, ayah: 255 })).toBe(262);
    expect(globalAyahNumber({ surah: 67, ayah: 1 })).toBe(5242);
    expect(globalAyahNumber({ surah: 114, ayah: 6 })).toBe(6236);
  });

  test("only a single, real ayah gets audio", () => {
    expect(parseQuranReference("Quran 67:2")).toEqual({ surah: 67, ayah: 2 });
    expect(quranAudioUrl("Quran 1:2")).toBe(FATIHAH_2);
    expect(quranAudioUrl("Quran 6:84-86")).toBeNull();
    expect(quranAudioUrl("Quran 1:8")).toBeNull();
    expect(quranAudioUrl("Quran 115:1")).toBeNull();
    expect(quranAudioUrl("Sahih al-Bukhari 4474")).toBeNull();
    expect(quranAudioUrl(undefined)).toBeNull();
  });

  test("every Arabic ayah in the surah deep units has a recitation", () => {
    const quotes = DEEP_UNITS.flatMap((unit) => unit.lessons.map((lesson) => lesson.quote)).filter(
      (quote): quote is { text: string; reference: string } => Boolean(quote?.reference?.startsWith("Quran"))
    );
    expect(quotes.length).toBeGreaterThan(10);
    quotes.forEach((quote) => expect(quranAudioUrl(quote.reference)).toMatch(/\/\d+\.mp3$/));
  });
});

describe("Listen on an ayah card", () => {
  test("shows Listen and the reciter under an ayah, and nothing under a hadith", async () => {
    const { unmount } = await render(card("Quran 1:2"));
    expect(screen.getByTestId("ayah-listen")).toBeTruthy();
    expect(screen.getByText("Recited by Mishary Alafasy")).toBeTruthy();
    await unmount();
    await render(card("Sahih al-Bukhari 4474", "The Prophet ﷺ said: I will teach you the greatest surah."));
    expect(screen.queryByTestId("ayah-listen")).toBeNull();
  });

  test("Listen streams the ayah, Stop stops it, and leaving the card stops it", async () => {
    const { unmount } = await render(card("Quran 1:2"));
    await fireEvent.press(screen.getByTestId("ayah-listen-play"));
    expect(mockPlayers).toHaveLength(1);
    expect(mockPlayers[0].source).toBe(FATIHAH_2);
    expect(mockPlayers[0].play).toHaveBeenCalledTimes(1);
    await act(async () => mockPlayers[0].emit({ playing: true, didJustFinish: false }));
    expect(screen.getByText("Stop")).toBeTruthy();
    await fireEvent.press(screen.getByTestId("ayah-listen-play"));
    expect(mockPlayers[0].pause).toHaveBeenCalled();
    expect(screen.getByText("Listen")).toBeTruthy();
    await fireEvent.press(screen.getByTestId("ayah-listen-play"));
    await unmount();
    expect(getAyahPlayback().status).toBe("idle");
  });

  test("Repeat loops the ayah, and tapping the ayah recites it again from the start", async () => {
    await render(card("Quran 1:2"));
    await fireEvent.press(screen.getByTestId("ayah-listen-repeat"));
    await fireEvent.press(screen.getByTestId("learn-quote-ayah"));
    expect(mockPlayers[0].loop).toBe(true);
    await act(async () => mockPlayers[0].emit({ playing: true, didJustFinish: false }));
    await act(async () => mockPlayers[0].emit({ playing: false, didJustFinish: true }));
    expect(getAyahPlayback().status).toBe("playing");
    await fireEvent.press(screen.getByTestId("learn-quote-ayah"));
    expect(mockPlayers[0].seekTo).toHaveBeenCalledWith(0);
    await fireEvent.press(screen.getByTestId("ayah-listen-repeat"));
    expect(mockPlayers[0].loop).toBe(false);
    await act(async () => mockPlayers[0].emit({ playing: false, didJustFinish: true }));
    expect(screen.getByText("Listen")).toBeTruthy();
  });

  test("says so when the recitation cannot load (no internet)", async () => {
    jest.useFakeTimers();
    try {
      await render(card("Quran 1:2"));
      await fireEvent.press(screen.getByTestId("ayah-listen-play"));
      await act(async () => {
        jest.advanceTimersByTime(AYAH_LOAD_TIMEOUT_MS + 10);
      });
      expect(screen.getByTestId("ayah-listen-error")).toBeTruthy();
    } finally {
      jest.useRealTimers();
    }
  });
});
