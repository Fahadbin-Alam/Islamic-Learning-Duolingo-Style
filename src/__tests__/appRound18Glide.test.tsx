jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

import React from "react";
import { Dimensions, Platform, StyleSheet, Text } from "react-native";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { FoundationAssessmentScreen } from "../components/FoundationLearning";
import { FOUNDATION_QUESTION_BANK } from "../data/foundationQuestionBank";
import { createEmptyLearnerProfile, createFoundationAssessment, submitFoundationAssessmentAnswer } from "../services/foundationAssessment";
import type { FoundationAssessmentState } from "../types";
import { ExerciseView } from "../ui/lesson";
import { WHY_LINE } from "../ui/lesson/FeedbackSheet";
import { FoldGap } from "../ui/lesson";
import { SHEET_RISE_MS, Sheet, sheetRise } from "../ui/Sheet";
import { GLIDE_MS, GLIDE_WATCH_MS, foldRooms, foldSoak, gapsAbove, reachesText, sheetRoom, sheetScrollY, showsWhole, textInRoom, useGlideIn, type GlideRead } from "../ui/lesson/sheetFit";

const layout = (height: number, y = 0, width = 288) => ({ nativeEvent: { layout: { x: 0, y, width, height } } });
const flat = (style: unknown) => (StyleSheet.flatten(style as never) ?? {}) as Record<string, unknown>;
const wait = (ms: number) => act(async () => new Promise<void>((done) => setTimeout(done, ms)));

describe("tiles folding above the green tile of a question the learner scrolled down", () => {
  it("are taken up by the scroll only as far back as where the question then goes", () => {
    // Scrolled to 272; with the folds done and closed the question goes to 52: the scroll can take 220 px back.
    expect(foldSoak(272, 52)).toBe(220);
    // A question that goes on down from where it sits takes none up: its room closes the same way it goes.
    expect(foldSoak(30, 100)).toBe(0);
    expect(foldSoak(0, 0)).toBe(0);
  });

  it("leave the rest of their room to close with the sheet, so the green tile never moves in one frame", () => {
    const tiles = [
      { id: "b", room: 104, above: true },
      { id: "c", room: 104, above: true },
      { id: "d", room: 104, above: true }
    ];
    // Before, the whole scroll (272) went to them and the question stopped short at 52 instead: the green tile jumped
    // 52 px in one frame and turned back. Now 92 px stay open and close with the sheet's spring.
    expect(foldRooms(tiles, foldSoak(272, 52))).toEqual({ rooms: { b: 0, c: 0, d: 92 }, left: 0 });
  });

  it("are worked out with their room closed for where the question goes, and with what has closed for where they sit", () => {
    const within = { offsetTop: 0 };
    // A gap that opened 40 px tall and has closed to 30, and one under the tile that does not count.
    const above = { view: { offsetTop: 100, offsetParent: within, offsetHeight: 30 }, from: 40 };
    const under = { view: { offsetTop: 300, offsetParent: within, offsetHeight: 50 }, from: 50 };
    expect(gapsAbove([above, under], within, 200)).toEqual({ closed: 10, held: 40 });
    expect(gapsAbove([above, under], within, 50)).toEqual({ closed: 0, held: 0 });
    // Shut at once (the Why line opened): all of it has closed.
    expect(gapsAbove([{ ...above, view: { ...above.view, offsetHeight: 0 } }], within, 200)).toEqual({ closed: 40, held: 40 });
  });
});

describe("the sheet at its least reaching into the green tile's text", () => {
  // Where the green tile is gone once the sheet is up: its bottom further down than the sheet's top edge and its text
  // edge, the question scrolled as far as it may go (the way ExerciseView and practice tell it).
  const cuts = (layout: { visibleBottom: number; promptTop: number; focusTop: number; focusBottom: number }, sheet: number, edge: number) => {
    const { furthest } = sheetRoom(layout);
    return layout.focusBottom > sheetScrollY(layout, sheet, furthest) + layout.visibleBottom - sheet + edge;
  };

  it("says so by the same edge as the green tile is gone at, so the picked tile folds first", () => {
    // An Arabic My lessons question at 320 x 568: the sheet at its least, its Why line open, is 290 tall; with the
    // picked tile kept its top would sit a pixel into the green tile's text.
    const soft = { visibleBottom: 512, promptTop: 41, focusTop: 210, focusBottom: 271 };
    expect(cuts(soft, 290, 15)).toBe(true);
    expect(reachesText(soft, 290, 15)).toBe(true);
    expect(cuts(soft, 289, 15)).toBe(false);
    expect(reachesText(soft, 289, 15)).toBe(false);
  });

  it("says the same as where the green tile is gone, wherever it sits, its places not rounded", () => {
    for (let bottom = 150; bottom <= 300; bottom += 0.3) {
      const layout = { visibleBottom: 512, promptTop: 41, focusTop: bottom - 61, focusBottom: bottom };
      for (let sheet = 180; sheet <= 360; sheet += 0.5) {
        expect(reachesText(layout, sheet, 15)).toBe(cuts(layout, sheet, 15));
      }
    }
  });
});

