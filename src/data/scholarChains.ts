import type { LessonSource, SupportedLanguage, TopicId } from "../types";
import { ABU_HANIFAH_PAGE, AHMAD_PAGE, IBN_TAYMIYYAH_PAGE, SHAFII_PAGE } from "./scholarUnits";
import { DHAHABI_PAGE } from "./scholarTreeUnits";

// Chains of knowledge for the Scholars family tree: who learned from whom, back to the Prophet ﷺ through the
// Sahabah and the Tabi'in. Every link has a source:
// - a chain of narrators at the head of a hadith in Sahih al-Bukhari or Sahih Muslim (checked word by word in the
//   Arabic text: Bukhari 1 is al-Humaydi, from Sufyan, from Yahya ibn Sa'id, from Muhammad ibn Ibrahim at-Taymi,
//   from Alqamah ibn Waqqas, from Umar, from the Prophet ﷺ);
// - adh-Dhahabi's Siyar A'lam an-Nubala, volume/page, where it names a man's teachers and students;
// - the scholar units' own IslamQA pages, with the same highlighted words the lessons use.
// Links the books hedge or doubt (Abu Hanifah and Tawus, "lam yasihh"; whether he heard from any Sahabi) are left
// out, and so is a generation label wherever scholars place a man differently (Abu Hanifah has none).

/** Where someone stands: the Prophet ﷺ, a Sahabi, a Tabi'i, one of the Tabi' al-Tabi'in, or a later scholar. */
export type ChainGeneration = "prophet" | "sahabi" | "tabii" | "tabiTabii" | "scholar";

export type ChainPerson = {
  id: string;
  /** The name in each app language; `ar` is also shown under the name in the other languages. */
  names: Record<SupportedLanguage, string>;
  generation: ChainGeneration;
  /** Place on the tree: row (oldest at the top) and column (fractions allowed), so lines cross as little as possible. */
  row: number;
  col: number;
  /** The scholar's own lesson unit, when he has one. */
  unitId?: string;
  /** Another topic's unit about the same person (his life as a Sahabi, her life as a wife of the Prophet ﷺ). */
  alsoIn?: { topicId: TopicId; unitId: string };
};

export type ChainLink = { teacher: string; student: string; source: LessonSource };

function hadith(book: "bukhari" | "muslim", number: string, chain: string, summary: string): LessonSource {
  const collection = book === "bukhari" ? "Sahih al-Bukhari" : "Sahih Muslim";
  return {
    id: `chain_${book}_${number}`,
    site: "Sunnah.com",
    category: "hadith",
    title: `${collection} ${number}`,
    url: `https://sunnah.com/${book}:${number}`,
    reference: `${collection} ${number}`,
    from: `Chain of narrators: ${chain}`,
    grade: "Sahih",
    summary
  };
}

function siyar(volume: number, page: number, summary: string): LessonSource {
  return {
    id: `chain_siyar_${volume}_${page}`,
    site: "Shamela",
    category: "biography",
    title: `Siyar A'lam an-Nubala ${volume}/${page}`,
    url: "https://shamela.ws/book/10906",
    reference: `Siyar A'lam an-Nubala ${volume}/${page}`,
    from: "Siyar A'lam an-Nubala by adh-Dhahabi (Arabic, on Shamela)",
    grade: "Biography",
    summary
  };
}

