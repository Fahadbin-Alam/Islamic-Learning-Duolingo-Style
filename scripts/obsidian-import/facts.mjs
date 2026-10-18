// Builds lessons from structured notes (frontmatter "type: person | surah | hadith"), which carry
// facts in properties rather than written Q:/A: lines. Questions are generated from those facts,
// with wrong choices drawn from the same fact on other notes of the same type.
import { cleanText, resolveTopic, slugify } from "./lib.mjs";

export const FACT_TYPES = ["person", "surah", "hadith"];

const PERSON_FACTS = [
  { key: "tribe", prompt: (name) => `Which tribe was ${name} from?` },
  { key: "clan", prompt: (name) => `Which clan did ${name} belong to?` },
  { key: "known_for", prompt: (name) => `What is ${name} known for?` },
  { key: "died", prompt: (name) => `When did ${name} pass away?` },
  { key: "death_place", prompt: (name) => `Where did ${name} pass away?` },
  { key: "birth_place", prompt: (name) => `Where was ${name} born?` },
  { key: "father", prompt: (name) => `Who was the father of ${name}?` },
  { key: "mother", prompt: (name) => `Who was the mother of ${name}?` },
  { key: "burial_place", prompt: (name) => `Where is ${name} buried?` }
];

// Checked in this order, so a Mother of the Believers who is also tagged Sahabi lands in Women of the Book.
const PERSON_TOPIC_TAGS = {
  "mother-of-the-believers": "women_of_the_book",
  "mothers-of-the-believers": "women_of_the_book",
  prophet: "prophets",
  prophets: "prophets",
  sahabi: "sahabah",
  sahabiyyah: "sahabah",
  sahaba: "sahabah",
  sahabah: "sahabah",
  companion: "sahabah",
  "women-of-islam": "women_of_the_book"
};

const SKIPPED_BODY_HEADINGS = /^(sources?|references?|related( stories| notes)?|family( &| and)? connections|links|see also|tabs)$/i;

function asList(value) {
  if (value === undefined || value === null || value === "") return [];
  return Array.isArray(value) ? value : [value];
}

function factText(value) {
  return asList(value)
    .map((item) => cleanText(String(item)))
    .filter(Boolean)
    .join(", ");
}

