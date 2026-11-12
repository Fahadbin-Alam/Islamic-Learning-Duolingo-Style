// The phone has a teacher's voice, so a wrong answer's sheet would offer "Hear why" if the question let it.
jest.mock("expo-speech", () => ({
  getAvailableVoicesAsync: jest.fn(async () => [{ identifier: "en-voice", language: "en-US", name: "English", quality: "Default" }]),
  speak: jest.fn(),
  stop: jest.fn(() => Promise.resolve())
}));
jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

type Status = { playing: boolean; didJustFinish: boolean; isLoaded?: boolean; duration?: number };
type Listener = (status: Status) => void;
const mockPlayers: Array<{
  source: string;
  currentTime: number;
  play: jest.Mock;
  pause: jest.Mock;
  seekTo: jest.Mock;
  replace: jest.Mock;
  emit: (status: Status) => void;
}> = [];

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

import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { act, fireEvent, render, screen, within } from "@testing-library/react-native";
import { LESSONS_BY_ID, allNodes } from "../data/course";
import { QURAN_AYAHS } from "../data/quranAyahs";
import { arabicLetters } from "../services/arabicVoice";
import { playAyah, resetAyahPlayerForTests, stopAyah } from "../services/ayahPlayer";
import { ayahPieces, ayahWordTimes } from "../services/ayahWords";
import { resetDeviceSettingsForTests, setDeviceSetting } from "../services/deviceSettings";
import { translateStudyText } from "../services/contentLocalization";
import type { Challenge, Lesson } from "../types";
import { isArabicOnly } from "../ui/ArabicText";
import { useAyahPlayback } from "../ui/lesson/AyahListen";
import { ExerciseView, type ExerciseResult } from "../ui/lesson/ExerciseView";
import { buildLessonFlow } from "../ui/lesson/lessonPages";
import { lessonRecap } from "../ui/lesson/lessonRecap";
import { listenWhy } from "../ui/lesson/listenQuestion";
import { questionFormat } from "../ui/lesson/questionFormats";
import {
  firstLessonQuoting,
  nextAyahChallenge,
  reciteChallenge,
  RECITE_NEXT_PROMPT,
  RECITE_PROMPT,
  withReciteQuestion
} from "../ui/lesson/reciteQuestion";

// Fahad: more interactive questions, more like Duolingo, and the Quran's words lighting up as the reciter recites
// (round 6). "How does the ayah end?": the reciter recites the ayah the lesson quoted and stops before its last word,
// and the learner taps how it ends. "Which ayah comes next?": the reciter recites the ayah, the learner taps the one
// after it, and the reciter goes on to it.

const lessonFor = (ayahKey: string) => LESSONS_BY_ID[firstLessonQuoting(ayahKey)!];
const lastWordOf = (text: string) => ayahPieces(text).pieces.filter((piece) => piece.word >= 0).at(-1)!.text;
const rightLabel = (challenge: Challenge) => challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)!.label;
const close = (a: string, b: string) => arabicLetters(a).includes(arabicLetters(b)) || arabicLetters(b).includes(arabicLetters(a));
const wrongLabels = (challenge: Challenge) => challenge.choices.filter((choice) => choice.id !== challenge.correctChoiceId).map((choice) => choice.label);
/** The lessons on the path that quote the ayah in Arabic, as reciteQuestion counts them. */
const lessonsFor = (ayahKey: string) =>
  [...new Set(allNodes.flatMap((node) => node.lessonIds))].filter((id) => {
    const quote = LESSONS_BY_ID[id]?.quote;
    return quote?.reference === `Quran ${ayahKey}` && isArabicOnly(quote.text);
  });

