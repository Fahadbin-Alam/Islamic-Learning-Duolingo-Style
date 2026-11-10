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
import { Share } from "react-native";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import TopicApp from "../TopicApp";
import { addXp } from "../api/islamicLearningApi";
import { getStoredItem, removeStoredItem, setStoredItem } from "../services/appStorage";
import {
  addFamilyKid,
  buildFamilySnapshot,
  decodeFamilyCode,
  encodeFamilyCode,
  logDailyXp,
  readFamilyKids,
  recentDailyXp,
  streakOnDay,
  XP_HISTORY_DAYS,
  type FamilySnapshot
} from "../services/familyCode";
import { FamilySheet } from "../ui/screens";
import { homeworkDueLine, sortHomework, type HomeworkView } from "../ui/screens/HomeworkParts";
import { makeUser } from "./testUtils";

const SNAPSHOT: FamilySnapshot = {
  id: "ab12cd34",
  date: "2026-10-28",
  lastLearnedDate: "2026-10-27",
  streakDays: 6,
  totalXp: 1234,
  lessonsDone: 41,
  stars: 77,
  weekXp: [0, 20, 35, 0, 10, 50, 0],
  topicsDone: { foundation: 12, prayer: 3, hadith: 1 }
};

const TOPICS = [
  { topicId: "foundation" as const, title: "Foundation", accent: "#21B573", total: 20 },
  { topicId: "prayer" as const, title: "Prayer", accent: "#2FA8FF", total: 10 },
  { topicId: "hajj" as const, title: "Hajj", accent: "#FF8A1F", total: 8 }
];

function localToday() {
  const now = new Date();
  return `${now.getFullYear()}-${`${now.getMonth() + 1}`.padStart(2, "0")}-${`${now.getDate()}`.padStart(2, "0")}`;
}

