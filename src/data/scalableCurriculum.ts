import type {
  Challenge,
  CharacterVariant,
  DifficultyTier,
  LearningBranch,
  LearningCourse,
  LearningNode,
  LearningSection,
  Lesson,
  LessonSource,
  TopicId
} from "../types";
import { preciseResourceUrl } from "../services/resourceSupport";

type LessonSeed = {
  slug: string;
  title: string;
  focus: string;
  difficulty: DifficultyTier;
  surahName?: string;
  ayahRange?: string;
  kind?: LearningNode["kind"];
  lessonType?: NonNullable<Lesson["lessonType"]>;
  practice?: string;
  sourceKeys?: string[];
  /**
   * The one line the learn card says: 12 words or fewer, in words a 6-year-old knows. Its key word sits in
   * [brackets]; the card shows the line without them and the first question asks for that word.
   */
  line?: string;
  /** Two wrong words for the blank, of the same kind as the key word. */
  alt?: [string, string];
  /** A short choice question in place of the blank, for a line with no single key word: prompt, answer, two wrong. */
  ask?: [prompt: string, answer: string, wrong: string, wrong2: string];
  /**
   * For a line asked with `ask`: a clearly false change of it, for the true/false question. A line with a key word
   * needs none: its false statement is the same line with the first wrong word in place of the key word.
   */
  myth?: string;
  /** The "Why?" for the false statement, when the line alone does not show why it is false. */
  fix?: string;
  /** One plain sentence the feedback sheet's "Why?" adds. None is better than one that repeats the card. */
  why?: string;
  /** "Which comes first?" in a lesson about an order: three steps taught by now, the first one first. */
  first?: [string, string, string];
  /** The question asked with `first`, when it is not "Which comes first?". */
  firstPrompt?: string;
  /** How many questions a lesson with nothing new to teach takes from the lessons before it (3 by default). */
  reviews?: number;
  /** The units a review looks back over, when not its own (a mixed review at the end of a section). */
  reviewFrom?: string[];
  /**
   * The one ayah or hadith that says the line itself, for the learn card's source chip. Left out when no single
   * source says it; the unit's general sources still go in `sources`.
   */
  source?: SourceKey;
};

type BranchSeed = {
  id: string;
  title: string;
  description: string;
  order: number;
  clusterSize?: number;
  premiumOnly?: boolean;
  difficultyRange: [DifficultyTier, DifficultyTier];
  sourceKeys: string[];
  surahName?: string;
  ayahRange?: string;
  /** The companion a unit is about, for its one plain fact when a lesson has nothing before it to look back on. */
  companion?: string;
  /** A unit for grown-ups, kept shut until a grown-up opens it. */
  gated?: boolean;
  lessons: LessonSeed[];
};

type SectionSeed = {
  id: string;
  topicId: TopicId;
  title: string;
  description: string;
  badge: string;
  focus: string;
  mascot: CharacterVariant;
  accentColor: string;
  replaceExisting?: boolean;
  pathStyle?: LearningSection["pathStyle"];
  branches: BranchSeed[];
};

export type ExpandedContent = {
  course: LearningCourse;
  lessonsById: Record<string, Lesson>;
};

function quranSource(id: string, title: string, reference: string, url: string, summary: string): LessonSource {
  return {
    id,
    site: "Quran.com",
    category: "tafsir",
    title,
    url: preciseResourceUrl("Quran.com", url, reference),
    reference,
    from: "The Quran with tafsir on Quran.com",
    grade: "Quran",
    summary
  };
}

function hadithSource(
  id: string,
  title: string,
  reference: string,
  url: string,
  from: string,
  grade: string,
  summary: string
): LessonSource {
  return {
    id,
    site: "Sunnah.com",
    category: "hadith",
    title,
    url: preciseResourceUrl("Sunnah.com", url, reference),
    reference,
    from,
    grade,
    summary
  };
}

function videoSource(id: string, title: string, url: string, summary: string): LessonSource {
  return {
    id,
    site: "YouTube",
    category: "video",
    title,
    url: preciseResourceUrl("YouTube", url, "Video guide"),
    reference: "Video guide",
    from: "Provided YouTube guide",
    grade: "Visual walkthrough",
    summary
  };
}

function seed(
  slug: string,
  title: string,
  focus: string,
  difficulty: DifficultyTier,
  extras: Partial<Omit<LessonSeed, "slug" | "title" | "focus" | "difficulty">> = {}
): LessonSeed {
  return { slug, title, focus, difficulty, ...extras };
}

// One ayah, or a few, that say what a learn card says. The link goes to the ayah itself.
function ayah(reference: string, title: string, summary: string): LessonSource {
  const [surah, ayahs] = reference.split(":");
  return quranSource(`quran_${surah}_${ayahs.replace("-", "_")}`, title, `Quran ${reference}`, `https://quran.com/${surah}/${ayahs}`, summary);
}

function bukhari(number: number, narrator: string, title: string, summary: string): LessonSource {
  return hadithSource(`hadith_bukhari_${number}`, title, `Sahih al-Bukhari ${number}`, `https://sunnah.com/bukhari:${number}`, `${narrator}; collected by Imam al-Bukhari`, "Sahih", summary);
}

function muslim(number: number, narrator: string, title: string, summary: string): LessonSource {
  return hadithSource(`hadith_muslim_${number}`, title, `Sahih Muslim ${number}`, `https://sunnah.com/muslim:${number}`, `${narrator}; collected by Imam Muslim`, "Sahih", summary);
}

// Sources that say one learn card's line, each given to that lesson with `source`.
const LEARN_SOURCES = {
  quran_9_40: ayah("9:40", "The two in the cave", "Allah tells of the Prophet ﷺ and his companion in the cave, and how He helped them."),
  hadith_bukhari_3754: bukhari(3754, "Jabir bin Abdullah", "Abu Bakr freed Bilal", "Umar said: Abu Bakr is our master, and he freed our master, meaning Bilal."),
  hadith_bukhari_4986: bukhari(4986, "Zayd bin Thabit", "Collecting the Quran", "Umar urged Abu Bakr to collect the Quran, and Abu Bakr asked Zayd bin Thabit to gather it."),
  hadith_muslim_2401: muslim(2401, "Aishah", "The modesty of Uthman", "The Prophet ﷺ said: should I not be shy of a man whom the angels are shy of?"),
  hadith_bukhari_3701: bukhari(3701, "Sahl bin Sa'd", "The flag at Khaybar", "At Khaybar the Prophet ﷺ gave the flag to Ali, a man who loves Allah and His Messenger ﷺ."),
  hadith_bukhari_3757: bukhari(3757, "Anas ibn Malik", "A sword of Allah", "Telling of Mu'tah, the Prophet ﷺ said a sword of the swords of Allah took the flag."),
  hadith_bukhari_1149: bukhari(1149, "Abu Hurairah", "Bilal's footsteps", "The Prophet ﷺ heard Bilal's footsteps in Paradise; Bilal prayed after every wudu he made."),
  hadith_bukhari_3744: bukhari(3744, "Anas ibn Malik", "The trustworthy one", "Every nation has a trustworthy one, and the trustworthy one of this nation is Abu Ubaydah."),
  hadith_bukhari_5050: bukhari(5050, "Abdullah ibn Mas'ud", "Recite to me", "The Prophet ﷺ asked Ibn Mas'ud to recite the Quran to him, and wept as he listened."),
  hadith_bukhari_3: bukhari(3, "Aishah", "Khadijah comforts the Prophet ﷺ", "After the first revelation, Khadijah told the Prophet ﷺ: Never! By Allah, Allah will never disgrace you."),
  hadith_bukhari_3662: bukhari(3662, "Amr ibn al-As", "Who he loved most", "Amr ibn al-As asked the Prophet ﷺ who was most beloved to him. He said: Aishah."),
  hadith_bukhari_756: bukhari(756, "Ubadah ibn as-Samit", "Al-Fatihah in every prayer", "Whoever does not recite Al-Fatihah in his prayer, his prayer is not valid."),
  hadith_bukhari_6038: bukhari(6038, "Anas ibn Malik", "Ten years of service", "Anas served the Prophet ﷺ for ten years, and he never once said uff to him."),
  quran_14_7: ayah("14:7", "Thankful hearts get more", "Allah says: if you are grateful, I will surely give you more."),
  quran_18_23_24: ayah("18:23-24", "Saying InshaAllah", "Never say of anything, I will do it tomorrow, without adding: if Allah wills."),
  quran_24_61: ayah("24:61", "Salam when you enter", "When you enter houses, greet one another with peace, a blessed and good greeting from Allah."),
  hadith_muslim_2734: muslim(2734, "Anas ibn Malik", "Praise after eating", "Allah is pleased with a servant who eats, then praises Him for it."),
  hadith_bukhari_6312: bukhari(6312, "Hudhayfah", "Waking up", "When the Prophet ﷺ woke up, he said: praise be to Allah who gave us life."),
  hadith_bukhari_8: bukhari(8, "Ibn Umar", "Islam is built on five", "Islam is built on five: the shahadah, salah, zakat, Hajj and fasting in Ramadan."),
  quran_2_144: ayah("2:144", "Turning to the Qiblah", "Turn your face toward al-Masjid al-Haram; wherever you are, turn your faces toward it."),
  quran_4_103: ayah("4:103", "Prayer at set times", "Prayer is a duty on the believers at set times."),
  hadith_bukhari_597: bukhari(597, "Anas ibn Malik", "A forgotten prayer", "Whoever forgets a prayer should pray it when he remembers it; there is no other expiation."),
  hadith_bukhari_596: bukhari(596, "Jabir bin Abdullah", "Asr, then Maghrib", "On the day of the Trench, the Prophet ﷺ prayed Asr after sunset, then prayed Maghrib."),
  hadith_muslim_1009: muslim(1009, "Abu Hurairah", "Charity every day", "Every joint owes a charity each day; removing something harmful from the path is a charity."),
  hadith_bukhari_6307: bukhari(6307, "Abu Hurairah", "Seventy times a day", "The Prophet ﷺ said: by Allah, I ask Allah's forgiveness and turn to Him more than seventy times a day."),
  hadith_bukhari_628: bukhari(628, "Malik bin Huwairith", "Calling the adhan", "When the time of prayer comes, one of you should call the adhan, and the eldest should lead the prayer."),
  quran_7_31: ayah("7:31", "Dress well for prayer", "Children of Adam, dress well whenever you come to pray."),
  hadith_bukhari_527: bukhari(527, "Abdullah ibn Mas'ud", "The deed Allah loves most", "Ibn Mas'ud asked which deed Allah loves most. The Prophet ﷺ said: prayer on time."),
  hadith_bukhari_611: bukhari(611, "Abu Sa'id al-Khudri", "Answering the adhan", "When you hear the call, say what the mu'adhdhin says."),
  hadith_bukhari_636: bukhari(636, "Abu Hurairah", "Walk calmly to prayer", "When you hear the iqamah, walk to prayer calmly, do not hurry; pray what you catch and complete what you missed."),
  hadith_bukhari_135: bukhari(135, "Abu Hurairah", "Wudu after passing wind", "The prayer of one who loses wudu is not accepted until he makes wudu again."),
  hadith_bukhari_137: bukhari(137, "Abdullah bin Zayd", "A doubt about wudu", "Do not leave the prayer unless you hear a sound or notice a smell."),
  hadith_bukhari_671: bukhari(671, "Aishah", "Eat first", "If supper is served and the iqamah is called, start with the supper."),
  hadith_bukhari_645: bukhari(645, "Ibn Umar", "Praying together", "Prayer in congregation is twenty-seven times better than prayer alone."),
  hadith_bukhari_723: bukhari(723, "Anas ibn Malik", "Straight rows", "Straighten your rows, for straight rows are part of a complete prayer."),
  quran_40_60: ayah("40:60", "Call on Me", "Your Lord says: call on Me, and I will answer you."),
  hadith_muslim_8: muslim(8, "Umar ibn al-Khattab", "The pillars of iman", "Iman is to believe in Allah, His angels, His books, His messengers, the Last Day, and qadar."),
  quran_7_180: ayah("7:180", "The most beautiful names", "To Allah belong the most beautiful names, so call on Him by them."),
  quran_2_153: ayah("2:153", "Allah is with the patient", "Seek help through patience and prayer; Allah is with those who are patient."),
  quran_39_53: ayah("39:53", "Never lose hope", "Do not lose hope in the mercy of Allah; Allah forgives all sins."),
  quran_2_31: ayah("2:31", "Allah taught Adam the names", "Allah taught Adam the names of all things, then showed them to the angels."),
  quran_11_40: ayah("11:40", "Two of each kind", "Allah told Nuh: load on the Ark two of every kind, a pair, and your family and the believers."),
  quran_7_73: ayah("7:73", "The she-camel of Allah", "Salih told Thamud: this she-camel of Allah is a sign for you, so let her eat on Allah's earth."),
  quran_21_58: ayah("21:58", "Ibrahim breaks the idols", "Ibrahim broke the idols into pieces, all but the biggest one."),
  quran_2_127: ayah("2:127", "Raising the Ka'bah", "Ibrahim and Ismail raised the foundations of the House, praying: our Lord, accept this from us."),
  quran_12_18: ayah("12:18", "Beautiful patience", "Ya'qub said: patience is most fitting, and Allah is the One whose help is sought."),
  quran_20_46: ayah("20:46", "Fear not", "Allah told Musa and Harun: fear not, I am with you both; I hear and I see."),
  quran_20_29_32: ayah("20:29-32", "Harun, Musa's helper", "Musa asked: make for me a helper from my family, Harun my brother, and let him share my task."),
  quran_38_26: ayah("38:26", "Dawud judges with truth", "Allah told Dawud: We have made you a leader on earth, so judge between people with truth."),
  quran_27_16_19: ayah("27:16-19", "Sulayman and the ant", "Sulayman was taught the speech of birds; he smiled at an ant's words and thanked Allah."),
  quran_7_23: ayah("7:23", "The du'a of Adam and Hawwa", "They said: our Lord, we have wronged ourselves; if You do not forgive us and have mercy on us, we will be lost."),
  quran_28_13: ayah("28:13", "Musa back with his mother", "Allah brought Musa back to his mother, so she would be glad and not grieve."),
  quran_28_9: ayah("28:9", "Asiyah and baby Musa", "The wife of Pharaoh said: a joy for my eyes and yours; perhaps he will help us, or we may take him as a son."),
  quran_3_37: ayah("3:37", "Food from Allah", "Whenever Zakariyya came to Maryam in her prayer room, he found food with her. She said: it is from Allah."),
  quran_16_97: ayah("16:97", "Good deeds of women and men", "Whoever does good, man or woman, and believes, Allah will give a good life and reward."),
  hadith_bukhari_6014: bukhari(6014, "Aishah", "Jibril and the neighbor", "Jibril kept urging the Prophet ﷺ to be good to neighbors, until he thought a neighbor would be made an heir."),
  hadith_bukhari_6018: bukhari(6018, "Abu Hurayrah", "Good words or quiet", "Whoever believes in Allah and the Last Day should not harm his neighbor, should honor his guest, and should say what is good or keep quiet."),
  quran_58_11: ayah("58:11", "Make room", "When you are told to make room in gatherings, make room, and Allah will make room for you."),
  hadith_bukhari_6114: bukhari(6114, "Abu Hurayrah", "Who is really strong?", "The strong one is not the good wrestler; the strong one controls himself when angry."),
  hadith_bukhari_6024: bukhari(6024, "Aishah", "Allah loves gentleness", "Allah is Gentle and loves gentleness in every matter."),
  quran_49_11: ayah("49:11", "Do not mock", "Let no people mock another people; perhaps they are better than them."),
  quran_25_63: ayah("25:63", "Walking gently", "The servants of the Most Merciful walk on the earth gently."),
  quran_2_228: ayah("2:228", "Rights of wives", "Wives have rights like the duties on them, in a fair way."),
  quran_4_35: ayah("4:35", "A helper from each family", "If you fear a split between them, send one helper from his family and one from hers."),
  hadith_bukhari_432: bukhari(432, "Ibn Umar", "Pray at home", "Pray some of your prayers in your houses, and do not make them like graves."),
  quran_25_74: ayah("25:74", "A joy to our eyes", "Our Lord, give us in our spouses and children a joy to our eyes."),
  hadith_muslim_1469: muslim(1469, "Abu Hurairah", "Remember the good", "A believer should not hate a believing wife; if he dislikes one trait in her, he will be pleased with another."),
  quran_1_2: ayah("1:2", "All praise is for Allah", "All praise is for Allah, Lord of all the worlds."),
  quran_1_5: ayah("1:5", "You alone we worship", "You alone we worship, and You alone we ask for help."),
  quran_1_6: ayah("1:6", "The straight path", "Guide us to the straight path."),
  quran_2_2: ayah("2:2", "No doubt in this Book", "This is the Book with no doubt in it, a guidance for those mindful of Allah."),
  quran_2_3: ayah("2:3", "The guided", "They believe in the unseen, keep up the prayer, and give from what Allah gave them."),
  hadith_muslim_810: muslim(810, "Ubayy ibn Ka'b", "The greatest ayah", "The Prophet ﷺ asked Ubayy which ayah of the Quran is greatest, and agreed when he named Ayat al-Kursi."),
  quran_3_200: ayah("3:200", "Be patient and stay firm", "O believers, be patient, outlast in patience, stay firm, and be mindful of Allah."),
  quran_3_103: ayah("3:103", "Allah's rope", "Hold on to the rope of Allah all together, and do not split apart."),
  quran_3_186: ayah("3:186", "You will be tested", "You will be tested, and if you are patient and mindful of Allah, that is a matter of firm resolve."),
  quran_3_64: ayah("3:64", "People of the Book", "O People of the Book, come to a word fair between us: that we worship none but Allah."),
  quran_4_135: ayah("4:135", "Stand firm for justice", "O believers, stand firm for justice, even against yourselves, your parents, or your relatives."),
  quran_4_2: ayah("4:2", "Give orphans their wealth", "Give the orphans their wealth, and do not swap your bad for their good."),
  quran_4_59: ayah("4:59", "Obey Allah and the Messenger ﷺ", "O believers, obey Allah and obey the Messenger ﷺ."),
  quran_5_1: ayah("5:1", "Keep your promises", "O believers, keep your promises and agreements."),
  quran_5_88: ayah("5:88", "Halal and good", "Eat of what Allah has given you, halal and good."),
  quran_5_49: ayah("5:49", "Judge by what Allah revealed", "Judge between them by what Allah has revealed."),
  quran_12_3: ayah("12:3", "The best of stories", "We tell you the best of stories in this Quran."),
  quran_12_23: ayah("12:23", "Yusuf said no", "When he was asked to do wrong, Yusuf said: I seek refuge in Allah."),
  quran_12_39: ayah("12:39", "Yusuf in prison", "Yusuf asked the two men in prison: are many lords better, or Allah, the One?"),
  quran_12_92: ayah("12:92", "No blame on you today", "Yusuf told his brothers: no blame on you today; Allah will forgive you."),
  quran_19_3: ayah("19:3", "Zakariyya's quiet du'a", "Zakariyya called on his Lord with a quiet du'a."),
  quran_19_7: ayah("19:7", "A son named Yahya", "Allah gave Zakariyya the good news of a son named Yahya, a name given to no one before."),
  quran_19_42: ayah("19:42", "Ibrahim and his father", "Ibrahim said gently: O my father, why worship what cannot hear or see?"),
  quran_18_10: ayah("18:10", "The youths in the cave", "The young men went into the cave and said: our Lord, give us mercy from You."),
  quran_18_32: ayah("18:32", "The two gardens", "Two men: Allah gave one of them two gardens of grapevines."),
  quran_36_2: ayah("36:2", "The wise Quran", "By the wise Quran."),
  quran_36_40: ayah("36:40", "Sun and moon", "The sun does not catch up with the moon, nor the night with the day; each swims in an orbit."),
  quran_36_79: ayah("36:79", "Back to life", "He who made them the first time will give them life again."),
  quran_36_20: ayah("36:20", "The man who ran", "A man came running from the far end of the town and said: my people, follow the messengers."),
  quran_67_1: ayah("67:1", "The kingdom", "Blessed is He in whose hand is the kingdom, and He has power over all things."),
  quran_67_2: ayah("67:2", "Life is a test", "He made death and life to test you, to see which of you is best in deeds."),
  quran_67_3_4: ayah("67:3-4", "A perfect sky", "Look again at the sky: do you see any cracks? Look again and again."),
  quran_67_30: ayah("67:30", "Who gives water?", "If your water sank deep into the earth, who could bring you flowing water?"),
  quran_2_183: ayah("2:183", "Fasting is prescribed", "O believers, fasting is prescribed for you, as it was for those before you, so that you may gain taqwa."),
  quran_2_185: ayah("2:185", "The month of the Quran", "Ramadan is the month the Quran was sent down. Whoever is sick or traveling fasts the same number of other days. Allah wants ease for you."),
  quran_2_187: ayah("2:187", "Dawn to night", "Eat and drink until the white thread of dawn shows clearly from the black thread, then complete the fast until night."),
  quran_97_3: ayah("97:3", "Better than a thousand months", "Laylat al-Qadr is better than a thousand months."),
  quran_25_67: ayah("25:67", "The middle way", "When they spend, they do not waste and they are not stingy; they keep a balance between the two."),
  hadith_bukhari_1904: bukhari(1904, "Abu Hurairah", "Fasting is for Allah", "Allah said: fasting is for Me, and I will reward it. A fasting person avoids bad words and fights, and says: I am fasting."),
  hadith_bukhari_1933: bukhari(1933, "Abu Hurairah", "If you forget and eat", "If someone eats or drinks because they forgot, they should finish their fast, for Allah fed them and gave them drink."),
  hadith_bukhari_6: bukhari(6, "Ibn Abbas", "Jibril in Ramadan", "Jibril met the Prophet ﷺ every night of Ramadan to go over the Quran with him."),
  hadith_bukhari_1521: bukhari(1521, "Abu Hurairah", "Like a newborn", "Whoever does Hajj for Allah, with no bad words and no bad deeds, comes home free of sins, like the day he was born."),
  hadith_bukhari_55: bukhari(55, "Abu Mas'ud al-Ansari", "Spending on family", "When a man spends on his family hoping for reward from Allah, it counts as charity for him."),
  hadith_muslim_2625: muslim(2625, "Abu Dharr", "Share your soup", "The Prophet ﷺ told Abu Dharr: when you cook soup, add more water and share some with your neighbors.")
} satisfies Record<string, LessonSource>;

