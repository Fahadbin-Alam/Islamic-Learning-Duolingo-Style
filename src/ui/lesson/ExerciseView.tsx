import React, { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, useWindowDimensions, View, type LayoutChangeEvent } from "react-native";
import type { GameSoundEvent } from "../../services/gameSoundLibrary";
import { ArabicText, hasArabic, isArabicOnly, isQuranText, withHonorifics } from "../ArabicText";
import { ChoiceTile, LONG_LABEL, type ChoiceTileState } from "../ChoiceTile";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { Mascot, type MascotMood } from "../Mascot";
import { PopIn } from "../PopIn";
import { SpeechBubble } from "../SpeechBubble";
import { colors, darken, fonts, lighten, radii, space } from "../theme";
import { FeedbackSheet } from "./FeedbackSheet";
import { LessonBottomBar } from "./LessonHeader";
import { noBreakHyphens, shortWhy } from "./lessonText";
import { useScrollMore } from "./ScrollHint";

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
};

/** Mascot next to a speech bubble holding the question. Very long prompts drop the mascot and use the full width. */
export function QuestionBubble({ prompt, mascotVariant, accent, mood = "think", hideMascot }: QuestionBubbleProps) {
  const { compact, narrow } = useLessonCompact();
  const long = prompt.length > LONG_PROMPT;
  const promptSize = long || compact ? 17 : narrow ? 18 : 19;
  if (long || hideMascot) {
    return (
      <PopIn from="up" delay={60} style={[styles.plainPrompt, compact ? styles.plainPromptCompact : null]}>
        <PromptText size={promptSize}>{prompt}</PromptText>
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

export type ExerciseChoice = { id: string; label: string };
export type ExerciseResult = { correct: boolean; correctLabel: string; why?: string };

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
 * The tiles' order for a try: as given the first time, then rotated so no tile keeps its place and each
 * new try differs from the one before (two tiles simply swap). Deterministic, so a re-render never moves them.
 */
export function attemptOrder<T>(items: T[], attempt = 0): T[] {
  if (attempt <= 0 || items.length < 2) {
    return items;
  }
  const shift = ((Math.floor(attempt) - 1) % (items.length - 1)) + 1;
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

type Box = { y: number; height: number };

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
  const { compact } = useLessonCompact();

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

  // --- keep the right tile above the feedback sheet ---
  const { ref: scrollRef, scrollProps, more, scrollDown } = useScrollMore();
  const [rootHeight, setRootHeight] = useState(0);
  const [barHeight, setBarHeight] = useState(0);
  const [sheetHeight, setSheetHeight] = useState(0);
  const [tilesBox, setTilesBox] = useState<Box | null>(null);
  const tileBoxes = useRef<Record<string, Box>>({});
  const wasChecked = useRef(checked);

  useEffect(() => {
    if (!checked) {
      if (wasChecked.current) {
        scrollRef.current?.scrollTo?.({ y: 0, animated: false });
      }
      wasChecked.current = false;
      return;
    }
    wasChecked.current = true;
    if (!rootHeight || !sheetHeight || !tilesBox) {
      return;
    }
    // Show the green tile (and the picked one when it sits above it) right above the sheet.
    const focusId = rightId ?? selectedChoiceId;
    const tile = focusId ? tileBoxes.current[focusId] : undefined;
    const top = tilesBox.y + (tile?.y ?? 0);
    const bottom = tile ? top + tile.height : tilesBox.y + tilesBox.height;
    const y = Math.max(0, Math.min(bottom + space.md - (rootHeight - sheetHeight), top - space.sm));
    if (y > 0) {
      scrollRef.current?.scrollTo?.({ y, animated: true });
    }
  }, [checked, rightId, rootHeight, scrollRef, selectedChoiceId, sheetHeight, tilesBox]);

  const onTilesLayout = (event: LayoutChangeEvent) => {
    const { y, height } = event.nativeEvent.layout;
    setTilesBox({ y: Math.round(y), height: Math.round(height) });
  };
  const onTileLayout = (id: string) => (event: LayoutChangeEvent) => {
    const { y, height } = event.nativeEvent.layout;
    tileBoxes.current[id] = { y: Math.round(y), height: Math.round(height) };
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

  const trueFalse = kind === "true_false";
  const truePick = trueFalse ? choices.find(isTrueChoice) : undefined;
  const falsePick = trueFalse ? choices.find(isFalseChoice) : undefined;
  const tfChoices = truePick && falsePick && truePick !== falsePick ? attemptOrder([truePick, falsePick], shownAttempt) : null;

  const why = shown ? shortWhy({ explanation: shown.why, prompt, correctLabel: shown.correctLabel }) : undefined;
  // "Correct answer: ..." always names the answer, even though the green tile shows it too.
  const sheetLabel = shown && !shown.correct ? shown.correctLabel : undefined;
  const mood: MascotMood = result ? (result.correct ? "cheer" : "sad") : "think";
  // Four answers do not fit next to a mascot on a short phone.
  const hideMascot = compact && !tfChoices && choices.length >= 4;
  // One long answer makes the whole set use the smaller text, so the tiles match.
  const longChoices = choices.some((choice) => choice.label.length > LONG_LABEL);
  const extraBottom = checked && sheetHeight ? Math.max(space.xxl, sheetHeight - barHeight + space.lg) : space.xxl;

  return (
    <View style={styles.root} testID={testID} onLayout={(event) => setRootHeight(Math.round(event.nativeEvent.layout.height))}>
      <View style={styles.scrollBox}>
        <ScrollView
          ref={scrollRef}
          style={styles.scroll}
          contentContainerStyle={[styles.content, { paddingBottom: extraBottom }]}
          keyboardShouldPersistTaps="handled"
          {...scrollProps}
        >
          {review || shownAttempt > 0 ? (
            <View style={styles.cueRow}>
              {review ? (
                <PopIn style={[styles.cueChip, styles.reviewChip]}>
                  <Icon name="practice" size={18} />
                  <Text style={[styles.cueText, styles.reviewText]} testID="exercise-review">
                    REVIEW
                  </Text>
                </PopIn>
              ) : null}
              {shownAttempt > 0 ? (
                <PopIn style={[styles.cueChip, styles.retryChip]}>
                  <Text style={[styles.cueText, styles.retryText]}>Try again!</Text>
                </PopIn>
              ) : null}
            </View>
          ) : null}
          <QuestionBubble prompt={prompt} mascotVariant={mascotVariant} accent={accent} mood={mood} hideMascot={hideMascot} />

          {tfChoices ? (
            <View style={styles.squareRow} onLayout={onTilesLayout} pointerEvents={checked ? "none" : "auto"}>
              {tfChoices.map((choice, index) => (
                <React.Fragment key={choice.id}>
                  {index > 0 ? <View style={styles.squareGap} /> : null}
                  <ChoiceTile
                    label={choice === truePick ? "True" : "False"}
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
            <View style={styles.stack} onLayout={onTilesLayout} pointerEvents={checked ? "none" : "auto"}>
              {shownChoices.map((choice, index) => (
                <View key={choice.id} onLayout={onTileLayout(choice.id)} style={compact ? styles.tileGapCompact : styles.tileGap}>
                  <PopIn from="up" delay={80 + index * 60}>
                    <ChoiceTile
                      label={choice.label}
                      compact={compact}
                      long={longChoices}
                      state={tileState(choice)}
                      onPress={() => press(choice)}
                      testID={`choice-${choice.id}`}
                    />
                  </PopIn>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>

      <View onLayout={(event) => setBarHeight(Math.round(event.nativeEvent.layout.height))}>
        <LessonBottomBar bottomInset={bottomInset} scrollHint={{ visible: more && !checked, onPress: scrollDown }}>
          {/* The correct / wrong sound follows right away, so CHECK itself stays quiet. */}
          <GameButton label="Check" fullWidth sound={false} disabled={!selectedChoiceId || checked} onPress={onCheck} testID="exercise-check" />
        </LessonBottomBar>
      </View>

      <FeedbackSheet
        visible={checked}
        correct={Boolean(shown?.correct)}
        correctLabel={sheetLabel}
        why={why}
        onContinue={onContinue}
        praiseSeed={praiseSeed ?? prompt}
        playSound={playSound}
        buttonSound={continueSound}
        defaultWhyOpen={defaultWhyOpen}
        bottomInset={bottomInset}
        onHeight={setSheetHeight}
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
    marginRight: space.sm,
    marginBottom: space.xs
  },
  cueText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 15,
    lineHeight: 20
  },
  reviewChip: {
    backgroundColor: REVIEW_BG,
    paddingLeft: 8
  },
  reviewText: {
    marginLeft: 5,
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
    marginLeft: space.xs,
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
