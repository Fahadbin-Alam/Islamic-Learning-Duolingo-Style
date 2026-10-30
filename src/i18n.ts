import { getCatalog } from "./translations";
import type { SupportedLanguage, TopicId } from "./types";

export interface LanguageOption {
  id: SupportedLanguage;
  code: string;
  label: string;
  nativeLabel: string;
}

export interface UiStrings {
  loadingPath: string;
  streak: string;
  account: string;
  save: string;
  logIn: string;
  crew: string;
  battle: string;
  hearts: string;
  language: string;
  chooseTopic: string;
  tapTopic: string;
  chooseBranch: string;
  tapBranch: string;
  branch: string;
  lessons: string;
  guideMoment: string;
  guideMomentCopy: string;
  learnTopic: string;
  continueTopic: string;
  xpToday: string;
  heartShop: string;
  keepLearning: string;
  membershipActive: string;
  youHave: string;
  backToPath: string;
  sourceNotes: string;
  reference: string;
  from: string;
  grade: string;
  openSource: string;
  correct: string;
  notQuite: string;
  continue: string;
  check: string;
  pickAnswer: string;
  stars: string;
  starsInPart: string;
  starsForPart: string;
  keepYourProgress: string;
  havingFun: string;
  welcomeBack: string;
  createCopy: string;
  loginCopy: string;
  settings: string;
  accountSettingsTitle: string;
  accountSettingsCopy: string;
  createAccount: string;
  iAmChild: string;
  iAmParent: string;
  regularLearner: string;
  regularLearnerCopy: string;
  childMode: string;
  childModeCopy: string;
  parentMode: string;
  parentModeCopy: string;
  yourName: string;
  emailAddress: string;
  createPassword: string;
  password: string;
  savedAccountHint: string;
  socialHint: string;
  reminderSettings: string;
  dailyReminder: string;
  weeklyReminder: string;
  personalReminderSettings: string;
  streakReminder: string;
  islamicReminder: string;
  notificationHelp: string;
  later: string;
  firstHeartReset: string;
  outOfHearts: string;
  reviewCopy: string;
  oneTimeRefill: string;
  reviewRestoreCopy: string;
  maybeLater: string;
  iLeft5Stars: string;
  languageEyebrow: string;
  languageTitle: string;
  languageCopy: string;
  saveLanguage: string;
  changeLanguage: string;
  saveSettings: string;
}

export const DEFAULT_LANGUAGE: SupportedLanguage = "en";

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { id: "en", code: "EN", label: "English", nativeLabel: "English" },
  { id: "ar", code: "AR", label: "Arabic", nativeLabel: "العربية" },
  { id: "bn", code: "BN", label: "Bengali", nativeLabel: "বাংলা" },
  { id: "ur", code: "UR", label: "Urdu", nativeLabel: "اردو" }
];

