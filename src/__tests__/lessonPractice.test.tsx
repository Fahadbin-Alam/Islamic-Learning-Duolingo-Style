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
import {
  canPracticeLessons,
  createLessonPracticeSession,
  loseHeart,
  localDateKey,
  PRACTICE_XP_PER_CORRECT_ANSWER
} from "../api/islamicLearningApi";
import { COURSE } from "../data/course";
import { getStoredItem, removeStoredItem, setStoredItem } from "../services/appStorage";
import { clearActiveAssessment } from "../services/localProgress";
import type { Challenge, UserProfile } from "../types";
import { makeUser } from "./testUtils";

const PROFILE_KEY = "sira-path-user-profile";
const hearts = (current: number) => ({ current, max: 5, unlimited: false, lastRefillDate: localDateKey() });
const savedUser = () => JSON.parse(getStoredItem(PROFILE_KEY) ?? "{}") as UserProfile;
// Lessons from two topics, finished earlier.
const sectionLessons = (topicId: string, count: number) =>
  COURSE.sections.find((section) => section.topicId === topicId)!.nodes.flatMap((node) => node.lessonIds).slice(0, count);
const finished = [...sectionLessons("foundation", 3), ...sectionLessons("quran_tafseer", 2)];

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

describe("My lessons practice (session)", () => {
  it("asks about lessons the learner finished, across topics, and needs a few of them", () => {
    expect(canPracticeLessons({ completedLessonIds: [] })).toBe(false);
    const user = makeUser({ completedLessonIds: finished });
    expect(canPracticeLessons(user)).toBe(true);
    const session = createLessonPracticeSession(user)!;
    expect(session.mode).toBe("lesson_practice");
    expect(session.lesson.challenges.length).toBeGreaterThanOrEqual(3);
    const sources = new Set(session.lesson.challenges.map((challenge) => challenge.sourceLessonId));
    sources.forEach((lessonId) => expect(finished).toContain(lessonId));
    expect(sources.size).toBeGreaterThan(1);
  });

  it("costs no hearts", () => {
    const user = makeUser({ completedLessonIds: finished, hearts: hearts(2) });
    expect(loseHeart(user, createLessonPracticeSession(user)).hearts.current).toBe(2);
  });

  it("starts from other questions on the next run", () => {
    const user = makeUser({ completedLessonIds: finished });
    const first = createLessonPracticeSession(user, 0)!.lesson.challenges.map((challenge) => challenge.prompt);
    const second = createLessonPracticeSession(user, 1)!.lesson.challenges.map((challenge) => challenge.prompt);
    expect(second).not.toEqual(first);
  });
});

describe("My lessons practice (Practice tab)", () => {
  afterEach(() => {
    removeStoredItem(PROFILE_KEY);
    clearActiveAssessment();
  });

  it("shows only once there are lessons to practice", async () => {
    setStoredItem(PROFILE_KEY, JSON.stringify(makeUser({ completedLessonIds: [] })));
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    await press("tab-practice");
    expect(screen.queryByTestId("practice-lessons")).toBeNull();
  });

  it("plays with no hearts left, keeps hearts on a miss, and pays 2 XP per first-try answer", async () => {
    const user = makeUser({ completedLessonIds: finished, hearts: hearts(0), reviewHeartRestoreUsed: true, totalXp: 100 });
    setStoredItem(PROFILE_KEY, JSON.stringify(user));
    const session = createLessonPracticeSession(user, 0)!;
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    await press("tab-practice");
    await press("practice-lessons");
    expect(screen.getByTestId("exercise-view")).toBeTruthy();

    const challenges = session.lesson.challenges;
    const pick = (challenge: Challenge, right: boolean) =>
      right ? challenge.correctChoiceId : challenge.choices.find((choice) => choice.id !== challenge.correctChoiceId)!.id;
    const shown = () =>
      challenges.find((challenge) =>
        challenge.choices.every((choice) => screen.queryByTestId(`choice-${choice.id}`)) &&
        screen.queryAllByText(challenge.prompt.slice(0, 40).split(/[^A-Za-z0-9 ,.?!]/)[0].trim(), { exact: false }).length > 0
      )!;
    // The first question wrong, every other one right; the missed one comes back and is answered right.
    let missed = false;
    for (let step = 0; step < challenges.length + 1; step += 1) {
      const challenge = shown();
      const right = missed || step > 0;
      await press(`choice-${pick(challenge, right)}`);
      await press("exercise-check");
      if (!right) {
        missed = true;
        expect(screen.queryByTestId("refill-sheet")?.props.visible ?? false).toBeFalsy();
      }
      await press("feedback-continue");
      if (screen.queryByTestId("lesson-complete")) break;
      if (!screen.queryByTestId("exercise-view")) throw new Error("left the lesson at step " + step);
    }

    expect(await screen.findByTestId("lesson-complete")).toBeTruthy();
    expect(savedUser().hearts.current).toBe(0);
    expect(savedUser().totalXp).toBe(100 + (challenges.length - 1) * PRACTICE_XP_PER_CORRECT_ANSWER);
    expect(savedUser().completedLessonIds).toEqual(finished);
  });
});
