import React, { useEffect, useRef, useState } from "react";
import { Animated, Platform, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { ArabicText, hasArabic, isArabicOnly } from "../ArabicText";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { Sheet } from "../Sheet";
import { Tappable } from "../Tappable";
import { feedback } from "../sound";
import { colors, darken, fonts, radii, space, withAlpha } from "../theme";
import { noBreakHyphens } from "./lessonText";

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

export const OOPS_WORDS = ["Not quite!", "Almost!", "Oops!"] as const;

/** Stable "wrong" heading for a seed. */
export function pickOops(seed?: string) {
  return OOPS_WORDS[hashString(`oops:${seed ?? ""}`) % OOPS_WORDS.length];
}

/** Text on the pink / mint sheets, a step darker than the tokens so it passes 4.5:1. */
export const WRONG_TEXT = darken(colors.wrongInk, 0.15);
export const CORRECT_TEXT = darken(colors.correctInk, 0.12);

const SHEET_PAD = 20 + 16;
const SHEET_INSET = Platform.OS === "ios" ? 30 : 16;

export type FeedbackSheetProps = {
  visible: boolean;
  correct: boolean;
  correctLabel?: string;
  why?: string;
  onContinue: () => void;
  /** Picks the praise word so it stays the same across renders. */
  praiseSeed?: string;
  /** Overrides the praise word / "Not quite!" heading. */
  title?: string;
  /** Overrides CONTINUE / GOT IT. */
  buttonLabel?: string;
  /** Shown as a short numbered list instead of correctLabel. */
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
  const heading = title ?? (correct ? pickPraise(praiseSeed) : pickOops(praiseSeed));
  const label = buttonLabel ?? (correct ? "Continue" : "Got it");
  const whyText = why?.trim();
  const badgeScale = badge.interpolate({ inputRange: [0, 1], outputRange: [0.2, 1] });
  const badgeRotate = badge.interpolate({ inputRange: [0, 1], outputRange: ["-40deg", "0deg"] });

  return (
    <Sheet visible={visible} tone={correct ? "correct" : "wrong"} backdrop={false} dismissOnBackdrop={false} bottomInset={bottomInset} testID={testID}>
      <View onLayout={(event) => onHeight?.(Math.round(event.nativeEvent.layout.height + SHEET_PAD + (bottomInset ?? SHEET_INSET)))}>
      <View style={styles.headRow}>
        <Animated.View
          style={[
            styles.badge,
            { backgroundColor: correct ? colors.green : colors.heart, transform: [{ scale: badgeScale }, { rotate: badgeRotate }] }
          ]}
        >
          <Icon name={correct ? "check" : "close"} size={26} color={colors.white} />
        </Animated.View>
        <Text style={[correct ? styles.praise : styles.wrongTitle, { color: ink }]} accessibilityRole="header">
          {heading}
        </Text>
      </View>

      {!correct && correctList && correctList.length > 0 ? (
        <View style={styles.list}>
          {correctList.map((item, index) => (
            <View key={`${index}-${item}`} style={styles.listItem}>
              <View style={[styles.listNumber, { backgroundColor: ink }]}>
                <Text style={styles.listNumberText}>{index + 1}</Text>
              </View>
              <Text style={[styles.listText, { color: ink }]}>{item}</Text>
            </View>
          ))}
        </View>
      ) : null}

      {!correct && !correctList && correctLabel ? (
        isArabicOnly(correctLabel) ? (
          <View style={styles.answerRow}>
            <Text style={[styles.answerLead, { color: ink }]}>Answer:</Text>
            <ArabicText size={26} weight="bold" color={ink} align="left" style={styles.arabicAnswer}>
              {correctLabel}
            </ArabicText>
          </View>
        ) : (
          <Text style={[styles.answer, hasArabic(correctLabel) ? styles.answerArabicMix : null, { color: ink }]} testID="feedback-answer">
            <Text style={styles.answerLead}>Answer: </Text>
            {noBreakHyphens(correctLabel)}
          </Text>
        )
      ) : null}

      {!correct && whyText ? (
        <View style={styles.whyBlock}>
          <Tappable
            onPress={() => setWhyOpen((open) => !open)}
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
            <ScrollView style={{ maxHeight: Math.round(windowHeight * 0.3) }} bounces={false} nestedScrollEnabled>
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
                {noBreakHyphens(whyText)}
              </Animated.Text>
            </ScrollView>
          ) : null}
        </View>
      ) : null}

      <View style={styles.buttonGap} />
      <GameButton
        label={label}
        variant={correct ? "primary" : "danger"}
        fullWidth
        onPress={onContinue}
        testID="feedback-continue"
      />
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
  answerRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: space.sm
  },
  answerLead: {
    fontFamily: fonts.bodyBold,
    marginRight: space.sm
  },
  answer: {
    flexShrink: 1,
    fontFamily: fonts.bodyHeavy,
    fontSize: 17,
    lineHeight: 23,
    marginTop: space.sm
  },
  answerArabicMix: {
    lineHeight: 28
  },
  arabicAnswer: {
    alignSelf: "flex-start"
  },
  list: {
    marginTop: space.sm,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "100%",
    marginRight: space.md,
    marginBottom: 6
  },
  listNumber: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5
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
