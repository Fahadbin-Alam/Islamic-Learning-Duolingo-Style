import React, { useState } from "react";
import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { getTopicArabic } from "../../data/arabicTerms";
import type { UiStrings } from "../../i18n";
import { translateStudyText } from "../../services/contentLocalization";
import { getLearnerLevel } from "../../services/foundationAssessment";
import type { LearnerProfile, SupportedLanguage, UserProfile } from "../../types";
import { ArabicText } from "../ArabicText";
import { GameButton } from "../GameButton";
import { Icon, type IconName } from "../Icon";
import { Mascot } from "../Mascot";
import { PopIn, useShake } from "../PopIn";
import { SpeechBubble } from "../SpeechBubble";
import { Tappable } from "../Tappable";
import { colors, darken, fonts, lighten, radii, text, topicPalette } from "../theme";

export type PracticeHubProps = {
  user: UserProfile;
  learnerProfile: LearnerProfile;
  language: SupportedLanguage;
  strings: UiStrings;
  onStartPlacement: () => void;
  onStartReview: () => void;
  onStartDailyChallenge: () => void;
  onGoFoundation: () => void;
  /** Tabs replace back buttons; kept so the old call site still type-checks. */
  onBack?: () => void;
  /** Mascot variant ('hijabi' | 'muslim_man' | 'girl' | 'boy'). */
  mascotVariant?: string;
  /** The topic accent the path uses: the mascot's clothes and the level check's color, so the mascot looks the same everywhere. */
  accent?: string;
};

function isToday(value: string | undefined, now = new Date()) {
  if (!value) return false;
  const then = new Date(value);
  return (
    then.getFullYear() === now.getFullYear() && then.getMonth() === now.getMonth() && then.getDate() === now.getDate()
  );
}

/** Two chasing arrows: review has its own icon so it never reads as hearts (lives). */
function ReviewIcon({ size = 30, color = colors.gem }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M19.4 9.2A7.8 7.8 0 0 0 5.2 7.4" stroke={color} strokeWidth={3} strokeLinecap="round" fill="none" />
      <Path d="M4.6 14.8a7.8 7.8 0 0 0 14.2 1.8" stroke={darken(color, 0.15)} strokeWidth={3} strokeLinecap="round" fill="none" />
      <Path d="M3.2 3.6v5.2h5.2z" fill={color} stroke={color} strokeWidth={1.6} strokeLinejoin="round" />
      <Path d="M20.8 20.4v-5.2h-5.2z" fill={darken(color, 0.15)} stroke={darken(color, 0.15)} strokeWidth={1.6} strokeLinejoin="round" />
    </Svg>
  );
}

type Glyph = { icon: IconName } | { review: true };

function Glyph({ glyph, size, color }: { glyph: Glyph; size: number; color?: string }) {
  return "review" in glyph ? <ReviewIcon size={size} color={color} /> : <Icon name={glyph.icon} size={size} color={color} />;
}

function CornerBadge({ value, done, color }: { value?: string; done?: boolean; color: string }) {
  if (!value && !done) return null;
  return (
    <View style={[styles.badge, { backgroundColor: done ? colors.green : color }]}>
      {done ? <Icon name="check" size={14} color={colors.white} /> : <Text style={styles.badgeText}>{value}</Text>}
    </View>
  );
}

type HeroProps = {
  tint: string;
  glyph: Glyph;
  title: string;
  arabic?: string;
  button: string;
  buttonVariant: "primary" | "secondary";
  done?: boolean;
  onPress: () => void;
  testID: string;
};

/** The one big card: the thing to do next. */
function HeroCard({ tint, glyph, title, arabic, button, buttonVariant, done, onPress, testID }: HeroProps) {
  const palette = topicPalette(tint);
  return (
    <PopIn from="scale">
      <View style={[styles.hero, { backgroundColor: palette.light, borderColor: palette.soft, borderBottomColor: lighten(tint, 0.35) }]} testID={testID}>
        <View style={styles.heroRow}>
          <View style={[styles.heroIcon, { backgroundColor: colors.white, borderColor: palette.soft }]}>
            <Glyph glyph={glyph} size={44} />
            <CornerBadge done={done} color={tint} />
          </View>
          <View style={styles.heroText}>
            <Text style={styles.heroTitle} numberOfLines={2}>
              {title}
            </Text>
            {arabic ? (
              <ArabicText size={20} weight="bold" color={palette.ink} align="left">
                {arabic}
              </ArabicText>
            ) : null}
          </View>
        </View>
        <GameButton label={button} variant={buttonVariant} fullWidth onPress={onPress} testID={`${testID}-button`} />
      </View>
    </PopIn>
  );
}

