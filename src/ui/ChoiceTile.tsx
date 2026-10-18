import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { ArabicText, isArabicOnly } from "./ArabicText";
import { Icon, type IconName } from "./Icon";
import { useShake } from "./PopIn";
import { haptic, playUi } from "./sound";
import { colors, fonts, lighten, radii } from "./theme";

export type ChoiceTileState = "idle" | "selected" | "correct" | "wrong" | "disabled" | "dimmed";

export type ChoiceTileProps = {
  label: string;
  onPress?: () => void;
  state?: ChoiceTileState;
  badge?: string;
  icon?: IconName;
  layout?: "row" | "square";
  testID?: string;
  accessibilityLabel?: string;
};

const LIP = 4;

type Look = { bg: string; border: string; lip: string; text: string; badgeBorder: string; badgeText: string };

const LOOKS: Record<ChoiceTileState, Look> = {
  idle: { bg: colors.white, border: colors.line, lip: colors.lineLip, text: colors.ink, badgeBorder: colors.line, badgeText: colors.inkSoft },
  selected: {
    bg: lighten(colors.gem, 0.86),
    border: lighten(colors.gem, 0.25),
    lip: colors.gem,
    text: colors.gemLip,
    badgeBorder: lighten(colors.gem, 0.25),
    badgeText: colors.gemLip
  },
  correct: { bg: colors.correctBg, border: lighten(colors.green, 0.2), lip: colors.green, text: colors.correctInk, badgeBorder: colors.green, badgeText: colors.correctInk },
  wrong: { bg: colors.wrongBg, border: lighten(colors.heart, 0.2), lip: colors.heart, text: colors.wrongInk, badgeBorder: colors.heart, badgeText: colors.wrongInk },
  disabled: { bg: colors.white, border: colors.line, lip: colors.line, text: "#A9B4AE", badgeBorder: colors.line, badgeText: "#A9B4AE" },
  dimmed: { bg: colors.white, border: colors.line, lip: colors.lineLip, text: colors.ink, badgeBorder: colors.line, badgeText: colors.inkSoft }
};

/** Big answer tile. Pops when selected, shakes when wrong. Text always wraps. */
export function ChoiceTile({ label, onPress, state = "idle", badge, icon, layout = "row", testID, accessibilityLabel }: ChoiceTileProps) {
  const look = LOOKS[state];
  const interactive = state !== "disabled" && state !== "dimmed";
  const press = useRef(new Animated.Value(0)).current;
  const pop = useRef(new Animated.Value(1)).current;
  const { style: shakeStyle, shake } = useShake(7);
  const previous = useRef(state);

  useEffect(() => {
    const before = previous.current;
    previous.current = state;
    if (before === state) {
      return;
    }
    if (state === "selected" || state === "correct") {
      pop.setValue(0.94);
      Animated.spring(pop, { toValue: 1, friction: 4, tension: 220, useNativeDriver: true }).start();
    }
    if (state === "wrong") {
      shake();
    }
  }, [pop, shake, state]);

  const translateY = press.interpolate({ inputRange: [0, 1], outputRange: [0, LIP - 1] });
  const arabic = isArabicOnly(label);
  const square = layout === "square";

  const content = (
    <>
      {badge && !square ? (
        <View style={[styles.badge, { borderColor: look.badgeBorder }]}>
          <Text style={[styles.badgeText, { color: look.badgeText }]}>{badge}</Text>
        </View>
      ) : null}
      {icon ? (
        <View style={square ? styles.squareIcon : styles.rowIcon}>
          <Icon name={icon} size={square ? 48 : 28} color={state === "disabled" ? "#C7D0CB" : undefined} />
        </View>
      ) : null}
      {arabic ? (
        <ArabicText size={24} weight="bold" color={look.text} align={square ? "center" : "right"} style={square ? styles.squareLabel : styles.rowLabel}>
          {label}
        </ArabicText>
      ) : (
        <Text style={[styles.label, square ? styles.squareLabel : styles.rowLabel, { color: look.text, textAlign: square ? "center" : "left" }]}>
          {label}
        </Text>
      )}
    </>
  );

  return (
    <Animated.View style={[square ? styles.squareRoot : styles.rowRoot, shakeStyle, state === "dimmed" ? styles.dimmed : null]}>
      <Animated.View style={{ transform: [{ scale: pop }] }}>
        <Pressable
          onPress={() => {
            if (!interactive) {
              return;
            }
            playUi("soft_ui");
            haptic("light");
            onPress?.();
          }}
          onPressIn={() => interactive && Animated.timing(press, { toValue: 1, duration: 60, useNativeDriver: true }).start()}
          onPressOut={() => Animated.spring(press, { toValue: 0, friction: 5, tension: 260, useNativeDriver: true }).start()}
          disabled={!interactive}
          testID={testID}
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel ?? label}
          accessibilityState={{ selected: state === "selected", disabled: !interactive }}
          style={[styles.pressable, { paddingBottom: LIP }]}
        >
          <View pointerEvents="none" style={[styles.lip, { backgroundColor: look.lip }]} />
          <Animated.View
            style={[
              styles.face,
              square ? styles.squareFace : styles.rowFace,
              { backgroundColor: look.bg, borderColor: look.border, transform: [{ translateY }] }
            ]}
          >
            {content}
          </Animated.View>
          {badge && square ? (
            <View style={[styles.badge, styles.squareBadge, { borderColor: look.badgeBorder }]} pointerEvents="none">
              <Text style={[styles.badgeText, { color: look.badgeText }]}>{badge}</Text>
            </View>
          ) : null}
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  rowRoot: {
    alignSelf: "stretch",
    width: "100%"
  },
  squareRoot: {
    flex: 1,
    minWidth: 0
  },
  dimmed: {
    opacity: 0.45
  },
  pressable: {
    position: "relative"
  },
  lip: {
    position: "absolute",
    left: 0,
    right: 0,
    top: LIP,
    bottom: 0,
    borderRadius: radii.tile
  },
  face: {
    borderWidth: 2,
    borderRadius: radii.tile
  },
  rowFace: {
    minHeight: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  squareFace: {
    minHeight: 132,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 16
  },
  rowIcon: {
    marginRight: 12
  },
  squareIcon: {
    marginBottom: 8
  },
  label: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 17,
    lineHeight: 23
  },
  rowLabel: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0
  },
  squareLabel: {
    flexShrink: 1,
    maxWidth: "100%"
  },
  badge: {
    minWidth: 30,
    height: 30,
    borderRadius: 9,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    paddingHorizontal: 4
  },
  squareBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    marginRight: 0
  },
  badgeText: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 14
  }
});
