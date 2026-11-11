import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { withHonorifics } from "../ArabicText";
import { Confetti } from "../Confetti";
import { CountUp } from "../CountUp";
import { GameButton } from "../GameButton";
import { Icon, type IconName } from "../Icon";
import { Mascot } from "../Mascot";
import { PopIn } from "../PopIn";
import { haptic, playUi } from "../sound";
import type { LessonRecapItem } from "./lessonRecap";
import type { LessonPicture } from "../../data/lessonPictures";
import type { AlbumSet } from "../../data/albumSets";
import { AlbumThumb } from "./LessonPhoto";
import { colors, darken, fonts, lighten, radii, space } from "../theme";
import { LessonBottomBar } from "./LessonHeader";
import { useScrollMore } from "./ScrollHint";
import { t } from "../../i18n";

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
  /** No mistakes: a gold "Perfect lesson!" ribbon, its own fanfare, and the teacher jumps for joy again and again. */
  perfect?: boolean;
  /** Share right on the first try (0..100) and the longest run in a row, for the recap line. */
  accuracy?: number;
  bestInARow?: number;
  /** A few questions of the lesson with their answers, to read once more. */
  recap?: LessonRecapItem[];
  /** Today's quests this lesson finished, already worded ("Get 5 right in a row"). */
  questsDone?: string[];
  /** Pictures this lesson put in the learner's picture album for the first time: they pop in, moving. */
  newPictures?: LessonPicture[];
  /** Album sets these pictures finished: a gold badge for each, with its own fanfare. */
  finishedSets?: AlbumSet[];
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
/** New album pictures shown on the card at most (the album has them all). */
const ALBUM_SHOWN = 3;
const MAX_STARS = 3;

