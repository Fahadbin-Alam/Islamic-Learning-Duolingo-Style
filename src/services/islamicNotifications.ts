import type { SupportedLanguage, UserProfile } from "../types";
import { calendarDaysBetween, comebackMessage, latestStepForDays, type ComebackStep } from "./comebackReminders";
import {
  RESUME_REMINDER_AFTER_MS,
  formatLocalDateKey,
  getLastLearningTime,
  loadReminderHistory,
  saveReminderHistory
} from "./reminderContent";

// Web reminders use the browser Notification API while the tab is open.
// Android and iOS use islamicNotifications.native.ts instead.

type NotificationPermissionState = NotificationPermission | "unsupported";

const CHECK_INTERVAL_MS = 5 * 60 * 1000;

export async function requestIslamicNotificationPermission() {
  if (typeof window === "undefined" || typeof Notification === "undefined") {
    return "unsupported" as NotificationPermissionState;
  }

  if (Notification.permission === "granted" || Notification.permission === "denied") {
    return Notification.permission;
  }

  const history = loadReminderHistory();
  history.permissionAsked = true;
  saveReminderHistory(history);

  return Notification.requestPermission();
}

export async function maybeSendIslamicReminder(user: UserProfile, language: SupportedLanguage) {
  if (typeof window === "undefined" || typeof Notification === "undefined") {
    return false;
  }

  const lastLearningAt = getLastLearningTime(user);

  if (!lastLearningAt) {
    return false;
  }

  const history = loadReminderHistory();
  const today = formatLocalDateKey(Date.now());
  const reminders = user.reminderPreferences;
  const daysAway = calendarDaysBetween(lastLearningAt, Date.now());
  let step: ComebackStep | undefined;

  // Same ladder as the phones, caught up once a day while the tab is open.
  if (daysAway === 0) {
    if (reminders?.islamicReminders !== false && Date.now() - lastLearningAt >= RESUME_REMINDER_AFTER_MS && history.lastResumeReminderDate !== today) {
      step = "resume";
    }
  } else {
    const latest = latestStepForDays(daysAway);
    const wanted = latest === "streak" ? reminders?.streakReminders !== false : reminders?.islamicReminders !== false;
    const sentToday = latest === "streak" ? history.lastStreakReminderDate === today : history.lastResumeReminderDate === today;
    const alreadyShown = history.lastComebackStep === latest && history.lastComebackFor === lastLearningAt;

    if (latest && wanted && !sentToday && !alreadyShown) {
      step = latest;
    }
  }

  if (!step) {
    return false;
  }

  const permission = await ensurePermission(history.permissionAsked === true);

  if (permission !== "granted") {
    return false;
  }

  if (typeof document !== "undefined" && document.visibilityState === "visible") {
    return false;
  }

  const message = comebackMessage(language, step);
  new Notification(message.title, { body: message.body });

  if (step === "streak") {
    history.lastStreakReminderDate = today;
  } else {
    history.lastResumeReminderDate = today;
  }

  if (step !== "resume") {
    history.lastComebackStep = step;
    history.lastComebackFor = lastLearningAt;
  }

  saveReminderHistory(history);
  return true;
}

export function scheduleIslamicReminderChecks(user: UserProfile, language: SupportedLanguage) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const runCheck = () => {
    void maybeSendIslamicReminder(user, language);
  };

  runCheck();
  const intervalId = window.setInterval(runCheck, CHECK_INTERVAL_MS);
  if (typeof document !== "undefined") {
    document.addEventListener("visibilitychange", runCheck);
  }

  return () => {
    window.clearInterval(intervalId);
    if (typeof document !== "undefined") {
      document.removeEventListener("visibilitychange", runCheck);
    }
  };
}

export async function sendAccountabilityNotification(title: string, body: string, allowPermissionPrompt: boolean) {
  if (typeof window === "undefined" || typeof Notification === "undefined") {
    return;
  }

  try {
    if (Notification.permission === "granted") {
      new Notification(title, { body });
      return;
    }

    if (allowPermissionPrompt && Notification.permission !== "denied") {
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        new Notification(title, { body });
      }
    }
  } catch {
    // Keep accountability available even if browser notifications are not supported.
  }
}

function ensurePermission(alreadyAsked: boolean) {
  if (typeof Notification === "undefined") {
    return Promise.resolve("unsupported" as NotificationPermissionState);
  }

  if (Notification.permission === "granted" || Notification.permission === "denied") {
    return Promise.resolve(Notification.permission);
  }

  if (alreadyAsked) {
    return Promise.resolve("default" as NotificationPermissionState);
  }

  return requestIslamicNotificationPermission();
}
