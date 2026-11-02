jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

// How often each part draws itself: the slide-in around the tiles, the prompt and the topic label (PopIn), the tiles
// (ChoiceTile), and the buttons (GameButton, kept as the real one is: drawn again only when its props change).
const mockDrawn = { PopIn: 0, ChoiceTile: 0, GameButton: 0 };
// Every tap each answer tile was drawn with, by the answer it shows (a pick-all-that-fit tile is drawn inside PopIn).
const mockTaps = new Map<string, Set<unknown>>();
const mockSaw = (label: unknown, onPress: unknown) => {
  if (typeof onPress !== "function") return;
  const key = String(label);
  mockTaps.set(key, (mockTaps.get(key) ?? new Set()).add(onPress));
};
jest.mock("../ui/PopIn", () => {
  const actual = jest.requireActual("../ui/PopIn");
  return {
    ...actual,
    PopIn: (props: { children?: { props?: { label?: string; state?: string; onPress?: unknown } } }) => {
      mockDrawn.PopIn += 1;
      const tile = props.children?.props;
      if (tile && tile.state !== undefined) mockSaw(tile.label, tile.onPress);
      return actual.PopIn(props);
    }
  };
});
jest.mock("../ui/ChoiceTile", () => {
  const actual = jest.requireActual("../ui/ChoiceTile");
  return {
    ...actual,
    ChoiceTile: (props: { label?: string; onPress?: unknown }) => {
      mockDrawn.ChoiceTile += 1;
      mockSaw(props.label, props.onPress);
      return actual.ChoiceTile(props);
    }
  };
});
jest.mock("../ui/GameButton", () => {
  const actual = jest.requireActual("../ui/GameButton");
  const { memo } = jest.requireActual("react");
  const own = actual.GameButton.type ?? actual.GameButton;
  const counted = (props: object) => {
    mockDrawn.GameButton += 1;
    return own(props);
  };
  return { ...actual, GameButton: actual.GameButton.type ? memo(counted, actual.GameButton.compare) : counted };
});

import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { FoundationAssessmentScreen } from "../components/FoundationLearning";
import { FOUNDATION_QUESTION_BANK } from "../data/foundationQuestionBank";
import { createEmptyLearnerProfile, createFoundationAssessment, submitFoundationAssessmentAnswer } from "../services/foundationAssessment";
import type { FoundationAssessmentState } from "../types";
import { ExerciseView, FeedbackSheet, LessonCheckBar, StackTile } from "../ui/lesson";
import * as sheetFit from "../ui/lesson/sheetFit";
import { useStopsArrow, type QuestionStops } from "../ui/lesson/sheetFit";

// CHECK draws the question once more before the answer sheet's first frame: the sheet says its heights (and the
// question reads where it sits), and the question places itself above it. That render changes only where the question
// sits, which tiles fade under the sheet and the sheet's room: the tiles, the prompt, the topic label, the bar with
// CHECK and the sheet's own title, answer and button are not drawn again for it.

const layout = (height: number, y = 0) => ({ nativeEvent: { layout: { x: 0, y, width: 288, height } } });
const reset = () => {
  mockDrawn.PopIn = 0;
  mockDrawn.ChoiceTile = 0;
  mockDrawn.GameButton = 0;
};
const noop = () => undefined;
const handlers = () => ({ onChangeSelectedAnswer: jest.fn(), onSubmit: jest.fn(), onContinue: jest.fn(), onExit: jest.fn() });

const daily = createFoundationAssessment(createEmptyLearnerProfile(), "daily_challenge");
const pickOne = FOUNDATION_QUESTION_BANK.find((entry) => entry.type === "multiple_choice" && (entry.options?.length ?? 0) >= 3 && typeof entry.correctAnswer === "string")!;
const pickAll = FOUNDATION_QUESTION_BANK.find((entry) => entry.type === "multi_select" && (entry.options?.length ?? 0) >= 3 && Array.isArray(entry.correctAnswer))!;
const stateOf = (question: typeof pickOne): FoundationAssessmentState => ({ ...daily, currentQuestion: question });
const checkedOf = (question: typeof pickOne, selectedAnswer: string | string[]) =>
  submitFoundationAssessmentAnswer({ profile: createEmptyLearnerProfile(), state: stateOf(question), selectedAnswer, responseTimeMs: 3000 }).stateWithFeedback;

