jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { FoundationAssessmentScreen } from "../components/FoundationLearning";
import { FOUNDATION_QUESTION_BANK } from "../data/foundationQuestionBank";
import { createEmptyLearnerProfile, createFoundationAssessment, submitFoundationAssessmentAnswer } from "../services/foundationAssessment";
import type { FoundationAssessmentState } from "../types";

// Practice opens a fresh answer sheet for each CHECK, as lessons do (a fresh view each question). Kept from question to
// question, the sheet opened with what it had worked out for the last one: a list's scroll (a "more" arrow and a wider
// gap over CONTINUE on a sheet with nothing to scroll) and its start below the screen (a taller sheet showed for a
// frame, dropped away and rose).

const layout = (height: number, y = 0, width = 288) => ({ nativeEvent: { layout: { x: 0, y, width, height } } });
const handlers = () => ({ onChangeSelectedAnswer: jest.fn(), onSubmit: jest.fn(), onContinue: jest.fn(), onExit: jest.fn() });
const daily = createFoundationAssessment(createEmptyLearnerProfile(), "daily_challenge");
type Question = (typeof FOUNDATION_QUESTION_BANK)[number];
const stateOf = (question: Question): FoundationAssessmentState => ({ ...daily, currentQuestion: question });
const checkedOf = (question: Question, selectedAnswer: string | string[]) =>
  submitFoundationAssessmentAnswer({ profile: createEmptyLearnerProfile(), state: stateOf(question), selectedAnswer, responseTimeMs: 3000 }).stateWithFeedback;

const order = FOUNDATION_QUESTION_BANK.find((entry) => entry.type === "correct_order" && (entry.orderItems?.length ?? 0) >= 5)!;
const pickOne = FOUNDATION_QUESTION_BANK.find((entry) => entry.type === "multiple_choice" && typeof entry.correctAnswer === "string" && (entry.options?.length ?? 0) >= 3)!;
const wrongOrder = [...order.orderItems!].reverse();

const gap = () => StyleSheet.flatten(screen.getByTestId("feedback-gap").props.style).height;
/** The sheet's panel (it holds the sheet's content and slides up into its place). */
const panel = () => {
  let node = screen.getByTestId("feedback-content").parent;
  while (node && !(StyleSheet.flatten(node.props.style) as { transform?: unknown } | undefined)?.transform) {
    node = node.parent;
  }
  return node!;
};
/** How far below its place the panel sits right now. */
const panelDrop = () => {
  const transform = (StyleSheet.flatten(panel().props.style) as { transform: { translateY?: number }[] }).transform;
  return transform.find((entry) => entry.translateY !== undefined)?.translateY ?? 0;
};

async function letSheetGo() {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
  });
}

let window: ReturnType<typeof Dimensions.get>;
let screenSize: ReturnType<typeof Dimensions.get>;
beforeEach(() => {
  window = Dimensions.get("window");
  screenSize = Dimensions.get("screen");
  Dimensions.set({ window: { ...window, width: 320, height: 568 }, screen: { ...screenSize, width: 320, height: 568 } });
});
afterEach(() => {
  Dimensions.set({ window, screen: screenSize });
});

/** A sorting game answered wrong, its list of steps scrolling in its sheet, then CONTINUE. */
async function afterScrolledList(on: ReturnType<typeof handlers>) {
  const view = await render(<FoundationAssessmentScreen assessment={checkedOf(order, wrongOrder)} language="en" selectedAnswer={wrongOrder} {...on} />);
  const steps = order.orderItems!;
  for (const index of steps.keys()) {
    await fireEvent(screen.getByTestId(`feedback-row-${index}`), "layout", layout(20, index * 24));
  }
  await fireEvent(screen.getByTestId("feedback-list"), "layout", layout(steps.length * 24 - 4));
  const body = screen.getByTestId("feedback-body");
  await fireEvent(body, "layout", layout(60));
  await fireEvent(body, "contentSizeChange", 288, 260);
  await fireEvent(screen.getByTestId("feedback-content"), "layout", layout(420));
  // The list scrolls: the arrow shows.
  expect(screen.queryByTestId("feedback-more") ?? screen.queryByTestId("feedback-more-up")).toBeTruthy();
  await view.rerender(<FoundationAssessmentScreen assessment={stateOf(pickOne)} language="en" selectedAnswer={undefined} {...on} />);
  await letSheetGo();
  return view;
}

describe("practice opens a fresh answer sheet for each CHECK", () => {
  it("shows no arrow or wide gap on the next sheet when the last one's list scrolled", async () => {
    const on = handlers();
    const view = await afterScrolledList(on);
    const right = String(pickOne.correctAnswer);
    await view.rerender(<FoundationAssessmentScreen assessment={checkedOf(pickOne, right)} language="en" selectedAnswer={right} {...on} />);
    expect(screen.queryByTestId("feedback-more")).toBeNull();
    expect(screen.queryByTestId("feedback-more-up")).toBeNull();
    expect(gap()).toBe(16);
  });

  it("starts the next sheet's rise from below the screen, not from the last sheet's height", async () => {
    const on = handlers();
    const right = String(pickOne.correctAnswer);
    const view = await render(<FoundationAssessmentScreen assessment={checkedOf(pickOne, right)} language="en" selectedAnswer={right} {...on} />);
    // A fresh sheet starts well below the screen.
    const fresh = panelDrop();
    expect(fresh).toBeGreaterThan(400);
    // The short "You got it!" sheet says its height, then goes.
    await fireEvent(panel(), "layout", layout(166));
    await view.rerender(<FoundationAssessmentScreen assessment={stateOf(order)} language="en" selectedAnswer={wrongOrder} {...on} />);
    await letSheetGo();
    // The next sheet, a taller list, starts from as far down as a fresh one: started from the short sheet's height,
    // its top would show over the bottom of the screen in its first frame.
    await view.rerender(<FoundationAssessmentScreen assessment={checkedOf(order, wrongOrder)} language="en" selectedAnswer={wrongOrder} {...on} />);
    expect(panelDrop()).toBeGreaterThan(400);
  });
});
