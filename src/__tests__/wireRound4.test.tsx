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
  createTestOutSession,
  getJumpNodeIds,
  getTestOutPlan,
  learningApi,
  PRACTICE_XP_PER_CORRECT_ANSWER,
  testOutPassingScore
} from "../api/islamicLearningApi";
import { COURSE } from "../data/course";
import { getNodeArabic, isFirstUseOfWord } from "../data/arabicTerms";
import { getStoredItem, removeStoredItem, setStoredItem } from "../services/appStorage";
import { clearActiveAssessment, clearPracticeResult } from "../services/localProgress";
import { testOutGoalLine } from "../ui/screens";
import type { Challenge, LearningNode, UserProfile } from "../types";
import { makeUser } from "./testUtils";

const PROFILE_KEY = "sira-path-user-profile";
const TODAY_HEARTS = (unlimited: boolean) => ({ current: 5, max: 5, unlimited, lastRefillDate: localToday() });

function localToday() {
  const now = new Date();
  return `${now.getFullYear()}-${`${now.getMonth() + 1}`.padStart(2, "0")}-${`${now.getDate()}`.padStart(2, "0")}`;
}

function seedUser(user: UserProfile) {
  setStoredItem(PROFILE_KEY, JSON.stringify(user));
}

function savedUser(): UserProfile {
  return JSON.parse(getStoredItem(PROFILE_KEY) ?? "{}") as UserProfile;
}

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

async function answer(challenge: Challenge, right: boolean) {
  const pick = right ? challenge.correctChoiceId : challenge.choices.find((choice) => choice.id !== challenge.correctChoiceId)!.id;
  await press(`choice-${pick}`);
  await press("exercise-check");
  await press("feedback-continue");
}

// Titles keep their hyphens unbroken on screen (a word joiner after each one).
const titleText = (title: string) => new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/-/g, "-\u2060?"));

const QURAN = COURSE.sections.find((section) => section.topicId === "quran_tafseer")!;
const FOUNDATION = COURSE.sections.find((section) => section.topicId === "foundation")!;
const quranUnits = QURAN.branches.map((branch) => QURAN.nodes.filter((node) => node.branchId === branch.id)).filter((nodes) => nodes.length > 0);
// A short surah unit after the first (the Quran goes in mushaf order, so unit 2 is the long Al-Baqarah): its key
// tests all of the rest of it in one go.
const SHORT = quranUnits.findIndex((nodes, index) => index > 0 && nodes.length <= 12);

function testOut(user: UserProfile, branchId: string, jumpNodeId?: string) {
  const plan = getTestOutPlan(user, branchId, jumpNodeId)!;
  const session = createTestOutSession({ branchTitle: branchId, branchId, lessons: plan.lessons, nodeIds: plan.nodeIds, heartsAtStart: 5, attempt: 0, jumpNodeId });
  return { plan, challenges: session.lesson.challenges };
}

const nodeLabel = (node: LearningNode) => screen.getByTestId(`path-node-${node.id}`).props.accessibilityLabel as string;

// Two whole test-outs played through the app: slower than one screen.
// The whole path renders here with its moving pictures; on a busy CI machine that can pass 30 s.
jest.setTimeout(90000);

afterEach(() => {
  removeStoredItem(PROFILE_KEY);
  clearActiveAssessment();
  clearPracticeResult();
});