describe("family code", () => {
  it("round-trips a snapshot and finds the code inside a whole message", () => {
    const code = encodeFamilyCode(SNAPSHOT);
    expect(code).toMatch(/^MUSLIMO-1-AB12CD34-[0-9A-Z.]+-[0-9A-Z]{2}$/);
    expect(decodeFamilyCode(code)).toEqual(SNAPSHOT);
    // Pasted with the message around it, a line break in the middle and in lower case.
    const pasted = `My Muslimo progress. Paste this: ${code.slice(0, 20)}\n${code.slice(20).toLowerCase()} thanks`;
    expect(decodeFamilyCode(pasted)).toEqual(SNAPSHOT);
  });

  it("holds no name or email, only numbers", () => {
    const code = encodeFamilyCode(SNAPSHOT);
    expect(code.split("-").slice(3, 4)[0]).toMatch(/^[0-9A-Z.]+$/);
    expect(code.length).toBeLessThan(110);
  });

  it("refuses a code with a changed digit", () => {
    const code = encodeFamilyCode(SNAPSHOT);
    const parts = code.split("-");
    parts[3] = parts[3].replace(/^[0-9A-Z]/, (digit) => (digit === "9" ? "8" : "9"));
    expect(decodeFamilyCode(parts.join("-"))).toBeUndefined();
    expect(decodeFamilyCode("hello")).toBeUndefined();
  });

  it("keeps two weeks of daily XP and reads the last 7 days", () => {
    let history: Record<string, number> | undefined;
    history = logDailyXp(history, "2026-10-01", 5);
    history = logDailyXp(history, "2026-10-27", 10);
    history = logDailyXp(history, "2026-10-28", 7);
    history = logDailyXp(history, "2026-10-28", 3);
    expect(history).toEqual({ "2026-10-27": 10, "2026-10-28": 10 });
    expect(Object.keys(logDailyXp({}, "2026-10-28", 1)).length).toBeLessThanOrEqual(XP_HISTORY_DAYS);
    expect(recentDailyXp({ xpByDay: history }, "2026-10-28")).toEqual([0, 0, 0, 0, 0, 10, 10]);
    // An old save only knows today.
    expect(recentDailyXp({ dailyXp: { date: "2026-10-28", xp: 9 } }, "2026-10-28")).toEqual([0, 0, 0, 0, 0, 0, 9]);
  });

  it("logs each day's XP as it is earned", () => {
    const user = addXp(addXp(makeUser({ totalXp: 0 }), 10, new Date(2026, 9, 27, 12)), 4, new Date(2026, 9, 28, 9));
    expect(user.xpByDay).toEqual({ "2026-10-27": 10, "2026-10-28": 4 });
    expect(user.totalXp).toBe(14);
  });

  it("builds the report from the profile, with the streak ended once a day is missed", () => {
    const snapshot = buildFamilySnapshot({
      id: "zz99",
      today: "2026-10-28",
      user: makeUser({ streakDays: 3, totalXp: 50, lastStreakDate: "2026-10-28", xpByDay: { "2026-10-28": 20 } }),
      stars: 4,
      topicsDone: { foundation: 2 }
    });
    expect(snapshot.weekXp).toEqual([0, 0, 0, 0, 0, 0, 20]);
    expect(snapshot.lessonsDone).toBe(3);
    expect(streakOnDay(snapshot, "2026-10-29")).toBe(3);
    expect(streakOnDay(snapshot, "2026-10-30")).toBe(0);
  });

  it("adds a child, updates them from a newer code and ignores an older one", () => {
    const first = addFamilyKid([], encodeFamilyCode(SNAPSHOT), "  Aisha  ", "other1", "2026-10-28T10:00:00Z");
    expect(first.status).toBe("added");
    expect(first.kids[0].nickname).toBe("Aisha");

    const newer = addFamilyKid(first.kids, encodeFamilyCode({ ...SNAPSHOT, date: "2026-10-30", totalXp: 1300 }), "", "other1", "now");
    expect(newer.status).toBe("updated");
    expect(newer.kids).toHaveLength(1);
    expect(newer.kids[0].nickname).toBe("Aisha");
    expect(newer.kids[0].snapshot.totalXp).toBe(1300);

    expect(addFamilyKid(newer.kids, encodeFamilyCode(SNAPSHOT), "", "other1", "now").status).toBe("older");
    expect(addFamilyKid([], encodeFamilyCode(SNAPSHOT), "", "AB12CD34", "now").status).toBe("self");
    expect(addFamilyKid([], "nope", "", undefined, "now").status).toBe("invalid");
    expect(readFamilyKids(JSON.stringify(newer.kids))).toEqual(newer.kids);
    expect(readFamilyKids("{bad")).toEqual([]);
  });
});