const BUKHARI_1 = hadith(
  "bukhari",
  "1",
  "al-Bukhari, al-Humaydi, Sufyan, Yahya ibn Sa'id al-Ansari, Muhammad ibn Ibrahim at-Taymi, Alqamah ibn Waqqas, Umar",
  "Umar said on the minbar: I heard the Messenger of Allah ﷺ say: Actions are only by intentions. Each man in the chain heard it from the one before him."
);
const BUKHARI_1128 = hadith(
  "bukhari",
  "1128",
  "Abdullah ibn Yusuf, Malik, Ibn Shihab az-Zuhri, Urwah, Aishah",
  "Malik, from Ibn Shihab az-Zuhri, from Urwah, from Aishah, about what the Messenger of Allah ﷺ did."
);
const MUSLIM_650 = hadith(
  "muslim",
  "650a",
  "Yahya ibn Yahya, Malik, Nafi, Ibn Umar",
  "Yahya ibn Yahya read to Malik, from Nafi, from Ibn Umar: the Messenger of Allah ﷺ said prayer in congregation is twenty-seven degrees better."
);
const BUKHARI_98 = hadith(
  "bukhari",
  "98",
  "Sulayman ibn Harb, Shu'bah, Ayyub, Ata, Ibn Abbas",
  "Ata said: I heard Ibn Abbas say: I bear witness about the Prophet ﷺ."
);
const BUKHARI_125 = hadith(
  "bukhari",
  "125",
  "Qays ibn Hafs, Abd al-Wahid, al-A'mash, Ibrahim, Alqamah, Abdullah ibn Mas'ud",
  "Ibrahim, from Alqamah, from Abdullah ibn Mas'ud: I was walking with the Prophet ﷺ in Madinah."
);
const MUSLIM_2421 = hadith(
  "muslim",
  "2421a",
  "Ahmad ibn Hanbal, Sufyan ibn Uyaynah, Ubaydullah ibn Abi Yazid, Nafi ibn Jubayr, Abu Hurayrah",
  "Muslim: Ahmad ibn Hanbal told me: Sufyan ibn Uyaynah told us."
);
const SIYAR_AHMAD_TEACHERS = siyar(11, 181, "Ahmad heard hadith from Sufyan ibn Uyaynah, ash-Shafi'i and many others.");
const SIYAR_AHMAD_STUDENTS = siyar(11, 181, "Al-Bukhari narrated from Ahmad, and Muslim and Abu Dawud narrated a great deal from him.");

