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

import React from "react";
import { Dimensions, Platform, ScrollView, StyleSheet } from "react-native";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { FoundationAssessmentScreen } from "../components/FoundationLearning";
import { FOUNDATION_QUESTION_BANK } from "../data/foundationQuestionBank";
import { createEmptyLearnerProfile, createFoundationAssessment, submitFoundationAssessmentAnswer } from "../services/foundationAssessment";
import type { FoundationAssessmentState } from "../types";
import { ExerciseView } from "../ui/lesson";

const layout = (height: number, y = 0, width = 288) => ({ nativeEvent: { layout: { x: 0, y, width, height } } });
const flat = (style: unknown) => (StyleSheet.flatten(style as never) ?? {}) as Record<string, unknown>;
const inset = Platform.OS === "ios" ? 30 : 16;
/** The sheet reports its height (panel padding and inset included) from its content's layout. */
const SHEET_PAD = 20 + 16;
async function sheetHeight(height: number) {
  await fireEvent(screen.getByTestId("feedback-content"), "layout", layout(height - SHEET_PAD - inset));
}
/** The sheet with its Why line shut: title row, the answer and pill (76), the gap above the button, the button. */
const SHEET = 40 + 76 + 16 + 58 + SHEET_PAD + inset;
/** The scroll view mock's scrollTo is already a jest.fn shared by every test, so each test starts it afresh. */
function scrollSpy() {
  const spy = jest.spyOn(ScrollView.prototype as unknown as { scrollTo: (options: object) => void }, "scrollTo");
  spy.mockClear();
  return spy;
}
/** The last scroll the question made itself (the sheet's own lists start at their top, never animated). */
const lastQuestionScroll = (scrollTo: jest.SpyInstance) =>
  scrollTo.mock.calls.map(([options]) => options as { y: number; animated?: boolean }).filter((options) => options.animated !== false || options.y > 0).pop();

/** A small phone: 320 x 568. */
async function onSmallPhone(run: () => Promise<void>) {
  const window = Dimensions.get("window");
  const screenSize = Dimensions.get("screen");
  Dimensions.set({ window: { ...window, width: 320, height: 568 }, screen: { ...screenSize, width: 320, height: 568 } });
  try {
    await run();
  } finally {
    screen.unmount();
    Dimensions.set({ window, screen: screenSize });
  }
}

/** The question's scroll view, scrolled to `y` (found from a box inside it). */
async function scrolledTo(insideId: string, y: number) {
  let node = screen.getByTestId(insideId, { includeHiddenElements: true }).parent!;
  while (!node.props.onScroll) node = node.parent!;
  await fireEvent.scroll(node, { nativeEvent: { contentOffset: { x: 0, y }, contentSize: { width: 320, height: 900 }, layoutMeasurement: { width: 320, height: 400 } } });
}