describe("Family sheet", () => {
  function props(overrides: Partial<React.ComponentProps<typeof FamilySheet>> = {}): React.ComponentProps<typeof FamilySheet> {
    return {
      visible: true,
      onClose: jest.fn(),
      report: SNAPSHOT,
      onShareReport: jest.fn(() => "MUSLIMO-1-CODE"),
      topics: TOPICS,
      kids: [],
      onAddKid: jest.fn(() => "added" as const),
      onRemoveKid: jest.fn(),
      today: "2026-10-28",
      kidsMode: false,
      onKidsModeChange: jest.fn(),
      ...overrides
    };
  }

  it("shows the week, the stats and only the topics started", async () => {
    await render(<FamilySheet {...props()} />);
    expect(screen.getByTestId("family-report-week-xp")).toHaveTextContent("115 XP");
    expect(screen.getByTestId("family-report-days")).toHaveTextContent("4 of 7 days · Learned yesterday");
    expect(screen.getByTestId("family-report-streak")).toHaveTextContent(/^6Day streak$/);
    expect(screen.getByTestId("family-report-topic-foundation")).toHaveTextContent("Foundation12/20");
    expect(screen.getByTestId("family-report-topic-prayer")).toBeTruthy();
    expect(screen.queryByTestId("family-report-topic-hajj")).toBeNull();
  });

  it("sends the report and shows the code to copy", async () => {
    const onShareReport = jest.fn(() => "MUSLIMO-1-CODE");
    await render(<FamilySheet {...props({ onShareReport })} />);
    await act(async () => fireEvent.press(screen.getByTestId("family-share")));
    expect(onShareReport).toHaveBeenCalled();
    expect(screen.getByTestId("family-code-text")).toHaveTextContent("MUSLIMO-1-CODE");
  });

  it("opens on My kids for a parent, with the add form ready", async () => {
    const onAddKid = jest.fn(() => "invalid" as const);
    await render(<FamilySheet {...props({ initialTab: "kids", onAddKid })} />);
    expect(screen.getByTestId("family-add-form")).toBeTruthy();
    await act(async () => fireEvent.changeText(screen.getByTestId("family-paste"), "junk"));
    await act(async () => fireEvent.press(screen.getByTestId("family-add")));
    expect(onAddKid).toHaveBeenCalledWith("junk", "");
    expect(screen.getByTestId("family-paste-error")).toHaveTextContent("That code didn't work. Paste the whole message.");
  });

  it("lists a followed child and removes them after asking", async () => {
    const onRemoveKid = jest.fn();
    const kid = { nickname: "Yusuf", snapshot: { ...SNAPSHOT, date: "2026-10-26" }, addedAt: "2026-10-26T00:00:00Z" };
    await render(<FamilySheet {...props({ initialTab: "kids", kids: [kid], onRemoveKid })} />);
    expect(screen.getByTestId("family-kid-ab12cd34")).toHaveTextContent(/Yusuf/);
    expect(screen.getByTestId("family-kid-ab12cd34")).toHaveTextContent(/Updated 2 days ago/);
    // Last lesson the 27th, seen on the 28th: the streak still holds.
    await act(async () => fireEvent.press(screen.getByTestId("family-kid-ab12cd34-open")));
    expect(screen.getByTestId("family-kid-ab12cd34-report-streak")).toHaveTextContent(/^6Day streak$/);
    await act(async () => fireEvent.press(screen.getByTestId("family-kid-ab12cd34-remove")));
    expect(onRemoveKid).not.toHaveBeenCalled();
    await act(async () => fireEvent.press(screen.getByTestId("family-kid-ab12cd34-remove-yes")));
    expect(onRemoveKid).toHaveBeenCalledWith("ab12cd34");
  });
});

describe("Family sheet: Kids mode and live links", () => {
  function props(overrides: Partial<React.ComponentProps<typeof FamilySheet>> = {}): React.ComponentProps<typeof FamilySheet> {
    return {
      visible: true,
      onClose: jest.fn(),
      report: SNAPSHOT,
      onShareReport: jest.fn(() => "MUSLIMO-1-CODE"),
      topics: TOPICS,
      kids: [],
      onAddKid: jest.fn(() => "added" as const),
      onRemoveKid: jest.fn(),
      today: "2026-10-28",
      kidsMode: false,
      onKidsModeChange: jest.fn(),
      ...overrides
    };
  }

  function live(overrides: Partial<NonNullable<React.ComponentProps<typeof FamilySheet>["live"]>> = {}) {
    return {
      signedIn: true,
      kids: [],
      parents: [],
      onMakeCode: jest.fn(async () => ({ code: "ABC234" })),
      onLinkKid: jest.fn(async () => undefined as string | undefined),
      onRemoveKid: jest.fn(),
      onRemoveParent: jest.fn(),
      onSignIn: jest.fn(),
      ...overrides
    };
  }

  it("turns Kids mode on and off", async () => {
    const onKidsModeChange = jest.fn();
    await render(<FamilySheet {...props({ onKidsModeChange })} />);
    expect(screen.getByTestId("family-kids-mode")).toHaveTextContent(/Off:/);
    await act(async () => fireEvent.press(screen.getByTestId("family-kids-mode-toggle")));
    expect(onKidsModeChange).toHaveBeenCalledWith(true);
  });

  it("gets a code for a parent and lists the parents linked", async () => {
    const links = live({ parents: [{ id: 7, name: "Mum", avatarInitials: "M" }] });
    await render(<FamilySheet {...props({ live: links })} />);
    await act(async () => fireEvent.press(screen.getByTestId("family-link-code-make")));
    expect(screen.getByTestId("family-link-code-text")).toHaveTextContent("ABC234");
    expect(screen.getByTestId("family-parent-7")).toHaveTextContent(/Mum/);
    await act(async () => fireEvent.press(screen.getByTestId("family-parent-7-remove")));
    await act(async () => fireEvent.press(screen.getByTestId("family-parent-7-remove-yes")));
    expect(links.onRemoveParent).toHaveBeenCalledWith(7);
  });

  it("asks a signed-out learner to sign in first", async () => {
    const links = live({ signedIn: false });
    await render(<FamilySheet {...props({ live: links })} />);
    expect(screen.queryByTestId("family-link-code-make")).toBeNull();
    await act(async () => fireEvent.press(screen.getByTestId("family-link-sign-in")));
    expect(links.onSignIn).toHaveBeenCalled();
  });

  it("links a child with their code, shows an error, and lists live kids", async () => {
    const onLinkKid = jest.fn(async (code: string) => (code === "BAD" ? "That code didn't work. Ask for a new one." : undefined));
    const liveKid = { nickname: "Yusuf", snapshot: { ...SNAPSHOT, id: "live-12", date: "2026-10-28" }, addedAt: "" };
    const links = live({ onLinkKid, kids: [liveKid] });
    await render(<FamilySheet {...props({ initialTab: "kids", live: links })} />);
    expect(screen.getByTestId("family-kid-live-12")).toHaveTextContent(/Live · Learned yesterday/);

    await act(async () => fireEvent.changeText(screen.getByTestId("family-link-kid-code"), "bad"));
    await act(async () => fireEvent.press(screen.getByTestId("family-link-kid-go")));
    expect(onLinkKid).toHaveBeenCalledWith("BAD");
    expect(screen.getByTestId("family-link-kid-code-error")).toHaveTextContent("That code didn't work. Ask for a new one.");

    await act(async () => fireEvent.changeText(screen.getByTestId("family-link-kid-code"), "abc234"));
    await act(async () => fireEvent.press(screen.getByTestId("family-link-kid-go")));
    expect(screen.getByTestId("family-added")).toHaveTextContent("Linked!");

    await act(async () => fireEvent.press(screen.getByTestId("family-kid-live-12-open")));
    await act(async () => fireEvent.press(screen.getByTestId("family-kid-live-12-remove")));
    await act(async () => fireEvent.press(screen.getByTestId("family-kid-live-12-remove-yes")));
    expect(links.onRemoveKid).toHaveBeenCalledWith(12);
  });
});

