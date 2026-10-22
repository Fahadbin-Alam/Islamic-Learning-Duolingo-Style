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
jest.mock("../services/socialAuth", () => ({
  isGoogleSignInAvailable: jest.fn(() => true),
  isAppleSignInAvailable: jest.fn(async () => false),
  signInWithGoogle: jest.fn(),
  signInWithApple: jest.fn(),
  signOutOfProviders: jest.fn(async () => undefined)
}));

import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import TopicApp from "../TopicApp";
import { removeStoredItem, setStoredItem } from "../services/appStorage";
import { clearLocalAuthAccount, createLocalAuthAccount, loadLocalAuthAccount, signOutLocalAuthAccount } from "../services/localAuth";
import { signInWithGoogle } from "../services/socialAuth";
import { makeUser } from "./testUtils";

const PROFILE_KEY = "sira-path-user-profile";
const googleIdentity = {
  provider: "google" as const,
  subject: "g-123",
  email: "Amina.Khan@gmail.com",
  name: "Amina Khan",
  idToken: "header.payload.signature"
};

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

async function openAccountSheet() {
  setStoredItem(PROFILE_KEY, JSON.stringify(makeUser()));
  // An adult on this phone: sign-up asks the age first when it isn't known yet.
  setStoredItem("sira-path-age-group", "18+");
  await render(<TopicApp />);
  await screen.findByTestId("learn-path-foundation");
  await press("tab-me");
  await press("profile-create");
}

async function passGrownUp() {
  const [a, b] = (String(screen.getByTestId("grownup-question").props.children).match(/\d+/g) ?? []).map(Number);
  await press(`grownup-option-${a * b}`);
}

describe("Continue with Google (no server in this build)", () => {
  afterEach(() => {
    removeStoredItem(PROFILE_KEY);
    removeStoredItem("sira-path-age-group");
    clearLocalAuthAccount();
    (signInWithGoogle as jest.Mock).mockReset();
  });

  it("signs up with one tap after the grown-up check and saves a device account with no password", async () => {
    (signInWithGoogle as jest.Mock).mockResolvedValue({ status: "ok", identity: googleIdentity });
    await openAccountSheet();
    await passGrownUp();
    await press("account-social-google");

    await waitFor(() => expect(screen.queryByTestId("account-sheet")).toBeNull());
    const saved = loadLocalAuthAccount();
    expect(saved).toMatchObject({ name: "Amina Khan", email: "amina.khan@gmail.com", provider: "google" });
    expect(saved?.password).toBeUndefined();
    expect(screen.getAllByText("Welcome, Amina!").length).toBeGreaterThan(0);
  });

  it("logs a logged-out Google account back in, and points a password try at Google", async () => {
    createLocalAuthAccount({ name: "Amina Khan", email: "amina.khan@gmail.com", provider: "google", createdAt: "2026-10-18T00:00:00.000Z" });
    signOutLocalAuthAccount();
    await openAccountSheet();

    await act(async () => {
      fireEvent.changeText(screen.getByTestId("account-email"), "amina.khan@gmail.com");
      fireEvent.changeText(screen.getByTestId("account-password"), "anything-at-all");
    });
    await press("account-submit");
    await waitFor(() => expect(screen.getByTestId("account-error")).toHaveTextContent("Use Continue with Google."));

    (signInWithGoogle as jest.Mock).mockResolvedValue({ status: "ok", identity: googleIdentity });
    await press("account-social-google");
    await waitFor(() => expect(screen.queryByTestId("account-sheet")).toBeNull());
    expect(loadLocalAuthAccount()?.signedOut).toBeUndefined();
    expect(screen.getAllByText("Welcome back, Amina!").length).toBeGreaterThan(0);
  });

  it("won't make a new account from the Log in tab, so sign-up keeps its grown-up check", async () => {
    createLocalAuthAccount({ name: "Sara", email: "sara@example.com", password: "right-pass", createdAt: "2026-10-18T00:00:00.000Z" });
    signOutLocalAuthAccount();
    (signInWithGoogle as jest.Mock).mockResolvedValue({ status: "ok", identity: googleIdentity });
    await openAccountSheet();

    await press("account-social-google");
    await waitFor(() => expect(screen.getByTestId("account-error")).toHaveTextContent("No account yet. Sign up first!"));
    expect(loadLocalAuthAccount()?.email).toBe("sara@example.com");
  });

  it("does nothing when the person closes the Google picker", async () => {
    (signInWithGoogle as jest.Mock).mockResolvedValue({ status: "cancelled" });
    await openAccountSheet();
    await passGrownUp();
    await press("account-social-google");
    expect(screen.getByTestId("account-sheet")).toBeTruthy();
    expect(screen.queryByTestId("account-error")).toBeNull();
    expect(loadLocalAuthAccount()).toBeNull();
  });
});
