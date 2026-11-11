jest.mock("expo-speech", () => ({
  getAvailableVoicesAsync: jest.fn(async () => mockVoices),
  speak: jest.fn(),
  stop: jest.fn(() => Promise.resolve())
}));
jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));
// The asking teacher shows how long its mouth moves, so the test can see it talk with the voice.
jest.mock("../ui/Mascot", () => {
  const actual = jest.requireActual("../ui/Mascot");
  const { Text } = jest.requireActual("react-native");
  const { createElement } = jest.requireActual("react");
  return {
    ...actual,
    Mascot: ({ talkMs }: { talkMs?: number }) => createElement(Text, { testID: "mascot-talk" }, String(talkMs ?? 0))
  };
});

import React from "react";
import * as Speech from "expo-speech";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { setActiveLanguage } from "../i18n";
import { resetTeacherVoiceForTests } from "../services/teacherVoice";
import type { Challenge } from "../types";
import { ExerciseView, type ExerciseViewProps } from "../ui/lesson/ExerciseView";
import { MapGame } from "../ui/lesson/MapGame";
import { mapPlacesFor } from "../ui/lesson/mapQuestions";
import { OrderGame } from "../ui/lesson/OrderGame";
import { questionAloudText } from "../ui/lesson/questionAloud";
import { CheckGame, FillGame, GapGame } from "../ui/lesson/WordGames";

// Fahad: a teacher on every lesson page, the app for all ages (children who cannot read well yet too). Like the lesson
// pages' speaker next to CONTINUE, a speaker next to CHECK has the teacher read the question and its answers aloud.

let mockVoices: Speech.Voice[] = [];
const speak = Speech.speak as jest.Mock;
const stop = Speech.stop as jest.Mock;
const HIDDEN = { includeHiddenElements: true };
const said = () => (speak.mock.calls[speak.mock.calls.length - 1] as [string, Speech.SpeechOptions])[0];
const talk = () => Number(screen.getAllByTestId("mascot-talk", HIDDEN)[0].props.children);
const show = { mascotVariant: "girl", accent: "#58CC02", onCheck: jest.fn(), onContinue: jest.fn(), onSelect: jest.fn(), playSound: false };

const question = (prompt: string, labels: string[], right = 0): Challenge => ({
  id: `q-${prompt}`,
  type: "multiple_choice",
  prompt,
  choices: labels.map((label, index) => ({ id: String.fromCharCode(97 + index), label })),
  correctChoiceId: String.fromCharCode(97 + right),
  explanation: "From the lesson."
});
const house = question("Twelve extra rak'ahs a day bring what?", ["A house in Jannah", "Wealth", "A long life"]);
const choose: ExerciseViewProps = { ...show, kind: "multiple_choice", prompt: house.prompt, choices: house.choices, correctChoiceId: "a" };

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID, HIDDEN));
  });
}

beforeEach(() => {
  mockVoices = [];
  speak.mockClear();
  stop.mockClear();
  resetTeacherVoiceForTests();
  setActiveLanguage("en");
});

afterAll(() => {
  setActiveLanguage("en");
});

describe("what the teacher says for a question", () => {
  it("says the question, then each answer, a pause between each", () => {
    expect(questionAloudText(["Which battle came first?", "Badr", "Uhud"])).toBe("Which battle came first? Badr. Uhud.");
  });

  it("makes a gap a pause, and leaves the Quran to its reciter", () => {
    expect(questionAloudText(["The first word was ___ .", "Read", "Pray"])).toBe("The first word was … . Read. Pray.");
    // Text in the Quran's own spelling, or a quote in its brackets, is not said by the phone's voice.
    expect(questionAloudText(["Which ayah is this?", "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ", "Al-Fatihah"])).toBe("Which ayah is this? Al-Fatihah.");
    expect(questionAloudText(["ما معنى ﴿إياك نعبد﴾؟", "نعبدك وحدك"])).toBe("ما معنى ؟ نعبدك وحدك.");
  });
});

