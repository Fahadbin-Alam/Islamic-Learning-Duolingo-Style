import { findPrayerCity } from "../data/prayerCities";
import type { SupportedLanguage, UserProfile } from "../types";
import { getStoredItem, setStoredItem } from "./appStorage";
import { PRAYERS, PRAYER_LABELS, defaultPrayerNudgePrefs, getPrayerTimes, type PrayerName, type PrayerNudgePrefs } from "./prayerTimes";
import { RESUME_REMINDER_AFTER_MS, getLastLearningTime, isSameCalendarDay } from "./reminderContent";

// Prayer-time lessons: a tiny lesson nudge a little after each salah. The phone
// (prayerNudges.native.ts) schedules them; this file holds the saved setting, the rules and the copy.

const STORAGE_KEY = "sira-path-prayer-nudges";
/** The nudge comes this long after the prayer time begins, once the salah is likely done. */
export const NUDGE_AFTER_PRAYER_MS = 20 * 60 * 1000;
/** Days of nudges kept scheduled; opening the app tops them up. Longer gaps are the come-back reminders' job. */
export const NUDGE_DAYS_AHEAD = 3;
/** No nudge this soon after a lesson, or this close to a come-back reminder. */
const NUDGE_GAP_MS = 60 * 60 * 1000;
/** Nothing in the middle of the night (a very early Fajr in a northern summer). */
const NIGHT_START_HOUR = 23;
const NIGHT_END_HOUR = 5;
/** The come-back reminders' evening slot (islamicNotifications / comebackReminders). */
const EVENING_REMINDER_HOUR = 19;

export function loadPrayerNudgePrefs(): PrayerNudgePrefs {
  const fallback = defaultPrayerNudgePrefs();
  try {
    const parsed = JSON.parse(getStoredItem(STORAGE_KEY) ?? "null");
    if (!parsed || typeof parsed !== "object") {
      return fallback;
    }
    return {
      enabled: parsed.enabled === true,
      cityId: findPrayerCity(parsed.cityId)?.id,
      asr: parsed.asr === "hanafi" || parsed.asr === "standard" ? parsed.asr : undefined,
      prayers: Object.fromEntries(PRAYERS.map((prayer) => [prayer, parsed.prayers?.[prayer] !== false])) as Record<PrayerName, boolean>
    };
  } catch {
    return fallback;
  }
}

export function savePrayerNudgePrefs(prefs: PrayerNudgePrefs) {
  setStoredItem(STORAGE_KEY, JSON.stringify(prefs));
}

export interface PrayerNudge {
  prayer: PrayerName;
  at: Date;
}

/**
 * The nudges to schedule from `now` for the next few days: each chosen prayer's time plus a little,
 * leaving out the night, the hour after a lesson, and the hour around a come-back reminder so the
 * learner never gets two pings at once.
 */
export function planPrayerNudges(prefs: PrayerNudgePrefs, user: UserProfile | undefined, now: number): PrayerNudge[] {
  const city = findPrayerCity(prefs.cityId);
  if (!prefs.enabled || !city) {
    return [];
  }

  const lastLearningAt = user ? getLastLearningTime(user) : undefined;
  const reminders = user?.reminderPreferences;
  const otherReminders = comebackSlots(lastLearningAt, reminders?.streakReminders !== false, reminders?.islamicReminders !== false, now);
  const nudges: PrayerNudge[] = [];

  for (let offset = 0; offset < NUDGE_DAYS_AHEAD; offset += 1) {
    const day = new Date(now);
    day.setHours(12, 0, 0, 0);
    day.setDate(day.getDate() + offset);
    const times = getPrayerTimes(city, day, prefs.asr);

    for (const prayer of PRAYERS) {
      if (!prefs.prayers[prayer]) {
        continue;
      }
      const at = new Date(times[prayer].getTime() + NUDGE_AFTER_PRAYER_MS);
      const time = at.getTime();
      const hour = at.getHours();
      if (time <= now || hour >= NIGHT_START_HOUR || hour < NIGHT_END_HOUR) {
        continue;
      }
      if (lastLearningAt && time >= lastLearningAt && time - lastLearningAt < NUDGE_GAP_MS) {
        continue;
      }
      if (otherReminders.some((slot) => Math.abs(slot - time) < NUDGE_GAP_MS)) {
        continue;
      }
      nudges.push({ prayer, at });
    }
  }

  return nudges;
}

