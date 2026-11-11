jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);
jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));
jest.mock("expo-speech", () => ({ speak: jest.fn(), stop: jest.fn(() => Promise.resolve()) }));
jest.mock("../services/monetization", () => ({
  monetizationClient: {
    initialize: jest.fn(async () => undefined),
    getPremiumStatus: jest.fn(async () => null),
    getStorePrices: jest.fn(async () => ({})),
    showLessonBreakAd: jest.fn(async () => undefined),
    setAdAudience: jest.fn(),
    showRewardedAd: jest.fn(async () => ({ ok: false })),
    purchaseShopItem: jest.fn(async () => ({ ok: false, cancelled: true })),
    restorePurchases: jest.fn(async () => ({}))
  }
}));
jest.mock("../components/AdBanner", () => ({ AdBanner: () => null }));
jest.mock("../services/islamicNotifications", () => ({
  requestIslamicNotificationPermission: jest.fn(async () => false),
  scheduleIslamicReminderChecks: jest.fn(() => () => undefined)
}));

import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import TopicApp from "../TopicApp";
import { localDateKey } from "../api/islamicLearningApi";
import { getUiStrings } from "../i18n";
import { getStoredItem, removeStoredItem, setStoredItem } from "../services/appStorage";
import type { FamilyWeekPayload } from "../services/backendSync";
import { shiftDateKey, type FamilyKid } from "../services/familyCode";
import {
  buildFamilyWeek,
  FAMILY_SIZE_LIMIT,
  familyWeekDaysLeft,
  familyWeekStart,
  learnedDaysThisWeek,
  litFamilyWeeks,
  markFamilyWeekLit,
  ownXpByDay,
  resetFamilyWeeksForTests,
  type FamilyWeek
} from "../services/familyWeek";
import { playGameSound } from "../services/gameAudio";
import { getCatalog } from "../translations";
import { createEmptyLearnerProfile } from "../services/foundationAssessment";
import { ProfileView } from "../ui/screens/ProfileView";
import { FamilyWeekCard, lanternRows } from "../ui/screens/FamilyWeekCard";
import { makeUser } from "./testUtils";

// Wednesday 11 November 2026: the week is Monday 9 to Sunday 15.
const WEDNESDAY = "2026-11-11";

const server = (overrides: Partial<FamilyWeekPayload> = {}): FamilyWeekPayload => ({
  weekStart: "2026-11-09",
  members: 4,
  goal: 12,
  lit: 6,
  selfDays: ["2026-11-09"],
  people: [
    { id: 1, name: "Mum Rahman", avatarInitials: "MR", today: false },
    { id: 2, name: "Yusuf", avatarInitials: "Y", today: true },
    { id: 3, name: "Maryam", avatarInitials: "M", today: false }
  ],
  ...overrides
});

const pastedKid = (nickname: string, date: string, weekXp: number[]): FamilyKid => ({
  nickname,
  addedAt: "2026-11-01T10:00:00.000Z",
  snapshot: { id: `kid-${nickname}`, date, streakDays: 1, totalXp: 100, lessonsDone: 3, stars: 4, weekXp, topicsDone: {} }
});

const week = (overrides: Partial<FamilyWeek> = {}): FamilyWeek => ({
  weekStart: "2026-11-09",
  today: WEDNESDAY,
  members: 3,
  goal: 9,
  lit: 4,
  people: [
    { key: "you", name: "", initials: "AR", learnedToday: true, self: true },
    { key: "p-2", name: "Yusuf Ali", initials: "YA", learnedToday: false }
  ],
  others: 1,
  ...overrides
});

