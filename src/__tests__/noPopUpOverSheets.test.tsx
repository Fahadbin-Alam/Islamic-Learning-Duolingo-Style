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
jest.mock("../services/ayahPlayer", () => ({
  ...jest.requireActual("../services/ayahPlayer"),
  playAyah: jest.fn(),
  stopAyah: jest.fn()
}));
jest.mock("../services/adhkarReminders", () => ({
  ...jest.requireActual("../services/adhkarReminders"),
  onAdhkarReminderOpened: jest.fn(() => () => undefined)
}));

import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import TopicApp from "../TopicApp";
import { localDayNumber } from "../data/dailyCard";
import { onAdhkarReminderOpened } from "../services/adhkarReminders";
import { removeStoredItem, setStoredItem } from "../services/appStorage";
import { makeUser } from "./testUtils";

// Bug hunt 9 of "make the app better and more fun": things that pop up by themselves (today's ayah and hadith on the
// day's first open, a guest's "Save your progress!" after 3 minutes) wait while another sheet is open. Some sheets
// were missing from the ones they wait for, so they could pop up on top of the adhkar, today's quests or the card
// of the day itself.

const SAVE = "Save your progress!";
/** A guest's 3 minutes, made 5 seconds here: minutes of the path's moving pictures are too heavy to run through. */
const GUEST_WAIT = 5000;

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

async function wait(ms: number) {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, ms));
  });
}

let timers: jest.SpyInstance | undefined;
beforeEach(() => {
  setStoredItem("sira-path-user-profile", JSON.stringify(makeUser({ preferredLanguage: "en" })));
  setStoredItem("sira-path-age-group", "18+");
  setStoredItem("sira-path-learner-background", "muslim");
  removeStoredItem("sira-path-daily-shown");
  const realSetTimeout = global.setTimeout;
  timers = jest
    .spyOn(global, "setTimeout")
    .mockImplementation(((handler: () => void, timeout?: number, ...rest: unknown[]) =>
      realSetTimeout(handler, timeout === 180000 ? GUEST_WAIT : timeout, ...rest)) as unknown as typeof setTimeout);
});

afterEach(() => {
  timers?.mockRestore();
  removeStoredItem("sira-path-user-profile");
  removeStoredItem("sira-path-daily-seen");
});

describe("nothing pops up over another sheet", () => {
  it("opened from the morning adhkar reminder, today's card waits until the adhkar are closed", async () => {
    jest.mocked(onAdhkarReminderOpened).mockImplementationOnce((onOpen) => {
      onOpen("morning");
      return () => undefined;
    });
    setStoredItem("sira-path-daily-seen", "0");
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    await wait(1500);
    expect(screen.getByTestId("adhkar-sheet")).toBeTruthy();
    expect(screen.queryByTestId("daily-hadith")).toBeNull();

    await press("adhkar-close");
    await wait(1500);
    expect(screen.getByTestId("daily-hadith")).toBeTruthy();
  });

  it("a guest's save-your-progress card waits while today's quests are open", async () => {
    setStoredItem("sira-path-daily-seen", String(localDayNumber()));
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    await press("path-quests-banner");
    expect(screen.getByTestId("quests-sheet")).toBeTruthy();
    await wait(GUEST_WAIT + 500);
    expect(screen.queryByText(SAVE)).toBeNull();

    await press("quests-ok");
    expect(screen.getByText(SAVE)).toBeTruthy();
  });

  it("and waits while today's ayah and hadith are open", async () => {
    setStoredItem("sira-path-daily-seen", "0");
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    await wait(1500);
    expect(screen.getByTestId("daily-hadith")).toBeTruthy();
    await wait(GUEST_WAIT);
    expect(screen.queryByText(SAVE)).toBeNull();

    await press("daily-close");
    expect(screen.getByText(SAVE)).toBeTruthy();
  });
});
