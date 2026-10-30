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
import { Text } from "react-native";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import TopicApp from "../TopicApp";
import { learningApi, localDateKey } from "../api/islamicLearningApi";
import {
  ANALYTICS_CONFIG,
  __analyticsTesting,
  ageBandFor,
  flushAnalytics,
  isUsageStatsOn,
  reportError,
  setAnalyticsContext,
  setUsageStatsOn,
  startAnalytics,
  track
} from "../services/analytics";
import { removeStoredItem, setStoredItem } from "../services/appStorage";
import { clearActiveAssessment } from "../services/localProgress";
import type { Challenge, LearningNodeView, UserProfile } from "../types";
import { CrashScreen } from "../ui/CrashScreen";
import { SettingsSheet } from "../ui/screens/SettingsSheet";
import { makeUser } from "./testUtils";

// Anonymous usage stats and crash reports (services/analytics): what is kept, what is sent, and what never is.

const PROFILE_KEY = "sira-path-user-profile";
const sent: Array<{ api_key: string; batch: Array<{ event: string; properties: Record<string, any> }> }> = [];
let online = true;
let status = 200;

beforeEach(() => {
  ANALYTICS_CONFIG.apiKey = "phc_test";
  removeStoredItem("sira-path-analytics");
  removeStoredItem("sira-path-analytics-queue");
  __analyticsTesting.reset();
  sent.length = 0;
  online = true;
  status = 200;
  __analyticsTesting.setFetch(async (_url, init) => {
    if (!online) throw new Error("Network request failed");
    if (status === 200) sent.push(JSON.parse(init.body));
    return { ok: status === 200, status };
  });
});

afterAll(() => {
  ANALYTICS_CONFIG.apiKey = "";
});

const events = () => __analyticsTesting.queued().map((item) => item.event);

