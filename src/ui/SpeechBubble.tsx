import React from "react";
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { colors, fonts, radii } from "./theme";

export type SpeechBubbleProps = {
  children?: React.ReactNode;
  tail?: "left" | "down";
  style?: StyleProp<ViewStyle>;
};

/** White bubble with a small tail. String children are styled as bubble text. */
export function SpeechBubble({ children, tail = "left", style }: SpeechBubbleProps) {
  const content =
    typeof children === "string" || typeof children === "number" ? <Text style={styles.text}>{children}</Text> : children;
  return (
    <View style={[styles.bubble, tail === "left" ? styles.withLeftTail : styles.withDownTail, style]}>
      <View style={[styles.tail, tail === "left" ? styles.tailLeft : styles.tailDown]} />
      <View style={styles.content}>{content}</View>
    </View>
  );
}

const TAIL = 14;

const styles = StyleSheet.create({
  bubble: {
    position: "relative",
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderWidth: 2,
    borderRadius: radii.md,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexShrink: 1,
    maxWidth: "100%"
  },
  withLeftTail: {
    marginLeft: TAIL / 2
  },
  withDownTail: {
    marginBottom: TAIL / 2
  },
  content: {
    flexShrink: 1
  },
  text: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 17,
    lineHeight: 23,
    color: colors.ink,
    flexShrink: 1
  },
  tail: {
    position: "absolute",
    width: TAIL,
    height: TAIL,
    backgroundColor: colors.white,
    borderColor: colors.line,
    transform: [{ rotate: "45deg" }]
  },
  tailLeft: {
    left: -TAIL / 2 - 1,
    top: "50%",
    marginTop: -TAIL / 2,
    borderLeftWidth: 2,
    borderBottomWidth: 2
  },
  tailDown: {
    bottom: -TAIL / 2 - 1,
    left: 28,
    borderRightWidth: 2,
    borderBottomWidth: 2
  }
});