describe("family week: the numbers", () => {
  it("runs Monday to Sunday, as the league does", () => {
    expect(familyWeekStart("2026-11-09")).toBe("2026-11-09");
    expect(familyWeekStart(WEDNESDAY)).toBe("2026-11-09");
    expect(familyWeekStart("2026-11-15")).toBe("2026-11-09");
    expect(familyWeekStart("2026-11-16")).toBe("2026-11-16");
    expect(familyWeekStart("2027-01-01")).toBe("2026-12-28");
    expect(familyWeekDaysLeft("2026-11-09")).toBe(7);
    expect(familyWeekDaysLeft(WEDNESDAY)).toBe(5);
    expect(familyWeekDaysLeft("2026-11-15")).toBe(1);
    expect(learnedDaysThisWeek({ "2026-11-08": 30, "2026-11-09": 10, "2026-11-10": 0, "2026-11-11": 5, "2026-11-12": 9 }, WEDNESDAY)).toEqual(["2026-11-09", "2026-11-11"]);
    expect(ownXpByDay({ xpByDay: { "2026-11-10": 4 }, dailyXp: { date: WEDNESDAY, xp: 12 } })).toEqual({ "2026-11-10": 4, [WEDNESDAY]: 12 });
  });

  it("adds a lesson this phone just finished to the server's count, once", () => {
    const self = { xpByDay: { "2026-11-09": 20, [WEDNESDAY]: 10 }, initials: "MR" };
    const result = buildFamilyWeek({ server: server(), self, liveKids: [], pastedKids: [], today: WEDNESDAY })!;
    // The server knew Monday; today's lesson has not reached it yet.
    expect(result.lit).toBe(7);
    expect(result.goal).toBe(12);
    expect(result.people.map((person) => [person.name, person.learnedToday, Boolean(person.self)])).toEqual([
      ["Mum Rahman", true, true],
      ["Yusuf", true, false],
      ["Maryam", false, false]
    ]);
    // Dad is counted, not named.
    expect(result.others).toBe(1);
    // Days the server already has are not counted twice.
    expect(buildFamilyWeek({ server: server({ selfDays: ["2026-11-09", WEDNESDAY], lit: 7 }), self, liveKids: [], pastedKids: [], today: WEDNESDAY })!.lit).toBe(7);
  });

  it("counts learners from pasted codes too, on the days of this week only", () => {
    // A code made on Tuesday: its last two days are Monday and Tuesday of this week.
    const kid = pastedKid("Zayd", "2026-11-10", [9, 9, 9, 9, 9, 0, 15]);
    const result = buildFamilyWeek({ server: server(), self: { xpByDay: {}, initials: "MR" }, liveKids: [], pastedKids: [kid], today: WEDNESDAY })!;
    expect(result.members).toBe(5);
    expect(result.goal).toBe(15);
    // The server's six, and Zayd's Tuesday.
    expect(result.lit).toBe(7);
    expect(result.people.at(-1)).toMatchObject({ name: "Zayd", initials: "Z", learnedToday: false });
  });

  it("works it out on a grown-up's phone when the server sends no family week", () => {
    const self = { xpByDay: { "2026-11-09": 20 }, initials: "MR" };
    const liveKids = [{ id: 7, name: "Yusuf", avatarInitials: "Y", xpByDay: { "2026-11-10": 5, [WEDNESDAY]: 5 } }];
    const result = buildFamilyWeek({ server: null, self, liveKids, pastedKids: [], today: WEDNESDAY })!;
    expect(result).toMatchObject({ weekStart: "2026-11-09", members: 2, goal: 6, lit: 3, others: 0 });
    expect(result.people.map((person) => person.learnedToday)).toEqual([false, true]);
    // A week the server sent before Monday is not this week.
    expect(buildFamilyWeek({ server: server({ weekStart: "2026-11-02" }), self, liveKids, pastedKids: [], today: WEDNESDAY })!.goal).toBe(6);
    // Nobody to share it with: no family week.
    expect(buildFamilyWeek({ server: null, self, liveKids: [], pastedKids: [], today: WEDNESDAY })).toBeUndefined();
    expect(buildFamilyWeek({ server: server({ members: 1, people: [] }), self, liveKids: [], pastedKids: [], today: WEDNESDAY })).toBeUndefined();
    // A teacher following a class: a class is not one family, so only codes pasted on this phone count.
    const pupils = Array.from({ length: FAMILY_SIZE_LIMIT + 1 }, (_, index) => ({ id: 100 + index, name: `Pupil ${index}`, avatarInitials: "P", xpByDay: { [WEDNESDAY]: 5 } }));
    expect(buildFamilyWeek({ server: null, self, liveKids: pupils, pastedKids: [], today: WEDNESDAY })).toBeUndefined();
    const ownChild = pastedKid("Zayd", WEDNESDAY, [0, 0, 0, 0, 0, 0, 15]);
    expect(buildFamilyWeek({ server: null, self, liveKids: pupils, pastedKids: [ownChild], today: WEDNESDAY })).toMatchObject({ members: 2, goal: 6, lit: 2 });
    expect(buildFamilyWeek({ server: null, self, liveKids: pupils.slice(0, FAMILY_SIZE_LIMIT), pastedKids: [], today: WEDNESDAY })!.members).toBe(FAMILY_SIZE_LIMIT + 1);
  });

  it("remembers each week the family lit every lantern, once", () => {
    resetFamilyWeeksForTests();
    expect(markFamilyWeekLit("2026-11-09")).toBe(true);
    expect(markFamilyWeekLit("2026-11-09")).toBe(false);
    expect(litFamilyWeeks()).toEqual(["2026-11-09"]);
    expect(JSON.parse(getStoredItem("sira-path-family-weeks") ?? "[]")).toEqual(["2026-11-09"]);
    resetFamilyWeeksForTests();
  });

  it("is translated in every language", () => {
    const shown = [
      "Family challenge",
      "Done!",
      "Last day!",
      "{count} days left",
      "{count} of {total} lanterns lit",
      "Your family lit every lantern! MashaAllah!",
      "A new week! Light the lanterns together.",
      "Every day someone in your family learns, a lantern lights up.",
      "+{count} more",
      "Weeks lit together: {count}",
      "{name}, learned today",
      "You"
    ];
    for (const language of ["bn", "ur", "ar"] as const) {
      const catalog = getCatalog(language);
      expect({ language, missing: shown.filter((text) => !catalog[text]) }).toEqual({ language, missing: [] });
    }
  });
});

