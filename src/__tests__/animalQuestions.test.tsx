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
import { choicePictures } from "../data/lessonPictures";
import { setActiveLanguage } from "../i18n";
import { localizeLessonContent } from "../services/contentLocalization";
import { setStoredItem } from "../services/appStorage";
import type { Challenge, LearningNodeView, Lesson, SupportedLanguage } from "../types";
import { AnimalGame } from "../ui/lesson/AnimalGame";
import { ANIMAL_BOX, ANIMAL_KINDS, animalArt, homeSvg, type AnimalKind } from "../ui/lesson/animalArt";
import { animalOfAnswer, animalsFor, cardLook, cardRows, nameFits } from "../ui/lesson/animalQuestions";
import { mapPlacesFor } from "../ui/lesson/mapQuestions";
import { monthsFor } from "../ui/lesson/monthQuestions";
import { questionFormat } from "../ui/lesson/questionFormats";
import { skyTimesFor } from "../ui/lesson/skyQuestions";
import { withListenQuestion } from "../ui/lesson/listenQuestion";
import { colors } from "../ui/theme";
import { finishMatch, pickRight, questionOnScreen, toQuestion } from "./lessonDriver";
import { makeUser } from "./testUtils";

// Fahad: more interactive questions, with living pictures. A question whose answers are all animals ("The hoopoe",
// "The crow", "The eagle") is answered on picture cards: each animal drawn in its place and moving its own way.

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
const hoopoe = question("Which bird brought Sulayman news?", ["The hoopoe", "The crow", "The eagle", "The dove"], 0);
const salih = question("Allah sent Salih's people a special ____ as a sign.", ["horse", "bird", "camel"], 2);

// Every question the course asks on picture cards, with its right answer's animal: each was read to check that its
// answers are all animals, and that a drawing of them is fitting. A new one fails here until it is read and added.
const REVIEWED: Record<string, AnimalKind> = {
  "Allah sent Salih's people a special ____ as a sign.": "camel",
  "What did he ﷺ make sit across in front of him?": "camel",
  "What did he hunt?": "donkey",
  "Which bird brought Sulayman news?": "hoopoe",
  "What did he ﷺ tell Umm Hani to keep?": "sheep",
  "Which animals did he ﷺ say have good in their foreheads?": "horse",
  "What pet did little Abu Umayr have?": "bird",
  "Which animal is named in the warning?": "donkey",
  "Laying the forearms flat is compared to...?": "dog",
  "What did the angel give the man who had been blind?": "sheep",
  "What stung the man in this hadith?": "scorpion",
  "What small creature is an example in ayah 26?": "mosquito",
  "Ayah 41: which creatures glorify Allah with wings spread?": "bird",
  "Who warned the other ants, in An-Naml?": "ant",
  "Which animal are people told to look at?": "camel",
  "Ayah 17: which animal are people told to look at?": "camel",
  "Ayah 1: whom did the army bring along?": "elephant",
  "Which small creature does 2:26 mention?": "mosquito",
  "What were they told to sacrifice?": "cow",
  "Whom did your Lord inspire, in 16:68?": "bee",
  "Which bird came to the boat, in the hadith?": "sparrow",
  "What also gathered, in 38:19?": "bird",
  "Which animal gets its right, in the hadith?": "sheep",
  "What was Muadh riding, per Bukhari 2856?": "donkey",
  "What are people compared to, in 54:7?": "locust",
  "What animal is used in the example of 62:5?": "donkey",
  "What comes after the camel?": "cow",
  "What animal is a hypocrite compared to?": "sheep",
  "What were they compared to in 74:50?": "donkey",
  "Which animal claims its right?": "sheep",
  "What was he asked about?": "donkey",
  "Which tiny creature in its hole prays for the teacher of good?": "ant"
};

// Their answers are all animals, but one is the apes people were turned into (2:65): not drawn, so they stay tiles.
const LEFT_AS_TILES = ["What were they made like?"];

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

// The animals are a picture, hidden from screen readers (each card says its answer).
const ALL = { includeHiddenElements: true };

