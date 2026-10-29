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

// The counting numbers animate on timers; render them as plain text here, formatted as the real one is.
jest.mock("../ui/screens/FormattedCount", () => {
  const actual = jest.requireActual("../ui/screens/FormattedCount");
  const { Text } = jest.requireActual("react-native");
  const { createElement } = jest.requireActual("react");
  return {
    ...actual,
    FormattedCount: ({ value, style, compact, testID }: { value: number; style?: object; compact?: boolean; testID?: string }) =>
      createElement(Text, { style, testID }, compact ? actual.compactNumber(value) : actual.formatNumber(value))
  };
});

import React from "react";
import { Dimensions, Platform, ScrollView, StyleSheet, View } from "react-native";
import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react-native";
import { FoundationAssessmentScreen } from "../components/FoundationLearning";
import { COURSE } from "../data/course";
import { FOUNDATION_QUESTION_BANK } from "../data/foundationQuestionBank";
import { getUiStrings } from "../i18n";
import { playGameSound } from "../services/gameAudio";
import { createEmptyLearnerProfile, createFoundationAssessment, submitFoundationAssessmentAnswer } from "../services/foundationAssessment";
import type { FoundationAssessmentState, LearningSection } from "../types";
import { ChoiceTile, tightSaving } from "../ui/ChoiceTile";
import { ExerciseView, FeedbackSheet, LessonComplete, OrderGame } from "../ui/lesson";
import { WHY_LINE } from "../ui/lesson/FeedbackSheet";
import { nearestRowStop, nextRowStop, overRoom, tilesUnderSheet, wholeRows, type RowSpan } from "../ui/lesson/sheetFit";
import { AppTopBar, ShopView, StreakSheet } from "../ui/screens";
import { statValueSize } from "../ui/screens/ProfileView";
import { SHOP_ITEMS_WITH_GEMS, makeUser } from "./testUtils";

const layout = (height: number, y = 0, width = 288) => ({ nativeEvent: { layout: { x: 0, y, width, height } } });
const flat = (style: unknown) => (StyleSheet.flatten(style as never) ?? {}) as Record<string, unknown>;
const inset = Platform.OS === "ios" ? 30 : 16;
/** The sheet reports its height (panel padding and inset included) from its content's layout. */
const SHEET_PAD = 20 + 16;
async function sheetHeight(height: number) {
  await fireEvent(screen.getByTestId("feedback-content"), "layout", layout(height - SHEET_PAD - inset));
}
const scrollSpy = () => jest.spyOn(ScrollView.prototype as unknown as { scrollTo: (options: object) => void }, "scrollTo");

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

const STEPS = ["Opening takbir", "Stand and recite", "Ruku, then stand", "Two sujud", "Stand for rak'ah 2", "Ruku again", "Two sujud again", "Tashahhud", "Taslim"];
/** Nine one-line rows, 20 tall, 4 apart. */
const ROW = 20;
const ROW_GAP = 4;

describe("the correct-order list shows whole rows only, as the Why text shows whole lines", () => {
  const sheet = { visible: true, correct: false, title: "Correct order:", correctList: STEPS, buttonLabel: "Try again", onContinue: jest.fn() };
  async function placeRows() {
    for (const index of STEPS.keys()) {
      await fireEvent(screen.getByTestId(`feedback-row-${index}`), "layout", layout(ROW, index * (ROW + ROW_GAP)));
    }
    await fireEvent(screen.getByTestId("feedback-list"), "layout", layout(STEPS.length * (ROW + ROW_GAP) - ROW_GAP));
  }

  it("sizes the part that scrolls to whole rows, starts at the top and pages by whole rows, the arrow turning up at the end", async () => {
    await onSmallPhone(async () => {
      const scrollTo = scrollSpy();
      await render(<FeedbackSheet {...sheet} />);
      await placeRows();
      const body = screen.getByTestId("feedback-body");
      // 9 rows are 212 tall; there is room for 7 whole rows (164), never a row cut by the bottom edge.
      expect(flat(body.props.style).maxHeight).toBe(7 * (ROW + ROW_GAP) - ROW_GAP);
      expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ y: 0 }));
      await fireEvent(body, "layout", layout(164));
      await fireEvent(body, "contentSizeChange", 288, 212);
      const more = screen.getByTestId("feedback-more");
      // A page down brings row 3 to the top: rows 3 to 9 show whole, none hides under the heading.
      scrollTo.mockClear();
      await fireEvent.press(within(more).getByLabelText("Scroll down"));
      expect(scrollTo).toHaveBeenLastCalledWith(expect.objectContaining({ y: 2 * (ROW + ROW_GAP) }));
      await fireEvent.scroll(body, { nativeEvent: { contentOffset: { x: 0, y: 48 }, contentSize: { width: 288, height: 212 }, layoutMeasurement: { width: 288, height: 164 } } });
      expect(screen.queryByTestId("feedback-more")).toBeNull();
      await fireEvent.press(within(screen.getByTestId("feedback-more-up")).getByLabelText("Scroll up"));
      expect(scrollTo).toHaveBeenLastCalledWith(expect.objectContaining({ y: 0 }));
      scrollTo.mockRestore();
    });
  });

  it("opens again at the top of the list, with the arrow pointing down", async () => {
    await onSmallPhone(async () => {
      const { rerender } = await render(<FeedbackSheet {...sheet} />);
      await placeRows();
      const body = screen.getByTestId("feedback-body");
      await fireEvent(body, "layout", layout(164));
      await fireEvent(body, "contentSizeChange", 288, 212);
      await fireEvent.scroll(body, { nativeEvent: { contentOffset: { x: 0, y: 48 }, contentSize: { width: 288, height: 212 }, layoutMeasurement: { width: 288, height: 164 } } });
      expect(screen.getByTestId("feedback-more-up")).toBeTruthy();
      const scrollTo = scrollSpy();
      await rerender(<FeedbackSheet {...sheet} visible={false} />);
      await rerender(<FeedbackSheet {...sheet} />);
      expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ y: 0, animated: false }));
      expect(screen.getByTestId("feedback-more")).toBeTruthy();
      expect(screen.queryByTestId("feedback-more-up")).toBeNull();
      scrollTo.mockRestore();
    });
  });

  it("stops only where every row shows whole, also when rows wrap to two lines", () => {
    // Rows of one or two lines (20 or 40 tall), 4 apart, in many mixes.
    for (let seed = 1; seed <= 60; seed += 1) {
      const rows: RowSpan[] = [];
      let top = 0;
      for (let index = 0; index < 9; index += 1) {
        const height = (seed * (index + 3)) % 3 === 0 ? 40 : 20;
        rows.push({ top, bottom: top + height });
        top += height + ROW_GAP;
      }
      const end = rows[rows.length - 1].bottom;
      const limit = 100 + (seed % 5) * 13;
      const window = wholeRows(rows, end, limit)!;
      expect(window.viewport).toBeLessThanOrEqual(limit);
      const cuts = (y: number) => rows.some((row) => row.top < y - 0.5 && y + 0.5 < row.bottom);
      for (const stop of window.stops) {
        expect(cuts(stop)).toBe(false);
        expect(cuts(stop + window.viewport)).toBe(false);
      }
      // The last stop is the end of the scroll: the room added under the last row makes it so.
      expect(window.stops[window.stops.length - 1]).toBe(window.end);
      expect(end + window.pad - window.viewport).toBe(window.end);
      // Every page down moves on, and reaches the end.
      let offset = 0;
      for (let page = 0; page < 12 && offset < window.end; page += 1) {
        const next = nextRowStop(window.stops, rows, offset, window.viewport);
        expect(next).toBeGreaterThan(offset);
        offset = next;
      }
      expect(offset).toBe(window.end);
      // A drag that stops between rows settles on a stop.
      expect(window.stops).toContain(nearestRowStop(window.stops, 11));
    }
  });

  it("needs no scrolling (and no arrow) when the list fits", () => {
    expect(wholeRows([{ top: 0, bottom: 20 }, { top: 24, bottom: 44 }], 44, 100)).toBeUndefined();
  });
});

