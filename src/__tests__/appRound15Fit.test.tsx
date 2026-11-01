jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

// Whether the bar under the question holds the more-below arrow's room as it is drawn: the room above it is that much
// shorter (see layoutEngine).
const mockBar = { arrow: false };
jest.mock("../ui/lesson/ScrollHint", () => {
  const actual = jest.requireActual("../ui/lesson/ScrollHint");
  const { createElement } = jest.requireActual("react");
  return {
    ...actual,
    ScrollHintGap: (props: { visible: boolean; hold?: boolean; gapTestID?: string }) => {
      if (props.gapTestID === "bar-hint-gap") {
        mockBar.arrow = Boolean(props.visible || props.hold);
      }
      return createElement(actual.ScrollHintGap, props);
    }
  };
});

import React from "react";
import { Dimensions, Platform, ScrollView, StyleSheet, View } from "react-native";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { FoundationAssessmentScreen } from "../components/FoundationLearning";
import { FOUNDATION_QUESTION_BANK } from "../data/foundationQuestionBank";
import { createEmptyLearnerProfile, createFoundationAssessment, submitFoundationAssessmentAnswer } from "../services/foundationAssessment";
import type { FoundationAssessmentState } from "../types";
import { ChoiceTile } from "../ui/ChoiceTile";
import { ExerciseView, FadeUnderSheet, FeedbackSheet, PromptText, QuestionBubble, StackTile } from "../ui/lesson";
import { WHY_LINE } from "../ui/lesson/FeedbackSheet";
import { setActiveLanguage } from "../i18n";
import { SCROLL_HINT_ROOM, ScrollHintGap } from "../ui/lesson/ScrollHint";
import * as sheetFit from "../ui/lesson/sheetFit";
import type { FitMeasure, QuestionFit } from "../ui/lesson/sheetFit";

const { FIT_STEPS, fitLook, nextFit, wholeTilesDrop } = sheetFit;
/** How much the bar under the question grows while it holds the arrow (its gap is 16 px). */
const ARROW_GROWTH = SCROLL_HINT_ROOM - 16;

const layout = (height: number, y = 0, width = 288) => ({ nativeEvent: { layout: { x: 0, y, width, height } } });
const flat = (style: unknown) => (StyleSheet.flatten(style as never) ?? {}) as Record<string, unknown>;

/**
 * Visits every element under `node` (the props of a view as it is about to be laid out). A column's tile is one element
 * (StackTile: the fading view, its slide in and the tile, drawn from its props).
 */
function walk(node: React.ReactNode, visit: (element: React.ReactElement<Record<string, unknown>>) => void) {
  React.Children.forEach(node, (child) => {
    if (React.isValidElement<Record<string, unknown>>(child)) {
      visit(child);
      walk(child.props.children as React.ReactNode, visit);
    }
  });
}

/**
 * A stand-in for the browser's layout: views say their height at once (as on the web and in the New Architecture). The
 * room is `room()` less the arrow's room while the bar under it holds the arrow; the question's height is worked out
 * from what it draws (see `question`), so each step of its fit really makes it shorter, as it would on a phone.
 */
function layoutEngine(roomID: string, room: () => number, questionID: string, question: (children: React.ReactNode) => number) {
  mockBar.arrow = false;
  Object.defineProperty(View.prototype, "offsetHeight", {
    configurable: true,
    get(this: { props: { testID?: string; children?: React.ReactNode } }) {
      const testID = this.props.testID ?? "";
      if (testID === roomID) return room() - (mockBar.arrow ? ARROW_GROWTH : 0);
      return testID === questionID ? question(this.props.children) : 0;
    }
  });
  return () => {
    delete (View.prototype as { offsetHeight?: number }).offsetHeight;
  };
}

/** What a set of four row tiles under a two-line prompt is drawn with: padding, text and prompt line heights, gaps. */
function looks(children: React.ReactNode) {
  let pad = 12;
  let labelLine = 23;
  let promptLine = 26;
  const gaps: number[] = [];
  walk(children, (element) => {
    if (element.type === ChoiceTile || element.type === StackTile) {
      pad = element.props.tight ? 6 : 12;
      labelLine = element.props.smallText ? 20 : 23;
    }
    if (element.type === QuestionBubble) {
      promptLine = element.props.small ? 23 : 26;
    }
    if (element.type === PromptText) {
      promptLine = (element.props.size as number) <= 17 ? 23 : 26;
    }
    const fading = element.type === FadeUnderSheet ? element.props.testID === undefined : element.type === StackTile && element.props.boxTestID === undefined;
    if (fading && element.props.style) {
      gaps.push((flat(element.props.style).marginBottom as number | undefined) ?? 0);
    }
    // Practice's column of tiles: a gap between each two of the four.
    const tiles = React.Children.toArray(element.props.children as React.ReactNode).filter((child) => React.isValidElement(child) && (child.type === FadeUnderSheet || child.type === StackTile));
    if (tiles.length === 4 && element.props.style && flat(element.props.style).gap !== undefined) {
      gaps.push(3 * (flat(element.props.style).gap as number));
    }
  });
  return { pad, labelLine, promptLine, gaps: gaps.reduce((sum, gap) => sum + gap, 0) };
}

