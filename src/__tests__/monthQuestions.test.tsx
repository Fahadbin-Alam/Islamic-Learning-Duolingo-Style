jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);
jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));
jest.mock("expo-speech", () => ({ speak: jest.fn(), stop: jest.fn(() => Promise.resolve()) }));
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
import { StyleSheet } from "react-native";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import TopicApp from "../TopicApp";
import { learningApi, localDateKey } from "../api/islamicLearningApi";
import { COURSE, LESSONS_BY_ID } from "../data/course";
import { MONTHS } from "../data/moonSky";
import { setActiveLanguage, t } from "../i18n";
import { localizeLessonContent } from "../services/contentLocalization";
import { setStoredItem } from "../services/appStorage";
import type { Challenge, LearningNodeView, Lesson, SupportedLanguage } from "../types";
import { MonthGame } from "../ui/lesson/MonthGame";
import { mapPlacesFor } from "../ui/lesson/mapQuestions";
import { monthOfAnswer, monthsFor, nameFits, yearRows } from "../ui/lesson/monthQuestions";
import { questionFormat } from "../ui/lesson/questionFormats";
import { skyTimesFor } from "../ui/lesson/skyQuestions";
import { colors } from "../ui/theme";
import { finishMatch, pickRight, questionOnScreen, toQuestion } from "./lessonDriver";
import { makeUser } from "./testUtils";

// Fahad: more interactive questions, with living pictures. A question whose answers are all months ("Ramadan",
// "Sha'ban", "Muharram") is answered on the year: the twelve months in their order, the answers bright where they
// fall; tap one and its moon fills.

jest.setTimeout(60000);

const variety = (on: boolean) => ((globalThis as { __QUESTION_VARIETY__?: boolean }).__QUESTION_VARIETY__ = on);
const question = (prompt: string, labels: string[], right = 0, type: Challenge["type"] = "multiple_choice"): Challenge => ({
  id: `q-${prompt}`,
  type,
  prompt,
  choices: labels.map((label, index) => ({ id: String.fromCharCode(97 + index), label })),
  correctChoiceId: String.fromCharCode(97 + right),
  explanation: "From the lesson."
});
const ashura = question("Ashura is in which month?", ["Muharram", "Ramadan", "Shawwal", "Rajab"], 0);

// Every question the course asks on the year, with its right answer's month (0 is Muharram): each was read to check
// that its answers are months and that the year's order does not answer it. A new one fails here until it is read
// and added.
const REVIEWED: Record<string, number> = {
  "The Quran was first sent down in ____.": 8,
  "Besides Ramadan, which month did he ﷺ fast most?": 7,
  "Which month did he ﷺ call Allah's month?": 0,
  "Which month should not pass before we are forgiven?": 8,
  "In which month did Umar gather the people behind Ubayy?": 8,
  "In which month did they set out?": 8,
  "Eid al-Fitr comes right after which month?": 8,
  "Ashura is in which month?": 0,
  "Which month is best for fasting after Ramadan?": 0,
  "After Ramadan, in which month did he ﷺ fast the most?": 7,
  "Which month, too?": 8,
  "In which month did the Quran come down?": 8,
  "In which month was the Quran revealed, per 2:185?": 8,
  "In which month is the Night of Al-Qadr?": 8,
  "In which month was the Quran first sent down?": 8,
  // Sunan an-Nasa'i 3236: Aishah said he ﷺ married her in Shawwal.
  "In which month did he ﷺ marry Aishah?": 9
};

// Their answers are all months, but the year shows the months in order, and that would answer them.
const ORDER_QUESTIONS = [
  "Which month begins the Islamic year?",
  "Which month comes just before Ramadan?",
  "Which month comes between Rajab and Ramadan?",
  "Which sacred month falls between Jumada and Sha'ban?",
  "Which month did they swap Muharram with?"
];

// The lesson's width on phones 320, 360, 375, 390 and 412 px wide.
const WIDTHS = [288, 328, 343, 358, 380];
const LANGUAGES: SupportedLanguage[] = ["en", "bn", "ur", "ar"];

const allChallenges = () => (Object.values(LESSONS_BY_ID) as Lesson[]).flatMap((lesson) => lesson.challenges.map((challenge, index) => ({ lesson, challenge, index })));

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

afterEach(() => {
  variety(false);
  setActiveLanguage("en");
});