export const CHAIN_PEOPLE: readonly ChainPerson[] = [
  { id: "prophet", names: { en: "Prophet Muhammad ﷺ", ar: "النبي محمد ﷺ", bn: "নবী মুহাম্মদ ﷺ", ur: "نبی محمد ﷺ" }, generation: "prophet", row: 0, col: 3.25, alsoIn: { topicId: "prophets", unitId: "prophets-final-example" } },

  { id: "umar", names: { en: "Umar ibn al-Khattab", ar: "عمر بن الخطاب", bn: "উমর ইবনুল খাত্তাব", ur: "عمر بن خطاب" }, generation: "sahabi", row: 1, col: 0, unitId: "scholar-umar", alsoIn: { topicId: "sahabah", unitId: "sahabi-umar-ibn-al-khattab" } },
  { id: "aishah", names: { en: "Aishah", ar: "عائشة", bn: "আয়েশা", ur: "عائشہ" }, generation: "sahabi", row: 1, col: 1.5, unitId: "scholar-aishah", alsoIn: { topicId: "women_of_the_book", unitId: "women-mothers" } },
  { id: "ibn-umar", names: { en: "Abdullah ibn Umar", ar: "عبد الله بن عمر", bn: "আব্দুল্লাহ ইবনে উমর", ur: "عبداللہ بن عمر" }, generation: "sahabi", row: 1, col: 3, unitId: "scholar-ibn-umar" },
  { id: "ibn-abbas", names: { en: "Abdullah ibn Abbas", ar: "عبد الله بن عباس", bn: "আব্দুল্লাহ ইবনে আব্বাস", ur: "عبداللہ بن عباس" }, generation: "sahabi", row: 1, col: 4.75, unitId: "scholar-ibn-abbas" },
  { id: "ibn-masud", names: { en: "Abdullah ibn Mas'ud", ar: "عبد الله بن مسعود", bn: "আব্দুল্লাহ ইবনে মাসউদ", ur: "عبداللہ بن مسعود" }, generation: "sahabi", row: 1, col: 6.25, unitId: "scholar-ibn-masud", alsoIn: { topicId: "sahabah", unitId: "sahabi-abdullah-ibn-masud" } },

  { id: "alqamah-waqqas", names: { en: "Alqamah ibn Waqqas", ar: "علقمة بن وقاص", bn: "আলকামা ইবনে ওয়াক্কাস", ur: "علقمہ بن وقاص" }, generation: "tabii", row: 2, col: 0, unitId: "scholar-alqamah-waqqas" },
  { id: "urwah", names: { en: "Urwah ibn az-Zubayr", ar: "عروة بن الزبير", bn: "উরওয়া ইবনুয যুবাইর", ur: "عروہ بن زبیر" }, generation: "tabii", row: 2, col: 1.5, unitId: "scholar-urwah" },
  { id: "nafi", names: { en: "Nafi", ar: "نافع مولى ابن عمر", bn: "নাফে", ur: "نافع" }, generation: "tabii", row: 2, col: 3, unitId: "scholar-nafi" },
  { id: "ata", names: { en: "Ata ibn Abi Rabah", ar: "عطاء بن أبي رباح", bn: "আতা ইবনে আবি রাবাহ", ur: "عطاء بن ابی رباح" }, generation: "tabii", row: 2, col: 4.75, unitId: "scholar-ata" },
  { id: "alqamah-qays", names: { en: "Alqamah ibn Qays", ar: "علقمة بن قيس", bn: "আলকামা ইবনে কায়স", ur: "علقمہ بن قیس" }, generation: "tabii", row: 2, col: 6.25, unitId: "scholar-alqamah-qays" },

  { id: "taymi", names: { en: "Muhammad at-Taymi", ar: "محمد بن إبراهيم التيمي", bn: "মুহাম্মাদ আত-তাইমি", ur: "محمد بن ابراہیم تیمی" }, generation: "tabii", row: 3, col: 0, unitId: "scholar-taymi" },
  { id: "zuhri", names: { en: "Ibn Shihab az-Zuhri", ar: "ابن شهاب الزهري", bn: "ইবনে শিহাব আয-যুহরি", ur: "ابن شہاب زہری" }, generation: "tabii", row: 3, col: 1.5, unitId: "scholar-zuhri" },
  { id: "nakhai", names: { en: "Ibrahim an-Nakha'i", ar: "إبراهيم النخعي", bn: "ইবরাহীম আন-নাখয়ি", ur: "ابراہیم نخعی" }, generation: "tabii", row: 3, col: 6.25, unitId: "scholar-nakhai" },

  { id: "yahya-ansari", names: { en: "Yahya ibn Sa'id al-Ansari", ar: "يحيى بن سعيد الأنصاري", bn: "ইয়াহইয়া ইবনে সাঈদ আল-আনসারি", ur: "یحییٰ بن سعید انصاری" }, generation: "tabii", row: 4, col: 0, unitId: "scholar-yahya-ansari" },
  { id: "hammad", names: { en: "Hammad ibn Abi Sulayman", ar: "حماد بن أبي سليمان", bn: "হাম্মাদ ইবনে আবি সুলাইমান", ur: "حماد بن ابی سلیمان" }, generation: "tabii", row: 4, col: 6.25, unitId: "scholar-hammad" },

  { id: "sufyan", names: { en: "Sufyan ibn Uyaynah", ar: "سفيان بن عيينة", bn: "সুফিয়ান ইবনে উয়াইনা", ur: "سفیان بن عیینہ" }, generation: "tabiTabii", row: 5, col: 0.75, unitId: "scholar-sufyan" },
  { id: "malik", names: { en: "Imam Malik", ar: "مالك بن أنس", bn: "ইমাম মালিক", ur: "امام مالک" }, generation: "tabiTabii", row: 5, col: 2.5, unitId: "scholar-malik" },
  { id: "abu-hanifah", names: { en: "Abu Hanifah", ar: "أبو حنيفة", bn: "আবু হানিফা", ur: "ابو حنیفہ" }, generation: "scholar", row: 5, col: 5.5, unitId: "scholar-abu-hanifah" },

  { id: "yahya-yahya", names: { en: "Yahya ibn Yahya", ar: "يحيى بن يحيى التميمي", bn: "ইয়াহইয়া ইবনে ইয়াহইয়া", ur: "یحییٰ بن یحییٰ" }, generation: "scholar", row: 6, col: 2.25, unitId: "scholar-yahya-yahya" },
  { id: "shaybani", names: { en: "Muhammad ibn al-Hasan", ar: "محمد بن الحسن الشيباني", bn: "মুহাম্মাদ ইবনুল হাসান", ur: "محمد بن حسن شیبانی" }, generation: "scholar", row: 6, col: 4.5, unitId: "scholar-shaybani" },
  { id: "abu-yusuf", names: { en: "Abu Yusuf", ar: "أبو يوسف", bn: "আবু ইউসুফ", ur: "ابو یوسف" }, generation: "scholar", row: 6, col: 6.25, unitId: "scholar-abu-yusuf" },

  { id: "shafii", names: { en: "Ash-Shafi'i", ar: "الشافعي", bn: "ইমাম শাফেয়ি", ur: "امام شافعی" }, generation: "scholar", row: 7, col: 3.5, unitId: "scholar-shafii" },

  { id: "humaydi", names: { en: "Al-Humaydi", ar: "الحميدي", bn: "আল-হুমাইদি", ur: "حمیدی" }, generation: "scholar", row: 8, col: 1, unitId: "scholar-humaydi" },
  { id: "ahmad", names: { en: "Ahmad ibn Hanbal", ar: "أحمد بن حنبل", bn: "আহমাদ ইবনে হাম্বল", ur: "احمد بن حنبل" }, generation: "scholar", row: 8, col: 4.5, unitId: "scholar-ahmad" },

  { id: "bukhari", names: { en: "Imam al-Bukhari", ar: "البخاري", bn: "ইমাম বুখারি", ur: "امام بخاری" }, generation: "scholar", row: 9, col: 2, unitId: "scholar-bukhari" },
  { id: "abu-dawud", names: { en: "Abu Dawud", ar: "أبو داود", bn: "আবু দাউদ", ur: "ابو داؤد" }, generation: "scholar", row: 9, col: 5.5, unitId: "scholar-abu-dawud" },

  { id: "muslim", names: { en: "Imam Muslim", ar: "مسلم بن الحجاج", bn: "ইমাম মুসলিম", ur: "امام مسلم" }, generation: "scholar", row: 10, col: 3, unitId: "scholar-muslim" },
  { id: "tirmidhi", names: { en: "At-Tirmidhi", ar: "الترمذي", bn: "আত-তিরমিযি", ur: "امام ترمذی" }, generation: "scholar", row: 10, col: 1, unitId: "scholar-tirmidhi" },

  { id: "ibn-abd-ad-daim", names: { en: "Ibn Abd ad-Da'im", ar: "ابن عبد الدائم", bn: "ইবনে আব্দুদ দায়েম", ur: "ابن عبد الدائم" }, generation: "scholar", row: 11, col: 3.25 },
  { id: "ibn-taymiyyah", names: { en: "Ibn Taymiyyah", ar: "ابن تيمية", bn: "ইবনে তাইমিয়া", ur: "ابن تیمیہ" }, generation: "scholar", row: 12, col: 3.25, unitId: "scholar-ibn-taymiyyah" },
  { id: "ibn-qayyim", names: { en: "Ibn al-Qayyim", ar: "ابن القيم", bn: "ইবনুল কাইয়িম", ur: "ابن قیم" }, generation: "scholar", row: 13, col: 2.25, unitId: "scholar-ibn-qayyim" },
  { id: "dhahabi", names: { en: "Adh-Dhahabi", ar: "الذهبي", bn: "আয-যাহাবি", ur: "ذہبی" }, generation: "scholar", row: 13, col: 4.25, unitId: "scholar-dhahabi" },

  { id: "ibn-baz", names: { en: "Ibn Baz", ar: "ابن باز", bn: "ইবনে বায", ur: "ابن باز" }, generation: "scholar", row: 14, col: 2.25, unitId: "scholar-ibn-baz" },
  { id: "albani", names: { en: "Al-Albani", ar: "الألباني", bn: "আল-আলবানি", ur: "البانی" }, generation: "scholar", row: 14, col: 4.25, unitId: "scholar-albani" }
];

