import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { GameButton } from "../GameButton";
import { Sheet } from "../Sheet";
import { Tappable } from "../Tappable";
import { colors, fonts, radii, space, text } from "../theme";
// Settings: who is learning, reminders, sound, log out.
import { SegmentButton, Toggle, useBackToClose } from "./sheetParts";

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
  onLogout: () => void;
  onDeleteAccount?: () => void;
};

const ROLES: Array<{ id?: LearnerRole; label: string; line: string; testID: string }> = [
  { label: "Just me", line: "Learn on your own.", testID: "settings-role-me" },
  { id: "child", label: "Learner", line: "A parent can follow your progress.", testID: "settings-role-child" },
  { id: "parent", label: "Parent", line: "Cheer on a learner you connect.", testID: "settings-role-parent" }
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
  onDeleteAccount
}: SettingsSheetProps) {
  useBackToClose(visible, onClose);
  const activeRole = ROLES.find((option) => option.id === role) ?? ROLES[0];

  return (
    <Sheet visible={visible} onClose={onClose} style={styles.tallPanel} testID="settings-sheet">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.stack}>
        <Text style={styles.title} accessibilityRole="header">Settings</Text>

        <Text style={styles.sectionLabel}>WHO IS LEARNING?</Text>
        <View style={styles.segments}>
          {ROLES.map((option) => (
            <SegmentButton
              key={option.testID}
              label={option.label}
              active={option === activeRole}
              onPress={() => onSelectRole(option.id)}
              testID={option.testID}
            />
          ))}
        </View>
        <Text style={styles.hint}>{activeRole.line}</Text>

        <Text style={styles.sectionLabel}>REMINDERS</Text>
        <View style={styles.card}>
          <Toggle label="Streak reminder" icon="flame" value={streakReminder} onToggle={onToggleStreak} testID="settings-streak" />
          <View style={styles.divider} />
          <Toggle label="Come back nudges" icon="bell" value={islamicReminder} onToggle={onToggleIslamic} testID="settings-islamic" />
          {role ? (
            <>
              <View style={styles.divider} />
              <Toggle label="Missed a day alert" icon="people" value={dailyCheckIn} onToggle={onToggleDaily} testID="settings-daily" />
              <View style={styles.divider} />
              <Toggle label="Away a week alert" icon="family" value={weeklyCheckIn} onToggle={onToggleWeekly} testID="settings-weekly" />
            </>
          ) : null}
        </View>

        <Text style={styles.sectionLabel}>SOUND</Text>
        <View style={styles.card}>
          <Toggle label="Sound effects" icon="speaker" value={soundEnabled} onToggle={onToggleSound} testID="settings-sound" />
          <View style={styles.divider} />
          <Toggle label="Softer sounds" icon="moon" value={softSound} onToggle={onToggleSoftSound} testID="settings-soft" />
        </View>

        <GameButton label="Save" fullWidth onPress={onSave} testID="settings-save" />
        <GameButton label="Log out" variant="white" fullWidth onPress={onLogout} testID="settings-logout" />
        {onDeleteAccount ? (
          <Tappable onPress={onDeleteAccount} style={styles.linkButton} accessibilityRole="button" testID="settings-delete">
            <Text style={styles.dangerLink}>Delete account</Text>
          </Tappable>
        ) : null}
      </ScrollView>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  tallPanel: {
    maxHeight: "92%"
  },
  stack: {
    gap: space.md,
    paddingBottom: space.xs
  },
  title: {
    ...text.h2,
    textAlign: "center"
  },
  sectionLabel: {
    fontFamily: fonts.displayHeavy,
    fontSize: 13,
    letterSpacing: 0.8,
    color: colors.inkSoft,
    marginTop: space.xs
  },
  hint: {
    ...text.small,
    marginTop: -space.xs
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
