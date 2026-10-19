import { COURSE } from "../data/course";
import {
  BRANCH_ARABIC,
  IMPORTED_ARABIC,
  NODE_ARABIC,
  TOPIC_ARABIC,
  getBranchArabic,
  getLessonArabic,
  getNodeArabic,
  getTopicArabic,
  isFirstUseOfWord,
  withoutVowels,
  type ArabicTerm
} from "../data/arabicTerms";
import { HADITH_BASICS } from "../data/hadithBasics";

// Every Arabic term must point at something the course really has, and must
// read as Arabic with a transliteration and a plain meaning beside it.

const branchIds = new Set(COURSE.sections.flatMap((section) => section.branches.map((branch) => branch.id)));
const nodeIds = new Set(COURSE.sections.flatMap((section) => section.nodes.map((node) => node.id)));
const topicIds = new Set<string>([...COURSE.sections.map((section) => section.topicId), "hadith"]);

const ARABIC_LETTER = /[ء-ي]/;
const LATIN_LETTER = /[A-Za-z]/;

const tables: [string, Record<string, ArabicTerm>][] = [
  ["TOPIC_ARABIC", TOPIC_ARABIC],
  ["BRANCH_ARABIC", BRANCH_ARABIC],
  ["NODE_ARABIC", NODE_ARABIC],
  ["IMPORTED_ARABIC.branches", IMPORTED_ARABIC.branches],
  ["IMPORTED_ARABIC.nodes", IMPORTED_ARABIC.nodes]
];
const HARAKAT = /[\u064B-\u0652]/;