describe("which questions are asked on picture cards", () => {
  it("reads an animal's name however it is written, and leaves answers that are not just an animal", () => {
    expect(animalOfAnswer("The hoopoe")).toBe("hoopoe");
    expect(animalOfAnswer("An ant.")).toBe("ant");
    expect(animalOfAnswer("A she-camel")).toBe("camel");
    expect(animalOfAnswer("His she-camel")).toBe("camel");
    expect(animalOfAnswer("Wild donkeys")).toBe("donkey");
    expect(animalOfAnswer("Their dog")).toBe("dog");
    expect(animalOfAnswer("THE HORNLESS SHEEP")).toBe("sheep");
    expect(animalOfAnswer("Spreading locusts")).toBe("locust");
    expect(animalOfAnswer("A little bird")).toBe("bird");
    // Not an animal, more than one, an animal with something more, or the apes (2:65), which are not drawn.
    for (const other of ["A guard", "A ship", "Nothing; he walked", "Moths and insects", "A marked sheep in a flock", "Apes", "Lamb", "A thread"]) {
      expect([other, animalOfAnswer(other)]).toEqual([other, undefined]);
    }
  });

  it("gives each answer its animal, and leaves to the tiles two answers of one animal, too few answers, or one that is not an animal", () => {
    expect(animalsFor(hoopoe)).toEqual({ a: "hoopoe", b: "crow", c: "eagle", d: "dove" });
    expect(animalsFor(salih)).toEqual({ a: "horse", b: "bird", c: "camel" });
    expect(animalsFor(question("Which?", ["Camels", "A she-camel", "A horse"]))).toBeUndefined();
    expect(animalsFor(question("Which?", ["A camel", "A horse"]))).toBeUndefined();
    expect(animalsFor(question("Who lay at the cave's entrance?", ["A cat", "Their dog", "A lion", "A guard"]))).toBeUndefined();
    expect(animalsFor(question("The hoopoe brought news.", ["True", "False"], 0, "true_false"))).toBeUndefined();
  });

  it("asks the course's animal questions on picture cards, each one read and checked", () => {
    const asked: Record<string, AnimalKind> = {};
    let places = 0;
    for (const { challenge } of allChallenges()) {
      const animals = animalsFor(challenge);
      if (!animals) continue;
      places += 1;
      asked[challenge.prompt] = animals[challenge.correctChoiceId];
      // Nothing is asked both on picture cards and on the map, in the sky, on the year, or on photo cards.
      expect([challenge.prompt, mapPlacesFor(challenge), skyTimesFor(challenge), monthsFor(challenge), choicePictures(challenge.choices)]).toEqual([challenge.prompt, undefined, undefined, undefined, undefined]);
    }
    expect(asked).toEqual(REVIEWED);
    expect(places).toBe(41);
    // The apes question stays as tiles: people were turned into apes, and a drawing could make light of it.
    for (const prompt of LEFT_AS_TILES) {
      const found = allChallenges().filter(({ challenge }) => challenge.prompt === prompt);
      expect([prompt, found.length > 0]).toEqual([prompt, true]);
      for (const { challenge } of found) {
        expect(challenge.choices.some((choice) => choice.label === "Apes")).toBe(true);
        expect(animalsFor(challenge)).toBeUndefined();
      }
    }
  });

  it("draws every animal, each in its place, the ones that fly with wings that beat about where they join the body", () => {
    expect(ANIMAL_KINDS).toHaveLength(30);
    for (const kind of Object.values(REVIEWED)) expect(ANIMAL_KINDS).toContain(kind);
    for (const kind of ANIMAL_KINDS) {
      const art = animalArt(kind);
      expect([kind, art.body.startsWith("<svg"), art.body.includes(`viewBox="0 0 ${ANIMAL_BOX.width} ${ANIMAL_BOX.height}"`)]).toEqual([kind, true, true]);
      expect(homeSvg(art.home).startsWith("<svg")).toBe(true);
      if (art.motion === "fly" || art.motion === "buzz") {
        expect([kind, Boolean(art.wings), art.pivot !== undefined && art.pivot > 0 && art.pivot < ANIMAL_BOX.height]).toEqual([kind, true, true]);
      } else expect([kind, art.wings]).toEqual([kind, undefined]);
    }
    // Each drawn its own way: no two animals the same drawing.
    expect(new Set(ANIMAL_KINDS.map((kind) => animalArt(kind).body)).size).toBe(ANIMAL_KINDS.length);
    // Birds fly in the sky, fish swim in the sea, the camel walks on the sand, the ant creeps on the ground.
    expect([animalArt("hoopoe").home, animalArt("whale").home, animalArt("camel").home, animalArt("ant").home]).toEqual(["sky", "sea", "land", "ground"]);
    expect([animalArt("hoopoe").motion, animalArt("bee").motion, animalArt("fish").motion, animalArt("camel").motion, animalArt("spider").motion]).toEqual(["fly", "buzz", "swim", "walk", "creep"]);
  });

  it("is a way of asking of its own, always used for an animal question", () => {
    variety(true);
    expect(questionFormat(hoopoe, { animal: true })).toBe("animal");
    expect(questionFormat(hoopoe, { animal: true, recall: true, language: "bn" })).toBe("animal");
    expect(questionFormat(hoopoe, {})).not.toBe("animal");
    // A gap sentence whose answers are animals is asked on picture cards too.
    expect(questionFormat(salih, { animal: true })).toBe("animal");
    variety(false);
    expect(questionFormat(hoopoe, { animal: true })).toBe("choose");
  });

  it("sets the cards two to a row, the third alone, read from the right in Urdu and Arabic", () => {
    expect(cardRows(["a", "b", "c", "d"])).toEqual([["a", "b"], ["c", "d"]]);
    expect(cardRows(["a", "b", "c"])).toEqual([["a", "b"], ["c"]]);
    expect(cardRows(["a", "b", "c", "d"], true)).toEqual([["b", "a"], ["d", "c"]]);
    expect(cardRows(["a", "b", "c"], true)).toEqual([["b", "a"], ["c"]]);
    // On the smallest phone a card is 139 wide; its picture is lower on a short phone.
    expect(cardLook(288)).toMatchObject({ card: 139, inner: 135, picture: 104 });
    expect(cardLook(288, true)).toMatchObject({ card: 139, picture: 82 });
  });

  it("fits every answer's name under its picture in two lines, on every phone and in every language", () => {
    const asked = allChallenges().filter(({ challenge }) => animalsFor(challenge));
    for (const language of LANGUAGES) {
      const names = new Set<string>();
      for (const { lesson, challenge, index } of asked) {
        const shown = language === "en" ? lesson : localizeLessonContent(lesson, language);
        shown.challenges[index].choices.forEach((choice, at) => {
          // In the learner's language, not in English (but for English itself).
          if (language !== "en") expect([language, choice.label === challenge.choices[at].label]).toEqual([language, false]);
          names.add(choice.label);
        });
      }
      for (const width of WIDTHS) for (const name of names) expect([language, width, name, nameFits(name, width)]).toEqual([language, width, name, true]);
    }
  });
});

