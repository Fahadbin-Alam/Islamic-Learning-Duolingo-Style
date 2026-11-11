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
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import TopicApp from "../TopicApp";
import { COURSE, LESSONS_BY_ID } from "../data/course";
import { pictureForQuestion } from "../data/lessonPictures";
import { getStoredItem, removeStoredItem, setStoredItem } from "../services/appStorage";
import {
  SPRINT_BONUS_EVERY,
  SPRINT_MAX_XP,
  SPRINT_MIN_CARDS,
  SPRINT_SECONDS,
  canSprint,
  recordSprint,
  resetSprintForTests,
  sprintCardFrom,
  sprintCards,
  sprintRecord,
  sprintXp,
  type SprintCard
} from "../services/swipeSprint";
import { seededRandom } from "../services/battleQuestions";
import type { Challenge, UserProfile } from "../types";
import { SprintSheet } from "../ui/screens/SprintSheet";
import { makeUser } from "./testUtils";

const ARABIC = /[؀-ۿ]/;
const ALL_LESSON_IDS = Object.keys(LESSONS_BY_ID);
/** Sixty finished lessons: plenty of cards. */
const SIXTY = ALL_LESSON_IDS.slice(0, 60);
const FLING = 260;
const COUNT_STEP = 650;

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

async function wait(ms: number) {
  await act(async () => {
    jest.advanceTimersByTime(ms);
  });
}

/**
 * Moves the clock on without playing every frame in between (the sprint's clock reads the time), then lets it tick.
 */
async function jump(ms: number) {
  jest.setSystemTime(Date.now() + ms);
  await wait(150);
}

/** How long the whole app may take to show the next thing (it is slow under test). */
const SLOW = 10000;

/** 3, 2, 1: each number is its own timer. */
async function countIn() {
  for (let step = 0; step < 3; step += 1) await wait(COUNT_STEP);
}

/** Taps the tick or the cross and lets the card fly off. */
async function answer(yes: boolean) {
  await press(yes ? "sprint-yes" : "sprint-no");
  await wait(FLING);
}

function rightLabel(challenge: Challenge) {
  return challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label.trim();
}

function questionFor(card: SprintCard) {
  return LESSONS_BY_ID[card.lessonId]?.challenges.find((challenge) => `sprint-${challenge.id}` === card.id);
}

const card = (n: number, yes: boolean, extra: Partial<SprintCard> = {}): SprintCard => ({
  id: `sprint-q${n}`,
  prompt: `Question number ${n}?`,
  shown: `Answer ${n}`,
  yes,
  answer: yes ? `Answer ${n}` : `Right answer ${n}`,
  trueFalse: false,
  lessonId: "lesson-test",
  ...extra
});

