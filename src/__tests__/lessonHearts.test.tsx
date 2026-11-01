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
import { createTestOutSession, getTestOutPlan, learningApi, localDateKey, testOutPassingScore } from "../api/islamicLearningApi";
import { COURSE } from "../data/course";
import { getStoredItem, removeStoredItem, setStoredItem } from "../services/appStorage";
import { clearActiveAssessment } from "../services/localProgress";
import { answerLessonStep, isLastLessonStep, startLessonQueue } from "../services/lessonQueue";
import type { Challenge, LearningNodeView, UserProfile } from "../types";
import { makeUser } from "./testUtils";

// The heart rule, the way Duolingo plays: every wrong answer costs a heart (a missed question asked again
// too), a missed question comes back at the end until it is right, and the lesson is complete only when
// every question has been right once. At 0 hearts the out-of-hearts sheet stops the lesson.

const PROFILE_KEY = "sira-path-user-profile";
const hearts = (current: number, unlimited = false) => ({ current, max: 5, unlimited, lastRefillDate: localDateKey() });

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

/** Picks an answer and taps CHECK; the feedback sheet stays up. */
async function check(challenge: Challenge, right: boolean) {
  const pick = right ? challenge.correctChoiceId : challenge.choices.find((choice) => choice.id !== challenge.correctChoiceId)!.id;
  await press(`choice-${pick}`);
  await press("exercise-check");
}

const tileOrder = () =>
  screen
    .getAllByRole("button")
    .map((node) => node.props.testID as string | undefined)
    .filter((id): id is string => Boolean(id?.startsWith("choice-")));
const heartLabel = () => screen.getByTestId("lesson-hearts").props.accessibilityLabel as string;
// The lesson bar's fill, out of 100: every step of the lesson (learn pages and questions) counts the same.
const progress = () => screen.getByTestId("lesson-progress").props.accessibilityValue.now as number;

/** CONTINUE through learn pages ("Good to know", "Quiz time!") until a question shows. */
async function toQuestion() {
  for (let page = 0; page < 12 && screen.queryByTestId("learn-continue") && !screen.queryByTestId("exercise-view"); page += 1) {
    await press("learn-continue");
  }
}

// Foundation's first circle: learn pages and its own questions in turn, then its quiz (no review question this early).
async function startFirstLesson(user: UserProfile) {
  seedUser(user);
  const node = learningApi.getPathNodes(user).find((item) => item.topicId === "foundation" && item.status === "current") as LearningNodeView;
  const challenges = (await learningApi.getLessonSession(node.firstLessonId, user)).lesson.challenges;
  await render(<TopicApp />);
  await screen.findByTestId("learn-path-foundation");
  await press(`path-node-${node.id}`);
  await press("node-card-start");
  await toQuestion();
  return { node, challenges };
}

describe("lesson queue: a miss comes back until it is right", () => {
  it("never runs out of questions while every answer is wrong", () => {
    let queue = startLessonQueue(3);
    for (let position = 0; position < 40; position += 1) {
      const step = answerLessonStep(queue, position, false, false);
      expect(step.requeued).toBe(true);
      expect(step.done).toBe(false);
      queue = step.queue;
      expect(isLastLessonStep(queue, position)).toBe(false);
    }
    // Each question came back as its next try, in the lesson's order.
    expect(queue[39]).toEqual({ index: 0, attempt: 13 });
    expect(queue[40]).toEqual({ index: 1, attempt: 13 });
  });

  it("brings a question missed twice back twice, and ends when it is right", () => {
    let queue = startLessonQueue(2);
    queue = answerLessonStep(queue, 0, false, false).queue;
    queue = answerLessonStep(queue, 1, true, false).queue;
    expect(queue[2]).toEqual({ index: 0, attempt: 1 });
    queue = answerLessonStep(queue, 2, false, false).queue;
    expect(queue[3]).toEqual({ index: 0, attempt: 2 });
    const right = answerLessonStep(queue, 3, true, false);
    expect(right.done).toBe(true);
    expect(right.queue).toHaveLength(4);
    expect(isLastLessonStep(right.queue, 3)).toBe(true);
  });

  it("does not add a miss to the end when the circle's quiz asks it again anyway", () => {
    const queue = [{ index: 0, attempt: 0 }, { index: 1, attempt: 0 }, { index: 0, attempt: 0, quiz: true }];
    const miss = answerLessonStep(queue, 0, false, false);
    expect(miss.requeued).toBe(false);
    expect(miss.queue).toHaveLength(3);
    // Missed in the quiz, it comes back at the end as its next try.
    const quizMiss = answerLessonStep(queue, 2, false, false);
    expect(quizMiss.requeued).toBe(true);
    expect(quizMiss.queue[3]).toEqual({ index: 0, attempt: 1, quiz: true });
  });
});