describe("arabic terms", () => {
  it("only names branches that exist in the course", () => {
    const missing = Object.keys(BRANCH_ARABIC).filter((id) => !branchIds.has(id));
    expect(missing).toEqual([]);
  });

  it("only names nodes that exist in the course", () => {
    const missing = Object.keys(NODE_ARABIC).filter((id) => !nodeIds.has(id));
    expect(missing).toEqual([]);
  });

  it("only names real topics", () => {
    const unknown = Object.keys(TOPIC_ARABIC).filter((id) => !topicIds.has(id));
    expect(unknown).toEqual([]);
  });

  it("writes every term in Arabic script with a transliteration and meaning", () => {
    const problems: string[] = [];
    for (const [table, terms] of tables) {
      for (const [id, term] of Object.entries(terms)) {
        if (!ARABIC_LETTER.test(term.ar)) problems.push(`${table}.${id}: ar has no Arabic letters`);
        if (LATIN_LETTER.test(term.ar)) problems.push(`${table}.${id}: ar has Latin letters`);
        if (!term.translit.trim()) problems.push(`${table}.${id}: empty translit`);
        if (!term.meaning.trim()) problems.push(`${table}.${id}: empty meaning`);
      }
    }
    expect(problems).toEqual([]);
  });

  it("looks up the node term first, then the branch term", () => {
    const [branchId] = Object.keys(BRANCH_ARABIC);
    const [nodeId] = Object.keys(NODE_ARABIC);

    expect(getLessonArabic(nodeId, branchId)).toBe(NODE_ARABIC[nodeId]);
    // A borrowed unit word keeps the banner's meaning, gains vowel marks and says it is not new.
    const borrowed = getLessonArabic("no-such-node", branchId);
    expect(borrowed).toMatchObject({ translit: BRANCH_ARABIC[branchId].translit, meaning: BRANCH_ARABIC[branchId].meaning, fromUnit: true });
    expect(withoutVowels(borrowed?.ar ?? "")).toBe(BRANCH_ARABIC[branchId].ar);
    expect(getLessonArabic(nodeId, branchId)?.fromUnit).toBeUndefined();
    expect(getLessonArabic("no-such-node")).toBeUndefined();
    expect(getBranchArabic(branchId)).toBe(BRANCH_ARABIC[branchId]);
    expect(getTopicArabic("prayer")).toBe(TOPIC_ARABIC.prayer);
    expect(getTopicArabic("constructor")).toBeUndefined();
  });

  it("gives a node card only the node's own term, never its unit's", () => {
    expect(getNodeArabic("prayer-wudu-what-wudu-is")).toBe(NODE_ARABIC["prayer-wudu-what-wudu-is"]);
    expect(getNodeArabic("prayer-wudu-reinforcement-review")).toBeUndefined();
    expect(getLessonArabic("prayer-wudu-reinforcement-review", "prayer-wudu")).toMatchObject({ ar: "الْوُضُوءُ", fromUnit: true });
  });

  it("names every unit in Arabic, and writes banners without vowel marks", () => {
    const branches = COURSE.sections.flatMap((section) => section.branches);
    expect(branches.filter((branch) => !getBranchArabic(branch.id)).map((branch) => branch.id)).toEqual([]);
    expect(branches.filter((branch) => HARAKAT.test(getBranchArabic(branch.id)?.ar ?? "")).map((branch) => branch.id)).toEqual([]);
  });

  it("gives every learn card an Arabic word", () => {
    const nodes = COURSE.sections.flatMap((section) => section.nodes);
    expect(nodes.filter((node) => !getLessonArabic(node.id, node.branchId)).map((node) => node.id)).toEqual([]);
  });

  it("names imported surahs, prophets and hadith books in Arabic", () => {
    const imported = COURSE.sections.flatMap((section) => section.nodes.filter((node) => node.id.startsWith("notes-")).map((node) => ({ node, topicId: section.topicId })));
    const missing = imported
      .filter(({ topicId }) => topicId === "quran_tafseer" || topicId === "prophets" || topicId === "hadith")
      .filter(({ node }) => !getNodeArabic(node.id))
      .map(({ node }) => node.id);
    expect(missing).toEqual([]);
    expect(imported.filter(({ topicId }) => topicId === "quran_tafseer")).toHaveLength(114);
    expect(getNodeArabic("notes-quran-tafseer-surahs-1-10-surah-al-fatihah")?.ar).toBe("سُورَةُ الْفَاتِحَةِ");
    expect(getNodeArabic("notes-quran-tafseer-surahs-111-114-surah-an-nas")?.ar).toBe("سُورَةُ النَّاسِ");
    expect(getNodeArabic("notes-prophets-prophets-from-your-notes-2-noah")).toMatchObject({ ar: "نُوحٌ", translit: "Nuh" });
    // A hadith is named by a word from it, not by its book.
    expect(getNodeArabic("notes-hadith-hadith-from-your-notes-1-sahih-al-bukhari-3276")).toMatchObject({ ar: "أَعُوذُ بِاللَّهِ", translit: "A'udhu billah" });
  });

  it("vowels the manners words like the greetings", () => {
    const manners = Object.entries(NODE_ARABIC).filter(([id]) => id.startsWith("manners-"));
    expect(manners.filter(([, term]) => !HARAKAT.test(term.ar)).map(([id]) => id)).toEqual([]);
  });

  it("vowels every word on a node card and a learn card", () => {
    const nodes = COURSE.sections.flatMap((section) => section.nodes);
    const bare = nodes
      .map((node) => ({ id: node.id, word: getLessonArabic(node.id, node.branchId) }))
      .filter(({ word }) => word && !HARAKAT.test(word.ar))
      .map(({ id, word }) => `${id}: ${word?.ar}`);
    expect(bare).toEqual([]);
    const ownWords = [...Object.entries(NODE_ARABIC), ...Object.entries(IMPORTED_ARABIC.nodes)];
    expect(ownWords.filter(([, term]) => !HARAKAT.test(term.ar)).map(([id]) => id)).toEqual([]);
  });

  it("gives a learn card its unit's own banner word, only with vowel marks added", () => {
    const branches = COURSE.sections.flatMap((section) => section.branches);
    const changed = branches
      .map((branch) => ({ id: branch.id, banner: getBranchArabic(branch.id), word: getLessonArabic("no-such-node", branch.id) }))
      .filter(({ banner, word }) => !banner || !word || !HARAKAT.test(word.ar) || withoutVowels(word.ar) !== banner.ar || word.meaning !== banner.meaning)
      .map(({ id }) => id);
    expect(changed).toEqual([]);
  });

  it("names the imported people in Arabic, apart from the ones we are not sure of", () => {
    const people = COURSE.sections
      .filter((section) => section.topicId === "sahabah" || section.topicId === "prophets" || section.topicId === "women_of_the_book")
      .flatMap((section) => section.nodes.filter((node) => node.id.startsWith("notes-")));
    // Barrah bint Samaw'al: the sources spell her father's name more than one way in Arabic, so she has none yet.
    expect(people.filter((node) => !getNodeArabic(node.id)).map((node) => node.title)).toEqual(["Barrah bint Samaw'al"]);
    expect(getNodeArabic("notes-sahabah-companions-from-your-notes-1-lyaash-ibn-abi-rabiyyah")).toMatchObject({
      ar: "عَيَّاشُ بْنُ أَبِي رَبِيعَةَ",
      translit: "'Ayyash ibn Abi Rabi'ah"
    });
    expect(getNodeArabic("notes-women-of-the-book-mothers-of-the-believers-from-your-notes-3-umm-al-banin")).toMatchObject({
      ar: "أُمُّ الْبَنِينَ",
      translit: "Umm al-Banin"
    });
  });

  it("marks a word NEW only on the first lesson of its topic to show it", () => {
    const shownTwice: string[] = [];
    for (const section of COURSE.sections) {
      const newWords = section.nodes.filter((node) => isFirstUseOfWord(node.id)).map((node) => withoutVowels(getNodeArabic(node.id)!.ar));
      shownTwice.push(...newWords.filter((word, index) => newWords.indexOf(word) !== index).map((word) => `${section.topicId}: ${word}`));
      // Every lesson with a word of its own is either the first to show it or repeats a word already NEW.
      const firstWords = new Set(newWords);
      shownTwice.push(
        ...section.nodes
          .filter((node) => getNodeArabic(node.id) && !firstWords.has(withoutVowels(getNodeArabic(node.id)!.ar)))
          .map((node) => `${node.id}: never NEW`)
      );
    }
    expect(shownTwice).toEqual([]);
    expect(isFirstUseOfWord("foundation-niyyah")).toBe(true);
    expect(isFirstUseOfWord("foundation-home-adab-entering-home")).toBe(false);
    expect(isFirstUseOfWord("foundation-home-adab-table-beginning")).toBe(false);
    // Musa's second lesson, right after his first in the same unit, teaches a word of its own (Quran 20:46).
    expect(isFirstUseOfWord("prophets-musa")).toBe(true);
    expect(getNodeArabic("prophets-power-and-deliverance-musa-and-fear")).toMatchObject({ ar: "لَا تَخَافَا" });
    expect(isFirstUseOfWord("prophets-power-and-deliverance-musa-and-fear")).toBe(true);
    // A node with no word of its own is never NEW.
    expect(isFirstUseOfWord("no-such-node")).toBe(false);
  });

  it("gives each saying in Hadith for kids a vowelled phrase of its own", () => {
    const missing = HADITH_BASICS.nodes.filter((node) => !getNodeArabic(node.id) || !HARAKAT.test(getNodeArabic(node.id)!.ar)).map((node) => node.id);
    expect(missing).toEqual([]);
    expect(getBranchArabic(HADITH_BASICS.branch.id)).toMatchObject({ ar: "أحاديث للأطفال" });
  });

  it("names the Hadith and imported women units by what they teach, each with its own Arabic", () => {
    for (const topicId of ["hadith", "women_of_the_book"]) {
      const branches = COURSE.sections.find((section) => section.topicId === topicId)!.branches.filter((branch) => branch.id.startsWith("notes-") || branch.topicId === "hadith");
      const banners = branches.map((branch) => getBranchArabic(branch.id)?.ar);
      expect(banners.filter((banner, index) => !banner || banners.indexOf(banner) !== index)).toEqual([]);
      expect(branches.filter((branch) => /\d$/.test(branch.title)).map((branch) => branch.title)).toEqual([]);
    }
    expect(getTopicArabic("women_of_the_book")).toMatchObject({ ar: "نساء خالدات", meaning: "Great women" });
  });

  it("writes each imported person's whole name in Arabic, as the transliteration gives it", () => {
    const people = COURSE.sections
      .filter((section) => section.topicId === "sahabah" || section.topicId === "prophets" || section.topicId === "women_of_the_book")
      .flatMap((section) => section.nodes.filter((node) => node.id.startsWith("notes-")));
    // "Tha'labah ibn Hatib" is ثَعْلَبَةُ بْنُ حَاطِبٍ, not ثَعْلَبَةُ alone: every ibn and bint of the name is in its Arabic.
    const count = (text: string, pattern: RegExp) => (text.match(pattern) ?? []).length;
    const mismatched = people.filter((node) => {
      const term = getNodeArabic(node.id);
      if (!term) return false;
      const plain = withoutVowels(term.ar);
      return count(node.title, /\b(ibn|bin)\b/gi) !== count(plain, /(^|\s)(بن|ابن)(\s|$)/g) || count(node.title, /\bbint\b/gi) !== count(plain, /(^|\s)بنت(\s|$)/g);
    });
    expect(mismatched.map((node) => `${node.title}: ${getNodeArabic(node.id)?.ar}`)).toEqual([]);
    expect(getNodeArabic("notes-sahabah-companions-from-your-notes-7-thalabah")).toMatchObject({ ar: "ثَعْلَبَةُ بْنُ حَاطِبٍ", translit: "Tha'labah ibn Hatib" });
    // Khawlah of Banu Hanifah: al-Hanafiyyah in both scripts, like her son Muhammad ibn al-Hanafiyyah.
    expect(getNodeArabic("notes-women-of-the-book-mothers-of-the-believers-from-your-notes-2-khawlah-bint-jafar-al-hanifiyyah")).toMatchObject({
      ar: "خَوْلَةُ بِنْتُ جَعْفَرٍ الْحَنَفِيَّةُ",
      translit: "Khawlah bint Ja'far al-Hanafiyyah"
    });
  });

  it("gives every unit of the course its own Arabic banner, and no unit a number for a name", () => {
    const branches = COURSE.sections.flatMap((section) => section.branches);
    const banners = branches.map((branch) => getBranchArabic(branch.id)?.ar);
    expect(branches.filter((branch, index) => banners.indexOf(banners[index]) !== index).map((branch) => `${branch.id}: ${banners[branches.indexOf(branch)]}`)).toEqual([]);
    expect(branches.filter((branch) => /\d/.test(branch.title) || /^(Review and mastery|Companions|Prophets|Surahs)\b/.test(branch.title)).map((branch) => branch.title)).toEqual([]);
    expect(getBranchArabic("notes-quran-tafseer-surahs-114-105")).toMatchObject({ ar: "من سورة الناس إلى سورة الفيل" });
    expect(getLessonArabic("no-such-node", "notes-quran-tafseer-surahs-114-105")?.ar).toBe("مِنْ سُورَةِ النَّاسِ إِلَى سُورَةِ الْفِيلِ");
  });

  it("names the depth lessons by a word of their own line", () => {
    // [node, word]: the word on the card is in the card's line or its ayah, not a theme of the old lesson.
    const expected: [string, string][] = [
      ["prophets-early-messengers-adam-and-repentance", "الْأَسْمَاءُ"],
      ["prophets-early-messengers-nuh-and-patience", "زَوْجَيْنِ"],
      ["prophets-family-and-sacrifice-yusuf-and-purity", "الرُّؤْيَا"],
      ["women-mothers-depth-khadijah-and-support", "السَّلَامُ"],
      ["women-quran-depth-maryam-and-purity", "سُورَةُ مَرْيَمَ"],
      ["women-virtues-and-legacy-courage-under-pressure", "قُرَّةُ عَيْنٍ"],
      ["quran-surah-fatihah-opening-and-names", "الصَّلَاةُ"]
    ];
    expect(expected.filter(([node, word]) => getNodeArabic(node)?.ar !== word)).toEqual([]);
    const themes = ["التَّوْبَةُ", "الصَّبْرُ", "الْعِفَّةُ", "الْعِلْمُ", "الْمُؤَازَرَةُ", "الطَّهَارَةُ", "خِدْمَةُ الْوَحْيِ", "الشَّجَاعَةُ", "فَاتِحَةُ الْكِتَابِ"];
    const depth = COURSE.sections
      .flatMap((section) => section.nodes)
      .filter((node) => /^(prophets-(early-messengers|family-and-sacrifice|power-and-deliverance)|women-(quran-depth|mothers-depth|virtues-and-legacy))-/.test(node.id));
    expect(depth.filter((node) => node.id !== "women-quran-depth-hawwa-and-return" && themes.includes(getNodeArabic(node.id)?.ar ?? "")).map((node) => node.id)).toEqual([]);
  });

  it("writes ﷺ after Muhammad, the Prophet, in every meaning", () => {
    const meanings = [...tables.flatMap(([, terms]) => Object.values(terms)), ...COURSE.sections.flatMap((section) => section.nodes).map((node) => getLessonArabic(node.id, node.branchId)!)]
      .map((term) => term.meaning)
      .filter((meaning) => /\bProphet Muhammad\b|\bMuhammad\b$/.test(meaning));
    expect(meanings.filter((meaning) => !/Muhammad ﷺ/.test(meaning))).toEqual([]);
    expect(getNodeArabic("prophets-muhammad")?.meaning).toBe("Prophet Muhammad ﷺ");
  });
});
