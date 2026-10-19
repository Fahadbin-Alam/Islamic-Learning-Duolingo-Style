import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, ScrollView, StyleSheet, Text, View, type LayoutChangeEvent } from "react-native";
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
import { ScrollHint, useScrollMore } from "./ScrollHint";

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
  /** Gallery / tests: wrong CHECKs already made (2 or more shows the right order on a wrong check). */
  initialMisses?: number;
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
            {noBreakHyphens(label)}
          </Text>
        </View>
      </Tappable>
    </Animated.View>
  );
}

/** Tap-to-order mini game (wudu / salah steps). From the second wrong CHECK the sheet shows the right order. */
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
  initialMisses = 0,
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
  // Wrong CHECKs so far (the current one included while the sheet is up).
  const [misses, setMisses] = useState(() => (initialChecked && checked === false ? Math.max(1, initialMisses) : initialMisses));
  const { style: shakeStyle, shake } = useShake(8);
  const { compact, narrow } = useLessonCompact();
  const small = compact || narrow;

  const byId = useMemo(() => new Map(options.map((option) => [option.id, option])), [options]);
  const total = correctOrderIds.length || options.length;
  const ready = placed.length >= total;
  const wrongCount = placed.filter((id, index) => id !== correctOrderIds[index]).length;

  // Keep the last sheet copy while it slides away after TRY AGAIN.
  const lastSheet = useRef({ correct: false, wrongCount: 0, misses: 0 });
  if (checked !== null) {
    lastSheet.current = { correct: checked, wrongCount, misses };
  }
  const sheet = lastSheet.current;

  // --- keep the answer chips above the feedback sheet ---
  const { ref: scrollRef, scrollProps, more, scrollDown } = useScrollMore();
  const [rootHeight, setRootHeight] = useState(0);
  const [barHeight, setBarHeight] = useState(0);
  const [sheetHeight, setSheetHeight] = useState(0);
  const [answerBox, setAnswerBox] = useState<{ y: number; height: number } | null>(null);
  const chipTops = useRef<Record<string, number>>({});

  useEffect(() => {
    if (checked === null || !rootHeight || !sheetHeight || !answerBox) {
      return;
    }
    // Line the answer box up above the sheet, but never past its top: the first (often red) chips
    // must stay in view. When the box is too tall to fit, start at the first wrong chip.
    const visible = rootHeight - sheetHeight;
    const firstWrong = placed.find((id, index) => id !== correctOrderIds[index]);
    const wrongTop = firstWrong !== undefined ? chipTops.current[firstWrong] : undefined;
    const top = answerBox.y + (answerBox.height + space.md > visible && wrongTop !== undefined ? wrongTop : 0);
    const y = Math.max(0, Math.min(answerBox.y + answerBox.height + space.md - visible, top - space.sm));
    scrollRef.current?.scrollTo?.({ y, animated: true });
    // Only when a CHECK opens the sheet or the layout under it changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerBox, checked, rootHeight, sheetHeight]);

  const onAnswerLayout = (event: LayoutChangeEvent) => {
    const { y, height } = event.nativeEvent.layout;
    setAnswerBox({ y: Math.round(y), height: Math.round(height) });
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
      setMisses((count) => count + 1);
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
  // The first miss says how many steps are off; from the second one the sheet lists the right order.
  const showOrder = !sheet.correct && sheet.misses >= 2;
  const correctList = showOrder ? correctOrderIds.map((id) => byId.get(id)?.label ?? id) : undefined;
  const wrongTitle = showOrder
    ? "Correct order:"
    : sheet.wrongCount === 1
      ? "Almost! 1 step is mixed up"
      : `${sheet.wrongCount * 2 > total ? "Not quite!" : "Almost!"} ${sheet.wrongCount} steps are mixed up`;
  const extraBottom = checked !== null && sheetHeight ? Math.max(space.xxl, sheetHeight - barHeight + space.lg) : space.xxl;
  // Short phones: placed steps sit in two columns and used chips leave the bank, so all of it fits.
  const grid = compact;
  const bankOptions = grid ? bank.filter((option) => !placed.includes(option.id)) : bank;

  return (
    <View style={styles.root} testID={testID} onLayout={(event) => setRootHeight(Math.round(event.nativeEvent.layout.height))}>
      <View style={styles.scrollBox}>
        <ScrollView ref={scrollRef} style={styles.scroll} contentContainerStyle={[styles.content, { paddingBottom: extraBottom }]} {...scrollProps}>
          <QuestionBubble prompt={prompt} mascotVariant={mascotVariant} accent={accent} mood={mood} hideMascot={compact} />

          <Animated.View
            style={[styles.answerBox, compact ? styles.answerBoxCompact : null, shakeStyle]}
            onLayout={onAnswerLayout}
            accessibilityLabel={title}
            testID="order-answer"
          >
            {placed.map((id, index) => {
              const option = byId.get(id);
              return option ? (
                <View
                  key={id}
                  style={grid ? styles.gridCell : styles.flowCell}
                  onLayout={(event) => {
                    chipTops.current[id] = Math.round(event.nativeEvent.layout.y);
                  }}
                >
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
        <ScrollHint visible={more && checked === null} onPress={scrollDown} />
      </View>

      <View onLayout={(event) => setBarHeight(Math.round(event.nativeEvent.layout.height))}>
        <LessonBottomBar bottomInset={bottomInset}>
          {/* The result sound plays when the sheet opens, so CHECK itself stays quiet. */}
          <GameButton label="Check" fullWidth sound={false} disabled={!ready || checked !== null} onPress={check} testID="order-check" />
        </LessonBottomBar>
      </View>

      <FeedbackSheet
        visible={checked !== null}
        correct={sheet.correct}
        title={sheet.correct ? "Perfect order!" : wrongTitle}
        correctList={correctList}
        buttonLabel={sheet.correct ? "Continue" : "Try again"}
        onContinue={sheet.correct ? onDone : retry}
        playSound={playSound}
        bottomInset={bottomInset}
        onHeight={setSheetHeight}
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
