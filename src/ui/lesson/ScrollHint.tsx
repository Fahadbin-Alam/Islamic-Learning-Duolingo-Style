import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, View, type LayoutChangeEvent, type NativeScrollEvent, type NativeSyntheticEvent, type ScrollView } from "react-native";
import { Icon } from "../Icon";
import { Tappable } from "../Tappable";
import { colors, withAlpha } from "../theme";

/** Content hidden below the fold by more than this shows the hint (less is only a tile's lip or padding). */
export const SCROLL_HINT_SLACK = 40;

/** Size of the round hint button. */
export const SCROLL_HINT_SIZE = 30;

const HINT_GAP = 4;

/** Height of the gap that holds the hint while it shows: a little air, the button, a little air. */
export const SCROLL_HINT_ROOM = SCROLL_HINT_SIZE + HINT_GAP * 2;

/**
 * Tracks a lesson ScrollView so the step can show a "more below" hint while part of it is hidden
 * under the bottom bar. Spread `scrollProps` on the ScrollView and give it `ref`. `slack`: how much
 * may stay hidden without the hint (default SCROLL_HINT_SLACK; a list with no bottom padding uses less).
 */
export function useScrollMore(slack: number = SCROLL_HINT_SLACK) {
  const ref = useRef<ScrollView>(null);
  const size = useRef({ viewport: 0, content: 0, offset: 0 });
  const [more, setMore] = useState(false);

  const update = useCallback(() => {
    const { viewport, content, offset } = size.current;
    const next = viewport > 0 && content - viewport - offset > slack;
    setMore((value) => (value === next ? value : next));
  }, [slack]);

  const scrollProps = {
    onLayout: (event: LayoutChangeEvent) => {
      size.current.viewport = event.nativeEvent.layout.height;
      update();
    },
    onContentSizeChange: (_width: number, height: number) => {
      size.current.content = height;
      update();
    },
    onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      size.current.offset = event.nativeEvent.contentOffset.y;
      update();
    },
    scrollEventThrottle: 32
  };

  /** Scrolls about two thirds of a screen further down. */
  const scrollDown = useCallback(() => {
    const { viewport, content, offset } = size.current;
    ref.current?.scrollTo?.({ y: Math.max(0, Math.min(content - viewport, offset + Math.round(viewport * 0.7))), animated: true });
  }, []);

  return { ref, scrollProps, more, scrollDown };
}

/** Which way a hint points: down while more is hidden below, up once the end is in view and the start is not. */
export type ScrollHintDirection = "down" | "up";

/**
 * A small bouncing round arrow, shown while more is hidden above it. It sits inside a `ScrollHintGap`
 * (or `LessonBottomBar`'s `scrollHint`), under the scrolling part and never over text; it scrolls down
 * (or, pointing up, back to the start).
 */
export function ScrollHint({
  visible,
  onPress,
  direction = "down",
  testID = "scroll-more"
}: {
  visible: boolean;
  onPress: () => void;
  direction?: ScrollHintDirection;
  testID?: string;
}) {
  const shown = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const bob = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.spring(shown, { toValue: visible ? 1 : 0, friction: 6, tension: 140, useNativeDriver: true });
    animation.start();
    return () => animation.stop();
  }, [shown, visible]);

  useEffect(() => {
    if (!visible) {
      return undefined;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bob, { toValue: 1, duration: 420, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(bob, { toValue: 0, duration: 420, easing: Easing.in(Easing.quad), useNativeDriver: true }),
        Animated.delay(600)
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [bob, visible]);

  // The arrow bobs inside the button, so the button itself never moves over the content.
  const up = direction === "up";
  const translateY = bob.interpolate({ inputRange: [0, 1], outputRange: up ? [1, -3] : [-1, 3] });
  const scale = shown.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1] });

  return (
    <Animated.View
      pointerEvents={visible ? "box-none" : "none"}
      style={[styles.root, { opacity: shown, transform: [{ scale }] }]}
      testID={visible ? testID : undefined}
    >
      <Tappable onPress={onPress} pressScale={0.88} hitSlop={8} accessibilityLabel={up ? "Scroll up" : "Scroll down"} style={styles.button}>
        <Animated.View style={{ transform: up ? [{ translateY }, { rotate: "180deg" }] : [{ translateY }] }}>
          <Icon name="chevronDown" size={18} color={colors.gemLip} />
        </Animated.View>
      </Tappable>
    </Animated.View>
  );
}

/**
 * The gap between a scrolling part and the bar under it. It is `gap` tall and grows to fit the hint
 * while more is hidden, so the button sits in the bar and never covers a line that can still be read.
 */
export function ScrollHintGap({
  visible,
  onPress,
  gap,
  direction,
  testID,
  gapTestID
}: {
  visible: boolean;
  onPress: () => void;
  gap: number;
  direction?: ScrollHintDirection;
  /** The hint's own testID (while it shows). */
  testID?: string;
  /** The gap's testID. */
  gapTestID?: string;
}) {
  return (
    <View pointerEvents="box-none" style={[styles.gap, { height: visible ? Math.max(gap, SCROLL_HINT_ROOM) : gap }]} testID={gapTestID}>
      <ScrollHint visible={visible} onPress={onPress} direction={direction} testID={testID} />
    </View>
  );
}

const styles = StyleSheet.create({
  gap: {
    position: "relative"
  },
  root: {
    position: "absolute",
    left: "50%",
    top: HINT_GAP,
    width: SCROLL_HINT_SIZE,
    height: SCROLL_HINT_SIZE,
    marginLeft: -SCROLL_HINT_SIZE / 2,
    zIndex: 5
  },
  button: {
    width: SCROLL_HINT_SIZE,
    height: SCROLL_HINT_SIZE,
    borderRadius: SCROLL_HINT_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: withAlpha(colors.gem, 0.5),
    shadowColor: colors.ink,
    shadowOpacity: 0.16,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3
  }
});
