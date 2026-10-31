import type { LearningNode, Lesson, TopicId } from "../types";
import { COURSE } from "./course";
import { hadithBasicsNodeId } from "./hadithBasics";
import { UNIT_LEADS, importedPersonSlug } from "./importedNotes";
import { IMPORTED_NOTES } from "./importedNotes.generated";
import { RAMADAN } from "./ramadanDays";
import { INTRO } from "./introToIslam";

// Every term here was checked by two reviewers. Only add a term you are sure of.
// Style: topic and unit banners are written without vowel marks. Every word on a node card or a learn card
// carries full vowel marks (harakat), so a beginner can read it. When a learn card borrows its unit's word,
// it shows the vowelled form from LEARN_FORMS below. Letter names such as طه and يس stay as written.

export interface ArabicTerm {
  ar: string;
  translit: string;
  meaning: string;
  /** Set on a learn-card word borrowed from the unit banner: the word is not new to this lesson. */
  fromUnit?: true;
}

const VOWEL_MARKS = /[\u064B-\u0652\u0670]/g;

/** The word without vowel marks, as a banner writes it. */
export function withoutVowels(text: string): string {
  return text.replace(VOWEL_MARKS, "");
}

export const TOPIC_ARABIC: Record<string, ArabicTerm> = {
  foundation: { ar: "الأساسيات", translit: "Al-asasiyyat", meaning: "The basics" },
  prayer: { ar: "الصلاة", translit: "As-salah", meaning: "Prayer" },
  aqidah: { ar: "العقيدة والإيمان", translit: "Al-aqidah wal-iman", meaning: "Creed and faith" },
  quran_tafseer: { ar: "القرآن والتفسير", translit: "Al-Quran wat-tafsir", meaning: "Quran and its explanation" },
  manners: { ar: "الآداب", translit: "Al-adab", meaning: "Manners" },
  fasting: { ar: "الصيام", translit: "As-siyam", meaning: "Fasting" },
  zakat: { ar: "الزكاة", translit: "Az-zakah", meaning: "Purifying charity" },
  hajj: { ar: "الحج", translit: "Al-Hajj", meaning: "Pilgrimage" },
  marriage: { ar: "الزواج", translit: "Az-zawaj", meaning: "Marriage" },
  sahabah: { ar: "الصحابة", translit: "As-Sahabah", meaning: "The Companions" },
  prophets: { ar: "قصص الأنبياء", translit: "Qasas al-anbiya", meaning: "Stories of the prophets" },
  // The topic holds women of the Quran, the Mothers of the Believers and women of the Prophet's ﷺ family.
  women_of_the_book: { ar: "نساء خالدات", translit: "Nisa' khalidat", meaning: "Great women" },
  hadith: { ar: "الحديث", translit: "Al-hadith", meaning: "The Prophet's ﷺ sayings" },
  scholars: { ar: "العلماء", translit: "Al-'ulama'", meaning: "The scholars" },
  ramadan: { ar: "رمضان", translit: "Ramadan", meaning: "The month of Ramadan" },
  intro: { ar: "مدخل إلى الإسلام", translit: "Madkhal ila al-Islam", meaning: "A first look at Islam" }
};

export const BRANCH_ARABIC: Record<string, ArabicTerm> = {
  // Scholars: the four imams and later scholars (src/data/scholarUnits.ts)
  "scholar-abu-hanifah": { ar: "أبو حنيفة", translit: "Abu Hanifah", meaning: "Imam Abu Hanifah" },
  "scholar-malik": { ar: "مالك بن أنس", translit: "Malik ibn Anas", meaning: "Imam Malik" },
  "scholar-shafii": { ar: "الشافعي", translit: "Ash-Shafi'i", meaning: "Imam ash-Shafi'i" },
  "scholar-ahmad": { ar: "أحمد بن حنبل", translit: "Ahmad ibn Hanbal", meaning: "Imam Ahmad" },
  "scholar-ibn-taymiyyah": { ar: "ابن تيمية", translit: "Ibn Taymiyyah", meaning: "Shaykh al-Islam Ibn Taymiyyah" },
  "scholar-ibn-baz": { ar: "ابن باز", translit: "Ibn Baz", meaning: "Shaykh Ibn Baz" },
  "scholar-albani": { ar: "الألباني", translit: "Al-Albani", meaning: "Shaykh al-Albani" },
  // The rest of the family tree (src/data/scholarTreeUnits.ts)
  "scholar-umar": { ar: "علم عمر", translit: "'Ilm 'Umar", meaning: "Umar's knowledge" },
  "scholar-aishah": { ar: "علم عائشة", translit: "'Ilm 'A'ishah", meaning: "Aishah's knowledge" },
  "scholar-ibn-masud": { ar: "ابن مسعود", translit: "Ibn Mas'ud", meaning: "Abdullah ibn Mas'ud" },
  "scholar-ibn-abbas": { ar: "ابن عباس", translit: "Ibn 'Abbas", meaning: "Abdullah ibn Abbas" },
  "scholar-ibn-umar": { ar: "ابن عمر", translit: "Ibn 'Umar", meaning: "Abdullah ibn Umar" },
  "scholar-alqamah-waqqas": { ar: "علقمة بن وقاص", translit: "'Alqamah ibn Waqqas", meaning: "Alqamah ibn Waqqas" },
  "scholar-urwah": { ar: "عروة بن الزبير", translit: "'Urwah ibn az-Zubayr", meaning: "Urwah ibn az-Zubayr" },
  "scholar-nafi": { ar: "نافع", translit: "Nafi'", meaning: "Nafi, freed man of Ibn Umar" },
  "scholar-ata": { ar: "عطاء بن أبي رباح", translit: "'Ata' ibn Abi Rabah", meaning: "Ata ibn Abi Rabah" },
  "scholar-alqamah-qays": { ar: "علقمة بن قيس", translit: "'Alqamah ibn Qays", meaning: "Alqamah ibn Qays" },
  "scholar-taymi": { ar: "محمد بن إبراهيم التيمي", translit: "Muhammad ibn Ibrahim at-Taymi", meaning: "Muhammad at-Taymi" },
  "scholar-zuhri": { ar: "ابن شهاب الزهري", translit: "Ibn Shihab az-Zuhri", meaning: "Ibn Shihab az-Zuhri" },
  "scholar-nakhai": { ar: "إبراهيم النخعي", translit: "Ibrahim an-Nakha'i", meaning: "Ibrahim an-Nakha'i" },
  "scholar-yahya-ansari": { ar: "يحيى بن سعيد الأنصاري", translit: "Yahya ibn Sa'id al-Ansari", meaning: "Yahya ibn Sa'id al-Ansari" },
  "scholar-hammad": { ar: "حماد بن أبي سليمان", translit: "Hammad ibn Abi Sulayman", meaning: "Hammad ibn Abi Sulayman" },
  // Foundation: greetings, daily words and first worship
  "foundation-greetings": { ar: "التحية", translit: "At-tahiyyah", meaning: "The greeting" },
  "foundation-daily-words": { ar: "الأذكار اليومية", translit: "Al-adhkar al-yawmiyyah", meaning: "Daily remembrances" },
  "foundation-phrases-rhythm": { ar: "العبارات اليومية", translit: "Al-'ibarat al-yawmiyyah", meaning: "Daily phrases" },
  "foundation-home-adab": { ar: "آداب البيت والطعام", translit: "Adab al-bayt wat-ta'am", meaning: "Home and food manners" },
  "foundation-first-worship-rhythm": { ar: "بداية العبادة", translit: "Bidayat al-'ibadah", meaning: "Starting worship" },

  // Prayer: wudu, salah and its parts
  "prayer-wudu": { ar: "الوضوء", translit: "Al-wudu", meaning: "Washing for prayer" },
  "prayer-salah-basics": { ar: "أساسيات الصلاة", translit: "Asasiyyat as-salah", meaning: "Prayer basics" },
  "prayer-times": { ar: "أوقات الصلاة", translit: "Awqat as-salah", meaning: "Prayer times" },
  "prayer-adhan-and-iqamah": { ar: "الأذان والإقامة", translit: "Al-adhan wal-iqamah", meaning: "Calls to prayer" },
  "prayer-ruku-and-sujud": { ar: "الركوع والسجود", translit: "Ar-ruku was-sujud", meaning: "Bowing and prostrating" },
  "prayer-tashahhud": { ar: "التشهد", translit: "At-tashahhud", meaning: "The testimony in prayer" },
  "prayer-khushu": { ar: "الخشوع", translit: "Al-khushu", meaning: "Humble focus" },
  "prayer-invalidators-of-salah": { ar: "مبطلات الصلاة", translit: "Mubtilat as-salah", meaning: "Prayer breakers" },
  "prayer-congregational-prayer": { ar: "صلاة الجماعة", translit: "Salat al-jama'ah", meaning: "Group prayer" },
  "prayer-missed-prayers": { ar: "قضاء الصلاة", translit: "Qada as-salah", meaning: "Making up prayers" },
  "prayer-review-and-mastery": { ar: "مراجعة الوضوء والصلاة", translit: "Muraja'at al-wudu was-salah", meaning: "Wudu and salah review" },

  // Aqidah: belief in Allah and the pillars of faith
  "aqidah-tawhid": { ar: "التوحيد", translit: "At-tawhid", meaning: "Oneness of Allah" },
  "aqidah-pillars-of-iman": { ar: "أركان الإيمان", translit: "Arkan al-iman", meaning: "Pillars of faith" },
  "aqidah-names-and-attributes": { ar: "الأسماء والصفات", translit: "Al-asma was-sifat", meaning: "Names and attributes" },
  "aqidah-lived-iman": { ar: "الإيمان والعمل", translit: "Al-iman wal-amal", meaning: "Faith and deeds" },

  // Quran and tafsir: one branch per surah
  "quran-surah-fatihah": { ar: "سورة الفاتحة", translit: "Surat Al-Fatihah", meaning: "The Opening" },
  "quran-surah-baqarah": { ar: "سورة البقرة", translit: "Surat Al-Baqarah", meaning: "The Cow" },
  "quran-surah-ali-imran": { ar: "سورة آل عمران", translit: "Surat Ali Imran", meaning: "Family of Imran" },
  "quran-surah-nisa": { ar: "سورة النساء", translit: "Surat An-Nisa", meaning: "The Women" },
  "quran-surah-maidah": { ar: "سورة المائدة", translit: "Surat Al-Ma'idah", meaning: "The Table Spread" },
  "quran-surah-yusuf": { ar: "سورة يوسف", translit: "Surat Yusuf", meaning: "Joseph" },
  "quran-surah-maryam": { ar: "سورة مريم", translit: "Surat Maryam", meaning: "Mary" },
  "quran-surah-kahf": { ar: "سورة الكهف", translit: "Surat Al-Kahf", meaning: "The Cave" },
  "quran-surah-yasin": { ar: "سورة يس", translit: "Surat Ya-Sin", meaning: "Letters Ya and Sin" },
  "quran-surah-mulk": { ar: "سورة الملك", translit: "Surat Al-Mulk", meaning: "The Kingdom" },

  // Manners: everyday adab
  "manners-speech": { ar: "آداب الكلام", translit: "Adab al-kalam", meaning: "Manners of speech" },
  "manners-parents-family": { ar: "بر الوالدين", translit: "Birr al-walidayn", meaning: "Kindness to parents" },
  "manners-rahmah": { ar: "الرحمة", translit: "Ar-rahmah", meaning: "Mercy" },
  "manners-neighbors-and-guests": { ar: "الجار والضيف", translit: "Al-jar wad-dayf", meaning: "Neighbor and guest" },
  "manners-emotional-discipline": { ar: "ضبط النفس", translit: "Dabt an-nafs", meaning: "Self-control" },
  "manners-public-conduct": { ar: "الآداب العامة", translit: "Al-adab al-'ammah", meaning: "Manners in public" },

  // Fasting: purpose, rules and Ramadan
  "fasting-purpose": { ar: "حكمة الصيام", translit: "Hikmat as-siyam", meaning: "Wisdom of fasting" },
  "fasting-times-and-rules": { ar: "أحكام الصيام", translit: "Ahkam as-siyam", meaning: "Rules of fasting" },
  "fasting-protection": { ar: "حفظ الصيام", translit: "Hifz as-siyam", meaning: "Protecting the fast" },
  "fasting-ramadan-growth": { ar: "شهر رمضان", translit: "Shahr Ramadan", meaning: "Month of Ramadan" },

  // Zakat: duty, recipients and generosity
  "zakat-meaning-and-duty": { ar: "فريضة الزكاة", translit: "Faridat az-zakah", meaning: "The duty of zakat" },
  "zakat-recipients": { ar: "مصارف الزكاة", translit: "Masarif az-zakah", meaning: "Zakat recipients" },
  "zakat-character-and-intention": { ar: "النية والإخلاص", translit: "An-niyyah wal-ikhlas", meaning: "Intention and sincerity" },
  "zakat-broader-generosity": { ar: "الصدقة والكرم", translit: "As-sadaqah wal-karam", meaning: "Charity and generosity" },

  // Hajj: duty, rites and sacred sites
  "hajj-duty": { ar: "فريضة الحج", translit: "Faridat al-Hajj", meaning: "The duty of Hajj" },
  "hajj-rites": { ar: "مناسك الحج", translit: "Manasik al-Hajj", meaning: "Rites of Hajj" },
  "hajj-major-stations": { ar: "المشاعر المقدسة", translit: "Al-Masha'ir al-Muqaddasah", meaning: "Sacred sites" },
  "hajj-lessons": { ar: "دروس الحج", translit: "Durus al-Hajj", meaning: "Lessons of Hajj" },

  // Marriage: purpose, home, rights and repair
  "marriage-foundations": { ar: "مقاصد الزواج", translit: "Maqasid az-zawaj", meaning: "Purposes of marriage" },
  "marriage-home": { ar: "المودة والرحمة", translit: "Al-mawaddah war-rahmah", meaning: "Love and mercy" },
  "marriage-rights-and-trust": { ar: "الحقوق والأمانة", translit: "Al-huquq wal-amanah", meaning: "Rights and trust" },
  "marriage-conflict-and-repair": { ar: "الإصلاح بين الزوجين", translit: "Al-islah bayna az-zawjayn", meaning: "Making peace at home" },
  "marriage-spiritual-home": { ar: "البيت المسلم", translit: "Al-bayt al-muslim", meaning: "The Muslim home" },

  // Prophets: the course of the prophets, in order
  "prophets-beginnings": { ar: "بداية البشرية", translit: "Bidayat al-bashariyyah", meaning: "Beginning of mankind" },
  "prophets-tested": { ar: "ابتلاء الرسل", translit: "Ibtila' ar-rusul", meaning: "Messengers tested" },
  "prophets-final-example": { ar: "خاتم النبيين", translit: "Khatam an-nabiyyin", meaning: "Seal of the prophets" },
  "prophets-early-messengers": { ar: "الرسل الأوائل", translit: "Ar-rusul al-awa'il", meaning: "The first messengers" },
  "prophets-family-and-sacrifice": { ar: "آل إبراهيم", translit: "Al Ibrahim", meaning: "Family of Ibrahim" },
  "prophets-power-and-deliverance": { ar: "موسى وداود وسليمان", translit: "Musa wa Dawud wa Sulayman", meaning: "Musa, Dawud and Sulayman" },

  // Sahabah: one branch per companion
  "sahabi-abu-bakr": { ar: "أبو بكر الصديق", translit: "Abu Bakr as-Siddiq", meaning: "The truthful one" },
  "sahabi-umar-ibn-al-khattab": { ar: "عمر بن الخطاب", translit: "Umar ibn al-Khattab", meaning: "Second caliph" },
  "sahabi-uthman-ibn-affan": { ar: "عثمان بن عفان", translit: "Uthman ibn Affan", meaning: "Third caliph" },
  "sahabi-ali-ibn-abi-talib": { ar: "علي بن أبي طالب", translit: "Ali ibn Abi Talib", meaning: "Fourth caliph" },
  "sahabi-khalid-ibn-al-walid": { ar: "خالد بن الوليد", translit: "Khalid ibn al-Walid", meaning: "Sword of Allah" },
  "sahabi-bilal-ibn-rabah": { ar: "بلال بن رباح", translit: "Bilal ibn Rabah", meaning: "First muezzin" },
  "sahabi-abu-ubaydah-ibn-al-jarrah": { ar: "أبو عبيدة بن الجراح", translit: "Abu Ubaydah ibn al-Jarrah", meaning: "Trustee of the Ummah" },
  "sahabi-talhah-ibn-ubaydillah": { ar: "طلحة بن عبيد الله", translit: "Talhah ibn Ubaydillah", meaning: "Promised Paradise" },
  "sahabi-az-zubayr-ibn-al-awwam": { ar: "الزبير بن العوام", translit: "Az-Zubayr ibn al-Awwam", meaning: "The Prophet's ﷺ disciple" },
  "sahabi-sad-ibn-abi-waqqas": { ar: "سعد بن أبي وقاص", translit: "Sa'd ibn Abi Waqqas", meaning: "First arrow for Islam" },
  "sahabi-salman-al-farisi": { ar: "سلمان الفارسي", translit: "Salman al-Farisi", meaning: "Salman the Persian" },
  "sahabi-abu-dharr-al-ghifari": { ar: "أبو ذر الغفاري", translit: "Abu Dharr al-Ghifari", meaning: "From Ghifar tribe" },
  "sahabi-abdullah-ibn-masud": { ar: "عبد الله بن مسعود", translit: "Abdullah ibn Mas'ud", meaning: "Quran reciter" },
  "sahabi-anas-ibn-malik": { ar: "أنس بن مالك", translit: "Anas ibn Malik", meaning: "The Prophet's ﷺ servant" },
  "sahabi-muhajirun": { ar: "المهاجرون", translit: "Al-Muhajirun", meaning: "The emigrants" },

  // Women of the Book: women of the Quran and the Mothers of the Believers
  "women-quran": { ar: "النساء في القرآن", translit: "An-nisa fil-Quran", meaning: "Women in the Quran" },
  "women-mothers": { ar: "أمهات المؤمنين", translit: "Ummahat al-muminin", meaning: "Mothers of the Believers" },
  // The imported women, one unit per theme (src/data/importedNotes.ts); the Mothers of the Believers from the
  // notes are taught in "women-mothers" (src/data/unitPlans.ts).
  "notes-women-of-the-book-mothers-of-the-believers-from-your-notes-1": { ar: "الأمهات", translit: "Al-ummahat", meaning: "Mothers" },
  "notes-women-of-the-book-mothers-of-the-believers-from-your-notes-3": { ar: "آل علي", translit: "Al Ali", meaning: "Ali's family" },

  // Hadith: sayings for children first, then the imported hadith for young children (src/data/importedNotes.ts)
  "hadith-for-kids": { ar: "أحاديث للأطفال", translit: "Ahadith lil-atfal", meaning: "Hadith for children" },
  "notes-hadith-hadith-from-your-notes-1": { ar: "في حفظ الله", translit: "Fi hifzillah", meaning: "In Allah's care" },
  // The hadith about marriage, the last unit of the Marriage topic (keeps the id of the imported unit)
  "notes-hadith-hadith-from-your-notes-2": { ar: "الزواج في السنة", translit: "Az-zawaj fis-sunnah", meaning: "Marriage in the Sunnah" },
  // Ramadan (src/data/ramadanDays.ts): the three units of the 30-day path
  ...RAMADAN.branchArabic,
  // New to Islam (src/data/introToIslam.ts): its four units
  ...INTRO.branchArabic
};

