import React, { useEffect, useRef } from "react";
import {
  Animated,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { Confetti } from "../Confetti";
import { CountUp } from "../CountUp";
import { GameButton } from "../GameButton";
import { Icon, type IconName } from "../Icon";
import { Mascot, type MascotMood } from "../Mascot";
import { PopIn } from "../PopIn";
import { Sheet } from "../Sheet";
import { SpeechBubble } from "../SpeechBubble";
import { Tappable } from "../Tappable";
import { colors, fonts, lighten, radii, space, text } from "../theme";

// The app's pop-ups (account, settings, heart refill, chest reward, language), drawn with the kit.
// They are overlays inside the phone column, so place them as the last children of the app shell.

/** Android back button closes the sheet instead of leaving the app. */
function useBackToClose(visible: boolean, onClose?: () => void) {
  useEffect(() => {
    if (!visible || !onClose || Platform.OS !== "android") {
      return;
    }
    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      onClose();
      return true;
    });
    return () => subscription.remove();
  }, [onClose, visible]);
}

function MascotSays({ variant, mood, line }: { variant: string; mood: MascotMood; line: string }) {
  return (
    <View style={styles.mascotRow}>
      <Mascot variant={variant} mood={mood} size={84} />
      <SpeechBubble style={styles.bubble}>{line}</SpeechBubble>
    </View>
  );
}

function Toggle({ label, icon, value, onToggle, testID }: { label: string; icon: IconName; value: boolean; onToggle: () => void; testID: string }) {
  const knob = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    const animation = Animated.spring(knob, { toValue: value ? 1 : 0, friction: 7, tension: 140, useNativeDriver: true });
    animation.start();
    return () => animation.stop();
  }, [knob, value]);

  return (
    <Tappable
      onPress={onToggle}
      pressScale={0.98}
      style={styles.toggleRow}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      accessibilityLabel={label}
      testID={testID}
    >
      <Icon name={icon} size={26} />
      <Text style={styles.toggleLabel}>{label}</Text>
      <View style={[styles.track, value && styles.trackOn]}>
        <Animated.View style={[styles.knob, { transform: [{ translateX: knob.interpolate({ inputRange: [0, 1], outputRange: [0, 20] }) }] }]} />
      </View>
    </Tappable>
  );
}

function SegmentButton({ label, active, onPress, testID }: { label: string; active: boolean; onPress: () => void; testID: string }) {
  return (
    <Tappable
      onPress={onPress}
      style={[styles.segment, active && styles.segmentActive]}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      testID={testID}
    >
      <Text style={[styles.segmentText, active && styles.segmentTextActive]} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
        {label}
      </Text>
    </Tappable>
  );
}

// ---------- Account ----------

export type AccountSheetProps = {
  visible: boolean;
  mode: "create" | "login";
  mascotVariant: string;
  name: string;
  email: string;
  password: string;
  /** Sign-in providers that are switched on (Google, Facebook). */
  socialProviders?: Array<{ id: string; label: string }>;
  onChangeMode: (mode: "create" | "login") => void;
  onChangeName: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
  onSubmit: () => void;
  onSocial?: (providerId: string) => void;
  onClose: () => void;
};

