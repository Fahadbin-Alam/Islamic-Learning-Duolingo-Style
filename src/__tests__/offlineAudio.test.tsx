import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { QURAN_AYAHS } from "../data/quranAyahs";

// A small fake of the phone's file storage: a map from file uri to its size.
const mockFiles = new Map<string, number>();
const mockDownload = jest.fn<Promise<void>, [string]>(() => Promise.resolve());
jest.mock("expo-file-system", () => {
  const join = (parts: unknown[]) => parts.map((part) => (typeof part === "string" ? part : (part as { uri: string }).uri)).join("/");
  class Directory {
    uri: string;
    constructor(...parts: unknown[]) {
      this.uri = join(parts);
    }
    get exists() {
      return [...mockFiles.keys()].some((uri) => uri.startsWith(`${this.uri}/`));
    }
    create() {}
    delete() {
      [...mockFiles.keys()].filter((uri) => uri.startsWith(`${this.uri}/`)).forEach((uri) => mockFiles.delete(uri));
    }
  }
  class File {
    uri: string;
    constructor(...parts: unknown[]) {
      this.uri = join(parts);
    }
    get name() {
      return this.uri.slice(this.uri.lastIndexOf("/") + 1);
    }
    get exists() {
      return mockFiles.has(this.uri);
    }
    get size() {
      return mockFiles.get(this.uri) ?? 0;
    }
    delete() {
      mockFiles.delete(this.uri);
    }
    move(destination: File) {
      mockFiles.set(destination.uri, mockFiles.get(this.uri) ?? 0);
      mockFiles.delete(this.uri);
      this.uri = destination.uri;
    }
    static async downloadFileAsync(url: string, destination: File) {
      await mockDownload(url);
      mockFiles.set(destination.uri, 100_000);
      return destination;
    }
  }
  return { Directory, File, Paths: { document: new Directory("file:///docs") } };
});

type Status = { playing: boolean; didJustFinish: boolean; isLoaded?: boolean; duration?: number };
const mockCreatePlayer = jest.fn();
jest.mock("expo-audio", () => ({
  setAudioModeAsync: () => Promise.resolve(),
  createAudioPlayer: (source: string) => {
    let listener: (status: Status) => void = () => undefined;
    const player = {
      source,
      loop: false,
      play: jest.fn(),
      pause: jest.fn(),
      replace: jest.fn((next: string) => {
        player.source = next;
      }),
      seekTo: jest.fn(() => Promise.resolve()),
      addListener: jest.fn((_event: string, next: (status: Status) => void) => {
        listener = next;
        return { remove: jest.fn() };
      }),
      emit: (status: Status) => listener({ isLoaded: true, duration: 6, ...status })
    };
    mockCreatePlayer(player);
    return player;
  }
}));

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

import {
  downloadQuranPack,
  getQuranPack,
  localAyahUri,
  offlineAyahUrls,
  removeQuranPack,
  resetQuranPackForTests,
  saveAyahForOffline
} from "../services/offlineAudio";
import { playAyah, resetAyahPlayerForTests } from "../services/ayahPlayer";
import { SettingsSheet } from "../ui/screens/SettingsSheet";

const FATIHAH_2 = "https://cdn.islamic.network/quran/audio/128/ar.alafasy/2.mp3";
const SAVED_2 = "file:///docs/quran-audio-alafasy-128/2.mp3";

beforeEach(() => {
  mockFiles.clear();
  mockDownload.mockReset();
  mockDownload.mockImplementation(() => Promise.resolve());
  mockCreatePlayer.mockClear();
  resetQuranPackForTests();
  resetAyahPlayerForTests();
});

