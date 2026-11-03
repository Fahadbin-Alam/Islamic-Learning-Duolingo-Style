jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

import { challengeLevel, mixAgeFor } from "../data/challengeLevel";
import { snapshotFromLinkedKid } from "../services/familyCode";
import { isKidsMode, isKidsTopic, kidsLearner, readKidsModeChoice, saveKidsModeChoice } from "../services/kidsMode";

describe("Kids mode", () => {
  it("is on by itself under 13 or for a Kid account, and a grown-up's choice wins", () => {
    expect(isKidsMode(undefined, "6-9", undefined)).toBe(true);
    expect(isKidsMode(undefined, "10-12", undefined)).toBe(true);
    expect(isKidsMode(undefined, "18+", "child")).toBe(true);
    expect(isKidsMode(undefined, "13-17", undefined)).toBe(false);
    expect(isKidsMode(undefined, undefined, "parent")).toBe(false);
    expect(isKidsMode("off", "6-9", "child")).toBe(false);
    expect(isKidsMode("on", "18+", "parent")).toBe(true);
  });

  it("asks lessons at the easiest level whatever was picked before", () => {
    const user = { streakDays: 40, completedLessonIds: Array.from({ length: 300 }, (_, i) => `l${i}`), difficulty: "really_hard" as const, challengeBoost: 3 };
    expect(challengeLevel(user, "18+")).toBe(5);
    const kid = kidsLearner(user);
    expect(challengeLevel(kid, "6-9")).toBe(0);
    expect(mixAgeFor(kid, "18+")).toBe("6-9");
    // The saved profile is not changed.
    expect(user.difficulty).toBe("really_hard");
  });

  it("hides the marriage topic only", () => {
    expect(isKidsTopic("marriage")).toBe(false);
    expect(isKidsTopic("prophets")).toBe(true);
    expect(isKidsTopic("foundation")).toBe(true);
  });

  it("remembers the choice", () => {
    expect(readKidsModeChoice()).toBeUndefined();
    saveKidsModeChoice("off");
    expect(readKidsModeChoice()).toBe("off");
  });
});

describe("Live kid report", () => {
  it("turns a linked child's numbers into the Family report", () => {
    const snapshot = snapshotFromLinkedKid(
      { id: 12, streakDays: 4, lastStreakDate: "2026-11-01", totalXp: 300, xpByDay: { "2026-11-02": 20, "2026-10-30": 10, "2026-10-01": 99 }, lessonsDone: 9 },
      "2026-11-02",
      14,
      { foundation: 3 }
    );
    expect(snapshot.id).toBe("live-12");
    expect(snapshot.lessonsDone).toBe(9);
    expect(snapshot.stars).toBe(14);
    expect(snapshot.weekXp).toEqual([0, 0, 0, 10, 0, 0, 20]);
    expect(snapshot.lastLearnedDate).toBe("2026-11-01");
    expect(snapshot.topicsDone).toEqual({ foundation: 3 });
  });
});
