import { Platform } from "react-native";
import * as Haptics from "expo-haptics";
import { playGameSound, preloadGameSounds, primeGameAudio } from "../services/gameAudio";
import type { GameSoundEvent, SoundPreferences } from "../services/gameSoundLibrary";

export type HapticKind = "light" | "medium" | "heavy" | "success" | "error" | "warning";

let preferences: SoundPreferences = { enabled: true, reduced: false };
let hapticsEnabled = true;

/** Store the learner's sound settings so every kit component plays with them. */
export function configureUiSound(prefs: SoundPreferences & { haptics?: boolean }) {
  const { haptics, ...sound } = prefs;
  preferences = { ...preferences, ...sound };
  if (typeof haptics === "boolean") {
    hapticsEnabled = haptics;
  }
}

/** Loads the common sounds ahead (on phones), so the first tap on a button plays at once. Never throws. */
export function preloadUiSounds() {
  if (preferences.enabled === false) {
    return;
  }
  try {
    // Test stand-ins for the audio module may leave this out.
    preloadGameSounds?.(preferences);
  } catch {
    // Sound is optional.
  }
}

export function getUiSoundPreferences(): SoundPreferences {
  return preferences;
}

/** Play a game sound with the stored preferences. Never throws. */
export function playUi(event: GameSoundEvent = "soft_ui") {
  if (preferences.enabled === false) {
    return;
  }
  try {
    primeGameAudio(preferences);
    playGameSound(event, preferences);
  } catch {
    // Sound is optional.
  }
}

/** Haptic feedback on iOS and Android. No-op on web. Never throws. */
export function haptic(kind: HapticKind = "light") {
  if (Platform.OS === "web" || !hapticsEnabled) {
    return;
  }
  try {
    let result: Promise<void> | undefined;
    switch (kind) {
      case "success":
        result = Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        break;
      case "error":
        result = Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        break;
      case "warning":
        result = Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        break;
      case "heavy":
        result = Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
      case "medium":
        result = Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      default:
        result = Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    void result?.catch?.(() => undefined);
  } catch {
    // Haptics are optional.
  }
}

/** Sound + haptic pairing used by kit components. */
export function feedback(event: GameSoundEvent | false = "soft_ui", kind: HapticKind = "light") {
  if (event) {
    playUi(event);
  }
  haptic(kind);
}
