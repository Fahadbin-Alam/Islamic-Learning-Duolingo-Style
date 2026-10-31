jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

import React from "react";
import { Animated, Dimensions, Platform, ScrollView, StyleSheet, Text } from "react-native";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { FoundationAssessmentScreen } from "../components/FoundationLearning";
import { FOUNDATION_QUESTION_BANK } from "../data/foundationQuestionBank";
import { createEmptyLearnerProfile, createFoundationAssessment, submitFoundationAssessmentAnswer } from "../services/foundationAssessment";
import type { FoundationAssessmentState } from "../types";
import { PopIn } from "../ui/PopIn";
import { Sheet } from "../ui/Sheet";
import { ExerciseView, FoldGap, ScrollHint } from "../ui/lesson";
import { foldRooms, nextRowStop, questionStops } from "../ui/lesson/sheetFit";

const layout = (height: number, y = 0) => ({ nativeEvent: { layout: { x: 0, y, width: 288, height } } });
const flat = (style: unknown) => (StyleSheet.flatten(style as never) ?? {}) as Record<string, unknown>;

describe("the places a question too tall for its room rests when its arrow scrolls it", () => {
  // The prompt, then five tiles 80 px tall (their lips included), 10 px apart; the question ends 12 px under the last.
  const rows = [
    { top: 8, bottom: 200 },
    { top: 210, bottom: 290 },
    { top: 300, bottom: 380 },
    { top: 390, bottom: 470 },
    { top: 480, bottom: 560 },
    { top: 570, bottom: 650 }
  ];

  it("stops with the room's top edge just above a part, where both edges fall between parts, and at the end", () => {
    const stops = questionStops(rows, 270, 662);
    // 8 px of air above each tile; the end is the first place from which the rest (and the space under it) shows.
    expect(stops?.stops).toEqual([0, 202, 292, 382, 472]);
    expect(stops?.end).toBe(472);
  });

  it("leaves out a place whose bottom edge would cut a part, and needs no places at all when everything shows", () => {
    // 250 px: from 202, 292 or 382 the room's bottom edge would fall inside a tile.
    expect(questionStops(rows, 250, 662)?.stops).toEqual([0, 472]);
    expect(questionStops(rows, 700, 662)).toBeUndefined();
  });

  it("takes tiles side by side as one row", () => {
    const grid = [rows[0], { top: 210, bottom: 290 }, { top: 210, bottom: 300 }, { top: 310, bottom: 390 }];
    const stops = questionStops(grid, 200, 400);
    expect(stops?.rows).toEqual([rows[0], { top: 210, bottom: 300 }, { top: 310, bottom: 390 }]);
  });

  it("scrolls a page at a time: to the last place that keeps the first hidden part whole in sight", () => {
    const stops = questionStops(rows, 270, 662)!;
    // From the top the tile at 210-290 is the first hidden one: the next place is right above it.
    expect(nextRowStop(stops.stops, stops.rows, 0, stops.viewport)).toBe(202);
    // From 202 the first hidden tile starts at 480: the end (472) keeps it whole in sight.
    expect(nextRowStop(stops.stops, stops.rows, 202, stops.viewport)).toBe(472);
  });
});

describe("the arrow of a question too tall for its room", () => {
  it("shows whole from its first frame, and goes at once", async () => {
    const { rerender } = await render(<ScrollHint visible still onPress={jest.fn()} />);
    expect(flat(screen.getByTestId("scroll-more").props.style).opacity).toBe(1);
    await rerender(<ScrollHint visible={false} still onPress={jest.fn()} />);
    expect(screen.queryByTestId("scroll-more")).toBeNull();
  });

  it("turns to point up, and says so", async () => {
    await render(<ScrollHint visible still direction="up" testID="scroll-more-up" onPress={jest.fn()} />);
    expect(screen.getByLabelText("Scroll up")).toBeTruthy();
    expect(screen.getByTestId("scroll-more-up")).toBeTruthy();
  });
});

