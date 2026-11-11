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
import type { Challenge, LearningNodeView } from "../types";
import { MapGame } from "../ui/lesson/MapGame";
import { distance } from "../ui/journey/mapGeometry";
import { closestPins, mapHeightFor, mapPlacesFor, mapPlanFor, mapSizes, pinPoints, placeLabels, placeOfAnswer, zoneBox } from "../ui/lesson/mapQuestions";
import { questionFormat } from "../ui/lesson/questionFormats";
import { colors } from "../ui/theme";
import { finishMatch, pickRight, questionOnScreen, toQuestion } from "./lessonDriver";
import { makeUser } from "./testUtils";

// Fahad: make the app more fun with more interactive questions and living pictures. A question whose answers are all
// places (Badr, Uhud, Khaybar; the caves of Hira and Thawr) is answered on a living map of the land.

const variety = (on: boolean) => ((globalThis as { __QUESTION_VARIETY__?: boolean }).__QUESTION_VARIETY__ = on);
const ALL = Object.values(LESSONS_BY_ID).flatMap((lesson) => lesson.challenges);
const question = (prompt: string, labels: string[], right = 0, type: Challenge["type"] = "multiple_choice"): Challenge => ({
  id: `q-${prompt}`,
  type,
  prompt,
  choices: labels.map((label, index) => ({ id: String.fromCharCode(97 + index), label })),
  correctChoiceId: String.fromCharCode(97 + right),
  explanation: "From the lesson."
});
const hamzah = question("In which battle was Hamzah martyred?", ["Badr", "Khaybar", "Tabuk", "Uhud"], 3);
const cave = question("In which cave did they hide?", ["Hira", "Uhud", "Arafat", "Thawr"], 3);

// A place's ring is for fingers only (its name is what a screen reader reads), so it is hidden from accessibility.
const HIDDEN = { includeHiddenElements: true };

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID, HIDDEN));
  });
}

afterEach(() => {
  variety(false);
  setActiveLanguage("en");
});

