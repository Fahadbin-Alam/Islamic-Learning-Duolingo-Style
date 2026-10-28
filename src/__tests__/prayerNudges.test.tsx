jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { PRAYER_CITIES, findPrayerCity } from "../data/prayerCities";
import { NUDGE_AFTER_PRAYER_MS, loadPrayerNudgePrefs, planPrayerNudges, prayerNudgeMessage, savePrayerNudgePrefs } from "../services/prayerNudgePlan";
import { PRAYERS, defaultAsrMethod, defaultPrayerNudgePrefs, getPrayerTimes, type PrayerNudgePrefs } from "../services/prayerTimes";
import { PrayerSheet, SettingsSheet } from "../ui/screens";
import type { UserProfile } from "../types";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

const dhaka = findPrayerCity("dhaka")!;
const london = findPrayerCity("london")!;
const minutesUtc = (date: Date) => date.getUTCHours() * 60 + date.getUTCMinutes();

function prefs(overrides: Partial<PrayerNudgePrefs> = {}): PrayerNudgePrefs {
  return { ...defaultPrayerNudgePrefs(), enabled: true, cityId: "dhaka", ...overrides };
}

function learner(lastLearningAt: number | undefined, reminders = { streak: true, comeback: true }) {
  return {
    lastLearningAt: lastLearningAt ? new Date(lastLearningAt).toISOString() : undefined,
    reminderPreferences: { dailyInactivity: false, weeklyInactivity: false, streakReminders: reminders.streak, islamicReminders: reminders.comeback }
  } as unknown as UserProfile;
}

describe("prayer times", () => {
  it("works out the five prayers in order, close to a Dhaka timetable", () => {
    const times = getPrayerTimes(dhaka, new Date(2026, 9, 28, 12));
    const order = PRAYERS.map((prayer) => times[prayer].getTime());
    expect([...order].sort((a, b) => a - b)).toEqual(order);
    // Dhaka is UTC+6: Dhuhr a little before noon, Maghrib around 5:15 pm in late October.
    expect(minutesUtc(times.dhuhr)).toBeGreaterThan(5 * 60 + 30);
    expect(minutesUtc(times.dhuhr)).toBeLessThan(6 * 60 + 10);
    expect(minutesUtc(times.maghrib)).toBeGreaterThan(10 * 60 + 50);
    expect(minutesUtc(times.maghrib)).toBeLessThan(11 * 60 + 40);
  });

  it("puts Hanafi Asr later than the standard one, and starts South Asia on Hanafi", () => {
    const day = new Date(2026, 9, 28, 12);
    expect(getPrayerTimes(dhaka, day, "hanafi").asr.getTime()).toBeGreaterThan(getPrayerTimes(dhaka, day, "standard").asr.getTime());
    expect(defaultAsrMethod(dhaka)).toBe("hanafi");
    expect(defaultAsrMethod(london)).toBe("standard");
  });

  it("gives every city a working time, even far north in summer", () => {
    for (const city of PRAYER_CITIES) {
      for (const day of [new Date(2026, 5, 21, 12), new Date(2026, 11, 21, 12)]) {
        const times = getPrayerTimes(city, day);
        for (const prayer of PRAYERS) {
          expect(Number.isFinite(times[prayer].getTime())).toBe(true);
        }
      }
    }
  });

  it("names every city in all four languages", () => {
    const ids = new Set(PRAYER_CITIES.map((city) => city.id));
    expect(ids.size).toBe(PRAYER_CITIES.length);
    for (const city of PRAYER_CITIES) {
      expect(city.name.bn).toMatch(/[ঀ-৿]/);
      expect(city.name.ar).toMatch(/[؀-ۿ]/);
      expect(city.name.ur).toMatch(/[؀-ۿ]/);
    }
  });
});

