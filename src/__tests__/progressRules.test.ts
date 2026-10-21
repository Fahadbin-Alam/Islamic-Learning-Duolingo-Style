jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

import { findNextPlayableNode, getAssessmentXp, learningApi } from "../api/islamicLearningApi";
import { LANGUAGE_OPTIONS, normalizeLanguage } from "../i18n";
import { rankWeeklyRace, type CrewMember } from "../services/backendSync";
import { evaluateFoundationAnswer, normalizeText } from "../services/foundationAssessment";
import type { FoundationQuestion } from "../types";
import { makeUser } from "./testUtils";

describe("next lesson on the home screen", () => {
  it("stays in the first unit until it is finished, then moves to the next one", () => {
    const afterFirst = makeUser({ completedLessonIds: ["lesson-foundation-niyyah"], completedNodeIds: ["foundation-niyyah"] });
    expect(findNextPlayableNode(learningApi.getPathNodes(afterFirst).filter((node) => node.topicId === "foundation"))?.id).toBe("foundation-character");

    // Both greetings done: nothing is left in that unit, so the next circle is the first of Daily words.
    const user = makeUser({
      completedLessonIds: ["lesson-foundation-niyyah", "lesson-foundation-character"],
      completedNodeIds: ["foundation-niyyah", "foundation-character"]
    });
    const foundation = learningApi.getPathNodes(user).filter((node) => node.topicId === "foundation");
    const greetings = foundation.filter((node) => node.branchId === "foundation-greetings");

    expect(findNextPlayableNode(greetings)).toBeUndefined();
    expect(findNextPlayableNode(foundation)?.id).toBe("foundation-guidance");
  });

  it("starts brand new learners on the first circle", () => {
    const foundation = learningApi.getPathNodes(makeUser()).filter((node) => node.topicId === "foundation");

    expect(findNextPlayableNode(foundation)?.id).toBe("foundation-niyyah");
  });
});

describe("practice XP", () => {
  it("pays nothing for the placement test, so retaking it cannot farm XP", () => {
    expect(getAssessmentXp("placement", true)).toBe(0);
    expect(getAssessmentXp("placement", false)).toBe(0);
  });

  it("pays a little for right answers in review and the daily challenge, and nothing for wrong ones", () => {
    expect(getAssessmentXp("review", true)).toBe(2);
    expect(getAssessmentXp("daily_challenge", true)).toBe(2);
    expect(getAssessmentXp("review", false)).toBe(0);
  });
});

describe("typed answers", () => {
  const fillIn = {
    id: "q",
    type: "fill_in_blank",
    acceptedAnswers: ["Allah", "As-salamu alaykum"],
    correctAnswer: "Allah"
  } as unknown as FoundationQuestion;

  it("ignores punctuation, case and hyphen or apostrophe style", () => {
    expect(evaluateFoundationAnswer(fillIn, "Allah.")).toBe(true);
    expect(evaluateFoundationAnswer(fillIn, "  ALLAH! ")).toBe(true);
    expect(evaluateFoundationAnswer(fillIn, "as salamu alaykum")).toBe(true);
    expect(normalizeText("Qur’an")).toBe(normalizeText("Qur'an"));
  });

  it("still marks a wrong word wrong", () => {
    expect(evaluateFoundationAnswer(fillIn, "Prophet")).toBe(false);
  });
});

describe("multi-select answers", () => {
  const multi = { id: "m", type: "multi_select", correctAnswer: ["Shahadah", "Salah", "Zakat"] } as unknown as FoundationQuestion;
  const order = { id: "o", type: "correct_order", correctAnswer: ["Wudu", "Takbir", "Ruku"] } as unknown as FoundationQuestion;

  it("accepts the right picks in any order", () => {
    expect(evaluateFoundationAnswer(multi, ["Zakat", "Shahadah", "Salah"])).toBe(true);
    expect(evaluateFoundationAnswer(multi, ["Zakat", "Shahadah"])).toBe(false);
  });

  it("still requires the exact order for put-in-order questions", () => {
    expect(evaluateFoundationAnswer(order, ["Wudu", "Takbir", "Ruku"])).toBe(true);
    expect(evaluateFoundationAnswer(order, ["Takbir", "Wudu", "Ruku"])).toBe(false);
  });
});

describe("launch language", () => {
  it("shows English even for learners who picked another language before", () => {
    expect(normalizeLanguage("ar")).toBe("en");
    expect(normalizeLanguage(undefined)).toBe("en");
  });

  it("keeps the other languages ready for when the picker comes back", () => {
    expect(LANGUAGE_OPTIONS.length).toBeGreaterThan(1);
    expect(normalizeLanguage("ar", true)).toBe("ar");
  });
});

describe("weekly race", () => {
  const member = (overrides: Partial<CrewMember>): CrewMember => ({
    id: 1,
    name: "Learner",
    avatarInitials: "L",
    relation: "friend",
    totalXp: 0,
    weeklyXp: 0,
    streakDays: 0,
    lastLearningAt: null,
    ...overrides
  });

  it("ranks by XP earned this week, not lifetime XP", () => {
    const me = member({ id: 1, relation: "you", name: "Me", weeklyXp: 30, totalXp: 50 });
    const veteran = member({ id: 2, name: "Veteran", weeklyXp: 10, totalXp: 5000 });
    const keen = member({ id: 3, name: "Keen", weeklyXp: 80, totalXp: 120 });

    expect(rankWeeklyRace(me, [veteran, keen]).map((entry) => entry.name)).toEqual(["Keen", "Me", "Veteran"]);
  });

  it("puts the learner first on a tie", () => {
    const me = member({ relation: "you", name: "Me", weeklyXp: 20 });
    const friend = member({ id: 2, name: "Friend", weeklyXp: 20, totalXp: 900 });

    expect(rankWeeklyRace(me, [friend])[0].name).toBe("Me");
  });
});
