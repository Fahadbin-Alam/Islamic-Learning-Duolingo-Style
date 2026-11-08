import type { LessonSource } from "../types";
import { hadith } from "./deepKit";
import { QURAN_AYAHS } from "./quranAyahs";

// The daily adhkar routine: what to say in the morning, in the evening and at bedtime, from Hisn al-Muslim's
// chapters, keeping only what is in the Quran or a hadith graded sahih or hasan (grade as sunnah.com gives it). Each
// hadith's Arabic is copied from the collection's own text (sunnah.com's Arabic), never typed by hand, and each Quran
// passage comes from QURAN_AYAHS. Two small changes, both as the hadith itself says: Muslim 2723 gives the evening words
// and says he said the same in the morning with "asbahna", so the morning text swaps evening for morning, night for day;
// and Fatimah's 33/33/34 is written as the three words themselves. Anything weak or disputed (e.g. the "Radeetu billahi
// rabba" and "Ya Hayyu ya Qayyum" adhkar some books list) is left out. The English is read through t() like lesson text;
// the transliteration is shown as it is, for learners who cannot read Arabic yet (not on the Arabic screen).

export type AdhkarTime = "morning" | "evening" | "sleep";

export interface Dhikr {
  id: string;
  /** A short name for the card. */
  title: string;
  /** The words, in Arabic. Absent for Quran passages, which take theirs from `ayahs`. */
  arabic?: string;
  /** Quran passages, as "112:1", in order: their Arabic is shown and the reciter can play them. */
  ayahs?: readonly string[];
  translit: string;
  meaning: string;
  /** How many times to say it. */
  count: number;
  /** What the hadith promises, or how the Prophet ﷺ said it. */
  reward: string;
  source: LessonSource;
}

const range = (surah: number, from: number, to: number) => Array.from({ length: to - from + 1 }, (_, index) => `${surah}:${from + index}`);
const QULS = [...range(112, 1, 4), ...range(113, 1, 5), ...range(114, 1, 6)];

/** The Arabic a dhikr shows: its own words, or its ayahs one after another. */
export function dhikrArabic(dhikr: Dhikr) {
  return dhikr.arabic ?? (dhikr.ayahs ?? []).map((key) => QURAN_AYAHS[key]).join(" ");
}

const QULS_TRANSLIT =
  "Qul huwa Allahu ahad. Allahus-samad. Lam yalid wa lam yulad. Wa lam yakun lahu kufuwan ahad. " +
  "Qul a'udhu bi rabbil-falaq. Min sharri ma khalaq. Wa min sharri ghasiqin idha waqab. Wa min sharrin-naffathati fil-'uqad. Wa min sharri hasidin idha hasad. " +
  "Qul a'udhu bi rabbin-nas. Malikin-nas. Ilahin-nas. Min sharril-waswasil-khannas. Alladhi yuwaswisu fi sudurin-nas. Minal-jinnati wan-nas.";
const QULS_MEANING = "Say: He is Allah, the One. Say: I seek refuge in the Lord of the daybreak. Say: I seek refuge in the Lord of mankind. (Surahs 112, 113 and 114, each read in full.)";

export const QULS_MORNING_EVENING: Dhikr = {
  id: "quls",
  title: "The three Quls",
  ayahs: QULS,
  translit: QULS_TRANSLIT,
  meaning: QULS_MEANING,
  count: 3,
  reward: "Three times in the morning and evening, they will be enough for you against everything.",
  source: hadith("abudawud", "5082", "Abdullah ibn Khubayb", "Hasan (Al-Albani)", "The Prophet ﷺ told him: say Qul huwa Allahu ahad and the two surahs of refuge three times in the evening and the morning; they will be enough for you against everything.", "they will serve you for every purpose")
};

