jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);
jest.mock("expo-speech", () => ({
  getAvailableVoicesAsync: async () => [],
  speak: jest.fn(),
  stop: jest.fn()
}));
jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

type Status = { playing: boolean; didJustFinish: boolean; isLoaded?: boolean; duration?: number };
type Listener = (status: Status) => void;
const mockPlayers: Array<{ source: string; currentTime: number; play: jest.Mock; pause: jest.Mock; emit: (status: Status) => void }> = [];

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

import React from "react";
import { StyleSheet } from "react-native";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { QURAN_AYAHS } from "../data/quranAyahs";
import { playAyah, resetAyahPlayerForTests, stopAyah } from "../services/ayahPlayer";
import { ayahPieces, ayahWordTimes } from "../services/ayahWords";
import { quranAudioUrl } from "../services/quranAudio";
import { useAyahPlayback } from "../ui/lesson/AyahListen";
import { WhichSurahCard } from "../ui/lesson/ReciteCard";

// Round 11: "Which surah is it?" is heard, not read. Until the answer each word of the ayah is a bead that lights up
// as the reciter says it; once answered, the ayah shows with its words lighting up in turn.

const KEY = "112:1";
const URL = quranAudioUrl(`Quran ${KEY}`) as string;
const TEXT = QURAN_AYAHS[KEY];
const WORDS = ayahPieces(TEXT).words;

/** The card as a question shows it: playing while its recitation plays or loads; Listen plays it once, or stops it. */
function Question({ answered = false }: { answered?: boolean }) {
  const playback = useAyahPlayback();
  const playing = playback.url === URL && (playback.status === "playing" || playback.status === "loading");
  return (
    <WhichSurahCard
      text={TEXT}
      ayahKey={KEY}
      url={URL}
      ayahs={4}
      onPlay={() => (playing ? stopAyah(URL) : playAyah(URL, { once: true }))}
      playing={playing}
      answered={answered}
      accent="#21B573"
    />
  );
}

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}
const emit = async (status: Status) => {
  await act(async () => mockPlayers[0].emit(status));
};
/** The reciter is in the middle of word `word` (from 0), and the lights have caught up. */
const onWord = async (word: number) => {
  const times = ayahWordTimes(KEY)!;
  mockPlayers[0].currentTime = (times[word] + times[word + 1]) / 2;
  await act(async () => {
    jest.advanceTimersByTime(130);
  });
};
const hidden = { includeHiddenElements: true };
/** Each bead's state, right to left: rest, on (being said) or heard. */
const beads = () =>
  screen.getByTestId("which-beads", hidden).children.map((bead) => {
    const id = typeof bead === "string" ? "" : String(bead.props.testID);
    return id === "which-bead-on" ? "on" : id === "which-bead-heard" ? "heard" : "rest";
  });

describe("the Which surah is it? card", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    resetAyahPlayerForTests();
    mockPlayers.length = 0;
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it("shows a bead for each word, not the ayah, and lights them as the reciter says them; nothing plays by itself", async () => {
    await render(<Question />);
    expect(WORDS).toBe(4);
    expect(beads()).toEqual(["rest", "rest", "rest", "rest"]);
    // The first word's bead is on the right, as the ayah is read, even in a lesson laid out right to left.
    expect(StyleSheet.flatten(screen.getByTestId("which-beads", hidden).props.style)).toMatchObject({ direction: "ltr", flexDirection: "row-reverse" });
    expect(screen.queryByTestId("which-ayah")).toBeNull();
    expect(screen.queryByTestId("which-place")).toBeNull();
    expect(screen.queryByText(TEXT)).toBeNull();
    expect(mockPlayers).toHaveLength(0);
    expect(screen.getByTestId("which-hint").props.children).toBe("Tap to listen");

    await press("which-play");
    expect(mockPlayers).toHaveLength(1);
    expect(mockPlayers[0].source).toBe(URL);
    await emit({ playing: true, didJustFinish: false });
    expect(screen.getByTestId("which-hint").props.children).toBe("Listening…");
    expect(screen.getByTestId("which-play").props.accessibilityLabel).toBe("Stop");
    await onWord(0);
    expect(beads()).toEqual(["on", "rest", "rest", "rest"]);
    await onWord(2);
    expect(beads()).toEqual(["heard", "heard", "on", "rest"]);
    // Done: every word was said, and the beads stay lit.
    await onWord(3);
    await emit({ playing: false, didJustFinish: true });
    expect(beads()).toEqual(["heard", "heard", "heard", "heard"]);
    expect(screen.getByTestId("which-hint").props.children).toBe("Tap to listen");
    // Again: from the start (even when the phone still says, for a moment, where the last one ended).
    await press("which-play");
    await emit({ playing: true, didJustFinish: false });
    await onWord(1);
    expect(beads()).toEqual(["heard", "on", "rest", "rest"]);
    // Stopped half way, the words said stay lit.
    await press("which-play");
    expect(mockPlayers[0].pause).toHaveBeenCalled();
    await emit({ playing: false, didJustFinish: false });
    expect(beads()).toEqual(["heard", "heard", "rest", "rest"]);
  });

  it("once answered, shows the ayah and which ayah of its surah it is, its words lighting up as he says them", async () => {
    await render(<Question answered />);
    expect(screen.queryByTestId("which-beads", hidden)).toBeNull();
    expect(screen.getByTestId("which-place").props.children).toBe("Ayah 1 of 4");
    expect(screen.queryByTestId("recited-word")).toBeNull();
    await press("which-play");
    await emit({ playing: true, didJustFinish: false });
    await onWord(2);
    const pieces = ayahPieces(TEXT).pieces.filter((piece) => piece.word >= 0);
    expect(screen.getByTestId("recited-word").props.children).toBe(pieces[2].text);
  });

  it("stops the reciter when the question goes", async () => {
    const view = await render(<Question />);
    await press("which-play");
    await emit({ playing: true, didJustFinish: false });
    mockPlayers[0].pause.mockClear();
    await act(async () => view.unmount());
    expect(mockPlayers[0].pause).toHaveBeenCalled();
  });
});
