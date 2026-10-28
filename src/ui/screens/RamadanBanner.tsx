import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { RamadanSeason } from "../../data/ramadanCalendar";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { ProgressBar } from "../ProgressBar";
import { colors, darken, fonts, lighten, radii, space, text } from "../theme";
import { formatNumber } from "./FormattedCount";
import { t } from "../../i18n";

export type RamadanBannerProps = {
  season: RamadanSeason;
  /** The Ramadan topic's color. */
  accent: string;
  /** Days in a row this Ramadan with a Ramadan lesson done (ramadanStreak). */
  streak: number;
  doneToday: boolean;
  /** Circles of the 30-day path done, and how many it has. */
  done: number;
  total: number;
  /** Plays the next Ramadan circle; not given once the whole path is done. */
  onPlay?: () => void;
};

/**
 * Ramadan mode, at the top of the Learn path: in the two weeks before Ramadan, how many days are left; during
 * Ramadan, the day of the month, the Ramadan streak and a button for today's lesson.
 */
export function RamadanBanner({ season, accent, streak, doneToday, done, total, onPlay }: RamadanBannerProps) {
  const ink = darken(accent, 0.25);
  const inRamadan = season.phase === "ramadan";
  const title = inRamadan
    ? t("Ramadan day {day}", { day: formatNumber(season.day) })
    : season.daysLeft === 1
      ? t("Ramadan starts tomorrow!")
      : t("Ramadan in {count} days", { count: formatNumber(season.daysLeft) });
  const line = !inRamadan ? t("Get ready with the 30-day path.") : doneToday ? t("Today's lesson is done!") : t("Today's lesson is ready.");

  return (
    <View style={[styles.card, { backgroundColor: lighten(accent, 0.88), borderColor: lighten(accent, 0.6) }]} testID="ramadan-banner">
      <View style={styles.row}>
        <View style={[styles.emblem, { backgroundColor: accent, borderBottomColor: darken(accent) }]}>
          <Icon name="dua" size={30} />
        </View>
        <View style={styles.words}>
          <Text style={[styles.title, { color: ink }]} accessibilityRole="header" testID="ramadan-banner-title">
            {title}
          </Text>
          <Text style={styles.line} testID="ramadan-banner-line">
            {line}
          </Text>
        </View>
      </View>
      {inRamadan ? (
        <View style={styles.row}>
          <View style={styles.streak} testID="ramadan-streak">
            <Icon name="flame" size={22} color={streak > 0 ? undefined : colors.lockedLip} />
            <Text style={[styles.streakText, { color: streak > 0 ? darken(colors.flame, 0.25) : colors.inkSoft }]}>{formatNumber(streak)}</Text>
          </View>
          <ProgressBar progress={total > 0 ? done / total : 0} color={accent} height={10} style={styles.bar} />
          <Text style={styles.count}>{`${formatNumber(done)}/${formatNumber(total)}`}</Text>
        </View>
      ) : null}
      {onPlay && !(inRamadan && doneToday) ? (
        <GameButton
          label={inRamadan ? t("Today's lesson") : t("Start now")}
          color={accent}
          size="md"
          fullWidth
          sound="node_tap"
          onPress={onPlay}
          testID="ramadan-play"
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: space.lg,
    marginTop: space.md,
    marginBottom: space.sm,
    padding: space.md,
    gap: space.md,
    borderRadius: radii.lg,
    borderWidth: 2
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md
  },
  emblem: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderBottomWidth: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  words: {
    flex: 1,
    minWidth: 0
  },
  title: {
    fontFamily: fonts.displayHeavy,
    fontSize: 20,
    lineHeight: 26
  },
  line: {
    ...text.small,
    color: colors.ink
  },
  streak: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.xs
  },
  streakText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 18,
    lineHeight: 22
  },
  bar: {
    flex: 1
  },
  count: {
    ...text.tiny
  }
});