describe("family week: the card", () => {
  beforeEach(() => {
    resetFamilyWeeksForTests();
    jest.clearAllMocks();
  });

  it("lights one lantern per day learned and names who learned today", async () => {
    await render(<FamilyWeekCard week={week()} />);
    expect(screen.getAllByTestId("family-week-lit", { includeHiddenElements: true })).toHaveLength(4);
    expect(screen.getAllByTestId("family-week-unlit", { includeHiddenElements: true })).toHaveLength(5);
    expect(screen.getByTestId("family-week-count")).toHaveTextContent("4 of 9 lanterns lit");
    expect(screen.getByTestId("family-week-left")).toHaveTextContent("5 days left");
    expect(screen.getByTestId("family-week-status")).toHaveTextContent("Every day someone in your family learns, a lantern lights up.");
    expect(screen.getByLabelText("You, learned today")).toBeTruthy();
    expect(screen.getByLabelText("Yusuf")).toBeTruthy();
    expect(screen.getByTestId("family-week-others")).toHaveTextContent("+1 more");
    expect(screen.queryByTestId("family-week-weeks")).toBeNull();
    expect(playGameSound).not.toHaveBeenCalled();
  });

  it("cheers once when every lantern is lit, and counts the week", async () => {
    await render(<FamilyWeekCard week={week({ lit: 11, today: "2026-11-15" })} />);
    expect(screen.getAllByTestId("family-week-lit", { includeHiddenElements: true })).toHaveLength(9);
    expect(screen.queryByTestId("family-week-unlit")).toBeNull();
    expect(screen.getByTestId("family-week-count")).toHaveTextContent("9 of 9 lanterns lit");
    expect(screen.getByTestId("family-week-left")).toHaveTextContent("Done!");
    expect(screen.getByTestId("family-week-status")).toHaveTextContent("Your family lit every lantern! MashaAllah!");
    expect(playGameSound).toHaveBeenCalledWith("unlock", expect.anything());
    expect(screen.getByTestId("family-week-weeks")).toHaveTextContent("Weeks lit together: 1");
    await screen.unmount();

    // Seen again (the Me tab opened twice): no second cheer.
    await render(<FamilyWeekCard week={week({ lit: 11, today: "2026-11-15" })} />);
    expect(playGameSound).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("family-week-weeks")).toHaveTextContent("Weeks lit together: 1");
  });

  it("hangs the lanterns in even rows, as many to a row as fit", async () => {
    const shape = (goal: number, size: number, width: number) => lanternRows(goal, size, width).map((row) => row.length);
    expect(shape(6, 34, 326)).toEqual([6]);
    expect(shape(9, 34, 326)).toEqual([5, 4]);
    expect(shape(12, 34, 326)).toEqual([6, 6]);
    expect(shape(21, 30, 326)).toEqual([7, 7, 7]);
    expect(shape(12, 34, 200)).toEqual([4, 4, 4]);
    expect(shape(3, 34, 20)).toEqual([1, 1, 1]);
    // Every lantern once, in order.
    expect(lanternRows(13, 34, 326).flat()).toEqual(Array.from({ length: 13 }, (_, index) => index));
    await render(<FamilyWeekCard week={week({ members: 4, goal: 12, lit: 7 })} />);
    expect(screen.getAllByTestId("family-week-lit", { includeHiddenElements: true })).toHaveLength(7);
    expect(screen.getAllByTestId("family-week-unlit", { includeHiddenElements: true })).toHaveLength(5);
  });

  it("starts a new week kindly, says when it is the last day, and uses a bar for a big family", async () => {
    await render(<FamilyWeekCard week={week({ lit: 0, today: "2026-11-15" })} />);
    expect(screen.getByTestId("family-week-status")).toHaveTextContent("A new week! Light the lanterns together.");
    expect(screen.getByTestId("family-week-left")).toHaveTextContent("Last day!");
    await screen.unmount();

    await render(<FamilyWeekCard week={week({ members: 12, goal: 36, lit: 20, others: 10 })} />);
    expect(screen.queryByTestId("family-week-lanterns")).toBeNull();
    expect(screen.getByTestId("family-week-count")).toHaveTextContent("20 of 36 lanterns lit");
  });

  it("shows on the Me tab only when there is a family", async () => {
    const props = { user: makeUser(), strings: getUiStrings("en"), learnerProfile: createEmptyLearnerProfile(), onOpenSettings: jest.fn() };
    await render(<ProfileView {...props} familyWeek={week()} />);
    expect(screen.getByTestId("profile-family-week")).toBeTruthy();
    await screen.unmount();
    await render(<ProfileView {...props} />);
    expect(screen.queryByTestId("profile-family-week")).toBeNull();
  });
});