describe("the room tiles that fold leave, with the question scrolled down", () => {
  const tiles = [
    { id: "b", room: 80, above: true },
    { id: "c", room: 80, above: true },
    { id: "e", room: 80, above: false }
  ];

  it("leaves all of it at the top of the question", () => {
    expect(foldRooms(tiles, 0)).toEqual({ rooms: { b: 80, c: 80, e: 80 }, left: 0 });
  });

  it("takes up what folds above the green tile with the scroll, from the top, as far as it goes", () => {
    expect(foldRooms(tiles, 100)).toEqual({ rooms: { b: 0, c: 60, e: 80 }, left: 0 });
    expect(foldRooms(tiles, 300)).toEqual({ rooms: { b: 0, c: 0, e: 80 }, left: 140 });
  });
});

describe("a tile sliding up into its place as it first shows", () => {
  it("starts only as far below its place as it is told", async () => {
    await render(
      <PopIn from="up" distance={6}>
        <Text testID="tile">Tile</Text>
      </PopIn>
    );
    const transform = flat(screen.getByTestId("tile").parent?.props.style).transform as { translateY?: number }[];
    expect(transform[0].translateY).toBe(6);
  });
});

describe("the feedback sheet coming up", () => {
  it("springs up but never past its place, so its edge never crosses what it keeps clear", async () => {
    const spring = jest.spyOn(Animated, "spring");
    try {
      await render(
        <Sheet visible noOvershoot tone="wrong">
          <Text>Not quite</Text>
        </Sheet>
      );
      expect(spring).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ toValue: 1, overshootClamping: true }));
    } finally {
      spring.mockRestore();
    }
  });

  it("lets other sheets spring past their place and back as before", async () => {
    const spring = jest.spyOn(Animated, "spring");
    try {
      await render(
        <Sheet visible tone="white">
          <Text>Quit?</Text>
        </Sheet>
      );
      const up = spring.mock.calls.map(([, config]) => config).filter((config) => config.toValue === 1);
      expect(up.length).toBeGreaterThan(0);
      up.forEach((config) => expect(config.overshootClamping).toBeFalsy());
    } finally {
      spring.mockRestore();
    }
  });
});

describe("the chips above a question scrolled past their top before CHECK", () => {
  const three = {
    kind: "multiple_choice" as const,
    prompt: "Who was the first caliph?",
    choices: [
      { id: "a", label: "Umar ibn al-Khattab" },
      { id: "b", label: "Abu Bakr as-Siddiq" },
      { id: "c", label: "Uthman ibn Affan" }
    ],
    mascotVariant: "boy",
    accent: "#21B573",
    onSelect: jest.fn(),
    onCheck: jest.fn(),
    onContinue: jest.fn()
  };
  /** The question's scroll view, scrolled to `y` by a hand. */
  async function scrolledTo(y: number) {
    let node = screen.getByTestId("exercise-cues", { includeHiddenElements: true }).parent!;
    while (!node.props.onScroll) node = node.parent!;
    await fireEvent.scroll(node, { nativeEvent: { contentOffset: { x: 0, y }, contentSize: { width: 320, height: 900 }, layoutMeasurement: { width: 320, height: 400 } } });
  }

  it("are gone while a hand has the question past their top, so the scroll edge never cuts them at rest, and back above it", async () => {
    await render(<ExerciseView {...three} review attempt={1} />);
    await fireEvent(screen.getByTestId("exercise-view"), "layout", layout(400));
    // The REVIEW and "Try again!" chips (8-34 in the scroll), then the prompt.
    await fireEvent(screen.getByTestId("exercise-cues", { includeHiddenElements: true }), "layout", layout(26, 0));
    expect(screen.getByTestId("exercise-cues")).toBeTruthy();
    await scrolledTo(20);
    expect(screen.queryByTestId("exercise-cues")).toBeNull();
    expect(screen.getByTestId("exercise-cues", { includeHiddenElements: true })).toBeTruthy();
    await scrolledTo(0);
    expect(screen.getByTestId("exercise-cues")).toBeTruthy();
  });
});

