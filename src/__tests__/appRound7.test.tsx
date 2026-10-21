jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

import React from "react";
import { Dimensions, Platform, ScrollView, StyleSheet } from "react-native";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { COURSE } from "../data/course";
import { getUiStrings } from "../i18n";
import { createEmptyLearnerProfile } from "../services/foundationAssessment";
import { ExerciseView, LessonComplete, SHEET_MAX_SHARE } from "../ui/lesson";
import { ProfileView } from "../ui/screens";
import { makeUser } from "./testUtils";

const layout = (height: number, y = 0) => ({ nativeEvent: { layout: { x: 0, y, width: 320, height } } });

describe("Me scrolls back to the top when the account changes", () => {
  const strings = getUiStrings("en");
  const profile = createEmptyLearnerProfile();
  const view = (user = makeUser(), hasSavedAccount = false) => (
    <ProfileView user={user} strings={strings} learnerProfile={profile} hasSavedAccount={hasSavedAccount} onOpenSettings={jest.fn()} onCreateAccount={jest.fn()} />
  );

  it("on sign up, log in and log out, and not when anything else changes", async () => {
    const scrollTo = jest.spyOn(ScrollView.prototype as unknown as { scrollTo: (options: object) => void }, "scrollTo");
    scrollTo.mockClear();
    const guest = makeUser();
    const { rerender } = await render(view(guest));
    expect(scrollTo).not.toHaveBeenCalled();

    // More gems or XP: the learner stays where they scrolled.
    await rerender(view({ ...guest, gems: guest.gems + 10, totalXp: 40 }));
    expect(scrollTo).not.toHaveBeenCalled();

    // Sign up: the new avatar and name show from the top.
    const signedIn = { ...guest, hasAccount: true, accountEmail: "sara@example.com", displayName: "Sara", avatarInitials: "S" };
    await rerender(view(signedIn));
    expect(scrollTo).toHaveBeenCalledTimes(1);
    expect(scrollTo).toHaveBeenLastCalledWith(expect.objectContaining({ y: 0 }));
    expect(screen.getByTestId("profile-name")).toHaveTextContent("Sara");

    // Log out: a guest again, with the saved account's LOG IN.
    await rerender(view({ ...signedIn, hasAccount: false, accountEmail: undefined }, true));
    expect(scrollTo).toHaveBeenCalledTimes(2);
    expect(screen.getByTestId("profile-create")).toHaveTextContent(/log in/i);

    // Log in again.
    await rerender(view(signedIn));
    expect(scrollTo).toHaveBeenCalledTimes(3);
    scrollTo.mockRestore();
  });
});