describe("swipe sprint: the cards", () => {
  it("makes each card from a finished lesson's own question, with its checked answer", () => {
    const cards = sprintCards({ completedLessonIds: SIXTY }, { seed: 3 });
    expect(cards.length).toBeGreaterThanOrEqual(SPRINT_MIN_CARDS);
    expect(cards.length).toBeLessThanOrEqual(80);
    expect(new Set(cards.map((item) => item.id)).size).toBe(cards.length);
    expect(new Set(cards.map((item) => item.prompt.toLowerCase())).size).toBe(cards.length);
    for (const item of cards) {
      expect(SIXTY).toContain(item.lessonId);
      const question = questionFor(item);
      expect(question).toBeDefined();
      const right = rightLabel(question!)!;
      if (item.trueFalse) {
        expect(item.shown).toBeUndefined();
        expect(item.answer).toBe(/^true$/i.test(right) ? "True" : "False");
        expect(item.yes).toBe(item.answer === "True");
      } else {
        expect(item.answer).toBe(right);
        // "Yes" is right exactly when the answer shown is the lesson's own right answer.
        expect(item.yes).toBe(item.shown === right);
        if (!item.yes) expect(question!.choices.map((choice) => choice.label.trim())).toContain(item.shown);
      }
    }
  });

  it("leaves out what cannot be judged alone: blanks, lesson-bound questions, 'all of the above', long ones", () => {
    const cards = sprintCards({ completedLessonIds: ALL_LESSON_IDS.slice(0, 200) }, { seed: 5 });
    for (const item of cards) {
      expect(item.prompt.length).toBeLessThanOrEqual(160);
      expect(item.prompt).not.toMatch(/_{2,}/);
      expect(item.prompt).not.toMatch(/\b(this|that) (topic|lesson|review|unit)\b/i);
      expect(item.prompt).not.toMatch(/^true or false/i);
      if (item.shown !== undefined) {
        expect(item.shown.length).toBeLessThanOrEqual(60);
        expect(item.shown).not.toMatch(/\b(all|none) of the above\b/i);
      }
    }
    const random = seededRandom(1);
    const base: Challenge = {
      id: "q-test",
      type: "multiple_choice",
      prompt: "Which city did the Prophet migrate to?",
      choices: [
        { id: "a", label: "Madinah" },
        { id: "b", label: "Taif" }
      ],
      correctChoiceId: "a"
    } as Challenge;
    expect(sprintCardFrom(base, "lesson-test", random)).toBeDefined();
    expect(sprintCardFrom({ ...base, prompt: "What does this lesson teach about hijrah?" }, "lesson-test", random)).toBeUndefined();
    expect(sprintCardFrom({ ...base, prompt: "The Prophet migrated to ____." }, "lesson-test", random)).toBeUndefined();
    expect(sprintCardFrom({ ...base, choices: [{ id: "a", label: "Madinah" }] }, "lesson-test", random)).toBeUndefined();
    expect(
      sprintCardFrom({ ...base, choices: [{ id: "a", label: "Madinah" }, { id: "b", label: "All of the above" }] }, "lesson-test", random)
    ).toBeUndefined();
    // The card asks "True or false?" itself.
    const sentence = sprintCardFrom(
      { ...base, type: "true_false", prompt: "True or false: the hijrah was to Madinah.", choices: [{ id: "a", label: "True" }, { id: "b", label: "False" }] } as Challenge,
      "lesson-test",
      random
    );
    expect(sentence).toMatchObject({ prompt: "the hijrah was to Madinah.", trueFalse: true, yes: true, answer: "True" });
  });

  it("shows each card's topic, and a living picture only of a place the question itself names", () => {
    const cards = sprintCards({ completedLessonIds: ALL_LESSON_IDS.slice(600, 660) }, { seed: 4 });
    const sections = new Map(COURSE.sections.map((section) => [section.topicId, section]));
    for (const item of cards) {
      expect(item.topic).toBeDefined();
      const section = sections.get(item.topic!.id)!;
      expect(section.nodes.some((node) => node.id === LESSONS_BY_ID[item.lessonId].nodeId)).toBe(true);
      expect(item.topic!.accent).toBe(section.accentColor);
      expect(item.pictureId).toBe(pictureForQuestion(item.prompt)?.id);
    }
    expect(cards.some((item) => item.pictureId)).toBe(true);
    // The first lessons too, some of them outside the path's circles.
    const first = sprintCards({ completedLessonIds: SIXTY }, { seed: 1 });
    expect(first.filter((item) => !item.topic).map((item) => item.lessonId)).toEqual([]);
    expect(first.find((item) => item.lessonId === "lesson-asr")?.topic?.id ?? "quran_tafseer").toBe("quran_tafseer");
    const arabic = sprintCards({ completedLessonIds: ALL_LESSON_IDS.slice(600, 660) }, { language: "ar", seed: 4 });
    expect(arabic.map((item) => item.pictureId)).toEqual(cards.map((item) => item.pictureId));
    expect(arabic.every((item) => ARABIC.test(item.topic!.title))).toBe(true);
  });

  it("is right about half the time, so swiping one way never wins", () => {
    for (const seed of [1, 2, 3, 4]) {
      const cards = sprintCards({ completedLessonIds: SIXTY }, { seed });
      const yesShare = cards.filter((item) => item.yes).length / cards.length;
      expect(yesShare).toBeGreaterThan(0.35);
      expect(yesShare).toBeLessThan(0.65);
    }
  });

  it("shuffles each new sprint, the same seed giving the same cards", () => {
    const one = sprintCards({ completedLessonIds: SIXTY }, { seed: 11 });
    const again = sprintCards({ completedLessonIds: SIXTY }, { seed: 11 });
    const other = sprintCards({ completedLessonIds: SIXTY }, { seed: 12 });
    expect(again).toEqual(one);
    expect(other.map((item) => item.id)).not.toEqual(one.map((item) => item.id));
  });

  it("comes from the lessons finished most recently, in the learner's language", () => {
    const recent = ALL_LESSON_IDS.slice(0, 100);
    const cards = sprintCards({ completedLessonIds: recent }, { seed: 2 });
    const lastSixty = new Set(recent.slice(-60));
    expect(cards.every((item) => lastSixty.has(item.lessonId))).toBe(true);
    const arabic = sprintCards({ completedLessonIds: SIXTY }, { language: "ar", seed: 3 });
    expect(arabic.map((item) => item.id)).toEqual(sprintCards({ completedLessonIds: SIXTY }, { seed: 3 }).map((item) => item.id));
    expect(arabic.filter((item) => ARABIC.test(item.prompt)).length).toBeGreaterThan(arabic.length / 2);
    // True or false stays a key: the sheet says it in the learner's language.
    expect(arabic.filter((item) => item.trueFalse).every((item) => item.answer === "True" || item.answer === "False")).toBe(true);
  });

  it("needs a few finished lessons first", () => {
    expect(canSprint({ completedLessonIds: [] })).toBe(false);
    expect(canSprint({ completedLessonIds: ["no-such-lesson"] })).toBe(false);
    expect(canSprint({ completedLessonIds: SIXTY })).toBe(true);
    expect(sprintCards({ completedLessonIds: [] })).toEqual([]);
  });

  it("pays 1 XP for every 2 right, at most a small amount", () => {
    expect([0, 1, 2, 3, 7, 19, 20, 55].map(sprintXp)).toEqual([0, 0, 1, 1, 3, 9, 10, 10]);
    expect(SPRINT_MAX_XP).toBe(10);
  });
});

