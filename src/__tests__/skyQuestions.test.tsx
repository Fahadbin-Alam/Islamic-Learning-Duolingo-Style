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
import { DAY_TIMES } from "../data/daySky";
import { setActiveLanguage } from "../i18n";
import { localizeLessonContent } from "../services/contentLocalization";
import { setStoredItem } from "../services/appStorage";
import type { Challenge, LearningNodeView, Lesson } from "../types";
import { SkyGame } from "../ui/lesson/SkyGame";
import { mapPlacesFor } from "../ui/lesson/mapQuestions";
import { questionFormat } from "../ui/lesson/questionFormats";
import { answersArePrayers, openingTime, skyTimesFor, timeOfAnswer, tripTo } from "../ui/lesson/skyQuestions";
import { colors } from "../ui/theme";
import { finishMatch, pickRight, questionOnScreen, toQuestion } from "./lessonDriver";
import { makeUser } from "./testUtils";

// Fahad: more interactive questions, with living pictures. A question whose answers are all times of the day ("At
// dawn", "At noon", "The last third of the night") is answered in the sky: tap a time and the sky plays to it. So is a
// question on a prayer whose words give no time away ("In which prayer did he ﷺ recite At-Tur?"): each prayer at its time.

const variety = (on: boolean) => ((globalThis as { __QUESTION_VARIETY__?: boolean }).__QUESTION_VARIETY__ = on);
const question = (prompt: string, labels: string[], right = 0, type: Challenge["type"] = "multiple_choice"): Challenge => ({
  id: `q-${prompt}`,
  type,
  prompt,
  choices: labels.map((label, index) => ({ id: String.fromCharCode(97 + index), label })),
  correctChoiceId: String.fromCharCode(97 + right),
  explanation: "From the lesson."
});
const suhur = question("When is suhur eaten?", ["At sunset", "At noon", "At midnight only", "Before dawn"], 3);

// Every question the course asks in the sky, with its right answer's time: each was read to check that its answers
// mean those times and no others. A new one fails here until it is read and added.
const REVIEWED: Record<string, string> = {
  "The fast lasts from ____ to sunset.": "dawn",
  "When did Umm Hani hear him ﷺ reciting?": "night",
  "When are these two rak'ahs prayed?": "dawn",
  "When are these two rakahs prayed?": "dawn",
  "When is duha prayed?": "forenoon",
  "When did he ﷺ pray Zuhr, Abu Barzah said?": "midday",
  "When is the Asr prayer?": "afternoon",
  "When did they pray Maghrib with him ﷺ?": "sunset",
  "When is suhur eaten?": "lastThird",
  "So when did he ﷺ eat suhur?": "lastThird",
  "Ibn Umm Maktum called when told what?": "dawn",
  "When should children be kept close, he ﷺ said?": "sunset",
  "When did the Prophet ﷺ come to say it was time?": "midday",
  "Ayah 3: at what time do they raid?": "dawn",
  "What time is it, per the scholars?": "dawn",
  "What does Ana'a Al-Layl mean, per Ibn Kathir?": "night",
  "When was Lut's family saved, in 54:34?": "lastThird",
  "When does Allah call to His servants, per the hadith?": "lastThird",
  "When does Allah ask who will call on Him?": "lastThird",
  "When do they charge, per 100:3?": "dawn",
  // Prayers named by their time.
  "Which prayer was Jabir praying when it was so hot?": "midday",
  "Before which prayer are these four rak'ahs?": "afternoon",
  "Which prayer did he ﷺ name in these words?": "dawn",
  // Prayers by name alone, in questions whose words give no time away.
  "Which prayer had they just prayed with him ﷺ?": "sunset",
  "After which prayer did the good news come?": "dawn",
  "Which prayer did they wait to pray with him ﷺ?": "night",
  "Which prayer had two before and two after?": "midday",
  "In which prayer did he ﷺ recite At-Tur, per Bukhari 765?": "sunset",
  "Which prayer was being recited when they heard?": "dawn",
  "In which prayer did he recite it, per Umm al-Fadl?": "sunset"
};

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

afterEach(() => {
  variety(false);
  setActiveLanguage("en");
});

// The sky is a picture, hidden from screen readers (the tiles say each time).
const ALL = { includeHiddenElements: true };

