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
import type { TestInstance } from "test-renderer";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import TopicApp from "../TopicApp";
import { learningApi, localDateKey } from "../api/islamicLearningApi";
import { COURSE, LESSONS_BY_ID } from "../data/course";
import { choicePictures } from "../data/lessonPictures";
import { SIGN_SCENES, type SignKind } from "../data/signScenes";
import { setActiveLanguage } from "../i18n";
import { localizeLessonContent } from "../services/contentLocalization";
import { setStoredItem } from "../services/appStorage";
import type { Challenge, LearningNodeView, Lesson } from "../types";
import { SignSceneView } from "../ui/journey/SignScene";
import { leadMs, momentMs } from "../ui/journey/SignScene";
import { keyAt, signArt } from "../ui/journey/signArt";
import { SceneGame } from "../ui/lesson/SceneGame";
import { cardsFor } from "../ui/lesson/cardQuestions";
import { mapPlacesFor } from "../ui/lesson/mapQuestions";
import { monthsFor } from "../ui/lesson/monthQuestions";
import { questionFormat } from "../ui/lesson/questionFormats";
import { sceneAsks, sceneMoment, sceneQuestionFor } from "../ui/lesson/sceneQuestions";
import { skyTimesFor } from "../ui/lesson/skyQuestions";
import { colors } from "../ui/theme";
import { finishMatch, pickRight, questionOnScreen, toQuestion } from "./lessonDriver";
import { makeUser } from "./testUtils";

// Fahad: more interactive questions, with living pictures. A question on a moment of one of the living scenes that
// lessons open on (the ark coming to rest on al-Judi, the twelve springs, the ant calling the others in) is asked on
// that scene: it plays up to just before the moment and waits with a "?", then plays the moment once answered.

const variety = (on: boolean) => ((globalThis as { __QUESTION_VARIETY__?: boolean }).__QUESTION_VARIETY__ = on);

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

afterEach(() => {
  variety(false);
  setActiveLanguage("en");
});

// The scene is a picture, hidden from screen readers (the tiles say each answer).
const ALL = { includeHiddenElements: true };

const ALL_CHALLENGES = (Object.values(LESSONS_BY_ID) as Lesson[]).flatMap((lesson) => lesson.challenges.map((challenge) => ({ lesson, challenge })));
const rightOf = (challenge: Challenge) => challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label ?? "";

describe("which questions are asked on a scene", () => {
  it("asks each story question that was read with its scene, wherever the course asks it", () => {
    const asks = sceneAsks();
    // Each one was read with its scene: its right answer is what the moment shows, and the scene before it does not
    // show it. A question changed in the course fails here until it is read again.
    expect(asks.length).toBe(611);
    let places = 0;
    for (const ask of asks) {
      const found = ALL_CHALLENGES.filter(({ challenge }) => challenge.prompt === ask.prompt && rightOf(challenge) === ask.answer);
      expect([ask.prompt, found.length > 0]).toEqual([ask.prompt, true]);
      places += found.length;
      for (const { challenge } of found) {
        const shown = sceneQuestionFor(challenge);
        expect([ask.prompt, shown?.scene.id]).toEqual([ask.prompt, ask.sceneId]);
        // Not a time, a month, a place or a drawn thing: those are asked on their own pictures, so this one is on its scene.
        const multiple = challenge.type === "multiple_choice";
        expect([ask.prompt, Boolean(challenge.listen), multiple && Boolean(skyTimesFor(challenge) || monthsFor(challenge) || cardsFor(challenge) || mapPlacesFor(challenge) || choicePictures(challenge.choices))]).toEqual([
          ask.prompt,
          false,
          false
        ]);
      }
    }
    expect(places).toBe(857);
  });

  it("finds a question by its prompt and its right answer, so another question with the same prompt is not asked on it", () => {
    const army = ALL_CHALLENGES.find(({ challenge }) => challenge.prompt === "Ayahs 1-2: what are they about?" && rightOf(challenge) === "The army of the elephant")!.challenge;
    expect(sceneQuestionFor(army)?.scene.kind).toBe("elephant");
    const others = ALL_CHALLENGES.filter(({ challenge }) => challenge.prompt === "Ayahs 1-2: what are they about?" && rightOf(challenge) !== "The army of the elephant" && rightOf(challenge) !== "Two journeys");
    expect(others.length).toBeGreaterThan(3);
    for (const { challenge } of others) expect(sceneQuestionFor(challenge)).toBeUndefined();
  });

  it("is a way of asking of its own, always used for a story question, true or false ones too", () => {
    variety(true);
    const judi = ALL_CHALLENGES.find(({ challenge }) => challenge.prompt === "Where did the Ark come to rest?")!.challenge;
    const camel = ALL_CHALLENGES.find(({ challenge }) => challenge.prompt === "The she-camel was a sign from Allah.")!.challenge;
    expect(camel.type).toBe("true_false");
    for (const challenge of [judi, camel]) {
      expect(questionFormat(challenge, { scene: true })).toBe("scene");
      expect(questionFormat(challenge, { scene: true, recall: true, language: "ur" })).toBe("scene");
      expect(questionFormat(challenge, {})).not.toBe("scene");
    }
    // Answers with pictures of their own keep them.
    expect(questionFormat(judi, { scene: true, cards: true })).toBe("cards");
    expect(questionFormat(judi, { scene: true, sky: true })).toBe("sky");
    expect(questionFormat({ ...judi, listen: { text: "x" } } as unknown as Challenge, { scene: true })).toBe("choose");
    variety(false);
    expect(questionFormat(judi, { scene: true })).toBe("choose");
  });
});

