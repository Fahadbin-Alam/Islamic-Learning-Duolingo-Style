import { addXp, completeLesson, completeLessonCluster, getXpToday, learningApi, localDateKey } from "../api/islamicLearningApi";
import { LESSONS_BY_ID, findNodeByLessonId } from "../data/course";
import { makeUser } from "./testUtils";

const lesson = LESSONS_BY_ID["lesson-foundation-niyyah"];
const secondLesson = LESSONS_BY_ID["lesson-foundation-guidance"];

describe("completeLesson", () => {
  it("awards the lesson's XP and marks the lesson and its node complete", () => {
    const user = makeUser({ totalXp: 0 });
    const next = completeLesson(user, lesson);

    expect(next.totalXp).toBe(lesson.xpReward);
    expect(next.completedLessonIds).toEqual([lesson.id]);
    expect(next.completedNodeIds).toEqual([findNodeByLessonId(lesson.id)?.id]);
  });

  it("does not award XP twice for replaying a finished lesson", () => {
    const once = completeLesson(makeUser(), lesson);
    const twice = completeLesson(once, lesson);

    expect(twice.totalXp).toBe(once.totalXp);
    expect(twice.completedLessonIds).toEqual([lesson.id]);
    expect(twice.completedNodeIds).toHaveLength(1);
  });

  it("does not mutate the user it was given", () => {
    const user = makeUser();
    completeLesson(user, lesson);

    expect(user.totalXp).toBe(0);
    expect(user.completedLessonIds).toEqual([]);
  });
});

describe("streak", () => {
  it("starts a streak once the daily XP goal is reached", () => {
    const user = makeUser({ streakDays: 0, totalXp: 0, dailyGoalXp: lesson.xpReward });

    expect(completeLesson(user, lesson).streakDays).toBe(1);
  });

  it("leaves the streak alone while under the daily goal", () => {
    const user = makeUser({ streakDays: 0, totalXp: 0, dailyGoalXp: lesson.xpReward + 1 });

    expect(completeLesson(user, lesson).streakDays).toBe(0);
  });

  it("never shrinks an existing streak", () => {
    const user = makeUser({ streakDays: 12, totalXp: 500, dailyGoalXp: 40 });

    expect(completeLesson(user, lesson).streakDays).toBe(12);
  });
});

describe("completeLessonCluster", () => {
  it("sums XP only for lessons that were not already complete", () => {
    const user = completeLesson(makeUser(), lesson);
    const next = completeLessonCluster(user, [lesson, secondLesson]);

    expect(next.totalXp).toBe(lesson.xpReward + secondLesson.xpReward);
    expect(next.completedLessonIds).toEqual([lesson.id, secondLesson.id]);
    expect(new Set(next.completedNodeIds)).toEqual(
      new Set([findNodeByLessonId(lesson.id)?.id, findNodeByLessonId(secondLesson.id)?.id])
    );
  });

  it("starts a streak when the cluster crosses the daily goal", () => {
    const user = makeUser({ streakDays: 0, dailyGoalXp: lesson.xpReward + secondLesson.xpReward });

    expect(completeLessonCluster(user, [lesson, secondLesson]).streakDays).toBe(1);
  });
});

describe("XP earned today", () => {
  const today = localDateKey();

  it("counts only XP earned today, not the lifetime total", () => {
    const user = makeUser({ totalXp: 900, dailyXp: { date: today, xp: 12 } });

    expect(getXpToday(user)).toBe(12);
  });

  it("starts each day at zero", () => {
    const user = makeUser({ totalXp: 900, dailyXp: { date: "2020-01-01", xp: 55 } });

    expect(getXpToday(user)).toBe(0);
    expect(getXpToday(addXp(user, 8))).toBe(8);
    expect(addXp(user, 8).totalXp).toBe(908);
  });

  it("adds a finished lesson to today's XP", () => {
    const user = makeUser({ totalXp: 900, dailyXp: { date: today, xp: 10 } });

    expect(getXpToday(completeLesson(user, lesson))).toBe(10 + lesson.xpReward);
  });

  it("does not let lifetime XP start a streak on its own", () => {
    const user = makeUser({ streakDays: 0, totalXp: 900, dailyGoalXp: lesson.xpReward + 1 });

    expect(completeLesson(user, lesson).streakDays).toBe(0);
  });
});

describe("getXpSummaries", () => {
  const today = localDateKey();

  it("reports today's XP and whether it met the daily goal", async () => {
    const [under] = await learningApi.getXpSummaries(makeUser({ totalXp: 500, dailyXp: { date: today, xp: 10 }, dailyGoalXp: 40 }));
    const [met] = await learningApi.getXpSummaries(makeUser({ totalXp: 500, dailyXp: { date: today, xp: 40 }, dailyGoalXp: 40 }));

    expect(under.streakExtended).toBe(false);
    expect(under.gainedXp).toBe(10);
    expect(met.streakExtended).toBe(true);
    expect(met.gainedXp).toBe(40);
  });
});
