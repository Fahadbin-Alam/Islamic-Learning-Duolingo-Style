import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type StyleProp,
  type ViewStyle
} from "react-native";
import type { GameSoundEvent } from "../../services/gameSoundLibrary";
import { ArabicText, hasArabic, isArabicOnly, isQuranText, withHonorifics } from "../ArabicText";
import { ChoiceTile, LONG_LABEL, tightSaving, tileTextBottom, type ChoiceTileState } from "../ChoiceTile";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { Mascot, type MascotMood } from "../Mascot";
import { POP_IN_DISTANCE, PopIn } from "../PopIn";
import { SHEET_SPRING } from "../Sheet";
import { SpeechBubble } from "../SpeechBubble";
import { colors, darken, fonts, lighten, radii, space } from "../theme";
import { FeedbackSheet, type FeedbackSource } from "./FeedbackSheet";
import { BAR_GAP, LessonBottomBar } from "./LessonHeader";
import { noBreakHyphens, shortWhy } from "./lessonText";
import { EVERY_FRAME, SCROLL_HINT_SLACK, scrollHintGrowth, useScrollMore } from "./ScrollHint";
import { getActiveLanguage, t } from "../../i18n";
import {
  centerSpace,
  fitLook,
  foldRooms,
  laidOutBox,
  laidOutHeight,
  laidOutTop,
  overRoom,
  questionStops,
  sameBlock,
  sameRoom,
  sheetRoom,
  sheetScrollY,
  stackSpan,
  textRoom,
  tilesUnderSheet,
  usePickFold,
  useQuestionFit,
  useQuestionScroll,
  useSheetFit,
  useSheetHeightNow,
  useStopsArrow,
  type BlockRead,
  type LayoutBox,
  type QuestionPlaces,
  type RoomRead,
  type RowSpan
} from "./sheetFit";

