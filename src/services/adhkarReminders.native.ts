import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import type { SupportedLanguage } from "../types";
import { ADHKAR_REMINDER_TIMES, adhkarReminderMessage } from "./adhkarProgress";

// A reminder every morning and evening for the adhkar, when the learner turns it on in the adhkar sheet. Each is a
// daily repeating notification under its own id, so turning it off or changing language clears only these two.

const CHANNEL_ID = "adhkar";
const TIMES = ["morning", "evening"] as const;
const idFor = (time: (typeof TIMES)[number]) => `muslimo-adhkar-${time}`;

let channelReady: Promise<void> | null = null;
let scheduling: Promise<unknown> = Promise.resolve();

export function scheduleAdhkarReminders(on: boolean, language: SupportedLanguage) {
  // Serialize so a quick run of changes can't leave duplicates behind.
  scheduling = scheduling.then(() => reschedule(on, language)).catch(() => undefined);
  return scheduling;
}

/** Asks for notification permission when the learner turns the reminders on. */
export async function requestAdhkarReminderPermission() {
  try {
    const current = await Notifications.getPermissionsAsync();
    if (current.granted || current.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL) {
      return true;
    }
    if (!current.canAskAgain) {
      return false;
    }
    return (await Notifications.requestPermissionsAsync()).granted;
  } catch {
    return false;
  }
}

/** Calls `onOpen` when the learner taps an adhkar reminder, including the tap that launched the app. */
export function onAdhkarReminderOpened(onOpen: (time: "morning" | "evening") => void) {
  let handled: string | undefined;
  const handle = (response: Notifications.NotificationResponse | null | undefined) => {
    const request = response?.notification.request;
    const time = request?.content.data?.time;
    if (request?.content.data?.kind !== "adhkar" || (time !== "morning" && time !== "evening") || handled === request.identifier + response?.notification.date) {
      return;
    }
    handled = request.identifier + response?.notification.date;
    onOpen(time);
  };

  try {
    const subscription = Notifications.addNotificationResponseReceivedListener(handle);
    void Notifications.getLastNotificationResponseAsync().then(handle).catch(() => undefined);
    return () => subscription.remove();
  } catch {
    return () => undefined;
  }
}

async function reschedule(on: boolean, language: SupportedLanguage) {
  await Promise.all(TIMES.map((time) => Notifications.cancelScheduledNotificationAsync(idFor(time)).catch(() => undefined)));
  if (!on) {
    return;
  }

  // Only the adhkar sheet asks for permission; without it there is nothing to schedule.
  const permission = await Notifications.getPermissionsAsync();
  if (!permission.granted && permission.ios?.status !== Notifications.IosAuthorizationStatus.PROVISIONAL) {
    return;
  }

  await ensureChannel();
  await Promise.all(
    TIMES.map((time) => {
      const message = adhkarReminderMessage(language, time);
      return Notifications.scheduleNotificationAsync({
        identifier: idFor(time),
        content: { title: message.title, body: message.body, data: { kind: "adhkar", time } },
        trigger: { type: Notifications.SchedulableTriggerInputTypes.DAILY, ...ADHKAR_REMINDER_TIMES[time], channelId: CHANNEL_ID }
      });
    })
  );
}

function ensureChannel() {
  if (Platform.OS !== "android") {
    return Promise.resolve();
  }

  if (!channelReady) {
    channelReady = Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: "Morning and evening adhkar",
      importance: Notifications.AndroidImportance.DEFAULT
    }).then(() => undefined);
  }

  return channelReady;
}