const UI_STRINGS: UiStrings = {
  loadingPath: "Preparing your learning path...",
  streak: "Streak",
  account: "Account",
  save: "Save",
  logIn: "Log in",
  crew: "Ummah",
  battle: "Battle",
  hearts: "Hearts",
  language: "Language",
  chooseTopic: "Choose a topic",
  tapTopic: "Tap one and move through its circles.",
  chooseBranch: "Choose a branch",
  tapBranch: "Pick the path you want to go deeper in.",
  branch: "Branch",
  lessons: "lessons",
  guideMoment: "Guide moment",
  guideMomentCopy: "Tap the bright button and keep moving.",
  learnTopic: "Learn",
  continueTopic: "Continue topic",
  xpToday: "XP today",
  heartShop: "Heart shop",
  keepLearning: "Keep learning",
  membershipActive: "Membership is active. Hearts stay full.",
  youHave: "You have",
  backToPath: "Back to path",
  sourceNotes: "Source notes",
  reference: "Reference",
  from: "From",
  grade: "Grade",
  openSource: "Open source",
  correct: "Correct",
  notQuite: "Not quite",
  continue: "Continue",
  check: "Check",
  pickAnswer: "Pick the answer that matches best.",
  stars: "stars",
  starsInPart: "Stars in this part",
  starsForPart: "stars for this part",
  keepYourProgress: "Keep your progress",
  havingFun: "Having fun learning?",
  welcomeBack: "Welcome back",
  createCopy: "Create an account to save your progress, stars, streak, and lesson path.",
  loginCopy: "Log in to pick up your path, stars, and streak right where you left them.",
  settings: "Settings",
  accountSettingsTitle: "Choose your account mode",
  accountSettingsCopy: "Family mode is optional. Adults can keep this as a regular learning account and skip parent or learner tools.",
  createAccount: "Create account",
  iAmChild: "I am a learner",
  iAmParent: "I am a parent",
  regularLearner: "Regular learner",
  regularLearnerCopy: "Best for adults and anyone learning on their own.",
  childMode: "Learner mode",
  childModeCopy: "Lets a parent follow progress and send accountability reminders.",
  parentMode: "Parent mode",
  parentModeCopy: "Gives you accountability tools to support a learner.",
  yourName: "Your name",
  emailAddress: "Email address",
  createPassword: "Create a password",
  password: "Password",
  savedAccountHint: "This device already has a saved account, so you can log in any time.",
  socialHint: "Google and Facebook are ready for your app IDs in config when you want to turn them on.",
  reminderSettings: "Accountability reminders",
  dailyReminder: "Remind me if a connected account misses today",
  weeklyReminder: "Remind me if a connected account is away for a week",
  personalReminderSettings: "Islamic app reminders",
  streakReminder: "Send me a streak reminder if I have not learned today",
  islamicReminder: "Send me Islamic nudges to come back and keep learning",
  notificationHelp: "Reminders arrive as notifications on your phone, or in your browser on the web. You can turn them off any time.",
  later: "Later",
  firstHeartReset: "First heart reset",
  outOfHearts: "Out of hearts?",
  reviewCopy: "Leave a 5-star review on the App Store or Play Store, then tap restore to refill your hearts one time.",
  oneTimeRefill: "One-time refill",
  reviewRestoreCopy: "This only appears the first time someone runs out of hearts.",
  maybeLater: "Maybe later",
  iLeft5Stars: "I left 5 stars",
  languageEyebrow: "Your language",
  languageTitle: "Which language do you prefer?",
  languageCopy: "Pick the language you want for the app. You can change it later too.",
  saveLanguage: "Save language",
  changeLanguage: "Change language",
  saveSettings: "Save settings"
};

const TOPIC_COPY: Record<TopicId, { title: string; description: string; focus: string; badge: string }> = {
  foundation: { title: "Foundation", description: "The first Muslim habits: greeting with peace, praising Allah, saying Bismillah, and answering people well.", focus: "Salam, Alhamdulillah, Bismillah, everyday phrases, and gentle replies.", badge: "Start Here" },
  prayer: { title: "Prayer", description: "Get ready with wudu, then learn salah step by step the Sunnah way from opening takbir to final taslim.", focus: "Purity, calm preparation, recitation, ruku, sujud, tashahhud, and taslim.", badge: "Prayer Basics" },
  aqidah: { title: "Aqidah and Iman", description: "Build tawhid, the pillars of iman, Allah's names, qadar, and a lived belief worldview.", focus: "Tawhid, iman, names and attributes, qadar, and steady faith.", badge: "Belief World" },
  fasting: { title: "Fasting", description: "Learn Ramadan from purpose and timing to discipline, protection, and long-term growth.", focus: "Taqwa, suhur, iftar, invalidators, nights, and Ramadan growth.", badge: "Ramadan World" },
  zakat: { title: "Zakat", description: "Learn wealth purification, recipient categories, sincerity, and responsible generosity.", focus: "Duty, recipients, purification, intention, and giving well.", badge: "Wealth World" },
  hajj: { title: "Hajj", description: "Travel through obligation, rites, sacred stations, and the lessons of pilgrimage.", focus: "Ability, ihram, tawaf, Arafah, Mina, and lifelong lessons.", badge: "Journey World" },
  manners: { title: "Manners", description: "Daily adab for speech, family, mercy, and the way Muslims carry themselves.", focus: "Spread peace, speak truth, honor parents, show mercy, and eat with adab.", badge: "Topic 2" },
  marriage: { title: "Marriage", description: "Learn the Islamic purpose of marriage, how to choose well, and how mercy and kindness build a home.", focus: "Righteous choices, mercy, kindness, rights, and building a peaceful home.", badge: "Topic 3" },
  sahabah: { title: "Sahabah", description: "Deep companion units that grow through biography, virtue, judgment, review, and mastery.", focus: "Abu Bakr, Umar, Uthman, Ali, Bilal, Khalid, and more companions over long-form lesson paths.", badge: "Companion World" },
  prophets: { title: "Lives of the Prophets", description: "Travel from Adam to Muhammad and learn the big lessons each prophet left for the Ummah.", focus: "Creation, patience, trust, forgiveness, courage, mercy, and the final example.", badge: "Topic 6" },
  women_of_the_book: { title: "Great Women", description: "Women of the Quran, the Mothers of the Believers and the Prophet's ﷺ family.", focus: "Repentance, trust, courage, purity, knowledge, and preserving revelation.", badge: "Topic 7" },
  quran_tafseer: { title: "Quran and Tafseer", description: "Short lessons on verses, tafsir, and the big meanings Allah wants believers to hold onto.", focus: "Guidance, oneness, protection, patience, and learning to reflect on the Quran.", badge: "Topic 5" },
  hadith: { title: "Hadith", description: "Narrations of the Prophet ﷺ with their references, one hadith at a time.", focus: "The words of the Prophet ﷺ, where they are recorded, and what they teach.", badge: "Topic 8" },
  scholars: { title: "Scholars", description: "The four imams and later scholars, shown as a family tree of who learned from whom.", focus: "Abu Hanifah, Malik, ash-Shafi'i, Ahmad, Ibn Taymiyyah, Ibn Baz and al-Albani.", badge: "Topic 9" },
  ramadan: { title: "Ramadan", description: "A 30-day Ramadan path: one short lesson for each day of the month.", focus: "Fasting with faith, suhur and iftar, good deeds, the last ten nights and Eid.", badge: "Ramadan mode" },
  intro: { title: "New to Islam", description: "A gentle start for anyone new to Islam: what Muslims believe, the prophets you may know, and first steps.", focus: "One God, the Quran, Jesus and the prophets, living side by side, and first steps as a Muslim.", badge: "Beginners" }
};

