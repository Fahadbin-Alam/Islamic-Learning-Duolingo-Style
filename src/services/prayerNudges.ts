import type { SupportedLanguage, UserProfile } from "../types";
import type { PrayerNudgePrefs } from "./prayerTimes";

// Prayer-time nudges are phone notifications scheduled with the system (prayerNudges.native.ts).
// The web preview has no scheduled notifications, so these do nothing there.

export function schedulePrayerNudges(_prefs: PrayerNudgePrefs, _user: UserProfile | undefined, _language: SupportedLanguage) {
  return Promise.resolve();
}

/** The preview lets the setting be tried out; nothing is sent. */
export async function requestPrayerNudgePermission() {
  return true;
}

export function onPrayerNudgeOpened(_onOpen: () => void) {
  return () => undefined;
}
