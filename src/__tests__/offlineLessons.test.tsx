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

import { Linking } from "react-native";
import { LESSONS_BY_ID, allNodes } from "../data/course";
import { localAyahUri, resetQuranPackForTests, saveAyahForOffline } from "../services/offlineAudio";
import { getAyahPlayback, playAyah, resetAyahPlayerForTests } from "../services/ayahPlayer";
import { openWebPage, readsOnline, resetNetworkForTests, setOfflineLinkNotice, setOnline } from "../services/network";
import { lessonAyahUrls, lessonIdsAhead, missingAyahUrlsAhead, resetOfflineLessonsForTests, saveLessonsAhead } from "../services/offlineLessons";
import { AyahListen } from "../ui/lesson/AyahListen";
import { OfflineBanner } from "../ui/screens/OfflineBanner";

const FATIHAH_2 = "https://cdn.islamic.network/quran/audio/128/ar.alafasy/2.mp3";

// A circle whose lesson recites an ayah, with more such circles after it in the same topic.
const withAudio = allNodes.findIndex(
  (node, index) =>
    node.lessonIds.some((id) => lessonAyahUrls(LESSONS_BY_ID[id]).length > 0) &&
    allNodes.slice(index + 1, index + 3).every((next) => next.topicId === node.topicId)
);
const START = allNodes[withAudio];

beforeEach(() => {
  mockFiles.clear();
  mockDownload.mockReset();
  mockDownload.mockImplementation(() => Promise.resolve());
  mockCreatePlayer.mockClear();
  resetQuranPackForTests();
  resetAyahPlayerForTests();
  resetOfflineLessonsForTests();
  resetNetworkForTests(true);
});

describe("knowing when there is no internet", () => {
  test("connected counts as online unless the phone knows the internet cannot be reached", () => {
    expect(readsOnline({ isConnected: true, isInternetReachable: true })).toBe(true);
    expect(readsOnline({ isConnected: true, isInternetReachable: null })).toBe(true);
    expect(readsOnline({ isConnected: true, isInternetReachable: false })).toBe(false);
    expect(readsOnline({ isConnected: false })).toBe(false);
    expect(readsOnline(undefined)).toBe(true);
  });

  test("a web page opens online, and says so in the app offline", () => {
    const open = jest.spyOn(Linking, "openURL").mockResolvedValue(true);
    const notice = jest.fn();
    setOfflineLinkNotice(notice);
    openWebPage("https://sunnah.com/bukhari:1");
    expect(open).toHaveBeenCalledWith("https://sunnah.com/bukhari:1");
    open.mockClear();
    setOnline(false);
    openWebPage("https://sunnah.com/bukhari:1");
    expect(open).not.toHaveBeenCalled();
    expect(notice).toHaveBeenCalledWith("https://sunnah.com/bukhari:1");
    open.mockRestore();
  });
});

describe("Quran audio with no internet", () => {
  test("an ayah saved on the phone still plays", async () => {
    await saveAyahForOffline(FATIHAH_2);
    setOnline(false);
    playAyah(FATIHAH_2);
    expect(mockCreatePlayer).toHaveBeenCalledTimes(1);
    expect(getAyahPlayback().status).toBe("loading");
  });

  test("an ayah not saved says so at once instead of trying the internet", () => {
    setOnline(false);
    playAyah(FATIHAH_2);
    expect(mockCreatePlayer).not.toHaveBeenCalled();
    expect(getAyahPlayback()).toMatchObject({ url: FATIHAH_2, status: "error" });
  });

  test("Listen tells the learner it is not saved yet", async () => {
    setOnline(false);
    await render(<AyahListen url={FATIHAH_2} accent="#58CC02" />);
    await fireEvent.press(screen.getByTestId("ayah-listen-play"));
    expect(screen.getByTestId("ayah-listen-error")).toHaveTextContent("No internet. This is not saved on your phone yet.");
  });
});

describe("saving the next lessons ahead", () => {
  test("a lesson's recitations come from its ayah quote and source", () => {
    expect(lessonAyahUrls({ quote: { text: "x", reference: "Quran 1:2" }, learnSource: undefined })).toEqual([FATIHAH_2]);
    expect(lessonAyahUrls({ quote: { text: "x", reference: "Quran 1:2-3" }, learnSource: undefined })).toEqual([]);
    expect(lessonAyahUrls(undefined)).toEqual([]);
  });

  test("covers the circle and the next ones in the same topic only", () => {
    expect(START).toBeDefined();
    const ids = lessonIdsAhead(START.id, 2);
    expect(ids.slice(0, START.lessonIds.length)).toEqual(START.lessonIds);
    const topics = new Set(ids.map((id) => allNodes.find((node) => node.lessonIds.includes(id))?.topicId));
    expect([...topics]).toEqual([START.topicId]);
    expect(lessonIdsAhead("no-such-circle")).toEqual([]);
  });

  test("saves every recitation ahead once, while online", async () => {
    const missing = missingAyahUrlsAhead(START.id);
    expect(missing.length).toBeGreaterThan(0);
    const [first, second] = await Promise.all([saveLessonsAhead(START.id), saveLessonsAhead(START.id)]);
    expect(first).toBe(missing.length);
    expect(second).toBe(0);
    expect(mockDownload).toHaveBeenCalledTimes(missing.length);
    missing.forEach((url) => expect(localAyahUri(url)).not.toBeNull());
    expect(missingAyahUrlsAhead(START.id)).toEqual([]);
  });

  test("saves nothing with no internet", async () => {
    setOnline(false);
    expect(await saveLessonsAhead(START.id)).toBe(0);
    expect(mockDownload).not.toHaveBeenCalled();
  });
});

test("the path says lessons still work offline", async () => {
  await render(<OfflineBanner />);
  expect(screen.getByTestId("offline-banner-line")).toHaveTextContent("No internet. Lessons still work, and your progress is saved on this phone.");
});
