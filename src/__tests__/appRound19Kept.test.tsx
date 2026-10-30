jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

import React from "react";
import { Dimensions, Platform, ScrollView, StyleSheet, View } from "react-native";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { FoundationAssessmentScreen } from "../components/FoundationLearning";
import { FOUNDATION_QUESTION_BANK } from "../data/foundationQuestionBank";
import { createEmptyLearnerProfile, createFoundationAssessment, submitFoundationAssessmentAnswer } from "../services/foundationAssessment";
import type { FoundationAssessmentState } from "../types";
import { ExerciseView, FeedbackSheet } from "../ui/lesson";
import { keptScrollY, usePickFold, useQuestionScroll, useSheetFit } from "../ui/lesson/sheetFit";

const layout = (height: number, y = 0) => ({ nativeEvent: { layout: { x: 0, y, width: 288, height } } });
const flat = (style: unknown) => (StyleSheet.flatten(style as never) ?? {}) as Record<string, unknown>;
const inset = Platform.OS === "ios" ? 30 : 16;
// The sheet's padding (20 + 16), its lg button (58) and the gap above it (16).
const SHEET_PAD = 36;

describe("where a question the learner left scrolled down sits while the sheet is up", () => {
  // The prompt (8-108, its last 16 px a margin with no text), a tile that stays above the green one (116-212).
  const prompt = { top: 8, bottom: 108, blank: 16 };
  const tile = { top: 116, bottom: 212, blank: 4 };

  it("keeps the green tile where it showed, and does not scroll back to show the prompt", () => {
    expect(keptScrollY(20, 110, [prompt, tile], 300)).toBe(110);
    // The room's top edge in the prompt's margin cuts no text.
    expect(keptScrollY(20, 100, [prompt], 300)).toBe(100);
  });

  it("goes further down only as far as the sheet needs, and nowhere when nothing was scrolled", () => {
    expect(keptScrollY(180, 110, [prompt, tile], 300)).toBe(180);
    expect(keptScrollY(20, undefined, [prompt, tile], 300)).toBe(20);
  });

  it("never takes the green tile's own top over the room's top edge", () => {
    expect(keptScrollY(20, 340, [prompt], 300)).toBe(300);
  });

  it("goes to the nearer place where the room's edge falls between parts when it would cross a part's text", () => {
    // 60 is in the prompt's text: 52 back up to its top (less 8 px of air, so at 0), 48 down past it.
    expect(keptScrollY(0, 60, [prompt, tile], 300)).toBe(108);
    // 40: 40 back to the top, 68 down past it.
    expect(keptScrollY(0, 40, [prompt, tile], 300)).toBe(0);
    // In the tile above the green one: up to just above it (8 px of air, the prompt's bottom), or down past it.
    expect(keptScrollY(0, 150, [prompt, tile], 300)).toBe(108);
    expect(keptScrollY(0, 190, [prompt, tile], 300)).toBe(212);
  });

  it("goes no further back up than the sheet allows, and where neither way works, where the sheet puts it", () => {
    // Back up only as far as the sheet allows (30) still crosses the prompt's text: down past it instead.
    expect(keptScrollY(30, 40, [prompt, tile], 300)).toBe(108);
    // Down past the prompt would take the green tile's top over the room's edge.
    expect(keptScrollY(30, 40, [prompt], 100)).toBe(30);
  });
});

describe("the parts of a question as the answer sheet opens, drawn once", () => {
  it("holds a picked tile folded without drawing again for it", async () => {
    let renders = 0;
    function Probe({ open, now }: { open: boolean; now: boolean }) {
      renders += 1;
      const folded = usePickFold({ open, now, tryKey: "q" });
      return <View testID="probe" accessibilityLabel={String(folded)} />;
    }
    const { rerender } = await render(<Probe open now={false} />);
    renders = 0;
    await rerender(<Probe open now />);
    expect(renders).toBe(1);
    expect(screen.getByTestId("probe").props.accessibilityLabel).toBe("true");
    // Once folded it stays so while the sheet is up, also once `now` no longer says so.
    await rerender(<Probe open now={false} />);
    expect(screen.getByTestId("probe").props.accessibilityLabel).toBe("true");
    await rerender(<Probe open={false} now={false} />);
    await rerender(<Probe open now={false} />);
    expect(screen.getByTestId("probe").props.accessibilityLabel).toBe("false");
  });

  it("squeezes a question without drawing again for it, and keeps it squeezed while the sheet is up", async () => {
    let renders = 0;
    function Probe({ room }: { room: number }) {
      renders += 1;
      const fit = useSheetFit({ open: true, fullHeight: 300, room, layoutKey: "k", squeezeMoves: false });
      return <View testID="probe" accessibilityLabel={`${fit.squeeze}|${fit.fitted}`} />;
    }
    const { rerender } = await render(<Probe room={400} />);
    expect(screen.getByTestId("probe").props.accessibilityLabel).toBe("false|true");
    renders = 0;
    await rerender(<Probe room={200} />);
    expect(renders).toBe(1);
    expect(screen.getByTestId("probe").props.accessibilityLabel).toBe("true|true");
    await rerender(<Probe room={400} />);
    expect(screen.getByTestId("probe").props.accessibilityLabel).toBe("true|true");
  });

  it("does not draw the question again for a scroll of its own on its way", async () => {
    let renders = 0;
    let scroll: (y: number) => void = () => undefined;
    function Probe() {
      renders += 1;
      const scrollRef = React.useRef({ scrollTo: () => undefined } as unknown as ScrollView);
      const own = useQuestionScroll({ open: true, scrollRef, target: 200, ready: true, settling: false, whyOpened: false, viewport: 400, partTop: null });
      scroll = own.onScroll;
      return <View />;
    }
    await render(<Probe />);
    renders = 0;
    await act(async () => {
      scroll(40);
      scroll(120);
    });
    expect(renders).toBe(0);
    // It got there: drawn again, so its content gives back the length it was held at.
    await act(async () => {
      scroll(200);
    });
    expect(renders).toBeGreaterThan(0);
  });
});

