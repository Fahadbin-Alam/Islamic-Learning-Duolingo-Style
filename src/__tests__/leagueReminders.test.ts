jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

const scheduled: Array<{ identifier: string; content: { title: string; data: { kind: string } } }> = [];

jest.mock("expo-notifications", () => ({
  setNotificationHandler: jest.fn(),
  getPermissionsAsync: jest.fn(async () => ({ granted: true, canAskAgain: true })),
  requestPermissionsAsync: jest.fn(async () => ({ granted: true, canAskAgain: true })),
  cancelScheduledNotificationAsync: jest.fn(async () => undefined),
  scheduleNotificationAsync: jest.fn(async (request) => {
    scheduled.push(request);
    return request.identifier;
  }),
  setNotificationChannelAsync: jest.fn(async () => undefined),
  SchedulableTriggerInputTypes: { DATE: "date" },
  AndroidImportance: { DEFAULT: 3 },
  IosAuthorizationStatus: { PROVISIONAL: 3 }
}));

import { planLeagueReminders } from "../services/leagueReminders";
import type { UserProfile } from "../types";
import { makeUser } from "./testUtils";

const at = (value: string) => new Date(value).getTime();
// 2026-11-02 is a Monday.
const WEEK = "2026-11-02";

function learner(tier: number, xp: number, lastLearningAt = "2026-11-02T10:00:00", extra: Partial<UserProfile> = {}): UserProfile {
  return { ...makeUser(), lastLearningAt: new Date(lastLearningAt).toISOString(), league: { tier, weekStart: WEEK, xp }, ...extra } as UserProfile;
}

describe("league reminders", () => {
  it("plans Thursday, Sunday and Monday, at most three a week, at friendly hours", () => {
    const slots = planLeagueReminders(learner(1, 30), "en", at("2026-11-02T11:00:00"));
    expect(slots.map((slot) => slot.step)).toEqual(["midweek", "endsTonight", "result"]);
    expect(slots.map((slot) => [slot.at.getDay(), slot.at.getHours()])).toEqual([[4, 16], [0, 16], [1, 9]]);
    expect(new Set(slots.map((slot) => slot.id)).size).toBe(3);
  });

  it("says how much XP is needed, with real league names", () => {
    const [midweek, ends, result] = planLeagueReminders(learner(1, 30), "en", at("2026-11-02T11:00:00"));
    expect(midweek.title).toContain("rabbit");
    expect(midweek.body).toContain("70 XP more and you move up to the Gold League");
    expect(ends.title).toBe("⏰ The Silver League ends tonight");
    expect(result.title).toBe("🛡️ You stayed in the Silver League");
  });

  it("the turtle passes a learner about to drop, and Monday is kind about it", () => {
    const [midweek, ends, result] = planLeagueReminders(learner(2, 10), "en", at("2026-11-02T11:00:00"));
    expect(midweek.title).toBe("🐢 The turtle just passed you in the Gold League");
    expect(midweek.body).toContain("30 XP keeps you in the Gold League");
    expect(ends.body).toContain("30 XP");
    expect(result.title).toBe("🐪 This week you're in the Silver League");
  });

  it("doesn't nag a learner who is already moving up", () => {
    const slots = planLeagueReminders(learner(0, 80), "en", at("2026-11-02T11:00:00"));
    expect(slots.map((slot) => slot.step)).toEqual(["endsTonight", "result"]);
    expect(slots[0].title).toBe("🎉 You're moving up to the Silver League tonight!");
    expect(slots[1].title).toBe("🏆 You moved up to the Silver League!");
  });

  it("only plans what is still ahead, and skips a day the learner already learned", () => {
    const friday = planLeagueReminders(learner(1, 30, "2026-11-06T09:00:00"), "en", at("2026-11-06T09:30:00"));
    expect(friday.map((slot) => slot.step)).toEqual(["endsTonight", "result"]);
    const sundayMorning = planLeagueReminders(learner(1, 30, "2026-11-08T09:00:00"), "en", at("2026-11-08T09:30:00"));
    expect(sundayMorning.map((slot) => slot.step)).toEqual(["result"]);
  });

  it("stays quiet when nothing is at stake, the learner turned nudges off, or the week is stale", () => {
    expect(planLeagueReminders(learner(6, 200), "en", at("2026-11-02T11:00:00")).map((slot) => slot.step)).toEqual(["result"]);
    expect(planLeagueReminders(learner(1, 30, undefined, {
      reminderPreferences: { dailyInactivity: true, weeklyInactivity: true, islamicReminders: false }
    }), "en", at("2026-11-02T11:00:00"))).toEqual([]);
    expect(planLeagueReminders(learner(1, 30), "en", at("2026-11-10T11:00:00"))).toEqual([]);
  });

  it("leaves a learner away for over a week to the come-back reminders", () => {
    const slots = planLeagueReminders(learner(2, 0, "2026-10-28T10:00:00"), "en", at("2026-11-04T08:00:00"));
    expect(slots).toEqual([]);
  });

  it("speaks the learner's language and digits", () => {
    const [midweek] = planLeagueReminders(learner(1, 30), "bn", at("2026-11-02T11:00:00"));
    expect(midweek.body).toContain("৭০ XP");
    expect(midweek.body).toContain("গোল্ড লিগ");
    for (const language of ["ar", "ur"] as const) {
      planLeagueReminders(learner(1, 30), language, at("2026-11-02T11:00:00")).forEach((slot) => {
        expect(slot.title).not.toMatch(/\{\w+\}/);
        expect(slot.body).not.toMatch(/\{\w+\}/);
      });
    }
  });
});

describe("league reminders on the phone", () => {
  it("are scheduled next to the come-back reminders and cancelled first so they never pile up", async () => {
    jest.useFakeTimers({ now: new Date("2026-11-02T11:00:00"), doNotFake: ["nextTick", "setImmediate", "queueMicrotask"] });
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const native = require("../services/islamicNotifications.native") as typeof import("../services/islamicNotifications.native");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Notifications = require("expo-notifications");
    native.scheduleIslamicReminderChecks(learner(1, 30), "en");
    native.scheduleIslamicReminderChecks(learner(1, 40), "en");
    await jest.runOnlyPendingTimersAsync?.();
    for (let i = 0; i < 20; i += 1) await Promise.resolve();
    await new Promise((resolve) => setImmediate(resolve));
    jest.useRealTimers();

    const league = scheduled.filter((request) => request.content.data.kind === "league");
    expect(league.map((request) => request.identifier)).toEqual(expect.arrayContaining(["sira-league-midweek", "sira-league-ends", "sira-league-result"]));
    expect(Notifications.cancelScheduledNotificationAsync).toHaveBeenCalledWith("sira-league-midweek");
    expect(league[league.length - 3].content.title).toContain("rabbit");
  });
});