describe("which questions are asked on the map", () => {
  it("reads the places answers name, however they are written", () => {
    expect(["At Badr", "In Makkah", "The cave of Hira", "Mount Uhud", "Ta'if", "Taif", "Near Hudaybiyyah", "Arafat", "Mecca", "Al-Madinah", "At the Kabah"].map(placeOfAnswer)).toEqual([
      "badr",
      "makkah",
      "hira",
      "uhud",
      "taif",
      "taif",
      "hudaybiyah",
      "arafah",
      "makkah",
      "madinah",
      "makkah"
    ]);
    expect(placeOfAnswer("Yemen")).toBeUndefined();
    expect(placeOfAnswer("The Trench")).toBeUndefined();
  });

  it("puts each answer at its place, and leaves questions that are not about where to the tiles", () => {
    expect(mapPlacesFor(hamzah)).toEqual({ a: "badr", b: "khaybar", c: "tabuk", d: "uhud" });
    // About a name, not a place.
    expect(mapPlacesFor(question("What is another Quran name for Makkah?", ["Yathrib", "Taif", "Badr", "Bakkah"]))).toBeUndefined();
    expect(mapPlacesFor(question("What was Yathrib later known as?", ["Makkah", "Ta'if", "Jerusalem", "Al-Madinah"]))).toBeUndefined();
    // An answer that is not a place on the map, two answers at one place, too few answers, true or false.
    expect(mapPlacesFor(question("Where did they go?", ["Badr", "Yemen", "Uhud"]))).toBeUndefined();
    expect(mapPlacesFor(question("Where was it?", ["Makkah", "Mecca", "Badr"]))).toBeUndefined();
    expect(mapPlacesFor(question("Where was it?", ["Makkah", "Badr"]))).toBeUndefined();
    expect(mapPlacesFor(question("Badr came before Uhud.", ["True", "False", "Badr"], 0, "true_false"))).toBeUndefined();
  });

  it("draws places too close to tell apart again on a close-up, and leaves two crowds to the tiles", () => {
    expect(mapPlanFor(["badr", "khaybar", "tabuk", "uhud"])).toEqual({ all: ["badr", "khaybar", "tabuk", "uhud"], main: ["badr", "khaybar", "tabuk", "uhud"] });
    expect(mapPlanFor(["hira", "uhud", "arafah", "thawr"])).toEqual({ all: ["hira", "uhud", "arafah", "thawr"], main: ["uhud"], close: ["hira", "arafah", "thawr"] });
    expect(mapPlanFor(["makkah", "madinah", "taif", "aqsa"])?.close?.sort()).toEqual(["makkah", "taif"]);
    // Makkah with Hira, and Madinah with Uhud: two close-ups would be needed.
    expect(mapPlanFor(["makkah", "madinah", "uhud", "hira"])).toBeUndefined();
  });

  it("asks dozens of the course's questions on the map, every place far enough apart on a small phone", () => {
    const onMap = ALL.filter((challenge) => mapPlacesFor(challenge));
    expect(new Set(onMap.map((challenge) => challenge.prompt)).size).toBeGreaterThanOrEqual(40);
    for (const challenge of onMap) {
      const plan = mapPlanFor(Object.values(mapPlacesFor(challenge)!))!;
      expect(plan).toBeTruthy();
      const width = 288;
      if (!plan.close) expect(closestPins(plan.all, width, mapHeightFor(plan.all, width, 280))).toBeGreaterThanOrEqual(34);
      else expect(closestPins(plan.close, width, mapHeightFor(plan.close, width, 150, 150))).toBeGreaterThanOrEqual(34);
    }
  });

  it("never draws two places on each other, however little room the phone leaves (the page scrolls instead)", () => {
    const plans = new Map(ALL.flatMap((challenge) => {
      const places = mapPlacesFor(challenge);
      return places ? [[Object.values(places).sort().join(","), mapPlanFor(Object.values(places))!] as const] : [];
    }));
    expect([...plans.values()].some((plan) => plan.close)).toBe(true);
    const apart = (points: { x: number; y: number }[]) => Math.min(Infinity, ...points.flatMap((point, index) => points.slice(index + 1).map((other) => distance(point, other))));
    for (const plan of plans.values()) {
      for (const width of [288, 328, 358]) {
        for (const free of [100, 180, 240, 300, 336, 420, 640]) {
          const sizes = mapSizes(plan, width, free);
          if (!plan.close) {
            expect(closestPins(plan.all, width, sizes.main)).toBeGreaterThanOrEqual(34);
            continue;
          }
          const points = pinPoints(plan.all, plan.all, width, sizes.main);
          const main = plan.main.map((id) => points[plan.all.indexOf(id)]);
          const box = zoneBox(plan.close.map((id) => points[plan.all.indexOf(id)]));
          expect(apart(main)).toBeGreaterThanOrEqual(34);
          for (const point of main) {
            const clear = Math.hypot(Math.max(box.x - point.x, 0, point.x - (box.x + box.w)), Math.max(box.y - point.y, 0, point.y - (box.y + box.h)));
            expect(clear).toBeGreaterThanOrEqual(23);
          }
          expect(closestPins(plan.close, width, sizes.close)).toBeGreaterThanOrEqual(34);
          // With room to spare, both parts fit in it.
          if (free >= 420) expect(sizes.main + 16 + sizes.close).toBeLessThanOrEqual(free);
        }
      }
    }
  });

  it("is a way of asking of its own, and a place with its own photo is a picture card half the time", () => {
    variety(true);
    expect(questionFormat(hamzah, { map: true })).toBe("map");
    expect(questionFormat({ ...hamzah, listen: { ar: "أحد", translit: "Uhud" } }, { map: true })).toBe("choose");
    variety(false);
    expect(questionFormat(hamzah, { map: true })).toBe("choose");
    variety(true);
    const pictured = ALL.filter((challenge) => challenge.type === "multiple_choice" && mapPlacesFor(challenge) && choicePictures(challenge.choices));
    const formats = new Set(pictured.flatMap((challenge) => [false, true].map((recall) => questionFormat(challenge, { map: true, pictures: true, recall }))));
    expect([...formats].sort()).toEqual(["choose", "map"]);
  });
});

