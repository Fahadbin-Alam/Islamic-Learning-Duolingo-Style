jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

import React from "react";
import { Dimensions, Platform, ScrollView, View } from "react-native";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { FoundationAssessmentScreen } from "../components/FoundationLearning";
import { FOUNDATION_QUESTION_BANK } from "../data/foundationQuestionBank";
import { createEmptyLearnerProfile, createFoundationAssessment, submitFoundationAssessmentAnswer } from "../services/foundationAssessment";
import type { FoundationAssessmentState } from "../types";
import { ExerciseView } from "../ui/lesson";
import { useQuestionScroll } from "../ui/lesson/sheetFit";

// A question the learner left scrolled down keeps its green tile where it showed while the sheet is up (keptScrollY),
// so it sits further down than the sheet alone would put it. The tiles the sheet's top edge would cut fade away: the
// ones it cuts there, where the question goes, not where it would go if it were not kept.

const layout = (height: number, y = 0) => ({ nativeEvent: { layout: { x: 0, y, width: 288, height } } });
const inset = Platform.OS === "ios" ? 30 : 16;
// The sheet's padding (20 + 16), its lg button (58) and the gap above it (16).
const SHEET_PAD = 36;
const scrollOf = (testID: string) => {
  let node = screen.getByTestId(testID).parent!;
  while (!node.props.onScroll) node = node.parent!;
  return node;
};

describe("where the question goes, for the tiles the sheet's edge would cut", () => {
  it("is never less far than it was sent once the Why line is open, as the question's own scroll goes", async () => {
    function Probe({ target, why }: { target: number; why: boolean }) {
      const scrollRef = React.useRef({ scrollTo: () => undefined } as unknown as ScrollView);
      const own = useQuestionScroll({ open: true, scrollRef, target, ready: true, settling: false, whyOpened: why, viewport: 400, partTop: null });
      return <View testID="probe" accessibilityLabel={String(own.goesTo(target))} />;
    }
    const label = () => screen.getByTestId("probe").props.accessibilityLabel;
    const { rerender } = await render(<Probe target={200} why={false} />);
    expect(label()).toBe("200");
    // The Why line opens and a fold above the green tile would send it back up to 50: it stays at 200, and the sheet's
    // edge is found from there.
    await rerender(<Probe target={50} why />);
    expect(label()).toBe("200");
    await rerender(<Probe target={260} why />);
    expect(label()).toBe("260");
    // Shut again, it goes where it is sent.
    await rerender(<Probe target={50} why={false} />);
    expect(label()).toBe("50");
    screen.unmount();
  });
});

