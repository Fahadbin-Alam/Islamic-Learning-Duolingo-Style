import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import type { SupportedLanguage, UserProfile } from "../types";
import { COMEBACK_DAYS, comebackMessage, messageVariant, stepForDay, type ComebackStep } from "./comebackReminders";
import {
  RESUME_REMINDER_AFTER_MS,
  getLastLearningTime,
  isSameCalendarDay,
  loadReminderHistory,
  saveReminderHistory
} from "./reminderContent";

// Android and iOS reminders are scheduled ahead of time with the system so they
// arrive while the app is closed. Every change to the learner's activity or
// reminder settings cancels and reschedules them.

type NotificationPermissionState = "granted" | "denied" | "default" | "unsupported";

const CHANNEL_ID = "reminders";
const EVENING_REMINDER_HOUR = 19;
const QUIET_HOURS_START = 22;
const QUIET_HOURS_END = 8;
const COMEBACK_IDS = COMEBACK_DAYS.map((day) => `sira-comeback-${day}`);
// Ids used by builds before the come-back ladder, cancelled so updated phones don't get both.
const OLD_IDS = ["sira-streak-0", "sira-streak-1", "sira-streak-2"];
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
  await Promise.all([...OLD_IDS, ...COMEBACK_IDS, RESUME_ID].map((id) => Notifications.cancelScheduledNotificationAsync(id).catch(() => undefined)));

  const lastLearningAt = getLastLearningTime(user);

  if (!lastLearningAt) {
    return;
  }

  const now = Date.now();
  const slots = getComebackSlots(lastLearningAt, now, user.reminderPreferences);

  if (slots.length === 0) {
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
  await Promise.all(slots.map((slot) => {
    const message = comebackMessage(language, slot.step, messageVariant(lastLearningAt), { streakDays: user.streakDays, streakFreezes: user.streakFreezes });
    return Notifications.scheduleNotificationAsync({
      identifier: slot.id,
      content: { title: message.title, body: message.body, data: { kind: slot.step === "streak" ? "streak" : "resume", step: slot.step } },
      trigger: dateTrigger(slot.at)
    });
  }));
}

export interface ComebackSlot {
  id: string;
  step: ComebackStep;
  at: Date;
}

// Everything still ahead for a learner who stops now: a nudge a few hours after an unfinished
// day, then one evening reminder on days 1, 2, 3, 5, 7, 14 and 30 after the last lesson's day,
// each sillier than the last. Day 1 is the streak reminder; the rest are come-back nudges.
export function getComebackSlots(lastLearningAt: number, now: number, preferences?: UserProfile["reminderPreferences"]) {
  const wantsStreak = preferences?.streakReminders !== false;
  const wantsComeback = preferences?.islamicReminders !== false;
  const slots: ComebackSlot[] = [];
  const resumeAt = new Date(lastLearningAt + RESUME_REMINDER_AFTER_MS);

  if (wantsComeback && resumeAt.getTime() > now && !isQuietHour(resumeAt) && isSameCalendarDay(resumeAt.getTime(), lastLearningAt)) {
    slots.push({ id: RESUME_ID, step: "resume", at: resumeAt });
  }

  COMEBACK_DAYS.forEach((day, index) => {
    const step = stepForDay(day)!;

    if (step === "streak" ? !wantsStreak : !wantsComeback) {
      return;
    }

    const at = new Date(lastLearningAt);
    at.setHours(EVENING_REMINDER_HOUR, 0, 0, 0);
    at.setDate(at.getDate() + day);

    if (at.getTime() > now) {
      slots.push({ id: COMEBACK_IDS[index], step, at });
    }
  });

  return slots;
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
