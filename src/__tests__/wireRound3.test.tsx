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
  getNodeXp,
  getTestOutPlan,
  learningApi,
  testOutPassingScore
} from "../api/islamicLearningApi";
import { COURSE, LESSONS_BY_ID } from "../data/course";
import { getNodeArabic, isFirstUseOfWord } from "../data/arabicTerms";
import { getStoredItem, removeStoredItem, setStoredItem } from "../services/appStorage";
import { clearActiveAssessment, clearPracticeResult, loadPracticeResult, saveActiveAssessment, savePracticeResult } from "../services/localProgress";
import {
  advanceFoundationAssessment,
  createEmptyLearnerProfile,
  createFoundationAssessment,
  submitFoundationAssessmentAnswer
} from "../services/foundationAssessment";
import type { Challenge, FoundationAssessmentState, UserProfile } from "../types";
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

// The question on screen: its tiles, and the start of its prompt.
function shownChallenge(challenges: Challenge[]) {
  return challenges.find((challenge) =>
    challenge.choices.every((choice) => screen.queryByTestId(`choice-${choice.id}`)) &&
    screen.queryAllByText(challenge.prompt.slice(0, 40).split(/[^A-Za-z0-9 ,.?!]/)[0].trim(), { exact: false }).length > 0
  );
}

async function answer(challenge: Challenge, right: boolean) {
  const pick = right ? challenge.correctChoiceId : challenge.choices.find((choice) => choice.id !== challenge.correctChoiceId)!.id;
  await press(`choice-${pick}`);
  await press("exercise-check");
  await press("feedback-continue");
}

const QURAN = COURSE.sections.find((section) => section.topicId === "quran_tafseer")!;
const FOUNDATION = COURSE.sections.find((section) => section.topicId === "foundation")!;

// A locked circle of the Quran's first unit, a few circles in, that JUMP HERE can open.
function quranJump(user: UserProfile) {
  const unit = QURAN.nodes.filter((node) => node.branchId === QURAN.branches[0].id);
  const jumpIds = getJumpNodeIds(user, "quran_tafseer");
  const target = unit.find((node, index) => index >= 2 && jumpIds.has(node.id))!;
  const plan = getTestOutPlan(user, target.branchId, target.id)!;
  const session = createTestOutSession({
    branchTitle: QURAN.branches[0].title,
    branchId: target.branchId,
    lessons: plan.lessons,
    nodeIds: plan.nodeIds,
    heartsAtStart: 5,
    attempt: 0,
    jumpNodeId: target.id
  });
  return { unit, target, plan, challenges: session.lesson.challenges };
}

async function startQuranJump(target: { id: string }) {
  await screen.findByTestId("learn-path-quran_tafseer");
  await press(`path-node-${target.id}`);
  await press("node-card-jump");
  await press("test-out-start");
}

// Whole test-outs played through the app: slower than one screen, more so while the full suite runs.
jest.setTimeout(30000);

afterEach(() => {
  removeStoredItem(PROFILE_KEY);
  clearActiveAssessment();
  clearPracticeResult();
});

describe("JUMP HERE in a library topic", () => {
  it("tests the circles before the tapped one, and passing makes it the next to play", async () => {
    const user = makeUser({ hearts: TODAY_HEARTS(false), lastTopicId: "quran_tafseer" });
    seedUser(user);
    const { unit, target, plan, challenges } = quranJump(user);
    const index = unit.findIndex((node) => node.id === target.id);
    expect(plan.nodeIds).toEqual(unit.slice(0, index).map((node) => node.id));

    await render(<TopicApp />);
    await startQuranJump(target);

    for (const challenge of challenges) {
      expect(shownChallenge(challenges)?.id).toBe(challenge.id);
      await answer(challenge, true);
    }

    expect(await screen.findByText("You jumped ahead!")).toBeTruthy();
    const after = savedUser();
    expect(after.completedNodeIds).toEqual(expect.arrayContaining(plan.nodeIds));
    expect(after.completedNodeIds).not.toContain(target.id);
    expect(learningApi.getPathNodes(after).find((node) => node.id === target.id)?.status).not.toBe("locked");
  });

  it("ends as soon as it can no longer be passed, and its misses cost no hearts", async () => {
    const user = makeUser({ hearts: TODAY_HEARTS(false), lastTopicId: "quran_tafseer" });
    seedUser(user);
    const { target, challenges } = quranJump(user);
    const lostAfter = challenges.length - testOutPassingScore(challenges.length) + 1;
    expect(lostAfter).toBeLessThan(challenges.length);

    await render(<TopicApp />);
    await startQuranJump(target);

    for (const challenge of challenges.slice(0, lostAfter)) {
      expect(shownChallenge(challenges)?.id).toBe(challenge.id);
      await answer(challenge, false);
    }

    expect(screen.getByTestId("test-out-result")).toBeTruthy();
    expect(screen.queryByTestId("exercise-view")).toBeNull();
    // The score is out of the questions it asked.
    expect(screen.getByText(`0 of ${lostAfter} right`)).toBeTruthy();
    expect(screen.getByLabelText("5 of 5 hearts")).toBeTruthy();
    expect(savedUser().hearts.current).toBe(5);

    // TRY AGAIN tests for the same circle.
    await press("test-out-result-confirm");
    const retry = getTestOutPlan(user, target.branchId, target.id)!;
    const second = createTestOutSession({
      branchTitle: QURAN.branches[0].title,
      branchId: target.branchId,
      lessons: retry.lessons,
      nodeIds: retry.nodeIds,
      heartsAtStart: 5,
      attempt: 1,
      jumpNodeId: target.id
    }).lesson.challenges;
    expect(shownChallenge(second)?.id).toBe(second[0].id);
  });
});

