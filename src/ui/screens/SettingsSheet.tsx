import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { GameButton } from "../GameButton";
import { ScrollHintGap, useScrollMore } from "../lesson/ScrollHint";
import { Sheet } from "../Sheet";
import { Tappable } from "../Tappable";
import { colors, fonts, radii, space, text } from "../theme";
// Settings: who is learning, reminders, sound, log out.
import { LinkRow, SegmentButton, SheetTitle, Toggle, useBackToClose } from "./sheetParts";
import { QuranOfflineRow } from "./QuranOfflineRow";
import { offlineAudioSupported } from "../../services/offlineAudio";
import { t } from "../../i18n";
import type { DifficultyChoice } from "../../types";
import { PATH_WORLD_CHOICES, setPathWorldChoice, usePathWorldChoice, type PathWorldChoice } from "../../services/pathWorldChoice";
import { WORLD_LABELS } from "../pathWorlds";

// What each scenery pick shows on the Learn path.
const WORLD_LINES: Record<PathWorldChoice, string> = {
  auto: "Each unit is a new place.",
  desert: "Dunes, palms and camels.",
  beach: "Waves, crabs and boats.",
  forest: "Pines, mushrooms and an owl.",
  snow: "Snowy peaks and goats.",
  camp: "Tents and horses at Badr."
};

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
  /** How hard lessons are; unset is "auto". */
  difficulty?: DifficultyChoice;
  onSelectDifficulty?: (difficulty: DifficultyChoice) => void;
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

// How hard lessons are. Auto climbs with the streak and the lessons done; the line under says what each does.
const DIFFICULTIES: Array<{ id: DifficultyChoice; label: string; line: string; testID: string }> = [
  { id: "auto", label: "Auto", line: "Gets harder as your streak grows.", testID: "settings-difficulty-auto" },
  { id: "easy", label: "Easy", line: "Gentle questions, more true or false.", testID: "settings-difficulty-easy" },
  { id: "hard", label: "Hard", line: "More questions from memory.", testID: "settings-difficulty-hard" },
  { id: "really_hard", label: "Really hard", line: "The toughest questions. Good luck!", testID: "settings-difficulty-really-hard" }
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
  difficulty,
  onSelectDifficulty,
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
  const activeDifficulty = DIFFICULTIES.find((option) => option.id === difficulty) ?? DIFFICULTIES[0];
  const { ref, scrollProps, more, scrollDown } = useScrollMore();
  const world = usePathWorldChoice();

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

          {onSelectDifficulty ? (
            <View style={styles.roles} testID="settings-difficulty">
              <Text style={styles.label}>{t("Difficulty")}</Text>
              <View style={styles.segments}>
                {DIFFICULTIES.map((option) => (
                  <SegmentButton
                    key={option.testID}
                    label={t(option.label)}
                    active={option === activeDifficulty}
                    onPress={() => onSelectDifficulty(option.id)}
                    testID={option.testID}
                  />
                ))}
              </View>
              <Text style={styles.hint}>{t(activeDifficulty.line)}</Text>
            </View>
          ) : null}

          <View style={styles.roles} testID="settings-scenery">
            <Text style={styles.label}>{t("Path scenery")}</Text>
            {[PATH_WORLD_CHOICES.slice(0, 3), PATH_WORLD_CHOICES.slice(3)].map((row) => (
              <View key={row[0]} style={styles.segments}>
                {row.map((choice) => (
                  <SegmentButton
                    key={choice}
                    label={t(WORLD_LABELS[choice])}
                    active={choice === world}
                    onPress={() => setPathWorldChoice(choice)}
                    testID={`settings-scenery-${choice}`}
                  />
                ))}
              </View>
            ))}
            <Text style={styles.hint}>{t(WORLD_LINES[world])}</Text>
          </View>

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
            {offlineAudioSupported() ? (
              <>
                <View style={styles.divider} />
                <QuranOfflineRow />
              </>
            ) : null}
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
  label: {
    fontFamily: fonts.displayHeavy,
    fontSize: 15,
    color: colors.ink
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
