jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

// The mascot as a plain box, so a test can see whether it shows.
jest.mock("../ui/Mascot", () => {
  const actual = jest.requireActual("../ui/Mascot");
  const { createElement } = jest.requireActual("react");
  const { View } = jest.requireActual("react-native");
  return { ...actual, Mascot: () => createElement(View, { testID: "mascot" }) };
});

// The counting numbers animate on timers; render them as plain text here.
jest.mock("../ui/screens/FormattedCount", () => {
  const actual = jest.requireActual("../ui/screens/FormattedCount");
  const { Text } = jest.requireActual("react-native");
  const { createElement } = jest.requireActual("react");
  return { ...actual, FormattedCount: ({ value, style }: { value: number; style?: object }) => createElement(Text, { style }, actual.formatNumber(value)) };
});

import React from "react";
import { Dimensions, Platform, ScrollView, StyleSheet } from "react-native";
import { fireEvent, render, screen, within } from "@testing-library/react-native";
import { FoundationAssessmentScreen } from "../components/FoundationLearning";
import { COURSE, SHOP_ITEMS } from "../data/course";
import { FOUNDATION_QUESTION_BANK } from "../data/foundationQuestionBank";
import { getUiStrings } from "../i18n";
import { playGameSound } from "../services/gameAudio";
import { createEmptyLearnerProfile, createFoundationAssessment, submitFoundationAssessmentAnswer } from "../services/foundationAssessment";
import type { FoundationAssessmentState, LearningSection } from "../types";
import { ExerciseView, FeedbackSheet, shortWhy } from "../ui/lesson";
import { WHY_LINE } from "../ui/lesson/FeedbackSheet";
import { SCROLL_HINT_ROOM } from "../ui/lesson/ScrollHint";
import { sheetRoom, stackSpan } from "../ui/lesson/sheetFit";
import { ShopView } from "../ui/screens";
import { makeUser } from "./testUtils";

const layout = (height: number, y = 0, width = 288) => ({ nativeEvent: { layout: { x: 0, y, width, height } } });
const flat = (style: unknown) => (StyleSheet.flatten(style as never) ?? {}) as Record<string, unknown>;
const inset = Platform.OS === "ios" ? 30 : 16;
const panelStyle = () => flat((screen.getByTestId("feedback-sheet").children[0] as unknown as { props: { style: object } }).props.style);
const whyMax = () => flat(screen.getByTestId("feedback-why-scroll").props.style).maxHeight as number | undefined;
/** The gap above the button (it holds the arrow while part of the sheet scrolls). */
const gapHeight = () => flat(screen.getByTestId("feedback-gap").props.style).height as number;

/** The sheet measures its parts: the answer with the Why pill, and the Why text. */
async function measureSheet(top: number, whyHeight: number) {
  await fireEvent(screen.getByTestId("feedback-top"), "layout", layout(top));
  await fireEvent(screen.getByTestId("feedback-why-scroll"), "contentSizeChange", 288, whyHeight);
}
/** The full sheet: title row, the answer and pill, the gap, the Why text, the gap above the button, the button, padding. */
const fullSheet = (top: number, whyHeight: number) => 40 + top + 8 + whyHeight + 16 + 58 + 36 + inset;

