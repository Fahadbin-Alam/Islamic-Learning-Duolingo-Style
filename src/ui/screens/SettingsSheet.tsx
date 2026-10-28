import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { GameButton } from "../GameButton";
import { ScrollHintGap, useScrollMore } from "../lesson/ScrollHint";
import { Sheet } from "../Sheet";
import { Tappable } from "../Tappable";
import { colors, fonts, radii, space, text } from "../theme";
// Settings: who is learning, reminders, sound, log out.
import { LinkRow, SegmentButton, SheetTitle, Toggle, useBackToClose } from "./sheetParts";
import { t } from "../../i18n";

export type LearnerRole = "child" | "parent";

export type SettingsSheetProps = {
  visible: boolean;
  role?: LearnerRole;
  streakReminder: boolean;
  islamicReminder: boolean;
  dailyCheckIn: boolean;
  weeklyCheckIn: boolean;
  soundEnabled: boolean;
  softSound: boolean;
  onSelectRole: (role?: LearnerRole) => void;
  onToggleStreak: () => void;
  onToggleIslamic: () => void;
  onToggleDaily: () => void;
  onToggleWeekly: () => void;
  onToggleSound: () => void;
  onToggleSoftSound: () => void;
  onSave: () => void;
  onClose: () => void;
  /** Not shown for guests. */
  onLogout?: () => void;
  onDeleteAccount?: () => void;
  /** A guest has no account: no "who is learning", family alerts, Log out or Delete account. */
  guest?: boolean;
  /** The app language's own name ("বাংলা"), and opening the language sheet. */
  languageLabel?: string;
  onOpenLanguage?: () => void;
  /** "Off" or the chosen city, and opening the prayer-time lessons sheet. */
  prayerLabel?: string;
  onOpenPrayer?: () => void;
};

// Labels that say the difference on their own; the line under them is a reminder only.
const ROLES: Array<{ id?: LearnerRole; label: string; line: string; testID: string }> = [
  { label: "Solo", line: "Learn on your own.", testID: "settings-role-me" },
  { id: "child", label: "Kid", line: "A parent can cheer you on.", testID: "settings-role-child" },
  { id: "parent", label: "Parent", line: "Cheer on your child.", testID: "settings-role-parent" }
];

export function SettingsSheet({
  visible,
  role,
  streakReminder,
  islamicReminder,
  dailyCheckIn,
  weeklyCheckIn,
  soundEnabled,
  softSound,
  onSelectRole,
  onToggleStreak,
  onToggleIslamic,
  onToggleDaily,
  onToggleWeekly,
  onToggleSound,
  onToggleSoftSound,
  onSave,
  onClose,
  onLogout,
  onDeleteAccount,
  guest = false,
  languageLabel,
  onOpenLanguage,
  prayerLabel,
  onOpenPrayer
}: SettingsSheetProps) {
  useBackToClose(visible, onClose);
  const activeRole = ROLES.find((option) => option.id === role) ?? ROLES[0];
  const { ref, scrollProps, more, scrollDown } = useScrollMore();

  // The title and SAVE stay put; the rows scroll between them, with a bouncing arrow while some are hidden.
  return (
    <Sheet visible={visible} onClose={onClose} style={styles.tallPanel} testID="settings-sheet">
      <SheetTitle title={t("Settings")} onClose={onClose} closeTestID="settings-close" />
      <View style={styles.scrollArea}>
        <ScrollView ref={ref} {...scrollProps} contentContainerStyle={styles.stack} testID="settings-scroll">
          {guest ? null : (
            <View style={styles.roles}>
              <View style={styles.segments}>
                {ROLES.map((option) => (
                  <SegmentButton
                    key={option.testID}
                    label={t(option.label)}
                    active={option === activeRole}
                    onPress={() => onSelectRole(option.id)}
                    testID={option.testID}
                  />
                ))}
              </View>
              <Text style={styles.hint}>{t(activeRole.line)}</Text>
            </View>
          )}

          {onOpenLanguage ? (
            <View style={styles.card}>
              <LinkRow label={t("Language")} value={languageLabel ?? ""} icon="globe" onPress={onOpenLanguage} testID="settings-language" />
            </View>
          ) : null}

          <View style={styles.card}>
            <Toggle label={t("Streak reminder")} icon="flame" value={streakReminder} onToggle={onToggleStreak} testID="settings-streak" />
            <View style={styles.divider} />
            <Toggle label={t("Come back nudges")} icon="bell" value={islamicReminder} onToggle={onToggleIslamic} testID="settings-islamic" />
            {onOpenPrayer ? (
              <>
                <View style={styles.divider} />
                <LinkRow label={t("Prayer time lessons")} value={prayerLabel ?? ""} icon="mosque" onPress={onOpenPrayer} testID="settings-prayer" />
              </>
            ) : null}
            {role && !guest ? (
              <>
                <View style={styles.divider} />
                <Toggle label={t("Missed a day alert")} icon="people" value={dailyCheckIn} onToggle={onToggleDaily} testID="settings-daily" />
                <View style={styles.divider} />
                <Toggle label={t("Away a week alert")} icon="family" value={weeklyCheckIn} onToggle={onToggleWeekly} testID="settings-weekly" />
              </>
            ) : null}
          </View>

          <View style={styles.card}>
            <Toggle label={t("Sound effects")} icon="speaker" value={soundEnabled} onToggle={onToggleSound} testID="settings-sound" />
            <View style={styles.divider} />
            <Toggle label={t("Softer sounds")} icon="moon" value={softSound} onToggle={onToggleSoftSound} testID="settings-soft" />
          </View>

          {!guest && onLogout ? <GameButton label={t("Log out")} variant="secondary" fullWidth onPress={onLogout} testID="settings-logout" /> : null}
          {!guest && onDeleteAccount ? (
            <Tappable onPress={onDeleteAccount} style={styles.linkButton} accessibilityRole="button" testID="settings-delete">
              <Text style={styles.dangerLink}>{t("Delete account")}</Text>
            </Tappable>
          ) : null}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <ScrollHintGap visible={more} onPress={scrollDown} gap={space.lg} testID="settings-more" />
        <GameButton label={t("Save")} fullWidth onPress={onSave} testID="settings-save" />
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  tallPanel: {
    maxHeight: "92%"
  },
  scrollArea: {
    flexShrink: 1,
    minHeight: 0,
    marginTop: space.md
  },
  stack: {
    gap: space.md,
    paddingBottom: space.lg
  },
  footer: {
    borderTopWidth: 2,
    borderTopColor: colors.line
  },
  roles: {
    gap: space.xs
  },
  hint: {
    ...text.small,
    textAlign: "center"
  },
  segments: {
    flexDirection: "row",
    gap: space.sm
  },
  card: {
    borderRadius: radii.tile,
    borderWidth: 2,
    borderColor: colors.line,
    borderBottomWidth: 4,
    borderBottomColor: colors.lineLip,
    backgroundColor: colors.white,
    paddingHorizontal: space.md
  },
  divider: {
    height: 2,
    backgroundColor: colors.line
  },
  linkButton: {
    alignSelf: "center",
    paddingVertical: space.sm,
    paddingHorizontal: space.lg
  },
  dangerLink: {
    fontFamily: fonts.displayHeavy,
    fontSize: 15,
    color: colors.wrongInk
  }
});
