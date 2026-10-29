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
import { setActiveLanguage } from "../i18n";
import { setStoredItem } from "../services/appStorage";
import { APP_STORE_URL, PLAY_STORE_URL, inviteMessage } from "../services/shareApp";
import { makeUser } from "./testUtils";

describe("invite message", () => {
  afterEach(() => setActiveLanguage("en"));

  it("sends the Play link from Android, and both stores from an iPhone", () => {
    const android = inviteMessage("android", false);
    expect(android).toContain("Learn Islam with me on Muslimo!");
    expect(android).toContain(PLAY_STORE_URL);
    expect(android).not.toContain(APP_STORE_URL);
    const iphone = inviteMessage("ios", false);
    expect(iphone).toContain(`Android: ${PLAY_STORE_URL}`);
    expect(iphone).toContain(`iPhone: ${APP_STORE_URL}`);
    expect(inviteMessage("android", true)).toContain(APP_STORE_URL);
  });

  it("is translated and keeps the link", () => {
    setActiveLanguage("bn");
    const message = inviteMessage("android", false);
    expect(message).toMatch(/[ঀ-৿]/);
    expect(message).toContain(PLAY_STORE_URL);
  });
});

describe("Invite friends in the app", () => {
  async function press(testID: string) {
    await act(async () => {
      fireEvent.press(screen.getByTestId(testID));
    });
  }

  it("asks a grown-up first, then opens the phone's share menu with the invite", async () => {
    const share = jest.spyOn(Share, "share").mockResolvedValue({ action: "sharedAction" });
    setStoredItem("sira-path-user-profile", JSON.stringify(makeUser()));
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    await press("tab-me");
    await press("profile-share");
    expect(share).not.toHaveBeenCalled();
    const [a, b] = (String(screen.getByTestId("grownup-question").props.children).match(/\d+/g) ?? []).map(Number);
    await press(`grownup-option-${a * b}`);
    expect(share).toHaveBeenCalledTimes(1);
    const { message } = share.mock.calls[0][0] as { message: string };
    expect(message).toContain(PLAY_STORE_URL);
    share.mockRestore();
  });
});
