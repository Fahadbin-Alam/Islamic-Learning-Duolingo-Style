import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SECRET_LESSONS } from "../../data/secretLessons";
import { ARENAS, arenaFor, arenaIndex, isProfileIcon, trophiesToNextArena, ummahOf, type UmmahRankRow, type UmmahRankings } from "../../services/ummah";
import type { UserProfile } from "../../types";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { Mascot } from "../Mascot";
import { PopIn } from "../PopIn";
import { ProgressBar } from "../ProgressBar";
import { Tappable } from "../Tappable";
import { colors, darken, fonts, lighten, radii, text } from "../theme";
import { formatNumber } from "./FormattedCount";
import { useGrownUpGate } from "./GrownUpGate";
import { SecretTap } from "./SecretTap";
import { t } from "../../i18n";

export function arenaName(index: number) {
  switch (ARENAS[index]?.id) {
    case "oasis":
      return t("Oasis Arena");
    case "palms":
      return t("Palm Grove Arena");
    case "lanterns":
      return t("Lantern Arena");
    case "stars":
      return t("Starry Night Arena");
    case "crescent":
      return t("Crescent Arena");
    case "legend":
      return t("Legend Arena");
    default:
      return t("Desert Arena");
  }
}

export type RankingsState =
  | { status: "idle" | "loading" }
  | { status: "ready"; rankings: UmmahRankings }
  | { status: "error" };

export type UmmahRanksProps = {
  user: UserProfile;
  rankings: RankingsState;
  /** No ranking server in this build: battles and arenas still work, the list says "coming soon". */
  unavailable?: boolean;
  /** Not signed in with an account the server knows. */
  signedOut?: boolean;
  /** A child's account: joining the ranking asks a grown-up first. */
  forChild?: boolean;
  onBattle: () => void;
  /** Opens the Friends page, where a friend can be asked to a battle. Missing without a server or an account. */
  onBattleFriend?: () => void;
  onJoin: (joined: boolean) => void;
  onNewNickname: () => void;
  onRefresh: () => void;
  onSignIn: () => void;
  onOpenSecrets: () => void;
  mascotVariant?: string;
  accent?: string;
};

/** A profile picture: a bought icon on a soft circle, or the first letter of a nickname. */
export function ProfileBadge({ icon, name, size = 40, color = colors.gem }: { icon?: string; name: string; size?: number; color?: string }) {
  return (
    <View style={[styles.badge, { width: size, height: size, borderRadius: size / 2, backgroundColor: isProfileIcon(icon) ? lighten(color, 0.82) : color, borderBottomColor: darken(color) }]}>
      {isProfileIcon(icon) ? (
        <Icon name={icon} size={Math.round(size * 0.62)} />
      ) : (
        <Text style={[styles.badgeText, { fontSize: Math.round(size * 0.45), lineHeight: Math.round(size * 0.58) }]} numberOfLines={1}>
          {(name.trim().charAt(0) || "?").toUpperCase()}
        </Text>
      )}
    </View>
  );
}

function RankRow({ row, index }: { row: UmmahRankRow; index: number }) {
  const medal = row.rank <= 3 ? [colors.gold, lighten(colors.inkSoft, 0.5), lighten(colors.flame, 0.35)][row.rank - 1] : undefined;
  return (
    <PopIn delay={Math.min(index, 6) * 60} from="up">
      <View style={[styles.row, row.you ? styles.rowMe : null]} testID={row.you ? "ummah-row-you" : `ummah-row-${row.rank}`}>
        <View style={[styles.rank, medal ? { backgroundColor: medal } : null]}>
          <Text style={styles.rankText} numberOfLines={1}>{formatNumber(row.rank)}</Text>
        </View>
        <ProfileBadge icon={row.icon} name={row.nickname} size={36} color={arenaFor(row.trophies).color} />
        <Text style={styles.rowName} numberOfLines={1}>
          {row.you ? t("{name} (you)", { name: row.nickname }) : row.nickname}
        </Text>
        <View style={styles.rowScore}>
          <Icon name="trophy" size={18} />
          <Text style={styles.rowScoreText} numberOfLines={1}>{formatNumber(row.trophies)}</Text>
        </View>
      </View>
    </PopIn>
  );
}