// The other months are a picture of the year, hidden from screen readers (the answers say each month).
const ALL = { includeHiddenElements: true };

describe("which questions are asked on the year", () => {
  it("reads the months answers name, however they are written, and leaves names that could be two months", () => {
    expect(monthOfAnswer("Ramadan.")).toBe(8);
    expect(monthOfAnswer("Sha’ban")).toBe(7);
    expect(monthOfAnswer("Shaban")).toBe(7);
    expect(monthOfAnswer("Dhul Hijjah")).toBe(11);
    expect(monthOfAnswer("Dhul-Hijjah")).toBe(11);
    expect(monthOfAnswer("MUHARRAM")).toBe(0);
    expect(monthOfAnswer("Rabi' al-Awwal")).toBe(2);
    expect(monthOfAnswer("Dhul-Qa'dah")).toBe(10);
    // Each month of the year is read by the name the year shows.
    MONTHS.forEach((month, index) => expect([month.name, monthOfAnswer(month.name)]).toEqual([month.name, index]));
    // "Jumada" and "Rabi" are each two months; the rest are not months at all.
    for (const unclear of ["Jumada", "Rabi", "Shawwal only", "Every month", "The 9th of Dhul-Hijjah", "Eid"]) expect([unclear, monthOfAnswer(unclear)]).toEqual([unclear, undefined]);
  });

  it("puts each answer at its month, and leaves questions with two answers in one month, or too few, to the tiles", () => {
    expect(monthsFor(ashura)).toEqual({ a: 0, b: 8, c: 9, d: 6 });
    expect(monthsFor(question("Which?", ["Sha'ban", "Shaban", "Ramadan"]))).toBeUndefined();
    expect(monthsFor(question("Which?", ["Ramadan", "Rajab"]))).toBeUndefined();
    expect(monthsFor(question("Which?", ["Ramadan", "Every month", "Rajab"]))).toBeUndefined();
    expect(monthsFor(question("Ashura is in Muharram.", ["True", "False"], 0, "true_false"))).toBeUndefined();
  });

  it("asks the course's 16 month questions on the year, each one read and checked", () => {
    const asked: Record<string, number> = {};
    for (const { challenge } of allChallenges()) {
      const months = monthsFor(challenge);
      if (!months) continue;
      asked[challenge.prompt] = months[challenge.correctChoiceId];
      // Nothing is asked both on the year and on the map or in the sky.
      expect([challenge.prompt, mapPlacesFor(challenge), skyTimesFor(challenge)]).toEqual([challenge.prompt, undefined, undefined]);
    }
    expect(asked).toEqual(REVIEWED);
    // The questions about the months' order stay as tiles, though their answers are all months.
    for (const prompt of ORDER_QUESTIONS) {
      const found = allChallenges().filter(({ challenge }) => challenge.prompt === prompt);
      expect([prompt, found.length > 0]).toEqual([prompt, true]);
      for (const { challenge } of found) {
        expect(challenge.choices.every((choice) => monthOfAnswer(choice.label) !== undefined)).toBe(true);
        expect(monthsFor(challenge)).toBeUndefined();
      }
    }
  });

  it("is a way of asking of its own, always used for a month question", () => {
    variety(true);
    expect(questionFormat(ashura, { month: true })).toBe("month");
    expect(questionFormat(ashura, { month: true, recall: true, language: "bn" })).toBe("month");
    expect(questionFormat(ashura, {})).not.toBe("month");
    // A gap sentence whose answers are months is asked on the year too.
    expect(questionFormat(question("The Quran was first sent down in ____.", ["Shawwal", "Muharram", "Ramadan"], 2), { month: true })).toBe("month");
    variety(false);
    expect(questionFormat(ashura, { month: true })).toBe("choose");
  });

  it("sets the year in four rows of three, read from the right in Urdu and Arabic", () => {
    expect(yearRows().map((row) => row.map((month) => month.index))).toEqual([[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11]]);
    expect(yearRows(true).map((row) => row.map((month) => month.index))).toEqual([[2, 1, 0], [5, 4, 3], [8, 7, 6], [11, 10, 9]]);
  });

  it("fits every month's name in its place in two lines, on every phone and in every language", () => {
    const asked = allChallenges().filter(({ challenge }) => monthsFor(challenge));
    for (const language of LANGUAGES) {
      setActiveLanguage(language);
      const names = MONTHS.map((month) => t(month.name));
      // In the learner's language, not in English (but for English itself).
      if (language !== "en") expect([language, names.filter((name, index) => name === MONTHS[index].name)]).toEqual([language, []]);
      const answers = new Set<string>();
      for (const { lesson, index } of asked) {
        const shown = language === "en" ? lesson : localizeLessonContent(lesson, language);
        shown.challenges[index].choices.forEach((choice) => answers.add(choice.label));
      }
      for (const width of WIDTHS) {
        for (const compact of [false, true]) {
          for (const name of names) expect([language, width, compact, name, nameFits(name, width, false, compact)]).toEqual([language, width, compact, name, true]);
          for (const name of answers) expect([language, width, compact, name, nameFits(name, width, true, compact)]).toEqual([language, width, compact, name, true]);
        }
      }
    }
  });
});

