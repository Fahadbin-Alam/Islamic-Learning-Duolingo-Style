import React from "react";
import { View } from "react-native";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { COURSE, SHOP_ITEMS } from "../data/course";
import { getUiStrings } from "../i18n";
import { createEmptyLearnerProfile } from "../services/foundationAssessment";
import type { LearningNodeView } from "../types";
import { AccountSheet, ConfirmSheet, CrewView, LanguageSheet, LearnPath, NoticeSheet, ProfileView, RefillSheet, SettingsSheet, ShopView, useNotices, type PathUnit } from "../ui/screens";
import { makeUser } from "./testUtils";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

// A stand-in mascot that shows its props, since queries only see host views.
jest.mock("../ui/Mascot", () => {
  const actual = jest.requireActual("../ui/Mascot");
  const { View } = jest.requireActual("react-native");
  return { ...actual, Mascot: (props: { mood?: string; accent?: string }) => <View testID="mascot" mood={props.mood} accent={props.accent} /> };
});

const { playGameSound } = jest.requireMock("../services/gameAudio") as { playGameSound: jest.Mock };

const foundation = COURSE.sections.find((section) => section.topicId === "foundation")!;

function view(index: number, status: LearningNodeView["status"]): LearningNodeView {
  const node = foundation.nodes[index];
  return { ...node, status, firstLessonId: node.lessonIds[0] };
}

function lastSounds() {
  return playGameSound.mock.calls.map((call) => call[0]);
}

beforeEach(() => {
  playGameSound.mockClear();
});

afterEach(() => {
  jest.useRealTimers();
});