describe("the feedback sheet: the heading, the answer and the Why pill always show whole", () => {
  const wrong = { visible: true, correct: false, correctLabel: "Face, hands and feet", why: "Wudu washes them. ".repeat(4).trim(), defaultWhyOpen: true, onContinue: jest.fn() };

  it("leaves a sheet that fits as it is: full size, nothing scrolls", async () => {
    await render(<FeedbackSheet {...wrong} maxHeight={fullSheet(76, 4 * WHY_LINE)} />);
    await measureSheet(76, 4 * WHY_LINE);
    expect(panelStyle().paddingTop).toBe(20);
    expect(whyMax()).toBeUndefined();
    expect(screen.queryByTestId("feedback-more")).toBeNull();
    expect(gapHeight()).toBe(16);
  });

  it("goes slim (less padding, the smaller button) before any of the Why text scrolls", async () => {
    await render(<FeedbackSheet {...wrong} maxHeight={fullSheet(76, 4 * WHY_LINE) - 20} />);
    await measureSheet(76, 4 * WHY_LINE);
    expect(panelStyle().paddingTop).toBe(12);
    expect(whyMax()).toBeUndefined();
    expect(gapHeight()).toBe(8);
  });

  it("only then lets the Why text scroll: from its top, whole lines, the arrow under it, never an empty gap", async () => {
    const scrollTo = jest.spyOn(ScrollView.prototype as unknown as { scrollTo: (options: object) => void }, "scrollTo");
    scrollTo.mockClear();
    // Slim with the arrow's room: title 40, answer + pill 76, gap 8, the arrow's room, the md button, slim padding.
    const slimFixed = 40 + 76 + 8 + SCROLL_HINT_ROOM + 50 + 20 + inset;
    await render(<FeedbackSheet {...wrong} maxHeight={slimFixed + 2 * WHY_LINE + 5} />);
    await measureSheet(76, 4 * WHY_LINE);
    const why = screen.getByTestId("feedback-why-scroll");
    // Two whole lines show; the answer and the pill are not in the part that scrolls.
    expect(whyMax()).toBe(2 * WHY_LINE);
    expect(within(why).getByTestId("feedback-why-text")).toBeTruthy();
    expect(within(why).queryByTestId("feedback-answer")).toBeNull();
    expect(within(why).queryByTestId("feedback-why")).toBeNull();
    expect(screen.getByTestId("feedback-answer")).toHaveTextContent("Face, hands and feet");
    expect(screen.getByText("Correct answer:")).toBeTruthy();
    // It starts at its top.
    expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ y: 0 }));

    await fireEvent(why, "layout", layout(2 * WHY_LINE));
    await fireEvent(why, "contentSizeChange", 288, 4 * WHY_LINE);
    const more = screen.getByTestId("feedback-more");
    expect(gapHeight()).toBe(SCROLL_HINT_ROOM);
    // Down by whole lines.
    scrollTo.mockClear();
    await fireEvent.press(within(more).getByLabelText("Scroll down"));
    expect(scrollTo).toHaveBeenLastCalledWith(expect.objectContaining({ y: 2 * WHY_LINE }));

    // At the end the arrow points up (the start is hidden), so the gap above the button is never empty.
    await fireEvent.scroll(why, { nativeEvent: { contentOffset: { x: 0, y: 2 * WHY_LINE }, contentSize: { width: 288, height: 4 * WHY_LINE }, layoutMeasurement: { width: 288, height: 2 * WHY_LINE } } });
    expect(screen.queryByTestId("feedback-more")).toBeNull();
    const up = screen.getByTestId("feedback-more-up");
    expect(gapHeight()).toBe(SCROLL_HINT_ROOM);
    await fireEvent.press(within(up).getByLabelText("Scroll up"));
    expect(scrollTo).toHaveBeenLastCalledWith(expect.objectContaining({ y: 0 }));
    scrollTo.mockRestore();
  });

  it("keeps the sign ﷺ inside the Why text's box and still scrolls in whole lines", async () => {
    const why = "The Prophet ﷺ praised a couple who wake each other for night prayer, again and again.";
    const slimFixed = 40 + 76 + 8 + SCROLL_HINT_ROOM + 50 + 20 + inset;
    await render(<FeedbackSheet {...wrong} why={why} maxHeight={slimFixed + 1 + 2 * WHY_LINE + 2} />);
    // Five lines, plus 1 px above and 5 px below for the sign.
    await measureSheet(76, 5 * WHY_LINE + 6);
    expect(flat(screen.getByTestId("feedback-why-text").props.style)).toEqual(expect.objectContaining({ paddingTop: 1, paddingBottom: 5 }));
    expect(whyMax()).toBe(2 * WHY_LINE + 1);
  });

  it("on a very short screen keeps the answer, the pill and one whole Why line, never cut by the part around them", async () => {
    const window = Dimensions.get("window");
    const screenSize = Dimensions.get("screen");
    // 320 x 480: even slim, with one Why line, the sheet is taller than its room and than its share of the window.
    Dimensions.set({ window: { ...window, width: 320, height: 480 }, screen: { ...screenSize, width: 320, height: 480 } });
    try {
      const longAnswer = { ...wrong, correctLabel: "Speak to her gently, thank her and help her at home" };
      await render(<FeedbackSheet {...longAnswer} maxHeight={150} />);
      await measureSheet(100, 2 * WHY_LINE);
      expect(panelStyle().paddingTop).toBe(12);
      expect(whyMax()).toBe(WHY_LINE);
      await fireEvent(screen.getByTestId("feedback-why-scroll"), "layout", layout(WHY_LINE));
      await fireEvent(screen.getByTestId("feedback-why-scroll"), "contentSizeChange", 288, 2 * WHY_LINE);
      expect(screen.getByTestId("feedback-more")).toBeTruthy();
      // The body holds the answer with the pill (100), the gap (8) and the one Why line, whole.
      expect(flat(screen.getByTestId("feedback-body").props.style).maxHeight).toBeGreaterThanOrEqual(100 + 8 + WHY_LINE);
    } finally {
      Dimensions.set({ window, screen: screenSize });
    }
  });
});