describe("the room tiles leave as they fold while the sheet comes up", () => {
  // The springs stand still until the test lets time run.
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it("is as tall as what folded, and goes at once when told", async () => {
    const { rerender } = await render(<FoldGap height={80} />);
    expect(flat(screen.getByTestId("fold-gap").props.style).height).toBe(80);
    await rerender(<FoldGap height={80} shut />);
    expect(flat(screen.getByTestId("fold-gap").props.style).height).toBe(0);
  });

  const four = {
    kind: "multiple_choice" as const,
    prompt: "What is Yunus known for?",
    choices: [
      { id: "a", label: "He built the Ark before the great flood came" },
      { id: "b", label: "He led his people across the sea to safety" },
      { id: "c", label: "He was given great strength to fight Jalut" },
      { id: "d", label: "He prayed to Allah from inside the big fish" }
    ],
    mascotVariant: "boy",
    accent: "#21B573",
    onSelect: jest.fn(),
    onCheck: jest.fn(),
    onContinue: jest.fn()
  };
  const result = { correct: false, correctLabel: four.choices[3].label, why: "Yunus called on Allah from the dark." };
  const gap = 12;
  const wrapper = (id: string) => {
    let node = screen.getByTestId(`choice-${id}`).parent!;
    while (!node.props.onLayout) node = node.parent!;
    return node;
  };
  const gaps = () => screen.queryAllByTestId("fold-gap").map((view) => flat(view.props.style).height);

  async function checkFour() {
    const view = await render(<ExerciseView {...four} selectedChoiceId="a" correctChoiceId="d" result={result} />);
    await fireEvent(screen.getByTestId("exercise-view"), "layout", layout(512));
    await fireEvent(screen.getByTestId("exercise-prompt"), "layout", layout(55, 8));
    for (const [index, id] of ["a", "b", "c", "d"].entries()) {
      await fireEvent(wrapper(id), "layout", layout(68, index * (68 + gap)));
    }
    await fireEvent(screen.getByTestId("exercise-tiles"), "layout", layout(4 * 68 + 3 * gap, 63));
    await fireEvent(screen.getByTestId("feedback-top"), "layout", layout(76));
    return view;
  }

  it("keeps each grey tile's room (its gap too) where it was, so the green tile does not jump up", async () => {
    await checkFour();
    // The grey tiles fold away at CHECK, the sheet too tall for the room under all four.
    expect(screen.queryByTestId("choice-b")).toBeNull();
    expect(screen.queryByTestId("choice-c")).toBeNull();
    expect(gaps()).toEqual([68 + gap, 68 + gap]);
    // It closes with the sheet's spring as the sheet comes up.
    await act(async () => {
      jest.advanceTimersByTime(2000);
    });
    expect(gaps()).toEqual([0, 0]);
  });

  it("lets that room go at once when the Why line opens, as the sheet grows at once", async () => {
    await checkFour();
    await fireEvent.press(screen.getByTestId("feedback-why"));
    expect(gaps()).toEqual([0, 0]);
  });

  it("lets a question the learner left scrolled down scroll up with the tiles above the green one, as far as it can, and leaves only the rest as room", async () => {
    // Scrolled 100 down before CHECK: b's room (80) and 20 of c's are taken up by the scroll in the frame they fold.
    const view = await render(<ExerciseView {...four} selectedChoiceId="a" />);
    await fireEvent(screen.getByTestId("exercise-view"), "layout", layout(512));
    await fireEvent(screen.getByTestId("exercise-prompt"), "layout", layout(55, 8));
    for (const [index, id] of ["a", "b", "c", "d"].entries()) {
      await fireEvent(wrapper(id), "layout", layout(68, index * (68 + gap)));
    }
    await fireEvent(screen.getByTestId("exercise-tiles"), "layout", layout(4 * 68 + 3 * gap, 63));
    let node = screen.getByTestId("exercise-question").parent!;
    while (!node.props.onScroll) node = node.parent!;
    await fireEvent.scroll(node, { nativeEvent: { contentOffset: { x: 0, y: 100 }, contentSize: { width: 320, height: 900 }, layoutMeasurement: { width: 320, height: 400 } } });
    await view.rerender(<ExerciseView {...four} selectedChoiceId="a" correctChoiceId="d" result={result} />);
    await fireEvent(screen.getByTestId("feedback-top"), "layout", layout(76));
    expect(screen.queryByTestId("choice-b")).toBeNull();
    expect(screen.queryByTestId("choice-c")).toBeNull();
    expect(gaps()).toEqual([68 + gap - 20]);
  });

  it("shows every tile again, and no room left by a fold, on the next try", async () => {
    const { rerender } = await checkFour();
    await rerender(<ExerciseView {...four} attempt={1} />);
    ["a", "b", "c", "d"].forEach((id) => expect(screen.getByTestId(`choice-${id}`)).toBeTruthy());
    expect(gaps()).toEqual([]);
  });
});

