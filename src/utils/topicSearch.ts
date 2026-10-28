import { getBranchArabic, getNodeArabic, getTopicArabic, type ArabicTerm } from "../data/arabicTerms";
import { getTopicCopy, LANGUAGE_OPTIONS, t } from "../i18n";
import type { LearningSection, SupportedLanguage, TopicId } from "../types";

// The topic picker's search: topics, units (a Companion, a surah) and lessons, found by their names in every
// language the app speaks, whatever language the learner reads it in. "Hussain", "al husayn", "حسين" and
// "হুসাইন" all find Al-Husayn ibn Ali.

export type TopicSearchHit = {
  kind: "topic" | "unit" | "lesson";
  topicId: TopicId;
  /** Unit and lesson hits. */
  unitId?: string;
  /** Lesson hits: this circle. Unit hits: the unit's first circle. */
  nodeId?: string;
  /** English names; the picker shows them in the learner's language. */
  title: string;
  unitTitle?: string;
};

type Entry = TopicSearchHit & {
  /** Folded names (one per language), Arabic term and transliteration. */
  keys: string[];
  compact: string[];
  skeletons: string[];
  rank: number;
};

const LANGUAGES = LANGUAGE_OPTIONS.map((option) => option.id) as SupportedLanguage[];
const KIND_RANK = { topic: 0, unit: 1, lesson: 2 } as const;

/**
 * Lower case, no accents or vowel marks, one spelling for Arabic and Urdu letters that vary (أ إ آ ٱ, ة, ى ی,
 * ک, ہ), punctuation as spaces, and no stand-alone "al", "el", "the" or "ال".
 */
export function foldSearchText(text: string, keepArticles = false): string {
  return text
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[ʿʾ'’‘`ـ]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/[ىیئ]/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ک/g, "ك")
    .replace(/[ہھ]/g, "ه")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .split(" ")
    .filter((word) => word && (keepArticles || (word !== "al" && word !== "el" && word !== "the" && word !== "ال")))
    .map((word) => (!keepArticles && word.length > 3 && word.startsWith("ال") ? word.slice(2) : word))
    .join(" ");
}

/** The name run together with "al" kept, so "alhusayn" still finds Al-Husayn. */
function compactText(text: string): string {
  return foldSearchText(text, true).replace(/ /g, "");
}

/** Every word as its consonants, so spellings like "Hussain" and "Husayn", or "Uthman" and "Othman", meet. */
function skeleton(folded: string): string {
  if (!/^[a-z0-9 ]+$/.test(folded)) return "";
  return folded
    .split(" ")
    // "ay", "ai" and "ei" are all a "y" (Husayn, Hussain, Hussein; but not Hasan), and a first vowel stays as "v":
    // "Umar" and "Omar" meet, "Ahsan" and "Hussain" do not.
    .map((word) => word.replace(/[ae][iy]/g, "y").replace(/^[aeiou]+/, "v").replace(/(?!^)[aeiou]/g, "").replace(/(.)\1+/g, "$1"))
    .filter(Boolean)
    .join(" ");
}

function namesOf(english: string, translate: (language: SupportedLanguage) => string, arabic?: ArabicTerm, extra: (string | undefined)[] = []) {
  const names = new Set<string>([english, ...LANGUAGES.map(translate), ...extra.filter((name): name is string => Boolean(name))]);
  if (arabic) {
    names.add(arabic.ar);
    if (arabic.translit) names.add(arabic.translit);
  }
  const keys = [...new Set([...names].map((name) => foldSearchText(name)).filter(Boolean))];
  const compact = [...new Set([...names].map(compactText))];
  return { keys, compact, skeletons: [...new Set(keys.map(skeleton).filter(Boolean))] };
}

/** One index per course; build it once. */
export function buildTopicSearchIndex(sections: readonly LearningSection[]): Entry[] {
  const entries: Entry[] = [];

  for (const section of sections) {
    const topicId = section.topicId;
    const topicTitle = getTopicCopy(topicId, "en").title;
    entries.push({
      kind: "topic",
      topicId,
      title: topicTitle,
      rank: entries.length,
      ...namesOf(topicTitle, (language) => getTopicCopy(topicId, language).title, getTopicArabic(topicId))
    });

    for (const branch of section.branches) {
      const nodes = section.nodes.filter((node) => node.branchId === branch.id);
      if (!nodes.length) continue;
      entries.push({
        kind: "unit",
        topicId,
        unitId: branch.id,
        nodeId: nodes[0].id,
        title: branch.title,
        rank: entries.length,
        ...namesOf(branch.title, (language) => t(branch.title, undefined, language), getBranchArabic(branch.id), [branch.surahName])
      });

      for (const node of nodes) {
        // Reviews and quizzes are not something to look for, and a lesson named like its unit is the unit's hit.
        if (node.kind === "review" || node.title === branch.title) continue;
        entries.push({
          kind: "lesson",
          topicId,
          unitId: branch.id,
          nodeId: node.id,
          title: node.title,
          unitTitle: branch.title,
          rank: entries.length,
          ...namesOf(node.title, (language) => t(node.title, undefined, language), getNodeArabic(node.id))
        });
      }
    }
  }

  return entries;
}

/** How well one entry matches: lower is better, undefined is no match. */
function score(entry: Entry, query: string, compactQuery: string, skeletonQuery: string): number | undefined {
  let best: number | undefined;
  const take = (value: number) => {
    if (best === undefined || value < best) best = value;
  };
  for (const key of entry.keys) {
    if (key === query) take(0);
    else if (key.startsWith(query)) take(1);
    else if (` ${key}`.includes(` ${query}`)) take(2);
    else if (key.includes(query)) take(3);
  }
  if (best !== undefined) return best;
  if (compactQuery.length >= 3 && entry.compact.some((key) => key.includes(compactQuery))) return 4;
  if (skeletonQuery.length >= 2) {
    if (entry.skeletons.some((key) => ` ${key} `.includes(` ${skeletonQuery} `))) return 5;
    if (entry.skeletons.some((key) => ` ${key}`.includes(` ${skeletonQuery}`))) return 6;
  }
  return undefined;
}

/** The best matches first: closer names, then topics before units before lessons, then course order. */
export function searchTopics(index: readonly Entry[], text: string, limit = 40): TopicSearchHit[] {
  const query = foldSearchText(text);
  if (!query) return [];
  const compactQuery = compactText(text);
  const skeletonQuery = skeleton(query);
  const found: { entry: Entry; score: number }[] = [];
  for (const entry of index) {
    const value = score(entry, query, compactQuery, skeletonQuery);
    if (value !== undefined) found.push({ entry, score: value });
  }
  found.sort((a, b) => a.score - b.score || KIND_RANK[a.entry.kind] - KIND_RANK[b.entry.kind] || a.entry.rank - b.entry.rank);
  return found.slice(0, limit).map(({ entry: { keys: _keys, compact: _compact, skeletons: _skeletons, rank: _rank, ...hit } }) => hit);
}
