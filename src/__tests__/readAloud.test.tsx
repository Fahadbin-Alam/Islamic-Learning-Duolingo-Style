jest.mock("expo-speech", () => ({
  getAvailableVoicesAsync: jest.fn(async () => mockVoices),
  speak: jest.fn(),
  stop: jest.fn(() => Promise.resolve())
}));
jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));
// The ayah player's news is sent by hand, so a recitation can "start" without any audio.
jest.mock("../services/ayahPlayer", () => ({
  ...jest.requireActual("../services/ayahPlayer"),
  playAyah: jest.fn(),
  stopAyah: jest.fn(),
  subscribeAyahPlayback: (listener: (playback: unknown) => void) => {
    mockAyahListeners.add(listener);
    return () => {
      mockAyahListeners.delete(listener);
    };
  }
}));
// The teacher shows how long its mouth moves, so the test can see it talk with the voice.
jest.mock("../ui/lesson/Teacher", () => {
  const actual = jest.requireActual("../ui/lesson/Teacher");
  const { Text } = jest.requireActual("react-native");
  const { createElement } = jest.requireActual("react");
  return {
    ...actual,
    Teacher: ({ talkMs }: { talkMs?: number }) => createElement(Text, { testID: "teacher-talk" }, String(talkMs ?? "quiet"))
  };
});

import React from "react";
import * as Speech from "expo-speech";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { setActiveLanguage } from "../i18n";
import { stopAyah } from "../services/ayahPlayer";
import { fitForVoice, resetTeacherVoiceForTests } from "../services/teacherVoice";
import { LearnCard, type LearnCardProps } from "../ui/lesson/LearnCard";
import { talkTime } from "../ui/lesson/Teacher";
import { readAloudText, readingMs } from "../ui/lesson/useReadAloud";

let mockVoices: Speech.Voice[] = [];
const mockAyahListeners = new Set<(playback: unknown) => void>();
const speak = Speech.speak as jest.Mock;
const stop = Speech.stop as jest.Mock;
// The page's parts slide in from nothing; the test reads them before they have.
const ALL = { includeHiddenElements: true };

const BASE: LearnCardProps = {
  title: "The first revelation",
  line: "Jibril came to the cave of Hira.",
  facts: ["Place: the cave of Hira", "The first word was Read."],
  explain: "The Prophet ﷺ was in the cave when the first ayahs came down.",
  mascotVariant: "girl",
  accent: "#58CC02",
  onContinue: () => undefined
};

const lastSpeech = () => speak.mock.calls[speak.mock.calls.length - 1] as [string, Speech.SpeechOptions];
const talk = () => screen.getAllByTestId("teacher-talk", ALL)[0].props.children as string;

async function tapRead() {
  await act(async () => {
    fireEvent.press(screen.getByTestId("learn-read-aloud"));
  });
}

beforeEach(() => {
  mockVoices = [];
  speak.mockClear();
  stop.mockClear();
  (stopAyah as jest.Mock).mockClear();
  resetTeacherVoiceForTests();
  setActiveLanguage("en");
});

afterAll(() => {
  setActiveLanguage("en");
});

describe("the words the teacher reads", () => {
  it("joins a page's pieces into sentences, leaving out the empty ones", () => {
    expect(readAloudText(["Quiz time!", "  Get them  right to move on ", undefined, "", false, "Place: Makkah"])).toBe(
      "Quiz time! Get them right to move on. Place: Makkah."
    );
    expect(readAloudText(["ما هي الصلاة؟", "اقرأ"])).toBe("ما هي الصلاة؟ اقرأ.");
    expect(readAloudText(["নামাজ।", "রোজা"])).toBe("নামাজ। রোজা.");
  });

  it("gives the mouth a little longer than the words take, never for ever", () => {
    expect(readingMs("")).toBe(1500);
    const words = "word ".repeat(20).trim();
    expect(readingMs(words)).toBeGreaterThanOrEqual(20 * 450);
    expect(readingMs(`${words}.`)).toBeGreaterThan(readingMs(words));
    expect(readingMs("word. ".repeat(2000))).toBe(180000);
  });

  it("cuts a page too long for the phone's voice at the last sentence that fits", () => {
    const sentence = "This is one sentence of the lesson. ";
    const long = sentence.repeat(200);
    const cut = fitForVoice(long, 1000);
    expect(cut.length).toBeLessThanOrEqual(1000);
    expect(cut.endsWith("lesson.")).toBe(true);
    expect(fitForVoice("Short.", 1000)).toBe("Short.");
    // With no sentence end in reach, it cuts at a space, never inside a word.
    expect(fitForVoice("word ".repeat(400), 1000).endsWith("word")).toBe(true);
  });
});

