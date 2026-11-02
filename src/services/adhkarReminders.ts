import type { SupportedLanguage } from "../types";

// The morning and evening adhkar reminders are phone notifications scheduled with the system
// (adhkarReminders.native.ts). The web preview has no scheduled notifications, so these do nothing there.

export function scheduleAdhkarReminders(_on: boolean, _language: SupportedLanguage) {
  return Promise.resolve();
}

/** The preview lets the switch be tried out; nothing is sent. */
export async function requestAdhkarReminderPermission() {
  return true;
}

export function onAdhkarReminderOpened(_onOpen: (time: "morning" | "evening") => void) {
  return () => undefined;
}