describe("a lesson question gives its room to the feedback sheet first", () => {
  const tf = {
    kind: "true_false" as const,
    prompt: "Abu Dharr bravely called out his Islam at the market.",
    choices: [
      { id: "true", label: "True" },
      { id: "false", label: "False" }
    ],
    mascotVariant: "boy",
    accent: "#21B573",
    onSelect: jest.fn(),
    onCheck: jest.fn(),
    onContinue: jest.fn()
  };
  const wrong = { correct: false, correctLabel: "False", why: "Abu Dharr bravely called out his Islam at the Ka'bah." };

  async function trueFalse(rootHeight: number, whyHeight: number) {
    await render(<ExerciseView {...tf} selectedChoiceId="true" correctChoiceId="false" result={wrong} defaultWhyOpen />);
    expect(screen.getByTestId("mascot")).toBeTruthy();
    await fireEvent(screen.getByTestId("exercise-view"), "layout", layout(rootHeight));
    // With the mascot the prompt is a bubble 140 tall; the True / False row (108) sits right under it.
    await fireEvent(screen.getByTestId("exercise-prompt"), "layout", layout(140, 8));
    await fireEvent(screen.getByTestId("exercise-tiles"), "layout", layout(108, 148));
    await measureSheet(76, whyHeight);
  }

  it("hides the mascot before the sheet shrinks (True / False, a short phone)", async () => {
    await trueFalse(500, 2 * WHY_LINE);
    // 306 tall, and only 236 under the tiles: the mascot goes, and the sheet waits for the new layout.
    expect(screen.queryByTestId("mascot")).toBeNull();
    expect(panelStyle().paddingTop).toBe(20);
    // The prompt now takes the full width: two lines. The sheet fits whole under the tiles.
    await fireEvent(screen.getByTestId("exercise-prompt"), "layout", layout(46, 8));
    expect(sheetRoom({ visibleBottom: 500, promptTop: 8, focusTop: 54, focusBottom: 162 }).room).toBeGreaterThanOrEqual(fullSheet(76, 2 * WHY_LINE));
    expect(panelStyle().paddingTop).toBe(20);
    expect(whyMax()).toBeUndefined();
    expect(screen.queryByTestId("mascot")).toBeNull();
  });

  it("lets only the Why text scroll when even the squeezed question leaves too little room", async () => {
    await trueFalse(480, 4 * WHY_LINE);
    await fireEvent(screen.getByTestId("exercise-prompt"), "layout", layout(46, 8));
    // 480 - (54 + 108) - 8 = 310 under the tiles: slim, two whole lines of the Why text, the arrow under them.
    expect(panelStyle().paddingTop).toBe(12);
    expect(whyMax()).toBe(2 * WHY_LINE);
    expect(within(screen.getByTestId("feedback-why-scroll")).queryByTestId("feedback-answer")).toBeNull();
    await fireEvent(screen.getByTestId("feedback-why-scroll"), "layout", layout(2 * WHY_LINE));
    expect(screen.getByTestId("feedback-more")).toBeTruthy();
  });

  it("folds the grey tiles away (and hides the mascot) before the sheet shrinks, until the next try", async () => {
    const four = {
      ...tf,
      kind: "multiple_choice" as const,
      prompt: "What is Yunus known for?",
      choices: [
        { id: "a", label: "He built the Ark before the great flood came" },
        { id: "b", label: "He led his people across the sea to safety" },
        { id: "c", label: "He was given great strength to fight Jalut" },
        { id: "d", label: "He prayed to Allah from inside the big fish" }
      ]
    };
    const result = { correct: false, correctLabel: four.choices[3].label, why: "Yunus called on Allah from the dark." };
    const { rerender } = await render(<ExerciseView {...four} selectedChoiceId="a" correctChoiceId="d" result={result} defaultWhyOpen />);
    const gap = 12;
    // The box around each tile that reports its place in the stack.
    const wrapper = (id: string) => {
      let node = screen.getByTestId(`choice-${id}`).parent!;
      while (!node.props.onLayout) node = node.parent!;
      return node;
    };
    await fireEvent(screen.getByTestId("exercise-view"), "layout", layout(512));
    await fireEvent(screen.getByTestId("exercise-prompt"), "layout", layout(39, 8));
    for (const [index, id] of ["a", "b", "c", "d"].entries()) {
      await fireEvent(wrapper(id), "layout", layout(68, index * (68 + gap)));
    }
    await fireEvent(screen.getByTestId("exercise-tiles"), "layout", layout(4 * 68 + 3 * gap, 47));
    await measureSheet(76, WHY_LINE);
    // The picked tile and the green one stay; the grey ones and the mascot are gone.
    expect(screen.getByTestId("choice-a")).toBeTruthy();
    expect(screen.getByTestId("choice-d")).toBeTruthy();
    expect(screen.queryByTestId("choice-b")).toBeNull();
    expect(screen.queryByTestId("choice-c")).toBeNull();
    expect(screen.queryByTestId("mascot")).toBeNull();

    // Like a browser, only the stack reports its new size. The green tile, now right under the red one, leaves room
    // for the whole sheet: full size, nothing scrolls.
    await fireEvent(screen.getByTestId("exercise-tiles"), "layout", layout(2 * 68 + gap, 47));
    expect(sheetRoom({ visibleBottom: 512, promptTop: 8, focusTop: 47 + 80, focusBottom: 47 + 80 + 68 }).room).toBeGreaterThanOrEqual(fullSheet(76, WHY_LINE));
    expect(panelStyle().paddingTop).toBe(20);
    expect(whyMax()).toBeUndefined();

    // The next try shows every tile and the mascot again.
    await rerender(<ExerciseView {...four} attempt={1} />);
    ["a", "b", "c", "d"].forEach((id) => expect(screen.getByTestId(`choice-${id}`)).toBeTruthy());
    expect(screen.getByTestId("mascot")).toBeTruthy();
  });

  it("changes nothing when the sheet already fits (a tall phone)", async () => {
    await trueFalse(900, 2 * WHY_LINE);
    expect(screen.getByTestId("mascot")).toBeTruthy();
    expect(screen.getByTestId("choice-true")).toBeTruthy();
    expect(screen.getByTestId("choice-false")).toBeTruthy();
    expect(panelStyle().paddingTop).toBe(20);
    expect(whyMax()).toBeUndefined();
  });

  it("finds a tile's place from the heights above it, in a column or a two-column grid", () => {
    const boxes = { a: { y: 0, height: 54 }, b: { y: 64, height: 70 }, c: { y: 999, height: 54 }, d: { y: 999, height: 60 } };
    expect(stackSpan(["a", "c"], boxes, "c", 10)).toEqual({ top: 64, bottom: 118 });
    expect(stackSpan(["a", "b", "c", "d"], boxes, "d", 10, 2)).toEqual({ top: 80, bottom: 140 });
  });
});

