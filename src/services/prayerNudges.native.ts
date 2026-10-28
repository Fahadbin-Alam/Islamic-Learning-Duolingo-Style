import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import type { SupportedLanguage, UserProfile } from "../types";
import { NUDGE_DAYS_AHEAD, planPrayerNudges, prayerNudgeMessage } from "./prayerNudgePlan";
import { PRAYERS, type PrayerNudgePrefs } from "./prayerTimes";

// Prayer-time lesson nudges on Android and iOS: scheduled ahead with the system like the
// come-back reminders, under their own ids so each kind clears only its own. iOS keeps at most
// 64 pending notifications; a few days of five prayers stays well under that.

const CHANNEL_ID = "prayer-lessons";
const MAX_NUDGES = NUDGE_DAYS_AHEAD * PRAYERS.length;
const NUDGE_IDS = Array.from({ length: MAX_NUDGES }, (_, index) => `muslimo-prayer-${index}`);

let channelReady: Promise<void> | null = null;
let scheduling: Promise<unknown> = Promise.resolve();

export function schedulePrayerNudges(prefs: PrayerNudgePrefs, user: UserProfile | undefined, language: SupportedLanguage) {
  // Serialize so a quick run of changes can't leave duplicates behind.
  scheduling = scheduling.then(() => reschedule(prefs, user, language)).catch(() => undefined);
  return scheduling;
}

/** Asks for notification permission when the learner turns prayer lessons on. */
export async function requestPrayerNudgePermission() {
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

/** Calls `onOpen` when the learner taps a prayer nudge, including the tap that launched the app. */
export function onPrayerNudgeOpened(onOpen: () => void) {
  let handled: string | undefined;
  const handle = (response: Notifications.NotificationResponse | null | undefined) => {
    const request = response?.notification.request;
    if (request?.content.data?.kind !== "prayer" || handled === request.identifier + response?.notification.date) {
      return;
    }
    handled = request.identifier + response?.notification.date;
    onOpen();
  };

  try {
    const subscription = Notifications.addNotificationResponseReceivedListener(handle);
    void Notifications.getLastNotificationResponseAsync().then(handle).catch(() => undefined);
    return () => subscription.remove();
  } catch {
    return () => undefined;
  }
}

async function reschedule(prefs: PrayerNudgePrefs, user: UserProfile | undefined, language: SupportedLanguage) {
  await Promise.all(NUDGE_IDS.map((id) => Notifications.cancelScheduledNotificationAsync(id).catch(() => undefined)));

  const nudges = planPrayerNudges(prefs, user, Date.now()).slice(0, MAX_NUDGES);
  if (!nudges.length) {
    return;
  }

  // Only the prayer sheet asks for permission; without it there is nothing to schedule.
  const permission = await Notifications.getPermissionsAsync();
  if (!permission.granted && permission.ios?.status !== Notifications.IosAuthorizationStatus.PROVISIONAL) {
    return;
  }

  await ensureChannel();
  await Promise.all(nudges.map((nudge, index) => {
    const message = prayerNudgeMessage(language, nudge.prayer, nudge.at);
    return Notifications.scheduleNotificationAsync({
      identifier: NUDGE_IDS[index],
      content: { title: message.title, body: message.body, data: { kind: "prayer", prayer: nudge.prayer } },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: nudge.at, channelId: CHANNEL_ID }
    });
  }));
}

function ensureChannel() {
  if (Platform.OS !== "android") {
    return Promise.resolve();
  }

  if (!channelReady) {
    channelReady = Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: "Prayer-time lessons",
      importance: Notifications.AndroidImportance.DEFAULT
    }).then(() => undefined);
  }

  return channelReady;
}
