jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("expo-speech", () => ({
  getAvailableVoicesAsync: async () => [],
  speak: jest.fn(),
  stop: jest.fn()
}));
import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { ADHKAR, dhikrArabic } from "../data/adhkar";
import { DAILY_AYAHS, getDailyCard } from "../data/dailyCard";
import { QURAN_AYAHS } from "../data/quranAyahs";
import { resetAyahPlayerForTests } from "../services/ayahPlayer";
import { ayahPieces, ayahWordTimes, ayahWordTimesLoadedForTests, resetAyahWordTimesForTests, wordAt } from "../services/ayahWords";
import { quranAudioUrl } from "../services/quranAudio";
import { LearnCard } from "../ui/lesson";
import { fitsRecitation, type RecitedPart } from "../ui/lesson/RecitedAyah";
import { AdhkarSheet, resetAdhkarCountsForTests } from "../ui/screens/AdhkarSheet";
import { DailySheet } from "../ui/screens/DailySheet";

type Status = { playing: boolean; didJustFinish: boolean; isLoaded?: boolean; duration?: number };
type Listener = (status: Status) => void;
const mockPlayers: Array<{ source: string; currentTime: number; loop: boolean; pause: jest.Mock; emit: (status: Status) => void }> = [];

jest.mock("expo-audio", () => ({
  setAudioModeAsync: jest.fn(() => Promise.resolve()),
  createAudioPlayer: jest.fn((source: string) => {
    let listener: Listener = () => undefined;
    const player = {
      source,
      currentTime: 0,
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
      emit: (status: Status) => listener({ isLoaded: true, duration: 6, ...status })
    };
    mockPlayers.push(player);
    return player;
  })
}));

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

const recited = (keys: readonly string[]): RecitedPart[] => keys.map((key) => ({ key, url: quranAudioUrl(`Quran ${key}`) as string }));

describe("word timings", () => {
  test("cover every ayah, starting each word and ending the last", () => {
    expect(Object.keys(require("../data/ayahWordTimes.json"))).toHaveLength(6236);
    // Al-Fatihah 1:1, four words: quran-align's segments 60-610, 620-1310, 1320-2450, 2460-5970 ms.
    expect(ayahWordTimes("1:1")).toEqual([0.06, 0.62, 1.32, 2.46, 5.97]);
    for (const key of ["2:255", "112:1", "114:6"]) {
      const times = ayahWordTimes(key)!;
      expect(times.length).toBeGreaterThan(2);
      times.slice(1).forEach((time, index) => expect(time).toBeGreaterThanOrEqual(times[index]));
    }
    expect(ayahWordTimes("115:1")).toBeUndefined();
  });

  test("fit the app's Quran text word for word for nearly every ayah", () => {
    const keys = Object.keys(QURAN_AYAHS);
    const misfits = keys.filter((key) => !fitsRecitation(QURAN_AYAHS[key], recited([key])));
    // A handful are written as one word in the Madinah mushaf's text and two in the timings' (e.g. 36:22).
    expect(misfits.length).toBeLessThan(keys.length / 100);
    expect(misfits).toContain("36:22");
    expect(misfits).not.toContain("2:72");
  });

  // The Today card and the adhkar show the timing credit without checking, so the timings stay unloaded until Listen.
  test("fit every ayah of the day and every Quran dhikr", () => {
    for (const ayah of DAILY_AYAHS) expect([ayah.ref, fitsRecitation(ayah.ar, recited([ayah.ref]))]).toEqual([ayah.ref, true]);
    const passages = Object.values(ADHKAR)
      .flat()
      .filter((dhikr) => dhikr.ayahs?.length);
    expect(passages.length).toBeGreaterThan(3);
    for (const dhikr of passages) {
      expect([dhikr.id, fitsRecitation(dhikrArabic(dhikr), recited(dhikr.ayahs!))]).toEqual([dhikr.id, true]);
    }
  });

  test("cut the text at its spaces and join back into it exactly", () => {
    const text = QURAN_AYAHS["2:72"];
    const { pieces, words } = ayahPieces(text);
    expect(pieces.map((piece) => piece.text).join("")).toBe(text);
    // Its thin space sits inside one word.
    expect(words).toBe(10);
    expect(ayahPieces("ٱلۡحَمۡدُ  لِلَّهِ").pieces).toEqual([
      { text: "ٱلۡحَمۡدُ", word: 0 },
      { text: "  ", word: -1 },
      { text: "لِلَّهِ", word: 1 }
    ]);
  });

  test("find the word being recited", () => {
    const times = [0.08, 0.97, 1.81, 2.47, 5.14];
    expect(wordAt(times, 0)).toBeUndefined();
    expect(wordAt(times, 0.08)).toBe(0);
    expect(wordAt(times, 0.96)).toBe(0);
    expect(wordAt(times, 0.97)).toBe(1);
    expect(wordAt(times, 2)).toBe(2);
    expect(wordAt(times, 5)).toBe(3);
    expect(wordAt(times, 5.3)).toBe(3);
    expect(wordAt(times, 5.4)).toBeUndefined();
  });
});

