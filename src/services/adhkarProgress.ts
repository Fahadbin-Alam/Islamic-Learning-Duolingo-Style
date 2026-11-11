import type { AdhkarTime } from "../data/adhkar";
import { localDayNumber } from "../data/dailyCard";
import type { SupportedLanguage } from "../types";
import { getStoredItem, setStoredItem } from "./appStorage";

// Which adhkar lists the learner finished today, and whether they want a reminder each morning and evening.
// Both stay on this device only.

const DONE_KEY = "sira-path-adhkar-done";
const REMINDER_KEY = "sira-path-adhkar-reminders";
const TIMES: readonly AdhkarTime[] = ["morning", "evening", "sleep"];

/** The lists finished on the given day (today by default). */
export function adhkarDoneToday(date: Date = new Date()): AdhkarTime[] {
  try {
    const saved = JSON.parse(getStoredItem(DONE_KEY) ?? "null");
    if (!saved || saved.day !== localDayNumber(date) || !Array.isArray(saved.done)) return [];
    return TIMES.filter((time) => saved.done.includes(time));
  } catch {
    return [];
  }
}

/** Marks a list finished today and gives back every list finished today. */
export function markAdhkarDone(time: AdhkarTime, date: Date = new Date()): AdhkarTime[] {
  const done = adhkarDoneToday(date);
  const next = done.includes(time) ? done : TIMES.filter((item) => item === time || done.includes(item));
  setStoredItem(DONE_KEY, JSON.stringify({ day: localDayNumber(date), done: next }));
  return next;
}

export function adhkarRemindersOn() {
  return getStoredItem(REMINDER_KEY) === "on";
}

export function saveAdhkarReminders(on: boolean) {
  setStoredItem(REMINDER_KEY, on ? "on" : "off");
}

/** When the reminders come: 7:00 for the morning adhkar, 17:30 for the evening ones (after Asr in most places). */
export const ADHKAR_REMINDER_TIMES = { morning: { hour: 7, minute: 0 }, evening: { hour: 17, minute: 30 } } as const;

type ReminderCopy = Record<"morning" | "evening", { title: string; body: string }>;

const REMINDER_COPY: Record<SupportedLanguage, ReminderCopy> = {
  en: {
    morning: { title: "Good morning! ☀️", body: "Your morning adhkar take five minutes. The camel already started the three Quls without you!" },
    evening: { title: "Evening adhkar time 🌙", body: "Three Quls, three times. Your shield for the night is one tap away." }
  },
  bn: {
    morning: { title: "শুভ সকাল! ☀️", body: "সকালের জিকির মাত্র পাঁচ মিনিটের। উট তো তিন কুল পড়া শুরু করে দিয়েছে!" },
    evening: { title: "সন্ধ্যার জিকিরের সময় 🌙", body: "তিন কুল, তিনবার করে। রাতের সুরক্ষা মাত্র এক ট্যাপ দূরে।" }
  },
  ur: {
    morning: { title: "صبح بخیر! ☀️", body: "صبح کے اذکار بس پانچ منٹ کے ہیں۔ اونٹ تو تینوں قل پڑھنے بھی لگا!" },
    evening: { title: "شام کے اذکار کا وقت 🌙", body: "تینوں قل، تین تین بار۔ رات کی حفاظت بس ایک ٹیپ دور ہے۔" }
  },
  ar: {
    morning: { title: "صباح الخير! ☀️", body: "أذكار الصباح خمس دقائق فقط. الجمل بدأ بالمعوذات قبلك!" },
    evening: { title: "حان وقت أذكار المساء 🌙", body: "المعوذات ثلاث مرات. حصنك لهذه الليلة على بُعد لمسة." }
  }
};

export function adhkarReminderMessage(language: SupportedLanguage, time: "morning" | "evening") {
  return (REMINDER_COPY[language] ?? REMINDER_COPY.en)[time];
}