describe("swipe sprint: the best score", () => {
  beforeEach(() => resetSprintForTests());

  it("keeps the best and the plays on this phone", () => {
    expect(sprintRecord()).toEqual({ best: 0, plays: 0 });
    expect(recordSprint(0)).toBe(false);
    expect(recordSprint(6)).toBe(true);
    expect(recordSprint(4)).toBe(false);
    expect(recordSprint(9)).toBe(true);
    expect(sprintRecord()).toEqual({ best: 9, plays: 4 });
    expect(JSON.parse(getStoredItem("sira-path-sprint-best") ?? "{}")).toEqual({ best: 9, plays: 4 });
  });

  it("reads a saved record, and ignores a broken one", () => {
    setStoredItem("sira-path-sprint-best", JSON.stringify({ best: 7, plays: "lots" }));
    expect(sprintRecord()).toEqual({ best: 7, plays: 0 });
    resetSprintForTests();
    setStoredItem("sira-path-sprint-best", "{not json");
    expect(sprintRecord()).toEqual({ best: 0, plays: 0 });
  });
});

describe("swipe sprint: the game", () => {
  beforeEach(() => {
    resetSprintForTests();
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it("counts 3, 2, 1, then scores right answers, lights a combo, and shows the right answer after a miss", async () => {
    const cards = [
      card(1, true, { topic: { id: "prophets", title: "Prophets", accent: "#E0A800" }, pictureId: "kaaba" }),
      card(2, true),
      card(3, false),
      card(4, true, { trueFalse: true, shown: undefined, answer: "True", prompt: "Wudu comes before salah." }),
      card(5, false)
    ];
    const onFinish = jest.fn();
    await render(<SprintSheet visible onClose={jest.fn()} makeCards={() => cards} onFinish={onFinish} />);
    expect(screen.getByTestId("sprint-start")).toBeTruthy();
    expect(screen.queryByTestId("sprint-best")).toBeNull();

    await press("sprint-start");
    expect(screen.getByTestId("sprint-count")).toHaveTextContent("3");
    await wait(COUNT_STEP);
    expect(screen.getByTestId("sprint-count")).toHaveTextContent("2");
    await wait(COUNT_STEP);
    expect(screen.getByTestId("sprint-count")).toHaveTextContent("1");
    await wait(COUNT_STEP);
    expect(screen.getByTestId("sprint-play")).toBeTruthy();
    expect(screen.getByTestId("sprint-time")).toHaveTextContent(String(SPRINT_SECONDS));
    expect(screen.getByTestId("sprint-prompt")).toHaveTextContent("Question number 1?");
    expect(screen.getByTestId("sprint-shown")).toHaveTextContent("Is it “Answer 1”?");
    expect(screen.getByTestId("sprint-topic")).toHaveTextContent("Prophets");
    expect(screen.getByTestId("sprint-picture")).toBeTruthy();

    await answer(true);
    expect(screen.getByTestId("sprint-score")).toHaveTextContent("1 right");
    expect(screen.queryByTestId("sprint-combo")).toBeNull();
    await answer(true);
    expect(screen.getByTestId("sprint-score")).toHaveTextContent("2 right");
    expect(screen.getByTestId("sprint-combo")).toHaveTextContent("2 right in a row!");

    // "Answer 3" is not the right answer: the tick is a miss, and the right one shows under the buttons.
    await answer(true);
    expect(screen.getByTestId("sprint-score")).toHaveTextContent("2 right");
    expect(screen.queryByTestId("sprint-combo")).toBeNull();
    // The missed card has gone, so the note names its question too.
    expect(screen.getByTestId("sprint-miss")).toHaveTextContent("Question number 3?The right answer is: Right answer 3.");

    // A true or false sentence.
    expect(screen.getByText("True or false?")).toBeTruthy();
    expect(screen.queryByTestId("sprint-shown")).toBeNull();
    await answer(true);
    expect(screen.getByTestId("sprint-score")).toHaveTextContent("3 right");
    await wait(3500);
    expect(screen.queryByTestId("sprint-miss")).toBeNull();
    expect(onFinish).not.toHaveBeenCalled();
    await screen.unmount();
  });

  it("adds a few seconds for every five right in a row", async () => {
    const cards = Array.from({ length: 8 }, (_, index) => card(index + 1, index % 2 === 0));
    await render(<SprintSheet visible onClose={jest.fn()} makeCards={() => cards} />);
    await press("sprint-start");
    await countIn();
    for (let index = 0; index < SPRINT_BONUS_EVERY - 1; index += 1) await answer(cards[index].yes);
    expect(screen.queryByTestId("sprint-bonus")).toBeNull();
    await answer(cards[SPRINT_BONUS_EVERY - 1].yes);
    expect(screen.getByTestId("sprint-bonus")).toHaveTextContent("+3 seconds!");
    await wait(200);
    // Five answers took about 1.5 seconds; the bonus put 3 back.
    expect(Number(screen.getByTestId("sprint-time").props.children)).toBeGreaterThan(SPRINT_SECONDS);
    await screen.unmount();
  });

  it("ends when time is up: the score, a first best, the XP once, and the misses to remember", async () => {
    const cards = Array.from({ length: 30 }, (_, index) => card(index + 1, index % 3 !== 2));
    const onFinish = jest.fn();
    await render(<SprintSheet visible onClose={jest.fn()} makeCards={() => cards} onFinish={onFinish} />);
    await press("sprint-start");
    await countIn();
    // The tick five times: right, right, a miss (card 3's answer is not the right one), right, right.
    for (let tap = 0; tap < 5; tap += 1) await answer(true);
    expect(screen.getByTestId("sprint-score")).toHaveTextContent("4 right");

    await jump(SPRINT_SECONDS * 1000);
    expect(screen.getByTestId("sprint-result")).toBeTruthy();
    expect(screen.getByText("Time's up!")).toBeTruthy();
    expect(screen.getByTestId("sprint-result-score")).toHaveTextContent("4 right");
    expect(screen.getByTestId("sprint-new-best")).toHaveTextContent("New best!");
    expect(screen.getByTestId("sprint-xp")).toHaveTextContent("+2 XP");
    expect(screen.getByTestId("sprint-misses")).toHaveTextContent("To rememberQuestion number 3?The right answer is: Right answer 3.");
    expect(onFinish).toHaveBeenCalledTimes(1);
    expect(onFinish).toHaveBeenCalledWith({ right: 4, answered: 5, xp: 2 });
    expect(sprintRecord()).toEqual({ best: 4, plays: 1 });

    await wait(5000);
    expect(onFinish).toHaveBeenCalledTimes(1);

    // Play again: a new count, a new score.
    await press("sprint-again");
    expect(screen.getByTestId("sprint-count")).toHaveTextContent("3");
    await countIn();
    expect(screen.getByTestId("sprint-score")).toHaveTextContent("0 right");
    await screen.unmount();
  });

  it("ends early when every card is answered, and a lower score is no new best", async () => {
    recordSprint(10);
    const cards = [card(1, true), card(2, false), card(3, true)];
    const onFinish = jest.fn();
    await render(<SprintSheet visible onClose={jest.fn()} makeCards={() => cards} onFinish={onFinish} />);
    expect(screen.getByTestId("sprint-best")).toHaveTextContent("Best: 10");
    await press("sprint-start");
    await countIn();
    await answer(true);
    await answer(false);
    await answer(true);
    expect(screen.getByText("You answered every card!")).toBeTruthy();
    expect(screen.getByTestId("sprint-result-score")).toHaveTextContent("3 right");
    expect(screen.queryByTestId("sprint-new-best")).toBeNull();
    expect(screen.getByTestId("sprint-result-best")).toHaveTextContent("Best: 10");
    expect(screen.queryByTestId("sprint-misses")).toBeNull();
    expect(onFinish).toHaveBeenCalledWith({ right: 3, answered: 3, xp: 1 });
    await screen.unmount();
  });

  it("pays nothing for a sprint closed part way, and opens again at the start", async () => {
    const cards = Array.from({ length: 10 }, (_, index) => card(index + 1, true));
    const onFinish = jest.fn();
    const onClose = jest.fn();
    await render(<SprintSheet visible onClose={onClose} makeCards={() => cards} onFinish={onFinish} />);
    await press("sprint-start");
    await countIn();
    await answer(true);
    await press("sprint-close");
    expect(onClose).toHaveBeenCalledTimes(1);
    await screen.rerender(<SprintSheet visible={false} onClose={onClose} makeCards={() => cards} onFinish={onFinish} />);
    await jump(SPRINT_SECONDS * 1000 + 1000);
    expect(onFinish).not.toHaveBeenCalled();
    expect(sprintRecord().plays).toBe(0);
    await screen.rerender(<SprintSheet visible onClose={onClose} makeCards={() => cards} onFinish={onFinish} />);
    expect(screen.getByTestId("sprint-start")).toBeTruthy();
    await screen.unmount();
  });
});

describe("swipe sprint in the app", () => {
  const PROFILE_KEY = "sira-path-user-profile";
  const savedUser = () => JSON.parse(getStoredItem(PROFILE_KEY) ?? "{}") as UserProfile;
  beforeEach(() => resetSprintForTests());
  afterEach(() => {
    jest.useRealTimers();
    removeStoredItem(PROFILE_KEY);
    resetSprintForTests();
  });

  it("waits in Practice until a few lessons are done", async () => {
    setStoredItem(PROFILE_KEY, JSON.stringify(makeUser({ lastTopicId: "foundation" })));
    await render(<TopicApp />);
    await press("tab-practice");
    expect(screen.queryByTestId("practice-sprint")).toBeNull();
    await screen.unmount();
  });

  it("opens from Practice, plays to the last card, pays its XP and shows the best on the row", async () => {
    // A few lessons: just enough cards for a sprint, so it can be played to its end.
    const picked: string[] = [];
    for (const id of ALL_LESSON_IDS) {
      picked.push(id);
      if (canSprint({ completedLessonIds: picked })) break;
    }
    const user = makeUser({ lastTopicId: "foundation", totalXp: 50, completedLessonIds: picked });
    setStoredItem(PROFILE_KEY, JSON.stringify(user));
    await render(<TopicApp />);
    await press("tab-practice");
    expect(screen.queryByTestId("practice-sprint-best")).toBeNull();
    await press("practice-sprint");
    expect(screen.getByTestId("sprint-sheet")).toBeTruthy();

    // The sheet shuffles with the time it starts: hold the time still for that tap, so the test knows the cards.
    const now = jest.spyOn(Date, "now").mockReturnValue(424242);
    await press("sprint-start");
    now.mockRestore();
    const cards = sprintCards(user, { language: "en", seed: 424242 });
    expect(cards.length).toBeGreaterThanOrEqual(SPRINT_MIN_CARDS);
    await screen.findByTestId("sprint-play", {}, { timeout: SLOW });
    // All right but the first. Each answer waits for the card after it (the whole app keeps the test slow).
    for (const [index, item] of cards.entries()) {
      const yes = index === 0 ? !item.yes : item.yes;
      await press(yes ? "sprint-yes" : "sprint-no");
      if (index === cards.length - 1) await screen.findByTestId("sprint-result", {}, { timeout: SLOW });
      else if (index === 0) await screen.findByTestId("sprint-miss", {}, { timeout: SLOW });
      else await waitFor(() => expect(screen.getByTestId("sprint-score")).toHaveTextContent(`${index} right`), { timeout: SLOW });
    }
    const right = cards.length - 1;
    expect(screen.getByText("You answered every card!")).toBeTruthy();
    expect(screen.getByTestId("sprint-result-score")).toHaveTextContent(`${right} right`);
    expect(screen.getByTestId("sprint-xp")).toHaveTextContent(`+${sprintXp(right)} XP`);
    expect(savedUser().totalXp).toBe(50 + sprintXp(right));

    await press("sprint-done");
    await waitFor(() => expect(screen.queryByTestId("sprint-sheet")).toBeNull(), { timeout: SLOW });
    expect(screen.getByTestId("practice-sprint-best")).toHaveTextContent(String(right));
    await screen.unmount();
  }, 60000);
});
