import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View, type AccessibilityRole, type AccessibilityState } from "react-native";
import type { CharityConfig } from "../../config/charity";
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
import { DonateSheet } from "./DonateSheet";
import { useGrownUpGate } from "./GrownUpGate";
import { SwitchTrack } from "./sheetParts";
import { SecretTap } from "./SecretTap";
import { activeIcon } from "../../services/ummah";
import { t } from "../../i18n";

export type ProfileViewProps = {
  user: UserProfile;
  strings: UiStrings;
  learnerProfile: LearnerProfile;
  onOpenSettings: () => void;
  /** Family row: a parent's view of this phone's progress and of kids they follow. Opens after the grown-up gate. */
  onOpenFamily?: () => void;
  /** Share row: the phone's share menu with an invite and the store link. Opens after the grown-up gate. */
  onShareApp?: () => void;
  /** Give charity row: amounts, a QR code and a link to the charity's donation page. Opens after the grown-up gate. */
  charity?: CharityConfig;
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
  /** Total stars. Default: countStars over user.completedNodeIds. */
  stars?: number;
  /** Avatar color (topic accent). Default green. */
  accent?: string;
  /** Mascot on the guest save card. */
  mascotVariant?: string;
};

const STARS_BY_NODE = new Map<string, number>(
  COURSE.sections.flatMap((section) => section.nodes.map((node) => [node.id, node.starsReward] as [string, number]))
);

/**
 * Stars over the finished circles. With `bestStars` (the best a learner earned on each circle, as on
 * the Lesson complete card) a circle counts what was earned there; one without a record counts its reward.
 */
export function countStars(completedNodeIds: string[], bestStars?: Record<string, number>) {
  return completedNodeIds.reduce((sum, id) => {
    const best = bestStars?.[id];
    return sum + (typeof best === "number" ? Math.max(0, best) : STARS_BY_NODE.get(id) ?? 0);
  }, 0);
}

/** Gold text on white needs a darker gold to stay readable. */
const GOLD_INK = darken(colors.gold, 0.45);
/** Same greys as the top bar's dimmed chip (a streak of 0). */
const DIM_ICON = colors.lockedLip;
const DIM_INK = darken(colors.lockedLip, 0.12);