describe("the ordering game keeps its prompt on screen and folds away the steps the sheet would cut", () => {
  const options = STEPS.map((label, index) => ({ id: `s${index + 1}`, label }));
  const ids = options.map((option) => option.id);
  // Steps 7 and 8 swapped: TRY AGAIN keeps the first six.
  const placed = [...ids.slice(0, 6), ids[7], ids[6], ids[8]];
  const game = { title: "Salah", prompt: "Put Fajr's two rak'ahs in order!", options, correctOrderIds: ids, mascotVariant: "boy", accent: "#21B573", onDone: jest.fn() };
  const CELL = 50;
  const CELL_STEP = 52;

  /** 320 x 568: the steps sit in two columns; the lesson screen under the header is 508 tall. */
  async function layOut() {
    await fireEvent(screen.getByTestId("order-game"), "layout", layout(508));
    await fireEvent(screen.getByTestId("order-prompt"), "layout", layout(39, 8));
    for (const [index, id] of placed.entries()) {
      await fireEvent(screen.getByTestId(`order-cell-${id}`), "layout", layout(CELL, 4 + Math.floor(index / 2) * CELL_STEP, 140));
    }
    await fireEvent(screen.getByTestId("order-answer"), "layout", layout(8 + 5 * CELL_STEP, 47));
  }

  it("never scrolls the prompt away; the steps under the sheet's top edge fold away until TRY AGAIN", async () => {
    await onSmallPhone(async () => {
      const scrollTo = scrollSpy();
      await render(<OrderGame {...game} initialPlacedIds={placed} initialChecked />);
      await layOut();
      // A sheet 320 tall: its top is at 188, through the third row of steps.
      await sheetHeight(320);
      // The answer box is too tall to sit above the sheet, but the question stays at the top: the prompt shows.
      expect(scrollTo).toHaveBeenLastCalledWith(expect.objectContaining({ y: 0 }));
      expect(scrollTo).not.toHaveBeenCalledWith(expect.objectContaining({ y: 39 }));
      // The first two rows sit wholly above the sheet; the third row and all after it fold away.
      await waitFor(() => expect(screen.queryByTestId(`order-placed-${placed[4]}`)).toBeNull());
      placed.slice(0, 4).forEach((id) => expect(screen.getByTestId(`order-placed-${id}`)).toBeTruthy());
      placed.slice(4).forEach((id) => expect(screen.queryByTestId(`order-placed-${id}`)).toBeNull());
      expect(screen.getByText("Put Fajr's two rak'ahs in order!")).toBeTruthy();
      // TRY AGAIN keeps the six steps that were right, every one of them back on screen.
      await fireEvent.press(screen.getByTestId("feedback-continue"));
      ids.slice(0, 6).forEach((id) => expect(screen.getByTestId(`order-placed-${id}`)).toBeTruthy());
      scrollTo.mockRestore();
    });
  });

  it("keeps every step when the sheet leaves room for all of them (a tall phone)", async () => {
    await render(<OrderGame {...game} initialPlacedIds={placed} initialChecked />);
    await fireEvent(screen.getByTestId("order-game"), "layout", layout(784));
    await fireEvent(screen.getByTestId("order-prompt"), "layout", layout(120, 8));
    for (const [index, id] of placed.entries()) {
      await fireEvent(screen.getByTestId(`order-cell-${id}`), "layout", layout(54, 8 + index * 58));
    }
    await fireEvent(screen.getByTestId("order-answer"), "layout", layout(16 + 9 * 58, 128));
    // The sheet's top at 784 - 120 = 664, under the last step (128 + 8 + 8 * 58 + 54 = 654).
    await sheetHeight(120);
    // Past the moment the sheet takes to settle.
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
    });
    placed.forEach((id) => expect(screen.getByTestId(`order-placed-${id}`)).toBeTruthy());
  });
});

