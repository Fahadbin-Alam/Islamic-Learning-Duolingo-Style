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
import { ChoiceTile, LONG_LABEL, tightSaving, type ChoiceTileState } from "../ChoiceTile";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { Mascot, type MascotMood } from "../Mascot";
import { PopIn } from "../PopIn";
import { SpeechBubble } from "../SpeechBubble";
import { colors, darken, fonts, lighten, radii, space } from "../theme";
import { FeedbackSheet, type FeedbackSource } from "./FeedbackSheet";
import { LessonBottomBar } from "./LessonHeader";
import { noBreakHyphens, shortWhy } from "./lessonText";
import { EVERY_FRAME, useScrollMore } from "./ScrollHint";
import { getActiveLanguage, t } from "../../i18n";
import { centerSpace, laidOutHeight, overRoom, sheetRoom, sheetScrollY, stackSpan, tilesUnderSheet, useQuestionScroll, useSheetFit, useSheetHeightNow, type LayoutBox } from "./sheetFit";

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

export type QuestionBubbleProps = {
  prompt: string;
  mascotVariant: string;
  accent: string;
  mood?: MascotMood;
  /** Hide the mascot (short screens); the prompt then shows full width. */
  hideMascot?: boolean;
  /** The mascot hides after the prompt showed (to make room for the feedback sheet): the prompt does not pop in again. */
  still?: boolean;
};

