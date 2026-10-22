import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, ScrollView, StyleSheet, Text, View, type LayoutChangeEvent } from "react-native";
import { withHonorifics } from "../ArabicText";
import { GameButton } from "../GameButton";
import { Icon, type IconName } from "../Icon";
import type { MascotMood } from "../Mascot";
import { useShake } from "../PopIn";
import { Tappable } from "../Tappable";
import { colors, fonts, lighten, radii, space, topicPalette } from "../theme";
import { QuestionBubble, useLessonCompact } from "./ExerciseView";
import { CORRECT_TEXT, FeedbackSheet, WRONG_TEXT } from "./FeedbackSheet";
import { LessonBottomBar } from "./LessonHeader";
import { noBreakHyphens } from "./lessonText";
import { useScrollMore } from "./ScrollHint";
import { sheetRoom, type LayoutBox } from "./sheetFit";

export type OrderOption = { id: string; label: string; icon?: IconName };

export type OrderGameProps = {
  /** Lesson / activity name. Used as the accessibility label of the answer box. */
  title: string;
  /** What the mascot says. Default "Put the steps in order!". */
  prompt?: string;
  options: OrderOption[];
  correctOrderIds: string[];
  mascotVariant: string;
  accent: string;
  /** Called by CONTINUE after a correct order. */
  onDone: () => void;
  /** Optional: called on every CHECK with the result. */
  onChecked?: (correct: boolean) => void;
  /** Gallery / tests: start with these ids already placed. */
  initialPlacedIds?: string[];
  /** Gallery / tests: start already checked (with initialPlacedIds). */
  initialChecked?: boolean;
  /** Play the correct / wrong sound when the sheet opens. Default true; pass false if the caller plays it. */
  playSound?: boolean;
  bottomInset?: number;
  testID?: string;
};

