import type { SupportedLanguage, UserProfile } from "../types";
import { getStoredItem, setStoredItem } from "./appStorage";

// Reminder copy and history shared by the web and phone reminder implementations.

export type ReminderKind = "streak" | "resume";

export interface ReminderHistory {
  permissionAsked?: boolean;
  lastStreakReminderDate?: string;
  lastResumeReminderDate?: string;
}

const STORAGE_KEY = "sira-path-islamic-reminder-history";
export const RESUME_REMINDER_AFTER_MS = 6 * 60 * 60 * 1000;

const REMINDER_COPY: Record<SupportedLanguage, Record<ReminderKind, Array<{ title: string; body: string }>>> = {
  en: {
    streak: [
      {
        title: "As-salamu alaykum - keep your streak alive",
        body: "A small lesson today can bring barakah. Open Muslimo and keep your streak moving."
      },
      {
        title: "Your streak is waiting",
        body: "Bismillah. Return to your path, earn stars, and keep learning for Allah's sake."
      }
    ],
    resume: [
      {
        title: "Resume your lesson path",
        body: "Your next circle is waiting. Open the app and continue where you left off."
      },
      {
        title: "Come back for a little khayr",
        body: "Even a short lesson can fill the day with benefit. Return and keep learning."
      }
    ]
  },
  ar: {
    streak: [
      {
        title: "السلام عليكم - حافظ على سلسلتك",
        body: "درس صغير اليوم قد يكون فيه بركة. افتح Muslimo وواصل سلسلتك."
      },
      {
        title: "سلسلتك تنتظرك",
        body: "بسم الله. ارجع إلى مسارك واجمع النجوم وواصل التعلم لله."
      }
    ],
    resume: [
      {
        title: "ارجع إلى مسار الدروس",
        body: "الدائرة التالية تنتظرك. افتح التطبيق وواصل من حيث توقفت."
      },
      {
        title: "عد لشيء من الخير",
        body: "حتى الدرس القصير قد يملأ يومك بالنفع. ارجع وواصل التعلم."
      }
    ]
  },
  bn: {
    streak: [
      {
        title: "আসসালামু আলাইকুম - স্ট্রিক ধরে রাখুন",
        body: "আজ একটি ছোট পাঠেও বরকত থাকতে পারে। Muslimo খুলে স্ট্রিক চালিয়ে যান।"
      },
      {
        title: "আপনার স্ট্রিক অপেক্ষা করছে",
        body: "বিসমিল্লাহ। আবার ফিরে এসে স্টার নিন আর আল্লাহর জন্য শিখতে থাকুন।"
      }
    ],
    resume: [
      {
        title: "আপনার পাঠের পথে ফিরুন",
        body: "পরের সার্কেলটি আপনার জন্য অপেক্ষা করছে। অ্যাপ খুলে যেখানে থেমেছিলেন সেখান থেকে চালান।"
      },
      {
        title: "অল্প একটু খায়ের জন্য ফিরে আসুন",
        body: "একটি ছোট পাঠও দিনের মধ্যে উপকার আনতে পারে। ফিরে এসে শিখতে থাকুন।"
      }
    ]
  },
  ur: {
    streak: [
      {
        title: "السلام علیکم - اپنی اسٹریک قائم رکھیں",
        body: "آج کا ایک چھوٹا سبق بھی برکت لا سکتا ہے۔ Muslimo کھولیں اور اپنی اسٹریک جاری رکھیں۔"
      },
      {
        title: "آپ کی اسٹریک آپ کا انتظار کر رہی ہے",
        body: "بسم اللہ۔ واپس آئیں، ستارے کمائیں اور اللہ کے لیے سیکھتے رہیں۔"
      }
    ],
    resume: [
      {
        title: "اپنے سبق کے راستے پر واپس آئیں",
        body: "اگلا دائرہ آپ کا انتظار کر رہا ہے۔ ایپ کھولیں اور وہیں سے جاری رکھیں جہاں آپ رکے تھے۔"
      },
      {
        title: "تھوڑے سے خیر کے لیے واپس آئیں",
        body: "چھوٹا سا سبق بھی دن میں فائدہ بھر سکتا ہے۔ واپس آئیں اور سیکھتے رہیں۔"
      }
    ]
  }
};

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

export function pickReminder(language: SupportedLanguage, kind: ReminderKind, at = new Date()) {
  const copy = REMINDER_COPY[language] ?? REMINDER_COPY.en;
  const list = copy[kind];
  return list[at.getDate() % list.length];
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