describe("remembered between visits", () => {
  it("keeps the topic the learner picks on the saved learner", async () => {
    seedUser(makeUser());
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    await press("top-bar-topic");
    await press("topic-tile-sahabah");
    // Sahabah has sub-topics, so the tile opens its list first.
    await press("topic-unit-all");
    expect(await screen.findByTestId("learn-path-sahabah")).toBeTruthy();
    expect(savedUser().lastTopicId).toBe("sahabah");
  });

  it("opens on the topic the learner picked last time", async () => {
    seedUser(makeUser({ lastTopicId: "sahabah" }));
    await render(<TopicApp />);
    expect(await screen.findByTestId("learn-path-sahabah")).toBeTruthy();
  });

  it("shows a practice end screen again after a reload, and CONTINUE goes to Practice", async () => {
    seedUser(makeUser());
    const profile = createEmptyLearnerProfile();
    savePracticeResult("guest", { assessment: createFoundationAssessment(profile, "review"), profile });

    await render(<TopicApp />);
    expect(await screen.findByTestId("practice-complete-continue")).toBeTruthy();
    await press("practice-complete-continue");
    expect(await screen.findByTestId("practice-hub")).toBeTruthy();
    expect(loadPracticeResult("guest")).toBeNull();
  });
});

// A practice session answered right up to its last question, which shows its feedback.
function lastStepOf(mode: FoundationAssessmentState["mode"]) {
  let profile = createEmptyLearnerProfile();
  let state = createFoundationAssessment(profile, mode);

  for (;;) {
    const result = submitFoundationAssessmentAnswer({ profile, state, selectedAnswer: state.currentQuestion.correctAnswer ?? "", responseTimeMs: 2000 });
    profile = result.nextProfile;
    const next = advanceFoundationAssessment(profile, result.stateWithFeedback);
    if (!next) return { state: result.stateWithFeedback, profile };
    state = next;
  }
}

describe("practice and the streak", () => {
  it.each([
    ["review", 1],
    ["daily_challenge", 1],
    ["placement", 0]
  ] as const)("a finished %s gives a streak of %i", async (mode, streak) => {
    const { state, profile } = lastStepOf(mode);
    seedUser(makeUser({ learnerProfile: profile }));
    saveActiveAssessment("guest", state);

    await render(<TopicApp />);
    await screen.findByTestId("assessment-screen");
    await press("feedback-continue");
    expect(await screen.findByTestId("practice-complete-continue")).toBeTruthy();
    expect(savedUser().streakDays).toBe(streak);
    // The end screen is kept until CONTINUE, for a reload.
    expect(loadPracticeResult("guest")).not.toBeNull();
  });
});

