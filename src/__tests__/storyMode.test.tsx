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
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import TopicApp from "../TopicApp";
import { PRACTICE_XP_PER_CORRECT_ANSWER } from "../api/islamicLearningApi";
import { DEEP_UNITS } from "../data/deepUnits";
import { SAHABA_UNITS } from "../data/sahabaUnits";
import { SEERAH_UNITS } from "../data/seerahUnits";
import { MAX_SCENES, partSizes, sceneAnswers, STORIES } from "../data/stories";
import { getStoredItem, removeStoredItem, setStoredItem } from "../services/appStorage";
import { recordStoryRead, STORY_FIRST_READ_XP, storyXp } from "../services/stories";
import { storySteps } from "../ui/screens";
import type { UserProfile } from "../types";
import { makeUser } from "./testUtils";

const PROFILE_KEY = "sira-path-user-profile";
const savedUser = () => JSON.parse(getStoredItem(PROFILE_KEY) ?? "{}") as UserProfile;

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

describe("Story mode (stories)", () => {
  it("tells every Seerah unit and every Companion with deep lessons, in order", () => {
    const seerah = [...new Set(STORIES.filter((story) => story.group === "seerah").map((story) => story.unitId))];
    expect(seerah).toEqual(SEERAH_UNITS.map((unit) => unit.branchId));
    const sahaba = new Set(STORIES.filter((story) => story.group === "sahaba").map((story) => story.unitId));
    for (const unit of SAHABA_UNITS) expect(sahaba.has(unit.branchId)).toBe(true);
    for (const key of ["abubakr", "umar", "uthman", "ali", "muhajirun"]) {
      expect(sahaba.has(DEEP_UNITS.find((unit) => unit.key === key)!.branchId)).toBe(true);
    }
  });

  it("keeps every lesson of a unit, once, split into short parts", () => {
    expect(new Set(STORIES.map((story) => story.id)).size).toBe(STORIES.length);
    for (const unit of [...SEERAH_UNITS]) {
      const told = STORIES.filter((story) => story.unitId === unit.branchId).flatMap((story) => story.scenes.map((scene) => scene.lesson.id));
      expect(told).toEqual(unit.lessons.map((lesson) => `lesson-deep-${unit.key}-${lesson.slug}`));
    }
    for (const story of STORIES) expect(story.scenes.length).toBeLessThanOrEqual(MAX_SCENES);
    expect(partSizes(35)).toEqual([7, 7, 7, 7, 7]);
    expect(partSizes(8)).toEqual([4, 4]);
  });

  it("gives every scene its source, and asks only what the scene just said", () => {
    for (const story of STORIES) {
      for (const scene of story.scenes) {
        expect(scene.source?.url).toMatch(/^https:\/\//);
        expect(scene.source.reference ?? scene.source.title).toBeTruthy();
        if (scene.question) expect(sceneAnswers(scene.lesson, scene.source, scene.question)).toBe(true);
      }
      // A story ends on a question, and asks about every second scene.
      expect(story.scenes[story.scenes.length - 1].question).toBeTruthy();
      expect(story.scenes.filter((scene) => scene.question).length).toBeGreaterThanOrEqual(Math.floor(story.scenes.length / 2));
    }
  });

  it("shows only pictures of places and things, each once a story", () => {
    for (const story of STORIES) {
      const ids = story.scenes.flatMap((scene) => (scene.picture ? [scene.picture.id] : []));
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("pays practice XP for first-try answers and a bonus on the first read only", () => {
    expect(storyXp(3, true)).toBe(3 * PRACTICE_XP_PER_CORRECT_ANSWER + STORY_FIRST_READ_XP);
    const first = recordStoryRead(makeUser({ totalXp: 10 }), "story-bilal-1", 2);
    expect(first.firstRead).toBe(true);
    expect(first.user.totalXp).toBe(10 + first.xp);
    expect(first.user.stories?.["story-bilal-1"]?.reads).toBe(1);
    const again = recordStoryRead(first.user, "story-bilal-1", 2);
    expect(again.firstRead).toBe(false);
    expect(again.xp).toBe(2 * PRACTICE_XP_PER_CORRECT_ANSWER);
    expect(again.user.stories?.["story-bilal-1"]?.reads).toBe(2);
  });
});

describe("Story mode (screens)", () => {
  afterEach(() => removeStoredItem(PROFILE_KEY));

  it("opens from the Sahabah path, reads a story with its questions, and saves it", async () => {
    setStoredItem(PROFILE_KEY, JSON.stringify(makeUser({ totalXp: 50, lastTopicId: "sahabah" })));
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-sahabah");
    await press("story-banner-sahaba");
    expect(screen.getByTestId("story-list-sahaba")).toBeTruthy();

    const story = STORIES.find((item) => item.group === "sahaba")!;
    await press("story-start");
    expect(screen.getByTestId(`story-player-${story.id}`)).toBeTruthy();
    expect(screen.getAllByTestId("story-teacher").length).toBe(1);

    let wrongOnce = false;
    for (const step of storySteps(story)) {
      if (step.kind === "question") {
        const { question } = step;
        // The Continue button waits for the right answer.
        expect(screen.getByTestId("story-continue").props.accessibilityState?.disabled).toBe(true);
        if (!wrongOnce) {
          wrongOnce = true;
          const wrong = question.choices.find((choice) => choice.id !== question.correctChoiceId)!;
          await press(`story-choice-${question.id}-${wrong.id}`);
          expect(screen.getByTestId(`story-try-again-${question.id}`)).toBeTruthy();
        }
        await press(`story-choice-${question.id}-${question.correctChoiceId}`);
        expect(screen.getByTestId(`story-why-${question.id}`)).toBeTruthy();
      } else {
        expect(screen.getByTestId(`story-scene-${step.scene.lesson.id}`)).toBeTruthy();
      }
      await press("story-continue");
    }

    expect(screen.getByTestId("story-complete")).toBeTruthy();
    const asked = story.scenes.filter((scene) => scene.question).length;
    const xp = (asked - 1) * PRACTICE_XP_PER_CORRECT_ANSWER + STORY_FIRST_READ_XP;
    const saved = savedUser();
    expect(saved.stories?.[story.id]?.reads).toBe(1);
    expect(saved.totalXp).toBe(50 + xp);

    await press("story-done");
    expect(screen.getByTestId(`story-read-${story.id}`)).toBeTruthy();
  });

  it("opens from Practice on the Seerah shelf", async () => {
    setStoredItem(PROFILE_KEY, JSON.stringify(makeUser({ lastTopicId: "foundation" })));
    await render(<TopicApp />);
    await press("tab-practice");
    await press("practice-stories");
    expect(screen.getByTestId("story-list-seerah")).toBeTruthy();
    await press("story-shelf-sahaba");
    expect(screen.getByTestId("story-list-sahaba")).toBeTruthy();
    await press("story-sheet-close");
  });
});