describe("planning nudges", () => {
  const morning = new Date(2026, 9, 28, 6, 0).getTime();

  it("is empty when off or with no city", () => {
    expect(planPrayerNudges(prefs({ enabled: false }), learner(undefined), morning)).toEqual([]);
    expect(planPrayerNudges(prefs({ cityId: undefined }), learner(undefined), morning)).toEqual([]);
  });

  it("comes a little after each chosen prayer, for a few days, never in the past", () => {
    const plan = planPrayerNudges(prefs({ prayers: { fajr: false, dhuhr: true, asr: true, maghrib: false, isha: false } }), learner(undefined), morning);
    expect(plan.every((nudge) => nudge.prayer === "dhuhr" || nudge.prayer === "asr")).toBe(true);
    expect(plan.every((nudge) => nudge.at.getTime() > morning)).toBe(true);
    expect(plan.length).toBeGreaterThanOrEqual(4);
    const first = plan[0];
    const times = getPrayerTimes(dhaka, first.at);
    expect(first.at.getTime()).toBe(times[first.prayer].getTime() + NUDGE_AFTER_PRAYER_MS);
  });

  it("skips the night and the hour after a lesson", () => {
    const plan = planPrayerNudges(prefs(), learner(undefined), morning);
    expect(plan.every((nudge) => nudge.at.getHours() >= 5 && nudge.at.getHours() < 23)).toBe(true);

    const firstAt = planPrayerNudges(prefs(), learner(undefined), morning)[0].at.getTime();
    const afterLesson = planPrayerNudges(prefs(), learner(firstAt - 30 * 60 * 1000), morning);
    expect(afterLesson.some((nudge) => nudge.at.getTime() === firstAt)).toBe(false);
  });

  it("never lands within an hour of a come-back reminder", () => {
    const lastLesson = new Date(2026, 9, 27, 12, 0).getTime();
    const evening = (offset: number) => new Date(2026, 9, 28 + offset, 19, 0).getTime();
    const resume = lastLesson + 6 * 60 * 60 * 1000;
    const plan = planPrayerNudges(prefs(), learner(lastLesson), morning);
    for (const nudge of plan) {
      for (const slot of [evening(0), evening(1), evening(2), resume]) {
        expect(Math.abs(nudge.at.getTime() - slot)).toBeGreaterThanOrEqual(60 * 60 * 1000);
      }
    }

    // With both come-back reminders off, the evening is free again.
    const free = planPrayerNudges(prefs(), learner(lastLesson, { streak: false, comeback: false }), morning);
    expect(free.length).toBeGreaterThanOrEqual(plan.length);
  });

  it("speaks the learner's language and names the prayer", () => {
    const at = new Date(2026, 9, 28, 13);
    expect(prayerNudgeMessage("en", "dhuhr", at).title).toContain("Dhuhr");
    expect(prayerNudgeMessage("bn", "asr", at).title).toContain("আসর");
    expect(prayerNudgeMessage("ur", "fajr", at).title).toContain("فجر");
    expect(prayerNudgeMessage("ar", "isha", at).title).toContain("العشاء");
  });

  it("saves and loads on this phone", () => {
    savePrayerNudgePrefs(prefs({ asr: "standard", prayers: { fajr: false, dhuhr: true, asr: true, maghrib: true, isha: true } }));
    expect(loadPrayerNudgePrefs()).toEqual(prefs({ asr: "standard", prayers: { fajr: false, dhuhr: true, asr: true, maghrib: true, isha: true } }));
  });
});

describe("prayer sheet", () => {
  it("turns on, picks a city by search, and saves the chosen prayers", async () => {
    const onSave = jest.fn();
    await render(<PrayerSheet visible prefs={defaultPrayerNudgePrefs()} language="en" onSave={onSave} onClose={jest.fn()} />);
    expect(screen.queryByTestId("prayer-city-search")).toBeNull();

    await fireEvent.press(screen.getByTestId("prayer-enabled"));
    expect(screen.getByTestId("prayer-save").props.accessibilityState).toMatchObject({ disabled: true });
    await fireEvent.changeText(screen.getByTestId("prayer-city-search"), "phila");
    await fireEvent.press(screen.getByTestId("prayer-city-philadelphia"));

    expect(screen.getByTestId("prayer-city")).toBeTruthy();
    expect(screen.getByText(/Times are close guesses/)).toBeTruthy();
    expect(screen.getByTestId("prayer-asr-standard").props.accessibilityState).toMatchObject({ selected: true });
    await fireEvent.press(screen.getByTestId("prayer-fajr"));
    await fireEvent.press(screen.getByTestId("prayer-asr-hanafi"));
    await fireEvent.press(screen.getByTestId("prayer-save"));

    expect(onSave).toHaveBeenCalledWith({
      enabled: true,
      cityId: "philadelphia",
      asr: "hanafi",
      prayers: { fajr: false, dhuhr: true, asr: true, maghrib: true, isha: true }
    });
  });

  it("finds a city by its Bangla name", async () => {
    await render(<PrayerSheet visible prefs={prefs({ cityId: undefined })} language="bn" onSave={jest.fn()} onClose={jest.fn()} />);
    await fireEvent.changeText(screen.getByTestId("prayer-city-search"), "সিলেট");
    expect(screen.getByTestId("prayer-city-sylhet")).toBeTruthy();
    expect(screen.queryByTestId("prayer-city-dhaka")).toBeNull();
  });

  it("is a row in Settings showing the city", async () => {
    const onOpenPrayer = jest.fn();
    await render(
      <SettingsSheet
        visible
        guest
        streakReminder
        islamicReminder
        dailyCheckIn={false}
        weeklyCheckIn={false}
        soundEnabled
        softSound={false}
        onSelectRole={jest.fn()}
        onToggleStreak={jest.fn()}
        onToggleIslamic={jest.fn()}
        onToggleDaily={jest.fn()}
        onToggleWeekly={jest.fn()}
        onToggleSound={jest.fn()}
        onToggleSoftSound={jest.fn()}
        onSave={jest.fn()}
        onClose={jest.fn()}
        prayerLabel="Dhaka"
        onOpenPrayer={onOpenPrayer}
      />
    );
    expect(screen.getByText("Dhaka")).toBeTruthy();
    await fireEvent.press(screen.getByTestId("settings-prayer"));
    expect(onOpenPrayer).toHaveBeenCalled();
  });
});