describe("after a test-out in a later unit", () => {
  it("NEXT LESSON and START go to the circle the test opened, for JUMP HERE and then the unit's key", async () => {
    const user = makeUser({ hearts: TODAY_HEARTS(false), lastTopicId: "quran_tafseer" });
    seedUser(user);
    // A later Quran unit: JUMP HERE on its fourth circle, while unit 1 is still open.
    const unit = quranUnits[SHORT];
    const target = unit[3];
    expect(getJumpNodeIds(user, "quran_tafseer").has(target.id)).toBe(true);
    const jump = testOut(user, target.branchId, target.id);
    expect(jump.plan.nodeIds).toEqual(unit.slice(0, 3).map((node) => node.id));

    await render(<TopicApp />);
    await screen.findByTestId("learn-path-quran_tafseer");
    await press(`path-node-${target.id}`);
    await press("node-card-jump");
    // The sheet says the pass mark and the miss that ends it before the test starts.
    const goal = { total: jump.challenges.length, passingScore: testOutPassingScore(jump.challenges.length) };
    expect(screen.getByTestId("test-out-sheet-goal")).toHaveTextContent(testOutGoalLine(goal));
    await press("test-out-start");
    for (const challenge of jump.challenges) {
      await answer(challenge, true);
    }

    expect(await screen.findByText("You jumped ahead!")).toBeTruthy();
    // Practice pay, 2 XP per right answer, not the XP of every circle skipped.
    const afterJump = savedUser();
    const lessonsXp = jump.plan.lessons.reduce((total, lesson) => total + lesson.xpReward, 0);
    expect(afterJump.totalXp - user.totalXp).toBe(Math.min(lessonsXp, jump.challenges.length * PRACTICE_XP_PER_CORRECT_ANSWER));
    expect(screen.getByText(titleText(`Unlocked: ${target.title}`))).toBeTruthy();

    // BACK TO PATH: START sits on the circle the jump opened, not on unit 1's first circle.
    await press("complete-back");
    await screen.findByTestId("learn-path-quran_tafseer");
    expect(nodeLabel(target)).toMatch(/, start$/);
    expect(nodeLabel(quranUnits[0][0])).not.toMatch(/, start$/);

    // The unit's key now tests the rest of unit 2; passing it carries on in the next unit, not in unit 1.
    const key = testOut(afterJump, unit[0].branchId);
    expect(key.plan.nodeIds).toEqual(unit.slice(3).map((node) => node.id));
    await press(`unit-test-out-${unit[0].branchId}`);
    expect(screen.getByTestId("test-out-sheet-goal")).toHaveTextContent(
      testOutGoalLine({ total: key.challenges.length, passingScore: testOutPassingScore(key.challenges.length) })
    );
    await press("test-out-start");
    for (const challenge of key.challenges) {
      await answer(challenge, true);
    }
    expect(await screen.findByText("You jumped ahead!")).toBeTruthy();
    expect(savedUser().totalXp - afterJump.totalXp).toBeLessThanOrEqual(key.challenges.length * PRACTICE_XP_PER_CORRECT_ANSWER);
    const next = learningApi.getPathNodes(savedUser()).find((node) => node.id === quranUnits[SHORT + 1][0].id)!;
    expect(next.status).toBe("available");
    await press("complete-continue");
    expect(await screen.findByTestId("learn-card")).toHaveTextContent(titleText(next.title));
  });

  it("NEXT LESSON after JUMP HERE opens the circle the child tapped", async () => {
    const user = makeUser({ hearts: TODAY_HEARTS(false), lastTopicId: "quran_tafseer" });
    seedUser(user);
    const target = quranUnits[SHORT][3];
    const jump = testOut(user, target.branchId, target.id);

    await render(<TopicApp />);
    await screen.findByTestId("learn-path-quran_tafseer");
    await press(`path-node-${target.id}`);
    await press("node-card-jump");
    await press("test-out-start");
    for (const challenge of jump.challenges) {
      await answer(challenge, true);
    }
    expect(screen.getByTestId("complete-continue")).toHaveTextContent(/next lesson/i);
    await press("complete-continue");
    expect(await screen.findByTestId("learn-card")).toHaveTextContent(titleText(target.title));
  });
});

describe("a replay of a finished circle", () => {
  it("shows no NEW pill on the learn card and pays 0 XP", async () => {
    // A circle whose word is new the first time, already finished.
    const index = FOUNDATION.nodes.findIndex((node) => Boolean(getNodeArabic(node.id)) && isFirstUseOfWord(node.id) && node.lessonIds.length > 0);
    expect(index).toBeGreaterThanOrEqual(0);
    const node = FOUNDATION.nodes[index];
    const done = FOUNDATION.nodes.slice(0, index + 1);
    const user = makeUser({
      hearts: TODAY_HEARTS(true),
      completedNodeIds: done.map((item) => item.id),
      completedLessonIds: done.flatMap((item) => item.lessonIds)
    });
    seedUser(user);
    const challenges = (await learningApi.getLessonSession(node.lessonIds[0], user)).lesson.challenges;

    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    await press(`path-node-${node.id}`);
    expect(screen.getByTestId("node-card-start")).toHaveTextContent(/^practice$/i);
    await press("node-card-start");
    expect(await screen.findByTestId("learn-arabic")).toBeTruthy();
    expect(screen.queryByText("NEW")).toBeNull();

    await press("learn-continue");
    for (const challenge of challenges) {
      await answer(challenge, true);
    }
    expect(await screen.findByTestId("lesson-complete")).toBeTruthy();
    expect(savedUser().totalXp).toBe(user.totalXp);
  });
});