describe("practice questions give their room to the feedback sheet first, as lessons do", () => {
  const daily = createFoundationAssessment(createEmptyLearnerProfile(), "daily_challenge");
  const handlers = () => ({ onChangeSelectedAnswer: jest.fn(), onSubmit: jest.fn(), onContinue: jest.fn(), onExit: jest.fn() });
  /** A four-answer question with the right answer moved last, answered wrong with its first one; it has a Why line. */
  const missed = () => {
    for (const base of FOUNDATION_QUESTION_BANK) {
      if (base.type !== "multiple_choice" || (base.options?.length ?? 0) !== 4 || typeof base.correctAnswer !== "string") continue;
      const answer = base.correctAnswer;
      const question = { ...base, options: [...(base.options ?? []).filter((option) => option !== answer), answer] };
      const picked = question.options[0];
      const state: FoundationAssessmentState = { ...daily, currentQuestion: question };
      const checked = submitFoundationAssessmentAnswer({ profile: createEmptyLearnerProfile(), state, selectedAnswer: picked, responseTimeMs: 3000 }).stateWithFeedback;
      const feedback = checked.feedback!;
      const why = shortWhy({ easierExplanation: question.wrongAnswerNotes?.[picked], explanation: `${feedback.explanationShort} ${feedback.explanationLong}`, prompt: question.prompt, correctLabel: answer });
      if (why) return { question, answer, picked, checked };
    }
    throw new Error("no four-answer question with a Why line");
  };

  it("folds the grey answers away and hides the mascot, so the right one stays above a full-size sheet", async () => {
    const { question, answer, picked, checked } = missed();
    await render(<FoundationAssessmentScreen assessment={checked} language="en" selectedAnswer={picked} {...handlers()} />);
    expect(screen.getByTestId("mascot")).toBeTruthy();
    await fireEvent(screen.getByTestId("assessment-scroll-box"), "layout", layout(500));
    await fireEvent(screen.getByTestId("assessment-prompt"), "layout", layout(46, 38));
    for (const [index, option] of question.options.entries()) {
      await fireEvent(screen.getByTestId(`assessment-tile-${option}`), "layout", layout(54, index * 64));
    }
    await fireEvent(screen.getByTestId("assessment-answers"), "layout", layout(4 * 54 + 3 * 10, 84));
    // The sheet opens with its Why line shut; open it.
    await fireEvent.press(screen.getByTestId("feedback-why"));
    await measureSheet(76, 2 * WHY_LINE);
    // Under the last tile there is no room for it: the two grey answers fold away, the mascot hides.
    expect(screen.getAllByTestId(/^assessment-tile-/)).toHaveLength(2);
    expect(screen.getByTestId(`assessment-tile-${picked}`)).toBeTruthy();
    expect(screen.getByTestId(`assessment-tile-${answer}`)).toBeTruthy();
    expect(screen.queryByTestId("mascot")).toBeNull();
    // The answers report their new size; the right one is now second, with room for the whole sheet under it.
    await fireEvent(screen.getByTestId("assessment-answers"), "layout", layout(2 * 54 + 10, 84));
    expect(panelStyle().paddingTop).toBe(20);
    expect(whyMax()).toBeUndefined();
  });
});

