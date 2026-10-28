jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

import React, { useRef } from "react";
import { Dimensions, Platform, StyleSheet, Text, View, type ScrollView } from "react-native";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { FoundationAssessmentScreen, PracticeComplete } from "../components/FoundationLearning";
import { FOUNDATION_QUESTION_BANK } from "../data/foundationQuestionBank";
import { createEmptyLearnerProfile, createFoundationAssessment, submitFoundationAssessmentAnswer } from "../services/foundationAssessment";
import type { FoundationAssessmentState } from "../types";
import { ExerciseView, FeedbackSheet, LessonComplete, OrderGame } from "../ui/lesson";
import { WHY_LINE } from "../ui/lesson/FeedbackSheet";
import { foldScrollY, laidOutTop, useQuestionScroll, useSheetFit, type QuestionPlaces } from "../ui/lesson/sheetFit";

const layout = (height: number, y = 0, width = 288) => ({ nativeEvent: { layout: { x: 0, y, width, height } } });
const flat = (style: unknown) => (StyleSheet.flatten(style as never) ?? {}) as Record<string, unknown>;
const inset = Platform.OS === "ios" ? 30 : 16;
/** The sheet counts its padding (20 + 16) and the inset with its content's height. */
const SHEET_PAD = 20 + 16;

describe("tiles that fold away above the green tile never throw it up the screen and back", () => {
  it("keeps the green tile where it showed while the question can scroll up with it", () => {
    // Scrolled to 400, the grey tiles above it fold (300 px): at 100 it shows where it did, and goes on to 50.
    expect(foldScrollY(400, 300, 50)).toBe(100);
    expect(foldScrollY(400, 300, undefined)).toBe(100);
  });

  it("never scrolls it past where it goes, so it never turns back", () => {
    // The mascot hides as the Why line opens: the prompt is 70 px shorter. Where it goes (56) is short of where it
    // showed (6): it goes there at once, not to 6 and back down.
    expect(foldScrollY(76, 70, 56)).toBe(56);
    // Where it goes is further down than it is now: it stays, and the green tile moves up with the fold, on its way.
    expect(foldScrollY(100, 20, 300)).toBe(100);
  });

  it("stops at the top: the green tile then moves up only by what the scroll could not take", () => {
    expect(foldScrollY(269, 347, 0)).toBe(0);
    expect(foldScrollY(30, 100, undefined)).toBe(0);
  });

  it("reads where a view starts inside one that holds it, as laid out, and nothing where it cannot", () => {
    const within = { offsetTop: 99 };
    const middle = { offsetTop: 20, offsetParent: within };
    const tile = { offsetTop: 10, offsetParent: middle };
    expect(laidOutTop(tile, within)).toBe(30);
    expect(laidOutTop(middle, within)).toBe(20);
    expect(laidOutTop(within, within)).toBe(0);
    expect(laidOutTop(tile, { offsetTop: 0 })).toBeUndefined();
    expect(laidOutTop({ offsetParent: within }, within)).toBeUndefined();
    expect(laidOutTop(null, within)).toBeUndefined();
  });
});

