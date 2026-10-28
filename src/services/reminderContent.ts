import type { UserProfile } from "../types";
import { getStoredItem, setStoredItem } from "./appStorage";

// Reminder timing and history shared by the web and phone reminder implementations.
// The words live in comebackReminders.ts.

export interface ReminderHistory {
  permissionAsked?: boolean;
  lastStreakReminderDate?: string;
  lastResumeReminderDate?: string;
  /** Web only: the last come-back step shown, and for which last lesson, so each step shows once. */
  lastComebackStep?: string;
  lastComebackFor?: number;
}

const STORAGE_KEY = "sira-path-islamic-reminder-history";
export const RESUME_REMINDER_AFTER_MS = 6 * 60 * 60 * 1000;

export function getLastLearningTime(user: UserProfile) {
  const raw = user.lastLearningAt ?? user.lastLoginAt;

  if (!raw) {
    return 0;
  }

  const timestamp = new Date(raw).getTime();
  return Number.isFinite(timestamp) ? timestamp : 0;
}

export function isSameCalendarDay(left: number, right: number) {
  return formatLocalDateKey(left) === formatLocalDateKey(right);
}

export function loadReminderHistory(): ReminderHistory {
  try {
    const raw = getStoredItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ReminderHistory) : {};
  } catch {
    return {};
  }
}

export function saveReminderHistory(history: ReminderHistory) {
  setStoredItem(STORAGE_KEY, JSON.stringify(history));
}

export function formatLocalDateKey(value: number) {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}
