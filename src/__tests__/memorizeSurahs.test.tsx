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
import { createMemorizeSession, localDateKey, loseHeart, PRACTICE_XP_PER_CORRECT_ANSWER } from "../api/islamicLearningApi";
import { allNodes, LESSONS_BY_ID } from "../data/course";
import { QURAN_AYAHS } from "../data/quranAyahs";
import { getStoredItem, removeStoredItem, setStoredItem } from "../services/appStorage";
import { arabicLetters } from "../services/arabicVoice";
import { ayahPieces } from "../services/ayahWords";
import { clearActiveAssessment } from "../services/localProgress";
import { memorizeStars, recordMemorized, resetMemorizeForTests } from "../services/memorizeSurahs";
import { resetNetworkForTests, setOnline } from "../services/network";
import type { Challenge, UserProfile } from "../types";
import { ReciteCard } from "../ui/lesson/ReciteCard";
import { hifzAyahs, hifzChallenges, memorizeParts, nextAyahChallenge, RECITE_NEXT_PROMPT, RECITE_PROMPT, type HifzPart } from "../ui/lesson/reciteQuestion";
import { MemorizeSheet } from "../ui/screens/MemorizeSheet";
import { makeUser } from "./testUtils";

// Round 9 of "make the app better and more fun", after the Quran's listening questions (rounds 6 to 8): Memorize
// surahs in Practice. A surah ayah by ayah with the reciter, the way a teacher hears a memorized surah: how its first
// ayah ends, then each ayah after it, in order.

const PROFILE_KEY = "sira-path-user-profile";
const hearts = (current: number) => ({ current, max: 5, unlimited: false, lastRefillDate: localDateKey() });
const savedUser = () => JSON.parse(getStoredItem(PROFILE_KEY) ?? "{}") as UserProfile;
const part = (id: string) => memorizeParts().find((item) => item.id === id)!;
const right = (challenge: Challenge) => challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)!.label;
const labels = (challenge: Challenge) => challenge.choices.map((choice) => choice.label);
const wrong = (challenge: Challenge) => labels(challenge).filter((label) => label !== right(challenge));
const lastWordOf = (text: string) => [...ayahPieces(text).pieces].reverse().find((piece) => piece.word >= 0)!.text;
const sameLetters = (a: string, b: string) => {
  const x = arabicLetters(a);
  const y = arabicLetters(b);
  return x.includes(y) || y.includes(x);
};

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