describe("where the names go", () => {
  it("keeps every name inside the map and off the others, even where places crowd", () => {
    const pins = [
      { x: 150, y: 60, w: 120, h: 34 },
      { x: 170, y: 90, w: 100, h: 34 },
      { x: 140, y: 120, w: 90, h: 34 },
      { x: 30, y: 200, w: 110, h: 34 }
    ];
    const labels = placeLabels(pins, 300, 240);
    labels.forEach((label, index) => {
      expect(label.x).toBeGreaterThanOrEqual(4);
      expect(label.y).toBeGreaterThanOrEqual(4);
      expect(label.x + label.w).toBeLessThanOrEqual(296);
      expect(label.y + label.h).toBeLessThanOrEqual(236);
      labels.slice(index + 1).forEach((other) => {
        const across = Math.min(label.x + label.w, other.x + other.w) - Math.max(label.x, other.x);
        const down = Math.min(label.y + label.h, other.y + other.h) - Math.max(label.y, other.y);
        expect(across <= 0 || down <= 0).toBe(true);
      });
    });
  });
});

describe("the map question", () => {
  const shared = { mascotVariant: "girl", accent: "#58CC02", onCheck: jest.fn(), onContinue: jest.fn(), playSound: false };
  const background = (testID: string) => StyleSheet.flatten(screen.getByTestId(testID).props.style)?.backgroundColor;

  it("picks an answer by its name or the ring round its place, and CHECK waits for one", async () => {
    const onSelect = jest.fn();
    const view = await render(<MapGame {...shared} prompt={hamzah.prompt} choices={hamzah.choices} places={mapPlacesFor(hamzah)!} correctChoiceId="d" onSelect={onSelect} />);
    expect(screen.getByText("Tap it on the map")).toBeTruthy();
    expect(screen.getByTestId("map-game-map")).toBeTruthy();
    expect(screen.queryByTestId("map-game-closeup")).toBeNull();
    for (const choice of hamzah.choices) {
      expect(screen.getByTestId(`choice-${choice.id}`)).toBeTruthy();
      expect(screen.getByTestId(`map-pin-${choice.id}`, HIDDEN)).toBeTruthy();
    }
    expect(screen.getByTestId("exercise-check")).toBeDisabled();
    await press("choice-b");
    await press("map-pin-d");
    expect(onSelect.mock.calls.map(([id]) => id)).toEqual(["b", "d"]);
    await view.rerender(<MapGame {...shared} prompt={hamzah.prompt} choices={hamzah.choices} places={mapPlacesFor(hamzah)!} correctChoiceId="d" selectedChoiceId="d" onSelect={onSelect} />);
    expect(screen.getByTestId("exercise-check")).not.toBeDisabled();
  });

  it("turns a right answer green, and a wrong one red with the right one green", async () => {
    const places = mapPlacesFor(hamzah)!;
    const right = { correct: true, correctLabel: "Uhud", why: "" };
    const view = await render(<MapGame {...shared} prompt={hamzah.prompt} choices={hamzah.choices} places={places} correctChoiceId="d" selectedChoiceId="d" result={right} onSelect={jest.fn()} />);
    expect(background("choice-d")).toBe(colors.correctBg);
    expect(background("choice-a")).toBe(colors.white);
    await view.unmount();
    await render(
      <MapGame {...shared} prompt={hamzah.prompt} choices={hamzah.choices} places={places} correctChoiceId="d" selectedChoiceId="a" result={{ correct: false, correctLabel: "Uhud", why: "" }} onSelect={jest.fn()} />
    );
    expect(background("choice-a")).toBe(colors.wrongBg);
    expect(background("choice-d")).toBe(colors.correctBg);
    expect(screen.getByTestId("feedback-sheet")).toBeTruthy();
  });

  it("shows the caves round Makkah on a close-up under the map, with its title", async () => {
    await render(<MapGame {...shared} prompt={cave.prompt} choices={cave.choices} places={mapPlacesFor(cave)!} correctChoiceId="d" onSelect={jest.fn()} />);
    const closeUp = screen.getByTestId("map-game-closeup");
    expect(screen.getByTestId("map-game-closeup-title")).toHaveTextContent("Near Makkah");
    expect(screen.getByTestId("map-game-cone")).toBeTruthy();
    // Uhud on the main map; Hira, Arafah and Thawr on the close-up.
    const inCloseUp = (id: string) => screen.queryAllByTestId(`choice-${id}`).some((node) => {
      for (let at = node.parent; at; at = at.parent) if (at === closeUp) return true;
      return false;
    });
    expect(["a", "b", "c", "d"].map(inCloseUp)).toEqual([true, false, true, true]);
  });

  it("speaks the learner's language", async () => {
    setActiveLanguage("ur");
    const lesson = localizeLessonContent(LESSONS_BY_ID["lesson-deep-hamzah-martyr"], "ur");
    const english = LESSONS_BY_ID["lesson-deep-hamzah-martyr"].challenges.find((challenge) => mapPlacesFor(challenge))!;
    const shown = lesson.challenges.find((challenge) => challenge.id === english.id)!;
    await render(<MapGame {...shared} prompt={shown.prompt} choices={shown.choices} places={mapPlacesFor(english)!} correctChoiceId={shown.correctChoiceId} onSelect={jest.fn()} />);
    expect(screen.getByText("نقشے پر ٹیپ کریں")).toBeTruthy();
    expect(screen.getByTestId(`choice-${english.correctChoiceId}`)).toHaveTextContent(/[؀-ۿ]/);
  });
});

