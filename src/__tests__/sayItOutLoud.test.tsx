jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);
jest.mock("expo-speech", () => ({
  getAvailableVoicesAsync: jest.fn(async () => [{ identifier: "ar-voice", language: "ar-SA", name: "Arabic", quality: "Default" }]),
  speak: jest.fn(),
  stop: jest.fn(() => Promise.resolve())
}));
jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));
jest.mock("../services/ayahPlayer", () => ({
  ...jest.requireActual("../services/ayahPlayer"),
  playAyah: jest.fn(),
  stopAyah: jest.fn()
}));
jest.mock("../services/sourceLink", () => ({
  ...jest.requireActual("../services/sourceLink"),
  openSource: jest.fn()
}));
jest.mock("../services/monetization", () => ({
  monetizationClient: {
    initialize: jest.fn(async () => undefined),
    getPremiumStatus: jest.fn(async () => null),
    getStorePrices: jest.fn(async () => ({})),
    showLessonBreakAd: jest.fn(async () => undefined),
    setAdAudience: jest.fn(),
    showRewardedAd: jest.fn(async () => ({ ok: false })),
    purchaseShopItem: jest.fn(async () => ({ ok: false, cancelled: true })),
    restorePurchases: jest.fn(async () => ({}))
  }
}));
jest.mock("../components/AdBanner", () => ({ AdBanner: () => null }));
jest.mock("../services/islamicNotifications", () => ({
  requestIslamicNotificationPermission: jest.fn(async () => false),
  scheduleIslamicReminderChecks: jest.fn(() => () => undefined)
}));

import React from "react";
import { StyleSheet } from "react-native";
import * as Speech from "expo-speech";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import TopicApp from "../TopicApp";
import { SAY_WORDS, sayBeats, sayTranslit } from "../data/sayWords";
import { resetArabicVoiceForTests } from "../services/arabicVoice";
import { playAyah } from "../services/ayahPlayer";
import { getStoredItem, removeStoredItem, setStoredItem } from "../services/appStorage";
import { markWordSaid, resetSaidWordsForTests, saidWordIds } from "../services/saidWords";
import { openSource, sourceUrl } from "../services/sourceLink";
import { getCatalog } from "../translations";
import { BEAT_MS, SayItSheet } from "../ui/screens/SayItSheet";
import { makeUser } from "./testUtils";

const ARABIC = /[؀-ۿ]/;
const LATIN = /[A-Za-z]/;

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

async function wait(ms: number) {
  await act(async () => {
    jest.advanceTimersByTime(ms);
  });
}

/** Each step of the count and each beat is its own timer, set once the step before it has shown. */
async function waitSteps(steps: number, ms: number) {
  for (let step = 0; step < steps; step += 1) await wait(ms);
}

const lit = () => screen.queryAllByTestId("say-beat-lit").length;
const progress = () => screen.getByTestId("say-progress");