describe("memorize surahs (the questions)", () => {
  it("offers Al-Fatihah, then the short surahs from An-Nas back, a longer one in parts that meet", () => {
    const parts = memorizeParts();
    expect(parts.slice(0, 13).map((item) => item.id)).toEqual(["1", "114", "113", "112", "111", "110", "109", "108", "107", "106", "105", "104", "103"]);
    expect(parts.map((item) => item.id)).toEqual(expect.arrayContaining(["92:1-11", "92:11-21", "91:1-8", "91:8-15", "90:1-11", "90:11-20"]));
    // All of Juz 'Amma (An-Naba to An-Nas), but for the 3 surahs with an ayah too long to tap as an answer: An-Naba
    // (38 and 40), Al-Buruj (10 and 11) and Al-Bayyinah (5, 6 and 8).
    const juzAmma = Array.from({ length: 114 - 78 + 1 }, (_, index) => 114 - index);
    expect([...new Set(parts.map((item) => item.surah))]).toEqual([1, ...juzAmma.filter((surah) => ![78, 85, 98].includes(surah))]);
    // A long one comes in parts, such as 'Abasa (42 ayahs) in 5.
    expect(parts.filter((item) => item.surah === 80).map((item) => item.id)).toEqual(["80:1-9", "80:9-17", "80:17-26", "80:26-34", "80:34-42"]);
    // Al-Fatihah first, then the surahs in reverse order, each part of a surah after the one before it.
    const surahs = parts.slice(1).map((item) => item.surah);
    expect(surahs).toEqual([...surahs].sort((a, b) => b - a));
    for (const surah of new Set(parts.map((item) => item.surah))) {
      const own = parts.filter((item) => item.surah === surah);
      // The parts go through the whole surah, each starting on the ayah the one before ends on, at most 11 ayahs.
      expect(own[0].from).toBe(1);
      expect(own[own.length - 1].to).toBe(own[0].ayahs);
      own.slice(1).forEach((item, index) => expect(item.from).toBe(own[index].to));
      own.forEach((item) => expect(item.to - item.from + 1).toBeLessThanOrEqual(11));
      // The app shows every ayah of it.
      for (let ayah = 1; ayah <= own[0].ayahs; ayah += 1) expect(QURAN_AYAHS[`${surah}:${ayah}`]).toBeTruthy();
    }
  });

  it("goes through Al-Ikhlas in order: how its first ayah ends, then each ayah after it, saying which ayah each card is", () => {
    const questions = hifzChallenges(part("112"))!;
    expect(questions.map((question) => question.prompt)).toEqual([RECITE_PROMPT, RECITE_NEXT_PROMPT, RECITE_NEXT_PROMPT, RECITE_NEXT_PROMPT]);
    expect(questions.map((question) => question.listen!.recite!.key)).toEqual(["112:1", "112:1", "112:2", "112:3"]);
    expect(right(questions[0])).toBe(lastWordOf(QURAN_AYAHS["112:1"]));
    expect(questions[0].listen!.recite!.next).toBeUndefined();
    expect(questions.slice(1).map(right)).toEqual([QURAN_AYAHS["112:2"], QURAN_AYAHS["112:3"], QURAN_AYAHS["112:4"]]);
    expect(questions.every((question) => question.listen!.recite!.ayahs === 4)).toBe(true);
    expect(questions[3].source?.reference).toBe("Quran 112:3-4");
    expect(questions[3].listen!.recitation).toMatch(/\/6224\.mp3$/);
    expect(questions[3].listen!.recite!.next!.recitation).toMatch(/\/6225\.mp3$/);
  });

  it("is fair in every surah: three different answers, the right one the next ayah, short enough for a tile", () => {
    let asked = 0;
    for (const item of memorizeParts()) {
      const questions = hifzChallenges(item)!;
      // A part is gone through whole: one question for each ayah after its first.
      expect(questions.filter((question) => question.listen!.recite!.next)).toHaveLength(item.to - item.from);
      for (const question of questions) {
        const recite = question.listen!.recite!;
        const [surah, ayah] = recite.key.split(":").map(Number);
        expect(question.listen!.ar).toBe(QURAN_AYAHS[recite.key]);
        expect(question.choices).toHaveLength(3);
        labels(question).forEach((label, index) => labels(question).slice(index + 1).forEach((other) => expect(sameLetters(label, other)).toBe(false)));
        if (!recite.next) {
          expect(right(question)).toBe(lastWordOf(question.listen!.ar));
          continue;
        }
        asked += 1;
        expect(right(question)).toBe(QURAN_AYAHS[`${surah}:${ayah + 1}`]);
        expect(right(question).length).toBeLessThanOrEqual(110);
        wrong(question).forEach((label) => expect(label.length).toBeLessThanOrEqual(90));
        // Never an ayah that follows these same words elsewhere in the surah.
        const followers = Object.keys(QURAN_AYAHS)
          .filter((key) => key.startsWith(`${surah}:`) && key !== recite.key && arabicLetters(QURAN_AYAHS[key]) === arabicLetters(question.listen!.ar))
          .map((key) => QURAN_AYAHS[`${surah}:${Number(key.split(":")[1]) + 1}`]);
        followers.forEach((follower) => expect(wrong(question)).not.toContain(follower));
      }
    }
    expect(asked).toBeGreaterThan(140);
  });

  it("asks Al-Kafirun's repeated ayah in order: after ayah 3 comes 4, after ayah 5 comes 6, never the other one", () => {
    const questions = hifzChallenges(part("109"))!;
    const after = (ayah: number) => questions.find((question) => question.listen!.recite!.next && question.listen!.recite!.key === `109:${ayah}`)!;
    expect(right(after(3))).toBe(QURAN_AYAHS["109:4"]);
    expect(labels(after(3))).not.toContain(QURAN_AYAHS["109:6"]);
    expect(right(after(5))).toBe(QURAN_AYAHS["109:6"]);
    expect(labels(after(5))).not.toContain(QURAN_AYAHS["109:4"]);
    // On the card it says which time it is.
    expect(after(5).listen!.recite!.ayahs).toBe(6);
    // A lesson, out of order, still never asks what comes after it.
    const lesson = { ...LESSONS_BY_ID[Object.keys(LESSONS_BY_ID)[0]], id: "kafirun-3", quote: { text: QURAN_AYAHS["109:3"], reference: "Quran 109:3" } };
    expect(nextAyahChallenge(lesson)).toBeUndefined();
  });

  it("takes a wrong ayah from the surah next to a surah of three, and lets Al-'Asr's long last ayah be the answer", () => {
    const kawthar = hifzChallenges(part("108"))!.find((question) => question.listen!.recite!.next)!;
    expect(wrong(kawthar)).toContain(QURAN_AYAHS["108:3"]);
    expect(wrong(kawthar).some((label) => Object.keys(QURAN_AYAHS).some((key) => key.startsWith("109:") && QURAN_AYAHS[key] === label))).toBe(true);
    const asr = hifzChallenges(part("103"))!;
    // "وَٱلۡعَصۡرِ" is one word: nothing to stop before, so Al-'Asr starts with the ayah after it.
    expect(asr.map((question) => question.prompt)).toEqual([RECITE_NEXT_PROMPT, RECITE_NEXT_PROMPT]);
    expect(right(asr[1])).toBe(QURAN_AYAHS["103:3"]);
    expect(QURAN_AYAHS["103:3"].length).toBeGreaterThan(90);
  });
});