describe("a tile the sheet's top edge would cut fades away, in lessons", () => {
  const four = {
    kind: "multiple_choice" as const,
    prompt: "What is Ayyub known for?",
    choices: [
      { id: "a", label: "He built the Ark before the flood" },
      { id: "b", label: "He stayed patient through illness" },
      { id: "c", label: "He was swallowed by a big fish" },
      { id: "d", label: "He was thrown into a fire" }
    ],
    mascotVariant: "boy",
    accent: "#21B573",
    onSelect: jest.fn(),
    onCheck: jest.fn(),
    onContinue: jest.fn()
  };
  const TILE = 68;
  const GAP = 12;
  const result = { correct: false, correctLabel: four.choices[1].label, why: "Allah tested him, and he kept praying to Him." };
  const wrapper = (id: string) => {
    let node = screen.getByTestId(`choice-${id}`, { includeHiddenElements: true }).parent!;
    while (!node.props.onLayout) node = node.parent!;
    return node;
  };
  /** The full sheet: title row, the answer and pill (76), the gap, one Why line, the gap above the button, the button, padding. */
  const full = 40 + 76 + 8 + WHY_LINE + 16 + 58 + SHEET_PAD + inset;

  async function check(rootHeight: number, picked: string) {
    const view = await render(<ExerciseView {...four} selectedChoiceId={picked} correctChoiceId="b" result={result} defaultWhyOpen />);
    await fireEvent(screen.getByTestId("exercise-view"), "layout", layout(rootHeight));
    await fireEvent(screen.getByTestId("exercise-prompt"), "layout", layout(39, 8));
    for (const [index, id] of ["a", "b", "c", "d"].entries()) {
      await fireEvent(wrapper(id), "layout", layout(TILE, index * (TILE + GAP)));
    }
    await fireEvent(screen.getByTestId("exercise-tiles"), "layout", layout(4 * TILE + 3 * GAP, 47));
    await fireEvent(screen.getByTestId("feedback-top"), "layout", layout(76));
    await fireEvent(screen.getByTestId("feedback-why-scroll"), "contentSizeChange", 288, WHY_LINE);
    await sheetHeight(full);
    return view;
  }

  it("fades the tiles under the green one that the sheet would cut; the picked one above it stays; a new try shows all", async () => {
    // A short phone: the sheet fits whole under the green tile (no grey tile folds), its top through tile c.
    const { rerender } = await check(512, "a");
    expect(screen.getByTestId("choice-a")).toBeTruthy();
    expect(screen.getByTestId("choice-b")).toBeTruthy();
    expect(screen.queryByTestId("choice-c")).toBeNull();
    expect(screen.queryByTestId("choice-d")).toBeNull();
    // It fades, nothing moves: the tile is still there, out of reach of taps and screen readers.
    expect(screen.getByTestId("choice-c", { includeHiddenElements: true })).toBeTruthy();
    expect(wrapper("c").props.pointerEvents).toBe("none");
    expect(screen.getByTestId("mascot")).toBeTruthy();
    // The next try shows every tile again.
    await rerender(<ExerciseView {...four} attempt={1} />);
    ["a", "b", "c", "d"].forEach((id) => expect(screen.getByTestId(`choice-${id}`)).toBeTruthy());
  });

  it("keeps the picked tile under the green one while it sits wholly above the sheet", async () => {
    // The sheet's top at 600 - full, under tile c (47 + 228 = 275) and through tile d.
    await check(600, "c");
    expect(screen.getByTestId("choice-b")).toBeTruthy();
    expect(screen.getByTestId("choice-c")).toBeTruthy();
    expect(screen.queryByTestId("choice-d")).toBeNull();
  });

  it("changes nothing on a tall phone, where the sheet cuts no tile", async () => {
    await check(900, "a");
    ["a", "b", "c", "d"].forEach((id) => expect(screen.getByTestId(`choice-${id}`)).toBeTruthy());
  });

  it("finds the tiles under the sheet in a column and in the two-column word grid", () => {
    const boxes = Object.fromEntries(["a", "b", "c", "d", "e", "f"].map((id) => [id, { y: 999, height: 54 }]));
    // A column: tiles at 100, 164, 228 ... The sheet's top at 300: d (292-346) is cut, e and f are under it.
    expect(tilesUnderSheet({ ids: ["a", "b", "c", "d", "e", "f"], boxes, focusId: "b", gap: 10, tilesTop: 100, sheetTop: 300 })).toEqual(["d", "e", "f"]);
    // Never the green tile or one above it, even when the sheet comes up to them.
    expect(tilesUnderSheet({ ids: ["a", "b", "c"], boxes, focusId: "c", gap: 10, tilesTop: 100, sheetTop: 120 })).toEqual([]);
    // A grid: the green tile's row (c, d) sits whole above the sheet and stays; the row under it is cut.
    expect(tilesUnderSheet({ ids: ["a", "b", "c", "d", "e", "f"], boxes, focusId: "c", gap: 10, columns: 2, tilesTop: 100, sheetTop: 230 })).toEqual(["e", "f"]);
  });
});

