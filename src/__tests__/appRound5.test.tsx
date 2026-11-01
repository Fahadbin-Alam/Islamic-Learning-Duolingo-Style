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
import { createTestOutSession, getTestOutPlan, learningApi } from "../api/islamicLearningApi";
import { PracticeComplete } from "../components/FoundationLearning";
import { COURSE } from "../data/course";
import { getStoredItem, removeStoredItem, setStoredItem } from "../services/appStorage";
import {
  advanceFoundationAssessment,
  createEmptyLearnerProfile,
  createFoundationAssessment,
  getFoundationWordBank,
  getSessionProgress,
  submitFoundationAssessmentAnswer,
  summarizeFoundationSession
} from "../services/foundationAssessment";
import { playGameSound } from "../services/gameAudio";
import { clearActiveAssessment, clearPracticeResult } from "../services/localProgress";
import type { Challenge, FoundationAssessmentState, FoundationQuestion, LearningNode, LearningNodeView, UserProfile } from "../types";
import { isPlayablePractice } from "../ui/lesson";
import { LearnPath, RefillSheet, type PathUnit } from "../ui/screens";
import { makeUser } from "./testUtils";

type Answer = string | string[] | Record<string, string>;

const PROFILE_KEY = "sira-path-user-profile";
const TODAY_HEARTS = (current: number, unlimited = false) => ({ current, max: 5, unlimited, lastRefillDate: localToday() });

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

const sounds = () => jest.mocked(playGameSound).mock.calls.map(([event]) => event);

const QURAN = COURSE.sections.find((section) => section.topicId === "quran_tafseer")!;
const FOUNDATION = COURSE.sections.find((section) => section.topicId === "foundation")!;
const quranUnits = QURAN.branches.map((branch) => QURAN.nodes.filter((node) => node.branchId === branch.id)).filter((nodes) => nodes.length > 0);
const nodeLabel = (node: LearningNode) => screen.getByTestId(`path-node-${node.id}`).props.accessibilityLabel as string;

function jumpTest(user: UserProfile, target: LearningNode) {
  const plan = getTestOutPlan(user, target.branchId, target.id)!;
  const session = createTestOutSession({ branchTitle: target.branchId, branchId: target.branchId, lessons: plan.lessons, nodeIds: plan.nodeIds, heartsAtStart: 5, attempt: 0, jumpNodeId: target.id });
  return { plan, challenges: session.lesson.challenges };
}

// A whole test-out played through the app, twice rendered: slower than one screen.
jest.setTimeout(30000);

// The plans were just offered, so running out of hearts opens the hearts sheet straight away (planOffer.test.tsx).
beforeEach(() => setStoredItem("sira-path-plan-offer-at", String(Date.now())));

afterEach(() => {
  removeStoredItem(PROFILE_KEY);
  clearActiveAssessment();
  clearPracticeResult();
});