export function AccountSheet({
  visible,
  mode,
  mascotVariant,
  name,
  email,
  password,
  socialProviders = [],
  onChangeMode,
  onChangeName,
  onChangeEmail,
  onChangePassword,
  onSubmit,
  onSocial,
  onClose
}: AccountSheetProps) {
  useBackToClose(visible, onClose);
  const creating = mode === "create";

  return (
    <Sheet visible={visible} onClose={onClose} style={styles.tallPanel} testID="account-sheet">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={styles.stack}>
          <MascotSays variant={mascotVariant} mood="wave" line={creating ? "Save your progress!" : "Welcome back!"} />
          <View style={styles.segments}>
            <SegmentButton label="Sign up" active={creating} onPress={() => onChangeMode("create")} testID="account-mode-create" />
            <SegmentButton label="Log in" active={!creating} onPress={() => onChangeMode("login")} testID="account-mode-login" />
          </View>
          {creating ? (
            <TextInput
              value={name}
              onChangeText={onChangeName}
              placeholder="Your name"
              placeholderTextColor={colors.inkSoft}
              style={styles.input}
              accessibilityLabel="Your name"
              testID="account-name"
            />
          ) : null}
          <TextInput
            value={email}
            onChangeText={onChangeEmail}
            placeholder="Email"
            placeholderTextColor={colors.inkSoft}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            style={styles.input}
            accessibilityLabel="Email"
            testID="account-email"
          />
          <TextInput
            value={password}
            onChangeText={onChangePassword}
            placeholder="Password"
            placeholderTextColor={colors.inkSoft}
            autoCapitalize="none"
            secureTextEntry
            style={styles.input}
            accessibilityLabel="Password"
            testID="account-password"
          />
          <GameButton label={creating ? "Create account" : "Log in"} fullWidth onPress={onSubmit} testID="account-submit" />
          {socialProviders.map((provider) => (
            <GameButton
              key={provider.id}
              label={provider.label}
              variant="white"
              fullWidth
              onPress={() => onSocial?.(provider.id)}
              testID={`account-social-${provider.id}`}
            />
          ))}
          <GameButton label="Later" variant="ghost" fullWidth onPress={onClose} testID="account-later" />
        </ScrollView>
      </KeyboardAvoidingView>
    </Sheet>
  );
}

// ---------- Settings ----------

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

// ---------- Out of hearts ----------

export type RefillSheetProps = {
  visible: boolean;
  maxHearts: number;
  mascotVariant: string;
  onRefill: () => void;
  onShop: () => void;
};

/** Shown the first time a learner runs out of hearts: one free refill, then the shop. */
export function RefillSheet({ visible, maxHearts, mascotVariant, onRefill, onShop }: RefillSheetProps) {
  useBackToClose(visible, onShop);

  return (
    <Sheet visible={visible} onClose={onShop} dismissOnBackdrop={false} testID="refill-sheet">
      <View style={styles.stack}>
        <MascotSays variant={mascotVariant} mood="sad" line="Out of hearts!" />
        <View style={styles.heartRow} accessibilityLabel={`${maxHearts} hearts`}>
          {Array.from({ length: maxHearts }, (_, index) => (
            <PopIn key={index} delay={120 + index * 90}>
              <Icon name="heart" size={34} />
            </PopIn>
          ))}
        </View>
        <Text style={styles.centerLine}>Here is one free refill.</Text>
        <GameButton label="Refill hearts" color={colors.heart} fullWidth onPress={onRefill} sound="unlock" testID="refill-claim" />
        <GameButton label="Shop" variant="ghost" fullWidth onPress={onShop} testID="refill-shop" />
      </View>
    </Sheet>
  );
}

// ---------- Chest reward ----------

export type RewardPopProps = {
  visible: boolean;
  gems: number;
  onClose: () => void;
};

/** Chest opened: confetti, the chest pops, gems count up. */
export function RewardPop({ visible, gems, onClose }: RewardPopProps) {
  useBackToClose(visible, onClose);

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.popLayer} testID="reward-pop">
      <Tappable onPress={onClose} sound={false} hapticKind={false} pressScale={1} style={StyleSheet.absoluteFill} accessibilityLabel="Close">
        <View style={[StyleSheet.absoluteFill, styles.popBackdrop]} />
      </Tappable>
      <PopIn style={styles.popCard}>
        <Confetti active count={36} />
        <PopIn delay={120}>
          <Icon name="chest" size={96} />
        </PopIn>
        <Text style={styles.popTitle} accessibilityRole="header">Chest opened!</Text>
        <View style={styles.gemRow}>
          <Icon name="gem" size={34} />
          <CountUp value={gems} prefix="+" duration={800} style={styles.gemValue} />
        </View>
        <GameButton label="Collect" color={colors.gem} fullWidth onPress={onClose} sound="xp" testID="reward-collect" />
      </PopIn>
    </View>
  );
}

// ---------- Language ----------

export type LanguageSheetProps = {
  visible: boolean;
  options: Array<{ id: string; code: string; nativeLabel: string; label: string }>;
  selected: string;
  canClose: boolean;
  onSelect: (id: string) => void;
  onSave: () => void;
  onClose: () => void;
};