describe("which questions are asked in the sky", () => {
  it("reads the times answers name, however they are written, and leaves the ones that could mean two times", () => {
    expect(timeOfAnswer("At dawn.")).toBe("dawn");
    expect(timeOfAnswer("At dawn, before Fajr’s fard")).toBe("dawn");
    expect(timeOfAnswer("in the mid-morning")).toBe("forenoon");
    expect(timeOfAnswer("When the sun passed midday")).toBe("midday");
    expect(timeOfAnswer("Soon after sunset")).toBe("sunset");
    expect(timeOfAnswer("In the dark of night")).toBe("night");
    expect(timeOfAnswer("Before dawn")).toBe("lastThird");
    // A prayer named by its time is that time.
    expect(timeOfAnswer("The dawn prayer")).toBe("dawn");
    expect(timeOfAnswer("The noon prayer")).toBe("midday");
    expect(timeOfAnswer("Asr, the afternoon prayer")).toBe("afternoon");
    expect(timeOfAnswer("Maghrib, the sunset prayer")).toBe("sunset");
    expect(timeOfAnswer("The Isha prayer")).toBe("night");
    // "The morning" can be dawn or after sunrise; the fast lasts "until night", which begins at sunset. A prayer's
    // name alone counts only in a question read for it (below).
    for (const unclear of ["The early morning", "In the morning", "Early in the morning", "Until night", "Fajr", "Maghrib"]) expect([unclear, timeOfAnswer(unclear)]).toEqual([unclear, undefined]);
  });

  it("asks a prayer by its name in the sky only where the question's words give no time away", () => {
    const prayers = ["Maghrib", "Fajr", "Zuhr", "Asr"];
    expect(skyTimesFor(question("Which prayer had they just prayed with him ﷺ?", prayers))).toEqual({ a: "sunset", b: "dawn", c: "midday", d: "afternoon" });
    // Each answer's small sky would answer these: the time is in their words.
    expect(skyTimesFor(question("Which prayer is before sunrise, per Ibn Kathir?", ["Asr", "Maghrib", "Isha", "Fajr"], 3))).toBeUndefined();
    expect(skyTimesFor(question("The prayer day begins with ____ at dawn.", ["Isha", "Asr", "Fajr"], 2))).toBeUndefined();
    expect(skyTimesFor(question("Which comes first?", ["Isha", "Fajr", "Asr"], 1))).toBeUndefined();
    // The learner taps the prayer when every answer is one.
    expect(answersArePrayers(question("?", prayers))).toBe(true);
    expect(answersArePrayers(question("?", ["The sunset prayer", "The noon prayer", "The dawn prayer", "The night prayer"]))).toBe(true);
    expect(answersArePrayers(suhur)).toBe(false);
  });

  it("puts each answer at its time, and leaves questions with two answers at one time, or too few, to the tiles", () => {
    expect(skyTimesFor(suhur)).toEqual({ a: "sunset", b: "midday", c: "night", d: "lastThird" });
    expect(skyTimesFor(question("When?", ["At night", "At midnight", "At noon"]))).toBeUndefined();
    expect(skyTimesFor(question("When?", ["At dawn", "At noon"]))).toBeUndefined();
    expect(skyTimesFor(question("When?", ["At dawn", "Badr", "At noon"]))).toBeUndefined();
    expect(skyTimesFor(question("Suhur is before dawn.", ["True", "False"], 0, "true_false"))).toBeUndefined();
  });

  it("asks the course's 30 time and prayer questions in the sky, each one read and checked", () => {
    const asked: Record<string, string> = {};
    for (const lesson of Object.values(LESSONS_BY_ID) as Lesson[]) {
      for (const challenge of lesson.challenges) {
        const times = skyTimesFor(challenge);
        if (!times) continue;
        asked[challenge.prompt] = times[challenge.correctChoiceId];
        // Nothing is asked both on the map and in the sky.
        expect([challenge.prompt, mapPlacesFor(challenge)]).toEqual([challenge.prompt, undefined]);
      }
    }
    expect(asked).toEqual(REVIEWED);
    // The journey du'a's answers are all times, but it stays as tiles: its Arabic is the time just before dawn.
    const all = (Object.values(LESSONS_BY_ID) as Lesson[]).flatMap((lesson) => lesson.challenges);
    const journey = all.find((challenge) => challenge.prompt === "At what time did he ﷺ say the journey du'a?")!;
    expect(journey.choices.every((choice) => timeOfAnswer(choice.label))).toBe(true);
    expect(skyTimesFor(journey)).toBeUndefined();
  });

  it("is a way of asking of its own, always used for a time question", () => {
    variety(true);
    expect(questionFormat(suhur, { sky: true })).toBe("sky");
    expect(questionFormat(suhur, { sky: true, recall: true, language: "ur" })).toBe("sky");
    expect(questionFormat(suhur, {})).not.toBe("sky");
    variety(false);
    expect(questionFormat(suhur, { sky: true })).toBe("choose");
  });

  it("opens the sky on a time no answer is, and always plays it forward", () => {
    for (const lesson of Object.values(LESSONS_BY_ID) as Lesson[]) {
      for (const challenge of lesson.challenges) {
        const times = skyTimesFor(challenge);
        if (times) expect([challenge.prompt, Object.values(times).includes(openingTime(times))]).toEqual([challenge.prompt, false]);
      }
    }
    expect(tripTo(22, "dawn")).toEqual({ from: 22, to: 29.15 });
    expect(tripTo(29.15, "midday")).toEqual({ from: 5.15, to: 12.35 });
    expect(tripTo(12.35, "lastThird")).toEqual({ from: 12.35, to: 27 });
    expect(tripTo(15.5, "afternoon")).toEqual({ from: 15.5, to: 15.5 });
  });
});

