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
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import TopicApp from "../TopicApp";
import { learningApi } from "../api/islamicLearningApi";
import { getBranchArabic, getNodeArabic } from "../data/arabicTerms";
import { COURSE, LESSONS_BY_ID } from "../data/course";
import { BACKGROUND_KEY, INTRO, introStartFor } from "../data/introToIslam";
import { quranAyahArabic } from "../data/quranAyahs";
import { getStoredItem, removeStoredItem, setStoredItem } from "../services/appStorage";
import { PortalHost } from "../ui/Portal";
import { BackgroundSheet } from "../ui/screens";
import { makeUser } from "./testUtils";

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

describe("New to Islam path", () => {
  const section = COURSE.sections.find((item) => item.topicId === "intro")!;

  it("is a topic of four units, each opening on its own first lesson", () => {
    expect(section.branches.map((branch) => branch.id)).toEqual(["intro-basics", "intro-prophets", "intro-together", "intro-first-steps"]);
    const statuses = learningApi.getPathNodes(makeUser()).filter((node) => node.topicId === "intro");
    for (const branch of section.branches) {
      const unit = statuses.filter((node) => node.branchId === branch.id);
      expect(unit[0].status).toMatch(/current|available/);
      expect(unit.slice(1).every((node) => node.status === "locked")).toBe(true);
    }
  });

  it("cites only the Quran and checked hadith, and gives every lesson its own Arabic", () => {
    for (const node of section.nodes) {
      const lesson = LESSONS_BY_ID[node.lessonIds[0]];
      expect(lesson.learnSource?.url).toMatch(/^https:\/\/(quran\.com\/\d+\/\d+(-\d+)?|sunnah\.com\/bukhari:\d+)$/);
      expect(lesson.challenges.length).toBe(2);
      expect(getNodeArabic(node.id)?.ar).toBeTruthy();
      // An ayah quote is the ayah's own Arabic.
      if (lesson.quote && lesson.learnSource?.category === "tafsir") {
        expect(lesson.quote.text).toBe(quranAyahArabic(lesson.learnSource.reference));
      }
    }
    for (const branch of section.branches) expect(getBranchArabic(branch.id)).toBe(INTRO.branchArabic[branch.id]);
  });

  it("starts each kind of learner in the unit that fits them", () => {
    expect(introStartFor("muslim")).toBeUndefined();
    expect(introStartFor("christian")).toEqual({ unitId: "intro-prophets", nodeId: "intro-all-prophets" });
    expect(introStartFor("jewish")?.unitId).toBe("intro-prophets");
    expect(introStartFor("new_muslim")).toEqual({ unitId: "intro-first-steps", nodeId: "intro-shahadah" });
    expect(introStartFor("curious")).toEqual({ unitId: "intro-basics", nodeId: "intro-one-god" });
  });
});

describe("BackgroundSheet", () => {
  it("picks nothing for the learner and saves only the answer they tap", async () => {
    const onSave = jest.fn();
    await render(
      <PortalHost>
        <BackgroundSheet visible onSave={onSave} />
      </PortalHost>
    );

    await fireEvent.press(screen.getByTestId("background-save"));
    expect(onSave).not.toHaveBeenCalled();
    await fireEvent.press(screen.getByTestId("background-christian"));
    await fireEvent.press(screen.getByTestId("background-save"));
    expect(onSave).toHaveBeenCalledWith("christian");
  });
});

describe("Tell us about you, on first launch", () => {
  beforeEach(() => {
    removeStoredItem(BACKGROUND_KEY);
    setStoredItem("sira-path-age-group", "18+");
  });
  afterEach(() => removeStoredItem("sira-path-age-group"));

  it("sends a Christian to the prophets they know, on the New to Islam path", async () => {
    setStoredItem("sira-path-user-profile", JSON.stringify(makeUser({ preferredLanguage: "en", completedNodeIds: [], completedLessonIds: [] })));
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    expect(screen.getByTestId("background-sheet")).toBeTruthy();

    await press("background-christian");
    await press("background-save");
    expect(getStoredItem(BACKGROUND_KEY)).toBe("christian");
    await screen.findByTestId("learn-path-intro");
    await waitFor(() => expect(screen.queryByTestId("background-sheet")).toBeNull());
    const saved = JSON.parse(getStoredItem("sira-path-user-profile") ?? "{}");
    expect(saved.lastTopicId).toBe("intro");
    expect(saved.pathFocusIds?.intro).toBe("intro-all-prophets");
  });

  it("keeps a Muslim on the usual path", async () => {
    setStoredItem("sira-path-user-profile", JSON.stringify(makeUser({ preferredLanguage: "en", completedNodeIds: [], completedLessonIds: [] })));
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    await press("background-muslim");
    await press("background-save");
    await waitFor(() => expect(screen.queryByTestId("background-sheet")).toBeNull());
    expect(screen.getByTestId("learn-path-foundation")).toBeTruthy();
    expect(getStoredItem(BACKGROUND_KEY)).toBe("muslim");
  });

  it("does not ask a learner who has already done lessons", async () => {
    setStoredItem("sira-path-user-profile", JSON.stringify(makeUser({ preferredLanguage: "en", completedNodeIds: ["foundation-niyyah"] })));
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    expect(screen.queryByTestId("background-sheet")).toBeNull();
  });
});