/** Two prompt lines, four tiles of two lines each with their 4 px lip and 2 px borders, and the gaps between them. */
function lessonQuestion(children: React.ReactNode) {
  const { pad, labelLine, promptLine, gaps } = looks(children);
  return 2 * promptLine + 4 * (2 * pad + 2 * labelLine + 8) + gaps;
}

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
const wrongResult = { correct: false, correctLabel: lesson.choices[1].label, why: "Sahih al-Bukhari 2363." };

const face = (id: string) => {
  const tile = screen.getByTestId(`choice-${id}`, { includeHiddenElements: true });
  return flat(tile.children.map((child) => (typeof child === "string" ? {} : flat(child.props.style))).find((style) => style.borderWidth === 2));
};
const labelSize = (text: string) => flat(screen.getByText(text).props.style).fontSize;
const tileWrapper = (id: string) => {
  let node = screen.getByTestId(`choice-${id}`, { includeHiddenElements: true }).parent!;
  while (!node.props.onLayout) node = node.parent!;
  return node;
};
/** The space above the question: the scroll content's top padding past its usual 8. */
const topSpace = () => {
  let node = screen.getByTestId("exercise-prompt").parent!;
  while (!node.props.contentContainerStyle) node = node.parent!;
  return (flat(node.props.contentContainerStyle).paddingTop as number) - 8;
};
const lessonLook = () => ({
  padding: face("a").paddingVertical,
  label: labelSize(lesson.choices[0].label),
  prompt: labelSize(lesson.prompt),
  gap: flat(tileWrapper("a").props.style).marginBottom
});

describe("a question's fit takes its steps one at a time, only as far as it needs", () => {
  it("names the steps: tight tiles, then the smaller text, a smaller prompt, smaller gaps", () => {
    expect(FIT_STEPS).toBe(4);
    expect(fitLook(0)).toEqual({ tight: false, smallText: false, smallPrompt: false, smallGaps: false });
    expect(fitLook(1)).toEqual({ tight: true, smallText: false, smallPrompt: false, smallGaps: false });
    expect(fitLook(2)).toEqual({ tight: true, smallText: true, smallPrompt: false, smallGaps: false });
    expect(fitLook(4)).toEqual({ tight: true, smallText: true, smallPrompt: true, smallGaps: true });
  });

  it("stops at the first step that fits, keeps the usual look when none does, and ignores a stale measure", () => {
    const fresh: QuestionFit = { key: "q", step: 0, settled: false, overflow: false, drop: 0 };
    const measure = (step: number, bottom: number, extra: Partial<FitMeasure> = {}): FitMeasure => ({
      key: "q",
      step,
      now: true,
      room: 400,
      arrowRoom: 378,
      bottom,
      tightSaving: 24,
      ...extra
    });
    // Fits as it is.
    expect(nextFit(fresh, measure(0, 401))).toMatchObject({ step: 0, settled: true, overflow: false });
    // Tight tiles are lower by a known amount at least: decided without drawing them.
    expect(nextFit(fresh, measure(0, 420))).toMatchObject({ step: 1, settled: true });
    // Not enough: the next step is drawn and measured.
    const two = nextFit(fresh, measure(0, 460));
    expect(two).toMatchObject({ step: 1, settled: false });
    expect(nextFit(two, measure(1, 430))).toMatchObject({ step: 2, settled: false });
    expect(nextFit({ ...two, step: 2 }, measure(2, 399))).toMatchObject({ step: 2, settled: true });
    // A measure of another step or another try changes nothing.
    expect(nextFit(two, measure(0, 300))).toBe(two);
    expect(nextFit(two, { ...measure(1, 300), key: "other" })).toBe(two);
    // Too tall at the last step: back to the usual look, placed so the room's edge falls between two tiles.
    const tiles = [
      { top: 60, bottom: 160 },
      { top: 172, bottom: 272 },
      { top: 284, bottom: 384 },
      { top: 396, bottom: 496 }
    ];
    const last = { ...fresh, step: FIT_STEPS, usual: measure(0, 496, { tiles }) };
    expect(nextFit(last, measure(FIT_STEPS, 450))).toMatchObject({ step: 0, settled: true, overflow: true, drop: 378 - 284 });
    // Where only a report after the frame can say the size, tight tiles are the only step there is.
    expect(nextFit(fresh, measure(0, 460, { now: false }))).toMatchObject({ step: 0, settled: true, overflow: true });
  });

  it("finds how far down a question must sit so no tile in sight is cut", () => {
    const tiles = [
      { top: 60, bottom: 160 },
      { top: 172, bottom: 272 }
    ];
    // The edge at 200 cuts the second tile: it goes wholly below it.
    expect(wholeTilesDrop(tiles, 200)).toBe(28);
    // An edge in a gap, or one that only reaches a tile's lip, cuts nothing.
    expect(wholeTilesDrop(tiles, 166)).toBe(0);
    expect(wholeTilesDrop(tiles, 157)).toBe(0);
  });
});

