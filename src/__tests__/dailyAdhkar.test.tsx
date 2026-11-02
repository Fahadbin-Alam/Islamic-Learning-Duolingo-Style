jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("expo-speech", () => ({
  getAvailableVoicesAsync: async () => [{ identifier: "ar-voice", language: "ar-SA", name: "Arabic", quality: "Default" }],
  speak: jest.fn(),
  stop: jest.fn()
}));
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { ADHKAR, adhkarText, adhkarTimeFor, dhikrArabic, type AdhkarTime } from "../data/adhkar";
import { DUA_LESSONS, DUAS_SECTION } from "../data/duaUnits";
import { adhkarReminderMessage } from "../services/adhkarProgress";
import { getCatalog } from "../translations";
import { AdhkarSheet, resetAdhkarCountsForTests } from "../ui/screens/AdhkarSheet";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

const ARABIC = /[؀-ۿ]/;
const TIMES: AdhkarTime[] = ["morning", "evening", "sleep"];

describe("daily adhkar data", () => {
  it("gives every dhikr Arabic, a meaning, a count and a sahih or hasan source", () => {
    for (const time of TIMES) {
      expect(ADHKAR[time].length).toBeGreaterThanOrEqual(5);
      expect(new Set(ADHKAR[time].map((dhikr) => dhikr.id)).size).toBe(ADHKAR[time].length);
      for (const dhikr of ADHKAR[time]) {
        expect(dhikrArabic(dhikr)).toMatch(ARABIC);
        expect(dhikrArabic(dhikr)).not.toMatch(/undefined|[A-Za-z]/);
        expect(dhikr.translit).toMatch(/[A-Za-z]/);
        expect(dhikr.count).toBeGreaterThanOrEqual(1);
        expect(dhikr.source.url).toMatch(/^https:\/\//);
        expect(dhikr.source.grade).toMatch(/^(Sahih|Hasan)/);
      }
    }
  });

  it("is translated in every language", () => {
    for (const language of ["bn", "ur", "ar"] as const) {
      const catalog = getCatalog(language);
      const missing = adhkarText().filter((text) => !catalog[text]);
      expect({ language, missing }).toEqual({ language, missing: [] });
      expect(adhkarReminderMessage(language, "morning").title).toBeTruthy();
    }
  });

  it("picks the list by the time of day", () => {
    expect(adhkarTimeFor(new Date(2026, 10, 2, 6))).toBe("morning");
    expect(adhkarTimeFor(new Date(2026, 10, 2, 17))).toBe("evening");
    expect(adhkarTimeFor(new Date(2026, 10, 2, 23))).toBe("sleep");
    expect(adhkarTimeFor(new Date(2026, 10, 2, 1))).toBe("sleep");
  });

  it("puts the duas topic in the library with sourced lessons", () => {
    expect(DUAS_SECTION.topicId).toBe("duas");
    expect(DUA_LESSONS.length).toBeGreaterThanOrEqual(40);
  });
});

describe("adhkar sheet", () => {
  beforeEach(() => resetAdhkarCountsForTests());

  it("counts each dhikr and marks the list done when every one is said", async () => {
    const onFinished = jest.fn();
    await render(<AdhkarSheet visible time="sleep" onClose={jest.fn()} onFinished={onFinished} doneToday={[]} remindersOn={false} onToggleReminders={jest.fn()} />);
    const list = ADHKAR.sleep;
    expect(screen.getByTestId("adhkar-progress")).toHaveTextContent(`0/${list.length}`);
    for (const dhikr of list) {
      for (let tap = 0; tap < dhikr.count; tap += 1) await fireEvent.press(screen.getByTestId(`adhkar-count-${dhikr.id}`));
    }
    expect(screen.getByTestId("adhkar-progress")).toHaveTextContent(`${list.length}/${list.length}`);
    expect(onFinished).toHaveBeenCalledWith("sleep");
    expect(screen.getByTestId("adhkar-finished")).toBeTruthy();
  });

  it("switches between the morning, evening and bedtime lists", async () => {
    await render(<AdhkarSheet visible time="morning" onClose={jest.fn()} onFinished={jest.fn()} doneToday={[]} remindersOn onToggleReminders={jest.fn()} />);
    expect(screen.getByTestId(`adhkar-card-${ADHKAR.morning[0].id}`)).toBeTruthy();
    await fireEvent.press(screen.getByTestId("adhkar-tab-evening"));
    expect(screen.getByTestId(`adhkar-card-${ADHKAR.evening.at(-1)!.id}`)).toBeTruthy();
  });
});