describe("a lesson question the learner left scrolled down, its picked tile under the green one", () => {
  const TILE = 68;
  const GAP = 12;
  const four = {
    kind: "multiple_choice" as const,
    prompt: "Who prayed from inside the big fish?",
    choices: [
      { id: "a", label: "Nuh, who built the Ark" },
      { id: "b", label: "Yunus, who called on Allah" },
      { id: "c", label: "Musa, who crossed the sea" },
      { id: "d", label: "Dawud, who fought Jalut" }
    ],
    mascotVariant: "boy",
    accent: "#21B573",
    onSelect: jest.fn(),
    onCheck: jest.fn(),
    onContinue: jest.fn()
  };
  const result = { correct: false, correctLabel: four.choices[1].label, why: "Yunus called on Allah from the dark." };
  const wrapper = (id: string) => {
    let node = screen.getByTestId(`choice-${id}`, { includeHiddenElements: true }).parent!;
    while (!node.props.onLayout) node = node.parent!;
    return node;
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
    screen.unmount();
  });

  /**
   * The prompt at 8 (39 tall), the tiles from 47, 68 tall and 12 apart: a, b (the green one, 127-195), c, d (the
   * picked one, 287-355). Scrolled 120 down (the green tile at 7-75 in the room, the picked one at 167-235), then
   * CHECK with a sheet `sheet` tall in a screen part 512 tall: a and c fold, the picked tile moves up under the green
   * one (127-195), and the question keeps the green tile where it showed, its scroll at 39 (the green tile's top less 8).
   */
  async function checkScrolled(sheet: number) {
    const view = await render(<ExerciseView {...four} selectedChoiceId="d" />);
    await fireEvent(screen.getByTestId("exercise-view"), "layout", layout(512));
    await fireEvent(screen.getByTestId("exercise-prompt"), "layout", layout(39, 8));
    for (const [index, id] of ["a", "b", "c", "d"].entries()) {
      await fireEvent(wrapper(id), "layout", layout(TILE, index * (TILE + GAP)));
    }
    await fireEvent(screen.getByTestId("exercise-tiles"), "layout", layout(4 * TILE + 3 * GAP, 47));
    await fireEvent.scroll(scrollOf("exercise-question"), {
      nativeEvent: { contentOffset: { x: 0, y: 120 }, contentSize: { width: 320, height: 900 }, layoutMeasurement: { width: 320, height: 400 } }
    });
    await view.rerender(<ExerciseView {...four} selectedChoiceId="d" correctChoiceId="b" result={result} />);
    await fireEvent(screen.getByTestId("feedback-top"), "layout", layout(76));
    await fireEvent(screen.getByTestId("feedback-content"), "layout", layout(sheet - SHEET_PAD - inset));
    // The mascot hides to make room: the question waits for the prompt's new layout, or a little while.
    await act(async () => {
      jest.advanceTimersByTime(500);
    });
    // The tiles that fold away leave the picked one right under the green one.
    expect(screen.queryByTestId("choice-a", { includeHiddenElements: true })).toBeNull();
    expect(screen.queryByTestId("choice-c", { includeHiddenElements: true })).toBeNull();
    expect(screen.getByTestId("choice-b")).toBeTruthy();
  }

  it("keeps the picked tile while it sits wholly above the sheet where the question is kept", async () => {
    // The sheet's top at 39 + 512 - 340 = 211 in the scroll, under the picked tile (195). Where the sheet alone would
    // put the question (at its top), the sheet's top would be at 172, through the picked tile: it would fade there,
    // with room left for it between the green tile and the sheet.
    await checkScrolled(340);
    expect(screen.getByTestId("choice-d")).toBeTruthy();
    expect(wrapper("d").props.pointerEvents).not.toBe("none");
  });

  it("still fades the picked tile where the sheet's top edge would cut it there", async () => {
    // A taller sheet: its top at 39 + 512 - 380 = 171, through the picked tile.
    await checkScrolled(380);
    expect(screen.queryByTestId("choice-d")).toBeNull();
    expect(screen.getByTestId("choice-d", { includeHiddenElements: true })).toBeTruthy();
    expect(wrapper("d").props.pointerEvents).toBe("none");
  });
});