describe("a lesson question too tall for its room is drawn whole from its first frame", () => {
  let room = 0;
  let restore: () => void = () => undefined;
  beforeEach(() => {
    restore = layoutEngine("exercise-room", () => room, "exercise-question", lessonQuestion);
  });
  afterEach(() => restore());

  // Drawn as usual the question's last tile ends at 8 + 412 - 12 = 408; tight, 360; with the smaller text too, 336; with
  // a smaller prompt too, 330; with smaller gaps too, 8 + 318 - 8 = 318.
  it("keeps the usual look on a question that fits", async () => {
    room = 407;
    await render(<ExerciseView {...lesson} />);
    expect(lessonLook()).toEqual({ padding: 12, label: 17, prompt: 19, gap: 12 });
  });

  it("draws tight tiles when they are enough", async () => {
    room = 380;
    await render(<ExerciseView {...lesson} />);
    expect(lessonLook()).toEqual({ padding: 6, label: 17, prompt: 19, gap: 12 });
  });

  it("adds the smaller text of long answers when tight tiles are not enough", async () => {
    room = 345;
    await render(<ExerciseView {...lesson} />);
    expect(lessonLook()).toEqual({ padding: 6, label: 15, prompt: 19, gap: 12 });
  });

  it("adds a smaller prompt across the full width next, then smaller gaps", async () => {
    room = 332;
    const { rerender } = await render(<ExerciseView key="prompt" {...lesson} />);
    expect(lessonLook()).toEqual({ padding: 6, label: 15, prompt: 17, gap: 12 });
    room = 325;
    await rerender(<ExerciseView key="gaps" {...lesson} />);
    expect(lessonLook()).toEqual({ padding: 6, label: 15, prompt: 17, gap: 8 });
    // No step draws text smaller than the app's smallest sizes, nor a tile under 44 px.
    expect(face("a").minHeight).toBeGreaterThanOrEqual(44);
  });

  it("keeps its usual look when even the last step is not enough, with the arrow up from the first frame", async () => {
    room = 300;
    await render(<ExerciseView {...lesson} />);
    expect(lessonLook()).toEqual({ padding: 12, label: 17, prompt: 19, gap: 12 });
    expect(screen.getByTestId("scroll-more")).toBeTruthy();
  });

  it("shows no arrow from the first frame on a question that fits once it took its steps", async () => {
    room = 325;
    await render(<ExerciseView {...lesson} />);
    expect(screen.queryByTestId("scroll-more")).toBeNull();
  });

  it("keeps its look through CHECK and the sheet, and measures the next try afresh", async () => {
    room = 345;
    const { rerender } = await render(<ExerciseView {...lesson} />);
    await rerender(<ExerciseView {...lesson} selectedChoiceId="a" result={wrongResult} />);
    expect(lessonLook()).toEqual({ padding: 6, label: 15, prompt: 19, gap: 12 });
    room = 407;
    await rerender(<ExerciseView {...lesson} attempt={1} />);
    expect(lessonLook()).toEqual({ padding: 12, label: 17, prompt: 19, gap: 12 });
  });

  it("keeps the arrow's room in the bar through CHECK, so the room shows nothing more of a hidden tile", async () => {
    room = 300;
    const { rerender } = await render(<ExerciseView {...lesson} />);
    expect(flat(screen.getByTestId("bar-hint-gap").props.style).height).toBe(SCROLL_HINT_ROOM);
    await rerender(<ExerciseView {...lesson} selectedChoiceId="a" result={wrongResult} />);
    expect(screen.queryByTestId("scroll-more")).toBeNull();
    expect(flat(screen.getByTestId("bar-hint-gap").props.style).height).toBe(SCROLL_HINT_ROOM);
  });
});