beforeEach(() => {
  reset();
  mockTaps.clear();
});
// Each answer's taps so far: one each when every tile kept its tap.
const tapsOf = (labels: string[]) => labels.map((label) => [...(mockTaps.get(label) ?? [])] as (() => void)[]);

describe("practice answer tiles keep the same tap from render to render, as lesson tiles do", () => {
  const options = pickOne.options!;

  it("keeps each tile's tap through a pick and through CHECK, and the tap still picks that answer", async () => {
    const on = handlers();
    const view = await render(<FoundationAssessmentScreen assessment={stateOf(pickOne)} language="en" selectedAnswer={undefined} {...on} />);
    const drawn = mockDrawn.ChoiceTile;
    await view.rerender(<FoundationAssessmentScreen assessment={stateOf(pickOne)} language="en" selectedAnswer={options[1]} {...on} />);
    // The pick draws only the tile it turns blue.
    expect(mockDrawn.ChoiceTile - drawn).toBe(1);
    // CHECK turns tiles green, red and grey: drawn again, with the same taps.
    await view.rerender(<FoundationAssessmentScreen assessment={checkedOf(pickOne, options[1])} language="en" selectedAnswer={options[1]} {...on} />);
    const taps = tapsOf(options);
    taps.forEach((seen) => expect(seen).toHaveLength(1));
    // Before CHECK a tap picks its answer; after it, taps change nothing.
    await view.rerender(<FoundationAssessmentScreen assessment={stateOf(pickOne)} language="en" selectedAnswer={options[1]} {...on} />);
    await act(async () => taps[2][0]());
    expect(on.onChangeSelectedAnswer).toHaveBeenLastCalledWith(options[2]);
    await view.rerender(<FoundationAssessmentScreen assessment={checkedOf(pickOne, options[1])} language="en" selectedAnswer={options[1]} {...on} />);
    on.onChangeSelectedAnswer.mockClear();
    await act(async () => taps[0][0]());
    expect(on.onChangeSelectedAnswer).not.toHaveBeenCalled();
    tapsOf(options).forEach((seen) => expect(seen).toHaveLength(1));
  });

  it("turns each answer of pick all that fit on or off among those picked so far, with the same tap all along", async () => {
    const all = pickAll.options!;
    const seen: (string[] | undefined)[] = [];
    function Live() {
      const [picked, setPicked] = useState<string[] | undefined>(undefined);
      seen.push(picked);
      return <FoundationAssessmentScreen assessment={stateOf(pickAll)} language="en" selectedAnswer={picked} {...handlers()} onChangeSelectedAnswer={(value) => setPicked(value as string[])} />;
    }
    await render(<Live />);
    const box = (option: string) => screen.getByRole("checkbox", { name: option });
    await fireEvent.press(box(all[0]));
    await fireEvent.press(box(all[2]));
    expect(seen[seen.length - 1]).toEqual([all[0], all[2]]);
    await fireEvent.press(box(all[0]));
    expect(seen[seen.length - 1]).toEqual([all[2]]);
    expect(box(all[2]).props.accessibilityState).toMatchObject({ checked: true });
    expect(box(all[0]).props.accessibilityState).toMatchObject({ checked: false });
    // The same tap for each answer all along.
    tapsOf(all).forEach((seen) => expect(seen).toHaveLength(1));
  });
});

