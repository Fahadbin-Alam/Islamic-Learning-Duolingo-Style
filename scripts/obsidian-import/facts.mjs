// Builds lessons from structured notes (frontmatter "type: person | surah | hadith"), which carry
// facts in properties rather than written Q:/A: lines. Questions are generated from those facts,
// with wrong choices drawn from the same fact on other notes of the same type.
// Every lesson shows a short line and a few facts on its learn card, and asks only about what it shows.
import {
  ADULT_FACTS,
  DISPLAY_NAMES,
  DISPUTED_REVELATION,
  HADITH_LESSONS,
  LEARN_LINES,
  LEFT_OUT_HADITH,
  LEFT_OUT_PEOPLE,
  NO_WHO_QUESTION,
  REPEATED_HADITH,
  SURAH_MEANINGS,
  SURAH_NAMED_AFTER,
  UNSURE_FACTS,
  UNSURE_FACTS_BY_TOPIC
} from "./curated.mjs";
import { cleanText, extractQuestions, resolveTopic, slugify } from "./lib.mjs";

export const FACT_TYPES = ["person", "surah", "hadith"];

// byTopic: wrong choices come from people in the same topic (a companion's tribe shouldn't be
// confused with a prophet's people).
export const PERSON_FACTS = [
  { key: "known_for", prompt: (name) => `What is ${name} known for?`, explain: (name, value) => `${name}: ${value}.`, byTopic: true },
  { key: "father", prompt: (name) => `Who was the father of ${name}?`, explain: (name, value) => `The father of ${name} was ${value}.`, byTopic: true },
  { key: "mother", prompt: (name) => `Who was the mother of ${name}?`, explain: (name, value) => `The mother of ${name} was ${value}.`, byTopic: true },
  { key: "tribe", prompt: (name) => `Which tribe was ${name} from?`, explain: (name, value) => `${name} was from ${value}.`, byTopic: true },
  { key: "clan", prompt: (name) => `Which clan did ${name} belong to?`, explain: (name, value) => `${name} belonged to ${value}.`, byTopic: true },
  { key: "died", prompt: (name) => `When did ${name} pass away?`, explain: (name, value) => `${name} passed away in ${value}.`, byTopic: true },
  { key: "birth_place", prompt: (name) => `Where was ${name} born?`, explain: (name, value) => `${name} was born in ${value}.` },
  { key: "death_place", prompt: (name) => `Where did ${name} pass away?`, explain: (name, value) => `${name} passed away ${placeWord(value)} ${value}.` },
  { key: "burial_place", prompt: (name) => `Where is ${name} buried?`, explain: (name, value) => `${name} is buried at ${value}.` }
];

// The facts a person's learn card can show as chips, in the order they are picked. The lesson asks about
// these chips, so a chip and its question always say the same thing.
const CHIP_FACTS = [
  { key: "father", chip: (value) => `Father: ${value}` },
  { key: "mother", chip: (value) => `Mother: ${value}` },
  { key: "tribe", chip: (value) => `Tribe: ${value}` },
  { key: "clan", chip: (value) => `Clan: ${value}` },
  { key: "birth_place", chip: (value) => `Born in ${value}` },
  { key: "death_place", chip: (value) => `Passed away ${placeWord(value)} ${value}` }
];

// "Passed away at Mount Uhud", "Passed away in Madinah".
function placeWord(place) {
  return /^(Mount|Battle|Cave)\b/.test(place) ? "at" : "in";
}

// A wrong choice must really be wrong. Quraysh and Ghifar are branches of Kinanah, Banu al-Mustaliq of
// Khuza'a and Banu Umayya of Banu Abd Shams; Uhud is in Madinah, and Syria (al-Sham) holds Palestine and
// Jordan. A place or tribe is never offered against one that contains it, or the other way round.
const CONTAINS = {
  Kinanah: ["Quraysh", "Ghifar"],
  "Khuza'a": ["Banu Mustaliq", "Banu al-Mustaliq"],
  "Banu Abd Shams": ["Banu Umayya"],
  Madinah: ["Mount Uhud"],
  Syria: ["Homs", "Damascus", "Siffin", "Yarmuk", "Palestine", "Canaan", "Jerusalem", "Hebron", "Amwas", "Jordan", "Mu'tah", "Machaerus"],
  Palestine: ["Canaan", "Jerusalem", "Hebron", "Amwas"],
  Canaan: ["Palestine", "Jerusalem", "Hebron", "Amwas"],
  Jordan: ["Mu'tah", "Machaerus"],
  Egypt: ["Cairo"]
};

function overlapping(left, right) {
  return Boolean(CONTAINS[left]?.includes(right) || CONTAINS[right]?.includes(left));
}

// Lines about something many people share (an early Muslim, a martyr, an emigrant to Abyssinia) can be
// true of the person asked about, so they are never wrong choices.
const SHARED_TRAIT = /\b(abyssinia|early muslim|first (muslims|people|to accept)|accept(ed)? islam|became muslim|martyr\w*|patient|hadiths|badr|uhud)\b/i;

// A lesson about one person stays short: two or three questions a young learner can answer from the card.
export const MAX_PERSON_QUESTIONS = 3;
export const MAX_LEARN_FACTS = 3;
// A chip is a few words ("Father: Umar ibn al-Khattab"), never a sentence.
export const MAX_CHIP_WORDS = 5;
// The mascot's line on the learn card.
export const MAX_LINE_WORDS = 12;
// Answer tiles stay short enough to read at a glance on a phone.
export const MAX_CHOICE_LENGTH = 90;