describe("a lesson question too tall even at the last step sits so every tile in sight is whole", () => {
  it("moves down until the room's edge (with the arrow's room) falls between two tiles", async () => {
    await render(<ExerciseView {...lesson} />);
    await fireEvent(screen.getByTestId("exercise-tiles"), "layout", layout(4 * 112, 60));
    for (const [index, choice] of lesson.choices.entries()) {
      await fireEvent(tileWrapper(choice.id), "layout", layout(100, index * 112));
    }
    await fireEvent(screen.getByTestId("exercise-room"), "layout", layout(384));
    // The last tile ends at 8 + 508 - 12 = 504; tight it would still end past the room's edge.
    await fireEvent(screen.getByTestId("exercise-question"), "layout", layout(508, 8));
    // With the arrow up the room ends at 384 - 22 = 362, through the third tile (8 + 60 + 224 = 292 to 392): the
    // question moves down 70, so that tile starts at the edge, wholly out of sight, and the two above it show whole.
    expect(topSpace()).toBe(362 - 292);
    expect(face("a").paddingVertical).toBe(12);
  });
});

describe("practice measures each question before its first frame and starts each one clean", () => {
  const daily = createFoundationAssessment(createEmptyLearnerProfile(), "daily_challenge");
  const base = FOUNDATION_QUESTION_BANK.find((entry) => entry.type === "multiple_choice" && (entry.options?.length ?? 0) === 4 && typeof entry.correctAnswer === "string")!;
  const options = ["Give it away", "Keep it hidden", "Say a kind word", "Walk away"];
  const question = { ...base, id: "fit-1", prompt: "What should you do first?", scenario: undefined, options, correctAnswer: options[2] };
  const next = { ...question, id: "fit-2", prompt: "Which one is kind?" };
  const state = (current: typeof question): FoundationAssessmentState => ({ ...daily, currentQuestion: current, answerHistory: [] });
  const handlers = { onChangeSelectedAnswer: jest.fn(), onSubmit: jest.fn(), onContinue: jest.fn(), onExit: jest.fn() };
  /** A tile's face: the box with the 2 px border, under the tile's wrapper. */
  const padding = (option: string) => {
    const found: Record<string, unknown>[] = [];
    const visit = (entry: ReturnType<typeof screen.getByTestId>) => {
      const style = flat(entry.props.style);
      if (style.borderWidth === 2) found.push(style);
      entry.children.forEach((child) => typeof child !== "string" && visit(child));
    };
    visit(screen.getByTestId(`assessment-tile-${option}`, { includeHiddenElements: true }));
    return found[0]?.paddingVertical;
  };
  /** A 30 px label, two prompt lines, four tiles of two lines with lip and borders, three gaps. */
  const practiceQuestion = (children: React.ReactNode) => {
    const { pad, labelLine, promptLine, gaps } = looks(children);
    return 30 + 2 * promptLine + 4 * (2 * pad + 2 * labelLine + 8) + gaps;
  };
  let room = 0;
  let restore: () => void = () => undefined;
  beforeEach(() => {
    restore = layoutEngine("assessment-scroll-box", () => room, "assessment-question", practiceQuestion);
  });
  afterEach(() => {
    restore();
    screen.unmount();
  });

  // Drawn as usual it is 30 + 52 + 312 + 30 = 424 tall; tight, 376; with the smaller text too, 352.
  it("draws tight tiles from the first frame when they make the question fit", async () => {
    room = 400;
    await render(<FoundationAssessmentScreen assessment={state(question)} language="en" selectedAnswer={undefined} {...handlers} />);
    options.forEach((option) => expect(padding(option)).toBe(6));
  });

  it("takes the next step when tight tiles are not enough, and keeps the usual tiles when nothing is", async () => {
    room = 360;
    const { rerender } = await render(<FoundationAssessmentScreen assessment={state(question)} language="en" selectedAnswer={undefined} {...handlers} />);
    options.forEach((option) => expect(padding(option)).toBe(6));
    expect(labelSize(options[0])).toBe(15);
    room = 250;
    await rerender(<FoundationAssessmentScreen assessment={state(next)} language="en" selectedAnswer={undefined} {...handlers} />);
    options.forEach((option) => expect(padding(option)).toBe(12));
    expect(labelSize(options[0])).toBe(17);
  });

  it("never shows the last question's arrow on the next one, nor takes its room", async () => {
    room = 300;
    const { rerender } = await render(<FoundationAssessmentScreen assessment={state(question)} language="en" selectedAnswer={undefined} {...handlers} />);
    // The question's scroll view says it holds more than it shows: the arrow is up.
    let scroller = screen.getByTestId("assessment-question").parent!;
    while (!scroller.props.onContentSizeChange) scroller = scroller.parent!;
    await fireEvent(scroller, "layout", layout(300));
    await fireEvent(scroller, "contentSizeChange", 288, 460);
    expect(screen.getByTestId("scroll-more")).toBeTruthy();
    const done = submitFoundationAssessmentAnswer({ profile: createEmptyLearnerProfile(), state: state(question), selectedAnswer: options[0], responseTimeMs: 3000 }).stateWithFeedback;
    await rerender(<FoundationAssessmentScreen assessment={done} language="en" selectedAnswer={options[0]} {...handlers} />);
    // The next question fits: no arrow in its first frame, before its scroll view says anything.
    room = 500;
    await rerender(<FoundationAssessmentScreen assessment={state(next)} language="en" selectedAnswer={undefined} {...handlers} />);
    expect(screen.queryByTestId("scroll-more")).toBeNull();
    expect(flat(screen.getByTestId("bar-hint-gap").props.style).height).toBe(16);
  });

  it("scrolls back to the top before the next question is drawn", async () => {
    room = 300;
    const scrollTo = jest.spyOn(ScrollView.prototype as unknown as { scrollTo: (options: object) => void }, "scrollTo");
    scrollTo.mockClear();
    const done = submitFoundationAssessmentAnswer({ profile: createEmptyLearnerProfile(), state: state(question), selectedAnswer: options[0], responseTimeMs: 3000 }).stateWithFeedback;
    // Back at the top in the commit that shows the next question (a layout effect), not after its first frame: a probe
    // after the screen reads, in that commit's layout effects, whether the scroll was already sent.
    let atTopInCommit: boolean | undefined;
    const Probe = ({ watch }: { watch: boolean }) => {
      React.useLayoutEffect(() => {
        if (watch && atTopInCommit === undefined) {
          atTopInCommit = scrollTo.mock.calls.some(([sent]) => (sent as { y: number }).y === 0 && (sent as { animated?: boolean }).animated === false);
        }
      });
      return null;
    };
    const { rerender } = await render(
      <>
        <FoundationAssessmentScreen assessment={done} language="en" selectedAnswer={options[0]} {...handlers} />
        <Probe watch={false} />
      </>
    );
    scrollTo.mockClear();
    await rerender(
      <>
        <FoundationAssessmentScreen assessment={state(next)} language="en" selectedAnswer={undefined} {...handlers} />
        <Probe watch />
      </>
    );
    expect(atTopInCommit).toBe(true);
    scrollTo.mockRestore();
  });
});