describe("the speaker by CHECK", () => {
  it("is there from the first frame in English, and reads the question and its answers in the order they show", async () => {
    await render(<ExerciseView {...choose} />);
    const button = screen.getByTestId("question-read-aloud");
    expect(button.props.accessibilityLabel).toBe("Read it to me");
    // Nothing plays by itself.
    expect(speak).not.toHaveBeenCalled();
    expect(talk()).toBe(0);
    await press("question-read-aloud");
    expect(said()).toBe("Twelve extra rak'ahs a day bring what? A house in Jannah. Wealth. A long life.");
    expect(speak.mock.calls[0][1]).toMatchObject({ language: "en" });
    // The teacher's mouth moves while it reads; the button shows a stop square.
    expect(talk()).toBeGreaterThan(0);
    expect(screen.getByTestId("question-read-aloud-stop", HIDDEN)).toBeTruthy();
    // The voice is done: the mouth closes.
    await act(async () => {
      (speak.mock.calls[0][1] as Speech.SpeechOptions).onDone?.();
    });
    expect(talk()).toBe(0);
    expect(screen.queryByTestId("question-read-aloud-stop", HIDDEN)).toBeNull();
  });

  it("reads a try's answers in that try's order", async () => {
    await render(<ExerciseView {...choose} attempt={1} />);
    await press("question-read-aloud");
    expect(said()).toBe("Twelve extra rak'ahs a day bring what? Wealth. A long life. A house in Jannah.");
  });

  it("stops when tapped again, and when the answer is checked", async () => {
    const view = await render(<ExerciseView {...choose} />);
    await press("question-read-aloud");
    await press("question-read-aloud");
    expect(stop).toHaveBeenCalled();
    expect(talk()).toBe(0);
    await press("question-read-aloud");
    stop.mockClear();
    await view.rerender(<ExerciseView {...choose} selectedChoiceId="b" result={{ correct: false, correctLabel: "A house in Jannah" }} />);
    expect(stop).toHaveBeenCalled();
    expect(screen.queryByTestId("question-read-aloud-stop", HIDDEN)).toBeNull();
  });

  it("reads a true-or-false question alone, its two buttons say the rest", async () => {
    await render(<CheckGame {...show} prompt={house.prompt} shown={house.choices[1]} shownIsRight={false} onJudge={jest.fn()} />);
    await press("question-read-aloud");
    expect(said()).toBe("Twelve extra rak'ahs a day bring what? Is it “Wealth”?");
  });

  it("is not there for a listening question, which has its own speaker for the word", async () => {
    await render(<ExerciseView {...choose} listen={{ onPlay: jest.fn(), playing: false }} />);
    expect(screen.getByTestId("exercise-listen")).toBeTruthy();
    expect(screen.queryByTestId("question-read-aloud")).toBeNull();
  });

  it("reads a gap sentence with a pause for its gap, then its words as they show", async () => {
    await render(<GapGame {...show} prompt="The first word revealed was ____." choices={[{ id: "a", label: "Read" }, { id: "b", label: "Pray" }, { id: "c", label: "Fast" }]} correctChoiceId="a" />);
    await press("question-read-aloud");
    const words = screen.getAllByTestId(/^choice-/).map((tile) => tile.props.accessibilityLabel as string);
    expect(said()).toBe(`The first word revealed was …. ${words.join(". ")}.`);
    // The asking teacher in a game moves its mouth with the frame's voice too.
    expect(talk()).toBeGreaterThan(0);
  });

  it("reads a missing-word answer: the question, the answer with its gap, the words", async () => {
    await render(<FillGame {...show} prompt="Who was the first caliph?" fill={{ before: "Abu Bakr ", piece: "as-Siddiq", after: "", options: ["as-Siddiq", "al-Faruq", "Dhun-Nurayn"] }} correctChoiceId="a" />);
    await press("question-read-aloud");
    expect(said()).toMatch(/^Who was the first caliph\? Abu Bakr …\. /);
    for (const word of ["as-Siddiq", "al-Faruq", "Dhun-Nurayn"]) expect(said()).toContain(word);
  });

  it("reads a place question, then the places to tap on the map", async () => {
    const uhud = question("In which battle was Hamzah martyred?", ["Badr", "Khaybar", "Tabuk", "Uhud"], 3);
    await render(<MapGame {...show} prompt={uhud.prompt} choices={uhud.choices} places={mapPlacesFor(uhud)!} correctChoiceId="d" />);
    await press("question-read-aloud");
    expect(said()).toBe("In which battle was Hamzah martyred? Badr. Khaybar. Tabuk. Uhud.");
  });

  it("reads a put-in-order task, then its steps as the bank shows them", async () => {
    const steps = [
      { id: "intention", label: "Make the intention" },
      { id: "hands", label: "Wash the hands" },
      { id: "mouth", label: "Rinse the mouth" }
    ];
    await render(<OrderGame title="Wudu" prompt="Put the steps of wudu in order!" options={steps} correctOrderIds={steps.map((step) => step.id)} mascotVariant="girl" accent="#58CC02" onDone={jest.fn()} playSound={false} />);
    await press("question-read-aloud");
    const bank = screen.getAllByTestId(/^order-bank-/).map((chip) => chip.props.testID.replace("order-bank-", ""));
    expect(said()).toBe(`Put the steps of wudu in order! ${bank.map((id) => steps.find((step) => step.id === id)!.label).join(". ")}.`);
    expect(talk()).toBeGreaterThan(0);
  });

  it("reads in the learner's language with the phone's voice for it, and hides when the phone has none", async () => {
    setActiveLanguage("bn");
    const bangla = { ...choose, prompt: "দিনে বারো রাকাত কী এনে দেয়?", choices: [{ id: "a", label: "জান্নাতে একটি ঘর" }, { id: "b", label: "সম্পদ" }] };
    const none = await render(<ExerciseView {...bangla} />);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200));
    });
    expect(screen.queryByTestId("question-read-aloud")).toBeNull();
    await none.unmount();

    resetTeacherVoiceForTests();
    mockVoices = [{ identifier: "bn-voice", name: "Bangla", quality: "Default", language: "bn-BD" } as Speech.Voice];
    await render(<ExerciseView {...bangla} />);
    const button = await screen.findByTestId("question-read-aloud");
    expect(button.props.accessibilityLabel).not.toBe("Read it to me");
    await press("question-read-aloud");
    expect(said()).toBe("দিনে বারো রাকাত কী এনে দেয়? জান্নাতে একটি ঘর. সম্পদ.");
    expect(speak.mock.calls[0][1]).toMatchObject({ language: "bn", voice: "bn-voice" });
  });
});
