import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Text, type StyleProp, type TextStyle } from "react-native";

/** "12,480" */
export function formatNumber(value: number) {
  return Math.round(value).toLocaleString("en-US");
}

/** "12,480" below 100k, then "120k", "1.2M". Keeps stat numbers on one line at 320 px. */
export function compactNumber(value: number) {
  const rounded = Math.round(value);
  if (rounded >= 1_000_000) return `${Math.floor(rounded / 100_000) / 10}M`;
  if (rounded >= 100_000) return `${Math.floor(rounded / 1000)}k`;
  return formatNumber(rounded);
}

/**
 * Like the kit CountUp, but the number is formatted (thousands separators, compact above 100k).
 * Counts up from 0 on mount, then from the number on screen to the new one (gems spent count down).
 */
export function FormattedCount({
  value,
  duration = 900,
  compact = false,
  style,
  testID
}: {
  value: number;
  duration?: number;
  compact?: boolean;
  style?: StyleProp<TextStyle>;
  testID?: string;
}) {
  const target = Math.round(Number.isFinite(value) ? value : 0);
  const progress = useRef(new Animated.Value(0)).current;
  const [shown, setShown] = useState(0);
  const last = useRef(0);

  useEffect(() => {
    const from = last.current;
    progress.setValue(0);
    const id = progress.addListener(({ value: p }) => {
      const next = Math.round(from + p * (target - from));
      if (next !== last.current) {
        last.current = next;
        setShown(next);
      }
    });
    const animation = Animated.timing(progress, { toValue: 1, duration, easing: Easing.out(Easing.cubic), useNativeDriver: false });
    animation.start(({ finished }) => {
      if (finished) {
        last.current = target;
        setShown(target);
      }
    });
    return () => {
      animation.stop();
      progress.removeListener(id);
    };
  }, [duration, progress, target]);

  return (
    <Text style={style} numberOfLines={1} testID={testID} accessibilityLabel={formatNumber(target)}>
      {compact ? compactNumber(shown) : formatNumber(shown)}
    </Text>
  );
}