describe("right to left, the arrow and the tile text mirror", () => {
  it("centres the arrow across its whole gap, the same in both directions", async () => {
    await render(<ScrollHintGap visible onPress={jest.fn()} gap={16} />);
    const style = flat(screen.getByTestId("scroll-more").props.style);
    expect(style.left).toBe(0);
    expect(style.right).toBe(0);
    expect(style.alignItems).toBe("center");
    // No offset from a middle that only holds left to right (marginStart flips to the right edge in RTL).
    expect(style.marginStart).toBeUndefined();
    expect(style.marginLeft).toBeUndefined();
    expect(style.width).toBeUndefined();
  });

  it("starts a row tile's text where the line starts, left to right on the left and right to left on the right", async () => {
    // A number or a Latin word keeps its own direction (on the web its text is dir="auto"), so the tile sets the side
    // its lines start on: the left as before left to right, the right in Urdu and Arabic.
    await render(<ChoiceTile label="Zakat is 2.5%" testID="tile" />);
    expect(flat(screen.getByText("Zakat is 2.5%").props.style).textAlign).toBe("left");
    try {
      setActiveLanguage("ur");
      await render(<ChoiceTile label="27" testID="tile" />);
      expect(flat(screen.getByText("27").props.style).textAlign).toBe("right");
      await render(<ChoiceTile label="True" layout="square" testID="square" />);
      expect(flat(screen.getByText("True").props.style).textAlign).toBe("center");
    } finally {
      setActiveLanguage("en");
    }
  });
});