describe("usage stats", () => {
  it("keep and send nothing without a key", async () => {
    ANALYTICS_CONFIG.apiKey = "";
    track("lesson_start");
    reportError(new Error("boom"));
    await flushAnalytics();
    expect(events()).toEqual([]);
    expect(sent).toEqual([]);
  });

  it("give 13 and over a random id for this phone, and under 13 (or an age not yet given) none at all", async () => {
    setAnalyticsContext({ ageBand: "18+" });
    track("app_open");
    track("app_open");
    setAnalyticsContext({ ageBand: "under13" });
    track("app_open");
    setAnalyticsContext({ ageBand: "unknown" });
    track("app_open");
    await flushAnalytics();

    const [adultA, adultB, kid, unknown] = sent[0].batch.map((item) => item.properties);
    expect(sent[0].api_key).toBe("phc_test");
    expect(adultA.distinct_id).toBe(adultB.distinct_id);
    expect(adultA.days_since_install).toBe(0);
    expect(kid.distinct_id).not.toBe(adultA.distinct_id);
    expect(unknown.distinct_id).not.toBe(adultA.distinct_id);
    expect(kid.distinct_id).not.toBe(unknown.distinct_id);
    expect(kid.days_since_install).toBeUndefined();
    expect(kid.age_band).toBe("under13");
    // No person profiles, no location from the phone's address.
    expect(adultA.$process_person_profile).toBe(false);
    expect(adultA.$geoip_disable).toBe(true);
  });

  it("wait on the phone while offline and go once there is a connection", async () => {
    online = false;
    track("lesson_start", { lesson_id: "a" });
    track("lesson_quit", { lesson_id: "a" });
    await flushAnalytics();
    expect(events()).toEqual(["lesson_start", "lesson_quit"]);

    // The app was closed: the next open still has them.
    __analyticsTesting.reset();
    expect(events()).toEqual(["lesson_start", "lesson_quit"]);

    online = true;
    await flushAnalytics();
    expect(events()).toEqual([]);
    expect(sent[0].batch.map((item) => item.event)).toEqual(["lesson_start", "lesson_quit"]);
  });

  it("are kept when the server is down, and dropped when it says the batch itself is bad", async () => {
    track("lesson_start");
    status = 503;
    await flushAnalytics();
    expect(events()).toEqual(["lesson_start"]);
    status = 400;
    await flushAnalytics();
    expect(events()).toEqual([]);
  });

  it("never fill the phone: past the limit the oldest usage events go, crash reports stay", () => {
    reportError(new Error("first crash"));
    online = false;
    for (let index = 0; index < ANALYTICS_CONFIG.maxQueue + 20; index += 1) track("tab_open");
    const queued = __analyticsTesting.queued();
    expect(queued).toHaveLength(ANALYTICS_CONFIG.maxQueue);
    expect(queued[0].event).toBe("$exception");
  });

  it("stop when turned off (what was waiting goes too), while crash reports still go with no id", async () => {
    online = false;
    track("lesson_start");
    reportError(new TypeError("undefined is not a function"), { fatal: true, where: "global" });
    setUsageStatsOn(false);
    expect(isUsageStatsOn()).toBe(false);
    track("lesson_quit");
    expect(events()).toEqual(["$exception"]);

    online = true;
    await flushAnalytics();
    const crash = sent[0].batch[0].properties;
    expect(crash.$exception_list[0]).toMatchObject({ type: "TypeError", value: "undefined is not a function", mechanism: { handled: false } });
    expect(crash.fatal).toBe(true);
    setUsageStatsOn(true);
    expect(isUsageStatsOn()).toBe(true);
  });

  it("catch crashes and still let the app's own crash handling run", () => {
    const previous = jest.fn();
    const errorUtils = (globalThis as any).ErrorUtils;
    const oldHandler = errorUtils.getGlobalHandler();
    errorUtils.setGlobalHandler(previous);
    online = false;
    const stop = startAnalytics();
    try {
      const error = new Error("render blew up");
      errorUtils.getGlobalHandler()(error, true);
      expect(previous).toHaveBeenCalledWith(error, true);
      expect(events()).toEqual(["app_open", "$exception"]);
    } finally {
      stop();
      errorUtils.setGlobalHandler(oldHandler);
    }
  });

  it("sort ages into bands, a kid account counting as under 13 whatever age it gave", () => {
    expect(ageBandFor("6-9")).toBe("under13");
    expect(ageBandFor("10-12")).toBe("under13");
    expect(ageBandFor("13-17")).toBe("13-17");
    expect(ageBandFor("18+", true)).toBe("under13");
    expect(ageBandFor(undefined)).toBe("unknown");
  });
});

describe("the crash screen", () => {
  function Broken({ fail }: { fail: { current: boolean } }) {
    if (fail.current) throw new Error("screen broke");
    return <Text>Path</Text>;
  }

  it("shows TRY AGAIN instead of a blank app, reports the crash, and brings the screen back", async () => {
    const fail = { current: true };
    const quiet = jest.spyOn(console, "error").mockImplementation(() => undefined);
    try {
      await render(
        <CrashScreen>
          <Broken fail={fail} />
        </CrashScreen>
      );
      expect(screen.getByTestId("crash-screen")).toBeTruthy();
      expect(screen.getByText("Your progress is safe.")).toBeTruthy();
      expect(__analyticsTesting.queued()[0]).toMatchObject({ event: "$exception", properties: { fatal: true, where: "screen" } });

      fail.current = false;
      await act(async () => {
        fireEvent.press(screen.getByTestId("crash-try-again"));
      });
      expect(screen.getByText("Path")).toBeTruthy();
    } finally {
      quiet.mockRestore();
    }
  });
});

