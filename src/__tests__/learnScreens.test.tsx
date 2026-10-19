import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { COURSE } from "../data/course";
import type { LearningNodeView } from "../types";
import { playGameSound } from "../services/gameAudio";
import { Icon } from "../ui/Icon";
import { AppTopBar, BottomTabs, LearnPath, TopicPicker, type PathUnit } from "../ui/screens";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

const foundation = COURSE.sections.find((section) => section.topicId === "foundation")!;

function view(index: number, status: LearningNodeView["status"]): LearningNodeView {
  const node = foundation.nodes[index];
  return { ...node, status, firstLessonId: node.lessonIds[0] };
}

function makeUnits(): PathUnit[] {
  return [
    {
      id: "unit-a",
      number: 1,
      title: "Greetings and replies",
      arabic: { ar: "التحية", translit: "At-tahiyyah", meaning: "The greeting" },
      done: 1,
      total: 3,
      items: [
        { kind: "node", node: view(0, "completed"), lessonNumber: 1 },
        { kind: "chest", chest: { id: "chest-1", gemsReward: 20, unlocked: true, claimed: false } },
        { kind: "node", node: view(1, "current"), lessonNumber: 2, progress: 0.5 },
        { kind: "node", node: view(2, "locked"), lessonNumber: 3 }
      ]
    },
    {
      id: "unit-b",
      number: 2,
      title: "Daily words",
      done: 0,
      total: 1,
      premiumLocked: true,
      items: [{ kind: "chest", chest: { id: "chest-2", gemsReward: 20, unlocked: false, claimed: false } }]
    }
  ];
}

async function renderPath(overrides: Partial<React.ComponentProps<typeof LearnPath>> = {}) {
  const props = {
    accent: foundation.accentColor,
    topicId: "foundation",
    mascotVariant: "hijabi",
    units: makeUnits(),
    xpForNode: (node: LearningNodeView) => node.xpReward,
    onStartNode: jest.fn(),
    onClaimChest: jest.fn(),
    onTestOut: jest.fn(),
    ...overrides
  };
  await render(<LearnPath {...props} />);
  return { props };
}

describe("AppTopBar", () => {
  const base = {
    topicId: "prayer",
    topicTitle: "Prayer",
    accent: "#3A9FE8",
    streakDays: 3,
    gems: 120,
    hearts: { current: 4, max: 5, unlimited: false }
  };

  it("opens topics, shop and streak", async () => {
    const onOpenTopics = jest.fn();
    const onOpenShop = jest.fn();
    const onStreak = jest.fn();
    await render(<AppTopBar {...base} onOpenTopics={onOpenTopics} onOpenShop={onOpenShop} onStreak={onStreak} />);

    await fireEvent.press(screen.getByTestId("top-bar-topic"));
    await fireEvent.press(screen.getByTestId("top-bar-gems"));
    await fireEvent.press(screen.getByTestId("top-bar-hearts"));
    await fireEvent.press(screen.getByTestId("top-bar-streak"));

    expect(onOpenTopics).toHaveBeenCalledTimes(1);
    expect(onOpenShop).toHaveBeenCalledTimes(2);
    expect(onStreak).toHaveBeenCalledTimes(1);
    expect(screen.getByText("120")).toBeTruthy();
    expect(screen.getByText("4")).toBeTruthy();
  });

  it("shows a plain streak when there is no streak handler", async () => {
    await render(<AppTopBar {...base} onOpenTopics={jest.fn()} onOpenShop={jest.fn()} />);
    expect(screen.getByTestId("top-bar-streak").props.accessibilityRole).toBeUndefined();
    expect(screen.queryByRole("button", { name: "3 day streak" })).toBeNull();
    expect(screen.getByText("3")).toBeTruthy();
  });

  it("shows infinity for unlimited hearts", async () => {
    await render(
      <AppTopBar {...base} hearts={{ current: 0, max: 5, unlimited: true }} onOpenTopics={jest.fn()} onOpenShop={jest.fn()} />
    );
    expect(screen.getByTestId("top-bar-hearts-unlimited")).toBeTruthy();
  });
});

