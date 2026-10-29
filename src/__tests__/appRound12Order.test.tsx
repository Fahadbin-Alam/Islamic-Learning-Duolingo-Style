jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

// The mascot as a plain box, so nothing in it animates on timers here.
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
import { Dimensions, Platform, ScrollView } from "react-native";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { COURSE } from "../data/course";
import { getUiStrings } from "../i18n";
import { playGameSound } from "../services/gameAudio";
import type { LearningSection } from "../types";
import { Tappable } from "../ui/Tappable";
import { FeedbackSheet, OrderGame } from "../ui/lesson";
import { ShopView } from "../ui/screens";
import { SHOP_ITEMS_WITH_GEMS, makeUser } from "./testUtils";

const layout = (height: number, y = 0, width = 288) => ({ nativeEvent: { layout: { x: 0, y, width, height } } });
/** The scroll view mock's scrollTo is already a jest.fn shared by every test, so each test starts it afresh. */
function scrollSpy() {
  const spy = jest.spyOn(ScrollView.prototype as unknown as { scrollTo: (options: object) => void }, "scrollTo");
  spy.mockClear();
  return spy;
}
const sounds = () => (playGameSound as jest.Mock).mock.calls.map((call) => call[0]);

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

/** Long enough for the sheet to slide away and unmount its content (its close takes 200 ms). */
async function letSheetClose() {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
  });
}

const STEPS = ["Opening takbir", "Stand and recite", "Ruku, then stand", "Two sujud", "Stand for rak'ah 2", "Ruku again", "Two sujud again", "Tashahhud", "Taslim"];
/** Nine one-line rows, 20 tall, 4 apart: seven whole rows show (164 tall), and the stop at 48 shows rows 3 to 9. */
const ROW = 20;
const ROW_GAP = 4;
const MISS_STOP = 2 * (ROW + ROW_GAP);

async function placeRows() {
  for (const index of STEPS.keys()) {
    await fireEvent(screen.getByTestId(`feedback-row-${index}`), "layout", layout(ROW, index * (ROW + ROW_GAP)));
  }
  await fireEvent(screen.getByTestId("feedback-list"), "layout", layout(STEPS.length * (ROW + ROW_GAP) - ROW_GAP));
}

