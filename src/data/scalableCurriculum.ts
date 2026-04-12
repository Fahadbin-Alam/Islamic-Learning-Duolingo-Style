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
  misconception?: string;
  sourceKeys?: string[];
};

type BranchSeed = {
  id: string;
  title: string;
  description: string;
  order: number;
  difficultyRange: [DifficultyTier, DifficultyTier];
  sourceKeys: string[];
  surahName?: string;
  ayahRange?: string;
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
  pathStyle?: LearningSection["pathStyle"];
  branches: BranchSeed[];
};

type ExpandedContent = {
  course: LearningCourse;
  lessonsById: Record<string, Lesson>;
};

type TopicBank = Record<TopicId, string[]>;

function quranSource(id: string, title: string, reference: string, url: string, summary: string): LessonSource {
  return {
    id,
    site: "Quran.com",
    category: "tafsir",
    title,
    url,
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
    url,
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
    url,
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

const SOURCE_LIBRARY: Record<string, LessonSource> = {
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
  quran_9_60: quranSource("quran_9_60", "Recipients of zakat", "Quran 9:60", "https://quran.com/9", "This verse names the categories eligible for zakat."),
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
  quran_33_21: quranSource("quran_33_21", "The Messenger as an example", "Quran 33:21", "https://quran.com/33", "The Messenger is the beautiful model for those seeking Allah and the Last Day."),
  quran_33_6: quranSource("quran_33_6", "The Mothers of the Believers", "Quran 33:6", "https://quran.com/33", "The wives of the Prophet hold a special place in the believing community."),
  quran_36: quranSource("quran_36", "Surah Ya-Sin", "Quran 36", "https://quran.com/36", "Ya-Sin brings revelation, signs, resurrection, and accountability into focus."),
  quran_48_29: quranSource("quran_48_29", "Traits of the believers with the Messenger", "Quran 48:29", "https://quran.com/48", "This verse paints mercy between believers and strength upon truth."),
  quran_57_22_23: quranSource("quran_57_22_23", "Qadar and perspective", "Quran 57:22-23", "https://quran.com/57", "These verses train the heart not to break under loss or become arrogant in gain."),
  quran_59_22_24: quranSource("quran_59_22_24", "Beautiful names of Allah", "Quran 59:22-24", "https://quran.com/59", "These verses bring the learner into awe of Allah's names and attributes."),
  quran_66_11: quranSource("quran_66_11", "The prayer of Asiyah", "Quran 66:11", "https://quran.com/66", "Asiyah is honored for faith and longing for Allah despite oppression."),
  quran_67: quranSource("quran_67", "Surah Al-Mulk", "Quran 67", "https://quran.com/67", "Al-Mulk opens with Allah's dominion and the testing nature of life."),
  quran_112: quranSource("quran_112", "Surah Al-Ikhlas", "Quran 112", "https://quran.com/112", "Al-Ikhlas teaches pure tawhid and Allah's unmatched oneness."),
  hadith_riyad_844: hadithSource("hadith_riyad_844", "The excellence of salam", "Riyad as-Salihin 844", "https://sunnah.com/riyadussalihin:844", "Abdullah bin Amr; gathered by Imam an-Nawawi from Al-Bukhari and Muslim", "Muttafaqun alayh", "A beautiful act of Islam is greeting people with salam whether you know them or not."),
  hadith_bukhari_5376: hadithSource("hadith_bukhari_5376", "Mention Allah's name before eating", "Sahih al-Bukhari 5376", "https://sunnah.com/bukhari:5376", "Umar bin Abi Salamah; collected by Imam al-Bukhari", "Sahih", "The Prophet taught saying Allah's name and eating with the right hand."),
  hadith_muslim_224: hadithSource("hadith_muslim_224", "Purification before accepted prayer", "Sahih Muslim 224", "https://sunnah.com/muslim:224", "Abu Hurairah; collected by Imam Muslim", "Sahih", "Prayer is not accepted without purification."),
  hadith_muslim_2992: hadithSource("hadith_muslim_2992", "Sneezing manners", "Sahih Muslim 2992", "https://sunnah.com/muslim:2992", "Abu Musa al-Ashari; collected by Imam Muslim", "Sahih", "If someone sneezes and praises Allah, the other Muslim replies with mercy."),
  hadith_bukhari_164: hadithSource("hadith_bukhari_164", "Uthman showed the Prophet's wudu", "Sahih al-Bukhari 164", "https://sunnah.com/bukhari:164", "Humran, the freed slave of Uthman; collected by Imam al-Bukhari", "Sahih", "Uthman demonstrated the wudu of the Prophet so Muslims could learn the order carefully."),
  hadith_bukhari_631: hadithSource("hadith_bukhari_631", "Pray as you have seen me pray", "Sahih al-Bukhari 631", "https://sunnah.com/bukhari:631", "Malik bin Al-Huwairith; collected by Imam al-Bukhari", "Sahih", "The Prophet instructed believers to model their prayer on his prayer."),
  hadith_abudawud_730: hadithSource("hadith_abudawud_730", "Bowing and rising in prayer", "Sunan Abi Dawud 730", "https://sunnah.com/abudawud:730", "Abu Humayd al-Sa'idi; collected by Imam Abu Dawud", "Sahih", "This narration describes the Prophet's bowing and rising with steadiness."),
  hadith_abudawud_856: hadithSource("hadith_abudawud_856", "Pray with calm stillness", "Sunan Abi Dawud 856", "https://sunnah.com/abudawud:856", "Abu Hurairah; collected by Imam Abu Dawud", "Sahih", "The Prophet corrected a man's prayer by teaching calm completeness in each pillar."),
  hadith_abudawud_933: hadithSource("hadith_abudawud_933", "Calmness between sajdahs", "Sunan Abi Dawud 933", "https://sunnah.com/abudawud:933", "Abu Hurairah; collected by Imam Abu Dawud", "Sahih", "The sitting between sajdahs is part of the composed flow of prayer."),
  hadith_abudawud_974: hadithSource("hadith_abudawud_974", "Taslim ends the prayer", "Sunan Abi Dawud 974", "https://sunnah.com/abudawud:974", "Ali bin Abi Talib; collected by Imam Abu Dawud", "Hasan", "The prayer closes with taslim."),
  hadith_nasai_910: hadithSource("hadith_nasai_910", "No salah without Fatihat al-Kitab", "Sunan an-Nasa'i 910", "https://sunnah.com/nasai/11/35", "Ubadah bin As-Samit; collected by Imam an-Nasa'i", "Sahih", "Reciting Al-Fatihah is central in prayer."),
  hadith_nasai_1055: hadithSource("hadith_nasai_1055", "Sami' Allahu liman hamidah", "Sunan an-Nasa'i 1055", "https://sunnah.com/nasai:1055", "Wa'il bin Hujr; collected by Imam an-Nasa'i", "Sahih", "Wa'il described the Prophet's rising from ruku and praising Allah."),
  hadith_nasai_1278: hadithSource("hadith_nasai_1278", "The tashahhud", "Sunan an-Nasa'i 1278", "https://sunnah.com/nasai:1278", "Ibn Mas'ud; collected by Imam an-Nasa'i", "Sahih", "The Prophet taught the wording of the tashahhud carefully."),
  hadith_tirmidhi_270: hadithSource("hadith_tirmidhi_270", "Seven bones in sujud", "Jami` at-Tirmidhi 270", "https://sunnah.com/tirmidhi:270", "Ibn Abbas; collected by Imam at-Tirmidhi", "Hasan Sahih", "The Prophet taught that prostration is done on seven body parts."),
  hadith_bukhari_6029: hadithSource("hadith_bukhari_6029", "Mercy is at the heart of character", "Sahih al-Bukhari 6029", "https://sunnah.com/bukhari:6029", "Jarir bin Abdullah; collected by Imam al-Bukhari", "Sahih", "Mercy is at the heart of Muslim character."),
  hadith_muslim_2607: hadithSource("hadith_muslim_2607", "Truth leads to righteousness", "Sahih Muslim 2607c", "https://sunnah.com/muslim:2607c", "Abdullah ibn Mas'ud; collected by Imam Muslim", "Sahih", "Truthfulness trains the soul toward righteousness."),
  hadith_tirmidhi_2689: hadithSource("hadith_tirmidhi_2689", "Good character is weighty", "Jami` at-Tirmidhi 2689", "https://sunnah.com/tirmidhi:2689", "Abu Darda; collected by Imam at-Tirmidhi", "Hasan", "Nothing is heavier on the scale than good character."),
  hadith_bukhari_3433: hadithSource("hadith_bukhari_3433", "The excellence of Khadijah", "Sahih al-Bukhari 3433", "https://sunnah.com/bukhari:3433", "Abu Hurairah; collected by Imam al-Bukhari", "Sahih", "Khadijah is honored with glad tidings from Allah."),
  hadith_bukhari_3770: hadithSource("hadith_bukhari_3770", "Knowledge and transmission from Aishah", "Sahih al-Bukhari 3770", "https://sunnah.com/bukhari:3770", "Narrations about Aishah; collected by Imam al-Bukhari", "Sahih", "Aishah carried deep knowledge and transmitted much to the Ummah."),
  hadith_bukhari_4987: hadithSource("hadith_bukhari_4987", "Hafsah and preservation", "Sahih al-Bukhari 4987", "https://sunnah.com/bukhari:4987", "Zaid bin Thabit and reports around compilation; collected by Imam al-Bukhari", "Sahih", "Hafsah's copy played an important role in preserving written Quranic material."),
  video_wudu_1: videoSource("video_wudu_1", "Wudu guide 1", "https://youtu.be/6kt_POiIVZE?si=6KbLFWt1QZgJvDpt", "A step-by-step walk-through of wudu."),
  video_wudu_2: videoSource("video_wudu_2", "Wudu guide 2", "https://youtu.be/P29LMOHhpjE?si=x1H_8H_kQgI2dCFP", "A second wudu walk-through for repetition and corrections."),
  video_wudu_3: videoSource("video_wudu_3", "Wudu guide 3", "https://youtu.be/iaj1wlQHRFA?si=2_nOF0QOGt4k5Nhv", "A third wudu walk-through to reinforce order and common mistakes."),
  video_salah_1: videoSource("video_salah_1", "Prayer guide 1", "https://youtu.be/vx1rz-28HNk?si=zXJCptHWOBVFk7VB", "A visual guide to the Sunnah prayer method."),
  video_salah_2: videoSource("video_salah_2", "Prayer guide 2", "https://youtu.be/2ZEmsdEOpbk", "A second visual guide through the prayer flow."),
  video_salah_3: videoSource("video_salah_3", "Prayer guide 3", "https://youtu.be/di0u-K09Su4", "A detailed prayer walk-through with attention to posture and errors.")
};

const OBJECTIVE_DISTRACTORS: TopicBank = {
  foundation: ["Treat Islamic phrases like culture only", "Rush through the day without remembrance", "Assume small sunnahs never shape character"],
  prayer: ["Reduce salah to quick motions", "Treat purification and posture as optional", "Hope prayer grows without learning the order"],
  aqidah: ["Treat belief as emotion without revelation", "Separate tawhid from daily obedience", "Reduce iman to vague identity"],
  fasting: ["Treat fasting as hunger without taqwa", "Focus on the body and ignore the tongue", "Assume Ramadan only changes eating times"],
  zakat: ["Treat zakat as random generosity", "Protect wealth while ignoring its duty", "Confuse zakat with image"],
  hajj: ["Reduce Hajj to travel without submission", "Treat rites as scenery", "Forget that ability shapes obligation"],
  manners: ["Treat adab as decoration", "Assume truthfulness matters only when convenient", "Ignore the rights of parents and neighbors"],
  marriage: ["Build a home on image instead of mercy", "Use rights as weapons", "Forget that sakinah grows through worship"],
  sahabah: ["Read the companions as distant history only", "Treat courage without knowledge as the model", "Forget the companions carried revelation with sacrifice"],
  prophets: ["Treat prophetic stories as disconnected tales", "Ignore the repeating themes of patience and tawhid", "Read revelation history without applying its lessons"],
  women_of_the_book: ["Reduce honored women to names without lessons", "Forget the courage and worship in their stories", "Treat these lives as distant from Muslim growth"],
  quran_tafseer: ["Read surahs without theme or reflection", "Memorize words without asking what Allah teaches", "Treat tafsir like an optional extra"]
};

const PRACTICE_DISTRACTORS: TopicBank = {
  foundation: ["Skip the phrase and trust intention alone", "Answer people however the moment feels", "Wait for perfect knowledge before starting"],
  prayer: ["Rush the action and fix it later", "Copy movements without understanding", "Assume sincerity replaces the taught method"],
  aqidah: ["Accept any belief language that sounds spiritual", "Separate knowledge of Allah from worship", "Avoid revisiting weak belief questions"],
  fasting: ["Protect the stomach and neglect the tongue", "Treat hunger as the main goal", "Make Ramadan reactive instead of intentional"],
  zakat: ["Delay zakat until the duty becomes blurry", "Guess recipients without learning them", "Turn charity into a mood instead of obedience"],
  hajj: ["Learn the sites but not the meaning", "Move with the crowd without understanding", "Treat the journey as tourism"],
  manners: ["Choose sharpness when patience is possible", "Defend ego first and adab later", "Let pressure erase the sunnah response"],
  marriage: ["Win the argument before protecting the home", "Use rights language without gentleness", "Let tiredness replace intentional mercy"],
  sahabah: ["Admire the companions without imitating them", "Focus on names but not traits", "Keep the stories away from present obedience"],
  prophets: ["Read the story and skip the lesson", "Notice the miracle but ignore the patience", "Treat tests as proof that guidance failed"],
  women_of_the_book: ["Remember the name but not the virtue", "Skip the lesson because the life feels distant", "Miss how faith looked under pressure"],
  quran_tafseer: ["Recite quickly without pausing over meaning", "Learn vocabulary without connecting it to theme", "Treat reflection as optional once the text is familiar"]
};

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
  "women_of_the_book"
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

function lessonPractice(topicId: TopicId, title: string, fallback?: string) {
  if (fallback) return fallback;
  return {
    prayer: `Practice ${title.toLowerCase()} with calmness, order, and awareness before the next prayer.`,
    quran_tafseer: `Pause with ${title.toLowerCase()} long enough to connect the surah to worship and daily life.`,
    aqidah: `Return to ${title.toLowerCase()} when beliefs or words start getting blurry.`,
    fasting: `Use ${title.toLowerCase()} to guard both the body and the heart in Ramadan.`,
    zakat: `Let ${title.toLowerCase()} guide real giving decisions instead of guesswork.`,
    hajj: `Study ${title.toLowerCase()} as worship, sequence, and submission together.`,
    manners: `Carry ${title.toLowerCase()} into ordinary social moments instead of waiting for ideal ones.`,
    marriage: `Use ${title.toLowerCase()} to protect mercy inside the home when it is tested.`,
    sahabah: `Read ${title.toLowerCase()} as a model to imitate, not a story to admire from far away.`,
    prophets: `Translate ${title.toLowerCase()} into present-day obedience, patience, and trust.`,
    women_of_the_book: `Turn ${title.toLowerCase()} into a present-day virtue worth practicing.`,
    foundation: `Repeat ${title.toLowerCase()} in the next small moment where it belongs.`
  }[topicId];
}

function lessonMisconception(title: string, fallback?: string) {
  return fallback ?? `${title} can stay fuzzy because the basics are already enough.`;
}

function buildChallenges(topicId: TopicId, lessonId: string, lesson: LessonSeed) {
  const objectiveOptions = rotate(OBJECTIVE_DISTRACTORS[topicId], Math.abs(hashCode(`${lessonId}:focus`)) % 3);
  const practiceOptions = rotate(PRACTICE_DISTRACTORS[topicId], Math.abs(hashCode(`${lessonId}:practice`)) % 3);
  const focusChoices = rotate([lesson.focus, ...objectiveOptions], Math.abs(hashCode(`${lessonId}:focus:order`)) % 4);
  const practice = lessonPractice(topicId, lesson.title, lesson.practice);
  const practiceChoices = rotate([practice, ...practiceOptions], Math.abs(hashCode(`${lessonId}:practice:order`)) % 4);
  const misconception = lessonMisconception(lesson.title, lesson.misconception);
  const challenges: Challenge[] = [
    mc(`${lessonId}_focus`, `What is the main learning point in "${lesson.title}"?`, focusChoices, lesson.focus, `${lesson.focus} This lesson is meant to deepen understanding, not just recognition.`),
    mc(`${lessonId}_practice`, "Which response best fits this lesson in real life?", practiceChoices, practice, `${practice} This lesson should become practice, not just information.`),
    tf(`${lessonId}_watchout`, misconception, false, `Watch out for this mistake: ${misconception} ${lesson.focus}`)
  ];
  if (lesson.difficulty >= 4) {
    const correctionChoices = rotate([misconception, practice, lesson.focus, `Review ${lesson.title.toLowerCase()} from its source text before reacting.`], Math.abs(hashCode(`${lessonId}:correction`)) % 4);
    challenges.push(mc(`${lessonId}_correction`, "Which statement most clearly needs correction?", correctionChoices, misconception, `${misconception} This is the kind of confusion this lesson is trying to clear.`));
  }
  return challenges;
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
        title: "Daily phrase rhythm",
        description: "Move beyond single phrases and learn when Muslims naturally remember Allah through the day.",
        order: 3,
        difficultyRange: [1, 3],
        sourceKeys: ["hadith_riyad_844", "hadith_bukhari_5376", "hadith_muslim_2992"],
        lessons: [
          seed("morning-remembrance", "Begin the day with remembrance", "The day opens better when the tongue remembers Allah early.", 1),
          seed("thanks-language", "Language of gratitude", "Muslim speech regularly returns blessings back to Allah.", 1),
          seed("future-speech", "Speaking about the future", "A Muslim speaks about future plans with humility before Allah.", 2, { practice: "Use InshaAllah when speaking about future plans, with humility not laziness." }),
          seed("seeking-forgiveness", "Returning with Astaghfirullah", "Seeking forgiveness keeps the heart soft after mistakes and slips.", 2),
          seed("phrase-review", "Phrase flow review", "Daily phrases work best when they are used in the right moment with the right heart.", 3, { kind: "review", lessonType: "review" })
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
          seed("entering-home", "Entering with peace", "The home should be entered with calm words and awareness of Allah.", 1),
          seed("table-beginning", "Start food the right way", "Food is a daily worship moment when it begins with Allah's name.", 1),
          seed("right-hand", "Eat with discipline", "The Sunnah joins remembrance with disciplined physical manners.", 2),
          seed("after-food", "Finish with gratitude", "A Muslim closes the meal by recognizing Allah's provision.", 2),
          seed("home-review", "Home adab review", "The home becomes a training ground where phrases and manners reinforce one another.", 3, { kind: "review", lessonType: "review" })
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
          seed("clean-before-prayer", "Clean before prayer", "A Muslim learns early that prayer is approached with purity and seriousness.", 2),
          seed("hear-the-call", "Answer the prayer rhythm", "Prayer creates structure in the day by returning the heart again and again to Allah.", 2),
          seed("prepare-the-space", "Prepare your place", "A learner should begin noticing clothing, place, and readiness before worship.", 3),
          seed("follow-the-model", "Follow the taught model", "Islamic worship becomes strong by following what was taught, not by personal improvisation.", 3, { misconception: "Worship becomes more sincere when everyone invents a personal style." }),
          seed("starter-worship-review", "Starter worship review", "Foundational worship habits are small in form but large in the direction they set.", 4, { kind: "review", lessonType: "review" })
        ]
      }
    ]
  },
  {
    id: "prayer-expansion",
    topicId: "prayer",
    title: "Prayer",
    description: "A deep prayer world that starts with readiness and grows into confident, careful salah.",
    badge: "Prayer World",
    focus: "Times, conditions, wudu, step-by-step salah, repair, congregation, and khushu.",
    mascot: "muslim_man",
    accentColor: "#3A9FE8",
    branches: [
      {
        id: "prayer-importance-and-times",
        title: "Importance and times",
        description: "Learn why salah anchors the day, how the five prayers are ordered, and why timing matters.",
        order: 3,
        difficultyRange: [1, 3],
        sourceKeys: ["hadith_bukhari_631", "quran_33_21"],
        lessons: [
          seed("why-salah-matters", "Why Salah Matters", "Salah is a daily pillar that keeps a Muslim returning to Allah through the day.", 1),
          seed("five-daily-prayers", "Know the five daily prayers", "The learner should know the named prayers and that the day is built around them.", 1),
          seed("order-of-the-day", "Order of the day", "The order of the prayers gives the learner a stable rhythm from dawn to night.", 2),
          seed("guard-the-time", "Guard the time", "Prayer grows stronger when its time is honored and prepared for.", 2),
          seed("times-review", "Prayer time review", "The prayer day is a structure of worship, not a list of optional moments.", 3, { kind: "review", lessonType: "review" })
        ]
      },
      {
        id: "prayer-conditions-and-readiness",
        title: "Conditions and readiness",
        description: "Build the pre-prayer habits that make salah careful: qiblah, awrah, place, and calm readiness.",
        order: 4,
        difficultyRange: [1, 4],
        sourceKeys: ["hadith_abudawud_856", "quran_33_21"],
        lessons: [
          seed("face-the-qiblah", "Face the qiblah", "Prayer begins with direction and intentional readiness before Allah.", 1),
          seed("cover-awrah", "Cover the awrah", "Readiness for prayer includes clothing that respects the worship itself.", 2),
          seed("clean-place", "Choose a clean place", "A clean prayer place protects the composure and validity of worship.", 2),
          seed("adhan-and-iqamah", "Adhan and iqamah basics", "The calls around prayer teach that salah has public rhythm and order.", 3),
          seed("readiness-review", "Readiness review", "Good salah starts before takbir by gathering direction, clothing, place, and calm.", 4, { kind: "review", lessonType: "review" })
        ]
      },
      {
        id: "prayer-wudu-depth",
        title: "Wudu in detail",
        description: "Use the earlier video guidance and source texts to go deeper on order, sunnahs, and common mistakes.",
        order: 5,
        difficultyRange: [1, 5],
        sourceKeys: ["quran_5_6", "hadith_muslim_224", "hadith_bukhari_164", "video_wudu_1", "video_wudu_2", "video_wudu_3"],
        lessons: [
          seed("intention-and-beginning", "Begin wudu well", "Wudu should begin with awareness, order, and a serious intention to prepare for prayer.", 1),
          seed("fard-acts", "Know the core acts", "The learner should know the core body parts named in Quran 5:6 and not confuse them.", 2),
          seed("sunnah-details", "Sunnah details of washing", "The Sunnah teaches beauty and care around the core acts, not just bare minimum completion.", 3),
          seed("nullifiers-and-mistakes", "Nullifiers and common mistakes", "A strong learner knows what breaks wudu and what mistakes keep returning in practice.", 4),
          seed("wudu-mastery", "Wudu mastery check", "Wudu mastery means knowing the order, the core acts, the Sunnah touches, and the common errors.", 5, { kind: "review", lessonType: "mastery" })
        ]
      },
      {
        id: "prayer-salah-detail",
        title: "Salah step by step",
        description: "Go deeper than the basic steps and make each position of prayer deliberate and clear.",
        order: 6,
        difficultyRange: [2, 5],
        sourceKeys: ["hadith_bukhari_631", "hadith_abudawud_856", "hadith_abudawud_730", "hadith_nasai_910", "hadith_nasai_1055", "hadith_abudawud_933", "hadith_abudawud_974", "hadith_tirmidhi_270", "video_salah_1", "video_salah_2", "video_salah_3"],
        lessons: [
          seed("opening-stance", "Opening stance and takbir", "A good opening gathers posture, qiblah, calmness, and the opening takbir together.", 2),
          seed("standing-and-recitation", "Standing and recitation", "Standing is a pillar of calm recitation and attention.", 3),
          seed("ruku-and-rise", "Ruku and rising", "Ruku and rising teach measured movement, proper praise, and complete transitions.", 3),
          seed("sujud-and-sitting", "Sujud and sitting", "Sujud and the sitting between sajdahs must be done with stability, not collapsed into one blur.", 4),
          seed("tashahhud-and-taslim", "Tashahhud and taslim", "The prayer closes with taught words and an orderly ending, not with a vague stop.", 5, { kind: "review", lessonType: "mastery" })
        ]
      },
      {
        id: "prayer-repair-and-congregation",
        title: "Repair, congregation, and khushu",
        description: "Learn to spot mistakes, pray with others well, and keep the heart present.",
        order: 7,
        difficultyRange: [2, 5],
        sourceKeys: ["hadith_abudawud_856", "hadith_bukhari_631", "quran_33_21", "video_salah_2"],
        lessons: [
          seed("invalidators", "What breaks salah", "A learner needs to recognize which actions truly break the prayer and which do not.", 2),
          seed("common-mistakes", "Common mistakes in salah", "Most prayer mistakes come from haste, unclear order, and skipping stillness.", 3),
          seed("congregation-basics", "Congregation basics", "Prayer with others has order, following, and etiquette that the learner should know.", 4),
          seed("catching-and-making-up", "Catching raka'at and missed prayers", "A growing student should know how to think about joining late and repairing missed worship.", 4),
          seed("khushu", "Khushu and consistency", "Khushu is built through preparation, understanding, and repeated care, not wishful thinking.", 5, { kind: "review", lessonType: "mastery" })
        ]
      }
    ]
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
          seed("allah-alone", "Allah alone is worshiped", "The center of Islam is worshiping Allah alone without partners.", 1),
          seed("ikhlas-and-purity", "Purity in worship", "Surah Al-Ikhlas trains the heart to keep its belief about Allah pure and unmatched.", 2),
          seed("calling-on-allah", "Calling on Allah", "Du'a and hope should be directed to Allah with dependence and trust.", 3),
          seed("tawhid-in-daily-life", "Tawhid in daily life", "Tawhid is not abstract; it changes fear, hope, speech, and obedience.", 4),
          seed("tawhid-review", "Tawhid mastery", "Strong tawhid means guarding speech, worship, and reliance for Allah alone.", 4, { kind: "review", lessonType: "mastery" })
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
          seed("what-iman-covers", "What iman covers", "The pillars of iman name what a believer must hold with certainty.", 1),
          seed("angels-books-messengers", "Angels, books, and messengers", "These pillars teach that revelation reaches people through a real chain from Allah.", 2),
          seed("the-last-day", "The Last Day", "Belief in the Last Day reshapes urgency, repentance, and moral seriousness.", 3),
          seed("qadar", "Qadar and trust", "Belief in qadar steadies the heart without making it passive or careless.", 4),
          seed("iman-review", "Iman review", "The pillars of iman form one joined worldview, not separate facts to memorize and forget.", 4, { kind: "review", lessonType: "review" })
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
          seed("why-names-matter", "Why Allah's names matter", "Knowing Allah through His names deepens worship, fear, hope, and love.", 2),
          seed("mercy-and-knowledge", "Mercy and knowledge", "Allah's mercy and knowledge are not poetic extras; they reshape how the believer lives.", 3),
          seed("majesty-and-authority", "Majesty and authority", "Allah's sovereignty should create reverence and obedience, not only inspiration.", 4),
          seed("using-the-names", "Using the names in du'a", "The names of Allah should feed prayer, reliance, and repentance.", 4),
          seed("names-review", "Names and attributes review", "Belief about Allah should become more precise and more worshipful over time.", 5, { kind: "review", lessonType: "mastery" })
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
          seed("belief-and-obedience", "Belief and obedience", "True iman should make obedience more meaningful, not more distant.", 2),
          seed("belief-under-pressure", "Belief under pressure", "Real belief shows itself when fear, loss, or temptation press on the heart.", 3),
          seed("repentance-and-hope", "Repentance and hope", "Iman keeps the sinner from despair because Allah remains the door back.", 4),
          seed("certainty-and-humility", "Certainty with humility", "Strong belief makes a learner more grounded and humble, not proud and dismissive.", 4),
          seed("lived-iman-review", "Lived iman review", "Iman becomes deep when it explains how the believer worships, repents, fears, hopes, and stays steady.", 5, { kind: "review", lessonType: "mastery" })
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

function createGeneratedBranch(section: LearningSection, branch: BranchSeed) {
  const branchSources = uniqueById(branch.sourceKeys.map((key) => SOURCE_LIBRARY[key]).filter(Boolean));
  const nodes: LearningNode[] = [];
  const lessonsById: Record<string, Lesson> = {};

  branch.lessons.forEach((entry, index) => {
    const nodeId = `${branch.id}-${entry.slug}`;
    const lessonId = `lesson-${nodeId}`;
    const kind = entry.kind ?? defaultNodeKind(section.topicId, index, branch.lessons.length);
    const sources = uniqueById((entry.sourceKeys ?? branch.sourceKeys).map((key) => SOURCE_LIBRARY[key]).filter(Boolean));
    const xpReward = 8 + entry.difficulty * 2 + (kind === "review" ? 4 : 0);

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
      difficulty: entry.difficulty,
      surahName: entry.surahName ?? branch.surahName,
      ayahRange: entry.ayahRange ?? branch.ayahRange,
      sourceReferences: sources,
      masteryState: kind === "review" ? ("mastery" as const) : ("new" as const)
    });

    lessonsById[lessonId] = {
      id: lessonId,
      nodeId,
      branchId: branch.id,
      surahName: entry.surahName ?? branch.surahName,
      ayahRange: entry.ayahRange ?? branch.ayahRange,
      title: entry.title,
      intro: `${entry.focus} ${lessonPractice(section.topicId, entry.title, entry.practice)}`,
      lessonType: entry.lessonType ?? defaultLessonType(section.topicId, kind),
      difficulty: entry.difficulty,
      xpReward,
      sources,
      sourceReferences: sources,
      unlockRules: index === 0 ? [] : [`Complete ${nodes[index - 1].title}`],
      masteryState: kind === "review" ? ("mastery" as const) : ("learning" as const),
      challenges: buildChallenges(section.topicId, lessonId, entry)
    };
  });

  return {
    branch: {
      id: branch.id,
      topicId: section.topicId,
      title: branch.title,
      description: branch.description,
      order: branch.order,
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

  seedSection.branches.sort((left, right) => left.order - right.order).forEach((branchSeed) => {
    const built = createGeneratedBranch(section, branchSeed);
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
    if (section.topicId === "quran_tafseer") {
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
      { id: "prophets-early-messengers", title: "Early messengers", description: "Travel through the earliest lessons of humanity, repentance, warning, and trust.", order: 4, difficultyRange: [1, 3], sourceKeys: ["quran_21_25", "quran_33_21"], lessons: [
        seed("adam-and-repentance", "Adam and repentance", "The story of Adam teaches that the door back to Allah stays open through repentance.", 1),
        seed("nuh-and-patience", "Nuh and patience", "Nuh teaches long patience while calling people to truth.", 1),
        seed("hud-and-salih", "Hud and Salih", "These prophetic stories teach that pride and rejection ruin communities.", 2),
        seed("lut-and-purity", "Lut and moral clarity", "The story of Lut teaches moral courage and firmness in corruption.", 2),
        seed("early-prophets-review", "Early messengers review", "The early prophets teach tawhid, repentance, patience, and warning together.", 3, { kind: "review", lessonType: "review" })
      ]},
      { id: "prophets-family-and-sacrifice", title: "Family and sacrifice", description: "Move through Ibrahim's family, trust, and the tests that reshape generations.", order: 5, difficultyRange: [2, 4], sourceKeys: ["quran_3_97", "quran_22_27", "quran_12"], lessons: [
        seed("ibrahim-and-tawhid", "Ibrahim and tawhid", "Ibrahim models uncompromising tawhid under pressure from family and society.", 2),
        seed("ismail-and-submission", "Ismail and submission", "The family of Ibrahim teaches willing submission to Allah's command.", 2),
        seed("yaqub-and-sabr", "Ya'qub and beautiful patience", "Ya'qub teaches grief with trust and patience that keeps turning to Allah.", 3),
        seed("yusuf-and-purity", "Yusuf and purity", "Yusuf teaches chastity, wisdom, patience, and eventual relief after hardship.", 3),
        seed("family-review", "Family and sacrifice review", "This prophetic stretch teaches trust, sacrifice, purity, and patient hope.", 4, { kind: "review", lessonType: "review" })
      ]},
      { id: "prophets-power-and-deliverance", title: "Power and deliverance", description: "Learn from Musa, Harun, Dawud, Sulayman, and the test of leadership under Allah.", order: 6, difficultyRange: [2, 5], sourceKeys: ["quran_28_7", "quran_57_22_23", "quran_33_21"], lessons: [
        seed("musa-and-fear", "Musa and fear turned into mission", "Musa teaches how Allah turns fear into mission through trust and revelation.", 2),
        seed("harun-and-support", "Harun and supportive leadership", "Harun shows that prophetic work also needs support, partnership, and patience.", 3),
        seed("dawud-and-justice", "Dawud and justice", "Dawud teaches worship joined to judgment and responsible leadership.", 4),
        seed("sulayman-and-gratitude", "Sulayman and gratitude", "Sulayman teaches that power should increase gratitude, not pride.", 4),
        seed("power-review", "Leadership and deliverance review", "These prophets teach deliverance, justice, support, and grateful leadership.", 5, { kind: "review", lessonType: "mastery" })
      ]}
    ]
  },
  {
    id: "women-expansion",
    topicId: "women_of_the_book",
    title: "Women of the Book",
    description: "A deeper ordered path through women of the Quran and the Mothers of the Believers.",
    badge: "Women World",
    focus: "Trust, purity, courage, service, knowledge, and preserving revelation.",
    mascot: "hijabi",
    accentColor: "#D96C8E",
    branches: [
      { id: "women-quran-depth", title: "Women in the Quran", description: "Go deeper through women in the Quran and the virtues their stories teach.", order: 3, difficultyRange: [1, 4], sourceKeys: ["quran_28_7", "quran_66_11", "quran_19"], lessons: [
        seed("hawwa-and-return", "Hawwa and returning to Allah", "The earliest woman in revelation is remembered inside the lesson of repentance and return.", 1),
        seed("mother-of-musa-and-trust", "The mother of Musa and trust", "The mother of Musa teaches trust in Allah under fear and impossible pressure.", 2),
        seed("asiyah-and-steadfastness", "Asiyah and steadfast faith", "Asiyah teaches that faith can remain luminous even under tyrannical oppression.", 3),
        seed("maryam-and-purity", "Maryam and purity", "Maryam teaches worship, purity, patience, and trust in Allah's decree.", 3),
        seed("quran-women-review", "Women in the Quran review", "These women teach repentance, trust, steadfastness, and purity under pressure.", 4, { kind: "review", lessonType: "review" })
      ]},
      { id: "women-mothers-depth", title: "Mothers of the Believers", description: "Move in order through the Prophet's wives and the special gifts they gave the Ummah.", order: 4, difficultyRange: [2, 5], sourceKeys: ["quran_33_6", "hadith_bukhari_3433", "hadith_bukhari_3770", "hadith_bukhari_4987"], lessons: [
        seed("khadijah-and-support", "Khadijah and support", "Khadijah teaches support, reassurance, and sacrifice at the birth of revelation.", 2),
        seed("sawdah-and-stability", "Sawdah and stability", "Sawdah teaches steadiness, generosity, and the quiet stabilizing roles inside the Prophetic household.", 3),
        seed("aishah-and-knowledge", "Aishah and knowledge", "Aishah teaches intelligence, memory, worship, and transmission of the Sunnah.", 4),
        seed("hafsah-and-preservation", "Hafsah and preservation", "Hafsah teaches trust, dignity, and a key role in preserving written Quranic material.", 4),
        seed("mothers-review", "Mothers of the Believers review", "The Mothers of the Believers teach support, knowledge, service, and preserving the religion.", 5, { kind: "review", lessonType: "mastery" })
      ]},
      { id: "women-virtues-and-legacy", title: "Virtues and legacy", description: "Study the themes these women share: courage, worship, service, and carrying revelation.", order: 5, difficultyRange: [3, 5], sourceKeys: ["quran_33_6", "quran_66_11", "quran_19"], lessons: [
        seed("courage-under-pressure", "Courage under pressure", "Many honored women in revelation show faith under immense social pressure.", 3),
        seed("worship-and-devotion", "Worship and devotion", "Their legacy shows deep worship, not only public significance.", 4),
        seed("service-to-revelation", "Service to revelation", "Some of these women served revelation through support, preservation, or transmission.", 4),
        seed("lessons-for-today", "Lessons for today", "Their lives still teach modern learners how to be steady, pure, knowledgeable, and courageous.", 5),
        seed("women-legacy-review", "Women's legacy mastery review", "The women honored in revelation teach a connected legacy of worship, courage, trust, and service.", 5, { kind: "review", lessonType: "mastery" })
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
      { id: "manners-neighbors-and-guests", title: "Neighbors and guests", description: "Grow beyond basic kindness into the social adab that binds homes together.", order: 4, difficultyRange: [1, 4], sourceKeys: ["quran_4_36", "hadith_bukhari_6029"], lessons: [
        seed("neighbor-rights", "Neighbor rights", "Islamic manners extend beyond the self and family into the rights of neighbors.", 1),
        seed("guest-honor", "Honor the guest", "Guests should feel welcomed, not managed like a burden.", 2),
        seed("sharing-space", "Sharing space well", "Adab in shared spaces means patience, cleanliness, and not crowding others with selfishness.", 2),
        seed("helping-neighbors", "Helping nearby people", "Mercy becomes concrete when help reaches nearby people in ordinary needs.", 3),
        seed("social-adab-review", "Neighbor and guest review", "Good adab should be visible in the home, at the door, and around daily contact.", 4, { kind: "review", lessonType: "review" })
      ]},
      { id: "manners-emotional-discipline", title: "Emotional discipline", description: "Learn how patience, restraint, and soft strength protect Muslim character.", order: 5, difficultyRange: [2, 5], sourceKeys: ["hadith_bukhari_6029", "hadith_tirmidhi_2689"], lessons: [
        seed("anger-and-restraint", "Anger and restraint", "Strong manners often show most clearly when anger rises.", 2),
        seed("gentleness", "Gentleness with strength", "Gentleness is not weakness; it is disciplined strength governed by revelation.", 3),
        seed("apologizing", "Repairing with apology", "A well-mannered Muslim knows how to repair harm, not only avoid it.", 3),
        seed("self-awareness", "Notice your own patterns", "Growth in character requires noticing when and where the self keeps slipping.", 4),
        seed("emotional-review", "Emotional discipline review", "Adab under pressure needs mercy, self-control, humility, and repair.", 5, { kind: "review", lessonType: "mastery" })
      ]},
      { id: "manners-public-conduct", title: "Public conduct", description: "Take adab into masjid, public spaces, disagreement, and online life.", order: 6, difficultyRange: [2, 5], sourceKeys: ["quran_9_119", "hadith_tirmidhi_2689"], lessons: [
        seed("masjid-adab", "Masjid adab", "The masjid should train reverence, restraint, and respect for others in worship.", 2),
        seed("disagreement", "Disagreement with adab", "Truth and firmness do not excuse mockery, contempt, or reckless speech.", 3),
        seed("public-posture", "Public posture", "A Muslim should feel watched by Allah in posture, speech, and the way space is taken up.", 4),
        seed("online-adab", "Online adab", "Digital spaces still test the tongue, ego, and manners of a Muslim.", 4),
        seed("public-review", "Public conduct review", "Adab must survive the masjid, disagreement, crowds, and screens if it is real.", 5, { kind: "review", lessonType: "mastery" })
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
        seed("rights-are-trusts", "Rights are trusts", "Rights in marriage are given to protect the home, not to feed ego.", 2),
        seed("mutual-dignity", "Mutual dignity", "A home of sakinah needs dignity for both husband and wife.", 2),
        seed("provision-and-care", "Provision and care", "Marriage includes concrete care, provision, and emotional steadiness.", 3),
        seed("trust-and-secrets", "Trust and private trust", "A marriage needs protection of private trust and confidentiality.", 3),
        seed("rights-review", "Rights review", "Marriage rights work best when they are carried as trusts under Allah.", 4, { kind: "review", lessonType: "review" })
      ]},
      { id: "marriage-conflict-and-repair", title: "Conflict and repair", description: "Learn how to disagree, repent, repair, and keep mercy alive under strain.", order: 4, difficultyRange: [2, 5], sourceKeys: ["quran_30_21", "quran_33_21"], lessons: [
        seed("argue-with-adab", "Disagree with adab", "Conflict in marriage still has to remain inside Islamic character.", 2),
        seed("listen-before-answering", "Listen before answering", "Homes calm down when each person actually hears the other before reacting.", 3),
        seed("repair-after-harm", "Repair after harm", "Homes survive by repair, apology, and sincere course correction.", 3),
        seed("bring-in-help-wisely", "Bring in help wisely", "Some conflicts need counsel and outside help, but with wisdom and boundaries.", 4),
        seed("conflict-review", "Conflict mastery review", "Mercy in marriage is proven under tension, not only in calm moments.", 5, { kind: "review", lessonType: "mastery" })
      ]},
      { id: "marriage-spiritual-home", title: "Spiritual home", description: "Build the home around worship, du'a, patience, and shared direction toward Allah.", order: 5, difficultyRange: [2, 5], sourceKeys: ["quran_30_21", "quran_33_21"], lessons: [
        seed("pray-together", "Bring prayer into the home", "A home becomes steadier when worship is not left outside the marriage.", 2),
        seed("dua-for-the-home", "Make du'a for the home", "Homes need repeated turning to Allah for mercy, repair, and guidance.", 3),
        seed("patience-and-growth", "Grow through patience", "Marriage requires patience with imperfection while still moving toward improvement.", 4),
        seed("raising-the-tone", "Raise the tone of the home", "Speech, cleanliness, gratitude, and worship all set the tone of a house.", 4),
        seed("home-review", "Spiritual home review", "The best homes are built by mercy, worship, patience, and repeated repair.", 5, { kind: "review", lessonType: "mastery" })
      ]}
    ]
  },
  {
    id: "sahabah-expansion",
    topicId: "sahabah",
    title: "Sahabah",
    description: "A broader companion world with sacrifice, leadership, service, and courage under revelation.",
    badge: "Companion World",
    focus: "Early believers, leadership, service, truthfulness, and sacrifice.",
    mascot: "muslim_man",
    accentColor: "#0C9F8C",
    branches: [
      { id: "sahabah-early-believers", title: "Early believers", description: "Go deeper into the first wave of faith, cost, and loyalty around revelation.", order: 3, difficultyRange: [1, 4], sourceKeys: ["quran_9_100", "quran_48_29"], lessons: [
        seed("first-response", "Responding early to truth", "The early believers teach what it means to respond before comfort is guaranteed.", 1),
        seed("sacrifice-for-faith", "Sacrifice for faith", "The Sahabah carried cost, not just honor, in supporting revelation.", 2),
        seed("loyalty-to-the-prophet", "Loyalty to the Prophet", "The Sahabah's relationship with the Prophet was built on obedience, love, and protection.", 2),
        seed("service-over-status", "Service over status", "Many companions became great by service, not by image or comfort.", 3),
        seed("early-review", "Early believers review", "The earliest believers teach fast response, sacrifice, obedience, and love for revelation.", 4, { kind: "review", lessonType: "review" })
      ]},
      { id: "sahabah-service-and-character", title: "Service and character", description: "Learn how humility, generosity, and truthfulness shaped the companion generation.", order: 4, difficultyRange: [2, 5], sourceKeys: ["quran_48_29", "hadith_muslim_2607", "hadith_tirmidhi_2689"], lessons: [
        seed("truthful-hearts", "Truthful hearts", "The companions were not only brave; they were trained in truth and reliability.", 2),
        seed("generosity", "Generosity and open hands", "Service to Islam often showed up in open-handed generosity and support.", 3),
        seed("humility", "Humility in strength", "The Sahabah combined seriousness and leadership with humility before Allah.", 3),
        seed("steadfastness", "Steadfastness under pressure", "Companion character held even when pressure and fear arrived.", 4),
        seed("character-review", "Companion character review", "The Sahabah teach truth, service, humility, and steadfastness together.", 5, { kind: "review", lessonType: "mastery" })
      ]},
      { id: "sahabah-leadership-and-legacy", title: "Leadership and legacy", description: "Follow how companion leadership preserved revelation and carried the Ummah after the Prophet.", order: 5, difficultyRange: [2, 5], sourceKeys: ["quran_9_100", "quran_48_29"], lessons: [
        seed("leadership-with-revelation", "Leadership with revelation", "Companion leadership mattered because it was governed by revelation and accountability.", 2),
        seed("preserving-the-message", "Preserving the message", "The companions carried, protected, and transmitted the religion after the Prophet.", 3),
        seed("justice-and-mercy", "Justice and mercy", "Strong leadership in Islam needs both firmness and mercy.", 4),
        seed("following-their-way", "Following their way well", "Love for the Sahabah should mature into following their commitment to revelation.", 4),
        seed("legacy-review", "Legacy mastery review", "The companion legacy includes preservation, leadership, service, and a way of following revelation.", 5, { kind: "review", lessonType: "mastery" })
      ]}
    ]
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
        seed("opening-and-names", "Opening and names", "Al-Fatihah opens the Quran and frames the believer's relationship with Allah.", 1, { surahName: "Al-Fatihah", ayahRange: "1-7" }),
        seed("praise-and-lordship", "Praise and lordship", "The surah begins with praise of Allah before requests are made.", 2, { surahName: "Al-Fatihah", ayahRange: "1-4" }),
        seed("worship-and-help", "Worship and seeking help", "The center of the surah ties worship and dependence together in one verse.", 3, { surahName: "Al-Fatihah", ayahRange: "5" }),
        seed("straight-path", "The straight path", "The ending of Al-Fatihah teaches the believer to ask constantly for guidance and protection from deviation.", 3, { surahName: "Al-Fatihah", ayahRange: "6-7" }),
        seed("fatihah-review", "Al-Fatihah review", "Al-Fatihah teaches praise, worship, dependence, and a constant need for guidance.", 4, { kind: "review", lessonType: "review", surahName: "Al-Fatihah", ayahRange: "1-7" })
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
        seed("opening-guidance", "Opening guidance", "The opening of Al-Baqarah defines revelation as guidance for the muttaqun.", 1, { surahName: "Al-Baqarah", ayahRange: "1-5" }),
        seed("qualities-of-guided", "Qualities of the guided", "The surah names believing in the unseen, prayer, and spending as signs of guidance.", 2, { surahName: "Al-Baqarah", ayahRange: "2-5" }),
        seed("ayat-al-kursi", "Ayat al-Kursi inside Al-Baqarah", "Ayat al-Kursi brings Allah's life, knowledge, and authority into one towering passage.", 3, { surahName: "Al-Baqarah", ayahRange: "255" }),
        seed("ending-belief", "The ending of the surah", "The closing verses gather belief, obedience, and humble appeal for mercy.", 4, { surahName: "Al-Baqarah", ayahRange: "285" }),
        seed("baqarah-review", "Al-Baqarah review", "Al-Baqarah begins and ends by training the learner in guidance, belief, action, and awe.", 5, { kind: "review", lessonType: "mastery", surahName: "Al-Baqarah", ayahRange: "1-5, 255, 285" })
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
        seed("steadfastness", "Steadfastness", "Ali 'Imran repeatedly trains the believer to stay firm under pressure.", 1, { surahName: "Ali 'Imran" }),
        seed("holding-the-rope", "Holding together to revelation", "The surah teaches unity around revelation rather than drift into ego and fragmentation.", 2, { surahName: "Ali 'Imran" }),
        seed("truth-and-tests", "Truth and tests", "Ali 'Imran shows that being on truth does not remove tests; it teaches how to move through them.", 3, { surahName: "Ali 'Imran" }),
        seed("dialogue-and-clarity", "Dialogue and clarity", "The surah teaches clarity with people of other revelations while staying rooted in truth.", 4, { surahName: "Ali 'Imran" }),
        seed("imran-review", "Ali 'Imran review", "Ali 'Imran trains firmness, unity, clarity, and patience under trial.", 5, { kind: "review", lessonType: "review", surahName: "Ali 'Imran" })
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
        seed("social-justice", "Justice and responsibility", "An-Nisa builds a community through justice and careful treatment of rights.", 1, { surahName: "An-Nisa" }),
        seed("rights-of-people", "Rights of people", "The surah repeatedly protects people whose rights are easy to neglect.", 2, { surahName: "An-Nisa" }),
        seed("family-duty", "Family duty and care", "An-Nisa links family relationships to accountability before Allah.", 3, { surahName: "An-Nisa" }),
        seed("belief-and-order", "Belief and social order", "The surah joins belief with law, order, and accountability in social life.", 4, { surahName: "An-Nisa" }),
        seed("nisa-review", "An-Nisa review", "An-Nisa is a surah of justice, rights, family duty, and accountable belief.", 5, { kind: "review", lessonType: "review", surahName: "An-Nisa" })
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
        seed("fulfill-covenants", "Fulfill covenants", "Al-Ma'idah opens with the demand to honor covenants and commitments.", 1, { surahName: "Al-Ma'idah" }),
        seed("purity-and-prayer", "Purity and prayer", "This surah teaches that purity belongs at the entrance of prayer.", 2, { surahName: "Al-Ma'idah", ayahRange: "6" }),
        seed("lawful-living", "Lawful living", "Al-Ma'idah trains the believer to care about halal and haram through obedience to Allah.", 3, { surahName: "Al-Ma'idah" }),
        seed("loyalty-to-revelation", "Loyalty to revelation", "The surah repeatedly calls believers back to revelation when communities drift.", 4, { surahName: "Al-Ma'idah" }),
        seed("maidah-review", "Al-Ma'idah review", "Al-Ma'idah teaches fulfilled covenants, lawful living, purity, and loyalty to guidance.", 5, { kind: "review", lessonType: "review", surahName: "Al-Ma'idah" })
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
        seed("beautiful-story", "The best of stories", "Surah Yusuf unfolds as one story that teaches trust through many turns.", 1, { surahName: "Yusuf" }),
        seed("temptation-and-purity", "Temptation and purity", "Yusuf teaches purity when temptation and opportunity meet.", 2, { surahName: "Yusuf" }),
        seed("prison-and-patience", "Patience in confinement", "The surah shows how patience and da'wah continue even in confinement.", 3, { surahName: "Yusuf" }),
        seed("forgiveness-and-reunion", "Forgiveness and reunion", "The ending of Yusuf teaches forgiveness, healing, and gratitude after long pain.", 4, { surahName: "Yusuf" }),
        seed("yusuf-review", "Surah Yusuf review", "Surah Yusuf gathers temptation, patience, wisdom, da'wah, and forgiveness into one path.", 5, { kind: "review", lessonType: "mastery", surahName: "Yusuf" })
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
        seed("mercy-at-the-opening", "Mercy at the opening", "Surah Maryam opens in a climate of mercy, intimate du'a, and divine care.", 1, { surahName: "Maryam" }),
        seed("family-and-dua", "Family and du'a", "The surah shows families held, tested, and guided through prayer and supplication.", 2, { surahName: "Maryam" }),
        seed("maryam-her-trust", "Maryam's trust", "Maryam stands as a model of worship, purity, and trust under an impossible decree.", 3, { surahName: "Maryam" }),
        seed("prophetic-links", "The prophets inside the surah", "The surah links multiple prophets through prayer, worship, and Allah's care.", 4, { surahName: "Maryam" }),
        seed("maryam-review", "Surah Maryam review", "Surah Maryam is a surah of mercy, prayer, family hope, and pure worship under trial.", 5, { kind: "review", lessonType: "review", surahName: "Maryam" })
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
        seed("faith-under-trial", "Faith under trial", "Al-Kahf teaches holding faith when environments turn hostile.", 2, { surahName: "Al-Kahf" }),
        seed("wealth-and-gardens", "Wealth and gardens", "The surah teaches perspective about wealth, status, and what actually lasts.", 3, { surahName: "Al-Kahf" }),
        seed("knowledge-and-khidr", "Knowledge and humility", "The story with Khidr teaches humility before what Allah knows beyond us.", 4, { surahName: "Al-Kahf" }),
        seed("power-and-dhulqarnayn", "Power and responsibility", "Dhul-Qarnayn teaches power under gratitude, justice, and responsible service.", 4, { surahName: "Al-Kahf" }),
        seed("kahf-review", "Surah Al-Kahf review", "Surah Al-Kahf is a map for protecting faith through trials of belonging, wealth, knowledge, and power.", 5, { kind: "review", lessonType: "mastery", surahName: "Al-Kahf" })
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
        seed("revelation-and-warning", "Revelation and warning", "Ya-Sin opens with revelation and the seriousness of warning a heedless people.", 2, { surahName: "Ya-Sin" }),
        seed("signs-in-creation", "Signs in creation", "The surah moves the learner through signs in the world that point back to Allah.", 3, { surahName: "Ya-Sin" }),
        seed("resurrection", "Resurrection and return", "Ya-Sin repeatedly calls the believer back to life after death and final return.", 4, { surahName: "Ya-Sin" }),
        seed("messengers-and-response", "Messengers and human response", "The surah shows how people often resist messengers even when truth is clear.", 4, { surahName: "Ya-Sin" }),
        seed("yasin-review", "Surah Ya-Sin review", "Ya-Sin teaches revelation, signs, resurrection, and accountability together.", 5, { kind: "review", lessonType: "review", surahName: "Ya-Sin" })
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
        seed("dominion-of-allah", "Allah's dominion", "Al-Mulk opens by centering absolute dominion in Allah's hand alone.", 2, { surahName: "Al-Mulk" }),
        seed("life-as-test", "Life as a test", "The surah teaches that life and death are created as a test of action.", 3, { surahName: "Al-Mulk" }),
        seed("looking-at-creation", "Looking at creation carefully", "The surah urges careful repeated looking at the creation to see order and perfection.", 4, { surahName: "Al-Mulk" }),
        seed("warning-and-security", "Warning and false security", "Al-Mulk warns the heedless heart against false security before Allah.", 4, { surahName: "Al-Mulk" }),
        seed("mulk-review", "Surah Al-Mulk review", "Al-Mulk teaches sovereignty, accountability, reflection, and escape from heedlessness.", 5, { kind: "review", lessonType: "mastery", surahName: "Al-Mulk" })
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
        seed("why-fasting", "Why fasting exists", "Ramadan fasting is prescribed so the believer grows in taqwa.", 1),
        seed("ramadan-and-quran", "Ramadan and revelation", "Ramadan is tied to the Quran and should feel like a season of guidance.", 1),
        seed("what-taqwa-means", "What taqwa means here", "Taqwa in fasting means restraint, awareness, and obedience under Allah's gaze.", 2),
        seed("inner-discipline", "Inner discipline", "The best fast reshapes intention, secrecy, and daily restraint.", 2),
        seed("purpose-review", "Purpose review", "The purpose of fasting is spiritual training through obedience, not emptiness or performance.", 3, { kind: "review", lessonType: "review" })
      ]},
      { id: "fasting-times-and-rules", title: "Times and rules", description: "Learn the structure of suhur, fasting hours, and breaking the fast.", order: 2, difficultyRange: [1, 4], sourceKeys: ["quran_2_183_187"], lessons: [
        seed("suhur-and-intent", "Suhur and beginning the day", "The fasting day begins with intention and preparation, not with accidental drift.", 1),
        seed("start-and-end", "Knowing when the fast begins and ends", "The learner should connect fasting to real boundaries in the day, not vague guesses.", 2),
        seed("breaking-the-fast", "Breaking the fast well", "Iftar should be timely, grateful, and connected to remembrance.", 2),
        seed("who-is-exempt", "Who is exempt", "Islam teaches mercy and realism around hardship, illness, and inability.", 3),
        seed("timing-review", "Timing and rules review", "Good fasting requires understanding time, intention, mercy, and a proper ending.", 4, { kind: "review", lessonType: "review" })
      ]},
      { id: "fasting-protection", title: "Protecting the fast", description: "Move into invalidators, tongue discipline, and the mistakes that weaken the fast.", order: 3, difficultyRange: [2, 5], sourceKeys: ["quran_2_183_187"], lessons: [
        seed("invalidators", "What invalidates the fast", "A serious learner should know what clearly breaks the fast and what does not.", 2),
        seed("tongue-and-character", "Tongue and character", "The fast should protect speech, temper, and hidden reactions as much as the stomach.", 3),
        seed("forgetfulness-and-mercy", "Forgetfulness and mercy", "Mistakes in fasting should be thought through with mercy and knowledge, not panic.", 3),
        seed("social-pressure", "Fasting under pressure", "A learner should know how to protect the fast when school, work, or friends make it awkward.", 4),
        seed("protection-review", "Protecting the fast review", "The fast is protected by knowledge, restraint, and mercy together.", 5, { kind: "review", lessonType: "mastery" })
      ]},
      { id: "fasting-ramadan-growth", title: "Ramadan growth", description: "Turn Ramadan into a full worship season with nights, Quran, and reflection.", order: 4, difficultyRange: [2, 5], sourceKeys: ["quran_2_183_187"], lessons: [
        seed("night-worship", "Night worship in Ramadan", "The nights of Ramadan are for prayer, Quran, and returning to Allah.", 2),
        seed("quran-in-ramadan", "Quran in Ramadan", "Ramadan should make the Quran more central, not more distant.", 3),
        seed("laylat-al-qadr", "Seeking Laylat al-Qadr", "The last nights train the believer to chase worship with seriousness and hope.", 4),
        seed("after-ramadan", "Carry growth after Ramadan", "The point of Ramadan is changed worship, not a temporary mood that disappears at Eid.", 4),
        seed("ramadan-review", "Ramadan mastery review", "A mature Ramadan view joins taqwa, rules, mercy, Quran, night worship, and lasting change.", 5, { kind: "review", lessonType: "mastery" })
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
      { id: "zakat-meaning-and-duty", title: "Meaning and duty", description: "Start with why zakat exists and how it purifies wealth and the giver.", order: 1, difficultyRange: [1, 3], sourceKeys: ["quran_9_103", "quran_9_60"], lessons: [
        seed("what-zakat-is", "What zakat is", "Zakat is a required purification of wealth, not just optional generosity.", 1),
        seed("why-it-purifies", "Why zakat purifies", "Allah ties zakat to purification of wealth and soul.", 1),
        seed("obligation-and-seriousness", "Obligation and seriousness", "The learner should feel that zakat is a duty carried with care and planning.", 2),
        seed("nisab-and-threshold", "Threshold and responsibility", "Zakat enters when wealth reaches its threshold and remains there with the right conditions.", 2),
        seed("meaning-review", "Meaning review", "Zakat is a disciplined act of worship that purifies wealth and trains responsibility.", 3, { kind: "review", lessonType: "review" })
      ]},
      { id: "zakat-recipients", title: "Recipients", description: "Learn who may receive zakat and how revelation protects this right.", order: 2, difficultyRange: [2, 4], sourceKeys: ["quran_9_60"], lessons: [
        seed("eligible-groups", "Eligible groups", "Quran 9:60 names real recipient categories that should be learned and respected.", 2),
        seed("need-and-priority", "Need and priority", "A believer should think carefully about actual need and the revealed categories.", 2),
        seed("family-and-boundaries", "Family and boundaries", "Zakat questions often require knowing relational boundaries and financial responsibility.", 3),
        seed("scenario-judgment", "Scenario judgment with recipients", "The learner should compare people and situations with the recipient categories.", 4),
        seed("recipient-review", "Recipients review", "Zakat recipients are defined so that giving stays obedient, not arbitrary.", 4, { kind: "review", lessonType: "review" })
      ]},
      { id: "zakat-character-and-intention", title: "Character and intention", description: "Move into the giver's inner state: sincerity, humility, and avoiding harm.", order: 3, difficultyRange: [2, 5], sourceKeys: ["quran_9_103", "quran_4_36"], lessons: [
        seed("sincerity", "Sincerity in giving", "Zakat should be given for Allah, not for image, pressure, or praise.", 2),
        seed("humility", "Humility with recipients", "Giving should not crush the dignity of the one receiving.", 3),
        seed("promptness", "Promptness and trust", "Delaying zakat without reason often signals weak seriousness toward the duty.", 3),
        seed("wealth-and-heart", "Wealth and the heart", "Zakat teaches the believer to hold wealth as a trust, not a master.", 4),
        seed("intention-review", "Intention and character review", "Zakat is outward duty and inward purification at the same time.", 5, { kind: "review", lessonType: "mastery" })
      ]},
      { id: "zakat-broader-generosity", title: "Broader generosity", description: "Connect zakat to sadaqah, generosity, and long-term financial responsibility.", order: 4, difficultyRange: [2, 5], sourceKeys: ["quran_9_103", "quran_4_36"], lessons: [
        seed("zakat-and-sadaqah", "Zakat and sadaqah", "The learner should distinguish required zakat from voluntary charity without shrinking either.", 2),
        seed("care-for-neighbors", "Care for people around you", "Islamic generosity should make the learner more attentive to need around them.", 3),
        seed("family-support-and-duty", "Family support and duty", "Financial care in Islam includes knowing ordinary family duties alongside zakat duties.", 4),
        seed("planning-a-giving-life", "Planning a giving life", "A strong Muslim financial life is planned, disciplined, and generous.", 4),
        seed("giving-review", "Giving mastery review", "Zakat should grow into a broader habit of responsible, sincere, and revealed generosity.", 5, { kind: "review", lessonType: "mastery" })
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
      { id: "hajj-duty", title: "Duty and ability", description: "Learn who Hajj is for, why it matters, and how ability shapes obligation.", order: 1, difficultyRange: [1, 3], sourceKeys: ["quran_3_97", "quran_22_27"], lessons: [
        seed("why-hajj-matters", "Why Hajj matters", "Hajj is a pillar-like act of worship connected to the Sacred House and submission.", 1),
        seed("who-must-go", "Who must go", "Hajj is required for those who are able to find a way.", 1),
        seed("intending-the-journey", "Intending the journey", "A believer should desire Hajj sincerely even before the means are present.", 2),
        seed("sacred-house", "The Sacred House", "The Ka'bah and the rites teach unity, remembrance, and submission to Allah's command.", 2),
        seed("duty-review", "Duty review", "Hajj joins obligation, ability, longing, and sacred direction together.", 3, { kind: "review", lessonType: "review" })
      ]},
      { id: "hajj-rites", title: "Rites and sequence", description: "Move through ihram, tawaf, sa'i, and the ordered movement of pilgrimage.", order: 2, difficultyRange: [1, 4], sourceKeys: ["quran_2_196_203", "quran_22_27"], lessons: [
        seed("ihram", "Entering ihram", "Ihram marks the journey as worship and places the pilgrim inside a sacred discipline.", 1),
        seed("tawaf", "Tawaf around the House", "Tawaf trains the heart in remembrance, unity, and obedience around the House of Allah.", 2),
        seed("sai", "Sa'i between Safa and Marwah", "Sa'i preserves the memory of trust, effort, and Allah's care.", 2),
        seed("days-and-order", "The order of the days", "The pilgrim should learn the sequence of the Hajj days and not treat them as a blur.", 3),
        seed("rites-review", "Rites review", "Hajj rites become strong when sequence, meaning, and restraint all stay together.", 4, { kind: "review", lessonType: "review" })
      ]},
      { id: "hajj-major-stations", title: "Major stations", description: "Go deeper into Arafah, Muzdalifah, Mina, and the days of remembrance.", order: 3, difficultyRange: [2, 5], sourceKeys: ["quran_2_196_203", "quran_22_27"], lessons: [
        seed("arafah", "Standing at Arafah", "Arafah gathers humility, du'a, and the heart's deepest turning to Allah.", 2),
        seed("muzdalifah", "Muzdalifah and collecting calm", "Muzdalifah trains the pilgrim in remembrance, order, and composed movement.", 3),
        seed("mina", "Mina and the days of remembrance", "Mina teaches remembrance, patience, and patient movement through sacred days.", 3),
        seed("sacrifice-and-release", "Sacrifice and release", "Acts around sacrifice and release from ihram teach gratitude, obedience, and completion.", 4),
        seed("stations-review", "Stations review", "The great stations of Hajj are remembered through sequence, du'a, patience, and dhikr.", 5, { kind: "review", lessonType: "mastery" })
      ]},
      { id: "hajj-lessons", title: "Lessons after Hajj", description: "Carry humility, unity, patience, and obedience back into life after pilgrimage.", order: 4, difficultyRange: [2, 5], sourceKeys: ["quran_3_97", "quran_22_27"], lessons: [
        seed("humility", "Humility before Allah", "Hajj strips away status and teaches standing equal before Allah.", 2),
        seed("unity", "Unity of the ummah", "Pilgrimage shows the unity of believers through one worship and one direction.", 3),
        seed("patience", "Patience in sacred movement", "Crowds, heat, and delay should teach patience rather than raw frustration.", 4),
        seed("after-the-return", "After the return", "The journey should leave marks on repentance, worship, and discipline after returning home.", 4),
        seed("hajj-review", "Hajj mastery review", "The deepest Hajj learner holds together duty, sequence, sacred stations, and lifelong transformation.", 5, { kind: "review", lessonType: "mastery" })
      ]}
    ]
  }
);
