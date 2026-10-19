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
  /** A clearly false change of the line, for the true/false question. */
  myth?: string;
  /** The "Why?" for the myth, when the line alone does not show why it is false. */
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
  quran_59_22_24: quranSource("quran_59_22_24", "Beautiful names of Allah", "Quran 59:22-24", "https://quran.com/59", "These verses bring you into awe of Allah's names and attributes."),
  quran_66_11: quranSource("quran_66_11", "The prayer of Asiyah", "Quran 66:11", "https://quran.com/66", "Asiyah is honored for faith and longing for Allah despite oppression."),
  quran_67: quranSource("quran_67", "Surah Al-Mulk", "Quran 67", "https://quran.com/67", "Al-Mulk opens with Allah's dominion and the testing nature of life."),
  quran_112: quranSource("quran_112", "Surah Al-Ikhlas", "Quran 112", "https://quran.com/112", "Al-Ikhlas teaches pure tawhid and Allah's unmatched oneness."),
  hadith_riyad_844: hadithSource("hadith_riyad_844", "The excellence of salam", "Riyad as-Salihin 844", "https://sunnah.com/riyadussalihin:844", "Abdullah bin Amr; gathered by Imam an-Nawawi from Al-Bukhari and Muslim", "Muttafaqun alayh", "A beautiful act of Islam is greeting people with salam whether you know them or not."),
  hadith_bukhari_5376: hadithSource("hadith_bukhari_5376", "Mention Allah's name before eating", "Sahih al-Bukhari 5376", "https://sunnah.com/bukhari:5376", "Umar bin Abi Salamah; collected by Imam al-Bukhari", "Sahih", "The Prophet taught saying Allah's name and eating with the right hand."),
  hadith_muslim_224: hadithSource("hadith_muslim_224", "Purification before accepted prayer", "Sahih Muslim 224", "https://sunnah.com/muslim:224", "Ibn Umar; collected by Imam Muslim", "Sahih", "Prayer is not accepted without purification."),
  hadith_muslim_2992: hadithSource("hadith_muslim_2992", "Sneezing manners", "Sahih Muslim 2992", "https://sunnah.com/muslim:2992", "Abu Musa al-Ashari; collected by Imam Muslim", "Sahih", "If someone sneezes and praises Allah, the other Muslim replies with mercy."),
  hadith_bukhari_164: hadithSource("hadith_bukhari_164", "Uthman showed the Prophet's wudu", "Sahih al-Bukhari 164", "https://sunnah.com/bukhari:164", "Humran, the freed slave of Uthman; collected by Imam al-Bukhari", "Sahih", "Uthman demonstrated the wudu of the Prophet so Muslims could learn the order carefully."),
  hadith_bukhari_631: hadithSource("hadith_bukhari_631", "Pray as you have seen me pray", "Sahih al-Bukhari 631", "https://sunnah.com/bukhari:631", "Malik bin Al-Huwairith; collected by Imam al-Bukhari", "Sahih", "The Prophet instructed believers to model their prayer on his prayer."),
  hadith_abudawud_730: hadithSource("hadith_abudawud_730", "Bowing and rising in prayer", "Sunan Abi Dawud 730", "https://sunnah.com/abudawud:730", "Abu Humayd al-Sa'idi; collected by Imam Abu Dawud", "Sahih", "This narration describes the Prophet's bowing and rising with steadiness."),
  hadith_abudawud_856: hadithSource("hadith_abudawud_856", "Pray with calm stillness", "Sunan Abi Dawud 856", "https://sunnah.com/abudawud:856", "Abu Hurairah; collected by Imam Abu Dawud", "Sahih", "The Prophet corrected a man's prayer by teaching calm completeness in each pillar."),
  hadith_abudawud_933: hadithSource("hadith_abudawud_933", "Taslim to the right and left", "Sunan Abi Dawud 933", "https://sunnah.com/abudawud:933", "Wa'il bin Hujr; collected by Imam Abu Dawud", "Hasan Sahih", "The Prophet ended the prayer with taslim to the right and to the left."),
  hadith_abudawud_974: hadithSource("hadith_abudawud_974", "Words of the tashahhud", "Sunan Abi Dawud 974", "https://sunnah.com/abudawud:974", "Ibn Abbas; collected by Imam Abu Dawud", "Sahih", "Ibn Abbas recorded the words of the tashahhud the Prophet taught for the sitting in prayer."),
  hadith_nasai_910: hadithSource("hadith_nasai_910", "No salah without Fatihat al-Kitab", "Sunan an-Nasa'i 910", "https://sunnah.com/nasai/11/35", "Ubadah bin As-Samit; collected by Imam an-Nasa'i", "Sahih", "Reciting Al-Fatihah is central in prayer."),
  hadith_nasai_1055: hadithSource("hadith_nasai_1055", "Sami' Allahu liman hamidah", "Sunan an-Nasa'i 1055", "https://sunnah.com/nasai:1055", "Wa'il bin Hujr; collected by Imam an-Nasa'i", "Sahih", "Wa'il described the Prophet's rising from ruku and praising Allah."),
  hadith_nasai_1278: hadithSource("hadith_nasai_1278", "The tashahhud", "Sunan an-Nasa'i 1278", "https://sunnah.com/nasai:1278", "Ibn Abbas; collected by Imam an-Nasa'i", "Sahih", "The Prophet taught the tashahhud as carefully as he taught a surah of the Quran."),
  hadith_tirmidhi_270: hadithSource("hadith_tirmidhi_270", "Forehead and nose in sujud", "Jami` at-Tirmidhi 270", "https://sunnah.com/tirmidhi:270", "Abu Humayd al-Sa'idi; collected by Imam at-Tirmidhi", "Hasan Sahih", "The Prophet placed his nose and forehead on the ground and kept his arms away from his sides in sujud."),
  hadith_tirmidhi_272: hadithSource("hadith_tirmidhi_272", "Seven limbs in sujud", "Jami` at-Tirmidhi 272", "https://sunnah.com/tirmidhi:272", "Al-Abbas bin Abdul-Muttalib; collected by Imam at-Tirmidhi", "Sahih", "When the servant prostrates, seven limbs prostrate with him: the face, the hands, the knees, and the feet."),
  hadith_bukhari_6013: hadithSource("hadith_bukhari_6013", "Mercy is at the heart of character", "Sahih al-Bukhari 6013", "https://sunnah.com/bukhari:6013", "Jarir bin Abdullah; collected by Imam al-Bukhari", "Sahih", "Whoever is not merciful to others will not be treated with mercy."),
  hadith_muslim_2607: hadithSource("hadith_muslim_2607", "Truth leads to righteousness", "Sahih Muslim 2607c", "https://sunnah.com/muslim:2607c", "Abdullah ibn Mas'ud; collected by Imam Muslim", "Sahih", "Truthfulness trains the soul toward righteousness."),
  hadith_tirmidhi_2002: hadithSource("hadith_tirmidhi_2002", "Good character is weighty", "Jami` at-Tirmidhi 2002", "https://sunnah.com/tirmidhi:2002", "Abu Darda; collected by Imam at-Tirmidhi", "Sahih", "Nothing is heavier on the scale than good character."),
  hadith_bukhari_3820: hadithSource("hadith_bukhari_3820", "The excellence of Khadijah", "Sahih al-Bukhari 3820", "https://sunnah.com/bukhari:3820", "Abu Hurairah; collected by Imam al-Bukhari", "Sahih", "Jibril brought Khadijah greetings from her Lord and glad tidings of a house in Paradise."),
  hadith_bukhari_3770: hadithSource("hadith_bukhari_3770", "The virtue of Aishah", "Sahih al-Bukhari 3770", "https://sunnah.com/bukhari:3770", "Anas ibn Malik; collected by Imam al-Bukhari", "Sahih", "The Prophet described Aishah's superiority over other women as like tharid over other food."),
  hadith_bukhari_4987: hadithSource("hadith_bukhari_4987", "Hafsah and preservation", "Sahih al-Bukhari 4987", "https://sunnah.com/bukhari:4987", "Anas ibn Malik; collected by Imam al-Bukhari", "Sahih", "Hafsah's copy played an important role in preserving written Quranic material."),
  video_wudu_1: videoSource("video_wudu_1", "Wudu guide 1", "https://youtu.be/6kt_POiIVZE?si=6KbLFWt1QZgJvDpt", "A step-by-step walk-through of wudu."),
  video_wudu_2: videoSource("video_wudu_2", "Wudu guide 2", "https://youtu.be/P29LMOHhpjE?si=x1H_8H_kQgI2dCFP", "A second wudu walk-through for repetition and corrections."),
  video_wudu_3: videoSource("video_wudu_3", "Wudu guide 3", "https://youtu.be/iaj1wlQHRFA?si=2_nOF0QOGt4k5Nhv", "A third wudu walk-through to reinforce order and common mistakes."),
  video_salah_1: videoSource("video_salah_1", "Prayer guide 1", "https://youtu.be/vx1rz-28HNk?si=zXJCptHWOBVFk7VB", "A visual guide to the Sunnah prayer method."),
  video_salah_2: videoSource("video_salah_2", "Prayer guide 2", "https://youtu.be/2ZEmsdEOpbk", "A second visual guide through the prayer flow."),
  video_salah_3: videoSource("video_salah_3", "Prayer guide 3", "https://youtu.be/di0u-K09Su4", "A detailed prayer walk-through with attention to posture and errors.")
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