describe("a practice question answered with tiles is placed in the very render CHECK draws", () => {
  // The question's views say their places at once, as on the web: an 800 px room, the prompt 100 tall at the top of
  // the question and the answers 100 tall under it.
  const HEIGHTS: Record<string, number> = { "assessment-scroll-box": 800, "assessment-question": 200, "assessment-prompt": 100, "assessment-answers": 100 };
  const TOPS: Record<string, number> = { "assessment-prompt": 0, "assessment-answers": 100 };
  const idOf = (view: unknown) => (view as { props?: { testID?: string } } | null)?.props?.testID ?? "";
  let restore: () => void = noop;
  let fits: jest.SpyInstance;
  beforeEach(() => {
    const height = jest.spyOn(sheetFit, "laidOutHeight").mockImplementation((view: unknown) => HEIGHTS[idOf(view)]);
    const top = jest.spyOn(sheetFit, "laidOutTop").mockImplementation((view: unknown) => TOPS[idOf(view)]);
    fits = jest.spyOn(sheetFit, "useSheetFit");
    restore = () => {
      height.mockRestore();
      top.mockRestore();
      fits.mockRestore();
    };
  });
  afterEach(() => restore());

  // The room under the right answer each render from CHECK on works out (undefined while it waits for a read).
  async function roomsAtCheck(question: typeof pickOne, answer: string | string[]) {
    const on = handlers();
    const view = await render(<FoundationAssessmentScreen assessment={stateOf(question)} language="en" selectedAnswer={answer} {...on} />);
    // As the views report themselves before CHECK: the same places.
    await fireEvent(screen.getByTestId("assessment-scroll-box"), "layout", layout(800));
    await fireEvent(screen.getByTestId("assessment-prompt"), "layout", layout(100, 0));
    await fireEvent(screen.getByTestId("assessment-answers"), "layout", layout(100, 100));
    fits.mockClear();
    await view.rerender(<FoundationAssessmentScreen assessment={checkedOf(question, answer)} language="en" selectedAnswer={answer} {...on} />);
    return fits.mock.calls.map(([input]) => (input as { room?: number }).room);
  }
  const first = (type: string) => FOUNDATION_QUESTION_BANK.find((entry) => entry.type === type && (entry.options?.length ?? 2) >= 2)!;

  it.each([
    ["multiple_choice", (question: typeof pickOne) => question.options![0]],
    ["multi_select", (question: typeof pickOne) => [question.options![0]]],
    ["true_false", (question: typeof pickOne) => question.options![1]]
  ] as const)("works out where a question of tiles (%s) goes in the render CHECK draws: they stay as read before", async (type, answerOf) => {
    const question = first(type);
    const rooms = await roomsAtCheck(question, answerOf(question));
    expect(rooms[0]).toBeDefined();
  });

  const match = FOUNDATION_QUESTION_BANK.find((entry) => entry.type === "match_pairs" && (entry.pairs?.length ?? 0) >= 3)!;
  const order = FOUNDATION_QUESTION_BANK.find((entry) => entry.type === "correct_order" && (entry.orderItems?.length ?? 0) >= 3)!;

  it("does so for a matching game", async () => {
    const pairs = Object.fromEntries(match.pairs!.map((pair) => [pair.left, pair.right]));
    expect((await roomsAtCheck(match, pairs as never))[0]).toBeDefined();
  });

  it("does so for a sorting game with every step placed", async () => {
    expect((await roomsAtCheck(order, [...order.orderItems!]))[0]).toBeDefined();
  });

  it("still waits for the read where CHECK turns a typed answer into tiles", async () => {
    const rooms = await roomsAtCheck(first("reflection_prompt"), "I would say Bismillah first");
    expect(rooms[0]).toBeUndefined();
    expect(rooms[1]).toBeDefined();
  });

  it("places the next question for its own sheet, never for the height the last question's sheet told", async () => {
    // Practice keeps one sheet from question to question: a tall one (a sorting game's list, a long Why) told for the
    // question before would place this one too far down, and hide its topic label, for a render.
    const scrolls = jest.spyOn(sheetFit, "useQuestionScroll");
    try {
      const on = handlers();
      const next = FOUNDATION_QUESTION_BANK.find((entry) => entry.type === "multiple_choice" && entry.id !== pickOne.id && (entry.options?.length ?? 0) >= 3)!;
      const placeAnswers = async () => {
        await fireEvent(screen.getByTestId("assessment-scroll-box"), "layout", layout(800));
        await fireEvent(screen.getByTestId("assessment-prompt"), "layout", layout(100, 0));
        await fireEvent(screen.getByTestId("assessment-answers"), "layout", layout(100, 100));
      };
      const view = await render(<FoundationAssessmentScreen assessment={stateOf(pickOne)} language="en" selectedAnswer={pickOne.options![1]} {...on} />);
      await placeAnswers();
      await view.rerender(<FoundationAssessmentScreen assessment={checkedOf(pickOne, pickOne.options![1])} language="en" selectedAnswer={pickOne.options![1]} {...on} />);
      await fireEvent(screen.getByTestId("feedback-content"), "layout", layout(600));
      const ready = () => scrolls.mock.calls.map(([input]) => (input as { ready: boolean }).ready);
      expect(ready()[ready().length - 1]).toBe(true);
      // CONTINUE, then CHECK on the next question.
      await view.rerender(<FoundationAssessmentScreen assessment={stateOf(next)} language="en" selectedAnswer={next.options![0]} {...on} />);
      await placeAnswers();
      scrolls.mockClear();
      await view.rerender(<FoundationAssessmentScreen assessment={checkedOf(next, next.options![0])} language="en" selectedAnswer={next.options![0]} {...on} />);
      // Not placed (nor its label hidden) until its own sheet tells its height...
      expect(ready()).not.toContain(true);
      expect(screen.getByTestId("assessment-label").props.style).not.toMatchObject({ opacity: 0 });
      // ...and placed once it has.
      await fireEvent(screen.getByTestId("feedback-content"), "layout", layout(250));
      expect(ready()[ready().length - 1]).toBe(true);
    } finally {
      scrolls.mockRestore();
    }
  });

  it("still waits for the read where CHECK takes away the steps left to place", async () => {
    const rooms = await roomsAtCheck(order, [order.orderItems![0]]);
    expect(rooms[0]).toBeUndefined();
    expect(rooms[1]).toBeDefined();
  });
});

