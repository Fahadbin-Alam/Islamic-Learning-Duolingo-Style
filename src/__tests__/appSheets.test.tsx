import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { COURSE, LESSONS_BY_ID } from "../data/course";
import { getTopicArabic } from "../data/arabicTerms";
import { buildGuidedLesson } from "../services/lessonGuidance";
import { getLessonLine, getLessonProgress, isPlayablePractice } from "../ui/lesson";
import { AccountSheet, RefillSheet, RewardPop, SettingsSheet, tabForScreen } from "../ui/screens";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

describe("lesson steps", () => {
  it("fills the progress bar one step at a time", () => {
    const base = { hasTeach: true, hasPractice: false, challengeIndex: 0, challengeCount: 3, answeredCorrectly: false };
    expect(getLessonProgress({ ...base, screen: "lesson_teach" })).toBe(0);
    expect(getLessonProgress({ ...base, screen: "lesson_question" })).toBe(0.25);
    expect(getLessonProgress({ ...base, screen: "lesson_feedback" })).toBe(0.25);
    expect(getLessonProgress({ ...base, screen: "lesson_feedback", answeredCorrectly: true })).toBe(0.5);
    expect(getLessonProgress({ ...base, screen: "lesson_question", challengeIndex: 2 })).toBe(0.75);
    expect(getLessonProgress({ ...base, screen: "lesson_complete" })).toBe(1);
  });

  it("counts the ordering game as a step when there is one", () => {
    const base = { hasTeach: true, hasPractice: true, challengeIndex: 0, challengeCount: 2, answeredCorrectly: false };
    expect(getLessonProgress({ ...base, screen: "lesson_practice" })).toBe(0.25);
    expect(getLessonProgress({ ...base, screen: "lesson_question" })).toBe(0.5);
  });

  it("keeps only the first sentence for the mascot", () => {
    expect(getLessonLine({ title: "Wudu", intro: "Wudu cleans you before prayer. It has steps. Learn them." })).toBe("Wudu cleans you before prayer.");
    expect(getLessonLine({ title: "Wudu", intro: "  " })).toBe("Wudu");
    expect(getLessonLine({ title: "Wudu", intro: "No full stop here" })).toBe("No full stop here");
  });

  it("only plays real ordering games, never the filler drills", () => {
    const nodes = COURSE.sections.flatMap((section) => section.nodes);
    const lessons = nodes.flatMap((node) => node.lessonIds.map((id) => LESSONS_BY_ID[id]).filter(Boolean).map((lesson) => buildGuidedLesson(lesson, node)));
    const games = lessons.flatMap((lesson) => (lesson.practiceActivities ?? []).filter(isPlayablePractice));
    expect(games.length).toBeGreaterThan(0);
    for (const game of games) {
      expect(game.kind).toBe("sequence");
      expect(game.id).toMatch(/_(wudu|salah)_order$/);
      expect(game.correctOrderIds).toHaveLength(game.options.length);
    }
  });
});

describe("tabs", () => {
  it("puts every learning screen under Learn", () => {
    expect(tabForScreen("home")).toBe("learn");
    expect(tabForScreen("branch")).toBe("learn");
    expect(tabForScreen("review")).toBe("practice");
    expect(tabForScreen("social")).toBe("crew");
    expect(tabForScreen("shop")).toBe("shop");
    expect(tabForScreen("profile")).toBe("me");
  });
});

describe("topic Arabic", () => {
  it("names the Hadith topic", () => {
    expect(getTopicArabic("hadith")?.ar).toBe("الحديث");
  });
});

describe("app sheets", () => {
  it("signs up with short labels and switches to log in", async () => {
    const onChangeMode = jest.fn();
    const onSubmit = jest.fn();
    await render(
      <AccountSheet
        visible
        mode="create"
        mascotVariant="hijabi"
        name=""
        email=""
        password=""
        onChangeMode={onChangeMode}
        onChangeName={jest.fn()}
        onChangeEmail={jest.fn()}
        onChangePassword={jest.fn()}
        onSubmit={onSubmit}
        onClose={jest.fn()}
      />
    );
    expect(screen.getByText("Save your progress!")).toBeTruthy();
    expect(screen.getByTestId("account-name")).toBeTruthy();
    await fireEvent.press(screen.getByTestId("account-mode-login"));
    expect(onChangeMode).toHaveBeenCalledWith("login");
    await fireEvent.press(screen.getByTestId("account-submit"));
    expect(onSubmit).toHaveBeenCalled();
  });

  it("hides the name field when logging in", async () => {
    await render(
      <AccountSheet
        visible
        mode="login"
        mascotVariant="muslim_man"
        name=""
        email=""
        password=""
        onChangeMode={jest.fn()}
        onChangeName={jest.fn()}
        onChangeEmail={jest.fn()}
        onChangePassword={jest.fn()}
        onSubmit={jest.fn()}
        onClose={jest.fn()}
      />
    );
    expect(screen.queryByTestId("account-name")).toBeNull();
    expect(screen.getByText("Welcome back!")).toBeTruthy();
  });

  it("shows family alerts only for a learner or parent", async () => {
    const props = {
      visible: true,
      streakReminder: true,
      islamicReminder: false,
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
      onClose: jest.fn(),
      onLogout: jest.fn()
    };
    const view = await render(<SettingsSheet {...props} />);
    expect(screen.queryByTestId("settings-daily")).toBeNull();
    expect(screen.queryByTestId("settings-delete")).toBeNull();
    expect(screen.getByTestId("settings-streak").props.accessibilityState).toMatchObject({ checked: true });
    await fireEvent.press(screen.getByTestId("settings-sound"));
    expect(props.onToggleSound).toHaveBeenCalled();
    await fireEvent.press(screen.getByTestId("settings-role-parent"));
    expect(props.onSelectRole).toHaveBeenCalledWith("parent");

    await view.rerender(<SettingsSheet {...props} role="parent" onDeleteAccount={jest.fn()} />);
    expect(screen.getByTestId("settings-daily")).toBeTruthy();
    expect(screen.getByTestId("settings-weekly")).toBeTruthy();
    expect(screen.getByTestId("settings-delete")).toBeTruthy();
  });

  it("offers a free refill without asking for a review", async () => {
    const onRefill = jest.fn();
    const onShop = jest.fn();
    await render(<RefillSheet visible maxHearts={5} mascotVariant="hijabi" onRefill={onRefill} onShop={onShop} />);
    expect(screen.queryByText(/review|stars/i)).toBeNull();
    await fireEvent.press(screen.getByTestId("refill-claim"));
    expect(onRefill).toHaveBeenCalled();
    await fireEvent.press(screen.getByTestId("refill-shop"));
    expect(onShop).toHaveBeenCalled();
  });

  it("opens a chest and collects the gems", async () => {
    jest.useFakeTimers();
    const onClose = jest.fn();
    const view = await render(<RewardPop visible gems={25} onClose={onClose} />);
    await act(async () => {
      jest.advanceTimersByTime(1500);
    });
    expect(screen.getByText("Chest opened!")).toBeTruthy();
    expect(screen.getByText("+25")).toBeTruthy();
    await fireEvent.press(screen.getByTestId("reward-collect"));
    expect(onClose).toHaveBeenCalled();
    await view.rerender(<RewardPop visible={false} gems={25} onClose={onClose} />);
    expect(screen.queryByTestId("reward-pop")).toBeNull();
    jest.useRealTimers();
  });
});
