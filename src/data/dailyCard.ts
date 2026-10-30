import type { SupportedLanguage } from "../types";
import { HADITH_BASICS_SAYINGS } from "./hadithBasics";

/**
 * The home screen's daily card: one ayah and one hadith a day, the same for everyone on that date.
 *
 * Ayahs: short, gentle ones (a few lines at most) a child can live by, nothing about rulings or disputes. Each line is copied exactly
 * from quran-json@3.1.2 (https://github.com/risan/quran-json, Risan Bagja Pradana, CC BY-SA 4.0), never typed by
 * hand: the Arabic is the King Fahd Complex Uthmani text (via quranenc.com), the meanings are Saheeh International
 * (English), Muhiuddin Khan (Bangla) and Abul A'la Maududi (Urdu), as published on tanzil.net. Only a missing
 * full stop was added at the end. The Arabic screen shows the ayah itself, so it needs no meaning.
 *
 * Hadith: the "Hadith for kids" sayings (hadithBasics.ts), already checked on sunnah.com and translated.
 */
export interface DailyAyah {
  /** "2:152" */
  ref: string;
  ar: string;
  en: string;
  bn: string;
  ur: string;
}

export const DAILY_AYAHS: DailyAyah[] = [
  {
    ref: "1:2", // Al-Fatihah
    ar: "ٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَٰلَمِينَ",
    en: "[All] praise is [due] to Allah, Lord of the worlds.",
    bn: "যাবতীয় প্রশংসা আল্লাহ তাআলার যিনি সকল সৃষ্টি জগতের পালনকর্তা।",
    ur: "تعریف اللہ ہی کے لیے ہے جو تمام کائنات کا رب ہے۔"
  },
  {
    ref: "2:152", // Al-Baqarah
    ar: "فَٱذۡكُرُونِيٓ أَذۡكُرۡكُمۡ وَٱشۡكُرُواْ لِي وَلَا تَكۡفُرُونِ",
    en: "So remember Me; I will remember you. And be grateful to Me and do not deny Me.",
    bn: "সুতরাং তোমরা আমাকে স্মরণ কর, আমিও তোমাদের স্মরণ রাখবো এবং আমার কৃতজ্ঞতা প্রকাশ কর; অকৃতজ্ঞ হয়ো না।",
    ur: "لہٰذا تم مجھے یاد رکھو، میں تمہیں یاد رکھوں گا اور میرا شکر ادا کرو، کفران نعمت نہ کرو۔"
  },
  {
    ref: "2:153", // Al-Baqarah
    ar: "يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُواْ ٱسۡتَعِينُواْ بِٱلصَّبۡرِ وَٱلصَّلَوٰةِۚ إِنَّ ٱللَّهَ مَعَ ٱلصَّـٰبِرِينَ",
    en: "O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.",
    bn: "হে মুমিন গন! তোমরা ধৈর্য্য ও নামাযের মাধ্যমে সাহায্য প্রার্থনা কর। নিশ্চিতই আল্লাহ ধৈর্য্যশীলদের সাথে রয়েছেন।",
    ur: "اے لوگو جو ایمان لائے ہو، صبر اور نماز سے مدد لو اللہ صبر کرنے والوں کے ساتھ ہے۔"
  },
  {
    ref: "3:134", // Ali 'Imran
    ar: "ٱلَّذِينَ يُنفِقُونَ فِي ٱلسَّرَّآءِ وَٱلضَّرَّآءِ وَٱلۡكَٰظِمِينَ ٱلۡغَيۡظَ وَٱلۡعَافِينَ عَنِ ٱلنَّاسِۗ وَٱللَّهُ يُحِبُّ ٱلۡمُحۡسِنِينَ",
    en: "Who spend [in the cause of Allah] during ease and hardship and who restrain anger and who pardon the people - and Allah loves the doers of good.",
    bn: "যারা স্বচ্ছলতায় ও অভাবের সময় ব্যয় করে, যারা নিজেদের রাগকে সংবরণ করে আর মানুষের প্রতি ক্ষমা প্রদর্শন করে, বস্তুতঃ আল্লাহ সৎকর্মশীলদিগকেই ভালবাসেন।",
    ur: "جو ہر حال میں اپنے مال خرچ کرتے ہیں خواہ بد حال ہوں یا خوش حال، جو غصے کو پی جاتے ہیں اور دوسروں کے قصور معاف کر دیتے ہیں ایسے نیک لوگ اللہ کو بہت پسند ہیں۔"
  },
  {
    ref: "4:86", // An-Nisa
    ar: "وَإِذَا حُيِّيتُم بِتَحِيَّةٖ فَحَيُّواْ بِأَحۡسَنَ مِنۡهَآ أَوۡ رُدُّوهَآۗ إِنَّ ٱللَّهَ كَانَ عَلَىٰ كُلِّ شَيۡءٍ حَسِيبًا",
    en: "And when you are greeted with a greeting, greet [in return] with one better than it or [at least] return it [in a like manner]. Indeed, Allah is ever, over all things, an Accountant.",
    bn: "আর তোমাদেরকে যদি কেউ দোয়া করে, তাহলে তোমরাও তার জন্য দোয়া কর; তারচেয়ে উত্তম দোয়া অথবা তারই মত ফিরিয়ে বল। নিশ্চয়ই আল্লাহ সর্ব বিষয়ে হিসাব-নিকাশ গ্রহণকারী।",
    ur: "اور جب کوئی احترام کے ساتھ تمہیں سلام کرے تو اس کو اس سے بہتر طریقہ کے ساتھ جواب دو یا کم از کم اُسی طرح، اللہ ہر چیز کا حساب لینے والا ہے۔"
  },
  {
    ref: "13:28", // Ar-Ra'd
    ar: "ٱلَّذِينَ ءَامَنُواْ وَتَطۡمَئِنُّ قُلُوبُهُم بِذِكۡرِ ٱللَّهِۗ أَلَا بِذِكۡرِ ٱللَّهِ تَطۡمَئِنُّ ٱلۡقُلُوبُ",
    en: "Those who have believed and whose hearts are assured by the remembrance of Allah. Unquestionably, by the remembrance of Allah hearts are assured.",
    bn: "যারা বিশ্বাস স্থাপন করে এবং তাদের অন্তর আল্লাহর যিকির দ্বারা শান্তি লাভ করে; জেনে রাখ, আল্লাহর যিকির দ্বারাই অন্তর সমূহ শান্তি পায়।",
    ur: "ایسے ہی لوگ ہیں وہ جنہوں نے (اِس نبی کی دعوت کو) مان لیا اور اُن کے دلوں کو اللہ کی یاد سے اطمینان نصیب ہوتا ہے خبردار رہو! اللہ کی یاد ہی وہ چیز ہے جس سے دلوں کو اطمینان نصیب ہوا کرتا ہے۔"
  },
  {
    ref: "16:128", // An-Nahl
    ar: "إِنَّ ٱللَّهَ مَعَ ٱلَّذِينَ ٱتَّقَواْ وَّٱلَّذِينَ هُم مُّحۡسِنُونَ",
    en: "Indeed, Allah is with those who fear Him and those who are doers of good.",
    bn: "নিশ্চয় আল্লাহ তাদের সঙ্গে আছেন, যারা পরহেযগার এবং যারা সৎকর্ম করে।",
    ur: "اللہ اُن لوگوں کے ساتھ ہے جو تقویٰ سے کام لیتے ہیں اور احسان پر عمل کرتے ہیں۔"
  },
  {
    ref: "25:63", // Al-Furqan
    ar: "وَعِبَادُ ٱلرَّحۡمَٰنِ ٱلَّذِينَ يَمۡشُونَ عَلَى ٱلۡأَرۡضِ هَوۡنٗا وَإِذَا خَاطَبَهُمُ ٱلۡجَٰهِلُونَ قَالُواْ سَلَٰمٗا",
    en: "And the servants of the Most Merciful are those who walk upon the earth easily, and when the ignorant address them [harshly], they say [words of] peace.",
    bn: "রহমান-এর বান্দা তারাই, যারা পৃথিবীতে নম্রভাবে চলাফেরা করে এবং তাদের সাথে যখন মুর্খরা কথা বলতে থাকে, তখন তারা বলে, সালাম।",
    ur: "رحمان کے (اصلی) بندے وہ ہیں جو زمین پر نرم چال چلتے ہیں اور جاہل ان کے منہ کو آئیں تو کہہ دیتے ہیں کہ تم کو سلام۔"
  },
  {
    ref: "33:41", // Al-Ahzab
    ar: "يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُواْ ٱذۡكُرُواْ ٱللَّهَ ذِكۡرٗا كَثِيرٗا",
    en: "O you who have believed, remember Allah with much remembrance.",
    bn: "মুমিনগণ তোমরা আল্লাহকে অধিক পরিমাণে স্মরণ কর।",
    ur: "اے لوگو! جو ایمان لائے ہو، اللہ کو کثرت سے یاد کرو۔"
  },
  {
    ref: "55:13", // Ar-Rahman
    ar: "فَبِأَيِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
    en: "So which of the favors of your Lord would you deny?",
    bn: "অতএব, তোমরা উভয়ে তোমাদের পালনকর্তার কোন কোন অনুগ্রহকে অস্বীকার করবে?",
    ur: "پس اے جن و انس، تم اپنے رب کی کن کن نعمتوں کو جھٹلاؤ گے؟۔"
  },
  {
    ref: "94:5", // Ash-Sharh
    ar: "فَإِنَّ مَعَ ٱلۡعُسۡرِ يُسۡرًا",
    en: "For indeed, with hardship [will be] ease.",
    bn: "নিশ্চয় কষ্টের সাথে স্বস্তি রয়েছে।",
    ur: "پس حقیقت یہ ہے کہ تنگی کے ساتھ فراخی بھی ہے۔"
  }
];

export const DAILY_HADITH = HADITH_BASICS_SAYINGS;

/** Days since 1 Jan 1970 by the phone's own calendar, so the card turns over at local midnight. */
export function localDayNumber(date: Date = new Date()) {
  return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000);
}

export interface DailyCard {
  day: number;
  ayah: { arabic: string; meaning?: string; ref: string };
  hadith: (typeof DAILY_HADITH)[number];
}

/** Today's ayah and hadith. Each list goes round on its own, so the pair changes too. */
export function getDailyCard(language: SupportedLanguage, date: Date = new Date()): DailyCard {
  const day = localDayNumber(date);
  const ayah = DAILY_AYAHS[day % DAILY_AYAHS.length];
  return {
    day,
    ayah: { arabic: ayah.ar, meaning: language === "ar" ? undefined : ayah[language], ref: ayah.ref },
    hadith: DAILY_HADITH[day % DAILY_HADITH.length]
  };
}