describe("where the scene waits and where it stops", () => {
  it("waits where the moment before ends, so nothing of the moment and none of its words show yet", () => {
    for (const ask of sceneAsks()) {
      const scene = SIGN_SCENES.find((each) => each.id === ask.sceneId)!;
      const words = signArt(scene.kind).words;
      const first = words.findIndex((word) => word.text === ask.from);
      const last = words.findIndex((word) => word.text === ask.to);
      expect([ask.prompt, first >= 0, last >= first]).toEqual([ask.prompt, true, true]);
      const moment = sceneMoment(scene.kind, ask.from, ask.to)!;
      // It waits where the words before end (their pill gone), or at the start, before any of the moment's words.
      expect([ask.prompt, moment.pause]).toEqual([ask.prompt, first > 0 ? words[first - 1].to : 0]);
      for (const word of words.slice(first, last + 1)) expect([ask.prompt, word.from > moment.pause]).toEqual([ask.prompt, true]);
      // It stops on the last moment, its words still showing.
      expect([ask.prompt, words[last].from < moment.reveal, moment.reveal <= words[last].to]).toEqual([ask.prompt, true, true]);
      expect([ask.prompt, moment.reveal === 1 || moment.reveal <= words[last].to - 0.025]).toEqual([ask.prompt, true]);
    }
  });

  // A part's keyed value at `t` of its scene's story (its resting value when it has no such key).
  const value = (kind: SignKind, name: string, key: "opacity" | "rotate" | "x" | "y" | "scale" | "scaleX" | "scaleY", t: number) => {
    const keys = signArt(kind).parts.find((each) => each.name === name)!.keys;
    const values = keys?.[key];
    return keys && values ? keyAt(keys.at, values, t) : key === "opacity" || key === "scale" || key === "scaleX" || key === "scaleY" ? 1 : 0;
  };
  // A part's keyed value while the question waits, and once it is answered.
  const moved = (prompt: string, name: string, key: "rotate" | "x" | "y" | "scale" | "scaleX" | "scaleY") => {
    const { kind, pause, reveal } = asked(prompt);
    return [value(kind, name, key, pause), value(kind, name, key, reveal)];
  };
  // The scene a story question is asked on, where it waits, and where it stops once answered (its right answer, when
  // another question has the same prompt).
  const asked = (prompt: string, answer?: string) => {
    const ask = sceneAsks().find((each) => each.prompt === prompt && (answer === undefined || each.answer === answer))!;
    const kind = SIGN_SCENES.find((each) => each.id === ask.sceneId)!.kind;
    return { kind, ...sceneMoment(kind, ask.from, ask.to)! };
  };
  // How much of each part shows while the question waits, and once it is answered.
  const shown = (prompt: string, names: string[], answer?: string) => {
    const { kind, pause, reveal } = asked(prompt, answer);
    return [names.map((name) => value(kind, name, "opacity", pause)), names.map((name) => value(kind, name, "opacity", reveal))];
  };

  it("waits on the Prophets' stories before anything of the answer shows, and shows it once answered", () => {
    // Where the fire burned: only the far fire while it waits; then, near, the green bush on fire.
    expect(shown("Where was the fire burning, per Ibn Kathir?", ["far fire", "green bush", "fire in the bush"])).toEqual([
      [1, 0, 0],
      [0, 1, 1]
    ]);
    // What the stick became: no staff and no snake yet; then the snake.
    expect(shown("What did the stick become, in 20:20?", ["staff", "snake"])).toEqual([
      [0, 0],
      [0, 1]
    ]);
    // What the staff did: the serpent by their ropes and staffs, none swallowed yet; then all of them gone.
    expect(shown("What did the staff do, in 7:117?", ["great serpent", "seeming to move, left", "seeming to move, right"])).toEqual([
      [1, 1, 1],
      [1, 0, 0]
    ]);
    // What al-Khidr fixed: the boat with its hole, no town and no wall yet; then the wall, set straight.
    const wall = asked("What did Al-Khidr fix, in 18:77?");
    expect(shown("What did Al-Khidr fix, in 18:77?", ["hole in the boat", "the town", "wall about to fall"])).toEqual([
      [1, 0, 0],
      [1, 1, 1]
    ]);
    expect([value(wall.kind, "wall about to fall", "rotate", 0.6), value(wall.kind, "wall about to fall", "rotate", wall.reveal)]).toEqual([8, 0]);
    // How high the iron went: none yet; then all four rows, up to the mountains' tops.
    expect(shown("How high did the blocks go, per Ibn Kathir?", [1, 2, 3, 4].map((row) => `blocks of iron, row ${row}`))).toEqual([
      [0, 0, 0, 0],
      [1, 1, 1, 1]
    ]);
    // What grew over Yunus: the open shore, bare; then the gourd plant.
    expect(shown("What grew over him, in 37:146?", ["open shore", "gourd plant"])).toEqual([
      [1, 0],
      [1, 1]
    ]);
    // What fell from the palm: no dates yet; then the dates, fallen by its foot.
    expect(shown("What fell from the palm, in 19:25?", ["ripe dates", "falling date 1", "falling date 4"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
  });

  it("waits on the stories of Allah's favors to His Prophets before anything of the answer shows, and shows it once answered", () => {
    // What Dawud made from the iron: the iron bending, no coat yet; then the coat of mail, every row of its rings joined.
    expect(shown("What did Dawud make from the iron?", ["iron bending", "coat of mail", "rings of the coat, band 1", "rings of the coat, band 4"])).toEqual([
      [1, 0, 0, 0],
      [0, 1, 1, 1]
    ]);
    // What the birds did: none yet; then gathered with him, from both sides.
    expect(shown("What did the birds do, per Ibn Kathir?", ["birds gathered, left", "birds gathered, right"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    // What Ismail helped build: the dry valley, not a stone yet; then the House, every course of it.
    expect(shown("Ismail helped his father Ibrahim build the ____.", [1, 2, 3, 4, 5].map((course) => `stones of the House, course ${course}`))).toEqual([
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1]
    ]);
    // How the pilgrims would come: no path and no camel yet; then the camels on the paths, from both sides.
    expect(shown("How would the pilgrims come?", ["paths to the House", "camel coming, left", "camel coming, right"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    // How many times between Safa and Marwah: none counted yet; then all seven.
    const times = [1, 2, 3, 4, 5, 6, 7].map((time) => `time ${time}`);
    expect(shown("How many times did Hajar go between Safa and Marwah?", times)).toEqual([times.map(() => 0), times.map(() => 1)]);
    // What came out: the footsteps, no water yet; then the water of Zamzam.
    expect(shown("What came out at the spot of Zamzam?", ["footsteps between them", "the water of Zamzam", "water coming out"])).toEqual([
      [1, 0, 0],
      [0, 1, 1]
    ]);
    // How they found the water: no bird yet; then a bird circling over it.
    expect(shown("How did they find the water?", ["a bird circling over the water"])).toEqual([[0], [1]]);
    // How fast her throne was brought: far off in Saba; then here, in the hall.
    expect(shown("How fast was her throne brought?", ["her throne, far off", "her throne, here"])).toEqual([
      [1, 0],
      [0, 1]
    ]);
    // What was under the glass floor: no glass yet; then the glass, with water under it.
    expect(shown("What was under the glass floor?", ["the glass", "water under the glass"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    // What Zakariyya found: nothing yet; then the provision with her.
    expect(shown("What did Zakariyya find each time he entered her room?", ["provision with her"])).toEqual([[0], [1]]);
    // What Allah told the fire: blazing, not yet cool; then cool, and safe.
    expect(shown("What did Allah tell the fire?", ["the blazing fire", "the fire made cool", "safety"])).toEqual([
      [1, 0, 0],
      [0, 1, 1]
    ]);
  });

  it("waits on the stories of the Prophets' trials and their peoples before anything of the answer shows, and shows it once answered", () => {
    // What 'Ad built: the sandhills, no tower yet; then a tower risen on each high place.
    expect([1, 2, 3].map((each) => moved("What did 'Ad build on every high place?", `tower on a high place, ${each}`, "scaleY"))).toEqual([
      [0, 1],
      [0, 1],
      [0, 1]
    ]);
    // What they took the cloud for: no cloud yet; then the cloud facing their valleys, and no wind yet.
    expect(shown("What did 'Ad think the cloud was?", ["the cloud", "the wind"])).toEqual([
      [0, 0],
      [1, 0]
    ]);
    // Which wind: the cloud, no wind yet; then the storm, the wind and the sand blowing.
    expect(shown("Which wind took 'Ad?", ["the cloud", "darkness of the storm", "the wind", "blowing sand"])).toEqual([
      [1, 0, 0, 0],
      [0, 1, 1, 1]
    ]);
    // How long: none counted yet; then all seven nights and eight days.
    const turns = [1, 2, 3, 4, 5, 6, 7, 8].flatMap((each) => (each < 8 ? [`day ${each}`, `night ${each}`] : [`day ${each}`]));
    expect(shown("How long did the wind blow on Ad?", turns)).toEqual([turns.map(() => 0), turns.map(() => 1)]);
    // What was left: the storm still blowing, the towers and palms gone; then the storm gone, and only their homes.
    expect(shown("Ayah 25: what was left of Ad after the wind?", ["the wind", "darkness of the storm", "tower on a high place, 1", "palm trees", "their homes", "sand drifted at their homes"])).toEqual([
      [1, 1, 0, 0, 1, 0],
      [0, 0, 0, 0, 1, 1]
    ]);
    // Where she put him: the chest on the bank; then the chest in the river.
    const [bank, river] = moved("Where did Musa's mother put baby Musa?", "the chest", "y");
    expect([bank, river > 4]).toEqual([0, true]);
    // Do not fear: no light yet; then the chest sailing under His care.
    expect(shown("Allah told her not to fear and not to grieve.", ["under His care"])).toEqual([[0], [1]]);
    // What his sister was told: no footprints yet; then her footprints following the chest.
    const steps = [1, 2, 3, 4, 5].map((each) => `footprints following the chest, step ${each}`);
    expect(shown("What did Musa's mother tell his sister to do?", steps)).toEqual([steps.map(() => 0), steps.map(() => 1)]);
    // Who nursed him: the chest on the shore by the palace; then it is gone, and the light is in their home.
    expect(shown("Who nursed Musa in the end?", ["the chest", "evening", "light in their home"])).toEqual([
      [1, 0, 0],
      [0, 1, 1]
    ]);
    // His keys: not one yet; then all eight.
    const keys = [1, 2, 3, 4, 5, 6, 7, 8].map((each) => `key ${each}`);
    expect(shown("How heavy were Qarun's keys?", keys)).toEqual([keys.map(() => 0), keys.map(() => 1)]);
    // How he went out: nothing yet; then his beasts in their finery, all three going out.
    expect(shown("How did Qarun go out, in 28:79?", ["horse in finery, 1", "camel in finery, 2", "horse in finery, 3"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    // What happened to him: his home and treasure standing; then sunk into the earth, the earth cracked.
    expect(["his home", "his treasure", "key 1"].map((name) => moved("What happened to Qarun?", name, "y"))).toEqual([
      [0, 44],
      [0, 44],
      [0, 44]
    ]);
    expect(shown("What happened to Qarun?", ["the earth cracking", "where it was swallowed"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    // Why the women waited: the shepherds' flocks drinking, none held back yet; then their flock, held back.
    const held = [1, 2, 3].map((each) => `flock held back, ${each}`);
    expect(shown("Why were the women waiting, in 28:23?", held)).toEqual([held.map(() => 0), held.map(() => 1)]);
    // How he helped: the bucket in the well, their flock apart; then the bucket poured, and their flock at the trough.
    expect([moved("How did Musa help the two women?", "the bucket", "rotate"), ...held.map((name) => moved("How did Musa help the two women?", name, "x"))]).toEqual([
      [0, 60],
      [0, 58],
      [0, 58],
      [0, 58]
    ]);
    expect(shown("How did Musa help the two women?", ["water poured"])).toEqual([[0], [1]]);
    // What he said: no light in the shade yet; then the light in the shade.
    expect(shown("What did Musa say in the shade?", ["turned to the shade"])).toEqual([[0], [1]]);
    // What Ayyub struck: the dry land, still; then the rings of the ground struck, and it opening.
    const [still, struck] = shown("What was Ayyub told to strike?", ["strike the ground, 3", "the ground opening"]);
    expect([still, struck.every((each) => each > 0.5)]).toEqual([[0, 0], true]);
    // What came out: the dry land; then the spring and the cool water, the wilted plant gone.
    expect(shown("What came out for him?", ["spring coming out", "the cool water", "wilted plant"])).toEqual([
      [0, 0, 1],
      [1, 1, 0]
    ]);
    // What fell on him: nothing yet; then the golden locusts, falling and fallen.
    expect(shown("What fell on Ayyub after his cure?", ["golden locusts falling", "golden locusts on the ground"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    // What Allah called him: no light yet; then the light of his patience.
    expect(shown("What did Allah call him?", ["light of his patience"])).toEqual([[0], [1]]);
    // How many stars: not one yet; then all eleven, and not yet the sun and the moon.
    const stars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((each) => `star ${each}`);
    expect(shown("How many stars did Yusuf see in his dream?", [...stars, "the sun", "the moon"])).toEqual([
      [...stars.map(() => 0), 0, 0],
      [...stars.map(() => 1), 0, 0]
    ]);
    // Whom not to tell: the dream; then their home at night, its window's shutters closed.
    expect(shown("Whom should Yusuf not tell, in 12:5?", ["night at their home", "star 1", "the sun"])).toEqual([
      [0, 1, 1],
      [1, 0, 0]
    ]);
    expect(["left", "right"].map((side) => moved("Whom should Yusuf not tell, in 12:5?", `shutter closing, ${side}`, "scaleX"))).toEqual([
      [0, 1],
      [0, 1]
    ]);
    // What the eleven stars stood for: the night; then the morning, and the dream made true.
    expect(shown("What did the eleven stars stand for, as the story ends?", ["night at their home", "morning", "the dream made true"])).toEqual([
      [1, 0, 0],
      [0, 1, 1]
    ]);
  });

  it("waits on the stories told with Allah's commands before anything of the answer shows, and shows it once answered, standing still", () => {
    // What the cheaters do: both sacks low; then their own sack filled and heaped, the other filled short, and the
    // measure standing upright by it.
    expect(["their own sack", "the other sack"].map((name) => moved("What do the cheaters do?", name, "scaleY"))).toEqual([
      [0.62, 1],
      [0.62, 0.7]
    ]);
    expect(shown("What do the cheaters do?", ["grain heaped in their own sack", "grain heaped in the other sack"])).toEqual([
      [0, 0],
      [1, 0]
    ]);
    // Full measure: the other sack short, under a dim sky; then filled and heaped, the sky clear.
    expect(moved("How should we measure, in 17:35?", "the other sack", "scaleY")).toEqual([0.7, 1]);
    expect(shown("How should we measure, in 17:35?", ["dim over the market", "grain heaped in the other sack"])).toEqual([
      [1, 0],
      [0, 1]
    ]);
    // A straight balance: tilted; then level, with its light.
    expect(moved("What must the balance be, in 26:182?", "beam of the balance", "rotate")).toEqual([-9, 0]);
    expect(shown("What must the balance be, in 26:182?", ["light of the straight balance"])).toEqual([[0], [1]]);
    // Wherever a question on the measure waits or stops, the measure stands upright and still, its grain poured.
    const streams = ["grain poured into their own sack", "grain poured short into the other sack", "grain poured in full into the other sack"];
    const still = (t: number) => (["x", "y", "rotate"] as const).every((key) => value("measure", "the measure", key, Math.max(0, t - 0.004)) === value("measure", "the measure", key, Math.min(1, t + 0.004)));
    const stops = sceneAsks()
      .filter((ask) => ask.sceneId === "sign-measure")
      .flatMap((ask) => Object.values(sceneMoment("measure", ask.from, ask.to)!));
    for (const t of new Set(stops)) {
      expect([t, value("measure", "the measure", "rotate", t), still(t), streams.map((name) => value("measure", name, "opacity", t))]).toEqual([t, 0, true, [0, 0, 0]]);
    }
    // The son's answer: the dream; then dawn, and the way up the hill.
    expect(shown("What did the son say?", ["the dream", "dawn", "the way up the hill"])).toEqual([
      [1, 0, 0],
      [0, 1, 1]
    ]);
    // Both submitted: the way up the hill; then the morning, and the light on the hilltop.
    expect(shown("What did both do, in 37:103?", ["the way up the hill", "morning", "light on the hilltop"])).toEqual([
      [1, 0, 0],
      [0, 1, 1]
    ]);
    // Who called him: no light from the sky yet; then the light.
    expect(shown("Who called Ibrahim, in 37:104?", ["light from the sky", "the great ram"])).toEqual([
      [0, 0],
      [1, 0]
    ]);
    // The ransom: no ram yet; then the great white ram, in its light.
    expect(shown("What did he see when he turned, per Ibn Abbas?", ["the great ram", "light of the great sacrifice"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    // The first qiblah: no arrow yet; then the arrow and the way toward Jerusalem.
    expect(shown("Which way did Muslims first pray in Madinah?", ["the arrow of the qiblah", "the way toward Jerusalem"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    expect(moved("Which way did Muslims first pray in Madinah?", "the arrow of the qiblah", "rotate")).toEqual([0, 0]);
    // The turn: the arrow toward Jerusalem; then turned right round, toward the Ka'bah, lit.
    expect(moved("Which way did the qiblah turn to?", "the arrow of the qiblah", "rotate")).toEqual([0, 180]);
    expect(shown("Which way did the qiblah turn to?", ["the way toward Jerusalem", "the way toward the Ka'bah", "the Ka'bah lit"])).toEqual([
      [1, 0, 0],
      [0, 1, 1]
    ]);
    // Everywhere: only Madinah's arrow, turned; then the others too, each turned toward the Ka'bah.
    const others = signArt("qiblah")
      .parts.filter((each) => each.name.startsWith("the qiblah of "))
      .map((each) => each.name);
    expect([others.length, shown("Do Muslims everywhere face the same Ka'bah?", others), others.map((name) => moved("Do Muslims everywhere face the same Ka'bah?", name, "rotate"))]).toEqual([
      3,
      [
        [0, 0, 0],
        [1, 1, 1]
      ],
      [
        [0, 180],
        [0, 180],
        [0, 180]
      ]
    ]);
    // Saba's gardens: none yet; then the two, grown.
    expect(shown("What did Saba have, in 34:15?", ["the garden on the left", "the garden on the right"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    // Eat and be grateful: no fruit yet; then the fruit on both.
    expect(shown("What were they told, in 34:15?", ["fruit of the garden on the left", "fruit of the garden on the right", "plenty"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    // The flood: the dam and the gardens; then the dam gone, and the flood over all the valley.
    expect(shown("What did Allah send, in 34:16?", ["the dam", "the flood of the dam", "the garden on the left", "the garden on the right"])).toEqual([
      [1, 0, 1, 1],
      [0, 1, 0, 0]
    ]);
    expect(moved("What did Allah send, in 34:16?", "the flood of the dam", "scale")).toEqual([0.1, 1]);
    // What the gardens became: the flood; then bitter fruit, tamarisk and lote trees.
    expect(shown("What did the gardens become, in 34:16?", ["the flood of the dam", "bitter fruit, tamarisk and a few lote trees"])).toEqual([
      [1, 0],
      [0, 1]
    ]);
    // Scattered: no camel yet; then their camels gone off apart, one each way.
    const camels = ["camel going away, left", "camel going away, right"];
    expect(camels.map((name) => moved("What happened to them, in 34:19?", name, "x").map(Math.sign))).toEqual([
      [0, -1],
      [0, 1]
    ]);
    // The cow's color: the cows that are not yellow, and no yellow cow; then they are gone, and the yellow cow has come.
    expect(shown("What color was the cow?", ["black and white cow", "brown cow", "the yellow cow", "pleasing to see"])).toEqual([
      [1, 1, 0, 0],
      [0, 0, 1, 1]
    ]);
    expect(moved("What color was the cow?", "the yellow cow", "x")).toEqual([-90, 0]);
  });

  it("waits on the stories of Allah's power before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const powers = ["sign-overturned", "sign-five-signs", "sign-sabbath", "sign-west-east", "sign-four-birds", "sign-hundred-years", "sign-shirt"];
    for (const ask of sceneAsks().filter((each) => powers.includes(each.sceneId))) {
      const kind = SIGN_SCENES.find((each) => each.id === ask.sceneId)!.kind;
      for (const t of Object.values(sceneMoment(kind, ask.from, ask.to)!)) {
        for (const part of signArt(kind).parts) {
          for (const [key, values] of Object.entries(part.keys ?? {})) {
            if (key === "at") continue;
            const at = (time: number) => keyAt(part.keys!.at, values as number[], Math.min(1, Math.max(0, time)));
            expect([ask.prompt, t, part.name, key, at(t) === at(t - 0.004) || at(t) === at(t + 0.004)]).toEqual([ask.prompt, t, part.name, key, true]);
          }
        }
      }
    }
    // Lut's town. The morning: the night, its stars and lamps; then the morning. Turned over: upright; then upside down.
    expect(shown("When was the punishment set to come, in 11:81?", ["stars", "lamps in the homes", "morning"])).toEqual([
      [1, 1, 0],
      [0, 0, 1]
    ]);
    expect(moved("What did Allah do to the town?", "the town", "rotate")).toEqual([0, 180]);
    expect([moved("What happened to the rest, in 37:136?", "the town", "rotate"), shown("What happened to the rest, in 37:136?", ["stones on it, layer on layer"])]).toEqual([[0, 180], [[0], [1]]]);
    // The stones: none yet, and a clear sky; then falling from a dark sky, and lying on it.
    expect(shown("What rained on it?", ["stones of baked clay falling", "stones on it, a first layer", "dark sky of the stones"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    expect(shown("What did Allah leave, in 51:37?", ["a clear sign"])).toEqual([[0], [1]]);
    // Pharaoh's people: the drought, and none of the five yet; then all five in turn, to the blood.
    const signs = ["the flood", "a swarm of locusts", "lice", "frogs", "the river turned to blood"];
    expect(shown("Ayahs 127-141: what are they about?", ["the burning sun of the drought", ...signs])).toEqual([
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1]
    ]);
    expect(shown("Which creatures were signs to Pharaoh's people, in Al-A'raf?", ["the flood", "a swarm of locusts", "frogs"])).toEqual([
      [1, 0, 0],
      [0, 0, 1]
    ]);
    expect(shown("Which of these was a sign sent in 7:133?", ["lice", "frogs"])).toEqual([
      [1, 0],
      [0, 1]
    ]);
    expect(shown("What happened to their water, per Ibn Kathir?", ["the river turned to blood", "blood in their jars"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    expect(shown("What did they do after each sign was lifted, in 7:135?", ["the river turned to blood"])).toEqual([[1], [0]]);
    // The town by the sea: the day before their Sabbath, no fish; then their Sabbath, and the fish on the water.
    expect(shown("When did the fish come, in 7:163?", ["fish showing on the sea", "the Sabbath, the day it is", "day 6 of the week, the day it is"])).toEqual([
      [0, 0, 1],
      [1, 1, 0]
    ]);
    // Dhul-Qarnayn: nothing yet; then the means. The sun high, no way yet; then the way west, and the sun gone down to it.
    expect(shown("What did Allah give him, in 18:84?", ["the means to all things"])).toEqual([[0], [1]]);
    const west = signArt("west-east")
      .parts.filter((each) => each.name.startsWith("the way to where the sun sets"))
      .map((each) => each.name);
    expect([moved("How far did he go, per Ibn Kathir?", "the sun going down in the west", "x"), shown("How far did he go, per Ibn Kathir?", west)]).toEqual([
      [0, -56],
      [west.map(() => 0), west.map(() => 1)]
    ]);
    expect(shown("What did the eastern people lack, in 18:90?", ["no shelter from the sun", "the heat of the day"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    // The four birds: none yet; then the four. Called: the hills lit, no bird; then the birds back where they stood.
    const birds = ["bird 1", "bird 2", "bird 3", "bird 4"];
    expect(shown("How many birds was he told to take?", birds)).toEqual([birds.map(() => 0), birds.map(() => 1)]);
    expect(shown("When he called them, what did the birds do?", [...birds, "light on hill 1", "light on hill 5"])).toEqual([
      [0, 0, 0, 0, 1, 1],
      [1, 1, 1, 1, 0, 0]
    ]);
    // The hundred years: the donkey, no tree; then the donkey's bones, and the tree grown. Then the bones raised.
    expect(shown("How long did the man stay dead, in 2:259?", ["the donkey", "the donkey's bones", "a tree grown in a hundred years"])).toEqual([
      [1, 0, 0],
      [0, 1, 1]
    ]);
    expect(shown("Ayahs 258-260: what are they about?", ["the donkey's bones", "the donkey"])).toEqual([
      [1, 0],
      [0, 1]
    ]);
    expect(shown("What did he say after seeing it?", ["Allah is able to do all things"])).toEqual([[0], [1]]);
    // Yusuf's shirt: no shirt and no camel yet; then the shirt. The good news; then the light come back in the home.
    expect(shown("What did Yusuf send to his father, in 12:93?", ["the shirt", "camel of the caravan, behind", "camel of the caravan, in front"])).toEqual([
      [0, 0, 0],
      [1, 0, 0]
    ]);
    expect(shown("What happened when the shirt touched his face, in 12:96?", ["good news at the home", "light come back in the home", "sight come back"])).toEqual([
      [1, 0, 0],
      [1, 1, 1]
    ]);
  });

  it("waits on the wonders of the stories before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const wonders = ["sign-guests", "sign-forgiveness", "sign-wind", "sign-pillars", "sign-cup", "sign-clay-bird", "sign-storm"];
    const asks = sceneAsks().filter((each) => wonders.includes(each.sceneId));
    expect(asks.length).toBe(59);
    for (const ask of asks) {
      const kind = SIGN_SCENES.find((each) => each.id === ask.sceneId)!.kind;
      for (const t of Object.values(sceneMoment(kind, ask.from, ask.to)!)) {
        for (const part of signArt(kind).parts) {
          for (const [key, values] of Object.entries(part.keys ?? {})) {
            if (key === "at") continue;
            const at = (time: number) => keyAt(part.keys!.at, values as number[], Math.min(1, Math.max(0, time)));
            expect([ask.prompt, t, part.name, key, at(t) === at(t - 0.004) || at(t) === at(t + 0.004)]).toEqual([ask.prompt, t, part.name, key, true]);
          }
        }
      }
    }
    // Ibrahim's guests: no greeting yet; then its rings. No fire and no meal yet; then the roasted calf, set near them
    // as he asks them to eat. No light yet; then the good news over the tent, and the second light after it.
    expect(shown("What did the guests say on entering, in 15:52?", ["the greeting, ring 1"])).toEqual([[0], [1]]);
    expect(shown("What did Ibrahim bring his guests, in 11:69?", ["the roasted calf on its platter", "the fire"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    expect(moved("What did Ibrahim say to his guests, in 51:27?", "the roasted calf on its platter", "x")).toEqual([0, 52]);
    const lights = ["good news: a light over the tent", "a second light, after it"];
    expect(shown("What good news did they bring?", lights)).toEqual([
      [0, 0],
      [1, 0]
    ]);
    expect(shown("Which son was promised, in 11:71?", lights)).toEqual([
      [0, 0],
      [1, 1]
    ]);
    expect(shown("Who would come after Ishaq?", lights)).toEqual([
      [1, 0],
      [1, 1]
    ]);
    // Asking forgiveness: the dry land; then the light of asking, the rain on a watered land, the flocks, the gardens and
    // the river.
    expect(shown("What did Nuh tell his people to ask Allah for?", ["light of asking, going up"])).toEqual([[0], [1]]);
    expect(shown("What did Hud promise if they repented, in 11:52?", ["the hot sun", "cracks in the dry land", "rain", "the land, watered"])).toEqual([
      [1, 1, 0, 0],
      [0, 0, 1, 1]
    ]);
    expect(shown("What did Nuh say asking forgiveness brings?", ["the land, watered", "a sheep of the flocks, 1", "a camel of the flocks, 5"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    expect(shown("What does 71:12 promise?", ["a sheep of the flocks, 1", "fields", "fruit on the trees", "the river"])).toEqual([
      [0, 0, 0, 0],
      [1, 1, 1, 1]
    ]);
    // The wind for Sulayman: the morning's month's journey not made yet; then made, the sun gone up to the top of the
    // sky. The wind coming back; then gentle, everywhere. Then thanks going up from his city.
    expect([shown("How far did the wind carry him in a morning?", ["a month's journey, going", "the wind going"]), moved("How far did the wind carry him in a morning?", "the sun", "x")]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      [0, 64]
    ]);
    expect(shown("Where did it go, per Ibn Kathir?", ["the wind coming back", "the wind, gentle"])).toEqual([
      [1, 0],
      [0, 1]
    ]);
    expect(shown("How should Dawud's family work, in 34:13?", ["thanks, going up from the city"])).toEqual([[0], [1]]);
    // Iram, Thamud and Pharaoh: each place in the dark, unlit; then each lit in its turn. Their corruption; the scourge,
    // their lights gone out; the night over the empty places.
    expect(
      shown(
        "Ayahs 1-14: what are they about?",
        ["Iram in the dark", "the valley in the dark", "the palace in the dark", "lamps of Iram", "lamps in the carved homes", "lamps of the palace"],
        "Ad, Thamud and Pharaoh"
      )
    ).toEqual([
      [1, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 1]
    ]);
    expect(shown("How is Fir'awn described in 89:10?", ["the palace in the dark", "lamps of the palace"])).toEqual([
      [1, 0],
      [0, 1]
    ]);
    expect(shown("What did they make much of, per 89:12?", ["dark haze of corruption", "a dark red sky"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    expect(shown("What did your Lord pour on them, per 89:13?", ["a darkened sky, over them", "lamps of Iram", "dust over the empty places"])).toEqual([
      [0, 1, 0],
      [1, 0, 1]
    ]);
    expect(shown("What does 89:14 say about your Lord?", ["night", "stars"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    // Yusuf's cup: put in the last bag. No reward yet; then the camel's load. No bag opened yet; then theirs, one by one,
    // and at last his brother's, the cup brought out of it.
    expect(moved("Ayah 70: where was the king's cup placed?", "the cup, put in the last bag", "x")).toEqual([0, 106]);
    expect(shown("What was the reward for finding it, in 12:72?", ["a camel's load, the reward"])).toEqual([[0], [1]]);
    const bags = ["bag 1, opened", "bag 2, opened", "bag 3, opened", "the last bag, searched", "the cup, brought out of the last bag"];
    expect(shown("Whose bags were searched first, in 12:76?", bags)).toEqual([
      [0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0]
    ]);
    expect(shown("Ayahs 69-79 say: Yusuf kept his brother near through a planned search.", bags)).toEqual([
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1]
    ]);
    // The bird of clay: still clay; then a bird, flying. The storm: the way not lit; then lit at the flashes.
    expect(shown("How did the clay bird come to life, in 5:110?", ["the shape of a bird, of clay", "the bird, flying"])).toEqual([
      [1, 0],
      [0, 1]
    ]);
    expect(shown("What do they do when lightning flashes?", ["the way, lit at a flash", "the way, lit at the next flash"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
  });

  it("waits on the scenes of zakat, giving and Eid before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const giving = ["sign-zakat", "sign-yemen", "sign-bayruha", "sign-fitr", "sign-eid"];
    const asks = sceneAsks().filter((each) => giving.includes(each.sceneId));
    expect(asks.length).toBe(39);
    for (const ask of asks) {
      const kind = SIGN_SCENES.find((each) => each.id === ask.sceneId)!.kind;
      for (const t of Object.values(sceneMoment(kind, ask.from, ask.to)!)) {
        for (const part of signArt(kind).parts) {
          for (const [key, values] of Object.entries(part.keys ?? {})) {
            if (key === "at") continue;
            const at = (time: number) => keyAt(part.keys!.at, values as number[], Math.min(1, Math.max(0, time)));
            expect([ask.prompt, t, part.name, key, at(t) === at(t - 0.004) || at(t) === at(t + 0.004)]).toEqual([ask.prompt, t, part.name, key, true]);
          }
        }
      }
    }
    // What zakat is due on. Fewer than five: no camel yet; then four come and stand, and the fifth has not come, so no
    // mark of it and nothing due.
    const camels = ["camel 1", "camel 2", "camel 3", "camel 4", "camel 5"];
    expect(camels.map((name) => moved("Is zakat due on fewer than five camels?", name, "x"))).toEqual([
      [140, 0],
      [120, 0],
      [100, 0],
      [80, 0],
      [60, 60]
    ]);
    expect(shown("Is zakat due on fewer than five camels?", ["mark 4 of the count", "mark 5 of the count", "five: zakat is due"])).toEqual([
      [0, 0, 0],
      [1, 0, 0]
    ]);
    // Silver: the sheep given, and no coin yet; then forty coins, and the fortieth gone to the home of the poor.
    expect(shown("Zakat on savings is ____ percent each year.", ["silver coins, row 1", "silver coins, row 5", "the fortieth coin, given", "one sheep, given"])).toEqual([
      [0, 0, 0, 1],
      [1, 1, 1, 0]
    ]);
    expect(moved("Zakat on savings is ____ percent each year.", "the fortieth coin, given", "x")).toEqual([0, -96]);
    // The crops: no field yet; then the rain on the first, ripe, and a tenth given, while the second has not grown.
    expect(shown("Crops watered by rain give...?", ["the two fields", "ripe crops of the first field", "a tenth, given", "green crops of the second field", "ripe crops of the second field"])).toEqual([
      [0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0]
    ]);
    expect(moved("Crops watered by rain give...?", "a tenth, given", "x")).toEqual([0, -16]);
    // Then the camel draws water for the second field, and only half of its last sack is given.
    expect(shown("Crops watered with camel work give...?", ["ripe crops of the second field", "half a tenth, given"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    expect([moved("Crops watered with camel work give...?", "half a tenth, given", "x"), moved("Crops watered with camel work give...?", "the last sack of the second field", "scaleY")]).toEqual([
      [0, -112],
      [1, 0.5]
    ]);
    expect(shown("Hard work to water lowers the zakat share.", ["a tenth, given", "half a tenth, given"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    // Mu'adh sent to Yemen: the way from the north, nothing taught yet; then the light of the shahadah, and no lamp of
    // prayer yet. Then the five lamps, lit through the day and the night.
    expect(shown("What was Mu'adh to teach first?", ["light of the testimony", "a spark of the testimony", "lamp of prayer 1"])).toEqual([
      [0, 0, 0],
      [1, 1, 0]
    ]);
    expect(shown("What came right after the shahadah?", ["lamp of prayer 1", "lamp of prayer 5", "night"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    // Zakat from their rich: nothing yet; then sacks and a sheep at the tall houses, still there. Then they go down to the
    // homes of the poor.
    const goods = ["a sack of grain from the tall houses", "a sheep from the tall houses"];
    expect([shown("Who is zakat taken from?", [...goods, "the way down to the poor"]), moved("Who is zakat taken from?", goods[0], "x")]).toEqual([
      [
        [0, 0, 0],
        [1, 1, 1]
      ],
      [0, 0]
    ]);
    expect([goods.map((name) => moved("In Yemen, zakat went to Yemen's own poor.", name, "x")), shown("In Yemen, zakat went to Yemen's own poor.", ["light over the homes of the poor"])]).toEqual([
      [
        [0, -62],
        [0, -92]
      ],
      [[0], [1]]
    ]);
    // Bayruha: no dates yet; then ripe. Facing the masjid, its light; then the ayah, and the garden loved. Then given:
    // the light of the gift, its sparks gone up. Then its dates go to the homes of his relatives.
    expect(shown("Bayruha was the garden Abu Talhah loved least.", ["ripe dates"])).toEqual([[0], [1]]);
    expect(shown("Which ayah made Abu Talhah give his garden?", ["light on the masjid", "the garden, loved"])).toEqual([
      [1, 0],
      [0, 1]
    ]);
    expect([shown("Abu Talhah obeyed 3:92 right away.", ["the garden, loved", "light over the garden, given"]), moved("Abu Talhah obeyed 3:92 right away.", "a spark of the gift, rising 5", "y")]).toEqual([
      [
        [0, 0],
        [0, 1]
      ],
      [0, -36]
    ]);
    const baskets = ["a basket of dates for a relative 1", "a basket of dates for a relative 3"];
    expect([shown("Whom did the Prophet ﷺ tell him to give it to?", [...baskets, "the way to a relative's home 1"]), moved("Whom did the Prophet ﷺ tell him to give it to?", baskets[1], "x")]).toEqual([
      [
        [0, 0, 0],
        [1, 1, 1]
      ],
      [0, 70]
    ]);
    // Zakat al-Fitr: no sa' yet; then one for each, all of one size, a spark over each. In the night, empty; then at dawn,
    // dates and barley. Then all of them given before the sun is up.
    expect(shown("Who is zakat al-Fitr given for?", ["a sa' for one in the home 1", "a sa' for one in the home 5", "one for each: a spark over the sa' 5"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    expect(shown("A baby's zakat al-Fitr is paid too.", ["one for each: a spark over the sa' 1", "one for each: a spark over the sa' 5"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    expect(shown("What is it paid in, in this hadith?", ["dates in the sa' 1", "barley in the sa' 5", "stars", "dawn"])).toEqual([
      [0, 0, 1, 0],
      [1, 1, 0, 1]
    ]);
    expect([moved("When should zakat al-Fitr be paid?", "a sa' for one in the home 1", "x"), shown("When should zakat al-Fitr be paid?", ["light over the homes of the poor", "the sun rising"])]).toEqual([
      [0, 88],
      [
        [0, 0],
        [1, 0]
      ]
    ]);
    // The morning of Eid: no plate yet; then the three dates taken, an odd number, and not yet the way out. No spear yet;
    // then the way out, and the spear planted. The prayer, then the rings of the khutbah. Then home by another way.
    expect(shown("What did he eat before the Eid al-Fitr prayer?", ["a plate by the door", "date 1 of three", "date 3 of three", "an odd number: three", "the way out, part 1"])).toEqual([
      [0, 0, 0, 0, 0],
      [1, 0, 0, 1, 0]
    ]);
    expect([shown("What was planted in front of him ﷺ on Eid?", ["the short spear, planted", "the way out, part 3"]), moved("What was planted in front of him ﷺ on Eid?", "the short spear, planted", "scaleY")]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      [0.1, 1]
    ]);
    expect(shown("What came first on Eid?", ["calm of the prayer", "the khutbah, ring 1"])).toEqual([
      [0, 0],
      [0, 1]
    ]);
    expect(shown("What did he do on the way back from Eid prayer?", ["the way home, another way, part 1", "the way home, another way, part 3", "light over the home"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
  });

  it("goes quickly up to the moment, and plays the moment at the story's pace, never too long", () => {
    expect(leadMs(11000, 0)).toBe(1);
    expect(leadMs(11000, 0.1)).toBe(800);
    expect(leadMs(11000, 0.36)).toBe(1980);
    expect(leadMs(11000, 0.74)).toBe(3500);
    expect(momentMs(11000, 0.74, 1)).toBe(2860);
    expect(momentMs(10500, 0, 0.71)).toBe(5000);
  });
});

describe("the scene", () => {
  const ark = SIGN_SCENES.find((scene) => scene.kind === "ark")!;
  const judi = sceneMoment("ark", "It came to rest on al-Judi")!;
  const words = signArt("ark").words;
  const opacity = (testID: string) => StyleSheet.flatten(screen.getByTestId(testID, ALL).props.style)?.opacity;

  it("stands at the moment before with a ? (reduce motion), and at the moment, its words showing, once answered", async () => {
    const view = await render(<SignSceneView scene={ark} width={292} height={178} still ask={{ ...judi, revealed: false }} testID="ark" />);
    expect(opacity("ark-ask")).toBe(1);
    words.forEach((_, index) => expect(opacity(`ark-words-${index}`)).toBe(0));
    await view.rerender(<SignSceneView scene={ark} width={292} height={178} still ask={{ ...judi, revealed: true }} testID="ark" />);
    expect(opacity("ark-ask")).toBe(0);
    expect(words.map((_, index) => opacity(`ark-words-${index}`))).toEqual([0, 0, 0, 0, 1]);
  });
});

describe("the question on its scene", () => {
  const shared = { mascotVariant: "girl", accent: "#58CC02", onCheck: jest.fn(), onContinue: jest.fn(), playSound: false };
  const background = (testID: string) => StyleSheet.flatten(screen.getByTestId(testID).props.style)?.backgroundColor;
  const lesson = LESSONS_BY_ID["lesson-deep-prophet-nuh-judi"];
  const judi = lesson.challenges.find((challenge) => challenge.prompt === "Where did the Ark come to rest?")!;
  const ask = sceneQuestionFor(judi)!;
  const wrong = judi.choices.find((choice) => choice.id !== judi.correctChoiceId)!.id;

  it("shows the scene waiting, and the answers; CHECK waits for one", async () => {
    const onSelect = jest.fn();
    await render(<SceneGame {...shared} prompt={judi.prompt} choices={judi.choices} ask={ask} correctChoiceId={judi.correctChoiceId} onSelect={onSelect} />);
    expect(screen.getByText("Watch, then answer")).toBeTruthy();
    expect(screen.getByTestId("scene-game-scene", ALL)).toBeTruthy();
    expect(screen.getByTestId("scene-game-ark-waiting", ALL)).toBeTruthy();
    expect(screen.getByTestId("scene-game-ark-waiting-ask", ALL)).toBeTruthy();
    expect(screen.getByTestId("exercise-check")).toBeDisabled();
    await press(`choice-${wrong}`);
    await press(`choice-${judi.correctChoiceId}`);
    expect(onSelect.mock.calls.map(([id]) => id)).toEqual([wrong, judi.correctChoiceId]);
  });

  it("plays the moment once answered: a right answer green; a wrong one red, with the right one green", async () => {
    const view = await render(
      <SceneGame {...shared} prompt={judi.prompt} choices={judi.choices} ask={ask} correctChoiceId={judi.correctChoiceId} selectedChoiceId={judi.correctChoiceId} result={{ correct: true, correctLabel: "On al-Judi", why: "" }} onSelect={jest.fn()} />
    );
    expect(background(`scene-tile-${judi.correctChoiceId}`)).toBe(colors.correctBg);
    expect(screen.getByTestId("scene-game-ark-moment", ALL)).toBeTruthy();
    await view.unmount();
    await render(
      <SceneGame {...shared} prompt={judi.prompt} choices={judi.choices} ask={ask} correctChoiceId={judi.correctChoiceId} selectedChoiceId={wrong} result={{ correct: false, correctLabel: "On al-Judi", why: "" }} onSelect={jest.fn()} />
    );
    expect(background(`scene-tile-${wrong}`)).toBe(colors.wrongBg);
    expect(background(`scene-tile-${judi.correctChoiceId}`)).toBe(colors.correctBg);
    expect(screen.getByTestId("scene-game-ark-moment", ALL)).toBeTruthy();
    expect(screen.getByTestId("feedback-sheet")).toBeTruthy();
    expect(screen.getByTestId(`choice-${wrong}`)).toBeDisabled();
  });

  it("gives the scene the teacher's room on a phone with little of it, and keeps it so: nothing moves again", async () => {
    // The room the game has (its scroll view), where the scene's row starts and how wide it is, the answers' height.
    const scroller = () => screen.getByTestId("scene-game").children[0] as TestInstance;
    const room = (height: number) => fireEvent(scroller(), "layout", { nativeEvent: { layout: { x: 0, y: 0, width: 360, height } } });
    const place = (y: number, width: number) => fireEvent(screen.getByTestId("scene-game-row", ALL), "layout", { nativeEvent: { layout: { x: 0, y, width, height: 130 } } });
    const tiles = (height: number) => fireEvent(screen.getByTestId("scene-game-tiles", ALL), "layout", { nativeEvent: { layout: { x: 0, y: 0, width: 328, height } } });
    const tileHeight = () => StyleSheet.flatten(screen.getByTestId(`scene-tile-${judi.correctChoiceId}`, ALL).props.style)?.minHeight;
    const sceneHeight = () => StyleSheet.flatten(screen.getByTestId("scene-game-scene", ALL).props.style)?.height;
    const props = { ...shared, prompt: judi.prompt, choices: judi.choices, ask, correctChoiceId: judi.correctChoiceId, onSelect: jest.fn() };

    // A tall phone: the teacher asks, the scene shows at its full size (358 wide).
    const roomy = await render(<SceneGame {...props} />);
    await act(async () => {
      room(760);
      place(150, 362);
      tiles(216);
    });
    expect(screen.getByTestId("question-mascot", ALL)).toBeTruthy();
    expect(tileHeight()).toBe(50);
    expect(sceneHeight()).toBe(218 + 4);
    // Its sheet up, with less room: nothing moves.
    await roomy.rerender(<SceneGame {...props} selectedChoiceId={judi.correctChoiceId} result={{ correct: true, correctLabel: "On al-Judi", why: "" }} />);
    await act(async () => room(420));
    expect(screen.getByTestId("question-mascot", ALL)).toBeTruthy();
    expect(tileHeight()).toBe(50);
    await roomy.unmount();

    // A short phone: the scene would be squeezed, so the teacher steps aside and the answers get smaller; it stays so.
    await render(<SceneGame {...props} />);
    await act(async () => {
      room(420);
      place(150, 328);
      tiles(216);
    });
    expect(screen.queryByTestId("question-mascot", ALL)).toBeNull();
    expect(tileHeight()).toBe(40);
    await act(async () => room(900));
    expect(screen.queryByTestId("question-mascot", ALL)).toBeNull();
    expect(tileHeight()).toBe(40);
  });

  it("speaks the learner's language", async () => {
    setActiveLanguage("ar");
    const shown = localizeLessonContent(lesson, "ar").challenges.find((challenge) => challenge.id === judi.id)!;
    await render(<SceneGame {...shared} prompt={shown.prompt} choices={shown.choices} ask={ask} correctChoiceId={shown.correctChoiceId} onSelect={jest.fn()} />);
    expect(screen.getByText("شاهد، ثم أجب")).toBeTruthy();
    expect(screen.getByTestId(`choice-${judi.correctChoiceId}`)).toHaveTextContent(/[؀-ۿ]/);
  });
});

describe("in a lesson", () => {
  it("asks where the ark came to rest on its scene, and goes on", async () => {
    variety(true);
    const section = COURSE.sections.find((each) => each.nodes.some((node) => node.lessonIds.includes("lesson-deep-prophet-nuh-judi")))!;
    const at = section.nodes.findIndex((node) => node.lessonIds.includes("lesson-deep-prophet-nuh-judi"));
    const before = section.nodes.slice(0, at);
    const user = makeUser({
      lastTopicId: section.topicId,
      hearts: { current: 5, max: 5, unlimited: true, lastRefillDate: localDateKey() },
      completedLessonIds: ["warm-up-1", "warm-up-2", "warm-up-3", ...before.flatMap((node) => node.lessonIds)],
      completedNodeIds: before.map((node) => node.id)
    });
    setStoredItem("sira-path-user-profile", JSON.stringify(user));
    const node = learningApi.getPathNodes(user).find((item) => item.id === section.nodes[at].id) as LearningNodeView;
    expect(node.status).not.toBe("locked");
    const session = await learningApi.getLessonSession(node.firstLessonId, user);
    await render(<TopicApp />);
    await screen.findByTestId(`learn-path-${section.topicId}`);
    await press(`path-node-${node.id}`);
    await press("node-card-start");

    let onScene = 0;
    for (let turn = 0; turn < 60 && !screen.queryByTestId("lesson-complete"); turn += 1) {
      await toQuestion();
      if (screen.queryByTestId("match-game")) {
        await finishMatch(session.lesson.challenges);
        continue;
      }
      const shown = questionOnScreen(session.lesson.challenges);
      if (!shown) break;
      if (screen.queryByTestId("scene-game")) {
        onScene += 1;
        expect(screen.getByTestId("scene-game-scene", ALL)).toBeTruthy();
      }
      await pickRight(shown);
      await press("exercise-check");
      await press("feedback-continue");
      // "Want it harder?" after a few right in a row: the lesson stays as it is.
      if (screen.queryByTestId("feedback-continue") && !screen.queryByTestId("lesson-complete")) await press("harder-no");
    }
    expect(onScene).toBeGreaterThanOrEqual(1);
    expect(await screen.findByTestId("lesson-complete")).toBeTruthy();
  });
});