describe("a lesson question taller than its room draws its tiles tight, so every answer shows whole", () => {
  const long = {
    kind: "multiple_choice" as const,
    prompt: "What is Urwah ibn Abi al-Ja'd al-Bariqi known for?",
    choices: [
      { id: "a", label: "He wrote down the revelation and collected the Quran." },
      { id: "b", label: "The Prophet ﷺ blessed his trade: even dust would earn him profit." },
      { id: "c", label: "He was the last companion to pass away in Syria." },
      { id: "d", label: "He was the second caliph, called al-Faruq." }
    ],
    attempt: 1,
    mascotVariant: "boy",
    accent: "#21B573",
    onSelect: jest.fn(),
    onCheck: jest.fn(),
    onContinue: jest.fn()
  };
  const checkedResult = { correct: false, correctLabel: long.choices[1].label, why: "Sahih al-Bukhari 3642." };
  /** The space under each tile here (not a short phone). */
  const GAP = 12;
  /** The padding above and under a tile's text. */
  const padding = (id: string) => {
    const tile = screen.getByTestId(`choice-${id}`);
    const face = tile.children.map((child) => (typeof child === "string" ? {} : flat(child.props.style))).find((style) => style.borderWidth === 2);
    return face?.paddingVertical;
  };
  const wrapper = (id: string) => {
    let node = screen.getByTestId(`choice-${id}`, { includeHiddenElements: true }).parent!;
    while (!node.props.onLayout) node = node.parent!;
    return node;
  };
  /** In sight and in reach of taps. */
  const shown = (id: string) => wrapper(id).props.pointerEvents === "auto" && flat(wrapper(id).props.style).opacity !== 0;

  /** The room above the bar, and the question (chip, prompt and tiles, the space under its last tile included). */
  async function laidOut(room: number, question: number) {
    await fireEvent(screen.getByTestId("exercise-room"), "layout", layout(room));
    await fireEvent(screen.getByTestId("exercise-question"), "layout", layout(question, 8));
  }

  it("draws the tiles tight when the room's bottom edge would cut the last one, every tile in sight and in reach", async () => {
    await render(<ExerciseView {...long} />);
    // Loose, the last tile would end at 8 + 434 - 12 = 430, past the room's edge at 406.
    await laidOut(406, 434);
    ["a", "b", "c", "d"].forEach((id) => {
      expect(padding(id)).toBe(6);
      expect(shown(id)).toBe(true);
    });
  });

  it("leaves the tiles of a question that fits as they are", async () => {
    await render(<ExerciseView {...long} />);
    // The last tile ends at 430, a pixel past a room of 429: only its lip's last pixel, which may reach past.
    await laidOut(429, 434);
    ["a", "b", "c", "d"].forEach((id) => expect(padding(id)).toBe(12));
  });

  it("keeps the usual tiles on a question too tall even tight, so its last tile does not move under the room's edge", async () => {
    await render(<ExerciseView {...long} />);
    // Loose, the last tile ends at 8 + 500 - 12 = 496. Tight, each of the four is at least 12 shorter: 448, still past
    // the room's edge at 406. The question scrolls as it would anyway, and its tiles keep their place.
    await laidOut(406, 500);
    ["a", "b", "c", "d"].forEach((id) => {
      expect(padding(id)).toBe(12);
      expect(shown(id)).toBe(true);
    });
  });

  it("draws them tight only when tight tiles bring the last one whole into the room", async () => {
    const { rerender } = await render(<ExerciseView key="fits" {...long} />);
    // 8 + 459 - 12 = 455 loose, 455 - 4 * 12 = 407 tight: only the lip's last pixel past the edge at 406.
    await laidOut(406, 459);
    ["a", "b", "c", "d"].forEach((id) => expect(padding(id)).toBe(6));
    // One pixel taller (a new question): 408 tight, so the tiles stay as they are.
    await rerender(<ExerciseView key="too-tall" {...long} />);
    await laidOut(406, 460);
    ["a", "b", "c", "d"].forEach((id) => expect(padding(id)).toBe(12));
  });

  it("on a small phone counts the 6 px a short phone's tile gives up, and keeps it loose when that is not enough", async () => {
    await onSmallPhone(async () => {
      // 320 x 568: tiles have 9 px above and under their text and 8 px under each; tight, 6. Loose the last tile ends
      // at 8 + 409 - 8 = 409, tight at 409 - 4 * 6 = 385, a pixel past a room of 384.
      const { rerender } = await render(<ExerciseView key="fits" {...long} />);
      await laidOut(384, 409);
      ["a", "b", "c", "d"].forEach((id) => expect(padding(id)).toBe(6));
      // As tall as the Arabic Urwah question: too tall for its room either way (tight, it would still end 31 px past
      // the edge), so its tiles stay as they are.
      await rerender(<ExerciseView key="too-tall" {...long} />);
      await laidOut(384, 439);
      ["a", "b", "c", "d"].forEach((id) => expect(padding(id)).toBe(9));
    });
  });

  it("keeps them tight through CHECK and the sheet, so no tile moves, and reads a new try again", async () => {
    const { rerender } = await render(<ExerciseView {...long} />);
    await laidOut(406, 434);
    await rerender(<ExerciseView {...long} selectedChoiceId="c" correctChoiceId="b" result={checkedResult} />);
    // The question now fits (tight, tiles folded): it stays as it was when CHECK was tapped.
    await laidOut(406, 300);
    expect(padding("b")).toBe(6);
    await sheetHeight(150);
    expect(padding("b")).toBe(6);
    // The next try is read afresh: one that fits gets the usual padding.
    await rerender(<ExerciseView {...long} attempt={2} />);
    await laidOut(406, 360);
    ["a", "b", "c", "d"].forEach((id) => expect(padding(id)).toBe(12));
  });

  it("is tight from the frame it first shows where a view can say its size before the frame is drawn", async () => {
    const heights: Record<string, number> = { "exercise-room": 406, "exercise-question": 434 };
    Object.defineProperty(View.prototype, "offsetHeight", {
      configurable: true,
      get(this: { props: { testID?: string } }) {
        return heights[this.props.testID ?? ""] ?? 0;
      }
    });
    try {
      await render(<ExerciseView {...long} />);
      // No layout event yet.
      ["a", "b", "c", "d"].forEach((id) => expect(padding(id)).toBe(6));
    } finally {
      delete (View.prototype as { offsetHeight?: number }).offsetHeight;
    }
  });

  it("keeps the usual tiles from the first frame on a question too tall even tight, never tight first and loose after", async () => {
    const heights: Record<string, number> = { "exercise-room": 406, "exercise-question": 520 };
    Object.defineProperty(View.prototype, "offsetHeight", {
      configurable: true,
      get(this: { props: { testID?: string } }) {
        return heights[this.props.testID ?? ""] ?? 0;
      }
    });
    try {
      await render(<ExerciseView {...long} />);
      ["a", "b", "c", "d"].forEach((id) => expect(padding(id)).toBe(12));
    } finally {
      delete (View.prototype as { offsetHeight?: number }).offsetHeight;
    }
  });

  it("glides back up on CHECK after the learner scrolled past the prompt to reach the last tile", async () => {
    const scrollTo$ = scrollSpy();
    const TILE = 70;
    try {
      const { rerender } = await render(<ExerciseView {...long} />);
      await fireEvent(screen.getByTestId("exercise-view"), "layout", layout(500));
      await laidOut(384, 3 * (TILE + GAP) + 92 + GAP + 98);
      for (const [index, id] of ["a", "b", "c", "d"].entries()) {
        await fireEvent(wrapper(id), "layout", layout(index === 3 ? 92 : TILE, index * (TILE + GAP)));
      }
      await fireEvent(screen.getByTestId("exercise-prompt"), "layout", layout(60, 38));
      await fireEvent(screen.getByTestId("exercise-tiles"), "layout", layout(3 * (TILE + GAP) + 92, 98));
      // Scrolled to the end, 52 down, past the prompt's top at 46.
      let scroller = screen.getByTestId("exercise-prompt").parent!;
      while (!scroller.props.contentContainerStyle) scroller = scroller.parent!;
      await fireEvent.scroll(scroller, { nativeEvent: { contentOffset: { x: 0, y: 52 }, contentSize: { width: 288, height: 470 }, layoutMeasurement: { width: 288, height: 384 } } });
      await rerender(<ExerciseView {...long} selectedChoiceId="d" correctChoiceId="b" result={checkedResult} />);
      scrollTo$.mockClear();
      await sheetHeight(150);
      // Back to the top in a glide, as any scroll the question makes on CHECK, never a jump.
      expect(scrollTo$).toHaveBeenCalledWith({ y: 0, animated: true });
      expect(scrollTo$).not.toHaveBeenCalledWith(expect.objectContaining({ animated: false }));
    } finally {
      scrollTo$.mockRestore();
    }
  });

  it("knows how much shorter a tight tile is at least, before it is drawn", async () => {
    /** A row tile's face: its padding above its text and its least height. */
    const { rerender } = await render(<ChoiceTile label="He wrote down the revelation." testID="tile" />);
    const face = async (props: { compact?: boolean; tight?: boolean }) => {
      await rerender(<ChoiceTile label="He wrote down the revelation." {...props} testID="tile" />);
      const style = screen
        .getByTestId("tile")
        .children.map((child) => (typeof child === "string" ? {} : flat(child.props.style)))
        .find((entry) => entry.borderWidth === 2)!;
      return { padding: style.paddingVertical as number, minHeight: style.minHeight as number };
    };
    for (const compact of [false, true]) {
      const loose = await face({ compact });
      const tight = await face({ compact, tight: true });
      // The padding it gives up above and under its text, and a least height lower by at least as much.
      expect(tightSaving(compact)).toBe(2 * (loose.padding - tight.padding));
      expect(loose.minHeight - tight.minHeight).toBeGreaterThanOrEqual(tightSaving(compact));
    }
    expect(tightSaving(false)).toBe(12);
    expect(tightSaving(true)).toBe(6);
  });

  it("finds a question whose last tile the room's bottom edge would cut", () => {
    expect(overRoom(406, 430)).toBe(true);
    // A lip's last pixel may reach past the edge.
    expect(overRoom(406, 407)).toBe(false);
    expect(overRoom(406, 380)).toBe(false);
  });
});

