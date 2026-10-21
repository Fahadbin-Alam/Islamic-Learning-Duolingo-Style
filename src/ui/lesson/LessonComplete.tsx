import React, { useEffect, useRef } from "react";
import { Animated, Easing, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { withHonorifics } from "../ArabicText";
import { Confetti } from "../Confetti";
import { CountUp } from "../CountUp";
import { GameButton } from "../GameButton";
import { Icon, type IconName } from "../Icon";
import { Mascot } from "../Mascot";
import { PopIn } from "../PopIn";
import { playUi } from "../sound";
import { colors, darken, fonts, lighten, radii, space } from "../theme";
import { LessonBottomBar } from "./LessonHeader";
import { useScrollMore } from "./ScrollHint";

export type LessonCompleteProps = {
  /** Default "Lesson complete!". A passed unit test-out says "You jumped ahead!". */
  headline?: string;
  title: string;
  xp: number;
  stars: number;
  streakDays: number;
  /** The streak grew with this lesson: the streak card plays the streak sound as it pops in. */
  streakExtended?: boolean;
  /** Today's XP against the daily goal. Shown instead of the streak while the streak is still 0. */
  goal?: { xpToday: number; goalXp: number };
  unlockedTitle?: string;
  gemsReward?: number;
  mascotVariant: string;
  accent: string;
  /** When set, the main button reads NEXT LESSON. */
  nextTitle?: string;
  onContinue: () => void;
  onBackToPath?: () => void;
  /**
   * Play lesson_complete on mount, streak with the streak card (when it grew) and xp when the counters finish (not
   * when the XP is 0, as on a replay of a finished lesson). Default true.
   */
  playSounds?: boolean;
  bottomInset?: number;
  testID?: string;
};

const COUNT_DURATION = 900;
const MAX_STARS = 3;

// Numbers a step darker than the card fills so they read on white (all at least 4:1).
const XP_INK = darken(colors.goldLip, 0.25);
const GOLD_LABEL = darken(colors.goldLip, 0.45);
const STREAK_INK = darken(colors.flame, 0.3);
const HEADLINE = darken(colors.goldLip, 0.2);
const CARD_DELAY = 350;
const CARD_STAGGER = 140;

function StatCard({
  label,
  icon,
  value,
  color,
  ink,
  labelColor = colors.white,
  index,
  children,
  accessibilityLabel,
  testID
}: {
  label: string;
  icon?: IconName;
  value?: number;
  color: string;
  ink?: string;
  labelColor?: string;
  index: number;
  /** Replaces the icon + counter (the stars card draws stars). */
  children?: React.ReactNode;
  accessibilityLabel?: string;
  testID: string;
}) {
  return (
    <PopIn delay={CARD_DELAY + index * CARD_STAGGER} style={styles.cardSlot}>
      <View style={[styles.card, { backgroundColor: color, borderColor: color }]} testID={testID} accessibilityLabel={accessibilityLabel}>
        {/* Short labels at a size that fits three cards in 320 px (web has no adjustsFontSizeToFit). */}
        <Text style={[styles.cardLabel, { color: labelColor }]}>{label}</Text>
        <View style={styles.cardBody}>
          {children ?? (
            <>
              {icon ? <Icon name={icon} size={26} /> : null}
              <CountUp value={value ?? 0} duration={COUNT_DURATION} style={[styles.cardValue, { color: ink ?? color }]} />
            </>
          )}
        </View>
      </View>
    </PopIn>
  );
}

/** Up to three stars that pop in one by one; unearned ones are grey. */
function StarRow({ stars }: { stars: number }) {
  const earned = Math.max(0, Math.min(MAX_STARS, Math.round(stars)));
  return (
    <View style={styles.starRow}>
      {Array.from({ length: MAX_STARS }, (_, index) => (
        <PopIn key={index} delay={CARD_DELAY + CARD_STAGGER + 260 + index * 160} style={index === 1 ? styles.starMiddle : styles.starSide}>
          <Icon name="star" size={index === 1 ? 28 : 24} color={index < earned ? undefined : colors.lockedLip} />
        </PopIn>
      ))}
    </View>
  );
}

/** End-of-lesson celebration: confetti, cheering mascot, three counting stat cards, CONTINUE. */
export function LessonComplete({
  headline = "Lesson complete!",
  title,
  xp,
  stars,
  streakDays,
  streakExtended,
  goal,
  unlockedTitle,
  gemsReward,
  mascotVariant,
  accent,
  nextTitle,
  onContinue,
  onBackToPath,
  playSounds = true,
  bottomInset,
  testID = "lesson-complete"
}: LessonCompleteProps) {
  const bounce = useRef(new Animated.Value(0)).current;
  const { width, height } = useWindowDimensions();
  // Short phones (iPhone SE): a smaller mascot and tighter gaps, so the pills stay above the buttons.
  const short = height > 0 && height < 640;
  const mascotSize = short ? 96 : height > 0 && height < 720 ? 112 : 150;
  // Three cards share a 320 px row: no room for the trophy next to "10/40", and the headline drops a size.
  const narrow = width > 0 && width < 360;
  const { ref: scrollRef, scrollProps, more, scrollDown } = useScrollMore();

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bounce, { toValue: 1, duration: 320, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(bounce, { toValue: 0, duration: 380, easing: Easing.bounce, useNativeDriver: true }),
        Animated.delay(500)
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [bounce]);

  useEffect(() => {
    if (!playSounds) {
      return undefined;
    }
    playUi("lesson_complete");
    // Spread out so no two sounds land together: the fanfare, then the streak card, then the XP count.
    const streakTimer = streakExtended ? setTimeout(() => playUi("streak"), CARD_DELAY + 2 * CARD_STAGGER + 120) : undefined;
    // Nothing to count up on a replay, so no XP sound either.
    const xpTimer = xp > 0 ? setTimeout(() => playUi("xp"), CARD_DELAY + 2 * CARD_STAGGER + COUNT_DURATION + (streakExtended ? 420 : 120)) : undefined;
    return () => {
      if (xpTimer) {
        clearTimeout(xpTimer);
      }
      if (streakTimer) {
        clearTimeout(streakTimer);
      }
    };
    // Sounds play once, when the screen opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playSounds]);

  const jump = bounce.interpolate({ inputRange: [0, 1], outputRange: [0, -18] });
  const squash = bounce.interpolate({ inputRange: [0, 1], outputRange: [1, 1.04] });

  return (
    <View style={styles.root} testID={testID}>
      <ScrollView ref={scrollRef} style={styles.scroll} contentContainerStyle={[styles.content, short ? styles.contentShort : null]} {...scrollProps}>
        <Animated.View style={{ transform: [{ translateY: jump }, { scale: squash }] }}>
          <Mascot variant={mascotVariant} mood="cheer" accent={accent} size={mascotSize} />
        </Animated.View>
        <PopIn delay={120}>
          <Text style={[styles.headline, narrow ? styles.headlineNarrow : null]} accessibilityRole="header">
            {headline}
          </Text>
        </PopIn>
        <Text style={styles.lessonTitle}>{withHonorifics(title)}</Text>

        <View style={[styles.cards, short ? styles.cardsShort : null]}>
          <StatCard label="XP EARNED" icon="bolt" value={xp} color={colors.gold} ink={XP_INK} labelColor={GOLD_LABEL} index={0} testID="stat-xp" />
          <StatCard
            label="STARS"
            color={colors.gem}
            index={1}
            accessibilityLabel={`${Math.min(MAX_STARS, stars)} of ${MAX_STARS} stars`}
            testID="stat-stars"
          >
            <StarRow stars={stars} />
          </StatCard>
          {streakDays === 0 && goal ? (
            <StatCard
              label="GOAL"
              color={colors.flame}
              index={2}
              accessibilityLabel={`${Math.min(goal.xpToday, goal.goalXp)} of ${goal.goalXp} XP today`}
              testID="stat-goal"
            >
              {narrow ? null : <Icon name="trophy" size={24} />}
              {/* "10" big and "/40" small; no numberOfLines, so the number is never cut to "10/...". */}
              <View style={[styles.goalRow, narrow ? styles.goalRowNarrow : null]}>
                <CountUp value={Math.min(goal.xpToday, goal.goalXp)} duration={COUNT_DURATION} style={[styles.cardValue, styles.goalValue, { color: STREAK_INK }]} />
                <Text style={[styles.goalOf, { color: STREAK_INK }]}>/{goal.goalXp}</Text>
              </View>
            </StatCard>
          ) : (
            <StatCard label="STREAK" icon="flame" value={streakDays} color={colors.flame} ink={STREAK_INK} index={2} testID="stat-streak" />
          )}
        </View>

        {unlockedTitle || gemsReward ? (
          <View style={styles.pills}>
            {unlockedTitle ? (
              <PopIn delay={CARD_DELAY + 3 * CARD_STAGGER} style={[styles.pill, { backgroundColor: lighten(colors.green, 0.85) }]}>
                <Icon name="key" size={18} />
                <Text style={[styles.pillText, { color: darken(colors.correctInk, 0.12) }]}>Unlocked: {withHonorifics(unlockedTitle)}</Text>
              </PopIn>
            ) : null}
            {gemsReward ? (
              <PopIn delay={CARD_DELAY + 4 * CARD_STAGGER} style={[styles.pill, { backgroundColor: lighten(colors.gem, 0.85) }]}>
                <Icon name="gem" size={18} />
                <Text style={[styles.pillText, { color: colors.gemLip }]}>+{gemsReward} gems</Text>
              </PopIn>
            ) : null}
          </View>
        ) : null}
      </ScrollView>

      <LessonBottomBar bottomInset={bottomInset} scrollHint={{ visible: more, onPress: scrollDown }}>
        <GameButton label={nextTitle ? "Next lesson" : "Continue"} fullWidth onPress={onContinue} testID="complete-continue" />
        {onBackToPath ? (
          <GameButton
            label="Back to path"
            variant="ghost"
            color={colors.inkSoft}
            fullWidth
            onPress={onBackToPath}
            style={styles.ghost}
            testID="complete-back"
          />
        ) : null}
      </LessonBottomBar>

      <Confetti active />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: "relative",
    backgroundColor: colors.snow
  },
  scroll: {
    flex: 1
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: space.lg,
    paddingTop: space.xxl,
    paddingBottom: space.xxl
  },
  contentShort: {
    paddingTop: space.lg,
    paddingBottom: space.lg
  },
  headline: {
    fontFamily: fonts.displayHeavy,
    fontSize: 34,
    lineHeight: 42,
    color: HEADLINE,
    textAlign: "center",
    marginTop: space.md
  },
  headlineNarrow: {
    fontSize: 30,
    lineHeight: 36
  },
  lessonTitle: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 16,
    lineHeight: 22,
    color: colors.inkSoft,
    textAlign: "center",
    flexShrink: 1,
    maxWidth: "100%"
  },
  cards: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignSelf: "stretch",
    marginTop: space.xxl,
    marginHorizontal: -space.xs
  },
  cardsShort: {
    marginTop: space.lg
  },
  cardSlot: {
    flexGrow: 1,
    flexBasis: 88,
    maxWidth: 140,
    minWidth: 84,
    padding: space.xs
  },
  // The row stretches every slot to the tallest card and each card fills its slot, so all three match.
  card: {
    flexGrow: 1,
    borderWidth: 2,
    borderRadius: radii.md,
    overflow: "hidden"
  },
  cardLabel: {
    fontFamily: fonts.displayHeavy,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.6,
    color: colors.white,
    textAlign: "center",
    paddingVertical: 3,
    paddingHorizontal: 4
  },
  cardBody: {
    flexGrow: 1,
    backgroundColor: colors.white,
    borderRadius: radii.md - 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: space.md,
    paddingHorizontal: 6
  },
  // Same 30 px line as the other cards' numbers: the baseline shift of "/40" must not make it taller.
  goalRow: {
    flexDirection: "row",
    alignItems: "baseline",
    height: 30,
    flexShrink: 1,
    minWidth: 0
  },
  goalRowNarrow: {
    marginLeft: -4
  },
  goalValue: {
    fontSize: 22
  },
  goalOf: {
    fontFamily: fonts.displayHeavy,
    fontSize: 15,
    lineHeight: 30
  },
  cardValue: {
    marginLeft: 4,
    fontFamily: fonts.displayHeavy,
    fontSize: 24,
    lineHeight: 30,
    flexShrink: 1
  },
  starRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    height: 30
  },
  starSide: {
    marginBottom: 1
  },
  starMiddle: {
    marginHorizontal: 1,
    marginBottom: 3
  },
  pills: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: space.lg
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 5,
    margin: space.xs,
    maxWidth: "100%"
  },
  pillText: {
    marginLeft: 6,
    flexShrink: 1,
    fontFamily: fonts.bodyHeavy,
    fontSize: 15,
    lineHeight: 20
  },
  ghost: {
    marginTop: space.xs
  }
});
