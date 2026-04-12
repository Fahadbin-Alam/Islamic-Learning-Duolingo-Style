import type { SupportedLanguage, UserProfile } from "../types";

type ReminderKind = "streak" | "resume";
type NotificationPermissionState = NotificationPermission | "unsupported";

interface ReminderHistory {
  permissionAsked?: boolean;
  lastStreakReminderDate?: string;
  lastResumeReminderDate?: string;
}

const STORAGE_KEY = "sira-path-islamic-reminder-history";
const CHECK_INTERVAL_MS = 5 * 60 * 1000;
const RESUME_REMINDER_AFTER_MS = 6 * 60 * 60 * 1000;

const REMINDER_COPY: Record<SupportedLanguage, Record<ReminderKind, Array<{ title: string; body: string }>>> = {
  en: {
    streak: [
      {
        title: "As-salamu alaykum - keep your streak alive",
        body: "A small lesson today can bring barakah. Open Sira Path and keep your streak moving."
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
  fr: {
    streak: [
      {
        title: "As-salamu alaykum - gardez votre serie",
        body: "Une petite lecon aujourd'hui peut apporter de la baraka. Ouvrez Sira Path et continuez votre serie."
      },
      {
        title: "Votre serie vous attend",
        body: "Bismillah. Revenez sur votre parcours, gagnez des etoiles et continuez pour Allah."
      }
    ],
    resume: [
      {
        title: "Reprenez votre parcours",
        body: "Votre prochain cercle vous attend. Ouvrez l'application et reprenez ou vous vous etiez arrete."
      },
      {
        title: "Revenez pour un petit bien",
        body: "Meme une courte lecon peut remplir la journee de bienfaits. Revenez apprendre."
      }
    ]
  },
  ar: {
    streak: [
      {
        title: "السلام عليكم - حافظ على سلسلتك",
        body: "درس صغير اليوم قد يكون فيه بركة. افتح سيرة باث وواصل سلسلتك."
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
        body: "আজ একটি ছোট পাঠেও বরকত থাকতে পারে। Sira Path খুলে স্ট্রিক চালিয়ে যান।"
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
        body: "آج کا ایک چھوٹا سبق بھی برکت لا سکتا ہے۔ Sira Path کھولیں اور اپنی اسٹریک جاری رکھیں۔"
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
  },
  hi: {
    streak: [
      {
        title: "अस्सलामु अलैकुम - अपनी स्ट्रीक बनाए रखें",
        body: "आज का एक छोटा पाठ भी बरकत ला सकता है। Sira Path खोलिए और अपनी स्ट्रीक जारी रखिए।"
      },
      {
        title: "आपकी स्ट्रीक आपका इंतजार कर रही है",
        body: "बिस्मिल्लाह। वापस आइए, सितारे पाइए और अल्लाह के लिए सीखते रहिए।"
      }
    ],
    resume: [
      {
        title: "अपने पाठ वाले रास्ते पर लौटिए",
        body: "अगला सर्कल आपका इंतजार कर रहा है। ऐप खोलिए और वहीं से जारी रखिए जहां आप रुके थे।"
      },
      {
        title: "थोड़े से खैर के लिए लौटिए",
        body: "एक छोटा पाठ भी दिन में फायदा ला सकता है। लौटिए और सीखते रहिए।"
      }
    ]
  }
};

export async function requestIslamicNotificationPermission() {
  if (typeof window === "undefined" || typeof Notification === "undefined") {
    return "unsupported" as NotificationPermissionState;
  }

  if (Notification.permission === "granted" || Notification.permission === "denied") {
    return Notification.permission;
  }

  const history = loadHistory();
  history.permissionAsked = true;
  saveHistory(history);

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

  const history = loadHistory();
  const today = formatLocalDateKey(Date.now());
  const reminders = user.reminderPreferences;
  let kind: ReminderKind | undefined;

  if (reminders?.streakReminders !== false && !isSameCalendarDay(lastLearningAt, Date.now()) && history.lastStreakReminderDate !== today) {
    kind = "streak";
  } else if (reminders?.islamicReminders !== false && Date.now() - lastLearningAt >= RESUME_REMINDER_AFTER_MS && history.lastResumeReminderDate !== today) {
    kind = "resume";
  }

  if (!kind) {
    return false;
  }

  const permission = await ensurePermission(history.permissionAsked === true);

  if (permission !== "granted") {
    return false;
  }

  if (typeof document !== "undefined" && document.visibilityState === "visible") {
    return false;
  }

  const message = pickReminder(language, kind);
  new Notification(message.title, { body: message.body });

  if (kind === "streak") {
    history.lastStreakReminderDate = today;
  } else {
    history.lastResumeReminderDate = today;
  }

  saveHistory(history);
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

function getLastLearningTime(user: UserProfile) {
  const raw = user.lastLearningAt ?? user.lastLoginAt;

  if (!raw) {
    return 0;
  }

  const timestamp = new Date(raw).getTime();
  return Number.isFinite(timestamp) ? timestamp : 0;
}

function isSameCalendarDay(left: number, right: number) {
  return formatLocalDateKey(left) === formatLocalDateKey(right);
}

function pickReminder(language: SupportedLanguage, kind: ReminderKind) {
  const copy = REMINDER_COPY[language] ?? REMINDER_COPY.en;
  const list = copy[kind];
  return list[new Date().getDate() % list.length];
}

function loadHistory(): ReminderHistory {
  if (typeof window === "undefined" || !window.localStorage) {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ReminderHistory) : {};
  } catch {
    return {};
  }
}

function saveHistory(history: ReminderHistory) {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

function formatLocalDateKey(value: number) {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}
