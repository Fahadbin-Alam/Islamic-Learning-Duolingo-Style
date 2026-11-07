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
import { clearLocalAuthAccount, createLocalAuthAccount, signOutLocalAuthAccount } from "../services/localAuth";
import { clearSessionToken, getSessionToken } from "../services/backendSync";
import { clearAccountProfile, stashAccountProfile } from "../services/localProgress";
import { signInWithGoogle } from "../services/socialAuth";
import { makeUser } from "./testUtils";

const PROFILE_KEY = "sira-path-user-profile";
const googleIdentity = {
  provider: "google" as const,
  subject: "g-123",
  email: "sara@example.com",
  name: "Sara",
  idToken: "header.payload.signature"
};

type Call = { path: string; body: Record<string, unknown> | null };

/**
 * A pretend server that has never heard of this phone's account: log in says wrong password, Google log in says
 * "no account" unless allowed to make one, and sign up makes it with whatever progress the phone sends.
 */
function fakeServer(options: { registerStatus?: number } = {}) {
  const calls: Call[] = [];
  global.fetch = jest.fn(async (url: string, init?: RequestInit) => {
    const path = String(url).replace(/^https?:\/\/[^/]+/, "").split("?")[0];
    const body = init?.body ? (JSON.parse(String(init.body)) as Record<string, unknown>) : null;
    calls.push({ path, body });
    const reply = (status: number, json: unknown) => ({ ok: status < 300, status, json: async () => json }) as Response;
    const session = (user: Record<string, unknown>) =>
      reply(200, {
        token: "server-token",
        account: { name: "Sara", email: "sara@example.com", createdAt: new Date().toISOString() },
        user: { ...user, id: 77, hasAccount: true, accountEmail: "sara@example.com", displayName: "Sara" },
        socialHub: {}
      });
    if (path === "/api/auth/login") return reply(401, { detail: "Invalid email or password." });
    if (path === "/api/auth/register") {
      return options.registerStatus ? reply(options.registerStatus, { detail: "An account with that email already exists." }) : session(body?.user as Record<string, unknown>);
    }
    if (path === "/api/auth/social") {
      return body?.allowCreate ? session(body.user as Record<string, unknown>) : reply(404, { detail: "No account yet. Sign up first." });
    }
    return reply(200, { ok: true });
  }) as unknown as typeof fetch;
  return calls;
}

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

/** Sara made an account on a build with no server, learned, and logged out; the phone kept her progress. */
async function openLogInWithPhoneAccount(provider?: "google") {
  createLocalAuthAccount({ name: "Sara", email: "sara@example.com", password: provider ? undefined : "right-pass-123", provider, createdAt: "2026-10-18T00:00:00.000Z" });
  signOutLocalAuthAccount();
  stashAccountProfile("sara@example.com", makeUser({ totalXp: 345, streakDays: 6, hasAccount: true, accountEmail: "sara@example.com" }));
  setStoredItem(PROFILE_KEY, JSON.stringify(makeUser()));
  setStoredItem("sira-path-age-group", "18+");
  await render(<TopicApp />);
  await screen.findByTestId("learn-path-foundation");
  await press("tab-me");
  await press("profile-create");
}

async function logIn(password: string) {
  await act(async () => {
    fireEvent.changeText(screen.getByTestId("account-email"), "sara@example.com");
    fireEvent.changeText(screen.getByTestId("account-password"), password);
  });
  await press("account-submit");
}

describe("an account made before the server existed moves to it on the next log in", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    removeStoredItem(PROFILE_KEY);
    removeStoredItem("sira-path-age-group");
    clearLocalAuthAccount();
    clearAccountProfile();
    clearSessionToken();
    (signInWithGoogle as jest.Mock).mockReset();
  });

  it("makes the account on the server with the phone's progress when the password matches", async () => {
    const calls = fakeServer();
    await openLogInWithPhoneAccount();

    await logIn("right-pass-123");

    await waitFor(() => expect(screen.queryByTestId("account-sheet")).toBeNull());
    const register = calls.find((call) => call.path === "/api/auth/register");
    expect(register?.body).toMatchObject({ email: "sara@example.com", password: "right-pass-123", name: "Sara" });
    expect(register?.body?.user).toMatchObject({ totalXp: 345, streakDays: 6 });
    expect(getSessionToken()).toBe("server-token");
    expect(screen.getAllByText("Welcome back, Sara!").length).toBeGreaterThan(0);
  });

  it("says wrong password, and sends nothing, when the password doesn't match the phone's", async () => {
    const calls = fakeServer();
    await openLogInWithPhoneAccount();

    await logIn("not-the-password");

    await waitFor(() => expect(screen.getByTestId("account-error")).toHaveTextContent("Wrong email or password."));
    expect(calls.some((call) => call.path === "/api/auth/register")).toBe(false);
    expect(getSessionToken()).toBeNull();
  });

  it("says wrong password when the server already has that email with another password", async () => {
    fakeServer({ registerStatus: 409 });
    await openLogInWithPhoneAccount();

    await logIn("right-pass-123");

    await waitFor(() => expect(screen.getByTestId("account-error")).toHaveTextContent("Wrong email or password."));
    expect(getSessionToken()).toBeNull();
  });

  it("lets Google log in make the server account for the same email, with the phone's progress", async () => {
    const calls = fakeServer();
    (signInWithGoogle as jest.Mock).mockResolvedValue({ status: "ok", identity: googleIdentity });
    await openLogInWithPhoneAccount("google");

    await press("account-social-google");

    await waitFor(() => expect(screen.queryByTestId("account-sheet")).toBeNull());
    const social = calls.find((call) => call.path === "/api/auth/social");
    expect(social?.body).toMatchObject({ allowCreate: true });
    expect(social?.body?.user).toMatchObject({ totalXp: 345 });
    expect(getSessionToken()).toBe("server-token");
  });

  it("still won't make an account from Google log in for an email this phone has never seen", async () => {
    const calls = fakeServer();
    (signInWithGoogle as jest.Mock).mockResolvedValue({ status: "ok", identity: { ...googleIdentity, email: "new@example.com" } });
    await openLogInWithPhoneAccount("google");

    await press("account-social-google");

    await waitFor(() => expect(screen.getByTestId("account-error")).toHaveTextContent("No account yet. Sign up first!"));
    expect(calls.find((call) => call.path === "/api/auth/social")?.body).toMatchObject({ allowCreate: false });
  });

  it("wakes the server as the app opens", async () => {
    const calls = fakeServer();
    await openLogInWithPhoneAccount();

    expect(calls.some((call) => call.path === "/api/health")).toBe(true);
  });
});