describe("the month question", () => {
  const shared = { mascotVariant: "girl", accent: "#58CC02", onCheck: jest.fn(), onContinue: jest.fn(), playSound: false };
  const background = (testID: string) => StyleSheet.flatten(screen.getByTestId(testID).props.style)?.backgroundColor;
  // The months in the order they are drawn: row by row, each row as it is set.
  const drawnOrder = () => screen.getAllByTestId(/^month-cell-\d+$/, ALL).map((cell) => Number(String(cell.props.testID).replace("month-cell-", "")));
  const months = monthsFor(ashura)!;

  it("shows the twelve months in order, the answers bright and the rest dim; picking one fills its moon, and CHECK waits for one", async () => {
    const onSelect = jest.fn();
    const view = await render(<MonthGame {...shared} prompt={ashura.prompt} choices={ashura.choices} months={months} correctChoiceId="a" onSelect={onSelect} />);
    expect(screen.getByText("Tap the month")).toBeTruthy();
    expect(drawnOrder()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    // The answers can be tapped; the other months are only there to show the year.
    for (const choice of ashura.choices) expect(screen.getByTestId(`choice-${choice.id}`)).toHaveTextContent(choice.label);
    expect(screen.queryByTestId("month-cell-1")).toBeNull();
    expect(screen.getByTestId("month-cell-1", ALL)).toHaveTextContent("Safar");
    expect(screen.getByTestId("month-cell-5", ALL)).toHaveTextContent("Jumada al-Akhirah");
    for (const choice of ashura.choices) expect(screen.getByTestId(`month-moon-${choice.id}-new`)).toBeTruthy();
    expect(screen.getByTestId("exercise-check")).toBeDisabled();
    await press("choice-c");
    await press("choice-a");
    expect(onSelect.mock.calls.map(([id]) => id)).toEqual(["c", "a"]);
    await view.rerender(<MonthGame {...shared} prompt={ashura.prompt} choices={ashura.choices} months={months} correctChoiceId="a" selectedChoiceId="a" onSelect={onSelect} />);
    expect(screen.getByTestId("exercise-check")).not.toBeDisabled();
    expect(screen.getByTestId("month-moon-a-full")).toBeTruthy();
    expect(screen.getByTestId("month-moon-c-new")).toBeTruthy();
    expect(screen.getByTestId("choice-a").props.accessibilityState).toMatchObject({ selected: true });
  });

  it("turns a right answer green, its moon full; a wrong one red, its moon new again, and the right one green and full", async () => {
    const view = await render(
      <MonthGame {...shared} prompt={ashura.prompt} choices={ashura.choices} months={months} correctChoiceId="a" selectedChoiceId="a" result={{ correct: true, correctLabel: "Muharram", why: "" }} onSelect={jest.fn()} />
    );
    expect(background("month-tile-a")).toBe(colors.correctBg);
    expect(screen.getByTestId("month-moon-a-full")).toBeTruthy();
    expect(background("month-tile-b")).toBe(colors.white);
    await view.unmount();
    await render(
      <MonthGame {...shared} prompt={ashura.prompt} choices={ashura.choices} months={months} correctChoiceId="a" selectedChoiceId="b" result={{ correct: false, correctLabel: "Muharram", why: "" }} onSelect={jest.fn()} />
    );
    expect(background("month-tile-b")).toBe(colors.wrongBg);
    expect(screen.getByTestId("month-moon-b-new")).toBeTruthy();
    expect(background("month-tile-a")).toBe(colors.correctBg);
    expect(screen.getByTestId("month-moon-a-full")).toBeTruthy();
    expect(screen.getByTestId("feedback-sheet")).toBeTruthy();
    expect(screen.getByTestId("choice-c")).toBeDisabled();
  });

  it("speaks the learner's language, and reads the year from the right in Urdu and Arabic", async () => {
    const lesson = LESSONS_BY_ID["lesson-deep-days-ashura"];
    const english = lesson.challenges.find((challenge) => monthsFor(challenge))!;
    for (const language of ["ur", "ar"] as const) {
      setActiveLanguage(language);
      const shown = localizeLessonContent(lesson, language).challenges.find((challenge) => challenge.id === english.id)!;
      const view = await render(<MonthGame {...shared} prompt={shown.prompt} choices={shown.choices} months={monthsFor(english)!} correctChoiceId={shown.correctChoiceId} onSelect={jest.fn()} />);
      expect(screen.getByText(language === "ur" ? "مہینے پر ٹیپ کریں" : "اضغط على الشهر")).toBeTruthy();
      // Muharram first, on the right of the top row.
      expect(drawnOrder()).toEqual([2, 1, 0, 5, 4, 3, 8, 7, 6, 11, 10, 9]);
      expect(screen.getByTestId(`choice-${english.correctChoiceId}`)).toHaveTextContent(/[؀-ۿ]/);
      expect(screen.getByTestId("month-cell-1", ALL)).toHaveTextContent("صفر");
      await view.unmount();
    }
    setActiveLanguage("bn");
    const shown = localizeLessonContent(lesson, "bn").challenges.find((challenge) => challenge.id === english.id)!;
    await render(<MonthGame {...shared} prompt={shown.prompt} choices={shown.choices} months={monthsFor(english)!} correctChoiceId={shown.correctChoiceId} onSelect={jest.fn()} />);
    expect(screen.getByText("মাসটিতে চাপো")).toBeTruthy();
    expect(drawnOrder()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    expect(screen.getByTestId(`choice-${english.correctChoiceId}`)).toHaveTextContent("মুহাররম");
  });
});

describe("in a lesson", () => {
  it("asks which month he ﷺ fasted most after Ramadan on the year, and goes on", async () => {
    variety(true);
    const lessonId = "lesson-deep-fast-extra-shaban";
    const fasting = COURSE.sections.find((section) => section.topicId === "fasting")!;
    const at = fasting.nodes.findIndex((node) => node.lessonIds.includes(lessonId));
    expect(at).toBeGreaterThan(0);
    const before = fasting.nodes.slice(0, at);
    const user = makeUser({
      lastTopicId: "fasting",
      hearts: { current: 5, max: 5, unlimited: true, lastRefillDate: localDateKey() },
      completedLessonIds: ["warm-up-1", "warm-up-2", "warm-up-3", ...before.flatMap((node) => node.lessonIds)],
      completedNodeIds: before.map((node) => node.id)
    });
    setStoredItem("sira-path-user-profile", JSON.stringify(user));
    const node = learningApi.getPathNodes(user).find((item) => item.id === fasting.nodes[at].id) as LearningNodeView;
    expect(node.status).not.toBe("locked");
    const session = await learningApi.getLessonSession(node.firstLessonId, user);
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-fasting", undefined, { timeout: 10000 });
    await press(`path-node-${node.id}`);
    await press("node-card-start");

    let onYear = 0;
    for (let turn = 0; turn < 60 && !screen.queryByTestId("lesson-complete"); turn += 1) {
      await toQuestion();
      if (screen.queryByTestId("match-game")) {
        await finishMatch(session.lesson.challenges);
        continue;
      }
      const shown = questionOnScreen(session.lesson.challenges);
      if (!shown) break;
      if (screen.queryByTestId("month-game")) {
        onYear += 1;
        expect(screen.getAllByTestId(/^month-cell-\d+$/, ALL)).toHaveLength(12);
        expect(monthsFor(shown)).toBeTruthy();
      }
      await pickRight(shown);
      await press("exercise-check");
      await press("feedback-continue");
      // "Want it harder?" after a few right in a row: the lesson stays as it is.
      if (screen.queryByTestId("feedback-continue") && !screen.queryByTestId("lesson-complete")) await press("harder-no");
    }
    expect(onYear).toBeGreaterThanOrEqual(1);
    expect(await screen.findByTestId("lesson-complete")).toBeTruthy();
  });
});