describe("the room a fold leaves while the sheet comes up", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  const gapHeight = () => Number(flat(screen.getByTestId("fold-gap").props.style).height);

  it("follows the sheet's own spring, which reaches its place and stops there", () => {
    expect(SHEET_RISE_MS).toBeGreaterThan(150);
    expect(SHEET_RISE_MS).toBeLessThan(200);
    let last = 0;
    for (let ms = 0; ms <= (SHEET_RISE_MS ?? 0); ms += 4) {
      const now = sheetRise(ms);
      expect(now).toBeGreaterThanOrEqual(last);
      expect(now).toBeLessThanOrEqual(1);
      last = now;
    }
    expect(sheetRise(SHEET_RISE_MS ?? 0)).toBe(1);
  });

  it("opening a few frames after the sheet set off, closes as the rest of its way goes and is shut as it arrives", async () => {
    const sheet = (
      <Sheet visible noOvershoot>
        <Text>Correct answer</Text>
      </Sheet>
    );
    const { rerender } = await render(sheet);
    await act(async () => {
      jest.advanceTimersByTime(48);
    });
    // The fold is known three frames on: its gap opens there, as tall as the tile was.
    await rerender(
      <>
        {sheet}
        <FoldGap height={100} />
      </>
    );
    expect(gapHeight()).toBe(100);
    const opened = sheetRise(48);
    await act(async () => {
      jest.advanceTimersByTime(72);
    });
    // As far along the rest of its way as the sheet is along the rest of its own (a spring of its own, set off now,
    // would still have half of it open).
    expect(Math.abs(gapHeight() - (100 * (1 - sheetRise(120))) / (1 - opened))).toBeLessThan(4);
    await act(async () => {
      jest.advanceTimersByTime(Math.ceil((SHEET_RISE_MS ?? 0) - 120) + 17);
    });
    expect(gapHeight()).toBe(0);
    screen.unmount();
  });
});

describe("a tile's text whole in its room", () => {
  it("counts only its lines, not its border, padding or lip", () => {
    expect(showsWhole({ top: 60, bottom: 120 }, 56, 440)).toBe(true);
    expect(showsWhole({ top: 419, bottom: 498 }, 56, 440)).toBe(false);
    expect(showsWhole({ top: 40, bottom: 100 }, 56, 440)).toBe(false);
    // A tile 228-296 in its content, its text 11 px in from its top and 15 from its bottom: in a room 200 tall it shows
    // whole once the question is scrolled to 81, not at its top.
    expect(textInRoom({ top: 228, bottom: 296 }, { top: 11, bottom: 15 }, 0, 200)).toBe(false);
    expect(textInRoom({ top: 228, bottom: 296 }, { top: 11, bottom: 15 }, 81, 200)).toBe(true);
  });
});