describe("LearnPath locked circles and open units", () => {
  // Unit A holds the circle to play next; unit C is a later unit whose first circle is open too
  // (a library topic), with a locked circle behind it.
  function units(overrides: { cTestOut?: boolean; aTestOut?: boolean } = {}): PathUnit[] {
    return [
      {
        id: "unit-a",
        number: 1,
        title: "Greetings and replies",
        done: 1,
        total: 3,
        canTestOut: overrides.aTestOut,
        items: [
          { kind: "node", node: view(0, "completed"), lessonNumber: 1 },
          { kind: "node", node: view(1, "current"), lessonNumber: 2 },
          { kind: "node", node: view(2, "locked"), lessonNumber: 3 }
        ]
      },
      {
        id: "unit-c",
        number: 2,
        title: "Daily words",
        done: 0,
        total: 2,
        canTestOut: overrides.cTestOut,
        items: [
          { kind: "node", node: view(3, "available"), lessonNumber: 4 },
          { kind: "node", node: view(4, "locked"), lessonNumber: 5 }
        ]
      }
    ];
  }

  async function renderPath(pathUnits: PathUnit[], testOut: "handler" | "none" = "handler") {
    const onTestOut = testOut === "handler" ? jest.fn() : undefined;
    const props = {
      accent: foundation.accentColor,
      topicId: "foundation",
      mascotVariant: "hijabi",
      units: pathUnits,
      xpForNode: (node: LearningNodeView) => node.xpReward,
      onStartNode: jest.fn(),
      onClaimChest: jest.fn(),
      onTestOut
    };
    await render(<LearnPath {...props} />);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    return props;
  }

  it("says why a circle is locked and offers JUMP HERE, which asks before testing out its unit", async () => {
    const pathUnits = units({ cTestOut: true });
    const props = await renderPath(pathUnits);
    const locked = pathUnits[1].items[1];
    if (locked.kind !== "node") throw new Error("bad fixture");

    await fireEvent.press(screen.getByTestId(`path-node-${locked.node.id}`));
    expect(screen.getByText("Finish the one before it!")).toBeTruthy();
    expect(screen.queryByTestId("node-card-start")).toBeNull();
    await fireEvent.press(screen.getByText("JUMP HERE"));
    expect(screen.getByText("Jump ahead?")).toBeTruthy();
    expect(props.onTestOut).not.toHaveBeenCalled();
    // The card gives way to the sheet.
    expect(screen.queryByTestId("node-card")).toBeNull();
    await fireEvent.press(screen.getByText("START TEST"));
    // JUMP HERE tests for the tapped circle.
    expect(props.onTestOut).toHaveBeenCalledWith("unit-c", locked.node.id);
  });

  it("leaves JUMP HERE out when the unit cannot be tested out or there is no handler", async () => {
    const pathUnits = units({ cTestOut: false });
    await renderPath(pathUnits);
    const locked = pathUnits[1].items[1];
    if (locked.kind !== "node") throw new Error("bad fixture");
    await fireEvent.press(screen.getByTestId(`path-node-${locked.node.id}`));
    expect(screen.getByText("Finish the one before it!")).toBeTruthy();
    expect(screen.queryByTestId("node-card-jump")).toBeNull();

    // Without canTestOut only the unit of the circle to play next can jump.
    const defaults = units();
    await renderPath(defaults);
    const lockedA = defaults[0].items[2];
    const lockedC = defaults[1].items[1];
    if (lockedA.kind !== "node" || lockedC.kind !== "node") throw new Error("bad fixture");
    await fireEvent.press(screen.getByTestId(`path-node-${lockedA.node.id}`));
    expect(screen.getByTestId("node-card-jump")).toBeTruthy();
    await fireEvent.press(screen.getByTestId(`path-node-${lockedC.node.id}`));
    expect(screen.queryByTestId("node-card-jump")).toBeNull();

    await renderPath(units({ cTestOut: true }), "none");
    await fireEvent.press(screen.getByTestId(`path-node-${lockedC.node.id}`));
    expect(screen.queryByTestId("node-card-jump")).toBeNull();
  });

  it("hides the banner key when the current unit cannot be tested out", async () => {
    await renderPath(units({ aTestOut: false, cTestOut: true }));
    expect(screen.queryByTestId("unit-test-out-unit-a")).toBeNull();
    // The key stays on the current unit only; later units jump from their locked circles.
    expect(screen.queryByTestId("unit-test-out-unit-c")).toBeNull();
  });

  it("keeps one START with several open circles, and an open circle elsewhere still starts", async () => {
    const pathUnits = units();
    const props = await renderPath(pathUnits);
    expect(screen.getAllByText("START")).toHaveLength(1);
    const open = pathUnits[1].items[0];
    if (open.kind !== "node") throw new Error("bad fixture");
    await fireEvent.press(screen.getByTestId(`path-node-${open.node.id}`));
    await fireEvent.press(screen.getByTestId("node-card-start"));
    expect(props.onStartNode).toHaveBeenCalledWith(open.node);
  });

  it("puts START on the first open circle when none is marked current", async () => {
    const pathUnits = units();
    pathUnits[0].items[1] = { kind: "node", node: view(1, "available"), lessonNumber: 2 };
    await renderPath(pathUnits);
    expect(screen.getAllByText("START")).toHaveLength(1);
    expect(screen.getByLabelText(`${view(1, "available").title}, start`)).toBeTruthy();
  });

  it("closes the card with a soft tap when the empty path is tapped", async () => {
    const pathUnits = units();
    await renderPath(pathUnits);
    const current = pathUnits[0].items[1];
    if (current.kind !== "node") throw new Error("bad fixture");
    await fireEvent.press(screen.getByTestId(`path-node-${current.node.id}`));
    playGameSound.mockClear();
    await fireEvent(screen.getByTestId("learn-path-content"), "responderRelease");
    expect(screen.queryByTestId("node-card")).toBeNull();
    expect(lastSounds()).toEqual(["soft_ui"]);
  });

  it("dresses every path mascot in the topic accent, not the unit tint", async () => {
    await renderPath(units());
    const mascots = screen.getAllByTestId("mascot");
    expect(mascots.length).toBeGreaterThan(0);
    for (const mascot of mascots) expect(mascot.props.accent).toBe(foundation.accentColor);
  });
});