describe("a tile the sheet's top edge would cut fades away, in practice", () => {
  const daily = createFoundationAssessment(createEmptyLearnerProfile(), "daily_challenge");
  const handlers = () => ({ onChangeSelectedAnswer: jest.fn(), onSubmit: jest.fn(), onContinue: jest.fn(), onExit: jest.fn() });
  /** A four-answer question with the right answer second, answered wrong with its first one. */
  const missed = () => {
    const base = FOUNDATION_QUESTION_BANK.find((entry) => entry.type === "multiple_choice" && (entry.options?.length ?? 0) === 4 && typeof entry.correctAnswer === "string")!;
    const answer = base.correctAnswer as string;
    const others = (base.options ?? []).filter((option) => option !== answer);
    const question = { ...base, options: [others[0], answer, ...others.slice(1)] };
    const picked = others[0];
    const state: FoundationAssessmentState = { ...daily, currentQuestion: question };
    const checked = submitFoundationAssessmentAnswer({ profile: createEmptyLearnerProfile(), state, selectedAnswer: picked, responseTimeMs: 3000 }).stateWithFeedback;
    return { question, picked, answer, state, checked };
  };

  it("fades the answers under the right one that the sheet would cut, until the next question", async () => {
    const { question, picked, answer, state, checked } = missed();
    const { rerender } = await render(<FoundationAssessmentScreen assessment={checked} language="en" selectedAnswer={picked} {...handlers()} />);
    await fireEvent(screen.getByTestId("assessment-scroll-box"), "layout", layout(500));
    await fireEvent(screen.getByTestId("assessment-prompt"), "layout", layout(46, 38));
    for (const [index, option] of question.options.entries()) {
      await fireEvent(screen.getByTestId(`assessment-tile-${option}`), "layout", layout(54, index * 64));
    }
    await fireEvent(screen.getByTestId("assessment-answers"), "layout", layout(4 * 54 + 3 * 10, 84));
    // The sheet with its Why line shut: it fits whole under the right answer (84 + 64 + 54 = 202).
    await fireEvent(screen.getByTestId("feedback-top"), "layout", layout(76));
    const full = 40 + 76 + 16 + 58 + SHEET_PAD + inset;
    await sheetHeight(full);
    // Its top (500 - full) cuts the third answer (212-266); the fourth is under it.
    expect(screen.getByTestId(`assessment-tile-${picked}`)).toBeTruthy();
    expect(screen.getByTestId(`assessment-tile-${answer}`)).toBeTruthy();
    question.options.slice(2).forEach((option) => {
      expect(screen.queryByTestId(`assessment-tile-${option}`)).toBeNull();
      expect(screen.getByTestId(`assessment-tile-${option}`, { includeHiddenElements: true })).toBeTruthy();
    });
    // The question again, unanswered: every answer shows.
    await rerender(<FoundationAssessmentScreen assessment={state} language="en" selectedAnswer={undefined} {...handlers()} />);
    question.options.forEach((option) => expect(screen.getByTestId(`assessment-tile-${option}`)).toBeTruthy());
  });
});