describe("in a lesson", () => {
  it("asks the masjids question on the map, with Quba and the Prophet's Masjid on a close-up, and goes on", async () => {
    variety(true);
    const hajj = COURSE.sections.find((section) => section.topicId === "hajj")!;
    const at = hajj.nodes.findIndex((node) => node.id === "deep-hajj-masjids-three");
    const before = hajj.nodes.slice(0, at);
    const user = makeUser({
      lastTopicId: "hajj",
      hearts: { current: 5, max: 5, unlimited: true, lastRefillDate: localDateKey() },
      completedLessonIds: ["warm-up-1", "warm-up-2", "warm-up-3", ...before.flatMap((node) => node.lessonIds)],
      completedNodeIds: before.map((node) => node.id)
    });
    setStoredItem("sira-path-user-profile", JSON.stringify(user));
    const node = learningApi.getPathNodes(user).find((item) => item.id === "deep-hajj-masjids-three") as LearningNodeView;
    expect(node.status).not.toBe("locked");
    const session = await learningApi.getLessonSession(node.firstLessonId, user);
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-hajj");
    await press(`path-node-${node.id}`);
    await press("node-card-start");

    let onMap = 0;
    for (let turn = 0; turn < 60 && !screen.queryByTestId("lesson-complete"); turn += 1) {
      await toQuestion();
      if (screen.queryByTestId("match-game")) {
        await finishMatch(session.lesson.challenges);
        continue;
      }
      const shown = questionOnScreen(session.lesson.challenges);
      if (!shown) break;
      if (screen.queryByTestId("map-game")) {
        onMap += 1;
        expect(screen.getByTestId("map-game-closeup")).toBeTruthy();
        await press(`map-pin-${shown.correctChoiceId}`);
      } else {
        await pickRight(shown);
      }
      await press("exercise-check");
      await press("feedback-continue");
      // "Want it harder?" after a few right in a row: the lesson stays as it is.
      if (screen.queryByTestId("feedback-continue") && !screen.queryByTestId("lesson-complete")) await press("harder-no");
    }
    expect(onMap).toBeGreaterThanOrEqual(1);
    expect(await screen.findByTestId("lesson-complete")).toBeTruthy();
  });
});
