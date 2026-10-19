import React from "react";
import { ScrollView, StyleSheet, Text, View, type AccessibilityRole, type AccessibilityState } from "react-native";
import { COURSE } from "../../data/course";
import type { UiStrings } from "../../i18n";
import type { LearnerProfile, UserProfile } from "../../types";
import { GameButton } from "../GameButton";
import { Icon, type IconName } from "../Icon";
import { Mascot } from "../Mascot";
import { PopIn } from "../PopIn";
import { Tappable } from "../Tappable";
import { colors, darken, fonts, lighten, radii, text } from "../theme";
import { FormattedCount } from "./FormattedCount";
import { SwitchTrack } from "./sheetParts";

export type ProfileViewProps = {
  user: UserProfile;
  strings: UiStrings;
  learnerProfile: LearnerProfile;
  onOpenSettings: () => void;
  /** Crew and Shop are bottom tabs now; kept optional so the old call site still type-checks. */
  onOpenCrew?: () => void;
  onOpenShop?: () => void;
  /** Tabs replace back buttons; kept so the old call site still type-checks. */
  onBack?: () => void;
  /** Shown for guests as SIGN UP, or LOG IN when hasSavedAccount. */
  onCreateAccount?: () => void;
  /**
   * This device has an account that logged out: the guest card says "Welcome back!" and LOG IN,
   * the same mode the account sheet opens in (openAccountPanel in src/TopicApp.tsx).
   */
  hasSavedAccount?: boolean;
  /** Sound row appears when onToggleSound is given. Default: user.soundEffectsEnabled !== false. */
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  /** Total stars. Default: sum of starsReward over user.completedNodeIds. */
  stars?: number;
  /** Avatar color (topic accent). Default green. */
  accent?: string;
  /** Mascot on the guest save card. */
  mascotVariant?: string;
};

const STARS_BY_NODE = new Map<string, number>(
  COURSE.sections.flatMap((section) => section.nodes.map((node) => [node.id, node.starsReward] as [string, number]))
);

export function countStars(completedNodeIds: string[]) {
  return completedNodeIds.reduce((sum, id) => sum + (STARS_BY_NODE.get(id) ?? 0), 0);
}

/** Gold text on white needs a darker gold to stay readable. */
const GOLD_INK = darken(colors.gold, 0.45);

function StatCard({ icon, value, label, color, testID }: { icon: IconName; value: number; label: string; color: string; testID: string }) {
  return (
    <View style={styles.stat} testID={testID}>
      <Icon name={icon} size={32} />
      <View style={styles.statText}>
        <FormattedCount value={value} compact style={[styles.statValue, { color }]} />
        <Text style={styles.statLabel} numberOfLines={1}>
          {label}
        </Text>
      </View>
    </View>
  );
}

type MenuRowProps = {
  icon: IconName;
  label: string;
  onPress: () => void;
  right?: React.ReactNode;
  testID: string;
  last?: boolean;
  accessibilityRole?: AccessibilityRole;
  accessibilityState?: AccessibilityState;
};

function MenuRow({ icon, label, onPress, right, testID, last, accessibilityRole, accessibilityState }: MenuRowProps) {
  return (
    <Tappable
      onPress={onPress}
      style={[styles.row, last ? null : styles.rowLine]}
      testID={testID}
      accessibilityLabel={label}
      accessibilityRole={accessibilityRole}
      accessibilityState={accessibilityState}
      pressScale={0.98}
    >
      <View style={styles.rowIcon}>
        <Icon name={icon} size={26} />
      </View>
      <Text style={styles.rowLabel} numberOfLines={1}>
        {label}
      </Text>
      {right ?? <Icon name="chevronRight" size={22} color={colors.lineLip} />}
    </Tappable>
  );
}

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || name;
}

/** Web ignores adjustsFontSizeToFit: initials are two letters; anything longer starts smaller. */
function initialsSize(initials: string) {
  return initials.length <= 2 ? null : styles.initialsLong;
}

/** Web ignores adjustsFontSizeToFit, so long names get a smaller size up front. */
function nameSize(name: string) {
  if (name.length <= 12) return { fontSize: 26, lineHeight: 32 };
  if (name.length <= 16) return { fontSize: 22, lineHeight: 28 };
  return { fontSize: 19, lineHeight: 25 };
}