describe("the shop's BUY button is a button of its own", () => {
  const strings = getUiStrings("en");
  const section = COURSE.sections[0] as LearningSection;
  const shop = async (user = makeUser()) => {
    const onUseItem = jest.fn();
    await render(<ShopView user={user} strings={strings} items={SHOP_ITEMS_WITH_GEMS} storePrices={{}} busy={false} section={section} onUseItem={onUseItem} onRestore={jest.fn()} canBuyWithMoney={false} />);
    (playGameSound as jest.Mock).mockClear();
    return onUseItem;
  };
  const sounds = () => (playGameSound as jest.Mock).mock.calls.map((call) => call[0]);
  const isButton = (node: { props: Record<string, unknown> }) => node.props.accessibilityRole === "button" || node.props.role === "button" || node.props.accessible === true;

  it("sits next to the row's button, never inside it, so a screen reader reaches it and it buys", async () => {
    const onUseItem = await shop(makeUser({ gems: 500, hearts: { current: 2, max: 5, unlimited: false, lastRefillDate: "2026-10-20" } }));
    const row = screen.getByTestId("shop-item-gem-heart-refill");
    expect(within(row).queryByTestId("shop-buy-gem-heart-refill")).toBeNull();
    // No button around the BUY button (on the web that would be a button inside a button).
    let node = screen.getByTestId("shop-buy-gem-heart-refill").parent;
    while (node) {
      expect(isButton(node)).toBe(false);
      node = node.parent;
    }
    // Both are buttons a screen reader can reach, each with its own name; only BUY buys.
    expect(screen.getByRole("button", { name: "Refill hearts, Fill to 5" })).toBeTruthy();
    await fireEvent.press(screen.getByRole("button", { name: "Refill hearts, 350 gems" }));
    expect(onUseItem).toHaveBeenCalledTimes(1);
  });

  it("answers a tap on the card's edge like the row (a sound, the line, the button's pop), and screen readers skip that edge", async () => {
    const onUseItem = await shop(makeUser({ gems: 120, hearts: { current: 3, max: 5, unlimited: false, lastRefillDate: "2026-10-20" } }));
    expect(screen.queryByTestId("shop-row-edge-gem-heart-refill")).toBeNull();
    const edge = screen.getByTestId("shop-row-edge-gem-heart-refill", { includeHiddenElements: true });
    await fireEvent.press(edge);
    expect(sounds()).toEqual(["wrong"]);
    expect(screen.getByTestId("shop-line-gem-heart-refill")).toHaveTextContent("Need 230 more");
    expect(onUseItem).not.toHaveBeenCalled();
    // The row's own button says the same.
    (playGameSound as jest.Mock).mockClear();
    await fireEvent.press(screen.getByTestId("shop-item-gem-heart-refill"));
    expect(sounds()).toEqual(["wrong"]);
  });

  it("plays a soft tap on the edge of a row with full hearts, and says so", async () => {
    const onUseItem = await shop(makeUser({ gems: 500, hearts: { current: 5, max: 5, unlimited: false, lastRefillDate: "2026-10-20" } }));
    await fireEvent.press(screen.getByTestId("shop-row-edge-gem-heart-refill", { includeHiddenElements: true }));
    expect(sounds()).toEqual(["soft_ui"]);
    expect(screen.getByTestId("shop-line-gem-heart-refill")).toHaveTextContent("Hearts are full");
    expect(onUseItem).not.toHaveBeenCalled();
  });

  it("plays a soft tap on the edge of a row that can be bought, and never buys from it", async () => {
    const onUseItem = await shop(makeUser({ gems: 500, hearts: { current: 2, max: 5, unlimited: false, lastRefillDate: "2026-10-20" } }));
    await fireEvent.press(screen.getByTestId("shop-row-edge-gem-heart-refill", { includeHiddenElements: true }));
    expect(sounds()).toEqual(["soft_ui"]);
    expect(onUseItem).not.toHaveBeenCalled();
    // Its BUY button buys.
    await fireEvent.press(screen.getByTestId("shop-buy-gem-heart-refill"));
    expect(onUseItem).toHaveBeenCalledTimes(1);
  });
});

