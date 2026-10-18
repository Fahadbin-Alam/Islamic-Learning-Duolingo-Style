import { COURSE } from "../data/course";
import {
  BRANCH_ARABIC,
  NODE_ARABIC,
  TOPIC_ARABIC,
  getBranchArabic,
  getLessonArabic,
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
  ["NODE_ARABIC", NODE_ARABIC]
];

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
});
