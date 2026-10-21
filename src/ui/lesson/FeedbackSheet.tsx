import React, { useEffect, useRef, useState } from "react";
import { Animated, Platform, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import type { GameSoundEvent } from "../../services/gameSoundLibrary";
import { ArabicText, hasArabic, isArabicOnly, isQuranText, withHonorifics } from "../ArabicText";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { Sheet } from "../Sheet";
import { Tappable } from "../Tappable";
import { feedback } from "../sound";
import { colors, darken, fonts, radii, space, withAlpha } from "../theme";
import { noBreakHyphens } from "./lessonText";
import { SCROLL_HINT_ROOM, ScrollHintGap, useScrollMore } from "./ScrollHint";

export const PRAISE_WORDS = ["Great job!", "Nice!", "Excellent!", "Amazing!", "You got it!", "MashaAllah!"] as const;

function hashString(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/** Stable praise word for a seed (e.g. the question id). */
export function pickPraise(seed?: string) {
  return PRAISE_WORDS[hashString(seed ?? "praise") % PRAISE_WORDS.length];
}

/** Heading of the red sheet (copy bank: "Correct answer:" followed by the answer). */
export const WRONG_TITLE = "Correct answer:";

/** Text on the pink / mint sheets, a step darker than the tokens so it passes 4.5:1. */
export const WRONG_TEXT = darken(colors.wrongInk, 0.15);
export const CORRECT_TEXT = darken(colors.correctInk, 0.12);

const SHEET_PAD = 20 + 16;
/** A slim sheet (a short phone, under the green tile): less padding and the md button. */
const SLIM_PAD_TOP = 12;
const SLIM_PAD_BOTTOM = 8;
const SHEET_PAD_SLIM = SLIM_PAD_TOP + SLIM_PAD_BOTTOM;
/** The lg and md buttons with their 4 px lip. */
const BUTTON_LG = 58;
const BUTTON_MD = 50;
/** Enough body to read: two lines of the Why text, or the whole body when it is shorter. */
const READABLE_BODY = 50;
const SHEET_INSET = Platform.OS === "ios" ? 30 : 16;
/** The sheet never grows past this share of the window; a long answer scrolls inside it instead. */
export const SHEET_MAX_SHARE = 0.6;
/** A "correct order" list may take a little more, so an eight-step order fits on a small phone. */
const LIST_MAX_SHARE = 0.66;
const MIN_BODY = 64;
/** Under `maxHeight` the body may shrink to about one line: the rest scrolls behind the "more" arrow. */
const MIN_BODY_TIGHT = 36;
/** The body has no bottom padding, so even one hidden list row (20 px) shows the arrow. */
const BODY_SLACK = 4;

export type FeedbackSheetProps = {
  visible: boolean;
  correct: boolean;
  correctLabel?: string;
  why?: string;
  onContinue: () => void;
  /** Picks the praise word so it stays the same across renders. */
  praiseSeed?: string;
  /** Overrides the praise word / "Correct answer:" heading. */
  title?: string;
  /** Overrides CONTINUE / GOT IT. */
  buttonLabel?: string;
  /** Sound of the button. Default the soft tap; false when the next screen plays its own (lesson end). */
  buttonSound?: GameSoundEvent | false;
  /** Shown as a numbered column instead of correctLabel. */
  correctList?: string[];
  /** Play the correct / wrong sound + haptic when the sheet opens. Default true. */
  playSound?: boolean;
  /** Start with the Why line open (gallery / tests). */
  defaultWhyOpen?: boolean;
  bottomInset?: number;
  /**
   * The tallest the whole sheet may be (panel padding included), e.g. the room under the green tile on a short
   * phone. The part between the title and the button scrolls instead, and when that would leave too little of
   * it to read the sheet slims down (less padding, a smaller button). Default: SHEET_MAX_SHARE of the window.
   */
  maxHeight?: number;
  /** Told whether even a slim sheet under `maxHeight` leaves too little of the answer and Why line to read. */
  onCramped?: (cramped: boolean) => void;
  /** Reports the sheet's full height (panel padding included) whenever it changes. */
  onHeight?: (height: number) => void;
  testID?: string;
};

/** The answer sheet that springs up after CHECK: praise when right, the correct answer when wrong. */
export function FeedbackSheet({
  visible,
  correct,
  correctLabel,
  why,
  onContinue,
  praiseSeed,
  title,
  buttonLabel,
  correctList,
  buttonSound,
  playSound = true,
  defaultWhyOpen = false,
  bottomInset,
  maxHeight,
  onCramped,
  onHeight,
  testID = "feedback-sheet"
}: FeedbackSheetProps) {
  const [whyOpen, setWhyOpen] = useState(defaultWhyOpen);
  const { height: windowHeight } = useWindowDimensions();
  const badge = useRef(new Animated.Value(0)).current;
  const whyAnim = useRef(new Animated.Value(0)).current;
  // The icon + title row and the button always show; the part between them scrolls when it is long.
  const [headHeight, setHeadHeight] = useState(40);
  const [buttonHeight, setButtonHeight] = useState(58);
  const [bodyContent, setBodyContent] = useState(0);
  const { ref: bodyRef, scrollProps: bodyScrollProps, more: bodyMore, scrollDown: bodyScrollDown } = useScrollMore(BODY_SLACK);
  const revealWhy = useRef(false);

  useEffect(() => {
    if (!visible) {
      setWhyOpen(false);
      return undefined;
    }
    if (playSound) {
      feedback(correct ? "correct" : "wrong", correct ? "success" : "error");
    }
    badge.setValue(0);
    const animation = Animated.spring(badge, { toValue: 1, delay: 120, friction: 4, tension: 140, useNativeDriver: true });
    animation.start();
    return () => animation.stop();
    // Only replay when the sheet opens or flips result.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, correct]);

  useEffect(() => {
    whyAnim.setValue(0);
    if (!whyOpen) {
      return undefined;
    }
    const animation = Animated.spring(whyAnim, { toValue: 1, friction: 7, tension: 120, useNativeDriver: true });
    animation.start();
    return () => animation.stop();
  }, [whyAnim, whyOpen]);

  const ink = correct ? CORRECT_TEXT : WRONG_TEXT;
  const heading = title ?? (correct ? pickPraise(praiseSeed) : WRONG_TITLE);
  const label = buttonLabel ?? (correct ? "Continue" : "Got it");
  const whyText = why?.trim();
  const inset = bottomInset ?? SHEET_INSET;
  const listShown = !correct && Boolean(correctList && correctList.length > 0);
  const share = listShown ? LIST_MAX_SHARE : SHEET_MAX_SHARE;
  const shareMax = Math.round(windowHeight * share);
  const tight = maxHeight !== undefined && maxHeight < shareMax;
  const sheetMax = tight ? maxHeight : shareMax;
  const minBody = tight ? MIN_BODY_TIGHT : MIN_BODY;
  const readable = Math.min(bodyContent || READABLE_BODY, READABLE_BODY);
  // Under the green tile on a short phone, a sheet that would leave too little to read goes slim; when even a slim
  // one would, the caller is told (ExerciseView folds the grey tiles away to make room).
  const slim = tight && sheetMax - (headHeight + BUTTON_LG + SHEET_PAD + inset + space.lg) < readable;
  const cramped = tight && sheetMax - (headHeight + BUTTON_MD + SHEET_PAD_SLIM + inset + space.sm) < readable;
  const baseGap = slim ? space.sm : space.lg;
  const fixedParts = headHeight + buttonHeight + (slim ? SHEET_PAD_SLIM : SHEET_PAD) + inset;
  // The gap above the button grows to hold the "more" arrow; the body gives up that room, so the sheet keeps its height.
  // It keeps that room for as long as the body is too long to show whole, wherever it is scrolled, so the body does
  // not change size (and lose its place) each time the arrow comes and goes.
  const overflows = bodyContent > Math.max(minBody, sheetMax - fixedParts - baseGap) + BODY_SLACK;
  const buttonGap = overflows || bodyMore ? SCROLL_HINT_ROOM : baseGap;
  const bodyMax = Math.max(minBody, sheetMax - fixedParts - buttonGap);
  const answerShown = !correct && !correctList && Boolean(correctLabel);
  const whyShown = !correct && Boolean(whyText);
  // The "more" arrow takes its room from the body once it shows, so a Why line being revealed is scrolled to the
  // end again at the body's new size; the reveal is done once the end is in view.
  useEffect(() => {
    if (revealWhy.current) {
      bodyRef.current?.scrollToEnd?.({ animated: true });
    }
  }, [bodyMax, bodyRef]);
  useEffect(() => {
    if (!bodyMore) {
      revealWhy.current = false;
    }
  }, [bodyMore]);
  useEffect(() => {
    if (!visible) {
      revealWhy.current = false;
    }
  }, [visible]);
  useEffect(() => {
    if (visible) {
      onCramped?.(cramped);
    }
    // Only when the answer changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cramped, visible]);

  const badgeScale = badge.interpolate({ inputRange: [0, 1], outputRange: [0.2, 1] });
  const badgeRotate = badge.interpolate({ inputRange: [0, 1], outputRange: ["-40deg", "0deg"] });

  return (
    <Sheet
      visible={visible}
      tone={correct ? "correct" : "wrong"}
      backdrop={false}
      dismissOnBackdrop={false}
      bottomInset={bottomInset}
      style={slim ? { paddingTop: SLIM_PAD_TOP, paddingBottom: SLIM_PAD_BOTTOM + inset } : undefined}
      testID={testID}
    >
      <View onLayout={(event) => onHeight?.(Math.round(event.nativeEvent.layout.height + (slim ? SHEET_PAD_SLIM : SHEET_PAD) + inset))}>
        <View style={styles.headRow} onLayout={(event) => setHeadHeight(Math.round(event.nativeEvent.layout.height))}>
          <Animated.View
            style={[
              styles.badge,
              { backgroundColor: correct ? colors.green : colors.heart, transform: [{ scale: badgeScale }, { rotate: badgeRotate }] }
            ]}
          >
            <Icon name={correct ? "check" : "close"} size={26} color={colors.white} />
          </Animated.View>
          <Text style={[correct ? styles.praise : styles.wrongTitle, { color: ink }]} accessibilityRole="header">
            {withHonorifics(heading)}
          </Text>
        </View>

        {listShown || answerShown || whyShown ? (
          <View style={styles.bodyBox}>
            <ScrollView
              ref={bodyRef}
              style={{ maxHeight: bodyMax }}
              bounces={false}
              nestedScrollEnabled
              testID="feedback-body"
              {...bodyScrollProps}
              onContentSizeChange={(width, height) => {
                bodyScrollProps.onContentSizeChange(width, height);
                setBodyContent(Math.round(height));
                // Opening Why scrolls it into view when the answer above already fills the sheet.
                if (revealWhy.current) {
                  if (height <= bodyMax) {
                    revealWhy.current = false;
                  } else {
                    bodyRef.current?.scrollToEnd?.({ animated: true });
                  }
                }
              }}
            >
              {listShown && correctList ? (
                <View style={styles.list} testID="feedback-list">
                  {correctList.map((item, index) => (
                    <View key={`${index}-${item}`} style={[styles.listItem, index > 0 ? styles.listItemNext : null]}>
                      <View style={[styles.listNumber, { backgroundColor: ink }]}>
                        <Text style={styles.listNumberText}>{index + 1}</Text>
                      </View>
                      <Text style={[styles.listText, { color: ink }]}>{withHonorifics(noBreakHyphens(item))}</Text>
                    </View>
                  ))}
                </View>
              ) : null}

              {answerShown && correctLabel ? (
                isArabicOnly(correctLabel) ? (
                  <ArabicText
                    size={isQuranText(correctLabel) ? 21 : 26}
                    weight="bold"
                    quran={isQuranText(correctLabel)}
                    color={ink}
                    align="right"
                    style={styles.arabicAnswer}
                    testID="feedback-answer"
                  >
                    {correctLabel}
                  </ArabicText>
                ) : (
                  <Text
                    style={[
                      styles.answer,
                      correctLabel.length > 80 ? styles.answerLong : null,
                      hasArabic(correctLabel) ? styles.answerArabicMix : null,
                      { color: ink }
                    ]}
                    testID="feedback-answer"
                  >
                    {withHonorifics(noBreakHyphens(correctLabel))}
                  </Text>
                )
              ) : null}

              {whyShown && whyText ? (
                <View style={styles.whyBlock}>
                  <Tappable
                    onPress={() => {
                      // Opening Why (not a sheet that starts open) scrolls the line into view.
                      revealWhy.current = !whyOpen;
                      setWhyOpen((open) => !open);
                    }}
                    style={styles.whyButton}
                    accessibilityLabel={whyOpen ? "Hide why" : "Why?"}
                    accessibilityState={{ expanded: whyOpen }}
                    hitSlop={6}
                    testID="feedback-why"
                  >
                    <Text style={[styles.whyLabel, { color: ink }]}>Why?</Text>
                    <Icon name={whyOpen ? "chevronDown" : "chevronRight"} size={16} color={ink} />
                  </Tappable>
                  {whyOpen ? (
                    <Animated.Text
                      style={[
                        styles.whyText,
                        {
                          opacity: whyAnim,
                          transform: [{ translateY: whyAnim.interpolate({ inputRange: [0, 1], outputRange: [-6, 0] }) }]
                        }
                      ]}
                      testID="feedback-why-text"
                    >
                      {withHonorifics(noBreakHyphens(whyText))}
                    </Animated.Text>
                  ) : null}
                </View>
              ) : null}
            </ScrollView>
          </View>
        ) : null}

        {/* "More below" sits in the gap above the button, under the scrolling part, never over its text. */}
        <ScrollHintGap visible={bodyMore} onPress={bodyScrollDown} gap={buttonGap} testID="feedback-more" />
        <View onLayout={(event) => setButtonHeight(Math.round(event.nativeEvent.layout.height))}>
          <GameButton
            label={label}
            variant={correct ? "primary" : "danger"}
            size={slim ? "md" : "lg"}
            sound={buttonSound}
            fullWidth
            onPress={onContinue}
            testID="feedback-continue"
          />
        </View>
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  headRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: space.md
  },
  praise: {
    flex: 1,
    flexShrink: 1,
    fontFamily: fonts.displayHeavy,
    fontSize: 28,
    lineHeight: 34
  },
  wrongTitle: {
    flex: 1,
    flexShrink: 1,
    fontFamily: fonts.displayHeavy,
    fontSize: 22,
    lineHeight: 28
  },
  answer: {
    flexShrink: 1,
    fontFamily: fonts.bodyHeavy,
    fontSize: 18,
    lineHeight: 24,
    marginTop: space.sm
  },
  answerLong: {
    fontSize: 16,
    lineHeight: 21
  },
  answerArabicMix: {
    lineHeight: 28
  },
  arabicAnswer: {
    alignSelf: "stretch",
    marginTop: space.xs
  },
  bodyBox: {
    position: "relative"
  },
  list: {
    marginTop: space.sm
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  listItemNext: {
    marginTop: 4
  },
  listNumber: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: space.sm
  },
  listNumberText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 12,
    lineHeight: 16,
    color: colors.white,
    includeFontPadding: false
  },
  listText: {
    flexShrink: 1,
    fontFamily: fonts.bodyHeavy,
    fontSize: 15,
    lineHeight: 20
  },
  whyBlock: {
    marginTop: space.sm
  },
  whyButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    height: 36,
    paddingHorizontal: space.md,
    borderRadius: radii.pill,
    backgroundColor: withAlpha(colors.white, 0.6)
  },
  whyLabel: {
    marginRight: 4,
    fontFamily: fonts.bodyHeavy,
    fontSize: 16,
    lineHeight: 22
  },
  whyText: {
    flexShrink: 1,
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 21,
    color: colors.ink,
    marginTop: space.sm
  }
});