describe("Family sheet: homework from a parent or teacher", () => {
  const HOMEWORK_TOPICS = [
    { topicId: "prayer", title: "Prayer", accent: "#2FA8FF", units: [
      { id: "wudu", title: "Wudu step by step", nodeIds: ["w1", "w2", "w3"] },
      { id: "salah", title: "How to pray", nodeIds: ["p1", "p2"] }
    ] },
    { topicId: "manners", title: "Manners", accent: "#FF8A1F", units: [{ id: "salam", title: "Saying salam", nodeIds: ["s1"] }] }
  ];
  const view = (overrides: Partial<HomeworkView> = {}): HomeworkView => ({
    id: 1, topicId: "prayer", unitId: "wudu", title: "Wudu step by step", topicTitle: "Prayer", accent: "#2FA8FF",
    doneCount: 1, total: 3, done: false, dueDate: "2026-10-30", setByName: "Ustadha Amina", ...overrides
  });
  function sheet(live: Partial<NonNullable<React.ComponentProps<typeof FamilySheet>["live"]>>, initialTab: "report" | "kids" = "kids") {
    return (
      <FamilySheet
        visible
        onClose={jest.fn()}
        report={SNAPSHOT}
        onShareReport={jest.fn(() => "MUSLIMO-1-CODE")}
        topics={TOPICS}
        kids={[]}
        onAddKid={jest.fn(() => "added" as const)}
        onRemoveKid={jest.fn()}
        today="2026-10-28"
        kidsMode={false}
        onKidsModeChange={jest.fn()}
        initialTab={initialTab}
        live={{
          signedIn: true, kids: [], parents: [], onMakeCode: jest.fn(async () => ({ code: "ABC234" })), onLinkKid: jest.fn(async () => undefined),
          onRemoveKid: jest.fn(), onRemoveParent: jest.fn(), onSignIn: jest.fn(), ...live
        }}
      />
    );
  }

  it("says when homework is due, late or done", () => {
    expect(homeworkDueLine({ done: false, dueDate: "2026-10-28" }, "2026-10-28")).toBe("Due today");
    expect(homeworkDueLine({ done: false, dueDate: "2026-10-29" }, "2026-10-28")).toBe("Due tomorrow");
    expect(homeworkDueLine({ done: false, dueDate: "2026-11-04" }, "2026-10-28")).toBe("Due in 7 days");
    expect(homeworkDueLine({ done: false, dueDate: "2026-10-27" }, "2026-10-28")).toBe("1 day late");
    expect(homeworkDueLine({ done: false, dueDate: "2026-10-25" }, "2026-10-28")).toBe("3 days late");
    expect(homeworkDueLine({ done: true, dueDate: "2026-10-25" }, "2026-10-28")).toBe("Done!");
    expect(homeworkDueLine({ done: false, dueDate: null }, "2026-10-28")).toBe("No due date");
    const sorted = sortHomework([view({ id: 1, done: true }), view({ id: 2, dueDate: null }), view({ id: 3, dueDate: "2026-10-29" })]);
    expect(sorted.map((entry) => entry.id)).toEqual([3, 2, 1]);
  });

  it("lets a grown-up see a learner's homework and give a new unit with a due day", async () => {
    const onGiveHomework = jest.fn(async () => undefined as string | undefined);
    const onRemoveHomework = jest.fn();
    const kid = { nickname: "Yusuf", snapshot: { ...SNAPSHOT, id: "live-12" }, addedAt: "" };
    await render(sheet({
      kids: [kid],
      homeworkTopics: HOMEWORK_TOPICS,
      kidHomework: { "live-12": { views: [view(), view({ id: 2, unitId: "salam", title: "Saying salam", doneCount: 1, total: 1, done: true })], finishedNodeIds: ["w1", "s1"] } },
      onGiveHomework,
      onRemoveHomework
    }));
    // The closed card already says how much is left.
    expect(screen.getByTestId("family-kid-live-12-homework-open")).toHaveTextContent("Homework: 1 to do");
    await act(async () => fireEvent.press(screen.getByTestId("family-kid-live-12-open")));
    expect(screen.getByTestId("family-kid-live-12-homework-summary")).toHaveTextContent("1/2 done");
    expect(screen.getByTestId("family-kid-live-12-homework-1")).toHaveTextContent(/Wudu step by step.*1\/3 lessons.*Due in 2 days/);
    expect(screen.getByTestId("family-kid-live-12-homework-2-due")).toHaveTextContent("Done!");

    await act(async () => fireEvent.press(screen.getByTestId("family-kid-live-12-give-open")));
    expect(screen.getByTestId("family-kid-live-12-give-go").props.accessibilityState?.disabled).toBe(true);
    await act(async () => fireEvent.press(screen.getByTestId("family-kid-live-12-give-topic-prayer")));
    // A unit that is already their homework can't be picked twice.
    expect(screen.getByTestId("family-kid-live-12-give-unit-wudu")).toHaveTextContent(/Already homework/);
    await act(async () => fireEvent.press(screen.getByTestId("family-kid-live-12-give-unit-salah")));
    await act(async () => fireEvent.press(screen.getByTestId("family-kid-live-12-give-due-3")));
    await act(async () => fireEvent.press(screen.getByTestId("family-kid-live-12-give-go")));
    expect(onGiveHomework).toHaveBeenCalledWith(12, { topicId: "prayer", unitId: "salah", nodeIds: ["p1", "p2"], dueDate: "2026-10-31" });
    expect(screen.getByTestId("family-kid-live-12-homework-given")).toHaveTextContent("Homework given!");

    await act(async () => fireEvent.press(screen.getByTestId("family-kid-live-12-homework-1-remove")));
    await act(async () => fireEvent.press(screen.getByTestId("family-kid-live-12-homework-1-remove-yes")));
    expect(onRemoveHomework).toHaveBeenCalledWith(1);
  });

  it("shows a learner their homework and who gave it, and opens it", async () => {
    const onOpenHomework = jest.fn();
    await render(sheet({ myHomework: [view()], onOpenHomework }, "report"));
    expect(screen.getByTestId("family-my-homework")).toHaveTextContent(/From Ustadha Amina/);
    await act(async () => fireEvent.press(screen.getByTestId("family-my-homework-1-open")));
    expect(onOpenHomework).toHaveBeenCalledWith(expect.objectContaining({ unitId: "wudu" }));
  });
});

