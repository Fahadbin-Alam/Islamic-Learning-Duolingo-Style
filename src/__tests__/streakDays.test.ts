import {
  addXp,
  completeLesson,
  didExtendStreak,
  keepStreak,
  localDateKey,
  prepareUserForToday,
  refreshStreak
} from "../api/islamicLearningApi";
import { LESSONS_BY_ID, STARTER_USER } from "../data/course";
import { makeUser } from "./testUtils";

const day = (date: string) => new Date(`${date}T12:00:00`);

describe("streak days", () => {
  it("starts new learners at zero, not one", () => {
    expect(STARTER_USER.streakDays).toBe(0);
  });

  it("grows by one on each consecutive day a lesson is finished", () => {
    let user = makeUser({ streakDays: 0 });

    user = keepStreak(user, day("2026-10-16"));
    user = keepStreak(user, day("2026-10-17"));
    user = keepStreak(user, day("2026-10-18"));

    expect(user.streakDays).toBe(3);
    expect(user.lastStreakDate).toBe("2026-10-18");
  });

  it("counts a day once however many lessons are finished", () => {
    const lesson = LESSONS_BY_ID["lesson-foundation-niyyah"];
    let user = makeUser({ streakDays: 0 });

    user = completeLesson(user, lesson, 3, day("2026-10-18"));
    user = completeLesson(user, LESSONS_BY_ID["lesson-foundation-character"], 3, day("2026-10-18"));

    expect(user.streakDays).toBe(1);
  });

  it("starts with the first lesson of the day, long before the daily XP goal", () => {
    const lesson = LESSONS_BY_ID["lesson-foundation-niyyah"];
    const user = completeLesson(makeUser({ streakDays: 4, lastStreakDate: "2026-10-17", dailyGoalXp: 40 }), lesson, 2, day("2026-10-18"));

    expect(lesson.xpReward).toBeLessThan(40);
    expect(user.streakDays).toBe(5);
    expect(user.lastStreakDate).toBe("2026-10-18");
  });

  it("is kept by a replayed lesson that pays no XP, but not by XP alone", () => {
    const lesson = LESSONS_BY_ID["lesson-foundation-niyyah"];
    const done = makeUser({ streakDays: 2, lastStreakDate: "2026-10-17", completedLessonIds: [lesson.id], completedNodeIds: ["foundation-niyyah"] });
    const replay = completeLesson(done, lesson, 3, day("2026-10-18"));

    expect(replay.totalXp).toBe(done.totalXp);
    expect(replay.streakDays).toBe(3);
    // Practice XP fills the daily goal; only a finished lesson moves the streak.
    expect(addXp(done, 40, day("2026-10-18")).streakDays).toBe(2);
    expect(addXp(done, 40, day("2026-10-18")).lastStreakDate).toBe("2026-10-17");
  });

  it("starts over at one after a missed day", () => {
    const user = makeUser({ streakDays: 9, lastStreakDate: "2026-10-15" });

    expect(keepStreak(user, day("2026-10-18")).streakDays).toBe(1);
  });

  it("shows a lapsed streak as zero when the app opens", () => {
    const lapsed = makeUser({ streakDays: 9, lastStreakDate: "2026-10-15" });
    const alive = makeUser({ streakDays: 9, lastStreakDate: "2026-10-17" });

    expect(refreshStreak(lapsed, day("2026-10-18")).streakDays).toBe(0);
    // Yesterday's streak is still alive today; the learner has until midnight to keep it.
    expect(refreshStreak(alive, day("2026-10-18")).streakDays).toBe(9);
    expect(prepareUserForToday(lapsed, day("2026-10-18")).streakDays).toBe(0);
  });

  it("rolls over across month ends", () => {
    const user = makeUser({ streakDays: 2, lastStreakDate: "2026-10-31" });

    expect(keepStreak(user, day("2026-11-01")).streakDays).toBe(3);
  });

  it("reports when a lesson extended the streak so the celebration only says so then", () => {
    const lesson = LESSONS_BY_ID["lesson-foundation-niyyah"];
    const before = makeUser({ streakDays: 0 });
    const after = completeLesson(before, lesson);
    const replay = completeLesson(after, lesson);

    expect(didExtendStreak(before, after)).toBe(true);
    expect(didExtendStreak(after, replay)).toBe(false);
  });
});

describe("localDateKey", () => {
  it("uses the device's calendar day, not UTC", () => {
    expect(localDateKey(new Date(2026, 0, 5, 23, 30))).toBe("2026-01-05");
    expect(localDateKey(new Date(2026, 0, 6, 0, 15))).toBe("2026-01-06");
  });
});