describe("lesson stats in the app", () => {
  const hearts = (current: number) => ({ current, max: 5, unlimited: false, lastRefillDate: localDateKey() });

  async function press(testID: string) {
    await act(async () => {
      fireEvent.press(screen.getByTestId(testID));
    });
  }

  async function startFirstLesson(user: UserProfile) {
    setStoredItem(PROFILE_KEY, JSON.stringify(user));
    const node = learningApi.getPathNodes(user).find((item) => item.topicId === "foundation" && item.status === "current") as LearningNodeView;
    const challenges = (await learningApi.getLessonSession(node.firstLessonId, user)).lesson.challenges;
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    await press(`path-node-${node.id}`);
    await press("node-card-start");
    await press("learn-continue");
    return { node, challenges };
  }

  beforeEach(() => {
    online = false;
    setStoredItem("sira-path-plan-offer-at", String(Date.now()));
  });
  afterEach(() => {
    removeStoredItem(PROFILE_KEY);
    clearActiveAssessment();
  });

  it("count a lesson started and where it was left: after one question, by the X", async () => {
    const { node, challenges } = await startFirstLesson(makeUser({ hearts: hearts(5) }));
    const first: Challenge = challenges[0];
    await press(`choice-${first.correctChoiceId}`);
    await press("exercise-check");
    await press("feedback-continue");
    await press("lesson-close");
    await press("quit-end");

    const queued = __analyticsTesting.queued();
    const start = queued.find((item) => item.event === "lesson_start")!;
    const quit = queued.find((item) => item.event === "lesson_quit")!;
    expect(start.properties).toMatchObject({ lesson_id: node.firstLessonId, mode: "standard", questions: challenges.length });
    expect(quit.properties).toMatchObject({ lesson_id: node.firstLessonId, reason: "quit", screen: "lesson_question", questions_done: 1, mistakes: 0 });
    // Nothing about who is learning goes with them.
    expect(JSON.stringify(queued)).not.toContain(makeUser().username);
  });

  it("count a lesson finished, with its mistakes", async () => {
    const { node, challenges } = await startFirstLesson(makeUser({ hearts: hearts(5) }));
    for (const [index, challenge] of challenges.entries()) {
      const pick = index === 0 ? challenge.choices.find((choice) => choice.id !== challenge.correctChoiceId)!.id : challenge.correctChoiceId;
      await press(`choice-${pick}`);
      await press("exercise-check");
      await press("feedback-continue");
    }
    // The missed one comes back.
    await press(`choice-${challenges[0].correctChoiceId}`);
    await press("exercise-check");
    await press("feedback-continue");
    await screen.findByTestId("stat-stars");

    const done = __analyticsTesting.queued().find((item) => item.event === "lesson_complete")!;
    expect(done.properties).toMatchObject({ lesson_id: node.firstLessonId, mistakes: 1 });
    expect(events()).not.toContain("lesson_quit");
  });
});

// Last: an open sheet left behind by this render would hold up the full app above.
describe("the Settings switch", () => {
  const props = {
    visible: true,
    streakReminder: true,
    islamicReminder: true,
    dailyCheckIn: false,
    weeklyCheckIn: false,
    soundEnabled: true,
    softSound: false,
    onSelectRole: jest.fn(),
    onToggleStreak: jest.fn(),
    onToggleIslamic: jest.fn(),
    onToggleDaily: jest.fn(),
    onToggleWeekly: jest.fn(),
    onToggleSound: jest.fn(),
    onToggleSoftSound: jest.fn(),
    onSave: jest.fn(),
    onClose: jest.fn()
  };

  it("shows Share app stats with its promise, and nothing when there is nowhere to send stats", async () => {
    const onToggle = jest.fn();
    const view = await render(<SettingsSheet {...props} shareStats onToggleShareStats={onToggle} />);
    expect(screen.getByTestId("settings-stats").props.accessibilityState).toMatchObject({ checked: true });
    expect(screen.getByText("No names. Helps us fix bugs.")).toBeTruthy();
    fireEvent.press(screen.getByTestId("settings-stats"));
    expect(onToggle).toHaveBeenCalled();

    await view.rerender(<SettingsSheet {...props} />);
    expect(screen.queryByTestId("settings-stats")).toBeNull();
  });
});