describe("the correct-order list opens at the miss on every open, not only the first", () => {
  const sheet = { correct: false, title: "Correct order:", correctList: STEPS, missedRows: [7, 8], buttonLabel: "Try again", onContinue: jest.fn() };
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("puts the list the sheet mounts anew after TRY AGAIN at the stop that shows rows 8 and 9", async () => {
    await onSmallPhone(async () => {
      const scrollTo = scrollSpy();
      const { rerender } = await render(<FeedbackSheet {...sheet} visible />);
      await placeRows();
      expect(scrollTo).toHaveBeenLastCalledWith(expect.objectContaining({ y: MISS_STOP, animated: false }));
      const firstList = scrollTo.mock.contexts.at(-1);

      // TRY AGAIN: the sheet slides away and drops its content, list and all.
      await rerender(<FeedbackSheet {...sheet} visible={false} />);
      await letSheetClose();
      expect(screen.queryByTestId("feedback-body")).toBeNull();

      // The same two steps swapped again. The rows already said where they sit, so the new list is put at the miss as
      // it mounts (no row lays itself out again here, as none moved), with the arrow pointing up from that stop.
      scrollTo.mockClear();
      await rerender(<FeedbackSheet {...sheet} visible />);
      expect(scrollTo).toHaveBeenLastCalledWith(expect.objectContaining({ y: MISS_STOP, animated: false }));
      expect(scrollTo.mock.contexts.at(-1)).not.toBe(firstList);
      const body = screen.getByTestId("feedback-body");
      await fireEvent(body, "layout", layout(164));
      await fireEvent(body, "contentSizeChange", 288, 212);
      expect(screen.getByTestId("feedback-more-up")).toBeTruthy();
      expect(screen.queryByTestId("feedback-more")).toBeNull();
      expect(screen.getByTestId("feedback-miss-7")).toBeTruthy();
      expect(screen.getByTestId("feedback-miss-8")).toBeTruthy();

      // And again on a third try.
      await rerender(<FeedbackSheet {...sheet} visible={false} />);
      await letSheetClose();
      scrollTo.mockClear();
      await rerender(<FeedbackSheet {...sheet} visible />);
      expect(scrollTo).toHaveBeenLastCalledWith(expect.objectContaining({ y: MISS_STOP, animated: false }));
    });
  });

  it("follows the miss of each try: the top for the first two steps, then the stop at the last two", async () => {
    await onSmallPhone(async () => {
      const scrollTo = scrollSpy();
      const { rerender } = await render(<FeedbackSheet {...sheet} visible missedRows={[0, 1]} />);
      await placeRows();
      expect(scrollTo).not.toHaveBeenCalledWith(expect.objectContaining({ y: MISS_STOP }));
      await rerender(<FeedbackSheet {...sheet} visible={false} missedRows={[0, 1]} />);
      await letSheetClose();
      scrollTo.mockClear();
      await rerender(<FeedbackSheet {...sheet} visible missedRows={[7, 8]} />);
      expect(scrollTo).toHaveBeenLastCalledWith(expect.objectContaining({ y: MISS_STOP, animated: false }));
    });
  });

  it("does so in the order game itself: TRY AGAIN, the last two swapped again, CHECK", async () => {
    const options = STEPS.map((label, index) => ({ id: `s${index + 1}`, label }));
    const ids = options.map((option) => option.id);
    const game = { title: "Salah", prompt: "Put Fajr's two rak'ahs in order!", options, correctOrderIds: ids, mascotVariant: "boy", accent: "#21B573", onDone: jest.fn() };
    await onSmallPhone(async () => {
      const scrollTo = scrollSpy();
      await render(<OrderGame {...game} initialPlacedIds={[...ids.slice(0, 7), ids[8], ids[7]]} initialChecked />);
      await placeRows();
      expect(scrollTo).toHaveBeenLastCalledWith(expect.objectContaining({ y: MISS_STOP, animated: false }));

      await fireEvent.press(screen.getByTestId("feedback-continue"));
      await letSheetClose();
      expect(screen.queryByTestId("feedback-body")).toBeNull();
      // TRY AGAIN kept the seven steps that were right; the last two go in swapped again.
      await fireEvent.press(screen.getByTestId(`order-bank-${ids[8]}`));
      await fireEvent.press(screen.getByTestId(`order-bank-${ids[7]}`));
      scrollTo.mockClear();
      await fireEvent.press(screen.getByTestId("order-check"));
      expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ y: MISS_STOP, animated: false }));
      expect(screen.getByLabelText("8. Tashahhud, you had this one in another place")).toBeTruthy();
      expect(screen.getByLabelText("9. Taslim, you had this one in another place")).toBeTruthy();
    });
  });
});

describe("the placed steps the rising sheet would cut fold away before its edge reaches them", () => {
  const options = STEPS.map((label, index) => ({ id: `s${index + 1}`, label }));
  const ids = options.map((option) => option.id);
  const game = { title: "Salah", prompt: "Put Fajr's two rak'ahs in order!", options, correctOrderIds: ids, mascotVariant: "boy", accent: "#21B573", onDone: jest.fn() };
  const inset = Platform.OS === "ios" ? 30 : 16;
  /** The sheet's content says its height; the sheet counts its padding (20 + 16) and the inset with it. */
  const sheetShows = (height: number) => fireEvent(screen.getByTestId("feedback-content"), "layout", layout(height - 36 - inset));
  const shown = () => ids.filter((id) => screen.queryByTestId(`order-placed-${id}`) !== null);
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  /** Checked with the last two swapped: the prompt (8-48) and the nine placed steps under it, 28 tall, 32 apart. */
  async function checkedGame() {
    await render(<OrderGame {...game} initialPlacedIds={[...ids.slice(0, 7), ids[8], ids[7]]} initialChecked />);
    await fireEvent(screen.getByTestId("order-game"), "layout", layout(500));
    await fireEvent(screen.getByTestId("order-prompt"), "layout", layout(40, 8));
    await fireEvent(screen.getByTestId("order-answer"), "layout", layout(9 * 32 - 4, 56));
    for (const [index, id] of ids.entries()) {
      await fireEvent(screen.getByTestId(`order-cell-${id}`), "layout", layout(28, index * 32));
    }
  }

  it("fold in the render the sheet says the height it keeps, not a moment after, and never by a height it drops", async () => {
    await onSmallPhone(async () => {
      await checkedGame();
      // The list has not measured its rows yet, so the sheet shows a row more (390, its top at 110): nothing folds
      // by that height.
      await sheetShows(390);
      expect(shown()).toEqual(ids);
      // The rows are placed and the sheet says the height it keeps (366, its top at 134): the steps from the third
      // on fold away in that same render, while the sheet is still on its way up.
      await placeRows();
      await sheetShows(366);
      expect(shown()).toEqual(["s1", "s2"]);
    });
  });

  it("only ever fold further while the sheet is up, so a step never comes back to blink", async () => {
    await onSmallPhone(async () => {
      await checkedGame();
      await placeRows();
      await sheetShows(366);
      expect(shown()).toEqual(["s1", "s2"]);
      // Taller (its top at 94): the second step goes too. Shorter again: it stays gone until TRY AGAIN.
      await sheetShows(406);
      expect(shown()).toEqual(["s1"]);
      await sheetShows(366);
      expect(shown()).toEqual(["s1"]);
    });
  });

  it("fold by the height the sheet has when it never says it keeps one", async () => {
    await onSmallPhone(async () => {
      await checkedGame();
      await sheetShows(366);
      expect(shown()).toEqual(ids);
      await act(async () => {
        jest.advanceTimersByTime(120);
      });
      expect(shown()).toEqual(["s1", "s2"]);
    });
  });
});

