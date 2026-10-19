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
import { ScrollHint, useScrollMore } from "./ScrollHint";

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
const SHEET_INSET = Platform.OS === "ios" ? 30 : 16;
/** The sheet never grows past this share of the window; a long answer scrolls inside it instead. */
export const SHEET_MAX_SHARE = 0.6;
const MIN_BODY = 64;

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
  onHeight,
  testID = "feedback-sheet"
}: FeedbackSheetProps) {
  const [whyOpen, setWhyOpen] = useState(defaultWhyOpen);
  const { height: windowHeight } = useWindowDimensions();
  const badge = useRef(new Animated.Value(0)).current;
  const whyAnim = useRef(new Animated.Value(0)).current;
  // The icon + title row and the button always show; the part between them scrolls when it is long.
  const [headHeight, setHeadHeight] = useState(40);
  const [footHeight, setFootHeight] = useState(space.lg + 58);
  const { ref: bodyRef, scrollProps: bodyScrollProps, more: bodyMore, scrollDown: bodyScrollDown } = useScrollMore();
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
  const bodyMax = Math.max(MIN_BODY, Math.round(windowHeight * SHEET_MAX_SHARE) - headHeight - footHeight - SHEET_PAD - inset);
  const listShown = !correct && Boolean(correctList && correctList.length > 0);
  const answerShown = !correct && !correctList && Boolean(correctLabel);
  const whyShown = !correct && Boolean(whyText);
  const badgeScale = badge.interpolate({ inputRange: [0, 1], outputRange: [0.2, 1] });
  const badgeRotate = badge.interpolate({ inputRange: [0, 1], outputRange: ["-40deg", "0deg"] });

  return (
    <Sheet visible={visible} tone={correct ? "correct" : "wrong"} backdrop={false} dismissOnBackdrop={false} bottomInset={bottomInset} testID={testID}>
      <View onLayout={(event) => onHeight?.(Math.round(event.nativeEvent.layout.height + SHEET_PAD + inset))}>
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
                // Opening Why scrolls it into view when the answer above already fills the sheet.
                if (revealWhy.current) {
                  revealWhy.current = false;
                  bodyRef.current?.scrollToEnd?.({ animated: true });
                }
              }}
            >
              {listShown && correctList ? (
                <View style={styles.list} testID="feedback-list">
                  {correctList.map((item, index) => (
                    <View key={`${index}-${item}`} style={styles.listItem}>
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

        <View onLayout={(event) => setFootHeight(Math.round(event.nativeEvent.layout.height))}>
          <View style={styles.buttonGap} />
          <GameButton
            label={label}
            variant={correct ? "primary" : "danger"}
            sound={buttonSound}
            fullWidth
            onPress={onContinue}
            testID="feedback-continue"
          />
          {/* "More below" sits on the top edge of the gap above the button, drawn over the scrolling part. */}
          <View pointerEvents="box-none" style={styles.hintEdge}>
            <ScrollHint visible={bodyMore} onPress={bodyScrollDown} testID="feedback-more" />
          </View>
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
  hintEdge: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 0
  },
  list: {
    marginTop: space.sm
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4
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
  },
  buttonGap: {
    height: space.lg
  }
});