const caliph = {
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
const result = { correct: false, correctLabel: caliph.choices[1].label, why: "He led the Muslims after the Prophet." };
const wrapper = (id: string) => {
  let node = screen.getByTestId(`choice-${id}`, { includeHiddenElements: true }).parent!;
  while (!node.props.onLayout) node = node.parent!;
  return node;
};
const cues = () => screen.getByTestId("exercise-cues", { includeHiddenElements: true });

/**
 * The second try of a review question on a 320 x 568 phone, checked: the chips (8-34), the prompt (42-81) and three
 * tiles under it, the green one second (the try turns the order to b, c, a). `sheet`: the height the sheet shows.
 * Their boxes are read inside the question block, which starts 8 down the scroll.
 */
async function checked(rootHeight: number, sheet = SHEET, props: Partial<React.ComponentProps<typeof ExerciseView>> = {}) {
  await render(<ExerciseView {...caliph} review attempt={1} selectedChoiceId="a" correctChoiceId="b" result={result} {...props} />);
  await fireEvent(screen.getByTestId("exercise-view"), "layout", layout(rootHeight));
  await fireEvent(cues(), "layout", layout(26, 0));
  await fireEvent(screen.getByTestId("exercise-prompt"), "layout", layout(39, 34));
  for (const [index, id] of ["b", "c", "a"].entries()) {
    await fireEvent(wrapper(id), "layout", layout(68, index * 76));
  }
  await fireEvent(screen.getByTestId("exercise-tiles"), "layout", layout(3 * 68 + 2 * 8, 73));
  await fireEvent(screen.getByTestId("feedback-top"), "layout", layout(76));
  await sheetHeight(sheet);
}

describe("the chips above the question are gone before the question's own scroll reaches them", () => {
  it("hides REVIEW and Try again! in the render that starts the scroll past their top, before any frame of it", async () => {
    await onSmallPhone(async () => {
      const scrollTo = scrollSpy();
      await checked(400);
      // The question scrolls up 17, past the chips' top (8): no scroll event has come yet, and they are already gone.
      expect(lastQuestionScroll(scrollTo)).toEqual(expect.objectContaining({ y: 17 }));
      expect(screen.queryByTestId("exercise-cues")).toBeNull();
      expect(flat(cues().props.style).opacity).toBe(0);
      expect(cues().props.pointerEvents).toBe("none");
      // The prompt stays.
      expect(screen.getByText("Who was the first caliph?")).toBeTruthy();
      scrollTo.mockRestore();
    });
  });

  it("stays gone on the way, and shows them again once the scroll passed them and comes back up to them", async () => {
    await onSmallPhone(async () => {
      await checked(400);
      await scrolledTo("exercise-cues", 5);
      expect(screen.queryByTestId("exercise-cues")).toBeNull();
      await scrolledTo("exercise-cues", 17);
      expect(screen.queryByTestId("exercise-cues")).toBeNull();
      // Scrolled back up by hand: they show again, so no gap is left above the prompt.
      await scrolledTo("exercise-cues", 0);
      expect(screen.getByTestId("exercise-cues")).toBeTruthy();
    });
  });

  it("shows them again when a hand takes over before the scroll passed them", async () => {
    await onSmallPhone(async () => {
      await checked(400);
      await scrolledTo("exercise-cues", 5);
      expect(screen.queryByTestId("exercise-cues")).toBeNull();
      // It turns back up: a hand took over, and nothing cuts them where it is.
      await scrolledTo("exercise-cues", 3);
      expect(screen.getByTestId("exercise-cues")).toBeTruthy();
    });
  });

  it("shows them again when the scroll stops short of them", async () => {
    await onSmallPhone(async () => {
      await checked(400);
      await scrolledTo("exercise-cues", 6);
      // The same place again (the scroll's end): it stopped there, short of their top.
      await scrolledTo("exercise-cues", 6);
      expect(screen.getByTestId("exercise-cues")).toBeTruthy();
    });
  });

  it("keeps them when the question's own scroll stays above their top", async () => {
    await onSmallPhone(async () => {
      const scrollTo = scrollSpy();
      // A sheet that fits under the green tile: no scroll at all.
      await checked(520);
      expect(lastQuestionScroll(scrollTo)).toEqual(expect.objectContaining({ y: 0 }));
      expect(screen.getByTestId("exercise-cues")).toBeTruthy();
      expect(flat(cues().props.style).opacity).not.toBe(0);
      scrollTo.mockRestore();
    });
  });
});

describe("a taller sheet (its Why line opening) moves the question in the same frame", () => {
  it("scrolls at once when the learner opens Why and the sheet grows, the chips gone in that render; a shorter sheet glides back", async () => {
    await onSmallPhone(async () => {
      const scrollTo = scrollSpy();
      // The sheet fits whole under the green tile (81-149): the question stays at the top, the chips show.
      await checked(440);
      expect(lastQuestionScroll(scrollTo)).toEqual({ y: 0, animated: true });
      expect(screen.getByTestId("exercise-cues")).toBeTruthy();
      // The learner opens the Why line: 50 taller. The question jumps the 27 it needs in the frame the sheet grows,
      // not after it.
      await fireEvent.press(screen.getByTestId("feedback-why"));
      await sheetHeight(SHEET + 50);
      expect(lastQuestionScroll(scrollTo)).toEqual({ y: 27, animated: false });
      expect(screen.queryByTestId("exercise-cues")).toBeNull();
      expect(screen.getByTestId("choice-b")).toBeTruthy();
      // It shuts again: the question glides back down, and the chips come back once it is above them.
      await sheetHeight(SHEET);
      expect(lastQuestionScroll(scrollTo)).toEqual({ y: 0, animated: true });
      await scrolledTo("exercise-cues", 8);
      expect(screen.getByTestId("exercise-cues")).toBeTruthy();
      scrollTo.mockRestore();
    });
  });

  it("makes the question give its room as soon as the sheet shows taller than that room, before it says its full height", async () => {
    await onSmallPhone(async () => {
      // The Why line is open, but its text has not said its height yet: the sheet's full height still counts it as
      // empty (and fits the room under the green tile, 317), while the sheet already shows 340 tall.
      await checked(440, 340, { defaultWhyOpen: true });
      // The grey tile folds away at once; the picked one and the green one stay.
      expect(screen.queryByTestId("choice-c", { includeHiddenElements: true })).toBeNull();
      expect(screen.getByTestId("choice-b")).toBeTruthy();
      expect(screen.getByTestId("choice-a", { includeHiddenElements: true })).toBeTruthy();
    });
  });
});

/** The question's scroll view (found from a box inside it). */
function questionScroll(insideId: string) {
  let node = screen.getByTestId(insideId, { includeHiddenElements: true }).parent!;
  while (!node.props.onScroll) node = node.parent!;
  return node;
}
/** The scrolls the question made itself, in order. */
const questionScrolls = (scrollTo: jest.SpyInstance) =>
  scrollTo.mock.calls.map(([options]) => options as { y: number; animated?: boolean }).filter((options) => options.animated !== false || options.y > 0);

describe("the question's own scroll goes where it ends, never past it and back", () => {
  it("glides when the sheet grows as it comes up (the learner did not open Why)", async () => {
    await onSmallPhone(async () => {
      const scrollTo = scrollSpy();
      await checked(440);
      expect(lastQuestionScroll(scrollTo)).toEqual({ y: 0, animated: true });
      // The sheet says a taller height while it is still coming up: the question glides there with it.
      await sheetHeight(SHEET + 50);
      expect(lastQuestionScroll(scrollTo)).toEqual({ y: 27, animated: true });
      scrollTo.mockRestore();
    });
  });

  it("holds the sheet to its room at once when only grey tiles fold, and moves the question in that same render", async () => {
    await onSmallPhone(async () => {
      const scrollTo = scrollSpy();
      await checked(440);
      // The learner opens the Why line, four lines long: 348 tall in full, more than the 317 under the green tile.
      await fireEvent.press(screen.getByTestId("feedback-why"));
      await fireEvent(screen.getByTestId("feedback-why-scroll"), "contentSizeChange", 288, 84);
      // The grey tile folds away. Where the green tile then sits is known from the tiles' heights, so the sheet goes
      // slim to fit (316) without waiting for the tiles to say where they now sit.
      expect(screen.queryByTestId("choice-c", { includeHiddenElements: true })).toBeNull();
      expect(flat((screen.getByTestId("feedback-sheet").children[0] as unknown as { props: { style: object } }).props.style).paddingTop).toBe(12);
      // A slim sheet's padding is 12 + 8.
      await fireEvent(screen.getByTestId("feedback-content"), "layout", layout(SHEET + 8 + 84 - 32 - 20 - inset));
      // The question moves the 34 it may (to the prompt's top, never past it) in that same render.
      expect(lastQuestionScroll(scrollTo)).toEqual({ y: 34, animated: false });
      expect(questionScrolls(scrollTo).filter((options) => options.y > 0)).toHaveLength(1);
      scrollTo.mockRestore();
    });
  });

  it("waits while the mascot hides, then scrolls once to the place the squeezed question gives", async () => {
    await onSmallPhone(async () => {
      const scrollTo = scrollSpy();
      const tf = {
        ...caliph,
        kind: "true_false" as const,
        prompt: "Abu Bakr was the first caliph.",
        choices: [
          { id: "true", label: "True" },
          { id: "false", label: "False" }
        ]
      };
      const wrong = { correct: false, correctLabel: "True", why: "He led the Muslims after the Prophet." };
      await render(<ExerciseView {...tf} review attempt={1} selectedChoiceId="false" correctChoiceId="true" result={wrong} defaultWhyOpen />);
      expect(screen.getByTestId("mascot")).toBeTruthy();
      await fireEvent(screen.getByTestId("exercise-view"), "layout", layout(500));
      // The chips (8-34) and, with the mascot, the prompt as a bubble 140 tall (42-182); the True / False row (108) sits
      // right under it. Read inside the question block, which starts 8 down the scroll.
      await fireEvent(cues(), "layout", layout(26, 0));
      await fireEvent(screen.getByTestId("exercise-prompt"), "layout", layout(140, 34));
      await fireEvent(screen.getByTestId("exercise-tiles"), "layout", layout(108, 174));
      await fireEvent(screen.getByTestId("feedback-top"), "layout", layout(76));
      await fireEvent(screen.getByTestId("feedback-why-scroll"), "contentSizeChange", 288, 42);
      // 306 tall in full, and only 236 under the row: the mascot hides, and the place the question would scroll to
      // with the old layout (34) is not where it ends. It stays where it is.
      await sheetHeight(SHEET + 8 + 42);
      expect(screen.queryByTestId("mascot")).toBeNull();
      expect(questionScrolls(scrollTo).filter((options) => options.y > 0)).toEqual([]);
      // The prompt takes the full width: two lines. The row now ends at 196, so the question goes 14, once.
      await fireEvent(screen.getByTestId("exercise-prompt"), "layout", layout(46, 34));
      expect(questionScrolls(scrollTo).filter((options) => options.y > 0)).toEqual([{ y: 14, animated: true }]);
      scrollTo.mockRestore();
    });
  });

  it("keeps the question's content long enough for the place it sits at until it is back where it goes", async () => {
    await onSmallPhone(async () => {
      await checked(440);
      await fireEvent.press(screen.getByTestId("feedback-why"));
      await sheetHeight(SHEET + 50);
      await scrolledTo("exercise-prompt", 27);
      const minHeight = () => flat(questionScroll("exercise-prompt").props.contentContainerStyle).minHeight;
      expect(minHeight()).toBe(440 + 27);
      // The Why line shuts: the sheet is shorter at once, but the content never is while the question glides back
      // down, or the browser would pull it up to the new end at once.
      await fireEvent.press(screen.getByTestId("feedback-why"));
      await sheetHeight(SHEET);
      expect(minHeight()).toBe(440 + 27);
      await scrolledTo("exercise-prompt", 12);
      expect(minHeight()).toBe(440 + 12);
      await scrolledTo("exercise-prompt", 0);
      expect(minHeight()).toBe(440);
    });
  });
});

describe("a tile the sheet will cover is gone at once", () => {
  it("is drawn at 0 in the render that hides it, out of reach of taps and screen readers, and shows for the next try", async () => {
    await onSmallPhone(async () => {
      await checked(400);
      // Under the green tile and the sheet's top edge: gone, not fading on its way out while the edge comes up over it.
      expect(screen.queryByTestId("choice-a")).toBeNull();
      expect(flat(wrapper("a").props.style).opacity).toBe(0);
      expect(wrapper("a").props.pointerEvents).toBe("none");
      expect(screen.getByTestId("choice-b")).toBeTruthy();
      // The next try shows every tile again.
      await screen.rerender(<ExerciseView {...caliph} attempt={2} />);
      ["a", "b", "c"].forEach((id) => expect(screen.getByTestId(`choice-${id}`)).toBeTruthy());
    });
  });
});

/** The space above the question: the scroll content's top padding past its usual 8. */
const centerGap = () => (flat(questionScroll("exercise-prompt").props.contentContainerStyle).paddingTop as number) - 8;

/**
 * The same question as `checked`, with room enough on a 320 x 568 phone to sit in the middle (440 tall, the block
 * 293): it is laid out unchecked, moved down 57, then checked.
 */
async function centeredChecked() {
  await render(<ExerciseView {...caliph} review attempt={1} selectedChoiceId="a" correctChoiceId="b" />);
  await fireEvent(screen.getByTestId("exercise-view"), "layout", layout(440));
  await fireEvent(screen.getByTestId("exercise-view").children[0] as unknown as Parameters<typeof fireEvent>[0], "layout", layout(440));
  await fireEvent(cues(), "layout", layout(26, 0));
  await fireEvent(screen.getByTestId("exercise-prompt"), "layout", layout(39, 34));
  for (const [index, id] of ["b", "c", "a"].entries()) {
    await fireEvent(wrapper(id), "layout", layout(68, index * 76));
  }
  await fireEvent(screen.getByTestId("exercise-tiles"), "layout", layout(3 * 68 + 2 * 8, 73));
  let block = screen.getByTestId("exercise-prompt").parent!;
  while (!block.props.onLayout) block = block.parent!;
  await fireEvent(block, "layout", layout(73 + 3 * 68 + 2 * 8, 8));
  await fireEvent(questionScroll("exercise-prompt"), "contentSizeChange", 288, 440);
  // (440 - (8 + 293) - 24) / 2: the chips now start at 65, the prompt at 99 and the green tile at 138.
  expect(centerGap()).toBe(57);
  await screen.rerender(<ExerciseView {...caliph} review attempt={1} selectedChoiceId="a" correctChoiceId="b" result={result} />);
  await fireEvent(screen.getByTestId("feedback-top"), "layout", layout(76));
  await sheetHeight(SHEET);
}

describe("a question moved down to the middle", () => {
  it("keeps its chips until the scroll passes their real place, the space above the question included", async () => {
    await onSmallPhone(async () => {
      const scrollTo = scrollSpy();
      await centeredChecked();
      // The question stays where it is through CHECK, and scrolls up only 34: short of the chips' top (65).
      expect(centerGap()).toBe(57);
      expect(lastQuestionScroll(scrollTo)).toEqual({ y: 34, animated: true });
      expect(screen.getByTestId("exercise-cues")).toBeTruthy();
      await scrolledTo("exercise-cues", 34);
      expect(screen.getByTestId("exercise-cues")).toBeTruthy();
      // The Why line opens, 50 taller: the question goes 84, past the chips' top, and they are gone in that render.
      await fireEvent.press(screen.getByTestId("feedback-why"));
      await sheetHeight(SHEET + 50);
      expect(lastQuestionScroll(scrollTo)).toEqual({ y: 84, animated: false });
      expect(screen.queryByTestId("exercise-cues")).toBeNull();
      expect(screen.getByText("Who was the first caliph?")).toBeTruthy();
      scrollTo.mockRestore();
    });
  });

  it("goes on to its place once its content says it has grown, when the scroll stopped at the old end", async () => {
    await onSmallPhone(async () => {
      const scrollTo = scrollSpy();
      await centeredChecked();
      const moves = () => questionScrolls(scrollTo).filter((options) => options.y > 0);
      expect(moves()).toEqual([{ y: 34, animated: true }]);
      // A phone ran the scroll before it laid out the room under the question, so it stayed at 0. The content then
      // says it is longer: the question glides on to the same place.
      await fireEvent(questionScroll("exercise-prompt"), "contentSizeChange", 288, 440 + 34 + 120);
      expect(moves()).toEqual([
        { y: 34, animated: true },
        { y: 34, animated: true }
      ]);
      // There, it is not sent again.
      await scrolledTo("exercise-prompt", 34);
      await fireEvent(questionScroll("exercise-prompt"), "contentSizeChange", 288, 440 + 34 + 160);
      expect(moves()).toHaveLength(2);
      scrollTo.mockRestore();
    });
  });

  it("never fights a hand that turned it back, however its content grows", async () => {
    await onSmallPhone(async () => {
      const scrollTo = scrollSpy();
      await centeredChecked();
      await scrolledTo("exercise-prompt", 20);
      // Back up by hand, short of its place.
      await scrolledTo("exercise-prompt", 10);
      await fireEvent(questionScroll("exercise-prompt"), "contentSizeChange", 288, 440 + 34 + 120);
      expect(questionScrolls(scrollTo).filter((options) => options.y > 0)).toEqual([{ y: 34, animated: true }]);
      scrollTo.mockRestore();
    });
  });
});

describe("practice's topic label is gone before the question's own scroll reaches it", () => {
  it("hides the label in the render that starts the scroll past its top, and shows it again scrolled back up", async () => {
    const daily = createFoundationAssessment(createEmptyLearnerProfile(), "daily_challenge");
    const base = FOUNDATION_QUESTION_BANK.find((entry) => entry.type === "multiple_choice" && (entry.options?.length ?? 0) === 4 && typeof entry.correctAnswer === "string")!;
    const answer = base.correctAnswer as string;
    const others = (base.options ?? []).filter((option) => option !== answer);
    const question = { ...base, options: [others[0], answer, ...others.slice(1)] };
    const state: FoundationAssessmentState = { ...daily, currentQuestion: question };
    const done = submitFoundationAssessmentAnswer({ profile: createEmptyLearnerProfile(), state, selectedAnswer: others[0], responseTimeMs: 3000 }).stateWithFeedback;
    const handlers = { onChangeSelectedAnswer: jest.fn(), onSubmit: jest.fn(), onContinue: jest.fn(), onExit: jest.fn() };
    const scrollTo = scrollSpy();
    await render(<FoundationAssessmentScreen assessment={done} language="en" selectedAnswer={others[0]} {...handlers} />);
    // Room enough under the two tiles for the whole sheet, so nothing is squeezed, but only with the question scrolled.
    await fireEvent(screen.getByTestId("assessment-scroll-box"), "layout", layout(440));
    await fireEvent(screen.getByTestId("assessment-label", { includeHiddenElements: true }), "layout", layout(30, 0));
    await fireEvent(screen.getByTestId("assessment-prompt"), "layout", layout(46, 38));
    for (const [index, option] of question.options.entries()) {
      await fireEvent(screen.getByTestId(`assessment-tile-${option}`, { includeHiddenElements: true }), "layout", layout(54, index * 64));
    }
    await fireEvent(screen.getByTestId("assessment-answers"), "layout", layout(4 * 54 + 3 * 10, 84));
    await fireEvent(screen.getByTestId("feedback-top"), "layout", layout(76));
    await sheetHeight(SHEET);
    // The question scrolls itself past the label's top (0): it is gone before any frame of that scroll.
    expect(lastQuestionScroll(scrollTo)?.y).toBeGreaterThan(0.5);
    expect(screen.queryByTestId("assessment-label")).toBeNull();
    expect(screen.getByTestId("assessment-prompt")).toBeTruthy();
    await scrolledTo("assessment-label", lastQuestionScroll(scrollTo)!.y);
    expect(screen.queryByTestId("assessment-label")).toBeNull();
    // Scrolled back up by hand: it shows again.
    await scrolledTo("assessment-label", 0);
    expect(screen.getByTestId("assessment-label")).toBeTruthy();
    scrollTo.mockRestore();
    screen.unmount();
  });
});