describe("saving recitations on the phone", () => {
  test("covers every ayah the app can recite, once each", () => {
    const urls = offlineAyahUrls();
    expect(urls).toHaveLength(Object.keys(QURAN_AYAHS).length);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls).toContain(FATIHAH_2);
  });

  test("a saved ayah has a local copy; others and other servers do not", async () => {
    expect(localAyahUri(FATIHAH_2)).toBeNull();
    expect(await saveAyahForOffline(FATIHAH_2)).toBe(true);
    expect(localAyahUri(FATIHAH_2)).toBe(SAVED_2);
    expect(await saveAyahForOffline("https://example.org/2.mp3")).toBe(false);
  });

  test("a failed download leaves no half file behind", async () => {
    mockDownload.mockRejectedValueOnce(new Error("offline"));
    expect(await saveAyahForOffline(FATIHAH_2)).toBe(false);
    expect(localAyahUri(FATIHAH_2)).toBeNull();
    expect([...mockFiles.keys()]).toEqual([]);
  });

  test("download all saves every ayah, resumes after an error, and remove clears them", async () => {
    const total = offlineAyahUrls().length;
    mockDownload.mockImplementation((url: string) => (url === FATIHAH_2 ? Promise.reject(new Error("offline")) : Promise.resolve()));

    await downloadQuranPack();
    expect(getQuranPack()).toMatchObject({ saved: total - 1, total, status: "error" });

    mockDownload.mockClear();
    mockDownload.mockImplementation(() => Promise.resolve());
    await downloadQuranPack();
    // Only the missing one is fetched again.
    expect(mockDownload.mock.calls.map(([url]) => url)).toEqual([FATIHAH_2]);
    expect(getQuranPack()).toMatchObject({ saved: total, total, status: "idle", bytes: total * 100_000 });

    removeQuranPack();
    expect(getQuranPack()).toMatchObject({ saved: 0, bytes: 0 });
  });
});

describe("playing with no internet", () => {
  test("a saved ayah plays from the phone", async () => {
    await saveAyahForOffline(FATIHAH_2);
    playAyah(FATIHAH_2);
    expect(mockCreatePlayer.mock.calls[0][0].source).toBe(SAVED_2);
  });

  test("an ayah that streamed is saved for next time", async () => {
    playAyah(FATIHAH_2);
    const player = mockCreatePlayer.mock.calls[0][0];
    expect(player.source).toBe(FATIHAH_2);
    await act(async () => {
      player.emit({ playing: true, didJustFinish: false });
    });
    expect(mockDownload).toHaveBeenCalledWith(FATIHAH_2);
    expect(localAyahUri(FATIHAH_2)).toBe(SAVED_2);
  });
});

describe("Settings row", () => {
  const sheet = () => (
    <SettingsSheet
      visible
      streakReminder
      islamicReminder
      dailyCheckIn
      weeklyCheckIn
      soundEnabled
      softSound={false}
      onSelectRole={jest.fn()}
      onToggleStreak={jest.fn()}
      onToggleIslamic={jest.fn()}
      onToggleDaily={jest.fn()}
      onToggleWeekly={jest.fn()}
      onToggleSound={jest.fn()}
      onToggleSoftSound={jest.fn()}
      onSave={jest.fn()}
      onClose={jest.fn()}
      guest
    />
  );

  test("saves the recitations, then offers to remove them", async () => {
    await render(sheet());
    expect(screen.getByTestId("settings-quran-offline-status")).toHaveTextContent("Listen with no internet");
    expect(screen.getByTestId("settings-quran-offline-action")).toHaveTextContent("Save");

    await fireEvent.press(screen.getByTestId("settings-quran-offline-action"));
    await act(async () => undefined);
    // Under 10 MB the size shows one decimal, from 10 MB on a whole number (QuranOfflineRow).
    const bytes = offlineAyahUrls().length * 100_000;
    const mb = (bytes / (1024 * 1024)).toFixed(bytes < 10 * 1024 * 1024 ? 1 : 0);
    expect(screen.getByTestId("settings-quran-offline-status")).toHaveTextContent(`Saved, ${mb} MB`);
    expect(screen.getByTestId("settings-quran-offline-action")).toHaveTextContent("Remove");

    await fireEvent.press(screen.getByTestId("settings-quran-offline-action"));
    await act(async () => undefined);
    expect(screen.getByTestId("settings-quran-offline-action")).toHaveTextContent("Save");
  });

  test("says when some could not be saved", async () => {
    mockDownload.mockRejectedValue(new Error("offline"));
    await render(sheet());
    await fireEvent.press(screen.getByTestId("settings-quran-offline-action"));
    await act(async () => undefined);
    expect(screen.getByTestId("settings-quran-offline-status")).toHaveTextContent("Some did not save. Check your internet.");
    expect(screen.getByTestId("settings-quran-offline-action")).toHaveTextContent("Try again");
  });
});
