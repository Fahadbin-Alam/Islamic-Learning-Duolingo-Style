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
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { QURAN_AYAHS } from "../data/quranAyahs";
import { playAyah, resetAyahPlayerForTests } from "../services/ayahPlayer";
import { resetNetworkForTests, setOnline } from "../services/network";
import { quranAudioUrl } from "../services/quranAudio";
import { fitsRecitation } from "../ui/lesson/RecitedAyah";
import { hifzAyahs, memorizeParts } from "../ui/lesson/reciteQuestion";
import { MemorizeSheet, resetMemorizeSheetForTests, type MemorizeSheetRow } from "../ui/screens/MemorizeSheet";

// Round 10 of "make the app better and more fun": each surah in Memorize surahs has its own page, to listen to it
// ayah by ayah before practising it. The reciter goes from one ayah to the next with its words lighting up, and with
// "Each ayah 3 times" says each one three times, so the learner can say it after him. Nothing plays by itself.

const url = (key: string) => quranAudioUrl(`Quran ${key}`) as string;
const rows: MemorizeSheetRow[] = memorizeParts().map((part) => ({
  id: part.id,
  surah: part.surah,
  title: `Surah ${part.surah}`,
  line: `${part.to - part.from + 1} ayahs`,
  stars: part.id === "112" ? 2 : 0,
  ayahs: hifzAyahs(part),
  surahAyahs: part.ayahs
}));

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}
const emit = async (status: Status) => {
  await act(async () => mockPlayers[0].emit(status));
};
/** The reciter is `seconds` into the ayah, and the lights have caught up. */
const at = async (seconds: number) => {
  mockPlayers[0].currentTime = seconds;
  await act(async () => {
    jest.advanceTimersByTime(130);
  });
};
const playing = () => emit({ playing: true, didJustFinish: false });
const finished = () => emit({ playing: false, didJustFinish: true });
/** The ayah card the reciter is on, by its number; undefined when none is. */
const current = () =>
  [1, 2, 3, 4, 5, 6, 7].find((number) => screen.queryByTestId(`memorize-ayah-${number}`)?.props.accessibilityState?.selected);

describe("a surah's ayahs", () => {
  it("come from the app's own Quran text, in order, each with its recitation and lights for its words", () => {
    for (const part of memorizeParts()) {
      const ayahs = hifzAyahs(part);
      expect(ayahs).toHaveLength(part.to - part.from + 1);
      ayahs.forEach((ayah, index) => {
        const key = `${part.surah}:${part.from + index}`;
        expect(ayah).toEqual({ key, text: QURAN_AYAHS[key], url: url(key) });
        expect(fitsRecitation(ayah.text, [ayah])).toBe(true);
      });
    }
  });
});

