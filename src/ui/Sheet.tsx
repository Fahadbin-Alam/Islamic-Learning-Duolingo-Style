import React, { useEffect, useRef, useState } from "react";
import { Animated, Platform, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { Portal } from "./Portal";
import { Tappable } from "./Tappable";
import { colors, radii } from "./theme";
import { t } from "../i18n";

export type SheetTone = "white" | "correct" | "wrong";

export type SheetProps = {
  visible: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  tone?: SheetTone;
  /** Dim the screen behind. Default: true for white, false for correct/wrong. */
  backdrop?: boolean;
  dismissOnBackdrop?: boolean;
  /**
   * Draw over the whole app shell (top bar and tabs too) through the PortalHost.
   * Default: true when the sheet dims the screen. Falls back to inline without a host.
   */
  portal?: boolean;
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
 * Bottom sheet drawn as an absolute overlay (not a Modal), so it behaves the same on web,
 * native and in tests. A dimmed sheet goes to the PortalHost layer and covers the whole
 * shell; without a host (or with portal={false}) place it as the last child of a
 * container that fills the screen.
 */
export function Sheet({
  visible,
  onClose,
  children,
  tone = "white",
  backdrop,
  dismissOnBackdrop = true,
  portal,
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
  const canDismiss = dismissOnBackdrop && Boolean(onClose);

  const overlay = (
    <Animated.View style={StyleSheet.absoluteFill} pointerEvents={visible ? "box-none" : "none"} testID={testID}>
      {showBackdrop ? (
        <Animated.View style={[StyleSheet.absoluteFill, styles.backdrop, { opacity: progress }]}>
          {canDismiss ? (
            // Tapping outside closes the sheet with the same soft tap as any button.
            <Tappable style={StyleSheet.absoluteFill} onPress={onClose} pressScale={1} accessibilityLabel={t("Close")} />
          ) : (
            // Still catches taps so nothing behind the sheet can be pressed.
            <View style={StyleSheet.absoluteFill} />
          )}
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

  return (portal ?? showBackdrop) ? <Portal>{overlay}</Portal> : overlay;
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