export function LanguageSheet({ visible, options, selected, canClose, onSelect, onSave, onClose }: LanguageSheetProps) {
  useBackToClose(visible, canClose ? onClose : onSave);

  return (
    <Sheet visible={visible} onClose={canClose ? onClose : undefined} dismissOnBackdrop={canClose} style={styles.tallPanel} testID="language-sheet">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.stack}>
        <Text style={styles.title} accessibilityRole="header">Language</Text>
        <View style={styles.languageGrid}>
          {options.map((option) => {
            const active = option.id === selected;
            return (
              <Tappable
                key={option.id}
                onPress={() => onSelect(option.id)}
                style={[styles.languageTile, active && styles.languageTileActive]}
                accessibilityRole="radio"
                accessibilityState={{ selected: active }}
                accessibilityLabel={option.label}
                testID={`language-${option.id}`}
              >
                <Text style={[styles.languageNative, active && styles.languageNativeActive]} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.7}>
                  {option.nativeLabel}
                </Text>
                <Text style={styles.languageLabel} numberOfLines={1}>{option.label}</Text>
              </Tappable>
            );
          })}
        </View>
        <GameButton label="Save" fullWidth onPress={onSave} testID="language-save" />
        {canClose ? <GameButton label="Later" variant="ghost" fullWidth onPress={onClose} testID="language-later" /> : null}
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
  mascotRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm
  },
  bubble: {
    flex: 1,
    minWidth: 0
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
  centerLine: {
    ...text.bodyBold,
    textAlign: "center"
  },
  segments: {
    flexDirection: "row",
    gap: space.sm
  },
  segment: {
    flex: 1,
    minWidth: 0,
    minHeight: 46,
    borderRadius: radii.button,
    borderWidth: 2,
    borderColor: colors.line,
    borderBottomWidth: 4,
    borderBottomColor: colors.lineLip,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: space.sm
  },
  segmentActive: {
    borderColor: colors.gem,
    borderBottomColor: colors.gemLip,
    backgroundColor: lighten(colors.gem, 0.86)
  },
  segmentText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 16,
    color: colors.inkSoft
  },
  segmentTextActive: {
    color: colors.gemLip
  },
  input: {
    minHeight: 54,
    paddingHorizontal: 16,
    borderRadius: radii.md,
    borderWidth: 2,
    borderColor: colors.line,
    backgroundColor: colors.mist,
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: colors.ink,
    minWidth: 0
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
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
    minHeight: 58
  },
  toggleLabel: {
    ...text.bodyBold,
    flex: 1,
    minWidth: 0,
    flexShrink: 1
  },
  track: {
    width: 50,
    height: 30,
    borderRadius: radii.pill,
    backgroundColor: colors.locked,
    padding: 3
  },
  trackOn: {
    backgroundColor: colors.green
  },
  knob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.white
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
  },
  heartRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: space.sm
  },
  popLayer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    padding: space.xxl
  },
  popBackdrop: {
    backgroundColor: "rgba(20, 32, 27, 0.5)"
  },
  popCard: {
    width: "100%",
    maxWidth: 360,
    alignItems: "center",
    gap: space.md,
    padding: space.xxl,
    borderRadius: radii.xl,
    backgroundColor: colors.white,
    overflow: "hidden"
  },
  popTitle: {
    ...text.h2,
    textAlign: "center"
  },
  gemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm
  },
  gemValue: {
    fontFamily: fonts.displayHeavy,
    fontSize: 34,
    lineHeight: 42,
    color: colors.gemLip
  },
  languageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: space.sm
  },
  languageTile: {
    flexBasis: "47%",
    flexGrow: 1,
    minWidth: 0,
    minHeight: 72,
    borderRadius: radii.tile,
    borderWidth: 2,
    borderColor: colors.line,
    borderBottomWidth: 4,
    borderBottomColor: colors.lineLip,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    padding: space.sm
  },
  languageTileActive: {
    borderColor: colors.gem,
    borderBottomColor: colors.gemLip,
    backgroundColor: lighten(colors.gem, 0.86)
  },
  languageNative: {
    fontFamily: fonts.displayHeavy,
    fontSize: 20,
    color: colors.ink
  },
  languageNativeActive: {
    color: colors.gemLip
  },
  languageLabel: {
    ...text.tiny
  }
});
