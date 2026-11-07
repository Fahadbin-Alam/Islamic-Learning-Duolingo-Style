import { findPrayerCity } from "../data/prayerCities";
import { ramadanSeason } from "../data/ramadanCalendar";
import type { SupportedLanguage } from "../types";
import { getPrayerTimes, type PrayerNudgePrefs } from "./prayerTimes";

// Suhoor and iftar reminders for Ramadan: a ping a while before Fajr (time to eat suhoor) and a few minutes before
// Maghrib (iftar is close), on the days of Ramadan only. They use the city from the prayer-time sheet and are
// scheduled next to the prayer nudges (prayerNudges.native.ts). Off until the learner turns them on.

export type RamadanReminderKind = "suhoor" | "iftar";

export interface RamadanReminder {
  kind: RamadanReminderKind;
  at: Date;
  /** The day of Ramadan it falls on, 1 to 30. */
  day: number;
}

/** Suhoor reminder: this long before Fajr, enough time to wake up and eat. */
export const SUHOOR_BEFORE_FAJR_MS = 40 * 60 * 1000;
/** Iftar reminder: this long before Maghrib, enough to sit down with dates and water. */
export const IFTAR_BEFORE_MAGHRIB_MS = 10 * 60 * 1000;
/** Days kept scheduled; opening the app tops them up, like the prayer nudges. */
export const RAMADAN_REMINDER_DAYS = 3;

export function planRamadanReminders(prefs: PrayerNudgePrefs, now: number): RamadanReminder[] {
  const city = findPrayerCity(prefs.cityId);
  if (!prefs.ramadan || !city) {
    return [];
  }

  const reminders: RamadanReminder[] = [];
  for (let offset = 0; offset < RAMADAN_REMINDER_DAYS; offset += 1) {
    const day = new Date(now);
    day.setHours(12, 0, 0, 0);
    day.setDate(day.getDate() + offset);
    const season = ramadanSeason(day);
    if (season?.phase !== "ramadan") {
      continue;
    }
    const times = getPrayerTimes(city, day, prefs.asr);
    const slots: Array<[RamadanReminderKind, number]> = [
      ["suhoor", times.fajr.getTime() - SUHOOR_BEFORE_FAJR_MS],
      ["iftar", times.maghrib.getTime() - IFTAR_BEFORE_MAGHRIB_MS]
    ];
    for (const [kind, time] of slots) {
      if (time > now) {
        reminders.push({ kind, at: new Date(time), day: season.day });
      }
    }
  }
  return reminders;
}

// The copy. Each body is a sahih hadith already in the Ramadan path (ramadanDays.ts, checked on sunnah.com):
// Sahih al-Bukhari 1923 for suhoor and 1957 for iftar. English is sunnah.com's word for word; Arabic is the
// hadith's own words; Bengali and Urdu give its meaning.
const COPY: Record<SupportedLanguage, Record<RamadanReminderKind, { titles: string[]; body: string }>> = {
  en: {
    suhoor: {
      titles: ["🌙 Suhoor time, day {day}!", "🐪 Wake up for suhoor! Even the camel is up"],
      body: "\"Take Suhur as there is a blessing in it.\" (Sahih al-Bukhari 1923)"
    },
    iftar: {
      titles: ["🌅 Iftar is close, day {day}!", "🐪 Iftar soon! The camel already has the dates out"],
      body: "\"The people will remain on the right path as long as they hasten the breaking of the fast.\" (Sahih al-Bukhari 1957)"
    }
  },
  ar: {
    suhoor: {
      titles: ["🌙 وقت السحور، اليوم {day}!", "🐪 قم للسحور! حتى الجمل استيقظ"],
      body: "«تَسَحَّرُوا فَإِنَّ فِي السَّحُورِ بَرَكَةً» (صحيح البخاري 1923)"
    },
    iftar: {
      titles: ["🌅 اقترب الإفطار، اليوم {day}!", "🐪 الإفطار قريب! الجمل أخرج التمر"],
      body: "«لاَ يَزَالُ النَّاسُ بِخَيْرٍ مَا عَجَّلُوا الْفِطْرَ» (صحيح البخاري 1957)"
    }
  },
  bn: {
    suhoor: {
      titles: ["🌙 সাহরির সময়, দিন {day}!", "🐪 সাহরির জন্য ওঠো! উটও জেগে গেছে"],
      body: "\"তোমরা সাহরি খাও, কারণ সাহরিতে বরকত আছে।\" (সহীহ বুখারী ১৯২৩)"
    },
    iftar: {
      titles: ["🌅 ইফতার কাছে, দিন {day}!", "🐪 ইফতার আসছে! উট খেজুর বের করে ফেলেছে"],
      body: "\"মানুষ ততদিন কল্যাণে থাকবে, যতদিন তারা তাড়াতাড়ি ইফতার করবে।\" (সহীহ বুখারী ১৯৫৭)"
    }
  },
  ur: {
    suhoor: {
      titles: ["🌙 سحری کا وقت، دن {day}!", "🐪 سحری کے لیے اٹھیں! اونٹ بھی جاگ گیا"],
      body: "\"سحری کھاؤ، کیونکہ سحری میں برکت ہے۔\" (صحیح بخاری 1923)"
    },
    iftar: {
      titles: ["🌅 افطار قریب ہے، دن {day}!", "🐪 افطار قریب! اونٹ نے کھجوریں نکال لیں"],
      body: "\"لوگ اس وقت تک بھلائی پر رہیں گے جب تک افطار میں جلدی کریں گے۔\" (صحیح بخاری 1957)"
    }
  }
};

/** The two titles take turns day by day so the same words don't come every morning. */
export function ramadanReminderMessage(language: SupportedLanguage, reminder: RamadanReminder) {
  const copy = (COPY[language] ?? COPY.en)[reminder.kind];
  return {
    title: copy.titles[reminder.day % copy.titles.length].replace("{day}", String(reminder.day)),
    body: copy.body
  };
}