describe("say it out loud: the words", () => {
  it("gives every word its Arabic, its beats, a meaning, when to say it and a sahih source", () => {
    expect(SAY_WORDS.length).toBeGreaterThanOrEqual(15);
    expect(new Set(SAY_WORDS.map((word) => word.id)).size).toBe(SAY_WORDS.length);
    for (const word of SAY_WORDS) {
      expect(word.arabic).toMatch(ARABIC);
      expect(word.arabic).not.toMatch(LATIN);
      expect(word.syllables).toMatch(LATIN);
      expect(word.syllables).not.toMatch(ARABIC);
      expect(word.meaning.length).toBeGreaterThan(3);
      expect(word.when).toMatch(/[.!]$/);
      // The beats read back as the plain transliteration, with no empty beat.
      const beats = sayBeats(word);
      expect(beats.flat().every((beat) => beat.length > 0)).toBe(true);
      expect(beats.map((part) => part.join("")).join(" ")).toBe(sayTranslit(word));
      expect(sayTranslit(word)).not.toContain("·");
      // Sunnah.com hadith graded sahih or hasan, or the Quran on Quran.com.
      const { source } = word;
      if (source.grade === "Quran") {
        expect(source.url).toMatch(/^https:\/\/quran\.com\/\d+\/\d+(-\d+)?$/);
        expect(source.reference).toMatch(/^Quran \d+:\d+(-\d+)?$/);
      } else {
        expect(source.url).toMatch(/^https:\/\/sunnah\.com\/[a-z]+:\d+[a-z]?$/);
        expect(source.grade).toMatch(/^(Sahih|Hasan)/);
        // A hadith opens at the words that say it.
        expect(sourceUrl(source)).toContain(":~:text=");
      }
    }
    expect(sayTranslit(SAY_WORDS.find((word) => word.id === "bismillah")!)).toBe("Bismillah");
    expect(sayBeats(SAY_WORDS.find((word) => word.id === "bismillah")!)).toEqual([["Bis", "mil", "lah"]]);
  });

  it("is translated in every language", () => {
    const shown = ["Say it out loud", "Say each word out loud with the teacher. Just practice, no score!", "When to say it", "Say it with me", "I said it!", "Bismillah, Alhamdulillah, In sha Allah and more"];
    for (const language of ["bn", "ur", "ar"] as const) {
      const catalog = getCatalog(language);
      const missing = [...shown, ...SAY_WORDS.flatMap((word) => [word.meaning, word.when])].filter((text) => !catalog[text]);
      expect({ language, missing }).toEqual({ language, missing: [] });
    }
  });

  it("keeps the words said on this phone, once each", () => {
    resetSaidWordsForTests();
    expect(saidWordIds()).toEqual([]);
    expect(markWordSaid("bismillah")).toBe(true);
    expect(markWordSaid("bismillah")).toBe(false);
    expect(saidWordIds()).toEqual(["bismillah"]);
    expect(JSON.parse(getStoredItem("sira-path-said-words") ?? "[]")).toEqual(["bismillah"]);
    resetSaidWordsForTests();
  });
});

