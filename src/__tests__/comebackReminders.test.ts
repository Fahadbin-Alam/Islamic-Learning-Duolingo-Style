jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

import { COMEBACK_DAYS, calendarDaysBetween, comebackMessage, latestStepForDays, messageVariant, type ComebackStep } from "../services/comebackReminders";
import { makeUser } from "./testUtils";

const scheduled: Array<{ identifier: string; content: { title: string; body: string }; trigger: { date: Date } }> = [];

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

// eslint-disable-next-line @typescript-eslint/no-require-imports
const native = require("../services/islamicNotifications.native") as typeof import("../services/islamicNotifications.native");

const at = (value: string) => new Date(value).getTime();
const STEPS: ComebackStep[] = ["resume", "streak", "day2", "day3", "day5", "day7", "day14", "day30"];
const ALL_ON = { dailyInactivity: true, weeklyInactivity: true, streakReminders: true, islamicReminders: true };

describe("come-back reminder ladder", () => {
  it("plans a nudge later the same day, then one evening reminder per ladder day", () => {
    const slots = native.getComebackSlots(at("2026-10-22T09:00:00"), at("2026-10-22T09:05:00"), ALL_ON);

    expect(slots.map((slot) => slot.step)).toEqual(STEPS);
    expect(slots[0].at.getHours()).toBe(15);
    slots.slice(1).forEach((slot, index) => {
      expect(slot.at.getHours()).toBe(19);
      expect(calendarDaysBetween(at("2026-10-22T09:00:00"), slot.at.getTime())).toBe(COMEBACK_DAYS[index]);
    });
  });

  it("never nudges during quiet hours or after the lesson's own day", () => {
    const lateLesson = native.getComebackSlots(at("2026-10-22T20:00:00"), at("2026-10-22T20:01:00"), ALL_ON);
    expect(lateLesson.map((slot) => slot.step)).not.toContain("resume");
    lateLesson.forEach((slot) => expect(slot.at.getHours()).toBeGreaterThanOrEqual(8));
  });

  it("only plans what is still ahead", () => {
    const slots = native.getComebackSlots(at("2026-10-22T09:00:00"), at("2026-10-27T12:00:00"), ALL_ON);
    expect(slots.map((slot) => slot.step)).toEqual(["day5", "day7", "day14", "day30"]);
  });

  it("stops after the day-30 goodbye", () => {
    expect(native.getComebackSlots(at("2026-09-01T09:00:00"), at("2026-10-22T12:00:00"), ALL_ON)).toEqual([]);
  });

  it("follows the two settings toggles", () => {
    const noStreak = native.getComebackSlots(at("2026-10-22T09:00:00"), at("2026-10-22T09:05:00"), { ...ALL_ON, streakReminders: false });
    expect(noStreak.map((slot) => slot.step)).toEqual(STEPS.filter((step) => step !== "streak"));

    const noComeback = native.getComebackSlots(at("2026-10-22T09:00:00"), at("2026-10-22T09:05:00"), { ...ALL_ON, islamicReminders: false });
    expect(noComeback.map((slot) => slot.step)).toEqual(["streak"]);
  });

  it("schedules them on the phone in the learner's language, replacing old ones", async () => {
    scheduled.length = 0;
    jest.useFakeTimers({ now: at("2026-10-22T09:05:00"), doNotFake: ["nextTick", "setImmediate", "queueMicrotask"] });
    native.scheduleIslamicReminderChecks(makeUser({ lastLearningAt: "2026-10-22T09:00:00", reminderPreferences: ALL_ON }), "bn");
    native.scheduleIslamicReminderChecks(makeUser({ lastLearningAt: "2026-10-22T09:00:00", reminderPreferences: ALL_ON }), "bn");
    await jest.runAllTimersAsync();
    jest.useRealTimers();

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Notifications = require("expo-notifications");
    expect(Notifications.cancelScheduledNotificationAsync).toHaveBeenCalledWith("sira-streak-0");
    expect(new Set(scheduled.map((request) => request.identifier)).size).toBe(STEPS.length);
    expect(scheduled.find((request) => request.identifier === "sira-comeback-7")?.content.title).toBe(
      comebackMessage("bn", "day7", messageVariant(at("2026-10-22T09:00:00"))).title
    );
  });

  it("has every step written in every app language, short enough for a lock screen", () => {
    (["en", "ar", "bn", "ur"] as const).forEach((language) => {
      STEPS.forEach((step) => [0, 1].forEach((variant) => {
        const message = comebackMessage(language, step, variant);
        expect(message.title.length).toBeGreaterThan(5);
        expect(message.title.length).toBeLessThanOrEqual(60);
        expect(message.body.length).toBeLessThanOrEqual(110);
        if (language !== "en") {
          expect(message.title).not.toBe(comebackMessage("en", step, variant).title);
        }
      }));
    });
  });

  it("keeps the old app name out of the messages", () => {
    (["en", "ar", "bn", "ur"] as const).forEach((language) =>
      STEPS.forEach((step) => [0, 1].forEach((variant) =>
        expect(JSON.stringify(comebackMessage(language, step, variant))).not.toMatch(/sira|سيرة/i)
      ))
    );
  });

  it("gives every step a second message with an Islamic touch, alternating between absences", () => {
    STEPS.forEach((step) => expect(comebackMessage("en", step, 1).title).not.toBe(comebackMessage("en", step, 0).title));
    expect(messageVariant(at("2026-10-22T09:00:00"))).not.toBe(messageVariant(at("2026-10-23T09:00:00")));
  });

  it("catches up to the latest step for web", () => {
    expect(latestStepForDays(0)).toBeUndefined();
    expect(latestStepForDays(1)).toBe("streak");
    expect(latestStepForDays(4)).toBe("day3");
    expect(latestStepForDays(10)).toBe("day7");
    expect(latestStepForDays(90)).toBe("day30");
  });
});

describe("come-back reminders in the browser", () => {
  const shown: string[] = [];

  beforeAll(() => {
    class FakeNotification {
      static permission = "granted";
      constructor(title: string) {
        shown.push(title);
      }
    }
    (global as unknown as { Notification: unknown }).Notification = FakeNotification;
  });

  afterAll(() => {
    delete (global as unknown as { Notification?: unknown }).Notification;
    jest.useRealTimers();
  });

  it("shows each step once, then goes quiet after the goodbye", async () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const web = require("../services/islamicNotifications.ts") as typeof import("../services/islamicNotifications");
    const user = makeUser({ lastLearningAt: "2026-10-01T09:00:00", reminderPreferences: ALL_ON });
    const openOn = async (date: string) => {
      jest.useFakeTimers({ now: at(date), doNotFake: ["nextTick", "setImmediate", "queueMicrotask"] });
      return web.maybeSendIslamicReminder(user, "en");
    };

    expect(await openOn("2026-10-08T12:00:00")).toBe(true);
    expect(await openOn("2026-10-09T12:00:00")).toBe(false);
    expect(await openOn("2026-11-02T12:00:00")).toBe(true);
    expect(await openOn("2026-11-03T12:00:00")).toBe(false);
    const variant = messageVariant(at("2026-10-01T09:00:00"));
    expect(shown).toEqual([comebackMessage("en", "day7", variant).title, comebackMessage("en", "day30", variant).title]);
  });
});