describe("the answer sheet's heights as it opens, on the web", () => {
  let restore = () => undefined;
  beforeEach(() => {
    jest.replaceProperty(Platform, "OS", "web");
    // The title row is 56 tall and the answer with the Why pill 76: read as the sheet opens, before either has said so.
    Object.defineProperty(View.prototype, "offsetHeight", {
      configurable: true,
      get(this: { props: { testID?: string } }) {
        return this.props.testID === "feedback-content" ? 200 : 0;
      }
    });
    Object.defineProperty(View.prototype, "querySelector", {
      configurable: true,
      value(this: { props: { testID?: string } }, selector: string) {
        if (this.props.testID !== "feedback-content") return null;
        if (selector.includes("feedback-head")) return { offsetHeight: 56 };
        if (selector.includes("feedback-top")) return { offsetHeight: 76 };
        return null;
      }
    });
    restore = () => {
      delete (View.prototype as { offsetHeight?: number }).offsetHeight;
      delete (View.prototype as { querySelector?: unknown }).querySelector;
    };
  });
  afterEach(() => {
    restore();
    jest.restoreAllMocks();
    screen.unmount();
  });

  it("tells the full and least heights from the parts just read, once each, never from the sizes before", async () => {
    const full = jest.fn();
    const least = jest.fn();
    await render(<FeedbackSheet visible correct={false} correctLabel="Say Bismillah" why="We start with Allah's name." onContinue={jest.fn()} onFullHeight={full} onLeastHeight={least} playSound={false} />);
    const whole = 56 + 76 + 16 + 58 + SHEET_PAD + inset;
    expect(full.mock.calls).toEqual([[whole]]);
    // Slim: 16 less padding, the 50 px button and an 8 px gap above it.
    expect(least.mock.calls).toEqual([[whole - 16 - 8 - 8]]);
  });
});

describe("a question the learner left scrolled down, at CHECK", () => {
  const gap = 12;
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
  const wrapper = (id: string) => {
    let node = screen.getByTestId(`choice-${id}`).parent!;
    while (!node.props.onLayout) node = node.parent!;
    return node;
  };
  const gaps = () => screen.queryAllByTestId("fold-gap").map((view) => flat(view.props.style).height);

  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
    screen.unmount();
  });

  it("keeps the green tile where it showed: it scrolls back only by what folds above it, not on to show the prompt", async () => {
    const scrollTo = jest.spyOn(ScrollView.prototype as unknown as { scrollTo: (options: object) => void }, "scrollTo");
    scrollTo.mockClear();
    try {
      // The prompt 8-63, the tiles from 63, 68 tall and 12 apart: a (picked), b, c, then d (the green one) at 303.
      const view = await render(<ExerciseView {...four} selectedChoiceId="a" />);
      await fireEvent(screen.getByTestId("exercise-view"), "layout", layout(512));
      await fireEvent(screen.getByTestId("exercise-prompt"), "layout", layout(55, 8));
      for (const [index, id] of ["a", "b", "c", "d"].entries()) {
        await fireEvent(wrapper(id), "layout", layout(68, index * (68 + gap)));
      }
      await fireEvent(screen.getByTestId("exercise-tiles"), "layout", layout(4 * 68 + 3 * gap, 63));
      // Scrolled 220 down before CHECK (the green tile in sight near the top, the prompt and the picked tile above it
      // out of sight): b's and c's room (160) is taken up by the scroll as they fold, and it goes no further.
      let node = screen.getByTestId("exercise-question").parent!;
      while (!node.props.onScroll) node = node.parent!;
      await fireEvent.scroll(node, { nativeEvent: { contentOffset: { x: 0, y: 220 }, contentSize: { width: 320, height: 900 }, layoutMeasurement: { width: 320, height: 400 } } });
      scrollTo.mockClear();
      await view.rerender(<ExerciseView {...four} selectedChoiceId="a" correctChoiceId="d" result={result} />);
      await fireEvent(screen.getByTestId("feedback-top"), "layout", layout(76));
      await fireEvent(screen.getByTestId("feedback-content"), "layout", layout(220 - SHEET_PAD - inset));
      // The mascot hides to make room: the question waits for the prompt's new layout, or a little while.
      await act(async () => {
        jest.advanceTimersByTime(500);
      });
      expect(screen.queryByTestId("choice-b")).toBeNull();
      expect(screen.queryByTestId("choice-c")).toBeNull();
      // All of their room taken up by the scroll: none left to close.
      expect(gaps().filter((height) => Number(height) > 0)).toEqual([]);
      const questionScrolls = scrollTo.mock.calls
        .filter((_, index) => !(scrollTo.mock.contexts[index] as { props?: { nestedScrollEnabled?: boolean } } | undefined)?.props?.nestedScrollEnabled)
        .map(([options]) => (options as { y?: number }).y ?? 0);
      // At 60 the room's top edge falls in the margin under the prompt (16-71 in the scroll): it cuts no text.
      expect(questionScrolls.length).toBeGreaterThan(0);
      questionScrolls.forEach((y) => expect(y).toBeGreaterThanOrEqual(55));
      expect(questionScrolls[questionScrolls.length - 1]).toBe(60);
    } finally {
      scrollTo.mockRestore();
    }
  });
});