const SOURCE_LIBRARY = {
  quran_1: quranSource("quran_1", "Surah Al-Fatihah", "Quran 1", "https://quran.com/1", "The opening surah teaches praise, worship, and guidance."),
  quran_2_1_5: quranSource("quran_2_1_5", "Al-Baqarah opening", "Quran 2:1-5", "https://quran.com/2", "The opening of Al-Baqarah describes revelation, taqwa, and guidance."),
  quran_2_183_187: quranSource("quran_2_183_187", "Fasting in Ramadan", "Quran 2:183-187", "https://quran.com/2", "These verses establish fasting and its purpose."),
  quran_2_196_203: quranSource("quran_2_196_203", "Hajj rites and days", "Quran 2:196-203", "https://quran.com/2", "These verses outline core Hajj rites and remembrance."),
  quran_2_255: quranSource("quran_2_255", "Ayat al-Kursi", "Quran 2:255", "https://quran.com/2", "Ayat al-Kursi centers the believer on Allah's life, knowledge, and authority."),
  quran_2_285: quranSource("quran_2_285", "Belief at the end of Al-Baqarah", "Quran 2:285", "https://quran.com/2", "This verse gathers belief in Allah, His angels, books, and messengers."),
  quran_3: quranSource("quran_3", "Surah Ali 'Imran", "Quran 3", "https://quran.com/3", "Ali 'Imran teaches steadfastness and holding to revelation."),
  quran_3_97: quranSource("quran_3_97", "Hajj for those able", "Quran 3:97", "https://quran.com/3", "Pilgrimage to the House is due from those able to find a way."),
  quran_4: quranSource("quran_4", "Surah An-Nisa", "Quran 4", "https://quran.com/4", "An-Nisa builds justice, rights, and social duty."),
  quran_4_36: quranSource("quran_4_36", "Worship Allah and honor parents", "Quran 4:36", "https://quran.com/4", "This verse links tawhid to excellence toward parents and people."),
  quran_4_86: quranSource("quran_4_86", "Return greetings well", "Quran 4:86", "https://quran.com/4", "Allah commands believers to answer greetings with what is equal or better."),
  quran_4_136: quranSource("quran_4_136", "Believe in Allah, His books, and His messengers", "Quran 4:136", "https://quran.com/4", "This verse gathers core beliefs of iman."),
  quran_5: quranSource("quran_5", "Surah Al-Ma'idah", "Quran 5", "https://quran.com/5", "Al-Ma'idah teaches covenants, purity, and lawful living."),
  quran_5_6: quranSource("quran_5_6", "Purification before prayer", "Quran 5:6", "https://quran.com/5", "This verse lays down the central acts of wudu."),
  quran_9_60: quranSource("quran_9_60", "Recipients of zakat", "Quran 9:60", "https://quran.com/9", "Zakat is for the poor, the needy, its collectors, new hearts, freeing captives, people in debt, the cause of Allah and the stranded traveler."),
  quran_9_100: quranSource("quran_9_100", "The first believers and companions", "Quran 9:100", "https://quran.com/9", "Allah praises the earliest believers and those who followed them well."),
  quran_9_103: quranSource("quran_9_103", "Wealth purified through charity", "Quran 9:103", "https://quran.com/9", "Zakat purifies wealth and the giver."),
  quran_9_119: quranSource("quran_9_119", "Be with the truthful", "Quran 9:119", "https://quran.com/9", "Allah ties taqwa to truthful company and truthful speech."),
  quran_12: quranSource("quran_12", "Surah Yusuf", "Quran 12", "https://quran.com/12", "Surah Yusuf teaches patience, chastity, and eventual relief."),
  quran_17_23_24: quranSource("quran_17_23_24", "Kindness to parents", "Quran 17:23-24", "https://quran.com/17", "Allah forbids harshness to parents and commands mercy."),
  quran_18: quranSource("quran_18", "Surah Al-Kahf", "Quran 18", "https://quran.com/18", "Al-Kahf trains believers for trial, perspective, and protection."),
  quran_19: quranSource("quran_19", "Surah Maryam", "Quran 19", "https://quran.com/19", "Maryam carries stories of mercy, prayer, and divine care."),
  quran_21_25: quranSource("quran_21_25", "The message of tawhid", "Quran 21:25", "https://quran.com/21", "The prophets were sent with one central call: worship Allah alone."),
  quran_22_27: quranSource("quran_22_27", "Call humanity to Hajj", "Quran 22:27", "https://quran.com/22", "Allah commanded Ibrahim to call humanity to pilgrimage."),
  quran_28_7: quranSource("quran_28_7", "The mother of Musa", "Quran 28:7", "https://quran.com/28", "Allah inspired the mother of Musa with trust under fear."),
  quran_30_21: quranSource("quran_30_21", "Affection and mercy in marriage", "Quran 30:21", "https://quran.com/30", "Marriage is described as sakinah, affection, and mercy."),
  quran_33_21: quranSource("quran_33_21", "The Messenger ﷺ as an example", "Quran 33:21", "https://quran.com/33", "The Messenger ﷺ is the beautiful model for those seeking Allah and the Last Day."),
  quran_33_6: quranSource("quran_33_6", "The Mothers of the Believers", "Quran 33:6", "https://quran.com/33", "The wives of the Prophet ﷺ hold a special place in the believing community."),
  quran_36: quranSource("quran_36", "Surah Ya-Sin", "Quran 36", "https://quran.com/36", "Ya-Sin brings revelation, signs, resurrection, and accountability into focus."),
  quran_48_29: quranSource("quran_48_29", "Traits of the believers with the Messenger ﷺ", "Quran 48:29", "https://quran.com/48", "This verse paints mercy between believers and strength upon truth."),
  quran_57_22_23: quranSource("quran_57_22_23", "Qadar and perspective", "Quran 57:22-23", "https://quran.com/57", "These verses train the heart not to break under loss or become arrogant in gain."),
  quran_59_22_24: quranSource("quran_59_22_24", "Beautiful names of Allah", "Quran 59:22-24", "https://quran.com/59", "These verses bring you into awe of Allah's names and attributes."),
  quran_66_11: quranSource("quran_66_11", "The prayer of Asiyah", "Quran 66:11", "https://quran.com/66", "Asiyah is honored for faith and longing for Allah despite oppression."),
  quran_67: quranSource("quran_67", "Surah Al-Mulk", "Quran 67", "https://quran.com/67", "Al-Mulk opens with Allah's dominion and the testing nature of life."),
  quran_112: quranSource("quran_112", "Surah Al-Ikhlas", "Quran 112", "https://quran.com/112", "Al-Ikhlas teaches pure tawhid and Allah's unmatched oneness."),
  hadith_riyad_844: hadithSource("hadith_riyad_844", "The excellence of salam", "Riyad as-Salihin 844", "https://sunnah.com/riyadussalihin:844", "Abdullah bin Amr; gathered by Imam an-Nawawi from Al-Bukhari and Muslim", "Muttafaqun alayh", "A beautiful act of Islam is greeting people with salam whether you know them or not."),
  hadith_bukhari_5376: hadithSource("hadith_bukhari_5376", "Mention Allah's name before eating", "Sahih al-Bukhari 5376", "https://sunnah.com/bukhari:5376", "Umar bin Abi Salamah; collected by Imam al-Bukhari", "Sahih", "The Prophet ﷺ taught saying Allah's name and eating with the right hand."),
  hadith_muslim_224: hadithSource("hadith_muslim_224", "Purification before accepted prayer", "Sahih Muslim 224", "https://sunnah.com/muslim:224", "Ibn Umar; collected by Imam Muslim", "Sahih", "Prayer is not accepted without purification."),
  hadith_muslim_2992: hadithSource("hadith_muslim_2992", "Sneezing manners", "Sahih Muslim 2992", "https://sunnah.com/muslim:2992", "Abu Musa al-Ashari; collected by Imam Muslim", "Sahih", "If someone sneezes and praises Allah, the other Muslim replies with mercy."),
  hadith_bukhari_164: hadithSource("hadith_bukhari_164", "Uthman showed the Prophet's ﷺ wudu", "Sahih al-Bukhari 164", "https://sunnah.com/bukhari:164", "Humran, the freed slave of Uthman; collected by Imam al-Bukhari", "Sahih", "Uthman demonstrated the wudu of the Prophet ﷺ so Muslims could learn the order carefully."),
  hadith_bukhari_631: hadithSource("hadith_bukhari_631", "Pray as you have seen me pray", "Sahih al-Bukhari 631", "https://sunnah.com/bukhari:631", "Malik bin Al-Huwairith; collected by Imam al-Bukhari", "Sahih", "The Prophet ﷺ instructed believers to model their prayer on his prayer."),
  hadith_abudawud_730: hadithSource("hadith_abudawud_730", "Bowing and rising in prayer", "Sunan Abi Dawud 730", "https://sunnah.com/abudawud:730", "Abu Humayd al-Sa'idi; collected by Imam Abu Dawud", "Sahih", "This narration describes the Prophet's ﷺ bowing and rising with steadiness."),
  hadith_abudawud_856: hadithSource("hadith_abudawud_856", "Pray with calm stillness", "Sunan Abi Dawud 856", "https://sunnah.com/abudawud:856", "Abu Hurairah; collected by Imam Abu Dawud", "Sahih", "The Prophet ﷺ corrected a man's prayer by teaching calm completeness in each pillar."),
  hadith_abudawud_933: hadithSource("hadith_abudawud_933", "Taslim to the right and left", "Sunan Abi Dawud 933", "https://sunnah.com/abudawud:933", "Wa'il bin Hujr; collected by Imam Abu Dawud", "Hasan Sahih", "The Prophet ﷺ ended the prayer with taslim to the right and to the left."),
  hadith_abudawud_974: hadithSource("hadith_abudawud_974", "Words of the tashahhud", "Sunan Abi Dawud 974", "https://sunnah.com/abudawud:974", "Ibn Abbas; collected by Imam Abu Dawud", "Sahih", "Ibn Abbas recorded the words of the tashahhud the Prophet ﷺ taught for the sitting in prayer."),
  hadith_nasai_910: hadithSource("hadith_nasai_910", "No salah without Fatihat al-Kitab", "Sunan an-Nasa'i 910", "https://sunnah.com/nasai/11/35", "Ubadah bin As-Samit; collected by Imam an-Nasa'i", "Sahih", "Reciting Al-Fatihah is central in prayer."),
  hadith_nasai_1055: hadithSource("hadith_nasai_1055", "Sami' Allahu liman hamidah", "Sunan an-Nasa'i 1055", "https://sunnah.com/nasai:1055", "Wa'il bin Hujr; collected by Imam an-Nasa'i", "Sahih", "Wa'il described the Prophet's ﷺ rising from ruku and praising Allah."),
  hadith_nasai_1278: hadithSource("hadith_nasai_1278", "The tashahhud", "Sunan an-Nasa'i 1278", "https://sunnah.com/nasai:1278", "Ibn Abbas; collected by Imam an-Nasa'i", "Sahih", "The Prophet ﷺ taught the tashahhud as carefully as he taught a surah of the Quran."),
  hadith_tirmidhi_270: hadithSource("hadith_tirmidhi_270", "Forehead and nose in sujud", "Jami` at-Tirmidhi 270", "https://sunnah.com/tirmidhi:270", "Abu Humayd al-Sa'idi; collected by Imam at-Tirmidhi", "Hasan Sahih", "The Prophet ﷺ placed his nose and forehead on the ground and kept his arms away from his sides in sujud."),
  hadith_tirmidhi_272: hadithSource("hadith_tirmidhi_272", "Seven limbs in sujud", "Jami` at-Tirmidhi 272", "https://sunnah.com/tirmidhi:272", "Al-Abbas bin Abdul-Muttalib; collected by Imam at-Tirmidhi", "Sahih", "When the servant prostrates, seven limbs prostrate with him: the face, the hands, the knees, and the feet."),
  hadith_bukhari_6013: hadithSource("hadith_bukhari_6013", "Mercy is at the heart of character", "Sahih al-Bukhari 6013", "https://sunnah.com/bukhari:6013", "Jarir bin Abdullah; collected by Imam al-Bukhari", "Sahih", "Whoever is not merciful to others will not be treated with mercy."),
  hadith_muslim_2607: hadithSource("hadith_muslim_2607", "Truth leads to righteousness", "Sahih Muslim 2607c", "https://sunnah.com/muslim:2607c", "Abdullah ibn Mas'ud; collected by Imam Muslim", "Sahih", "Truthfulness trains the soul toward righteousness."),
  hadith_tirmidhi_2002: hadithSource("hadith_tirmidhi_2002", "Good character is weighty", "Jami` at-Tirmidhi 2002", "https://sunnah.com/tirmidhi:2002", "Abu Darda; collected by Imam at-Tirmidhi", "Sahih", "Nothing is heavier on the scale than good character."),
  hadith_bukhari_3820: hadithSource("hadith_bukhari_3820", "The excellence of Khadijah", "Sahih al-Bukhari 3820", "https://sunnah.com/bukhari:3820", "Abu Hurairah; collected by Imam al-Bukhari", "Sahih", "Jibril brought Khadijah greetings from her Lord and glad tidings of a house in Paradise."),
  hadith_bukhari_3770: hadithSource("hadith_bukhari_3770", "The virtue of Aishah", "Sahih al-Bukhari 3770", "https://sunnah.com/bukhari:3770", "Anas ibn Malik; collected by Imam al-Bukhari", "Sahih", "The Prophet ﷺ described Aishah's superiority over other women as like tharid over other food."),
  hadith_bukhari_4987: hadithSource("hadith_bukhari_4987", "Hafsah and preservation", "Sahih al-Bukhari 4987", "https://sunnah.com/bukhari:4987", "Anas ibn Malik; collected by Imam al-Bukhari", "Sahih", "Hafsah's copy played an important role in preserving written Quranic material."),
  video_wudu_1: videoSource("video_wudu_1", "Wudu guide 1", "https://youtu.be/6kt_POiIVZE?si=6KbLFWt1QZgJvDpt", "A step-by-step walk-through of wudu."),
  video_wudu_2: videoSource("video_wudu_2", "Wudu guide 2", "https://youtu.be/P29LMOHhpjE?si=x1H_8H_kQgI2dCFP", "A second wudu walk-through for repetition and corrections."),
  video_wudu_3: videoSource("video_wudu_3", "Wudu guide 3", "https://youtu.be/iaj1wlQHRFA?si=2_nOF0QOGt4k5Nhv", "A third wudu walk-through to reinforce order and common mistakes."),
  video_salah_1: videoSource("video_salah_1", "Prayer guide 1", "https://youtu.be/vx1rz-28HNk?si=zXJCptHWOBVFk7VB", "A visual guide to the Sunnah prayer method."),
  video_salah_2: videoSource("video_salah_2", "Prayer guide 2", "https://youtu.be/2ZEmsdEOpbk", "A second visual guide through the prayer flow."),
  video_salah_3: videoSource("video_salah_3", "Prayer guide 3", "https://youtu.be/di0u-K09Su4", "A detailed prayer walk-through with attention to posture and errors."),
  ...LEARN_SOURCES
} satisfies Record<string, LessonSource>;

type SourceKey = keyof typeof SOURCE_LIBRARY;

const SOURCES: Record<string, LessonSource> = SOURCE_LIBRARY;

const SECTION_SEEDS: SectionSeed[] = [];

const TOPIC_ORDER: TopicId[] = [
  "foundation",
  "prayer",
  "aqidah",
  "quran_tafseer",
  "manners",
  "fasting",
  "zakat",
  "hajj",
  "marriage",
  "sahabah",
  "prophets",
  "women_of_the_book",
  "hadith"
];

function hashCode(input: string) {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(index);
    hash |= 0;
  }
  return hash;
}

function rotate<T>(items: T[], start: number) {
  return items.map((_, index) => items[(start + index) % items.length]);
}

function uniqueById<T extends { id: string }>(items: T[]) {
  const seen = new Set<string>();
  const result: T[] = [];
  for (const item of items) {
    if (!item || seen.has(item.id)) {
      continue;
    }
    seen.add(item.id);
    result.push(item);
  }
  return result;
}

function mc(id: string, prompt: string, options: string[], correctLabel: string, explanation: string): Challenge {
  const choices = options.map((label, index) => ({ id: String.fromCharCode(97 + index), label }));
  return {
    id,
    type: "multiple_choice",
    prompt,
    choices,
    correctChoiceId: choices.find((choice) => choice.label === correctLabel)?.id ?? "a",
    explanation
  };
}

function tf(id: string, prompt: string, isTrue: boolean, explanation: string): Challenge {
  return {
    id,
    type: "true_false",
    prompt,
    choices: [
      { id: "true", label: "True" },
      { id: "false", label: "False" }
    ],
    correctChoiceId: isTrue ? "true" : "false",
    explanation
  };
}

// Review and mastery lessons revisit the lessons before them instead of teaching a new line.
function isReviewSeed(lesson: LessonSeed) {
  return lesson.kind === "review" || lesson.lessonType === "review" || lesson.lessonType === "mastery";
}

// `count` different indexes into a list of `length`, the same every time for the same key.
function pickIndexes(length: number, count: number, key: string) {
  const start = Math.abs(hashCode(key)) % Math.max(1, length);
  const step = length > 2 ? 1 + (Math.abs(hashCode(`${key}:step`)) % (length - 1)) : 1;
  const picked: number[] = [];
  for (let offset = 0; offset < length; offset += 1) {
    const index = (start + offset * step) % length;
    if (!picked.includes(index)) picked.push(index);
  }
  // A step that shares a factor with the length skips some indexes; the rest follow in order.
  for (let index = 0; index < length; index += 1) {
    if (!picked.includes(index)) picked.push(index);
  }
  return picked.slice(0, count);
}

// The card shows the line without the [brackets] around its key word.
function plainLine(line: string) {
  return line.replace(/\[([^\]]+)\]/g, "$1");
}

function keyWord(line: string) {
  return /\[([^\]]+)\]/.exec(line)?.[1];
}

// A lesson teaches when its line has a word to ask for, or it has its own short question.
function teaches(lesson: LessonSeed) {
  return !isReviewSeed(lesson) && Boolean(lesson.ask || (lesson.line && lesson.alt && keyWord(lesson.line)));
}

// Later steps in an order sentence start lower case ("Wash the hands, then rinse the mouth"); names stay as written.
const COMMON_FIRST_WORD = /^(Wash|Rinse|Wipe|Rise|Sit|First|Second|Standing|Throwing|Cutting|Back|The|Being|Becoming|Accepting|Moving|Leaving|Meeting|Serving|Living|Sleeping|Fighting|Sujud|Tashahhud|Taslim)\b/;

function orderSentence(steps: readonly string[]) {
  const later = steps.slice(1).map((step) => `then ${COMMON_FIRST_WORD.test(step) ? step.charAt(0).toLowerCase() + step.slice(1) : step}`);
  return `${[steps[0], ...later].join(", ")}.`;
}

function shuffled(options: string[], key: string) {
  return rotate(options, Math.abs(hashCode(key)) % options.length);
}

// The false statement for a line's true/false question: the same line with one key word changed, so the true
// and the false statements look alike and only knowing the fact tells them apart.
function falseLine(lesson: LessonSeed) {
  const wrong = lesson.alt?.[0];
  if (lesson.line && wrong && keyWord(lesson.line)) {
    // "a" or "an" before the key word fits the word put in its place ("an arrow", "a spear").
    const swapped = lesson.line.replace(/(\b[Aa]n? )?\[[^\]]+\]/, (_, article?: string) => (article ? `${fitArticle(article, wrong)} ${wrong}` : wrong));
    return plainLine(swapped);
  }
  return lesson.myth;
}

function fitArticle(article: string, word: string) {
  const fitted = /^[aeiou]/i.test(word) ? "an" : "a";
  return article.startsWith("A") ? fitted.charAt(0).toUpperCase() + fitted.slice(1) : fitted;
}

// A lesson's own questions, all about the line its learn card shows: the missing key word (or a short choice),
// the line or the same line with its key word changed as true or false, and the first step in a lesson about an
// order. The seed's "why" goes on each question it adds to; a false statement gets the line itself, as its correction.
function teachingQuestions(lessonId: string, lesson: LessonSeed): Challenge[] {
  if (!lesson.line || !teaches(lesson)) return [];
  const line = plainLine(lesson.line);
  const why = lesson.why ?? line;
  const wrongLine = falseLine(lesson);
  const asksMyth = Boolean(wrongLine) && Math.abs(hashCode(`${lessonId}:myth`)) % 2 === 0;
  const extras = { miniLesson: line, reviewSuggestion: `Review ${lesson.title}` };
  const questions: Challenge[] = [];

  if (lesson.ask) {
    const [prompt, answer, ...wrong] = lesson.ask;
    questions.push({ ...mc(`${lessonId}_ask`, prompt, shuffled([answer, ...wrong], `${lessonId}:ask`), answer, why), ...extras });
  } else {
    const key = keyWord(lesson.line)!;
    const prompt = lesson.line.replace(/\[[^\]]+\]/, "____").replace(/\[([^\]]+)\]/g, "$1");
    questions.push({ ...mc(`${lessonId}_fill`, prompt, shuffled([key, ...lesson.alt!], `${lessonId}:fill`), key, why), ...extras });
  }

  questions.push(
    asksMyth
      ? { ...tf(`${lessonId}_tf`, wrongLine!, false, lesson.fix ?? line), ...extras }
      : { ...tf(`${lessonId}_tf`, line, true, why), ...extras }
  );

  if (lesson.first) {
    const order = orderSentence(lesson.first);
    questions.push({
      ...mc(`${lessonId}_first`, lesson.firstPrompt ?? "Which comes first?", shuffled([...lesson.first], `${lessonId}:first`), lesson.first[0], order),
      miniLesson: order,
      reviewSuggestion: `Review ${lesson.title}`
    });
  }

  return questions;
}

// A lesson the learner has finished, with its questions, for the reviews after it.
export type TaughtLesson = { lessonId: string; nodeId: string; questions: Challenge[] };

// A fill-in and a sentence that is the same line with a word in the blank ("Allah sent Salih's people a special
// ____ as a sign." and "... a special camel as a sign.") ask about the same fact: asked first, the sentence gives
// the fill-in away.
const comparable = (text: string) => text.toLowerCase().replace(/[.!?]+$/, "").replace(/\s+/g, " ").trim();

export function asksSameLine(a: Challenge, b: Challenge) {
  const [blank, line] = a.prompt.includes("____") ? [a, b] : [b, a];
  if (!blank.prompt.includes("____") || line.prompt.includes("____")) return false;
  const [before, after = ""] = comparable(blank.prompt).split("____").map((part) => part.trim());
  const other = comparable(line.prompt);
  return other.length > before.length + after.length && other.startsWith(before) && other.endsWith(after);
}

// The words of a text, for finding an answer in it: lower case, no accent marks, straight apostrophes.
const answerWords = (text: string) =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[‘’`]/g, "'").match(/[a-z0-9]+(?:'[a-z]+)?/g) ?? [];

const rightLabelOf = (challenge: Challenge) => challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label ?? "";

// A fill-in's answer shows in a text when most of its words are in it, and more of them than of any wrong choice.
function answerShows(fillIn: Challenge, text: string) {
  const words = new Set(answerWords(text));
  const share = (label: string) => {
    const own = answerWords(label);
    return own.length ? own.filter((word) => words.has(word)).length / own.length : 0;
  };
  const right = share(rightLabelOf(fillIn));
  return right >= 0.5 && fillIn.choices.every((choice) => choice.id === fillIn.correctChoiceId || share(choice.label) < right);
}

/**
 * True when asking `earlier` first hands the learner the answer to the fill-in `later`: it is the same line with
 * the word in, or its prompt, its right answer or its Why line names that answer ("Talhah was from the same clan
 * as Abu Bakr." before "Talhah became Muslim early, invited by ____.").
 */
export function givesAway(earlier: Challenge, later: Challenge) {
  if (earlier === later || !later.prompt.includes("____")) return false;
  if (asksSameLine(earlier, later)) return true;
  if (answerShows(later, later.prompt)) return false;
  const shown = [earlier.prompt, earlier.type === "true_false" ? "" : rightLabelOf(earlier), earlier.explanation, earlier.easierExplanation];
  return answerShows(later, shown.filter(Boolean).join(" "));
}

/**
 * Questions in an order where none hands the learner the answer to a fill-in after it, as close to the given
 * order as that allows. A lesson's own order question ("Which came first?") stays first: its review picks no
 * question it gives away while there is another (reviewQuestions). When two questions give each other away,
 * the one given first stays first.
 */
export function withoutGiveaways(questions: Challenge[]): Challenge[] {
  const pinned = questions[0]?.id.endsWith("_first") ? [questions[0]] : [];
  const remaining = questions.slice(pinned.length);
  const ordered = [...pinned];
  while (remaining.length) {
    const next = remaining.find((question) => !remaining.some((other) => givesAway(question, other))) ?? remaining[0];
    ordered.push(next);
    remaining.splice(remaining.indexOf(next), 1);
  }
  return ordered;
}

/** A review's questions with each fill-in before any question that would give it away, numbered in that order. */
export function fillInsFirst(lessonId: string, questions: Challenge[]): Challenge[] {
  return withoutGiveaways(questions).map((question, index) => (question.isReview ? { ...question, id: `${lessonId}_review_${index + 1}` } : question));
}

// `count` questions from the lessons in `pool`, one from each lesson before a second from any, never the same
// question twice, and the ones the lesson just before asked (`recent`) only when nothing else is left. Two
// questions on the same line, or one that a question in `taken` (asked before them) gives away, come only when
// nothing else is left, the fill-in first. Each is the same question as in its own lesson, marked as a review.
export function reviewQuestions(
  lessonId: string,
  pool: TaughtLesson[],
  count: number,
  recent: ReadonlySet<string> = new Set(),
  taken: readonly Challenge[] = []
): Challenge[] {
  const lessons = pickIndexes(pool.length, pool.length, lessonId).map((index) => pool[index]);
  const lists = lessons.map((lesson) => rotate(lesson.questions, Math.abs(hashCode(`${lessonId}:${lesson.lessonId}`)) % lesson.questions.length));
  const picked: Challenge[] = [];
  const prompts = new Set<string>(taken.map((question) => question.prompt));
  const rounds = Math.max(0, ...lists.map((list) => list.length));
  for (const allowGiveaway of [false, true]) {
    for (const allowRecent of [false, true]) {
      for (let round = 0; round < rounds && picked.length < count; round += 1) {
        lists.forEach((list, index) => {
          const question = list[round];
          if (!question || picked.length >= count || prompts.has(question.prompt) || (!allowRecent && recent.has(question.prompt))) return;
          // Two picks that name each other's answers are put in a safe order afterwards (withoutGiveaways); a question
          // already asked first, like the order question, cannot move, so nothing it gives away is picked.
          const clashes =
            [...taken, ...picked].some((other) => asksSameLine(other, question)) || taken.some((other) => givesAway(other, question) || givesAway(question, other));
          if (!allowGiveaway && clashes) return;
          prompts.add(question.prompt);
          picked.push({
            ...question,
            id: `${lessonId}_review_${picked.length + 1}`,
            isReview: true,
            sourceLessonId: lessons[index].lessonId,
            sourceNodeId: lessons[index].nodeId
          });
        });
      }
    }
  }
  return fillInsFirst(lessonId, picked);
}

/**
 * How hard a lesson in a unit is, from 0 to 2, by how far along the unit it sits: the first lessons ask only what
 * their card has just shown; further on, questions from earlier lessons come in, asked from memory. A unit after the
 * first in a topic taught as one course starts a step further on.
 */
export function lessonStep(index: number, total: number, laterUnit = false): 0 | 1 | 2 {
  const progress = (total > 1 ? index / (total - 1) : 0) + (laterUnit ? 0.25 : 0);
  return progress < 0.25 ? 0 : progress < 0.6 ? 1 : 2;
}

// Only multiple-choice questions: testers find true/false too easy, so the harder steps ask with choices.
export function choiceQuestionsOf(pool: TaughtLesson[]): TaughtLesson[] {
  return pool
    .map((lesson) => ({ ...lesson, questions: lesson.questions.filter((question) => question.type === "multiple_choice") }))
    .filter((lesson) => lesson.questions.length > 0);
}

/**
 * A teaching lesson's questions at its step. Step 0: its own questions, as they are. Step 1: its true/false
 * question gives way to one multiple-choice question from an earlier lesson; step 2: to two. With nothing earlier
 * to ask from, it keeps its own questions. Its own fill-in stays first, so it still checks the new line.
 */
export function harderQuestions(lessonId: string, own: Challenge[], earlier: TaughtLesson[], step: 0 | 1 | 2, recent: ReadonlySet<string> = new Set()): Challenge[] {
  if (step === 0) return own;
  const kept = own.filter((question) => question.type !== "true_false");
  const recalled = recallQuestions(lessonId, kept, choiceQuestionsOf(earlier), step, recent);
  if (!recalled.length) return own;
  SET_ASIDE.set(lessonId, own.filter((question) => question.type === "true_false"));
  return withoutGiveaways([...kept, ...recalled]);
}

/**
 * Up to `count` questions from `pool` for a lesson that already asks `kept`, none of them asking the same line as
 * another or naming another's answer, either way round: a lesson's own questions can be put in no safe order with
 * one that would, so it is left out.
 */
export function recallQuestions(lessonId: string, kept: readonly Challenge[], pool: TaughtLesson[], count: number, recent: ReadonlySet<string> = new Set()) {
  const picked: Challenge[] = [];
  for (const question of reviewQuestions(lessonId, pool, count + 4, recent, kept)) {
    const others = [...kept, ...picked];
    if (picked.length >= count || others.some((other) => asksSameLine(other, question) || givesAway(other, question) || givesAway(question, other))) continue;
    picked.push({ ...question, id: `${lessonId}_review_${picked.length + 1}` });
  }
  return picked;
}

/**
 * The true/false questions harderQuestions left out, by lesson id: a lesson that a unit plan moves to where it has
 * nothing earlier to ask from gets them back (unitPlans.ts).
 */
export const SET_ASIDE = new Map<string, Challenge[]>();

// A review, a mixed review or a lesson with nothing new to teach: questions from the lessons before it, with its
// own order question first when it has one. Past the first steps of a unit it asks only multiple-choice questions
// while there are enough of them.
function lookBackQuestions(
  lessonId: string,
  lesson: LessonSeed,
  pool: TaughtLesson[],
  recent: ReadonlySet<string>,
  companion?: string,
  step: 0 | 1 | 2 = 0
): Challenge[] {
  const order: Challenge[] = lesson.first
    ? [
        {
          ...mc(`${lessonId}_first`, lesson.firstPrompt ?? "Which comes first?", shuffled([...lesson.first], `${lessonId}:first`), lesson.first[0], orderSentence(lesson.first)),
          miniLesson: orderSentence(lesson.first),
          reviewSuggestion: `Review ${lesson.title}`
        }
      ]
    : [];
  const count = (lesson.reviews ?? 3) - order.length;
  const choices = choiceQuestionsOf(pool);
  const asked = step > 0 && choices.reduce((total, item) => total + item.questions.length, 0) >= count ? choices : pool;
  const questions = [...order, ...reviewQuestions(lessonId, asked, count, recent, order)];
  if (questions.length || !companion) return questions;
  const fact = `${companion} met the Prophet ﷺ and believed in him.`;
  return [{ ...tf(`${lessonId}_tf`, fact, true, "A Muslim who met the Prophet ﷺ is called a Sahabi."), miniLesson: fact, reviewSuggestion: `Review ${lesson.title}` }];
}

// What one companion lesson teaches: its line, with the key word in [brackets], and the rest of a seed's copy.
type CompanionFact = Pick<LessonSeed, "line" | "alt" | "ask" | "myth" | "fix" | "why" | "source"> & { line: string; title?: string };

type CompanionBranchConfig = {
  id: string;
  title: string;
  /** The name the lessons use, such as "Umar" or "Ibn Mas'ud". */
  name: string;
  description: string;
  order: number;
  /** Plain, well-known facts about this companion, by lesson slug. A slot with no fact here has no lesson. */
  facts: Record<string, CompanionFact>;
  /** Three events in this companion's life, the first one first, for the order review. */
  sequence: [string, string, string];
};

const SAHABI_SOURCE_KEYS = ["quran_9_100", "quran_48_29", "quran_33_21"];

// The parts of a companion's story, in the order they are told, each under a plain title. A unit has a lesson
// only for the parts with a true fact about its companion; the slug stays the lesson's id.
const COMPANION_LESSONS: { slug: string; title: (name: string) => string; difficulty: DifficultyTier }[] = [
  { slug: "early-life", title: () => "Growing up", difficulty: 1 },
  { slug: "family-lineage", title: () => "Family", difficulty: 1 },
  { slug: "before-islam", title: () => "Before Islam", difficulty: 1 },
  { slug: "accepting-islam", title: () => "Becoming Muslim", difficulty: 2 },
  { slug: "makkah-years", title: () => "Life in Makkah", difficulty: 2 },
  { slug: "friendship-with-the-prophet", title: () => "Friend of the Prophet ﷺ", difficulty: 2 },
  { slug: "sacrifice-for-islam", title: () => "Giving for Allah", difficulty: 2 },
  { slug: "hijrah-and-turning-points", title: () => "The Hijrah", difficulty: 3 },
  { slug: "courage-under-pressure", title: () => "Being brave", difficulty: 3 },
  { slug: "worship-and-character", title: () => "Good character", difficulty: 3 },
  { slug: "signature-virtue", title: () => "Best known for", difficulty: 3 },
  { slug: "service-to-revelation", title: () => "Serving the Quran", difficulty: 4 },
  { slug: "moments-of-bravery", title: () => "A brave day", difficulty: 4 },
  { slug: "moments-of-mercy", title: () => "A kind heart", difficulty: 4 },
  { slug: "public-service-and-counsel", title: () => "Helping people", difficulty: 4 },
  { slug: "leadership-and-decisions", title: () => "Leading the Muslims", difficulty: 4 },
  { slug: "after-the-prophet", title: () => "After the Prophet ﷺ", difficulty: 4 },
  { slug: "final-years-and-advice", title: (name) => `${name}'s last days`, difficulty: 4 }
];

