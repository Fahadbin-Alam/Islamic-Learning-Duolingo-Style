import React, { useCallback, useEffect, useRef } from "react";
import { Animated, Easing, type StyleProp, type ViewStyle } from "react-native";

export type PopInProps = {
  children?: React.ReactNode;
  delay?: number;
  from?: "scale" | "up" | "down";
  /** How far it slides in from ("up" and "down"): 24 unless given. */
  distance?: number;
  style?: StyleProp<ViewStyle>;
};

/** How far PopIn slides its children in from, unless told. */
export const POP_IN_DISTANCE = 24;

/** Animates its children in on mount. */
export function PopIn({ children, delay = 0, from = "scale", distance = POP_IN_DISTANCE, style }: PopInProps) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.spring(progress, {
      toValue: 1,
      delay,
      friction: 6,
      tension: 120,
      useNativeDriver: true
    });
    animation.start();
    return () => animation.stop();
  }, [delay, progress]);

  const opacity = progress.interpolate({ inputRange: [0, 0.4, 1], outputRange: [0, 1, 1], extrapolate: "clamp" });
  const transform =
    from === "scale"
      ? [{ scale: progress.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] }) }]
      : [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [from === "up" ? distance : -distance, 0] }) }];

  return <Animated.View style={[style, { opacity, transform }]}>{children}</Animated.View>;
}

/** Horizontal shake. Spread `style` onto an Animated.View and call `shake()`. */
export function useShake(distance = 8) {
  const offset = useRef(new Animated.Value(0)).current;

  const shake = useCallback(() => {
    offset.setValue(0);
    const step = (toValue: number) =>
      Animated.timing(offset, { toValue, duration: 55, easing: Easing.inOut(Easing.quad), useNativeDriver: true });
    Animated.sequence([
      step(distance),
      step(-distance),
      step(distance * 0.7),
      step(-distance * 0.7),
      step(distance * 0.3),
      step(0)
    ]).start();
  }, [distance, offset]);

  return { style: { transform: [{ translateX: offset }] }, shake };
}