/** The Ummah "Ranks" page: the learner's arena and BATTLE, the ranking of everyone, and the secret lessons card. */
export function UmmahRanks({ user, rankings, unavailable, signedOut, forChild, onBattle, onBattleFriend, onJoin, onNewNickname, onRefresh, onSignIn, onOpenSecrets, mascotVariant = "muslim_man", accent = colors.green }: UmmahRanksProps) {
  const ummah = ummahOf(user);
  const at = arenaIndex(ummah.trophies);
  const arena = ARENAS[at];
  const toNext = trophiesToNextArena(ummah.trophies);
  const nextArena = ARENAS[at + 1];
  const ink = darken(arena.color, 0.45);
  const found = ummah.secrets?.length ?? 0;
  const { ask, gate } = useGrownUpGate();
  const join = () => (forChild ? ask(() => onJoin(true)) : onJoin(true));

  let list: React.ReactNode;
  if (unavailable) {
    list = <Text style={styles.note} testID="ummah-rank-soon">{t("The ranking of everyone is coming soon! Battle now to be ready.")}</Text>;
  } else if (signedOut) {
    list = (
      <View style={styles.listEmpty} testID="ummah-rank-signed-out">
        <Text style={styles.note}>{t("Sign in with Google or Apple to join the ranking.")}</Text>
        <GameButton label={t("Sign in")} fullWidth onPress={onSignIn} testID="ummah-sign-in" />
      </View>
    );
  } else if (!ummah.joined) {
    list = (
      <View style={styles.listEmpty} testID="ummah-join-card">
        <Text style={styles.note}>{t("Join to see where you rank in the whole Ummah. Others only see your nickname.")}</Text>
        <GameButton label={t("Join the ranking")} fullWidth onPress={join} testID="ummah-join" />
      </View>
    );
  } else if (rankings.status === "ready") {
    const me = rankings.rankings.me;
    const meShown = rankings.rankings.top.some((row) => row.you);
    list = (
      <View style={styles.list} testID="ummah-rank-list">
        {rankings.rankings.top.map((row, index) => (
          <RankRow key={`${row.rank}_${row.nickname}`} row={row} index={index} />
        ))}
        {me && !meShown ? (
          <>
            <Text style={styles.gap}>⋯</Text>
            <RankRow row={{ ...me, you: true }} index={rankings.rankings.top.length} />
          </>
        ) : null}
      </View>
    );
  } else if (rankings.status === "error") {
    list = (
      <View style={styles.listEmpty} testID="ummah-rank-error">
        <Text style={styles.note}>{t("Couldn't load the ranking.")}</Text>
        <GameButton label={t("Try again")} variant="secondary" fullWidth onPress={onRefresh} testID="ummah-rank-retry" />
      </View>
    );
  } else {
    list = <ActivityIndicator color={colors.green} size="large" style={styles.spinner} testID="ummah-rank-loading" />;
  }

  return (
    <View testID="ummah-ranks">
      <View style={[styles.arena, { borderColor: lighten(arena.color, 0.5), borderBottomColor: arena.color, backgroundColor: lighten(arena.color, 0.9) }]} testID="ummah-arena">
        <View style={styles.arenaHead}>
          <SecretTap spot="trophy">
            <View style={[styles.bigTrophy, { backgroundColor: lighten(arena.color, 0.7) }]}>
              <Icon name="trophy" size={56} />
            </View>
          </SecretTap>
          <View style={styles.arenaMain}>
            <Text style={[styles.arenaName, { color: ink }]} numberOfLines={2} testID="ummah-arena-name">
              {arenaName(at)}
            </Text>
            <View style={styles.trophyLine} accessibilityLabel={t("{count} trophies", { count: ummah.trophies })}>
              <Icon name="trophy" size={20} />
              <Text style={[styles.trophyCount, { color: ink }]} testID="ummah-trophies">{formatNumber(ummah.trophies)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.ladder}>
          {ARENAS.map((item, index) => (
            <View key={item.id} style={[styles.step, { backgroundColor: index <= arenaIndex(ummah.best) ? item.color : colors.locked }, index === at ? styles.stepNow : null]} />
          ))}
        </View>
        {toNext !== undefined && nextArena ? (
          <>
            <ProgressBar progress={(ummah.trophies - arena.trophies) / (nextArena.trophies - arena.trophies)} color={arena.color} height={12} />
            <Text style={styles.toNext} numberOfLines={2}>{t("{count} trophies to {name}", { count: formatNumber(toNext), name: arenaName(at + 1) })}</Text>
          </>
        ) : (
          <Text style={styles.toNext}>{t("You reached the top arena!")}</Text>
        )}
      </View>

      <View style={styles.battleRow}>
        <SecretTap spot="mascot">
          <Mascot variant={mascotVariant} mood="cheer" size={78} accent={accent} />
        </SecretTap>
        <View style={styles.battleMain}>
          <Text style={styles.battleLine} numberOfLines={2}>{t("5 hard questions. Get 4 right to win!")}</Text>
          <GameButton label={t("Battle")} icon="bolt" variant="gold" fullWidth onPress={onBattle} testID="ummah-battle" />
          {onBattleFriend ? <GameButton label={t("Battle a friend")} icon="people" variant="secondary" size="sm" fullWidth onPress={onBattleFriend} testID="ummah-battle-friend" /> : null}
        </View>
      </View>

      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>{t("Ummah ranking")}</Text>
        {ummah.joined && !unavailable && !signedOut ? (
          <Tappable onPress={onNewNickname} style={styles.nick} accessibilityLabel={t("New nickname")} testID="ummah-nickname">
            <Text style={styles.nickText} numberOfLines={1}>{ummah.nickname}</Text>
            <Icon name="repeat" size={16} />
          </Tappable>
        ) : null}
      </View>
      {list}
      {ummah.joined && !unavailable && !signedOut ? (
        <Tappable onPress={() => onJoin(false)} style={styles.leave} testID="ummah-leave">
          <Text style={styles.leaveText}>{t("Hide me from the ranking")}</Text>
        </Tappable>
      ) : null}

      {/* The lantern hides a secret itself, so it sits beside the card's button, not inside it. */}
      <View style={styles.secrets}>
        <SecretTap spot="lantern">
          <View style={styles.secretIcon}>
            <Icon name="lantern" size={34} />
          </View>
        </SecretTap>
        <Tappable onPress={onOpenSecrets} style={styles.secretMain} accessibilityLabel={t("Secret lessons, {count} of {total} found", { count: found, total: SECRET_LESSONS.length })} testID="ummah-secrets">
          <View style={styles.secretText}>
            <Text style={styles.secretTitle} numberOfLines={1}>{t("Secret lessons")}</Text>
            <Text style={styles.secretLine} numberOfLines={2}>{t("{count} of {total} found", { count: found, total: SECRET_LESSONS.length })}</Text>
          </View>
          <Icon name="chevronRight" size={20} color={colors.inkSoft} />
        </Tappable>
      </View>
      {gate}
    </View>
  );
}

