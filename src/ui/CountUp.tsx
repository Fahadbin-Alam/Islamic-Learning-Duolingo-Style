import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Text, type StyleProp, type TextStyle } from "react-native";

export type CountUpProps = {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  style?: StyleProp<TextStyle>;
  onTick?: () => void;
};

/** Counts from 0 to `value` (integers), written as everywhere else: "1,234". */
export function CountUp({ value, duration = 900, prefix = "", suffix = "", style, onTick }: CountUpProps) {
  const target = Math.round(Number.isFinite(value) ? value : 0);
  const progress = useRef(new Animated.Value(0)).current;
  const [shown, setShown] = useState(0);
  const lastShown = useRef(0);
  const tick = useRef(onTick);
  tick.current = onTick;

  useEffect(() => {
    progress.setValue(0);
    lastShown.current = 0;
    setShown(0);
    const id = progress.addListener(({ value: p }) => {
      const next = Math.round(p * target);
      if (next !== lastShown.current) {
        lastShown.current = next;
        setShown(next);
        tick.current?.();
      }
    });
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false
    });
    animation.start(({ finished }) => {
      if (finished) {
        setShown(target);
      }
    });
    return () => {
      animation.stop();
      progress.removeListener(id);
    };
  }, [duration, progress, target]);

  return (
    <Text style={style}>
      {prefix}
      {shown.toLocaleString("en-US")}
      {suffix}
    </Text>
  );
}