// Words that keep a text out of a children's quiz, as a question, a choice or a learn-card quote.
export const ADULT_TEXT = /\b(fornicat|adulter|concubine|harlot|whore|lewd|incest|sodom(?!\b)|lust|sexual|intercourse|private parts|menstrua|genital|unchast|naked|nudity)\w*/i;
// Violence a narration may tell in passing ("permit me that I should strike his neck", "no good for you to kill
// him") or a frightening picture ("he is one-eyed"): a lesson that carries such a narration keeps only the words
// its card shows, and the whole narration stays in the vault and on Sunnah.com.
export const FRIGHTENING_TEXT = /\b(kill\w*|slay\w*|slain|murder\w*|behead\w*|slaughter\w*|tortur\w*|stab\w*|blood\w*|one-eyed|strike (?:off )?(?:his|her|their|your) necks?)\b/i;
// Wrong choices also stay away from frightening or adult topics, which belong only in their own lessons.
const UNSAFE_DISTRACTOR = /\b(wives|dajjal|iblis|tortur\w*|kill\w*|hurt\w*|slander|ifk|karbala|yazid)\b/i;
// "Ha. Mim.", "Alif. Lam. Mim.": the opening letters say nothing a child could choose between.
const LETTERS_ONLY = /^(?:(?:[A-Z][a-z']{0,4}\.\s*){1,5}|(?:(?:Alif|Lam|Mim|Ra|Sad|Kaf|Ha|Ya|'?Ain|Ta|Sin|Qaf|Nun)\b[.,]?\s*)+)$/i;

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