describe("every tap on a shop item makes a sound", () => {
  const strings = getUiStrings("en");
  const section = COURSE.sections[0] as LearningSection;
  const shop = async (user = makeUser()) => {
    const onUseItem = jest.fn();
    await render(<ShopView user={user} strings={strings} items={SHOP_ITEMS} storePrices={{}} busy={false} section={section} onUseItem={onUseItem} onRestore={jest.fn()} canBuyWithMoney={false} />);
    (playGameSound as jest.Mock).mockClear();
    return onUseItem;
  };
  const sounds = () => (playGameSound as jest.Mock).mock.calls.map((call) => call[0]);

  it("a locked hearts row buzzes like its locked button, and its line says why", async () => {
    const onUseItem = await shop(makeUser({ gems: 120, hearts: { current: 3, max: 5, unlimited: false, lastRefillDate: "2026-10-20" } }));
    expect(screen.getByTestId("shop-line-gem-heart-refill")).toHaveTextContent("Need 230 more");
    await fireEvent.press(screen.getByTestId("shop-item-gem-heart-refill"));
    expect(sounds()).toEqual(["wrong"]);
    (playGameSound as jest.Mock).mockClear();
    await fireEvent.press(screen.getByTestId("shop-buy-gem-heart-refill"));
    expect(sounds()).toEqual(["wrong"]);
    expect(onUseItem).not.toHaveBeenCalled();
  });

  it("a hearts row with full hearts plays a soft tap and says hearts are full, row and button alike", async () => {
    const onUseItem = await shop(makeUser({ gems: 500, hearts: { current: 5, max: 5, unlimited: false, lastRefillDate: "2026-10-20" } }));
    await fireEvent.press(screen.getByTestId("shop-item-gem-heart-refill"));
    expect(sounds()).toEqual(["soft_ui"]);
    expect(screen.getByTestId("shop-line-gem-heart-refill")).toHaveTextContent("Hearts are full");
    (playGameSound as jest.Mock).mockClear();
    await fireEvent.press(screen.getByTestId("shop-buy-gem-heart-refill"));
    expect(sounds()).toEqual(["soft_ui"]);
    expect(onUseItem).not.toHaveBeenCalled();
  });

  it("a row that can be bought plays a soft tap and never buys; its button buys", async () => {
    const onUseItem = await shop(makeUser({ gems: 500, hearts: { current: 2, max: 5, unlimited: false, lastRefillDate: "2026-10-20" } }));
    await fireEvent.press(screen.getByTestId("shop-item-gem-heart-refill"));
    expect(sounds()).toEqual(["soft_ui"]);
    expect(onUseItem).not.toHaveBeenCalled();
    await fireEvent.press(screen.getByTestId("shop-buy-gem-heart-refill"));
    expect(onUseItem).toHaveBeenCalledTimes(1);
  });
});