describe("the gem count reads the same in the top bar and on the Shop card", () => {
  const strings = getUiStrings("en");
  const section = COURSE.sections[0] as LearningSection;
  const bar = (gems: number) => (
    <AppTopBar topicId="prayer" topicTitle="Prayer" accent="#3A9FE8" streakDays={3} gems={gems} hearts={{ current: 4, max: 5, unlimited: false }} onOpenTopics={jest.fn()} onOpenShop={jest.fn()} />
  );

  it.each([
    [1000, "1,000"],
    [12345, "12,345"],
    [123456, "123k"]
  ])("shows %d as %s in both", async (gems, shown) => {
    // The Shop tab: the top bar over the Shop card, on one screen.
    await render(
      <>
        {bar(gems)}
        <ShopView user={makeUser({ gems })} strings={strings} items={SHOP_ITEMS_WITH_GEMS} storePrices={{}} busy={false} section={section} onUseItem={jest.fn()} onRestore={jest.fn()} canBuyWithMoney={false} />
      </>
    );
    expect(screen.getByTestId("top-bar-gems")).toHaveTextContent(shown);
    expect(screen.getByTestId("shop-gems")).toHaveTextContent(shown);
    // A screen reader hears the whole number.
    expect(screen.getByRole("button", { name: `${gems.toLocaleString("en-US")} gems` })).toBeTruthy();
  });
});

describe("the Me stat cards keep big numbers whole on a 320 px phone", () => {
  it.each([
    [999, null],
    [9999, null],
    [12345, 20],
    [99999, 20],
    [123456, 20]
  ])("sizes %d to fit its half-width card", (value, smaller) => {
    // "9,999" fits at full size; from "12,345" it steps down, also for "123k", whose count passes "42,100" on its way.
    const style = statValueSize(value);
    expect(style ? StyleSheet.flatten(style).fontSize : null).toBe(smaller);
  });
});

/** The question's scroll view, scrolled to `y` (found from a box inside it). */
async function scrolledTo(insideId: string, y: number) {
  let node = screen.getByTestId(insideId, { includeHiddenElements: true }).parent!;
  while (!node.props.onScroll) node = node.parent!;
  await fireEvent.scroll(node, { nativeEvent: { contentOffset: { x: 0, y }, contentSize: { width: 320, height: 900 }, layoutMeasurement: { width: 320, height: 400 } } });
}

