import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, View, type LayoutChangeEvent, type NativeScrollEvent, type NativeSyntheticEvent, type ScrollView } from "react-native";
import { Icon } from "../Icon";
import { Tappable } from "../Tappable";
import { colors, withAlpha } from "../theme";

/** Content hidden below the fold by more than this shows the hint. */
const SLACK = 12;

/**
 * Tracks a lesson ScrollView so the step can show a "more below" hint while part of it is hidden
 * under the bottom bar. Spread `scrollProps` on the ScrollView and give it `ref`.
 */
export function useScrollMore() {
  const ref = useRef<ScrollView>(null);
  const size = useRef({ viewport: 0, content: 0, offset: 0 });
  const [more, setMore] = useState(false);

  const update = useCallback(() => {
    const { viewport, content, offset } = size.current;
    const next = viewport > 0 && content - viewport - offset > SLACK;
    setMore((value) => (value === next ? value : next));
  }, []);

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

/**
 * White fade plus a bouncing round arrow at the bottom of a scroll area, shown while more is hidden
 * below. Place it last inside the (position: relative) box that holds the ScrollView.
 */
export function ScrollHint({ visible, onPress, testID = "scroll-more" }: { visible: boolean; onPress: () => void; testID?: string }) {
  const shown = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const bob = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(shown, { toValue: visible ? 1 : 0, duration: 180, useNativeDriver: true });
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

  const translateY = bob.interpolate({ inputRange: [0, 1], outputRange: [0, 4] });

  return (
    <Animated.View pointerEvents={visible ? "box-none" : "none"} style={[styles.root, { opacity: shown }]} testID={visible ? testID : undefined}>
      <View pointerEvents="none" style={styles.fade}>
        <View style={[styles.band, { backgroundColor: withAlpha(colors.snow, 0.35) }]} />
        <View style={[styles.band, { backgroundColor: withAlpha(colors.snow, 0.7) }]} />
        <View style={[styles.band, { backgroundColor: withAlpha(colors.snow, 0.92) }]} />
      </View>
      <Animated.View style={[styles.buttonWrap, { transform: [{ translateY }] }]}>
        <Tappable onPress={onPress} pressScale={0.9} hitSlop={8} accessibilityLabel="Scroll down" style={styles.button}>
          <Icon name="chevronDown" size={22} color={colors.gemLip} />
        </Tappable>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 44,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  fade: {
    ...StyleSheet.absoluteFillObject
  },
  band: {
    flex: 1
  },
  buttonWrap: {
    marginBottom: 4
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: withAlpha(colors.gem, 0.45)
  }
});