let activeLanguage: SupportedLanguage = DEFAULT_LANGUAGE;

// The language every t() call uses. TopicApp sets it from the learner's saved choice before it renders.
export function setActiveLanguage(language: SupportedLanguage) {
  activeLanguage = language;
}

export function getActiveLanguage() {
  return activeLanguage;
}

export function isRtlLanguage(language: SupportedLanguage = activeLanguage) {
  return language === "ar" || language === "ur";
}

type TranslationValues = Record<string, string | number>;

// Translates an English string through the language's catalog. Strings without a translation stay in
// English. Placeholders like {count} are filled from values after translating.
export function t(text: string, values?: TranslationValues, language: SupportedLanguage = activeLanguage) {
  const template = language === DEFAULT_LANGUAGE ? text : getCatalog(language)[text] ?? text;

  if (!values) {
    return template;
  }

  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}

export function hasTranslation(text: string, language: SupportedLanguage) {
  return language === DEFAULT_LANGUAGE || text in getCatalog(language);
}

export function getUiStrings(language: SupportedLanguage = activeLanguage) {
  const safeHeartRestoreCopy = {
    firstHeartReset: "First mercy refill",
    reviewCopy: "Use this one-time refill to get back into your lesson path right away.",
    oneTimeRefill: "One-time mercy refill",
    reviewRestoreCopy: "After this first refill, you can use the heart shop, a membership, or a sponsor reward to keep going.",
    iLeft5Stars: "Use refill now"
  };
  const english: UiStrings = { ...UI_STRINGS, ...safeHeartRestoreCopy };

  return Object.fromEntries(
    Object.entries(english).map(([key, value]) => [key, t(value, undefined, language)])
  ) as unknown as UiStrings;
}

export function getLanguageOption(language: SupportedLanguage) {
  return LANGUAGE_OPTIONS.find((option) => option.id === language) ?? LANGUAGE_OPTIONS[0];
}

export function getTopicCopy(topicId: TopicId, language: SupportedLanguage = activeLanguage) {
  const copy = TOPIC_COPY[topicId];

  return {
    title: t(copy.title, undefined, language),
    description: t(copy.description, undefined, language),
    focus: t(copy.focus, undefined, language),
    badge: t(copy.badge, undefined, language)
  };
}

export function getNodeTitle(_nodeId: string, fallback: string, language: SupportedLanguage = activeLanguage) {
  return t(fallback, undefined, language);
}

// Bangla, Urdu and Arabic are machine translated and still need a native speaker's review.
export const LANGUAGE_PICKER_ENABLED = true;

/** The phone's (or browser's) language when the app offers it, else undefined. */
export function deviceLanguage(): SupportedLanguage | undefined {
  try {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale.toLowerCase();
    const option = LANGUAGE_OPTIONS.find((item) => item.id !== DEFAULT_LANGUAGE && locale.split("-")[0] === item.id);
    return option?.id;
  } catch {
    return undefined;
  }
}

export function normalizeLanguage(language?: string, pickerEnabled = LANGUAGE_PICKER_ENABLED): SupportedLanguage {
  if (!pickerEnabled) {
    return DEFAULT_LANGUAGE;
  }

  return LANGUAGE_OPTIONS.some((option) => option.id === language) ? (language as SupportedLanguage) : DEFAULT_LANGUAGE;
}
