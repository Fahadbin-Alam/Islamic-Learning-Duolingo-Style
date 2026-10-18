import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import type { SupportedLanguage, UserProfile } from "../types";
import {
  RESUME_REMINDER_AFTER_MS,
  getLastLearningTime,
  isSameCalendarDay,
  loadReminderHistory,
  pickReminder,
  saveReminderHistory
} from "./reminderContent";

// Android and iOS reminders are scheduled ahead of time with the system so they
// arrive while the app is closed. Every change to the learner's activity or
// reminder settings cancels and reschedules them.

type NotificationPermissionState = "granted" | "denied" | "default" | "unsupported";

const CHANNEL_ID = "reminders";
const STREAK_REMINDER_HOUR = 19;
const STREAK_REMINDER_DAYS = 3;
const QUIET_HOURS_START = 22;
const QUIET_HOURS_END = 8;
const STREAK_IDS = Array.from({ length: STREAK_REMINDER_DAYS }, (_, index) => `sira-streak-${index}`);
const RESUME_ID = "sira-resume";

Notifications.setNotificationHandler({
  handleNotification: async (notification) => {
    // Reminders only matter when the app is closed; accountability nudges also show in the app.
    const show = notification.request.content.data?.kind === "accountability";
    return {
      shouldShowBanner: show,
      shouldShowList: show,
      shouldPlaySound: false,
      shouldSetBadge: false
    };
  }
});

let channelReady: Promise<void> | null = null;
let scheduling: Promise<unknown> = Promise.resolve();

export async function requestIslamicNotificationPermission(): Promise<NotificationPermissionState> {
  const current = await readPermission();

  if (current !== "default") {
    return current;
  }

  const history = loadReminderHistory();
  history.permissionAsked = true;
  saveReminderHistory(history);

  try {
    return toPermissionState(await Notifications.requestPermissionsAsync());
  } catch {
    return "unsupported";
  }
}

export function scheduleIslamicReminderChecks(user: UserProfile, language: SupportedLanguage) {
  // Serialize so a quick run of settings changes can't leave duplicate reminders behind.
  scheduling = scheduling.then(() => rescheduleReminders(user, language)).catch(() => undefined);
  return () => undefined;
}

export async function sendAccountabilityNotification(title: string, body: string, allowPermissionPrompt: boolean) {
  try {
    let permission = await readPermission();

    if (permission === "default" && allowPermissionPrompt) {
      permission = await requestIslamicNotificationPermission();
    }

    if (permission !== "granted") {
      return;
    }

    await ensureChannel();
    await Notifications.scheduleNotificationAsync({
      content: { title, body, data: { kind: "accountability" } },
      trigger: null
    });
  } catch {
    // Keep accountability available even if notifications are unavailable.
  }
}

async function rescheduleReminders(user: UserProfile, language: SupportedLanguage) {
  await Promise.all([...STREAK_IDS, RESUME_ID].map((id) => Notifications.cancelScheduledNotificationAsync(id).catch(() => undefined)));

  const lastLearningAt = getLastLearningTime(user);

  if (!lastLearningAt) {
    return;
  }

  const reminders = user.reminderPreferences;
  const wantsStreak = reminders?.streakReminders !== false;
  const wantsResume = reminders?.islamicReminders !== false;

  if (!wantsStreak && !wantsResume) {
    return;
  }

  let permission = await readPermission();

  if (permission === "default" && loadReminderHistory().permissionAsked !== true) {
    permission = await requestIslamicNotificationPermission();
  }

  if (permission !== "granted") {
    return;
  }

  await ensureChannel();
  const now = Date.now();

  if (wantsStreak) {
    const dates = getStreakReminderDates(lastLearningAt, now);

    await Promise.all(dates.map((date, index) => {
      const message = pickReminder(language, "streak", date);
      return Notifications.scheduleNotificationAsync({
        identifier: STREAK_IDS[index],
        content: { title: message.title, body: message.body, data: { kind: "streak" } },
        trigger: dateTrigger(date)
      });
    }));
  }

  const resumeAt = new Date(lastLearningAt + RESUME_REMINDER_AFTER_MS);

  if (wantsResume && resumeAt.getTime() > now && !isQuietHour(resumeAt)) {
    const message = pickReminder(language, "resume", resumeAt);
    await Notifications.scheduleNotificationAsync({
      identifier: RESUME_ID,
      content: { title: message.title, body: message.body, data: { kind: "resume" } },
      trigger: dateTrigger(resumeAt)
    });
  }
}

// The next few evenings without a lesson: today if nothing is done yet and the
// evening is still ahead, otherwise starting tomorrow.
export function getStreakReminderDates(lastLearningAt: number, now: number) {
  const first = new Date(now);
  first.setHours(STREAK_REMINDER_HOUR, 0, 0, 0);

  if (isSameCalendarDay(lastLearningAt, now) || first.getTime() <= now) {
    first.setDate(first.getDate() + 1);
  }

  return Array.from({ length: STREAK_REMINDER_DAYS }, (_, index) => {
    const date = new Date(first);
    date.setDate(first.getDate() + index);
    return date;
  });
}

function isQuietHour(date: Date) {
  const hour = date.getHours();
  return hour >= QUIET_HOURS_START || hour < QUIET_HOURS_END;
}

function dateTrigger(date: Date): Notifications.DateTriggerInput {
  return {
    type: Notifications.SchedulableTriggerInputTypes.DATE,
    date,
    channelId: CHANNEL_ID
  };
}

function ensureChannel() {
  if (Platform.OS !== "android") {
    return Promise.resolve();
  }

  if (!channelReady) {
    channelReady = Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: "Learning reminders",
      importance: Notifications.AndroidImportance.DEFAULT
    }).then(() => undefined);
  }

  return channelReady;
}

async function readPermission(): Promise<NotificationPermissionState> {
  try {
    return toPermissionState(await Notifications.getPermissionsAsync());
  } catch {
    return "unsupported";
  }
}

function toPermissionState(response: Notifications.NotificationPermissionsStatus): NotificationPermissionState {
  if (response.granted || response.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL) {
    return "granted";
  }

  return response.canAskAgain ? "default" : "denied";
}