describe("Family in the app", () => {
  async function press(testID: string) {
    await act(async () => {
      fireEvent.press(screen.getByTestId(testID));
    });
  }

  async function passGate() {
    const [a, b] = (String(screen.getByTestId("grownup-question").props.children).match(/\d+/g) ?? []).map(Number);
    await press(`grownup-option-${a * b}`);
  }

  beforeEach(() => {
    removeStoredItem("sira-path-family-id");
    removeStoredItem("sira-path-family-kids");
  });

  it("opens behind the grown-up check and shares a code a parent's phone can read", async () => {
    const share = jest.spyOn(Share, "share").mockResolvedValue({ action: "sharedAction" });
    const today = localToday();
    setStoredItem("sira-path-user-profile", JSON.stringify(makeUser({ streakDays: 2, lastStreakDate: today, xpByDay: { [today]: 25 } })));
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    await press("tab-me");
    await press("profile-family");
    expect(screen.getByTestId("grownup-question")).toBeTruthy();
    expect(screen.queryByTestId("family-share")).toBeNull();
    await passGate();
    expect(screen.getByTestId("family-report-week-xp")).toHaveTextContent("25 XP");

    await press("family-share");
    expect(share).toHaveBeenCalledTimes(1);
    const message = (share.mock.calls[0][0] as { message: string }).message;
    const snapshot = decodeFamilyCode(message);
    expect(snapshot?.id).toBe(getStoredItem("sira-path-family-id"));
    expect(snapshot?.weekXp[6]).toBe(25);
    expect(snapshot?.streakDays).toBe(2);
    // Nothing about who the learner is.
    expect(message).not.toMatch(/@|New Learner/);

    // The same phone can't follow itself.
    await press("family-tab-kids");
    await act(async () => fireEvent.changeText(screen.getByTestId("family-paste"), message));
    await press("family-add");
    expect(screen.getByTestId("family-paste-error")).toHaveTextContent("That code is from this phone.");

    // A code from another phone is saved for next time.
    await act(async () => fireEvent.changeText(screen.getByTestId("family-paste"), encodeFamilyCode(SNAPSHOT)));
    await act(async () => fireEvent.changeText(screen.getByTestId("family-nickname"), "Aisha"));
    await press("family-add");
    expect(screen.getByTestId("family-added")).toHaveTextContent("Added!");
    expect(screen.getByTestId("family-kid-ab12cd34")).toHaveTextContent(/Aisha/);
    expect(readFamilyKids(getStoredItem("sira-path-family-kids"))[0].nickname).toBe("Aisha");
    share.mockRestore();
  });

  it("turns Kids mode on for a young learner: no marriage topic, and a grown-up can turn it off", async () => {
    setStoredItem("sira-path-user-profile", JSON.stringify(makeUser()));
    setStoredItem("sira-path-age-group", "6-9");
    removeStoredItem("sira-path-kids-mode");
    try {
      await render(<TopicApp />);
      await screen.findByTestId("learn-path-foundation");
      await press("top-bar-topic");
      expect(screen.getByTestId("topic-tile-prayer")).toBeTruthy();
      expect(screen.queryByTestId("topic-tile-marriage")).toBeNull();
      await press("topic-picker-close");

      await press("tab-me");
      await press("profile-family");
      await passGate();
      expect(screen.getByTestId("family-kids-mode")).toHaveTextContent(/On:/);
      await press("family-kids-mode-toggle");
      expect(getStoredItem("sira-path-kids-mode")).toBe("off");
      expect(screen.getByTestId("family-kids-mode")).toHaveTextContent(/Off:/);
      await press("family-close");

      await press("tab-learn");
      await press("top-bar-topic");
      expect(screen.getByTestId("topic-tile-marriage")).toBeTruthy();
    } finally {
      removeStoredItem("sira-path-age-group");
      removeStoredItem("sira-path-kids-mode");
    }
  });
});