describe("memorize surahs (the session)", () => {
  it("goes through the surah with no hearts lost, pays practice XP and wears the Quran lesson's colors", () => {
    const user = makeUser({ hearts: hearts(1) });
    const session = createMemorizeSession(user, part("112"))!;
    expect(session.mode).toBe("lesson_practice");
    expect(session.memorize).toEqual({ part: "112", surah: 112, from: 1, to: 4, ayahs: 4 });
    expect(session.lesson.title).toBe("Surah Al-Ikhlas");
    expect(session.lesson.challenges).toHaveLength(4);
    expect(session.lesson.xpReward).toBe(4 * PRACTICE_XP_PER_CORRECT_ANSWER);
    expect(allNodes.find((node) => node.id === session.lesson.nodeId)?.topicId).toBe("quran_tafseer");
    expect(loseHeart(user, session).hearts.current).toBe(1);
  });

  it("has the tiles in another order on the next try", () => {
    const user = makeUser();
    const order = (attempt: number) => createMemorizeSession(user, part("1"), attempt)!.lesson.challenges.map((question) => labels(question).join("|"));
    expect(order(1)).not.toEqual(order(0));
    expect(createMemorizeSession(user, part("1"), 1)!.lesson.challenges.map((question) => question.id)).toEqual(
      createMemorizeSession(user, part("1"), 0)!.lesson.challenges.map((question) => question.id)
    );
  });

  it("keeps each surah's best stars on the phone", () => {
    resetMemorizeForTests();
    expect(recordMemorized("112", 2)).toBe(true);
    expect(recordMemorized("112", 1)).toBe(false);
    expect(recordMemorized("112", 3)).toBe(true);
    expect(memorizeStars()).toEqual({ "112": 3 });
    expect(JSON.parse(getStoredItem("sira-path-memorize-stars") ?? "{}")).toEqual({ "112": 3 });
    // What the phone kept is read once a run, leaving out anything that is not stars.
    resetMemorizeForTests();
    setStoredItem("sira-path-memorize-stars", JSON.stringify({ "1": 2, "114": "lots", "113": -1 }));
    expect(memorizeStars()).toEqual({ "1": 2 });
    resetMemorizeForTests();
  });
});