describe("on the web, a tap-only edge is hidden from screen readers and never takes focus", () => {
  beforeEach(() => {
    jest.replaceProperty(Platform, "OS", "web");
    (playGameSound as jest.Mock).mockClear();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("is a plain box with aria-hidden and no tabIndex, and a click still plays the tap and presses", async () => {
    const onPress = jest.fn();
    const onPressIn = jest.fn();
    const onPressOut = jest.fn();
    await render(<Tappable hiddenFromAccessibility onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut} testID="edge" />);
    expect(screen.queryByTestId("edge")).toBeNull();
    const edge = screen.getByTestId("edge", { includeHiddenElements: true });
    expect(edge.props["aria-hidden"]).toBe(true);
    expect(edge.props.tabIndex).toBeUndefined();
    expect(edge.props.focusable).toBeUndefined();
    expect(edge.props.accessibilityRole).toBeUndefined();
    expect(edge.props.role).toBeUndefined();

    // Pressed down and let go: the springs, once each, and the box keeps the pointer while it is down.
    const setPointerCapture = jest.fn();
    await fireEvent(edge, "pointerDown", { currentTarget: { setPointerCapture }, nativeEvent: { pointerId: 7 } });
    expect(setPointerCapture).toHaveBeenCalledWith(7);
    await fireEvent(edge, "pointerUp");
    await fireEvent(edge, "pointerLeave");
    expect(onPressIn).toHaveBeenCalledTimes(1);
    expect(onPressOut).toHaveBeenCalledTimes(1);
    await fireEvent(edge, "click");
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(sounds()).toEqual(["soft_ui"]);
  });

  it("answers a click on the shop row's edge like the row (the buzz and the line), and never buys", async () => {
    const onUseItem = jest.fn();
    const strings = getUiStrings("en");
    const section = COURSE.sections[0] as LearningSection;
    const user = makeUser({ gems: 120, hearts: { current: 3, max: 5, unlimited: false, lastRefillDate: "2026-10-20" } });
    await render(<ShopView user={user} strings={strings} items={SHOP_ITEMS_WITH_GEMS} storePrices={{}} busy={false} section={section} onUseItem={onUseItem} onRestore={jest.fn()} canBuyWithMoney={false} />);
    (playGameSound as jest.Mock).mockClear();
    const edge = screen.getByTestId("shop-row-edge-gem-heart-refill", { includeHiddenElements: true });
    expect(edge.props["aria-hidden"]).toBe(true);
    expect(edge.props.tabIndex).toBeUndefined();
    await fireEvent(edge, "click");
    expect(sounds()).toEqual(["wrong"]);
    expect(screen.getByTestId("shop-line-gem-heart-refill")).toHaveTextContent("Need 230 more");
    expect(onUseItem).not.toHaveBeenCalled();
  });
});

describe("on a phone, the tap-only edge is unchanged", () => {
  it("is a pressable hidden from screen readers, with its descendants", async () => {
    const onPress = jest.fn();
    await render(<Tappable hiddenFromAccessibility onPress={onPress} testID="edge" />);
    const edge = screen.getByTestId("edge", { includeHiddenElements: true });
    expect(edge.props.accessible).toBe(false);
    expect(edge.props["aria-hidden"]).toBe(true);
    expect(edge.props.importantForAccessibility).toBe("no-hide-descendants");
    expect(edge.props.accessibilityElementsHidden).toBe(true);
    expect(edge.props.focusable).toBe(false);
    await fireEvent.press(edge);
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
