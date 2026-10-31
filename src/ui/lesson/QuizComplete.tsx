import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { withHonorifics } from "../ArabicText";
import { Confetti } from "../Confetti";
import { CountUp } from "../CountUp";
import { GameButton } from "../GameButton";
import { Icon, type IconName } from "../Icon";
import { Mascot } from "../Mascot";
import { PopIn } from "../PopIn";
import { playUi } from "../sound";
import { Tappable } from "../Tappable";
import { colors, darken, fonts, lighten, radii, space } from "../theme";
import { LessonBottomBar } from "./LessonHeader";
import { useScrollMore } from "./ScrollHint";
import { quizGrade, type QuizGrade } from "../../services/quizzes";
import { t } from "../../i18n";

export type QuizCompleteProps = {
  /** The quiz's name ("Sahabah quiz", a unit's name). */
  title: string;
  correct: number;
  total: number;
  percent: number;
  /** The best score before this try; unset on a first try. */
  previousBest?: number;
  newBest?: boolean;
  xp: number;
  gems?: number;
  /** Units the misses came from, most first: a tap opens that unit on the path. */
  goOver?: { id: string; title: string }[];
  mascotVariant: string;
  accent: string;
  onContinue: () => void;
  /** NEW QUIZ: the same quiz again, with other questions. */
  onRetake?: () => void;
  onGoOver?: (unitId: string) => void;
  playSounds?: boolean;
  bottomInset?: number;
};

const HEADLINES: Record<QuizGrade, string> = {
  perfect: "Perfect score!",
  strong: "You know a lot!",
  growing: "Nice work!",
  starting: "Good start!"
};

const RING: Record<QuizGrade, string> = {
  perfect: colors.gold,
  strong: colors.green,
  growing: colors.gem,
  starting: colors.flame
};

const HEADLINE_INK = darken(colors.goldLip, 0.2);
const GOLD_INK = darken(colors.goldLip, 0.45);

function Pill({ icon, label, face, ink, delay, testID }: { icon: IconName; label: string; face: string; ink: string; delay: number; testID: string }) {
  return (
    <PopIn delay={delay} style={[styles.pill, { backgroundColor: face }]}>
      <View style={styles.pillRow} testID={testID}>
        <Icon name={icon} size={18} />
        <Text style={[styles.pillText, { color: ink }]}>{label}</Text>
      </View>
    </PopIn>
  );
}

