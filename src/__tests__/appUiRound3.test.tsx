import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { fireEvent, render, screen, within } from "@testing-library/react-native";
import { COURSE } from "../data/course";
import { SHOP_ITEMS_WITH_GEMS } from "./testUtils";
import { getUiStrings } from "../i18n";
import { createEmptyLearnerProfile } from "../services/foundationAssessment";
import type { LearningNodeView, LearningSection, UserProfile } from "../types";
import { FeedbackSheet, LearnCard, LessonBottomBar, useScrollMore } from "../ui/lesson";
import { SCROLL_HINT_ROOM } from "../ui/lesson/ScrollHint";
import { AccountSheet, LearnPath, ProfileView, ShopView, countStars, type PathUnit } from "../ui/screens";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

const foundation = COURSE.sections.find((section) => section.topicId === "foundation") as LearningSection;
const strings = getUiStrings("en");
const flat = (style: unknown) => (StyleSheet.flatten(style as never) ?? {}) as Record<string, unknown>;

function makeUser(overrides: Partial<UserProfile> = {}): UserProfile {
  return {
    id: 1,
    username: "amina",
    displayName: "Amina",
    avatarInitials: "AR",
    hasAccount: false,
    streakDays: 0,
    totalXp: 0,
    dailyGoalXp: 40,
    gems: 120,
    hearts: { current: 5, max: 5, unlimited: false, lastRefillDate: "2026-10-19" },
    completedLessonIds: [],
    completedNodeIds: [],
    ...overrides
  };
}

describe("the scroll hint never covers text", () => {
  it("sits inside the bottom bar, in a gap that grows to hold it", async () => {
    function Harness() {
      const { ref, scrollProps, more, scrollDown } = useScrollMore();
      return (
        <>
          <ScrollView ref={ref} testID="harness-scroll" {...scrollProps}>
            <Text>Content</Text>
          </ScrollView>
          <LessonBottomBar scrollHint={{ visible: more, onPress: scrollDown }}>
            <Text>Bar</Text>
          </LessonBottomBar>
        </>
      );
    }
    await render(<Harness />);
    const scroll = screen.getByTestId("harness-scroll");
    await fireEvent(scroll, "layout", { nativeEvent: { layout: { x: 0, y: 0, width: 320, height: 400 } } });
    await fireEvent(scroll, "contentSizeChange", 320, 600);
    const hint = screen.getByTestId("scroll-more");
    // Below the bar's top edge, never hanging over the scrolling part.
    expect(flat(hint.props.style).top).toBeGreaterThanOrEqual(0);
    expect(flat(hint.props.style).bottom).toBeUndefined();
    expect(flat(hint.parent?.props.style).height).toBe(SCROLL_HINT_ROOM);
  });

  it("FeedbackSheet's arrow shows for one hidden step and sits in the gap above the button", async () => {
    const steps = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"];
    await render(<FeedbackSheet visible correct={false} title="Correct order:" correctList={steps} onContinue={jest.fn()} />);
    const body = screen.getByTestId("feedback-body");
    const listMax = flat(body.props.style).maxHeight as number;
    await fireEvent(body, "layout", { nativeEvent: { layout: { x: 0, y: 0, width: 288, height: 175 } } });
    // One 20 px row hidden below the fold is enough.
    await fireEvent(body, "contentSizeChange", 288, 175 + 20);
    const more = screen.getByTestId("feedback-more");
    expect(flat(more.props.style).top).toBeGreaterThanOrEqual(0);
    // The body gives the arrow its room, so the sheet keeps its height.
    expect(flat(screen.getByTestId("feedback-body").props.style).maxHeight).toBe(listMax - (SCROLL_HINT_ROOM - 16));
    await fireEvent.scroll(body, { nativeEvent: { contentOffset: { x: 0, y: 20 }, contentSize: { width: 288, height: 195 }, layoutMeasurement: { width: 288, height: 175 } } });
    expect(screen.queryByTestId("feedback-more")).toBeNull();
    // At the end the arrow turns to point up, so the gap it keeps above the button is never empty.
    expect(screen.getByTestId("feedback-more-up")).toBeTruthy();
    expect(flat(screen.getByTestId("feedback-body").props.style).maxHeight).toBe(listMax - (SCROLL_HINT_ROOM - 16));
  });

  it("gives a correct-order list a little more room than a long answer", async () => {
    const { rerender } = await render(<FeedbackSheet visible correct={false} correctLabel="A short answer" onContinue={jest.fn()} />);
    const answerMax = flat(screen.getByTestId("feedback-body").props.style).maxHeight as number;
    await rerender(<FeedbackSheet visible correct={false} title="Correct order:" correctList={["One", "Two"]} onContinue={jest.fn()} />);
    expect(flat(screen.getByTestId("feedback-body").props.style).maxHeight).toBeGreaterThan(answerMax);
  });
});