describe("the question's own scroll after CHECK", () => {
  type Sent = { y: number; animated?: boolean };
  /** The question's scroll, driven by hand: where its tiles sit, where it goes, and every scroll it asks for. */
  function Scroller(props: {
    open: boolean;
    aim?: number;
    tops: Record<string, number>;
    placesAim?: number;
    sent: Sent[];
    whyOpened?: boolean;
    onScrollRef?: (scroll: (y: number) => void) => void;
  }) {
    const scrollRef = useRef({ scrollTo: (options: Sent) => props.sent.push(options) } as unknown as ScrollView);
    const scroll = useQuestionScroll({
      open: props.open,
      scrollRef,
      target: props.aim ?? 0,
      ready: props.aim !== undefined,
      settling: false,
      whyOpened: props.whyOpened ?? false,
      viewport: 400,
      partTop: null,
      placesNow: (): QuestionPlaces => ({ tops: props.tops, focus: "green", aim: props.placesAim })
    });
    props.onScrollRef?.(scroll.onScroll);
    return null;
  }

  it("scrolls up with tiles that fold above the green tile in that same commit, then glides on to where it goes", async () => {
    const sent: Sent[] = [];
    let onScroll: (y: number) => void = () => undefined;
    const { rerender } = await render(<Scroller open={false} tops={{ green: 600 }} sent={sent} onScrollRef={(scroll) => (onScroll = scroll)} />);
    // The learner scrolled down to the green tile, the last one.
    await act(async () => onScroll(400));
    await rerender(<Scroller open tops={{ green: 600 }} sent={sent} />);
    expect(sent).toEqual([]);
    // The grey tiles above it fold (300 px), and the sheet's room says the question goes to 50.
    await rerender(<Scroller open aim={50} tops={{ green: 300 }} placesAim={50} sent={sent} />);
    expect(sent).toEqual([
      { y: 100, animated: false },
      { y: 50, animated: true }
    ]);
  });

  it("goes straight to where it goes when that is short of where the green tile showed, and does not glide back", async () => {
    const sent: Sent[] = [];
    let onScroll: (y: number) => void = () => undefined;
    const { rerender } = await render(<Scroller open tops={{ green: 300 }} aim={76} placesAim={76} sent={sent} onScrollRef={(scroll) => (onScroll = scroll)} />);
    await act(async () => onScroll(76));
    sent.length = 0;
    // The Why line opens and the mascot hides: the prompt wraps 70 px shorter, and the question goes to 56.
    await rerender(<Scroller open tops={{ green: 230 }} aim={56} placesAim={56} sent={sent} />);
    expect(sent).toEqual([{ y: 56, animated: false }]);
  });

  it("once the Why line is open, goes on at once from where the fold left it, as the sheet has grown at once", async () => {
    const sent: Sent[] = [];
    let onScroll: (y: number) => void = () => undefined;
    const { rerender } = await render(<Scroller open tops={{ green: 300 }} aim={52} placesAim={52} sent={sent} onScrollRef={(scroll) => (onScroll = scroll)} />);
    await act(async () => onScroll(52));
    sent.length = 0;
    // The Why line opens and the mascot hides: the prompt wraps 70 px shorter. The scroll can take 52 of that (to the
    // top: where the question goes is not yet known from the places as laid out); the question then goes to 32 in
    // the same frame, so nothing moves down and back up.
    await rerender(<Scroller open whyOpened tops={{ green: 230 }} aim={32} sent={sent} />);
    expect(sent).toEqual([
      { y: 0, animated: false },
      { y: 32, animated: false }
    ]);
  });

  describe("when the fold comes before its new place is known", () => {
    // The frames the browser is about to draw, run by hand.
    let frames: (() => void)[] = [];
    let realFrame: typeof requestAnimationFrame;
    beforeEach(() => {
      frames = [];
      realFrame = global.requestAnimationFrame;
      global.requestAnimationFrame = ((run: FrameRequestCallback) => frames.push(() => run(0))) as typeof requestAnimationFrame;
    });
    afterEach(() => {
      global.requestAnimationFrame = realFrame;
    });

    async function foldThenPlace(frameBetween: boolean) {
      const sent: Sent[] = [];
      let onScroll: (y: number) => void = () => undefined;
      const { rerender } = await render(<Scroller open whyOpened tops={{ green: 300 }} aim={52} placesAim={52} sent={sent} onScrollRef={(scroll) => (onScroll = scroll)} />);
      await act(async () => onScroll(52));
      sent.length = 0;
      // The Why line opens and the mascot hides: the prompt wraps 70 px shorter while the question still settles.
      await rerender(<Scroller open whyOpened tops={{ green: 230 }} sent={sent} />);
      if (frameBetween) {
        frames.splice(0).forEach((run) => run());
      }
      // Its new place (32) is known.
      await rerender(<Scroller open whyOpened tops={{ green: 230 }} aim={32} sent={sent} />);
      return sent;
    }

    it("goes on at once when the place is found before the frame is drawn, so nothing moves down and back up", async () => {
      expect(await foldThenPlace(false)).toEqual([
        { y: 0, animated: false },
        { y: 32, animated: false }
      ]);
    });

    it("glides there when it is found only after a frame was drawn", async () => {
      expect(await foldThenPlace(true)).toEqual([
        { y: 0, animated: false },
        { y: 32, animated: true }
      ]);
    });
  });

  it("asks for its scroll before the frame is drawn, in the commit that knows where it goes", async () => {
    const sent: Sent[] = [];
    let sentInCommit: Sent[] | undefined;
    const Probe = ({ watch }: { watch: boolean }) => {
      React.useLayoutEffect(() => {
        if (watch && sentInCommit === undefined) {
          sentInCommit = sent.slice();
        }
      });
      return null;
    };
    const { rerender } = await render(
      <>
        <Scroller open tops={{ green: 300 }} sent={sent} />
        <Probe watch={false} />
      </>
    );
    await rerender(
      <>
        <Scroller open aim={72} tops={{ green: 300 }} placesAim={72} sent={sent} />
        <Probe watch />
      </>
    );
    expect(sentInCommit).toEqual([{ y: 72, animated: true }]);
  });
});