type CompanionReview = "review-lessons" | "challenge-lessons" | "scenario-lessons" | "sequence-review" | "mastery-lessons";

// The reviews in a companion unit: one after every six lessons, then the order of the companion's life and a
// big quiz to end the unit. They ask the questions of the lessons before them.
const COMPANION_REVIEWS: Record<CompanionReview, { title: string; line: (name: string) => string; difficulty: DifficultyTier; lessonType: "review" | "mastery"; reviews: number }> = {
  "review-lessons": { title: "Review", line: (name) => `Let's remember ${name}'s story!`, difficulty: 3, lessonType: "review", reviews: 3 },
  "challenge-lessons": { title: "Challenge", line: (name) => `Challenge time! How much do you know about ${name}?`, difficulty: 4, lessonType: "mastery", reviews: 4 },
  "scenario-lessons": { title: "Quick quiz", line: (name) => `One more round of ${name} questions!`, difficulty: 4, lessonType: "mastery", reviews: 4 },
  "sequence-review": { title: "Life in order", line: (name) => `Can you put ${name}'s life in order?`, difficulty: 5, lessonType: "review", reviews: 3 },
  "mastery-lessons": { title: "Big quiz", line: (name) => `Show what you know about ${name}!`, difficulty: 5, lessonType: "mastery", reviews: 6 }
};

const MID_UNIT_REVIEWS: CompanionReview[] = ["review-lessons", "challenge-lessons", "scenario-lessons"];

function buildCompanionLessons(config: CompanionBranchConfig): LessonSeed[] {
  const review = (slug: CompanionReview): LessonSeed => {
    const { title, line, difficulty, lessonType, reviews } = COMPANION_REVIEWS[slug];
    const text = line(config.name);
    return seed(slug, title, text, difficulty, {
      line: text,
      kind: "review",
      lessonType,
      reviews,
      ...(slug === "sequence-review" ? { first: config.sequence, firstPrompt: `Which came first in ${config.name}'s life?` } : {})
    });
  };
  const taught = COMPANION_LESSONS.filter(({ slug }) => config.facts[slug]).map(({ slug, title, difficulty }) => {
    const { title: factTitle, ...copy } = config.facts[slug];
    return seed(slug, factTitle ?? title(config.name), plainLine(copy.line), difficulty, copy);
  });
  const lessons: LessonSeed[] = [];
  taught.forEach((lesson, index) => {
    lessons.push(lesson);
    const mid = (index + 1) % 6 === 0 && index < taught.length - 1 ? MID_UNIT_REVIEWS[(index + 1) / 6 - 1] : undefined;
    if (mid) lessons.push(review(mid));
  });
  return [...lessons, review("sequence-review"), review("mastery-lessons")];
}

function buildCompanionBranch(config: CompanionBranchConfig): BranchSeed {
  return {
    id: config.id,
    title: config.title,
    description: config.description,
    order: config.order,
    clusterSize: 5,
    difficultyRange: [1, 5],
    sourceKeys: SAHABI_SOURCE_KEYS,
    companion: config.name,
    lessons: buildCompanionLessons(config)
  };
}

const AFTER_THE_HIJRAH: [string, string, string] = ["Accepting Islam", "The Hijrah", "The Prophet ﷺ passes away"];

function buildSahabiWorldBranches(): BranchSeed[] {
  return [
    buildCompanionBranch({
      id: "sahabi-abu-bakr",
      title: "Abu Bakr",
      name: "Abu Bakr",
      description: "Follow the life of Abu Bakr from early truthfulness to leadership, worship, and caring for the Ummah after the Prophet ﷺ.",
      order: 1,
      sequence: ["Accepting Islam", "The Hijrah", "Becoming caliph"],
      facts: {
        "early-life": { line: "Abu Bakr was born and grew up in [Makkah].", alt: ["Madinah", "Taif"], why: "He was from Quraysh, the tribe of Makkah." },
        "family-lineage": { line: "Abu Bakr was the father of [Aishah].", alt: ["Fatimah", "Hafsah"], why: "Aishah grew up to be a great teacher of Islam." },
        "before-islam": { line: "Before Islam, Abu Bakr was a well-liked [trader].", alt: ["king", "sailor"] },
        "accepting-islam": { line: "Abu Bakr was the [first] grown man to accept Islam.", alt: ["last", "tenth"], why: "He believed the Prophet ﷺ right away." },
        "makkah-years": { line: "In Makkah, Abu Bakr set [Bilal] free.", alt: ["Umar", "Khalid"], why: "Bilal was being hurt for saying Allah is One.", source: "hadith_bukhari_3754" },
        "friendship-with-the-prophet": { line: "Abu Bakr was the Prophet's ﷺ closest [friend].", alt: ["teacher", "uncle"] },
        "sacrifice-for-islam": { line: "Once, Abu Bakr gave [all] his money for Allah's cause.", alt: ["half", "a little of"], why: "He said he left Allah and His Messenger ﷺ for his family." },
        "hijrah-and-turning-points": { line: "On the Hijrah, Abu Bakr hid with the Prophet ﷺ in a [cave].", alt: ["tent", "boat"], why: "The Quran tells of the two of them in the cave.", source: "quran_9_40" },
        "courage-under-pressure": { line: "Abu Bakr [protected] the Prophet ﷺ when people attacked him.", alt: ["ignored", "left"], why: "He asked: will you kill a man for saying my Lord is Allah?" },
        "worship-and-character": { line: "Abu Bakr often [cried] when he recited the Quran.", alt: ["laughed", "shouted"] },
        "signature-virtue": { title: "The truthful one", line: "Abu Bakr was called [As-Siddiq], the truthful one.", alt: ["Al-Faruq", "Sayf Allah"], why: "He believed the Prophet ﷺ about the Night Journey at once." },
        "service-to-revelation": { line: "Abu Bakr had the [Quran] collected in one place.", alt: ["poems", "stories"], why: "Zayd ibn Thabit did the collecting for him.", source: "hadith_bukhari_4986" },
        "moments-of-bravery": { title: "A hard day", line: "When the Prophet ﷺ died, Abu Bakr [calmed] the people.", alt: ["blamed", "left"], why: "He reminded them: Allah is alive and never dies." },
        "moments-of-mercy": { line: "Aishah said her father was a [soft-hearted] man.", alt: ["hard-hearted", "selfish"], why: "Soft-hearted means kind and quick to cry." },
        "public-service-and-counsel": { title: "Leading the prayer", line: "When the Prophet ﷺ was ill, Abu Bakr led the [prayer].", alt: ["army", "caravan"], why: "The Prophet ﷺ himself asked for Abu Bakr to lead it." },
        "leadership-and-decisions": { line: "After the Prophet ﷺ, Abu Bakr became the first [caliph].", alt: ["king", "sultan"], why: "A caliph leads the Muslims after the Prophet ﷺ." },
        "after-the-prophet": { line: "As caliph, Abu Bakr made sure [zakat] was still paid.", alt: ["rent", "fines"], why: "He would not let anyone separate salah from zakat." },
        "final-years-and-advice": { line: "Abu Bakr was buried beside the Prophet ﷺ in [Madinah].", alt: ["Makkah", "Taif"], why: "They lie in Aishah's room, next to the Prophet's ﷺ masjid." }
      }
    }),
    buildCompanionBranch({
      id: "sahabi-umar-ibn-al-khattab",
      title: "Umar ibn al-Khattab",
      name: "Umar",
      description: "Study the strength, justice, humility, and accountability that marked Umar ibn al-Khattab.",
      order: 2,
      sequence: ["Accepting Islam", "The Hijrah", "Becoming caliph"],
      facts: {
        "early-life": { line: "Umar grew up in [Makkah], in the tribe of Quraysh.", alt: ["Madinah", "Yemen"] },
        "family-lineage": { line: "Umar was the father of [Hafsah], a wife of the Prophet ﷺ.", alt: ["Aishah", "Fatimah"], why: "Hafsah is one of the Mothers of the Believers." },
        "before-islam": { line: "Before Islam, Umar was a strong [enemy] of the Muslims.", alt: ["friend", "helper"] },
        "accepting-islam": { line: "When Umar became Muslim, the Muslims grew [stronger].", alt: ["weaker", "smaller"], why: "Ibn Mas'ud said they were strong from the day Umar accepted Islam." },
        "sacrifice-for-islam": { line: "Once, Umar gave [half] his money for Allah's cause.", alt: ["all", "none of"], why: "That same day, Abu Bakr gave all of his." },
        "signature-virtue": { title: "Al-Faruq", line: "Umar was called [Al-Faruq] because he told right from wrong.", alt: ["As-Siddiq", "Sayf Allah"], why: "He was famous for being fair." },
        "service-to-revelation": { line: "Umar asked Abu Bakr to [collect] the Quran in one place.", alt: ["hide", "sell"], why: "Many Quran reciters had died in a battle.", source: "hadith_bukhari_4986" },
        "leadership-and-decisions": { line: "After Abu Bakr, Umar became the [second] caliph.", alt: ["first", "fourth"], why: "Abu Bakr was the first caliph." },
        "after-the-prophet": { title: "The Islamic calendar", line: "Umar began counting the Islamic years from the [Hijrah].", alt: ["Night Journey", "Battle of Badr"], why: "That is why it is called the Hijri calendar." },
        "final-years-and-advice": { line: "Umar was hurt while leading [Fajr] and died a few days later.", alt: ["Isha", "Eid"] }
      }
    }),
    buildCompanionBranch({
      id: "sahabi-uthman-ibn-affan",
      title: "Uthman ibn Affan",
      name: "Uthman",
      description: "Go deep into the modesty, generosity, patience, and preservation work of Uthman ibn Affan.",
      order: 3,
      sequence: ["Moving to Abyssinia", "The Hijrah to Madinah", "Becoming caliph"],
      facts: {
        "early-life": { line: "Uthman was from [Quraysh], the Prophet's ﷺ own tribe.", alt: ["Ghifar", "Persia"] },
        "family-lineage": { line: "Uthman married [two] daughters of the Prophet ﷺ.", alt: ["three", "no"], why: "So he was called Dhun-Nurayn, the one with two lights." },
        "before-islam": { line: "Before Islam, Uthman was a rich [trader].", alt: ["king", "farmer"] },
        "accepting-islam": { line: "Uthman became Muslim early, invited by [Abu Bakr].", alt: ["Khalid", "Abu Jahl"] },
        "makkah-years": { line: "Uthman and his wife Ruqayyah moved to [Abyssinia] for safety.", alt: ["Rome", "Persia"], why: "In Abyssinia, a fair king let the Muslims live in peace." },
        "sacrifice-for-islam": { line: "Uthman bought a [well] and gave its water to everyone.", alt: ["lake", "horse"] },
        "signature-virtue": { title: "Modesty and generosity", line: "Uthman was known for haya: being [modest] and shy.", alt: ["loud", "rude"], why: "The Prophet ﷺ said even the angels were shy of Uthman.", source: "hadith_muslim_2401" },
        "service-to-revelation": { line: "Uthman sent copies of the [Quran] to Muslim cities.", alt: ["letters", "poems"], why: "So everyone read from the same written Quran.", source: "hadith_bukhari_4987" },
        "public-service-and-counsel": { title: "Helping the army", line: "Uthman paid for much of the army going to [Tabuk].", alt: ["Yemen", "Egypt"] },
        "leadership-and-decisions": { line: "After Umar, Uthman became the [third] caliph.", alt: ["first", "fifth"], why: "Abu Bakr and Umar led the Muslims before him." },
        "final-years-and-advice": { line: "Uthman was martyred at home while reading the [Quran].", alt: ["news", "letters"] }
      }
    }),
    buildCompanionBranch({
      id: "sahabi-ali-ibn-abi-talib",
      title: "Ali ibn Abi Talib",
      name: "Ali",
      description: "Trace the courage, knowledge, closeness, and principled leadership of Ali ibn Abi Talib.",
      order: 4,
      sequence: ["Accepting Islam", "Sleeping in the Prophet's ﷺ bed", "Becoming caliph"],
      facts: {
        "early-life": { line: "Ali grew up in the Prophet's ﷺ own [home].", alt: ["palace", "village"] },
        "family-lineage": { line: "Ali was the Prophet's ﷺ [cousin].", alt: ["uncle", "grandfather"], why: "Ali's father, Abu Talib, raised the Prophet ﷺ as a boy." },
        "accepting-islam": { line: "Ali was the first [child] to accept Islam.", alt: ["grown man", "trader"], why: "Khadijah was the first woman, and Abu Bakr the first man." },
        "friendship-with-the-prophet": { title: "The Hijrah night", line: "On the Hijrah night, Ali slept in the Prophet's ﷺ [bed].", alt: ["cave", "tent"], why: "He stayed to give back things people had left with the Prophet ﷺ." },
        "hijrah-and-turning-points": { title: "Ali's family", line: "In Madinah, Ali married [Fatimah], the Prophet's ﷺ daughter.", alt: ["Aishah", "Hafsah"], why: "Their sons were Hasan and Husayn." },
        "moments-of-bravery": { line: "At Khaybar, the Prophet ﷺ gave the [flag] to Ali.", alt: ["horse", "book"], why: "He said its bearer loves Allah and His Messenger ﷺ.", source: "hadith_bukhari_3701" },
        "signature-virtue": { title: "Knowledge and courage", line: "Ali was famous for his [knowledge] and wise judging.", alt: ["wealth", "jokes"], why: "Umar said Ali was the best judge among them." },
        "leadership-and-decisions": { line: "Ali became the [fourth] caliph, after Uthman.", alt: ["first", "second"], why: "Abu Bakr, Umar and Uthman led the Muslims before him." },
        "final-years-and-advice": { line: "Ali was martyred in [Kufa], in Iraq.", alt: ["Damascus", "Makkah"] }
      }
    }),
    buildCompanionBranch({
      id: "sahabi-khalid-ibn-al-walid",
      title: "Khalid ibn al-Walid",
      name: "Khalid",
      description: "Study how Islam redirected strength, strategy, and courage in the life of Khalid ibn al-Walid.",
      order: 5,
      sequence: ["Fighting at Uhud", "Accepting Islam", "Being called a sword of Allah"],
      facts: {
        "early-life": { line: "Khalid grew up in [Makkah], in the tribe of Quraysh.", alt: ["Madinah", "Yemen"] },
        "family-lineage": { line: "Ibn al-Walid means Khalid was the [son] of al-Walid.", alt: ["teacher", "friend"], why: "In Arabic, ibn means son of." },
        "before-islam": { line: "Before Islam, Khalid fought [against] the Muslims at Uhud.", alt: ["beside", "for"] },
        "accepting-islam": { line: "Khalid became Muslim [later] than many companions.", alt: ["earlier", "sooner"], why: "He came to Madinah to accept Islam before Makkah was opened." },
        "signature-virtue": { title: "The Sword of Allah", line: "The Prophet ﷺ called Khalid a [sword] of Allah.", alt: ["shield", "lion"], why: "He said it at the time of the Battle of Mu'tah.", source: "hadith_bukhari_3757" },
        "leadership-and-decisions": { line: "When Umar replaced him as leader, Khalid [obeyed].", alt: ["refused", "quit"], why: "He kept fighting under Abu Ubaydah." },
        "final-years-and-advice": { line: "Khalid fought in many battles but died in his [bed].", alt: ["tent", "boat"] }
      }
    }),
    buildCompanionBranch({
      id: "sahabi-bilal-ibn-rabah",
      title: "Bilal ibn Rabah",
      name: "Bilal",
      description: "Learn from Bilal ibn Rabah about faith under hardship, dignity, service, and steadfastness.",
      order: 6,
      sequence: ["Being freed by Abu Bakr", "The Hijrah", "The adhan on the Ka'bah"],
      facts: {
        "early-life": { line: "Bilal grew up as a [slave] in Makkah.", alt: ["king", "trader"], why: "His mother came from Abyssinia, in Africa." },
        "family-lineage": { line: "Bilal's mother was named [Hamamah].", alt: ["Sumayyah", "Khadijah"], why: "His father was Rabah, so he is called Bilal ibn Rabah." },
        "before-islam": { line: "Before Islam, Bilal was the slave of [Umayyah ibn Khalaf].", alt: ["Abu Talib", "Hamzah"], why: "Umayyah hurt Bilal badly for becoming Muslim." },
        "accepting-islam": { line: "Bilal was one of the [first] people to accept Islam.", alt: ["last", "latest"] },
        "sacrifice-for-islam": { title: "Set free", line: "Abu Bakr bought Bilal and set him [free].", alt: ["to work", "aside"], why: "Umar said: Abu Bakr is our master, and he freed our master.", source: "hadith_bukhari_3754" },
        "worship-and-character": { line: "The Prophet ﷺ heard Bilal's [footsteps] in Paradise.", alt: ["horse", "song"], why: "Bilal prayed after every wudu he made.", source: "hadith_bukhari_1149" },
        "signature-virtue": {
          title: "Steadfast faith",
          line: "Even when they hurt him, Bilal kept saying: Ahad, Ahad!",
          ask: ["What did Bilal keep saying when he was hurt?", "Ahad, Ahad", "Help me", "I give up"],
          myth: "When they hurt him, Bilal stopped saying: Ahad, Ahad!",
          why: "Ahad means One: Allah is One."
        },
        "service-to-revelation": { title: "The first adhan", line: "Bilal was the first [mu'adhdhin], who calls the adhan.", alt: ["imam", "caliph"], why: "He had a strong, beautiful voice." },
        "moments-of-bravery": { line: "When Makkah was opened, Bilal called the adhan on the [Ka'bah].", alt: ["mountain", "ship"] },
        "after-the-prophet": { line: "After the Prophet ﷺ died, Bilal moved to [Sham].", alt: ["Yemen", "Egypt"], why: "Sham is the land around Syria." }
      }
    }),
    buildCompanionBranch({
      id: "sahabi-abu-ubaydah-ibn-al-jarrah",
      title: "Abu Ubaydah ibn al-Jarrah",
      name: "Abu Ubaydah",
      description: "Follow the trustworthiness, restraint, and service of Abu Ubaydah ibn al-Jarrah.",
      order: 7,
      sequence: AFTER_THE_HIJRAH,
      facts: {
        "early-life": { line: "Abu Ubaydah was from [Quraysh], the tribe of Makkah.", alt: ["Ghifar", "Persia"] },
        "family-lineage": { line: "Abu Ubaydah's real name was [Amir].", alt: ["Khalid", "Zayd"], why: "Abu Ubaydah is a nickname: the father of Ubaydah." },
        "accepting-islam": { line: "Abu Ubaydah was one of the [first] people to accept Islam.", alt: ["last", "latest"] },
        "friendship-with-the-prophet": { title: "Promised Paradise", line: "Abu Ubaydah is one of the [ten] promised Paradise.", alt: ["two", "hundred"], why: "Abu Bakr, Umar, Uthman and Ali are among them too." },
        "signature-virtue": { title: "The trustworthy one", line: "The Prophet ﷺ called Abu Ubaydah this Ummah's [trustworthy] one.", alt: ["richest", "loudest"], why: "In Arabic, Amin means trustworthy.", source: "hadith_bukhari_3744" },
        "leadership-and-decisions": { line: "Umar made Abu Ubaydah leader of the army in [Sham].", alt: ["Yemen", "Egypt"] },
        "final-years-and-advice": { line: "Abu Ubaydah died of a [plague] in Sham.", alt: ["battle", "flood"], why: "A plague is an illness that spreads to many people." }
      }
    }),
    buildCompanionBranch({
      id: "sahabi-talhah-ibn-ubaydillah",
      title: "Talhah ibn Ubaydillah",
      name: "Talhah",
      description: "Study the generosity, protection, and courage of Talhah ibn Ubaydillah.",
      order: 8,
      sequence: AFTER_THE_HIJRAH,
      facts: {
        "early-life": { line: "Talhah grew up in [Makkah], in the tribe of Quraysh.", alt: ["Madinah", "Yemen"] },
        "family-lineage": { line: "Talhah was from the same clan as [Abu Bakr].", alt: ["Abu Jahl", "Khalid"], why: "Their clan, Banu Taym, was part of Quraysh." },
        "accepting-islam": { line: "Talhah became Muslim early, invited by [Abu Bakr].", alt: ["Khalid", "Abu Jahl"] },
        "friendship-with-the-prophet": { title: "Promised Paradise", line: "Talhah is one of the [ten] promised Paradise.", alt: ["two", "hundred"], why: "Abu Bakr, Umar, Uthman and Ali are among them too." },
        "signature-virtue": { title: "Generosity", line: "Talhah was known as a very [generous] man.", alt: ["stingy", "rude"] },
        "moments-of-bravery": { line: "At Uhud, Talhah shielded the Prophet ﷺ with his own [hand].", alt: ["horse", "cloak"], why: "His hand was left unable to move." }
      }
    }),
    buildCompanionBranch({
      id: "sahabi-az-zubayr-ibn-al-awwam",
      title: "Az-Zubayr ibn al-Awwam",
      name: "Az-Zubayr",
      description: "Learn how bravery, loyalty, and restraint appear in the life of Az-Zubayr ibn al-Awwam.",
      order: 9,
      sequence: AFTER_THE_HIJRAH,
      facts: {
        "early-life": { line: "Az-Zubayr grew up in [Makkah], in the tribe of Quraysh.", alt: ["Madinah", "Yemen"] },
        "family-lineage": { line: "Az-Zubayr was the Prophet's ﷺ [cousin].", alt: ["uncle", "grandson"], why: "His mother, Safiyyah, was the Prophet's ﷺ aunt." },
        "accepting-islam": { line: "Az-Zubayr became Muslim when he was still [young].", alt: ["old", "elderly"] },
        "makkah-years": { title: "Az-Zubayr's family", line: "Az-Zubayr married [Asma], the daughter of Abu Bakr.", alt: ["Aishah", "Hafsah"], why: "Asma was Aishah's older sister." },
        "friendship-with-the-prophet": { title: "Promised Paradise", line: "Az-Zubayr is one of the [ten] promised Paradise.", alt: ["two", "hundred"], why: "Abu Bakr, Umar, Uthman and Ali are among them too." },
        "signature-virtue": { title: "The Prophet's ﷺ helper", line: "The Prophet ﷺ called Az-Zubayr his hawari, his special [helper].", alt: ["cook", "barber"], why: "The helpers of Isa were called hawariyyun too." }
      }
    }),
    buildCompanionBranch({
      id: "sahabi-sad-ibn-abi-waqqas",
      title: "Sa'd ibn Abi Waqqas",
      name: "Sa'd",
      description: "Trace the obedience, answered supplication, and strategic service of Sa'd ibn Abi Waqqas.",
      order: 10,
      sequence: AFTER_THE_HIJRAH,
      facts: {
        "early-life": { line: "Sa'd grew up in [Makkah], in the tribe of Quraysh.", alt: ["Madinah", "Yemen"] },
        "family-lineage": { line: "Sa'd was from the family of the Prophet's ﷺ [mother].", alt: ["teacher", "friend"], why: "The Prophet ﷺ called him his uncle on his mother's side." },
        "accepting-islam": { line: "Sa'd was one of the [first] few people to accept Islam.", alt: ["last", "latest"] },
        "makkah-years": { line: "When Sa'd became Muslim, his [mother] refused to eat.", alt: ["sister", "teacher"], why: "He stayed kind to her but kept his faith." },
        "friendship-with-the-prophet": { title: "Promised Paradise", line: "Sa'd is one of the [ten] promised Paradise.", alt: ["two", "hundred"], why: "Abu Bakr, Umar, Uthman and Ali are among them too." },
        "signature-virtue": { title: "An answered du'a", line: "The Prophet ﷺ prayed that Sa'd's du'as would be [answered].", alt: ["short", "written"] },
        "moments-of-bravery": { line: "Sa'd was the first to shoot [arrows] for Allah's cause.", alt: ["spears", "stones"], why: "He was the first Arab to do it, before Badr. Later, at Uhud, the Prophet ﷺ cheered him on." }
      }
    }),
    buildCompanionBranch({
      id: "sahabi-salman-al-farisi",
      title: "Salman al-Farisi",
      name: "Salman",
      description: "Study the long search for truth, wisdom, and belonging in the life of Salman al-Farisi.",
      order: 11,
      sequence: ["Leaving Persia", "Being sold as a slave", "Meeting the Prophet ﷺ"],
      facts: {
        "early-life": { line: "Salman grew up in [Persia], far from Arabia.", alt: ["Egypt", "Makkah"], why: "Al-Farisi means the Persian." },
        "family-lineage": { line: "Salman's family in Persia worshipped [fire].", alt: ["the sea", "trees"] },
        "before-islam": { line: "While searching for the truth, Salman was [sold] as a slave.", alt: ["crowned", "hired"], why: "Before that, he learned from several Christian teachers." },
        "accepting-islam": { line: "Salman met the Prophet ﷺ in [Madinah] and became Muslim.", alt: ["Persia", "Rome"] },
        "makkah-years": { title: "Set free", line: "The Prophet ﷺ helped plant [date palms] to set Salman free.", alt: ["roses", "wheat"] },
        "signature-virtue": { title: "Searching for truth", line: "Salman traveled very far from home to [find] the truth.", alt: ["hide", "escape"] },
        "public-service-and-counsel": { title: "The trench", line: "Salman gave the idea to dig a [trench] around Madinah.", alt: ["tunnel", "well"], why: "It kept a much bigger army out of Madinah." }
      }
    }),
    buildCompanionBranch({
      id: "sahabi-abu-dharr-al-ghifari",
      title: "Abu Dharr al-Ghifari",
      name: "Abu Dharr",
      description: "Go deeper into the blunt honesty, simple living, and moral seriousness of Abu Dharr al-Ghifari.",
      order: 12,
      sequence: AFTER_THE_HIJRAH,
      facts: {
        "early-life": { line: "Abu Dharr grew up with the [Ghifar] tribe, outside Makkah.", alt: ["Quraysh", "Thaqif"], why: "Al-Ghifari means from the Ghifar tribe." },
        "family-lineage": { line: "Abu Dharr's real name was [Jundub].", alt: ["Khalid", "Zayd"], why: "Abu Dharr is a nickname, as many Arabs had." },
        "accepting-islam": { line: "Abu Dharr was one of the very [first] Muslims.", alt: ["last", "latest"] },
        "makkah-years": { line: "Abu Dharr bravely called out his Islam at the [Ka'bah].", alt: ["market", "well"] },
        "worship-and-character": { line: "The Prophet ﷺ praised Abu Dharr for his [truthful] speech.", alt: ["loud", "funny"] },
        "signature-virtue": { title: "Simple living", line: "Abu Dharr lived a very [simple] life.", alt: ["fancy", "lazy"] }
      }
    }),
    buildCompanionBranch({
      id: "sahabi-abdullah-ibn-masud",
      title: "Abdullah ibn Mas'ud",
      name: "Ibn Mas'ud",
      description: "Study knowledge, Quran recitation, humility, and precision through Abdullah ibn Mas'ud.",
      order: 13,
      sequence: AFTER_THE_HIJRAH,
      facts: {
        "early-life": { line: "As a boy, Ibn Mas'ud looked after [sheep] in Makkah.", alt: ["horses", "ships"] },
        "family-lineage": { line: "Ibn Mas'ud's first name was [Abdullah].", alt: ["Ali", "Umar"], why: "Ibn Mas'ud means the son of Mas'ud." },
        "accepting-islam": { line: "Ibn Mas'ud became Muslim early, in [Makkah].", alt: ["Madinah", "Kufa"] },
        "makkah-years": { line: "Ibn Mas'ud recited the Quran out loud near the [Ka'bah].", alt: ["market", "well"] },
        "friendship-with-the-prophet": { title: "Recite to me", line: "The Prophet ﷺ asked Ibn Mas'ud to [recite] the Quran to him.", alt: ["teach", "draw"], why: "He recited An-Nisa, and the Prophet ﷺ wept.", source: "hadith_bukhari_5050" },
        "signature-virtue": { title: "Teacher of the Quran", line: "The Prophet ﷺ told Muslims to learn the [Quran] from Ibn Mas'ud.", alt: ["poetry", "trading"], why: "He named three others too, with Ibn Mas'ud first." },
        "after-the-prophet": { line: "Umar sent Ibn Mas'ud to [Kufa] to teach the people.", alt: ["Rome", "Makkah"] }
      }
    }),
    buildCompanionBranch({
      id: "sahabi-anas-ibn-malik",
      title: "Anas ibn Malik",
      name: "Anas",
      description: "Follow the service, memory, and long transmission of Anas ibn Malik.",
      order: 14,
      sequence: ["Serving the Prophet ﷺ", "The Prophet ﷺ passes away", "Living in Basra"],
      facts: {
        "early-life": { line: "Anas grew up in [Madinah], among the Ansar.", alt: ["Makkah", "Persia"], why: "The Ansar were the Muslims of Madinah who helped the Prophet ﷺ." },
        "family-lineage": { line: "Anas's mother, [Umm Sulaym], brought him to serve the Prophet ﷺ.", alt: ["Khadijah", "Aishah"] },
        "makkah-years": { title: "A boy in Madinah", line: "When the Prophet ﷺ came to Madinah, Anas was about [ten].", alt: ["forty", "two"] },
        "friendship-with-the-prophet": { title: "Ten years of help", line: "Anas served the Prophet ﷺ for [ten] years.", alt: ["two", "forty"], why: "In all that time, the Prophet ﷺ never once said uff to him.", source: "hadith_bukhari_6038" },
        "worship-and-character": { title: "A du'a for Anas", line: "The Prophet ﷺ prayed for Anas to have wealth and many [children].", alt: ["enemies", "worries"] },
        "signature-virtue": { title: "Sharing the Sunnah", line: "Anas told many [hadith] about the Prophet ﷺ.", alt: ["poems", "jokes"], why: "He is one of the companions who told the most hadith." },
        "final-years-and-advice": { line: "Anas lived a long life and died in [Basra].", alt: ["Makkah", "Persia"], why: "He was one of the last companions to pass away." }
      }
    })
  ];
}