function seedFrom(ids: string[]) {
  let hash = 2166136261;
  const joined = ids.join("|");
  for (let index = 0; index < joined.length; index += 1) {
    hash ^= joined.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/** Deterministic shuffle (seeded by the ids) that is never already in the given order. */
export function seededShuffle<T extends { id: string }>(items: T[], correctOrderIds: string[]): T[] {
  let state = seedFrom(items.map((item) => item.id)) || 1;
  const next = () => {
    // mulberry32
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const result = items.slice();
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(next() * (index + 1));
    [result[index], result[swap]] = [result[swap], result[index]];
  }
  // Never hand over the answer: not the whole order, and not the first step as the first tile.
  if (result.length > 1 && result[0].id === correctOrderIds[0]) {
    result.push(result.shift() as T);
  }
  return result;
}

type ChipTone = "idle" | "placed" | "correct" | "wrong";

function Chip({
  label,
  icon,
  number,
  tone,
  accent,
  onPress,
  disabled,
  hidden,
  small,
  fill,
  testID
}: {
  label: string;
  icon?: IconName;
  number?: number;
  tone: ChipTone;
  accent: string;
  onPress?: () => void;
  disabled?: boolean;
  /** Keeps the slot size in the bank but shows an empty grey well. */
  hidden?: boolean;
  /** Short / narrow phones: a slightly smaller chip. */
  small?: boolean;
  /** Short phones: the placed chip fills its half of a two-column grid. */
  fill?: boolean;
  testID?: string;
}) {
  const pop = useRef(new Animated.Value(0.6)).current;
  useEffect(() => {
    const animation = Animated.spring(pop, { toValue: 1, friction: 5, tension: 220, useNativeDriver: true });
    animation.start();
    return () => animation.stop();
  }, [pop]);

  const palette = topicPalette(accent);
  const look =
    tone === "correct"
      ? { bg: colors.correctBg, border: lighten(colors.green, 0.2), lip: colors.green, ink: CORRECT_TEXT, num: colors.green }
      : tone === "wrong"
        ? { bg: colors.wrongBg, border: lighten(colors.heart, 0.2), lip: colors.heart, ink: WRONG_TEXT, num: colors.heart }
        : tone === "placed"
          ? { bg: colors.white, border: palette.soft, lip: palette.soft, ink: colors.ink, num: palette.main }
          : { bg: colors.white, border: colors.line, lip: colors.lineLip, ink: colors.ink, num: palette.main };

  if (hidden) {
    return (
      <View style={[styles.chipOuter, styles.wellOuter]} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        <View style={[styles.well, small ? styles.faceSmall : null]}>
          {icon ? <View style={[styles.chipIcon, styles.hiddenIcon]} /> : null}
          <Text style={[styles.chipText, small ? styles.chipTextSmall : null, styles.hiddenText]}>{label}</Text>
        </View>
      </View>
    );
  }

  return (
    <Animated.View style={[styles.chipOuter, fill ? styles.chipOuterFill : null, { transform: [{ scale: pop }] }]}>
      <Tappable onPress={onPress} disabled={disabled} pressScale={0.94} accessibilityLabel={label} testID={testID} style={styles.chipPress}>
        <View pointerEvents="none" style={[styles.chipLip, { backgroundColor: look.lip }]} />
        <View style={[styles.chipFace, small ? styles.faceSmall : null, fill ? styles.faceFill : null, { backgroundColor: look.bg, borderColor: look.border }]}>
          {number ? (
            <View style={[styles.number, fill ? styles.numberFill : null, { backgroundColor: look.num }]}>
              <Text style={[styles.numberText, fill ? styles.numberTextFill : null]}>{number}</Text>
            </View>
          ) : null}
          {icon ? (
            <View style={styles.chipIcon}>
              <Icon name={icon} size={24} />
            </View>
          ) : null}
          <Text style={[styles.chipText, small ? styles.chipTextSmall : null, fill ? styles.chipTextFill : null, { color: look.ink }]}>
            {withHonorifics(noBreakHyphens(label))}
          </Text>
        </View>
      </Tappable>
    </Animated.View>
  );
}

/** A placed step may reach this close to the sheet's top edge and still stay. */
const CHIP_AIR = 2;
/**
 * How long the steps wait for the sheet to say its height is the one it keeps (its list has measured its rows) before
 * they fold away by the height it has.
 */
const FOLD_SETTLE_MS = 120;

/** Tap-to-order mini game (wudu / salah steps). A wrong CHECK shows the right order right away, like Duolingo. */
export function OrderGame({
  title,
  prompt = "Put the steps in order!",
  options,
  correctOrderIds,
  mascotVariant,
  accent,
  onDone,
  onChecked,
  initialPlacedIds,
  initialChecked,
  playSound = true,
  bottomInset,
  testID = "order-game"
}: OrderGameProps) {
  const bank = useMemo(() => seededShuffle(options, correctOrderIds), [options, correctOrderIds]);
  const [placed, setPlaced] = useState<string[]>(() => (initialPlacedIds ?? []).filter((id) => options.some((o) => o.id === id)));
  const [checked, setChecked] = useState<null | boolean>(() => {
    if (!initialChecked || !initialPlacedIds) {
      return null;
    }
    return initialPlacedIds.join("|") === correctOrderIds.join("|");
  });
  const { style: shakeStyle, shake } = useShake(8);
  const { compact, narrow } = useLessonCompact();
  const small = compact || narrow;

  const byId = useMemo(() => new Map(options.map((option) => [option.id, option])), [options]);
  const total = correctOrderIds.length || options.length;
  const ready = placed.length >= total;

  // Keep the last sheet copy while it slides away after TRY AGAIN.
  // The steps the learner had in another place are lit up in the sheet's list, as the red chips may fold away under it.
  const lastSheet = useRef<{ correct: boolean; missed: number[] }>({ correct: false, missed: [] });
  if (checked !== null) {
    lastSheet.current = { correct: checked, missed: correctOrderIds.flatMap((id, index) => (placed[index] === id ? [] : [index])) };
  }
  const sheet = lastSheet.current;

  // --- keep the prompt on screen above the feedback sheet ---
  const { ref: scrollRef, scrollProps, more, scrollDown } = useScrollMore();
  const [rootHeight, setRootHeight] = useState(0);
  const [barHeight, setBarHeight] = useState(0);
  const [sheetHeight, setSheetHeight] = useState(0);
  // The sheet has said its height is the one it keeps (a list that has not yet measured its rows shows a row more).
  const [sheetSettled, setSheetSettled] = useState(false);
  const [settleTimedOut, setSettleTimedOut] = useState(false);
  const [promptBox, setPromptBox] = useState<LayoutBox | null>(null);
  const [answerBox, setAnswerBox] = useState<LayoutBox | null>(null);
  const chipBoxes = useRef<Record<string, LayoutBox>>({});
  const [chipMoves, setChipMoves] = useState(0);
  // How many placed steps stay while the sheet is up (the rest fold away); undefined: all of them.
  const kept = useRef<number | undefined>(undefined);
  const onSheetHeight = (height: number, settled = true) => {
    setSheetHeight(height);
    setSheetSettled(settled);
  };

  // The sheet never covers the prompt: the question never scrolls past the prompt's top, and the sheet is never
  // taller than the room under it. It lists the whole right order, so the placed steps may go under it.
  const promptRoom = promptBox && rootHeight ? sheetRoom({ visibleBottom: rootHeight, promptTop: promptBox.y, focusTop: promptBox.y, focusBottom: promptBox.y + promptBox.height }) : undefined;
  const scrollY =
    answerBox && promptRoom && sheetHeight ? Math.max(0, Math.min(answerBox.y + answerBox.height + space.md - (rootHeight - sheetHeight), promptRoom.furthest)) : 0;

  useEffect(() => {
    if (checked === null || !rootHeight || !sheetHeight || !answerBox) {
      return;
    }
    scrollRef.current?.scrollTo?.({ y: scrollY, animated: true });
    // Only when a CHECK opens the sheet or the layout under it changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, rootHeight, scrollY, sheetHeight]);

  // The placed steps the sheet's top edge would cut, and every step after them, fold away while it is up, so no
  // step is ever cut by its edge. They are counted from the first one that does not sit wholly above it.
  let keep: number | undefined;
  if (checked !== null && answerBox && rootHeight && sheetHeight && placed.every((id) => chipBoxes.current[id])) {
    const sheetTop = scrollY + rootHeight - sheetHeight;
    const first = placed.findIndex((id) => answerBox.y + chipBoxes.current[id].y + chipBoxes.current[id].height > sheetTop - CHIP_AIR);
    keep = first < 0 ? placed.length : first;
  }
  // They fold in the render that knows the height the sheet keeps, while the sheet is still coming up from below the
  // screen, so its edge never reaches a step that is about to go (a wait would let it cut them as it rises). A sheet
  // that has not said so in a moment is taken at the height it has. While it is up they only ever fold, never come
  // back, so a step never blinks.
  const measured = keep !== undefined;
  useEffect(() => {
    if (checked === null) {
      setSheetSettled(false);
      setSettleTimedOut(false);
      return undefined;
    }
    if (!measured || sheetSettled) {
      return undefined;
    }
    const timer = setTimeout(() => setSettleTimedOut(true), FOLD_SETTLE_MS);
    return () => clearTimeout(timer);
  }, [checked, measured, sheetSettled]);
  if (checked === null) {
    kept.current = undefined;
  } else if (keep !== undefined && (sheetSettled || settleTimedOut)) {
    kept.current = Math.min(kept.current ?? keep, keep);
  }
  const shownPlaced = checked !== null && kept.current !== undefined ? placed.slice(0, kept.current) : placed;

  const onAnswerLayout = (event: LayoutChangeEvent) => {
    const { y, height } = event.nativeEvent.layout;
    setAnswerBox({ y: Math.round(y), height: Math.round(height) });
  };
  const onChipLayout = (id: string) => (event: LayoutChangeEvent) => {
    const box = { y: Math.round(event.nativeEvent.layout.y), height: Math.round(event.nativeEvent.layout.height) };
    const before = chipBoxes.current[id];
    chipBoxes.current[id] = box;
    if (!before || before.y !== box.y || before.height !== box.height) {
      setChipMoves((count) => count + 1);
    }
  };

  const add = (id: string) => {
    if (checked !== null || placed.includes(id) || placed.length >= total) {
      return;
    }
    setPlaced((list) => [...list, id]);
  };
  const remove = (id: string) => {
    if (checked !== null) {
      return;
    }
    setPlaced((list) => list.filter((item) => item !== id));
  };
  const check = () => {
    const correct = placed.join("|") === correctOrderIds.join("|");
    setChecked(correct);
    if (!correct) {
      shake();
    }
    onChecked?.(correct);
  };
  /** TRY AGAIN keeps the steps that were already right at the start. */
  const retry = () => {
    const firstWrong = placed.findIndex((id, index) => id !== correctOrderIds[index]);
    setPlaced(firstWrong < 0 ? [] : placed.slice(0, firstWrong));
    setChecked(null);
    scrollRef.current?.scrollTo?.({ y: 0, animated: true });
  };

  const toneAt = (id: string, index: number): ChipTone =>
    checked === null ? "placed" : correctOrderIds[index] === id ? "correct" : "wrong";
  const mood: MascotMood = checked === null ? "think" : checked ? "cheer" : "sad";
  // A miss lists the right order at once (one numbered column), so nobody has to guess it.
  const correctList = sheet.correct ? undefined : correctOrderIds.map((id) => byId.get(id)?.label ?? id);
  const missedRows = sheet.correct ? undefined : sheet.missed;
  const extraBottom = checked !== null && sheetHeight ? Math.max(space.xxl, sheetHeight - barHeight + space.lg) : space.xxl;
  // Short phones: placed steps sit in two columns and used chips leave the bank, so all of it fits.
  const grid = compact;
  const bankOptions = grid ? bank.filter((option) => !placed.includes(option.id)) : bank;

  return (
    <View style={styles.root} testID={testID} onLayout={(event) => setRootHeight(Math.round(event.nativeEvent.layout.height))}>
      <View style={styles.scrollBox}>
        <ScrollView ref={scrollRef} style={styles.scroll} contentContainerStyle={[styles.content, { paddingBottom: extraBottom }]} {...scrollProps}>
          <View
            onLayout={(event) => setPromptBox({ y: Math.round(event.nativeEvent.layout.y), height: Math.round(event.nativeEvent.layout.height) })}
            testID="order-prompt"
          >
            <QuestionBubble prompt={prompt} mascotVariant={mascotVariant} accent={accent} mood={mood} hideMascot={compact} />
          </View>

          <Animated.View
            style={[styles.answerBox, compact ? styles.answerBoxCompact : null, shakeStyle]}
            onLayout={onAnswerLayout}
            accessibilityLabel={title}
            testID="order-answer"
          >
            {shownPlaced.map((id, index) => {
              const option = byId.get(id);
              return option ? (
                <View key={id} style={grid ? styles.gridCell : styles.flowCell} onLayout={onChipLayout(id)} testID={`order-cell-${id}`}>
                  <Chip
                    label={option.label}
                    icon={option.icon}
                    number={index + 1}
                    tone={toneAt(id, index)}
                    small={small}
                    fill={grid}
                    accent={accent}
                    onPress={() => remove(id)}
                    disabled={checked !== null}
                    testID={`order-placed-${id}`}
                  />
                </View>
              ) : null;
            })}
          </Animated.View>

          {placed.length < total ? (
            <View style={[styles.bank, compact ? styles.bankCompact : null]} testID="order-bank">
              {bankOptions.map((option) => (
                <Chip
                  key={`${option.id}-${placed.includes(option.id) ? "used" : "free"}`}
                  label={option.label}
                  icon={option.icon}
                  tone="idle"
                  small={small}
                  accent={accent}
                  hidden={placed.includes(option.id)}
                  onPress={() => add(option.id)}
                  disabled={checked !== null}
                  testID={`order-bank-${option.id}`}
                />
              ))}
            </View>
          ) : null}
        </ScrollView>
      </View>

      <View onLayout={(event) => setBarHeight(Math.round(event.nativeEvent.layout.height))}>
        <LessonBottomBar bottomInset={bottomInset} scrollHint={{ visible: more && checked === null, onPress: scrollDown }}>
          {/* The result sound plays when the sheet opens, so CHECK itself stays quiet. */}
          <GameButton label="Check" fullWidth sound={false} disabled={!ready || checked !== null} onPress={check} testID="order-check" />
        </LessonBottomBar>
      </View>

      <FeedbackSheet
        visible={checked !== null}
        correct={sheet.correct}
        title={sheet.correct ? "Perfect order!" : "Correct order:"}
        correctList={correctList}
        missedRows={missedRows}
        buttonLabel={sheet.correct ? "Continue" : "Try again"}
        onContinue={sheet.correct ? onDone : retry}
        playSound={playSound}
        bottomInset={bottomInset}
        maxHeight={promptRoom?.room}
        onHeight={onSheetHeight}
      />
    </View>
  );
}

const CHIP_LIP = 4;

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
  answerBox: {
    minHeight: 112,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: colors.lineLip,
    borderRadius: radii.tile,
    backgroundColor: colors.mist,
    padding: space.sm,
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start"
  },
  answerBoxCompact: {
    minHeight: 60,
    padding: 4
  },
  flowCell: {
    maxWidth: "100%"
  },
  gridCell: {
    width: "50%"
  },
  bank: {
    marginTop: space.xl,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  bankCompact: {
    marginTop: space.md
  },
  chipOuter: {
    maxWidth: "100%",
    margin: 4
  },
  chipOuterFill: {
    margin: 3
  },
  chipPress: {
    position: "relative",
    paddingBottom: CHIP_LIP,
    maxWidth: "100%"
  },
  chipLip: {
    position: "absolute",
    left: 0,
    right: 0,
    top: CHIP_LIP,
    bottom: 0,
    borderRadius: 14
  },
  chipFace: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
    minHeight: 50,
    maxWidth: "100%"
  },
  chipIcon: {
    width: 24,
    height: 24,
    marginRight: 6
  },
  hiddenIcon: {
    opacity: 0
  },
  chipText: {
    flexShrink: 1,
    fontFamily: fonts.bodyHeavy,
    fontSize: 17,
    lineHeight: 22
  },
  faceSmall: {
    minHeight: 44,
    paddingHorizontal: 10
  },
  chipTextSmall: {
    fontSize: 16,
    lineHeight: 21
  },
  faceFill: {
    minHeight: 38,
    paddingHorizontal: 7,
    paddingVertical: 4
  },
  chipTextFill: {
    fontSize: 15,
    lineHeight: 19
  },
  numberFill: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginRight: 5
  },
  numberTextFill: {
    fontSize: 12,
    lineHeight: 15
  },
  hiddenText: {
    color: "transparent"
  },
  wellOuter: {},
  well: {
    borderRadius: 14,
    backgroundColor: colors.locked,
    borderWidth: 2,
    borderColor: colors.locked,
    paddingHorizontal: 12,
    paddingVertical: 6,
    minHeight: 50,
    marginTop: CHIP_LIP,
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "100%"
  },
  number: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8
  },
  numberText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 14,
    lineHeight: 18,
    color: colors.white,
    includeFontPadding: false
  }
});