describe("how does the ayah end? (the question)", () => {
  test("asks for the last word of the ayah the lesson quoted, against endings of the same surah", () => {
    const lesson = lessonFor("112:4");
    const challenge = reciteChallenge(lesson)!;
    const ayah = QURAN_AYAHS["112:4"];
    expect(lesson.quote!.text).toBe(ayah);
    expect(challenge.prompt).toBe(RECITE_PROMPT);
    expect(challenge.choices).toHaveLength(3);
    expect(rightLabel(challenge)).toBe(lastWordOf(ayah));
    // Al-Ikhlas's other endings, never 112:1's "ahad", which is the same word.
    const wrong = challenge.choices.filter((choice) => choice.id !== challenge.correctChoiceId).map((choice) => choice.label);
    expect(wrong.sort()).toEqual([lastWordOf(QURAN_AYAHS["112:2"]), lastWordOf(QURAN_AYAHS["112:3"])].sort());
    expect(challenge.listen).toEqual({ ar: ayah, translit: "", recitation: expect.stringContaining("/6225.mp3"), recite: { key: "112:4", gap: ayahPieces(ayah).words - 1 } });
    expect(challenge.source).toMatchObject({ reference: "Quran 112:4", site: "Quran.com", url: expect.stringContaining("quran.com/112/4") });
    // Its why is the ayah itself, finished on screen by the reciter.
    expect(listenWhy(challenge, "en")).toBe("");
  });

  test("looks to the next surah when its own has too few different endings", () => {
    const challenge = reciteChallenge(lessonFor("114:1"))!;
    const right = rightLabel(challenge);
    expect(right).toBe(lastWordOf(QURAN_AYAHS["114:1"]));
    const wrong = challenge.choices.map((choice) => choice.label).filter((label) => label !== right);
    // Not An-Nas's other "an-nas" endings, nor "wa-n-nas".
    for (const label of wrong) expect(close(label, right)).toBe(false);
    expect(wrong).toContain(lastWordOf(QURAN_AYAHS["114:4"]));
  });

  test("is fair everywhere it is asked: three different endings, the right one the ayah's own, heard within 10 s", () => {
    let asked = 0;
    for (const lesson of Object.values(LESSONS_BY_ID)) {
      const challenge = reciteChallenge(lesson);
      if (!challenge) continue;
      asked += 1;
      const { key, gap } = challenge.listen!.recite!;
      const labels = challenge.choices.map((choice) => choice.label);
      expect(rightLabel(challenge)).toBe(lastWordOf(lesson.quote!.text));
      for (const [index, label] of labels.entries()) {
        for (const other of labels.slice(index + 1)) expect([key, label, other, close(label, other)]).toEqual([key, label, other, false]);
        // An Arabic answer is never swapped for a translation.
        for (const language of ["bn", "ur", "ar"] as const) expect(translateStudyText(label, language)).toBe(label);
      }
      expect(ayahWordTimes(key)![gap]).toBeLessThanOrEqual(10);
    }
    expect(asked).toBeGreaterThan(2000);
  });

  test("is not made for a long ayah, a part of an ayah, or text the timings do not fit", () => {
    const base = lessonFor("112:4");
    const quoting = (text: string, reference: string): Lesson => ({ ...base, quote: { text, reference } });
    expect(reciteChallenge(quoting(QURAN_AYAHS["2:255"], "Quran 2:255"))).toBeUndefined();
    expect(reciteChallenge(quoting(QURAN_AYAHS["112:4"].split(" ").slice(0, 3).join(" "), "Quran 112:4"))).toBeUndefined();
    expect(reciteChallenge(quoting(QURAN_AYAHS["36:22"], "Quran 36:22"))).toBeUndefined();
    expect(reciteChallenge(quoting("He is Allah, the One.", "Quran 112:1"))).toBeUndefined();
    expect(reciteChallenge(quoting(QURAN_AYAHS["112:4"], "Quran 112:1-4"))).toBeUndefined();
  });

  test("is asked once per ayah, in its first lesson on the path, after its own questions and before reviews", () => {
    const lesson = lessonFor("108:1");
    const later = Object.values(LESSONS_BY_ID).find((other) => other.id !== lesson.id && other.quote?.reference === "Quran 108:1" && other.quote.text === lesson.quote!.text)!;
    expect(later).toBeDefined();
    expect(withReciteQuestion(later)).toBe(later);
    const own = lesson.challenges.filter((challenge) => !challenge.isReview);
    const review: Challenge = { ...own[0], id: "from-before", isReview: true };
    const withRecite = withReciteQuestion({ ...lesson, challenges: [...own, review] });
    const ids = withRecite.challenges.map((challenge) => challenge.id);
    expect(ids).toEqual([...own.map((challenge) => challenge.id), `${lesson.id}-recite`, "from-before"]);
    // Asked like a listening question: one tap, never in the recap.
    const recite = withRecite.challenges[own.length];
    expect(questionFormat(recite)).toBe("choose");
    expect(lessonRecap(withRecite.challenges, [], 99).map((item) => item.question)).not.toContain(RECITE_PROMPT);
    expect(buildLessonFlow(withRecite).some((step) => "index" in step && step.index === own.length)).toBe(true);
    // Never a second listening question.
    expect(withReciteQuestion(withRecite)).toBe(withRecite);
  });
});