export const NODE_ARABIC: Record<string, ArabicTerm> = {
  // Foundation: greetings, daily words and first worship
  "foundation-niyyah": { ar: "السَّلَامُ عَلَيْكُمْ", translit: "As-salamu alaykum", meaning: "Peace be upon you" },
  "foundation-character": { ar: "وَعَلَيْكُمُ السَّلَامُ", translit: "Wa alaykum as-salam", meaning: "And upon you peace" },
  "foundation-guidance": { ar: "الْحَمْدُ لِلَّهِ", translit: "Al-hamdu lillah", meaning: "All praise to Allah" },
  "foundation-bismillah": { ar: "بِسْمِ اللَّهِ", translit: "Bismillah", meaning: "In Allah's name" },
  "foundation-sneeze": { ar: "يَرْحَمُكَ اللَّهُ", translit: "Yarhamuk-Allah", meaning: "Allah have mercy" },
  "foundation-phrases-rhythm-morning-remembrance": { ar: "دُعَاءُ الِاسْتِيقَاظِ", translit: "Du'a al-istiqadh", meaning: "Waking-up du'a" },
  "foundation-phrases-rhythm-thanks-language": { ar: "الشُّكْرُ", translit: "Ash-shukr", meaning: "Gratitude" },
  "foundation-phrases-rhythm-future-speech": { ar: "إِنْ شَاءَ اللَّهُ", translit: "In sha Allah", meaning: "If Allah wills" },
  "foundation-phrases-rhythm-seeking-forgiveness": { ar: "أَسْتَغْفِرُ اللَّهَ", translit: "Astaghfirullah", meaning: "I seek Allah's forgiveness" },
  "foundation-home-adab-entering-home": { ar: "السَّلَامُ عَلَيْكُمْ", translit: "As-salamu alaykum", meaning: "Peace be upon you" },
  "foundation-home-adab-table-beginning": { ar: "بِسْمِ اللَّهِ", translit: "Bismillah", meaning: "In Allah's name" },
  "foundation-home-adab-right-hand": { ar: "كُلْ بِيَمِينِكَ", translit: "Kul bi-yaminik", meaning: "Eat with your right hand" },
  "foundation-home-adab-after-food": { ar: "الْحَمْدُ لِلَّهِ", translit: "Al-hamdu lillah", meaning: "All praise to Allah" },
  "foundation-first-worship-rhythm-clean-before-prayer": { ar: "الطَّهَارَةُ", translit: "At-taharah", meaning: "Purity" },
  "foundation-first-worship-rhythm-hear-the-call": { ar: "الصَّلَاةُ", translit: "As-salah", meaning: "Prayer" },

  // Prayer: wudu, salah and its parts
  "prayer-wudu-what-wudu-is": { ar: "الْوُضُوءُ", translit: "Al-wudu", meaning: "Washing for prayer" },
  "prayer-wudu-conditions-before-wudu": { ar: "شُرُوطُ الْوُضُوءِ", translit: "Shurut al-wudu", meaning: "Conditions of wudu" },
  "prayer-wudu-intention-basics": { ar: "النِّيَّةُ", translit: "An-niyyah", meaning: "Intention" },
  "prayer-wudu-wash-hands-first": { ar: "غَسْلُ الْكَفَّيْنِ", translit: "Ghasl al-kaffayn", meaning: "Washing the hands" },
  "prayer-wudu-rinse-mouth": { ar: "الْمَضْمَضَةُ", translit: "Al-madmadah", meaning: "Rinsing the mouth" },
  "prayer-wudu-rinse-nose": { ar: "الِاسْتِنْشَاقُ", translit: "Al-istinshaq", meaning: "Rinsing the nose" },
  "prayer-wudu-wash-face": { ar: "غَسْلُ الْوَجْهِ", translit: "Ghasl al-wajh", meaning: "Washing the face" },
  "prayer-wudu-wash-arms": { ar: "غَسْلُ الْيَدَيْنِ إِلَى الْمِرْفَقَيْنِ", translit: "Ghasl al-yadayn ila al-mirfaqayn", meaning: "Washing arms to the elbows" },
  "prayer-wudu-wipe-head": { ar: "مَسْحُ الرَّأْسِ", translit: "Mash ar-ra's", meaning: "Wiping the head" },
  "prayer-wudu-wipe-ears": { ar: "مَسْحُ الْأُذُنَيْنِ", translit: "Mash al-udhunayn", meaning: "Wiping the ears" },
  "prayer-wudu-wash-feet": { ar: "غَسْلُ الرِّجْلَيْنِ", translit: "Ghasl ar-rijlayn", meaning: "Washing the feet" },
  "prayer-wudu-fard-acts": { ar: "فَرَائِضُ الْوُضُوءِ", translit: "Fara'id al-wudu", meaning: "Required acts of wudu" },
  "prayer-wudu-sunnah-acts": { ar: "سُنَنُ الْوُضُوءِ", translit: "Sunan al-wudu", meaning: "Sunnah acts of wudu" },
  "prayer-wudu-what-breaks-wudu": { ar: "نَوَاقِضُ الْوُضُوءِ", translit: "Nawaqid al-wudu", meaning: "Wudu breakers" },
  "prayer-wudu-bathroom-etiquette": { ar: "آدَابُ قَضَاءِ الْحَاجَةِ", translit: "Adab qada al-hajah", meaning: "Bathroom manners" },
  "prayer-salah-basics-five-daily-prayers": { ar: "الصَّلَوَاتُ الْخَمْسُ", translit: "As-salawat al-khams", meaning: "The five prayers" },
  "prayer-salah-basics-rakah-overview": { ar: "الرَّكْعَةُ", translit: "Ar-rak'ah", meaning: "One prayer unit" },
  "prayer-salah-basics-conditions-before-salah": { ar: "شُرُوطُ الصَّلَاةِ", translit: "Shurut as-salah", meaning: "Conditions of prayer" },
  "prayer-salah-basics-pillars-and-obligations": { ar: "أَرْكَانُ الصَّلَاةِ وَوَاجِبَاتُهَا", translit: "Arkan as-salah wa wajibatuha", meaning: "Pillars and duties of prayer" },
  "prayer-times-fajr-to-isha": { ar: "مِنَ الْفَجْرِ إِلَى الْعِشَاءِ", translit: "Min al-fajr ila al-isha", meaning: "From dawn to night" },
  "prayer-times-guarding-the-first-part": { ar: "أَوَّلُ الْوَقْتِ", translit: "Awwal al-waqt", meaning: "Start of the time" },
  "prayer-adhan-and-iqamah-what-the-adhan-is": { ar: "الْأَذَانُ", translit: "Al-adhan", meaning: "Call to prayer" },
  "prayer-adhan-and-iqamah-what-the-iqamah-does": { ar: "الْإِقَامَةُ", translit: "Al-iqamah", meaning: "Call to stand" },
  "prayer-ruku-and-sujud-what-ruku-teaches": { ar: "الرُّكُوعُ", translit: "Ar-ruku", meaning: "Bowing" },
  "prayer-ruku-and-sujud-rising-from-ruku": { ar: "الرَّفْعُ مِنَ الرُّكُوعِ", translit: "Ar-raf' min ar-ruku", meaning: "Rising from bowing" },
  "prayer-ruku-and-sujud-what-sujud-teaches": { ar: "السُّجُودُ", translit: "As-sujud", meaning: "Prostration" },
  "prayer-ruku-and-sujud-seven-points-of-sujud": { ar: "أَعْضَاءُ السُّجُودِ السَّبْعَةُ", translit: "A'da as-sujud as-sab'ah", meaning: "Seven prostration points" },
  "prayer-ruku-and-sujud-sitting-between-sujud": { ar: "الْجَلْسَةُ بَيْنَ السَّجْدَتَيْنِ", translit: "Al-jalsah bayna as-sajdatayn", meaning: "Sitting between prostrations" },
  "prayer-tashahhud-wording-of-tashahhud": { ar: "التَّحِيَّاتُ لِلَّهِ", translit: "At-tahiyyatu lillah", meaning: "Greetings are for Allah" },
  "prayer-tashahhud-taslim-ends-the-prayer": { ar: "التَّسْلِيمُ", translit: "At-taslim", meaning: "Ending with salam" },
  "prayer-khushu-what-khushu-is": { ar: "الْخُشُوعُ", translit: "Al-khushu", meaning: "Humble focus" },
  "prayer-invalidators-of-salah-what-invalidates-salah": { ar: "مُبْطِلَاتُ الصَّلَاةِ", translit: "Mubtilat as-salah", meaning: "Prayer breakers" },
  "prayer-invalidators-of-salah-purity-and-prayer-validity": { ar: "الطَّهَارَةُ", translit: "At-taharah", meaning: "Purity" },
  "prayer-congregational-prayer-why-jamaah-matters": { ar: "صَلَاةُ الْجَمَاعَةِ", translit: "Salat al-jama'ah", meaning: "Group prayer" },
  "prayer-congregational-prayer-following-the-imam": { ar: "مُتَابَعَةُ الْإِمَامِ", translit: "Mutaba'at al-imam", meaning: "Following the imam" },
  "prayer-congregational-prayer-joining-late": { ar: "الْمَسْبُوقُ", translit: "Al-masbuq", meaning: "Late joiner" },
  "prayer-congregational-prayer-masjid-etiquette": { ar: "آدَابُ الْمَسْجِدِ", translit: "Adab al-masjid", meaning: "Mosque manners" },

  // Aqidah: belief in Allah and the pillars of faith
  "aqidah-tawhid-allah-alone": { ar: "لَا إِلَهَ إِلَّا اللَّهُ", translit: "La ilaha illallah", meaning: "No god but Allah" },
  "aqidah-tawhid-ikhlas-and-purity": { ar: "الْإِخْلَاصُ", translit: "Al-ikhlas", meaning: "Sincerity" },
  "aqidah-tawhid-calling-on-allah": { ar: "الدُّعَاءُ", translit: "Ad-du'a", meaning: "Calling on Allah" },
  "aqidah-pillars-of-iman-what-iman-covers": { ar: "الْإِيمَانُ", translit: "Al-iman", meaning: "Faith" },
  "aqidah-pillars-of-iman-angels-books-messengers": { ar: "الْمَلَائِكَةُ وَالْكُتُبُ وَالرُّسُلُ", translit: "Al-mala'ikah wal-kutub war-rusul", meaning: "Angels, books, messengers" },
  "aqidah-pillars-of-iman-the-last-day": { ar: "الْيَوْمُ الْآخِرُ", translit: "Al-yawm al-akhir", meaning: "The Last Day" },
  "aqidah-pillars-of-iman-qadar": { ar: "الْقَدَرُ", translit: "Al-qadar", meaning: "Divine decree" },
  "aqidah-names-and-attributes-why-names-matter": { ar: "مَعْرِفَةُ اللَّهِ", translit: "Ma'rifatullah", meaning: "Knowing Allah" },
  "aqidah-names-and-attributes-mercy-and-knowledge": { ar: "الرَّحْمَنُ، الْعَلِيمُ", translit: "Ar-Rahman, Al-Alim", meaning: "Most Merciful, All-Knowing" },
  "aqidah-names-and-attributes-majesty-and-authority": { ar: "الْمَلِكُ، الْعَزِيزُ", translit: "Al-Malik, Al-Aziz", meaning: "The King, The Mighty" },
  "aqidah-names-and-attributes-using-the-names": { ar: "الْغَفُورُ", translit: "Al-Ghafur", meaning: "The Forgiving" },
  "aqidah-lived-iman-belief-and-obedience": { ar: "الطَّاعَةُ", translit: "At-ta'ah", meaning: "Obedience" },
  "aqidah-lived-iman-belief-under-pressure": { ar: "الثَّبَاتُ", translit: "Ath-thabat", meaning: "Steadfastness" },
  "aqidah-lived-iman-repentance-and-hope": { ar: "التَّوْبَةُ وَالرَّجَاءُ", translit: "At-tawbah war-raja", meaning: "Repentance and hope" },
  "aqidah-lived-iman-certainty-and-humility": { ar: "الْيَقِينُ وَالتَّوَاضُعُ", translit: "Al-yaqin wat-tawadu", meaning: "Certainty and humility" },

  // Quran and tafsir: one branch per surah
  "quran-surah-fatihah-opening-and-names": { ar: "الصَّلَاةُ", translit: "As-salah", meaning: "Prayer" },
  "quran-surah-fatihah-praise-and-lordship": { ar: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", translit: "Al-hamdu lillahi rabbil-alamin", meaning: "All praise is for Allah, Lord of the worlds" },
  "quran-surah-fatihah-worship-and-help": { ar: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", translit: "Iyyaka na'budu wa iyyaka nasta'in", meaning: "You alone we worship, You alone we ask for help" },
  "quran-surah-fatihah-straight-path": { ar: "الصِّرَاطُ الْمُسْتَقِيمُ", translit: "As-sirat al-mustaqim", meaning: "The straight path" },
  "quran-surah-baqarah-opening-guidance": { ar: "هُدًى لِلْمُتَّقِينَ", translit: "Hudan lil-muttaqin", meaning: "Guidance for the God-conscious" },
  "quran-surah-baqarah-qualities-of-guided": { ar: "يُؤْمِنُونَ بِالْغَيْبِ", translit: "Yu'minuna bil-ghayb", meaning: "They believe in the unseen" },
  "quran-surah-baqarah-ayat-al-kursi": { ar: "آيَةُ الْكُرْسِيِّ", translit: "Ayat al-Kursi", meaning: "The Throne Verse" },
  "quran-surah-baqarah-ending-belief": { ar: "خَوَاتِيمُ الْبَقَرَةِ", translit: "Khawatim al-Baqarah", meaning: "Last verses of Baqarah" },
  "quran-surah-ali-imran-steadfastness": { ar: "الثَّبَاتُ", translit: "Ath-thabat", meaning: "Standing firm" },
  "quran-surah-ali-imran-holding-the-rope": { ar: "وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا", translit: "Wa'tasimu bi-hablillahi jami'a", meaning: "Hold Allah's rope together" },
  "quran-surah-ali-imran-truth-and-tests": { ar: "الِابْتِلَاءُ", translit: "Al-ibtila'", meaning: "Being tested" },
  "quran-surah-ali-imran-dialogue-and-clarity": { ar: "أَهْلُ الْكِتَابِ", translit: "Ahl al-Kitab", meaning: "People of the Book" },
  "quran-surah-nisa-social-justice": { ar: "الْعَدْلُ", translit: "Al-adl", meaning: "Justice" },
  "quran-surah-nisa-rights-of-people": { ar: "حُقُوقُ الْعِبَادِ", translit: "Huquq al-ibad", meaning: "Rights of people" },
  "quran-surah-nisa-family-duty": { ar: "صِلَةُ الرَّحِمِ", translit: "Silat ar-rahim", meaning: "Keeping family ties" },
  "quran-surah-nisa-belief-and-order": { ar: "أَطِيعُوا اللَّهَ وَأَطِيعُوا الرَّسُولَ", translit: "Ati'ullaha wa ati'ur-rasul", meaning: "Obey Allah and obey the Messenger ﷺ" },
  "quran-surah-maidah-fulfill-covenants": { ar: "أَوْفُوا بِالْعُقُودِ", translit: "Awfu bil-uqud", meaning: "Keep your promises" },
  "quran-surah-maidah-purity-and-prayer": { ar: "الطَّهَارَةُ", translit: "At-taharah", meaning: "Purity" },
  "quran-surah-maidah-lawful-living": { ar: "الْحَلَالُ وَالْحَرَامُ", translit: "Al-halal wal-haram", meaning: "Allowed and forbidden" },
  "quran-surah-maidah-loyalty-to-revelation": { ar: "مَا أَنْزَلَ اللَّهُ", translit: "Ma anzalallah", meaning: "What Allah revealed" },
  "quran-surah-yusuf-beautiful-story": { ar: "أَحْسَنُ الْقَصَصِ", translit: "Ahsan al-qasas", meaning: "The best of stories" },
  "quran-surah-yusuf-temptation-and-purity": { ar: "الْعِفَّةُ", translit: "Al-iffah", meaning: "Purity and self-control" },
  "quran-surah-yusuf-prison-and-patience": { ar: "الصَّبْرُ", translit: "As-sabr", meaning: "Patience" },
  "quran-surah-yusuf-forgiveness-and-reunion": { ar: "الْعَفْوُ", translit: "Al-afw", meaning: "Forgiveness" },
  "quran-surah-maryam-mercy-at-the-opening": { ar: "الرَّحْمَةُ", translit: "Ar-rahmah", meaning: "Mercy" },
  "quran-surah-maryam-family-and-dua": { ar: "الدُّعَاءُ", translit: "Ad-du'a", meaning: "Asking Allah" },
  "quran-surah-maryam-maryam-her-trust": { ar: "التَّوَكُّلُ", translit: "At-tawakkul", meaning: "Trust in Allah" },
  "quran-surah-maryam-prophetic-links": { ar: "الْأَنْبِيَاءُ", translit: "Al-anbiya", meaning: "The prophets" },
  "quran-surah-kahf-faith-under-trial": { ar: "أَصْحَابُ الْكَهْفِ", translit: "Ashab al-Kahf", meaning: "People of the Cave" },
  "quran-surah-kahf-wealth-and-gardens": { ar: "صَاحِبُ الْجَنَّتَيْنِ", translit: "Sahib al-jannatayn", meaning: "Owner of two gardens" },
  "quran-surah-kahf-knowledge-and-khidr": { ar: "مُوسَى وَالْخَضِرُ", translit: "Musa wal-Khidr", meaning: "Musa and Khidr" },
  "quran-surah-kahf-power-and-dhulqarnayn": { ar: "ذُو الْقَرْنَيْنِ", translit: "Dhul-Qarnayn", meaning: "He of Two Horns" },
  "quran-surah-yasin-revelation-and-warning": { ar: "الْوَحْيُ وَالْإِنْذَارُ", translit: "Al-wahy wal-indhar", meaning: "Revelation and warning" },
  "quran-surah-yasin-signs-in-creation": { ar: "آيَاتُ اللَّهِ", translit: "Ayat Allah", meaning: "Allah's signs" },
  "quran-surah-yasin-resurrection": { ar: "الْبَعْثُ", translit: "Al-ba'th", meaning: "Rising after death" },
  "quran-surah-yasin-messengers-and-response": { ar: "الرُّسُلُ", translit: "Ar-rusul", meaning: "The messengers" },
  "quran-surah-mulk-dominion-of-allah": { ar: "بِيَدِهِ الْمُلْكُ", translit: "Biyadihil-mulk", meaning: "All power is His" },
  "quran-surah-mulk-life-as-test": { ar: "أَيُّكُمْ أَحْسَنُ عَمَلًا", translit: "Ayyukum ahsanu amala", meaning: "Whose deeds are best" },
  "quran-surah-mulk-looking-at-creation": { ar: "فَارْجِعِ الْبَصَرَ", translit: "Farji'il-basar", meaning: "Look again" },
  "quran-surah-mulk-warning-and-security": { ar: "الْغَفْلَةُ", translit: "Al-ghaflah", meaning: "Heedlessness" },

  // Manners: everyday adab
  "manners-salam": { ar: "السَّلَامُ عَلَيْكُمْ", translit: "As-salamu alaykum", meaning: "Peace be upon you" },
  "manners-truthful": { ar: "الصِّدْقُ", translit: "As-sidq", meaning: "Telling the truth" },
  "manners-service": { ar: "التَّوَاضُعُ", translit: "At-tawadu", meaning: "Humility" },
  "manners-eating": { ar: "آدَابُ الطَّعَامِ", translit: "Adab at-ta'am", meaning: "Eating manners" },
  "manners-neighbors-and-guests-neighbor-rights": { ar: "حَقُّ الْجَارِ", translit: "Haqq al-jar", meaning: "Neighbor's right" },
  "manners-neighbors-and-guests-guest-honor": { ar: "إِكْرَامُ الضَّيْفِ", translit: "Ikram ad-dayf", meaning: "Honoring the guest" },
  // Quran 58:11: when you are told to make room in gatherings, make room.
  "manners-neighbors-and-guests-sharing-space": { ar: "تَفَسَّحُوا فِي الْمَجَالِسِ", translit: "Tafassahu fil-majalis", meaning: "Make room in gatherings" },
  "manners-emotional-discipline-anger-and-restraint": { ar: "كَظْمُ الْغَيْظِ", translit: "Kazm al-ghayz", meaning: "Holding back anger" },
  "manners-emotional-discipline-gentleness": { ar: "الرِّفْقُ", translit: "Ar-rifq", meaning: "Gentleness" },
  "manners-emotional-discipline-self-awareness": { ar: "مُحَاسَبَةُ النَّفْسِ", translit: "Muhasabat an-nafs", meaning: "Checking yourself" },
  "manners-public-conduct-masjid-adab": { ar: "آدَابُ الْمَسْجِدِ", translit: "Adab al-masjid", meaning: "Masjid manners" },
  "manners-public-conduct-disagreement": { ar: "أَدَبُ الْخِلَافِ", translit: "Adab al-khilaf", meaning: "Manners of disagreeing" },

  // Fasting: purpose, rules and Ramadan
  "fasting-purpose-what-taqwa-means": { ar: "التَّقْوَى", translit: "At-taqwa", meaning: "Mindfulness of Allah" },
  "fasting-purpose-ramadan-and-quran": { ar: "نُزُولُ الْقُرْآنِ", translit: "Nuzul al-Quran", meaning: "Revelation of the Quran" },
  "fasting-times-and-rules-suhur-and-intent": { ar: "السُّحُورُ", translit: "As-suhur", meaning: "Pre-dawn meal" },
  "fasting-times-and-rules-breaking-the-fast": { ar: "الْإِفْطَارُ", translit: "Al-iftar", meaning: "Breaking the fast" },
  "fasting-times-and-rules-who-is-exempt": { ar: "الرُّخْصَةُ", translit: "Ar-rukhsa", meaning: "Concession (exemption)" },
  "fasting-protection-invalidators": { ar: "الْمُفَطِّرَاتُ", translit: "Al-mufattirat", meaning: "Things that break the fast" },
  "fasting-protection-tongue-and-character": { ar: "حِفْظُ اللِّسَانِ", translit: "Hifz al-lisan", meaning: "Guarding the tongue" },
  "fasting-ramadan-growth-night-worship": { ar: "صَلَاةُ التَّرَاوِيحِ", translit: "Salat at-tarawih", meaning: "Ramadan night prayer" },
  "fasting-ramadan-growth-quran-in-ramadan": { ar: "تِلَاوَةُ الْقُرْآنِ", translit: "Tilawat al-Quran", meaning: "Reciting the Quran" },
  "fasting-ramadan-growth-laylat-al-qadr": { ar: "لَيْلَةُ الْقَدْرِ", translit: "Laylat al-qadr", meaning: "Night of Power" },

  // Zakat: duty, recipients and generosity
  "zakat-meaning-and-duty-what-zakat-is": { ar: "الزَّكَاةُ", translit: "Az-zakah", meaning: "Purifying charity" },
  "zakat-meaning-and-duty-nisab-and-threshold": { ar: "النِّصَابُ", translit: "An-nisab", meaning: "Minimum amount" },
  // 2.5 percent is a quarter of a tenth; the hadith on zakat name the rate this way
  "zakat-meaning-and-duty-obligation-and-seriousness": { ar: "رُبْعُ الْعُشْرِ", translit: "Rub' al-'ushr", meaning: "A quarter of a tenth" },
  "zakat-recipients-eligible-groups": { ar: "الْأَصْنَافُ الثَّمَانِيَةُ", translit: "Al-asnaf ath-thamaniyah", meaning: "The eight groups" },
  "zakat-character-and-intention-sincerity": { ar: "الْإِخْلَاصُ", translit: "Al-ikhlas", meaning: "Sincerity" },
  "zakat-character-and-intention-humility": { ar: "التَّوَاضُعُ", translit: "At-tawadu", meaning: "Humility" },
  "zakat-broader-generosity-zakat-and-sadaqah": { ar: "الصَّدَقَةُ", translit: "As-sadaqah", meaning: "Voluntary charity" },
  "zakat-broader-generosity-family-support-and-duty": { ar: "النَّفَقَةُ", translit: "An-nafaqah", meaning: "Family support" },

  // Hajj: duty, rites and sacred sites
  "hajj-duty-who-must-go": { ar: "الِاسْتِطَاعَةُ", translit: "Al-Istita'ah", meaning: "Being able" },
  "hajj-duty-intending-the-journey": { ar: "النِّيَّةُ", translit: "An-Niyyah", meaning: "Intention" },
  "hajj-duty-sacred-house": { ar: "الْبَيْتُ الْحَرَامُ", translit: "Al-Bayt al-Haram", meaning: "The Sacred House" },
  "hajj-rites-ihram": { ar: "الْإِحْرَامُ", translit: "Al-Ihram", meaning: "Pilgrim's sacred state" },
  "hajj-rites-tawaf": { ar: "الطَّوَافُ", translit: "At-Tawaf", meaning: "Circling the Ka'bah" },
  "hajj-rites-sai": { ar: "السَّعْيُ", translit: "As-Sa'i", meaning: "Walking Safa to Marwah" },
  "hajj-major-stations-arafah": { ar: "عَرَفَةُ", translit: "Arafah", meaning: "Plain of Arafah" },
  "hajj-major-stations-muzdalifah": { ar: "مُزْدَلِفَةُ", translit: "Muzdalifah", meaning: "Overnight resting place" },
  "hajj-major-stations-mina": { ar: "مِنًى", translit: "Mina", meaning: "Valley of tents" },
  "hajj-major-stations-sacrifice-and-release": { ar: "الْهَدْيُ وَالتَّحَلُّلُ", translit: "Al-Hady wat-Tahallul", meaning: "Sacrifice and release" },
  "hajj-lessons-humility": { ar: "التَّوَاضُعُ", translit: "At-tawadu", meaning: "Humility" },
  "hajj-lessons-unity": { ar: "وَحْدَةُ الْأُمَّةِ", translit: "Wahdat al-Ummah", meaning: "Unity of believers" },
  "hajj-lessons-patience": { ar: "الصَّبْرُ", translit: "As-Sabr", meaning: "Patience" },

  // Marriage: purpose, rights and repair
  "marriage-purpose": { ar: "السَّكِينَةُ", translit: "As-sakinah", meaning: "Tranquility" },
  "marriage-choose": { ar: "الدِّينُ", translit: "Ad-deen", meaning: "Faith" },
  "marriage-kindness": { ar: "بِالْمَعْرُوفِ", translit: "Bil-ma'ruf", meaning: "With kindness" },
  "marriage-clothing": { ar: "لِبَاسٌ", translit: "Libas", meaning: "Clothing" },
  "marriage-mercy": { ar: "الرَّحْمَةُ", translit: "Ar-rahmah", meaning: "Mercy" },
  "marriage-rights-and-trust-rights-are-trusts": { ar: "حُقُوقٌ", translit: "Huquq", meaning: "Rights" },
  "marriage-rights-and-trust-provision-and-care": { ar: "النَّفَقَةُ", translit: "An-nafaqah", meaning: "Provision" },
  "marriage-conflict-and-repair-argue-with-adab": { ar: "الْأَدَبُ", translit: "Al-adab", meaning: "Good manners" },
  "marriage-conflict-and-repair-repair-after-harm": { ar: "الْإِصْلَاحُ", translit: "Al-islah", meaning: "Making things right" },
  "marriage-conflict-and-repair-bring-in-help-wisely": { ar: "حَكَمٌ", translit: "Hakam", meaning: "Arbiter" },
  "marriage-spiritual-home-pray-together": { ar: "الصَّلَاةُ", translit: "As-salah", meaning: "Prayer" },
  "marriage-spiritual-home-dua-for-the-home": { ar: "الدُّعَاءُ", translit: "Ad-du'a", meaning: "Supplication" },
  "marriage-spiritual-home-patience-and-growth": { ar: "الصَّبْرُ", translit: "As-sabr", meaning: "Patience" },

  // Prophets: names and the lesson each story teaches
  "prophets-adam": { ar: "آدَمُ", translit: "Adam", meaning: "Prophet Adam" },
  "prophets-nuh": { ar: "نُوحٌ", translit: "Nuh", meaning: "Prophet Noah" },
  "prophets-ibrahim": { ar: "إِبْرَاهِيمُ", translit: "Ibrahim", meaning: "Prophet Abraham" },
  "prophets-yusuf": { ar: "يُوسُفُ", translit: "Yusuf", meaning: "Prophet Joseph" },
  "prophets-musa": { ar: "مُوسَى", translit: "Musa", meaning: "Prophet Moses" },
  "prophets-isa": { ar: "عِيسَى", translit: "Isa", meaning: "Prophet Jesus" },
  "prophets-muhammad": { ar: "مُحَمَّدٌ ﷺ", translit: "Muhammad", meaning: "Prophet Muhammad ﷺ" },
  // Quran 2:31: وَعَلَّمَ آدَمَ الْأَسْمَاءَ كُلَّهَا
  "prophets-early-messengers-adam-and-repentance": { ar: "الْأَسْمَاءُ", translit: "Al-asma'", meaning: "The names" },
  // Quran 11:40: مِنْ كُلٍّ زَوْجَيْنِ اثْنَيْنِ
  "prophets-early-messengers-nuh-and-patience": { ar: "زَوْجَيْنِ", translit: "Zawjayn", meaning: "In pairs" },
  // Quran 7:73: هَٰذِهِ نَاقَةُ اللَّهِ لَكُمْ آيَةً
  "prophets-early-messengers-hud-and-salih": { ar: "نَاقَةُ اللَّهِ", translit: "Naqat Allah", meaning: "Allah's she-camel" },
  "prophets-early-messengers-lut-and-purity": { ar: "لُوطٌ", translit: "Lut", meaning: "Prophet Lot" },
  "prophets-family-and-sacrifice-ibrahim-and-tawhid": { ar: "التَّوْحِيدُ", translit: "At-tawhid", meaning: "Oneness of Allah" },
  "prophets-family-and-sacrifice-ismail-and-submission": { ar: "إِسْمَاعِيلُ", translit: "Ismail", meaning: "Prophet Ishmael" },
  "prophets-family-and-sacrifice-yaqub-and-sabr": { ar: "صَبْرٌ جَمِيلٌ", translit: "Sabrun jamil", meaning: "Beautiful patience" },
  "prophets-family-and-sacrifice-yusuf-and-purity": { ar: "الرُّؤْيَا", translit: "Ar-ru'ya", meaning: "The dream" },
  // Quran 20:46: قَالَ لَا تَخَافَا إِنَّنِي مَعَكُمَا
  "prophets-power-and-deliverance-musa-and-fear": { ar: "لَا تَخَافَا", translit: "La takhafa", meaning: "Do not fear" },
  "prophets-power-and-deliverance-harun-and-support": { ar: "هَارُونُ", translit: "Harun", meaning: "Prophet Aaron" },
  "prophets-power-and-deliverance-dawud-and-justice": { ar: "الْعَدْلُ", translit: "Al-adl", meaning: "Justice" },
  "prophets-power-and-deliverance-sulayman-and-gratitude": { ar: "الشُّكْرُ", translit: "Ash-shukr", meaning: "Gratitude" },

  // Women of the Book: women of the Quran and the Mothers of the Believers
  "women-hawwa": { ar: "حَوَّاءُ", translit: "Hawwa", meaning: "Eve, first woman" },
  "women-mother-musa": { ar: "أُمُّ مُوسَى", translit: "Umm Musa", meaning: "Mother of Musa" },
  "women-asiyah": { ar: "آسِيَةُ", translit: "Asiyah", meaning: "Pharaoh's believing wife" },
  "women-maryam": { ar: "مَرْيَمُ", translit: "Maryam", meaning: "Mary, mother of Isa" },
  "women-khadijah": { ar: "خَدِيجَةُ", translit: "Khadijah", meaning: "The Prophet's ﷺ first wife" },
  "women-aishah": { ar: "عَائِشَةُ", translit: "Aishah", meaning: "Mother of the Believers" },
  "women-hafsah": { ar: "حَفْصَةُ", translit: "Hafsah", meaning: "Daughter of Umar" },
  "women-quran-depth-hawwa-and-return": { ar: "التَّوْبَةُ", translit: "At-tawbah", meaning: "Returning to Allah" },
  // Quran 28:13: فَرَدَدْنَاهُ إِلَىٰ أُمِّهِ
  "women-quran-depth-mother-of-musa-and-trust": { ar: "إِلَى أُمِّهِ", translit: "Ila ummih", meaning: "Back to his mother" },
  // Quran 66:11: ابْنِ لِي عِنْدَكَ بَيْتًا فِي الْجَنَّةِ
  "women-quran-depth-asiyah-and-steadfastness": { ar: "بَيْتًا فِي الْجَنَّةِ", translit: "Baytan fil-jannah", meaning: "A house in Paradise" },
  "women-quran-depth-maryam-and-purity": { ar: "سُورَةُ مَرْيَمَ", translit: "Surat Maryam", meaning: "The surah of Maryam" },
  "women-mothers-depth-khadijah-and-support": { ar: "السَّلَامُ", translit: "As-salam", meaning: "The greeting of peace" },
  "women-mothers-depth-sawdah-and-stability": { ar: "سَوْدَةُ", translit: "Sawdah", meaning: "Mother of the Believers" },
  // Sahih al-Bukhari 3662: أَيُّ النَّاسِ أَحَبُّ إِلَيْكَ؟ قَالَ: عَائِشَةُ
  "women-mothers-depth-aishah-and-knowledge": { ar: "أَحَبُّ النَّاسِ", translit: "Ahabb an-nas", meaning: "Most loved of people" },
  // Quran 28:9: قُرَّتُ عَيْنٍ لِي وَلَكَ
  "women-virtues-and-legacy-courage-under-pressure": { ar: "قُرَّةُ عَيْنٍ", translit: "Qurratu 'ayn", meaning: "A joy to the eyes" },
  // Quran 3:37: وَجَدَ عِنْدَهَا رِزْقًا
  "women-virtues-and-legacy-worship-and-devotion": { ar: "الرِّزْقُ", translit: "Ar-rizq", meaning: "Provision from Allah" },
  // Sahih al-Bukhari 3: كَلَّا وَاللَّهِ مَا يُخْزِيكَ اللَّهُ أَبَدًا
  "women-virtues-and-legacy-service-to-revelation": { ar: "مَا يُخْزِيكَ اللَّهُ أَبَدًا", translit: "Ma yukhzikallahu abada", meaning: "Allah will never disgrace you" },
  // Quran 16:97: مَنْ عَمِلَ صَالِحًا مِنْ ذَكَرٍ أَوْ أُنْثَىٰ
  "women-virtues-and-legacy-lessons-for-today": { ar: "مِنْ ذَكَرٍ أَوْ أُنْثَى", translit: "Min dhakarin aw untha", meaning: "Male or female" },

  // Hadith for kids (src/data/hadithBasics.ts): a phrase from the Arabic of each hadith, as sunnah.com gives it
  [hadithBasicsNodeId("muslim:2626")]: { ar: "بِوَجْهٍ طَلْقٍ", translit: "Bi-wajhin talq", meaning: "With a smiling face" },
  [hadithBasicsNodeId("bukhari:28")]: { ar: "السَّلَامُ", translit: "As-salam", meaning: "The greeting of peace" },
  [hadithBasicsNodeId("bukhari:6018")]: { ar: "فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ", translit: "Fal-yaqul khayran aw li-yasmut", meaning: "Say good or keep quiet" },
  [hadithBasicsNodeId("abudawud:4811")]: { ar: "لَا يَشْكُرُ اللَّهَ مَنْ لَا يَشْكُرُ النَّاسَ", translit: "La yashkurullaha man la yashkurun-nas", meaning: "Thank people to thank Allah" },
  [hadithBasicsNodeId("bukhari:5376")]: { ar: "يَا غُلَامُ سَمِّ اللَّهَ", translit: "Ya ghulam, sammi Allah", meaning: "O boy, say Allah's name" },
  [hadithBasicsNodeId("bukhari:13")]: { ar: "مَا يُحِبُّ لِنَفْسِهِ", translit: "Ma yuhibbu li-nafsih", meaning: "What he loves for himself" },
  [hadithBasicsNodeId("bukhari:6114")]: { ar: "الشَّدِيدُ", translit: "Ash-shadid", meaning: "The strong one" },
  [hadithBasicsNodeId("bukhari:69")]: { ar: "يَسِّرُوا وَلَا تُعَسِّرُوا", translit: "Yassiru wa la tu'assiru", meaning: "Make it easy, not hard" },
  [hadithBasicsNodeId("bukhari:5027")]: { ar: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ", translit: "Khayrukum man ta'allamal-Qur'ana wa 'allamah", meaning: "Best: who learns and teaches the Quran" },
  [hadithBasicsNodeId("muslim:2564c")]: { ar: "قُلُوبِكُمْ وَأَعْمَالِكُمْ", translit: "Qulubikum wa a'malikum", meaning: "Your hearts and your deeds" },

  // Ramadan (src/data/ramadanDays.ts): a phrase from each day's ayah or hadith
  ...RAMADAN.nodeArabic,
  // New to Islam (src/data/introToIslam.ts): a phrase from each lesson's ayah or hadith
  ...INTRO.nodeArabic
};

// Lessons imported from notes (scripts/obsidian-import) get their term from what they are about:
// the surah's name, the person's name or the hadith. Ids come from the notes, so these are matched
// by surah number and by the last part of the node id.

// Surah names in the order of the mushaf, checked against a second list of the 114 names. They are
// vowelled as they read after سُورَةُ; names that are a phrase (المؤمنون, الكافرون) keep their own ending,
// and the letter names (طه, يس, ص, ق) stay as written in the mushaf.
const SURAH_NAMES = [
  "الْفَاتِحَةِ", "الْبَقَرَةِ", "آلِ عِمْرَانَ", "النِّسَاءِ", "الْمَائِدَةِ", "الْأَنْعَامِ", "الْأَعْرَافِ", "الْأَنْفَالِ", "التَّوْبَةِ", "يُونُسَ",
  "هُودٍ", "يُوسُفَ", "الرَّعْدِ", "إِبْرَاهِيمَ", "الْحِجْرِ", "النَّحْلِ", "الْإِسْرَاءِ", "الْكَهْفِ", "مَرْيَمَ", "طه",
  "الْأَنْبِيَاءِ", "الْحَجِّ", "الْمُؤْمِنُونَ", "النُّورِ", "الْفُرْقَانِ", "الشُّعَرَاءِ", "النَّمْلِ", "الْقَصَصِ", "الْعَنْكَبُوتِ", "الرُّومِ",
  "لُقْمَانَ", "السَّجْدَةِ", "الْأَحْزَابِ", "سَبَأٍ", "فَاطِرٍ", "يس", "الصَّافَّاتِ", "ص", "الزُّمَرِ", "غَافِرٍ",
  "فُصِّلَتْ", "الشُّورَى", "الزُّخْرُفِ", "الدُّخَانِ", "الْجَاثِيَةِ", "الْأَحْقَافِ", "مُحَمَّدٍ", "الْفَتْحِ", "الْحُجُرَاتِ", "ق",
  "الذَّارِيَاتِ", "الطُّورِ", "النَّجْمِ", "الْقَمَرِ", "الرَّحْمَنِ", "الْوَاقِعَةِ", "الْحَدِيدِ", "الْمُجَادِلَةِ", "الْحَشْرِ", "الْمُمْتَحَنَةِ",
  "الصَّفِّ", "الْجُمُعَةِ", "الْمُنَافِقُونَ", "التَّغَابُنِ", "الطَّلَاقِ", "التَّحْرِيمِ", "الْمُلْكِ", "الْقَلَمِ", "الْحَاقَّةِ", "الْمَعَارِجِ",
  "نُوحٍ", "الْجِنِّ", "الْمُزَّمِّلِ", "الْمُدَّثِّرِ", "الْقِيَامَةِ", "الْإِنْسَانِ", "الْمُرْسَلَاتِ", "النَّبَأِ", "النَّازِعَاتِ", "عَبَسَ",
  "التَّكْوِيرِ", "الِانْفِطَارِ", "الْمُطَفِّفِينَ", "الِانْشِقَاقِ", "الْبُرُوجِ", "الطَّارِقِ", "الْأَعْلَى", "الْغَاشِيَةِ", "الْفَجْرِ", "الْبَلَدِ",
  "الشَّمْسِ", "اللَّيْلِ", "الضُّحَى", "الشَّرْحِ", "التِّينِ", "الْعَلَقِ", "الْقَدْرِ", "الْبَيِّنَةِ", "الزَّلْزَلَةِ", "الْعَادِيَاتِ",
  "الْقَارِعَةِ", "التَّكَاثُرِ", "الْعَصْرِ", "الْهُمَزَةِ", "الْفِيلِ", "قُرَيْشٍ", "الْمَاعُونِ", "الْكَوْثَرِ", "الْكَافِرُونَ", "النَّصْرِ",
  "الْمَسَدِ", "الْإِخْلَاصِ", "الْفَلَقِ", "النَّاسِ"
];

// [Arabic, meaning]; the transliteration is the lesson's own title.
type PersonTerm = [ar: string, meaning: string];
const COMPANION = "Companion of the Prophet ﷺ";
const DAUGHTER = "Daughter of the Prophet ﷺ";
const MOTHER_OF_BELIEVERS = "Mother of the Believers";
const WIFE_OF_ALI = "Wife of Ali";

const PEOPLE: Partial<Record<TopicId, Record<string, PersonTerm>>> = {
  sahabah: {
    "abd-allah-ibn-umar": ["عَبْدُ اللَّهِ بْنُ عُمَرَ", COMPANION],
    // The note's file name is spelt "Lyaash"; the person is 'Ayyash ibn Abi Rabi'ah al-Makhzumi.
    "lyaash-ibn-abi-rabiyyah": ["عَيَّاشُ بْنُ أَبِي رَبِيعَةَ", COMPANION],
    "abd-allah-ibn-masuud": ["عَبْدُ اللَّهِ بْنُ مَسْعُودٍ", "Quran reciter"],
    "abbas-ibn-abd-al-muttalib": ["الْعَبَّاسُ بْنُ عَبْدِ الْمُطَّلِبِ", "Uncle of the Prophet ﷺ"],
    "abdullah-ibn-amr-ibn-al-aas": ["عَبْدُ اللَّهِ بْنُ عَمْرِو بْنِ الْعَاصِ", COMPANION],
    "abdullah-ibn-amr-ibn-haram": ["عَبْدُ اللَّهِ بْنُ عَمْرِو بْنِ حَرَامٍ", COMPANION],
    "abdullah-ibn-jahsh": ["عَبْدُ اللَّهِ بْنُ جَحْشٍ", COMPANION],
    "abdullah-ibn-jubayr": ["عَبْدُ اللَّهِ بْنُ جُبَيْرٍ", COMPANION],
    "abdullah-ibn-rawahah": ["عَبْدُ اللَّهِ بْنُ رَوَاحَةَ", COMPANION],
    "abdullah-ibn-zubair": ["عَبْدُ اللَّهِ بْنُ الزُّبَيْرِ", COMPANION],
    "abu-al-as-ibn-al-rabi": ["أَبُو الْعَاصِ بْنُ الرَّبِيعِ", COMPANION],
    "abu-bakr-as-siddiq": ["أَبُو بَكْرٍ الصِّدِّيقُ", "The truthful one"],
    "abu-dharr-al-ghifaariy": ["أَبُو ذَرٍّ الْغِفَارِيُّ", COMPANION],
    "abu-hurayra": ["أَبُو هُرَيْرَةَ", COMPANION],
    "abu-lubaba-ibn-abd-al-mundhir": ["أَبُو لُبَابَةَ بْنُ عَبْدِ الْمُنْذِرِ", COMPANION],
    "abu-muusaa-al-ashariy": ["أَبُو مُوسَى الْأَشْعَرِيُّ", COMPANION],
    "abu-sufyan-ibn-harb": ["أَبُو سُفْيَانَ بْنُ حَرْبٍ", COMPANION],
    "abu-ubaydah-ibn-al-jarrah": ["أَبُو عُبَيْدَةَ بْنُ الْجَرَّاحِ", "Trustee of the Ummah"],
    "abu-umamah-al-bahili": ["أَبُو أُمَامَةَ الْبَاهِلِيُّ", COMPANION],
    "al-hasan-ibn-ali": ["الْحَسَنُ بْنُ عَلِيٍّ", "Grandson of the Prophet ﷺ"],
    "al-husayn-ibn-ali": ["الْحُسَيْنُ بْنُ عَلِيٍّ", "Grandson of the Prophet ﷺ"],
    "ali-ibn-abi-talib": ["عَلِيُّ بْنُ أَبِي طَالِبٍ", "Fourth caliph"],
    "ammar-ibn-yasir": ["عَمَّارُ بْنُ يَاسِرٍ", COMPANION],
    "amr-ibn-al-as": ["عَمْرُو بْنُ الْعَاصِ", COMPANION],
    "amr-ibn-al-jamuh": ["عَمْرُو بْنُ الْجَمُوحِ", COMPANION],
    "anas-ibn-malik": ["أَنَسُ بْنُ مَالِكٍ", "The Prophet's ﷺ servant"],
    "asad-ibn-zoraarah": ["أَسْعَدُ بْنُ زُرَارَةَ", COMPANION],
    "asma-bint-umays": ["أَسْمَاءُ بِنْتُ عُمَيْسٍ", COMPANION],
    bilal: ["بِلَالٌ", "First muezzin"],
    "fatimah-al-zahra": ["فَاطِمَةُ الزَّهْرَاءُ", DAUGHTER],
    "fatimah-bint-asad": ["فَاطِمَةُ بِنْتُ أَسَدٍ", "Mother of Ali"],
    "ghailan-b-salama-ath-thaqafi": ["غَيْلَانُ بْنُ سَلَمَةَ الثَّقَفِيُّ", COMPANION],
    "haarith-ibn-hishaan": ["الْحَارِثُ بْنُ هِشَامٍ", COMPANION],
    "hakim-ibn-hizam": ["حَكِيمُ بْنُ حِزَامٍ", COMPANION],
    "hamza-ibn-abdul-muttalib": ["حَمْزَةُ بْنُ عَبْدِ الْمُطَّلِبِ", "Uncle of the Prophet ﷺ"],
    "hanzalah-ibn-abi-amir": ["حَنْظَلَةُ بْنُ أَبِي عَامِرٍ", COMPANION],
    "ikrimah-ibn-abi-jahl": ["عِكْرِمَةُ بْنُ أَبِي جَهْلٍ", COMPANION],
    "jafar-ibn-abi-taalib": ["جَعْفَرُ بْنُ أَبِي طَالِبٍ", COMPANION],
    "jabir-ibn-abdullah": ["جَابِرُ بْنُ عَبْدِ اللَّهِ", COMPANION],
    "jubayr-ibn-mutim": ["جُبَيْرُ بْنُ مُطْعِمٍ", COMPANION],
    julaybib: ["جُلَيْبِيبٌ", COMPANION],
    "kaab-ibn-zuhair": ["كَعْبُ بْنُ زُهَيْرٍ", COMPANION],
    "kaab-ibn-malik": ["كَعْبُ بْنُ مَالِكٍ", COMPANION],
    "khabbaab-ibn-al-arat": ["خَبَّابُ بْنُ الْأَرَتِّ", COMPANION],
    "khalid-ibn-al-walid": ["خَالِدُ بْنُ الْوَلِيدِ", "Sword of Allah"],
    "khawlah-bint-hakim": ["خَوْلَةُ بِنْتُ حَكِيمٍ", COMPANION],
    "makhrama-ibn-nawfal": ["مَخْرَمَةُ بْنُ نَوْفَلٍ", COMPANION],
    "maria-al-qibtiyya": ["مَارِيَةُ الْقِبْطِيَّةُ", "Mother of Ibrahim, the Prophet's ﷺ son"],
    "muawiyah-ibn-abi-sufyan": ["مُعَاوِيَةُ بْنُ أَبِي سُفْيَانَ", COMPANION],
    "musab-ibn-umair": ["مُصْعَبُ بْنُ عُمَيْرٍ", COMPANION],
    "nuayman-ibn-amr": ["نُعَيْمَانُ بْنُ عَمْرٍو", COMPANION],
    "ruqayyah-bint-muhammad": ["رُقَيَّةُ بِنْتُ مُحَمَّدٍ", DAUGHTER],
    "sad-ibn-ubaadah": ["سَعْدُ بْنُ عُبَادَةَ", COMPANION],
    "sad-ibn-muaadh": ["سَعْدُ بْنُ مُعَاذٍ", COMPANION],
    "safwan-ibn-muattal": ["صَفْوَانُ بْنُ الْمُعَطَّلِ", COMPANION],
    "salmaan-al-faarisiy": ["سَلْمَانُ الْفَارِسِيُّ", "Salman the Persian"],
    "suhaib-al-rumi": ["صُهَيْبٌ الرُّومِيُّ", COMPANION],
    "suhail-ibn-amr": ["سُهَيْلُ بْنُ عَمْرٍو", COMPANION],
    "suraqa-ibn-malik": ["سُرَاقَةُ بْنُ مَالِكٍ", COMPANION],
    "tamim-al-dari": ["تَمِيمٌ الدَّارِيُّ", COMPANION],
    "thaabit-ibn-aqram": ["ثَابِتُ بْنُ أَقْرَمَ", COMPANION],
    thalabah: ["ثَعْلَبَةُ بْنُ حَاطِبٍ", COMPANION],
    "ubaydah-ibn-al-harith": ["عُبَيْدَةُ بْنُ الْحَارِثِ", COMPANION],
    "umar-ibn-al-khattab": ["عُمَرُ بْنُ الْخَطَّابِ", "Second caliph"],
    "umm-ayman": ["أُمُّ أَيْمَنَ", COMPANION],
    "umm-kulthum-bint-muhammad": ["أُمُّ كُلْثُومٍ بِنْتُ مُحَمَّدٍ", DAUGHTER],
    "umm-ruman": ["أُمُّ رُومَانَ", COMPANION],
    "urwah-ibn-abi-al-jad-al-bariqi": ["عُرْوَةُ بْنُ أَبِي الْجَعْدِ الْبَارِقِيُّ", COMPANION],
    "usama-ibn-zayd": ["أُسَامَةُ بْنُ زَيْدٍ", COMPANION],
    "usayd-ibn-hudayr": ["أُسَيْدُ بْنُ حُضَيْرٍ", COMPANION],
    "uthman-ibn-affan": ["عُثْمَانُ بْنُ عَفَّانَ", "Third caliph"],
    "walid-ibn-al-walid-ibn-al-mughirah": ["الْوَلِيدُ بْنُ الْوَلِيدِ بْنِ الْمُغِيرَةِ", COMPANION],
    "yazid-ibn-abi-sufyan": ["يَزِيدُ بْنُ أَبِي سُفْيَانَ", COMPANION],
    "zayd-ibn-harithah": ["زَيْدُ بْنُ حَارِثَةَ", COMPANION],
    "zayd-ibn-thabit": ["زَيْدُ بْنُ ثَابِتٍ", COMPANION],
    "zaynab-bint-muhammad": ["زَيْنَبُ بِنْتُ مُحَمَّدٍ", DAUGHTER],
    "zubayr-ibn-al-awwam": ["الزُّبَيْرُ بْنُ الْعَوَّامِ", "The Prophet's ﷺ disciple"],
    "abd-allah-ibn-abbas": ["عَبْدُ اللَّهِ بْنُ عَبَّاسٍ", COMPANION],
    "umayr-ibn-wahb-al-jumahi": ["عُمَيْرُ بْنُ وَهْبٍ الْجُمَحِيُّ", COMPANION]
  },
  prophets: {
    adam: ["آدَمُ", "Prophet Adam"],
    alyasa: ["الْيَسَعُ", "Prophet Elisha"],
    ayyub: ["أَيُّوبُ", "Prophet Job"],
    dawud: ["دَاوُدُ", "Prophet David"],
    "dhu-al-kifl": ["ذُو الْكِفْلِ", "Named in the Quran"],
    harun: ["هَارُونُ", "Prophet Aaron"],
    hud: ["هُودٌ", "Prophet Hud"],
    ibrahim: ["إِبْرَاهِيمُ", "Prophet Abraham"],
    idris: ["إِدْرِيسُ", "Prophet Idris"],
    ilyas: ["إِلْيَاسُ", "Prophet Elijah"],
    isa: ["عِيسَى", "Prophet Jesus"],
    ishaq: ["إِسْحَاقُ", "Prophet Isaac"],
    ismail: ["إِسْمَاعِيلُ", "Prophet Ishmael"],
    lut: ["لُوطٌ", "Prophet Lot"],
    muhammad: ["مُحَمَّدٌ ﷺ", "Prophet Muhammad ﷺ"],
    musa: ["مُوسَى", "Prophet Moses"],
    noah: ["نُوحٌ", "Prophet Noah"],
    shaleh: ["صَالِحٌ", "Prophet Salih"],
    shuaib: ["شُعَيْبٌ", "Prophet Shu'ayb"],
    sulaiman: ["سُلَيْمَانُ", "Prophet Solomon"],
    yahya: ["يَحْيَى", "Prophet John"],
    yaqub: ["يَعْقُوبُ", "Prophet Jacob"],
    yunus: ["يُونُسُ", "Prophet Jonah"],
    "yusha-ibn-nun": ["يُوشَعُ بْنُ نُونٍ", "Joshua, Musa's helper"],
    yusuf: ["يُوسُفُ", "Prophet Joseph"],
    zakaria: ["زَكَرِيَّا", "Prophet Zechariah"]
  },
  women_of_the_book: {
    "aisha-bint-abu-bakr": ["عَائِشَةُ بِنْتُ أَبِي بَكْرٍ", MOTHER_OF_BELIEVERS],
    "al-sahba-al-taghlibiyyah": ["الصَّهْبَاءُ التَّغْلِبِيَّةُ", WIFE_OF_ALI],
    "aminah-bint-wahb": ["آمِنَةُ بِنْتُ وَهْبٍ", "Mother of the Prophet ﷺ"],
    "grandmother-of-isa-wife-of-imran": ["امْرَأَةُ عِمْرَانَ", "Mother of Maryam"],
    "hafsa-bint-umar": ["حَفْصَةُ بِنْتُ عُمَرَ", MOTHER_OF_BELIEVERS],
    hajar: ["هَاجَرُ", "Mother of Ismail"],
    "halima-al-sadeya": ["حَلِيمَةُ السَّعْدِيَّةُ", "Nurse of the Prophet ﷺ as a baby"],
    "juwayriya-bint-al-harith": ["جُوَيْرِيَةُ بِنْتُ الْحَارِثِ", MOTHER_OF_BELIEVERS],
    "khadijah-bint-khuwaylid": ["خَدِيجَةُ بِنْتُ خُوَيْلِدٍ", MOTHER_OF_BELIEVERS],
    "khawlah-bint-jafar-al-hanifiyyah": ["خَوْلَةُ بِنْتُ جَعْفَرٍ الْحَنَفِيَّةُ", WIFE_OF_ALI],
    "layla-bint-masud-al-tamimiyyah": ["لَيْلَى بِنْتُ مَسْعُودٍ التَّمِيمِيَّةُ", WIFE_OF_ALI],
    maryam: ["مَرْيَمُ", "Mother of Isa"],
    "maymunah-bint-al-harith": ["مَيْمُونَةُ بِنْتُ الْحَارِثِ", MOTHER_OF_BELIEVERS],
    "safiyyah-bint-huyayy": ["صَفِيَّةُ بِنْتُ حُيَيٍّ", MOTHER_OF_BELIEVERS],
    sarah: ["سَارَةُ", "Wife of Ibrahim"],
    "sawdah-bint-zamah": ["سَوْدَةُ بِنْتُ زَمْعَةَ", MOTHER_OF_BELIEVERS],
    "sayyida-nafisa": ["السَّيِّدَةُ نَفِيسَةُ", "From the Prophet's ﷺ family"],
    "umayma-bint-abd-al-muttalib": ["أُمَيْمَةُ بِنْتُ عَبْدِ الْمُطَّلِبِ", "Aunt of the Prophet ﷺ"],
    "umm-al-banin": ["أُمُّ الْبَنِينَ", WIFE_OF_ALI],
    "umm-habibah": ["أُمُّ حَبِيبَةَ", MOTHER_OF_BELIEVERS],
    "umm-kulthoom-bint-ali": ["أُمُّ كُلْثُومٍ بِنْتُ عَلِيٍّ", "Granddaughter of the Prophet ﷺ"],
    "umm-said-bint-urwah-al-thaqafiyyah": ["أُمُّ سَعِيدٍ بِنْتُ عُرْوَةَ الثَّقَفِيَّةُ", WIFE_OF_ALI],
    "umm-salamah-wife-of-the-prophet": ["أُمُّ سَلَمَةَ", MOTHER_OF_BELIEVERS],
    "zaynab-bint-ali": ["زَيْنَبُ بِنْتُ عَلِيٍّ", "Granddaughter of the Prophet ﷺ"],
    "zaynab-bint-jahsh": ["زَيْنَبُ بِنْتُ جَحْشٍ", MOTHER_OF_BELIEVERS],
    "zaynab-bint-khuzayma": ["زَيْنَبُ بِنْتُ خُزَيْمَةَ", MOTHER_OF_BELIEVERS]
  }
};

// A hadith node's own word: a short phrase from the hadith, or the word it teaches. Keyed by the last part
// of the node id, which names the hadith (book and number).
const HADITH_TERMS: Record<string, ArabicTerm> = {
  "sahih-al-bukhari-3276": { ar: "أَعُوذُ بِاللَّهِ", translit: "A'udhu billah", meaning: "I seek refuge with Allah" },
  // Only in the sample vault: the notes have Bukhari 3276, the same narration, instead.
  "sahih-muslim-134a": { ar: "آمَنْتُ بِاللَّهِ", translit: "Amantu billah", meaning: "I believe in Allah" },
  "sahih-muslim-1218a": { ar: "كِتَابُ اللَّهِ", translit: "Kitab Allah", meaning: "The Book of Allah" },
  "sahih-muslim-2813b": { ar: "إِبْلِيسُ", translit: "Iblis", meaning: "The leader of the devils" },
  "sahih-muslim-2930a": { ar: "الدَّجَّالُ", translit: "Ad-Dajjal", meaning: "The great liar" },
  "mishkat-al-masabih-3096": { ar: "نِصْفُ الدِّينِ", translit: "Nisf ad-din", meaning: "Half of the religion" },
  "sunan-ibn-majah-1855": { ar: "الْمَرْأَةُ الصَّالِحَةُ", translit: "Al-mar'ah as-salihah", meaning: "A righteous wife" },
  "mishkat-al-masabih-3176": { ar: "غَيْلَانُ بْنُ سَلَمَةَ", translit: "Ghaylan ibn Salamah", meaning: "A companion from Thaqif" },
  "sahih-al-bukhari-5066": { ar: "يَا مَعْشَرَ الشَّبَابِ", translit: "Ya ma'shar ash-shabab", meaning: "O young people" },
  "sunan-an-nasai-3227": { ar: "الْوَدُودُ الْوَلُودُ", translit: "Al-wadud al-walud", meaning: "Loving and fertile" }
};

// A hadith without its own word above gets the name of its book.
const HADITH_BOOKS: Record<string, ArabicTerm> = {
  "Sahih al-Bukhari": { ar: "صَحِيحُ الْبُخَارِيِّ", translit: "Sahih al-Bukhari", meaning: "Hadith book of al-Bukhari" },
  "Sahih Muslim": { ar: "صَحِيحُ مُسْلِمٍ", translit: "Sahih Muslim", meaning: "Hadith book of Imam Muslim" },
  "Jami' at-Tirmidhi": { ar: "جَامِعُ التِّرْمِذِيِّ", translit: "Jami' at-Tirmidhi", meaning: "Hadith book of at-Tirmidhi" },
  "Sunan an-Nasa'i": { ar: "سُنَنُ النَّسَائِيِّ", translit: "Sunan an-Nasa'i", meaning: "Hadith book of an-Nasa'i" },
  "Sunan Ibn Majah": { ar: "سُنَنُ ابْنِ مَاجَهْ", translit: "Sunan Ibn Majah", meaning: "Hadith book of Ibn Majah" },
  "Mishkat al-Masabih": { ar: "مِشْكَاةُ الْمَصَابِيحِ", translit: "Mishkat al-Masabih", meaning: "Hadith book: Niche of Lamps" }
};

// Banners of the imported units, which are lists of surahs, people or hadith.
const IMPORTED_UNIT_ARABIC: Partial<Record<TopicId, ArabicTerm>> = {
  quran_tafseer: { ar: "سور القرآن", translit: "Suwar al-Quran", meaning: "Surahs of the Quran" },
  sahabah: TOPIC_ARABIC.sahabah,
  prophets: { ar: "الأنبياء", translit: "Al-anbiya", meaning: "The prophets" },
  women_of_the_book: { ar: "النساء", translit: "An-nisa", meaning: "Women" },
  hadith: TOPIC_ARABIC.hadith
};

// The vowelled form of every unit banner word, for a learn card that borrows it. Each one, without its
// vowel marks, is exactly the banner's spelling (the tests check this).
const LEARN_FORMS = [
  "الْمُهَاجِرُونَ", "أَبُو حَنِيفَةَ", "مَالِكُ بْنُ أَنَسٍ", "الشَّافِعِيُّ", "أَحْمَدُ بْنُ حَنْبَلٍ", "ابْنُ تَيْمِيَّةَ", "ابْنُ بَازٍ", "الْأَلْبَانِيُّ",
  "عِلْمُ عُمَرَ", "عِلْمُ عَائِشَةَ", "ابْنُ مَسْعُودٍ", "ابْنُ عَبَّاسٍ", "ابْنُ عُمَرَ",
  "عَلْقَمَةُ بْنُ وَقَّاصٍ", "عُرْوَةُ بْنُ الزُّبَيْرِ", "نَافِعٌ", "عَطَاءُ بْنُ أَبِي رَبَاحٍ", "عَلْقَمَةُ بْنُ قَيْسٍ", "مُحَمَّدُ بْنُ إِبْرَاهِيمَ التَّيْمِيُّ", "ابْنُ شِهَابٍ الزُّهْرِيُّ", "إِبْرَاهِيمُ النَّخَعِيُّ", "يَحْيَى بْنُ سَعِيدٍ الْأَنْصَارِيُّ", "حَمَّادُ بْنُ أَبِي سُلَيْمَانَ",
  "التَّحِيَّةُ", "الْأَذْكَارُ الْيَوْمِيَّةُ", "الْعِبَارَاتُ الْيَوْمِيَّةُ",
  "آدَابُ الْبَيْتِ وَالطَّعَامِ", "بِدَايَةُ الْعِبَادَةِ", "الْوُضُوءُ", "أَسَاسِيَّاتُ الصَّلَاةِ",
  "أَوْقَاتُ الصَّلَاةِ", "الْأَذَانُ وَالْإِقَامَةُ", "الرُّكُوعُ وَالسُّجُودُ", "التَّشَهُّدُ",
  "الْخُشُوعُ", "مُبْطِلَاتُ الصَّلَاةِ", "صَلَاةُ الْجَمَاعَةِ", "قَضَاءُ الصَّلَاةِ",
  "مُرَاجَعَةُ الْوُضُوءِ وَالصَّلَاةِ", "التَّوْحِيدُ", "أَرْكَانُ الْإِيمَانِ", "الْأَسْمَاءُ وَالصِّفَاتُ",
  "الْإِيمَانُ وَالْعَمَلُ", "آدَابُ الْكَلَامِ", "بِرُّ الْوَالِدَيْنِ", "الرَّحْمَةُ",
  "الْجَارُ وَالضَّيْفُ", "ضَبْطُ النَّفْسِ", "الْآدَابُ الْعَامَّةُ", "حِكْمَةُ الصِّيَامِ",
  "أَحْكَامُ الصِّيَامِ", "حِفْظُ الصِّيَامِ", "شَهْرُ رَمَضَانَ", "فَرِيضَةُ الزَّكَاةِ",
  "مَصَارِفُ الزَّكَاةِ", "النِّيَّةُ وَالْإِخْلَاصُ", "الصَّدَقَةُ وَالْكَرَمُ", "فَرِيضَةُ الْحَجِّ",
  "مَنَاسِكُ الْحَجِّ", "الْمَشَاعِرُ الْمُقَدَّسَةُ", "دُرُوسُ الْحَجِّ", "مَقَاصِدُ الزَّوَاجِ",
  "الْمَوَدَّةُ وَالرَّحْمَةُ", "الْحُقُوقُ وَالْأَمَانَةُ", "الْإِصْلَاحُ بَيْنَ الزَّوْجَيْنِ",
  "الْبَيْتُ الْمُسْلِمُ", "بِدَايَةُ الْبَشَرِيَّةِ", "ابْتِلَاءُ الرُّسُلِ", "خَاتَمُ النَّبِيِّينَ",
  "الرُّسُلُ الْأَوَائِلُ", "آلُ إِبْرَاهِيمَ", "مُوسَى وَدَاوُدُ وَسُلَيْمَانُ", "أَبُو بَكْرٍ الصِّدِّيقُ",
  "عُمَرُ بْنُ الْخَطَّابِ", "عُثْمَانُ بْنُ عَفَّانَ", "عَلِيُّ بْنُ أَبِي طَالِبٍ",
  "خَالِدُ بْنُ الْوَلِيدِ", "بِلَالُ بْنُ رَبَاحٍ", "أَبُو عُبَيْدَةَ بْنُ الْجَرَّاحِ",
  "طَلْحَةُ بْنُ عُبَيْدِ اللَّهِ", "الزُّبَيْرُ بْنُ الْعَوَّامِ", "سَعْدُ بْنُ أَبِي وَقَّاصٍ",
  "سَلْمَانُ الْفَارِسِيُّ", "أَبُو ذَرٍّ الْغِفَارِيُّ", "عَبْدُ اللَّهِ بْنُ مَسْعُودٍ",
  "أَنَسُ بْنُ مَالِكٍ", "النِّسَاءُ فِي الْقُرْآنِ", "أُمَّهَاتُ الْمُؤْمِنِينَ",
  "سُوَرُ الْقُرْآنِ", "الْأَنْبِيَاءُ", "النِّسَاءُ", "الصَّحَابَةُ",
  "الْحَدِيثُ", "الْأُمَّهَاتُ", "آلُ عَلِيٍّ", "أَحَادِيثُ لِلْأَطْفَالِ", "فِي حِفْظِ اللَّهِ",
  "الزَّوَاجُ فِي السُّنَّةِ", "أَهْلًا رَمَضَانُ", "أَعْمَالُ رَمَضَانَ", "الْعَشْرُ الْأَوَاخِرُ",
  "مَا الْإِسْلَامُ", "أَنْبِيَاءُ تَعْرِفُهُمْ", "أَهْلُ الْكِتَابِ", "الْخُطُوَاتُ الْأُولَى",
  ...SURAH_NAMES.map((name) => `سُورَةُ ${name}`)
];
const LEARN_FORM = new Map(LEARN_FORMS.map((form) => [withoutVowels(form), form]));

function hadithBook(lesson: Lesson | undefined): string | undefined {
  const reference = lesson?.quote?.reference ?? lesson?.sources[0]?.title ?? "";
  return /^(.+?) \d+[a-z]?\b/.exec(reference)?.[1];
}

function importedNodeTerm(topicId: TopicId, node: LearningNode, lesson: Lesson | undefined): ArabicTerm | undefined {
  const slug = node.id.slice(node.branchId.length + 1);
  if (topicId === "quran_tafseer") {
    const number = Number(/^https:\/\/quran\.com\/(\d+)$/.exec(lesson?.sources[0]?.url ?? "")?.[1]);
    const name = SURAH_NAMES[number - 1];
    // 'Surah An-Nas means "Mankind".' or, for a surah named after a person or its letters,
    // "Surah Hud is named after Prophet Hud."
    const intro = lesson?.intro ?? "";
    const namedAfter = /\bis named after (.+?)\.?$/.exec(intro)?.[1];
    const meaning = /\bmeans "([^"]+)"/.exec(intro)?.[1] ?? (namedAfter ? `Named after ${namedAfter}` : undefined);
    return name ? { ar: `سُورَةُ ${name}`, translit: node.title, meaning: meaning ?? `Surah ${number}` } : undefined;
  }
  if (topicId === "hadith") {
    const book = hadithBook(lesson);
    return HADITH_TERMS[slug] ?? (book ? HADITH_BOOKS[book] : undefined);
  }
  const person = PEOPLE[topicId]?.[slug];
  return person ? { ar: person[0], translit: node.title, meaning: person[1] } : undefined;
}

function buildImportedTerms() {
  const nodes: Record<string, ArabicTerm> = {};
  const branches: Record<string, ArabicTerm> = {};
  for (const section of IMPORTED_NOTES.sections) {
    const banner = IMPORTED_UNIT_ARABIC[section.topicId];
    for (const branch of section.branches) if (banner) branches[branch.id] = banner;
    for (const node of section.nodes) {
      const term = importedNodeTerm(section.topicId, node, IMPORTED_NOTES.lessonsById[node.lessonIds[0]]);
      if (term) nodes[node.id] = term;
    }
  }
  return { nodes, branches };
}

/** Terms for imported nodes and units, by node or branch id. */
export const IMPORTED_ARABIC = buildImportedTerms();

// The banner of a unit of imported companions or prophets names its lead person (UNIT_LEADS in importedNotes.ts),
// "and more": the vowelled form here, the banner is the same without vowel marks.
const UNIT_LEAD_ARABIC: Record<string, { form: string; translit: string }> = {
  "abd-allah-ibn-umar": { form: "ابْنُ عُمَرَ وَغَيْرُهُ", translit: "Ibn Umar wa ghayruh" },
  "abu-hurayra": { form: "أَبُو هُرَيْرَةَ وَغَيْرُهُ", translit: "Abu Hurayrah wa ghayruh" },
  "fatimah-al-zahra": { form: "فَاطِمَةُ الزَّهْرَاءُ وَغَيْرُهَا", translit: "Fatimah az-Zahra wa ghayruha" },
  "hamza-ibn-abdul-muttalib": { form: "حَمْزَةُ وَغَيْرُهُ", translit: "Hamzah wa ghayruh" },
  "musab-ibn-umair": { form: "مُصْعَبٌ وَغَيْرُهُ", translit: "Mus'ab wa ghayruh" },
  "sad-ibn-muaadh": { form: "سَعْدُ بْنُ مُعَاذٍ وَغَيْرُهُ", translit: "Sa'd ibn Mu'adh wa ghayruh" },
  "usama-ibn-zayd": { form: "أُسَامَةُ وَغَيْرُهُ", translit: "Usamah wa ghayruh" },
  "zayd-ibn-harithah": { form: "زَيْدُ بْنُ حَارِثَةَ وَغَيْرُهُ", translit: "Zayd ibn Harithah wa ghayruh" },
  ayyub: { form: "أَيُّوبُ وَغَيْرُهُ", translit: "Ayyub wa ghayruh" },
  yunus: { form: "يُونُسُ وَغَيْرُهُ", translit: "Yunus wa ghayruh" }
};

// A unit of imported surahs is named after its first and last surah: "مِنْ سُورَةِ النَّاسِ إِلَى سُورَةِ الْفِيلِ".
// The ids name the span by surah number (src/data/importedNotes.ts). A no-break space holds "سورة" to its name,
// so a small phone never ends a line on "سورة" with the name alone below it.
const SURAH_SPAN_UNIT = /^notes-quran-tafseer-surahs-(\d+)(?:-(\d+))?$/;
// A surah with a unit of its own for its whole meaning (src/data/surahMeanings) is named like a span of one surah.
const SURAH_MEANING_UNIT = /^quran-surah-meaning-(\d+)$/;

function surahSpanForm(first: number, last: number) {
  const name = (surah: number) => `\u00a0${SURAH_NAMES[surah - 1].replace(/ /g, "\u00a0")}`;
  return first === last ? `سُورَةُ${name(first)}` : `مِنْ سُورَةِ${name(first)} إِلَى سُورَةِ${name(last)}`;
}

// Banners of the imported units that are named after what they hold, by branch id, with each banner's vowelled
// form. Built from the course, once, the first time a banner is asked for.
let namedImportedUnits: Map<string, { term: ArabicTerm; form: string }> | undefined;

function buildNamedImportedUnits() {
  const units = new Map<string, { term: ArabicTerm; form: string }>();
  for (const section of COURSE.sections) {
    for (const branch of section.branches) {
      if (!(branch.id.startsWith("notes-") || SURAH_MEANING_UNIT.test(branch.id)) || Object.prototype.hasOwnProperty.call(BRANCH_ARABIC, branch.id)) continue;
      const span = SURAH_SPAN_UNIT.exec(branch.id) ?? SURAH_MEANING_UNIT.exec(branch.id);
      const first = span ? Number(span[1]) : NaN;
      const last = span ? Number(span[2] ?? span[1]) : NaN;
      if (SURAH_NAMES[first - 1] && SURAH_NAMES[last - 1]) {
        const form = surahSpanForm(first, last);
        units.set(branch.id, { form, term: { ar: withoutVowels(form), translit: branch.title, meaning: branch.title } });
        continue;
      }
      const lead = section.nodes
        .filter((node) => node.branchId === branch.id)
        .map((node) => importedPersonSlug(node.id) ?? "")
        .find((slug) => UNIT_LEADS[slug] && UNIT_LEAD_ARABIC[slug]);
      if (lead) {
        const { form, translit } = UNIT_LEAD_ARABIC[lead];
        units.set(branch.id, { form, term: { ar: withoutVowels(form), translit, meaning: branch.title } });
      }
    }
  }
  return units;
}

function namedImportedUnit(branchId: string) {
  namedImportedUnits ??= buildNamedImportedUnits();
  return namedImportedUnits.get(branchId);
}

// The course regroups imported lessons into new units (src/data/importedNotes.ts), whose ids start
// with "notes-" and the topic, so a new unit still gets its topic's banner.
const IMPORTED_UNIT_PREFIXES = (Object.keys(IMPORTED_UNIT_ARABIC) as TopicId[]).map(
  (topicId) => [`notes-${topicId.replace(/_/g, "-")}-`, IMPORTED_UNIT_ARABIC[topicId]!] as const
);

function lookup(table: Record<string, ArabicTerm>, id: string | undefined): ArabicTerm | undefined {
  if (!id || !Object.prototype.hasOwnProperty.call(table, id)) return undefined;
  return table[id];
}

export function getTopicArabic(topicId: string): ArabicTerm | undefined {
  return lookup(TOPIC_ARABIC, topicId);
}

/** The unit banner's word, written without vowel marks. */
export function getBranchArabic(branchId: string): ArabicTerm | undefined {
  return (
    lookup(BRANCH_ARABIC, branchId) ??
    namedImportedUnit(branchId)?.term ??
    lookup(IMPORTED_ARABIC.branches, branchId) ??
    IMPORTED_UNIT_PREFIXES.find(([prefix]) => branchId.startsWith(prefix))?.[1]
  );
}

/** The node's own term only, for node cards: a review node does not borrow its unit's word. */
export function getNodeArabic(nodeId: string): ArabicTerm | undefined {
  return lookup(NODE_ARABIC, nodeId) ?? lookup(IMPORTED_ARABIC.nodes, nodeId);
}

const unitWords = new Map<string, ArabicTerm>();

/**
 * For the learn card: the node's own term, else its unit's word with vowel marks, so the card always
 * teaches a word. A borrowed unit word is marked fromUnit, because the learner has seen it before.
 */
export function getLessonArabic(nodeId: string, branchId?: string): ArabicTerm | undefined {
  const own = getNodeArabic(nodeId);
  if (own || !branchId) return own;
  const banner = getBranchArabic(branchId);
  if (!banner) return undefined;
  let word = unitWords.get(banner.ar);
  if (!word) {
    word = { ...banner, ar: namedImportedUnit(branchId)?.form ?? LEARN_FORM.get(banner.ar) ?? banner.ar, fromUnit: true };
    unitWords.set(banner.ar, word);
  }
  return word;
}

// The first node of its topic, in path order, to show each own word: a word is new only once.
let firstUses: Set<string> | undefined;

function buildFirstUses() {
  const first = new Set<string>();
  for (const section of COURSE.sections) {
    const seen = new Set<string>();
    for (const node of section.nodes) {
      const term = getNodeArabic(node.id);
      if (!term) continue;
      const word = withoutVowels(term.ar);
      if (seen.has(word)) continue;
      seen.add(word);
      first.add(node.id);
    }
  }
  return first;
}

/**
 * True when this node's own word is new: no earlier node of its topic, in path order, shows the same word
 * ("Entering with peace" shows السَّلَامُ عَلَيْكُمْ again after the first lesson taught it). False for a node
 * without a word of its own. The learn card's NEW pill uses it.
 */
export function isFirstUseOfWord(nodeId: string): boolean {
  firstUses ??= buildFirstUses();
  return firstUses.has(nodeId);
}
