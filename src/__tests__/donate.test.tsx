import React from "react";
import { Linking } from "react-native";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { CHARITY, carriesAmount, charityEnabled, donationUrl, formatDonation, type CharityConfig } from "../config/charity";
import { getUiStrings } from "../i18n";
import { createEmptyLearnerProfile } from "../services/foundationAssessment";
import type { UserProfile } from "../types";
import { qrPath } from "../ui/QrCode";
import { DonateSheet, ProfileView } from "../ui/screens";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

// The counting numbers animate on timers; render them as plain text here.
jest.mock("../ui/screens/FormattedCount", () => {
  const actual = jest.requireActual("../ui/screens/FormattedCount");
  const { Text } = require("react-native");
  return { ...actual, FormattedCount: ({ value, style }: { value: number; style?: object }) => <Text style={style}>{actual.formatNumber(value)}</Text> };
});

const strings = getUiStrings("en");

const charity: CharityConfig = {
  name: "One World Relief",
  donateUrl: "https://example.org/donate",
  amounts: [5, 10, 25, 50],
  currency: "USD",
  amountParam: "amount",
  amountUrls: {}
};

const user: UserProfile = {
  id: 1,
  username: "amina",
  displayName: "Amina Rahman",
  avatarInitials: "AR",
  hasAccount: true,
  accountEmail: "amina@example.com",
  streakDays: 4,
  totalXp: 120,
  dailyGoalXp: 30,
  gems: 500,
  hearts: { current: 2, max: 5, unlimited: false, lastRefillDate: "2026-10-18" },
  completedLessonIds: [],
  completedNodeIds: []
};

async function solveGate() {
  const question = String(screen.getByTestId("grownup-question").props.children);
  const [a, b] = (question.match(/\d+/g) ?? []).map(Number);
  await fireEvent.press(screen.getByTestId(`grownup-option-${a * b}`));
}

describe("charity config", () => {
  it("stays hidden until a https donation page is set", () => {
    expect(charityEnabled({ ...charity, donateUrl: "" })).toBe(false);
    expect(charityEnabled({ ...charity, donateUrl: "http://example.org" })).toBe(false);
    expect(charityEnabled(charity)).toBe(true);
    // The shipped config: One World Relief's own donate page.
    expect(charityEnabled(CHARITY)).toBe(true);
    expect(donationUrl(50)).toBe("https://one-world-relief.org/donate");
  });

  it("puts the amount on the link when the page can take it", () => {
    expect(donationUrl(10, charity)).toBe("https://example.org/donate?amount=10");
    expect(donationUrl(10, { ...charity, donateUrl: "https://example.org/give?src=app" })).toBe("https://example.org/give?src=app&amount=10");
    expect(donationUrl(10, { ...charity, amountParam: "" })).toBe("https://example.org/donate");
    expect(carriesAmount(10, { ...charity, amountParam: "" })).toBe(false);
    const links = { ...charity, amountParam: "", amountUrls: { 25: "https://buy.stripe.com/test_25" } };
    expect(donationUrl(25, links)).toBe("https://buy.stripe.com/test_25");
    expect(carriesAmount(25, links)).toBe(true);
    expect(formatDonation(25, { ...charity, currency: "GBP" })).toBe("£25");
  });

  it("draws a square QR code with a quiet border", () => {
    const { d, span } = qrPath("https://example.org/donate?amount=10");
    expect(span).toBeGreaterThanOrEqual(21 + 8);
    expect(d.startsWith("M4 4h1v1h-1z")).toBe(true);
  });
});

describe("DonateSheet", () => {
  it("opens the charity page in the browser for the picked amount", async () => {
    const onOpenLink = jest.fn();
    await render(<DonateSheet visible onClose={jest.fn()} charity={charity} onOpenLink={onOpenLink} />);

    expect(screen.getByTestId("donate-name").props.children).toBe("One World Relief");
    expect(screen.getByTestId("donate-amount-10").props.accessibilityState).toMatchObject({ selected: true });
    await fireEvent.press(screen.getByTestId("donate-amount-25"));
    expect(screen.getByTestId("donate-amount-25").props.accessibilityState).toMatchObject({ selected: true });
    expect(screen.getByText("DONATE $25")).toBeTruthy();
    expect(screen.queryByTestId("donate-pick-on-page")).toBeNull();
    expect(screen.getByTestId("donate-qr")).toBeTruthy();

    await fireEvent.press(screen.getByTestId("donate-open"));
    expect(onOpenLink).toHaveBeenCalledWith("https://example.org/donate?amount=25");
  });

  it("says to pick the amount on the page when the link can't carry it", async () => {
    const openURL = jest.spyOn(Linking, "openURL").mockResolvedValue(true);
    await render(<DonateSheet visible onClose={jest.fn()} charity={{ ...charity, amountParam: "" }} />);
    expect(screen.getByText("Choose $10 on the page.")).toBeTruthy();
    await fireEvent.press(screen.getByTestId("donate-open"));
    expect(openURL).toHaveBeenCalledWith("https://example.org/donate");
    openURL.mockRestore();
  });
});

describe("ProfileView charity row", () => {
  it("is hidden without a charity", async () => {
    await render(<ProfileView user={user} strings={strings} learnerProfile={createEmptyLearnerProfile()} onOpenSettings={jest.fn()} />);
    expect(screen.queryByTestId("profile-charity")).toBeNull();
  });

  it("asks a grown-up before the donation sheet opens", async () => {
    await render(<ProfileView user={user} strings={strings} learnerProfile={createEmptyLearnerProfile()} onOpenSettings={jest.fn()} charity={charity} />);
    await fireEvent.press(screen.getByTestId("profile-charity"));
    expect(screen.queryByTestId("donate-title")).toBeNull();
    await solveGate();
    await act(async () => undefined);
    expect(screen.getByTestId("donate-title")).toBeTruthy();
  });
});