describe("RefillSheet", () => {
  it("switches the bubble to a cheer as the last heart lands", async () => {
    jest.useFakeTimers();
    await render(<RefillSheet visible maxHearts={5} mascotVariant="hijabi" onRefill={jest.fn()} onShop={jest.fn()} />);
    expect(screen.getByText("Out of hearts!")).toBeTruthy();
    await fireEvent.press(screen.getByTestId("refill-claim"));
    await act(async () => {
      jest.advanceTimersByTime(4 * 110 + 20);
    });
    expect(screen.getByText("Out of hearts!")).toBeTruthy();
    await act(async () => {
      jest.advanceTimersByTime(110);
    });
    expect(screen.getByTestId("refill-hearts").props.accessibilityLabel).toBe("5 of 5 hearts");
    expect(screen.getByText("Hearts full!")).toBeTruthy();
    expect(screen.queryByText("Out of hearts!")).toBeNull();
    expect(screen.getByTestId("mascot").props.mood).toBe("cheer");
  });

  it("tells the child hearts come back tomorrow and keeps END LESSON", async () => {
    const onShop = jest.fn();
    const onEndLesson = jest.fn();
    await render(<RefillSheet visible variant="shop" maxHearts={5} mascotVariant="hijabi" onShop={onShop} onEndLesson={onEndLesson} />);
    expect(screen.getByText("Full hearts again tomorrow!")).toBeTruthy();
    expect(screen.getByText("GET HEARTS")).toBeTruthy();
    await fireEvent.press(screen.getByText("END LESSON"));
    expect(onEndLesson).toHaveBeenCalledTimes(1);
  });

  it("never sends a learner who cannot get hearts to the shop: PRACTICE or END LESSON instead", async () => {
    const onShop = jest.fn();
    const onEndLesson = jest.fn();
    const onPractice = jest.fn();
    const sheet = await render(
      <RefillSheet visible variant="shop" maxHearts={5} mascotVariant="hijabi" canGetHearts={false} onPractice={onPractice} onShop={onShop} onEndLesson={onEndLesson} />
    );
    expect(screen.queryByText("GET HEARTS")).toBeNull();
    expect(screen.getByText("Full hearts again tomorrow!")).toBeTruthy();
    await fireEvent.press(screen.getByText("PRACTICE"));
    await fireEvent.press(screen.getByText("END LESSON"));
    expect(onPractice).toHaveBeenCalledTimes(1);
    expect(onEndLesson).toHaveBeenCalledTimes(1);

    await sheet.rerender(<RefillSheet visible variant="shop" maxHearts={5} mascotVariant="hijabi" canGetHearts={false} onShop={onShop} onEndLesson={onEndLesson} />);
    expect(screen.queryByText("PRACTICE")).toBeNull();
    await fireEvent.press(screen.getByText("END LESSON"));
    expect(onEndLesson).toHaveBeenCalledTimes(2);
    expect(onShop).not.toHaveBeenCalled();
  });
});