describe("a squeezed question settles in the commit its layout changes", () => {
  type Fit = { squeeze: boolean; fitted: boolean };
  /** A question whose layout changes (read at once) in the commit it is squeezed. */
  function Squeezed({ fits }: { fits: Fit[] }) {
    const [moved, setMoved] = React.useState(false);
    const fit = useSheetFit({ open: true, fullHeight: 300, room: moved ? 360 : 240, layoutKey: moved ? "after" : "before", squeezeMoves: true });
    React.useLayoutEffect(() => {
      if (fit.squeeze && !moved) {
        setMoved(true);
      }
    });
    fits.push({ squeeze: fit.squeeze, fitted: fit.fitted });
    return null;
  }

  it("stays squeezed and is fitted in the very next render, with no time to wait", async () => {
    const fits: Fit[] = [];
    await render(<Squeezed fits={fits} />);
    // Squeezed at once; the next render already has the new layout: it never lets go (a mascot back for a frame).
    expect(fits.every((fit) => fit.squeeze)).toBe(true);
    expect(fits[fits.length - 1]).toEqual({ squeeze: true, fitted: true });
    screen.unmount();
  });
});

describe("on the web a True / False question whose mascot hides is read at once", () => {
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
  const panelStyle = () => flat((screen.getByTestId("feedback-sheet").children[0] as unknown as { props: { style: object } }).props.style);
  const whyMax = () => flat(screen.getByTestId("feedback-why-scroll").props.style).maxHeight as number | undefined;
  const added = ["offsetHeight", "offsetTop", "offsetParent"] as const;
  beforeEach(() => {
    // The views as a browser lays them out: the question block, in it the prompt (a bubble 140 tall with the mascot,
    // 46 without, from 8) and the True / False row (108) right under it. Nothing else says its place at once.
    type Seen = { props: { testID?: string; children?: { props?: { hideMascot?: boolean } } } };
    const views: Record<string, Seen> = {};
    const promptHeight = (view: Seen) => (view.props.children?.props?.hideMascot ? 46 : 140);
    const promptOf = () => views["exercise-prompt"];
    const box = (view: Seen) => {
      const id = view.props.testID;
      if (id) {
        views[id] = view;
      }
      if (id === "exercise-question") return { top: 8, height: 400 };
      if (id === "exercise-prompt") return { top: 8, height: promptHeight(view), parent: views["exercise-question"] };
      if (id === "exercise-tiles") return { top: 8 + (promptOf() ? promptHeight(promptOf()) : 140), height: 108, parent: views["exercise-question"] };
      return undefined;
    };
    Object.defineProperty(View.prototype, "offsetHeight", { configurable: true, get(this: Seen) { return box(this)?.height; } });
    Object.defineProperty(View.prototype, "offsetTop", { configurable: true, get(this: Seen) { return box(this)?.top; } });
    Object.defineProperty(View.prototype, "offsetParent", { configurable: true, get(this: Seen) { return box(this)?.parent; } });
  });
  afterEach(() => {
    added.forEach((name) => delete (View.prototype as unknown as Record<string, unknown>)[name]);
    screen.unmount();
  });

  it("fits the sheet to the room the hidden mascot gives in that same commit, before any layout report comes", async () => {
    await render(<ExerciseView {...tf} selectedChoiceId="true" correctChoiceId="false" result={wrong} defaultWhyOpen />);
    await fireEvent(screen.getByTestId("exercise-view"), "layout", layout(480));
    // The prompt and the row are only read, never reported. The sheet: its answer part (76) and four Why lines.
    await fireEvent(screen.getByTestId("feedback-top"), "layout", layout(76));
    await fireEvent(screen.getByTestId("feedback-why-scroll"), "contentSizeChange", 288, 4 * WHY_LINE);
    // Too tall for the room under the row: the mascot hides, the prompt is two lines, and the sheet already has the
    // room under the row as it now sits (480 - (54 + 108) - 8 = 310): slim, two whole Why lines.
    expect(panelStyle().paddingTop).toBe(12);
    expect(whyMax()).toBe(2 * WHY_LINE);
  });
});