describe("sorting and matching games keep each tap from render to render too", () => {
  const order = FOUNDATION_QUESTION_BANK.find((entry) => entry.type === "correct_order" && (entry.orderItems?.length ?? 0) >= 3)!;
  const match = FOUNDATION_QUESTION_BANK.find((entry) => entry.type === "match_pairs" && (entry.pairs?.length ?? 0) >= 3)!;

  it("puts a step in its slot and takes it back out, drawing only the slot it changes", async () => {
    const items = order.orderItems!;
    const seen: string[][] = [];
    function Live() {
      const [picked, setPicked] = useState<string[]>([]);
      seen.push(picked);
      return <FoundationAssessmentScreen assessment={stateOf(order)} language="en" selectedAnswer={picked} {...handlers()} onChangeSelectedAnswer={(value) => setPicked(value as string[])} />;
    }
    await render(<Live />);
    reset();
    await fireEvent.press(screen.getByTestId(`order-${items[1]}`));
    expect(seen[seen.length - 1]).toEqual([items[1]]);
    // The first slot shows the step (its slide in starts); no other slot, the prompt or the topic label is drawn again.
    expect(mockDrawn.PopIn).toBe(1);
    await fireEvent.press(screen.getByTestId(`order-${items[0]}`));
    expect(seen[seen.length - 1]).toEqual([items[1], items[0]]);
    // Taking the first step out moves the second one up: both slots change.
    await fireEvent.press(screen.getByLabelText(`1: ${items[1]}`));
    expect(seen[seen.length - 1]).toEqual([items[0]]);
    expect(screen.getByLabelText(`1: ${items[0]}`)).toBeTruthy();
    expect(screen.getByLabelText("Slot 2")).toBeTruthy();
  });

  it("pairs and unpairs with the same taps, drawing only the rows a tap changes", async () => {
    const [first, second] = match.pairs!;
    const seen: Record<string, string>[] = [];
    function Live() {
      const [mapping, setMapping] = useState<Record<string, string>>({});
      seen.push(mapping);
      return <FoundationAssessmentScreen assessment={stateOf(match)} language="en" selectedAnswer={mapping} {...handlers()} onChangeSelectedAnswer={(value) => setMapping(value as Record<string, string>)} />;
    }
    await render(<Live />);
    reset();
    // Picking a phrase turns only its own row's tile blue.
    await fireEvent.press(screen.getByTestId(`match-left-${first.left}`));
    expect(mockDrawn.PopIn).toBe(1);
    await fireEvent.press(screen.getByTestId(`match-right-${first.right}`));
    expect(seen[seen.length - 1]).toEqual({ [first.left]: first.right });
    await fireEvent.press(screen.getByTestId(`match-right-${second.right}`));
    await fireEvent.press(screen.getByTestId(`match-left-${second.left}`));
    expect(seen[seen.length - 1]).toEqual({ [first.left]: first.right, [second.left]: second.right });
    // Tapping a paired tile again undoes its pair and picks it.
    await fireEvent.press(screen.getByTestId(`match-left-${first.left}`));
    expect(seen[seen.length - 1]).toEqual({ [second.left]: second.right });
    expect(screen.getByTestId(`match-left-${first.left}`).props.accessibilityState).toMatchObject({ selected: true });
  });

  it.each([
    ["sorting", () => [order, [...order.orderItems!].reverse()] as const],
    ["matching", () => [match, Object.fromEntries(match.pairs!.map((pair, index, pairs) => [pair.left, pairs[(index + 1) % pairs.length].right]))] as const]
  ])("draws no slot or row of a %s game, prompt, topic label or button again for the sheet's new height", async (_, game) => {
    const [question, answer] = game();
    const on = handlers();
    const view = await render(<FoundationAssessmentScreen assessment={stateOf(question)} language="en" selectedAnswer={answer as never} {...on} />);
    await view.rerender(<FoundationAssessmentScreen assessment={checkedOf(question, answer as never)} language="en" selectedAnswer={answer as never} {...on} />);
    reset();
    await fireEvent(screen.getByTestId("feedback-content"), "layout", layout(180));
    expect(screen.getByTestId("feedback-sheet")).toBeTruthy();
    expect(mockDrawn).toEqual({ PopIn: 0, ChoiceTile: 0, GameButton: 0 });
  });
});