describe("notice sheets play a sound as they open", () => {
  it("matches the mood, and can be silenced", async () => {
    const sheet = await render(<NoticeSheet visible title="Oops!" mood="sad" onClose={jest.fn()} />);
    expect(lastSounds()).toEqual(["wrong"]);

    playGameSound.mockClear();
    await sheet.rerender(<NoticeSheet visible={false} title="Oops!" mood="sad" onClose={jest.fn()} />);
    await sheet.rerender(<NoticeSheet visible title="Welcome back!" mood="cheer" onClose={jest.fn()} />);
    expect(lastSounds()).toEqual(["unlock"]);

    // A new message while open plays again; the same one does not.
    playGameSound.mockClear();
    await sheet.rerender(<NoticeSheet visible title="Welcome back!" mood="cheer" onClose={jest.fn()} />);
    expect(lastSounds()).toEqual([]);
    await sheet.rerender(<NoticeSheet visible title="Logged out" mood="wave" onClose={jest.fn()} />);
    expect(lastSounds()).toEqual(["soft_ui"]);

    playGameSound.mockClear();
    await sheet.rerender(<NoticeSheet visible={false} title="Quiet" sound={false} onClose={jest.fn()} />);
    await sheet.rerender(<NoticeSheet visible title="Quiet" sound={false} onClose={jest.fn()} />);
    expect(lastSounds()).toEqual([]);
  });

  it("plays the wrong sound when a failed test-out result opens", async () => {
    await render(
      <ConfirmSheet visible title="3 of 8 right" line="Get 6 to jump ahead." confirmLabel="Try again" cancelLabel="Back" danger={false} mood="sad" onConfirm={jest.fn()} onCancel={jest.fn()} />
    );
    expect(lastSounds()).toEqual(["wrong"]);
  });

  it("plays the sound of each queued request from its first frame", async () => {
    let api: ReturnType<typeof useNotices> | undefined;
    function Harness() {
      api = useNotices({ mascotVariant: "boy" });
      return <View>{api.sheets}</View>;
    }
    await render(<Harness />);
    expect(lastSounds()).toEqual([]);
    await act(async () => {
      void api!.notify("Could not delete it", undefined, { mood: "sad" });
      void api!.notify("Premium is back!", undefined, { mood: "cheer" });
    });
    expect(lastSounds()).toEqual(["wrong"]);
    await fireEvent.press(screen.getByText("OK"));
    expect(screen.getByText("Premium is back!")).toBeTruthy();
    expect(lastSounds()).toEqual(["wrong", "soft_ui", "unlock"]);
  });
});

describe("SettingsSheet", () => {
  it("keeps SAVE in a fixed footer outside the scrolling rows", async () => {
    const onSave = jest.fn();
    await render(
      <SettingsSheet
        visible
        role="child"
        streakReminder
        islamicReminder
        dailyCheckIn
        weeklyCheckIn
        soundEnabled
        softSound={false}
        onSelectRole={jest.fn()}
        onToggleStreak={jest.fn()}
        onToggleIslamic={jest.fn()}
        onToggleDaily={jest.fn()}
        onToggleWeekly={jest.fn()}
        onToggleSound={jest.fn()}
        onToggleSoftSound={jest.fn()}
        onSave={onSave}
        onClose={jest.fn()}
        onLogout={jest.fn()}
        onDeleteAccount={jest.fn()}
      />
    );
    const scroll = screen.getByTestId("settings-scroll");
    expect(scroll.props.showsVerticalScrollIndicator).not.toBe(false);
    // Rows scroll; SAVE does not.
    expect(screen.getByTestId("settings-soft")).toBeTruthy();
    const inside = (id: string) => {
      let node = screen.getByTestId(id).parent;
      while (node) {
        if (node.props.testID === "settings-scroll") return true;
        node = node.parent;
      }
      return false;
    };
    expect(inside("settings-soft")).toBe(true);
    expect(inside("settings-logout")).toBe(true);
    expect(inside("settings-save")).toBe(false);

    // The arrow shows once the rows are taller than the space they get.
    await fireEvent(scroll, "layout", { nativeEvent: { layout: { x: 0, y: 0, width: 288, height: 300 } } });
    await fireEvent(scroll, "contentSizeChange", 288, 700);
    expect(screen.getByTestId("settings-more")).toBeTruthy();
    await fireEvent.press(screen.getByTestId("settings-save"));
    expect(onSave).toHaveBeenCalledTimes(1);
  });
});