describe("a tile out of sight as CHECK is tapped glides in unseen and fades in once whole", () => {
  type Reading = Record<string, GlideRead | undefined>;
  function Probe(props: { open: boolean; tryKey?: string; reading: Reading; laidOut?: Record<string, boolean> }) {
    const hidden = useGlideIn({
      open: props.open,
      tryKey: props.tryKey ?? "q1",
      ids: Object.keys(props.reading).length ? Object.keys(props.reading) : Object.keys(props.laidOut ?? {}),
      read: (id) => props.reading[id],
      laidOut: (id) => props.laidOut?.[id]
    });
    return <Text testID="hidden">{hidden.join(",")}</Text>;
  }
  const hidden = () => String(screen.getByTestId("hidden").props.children ?? "");
  const room = { top: 56, bottom: 440 };

  it("keeps out of sight, from the frame the sheet opens, a tile whose text was not whole in the room", async () => {
    const reading: Reading = { a: { text: { top: 100, bottom: 160 }, ...room }, d: { text: { top: 451, bottom: 520 }, ...room, sheetTop: 900 } };
    const { rerender } = await render(<Probe open={false} reading={reading} />);
    expect(hidden()).toBe("");
    await rerender(<Probe open reading={reading} />);
    expect(hidden()).toBe("d");
    // On its way up the room's edge would cut it: it stays out of sight.
    reading.d = { text: { top: 365, bottom: 445 }, ...room, sheetTop: 700 };
    await wait(40);
    expect(hidden()).toBe("d");
    // Whole in the room but under the rising sheet's top edge: still out of sight.
    reading.d = { text: { top: 320, bottom: 400 }, ...room, sheetTop: 380 };
    await wait(40);
    expect(hidden()).toBe("d");
    // Whole above both: it fades in.
    reading.d = { text: { top: 300, bottom: 380 }, ...room, sheetTop: 400 };
    await wait(40);
    expect(hidden()).toBe("");
  });

  it("lets go of a tile that folds away, and shows every tile again on the next try", async () => {
    const reading: Reading = { c: { text: { top: 460, bottom: 500 }, ...room } };
    const { rerender } = await render(<Probe open={false} reading={reading} />);
    await rerender(<Probe open reading={reading} />);
    expect(hidden()).toBe("c");
    reading.c = undefined;
    await wait(40);
    expect(hidden()).toBe("");
    reading.c = { text: { top: 460, bottom: 500 }, ...room };
    await rerender(<Probe open={false} tryKey="q1-again" reading={reading} />);
    expect(hidden()).toBe("");
  });

  it("lets in a tile the room's edge still cuts once the question has come to rest", async () => {
    const reading: Reading = { d: { text: { top: 451, bottom: 520 }, ...room, sheetTop: 900 } };
    const { rerender } = await render(<Probe open={false} reading={reading} />);
    await rerender(<Probe open reading={reading} />);
    expect(hidden()).toBe("d");
    // It rests with its last line under the room's bottom edge: no glide is left to cut it on its way.
    reading.d = { text: { top: 420, bottom: 470 }, ...room, sheetTop: 900 };
    await wait(GLIDE_WATCH_MS - 300);
    expect(hidden()).toBe("d");
    await wait(400);
    expect(hidden()).toBe("");
  });

  it("where no frame can be read, goes by the places the views reported and fades in once the sheet has come up", async () => {
    const { rerender } = await render(<Probe open={false} reading={{}} laidOut={{ a: true, d: false }} />);
    await rerender(<Probe open reading={{}} laidOut={{ a: true, d: false }} />);
    expect(hidden()).toBe("d");
    await wait(GLIDE_MS + 50);
    expect(hidden()).toBe("");
  });
});