describe("the path's START after a jump ahead (V8)", () => {
  // Quran unit 2's fourth circle: JUMP HERE, while unit 1 is still open.
  const target = quranUnits[1][3];

  it("stays on the circle the jump opened after the app is reloaded", async () => {
    const user = makeUser({ hearts: TODAY_HEARTS(5), lastTopicId: "quran_tafseer" });
    seedUser(user);
    const jump = jumpTest(user, target);

    const app = await render(<TopicApp />);
    await screen.findByTestId("learn-path-quran_tafseer");
    await press(`path-node-${target.id}`);
    await press("node-card-jump");
    await press("test-out-start");
    for (const challenge of jump.challenges) {
      await answer(challenge, true);
    }
    expect(await screen.findByText("You jumped ahead!")).toBeTruthy();
    await press("complete-back");
    await screen.findByTestId("learn-path-quran_tafseer");
    expect(nodeLabel(target)).toMatch(/, start$/);
    // Saved with the learner, for this topic.
    expect(savedUser().pathFocusIds).toEqual({ quran_tafseer: target.id });

    // A reload: the app starts again from what it saved.
    await app.unmount();
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-quran_tafseer");
    expect(nodeLabel(target)).toMatch(/, start$/);
    expect(nodeLabel(quranUnits[0][0])).not.toMatch(/, start$/);
    // The unit the jump landed in keeps its TEST OUT key.
    expect(screen.getByTestId(`unit-test-out-${target.branchId}`)).toBeTruthy();
    // A whole jump test plus two app starts: about 20 s alone, and much longer when the suites run in parallel.
  }, 90000);

  it("keeps each topic's own circle: a Foundation lesson does not move the Quran START", async () => {
    const skipped = jumpTest(makeUser(), target).plan;
    const user = makeUser({
      hearts: TODAY_HEARTS(5, true),
      completedNodeIds: skipped.nodeIds,
      completedLessonIds: skipped.lessons.map((lesson) => lesson.id),
      pathFocusIds: { quran_tafseer: target.id }
    });
    seedUser(user);
    const node = learningApi.getPathNodes(user).find((item) => item.topicId === "foundation" && item.status === "current")!;
    const session = await learningApi.getLessonSession(node.firstLessonId, user);
    expect(session.lesson.practiceActivities?.find(isPlayablePractice)).toBeUndefined();

    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    await press(`path-node-${node.id}`);
    await press("node-card-start");
    await press("learn-continue");
    for (const challenge of session.lesson.challenges) {
      await answer(challenge, true);
    }
    expect(await screen.findByTestId("lesson-complete")).toBeTruthy();
    const saved = savedUser().pathFocusIds ?? {};
    expect(saved.quran_tafseer).toBe(target.id);
    const foundationNext = learningApi.getPathNodes(savedUser()).find((item) => item.id === saved.foundation);
    expect(foundationNext?.topicId).toBe("foundation");
    expect(foundationNext?.status).toBe("current");
  });

  it("falls back to the path's own next circle when the saved one is not open", async () => {
    // Nothing skipped, so the saved circle is still locked.
    seedUser(makeUser({ hearts: TODAY_HEARTS(5), lastTopicId: "quran_tafseer", pathFocusIds: { quran_tafseer: target.id } }));
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-quran_tafseer");
    expect(nodeLabel(quranUnits[0][0])).toMatch(/, start$/);
    expect(nodeLabel(target)).not.toMatch(/, start$/);
  });
});

function wrongAnswerFor(question: FoundationQuestion): Answer {
  const correct = question.correctAnswer;
  if (question.type === "correct_order" && Array.isArray(correct)) return [...correct].reverse();
  if (question.type === "match_pairs" && correct && typeof correct === "object" && !Array.isArray(correct)) {
    const lefts = Object.keys(correct);
    const rights = lefts.map((left) => correct[left]);
    return Object.fromEntries(lefts.map((left, index) => [left, rights[(index + 1) % rights.length]]));
  }
  if (Array.isArray(correct)) return (question.options ?? []).filter((option) => !correct.includes(option)).slice(0, 1);
  const words = question.type === "fill_in_blank" ? getFoundationWordBank(question) : question.options ?? [];
  return words.find((option) => option !== correct) ?? "not the answer";
}

describe("the practice result (V9)", () => {
  // A daily challenge with its third question missed, then right when it comes back.
  function dailyWithAMiss() {
    let profile = createEmptyLearnerProfile();
    let state: FoundationAssessmentState | null = createFoundationAssessment(profile, "daily_challenge");
    const planned = state.totalQuestions;
    let last: FoundationAssessmentState = state;
    while (state) {
      const question = state.currentQuestion;
      const right = state.questionNumber !== 3;
      const result = submitFoundationAssessmentAnswer({ profile, state, selectedAnswer: right ? (question.correctAnswer as Answer) : wrongAnswerFor(question), responseTimeMs: 3000 });
      profile = result.nextProfile;
      last = result.stateWithFeedback;
      state = advanceFoundationAssessment(profile, result.stateWithFeedback);
    }
    return { planned, last, profile };
  }

  it("counts first tries out of the total the counter showed", async () => {
    const { planned, last, profile } = dailyWithAMiss();
    // The miss was asked again and answered right.
    expect(last.answerHistory).toHaveLength(planned + 1);
    expect(last.answerHistory[last.answerHistory.length - 1].isCorrect).toBe(true);
    expect(getSessionProgress(last).total).toBe(planned);

    const summary = summarizeFoundationSession(last, profile);
    expect(summary.answered).toBe(planned);
    expect(summary.correct).toBe(planned - 1);

    await render(<PracticeComplete assessment={last} learnerProfile={profile} onContinue={jest.fn()} playSounds={false} />);
    expect(screen.getByTestId("result-correct").props.accessibilityLabel).toBe(`CORRECT ${planned - 1} of ${planned}`);
    expect(screen.getByText(`/${planned}`)).toBeTruthy();
    expect(screen.queryByText(`/${planned + 1}`)).toBeNull();
  });
});

