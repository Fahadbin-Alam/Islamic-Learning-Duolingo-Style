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
  type ArabicTerm
} from "../data/arabicTerms";

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
    expect(getLessonArabic("no-such-node", branchId)).toBe(BRANCH_ARABIC[branchId]);
    expect(getLessonArabic("no-such-node")).toBeUndefined();
    expect(getBranchArabic(branchId)).toBe(BRANCH_ARABIC[branchId]);
    expect(getTopicArabic("prayer")).toBe(TOPIC_ARABIC.prayer);
    expect(getTopicArabic("constructor")).toBeUndefined();
  });

  it("gives a node card only the node's own term, never its unit's", () => {
    expect(getNodeArabic("prayer-wudu-what-wudu-is")).toBe(NODE_ARABIC["prayer-wudu-what-wudu-is"]);
    expect(getNodeArabic("prayer-wudu-reinforcement-review")).toBeUndefined();
    expect(getLessonArabic("prayer-wudu-reinforcement-review", "prayer-wudu")).toBe(BRANCH_ARABIC["prayer-wudu"]);
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
    expect(getNodeArabic("notes-quran-tafseer-surahs-1-10-surah-al-fatihah")?.ar).toBe("سورة الفاتحة");
    expect(getNodeArabic("notes-quran-tafseer-surahs-111-114-surah-an-nas")?.ar).toBe("سورة الناس");
    expect(getNodeArabic("notes-prophets-prophets-from-your-notes-2-noah")).toMatchObject({ ar: "نوح", translit: "Nuh" });
  });

  it("vowels the manners words like the greetings", () => {
    const manners = Object.entries(NODE_ARABIC).filter(([id]) => id.startsWith("manners-"));
    expect(manners.filter(([, term]) => !HARAKAT.test(term.ar)).map(([id]) => id)).toEqual([]);
  });
});
