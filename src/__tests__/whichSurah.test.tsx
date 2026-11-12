jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);
jest.mock("expo-speech", () => ({
  getAvailableVoicesAsync: jest.fn(async () => []),
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
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import TopicApp from "../TopicApp";
import {
  createWhichSurahSession,
  localDateKey,
  loseHeart,
  PRACTICE_XP_PER_CORRECT_ANSWER,
  WHICH_SURAH_ID,
  WHICH_SURAH_TITLE
} from "../api/islamicLearningApi";
import { allNodes } from "../data/course";
import { QURAN_AYAHS } from "../data/quranAyahs";
import { SURAH_NAMES } from "../data/surahMeanings";
import { getStoredItem, removeStoredItem, setStoredItem } from "../services/appStorage";
import { arabicLetters } from "../services/arabicVoice";
import { playAyah } from "../services/ayahPlayer";
import { ayahPieces } from "../services/ayahWords";
import { translateStudyText } from "../services/contentLocalization";
import { clearActiveAssessment } from "../services/localProgress";
import { memorizeStars, resetMemorizeForTests } from "../services/memorizeSurahs";
import { resetNetworkForTests, setOnline } from "../services/network";
import { quranAudioUrl } from "../services/quranAudio";
import type { Challenge, UserProfile } from "../types";
import { listenWhy } from "../ui/lesson/listenQuestion";
import {
  memorizeParts,
  memorizeSurahNumbers,
  WHICH_SURAH_PROMPT,
  WHICH_SURAH_QUESTIONS,
  whichSurahAyahs,
  whichSurahChallenges
} from "../ui/lesson/reciteQuestion";
import { MemorizeSheet } from "../ui/screens/MemorizeSheet";
import { makeUser } from "./testUtils";

// Round 11 of "make the app better and more fun": "Which surah is it?" at the top of Memorize surahs. The reciter
// recites an ayah (the learner taps the speaker; its words are beads until the answer), and the learner taps the
// surah it is from. Each try goes on to the next 8 surahs, and each surah to the next of its ayahs.

const PROFILE_KEY = "sira-path-user-profile";
const hearts = (current: number) => ({ current, max: 5, unlimited: false, lastRefillDate: localDateKey() });
const savedUser = () => JSON.parse(getStoredItem(PROFILE_KEY) ?? "{}") as UserProfile;
const name = (surah: number) => `Surah ${SURAH_NAMES[surah - 1]}`;
const right = (challenge: Challenge) => challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)!.label;
const labels = (challenge: Challenge) => challenge.choices.map((choice) => choice.label);
const surahOf = (challenge: Challenge) => Number(challenge.listen!.which!.key.split(":")[0]);
const ayahsIn = (surah: number) => Object.keys(QURAN_AYAHS).filter((key) => key.startsWith(`${surah}:`)).length;

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

describe("which surah is it? (the questions)", () => {
  it("plays an ayah of a surah to memorize, with its recitation and source, and asks its surah out of three", () => {
    const questions = whichSurahChallenges(0);
    expect(questions).toHaveLength(WHICH_SURAH_QUESTIONS);
    // The first try: the 8 best-known surahs (Al-Fatihah, then An-Nas back to Al-Kawthar), each once, mixed up.
    expect(questions.map(surahOf).sort((a, b) => a - b)).toEqual([1, 108, 109, 110, 111, 112, 113, 114]);
    expect(questions.map(surahOf)).not.toEqual([1, 114, 113, 112, 111, 110, 109, 108]);
    const list = memorizeSurahNumbers();
    for (const question of questions) {
      const surah = surahOf(question);
      const key = question.listen!.which!.key;
      expect(question.type).toBe("multiple_choice");
      expect(question.prompt).toBe(WHICH_SURAH_PROMPT);
      expect(question.listen!.ar).toBe(QURAN_AYAHS[key]);
      expect(question.listen!.recitation).toBe(quranAudioUrl(`Quran ${key}`));
      expect(question.listen!.which!.ayahs).toBe(ayahsIn(surah));
      expect(question.listen!.recite).toBeUndefined();
      expect(question.source?.reference).toBe(`Quran ${key}`);
      expect(question.source?.summary).toBe(QURAN_AYAHS[key]);
      // Three different surahs: the right one and two near it in the list, which sound most alike.
      expect(right(question)).toBe(name(surah));
      expect(new Set(labels(question)).size).toBe(3);
      const wrongs = question.choices.filter((choice) => choice.id !== question.correctChoiceId).map((choice) => SURAH_NAMES.indexOf(choice.label.replace("Surah ", "")) + 1);
      // Two of the four nearest it (at the ends of the list, those are on one side).
      const near = Math.min(list.indexOf(surah), list.length - 1 - list.indexOf(surah)) >= 2 ? 2 : 4;
      wrongs.forEach((other) => {
        expect(list).toContain(other);
        expect(Math.abs(list.indexOf(other) - list.indexOf(surah))).toBeLessThanOrEqual(near);
      });
      // No Why line: once answered, the ayah shows on its card and its chip says where it is.
      expect(listenWhy(question, "en")).toBe("");
    }
  });

  it("only plays an ayah that one surah to memorize has: never one another of them says too", () => {
    const surahs = memorizeSurahNumbers();
    expect(surahs).toEqual([...new Set(memorizeParts().map((part) => part.surah))]);
    const letters = new Map(surahs.map((surah) => [surah, Array.from({ length: ayahsIn(surah) }, (_, index) => arabicLetters(QURAN_AYAHS[`${surah}:${index + 1}`]))]));
    for (const surah of surahs) {
      const fair = whichSurahAyahs(surah);
      // Every surah has ayahs to play, most of them all of theirs.
      expect(fair.length).toBeGreaterThanOrEqual(2);
      for (const ayah of fair) {
        const mine = letters.get(surah)![ayah - 1];
        expect(ayahPieces(QURAN_AYAHS[`${surah}:${ayah}`]).words).toBeGreaterThanOrEqual(2);
        const shared = surahs
          .filter((other) => other !== surah)
          .flatMap((other) => letters.get(other)!.flatMap((theirs, index) => (theirs.includes(mine) || mine.includes(theirs) ? [`${other}:${index + 1}`] : [])));
        expect(shared).toEqual([]);
      }
    }
    // "By the night when it covers" (Al-Layl 1) is held in Ash-Shams 4, and Al-'Asr 1 and Ad-Duhaa 1 are one word each.
    expect(whichSurahAyahs(92)).not.toContain(1);
    expect(whichSurahAyahs(91)).not.toContain(4);
    expect(whichSurahAyahs(103)).toEqual([2, 3]);
    expect(whichSurahAyahs(93)).not.toContain(1);
    // Al-Kafirun's ayah said twice in it (3 and 5) is fine: either way it is Al-Kafirun.
    expect(whichSurahAyahs(109)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("goes on to the next 8 surahs each try, so all come round, and each time to the next of a surah's ayahs", () => {
    const surahs = memorizeSurahNumbers();
    const tries = Array.from({ length: 30 }, (_, attempt) => whichSurahChallenges(attempt));
    // Three tries go through all 21 surahs (and 3 again).
    expect(new Set(tries.slice(0, 3).flat().map(surahOf)).size).toBe(surahs.length);
    tries.forEach((questions) => expect(new Set(questions.map(surahOf)).size).toBe(WHICH_SURAH_QUESTIONS));
    expect(tries[1].map(surahOf).sort((a, b) => a - b)).toEqual([95, 97, 99, 100, 103, 105, 106, 107]);
    // A surah plays each of its ayahs in turn before any again.
    for (const surah of surahs) {
      const played = tries.flat().filter((question) => surahOf(question) === surah).map((question) => Number(question.listen!.which!.key.split(":")[1]));
      const fair = whichSurahAyahs(surah);
      const first = played.slice(0, fair.length);
      expect(new Set(first).size).toBe(first.length);
      played.forEach((ayah, index) => expect(ayah).toBe(fair[(fair.indexOf(played[0]) + index) % fair.length]));
    }
    // The same try is the same questions (so the app can say what it asked).
    expect(whichSurahChallenges(4).map((question) => question.id)).toEqual(tries[4].map((question) => question.id));
  });
});

describe("which surah is it? (the session)", () => {
  it("costs no hearts, pays practice XP, and wears the Quran lessons' colors", () => {
    const user = makeUser({ hearts: hearts(1) });
    const session = createWhichSurahSession(user)!;
    expect(session.mode).toBe("lesson_practice");
    expect(session.whichSurah).toBe(true);
    expect(session.memorize).toBeUndefined();
    expect(session.lesson.title).toBe(WHICH_SURAH_TITLE);
    expect(session.lesson.challenges).toHaveLength(WHICH_SURAH_QUESTIONS);
    expect(session.lesson.xpReward).toBe(WHICH_SURAH_QUESTIONS * PRACTICE_XP_PER_CORRECT_ANSWER);
    expect(allNodes.find((node) => node.id === session.lesson.nodeId)?.topicId).toBe("quran_tafseer");
    expect(loseHeart(user, session).hearts.current).toBe(1);
    // Each source is its ayah, once.
    expect(session.lesson.sources.map((source) => source.reference)).toEqual(session.lesson.challenges.map((question) => `Quran ${question.listen!.which!.key}`));
  });

  it("is said in Bengali, Urdu and Arabic: its name, its line, its question and every surah's name", () => {
    const names = memorizeSurahNumbers().map(name);
    for (const language of ["bn", "ur", "ar"] as const) {
      for (const text of [WHICH_SURAH_TITLE, "Hear an ayah, tap its surah", WHICH_SURAH_PROMPT, ...names]) {
        expect(translateStudyText(text, language)).not.toBe(text);
      }
    }
  });
});

describe("which surah is it? (in Memorize surahs)", () => {
  it("sits at the top of the surahs, with its stars, and starts at a tap", async () => {
    const onStart = jest.fn();
    const onWhich = jest.fn();
    const rows = [{ id: "112", surah: 112, title: "Surah Al-Ikhlas", line: "4 ayahs", stars: 0, ayahs: [], surahAyahs: 4 }];
    await render(<MemorizeSheet visible onClose={() => undefined} rows={rows} onStart={onStart} which={{ stars: 2, onStart: onWhich }} />);
    expect(screen.getByTestId("memorize-which").props.accessibilityLabel).toBe("Which surah is it?, Hear an ayah, tap its surah, 2 of 3 stars");
    await press("memorize-which");
    expect(onWhich).toHaveBeenCalledTimes(1);
    expect(onStart).not.toHaveBeenCalled();
    // Without it, the list is just the surahs.
    await render(<MemorizeSheet visible onClose={() => undefined} rows={rows} onStart={onStart} />);
    expect(screen.queryByTestId("memorize-which")).toBeNull();
  });
});

describe("which surah is it? (Practice tab)", () => {
  afterEach(() => {
    removeStoredItem(PROFILE_KEY);
    clearActiveAssessment();
    resetMemorizeForTests();
    resetNetworkForTests();
    jest.mocked(playAyah).mockClear();
  });

  async function openSurahs(user: UserProfile) {
    setStoredItem(PROFILE_KEY, JSON.stringify(user));
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    await press("tab-practice");
    await press("practice-memorize");
    expect(screen.getByTestId("memorize-sheet")).toBeTruthy();
  }
  const shown = (questions: Challenge[]) => questions.find((item) => item.choices.every((choice) => screen.queryByTestId(`choice-${choice.id}`)))!;

  it("plays 8 ayahs with no hearts left, hides each ayah until the answer, keeps its stars, and goes back to the surahs", async () => {
    const user = makeUser({ hearts: hearts(0), reviewHeartRestoreUsed: true, totalXp: 100 });
    const questions = createWhichSurahSession(user, 0)!.lesson.challenges;
    await openSurahs(user);
    await press("memorize-which");
    expect(screen.getByTestId("exercise-view")).toBeTruthy();
    expect(screen.getByText(WHICH_SURAH_PROMPT)).toBeTruthy();

    for (let step = 0; step < questions.length; step += 1) {
      const question = shown(questions);
      const key = question.listen!.which!.key;
      // The ayah is heard, not read: beads, one for each of its words, and nothing plays by itself.
      expect(screen.queryByTestId("which-ayah")).toBeNull();
      expect(screen.queryByTestId("which-place")).toBeNull();
      // (The beads are hidden from screen readers: Listen and its hint say it.)
      expect(screen.getByTestId("which-beads", { includeHiddenElements: true }).props.children).toHaveLength(ayahPieces(QURAN_AYAHS[key]).words);
      expect(playAyah).not.toHaveBeenCalledWith(question.listen!.recitation, expect.anything());
      await press("which-play");
      expect(playAyah).toHaveBeenLastCalledWith(question.listen!.recitation, { once: true });
      await press(`choice-${question.correctChoiceId}`);
      await press("exercise-check");
      // Answered: the ayah shows, and which ayah of its surah it is.
      expect(screen.queryByTestId("which-beads", { includeHiddenElements: true })).toBeNull();
      expect(screen.getByTestId("which-ayah")).toBeTruthy();
      expect(screen.getByTestId("which-place").props.children).toBe(`Ayah ${key.split(":")[1]} of ${question.listen!.which!.ayahs}`);
      await press("feedback-continue");
    }

    expect(await screen.findByTestId("lesson-complete")).toBeTruthy();
    expect(screen.getByText("Every surah right!")).toBeTruthy();
    expect(screen.getByText("Which surah is it?")).toBeTruthy();
    expect(memorizeStars()).toEqual({ [WHICH_SURAH_ID]: 3 });
    expect(savedUser().hearts.current).toBe(0);
    expect(savedUser().totalXp).toBe(100 + questions.length * PRACTICE_XP_PER_CORRECT_ANSWER);

    // CONTINUE: back to Memorize surahs, its stars on its row; no surah counts as memorized for it.
    await press("complete-continue");
    if (screen.queryByTestId("streak-moment-continue")) await press("streak-moment-continue");
    expect(screen.getByTestId("practice-hub")).toBeTruthy();
    expect(screen.getByTestId("memorize-which").props.accessibilityLabel).toContain("3 of 3 stars");
    expect(screen.queryByTestId("practice-memorize-done")).toBeNull();

    // The next try plays the next 8 surahs.
    await press("memorize-which");
    expect(shown(createWhichSurahSession(user, 1)!.lesson.challenges)).toBeTruthy();
    expect(shown(questions)).toBeUndefined();
  });

  it("on a wrong surah, names the right one with the ayah's source, and asks it again at the end", async () => {
    const user = makeUser();
    const questions = createWhichSurahSession(user, 0)!.lesson.challenges;
    await openSurahs(user);
    await press("memorize-which");
    const first = shown(questions);
    const miss = first.choices.find((choice) => choice.id !== first.correctChoiceId)!;
    await press(`choice-${miss.id}`);
    await press("exercise-check");
    expect(String(screen.getByTestId("feedback-answer").props.children).replace(/\u2060/g, "")).toBe(right(first));
    expect(screen.queryByTestId("feedback-why")).toBeNull();
    expect(screen.getByTestId("feedback-source")).toBeTruthy();
    expect(screen.getByTestId("which-ayah")).toBeTruthy();
    await press("feedback-continue");

    for (let step = 0; step < questions.length; step += 1) {
      const question = shown(questions);
      await press(`choice-${question.correctChoiceId}`);
      await press("exercise-check");
      await press("feedback-continue");
    }
    expect(await screen.findByTestId("lesson-complete")).toBeTruthy();
    expect(screen.getByText("Practice done!")).toBeTruthy();
    expect(memorizeStars()).toEqual({ [WHICH_SURAH_ID]: 2 });
  });

  it("needs the reciter: with no internet and the ayahs not saved on the phone, it does not start", async () => {
    await openSurahs(makeUser());
    await act(async () => setOnline(false));
    await press("memorize-which");
    expect(screen.queryByTestId("exercise-view")).toBeNull();
    expect(await screen.findByText("No internet. This is not saved on your phone yet.")).toBeTruthy();
  });
});