describe("after a wrong CHECK the sheet's top edge never cuts a line of the right answer", () => {
  const inset = Platform.OS === "ios" ? 30 : 16;
  /** The sheet reports its height (panel padding and inset included) from its content's layout. */
  const SHEET_PAD = 20 + 16;
  /** What a slim sheet saves: padding, the smaller button and the gap above it. */
  const SLIM_SAVES = 32;
  const sheetHeight = (height: number) => fireEvent(screen.getByTestId("feedback-content"), "layout", layout(height - SHEET_PAD - inset));
  /** A small phone: 320 x 568 (short: compact tiles, 8 px apart, and no mascot next to four answers). */
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
  const visible = (id: string) => screen.queryByTestId(id) !== null;
  const drawn = (id: string) => screen.queryByTestId(id, { includeHiddenElements: true }) !== null;

  describe("in lessons", () => {
    const TILE = 68;
    const GAP = 8;
    const result = { ...wrongResult, why: "Allah rewards kindness to every living thing." };
    /** The full sheet: title row, answer and pill (76), the gap, one Why line, the gap above the button, the button, padding. */
    const full = 40 + 76 + 8 + WHY_LINE + 16 + 58 + SHEET_PAD + inset;
    /** The least it can be: slim. */
    const least = full - SLIM_SAVES;

    // The prompt at 16 (39 tall), the tiles from 55, 76 apart: b, the green one, at 131-199 under a, or at 55-123 alone.
    // The question may scroll 8 px (to the prompt's top), so the room under b is the room's height less 199 (or 123).
    async function check(rootHeight: number, picked: string) {
      await render(<ExerciseView {...lesson} selectedChoiceId={picked} result={result} defaultWhyOpen />);
      await fireEvent(screen.getByTestId("exercise-view"), "layout", layout(rootHeight));
      await fireEvent(screen.getByTestId("exercise-prompt"), "layout", layout(39, 8));
      for (const [index, id] of ["a", "b", "c", "d"].entries()) {
        await fireEvent(tileWrapper(id), "layout", layout(TILE, index * (TILE + GAP)));
      }
      await fireEvent(screen.getByTestId("exercise-tiles"), "layout", layout(4 * TILE + 3 * GAP, 47));
      await fireEvent(screen.getByTestId("feedback-top"), "layout", layout(76));
      await fireEvent(screen.getByTestId("feedback-why-scroll"), "contentSizeChange", 288, WHY_LINE);
      await sheetHeight(full);
    }

    it("folds the picked tile away too when the sheet at its least has no room under the green tile otherwise", async () => {
      // Under a and b (the grey tiles folded) the room is 49 px short of the sheet's least; under b alone it has 27 to
      // spare: a folds, and the sheet's top (at 8 + 123) is under the green tile.
      await check(least + 150, "a");
      expect(drawn("choice-a")).toBe(false);
      expect(visible("choice-b")).toBe(true);
      expect(drawn("choice-c")).toBe(false);
      expect(drawn("choice-d")).toBe(false);
    });

    it("folds the picked tile away when that leaves the sheet's edge only in the green tile's lip and padding", async () => {
      // Under b alone the room is 13 px short of the sheet's least, but its top (at 8 + 110 = 118) is then only 5 px into
      // b (123), under its text: a folds and b stays, rather than b fading under a.
      await check(least + 110, "a");
      expect(drawn("choice-a")).toBe(false);
      expect(visible("choice-b")).toBe(true);
    });

    it("keeps the picked tile folded while the sheet is up, also once its Why line opens and the sheet grows", async () => {
      // The Why line shut: the sheet's least is slim; b alone leaves it 27 px to spare, so a folds.
      const shut = 40 + 76 + 16 + 58 + SHEET_PAD + inset;
      const rootHeight = shut - SLIM_SAVES + 150;
      await render(<ExerciseView {...lesson} selectedChoiceId="a" result={result} />);
      await fireEvent(screen.getByTestId("exercise-view"), "layout", layout(rootHeight));
      await fireEvent(screen.getByTestId("exercise-prompt"), "layout", layout(39, 8));
      for (const [index, id] of ["a", "b", "c", "d"].entries()) {
        await fireEvent(tileWrapper(id), "layout", layout(TILE, index * (TILE + GAP)));
      }
      await fireEvent(screen.getByTestId("exercise-tiles"), "layout", layout(4 * TILE + 3 * GAP, 47));
      await fireEvent(screen.getByTestId("feedback-top"), "layout", layout(76));
      await sheetHeight(shut);
      expect(drawn("choice-a")).toBe(false);
      expect(visible("choice-b")).toBe(true);
      // Its Why text five lines (as a long translated one wraps on a small phone): the least is now slim with one line
      // over the arrow's room, more than b alone leaves even with the edge in its padding. a stays folded all the same
      // (b does not move down under the sheet), and b, the edge reaching into its text, is gone while the sheet names it.
      await fireEvent.press(screen.getByTestId("feedback-why"));
      await fireEvent(screen.getByTestId("feedback-why-scroll"), "contentSizeChange", 288, 5 * WHY_LINE);
      await sheetHeight(40 + 76 + 8 + WHY_LINE + 38 + 50 + 20 + inset + 16);
      expect(drawn("choice-a")).toBe(false);
      expect(visible("choice-b")).toBe(false);
      expect(screen.getByTestId("feedback-answer")).toBeTruthy();
    });

    it("keeps the green tile when the sheet's edge reaches only its lip, border and padding, under its text", async () => {
      // The picked tile is under the green one, so folding it makes no room. The sheet at its least has its top at
      // 8 + 106 = 114: 9 px into b (123), less than the 15 px under a short phone's tile text.
      await check(least + 106, "c");
      expect(visible("choice-b")).toBe(true);
      expect(visible("choice-c")).toBe(false);
      expect(drawn("choice-c")).toBe(true);
    });

    it("fades the green tile (with every tile the edge would cut) when the edge would reach into its text", async () => {
      // The sheet's top at 8 + 91 = 99: 24 px into b. The sheet's "Correct answer" line names it.
      await check(least + 91, "c");
      expect(visible("choice-b")).toBe(false);
      expect(drawn("choice-b")).toBe(true);
      expect(visible("choice-c")).toBe(false);
      expect(screen.getByTestId("feedback-answer")).toBeTruthy();
    });

    // A True / False question with a prompt too long for the mascot, so the room is known at once. The row at 55-163;
    // the sheet at its least.
    const trueFalse = {
      ...lesson,
      kind: "true_false" as const,
      prompt: "True or false: the Prophet said that a kind word is charity, and that smiling at your brother's face is charity too.",
      choices: [
        { id: "true", label: "True" },
        { id: "false", label: "False" }
      ],
      correctChoiceId: "true"
    };
    async function checkTrueFalse(rootHeight: number) {
      expect(trueFalse.prompt.length).toBeGreaterThan(110);
      await render(<ExerciseView {...trueFalse} selectedChoiceId="false" result={{ ...result, correctLabel: "True" }} defaultWhyOpen />);
      await fireEvent(screen.getByTestId("exercise-view"), "layout", layout(rootHeight));
      await fireEvent(screen.getByTestId("exercise-prompt"), "layout", layout(39, 8));
      await fireEvent(screen.getByTestId("exercise-tiles"), "layout", layout(108, 47));
      await fireEvent(screen.getByTestId("feedback-top"), "layout", layout(76));
      await fireEvent(screen.getByTestId("feedback-why-scroll"), "contentSizeChange", 288, WHY_LINE);
      await sheetHeight(full);
    }

    it("fades the row of True and False when the edge would reach into its text", async () => {
      // The top at 8 + 121 = 129: 34 px into the row, past the 18 px under a square tile's text.
      await checkTrueFalse(least + 121);
      expect(visible("choice-true")).toBe(false);
      expect(visible("choice-false")).toBe(false);
      expect(drawn("choice-true")).toBe(true);
    });

    it("keeps the row of True and False when the edge reaches only its lip, border and padding", async () => {
      // At 8 + 142 = 150: 13 px into it.
      await checkTrueFalse(least + 142);
      expect(visible("choice-true")).toBe(true);
      expect(visible("choice-false")).toBe(true);
    });
  });

  describe("in practice", () => {
    const daily = createFoundationAssessment(createEmptyLearnerProfile(), "daily_challenge");
    const handlers = () => ({ onChangeSelectedAnswer: jest.fn(), onSubmit: jest.fn(), onContinue: jest.fn(), onExit: jest.fn() });
    const base = FOUNDATION_QUESTION_BANK.find((entry) => entry.type === "multiple_choice" && (entry.options?.length ?? 0) === 4 && typeof entry.correctAnswer === "string")!;
    const answer = base.correctAnswer as string;
    const others = (base.options ?? []).filter((option) => option !== answer);
    /** The right answer second, answered wrong with the first. */
    const question = { ...base, options: [others[0], answer, ...others.slice(1)] };
    const picked = others[0];
    const state: FoundationAssessmentState = { ...daily, currentQuestion: question };
    const checked = submitFoundationAssessmentAnswer({ profile: createEmptyLearnerProfile(), state, selectedAnswer: picked, responseTimeMs: 3000 }).stateWithFeedback;
    const tile = (option: string) => `assessment-tile-${option}`;
    /** The sheet with its Why line shut: title row, answer and pill, the gap above the button, the button, padding. */
    const full = 40 + 76 + 16 + 58 + SHEET_PAD + inset;
    const least = full - SLIM_SAVES;

    // The prompt at 38 (46 tall), the answers from 84, 64 apart: the right one at 148-202 under the picked one, or
    // at 84-138 alone. The question may scroll 30 px (to the prompt's top): the room under the right answer is the
    // room's height less 180 (or 116).
    async function check(room: number) {
      await render(<FoundationAssessmentScreen assessment={checked} language="en" selectedAnswer={picked} {...handlers()} />);
      await fireEvent(screen.getByTestId("assessment-scroll-box"), "layout", layout(room));
      await fireEvent(screen.getByTestId("assessment-prompt"), "layout", layout(46, 38));
      for (const [index, option] of question.options.entries()) {
        await fireEvent(screen.getByTestId(tile(option)), "layout", layout(54, index * 64));
      }
      await fireEvent(screen.getByTestId("assessment-answers"), "layout", layout(4 * 54 + 3 * 10, 84));
      await fireEvent(screen.getByTestId("feedback-top"), "layout", layout(76));
      await sheetHeight(full);
    }

    it("folds the picked answer away too when that alone gives the sheet at its least its room", async () => {
      // Under both, 44 px short of the sheet's least; under the right one alone, 20 to spare.
      await check(least + 136);
      expect(drawn(tile(picked))).toBe(false);
      expect(visible(tile(answer))).toBe(true);
      others.slice(1).forEach((option) => expect(drawn(tile(option))).toBe(false));
    });

    it("folds the picked answer away when that leaves the sheet's edge only in the right answer's lip and padding", async () => {
      // Under the right one alone 23 px short, but the sheet's top (at 30 + 93 = 123) is then 15 px into it, under its
      // text: the picked one folds and the right one stays, rather than the right one fading under the picked one.
      await check(least + 93);
      expect(drawn(tile(picked))).toBe(false);
      expect(visible(tile(answer))).toBe(true);
    });

    it("fades the right answer when nothing gives the sheet its room and its edge would reach into the text", async () => {
      // Under the right one alone 36 px short: the sheet's top at 30 + 80 = 110, 92 px into the right answer and 28 px
      // into the picked one above it, into its text too. Both are gone; the sheet says it was wrong and names the right one.
      await check(least + 80);
      expect(visible(tile(answer))).toBe(false);
      expect(drawn(tile(answer))).toBe(true);
      expect(visible(tile(picked))).toBe(false);
      expect(screen.getByTestId("feedback-answer")).toBeTruthy();
    });
  });

  it("lets a Why text scroll only when that makes the sheet shorter than slim with the whole text", async () => {
    const answer = "Kindness to any animal is rewarded.";
    const whyMax = () => flat(screen.getByTestId("feedback-why-scroll").props.style).maxHeight;
    const sheet = (why: string, maxHeight?: number) => <FeedbackSheet visible correct={false} correctLabel={answer} why={why} defaultWhyOpen onContinue={jest.fn()} maxHeight={maxHeight} />;
    const full = (lines: number) => 40 + 76 + 8 + lines * WHY_LINE + 16 + 58 + SHEET_PAD + inset;
    const { rerender } = await render(sheet("Two lines."));
    await fireEvent(screen.getByTestId("feedback-top"), "layout", layout(76));
    await fireEvent(screen.getByTestId("feedback-why-scroll"), "contentSizeChange", 288, 2 * WHY_LINE);
    // Under its room even slim: one line over the arrow's 38 px room would be taller than both lines whole, so it
    // stays slim with the whole text.
    await rerender(sheet("Two lines.", full(2) - SLIM_SAVES - 20));
    expect(whyMax()).toBeUndefined();
    // Three lines: one line that scrolls is shorter, so it scrolls.
    await rerender(sheet("Three lines of Why text.", full(3) - SLIM_SAVES - 20));
    await fireEvent(screen.getByTestId("feedback-why-scroll"), "contentSizeChange", 288, 3 * WHY_LINE);
    expect(whyMax()).toBe(WHY_LINE);
  });

  it("says the least the sheet can be: slim, and a Why text of several lines down to one line with the arrow's room", async () => {
    const least = jest.fn();
    const sheet = (why: string) => (
      <FeedbackSheet visible correct={false} correctLabel="Kindness to any animal is rewarded." why={why} defaultWhyOpen onContinue={jest.fn()} onLeastHeight={least} />
    );
    const { rerender } = await render(sheet("One line."));
    await fireEvent(screen.getByTestId("feedback-top"), "layout", layout(76));
    await fireEvent(screen.getByTestId("feedback-why-scroll"), "contentSizeChange", 288, WHY_LINE);
    const oneLine = 40 + 76 + 8 + WHY_LINE + 16 + 58 + SHEET_PAD + inset;
    expect(least).toHaveBeenLastCalledWith(oneLine - SLIM_SAVES);
    await rerender(sheet("Five lines of Why text, long enough to wrap and wrap again on a small phone, and then some more."));
    await fireEvent(screen.getByTestId("feedback-why-scroll"), "contentSizeChange", 288, 5 * WHY_LINE);
    // Slim (12 + 8 padding, the 50 px button) with one Why line and the arrow's 38 px room above the button.
    expect(least).toHaveBeenLastCalledWith(40 + 76 + 8 + WHY_LINE + 38 + 50 + 20 + inset);
  });
});
