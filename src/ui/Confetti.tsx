import React, { useEffect, useMemo, useState } from "react";
import { Animated, Easing, StyleSheet, View, type LayoutChangeEvent } from "react-native";
import { colors as palette } from "./theme";

export type ConfettiProps = {
  active: boolean;
  count?: number;
  colors?: string[];
};

const DEFAULT_COLORS = [palette.green, palette.gold, palette.gem, palette.heart, palette.flame, "#8E5CF7"];

type Piece = {
  x: number;
  drift: number;
  up: number;
  size: number;
  round: boolean;
  color: string;
  spin: number;
  delay: number;
  duration: number;
  value: Animated.Value;
};

function makePieces(count: number, colorList: string[]): Piece[] {
  return Array.from({ length: count }, (_, index) => ({
    x: Math.random(),
    drift: (Math.random() - 0.5) * 160,
    up: 140 + Math.random() * 260,
    size: 7 + Math.random() * 7,
    round: Math.random() < 0.3,
    color: colorList[index % colorList.length],
    spin: (Math.random() < 0.5 ? -1 : 1) * (360 + Math.random() * 540),
    delay: Math.random() * 180,
    duration: 1500 + Math.random() * 900,
    value: new Animated.Value(0)
  }));
}

/** Burst of confetti over the parent. Re-runs each time `active` turns true. */
export function Confetti({ active, count = 36, colors = DEFAULT_COLORS }: ConfettiProps) {
  const [size, setSize] = useState({ width: 390, height: 700 });
  const [burst, setBurst] = useState(0);
  const [running, setRunning] = useState(false);
  const colorKey = colors.join(",");
  // A fresh set of pieces for every burst.
  const pieces = useMemo(() => (burst > 0 ? makePieces(count, colorKey.split(",")) : []), [burst, count, colorKey]);

  useEffect(() => {
    if (active) {
      setBurst((value) => value + 1);
    }
  }, [active]);

  useEffect(() => {
    if (burst === 0) {
      return undefined;
    }
    setRunning(true);
    const animation = Animated.parallel(
      pieces.map((piece) =>
        Animated.timing(piece.value, {
          toValue: 1,
          delay: piece.delay,
          duration: piece.duration,
          easing: Easing.linear,
          useNativeDriver: true
        })
      )
    );
    animation.start(({ finished }) => {
      if (finished) {
        setRunning(false);
      }
    });
    return () => animation.stop();
  }, [burst, pieces]);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    if (width > 0 && height > 0) {
      setSize({ width, height });
    }
  };

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill} onLayout={onLayout}>
      {running
        ? pieces.map((piece, index) => {
            const value = piece.value;
            const startY = size.height * 0.42;
            const translateY = value.interpolate({
              inputRange: [0, 0.28, 1],
              outputRange: [startY, startY - piece.up, size.height + 40]
            });
            const translateX = value.interpolate({ inputRange: [0, 1], outputRange: [piece.x * size.width, piece.x * size.width + piece.drift] });
            const rotate = value.interpolate({ inputRange: [0, 1], outputRange: ["0deg", `${piece.spin}deg`] });
            const opacity = value.interpolate({ inputRange: [0, 0.05, 0.85, 1], outputRange: [0, 1, 1, 0] });
            return (
              <Animated.View
                key={`${burst}-${index}`}
                style={[
                  styles.piece,
                  {
                    width: piece.size,
                    height: piece.round ? piece.size : piece.size * 0.55,
                    borderRadius: piece.round ? piece.size / 2 : 2,
                    backgroundColor: piece.color,
                    opacity,
                    transform: [{ translateX }, { translateY }, { rotate }]
                  }
                ]}
              />
            );
          })
        : null}
    </View>
  );
}

const styles = StyleSheet.create({
  piece: {
    position: "absolute",
    left: 0,
    top: 0
  }
});
