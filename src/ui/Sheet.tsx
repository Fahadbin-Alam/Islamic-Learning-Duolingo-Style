import React, { useEffect, useRef, useState } from "react";
import { Animated, Platform, Pressable, StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import { colors, radii } from "./theme";

export type SheetTone = "white" | "correct" | "wrong";

export type SheetProps = {
  visible: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  tone?: SheetTone;
  /** Dim the screen behind. Default: true for white, false for correct/wrong. */
  backdrop?: boolean;
  dismissOnBackdrop?: boolean;
  /** Extra bottom padding for the home indicator. */
  bottomInset?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const TONE_BG: Record<SheetTone, string> = {
  white: colors.white,
  correct: colors.correctBg,
  wrong: colors.wrongBg
};

const DEFAULT_INSET = Platform.OS === "ios" ? 30 : 16;

/**
 * Bottom sheet drawn as an absolute overlay inside the current screen
 * (not a Modal), so it behaves the same on web, native and in tests.
 * Place it as the last child of a screen container that fills the screen.
 */
export function Sheet({
  visible,
  onClose,
  children,
  tone = "white",
  backdrop,
  dismissOnBackdrop = true,
  bottomInset = DEFAULT_INSET,
  style,
  testID
}: SheetProps) {
  const [mounted, setMounted] = useState(visible);
  const [panelHeight, setPanelHeight] = useState(480);
  const progress = useRef(new Animated.Value(0)).current;
  const showBackdrop = backdrop ?? tone === "white";

  useEffect(() => {
    if (visible) {
      setMounted(true);
      const animation = Animated.spring(progress, { toValue: 1, friction: 9, tension: 80, useNativeDriver: true });
      animation.start();
      return () => animation.stop();
    }
    const animation = Animated.timing(progress, { toValue: 0, duration: 200, useNativeDriver: true });
    animation.start(({ finished }) => {
      if (finished) {
        setMounted(false);
      }
    });
    return () => animation.stop();
  }, [progress, visible]);

  if (!mounted) {
    return null;
  }

  const translateY = progress.interpolate({ inputRange: [0, 1], outputRange: [panelHeight + 40, 0] });

  return (
    <Animated.View style={StyleSheet.absoluteFill} pointerEvents={visible ? "box-none" : "none"} testID={testID}>
      {showBackdrop ? (
        <Animated.View style={[StyleSheet.absoluteFill, styles.backdrop, { opacity: progress }]}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={dismissOnBackdrop ? onClose : undefined}
            accessibilityRole="button"
            accessibilityLabel="Close"
          />
        </Animated.View>
      ) : null}
      <Animated.View
        onLayout={(event) => setPanelHeight(event.nativeEvent.layout.height)}
        style={[
          styles.panel,
          { backgroundColor: TONE_BG[tone], paddingBottom: 16 + bottomInset, transform: [{ translateY }] },
          style
        ]}
      >
        {children}
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(20, 32, 27, 0.45)"
  },
  panel: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: radii.sheet,
    borderTopRightRadius: radii.sheet,
    paddingTop: 20,
    paddingHorizontal: 16
  }
});
