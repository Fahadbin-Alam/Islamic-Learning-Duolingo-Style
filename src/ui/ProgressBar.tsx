import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { colors } from "./theme";

export type ProgressBarProps = {
  progress: number;
  color?: string;
  height?: number;
  trackColor?: string;
  style?: StyleProp<ViewStyle>;
};

export function ProgressBar({ progress, color = colors.green, height = 16, trackColor = colors.line, style }: ProgressBarProps) {
  const clamped = Number.isFinite(progress) ? Math.min(1, Math.max(0, progress)) : 0;
  const value = useRef(new Animated.Value(clamped)).current;

  useEffect(() => {
    const animation = Animated.spring(value, { toValue: clamped, friction: 8, tension: 60, useNativeDriver: false });
    animation.start();
    return () => animation.stop();
  }, [clamped, value]);

  const width = value.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"], extrapolate: "clamp" });
  const radius = height / 2;

  return (
    <View
      style={[styles.track, { height, borderRadius: radius, backgroundColor: trackColor }, style]}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(clamped * 100) }}
    >
      {clamped > 0 ? (
        <Animated.View style={[styles.fill, { width, minWidth: height * 1.2, borderRadius: radius, backgroundColor: color }]}>
          <View
            style={[
              styles.shine,
              { top: height * 0.2, height: Math.max(3, height * 0.26), left: radius * 0.7, right: radius * 0.7, borderRadius: height }
            ]}
          />
        </Animated.View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: "100%",
    overflow: "hidden"
  },
  fill: {
    height: "100%"
  },
  shine: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.32)"
  }
});