function buildPrayerCurriculumBranches(): BranchSeed[] {
  return [
    {
      id: "prayer-wudu",
      title: "Wudu",
      description: "A full wudu branch that teaches the order, the core acts, the sunnah details, mistakes, and real practice.",
      order: 1,
      clusterSize: 5,
      difficultyRange: [1, 5],
      sourceKeys: ["quran_5_6", "hadith_muslim_224", "hadith_bukhari_164", "video_wudu_1", "video_wudu_2", "video_wudu_3"],
      lessons: [
        seed("what-wudu-is", "What wudu is", "Wudu is the purification that prepares a Muslim for prayer with obedience and cleanliness.", 1, {
          source: "quran_5_6",
          line: "Wudu is the washing we do before [salah].",
          alt: ["lunch", "playtime"]
        }),
        seed("why-wudu-matters", "Why wudu matters", "Purification matters because prayer is approached with readiness, not carelessness.", 1, {
          source: "hadith_muslim_224",
          line: "Allah accepts our salah only when we are [clean].",
          alt: ["hungry", "sleepy"],
          why: "The Prophet ﷺ said no salah is accepted without purity."
        }),
        seed("conditions-before-wudu", "Clean water", "Before you begin, you need readiness, clean water, and a calm intention.", 1, {
          line: "For wudu, you need clean [water].",
          alt: ["juice", "milk"]
        }),
        seed("intention-basics", "Intention", "Wudu begins as a conscious act of preparing for worship, not as empty routine.", 2, {
          // The no-break space keeps "heart" (or the blank) on the line with "your" in a narrow bubble.
          line: "Your niyyah for wudu is in your\u00a0[heart].",
          alt: ["mouth", "pocket"],
          why: "Allah knows what is in your heart, so you don't have to say it out loud."
        }),
        seed("wash-hands-first", "Wash hands first", "The opening of wudu trains order from the first movement, not random washing.", 2, {
          source: "hadith_bukhari_164",
          line: "Wudu starts by washing your [hands].",
          alt: ["feet", "face"],
          why: "The Prophet ﷺ began his wudu by washing his hands three times."
        }),
        seed("rinse-mouth", "Rinse the mouth", "Rinsing the mouth is part of the taught order and should be done with care.", 2, {
          source: "hadith_bukhari_164",
          line: "Next, rinse your [mouth] with water.",
          alt: ["ears", "feet"],
          why: "Swish the water around, then spit it out."
        }),
        seed("rinse-nose", "Rinse the nose", "Rinsing the nose teaches completeness and attention inside a simple act.", 2, {
          source: "hadith_bukhari_164",
          line: "Then sniff water into your [nose] and blow it out.",
          alt: ["eyes", "ears"],
          first: ["Wash the hands", "Rinse the mouth", "Rinse the nose"]
        }),
        seed("wash-face", "Wash the face", "The face must be washed properly and not reduced to a rushed splash.", 2, {
          source: "quran_5_6",
          line: "Wash your whole [face], from your hairline to your chin.",
          alt: ["neck", "back"],
          why: "Wash it from one ear to the other, too.",
          first: ["Rinse the mouth", "Rinse the nose", "Wash the face"]
        }),
        seed("wash-arms", "Wash the arms", "The arms are washed fully in the taught order, with care instead of haste.", 3, {
          source: "quran_5_6",
          line: "Wash each arm up to the [elbow].",
          alt: ["wrist", "shoulder"],
          why: "The Quran says to wash the arms up to the elbows.",
          first: ["Rinse the nose", "Wash the face", "Wash the arms"]
        }),
        seed("wipe-head", "Wipe the head", "Wiping the head teaches that wudu is followed as taught, not improvised from habit.", 3, {
          source: "quran_5_6",
          line: "Wipe your [head] with wet hands.",
          alt: ["back", "knees"],
          why: "Move your hands from the front of your head to the back.",
          first: ["Wash the face", "Wash the arms", "Wipe the head"]
        }),
        seed("wipe-ears", "Wipe the ears", "The ears are wiped right after the head, as the Prophet ﷺ did.", 3, {
          line: "Wipe your [ears] right after your head.",
          alt: ["knees", "elbows"],
          why: "Fingers go inside the ears and thumbs behind them.",
          first: ["Wash the arms", "Wipe the head", "Wipe the ears"]
        }),
        seed("wash-feet", "Wash the feet", "The feet complete the main body sequence and should not be handled carelessly.", 3, {
          source: "quran_5_6",
          line: "Last, wash your feet up to the [ankles].",
          alt: ["knees", "toes"],
          why: "Make sure the water gets between your toes.",
          first: ["Wipe the head", "Wipe the ears", "Wash the feet"]
        }),
        seed("full-order", "The whole order", "Wudu becomes strong when you can hold the whole order from start to finish.", 3, {
          line: "Hands, mouth, nose, face, arms, head, ears, then [feet].",
          alt: ["knees", "neck"],
          first: ["Rinse the nose", "Wash the arms", "Wipe the ears"]
        }),
        seed("fard-acts", "Four parts in the Quran", "Some acts of wudu are core acts that cannot be left out.", 4, {
          source: "quran_5_6",
          line: "The Quran names four parts: face, arms, [head], and feet.",
          alt: ["neck", "knees"]
        }),
        seed("sunnah-acts", "Three times", "The Sunnah beautifies and perfects the purification beyond the bare minimum.", 4, {
          source: "hadith_bukhari_164",
          line: "Washing each part [three] times is Sunnah.",
          alt: ["ten", "seven"],
          why: "Once is enough; the Prophet ﷺ sometimes washed each part once."
        }),
        seed("what-breaks-wudu", "What breaks wudu", "Know clearly what breaks wudu, and do not guess about it.", 4, {
          source: "hadith_bukhari_135",
          line: "Passing wind [breaks] your wudu.",
          alt: ["keeps", "doubles"],
          why: "Make wudu again before you pray."
        }),
        seed("what-does-not-break-wudu", "What does not break wudu", "Not everything people worry about actually breaks wudu, so clarity matters.", 4, {
          source: "hadith_bukhari_137",
          line: "[A doubt] alone does not break your wudu.",
          alt: ["Passing wind", "Deep sleep"],
          why: "Keep your wudu unless you are sure it broke."
        }),
        seed("bathroom-etiquette", "Toilet manners", "Purity training also includes adab before a person even returns to the sink.", 4, {
          line: "In the toilet, clean yourself using your left hand.",
          ask: ["Which hand cleans you in the toilet?", "The left hand", "The right hand", "The eating hand"],
          myth: "In the toilet, clean yourself using your right hand.",
          why: "The right hand is kept for eating and drinking."
        }),
        seed("common-mistakes", "No dry spots", "Most wudu mistakes come from rushing, bad order, or not washing properly.", 5, {
          line: "Let water reach every part, even your [heels].",
          alt: ["pockets", "shoes"],
          why: "The Prophet ﷺ warned people who left their heels dry."
        }),
        seed("demonstration-and-practice", "Do it all", "Put all the wudu steps together, then check yourself.", 5, {
          line: "Do it all, and end by washing your [feet].",
          alt: ["face", "hands"]
        }),
        seed("reinforcement-review", "Review", "Repeat the order, the core acts, the sunnah details, and the nullifiers until they become stable.", 5, { kind: "review", lessonType: "review", line: "Wudu goes from your hands all the way to your feet." }),
        seed("wudu-mastery-check", "Big quiz", "Mastery means you can perform, explain, and correct wudu with confidence.", 5, { kind: "review", lessonType: "mastery", line: "You know the steps, the Sunnah, and what breaks wudu." })
      ]
    },
    {
      id: "prayer-salah-basics",
      title: "Salah basics",
      description: "Learn what salah is, why it matters, the five daily prayers, and the broad shape of prayer before detail work.",
      order: 2,
      clusterSize: 5,
      difficultyRange: [1, 4],
      sourceKeys: ["hadith_bukhari_631", "quran_33_21"],
      lessons: [
        seed("why-salah-matters", "Why salah matters", "Salah is a pillar that keeps the believer returning to Allah through the whole day.", 1, {
          source: "hadith_bukhari_8",
          line: "Salah is one of the [five] pillars of Islam.",
          alt: ["two", "ten"],
          why: "It comes right after the shahadah, the first pillar."
        }),
        seed("five-daily-prayers", "The five daily prayers", "The five named prayers shape the whole day around worship.", 1, {
          line: "Muslims pray [five] times every day.",
          alt: ["three", "ten"],
          why: "Allah gave the five prayers on the night of the Mi'raj."
        }),
        seed("names-and-order", "Names in order", "Knowing the names and order of the prayers prevents confusion and builds a stable rhythm.", 1, {
          line: "Fajr, Dhuhr, Asr, Maghrib, and then [Isha].",
          alt: ["Eid", "Duha"],
          why: "Fajr is at dawn and Isha is at night.",
          first: ["Fajr", "Asr", "Isha"]
        }),
        seed("rakah-overview", "What is a rak'ah?", "Prayer is built from repeating units, called rak'ahs, with taught pillars.", 2, {
          line: "A [rak'ah] is one round of standing, bowing and two sujud.",
          alt: ["sajdah", "takbir"]
        }),
        seed("conditions-before-salah", "Getting ready", "Prayer starts with readiness before takbir, not only with what happens inside the salah itself.", 2, {
          line: "Before salah, be clean, cover up, and face the [Qiblah].",
          alt: ["door", "window"],
          why: "The Qiblah is the Ka'bah in Makkah."
        }),
        seed("pillars-and-obligations", "Start and end", "Some parts of prayer are central pillars and should be recognized early.", 2, {
          line: "Salah starts with [Allahu akbar] and ends with salam.",
          alt: ["Bismillah", "Ameen"],
          why: "Saying Allahu akbar to start is called the takbir."
        }),
        seed("follow-the-prophetic-model", "As he ﷺ prayed", "The foundation of salah is to pray as the Prophet ﷺ prayed, not by self-made style.", 3, {
          source: "hadith_bukhari_631",
          line: "The Prophet ﷺ said: pray as you have [seen] me pray.",
          alt: ["heard", "told"],
          why: "He ﷺ said it to young men who stayed with him to learn."
        }),
        seed("basic-review", "Review", "These basics should become second nature before you move into finer detail.", 4, { kind: "review", lessonType: "review", line: "Five prayers a day, from Allahu akbar to salam." })
      ]
    },
    {
      id: "prayer-times",
      title: "Prayer times",
      description: "Go deeper into the timing, sequence, and seriousness of guarding the prayers in their proper windows.",
      order: 3,
      clusterSize: 4,
      difficultyRange: [1, 4],
      sourceKeys: ["hadith_bukhari_631", "quran_33_21"],
      lessons: [
        seed("time-and-worship", "Prayer times", "Prayer is tied to time so the whole day is governed by worship and not drift.", 1, {
          source: "quran_4_103",
          line: "Allah gave each prayer its own [time].",
          alt: ["color", "song"],
          why: "The Quran says prayer is due at set times."
        }),
        seed("fajr-to-isha", "From Fajr to Isha", "The prayer day runs from Fajr at dawn to Isha at night.", 1, {
          line: "The prayer day begins with [Fajr] at dawn.",
          alt: ["Isha", "Asr"],
          why: "Isha is the last prayer, at night."
        }),
        seed("general-time-windows", "Midday and sunset", "Each prayer has its own time window in the day.", 2, {
          line: "[Dhuhr] is just after midday, and Maghrib is at sunset.",
          alt: ["Fajr", "Isha"]
        }),
        seed("guarding-the-first-part", "Praying on time", "Honoring prayer early trains seriousness and planning.", 2, {
          source: "hadith_bukhari_527",
          line: "[Salah] on time is a deed Allah loves most.",
          alt: ["Sleeping", "Shopping"],
          why: "The Prophet ﷺ said this when Ibn Mas'ud asked him."
        }),
        seed("late-prayer-scenarios", "Slept through it?", "Simple real cases help you think about time, delay, and responsibility.", 3, {
          source: "hadith_bukhari_597",
          line: "If you sleep through a prayer, pray it when you [wake].",
          alt: ["grow up", "feel like it"],
          why: "The Prophet ﷺ taught: pray it as soon as you remember."
        }),
        seed("times-review", "Review", "The prayer day should feel ordered, guarded, and connected to obedience.", 4, { kind: "review", lessonType: "mastery", line: "Fajr at dawn, Maghrib at sunset, Isha at night." })
      ]
    },
    {
      id: "prayer-adhan-and-iqamah",
      title: "Adhan and iqamah",
      description: "Study the public rhythm that calls Muslims into prayer and teaches readiness, dignity, and order.",
      order: 4,
      clusterSize: 4,
      difficultyRange: [1, 4],
      sourceKeys: ["hadith_bukhari_631", "video_salah_2"],
      lessons: [
        seed("what-the-adhan-is", "The adhan", "The adhan is not background noise; it is a public call into worship.", 1, {
          line: "The [adhan] is the call to prayer.",
          alt: ["khutbah", "du'a"]
        }),
        seed("responding-to-the-call", "Answer the adhan", "The believer should learn to answer the call with movement, intention, and respect.", 2, {
          source: "hadith_bukhari_611",
          line: "When you hear the adhan, repeat its [words] quietly.",
          alt: ["jokes", "songs"],
          why: "For hayya 'alas-salah, say: la hawla wa la quwwata illa billah."
        }),
        seed("what-the-iqamah-does", "The iqamah", "Iqamah tightens the prayer moment and signals that the salah is about to begin.", 2, {
          line: "The [iqamah] is the second call, just before salah starts.",
          alt: ["adhan", "khutbah"]
        }),
        seed("masjid-readiness", "Walk calmly", "The calls to prayer teach punctuality, order, and calm readiness before standing.", 3, {
          source: "hadith_bukhari_636",
          line: "Walk to salah [calmly]; don't run, even if late.",
          alt: ["loudly", "angrily"],
          why: "Pray what you catch, then finish what you missed."
        }),
        seed("adhan-review", "Review", "The adhan and iqamah bring dignity and order to prayer together.", 4, { kind: "review", lessonType: "review", line: "The adhan calls us; the iqamah says salah is starting." })
      ]
    },
    {
      id: "prayer-ruku-and-sujud",
      title: "Ruku and sujud",
      description: "Go deep into the most repeated physical pillars of prayer with posture, stillness, and correction.",
      order: 5,
      clusterSize: 5,
      difficultyRange: [2, 5],
      sourceKeys: ["hadith_abudawud_730", "hadith_nasai_1055", "hadith_abudawud_856", "hadith_tirmidhi_270", "hadith_tirmidhi_272", "video_salah_1", "video_salah_3"],
      lessons: [
        seed("what-ruku-teaches", "Bowing in ruku", "Ruku is not a dip of the body only; it teaches submission, stillness, and praise.", 2, {
          line: "In [ruku], we bow and say Subhana Rabbiyal Azim.",
          alt: ["sujud", "qiyam"],
          why: "It means: Glory be to my Lord, the Most Great."
        }),
        seed("shape-of-ruku", "The shape of ruku", "In ruku, the body settles into a bow with calmness and order.", 2, {
          source: "hadith_abudawud_730",
          line: "In ruku, keep your back [flat] and hands on your knees.",
          alt: ["round", "twisted"]
        }),
        seed("rising-from-ruku", "Rising from ruku", "The transition out of ruku matters and should not be blurred or rushed.", 3, {
          line: "After ruku, stand up [straight] before going down to sujud.",
          alt: ["halfway", "sideways"]
        }),
        seed("what-sujud-teaches", "Sujud", "Sujud is one of the clearest places where humility and closeness meet in prayer.", 3, {
          source: "hadith_tirmidhi_270",
          line: "In [sujud], our forehead touches the ground for Allah.",
          alt: ["ruku", "qiyam"],
          first: ["Ruku", "Rise from ruku", "Sujud"]
        }),
        seed("seven-points-of-sujud", "Seven points of sujud", "A correct sujud rests on seven body parts.", 3, {
          source: "hadith_tirmidhi_272",
          line: "Sujud rests on [seven] parts of the body.",
          alt: ["three", "ten"],
          why: "Forehead and nose, both hands, both knees and both feet."
        }),
        seed("sitting-between-sujud", "Sitting between sajdahs", "The sitting between sajdahs is part of the prayer's calm structure, not a throwaway pause.", 4, {
          line: "Between the two sujud, we [sit] for a calm moment.",
          alt: ["stand", "sleep"],
          first: ["Rise from ruku", "First sujud", "Sit between sajdahs"]
        }),
        seed("mistakes-in-ruku-and-sujud", "Don't rush", "Rushed movement, missing stillness, and poor posture often weaken these pillars.", 4, {
          source: "hadith_abudawud_856",
          line: "Don't rush: stay [still] in each ruku and sujud.",
          alt: ["loud", "busy"],
          why: "The Prophet ﷺ told a man who rushed to pray again."
        }),
        seed("ruku-sujud-review", "Review", "Now you can explain ruku and sujud and spot the common mistakes.", 5, { kind: "review", lessonType: "mastery", line: "Bow in ruku, stand, then two sujud with a sit between." })
      ]
    },
    {
      id: "prayer-tashahhud",
      title: "Tashahhud",
      description: "Learn the sitting, wording, and closing structure of prayer with care and composure.",
      order: 6,
      clusterSize: 4,
      difficultyRange: [2, 5],
      sourceKeys: ["hadith_nasai_1278", "hadith_abudawud_974", "hadith_abudawud_933", "video_salah_1"],
      lessons: [
        seed("why-the-sitting-matters", "The sitting", "The sitting in prayer carries taught words and should be learned carefully.", 2, {
          source: "hadith_nasai_1278",
          line: "In the sitting, we say words called the [tashahhud].",
          alt: ["adhan", "iqamah"]
        }),
        seed("wording-of-tashahhud", "The words", "The tashahhud has taught words that should be said with care.", 3, {
          source: "hadith_abudawud_974",
          line: "The tashahhud begins with: [At-tahiyyatu] lillah.",
          alt: ["Allahu akbar", "Subhanallah"],
          why: "At-tahiyyatu lillah means: all greetings are for Allah."
        }),
        seed("when-tashahhud-happens", "When we sit", "The tashahhud is said while sitting, at its set places in the prayer.", 3, {
          line: "We sit for tashahhud after two rak'ahs, and at the [end].",
          alt: ["start", "adhan"]
        }),
        seed("taslim-ends-the-prayer", "Ending with salam", "Prayer closes with an orderly taslim, not with a vague stopping point.", 4, {
          source: "hadith_abudawud_933",
          line: "Salah ends with [salam] to the right and then the left.",
          alt: ["Allahu akbar", "Ameen"],
          why: "Each time we say: As-salamu alaykum wa rahmatullah.",
          first: ["Sujud", "Tashahhud", "Taslim"]
        }),
        seed("tashahhud-review", "Review", "Wording, placement, posture, and ending come together in one closing flow.", 5, { kind: "review", lessonType: "mastery", line: "Sit for the tashahhud, then end with salam on each side." })
      ]
    },
    {
      id: "prayer-khushu",
      title: "Khushu",
      description: "Study how presence, calm, understanding, and preparation build khushu over time.",
      order: 7,
      clusterSize: 4,
      difficultyRange: [2, 5],
      sourceKeys: ["hadith_abudawud_856", "quran_33_21", "video_salah_2"],
      lessons: [
        seed("what-khushu-is", "What khushu is", "Khushu is built through presence, humility, and careful prayer rather than wishful feeling alone.", 2, {
          line: "[Khushu] means a calm heart that is focused on Allah.",
          alt: ["Wudu", "Adhan"]
        }),
        seed("prepare-for-khushu", "Eat first", "Khushu starts before the prayer through wudu, timing, and clearing distractions.", 3, {
          source: "hadith_bukhari_671",
          line: "If food is ready, eat first so you can [focus] in salah.",
          alt: ["rush", "nap"]
        }),
        seed("understand-what-you-say", "Know the meaning", "Presence grows stronger when you understand the words and positions.", 3, {
          line: "Knowing what the words mean helps your [heart] focus.",
          alt: ["feet", "phone"]
        }),
        seed("fight-distraction", "Come back to salah", "Khushu is protected by repeated effort against haste and wandering attention.", 4, {
          line: "If your mind wanders, gently bring it back to [salah].",
          alt: ["lunch", "games"]
        }),
        seed("khushu-review", "Review", "Presence in prayer is trained through preparation, meaning, and repeated careful effort.", 5, { kind: "review", lessonType: "review", line: "Get ready, know the meaning, and bring your mind back." })
      ]
    },
    {
      id: "prayer-invalidators-of-salah",
      title: "Invalidators of salah",
      description: "Build real judgment about what breaks prayer, what weakens it, and what needs correction instead of guesswork.",
      order: 8,
      clusterSize: 4,
      difficultyRange: [3, 5],
      sourceKeys: ["hadith_abudawud_856", "video_salah_3"],
      lessons: [
        seed("what-invalidates-salah", "What breaks salah", "Some actions break the prayer, while others only lower its quality.", 3, {
          line: "Talking on purpose [breaks] your salah.",
          alt: ["fixes", "starts"]
        }),
        seed("speech-and-excessive-movement", "Eating and drinking", "Breaking the prayer is different from being distracted or praying with poor form.", 3, {
          line: "Eating or drinking during salah [breaks] it.",
          alt: ["fixes", "helps"]
        }),
        seed("purity-and-prayer-validity", "Lost wudu?", "Losing wudu during prayer changes whether you can carry on.", 4, {
          line: "If wudu breaks during salah, [stop] and make it again.",
          alt: ["keep going", "speed up"]
        }),
        seed("scenario-judgment", "Laughing in salah", "Real learning means judging realistic cases instead of repeating slogans.", 4, {
          line: "Laughing out loud [breaks] salah, but a smile does not.",
          alt: ["fixes", "starts"]
        }),
        seed("invalidator-review", "Review", "Now you can judge more clearly what breaks prayer and what needs repair.", 5, { kind: "review", lessonType: "mastery", line: "Talking, eating, laughing out loud, or losing wudu breaks salah." })
      ]
    },
    {
      id: "prayer-congregational-prayer",
      title: "Congregational prayer",
      description: "Learn the order, etiquette, and shared rhythm of praying with others.",
      order: 9,
      clusterSize: 4,
      difficultyRange: [2, 5],
      sourceKeys: ["hadith_bukhari_631", "video_salah_2"],
      lessons: [
        seed("why-jamaah-matters", "Praying together", "Prayer with others trains discipline, unity, and following properly.", 2, {
          source: "hadith_bukhari_645",
          line: "Praying together is [27] times better than praying alone.",
          alt: ["2", "100"]
        }),
        seed("following-the-imam", "Follow the imam", "Follow the imam without rushing ahead or drifting behind.", 3, {
          line: "In jamaah, wait and move [after] the imam.",
          alt: ["before", "ahead of"]
        }),
        seed("joining-late", "Joining late", "Joining a prayer already underway requires calm thinking and the right sequence.", 4, {
          source: "hadith_bukhari_636",
          line: "Late? Join the imam, then [finish] what you missed.",
          alt: ["skip", "forget"]
        }),
        seed("masjid-etiquette", "Straight rows", "Shared prayer still depends on adab, calm movement, and awareness of others.", 4, {
          source: "hadith_bukhari_723",
          line: "In jamaah, stand in [straight] rows, shoulder to shoulder.",
          alt: ["curvy", "messy"],
          why: "The Prophet ﷺ said straight rows are part of good salah."
        }),
        seed("jamaah-review", "Review", "Following, joining late, etiquette, and prayer order all come together.", 5, { kind: "review", lessonType: "review", line: "Follow the imam, stand in straight rows, finish what you missed." })
      ]
    },
    {
      id: "prayer-missed-prayers",
      title: "Missed prayers",
      description: "Study how to think about missed prayer, late arrival, repair, and returning with seriousness instead of despair.",
      order: 10,
      clusterSize: 4,
      difficultyRange: [3, 5],
      sourceKeys: ["hadith_bukhari_631", "video_salah_2"],
      lessons: [
        seed("seriousness-of-missing-prayer", "A missed salah", "Missing a prayer is serious, but it is no reason to despair.", 3, {
          line: "Missing salah is [serious], but Allah's door stays open.",
          alt: ["fine", "funny"]
        }),
        seed("returning-after-a-miss", "Pray it soon", "After a missed prayer, return quickly to obedience and repair.", 3, {
          line: "If you miss a prayer, pray it as [soon] as you can.",
          alt: ["late", "rarely"]
        }),
        seed("joining-and-making-up", "In order", "Late prayer scenarios need sequence, not panic or random guessing.", 4, {
          source: "hadith_bukhari_596",
          line: "Make up missed prayers in [order], like the Prophet ﷺ did.",
          alt: ["a rush", "secret"],
          why: "At the Battle of the Trench, he prayed Asr, then Maghrib."
        }),
        seed("build-a-protection-plan", "Make a plan", "Plan your day around prayer instead of repairing the same misses again and again.", 4, {
          line: "Set your [alarm] so you wake up for Fajr.",
          alt: ["oven", "toy"]
        }),
        seed("missed-prayer-review", "Review", "Seriousness, repair, and practical planning all tie together.", 5, { kind: "review", lessonType: "mastery", line: "Take it seriously, pray it soon, and plan ahead." })
      ]
    },
    {
      id: "prayer-review-and-mastery",
      title: "Wudu and salah review",
      description: "A mixed review that connects purity, posture, order, correction, and presence.",
      order: 11,
      clusterSize: 5,
      premiumOnly: true,
      difficultyRange: [4, 5],
      sourceKeys: ["quran_5_6", "hadith_bukhari_631", "hadith_abudawud_856", "video_wudu_2", "video_salah_3"],
      lessons: [
        seed("mixed-review-1", "Wudu again", "Pull the prayer world together by moving across readiness, order, and common correction points.", 4, { kind: "review", lessonType: "review", line: "Wudu first: let's see if you remember every step.", reviewFrom: ["prayer-wudu"] }),
        seed("mixed-review-2", "Salah again", "Review should now require comparison and error correction, not only memory.", 4, { kind: "review", lessonType: "review", line: "Now the whole salah, from Allahu akbar to salam.", reviewFrom: ["prayer-salah-basics", "prayer-ruku-and-sujud", "prayer-tashahhud"] }),
        seed("scenario-block-1", "Late for ruku", "Judge realistic prayer and purity situations with sequence and confidence.", 4, {
          lessonType: "scenario",
          line: "Late, and the imam is bowing? Say Allahu akbar and [join].",
          alt: ["wait", "leave"]
        }),
        seed("scenario-block-2", "A wandering mind", "Harder cases ask you to tell apart what breaks prayer, what weakens it, and what repairs it.", 5, {
          lessonType: "scenario",
          line: "If your mind wanders in salah, [keep going] and refocus.",
          alt: ["start again", "stop"],
          why: "Only things like talking on purpose break salah."
        }),
        seed("mastery-block-1", "Big quiz 1", "Mastery means connecting wudu, salah, correction, and khushu into one lived practice.", 5, { kind: "review", lessonType: "mastery", line: "Clean with wudu, pray on time, and pray calmly.", reviewFrom: ["prayer-wudu", "prayer-times", "prayer-khushu"] }),
        seed("mastery-block-2", "Big quiz 2", "The last checkpoint brings the whole prayer world together.", 5, { kind: "review", lessonType: "mastery", line: "You know it all: wudu, salah, and a focused heart.", reviewFrom: ["prayer-wudu", "prayer-salah-basics", "prayer-khushu"] })
      ]
    }
  ];
}