export const MASTER_ISTIGHFAR: Dhikr = {
  id: "master-istighfar",
  title: "The master of asking forgiveness",
  arabic: "اللَّهُمَّ أَنْتَ رَبِّي، لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَىَّ وَأَبُوءُ لَكَ بِذَنْبِي، فَاغْفِرْ لِي، فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ",
  translit: "Allahumma anta rabbi, la ilaha illa ant, khalaqtani wa ana 'abduk, wa ana 'ala 'ahdika wa wa'dika mastata't, a'udhu bika min sharri ma sana't, abu'u laka bi ni'matika 'alayya, wa abu'u laka bi dhanbi, faghfir li, fa innahu la yaghfirudh-dhunuba illa ant.",
  meaning: "O Allah, You are my Lord. There is no god but You. You created me and I am Your servant. I keep Your promise and covenant as much as I can. I seek refuge in You from the evil I have done. I admit Your blessings on me and I admit my sins, so forgive me, for no one forgives sins but You.",
  count: 1,
  reward: "Whoever says it with firm faith in the day and dies before evening, or at night and dies before morning, is of the people of Paradise.",
  source: hadith("bukhari", "6306", "Shaddad ibn Aws", "Sahih", "The most superior way of asking Allah for forgiveness is to say: Allahumma anta rabbi... Whoever says it in the day with firm faith and dies before the evening, or at night and dies before the morning, is of the people of Paradise.", "he will be from the people of Paradise")
};

const ABU_BAKR: Dhikr = {
  id: "abu-bakr",
  title: "Abu Bakr's morning and evening words",
  arabic: "اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَوَاتِ وَالأَرْضِ رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ أَنْتَ أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ",
  translit: "Allahumma 'alimal-ghaybi wash-shahadah, fatiras-samawati wal-ard, rabba kulli shay'in wa malikah, ash-hadu an la ilaha illa ant, a'udhu bika min sharri nafsi wa min sharrish-shaytani wa shirkih.",
  meaning: "O Allah, Knower of the unseen and the seen, Creator of the heavens and the earth, Lord and Owner of everything: I bear witness that there is no god but You. I seek refuge in You from the evil of my own self, and from the evil of Shaytan and his call to shirk.",
  count: 1,
  reward: "The Prophet ﷺ taught it to Abu Bakr for the morning, the evening and bedtime.",
  source: hadith("tirmidhi", "3392", "Abu Hurairah", "Sahih (Al-Albani)", "Abu Bakr asked for words to say in the morning and evening. The Prophet ﷺ taught him this dua and said: say it in the morning, in the evening, and when you go to bed.", "Say it when you reach morning, and evening, and when you go to bed")
};

const AFIYAH: Dhikr = {
  id: "afiyah",
  title: "Asking for well-being",
  arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَاىَ وَأَهْلِي وَمَالِي اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي وَاحْفَظْنِي مِنْ بَيْنِ يَدَىَّ وَمِنْ خَلْفِي وَعَنْ يَمِينِي وَعَنْ شِمَالِي وَمِنْ فَوْقِي وَأَعُوذُ بِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي",
  translit: "Allahumma inni as'alukal-'afwa wal-'afiyata fid-dunya wal-akhirah. Allahumma inni as'alukal-'afwa wal-'afiyata fi dini wa dunyaya wa ahli wa mali. Allahummastur 'awrati, wa amin raw'ati, wahfazni min bayni yadayya wa min khalfi, wa 'an yamini wa 'an shimali, wa min fawqi, wa a'udhu bika an ughtala min tahti.",
  meaning: "O Allah, I ask You for pardon and well-being in this world and the next. O Allah, I ask You for pardon and well-being in my religion, my life, my family and my wealth. O Allah, cover my faults and calm my fears. Guard me from in front and behind, from my right and my left, and from above, and I seek refuge in You from being struck down from beneath me.",
  count: 1,
  reward: "The Prophet ﷺ never left these words, morning or evening.",
  source: hadith("ibnmajah", "3871", "Abdullah ibn Umar", "Sahih (Darussalam)", "The Messenger of Allah ﷺ never left these supplications, every morning and evening: O Allah, I ask You for forgiveness and well-being in this world and the Hereafter...", "never abandoned these supplications, every morning and evening")
};

