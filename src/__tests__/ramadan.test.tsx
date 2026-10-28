import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { completeLesson, learningApi } from "../api/islamicLearningApi";
import { getBranchArabic, getNodeArabic } from "../data/arabicTerms";
import { COURSE, LESSONS_BY_ID } from "../data/course";
import { RAMADAN_DATES, didRamadanToday, ramadanSeason, ramadanStreak } from "../data/ramadanCalendar";
import { RAMADAN, ramadanDayNode } from "../data/ramadanDays";
import { RamadanBanner } from "../ui/screens";
import { makeUser } from "./testUtils";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

// Noon on a local calendar day, so no time zone moves it to the day before or after.
const on = (key: string) => {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day, 12);
};

describe("Ramadan calendar", () => {
  it("matches the Umm al-Qura calendar for every Ramadan it lists", () => {
    const hijri = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", { day: "numeric", month: "numeric", timeZone: "UTC" });
    const parts = (key: string) => Object.fromEntries(hijri.formatToParts(new Date(`${key}T12:00:00Z`)).map((part) => [part.type, part.value]));
    for (const { start, eid } of RAMADAN_DATES) {
      expect({ start, ...parts(start) }).toMatchObject({ start, month: "9", day: "1" });
      expect({ eid, ...parts(eid) }).toMatchObject({ eid, month: "10", day: "1" });
    }
  });

  it("counts the days of Ramadan, the days before it, and nothing the rest of the year", () => {
    expect(ramadanSeason(on("2027-02-08"))).toEqual({ phase: "ramadan", day: 1, length: 29, start: "2027-02-08" });
    expect(ramadanSeason(on("2027-03-08"))).toMatchObject({ phase: "ramadan", day: 29 });
    // Eid is not Ramadan.
    expect(ramadanSeason(on("2027-03-09"))).toBeUndefined();
    expect(ramadanSeason(on("2027-02-07"))).toEqual({ phase: "soon", daysLeft: 1, start: "2027-02-08" });
    expect(ramadanSeason(on("2027-01-25"))).toEqual({ phase: "soon", daysLeft: 14, start: "2027-02-08" });
    expect(ramadanSeason(on("2027-01-24"))).toBeUndefined();
    expect(ramadanSeason(on("2026-10-28"))).toBeUndefined();
  });
});

describe("Ramadan path", () => {
  const section = COURSE.sections.find((item) => item.topicId === "ramadan")!;

  it("is a topic of 30 days in three units of ten, opened one day at a time", () => {
    expect(section.nodes).toHaveLength(30);
    expect(section.branches.map((branch) => section.nodes.filter((node) => node.branchId === branch.id).length)).toEqual([10, 10, 10]);
    section.nodes.forEach((node, index) => expect(node.requiredNodeIds).toEqual(index ? [section.nodes[index - 1].id] : []));
    expect(ramadanDayNode(1)?.id).toBe(section.nodes[0].id);
    expect(ramadanDayNode(30)?.id).toBe(section.nodes[29].id);

    const learner = makeUser({ completedNodeIds: [section.nodes[0].id] });
    const statuses = learningApi.getPathNodes(learner).filter((node) => node.topicId === "ramadan").map((node) => node.status);
    expect(statuses.slice(0, 3)).toEqual(["completed", "current", "locked"]);
  });

  it("cites only the Quran and checked hadith, and gives every day its own Arabic", () => {
    for (const node of section.nodes) {
      const lesson = LESSONS_BY_ID[node.lessonIds[0]];
      expect(lesson.learnSource?.url).toMatch(/^https:\/\/(quran\.com\/\d+\/\d+|sunnah\.com\/(bukhari|muslim|tirmidhi|abudawud):\d+[a-z]?)$/);
      expect(lesson.challenges.length).toBe(2);
      expect(getNodeArabic(node.id)?.ar).toBeTruthy();
    }
    for (const branch of section.branches) expect(getBranchArabic(branch.id)).toBe(RAMADAN.branchArabic[branch.id]);
  });
});

describe("Ramadan streak", () => {
  const day1 = LESSONS_BY_ID[RAMADAN.section.nodes[0].lessonIds[0]];
  const day2 = LESSONS_BY_ID[RAMADAN.section.nodes[1].lessonIds[0]];
  const foundation = LESSONS_BY_ID["lesson-foundation-niyyah"];

  it("counts a day when a Ramadan lesson is done during Ramadan", () => {
    const first = completeLesson(makeUser({ completedLessonIds: [] }), day1, 3, on("2027-02-08"));
    expect(first.ramadanDays).toEqual(["2027-02-08"]);
    expect(didRamadanToday(first, on("2027-02-08"))).toBe(true);
    expect(ramadanStreak(first, on("2027-02-08"))).toBe(1);
    // The next day, before its lesson, the streak still stands; a day after that it is gone.
    expect(ramadanStreak(first, on("2027-02-09"))).toBe(1);
    expect(ramadanStreak(first, on("2027-02-10"))).toBe(0);

    const second = completeLesson(first, day2, 3, on("2027-02-09"));
    expect(ramadanStreak(second, on("2027-02-09"))).toBe(2);
  });

  it("does not count other topics, or days outside Ramadan", () => {
    expect(completeLesson(makeUser(), foundation, 3, on("2027-02-08")).ramadanDays).toBeUndefined();
    expect(completeLesson(makeUser(), day1, 3, on("2026-10-28")).ramadanDays).toBeUndefined();
    expect(ramadanStreak(makeUser({ ramadanDays: ["2027-02-08"] }), on("2026-10-28"))).toBe(0);
  });

  it("drops the days of an earlier Ramadan", () => {
    const user = completeLesson(makeUser({ ramadanDays: ["2026-03-19"] }), day1, 3, on("2027-02-08"));
    expect(user.ramadanDays).toEqual(["2027-02-08"]);
  });
});

describe("RamadanBanner", () => {
  it("shows the day of Ramadan, the streak and today's lesson", async () => {
    const onPlay = jest.fn();
    await render(
      <RamadanBanner season={{ phase: "ramadan", day: 5, length: 30, start: "2027-02-08" }} accent="#7C5CDB" streak={4} doneToday={false} done={4} total={30} onPlay={onPlay} />
    );
    expect(screen.getByText("Ramadan day 5")).toBeTruthy();
    expect(screen.getByText("4/30")).toBeTruthy();
    await fireEvent.press(screen.getByRole("button", { name: "Today's lesson" }));
    expect(onPlay).toHaveBeenCalledTimes(1);
  });

  it("hides the button once today's lesson is done", async () => {
    await render(<RamadanBanner season={{ phase: "ramadan", day: 5, length: 30, start: "2027-02-08" }} accent="#7C5CDB" streak={5} doneToday done={5} total={30} onPlay={jest.fn()} />);
    expect(screen.getByText("Today's lesson is done!")).toBeTruthy();
    expect(screen.queryByTestId("ramadan-play")).toBeNull();
  });

  it("counts down before Ramadan", async () => {
    await render(<RamadanBanner season={{ phase: "soon", daysLeft: 9, start: "2027-02-08" }} accent="#7C5CDB" streak={0} doneToday={false} done={0} total={30} onPlay={jest.fn()} />);
    expect(screen.getByText("Ramadan in 9 days")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Start now" })).toBeTruthy();
  });
});