// When the come-back reminders may ring: a few hours after the last lesson, and the evening of
// each later day with no lesson yet. A later lesson reschedules both kinds.
function comebackSlots(lastLearningAt: number | undefined, evening: boolean, resume: boolean, now: number) {
  if (!lastLearningAt) {
    return [];
  }
  const slots: number[] = [];
  if (resume) {
    slots.push(lastLearningAt + RESUME_REMINDER_AFTER_MS);
  }
  if (evening) {
    for (let offset = 0; offset < NUDGE_DAYS_AHEAD; offset += 1) {
      const day = new Date(now);
      day.setHours(EVENING_REMINDER_HOUR, 0, 0, 0);
      day.setDate(day.getDate() + offset);
      if (!isSameCalendarDay(lastLearningAt, day.getTime())) {
        slots.push(day.getTime());
      }
    }
  }
  return slots;
}

// Notification copy. Gentle and kid-safe: an invitation to learn, no talk of sin or missed prayers.
const PRAYER_NAMES: Record<SupportedLanguage, Record<PrayerName, string>> = {
  en: PRAYER_LABELS,
  ar: { fajr: "الفجر", dhuhr: "الظهر", asr: "العصر", maghrib: "المغرب", isha: "العشاء" },
  bn: { fajr: "ফজর", dhuhr: "যোহর", asr: "আসর", maghrib: "মাগরিব", isha: "এশা" },
  ur: { fajr: "فجر", dhuhr: "ظہر", asr: "عصر", maghrib: "مغرب", isha: "عشاء" }
};

const NUDGE_COPY: Record<SupportedLanguage, Array<{ title: string; body: string }>> = {
  en: [
    { title: "After {prayer}: one tiny lesson?", body: "Just two minutes. The camel saved your spot!" },
    { title: "A little learning after {prayer}", body: "Bismillah! A short lesson is waiting on your path." }
  ],
  ar: [
    { title: "بعد {prayer}: درس صغير؟", body: "دقيقتان فقط. الجمل حفظ لك مكانك!" },
    { title: "قليل من التعلم بعد {prayer}", body: "بسم الله! درس قصير ينتظرك في مسارك." }
  ],
  bn: [
    { title: "{prayer}-এর পর একটা ছোট্ট পাঠ?", body: "মাত্র দুই মিনিট। উট তোমার জায়গা ধরে রেখেছে!" },
    { title: "{prayer}-এর পর একটু শেখা", body: "বিসমিল্লাহ! তোমার পথে একটা ছোট পাঠ অপেক্ষা করছে।" }
  ],
  ur: [
    { title: "{prayer} کے بعد ایک چھوٹا سا سبق؟", body: "بس دو منٹ۔ اونٹ نے آپ کی جگہ سنبھال رکھی ہے!" },
    { title: "{prayer} کے بعد تھوڑا سا سیکھنا", body: "بسم اللہ! آپ کے راستے پر ایک مختصر سبق انتظار کر رہا ہے۔" }
  ]
};

/** The two lines alternate through the day so the same words don't come five times in a row. */
export function prayerNudgeMessage(language: SupportedLanguage, prayer: PrayerName, at: Date) {
  const copy = NUDGE_COPY[language] ?? NUDGE_COPY.en;
  const names = PRAYER_NAMES[language] ?? PRAYER_NAMES.en;
  const message = copy[(PRAYERS.indexOf(prayer) + at.getDate()) % copy.length];
  return {
    title: message.title.replace("{prayer}", names[prayer]),
    body: message.body
  };
}