describe("the sky question", () => {
  const shared = { mascotVariant: "girl", accent: "#58CC02", onCheck: jest.fn(), onContinue: jest.fn(), playSound: false };
  const background = (testID: string) => StyleSheet.flatten(screen.getByTestId(testID).props.style)?.backgroundColor;
  // The time of the day the sky is playing to.
  const skyGoesTo = () => DAY_TIMES.map((each) => each.key).filter((time) => screen.queryByTestId(`sky-game-at-${time}`, ALL));

  it("shows each answer with its own small sky; picking one plays the big sky to it, and CHECK waits for one", async () => {
    const onSelect = jest.fn();
    const times = skyTimesFor(suhur)!;
    const view = await render(<SkyGame {...shared} prompt={suhur.prompt} choices={suhur.choices} times={times} correctChoiceId="d" onSelect={onSelect} />);
    expect(screen.getByText("Tap the time of day")).toBeTruthy();
    expect(screen.getByTestId("sky-game-sky", ALL)).toBeTruthy();
    for (const choice of suhur.choices) expect(screen.getByTestId(`sky-tile-${choice.id}-${times[choice.id]}`)).toBeTruthy();
    // Before a pick, the forenoon: no answer is then.
    expect(skyGoesTo()).toEqual(["forenoon"]);
    expect(screen.getByTestId("exercise-check")).toBeDisabled();
    await press("choice-b");
    await press("choice-d");
    expect(onSelect.mock.calls.map(([id]) => id)).toEqual(["b", "d"]);
    await view.rerender(<SkyGame {...shared} prompt={suhur.prompt} choices={suhur.choices} times={times} correctChoiceId="d" selectedChoiceId="d" onSelect={onSelect} />);
    expect(screen.getByTestId("exercise-check")).not.toBeDisabled();
    expect(skyGoesTo()).toEqual(["lastThird"]);
    await view.rerender(<SkyGame {...shared} prompt={suhur.prompt} choices={suhur.choices} times={times} correctChoiceId="d" selectedChoiceId="a" onSelect={onSelect} />);
    expect(skyGoesTo()).toEqual(["sunset"]);
  });

  it("turns a right answer green; a wrong one red, with the right one green and the sky going on to the right time", async () => {
    const times = skyTimesFor(suhur)!;
    const view = await render(
      <SkyGame {...shared} prompt={suhur.prompt} choices={suhur.choices} times={times} correctChoiceId="d" selectedChoiceId="d" result={{ correct: true, correctLabel: "Before dawn", why: "" }} onSelect={jest.fn()} />
    );
    expect(background("sky-tile-d")).toBe(colors.correctBg);
    expect(background("sky-tile-a")).toBe(colors.white);
    await view.unmount();
    await render(
      <SkyGame {...shared} prompt={suhur.prompt} choices={suhur.choices} times={times} correctChoiceId="d" selectedChoiceId="b" result={{ correct: false, correctLabel: "Before dawn", why: "" }} onSelect={jest.fn()} />
    );
    expect(background("sky-tile-b")).toBe(colors.wrongBg);
    expect(background("sky-tile-d")).toBe(colors.correctBg);
    expect(skyGoesTo()).toEqual(["lastThird"]);
    expect(screen.getByTestId("feedback-sheet")).toBeTruthy();
    expect(screen.getByTestId("choice-a")).toBeDisabled();
  });

  it("asks for the prayer when the answers are prayers, each at its time", async () => {
    const tur = (Object.values(LESSONS_BY_ID) as Lesson[]).flatMap((lesson) => lesson.challenges).find((challenge) => challenge.prompt === "In which prayer did he ﷺ recite At-Tur, per Bukhari 765?")!;
    const times = skyTimesFor(tur)!;
    expect(answersArePrayers(tur)).toBe(true);
    const maghrib = tur.choices.find((choice) => choice.label === "Maghrib")!;
    await render(<SkyGame {...shared} prompt={tur.prompt} choices={tur.choices} times={times} byPrayer correctChoiceId={tur.correctChoiceId} selectedChoiceId={maghrib.id} onSelect={jest.fn()} />);
    expect(screen.getByText("Tap the prayer")).toBeTruthy();
    expect(screen.queryByText("Tap the time of day")).toBeNull();
    // Maghrib's tile shows the sunset, and picking it plays the sky to the sunset, where its name comes into the sky.
    expect(screen.getByTestId(`sky-tile-${maghrib.id}-sunset`)).toBeTruthy();
    expect(skyGoesTo()).toEqual(["sunset"]);
    expect(screen.getByTestId("sky-mark-0", ALL)).toHaveTextContent("Maghrib");
    // A time question names no prayer in the sky.
    await render(<SkyGame {...shared} prompt={suhur.prompt} choices={suhur.choices} times={skyTimesFor(suhur)!} correctChoiceId="d" selectedChoiceId="d" onSelect={jest.fn()} />);
    expect(screen.queryByTestId("sky-mark-0", ALL)).toBeNull();
  });

  it("speaks the learner's language", async () => {
    setActiveLanguage("ur");
    const english = LESSONS_BY_ID["lesson-deep-fast-suhur-blessing"].challenges.find((challenge) => skyTimesFor(challenge))!;
    const shown = localizeLessonContent(LESSONS_BY_ID["lesson-deep-fast-suhur-blessing"], "ur").challenges.find((challenge) => challenge.id === english.id)!;
    await render(<SkyGame {...shared} prompt={shown.prompt} choices={shown.choices} times={skyTimesFor(english)!} correctChoiceId={shown.correctChoiceId} onSelect={jest.fn()} />);
    expect(screen.getByText("دن کے وقت پر ٹیپ کریں")).toBeTruthy();
    expect(screen.getByTestId(`choice-${english.correctChoiceId}`)).toHaveTextContent(/[؀-ۿ]/);
  });
});