/** A quiz's result: the score as a big percent, how it reads, the best so far, and the units to go over. */
export function QuizComplete({
  title,
  correct,
  total,
  percent,
  previousBest,
  newBest,
  xp,
  gems,
  goOver = [],
  mascotVariant,
  accent,
  onContinue,
  onRetake,
  onGoOver,
  playSounds = true,
  bottomInset
}: QuizCompleteProps) {
  const grade = quizGrade(percent);
  const ring = RING[grade];
  const { height } = useWindowDimensions();
  const short = height > 0 && height < 640;
  const { ref: scrollRef, scrollProps, more, scrollDown } = useScrollMore();
  const cheer = grade === "perfect" || grade === "strong";

  useEffect(() => {
    if (!playSounds) {
      return undefined;
    }
    playUi(cheer ? "lesson_complete" : "unlock");
    const xpTimer = xp > 0 ? setTimeout(() => playUi("xp"), 1300) : undefined;
    return () => {
      if (xpTimer) clearTimeout(xpTimer);
    };
    // Sounds play once, when the screen opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playSounds]);

  return (
    <View style={styles.root} testID="quiz-complete">
      <ScrollView ref={scrollRef} style={styles.scroll} contentContainerStyle={[styles.content, short ? styles.contentShort : null]} {...scrollProps}>
        <Mascot variant={mascotVariant} mood={cheer ? "cheer" : "happy"} accent={accent} size={short ? 84 : 110} />
        <PopIn delay={120}>
          <Text style={styles.headline} accessibilityRole="header" testID="quiz-headline">
            {t(HEADLINES[grade])}
          </Text>
        </PopIn>
        <Text style={styles.title}>{withHonorifics(title)}</Text>

        <PopIn delay={300} from="scale">
          <View
            style={[styles.ring, short ? styles.ringShort : null, { borderColor: ring, backgroundColor: lighten(ring, 0.88) }]}
            accessibilityLabel={t("{correct} of {total} right", { correct, total })}
            testID="quiz-score"
          >
            <View style={styles.percentRow}>
              <CountUp value={percent} duration={900} style={[styles.percent, { color: darken(ring, 0.35) }]} />
              <Text style={[styles.percentSign, { color: darken(ring, 0.35) }]}>%</Text>
            </View>
            <Text style={styles.right} testID="quiz-right">
              {t("{correct} of {total} right", { correct, total })}
            </Text>
          </View>
        </PopIn>

        <View style={styles.pills}>
          {newBest ? (
            <Pill icon="crown" label={t("New best!")} face={lighten(colors.gold, 0.7)} ink={GOLD_INK} delay={700} testID="quiz-new-best" />
          ) : previousBest !== undefined ? (
            <Pill icon="trophy" label={t("Best: {percent}%", { percent: previousBest })} face={colors.mist} ink={colors.ink} delay={700} testID="quiz-best" />
          ) : null}
          {xp > 0 ? <Pill icon="bolt" label={`+${t("{count} XP", { count: xp })}`} face={lighten(colors.gold, 0.7)} ink={GOLD_INK} delay={820} testID="quiz-xp" /> : null}
          {gems ? <Pill icon="gem" label={t("+{count} gems", { count: gems })} face={lighten(colors.gem, 0.85)} ink={colors.gemLip} delay={940} testID="quiz-gems" /> : null}
        </View>

        {goOver.length ? (
          <PopIn delay={1000} style={styles.goOver}>
            <Text style={styles.goOverTitle}>{t("Go over")}</Text>
            <View style={styles.goOverRow}>
              {goOver.slice(0, 3).map((unit) => (
                <Tappable
                  key={unit.id}
                  onPress={onGoOver ? () => onGoOver(unit.id) : undefined}
                  sound="node_tap"
                  pressScale={0.95}
                  accessibilityLabel={unit.title}
                  style={styles.chip}
                  testID={`quiz-go-over-${unit.id}`}
                >
                  <Icon name="book" size={18} />
                  <Text style={styles.chipText} numberOfLines={2}>
                    {withHonorifics(unit.title)}
                  </Text>
                </Tappable>
              ))}
            </View>
          </PopIn>
        ) : null}
      </ScrollView>

      <LessonBottomBar bottomInset={bottomInset} scrollHint={{ visible: more, onPress: scrollDown }}>
        <GameButton label={t("Continue")} fullWidth onPress={onContinue} testID="quiz-continue" />
        {onRetake ? (
          <GameButton label={t("New quiz")} variant="ghost" color={colors.inkSoft} fullWidth onPress={onRetake} style={styles.ghost} testID="quiz-retake" />
        ) : null}
      </LessonBottomBar>

      <Confetti active={cheer} />
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
    fontSize: 32,
    lineHeight: 40,
    color: HEADLINE_INK,
    textAlign: "center",
    marginTop: space.md
  },
  title: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 16,
    lineHeight: 22,
    color: colors.inkSoft,
    textAlign: "center",
    maxWidth: "100%"
  },
  ring: {
    width: 168,
    height: 168,
    borderRadius: 84,
    borderWidth: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: space.lg
  },
  ringShort: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 8
  },
  // The number reads left to right in every language, so right to left it is not drawn "% 80".
  percentRow: {
    flexDirection: "row",
    alignItems: "baseline",
    direction: "ltr"
  },
  percent: {
    fontFamily: fonts.displayHeavy,
    fontSize: 44,
    lineHeight: 52
  },
  percentSign: {
    fontFamily: fonts.displayHeavy,
    fontSize: 24,
    lineHeight: 52,
    marginStart: 2
  },
  right: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 14,
    lineHeight: 18,
    color: colors.inkSoft,
    textAlign: "center",
    paddingHorizontal: 8
  },
  pills: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: space.lg
  },
  pill: {
    borderRadius: radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 5,
    margin: space.xs,
    maxWidth: "100%"
  },
  pillRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  pillText: {
    marginStart: 6,
    flexShrink: 1,
    fontFamily: fonts.bodyHeavy,
    fontSize: 15,
    lineHeight: 20
  },
  goOver: {
    alignSelf: "stretch",
    alignItems: "center",
    marginTop: space.lg
  },
  goOverTitle: {
    fontFamily: fonts.displayHeavy,
    fontSize: 16,
    lineHeight: 22,
    color: colors.ink,
    marginBottom: space.xs
  },
  goOverRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    maxWidth: "100%",
    margin: space.xs,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: colors.line,
    borderBottomColor: colors.lineLip,
    backgroundColor: colors.white
  },
  chipText: {
    flexShrink: 1,
    fontFamily: fonts.bodyHeavy,
    fontSize: 15,
    lineHeight: 20,
    color: colors.ink
  },
  ghost: {
    marginTop: space.xs
  }
});