const NO_HARM: Dhikr = {
  id: "no-harm",
  title: "Nothing can harm",
  arabic: "بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَىْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
  translit: "Bismillahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i wa huwas-sami'ul-'alim.",
  meaning: "In the name of Allah, with whose name nothing on earth or in the sky can cause harm, and He is the All-Hearing, the All-Knowing.",
  count: 3,
  reward: "Three times in the evening, no sudden trouble strikes you until morning; three times in the morning, none until evening.",
  source: hadith("abudawud", "5088", "Uthman ibn Affan", "Sahih (Al-Albani)", "Whoever says three times: In the name of Allah, with whose name nothing on earth or in heaven can cause harm, and He is the Hearer, the Knower, will not suffer sudden affliction till the morning; and whoever says it in the morning, not till the evening.", "he will not suffer sudden affliction till the morning")
};

const TASBIH_100: Dhikr = {
  id: "tasbih-100",
  title: "Glory and praise, 100 times",
  arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
  translit: "Subhanallahi wa bihamdih.",
  meaning: "Glory be to Allah, and all praise is His.",
  count: 100,
  reward: "Said 100 times in the morning and evening, no one brings anything better on the Day of Judgment, except someone who said the same or more.",
  source: hadith("muslim", "2692", "Abu Hurairah", "Sahih", "He who says in the morning and in the evening: Subhanallahi wa bihamdihi one hundred times, no one will bring anything better on the Day of Resurrection, except one who said the same or more.", "one hundred times")
};

const TAHLIL_100: Dhikr = {
  id: "tahlil-100",
  title: "Allah alone, 100 times",
  arabic: "لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ، وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَىْءٍ قَدِيرٌ",
  translit: "La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir.",
  meaning: "There is no god but Allah, alone, with no partner. His is the kingdom and His is the praise, and He has power over everything.",
  count: 100,
  reward: "Said 100 times in a day: like freeing ten slaves, 100 good deeds written, 100 bad deeds wiped away, and a guard from Shaytan until evening.",
  source: hadith("bukhari", "3293", "Abu Hurairah", "Sahih", "Whoever says it one hundred times in a day gets the reward of freeing ten slaves, a hundred good deeds are written for him, a hundred bad deeds are wiped off, and he is protected from Satan that day until the evening.", "one-hundred times in one day")
};

const PERFECT_WORDS: Dhikr = {
  id: "perfect-words",
  title: "Allah's perfect words",
  arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
  translit: "A'udhu bi kalimatillahit-tammati min sharri ma khalaq.",
  meaning: "I seek refuge in the perfect words of Allah from the evil of what He has created.",
  count: 1,
  reward: "A man was stung by a scorpion at night. The Prophet ﷺ said: had you said this in the evening, it would not have harmed you.",
  source: hadith("muslim", "2709a", "Abu Hurairah", "Sahih", "A man said he was stung by a scorpion during the night. The Prophet ﷺ said: had you said in the evening, I seek refuge in the perfect words of Allah from the evil of what He created, it would not have harmed you.", "stung by a scorpion")
};

const MULK_SOURCE = hadith("muslim", "2723b", "Abdullah ibn Mas'ud", "Sahih", "When evening came the Prophet ﷺ said: we have entered the evening and the kingdom belongs to Allah... and in the morning he said the same: we have entered the morning and the kingdom belongs to Allah.", "And when it was morning he said like this");
const BIKA_SOURCE = hadith("abudawud", "5068", "Abu Hurairah", "Sahih (Al-Albani)", "In the morning the Prophet ﷺ would say: O Allah, by You we reach the morning and by You the evening, by You we live and by You we die, and to You is the rising. In the evening he said: by You we reach the evening, by You we live and die, and to You is the rising.", "by Thee we come to the morning");
const SAID_DAILY = "The Prophet ﷺ said this every morning and evening.";

export const WAKING: Dhikr = {
  id: "waking",
  title: "When you wake up",
  arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
  translit: "Al-hamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur.",
  meaning: "All praise is for Allah, who gave us life after He made us die, and to Him is the rising.",
  count: 1,
  reward: "The Prophet ﷺ said this when he woke up.",
  source: hadith("bukhari", "6312", "Hudhayfah", "Sahih", "When the Prophet ﷺ went to bed he would say: Bismika amutu wa ahya. And when he got up he would say: all praise is for Allah who gave us life after He made us die, and to Him is the rising.", "when he got up he would say")
};