describe("TopicApp heart rule", () => {
  // The plans were just offered, so running out of hearts opens the hearts sheet straight away (planOffer.test.tsx).
  beforeEach(() => setStoredItem("sira-path-plan-offer-at", String(Date.now())));
  afterEach(() => {
    removeStoredItem(PROFILE_KEY);
    clearActiveAssessment();
  });

  it("never completes a lesson answered all wrong: each wrong retry costs a heart and 0 hearts opens the sheet", async () => {
    const { node, challenges } = await startFirstLesson(makeUser({ hearts: hearts(5) }));
    expect(challenges).toHaveLength(3);
    // Each question once while learning, then the quiz asks them again.
    const order = [0, 1, 2, 0, 1];
    let bar = progress();

    for (const [turn, index] of order.entries()) {
      await toQuestion();
      const shown = shownChallenge(challenges)!;
      expect(shown.id).toBe(challenges[index].id);
      // The quiz asks fresh: no "Try again!" in the first rounds.
      expect(screen.queryByText("Try again!")).toBeNull();
      await check(shown, false);
      // Every wrong answer costs a heart, the retries too.
      expect(heartLabel()).toBe(`${4 - turn} of 5 hearts`);
      // The bar never goes back, and never fills while nothing is right.
      expect(progress()).toBeGreaterThanOrEqual(bar);
      expect(progress()).toBeLessThan(100);
      bar = progress();
      await press("feedback-continue");
    }

    // At 0 hearts GOT IT opens the out-of-hearts sheet with its one free refill, never the next question
    // and never the lesson complete screen.
    expect(screen.getByTestId("refill-sheet")).toBeTruthy();
    expect(screen.getByTestId("refill-claim")).toBeTruthy();
    expect(screen.queryByTestId("stat-stars")).toBeNull();
    expect(savedUser().completedLessonIds).not.toContain(node.firstLessonId);
    expect(savedUser().completedNodeIds).not.toContain(node.id);

    // The free refill fills the hearts one by one, then the lesson goes on with the quiz's last question.
    await press("refill-claim");
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1100));
    });
    expect(heartLabel()).toBe("5 of 5 hearts");
    expect(shownChallenge(challenges)!.id).toBe(challenges[2].id);

    // Right at last, each one (the quiz's misses come back as a new try): the lesson-complete flow follows the last
    // of them. Stars count first tries.
    for (const [turn, index] of [2, 0, 1].entries()) {
      const shown = shownChallenge(challenges)!;
      expect(shown.id).toBe(challenges[index].id);
      expect(Boolean(screen.queryByText("Try again!"))).toBe(turn > 0);
      await check(shown, true);
      await press("feedback-continue");
    }
    expect(await screen.findByTestId("stat-stars")).toBeTruthy();
    expect(screen.getByLabelText("1 of 3 stars")).toBeTruthy();
    expect(savedUser().completedLessonIds).toContain(node.firstLessonId);
  });

  it("brings a question missed in the quiz back twice, its tiles moved each time, and the bar never goes back", async () => {
    const { challenges } = await startFirstLesson(makeUser({ hearts: hearts(5, true) }));
    const [first, ...rest] = challenges;

    // While learning: the first is missed, the others right.
    await check(first, false);
    await press("feedback-continue");
    for (const challenge of rest) {
      await toQuestion();
      expect(shownChallenge(challenges)!.id).toBe(challenge.id);
      await check(challenge, true);
      await press("feedback-continue");
    }

    // The quiz asks the first again, fresh, and it is missed again.
    await toQuestion();
    expect(shownChallenge(challenges)!.id).toBe(first.id);
    expect(screen.queryByText("Try again!")).toBeNull();
    const firstTry = tileOrder();
    await check(first, false);
    const bar = progress();
    await press("feedback-continue");
    for (const challenge of rest) {
      expect(shownChallenge(challenges)!.id).toBe(challenge.id);
      await check(challenge, true);
      await press("feedback-continue");
    }

    // First comeback: Try again!, tiles in a new order, missed again. The bar stays where it was.
    expect(shownChallenge(challenges)!.id).toBe(first.id);
    expect(screen.getByText("Try again!")).toBeTruthy();
    const secondTry = tileOrder();
    expect(secondTry).not.toEqual(firstTry);
    const before = progress();
    expect(before).toBeGreaterThanOrEqual(bar);
    await check(first, false);
    expect(progress()).toBe(before);
    expect(screen.queryByTestId("stat-stars")).toBeNull();
    await press("feedback-continue");

    // Second comeback: the same question once more, in another order than the try before.
    expect(shownChallenge(challenges)!.id).toBe(first.id);
    expect(screen.getByText("Try again!")).toBeTruthy();
    const thirdTry = tileOrder();
    expect(thirdTry).not.toEqual(secondTry);
    await check(first, true);
    expect(progress()).toBe(100);
    await press("feedback-continue");

    // Missed on its first try while learning and in the quiz: 2 stars, however often it came back.
    expect(await screen.findByTestId("stat-stars")).toBeTruthy();
    expect(screen.getByLabelText("2 of 3 stars")).toBeTruthy();
  });

  it("after the free refill, 0 hearts says hearts come back tomorrow and END LESSON leaves the lesson unfinished", async () => {
    const { node, challenges } = await startFirstLesson(makeUser({ hearts: hearts(1), reviewHeartRestoreUsed: true }));

    await check(challenges[0], false);
    expect(heartLabel()).toBe("0 of 5 hearts");
    await press("feedback-continue");

    expect(screen.getByTestId("refill-tomorrow")).toHaveTextContent("Full hearts again tomorrow!");
    await press("refill-end");
    expect(screen.queryByTestId("exercise-view")).toBeNull();
    expect(screen.getByTestId("learn-path-foundation")).toBeTruthy();
    expect(savedUser().completedNodeIds).not.toContain(node.id);
    expect(savedUser().hearts.current).toBe(0);
  });

  it("keeps a test-out free of hearts: each question once, and it ends when it cannot be passed", async () => {
    const user = makeUser({ hearts: hearts(5) });
    seedUser(user);
    const unit = COURSE.sections.find((section) => section.topicId === "foundation")!.branches[0];
    const plan = getTestOutPlan(user, unit.id)!;
    const questions = createTestOutSession({
      branchTitle: unit.title,
      branchId: unit.id,
      lessons: plan.lessons,
      nodeIds: plan.nodeIds,
      heartsAtStart: 5,
      attempt: 0
    }).lesson.challenges;

    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    await press(`unit-test-out-${unit.id}`);
    await press("test-out-start");

    const lostAfter = questions.length - testOutPassingScore(questions.length) + 1;
    for (const challenge of questions.slice(0, lostAfter)) {
      expect(shownChallenge(questions)?.id).toBe(challenge.id);
      expect(screen.queryByText("Try again!")).toBeNull();
      await check(challenge, false);
      expect(heartLabel()).toBe("5 of 5 hearts");
      await press("feedback-continue");
    }
    expect(screen.getByTestId("test-out-result")).toBeTruthy();
    expect(screen.queryByTestId("refill-sheet")).toBeNull();
  });
});
