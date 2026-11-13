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
    expect(asks.length).toBe(326);
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
    expect(places).toBe(449);
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
  const value = (kind: SignKind, name: string, key: "opacity" | "rotate", t: number) => {
    const keys = signArt(kind).parts.find((each) => each.name === name)!.keys;
    const values = keys?.[key];
    return keys && values ? keyAt(keys.at, values, t) : key === "opacity" ? 1 : 0;
  };
  // The scene a story question is asked on, where it waits, and where it stops once answered.
  const asked = (prompt: string) => {
    const ask = sceneAsks().find((each) => each.prompt === prompt)!;
    const kind = SIGN_SCENES.find((each) => each.id === ask.sceneId)!.kind;
    return { kind, ...sceneMoment(kind, ask.from, ask.to)! };
  };
  // How much of each part shows while the question waits, and once it is answered.
  const shown = (prompt: string, names: string[]) => {
    const { kind, pause, reveal } = asked(prompt);
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