describe("which ayah comes next? (the question)", () => {
  test("asks for the ayah after the one the lesson quoted, against the nearest others of its surah", () => {
    const lesson = lessonFor("112:1");
    const challenge = nextAyahChallenge(lesson)!;
    const ayah = QURAN_AYAHS["112:1"];
    expect(lesson.quote!.text).toBe(ayah);
    expect(challenge.id).toBe(`${lesson.id}-next-ayah`);
    expect(challenge.prompt).toBe(RECITE_NEXT_PROMPT);
    expect(rightLabel(challenge)).toBe(QURAN_AYAHS["112:2"]);
    // The one after the answer and the one after that: Al-Ikhlas has no ayah before its first.
    expect(wrongLabels(challenge).sort()).toEqual([QURAN_AYAHS["112:3"], QURAN_AYAHS["112:4"]].sort());
    expect(challenge.listen).toEqual({
      ar: ayah,
      translit: "",
      recitation: expect.stringContaining("/6222.mp3"),
      recite: { key: "112:1", gap: ayahPieces(ayah).words, next: { key: "112:2", text: QURAN_AYAHS["112:2"], recitation: expect.stringContaining("/6223.mp3") } }
    });
    // Its source is both ayahs on Quran.com.
    expect(challenge.source).toMatchObject({ reference: "Quran 112:1-2", site: "Quran.com", url: expect.stringContaining("quran.com/112/1-2") });
    expect(listenWhy(challenge, "en")).toBe("");
  });

  test("puts the ayah before it among the wrong ones", () => {
    const challenge = nextAyahChallenge(lessonFor("112:2"))!;
    expect(rightLabel(challenge)).toBe(QURAN_AYAHS["112:3"]);
    expect(wrongLabels(challenge).sort()).toEqual([QURAN_AYAHS["112:1"], QURAN_AYAHS["112:4"]].sort());
  });

  test("is fair everywhere it is asked: three different ayahs of the surah, the right one the next, short enough for a tile", () => {
    let asked = 0;
    for (const lesson of Object.values(LESSONS_BY_ID)) {
      const challenge = nextAyahChallenge(lesson);
      if (!challenge) continue;
      asked += 1;
      const { key, gap, next } = challenge.listen!.recite!;
      const [surah, ayah] = key.split(":").map(Number);
      expect(next!.key).toBe(`${surah}:${ayah + 1}`);
      expect(rightLabel(challenge)).toBe(QURAN_AYAHS[next!.key]);
      expect(gap).toBe(ayahPieces(lesson.quote!.text).words);
      // Both ayahs are whole, so every word lights up as the reciter says it.
      expect(ayahWordTimes(key)!.length - 1).toBe(gap);
      expect(ayahWordTimes(next!.key)!.length - 1).toBe(ayahPieces(next!.text).words);
      const surahAyahs = Object.keys(QURAN_AYAHS).filter((other) => other.startsWith(`${surah}:`));
      // No other ayah of the surah reads like it, so only one ayah comes after it.
      const letters = arabicLetters(QURAN_AYAHS[key]);
      expect([key, surahAyahs.filter((other) => other !== key && arabicLetters(QURAN_AYAHS[other]) === letters)]).toEqual([key, []]);
      const labels = challenge.choices.map((choice) => choice.label);
      for (const [index, label] of labels.entries()) {
        expect(surahAyahs.some((other) => QURAN_AYAHS[other] === label && other !== key)).toBe(true);
        expect(label.length).toBeLessThanOrEqual(90);
        for (const other of labels.slice(index + 1)) expect([key, label, other, close(label, other)]).toEqual([key, label, other, false]);
        for (const language of ["bn", "ur", "ar"] as const) expect(translateStudyText(label, language)).toBe(label);
      }
      expect(ayahWordTimes(key)![gap]).toBeLessThanOrEqual(20);
    }
    expect(asked).toBeGreaterThan(1000);
  });

  test("is not made after a repeated ayah, the last ayah, in a surah the app does not show in full, or for a long next ayah", () => {
    const base = lessonFor("112:1");
    const quoting = (text: string, reference: string): Lesson => ({ ...base, quote: { text, reference } });
    // Ar-Rahman's refrain comes after many ayahs, so many ayahs come after it.
    expect(nextAyahChallenge(quoting(QURAN_AYAHS["55:13"], "Quran 55:13"))).toBeUndefined();
    expect(nextAyahChallenge(quoting(QURAN_AYAHS["112:4"], "Quran 112:4"))).toBeUndefined();
    expect(nextAyahChallenge(quoting(QURAN_AYAHS["2:2"], "Quran 2:2"))).toBeUndefined();
    expect(QURAN_AYAHS["67:15"].length).toBeGreaterThan(90);
    expect(nextAyahChallenge(quoting(QURAN_AYAHS["67:14"], "Quran 67:14"))).toBeUndefined();
    // Al-Asr has too few ayahs for two wrong ones.
    expect(nextAyahChallenge(quoting(QURAN_AYAHS["103:1"], "Quran 103:1"))).toBeUndefined();
    expect(nextAyahChallenge(quoting(QURAN_AYAHS["112:1"].split(" ").slice(0, 2).join(" "), "Quran 112:1"))).toBeUndefined();
    expect(nextAyahChallenge(quoting("Say: He is Allah, the One.", "Quran 112:1"))).toBeUndefined();
    expect(nextAyahChallenge(quoting(QURAN_AYAHS["112:1"], "Quran 112:1-2"))).toBeUndefined();
  });

  test("is asked by the ayah's next lesson on the path, or its first when that one cannot ask how it ends", () => {
    // Al-Ikhlas's first ayah: the first lesson asks how it ends, the next one which ayah comes next, then neither.
    const [first, second, third] = lessonsFor("112:1").map((id) => LESSONS_BY_ID[id]);
    expect(withReciteQuestion(first).challenges.some((challenge) => challenge.id === `${first.id}-recite`)).toBe(true);
    const own = second.challenges.filter((challenge) => !challenge.isReview);
    const review: Challenge = { ...own[0], id: "from-before", isReview: true };
    const withNext = withReciteQuestion({ ...second, challenges: [...own, review] });
    expect(withNext.challenges.map((challenge) => challenge.id)).toEqual([...own.map((challenge) => challenge.id), `${second.id}-next-ayah`, "from-before"]);
    expect(withReciteQuestion(third)).toBe(third);
    // "By the running horses" is too short to stop before its last word, so its first lesson asks what comes next.
    const [adiyat] = lessonsFor("100:1").map((id) => LESSONS_BY_ID[id]);
    expect(reciteChallenge(adiyat)).toBeUndefined();
    expect(withReciteQuestion(adiyat).challenges.some((challenge) => challenge.id === `${adiyat.id}-next-ayah`)).toBe(true);
    // Asked like a listening question: one tap, never in the recap, never a second one.
    const next = withNext.challenges[own.length];
    expect(questionFormat(next)).toBe("choose");
    expect(lessonRecap(withNext.challenges, [], 99).map((item) => item.question)).not.toContain(RECITE_NEXT_PROMPT);
    expect(withReciteQuestion(withNext)).toBe(withNext);
  });
});