describe("memorize surahs (on screen)", () => {
  it("the card says which ayah of the surah it is", async () => {
    const props = { text: QURAN_AYAHS["112:2"], ayahKey: "112:2", url: "https://x/6223.mp3", gap: 2, onPlay: () => undefined, playing: false, answered: false, accent: "#21B573" };
    await render(<ReciteCard {...props} ayahs={4} />);
    expect(screen.getByTestId("recite-place").props.children).toBe("Ayah 2 of 4");
    await render(<ReciteCard {...props} />);
    expect(screen.queryByTestId("recite-place")).toBeNull();
  });

  it("the sheet lists the surahs with their stars, and a surah's Practice starts it", async () => {
    const onStart = jest.fn();
    const rows = [
      { id: "1", surah: 1, title: "Surah Al-Fatihah", arabic: "سُورَةُ الْفَاتِحَةِ", line: "7 ayahs", stars: 3, ayahs: hifzAyahs(part("1")), surahAyahs: 7 },
      { id: "92:1-11", surah: 92, title: "Surah Al-Layl", line: "Ayahs 1-11", stars: 0, ayahs: hifzAyahs(part("92:1-11")), surahAyahs: 21 }
    ];
    await render(<MemorizeSheet visible onClose={() => undefined} rows={rows} onStart={onStart} />);
    expect(screen.getByTestId("memorize-1").props.accessibilityLabel).toBe("Surah Al-Fatihah, 7 ayahs, 3 of 3 stars");
    expect(screen.getByTestId("memorize-92:1-11").props.accessibilityLabel).toBe("Surah Al-Layl, Ayahs 1-11");
    expect(screen.getByText("سُورَةُ الْفَاتِحَةِ")).toBeTruthy();
    // A row opens the surah's page, to listen first; Practice there starts its questions.
    await press("memorize-92:1-11");
    expect(onStart).not.toHaveBeenCalled();
    expect(screen.getByTestId("memorize-ayah-1")).toBeTruthy();
    await press("memorize-practice");
    expect(onStart).toHaveBeenCalledWith("92:1-11");
  });
});

describe("memorize surahs (Practice tab)", () => {
  afterEach(() => {
    removeStoredItem(PROFILE_KEY);
    clearActiveAssessment();
    resetMemorizeForTests();
    resetNetworkForTests();
  });

  async function openSurahs(user: UserProfile) {
    setStoredItem(PROFILE_KEY, JSON.stringify(user));
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    await press("tab-practice");
    await press("practice-memorize");
    expect(screen.getByTestId("memorize-sheet")).toBeTruthy();
  }

  it("goes through Al-Ikhlas with no hearts left, keeps its stars, and goes back to the surahs", async () => {
    const user = makeUser({ hearts: hearts(0), reviewHeartRestoreUsed: true, totalXp: 100 });
    const questions = createMemorizeSession(user, part("112"), 0)!.lesson.challenges;
    await openSurahs(user);
    expect(screen.queryByTestId("practice-memorize-done")).toBeNull();
    await press("memorize-112");
    await press("memorize-practice");
    expect(screen.getByTestId("exercise-view")).toBeTruthy();

    for (let step = 0; step < questions.length; step += 1) {
      const question = questions.find((item) => item.choices.every((choice) => screen.queryByTestId(`choice-${choice.id}`)))!;
      // Each card says which ayah of Al-Ikhlas it is.
      expect(screen.getByTestId("recite-place").props.children).toBe(`Ayah ${question.listen!.recite!.key.split(":")[1]} of 4`);
      await press(`choice-${question.correctChoiceId}`);
      await press("exercise-check");
      await press("feedback-continue");
    }

    expect(await screen.findByTestId("lesson-complete")).toBeTruthy();
    expect(screen.getByText("Every ayah right!")).toBeTruthy();
    expect(screen.getByText("Surah Al-Ikhlas")).toBeTruthy();
    expect(memorizeStars()).toEqual({ "112": 3 });
    expect(savedUser().hearts.current).toBe(0);
    expect(savedUser().totalXp).toBe(100 + questions.length * PRACTICE_XP_PER_CORRECT_ANSWER);

    // CONTINUE (after the streak moment, on the day's first lesson): back to Practice, with the surahs open to pick
    // the next one.
    await press("complete-continue");
    if (screen.queryByTestId("streak-moment-continue")) await press("streak-moment-continue");
    expect(screen.getByTestId("practice-hub")).toBeTruthy();
    expect(screen.getByTestId("memorize-sheet")).toBeTruthy();
    expect(screen.getByTestId("memorize-112").props.accessibilityLabel).toContain("3 of 3 stars");
    expect(screen.getByTestId("practice-memorize-done")).toBeTruthy();
  });

  it("needs the reciter: with no internet, a surah not saved on the phone does not start", async () => {
    await openSurahs(makeUser());
    await act(async () => setOnline(false));
    await press("memorize-114");
    await press("memorize-practice");
    expect(screen.queryByTestId("exercise-view")).toBeNull();
    expect(await screen.findByText("No internet. This is not saved on your phone yet.")).toBeTruthy();
  });
});

// The parts the sheet offers are made from the app's own Quran text: every part is whole.
test("every part's questions can be made", () => {
  memorizeParts().forEach((item: HifzPart) => expect(hifzChallenges(item)?.length).toBeGreaterThan(0));
});
