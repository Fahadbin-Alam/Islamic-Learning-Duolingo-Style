import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { learningApi, lessonAtLevel } from "../api/islamicLearningApi";
import { autoChallengeLevel, challengeLevel, mixAgeFor } from "../data/challengeLevel";
import { COURSE, LESSONS_BY_ID, STARTER_USER } from "../data/course";
import { ALL_HARD_QUESTIONS, HARD_QUESTIONS } from "../data/hardQuestions";
import { questionSource } from "../services/questionSource";
import { SettingsSheet } from "../ui/screens";
import type { Lesson, TopicId, UserProfile } from "../types";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

// Fahad: lessons should get harder and harder as a learner keeps their streak, most of all for 13 and over, and
// learners can pick the difficulty themselves, up to "really hard".

const user = (streakDays: number, lessonsDone: number, difficulty?: UserProfile["difficulty"]) => ({
  streakDays,
  completedLessonIds: Array.from({ length: lessonsDone }, (_, index) => `done-${index}`),
  difficulty
});

const topicLessons = (topicId: TopicId) =>
  COURSE.sections
    .find((section) => section.topicId === topicId)!
    .nodes.flatMap((node) => node.lessonIds)
    .map((id) => LESSONS_BY_ID[id])
    .filter((lesson): lesson is Lesson => Boolean(lesson));

describe("the challenge level", () => {
  it("climbs with the streak and with the lessons done", () => {
    expect(autoChallengeLevel(user(0, 0))).toBe(0);
    expect(autoChallengeLevel(user(3, 0))).toBe(1);
    expect(autoChallengeLevel(user(7, 10))).toBe(2);
    expect(autoChallengeLevel(user(14, 40))).toBe(3);
    expect(autoChallengeLevel(user(30, 250))).toBe(4);
    // Each longer streak is never easier.
    const climb = [0, 3, 7, 14, 30, 60].map((streak) => autoChallengeLevel(user(streak, 40)));
    expect(climb).toEqual([...climb].sort());
  });

  it("goes all the way for 13 and over, gently for young learners", () => {
    const long = user(60, 300);
    expect(autoChallengeLevel(long, "18+")).toBe(4);
    expect(autoChallengeLevel(long, "13-17")).toBe(4);
    expect(autoChallengeLevel(long, "10-12")).toBe(2);
    expect(autoChallengeLevel(long, "6-9")).toBe(1);
    // Not saying an age gets the whole climb.
    expect(autoChallengeLevel(long, undefined)).toBe(4);
  });

  it("follows the learner's own pick", () => {
    expect(challengeLevel(user(60, 300, "easy"), "18+")).toBe(0);
    expect(challengeLevel(user(0, 0, "hard"), "18+")).toBe(3);
    expect(challengeLevel(user(60, 300, "hard"), "6-9")).toBe(4);
    expect(challengeLevel(user(0, 0, "really_hard"), "6-9")).toBe(5);
    expect(challengeLevel(user(7, 10, "auto"), "18+")).toBe(2);
    expect(mixAgeFor({ difficulty: "easy" }, "18+")).toBe("6-9");
    expect(mixAgeFor({ difficulty: "really_hard" }, "6-9")).toBeNull();
    expect(mixAgeFor({}, "10-12")).toBe("10-12");
  });
});

