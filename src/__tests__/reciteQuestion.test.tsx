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
const mockPlayers: Array<{ source: string; currentTime: number; play: jest.Mock; pause: jest.Mock; seekTo: jest.Mock; emit: (status: Status) => void }> = [];

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
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { LESSONS_BY_ID } from "../data/course";
import { QURAN_AYAHS } from "../data/quranAyahs";
import { arabicLetters } from "../services/arabicVoice";
import { playAyah, resetAyahPlayerForTests, stopAyah } from "../services/ayahPlayer";
import { ayahPieces, ayahWordTimes } from "../services/ayahWords";
import { translateStudyText } from "../services/contentLocalization";
import type { Challenge, Lesson } from "../types";
import { useAyahPlayback } from "../ui/lesson/AyahListen";
import { ExerciseView, type ExerciseResult } from "../ui/lesson/ExerciseView";
import { buildLessonFlow } from "../ui/lesson/lessonPages";
import { lessonRecap } from "../ui/lesson/lessonRecap";
import { listenWhy } from "../ui/lesson/listenQuestion";
import { questionFormat } from "../ui/lesson/questionFormats";
import { firstLessonQuoting, reciteChallenge, RECITE_PROMPT, withReciteQuestion } from "../ui/lesson/reciteQuestion";

// Fahad: more interactive questions, more like Duolingo, and the Quran's words lighting up as the reciter recites
// (round 6). "How does the ayah end?": the reciter recites the ayah the lesson quoted and stops before its last word,
// and the learner taps how it ends.

const lessonFor = (ayahKey: string) => LESSONS_BY_ID[firstLessonQuoting(ayahKey)!];
const lastWordOf = (text: string) => ayahPieces(text).pieces.filter((piece) => piece.word >= 0).at(-1)!.text;
const rightLabel = (challenge: Challenge) => challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)!.label;
const close = (a: string, b: string) => arabicLetters(a).includes(arabicLetters(b)) || arabicLetters(b).includes(arabicLetters(a));

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
          recite: { text: listen.ar, ayahKey: listen.recite!.key, url, gap: listen.recite!.gap }
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
});