describe("on the web the sheet says its height before its first frame", () => {
  let restore: () => void = () => undefined;
  beforeEach(() => {
    jest.replaceProperty(Platform, "OS", "web");
    Object.defineProperty(View.prototype, "offsetHeight", {
      configurable: true,
      get(this: { props: { testID?: string } }) {
        return this.props.testID === "feedback-content" ? 180 : 0;
      }
    });
    restore = () => {
      delete (View.prototype as { offsetHeight?: number }).offsetHeight;
    };
  });
  afterEach(() => {
    restore();
    jest.restoreAllMocks();
    screen.unmount();
  });

  it("tells the question in the commit that opens it, not once a layout report comes after the frame", async () => {
    const onHeight = jest.fn();
    let toldInCommit: number[] | undefined;
    const Probe = ({ watch }: { watch: boolean }) => {
      React.useLayoutEffect(() => {
        if (watch && toldInCommit === undefined) {
          toldInCommit = onHeight.mock.calls.map((call) => call[0]);
        }
      });
      return null;
    };
    const sheet = (visible: boolean) => (
      <>
        <FeedbackSheet visible={visible} correct={false} correctLabel="Say Bismillah" why="We start with Allah's name." onContinue={jest.fn()} onHeight={onHeight} playSound={false} />
        <Probe watch={visible} />
      </>
    );
    const { rerender } = await render(sheet(false));
    await rerender(sheet(true));
    expect(toldInCommit).toEqual([180 + SHEET_PAD + inset]);
  });
});