describe("a wrong pick above the green tile at 320 wide", () => {
  const inset = Platform.OS === "ios" ? 30 : 16;
  const SHEET_PAD = 20 + 16;
  const SLIM_SAVES = 32;
  const TILE = 68;
  const GAP = 8;
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
  const result = { correct: false, correctLabel: lesson.choices[1].label, why: "Allah rewards kindness to every living thing." };
  const full = 40 + 76 + 8 + WHY_LINE + 16 + 58 + SHEET_PAD + inset;
  const least = full - SLIM_SAVES;
  const tileWrapper = (id: string) => {
    let node = screen.getByTestId(`choice-${id}`, { includeHiddenElements: true }).parent!;
    while (!node.props.onLayout) node = node.parent!;
    return node;
  };
  const visible = (id: string) => screen.queryByTestId(id) !== null;
  const drawn = (id: string) => screen.queryByTestId(id, { includeHiddenElements: true }) !== null;
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

  it("stays while the sheet at its least reaches no further into the green tile than its lip and padding", async () => {
    // The prompt at 16 (39 tall), the tiles from 55, 76 apart: a (picked) 55-123, b (green) 131-199. The question may
    // scroll 8 px. The sheet at its least has its top at 8 + 185 = 193: 6 px into b, under its text (15 px from its
    // bottom). The picked tile stays, as main keeps it, and nothing jumps as the Why line opens.
    await render(<ExerciseView {...lesson} selectedChoiceId="a" result={result} defaultWhyOpen />);
    await fireEvent(screen.getByTestId("exercise-view"), "layout", layout(least + 185));
    await fireEvent(screen.getByTestId("exercise-prompt"), "layout", layout(39, 8));
    for (const [index, id] of ["a", "b", "c", "d"].entries()) {
      await fireEvent(tileWrapper(id), "layout", layout(TILE, index * (TILE + GAP)));
    }
    await fireEvent(screen.getByTestId("exercise-tiles"), "layout", layout(4 * TILE + 3 * GAP, 47));
    await fireEvent(screen.getByTestId("feedback-top"), "layout", layout(76));
    await fireEvent(screen.getByTestId("feedback-why-scroll"), "contentSizeChange", 288, WHY_LINE);
    await fireEvent(screen.getByTestId("feedback-content"), "layout", layout(full - SHEET_PAD - inset));
    expect(visible("choice-a")).toBe(true);
    expect(visible("choice-b")).toBe(true);
    // The grey tiles fold away.
    expect(drawn("choice-c")).toBe(false);
    expect(drawn("choice-d")).toBe(false);
  });

  it("folds as soon as the sheet at its least would reach a pixel into the green tile's text", async () => {
    // The sheet at its least has its top at 8 + 175 = 183: 16 px into b, a pixel into its text. Kept, b would be gone
    // under the sheet; a folds instead and b stays, whole above it.
    await render(<ExerciseView {...lesson} selectedChoiceId="a" result={result} defaultWhyOpen />);
    await fireEvent(screen.getByTestId("exercise-view"), "layout", layout(least + 175));
    await fireEvent(screen.getByTestId("exercise-prompt"), "layout", layout(39, 8));
    for (const [index, id] of ["a", "b", "c", "d"].entries()) {
      await fireEvent(tileWrapper(id), "layout", layout(TILE, index * (TILE + GAP)));
    }
    await fireEvent(screen.getByTestId("exercise-tiles"), "layout", layout(4 * TILE + 3 * GAP, 47));
    await fireEvent(screen.getByTestId("feedback-top"), "layout", layout(76));
    await fireEvent(screen.getByTestId("feedback-why-scroll"), "contentSizeChange", 288, WHY_LINE);
    await fireEvent(screen.getByTestId("feedback-content"), "layout", layout(full - SHEET_PAD - inset));
    expect(drawn("choice-a")).toBe(false);
    expect(visible("choice-b")).toBe(true);
  });
});

describe("a wrong pick above the right answer in practice at 320 wide", () => {
  const inset = Platform.OS === "ios" ? 30 : 16;
  const SHEET_PAD = 20 + 16;
  const SLIM_SAVES = 32;
  const daily = createFoundationAssessment(createEmptyLearnerProfile(), "daily_challenge");
  const handlers = () => ({ onChangeSelectedAnswer: jest.fn(), onSubmit: jest.fn(), onContinue: jest.fn(), onExit: jest.fn() });
  const base = FOUNDATION_QUESTION_BANK.find((entry) => entry.type === "multiple_choice" && (entry.options?.length ?? 0) === 4 && typeof entry.correctAnswer === "string")!;
  const answer = base.correctAnswer as string;
  const others = (base.options ?? []).filter((option) => option !== answer);
  const question = { ...base, options: [others[0], answer, ...others.slice(1)] };
  const picked = others[0];
  const state: FoundationAssessmentState = { ...daily, currentQuestion: question };
  const checked = submitFoundationAssessmentAnswer({ profile: createEmptyLearnerProfile(), state, selectedAnswer: picked, responseTimeMs: 3000 }).stateWithFeedback;
  const tile = (option: string) => `assessment-tile-${option}`;
  const full = 40 + 76 + 16 + 58 + SHEET_PAD + inset;
  const least = full - SLIM_SAVES;
  const visible = (id: string) => screen.queryByTestId(id) !== null;
  const drawn = (id: string) => screen.queryByTestId(id, { includeHiddenElements: true }) !== null;
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

  it("stays while the sheet at its least reaches no further into the right answer than its lip and padding", async () => {
    // The prompt at 38 (46 tall), the answers from 84, 64 apart: the picked one 84-138, the right one 148-202. The
    // question may scroll 30 px; the sheet at its least has its top at 30 + 170 = 200, 2 px into the right answer.
    await render(<FoundationAssessmentScreen assessment={checked} language="en" selectedAnswer={picked} {...handlers()} />);
    await fireEvent(screen.getByTestId("assessment-scroll-box"), "layout", layout(least + 170));
    await fireEvent(screen.getByTestId("assessment-prompt"), "layout", layout(46, 38));
    for (const [index, option] of question.options.entries()) {
      await fireEvent(screen.getByTestId(tile(option)), "layout", layout(54, index * 64));
    }
    await fireEvent(screen.getByTestId("assessment-answers"), "layout", layout(4 * 54 + 3 * 10, 84));
    await fireEvent(screen.getByTestId("feedback-top"), "layout", layout(76));
    await fireEvent(screen.getByTestId("feedback-content"), "layout", layout(full - SHEET_PAD - inset));
    expect(visible(tile(picked))).toBe(true);
    expect(visible(tile(answer))).toBe(true);
    others.slice(1).forEach((option) => expect(drawn(tile(option))).toBe(false));
  });

  it("folds as soon as the sheet at its least would reach a pixel into the right answer's text", async () => {
    // The sheet at its least has its top at 30 + 156 = 186: 16 px into the right answer, a pixel into its text.
    await render(<FoundationAssessmentScreen assessment={checked} language="en" selectedAnswer={picked} {...handlers()} />);
    await fireEvent(screen.getByTestId("assessment-scroll-box"), "layout", layout(least + 156));
    await fireEvent(screen.getByTestId("assessment-prompt"), "layout", layout(46, 38));
    for (const [index, option] of question.options.entries()) {
      await fireEvent(screen.getByTestId(tile(option)), "layout", layout(54, index * 64));
    }
    await fireEvent(screen.getByTestId("assessment-answers"), "layout", layout(4 * 54 + 3 * 10, 84));
    await fireEvent(screen.getByTestId("feedback-top"), "layout", layout(76));
    await fireEvent(screen.getByTestId("feedback-content"), "layout", layout(full - SHEET_PAD - inset));
    expect(drawn(tile(picked))).toBe(false);
    expect(visible(tile(answer))).toBe(true);
  });
});