SECTION_SEEDS.push(
  {
    id: "foundation-expansion",
    topicId: "foundation",
    title: "Foundation",
    description: "Build the beginner habits that shape speech, worship, and daily remembrance.",
    badge: "Starter World",
    focus: "Daily phrases, home adab, and the first rhythms of Muslim life.",
    mascot: "hijabi",
    accentColor: "#1CB66D",
    branches: [
      {
        id: "foundation-phrases-rhythm",
        title: "Words through the day",
        description: "Move beyond single phrases and learn when Muslims naturally remember Allah through the day.",
        order: 3,
        difficultyRange: [1, 3],
        sourceKeys: ["hadith_riyad_844", "hadith_bukhari_5376", "hadith_muslim_2992"],
        lessons: [
          seed("morning-remembrance", "Waking up", "The day opens better when the tongue remembers Allah early.", 1, {
            source: "hadith_bukhari_6312",
            line: "When you wake up, say [Alhamdulillah] to thank Allah.",
            alt: ["Astaghfirullah", "Good night"],
            why: "The Prophet ﷺ praised Allah when he woke up."
          }),
          seed("thanks-language", "Be thankful", "Muslim speech regularly returns blessings back to Allah.", 1, {
            source: "quran_14_7",
            line: "Allah says: if you are thankful, I will give you [more].",
            alt: ["less", "nothing"]
          }),
          seed("future-speech", "Saying InshaAllah", "A Muslim speaks about future plans with humility before Allah.", 2, {
            source: "quran_18_23_24",
            practice: "Use InshaAllah when speaking about future plans, with humility not laziness.",
            line: "Say [InshaAllah] when you plan to do something later.",
            alt: ["Alhamdulillah", "Bismillah"],
            why: "InshaAllah means if Allah wills."
          }),
          seed("seeking-forgiveness", "Saying Astaghfirullah", "Seeking forgiveness keeps the heart soft after mistakes and slips.", 2, {
            source: "hadith_bukhari_6307",
            line: "After a mistake, say [Astaghfirullah] and try again.",
            alt: ["InshaAllah", "Alhamdulillah"],
            why: "Astaghfirullah means I ask Allah to forgive me."
          }),
          seed("phrase-review", "Review", "Daily phrases work best when they are used in the right moment with the right heart.", 3, { kind: "review", lessonType: "review", line: "InshaAllah, Astaghfirullah, Alhamdulillah: when do we say them?" })
        ]
      },
      {
        id: "foundation-home-adab",
        title: "Home and table adab",
        description: "Learn the first home habits that make Muslim life feel orderly and gentle.",
        order: 4,
        difficultyRange: [1, 3],
        sourceKeys: ["hadith_bukhari_5376", "quran_4_86"],
        lessons: [
          seed("entering-home", "Coming home", "The home should be entered with calm words and awareness of Allah.", 1, {
            source: "quran_24_61",
            line: "When you come home, say [salam] to your family.",
            alt: ["goodbye", "nothing"],
            why: "The Quran tells us to greet each other when we enter homes."
          }),
          seed("table-beginning", "Before we eat", "Food is a daily worship moment when it begins with Allah's name.", 1, {
            source: "hadith_bukhari_5376",
            line: "Before you eat, say [Bismillah].",
            alt: ["Alhamdulillah", "InshaAllah"],
            why: "Bismillah means in the name of Allah."
          }),
          seed("right-hand", "The right hand", "The Sunnah joins remembrance with disciplined physical manners.", 2, {
            source: "hadith_bukhari_5376",
            line: "Eat with your right hand, as the Prophet ﷺ taught.",
            ask: ["Which hand do we eat with?", "The right hand", "The left hand", "Any hand"],
            myth: "Eat with your left hand, as the Prophet ﷺ taught."
          }),
          seed("after-food", "After we eat", "A Muslim closes the meal by recognizing Allah's provision.", 2, {
            source: "hadith_muslim_2734",
            line: "When you finish eating, say [Alhamdulillah].",
            alt: ["Bismillah", "Astaghfirullah"],
            why: "Allah is pleased when we praise Him after we eat."
          }),
          seed("home-review", "Review", "The home becomes a training ground where phrases and manners reinforce one another.", 3, { kind: "review", lessonType: "review", line: "Salam at the door, Bismillah first, Alhamdulillah after." })
        ]
      },
      {
        id: "foundation-first-worship-rhythm",
        title: "First worship rhythm",
        description: "Lay the beginner groundwork for worship habits that will matter more later.",
        order: 5,
        difficultyRange: [2, 4],
        sourceKeys: ["quran_5_6", "hadith_muslim_224", "hadith_bukhari_631"],
        lessons: [
          seed("clean-before-prayer", "Clean before prayer", "A Muslim learns early that prayer is approached with purity and seriousness.", 2, {
            source: "quran_5_6",
            line: "Before we pray, we get clean with [wudu].",
            alt: ["perfume", "a nap"],
            why: "Allah does not accept salah without being clean."
          }),
          seed("hear-the-call", "The call to prayer", "Prayer creates structure in the day by returning the heart again and again to Allah.", 2, {
            source: "hadith_bukhari_628",
            line: "The [adhan] calls Muslims to pray five times a day.",
            alt: ["bell", "alarm"]
          }),
          seed("prepare-the-space", "A clean place", "Before worship, notice your clothing, your place, and your readiness.", 3, {
            source: "quran_7_31",
            line: "Pray in a [clean] spot, in tidy clothes.",
            alt: ["messy", "muddy"]
          }),
          seed("follow-the-model", "Pray like the Prophet ﷺ", "Islamic worship becomes strong by following what was taught, not by personal improvisation.", 3, {
            source: "hadith_bukhari_631",
            line: "We learn to pray from the way the Prophet ﷺ prayed.",
            ask: ["Whose way of praying do we follow?", "The Prophet's ﷺ way", "Our own made-up way", "Whatever looks cool"],
            myth: "We learn to pray from whatever way we like."
          }),
          seed("starter-worship-review", "Review", "Foundational worship habits are small in form but large in the direction they set.", 4, { kind: "review", lessonType: "review", line: "Get clean, hear the adhan, and pray like the Prophet ﷺ." })
        ]
      }
    ]
  },
  {
    id: "prayer-expansion",
    topicId: "prayer",
    title: "Prayer",
    description: "A deep prayer directory with a full Wudu branch, detailed salah branches, repair work, and mastery checkpoints.",
    badge: "Prayer World",
    focus: "Wudu, salah basics, prayer times, posture, congregation, missed prayer, and mastery review.",
    mascot: "muslim_man",
    accentColor: "#3A9FE8",
    replaceExisting: true,
    branches: buildPrayerCurriculumBranches()
  },
  {
    id: "aqidah-world",
    topicId: "aqidah",
    title: "Aqidah and Iman",
    description: "A growing world for tawhid, the pillars of iman, Allah's names, qadar, and the Last Day.",
    badge: "Belief World",
    focus: "Tawhid, pillars of iman, names and attributes, qadar, and living belief.",
    mascot: "hijabi",
    accentColor: "#6C3BC6",
    branches: [
      {
        id: "aqidah-tawhid",
        title: "Tawhid",
        description: "Learn the core message that runs through revelation: worship Allah alone.",
        order: 1,
        difficultyRange: [1, 4],
        sourceKeys: ["quran_21_25", "quran_112"],
        lessons: [
          seed("allah-alone", "Only Allah", "The center of Islam is worshiping Allah alone without partners.", 1, {
            source: "quran_21_25",
            line: "Muslims worship [Allah] alone, with no partners.",
            alt: ["idols", "the sun"],
            why: "Believing this is called tawhid."
          }),
          seed("ikhlas-and-purity", "Surah Al-Ikhlas", "Surah Al-Ikhlas trains the heart to keep its belief about Allah pure and unmatched.", 2, {
            source: "quran_112",
            line: "Surah [Al-Ikhlas] says Allah is One, with no equal.",
            alt: ["Al-Fil", "Al-Kawthar"],
            why: "It says He has no children and was not born."
          }),
          seed("calling-on-allah", "Calling on Allah", "Du'a and hope should be directed to Allah with dependence and trust.", 3, {
            source: "quran_40_60",
            line: "When we need help, we ask [Allah] in du'a.",
            alt: ["a statue", "the stars"],
            why: "Allah says: call on Me, and I will answer you."
          }),
          seed("tawhid-in-daily-life", "Trusting Allah", "Tawhid is not abstract; it changes fear, hope, speech, and obedience.", 4, {
            line: "Tawhid in daily life means we [trust] Allah in everything.",
            alt: ["forget", "ignore"],
            why: "Trusting Allah is called tawakkul."
          }),
          seed("tawhid-review", "Review", "Strong tawhid means guarding speech, worship, and reliance for Allah alone.", 4, { kind: "review", lessonType: "mastery", line: "Worship Allah alone, ask Him alone, and trust Him." })
        ]
      },
      {
        id: "aqidah-pillars-of-iman",
        title: "Pillars of iman",
        description: "Move through belief in Allah, angels, books, messengers, the Last Day, and qadar.",
        order: 2,
        difficultyRange: [1, 4],
        sourceKeys: ["quran_2_285", "quran_4_136"],
        lessons: [
          seed("what-iman-covers", "Six pillars", "The pillars of iman name what a believer must hold with certainty.", 1, {
            source: "hadith_muslim_8",
            line: "There are [six] pillars of iman.",
            alt: ["three", "ten"],
            why: "Allah, angels, books, messengers, the Last Day, and qadar."
          }),
          seed("angels-books-messengers", "Angels, books, and messengers", "These pillars teach that revelation reaches people through a real chain from Allah.", 2, {
            source: "quran_2_285",
            line: "We believe in Allah's [angels], books, and messengers.",
            alt: ["idols", "magic"]
          }),
          seed("the-last-day", "The Last Day", "Belief in the Last Day reshapes urgency, repentance, and moral seriousness.", 3, {
            line: "On the [Last Day], everyone will stand before Allah.",
            alt: ["first day", "weekend"]
          }),
          seed("qadar", "Qadar", "Belief in qadar steadies the heart without making it passive or careless.", 4, {
            line: "[Qadar] means nothing happens unless Allah wills it.",
            alt: ["Wudu", "Adhan"]
          }),
          seed("iman-review", "Review", "The pillars of iman form one joined worldview, not separate facts to memorize and forget.", 4, { kind: "review", lessonType: "review", line: "Iman: Allah, angels, books, messengers, the Last Day, and qadar." })
        ]
      },
      {
        id: "aqidah-names-and-attributes",
        title: "Names and attributes",
        description: "Approach Allah through the names and attributes He taught about Himself.",
        order: 3,
        difficultyRange: [2, 5],
        sourceKeys: ["quran_59_22_24", "quran_112"],
        lessons: [
          seed("why-names-matter", "Allah's names", "Knowing Allah through His names deepens worship, fear, hope, and love.", 2, {
            source: "quran_7_180",
            line: "Allah has beautiful [names], like Ar-Rahman.",
            alt: ["houses", "colors"],
            why: "Ar-Rahman means the Most Merciful."
          }),
          seed("mercy-and-knowledge", "Al-Alim", "Allah's mercy and knowledge are not poetic extras; they reshape how the believer lives.", 3, {
            line: "[Al-Alim] means Allah knows everything, even our secrets.",
            alt: ["Al-Malik", "Ar-Rahman"]
          }),
          seed("majesty-and-authority", "Al-Malik", "Allah's sovereignty should create reverence and obedience, not only inspiration.", 4, {
            line: "[Al-Malik] means Allah is the King of everything.",
            alt: ["Al-Alim", "Ar-Rahman"]
          }),
          seed("using-the-names", "Al-Ghafur", "The names of Allah should feed prayer, reliance, and repentance.", 4, {
            line: "[Al-Ghafur] means Allah is the One who forgives.",
            alt: ["Al-Malik", "Al-Alim"],
            why: "Allah says: call on Him by His beautiful names."
          }),
          seed("names-review", "Review", "Belief about Allah should become more precise and more worshipful over time.", 5, { kind: "review", lessonType: "mastery", line: "Ar-Rahman, Al-Alim, Al-Malik, Al-Ghafur: names of Allah." })
        ]
      },
      {
        id: "aqidah-lived-iman",
        title: "Lived iman",
        description: "Bring belief out of theory and into repentance, patience, and moral steadiness.",
        order: 4,
        difficultyRange: [2, 5],
        sourceKeys: ["quran_57_22_23", "quran_33_21", "quran_4_136"],
        lessons: [
          seed("belief-and-obedience", "Iman in action", "True iman should make obedience more meaningful, not more distant.", 2, {
            line: "Belief in Allah shows in how we [act].",
            alt: ["shop", "sleep"],
            why: "The Quran often joins belief with doing good deeds."
          }),
          seed("belief-under-pressure", "Being patient", "Real belief shows itself when fear, loss, or temptation press on the heart.", 3, {
            source: "quran_2_153",
            line: "When things get hard, a believer stays [patient].",
            alt: ["rude", "angry"],
            why: "Allah is with those who are patient."
          }),
          seed("repentance-and-hope", "Never lose hope", "Iman keeps the sinner from despair because Allah remains the door back.", 4, {
            source: "quran_39_53",
            line: "Never give up on Allah's [mercy]; He forgives.",
            alt: ["games", "food"],
            why: "Allah says: do not lose hope in Allah's mercy."
          }),
          seed("certainty-and-humility", "Staying humble", "Strong belief makes a person more grounded and humble, not proud and dismissive.", 4, {
            line: "Strong iman makes a person [humble], not proud.",
            alt: ["rude", "bossy"],
            why: "Whoever is humble for Allah, Allah raises him up."
          }),
          seed("lived-iman-review", "Review", "Iman becomes deep when it explains how the believer worships, repents, fears, hopes, and stays steady.", 5, { kind: "review", lessonType: "mastery", line: "Iman shows in our deeds, patience, hope, and humility." })
        ]
      }
    ]
  }
);

function defaultNodeKind(topicId: TopicId, index: number, total: number): LearningNode["kind"] {
  if (index === total - 1) return "review";
  if (topicId === "sahabah" || topicId === "prophets" || topicId === "women_of_the_book") return "story";
  return "skill";
}

function defaultLessonType(topicId: TopicId, kind: LearningNode["kind"]): NonNullable<Lesson["lessonType"]> {
  if (kind === "review") return "review";
  if (topicId === "quran_tafseer") return "surah";
  if (kind === "story") return "story";
  return "skill";
}

function inferDifficulty(index: number, total: number) {
  const progress = index / Math.max(1, total - 1);
  if (progress < 0.2) return 1 as DifficultyTier;
  if (progress < 0.45) return 2 as DifficultyTier;
  if (progress < 0.7) return 3 as DifficultyTier;
  if (progress < 0.9) return 4 as DifficultyTier;
  return 5 as DifficultyTier;
}

