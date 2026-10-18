import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, useWindowDimensions, View, type LayoutChangeEvent } from "react-native";
import { ArabicText, hasArabic, isArabicOnly } from "../ArabicText";
import { ChoiceTile, type ChoiceTileState } from "../ChoiceTile";
import { GameButton } from "../GameButton";
import { Mascot, type MascotMood } from "../Mascot";
import { PopIn } from "../PopIn";
import { SpeechBubble } from "../SpeechBubble";
import { colors, darken, fonts, lighten, radii, space } from "../theme";
import { FeedbackSheet } from "./FeedbackSheet";
import { LessonBottomBar } from "./LessonHeader";
import { noBreakHyphens, shortWhy } from "./lessonText";

const AR = "؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿";
const ARABIC_RUN = new RegExp(`([${AR}][${AR}\\s]*[${AR}]|[${AR}])`);
const ARABIC_RUN_GLOBAL = new RegExp(ARABIC_RUN.source, "g");

/** Short phones (iPhone SE, small Androids): smaller mascot, no instruction line, tighter tiles. */
export function useLessonCompact() {
  const { width, height } = useWindowDimensions();
  return { compact: height > 0 && height < 700, narrow: width > 0 && width < 360 };
}

/**
 * Prompt text. All-Arabic prompts use the Arabic face. A prompt with one Arabic run inside English
 * ("What does بِسْمِ اللَّهِ mean?") becomes "What does this mean?" with the Arabic big on its own line.
 */