describe("practice pick-all-that-fit questions fold a wrong pick above the first right answer too", () => {
  const inset = Platform.OS === "ios" ? 30 : 16;
  const SHEET_PAD = 20 + 16;
  const SLIM_SAVES = 32;
  /** The sheet with its Why line shut: title row, answer and pill, the gap above the button, the button, padding. */
  const full = 40 + 76 + 16 + 58 + SHEET_PAD + inset;
  const least = full - SLIM_SAVES;
  const sheetHeight = (height: number) => fireEvent(screen.getByTestId("feedback-content"), "layout", layout(height - SHEET_PAD - inset));
  let window = Dimensions.get("window");
  let screenSize = Dimensions.get("screen");
  beforeEach(() => {
    window = Dimensions.get("window");
    screenSize = Dimensions.get("screen");
    Dimensions.set({ window: { ...window, width: 320, height: 568 }, screen: { ...screenSize, width: 320, height: 568 } });
  });
  afterEach(() => {
    screen.unmount();
    Dimensions.set({ window, screen: screenSize });
  });

  const daily = createFoundationAssessment(createEmptyLearnerProfile(), "daily_challenge");
  const handlers = () => ({ onChangeSelectedAnswer: jest.fn(), onSubmit: jest.fn(), onContinue: jest.fn(), onExit: jest.fn() });
  const base = FOUNDATION_QUESTION_BANK.find(
    (entry) => entry.type === "multi_select" && Array.isArray(entry.correctAnswer) && (entry.options?.length ?? 0) >= 4 && (entry.correctAnswer?.length ?? 0) < (entry.options?.length ?? 0) - 1
  )!;
  const rights = base.correctAnswer as string[];
  const wrongs = (base.options ?? []).filter((option) => !rights.includes(option));
  /** A wrong answer first (the one picked), the first right answer second. */
  const question = { ...base, options: [wrongs[0], rights[0], ...wrongs.slice(1), ...rights.slice(1)] };
  const picked = [wrongs[0]];
  const state: FoundationAssessmentState = { ...daily, currentQuestion: question };
  const checked = submitFoundationAssessmentAnswer({ profile: createEmptyLearnerProfile(), state, selectedAnswer: picked, responseTimeMs: 3000 }).stateWithFeedback;
  const tile = (option: string) => `assessment-tile-${option}`;
  const drawn = (id: string) => screen.queryByTestId(id, { includeHiddenElements: true }) !== null;

  it("folds the wrong pick when that alone gives the sheet at its least its room under the first right answer", async () => {
    await render(<FoundationAssessmentScreen assessment={checked} language="en" selectedAnswer={picked} {...handlers()} />);
    // The prompt at 38 (46 tall), the answers from 84, 64 apart: the first right one at 148-202 under the pick, or at
    // 84-138 alone. Under both, 44 px short of the sheet's least; under the right one alone, 20 to spare.
    await fireEvent(screen.getByTestId("assessment-scroll-box"), "layout", layout(least + 136));
    await fireEvent(screen.getByTestId("assessment-prompt"), "layout", layout(46, 38));
    for (const [index, option] of question.options.entries()) {
      await fireEvent(screen.getByTestId(tile(option)), "layout", layout(54, index * 64));
    }
    await fireEvent(screen.getByTestId("assessment-answers"), "layout", layout(question.options.length * 64 - 10, 84));
    await fireEvent(screen.getByTestId("feedback-top"), "layout", layout(76));
    await sheetHeight(full);
    expect(drawn(tile(picked[0]))).toBe(false);
    rights.forEach((option) => expect(drawn(tile(option))).toBe(true));
  });

  it("keeps the room of each answer that folds (its gap too) where it was, closing with the sheet's spring", async () => {
    // The springs stand still until the test lets time run.
    jest.useFakeTimers();
    try {
      await render(<FoundationAssessmentScreen assessment={checked} language="en" selectedAnswer={picked} {...handlers()} />);
      await fireEvent(screen.getByTestId("assessment-scroll-box"), "layout", layout(least + 136));
      await fireEvent(screen.getByTestId("assessment-prompt"), "layout", layout(46, 38));
      for (const [index, option] of question.options.entries()) {
        await fireEvent(screen.getByTestId(tile(option)), "layout", layout(54, index * 64));
      }
      await fireEvent(screen.getByTestId("assessment-answers"), "layout", layout(question.options.length * 64 - 10, 84));
      await fireEvent(screen.getByTestId("feedback-top"), "layout", layout(76));
      await sheetHeight(full);
      // Every wrong answer folds (the pick above the first right one too): the right answers glide up with the sheet
      // instead of jumping up in one frame.
      const gaps = () => screen.queryAllByTestId("fold-gap", { includeHiddenElements: true }).map((view) => flat(view.props.style).height);
      expect(gaps()).toEqual(wrongs.map(() => 54 + 10));
      await act(async () => {
        jest.advanceTimersByTime(2000);
      });
      expect(gaps()).toEqual(wrongs.map(() => 0));
    } finally {
      jest.useRealTimers();
    }
  });

  it("lets the pick's room go at once once the Why line is open", async () => {
    await render(<FoundationAssessmentScreen assessment={checked} language="en" selectedAnswer={picked} {...handlers()} />);
    await fireEvent(screen.getByTestId("assessment-scroll-box"), "layout", layout(least + 136));
    await fireEvent(screen.getByTestId("assessment-prompt"), "layout", layout(46, 38));
    for (const [index, option] of question.options.entries()) {
      await fireEvent(screen.getByTestId(tile(option)), "layout", layout(54, index * 64));
    }
    await fireEvent(screen.getByTestId("assessment-answers"), "layout", layout(question.options.length * 64 - 10, 84));
    await fireEvent(screen.getByTestId("feedback-top"), "layout", layout(76));
    await sheetHeight(full);
    await fireEvent.press(screen.getByTestId("feedback-why"));
    const gaps = screen.queryAllByTestId("fold-gap", { includeHiddenElements: true }).map((view) => flat(view.props.style).height);
    gaps.forEach((height) => expect(height).toBe(0));
  });
});