describe("BottomTabs", () => {
  it("calls onChange with the tab key and shows dots", async () => {
    const onChange = jest.fn();
    await render(<BottomTabs active="learn" onChange={onChange} dots={{ crew: true }} />);

    await fireEvent.press(screen.getByTestId("tab-practice"));
    await fireEvent.press(screen.getByTestId("tab-me"));

    expect(onChange).toHaveBeenNthCalledWith(1, "practice");
    expect(onChange).toHaveBeenNthCalledWith(2, "me");
    expect(screen.getByTestId("tab-crew-dot")).toBeTruthy();
    expect(screen.queryByTestId("tab-shop-dot")).toBeNull();
  });
});

describe("LearnPath", () => {
  it("opens a node card and starts the node", async () => {
    const { props } = await renderPath();
    const current = props.units[0].items[2];
    if (current.kind !== "node") throw new Error("bad fixture");

    expect(screen.getByText("START")).toBeTruthy();
    await fireEvent.press(screen.getByTestId(`path-node-${current.node.id}`));
    expect(playGameSound).toHaveBeenLastCalledWith("node_tap", expect.anything());
    await fireEvent.press(screen.getByText(`START +${current.node.xpReward} XP`));

    expect(props.onStartNode).toHaveBeenCalledWith(current.node);
  });

  it("closes the card on a second tap or a tap elsewhere", async () => {
    const { props } = await renderPath();
    const current = props.units[0].items[2];
    if (current.kind !== "node") throw new Error("bad fixture");

    await fireEvent.press(screen.getByTestId(`path-node-${current.node.id}`));
    expect(screen.getByTestId("node-card")).toBeTruthy();
    await fireEvent.press(screen.getByTestId(`path-node-${current.node.id}`));
    expect(screen.queryByTestId("node-card")).toBeNull();

    await fireEvent.press(screen.getByTestId(`path-node-${current.node.id}`));
    await fireEvent(screen.getByTestId("learn-path-content"), "responderRelease");
    expect(screen.queryByTestId("node-card")).toBeNull();
  });

  it("offers practice on completed nodes and no START on locked ones, which say why", async () => {
    const { props } = await renderPath();
    const done = props.units[0].items[0];
    const locked = props.units[0].items[3];
    if (done.kind !== "node" || locked.kind !== "node") throw new Error("bad fixture");

    await fireEvent.press(screen.getByTestId(`path-node-${done.node.id}`));
    await fireEvent.press(screen.getByText(`PRACTICE +${done.node.xpReward} XP`));
    expect(props.onStartNode).toHaveBeenCalledWith(done.node);

    await fireEvent.press(screen.getByTestId(`path-node-${locked.node.id}`));
    expect(screen.getByText("Finish the one before it!")).toBeTruthy();
    expect(screen.getByText("3 of 3")).toBeTruthy();
    expect(screen.queryByTestId("node-card-start")).toBeNull();
  });

  it("claims an unlocked chest and ignores a locked one", async () => {
    const { props } = await renderPath();

    await fireEvent.press(screen.getByTestId("path-chest-chest-1"));
    expect(playGameSound).toHaveBeenLastCalledWith("reward_chest", expect.anything());
    await fireEvent.press(screen.getByTestId("path-chest-chest-2"));

    expect(props.onClaimChest).toHaveBeenCalledTimes(1);
    expect(props.onClaimChest).toHaveBeenCalledWith(expect.objectContaining({ id: "chest-1" }));
  });

  it("answers a tap on a locked or opened chest with a sound and a short hint", async () => {
    jest.useFakeTimers();
    const units = makeUnits();
    units[0].items[1] = { kind: "chest", chest: { id: "chest-1", gemsReward: 20, unlocked: true, claimed: true } };
    const { props } = await renderPath({ units });

    await fireEvent.press(screen.getByTestId("path-chest-chest-2"));
    expect(playGameSound).toHaveBeenLastCalledWith("soft_ui", expect.anything());
    expect(screen.getByText("Keep going!")).toBeTruthy();

    await fireEvent.press(screen.getByTestId("path-chest-chest-1"));
    expect(screen.getByText("Opened!")).toBeTruthy();
    expect(props.onClaimChest).not.toHaveBeenCalled();

    await act(async () => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.queryByText("Opened!")).toBeNull();
    expect(screen.queryByText("Keep going!")).toBeNull();
    jest.useRealTimers();
  });

  it("asks before the test-out key starts a test", async () => {
    const { props } = await renderPath();

    expect(screen.queryByText("Jump ahead?")).toBeNull();
    await fireEvent.press(screen.getByTestId("unit-test-out-unit-a"));
    expect(screen.getByText("Jump ahead?")).toBeTruthy();
    expect(props.onTestOut).not.toHaveBeenCalled();

    await fireEvent.press(screen.getByText("NOT NOW"));
    expect(props.onTestOut).not.toHaveBeenCalled();

    await fireEvent.press(screen.getByTestId("unit-test-out-unit-a"));
    await fireEvent.press(screen.getByText("START TEST"));
    expect(props.onTestOut).toHaveBeenCalledTimes(1);
    expect(props.onTestOut).toHaveBeenCalledWith("unit-a");
  });

  it("shows the test-out key only on the current unit", async () => {
    await renderPath();

    expect(screen.getByTestId("unit-test-out-unit-a")).toBeTruthy();
    expect(screen.queryByTestId("unit-test-out-unit-b")).toBeNull();
    expect(screen.getByTestId("unit-premium-unit-b")).toBeTruthy();
    expect(screen.getByText("UNIT 1")).toBeTruthy();
    expect(screen.getByText("1/3")).toBeTruthy();
  });

  it("ends the topic with a trophy and a button to the topics", async () => {
    jest.useFakeTimers();
    const onNextTopic = jest.fn();
    await renderPath({ onNextTopic });

    expect(screen.getByTestId("path-end")).toBeTruthy();
    await fireEvent.press(screen.getByTestId("path-end-trophy"));
    expect(screen.getByText("Keep going!")).toBeTruthy();
    await fireEvent.press(screen.getByText("MORE TOPICS"));
    expect(onNextTopic).toHaveBeenCalledTimes(1);
    await act(async () => {
      jest.advanceTimersByTime(2000);
    });
    jest.useRealTimers();
  });

  it("turns the trophy gold and offers the next topic once every unit is done", async () => {
    const units: PathUnit[] = [
      { id: "unit-a", number: 1, title: "Greetings and replies", done: 1, total: 1, items: [{ kind: "node", node: view(0, "completed"), lessonNumber: 1 }] }
    ];
    const onNextTopic = jest.fn();
    await renderPath({ units, onNextTopic });

    expect(screen.getByLabelText("Topic trophy, done")).toBeTruthy();
    await fireEvent.press(screen.getByText("NEXT TOPIC"));
    expect(onNextTopic).toHaveBeenCalledTimes(1);
  });

  it("leaves out the end button when there is no handler", async () => {
    await renderPath();
    expect(screen.getByTestId("path-end-trophy")).toBeTruthy();
    expect(screen.queryByTestId("path-next-topic")).toBeNull();
  });

  it("shows one START when the data marks the first node of every unit current", async () => {
    const units = makeUnits();
    units[1] = {
      id: "unit-c",
      number: 2,
      title: "Daily words",
      done: 0,
      total: 2,
      items: [
        { kind: "node", node: view(3, "current"), lessonNumber: 4 },
        { kind: "node", node: view(4, "locked"), lessonNumber: 5 }
      ]
    };
    const { props } = await renderPath({ units });

    expect(screen.getAllByText("START")).toHaveLength(1);
    expect(screen.getByTestId("unit-test-out-unit-a")).toBeTruthy();
    expect(screen.queryByTestId("unit-test-out-unit-c")).toBeNull();
    // The second "current" node is still open to play.
    const second = units[1].items[0];
    if (second.kind !== "node") throw new Error("bad fixture");
    await fireEvent.press(screen.getByTestId(`path-node-${second.node.id}`));
    await fireEvent.press(screen.getByTestId("node-card-start"));
    expect(props.onStartNode).toHaveBeenCalledWith(second.node);
  });

  it("keeps the card open when the card itself is touched", async () => {
    const { props } = await renderPath();
    const current = props.units[0].items[2];
    if (current.kind !== "node") throw new Error("bad fixture");

    await fireEvent.press(screen.getByTestId(`path-node-${current.node.id}`));
    const card = screen.getByTestId("node-card");
    expect(card.props.onStartShouldSetResponder?.()).toBe(true);
    await fireEvent(card, "responderRelease");
    expect(screen.getByTestId("node-card")).toBeTruthy();
    // START is hidden while its card is open.
    expect(screen.queryByText("START")).toBeNull();
  });

  it("gates a premium unit behind UNLOCK", async () => {
    const units = makeUnits();
    units[1] = {
      id: "unit-p",
      number: 2,
      title: "Daily words",
      done: 0,
      total: 1,
      premiumLocked: true,
      items: [{ kind: "node", node: view(3, "current"), lessonNumber: 4 }]
    };
    const onPremium = jest.fn();
    const { props } = await renderPath({ units, onPremium });
    const premiumNode = units[1].items[0];
    if (premiumNode.kind !== "node") throw new Error("bad fixture");

    expect(screen.getAllByText("START")).toHaveLength(1);
    await fireEvent.press(screen.getByTestId(`path-node-${premiumNode.node.id}`));
    expect(screen.queryByTestId("node-card-start")).toBeNull();
    await fireEvent.press(screen.getByTestId("node-card-unlock"));
    await fireEvent.press(screen.getByTestId("unit-premium-unit-p"));
    expect(onPremium).toHaveBeenNthCalledWith(1, "unit-p");
    expect(onPremium).toHaveBeenNthCalledWith(2, "unit-p");
    expect(props.onStartNode).not.toHaveBeenCalled();
  });

  it("drops the open card when the topic changes", async () => {
    const { props } = await renderPath();
    const current = props.units[0].items[2];
    if (current.kind !== "node") throw new Error("bad fixture");
    await fireEvent.press(screen.getByTestId(`path-node-${current.node.id}`));
    expect(screen.getByTestId("node-card")).toBeTruthy();

    await screen.rerender(<LearnPath {...props} topicId="prayer" />);
    expect(screen.queryByTestId("node-card")).toBeNull();
  });
});