describe("on the web, as the Why line opens, the sheet tells only the height it lays itself out at with the text's", () => {
  let restore: () => void = () => undefined;
  /** The sheet goes slim (12 px on top) once it knows how tall its Why text is and that it does not fit whole. */
  /** The Why text shows. */
  const whyNow = () => {
    try {
      return Boolean(screen.queryByTestId("feedback-why-text", { includeHiddenElements: true }));
    } catch {
      return false;
    }
  };
  const slimNow = () => {
    try {
      return flat((screen.getByTestId("feedback-sheet").children[0] as unknown as { props: { style: object } }).props.style).paddingTop === 12;
    } catch {
      // Still in its first render: full size.
      return false;
    }
  };
  beforeEach(() => {
    jest.replaceProperty(Platform, "OS", "web");
    // Its content is 200 tall with the Why line shut; open, 300 laid out full size with the whole Why text, 260 slim.
    Object.defineProperty(View.prototype, "offsetHeight", {
      configurable: true,
      get(this: { props: { testID?: string } }) {
        return this.props.testID === "feedback-content" ? (!whyNow() ? 200 : slimNow() ? 260 : 300) : 0;
      }
    });
    Object.defineProperty(View.prototype, "querySelector", {
      configurable: true,
      value(this: { props: { testID?: string } }, selector: string) {
        return this.props.testID === "feedback-content" && selector.includes("feedback-why-text") ? { offsetHeight: 66 } : null;
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

  it("never tells the height from before the Why text's was read, which the question would jump to and glide back from", async () => {
    const onHeight = jest.fn();
    // Room for the sheet without its Why text (180), not with it (254): it goes slim once it has read the text's height.
    await render(<FeedbackSheet visible correct={false} correctLabel="Say Bismillah" why="We start with Allah's name." maxHeight={220} onContinue={jest.fn()} onHeight={onHeight} playSound={false} />);
    onHeight.mockClear();
    await fireEvent.press(screen.getByTestId("feedback-why"));
    expect(slimNow()).toBe(true);
    const told = onHeight.mock.calls.map((call) => call[0]);
    expect(told).not.toContain(300 + SHEET_PAD + inset);
    expect(told[0]).toBe(260 + 12 + 8 + inset);
  });
});

describe("the Why text fades in where it rests", () => {
  it("does not slide, so its own scrolling box never cuts its first (or last) line as it shows", async () => {
    await render(<FeedbackSheet visible correct={false} correctLabel="Say Bismillah" why="We start with Allah's name." defaultWhyOpen onContinue={jest.fn()} playSound={false} />);
    const style = flat(screen.getByTestId("feedback-why-text").props.style);
    expect(style.transform).toBeUndefined();
    expect(style.opacity).toBeDefined();
    screen.unmount();
  });
});

describe("a score reads left to right in every language", () => {
  it("keeps the practice score's number before its total", async () => {
    const profile = createEmptyLearnerProfile();
    const daily = createFoundationAssessment(profile, "daily_challenge");
    const answer = (isCorrect: boolean) => ({
      questionId: daily.currentQuestion.id,
      category: daily.currentQuestion.category,
      difficulty: daily.currentQuestion.difficulty,
      selectedAnswer: "x",
      isCorrect,
      confidence: 2,
      responseTimeMs: 1000,
      answeredAt: new Date().toISOString()
    });
    jest.useFakeTimers();
    await render(<PracticeComplete assessment={{ ...daily, answerHistory: [answer(true), answer(false)] }} learnerProfile={profile} onContinue={jest.fn()} playSounds={false} />);
    // The number and its total ("/2") side by side, as a row.
    type Node = { props: { style?: unknown }; children?: readonly unknown[] };
    const rows: Node[] = [];
    const walk = (node: Node) => {
      if (flat(node.props.style).alignItems === "baseline") rows.push(node);
      (node.children ?? []).forEach((child) => typeof child === "object" && child !== null && walk(child as Node));
    };
    walk(screen.getByTestId("result-correct") as unknown as Node);
    expect(rows.length).toBeGreaterThan(0);
    rows.forEach((row) => expect(flat(row.props.style).direction).toBe("ltr"));
    await act(async () => {
      jest.advanceTimersByTime(3000);
    });
    jest.useRealTimers();
    screen.unmount();
  });

  it("keeps the lesson goal's XP before its total", async () => {
    jest.useFakeTimers();
    await render(<LessonComplete title="Wudu" xp={10} stars={3} streakDays={0} goal={{ xpToday: 10, goalXp: 40 }} mascotVariant="boy" accent="#21B573" onContinue={jest.fn()} />);
    let row = screen.getByText("/40").parent!;
    while (!flat(row.props.style).flexDirection) row = row.parent!;
    expect(flat(row.props.style).direction).toBe("ltr");
    await act(async () => {
      jest.advanceTimersByTime(3000);
    });
    jest.useRealTimers();
    screen.unmount();
  });
});

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

describe("after TRY AGAIN in the ordering game the sheet slides away over nothing it would cut", () => {
  const STEPS = ["Opening takbir", "Stand and recite", "Ruku, then stand", "Two sujud", "Tashahhud", "Taslim"];
  const options = STEPS.map((label, index) => ({ id: `s${index + 1}`, label }));
  const ids = options.map((option) => option.id);
  const game = { title: "Salah", prompt: "Put the steps in order!", options, correctOrderIds: ids, mascotVariant: "boy", accent: "#21B573", onDone: jest.fn() };
  const opacity = (testID: string) => flat(screen.getByTestId(testID, { includeHiddenElements: true }).props.style).opacity;
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it("shows the bank and the steps that come back only once the sheet has gone, then fades them in", async () => {
    await onSmallPhone(async () => {
      // The last two swapped: TRY AGAIN keeps the first four.
      await render(<OrderGame {...game} initialPlacedIds={[...ids.slice(0, 4), ids[5], ids[4]]} initialChecked />);
      await fireEvent.press(screen.getByTestId("feedback-continue"));
      // The sheet is still sliding away: the bank (the two steps to place again) is there but not shown, nor tappable.
      expect(opacity("order-bank")).toBe(0);
      expect(screen.getByTestId("order-bank", { includeHiddenElements: true }).props.pointerEvents).toBe("none");
      await act(async () => {
        jest.advanceTimersByTime(200);
      });
      // Shown again: it fades in from here (on the native driver), tappable at once.
      expect(screen.getByTestId("order-bank").props.pointerEvents).toBe("auto");
      expect(screen.getByTestId("order-bank").props["aria-hidden"]).toBe(false);
      await act(async () => {
        jest.advanceTimersByTime(500);
      });
    });
  });

  it("hides the steps the sheet had folded away while it goes, and keeps showing the ones above it", async () => {
    const inset = Platform.OS === "ios" ? 30 : 16;
    await onSmallPhone(async () => {
      await render(<OrderGame {...game} initialPlacedIds={[...ids.slice(0, 4), ids[5], ids[4]]} initialChecked />);
      await fireEvent(screen.getByTestId("order-game"), "layout", layout(500));
      await fireEvent(screen.getByTestId("order-prompt"), "layout", layout(40, 8));
      await fireEvent(screen.getByTestId("order-answer"), "layout", layout(6 * 32 - 4, 56));
      for (const [index, id] of ids.entries()) {
        await fireEvent(screen.getByTestId(`order-cell-${id}`), "layout", layout(28, index * 32));
      }
      // Its top at 500 - 380 = 120: the steps from the third on (56 + 64 + 28 > 118) fold away while it is up.
      await fireEvent(screen.getByTestId("feedback-content"), "layout", layout(380 - SHEET_PAD - inset));
      await act(async () => {
        jest.advanceTimersByTime(150);
      });
      expect(screen.queryByTestId("order-placed-s3")).toBeNull();
      await fireEvent.press(screen.getByTestId("feedback-continue"));
      // The first two showed above the sheet and stay; the third and fourth come back under it, not shown until it has gone.
      expect(opacity("order-cell-s1")).not.toBe(0);
      expect(opacity("order-cell-s2")).not.toBe(0);
      expect(opacity("order-cell-s3")).toBe(0);
      expect(opacity("order-cell-s4")).toBe(0);
      await act(async () => {
        jest.advanceTimersByTime(700);
      });
      expect(screen.getByTestId("order-cell-s3").props["aria-hidden"]).toBe(false);
    });
  });
});

describe("practice sorting and matching: the list sheet's top edge never cuts a row", () => {
  const daily = createFoundationAssessment(createEmptyLearnerProfile(), "daily_challenge");
  const match = FOUNDATION_QUESTION_BANK.find((entry) => entry.type === "match_pairs" && (entry.pairs?.length ?? 0) >= 3)!;
  const handlers = { onChangeSelectedAnswer: jest.fn(), onSubmit: jest.fn(), onContinue: jest.fn(), onExit: jest.fn() };
  const ROW = 64;
  const GAP = 10;

  it("hides the rows of pairs the sheet's edge would cut while it is up, and only those", async () => {
    await onSmallPhone(async () => {
      const state: FoundationAssessmentState = { ...daily, currentQuestion: match, answerHistory: [] };
      // Every left tile paired with the wrong right one.
      const lefts = (match.pairs ?? []).map((pair) => pair.left);
      const rights = (match.pairs ?? []).map((pair) => pair.right);
      const wrong = Object.fromEntries(lefts.map((left, index) => [left, rights[(index + 1) % rights.length]]));
      const done = submitFoundationAssessmentAnswer({ profile: createEmptyLearnerProfile(), state, selectedAnswer: wrong, responseTimeMs: 3000 }).stateWithFeedback;
      await render(<FoundationAssessmentScreen assessment={done} language="en" selectedAnswer={wrong} {...handlers} />);
      const rows = lefts.map((left) => {
        let node = screen.getByTestId(`match-left-${left}`, { includeHiddenElements: true }).parent!;
        while (!node.props.onLayout) node = node.parent!;
        return node;
      });
      // The room is 400 tall over a 100 px bar; the prompt at 40-90, the answers from 90: rows at 0, 74, 148, ... in them.
      await fireEvent(screen.getByTestId("assessment-scroll-box"), "layout", layout(400));
      await fireEvent(screen.getByTestId("assessment-bar"), "layout", layout(100));
      await fireEvent(screen.getByTestId("assessment-prompt"), "layout", layout(50, 40));
      await fireEvent(screen.getByTestId("assessment-answers"), "layout", layout(lefts.length * (ROW + GAP) - GAP, 100));
      for (const [index, row] of rows.entries()) {
        await fireEvent(row, "layout", layout(ROW, index * (ROW + GAP)));
      }
      // The sheet 300 tall: the question scrolls to the prompt's top less its margin (32), so the sheet's top sits at
      // 32 + 500 - 300 = 232 in the content, 142 into the answers: the first two rows (to 64 and to 138) end above it
      // and stay, the third (148-212) and any after it would be cut or covered and go.
      await fireEvent(screen.getByTestId("feedback-content"), "layout", layout(300 - SHEET_PAD - inset));
      expect(rows.length).toBeGreaterThanOrEqual(3);
      rows.slice(0, 2).forEach((row) => expect(flat(row.props.style).opacity).not.toBe(0));
      rows.slice(2).forEach((row) => expect(flat(row.props.style).opacity).toBe(0));
    });
  });
});

describe("a missed answer in a pick-all-that-fit question keeps its size at CHECK", () => {
  it("gives what its thinner dashed lip leaves to the padding under its text, never to a margin", async () => {
    const daily = createFoundationAssessment(createEmptyLearnerProfile(), "daily_challenge");
    const question = FOUNDATION_QUESTION_BANK.find((entry) => entry.type === "multi_select" && Array.isArray(entry.correctAnswer) && entry.correctAnswer.length >= 2)!;
    const rights = question.correctAnswer as string[];
    // One right answer picked, the other missed.
    const picked = [rights[0]];
    const state: FoundationAssessmentState = { ...daily, currentQuestion: question, answerHistory: [] };
    const done = submitFoundationAssessmentAnswer({ profile: createEmptyLearnerProfile(), state, selectedAnswer: picked, responseTimeMs: 3000 }).stateWithFeedback;
    const handlers = { onChangeSelectedAnswer: jest.fn(), onSubmit: jest.fn(), onContinue: jest.fn(), onExit: jest.fn() };
    await render(<FoundationAssessmentScreen assessment={done} language="en" selectedAnswer={picked} {...handlers} />);
    const tile = (label: string) => flat(screen.getByLabelText(label, { includeHiddenElements: true }).props.style);
    const missed = tile(`${rights[1]}, missed`);
    const right = tile(rights[0]);
    // The same height under the text as any other tile (lip and padding), the text in the same place, no margin.
    expect(missed.marginBottom ?? 0).toBe(0);
    expect(Number(missed.borderBottomWidth) + Number(missed.paddingBottom ?? missed.paddingVertical)).toBe(Number(right.borderBottomWidth) + Number(right.paddingBottom ?? right.paddingVertical));
    expect(missed.paddingTop ?? missed.paddingVertical).toBe(right.paddingTop ?? right.paddingVertical);
    expect(missed.minHeight).toBe(right.minHeight);
    screen.unmount();
  });
});
