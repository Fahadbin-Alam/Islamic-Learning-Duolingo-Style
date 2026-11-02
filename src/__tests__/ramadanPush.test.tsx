jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { ramadanDoneDayNumbers } from "../data/ramadanCalendar";
import { planPrayerNudges } from "../services/prayerNudgePlan";
import { defaultPrayerNudgePrefs, getPrayerTimes } from "../services/prayerTimes";
import { findPrayerCity } from "../data/prayerCities";
import { IFTAR_BEFORE_MAGHRIB_MS, SUHOOR_BEFORE_FAJR_MS, planRamadanReminders, ramadanReminderMessage } from "../services/ramadanReminders";
import { ramadanShareMessage } from "../services/shareApp";
import { PrayerSheet, RamadanBanner, RamadanDayPop } from "../ui/screens";
import { makeUser } from "./testUtils";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

const at = (key: string, hour: number) => {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day, hour).getTime();
};

const london = { ...defaultPrayerNudgePrefs(), cityId: "london", ramadan: true };

describe("suhoor and iftar reminders", () => {
  it("rings before Fajr and before Maghrib on the days of Ramadan only", () => {
    // 2027-02-07 is the day before Ramadan: its reminders start on day 1.
    const plan = planRamadanReminders(london, at("2027-02-07", 1));
    expect(plan.map((reminder) => `${reminder.kind}${reminder.day}`)).toEqual(["suhoor1", "iftar1", "suhoor2", "iftar2"]);

    const times = getPrayerTimes(findPrayerCity("london")!, new Date(at("2027-02-08", 12)));
    expect(plan[0].at.getTime()).toBe(times.fajr.getTime() - SUHOOR_BEFORE_FAJR_MS);
    expect(plan[1].at.getTime()).toBe(times.maghrib.getTime() - IFTAR_BEFORE_MAGHRIB_MS);
  });

  it("stops at Eid, skips times already gone, and is off without the setting or a city", () => {
    // Last day of Ramadan 2027 is 2027-03-08; Eid is 03-09.
    expect(planRamadanReminders(london, at("2027-03-08", 12)).map((reminder) => reminder.kind)).toEqual(["iftar"]);
    expect(planRamadanReminders(london, at("2026-11-02", 12))).toEqual([]);
    expect(planRamadanReminders({ ...london, ramadan: false }, at("2027-02-10", 1))).toEqual([]);
    expect(planRamadanReminders({ ...london, cityId: undefined }, at("2027-02-10", 1))).toEqual([]);
  });

  it("quotes Sahih al-Bukhari in every language and names the day", () => {
    const [suhoor, iftar] = planRamadanReminders(london, at("2027-02-07", 1));
    expect(ramadanReminderMessage("en", suhoor)).toEqual({
      title: "🐪 Wake up for suhoor! Even the camel is up",
      body: "\"Take Suhur as there is a blessing in it.\" (Sahih al-Bukhari 1923)"
    });
    expect(ramadanReminderMessage("en", { ...iftar, day: 2 }).title).toBe("🌅 Iftar is close, day 2!");
    for (const language of ["ar", "bn", "ur"] as const) {
      expect(ramadanReminderMessage(language, suhoor).body).toMatch(/1923|১৯২৩/);
      expect(ramadanReminderMessage(language, iftar).body).toMatch(/1957|১৯৫৭/);
    }
  });

  it("drops the Maghrib lesson nudge in Ramadan so iftar gets one ping", () => {
    const prayers = { ...london, enabled: true };
    const ramadanDay = planPrayerNudges(prayers, undefined, at("2027-02-10", 6)).filter((nudge) => nudge.at.getDate() === 10);
    expect(ramadanDay.map((nudge) => nudge.prayer)).not.toContain("maghrib");
    const withoutReminders = planPrayerNudges({ ...prayers, ramadan: false }, undefined, at("2027-02-10", 6)).filter((nudge) => nudge.at.getDate() === 10);
    expect(withoutReminders.map((nudge) => nudge.prayer)).toContain("maghrib");
  });
});

describe("prayer sheet", () => {
  it("turns on suhoor and iftar reminders on their own, with a city", async () => {
    const onSave = jest.fn();
    await render(<PrayerSheet visible prefs={defaultPrayerNudgePrefs()} language="en" onSave={onSave} onClose={jest.fn()} />);
    await fireEvent.press(screen.getByTestId("prayer-ramadan"));
    await fireEvent.changeText(screen.getByTestId("prayer-city-search"), "London");
    await fireEvent.press(screen.getByTestId("prayer-city-london"));
    // Only the reminders are on, so there are no per-prayer lesson toggles.
    expect(screen.queryByTestId("prayer-fajr")).toBeNull();
    await fireEvent.press(screen.getByTestId("prayer-save"));
    expect(onSave).toHaveBeenCalledWith(expect.objectContaining({ enabled: false, ramadan: true, cityId: "london" }));
  });
});

describe("I finished day N", () => {
  it("writes the share message with the streak and the store link", () => {
    expect(ramadanShareMessage(5, 5, "android", false)).toBe(
      "🌙 I finished day 5 of Ramadan on Muslimo! 5 days in a row. Learn with me, one short lesson a day:\nhttps://play.google.com/store/apps/details?id=com.islamiclearning.muslimo"
    );
    expect(ramadanShareMessage(1, 1, "android", false)).not.toContain("in a row");
  });

  it("lists this Ramadan's done days as day numbers", () => {
    const user = makeUser({ ramadanDays: ["2027-02-08", "2027-02-10", "2026-03-01"] });
    expect(ramadanDoneDayNumbers(user, new Date(2027, 1, 10, 12))).toEqual([1, 3]);
    expect(ramadanDoneDayNumbers(user, new Date(2026, 10, 2, 12))).toEqual([]);
  });

  it("the banner shares a done day and offers the reminders", async () => {
    const onShare = jest.fn();
    const onReminders = jest.fn();
    await render(
      <RamadanBanner
        season={{ phase: "ramadan", day: 5, length: 30, start: "2027-02-08" }}
        accent="#7C5CDB"
        streak={5}
        doneToday
        done={5}
        total={30}
        onPlay={jest.fn()}
        onShare={onShare}
        onReminders={onReminders}
      />
    );
    await fireEvent.press(screen.getByRole("button", { name: "Share day 5" }));
    await fireEvent.press(screen.getByTestId("ramadan-reminders"));
    expect(onShare).toHaveBeenCalledTimes(1);
    expect(onReminders).toHaveBeenCalledTimes(1);
  });

  it("the banner has no share button before today's lesson", async () => {
    await render(
      <RamadanBanner season={{ phase: "ramadan", day: 5, length: 30, start: "2027-02-08" }} accent="#7C5CDB" streak={4} doneToday={false} done={4} total={30} onShare={jest.fn()} />
    );
    expect(screen.queryByTestId("ramadan-share")).toBeNull();
    expect(screen.queryByTestId("ramadan-reminders")).toBeNull();
  });

  it("the day card lights a moon for each day learned and shares", async () => {
    const onShare = jest.fn();
    await render(<RamadanDayPop visible day={3} length={29} doneDays={[1, 3]} streak={1} accent="#7C5CDB" onShare={onShare} onClose={jest.fn()} />);
    expect(screen.getByText("Day 3 of Ramadan done!")).toBeTruthy();
    expect(screen.getByTestId("ramadan-moon-lit-1")).toBeTruthy();
    expect(screen.queryByTestId("ramadan-moon-lit-2")).toBeNull();
    await fireEvent.press(screen.getByTestId("ramadan-day-share"));
    expect(onShare).toHaveBeenCalledTimes(1);
  });
});
