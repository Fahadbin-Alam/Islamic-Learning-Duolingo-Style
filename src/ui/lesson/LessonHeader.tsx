import React, { memo, useEffect, useRef, useState } from "react";
import { Animated, Easing, Platform, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { Icon } from "../Icon";
import { useShake } from "../PopIn";
import { ProgressBar } from "../ProgressBar";
import { Tappable } from "../Tappable";
import { GameButton } from "../GameButton";
import { colors, darken, fonts, space } from "../theme";
import { ScrollHintGap, type ScrollHintDirection } from "./ScrollHint";
import { t } from "../../i18n";

export type LessonHearts = { current: number; max: number; unlimited: boolean };

export type LessonHeaderProps = {
  /** 0..1 */
  progress: number;
  hearts: LessonHearts;
  onClose: () => void;
  /** Extra top padding (status bar / notch). Default 0. */
  topInset?: number;
  style?: StyleProp<ViewStyle>;
};

const CLOSE_GREY = darken(colors.lockedLip, 0.12);
const MIN_FILL_PX = 34;

/** Lesson top bar: grey X, animated green progress bar, hearts (shake + flash when one is lost). */
export function LessonHeader({ progress, hearts, onClose, topInset = 0, style }: LessonHeaderProps) {
  const { style: shakeStyle, shake } = useShake(6);
  const pop = useRef(new Animated.Value(1)).current;
  const flash = useRef(new Animated.Value(0)).current;
  const float = useRef(new Animated.Value(0)).current;
  const previous = useRef(hearts.current);

  useEffect(() => {
    const before = previous.current;
    previous.current = hearts.current;
    if (hearts.unlimited || hearts.current >= before) {
      return;
    }
    shake();
    pop.setValue(1.45);
    flash.setValue(1);
    float.setValue(0);
    const animation = Animated.parallel([
      Animated.spring(pop, { toValue: 1, friction: 4, tension: 160, useNativeDriver: true }),
      Animated.timing(flash, { toValue: 0, duration: 700, easing: Easing.in(Easing.quad), useNativeDriver: true }),
      Animated.timing(float, { toValue: 1, duration: 900, easing: Easing.out(Easing.cubic), useNativeDriver: true })
    ]);
    animation.start();
    return () => animation.stop();
  }, [flash, float, hearts.current, hearts.unlimited, pop, shake]);

  // A tiny first-step fill looks like a glitch; show at least a short pill.
  const [barWidth, setBarWidth] = useState(0);
  const minFill = barWidth > 0 ? Math.min(1, MIN_FILL_PX / barWidth) : 0;
  const shownProgress = progress > 0 ? Math.max(progress, minFill) : 0;

  const empty = !hearts.unlimited && hearts.current <= 0;
  const floatY = float.interpolate({ inputRange: [0, 1], outputRange: [0, -14] });
  const floatOpacity = float.interpolate({ inputRange: [0, 0.15, 0.7, 1], outputRange: [0, 1, 1, 0] });

  return (
    <View style={[styles.root, { paddingTop: space.md + topInset }, style]}>
      <Tappable onPress={onClose} accessibilityLabel={t("Close lesson")} hitSlop={10} pressScale={0.88} style={styles.close} testID="lesson-close">
        <Icon name="close" size={26} color={CLOSE_GREY} />
      </Tappable>
      <View style={styles.bar} onLayout={(event) => setBarWidth(event.nativeEvent.layout.width)}>
        <ProgressBar progress={shownProgress} color={colors.green} height={16} testID="lesson-progress" />
      </View>
      <Animated.View
        style={[styles.hearts, shakeStyle]}
        accessible
        accessibilityRole="image"
        accessibilityLabel={hearts.unlimited ? t("Unlimited hearts") : t("{count} of {max} hearts", { count: hearts.current, max: hearts.max })}
        testID="lesson-hearts"
      >
        <Animated.View style={{ transform: [{ scale: pop }] }}>
          <Icon name="heart" size={28} color={empty ? colors.lockedLip : undefined} />
          <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { opacity: flash }]}>
            <Icon name="heartBroken" size={28} />
          </Animated.View>
        </Animated.View>
        {hearts.unlimited ? (
          <View style={styles.infinity}>
            <Icon name="infinity" size={24} color={colors.heart} />
          </View>
        ) : (
          <Text style={[styles.count, empty ? styles.countEmpty : null]} numberOfLines={1}>
            {Math.max(0, hearts.current)}
          </Text>
        )}
        <Animated.Text
          pointerEvents="none"
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          aria-hidden
          style={[styles.minus, { opacity: floatOpacity, transform: [{ translateY: floatY }] }]}
        >
          -1
        </Animated.Text>
      </Animated.View>
    </View>
  );
}

const DEFAULT_BOTTOM_INSET = Platform.OS === "ios" ? 26 : 14;

/** The gap at the top of the bar that holds the "more below" arrow: it grows by scrollHintGrowth(BAR_GAP) while it does. */
export const BAR_GAP = space.lg;

