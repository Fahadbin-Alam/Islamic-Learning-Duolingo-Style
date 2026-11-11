jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { setActiveLanguage } from "../i18n";
import { playGameSound } from "../services/gameAudio";
import { highlightUrl } from "../services/sourceLink";
import { isStreakMilestone, streakLine, streakWeek } from "../services/streakWeek";
import { LessonComplete } from "../ui/lesson/LessonComplete";
import { STREAK_HADITH, StreakMoment } from "../ui/lesson/StreakMoment";

const sounds = () => (playGameSound as jest.Mock).mock.calls.map(([sound]) => sound as string);
// The moment's parts pop in from nothing; the test reads them before they have.
const ALL = { includeHiddenElements: true };

async function wait(ms: number) {
  await act(async () => {
    jest.advanceTimersByTime(ms);
  });
}

beforeEach(() => {
  (playGameSound as jest.Mock).mockClear();
  jest.useFakeTimers();
  setActiveLanguage("en");
});

afterEach(() => {
  jest.useRealTimers();
});

afterAll(() => {
  setActiveLanguage("en");
});

describe("this week on the streak moment", () => {
  // 2026-11-11 is a Wednesday.
  it("lights the streak's days before today, Monday to Sunday", () => {
    const week = streakWeek("2026-11-11", 5);
    expect(week.map((day) => day.name)).toEqual(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
    expect(week.map((day) => day.date)).toEqual(["2026-11-09", "2026-11-10", "2026-11-11", "2026-11-12", "2026-11-13", "2026-11-14", "2026-11-15"]);
    expect(week.map((day) => day.state)).toEqual(["lit", "lit", "today", "later", "later", "later", "later"]);
  });

  it("shows a frozen day as kept, without counting it as one of the streak's days", () => {
    // A 3-day streak on Thursday with Tuesday frozen: Monday, Wednesday and today are its days.
    expect(streakWeek("2026-11-12", 3, ["2026-11-10"]).map((day) => day.state)).toEqual(["lit", "frozen", "lit", "today", "later", "later", "later"]);
  });

  it("leaves the days before a new streak empty", () => {
    expect(streakWeek("2026-11-15", 1).map((day) => day.state)).toEqual(["none", "none", "none", "none", "none", "none", "today"]);
    expect(streakWeek("2026-11-13", 2).map((day) => day.state)).toEqual(["none", "none", "none", "lit", "today", "later", "later"]);
  });

  it("knows the big days and says the right line for each", () => {
    expect([1, 2, 3, 7, 14, 21, 30, 50, 100, 150, 365].map(isStreakMilestone)).toEqual([false, false, true, true, true, true, true, true, true, true, true]);
    expect([5, 8, 101, 120].map(isStreakMilestone)).toEqual([false, false, false, false]);
    expect(streakLine(1).text).toBe("You started a streak! Come back tomorrow to keep it going.");
    expect(streakLine(7).text).toBe("A whole week in a row! MashaAllah!");
    expect(streakLine(30).text).toBe("A whole month in a row! MashaAllah!");
    expect(streakLine(14)).toEqual({ text: "{count} days in a row! MashaAllah!", values: { count: 14 } });
    expect(streakLine(5)).toEqual({ text: "Come back tomorrow to make it {count}!", values: { count: 6 } });
  });
});

describe("the streak moment", () => {
  const props = { today: "2026-11-11", mascotVariant: "girl", accent: "#58CC02" };

  it("flares the flame, rolls the number on and lights today, with the streak sound", async () => {
    const onContinue = jest.fn();
    await render(<StreakMoment {...props} days={5} onContinue={onContinue} />);
    expect(screen.getByTestId("streak-moment-title", ALL)).toHaveTextContent("5 day streak!");
    expect(screen.getByTestId("streak-moment-line", ALL)).toHaveTextContent("Come back tomorrow to make it 6!");
    expect(screen.getByTestId("streak-moment-number", ALL).props.accessibilityLabel).toBe("5");
    // Yesterday's streak was lit already; today's circle waits for the flare.
    expect(screen.getByTestId("streak-flame-lit", ALL)).toBeTruthy();
    expect(screen.getAllByTestId("streak-day-lit", ALL)).toHaveLength(2);
    expect(screen.getByTestId("streak-day-today", ALL)).toBeTruthy();
    expect(sounds()).not.toContain("streak");

    await wait(700);
    expect(sounds()).toContain("streak");
    expect(sounds()).not.toContain("perfect");
    // A plain day: no hadith card, no confetti fanfare.
    expect(screen.queryByTestId("streak-hadith", ALL)).toBeNull();

    await act(async () => {
      fireEvent.press(screen.getByTestId("streak-moment-continue"));
    });
    expect(onContinue).toHaveBeenCalledTimes(1);
  });

  it("starts a first streak from a grey ember, and shows the hadith on keeping at a deed with its source", async () => {
    const onOpenSource = jest.fn();
    await render(<StreakMoment {...props} days={1} onContinue={jest.fn()} onOpenSource={onOpenSource} />);
    expect(screen.getByTestId("streak-flame-ember", ALL)).toBeTruthy();
    expect(screen.getByTestId("streak-moment-line", ALL)).toHaveTextContent(/^You started a streak!/);
    await wait(700);
    expect(screen.getByTestId("streak-flame-lit", ALL)).toBeTruthy();
    expect(screen.getByTestId("streak-hadith", ALL)).toHaveTextContent("The deeds Allah loves most are done regularly, even if small.Sahih al-Bukhari 6464");
    await act(async () => {
      fireEvent.press(screen.getByTestId("streak-hadith-source"));
    });
    expect(onOpenSource).toHaveBeenCalledWith(highlightUrl(STREAK_HADITH.url, STREAK_HADITH.highlight));
    expect(onOpenSource.mock.calls[0][0]).toMatch(/^https:\/\/sunnah\.com\/bukhari:6464#:~:text=/);
  });

  it("brings a fanfare and the hadith on a big day", async () => {
    await render(<StreakMoment {...props} days={7} onContinue={jest.fn()} />);
    expect(screen.getByTestId("streak-moment-line", ALL)).toHaveTextContent("A whole week in a row! MashaAllah!");
    await wait(1600);
    expect(sounds()).toEqual(expect.arrayContaining(["streak", "perfect"]));
    expect(screen.getByTestId("streak-hadith", ALL)).toBeTruthy();
  });

  it("speaks Bangla, Urdu and Arabic, the week's days too", async () => {
    setActiveLanguage("ur");
    const view = await render(<StreakMoment {...props} days={5} onContinue={jest.fn()} />);
    expect(screen.getByTestId("streak-moment-title", ALL)).toHaveTextContent("5 دن کی اسٹریک!");
    expect(screen.getByTestId("streak-week", ALL)).toHaveTextContent(/پیر.*منگل.*بدھ/);
    expect(screen.getByTestId("streak-moment-continue")).not.toHaveTextContent(/Continue/i);
    await view.unmount();

    setActiveLanguage("ar");
    await render(<StreakMoment {...props} days={1} onContinue={jest.fn()} />);
    expect(screen.getByTestId("streak-hadith", ALL)).toHaveTextContent("أحب الأعمال إلى الله أدومها وإن قلّ.Sahih al-Bukhari 6464");
    expect(screen.getByTestId("streak-week", ALL)).not.toHaveTextContent(/[A-Za-z]/);
  });
});

describe("after the day's first lesson", () => {
  const card = {
    title: "As-salamu alaykum",
    xp: 10,
    stars: 3,
    mascotVariant: "girl",
    accent: "#58CC02",
    nextTitle: "Next",
    playSounds: false
  };

  it("CONTINUE opens the streak moment first, and its CONTINUE goes to the next lesson", async () => {
    const onContinue = jest.fn();
    const onBackToPath = jest.fn();
    await render(<LessonComplete {...card} streakDays={4} streakExtended streakMoment={{ today: "2026-11-11" }} onContinue={onContinue} onBackToPath={onBackToPath} />);
    await act(async () => {
      fireEvent.press(screen.getByTestId("complete-continue"));
    });
    expect(onContinue).not.toHaveBeenCalled();
    expect(screen.getByTestId("streak-moment")).toBeTruthy();
    expect(screen.queryByTestId("lesson-complete")).toBeNull();
    await act(async () => {
      fireEvent.press(screen.getByTestId("streak-moment-continue"));
    });
    expect(onContinue).toHaveBeenCalledTimes(1);
    expect(onBackToPath).not.toHaveBeenCalled();
  });

  it("BACK TO PATH goes back to the path after the moment", async () => {
    const onContinue = jest.fn();
    const onBackToPath = jest.fn();
    await render(<LessonComplete {...card} streakDays={4} streakExtended streakMoment={{ today: "2026-11-11" }} onContinue={onContinue} onBackToPath={onBackToPath} />);
    await act(async () => {
      fireEvent.press(screen.getByTestId("complete-back"));
    });
    await act(async () => {
      fireEvent.press(screen.getByTestId("streak-moment-continue"));
    });
    expect(onBackToPath).toHaveBeenCalledTimes(1);
    expect(onContinue).not.toHaveBeenCalled();
  });

  it("goes straight on when the streak did not grow (a later lesson the same day)", async () => {
    const onContinue = jest.fn();
    await render(<LessonComplete {...card} streakDays={4} streakMoment={{ today: "2026-11-11" }} onContinue={onContinue} onBackToPath={jest.fn()} />);
    await act(async () => {
      fireEvent.press(screen.getByTestId("complete-continue"));
    });
    expect(onContinue).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId("streak-moment")).toBeNull();
  });
});
