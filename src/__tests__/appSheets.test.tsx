import React from "react";
import { Text, View } from "react-native";
import { act, fireEvent, render, screen, within } from "@testing-library/react-native";
import { COURSE, LESSONS_BY_ID } from "../data/course";
import { getTopicArabic } from "../data/arabicTerms";
import { buildGuidedLesson } from "../services/lessonGuidance";
import { getLessonLine, getLessonProgress, isPlayablePractice } from "../ui/lesson";
import { Portal, PortalHost } from "../ui/Portal";
import { Sheet } from "../ui/Sheet";
import { AccountSheet, ConfirmSheet, NoticeSheet, RefillSheet, RewardPop, SettingsSheet, checkAccountFields, tabForScreen, useNotices } from "../ui/screens";

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
      expect(game.id).toMatch(/_(wudu|rakah|salah)_order$/);
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
  function accountProps(overrides: Partial<React.ComponentProps<typeof AccountSheet>> = {}): React.ComponentProps<typeof AccountSheet> {
    return {
      visible: true,
      mode: "create",
      mascotVariant: "hijabi",
      name: "",
      email: "",
      password: "",
      onChangeMode: jest.fn(),
      onChangeName: jest.fn(),
      onChangeEmail: jest.fn(),
      onChangePassword: jest.fn(),
      onSubmit: jest.fn(),
      onClose: jest.fn(),
      ...overrides
    };
  }

  /** Answers the grown-up sum that comes before the sign up form. */
  async function passGrownUp() {
    const [a, b] = (String(screen.getByTestId("grownup-question").props.children).match(/\d+/g) ?? []).map(Number);
    await fireEvent.press(screen.getByTestId(`grownup-option-${a * b}`));
  }

  it("asks for a parent's name and email when the learner is 12 or under", async () => {
    await render(<AccountSheet {...accountProps({ forChild: true })} />);
    expect(screen.getByText("A parent signs up for you!")).toBeTruthy();
    await passGrownUp();
    expect(screen.getByTestId("account-name").props.placeholder).toBe("Parent's name");
    expect(screen.getByTestId("account-email").props.placeholder).toBe("Parent's email");
  });

  it("signs up with short labels and switches to log in", async () => {
    const props = accountProps({ name: "Amina", email: "amina@example.com", password: "salaam123" });
    await render(<AccountSheet {...props} />);
    expect(screen.getByText("Save your progress!")).toBeTruthy();
    // A grown-up answers first: no name, email or password until then.
    expect(screen.getByTestId("account-grownup")).toBeTruthy();
    expect(screen.queryByTestId("account-name")).toBeNull();
    expect(screen.queryByTestId("account-submit")).toBeNull();
    await passGrownUp();
    expect(screen.queryByTestId("account-grownup")).toBeNull();
    expect(screen.getByTestId("account-name")).toBeTruthy();
    // One name for making an account everywhere: SIGN UP.
    expect(screen.getByText("SIGN UP")).toBeTruthy();
    await fireEvent.press(screen.getByTestId("account-mode-login"));
    expect(props.onChangeMode).toHaveBeenCalledWith("login");
    await fireEvent.press(screen.getByTestId("account-submit"));
    expect(props.onSubmit).toHaveBeenCalled();
  });

  it("checks the form in place with a short hint, never an alert", async () => {
    const { playGameSound } = jest.requireMock("../services/gameAudio");
    const props = accountProps();
    const view = await render(<AccountSheet {...props} />);
    await passGrownUp();
    playGameSound.mockClear();
    await fireEvent.press(screen.getByTestId("account-submit"));
    expect(props.onSubmit).not.toHaveBeenCalled();
    expect(screen.getByTestId("account-name-error").props.children).toBe("Add your name");
    expect(playGameSound).toHaveBeenCalledWith("wrong", expect.anything());

    await view.rerender(<AccountSheet {...props} name="Amina" email="amina@" />);
    await fireEvent.press(screen.getByTestId("account-submit"));
    expect(screen.getByTestId("account-email-error").props.children).toBe("Check your email");
    expect(screen.queryByTestId("account-name-error")).toBeNull();

    await view.rerender(<AccountSheet {...props} name="Amina" email="amina@example.com" password="short" />);
    await fireEvent(screen.getByTestId("account-password"), "submitEditing");
    expect(screen.getByTestId("account-password-error").props.children).toBe("Use 8 or more letters");
    expect(props.onSubmit).not.toHaveBeenCalled();

    // Typing in the flagged field clears its hint; Enter in the last field submits a good form.
    await fireEvent.changeText(screen.getByTestId("account-password"), "salaam123");
    expect(props.onChangePassword).toHaveBeenCalledWith("salaam123");
    expect(screen.queryByTestId("account-password-error")).toBeNull();
    await view.rerender(<AccountSheet {...props} name="Amina" email="amina@example.com" password="salaam123" error="Wrong email or password." />);
    expect(screen.getByText("Wrong email or password.")).toBeTruthy();
    await fireEvent(screen.getByTestId("account-password"), "submitEditing");
    expect(props.onSubmit).toHaveBeenCalledTimes(1);
  });

  it("uses the same field rules as the app", () => {
    expect(checkAccountFields("login", "", "a@b.co", "x")).toBeUndefined();
    expect(checkAccountFields("login", "", "", "x")?.hint).toBe("Add your email");
    expect(checkAccountFields("create", "A", "a@b.co", "12345678")).toBeUndefined();
    expect(checkAccountFields("create", "A", "a@b.co", "1234567")?.field).toBe("password");
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
    expect(screen.getByText("Parent")).toBeTruthy();
    expect(screen.queryByText("WHO IS LEARNING?")).toBeNull();

    await fireEvent.press(screen.getByTestId("settings-close"));
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it("opens settings for a guest without account rows", async () => {
    const props = {
      visible: true,
      role: "parent" as const,
      streakReminder: true,
      islamicReminder: true,
      dailyCheckIn: true,
      weeklyCheckIn: true,
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
      onLogout: jest.fn(),
      onDeleteAccount: jest.fn()
    };
    await render(<SettingsSheet {...props} guest />);
    expect(screen.getByTestId("settings-streak")).toBeTruthy();
    expect(screen.getByTestId("settings-sound")).toBeTruthy();
    for (const id of ["settings-role-me", "settings-daily", "settings-weekly", "settings-logout", "settings-delete"]) {
      expect(screen.queryByTestId(id)).toBeNull();
    }
    await fireEvent.press(screen.getByTestId("settings-save"));
    expect(props.onSave).toHaveBeenCalledTimes(1);
  });

  it("offers a free refill without asking for a review, filling the empty hearts first", async () => {
    jest.useFakeTimers();
    const onRefill = jest.fn();
    const onShop = jest.fn();
    await render(<RefillSheet visible maxHearts={5} mascotVariant="hijabi" onRefill={onRefill} onShop={onShop} />);
    expect(screen.queryByText(/review|stars/i)).toBeNull();
    // Out of hearts means the row starts empty.
    expect(screen.getByTestId("refill-hearts").props.accessibilityLabel).toBe("0 of 5 hearts");
    await fireEvent.press(screen.getByTestId("refill-claim"));
    expect(onRefill).not.toHaveBeenCalled();
    await act(async () => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getByTestId("refill-hearts").props.accessibilityLabel).toBe("5 of 5 hearts");
    expect(onRefill).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByTestId("refill-shop"));
    expect(onShop).toHaveBeenCalled();
    jest.useRealTimers();
  });

  it("sends the learner to the shop or out of the lesson once the free refill is used", async () => {
    const onShop = jest.fn();
    const onEndLesson = jest.fn();
    await render(<RefillSheet visible variant="shop" maxHearts={5} mascotVariant="hijabi" onShop={onShop} onEndLesson={onEndLesson} />);
    expect(screen.queryByTestId("refill-claim")).toBeNull();
    expect(screen.getByTestId("refill-hearts").props.accessibilityLabel).toBe("0 of 5 hearts");
    await fireEvent.press(screen.getByText("GET HEARTS"));
    await fireEvent.press(screen.getByText("END LESSON"));
    expect(onShop).toHaveBeenCalledTimes(1);
    expect(onEndLesson).toHaveBeenCalledTimes(1);
  });

  it("shows a notice and a confirm as game sheets", async () => {
    const onClose = jest.fn();
    const view = await render(<NoticeSheet visible title="Logged out" onClose={onClose} />);
    await fireEvent.press(screen.getByText("OK"));
    expect(onClose).toHaveBeenCalledTimes(1);

    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    await view.rerender(<ConfirmSheet visible title="Delete account?" line="This cannot be undone." confirmLabel="Delete" onConfirm={onConfirm} onCancel={onCancel} />);
    expect(screen.getByText("This cannot be undone.")).toBeTruthy();
    await fireEvent.press(screen.getByText("KEEP"));
    await fireEvent.press(screen.getByText("DELETE"));
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("queues notices and resolves confirms through useNotices", async () => {
    const results: Array<boolean | "seen"> = [];
    let api: ReturnType<typeof useNotices> | undefined;
    function Harness() {
      api = useNotices({ mascotVariant: "boy" });
      return <View>{api.sheets}</View>;
    }
    await render(<Harness />);
    await act(async () => {
      void api!.notify("Logged out").then(() => results.push("seen"));
      void api!.confirm("Remove Yusuf?", undefined, "Remove").then((ok) => results.push(ok));
    });
    expect(screen.getByText("Logged out")).toBeTruthy();
    await fireEvent.press(screen.getByText("OK"));
    expect(screen.getByText("Remove Yusuf?")).toBeTruthy();
    await fireEvent.press(screen.getByTestId("confirm-sheet-confirm"));
    expect(results).toEqual(["seen", true]);
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
    // The lid pops open after a beat.
    expect(screen.getByTestId("reward-chest-open")).toBeTruthy();
    await fireEvent.press(screen.getByTestId("reward-collect"));
    expect(onClose).toHaveBeenCalled();
    await view.rerender(<RewardPop visible={false} gems={25} onClose={onClose} />);
    expect(screen.queryByTestId("reward-pop")).toBeNull();
    jest.useRealTimers();
  });
});

describe("portal", () => {
  it("draws a dimmed sheet over the whole shell when a host exists, and inline without one", async () => {
    const view = await render(
      <PortalHost>
        <View testID="screen">
          <Sheet visible testID="dim-sheet">
            <Text>Inside</Text>
          </Sheet>
          <Sheet visible tone="correct" testID="feedback-sheet" />
        </View>
        <View testID="tabs" />
      </PortalHost>
    );
    const layer = screen.getByTestId("portal-layer");
    expect(within(layer).getByTestId("dim-sheet")).toBeTruthy();
    expect(within(screen.getByTestId("screen")).queryByTestId("dim-sheet")).toBeNull();
    // A feedback sheet without a backdrop stays in its screen.
    expect(within(screen.getByTestId("screen")).getByTestId("feedback-sheet")).toBeTruthy();

    await view.rerender(
      <PortalHost>
        <View testID="screen" />
      </PortalHost>
    );
    expect(screen.queryByTestId("portal-layer")).toBeNull();

    await view.rerender(
      <View testID="screen">
        <Portal>
          <Text>Inline</Text>
        </Portal>
      </View>
    );
    expect(within(screen.getByTestId("screen")).getByText("Inline")).toBeTruthy();
  });

  it("plays a tap sound when the backdrop closes a sheet", async () => {
    const { playGameSound } = jest.requireMock("../services/gameAudio");
    const onClose = jest.fn();
    await render(<Sheet visible onClose={onClose} testID="s" />);
    playGameSound.mockClear();
    await fireEvent.press(screen.getByLabelText("Close"));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(playGameSound).toHaveBeenCalledWith("soft_ui", expect.anything());
  });
});