type TileProps = {
  tint: string;
  glyph: Glyph;
  label: string;
  badge?: string;
  done?: boolean;
  /** Grey tile with nothing to start: a tap only wiggles it (and still plays the tap sound). */
  resting?: boolean;
  onPress?: () => void;
  delay: number;
  testID: string;
};

/** Small square tile: icon plus one word. A resting tile is grey and wiggles when tapped. */
function SmallTile({ tint, glyph, label, badge, done, resting, onPress, delay, testID }: TileProps) {
  const { style: shakeStyle, shake } = useShake(6);
  return (
    <PopIn delay={delay} from="up" style={styles.tileSlot}>
      <Animated.View style={[styles.tileShake, resting ? shakeStyle : null]}>
        <Tappable
          onPress={() => {
            if (resting) shake();
            onPress?.();
          }}
          style={[styles.tile, resting ? styles.tileResting : null]}
          testID={testID}
          accessibilityLabel={badge ? `${label}, ${badge}` : label}
          pressScale={0.95}
        >
          <View style={[styles.tileIcon, { backgroundColor: resting ? colors.locked : lighten(tint, 0.85) }]}>
            <Glyph glyph={glyph} size={34} color={resting ? colors.lockedLip : undefined} />
            <CornerBadge value={badge} done={done} color={darken(tint, 0.1)} />
          </View>
          <Text style={[styles.tileLabel, resting ? styles.tileLabelResting : null]} numberOfLines={2}>
            {label}
          </Text>
        </Tappable>
      </Animated.View>
    </PopIn>
  );
}