describe("the animal question", () => {
  const shared = { mascotVariant: "girl", accent: "#58CC02", onCheck: jest.fn(), onContinue: jest.fn(), playSound: false };
  const background = (testID: string) => StyleSheet.flatten(screen.getByTestId(testID).props.style)?.backgroundColor;
  // The cards in the order they are drawn: row by row, each row as it is set.
  const drawnOrder = () => screen.getAllByTestId(/^choice-[a-z]$/).map((card) => String(card.props.testID).replace("choice-", ""));
  const animals = animalsFor(hoopoe)!;

  it("shows each answer on a card with its animal; picking one marks it, and CHECK waits for one", async () => {
    const onSelect = jest.fn();
    const view = await render(<AnimalGame {...shared} prompt={hoopoe.prompt} choices={hoopoe.choices} animals={animals} correctChoiceId="a" onSelect={onSelect} />);
    expect(screen.getByText("Tap the animal")).toBeTruthy();
    expect(drawnOrder()).toEqual(["a", "b", "c", "d"]);
    expect(screen.getAllByTestId(/^animal-row-\d$/)).toHaveLength(2);
    for (const choice of hoopoe.choices) {
      expect(screen.getByTestId(`choice-${choice.id}`)).toHaveTextContent(choice.label);
      expect(screen.getByTestId(`choice-${choice.id}`).props.accessibilityLabel).toBe(choice.label);
    }
    expect(screen.getByTestId("animal-picture-a-hoopoe")).toBeTruthy();
    expect(screen.getByTestId("animal-picture-d-dove")).toBeTruthy();
    // Birds beat their wings.
    expect(screen.getByTestId("animal-picture-b-crow-wings", ALL)).toBeTruthy();
    expect(screen.getByTestId("exercise-check")).toBeDisabled();
    await press("choice-c");
    await press("choice-a");
    expect(onSelect.mock.calls.map(([id]) => id)).toEqual(["c", "a"]);
    await view.rerender(<AnimalGame {...shared} prompt={hoopoe.prompt} choices={hoopoe.choices} animals={animals} correctChoiceId="a" selectedChoiceId="a" onSelect={onSelect} />);
    expect(screen.getByTestId("exercise-check")).not.toBeDisabled();
    expect(screen.getByTestId("choice-a").props.accessibilityState).toMatchObject({ selected: true });
    expect(screen.getByTestId("choice-b").props.accessibilityState).toMatchObject({ selected: false });
    expect(background("animal-tile-a")).not.toBe(colors.white);
    expect(background("animal-tile-b")).toBe(colors.white);
  });

  it("sets three answers two and one, the camel among them walking with no wings", async () => {
    await render(<AnimalGame {...shared} prompt={salih.prompt} choices={salih.choices} animals={animalsFor(salih)!} correctChoiceId="c" onSelect={jest.fn()} />);
    expect(screen.getAllByTestId(/^animal-row-\d$/)).toHaveLength(2);
    expect(screen.getByTestId("animal-row-1")).toHaveTextContent("camel");
    expect(screen.getByTestId("animal-picture-c-camel")).toBeTruthy();
    expect(screen.queryByTestId("animal-picture-c-camel-wings", ALL)).toBeNull();
    expect(screen.getByTestId("animal-picture-b-bird-wings", ALL)).toBeTruthy();
  });

  it("turns a right answer green; a wrong one red, and the right one green", async () => {
    const view = await render(
      <AnimalGame {...shared} prompt={hoopoe.prompt} choices={hoopoe.choices} animals={animals} correctChoiceId="a" selectedChoiceId="a" result={{ correct: true, correctLabel: "The hoopoe", why: "" }} onSelect={jest.fn()} />
    );
    expect(background("animal-tile-a")).toBe(colors.correctBg);
    expect(background("animal-tile-b")).toBe(colors.white);
    await view.unmount();
    await render(
      <AnimalGame {...shared} prompt={hoopoe.prompt} choices={hoopoe.choices} animals={animals} correctChoiceId="a" selectedChoiceId="b" result={{ correct: false, correctLabel: "The hoopoe", why: "" }} onSelect={jest.fn()} />
    );
    expect(background("animal-tile-b")).toBe(colors.wrongBg);
    expect(background("animal-tile-a")).toBe(colors.correctBg);
    expect(background("animal-tile-c")).toBe(colors.white);
    expect(screen.getByTestId("feedback-sheet")).toBeTruthy();
    expect(screen.getByTestId("choice-c")).toBeDisabled();
  });

  it("speaks the learner's language, and sets the cards from the right in Urdu and Arabic", async () => {
    const lesson = LESSONS_BY_ID["lesson-deep-prophet-sulayman-hoopoe"];
    const english = lesson.challenges.find((challenge) => animalsFor(challenge))!;
    const order = english.choices.map((choice) => choice.id);
    for (const language of ["ur", "ar"] as const) {
      setActiveLanguage(language);
      const shown = localizeLessonContent(lesson, language).challenges.find((challenge) => challenge.id === english.id)!;
      const view = await render(<AnimalGame {...shared} prompt={shown.prompt} choices={shown.choices} animals={animalsFor(english)!} correctChoiceId={shown.correctChoiceId} onSelect={jest.fn()} />);
      expect(screen.getByText(language === "ur" ? "جانور پر ٹیپ کریں" : "اضغط على الحيوان")).toBeTruthy();
      // The first answer on the right of the top row.
      expect(drawnOrder()).toEqual([order[1], order[0], order[3], order[2]]);
      expect(screen.getByTestId(`choice-${english.correctChoiceId}`)).toHaveTextContent(language === "ur" ? "ہدہد" : "الهدهد");
      await view.unmount();
    }
    setActiveLanguage("bn");
    const shown = localizeLessonContent(lesson, "bn").challenges.find((challenge) => challenge.id === english.id)!;
    await render(<AnimalGame {...shared} prompt={shown.prompt} choices={shown.choices} animals={animalsFor(english)!} correctChoiceId={shown.correctChoiceId} onSelect={jest.fn()} />);
    expect(screen.getByText("প্রাণীটিতে চাপো")).toBeTruthy();
    expect(drawnOrder()).toEqual(order);
    expect(screen.getByTestId(`choice-${english.correctChoiceId}`)).toHaveTextContent("হুদহুদ");
  });
});