export function PromptText({ children, size = 19 }: { children: string; size?: number }) {
  if (isArabicOnly(children)) {
    return (
      <ArabicText size={Math.round(size * 1.5)} weight="bold" align="right">
        {children}
      </ArabicText>
    );
  }
  const lineStyle = [styles.prompt, { fontSize: size, lineHeight: Math.round(size * 1.35) }];
  if (!hasArabic(children)) {
    return <Text style={lineStyle}>{noBreakHyphens(children)}</Text>;
  }
  const runs = children.match(ARABIC_RUN_GLOBAL) ?? [];
  if (runs.length === 1) {
    const english = children
      .replace(ARABIC_RUN, "\u0000")
      .replace(/["“”'‘’«»]?\s*\u0000\s*["“”'‘’«»]?/, " this ")
      .replace(/\s+([?.!,])/g, "$1")
      .replace(/\s{2,}/g, " ")
      .trim();
    return (
      <View style={styles.promptStack}>
        <Text style={lineStyle}>{noBreakHyphens(english)}</Text>
        <ArabicText size={Math.round(size * 1.55)} weight="bold" color={colors.ink} style={styles.promptArabicLine}>
          {runs[0].trim()}
        </ArabicText>
      </View>
    );
  }
  const parts = children.split(ARABIC_RUN).filter((part) => part.length > 0);
  const arabicSize = Math.round(size * 1.3);
  return (
    <Text style={[styles.prompt, { fontSize: size, lineHeight: Math.round(arabicSize * 1.4) }]}>
      {parts.map((part, index) =>
        hasArabic(part) ? (
          <Text key={index} style={[styles.promptArabic, { fontSize: arabicSize }]}>
            {"⁧"}
            {part}
            {"⁩"}
          </Text>
        ) : (
          <Text key={index}>{noBreakHyphens(part)}</Text>
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
      <PopIn from="up" delay={60} style={styles.plainPrompt}>
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
  /** Shows a small "Try again!" chip next to the instruction. */
  retrying?: boolean;
  mascotVariant: string;
  accent: string;
  onSelect: (choiceId: string) => void;
  onCheck: () => void;
  onContinue: () => void;
  /** Id of the right choice. Lets the right tile turn green after a wrong pick; otherwise found by correctLabel. */
  correctChoiceId?: string;
  /** Seed for the praise / "Not quite!" word (e.g. the question id). Defaults to the prompt. */
  praiseSeed?: string;
  /** Play the correct / wrong sound when the sheet opens. Default true; pass false if the caller plays it. */
  playSound?: boolean;
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

const RETRY_INK = darken(colors.flame, 0.3);
const RETRY_BG = lighten(colors.flame, 0.85);

/** One question: instruction, mascot + prompt bubble, answer tiles, CHECK bar and the feedback sheet. */
export function ExerciseView({
  kind,
  prompt,
  choices,
  selectedChoiceId,
  result,
  retrying,
  mascotVariant,
  accent,
  onSelect,
  onCheck,
  onContinue,
  correctChoiceId,
  praiseSeed,
  playSound = true,
  defaultWhyOpen,
  bottomInset,
  testID = "exercise-view"
}: ExerciseViewProps) {
  const checked = Boolean(result);
  const { compact } = useLessonCompact();

  // Keep the last result so the sheet does not flip to "wrong" while it slides away.
  const lastResult = useRef(result);
  if (result) {
    lastResult.current = result;
  }
  const shown = result ?? lastResult.current;

  const matchedId = shown ? choices.find((choice) => choice.label.trim() === shown.correctLabel.trim())?.id : undefined;
  const rightId = correctChoiceId ?? matchedId ?? (result?.correct ? selectedChoiceId : undefined);

  // --- keep the checked tiles above the feedback sheet ---
  const scrollRef = useRef<ScrollView>(null);
  const [rootHeight, setRootHeight] = useState(0);
  const [barHeight, setBarHeight] = useState(0);
  const [sheetHeight, setSheetHeight] = useState(0);
  const [tilesBottom, setTilesBottom] = useState(0);
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
    if (!rootHeight || !sheetHeight || !tilesBottom) {
      return;
    }
    const y = Math.max(0, tilesBottom + space.md - (rootHeight - sheetHeight));
    if (y > 0) {
      scrollRef.current?.scrollTo?.({ y, animated: true });
    }
  }, [checked, rootHeight, sheetHeight, tilesBottom]);

  const onTilesLayout = (event: LayoutChangeEvent) => {
    const { y, height } = event.nativeEvent.layout;
    setTilesBottom(Math.round(y + height));
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
  const tfChoices = truePick && falsePick && truePick !== falsePick ? [truePick, falsePick] : null;

  const why = shown ? shortWhy({ explanation: shown.why, prompt, correctLabel: shown.correctLabel }) : undefined;
  // The green tile already shows the answer; repeat it in the sheet only when no tile could be marked.
  const sheetLabel = shown && !shown.correct && !rightId ? shown.correctLabel : undefined;
  const mood: MascotMood = result ? (result.correct ? "cheer" : "sad") : "think";
  const showInstruction = !compact;
  const extraBottom = checked && sheetHeight ? Math.max(space.xxl, sheetHeight - barHeight + space.lg) : space.xxl;

  return (
    <View style={styles.root} testID={testID} onLayout={(event) => setRootHeight(Math.round(event.nativeEvent.layout.height))}>
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: extraBottom }]}
        keyboardShouldPersistTaps="handled"
      >
        {showInstruction || retrying ? (
          <View style={styles.instructionRow}>
            {showInstruction ? (
              <Text style={styles.instruction}>{trueFalse ? "True or false?" : "Choose the answer"}</Text>
            ) : (
              <View />
            )}
            {retrying ? (
              <PopIn style={styles.retryChip}>
                <Text style={styles.retryText}>Try again!</Text>
              </PopIn>
            ) : null}
          </View>
        ) : null}
        <QuestionBubble prompt={prompt} mascotVariant={mascotVariant} accent={accent} mood={mood} />

        {tfChoices ? (
          <View style={styles.squareRow} onLayout={onTilesLayout} pointerEvents={checked ? "none" : "auto"}>
            {tfChoices.map((choice, index) => (
              <React.Fragment key={choice.id}>
                {index > 0 ? <View style={styles.squareGap} /> : null}
                <ChoiceTile
                  label={choice === truePick ? "True" : "False"}
                  icon={choice === truePick ? "check" : "close"}
                  layout="square"
                  state={tileState(choice)}
                  onPress={() => press(choice)}
                  testID={`choice-${choice.id}`}
                />
              </React.Fragment>
            ))}
          </View>
        ) : (
          <View style={styles.stack} onLayout={onTilesLayout} pointerEvents={checked ? "none" : "auto"}>
            {choices.map((choice, index) => (
              <PopIn key={choice.id} from="up" delay={80 + index * 60} style={compact ? styles.tileGapCompact : styles.tileGap}>
                <ChoiceTile label={choice.label} state={tileState(choice)} onPress={() => press(choice)} testID={`choice-${choice.id}`} />
              </PopIn>
            ))}
          </View>
        )}
      </ScrollView>

      <View onLayout={(event) => setBarHeight(Math.round(event.nativeEvent.layout.height))}>
        <LessonBottomBar bottomInset={bottomInset}>
          <GameButton label="Check" fullWidth disabled={!selectedChoiceId || checked} onPress={onCheck} testID="exercise-check" />
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
  scroll: {
    flex: 1
  },
  content: {
    paddingHorizontal: space.lg,
    paddingTop: space.sm
  },
  instructionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 28,
    marginBottom: space.sm
  },
  retryChip: {
    marginLeft: space.sm,
    backgroundColor: RETRY_BG,
    borderRadius: radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 3
  },
  retryText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 15,
    lineHeight: 20,
    color: RETRY_INK
  },
  instruction: {
    flexShrink: 1,
    fontFamily: fonts.displayHeavy,
    fontSize: 16,
    lineHeight: 22,
    color: colors.inkSoft
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
    alignSelf: "center"
  },
  promptArabic: {
    fontFamily: fonts.arabicBold,
    writingDirection: "rtl"
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