function wordCount(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

const STOP_WORDS = new Set(["the", "and", "with", "from", "that", "this", "surah", "allah", "prophet", "abu", "ibn", "bint", "umm", "near", "sahih", "sunan", "jami", "banu", "bani", "was", "were", "his", "her", "who"]);

function significantWords(text) {
  return slugify(text)
    .split("-")
    .filter((word) => /^\d+$/.test(word) || (word.length >= 4 && !STOP_WORDS.has(word)));
}

// How a value is written ("Banu ...", "c. 40 AH", a plain name), so wrong choices look like the answer.
function valueShape(value) {
  const first = value.trim().split(/\s+/)[0].toLowerCase();
  if (["banu", "bani", "c.", "the", "al", "an", "as", "at"].includes(first)) return first;
  if (/^a[lnstdrz]{1,2}-/.test(first)) return "al-";
  return /\d/.test(value) ? "number" : "";
}

// Picks up to `count` wrong choices from `pool` that can't be confused with `answer`,
// preferring ones written the same way so the answer doesn't stand out.
export function pickDistractors(answer, pool, seed, count = 3) {
  const answerKey = answer.toLowerCase();
  const answerWords = significantWords(answer);
  const shape = valueShape(answer);
  const candidates = [...new Set(pool)].filter(
    (value) => value && value.toLowerCase() !== answerKey && !significantWords(value).some((word) => answerWords.includes(word))
  );
  candidates.sort();
  const sameShape = candidates.filter((value) => valueShape(value) === shape);
  if (sameShape.length >= count) candidates.splice(0, candidates.length, ...sameShape);
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

function trueFalse(statement, isTrue, explanation) {
  return {
    prompt: statement,
    options: [
      { label: "True", correct: isTrue },
      { label: "False", correct: !isTrue }
    ],
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

// "Khadijah bint khuwaylid" and "Dhu al-kifl" are names typed quickly: each part of a name starts with a capital.
export function properName(name) {
  return name
    .replace(/\b(ibn|bint|bin|b\.) ([a-z])(?![a-z]*-)/g, (_, link, letter) => `${link} ${letter.toUpperCase()}`)
    .replace(/\b(al|as|ad|adh|an|ar|ash|at|ath|az)-([a-z])/gi, (_, article, letter) => `${article}-${letter.toUpperCase()}`);
}

const SUN_LETTERS = /\b([Aa])l-(Th|Sh|Dh|T|D|R|Z|S|N)(?=[a-z'])/g;

// Names that end in a ta marbuta are written with a final h, as the rest of the app writes them ("Fatimah",
// "Safiyyah", "Umayyah"), so a chip never says "Fatima" under a title that says "Fatimah". Only these names:
// "Asma", "Isa" and "al-Uzza" end in a long a and keep it.
const TA_MARBUTA = new RegExp(
  `\\b(${[
    "Fatima", "Safiyya", "Umayma", "Umayya", "Thumama", "Sumayya", "Lubaba", "Khuzayma", "Mughira", "Tha'laba",
    "Zurara", "Utba", "Urwa", "Uqba", "Ubada", "Rifa'a", "Rawaha", "Ramla", "Rabi'a", "Quhafa", "Natila", "Nasiba",
    "Harmala", "Hantama", "Fakhita", "Amra", "Sa'ida", "Najjariyya", "Nabigha", "Zuhra", "Hala", "Mukharriba",
    "Khawla", "Juwayriya", "Maymuna", "Sawda", "Hafsa", "Aisha", "Halima", "Ruqayya", "Khadija", "Umama", "Za'ida", "Salama"
  ].join("|")})(?![\\w'])`,
  "g"
);

// Simple English transliteration, the way the rest of the app spells names: "Salmaan Al-Faarisiy" is
// "Salman al-Farisi", "'Abd Allah Ibn Mas'uud" is "Abdullah ibn Mas'ud", "Fatimah al-Zahra" is "Fatimah az-Zahra".
export function plainName(name) {
  return properName(name.replace(/[ʽʻ]/g, "'"))
    .replace(/\bb\. /g, "ibn ")
    .replace(/(\S\s)(Ibn|Bint)\b/g, (_, before, link) => `${before}${link.toLowerCase()}`)
    .replace(/(^|\s)['‘’`]([A-Za-z])/g, "$1$2")
    .replace(/\bAbd Allah\b/g, "Abdullah")
    .replace(/\bAbdul[- ]([A-Z])/g, "Abd al-$1")
    .replace(/oo/g, "u")
    .replace(/([aiu])\1/gi, "$1")
    .replace(/iy\b/g, "i")
    .replace(/(\s)Al[- ](?=[A-Z'])/g, "$1al-")
    .replace(/^Al (?=[A-Z])/, "Al-")
    .replace(SUN_LETTERS, (_, a, letter) => `${a}${letter.toLowerCase()}-${letter}`)
    .replace(TA_MARBUTA, "$1h")
    .replace(/\s+/g, " ")
    .trim();
}

/** The one spelling the app shows for a person: a hand-checked name if there is one, else plainName. */
export function displayName(name) {
  return DISPLAY_NAMES[slugify(name)] ?? plainName(name);
}

// Typing slips in names that only the note's author can fix: "Salmaan" (doubled vowels) and "'Lyaash"
// (a lowercase L typed for I or 'A; no Arabic name starts with L and then a consonant).
export const DOUBLED_VOWEL = /aa|ii|uu|oo/i;
export const L_FOR_I = /(^|[\s'‘’(-])[lL](?![aeiouAEIOU\s'’-])[a-zA-Z]/;

// The name after a person's first ibn or bint is their father's, so both are spelled the same way: "Abu al-As ibn
// ar-Rabi'" is the son of "Ar-Rabi' ibn Abd al-Uzza", and "Khalid ibn al-Walid" of "Al-Walid ibn al-Mughirah".
// Only the capital of the first letter may differ. After ibn, Abu is Abi ("Ali ibn Abi Talib", son of "Abu Talib"),
// and the name can be a forefather's ("Abu Ubaydah ibn al-Jarrah", son of "Abdullah ibn al-Jarrah"). Returns the
// spelling the father's name should have, when it is spelled another way.
const NAME_WITH_NEXT_WORD = /^(Abi|Abu|Abd|Umm|Dhi)$/;

export function fatherSpellingMismatch(name, father) {
  if (!father) return undefined;
  const words = name.replace(/\s*ﷺ/g, "").trim().split(/\s+/);
  const link = words.findIndex((word) => word === "ibn" || word === "bint");
  if (link < 0 || !words[link + 1]) return undefined;
  const named = (NAME_WITH_NEXT_WORD.test(words[link + 1]) && words[link + 2] ? words.slice(link + 1, link + 3) : [words[link + 1]]).join(" ").replace(/^Abi\b/, "Abu");
  const lowerFirst = (text) => `${text.charAt(0).toLowerCase()}${text.slice(1)}`;
  const escaped = lowerFirst(named).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const spelledSame = new RegExp(`^${escaped}(?=\\s|$)|(?:^|\\s)ibn ${escaped}(?=\\s|$)`).test(lowerFirst(father.replace(/\s*ﷺ/g, "").trim()));
  return spelledSame ? undefined : `${named.charAt(0).toUpperCase()}${named.slice(1)}`;
}

export function nameWarnings(raw, shown) {
  const warnings = [];
  if (DOUBLED_VOWEL.test(raw)) warnings.push(`"${raw}" has a doubled vowel; shown as "${shown}". Use the simple spelling in the note`);
  if (L_FOR_I.test(raw)) warnings.push(`"${raw}" looks like it has an l typed for I or 'A; shown as "${shown}". Check the spelling in the note`);
  return warnings;
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

// ---------------------------------------------------------------- people

// A fact as a chip and an answer: no "(father of Musa)" asides, names spelled the app's way, and nothing
// the note itself is unsure of ("Makkah or Kufa", "Possibly ...").
function chipValue(key, value) {
  if (!value || /\b(or|possibly|claimed|disputed|unknown)\b/i.test(value) || value.includes(",")) return undefined;
  const plain = value.replace(/\s*\([^)]*\)/g, "").trim();
  return ["father", "mother", "tribe", "clan"].includes(key) ? displayName(plain) : plain;
}

// The line's first word decides ("He brought Aishah back when she was left behind" is about a man), then the
// name, then any pronoun.
function personGender(note, line) {
  const gender = String(note.data.gender ?? "").toLowerCase();
  if (gender === "male" || gender === "female") return gender;
  if (/^(he|his)\b/i.test(line ?? "")) return "male";
  if (/^(she|her)\b/i.test(line ?? "")) return "female";
  if (/\b(bint|umm)\b/i.test(noteName(note.data, note.fileName)) || note.topicId === "women_of_the_book") return "female";
  if (/\b(she|her)\b/i.test(line ?? "")) return "female";
  return "male";
}

// The learn card's line: the note's learn_line:, a hand-checked line, or its known_for when that is already
// a short plain sentence.
function personLine(note, rawName, knownFor) {
  const own = cleanText(String(note.data.learn_line ?? ""));
  if (own) return own;
  const curated = LEARN_LINES[slugify(rawName)];
  if (curated) return curated;
  const plain = (knownFor ?? "").replace(/[.\s]+$/, "");
  return plain && !/[;()]/.test(plain) && wordCount(plain) <= MAX_LINE_WORDS ? `${plain.charAt(0).toUpperCase()}${plain.slice(1)}.` : undefined;
}

// "He was the first prophet." about Adam reads as "Adam was the first prophet." in a Why? line.
function aboutName(line, name) {
  if (/^(He|She)\b/.test(line)) return line.replace(/^(He|She)\b/, name);
  if (/^(His|Her)\b/.test(line)) return line.replace(/^(His|Her)\b/, `${name}'s`);
  return `${name}: ${line}`;
}

// "He built the Ark." becomes "Who built the Ark?"; a line that doesn't start with He or She is quoted.
function whoPrompt(line) {
  const question = line.replace(/[.!]+$/, "?");
  if (/^(He|She)\s/.test(question)) return question.replace(/^(He|She)\s/, "Who ");
  if (/^(His|Her)\s/.test(question)) return question.replace(/^(His|Her)\s/, "Whose ");
  return `Who is this? ${line}`;
}

// "The wife of Imran" names a woman by who she was married to, so inside a sentence she is "the wife of Imran" and
// at its start "The wife of Imran". Other names are written as they are.
const DESCRIBED_BY_FAMILY = /^(?:the\s+)?(wife|mother|daughter|son|sister|brother|grandmother|grandfather) of\b/i;

export function nameInSentence(name) {
  return DESCRIBED_BY_FAMILY.test(name) ? `the ${name.replace(/^the\s+/i, "").charAt(0).toLowerCase()}${name.replace(/^the\s+/i, "").slice(1)}` : name;
}

function nameAtStart(name) {
  const spoken = nameInSentence(name);
  return `${spoken.charAt(0).toUpperCase()}${spoken.slice(1)}`;
}

function startCapital(text) {
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}

// True when a text names the person ("He looked after Maryam and was the father of Yahya." names Yahya), so it
// is never a wrong choice in their own lesson.
function namesPerson(text, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^\\p{L}'])${escaped}(?![\\p{L}])`, "iu").test(text);
}

function personFacts(note) {
  return Object.fromEntries(PERSON_FACTS.map(({ key }) => [key, factText(note.data[key])]));
}

// Everything the lessons of one person need, worked out once so other people's lessons can borrow it
// for wrong choices.
function personProfile(note) {
  const rawName = properName(noteName(note.data, note.fileName));
  const name = displayName(rawName);
  const facts = personFacts(note);
  const slug = slugify(rawName);
  const byTopic = UNSURE_FACTS_BY_TOPIC[note.topicId];
  // A known_for that tells of violence ("tortured for Islam", "killed at Siffin") stays off a child's lesson, even
  // in its stored summary: the hand-checked line takes its place, as for a fact for older learners.
  const violent = facts.known_for && FRIGHTENING_TEXT.test(facts.known_for) ? ["known_for"] : [];
  const unsure = [...(UNSURE_FACTS[slug] ?? []), ...(ADULT_FACTS[slug] ?? []), ...violent, ...(byTopic && !byTopic.except.includes(slug) ? byTopic.facts : [])];
  for (const key of unsure) delete facts[key];
  const line = personLine(note, rawName, facts.known_for);
  const chips = Object.fromEntries(CHIP_FACTS.map(({ key }) => [key, chipValue(key, facts[key])]));
  // Lessons are put in order by the name exactly as the note types it ("ʿAbd Allāh ibn ʿAbbās" sorts after
  // "Zubayr"), as the first import did, so a spelling fix here never moves a lesson to another unit.
  const sortName = String(note.data.title ?? note.fileName.replace(/^\d+\s*-\s*/, "")).trim();
  // label: the name as an answer tile or at the start of a sentence ("The wife of Imran").
  return { note, rawName, sortName, name, label: nameAtStart(name), facts, line, chips, gender: personGender(note, line), leftOut: LEFT_OUT_PEOPLE.has(slug), unsure };
}

function personLesson(profile, pools) {
  const { note, rawName, name, label, facts, line } = profile;
  const spoken = nameInSentence(name);
  const shown = (key, value) => (["father", "mother", "tribe", "clan"].includes(key) && value ? displayName(value) : value);
  const fullName = note.data.full_name && cleanText(String(note.data.full_name));
  const fatherSpelling = profile.leftOut ? undefined : fatherSpellingMismatch(name, profile.chips.father);
  // The lesson text is the person's facts only. A note's own study text (lists, asides, typos) stays in the vault.
  // When the note's known_for was left out as unsure, the hand-checked line stands in for it.
  const knownFor = facts.known_for ?? (profile.unsure.includes("known_for") ? line : undefined);
  const summary = [
    knownFor ? `${knownFor.charAt(0).toUpperCase()}${knownFor.slice(1).replace(/[.\s]+$/, "")}.` : "",
    fullName && fullName !== rawName && fullName !== name ? `Full name: ${fullName}.` : "",
    facts.tribe ? `Tribe: ${shown("tribe", facts.tribe)}${facts.clan ? `, clan of ${shown("clan", facts.clan)}` : ""}.` : facts.clan ? `Clan: ${shown("clan", facts.clan)}.` : "",
    facts.father ? `Father: ${shown("father", facts.father)}.` : "",
    facts.birth_place ? `Born in ${facts.birth_place}.` : "",
    facts.died
      ? `Passed away ${/^(in|during|at|before|after|around)\b/i.test(facts.died) ? "" : "in "}${facts.died}${facts.death_place ? ` at ${facts.death_place}` : ""}.`
      : facts.death_place
        ? `Passed away at ${facts.death_place}.`
        : ""
  ]
    .filter(Boolean)
    .join(" ");

  // The chips are asked first: a father or a tribe has one right answer. Another person's line can be
  // true of this person too ("one of the first to accept Islam"), so lines are asked only when there are
  // too few chips, against lines that share no word with this one.
  const others = (pools.people[note.topicId] ?? []).filter(
    (other) =>
      other.rawName !== rawName &&
      !other.leftOut &&
      other.gender === profile.gender &&
      other.line &&
      !UNSAFE_DISTRACTOR.test(other.line) &&
      other.line.length <= MAX_CHOICE_LENGTH &&
      !SHARED_TRAIT.test(other.line) &&
      !namesPerson(other.line, name) &&
      !significantWords(other.line).some((word) => significantWords(line ?? "").includes(word))
  );
  const questions = [];
  const learnFacts = [];
  for (const { key, chip } of CHIP_FACTS) {
    const value = profile.chips[key];
    // "Mother: the wife of Imran" on the chip, "The wife of Imran" on the answer tile.
    const inSentence = nameInSentence(value);
    if (!value || learnFacts.length >= MAX_LEARN_FACTS || wordCount(chip(inSentence)) > MAX_CHIP_WORDS) continue;
    learnFacts.push(chip(inSentence));
    const fact = PERSON_FACTS.find((each) => each.key === key);
    const seed = `${rawName}:${key}`;
    const safe = (pool) => (pool ?? []).filter((each) => !each.includes("ﷺ") && !UNSAFE_DISTRACTOR.test(each) && !overlapping(each, value));
    let distractors = pickDistractors(value, safe(pools.chipsByTopic[note.topicId]?.[key]), seed);
    if (distractors.length < 2) distractors = pickDistractors(value, safe(pools.chips[key]), seed);
    if (distractors.length >= 2 && questions.length < MAX_PERSON_QUESTIONS) questions.push(multipleChoice(fact.prompt(spoken), value, distractors, startCapital(fact.explain(spoken, inSentence))));
  }

  if (line && line.length <= MAX_CHOICE_LENGTH && questions.length < 2) {
    const lines = pickDistractors(line, others.map((other) => other.line), `${rawName}:line`);
    if (lines.length >= 2) questions.unshift(multipleChoice(`What is ${spoken} known for?`, line, lines, aboutName(line, label)));
  }
  if (line && questions.length < 2 && NO_WHO_QUESTION.has(slugify(rawName))) {
    questions.push(trueFalse(aboutName(line, label), true, aboutName(line, label)));
  } else if (line && questions.length < 2) {
    // A name the line itself says is no wrong choice ("Who ... was the father of Yahya?" never offers Yahya).
    const pool = others.filter((other) => !namesPerson(line, other.name)).map((other) => other.label);
    const names = pickDistractors(label, pool, `${rawName}:who`);
    if (names.length >= 2) questions.push(multipleChoice(whoPrompt(line), label, names, aboutName(line, label)));
  }

  return {
    title: name,
    idSlug: slugify(rawName),
    sortName: profile.sortName,
    leftOut: profile.leftOut,
    content: summary,
    extras: facts.known_for ? { keyTakeaway: `${name}: ${facts.known_for.replace(/[.\s]+$/, "")}.` } : {},
    learnLine: line,
    learnFacts,
    questions: questions.slice(0, MAX_PERSON_QUESTIONS),
    sourceUrls: note.urls,
    warnings: [
      ...nameWarnings(rawName, name),
      ...(fatherSpelling
        ? [`${rawName}: the father is shown as "${profile.chips.father}" but "${name}" spells him "${fatherSpelling}"; give one spelling in DISPLAY_NAMES in curated.mjs`]
        : []),
      ...(line ? [] : [`${rawName}: no learn line; add learn_line: (12 words or fewer) to the note`])
    ]
  };
}

// ---------------------------------------------------------------- surahs

function surahNumber(note) {
  const fromData = Number(data(note).number ?? data(note).surah_number);
  if (Number.isInteger(fromData) && fromData > 0) return fromData;
  const match = /^(\d+)/.exec(note.fileName) ?? /Quran (\d+):/.exec(note.body);
  return match ? Number(match[1]) : undefined;
}

function data(note) {
  return { ...note.labels, ...note.data };
}

// A surah's meaning is written in title case, as every other one is ("The Smoke", "The Mansions of the Stars"): a
// note's "The Small kindnesses" or "Those who drag forth" is a slip. Each word starts with a capital, except the
// small words below after the first; a capital the note already has is kept.
export const TITLE_SMALL_WORDS = new Set(["a", "an", "the", "and", "but", "or", "nor", "of", "in", "on", "at", "to", "by", "for", "from", "with", "as"]);

export function titleCase(text) {
  return text.replace(/(^|\s)(\p{Ll})([\p{L}'’-]*)/gu, (match, space, letter, rest, offset) =>
    offset > 0 && TITLE_SMALL_WORDS.has(`${letter}${rest}`) ? match : `${space}${letter.toUpperCase()}${rest}`
  );
}

function surahFacts(note) {
  const fields = data(note);
  const pick = (...keys) => keys.map((key) => fields[key]).find((value) => value !== undefined && value !== "");
  const place = String(pick("revelation_place", "place_of_revelation", "revealed", "revelation", "type_of_revelation") ?? "");
  const number = surahNumber(note);
  return {
    number,
    // 'The Letter "Saad"': quotes inside the name would break the "means" line.
    englishName: SURAH_MEANINGS[number] ?? titleCase(cleanText(String(pick("english_name", "english", "translation", "meaning", "name_meaning") ?? "")).replace(/["“”]/g, "")),
    ayahCount: Number(pick("ayah_count", "ayahs", "verses", "number_of_ayahs", "number_of_verses", "total_ayahs")) || undefined,
    // A surah the scholars disagree on is never said to be Makkan or Madinan.
    place: DISPUTED_REVELATION.has(number) ? undefined : /mak|mec/i.test(place) ? "Makkah" : /mad|med/i.test(place) ? "Madinah" : undefined
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

// Old English of the notes' translation ("Woe unto every slandering traducer", "He thinketh"): a child
// cannot read it, so such an ayah stays out of the lesson text.
const ARCHAIC = /\b(thee|thou|thy|thine|unto|hath|hast|ye|lo|doth|dost|shalt|wilt|verily|nay|\w{3,}eth)\b/i;
// Ayahs that frighten a young child when read alone, away from what comes before and after.
const FRIGHTENING_AYAH = /\b(slain|slay|slaughter|kill\w*|curse\w*|accursed|torment\w*|hell|doom)\b/i;
// The quote and the ayah question come from a surah's opening, where children start learning it; an ayah
// from the middle of a long surah means little on its own.
const OPENING_AYAHS = 10;

// An ayah a child can read on a tile: short, not only the opening letters, nothing for adults only and
// nothing frightening.
function quizAyah(ayah) {
  return ayah.text.length <= MAX_CHOICE_LENGTH && !LETTERS_ONLY.test(ayah.text) && !ADULT_TEXT.test(ayah.text) && !FRIGHTENING_AYAH.test(ayah.text);
}

function ayahNumber(ayah) {
  return Number(ayah.ref.split(":")[1]);
}

function surahLesson(note, pools) {
  const facts = surahFacts(note);
  const noted = noteName(note.data, note.fileName);
  // "Surah Ad-Duhaa" is shown "Surah Ad-Duha"; the id keeps the note's spelling.
  const name = noted.replace(/oo/g, "u").replace(/([aiu])\1/gi, "$1");
  const ayahs = surahAyahs(note.body);
  const namedAfter = SURAH_NAMED_AFTER[facts.number];
  const summary = [
    namedAfter ? `${name} is named after ${namedAfter}.` : facts.englishName ? `${name} means "${facts.englishName}".` : "",
    facts.place ? `It was revealed in ${facts.place}.` : "",
    facts.ayahCount ? `It has ${facts.ayahCount} ayahs.` : ""
  ]
    .filter(Boolean)
    .join(" ");

  // The learn card shows the surah's first ayah (the one after any opening letters), when it is short and
  // fit for a child; a later ayah alone is often half a sentence. The app shows it in Arabic, from
  // src/data/quranAyahs.ts: the old English of the notes ("Woe unto every slandering traducer") is too hard
  // for a child, so it is never asked about either.
  const readable = ayahs.filter((ayah) => ayahNumber(ayah) <= OPENING_AYAHS && quizAyah(ayah));
  const first = ayahs.find((ayah) => !LETTERS_ONLY.test(ayah.text));
  const quoted = first && readable.includes(first) ? first : undefined;

  const questions = [];
  if (facts.englishName && !namedAfter && facts.englishName.length <= MAX_CHOICE_LENGTH) {
    const distractors = pickDistractors(facts.englishName, pools.surah.englishName.filter((value) => value.length <= MAX_CHOICE_LENGTH), `${name}:english`);
    if (distractors.length >= 2) questions.push(multipleChoice(`What does the name ${name} mean?`, facts.englishName, distractors, summary));
  }
  if (facts.place) {
    const stated = hashCode(`${name}:place`) % 2 === 0 ? facts.place : facts.place === "Makkah" ? "Madinah" : "Makkah";
    questions.push(trueFalse(`${name} was revealed in ${stated}.`, stated === facts.place, `${name} was revealed in ${facts.place}.`));
  }
  if (facts.ayahCount) {
    // Wrong counts near the right one, so a short surah's count is not the only small number.
    const near = [...new Set(pools.surah.ayahCount)]
      .filter((value) => value !== String(facts.ayahCount))
      .sort((left, right) => Math.abs(left - facts.ayahCount) - Math.abs(right - facts.ayahCount) || left - right)
      .slice(0, 4);
    const distractors = pickDistractors(String(facts.ayahCount), near, `${name}:ayahs`);
    if (distractors.length >= 2) questions.push(multipleChoice(`How many ayahs does ${name} have?`, String(facts.ayahCount), distractors, summary));
  }
  // Surah notes link every ayah's tafsir; the surah page is the one source worth showing.
  const urls = facts.number ? [`${name} https://quran.com/${facts.number}`] : note.urls.slice(0, 1);
  return {
    title: name,
    idSlug: slugify(noted),
    content: [summary, ...ayahs.filter((ayah) => !ADULT_TEXT.test(ayah.text) && !FRIGHTENING_TEXT.test(ayah.text) && !ARCHAIC.test(ayah.text)).slice(0, 7).map((ayah) => `${ayah.ref} ${ayah.text}`)].filter(Boolean).join("\n"),
    extras: {},
    learnLine: namedAfter ? `${name} is named after ${namedAfter}.` : facts.englishName ? `${name} means "${facts.englishName}".` : undefined,
    learnFacts: [facts.ayahCount ? `${facts.ayahCount} ayahs` : "", facts.place ? `Revealed in ${facts.place}` : ""].filter(Boolean),
    quote: quoted ? { text: quoted.text, reference: `Quran ${quoted.ref}` } : undefined,
    // The learn card's source is the ayah it shows.
    learnSource: quoted ? `Quran ${quoted.ref} https://quran.com/${quoted.ref.replace(":", "/")}` : undefined,
    questions,
    sourceUrls: urls,
    sortKey: facts.number,
    warnings: nameWarnings(noted, name)
  };
}

// ---------------------------------------------------------------- hadith

// Sentences that only cite where a narration is recorded ("Baihaqi transmitted it in ...", "Mishkat al-Masabih 3096").
const HADITH_REFERENCE = /\b(transmitted (it|this|in|by)|Mishkat al-Masabih\s*\d+|reported by (Bukhari|Muslim)|\((Bukhari|Muslim|Tirmidhi|Abu Dawud)[^)]*\))/i;

// English text of a hadith note: the prose that isn't Arabic, a question, the reference line or the chapter line.
function hadithText(body) {
  return bodyProse(body)
    .split("\n")
    .filter((line) => !/^(sahih|sunan|jami|musnad|riyad|al-adab|muwatta|mishkat)/i.test(line) && !/^(chapter|book)\s/i.test(line))
    .join(" ")
    .split(/(?<=[.!?”"])\s+/)
    .filter((sentence) => !HADITH_REFERENCE.test(sentence))
    .join(" ")
    .trim();
}

// The Prophet's words, when they are one short, whole saying ("... said: Words.").
function wholeSaying(text) {
  const saying = (/(?:said|saying)\s*[,:]\s*(.+)$/i.exec(text)?.[1] ?? "").replace(/^["“'‘]+|["”'’]+$/g, "").trim();
  return saying && saying.length <= 280 && /[.!?]$/.test(saying) && !ADULT_TEXT.test(saying) && !/Grade:/i.test(saying) ? saying : undefined;
}

function hadithReference(note) {
  return cleanText(String(note.data.aliases?.[0] ?? `${note.data.collection ?? ""} ${note.data.reference ?? ""}`)).trim() || noteName(note.data, note.fileName);
}

function curatedQuestions(entry) {
  return (entry?.questions ?? []).map((question) =>
    "statement" in question ? trueFalse(question.statement, question.answer, question.explanation) : multipleChoice(question.prompt, question.answer, question.wrong, question.explanation)
  );
}

const squash = (text) => text.replace(/\s+/g, " ").trim();

function hadithLesson(note, pools) {
  const reference = hadithReference(note);
  const curated = HADITH_LESSONS[reference];
  // The lesson's own words come from the note first (lesson_title:, learn_line:, quote:, Q:/A: lines), then
  // from the hand-checked list.
  const { questions: written, prose } = extractQuestions(note.body.split("\n"));
  const text = hadithText(prose);
  const warnings = [];
  const title = cleanText(String(note.data.lesson_title ?? "")) || curated?.title;
  const learnLine = cleanText(String(note.data.learn_line ?? "")) || curated?.learnLine;
  let quote = cleanText(String(note.data.quote ?? "")) || curated?.quote || wholeSaying(text);
  // The quote is shown as the Prophet's words, so it must be in the note word for word.
  if (quote && !squash(text).includes(squash(quote))) {
    warnings.push(`${reference}: the quote is not in the note word for word; left out`);
    quote = undefined;
  }
  // "Grade: Hasan (Darussalam)" goes with the reference as "(Hasan, Darussalam)".
  const grade = /\bGrade:\s*([^.]+?)\s*$/i.exec(text)?.[1]?.replace(/\s*\(([^)]+)\)$/, ", $1");
  // A weak hadith is never taught as the Prophet's ﷺ words; a repeat, or one left out by hand, stays in the vault.
  const weak = /^(da'?if|daif|weak|mawdu)/i.test(grade ?? "");
  if (weak) warnings.push(`${reference}: graded ${grade.split(",")[0]}; left out`);
  const repeats = REPEATED_HADITH[reference];
  const leftOut = weak || LEFT_OUT_HADITH.has(reference) || Boolean(repeats && pools.hadith.references.has(repeats));

  let questions = written.length ? written : curatedQuestions(curated);
  if (!questions.length) {
    // Without written questions only the book can be asked; the learn card shows the reference.
    const collection = cleanText(String(note.data.collection ?? ""));
    const distractors = pickDistractors(collection, pools.hadith.collection, `${reference}:collection`);
    if (collection && distractors.length >= 2) questions = [multipleChoice("Which book records this hadith?", collection, distractors, `${reference}.`)];
  }
  if (!leftOut && (!title || !learnLine || !written.length && !curated)) {
    warnings.push(`${reference}: add lesson_title:, learn_line: and Q:/A: questions about what the hadith teaches`);
  }
  // The learn card's source is the hadith's own page on Sunnah.com.
  const page = [...asList(note.data.source_url), ...note.urls].map(String).map((entry) => /https:\/\/sunnah\.com\/[a-z]+:\w+/.exec(entry)?.[0]).find(Boolean);
  return {
    title: title || reference,
    idSlug: slugify(reference),
    sortName: reference,
    leftOut,
    difficulty: curated?.level ?? (Number.isInteger(Number(note.data.level)) ? Number(note.data.level) : undefined),
    // The whole narration, unless parts of it are for adults only or frightening, or the card shows no quote of it
    // (its translation spells names its own way, "Ghailan b. Salama"); then just what the card shows.
    content: ADULT_TEXT.test(text) || FRIGHTENING_TEXT.test(text) || (!quote && learnLine) ? quote ?? learnLine ?? "" : text,
    extras: {},
    learnLine,
    quote: quote ? { text: quote, reference: grade ? `${reference} (${grade})` : reference } : undefined,
    learnSource: page ? `${reference} ${page}` : undefined,
    questions,
    sourceUrls: [...note.urls, ...asList(note.data.source_url).map((url) => `${reference} ${url}`)],
    warnings
  };
}

// ---------------------------------------------------------------- pools and branches

function buildPools(notes) {
  const profiles = notes.filter((note) => note.kind === "person").map(personProfile);
  // A person left off the path is never another lesson's wrong choice either.
  const chipPool = (members) =>
    Object.fromEntries(CHIP_FACTS.map(({ key }) => [key, members.filter((profile) => !profile.leftOut).map((profile) => profile.chips[key]).filter(Boolean)]));
  const topics = [...new Set(profiles.map((profile) => profile.note.topicId))];
  const surahs = notes.filter((note) => note.kind === "surah").map(surahFacts);
  const hadiths = notes.filter((note) => note.kind === "hadith");
  const hadithReferences = new Set(hadiths.map(hadithReference));
  return {
    profiles: new Map(profiles.map((profile) => [profile.note, profile])),
    chips: chipPool(profiles),
    chipsByTopic: Object.fromEntries(topics.map((topicId) => [topicId, chipPool(profiles.filter((profile) => profile.note.topicId === topicId))])),
    people: Object.fromEntries(topics.map((topicId) => [topicId, profiles.filter((profile) => profile.note.topicId === topicId)])),
    surah: {
      // Only real meanings are offered as wrong choices, never "Ya Sin" or "Hud".
      englishName: surahs.filter((facts) => !SURAH_NAMED_AFTER[facts.number]).map((facts) => facts.englishName).filter(Boolean),
      ayahCount: surahs.map((facts) => (facts.ayahCount ? String(facts.ayahCount) : "")).filter(Boolean)
    },
    hadith: {
      references: hadithReferences,
      collection: [...hadiths.map((note) => cleanText(String(note.data.collection ?? ""))), "Sahih al-Bukhari", "Sahih Muslim", "Sunan Abi Dawud", "Jami at-Tirmidhi", "Sunan an-Nasa'i"].filter(Boolean)
    }
  };
}

// Unit names learners see on the path: short, and true for everyone inside. The women's units hold
// women from the Quran and from early Islam, not only the Mothers of the Believers, so they are "Women".
const GROUP_TITLES = {
  person: { sahabah: "Companions", prophets: "Prophets", women_of_the_book: "Women" },
  surah: "Surahs",
  hadith: "Hadith"
};

// Branch ids still come from the first names these units had, so saved progress keeps matching.
const LEGACY_ID_TITLES = {
  person: { sahabah: "Companions from your notes", prophets: "Prophets from your notes", women_of_the_book: "Mothers of the believers from your notes" },
  surah: "Surahs",
  hadith: "Hadith from your notes"
};

const GROUP_DESCRIPTIONS = {
  person: "Meet each person: what they are known for and their family.",
  surah: "One surah at a time: its name, where it was revealed and its ayahs.",
  hadith: "Sayings of the Prophet ﷺ and what they teach."
};

// Turns all structured notes into note-like branch objects that lib.buildBranch understands.
// Lessons keep the order of their note names (sortName), so a better title never moves a lesson to
// another unit and its saved progress stays with it.
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
    const build = (note) => (kind === "person" ? personLesson(pools.profiles.get(note), pools) : kind === "surah" ? surahLesson(note, pools) : hadithLesson(note, pools));
    const lessons = members.map((note) => ({ ...build(note), relPath: note.relPath }));
    lessons.sort((left, right) => (left.sortKey ?? Infinity) - (right.sortKey ?? Infinity) || (left.sortName ?? left.title).localeCompare(right.sortName ?? right.title));

    // Units are cut before left-out lessons are taken away, so the lessons that stay keep their ids.
    for (let start = 0; start < lessons.length; start += groupSize) {
      const cut = lessons.slice(start, start + groupSize);
      const chunk = cut.filter((lesson) => !lesson.leftOut);
      if (!chunk.length) continue;
      const named = (base) =>
        kind === "surah" && chunk[0].sortKey && chunk[chunk.length - 1].sortKey
          ? `${base} ${chunk[0].sortKey}-${chunk[chunk.length - 1].sortKey}`
          : lessons.length > groupSize
            ? `${base} ${start / groupSize + 1}`
            : base;
      const title = named(kind === "person" ? GROUP_TITLES.person[topicId] ?? "People" : GROUP_TITLES[kind]);
      const legacyTitle = named(kind === "person" ? LEGACY_ID_TITLES.person[topicId] ?? "People from your notes" : LEGACY_ID_TITLES[kind]);
      branches.push({
        skipped: false,
        warnings: cut.flatMap((lesson) => lesson.warnings ?? []),
        topicId,
        title,
        idSlug: slugify(legacyTitle),
        description: GROUP_DESCRIPTIONS[kind],
        noteSources: [],
        lessons: chunk,
        allowNoQuestions: true
      });
    }
  }
  return branches;
}
