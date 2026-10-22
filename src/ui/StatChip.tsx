import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { Icon, type IconName } from "./Icon";
import { Tappable } from "./Tappable";
import { fonts } from "./theme";

export type StatChipProps = {
  icon: IconName;
  value: string | number;
  color: string;
  onPress?: () => void;
  accessibilityLabel: string;
  dim?: boolean;
  testID?: string;
};

/** Top-bar stat: icon + bold number. Bounces when the value changes. */
export function StatChip({ icon, value, color, onPress, accessibilityLabel, dim, testID }: StatChipProps) {
  const bounce = useRef(new Animated.Value(1)).current;
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    bounce.setValue(1.3);
    Animated.spring(bounce, { toValue: 1, friction: 3, tension: 180, useNativeDriver: true }).start();
  }, [bounce, value]);

  return (
    <Tappable onPress={onPress} accessibilityLabel={accessibilityLabel} testID={testID} style={styles.chip} hitSlop={6} pressScale={0.92}>
      <Animated.View style={[styles.row, { transform: [{ scale: bounce }] }, dim ? styles.dim : null]}>
        <Icon name={icon} size={26} color={dim ? "#C7D0CB" : undefined} />
        <Text style={[styles.value, { color: dim ? "#AFBAB4" : color }]} numberOfLines={1}>
          {value}
        </Text>
      </Animated.View>
    </Tappable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 12
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  dim: {
    opacity: 0.9
  },
  value: {
    marginStart: 5,
    fontFamily: fonts.displayHeavy,
    fontSize: 18,
    lineHeight: 24,
    includeFontPadding: false
  }
});