/** Rows that come centuries after the row above them: the tree shows a "Centuries later" break before each. */
export const CHAIN_BREAK_ROWS: readonly number[] = [11, 14];

export const CHAIN_LINKS: readonly ChainLink[] = [
  // Bukhari's first hadith, "Actions are by intentions", man by man.
  { teacher: "prophet", student: "umar", source: BUKHARI_1 },
  { teacher: "umar", student: "alqamah-waqqas", source: BUKHARI_1 },
  { teacher: "alqamah-waqqas", student: "taymi", source: BUKHARI_1 },
  { teacher: "taymi", student: "yahya-ansari", source: BUKHARI_1 },
  { teacher: "yahya-ansari", student: "sufyan", source: BUKHARI_1 },
  { teacher: "sufyan", student: "humaydi", source: BUKHARI_1 },
  { teacher: "humaydi", student: "bukhari", source: BUKHARI_1 },

  // Imam Malik's two chains: through Aishah and through Ibn Umar.
  { teacher: "prophet", student: "aishah", source: BUKHARI_1128 },
  { teacher: "aishah", student: "urwah", source: BUKHARI_1128 },
  { teacher: "urwah", student: "zuhri", source: BUKHARI_1128 },
  { teacher: "zuhri", student: "malik", source: BUKHARI_1128 },
  { teacher: "zuhri", student: "sufyan", source: siyar(8, 455, "Sufyan ibn Uyaynah heard hadith from Ibn Shihab az-Zuhri, Yahya ibn Sa'id al-Ansari and others.") },
  { teacher: "prophet", student: "ibn-umar", source: MUSLIM_650 },
  { teacher: "ibn-umar", student: "nafi", source: MUSLIM_650 },
  { teacher: "nafi", student: "malik", source: MUSLIM_650 },
  { teacher: "malik", student: "yahya-yahya", source: MUSLIM_650 },

  // Abu Hanifah's chains: through Ibn Abbas, and the fiqh of Kufa through Ibn Mas'ud.
  { teacher: "prophet", student: "ibn-abbas", source: BUKHARI_98 },
  { teacher: "ibn-abbas", student: "ata", source: BUKHARI_98 },
  {
    teacher: "ata",
    student: "abu-hanifah",
    source: ABU_HANIFAH_PAGE("He learned from 'Ata' ibn Abi Rabah, who was his greatest Shaykh, and from al-Shu'bi and many others.", "ibn Abi Rabah, who was his greatest Shaykh")
  },
  { teacher: "prophet", student: "ibn-masud", source: BUKHARI_125 },
  { teacher: "ibn-masud", student: "alqamah-qays", source: BUKHARI_125 },
  { teacher: "alqamah-qays", student: "nakhai", source: BUKHARI_125 },
  { teacher: "nakhai", student: "hammad", source: siyar(5, 231, "Hammad learned fiqh from Ibrahim an-Nakha'i, and was the noblest and most learned of his students.") },
  { teacher: "hammad", student: "abu-hanifah", source: siyar(6, 391, "Abu Hanifah narrated from Ata ibn Abi Rabah, his greatest shaykh, and from Hammad ibn Abi Sulayman, with whom he learned fiqh.") },
  {
    teacher: "abu-hanifah",
    student: "abu-yusuf",
    source: ABU_HANIFAH_PAGE("The Hanafi madhhab may adopt the view of a student of the imam such as Abu Yoosuf and Muhammad.", "may adopt the view of a student of the imam such as Abu Yoosuf and Muhammad")
  },
  {
    teacher: "abu-hanifah",
    student: "shaybani",
    source: ABU_HANIFAH_PAGE("The Hanafi madhhab may adopt the view of a student of the imam such as Abu Yoosuf and Muhammad.", "may adopt the view of a student of the imam such as Abu Yoosuf and Muhammad")
  },

  // Ash-Shafi'i joined Madinah, Makkah and Iraq.
  { teacher: "malik", student: "shafii", source: siyar(10, 7, "Ash-Shafi'i travelled to Madinah and took al-Muwatta from Malik ibn Anas, reciting it from memory.") },
  { teacher: "sufyan", student: "shafii", source: siyar(10, 6, "In Makkah ash-Shafi'i learned from Muslim ibn Khalid az-Zanji, Sufyan ibn Uyaynah and others.") },
  {
    teacher: "shaybani",
    student: "shafii",
    source: SHAFII_PAGE("He learned from his companion Muhammad ibn al-Hasan and studied many books with him.", "learned from his companion Muhammad ibn al-Hasan and studied many books with him")
  },
  { teacher: "shafii", student: "humaydi", source: siyar(10, 616, "Al-Humaydi narrated from Sufyan ibn Uyaynah, a great deal, and from ash-Shafi'i; al-Bukhari narrated from him.") },

  // Imam Ahmad.
  { teacher: "shafii", student: "ahmad", source: SIYAR_AHMAD_TEACHERS },
  { teacher: "sufyan", student: "ahmad", source: MUSLIM_2421 },
  {
    teacher: "abu-yusuf",
    student: "ahmad",
    source: AHMAD_PAGE("He first learned hadith from Abu Yusuf, the companion of Abu Hanifah.", "he first learned hadith from Abu Yusuf, the companion of Abu Hanifah")
  },

  // The hadith collectors.
  { teacher: "ahmad", student: "bukhari", source: SIYAR_AHMAD_STUDENTS },
  { teacher: "ahmad", student: "muslim", source: SIYAR_AHMAD_STUDENTS },
  { teacher: "ahmad", student: "abu-dawud", source: SIYAR_AHMAD_STUDENTS },
  { teacher: "yahya-yahya", student: "muslim", source: siyar(12, 558, "Muslim first heard hadith in 218 AH from Yahya ibn Yahya at-Tamimi.") },
  { teacher: "bukhari", student: "muslim", source: siyar(12, 460, "When al-Bukhari settled in Nishapur, Muslim ibn al-Hajjaj went to learn from him often.") },
  { teacher: "bukhari", student: "tirmidhi", source: siyar(13, 271, "At-Tirmidhi narrated a great deal from al-Bukhari, his shaykh.") },

  // Ibn Taymiyyah, centuries later.
  {
    teacher: "ibn-abd-ad-daim",
    student: "ibn-taymiyyah",
    source: IBN_TAYMIYYAH_PAGE("Ibn Hajar: he learned from Ibn 'Abd al-Daa'im, al-Qaasim al-Arbili and others; he read by himself and copied Sunan Abi Dawood.", "He read by himself and copied Sunan Abi Dawood, and he studied al-rijaal")
  },
  {
    teacher: "ibn-taymiyyah",
    student: "ibn-qayyim",
    source: IBN_TAYMIYYAH_PAGE("Ibn Hajar mentions his student Shams al-Deen ibn Qayyim al-Jawziyyah, the author of so many beneficial books.", "his student was Shaykh Shams al-Deen ibn Qayyim al-Jawziyyah")
  },
  {
    teacher: "ibn-taymiyyah",
    student: "dhahabi",
    source: DHAHABI_PAGE("One of the most famous of adh-Dhahabi's shaykhs, from whom he learned and by whom he was influenced, was Shaykh al-Islam Ibn Taymiyah.", "One of the most famous of his shaykhs")
  }
];