const styles = StyleSheet.create({
  arena: {
    gap: 12,
    padding: 14,
    borderRadius: radii.tile,
    borderWidth: 2,
    borderBottomWidth: 4
  },
  arenaHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  bigTrophy: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  arenaMain: {
    flex: 1,
    minWidth: 0
  },
  arenaName: {
    fontFamily: fonts.displayHeavy,
    fontSize: 22,
    lineHeight: 28
  },
  trophyLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },
  trophyCount: {
    fontFamily: fonts.displayHeavy,
    fontSize: 20,
    lineHeight: 26
  },
  ladder: {
    flexDirection: "row",
    gap: 4
  },
  step: {
    flex: 1,
    height: 10,
    borderRadius: 5
  },
  stepNow: {
    height: 14,
    marginTop: -2,
    borderWidth: 2,
    borderColor: colors.white
  },
  toNext: {
    fontFamily: fonts.display,
    fontSize: 15,
    lineHeight: 20,
    color: colors.inkSoft,
    textAlign: "center"
  },
  battleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 14
  },
  battleMain: {
    flex: 1,
    minWidth: 0,
    gap: 8
  },
  battleLine: {
    ...text.bodyBold,
    fontSize: 15,
    lineHeight: 20
  },
  sectionHead: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 22,
    marginBottom: 10
  },
  sectionTitle: {
    ...text.h2,
    flexShrink: 1,
    marginEnd: "auto"
  },
  nick: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.pill,
    backgroundColor: lighten(colors.gem, 0.88),
    maxWidth: "100%"
  },
  nickText: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 14,
    lineHeight: 19,
    color: colors.gemLip,
    flexShrink: 1
  },
  list: {
    gap: 8
  },
  listEmpty: {
    gap: 12
  },
  note: {
    ...text.bodyBold,
    color: colors.inkSoft,
    textAlign: "center"
  },
  spinner: {
    marginVertical: 20
  },
  gap: {
    ...text.h2,
    textAlign: "center",
    color: colors.inkSoft
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: radii.tile,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: colors.line,
    borderBottomColor: colors.lineLip,
    backgroundColor: colors.white
  },
  rowMe: {
    backgroundColor: lighten(colors.gem, 0.88),
    borderColor: lighten(colors.gem, 0.45),
    borderBottomColor: colors.gem
  },
  rank: {
    minWidth: 30,
    height: 28,
    paddingHorizontal: 4,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center"
  },
  rankText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 15,
    lineHeight: 20,
    color: colors.ink
  },
  rowName: {
    flex: 1,
    minWidth: 0,
    fontFamily: fonts.displayHeavy,
    fontSize: 16,
    lineHeight: 21,
    color: colors.ink
  },
  rowScore: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2
  },
  rowScoreText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 17,
    lineHeight: 22,
    color: colors.goldLip
  },
  badge: {
    borderBottomWidth: 3,
    alignItems: "center",
    justifyContent: "center"
  },
  badgeText: {
    fontFamily: fonts.displayHeavy,
    color: colors.white
  },
  leave: {
    alignSelf: "center",
    minHeight: 40,
    justifyContent: "center",
    paddingHorizontal: 12,
    marginTop: 6
  },
  leaveText: {
    ...text.small,
    color: colors.inkSoft
  },
  secrets: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 20,
    padding: 12,
    borderRadius: radii.tile,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: lighten(colors.gold, 0.4),
    borderBottomColor: colors.gold,
    backgroundColor: lighten(colors.gold, 0.88)
  },
  secretIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white
  },
  secretMain: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    minHeight: 48
  },
  secretText: {
    flex: 1,
    minWidth: 0
  },
  secretTitle: {
    fontFamily: fonts.displayHeavy,
    fontSize: 18,
    lineHeight: 24,
    color: darken(colors.gold, 0.6)
  },
  secretLine: {
    ...text.small
  }
});