describe("say it out loud: the sheet", () => {
  beforeEach(() => {
    resetSaidWordsForTests();
    resetArabicVoiceForTests();
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it("counts 3, 2, 1, lights each beat, and I said it! ticks the word and moves on", async () => {
    jest.useFakeTimers();
    await render(<SayItSheet visible onClose={jest.fn()} />);
    const first = SAY_WORDS[0];
    const beats = sayBeats(first).flat().length;
    expect(progress()).toHaveTextContent(`Word 1 of ${SAY_WORDS.length}`);
    expect(screen.getByTestId("say-said-count")).toHaveTextContent("0 said out loud");
    expect(screen.getByTestId("say-arabic")).toHaveTextContent(first.arabic);
    expect(screen.getByTestId("say-meaning")).toHaveTextContent(first.meaning);
    expect(screen.getByTestId("say-when")).toHaveTextContent(first.when);
    expect(lit()).toBe(0);

    await press("say-along");
    expect(screen.getByTestId("say-count")).toHaveTextContent("3");
    await wait(650);
    expect(screen.getByTestId("say-count")).toHaveTextContent("2");
    await wait(650);
    expect(screen.getByTestId("say-count")).toHaveTextContent("1");
    await wait(650);
    expect(screen.queryByTestId("say-count")).toBeNull();
    // One beat after another, then the whole word is lit.
    expect(lit()).toBe(1);
    await wait(BEAT_MS);
    expect(lit()).toBe(2);
    await waitSteps(beats, BEAT_MS);
    expect(lit()).toBe(beats);
    expect(screen.queryByTestId("say-along")).toBeNull();

    // Nothing is scored: I said it! only ticks the word off.
    await press("say-said");
    expect(screen.getByTestId("say-said-count")).toHaveTextContent("1 said out loud");
    expect(saidWordIds()).toEqual([first.id]);
    expect(screen.getByLabelText(`${sayTranslit(first)}, said`)).toBeTruthy();
    await wait(1200);
    expect(progress()).toHaveTextContent(`Word 2 of ${SAY_WORDS.length}`);
    expect(screen.getByTestId("say-arabic")).toHaveTextContent(SAY_WORDS[1].arabic);
    expect(lit()).toBe(0);
    screen.unmount();
  });

  it("says it again, and stops the count when the learner moves to another word", async () => {
    jest.useFakeTimers();
    await render(<SayItSheet visible onClose={jest.fn()} />);
    await press("say-along");
    await waitSteps(3, 650);
    await waitSteps(sayBeats(SAY_WORDS[0]).flat().length, BEAT_MS);
    await press("say-again");
    expect(screen.getByTestId("say-count")).toHaveTextContent("3");
    await press("say-next");
    expect(progress()).toHaveTextContent(`Word 2 of ${SAY_WORDS.length}`);
    expect(screen.queryByTestId("say-count")).toBeNull();
    await waitSteps(10, 650);
    expect(lit()).toBe(0);
    expect(screen.getByTestId("say-along")).toBeTruthy();
    screen.unmount();
  });

  it("steps through the words with the arrows and the chips, all the way round", async () => {
    await render(<SayItSheet visible onClose={jest.fn()} />);
    await press("say-prev");
    expect(progress()).toHaveTextContent(`Word ${SAY_WORDS.length} of ${SAY_WORDS.length}`);
    await press("say-next");
    expect(progress()).toHaveTextContent(`Word 1 of ${SAY_WORDS.length}`);
    const amin = SAY_WORDS.findIndex((word) => word.id === "amin");
    await press("say-word-amin");
    expect(progress()).toHaveTextContent(`Word ${amin + 1} of ${SAY_WORDS.length}`);
    expect(screen.getByTestId("say-arabic")).toHaveTextContent("آمِينَ");
    expect(screen.getByTestId("say-source")).toHaveTextContent("Sahih al-Bukhari 780");
    await press("say-source");
    expect(openSource).toHaveBeenCalledWith(SAY_WORDS[amin].source);
  });

  it("plays the reciter for the Quran's own words and the phone's Arabic voice for the rest", async () => {
    await render(<SayItSheet visible onClose={jest.fn()} />);
    await act(async () => undefined);
    // Inna lillahi wa inna ilayhi raji'un is in the ayah it cites (2:156): the reciter says it.
    await press("say-word-inna-lillahi");
    await press("say-listen");
    expect(playAyah).toHaveBeenCalledWith(expect.stringMatching(/^https:\/\//), { once: true });
    expect(Speech.speak).not.toHaveBeenCalled();
    // Bismillah before eating is from a hadith: the Arabic voice says it.
    await press("say-word-bismillah");
    await press("say-listen");
    expect(Speech.speak).toHaveBeenCalledWith("بِسْمِ اللَّهِ", expect.objectContaining({ language: "ar", voice: "ar-voice" }));
    expect(playAyah).toHaveBeenCalledTimes(1);
  });

  it("keeps the beats reading left to right in Urdu and Arabic", async () => {
    await render(<SayItSheet visible onClose={jest.fn()} />);
    expect(StyleSheet.flatten(screen.getByTestId("say-beats").props.style).direction).toBe("ltr");
  });

  it("leaves out Listen when the learner's sound is off, and still says along", async () => {
    await render(<SayItSheet visible onClose={jest.fn()} soundOn={false} />);
    await act(async () => undefined);
    expect(screen.queryByTestId("say-listen")).toBeNull();
    expect(screen.getByTestId("say-along")).toBeTruthy();
  });

  it("closes with the close button", async () => {
    const onClose = jest.fn();
    await render(<SayItSheet visible onClose={onClose} />);
    await press("say-close");
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe("say it out loud in the app", () => {
  const PROFILE_KEY = "sira-path-user-profile";
  afterEach(() => {
    removeStoredItem(PROFILE_KEY);
    resetSaidWordsForTests();
  });

  it("opens from Practice, with the words said before already ticked", async () => {
    setStoredItem(PROFILE_KEY, JSON.stringify(makeUser({ lastTopicId: "foundation" })));
    resetSaidWordsForTests();
    markWordSaid("bismillah");
    await render(<TopicApp />);
    await press("tab-practice");
    await press("practice-say-it");
    expect(screen.getByTestId("say-sheet")).toBeTruthy();
    expect(screen.getByTestId("say-said-count")).toHaveTextContent("1 said out loud");
    expect(screen.getByLabelText("Bismillah, said")).toBeTruthy();
    await press("say-close");
  });
});