describe("a lesson question whose picked tile may still fold at CHECK", () => {
  const inset = Platform.OS === "ios" ? 30 : 16;
  const SHEET_PAD = 20 + 16;
  const SLIM_SAVES = 32;
  /** The sheet with its Why line shut, and the least it can be (slim). */
  const full = 40 + 76 + 16 + 58 + SHEET_PAD + inset;
  const least = full - SLIM_SAVES;
  const TILE = 68;
  const GAP = 8;
  const lesson = {
    kind: "multiple_choice" as const,
    prompt: "What did the Prophet say about kindness to animals?",
    choices: [
      { id: "a", label: "Only cats deserve kindness." },
      { id: "b", label: "Kindness to any animal is rewarded." },
      { id: "c", label: "Animals do not matter." },
      { id: "d", label: "Only horses should be fed." }
    ],
    correctChoiceId: "b",
    mascotVariant: "boy",
    accent: "#21B573",
    onSelect: jest.fn(),
    onCheck: jest.fn(),
    onContinue: jest.fn()
  };
  const result = { correct: false, correctLabel: lesson.choices[1].label, why: "Sahih al-Bukhari 2363." };
  const wrapper = (id: string) => {
    let node = screen.getByTestId(`choice-${id}`, { includeHiddenElements: true }).parent!;
    while (!node.props.onLayout) node = node.parent!;
    return node;
  };
  let window = Dimensions.get("window");
  let screenSize = Dimensions.get("screen");
  beforeEach(() => {
    window = Dimensions.get("window");
    screenSize = Dimensions.get("screen");
    Dimensions.set({ window: { ...window, width: 320, height: 568 }, screen: { ...screenSize, width: 320, height: 568 } });
  });
  afterEach(() => {
    screen.unmount();
    Dimensions.set({ window, screen: screenSize });
  });

  it("waits for the sheet's least height before it scrolls, so it never starts towards a place it then leaves, nor hides the chips for it", async () => {
    const scrollTo = jest.spyOn(ScrollView.prototype as unknown as { scrollTo: (options: object) => void }, "scrollTo");
    // The test renderer's scroll view keeps its own mock of scrollTo, with the calls of the tests before.
    scrollTo.mockClear();
    try {
      await render(<ExerciseView {...lesson} review selectedChoiceId="a" result={result} />);
      // The REVIEW chip (0-26), the prompt (34-73), the tiles from 81, 76 apart: b, the green one,
      // under a, too low for the sheet at its least; alone in a's place, high enough.
      await fireEvent(screen.getByTestId("exercise-view"), "layout", layout(least + 160));
      await fireEvent(screen.getByTestId("exercise-cues", { includeHiddenElements: true }), "layout", layout(26, 0));
      await fireEvent(screen.getByTestId("exercise-prompt"), "layout", layout(39, 34));
      for (const [index, id] of ["a", "b", "c", "d"].entries()) {
        await fireEvent(wrapper(id), "layout", layout(TILE, index * (TILE + GAP)));
      }
      await fireEvent(screen.getByTestId("exercise-tiles"), "layout", layout(4 * TILE + 3 * GAP, 81));
      // The sheet says its height before the parts its least is made of have said theirs.
      await fireEvent(screen.getByTestId("feedback-content"), "layout", layout(full - SHEET_PAD - inset));
      expect(screen.getByTestId("exercise-cues")).toBeTruthy();
      // The question's own scroll view (the sheet's lists, nested in it, scroll on their own).
      const questionScrolls = scrollTo.mock.calls.filter((_, index) => !(scrollTo.mock.contexts[index] as { props?: { nestedScrollEnabled?: boolean } } | undefined)?.props?.nestedScrollEnabled);
      expect(questionScrolls.filter(([options]) => ((options as { y?: number }).y ?? 0) > 0)).toEqual([]);
      // Its least known, the picked tile folds, and the question goes where it now goes.
      await fireEvent(screen.getByTestId("feedback-top"), "layout", layout(76));
      expect(screen.queryByTestId("choice-a", { includeHiddenElements: true })).toBeNull();
      expect(screen.getByTestId("choice-b")).toBeTruthy();
    } finally {
      scrollTo.mockRestore();
    }
  });
});