const MORNING: readonly Dhikr[] = [
  WAKING,
  { ...QULS_MORNING_EVENING },
  {
    id: "morning-mulk",
    title: "The kingdom is Allah's",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَىْءٍ قَدِيرٌ رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ",
    translit: "Asbahna wa asbahal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir. Rabbi as'aluka khayra ma fi hadhal-yawmi wa khayra ma ba'dah, wa a'udhu bika min sharri ma fi hadhal-yawmi wa sharri ma ba'dah. Rabbi a'udhu bika minal-kasali wa su'il-kibar. Rabbi a'udhu bika min 'adhabin fin-nari wa 'adhabin fil-qabr.",
    meaning: "We have reached the morning, and the kingdom belongs to Allah. All praise is for Allah. There is no god but Allah, alone, with no partner. His is the kingdom and His is the praise, and He has power over everything. My Lord, I ask You for the good of this day and what comes after it, and I seek refuge in You from the evil of this day and what comes after it. My Lord, I seek refuge in You from laziness and the evil of old age. My Lord, I seek refuge in You from punishment in the Fire and in the grave.",
    count: 1,
    reward: SAID_DAILY,
    source: MULK_SOURCE
  },
  {
    id: "morning-bika",
    title: "By You we live",
    arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
    translit: "Allahumma bika asbahna wa bika amsayna wa bika nahya wa bika namutu wa ilaykan-nushur.",
    meaning: "O Allah, by You we reach the morning and by You we reach the evening, by You we live and by You we die, and to You is the rising.",
    count: 1,
    reward: SAID_DAILY,
    source: BIKA_SOURCE
  },
  MASTER_ISTIGHFAR,
  ABU_BAKR,
  AFIYAH,
  NO_HARM,
  TASBIH_100,
  TAHLIL_100
];

const EVENING: readonly Dhikr[] = [
  { ...QULS_MORNING_EVENING },
  {
    id: "evening-mulk",
    title: "The kingdom is Allah's",
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَىْءٍ قَدِيرٌ رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ",
    translit: "Amsayna wa amsal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir. Rabbi as'aluka khayra ma fi hadhihil-laylati wa khayra ma ba'daha, wa a'udhu bika min sharri ma fi hadhihil-laylati wa sharri ma ba'daha. Rabbi a'udhu bika minal-kasali wa su'il-kibar. Rabbi a'udhu bika min 'adhabin fin-nari wa 'adhabin fil-qabr.",
    meaning: "We have reached the evening, and the kingdom belongs to Allah. All praise is for Allah. There is no god but Allah, alone, with no partner. His is the kingdom and His is the praise, and He has power over everything. My Lord, I ask You for the good of this night and what comes after it, and I seek refuge in You from the evil of this night and what comes after it. My Lord, I seek refuge in You from laziness and the evil of old age. My Lord, I seek refuge in You from punishment in the Fire and in the grave.",
    count: 1,
    reward: SAID_DAILY,
    source: MULK_SOURCE
  },
  {
    id: "evening-bika",
    title: "By You we live",
    arabic: "اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
    translit: "Allahumma bika amsayna wa bika nahya wa bika namutu wa ilaykan-nushur.",
    meaning: "O Allah, by You we reach the evening, by You we live and by You we die, and to You is the rising.",
    count: 1,
    reward: SAID_DAILY,
    source: BIKA_SOURCE
  },
  MASTER_ISTIGHFAR,
  ABU_BAKR,
  AFIYAH,
  NO_HARM,
  PERFECT_WORDS,
  TASBIH_100
];

const FATIMAH_SOURCE = hadith("bukhari", "3705", "Ali ibn Abi Talib", "Sahih", "Fatimah asked for a servant. The Prophet ﷺ came to Ali and Fatimah at bedtime and said: when you go to bed, say Allahu Akbar 34 times, Subhan Allah 33 times and Al-hamdu lillah 33 times; that is better for you than a servant.", "better for you both than a servant");
const FATIMAH_REWARD = "Taught to Fatimah and Ali for bedtime: better for you than a servant.";