describe("a practice question the learner left scrolled down, at CHECK", () => {
  const full = 40 + 76 + 16 + 58 + SHEET_PAD + inset;
  let window = Dimensions.get("window");
  let screenSize = Dimensions.get("screen");
  beforeEach(() => {
    jest.useFakeTimers();
    window = Dimensions.get("window");
    screenSize = Dimensions.get("screen");
    Dimensions.set({ window: { ...window, width: 320, height: 568 }, screen: { ...screenSize, width: 320, height: 568 } });
  });
  afterEach(() => {
    jest.useRealTimers();
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

  /**
   * Scrolled 100 down before CHECK in a room `box` tall (the prompt at 38, 46 tall; the answers from 84, 54 tall and
   * 64 apart: the pick at 84-138, the first right one at 148-202, so at 48 in the room), then CHECK: where the question
   * scrolls to, and which answers are drawn.
   */
  async function checkScrolled(box: number) {
    const scrollTo = jest.spyOn(ScrollView.prototype as unknown as { scrollTo: (options: object) => void }, "scrollTo");
    try {
      const view = await render(<FoundationAssessmentScreen assessment={state} language="en" selectedAnswer={picked} {...handlers()} />);
      await fireEvent(screen.getByTestId("assessment-scroll-box"), "layout", layout(box));
      await fireEvent(screen.getByTestId("assessment-prompt"), "layout", layout(46, 38));
      for (const [index, option] of question.options.entries()) {
        await fireEvent(screen.getByTestId(tile(option)), "layout", layout(54, index * 64));
      }
      await fireEvent(screen.getByTestId("assessment-answers"), "layout", layout(question.options.length * 64 - 10, 84));
      let node = screen.getByTestId("assessment-question").parent!;
      while (!node.props.onScroll) node = node.parent!;
      await fireEvent.scroll(node, { nativeEvent: { contentOffset: { x: 0, y: 100 }, contentSize: { width: 320, height: 900 }, layoutMeasurement: { width: 320, height: box } } });
      scrollTo.mockClear();
      await view.rerender(<FoundationAssessmentScreen assessment={checked} language="en" selectedAnswer={picked} {...handlers()} />);
      await fireEvent(screen.getByTestId("feedback-top"), "layout", layout(76));
      await fireEvent(screen.getByTestId("feedback-content"), "layout", layout(full - SHEET_PAD - inset));
      await act(async () => {
        jest.advanceTimersByTime(500);
      });
      const scrolls = scrollTo.mock.calls
        .filter((_, index) => !(scrollTo.mock.contexts[index] as { props?: { nestedScrollEnabled?: boolean } } | undefined)?.props?.nestedScrollEnabled)
        .map(([options]) => (options as { y?: number }).y ?? 0);
      const drawn = question.options.map((option) => screen.queryByTestId(tile(option), { includeHiddenElements: true }) !== null);
      return { scrolls, drawn };
    } finally {
      scrollTo.mockRestore();
    }
  }

  it("keeps its first right answer where it showed: it scrolls back only by the pick that folds above it", async () => {
    // A short room: the wrong answers fold, the pick above the first right one too (its room 64).
    const { scrolls, drawn } = await checkScrolled(346);
    expect(drawn[0]).toBe(false);
    expect(drawn[1]).toBe(true);
    // 100 less 64: the first right answer stays at 48 in the room, and the prompt is not scrolled back into sight.
    expect(scrolls.length).toBeGreaterThan(0);
    scrolls.forEach((y) => expect(y).toBeGreaterThanOrEqual(36));
    expect(scrolls[scrolls.length - 1]).toBe(36);
  });

  it("moves it only as far as keeps the room's top edge off the pick's text, where nothing folds", async () => {
    const { scrolls, drawn } = await checkScrolled(380);
    expect(drawn[0]).toBe(true);
    // Left at 100 the room's top edge would cross the pick's text (84-134): it goes to 84, between the prompt and the
    // pick (16 px back, not on to show the prompt).
    expect(scrolls.length).toBeGreaterThan(0);
    expect(scrolls[scrolls.length - 1]).toBe(84);
  });
});