describe("family week in the app", () => {
  const PROFILE_KEY = "sira-path-user-profile";
  afterEach(() => {
    removeStoredItem(PROFILE_KEY);
    removeStoredItem("sira-path-family-kids");
    resetFamilyWeeksForTests();
  });

  it("lights the lanterns on the Me tab for a grown-up following a child by code", async () => {
    const today = localDateKey();
    setStoredItem(PROFILE_KEY, JSON.stringify(makeUser({ lastTopicId: "foundation", xpByDay: { [today]: 20 } })));
    // The child learned yesterday and the day before, by their last code (made yesterday).
    const kid = pastedKid("Yusuf", shiftDateKey(today, -1), [0, 0, 0, 0, 0, 10, 10]);
    setStoredItem("sira-path-family-kids", JSON.stringify([kid]));
    const expected = buildFamilyWeek({ server: null, self: { xpByDay: { [today]: 20 }, initials: "?" }, liveKids: [], pastedKids: [kid], today })!;

    await render(<TopicApp />);
    await act(async () => {
      fireEvent.press(screen.getByTestId("tab-me"));
    });
    expect(screen.getByTestId("profile-family-week")).toBeTruthy();
    expect(screen.getByTestId("profile-family-week-count")).toHaveTextContent(`${Math.min(expected.lit, 6)} of 6 lanterns lit`);
    expect(screen.getByLabelText("You, learned today")).toBeTruthy();
  });
});