describe("the render that places a question above its sheet draws nothing else again", () => {
  it("draws no practice tile, prompt, topic label or button again for the sheet's new height", async () => {
    const options = pickOne.options!;
    const on = handlers();
    const view = await render(<FoundationAssessmentScreen assessment={stateOf(pickOne)} language="en" selectedAnswer={options[0]} {...on} />);
    await view.rerender(<FoundationAssessmentScreen assessment={checkedOf(pickOne, options[0])} language="en" selectedAnswer={options[0]} {...on} />);
    // The tiles turn green, red and grey at CHECK: drawn then.
    expect(mockDrawn.ChoiceTile).toBeGreaterThan(0);
    reset();
    await fireEvent(screen.getByTestId("feedback-content"), "layout", layout(180));
    expect(screen.getByTestId("feedback-sheet")).toBeTruthy();
    expect(mockDrawn).toEqual({ PopIn: 0, ChoiceTile: 0, GameButton: 0 });
  });

  it("draws no lesson tile, chip or button again for the sheet's new height", async () => {
    const four = {
      kind: "multiple_choice" as const,
      prompt: "Who prayed from inside the big fish?",
      choices: [
        { id: "a", label: "Nuh, who built the Ark" },
        { id: "b", label: "Yunus, who called on Allah" },
        { id: "c", label: "Musa, who crossed the sea" }
      ],
      mascotVariant: "boy",
      accent: "#21B573",
      review: true,
      onSelect: jest.fn(),
      onCheck: jest.fn(),
      onContinue: jest.fn()
    };
    const view = await render(<ExerciseView {...four} selectedChoiceId="a" />);
    await view.rerender(<ExerciseView {...four} selectedChoiceId="a" correctChoiceId="b" result={{ correct: false, correctLabel: four.choices[1].label, why: "Yunus called on Allah." }} />);
    reset();
    await fireEvent(screen.getByTestId("feedback-content"), "layout", layout(200));
    expect(mockDrawn).toEqual({ PopIn: 0, ChoiceTile: 0, GameButton: 0 });
  });

  it("draws no True or False tile again for the sheet's new height", async () => {
    const trueFalse = {
      kind: "true_false" as const,
      prompt: "Saying Alhamdulillah after a sneeze is part of the Sunnah.",
      choices: [
        { id: "true", label: "True" },
        { id: "false", label: "False" }
      ],
      mascotVariant: "girl",
      accent: "#21B573",
      onSelect: jest.fn(),
      onCheck: jest.fn(),
      onContinue: jest.fn()
    };
    const view = await render(<ExerciseView {...trueFalse} selectedChoiceId="false" />);
    await view.rerender(<ExerciseView {...trueFalse} selectedChoiceId="false" correctChoiceId="true" result={{ correct: false, correctLabel: "True", why: "It is the Sunnah." }} />);
    reset();
    await fireEvent(screen.getByTestId("feedback-content"), "layout", layout(200));
    expect(mockDrawn).toEqual({ PopIn: 0, ChoiceTile: 0, GameButton: 0 });
  });

  it("draws only the fade, not the tile, as a tile fades under the sheet's edge", async () => {
    const tile = (hidden: boolean) => <StackTile hidden={hidden} delay={80} label="Yunus" state="correct" onPress={noop} testID="tile" />;
    const view = await render(tile(false));
    reset();
    await view.rerender(tile(true));
    // Gone from sight and from screen readers, still in its place.
    expect(screen.getByTestId("tile", { includeHiddenElements: true })).toBeTruthy();
    expect(screen.queryByTestId("tile")).toBeNull();
    expect(mockDrawn).toEqual({ PopIn: 0, ChoiceTile: 0, GameButton: 0 });
  });

  it("draws the sheet's title, answer and button again only when what they show changes", async () => {
    const toggles: boolean[] = [];
    const sheet = (maxHeight: number) => (
      <FeedbackSheet visible correct={false} correctLabel="Say Bismillah" why="We start with Allah's name." onContinue={noop} maxHeight={maxHeight} onWhyToggle={(open) => toggles.push(open)} playSound={false} />
    );
    const view = await render(sheet(400));
    reset();
    await view.rerender(sheet(380));
    expect(mockDrawn.GameButton).toBe(0);
    // Its Why pill still opens and shuts the Why line, as the latest render says.
    await fireEvent.press(screen.getByTestId("feedback-why"));
    expect(screen.getByTestId("feedback-why-text")).toBeTruthy();
    await fireEvent.press(screen.getByTestId("feedback-why"));
    expect(screen.queryByTestId("feedback-why-text")).toBeNull();
    expect(toggles.filter((open) => open)).toEqual([true]);
    expect(toggles[toggles.length - 1]).toBe(false);
  });

  it("draws a sorting game's right order in the sheet again only when the steps change", async () => {
    const steps = ["Make the intention", "Wash the hands", "Rinse the mouth"];
    const sheet = (maxHeight: number, list: string[]) => (
      <FeedbackSheet visible correct={false} correctList={list} missedRows={[0]} why="The order is the Sunnah." onContinue={noop} maxHeight={maxHeight} playSound={false} />
    );
    const view = await render(sheet(400, steps));
    const row = () => screen.getByTestId("feedback-row-1").props.onLayout as unknown;
    const first = row();
    // A new list holding the same steps, and a new room: the rows are left as they are.
    await view.rerender(sheet(380, [...steps]));
    expect(row()).toBe(first);
    expect(screen.getByTestId("feedback-miss-0")).toBeTruthy();
    await view.rerender(sheet(380, [steps[1], steps[0], steps[2]]));
    expect(screen.getByTestId("feedback-row-0").props.accessibilityLabel).toBe(`1. ${steps[1]}, you had this one in another place`);
  });

  it("draws the bar with CHECK again only when what it shows changes", async () => {
    const bar = (label: string, disabled: boolean) => (
      <LessonCheckBar label={label} disabled={disabled} onCheck={noop} testID="check" hintVisible={false} onHint={noop} language="en" />
    );
    const view = await render(bar("Check", true));
    reset();
    await view.rerender(bar("Check", true));
    expect(mockDrawn.GameButton).toBe(0);
    await view.rerender(bar("Check", false));
    expect(mockDrawn.GameButton).toBe(1);
  });
});