describe("result tiles count the XP this lesson earned", () => {
  it("names the lesson complete tile XP EARNED, not TOTAL XP", async () => {
    jest.useFakeTimers();
    await render(<LessonComplete title="As-salamu alaykum" xp={8} stars={2} streakDays={1} mascotVariant="hijabi" accent="#21B573" onContinue={jest.fn()} />);
    expect(screen.getByText("XP EARNED")).toBeTruthy();
    expect(screen.queryByText("TOTAL XP")).toBeNull();
    await act(async () => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });
});

describe("the shop's purchases-off line stays true", () => {
  it("some circles need Premium in such a build, and they are only a few", () => {
    const premiumUnits = COURSE.sections.flatMap((section) => section.branches.filter((branch) => branch.premiumOnly).map((branch) => ({ section, branch })));
    const lockedCircles = premiumUnits.reduce((sum, { section, branch }) => sum + section.nodes.filter((node) => node.branchId === branch.id).length, 0);
    const allCircles = COURSE.sections.reduce((sum, section) => sum + section.nodes.length, 0);
    // "Almost every lesson is free!": not "every" (some are locked), and almost all of them are free.
    expect(lockedCircles).toBeGreaterThan(0);
    expect(lockedCircles / allCircles).toBeLessThan(0.05);
  });
});

describe("the feedback sheet never covers the green tile", () => {
  const tf = {
    kind: "true_false" as const,
    prompt: "Abu Dharr bravely called out his Islam at the market.",
    choices: [
      { id: "true", label: "True" },
      { id: "false", label: "False" }
    ],
    mascotVariant: "boy",
    accent: "#21B573",
    onSelect: jest.fn(),
    onCheck: jest.fn(),
    onContinue: jest.fn()
  };
  const wrong = { correct: false, correctLabel: "False", why: "Abu Dharr bravely called out his Islam at the Ka'bah." };
  const bodyMax = () => StyleSheet.flatten(screen.getByTestId("feedback-body").props.style).maxHeight as number;
  const inset = Platform.OS === "ios" ? 30 : 16;
  // The sheet's parts that never scroll, at their first measures: title row, gap, button, panel padding, inset.
  const fixedParts = 40 + 16 + 58 + 36 + inset;
  // A slim sheet: a smaller gap and panel padding (the button is measured as it lays out).
  const slimParts = 40 + 8 + 58 + 20 + inset;
  const panelStyle = () =>
    StyleSheet.flatten((screen.getByTestId("feedback-sheet").children[0] as unknown as { props: { style: object } }).props.style) as { paddingTop?: number };

  async function laidOut(rootHeight: number, tilesTop: number, tilesHeight: number) {
    await render(<ExerciseView {...tf} selectedChoiceId="true" correctChoiceId="false" result={wrong} defaultWhyOpen />);
    await fireEvent(screen.getByTestId("exercise-view"), "layout", layout(rootHeight));
    await fireEvent(screen.getByTestId("exercise-prompt"), "layout", layout(140, 8));
    await fireEvent(screen.getByTestId("exercise-tiles"), "layout", layout(tilesHeight, tilesTop));
  }

  it("keeps a short phone's sheet, Why line open, under the True / False tiles and the prompt at the top", async () => {
    // 320 x 568: the prompt cannot scroll away, so the sheet may only fill the room under the tiles.
    await laidOut(500, 160, 108);
    const room = 500 - (160 + 108) - 8;
    // Too little room for a full sheet: it goes slim, and what it holds fits under the tiles.
    expect(panelStyle().paddingTop).toBe(12);
    expect(bodyMax() + slimParts).toBeLessThanOrEqual(room);
    expect(bodyMax()).toBeLessThan(Math.round(Dimensions.get("window").height * SHEET_MAX_SHARE) - fixedParts);
    // The Why line is still there, in the part that scrolls.
    expect(screen.getByTestId("feedback-why-text")).toBeTruthy();
    expect(screen.getByTestId("feedback-continue")).toBeTruthy();
  });

  it("folds the grey tiles away when four tiles leave no room under the last, green one", async () => {
    const four = {
      ...tf,
      kind: "multiple_choice" as const,
      prompt: "What is Yunus known for?",
      choices: [
        { id: "a", label: "He built the Ark before the great flood came" },
        { id: "b", label: "He led his people across the sea to safety" },
        { id: "c", label: "He was given great strength to fight Jalut" },
        { id: "d", label: "He prayed to Allah from inside the big fish" }
      ]
    };
    const result = { correct: false, correctLabel: four.choices[3].label, why: "Yunus called on Allah from the dark." };
    const { rerender } = await render(<ExerciseView {...four} selectedChoiceId="a" correctChoiceId="d" result={result} defaultWhyOpen />);
    const gap = 12;
    const wrapper = (id: string) => screen.getByTestId(`choice-${id}`).parent!.parent!.parent!;
    await fireEvent(screen.getByTestId("exercise-view"), "layout", layout(512));
    await fireEvent(screen.getByTestId("exercise-prompt"), "layout", layout(39, 8));
    for (const [index, id] of ["a", "b", "c", "d"].entries()) {
      await fireEvent(wrapper(id), "layout", layout(68, index * (68 + gap)));
    }
    await fireEvent(screen.getByTestId("exercise-tiles"), "layout", layout(4 * 68 + 3 * gap, 63));
    // The picked tile and the green one stay; the two grey ones are gone, so the sheet fits under the green one.
    expect(screen.getByTestId("choice-a")).toBeTruthy();
    expect(screen.getByTestId("choice-d")).toBeTruthy();
    expect(screen.queryByTestId("choice-b")).toBeNull();
    expect(screen.queryByTestId("choice-c")).toBeNull();
    expect(screen.getByTestId("feedback-why-text")).toBeTruthy();

    // Like a browser, only the stack reports its new size: the green tile, moved up, tells nothing new. The sheet
    // still finds it right under the red one and takes the room that opened up (no longer slim).
    await fireEvent(screen.getByTestId("exercise-tiles"), "layout", layout(2 * 68 + gap, 63));
    const room = 512 - (63 + 68 + gap + 68) - 8;
    expect(panelStyle().paddingTop).toBe(20);
    expect(bodyMax()).toBeGreaterThan(100);
    expect(bodyMax() + fixedParts).toBeLessThanOrEqual(room);

    // The next try shows every tile again.
    await rerender(<ExerciseView {...four} attempt={1} />);
    ["a", "b", "c", "d"].forEach((id) => expect(screen.getByTestId(`choice-${id}`)).toBeTruthy());
  });

  it("leaves a sheet that already fits as it was", async () => {
    await laidOut(1200, 160, 108);
    expect(bodyMax()).toBe(Math.max(64, Math.round(Dimensions.get("window").height * SHEET_MAX_SHARE) - fixedParts));
    expect(panelStyle().paddingTop).toBe(20);
  });
});