const PEOPLE_BY_ID = new Map(CHAIN_PEOPLE.map((person) => [person.id, person]));

export function chainPerson(id: string): ChainPerson | undefined {
  return PEOPLE_BY_ID.get(id);
}

/** The person's name in the language, falling back to English. */
export function chainName(person: ChainPerson, language: SupportedLanguage): string {
  return person.names[language] || person.names.en;
}

export function teachersOf(id: string): ChainLink[] {
  return CHAIN_LINKS.filter((link) => link.student === id);
}

export function studentsOf(id: string): ChainLink[] {
  return CHAIN_LINKS.filter((link) => link.teacher === id);
}

/**
 * The shortest chain from someone back to the Prophet ﷺ, as person ids (him first, the Prophet ﷺ last), each step
 * a sourced link. Undefined when the tree has no chain for him (Ibn Taymiyyah's chains run through centuries of
 * teachers the tree leaves out).
 */
export function chainToProphet(id: string): string[] | undefined {
  const cameFrom = new Map<string, string | undefined>([[id, undefined]]);
  const queue = [id];
  while (queue.length) {
    const current = queue.shift() as string;
    if (current === "prophet") {
      const chain: string[] = [];
      for (let step: string | undefined = current; step !== undefined; step = cameFrom.get(step)) chain.unshift(step);
      return chain;
    }
    for (const link of teachersOf(current)) {
      if (!cameFrom.has(link.teacher)) {
        cameFrom.set(link.teacher, current);
        queue.push(link.teacher);
      }
    }
  }
  return undefined;
}

/** Everyone above someone on the tree (his teachers, theirs, ...) and everyone below (his students, theirs, ...). */
export function lineageOf(id: string): { above: Set<string>; below: Set<string> } {
  const walk = (start: string, next: (person: string) => string[]) => {
    const seen = new Set<string>();
    const stack = [start];
    while (stack.length) {
      for (const other of next(stack.pop() as string)) {
        if (!seen.has(other)) {
          seen.add(other);
          stack.push(other);
        }
      }
    }
    return seen;
  };
  return {
    above: walk(id, (person) => teachersOf(person).map((link) => link.teacher)),
    below: walk(id, (person) => studentsOf(person).map((link) => link.student))
  };
}