// A lesson's own questions, all about the line its learn card shows: the missing key word (or a short choice),
// the line or a clearly false change of it as true or false, and the first step in a lesson about an order.
// The seed's "why" goes on each question it adds to; a false change gets the line itself, as its correction.
function teachingQuestions(lessonId: string, lesson: LessonSeed): Challenge[] {
  if (!lesson.line || !teaches(lesson)) return [];
  const line = plainLine(lesson.line);
  const why = lesson.why ?? line;
  const asksMyth = Boolean(lesson.myth) && Math.abs(hashCode(`${lessonId}:myth`)) % 2 === 0;
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
      ? { ...tf(`${lessonId}_tf`, lesson.myth!, false, lesson.fix ?? line), ...extras }
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
type TaughtLesson = { lessonId: string; nodeId: string; questions: Challenge[] };

// `count` questions from the lessons in `pool`, one from each lesson before a second from any, never the same
// question twice, and the ones the lesson just before asked (`recent`) only when nothing else is left. Each is
// the same question as in its own lesson, marked as a review of it.
function reviewQuestions(lessonId: string, pool: TaughtLesson[], count: number, recent: ReadonlySet<string> = new Set()): Challenge[] {
  const lessons = pickIndexes(pool.length, pool.length, lessonId).map((index) => pool[index]);
  const lists = lessons.map((lesson) => rotate(lesson.questions, Math.abs(hashCode(`${lessonId}:${lesson.lessonId}`)) % lesson.questions.length));
  const picked: Challenge[] = [];
  const prompts = new Set<string>();
  const rounds = Math.max(0, ...lists.map((list) => list.length));
  for (const allowRecent of [false, true]) {
    for (let round = 0; round < rounds && picked.length < count; round += 1) {
      lists.forEach((list, index) => {
        const question = list[round];
        if (!question || picked.length >= count || prompts.has(question.prompt) || (!allowRecent && recent.has(question.prompt))) return;
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
  return picked;
}

// A review, a mixed review or a lesson with nothing new to teach: questions from the lessons before it, with its
// own order question first when it has one.
function lookBackQuestions(lessonId: string, lesson: LessonSeed, pool: TaughtLesson[], recent: ReadonlySet<string>, companion?: string): Challenge[] {
  const order: Challenge[] = lesson.first
    ? [
        {
          ...mc(`${lessonId}_first`, lesson.firstPrompt ?? "Which comes first?", shuffled([...lesson.first], `${lessonId}:first`), lesson.first[0], orderSentence(lesson.first)),
          miniLesson: orderSentence(lesson.first),
          reviewSuggestion: `Review ${lesson.title}`
        }
      ]
    : [];
  const questions = [...order, ...reviewQuestions(lessonId, pool, (lesson.reviews ?? 3) - order.length, recent)];
  if (questions.length || !companion) return questions;
  const fact = `${companion} met the Prophet ﷺ and believed in him.`;
  return [{ ...tf(`${lessonId}_tf`, fact, true, "A Muslim who met the Prophet ﷺ is called a Sahabi."), miniLesson: fact, reviewSuggestion: `Review ${lesson.title}` }];
}

// What one companion lesson teaches: its line, with the key word in [brackets], and the rest of a seed's copy.
type CompanionFact = Pick<LessonSeed, "line" | "alt" | "ask" | "myth" | "fix" | "why"> & { line: string; title?: string };

type CompanionBranchConfig = {
  id: string;
  title: string;
  /** The name the lessons use, such as "Umar" or "Ibn Mas'ud". */
  name: string;
  description: string;
  order: number;
  /** Plain, well-known facts about this companion, by lesson slug. */
  facts: Record<string, CompanionFact>;
  /** Lessons that look back instead of using the general line below, where it would not fit this companion. */
  neutral?: string[];
  /** Three events in this companion's life, the first one first, for the order review. */
  sequence: [string, string, string];
};

const SAHABI_SOURCE_KEYS = ["quran_9_100", "quran_48_29", "quran_33_21"];

// True of the companions as a whole, for a lesson with no well-known fact about this companion.
const GENERAL_COMPANION_FACTS: Record<string, CompanionFact> = {
  "makkah-years": { line: "In Makkah, the first Muslims were [hurt] for their faith.", alt: ["paid", "praised"], myth: "The first Muslims in Makkah were never hurt for their faith.", why: "Bilal and the family of Yasir were among those hurt." },
  "friendship-with-the-prophet": { line: "A [Sahabi] is a Muslim who met the Prophet ﷺ.", alt: ["Hafiz", "Imam"], myth: "A Sahabi is someone who never met the Prophet ﷺ.", why: "Sahabah is the word for many companions." },
  "sacrifice-for-islam": { line: "Many companions left their homes and money for [Allah].", alt: ["fame", "gold"], myth: "The companions never gave up anything for Islam.", why: "Those who left Makkah for Madinah are called the Muhajirun." },
  "hijrah-and-turning-points": { line: "In the [Hijrah], the Muslims moved from Makkah to Madinah.", alt: ["Hajj", "Isra"], myth: "In the Hijrah, the Muslims moved from Madinah to Makkah.", why: "The Hijri calendar counts its years from the Hijrah." },
  "courage-under-pressure": { line: "At [Badr], a small Muslim army won with Allah's help.", alt: ["Uhud", "Tabuk"], myth: "At Badr, the Muslims had a huge army.", why: "There were only about 313 Muslims at Badr." },
  "worship-and-character": { line: "The Prophet ﷺ said the best of you have the best [character].", alt: ["clothes", "houses"], myth: "Good character does not matter in Islam." },
  "service-to-revelation": { line: "Some companions wrote down the [Quran] as it came down.", alt: ["poems", "news"], myth: "No one wrote the Quran down while it was coming down.", why: "Zayd ibn Thabit was one of these writers." },
  "moments-of-mercy": { line: "The Prophet ﷺ kissed his grandson Hasan to show [mercy].", alt: ["anger", "pride"], myth: "Mercy is not part of Islam.", why: "He said: whoever shows no mercy gets no mercy." },
  "public-service-and-counsel": { line: "[Shura] means making choices by asking others for advice.", alt: ["Sunnah", "Salah"], myth: "Shura means making every choice alone.", why: "Allah told the Prophet ﷺ to consult his companions." },
  "leadership-and-decisions": { line: "The first four caliphs: Abu Bakr, Umar, Uthman, and [Ali].", alt: ["Khalid", "Bilal"], myth: "Khalid was one of the first four caliphs.", why: "They are called the rightly guided caliphs." },
  "after-the-prophet": { line: "The Prophet ﷺ passed away in [Madinah].", alt: ["Makkah", "Taif"], myth: "The Prophet ﷺ passed away in Makkah.", why: "He was buried in Aishah's room, next to his masjid." }
};

// A lesson with nothing new to teach about this companion looks back over the lessons before it.
const LOOK_BACK_LINES: Record<string, (name: string) => string> = {
  "family-lineage": (name) => `Let's look back at ${name}'s story so far.`,
  "before-islam": (name) => `Quick check: what do you remember about ${name}?`,
  "accepting-islam": (name) => `Let's review what you know about ${name}.`,
  "makkah-years": (name) => `Time for a quick look back at ${name}.`,
  "courage-under-pressure": (name) => `Remember ${name}'s story? Let's check.`,
  "moments-of-bravery": (name) => `Let's see how much you remember about ${name}.`,
  "final-years-and-advice": (name) => `Almost done with ${name}'s story. Let's review!`,
  "lessons-for-today": (name) => `Let's remember the good things ${name} did.`,
  "common-misconceptions": (name) => `Let's check what is really true about ${name}.`,
  "review-lessons": (name) => `Let's remember ${name}'s story!`,
  "sequence-review": (name) => `Can you put ${name}'s life in order?`,
  "challenge-lessons": (name) => `Ready for a ${name} challenge?`,
  "scenario-lessons": (name) => `One more round of ${name} questions!`,
  "mastery-lessons": (name) => `Show what you know about ${name}!`
};

const COMPANION_LESSONS: { slug: string; title: string; difficulty: DifficultyTier; lessonType?: "review" | "mastery" }[] = [
  { slug: "early-life", title: "Early life", difficulty: 1 },
  { slug: "family-lineage", title: "Family and lineage", difficulty: 1 },
  { slug: "before-islam", title: "Before Islam", difficulty: 1 },
  { slug: "accepting-islam", title: "Accepting Islam", difficulty: 2 },
  { slug: "makkah-years", title: "The Makkah years", difficulty: 2 },
  { slug: "friendship-with-the-prophet", title: "Friendship with the Prophet", difficulty: 2 },
  { slug: "sacrifice-for-islam", title: "Sacrifices for Islam", difficulty: 2 },
  { slug: "hijrah-and-turning-points", title: "Hijrah and turning points", difficulty: 3 },
  { slug: "courage-under-pressure", title: "Courage under pressure", difficulty: 3 },
  { slug: "worship-and-character", title: "Worship and character", difficulty: 3 },
  { slug: "signature-virtue", title: "Best known for", difficulty: 3 },
  { slug: "service-to-revelation", title: "Service to revelation", difficulty: 4 },
  { slug: "moments-of-bravery", title: "Moments of bravery", difficulty: 4 },
  { slug: "moments-of-mercy", title: "Moments of mercy", difficulty: 4 },
  { slug: "public-service-and-counsel", title: "Public service and counsel", difficulty: 4 },
  { slug: "leadership-and-decisions", title: "Leadership and decisions", difficulty: 4 },
  { slug: "after-the-prophet", title: "After the Prophet", difficulty: 4 },
  { slug: "final-years-and-advice", title: "Final years and advice", difficulty: 4 },
  { slug: "lessons-for-today", title: "Lessons from the life", difficulty: 4 },
  { slug: "common-misconceptions", title: "Common misconceptions", difficulty: 4 },
  { slug: "review-lessons", title: "Review lessons", difficulty: 4, lessonType: "review" },
  { slug: "sequence-review", title: "Sequence review", difficulty: 5, lessonType: "review" },
  { slug: "challenge-lessons", title: "Challenge lessons", difficulty: 5, lessonType: "mastery" },
  { slug: "scenario-lessons", title: "Scenario lessons", difficulty: 5, lessonType: "mastery" },
  { slug: "mastery-lessons", title: "Mastery lessons", difficulty: 5, lessonType: "mastery" }
];

function buildCompanionLessons(config: CompanionBranchConfig): LessonSeed[] {
  return COMPANION_LESSONS.map(({ slug, title, difficulty, lessonType }) => {
    const fact = lessonType ? undefined : config.facts[slug] ?? (config.neutral?.includes(slug) ? undefined : GENERAL_COMPANION_FACTS[slug]);
    if (fact) {
      const { title: factTitle, ...copy } = fact;
      return seed(slug, factTitle ?? title, plainLine(fact.line), difficulty, copy);
    }
    const line = (LOOK_BACK_LINES[slug] ?? LOOK_BACK_LINES["review-lessons"])(config.name);
    return seed(slug, title, line, difficulty, {
      line,
      ...(lessonType ? { kind: "review" as const, lessonType } : { reviews: 2 }),
      ...(slug === "sequence-review" ? { first: config.sequence, firstPrompt: `Which came first in ${config.name}'s life?` } : {})
    });
  });
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
      description: "Follow the life of Abu Bakr from early truthfulness to leadership, worship, and preserving the Ummah after the Prophet.",
      order: 1,
      sequence: ["Accepting Islam", "The Hijrah", "Becoming caliph"],
      facts: {
        "early-life": { line: "Abu Bakr was born and grew up in [Makkah].", alt: ["Madinah", "Taif"], myth: "Abu Bakr grew up in Persia.", why: "He was a little younger than the Prophet ﷺ." },
        "family-lineage": { line: "Abu Bakr was the father of [Aishah].", alt: ["Hafsah", "Fatimah"], myth: "Abu Bakr was the father of Fatimah.", why: "Aishah later married the Prophet ﷺ." },
        "before-islam": { line: "Before Islam, Abu Bakr was a well-liked [trader].", alt: ["king", "sailor"], myth: "Before Islam, Abu Bakr was a king." },
        "accepting-islam": { line: "Abu Bakr was the [first] grown man to accept Islam.", alt: ["last", "tenth"], myth: "Abu Bakr waited many years before he accepted Islam.", why: "He believed as soon as the Prophet ﷺ told him." },
        "makkah-years": { line: "In Makkah, Abu Bakr bought [Bilal] and set him free.", alt: ["Umar", "Khalid"], myth: "Abu Bakr was the one who hurt Bilal.", why: "Bilal was being hurt for saying Allah is One." },
        "friendship-with-the-prophet": { line: "Abu Bakr was the Prophet's ﷺ closest [friend].", alt: ["teacher", "uncle"], myth: "Abu Bakr and the Prophet ﷺ were enemies." },
        "sacrifice-for-islam": { line: "Once, Abu Bakr gave [all] his money for Allah's cause.", alt: ["none of", "a tiny bit of"], myth: "Abu Bakr never spent his money on Islam.", why: "He said he left Allah and His Messenger for his family." },
        "hijrah-and-turning-points": { line: "On the Hijrah, Abu Bakr hid with the Prophet ﷺ in a [cave].", alt: ["tent", "boat"], myth: "Abu Bakr stayed behind in Makkah during the Hijrah.", why: "The Quran tells of it: the second of the two in the cave." },
        "courage-under-pressure": { line: "Abu Bakr [protected] the Prophet ﷺ when people attacked him.", alt: ["ignored", "left"], myth: "Abu Bakr ran away when people attacked the Prophet ﷺ.", why: "He asked: will you kill a man for saying my Lord is Allah?" },
        "worship-and-character": { line: "Abu Bakr often [cried] when he recited the Quran.", alt: ["laughed", "shouted"], myth: "Abu Bakr never cried when he recited the Quran." },
        "signature-virtue": { title: "The truthful one", line: "Abu Bakr was called [As-Siddiq], the truthful one.", alt: ["Al-Faruq", "Sayf Allah"], myth: "Abu Bakr was called Al-Faruq.", why: "He believed the Prophet ﷺ about the Night Journey at once." },
        "service-to-revelation": { line: "Abu Bakr had the [Quran] collected in one place.", alt: ["poems", "stories"], myth: "The Quran was never collected in Abu Bakr's time.", why: "Zayd ibn Thabit did the collecting for him." },
        "moments-of-bravery": { line: "When the Prophet ﷺ died, Abu Bakr [calmed] the people.", alt: ["left", "blamed"], myth: "When the Prophet ﷺ died, Abu Bakr stayed silent.", why: "He reminded them: Allah is alive and never dies." },
        "moments-of-mercy": { line: "Abu Bakr was a [gentle], soft-hearted man.", alt: ["harsh", "cruel"], myth: "Abu Bakr was known for being harsh.", why: "Aishah said her father was a tender-hearted man." },
        "public-service-and-counsel": { line: "When the Prophet ﷺ was ill, Abu Bakr led the [prayer].", alt: ["market", "caravan"], myth: "Abu Bakr never led the prayer for the Muslims.", why: "The Prophet ﷺ himself asked for Abu Bakr to lead it." },
        "leadership-and-decisions": { line: "After the Prophet ﷺ, Abu Bakr became the first [caliph].", alt: ["king", "sultan"], myth: "Umar was the first caliph, before Abu Bakr.", why: "A caliph leads the Muslims after the Prophet ﷺ." },
        "after-the-prophet": { line: "As caliph, Abu Bakr made sure [zakat] was still paid.", alt: ["rent", "fines"], myth: "Abu Bakr let people stop paying zakat.", why: "He would not let anyone separate salah from zakat." },
        "final-years-and-advice": { line: "Abu Bakr was buried beside the Prophet ﷺ in [Madinah].", alt: ["Makkah", "Taif"], myth: "Abu Bakr was buried in Makkah.", why: "He led the Muslims for about two years." }
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
        "early-life": { line: "Umar grew up in [Makkah], in the tribe of Quraysh.", alt: ["Madinah", "Yemen"], myth: "Umar grew up in Persia." },
        "family-lineage": { line: "Umar was the father of [Hafsah], a wife of the Prophet ﷺ.", alt: ["Aishah", "Fatimah"], myth: "Umar was the father of Aishah." },
        "before-islam": { line: "Before Islam, Umar was a strong [enemy] of the Muslims.", alt: ["friend", "helper"], myth: "Umar was one of the very first Muslims." },
        "accepting-islam": { line: "When Umar became Muslim, the Muslims grew [stronger].", alt: ["weaker", "smaller"], myth: "Umar's Islam made the Muslims weaker.", why: "Ibn Mas'ud said they were strong from the day Umar accepted Islam." },
        "signature-virtue": { title: "Justice and strength", line: "Umar was called [Al-Faruq]: he told right from wrong.", alt: ["As-Siddiq", "Sayf Allah"], myth: "Umar was called As-Siddiq.", why: "He was famous for being fair." },
        "service-to-revelation": { line: "Umar asked Abu Bakr to [collect] the Quran in one place.", alt: ["hide", "sell"], myth: "Umar did not want the Quran collected.", why: "Many Quran reciters had been killed in a battle." },
        "leadership-and-decisions": { line: "After Abu Bakr, Umar became the [second] caliph.", alt: ["first", "fourth"], myth: "Umar was the first caliph.", why: "He led the Muslims for about ten years." },
        "after-the-prophet": { line: "As caliph, Umar started the Hijri [calendar].", alt: ["army", "school"], myth: "The Hijri calendar starts from the Prophet's ﷺ birth.", why: "It counts the years from the Hijrah.", fix: "It counts the years from the Hijrah." },
        "final-years-and-advice": { line: "Umar was martyred while leading the [Fajr] prayer.", alt: ["Eid", "Isha"], myth: "Umar died peacefully at home in his bed.", why: "He was buried next to the Prophet ﷺ and Abu Bakr." }
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
        "early-life": { line: "Uthman was from [Quraysh], the Prophet's ﷺ own tribe.", alt: ["Ghifar", "Persia"], myth: "Uthman was from Persia." },
        "family-lineage": { line: "Uthman married [two] daughters of the Prophet ﷺ.", alt: ["three", "no"], myth: "Uthman married none of the Prophet's ﷺ daughters.", why: "So he was called Dhun-Nurayn, the one with two lights." },
        "before-islam": { line: "Before Islam, Uthman was a rich [trader].", alt: ["king", "farmer"], myth: "Uthman was poor all his life." },
        "accepting-islam": { line: "Uthman became Muslim early, invited by [Abu Bakr].", alt: ["Khalid", "Abu Jahl"], myth: "Uthman became Muslim near the end of the Prophet's ﷺ life." },
        "makkah-years": { line: "Uthman and his wife Ruqayyah moved to [Abyssinia] for safety.", alt: ["Rome", "Persia"], myth: "Uthman never left Makkah before the Hijrah.", why: "Abyssinia was in Africa, where Ethiopia is now." },
        "sacrifice-for-islam": { line: "Uthman bought a [well] and gave its water to everyone.", alt: ["horse", "palace"], myth: "Uthman sold the well's water for a high price." },
        "signature-virtue": { title: "Modesty and generosity", line: "Uthman was known for haya: being [modest] and shy.", alt: ["loud", "rude"], myth: "Uthman was known for showing off.", why: "The Prophet ﷺ said even the angels were shy of Uthman." },
        "service-to-revelation": { line: "Uthman sent copies of the [Quran] to Muslim cities.", alt: ["letters", "poems"], myth: "Uthman wrote a new Quran of his own.", why: "So everyone read from the same written Quran." },
        "public-service-and-counsel": { line: "Uthman paid for much of the army going to [Tabuk].", alt: ["Yemen", "Egypt"], myth: "Uthman gave nothing for the army of Tabuk." },
        "leadership-and-decisions": { line: "After Umar, Uthman became the [third] caliph.", alt: ["first", "fifth"], myth: "Uthman was the first caliph." },
        "final-years-and-advice": { line: "Uthman was martyred at home while reading the [Quran].", alt: ["news", "letters"], myth: "Uthman died far away in Persia." }
      },
      neutral: ["courage-under-pressure"]
    }),
    buildCompanionBranch({
      id: "sahabi-ali-ibn-abi-talib",
      title: "Ali ibn Abi Talib",
      name: "Ali",
      description: "Trace the courage, knowledge, closeness, and principled leadership of Ali ibn Abi Talib.",
      order: 4,
      sequence: ["Accepting Islam", "Sleeping in the Prophet's ﷺ bed", "Becoming caliph"],
      facts: {
        "early-life": { line: "Ali grew up in the Prophet's ﷺ own [home].", alt: ["palace", "village"], myth: "Ali grew up far away from the Prophet ﷺ." },
        "family-lineage": { line: "Ali was the Prophet's ﷺ [cousin].", alt: ["grandfather", "uncle"], myth: "Ali was the Prophet's ﷺ uncle.", why: "Ali's father, Abu Talib, raised the Prophet ﷺ as a boy." },
        "accepting-islam": { line: "Ali was the first [child] to accept Islam.", alt: ["king", "trader"], myth: "Ali accepted Islam as an old man.", why: "Khadijah was the first woman, and Abu Bakr the first man." },
        "friendship-with-the-prophet": { line: "On the Hijrah night, Ali slept in the Prophet's ﷺ [bed].", alt: ["cave", "tent"], myth: "Ali left Makkah before the Prophet ﷺ did.", why: "He stayed to give back things people had left with the Prophet ﷺ." },
        "hijrah-and-turning-points": { line: "In Madinah, Ali married [Fatimah], the Prophet's ﷺ daughter.", alt: ["Aishah", "Hafsah"], myth: "Ali never married into the Prophet's ﷺ family.", why: "Their sons were Hasan and Husayn." },
        "moments-of-bravery": { line: "At Khaybar, the Prophet ﷺ gave the [flag] to Ali.", alt: ["horse", "book"], myth: "Ali was afraid to fight at Khaybar.", why: "He said its bearer loves Allah and His Messenger." },
        "signature-virtue": { title: "Knowledge and courage", line: "Ali was famous for his [knowledge] and wise judging.", alt: ["wealth", "jokes"], myth: "Ali knew very little about Islam.", why: "Umar said Ali was the best judge among them." },
        "leadership-and-decisions": { line: "Ali became the [fourth] caliph, after Uthman.", alt: ["first", "second"], myth: "Ali never led the Muslims." },
        "final-years-and-advice": { line: "Ali was martyred in [Kufa], in Iraq.", alt: ["Makkah", "Damascus"], myth: "Ali died in Makkah." }
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
        "early-life": { line: "Khalid grew up in [Makkah], in the tribe of Quraysh.", alt: ["Madinah", "Yemen"], myth: "Khalid grew up in Persia." },
        "family-lineage": { line: "Ibn al-Walid means Khalid was the [son] of al-Walid.", alt: ["teacher", "friend"], myth: "Khalid's father was a poor stranger in Makkah.", why: "His father, al-Walid, was a leader of Quraysh.", fix: "His father, al-Walid, was a leader of Quraysh." },
        "before-islam": { line: "Before Islam, Khalid fought [against] the Muslims at Uhud.", alt: ["beside", "for"], myth: "Khalid was a Muslim at the Battle of Uhud." },
        "accepting-islam": { line: "Khalid became Muslim [later] than many companions.", alt: ["earlier", "sooner"], myth: "Khalid was one of the very first Muslims.", why: "He came to Madinah to accept Islam before Makkah was opened." },
        "signature-virtue": { title: "The Sword of Allah", line: "The Prophet ﷺ called Khalid a [sword] of Allah.", alt: ["shield", "lion"], myth: "The Prophet ﷺ called Khalid As-Siddiq.", why: "He said it at the time of the Battle of Mu'tah." },
        "leadership-and-decisions": { line: "When Umar replaced him as leader, Khalid [obeyed].", alt: ["refused", "quit"], myth: "Khalid refused when Umar changed the army's leader.", why: "He kept fighting under Abu Ubaydah." },
        "final-years-and-advice": { line: "Khalid fought in many battles but died in his [bed].", alt: ["tent", "boat"], myth: "Khalid died in a battle.", why: "He died in Homs, in Syria." }
      },
      neutral: ["makkah-years", "courage-under-pressure"]
    }),
    buildCompanionBranch({
      id: "sahabi-bilal-ibn-rabah",
      title: "Bilal ibn Rabah",
      name: "Bilal",
      description: "Learn from Bilal ibn Rabah about faith under torture, dignity, service, and steadfastness.",
      order: 6,
      sequence: ["Being freed by Abu Bakr", "The Hijrah", "The adhan on the Ka'bah"],
      facts: {
        "early-life": { line: "Bilal grew up as a [slave] in Makkah.", alt: ["king", "trader"], myth: "Bilal was born a rich prince.", why: "His mother came from Abyssinia, in Africa." },
        "family-lineage": { line: "Bilal's mother was named [Hamamah].", alt: ["Sumayyah", "Khadijah"], why: "His father was Rabah, so he is called Bilal ibn Rabah." },
        "before-islam": { line: "Before Islam, Bilal was the slave of [Umayyah] ibn Khalaf.", alt: ["Abu Talib", "Hamzah"], myth: "Bilal was free and rich before Islam.", why: "Umayyah hurt Bilal badly for becoming Muslim." },
        "accepting-islam": { line: "Bilal was one of the [first] people to accept Islam.", alt: ["last", "latest"], myth: "Bilal became Muslim at the end of the Prophet's ﷺ life." },
        "sacrifice-for-islam": { line: "Abu Bakr bought Bilal and set him [free].", alt: ["to work", "aside"], myth: "Bilal stayed a slave all his life.", why: "Umar said: Abu Bakr is our master, and he freed our master." },
        "worship-and-character": { line: "The Prophet ﷺ heard Bilal's [footsteps] in Paradise.", alt: ["horse", "song"], why: "Bilal prayed after every wudu he made." },
        "signature-virtue": {
          title: "Steadfast faith",
          line: "Even when they hurt him, Bilal kept saying: Ahad, Ahad!",
          ask: ["What did Bilal keep saying when he was hurt?", "Ahad, Ahad", "Help me", "I give up"],
          myth: "Bilal gave up Islam when he was hurt.",
          why: "Ahad means One: Allah is One."
        },
        "service-to-revelation": { line: "Bilal was the first [mu'adhdhin], who calls the adhan.", alt: ["imam", "caliph"], myth: "Bilal never called the adhan.", why: "He had a strong, beautiful voice." },
        "moments-of-bravery": { line: "When Makkah was opened, Bilal called the adhan on the [Ka'bah].", alt: ["mountain", "ship"], myth: "When Makkah was opened, Bilal hid at home." },
        "after-the-prophet": { line: "After the Prophet ﷺ died, Bilal moved to [Sham].", alt: ["Yemen", "Egypt"], myth: "Bilal stayed in Madinah to the end of his life.", why: "Sham is the land around Syria." }
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
        "early-life": { line: "Abu Ubaydah was from [Quraysh], the tribe of Makkah.", alt: ["Ghifar", "Persia"], myth: "Abu Ubaydah was from Persia." },
        "family-lineage": { line: "Abu Ubaydah's real name was [Amir].", alt: ["Khalid", "Zayd"], why: "Abu Ubaydah is a nickname: the father of Ubaydah." },
        "accepting-islam": { line: "Abu Ubaydah was one of the [first] people to accept Islam.", alt: ["last", "latest"], myth: "Abu Ubaydah became Muslim at the end of the Prophet's ﷺ life." },
        "friendship-with-the-prophet": { line: "Abu Ubaydah is one of the [ten] promised Paradise.", alt: ["two", "hundred"], why: "Abu Bakr, Umar, Uthman and Ali are among them too." },
        "signature-virtue": { title: "The trustworthy one", line: "The Prophet ﷺ called Abu Ubaydah the [trustworthy] one of this Ummah.", alt: ["loudest", "richest"], myth: "Abu Ubaydah was known for breaking promises.", why: "In Arabic, Amin means trustworthy." },
        "leadership-and-decisions": { line: "Umar made Abu Ubaydah leader of the army in [Sham].", alt: ["Yemen", "Egypt"], myth: "Abu Ubaydah never led an army." },
        "final-years-and-advice": { line: "Abu Ubaydah died in a [plague] in Sham.", alt: ["battle", "flood"], myth: "Abu Ubaydah died in a battle at sea." }
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
        "early-life": { line: "Talhah grew up in [Makkah], in the tribe of Quraysh.", alt: ["Madinah", "Yemen"], myth: "Talhah grew up in Persia." },
        "family-lineage": { line: "Talhah was from the same clan as [Abu Bakr].", alt: ["Abu Jahl", "Khalid"], why: "Their clan, Banu Taym, was part of Quraysh." },
        "accepting-islam": { line: "Talhah became Muslim early, invited by [Abu Bakr].", alt: ["Khalid", "Abu Jahl"], myth: "Talhah became Muslim near the end of the Prophet's ﷺ life." },
        "friendship-with-the-prophet": { line: "Talhah is one of the [ten] promised Paradise.", alt: ["two", "hundred"], why: "Abu Bakr, Umar, Uthman and Ali are among them too." },
        "moments-of-bravery": { line: "At Uhud, Talhah shielded the Prophet ﷺ with his own [hand].", alt: ["horse", "cloak"], myth: "Talhah ran away at the Battle of Uhud.", why: "His hand was left unable to move." },
        "signature-virtue": { title: "Generosity", line: "Talhah was known as a very [generous] man.", alt: ["stingy", "rude"], myth: "Talhah was known for never giving anything." }
      },
      neutral: ["courage-under-pressure"]
    }),
    buildCompanionBranch({
      id: "sahabi-az-zubayr-ibn-al-awwam",
      title: "Az-Zubayr ibn al-Awwam",
      name: "Az-Zubayr",
      description: "Learn how bravery, loyalty, and restraint appear in the life of Az-Zubayr ibn al-Awwam.",
      order: 9,
      sequence: AFTER_THE_HIJRAH,
      facts: {
        "early-life": { line: "Az-Zubayr grew up in [Makkah], in the tribe of Quraysh.", alt: ["Madinah", "Yemen"], myth: "Az-Zubayr grew up in Persia." },
        "family-lineage": { line: "Az-Zubayr was the Prophet's ﷺ [cousin].", alt: ["uncle", "grandson"], myth: "Az-Zubayr was not related to the Prophet ﷺ.", why: "His mother, Safiyyah, was the Prophet's ﷺ aunt." },
        "accepting-islam": { line: "Az-Zubayr became Muslim when he was still [young].", alt: ["old", "elderly"], myth: "Az-Zubayr became Muslim as an old man." },
        "makkah-years": { line: "Az-Zubayr married [Asma], the daughter of Abu Bakr.", alt: ["Aishah", "Hafsah"], myth: "Az-Zubayr married the daughter of Abu Jahl." },
        "friendship-with-the-prophet": { line: "Az-Zubayr is one of the [ten] promised Paradise.", alt: ["two", "hundred"], why: "Abu Bakr, Umar, Uthman and Ali are among them too." },
        "signature-virtue": { title: "The Prophet's helper", line: "The Prophet ﷺ called Az-Zubayr his hawari, his special [helper].", alt: ["cook", "barber"], myth: "The Prophet ﷺ called Az-Zubayr his enemy.", why: "The helpers of Isa were called hawariyyun too." }
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
        "early-life": { line: "Sa'd grew up in [Makkah], in the tribe of Quraysh.", alt: ["Madinah", "Yemen"], myth: "Sa'd grew up in Persia." },
        "family-lineage": { line: "Sa'd was from the family of the Prophet's ﷺ [mother].", alt: ["teacher", "friend"], why: "The Prophet ﷺ called him his uncle on his mother's side." },
        "accepting-islam": { line: "Sa'd was one of the [first] few people to accept Islam.", alt: ["last", "latest"], myth: "Sa'd became Muslim at the end of the Prophet's ﷺ life." },
        "makkah-years": { line: "When Sa'd became Muslim, his [mother] refused to eat.", alt: ["sister", "teacher"], myth: "Sa'd left Islam to please his mother.", why: "He stayed kind to her but kept his faith.", fix: "He stayed kind to her but kept his faith." },
        "friendship-with-the-prophet": { line: "Sa'd is one of the [ten] promised Paradise.", alt: ["two", "hundred"], why: "Abu Bakr, Umar, Uthman and Ali are among them too." },
        "signature-virtue": { title: "An answered du'a", line: "The Prophet ﷺ prayed that Sa'd's du'as would be [answered].", alt: ["written", "short"] },
        "moments-of-bravery": { line: "Sa'd was the first to shoot an [arrow] for Allah's cause.", alt: ["spear", "stone"], myth: "Sa'd never fought for Islam.", why: "At Uhud, the Prophet ﷺ cheered him on as he shot." }
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
        "early-life": { line: "Salman grew up in [Persia], far from Arabia.", alt: ["Makkah", "Egypt"], myth: "Salman grew up in Makkah.", why: "Al-Farisi means the Persian." },
        "family-lineage": { line: "Salman's family in Persia worshipped [fire].", alt: ["the sea", "trees"], myth: "Salman's family were Muslims in Persia." },
        "before-islam": { line: "While searching for the truth, Salman was [sold] as a slave.", alt: ["crowned", "hired"], myth: "Salman came to Arabia as a rich king.", why: "Before that, he learned from several Christian teachers." },
        "accepting-islam": { line: "Salman met the Prophet ﷺ in [Madinah] and became Muslim.", alt: ["Persia", "Rome"], myth: "Salman met the Prophet ﷺ in Persia." },
        "makkah-years": { title: "Set free", line: "The Prophet ﷺ helped plant [date palms] to set Salman free.", alt: ["roses", "wheat"], myth: "Salman stayed a slave all his life." },
        "signature-virtue": { title: "Searching for truth", line: "Salman traveled very far from home to [find] the truth.", alt: ["hide", "escape"], myth: "Salman never left his home town." },
        "public-service-and-counsel": { line: "Salman gave the idea to dig a [trench] around Madinah.", alt: ["tunnel", "well"], myth: "Salman told the Muslims to leave Madinah.", why: "It kept a much bigger army out of Madinah." }
      },
      neutral: ["courage-under-pressure"]
    }),
    buildCompanionBranch({
      id: "sahabi-abu-dharr-al-ghifari",
      title: "Abu Dharr al-Ghifari",
      name: "Abu Dharr",
      description: "Go deeper into the blunt honesty, ascetic concern, and moral seriousness of Abu Dharr al-Ghifari.",
      order: 12,
      sequence: AFTER_THE_HIJRAH,
      facts: {
        "early-life": { line: "Abu Dharr grew up with the [Ghifar] tribe, outside Makkah.", alt: ["Quraysh", "Thaqif"], myth: "Abu Dharr was from the tribe of Quraysh.", why: "Al-Ghifari means from the Ghifar tribe." },
        "family-lineage": { line: "Abu Dharr's real name was [Jundub].", alt: ["Khalid", "Zayd"], why: "Abu Dharr is a nickname, as many Arabs had." },
        "accepting-islam": { line: "Abu Dharr was one of the very [first] Muslims.", alt: ["last", "latest"], myth: "Abu Dharr became Muslim at the end of the Prophet's ﷺ life." },
        "makkah-years": { line: "Abu Dharr called out his Islam at the [Ka'bah], and was beaten.", alt: ["market", "well"], myth: "Abu Dharr kept his Islam a secret all his life." },
        "worship-and-character": { line: "The Prophet ﷺ praised Abu Dharr for his [truthful] speech.", alt: ["loud", "funny"], myth: "Abu Dharr was known for telling lies." },
        "signature-virtue": { title: "Simple living", line: "Abu Dharr lived a very [simple] life.", alt: ["fancy", "lazy"], myth: "Abu Dharr loved collecting gold." }
      },
      neutral: ["courage-under-pressure"]
    }),
    buildCompanionBranch({
      id: "sahabi-abdullah-ibn-masud",
      title: "Abdullah ibn Mas'ud",
      name: "Ibn Mas'ud",
      description: "Study knowledge, Quran recitation, humility, and precision through Abdullah ibn Mas'ud.",
      order: 13,
      sequence: AFTER_THE_HIJRAH,
      facts: {
        "early-life": { line: "As a boy, Ibn Mas'ud looked after [sheep] in Makkah.", alt: ["horses", "ships"], myth: "Ibn Mas'ud grew up as a rich prince." },
        "family-lineage": { line: "Ibn Mas'ud's first name was [Abdullah].", alt: ["Ali", "Umar"], why: "Ibn Mas'ud means the son of Mas'ud." },
        "accepting-islam": { line: "Ibn Mas'ud became Muslim early, in [Makkah].", alt: ["Madinah", "Kufa"], myth: "Ibn Mas'ud became Muslim after the Prophet ﷺ died." },
        "makkah-years": { line: "Ibn Mas'ud recited the Quran out loud near the [Ka'bah].", alt: ["market", "well"], myth: "Ibn Mas'ud was afraid to recite the Quran in Makkah." },
        "friendship-with-the-prophet": { line: "The Prophet ﷺ asked Ibn Mas'ud to [recite] the Quran to him.", alt: ["sing", "draw"], why: "He recited An-Nisa, and the Prophet ﷺ wept." },
        "signature-virtue": { title: "Teacher of the Quran", line: "The Prophet ﷺ told Muslims to learn the [Quran] from Ibn Mas'ud.", alt: ["poetry", "trading"], why: "He named three others too, with Ibn Mas'ud first." },
        "after-the-prophet": { line: "Umar sent Ibn Mas'ud to [Kufa] to teach the people.", alt: ["Rome", "Makkah"], myth: "Ibn Mas'ud stopped teaching after the Prophet ﷺ died." }
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
        "early-life": { line: "Anas grew up in [Madinah], among the Ansar.", alt: ["Makkah", "Persia"], myth: "Anas grew up in Persia.", why: "The Ansar were the Muslims of Madinah who helped the Prophet ﷺ." },
        "family-lineage": { line: "Anas's mother, [Umm Sulaym], brought him to serve the Prophet ﷺ.", alt: ["Khadijah", "Aishah"], myth: "Anas came to the Prophet ﷺ all alone." },
        "makkah-years": { title: "A boy in Madinah", line: "When the Prophet ﷺ came to Madinah, Anas was about [ten].", alt: ["forty", "two"], myth: "Anas was an old man when the Prophet ﷺ came to Madinah." },
        "friendship-with-the-prophet": { line: "Anas served the Prophet ﷺ for [ten] years.", alt: ["two", "forty"], why: "In all that time, the Prophet ﷺ never once said uff to him." },
        "worship-and-character": { line: "The Prophet ﷺ prayed for Anas to have wealth and many [children].", alt: ["enemies", "worries"] },
        "signature-virtue": { title: "Sharing the Sunnah", line: "Anas told many [hadith] about the Prophet ﷺ.", alt: ["poems", "jokes"], why: "He is one of the companions who told the most hadith." },
        "final-years-and-advice": { line: "Anas lived a long life and died in [Basra].", alt: ["Makkah", "Persia"], myth: "Anas died when he was very young.", why: "He was one of the last companions to pass away." }
      },
      neutral: ["courage-under-pressure"]
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
          line: "Wudu is the washing we do before [salah].",
          alt: ["lunch", "playtime"],
          myth: "In wudu, you wash your whole body.",
          why: "Wudu washes the face, arms and feet, and wipes the head."
        }),
        seed("why-wudu-matters", "Why wudu matters", "Purification matters because prayer is approached with readiness, not carelessness.", 1, {
          line: "Allah accepts our salah only when we are [clean].",
          alt: ["hungry", "sleepy"],
          myth: "Wudu has nothing to do with salah.",
          why: "The Prophet ﷺ said wudu washes away sins."
        }),
        seed("conditions-before-wudu", "Conditions before wudu", "Before you begin, you need readiness, clean water, and a calm intention.", 1, {
          line: "For wudu, you need clean [water].",
          alt: ["juice", "milk"],
          myth: "Juice works just as well as water for wudu.",
          why: "With no water at all, Muslims may do tayammum with clean earth."
        }),
        seed("intention-basics", "Intention basics", "Wudu begins as a conscious act of preparing for worship, not as empty routine.", 2, {
          line: "Before wudu, intend in your [heart] to get ready to pray.",
          alt: ["pocket", "shoes"],
          myth: "Niyyah means washing your feet.",
          why: "Niyyah is the Arabic word for intention."
        }),
        seed("wash-hands-first", "Wash hands first", "The opening of wudu trains order from the first movement, not random washing.", 2, {
          line: "Wudu starts by washing your [hands].",
          alt: ["feet", "face"],
          myth: "The first thing washed in wudu is the feet.",
          why: "The Prophet ﷺ washed his hands three times."
        }),
        seed("rinse-mouth", "Rinse the mouth", "Rinsing the mouth is part of the taught order and should be done with care.", 2, {
          line: "Next, rinse your [mouth] with water.",
          alt: ["ears", "feet"],
          myth: "The mouth is rinsed at the very end of wudu.",
          why: "Swish the water around, then spit it out."
        }),
        seed("rinse-nose", "Rinse the nose", "Rinsing the nose teaches completeness and attention inside a simple act.", 2, {
          line: "Then sniff water into your [nose] and blow it out.",
          alt: ["eyes", "ears"],
          myth: "In wudu, the nose is left out.",
          first: ["Wash the hands", "Rinse the mouth", "Rinse the nose"]
        }),
        seed("wash-face", "Wash the face", "The face must be washed properly and not reduced to a rushed splash.", 2, {
          line: "Wash your whole [face], from your hairline to your chin.",
          alt: ["neck", "back"],
          myth: "The face is the last thing washed in wudu.",
          fix: "The feet are washed last.",
          why: "Wash it from one ear to the other, too.",
          first: ["Rinse the mouth", "Rinse the nose", "Wash the face"]
        }),
        seed("wash-arms", "Wash the arms", "The arms are washed fully in the taught order, with care instead of haste.", 3, {
          line: "Wash each arm up to the [elbow], right arm first.",
          alt: ["wrist", "shoulder"],
          myth: "In wudu, the arms are washed only to the wrists.",
          why: "The Quran says to wash the arms up to the elbows.",
          first: ["Rinse the nose", "Wash the face", "Wash the arms"]
        }),
        seed("wipe-head", "Wipe the head", "Wiping the head teaches that wudu is followed as taught, not improvised from habit.", 3, {
          line: "Wipe your [head] with wet hands.",
          alt: ["feet", "back"],
          myth: "In wudu, you pour lots of water over your head.",
          why: "Move your hands from the front of your head to the back.",
          first: ["Wash the face", "Wash the arms", "Wipe the head"]
        }),
        seed("wipe-ears", "Wipe the ears", "The ears are wiped right after the head, as the Prophet ﷺ did.", 3, {
          line: "Wipe your [ears] right after your head.",
          alt: ["knees", "elbows"],
          myth: "The ears are wiped before the face.",
          why: "Fingers go inside the ears and thumbs behind them.",
          first: ["Wash the arms", "Wipe the head", "Wipe the ears"]
        }),
        seed("wash-feet", "Wash the feet", "The feet complete the main body sequence and should not be handled carelessly.", 3, {
          line: "Last, wash your [feet] up to the ankles.",
          alt: ["knees", "hands"],
          myth: "Wudu ends with wiping the head.",
          why: "Make sure the water gets between your toes.",
          first: ["Wipe the head", "Wipe the ears", "Wash the feet"]
        }),
        seed("full-order", "Full order of wudu", "Wudu becomes strong when you can hold the whole order from start to finish.", 3, {
          line: "Hands, mouth, nose, face, arms, head, ears, then [feet].",
          alt: ["knees", "neck"],
          myth: "Wudu starts with washing the feet.",
          first: ["Rinse the nose", "Wash the arms", "Wipe the ears"]
        }),
        seed("fard-acts", "Fard acts of wudu", "Some acts of wudu are core acts that cannot be left out.", 4, {
          line: "The Quran names four parts: face, arms, [head], and feet.",
          alt: ["neck", "knees"],
          myth: "The Quran never talks about wudu.",
          why: "This is in Surah Al-Ma'idah, ayah 6."
        }),
        seed("sunnah-acts", "Sunnah acts of wudu", "The Sunnah beautifies and perfects the purification beyond the bare minimum.", 4, {
          line: "Washing each part [three] times is Sunnah.",
          alt: ["ten", "seven"],
          myth: "You must wash each part ten times.",
          why: "Once is enough; the Prophet ﷺ sometimes washed each part once."
        }),
        seed("what-breaks-wudu", "What breaks wudu", "Know clearly what breaks wudu, and do not guess about it.", 4, {
          line: "Using the [toilet] or passing wind breaks wudu.",
          alt: ["kitchen", "garden"],
          myth: "Using the toilet does not break wudu.",
          why: "Deep sleep breaks wudu too."
        }),
        seed("what-does-not-break-wudu", "What does not break wudu", "Not everything people worry about actually breaks wudu, so clarity matters.", 4, {
          line: "[A doubt] does not break wudu, but the toilet does.",
          alt: ["Passing wind", "Deep sleep"],
          myth: "Just doubting your wudu breaks it.",
          why: "Keep your wudu unless you are sure it broke."
        }),
        seed("bathroom-etiquette", "Bathroom etiquette", "Purity training also includes adab before a person even returns to the sink.", 4, {
          line: "In the toilet, clean yourself using your left hand.",
          ask: ["Which hand cleans you in the toilet?", "The left hand", "The right hand", "The eating hand"],
          myth: "The right hand is used for cleaning in the toilet.",
          why: "The right hand is kept for eating and drinking."
        }),
        seed("common-mistakes", "Common mistakes", "Most wudu mistakes come from rushing, bad order, or not washing properly.", 5, {
          line: "Don't leave [dry] spots, like your heels.",
          alt: ["wet", "soapy"],
          myth: "A few dry spots in wudu are fine.",
          why: "The Prophet ﷺ warned people who left their heels dry."
        }),
        seed("demonstration-and-practice", "Practical how-to guide", "Put all the wudu steps together, then check yourself.", 5, {
          line: "Now do it all, from hands to [feet], calm and careful.",
          alt: ["face", "ears"],
          myth: "Rushing makes wudu better."
        }),
        seed("reinforcement-review", "Reinforcement lessons", "Repeat the order, the core acts, the sunnah details, and the nullifiers until they become stable.", 5, { kind: "review", lessonType: "review", line: "Wudu goes from your hands all the way to your feet." }),
        seed("wudu-mastery-check", "Mastery checks", "Mastery means you can perform, explain, and correct wudu with confidence.", 5, { kind: "review", lessonType: "mastery", line: "You know the steps, the Sunnah, and what breaks wudu." })
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
          line: "Salah is one of the [five] pillars of Islam.",
          alt: ["two", "ten"],
          myth: "Salah is not one of the pillars of Islam.",
          why: "It comes right after the shahadah, the first pillar."
        }),
        seed("five-daily-prayers", "The five daily prayers", "The five named prayers shape the whole day around worship.", 1, {
          line: "Muslims pray [five] times every day.",
          alt: ["three", "ten"],
          myth: "There are three daily prayers.",
          why: "Allah gave the five prayers on the night of the Mi'raj."
        }),
        seed("names-and-order", "Prayer names and order", "Knowing the names and order of the prayers prevents confusion and builds a stable rhythm.", 1, {
          line: "Fajr, Dhuhr, Asr, Maghrib, and then [Isha].",
          alt: ["Eid", "Duha"],
          myth: "Fajr is the prayer at sunset.",
          why: "Fajr is at dawn and Isha is at night.",
          fix: "Fajr is at dawn and Isha is at night.",
          first: ["Fajr", "Asr", "Isha"]
        }),
        seed("rakah-overview", "Rakah overview", "Prayer is built from repeating units, called rak'ahs, with taught pillars.", 2, {
          line: "In each [rak'ah], Al-Fatihah is recited while standing.",
          alt: ["adhan", "wudu"],
          myth: "Fajr has ten rak'ahs.",
          why: "Fajr has 2 rak'ahs, Maghrib 3, and Dhuhr 4.",
          fix: "Fajr has 2 rak'ahs, Maghrib 3, and Dhuhr 4."
        }),
        seed("conditions-before-salah", "Conditions before salah", "Prayer starts with readiness before takbir, not only with what happens inside the salah itself.", 2, {
          line: "Before salah, be clean, cover up, and face the [Qiblah].",
          alt: ["door", "window"],
          myth: "In salah, Muslims face toward Madinah.",
          why: "The Qiblah is the Ka'bah in Makkah."
        }),
        seed("pillars-and-obligations", "Pillars and obligations", "Some parts of prayer are central pillars and should be recognized early.", 2, {
          line: "Salah starts with [Allahu akbar] and ends with salam.",
          alt: ["Bismillah", "Ameen"],
          myth: "Salah begins with the taslim.",
          why: "Saying Allahu akbar to start is called the takbir."
        }),
        seed("follow-the-prophetic-model", "Follow the Prophetic model", "The foundation of salah is to pray as the Prophet prayed, not by self-made style.", 3, {
          line: "The Prophet ﷺ said: pray as you have [seen] me pray.",
          alt: ["heard", "told"],
          myth: "We may pray in any style we make up.",
          why: "He ﷺ said it to young men who stayed with him to learn."
        }),
        seed("basic-review", "Salah basics review", "These basics should become second nature before you move into finer detail.", 4, { kind: "review", lessonType: "review", line: "Five prayers a day, from Allahu akbar to salam." })
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
        seed("time-and-worship", "Why prayer time matters", "Prayer is tied to time so the whole day is governed by worship and not drift.", 1, {
          line: "Allah gave each prayer its own [time].",
          alt: ["color", "song"],
          myth: "Salah can be prayed at any time we like.",
          why: "The Quran says prayer is due at set times."
        }),
        seed("fajr-to-isha", "From Fajr to Isha", "The prayer day runs from Fajr at dawn to Isha at night.", 1, {
          line: "The prayer day begins with [Fajr] at dawn.",
          alt: ["Isha", "Asr"],
          myth: "Isha is the prayer at dawn.",
          why: "Isha is the last prayer, at night."
        }),
        seed("general-time-windows", "General time windows", "Each prayer has its own time window in the day.", 2, {
          line: "[Dhuhr] is just after midday, and Maghrib is at sunset.",
          alt: ["Fajr", "Isha"],
          myth: "Maghrib is prayed at noon.",
          why: "Asr comes in the afternoon, between them."
        }),
        seed("guarding-the-first-part", "Guarding the opening time", "Honoring prayer early trains seriousness and planning.", 2, {
          line: "[Salah] on time is a deed Allah loves most.",
          alt: ["Sleeping", "Shopping"],
          myth: "Praying on time does not matter.",
          why: "The Prophet ﷺ said this when Ibn Mas'ud asked him."
        }),
        seed("late-prayer-scenarios", "Late prayer scenarios", "Simple real cases help you think about time, delay, and responsibility.", 3, {
          line: "If you sleep through a prayer, pray it when you [wake].",
          alt: ["grow up", "feel like it"],
          myth: "A missed prayer can never be made up.",
          why: "The Prophet ﷺ taught: pray it as soon as you remember."
        }),
        seed("times-review", "Prayer times review", "The prayer day should feel ordered, guarded, and connected to obedience.", 4, { kind: "review", lessonType: "mastery", line: "Fajr at dawn, Dhuhr after midday, Maghrib at sunset, Isha at night." })
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
        seed("what-the-adhan-is", "What the adhan is", "The adhan is not background noise; it is a public call into worship.", 1, {
          line: "The [adhan] is the call to prayer.",
          alt: ["khutbah", "du'a"],
          myth: "The adhan is a call to come and eat.",
          why: "It starts with Allahu akbar: Allah is the Greatest."
        }),
        seed("responding-to-the-call", "Responding to the call", "The believer should learn to answer the call with movement, intention, and respect.", 2, {
          line: "When you hear the adhan, repeat its [words] quietly.",
          alt: ["jokes", "songs"],
          myth: "We repeat the adhan only on Fridays.",
          why: "For hayya 'alas-salah, say: la hawla wa la quwwata illa billah."
        }),
        seed("what-the-iqamah-does", "What the iqamah does", "Iqamah tightens the prayer moment and signals that the salah is about to begin.", 2, {
          line: "The [iqamah] is the second call, just before salah starts.",
          alt: ["adhan", "khutbah"],
          myth: "The iqamah comes after the salah ends."
        }),
        seed("masjid-readiness", "Masjid readiness", "The calls to prayer teach punctuality, order, and calm readiness before standing.", 3, {
          line: "Walk to salah [calmly]; don't run, even if late.",
          alt: ["loudly", "angrily"],
          myth: "When the iqamah starts, run to the masjid.",
          why: "Pray what you catch, then finish what you missed."
        }),
        seed("adhan-review", "Adhan and iqamah review", "The adhan and iqamah bring dignity and order to prayer together.", 4, { kind: "review", lessonType: "review", line: "The adhan calls us; the iqamah says salah is starting." })
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
        seed("what-ruku-teaches", "What ruku teaches", "Ruku is not a dip of the body only; it teaches submission, stillness, and praise.", 2, {
          line: "In [ruku], we bow and say Subhana Rabbiyal Azim.",
          alt: ["sujud", "qiyam"],
          myth: "In ruku, we lie down on the floor.",
          why: "It means: Glory be to my Lord, the Most Great."
        }),
        seed("shape-of-ruku", "The shape of ruku", "In ruku, the body settles into a bow with calmness and order.", 2, {
          line: "In ruku, keep your back [flat] and hands on your knees.",
          alt: ["round", "twisted"],
          myth: "In ruku, your hands go on your head.",
          why: "Stay still for a moment before you rise."
        }),
        seed("rising-from-ruku", "Rising from ruku", "The transition out of ruku matters and should not be blurred or rushed.", 3, {
          line: "After ruku, stand up [straight] before going down to sujud.",
          alt: ["halfway", "sideways"],
          myth: "We go from ruku to sujud without standing up.",
          why: "While rising, say: Sami' Allahu liman hamidah."
        }),
        seed("what-sujud-teaches", "What sujud teaches", "Sujud is one of the clearest places where humility and closeness meet in prayer.", 3, {
          line: "In [sujud], our forehead touches the ground for Allah.",
          alt: ["ruku", "qiyam"],
          myth: "In sujud, only the hands touch the ground.",
          why: "In sujud we say: Subhana Rabbiyal A'la.",
          first: ["Ruku", "Rise from ruku", "Sujud"]
        }),
        seed("seven-points-of-sujud", "Seven points of sujud", "A correct sujud rests on seven body parts.", 3, {
          line: "Sujud rests on [seven] parts of the body.",
          alt: ["three", "ten"],
          myth: "Sujud rests on just two parts of the body.",
          why: "Forehead and nose, both hands, both knees and both feet."
        }),
        seed("sitting-between-sujud", "Sitting between sajdahs", "The sitting between sajdahs is part of the prayer's calm structure, not a throwaway pause.", 4, {
          line: "Between the two sujud, we [sit] for a calm moment.",
          alt: ["run", "sleep"],
          myth: "Each rak'ah has only one sujud.",
          why: "Many say here: Rabbighfir li, my Lord, forgive me.",
          first: ["Rise from ruku", "First sujud", "Sit between sajdahs"]
        }),
        seed("mistakes-in-ruku-and-sujud", "Mistakes in ruku and sujud", "Rushed movement, missing stillness, and poor posture often weaken these pillars.", 4, {
          line: "Don't rush: stay [still] in each ruku and sujud.",
          alt: ["loud", "busy"],
          myth: "Salah is best when it is rushed.",
          why: "The Prophet ﷺ told a man who rushed to pray again."
        }),
        seed("ruku-sujud-review", "Ruku and sujud review", "Now you can explain ruku and sujud and spot the common mistakes.", 5, { kind: "review", lessonType: "mastery", line: "Bow in ruku, stand, then two sujud with a sit between." })
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
        seed("why-the-sitting-matters", "Why the sitting matters", "The sitting in prayer carries taught words and should be learned carefully.", 2, {
          line: "In the sitting, we say words called the [tashahhud].",
          alt: ["adhan", "iqamah"],
          myth: "We stand up to say the tashahhud.",
          why: "The Prophet ﷺ taught it like he taught a surah."
        }),
        seed("wording-of-tashahhud", "Wording of the tashahhud", "The tashahhud has taught words that should be said with care.", 3, {
          line: "It begins: [At-tahiyyatu] lillah, all greetings are for Allah.",
          alt: ["Allahu akbar", "Subhanallah"],
          myth: "The tashahhud begins with Allahu akbar.",
          why: "It also sends salam to the Prophet ﷺ."
        }),
        seed("when-tashahhud-happens", "When tashahhud happens", "The tashahhud is said while sitting, at its set places in the prayer.", 3, {
          line: "We sit for tashahhud after two rak'ahs, and at the [end].",
          alt: ["start", "adhan"],
          myth: "The tashahhud is said at the very start of salah."
        }),
        seed("taslim-ends-the-prayer", "Taslim ends the prayer", "Prayer closes with an orderly taslim, not with a vague stopping point.", 4, {
          line: "Salah ends with salam, turning [right] and then left.",
          alt: ["up", "down"],
          myth: "Salah ends with Allahu akbar.",
          why: "Each time we say: As-salamu alaykum wa rahmatullah.",
          first: ["Sujud", "Tashahhud", "Taslim"]
        }),
        seed("tashahhud-review", "Tashahhud review", "Wording, placement, posture, and ending come together in one closing flow.", 5, { kind: "review", lessonType: "mastery", line: "Sit for the tashahhud, then end with salam on each side." })
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
          alt: ["Wudu", "Adhan"],
          myth: "Khushu means praying as fast as you can.",
          why: "Allah praises believers who have khushu in their salah."
        }),
        seed("prepare-for-khushu", "Prepare for khushu", "Khushu starts before the prayer through wudu, timing, and clearing distractions.", 3, {
          line: "If food is ready, eat first so you can [focus] in salah.",
          alt: ["rush", "nap"],
          myth: "Being hungry and distracted helps khushu.",
          why: "Use the toilet first too, if you need to."
        }),
        seed("understand-what-you-say", "Understand what you say", "Presence grows stronger when you understand the words and positions.", 3, {
          line: "Knowing what the words mean helps your [heart] focus.",
          alt: ["feet", "phone"],
          myth: "Knowing the meaning makes salah harder to focus on.",
          why: "Al-Fatihah asks Allah to guide us to the straight path."
        }),
        seed("fight-distraction", "Fight distraction", "Khushu is protected by repeated effort against haste and wandering attention.", 4, {
          line: "If your mind wanders, gently bring it back to [salah].",
          alt: ["lunch", "games"],
          myth: "One stray thought ruins your whole salah.",
          why: "Looking at the place of sujud helps you stay focused."
        }),
        seed("khushu-review", "Khushu review", "Presence in prayer is trained through preparation, meaning, and repeated careful effort.", 5, { kind: "review", lessonType: "review", line: "Get ready, know the meaning, and bring your mind back." })
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
        seed("what-invalidates-salah", "What invalidates salah", "Some actions break the prayer, while others only lower its quality.", 3, {
          line: "Talking on purpose [breaks] your salah.",
          alt: ["fixes", "starts"],
          myth: "Chatting with friends is fine during salah.",
          why: "Losing your wudu breaks it too."
        }),
        seed("speech-and-excessive-movement", "Speech and excessive movement", "Breaking the prayer is different from being distracted or praying with poor form.", 3, {
          line: "Eating or [drinking] during salah breaks it.",
          alt: ["breathing", "blinking"],
          myth: "A snack during salah is fine.",
          why: "Small moves are fine: the Prophet ﷺ once prayed carrying his granddaughter."
        }),
        seed("purity-and-prayer-validity", "Purity and prayer validity", "Losing wudu during prayer changes whether you can carry on.", 4, {
          line: "If wudu breaks during salah, [stop] and make it again.",
          alt: ["keep going", "speed up"],
          myth: "If your wudu breaks, just keep praying."
        }),
        seed("scenario-judgment", "Scenario judgment", "Real learning means judging realistic cases instead of repeating slogans.", 4, {
          line: "If you [laugh] out loud in salah, pray it again.",
          alt: ["blink", "breathe"],
          myth: "Laughing out loud in salah is fine.",
          why: "A quiet smile does not break salah."
        }),
        seed("invalidator-review", "Invalidators review", "Now you can judge more clearly what breaks prayer and what needs repair.", 5, { kind: "review", lessonType: "mastery", line: "Talking, eating, laughing out loud, or losing wudu breaks salah." })
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
        seed("why-jamaah-matters", "Why congregational prayer matters", "Prayer with others trains discipline, unity, and following properly.", 2, {
          line: "Praying together is [27] times better than praying alone.",
          alt: ["2", "100"],
          myth: "Praying together has no extra reward."
        }),
        seed("following-the-imam", "Following the imam", "Follow the imam without rushing ahead or drifting behind.", 3, {
          line: "In jamaah, move [after] the imam, never before him.",
          alt: ["ahead of", "instead of"],
          myth: "In jamaah, you should bow before the imam does."
        }),
        seed("joining-late", "Joining late", "Joining a prayer already underway requires calm thinking and the right sequence.", 4, {
          line: "Late? Join the imam, then [finish] what you missed.",
          alt: ["skip", "forget"],
          myth: "If you are late, wait outside until salah ends."
        }),
        seed("masjid-etiquette", "Masjid etiquette in jamaah", "Shared prayer still depends on adab, calm movement, and awareness of others.", 4, {
          line: "In jamaah, stand in [straight] rows, shoulder to shoulder.",
          alt: ["curvy", "messy"],
          myth: "Rows in salah can be messy.",
          why: "The Prophet ﷺ said straight rows are part of good salah."
        }),
        seed("jamaah-review", "Congregational prayer review", "Following, joining late, etiquette, and prayer order all come together.", 5, { kind: "review", lessonType: "review", line: "Follow the imam, stand in straight rows, finish what you missed." })
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
        seed("seriousness-of-missing-prayer", "Seriousness of missing prayer", "Missing a prayer is serious, but it is no reason to despair.", 3, {
          line: "Missing salah is [serious], but Allah's door stays open.",
          alt: ["fine", "funny"],
          myth: "Missing a prayer does not matter."
        }),
        seed("returning-after-a-miss", "Returning after a miss", "After a missed prayer, return quickly to obedience and repair.", 3, {
          line: "If you miss a prayer, pray it as [soon] as you can.",
          alt: ["late", "rarely"],
          myth: "After a missed prayer, it is too late to come back.",
          why: "Allah loves those who turn back to Him."
        }),
        seed("joining-and-making-up", "Joining and making up", "Late prayer scenarios need sequence, not panic or random guessing.", 4, {
          line: "Make up missed prayers in [order], like the Prophet ﷺ did.",
          alt: ["a rush", "secret"],
          myth: "Missed prayers can only be made up on Fridays.",
          why: "At the Battle of the Trench, he prayed Asr, then Maghrib."
        }),
        seed("build-a-protection-plan", "Build a protection plan", "Plan your day around prayer instead of repairing the same misses again and again.", 4, {
          line: "Set an [alarm] so you wake up for Fajr.",
          alt: ["snack", "game"],
          myth: "Planning does not help you pray on time."
        }),
        seed("missed-prayer-review", "Missed prayers review", "Seriousness, repair, and practical planning all tie together.", 5, { kind: "review", lessonType: "mastery", line: "Take it seriously, pray it soon, and plan ahead." })
      ]
    },
    {
      id: "prayer-review-and-mastery",
      title: "Review and mastery",
      description: "A mixed review that connects purity, posture, order, correction, and presence.",
      order: 11,
      clusterSize: 5,
      premiumOnly: true,
      difficultyRange: [4, 5],
      sourceKeys: ["quran_5_6", "hadith_bukhari_631", "hadith_abudawud_856", "video_wudu_2", "video_salah_3"],
      lessons: [
        seed("mixed-review-1", "Mixed review 1", "Pull the prayer world together by moving across readiness, order, and common correction points.", 4, { kind: "review", lessonType: "review", line: "Wudu first: let's see if you remember every step.", reviewFrom: ["prayer-wudu"] }),
        seed("mixed-review-2", "Mixed review 2", "Review should now require comparison and error correction, not only memory.", 4, { kind: "review", lessonType: "review", line: "Now the whole salah, from Allahu akbar to salam.", reviewFrom: ["prayer-salah-basics", "prayer-ruku-and-sujud", "prayer-tashahhud"] }),
        seed("scenario-block-1", "Scenario block 1", "Judge realistic prayer and purity situations with sequence and confidence.", 4, {
          lessonType: "scenario",
          line: "Late, and the imam is bowing? Say Allahu akbar and [join].",
          alt: ["wait", "leave"],
          myth: "If the imam has started, wait for the next salah."
        }),
        seed("scenario-block-2", "Scenario block 2", "Harder cases ask you to tell apart what breaks prayer, what weakens it, and what repairs it.", 5, {
          lessonType: "scenario",
          line: "Your mind wandered in salah? Keep going; your salah still [counts].",
          alt: ["breaks", "stops"],
          myth: "A stray thought means you must start salah again.",
          why: "Talking on purpose is what breaks salah."
        }),
        seed("mastery-block-1", "Mastery block 1", "Mastery means connecting wudu, salah, correction, and khushu into one lived practice.", 5, { kind: "review", lessonType: "mastery", line: "Clean with wudu, pray on time, and pray calmly.", reviewFrom: ["prayer-wudu", "prayer-times", "prayer-khushu"] }),
        seed("mastery-block-2", "Mastery block 2", "The last checkpoint brings the whole prayer world together.", 5, { kind: "review", lessonType: "mastery", line: "You know it all: wudu, salah, and a focused heart.", reviewFrom: ["prayer-wudu", "prayer-salah-basics", "prayer-khushu"] })
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
        title: "Daily phrase rhythm",
        description: "Move beyond single phrases and learn when Muslims naturally remember Allah through the day.",
        order: 3,
        difficultyRange: [1, 3],
        sourceKeys: ["hadith_riyad_844", "hadith_bukhari_5376", "hadith_muslim_2992"],
        lessons: [
          seed("morning-remembrance", "Begin the day with remembrance", "The day opens better when the tongue remembers Allah early.", 1, {
            line: "When you wake up, say [Alhamdulillah] to thank Allah.",
            alt: ["Good night", "Hurry up"],
            myth: "Muslims thank Allah only once a year.",
            why: "The Prophet ﷺ praised Allah when he woke up."
          }),
          seed("thanks-language", "Language of gratitude", "Muslim speech regularly returns blessings back to Allah.", 1, {
            line: "Allah says: if you are thankful, I will give you [more].",
            alt: ["less", "nothing"],
            myth: "Being thankful makes our blessings smaller.",
            why: "This promise is in Surah Ibrahim, ayah 7."
          }),
          seed("future-speech", "Speaking about the future", "A Muslim speaks about future plans with humility before Allah.", 2, {
            practice: "Use InshaAllah when speaking about future plans, with humility not laziness.",
            line: "Say [InshaAllah] when you plan to do something later.",
            alt: ["Alhamdulillah", "Bismillah"],
            myth: "We say InshaAllah about things that already happened.",
            why: "InshaAllah means if Allah wills."
          }),
          seed("seeking-forgiveness", "Returning with Astaghfirullah", "Seeking forgiveness keeps the heart soft after mistakes and slips.", 2, {
            line: "After a mistake, say [Astaghfirullah] and try again.",
            alt: ["InshaAllah", "Alhamdulillah"],
            myth: "Astaghfirullah means \"Thank you.\"",
            why: "Astaghfirullah means I ask Allah to forgive me."
          }),
          seed("phrase-review", "Phrase flow review", "Daily phrases work best when they are used in the right moment with the right heart.", 3, { kind: "review", lessonType: "review", line: "InshaAllah for plans, Astaghfirullah for mistakes, Alhamdulillah for blessings." })
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
          seed("entering-home", "Entering with peace", "The home should be entered with calm words and awareness of Allah.", 1, {
            line: "When you come home, say [salam] to your family.",
            alt: ["goodbye", "nothing"],
            myth: "Salam is only for people outside your home.",
            why: "The Quran tells us to greet each other when we enter homes."
          }),
          seed("table-beginning", "Start food the right way", "Food is a daily worship moment when it begins with Allah's name.", 1, {
            line: "Before you eat, say [Bismillah].",
            alt: ["Alhamdulillah", "InshaAllah"],
            myth: "Muslims say Bismillah after they eat.",
            why: "Bismillah means in the name of Allah."
          }),
          seed("right-hand", "Eat with discipline", "The Sunnah joins remembrance with disciplined physical manners.", 2, {
            line: "Eat with your right hand, as the Prophet ﷺ taught.",
            ask: ["Which hand do we eat with?", "The right hand", "The left hand", "Any hand"],
            myth: "The Sunnah is to eat with the left hand.",
            why: "He ﷺ also said: eat from what is in front of you."
          }),
          seed("after-food", "Finish with gratitude", "A Muslim closes the meal by recognizing Allah's provision.", 2, {
            line: "When you finish eating, say [Alhamdulillah].",
            alt: ["Bismillah", "Astaghfirullah"],
            myth: "We thank Allah before food, never after.",
            why: "Allah is pleased when we praise Him after we eat."
          }),
          seed("home-review", "Home adab review", "The home becomes a training ground where phrases and manners reinforce one another.", 3, { kind: "review", lessonType: "review", line: "Salam at the door, Bismillah first, Alhamdulillah after." })
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
            line: "Before we pray, we get clean with [wudu].",
            alt: ["perfume", "a nap"],
            myth: "We can pray without getting clean first.",
            why: "Allah does not accept salah without being clean."
          }),
          seed("hear-the-call", "Answer the prayer rhythm", "Prayer creates structure in the day by returning the heart again and again to Allah.", 2, {
            line: "The [adhan] calls Muslims to pray five times a day.",
            alt: ["bell", "alarm"],
            myth: "Muslims are called to pray only once a week.",
            why: "Bilal was the first to call the adhan."
          }),
          seed("prepare-the-space", "Prepare your place", "Before worship, notice your clothing, your place, and your readiness.", 3, {
            line: "Pray in a [clean] spot, in tidy clothes.",
            alt: ["messy", "muddy"],
            myth: "Any dirty spot is fine for salah.",
            why: "We also face the Qiblah, toward the Ka'bah in Makkah."
          }),
          seed("follow-the-model", "Follow the taught model", "Islamic worship becomes strong by following what was taught, not by personal improvisation.", 3, {
            line: "We learn to pray from the way the Prophet ﷺ prayed.",
            ask: ["Whose way of praying do we follow?", "The Prophet's ﷺ way", "Our own made-up way", "Whatever looks cool"],
            myth: "Everyone may make up their own way to pray."
          }),
          seed("starter-worship-review", "Starter worship review", "Foundational worship habits are small in form but large in the direction they set.", 4, { kind: "review", lessonType: "review", line: "Get clean, hear the adhan, and pray like the Prophet ﷺ." })
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
          seed("allah-alone", "Allah alone is worshiped", "The center of Islam is worshiping Allah alone without partners.", 1, {
            line: "Muslims worship Allah [alone], with no partners.",
            alt: ["sometimes", "with idols"],
            myth: "Muslims worship Allah and other gods too.",
            why: "Believing this is called tawhid."
          }),
          seed("ikhlas-and-purity", "Purity in worship", "Surah Al-Ikhlas trains the heart to keep its belief about Allah pure and unmatched.", 2, {
            line: "Surah [Al-Ikhlas] says Allah is One, with no equal.",
            alt: ["Al-Fatihah", "Al-Kahf"],
            myth: "Surah Al-Ikhlas is the story of Musa.",
            why: "It says He has no children and was not born."
          }),
          seed("calling-on-allah", "Calling on Allah", "Du'a and hope should be directed to Allah with dependence and trust.", 3, {
            line: "When we need help, we ask [Allah] in du'a.",
            alt: ["a statue", "the stars"],
            myth: "We may make du'a to idols.",
            why: "Allah says: call on Me, and I will answer you."
          }),
          seed("tawhid-in-daily-life", "Tawhid in daily life", "Tawhid is not abstract; it changes fear, hope, speech, and obedience.", 4, {
            line: "Tawhid in daily life means we [trust] Allah in everything.",
            alt: ["forget", "ignore"],
            myth: "Tawhid only matters inside the masjid.",
            why: "Trusting Allah is called tawakkul."
          }),
          seed("tawhid-review", "Tawhid mastery", "Strong tawhid means guarding speech, worship, and reliance for Allah alone.", 4, { kind: "review", lessonType: "mastery", line: "Worship Allah alone, ask Him alone, and trust Him." })
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
          seed("what-iman-covers", "What iman covers", "The pillars of iman name what a believer must hold with certainty.", 1, {
            line: "There are [six] pillars of iman.",
            alt: ["three", "ten"],
            myth: "There are three pillars of iman.",
            why: "Allah, angels, books, messengers, the Last Day, and qadar."
          }),
          seed("angels-books-messengers", "Angels, books, and messengers", "These pillars teach that revelation reaches people through a real chain from Allah.", 2, {
            line: "We believe in Allah's [angels], books, and messengers.",
            alt: ["idols", "magic"],
            myth: "Belief in angels is not part of iman.",
            why: "Jibril is the angel who brought the Quran."
          }),
          seed("the-last-day", "The Last Day", "Belief in the Last Day reshapes urgency, repentance, and moral seriousness.", 3, {
            line: "On the [Last Day], everyone will stand before Allah.",
            alt: ["first day", "weekend"],
            myth: "Muslims do not believe in the Last Day.",
            why: "Our good and bad deeds will be weighed then."
          }),
          seed("qadar", "Qadar and trust", "Belief in qadar steadies the heart without making it passive or careless.", 4, {
            line: "[Qadar] means nothing happens unless Allah wills it.",
            alt: ["Wudu", "Adhan"],
            myth: "Qadar means we never need to try.",
            why: "We still work hard, then trust Allah."
          }),
          seed("iman-review", "Iman review", "The pillars of iman form one joined worldview, not separate facts to memorize and forget.", 4, { kind: "review", lessonType: "review", line: "Iman: Allah, angels, books, messengers, the Last Day, and qadar." })
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
          seed("why-names-matter", "Why Allah's names matter", "Knowing Allah through His names deepens worship, fear, hope, and love.", 2, {
            line: "Allah has beautiful [names], like Ar-Rahman.",
            alt: ["houses", "colors"],
            myth: "Allah has no names we can know.",
            why: "Ar-Rahman means the Most Merciful."
          }),
          seed("mercy-and-knowledge", "Mercy and knowledge", "Allah's mercy and knowledge are not poetic extras; they reshape how the believer lives.", 3, {
            line: "[Al-Alim] means Allah knows everything, even our secrets.",
            alt: ["Al-Malik", "Ar-Rahman"],
            myth: "Allah does not know what we hide.",
            why: "Allah's mercy is greater than His anger."
          }),
          seed("majesty-and-authority", "Majesty and authority", "Allah's sovereignty should create reverence and obedience, not only inspiration.", 4, {
            line: "[Al-Malik] means Allah is the King of everything.",
            alt: ["Al-Alim", "Ar-Rahman"],
            myth: "Allah needs help to run the world.",
            why: "Al-Aziz means the Almighty."
          }),
          seed("using-the-names", "Using the names in du'a", "The names of Allah should feed prayer, reliance, and repentance.", 4, {
            line: "Asking forgiveness? Call on Allah as [Al-Ghafur], the Forgiving.",
            alt: ["Al-Malik", "Al-Alim"],
            myth: "We must never use Allah's names in du'a.",
            why: "Allah says: call on Him by His beautiful names."
          }),
          seed("names-review", "Names and attributes review", "Belief about Allah should become more precise and more worshipful over time.", 5, { kind: "review", lessonType: "mastery", line: "Ar-Rahman, Al-Alim, Al-Malik, Al-Ghafur: Allah's beautiful names." })
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
          seed("belief-and-obedience", "Belief and obedience", "True iman should make obedience more meaningful, not more distant.", 2, {
            line: "Belief in Allah shows in how we [act].",
            alt: ["shop", "sleep"],
            myth: "Iman never shows in what we do.",
            why: "The Quran often joins belief with doing good deeds."
          }),
          seed("belief-under-pressure", "Belief under pressure", "Real belief shows itself when fear, loss, or temptation press on the heart.", 3, {
            line: "When things get hard, a believer stays [patient].",
            alt: ["rude", "angry"],
            myth: "A believer gives up when life gets hard.",
            why: "Allah is with those who are patient."
          }),
          seed("repentance-and-hope", "Repentance and hope", "Iman keeps the sinner from despair because Allah remains the door back.", 4, {
            line: "Never give up on Allah's [mercy]; He forgives.",
            alt: ["games", "food"],
            myth: "Some sins can never be forgiven, even after sincere repentance.",
            why: "Allah says: do not lose hope in Allah's mercy."
          }),
          seed("certainty-and-humility", "Certainty with humility", "Strong belief makes a person more grounded and humble, not proud and dismissive.", 4, {
            line: "Strong iman makes a person [humble], not proud.",
            alt: ["rude", "bossy"],
            myth: "Strong iman makes a person look down on others.",
            why: "Whoever is humble for Allah, Allah raises him up."
          }),
          seed("lived-iman-review", "Lived iman review", "Iman becomes deep when it explains how the believer worships, repents, fears, hopes, and stays steady.", 5, { kind: "review", lessonType: "mastery", line: "Iman shows in our deeds, patience, hope, and humility." })
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
  const branchSources = uniqueById(branch.sourceKeys.map((key) => SOURCE_LIBRARY[key]).filter(Boolean));
  const nodes: LearningNode[] = [];
  const lessonsById: Record<string, Lesson> = {};
  const clusterSize = Math.max(3, branch.clusterSize ?? 5);
  const taught: TaughtLesson[] = [];
  // What the lesson just before asked, so a review right after it asks something else when it can.
  let recent = new Set<string>();

  branch.lessons.forEach((entry, index) => {
    const nodeId = `${branch.id}-${entry.slug}`;
    const lessonId = `lesson-${nodeId}`;
    const kind = entry.kind ?? defaultNodeKind(section.topicId, index, branch.lessons.length);
    const sources = uniqueById((entry.sourceKeys ?? branch.sourceKeys).map((key) => SOURCE_LIBRARY[key]).filter(Boolean));
    const xpReward = 8 + entry.difficulty * 2 + (kind === "review" ? 4 : 0);
    const clusterIndex = Math.floor(index / clusterSize) + 1;
    const clusterId = `${branch.id}_cluster_${clusterIndex}`;
    const masteryTestEligible = kind === "review" || (index + 1) % clusterSize === 0 || index === branch.lessons.length - 1;
    const pool = entry.reviewFrom ? entry.reviewFrom.flatMap((id) => (id === branch.id ? taught : earlier.get(id) ?? [])) : taught;
    const own = teachingQuestions(lessonId, entry);
    const challenges = (own.length ? own : lookBackQuestions(lessonId, entry, pool, recent, branch.companion)).map((challenge) => ({
      ...challenge,
      sourceNodeId: challenge.sourceNodeId ?? nodeId,
      sourceLessonId: challenge.sourceLessonId ?? lessonId,
      resourceLabel: challenge.resourceLabel ?? (sources[0] ? "Open source" : undefined),
      resourceUrl: challenge.resourceUrl ?? sources[0]?.url
    }));
    if (own.length) {
      taught.push({ lessonId, nodeId, questions: challenges });
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
      { id: "prophets-early-messengers", title: "Early messengers", description: "Travel through the earliest lessons of humanity, repentance, warning, and trust.", order: 4, difficultyRange: [1, 3], sourceKeys: ["quran_21_25", "quran_33_21"], lessons: [
        seed("adam-and-repentance", "Adam and repentance", "The story of Adam teaches that the door back to Allah stays open through repentance.", 1, {
          line: "Adam made a mistake, said [sorry], and Allah forgave him.",
          alt: ["nothing", "goodbye"],
          myth: "Adam never asked Allah to forgive him.",
          why: "Adam was the first human and the first prophet."
        }),
        seed("nuh-and-patience", "Nuh and patience", "Nuh teaches long patience while calling people to truth.", 1, {
          line: "Nuh lived among his people for [950] years, calling them to Allah.",
          alt: ["9", "50"],
          myth: "Nuh called his people for only one day.",
          why: "Allah saved him and the believers in the ark."
        }),
        seed("hud-and-salih", "Hud and Salih", "These prophetic stories teach that pride and rejection ruin communities.", 2, {
          line: "Allah sent Salih's people a special [camel] as a sign.",
          alt: ["horse", "bird"],
          myth: "Salih's people took good care of the camel.",
          fix: "They harmed the camel, so Allah punished them.",
          why: "Hud was sent to the people of 'Ad."
        }),
        seed("lut-and-purity", "Lut and moral clarity", "The story of Lut teaches moral courage and firmness in corruption.", 2, {
          line: "Lut bravely told his people to stop doing [wrong].",
          alt: ["chores", "homework"],
          myth: "Lut joined his people in doing wrong.",
          why: "Allah saved Lut and his family, except his wife."
        }),
        seed("early-prophets-review", "Early messengers review", "The early prophets teach tawhid, repentance, patience, and warning together.", 3, { kind: "review", lessonType: "review", line: "Adam said sorry, Nuh was patient, and Lut was brave." })
      ]},
      { id: "prophets-family-and-sacrifice", title: "Family and sacrifice", description: "Move through Ibrahim's family, trust, and the tests that reshape generations.", order: 5, difficultyRange: [2, 4], sourceKeys: ["quran_3_97", "quran_22_27", "quran_12"], lessons: [
        seed("ibrahim-and-tawhid", "Ibrahim and tawhid", "Ibrahim models uncompromising tawhid under pressure from family and society.", 2, {
          line: "Ibrahim broke the [idols] and worshipped Allah alone.",
          alt: ["windows", "pots"],
          myth: "Ibrahim worshipped idols like his people.",
          why: "Allah made the fire cool and safe for him."
        }),
        seed("ismail-and-submission", "Ismail and submission", "The family of Ibrahim teaches willing submission to Allah's command.", 2, {
          line: "Ismail helped his father Ibrahim build the [Ka'bah].",
          alt: ["ark", "tower"],
          myth: "Ismail and Ibrahim built a palace for a king.",
          why: "They prayed: Our Lord, accept this from us."
        }),
        seed("yaqub-and-sabr", "Ya'qub and beautiful patience", "Ya'qub teaches grief with trust and patience that keeps turning to Allah.", 3, {
          line: "When Yusuf was lost, Ya'qub chose beautiful [patience].",
          alt: ["anger", "revenge"],
          myth: "Ya'qub stopped hoping in Allah.",
          why: "He told his sons: never lose hope in Allah's mercy."
        }),
        seed("yusuf-and-purity", "Yusuf and purity", "Yusuf teaches chastity, wisdom, patience, and eventual relief after hardship.", 3, {
          line: "Yusuf stayed [pure] and patient, and Allah raised him up.",
          alt: ["proud", "angry"],
          myth: "Yusuf gave in when he was tempted.",
          why: "He later became a leader in Egypt."
        }),
        seed("family-review", "Family and sacrifice review", "These prophets teach trust, sacrifice, purity, and patient hope.", 4, { kind: "review", lessonType: "review", line: "Ibrahim broke idols, Ismail built, Ya'qub waited, Yusuf stayed pure." })
      ]},
      { id: "prophets-power-and-deliverance", title: "Power and deliverance", description: "Learn from Musa, Harun, Dawud, Sulayman, and the test of leadership under Allah.", order: 6, difficultyRange: [2, 5], sourceKeys: ["quran_28_7", "quran_57_22_23", "quran_33_21"], lessons: [
        seed("musa-and-fear", "Musa and fear turned into mission", "Musa teaches how Allah turns fear into mission through trust and revelation.", 2, {
          line: "Allah told Musa and Harun: [fear] not, I am with you.",
          alt: ["speak", "walk"],
          myth: "Allah told Musa to be afraid of Pharaoh.",
          why: "They were sent to Pharaoh, a cruel king."
        }),
        seed("harun-and-support", "Harun and supportive leadership", "Harun shows that prophetic work also needs support, partnership, and patience.", 3, {
          line: "Musa asked Allah to make his brother [Harun] his helper.",
          alt: ["Yusuf", "Nuh"],
          myth: "Harun was Musa's enemy.",
          why: "Harun was a prophet too."
        }),
        seed("dawud-and-justice", "Dawud and justice", "Dawud teaches worship joined to judgment and responsible leadership.", 4, {
          line: "Dawud was a prophet and a [king] who judged fairly.",
          alt: ["farmer", "sailor"],
          myth: "Dawud judged people unfairly.",
          why: "Allah gave Dawud the Zabur."
        }),
        seed("sulayman-and-gratitude", "Sulayman and gratitude", "Sulayman teaches that power should increase gratitude, not pride.", 4, {
          line: "Sulayman understood the [birds] and the ants, and thanked Allah.",
          alt: ["stars", "stones"],
          myth: "Sulayman became proud and forgot Allah.",
          why: "He smiled at an ant and thanked Allah."
        }),
        seed("power-review", "Leadership and deliverance review", "These prophets teach deliverance, justice, support, and grateful leadership.", 5, { kind: "review", lessonType: "mastery", line: "Musa was brave, Harun helped, Dawud was fair, Sulayman was thankful." })
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
      { id: "women-quran-depth", title: "Women in the Quran 2", description: "Go deeper through women in the Quran and the virtues their stories teach.", order: 3, difficultyRange: [1, 4], sourceKeys: ["quran_28_7", "quran_66_11", "quran_19"], lessons: [
        seed("hawwa-and-return", "Hawwa and returning to Allah", "The earliest woman in revelation is remembered inside the lesson of repentance and return.", 1, {
          line: "Adam and [Hawwa] asked Allah to forgive them together.",
          alt: ["Maryam", "Asiyah"],
          myth: "Only Adam asked for forgiveness, not Hawwa.",
          why: "They said: Our Lord, we have wronged ourselves."
        }),
        seed("mother-of-musa-and-trust", "The mother of Musa and trust", "The mother of Musa teaches trust in Allah under fear and impossible pressure.", 2, {
          line: "Musa's mother trusted Allah and put baby Musa in the [river].",
          alt: ["well", "desert"],
          myth: "The mother of Musa hid him on a mountain.",
          why: "Allah brought Musa back to her."
        }),
        seed("asiyah-and-steadfastness", "Asiyah and steadfast faith", "Asiyah teaches that faith can remain luminous even under tyrannical oppression.", 3, {
          line: "Asiyah, Pharaoh's [wife], believed in Allah.",
          alt: ["daughter", "sister"],
          myth: "Asiyah was the wife of Musa.",
          why: "She asked Allah for a house near Him in Paradise."
        }),
        seed("maryam-and-purity", "Maryam and purity", "Maryam teaches worship, purity, patience, and trust in Allah's decree.", 3, {
          line: "A whole surah of the Quran is named after [Maryam].",
          alt: ["Asiyah", "Khadijah"],
          myth: "Maryam is not mentioned in the Quran.",
          why: "She is the only woman named in the Quran."
        }),
        seed("quran-women-review", "Women in the Quran review", "These women teach repentance, trust, steadfastness, and purity under pressure.", 4, { kind: "review", lessonType: "review", line: "Hawwa repented, Musa's mother trusted, Asiyah believed, Maryam was pure." })
      ]},
      { id: "women-mothers-depth", title: "Mothers of the Believers 2", description: "Move in order through the Prophet's wives and the special gifts they gave the Ummah.", order: 4, difficultyRange: [2, 5], sourceKeys: ["quran_33_6", "hadith_bukhari_3820", "hadith_bukhari_3770", "hadith_bukhari_4987"], lessons: [
        seed("khadijah-and-support", "Khadijah and support", "Khadijah teaches support, reassurance, and sacrifice at the birth of revelation.", 2, {
          line: "[Khadijah] was the first person to believe in the Prophet ﷺ.",
          alt: ["Aishah", "Hafsah"],
          myth: "Khadijah was the Prophet's ﷺ last wife.",
          fix: "She was his first wife.",
          why: "She comforted him after the first revelation came."
        }),
        seed("sawdah-and-stability", "Sawdah and stability", "Sawdah teaches steadiness, generosity, and the quiet stabilizing roles inside the Prophetic household.", 3, {
          line: "Sawdah married the Prophet ﷺ after [Khadijah] passed away.",
          alt: ["Hafsah", "Aishah"],
          myth: "Sawdah was the daughter of Abu Bakr.",
          fix: "Aishah, not Sawdah, was the daughter of Abu Bakr.",
          why: "Sawdah kindly gave her day with the Prophet ﷺ to Aishah."
        }),
        seed("aishah-and-knowledge", "Aishah and knowledge", "Aishah teaches intelligence, memory, worship, and transmission of the Sunnah.", 4, {
          line: "Aishah taught many [hadith] to the Muslims.",
          alt: ["poems", "songs"],
          myth: "Aishah was the daughter of Umar.",
          why: "She was the daughter of Abu Bakr.",
          fix: "She was the daughter of Abu Bakr."
        }),
        seed("hafsah-and-preservation", "Hafsah and preservation", "Hafsah teaches trust, dignity, and a key role in preserving written Quranic material.", 4, {
          line: "Hafsah kept the written [Quran] pages safe.",
          alt: ["letters", "maps"],
          myth: "Hafsah was the daughter of Abu Bakr.",
          fix: "Hafsah was the daughter of Umar.",
          why: "Uthman later copied them for the Muslim cities."
        }),
        seed("mothers-review", "Mothers of the Believers review", "The Mothers of the Believers teach support, knowledge, service, and preserving the religion.", 5, { kind: "review", lessonType: "mastery", line: "Khadijah believed first, Aishah taught, and Hafsah kept the Quran safe." })
      ]},
      { id: "women-virtues-and-legacy", title: "Virtues and legacy", description: "Study the themes these women share: courage, worship, service, and carrying revelation.", order: 5, difficultyRange: [3, 5], sourceKeys: ["quran_33_6", "quran_66_11", "quran_19"], lessons: [
        seed("courage-under-pressure", "Courage under pressure", "Many honored women in revelation show faith under immense social pressure.", 3, {
          line: "Asiyah kept her faith, even in Pharaoh's [palace].",
          alt: ["masjid", "school"],
          myth: "Asiyah gave up her faith to please Pharaoh."
        }),
        seed("worship-and-devotion", "Worship and devotion", "Their legacy shows deep worship, not only public significance.", 4, {
          line: "Maryam prayed in her room, and Allah sent her [food].",
          alt: ["letters", "toys"],
          myth: "Zakariyya brought Maryam all of her food.",
          why: "She said: it is from Allah."
        }),
        seed("service-to-revelation", "Service to revelation", "Some of these women served revelation through support, preservation, or transmission.", 4, {
          line: "Khadijah used her [wealth] to support the Prophet ﷺ.",
          alt: ["sword", "poems"],
          myth: "Khadijah kept her wealth away from the Prophet ﷺ."
        }),
        seed("lessons-for-today", "Lessons for today", "Their lives still teach us how to be steady, pure, knowledgeable, and courageous.", 5, {
          line: "These women teach us to trust Allah and stay [brave].",
          alt: ["lazy", "rude"],
          myth: "These women teach that faith is only for men.",
          why: "Allah rewards the good deeds of women and men alike."
        }),
        seed("women-legacy-review", "Women's legacy mastery review", "The women honored in revelation teach a connected legacy of worship, courage, trust, and service.", 5, { kind: "review", lessonType: "mastery", line: "Brave Asiyah, devoted Maryam, generous Khadijah: they trusted Allah." })
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
        seed("neighbor-rights", "Neighbor rights", "Islamic manners extend beyond the self and family into the rights of neighbors.", 1, {
          line: "Jibril kept telling the Prophet ﷺ to be kind to [neighbors].",
          alt: ["camels", "kings"],
          myth: "Neighbors have no rights over us.",
          why: "Never think a small gift to a neighbor is too small."
        }),
        seed("guest-honor", "Honor the guest", "Guests should feel welcomed, not managed like a burden.", 2, {
          line: "A Muslim [welcomes] a guest with kindness and food.",
          alt: ["ignores", "rushes"],
          myth: "A guest is a bother to be avoided.",
          why: "Honoring guests is part of believing in Allah and the Last Day."
        }),
        seed("sharing-space", "Sharing space well", "Adab in shared spaces means patience, cleanliness, and not crowding others with selfishness.", 2, {
          line: "In shared places, keep things [clean] and make room for others.",
          alt: ["messy", "locked"],
          myth: "In shared places, take all the room you like.",
          why: "The Quran says: when asked to make room, make room."
        }),
        seed("helping-neighbors", "Helping nearby people", "Mercy becomes concrete when help reaches nearby people in ordinary needs.", 3, {
          line: "Moving something harmful off the path is a [charity].",
          alt: ["crime", "waste"],
          myth: "Moving a rock off the path earns no reward.",
          why: "Even smiling at your brother is a charity."
        }),
        seed("social-adab-review", "Neighbor and guest review", "Good adab should be visible in the home, at the door, and around daily contact.", 4, { kind: "review", lessonType: "review", line: "Be kind to neighbors, honor guests, share space, and help." })
      ]},
      { id: "manners-emotional-discipline", title: "Emotional discipline", description: "Learn how patience, restraint, and soft strength protect Muslim character.", order: 5, difficultyRange: [2, 5], sourceKeys: ["hadith_bukhari_6013", "hadith_tirmidhi_2002"], lessons: [
        seed("anger-and-restraint", "Anger and restraint", "Strong manners often show most clearly when anger rises.", 2, {
          line: "The strong person is the one who controls their [anger].",
          alt: ["friends", "money"],
          myth: "The strong person is the one who shouts.",
          why: "If you get angry while standing, sit down."
        }),
        seed("gentleness", "Gentleness with strength", "Gentleness is not weakness; it is disciplined strength governed by revelation.", 3, {
          line: "Allah loves [gentleness] in every matter.",
          alt: ["shouting", "rushing"],
          myth: "Being gentle means being weak.",
          why: "Gentleness makes everything more beautiful."
        }),
        seed("apologizing", "Repairing with apology", "A well-mannered Muslim knows how to repair harm, not only avoid it.", 3, {
          line: "If you hurt someone, say [sorry] and make it right.",
          alt: ["nothing", "goodbye"],
          myth: "Saying sorry shows you are weak.",
          why: "A good deed after a bad one helps wipe it away."
        }),
        seed("self-awareness", "Notice your own patterns", "Growth in character requires noticing when and where the self keeps slipping.", 4, {
          line: "Check yourself: what went well, and what can you [fix]?",
          alt: ["hide", "break"],
          myth: "Good Muslims never need to check themselves.",
          why: "Umar said: take account of yourselves before you are taken to account."
        }),
        seed("emotional-review", "Emotional discipline review", "Adab under pressure needs mercy, self-control, humility, and repair.", 5, { kind: "review", lessonType: "mastery", line: "Control anger, be gentle, say sorry, and check yourself." })
      ]},
      { id: "manners-public-conduct", title: "Public conduct", description: "Take adab into masjid, public spaces, disagreement, and online life.", order: 6, difficultyRange: [2, 5], sourceKeys: ["quran_9_119", "hadith_tirmidhi_2002"], lessons: [
        seed("masjid-adab", "Masjid adab", "The masjid should train reverence, restraint, and respect for others in worship.", 2, {
          line: "Inside the masjid, speak [softly] and stay calm.",
          alt: ["loudly", "rudely"],
          myth: "The masjid is a place for shouting and games.",
          why: "When you enter, pray two rak'ahs before you sit."
        }),
        seed("disagreement", "Disagreement with adab", "Truth and firmness do not excuse mockery, contempt, or reckless speech.", 3, {
          line: "Disagree kindly, and never [mock] anyone.",
          alt: ["help", "greet"],
          myth: "We may mock people we disagree with.",
          why: "The Quran says: do not let one people mock another."
        }),
        seed("public-posture", "Public posture", "A Muslim should feel watched by Allah in posture, speech, and the way space is taken up.", 4, {
          line: "Walk [humbly], not proudly, wherever you go.",
          alt: ["sneakily", "angrily"],
          myth: "Muslims should walk around showing off.",
          why: "Allah's servants walk on the earth gently."
        }),
        seed("online-adab", "Online adab", "Digital spaces still test the tongue, ego, and manners of a Muslim.", 4, {
          line: "Online too: say something good, or stay [quiet].",
          alt: ["loud", "mean"],
          myth: "Bad words online do not count.",
          why: "The Prophet ﷺ said: say what is good or stay silent."
        }),
        seed("public-review", "Public conduct review", "Adab must survive the masjid, disagreement, crowds, and screens if it is real.", 5, { kind: "review", lessonType: "mastery", line: "Calm in the masjid, kind when disagreeing, good words online." })
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
        seed("rights-are-trusts", "Rights are trusts", "Rights in marriage are given to protect the home, not to feed ego.", 2, {
          line: "Husband and wife both have rights, kept as a trust.",
          ask: ["Who has rights in a marriage?", "Husband and wife", "Only the husband", "Only the wife"],
          myth: "Only one spouse has rights.",
          why: "The Quran says wives have rights like their duties."
        }),
        seed("mutual-dignity", "Mutual dignity", "A home of sakinah needs dignity for both husband and wife.", 2, {
          line: "Spouses treat each other with [respect], never insults.",
          alt: ["teasing", "silence"],
          myth: "Insulting your spouse is fine when you are upset.",
          why: "The best of you are the best to their families."
        }),
        seed("provision-and-care", "Provision and care", "Marriage includes concrete care, provision, and emotional steadiness.", 3, {
          line: "A husband must [provide] food, a home, and care.",
          alt: ["hide", "forget"],
          myth: "A husband has no duty to provide for his family.",
          why: "Spending on family is a charity too."
        }),
        seed("trust-and-secrets", "Trust and private trust", "A marriage needs protection of private trust and confidentiality.", 3, {
          line: "Spouses keep each other's secrets safe.",
          ask: ["What do spouses do with each other's secrets?", "Keep them safe", "Tell friends", "Post them online"],
          myth: "Spouses should tell others each other's secrets.",
          why: "The Quran calls spouses clothing for each other."
        }),
        seed("rights-review", "Rights review", "Marriage rights work best when they are carried as trusts under Allah.", 4, { kind: "review", lessonType: "review", line: "Both have rights: respect, care, and secrets kept safe." })
      ]},
      { id: "marriage-conflict-and-repair", title: "Conflict and repair", description: "Learn how to disagree, repent, repair, and keep mercy alive under strain.", order: 4, difficultyRange: [2, 5], sourceKeys: ["quran_30_21", "quran_33_21"], lessons: [
        seed("argue-with-adab", "Disagree with adab", "Conflict in marriage still has to remain inside Islamic character.", 2, {
          line: "Even in an argument, stay [kind] and fair.",
          alt: ["mean", "loud"],
          myth: "In an argument, being unkind is fine.",
          why: "The Prophet ﷺ never hit a woman or a servant."
        }),
        seed("listen-before-answering", "Listen before answering", "Homes calm down when each person actually hears the other before reacting.", 3, {
          line: "[Listen] fully before you answer.",
          alt: ["Shout", "Leave"],
          myth: "Interrupting helps solve fights faster."
        }),
        seed("repair-after-harm", "Repair after harm", "Homes survive by repair, apology, and sincere course correction.", 3, {
          line: "After hurting your spouse, say sorry and [fix] it.",
          alt: ["forget", "hide"],
          myth: "Saying sorry to your spouse is a weakness.",
          why: "The Quran praises those who forgive people."
        }),
        seed("bring-in-help-wisely", "Bring in help wisely", "Some conflicts need counsel and outside help, but with wisdom and boundaries.", 4, {
          line: "In a big quarrel, ask a wise [helper] from each family.",
          alt: ["stranger", "crowd"],
          myth: "Asking family for help is never allowed.",
          why: "This is in Surah An-Nisa, ayah 35."
        }),
        seed("conflict-review", "Conflict mastery review", "Mercy in marriage is proven under tension, not only in calm moments.", 5, { kind: "review", lessonType: "mastery", line: "Stay kind, listen first, say sorry, and get wise help." })
      ]},
      { id: "marriage-spiritual-home", title: "Spiritual home", description: "Build the home around worship, du'a, patience, and shared direction toward Allah.", order: 5, difficultyRange: [2, 5], sourceKeys: ["quran_30_21", "quran_33_21"], lessons: [
        seed("pray-together", "Bring prayer into the home", "A home becomes steadier when worship is not left outside the marriage.", 2, {
          line: "Pray some [prayers] at home, not only at the masjid.",
          alt: ["games", "meals"],
          myth: "Prayer has no place in the home.",
          why: "The Prophet ﷺ said: don't make your homes like graves."
        }),
        seed("dua-for-the-home", "Make du'a for the home", "Homes need repeated turning to Allah for mercy, repair, and guidance.", 3, {
          line: "Ask Allah for a family that brings [comfort] to your eyes.",
          alt: ["worry", "trouble"],
          myth: "The Quran has no du'a for families.",
          why: "This du'a is in Surah Al-Furqan, ayah 74."
        }),
        seed("patience-and-growth", "Grow through patience", "Marriage requires patience with imperfection while still moving toward improvement.", 4, {
          line: "If one habit bothers you, remember the [good] ones.",
          alt: ["bad", "loud"],
          myth: "One bad habit means a spouse has no good.",
          why: "The Prophet ﷺ said: if you dislike one trait, you will like another."
        }),
        seed("raising-the-tone", "Raise the tone of the home", "Speech, cleanliness, gratitude, and worship all set the tone of a house.", 4, {
          line: "Fill the home with salam, thanks, and kind [words].",
          alt: ["shouts", "fights"],
          myth: "Kind words at home do not matter.",
          why: "Saying salam when you come home brings blessing."
        }),
        seed("home-review", "Spiritual home review", "The best homes are built by mercy, worship, patience, and repeated repair.", 5, { kind: "review", lessonType: "mastery", line: "A good home has prayer, du'a, patience, and kind words." })
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
        seed("opening-and-names", "Opening and names", "Al-Fatihah opens the Quran and frames the believer's relationship with Allah.", 1, {
          surahName: "Al-Fatihah",
          ayahRange: "1-7",
          line: "Al-Fatihah is the [first] surah of the Quran.",
          alt: ["last", "longest"],
          myth: "Al-Fatihah is the last surah of the Quran.",
          why: "Al-Fatihah means The Opening."
        }),
        seed("praise-and-lordship", "Praise and lordship", "The surah begins with praise of Allah before requests are made.", 2, {
          surahName: "Al-Fatihah",
          ayahRange: "1-4",
          line: "After Bismillah, it says: [Alhamdulillah], all praise is for Allah.",
          alt: ["InshaAllah", "Astaghfirullah"],
          myth: "Al-Fatihah has no praise of Allah in it.",
          why: "Rabbil 'alamin means Lord of all the worlds."
        }),
        seed("worship-and-help", "Worship and seeking help", "The center of the surah ties worship and dependence together in one verse.", 3, {
          surahName: "Al-Fatihah",
          ayahRange: "5",
          line: "Iyyaka na'budu means: You alone we [worship].",
          alt: ["visit", "draw"],
          myth: "Iyyaka na'budu means: See you tomorrow.",
          why: "Then: wa iyyaka nasta'in, and You alone we ask for help."
        }),
        seed("straight-path", "The straight path", "The ending of Al-Fatihah teaches the believer to ask constantly for guidance and protection from deviation.", 3, {
          surahName: "Al-Fatihah",
          ayahRange: "6-7",
          line: "In Al-Fatihah we ask: guide us to the [straight] path.",
          alt: ["crooked", "secret"],
          myth: "Al-Fatihah asks Allah for a crooked path.",
          why: "Muslims say this in every rak'ah of salah."
        }),
        seed("fatihah-review", "Al-Fatihah review", "Al-Fatihah teaches praise, worship, dependence, and a constant need for guidance.", 4, { kind: "review", lessonType: "review", surahName: "Al-Fatihah", ayahRange: "1-7", line: "Al-Fatihah: praise Allah, worship Him, and ask for guidance." })
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
        seed("opening-guidance", "Opening guidance", "The opening of Al-Baqarah defines revelation as guidance for the muttaqun.", 1, {
          surahName: "Al-Baqarah",
          ayahRange: "1-5",
          line: "Near its start, Al-Baqarah says: this Book has no [doubt] in it.",
          alt: ["pictures", "end"],
          myth: "Al-Baqarah is the shortest surah.",
          fix: "It is the longest surah of the Quran.",
          why: "It is guidance for those who are mindful of Allah."
        }),
        seed("qualities-of-guided", "Qualities of the guided", "The surah names believing in the unseen, prayer, and spending as signs of guidance.", 2, {
          surahName: "Al-Baqarah",
          ayahRange: "2-5",
          line: "The guided believe in the unseen, [pray], and give.",
          alt: ["sleep", "shout"],
          myth: "The guided never give to others.",
          why: "Al-Baqarah is the longest surah in the Quran."
        }),
        seed("ayat-al-kursi", "Ayat al-Kursi inside Al-Baqarah", "Ayat al-Kursi brings Allah's life, knowledge, and authority into one towering passage.", 3, {
          surahName: "Al-Baqarah",
          ayahRange: "255",
          line: "Ayat al-Kursi is the greatest [ayah] in the Quran.",
          alt: ["story", "surah"],
          myth: "Ayat al-Kursi is in Surah Ya-Sin.",
          why: "It is ayah 255 of Al-Baqarah.",
          fix: "It is ayah 255 of Al-Baqarah."
        }),
        seed("ending-belief", "The ending of the surah", "The closing verses gather belief, obedience, and humble appeal for mercy.", 4, {
          surahName: "Al-Baqarah",
          ayahRange: "285",
          line: "Its last ayahs say: we hear and we [obey].",
          alt: ["forget", "argue"],
          myth: "Al-Baqarah ends with the story of the cave.",
          why: "The Prophet ﷺ said its last two ayahs are enough at night."
        }),
        seed("baqarah-review", "Al-Baqarah review", "Al-Baqarah begins and ends with guidance, belief, action, and awe.", 5, { kind: "review", lessonType: "mastery", surahName: "Al-Baqarah", ayahRange: "1-5, 255, 285", line: "Al-Baqarah: guidance, Ayat al-Kursi, and we hear and obey." })
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
        seed("steadfastness", "Steadfastness", "Ali 'Imran repeatedly trains the believer to stay firm under pressure.", 1, {
          surahName: "Ali 'Imran",
          line: "Ali 'Imran tells believers: be patient and stay [firm].",
          alt: ["lazy", "loud"],
          myth: "Ali 'Imran tells believers to give up.",
          why: "Ali 'Imran means the family of Imran."
        }),
        seed("holding-the-rope", "Holding together to revelation", "The surah teaches unity around revelation rather than drift into ego and fragmentation.", 2, {
          surahName: "Ali 'Imran",
          line: "Hold on to Allah's [rope] together, and don't split up.",
          alt: ["kite", "coat"],
          myth: "Ali 'Imran tells Muslims to split into groups.",
          why: "Many scholars explain Allah's rope as the Quran."
        }),
        seed("truth-and-tests", "Truth and tests", "Ali 'Imran shows that being on truth does not remove tests; it teaches how to move through them.", 3, {
          surahName: "Ali 'Imran",
          line: "Ali 'Imran says believers will be [tested], so be patient.",
          alt: ["famous", "bored"],
          myth: "Ali 'Imran says believers never face tests.",
          why: "Patience and taqwa carry us through."
        }),
        seed("dialogue-and-clarity", "Dialogue and clarity", "The surah teaches clarity with people of other revelations while staying rooted in truth.", 4, {
          surahName: "Ali 'Imran",
          line: "Ali 'Imran calls the People of the [Book] to worship Allah alone.",
          alt: ["Cave", "Elephant"],
          myth: "People of the Book means people who sell books.",
          why: "People of the Book means Jews and Christians."
        }),
        seed("imran-review", "Ali 'Imran review", "Ali 'Imran trains firmness, unity, clarity, and patience under trial.", 5, { kind: "review", lessonType: "review", surahName: "Ali 'Imran", line: "Ali 'Imran: stay firm, hold together, and be patient in tests." })
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
        seed("social-justice", "Justice and responsibility", "An-Nisa builds a community through justice and careful treatment of rights.", 1, {
          surahName: "An-Nisa",
          line: "An-Nisa tells believers to stand firm for [justice].",
          alt: ["money", "fame"],
          myth: "An-Nisa says justice only matters for friends.",
          why: "Be fair even if it is against yourself or your family."
        }),
        seed("rights-of-people", "Rights of people", "The surah repeatedly protects people whose rights are easy to neglect.", 2, {
          surahName: "An-Nisa",
          line: "An-Nisa protects [orphans] and their money.",
          alt: ["kings", "thieves"],
          myth: "An-Nisa says taking an orphan's money is fine.",
          why: "An-Nisa means The Women."
        }),
        seed("family-duty", "Family duty and care", "An-Nisa links family relationships to accountability before Allah.", 3, {
          surahName: "An-Nisa",
          line: "An-Nisa says: be good to your [parents] and relatives.",
          alt: ["phones", "toys"],
          myth: "An-Nisa says parents have no rights.",
          why: "The same ayah says be good to neighbors and the needy."
        }),
        seed("belief-and-order", "Belief and social order", "The surah joins belief with law, order, and accountability in social life.", 4, {
          surahName: "An-Nisa",
          line: "An-Nisa says: obey Allah and obey the [Messenger].",
          alt: ["crowd", "TV"],
          myth: "An-Nisa says to obey no one at all.",
          why: "It also says to take disagreements back to Allah and His Messenger."
        }),
        seed("nisa-review", "An-Nisa review", "An-Nisa is a surah of justice, rights, family duty, and accountable belief.", 5, { kind: "review", lessonType: "review", surahName: "An-Nisa", line: "An-Nisa: justice, orphans, parents, and obeying Allah and His Messenger." })
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
        seed("fulfill-covenants", "Fulfill covenants", "Al-Ma'idah opens with the demand to honor covenants and commitments.", 1, {
          surahName: "Al-Ma'idah",
          line: "Al-Ma'idah begins: O believers, keep your [promises].",
          alt: ["toys", "shoes"],
          myth: "Al-Ma'idah says promises do not matter.",
          why: "Al-Ma'idah means The Table Spread."
        }),
        seed("purity-and-prayer", "Purity and prayer", "This surah teaches that purity belongs at the entrance of prayer.", 2, {
          surahName: "Al-Ma'idah",
          ayahRange: "6",
          line: "Ayah 6 of Al-Ma'idah teaches [wudu] before salah.",
          alt: ["fasting", "Hajj"],
          myth: "Wudu is not mentioned in the Quran.",
          why: "It names the face, arms, head and feet."
        }),
        seed("lawful-living", "Lawful living", "Al-Ma'idah trains the believer to care about halal and haram through obedience to Allah.", 3, {
          surahName: "Al-Ma'idah",
          line: "Al-Ma'idah says: eat what is [halal] and good.",
          alt: ["haram", "stolen"],
          myth: "Halal means food that Allah forbids.",
          why: "Halal means allowed, and haram means not allowed."
        }),
        seed("loyalty-to-revelation", "Loyalty to revelation", "The surah repeatedly calls believers back to revelation when communities drift.", 4, {
          surahName: "Al-Ma'idah",
          line: "Al-Ma'idah says to judge by what Allah revealed.",
          ask: ["What does Al-Ma'idah say to judge by?", "What Allah revealed", "What people like", "What is popular"],
          myth: "Al-Ma'idah says to judge by whatever people like.",
          why: "Ayah 3 says the religion was made complete."
        }),
        seed("maidah-review", "Al-Ma'idah review", "Al-Ma'idah teaches fulfilled covenants, lawful living, purity, and loyalty to guidance.", 5, { kind: "review", lessonType: "review", surahName: "Al-Ma'idah", line: "Al-Ma'idah: keep promises, make wudu, eat halal, follow revelation." })
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
        seed("beautiful-story", "The best of stories", "Surah Yusuf unfolds as one story that teaches trust through many turns.", 1, {
          surahName: "Yusuf",
          line: "Allah calls Yusuf's story the [best] of stories.",
          alt: ["shortest", "saddest"],
          myth: "Surah Yusuf has no story in it.",
          why: "Almost the whole surah tells this one story."
        }),
        seed("temptation-and-purity", "Temptation and purity", "Yusuf teaches purity when temptation and opportunity meet.", 2, {
          surahName: "Yusuf",
          line: "When tempted to do wrong, Yusuf said [no] and stayed pure.",
          alt: ["yes", "maybe"],
          myth: "Yusuf gave in when he was tempted.",
          why: "He said prison was dearer to him than doing wrong."
        }),
        seed("prison-and-patience", "Patience in confinement", "The surah shows how patience and da'wah continue even in confinement.", 3, {
          surahName: "Yusuf",
          line: "Even in [prison], Yusuf taught others about Allah.",
          alt: ["a ship", "the market"],
          myth: "Yusuf stopped talking about Allah in prison.",
          why: "He also explained the dreams of two prisoners."
        }),
        seed("forgiveness-and-reunion", "Forgiveness and reunion", "The ending of Yusuf teaches forgiveness, healing, and gratitude after long pain.", 4, {
          surahName: "Yusuf",
          line: "Yusuf [forgave] his brothers when they met again.",
          alt: ["punished", "ignored"],
          myth: "Yusuf punished his brothers when they met again.",
          why: "He told them: no blame on you today."
        }),
        seed("yusuf-review", "Surah Yusuf review", "Surah Yusuf gathers temptation, patience, wisdom, da'wah, and forgiveness into one path.", 5, { kind: "review", lessonType: "mastery", surahName: "Yusuf", line: "Yusuf: the best story, staying pure, patience in prison, and forgiving." })
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
        seed("mercy-at-the-opening", "Mercy at the opening", "Surah Maryam opens in a climate of mercy, intimate du'a, and divine care.", 1, {
          surahName: "Maryam",
          line: "Surah Maryam opens with Zakariyya's quiet [du'a] for a child.",
          alt: ["song", "letter"],
          myth: "Zakariyya never asked Allah for a child.",
          why: "He was old, but nothing is hard for Allah."
        }),
        seed("family-and-dua", "Family and du'a", "The surah shows families held, tested, and guided through prayer and supplication.", 2, {
          surahName: "Maryam",
          line: "Allah answered Zakariyya with a son named [Yahya].",
          alt: ["Musa", "Yusuf"],
          myth: "Zakariyya's son was named Musa.",
          why: "No one had that name before him."
        }),
        seed("maryam-her-trust", "Maryam's trust", "Maryam stands as a model of worship, purity, and trust under an impossible decree.", 3, {
          surahName: "Maryam",
          line: "Maryam trusted Allah when baby [Isa] was born.",
          alt: ["Musa", "Yahya"],
          myth: "Maryam was the mother of Musa.",
          why: "Baby Isa spoke from the cradle to defend her."
        }),
        seed("prophetic-links", "The prophets inside the surah", "The surah links multiple prophets through prayer, worship, and Allah's care.", 4, {
          surahName: "Maryam",
          line: "Surah Maryam tells of [Ibrahim] speaking gently to his father.",
          alt: ["Yusuf", "Sulayman"],
          myth: "In Surah Maryam, Ibrahim is rude to his father.",
          why: "It also mentions Musa, Ismail and Idris."
        }),
        seed("maryam-review", "Surah Maryam review", "Surah Maryam is a surah of mercy, prayer, family hope, and pure worship under trial.", 5, { kind: "review", lessonType: "review", surahName: "Maryam", line: "Surah Maryam: Zakariyya's du'a, Yahya, Maryam and Isa, and Ibrahim." })
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
        seed("faith-under-trial", "Faith under trial", "Al-Kahf teaches holding faith when environments turn hostile.", 2, {
          surahName: "Al-Kahf",
          line: "Young believers hid in a [cave] to keep their faith.",
          alt: ["ship", "palace"],
          myth: "The People of the Cave gave up their faith.",
          why: "Allah made them sleep there for many years."
        }),
        seed("wealth-and-gardens", "Wealth and gardens", "The surah teaches perspective about wealth, status, and what actually lasts.", 3, {
          surahName: "Al-Kahf",
          line: "A man was proud of his two [gardens], then they were ruined.",
          alt: ["houses", "horses"],
          myth: "The garden owner stayed humble and thankful.",
          why: "Good deeds last longer than wealth."
        }),
        seed("knowledge-and-khidr", "Knowledge and humility", "The story with Khidr teaches humility before what Allah knows beyond us.", 4, {
          surahName: "Al-Kahf",
          line: "Musa traveled to learn from a wise servant of Allah, [Khidr].",
          alt: ["Harun", "Yusuf"],
          myth: "Musa knew everything, so he learned from no one.",
          why: "Khidr did things that only made sense later."
        }),
        seed("power-and-dhulqarnayn", "Power and responsibility", "Dhul-Qarnayn teaches power under gratitude, justice, and responsible service.", 4, {
          surahName: "Al-Kahf",
          line: "Dhul-Qarnayn was a strong ruler who built a great [wall].",
          alt: ["ship", "tower"],
          myth: "Dhul-Qarnayn said his power came from himself.",
          why: "He said: this is a mercy from my Lord.",
          fix: "He said: this is a mercy from my Lord."
        }),
        seed("kahf-review", "Surah Al-Kahf review", "Surah Al-Kahf is a map for protecting faith through trials of belonging, wealth, knowledge, and power.", 5, { kind: "review", lessonType: "mastery", surahName: "Al-Kahf", line: "Al-Kahf: the cave, the two gardens, Musa and Khidr, Dhul-Qarnayn." })
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
        seed("revelation-and-warning", "Revelation and warning", "Ya-Sin opens with revelation and the seriousness of warning a heedless people.", 2, {
          surahName: "Ya-Sin",
          line: "Ya-Sin begins by swearing by the [wise] Quran.",
          alt: ["noisy", "short"],
          myth: "Ya-Sin begins with the story of Yusuf.",
          why: "Next it says the Prophet ﷺ is truly a messenger."
        }),
        seed("signs-in-creation", "Signs in creation", "The surah shows signs in the world that point back to Allah.", 3, {
          surahName: "Ya-Sin",
          line: "Ya-Sin says the sun and moon each [swim] in an orbit.",
          alt: ["sleep", "stop"],
          myth: "Ya-Sin says the sun and moon crash into each other.",
          why: "They are signs that point to Allah."
        }),
        seed("resurrection", "Resurrection and return", "Ya-Sin repeatedly calls the believer back to life after death and final return.", 4, {
          surahName: "Ya-Sin",
          line: "Allah made us once, and He will bring us back to [life].",
          alt: ["sleep", "school"],
          myth: "Ya-Sin says no one will live again after death.",
          why: "When Allah wants something, He says Be, and it is."
        }),
        seed("messengers-and-response", "Messengers and human response", "The surah shows how people often resist messengers even when truth is clear.", 4, {
          surahName: "Ya-Sin",
          line: "In Ya-Sin, a man ran to tell his town: follow the [messengers].",
          alt: ["kings", "crowd"],
          myth: "The man in Ya-Sin told his town to ignore the messengers.",
          why: "He was told: enter Paradise."
        }),
        seed("yasin-review", "Surah Ya-Sin review", "Ya-Sin teaches revelation, signs, resurrection, and accountability together.", 5, { kind: "review", lessonType: "review", surahName: "Ya-Sin", line: "Ya-Sin: the wise Quran, signs in the sky, and life after death." })
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
        seed("dominion-of-allah", "Allah's dominion", "Al-Mulk opens by centering absolute dominion in Allah's hand alone.", 2, {
          surahName: "Al-Mulk",
          line: "Al-Mulk begins: blessed is He who holds the [kingdom].",
          alt: ["garden", "money"],
          myth: "Al-Mulk means The Cave.",
          why: "Al-Mulk means The Kingdom."
        }),
        seed("life-as-test", "Life as a test", "The surah teaches that life and death are created as a test of action.", 3, {
          surahName: "Al-Mulk",
          line: "Allah made life and death to see who does [best].",
          alt: ["loudest", "richest"],
          myth: "Al-Mulk says life has no test at all.",
          why: "It says best in deeds, not most in deeds."
        }),
        seed("looking-at-creation", "Looking at creation carefully", "The surah urges careful repeated looking at the creation to see order and perfection.", 4, {
          surahName: "Al-Mulk",
          line: "Look at the sky again and again; you will see no [cracks].",
          alt: ["sun", "moon"],
          myth: "Al-Mulk says the sky is full of cracks.",
          why: "Allah decorated the nearest sky with stars like lamps."
        }),
        seed("warning-and-security", "Warning and false security", "Al-Mulk warns the heedless heart against false security before Allah.", 4, {
          surahName: "Al-Mulk",
          line: "Al-Mulk asks: if your [water] sank away, who could bring it back?",
          alt: ["shoes", "toys"],
          myth: "Al-Mulk says we are safe without Allah.",
          why: "Only Allah gives us water and every blessing."
        }),
        seed("mulk-review", "Surah Al-Mulk review", "Al-Mulk teaches sovereignty, accountability, reflection, and escape from heedlessness.", 5, { kind: "review", lessonType: "mastery", surahName: "Al-Mulk", line: "Al-Mulk: Allah's kingdom, life as a test, and a perfect sky." })
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
        seed("why-fasting", "Why fasting exists", "Ramadan fasting is prescribed so the believer grows in taqwa.", 1, {
          line: "Allah made fasting so we can gain [taqwa].",
          alt: ["fame", "money"],
          myth: "Fasting is only about feeling hungry.",
          why: "Taqwa means being careful to obey Allah."
        }),
        seed("ramadan-and-quran", "Ramadan and revelation", "Ramadan is tied to the Quran and should feel like a season of guidance.", 1, {
          line: "The Quran was first sent down in [Ramadan].",
          alt: ["Shawwal", "Muharram"],
          myth: "The Quran was first revealed in Shawwal.",
          why: "So Muslims read lots of Quran in Ramadan."
        }),
        seed("what-taqwa-means", "What taqwa means here", "Taqwa in fasting means restraint, awareness, and obedience under Allah's gaze.", 2, {
          line: "Taqwa means being [careful] to please Allah, even alone.",
          alt: ["lazy", "loud"],
          myth: "Taqwa only matters when people are watching.",
          why: "A fasting person stays hungry even when no one can see."
        }),
        seed("inner-discipline", "Inner discipline", "The best fast reshapes intention, secrecy, and daily restraint.", 2, {
          line: "Allah says [fasting] is for Him, and He rewards it.",
          alt: ["shopping", "sleeping"],
          myth: "Fasting is a deed with no reward."
        }),
        seed("purpose-review", "Purpose review", "The purpose of fasting is spiritual training through obedience, not emptiness or performance.", 3, { kind: "review", lessonType: "review", line: "We fast for taqwa, in the month the Quran came down." })
      ]},
      { id: "fasting-times-and-rules", title: "Times and rules", description: "Learn the structure of suhur, fasting hours, and breaking the fast.", order: 2, difficultyRange: [1, 4], sourceKeys: ["quran_2_183_187"], lessons: [
        seed("suhur-and-intent", "Suhur and beginning the day", "The fasting day begins with intention and preparation, not with accidental drift.", 1, {
          line: "[Suhur] is the meal we eat before dawn.",
          alt: ["Iftar", "Lunch"],
          myth: "Suhur is the meal after sunset.",
          why: "The Prophet ﷺ said there is blessing in suhur."
        }),
        seed("start-and-end", "Knowing when the fast begins and ends", "The fast runs from dawn to sunset, so its start and end are clear.", 2, {
          line: "The fast lasts from [dawn] to sunset.",
          alt: ["noon", "midnight"],
          myth: "The fast lasts from noon to midnight.",
          why: "No food or drink at all in between."
        }),
        seed("breaking-the-fast", "Breaking the fast well", "Iftar should be timely, grateful, and connected to remembrance.", 2, {
          line: "[Iftar] is the meal at sunset that ends the fast.",
          alt: ["Suhur", "Brunch"],
          myth: "Iftar is the meal before dawn.",
          why: "The Prophet ﷺ liked to break his fast with dates."
        }),
        seed("who-is-exempt", "Who is exempt", "Islam teaches mercy and realism around hardship, illness, and inability.", 3, {
          line: "People who are [sick] may make up the fast later.",
          alt: ["busy", "bored"],
          myth: "Sick people must fast no matter what.",
          why: "Travelers may also fast on other days instead."
        }),
        seed("timing-review", "Timing and rules review", "Good fasting requires understanding time, intention, mercy, and a proper ending.", 4, { kind: "review", lessonType: "review", line: "Suhur before dawn, iftar at sunset, and ease for the sick." })
      ]},
      { id: "fasting-protection", title: "Protecting the fast", description: "Move into invalidators, tongue discipline, and the mistakes that weaken the fast.", order: 3, difficultyRange: [2, 5], sourceKeys: ["quran_2_183_187"], lessons: [
        seed("invalidators", "What invalidates the fast", "Know what clearly breaks the fast and what does not.", 2, {
          line: "Eating or drinking on purpose [breaks] the fast.",
          alt: ["helps", "starts"],
          myth: "Drinking water on purpose is fine while fasting."
        }),
        seed("tongue-and-character", "Tongue and character", "The fast should protect speech, temper, and hidden reactions as much as the stomach.", 3, {
          line: "A fasting person stays away from [bad] words and fights.",
          alt: ["kind", "good"],
          myth: "Fasting is a time for bad words.",
          why: "If someone starts a fight, say: I am fasting."
        }),
        seed("forgetfulness-and-mercy", "Forgetfulness and mercy", "Mistakes in fasting should be thought through with mercy and knowledge, not panic.", 3, {
          line: "If you [forget] and eat, keep fasting.",
          alt: ["choose", "want"],
          myth: "If you forget and eat, your fast is ruined.",
          why: "The Prophet ﷺ said it was Allah who fed you."
        }),
        seed("social-pressure", "Fasting under pressure", "Protect your fast even when school, work, or friends make it awkward.", 4, {
          line: "Keep your fast, even when friends are [eating] around you.",
          alt: ["praying", "reading"],
          myth: "Break your fast if your friends tease you."
        }),
        seed("protection-review", "Protecting the fast review", "The fast is protected by knowledge, restraint, and mercy together.", 5, { kind: "review", lessonType: "mastery", line: "No food on purpose, no bad words, and forgetting is forgiven." })
      ]},
      { id: "fasting-ramadan-growth", title: "Ramadan growth", description: "Turn Ramadan into a full worship season with nights, Quran, and reflection.", order: 4, difficultyRange: [2, 5], sourceKeys: ["quran_2_183_187"], lessons: [
        seed("night-worship", "Night worship in Ramadan", "The nights of Ramadan are for prayer, Quran, and returning to Allah.", 2, {
          line: "At night in Ramadan, Muslims pray [Taraweeh].",
          alt: ["Eid", "Jumu'ah"],
          myth: "Taraweeh is prayed in the morning.",
          why: "Praying at night in Ramadan with faith brings forgiveness."
        }),
        seed("quran-in-ramadan", "Quran in Ramadan", "Ramadan should make the Quran more central, not more distant.", 3, {
          line: "Every Ramadan, Jibril went over the [Quran] with the Prophet ﷺ.",
          alt: ["Torah", "poems"],
        }),
        seed("laylat-al-qadr", "Seeking Laylat al-Qadr", "The last nights train the believer to chase worship with seriousness and hope.", 4, {
          line: "Laylat al-Qadr is better than a [thousand] months.",
          alt: ["hundred", "ten"],
          myth: "Laylat al-Qadr is in the month of Hajj.",
          why: "Look for it in the last ten nights of Ramadan.",
          fix: "Look for it in the last ten nights of Ramadan."
        }),
        seed("after-ramadan", "Carry growth after Ramadan", "The point of Ramadan is changed worship, not a temporary mood that disappears at Eid.", 4, {
          line: "Allah loves good deeds done [regularly], even small ones.",
          alt: ["once", "loudly"],
          myth: "Good deeds should stop when Ramadan ends.",
          why: "Fasting six days of Shawwal is Sunnah too."
        }),
        seed("ramadan-review", "Ramadan mastery review", "A mature Ramadan view joins taqwa, rules, mercy, Quran, night worship, and lasting change.", 5, { kind: "review", lessonType: "mastery", line: "Ramadan: Taraweeh, Quran, Laylat al-Qadr, and habits that last." })
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
        seed("what-zakat-is", "What zakat is", "Zakat is a required purification of wealth, not just optional generosity.", 1, {
          line: "Zakat means giving part of your wealth to people in [need].",
          alt: ["charge", "shops"],
          myth: "Zakat is a gift you may skip.",
          why: "Zakat is one of the five pillars of Islam."
        }),
        seed("why-it-purifies", "Why zakat purifies", "Allah ties zakat to purification of wealth and soul.", 1, {
          line: "Zakat makes your wealth [pure] and your heart clean.",
          alt: ["dirty", "heavy"],
          myth: "Zakat makes wealth less pure.",
          why: "The word zakat means to purify and to grow."
        }),
        seed("obligation-and-seriousness", "Obligation and seriousness", "Zakat is a duty carried out with care and planning.", 2, {
          line: "Zakat is a [duty], not just a nice extra.",
          alt: ["game", "joke"],
          myth: "Zakat is optional for Muslims who have enough wealth.",
          why: "Abu Bakr made sure zakat was paid after the Prophet ﷺ."
        }),
        seed("nisab-and-threshold", "Threshold and responsibility", "Zakat enters when wealth reaches its threshold and remains there with the right conditions.", 2, {
          line: "Zakat is due when savings reach the [nisab] for a year.",
          alt: ["ceiling", "bank"],
          myth: "Zakat is due on even a tiny amount.",
          why: "Zakat on savings is usually 2.5 percent."
        }),
        seed("meaning-review", "Meaning review", "Zakat is a disciplined act of worship that purifies wealth and trains responsibility.", 3, { kind: "review", lessonType: "review", line: "Zakat: a duty that purifies, due once wealth reaches the nisab." })
      ]},
      { id: "zakat-recipients", title: "Recipients", description: "Learn who may receive zakat and how revelation protects this right.", order: 2, difficultyRange: [2, 4], sourceKeys: ["quran_9_60"], lessons: [
        seed("eligible-groups", "Eligible groups", "Quran 9:60 names real recipient categories that should be learned and respected.", 2, {
          line: "The Quran names [eight] groups who may receive zakat.",
          alt: ["two", "twenty"],
          myth: "Anyone at all may receive zakat.",
          why: "The list is in Surah At-Tawbah, ayah 60."
        }),
        seed("need-and-priority", "Need and priority", "A believer should think carefully about actual need and the revealed categories.", 2, {
          line: "The [poor] and the needy come first on that list.",
          alt: ["rich", "famous"],
          myth: "The poor cannot receive zakat.",
          why: "People stuck in debt are on the list too."
        }),
        seed("family-and-boundaries", "Family and boundaries", "Zakat questions often require knowing relational boundaries and financial responsibility.", 3, {
          line: "You don't give zakat to your own [parents] or children.",
          alt: ["neighbors", "teachers"],
          myth: "Zakat should go to your own children.",
          why: "You already support them with your own money."
        }),
        seed("scenario-judgment", "Scenario judgment with recipients", "Compare people and situations with the groups who may receive zakat.", 4, {
          line: "A traveler stuck with no money may receive [zakat].",
          alt: ["a fine", "nothing"],
          myth: "A stranded traveler can never receive zakat.",
          why: "The Quran calls this person ibn as-sabil."
        }),
        seed("recipient-review", "Recipients review", "Zakat recipients are defined so that giving stays obedient, not arbitrary.", 4, { kind: "review", lessonType: "review", line: "Zakat goes to the eight groups, starting with the poor." })
      ]},
      { id: "zakat-character-and-intention", title: "Character and intention", description: "Move into the giver's inner state: sincerity, humility, and avoiding harm.", order: 3, difficultyRange: [2, 5], sourceKeys: ["quran_9_103", "quran_4_36"], lessons: [
        seed("sincerity", "Sincerity in giving", "Zakat should be given for Allah, not for image, pressure, or praise.", 2, {
          line: "Give zakat for [Allah], not to show off.",
          alt: ["fame", "praise"],
          myth: "Zakat is given to show off.",
          why: "Allah knows what is in every heart."
        }),
        seed("humility", "Humility with recipients", "Giving should not crush the dignity of the one receiving.", 3, {
          line: "Give kindly, and never make the person feel [small].",
          alt: ["happy", "welcome"],
          myth: "It's fine to remind people of what you gave them.",
          why: "Allah says: don't spoil charity with reminders or hurt."
        }),
        seed("promptness", "Promptness and trust", "Delaying zakat without reason often signals weak seriousness toward the duty.", 3, {
          line: "When zakat is due, pay it [soon], without delay.",
          alt: ["never", "slowly"],
          myth: "Zakat can be put off for many years."
        }),
        seed("wealth-and-heart", "Wealth and the heart", "Zakat teaches the believer to hold wealth as a trust, not a master.", 4, {
          line: "Our wealth is a [trust] from Allah.",
          alt: ["toy", "secret"],
          myth: "Our money is ours to waste however we like.",
          why: "We will be asked how we earned it and spent it."
        }),
        seed("intention-review", "Intention and character review", "Zakat is outward duty and inward purification at the same time.", 5, { kind: "review", lessonType: "mastery", line: "Give for Allah, kindly and on time, as a trust." })
      ]},
      { id: "zakat-broader-generosity", title: "Broader generosity", description: "Connect zakat to sadaqah, generosity, and long-term financial responsibility.", order: 4, difficultyRange: [2, 5], sourceKeys: ["quran_9_103", "quran_4_36"], lessons: [
        seed("zakat-and-sadaqah", "Zakat and sadaqah", "Zakat is required, while sadaqah is extra charity; both matter.", 2, {
          line: "Zakat is required; [sadaqah] is extra charity.",
          alt: ["salah", "suhur"],
          myth: "Zakat and sadaqah are exactly the same.",
          why: "Sadaqah can be given any time, even a smile."
        }),
        seed("care-for-neighbors", "Care for people around you", "Islamic generosity makes you notice the needs of people around you.", 3, {
          line: "When you cook soup, add water and share with your neighbors.",
          ask: ["Who did the Prophet ﷺ say to share soup with?", "Your neighbors", "No one", "Only the rich"],
          myth: "Sharing food with neighbors is not from the Sunnah.",
          why: "The Prophet ﷺ told Abu Dharr to do this."
        }),
        seed("family-support-and-duty", "Family support and duty", "Financial care in Islam includes knowing ordinary family duties alongside zakat duties.", 4, {
          line: "Spending on your own [family] is a charity too.",
          alt: ["games", "pride"],
          myth: "Money spent on family earns no reward.",
          why: "Even a bite you feed your family is rewarded."
        }),
        seed("planning-a-giving-life", "Planning a giving life", "A strong Muslim financial life is planned, disciplined, and generous.", 4, {
          line: "When spending, don't waste and don't be [stingy].",
          alt: ["kind", "careful"],
          myth: "Wasting money is fine in Islam.",
          why: "Allah praises a middle way in spending."
        }),
        seed("giving-review", "Giving mastery review", "Zakat should grow into a broader habit of responsible, sincere, and revealed generosity.", 5, { kind: "review", lessonType: "mastery", line: "Zakat, sadaqah, sharing with neighbors, and caring for family." })
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
        seed("why-hajj-matters", "Why Hajj matters", "Hajj is one of the five pillars of Islam.", 1, {
          line: "Hajj is one of the five [pillars] of Islam.",
          alt: ["rooms", "secrets"],
          myth: "Hajj is not one of the pillars of Islam.",
          why: "Hajj is the journey to Makkah to worship Allah."
        }),
        seed("who-must-go", "Who must go", "Hajj is required for those who are able to find a way.", 1, {
          line: "Hajj is due once in life for those who are [able].",
          alt: ["bored", "famous"],
          myth: "Every Muslim must do Hajj every year.",
          why: "Able means healthy enough, with money for the trip."
        }),
        seed("intending-the-journey", "Intending the journey", "A believer should desire Hajj sincerely even before the means are present.", 2, {
          line: "Go to Hajj only for [Allah], not to show off.",
          alt: ["photos", "fame"],
          myth: "Hajj is best when it impresses people.",
          why: "A Hajj done well is rewarded with Paradise."
        }),
        seed("sacred-house", "The Sacred House", "The Ka'bah and the rites teach unity, remembrance, and submission to Allah's command.", 2, {
          line: "The [Ka'bah] in Makkah is the House of Allah.",
          alt: ["Mina", "Arafah"],
          myth: "Hajj takes place in Madinah.",
          why: "Ibrahim and Ismail raised its walls."
        }),
        seed("duty-review", "Duty review", "Hajj joins obligation, ability, longing, and sacred direction together.", 3, { kind: "review", lessonType: "review", line: "Hajj: a pillar, once in life for the able, at the Ka'bah." })
      ]},
      { id: "hajj-rites", title: "Rites and sequence", description: "Move through ihram, tawaf, sa'i, and the ordered movement of pilgrimage.", order: 2, difficultyRange: [1, 4], sourceKeys: ["quran_2_196_203", "quran_22_27"], lessons: [
        seed("ihram", "Entering ihram", "Ihram marks the journey as worship and places the pilgrim inside a sacred discipline.", 1, {
          line: "In [ihram], men wear two simple, unstitched cloths.",
          alt: ["tawaf", "sa'i"],
          myth: "In ihram, men wear their fanciest clothes.",
          why: "Pilgrims call out: Labbayk Allahumma labbayk."
        }),
        seed("tawaf", "Tawaf around the House", "Tawaf trains the heart in remembrance, unity, and obedience around the House of Allah.", 2, {
          line: "[Tawaf] means walking around the Ka'bah seven times.",
          alt: ["Sa'i", "Ihram"],
          myth: "Tawaf means walking around Mount Arafah.",
          why: "The Ka'bah stays on your left as you walk."
        }),
        seed("sai", "Sa'i between Safa and Marwah", "Sa'i preserves the memory of trust, effort, and Allah's care.", 2, {
          line: "[Sa'i] is walking between Safa and Marwah seven times.",
          alt: ["Tawaf", "Ihram"],
          myth: "Sa'i is walking between Mina and Arafah.",
          why: "It remembers Hajar, who ran there looking for water."
        }),
        seed("days-and-order", "The order of the days", "The pilgrim should learn the sequence of the Hajj days and not treat them as a blur.", 3, {
          line: "Hajj days: Mina, then [Arafah], Muzdalifah, and back to Mina.",
          alt: ["Madinah", "Taif"],
          myth: "Hajj takes place in Ramadan.",
          why: "Hajj is in the month of Dhul-Hijjah.",
          fix: "Hajj is in the month of Dhul-Hijjah.",
          first: ["Arafah", "Muzdalifah", "Back to Mina"]
        }),
        seed("rites-review", "Rites review", "Hajj rites become strong when sequence, meaning, and restraint all stay together.", 4, { kind: "review", lessonType: "review", line: "Ihram, tawaf around the Ka'bah, and sa'i between Safa and Marwah." })
      ]},
      { id: "hajj-major-stations", title: "Major stations", description: "Go deeper into Arafah, Muzdalifah, Mina, and the days of remembrance.", order: 3, difficultyRange: [2, 5], sourceKeys: ["quran_2_196_203", "quran_22_27"], lessons: [
        seed("arafah", "Standing at Arafah", "Arafah gathers humility, du'a, and the heart's deepest turning to Allah.", 2, {
          line: "Pilgrims stand at [Arafah] on the 9th of Dhul-Hijjah.",
          alt: ["Mina", "Safa"],
          myth: "Pilgrims stand at Arafah in Ramadan.",
          why: "The Prophet ﷺ said: Hajj is Arafah."
        }),
        seed("muzdalifah", "Muzdalifah and collecting calm", "Muzdalifah trains the pilgrim in remembrance, order, and composed movement.", 3, {
          line: "After Arafah, pilgrims spend the night at [Muzdalifah].",
          alt: ["Madinah", "Taif"],
          myth: "Pilgrims go to Madinah right after Arafah.",
          why: "Many pick up small pebbles there for Mina."
        }),
        seed("mina", "Mina and the days of remembrance", "Mina teaches remembrance, patience, and patient movement through sacred days.", 3, {
          line: "At [Mina], pilgrims throw small pebbles at the pillars.",
          alt: ["Arafah", "Safa"],
          myth: "At Mina, pilgrims throw flowers at the pillars.",
          why: "They say Allahu akbar with each pebble."
        }),
        seed("sacrifice-and-release", "Sacrifice and release", "Acts around sacrifice and release from ihram teach gratitude, obedience, and completion.", 4, {
          line: "After the sacrifice, men shave or cut their [hair].",
          alt: ["clothes", "shoes"],
          myth: "Pilgrims never cut their hair in Hajj.",
          why: "The Prophet ﷺ made du'a three times for those who shave.",
          first: ["Standing at Arafah", "Throwing pebbles", "Cutting the hair"]
        }),
        seed("stations-review", "Stations review", "The great stations of Hajj are remembered through sequence, du'a, patience, and dhikr.", 5, { kind: "review", lessonType: "mastery", line: "Arafah, then Muzdalifah, then Mina, then the sacrifice and haircut." })
      ]},
      { id: "hajj-lessons", title: "Lessons after Hajj", description: "Carry humility, unity, patience, and obedience back into life after pilgrimage.", order: 4, difficultyRange: [2, 5], sourceKeys: ["quran_3_97", "quran_22_27"], lessons: [
        seed("humility", "Humility before Allah", "Hajj strips away status and teaches standing equal before Allah.", 2, {
          line: "In Hajj, rich and poor wear the same simple [clothes].",
          alt: ["crowns", "medals"],
          myth: "Hajj is only for rich or famous people.",
          why: "Everyone stands equal before Allah."
        }),
        seed("unity", "Unity of the ummah", "Pilgrimage shows the unity of believers through one worship and one direction.", 3, {
          line: "Muslims from every country face one [Ka'bah] together.",
          alt: ["mountain", "palace"],
          myth: "In Hajj, each country prays toward a different place.",
          why: "They all say the same words: Labbayk Allahumma labbayk."
        }),
        seed("patience", "Patience in sacred movement", "Crowds, heat, and delay should teach patience rather than raw frustration.", 4, {
          line: "Hajj teaches [patience] in big crowds and hot sun.",
          alt: ["anger", "pushing"],
          myth: "In Hajj, pushing people is fine.",
          why: "Allah says there is no arguing in Hajj."
        }),
        seed("after-the-return", "After the return", "The journey should leave marks on repentance, worship, and discipline after returning home.", 4, {
          line: "A good Hajj leaves you free of [sins], like a newborn.",
          alt: ["friends", "money"],
          myth: "After Hajj, nothing in your life should change.",
          why: "That is for a Hajj without bad words or bad deeds."
        }),
        seed("hajj-review", "Hajj mastery review", "Hajj joins duty, order, sacred places, and a changed life.", 5, { kind: "review", lessonType: "mastery", line: "Hajj teaches humility, unity, patience, and a fresh start." })
      ]}
    ]
  }
);