export type LessonBottomBarProps = {
  children?: React.ReactNode;
  bottomInset?: number;
  /**
   * "More below" arrow at the top of the bar (from useScrollMore). The bar grows to hold it, so it covers no text.
   * `hold`: the bar keeps that room with the arrow gone, while a sheet covers it (see ScrollHintGap). `direction`: up
   * once the end is in sight (see useStopsArrow); `still`: it shows and goes at once (see ScrollHint).
   */
  scrollHint?: { visible: boolean; hold?: boolean; onPress: () => void; direction?: ScrollHintDirection; still?: boolean };
  style?: StyleProp<ViewStyle>;
};

/** Fixed white action bar at the bottom of a lesson step (top hairline, safe-area padding). */
export function LessonBottomBar({ children, bottomInset = DEFAULT_BOTTOM_INSET, scrollHint, style }: LessonBottomBarProps) {
  return (
    <View style={[styles.bottomBar, { paddingBottom: space.lg + bottomInset }, scrollHint ? styles.bottomBarHint : null, style]}>
      {scrollHint ? (
        <ScrollHintGap
          visible={scrollHint.visible}
          hold={scrollHint.hold}
          onPress={scrollHint.onPress}
          direction={scrollHint.direction}
          still={scrollHint.still}
          gap={BAR_GAP}
          testID={scrollHint.direction === "up" ? "scroll-more-up" : "scroll-more"}
          gapTestID="bar-hint-gap"
        />
      ) : null}
      {children}
    </View>
  );
}

export type LessonCheckBarProps = {
  /** The CHECK button's label, in the app's language. */
  label: string;
  disabled: boolean;
  onCheck: () => void;
  testID: string;
  bottomInset?: number;
  /** The "more below" arrow riding on the bar's top edge (see LessonBottomBarProps' scrollHint). */
  hintVisible: boolean;
  hintHold?: boolean;
  onHint: () => void;
  hintDirection?: ScrollHintDirection;
  hintStill?: boolean;
  /** The app's language: the arrow's own label follows it. */
  language: string;
};

/**
 * The bar under a question: its CHECK button, and the "more below" arrow on its top edge. Drawn again only when what it
 * shows changes: a question drawn again while its answer sheet opens leaves its bar as it is.
 */
export const LessonCheckBar = memo(function LessonCheckBar({
  label,
  disabled,
  onCheck,
  testID,
  bottomInset,
  hintVisible,
  hintHold,
  onHint,
  hintDirection,
  hintStill
}: LessonCheckBarProps) {
  return (
    <LessonBottomBar bottomInset={bottomInset} scrollHint={{ visible: hintVisible, hold: hintHold, onPress: onHint, direction: hintDirection, still: hintStill }}>
      {/* The correct / wrong sound follows right away, so CHECK itself stays quiet. */}
      <GameButton label={label} fullWidth sound={false} disabled={disabled} onPress={onCheck} testID={testID} />
    </LessonBottomBar>
  );
});

export type LessonScreenProps = {
  progress: number;
  hearts: LessonHearts;
  onClose: () => void;
  topInset?: number;
  /** The current step (LearnCard, ExerciseView, OrderGame...). Fills the space under the header. */
  children?: React.ReactNode;
  /** Rendered last, over everything (e.g. <QuitSheet/>). */
  overlay?: React.ReactNode;
  testID?: string;
};

/** Full lesson screen: header on top, the step under it, an optional overlay sheet on top of all. */
export function LessonScreen({ progress, hearts, onClose, topInset, children, overlay, testID }: LessonScreenProps) {
  return (
    <View style={styles.screen} testID={testID}>
      <LessonHeader progress={progress} hearts={hearts} onClose={onClose} topInset={topInset} />
      <View style={styles.step}>{children}</View>
      {overlay}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: space.lg,
    paddingBottom: space.sm,
    backgroundColor: colors.snow
  },
  close: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    marginStart: -6,
    borderRadius: 18
  },
  bar: {
    flex: 1,
    minWidth: 0,
    marginHorizontal: space.md
  },
  hearts: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 46,
    position: "relative"
  },
  infinity: {
    marginStart: 4
  },
  count: {
    marginStart: 5,
    fontFamily: fonts.displayHeavy,
    fontSize: 19,
    lineHeight: 24,
    color: colors.heart,
    includeFontPadding: false
  },
  countEmpty: {
    color: colors.lockedLip
  },
  minus: {
    position: "absolute",
    right: -2,
    top: 2,
    fontFamily: fonts.displayHeavy,
    fontSize: 16,
    lineHeight: 20,
    color: colors.heart
  },
  bottomBar: {
    position: "relative",
    backgroundColor: colors.white,
    borderTopWidth: StyleSheet.hairlineWidth * 2,
    borderTopColor: colors.line,
    paddingTop: space.lg,
    paddingHorizontal: space.lg
  },
  bottomBarHint: {
    // The hint's gap takes the place of the top padding.
    paddingTop: 0
  },
  screen: {
    flex: 1,
    backgroundColor: colors.snow,
    position: "relative",
    overflow: "hidden"
  },
  step: {
    flex: 1,
    minHeight: 0,
    position: "relative"
  }
});