/** Practice tab: one hero card for the next step, two small tiles, and the basics path. */
export function PracticeHub({
  learnerProfile,
  language,
  onStartPlacement,
  onStartReview,
  onStartDailyChallenge,
  onGoFoundation,
  mascotVariant = "hijabi",
  // The mascot's own default, so it matches the other screens when no accent is passed.
  accent = colors.green
}: PracticeHubProps) {
  const t = (value: string) => translateStudyText(value, language);
  const reviewCount = learnerProfile.needs_review_question_ids.length;
  const weakCount = learnerProfile.weak_areas.length;
  const hasReview = reviewCount > 0 || weakCount > 0;
  const placed = learnerProfile.assessmentCompleted;
  const dailyDone = isToday(learnerProfile.lastDailyChallengeAt);
  const basics = getTopicArabic("foundation");
  // Tapping the grey review tile makes the mascot say why it is resting.
  const [restNote, setRestNote] = useState(false);
  const bubble = restNote ? "No mistakes yet!" : placed ? "Let's sharpen what you know!" : "Let's find your level!";

  const reviewTile = hasReview ? (
    <SmallTile
      testID="practice-review"
      tint={colors.gem}
      glyph={{ review: true }}
      label={t("Review")}
      badge={reviewCount > 0 ? String(reviewCount) : undefined}
      onPress={onStartReview}
      delay={120}
    />
  ) : (
    <SmallTile testID="practice-review" tint={colors.gem} glyph={{ review: true }} label={t("Review")} resting onPress={() => setRestNote(true)} delay={120} />
  );

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} testID="practice-hub">
      <View style={styles.titleRow}>
        <Text style={styles.title} numberOfLines={1}>
          {t("Practice")}
        </Text>
        {placed ? (
          <View style={styles.levelPill} accessibilityLabel={`${t("Level")} ${getLearnerLevel(learnerProfile.readiness_label)}`} testID="practice-level">
            <Icon name="star8" size={18} />
            <Text style={styles.levelText} numberOfLines={1}>
              {t("Level")} {getLearnerLevel(learnerProfile.readiness_label)}
            </Text>
          </View>
        ) : null}
      </View>

      <View style={styles.mascotRow}>
        <Mascot variant={mascotVariant} mood={placed || restNote ? "cheer" : "happy"} size={68} accent={accent} />
        <PopIn key={bubble} from="scale" style={styles.bubbleWrap}>
          <SpeechBubble>{t(bubble)}</SpeechBubble>
        </PopIn>
      </View>

      {placed ? (
        <HeroCard
          testID="practice-daily"
          tint={colors.gold}
          glyph={{ icon: "bolt" }}
          title={t("Daily challenge")}
          button={t(dailyDone ? "Play again" : "Play")}
          buttonVariant={dailyDone ? "secondary" : "primary"}
          done={dailyDone}
          onPress={onStartDailyChallenge}
        />
      ) : (
        <HeroCard
          testID="practice-placement"
          tint={accent}
          glyph={{ icon: "star8" }}
          title={t("Level check")}
          button={t("Start")}
          buttonVariant="primary"
          onPress={onStartPlacement}
        />
      )}

      <View style={styles.tiles}>
        {placed ? (
          <>
            {reviewTile}
            <SmallTile testID="practice-placement" tint={accent} glyph={{ icon: "star8" }} label={t("Retake")} onPress={onStartPlacement} delay={200} />
          </>
        ) : (
          <>
            <SmallTile testID="practice-daily" tint={colors.gold} glyph={{ icon: "bolt" }} label={t("Daily")} done={dailyDone} onPress={onStartDailyChallenge} delay={60} />
            {reviewTile}
          </>
        )}
      </View>

      <PopIn delay={260} from="up">
        <Tappable onPress={onGoFoundation} style={styles.basicsRow} testID="practice-basics" accessibilityLabel={t("Basics")}>
          <View style={[styles.basicsIcon, { backgroundColor: lighten(colors.green, 0.85) }]}>
            <Icon name="crescent" size={28} />
          </View>
          <View style={styles.basicsText}>
            <Text style={styles.basicsTitle} numberOfLines={1}>
              {t("Basics")}
            </Text>
            {basics ? (
              <ArabicText size={20} weight="bold" color={colors.correctInk} align="left">
                {basics.ar}
              </ArabicText>
            ) : null}
          </View>
          <Icon name="chevronRight" size={24} color={colors.lineLip} />
        </Tappable>
      </PopIn>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.snow
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8
  },
  title: {
    ...text.h1,
    flexShrink: 1,
    marginRight: "auto"
  },
  levelPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: radii.pill,
    backgroundColor: colors.mist,
    borderWidth: 2,
    borderColor: colors.line,
    maxWidth: "100%",
    flexShrink: 1
  },
  levelText: {
    fontFamily: fonts.display,
    fontSize: 14,
    lineHeight: 20,
    color: colors.ink,
    flexShrink: 1
  },
  mascotRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    marginBottom: 10
  },
  bubbleWrap: {
    flex: 1,
    minWidth: 0,
    marginLeft: 6
  },
  hero: {
    borderRadius: radii.xl,
    borderWidth: 2,
    borderBottomWidth: 6,
    padding: 16,
    gap: 14
  },
  heroRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16
  },
  heroIcon: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center"
  },
  heroText: {
    flex: 1,
    minWidth: 0,
    alignItems: "flex-start"
  },
  heroTitle: {
    ...text.h2,
    flexShrink: 1
  },
  tiles: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12
  },
  tileSlot: {
    flex: 1,
    flexBasis: 0,
    minWidth: 0
  },
  tileShake: {
    flex: 1
  },
  tile: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    minHeight: 128,
    paddingHorizontal: 8,
    paddingVertical: 14,
    borderRadius: radii.tile,
    borderWidth: 2,
    borderBottomWidth: 5,
    borderColor: colors.line,
    borderBottomColor: colors.lineLip,
    backgroundColor: colors.white
  },
  tileResting: {
    backgroundColor: colors.mist,
    borderBottomWidth: 3
  },
  tileIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center"
  },
  tileLabel: {
    fontFamily: fonts.displayHeavy,
    fontSize: 18,
    lineHeight: 22,
    color: colors.ink,
    textAlign: "center",
    flexShrink: 1
  },
  tileLabelResting: {
    color: colors.inkSoft
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    minWidth: 26,
    height: 26,
    paddingHorizontal: 6,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: colors.white,
    alignItems: "center",
    justifyContent: "center"
  },
  badgeText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 14,
    lineHeight: 18,
    color: colors.white
  },
  basicsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radii.tile,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: colors.line,
    borderBottomColor: colors.lineLip,
    backgroundColor: colors.white
  },
  basicsIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center"
  },
  basicsText: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    columnGap: 10
  },
  // Arabic sits a size above the English next to it (20 over 17).
  basicsTitle: {
    ...text.h3,
    fontSize: 17,
    lineHeight: 22,
    flexShrink: 1
  }
});
