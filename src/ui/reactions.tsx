import React, { useCallback, useEffect, useRef, type ReactNode } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

/**
 * Bits shared by the tap reactions on the path's characters and pictures: a one-shot clock that runs
 * 0..1 on the native driver, and little things (hearts, "HA", tears, zzz, sparkles) that float off.
 */

/** A 0..1 clock for one reaction. `play` restarts it; the callback runs when it finishes. */
export function useOneShot() {
  const value = useRef(new Animated.Value(0)).current;
  const running = useRef<Animated.CompositeAnimation | null>(null);
  const play = useCallback(
    (duration: number, done?: () => void) => {
      running.current?.stop();
      value.setValue(0);
      const animation = Animated.timing(value, { toValue: 1, duration, easing: Easing.linear, useNativeDriver: true });
      running.current = animation;
      animation.start(({ finished }) => {
        if (finished) {
          running.current = null;
          done?.();
        }
      });
    },
    [value]
  );
  useEffect(() => () => running.current?.stop(), []);
  return { value, play };
}

/** Taps step through `count` reactions in turn. Returns the next index each call. */
export function useCycle(count: number) {
  const index = useRef(-1);
  return useCallback(() => {
    index.current = (index.current + 1) % count;
    return index.current;
  }, [count]);
}

export type FloaterProps = {
  /** The reaction clock (0..1). */
  t: Animated.Value;
  /** When in the clock this one shows (0..1). */
  from?: number;
  to?: number;
  /** Start point, px from the box's top-left. */
  x: number;
  y: number;
  /** How far it moves up (negative falls down) and sideways over its life. */
  rise?: number;
  drift?: number;
  /** Pops in from small. */
  pop?: boolean;
  children: ReactNode;
};

/** Something that appears, floats off and fades, on the native driver. */
export function Floater({ t, from: start = 0, to: end = 1, x, y, rise = 28, drift = 0, pop = true, children }: FloaterProps) {
  // Kept inside the clock so a late one still fades out by its end.
  const to = Math.min(1, end);
  const from = Math.min(Math.max(0, start), to - 0.01);
  const span = to - from;
  const opacity = t.interpolate({
    inputRange: [0, from, from + span * 0.12, to - span * 0.25, to, 1],
    outputRange: [0, 0, 1, 1, 0, 0],
    extrapolate: "clamp"
  });
  const progress = t.interpolate({ inputRange: [0, from, to, 1], outputRange: [0, 0, 1, 1], extrapolate: "clamp" });
  const translateY = progress.interpolate({ inputRange: [0, 1], outputRange: [0, -rise] });
  const translateX = progress.interpolate({ inputRange: [0, 1], outputRange: [0, drift] });
  const scale = pop ? progress.interpolate({ inputRange: [0, 0.18, 0.3, 1], outputRange: [0.3, 1.15, 1, 1] }) : 1;
  return (
    <Animated.View pointerEvents="none" style={[styles.abs, { left: x, top: y, opacity, transform: [{ translateX }, { translateY }, { scale }] }]}>
      {children}
    </Animated.View>
  );
}

export function Heart({ size = 14, color = "#FF5C8A" }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Path d="M10 18C10 18 1 12 1 6.5C1 3.5 3.4 1.5 6 1.5C7.8 1.5 9.2 2.6 10 4C10.8 2.6 12.2 1.5 14 1.5C16.6 1.5 19 3.5 19 6.5C19 12 10 18 10 18Z" fill={color} />
    </Svg>
  );
}

export function Sparkle({ size = 14, color = "#FFC21A" }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Path d="M10 0L12.4 7.6L20 10L12.4 12.4L10 20L7.6 12.4L0 10L7.6 7.6Z" fill={color} />
    </Svg>
  );
}

export function Drop({ size = 8, color = "#5BBDFF" }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size * 1.4} viewBox="0 0 10 14">
      <Path d="M5 0C7 5 10 7.5 10 9.5A5 5 0 0 1 0 9.5C0 7.5 3 5 5 0Z" fill={color} />
    </Svg>
  );
}

export function Puff({ size = 12, color = "#FFFFFF" }: { size?: number; color?: string }) {
  return <View style={{ width: size, height: size * 0.8, borderRadius: size / 2, backgroundColor: color, borderWidth: 1, borderColor: "rgba(31,45,39,0.12)" }} />;
}

/** A bold word that pops out, like "HA" or "Z". */
export function Word({ children, size = 14, color = "#1F2D27" }: { children: string; size?: number; color?: string }) {
  return (
    <Text style={[styles.word, { fontSize: size, color }]} allowFontScaling={false}>
      {children}
    </Text>
  );
}

/** A fast back-and-forth wiggle over part of the clock, for shaking with laughter or anger. */
export function shake(t: Animated.Value, from: number, to: number, amount: number, cycles: number, unit: "deg" | "" = "deg") {
  const value = (n: number) => (unit ? `${n}${unit}` : n);
  const input: number[] = [0];
  const output: (number | string)[] = [value(0)];
  const steps = cycles * 4;
  for (let index = 0; index <= steps; index += 1) {
    const at = from + ((to - from) * index) / steps;
    if (at <= input[input.length - 1]) continue;
    input.push(at);
    // Fades out over the last quarter so it settles instead of stopping dead.
    const fade = Math.min(1, (steps - index) / (steps * 0.25));
    output.push(value(Number((Math.sin((index / 4) * 2 * Math.PI) * amount * fade).toFixed(3))));
  }
  if (input[input.length - 1] < 1) {
    input.push(1);
    output.push(value(0));
  }
  return t.interpolate({ inputRange: input, outputRange: output as string[], extrapolate: "clamp" });
}

const styles = StyleSheet.create({
  abs: {
    position: "absolute"
  },
  word: {
    fontWeight: "900",
    textShadowColor: "#FFFFFF",
    textShadowRadius: 3,
    textShadowOffset: { width: 0, height: 0 }
  }
});