// `earlier` holds the lessons taught in the units before this one in its section, for a mixed review.
function createGeneratedBranch(section: LearningSection, branch: BranchSeed, earlier: Map<string, TaughtLesson[]>) {
  const branchSources = uniqueById(branch.sourceKeys.map((key) => SOURCES[key]).filter(Boolean));
  const nodes: LearningNode[] = [];
  const lessonsById: Record<string, Lesson> = {};
  const clusterSize = Math.max(3, branch.clusterSize ?? 5);
  const taught: TaughtLesson[] = [];
  // In a topic taught as one course, a unit after the first starts a step harder.
  const laterUnit = CHAINED_TOPICS.has(section.topicId) && earlier.size > 0;
  // What the lesson just before asked, so a review right after it asks something else when it can.
  let recent = new Set<string>();

  branch.lessons.forEach((entry, index) => {
    const nodeId = `${branch.id}-${entry.slug}`;
    const lessonId = `lesson-${nodeId}`;
    const kind = entry.kind ?? defaultNodeKind(section.topicId, index, branch.lessons.length);
    // The source that says the line comes first, so the lesson's link opens it; the unit's own sources follow.
    // A unit's hadith are about one of its lessons, so a lesson with its own source does not borrow them:
    // showing them there would cite a hadith that does not say what the lesson teaches.
    const learnSource = entry.source ? SOURCES[entry.source] : undefined;
    const unitSources = (entry.sourceKeys ?? branch.sourceKeys)
      .map((key) => SOURCES[key])
      .filter((source) => source && !(learnSource && !entry.sourceKeys && source.category === "hadith"));
    const sources = uniqueById([learnSource, ...unitSources].filter((source): source is LessonSource => Boolean(source)));
    const xpReward = 8 + entry.difficulty * 2 + (kind === "review" ? 4 : 0);
    const clusterIndex = Math.floor(index / clusterSize) + 1;
    const clusterId = `${branch.id}_cluster_${clusterIndex}`;
    const masteryTestEligible = kind === "review" || (index + 1) % clusterSize === 0 || index === branch.lessons.length - 1;
    const pool = entry.reviewFrom ? entry.reviewFrom.flatMap((id) => (id === branch.id ? taught : earlier.get(id) ?? [])) : taught;
    const withSource = (challenge: Challenge): Challenge => ({
      ...challenge,
      sourceNodeId: challenge.sourceNodeId ?? nodeId,
      sourceLessonId: challenge.sourceLessonId ?? lessonId,
      resourceLabel: challenge.resourceLabel ?? (sources[0] ? "Open source" : undefined),
      resourceUrl: challenge.resourceUrl ?? sources[0]?.url
    });
    const own = teachingQuestions(lessonId, entry).map(withSource);
    const step = lessonStep(index, branch.lessons.length, laterUnit);
    const challenges = own.length
      ? harderQuestions(lessonId, own, taught, step, recent)
      : lookBackQuestions(lessonId, entry, pool, recent, branch.companion, step).map(withSource);
    if (own.length) {
      // Later reviews ask the lesson's own questions, the true/false one too, never the ones it asked from earlier.
      taught.push({ lessonId, nodeId, questions: own });
    }
    recent = new Set(challenges.map((challenge) => challenge.prompt));

    nodes.push({
      id: nodeId,
      skillId: `skill_${section.topicId}_${branch.id}_${index + 1}`,
      title: entry.title,
      topicId: section.topicId,
      branchId: branch.id,
      kind,
      lessonIds: [lessonId],
      requiredNodeIds: index === 0 ? [] : [nodes[index - 1].id],
      xpReward,
      starsReward: kind === "review" ? 5 : 3,
      order: index + 1,
      clusterId,
      difficulty: entry.difficulty,
      surahName: entry.surahName ?? branch.surahName,
      ayahRange: entry.ayahRange ?? branch.ayahRange,
      sourceReferences: sources,
      masteryState: kind === "review" ? ("mastery" as const) : ("new" as const),
      masteryTestEligible
    });

    lessonsById[lessonId] = {
      id: lessonId,
      nodeId,
      branchId: branch.id,
      surahName: entry.surahName ?? branch.surahName,
      ayahRange: entry.ayahRange ?? branch.ayahRange,
      title: entry.title,
      intro: entry.practice ? `${entry.focus} ${entry.practice}` : entry.focus,
      ...(entry.line ? { learnLine: plainLine(entry.line) } : {}),
      ...(learnSource ? { learnSource } : {}),
      explanationContent: entry.focus,
      lessonType: entry.lessonType ?? defaultLessonType(section.topicId, kind),
      difficulty: entry.difficulty,
      xpReward,
      sources,
      sourceReferences: sources,
      unlockRules: index === 0 ? [] : [`Complete ${nodes[index - 1].title}`],
      masteryState: kind === "review" ? ("mastery" as const) : ("learning" as const),
      masteryTestEligible,
      challenges
    };
  });
  earlier.set(branch.id, taught);

  return {
    branch: {
      id: branch.id,
      topicId: section.topicId,
      title: branch.title,
      description: branch.description,
      order: branch.order,
      clusterSize,
      premiumOnly: branch.premiumOnly,
      ...(branch.gated ? { gated: true } : {}),
      surahName: branch.surahName,
      ayahRange: branch.ayahRange,
      difficultyRange: { start: branch.difficultyRange[0], end: branch.difficultyRange[1] },
      sourceReferences: branchSources
    } satisfies LearningBranch,
    nodes,
    lessonsById
  };
}

function enrichExistingSection(section: LearningSection, baseLessons: Record<string, Lesson>) {
  const branches = section.branches.map((branch, index) => {
    const branchNodes = section.nodes.filter((node) => node.branchId === branch.id);
    const sourceReferences = uniqueById(branchNodes.flatMap((node) => node.lessonIds.flatMap((lessonId) => baseLessons[lessonId]?.sources ?? [])));
    return {
      ...branch,
      topicId: section.topicId,
      order: branch.order ?? index + 1,
      difficultyRange: branch.difficultyRange ?? { start: 1, end: inferDifficulty(Math.max(0, branchNodes.length - 1), Math.max(1, branchNodes.length)) },
      sourceReferences: branch.sourceReferences ?? sourceReferences
    };
  });

  const nodes = section.nodes.map((node) => {
    const branchNodes = section.nodes.filter((item) => item.branchId === node.branchId);
    const order = branchNodes.findIndex((item) => item.id === node.id) + 1;
    const sourceReferences = uniqueById(node.lessonIds.flatMap((lessonId) => baseLessons[lessonId]?.sources ?? []));

    return {
      ...node,
      order,
      difficulty: node.difficulty ?? inferDifficulty(order - 1, branchNodes.length),
      sourceReferences,
      masteryState: node.kind === "review" ? ("mastery" as const) : ("new" as const)
    };
  });

  return {
    ...section,
    branches,
    nodes,
    starsTarget: nodes.reduce((total, node) => total + node.starsReward, 0)
  };
}

function buildSectionFromSeed(seedSection: SectionSeed) {
  const section: LearningSection = {
    id: seedSection.id,
    topicId: seedSection.topicId,
    title: seedSection.title,
    description: seedSection.description,
    badge: seedSection.badge,
    focus: seedSection.focus,
    mascot: seedSection.mascot,
    accentColor: seedSection.accentColor,
    starsTarget: 0,
    pathStyle: seedSection.pathStyle ?? "standard",
    branches: [],
    nodes: []
  };
  const lessonsById: Record<string, Lesson> = {};
  const earlier = new Map<string, TaughtLesson[]>();

  seedSection.branches.sort((left, right) => left.order - right.order).forEach((branchSeed) => {
    const built = createGeneratedBranch(section, branchSeed, earlier);
    section.branches.push(built.branch);
    section.nodes.push(...built.nodes);
    Object.assign(lessonsById, built.lessonsById);
  });

  section.starsTarget = section.nodes.reduce((total, node) => total + node.starsReward, 0);
  return { section, lessonsById };
}

function mergeSectionWithSeed(existing: LearningSection, seedSection: SectionSeed, baseLessons: Record<string, Lesson>) {
  const enriched = enrichExistingSection(existing, baseLessons);
  const generated = buildSectionFromSeed(seedSection);
  const existingBranchIds = new Set(enriched.branches.map((branch) => branch.id));
  const mergedNodes = [...enriched.nodes, ...generated.section.nodes];

  return {
    section: {
      ...enriched,
      description: seedSection.description,
      focus: seedSection.focus,
      pathStyle: seedSection.pathStyle ?? enriched.pathStyle ?? "standard",
      branches: [...enriched.branches, ...generated.section.branches.filter((branch) => !existingBranchIds.has(branch.id))].sort((left, right) => (left.order ?? 999) - (right.order ?? 999)),
      nodes: mergedNodes,
      starsTarget: mergedNodes.reduce((total, node) => total + node.starsReward, 0)
    },
    lessonsById: generated.lessonsById
  };
}

export function buildExpandedContent(baseCourse: LearningCourse, baseLessons: Record<string, Lesson>): ExpandedContent {
  const seedByTopic = new Map(SECTION_SEEDS.map((entry) => [entry.topicId, entry]));
  const lessonsById: Record<string, Lesson> = { ...baseLessons };
  const sections = baseCourse.sections.map((section) => {
    const seedSection = seedByTopic.get(section.topicId);
    if (!seedSection) return enrichExistingSection(section, baseLessons);
    if (seedSection.replaceExisting || section.topicId === "quran_tafseer") {
      const generated = buildSectionFromSeed(seedSection);
      Object.assign(lessonsById, generated.lessonsById);
      return generated.section;
    }
    const merged = mergeSectionWithSeed(section, seedSection, baseLessons);
    Object.assign(lessonsById, merged.lessonsById);
    return merged.section;
  });

  const existingTopics = new Set(sections.map((section) => section.topicId));
  SECTION_SEEDS.filter((seedSection) => !existingTopics.has(seedSection.topicId)).forEach((seedSection) => {
    const generated = buildSectionFromSeed(seedSection);
    sections.push(generated.section);
    Object.assign(lessonsById, generated.lessonsById);
  });

  sections.sort((left, right) => TOPIC_ORDER.indexOf(left.topicId) - TOPIC_ORDER.indexOf(right.topicId));

  return {
    course: {
      ...baseCourse,
      subtitle: "A growing Islamic learning world with deep prayer tracks, surah-by-surah Quran study, real-life adab, and long-term paths that can keep expanding.",
      sections
    },
    lessonsById
  };
}

// Topics taught as one course, where each unit builds on the one before. Quran, Sahabah and Hadith
// units are about one surah, person or narration each, so any of them can be started first.
export const CHAINED_TOPICS: ReadonlySet<TopicId> = new Set<TopicId>(["foundation", "prayer", "aqidah", "manners", "fasting", "zakat", "hajj", "marriage", "prophets", "women_of_the_book"]);

// Runs last, once imported notes are merged in, so their units are chained too.
export function chainCourse(content: ExpandedContent): ExpandedContent {
  const lessonsById = { ...content.lessonsById };
  return {
    course: { ...content.course, sections: content.course.sections.map((section) => chainBranches(section, lessonsById)) },
    lessonsById
  };
}

// Puts the nodes in path order and, in a chained topic, opens each unit's first node only after the
// unit before it is finished, so the order on the path is the order things unlock.
function chainBranches(section: LearningSection, lessonsById: Record<string, Lesson>): LearningSection {
  const branchOrder = new Map(section.branches.map((branch, index) => [branch.id, index]));
  const nodes = [...section.nodes].sort((left, right) => (branchOrder.get(left.branchId) ?? 999) - (branchOrder.get(right.branchId) ?? 999));

  if (!CHAINED_TOPICS.has(section.topicId)) {
    return { ...section, nodes };
  }

  const previousByFirst = new Map<string, LearningNode>();
  let previousLast: LearningNode | undefined;

  for (const branch of section.branches) {
    const branchNodes = nodes.filter((node) => node.branchId === branch.id);

    if (!branchNodes.length) {
      continue;
    }

    if (previousLast && branchNodes[0].requiredNodeIds.length === 0) {
      previousByFirst.set(branchNodes[0].id, previousLast);
    }

    previousLast = branchNodes[branchNodes.length - 1];
  }

  return {
    ...section,
    nodes: nodes.map((node) => {
      const previous = previousByFirst.get(node.id);

      if (!previous) {
        return node;
      }

      for (const lessonId of node.lessonIds) {
        if (lessonsById[lessonId]) {
          lessonsById[lessonId] = { ...lessonsById[lessonId], unlockRules: [`Complete ${previous.title}`] };
        }
      }

      return { ...node, requiredNodeIds: [previous.id] };
    })
  };
}

SECTION_SEEDS.push(
  {
    id: "prophets-expansion",
    topicId: "prophets",
    title: "Lives of the Prophets",
    description: "A longer prophetic world that moves in order through major messengers and their repeated themes.",
    badge: "Prophet World",
    focus: "Tawhid, patience, repentance, trust, sacrifice, justice, mercy, and the final example.",
    mascot: "muslim_man",
    accentColor: "#D97B2D",
    branches: [
      // Each prophet here has a lesson of his own, or none: these lessons teach something new, and a lesson about a
      // prophet with a lesson of his own is taught in his unit, right after it (src/data/unitPlans.ts).
      { id: "prophets-early-messengers", title: "Early messengers", description: "Travel through the earliest lessons of humanity, repentance, warning, and trust.", order: 4, difficultyRange: [1, 3], sourceKeys: ["quran_21_25", "quran_33_21"], lessons: [
        seed("adam-and-repentance", "Adam learns the names", "Allah honored Adam with knowledge, teaching him the names of things.", 1, {
          line: "Allah taught Adam the [names] of all things.",
          alt: ["songs", "games"],
          why: "Even the angels did not know these names.",
          source: "quran_2_31"
        }),
        seed("nuh-and-patience", "Nuh's Ark", "Allah told Nuh to carry the believers and the animals on the Ark.", 1, {
          line: "Allah told Nuh to take the animals in [pairs].",
          alt: ["hundreds", "boxes"],
          why: "Pairs means two of each kind.",
          source: "quran_11_40"
        }),
        seed("hud-and-salih", "Salih's camel", "Salih's people asked for a sign, and Allah sent them a she-camel.", 2, {
          line: "Allah sent Salih's people a special [camel] as a sign.",
          alt: ["horse", "bird"],
          source: "quran_7_73"
        }),
        seed("lut-and-purity", "Lut was brave", "Lut told his people to stop doing wrong, even when they would not listen.", 2, {
          line: "Lut bravely told his people to stop doing [wrong].",
          alt: ["chores", "homework"]
        }),
        seed("early-prophets-review", "Review", "Salih and Lut called their people to Allah.", 3, { kind: "review", lessonType: "review", line: "Let's remember Salih and Lut!" })
      ]},
      { id: "prophets-family-and-sacrifice", title: "Ibrahim's family", description: "Move through Ibrahim's family, trust, and the tests that reshape generations.", order: 5, difficultyRange: [2, 4], sourceKeys: ["quran_3_97", "quran_22_27", "quran_12"], lessons: [
        seed("ibrahim-and-tawhid", "Ibrahim and the idols", "Ibrahim broke his people's idols to show they could not help anyone.", 2, {
          line: "Ibrahim broke the [idols] and worshipped Allah alone.",
          alt: ["windows", "pots"],
          why: "He wanted his people to see the idols could not help them.",
          source: "quran_21_58"
        }),
        seed("ismail-and-submission", "Building the Ka'bah", "Ibrahim and his son Ismail raised the walls of the Ka'bah together.", 2, {
          line: "Ismail helped his father Ibrahim build the [Ka'bah].",
          alt: ["ark", "tower"],
          why: "They prayed: Our Lord, accept this from us.",
          source: "quran_2_127"
        }),
        seed("yaqub-and-sabr", "Ya'qub's patience", "Ya'qub lost his son Yusuf and stayed patient, hoping in Allah.", 3, {
          line: "When Yusuf was lost, Ya'qub chose beautiful [patience].",
          alt: ["anger", "revenge"],
          why: "He told his sons: never lose hope in Allah's mercy.",
          source: "quran_12_18"
        }),
        seed("yusuf-and-purity", "Yusuf and dreams", "Allah gave Yusuf the knowledge of what dreams mean.", 3, {
          line: "Allah taught Yusuf to explain [dreams].",
          alt: ["stars", "poems"],
          why: "He explained the king's dream of seven fat cows."
        }),
        seed("family-review", "Review", "Ibrahim's sons Ismail and Ishaq, and his grandson Ya'qub.", 4, { kind: "review", lessonType: "review", line: "Let's remember Ismail, Ishaq and Ya'qub!" })
      ]},
      { id: "prophets-power-and-deliverance", title: "Musa, Dawud and Sulayman", description: "Learn from Musa, Harun, Dawud, Sulayman, and the test of leadership under Allah.", order: 6, difficultyRange: [2, 5], sourceKeys: ["quran_28_7", "quran_57_22_23", "quran_33_21"], lessons: [
        seed("musa-and-fear", "Allah was with Musa", "Allah sent Musa and Harun to Pharaoh and told them not to fear.", 2, {
          line: "Allah told Musa and Harun: [fear] not, I am with you.",
          alt: ["speak", "walk"],
          why: "They were sent to Pharaoh, a cruel king.",
          source: "quran_20_46"
        }),
        seed("harun-and-support", "Harun helped Musa", "Musa asked Allah to make his brother Harun his helper.", 3, {
          line: "Musa asked Allah to make his brother [Harun] his helper.",
          alt: ["Yusuf", "Nuh"],
          why: "Allah answered, and Harun became a prophet too.",
          source: "quran_20_29_32"
        }),
        seed("dawud-and-justice", "Dawud the fair king", "Allah made Dawud a king and told him to judge between people with truth.", 4, {
          line: "Dawud was a prophet and a [king] who judged fairly.",
          alt: ["farmer", "sailor"],
          source: "quran_38_26"
        }),
        seed("sulayman-and-gratitude", "Sulayman and the ant", "Sulayman was taught the speech of birds, heard an ant, and thanked Allah.", 4, {
          line: "Sulayman understood the [birds] and the ants, and thanked Allah.",
          alt: ["stars", "stones"],
          why: "He smiled at an ant and thanked Allah.",
          source: "quran_27_16_19"
        }),
        seed("power-review", "Review", "These prophets teach deliverance, justice, support, and grateful leadership.", 5, { kind: "review", lessonType: "mastery", line: "Let's remember Musa, Harun, Dawud and Sulayman!" })
      ]}
    ]
  },
  {
    id: "women-expansion",
    topicId: "women_of_the_book",
    title: "Great Women",
    description: "A deeper ordered path through women of the Quran and the Mothers of the Believers.",
    badge: "Women World",
    focus: "Trust, purity, courage, service, knowledge, and preserving revelation.",
    mascot: "hijabi",
    accentColor: "#D96C8E",
    branches: [
      // Each woman here has a lesson of her own: these lessons teach something new about her, and are taught in her
      // unit, right after it (src/data/unitPlans.ts), so these three units are not on the path themselves.
      { id: "women-quran-depth", title: "More women in the Quran", description: "Go deeper through women in the Quran and the virtues their stories teach.", order: 3, difficultyRange: [1, 4], sourceKeys: ["quran_28_7", "quran_66_11", "quran_19"], lessons: [
        seed("hawwa-and-return", "Asking forgiveness", "Adam and Hawwa made a mistake and asked Allah to forgive them.", 1, {
          line: "Adam and [Hawwa] asked Allah to forgive them together.",
          alt: ["Maryam", "Asiyah"],
          why: "They said: Our Lord, we have wronged ourselves.",
          source: "quran_7_23"
        }),
        seed("mother-of-musa-and-trust", "Musa comes home", "Allah kept His promise and brought baby Musa back to his mother.", 2, {
          line: "Allah brought baby Musa back to his [mother].",
          alt: ["teacher", "uncle"],
          why: "His sister helped bring him back home.",
          source: "quran_28_13"
        }),
        seed("asiyah-and-steadfastness", "Asiyah's du'a", "Asiyah asked Allah for a house near Him in Paradise.", 3, {
          line: "Asiyah asked Allah for a [house] near Him in Paradise.",
          alt: ["crown", "horse"],
          source: "quran_66_11"
        }),
        seed("maryam-and-purity", "Surah Maryam", "A whole surah of the Quran carries Maryam's name.", 3, {
          line: "A whole surah of the Quran is named after [Maryam].",
          alt: ["Asiyah", "Khadijah"],
          why: "She is the only woman named in the Quran.",
          source: "quran_19"
        }),
        seed("quran-women-review", "Review", "These women teach repentance, trust, steadfastness, and purity under pressure.", 4, { kind: "review", lessonType: "review", line: "Let's remember Hawwa, Musa's mother, Asiyah and Maryam!" })
      ]},
      { id: "women-mothers-depth", title: "More Mothers of the Believers", description: "Move in order through the Prophet's ﷺ wives and the special gifts they gave the Ummah.", order: 4, difficultyRange: [2, 5], sourceKeys: ["quran_33_6"], lessons: [
        seed("khadijah-and-support", "Salam from Allah", "Jibril brought Khadijah salam from her Lord.", 2, {
          line: "Jibril brought Khadijah [salam] from Allah.",
          alt: ["gold", "letters"],
          source: "hadith_bukhari_3820"
        }),
        seed("sawdah-and-stability", "Sawdah", "Sawdah became a Mother of the Believers after Khadijah passed away.", 3, {
          line: "Sawdah married the Prophet ﷺ after [Khadijah] passed away.",
          alt: ["Hafsah", "Aishah"]
        }),
        seed("aishah-and-knowledge", "Loved most", "The Prophet ﷺ was asked who he loved most, and he named Aishah.", 4, {
          line: "Asked who he loved most, the Prophet ﷺ said: [Aishah].",
          alt: ["Hafsah", "Sawdah"],
          source: "hadith_bukhari_3662"
        }),
        seed("mothers-review", "Review", "The Mothers of the Believers teach support, knowledge, service, and preserving the religion.", 5, { kind: "review", lessonType: "mastery", line: "Khadijah, Sawdah, Aishah, Hafsah: Mothers of the Believers!" })
      ]},
      { id: "women-virtues-and-legacy", title: "Virtues and legacy", description: "Study the themes these women share: courage, worship, service, and carrying revelation.", order: 5, difficultyRange: [3, 5], sourceKeys: ["quran_33_6", "quran_66_11", "quran_19"], lessons: [
        seed("courage-under-pressure", "Asiyah and baby Musa", "Asiyah took baby Musa into Pharaoh's palace and cared for him.", 3, {
          line: "Asiyah said baby Musa would be a [joy] to her eyes.",
          alt: ["worry", "trouble"],
          why: "She asked Pharaoh to keep him, perhaps as a son.",
          source: "quran_28_9"
        }),
        seed("worship-and-devotion", "Food from Allah", "Maryam worshipped in her prayer room, and Allah gave her food there.", 4, {
          line: "Maryam prayed in her room, and Allah sent her [food].",
          alt: ["letters", "toys"],
          why: "When Zakariyya asked, she said: it is from Allah.",
          source: "quran_3_37"
        }),
        seed("service-to-revelation", "Khadijah's help", "When the first revelation came, Khadijah comforted the Prophet ﷺ and stood by him.", 4, {
          line: "Khadijah [comforted] the Prophet ﷺ after the first revelation.",
          alt: ["scolded", "ignored"],
          why: "She said: By Allah, Allah will never disgrace you.",
          source: "hadith_bukhari_3"
        }),
        seed("lessons-for-today", "Good deeds count", "Allah rewards every believer who does good, woman or man.", 5, {
          line: "Allah rewards the good deeds of women and men alike.",
          ask: ["Whose good deeds does Allah reward?", "Women and men alike", "Only men", "Only women"],
          myth: "Allah rewards the good deeds of men only.",
          source: "quran_16_97"
        }),
        seed("women-legacy-review", "Big quiz", "Look back at the Mothers of the Believers.", 5, { kind: "review", lessonType: "mastery", line: "Show what you know about the Mothers of the Believers!" })
      ]}
    ]
  }
);