/** Mascot next to a speech bubble holding the question. Very long prompts drop the mascot and use the full width. */
export function QuestionBubble({ prompt, mascotVariant, accent, mood = "think", hideMascot, still }: QuestionBubbleProps) {
  const { compact, narrow } = useLessonCompact();
  const long = prompt.length > LONG_PROMPT;
  const promptSize = long || compact ? 17 : narrow ? 18 : 19;
  if (long || hideMascot) {
    const plainStyle = [styles.plainPrompt, compact ? styles.plainPromptCompact : null];
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
  testID
}: {
  hidden: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onLayout?: (event: LayoutChangeEvent) => void;
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

  // --- keep the prompt and the green tile above the feedback sheet ---
  const { ref: scrollRef, scrollProps, more, scrollDown } = useScrollMore();
  const [rootHeight, setRootHeight] = useState(0);
  const [barHeight, setBarHeight] = useState(0);
  const [sheetHeight, setSheetHeight] = useState(0);
  const [sheetFull, setSheetFull] = useState(0);
  // The cues, prompt and tiles sit in one block at the top of the scrolling content, under the space that centers it.
  // Their boxes are read inside the block and placed by its top, worked out rather than read: a browser reports a
  // move only with a change of size.
  const [questionHeight, setQuestionHeight] = useState(0);
  const [topSpace, setTopSpace] = useState(0);
  const [tilesIn, setTilesBox] = useState<LayoutBox | null>(null);
  const [promptIn, setPromptBox] = useState<LayoutBox | null>(null);
  const [cueIn, setCueTop] = useState<number | null>(null);
  const questionTop = space.sm + topSpace;
  const tilesBox = tilesIn && { y: tilesIn.y + questionTop, height: tilesIn.height };
  const promptBox = promptIn && { y: promptIn.y + questionTop, height: promptIn.height };
  const cueTop = cueIn === null ? null : cueIn + questionTop;
  const tileBoxes = useRef<Record<string, LayoutBox>>({});
  const [tileMoves, setTileMoves] = useState(0);
  // The try whose question was too tall for its room and fits with tight tiles, so they are tight (see below).
  const shownKey = `${questionKey}\u0000${shownAttempt}`;
  const [tightFor, setTightFor] = useState<string | undefined>(undefined);
  const tight = tightFor === shownKey;
  const [scrollBoxHeight, setScrollBoxHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const rootRef = useRef<View>(null);
  const scrollBoxRef = useRef<View>(null);
  const questionRef = useRef<View>(null);
  // A new question is first drawn already in its place. onLayout says the room and the question's height only after
  // the first frame is painted, so the question would show at the top for a frame or two and then drop to the middle.
  // Where a view can say its size at once (the web, the New Architecture), it is read here, and the space that
  // centers the question is in the very frame it first shows, its tiles tight already when that makes a question too
  // tall for its room fit (and read again once they are). Its parts pop in from there as before.
  useLayoutEffect(() => {
    if (checked) {
      return;
    }
    const room = laidOutHeight(scrollBoxRef.current);
    const block = laidOutHeight(questionRef.current);
    if (room !== undefined) {
      setScrollBoxHeight(room);
    }
    if (block !== undefined) {
      setQuestionHeight(block);
    }
  }, [checked, questionKey, shownAttempt, tight]);
  // On the web the sheet's new height (its Why line opening) is known before the browser paints it.
  useSheetHeightNow({ root: rootRef, open: checked, reported: sheetHeight > 0, onHeight: setSheetHeight });
  const [whyOpened, setWhyOpened] = useState(false);

  const trueFalse = kind === "true_false";
  const truePick = trueFalse ? choices.find(isTrueChoice) : undefined;
  const falsePick = trueFalse ? choices.find(isFalseChoice) : undefined;
  const tfChoices = truePick && falsePick && truePick !== falsePick ? attemptOrder([truePick, falsePick], shownAttempt) : null;
  const tileGap = compact ? space.sm : space.md;

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
  const mascotShown = !mascotOff && prompt.length <= LONG_PROMPT;
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
  const stackChoices = folded ? foldedChoices : shownChoices;
  const layout = folded ? fitLayout(stackChoices) : layoutNow;
  const room = layout ? sheetRoom(layout) : undefined;
  // Only then is the sheet held to the room under the green tile.
  const sheetMaxHeight = checked && fit.fitted && room ? room.room : undefined;
  // Any tile the sheet's top edge would cut (or cover) fades away while it is up, so no tile's text is ever cut by
  // it: the tiles under the green one that do not sit wholly above it. The prompt and the green tile always stay,
  // and the picked tile stays whenever it sits wholly above the sheet. A new try shows them all again.
  const shownSheet = sheetMaxHeight !== undefined ? Math.min(sheetHeight, sheetMaxHeight) : sheetHeight;
  const sheetTop = checked && fit.fitted && shownSheet > 0 && layout && room ? sheetScrollY(layout, shownSheet, room.furthest) + layout.visibleBottom - shownSheet : undefined;
  const fadedIds =
    !tfChoices && sheetTop !== undefined && tilesTop !== undefined
      ? tilesUnderSheet({ ids: stackChoices.map((choice) => choice.id), boxes: tileBoxes.current, focusId: rightId ?? selectedChoiceId, gap: tileGap, tilesTop, sheetTop })
      : [];

  // Show the green tile (and the picked one when it sits above it) right above the sheet, but never scroll the
  // question away: on a short phone the prompt stays whole at the top, and the sheet names the answer anyway.
  // Also when it is 0: a learner who scrolled down to reach the last tile gets the question back in sight.
  // Scrolled down to show the green tile, the question can stop part-way through the REVIEW / "Try again!" chips
  // above the prompt: they are gone while it sits scrolled past their top (and from the render that starts its own
  // scroll past them), so the scroll view's top edge never cuts them, and back once it is scrolled up to them.
  const scrollTarget = layout && room ? sheetScrollY(layout, sheetHeight, room.furthest) : 0;
  const ownScroll = useQuestionScroll({
    open: checked,
    scrollRef,
    target: scrollTarget,
    ready: sheetHeight > 0 && Boolean(layout && room),
    settling: fit.squeeze && !fit.fitted,
    whyOpened,
    viewport: rootHeight - barHeight,
    // Scrolled on once the room under the question has grown, or a question moved down to the middle could stay put.
    contentHeight,
    // Where the chips sit in the scroll content, the space that centers the question included.
    partTop: cueTop
  });
  const onQuestionScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollProps.onScroll(event);
    ownScroll.onScroll(event.nativeEvent.contentOffset.y);
  };

  const onTilesLayout = (event: LayoutChangeEvent) => {
    const { y, height } = event.nativeEvent.layout;
    setTilesBox({ y: Math.round(y), height: Math.round(height) });
  };
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
  const hideMascot = mascotOff || fit.squeeze;
  // One long answer makes the whole set use the smaller text, so the tiles match.
  const longChoices = choices.some((choice) => choice.label.length > LONG_LABEL);
  const extraBottom = checked && sheetHeight ? Math.max(space.xxl, sheetHeight - barHeight + space.lg) : space.xxl;
  // A question taller than its room would show its last tile cut by the scroll view's bottom edge, the arrow under it,
  // and that answer out of sight. When tight tiles (less padding in each) make it fit, they are tight instead, from the
  // frame it first shows, so they all show whole. Read while unchecked and kept through the sheet, so no tile moves on
  // CHECK; a new try reads it again. A question too tall even then keeps its usual tiles and scrolls as before: tight
  // ones would not bring its last tile into sight, only move where the room's edge cuts through it.
  const questionBottom = space.sm + questionHeight - tileGap;
  if (
    !checked &&
    !tight &&
    !tfChoices &&
    scrollBoxHeight &&
    questionHeight &&
    overRoom(scrollBoxHeight, questionBottom) &&
    !overRoom(scrollBoxHeight, questionBottom - shownChoices.length * tightSaving(compact))
  ) {
    setTightFor(shownKey);
  }
  // A short question sits in the middle of the screen, not at the top. Read while unchecked and kept through the
  // sheet, so the question never moves when CHECK is tapped or tiles fold away.
  if (!checked && scrollBoxHeight && questionHeight) {
    const next = centerSpace(scrollBoxHeight, space.sm + questionHeight, space.xxl);
    if (Math.abs(next - topSpace) > 1) {
      setTopSpace(next);
    }
  }

  return (
    <View ref={rootRef} style={styles.root} testID={testID} onLayout={(event) => setRootHeight(Math.round(event.nativeEvent.layout.height))}>
      <View ref={scrollBoxRef} style={styles.scrollBox} onLayout={(event) => setScrollBoxHeight(Math.round(event.nativeEvent.layout.height))} testID="exercise-room">
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
          <View ref={questionRef} onLayout={(event) => setQuestionHeight(Math.round(event.nativeEvent.layout.height))} testID="exercise-question">
            {review || shownAttempt > 0 ? (
              <FadeUnderSheet hidden={ownScroll.gone} style={styles.cueRow} onLayout={(event) => setCueTop(Math.round(event.nativeEvent.layout.y))} testID="exercise-cues">
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
              onLayout={(event) => setPromptBox({ y: Math.round(event.nativeEvent.layout.y), height: Math.round(event.nativeEvent.layout.height) })}
              testID="exercise-prompt"
            >
              <QuestionBubble prompt={prompt} mascotVariant={mascotVariant} accent={accent} mood={mood} hideMascot={hideMascot} still={fit.squeeze && !mascotOff} />
            </View>

            {tfChoices ? (
              <View style={styles.squareRow} onLayout={onTilesLayout} pointerEvents={checked ? "none" : "auto"} testID="exercise-tiles">
                {tfChoices.map((choice, index) => (
                  <React.Fragment key={choice.id}>
                    {index > 0 ? <View style={styles.squareGap} /> : null}
                    <ChoiceTile
                      label={choice === truePick ? t("True") : t("False")}
                      icon={choice === truePick ? "check" : "close"}
                      iconColor={choice === truePick ? colors.green : colors.heart}
                      layout="square"
                      compact={compact}
                      state={tileState(choice)}
                      onPress={() => press(choice)}
                      testID={`choice-${choice.id}`}
                    />
                  </React.Fragment>
                ))}
              </View>
            ) : (
              <View style={styles.stack} onLayout={onTilesLayout} pointerEvents={checked ? "none" : "auto"} testID="exercise-tiles">
                {stackChoices.map((choice, index) => (
                  <FadeUnderSheet
                    key={choice.id}
                    hidden={fadedIds.includes(choice.id)}
                    onLayout={onTileLayout(choice.id)}
                    style={compact ? styles.tileGapCompact : styles.tileGap}
                  >
                    <PopIn from="up" delay={80 + index * 60}>
                      <ChoiceTile
                        label={choice.label}
                        compact={compact}
                        tight={tight}
                        long={longChoices}
                        state={tileState(choice)}
                        onPress={() => press(choice)}
                        testID={`choice-${choice.id}`}
                      />
                    </PopIn>
                  </FadeUnderSheet>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </View>

      <View onLayout={(event) => setBarHeight(Math.round(event.nativeEvent.layout.height))}>
        <LessonBottomBar bottomInset={bottomInset} scrollHint={{ visible: more && !checked, onPress: scrollDown }}>
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
  squareRow: {
    flexDirection: "row",
    width: "100%"
  },
  squareGap: {
    width: space.md
  }
});