describe("premium circles where Premium cannot be bought", () => {
  it("say why they are locked and show no UNLOCK", async () => {
    const node: LearningNodeView = { ...foundation.nodes[0], status: "current", firstLessonId: foundation.nodes[0].lessonIds[0] };
    const units: PathUnit[] = [
      { id: "unit-p", number: 1, title: "Review", done: 0, total: 1, premiumLocked: true, items: [{ kind: "node", node, lessonNumber: 1 }] }
    ];
    await render(
      <LearnPath
        accent={foundation.accentColor}
        topicId="foundation"
        mascotVariant="boy"
        units={units}
        xpForNode={(item) => item.xpReward}
        onStartNode={jest.fn()}
        onClaimChest={jest.fn()}
        onPremium={jest.fn()}
        canBuyPremium={false}
      />
    );
    await fireEvent.press(screen.getByTestId(`path-node-${node.id}`));
    expect(screen.queryByTestId("node-card-unlock")).toBeNull();
    expect(screen.getByTestId("node-card-locked")).toHaveTextContent("Premium lesson");
  });
});

describe("shop hearts", () => {
  it("says hearts are full before asking for more gems", async () => {
    await render(
      <ShopView user={makeUser({ gems: 120 })} strings={strings} items={SHOP_ITEMS_WITH_GEMS} storePrices={{}} busy={false} section={foundation} onUseItem={jest.fn()} onRestore={jest.fn()} />
    );
    expect(screen.getByTestId("shop-line-gem-heart-refill")).toHaveTextContent("Hearts are full");
    expect(screen.queryByText(/^Need \d+ more$/)).toBeNull();
  });
});

describe("Me", () => {
  it("greys the flame at 0, like the top bar", async () => {
    await render(<ProfileView user={makeUser()} strings={strings} learnerProfile={createEmptyLearnerProfile()} onOpenSettings={jest.fn()} />);
    const number = within(screen.getByTestId("profile-streak")).getByText("0");
    expect(flat(number.props.style).color).not.toBe("#FF8A1F");
  });

  it("counts the best stars earned on each circle", () => {
    const [a, b] = foundation.nodes;
    expect(countStars([a.id, b.id])).toBe(a.starsReward + b.starsReward);
    expect(countStars([a.id, b.id], { [a.id]: 1, [b.id]: 2 })).toBe(3);
    // A circle with no record yet counts its reward.
    expect(countStars([a.id, b.id], { [a.id]: 1 })).toBe(1 + b.starsReward);
  });
});

describe("account sheet", () => {
  const props = {
    visible: true,
    mascotVariant: "hijabi",
    name: "",
    email: "",
    password: "",
    onChangeMode: jest.fn(),
    onChangeName: jest.fn(),
    onChangeEmail: jest.fn(),
    onChangePassword: jest.fn(),
    onSubmit: jest.fn(),
    onClose: jest.fn()
  };

  it("logs in with no gate, and asks a grown-up before the sign up form", async () => {
    const view = await render(<AccountSheet {...props} mode="login" />);
    expect(screen.queryByTestId("account-grownup")).toBeNull();
    expect(screen.getByTestId("account-email")).toBeTruthy();

    await view.rerender(<AccountSheet {...props} mode="create" />);
    expect(screen.getByTestId("account-grownup")).toBeTruthy();
    expect(screen.queryByTestId("account-email")).toBeNull();
    const [x, y] = (String(screen.getByTestId("grownup-question").props.children).match(/\d+/g) ?? []).map(Number);
    await fireEvent.press(screen.getByTestId(`grownup-option-${x * y}`));
    expect(screen.getByTestId("account-name")).toBeTruthy();

    // Closing the sheet asks again next time.
    await view.rerender(<AccountSheet {...props} mode="create" visible={false} />);
    await view.rerender(<AccountSheet {...props} mode="create" />);
    expect(screen.getByTestId("account-grownup")).toBeTruthy();
  });
});

describe("learn card source chip", () => {
  const base = { title: "Prayer", line: "Pray five times a day.", mascotVariant: "boy", accent: foundation.accentColor, onContinue: jest.fn() };

  it("shows only the short reference of learnSource, on one line", async () => {
    await render(<LearnCard {...base} learnSource={{ reference: "Quran 2:43", url: "https://quran.com/2/43" }} onOpenSource={jest.fn()} />);
    const chip = screen.getByTestId("learn-source");
    expect(chip).toHaveTextContent("Quran 2:43");
    expect(screen.getByText("Quran 2:43").props.numberOfLines).toBe(1);
  });

  it("shows no chip without a learnSource reference, even when an older source is passed", async () => {
    await render(<LearnCard {...base} learnSource={{ url: "https://example.org/article" }} source={{ label: "A long article title", url: "https://example.org/article" }} />);
    expect(screen.queryByTestId("learn-source")).toBeNull();
  });

  it("opens a long page at the highlighted words that say the fact", async () => {
    const onOpenSource = jest.fn();
    await render(
      <LearnCard
        {...base}
        learnSource={{ reference: "IslamQA 119256", url: "https://islamqa.info/en/answers/119256", highlight: "He studied with Ibn Hormuz … under Imam Ibn Shihab az-Zuhri" }}
        onOpenSource={onOpenSource}
      />
    );
    fireEvent.press(screen.getByTestId("learn-source"));
    expect(onOpenSource).toHaveBeenCalledWith("https://islamqa.info/en/answers/119256#:~:text=He%20studied%20with%20Ibn,Imam%20Ibn%20Shihab%20az%2DZuhri");
  });
});