describe("in a lesson", () => {
  it("asks which sign Allah sent Salih's people on picture cards, and goes on", async () => {
    variety(true);
    const lessonId = "lesson-prophets-early-messengers-hud-and-salih";
    const prophets = COURSE.sections.find((section) => section.topicId === "prophets")!;
    const at = prophets.nodes.findIndex((node) => node.lessonIds.includes(lessonId));
    expect(at).toBeGreaterThan(0);
    const before = prophets.nodes.slice(0, at);
    const user = makeUser({
      lastTopicId: "prophets",
      hearts: { current: 5, max: 5, unlimited: true, lastRefillDate: localDateKey() },
      completedLessonIds: ["warm-up-1", "warm-up-2", "warm-up-3", ...before.flatMap((node) => node.lessonIds)],
      completedNodeIds: before.map((node) => node.id)
    });
    setStoredItem("sira-path-user-profile", JSON.stringify(user));
    const node = learningApi.getPathNodes(user).find((item) => item.id === prophets.nodes[at].id) as LearningNodeView;
    expect(node.status).not.toBe("locked");
    const session = await learningApi.getLessonSession(node.firstLessonId, user);
    // With its listening question ("Listen, then pick what it means."), as the app adds it.
    const challenges = withListenQuestion(session.lesson, node.id).challenges;
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-prophets", undefined, { timeout: 10000 });
    await press(`path-node-${node.id}`);
    await press("node-card-start");

    let onCards = 0;
    for (let turn = 0; turn < 60 && !screen.queryByTestId("lesson-complete"); turn += 1) {
      await toQuestion();
      if (screen.queryByTestId("match-game")) {
        await finishMatch(challenges);
        continue;
      }
      const shown = questionOnScreen(challenges);
      if (!shown) break;
      if (screen.queryByTestId("animal-game")) {
        onCards += 1;
        const animals = animalsFor(shown)!;
        expect(animals).toBeTruthy();
        for (const choice of shown.choices) expect(screen.getByTestId(`animal-picture-${choice.id}-${animals[choice.id]}`)).toBeTruthy();
      }
      await pickRight(shown);
      await press("exercise-check");
      await press("feedback-continue");
      // "Want it harder?" after a few right in a row: the lesson stays as it is.
      if (screen.queryByTestId("feedback-continue") && !screen.queryByTestId("lesson-complete")) await press("harder-no");
    }
    expect(onCards).toBeGreaterThanOrEqual(1);
    expect(await screen.findByTestId("lesson-complete")).toBeTruthy();
  });
});
