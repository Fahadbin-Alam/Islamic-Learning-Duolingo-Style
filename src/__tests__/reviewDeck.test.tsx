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
  createLessonPracticeSession,
  createReviewSession,
  isContextBound,
  loseHeart,
  localDateKey,
  recordLessonAnswer,
  reviewCardKeyFor,
  reviewDueCount,
  PRACTICE_XP_PER_CORRECT_ANSWER
} from "../api/islamicLearningApi";
import { COURSE, LESSONS_BY_ID } from "../data/course";
import { getStoredItem, removeStoredItem, setStoredItem } from "../services/appStorage";
import { clearActiveAssessment } from "../services/localProgress";
import {
  REVIEW_DECK_LIMIT,
  REVIEW_LEARNED_BOX,
  REVIEW_SESSION_SIZE,
  cleanReviewCards,
  dueCount,
  recordReviewMiss,
  recordReviewRight
} from "../services/reviewDeck";
import type { Challenge, LessonSession, ReviewCard, UserProfile } from "../types";
import { makeUser } from "./testUtils";

const DAY = 24 * 60 * 60 * 1000;
const NOW = new Date("2026-10-30T12:00:00Z");
const later = (days: number) => new Date(NOW.getTime() + days * DAY);
const key = { lessonId: "lesson_a", challengeId: "q1" };

describe("Review deck schedule", () => {
  it("puts a miss in box 0, due at once", () => {
    const cards = recordReviewMiss(undefined, key, NOW);
    expect(cards).toEqual([{ ...key, box: 0, dueAt: NOW.toISOString(), misses: 1, lastSeenAt: NOW.toISOString() }]);
    expect(dueCount(cards, NOW)).toBe(1);
  });

  it("waits 1, 3 then 7 days after each right answer, and lets the question go after the last", () => {
    let cards = recordReviewMiss(undefined, key, NOW);
    let when = NOW;
    for (const days of [1, 3, 7]) {
      cards = recordReviewRight(cards, key, when);
      expect(cards[0].dueAt).toBe(new Date(when.getTime() + days * DAY).toISOString());
      // Not due a minute before, due when the wait is over.
      expect(dueCount(cards, new Date(when.getTime() + days * DAY - 60_000))).toBe(0);
      when = new Date(when.getTime() + days * DAY);
      expect(dueCount(cards, when)).toBe(1);
    }
    expect(cards[0].box).toBe(REVIEW_LEARNED_BOX);
    expect(recordReviewRight(cards, key, when)).toEqual([]);
  });

  it("ignores a right answer before the question is due, unless it is a Review", () => {
    const cards = recordReviewRight(recordReviewMiss(undefined, key, NOW), key, NOW);
    expect(recordReviewRight(cards, key, later(0.5))).toBe(cards);
    expect(recordReviewRight(cards, key, later(0.5), true)[0].box).toBe(2);
  });

  it("sends a question back to the start on a new miss and counts the misses", () => {
    let cards = recordReviewMiss(undefined, key, NOW);
    cards = recordReviewRight(cards, key, NOW);
    cards = recordReviewRight(cards, key, later(1));
    cards = recordReviewMiss(cards, key, later(5));
    expect(cards).toHaveLength(1);
    expect(cards[0]).toMatchObject({ box: 0, misses: 2, dueAt: later(5).toISOString() });
  });

  it("never grows past its limit and keeps the newest misses", () => {
    let cards: ReviewCard[] = [];
    for (let index = 0; index < REVIEW_DECK_LIMIT + 5; index += 1) {
      cards = recordReviewMiss(cards, { lessonId: "lesson_a", challengeId: `q${index}` }, new Date(NOW.getTime() + index * 1000));
    }
    expect(cards).toHaveLength(REVIEW_DECK_LIMIT);
    expect(cards.some((card) => card.challengeId === `q${REVIEW_DECK_LIMIT + 4}`)).toBe(true);
    expect(cards.some((card) => card.challengeId === "q0")).toBe(false);
  });

  it("reads an old save with no deck, and drops junk", () => {
    expect(cleanReviewCards(undefined)).toEqual([]);
    expect(cleanReviewCards([{ lessonId: "a" }, null, { ...key, box: 1, dueAt: NOW.toISOString() }])).toEqual([
      { ...key, box: 1, dueAt: NOW.toISOString(), misses: 1, lastSeenAt: NOW.toISOString() }
    ]);
  });
});

// Lessons with questions that can be asked on their own, from two topics.
const sectionLessons = (topicId: string, count: number) =>
  COURSE.sections.find((section) => section.topicId === topicId)!.nodes.flatMap((node) => node.lessonIds).slice(0, count);