describe("the harder questions", () => {
  it("each have a cited source, four distinct choices and a Why line", () => {
    for (const question of ALL_HARD_QUESTIONS) {
      expect(question.source?.reference).toBeTruthy();
      expect(question.source?.url).toMatch(/^https:\/\/(quran\.com|sunnah\.com)\//);
      expect(question.prompt).toContain("____");
      expect(new Set(question.choices.map((choice) => choice.label)).size).toBe(4);
      expect(question.choices.some((choice) => choice.id === question.correctChoiceId)).toBe(true);
      expect(question.explanation.trim()).toBeTruthy();
    }
    expect(new Set(ALL_HARD_QUESTIONS.map((question) => question.id)).size).toBe(ALL_HARD_QUESTIONS.length);
  });

  it("cover the topics with the fewest questions", () => {
    for (const topic of ["prayer", "aqidah", "fasting", "zakat", "hajj", "hadith"] as TopicId[]) {
      expect((HARD_QUESTIONS[topic] ?? []).length).toBeGreaterThanOrEqual(7);
    }
  });

  it("do not keep the right answer in one place", () => {
    const places = ALL_HARD_QUESTIONS.map((question) => question.choices.findIndex((choice) => choice.id === question.correctChoiceId));
    for (const slot of [0, 1, 2, 3]) expect(places.filter((place) => place === slot).length / places.length).toBeLessThan(0.4);
  });
});

describe("a lesson at a level", () => {
  const prayer = topicLessons("prayer");
  const lesson = prayer[12];
  const done = { completedLessonIds: prayer.slice(0, 12).map((item) => item.id) };

  it("is unchanged at level 0 and for a new learner's first lesson", () => {
    expect(lessonAtLevel(lesson, done, 0)).toBe(lesson);
  });

  it("asks more at each level, the new questions last", () => {
    const counts = ([0, 1, 2, 3, 4, 5] as const).map((level) => lessonAtLevel(lesson, done, level, "2026-10-31").challenges.length);
    expect(counts).toEqual([...counts].sort((a, b) => a - b));
    expect(counts[5]).toBeGreaterThan(counts[0]);
    const hardest = lessonAtLevel(lesson, done, 5, "2026-10-31");
    const own = new Set(lesson.challenges.map((challenge) => challenge.id));
    const added = hardest.challenges.filter((challenge) => !own.has(challenge.id));
    expect(added.length).toBeGreaterThan(0);
    // Every added question still has its source.
    for (const challenge of added) expect(questionSource(challenge, hardest)?.reference).toBeTruthy();
  });

  it("swaps true/false for 4-choice questions from level 2", () => {
    const withTrueFalse = prayer.find((item, index) => index > 2 && item.challenges.some((challenge) => challenge.type === "true_false") && item.challenges.some((challenge) => challenge.type !== "true_false"));
    expect(withTrueFalse).toBeDefined();
    const before = { completedLessonIds: prayer.filter((item) => item !== withTrueFalse).map((item) => item.id) };
    const hard = lessonAtLevel(withTrueFalse!, before, 3, "2026-10-31");
    expect(hard.challenges.some((challenge) => challenge.type === "true_false")).toBe(false);
    expect(hard.challenges.length).toBeGreaterThan(withTrueFalse!.challenges.length);
  });

  it("brings in the topic's harder questions from level 3, even with nothing done yet", () => {
    const first = prayer[0];
    const nothing = { completedLessonIds: [] };
    const asked = (level: 2 | 3 | 5) => lessonAtLevel(first, nothing, level, "2026-10-31").challenges.filter((challenge) => challenge.id.includes("_hard_"));
    expect(asked(2)).toHaveLength(0);
    expect(asked(3).length).toBeGreaterThanOrEqual(1);
    expect(asked(5).length).toBeGreaterThan(asked(3).length);
  });

  it("never asks two questions with the same prompt", () => {
    for (const item of prayer.slice(0, 30)) {
      const prompts = lessonAtLevel(item, done, 5, "2026-10-31").challenges.map((challenge) => challenge.prompt.trim().toLowerCase());
      expect(new Set(prompts).size).toBe(prompts.length);
    }
  });

  it("leaves the New to Islam path and Ramadan days as they are", () => {
    for (const topic of ["intro", "ramadan"] as TopicId[]) {
      const first = topicLessons(topic)[0];
      expect(lessonAtLevel(first, { completedLessonIds: [] }, 5)).toBe(first);
    }
  });
});

describe("a lesson session", () => {
  it("gets longer as the streak grows", async () => {
    const prayer = topicLessons("prayer");
    const lessonId = prayer[10].id;
    const base = { ...STARTER_USER, completedLessonIds: prayer.slice(0, 10).map((item) => item.id) };
    const fresh = await learningApi.getLessonSession(lessonId, { ...base, streakDays: 0 }, "18+");
    const streak = await learningApi.getLessonSession(lessonId, { ...base, streakDays: 30, completedLessonIds: [...base.completedLessonIds, ...Array.from({ length: 240 }, (_, i) => `x${i}`)] }, "18+");
    const kid = await learningApi.getLessonSession(lessonId, { ...base, streakDays: 30, completedLessonIds: [...base.completedLessonIds, ...Array.from({ length: 240 }, (_, i) => `x${i}`)] }, "6-9");
    expect(streak.lesson.challenges.length).toBeGreaterThan(fresh.lesson.challenges.length);
    expect(kid.lesson.challenges.length).toBeLessThan(streak.lesson.challenges.length);
  });

  it("is hardest on Really hard", async () => {
    const lessonId = topicLessons("fasting")[0].id;
    const easy = await learningApi.getLessonSession(lessonId, { ...STARTER_USER, difficulty: "easy" }, "18+");
    const really = await learningApi.getLessonSession(lessonId, { ...STARTER_USER, difficulty: "really_hard" }, "18+");
    expect(really.lesson.challenges.length).toBeGreaterThan(easy.lesson.challenges.length);
  });
});

describe("Settings", () => {
  const props = {
    visible: true,
    streakReminder: true,
    islamicReminder: true,
    dailyCheckIn: false,
    weeklyCheckIn: false,
    soundEnabled: true,
    softSound: false,
    onSelectRole: jest.fn(),
    onToggleStreak: jest.fn(),
    onToggleIslamic: jest.fn(),
    onToggleDaily: jest.fn(),
    onToggleWeekly: jest.fn(),
    onToggleSound: jest.fn(),
    onToggleSoftSound: jest.fn(),
    onSave: jest.fn(),
    onClose: jest.fn()
  };

  it("lets the learner pick Auto, Easy, Hard or Really hard", async () => {
    const onSelectDifficulty = jest.fn();
    await render(<SettingsSheet {...props} difficulty="auto" onSelectDifficulty={onSelectDifficulty} />);
    expect(screen.getByText("Gets harder as your streak grows.")).toBeTruthy();
    fireEvent.press(screen.getByTestId("settings-difficulty-really-hard"));
    expect(onSelectDifficulty).toHaveBeenCalledWith("really_hard");
  });

  it("says what the picked level does", async () => {
    await render(<SettingsSheet {...props} difficulty="really_hard" onSelectDifficulty={jest.fn()} />);
    expect(screen.getByText("The toughest questions. Good luck!")).toBeTruthy();
    expect(screen.getByTestId("settings-difficulty-really-hard").props.accessibilityState).toMatchObject({ selected: true });
  });
});