describe("Icon", () => {
  type SvgNode = { props?: { fill?: { payload?: number } }; children?: unknown[] };
  // react-native-svg hands fills to native as ARGB numbers.
  const DETAIL = 0xff123456;

  async function bookFills(detailColor?: string) {
    const fills = new Set<number>();
    const walk = (node: unknown) => {
      if (!node || typeof node !== "object") return;
      const { props, children } = node as SvgNode;
      if (typeof props?.fill?.payload === "number") fills.add(props.fill.payload);
      children?.forEach(walk);
    };
    await render(<Icon name="book" color="#FFFFFF" detailColor={detailColor} />);
    walk(screen.toJSON());
    return fills;
  }

  it("draws a white silhouette's details in the detail color", async () => {
    expect(await bookFills()).not.toContain(DETAIL);
    expect(await bookFills("#123456")).toContain(DETAIL);
  });
});

describe("TopicPicker", () => {
  it("selects a topic and closes", async () => {
    const onSelect = jest.fn();
    const onClose = jest.fn();
    await render(
      <TopicPicker
        visible
        onClose={onClose}
        onSelect={onSelect}
        activeTopicId="foundation"
        topics={[
          { topicId: "foundation", title: "Foundation", accent: "#1CB66D", done: 2, total: 20 },
          { topicId: "prayer", title: "Prayer", accent: "#3A9FE8", arabic: { ar: "الصلاة", translit: "As-salah", meaning: "Prayer" }, done: 0, total: 80 }
        ]}
      />
    );

    expect(screen.getByText("Choose a topic")).toBeTruthy();
    expect(screen.getByText("0/80")).toBeTruthy();
    expect(screen.queryByTestId("topic-done-prayer")).toBeNull();
    await fireEvent.press(screen.getByTestId("topic-tile-prayer"));

    expect(onSelect).toHaveBeenCalledWith("prayer");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("marks a finished topic as done", async () => {
    await render(
      <TopicPicker
        visible
        onClose={jest.fn()}
        onSelect={jest.fn()}
        activeTopicId="x"
        topics={[{ topicId: "aqidah", title: "Aqidah", accent: "#14B884", done: 20, total: 20 }]}
      />
    );
    expect(screen.getByTestId("topic-done-aqidah")).toBeTruthy();
    expect(screen.getByText("DONE")).toBeTruthy();
    expect(screen.queryByText("20/20")).toBeNull();
  });

  it("closes from the close button", async () => {
    const onClose = jest.fn();
    await render(<TopicPicker visible onClose={onClose} onSelect={jest.fn()} activeTopicId="x" topics={[]} />);
    await fireEvent.press(screen.getByTestId("topic-picker-close"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