function StatCard({
  icon,
  value,
  label,
  color,
  dim,
  testID
}: {
  icon: IconName;
  value: number;
  label: string;
  color: string;
  dim?: boolean;
  testID: string;
}) {
  return (
    <View style={styles.stat} testID={testID}>
      <View style={styles.statHead}>
        <Icon name={icon} size={28} color={dim ? DIM_ICON : undefined} />
        <FormattedCount value={value} compact style={[styles.statValue, statValueSize(value), { color: dim ? DIM_INK : color }]} />
      </View>
      <Text style={styles.statLabel} numberOfLines={1}>
        {label}
      </Text>
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
      <View style={styles.rowSide}>
        <View style={styles.rowIcon}>
          <Icon name={icon} size={26} />
        </View>
      </View>
      <Text style={styles.rowLabel} numberOfLines={1}>
        {label}
      </Text>
      <View style={[styles.rowSide, styles.rowSideEnd]}>{right ?? <Icon name="chevronRight" size={22} color={colors.lineLip} />}</View>
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

/**
 * Half-width stat cards hold five characters at full size on a 320 px phone. From 10,000 the number steps down, so
 * "12,345" stays whole, and so do the five-digit numbers a count up to "123k" passes on its way.
 */
export function statValueSize(value: number) {
  return Math.round(value) < 10_000 ? null : styles.statValueLong;
}

/** Web ignores adjustsFontSizeToFit, so long names get a smaller size up front. */
function nameSize(name: string) {
  if (name.length <= 12) return { fontSize: 26, lineHeight: 32 };
  if (name.length <= 16) return { fontSize: 22, lineHeight: 28 };
  return { fontSize: 19, lineHeight: 25 };
}

/** Whose Me screen it is: an account by its email (or name), or a guest, with or without a logged-out account. */
export function profileAccountKey(user: Pick<UserProfile, "hasAccount" | "accountEmail" | "displayName">, hasSavedAccount = false) {
  return user.hasAccount ? `account:${user.accountEmail ?? user.displayName}` : hasSavedAccount ? "guest:saved" : "guest";
}

/** Me tab: avatar, four stat cards, a save-progress card for guests, and Settings / Sound. */
export function ProfileView({
  user,
  strings,
  learnerProfile,
  onOpenSettings,
  onOpenFamily,
  onShareApp,
  charity,
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
  const shownName = guest ? t("Guest") : firstName(user.displayName);
  const initials = (user.avatarInitials || "?").slice(0, 3);
  // A profile icon bought in the Shop takes the place of the initials.
  const icon = activeIcon(user);

  // Sign up, log in or log out changes the avatar and the name at the top: scroll back up so they show
  // whole, not cut off under the top bar, and pop the avatar in again.
  const accountKey = profileAccountKey(user, hasSavedAccount);
  // Family, Share and Give charity send things out of the app, so a grown-up opens them.
  const { ask, gate } = useGrownUpGate();
  const [donateOpen, setDonateOpen] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const shownAccount = useRef(accountKey);
  useEffect(() => {
    if (shownAccount.current === accountKey) {
      return;
    }
    shownAccount.current = accountKey;
    scrollRef.current?.scrollTo?.({ y: 0, animated: true });
  }, [accountKey]);

  return (
    <ScrollView ref={scrollRef} style={styles.root} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} testID="profile-view">
      <PopIn key={accountKey} from="scale" style={styles.hero}>
        <SecretTap spot="avatar">
          <View style={[styles.avatar, { backgroundColor: icon ? lighten(accent, 0.82) : accent, borderBottomColor: darken(accent) }]} testID="profile-avatar">
            {icon ? (
              <Icon name={icon} size={72} />
            ) : guest ? (
              <Icon name="profile" size={64} color={colors.white} />
            ) : (
              <Text style={[styles.initials, initialsSize(initials)]} numberOfLines={1}>
                {initials}
              </Text>
            )}
          </View>
        </SecretTap>
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
        <StatCard testID="profile-streak" icon="flame" value={user.streakDays} label={t("Day streak")} color={colors.flame} dim={user.streakDays <= 0} />
        <StatCard testID="profile-xp" icon="bolt" value={user.totalXp} label={t("Total XP")} color={GOLD_INK} />
        <StatCard testID="profile-stars" icon="star" value={totalStars} label={t("Stars")} color={GOLD_INK} />
        <StatCard testID="profile-gems" icon="gem" value={user.gems} label={t("Gems")} color={colors.gemLip} />
      </View>

      {guest && onCreateAccount ? (
        <PopIn delay={120} from="up">
          <View style={styles.saveCard} testID="profile-save">
            <View style={styles.saveHead}>
              <Mascot variant={mascotVariant} mood="wave" size={64} accent={accent} />
              <Text style={styles.saveTitle} numberOfLines={2}>
                {hasSavedAccount ? t("Welcome back!") : t("Save your progress")}
              </Text>
            </View>
            <GameButton label={hasSavedAccount ? t("Log in") : t("Sign up")} fullWidth onPress={onCreateAccount} testID="profile-create" />
          </View>
        </PopIn>
      ) : null}

      <View style={styles.menu}>
        {onOpenFamily ? <MenuRow icon="family" label={t("Family")} onPress={() => ask(onOpenFamily)} testID="profile-family" /> : null}
        {onShareApp ? <MenuRow icon="share" label={t("Invite friends")} onPress={() => ask(onShareApp)} testID="profile-share" /> : null}
        {charity ? <MenuRow icon="handHeart" label={t("Give charity")} onPress={() => ask(() => setDonateOpen(true))} testID="profile-charity" /> : null}
        <MenuRow icon="settings" label={strings.settings} onPress={onOpenSettings} testID="profile-settings" last={!onToggleSound} />
        {onToggleSound ? (
          <MenuRow
            icon="speaker"
            label={t("Sound")}
            onPress={onToggleSound}
            testID="profile-sound"
            accessibilityRole="switch"
            accessibilityState={{ checked: sound }}
            last
            right={<SwitchTrack value={sound} />}
          />
        ) : null}
      </View>
      {charity ? <DonateSheet visible={donateOpen} onClose={() => setDonateOpen(false)} charity={charity} /> : null}
      {gate}
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
    alignItems: "center",
    gap: 2,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: radii.tile,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: colors.line,
    borderBottomColor: colors.lineLip,
    backgroundColor: colors.white
  },
  statHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    maxWidth: "100%"
  },
  statValue: {
    fontFamily: fonts.displayHeavy,
    fontSize: 24,
    lineHeight: 30
  },
  statValueLong: {
    fontSize: 20
  },
  statLabel: {
    ...text.tiny,
    fontSize: 12,
    lineHeight: 16,
    textAlign: "center",
    maxWidth: "100%"
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
    alignItems: "center",
    gap: 6
  },
  saveTitle: {
    fontFamily: fonts.displayHeavy,
    fontSize: 22,
    lineHeight: 27,
    color: colors.gemLip,
    textAlign: "center",
    maxWidth: "100%"
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
  /** Same width on both sides, so the label sits in the middle of the row. */
  rowSide: {
    width: 50,
    alignItems: "flex-start"
  },
  rowSideEnd: {
    alignItems: "flex-end"
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
    textAlign: "center",
    flex: 1,
    minWidth: 0
  }
});