const finished = [...sectionLessons("foundation", 3), ...sectionLessons("quran_tafseer", 2)];
const lessonSession = (lessonId: string): LessonSession => ({
  id: "s",
  lesson: LESSONS_BY_ID[lessonId],
  startedAt: NOW.toISOString(),
  heartsAtStart: 5
});
const standalone = (lessonId: string) => {
  const session = lessonSession(lessonId);
  return LESSONS_BY_ID[lessonId].challenges.filter((challenge) => !challenge.isReview && reviewCardKeyFor(session, challenge));
};
const missedUser = (count: number) => {
  let user = makeUser({ completedLessonIds: finished });
  for (const lessonId of finished) {
    for (const challenge of standalone(lessonId)) {
      if ((user.reviewCards?.length ?? 0) >= count) return user;
      user = recordLessonAnswer(user, lessonSession(lessonId), challenge, false, NOW);
    }
  }
  return user;
};

describe("Review deck (lessons)", () => {
  it("knows a question by its own lesson however a session asked it", () => {
    const lessonId = finished.find((id) => standalone(id).length)!;
    const own = standalone(lessonId)[0];
    const expected = { lessonId, challengeId: own.id };
    expect(reviewCardKeyFor(lessonSession(lessonId), own)).toEqual(expected);
    // Practice, a test-out or a Review put a prefix on the id and name the lesson.
    const asked = { ...own, id: `lesson_practice_3_${own.id}`, sourceLessonId: lessonId };
    expect(reviewCardKeyFor({ lesson: { ...LESSONS_BY_ID[lessonId], id: "lesson_practice" } }, asked)).toEqual(expected);
    // A later lesson asks a copy of it as a review, under its own id.
    const copy = { ...own, id: "some_lesson_review_2", isReview: true, sourceLessonId: lessonId };
    expect(reviewCardKeyFor(lessonSession(finished[finished.length - 1]), copy)).toEqual(expected);
  });

  it("leaves out a question that only reads right inside its lesson", () => {
    const lesson = Object.values(LESSONS_BY_ID).find((item) => item.challenges.some((challenge) => !challenge.isReview && isContextBound(challenge.prompt)))!;
    const bound = lesson.challenges.find((challenge) => !challenge.isReview && isContextBound(challenge.prompt))!;
    expect(reviewCardKeyFor({ lesson }, bound)).toBeUndefined();
  });

  it("asks the due misses, at most 10, with the right answers, and costs no hearts", () => {
    const user = missedUser(REVIEW_SESSION_SIZE + 2);
    expect(reviewDueCount(user, NOW)).toBe(REVIEW_SESSION_SIZE + 2);
    const session = createReviewSession(user, NOW)!;
    expect(session.reviewDeck).toBe(true);
    expect(session.mode).toBe("lesson_practice");
    expect(session.lesson.challenges).toHaveLength(REVIEW_SESSION_SIZE);
    for (const challenge of session.lesson.challenges) {
      const card = user.reviewCards!.find((item) => challenge.id.endsWith(`_${item.challengeId}`) && item.lessonId === challenge.sourceLessonId)!;
      const own = LESSONS_BY_ID[card.lessonId].challenges.find((item) => item.id === card.challengeId)!;
      expect(challenge.prompt).toBe(own.prompt);
      const label = (item: Challenge) => item.choices.find((choice) => choice.id === item.correctChoiceId)!.label;
      expect(label(challenge)).toBe(label(own));
    }
    expect(loseHeart({ ...user, hearts: { ...user.hearts, current: 2 } }, session).hearts.current).toBe(2);
    expect(createReviewSession(makeUser(), NOW)).toBeUndefined();
  });

  it("asks the weakest first", () => {
    let user = missedUser(3);
    const weakest = user.reviewCards![2];
    const own = LESSONS_BY_ID[weakest.lessonId].challenges.find((item) => item.id === weakest.challengeId)!;
    user = recordLessonAnswer(user, lessonSession(weakest.lessonId), own, false, NOW);
    expect(createReviewSession(user, NOW)!.lesson.challenges[0].prompt).toBe(own.prompt);
  });

  it("moves a card on for a right answer in a Review, and only for a due one in a lesson", () => {
    const user = missedUser(1);
    const card = user.reviewCards![0];
    const own = LESSONS_BY_ID[card.lessonId].challenges.find((item) => item.id === card.challengeId)!;
    const review = createReviewSession(user, NOW)!;
    const afterReview = recordLessonAnswer(user, review, review.lesson.challenges[0], true, NOW);
    expect(afterReview.reviewCards![0]).toMatchObject({ box: 1, dueAt: later(1).toISOString() });
    expect(reviewDueCount(afterReview, NOW)).toBe(0);
    // Right again in a lesson the same day: not due, so nothing moves.
    expect(recordLessonAnswer(afterReview, lessonSession(card.lessonId), own, true, later(0.5))).toBe(afterReview);
    // A day later it is due, and a lesson that asks it moves it on.
    expect(recordLessonAnswer(afterReview, lessonSession(card.lessonId), own, true, later(1)).reviewCards![0].box).toBe(2);
  });
});