describe("the arrow of a question too tall for its room", () => {
  it("keeps the same tap from render to render, and goes where the arrow points as last drawn", async () => {
    const scrollTo = jest.fn();
    let press: () => void = noop;
    let scroll: (y: number) => void = noop;
    function Probe({ stops }: { stops: QuestionStops }) {
      const scrollRef = React.useRef({ scrollTo } as unknown as ScrollView);
      const arrow = useStopsArrow({ key: "q", stops, scrollRef });
      press = arrow.onPress;
      scroll = arrow.onScroll;
      return <View testID="probe" accessibilityLabel={arrow.direction} />;
    }
    const rows = [
      { top: 0, bottom: 100 },
      { top: 110, bottom: 210 },
      { top: 220, bottom: 320 }
    ];
    const stops: QuestionStops = { stops: [0, 110, 220], rows, viewport: 120, end: 220 };
    const view = await render(<Probe stops={stops} />);
    const first = press;
    await view.rerender(<Probe stops={{ ...stops }} />);
    expect(press).toBe(first);
    await act(async () => press());
    expect(scrollTo).toHaveBeenLastCalledWith({ y: 110, animated: true });
    // At its end the arrow points up, and the same tap goes back to the top.
    await act(async () => scroll(220));
    expect(screen.getByTestId("probe").props.accessibilityLabel).toBe("up");
    expect(press).toBe(first);
    await act(async () => press());
    expect(scrollTo).toHaveBeenLastCalledWith({ y: 0, animated: true });
  });
});