describe("path circles and lesson cards", () => {
  it("shows START with the XP the lesson really pays, and stars the circle with this run's best", async () => {
    const user = makeUser({ hearts: TODAY_HEARTS(true) });
    seedUser(user);
    const node = learningApi.getPathNodes(user).find((item) => item.topicId === "foundation" && item.status === "current")!;
    const challenges = (await learningApi.getLessonSession(node.firstLessonId, user)).lesson.challenges;

    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    await press(`path-node-${node.id}`);
    expect(screen.getByTestId("node-card-start")).toHaveTextContent(new RegExp(`Start \\+${getNodeXp(node)} XP`, "i"));
    await press("node-card-start");
    await press("learn-continue");

    // One miss, then it comes back and is right: 2 stars.
    await answer(challenges[0], false);
    for (const challenge of challenges.slice(1)) {
      await answer(challenge, true);
    }
    await answer(challenges[0], true);
    expect(screen.getByLabelText("2 of 3 stars")).toBeTruthy();
    // The card counts up to it, so read the saved total.
    expect(savedUser().totalXp).toBe(user.totalXp + getNodeXp(node));
    expect(savedUser().nodeStars?.[node.id]).toBe(2);

    // A finished circle pays nothing again, so its button says just PRACTICE.
    await press("complete-back");
    await press(`path-node-${node.id}`);
    expect(screen.getByTestId("node-card-start")).toHaveTextContent(/^practice$/i);
  });

  it("marks NEW only the first time a topic shows a word", async () => {
    const order = FOUNDATION.nodes;
    const repeat = order.findIndex((node) => Boolean(getNodeArabic(node.id)) && !isFirstUseOfWord(node.id) && node.lessonIds.length > 0);
    expect(repeat).toBeGreaterThan(0);
    const node = order[repeat];
    const user = makeUser({
      hearts: TODAY_HEARTS(true),
      completedNodeIds: order.slice(0, repeat).map((item) => item.id),
      completedLessonIds: order.slice(0, repeat).flatMap((item) => item.lessonIds)
    });
    seedUser(user);
    expect(learningApi.getPathNodes(user).find((item) => item.id === node.id)?.status).toBe("current");

    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    await press(`path-node-${node.id}`);
    await press("node-card-start");
    expect(await screen.findByTestId("learn-arabic")).toBeTruthy();
    expect(screen.queryByText("NEW")).toBeNull();
  });

  // Opens the learn card of the first foundation circle that `pick` accepts, with every circle before it done.
  async function openFoundationCard(pick: (lesson: (typeof LESSONS_BY_ID)[string]) => boolean) {
    const order = FOUNDATION.nodes;
    const index = order.findIndex((node) => node.lessonIds.length > 0 && pick(LESSONS_BY_ID[node.lessonIds[0]]));
    expect(index).toBeGreaterThanOrEqual(0);
    const node = order[index];
    seedUser(makeUser({
      hearts: TODAY_HEARTS(true),
      completedNodeIds: order.slice(0, index).map((item) => item.id),
      completedLessonIds: order.slice(0, index).flatMap((item) => item.lessonIds)
    }));
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    await press(`path-node-${node.id}`);
    await press("node-card-start");
    await screen.findByTestId("learn-card");
    return LESSONS_BY_ID[node.lessonIds[0]];
  }

  it("puts the lesson's own source on the learn card, by its short reference", async () => {
    const lesson = await openFoundationCard((item) => Boolean(item?.learnSource?.reference));
    // The chip, or the quote's own reference line when they name the same source.
    const shown = screen.queryByTestId("learn-source") ?? screen.getByTestId("learn-quote-reference");
    expect(shown).toHaveTextContent(lesson.learnSource!.reference!);
  });

  it("shows no source chip on a learn card without a source of its own", async () => {
    await openFoundationCard((item) => Boolean(item) && !item.learnSource && item.sources.length > 0);
    // The unit's sources do not say what the card says.
    expect(screen.queryByTestId("learn-source")).toBeNull();
  });
});

describe("top bar and account", () => {
  it("opens the streak sheet from the flame", async () => {
    seedUser(makeUser());
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    await press("top-bar-streak");
    expect(screen.getByTestId("streak-sheet")).toBeTruthy();
    expect(screen.getByTestId("streak-title")).toHaveTextContent("No streak yet");
  });

  it("asks a grown-up before the sign up form", async () => {
    removeStoredItem("sira-path-age-group");
    seedUser(makeUser());
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    await press("tab-me");
    await press("profile-create");
    // The age comes first (on a phone), so an under-13 sign-up asks for a parent's name and email.
    expect(screen.queryByTestId("account-grownup")).toBeNull();
    await press("age-18+");
    await press("age-save");
    expect(screen.getByTestId("account-grownup")).toBeTruthy();
    expect(screen.queryByTestId("account-name")).toBeNull();
  });

  it("asks the age before sign up even with ads off, and under 13 the form asks for a parent", async () => {
    removeStoredItem("sira-path-age-group");
    seedUser(makeUser());
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    await press("tab-me");
    await press("profile-create");
    expect(screen.getByTestId("age-sheet")).toBeTruthy();
    await press("age-10-12");
    await press("age-save");
    const [a, b] = (String(screen.getByTestId("grownup-question").props.children).match(/\d+/g) ?? []).map(Number);
    await press(`grownup-option-${a * b}`);
    expect(screen.getByTestId("account-name").props.placeholder).toBe("Parent's name");
    expect(screen.getByTestId("account-email").props.placeholder).toBe("Parent's email");
  });
});