/** Me tab: avatar, four stat cards, a save-progress card for guests, and Settings / Sound. */
export function ProfileView({
  user,
  strings,
  learnerProfile,
  onOpenSettings,
  onCreateAccount,
  hasSavedAccount = false,
  soundEnabled,
  onToggleSound,
  stars,
  accent = colors.green,
  mascotVariant = "hijabi"
}: ProfileViewProps) {
  const guest = !user.hasAccount;
  const sound = soundEnabled ?? user.soundEffectsEnabled !== false;
  const totalStars = stars ?? countStars(user.completedNodeIds);
  // The email stays in Settings: a kids' screen shows the username only.
  // A guest still has the starter "New Learner" profile, which is not a name.
  const subLine = guest ? undefined : user.username ? `@${user.username}` : undefined;
  const shownName = guest ? "Guest" : firstName(user.displayName);
  const initials = (user.avatarInitials || "?").slice(0, 3);

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} testID="profile-view">
      <PopIn from="scale" style={styles.hero}>
        <View style={[styles.avatar, { backgroundColor: accent, borderBottomColor: darken(accent) }]} testID="profile-avatar">
          {guest ? (
            <Icon name="profile" size={64} color={colors.white} />
          ) : (
            <Text style={[styles.initials, initialsSize(initials)]} numberOfLines={1}>
              {initials}
            </Text>
          )}
        </View>
        <Text style={[styles.name, nameSize(shownName)]} numberOfLines={2} testID="profile-name">
          {shownName}
        </Text>
        {subLine || learnerProfile.assessmentCompleted ? (
          <View style={styles.subRow}>
            {subLine ? (
              <Text style={styles.sub} numberOfLines={1}>
                {subLine}
              </Text>
            ) : null}
            {learnerProfile.assessmentCompleted ? (
              <View style={styles.levelPill}>
                <Icon name="star8" size={14} />
                <Text style={styles.levelText} numberOfLines={1}>
                  {learnerProfile.readiness_label}
                </Text>
              </View>
            ) : null}
          </View>
        ) : null}
      </PopIn>

      <View style={styles.grid}>
        <StatCard testID="profile-streak" icon="flame" value={user.streakDays} label="Day streak" color={colors.flame} />
        <StatCard testID="profile-xp" icon="bolt" value={user.totalXp} label="Total XP" color={GOLD_INK} />
        <StatCard testID="profile-stars" icon="star" value={totalStars} label="Stars" color={GOLD_INK} />
        <StatCard testID="profile-gems" icon="gem" value={user.gems} label="Gems" color={colors.gemLip} />
      </View>

      {guest && onCreateAccount ? (
        <PopIn delay={120} from="up">
          <View style={styles.saveCard} testID="profile-save">
            <View style={styles.saveHead}>
              <Mascot variant={mascotVariant} mood="wave" size={64} accent={accent} />
              <Text style={styles.saveTitle} numberOfLines={2}>
                {hasSavedAccount ? "Welcome back!" : "Save your progress"}
              </Text>
            </View>
            <GameButton label={hasSavedAccount ? "Log in" : "Sign up"} fullWidth onPress={onCreateAccount} testID="profile-create" />
          </View>
        </PopIn>
      ) : null}

      <View style={styles.menu}>
        <MenuRow icon="settings" label={strings.settings} onPress={onOpenSettings} testID="profile-settings" last={!onToggleSound} />
        {onToggleSound ? (
          <MenuRow
            icon="speaker"
            label="Sound"
            onPress={onToggleSound}
            testID="profile-sound"
            accessibilityRole="switch"
            accessibilityState={{ checked: sound }}
            last
            right={<SwitchTrack value={sound} />}
          />
        ) : null}
      </View>
    </ScrollView>
  );
}

const AVATAR = 108;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.snow
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32
  },
  hero: {
    alignItems: "center"
  },
  avatar: {
    width: AVATAR,
    height: AVATAR,
    borderRadius: AVATAR / 2,
    borderBottomWidth: 6,
    alignItems: "center",
    justifyContent: "center"
  },
  initials: {
    fontFamily: fonts.displayHeavy,
    fontSize: 42,
    lineHeight: 50,
    color: colors.white,
    maxWidth: AVATAR - 16
  },
  initialsLong: {
    fontSize: 30,
    lineHeight: 38
  },
  name: {
    ...text.h2,
    textAlign: "center",
    marginTop: 8,
    maxWidth: "100%"
  },
  subRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    maxWidth: "100%"
  },
  sub: {
    ...text.small,
    fontFamily: fonts.bodyBold,
    flexShrink: 1
  },
  levelPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: radii.pill,
    backgroundColor: colors.mist,
    flexShrink: 1
  },
  levelText: {
    fontFamily: fonts.display,
    fontSize: 13,
    lineHeight: 18,
    color: colors.ink,
    flexShrink: 1
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
    marginTop: 18
  },
  stat: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: radii.tile,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: colors.line,
    borderBottomColor: colors.lineLip,
    backgroundColor: colors.white
  },
  statText: {
    flex: 1,
    minWidth: 0
  },
  statValue: {
    fontFamily: fonts.displayHeavy,
    fontSize: 24,
    lineHeight: 30
  },
  statLabel: {
    ...text.tiny,
    fontSize: 12,
    lineHeight: 16
  },
  saveCard: {
    marginTop: 16,
    padding: 14,
    gap: 12,
    borderRadius: radii.lg,
    backgroundColor: lighten(colors.gem, 0.88),
    borderWidth: 2,
    borderBottomWidth: 5,
    borderColor: lighten(colors.gem, 0.6),
    borderBottomColor: lighten(colors.gem, 0.35)
  },
  saveHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  saveTitle: {
    fontFamily: fonts.displayHeavy,
    fontSize: 22,
    lineHeight: 27,
    color: colors.gemLip,
    flex: 1,
    minWidth: 0
  },
  menu: {
    marginTop: 16,
    borderRadius: radii.tile,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: colors.line,
    borderBottomColor: colors.lineLip,
    backgroundColor: colors.white,
    overflow: "hidden"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  rowLine: {
    borderBottomWidth: 2,
    borderBottomColor: colors.line
  },
  rowIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.mist,
    alignItems: "center",
    justifyContent: "center"
  },
  rowLabel: {
    ...text.h3,
    fontSize: 18,
    flex: 1,
    minWidth: 0
  }
});