describe("text that fits without adjustsFontSizeToFit", () => {
  it("sizes segment labels, language names and initials up front", async () => {
    await render(
      <LanguageSheet
        visible
        options={[
          { id: "fr", code: "FR", label: "French", nativeLabel: "Français" },
          { id: "xx", code: "XX", label: "Long", nativeLabel: "A very long language name" }
        ]}
        selected="fr"
        canClose
        onSelect={jest.fn()}
        onSave={jest.fn()}
        onClose={jest.fn()}
      />
    );
    for (const label of ["Français", "A very long language name"]) {
      expect(screen.getByText(label).props.adjustsFontSizeToFit).toBeUndefined();
    }
    const flat = (label: string) => Object.assign({}, ...[screen.getByText(label).props.style].flat(3).filter(Boolean));
    expect(flat("A very long language name").fontSize).toBeLessThan(flat("Français").fontSize);

    await render(
      <AccountSheet
        visible
        mode="create"
        mascotVariant="hijabi"
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
    expect(screen.getByText("Log in").props.adjustsFontSizeToFit).toBeUndefined();

    await render(<ProfileView user={makeUser({ hasAccount: true, displayName: "Amina", avatarInitials: "AMR" })} strings={getUiStrings("en")} learnerProfile={profile()} onOpenSettings={jest.fn()} />);
    const initials = screen.getByText("AMR");
    expect(initials.props.adjustsFontSizeToFit).toBeUndefined();
    expect(Object.assign({}, ...[initials.props.style].flat(3).filter(Boolean)).fontSize).toBeLessThan(42);
  });
});

function profile() {
  return createEmptyLearnerProfile();
}

describe("saved account on this device", () => {
  it("asks a returning guest to LOG IN on the Me tab and in Crew", async () => {
    const onCreateAccount = jest.fn();
    const strings = getUiStrings("en");
    const me = await render(<ProfileView user={makeUser()} strings={strings} learnerProfile={profile()} onOpenSettings={jest.fn()} onCreateAccount={onCreateAccount} hasSavedAccount />);
    expect(screen.getByText("Welcome back!")).toBeTruthy();
    expect(screen.queryByText("SIGN UP")).toBeNull();
    await fireEvent.press(screen.getByText("LOG IN"));
    expect(onCreateAccount).toHaveBeenCalledTimes(1);

    await me.rerender(<ProfileView user={makeUser()} strings={strings} learnerProfile={profile()} onOpenSettings={jest.fn()} onCreateAccount={onCreateAccount} />);
    expect(screen.getByText("Save your progress")).toBeTruthy();
    expect(screen.getByText("SIGN UP")).toBeTruthy();

    await render(
      <CrewView
        user={makeUser()}
        crew={{ status: "signed_out" }}
        inviteEmail=""
        inviteRelation="friend"
        onChangeInviteEmail={jest.fn()}
        onChangeInviteRelation={jest.fn()}
        onAddFriend={jest.fn()}
        onRemoveFriend={jest.fn()}
        onRefresh={jest.fn()}
        onCreateAccount={onCreateAccount}
        hasSavedAccount
      />
    );
    expect(screen.getByText("LOG IN")).toBeTruthy();
  });
});

describe("AccountSheet server errors", () => {
  function sheet(error?: string, errorKey?: number) {
    return (
      <AccountSheet
        visible
        mode="login"
        mascotVariant="hijabi"
        name=""
        email="amina@example.com"
        password="salaam123"
        error={error}
        errorKey={errorKey}
        onChangeMode={jest.fn()}
        onChangeName={jest.fn()}
        onChangeEmail={jest.fn()}
        onChangePassword={jest.fn()}
        onSubmit={jest.fn()}
        onClose={jest.fn()}
      />
    );
  }

  it("plays the wrong sound when a failed log in comes back, and again on the next failure", async () => {
    const view = await render(sheet());
    await fireEvent.press(screen.getByTestId("account-submit"));
    expect(lastSounds()).toEqual(["soft_ui"]);

    await view.rerender(sheet("Wrong email or password.", 1));
    expect(screen.getByTestId("account-error")).toBeTruthy();
    expect(lastSounds()).toEqual(["soft_ui", "wrong"]);

    // Same message, next failed try.
    await view.rerender(sheet("Wrong email or password.", 2));
    expect(lastSounds()).toEqual(["soft_ui", "wrong", "wrong"]);

    // Nothing new: no sound.
    await view.rerender(sheet("Wrong email or password.", 2));
    expect(lastSounds()).toEqual(["soft_ui", "wrong", "wrong"]);
  });
});

describe("ShopView with purchases off", () => {
  it("says what is true and what the learner can do", async () => {
    const onDone = jest.fn();
    const section = COURSE.sections[0];
    await render(
      <ShopView user={makeUser()} strings={getUiStrings("en")} items={SHOP_ITEMS} storePrices={{}} busy={false} section={section} canBuyWithMoney={false} onUseItem={jest.fn()} onRestore={jest.fn()} onDone={onDone} />
    );
    expect(screen.queryByText(/in the app/i)).toBeNull();
    expect(screen.getByText("Premium can't be bought here")).toBeTruthy();
    expect(screen.getByText("All the other lessons are free!")).toBeTruthy();
    await fireEvent.press(screen.getByText("KEEP LEARNING"));
    expect(onDone).toHaveBeenCalledTimes(1);
  });
});

describe("web audio", () => {
  type FakeContext = { state: string; currentTime: number; destination: object; resume: jest.Mock; createOscillator: jest.Mock; createGain: jest.Mock };

  function fakeContext(resumeAfter: () => Promise<void>): FakeContext {
    const param = () => ({ setValueAtTime: jest.fn(), linearRampToValueAtTime: jest.fn(), exponentialRampToValueAtTime: jest.fn() });
    const context: FakeContext = {
      state: "suspended",
      currentTime: 0,
      destination: {},
      resume: jest.fn(async () => {
        await resumeAfter();
        context.state = "running";
      }),
      createOscillator: jest.fn(() => ({ type: "", frequency: param(), connect: jest.fn(), start: jest.fn(), stop: jest.fn() })),
      createGain: jest.fn(() => ({ gain: param(), connect: jest.fn() }))
    };
    return context;
  }

  function loadWebAudio(context: FakeContext) {
    const host = globalThis as unknown as { window?: Record<string, unknown> };
    const hadWindow = "window" in host;
    const previous = host.window?.AudioContext;
    host.window = host.window ?? {};
    host.window.AudioContext = jest.fn(() => context);
    type WebAudio = { playGameSound: (event: string) => void };
    let audio: WebAudio | undefined;
    jest.isolateModules(() => {
      // The web build of the module (jest resolves the .native one by default).
      audio = jest.requireActual<WebAudio>("../services/gameAudio.ts");
    });
    const restore = () => {
      if (!hadWindow) delete host.window;
      else if (host.window) host.window.AudioContext = previous;
    };
    return { audio: audio!, restore };
  }

  it("plays the first tap once a suspended context has resumed", async () => {
    jest.useRealTimers();
    const context = fakeContext(() => new Promise((resolve) => setTimeout(resolve, 15)));
    const { audio, restore } = loadWebAudio(context);
    try {
      audio.playGameSound("soft_ui");
      expect(context.resume).toHaveBeenCalled();
      expect(context.createOscillator).not.toHaveBeenCalled();
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 40));
      });
      expect(context.createOscillator).toHaveBeenCalledTimes(1);
      // Running now: the next tap plays at once.
      audio.playGameSound("node_tap");
      expect(context.createOscillator).toHaveBeenCalledTimes(3);
    } finally {
      restore();
    }
  });

  it("drops a sound whose resume only finished much later", async () => {
    jest.useRealTimers();
    const context = fakeContext(() => new Promise((resolve) => setTimeout(resolve, 700)));
    const { audio, restore } = loadWebAudio(context);
    try {
      audio.playGameSound("wrong");
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 760));
      });
      expect(context.state).toBe("running");
      expect(context.createOscillator).not.toHaveBeenCalled();
    } finally {
      restore();
    }
  });
});