function hashCode(input) {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

const STOP_WORDS = new Set(["the", "and", "with", "from", "that", "this", "surah", "allah", "prophet", "abu", "ibn", "bint", "umm", "near", "sahih", "sunan", "jami", "banu", "bani", "bint", "ibn"]);

function significantWords(text) {
  return slugify(text)
    .split("-")
    .filter((word) => /^\d+$/.test(word) || (word.length >= 4 && !STOP_WORDS.has(word)));
}

// Picks up to `count` wrong choices from `pool` that can't be confused with `answer`.
export function pickDistractors(answer, pool, seed, count = 3) {
  const answerKey = answer.toLowerCase();
  const answerWords = significantWords(answer);
  const candidates = [...new Set(pool)].filter(
    (value) => value && value.toLowerCase() !== answerKey && !significantWords(value).some((word) => answerWords.includes(word))
  );
  candidates.sort();
  const start = candidates.length ? hashCode(seed) % candidates.length : 0;
  const picked = [];
  const usedWords = new Set();
  // Wrong choices also shouldn't overlap each other ("8 AH" twice gives the answer away).
  for (const value of candidates.map((_, index) => candidates[(start + index) % candidates.length])) {
    const words = significantWords(value);
    if (words.some((word) => usedWords.has(word))) continue;
    words.forEach((word) => usedWords.add(word));
    picked.push(value);
    if (picked.length === count) break;
  }
  return picked;
}

function multipleChoice(prompt, answer, distractors, explanation) {
  return {
    prompt,
    options: [{ label: answer, correct: true }, ...distractors.map((label) => ({ label, correct: false }))],
    explanation
  };
}

// Plain prose from a note body: paragraphs and quotes, without headings, code, Arabic blocks or link lists.
export function bodyProse(body) {
  const kept = [];
  let skipping = false;
  let inFence = false;
  for (const line of body.split("\n")) {
    const trimmed = line.trim();
    if (/^(```|~~~)/.test(trimmed)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const heading = /^#{1,6}\s+(.+)$/.exec(trimmed);
    if (heading) {
      skipping = SKIPPED_BODY_HEADINGS.test(cleanText(heading[1]).replace(/[^\w &]/g, "").trim());
      continue;
    }
    if (skipping || /^[-*+]\s+\[\[/.test(trimmed) || /^[-*+]\s+\[[^\]]+\]\(/.test(trimmed)) continue;
    if (/[\u0600-\u06FF]/.test(trimmed)) continue;
    kept.push(trimmed.replace(/^>\s?/, ""));
  }
  return cleanText(kept.join("\n")).replace(/\n{2,}/g, "\n").trim();
}

// "**English name:** The Declining Day" style label lines.
export function labelFields(body) {
  const fields = {};
  for (const match of body.matchAll(/^\s*[-*]?\s*\*\*([^*:]+?):?\*\*:?\s*(.+)$/gm)) {
    fields[slugify(match[1]).replace(/-/g, "_")] = cleanText(match[2]);
  }
  return fields;
}

function noteName(data, fileName) {
  return cleanText(String(data.title ?? fileName.replace(/^\d+\s*-\s*/, "")));
}

export function classifyFactNote(data, folderTopic) {
  const type = String(data.type ?? "").toLowerCase();
  if (!FACT_TYPES.includes(type)) return undefined;
  if (type === "surah") return { kind: "surah", topicId: "quran_tafseer" };
  if (type === "hadith") return { kind: "hadith", topicId: resolveTopic(data.topic) ?? "hadith" };
  const tags = new Set(asList(data.tags).map((tag) => slugify(String(tag))));
  const tagTopic = Object.entries(PERSON_TOPIC_TAGS).find(([tag]) => tags.has(tag))?.[1];
  const topicId = resolveTopic(data.topic) ?? tagTopic ?? (folderTopic === "sahabah" || folderTopic === "prophets" ? folderTopic : undefined);
  return topicId ? { kind: "person", topicId } : { kind: "person", topicId: undefined };
}

function personLesson(note, pools) {
  const { data } = note;
  const name = noteName(data, note.fileName);
  const facts = Object.fromEntries(PERSON_FACTS.map(({ key }) => [key, factText(data[key])]));
  const summary = [
    facts.known_for ? `Known for: ${facts.known_for}.` : "",
    data.full_name && cleanText(String(data.full_name)) !== name ? `Full name: ${cleanText(String(data.full_name))}.` : "",
    facts.tribe ? `Tribe: ${facts.tribe}${facts.clan ? `, clan of ${facts.clan}` : ""}.` : facts.clan ? `Clan: ${facts.clan}.` : "",
    facts.father ? `Father: ${facts.father}.` : "",
    facts.birth_place ? `Born in ${facts.birth_place}.` : "",
    facts.died ? `Passed away in ${facts.died}${facts.death_place ? ` at ${facts.death_place}` : ""}.` : facts.death_place ? `Passed away at ${facts.death_place}.` : ""
  ]
    .filter(Boolean)
    .join(" ");
  const prose = bodyProse(note.body);
  const questions = [];
  for (const fact of PERSON_FACTS) {
    const answer = facts[fact.key];
    if (!answer) continue;
    const distractors = pickDistractors(answer, pools.person[fact.key] ?? [], `${name}:${fact.key}`);
    if (distractors.length < 2) continue;
    questions.push(multipleChoice(fact.prompt(name), answer, distractors, summary || `${name}: ${answer}.`));
  }
  return {
    title: name,
    content: [prose, summary].filter(Boolean).join("\n"),
    extras: facts.known_for ? { keyTakeaway: `${name}: ${facts.known_for}.` } : {},
    questions,
    sourceUrls: note.urls
  };
}

function surahNumber(note) {
  const fromData = Number(data(note).number ?? data(note).surah_number);
  if (Number.isInteger(fromData) && fromData > 0) return fromData;
  const match = /^(\d+)/.exec(note.fileName) ?? /Quran (\d+):/.exec(note.body);
  return match ? Number(match[1]) : undefined;
}

function data(note) {
  return { ...note.labels, ...note.data };
}

function surahFacts(note) {
  const fields = data(note);
  const pick = (...keys) => keys.map((key) => fields[key]).find((value) => value !== undefined && value !== "");
  const place = String(pick("revelation_place", "place_of_revelation", "revealed", "revelation", "type_of_revelation") ?? "");
  return {
    number: surahNumber(note),
    englishName: cleanText(String(pick("english_name", "english", "translation", "meaning", "name_meaning") ?? "")),
    ayahCount: Number(pick("ayah_count", "ayahs", "verses", "number_of_ayahs", "number_of_verses", "total_ayahs")) || undefined,
    place: /mak|mec/i.test(place) ? "Makkah" : /mad|med/i.test(place) ? "Madinah" : undefined
  };
}

// "### Quran 103:1" headings, each followed by a "> translation" quote.
export function surahAyahs(body) {
  const ayahs = [];
  let current;
  for (const line of body.split("\n")) {
    const heading = /^#{2,6}\s+Quran\s+(\d+):(\d+)/i.exec(line.trim());
    if (heading) {
      current = { ref: `${heading[1]}:${heading[2]}`, text: "" };
      ayahs.push(current);
      continue;
    }
    if (/^#{1,6}\s/.test(line.trim())) {
      current = undefined;
      continue;
    }
    const quote = /^>\s?(.*)$/.exec(line.trim());
    if (current && quote && !/[\u0600-\u06FF]/.test(quote[1])) current.text = `${current.text} ${quote[1]}`.trim();
    else if (current && !quote && /[\u0600-\u06FF]/.test(line) && !/</.test(line)) current.arabic = `${current.arabic ?? ""} ${line.trim()}`.trim();
  }
  return ayahs.map((ayah) => ({ ...ayah, text: cleanText(ayah.text).replace(/^\[!\w+\][-+]?\s*/, "") })).filter((ayah) => ayah.text);
}

function surahLesson(note, pools) {
  const facts = surahFacts(note);
  const name = noteName(note.data, note.fileName);
  const ayahs = surahAyahs(note.body);
  const summary = [
    facts.englishName ? `${name} means "${facts.englishName}".` : "",
    facts.place ? `It was revealed in ${facts.place}.` : "",
    facts.ayahCount ? `It has ${facts.ayahCount} ayahs.` : ""
  ]
    .filter(Boolean)
    .join(" ");
  const questions = [];
  if (facts.englishName) {
    const distractors = pickDistractors(facts.englishName, pools.surah.englishName, `${name}:english`);
    if (distractors.length >= 2) questions.push(multipleChoice(`What does the name ${name} mean?`, facts.englishName, distractors, summary));
  }
  if (facts.place) {
    questions.push(multipleChoice(`Where was ${name} revealed?`, facts.place, [facts.place === "Makkah" ? "Madinah" : "Makkah"], summary));
  }
  if (facts.ayahCount) {
    const distractors = pickDistractors(String(facts.ayahCount), pools.surah.ayahCount, `${name}:ayahs`);
    if (distractors.length >= 2) questions.push(multipleChoice(`How many ayahs does ${name} have?`, String(facts.ayahCount), distractors, summary));
  }
  if (ayahs.length >= 3) {
    const target = ayahs[hashCode(name) % ayahs.length];
    const distractors = pickDistractors(target.text, ayahs.map((ayah) => ayah.text), `${name}:ayah`);
    if (distractors.length >= 2) {
      const prompt = target.arabic ? `What does this ayah mean? ${target.arabic} (Quran ${target.ref})` : `Which is the meaning of Quran ${target.ref}?`;
      questions.push(multipleChoice(prompt, target.text, distractors, `Quran ${target.ref}: ${target.text}`));
    }
  }
  // Surah notes link every ayah's tafsir; the surah page is the one source worth showing.
  const urls = facts.number ? [`${name} https://quran.com/${facts.number}`] : note.urls.slice(0, 1);
  return {
    title: name,
    content: [summary, ...ayahs.slice(0, 7).map((ayah) => `${ayah.ref} ${ayah.text}`)].filter(Boolean).join("\n"),
    extras: {},
    questions,
    sourceUrls: urls,
    sortKey: facts.number
  };
}

// English text of a hadith note: the prose that isn't Arabic, the reference line or the chapter line.
function hadithText(note) {
  return bodyProse(note.body)
    .split("\n")
    .filter((line) => !/^(sahih|sunan|jami|musnad|riyad|al-adab|muwatta)/i.test(line) && !/^chapter\s/i.test(line) && !/^book\s/i.test(line))
    .join(" ")
    .trim();
}

function hadithLesson(note, pools) {
  const reference = cleanText(String(note.data.aliases?.[0] ?? `${note.data.collection ?? ""} ${note.data.reference ?? ""}`)).trim() || noteName(note.data, note.fileName);
  const text = hadithText(note);
  const saying = /said:\s*(.+)$/i.exec(text)?.[1] ?? text;
  const short = saying.length > 220 ? `${saying.slice(0, 217).replace(/\s+\S*$/, "")}...` : saying;
  const questions = [];
  const distractors = pickDistractors(short, pools.hadith.saying, `${reference}:saying`);
  if (short && distractors.length >= 2) {
    questions.push(multipleChoice(`Which narration is recorded in ${reference}?`, short, distractors, text));
  }
  const collection = cleanText(String(note.data.collection ?? ""));
  const collectionDistractors = pickDistractors(collection, pools.hadith.collection, `${reference}:collection`);
  if (collection && collectionDistractors.length >= 2) {
    questions.push(multipleChoice(`Which collection records the hadith: "${short}"`, collection, collectionDistractors, `${reference}.`));
  }
  return {
    title: reference,
    content: text,
    extras: {},
    questions,
    sourceUrls: [...note.urls, ...asList(note.data.source_url).map((url) => `${reference} ${url}`)]
  };
}

function shortSaying(note) {
  const text = hadithText(note);
  const saying = /said:\s*(.+)$/i.exec(text)?.[1] ?? text;
  return saying.length > 220 ? `${saying.slice(0, 217).replace(/\s+\S*$/, "")}...` : saying;
}

function buildPools(notes) {
  const person = {};
  for (const fact of PERSON_FACTS) person[fact.key] = notes.filter((note) => note.kind === "person").map((note) => factText(note.data[fact.key])).filter(Boolean);
  const surahs = notes.filter((note) => note.kind === "surah").map(surahFacts);
  const hadiths = notes.filter((note) => note.kind === "hadith");
  return {
    person,
    surah: {
      englishName: surahs.map((facts) => facts.englishName).filter(Boolean),
      ayahCount: surahs.map((facts) => (facts.ayahCount ? String(facts.ayahCount) : "")).filter(Boolean)
    },
    hadith: {
      saying: hadiths.map(shortSaying).filter(Boolean),
      collection: [...hadiths.map((note) => cleanText(String(note.data.collection ?? ""))), "Sahih al-Bukhari", "Sahih Muslim", "Sunan Abi Dawud", "Jami at-Tirmidhi", "Sunan an-Nasa'i"].filter(Boolean)
    }
  };
}

const GROUP_TITLES = {
  person: { sahabah: "Companions from your notes", prophets: "Prophets from your notes", women_of_the_book: "Mothers of the believers from your notes" },
  surah: "Surahs",
  hadith: "Hadith from your notes"
};

const GROUP_DESCRIPTIONS = {
  person: "Lessons built from your notes on each person: their tribe, family, what they are known for and how their life ended.",
  surah: "Surah-by-surah lessons from your Quran notes: names, meanings, where they were revealed and their ayahs.",
  hadith: "Narrations from your hadith notes, with their references."
};

// Turns all structured notes into note-like branch objects that lib.buildBranch understands.
export function buildFactBranches(notes, { groupSize = 10 } = {}) {
  const pools = buildPools(notes);
  const groups = new Map();
  for (const note of notes) {
    const key = `${note.topicId}|${note.kind}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(note);
  }

  const branches = [];
  for (const [key, members] of groups) {
    const [topicId, kind] = key.split("|");
    const build = kind === "person" ? personLesson : kind === "surah" ? surahLesson : hadithLesson;
    const lessons = members.map((note) => ({ ...build(note, pools), relPath: note.relPath }));
    lessons.sort((left, right) => (left.sortKey ?? Infinity) - (right.sortKey ?? Infinity) || left.title.localeCompare(right.title));

    for (let start = 0; start < lessons.length; start += groupSize) {
      const chunk = lessons.slice(start, start + groupSize);
      const base = kind === "person" ? GROUP_TITLES.person[topicId] ?? "People from your notes" : GROUP_TITLES[kind];
      const title =
        kind === "surah" && chunk[0].sortKey && chunk[chunk.length - 1].sortKey
          ? `${base} ${chunk[0].sortKey}-${chunk[chunk.length - 1].sortKey}`
          : lessons.length > groupSize
            ? `${base} ${start / groupSize + 1}`
            : base;
      branches.push({
        skipped: false,
        warnings: [],
        topicId,
        title,
        description: GROUP_DESCRIPTIONS[kind],
        noteSources: [],
        lessons: chunk,
        allowNoQuestions: true
      });
    }
  }
  return branches;
}