describe("the answers the sheet's top edge would cut on a practice question, found where it goes", () => {
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
    (entry) =>
      entry.type === "multi_select" &&
      Array.isArray(entry.correctAnswer) &&
      entry.correctAnswer.length >= 2 &&
      (entry.options ?? []).filter((option) => !(entry.correctAnswer as string[]).includes(option)).length >= 2
  )!;
  const rights = base.correctAnswer as string[];
  const wrongs = (base.options ?? []).filter((option) => !rights.includes(option));
  /** The first two right answers on top, then a wrong one (the one picked), then the rest. */
  const question = { ...base, options: [rights[0], rights[1], wrongs[0], ...wrongs.slice(1), ...rights.slice(2)] };
  const picked = [wrongs[0]];
  const state: FoundationAssessmentState = { ...daily, currentQuestion: question };
  const checked = submitFoundationAssessmentAnswer({ profile: createEmptyLearnerProfile(), state, selectedAnswer: picked, responseTimeMs: 3000 }).stateWithFeedback;
  const tile = (option: string) => `assessment-tile-${option}`;

  /**
   * In a room `box` tall: the prompt at 38 (46 tall), the answers from 84, 54 tall and 64 apart (the first right one
   * at 84-138, the second at 148-202, the pick at 212-266). Scrolled 70 down (the first right answer at 14-68 in the
   * room), then CHECK: the question keeps it where it showed, its scroll at 70.
   */
  async function checkScrolled(box: number) {
    const view = await render(<FoundationAssessmentScreen assessment={state} language="en" selectedAnswer={picked} {...handlers()} />);
    await fireEvent(screen.getByTestId("assessment-scroll-box"), "layout", layout(box));
    await fireEvent(screen.getByTestId("assessment-prompt"), "layout", layout(46, 38));
    for (const [index, option] of question.options.entries()) {
      await fireEvent(screen.getByTestId(tile(option)), "layout", layout(54, index * 64));
    }
    await fireEvent(screen.getByTestId("assessment-answers"), "layout", layout(question.options.length * 64 - 10, 84));
    await fireEvent.scroll(scrollOf("assessment-question"), {
      nativeEvent: { contentOffset: { x: 0, y: 70 }, contentSize: { width: 320, height: 900 }, layoutMeasurement: { width: 320, height: box } }
    });
    await view.rerender(<FoundationAssessmentScreen assessment={checked} language="en" selectedAnswer={picked} {...handlers()} />);
    await fireEvent(screen.getByTestId("feedback-top"), "layout", layout(76));
    await fireEvent(screen.getByTestId("feedback-content"), "layout", layout(full - SHEET_PAD - inset));
    await act(async () => {
      jest.advanceTimersByTime(500);
    });
  }

  it("finds what the sheet would cut where the question is held once the Why line opens, not where a fold would send it", async () => {
    // A grey answer above the first right one, the pick under it: grey 84-138, right 148-202, pick 212-266.
    const order = { ...base, options: [wrongs[1], rights[0], wrongs[0], ...wrongs.slice(2), ...rights.slice(1)] };
    const atRest: FoundationAssessmentState = { ...daily, currentQuestion: order };
    const sent = submitFoundationAssessmentAnswer({ profile: createEmptyLearnerProfile(), state: atRest, selectedAnswer: picked, responseTimeMs: 3000 }).stateWithFeedback;
    const view = await render(<FoundationAssessmentScreen assessment={atRest} language="en" selectedAnswer={picked} {...handlers()} />);
    await fireEvent(screen.getByTestId("assessment-scroll-box"), "layout", layout(440));
    await fireEvent(screen.getByTestId("assessment-prompt"), "layout", layout(46, 38));
    for (const [index, option] of order.options.entries()) {
      await fireEvent(screen.getByTestId(tile(option)), "layout", layout(54, index * 64));
    }
    await fireEvent(screen.getByTestId("assessment-answers"), "layout", layout(order.options.length * 64 - 10, 84));
    await view.rerender(<FoundationAssessmentScreen assessment={sent} language="en" selectedAnswer={picked} {...handlers()} />);
    await fireEvent(screen.getByTestId("feedback-top"), "layout", layout(76));
    // The sheet, its Why line shut, fits under the right answer with nothing folded: the question goes 30 down (as far
    // as it may, the topic label above the prompt out of sight), the sheet's top at 30 + 440 - full = 214, through the
    // pick, which fades.
    await fireEvent(screen.getByTestId("feedback-content"), "layout", layout(full - SHEET_PAD - inset));
    await act(async () => {
      jest.advanceTimersByTime(500);
    });
    expect(screen.getByTestId(tile(wrongs[1]))).toBeTruthy();
    expect(screen.queryByTestId(tile(wrongs[0]))).toBeNull();
    // The Why line opens and the sheet grows by 8: too tall now, so the grey answers fold, the one above the right
    // answer too, and the pick moves up under it (148-202). The fold alone would send the question back to its top,
    // the sheet's top then at 176, through the pick; it stays 30 down, as it does once the Why line is open, and the
    // sheet's top sits at 206 there: the pick shows.
    await fireEvent.press(screen.getByTestId("feedback-why"));
    await fireEvent(screen.getByTestId("feedback-content"), "layout", layout(full + 8 - SHEET_PAD - inset));
    await act(async () => {
      jest.advanceTimersByTime(500);
    });
    expect(screen.queryByTestId(tile(wrongs[1]), { includeHiddenElements: true })).toBeNull();
    expect(screen.getByTestId(tile(rights[0]))).toBeTruthy();
    expect(screen.getByTestId(tile(wrongs[0]))).toBeTruthy();
  });

  it("shows the missed right answer while it sits wholly above the sheet where the question is kept", async () => {
    // The sheet's top at 70 + 400 - full in the scroll, under the second right answer (202) and through the pick.
    // Where the sheet alone would put the question (6 down), its top would be through the second right answer.
    await checkScrolled(400);
    expect(screen.getByTestId(tile(rights[0]))).toBeTruthy();
    expect(screen.getByTestId(tile(rights[1]))).toBeTruthy();
    expect(screen.queryByTestId(tile(wrongs[0]))).toBeNull();
    expect(screen.getByTestId(tile(wrongs[0]), { includeHiddenElements: true })).toBeTruthy();
  });
});