describe("how does the ayah end? (on screen)", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    resetAyahPlayerForTests();
    mockPlayers.length = 0;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  /** The question as the lesson shows it: Listen plays the ayah once from its start, or stops it. */
  function Question({ challenge, wrong }: { challenge: Challenge; wrong?: boolean }) {
    const playback = useAyahPlayback();
    const [picked, setPicked] = useState<string>();
    const [result, setResult] = useState<ExerciseResult>();
    const listen = challenge.listen!;
    const url = listen.recitation!;
    const playing = playback.url === url && (playback.status === "playing" || playback.status === "loading");
    return (
      <ExerciseView
        kind="multiple_choice"
        prompt={challenge.prompt}
        choices={challenge.choices}
        correctChoiceId={challenge.correctChoiceId}
        selectedChoiceId={picked}
        result={result}
        mascotVariant="girl"
        accent="#58CC02"
        playSound={false}
        onSelect={setPicked}
        onCheck={() => setResult({ correct: picked === challenge.correctChoiceId, correctLabel: rightLabel(challenge), why: wrong ? "Because." : "" })}
        onContinue={jest.fn()}
        listen={{
          onPlay: () => (playing ? stopAyah(url) : playAyah(url, { once: true })),
          playing,
          recite: {
            text: listen.ar,
            ayahKey: listen.recite!.key,
            url,
            gap: listen.recite!.gap,
            next: listen.recite!.next ? { text: listen.recite!.next.text, ayahKey: listen.recite!.next.key, url: listen.recite!.next.recitation } : undefined
          }
        }}
      />
    );
  }

  const at = async (seconds: number) => {
    mockPlayers[0].currentTime = seconds;
    await act(async () => {
      jest.advanceTimersByTime(120);
    });
  };

  test("recites with the words lighting up, stops before the last word, and finishes it after the answer", async () => {
    const challenge = reciteChallenge(lessonFor("112:4"))!;
    const ayah = QURAN_AYAHS["112:4"];
    const words = ayahPieces(ayah).pieces.filter((piece) => piece.word >= 0).map((piece) => piece.text);
    const times = ayahWordTimes("112:4")!;
    await render(<Question challenge={challenge} />);
    expect(screen.getByTestId("recite-gap")).toBeTruthy();
    expect(screen.getByTestId("recite-ayah")).not.toHaveTextContent(words.at(-1)!);
    expect(screen.getByTestId("recite-hint")).toHaveTextContent("Tap to listen");

    await act(async () => fireEvent.press(screen.getByTestId("recite-play")));
    await act(async () => mockPlayers[0].emit({ playing: true, didJustFinish: false }));
    await at((times[1] + times[2]) / 2);
    expect(screen.getByTestId("recited-word")).toHaveTextContent(words[1]);
    expect(screen.getByTestId("recite-hint")).toHaveTextContent("Listening…");

    // Just before the last word: the reciter stops, the gap waits for the learner.
    await at(times[words.length - 1] - 0.05);
    expect(mockPlayers[0].pause).toHaveBeenCalled();
    expect(screen.queryByTestId("recited-word")).toBeNull();
    expect(screen.getByTestId("recite-gap")).toBeTruthy();
    expect(screen.getByTestId("recite-hint")).toHaveTextContent("Your turn");

    // The right ending, then CHECK: it fills the gap and the reciter goes on from there to say it.
    const seeks = mockPlayers[0].seekTo.mock.calls.length;
    const plays = mockPlayers[0].play.mock.calls.length;
    await act(async () => fireEvent.press(screen.getByTestId(`choice-${challenge.correctChoiceId}`)));
    await act(async () => fireEvent.press(screen.getByTestId("exercise-check")));
    expect(screen.queryByTestId("recite-gap")).toBeNull();
    expect(screen.getByTestId("recite-answer")).toHaveTextContent(words.at(-1)!);
    expect(mockPlayers[0].play.mock.calls.length).toBe(plays + 1);
    expect(mockPlayers[0].seekTo.mock.calls.length).toBe(seeks);
    await act(async () => mockPlayers[0].emit({ playing: true, didJustFinish: false }));
    await at(times[words.length - 1] + 0.1);
    expect(screen.getByTestId("recited-word")).toHaveTextContent(words.at(-1)!);
  });

  test("a wrong answer shows the right ending in the gap, with no teacher's voice over the reciter", async () => {
    const challenge = reciteChallenge(lessonFor("108:1"))!;
    const wrong = challenge.choices.find((choice) => choice.id !== challenge.correctChoiceId)!;
    await render(<Question challenge={challenge} wrong />);
    await act(async () => fireEvent.press(screen.getByTestId(`choice-${wrong.id}`)));
    await act(async () => fireEvent.press(screen.getByTestId("exercise-check")));
    expect(screen.getByTestId("recite-answer")).toHaveTextContent(rightLabel(challenge));
    expect(screen.getByTestId("feedback-answer")).toHaveTextContent(rightLabel(challenge));
    expect(screen.queryByTestId("feedback-listen")).toBeNull();
    // Nothing was playing, so nothing starts by itself.
    expect(mockPlayers).toHaveLength(0);
  });

  test("which ayah comes next: recites the ayah to its end, waits, and goes on to the next one after the answer", async () => {
    const challenge = nextAyahChallenge(lessonFor("112:1"))!;
    const ayah = QURAN_AYAHS["112:1"];
    const next = QURAN_AYAHS["112:2"];
    const wordsOf = (text: string) => ayahPieces(text).pieces.filter((piece) => piece.word >= 0).map((piece) => piece.text);
    const words = wordsOf(ayah);
    const nextWords = wordsOf(next);
    const times = ayahWordTimes("112:1")!;
    const nextTimes = ayahWordTimes("112:2")!;
    await render(<Question challenge={challenge} />);
    // The whole ayah shows, with a gap under it for the next one.
    expect(screen.getByTestId("recite-ayah")).toHaveTextContent(ayah);
    expect(screen.getByTestId("recite-gap")).toBeTruthy();
    expect(screen.queryByTestId("recite-answer")).toBeNull();

    await act(async () => fireEvent.press(screen.getByTestId("recite-play")));
    await act(async () => mockPlayers[0].emit({ playing: true, didJustFinish: false }));
    await at((times[0] + times[1]) / 2);
    expect(screen.getByTestId("recited-word")).toHaveTextContent(words[0]);
    // Not stopped before its end: its last word is said too.
    await at((times[words.length - 1] + times[words.length]) / 2);
    expect(screen.getByTestId("recited-word")).toHaveTextContent(words.at(-1)!);
    expect(mockPlayers[0].pause).not.toHaveBeenCalled();
    // At its end, the next ayah waits for the learner.
    await act(async () => mockPlayers[0].emit({ playing: false, didJustFinish: true }));
    expect(screen.getByTestId("recite-hint")).toHaveTextContent("Your turn");

    // The right ayah, then CHECK: it fills the gap and the reciter goes on to it, its words lighting up.
    await act(async () => fireEvent.press(screen.getByTestId(`choice-${challenge.correctChoiceId}`)));
    await act(async () => fireEvent.press(screen.getByTestId("exercise-check")));
    expect(screen.queryByTestId("recite-gap")).toBeNull();
    expect(screen.getByTestId("recite-answer")).toHaveTextContent(next);
    expect(mockPlayers[0].replace).toHaveBeenCalledWith(expect.stringContaining("/6223.mp3"));
    await act(async () => mockPlayers[0].emit({ playing: true, didJustFinish: false }));
    await at((nextTimes[1] + nextTimes[2]) / 2);
    expect(within(screen.getByTestId("recite-answer")).getByTestId("recited-word")).toHaveTextContent(nextWords[1]);
    expect(screen.getByTestId("recite-hint")).toHaveTextContent("Listening…");
    // Its speaker stops the next ayah too.
    await act(async () => fireEvent.press(screen.getByTestId("recite-play")));
    expect(screen.getByTestId("recite-hint")).toHaveTextContent("Tap to listen");
  });

  test("which ayah comes next: stopped before its end, nothing plays by itself after the answer", async () => {
    const challenge = nextAyahChallenge(lessonFor("112:1"))!;
    const times = ayahWordTimes("112:1")!;
    await render(<Question challenge={challenge} wrong />);
    await act(async () => fireEvent.press(screen.getByTestId("recite-play")));
    await act(async () => mockPlayers[0].emit({ playing: true, didJustFinish: false }));
    await at((times[1] + times[2]) / 2);
    await act(async () => fireEvent.press(screen.getByTestId("recite-play")));
    expect(screen.getByTestId("recite-hint")).toHaveTextContent("Tap to listen");
    const plays = mockPlayers[0].play.mock.calls.length;
    const wrong = challenge.choices.find((choice) => choice.id !== challenge.correctChoiceId)!;
    await act(async () => fireEvent.press(screen.getByTestId(`choice-${wrong.id}`)));
    await act(async () => fireEvent.press(screen.getByTestId("exercise-check")));
    // The right ayah fills the gap and shows on the sheet; the reciter stays quiet.
    expect(screen.getByTestId("recite-answer")).toHaveTextContent(QURAN_AYAHS["112:2"]);
    expect(screen.getByTestId("feedback-answer")).toHaveTextContent(QURAN_AYAHS["112:2"]);
    expect(mockPlayers[0].play.mock.calls.length).toBe(plays);
    expect(mockPlayers[0].replace).not.toHaveBeenCalled();
  });

  test("the ayah grows with Bigger text, like the question", async () => {
    const challenge = reciteChallenge(lessonFor("112:4"))!;
    const size = () => StyleSheet.flatten(screen.getByTestId("recite-ayah").props.style).fontSize;
    await render(<Question challenge={challenge} />);
    expect(size()).toBe(23);
    setDeviceSetting("bigText", true);
    try {
      await render(<Question challenge={challenge} />);
      expect(size()).toBe(28);
    } finally {
      resetDeviceSettingsForTests();
    }
  });
});