describe("a lesson question whose green tile rests out of sight under the room's edge", () => {
  const lesson = {
    kind: "multiple_choice" as const,
    prompt: "Which of these is a pillar of Islam?",
    choices: [
      { id: "a", label: "Travelling" },
      { id: "b", label: "Trading" },
      { id: "c", label: "Sleeping" },
      { id: "d", label: "Prayer" }
    ],
    correctChoiceId: "d",
    mascotVariant: "boy",
    accent: "#21B573",
    onSelect: jest.fn(),
    onCheck: jest.fn(),
    onContinue: jest.fn()
  };
  const tileWrapper = (id: string) => {
    let node = screen.getByTestId(`choice-${id}`, { includeHiddenElements: true }).parent!;
    while (!node.props.onLayout) node = node.parent!;
    return node;
  };
  const visible = (id: string) => screen.queryByTestId(id) !== null;
  afterEach(() => screen.unmount());

  async function rest(picked: string) {
    const view = await render(<ExerciseView {...lesson} selectedChoiceId={picked} />);
    await fireEvent(screen.getByTestId("exercise-view"), "layout", layout(560));
    await fireEvent(screen.getByTestId("exercise-room"), "layout", layout(200));
    await fireEvent(screen.getByTestId("exercise-prompt"), "layout", layout(39, 8));
    for (const [index, id] of ["a", "b", "c", "d"].entries()) {
      await fireEvent(tileWrapper(id), "layout", layout(68, index * 76));
    }
    await fireEvent(screen.getByTestId("exercise-tiles"), "layout", layout(4 * 68 + 3 * 8, 47));
    return view;
  }

  it("glides it in unseen, so the room's edge never cuts its text, and fades it in once the sheet has come up", async () => {
    const { rerender } = await rest("a");
    expect(visible("choice-d")).toBe(true);
    await rerender(<ExerciseView {...lesson} selectedChoiceId="a" result={{ correct: false, correctLabel: "Prayer" }} />);
    expect(visible("choice-d")).toBe(false);
    // The sheet names it meanwhile.
    expect(screen.getByTestId("feedback-answer")).toBeTruthy();
    expect(visible("choice-a")).toBe(true);
    await wait(GLIDE_MS + 50);
    expect(visible("choice-d")).toBe(true);
    expect(flat(screen.getByTestId("choice-d").props.style).opacity ?? 1).not.toBe(0);
  });

  it("never hides a green tile that showed whole", async () => {
    const { rerender } = await rest("d");
    await rerender(<ExerciseView {...lesson} selectedChoiceId="a" correctChoiceId="a" result={{ correct: true, correctLabel: "Travelling" }} />);
    expect(visible("choice-a")).toBe(true);
  });
});