// Numbers a step darker than the card fills so they read on white (all at least 4:1).
const XP_INK = darken(colors.goldLip, 0.25);
const GOLD_LABEL = darken(colors.goldLip, 0.45);
const STREAK_INK = darken(colors.flame, 0.3);
const HEADLINE = darken(colors.goldLip, 0.2);
const CARD_DELAY = 350;
const CARD_STAGGER = 140;
/** When a finished album set's badge lands: after the new pictures have popped in. */
const SET_BADGE_DELAY = CARD_DELAY + 4 * CARD_STAGGER + COUNT_DURATION + 1700;

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
  headline = t("Lesson complete!"),
  title,
  xp,
  stars,
  streakDays,
  streakExtended,
  goal,
  unlockedTitle,
  gemsReward,
  perfect,
  accuracy,
  bestInARow,
  recap,
  questsDone,
  newPictures,
  finishedSets,
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
    // A perfect lesson's fanfare comes as its ribbon pops in, before the streak and XP sounds.
    const perfectTimer = perfect ? setTimeout(() => playUi("perfect"), CARD_DELAY - 120) : undefined;
    // Spread out so no two sounds land together: the fanfare, then the streak card, then the XP count.
    const streakTimer = streakExtended ? setTimeout(() => playUi("streak"), CARD_DELAY + 2 * CARD_STAGGER + 120) : undefined;
    // Nothing to count up on a replay, so no XP sound either.
    const xpTimer = xp > 0 ? setTimeout(() => playUi("xp"), CARD_DELAY + 2 * CARD_STAGGER + COUNT_DURATION + (streakExtended ? 420 : 120)) : undefined;
    // A finished daily quest chimes last, as its pill pops in.
    const questTimer = questsDone?.length ? setTimeout(() => playUi("quest"), CARD_DELAY + 4 * CARD_STAGGER + COUNT_DURATION + 600) : undefined;
    // A finished album set: its badge lands with the unlock fanfare and a happy buzz.
    const setTimer = finishedSets?.length
      ? setTimeout(() => {
          playUi("unlock");
          haptic("success");
        }, SET_BADGE_DELAY)
      : undefined;
    return () => {
      if (setTimer) {
        clearTimeout(setTimer);
      }
      if (questTimer) {
        clearTimeout(questTimer);
      }
      if (perfectTimer) {
        clearTimeout(perfectTimer);
      }
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

  // A perfect lesson: the teacher springs up for joy every couple of seconds, on top of its happy bounce.
  const [cheers, setCheers] = useState(0);
  useEffect(() => {
    if (!perfect) return undefined;
    setCheers(1);
    const timer = setInterval(() => setCheers((count) => count + 1), 2200);
    return () => clearInterval(timer);
  }, [perfect]);
  const recapItems = recap ?? [];
  const showStats = accuracy !== undefined;

  const jump = bounce.interpolate({ inputRange: [0, 1], outputRange: [0, -18] });
  const squash = bounce.interpolate({ inputRange: [0, 1], outputRange: [1, 1.04] });

  return (
    <View style={styles.root} testID={testID}>
      <ScrollView ref={scrollRef} style={styles.scroll} contentContainerStyle={[styles.content, short ? styles.contentShort : null]} {...scrollProps}>
        <Animated.View style={{ transform: [{ translateY: jump }, { scale: squash }] }}>
          <Mascot variant={mascotVariant} mood="cheer" accent={accent} size={mascotSize} act={cheers ? { kind: "celebrate", key: cheers } : undefined} />
        </Animated.View>
        <PopIn delay={120}>
          <Text style={[styles.headline, narrow ? styles.headlineNarrow : null]} accessibilityRole="header">
            {perfect ? t("Perfect lesson!") : headline}
          </Text>
        </PopIn>
        {perfect ? (
          <PopIn delay={CARD_DELAY - 120}>
            <View style={styles.perfect} testID="perfect-ribbon">
              <Icon name="star" size={18} />
              <Text style={styles.perfectText}>{t("No mistakes!")}</Text>
              <Icon name="star" size={18} />
            </View>
          </PopIn>
        ) : null}
        <Text style={styles.lessonTitle}>{withHonorifics(title)}</Text>

        <View style={[styles.cards, short ? styles.cardsShort : null]}>
          <StatCard label={t("XP EARNED")} icon="bolt" value={xp} color={colors.gold} ink={XP_INK} labelColor={GOLD_LABEL} index={0} testID="stat-xp" />
          <StatCard
            label={t("STARS")}
            color={colors.gem}
            index={1}
            accessibilityLabel={t("{count} of {max} stars", { count: Math.min(MAX_STARS, stars), max: MAX_STARS })}
            testID="stat-stars"
          >
            <StarRow stars={stars} />
          </StatCard>
          {streakDays === 0 && goal ? (
            <StatCard
              label={t("GOAL")}
              color={colors.flame}
              index={2}
              accessibilityLabel={t("{count} of {max} XP today", { count: Math.min(goal.xpToday, goal.goalXp), max: goal.goalXp })}
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
            <StatCard label={t("STREAK")} icon="flame" value={streakDays} color={colors.flame} ink={STREAK_INK} index={2} testID="stat-streak" />
          )}
        </View>

        {unlockedTitle || gemsReward ? (
          <View style={styles.pills}>
            {unlockedTitle ? (
              <PopIn delay={CARD_DELAY + 3 * CARD_STAGGER} style={[styles.pill, { backgroundColor: lighten(colors.green, 0.85) }]}>
                <Icon name="key" size={18} />
                <Text style={[styles.pillText, { color: darken(colors.correctInk, 0.12) }]}>{withHonorifics(t("Unlocked: {title}", { title: unlockedTitle }))}</Text>
              </PopIn>
            ) : null}
            {gemsReward ? (
              <PopIn delay={CARD_DELAY + 4 * CARD_STAGGER} style={[styles.pill, { backgroundColor: lighten(colors.date, 0.86) }]}>
                <Icon name="date" size={18} />
                <Text style={[styles.pillText, { color: colors.dateLip }]}>{t("+{count} dates", { count: gemsReward })}</Text>
              </PopIn>
            ) : null}
          </View>
        ) : null}

        {questsDone?.length ? (
          <PopIn delay={CARD_DELAY + 4 * CARD_STAGGER + COUNT_DURATION + 600} style={styles.quests}>
            <View testID="complete-quests">
              {questsDone.map((label) => (
                <View key={label} style={styles.questPill} testID="complete-quest">
                  <Icon name="trophy" size={18} />
                  <Text style={styles.questPillText}>{t("Quest done: {quest}", { quest: label })}</Text>
                </View>
              ))}
            </View>
          </PopIn>
        ) : null}
        {newPictures?.length ? (
          <PopIn delay={CARD_DELAY + 4 * CARD_STAGGER + COUNT_DURATION + 900} style={styles.album}>
            <View testID="complete-album">
              <View style={styles.albumHead}>
                <Icon name="star8" size={18} />
                <Text style={styles.albumTitle}>
                  {newPictures.length === 1 ? t("New picture for your album!") : t("{count} new pictures for your album!", { count: newPictures.length })}
                </Text>
              </View>
              <View style={styles.albumRow}>
                {newPictures.slice(0, ALBUM_SHOWN).map((picture, index) => (
                  <PopIn key={picture.id} delay={CARD_DELAY + 4 * CARD_STAGGER + COUNT_DURATION + 1100 + index * 180}>
                    <AlbumThumb picture={picture} size={76} testID="complete-album-picture" />
                  </PopIn>
                ))}
              </View>
              {finishedSets?.map((set, index) => (
                <PopIn key={set.id} delay={SET_BADGE_DELAY + index * 220} style={styles.setBadge}>
                  <View style={styles.setBadgeRow} testID="complete-album-set" accessible accessibilityLabel={t("Set complete: {set}!", { set: t(set.title) })}>
                    <View style={styles.setMedal}>
                      <Icon name={set.icon} size={26} />
                    </View>
                    <View style={styles.setBadgeWords}>
                      <Text style={styles.setBadgeEyebrow}>{t("Set complete!")}</Text>
                      <Text style={styles.setBadgeTitle}>{withHonorifics(t(set.title))}</Text>
                    </View>
                    <Icon name="crown" size={24} />
                  </View>
                </PopIn>
              ))}
            </View>
          </PopIn>
        ) : null}
                {showStats || recapItems.length ? (
          <PopIn delay={CARD_DELAY + 5 * CARD_STAGGER} style={styles.recap}>
            <View testID="lesson-recap">
            {showStats ? (
              <View style={styles.recapStats}>
                <View style={styles.recapStat} testID="recap-accuracy">
                  <Icon name="check" size={18} color={colors.green} />
                  <Text style={styles.recapStatText}>{t("{count}% right", { count: accuracy ?? 0 })}</Text>
                </View>
                {bestInARow ? (
                  <View style={styles.recapStat} testID="recap-best-run">
                    <Icon name="flame" size={18} />
                    <Text style={styles.recapStatText}>{t("Best run: {count} in a row", { count: bestInARow })}</Text>
                  </View>
                ) : null}
              </View>
            ) : null}
            {recapItems.length ? (
              <View style={styles.recapCard}>
                <Text style={styles.recapTitle}>{t("Remember")}</Text>
                {recapItems.map((item, index) => (
                  <View key={`${index}-${item.question}`} style={[styles.recapRow, index > 0 ? styles.recapRowGap : null]} testID="recap-item">
                    <Text style={styles.recapQuestion}>{withHonorifics(item.question)}</Text>
                    <Text style={[styles.recapAnswer, item.missed ? styles.recapAnswerMissed : null]}>{withHonorifics(item.answer)}</Text>
                  </View>
                ))}
              </View>
            ) : null}
            </View>
          </PopIn>
        ) : null}
      </ScrollView>

      <LessonBottomBar bottomInset={bottomInset} scrollHint={{ visible: more, onPress: scrollDown }}>
        <GameButton label={nextTitle ? t("Next lesson") : t("Continue")} fullWidth onPress={onContinue} testID="complete-continue" />
        {onBackToPath ? (
          <GameButton
            label={t("Back to path")}
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
  // Same 30 px line as the other cards' numbers: the baseline shift of "/40" must not make it taller. "10/40" reads left
  // to right in every language, so right to left it is not drawn "/40 10".
  goalRow: {
    flexDirection: "row",
    alignItems: "baseline",
    height: 30,
    flexShrink: 1,
    minWidth: 0,
    direction: "ltr"
  },
  goalRowNarrow: {
    marginStart: -4
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
    marginStart: 4,
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
    marginStart: 6,
    flexShrink: 1,
    fontFamily: fonts.bodyHeavy,
    fontSize: 15,
    lineHeight: 20
  },
  ghost: {
    marginTop: space.xs
  },
  perfect: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: space.sm,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: radii.pill,
    backgroundColor: lighten(colors.gold, 0.8),
    borderWidth: 2,
    borderColor: colors.gold
  },
  perfectText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 16,
    lineHeight: 21,
    color: GOLD_LABEL
  },
  recap: {
    alignSelf: "stretch",
    marginTop: space.lg
  },
  recapStats: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: space.sm
  },
  album: {
    alignSelf: "stretch",
    marginTop: space.sm,
    paddingVertical: space.sm,
    paddingHorizontal: space.md,
    borderRadius: radii.lg,
    borderWidth: 2,
    borderColor: lighten(colors.gem, 0.55),
    backgroundColor: lighten(colors.gem, 0.9)
  },
  albumHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: space.xs
  },
  albumTitle: {
    flexShrink: 1,
    fontFamily: fonts.bodyHeavy,
    fontSize: 15,
    color: darken(colors.gem, 0.35),
    textAlign: "center"
  },
  albumRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: space.sm,
    marginTop: space.sm
  },
  setBadge: {
    marginTop: space.sm
  },
  setBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    paddingVertical: space.xs,
    paddingHorizontal: space.sm,
    borderRadius: radii.md,
    borderWidth: 2,
    borderColor: colors.goldLip,
    backgroundColor: lighten(colors.gold, 0.75)
  },
  setMedal: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.gold
  },
  setBadgeWords: {
    flex: 1,
    minWidth: 0
  },
  setBadgeEyebrow: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: darken(colors.gold, 0.45)
  },
  setBadgeTitle: {
    fontFamily: fonts.displayHeavy,
    fontSize: 16,
    color: colors.ink
  },
  quests: {
    alignSelf: "stretch",
    marginTop: space.sm,
    gap: space.xs
  },
  questPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.xs,
    alignSelf: "center",
    maxWidth: "100%",
    paddingVertical: 6,
    paddingHorizontal: space.md,
    borderRadius: radii.pill,
    backgroundColor: lighten(colors.gold, 0.8),
    borderWidth: 2,
    borderColor: lighten(colors.gold, 0.4)
  },
  questPillText: {
    flexShrink: 1,
    fontFamily: fonts.bodyHeavy,
    fontSize: 14,
    color: darken(colors.gold, 0.45)
  },
  recapStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: radii.pill,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.line
  },
  recapStatText: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 15,
    lineHeight: 20,
    color: colors.ink
  },
  recapCard: {
    marginTop: space.md,
    padding: space.md,
    borderRadius: radii.md,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.line
  },
  recapTitle: {
    fontFamily: fonts.displayHeavy,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.6,
    color: colors.inkSoft,
    textTransform: "uppercase",
    marginBottom: space.sm
  },
  recapRow: {},
  recapRowGap: {
    marginTop: space.sm,
    paddingTop: space.sm,
    borderTopWidth: StyleSheet.hairlineWidth * 2,
    borderTopColor: colors.line
  },
  recapQuestion: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 20,
    color: colors.inkSoft
  },
  recapAnswer: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 16,
    lineHeight: 22,
    color: darken(colors.correctInk, 0.12)
  },
  recapAnswerMissed: {
    color: darken(colors.flame, 0.35)
  }
});
