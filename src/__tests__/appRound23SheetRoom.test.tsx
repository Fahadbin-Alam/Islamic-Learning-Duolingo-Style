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

// In practice a question answered with tiles knows its place in the render CHECK draws, before its answer sheet has said
// how tall it is. Held then to the room the question has before its grey answers fold, the sheet went slim and told that
// height: a question the learner left scrolled down was placed for the slimmer sheet (its scroll taking up all of the
// folds' room), and the render after, the sheet full size again in the room the folds made, sent it on to another
// place. On a phone the question jumped down at CHECK and glided back up (Urdu practice, about 30 px; a right answer on
// a second try, 4 px).

const layout = (height: number, y = 0) => ({ nativeEvent: { layout: { x: 0, y, width: 288, height } } });
const flat = (style: unknown) => (StyleSheet.flatten(style as never) ?? {}) as Record<string, unknown>;
const inset = Platform.OS === "ios" ? 30 : 16;
const ANSWER_GAP = 10;

describe("a practice question left scrolled down, at CHECK, on the web", () => {
  // The sheet as a browser lays it out: its title row 56 tall and its answer with the Why pill 76 (read as it opens),
  // then the gap and the button: 16 and 58 at full size, 8 and 50 slim (with 16 less padding around it all).
  const full = 56 + 76 + 16 + 58 + 36 + inset;
  const slim = full - 16 - 8 - 8;
  type Seen = { props: { testID?: string; children?: unknown; size?: string } };
  /** The size the sheet's button is drawn at, found among a view's children as they were last drawn. */
  const buttonSize = (node: unknown): string | undefined => {
    if (Array.isArray(node)) {
      return node.map(buttonSize).find(Boolean);
    }
    const props = (node as Seen | null)?.props;
    if (!props) {
      return undefined;
    }
    return props.testID === "feedback-continue" ? props.size : buttonSize(props.children);
  };
  const added = ["offsetHeight", "querySelector"] as const;
  let window = Dimensions.get("window");
  let screenSize = Dimensions.get("screen");
  beforeEach(() => {
    jest.useFakeTimers();
    window = Dimensions.get("window");
    screenSize = Dimensions.get("screen");
    Dimensions.set({ window: { ...window, width: 320, height: 568 }, screen: { ...screenSize, width: 320, height: 568 } });
    jest.replaceProperty(Platform, "OS", "web");
    // The question can say its size at once (so its place is read, not reported); the sheet's content is as tall as it
    // is drawn, full size or slim. Nothing else says its place at once.
    Object.defineProperty(View.prototype, "offsetHeight", {
      configurable: true,
      get(this: Seen) {
        if (this.props.testID === "assessment-question") return 600;
        if (this.props.testID === "feedback-content") return buttonSize(this.props.children) === "md" ? slim - 20 - inset : full - 36 - inset;
        return undefined;
      }
    });
    Object.defineProperty(View.prototype, "querySelector", {
      configurable: true,
      value(this: Seen, selector: string) {
        if (this.props.testID !== "feedback-content") return null;
        if (selector.includes("feedback-head")) return { offsetHeight: 56 };
        if (selector.includes("feedback-top")) return { offsetHeight: 76 };
        return null;
      }
    });
  });
  afterEach(() => {
    added.forEach((name) => delete (View.prototype as unknown as Record<string, unknown>)[name]);
    jest.restoreAllMocks();
    jest.useRealTimers();
    screen.unmount();
    Dimensions.set({ window, screen: screenSize });
  });

  const daily = createFoundationAssessment(createEmptyLearnerProfile(), "daily_challenge");
  const handlers = () => ({ onChangeSelectedAnswer: jest.fn(), onSubmit: jest.fn(), onContinue: jest.fn(), onExit: jest.fn() });
  const base = FOUNDATION_QUESTION_BANK.find((entry) => entry.type === "multiple_choice" && typeof entry.correctAnswer === "string" && (entry.options?.length ?? 0) === 4)!;
  const right = String(base.correctAnswer);
  const wrongs = (base.options ?? []).filter((option) => option !== right);
  /** Three wrong answers, then the right one at the bottom; the wrong one right above it is picked. */
  const question = { ...base, options: [...wrongs, right] };
  const picked = wrongs[2];
  const state: FoundationAssessmentState = { ...daily, currentQuestion: question };
  const checked = submitFoundationAssessmentAnswer({ profile: createEmptyLearnerProfile(), state, selectedAnswer: picked, responseTimeMs: 3000 }).stateWithFeedback;
  const tile = (option: string) => `assessment-tile-${option}`;

  it("is placed once, for the sheet at the size it shows, its scroll taking up only its share of the folds' room", async () => {
    const scrollTo = jest.spyOn(ScrollView.prototype as unknown as { scrollTo: (options: object) => void }, "scrollTo");
    try {
      // A room 460 tall: the prompt at 38 (46 tall), the answers from 84, 54 tall and 64 apart (the right one at
      // 276-330). Scrolled 138 down, the right answer at 138-192 in the room.
      const view = await render(<FoundationAssessmentScreen assessment={state} language="en" selectedAnswer={picked} {...handlers()} />);
      await fireEvent(screen.getByTestId("assessment-scroll-box"), "layout", layout(460));
      await fireEvent(screen.getByTestId("assessment-prompt"), "layout", layout(46, 38));
      for (const [index, option] of question.options.entries()) {
        await fireEvent(screen.getByTestId(tile(option)), "layout", layout(54, index * (54 + ANSWER_GAP)));
      }
      await fireEvent(screen.getByTestId("assessment-answers"), "layout", layout(4 * 54 + 3 * ANSWER_GAP, 84));
      let node = screen.getByTestId("assessment-question").parent!;
      while (!node.props.onScroll) node = node.parent!;
      await fireEvent.scroll(node, { nativeEvent: { contentOffset: { x: 0, y: 138 }, contentSize: { width: 320, height: 900 }, layoutMeasurement: { width: 320, height: 460 } } });
      scrollTo.mockClear();
      await view.rerender(<FoundationAssessmentScreen assessment={checked} language="en" selectedAnswer={picked} {...handlers()} />);
      // Too tall for the room under the right answer as it sat (152), the sheet fits the room the two grey answers
      // leave as they fold (280) at its full size. With it full size the question goes 26 down, the right answer 12
      // above it (202 + 12 - (460 - full)), though kept where it showed it would be at 10: its scroll takes up 138 - 26
      // of the folds' room as they fold (all of one grey answer's, most of the other's), and the rest opens, to close
      // with the sheet's spring. Placed for the slim sheet, its scroll took it all.
      const gaps = screen.queryAllByTestId("fold-gap").map((gap) => Number(flat(gap.props.style).height));
      expect(gaps.reduce((sum, height) => sum + height, 0)).toBe(2 * (54 + ANSWER_GAP) - (138 - 26));
      await act(async () => {
        jest.advanceTimersByTime(500);
      });
      expect(screen.queryByTestId(tile(wrongs[0]))).toBeNull();
      expect(screen.queryByTestId(tile(wrongs[1]))).toBeNull();
      expect(flat((screen.getByTestId("feedback-sheet").children[0] as unknown as { props: { style: object } }).props.style).paddingTop).not.toBe(12);
      // Sent there once. Placed first for the slim sheet (at 10), it was sent on from there once the sheet, full size
      // again, told its height.
      const questionScrolls = scrollTo.mock.calls
        .filter((_, index) => !(scrollTo.mock.contexts[index] as { props?: { nestedScrollEnabled?: boolean } } | undefined)?.props?.nestedScrollEnabled)
        .map(([options]) => (options as { y?: number }).y ?? 0);
      expect(questionScrolls).toEqual([26]);
    } finally {
      scrollTo.mockRestore();
    }
  });
});
