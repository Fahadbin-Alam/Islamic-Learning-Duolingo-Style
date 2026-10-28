import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LEAGUES, TOP_TIER, leagueAt, leagueDaysLeft, leagueZone, type LeagueId } from "../../services/leagues";
import type { LeagueResult, LeagueState } from "../../types";
import { Confetti } from "../Confetti";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { PopIn } from "../PopIn";
import { ProgressBar } from "../ProgressBar";
import { Sheet } from "../Sheet";
import { playUi } from "../sound";
import { colors, darken, fonts, lighten, radii, space, text } from "../theme";
import { formatNumber } from "./FormattedCount";
import { useBackToClose } from "./sheetParts";
import { t } from "../../i18n";

export function leagueName(id: LeagueId) {
  switch (id) {
    case "bronze":
      return t("Bronze League");
    case "silver":
      return t("Silver League");
    case "gold":
      return t("Gold League");
    case "pearl":
      return t("Pearl League");
    case "ruby":
      return t("Ruby League");
    case "emerald":
      return t("Emerald League");
    default:
      return t("Diamond League");
  }
}

/** A league's shield in its own color. */
export function LeagueBadge({ tier, size = 44, dim = false, testID }: { tier: number; size?: number; dim?: boolean; testID?: string }) {
  const league = leagueAt(tier);
  return (
    <View testID={testID} accessibilityLabel={leagueName(league.id)}>
      <Icon name="shield" size={size} color={dim ? colors.locked : league.color} detailColor={dim ? colors.lockedLip : lighten(league.color, 0.45)} />
    </View>
  );
}

/** What this week's XP means so far, in a few words. */
function zoneLine(state: LeagueState) {
  const league = leagueAt(state.tier);
  const zone = leagueZone(state);
  if (zone === "up") return t("You're moving up!");
  if (zone === "down") return t("{count} XP to stay", { count: formatNumber(league.keep - state.xp) });
  if (league.up === undefined) return t("You're on top!");
  return t("{count} XP to move up", { count: formatNumber(league.up - state.xp) });
}

export type LeagueCardProps = {
  league: LeagueState;
  now?: Date;
};

/** The learner's league this week: the ladder, their XP and what it takes to move up. */
export function LeagueCard({ league: state, now = new Date() }: LeagueCardProps) {
  const league = leagueAt(state.tier);
  const zone = leagueZone(state);
  const goal = league.up ?? league.keep;
  const days = leagueDaysLeft(now);
  const ink = darken(league.color, 0.45);

  return (
    <View style={[styles.card, { borderColor: lighten(league.color, 0.5), borderBottomColor: league.color }]} testID="league-card">
      <View style={styles.head}>
        <LeagueBadge tier={state.tier} size={52} />
        <View style={styles.headMain}>
          <Text style={[styles.title, { color: ink }]} numberOfLines={1} testID="league-title">
            {leagueName(league.id)}
          </Text>
          <Text style={styles.days} numberOfLines={1} testID="league-days">
            {days === 1 ? t("Ends today") : t("{count} days left", { count: days })}
          </Text>
        </View>
        <View style={styles.xpPill} accessibilityLabel={t("{count} XP this week", { count: state.xp })}>
          <Icon name="bolt" size={18} />
          <Text style={styles.xpText} numberOfLines={1} testID="league-xp">
            {formatNumber(state.xp)}
          </Text>
        </View>
      </View>

      <View style={styles.ladder} testID="league-ladder">
        {LEAGUES.map((item, index) => (
          <LeagueBadge key={item.id} tier={index} size={index === state.tier ? 30 : 22} dim={index > state.tier} testID={index === state.tier ? "league-ladder-current" : undefined} />
        ))}
      </View>

      <ProgressBar progress={goal > 0 ? state.xp / goal : 1} color={zone === "down" ? colors.flame : zone === "up" ? colors.green : league.color} height={14} testID="league-progress" />
      <Text style={[styles.zone, zone === "down" ? styles.zoneDown : zone === "up" ? styles.zoneUp : null]} numberOfLines={2} testID="league-zone">
        {zoneLine(state)}
      </Text>
    </View>
  );
}

export type LeagueResultSheetProps = {
  result?: LeagueResult;
  onClose: () => void;
};

/** Shown once after a week ends: up (with confetti), stayed, or down (kindly). */
export function LeagueResultSheet({ result, onClose }: LeagueResultSheetProps) {
  const visible = result !== undefined;
  useBackToClose(visible, onClose);
  const up = Boolean(result && result.to > result.from);
  const down = Boolean(result && result.to < result.from);

  useEffect(() => {
    if (visible) playUi(up ? "unlock" : "soft_ui");
  }, [up, visible]);

  const title = up ? t("You moved up!") : down ? t("New week, new start!") : t("You stayed!");
  const league = result ? leagueAt(result.to) : LEAGUES[0];
  const line = down
    ? t("Earn {count} XP this week to move back up!", { count: formatNumber(league.up ?? 0) })
    : result && result.to === TOP_TIER && up
      ? t("The top league!")
      : t("{count} XP last week", { count: formatNumber(result?.xp ?? 0) });

  return (
    <Sheet visible={visible} onClose={onClose} testID="league-result">
      {up ? <Confetti active={visible} count={40} /> : null}
      {result ? (
        <View style={styles.result}>
          <PopIn key={result.weekStart} delay={80}>
            <LeagueBadge tier={result.to} size={96} />
          </PopIn>
          <Text style={styles.resultTitle} accessibilityRole="header" testID="league-result-title">
            {title}
          </Text>
          <Text style={[styles.resultLeague, { color: darken(league.color, 0.45) }]} testID="league-result-league">
            {leagueName(league.id)}
          </Text>
          <Text style={styles.resultLine} testID="league-result-line">
            {line}
          </Text>
          <GameButton label={t("Got it")} fullWidth onPress={onClose} testID="league-result-close" />
        </View>
      ) : null}
    </Sheet>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: space.md,
    padding: 14,
    marginBottom: 16,
    borderRadius: radii.tile,
    borderWidth: 2,
    borderBottomWidth: 4,
    backgroundColor: colors.white
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  headMain: {
    flex: 1,
    minWidth: 0
  },
  title: {
    fontFamily: fonts.displayHeavy,
    fontSize: 20,
    lineHeight: 26
  },
  days: {
    ...text.tiny,
    fontSize: 13,
    lineHeight: 17
  },
  xpPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: radii.pill,
    backgroundColor: lighten(colors.gold, 0.78)
  },
  xpText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 16,
    lineHeight: 22,
    color: darken(colors.gold, 0.55)
  },
  ladder: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4
  },
  zone: {
    fontFamily: fonts.display,
    fontSize: 15,
    lineHeight: 20,
    color: colors.inkSoft,
    textAlign: "center"
  },
  zoneUp: {
    color: colors.correctInk
  },
  zoneDown: {
    color: darken(colors.flame, 0.25)
  },
  result: {
    alignItems: "center",
    gap: space.md,
    paddingBottom: space.xs
  },
  resultTitle: {
    fontFamily: fonts.displayHeavy,
    fontSize: 26,
    lineHeight: 32,
    color: colors.ink,
    textAlign: "center"
  },
  resultLeague: {
    fontFamily: fonts.displayHeavy,
    fontSize: 20,
    lineHeight: 26,
    textAlign: "center"
  },
  resultLine: {
    ...text.bodyBold,
    textAlign: "center"
  }
});