SECTION_SEEDS.push(
  {
    id: "manners-expansion",
    topicId: "manners",
    title: "Manners",
    description: "A deeper adab world for speech, parents, neighbors, guests, mercy, and self-control.",
    badge: "Adab World",
    focus: "Speech, parents, social conduct, mercy, and pressure-tested manners.",
    mascot: "hijabi",
    accentColor: "#14B884",
    branches: [
      { id: "manners-neighbors-and-guests", title: "Neighbors and guests", description: "Grow beyond basic kindness into the social adab that binds homes together.", order: 4, difficultyRange: [1, 4], sourceKeys: ["quran_4_36", "hadith_bukhari_6013"], lessons: [
        seed("neighbor-rights", "Neighbors", "Islamic manners extend beyond the self and family into the rights of neighbors.", 1, {
          source: "hadith_bukhari_6014",
          line: "Jibril kept telling the Prophet ﷺ to be kind to [neighbors].",
          alt: ["kings", "camels"],
          why: "He said it so often, the Prophet ﷺ thought neighbors might inherit."
        }),
        seed("guest-honor", "Guests", "Guests should feel welcomed, not managed like a burden.", 2, {
          source: "hadith_bukhari_6018",
          line: "A Muslim [honors] a guest.",
          alt: ["ignores", "rushes"],
          why: "Honoring guests is part of believing in Allah and the Last Day."
        }),
        seed("sharing-space", "Making room", "Adab in a gathering means making room for others, not crowding them.", 2, {
          source: "quran_58_11",
          line: "When asked, make [room] for others in a gathering.",
          alt: ["trouble", "noise"],
          why: "The Quran says Allah will then make room for you."
        }),
        seed("helping-neighbors", "Clearing the path", "Mercy becomes concrete when help reaches nearby people in ordinary needs.", 3, {
          source: "hadith_muslim_1009",
          line: "Moving something harmful off the path is a [charity].",
          alt: ["crime", "waste"]
        }),
        seed("social-adab-review", "Review", "Good adab should be visible in the home, at the door, and around daily contact.", 4, { kind: "review", lessonType: "review", line: "Be kind to neighbors, honor guests, share space, and help." })
      ]},
      { id: "manners-emotional-discipline", title: "Emotional discipline", description: "Learn how patience, restraint, and soft strength protect Muslim character.", order: 5, difficultyRange: [2, 5], sourceKeys: ["hadith_bukhari_6013", "hadith_tirmidhi_2002"], lessons: [
        seed("anger-and-restraint", "Controlling anger", "Strong manners often show most clearly when anger rises.", 2, {
          source: "hadith_bukhari_6114",
          line: "The strong person is the one who controls their [anger].",
          alt: ["friends", "money"]
        }),
        seed("gentleness", "Gentleness", "Gentleness is not weakness; it is disciplined strength governed by revelation.", 3, {
          source: "hadith_bukhari_6024",
          line: "Allah loves [gentleness] in every matter.",
          alt: ["shouting", "rushing"],
          why: "Gentleness makes everything more beautiful."
        }),
        seed("apologizing", "Saying sorry", "A well-mannered Muslim knows how to repair harm, not only avoid it.", 3, {
          line: "If you hurt someone, say [sorry] and make it right.",
          alt: ["nothing", "goodbye"],
          why: "A good deed after a bad one helps wipe it away."
        }),
        seed("self-awareness", "Checking yourself", "Growth in character requires noticing when and where the self keeps slipping.", 4, {
          line: "Check yourself often, and [fix] what went wrong.",
          alt: ["hide", "repeat"],
          why: "Umar said: take account of yourselves before you are taken to account."
        }),
        seed("emotional-review", "Review", "Adab under pressure needs mercy, self-control, humility, and repair.", 5, { kind: "review", lessonType: "mastery", line: "Control anger, be gentle, say sorry, and check yourself." })
      ]},
      { id: "manners-public-conduct", title: "Public conduct", description: "Take adab into masjid, public spaces, disagreement, and online life.", order: 6, difficultyRange: [2, 5], sourceKeys: ["quran_9_119", "hadith_tirmidhi_2002"], lessons: [
        seed("masjid-adab", "In the masjid", "The masjid should train reverence, restraint, and respect for others in worship.", 2, {
          line: "Inside the masjid, speak [softly] and stay calm.",
          alt: ["loudly", "rudely"]
        }),
        seed("disagreement", "Disagreeing kindly", "Truth and firmness do not excuse mockery, contempt, or reckless speech.", 3, {
          source: "quran_49_11",
          line: "Disagree kindly, and never [mock] anyone.",
          alt: ["help", "greet"],
          why: "The Quran says: do not let one people mock another."
        }),
        seed("public-posture", "Walking humbly", "A Muslim should feel watched by Allah in posture, speech, and the way space is taken up.", 4, {
          source: "quran_25_63",
          line: "Walk [humbly], not proudly, wherever you go.",
          alt: ["sneakily", "angrily"],
          why: "Allah's servants walk on the earth gently."
        }),
        seed("online-adab", "Online", "Digital spaces still test the tongue, ego, and manners of a Muslim.", 4, {
          source: "hadith_bukhari_6018",
          line: "Online too: say something good, or stay [quiet].",
          alt: ["loud", "mean"],
          why: "The Prophet ﷺ said: say what is good or stay silent."
        }),
        seed("public-review", "Review", "Adab must survive the masjid, disagreement, crowds, and screens if it is real.", 5, { kind: "review", lessonType: "mastery", line: "Calm in the masjid, kind when disagreeing, good words online." })
      ]}
    ]
  },
  {
    id: "marriage-expansion",
    topicId: "marriage",
    title: "Marriage",
    description: "A richer marriage world covering intentions, rights, conflict, mercy, and home-building.",
    badge: "Home World",
    focus: "Purpose, choosing well, rights, conflict repair, and spiritual life in the home.",
    mascot: "muslim_man",
    accentColor: "#D45E74",
    branches: [
      { id: "marriage-rights-and-trust", title: "Rights and trust", description: "Learn how rights, responsibility, and amanah keep marriage balanced.", order: 3, difficultyRange: [2, 4], sourceKeys: ["quran_30_21"], lessons: [
        seed("rights-are-trusts", "Rights in marriage", "Rights in marriage are given to protect the home, not to feed ego.", 2, {
          source: "quran_2_228",
          line: "Husband and wife both have rights.",
          ask: ["Who has rights in a marriage?", "Husband and wife", "Only the husband", "Only the wife"],
          myth: "Only the husband has rights.",
          why: "The Quran says wives have rights like their duties."
        }),
        seed("mutual-dignity", "Respect", "A home of sakinah needs dignity for both husband and wife.", 2, {
          line: "Spouses treat each other with [respect].",
          alt: ["insults", "silence"],
          why: "The best of you are the best to their families."
        }),
        seed("provision-and-care", "Caring for the family", "Marriage includes concrete care, provision, and emotional steadiness.", 3, {
          line: "A husband must [provide] food, a home, and care.",
          alt: ["hide", "forget"],
          why: "Spending on family is a charity too."
        }),
        seed("trust-and-secrets", "Keeping secrets", "A marriage needs protection of private trust and confidentiality.", 3, {
          line: "Spouses keep each other's secrets safe.",
          ask: ["What do spouses do with each other's secrets?", "Keep them safe", "Tell friends", "Post them online"],
          myth: "Spouses tell others each other's secrets.",
          why: "The Quran calls spouses clothing for each other."
        }),
        seed("rights-review", "Review", "Marriage rights work best when they are carried as trusts under Allah.", 4, { kind: "review", lessonType: "review", line: "Both have rights: respect, care, and secrets kept safe." })
      ]},
      { id: "marriage-conflict-and-repair", title: "Conflict and repair", description: "Learn how to disagree, repent, repair, and keep mercy alive under strain.", order: 4, difficultyRange: [2, 5], sourceKeys: ["quran_30_21", "quran_33_21"], lessons: [
        seed("argue-with-adab", "Arguing kindly", "Conflict in marriage still has to remain inside Islamic character.", 2, {
          line: "Even in an argument, stay [kind] and fair.",
          alt: ["mean", "loud"],
          why: "The Prophet ﷺ never hit a woman or a servant."
        }),
        seed("listen-before-answering", "Listen first", "Homes calm down when each person actually hears the other before reacting.", 3, {
          line: "[Listen] well, then follow the best of what is said.",
          alt: ["Shout", "Leave"]
        }),
        seed("repair-after-harm", "Saying sorry", "Homes survive by repair, apology, and sincere course correction.", 3, {
          // "say sorry and repeat it" could be read as saying sorry again: the false line repeats the hurt.
          line: "After hurting your spouse, say sorry and [fix] the hurt.",
          alt: ["repeat", "hide"]
        }),
        seed("bring-in-help-wisely", "Getting help", "Some conflicts need counsel and outside help, but with wisdom and boundaries.", 4, {
          source: "quran_4_35",
          line: "In a big quarrel, ask a wise [helper] from each family.",
          alt: ["stranger", "crowd"]
        }),
        seed("conflict-review", "Review", "Mercy in marriage is proven under tension, not only in calm moments.", 5, { kind: "review", lessonType: "mastery", line: "Stay kind, listen first, say sorry, and get wise help." })
      ]},
      { id: "marriage-spiritual-home", title: "Spiritual home", description: "Build the home around worship, du'a, patience, and shared direction toward Allah.", order: 5, difficultyRange: [2, 5], sourceKeys: ["quran_30_21", "quran_33_21"], lessons: [
        seed("pray-together", "Prayer at home", "A home becomes steadier when worship is not left outside the marriage.", 2, {
          source: "hadith_bukhari_432",
          line: "Pray some [prayers] at home, not only at the masjid.",
          alt: ["games", "meals"],
          why: "The Prophet ﷺ said: don't make your homes like graves."
        }),
        seed("dua-for-the-home", "Du'a for the family", "Homes need repeated turning to Allah for mercy, repair, and guidance.", 3, {
          source: "quran_25_74",
          line: "Ask Allah for a family that brings [comfort] to your eyes.",
          alt: ["worry", "trouble"]
        }),
        seed("patience-and-growth", "Seeing the good", "Marriage requires patience with imperfection while still moving toward improvement.", 4, {
          source: "hadith_muslim_1469",
          line: "If one habit bothers you, remember the [good] ones.",
          alt: ["bad", "loud"],
          why: "The Prophet ﷺ said: if you dislike one trait, you will like another."
        }),
        seed("raising-the-tone", "Kind words at home", "Speech, cleanliness, gratitude, and worship all set the tone of a house.", 4, {
          line: "Fill the home with salam, thanks, and [kind] words.",
          alt: ["rude", "angry"],
          why: "Saying salam when you come home brings blessing."
        }),
        seed("home-review", "Review", "The best homes are built by mercy, worship, patience, and repeated repair.", 5, { kind: "review", lessonType: "mastery", line: "A good home has prayer, du'a, patience, and kind words." })
      ]}
    ]
  },
  {
    id: "sahabah-expansion",
    topicId: "sahabah",
    title: "Sahabah",
    description: "A companion directory where each companion has a deep unit with long-form lessons, review, challenge, and mastery.",
    badge: "Companion World",
    focus: "Abu Bakr, Umar, Uthman, Ali, Bilal, Khalid, and many more companion branches built for long-term growth.",
    mascot: "muslim_man",
    accentColor: "#0C9F8C",
    replaceExisting: true,
    branches: buildSahabiWorldBranches()
  }
);

SECTION_SEEDS.push({
  id: "quran-world",
  topicId: "quran_tafseer",
  title: "Quran and Tafseer",
  description: "A surah-first Quran world built to scale by surah, ayah group, theme, and review.",
  badge: "Quran World",
  focus: "Surah tracks, ayah groups, themes, reflection, vocabulary, and lived guidance.",
  mascot: "hijabi",
  accentColor: "#1688C4",
  pathStyle: "surah",
  branches: [
    {
      id: "quran-surah-fatihah",
      title: "Surah Al-Fatihah",
      description: "Start with the opening surah of the Quran and of the prayer itself.",
      order: 1,
      difficultyRange: [1, 4],
      sourceKeys: ["quran_1"],
      surahName: "Al-Fatihah",
      ayahRange: "1-7",
      lessons: [
        seed("opening-and-names", "In every salah", "Al-Fatihah is recited in every prayer, so every Muslim learns it by heart.", 1, {
          source: "hadith_bukhari_756",
          surahName: "Al-Fatihah",
          ayahRange: "1-7",
          line: "Al-Fatihah is recited in every [salah].",
          alt: ["meal", "game"],
          why: "Al-Fatihah is also the first surah of the Quran."
        }),
        seed("praise-and-lordship", "Praise for Allah", "The surah begins with praise of Allah before requests are made.", 2, {
          source: "quran_1_2",
          surahName: "Al-Fatihah",
          ayahRange: "1-4",
          line: "Al-Fatihah says: [Alhamdulillah], all praise is for Allah.",
          alt: ["InshaAllah", "Astaghfirullah"]
        }),
        seed("worship-and-help", "You alone", "The center of the surah ties worship and dependence together in one verse.", 3, {
          source: "quran_1_5",
          surahName: "Al-Fatihah",
          ayahRange: "5",
          line: "Iyyaka na'budu means: You alone we [worship].",
          alt: ["visit", "draw"]
        }),
        seed("straight-path", "The straight path", "The ending of Al-Fatihah teaches the believer to ask constantly for guidance and protection from deviation.", 3, {
          source: "quran_1_6",
          surahName: "Al-Fatihah",
          ayahRange: "6-7",
          line: "In Al-Fatihah we ask: guide us to the [straight] path.",
          alt: ["crooked", "secret"]
        }),
        seed("fatihah-review", "Review", "Al-Fatihah teaches praise, worship, dependence, and a constant need for guidance.", 4, { kind: "review", lessonType: "review", surahName: "Al-Fatihah", ayahRange: "1-7", line: "Al-Fatihah: praise Allah, worship Him, and ask for guidance." })
      ]
    },
    {
      id: "quran-surah-baqarah",
      title: "Surah Al-Baqarah",
      description: "Enter Al-Baqarah through its opening guidance, worldview, and major anchor passages.",
      order: 2,
      difficultyRange: [1, 5],
      sourceKeys: ["quran_2_1_5", "quran_2_255", "quran_2_285"],
      surahName: "Al-Baqarah",
      ayahRange: "1-5, 255, 285",
      lessons: [
        seed("opening-guidance", "No doubt", "The opening of Al-Baqarah defines revelation as guidance for the muttaqun.", 1, {
          source: "quran_2_2",
          surahName: "Al-Baqarah",
          ayahRange: "1-5",
          line: "Near its start, Al-Baqarah says: this Book has no [doubt] in it.",
          alt: ["guidance", "light"],
          why: "It is guidance for those who are mindful of Allah."
        }),
        seed("qualities-of-guided", "The guided", "The surah names believing in the unseen, prayer, and spending as signs of guidance.", 2, {
          source: "quran_2_3",
          surahName: "Al-Baqarah",
          ayahRange: "2-5",
          line: "The guided believe in the unseen, [pray], and give.",
          alt: ["sleep", "shout"]
        }),
        seed("ayat-al-kursi", "Ayat al-Kursi", "Ayat al-Kursi brings Allah's life, knowledge, and authority into one towering passage.", 3, {
          source: "hadith_muslim_810",
          surahName: "Al-Baqarah",
          ayahRange: "255",
          line: "Ayat al-Kursi is the greatest [ayah] in the Quran.",
          alt: ["surah", "story"],
          why: "It is ayah 255 of Al-Baqarah."
        }),
        seed("ending-belief", "The last ayahs", "The closing verses gather belief, obedience, and humble appeal for mercy.", 4, {
          source: "quran_2_285",
          surahName: "Al-Baqarah",
          ayahRange: "285",
          line: "Al-Baqarah's last ayahs say: we hear and we [obey].",
          alt: ["forget", "argue"]
        }),
        seed("baqarah-review", "Review", "Al-Baqarah begins and ends with guidance, belief, action, and awe.", 5, { kind: "review", lessonType: "mastery", surahName: "Al-Baqarah", ayahRange: "1-5, 255, 285", line: "Al-Baqarah: guidance, Ayat al-Kursi, and we hear and obey." })
      ]
    },
    {
      id: "quran-surah-ali-imran",
      title: "Surah Ali 'Imran",
      description: "Study steadfastness, truth, and holding to revelation in Ali 'Imran.",
      order: 3,
      difficultyRange: [1, 5],
      sourceKeys: ["quran_3"],
      surahName: "Ali 'Imran",
      ayahRange: "Selected themes",
      lessons: [
        seed("steadfastness", "Stay firm", "Ali 'Imran repeatedly trains the believer to stay firm under pressure.", 1, {
          source: "quran_3_200",
          surahName: "Ali 'Imran",
          line: "Ali 'Imran tells believers: be patient and stay [firm].",
          alt: ["lazy", "loud"]
        }),
        seed("holding-the-rope", "Allah's rope", "The surah teaches unity around revelation rather than drift into ego and fragmentation.", 2, {
          source: "quran_3_103",
          surahName: "Ali 'Imran",
          line: "Hold on to Allah's [rope] together, and don't split up.",
          alt: ["kite", "coat"],
          why: "Many scholars explain Allah's rope as the Quran."
        }),
        seed("truth-and-tests", "Tests", "Ali 'Imran shows that being on truth does not remove tests; it teaches how to move through them.", 3, {
          source: "quran_3_186",
          surahName: "Ali 'Imran",
          line: "Ali 'Imran says believers will be [tested], so be patient.",
          alt: ["famous", "bored"],
          why: "Patience and taqwa carry us through."
        }),
        seed("dialogue-and-clarity", "People of the Book", "The surah teaches clarity with people of other revelations while staying rooted in truth.", 4, {
          source: "quran_3_64",
          surahName: "Ali 'Imran",
          line: "Ali 'Imran calls the People of the [Book] to worship Allah alone.",
          alt: ["Cave", "Elephant"],
          why: "People of the Book means Jews and Christians."
        }),
        seed("imran-review", "Review", "Ali 'Imran trains firmness, unity, clarity, and patience under trial.", 5, { kind: "review", lessonType: "review", surahName: "Ali 'Imran", line: "Ali 'Imran: stay firm, hold together, and be patient in tests." })
      ]
    },
    {
      id: "quran-surah-nisa",
      title: "Surah An-Nisa",
      description: "Enter Surah An-Nisa through justice, rights, and social responsibility.",
      order: 4,
      difficultyRange: [1, 5],
      sourceKeys: ["quran_4", "quran_4_36", "quran_4_136"],
      surahName: "An-Nisa",
      ayahRange: "Selected themes",
      lessons: [
        seed("social-justice", "Justice", "An-Nisa builds a community through justice and careful treatment of rights.", 1, {
          source: "quran_4_135",
          surahName: "An-Nisa",
          line: "An-Nisa tells believers to stand firm for [justice].",
          alt: ["money", "fame"],
          why: "Be fair even if it is against yourself or your family."
        }),
        seed("rights-of-people", "Orphans", "The surah repeatedly protects people whose rights are easy to neglect.", 2, {
          source: "quran_4_2",
          surahName: "An-Nisa",
          line: "An-Nisa protects [orphans] and their money.",
          alt: ["kings", "thieves"]
        }),
        seed("family-duty", "Parents and relatives", "An-Nisa links family relationships to accountability before Allah.", 3, {
          source: "quran_4_36",
          surahName: "An-Nisa",
          line: "An-Nisa says: be good to your [parents] and relatives.",
          alt: ["phones", "toys"]
        }),
        seed("belief-and-order", "Obey Allah", "The surah joins belief with law, order, and accountability in social life.", 4, {
          source: "quran_4_59",
          ask: ["Who does An-Nisa say to obey?", "Allah and the Messenger ﷺ", "The crowd", "No one"],
          surahName: "An-Nisa",
          line: "An-Nisa says: obey Allah and obey the Messenger ﷺ.",
          myth: "An-Nisa says: obey the crowd, not the Messenger ﷺ."
        }),
        seed("nisa-review", "Review", "An-Nisa is a surah of justice, rights, family duty, and accountable belief.", 5, { kind: "review", lessonType: "review", surahName: "An-Nisa", line: "An-Nisa: justice, orphans, parents, and obeying Allah." })
      ]
    },
    {
      id: "quran-surah-maidah",
      title: "Surah Al-Ma'idah",
      description: "Learn how Al-Ma'idah shapes covenants, purity, and lawful living.",
      order: 5,
      difficultyRange: [1, 5],
      sourceKeys: ["quran_5", "quran_5_6"],
      surahName: "Al-Ma'idah",
      ayahRange: "Selected themes",
      lessons: [
        seed("fulfill-covenants", "Keep your promises", "Al-Ma'idah opens with the demand to honor covenants and commitments.", 1, {
          source: "quran_5_1",
          surahName: "Al-Ma'idah",
          line: "Al-Ma'idah begins: O believers, keep your [promises].",
          alt: ["toys", "shoes"]
        }),
        seed("purity-and-prayer", "Wudu in the Quran", "This surah teaches that purity belongs at the entrance of prayer.", 2, {
          source: "quran_5_6",
          surahName: "Al-Ma'idah",
          ayahRange: "6",
          line: "Ayah 6 of Al-Ma'idah teaches [wudu] before salah.",
          alt: ["fasting", "Hajj"],
          why: "It names the face, arms, head and feet."
        }),
        seed("lawful-living", "Halal food", "Al-Ma'idah trains the believer to care about halal and haram through obedience to Allah.", 3, {
          source: "quran_5_88",
          surahName: "Al-Ma'idah",
          line: "Al-Ma'idah says: eat what is [halal] and good.",
          alt: ["haram", "stolen"],
          why: "Halal means allowed, and haram means not allowed."
        }),
        seed("loyalty-to-revelation", "Judging by revelation", "The surah repeatedly calls believers back to revelation when communities drift.", 4, {
          source: "quran_5_49",
          surahName: "Al-Ma'idah",
          line: "Al-Ma'idah says to judge by what Allah revealed.",
          ask: ["What does Al-Ma'idah say to judge by?", "What Allah revealed", "What people like", "What is popular"],
          myth: "Al-Ma'idah says to judge by what people like."
        }),
        seed("maidah-review", "Review", "Al-Ma'idah teaches fulfilled covenants, lawful living, purity, and loyalty to guidance.", 5, { kind: "review", lessonType: "review", surahName: "Al-Ma'idah", line: "Al-Ma'idah: keep promises, make wudu, and eat halal." })
      ]
    },
    {
      id: "quran-surah-yusuf",
      title: "Surah Yusuf",
      description: "Walk through patience, purity, family strain, and beautiful endings in Surah Yusuf.",
      order: 6,
      difficultyRange: [1, 5],
      sourceKeys: ["quran_12"],
      surahName: "Yusuf",
      ayahRange: "Selected themes",
      lessons: [
        seed("beautiful-story", "The best story", "Surah Yusuf unfolds as one story that teaches trust through many turns.", 1, {
          source: "quran_12_3",
          surahName: "Yusuf",
          line: "Allah calls Yusuf's story the [best] of stories.",
          alt: ["shortest", "saddest"],
          why: "Almost the whole surah tells this one story."
        }),
        seed("temptation-and-purity", "Saying no", "Yusuf teaches purity when temptation and opportunity meet.", 2, {
          source: "quran_12_23",
          surahName: "Yusuf",
          line: "When tempted to do wrong, Yusuf said [no] and stayed pure.",
          alt: ["yes", "maybe"],
          why: "He said prison was dearer to him than doing wrong."
        }),
        seed("prison-and-patience", "Yusuf in prison", "The surah shows how patience and da'wah continue even in confinement.", 3, {
          source: "quran_12_39",
          surahName: "Yusuf",
          line: "Even in [prison], Yusuf taught others about Allah.",
          alt: ["a ship", "the market"]
        }),
        seed("forgiveness-and-reunion", "Forgiving his brothers", "The ending of Yusuf teaches forgiveness, healing, and gratitude after long pain.", 4, {
          source: "quran_12_92",
          surahName: "Yusuf",
          line: "Yusuf [forgave] his brothers when they met again.",
          alt: ["punished", "ignored"],
          why: "He told them: no blame on you today."
        }),
        seed("yusuf-review", "Review", "Surah Yusuf gathers temptation, patience, wisdom, da'wah, and forgiveness into one path.", 5, { kind: "review", lessonType: "mastery", surahName: "Yusuf", line: "Surah Yusuf: the best story, staying pure, and forgiving." })
      ]
    },
    {
      id: "quran-surah-maryam",
      title: "Surah Maryam",
      description: "Study mercy, family, prayer, and miraculous care in Surah Maryam.",
      order: 7,
      difficultyRange: [1, 5],
      sourceKeys: ["quran_19", "quran_28_7", "quran_66_11"],
      surahName: "Maryam",
      ayahRange: "Selected themes",
      lessons: [
        seed("mercy-at-the-opening", "Zakariyya's du'a", "Surah Maryam opens in a climate of mercy, intimate du'a, and divine care.", 1, {
          source: "quran_19_3",
          surahName: "Maryam",
          line: "Surah Maryam opens with Zakariyya's quiet [du'a] for a child.",
          alt: ["song", "letter"],
          why: "He was old, but nothing is hard for Allah."
        }),
        seed("family-and-dua", "A son named Yahya", "The surah shows families held, tested, and guided through prayer and supplication.", 2, {
          source: "quran_19_7",
          surahName: "Maryam",
          line: "Allah answered Zakariyya with a son named [Yahya].",
          alt: ["Musa", "Yusuf"],
          why: "No one had that name before him."
        }),
        seed("maryam-her-trust", "Maryam's trust", "Maryam stands as a model of worship, purity, and trust under an impossible decree.", 3, {
          surahName: "Maryam",
          line: "Maryam trusted Allah when baby [Isa] was born.",
          alt: ["Musa", "Yahya"],
          why: "Baby Isa spoke from the cradle to defend her."
        }),
        seed("prophetic-links", "Ibrahim and his father", "The surah links multiple prophets through prayer, worship, and Allah's care.", 4, {
          source: "quran_19_42",
          surahName: "Maryam",
          line: "Surah Maryam tells of [Ibrahim] speaking gently to his father.",
          alt: ["Yusuf", "Sulayman"]
        }),
        seed("maryam-review", "Review", "Surah Maryam is a surah of mercy, prayer, family hope, and pure worship under trial.", 5, { kind: "review", lessonType: "review", surahName: "Maryam", line: "Surah Maryam: Zakariyya, Yahya, Maryam, Isa and Ibrahim." })
      ]
    },
    {
      id: "quran-surah-kahf",
      title: "Surah Al-Kahf",
      description: "Learn how Surah Al-Kahf trains believers for trial, perspective, and protection.",
      order: 8,
      difficultyRange: [2, 5],
      sourceKeys: ["quran_18"],
      surahName: "Al-Kahf",
      ayahRange: "Selected themes",
      lessons: [
        seed("faith-under-trial", "The people of the cave", "Al-Kahf teaches holding faith when environments turn hostile.", 2, {
          source: "quran_18_10",
          surahName: "Al-Kahf",
          line: "Young believers hid in a [cave] to keep their faith.",
          alt: ["ship", "palace"]
        }),
        seed("wealth-and-gardens", "Two gardens", "The surah teaches perspective about wealth, status, and what actually lasts.", 3, {
          source: "quran_18_32",
          surahName: "Al-Kahf",
          line: "A man was proud of his two [gardens], then they were ruined.",
          alt: ["houses", "horses"],
          why: "Good deeds last longer than wealth."
        }),
        seed("knowledge-and-khidr", "Musa and Khidr", "The story with Khidr teaches humility before what Allah knows beyond us.", 4, {
          surahName: "Al-Kahf",
          line: "Musa traveled to learn from a wise servant of Allah, [Khidr].",
          alt: ["Harun", "Yusuf"],
          why: "Khidr did things that only made sense later."
        }),
        seed("power-and-dhulqarnayn", "Dhul-Qarnayn's wall", "Dhul-Qarnayn teaches power under gratitude, justice, and responsible service.", 4, {
          surahName: "Al-Kahf",
          line: "Dhul-Qarnayn was a strong ruler who built a great [wall].",
          alt: ["ship", "tower"],
          why: "He said: this is a mercy from my Lord."
        }),
        seed("kahf-review", "Review", "Surah Al-Kahf is a map for protecting faith through trials of belonging, wealth, knowledge, and power.", 5, { kind: "review", lessonType: "mastery", surahName: "Al-Kahf", line: "Al-Kahf: the cave, two gardens, Khidr and Dhul-Qarnayn." })
      ]
    },
    {
      id: "quran-surah-yasin",
      title: "Surah Ya-Sin",
      description: "Move through revelation, signs, resurrection, and accountability in Surah Ya-Sin.",
      order: 9,
      difficultyRange: [2, 5],
      sourceKeys: ["quran_36"],
      surahName: "Ya-Sin",
      ayahRange: "Selected themes",
      lessons: [
        seed("revelation-and-warning", "The wise Quran", "Ya-Sin opens with revelation and the seriousness of warning a heedless people.", 2, {
          source: "quran_36_2",
          surahName: "Ya-Sin",
          line: "Ya-Sin begins by swearing by the [wise] Quran.",
          alt: ["noisy", "short"]
        }),
        seed("signs-in-creation", "Sun and moon", "The surah shows signs in the world that point back to Allah.", 3, {
          source: "quran_36_40",
          surahName: "Ya-Sin",
          line: "Ya-Sin says the sun and moon each [swim] in an orbit.",
          alt: ["sleep", "stop"],
          why: "They are signs that point to Allah."
        }),
        seed("resurrection", "Back to life", "Ya-Sin repeatedly calls the believer back to life after death and final return.", 4, {
          source: "quran_36_79",
          surahName: "Ya-Sin",
          line: "Allah made us once, and He will bring us back to [life].",
          alt: ["sleep", "school"],
          why: "When Allah wants something, He says Be, and it is."
        }),
        seed("messengers-and-response", "The man who ran", "The surah shows how people often resist messengers even when truth is clear.", 4, {
          source: "quran_36_20",
          surahName: "Ya-Sin",
          line: "In Ya-Sin, a man ran to tell his town: follow the [messengers].",
          alt: ["kings", "crowd"]
        }),
        seed("yasin-review", "Review", "Ya-Sin teaches revelation, signs, resurrection, and accountability together.", 5, { kind: "review", lessonType: "review", surahName: "Ya-Sin", line: "Ya-Sin: the wise Quran, signs in the sky, and life after death." })
      ]
    },
    {
      id: "quran-surah-mulk",
      title: "Surah Al-Mulk",
      description: "Learn how Surah Al-Mulk trains awe, accountability, and reflection on life as a test.",
      order: 10,
      difficultyRange: [2, 5],
      sourceKeys: ["quran_67"],
      surahName: "Al-Mulk",
      ayahRange: "Selected themes",
      lessons: [
        seed("dominion-of-allah", "The kingdom", "Al-Mulk opens by centering absolute dominion in Allah's hand alone.", 2, {
          source: "quran_67_1",
          surahName: "Al-Mulk",
          line: "Al-Mulk begins: blessed is He who holds the [kingdom].",
          alt: ["garden", "money"],
          why: "Al-Mulk means The Kingdom."
        }),
        seed("life-as-test", "Life is a test", "The surah teaches that life and death are created as a test of action.", 3, {
          source: "quran_67_2",
          surahName: "Al-Mulk",
          line: "Allah made life and death to see who does [best].",
          alt: ["loudest", "richest"],
          why: "It says best in deeds, not most in deeds."
        }),
        seed("looking-at-creation", "A perfect sky", "The surah urges careful repeated looking at the creation to see order and perfection.", 4, {
          source: "quran_67_3_4",
          surahName: "Al-Mulk",
          line: "Look at the sky again and again; you will see no [cracks].",
          alt: ["stars", "clouds"],
          why: "Allah decorated the nearest sky with stars like lamps."
        }),
        seed("warning-and-security", "Who gives water?", "Al-Mulk warns the heedless heart against false security before Allah.", 4, {
          source: "quran_67_30",
          surahName: "Al-Mulk",
          line: "Al-Mulk asks who could bring back your [water] if it sank away.",
          alt: ["gold", "bread"],
          why: "Only Allah gives us water and every blessing."
        }),
        seed("mulk-review", "Review", "Al-Mulk teaches sovereignty, accountability, reflection, and escape from heedlessness.", 5, { kind: "review", lessonType: "mastery", surahName: "Al-Mulk", line: "Al-Mulk: Allah's kingdom, life as a test, and a perfect sky." })
      ]
    }
  ]
});