const SLEEP: readonly Dhikr[] = [
  {
    id: "ayat-al-kursi",
    title: "Ayat al-Kursi",
    ayahs: ["2:255"],
    translit: "Allahu la ilaha illa huwal-hayyul-qayyum, la ta'khudhuhu sinatun wa la nawm, lahu ma fis-samawati wa ma fil-ard, man dhal-ladhi yashfa'u 'indahu illa bi idhnih, ya'lamu ma bayna aydihim wa ma khalfahum, wa la yuhituna bi shay'in min 'ilmihi illa bima sha', wasi'a kursiyyuhus-samawati wal-ard, wa la ya'uduhu hifzuhuma, wa huwal-'aliyyul-'azim.",
    meaning: "Allah: there is no god but Him, the Ever-Living, the Sustainer of all. Neither tiredness nor sleep takes Him. Everything in the heavens and the earth is His. Who can speak for anyone before Him without His permission? He knows what is before them and behind them, and they know nothing of His knowledge except what He wills. His Kursi spreads over the heavens and the earth, and guarding them does not tire Him. He is the Most High, the Most Great. (Quran 2:255)",
    count: 1,
    reward: "Read it when you go to bed: a guard from Allah stays with you, and no devil comes near you until morning.",
    source: hadith("bukhari", "2311", "Abu Hurairah", "Sahih", "A thief who kept coming back told Abu Hurairah: when you go to bed, recite Ayat al-Kursi, and a guard from Allah will stay with you and no devil will come near you until morning. The Prophet ﷺ said: he told you the truth, though he is a liar.", "Ayat-al-Kursi")
  },
  {
    id: "baqarah-end",
    title: "The last two ayahs of Al-Baqarah",
    ayahs: ["2:285", "2:286"],
    translit: "Amanar-rasulu bima unzila ilayhi min rabbihi wal-mu'minun, kullun amana billahi wa mala'ikatihi wa kutubihi wa rusulih, la nufarriqu bayna ahadin min rusulih, wa qalu sami'na wa ata'na, ghufranaka rabbana wa ilaykal-masir. La yukallifullahu nafsan illa wus'aha, laha ma kasabat wa 'alayha maktasabat, rabbana la tu'akhidhna in nasina aw akhta'na, rabbana wa la tahmil 'alayna isran kama hamaltahu 'alal-ladhina min qablina, rabbana wa la tuhammilna ma la taqata lana bih, wa'fu 'anna, waghfir lana, warhamna, anta mawlana fansurna 'alal-qawmil-kafirin.",
    meaning: "The Messenger believes in what was sent down to him from his Lord, and so do the believers. Each believes in Allah, His angels, His books and His messengers. They say: we hear and we obey; we ask Your forgiveness, our Lord, and to You is the return. Allah does not burden a soul beyond what it can bear. Our Lord, do not take us to task if we forget or make a mistake. Our Lord, do not lay on us a burden like the one You laid on those before us. Our Lord, do not load us with more than we can bear. Pardon us, forgive us and have mercy on us. You are our Protector, so help us against the people who disbelieve. (Quran 2:285-286)",
    count: 1,
    reward: "Whoever recites them at night, they will be enough for him.",
    source: hadith("bukhari", "5009", "Abu Mas'ud al-Ansari", "Sahih", "If somebody recites the last two ayahs of Surat al-Baqarah at night, they will be enough for him.", "that will be sufficient for him")
  },
  {
    id: "blow-quls",
    title: "Blow and wipe with the three Quls",
    ayahs: QULS,
    translit: QULS_TRANSLIT,
    meaning: QULS_MEANING,
    count: 3,
    reward: "Cup your hands, blow into them, read the three surahs, then wipe your hands over as much of your body as you can, head and face first. Do it three times.",
    source: hadith("bukhari", "5017", "Aishah", "Sahih", "Every night when the Prophet ﷺ went to bed, he cupped his hands, blew into them, recited Al-Ikhlas, Al-Falaq and An-Nas, then wiped his hands over as much of his body as he could, starting with his head and face. He did that three times.", "He used to do that three times")
  },
  { id: "sleep-subhanallah", title: "Glory be to Allah", arabic: "سُبْحَانَ اللَّهِ", translit: "Subhanallah.", meaning: "Glory be to Allah.", count: 33, reward: FATIMAH_REWARD, source: FATIMAH_SOURCE },
  { id: "sleep-alhamdulillah", title: "All praise is for Allah", arabic: "الْحَمْدُ لِلَّهِ", translit: "Al-hamdu lillah.", meaning: "All praise is for Allah.", count: 33, reward: FATIMAH_REWARD, source: FATIMAH_SOURCE },
  { id: "sleep-allahu-akbar", title: "Allah is the Greatest", arabic: "اللَّهُ أَكْبَرُ", translit: "Allahu akbar.", meaning: "Allah is the Greatest.", count: 34, reward: FATIMAH_REWARD, source: FATIMAH_SOURCE },
  {
    id: "bismika",
    title: "In Your name I sleep",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    translit: "Bismika Allahumma amutu wa ahya.",
    meaning: "In Your name, O Allah, I die and I live.",
    count: 1,
    reward: "The Prophet ﷺ said this when he went to bed.",
    source: hadith("bukhari", "6324", "Hudhayfah", "Sahih", "Whenever the Prophet ﷺ intended to go to bed, he would say: in Your name, O Allah, I die and I live. And when he woke up he would say: all praise is for Allah who gave us life after He made us die, and to Him is the rising.", "Bismika Allahumma amutu wa ahya")
  },
  {
    id: "aslamtu",
    title: "Your last words at night",
    arabic: "اللَّهُمَّ أَسْلَمْتُ وَجْهِي إِلَيْكَ، وَفَوَّضْتُ أَمْرِي إِلَيْكَ، وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ، رَغْبَةً وَرَهْبَةً إِلَيْكَ، لاَ مَلْجَأَ وَلاَ مَنْجَا مِنْكَ إِلاَّ إِلَيْكَ، اللَّهُمَّ آمَنْتُ بِكِتَابِكَ الَّذِي أَنْزَلْتَ، وَبِنَبِيِّكَ الَّذِي أَرْسَلْتَ",
    translit: "Allahumma aslamtu wajhi ilayk, wa fawwadtu amri ilayk, wa alja'tu zahri ilayk, raghbatan wa rahbatan ilayk, la malja'a wa la manja minka illa ilayk. Allahumma amantu bi kitabikal-ladhi anzalt, wa bi nabiyyikal-ladhi arsalt.",
    meaning: "O Allah, I submit myself to You, I hand my affairs over to You, and I lean my back on You, in hope of You and in fear of You. There is no refuge and no escape from You except to You. O Allah, I believe in Your Book that You sent down and in Your Prophet whom You sent.",
    count: 1,
    reward: "Make wudu, lie on your right side and make these your last words. If you die that night, you die upon the fitrah.",
    source: hadith("bukhari", "247", "Al-Bara ibn Azib", "Sahih", "The Prophet ﷺ said: when you go to bed, make wudu as for prayer, lie on your right side and say: O Allah, I submit myself to You... If you die that night, you die upon the fitrah. Make these your last words.", "lie on your right side")
  }
];