describe("a surah's page in Memorize surahs", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    resetAyahPlayerForTests();
    resetMemorizeSheetForTests();
    resetNetworkForTests();
    mockPlayers.length = 0;
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  const open = async (id = "112", onStart = jest.fn(), onClose = jest.fn()) => {
    const view = await render(<MemorizeSheet visible onClose={onClose} rows={rows} onStart={onStart} />);
    await press(`memorize-${id}`);
    return { onStart, onClose, view };
  };

  it("lists the surah's ayahs, goes back to the surahs, and starts the questions only with Practice", async () => {
    const { onStart } = await open();
    expect(screen.getByTestId("memorize-page")).toBeTruthy();
    expect(screen.getByText("Surah 112")).toBeTruthy();
    expect(screen.getByTestId("memorize-page-stars")).toBeTruthy();
    for (let number = 1; number <= 4; number += 1) {
      expect(screen.getByTestId(`memorize-ayah-${number}`).props.accessibilityLabel).toBe(`Ayah ${number} of 4`);
      expect(screen.getByTestId(`memorize-ayah-text-${number}`)).toHaveTextContent(QURAN_AYAHS[`112:${number}`]);
    }
    expect(screen.queryByTestId("memorize-ayah-5")).toBeNull();
    expect(screen.getByTestId("memorize-listen-credit")).toHaveTextContent("Recited by Mishary Alafasy · Word timing: quran-align (CC BY 4.0)");
    // Nothing plays by itself.
    expect(mockPlayers).toHaveLength(0);
    expect(current()).toBeUndefined();

    await press("memorize-back");
    expect(screen.queryByTestId("memorize-page")).toBeNull();
    expect(screen.getByText("Memorize surahs")).toBeTruthy();
    expect(onStart).not.toHaveBeenCalled();

    // A part of a longer surah lists its own ayahs, numbered as in the surah.
    await press("memorize-92:11-21");
    expect(screen.getByTestId("memorize-ayah-11").props.accessibilityLabel).toBe("Ayah 11 of 21");
    expect(screen.getByTestId("memorize-ayah-21")).toBeTruthy();
    expect(screen.queryByTestId("memorize-ayah-10")).toBeNull();
    await press("memorize-practice");
    expect(onStart).toHaveBeenCalledWith("92:11-21");
  });

  it("Listen goes through the surah ayah by ayah, its words lighting up, and ends after the last one", async () => {
    await open();
    await press("memorize-listen");
    expect(mockPlayers[0].source).toBe(url("112:1"));
    expect(screen.getByTestId("memorize-listen").props.accessibilityLabel).toBe("Stop");
    expect(current()).toBe(1);
    await playing();
    expect(screen.getByTestId("memorize-sound-bars")).toBeTruthy();
    // 112:1, its third word (0.80 to 1.65 s), lights up in the first card only.
    await at(1);
    expect(screen.getAllByTestId("recited-word")).toHaveLength(1);
    expect(screen.getByTestId("recited-word")).toHaveTextContent(QURAN_AYAHS["112:1"].split(" ")[2]);

    for (const next of [2, 3, 4]) {
      await finished();
      expect(mockPlayers[0].source).toBe(url(`112:${next}`));
      expect(current()).toBe(next);
      await playing();
    }
    await finished();
    // The last ayah ended: the surah is done, and Listen can start it again.
    expect(mockPlayers[0].play).toHaveBeenCalledTimes(4);
    expect(current()).toBeUndefined();
    expect(screen.getByTestId("memorize-listen").props.accessibilityLabel).toBe("Listen");
    expect(screen.queryByTestId("recited-word")).toBeNull();
  });

  it("with Each ayah 3 times, the reciter says each ayah three times before the next, and it stays on", async () => {
    await open();
    await press("memorize-repeat");
    expect(screen.getByTestId("memorize-repeat").props.accessibilityState.checked).toBe(true);
    await press("memorize-listen");
    await playing();
    expect(screen.getByTestId("memorize-repeat-dots")).toBeTruthy();
    for (let time = 2; time <= 3; time += 1) {
      await finished();
      expect(mockPlayers[0].source).toBe(url("112:1"));
      expect(mockPlayers[0].play).toHaveBeenCalledTimes(time);
      await playing();
    }
    await finished();
    expect(mockPlayers[0].source).toBe(url("112:2"));
    expect(current()).toBe(2);

    // Turned off while an ayah plays: it is not said again, and the reciter goes on.
    await press("memorize-repeat");
    await playing();
    await finished();
    expect(mockPlayers[0].source).toBe(url("112:3"));

    // Kept on for the next surah when left on.
    await press("memorize-repeat");
    await press("memorize-back");
    await press("memorize-113");
    expect(screen.getByTestId("memorize-repeat").props.accessibilityState.checked).toBe(true);
  });

  it("an ayah tapped is recited, then the ayahs after it; Stop stops with nothing after", async () => {
    await open();
    await press("memorize-ayah-3");
    expect(mockPlayers[0].source).toBe(url("112:3"));
    expect(current()).toBe(3);
    await playing();
    await press("memorize-listen");
    expect(mockPlayers[0].pause).toHaveBeenCalled();
    expect(current()).toBeUndefined();
    expect(screen.getByTestId("memorize-listen").props.accessibilityLabel).toBe("Listen");
    await finished();
    expect(mockPlayers[0].source).toBe(url("112:3"));

    await press("memorize-ayah-3");
    await playing();
    await finished();
    expect(mockPlayers[0].source).toBe(url("112:4"));

    // Another recitation starting (anywhere) ends the surah's.
    await act(async () => playAyah(url("1:1")));
    expect(current()).toBeUndefined();
    expect(screen.getByTestId("memorize-listen").props.accessibilityLabel).toBe("Listen");
  });

  it("with no internet, an ayah not saved on the phone says so", async () => {
    await open();
    await act(async () => setOnline(false));
    await press("memorize-listen");
    expect(current()).toBeUndefined();
    expect(screen.getByTestId("memorize-listen-error")).toHaveTextContent("No internet. This is not saved on your phone yet.");
    expect(screen.getByTestId("memorize-listen").props.accessibilityLabel).toBe("Listen");
  });

  it("Practice, Back and closing the sheet each stop the reciter", async () => {
    const { onStart, view } = await open();
    await press("memorize-listen");
    await playing();
    await press("memorize-practice");
    expect(onStart).toHaveBeenCalledWith("112");
    expect(mockPlayers[0].pause).toHaveBeenCalledTimes(1);

    await press("memorize-listen");
    await playing();
    await press("memorize-back");
    expect(mockPlayers[0].pause).toHaveBeenCalledTimes(2);

    await press("memorize-112");
    await press("memorize-listen");
    await playing();
    await act(async () => {
      view.rerender(<MemorizeSheet visible={false} onClose={jest.fn()} rows={rows} onStart={onStart} />);
    });
    expect(mockPlayers[0].pause).toHaveBeenCalledTimes(3);
  });
});