SECTION_SEEDS.push(
  {
    id: "fasting-world",
    topicId: "fasting",
    title: "Fasting",
    description: "A growing Ramadan path that moves from basics into discipline, adab, and mastery.",
    badge: "Ramadan World",
    focus: "Purpose, times, invalidators, nights, and character in fasting.",
    mascot: "hijabi",
    accentColor: "#5B82F1",
    branches: [
      { id: "fasting-purpose", title: "Purpose of fasting", description: "Start with why Ramadan exists and how fasting grows taqwa.", order: 1, difficultyRange: [1, 3], sourceKeys: ["quran_2_183_187"], lessons: [
        seed("why-fasting", "Why we fast", "Ramadan fasting is prescribed so the believer grows in taqwa.", 1, {
          source: "quran_2_183",
          line: "Allah made fasting so we can gain [taqwa].",
          alt: ["fame", "money"]
        }),
        seed("ramadan-and-quran", "The Quran's month", "Ramadan is tied to the Quran and should feel like a season of guidance.", 1, {
          source: "quran_2_185",
          line: "The Quran was first sent down in [Ramadan].",
          alt: ["Shawwal", "Muharram"]
        }),
        seed("what-taqwa-means", "What taqwa means", "Taqwa in fasting means restraint, awareness, and obedience under Allah's gaze.", 2, {
          line: "Taqwa means being [careful] to obey Allah, even alone.",
          alt: ["too lazy", "too loud"],
          why: "A fasting person stays hungry even when no one can see."
        }),
        seed("inner-discipline", "Fasting is for Allah", "The best fast reshapes intention, secrecy, and daily restraint.", 2, {
          source: "hadith_bukhari_1904",
          line: "Allah says [fasting] is for Him, and He rewards it.",
          alt: ["shopping", "sleeping"]
        }),
        seed("purpose-review", "Review", "The purpose of fasting is spiritual training through obedience, not emptiness or performance.", 3, { kind: "review", lessonType: "review", line: "We fast for taqwa, in the month the Quran came down." })
      ]},
      { id: "fasting-times-and-rules", title: "Times and rules", description: "Learn the structure of suhur, fasting hours, and breaking the fast.", order: 2, difficultyRange: [1, 4], sourceKeys: ["quran_2_183_187"], lessons: [
        seed("suhur-and-intent", "Suhur", "The fasting day begins with intention and preparation, not with accidental drift.", 1, {
          line: "[Suhur] is the meal we eat before dawn.",
          alt: ["Iftar", "Lunch"],
          why: "Suhur comes from sahar, the last part of the night."
        }),
        seed("start-and-end", "Dawn to sunset", "The fast runs from dawn to sunset, so its start and end are clear.", 2, {
          source: "quran_2_187",
          line: "The fast lasts from [dawn] to sunset.",
          alt: ["noon", "midnight"],
          why: "Allah says: eat until dawn, then fast until night."
        }),
        seed("breaking-the-fast", "Iftar", "Iftar should be timely, grateful, and connected to remembrance.", 2, {
          line: "[Iftar] is the meal at sunset that ends the fast.",
          alt: ["Suhur", "Brunch"]
        }),
        seed("who-is-exempt", "When you're sick", "Islam teaches mercy and realism around hardship, illness, and inability.", 3, {
          source: "quran_2_185",
          line: "People who are [sick] may make up the fast later.",
          alt: ["busy", "bored"],
          why: "Allah wants ease for us, not hardship."
        }),
        seed("timing-review", "Review", "Good fasting requires understanding time, intention, mercy, and a proper ending.", 4, { kind: "review", lessonType: "review", line: "Suhur before dawn, iftar at sunset, and ease for the sick." })
      ]},
      { id: "fasting-protection", title: "Protecting the fast", description: "Move into invalidators, tongue discipline, and the mistakes that weaken the fast.", order: 3, difficultyRange: [2, 5], sourceKeys: ["quran_2_183_187"], lessons: [
        seed("invalidators", "What breaks the fast", "Know what clearly breaks the fast and what does not.", 2, {
          line: "Eating or drinking on purpose [breaks] the fast.",
          alt: ["helps", "starts"]
        }),
        seed("tongue-and-character", "Kind words", "The fast should protect speech, temper, and hidden reactions as much as the stomach.", 3, {
          source: "hadith_bukhari_1904",
          line: "A fasting person stays away from [bad] words and fights.",
          alt: ["kind", "good"],
          why: "If someone starts a fight, say: I am fasting."
        }),
        seed("forgetfulness-and-mercy", "If you forget", "Mistakes in fasting should be thought through with mercy and knowledge, not panic.", 3, {
          source: "hadith_bukhari_1933",
          line: "If you eat because you [forgot], your fast still counts.",
          alt: ["wanted to", "felt like it"],
          why: "The Prophet ﷺ said it was Allah who fed you."
        }),
        seed("social-pressure", "When friends eat", "Protect your fast even when school, work, or friends make it awkward.", 4, {
          line: "Friends eating near you is no reason to [break] your fast.",
          alt: ["keep", "plan"]
        }),
        seed("protection-review", "Big quiz", "The fast is protected by knowledge, restraint, and mercy together.", 5, { kind: "review", lessonType: "mastery", line: "No food on purpose, no bad words, and forgetting is forgiven." })
      ]},
      { id: "fasting-ramadan-growth", title: "Growing in Ramadan", description: "Turn Ramadan into a full worship season with nights, Quran, and reflection.", order: 4, difficultyRange: [2, 5], sourceKeys: ["quran_2_183_187"], lessons: [
        seed("night-worship", "Ramadan nights", "The nights of Ramadan are for prayer, Quran, and returning to Allah.", 2, {
          line: "At night in Ramadan, Muslims pray [Taraweeh].",
          alt: ["Eid", "Jumu'ah"],
          why: "Praying at night in Ramadan with faith brings forgiveness."
        }),
        seed("quran-in-ramadan", "Quran in Ramadan", "Ramadan should make the Quran more central, not more distant.", 3, {
          source: "hadith_bukhari_6",
          line: "Every Ramadan, Jibril went over the [Quran] with the Prophet ﷺ.",
          alt: ["Torah", "poems"]
        }),
        seed("laylat-al-qadr", "Laylat al-Qadr", "The last nights train the believer to chase worship with seriousness and hope.", 4, {
          source: "quran_97_3",
          line: "Laylat al-Qadr is better than a [thousand] months.",
          alt: ["hundred", "few"]
        }),
        seed("after-ramadan", "After Ramadan", "The point of Ramadan is changed worship, not a temporary mood that disappears at Eid.", 4, {
          line: "The deeds Allah loves most are done [regularly], even if small.",
          alt: ["once", "loudly"]
        }),
        seed("ramadan-review", "Big quiz", "A mature Ramadan view joins taqwa, rules, mercy, Quran, night worship, and lasting change.", 5, { kind: "review", lessonType: "mastery", line: "Ramadan: Taraweeh, Quran, Laylat al-Qadr, and habits that last." })
      ]}
    ]
  },
  {
    id: "zakat-world",
    topicId: "zakat",
    title: "Zakat",
    description: "Grow from basic wealth purification into serious learning about recipients, intention, and justice.",
    badge: "Wealth World",
    focus: "Duty, recipients, purification, and trust with wealth.",
    mascot: "muslim_man",
    accentColor: "#16986C",
    branches: [
      { id: "zakat-meaning-and-duty", title: "Zakat basics", description: "Start with why zakat exists and how it purifies wealth and the giver.", order: 1, difficultyRange: [1, 3], sourceKeys: ["quran_9_103", "quran_9_60"], lessons: [
        seed("what-zakat-is", "What zakat is", "Zakat is a required purification of wealth, not just optional generosity.", 1, {
          line: "Zakat means giving part of your wealth to people in [need].",
          alt: ["charge", "shops"]
        }),
        seed("why-it-purifies", "Zakat cleans", "Allah ties zakat to purification of wealth and soul.", 1, {
          line: "Zakat makes your wealth [pure] and your heart clean.",
          alt: ["dirty", "heavy"],
          why: "The word zakat means to purify and to grow."
        }),
        seed("obligation-and-seriousness", "How much?", "Zakat is a duty carried out with care and planning.", 2, {
          line: "Zakat on savings is [2.5] percent each year.",
          alt: ["10", "25"],
          why: "That is one part out of every forty."
        }),
        seed("nisab-and-threshold", "The nisab", "Zakat enters when wealth reaches its threshold and remains there with the right conditions.", 2, {
          line: "Zakat is due when savings reach the [nisab] for a year.",
          alt: ["ceiling", "bank"],
          why: "The nisab is the smallest amount that zakat is due on."
        }),
        seed("meaning-review", "Review", "Zakat is a disciplined act of worship that purifies wealth and trains responsibility.", 3, { kind: "review", lessonType: "review", line: "Zakat: a duty that purifies, due once wealth reaches the nisab." })
      ]},
      { id: "zakat-recipients", title: "Who gets zakat", description: "Learn who may receive zakat and how revelation protects this right.", order: 2, difficultyRange: [2, 4], sourceKeys: ["quran_9_60"], lessons: [
        seed("eligible-groups", "Eight groups", "Quran 9:60 names real recipient categories that should be learned and respected.", 2, {
          source: "quran_9_60",
          line: "The Quran names [eight] groups who may receive zakat.",
          alt: ["two", "twenty"]
        }),
        seed("need-and-priority", "The poor first", "A believer should think carefully about actual need and the revealed categories.", 2, {
          source: "quran_9_60",
          line: "The [poor] and the needy come first on that list.",
          alt: ["rich", "famous"]
        }),
        seed("family-and-boundaries", "Not to your parents", "Zakat questions often require knowing relational boundaries and financial responsibility.", 3, {
          line: "You don't give zakat to your [parents or children].",
          alt: ["poor neighbors", "poor strangers"],
          why: "You already support them with your own money."
        }),
        seed("scenario-judgment", "A stuck traveler", "Compare people and situations with the groups who may receive zakat.", 4, {
          source: "quran_9_60",
          line: "A traveler stuck with no money [may] get zakat.",
          alt: ["may not", "must not"],
          why: "Stuck travelers are one of the eight groups."
        }),
        seed("recipient-review", "Review", "Zakat recipients are defined so that giving stays obedient, not arbitrary.", 4, { kind: "review", lessonType: "review", line: "Zakat goes to the eight groups, starting with the poor." })
      ]},
      { id: "zakat-character-and-intention", title: "Giving with a good heart", description: "Move into the giver's inner state: sincerity, humility, and avoiding harm.", order: 3, difficultyRange: [2, 5], sourceKeys: ["quran_9_103", "quran_4_36"], lessons: [
        seed("sincerity", "For Allah", "Zakat should be given for Allah, not for image, pressure, or praise.", 2, {
          line: "Give zakat to please [Allah] alone.",
          alt: ["people", "friends"],
          why: "Allah knows what is in every heart."
        }),
        seed("humility", "Give kindly", "Giving should not crush the dignity of the one receiving.", 3, {
          line: "Give kindly, and never make the person feel [small].",
          alt: ["happy", "welcome"],
          why: "Allah says: don't spoil charity with reminders or hurt."
        }),
        seed("promptness", "Pay on time", "Delaying zakat without reason often signals weak seriousness toward the duty.", 3, {
          line: "Once zakat is due, pay it [soon].",
          alt: ["years later", "never"]
        }),
        seed("wealth-and-heart", "A trust", "Zakat teaches the believer to hold wealth as a trust, not a master.", 4, {
          line: "Our wealth is a [trust] from Allah.",
          alt: ["toy", "secret"],
          why: "We will be asked how we earned it and spent it."
        }),
        seed("intention-review", "Big quiz", "Zakat is outward duty and inward purification at the same time.", 5, { kind: "review", lessonType: "mastery", line: "Give for Allah, kindly and on time, as a trust." })
      ]},
      { id: "zakat-broader-generosity", title: "More ways to give", description: "Connect zakat to sadaqah, generosity, and long-term financial responsibility.", order: 4, difficultyRange: [2, 5], sourceKeys: ["quran_9_103", "quran_4_36"], lessons: [
        seed("zakat-and-sadaqah", "Zakat and sadaqah", "Zakat is required, while sadaqah is extra charity; both matter.", 2, {
          line: "Zakat is required; [sadaqah] is extra charity.",
          alt: ["salah", "suhur"],
          why: "Sadaqah can be given any time, even a smile."
        }),
        seed("care-for-neighbors", "Share with neighbors", "Islamic generosity makes you notice the needs of people around you.", 3, {
          source: "hadith_muslim_2625",
          line: "When you cook soup, add water and share with your neighbors.",
          ask: ["Who did the Prophet ﷺ say to share soup with?", "Your neighbors", "No one", "Only the rich"],
          myth: "When you cook soup, add water and keep it all yourself.",
          why: "The Prophet ﷺ told Abu Dharr to do this."
        }),
        seed("family-support-and-duty", "Family counts", "Financial care in Islam includes knowing ordinary family duties alongside zakat duties.", 4, {
          source: "hadith_bukhari_55",
          line: "Spending on your own [family] is a charity too.",
          alt: ["pride", "games"],
          why: "Spend for Allah's sake, and it counts as charity."
        }),
        seed("planning-a-giving-life", "The middle way", "A strong Muslim financial life is planned, disciplined, and generous.", 4, {
          source: "quran_25_67",
          line: "When spending, don't waste and don't be [stingy].",
          alt: ["kind", "careful"]
        }),
        seed("giving-review", "Big quiz", "Zakat should grow into a broader habit of responsible, sincere, and revealed generosity.", 5, { kind: "review", lessonType: "mastery", line: "Zakat, sadaqah, sharing with neighbors, and caring for family." })
      ]}
    ]
  },
  {
    id: "hajj-world",
    topicId: "hajj",
    title: "Hajj",
    description: "A long-form path through obligation, rites, stations, and the spiritual lessons of pilgrimage.",
    badge: "Journey World",
    focus: "Ability, rites, sacred sites, remembrance, and humility in Hajj.",
    mascot: "muslim_man",
    accentColor: "#D67A2A",
    branches: [
      { id: "hajj-duty", title: "Who goes to Hajj", description: "Learn who Hajj is for, why it matters, and how ability shapes obligation.", order: 1, difficultyRange: [1, 3], sourceKeys: ["quran_3_97", "quran_22_27"], lessons: [
        seed("why-hajj-matters", "Why Hajj matters", "Hajj is one of the five pillars of Islam.", 1, {
          source: "hadith_bukhari_8",
          line: "Hajj is one of the five [pillars] of Islam.",
          alt: ["rooms", "secrets"]
        }),
        seed("who-must-go", "Who must go", "Hajj is required for those who are able to find a way.", 1, {
          line: "Hajj is due once in life for those who are [able].",
          alt: ["bored", "famous"],
          why: "Able means healthy enough, with money for the trip."
        }),
        seed("intending-the-journey", "Hajj for Allah", "A believer should desire Hajj sincerely even before the means are present.", 2, {
          line: "Go to Hajj only for [Allah], not to show off.",
          alt: ["photos", "fame"]
        }),
        seed("sacred-house", "The Ka'bah", "The Ka'bah and the rites teach unity, remembrance, and submission to Allah's command.", 2, {
          line: "The [Ka'bah] in Makkah is the House of Allah.",
          alt: ["Dome", "Tower"]
        }),
        seed("duty-review", "Review", "Hajj joins obligation, ability, longing, and sacred direction together.", 3, { kind: "review", lessonType: "review", line: "Hajj: a pillar, once in life for the able, at the Ka'bah." })
      ]},
      { id: "hajj-rites", title: "Hajj step by step", description: "Move through ihram, tawaf, sa'i, and the ordered movement of pilgrimage.", order: 2, difficultyRange: [1, 4], sourceKeys: ["quran_2_196_203", "quran_22_27"], lessons: [
        seed("ihram", "Ihram", "Ihram marks the journey as worship and places the pilgrim inside a sacred discipline.", 1, {
          line: "In ihram, men wear [two] simple cloths.",
          alt: ["ten", "five"],
          why: "One goes around the waist, one over the shoulders."
        }),
        seed("tawaf", "Tawaf", "Tawaf trains the heart in remembrance, unity, and obedience around the House of Allah.", 2, {
          line: "[Tawaf] means walking around the Ka'bah seven times.",
          alt: ["Sa'i", "Ihram"]
        }),
        seed("sai", "Sa'i", "Sa'i preserves the memory of trust, effort, and Allah's care.", 2, {
          line: "[Sa'i] is walking between Safa and Marwah seven times.",
          alt: ["Tawaf", "Ihram"],
          why: "It remembers Hajar, who ran there looking for water."
        }),
        seed("days-and-order", "The Hajj days", "The pilgrim should learn the sequence of the Hajj days and not treat them as a blur.", 3, {
          line: "Hajj days: Mina, then [Arafah], Muzdalifah, and back to Mina.",
          alt: ["Madinah", "Taif"],
          first: ["Arafah", "Muzdalifah", "Back to Mina"]
        }),
        seed("rites-review", "Review", "Hajj rites become strong when sequence, meaning, and restraint all stay together.", 4, { kind: "review", lessonType: "review", line: "Ihram, then tawaf, then sa'i between Safa and Marwah." })
      ]},
      { id: "hajj-major-stations", title: "Arafah to Mina", description: "Go deeper into Arafah, Muzdalifah, Mina, and the days of remembrance.", order: 3, difficultyRange: [2, 5], sourceKeys: ["quran_2_196_203", "quran_22_27"], lessons: [
        seed("arafah", "Arafah", "Arafah gathers humility, du'a, and the heart's deepest turning to Allah.", 2, {
          line: "Pilgrims stand at [Arafah] on the 9th of Dhul-Hijjah.",
          alt: ["Mina", "Safa"]
        }),
        seed("muzdalifah", "Muzdalifah", "Muzdalifah trains the pilgrim in remembrance, order, and composed movement.", 3, {
          line: "After Arafah, pilgrims spend the night at [Muzdalifah].",
          alt: ["Madinah", "Taif"]
        }),
        seed("mina", "Mina", "Mina teaches remembrance, patience, and patient movement through sacred days.", 3, {
          line: "At [Mina], pilgrims throw small pebbles at the pillars.",
          alt: ["Arafah", "Safa"]
        }),
        seed("sacrifice-and-release", "After the sacrifice", "Acts around sacrifice and release from ihram teach gratitude, obedience, and completion.", 4, {
          line: "After the sacrifice, men shave or cut their [hair].",
          alt: ["clothes", "shoes"],
          first: ["Standing at Arafah", "Throwing pebbles", "Cutting the hair"]
        }),
        seed("stations-review", "Big quiz", "The great stations of Hajj are remembered through sequence, du'a, patience, and dhikr.", 5, { kind: "review", lessonType: "mastery", line: "Arafah, Muzdalifah, Mina, then the sacrifice and haircut." })
      ]},
      { id: "hajj-lessons", title: "Lessons after Hajj", description: "Carry humility, unity, patience, and obedience back into life after pilgrimage.", order: 4, difficultyRange: [2, 5], sourceKeys: ["quran_3_97", "quran_22_27"], lessons: [
        seed("humility", "All the same", "Hajj strips away status and teaches standing equal before Allah.", 2, {
          line: "In Hajj, rich and poor wear the same simple [clothes].",
          alt: ["crowns", "medals"],
          why: "Everyone stands equal before Allah."
        }),
        seed("unity", "One ummah", "Pilgrimage shows the unity of believers through one worship and one direction.", 3, {
          line: "Muslims from every country face one [Ka'bah] together.",
          alt: ["mountain", "palace"]
        }),
        seed("patience", "Be patient", "Crowds, heat, and delay should teach patience rather than raw frustration.", 4, {
          line: "Hajj teaches [patience] in big crowds and hot sun.",
          alt: ["anger", "pushing"],
          why: "Allah says there is no arguing in Hajj."
        }),
        seed("after-the-return", "Coming home", "The journey should leave marks on repentance, worship, and discipline after returning home.", 4, {
          source: "hadith_bukhari_1521",
          line: "A good Hajj leaves you free of [sins], like a newborn.",
          alt: ["friends", "money"],
          why: "That is for a Hajj without bad words or bad deeds."
        }),
        seed("hajj-review", "Big quiz", "Hajj joins duty, order, sacred places, and a changed life.", 5, { kind: "review", lessonType: "mastery", line: "Hajj teaches humility, unity, patience, and a fresh start." })
      ]}
    ]
  }
);