describe("an ayah's words light up as it is recited", () => {
  const card = (reference: string, text: string) => (
    <LearnCard title="Al-Hamd" line="All praise is for Allah." quote={{ text, reference }} mascotVariant="girl" accent="#1CB66D" onContinue={jest.fn()} />
  );

  beforeEach(() => {
    jest.useFakeTimers();
    resetAyahPlayerForTests();
    resetAdhkarCountsForTests();
    mockPlayers.length = 0;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const at = async (seconds: number) => {
    mockPlayers[0].currentTime = seconds;
    await act(async () => {
      jest.advanceTimersByTime(130);
    });
  };

  test("follows the reciter word by word, and goes dark when he stops", async () => {
    // Al-Fatihah 1:2, four words starting at 0.08, 0.97, 1.81 and 2.47 s.
    const words = QURAN_AYAHS["1:2"].split(" ");
    expect(words).toHaveLength(4);
    await render(card("Quran 1:2", QURAN_AYAHS["1:2"]));
    expect(screen.getByTestId("ayah-listen-credit")).toHaveTextContent("Recited by Mishary Alafasy · Word timing: quran-align (CC BY 4.0)");
    await fireEvent.press(screen.getByTestId("ayah-listen-play"));
    // Loading: nothing lit yet.
    await at(1);
    expect(screen.queryByTestId("recited-word")).toBeNull();
    await act(async () => mockPlayers[0].emit({ playing: true, didJustFinish: false }));
    await at(0.5);
    expect(screen.getByTestId("recited-word")).toHaveTextContent(words[0]);
    await at(1.2);
    expect(screen.getByTestId("recited-word")).toHaveTextContent(words[1]);
    await at(2);
    expect(screen.getByTestId("recited-word")).toHaveTextContent(words[2]);
    await at(3);
    expect(screen.getByTestId("recited-word")).toHaveTextContent(words[3]);
    expect(screen.getAllByTestId("recited-word")).toHaveLength(1);
    // The whole ayah is still there, word for word.
    expect(screen.getByTestId("learn-quote-text")).toHaveTextContent(QURAN_AYAHS["1:2"]);
    // Repeat starts it again from the top.
    await at(0.3);
    expect(screen.getByTestId("recited-word")).toHaveTextContent(words[0]);
    await fireEvent.press(screen.getByTestId("ayah-listen-play"));
    await at(2);
    expect(screen.queryByTestId("recited-word")).toBeNull();
  });

  /** The passage's text before its word `n` (counted from 0). */
  const upTo = (text: string, n: number) => {
    const { pieces } = ayahPieces(text);
    return pieces
      .slice(0, pieces.findIndex((piece) => piece.word === n))
      .map((piece) => piece.text)
      .join("");
  };
  /** The text before the lit word in the Arabic shown as `testID`; undefined when no word is lit. */
  const beforeLit = (testID: string) => {
    const children = screen.getByTestId(testID).children;
    const lit = children.findIndex((child) => typeof child !== "string" && child.props.testID === "recited-word");
    return lit < 0 ? undefined : children.slice(0, lit).join("");
  };

  test("the ayah of the day shows the credit and loads the timings only when it is recited", async () => {
    resetAyahWordTimesForTests();
    const date = new Date(2026, 9, 28, 9);
    const { ayah } = getDailyCard("en", date);
    await render(<DailySheet visible onClose={jest.fn()} date={date} />);
    expect(screen.getByTestId("ayah-listen-credit")).toHaveTextContent("Recited by Mishary Alafasy · Word timing: quran-align (CC BY 4.0)");
    expect(ayahWordTimesLoadedForTests()).toBe(false);
    await fireEvent.press(screen.getByTestId("ayah-listen-play"));
    expect(ayahWordTimesLoadedForTests()).toBe(false);
    await act(async () => mockPlayers[0].emit({ playing: true, didJustFinish: false }));
    expect(ayahWordTimesLoadedForTests()).toBe(true);
    const times = ayahWordTimes(ayah.ref)!;
    await at((times[1] + times[2]) / 2);
    expect(beforeLit("daily-ayah-arabic")).toBe(upTo(ayah.arabic, 1));
  });

  test("a Quran dhikr lights its words ayah after ayah", async () => {
    const quls = ADHKAR.morning.find((dhikr) => dhikr.id === "quls")!;
    const text = dhikrArabic(quls);
    await render(<AdhkarSheet visible time="morning" onClose={jest.fn()} onFinished={jest.fn()} doneToday={[]} remindersOn={false} onToggleReminders={jest.fn()} />);
    expect(screen.getByTestId("adhkar-timing-quls")).toHaveTextContent("Word timing: quran-align (CC BY 4.0)");
    expect(screen.queryByTestId("adhkar-timing-master-istighfar")).toBeNull();
    await fireEvent.press(screen.getByTestId("adhkar-listen-quls"));
    await act(async () => mockPlayers[0].emit({ playing: true, didJustFinish: false }));
    // 112:1, its third word (0.80 to 1.65 s).
    await at(1);
    expect(beforeLit("adhkar-arabic-quls")).toBe(upTo(text, 2));
    // 112:1 ends and 112:2 plays: the light goes on in its second word (0.99 to 1.85 s), the sixth of the passage.
    await act(async () => mockPlayers[0].emit({ playing: false, didJustFinish: true }));
    expect(mockPlayers[0].source).toBe(quranAudioUrl("Quran 112:2"));
    expect(screen.queryByTestId("recited-word")).toBeNull();
    await act(async () => mockPlayers[0].emit({ playing: true, didJustFinish: false }));
    await at(1.2);
    expect(beforeLit("adhkar-arabic-quls")).toBe(upTo(text, 5));
    expect(screen.getAllByTestId("recited-word")).toHaveLength(1);
  });

  test("an ayah whose timings do not fit its text plays without lights or the credit", async () => {
    await render(card("Quran 36:22", QURAN_AYAHS["36:22"]));
    expect(screen.getByTestId("ayah-listen-credit")).toHaveTextContent("Recited by Mishary Alafasy");
    expect(screen.getByTestId("ayah-listen-credit")).not.toHaveTextContent("quran-align");
    await fireEvent.press(screen.getByTestId("ayah-listen-play"));
    await act(async () => mockPlayers[0].emit({ playing: true, didJustFinish: false }));
    await at(1);
    expect(screen.queryByTestId("recited-word")).toBeNull();
  });
});
