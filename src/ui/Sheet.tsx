import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Keyboard, Platform, StyleSheet, View, type KeyboardEvent, type StyleProp, type ViewStyle } from "react-native";
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
// Room left above a lifted sheet for the status bar.
const KEYBOARD_TOP_GAP = 48;

/**
 * How far the on-screen keyboard reaches up over the window, in points (0 when it is closed).
 * Android apps are edge to edge, so the window no longer shrinks for the keyboard and a sheet
 * pinned to the bottom ends up under it. Measuring from the window bottom also stays right on a
 * phone that does shrink the window (the overlap is then about 0).
 */
export function useKeyboardHeight() {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const show = (event: KeyboardEvent) => {
      const { height: keyboardHeight, screenY } = event.endCoordinates;
      const overlap = screenY > 0 ? Dimensions.get("window").height - screenY : keyboardHeight;
      setHeight(Math.max(0, Math.round(overlap)));
    };
    const hide = () => setHeight(0);
    // iOS animates with the keyboard ("will"); Android only sends "did".
    const subscriptions = Platform.OS === "ios"
      ? [Keyboard.addListener("keyboardWillChangeFrame", show), Keyboard.addListener("keyboardWillHide", hide)]
      : [Keyboard.addListener("keyboardDidShow", show), Keyboard.addListener("keyboardDidHide", hide)];
    return () => subscriptions.forEach((subscription) => subscription.remove());
  }, []);

  return height;
}

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
  const keyboardHeight = useKeyboardHeight();
  // With the keyboard up the sheet sits on top of it and shrinks to the space left, so the field
  // being typed in stays in view (its content scrolls when it is taller than that).
  const keyboardStyle: ViewStyle | undefined = keyboardHeight > 0
    ? { bottom: keyboardHeight, paddingBottom: 16, maxHeight: Dimensions.get("window").height - keyboardHeight - KEYBOARD_TOP_GAP }
    : undefined;

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
          style,
          keyboardStyle
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