export const ADHKAR: Record<AdhkarTime, readonly Dhikr[]> = { morning: MORNING, evening: EVENING, sleep: SLEEP };

/** The card name of each list. */
export const ADHKAR_TITLES: Record<AdhkarTime, string> = { morning: "Morning adhkar", evening: "Evening adhkar", sleep: "Before sleep" };

/**
 * Which list fits the time of day: the morning adhkar from 3 am until 3 pm, the evening ones from 3 pm (around
 * Asr) until 9 pm, and the bedtime ones after that. Without the learner's prayer times this keeps it simple, and
 * every list can still be opened at any time.
 */
export function adhkarTimeFor(date: Date): AdhkarTime {
  const hour = date.getHours();
  if (hour >= 3 && hour < 15) return "morning";
  if (hour >= 15 && hour < 21) return "evening";
  return "sleep";
}

/** Every English line the routine shows, for the translation catalogs (contentSource.test.ts). */
export function adhkarText(): string[] {
  const lines = new Set<string>(Object.values(ADHKAR_TITLES));
  for (const list of Object.values(ADHKAR)) {
    for (const dhikr of list) {
      [dhikr.title, dhikr.meaning, dhikr.reward, dhikr.source.reference ?? dhikr.source.title, dhikr.source.grade ?? ""].forEach((line) => line && lines.add(line));
    }
  }
  return [...lines];
}