const PROFILE_KEY = "sira-path-user-profile";
const savedUser = () => JSON.parse(getStoredItem(PROFILE_KEY) ?? "{}") as UserProfile;

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

const pick = (challenge: Challenge, right: boolean) =>
  right ? challenge.correctChoiceId : challenge.choices.find((choice) => choice.id !== challenge.correctChoiceId)!.id;

// The question on screen, from the session's list.
const shownIn = (challenges: Challenge[]) =>
  challenges.find(
    (challenge) =>
      challenge.choices.every((choice) => screen.queryByTestId(`choice-${choice.id}`)) &&
      screen.queryAllByText(challenge.prompt.slice(0, 40).split(/[^A-Za-z0-9 ,.?!]/)[0].trim(), { exact: false }).length > 0
  )!;

async function playThrough(challenges: Challenge[], right: (step: number) => boolean) {
  for (let step = 0; step < challenges.length * 2; step += 1) {
    const challenge = shownIn(challenges);
    await press(`choice-${pick(challenge, right(step))}`);
    await press("exercise-check");
    await press("feedback-continue");
    if (screen.queryByTestId("lesson-complete")) return;
    if (!screen.queryByTestId("exercise-view")) throw new Error("left the lesson at step " + step);
  }
  throw new Error("never finished");
}

async function openPractice(user: UserProfile) {
  setStoredItem(PROFILE_KEY, JSON.stringify(user));
  // The age is known, so finishing does not stop on the age question.
  setStoredItem("sira-path-age-group", "18+");
  await render(<TopicApp />);
  await screen.findByTestId("learn-path-foundation");
  await press("tab-practice");
}

describe("Review deck (Practice tab)", () => {
  afterEach(() => {
    removeStoredItem(PROFILE_KEY);
    clearActiveAssessment();
  });

  it("puts a question missed in My lessons in the deck", async () => {
    const user = makeUser({ completedLessonIds: finished });
    const practice = createLessonPracticeSession(user, 0)!;
    await openPractice(user);

    // Nothing missed yet: REVIEW rests.
    await press("practice-review");
    expect(screen.getByText("No mistakes yet!")).toBeTruthy();

    // The first question missed, then right when it comes back at the end.
    await press("practice-lessons");
    const first = shownIn(practice.lesson.challenges);
    await playThrough(practice.lesson.challenges, (step) => step > 0);

    const firstKey = reviewCardKeyFor(practice, first);
    expect(firstKey).toBeDefined();
    // Answered right on its second try in the same run: still in the deck, as that does not prove it stuck.
    expect(savedUser().reviewCards).toEqual([expect.objectContaining({ ...firstKey, box: 0, misses: 1 })]);
  });

  it("asks the due misses in REVIEW and moves them on once answered right", async () => {
    const user = { ...missedUser(2), totalXp: 100 };
    const review = createReviewSession(user)!;
    await openPractice(user);
    expect(screen.getByTestId("practice-review").props.accessibilityLabel).toBe("Review, 2");
    expect(screen.getByText("Let's fix your mistakes!")).toBeTruthy();

    await press("practice-review");
    expect(screen.getByTestId("exercise-view")).toBeTruthy();
    // The first one missed again, the second right.
    await playThrough(review.lesson.challenges, (step) => step > 0);
    expect(screen.getByTestId("lesson-complete")).toBeTruthy();
    expect(savedUser().totalXp).toBe(100 + PRACTICE_XP_PER_CORRECT_ANSWER);
    expect(savedUser().dailyXp?.date).toBe(localDateKey());
    const boxes = savedUser().reviewCards!.map((card) => card.box).sort();
    expect(boxes).toEqual([0, 1]);
    expect(reviewDueCount(savedUser())).toBe(1);
  });

  it("says the learner is caught up when every miss waits for a later day", async () => {
    const user = missedUser(1);
    const waiting = { ...user, reviewCards: recordReviewRight(user.reviewCards, user.reviewCards![0], new Date(), true) };
    await openPractice(waiting);
    expect(screen.getByTestId("practice-review").props.accessibilityLabel).toBe("Review");
    await press("practice-review");
    expect(screen.getByText("All caught up!")).toBeTruthy();
    expect(screen.queryByTestId("exercise-view")).toBeNull();
  });
});
