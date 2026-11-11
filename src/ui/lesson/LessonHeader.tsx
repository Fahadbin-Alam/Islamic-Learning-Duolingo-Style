import React, { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Animated, Easing, Platform, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { Icon } from "../Icon";
import { useShake } from "../PopIn";
import { ProgressBar } from "../ProgressBar";
import { Tappable } from "../Tappable";
import { GameButton } from "../GameButton";
import { colors, darken, fonts, space } from "../theme";
import { useReduceMotion } from "../motion";
import { ScrollHintGap, type ScrollHintDirection } from "./ScrollHint";
import { WithReadAloud } from "./ReadAloudButton";
import { isRtlLanguage, t } from "../../i18n";

const t_ = t;

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
  /** The teacher reads the question aloud: a speaker before CHECK (none when undefined: no voice, nothing to read). */
  onRead?: () => void;
  reading?: boolean;
};

/**
 * The bar under a question: its CHECK button (with the speaker before it, when the question can be read aloud), and
 * the "more below" arrow on its top edge. Drawn again only when what it shows changes: a question drawn again while
 * its answer sheet opens leaves its bar as it is.
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
  hintStill,
  onRead,
  reading = false
}: LessonCheckBarProps) {
  return (
    <LessonBottomBar bottomInset={bottomInset} scrollHint={{ visible: hintVisible, hold: hintHold, onPress: onHint, direction: hintDirection, still: hintStill }}>
      <WithReadAloud onRead={onRead} reading={reading} testID="question-read-aloud">
        {/* The correct / wrong sound follows right away, so CHECK itself stays quiet. */}
        <GameButton label={label} fullWidth sound={false} disabled={disabled} onPress={onCheck} testID={testID} />
      </WithReadAloud>
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
  /** Answers right in a row: at 3, 5, 10 and every 5 after, a "right in a row!" badge pops under the bar. */
  inARow?: number;
  /** Which step this is: when it changes, the new step slides in from the side, like turning to the next card. */
  stepKey?: string;
  testID?: string;
};

/** How far a new step slides in from, px. */
const STEP_SLIDE = 56;

/**
 * Slides each new step in from the side (the reading side: from the right in English, the left in Arabic and Urdu)
 * with a little spring, so moving on feels like the next card arriving, not the screen blinking. Set before the
 * first paint of the new step, so it never shows in place first.
 */
function useStepSlide(stepKey: string | undefined) {
  const reduceMotion = useReduceMotion();
  const slide = useRef(new Animated.Value(1)).current;
  const before = useRef(stepKey);
  useLayoutEffect(() => {
    if (stepKey === before.current) return undefined;
    before.current = stepKey;
    if (reduceMotion) return undefined;
    slide.setValue(0);
    const animation = Animated.spring(slide, { toValue: 1, friction: 9, tension: 80, useNativeDriver: true });
    animation.start();
    return () => animation.stop();
  }, [stepKey, reduceMotion, slide]);
  const from = isRtlLanguage() ? -STEP_SLIDE : STEP_SLIDE;
  return {
    opacity: slide.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 1, 1], extrapolate: "clamp" }),
    transform: [{ translateX: slide.interpolate({ inputRange: [0, 1], outputRange: [from, 0] }) }]
  };
}

/** Full lesson screen: header on top, the step under it, an optional overlay sheet on top of all. */
export function LessonScreen({ progress, hearts, onClose, topInset, children, overlay, inARow = 0, stepKey, testID }: LessonScreenProps) {
  const [headerHeight, setHeaderHeight] = useState(0);
  const slideStyle = useStepSlide(stepKey);
  return (
    <View style={styles.screen} testID={testID}>
      <View onLayout={(event) => setHeaderHeight(Math.round(event.nativeEvent.layout.height))}>
        <LessonHeader progress={progress} hearts={hearts} onClose={onClose} topInset={topInset} />
      </View>
      <Animated.View style={[styles.step, slideStyle]}>{children}</Animated.View>
      {headerHeight > 0 ? <ComboBadge inARow={inARow} top={headerHeight} /> : null}
      {overlay}
    </View>
  );
}

/** When a run of right answers gets a badge. */
export function isComboMilestone(count: number) {
  return count === 3 || count === 5 || (count >= 10 && count % 5 === 0);
}

const COMBO_MS = 1900;

/**
 * "5 right in a row!": a flame badge that pops in under the progress bar, wiggles, floats up a little and fades, the
 * moment a run of right answers reaches a milestone. It sits over the screen (it takes no room), and nothing taps it.
 */
export const ComboBadge = memo(function ComboBadge({ inARow, top }: { inARow: number; top: number }) {
  const reduceMotion = useReduceMotion();
  const t = useRef(new Animated.Value(0)).current;
  const [shown, setShown] = useState(0);
  const before = useRef(inARow);
  useEffect(() => {
    const was = before.current;
    before.current = inARow;
    if (inARow <= was || !isComboMilestone(inARow)) return undefined;
    setShown(inARow);
    t.setValue(0);
    const run = Animated.timing(t, { toValue: 1, duration: reduceMotion ? 1400 : COMBO_MS, easing: Easing.linear, useNativeDriver: true });
    run.start();
    const done = setTimeout(() => setShown(0), (reduceMotion ? 1400 : COMBO_MS) + 60);
    return () => {
      clearTimeout(done);
      run.stop();
    };
  }, [inARow, reduceMotion, t]);
  if (!shown) return null;
  const opacity = t.interpolate({ inputRange: [0, 0.08, 0.8, 1], outputRange: [0, 1, 1, 0] });
  const scale = reduceMotion ? 1 : t.interpolate({ inputRange: [0, 0.1, 0.18, 0.26, 1], outputRange: [0.4, 1.18, 0.94, 1, 1] });
  const translateY = reduceMotion ? 0 : t.interpolate({ inputRange: [0, 0.7, 1], outputRange: [0, 0, -10] });
  const wiggle = reduceMotion
    ? "0deg"
    : t.interpolate({ inputRange: [0, 0.2, 0.28, 0.36, 0.44, 0.52, 1], outputRange: ["0deg", "0deg", "-14deg", "12deg", "-8deg", "0deg", "0deg"] });
  return (
    <View pointerEvents="none" style={[styles.comboRow, { top: top - space.xs }]} testID="combo-badge">
      <Animated.View style={[styles.combo, { opacity, transform: [{ translateY }, { scale }] }]}>
        <Animated.View style={{ transform: [{ rotate: wiggle }] }}>
          <Icon name="flame" size={20} />
        </Animated.View>
        <Text style={styles.comboText} numberOfLines={1}>
          {t_("{count} right in a row!", { count: shown })}
        </Text>
      </Animated.View>
    </View>
  );
});

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
  },
  comboRow: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center"
  },
  combo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#FFF4E0",
    borderWidth: 2,
    borderColor: "#FFC46B"
  },
  comboText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 15,
    lineHeight: 20,
    color: "#A84A00",
    includeFontPadding: false
  }
});