describe("in a lesson", () => {
  it("asks when suhur is eaten in the sky, and goes on", async () => {
    variety(true);
    const fasting = COURSE.sections.find((section) => section.topicId === "fasting")!;
    const at = fasting.nodes.findIndex((node) => node.lessonIds.includes("lesson-deep-fast-suhur-blessing"));
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
    await screen.findByTestId("learn-path-fasting");
    await press(`path-node-${node.id}`);
    await press("node-card-start");

    let inSky = 0;
    for (let turn = 0; turn < 60 && !screen.queryByTestId("lesson-complete"); turn += 1) {
      await toQuestion();
      if (screen.queryByTestId("match-game")) {
        await finishMatch(session.lesson.challenges);
        continue;
      }
      const shown = questionOnScreen(session.lesson.challenges);
      if (!shown) break;
      if (screen.queryByTestId("sky-game")) {
        inSky += 1;
        expect(screen.getByTestId("sky-game-sky", ALL)).toBeTruthy();
      }
      await pickRight(shown);
      await press("exercise-check");
      await press("feedback-continue");
      // "Want it harder?" after a few right in a row: the lesson stays as it is.
      if (screen.queryByTestId("feedback-continue") && !screen.queryByTestId("lesson-complete")) await press("harder-no");
    }
    expect(inSky).toBeGreaterThanOrEqual(1);
    expect(await screen.findByTestId("lesson-complete")).toBeTruthy();
  });
});