describe("the chips above the question fade when the scroll would cut them", () => {
  const two = {
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
  const result = { correct: false, correctLabel: two.choices[1].label, why: "He led the Muslims after the Prophet." };
  const wrapper = (id: string) => {
    let node = screen.getByTestId(`choice-${id}`, { includeHiddenElements: true }).parent!;
    while (!node.props.onLayout) node = node.parent!;
    return node;
  };

  async function check(rootHeight: number) {
    await render(<ExerciseView {...two} review attempt={1} selectedChoiceId="a" correctChoiceId="b" result={result} />);
    await fireEvent(screen.getByTestId("exercise-view"), "layout", layout(rootHeight));
    // The REVIEW and "Try again!" chips (8-34), then the prompt (42-81) and three tiles. Their boxes are read inside
    // the question block, which starts 8 down the scroll.
    await fireEvent(screen.getByTestId("exercise-cues", { includeHiddenElements: true }), "layout", layout(26, 0));
    await fireEvent(screen.getByTestId("exercise-prompt"), "layout", layout(39, 34));
    for (const [index, id] of ["a", "b", "c"].entries()) {
      await fireEvent(wrapper(id), "layout", layout(68, index * 80));
    }
    await fireEvent(screen.getByTestId("exercise-tiles"), "layout", layout(3 * 68 + 2 * 12, 73));
    await fireEvent(screen.getByTestId("feedback-top"), "layout", layout(76));
    await sheetHeight(40 + 76 + 16 + 58 + SHEET_PAD + inset);
  }

  it("hides REVIEW and Try again! in a lesson while the question sits scrolled past their top, and shows them again above it", async () => {
    await onSmallPhone(async () => {
      const scrollTo = scrollSpy();
      // Short: the question scrolls up 17, part-way through the chips (8-34) and short of the prompt.
      await check(400);
      expect(scrollTo).toHaveBeenLastCalledWith(expect.objectContaining({ y: 17 }));
      // The scroll is the question's own and goes past their top: they are gone already, before its first frame.
      expect(screen.queryByTestId("exercise-cues")).toBeNull();
      // On its way past their top they stay gone, so the edge never cuts them.
      await scrolledTo("exercise-cues", 9);
      expect(screen.queryByTestId("exercise-cues")).toBeNull();
      expect(screen.getByTestId("exercise-cues", { includeHiddenElements: true })).toBeTruthy();
      expect(screen.getByText("Who was the first caliph?")).toBeTruthy();
      // Scrolled back up by hand: they show again, so no gap is left above the prompt.
      await scrolledTo("exercise-cues", 0);
      expect(screen.getByTestId("exercise-cues")).toBeTruthy();
      scrollTo.mockRestore();
    });
  });

  it("keeps them on a tall phone, where nothing scrolls", async () => {
    await check(900);
    expect(screen.getByTestId("exercise-cues")).toBeTruthy();
    expect(screen.getByTestId("exercise-review")).toBeTruthy();
  });

  it("hides the topic label in practice while the question sits scrolled past it", async () => {
    const daily = createFoundationAssessment(createEmptyLearnerProfile(), "daily_challenge");
    const base = FOUNDATION_QUESTION_BANK.find((entry) => entry.type === "multiple_choice" && (entry.options?.length ?? 0) === 4 && typeof entry.correctAnswer === "string")!;
    const answer = base.correctAnswer as string;
    const others = (base.options ?? []).filter((option) => option !== answer);
    const question = { ...base, options: [others[0], answer, ...others.slice(1)] };
    const state: FoundationAssessmentState = { ...daily, currentQuestion: question };
    const checked = submitFoundationAssessmentAnswer({ profile: createEmptyLearnerProfile(), state, selectedAnswer: others[0], responseTimeMs: 3000 }).stateWithFeedback;
    const handlers = { onChangeSelectedAnswer: jest.fn(), onSubmit: jest.fn(), onContinue: jest.fn(), onExit: jest.fn() };
    const { rerender } = await render(<FoundationAssessmentScreen assessment={checked} language="en" selectedAnswer={others[0]} {...handlers} />);
    await fireEvent(screen.getByTestId("assessment-scroll-box"), "layout", layout(420));
    await fireEvent(screen.getByTestId("assessment-label", { includeHiddenElements: true }), "layout", layout(30, 0));
    await fireEvent(screen.getByTestId("assessment-prompt"), "layout", layout(46, 38));
    for (const [index, option] of question.options.entries()) {
      await fireEvent(screen.getByTestId(`assessment-tile-${option}`, { includeHiddenElements: true }), "layout", layout(54, index * 64));
    }
    await fireEvent(screen.getByTestId("assessment-answers"), "layout", layout(4 * 54 + 3 * 10, 84));
    await fireEvent(screen.getByTestId("feedback-top"), "layout", layout(76));
    await sheetHeight(40 + 76 + 16 + 58 + SHEET_PAD + inset);
    await scrolledTo("assessment-label", 30);
    expect(screen.queryByTestId("assessment-label")).toBeNull();
    expect(screen.getByTestId("assessment-prompt")).toBeTruthy();
    // The question again, unanswered: the label is back.
    await rerender(<FoundationAssessmentScreen assessment={state} language="en" selectedAnswer={undefined} {...handlers} />);
    expect(screen.getByTestId("assessment-label")).toBeTruthy();
  });
});

describe("the correct-order list lights up the steps the learner had in another place", () => {
  const options = STEPS.map((label, index) => ({ id: `s${index + 1}`, label }));
  const ids = options.map((option) => option.id);
  const game = { title: "Salah", prompt: "Put Fajr's two rak'ahs in order!", options, correctOrderIds: ids, mascotVariant: "boy", accent: "#21B573", onDone: jest.fn() };

  it("marks only the rows the learner swapped, so the mistake shows even when the red steps fold away", async () => {
    // The last two steps swapped.
    await render(<OrderGame {...game} initialPlacedIds={[...ids.slice(0, 7), ids[8], ids[7]]} initialChecked />);
    const lit = STEPS.map((_, index) => flat(screen.getByTestId(`feedback-row-${index}`).props.style).backgroundColor !== undefined);
    expect(lit).toEqual([false, false, false, false, false, false, false, true, true]);
    expect(screen.getByLabelText("8. Tashahhud, you had this one in another place")).toBeTruthy();
    expect(screen.getByLabelText("1. Opening takbir")).toBeTruthy();
  });
});

describe("the streak count is written like the gem count", () => {
  it("shows a 1,234-day streak with its comma, and says it whole", async () => {
    await render(
      <AppTopBar topicId="prayer" topicTitle="Prayer" accent="#3A9FE8" streakDays={1234} gems={99999} hearts={{ current: 4, max: 5, unlimited: false }} onOpenTopics={jest.fn()} onOpenShop={jest.fn()} />
    );
    expect(screen.getByTestId("top-bar-streak")).toHaveTextContent("1,234");
    expect(screen.getByRole("button", { name: "1,234 day streak" })).toBeTruthy();
  });
});

describe("a miss lower in the correct-order list than it shows opens the list at that miss", () => {
  const sheet = { visible: true, correct: false, title: "Correct order:", correctList: STEPS, buttonLabel: "Try again", onContinue: jest.fn() };
  async function placeRows() {
    for (const index of STEPS.keys()) {
      await fireEvent(screen.getByTestId(`feedback-row-${index}`), "layout", layout(ROW, index * (ROW + ROW_GAP)));
    }
    await fireEvent(screen.getByTestId("feedback-list"), "layout", layout(STEPS.length * (ROW + ROW_GAP) - ROW_GAP));
  }

  it("scrolls to the first stop that shows rows 8 and 9 whole, each with its red mark", async () => {
    await onSmallPhone(async () => {
      const scrollTo = scrollSpy();
      await render(<FeedbackSheet {...sheet} missedRows={[7, 8]} />);
      await placeRows();
      // Seven whole rows show (164 tall): the stop at 48 shows rows 3 to 9, so the swapped last two are in sight.
      expect(scrollTo).toHaveBeenLastCalledWith(expect.objectContaining({ y: 2 * (ROW + ROW_GAP), animated: false }));
      expect(screen.getByTestId("feedback-miss-7")).toBeTruthy();
      expect(screen.getByTestId("feedback-miss-8")).toBeTruthy();
      expect(screen.queryByTestId("feedback-miss-6")).toBeNull();
      scrollTo.mockRestore();
    });
  });

  it("stays at the top when the first miss already shows there", async () => {
    await onSmallPhone(async () => {
      const scrollTo = scrollSpy();
      await render(<FeedbackSheet {...sheet} missedRows={[0, 1]} />);
      await placeRows();
      expect(scrollTo).not.toHaveBeenCalledWith(expect.objectContaining({ y: 2 * (ROW + ROW_GAP) }));
      expect(scrollTo).toHaveBeenLastCalledWith(expect.objectContaining({ y: 0 }));
      scrollTo.mockRestore();
    });
  });
});

describe("a long streak is written with its comma on Lesson complete and in the streak sheet", () => {
  it("reads 1,234", async () => {
    await render(<StreakSheet visible streakDays={1234} onClose={jest.fn()} />);
    expect(screen.getByText("1,234 day streak!")).toBeTruthy();
    screen.unmount();
    await render(<LessonComplete title="Wudu" xp={12} stars={3} streakDays={1234} mascotVariant="boy" accent="#21B573" onContinue={jest.fn()} />);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2500));
    });
    expect(screen.getByTestId("stat-streak")).toHaveTextContent(/1,234/);
  });
});