describe("the teacher reads the lesson page aloud", () => {
  it("reads What you learn in English when the speaker is tapped, its mouth moving until the voice is done", async () => {
    await render(<LearnCard {...BASE} page="facts" />);
    const button = await screen.findByTestId("learn-read-aloud");
    expect(button.props.accessibilityLabel).toBe("Read it to me");
    // Nothing plays by itself: the teacher talks its usual short while, as before.
    expect(speak).not.toHaveBeenCalled();
    expect(talk()).not.toBe("0");

    await tapRead();
    expect(speak).toHaveBeenCalledTimes(1);
    const [text, options] = lastSpeech();
    expect(text).toContain("The Prophet peace be upon him was in the cave when the first ayahs came down.");
    expect(text).toContain("the cave of Hira");
    expect(text).toContain("The first word was Read.");
    expect(text).not.toContain("ﷺ");
    expect(options.language).toBe("en");
    expect(options.voice).toBeUndefined();
    // The recitation stops first, so the two never talk at once.
    expect(stopAyah).toHaveBeenCalled();
    // The mouth moves as long as the reading takes, and the button turns into Stop.
    expect(Number(talk())).toBeGreaterThanOrEqual(readingMs(text));
    expect(screen.getByTestId("learn-read-aloud-stop", ALL)).toBeTruthy();
    expect(screen.getByTestId("learn-read-aloud").props.accessibilityLabel).toBe("Stop");

    // The voice finishes: the mouth closes and the speaker comes back.
    await act(async () => {
      options.onDone?.();
    });
    expect(talk()).toBe("0");
    expect(screen.queryByTestId("learn-read-aloud-stop", ALL)).toBeNull();
    expect(screen.getByTestId("learn-read-aloud").props.accessibilityLabel).toBe("Read it to me");
  });

  it("stops on a second tap, and when the page is left", async () => {
    const view = await render(<LearnCard {...BASE} page="facts" />);
    await screen.findByTestId("learn-read-aloud");
    await tapRead();
    stop.mockClear();
    await tapRead();
    expect(stop).toHaveBeenCalled();
    expect(talk()).toBe("0");
    expect(screen.queryByTestId("learn-read-aloud-stop", ALL)).toBeNull();
    // The stopped voice's own "stopped" news comes late: it does not start the mouth again.
    await act(async () => {
      lastSpeech()[1].onStopped?.();
    });
    expect(talk()).toBe("0");

    await tapRead();
    expect(speak).toHaveBeenCalledTimes(2);
    stop.mockClear();
    await view.unmount();
    expect(stop).toHaveBeenCalled();
  });

  it("stops when an ayah's recitation starts", async () => {
    await render(<LearnCard {...BASE} page="facts" />);
    await screen.findByTestId("learn-read-aloud");
    await tapRead();
    stop.mockClear();
    await act(async () => {
      mockAyahListeners.forEach((listener) => listener({ url: "https://audio/1.mp3", status: "loading", repeat: false }));
    });
    expect(stop).toHaveBeenCalled();
    expect(talk()).toBe("0");
    expect(screen.queryByTestId("learn-read-aloud-stop", ALL)).toBeNull();
  });

  it("reads each page's own words: the start, a Good to know fact, a story and the quiz", async () => {
    const arabic = { ar: "اقْرَأْ", translit: "Iqra", meaning: "Read" };
    const start = await render(<LearnCard {...BASE} page="start" arabic={arabic} quote={{ text: "Read in the name of your Lord.", reference: "Quran 96:1" }} />);
    await screen.findByTestId("learn-read-aloud");
    await tapRead();
    expect(lastSpeech()[0]).toBe("The first revelation. Iqra: Read. Jibril came to the cave of Hira. Read in the name of your Lord.");
    await start.unmount();

    const teach = await render(
      <LearnCard
        {...BASE}
        page="teach"
        teach={{ lines: ["Khadijah was the first to believe."], card: { question: "Who believed first?", answer: "Khadijah" }, answer: "Khadijah" }}
      />
    );
    await screen.findByTestId("learn-read-aloud");
    await tapRead();
    expect(lastSpeech()[0]).toBe("Khadijah was the first to believe. Who believed first? Khadijah.");
    await teach.unmount();

    const story = await render(<LearnCard {...BASE} page="story" deeper={{ meaning: ["A meaning."], story: "He ﷺ went home to Khadijah", sources: [] }} />);
    await screen.findByTestId("learn-read-aloud");
    await tapRead();
    expect(lastSpeech()[0]).toBe("Let me tell you the story. He peace be upon him went home to Khadijah.");
    // The teacher on the story page talks with the voice too.
    expect(Number(talk())).toBeGreaterThan(talkTime("Let me tell you the story."));
    await story.unmount();

    await render(<LearnCard {...BASE} page="quiz" quizCount={4} />);
    await screen.findByTestId("learn-read-aloud");
    await tapRead();
    expect(lastSpeech()[0]).toBe("Quiz time! 4 questions from your last lessons, in new ways.");
  });

  it("is hidden when the phone has no voice for the language, and reads in it when it has one", async () => {
    setActiveLanguage("bn");
    mockVoices = [{ identifier: "ar-voice", language: "ar-SA", name: "Arabic", quality: "Default" as Speech.VoiceQuality }];
    const without = await render(<LearnCard {...BASE} page="quiz" quizCount={4} />);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 20));
    });
    expect(screen.queryByTestId("learn-read-aloud")).toBeNull();
    expect(screen.getByTestId("learn-continue")).toBeTruthy();
    await without.unmount();

    resetTeacherVoiceForTests();
    mockVoices = [{ identifier: "bn-voice", language: "bn-BD", name: "Bangla", quality: "Default" as Speech.VoiceQuality }];
    await render(<LearnCard {...BASE} page="quiz" quizCount={4} />);
    const button = await screen.findByTestId("learn-read-aloud");
    expect(button.props.accessibilityLabel).toBe("আমাকে পড়ে শোনাও");
    await tapRead();
    const [text, options] = lastSpeech();
    expect(options).toMatchObject({ language: "bn", voice: "bn-voice" });
    // Bangla words, and no English left in.
    expect(text).toMatch(/[ঀ-৿]/);
    expect(text).not.toMatch(/[A-Za-z]/);
  });

  it("reads the Arabic word itself to an Arabic voice", async () => {
    setActiveLanguage("ar");
    mockVoices = [{ identifier: "ar-voice", language: "ar-SA", name: "Arabic", quality: "Default" as Speech.VoiceQuality }];
    await render(<LearnCard {...BASE} page="start" arabic={{ ar: "اقْرَأْ", translit: "Iqra", meaning: "Read" }} />);
    await screen.findByTestId("learn-read-aloud");
    await tapRead();
    const [text, options] = lastSpeech();
    expect(options).toMatchObject({ language: "ar", voice: "ar-voice" });
    expect(text).toContain("اقْرَأْ");
    expect(text).not.toContain("Iqra");
  });
});
