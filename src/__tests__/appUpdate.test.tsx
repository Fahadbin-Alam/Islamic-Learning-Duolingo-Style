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
jest.mock("../services/appUpdate", () => ({
  ...jest.requireActual("../services/appUpdate"),
  isUpdateAvailable: jest.fn(async () => false),
  openStore: jest.fn()
}));

import React from "react";
import { Linking } from "react-native";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import TopicApp from "../TopicApp";
import { setActiveLanguage } from "../i18n";
import { setStoredItem } from "../services/appStorage";
import * as appUpdate from "../services/appUpdate";
import { makeUser } from "./testUtils";

const actual = jest.requireActual("../services/appUpdate") as typeof appUpdate;
const site = require("../../site/app-version.json");

const reply = (body: unknown, ok = true) => async () => ({ ok, json: async () => body });
const byUrl = (routes: Record<string, unknown>) =>
  jest.fn(async (url: string) => {
    const key = Object.keys(routes).find((start) => url.startsWith(start));
    if (!key) throw new Error("offline");
    return { ok: true, json: async () => routes[key] };
  });

describe("checking the store for a newer build", () => {
  it("compares versions part by part", () => {
    expect(actual.compareVersions("1.0.10", "1.0.9")).toBe(1);
    expect(actual.compareVersions("1.0", "1.0.0")).toBe(0);
    expect(actual.compareVersions("1.0.0", "1.1")).toBe(-1);
  });

  it("finds an update on Android when the published build is higher", async () => {
    const fetcher = byUrl({ [actual.LATEST_BUILD_URL]: { android: { build: 13 }, ios: { build: 0 } } });
    expect(await actual.isUpdateAvailable({ os: "android", version: "1.0.0", build: "12" }, fetcher)).toBe(true);
    expect(await actual.isUpdateAvailable({ os: "android", version: "1.0.0", build: "13" }, fetcher)).toBe(false);
    expect(await actual.isUpdateAvailable({ os: "android", version: "1.0.0", build: "14" }, fetcher)).toBe(false);
  });

  it("finds an update on iPhone from the build file or from the App Store version", async () => {
    const fileOnly = byUrl({ [actual.LATEST_BUILD_URL]: { ios: { build: 9 } }, [actual.APP_STORE_LOOKUP_URL]: { results: [] } });
    expect(await actual.isUpdateAvailable({ os: "ios", version: "1.0.0", build: "8" }, fileOnly)).toBe(true);
    const storeOnly = byUrl({ [actual.LATEST_BUILD_URL]: { ios: { build: 0 } }, [actual.APP_STORE_LOOKUP_URL]: { results: [{ version: "1.0.1" }] } });
    expect(await actual.isUpdateAvailable({ os: "ios", version: "1.0.0", build: "8" }, storeOnly)).toBe(true);
    expect(await actual.isUpdateAvailable({ os: "ios", version: "1.0.1", build: "9" }, storeOnly)).toBe(false);
  });

  it("never shows by mistake: offline, a bad reply, web, or a build with no number", async () => {
    const offline = jest.fn(async () => {
      throw new Error("offline");
    });
    expect(await actual.isUpdateAvailable({ os: "android", version: "1.0.0", build: "1" }, offline)).toBe(false);
    expect(await actual.isUpdateAvailable({ os: "android", version: "1.0.0", build: "1" }, reply({ android: { build: 99 } }, false))).toBe(false);
    expect(await actual.isUpdateAvailable({ os: "android", version: "1.0.0", build: "1" }, reply("<html>"))).toBe(false);
    const fetcher = jest.fn(reply({ android: { build: 99 } }));
    expect(await actual.isUpdateAvailable({ os: "web", version: null, build: null }, fetcher)).toBe(false);
    expect(await actual.isUpdateAvailable({ os: "android", version: null, build: null }, fetcher)).toBe(false);
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("publishes a build number for each store", () => {
    expect(Number.isInteger(site.android.build)).toBe(true);
    expect(Number.isInteger(site.ios.build)).toBe(true);
  });

  it("opens the app's own store page, falling back to the web page", async () => {
    const open = jest.spyOn(Linking, "openURL").mockRejectedValueOnce(new Error("no store")).mockResolvedValue(true);
    await actual.openStore("android");
    expect(open).toHaveBeenNthCalledWith(1, "market://details?id=com.islamiclearning.muslimo");
    expect(open).toHaveBeenNthCalledWith(2, "https://play.google.com/store/apps/details?id=com.islamiclearning.muslimo");
    open.mockClear();
    await actual.openStore("ios");
    expect(open).toHaveBeenCalledWith("itms-apps://apps.apple.com/app/id6828072104");
    open.mockRestore();
  });
});

describe("Update banner in the app", () => {
  const isUpdateAvailable = appUpdate.isUpdateAvailable as jest.Mock;
  const openStore = appUpdate.openStore as jest.Mock;

  afterEach(() => {
    setActiveLanguage("en");
    isUpdateAvailable.mockResolvedValue(false);
    openStore.mockClear();
  });

  async function openApp(language = "en") {
    setStoredItem("sira-path-user-profile", JSON.stringify(makeUser({ preferredLanguage: language as "en" })));
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
  }

  it("stays hidden when the app is up to date", async () => {
    await openApp();
    expect(screen.queryByTestId("update-banner")).toBeNull();
  });

  it("shows under the top bar, opens the store, and closes until next time", async () => {
    isUpdateAvailable.mockResolvedValue(true);
    await openApp();
    expect(await screen.findByTestId("update-banner")).toBeTruthy();
    expect(screen.getByTestId("update-banner-line").props.children).toBe("A new update is ready!");
    await act(async () => {
      fireEvent.press(screen.getByTestId("update-banner-button"));
    });
    expect(openStore).toHaveBeenCalledTimes(1);
    await act(async () => {
      fireEvent.press(screen.getByTestId("update-banner-close"));
    });
    expect(screen.queryByTestId("update-banner")).toBeNull();
  });

  it("speaks the learner's language", async () => {
    isUpdateAvailable.mockResolvedValue(true);
    await openApp("ar");
    expect(String((await screen.findByTestId("update-banner-line")).props.children)).toMatch(/[؀-ۿ]/);
  });
});