describe("the out-of-hearts sheet's sound (V10)", () => {
  beforeEach(() => {
    jest.mocked(playGameSound).mockClear();
  });

  it.each(["free", "shop"] as const)("plays the sad sheet sound once as the %s sheet opens", async (variant) => {
    const props = { maxHearts: 5, mascotVariant: "hijabi", variant, onRefill: jest.fn(), onShop: jest.fn(), onEndLesson: jest.fn() };
    const sheet = await render(<RefillSheet visible={false} {...props} />);
    expect(sounds()).toEqual([]);
    await sheet.rerender(<RefillSheet visible {...props} />);
    expect(sounds()).toEqual(["wrong"]);
    // Not again while it stays open.
    await sheet.rerender(<RefillSheet visible {...props} accent="#FF8A1F" />);
    expect(sounds()).toEqual(["wrong"]);
    // Again the next time it opens.
    await sheet.rerender(<RefillSheet visible={false} {...props} />);
    await sheet.rerender(<RefillSheet visible {...props} />);
    expect(sounds()).toEqual(["wrong", "wrong"]);
  });

  it.each([
    ["free", false, "Here is one free refill."],
    ["shop", true, "Full hearts again tomorrow!"]
  ] as const)("in a lesson, GOT IT on the last heart stays quiet and the %s sheet makes the one sound", async (_variant, refillUsed, line) => {
    const user = makeUser({ hearts: TODAY_HEARTS(1), reviewHeartRestoreUsed: refillUsed });
    seedUser(user);
    const node = learningApi.getPathNodes(user).find((item) => item.topicId === "foundation" && item.status === "current")!;
    const session = await learningApi.getLessonSession(node.firstLessonId, user);
    expect(session.lesson.practiceActivities?.find(isPlayablePractice)).toBeUndefined();
    const first = session.lesson.challenges[0];

    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    await press(`path-node-${node.id}`);
    await press("node-card-start");
    await press("learn-continue");
    await press(`choice-${first.choices.find((choice) => choice.id !== first.correctChoiceId)!.id}`);
    await press("exercise-check");
    expect(sounds()).toContain("wrong");

    jest.mocked(playGameSound).mockClear();
    await press("feedback-continue");
    expect(await screen.findByText(line)).toBeTruthy();
    expect(screen.getByText("Out of hearts!")).toBeTruthy();
    expect(sounds()).toEqual(["wrong"]);
  });
});

describe("path titles keep a hyphen with its word (V5)", () => {
  const view = (index: number, status: LearningNodeView["status"], title: string): LearningNodeView => ({
    ...FOUNDATION.nodes[index],
    title,
    status,
    firstLessonId: FOUNDATION.nodes[index].lessonIds[0]
  });
  const units: PathUnit[] = [
    {
      id: "unit-span",
      number: 3,
      title: "Surah As-Saffat to Al-Ahqaf",
      done: 0,
      total: 1,
      items: [{ kind: "node", node: view(0, "current", "Surah Al-Masad"), lessonNumber: 1 }]
    }
  ];

  it("joins each hyphen to the next word in the banner and the node card, so a lone Al- never ends a line", async () => {
    await render(
      <LearnPath
        accent={FOUNDATION.accentColor}
        topicId="foundation"
        mascotVariant="hijabi"
        units={units}
        xpForNode={() => 10}
        onStartNode={jest.fn()}
        onClaimChest={jest.fn()}
        onTestOut={jest.fn()}
      />
    );
    expect(screen.getByTestId("unit-banner-unit-span")).toHaveTextContent("Surah As-⁠Saffat to Al-⁠Ahqaf", { exact: false });
    await press(`path-node-${FOUNDATION.nodes[0].id}`);
    expect(screen.getByTestId("node-card")).toHaveTextContent("Surah Al-⁠Masad", { exact: false });
  });
});