// Arabic letters only: honorific signs like ﷺ (U+FDF0-U+FDFF) stay part of the English line.
const AR = "؀-ۿݐ-ݿࢠ-ࣿﭐ-﴿ﵐ-﷎ﹰ-﻿";
const ARABIC_RUN = new RegExp(`([${AR}][${AR}\\s]*[${AR}]|[${AR}])`);
const ARABIC_RUN_GLOBAL = new RegExp(ARABIC_RUN.source, "g");
const LATIN = /[A-Za-z]/;
/** A reference after the Arabic, e.g. "(Quran 1:3)". */
const REFERENCE_TAIL = /^\s*\(([^()]*\d[^()]*)\)\s*[.?!]?\s*$/;
const QUOTE_EDGE = /["“”'‘’«»]/;

/** Short phones (iPhone SE, small Androids): smaller mascot, tighter tiles. */
export function useLessonCompact() {
  const { width, height } = useWindowDimensions();
  return { compact: height > 0 && height < 700, narrow: width > 0 && width < 360 };
}

/** English text with unbreakable hyphens and a real glyph for ﷺ. */
function englishText(value: string) {
  return withHonorifics(noBreakHyphens(value));
}

/** Arabic shown as its own block under the English line: right-aligned and smaller once it is a paragraph. */
function ArabicBlock({ text, size, quran }: { text: string; size: number; quran: boolean }) {
  const length = text.length;
  const paragraph = length > 30;
  const fontSize = Math.round(size * (length <= 30 ? 1.55 : length <= 90 ? 1.35 : 1.2));
  return (
    <ArabicText
      size={fontSize}
      weight="bold"
      quran={quran}
      color={colors.ink}
      align={paragraph ? "right" : "center"}
      style={[styles.promptArabicLine, paragraph ? styles.promptArabicParagraph : null]}
      testID="prompt-arabic"
    >
      {text}
    </ArabicText>
  );
}

/**
 * Prompt text. All-Arabic prompts use the Arabic face. When the English sentence is complete before
 * the Arabic ("What does this ayah mean? <ayah> (Quran 1:3)"), the Arabic gets its own block and the
 * reference a small caption. When the Arabic sits inside the sentence ("What does بِسْمِ اللَّهِ mean?")
 * it stays inline, so the English always reads as written. ﷺ is part of the English line.
 */
export function PromptText({ children, size = 19 }: { children: string; size?: number }) {
  const lineStyle = [styles.prompt, { fontSize: size, lineHeight: Math.round(size * 1.35) }];
  if (isArabicOnly(children)) {
    const quran = isQuranText(children);
    return (
      <ArabicText size={Math.round(size * (quran ? 1.3 : 1.5))} weight="bold" quran={quran} align="right" style={styles.promptArabicParagraph}>
        {children}
      </ArabicText>
    );
  }
  if (!hasArabic(children)) {
    return <Text style={lineStyle}>{englishText(children)}</Text>;
  }

  const runs = [...children.matchAll(ARABIC_RUN_GLOBAL)];
  const start = runs[0]?.index ?? 0;
  const lastRun = runs[runs.length - 1];
  const end = (lastRun?.index ?? 0) + (lastRun?.[0].length ?? 0);
  const middle = children.slice(start, end).trim();
  const before = children.slice(0, start).replace(new RegExp(`${QUOTE_EDGE.source}\\s*$`), "").trim();
  const after = children.slice(end).replace(new RegExp(`^\\s*${QUOTE_EDGE.source}`), "").trim();
  // The English before the Arabic is a whole sentence (or there is none): the Arabic can stand alone.
  const standsAlone = !LATIN.test(middle) && (before === "" || /[?:.!]$/.test(before));

  if (standsAlone) {
    const reference = after.match(REFERENCE_TAIL)?.[1]?.trim();
    const quran = isQuranText(middle) || /\b(ayah|quran|surah)\b/i.test(`${before} ${after}`);
    const tail = reference ? "" : after.replace(/^[\s—–:,-]+/, "");
    return (
      <View style={styles.promptStack}>
        {before ? <Text style={lineStyle}>{englishText(before)}</Text> : null}
        <ArabicBlock text={middle} size={size} quran={quran} />
        {reference ? (
          <Text style={[styles.reference, middle.length > 30 ? styles.referenceEnd : null]} testID="prompt-reference">
            {withHonorifics(reference.replace(/\s+/g, " "))}
          </Text>
        ) : null}
        {tail ? <Text style={lineStyle}>{englishText(tail)}</Text> : null}
      </View>
    );
  }

  const parts = children.split(ARABIC_RUN).filter((part) => part.length > 0);
  const arabicSize = Math.round(size * 1.3);
  return (
    <Text style={[styles.prompt, { fontSize: size, lineHeight: Math.round(arabicSize * 1.45) }]}>
      {parts.map((part, index) =>
        hasArabic(part) ? (
          <Text key={index} style={[styles.promptArabic, { fontSize: arabicSize }, isQuranText(part) ? styles.promptQuran : null]}>
            {"⁧"}
            {part}
            {"⁩"}
          </Text>
        ) : (
          <Text key={index}>{englishText(part)}</Text>
        )
      )}
    </Text>
  );
}

/** Prompts longer than this drop the mascot and use the full width. */
const LONG_PROMPT = 110;

/** How much smaller a prompt is for a question too tall for its room otherwise (see sheetFit's FIT_STEPS). */
export const SMALL_PROMPT_STEP = 2;

export type QuestionBubbleProps = {
  prompt: string;
  mascotVariant: string;
  accent: string;
  mood?: MascotMood;
  /** Hide the mascot (short screens); the prompt then shows full width. */
  hideMascot?: boolean;
  /** The mascot hides after the prompt showed (to make room for the feedback sheet): the prompt does not pop in again. */
  still?: boolean;
  /** A smaller prompt across the full width, for a question too tall for its room otherwise (see sheetFit's FIT_STEPS). */
  small?: boolean;
  /** Less room under the prompt, for the same reason. */
  smallGaps?: boolean;
};

/** Mascot next to a speech bubble holding the question. Very long prompts drop the mascot and use the full width. */
export function QuestionBubble({ prompt, mascotVariant, accent, mood = "think", hideMascot, still, small, smallGaps }: QuestionBubbleProps) {
  const { compact, narrow } = useLessonCompact();
  const long = prompt.length > LONG_PROMPT;
  const promptSize = (long || compact ? 17 : narrow ? 18 : 19) - (small ? SMALL_PROMPT_STEP : 0);
  if (long || hideMascot || small) {
    const plainStyle = [styles.plainPrompt, compact ? styles.plainPromptCompact : null, smallGaps ? styles.plainPromptSmallGaps : null];
    const text = <PromptText size={promptSize}>{prompt}</PromptText>;
    return still && !long ? (
      <View style={plainStyle}>{text}</View>
    ) : (
      <PopIn from="up" delay={60} style={plainStyle}>
        {text}
      </PopIn>
    );
  }
  const mascotSize = compact ? 64 : narrow ? 72 : 96;
  return (
    <View style={[styles.questionRow, compact ? styles.questionRowCompact : null]}>
      <Mascot variant={mascotVariant} mood={mood} accent={accent} size={mascotSize} />
      <PopIn from="up" delay={60} style={styles.bubbleWrap}>
        <SpeechBubble>
          <PromptText size={promptSize}>{prompt}</PromptText>
        </SpeechBubble>
      </PopIn>
    </View>
  );
}

const FADE_MS = 160;

/**
 * The room a part folded away left while the feedback sheet comes up (a grey tile, or the lines a prompt gave up as
 * the mascot hid): it closes with the sheet's own spring, so what sits under it glides up as the sheet rises, never in
 * one frame, and what sits above it stays put. `shut`: gone at once (the Why line opened, and the sheet grew at once).
 */
export function FoldGap({
  height,
  shut,
  viewRef,
  style
}: {
  height: number;
  shut?: boolean;
  viewRef?: (view: View | null) => void;
  /** In a list spaced by its own gap, a margin of minus that gap: closed, it then takes no more room than nothing. */
  style?: StyleProp<ViewStyle>;
}) {
  const size = useRef(new Animated.Value(height)).current;
  useEffect(() => {
    if (shut) {
      size.stopAnimation();
      size.setValue(0);
      return undefined;
    }
    const animation = Animated.spring(size, { toValue: 0, ...SHEET_SPRING, overshootClamping: true, useNativeDriver: false });
    animation.start();
    return () => animation.stop();
  }, [shut, size]);
  // Shut in the very render that says so: on the web an animated value draws through React, one render later.
  return <Animated.View ref={viewRef} style={[style, { height: shut ? 0 : size }]} pointerEvents="none" testID="fold-gap" />;
}

/**
 * An answer tile the feedback sheet's top edge would cut (or a chip the scroll edge would cut): it is gone while the
 * sheet is up, out of reach of taps and screen readers, and fades back for the next try. It keeps its place, so no
 * other tile moves. It goes at once, in the render that hides it: a fade would still show it, cut, as the sheet's
 * edge comes up over it.
 */
export function FadeUnderSheet({
  hidden,
  children,
  style,
  onLayout,
  viewRef,
  testID
}: {
  hidden: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onLayout?: (event: LayoutChangeEvent) => void;
  /** The view itself, to read its place before a frame is drawn (see laidOutBox). */
  viewRef?: (view: View | null) => void;
  testID?: string;
}) {
  const opacity = useRef(new Animated.Value(hidden ? 0 : 1)).current;
  useEffect(() => {
    if (hidden) {
      opacity.setValue(0);
      return undefined;
    }
    const animation = Animated.timing(opacity, { toValue: 1, duration: FADE_MS, useNativeDriver: true });
    animation.start();
    return () => animation.stop();
  }, [hidden, opacity]);
  return (
    <Animated.View
      // The value set above shows only after another render (on the web an animated value draws through React), so
      // a hidden part is drawn at 0 by this very render.
      ref={viewRef}
      style={[style, { opacity: hidden ? 0 : opacity }]}
      onLayout={onLayout}
      pointerEvents={hidden ? "none" : "auto"}
      aria-hidden={hidden}
      accessibilityElementsHidden={hidden}
      importantForAccessibility={hidden ? "no-hide-descendants" : "auto"}
      testID={testID}
    >
      {children}
    </Animated.View>
  );
}

export type ExerciseChoice = { id: string; label: string };
export type ExerciseResult = {
  correct: boolean;
  correctLabel: string;
  why?: string;
  /** Where the answer comes from: a chip on the answer sheet, right or wrong, that opens the source. */
  source?: FeedbackSource;
};

export type ExerciseViewProps = {
  kind: "multiple_choice" | "true_false";
  prompt: string;
  choices: ExerciseChoice[];
  selectedChoiceId?: string;
  /** When set: checked state, tiles lock, the feedback sheet is up. */
  result?: ExerciseResult;
  /**
   * 0 the first time a question is asked; 1 or more when the same question comes back. A new try shows a
   * small "Try again!" chip and another tile order (two tiles such as True / False swap). The order is
   * fixed when the question shows and stays put through CHECK and the feedback sheet.
   */
  attempt?: number;
  /** Older form of `attempt={1}`; `attempt` wins when both are set. */
  retrying?: boolean;
  /** Asked again from an earlier lesson: a small REVIEW chip above the question. */
  review?: boolean;
  mascotVariant: string;
  accent: string;
  onSelect: (choiceId: string) => void;
  onCheck: () => void;
  onContinue: () => void;
  /** Id of the right choice. Lets the right tile turn green after a wrong pick; otherwise found by correctLabel. */
  correctChoiceId?: string;
  /** Seed for the praise word (e.g. the question id). Defaults to the prompt. */
  praiseSeed?: string;
  /** Play the correct / wrong sound when the sheet opens. Default true; pass false if the caller plays it. */
  playSound?: boolean;
  /** Sound of the sheet's CONTINUE / GOT IT. Pass false on the last question, where the finish fanfare follows. */
  continueSound?: GameSoundEvent | false;
  /** Start with the feedback sheet's Why line open (gallery / tests). */
  defaultWhyOpen?: boolean;
  bottomInset?: number;
  testID?: string;
};

function isTrueChoice(choice: ExerciseChoice) {
  return choice.id.toLowerCase() === "true" || choice.label.trim().toLowerCase() === "true";
}

function isFalseChoice(choice: ExerciseChoice) {
  return choice.id.toLowerCase() === "false" || choice.label.trim().toLowerCase() === "false";
}

/** The box it was, unless the new one moved or grew by more than a pixel (a box read at once and one reported round differently). */
function sameBox(was: LayoutBox | null, now: LayoutBox) {
  return was && Math.abs(was.y - now.y) <= 1 && Math.abs(was.height - now.height) <= 1 ? was : now;
}

/** Whether two lists of parts sit in the same places, to the pixel. */
function sameRows(was: RowSpan[], now: RowSpan[]) {
  return was.length === now.length && was.every((row, index) => Math.abs(row.top - now[index].top) <= 1 && Math.abs(row.bottom - now[index].bottom) <= 1);
}

/**
 * The tiles' order for a try: as given the first time, then rotated so each new try differs from the one
 * before. Three or more tiles never go back to the first order, so no tile keeps its first place; two tiles
 * (True / False) swap on every try. Deterministic, so a re-render never moves them.
 */
export function attemptOrder<T>(items: T[], attempt = 0): T[] {
  if (attempt <= 0 || items.length < 2) {
    return items;
  }
  const shift = items.length === 2 ? Math.floor(attempt) % 2 : ((Math.floor(attempt) - 1) % (items.length - 1)) + 1;
  return [...items.slice(shift), ...items.slice(0, shift)];
}

/** The same choices in another order (rotated by one, so no tile keeps its place). */
export function retryOrder<T>(items: T[]): T[] {
  return attemptOrder(items, 1);
}

const RETRY_INK = darken(colors.flame, 0.3);
const RETRY_BG = lighten(colors.flame, 0.85);
const REVIEW_INK = darken(colors.gem, 0.45);
const REVIEW_BG = lighten(colors.gem, 0.85);

/** One question: mascot + prompt bubble, answer tiles, CHECK bar and the feedback sheet. */
export function ExerciseView({
  kind,
  prompt,
  choices,
  selectedChoiceId,
  result,
  attempt,
  retrying,
  review,
  mascotVariant,
  accent,
  onSelect,
  onCheck,
  onContinue,
  correctChoiceId,
  praiseSeed,
  playSound = true,
  continueSound,
  defaultWhyOpen,
  bottomInset,
  testID = "exercise-view"
}: ExerciseViewProps) {
  const checked = Boolean(result);
  const { compact, narrow } = useLessonCompact();

  // The try (and so the tile order) is read when the question shows and kept through CHECK and the sheet,
  // so the tile just tapped never jumps under the sheet. A new question, or a new try before CHECK, reads it again.
  const requestedAttempt = Math.max(0, attempt ?? (retrying ? 1 : 0));
  const questionKey = `${prompt}\u0000${choices.map((choice) => choice.id).join("|")}`;
  const shownTry = useRef({ key: questionKey, attempt: requestedAttempt });
  if (shownTry.current.key !== questionKey || (!checked && shownTry.current.attempt !== requestedAttempt)) {
    shownTry.current = { key: questionKey, attempt: requestedAttempt };
  }
  const shownAttempt = shownTry.current.attempt;
  const shownChoices = useMemo(() => attemptOrder(choices, shownAttempt), [choices, shownAttempt]);

  // Keep the last result so the sheet does not flip to "wrong" while it slides away.
  const lastResult = useRef(result);
  if (result) {
    lastResult.current = result;
  }
  const shown = result ?? lastResult.current;

  const matchedId = shown ? choices.find((choice) => choice.label.trim() === shown.correctLabel.trim())?.id : undefined;
  const rightId = correctChoiceId ?? matchedId ?? (result?.correct ? selectedChoiceId : undefined);

  // How the question meets its room, step by step, for this try (see useQuestionFit and the layout effect below).
  const shownKey = `${questionKey}\u0000${shownAttempt}`;
  const sizing = useQuestionFit(shownKey);
  const look = fitLook(sizing.step);

  // --- keep the prompt and the green tile above the feedback sheet ---
  // A question too tall for its room even at the last step of its fit shows the arrow while any of it is hidden (its
  // place is worked out for the room the arrow leaves).
  const { ref: scrollRef, scrollProps, more, scrollDown, know } = useScrollMore(sizing.overflow ? 0 : SCROLL_HINT_SLACK);
  const [rootHeight, setRootHeight] = useState(0);
  const [barHeight, setBarHeight] = useState(0);
  const [sheetHeight, setSheetHeight] = useState(0);
  const [sheetFull, setSheetFull] = useState(0);
  const [sheetLeast, setSheetLeast] = useState(0);
  // The cues, prompt and tiles sit in one block at the top of the scrolling content, under the space that centers it.
  // Their boxes are read inside the block and placed by its top, worked out rather than read: a browser reports a
  // move only with a change of size.
  const [topSpace, setTopSpace] = useState(0);
  const [tilesIn, setTilesBox] = useState<LayoutBox | null>(null);
  const [promptIn, setPromptBox] = useState<LayoutBox | null>(null);
  const [cueIn, setCueBox] = useState<LayoutBox | null>(null);
  const questionTop = space.sm + topSpace;
  const tilesBox = tilesIn && { y: tilesIn.y + questionTop, height: tilesIn.height };
  const promptBox = promptIn && { y: promptIn.y + questionTop, height: promptIn.height };
  const cueTop = cueIn === null ? null : cueIn.y + questionTop;
  const tileBoxes = useRef<Record<string, LayoutBox>>({});
  const [tileMoves, setTileMoves] = useState(0);
  // The room above the bar (and whether the bar held the arrow then), and the question block's height (and the try and
  // step it was drawn with): read before the frame is drawn where a view can say its size at once, else reported.
  const [roomIn, setRoomIn] = useState<RoomRead | null>(null);
  const [blockIn, setBlockIn] = useState<BlockRead | null>(null);
  const scrollBoxHeight = roomIn?.height ?? 0;
  const questionHeight = blockIn?.height ?? 0;
  const [contentHeight, setContentHeight] = useState(0);
  const rootRef = useRef<View>(null);
  const scrollBoxRef = useRef<View>(null);
  const questionRef = useRef<View>(null);
  const tilesRef = useRef<View>(null);
  const promptRef = useRef<View>(null);
  const cueRef = useRef<View | null>(null);
  const tileRefs = useRef<Record<string, View | null>>({});
  // A question too tall for its room even at the last step of its fit: where its parts (the chips, the prompt, each
  // tile) sit in the scroll content with no space above it, for the places it rests when the arrow scrolls it.
  const [partsIn, setPartsIn] = useState<{ key: string; rows: RowSpan[] } | null>(null);
  // The room folds left while the sheet comes up (see FoldGap): each grey tile's, and the prompt's when it wraps anew
  // as the mascot hides; and the gaps' views, to tell a tile moved by a fold from one carried up as its gap closes.
  // `scrollLeft`: what the question's scroll can still take up of the room tiles above the green one leave (see
  // foldRooms), from where the learner left it at CHECK; `scrolled`: it sat scrolled down then.
  const foldGaps = useRef<{ key: string; heights: Record<string, number>; scrollLeft?: number; scrolled?: boolean }>({ key: "", heights: {} });
  // Where the learner left the question's scroll (by hand or with the arrow), for the room folds leave at CHECK.
  const scrolledTo = useRef({ key: "", y: 0 });
  const [promptGap, setPromptGap] = useState<{ key: string; height: number; n: number } | null>(null);
  const gapViews = useRef<Record<string, { view: View | null; from: number }>>({});
  // On the web the sheet's new height (its Why line opening) is known before the browser paints it.
  useSheetHeightNow({ root: rootRef, open: checked, reported: sheetHeight > 0, onHeight: setSheetHeight });
  const [whyOpened, setWhyOpened] = useState(false);

  const trueFalse = kind === "true_false";
  const truePick = trueFalse ? choices.find(isTrueChoice) : undefined;
  const falsePick = trueFalse ? choices.find(isFalseChoice) : undefined;
  const tfChoices = truePick && falsePick && truePick !== falsePick ? attemptOrder([truePick, falsePick], shownAttempt) : null;
  // The space under each tile (less at the last step of a question's fit).
  const tileGap = compact ? (look.smallGaps ? space.xs : space.sm) : look.smallGaps ? space.sm : space.md;

  // The tiles start right under the prompt. Read from the prompt, whose size changes when the mascot hides: the
  // tiles only move then, and a browser reports a move only with a change of size.
  const tilesTop = promptBox ? promptBox.y + promptBox.height : tilesBox?.y;

  /** The green tile (or the picked one, before the answer is known) in the scrolling content, among `shown` tiles. */
  const focusIn = (shown: ExerciseChoice[]) => {
    if (!tilesBox || tilesTop === undefined) {
      return undefined;
    }
    const focusId = rightId ?? selectedChoiceId;
    // True / False tiles share a row, so the row is the tile.
    const span = !tfChoices && focusId ? stackSpan(shown.map((choice) => choice.id), tileBoxes.current, focusId, tileGap) : undefined;
    return span ? { top: tilesTop + span.top, bottom: tilesTop + span.bottom } : { top: tilesTop, bottom: tilesTop + tilesBox.height };
  };
  /**
   * How far a tile slides up into its place as it first shows: never from under the room's bottom edge, so no frame
   * shows its face cut there. A tile resting near the edge starts closer to its place; one out of sight under the edge
   * only fades in, so it never springs up into sight either.
   */
  const entryRise = (id: string) => {
    const box = tileBoxes.current[id];
    if (!box || tilesTop === undefined || !scrollBoxHeight) {
      return POP_IN_DISTANCE;
    }
    const top = tilesTop + box.y;
    return top >= scrollBoxHeight - 1 ? 0 : Math.max(0, Math.min(POP_IN_DISTANCE, scrollBoxHeight - (top + box.height)));
  };
  const fitLayout = (shown: ExerciseChoice[]) => {
    const focus = focusIn(shown);
    return focus && rootHeight && promptBox ? { visibleBottom: rootHeight, promptTop: promptBox.y, focusTop: focus.top, focusBottom: focus.bottom } : undefined;
  };
  // Folded: only the picked tile and the green one stay.
  const foldedChoices = shownChoices.filter((choice) => choice.id === rightId || choice.id === selectedChoiceId);
  const canFold = !tfChoices && foldedChoices.length < shownChoices.length;
  // Four answers do not fit next to a mascot on a short phone, nor three on a short, narrow one (320 x 568): the
  // prompt takes the full width from the start, a line or two shorter.
  const mascotOff = compact && !tfChoices && (choices.length >= 4 || (narrow && choices.length >= 3));
  // So does a question that needs the smaller prompt to fit its room (see useQuestionFit).
  const mascotAway = mascotOff || look.smallPrompt;
  const mascotShown = !mascotAway && prompt.length <= LONG_PROMPT;
  // The room the sheet has with the question as it is; while it is too small, the question is squeezed.
  const layoutNow = fitLayout(shownChoices);
  const fit = useSheetFit({
    open: checked,
    // The height it shows already counts when the sheet has not yet said its full height (its Why line just opened).
    fullHeight: Math.max(sheetFull, sheetHeight),
    room: layoutNow ? sheetRoom(layoutNow).room : undefined,
    layoutKey: `${promptBox?.height}|${tilesBox?.y}|${tilesBox?.height}|${tileMoves}`,
    squeezeMoves: mascotShown
  });
  // The question gives its room first: the grey tiles fold away and the mascot hides, until the next question.
  const folded = checked && fit.squeeze && canFold;
  const softChoices = folded ? foldedChoices : shownChoices;
  const softLayout = folded ? fitLayout(softChoices) : layoutNow;
  // How far up from its bottom the green tile (or the row of True / False) holds no text: the sheet's top edge may reach
  // that far into it and cut none of its lines.
  const textEdge = tileTextBottom({ compact, tight: look.tight, square: Boolean(tfChoices) });
  // Even then the sheet at its least (slim, its Why text one line) can be taller than the room under the green tile: a
  // long translated answer, said again in the sheet, under a long prompt that may not scroll away. The picked tile then
  // folds away too, when it sits above the green one and that keeps the sheet's edge under the green tile's text: the
  // sheet still says the answer was wrong, and the green tile and the sheet's "Correct answer" line what was right.
  // Once folded it stays so while the sheet is up, also when its Why line opens.
  const pickIndex = shownChoices.findIndex((choice) => choice.id === selectedChoiceId);
  const rightIndex = shownChoices.findIndex((choice) => choice.id === rightId);
  const greenOnly = shownChoices.filter((choice) => choice.id === rightId);
  const greenLayout = !tfChoices && pickIndex >= 0 && rightIndex > pickIndex ? fitLayout(greenOnly) : undefined;
  const pickFolds = usePickFold({
    open: checked,
    now: Boolean(
      checked &&
        fit.squeeze &&
        fit.fitted &&
        sheetLeast > 0 &&
        softLayout &&
        greenLayout &&
        overRoom(sheetRoom(softLayout).room, sheetLeast) &&
        !overRoom(textRoom(greenLayout, textEdge), sheetLeast)
    ),
    tryKey: shownKey
  });
  const stackChoices = pickFolds ? greenOnly : softChoices;
  // Until the sheet has said its least height the picked tile may still fold: the place worked out without that fold
  // is not where the question goes, so it waits (a frame-less render later at most) instead of starting there, or
  // hiding the chips for a scroll it then never makes.
  const pickPending = checked && fit.squeeze && fit.fitted && Boolean(greenLayout) && sheetLeast === 0 && !pickFolds;
  // A tile that folds away while the sheet comes up leaves its room, which closes with the sheet's spring: the green
  // tile then never moves in one frame (nor the prompt), it glides up as the sheet rises. One that folds once the Why
  // line is open goes at once, as the sheet has grown at once and the green tile must clear it in that frame.
  // A question the learner left scrolled down scrolls up with the tiles above the green one instead, as far as it
  // can, so the green tile stays where it showed (see foldRooms).
  if (!checked || foldGaps.current.key !== shownKey) {
    foldGaps.current = { key: shownKey, heights: {} };
  }
  if (checked && !tfChoices) {
    const gaps = foldGaps.current;
    if (gaps.scrollLeft === undefined) {
      const y = scrolledTo.current.key === shownKey ? scrolledTo.current.y : 0;
      gaps.scrollLeft = y;
      gaps.scrolled = y > 0.5;
    }
    const focusIndex = shownChoices.findIndex((choice) => choice.id === (rightId ?? selectedChoiceId));
    const newly = shownChoices
      .map((choice, index) => ({ choice, index }))
      .filter(({ choice }) => !stackChoices.includes(choice) && gaps.heights[choice.id] === undefined)
      .map(({ choice, index }) => {
        const box = tileBoxes.current[choice.id];
        return { id: choice.id, room: !whyOpened && box ? box.height + tileGap : 0, above: index < focusIndex };
      });
    if (newly.length > 0) {
      const { rooms, left } = foldRooms(newly, gaps.scrollLeft);
      Object.assign(gaps.heights, rooms);
      gaps.scrollLeft = left;
    }
  }
  const gapRef = (id: string, from: number) => (view: View | null) => {
    if (view) {
      gapViews.current[id] = { view, from };
    } else {
      delete gapViews.current[id];
    }
  };
  const layout = pickFolds ? greenLayout : softLayout;
  const room = layout ? sheetRoom(layout) : undefined;
  // Only then is the sheet held to the room under the green tile.
  const sheetMaxHeight = checked && fit.fitted && room ? room.room : undefined;
  // Any tile the sheet's top edge would cut (or cover) fades away while it is up, so no tile's text is ever cut by
  // it: the tiles under the green one that do not sit wholly above it. The prompt and the green tile stay, and the
  // picked tile stays whenever it sits wholly above the sheet. A new try shows them all again. The sheet is never
  // shorter than its least, also when its room is.
  const shownSheet = sheetMaxHeight !== undefined ? Math.min(sheetHeight, Math.max(sheetMaxHeight, sheetLeast)) : sheetHeight;
  const sheetTop = checked && fit.fitted && shownSheet > 0 && layout && room ? sheetScrollY(layout, shownSheet, room.furthest) + layout.visibleBottom - shownSheet : undefined;
  // Only when nothing gives the sheet its room does its top edge reach the green tile (or the row of True / False):
  // where it would reach into its text, that tile is gone too, with any other the edge would cut, so the edge never
  // cuts a line of it. One the edge reaches only below its text (its lip, border, padding) stays.
  const greenCut = sheetTop !== undefined && layout !== undefined && layout.focusBottom > sheetTop + textEdge;
  const fadedIds =
    !tfChoices && sheetTop !== undefined && tilesTop !== undefined
      ? tilesUnderSheet({
          ids: stackChoices.map((choice) => choice.id),
          boxes: tileBoxes.current,
          focusId: greenCut ? undefined : rightId ?? selectedChoiceId,
          gap: tileGap,
          tilesTop,
          sheetTop,
          edge: greenCut ? textEdge : undefined
        })
      : [];
  const rowFaded = Boolean(tfChoices) && greenCut;

  // Show the green tile (and the picked one when it sits above it) right above the sheet, but never scroll the
  // question away: on a short phone the prompt stays whole at the top, and the sheet names the answer anyway.
  // Also when it is 0: a learner who scrolled down to reach the last tile gets the question back in sight.
  // Scrolled down to show the green tile, the question can stop part-way through the REVIEW / "Try again!" chips
  // above the prompt: they are gone while it sits scrolled past their top (and from the render that starts its own
  // scroll past them), so the scroll view's top edge never cuts them, and back once it is scrolled up to them.
  const scrollTarget = layout && room ? sheetScrollY(layout, sheetHeight, room.furthest) : 0;
  // The tiles as laid out right now, read before the frame is drawn where a view can say its place at once: a fold
  // above the green tile (or the prompt wrapping anew as the mascot hides) is seen in the frame it happens, and the
  // question keeps the green tile where it showed (see foldScrollY).
  const placesNow = (): QuestionPlaces | undefined => {
    const block = questionRef.current;
    const blockTop = laidOutBox(block)?.y;
    const tilesTop = laidOutTop(tilesRef.current, block);
    const promptAt = laidOutTop(promptRef.current, block);
    if (blockTop === undefined || tilesTop === undefined || promptAt === undefined) {
      return undefined;
    }
    // Where a part sits with the room the folds left still open: what a gap has closed of it so far carried the
    // part up on its glide with the sheet, which no scroll is to make up for.
    const closedAbove = (top: number) =>
      Object.values(gapViews.current).reduce((sum, gap) => {
        const at = laidOutTop(gap.view, block);
        const now = (gap.view as { offsetHeight?: unknown } | null)?.offsetHeight;
        return at !== undefined && at <= top && typeof now === "number" ? sum + Math.max(0, gap.from - now) : sum;
      }, 0);
    const boxes: Record<string, LayoutBox> = {};
    if (tfChoices) {
      const row = laidOutHeight(tilesRef.current);
      if (row !== undefined) {
        boxes.row = { y: blockTop + tilesTop + closedAbove(tilesTop), height: row };
      }
    } else {
      for (const choice of stackChoices) {
        const view = tileRefs.current[choice.id];
        const top = laidOutTop(view, block);
        const height = laidOutHeight(view);
        if (top !== undefined && height !== undefined) {
          boxes[choice.id] = { y: blockTop + top + closedAbove(top), height };
        }
      }
    }
    const focus = tfChoices ? "row" : rightId ?? selectedChoiceId;
    const box = focus ? boxes[focus] : undefined;
    const now = box && rootHeight ? { visibleBottom: rootHeight, promptTop: blockTop + promptAt, focusTop: box.y, focusBottom: box.y + box.height } : undefined;
    const tops: Record<string, number> = {};
    Object.entries(boxes).forEach(([id, entry]) => {
      tops[id] = entry.y;
    });
    return { tops, focus, aim: now && sheetHeight > 0 ? sheetScrollY(now, sheetHeight, sheetRoom(now).furthest) : undefined };
  };
  const ownScroll = useQuestionScroll({
    open: checked,
    scrollRef,
    target: scrollTarget,
    ready: sheetHeight > 0 && Boolean(layout && room),
    settling: (fit.squeeze && !fit.fitted) || pickPending,
    whyOpened,
    viewport: rootHeight - barHeight,
    // Scrolled on once the room under the question has grown, or a question moved down to the middle could stay put.
    contentHeight,
    // Where the chips sit in the scroll content, the space that centers the question included.
    partTop: cueTop,
    placesNow
  });
  const onQuestionScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrolledTo.current = { key: shownKey, y: event.nativeEvent.contentOffset.y };
    scrollProps.onScroll(event);
    ownScroll.onScroll(event.nativeEvent.contentOffset.y);
    stopsArrow.onScroll(event.nativeEvent.contentOffset.y);
  };

  const onTilesLayout = (event: LayoutChangeEvent) => {
    const { y, height } = event.nativeEvent.layout;
    setTilesBox((was) => sameBox(was, { y: Math.round(y), height: Math.round(height) }));
  };
  // While the sheet is up, the prompt and the tiles are also read before the frame is drawn where a view can say its
  // place at once: a prompt wrapped anew as the mascot hides is known in the commit it happens, so the squeezed
  // question has settled (and goes to its new place) before that frame shows, not a frame after.
  useLayoutEffect(() => {
    if (!checked) {
      return;
    }
    const block = questionRef.current;
    const read = (view: View | null): LayoutBox | undefined => {
      const y = laidOutTop(view, block);
      const height = laidOutHeight(view);
      return y === undefined || height === undefined ? undefined : { y, height };
    };
    const promptNow = read(promptRef.current);
    const tilesNow = read(tilesRef.current);
    if (promptNow) {
      // The prompt wrapped anew, shorter, as the mascot hid while the sheet comes up: the lines it gave up leave their
      // room under it, which closes with the sheet's spring, so the tiles glide up rather than jump.
      // A question the learner left scrolled down scrolls up with those lines instead, so the tiles stay where they
      // showed (see foldScrollY).
      const lost = promptIn ? promptIn.height - promptNow.height : 0;
      if (lost > 1 && !whyOpened && !foldGaps.current.scrolled) {
        setPromptGap((was) => ({ key: shownKey, height: lost, n: (was?.n ?? 0) + 1 }));
      }
      setPromptBox((was) => sameBox(was, promptNow));
    }
    if (tilesNow) {
      setTilesBox((was) => sameBox(was, tilesNow));
    }
  });
  const onTileLayout = (id: string) => (event: LayoutChangeEvent) => {
    const { y, height } = event.nativeEvent.layout;
    const box = { y: Math.round(y), height: Math.round(height) };
    const before = tileBoxes.current[id];
    tileBoxes.current[id] = box;
    // A tile that moved (the grey ones folded away) moves the sheet's room with it.
    if (before && (before.y !== box.y || before.height !== box.height)) {
      setTileMoves((count) => count + 1);
    }
  };

  const tileState = (choice: ExerciseChoice): ChoiceTileState => {
    if (!checked) {
      return choice.id === selectedChoiceId ? "selected" : "idle";
    }
    if (choice.id === rightId) {
      return "correct";
    }
    if (choice.id === selectedChoiceId) {
      return "wrong";
    }
    return "dimmed";
  };

  const press = (choice: ExerciseChoice) => {
    if (!checked) {
      onSelect(choice.id);
    }
  };

  // A translated Why line was already cut from the English one (localizedWhy); the English rules cannot read it.
  const why = shown ? (getActiveLanguage() === "en" ? shortWhy({ explanation: shown.why, prompt, correctLabel: shown.correctLabel }) : shown.why) : undefined;
  // "Correct answer: ..." always names the answer, even though the green tile shows it too.
  const sheetLabel = shown && !shown.correct ? shown.correctLabel : undefined;
  const mood: MascotMood = result ? (result.correct ? "cheer" : "sad") : "think";
  // The mascot also hides while a squeezed question gives the feedback sheet its room.
  const hideMascot = mascotAway || fit.squeeze;
  // One long answer makes the whole set use the smaller text, so the tiles match.
  const longChoices = choices.some((choice) => choice.label.length > LONG_LABEL);
  // A question taller than its room would show a tile cut by the scroll view's bottom edge, the arrow under it, and
  // the answers under that out of sight. It takes the steps of its fit instead (see useQuestionFit): tight tiles, then
  // the smaller text, a smaller prompt, smaller gaps, only as far as it needs to show every answer whole, from the frame
  // it first shows. Read while unchecked and kept through the sheet, so no tile moves on CHECK; a new try reads it
  // again. A question too tall even then keeps its usual look and scrolls, placed so that the room's edge falls between
  // two tiles: every tile in sight shows whole. The arrow scrolls it a page at a time to the next place where every
  // part in sight is whole, the last of them its end (see questionStops).
  const arrowGrowth = scrollHintGrowth(BAR_GAP);
  const tall = sizing.settled && sizing.overflow;
  const arrowRoom = roomIn ? roomIn.height + (roomIn.hint ? arrowGrowth : 0) - arrowGrowth : 0;
  const stops =
    tall && partsIn?.key === shownKey && arrowRoom > 0
      ? questionStops(
          partsIn.rows.map((row) => ({ top: row.top + topSpace, bottom: row.bottom + topSpace })),
          arrowRoom,
          space.sm + topSpace + questionHeight
        )
      : undefined;
  const stopsArrow = useStopsArrow({ key: shownKey, stops, scrollRef });
  // Its content reaches just so far under its end, so a hand scrolls it no further either.
  const restBottom = stops ? Math.max(0, stops.end + arrowRoom - (space.sm + topSpace + questionHeight)) : space.xxl;
  const extraBottom = checked && sheetHeight ? Math.max(space.xxl, sheetHeight - barHeight + space.lg) : restBottom;
  // The arrow's room stays in the bar while the sheet is up (the sheet covers the bar), so the room above it keeps its
  // height on CHECK and shows nothing more of a tile that was out of sight. A question too tall even at the last step
  // keeps it all through its try: the arrow shows from its first frame and turns to point up at the end, and the room
  // never changes its height under it, so the end of a scroll is never pulled back as the arrow goes.
  const restMore = useRef(false);
  if (!checked) {
    restMore.current = more;
  }
  const holdHint = tall || (checked && restMore.current);
  const hintVisible = !checked && (tall || more);
  const hintShown = hintVisible || holdHint;
  // What was drawn in the last frame: a reported size belongs to it.
  const drawn = useRef({ key: shownKey, step: sizing.step, hint: hintShown });
  const known = useRef<{ key: string; content: number } | undefined>(undefined);
  const spans = (stack: LayoutBox | null | undefined, box: (id: string) => LayoutBox | null | undefined): RowSpan[] | undefined => {
    if (!stack) {
      return undefined;
    }
    const top = space.sm + stack.y;
    if (tfChoices) {
      return [{ top, bottom: top + stack.height }];
    }
    const boxes = shownChoices.map((choice) => box(choice.id));
    return boxes.every(Boolean) ? boxes.map((tile) => ({ top: top + tile!.y, bottom: top + tile!.y + tile!.height })) : undefined;
  };
  /**
   * Where the chips, the prompt and each tile (or the row of True / False) start and end in the scroll content, with no
   * space above the question: read before the frame is drawn where a view can say its place at once, else as reported.
   */
  const partRows = (now: boolean): RowSpan[] | undefined => {
    const block = questionRef.current;
    // `reported`: the view's own layout report, inside the view that holds it, which starts `within` down the question.
    const at = (view: View | null, reported: LayoutBox | null | undefined, within = 0): RowSpan | undefined => {
      const y = now ? laidOutTop(view, block) : undefined;
      const height = now ? laidOutHeight(view) : undefined;
      const box = y !== undefined && height !== undefined ? { y, height } : reported ? { y: within + reported.y, height: reported.height } : undefined;
      return box ? { top: space.sm + box.y, bottom: space.sm + box.y + box.height } : undefined;
    };
    const cues = review || shownAttempt > 0;
    const cue = cues ? at(cueRef.current, cueIn) : undefined;
    const promptRow = at(promptRef.current, promptIn);
    const tilesRow = at(tilesRef.current, tilesIn);
    if (!promptRow || !tilesRow || (cues && !cue)) {
      return undefined;
    }
    const tiles = tfChoices ? [tilesRow] : shownChoices.map((choice) => at(tileRefs.current[choice.id], tileBoxes.current[choice.id], tilesRow.top - space.sm));
    if (tiles.some((tile) => !tile)) {
      return undefined;
    }
    return [...(cue ? [cue] : []), promptRow, ...(tiles as RowSpan[])];
  };
  useLayoutEffect(() => {
    drawn.current = { key: shownKey, step: sizing.step, hint: hintShown };
  });
  useLayoutEffect(() => {
    if (checked) {
      return;
    }
    // Where a view can say its size at once (the web, the New Architecture), the question is read here, before the
    // frame is drawn: a step its fit takes is drawn and read again before any frame shows, and the space that centers
    // it is in the very frame it first shows. Elsewhere its reported sizes are used.
    const roomNow = laidOutHeight(scrollBoxRef.current);
    const blockNow = laidOutHeight(questionRef.current);
    const now = roomNow !== undefined && blockNow !== undefined;
    if (now) {
      setRoomIn(sameRoom({ height: roomNow, hint: hintShown }));
      setBlockIn(sameBlock({ height: blockNow, key: shownKey, step: sizing.step }));
    }
    const roomSeen = now ? { height: roomNow, hint: hintShown } : roomIn;
    const blockSeen = now ? { height: blockNow, key: shownKey, step: sizing.step } : blockIn;
    if (!roomSeen?.height || !blockSeen?.height || blockSeen.key !== shownKey || blockSeen.step !== sizing.step) {
      return;
    }
    // The room with the arrow hidden: the bar grows to hold it.
    const room = roomSeen.height + (roomSeen.hint ? arrowGrowth : 0);
    sizing.measure({
      key: shownKey,
      step: sizing.step,
      now,
      room,
      arrowRoom: room - arrowGrowth,
      bottom: space.sm + blockSeen.height - (tfChoices ? 0 : tileGap),
      tightSaving: tfChoices ? 0 : shownChoices.length * tightSaving(compact),
      tiles: now ? spans(laidOutBox(tilesRef.current), (id) => laidOutBox(tileRefs.current[id])) : spans(tilesIn, (id) => tileBoxes.current[id])
    });
    // The arrow shows (or not) in this frame too, so it never takes its room from a question after it first shows. A
    // new try starts at the top. Told again only when the question changes: the room changes with the arrow itself.
    const content = space.sm + topSpace + blockSeen.height + space.xxl;
    if (now && known.current?.key !== shownKey) {
      know(room, content, 0);
    } else if (now && known.current?.content !== content) {
      know(room, content);
    }
    known.current = now ? { key: shownKey, content } : known.current;
    // Too tall even at the last step: where its parts sit, for the places the arrow scrolls it to.
    if (sizing.settled && sizing.overflow) {
      const rows = partRows(now);
      if (rows) {
        setPartsIn((before) => (before && before.key === shownKey && sameRows(before.rows, rows) ? before : { key: shownKey, rows }));
      }
    }
    // Not read again only because the arrow came or went: the bar's new height is read with the next step, or reported.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, shownKey, sizing.step, sizing.settled, roomIn, blockIn, topSpace, tilesIn, promptIn, cueIn, tileMoves]);
  // A short question sits in the middle of the screen, not at the top; one too tall even at the last step of its fit
  // sits as low as puts the room's edge between two tiles. Read while unchecked and kept through the sheet, so the
  // question never moves when CHECK is tapped or tiles fold away.
  if (!checked && scrollBoxHeight && questionHeight) {
    const next = sizing.overflow ? sizing.drop : centerSpace(scrollBoxHeight, space.sm + questionHeight, space.xxl);
    if (Math.abs(next - topSpace) > 1) {
      setTopSpace(next);
    }
  }

  return (
    <View ref={rootRef} style={styles.root} testID={testID} onLayout={(event) => setRootHeight(Math.round(event.nativeEvent.layout.height))}>
      <View
        ref={scrollBoxRef}
        style={styles.scrollBox}
        onLayout={(event) => setRoomIn(sameRoom({ height: Math.round(event.nativeEvent.layout.height), hint: drawn.current.hint }))}
        testID="exercise-room"
      >
        <ScrollView
          ref={scrollRef}
          style={styles.scroll}
          contentContainerStyle={[styles.content, { paddingTop: space.sm + topSpace, paddingBottom: extraBottom, minHeight: ownScroll.minHeight }]}
          keyboardShouldPersistTaps="handled"
          {...scrollProps}
          onContentSizeChange={(width, height) => {
            scrollProps.onContentSizeChange(width, height);
            setContentHeight(Math.round(height));
          }}
          scrollEventThrottle={EVERY_FRAME}
          onScroll={onQuestionScroll}
        >
          <View
            ref={questionRef}
            onLayout={(event) => setBlockIn(sameBlock({ height: Math.round(event.nativeEvent.layout.height), key: drawn.current.key, step: drawn.current.step }))}
            testID="exercise-question"
          >
            {review || shownAttempt > 0 ? (
              <FadeUnderSheet
                hidden={ownScroll.gone}
                style={[styles.cueRow, look.smallGaps ? styles.cueRowSmallGaps : null]}
                onLayout={(event) => {
                  const { y, height } = event.nativeEvent.layout;
                  setCueBox((was) => sameBox(was, { y: Math.round(y), height: Math.round(height) }));
                }}
                viewRef={(view) => {
                  cueRef.current = view;
                }}
                testID="exercise-cues"
              >
                {review ? (
                  <PopIn style={[styles.cueChip, styles.reviewChip]}>
                    <Icon name="practice" size={18} />
                    <Text style={[styles.cueText, styles.reviewText]} testID="exercise-review">
                      {t("REVIEW")}
                    </Text>
                  </PopIn>
                ) : null}
                {shownAttempt > 0 ? (
                  <PopIn style={[styles.cueChip, styles.retryChip]}>
                    <Text style={[styles.cueText, styles.retryText]}>{t("Try again!")}</Text>
                  </PopIn>
                ) : null}
              </FadeUnderSheet>
            ) : null}
            <View
              ref={promptRef}
              onLayout={(event) => {
                const { y, height } = event.nativeEvent.layout;
                setPromptBox((was) => sameBox(was, { y: Math.round(y), height: Math.round(height) }));
              }}
              testID="exercise-prompt"
            >
              <QuestionBubble
                prompt={prompt}
                mascotVariant={mascotVariant}
                accent={accent}
                mood={mood}
                hideMascot={hideMascot}
                still={fit.squeeze && !mascotAway}
                small={look.smallPrompt}
                smallGaps={look.smallGaps}
              />
            </View>
            {checked && promptGap?.key === shownKey ? (
              <FoldGap key={`prompt-gap-${promptGap.n}`} height={promptGap.height} shut={whyOpened} viewRef={gapRef(`prompt-${promptGap.n}`, promptGap.height)} />
            ) : null}

            {tfChoices ? (
              <View ref={tilesRef} style={styles.squareRow} onLayout={onTilesLayout} pointerEvents={checked ? "none" : "auto"} testID="exercise-tiles">
                <FadeUnderSheet hidden={rowFaded} style={styles.squareFade}>
                  {tfChoices.map((choice, index) => (
                    <React.Fragment key={choice.id}>
                      {index > 0 ? <View style={styles.squareGap} /> : null}
                      <ChoiceTile
                        label={choice === truePick ? t("True") : t("False")}
                        icon={choice === truePick ? "check" : "close"}
                        iconColor={choice === truePick ? colors.green : colors.heart}
                        layout="square"
                        compact={compact}
                        smallText={look.smallText}
                        state={tileState(choice)}
                        onPress={() => press(choice)}
                        testID={`choice-${choice.id}`}
                      />
                    </React.Fragment>
                  ))}
                </FadeUnderSheet>
              </View>
            ) : (
              <View ref={tilesRef} style={styles.stack} onLayout={onTilesLayout} pointerEvents={checked ? "none" : "auto"} testID="exercise-tiles">
                {shownChoices.map((choice, index) =>
                  !stackChoices.includes(choice) ? (
                    foldGaps.current.heights[choice.id] ? (
                      <FoldGap
                        key={`gap-${choice.id}`}
                        height={foldGaps.current.heights[choice.id]}
                        shut={whyOpened}
                        viewRef={gapRef(choice.id, foldGaps.current.heights[choice.id])}
                      />
                    ) : null
                  ) : (
                    <FadeUnderSheet
                      key={choice.id}
                      hidden={fadedIds.includes(choice.id)}
                      onLayout={onTileLayout(choice.id)}
                      viewRef={(view) => {
                        tileRefs.current[choice.id] = view;
                      }}
                      style={compact ? (look.smallGaps ? styles.tileGapSmallCompact : styles.tileGapCompact) : look.smallGaps ? styles.tileGapSmall : styles.tileGap}
                    >
                      <PopIn from="up" delay={80 + index * 60} distance={entryRise(choice.id)}>
                        <ChoiceTile
                          label={choice.label}
                          compact={compact}
                          tight={look.tight}
                          long={longChoices}
                          smallText={look.smallText}
                          state={tileState(choice)}
                          onPress={() => press(choice)}
                          testID={`choice-${choice.id}`}
                        />
                      </PopIn>
                    </FadeUnderSheet>
                  )
                )}
              </View>
            )}
          </View>
        </ScrollView>
      </View>

      <View onLayout={(event) => setBarHeight(Math.round(event.nativeEvent.layout.height))}>
        <LessonBottomBar
          bottomInset={bottomInset}
          scrollHint={{ visible: hintVisible, hold: holdHint, onPress: tall ? stopsArrow.onPress : scrollDown, direction: tall ? stopsArrow.direction : undefined, still: tall }}
        >
          {/* The correct / wrong sound follows right away, so CHECK itself stays quiet. */}
          <GameButton label={t("Check")} fullWidth sound={false} disabled={!selectedChoiceId || checked} onPress={onCheck} testID="exercise-check" />
        </LessonBottomBar>
      </View>

      <FeedbackSheet
        visible={checked}
        correct={Boolean(shown?.correct)}
        correctLabel={sheetLabel}
        why={why}
        source={shown?.source}
        onContinue={onContinue}
        praiseSeed={praiseSeed ?? prompt}
        playSound={playSound}
        buttonSound={continueSound}
        defaultWhyOpen={defaultWhyOpen}
        bottomInset={bottomInset}
        maxHeight={sheetMaxHeight}
        onHeight={setSheetHeight}
        onFullHeight={setSheetFull}
        onLeastHeight={setSheetLeast}
        onWhyToggle={setWhyOpened}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: "relative",
    backgroundColor: colors.snow
  },
  scrollBox: {
    flex: 1,
    minHeight: 0,
    position: "relative"
  },
  scroll: {
    flex: 1
  },
  content: {
    paddingHorizontal: space.lg,
    paddingTop: space.sm
  },
  cueRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginBottom: space.sm
  },
  cueRowSmallGaps: {
    marginBottom: 0
  },
  cueChip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 3,
    marginEnd: space.sm,
    marginBottom: space.xs
  },
  cueText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 15,
    lineHeight: 20
  },
  reviewChip: {
    backgroundColor: REVIEW_BG,
    paddingStart: 8
  },
  reviewText: {
    marginStart: 5,
    fontSize: 14,
    letterSpacing: 1,
    color: REVIEW_INK
  },
  retryChip: {
    backgroundColor: RETRY_BG
  },
  retryText: {
    color: RETRY_INK
  },
  questionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: space.xxl
  },
  questionRowCompact: {
    marginBottom: space.lg
  },
  bubbleWrap: {
    flex: 1,
    minWidth: 0,
    marginStart: space.xs,
    alignItems: "flex-start"
  },
  plainPrompt: {
    marginTop: space.xs,
    marginBottom: space.xl
  },
  plainPromptCompact: {
    marginTop: 0,
    marginBottom: space.lg
  },
  plainPromptSmallGaps: {
    marginTop: 0,
    marginBottom: space.sm
  },
  prompt: {
    flexShrink: 1,
    fontFamily: fonts.bodyHeavy,
    color: colors.ink
  },
  promptStack: {
    flexShrink: 1,
    alignItems: "stretch"
  },
  promptArabicLine: {
    marginTop: space.xs,
    alignSelf: "center",
    maxWidth: "100%"
  },
  promptArabicParagraph: {
    alignSelf: "stretch"
  },
  promptArabic: {
    fontFamily: fonts.arabicBold,
    writingDirection: "rtl"
  },
  promptQuran: {
    fontFamily: fonts.quran
  },
  reference: {
    alignSelf: "center",
    marginTop: 2,
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    lineHeight: 18,
    color: colors.inkSoft
  },
  referenceEnd: {
    alignSelf: "flex-end"
  },
  stack: {
    width: "100%"
  },
  tileGap: {
    marginBottom: space.md
  },
  tileGapCompact: {
    marginBottom: space.sm
  },
  tileGapSmall: {
    marginBottom: space.sm
  },
  tileGapSmallCompact: {
    marginBottom: space.xs
  },
  squareRow: {
    flexDirection: "row",
    width: "100%"
  },
  squareFade: {
    flex: 1,
    flexDirection: "row"
  },
  squareGap: {
    width: space.md
  }
});
