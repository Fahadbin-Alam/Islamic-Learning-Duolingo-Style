// Converts a folder of Obsidian markdown notes into the app's lesson format.
// See docs/obsidian-import.md for the note format this understands.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { basename, extname, join, relative, sep } from "node:path";

export const TOPIC_IDS = [
  "foundation",
  "prayer",
  "aqidah",
  "fasting",
  "zakat",
  "hajj",
  "manners",
  "marriage",
  "sahabah",
  "prophets",
  "women_of_the_book",
  "quran_tafseer"
];

// Folder names and frontmatter values people are likely to use, mapped to TopicId.
const TOPIC_ALIASES = {
  sahabah: "sahabah",
  sahaba: "sahabah",
  sahabi: "sahabah",
  sahabis: "sahabah",
  companions: "sahabah",
  quran: "quran_tafseer",
  tafseer: "quran_tafseer",
  tafsir: "quran_tafseer",
  quran_tafseer: "quran_tafseer",
  prophets: "prophets",
  anbiya: "prophets",
  seerah: "prophets",
  manners: "manners",
  adab: "manners",
  akhlaq: "manners",
  prayer: "prayer",
  salah: "prayer",
  salat: "prayer",
  aqidah: "aqidah",
  aqeedah: "aqidah",
  iman: "aqidah",
  fasting: "fasting",
  sawm: "fasting",
  ramadan: "fasting",
  zakat: "zakat",
  hajj: "hajj",
  marriage: "marriage",
  nikah: "marriage",
  women_of_the_book: "women_of_the_book",
  women: "women_of_the_book",
  foundation: "foundation",
  basics: "foundation"
};

// Backend topic slugs differ from the app's TopicId for a few topics.
export const BACKEND_TOPIC_SLUGS = {
  foundation: "foundation",
  prayer: "prayer",
  aqidah: "aqidah",
  fasting: "fasting",
  zakat: "zakat",
  hajj: "hajj",
  manners: "manners",
  marriage: "marriage",
  sahabah: "sahabi",
  prophets: "prophets",
  women_of_the_book: "women-of-the-book",
  quran_tafseer: "quran"
};

export function slugify(value) {
  return String(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function resolveTopic(value) {
  if (!value) return undefined;
  const key = slugify(value).replace(/-/g, "_");
  return TOPIC_ALIASES[key] ?? (TOPIC_IDS.includes(key) ? key : undefined);
}

function parseScalar(raw) {
  const value = raw.trim();
  if (/^".*"$|^'.*'$/.test(value)) return value.slice(1, -1);
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  if (value === "true" || value === "false") return value === "true";
  if (value.startsWith("[") && value.endsWith("]")) {
    return value
      .slice(1, -1)
      .split(",")
      .map((item) => parseScalar(item))
      .filter((item) => item !== "");
  }
  return value;
}

// Parses the small YAML subset Obsidian properties use: scalars, inline lists and "- item" lists.
export function parseFrontmatter(text) {
  const normalized = text.replace(/\r\n?/g, "\n");
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(normalized);
  if (!match) return { data: {}, body: normalized };

  const data = {};
  let listKey;
  for (const line of match[1].split("\n")) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const item = /^\s+-\s+(.*)$/.exec(line) ?? (listKey ? /^-\s+(.*)$/.exec(line) : null);
    if (item && listKey) {
      data[listKey].push(parseScalar(item[1]));
      continue;
    }
    const pair = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (!pair) continue;
    const [, key, value] = pair;
    if (value.trim() === "") {
      data[key] = [];
      listKey = key;
    } else {
      data[key] = parseScalar(value);
      listKey = undefined;
    }
  }
  return { data, body: normalized.slice(match[0].length) };
}

// Strips Obsidian-only syntax so text reads cleanly inside the app.
export function cleanText(text) {
  return text
    .replace(/%%[\s\S]*?%%/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/!\[\[[^\]]*\]\]/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[\[([^\]|#]*)(?:#[^\]|]*)?\|([^\]]+)\]\]/g, "$2")
    .replace(/\[\[([^\]|#]+)(?:#[^\]]*)?\]\]/g, "$1")
    .replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, "$1")
    .replace(/(?:\b(?:see|source|ref)\s*:?\s*)?https?:\/\/[^\s)>\]]+/gi, "")
    .replace(/\^[a-z0-9-]+$/gim, "")
    .replace(/\[\^[^\]]+\]/g, "")
    .replace(/==([^=]+)==/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/(^|[\s(])\*([^*\n]+)\*/g, "$1$2")
    .replace(/(^|[\s(])_([^_\n]+)_/g, "$1$2")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/(^|\s)#[A-Za-z][\w/-]*/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/ *\n */g, "\n")
    .trim();
}

function firstSentence(text) {
  const flat = text.replace(/\s+/g, " ").trim();
  const match = /^(.+?[.!?])(\s|$)/.exec(flat);
  return (match ? match[1] : flat).trim();
}

const SOURCE_SITES = [
  { pattern: /(^|\.)quran\.com$/, site: "Quran.com", category: "tafsir", grade: "Quran" },
  { pattern: /(^|\.)sunnah\.com$/, site: "Sunnah.com", category: "hadith", grade: "See Sunnah.com grading" },
  { pattern: /(^|\.)(youtube\.com|youtu\.be)$/, site: "YouTube", category: "video", grade: "Visual walkthrough" },
  { pattern: /(^|\.)yaqeeninstitute\.org$/, site: "Yaqeen Institute", category: "article", grade: "Article" }
];

function referenceFromUrl(url, site) {
  if (site === "Quran.com") {
    const match = /quran\.com\/(?:[a-z-]+\/)?(\d+)(?:[/:](\d+(?:-\d+)?))?/.exec(url);
    if (match) return match[2] ? `Quran ${match[1]}:${match[2]}` : `Surah ${match[1]}`;
  }
  if (site === "Sunnah.com") {
    const match = /sunnah\.com\/([a-z]+):?(\w+)?/.exec(url);
    if (match) return match[2] ? `${match[1][0].toUpperCase()}${match[1].slice(1)} ${match[2]}` : match[1];
  }
  return site === "YouTube" ? "Video guide" : undefined;
}

// Builds LessonSource objects for links to the sites the app knows how to show.
export function buildSources(urls, idPrefix, warn) {
  const sources = [];
  const seen = new Set();
  for (const entry of urls) {
    const raw = typeof entry === "string" ? entry : "";
    const urlMatch = /https?:\/\/[^\s)>\]]+/.exec(raw);
    if (!urlMatch) continue;
    const url = urlMatch[0];
    if (seen.has(url)) continue;
    seen.add(url);
    let host;
    try {
      host = new URL(url).hostname.replace(/^www\./, "");
    } catch {
      warn(`Skipping invalid source URL ${url}`);
      continue;
    }
    const known = SOURCE_SITES.find((entrySite) => entrySite.pattern.test(host));
    if (!known) {
      warn(`Skipping source ${url}: the app only links Quran.com, Sunnah.com, YouTube and Yaqeen Institute`);
      continue;
    }
    const label = raw.replace(url, "").replace(/[[\]()<>]/g, "").replace(/^[\s:-]+|[\s:-]+$/g, "");
    const reference = referenceFromUrl(url, known.site);
    sources.push({
      id: `${idPrefix}_src_${sources.length + 1}`,
      site: known.site,
      category: known.category,
      title: label || reference || known.site,
      url,
      reference,
      from: "Imported from Obsidian notes",
      grade: known.grade,
      summary: label || `Reference attached in the notes (${reference ?? known.site}).`
    });
  }
  return sources;
}

const STOP_WORDS = new Set(["the", "and", "with", "from", "that", "this", "surah", "allah", "prophet", "abu", "ibn", "bint", "umm"]);

// Words used to keep a flashcard's wrong choices from overlapping its right answer
// ("Abu Bakr as-Siddiq" should not be a wrong choice for "As-Siddiq").
function significantWords(text) {
  return slugify(text)
    .split("-")
    .filter((word) => word.length >= 4 && !STOP_WORDS.has(word));
}

function isTrueFalseOptions(options) {
  const labels = options.map((option) => option.label.toLowerCase());
  return labels.length === 2 && labels.includes("true") && labels.includes("false");
}

// A "Term:: answer" line counts as a flashcard only when the left side reads like a question,
// so Dataview fields such as "born:: 573 CE" are not turned into quiz items.
function looksLikeFlashcardPrompt(left) {
  return left.trim().endsWith("?") || left.trim().split(/\s+/).length >= 3;
}

// Pulls question blocks out of a section's lines and returns them with the remaining prose.
export function extractQuestions(lines) {
  const questions = [];
  const prose = [];
  let current;

  const finish = () => {
    if (current) questions.push(current);
    current = undefined;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    const qMatch = /^(?:Q|Question|T\/F|TF|True or false)\s*[:.]\s*(.+)$/i.exec(line);
    if (qMatch) {
      finish();
      current = {
        prompt: qMatch[1].trim(),
        options: [],
        isTrueFalse: /^(T\/F|TF|True or false)/i.test(line)
      };
      continue;
    }
    if (current) {
      const option = /^[-*+]\s+\[([ xX])\]\s+(.+)$/.exec(line);
      if (option) {
        current.options.push({ label: option[2].trim(), correct: option[1].toLowerCase() === "x" });
        continue;
      }
      const answer = /^(?:A|Answer)\s*[:.]\s*(.+)$/i.exec(line);
      if (answer) {
        current.answer = answer[1].trim();
        continue;
      }
      const explanation = /^(?:Explanation|Why|Because)\s*[:.]\s*(.+)$/i.exec(line) ?? /^>\s*(.+)$/.exec(line);
      if (explanation) {
        current.explanation = [current.explanation, explanation[1].trim()].filter(Boolean).join(" ");
        continue;
      }
      if (!line) continue;
      finish();
    }
    const card = /^(?![-*+]\s)(.+?)\s*:{2,3}\s*(.+)$/.exec(line);
    if (card && !/https?:$/.test(card[1]) && looksLikeFlashcardPrompt(card[1])) {
      questions.push({ prompt: card[1].trim(), answer: card[2].trim(), options: [], isFlashcard: true });
      continue;
    }
    prose.push(rawLine);
  }
  finish();
  return { questions, prose: prose.join("\n") };
}

function splitSections(body) {
  const sections = [];
  let current = { heading: undefined, lines: [] };
  let inFence = false;
  for (const line of body.split("\n")) {
    if (/^```/.test(line.trim())) inFence = !inFence;
    const heading = !inFence && /^##\s+(.+?)\s*#*$/.exec(line);
    if (heading) {
      sections.push(current);
      current = { heading: cleanText(heading[1]), lines: [] };
      continue;
    }
    if (!inFence && /^#\s+/.test(line)) continue;
    current.lines.push(line);
  }
  sections.push(current);
  return sections;
}

const SPECIAL_SUBSECTIONS = {
  "key takeaway": "keyTakeaway",
  takeaway: "keyTakeaway",
  "why it matters": "whyItMatters",
  "story moment": "storyMoment",
  story: "storyMoment",
  "what you will learn": "whatYouWillLearn"
};

// Splits "### Key takeaway" style subsections out of a lesson's text.
function splitSpecialSubsections(text) {
  const extras = {};
  const kept = [];
  let target;
  for (const line of text.split("\n")) {
    const heading = /^###\s+(.+?)\s*#*$/.exec(line);
    if (heading) {
      target = SPECIAL_SUBSECTIONS[cleanText(heading[1]).toLowerCase()];
      if (target) {
        extras[target] = "";
        continue;
      }
    }
    if (target) extras[target] += `${line}\n`;
    else kept.push(line);
  }
  for (const key of Object.keys(extras)) extras[key] = cleanText(extras[key]);
  return { text: kept.join("\n"), extras };
}

function findUrls(text) {
  return [...text.matchAll(/\[([^\]]+)\]\((https?:[^)\s]+)\)|(https?:\/\/[^\s)>\]]+)/g)].map((match) =>
    match[2] ? `${match[1]} ${match[2]}` : match[3]
  );
}

function rotate(items, start) {
  return items.map((_, index) => items[(start + index) % items.length]);
}

function hashCode(input) {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

function inferDifficulty(index, total) {
  const progress = index / Math.max(1, total - 1);
  if (progress < 0.2) return 1;
  if (progress < 0.45) return 2;
  if (progress < 0.7) return 3;
  if (progress < 0.9) return 4;
  return 5;
}

function clampDifficulty(value, fallback) {
  const number = Number(value);
  return Number.isInteger(number) && number >= 1 && number <= 5 ? number : fallback;
}

function mcChallenge(id, prompt, labels, correctLabel, explanation) {
  const ordered = rotate(labels, hashCode(id) % labels.length);
  const choices = ordered.map((label, index) => ({ id: String.fromCharCode(97 + index), label }));
  return {
    id,
    type: "multiple_choice",
    prompt,
    choices,
    correctChoiceId: choices.find((choice) => choice.label === correctLabel).id,
    explanation
  };
}

function tfChallenge(id, prompt, isTrue, explanation) {
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

// Turns one parsed question into a Challenge. distractorPool supplies wrong answers for flashcards.
function toChallenge(question, id, distractorPool, fallbackExplanation, warn) {
  const prompt = cleanText(question.prompt);
  const explanation = cleanText(question.explanation ?? "") || fallbackExplanation;
  const answer = question.answer ? cleanText(question.answer) : undefined;

  if (question.options.length) {
    const correct = question.options.filter((option) => option.correct);
    if (correct.length !== 1) {
      warn(`"${prompt}" needs exactly one [x] option (found ${correct.length}); skipped`);
      return undefined;
    }
    if (isTrueFalseOptions(question.options)) {
      return tfChallenge(id, prompt, correct[0].label.toLowerCase() === "true", explanation);
    }
    const labels = question.options.map((option) => cleanText(option.label));
    if (new Set(labels).size !== labels.length) {
      warn(`"${prompt}" has duplicate options; skipped`);
      return undefined;
    }
    return mcChallenge(id, prompt, labels, cleanText(correct[0].label), explanation);
  }

  if (!answer) {
    warn(`"${prompt}" has no answer or options; skipped`);
    return undefined;
  }

  if (question.isTrueFalse || /^(true|false)$/i.test(answer)) {
    if (!/^(true|false)$/i.test(answer)) {
      warn(`True/false question "${prompt}" needs "A: True" or "A: False"; skipped`);
      return undefined;
    }
    return tfChallenge(id, prompt, answer.toLowerCase() === "true", explanation);
  }

  const answerWords = significantWords(answer);
  const distractors = [
    ...new Set(distractorPool.filter((label) => label.toLowerCase() !== answer.toLowerCase() && !significantWords(label).some((word) => answerWords.includes(word))))
  ];
  if (distractors.length < 2) {
    warn(`"${prompt}" needs at least 2 other flashcard answers nearby to build choices, or explicit [ ] options; skipped`);
    return undefined;
  }
  const picked = rotate(distractors, hashCode(id) % distractors.length).slice(0, 3);
  const finalPrompt = prompt.endsWith("?") || prompt.endsWith(":") ? prompt : `${prompt}?`;
  return mcChallenge(id, finalPrompt, [answer, ...picked], answer, explanation === fallbackExplanation ? `${answer}. ${fallbackExplanation}` : explanation);
}

function listNotes(root) {
  const files = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir).sort()) {
      if (name.startsWith(".") || name === "node_modules") continue;
      const full = join(dir, name);
      if (statSync(full).isDirectory()) walk(full);
      else if (extname(name).toLowerCase() === ".md") files.push(full);
    }
  };
  walk(root);
  return files;
}

// Parses one note into a branch description plus raw lessons; no IDs are assigned yet.
export function parseNote(text, { filePath = "note.md", folderTopic, defaultTopic } = {}) {
  const warnings = [];
  const warn = (message) => warnings.push(`${filePath}: ${message}`);
  const { data, body } = parseFrontmatter(text);

  if (data.import === false || data.skip === true) return { skipped: true, warnings };

  const topicId = resolveTopic(data.topic) ?? folderTopic ?? resolveTopic(defaultTopic);
  if (!topicId) {
    warn(`no topic found; add "topic:" to the note's properties or put it in a topic folder (for example Sahabah/). Skipped`);
    return { skipped: true, warnings };
  }

  const title = cleanText(String(data.title ?? data.branch ?? basename(filePath, extname(filePath))));
  const sections = splitSections(body);
  const intro = sections.shift();
  const introParsed = extractQuestions(intro.lines);
  const description = cleanText(String(data.description ?? "")) || firstSentence(cleanText(introParsed.prose)) || `Lessons from your notes on ${title}.`;
  const noteSources = [...(Array.isArray(data.sources) ? data.sources : data.sources ? [data.sources] : []), ...findUrls(intro.lines.join("\n"))];

  const lessons = [];
  // A note without "##" headings is a single lesson; otherwise each heading is a lesson and
  // questions written above the first heading join the first lesson.
  const rawLessons = sections.length ? sections : [{ heading: title, lines: intro.lines }];
  if (sections.length) rawLessons[0] = { ...rawLessons[0], extraQuestions: introParsed.questions };

  for (const section of rawLessons) {
    const parsed = extractQuestions(section.lines);
    parsed.questions.unshift(...(section.extraQuestions ?? []));
    const { text, extras } = splitSpecialSubsections(parsed.prose);
    const content = cleanText(text);
    if (!content && !parsed.questions.length) {
      warn(`section "${section.heading}" is empty; skipped`);
      continue;
    }
    lessons.push({
      title: section.heading,
      content,
      extras,
      questions: parsed.questions,
      sourceUrls: findUrls(section.lines.join("\n"))
    });
  }

  return {
    skipped: false,
    warnings,
    topicId,
    title,
    description,
    order: Number.isFinite(Number(data.order)) ? Number(data.order) : undefined,
    difficulty: data.difficulty,
    premiumOnly: data.premium === true,
    noteSources,
    lessons
  };
}

// Assigns IDs and builds the app's LearningBranch / LearningNode / Lesson objects for one note.
export function buildBranch(note, { idPrefix = "notes" } = {}) {
  const warnings = [];
  const branchSlug = slugify(note.title) || "untitled";
  const branchId = `${idPrefix}-${note.topicId.replace(/_/g, "-")}-${branchSlug}`;
  const warn = (message) => warnings.push(`${note.title}: ${message}`);
  const branchSources = buildSources(note.noteSources, branchId.replace(/-/g, "_"), warn);
  const total = note.lessons.length;
  const nodes = [];
  const lessonsById = {};
  const usedSlugs = new Set();

  // Flashcard answers across the whole note feed each other's wrong choices.
  const flashcardAnswers = note.lessons.flatMap((lesson) =>
    lesson.questions.filter((question) => question.isFlashcard || (!question.options.length && question.answer && !/^(true|false)$/i.test(question.answer))).map((question) => cleanText(question.answer))
  );
  const sectionSentences = note.lessons.map((lesson) => firstSentence(lesson.content)).filter(Boolean);

  note.lessons.forEach((entry, index) => {
    let slug = slugify(entry.title) || `lesson-${index + 1}`;
    while (usedSlugs.has(slug)) slug = `${slug}-${index + 1}`;
    usedSlugs.add(slug);

    const nodeId = `${branchId}-${slug}`;
    const lessonId = `lesson-${nodeId}`;
    const isReview = /review|mastery|quiz|recap/i.test(entry.title);
    const kind = isReview ? "review" : note.topicId === "sahabah" || note.topicId === "prophets" || note.topicId === "women_of_the_book" ? "story" : "skill";
    const difficulty = clampDifficulty(note.difficulty, Math.min(index + 1, inferDifficulty(index, total)));
    const xpReward = 8 + difficulty * 2 + (kind === "review" ? 4 : 0);
    const lessonSources = buildSources(entry.sourceUrls, lessonId.replace(/-/g, "_"), warn);
    const sources = [...lessonSources, ...branchSources.filter((source) => !lessonSources.some((own) => own.url === source.url))];
    const focus = firstSentence(entry.content) || entry.title;
    const fallbackExplanation = focus;

    const challenges = [];
    entry.questions.forEach((question) => {
      const challenge = toChallenge(question, `${lessonId}_q${challenges.length + 1}`, flashcardAnswers, fallbackExplanation, (message) => warn(`[${entry.title}] ${message}`));
      if (challenge) challenges.push(challenge);
    });

    if (!challenges.length) {
      // No questions written: ask which point belongs to this lesson, using other sections as wrong choices.
      const others = sectionSentences.filter((sentence) => sentence !== focus);
      if (entry.content && others.length >= 2) {
        challenges.push(
          mcChallenge(`${lessonId}_auto1`, `Which point comes from "${entry.title}"?`, [focus, ...rotate(others, hashCode(lessonId) % others.length).slice(0, 3)], focus, focus)
        );
        warn(`[${entry.title}] has no questions; generated one recall question from the notes. Add Q:/A: lines for better quizzes`);
      } else {
        warn(`[${entry.title}] has no questions and too little text to generate one; skipped`);
        return;
      }
    }

    const previous = nodes[nodes.length - 1];
    nodes.push({
      id: nodeId,
      skillId: `skill_${note.topicId}_${branchId}_${nodes.length + 1}`,
      title: entry.title,
      topicId: note.topicId,
      branchId,
      kind,
      lessonIds: [lessonId],
      requiredNodeIds: previous ? [previous.id] : [],
      xpReward,
      starsReward: kind === "review" ? 5 : 3,
      order: nodes.length + 1,
      difficulty,
      sourceReferences: sources,
      masteryState: kind === "review" ? "mastery" : "new",
      masteryTestEligible: kind === "review"
    });

    lessonsById[lessonId] = {
      id: lessonId,
      nodeId,
      branchId,
      title: entry.title,
      intro: focus,
      explanationContent: entry.content || undefined,
      whatYouWillLearn: entry.extras.whatYouWillLearn || undefined,
      whyItMatters: entry.extras.whyItMatters || undefined,
      keyTakeaway: entry.extras.keyTakeaway || undefined,
      storyMoment: entry.extras.storyMoment || undefined,
      lessonType: kind === "review" ? "review" : kind,
      difficulty,
      xpReward,
      sources,
      sourceReferences: sources,
      unlockRules: previous ? [`Complete ${previous.title}`] : [],
      masteryState: kind === "review" ? "mastery" : "learning",
      masteryTestEligible: kind === "review",
      challenges: challenges.map((challenge) => ({
        ...challenge,
        sourceNodeId: nodeId,
        sourceLessonId: lessonId,
        resourceLabel: sources[0] ? "Open source" : undefined,
        resourceUrl: sources[0]?.url
      }))
    };
  });

  for (const lesson of Object.values(lessonsById)) {
    for (const key of Object.keys(lesson)) if (lesson[key] === undefined) delete lesson[key];
    for (const challenge of lesson.challenges) for (const key of Object.keys(challenge)) if (challenge[key] === undefined) delete challenge[key];
  }

  const difficulties = nodes.map((node) => node.difficulty);
  return {
    warnings,
    branch: {
      id: branchId,
      topicId: note.topicId,
      title: note.title,
      description: note.description,
      order: note.order,
      ...(note.premiumOnly ? { premiumOnly: true } : {}),
      difficultyRange: { start: Math.min(...difficulties, 5), end: Math.max(...difficulties, 1) },
      sourceReferences: branchSources
    },
    nodes,
    lessonsById
  };
}

// Converts every note under vaultDir. Returns the app content, backend seed data and warnings.
export function importVault(vaultDir, { defaultTopic, idPrefix = "notes" } = {}) {
  const warnings = [];
  const sectionsByTopic = new Map();
  const lessonsById = {};
  const branchIds = new Set();
  let noteCount = 0;

  for (const file of listNotes(vaultDir)) {
    const relPath = relative(vaultDir, file);
    const folders = relPath.split(sep).slice(0, -1);
    const folderTopic = folders.map(resolveTopic).find(Boolean);
    const note = parseNote(readFileSync(file, "utf8"), { filePath: relPath, folderTopic, defaultTopic });
    warnings.push(...note.warnings);
    if (note.skipped) continue;

    const built = buildBranch(note, { idPrefix });
    warnings.push(...built.warnings.map((message) => `${relPath}: ${message}`));
    if (!built.nodes.length) {
      warnings.push(`${relPath}: no usable lessons; skipped`);
      continue;
    }
    if (branchIds.has(built.branch.id)) {
      warnings.push(`${relPath}: another note already produced branch "${built.branch.id}"; rename the note or set "title:". Skipped`);
      continue;
    }
    branchIds.add(built.branch.id);
    noteCount += 1;

    const entry = sectionsByTopic.get(note.topicId) ?? { topicId: note.topicId, branches: [], nodes: [] };
    entry.branches.push(built.branch);
    entry.nodes.push(...built.nodes);
    sectionsByTopic.set(note.topicId, entry);
    Object.assign(lessonsById, built.lessonsById);
  }

  const sections = [...sectionsByTopic.values()]
    .sort((left, right) => TOPIC_IDS.indexOf(left.topicId) - TOPIC_IDS.indexOf(right.topicId))
    .map((section) => {
      const branches = section.branches
        .map((branch, index) => ({ branch, index }))
        .sort((left, right) => (left.branch.order ?? 1000 + left.index) - (right.branch.order ?? 1000 + right.index))
        .map(({ branch }) => branch);
      const nodeOrder = new Map(branches.map((branch, index) => [branch.id, index]));
      branches.forEach((branch) => delete branch.order);
      return { ...section, branches, nodes: [...section.nodes].sort((left, right) => nodeOrder.get(left.branchId) - nodeOrder.get(right.branchId)) };
    });

  const content = { sections, lessonsById };
  return { content, backend: toBackendSeed(content), warnings, stats: summarize(content, noteCount) };
}

function summarize(content, noteCount) {
  const lessons = Object.values(content.lessonsById);
  return {
    notes: noteCount,
    branches: content.sections.reduce((total, section) => total + section.branches.length, 0),
    lessons: lessons.length,
    questions: lessons.reduce((total, lesson) => total + lesson.challenges.length, 0)
  };
}

// Shapes imported content like the branch dicts backend/app/catalog_seed.py builds.
export function toBackendSeed(content) {
  const topics = {};
  for (const section of content.sections) {
    const slug = BACKEND_TOPIC_SLUGS[section.topicId];
    topics[slug] = section.branches.map((branch) => {
      const branchNodes = section.nodes.filter((node) => node.branchId === branch.id);
      return {
        title: branch.title,
        description: branch.description,
        difficulty_start: branch.difficultyRange.start,
        difficulty_end: branch.difficultyRange.end,
        resources: branch.sourceReferences.map((source) => ({
          title: source.title,
          url: source.url,
          source_type: source.category === "tafsir" ? "quran" : source.category,
          speaker: null,
          notes: source.summary
        })),
        lessons: branchNodes.map((node) => {
          const lesson = content.lessonsById[node.lessonIds[0]];
          return {
            title: lesson.title,
            description: lesson.explanationContent ?? lesson.intro,
            difficulty: lesson.difficulty,
            lesson_type: lesson.lessonType === "skill" ? "guided" : lesson.lessonType,
            premium: Boolean(branch.premiumOnly),
            estimated_minutes: Math.max(2, Math.min(10, lesson.challenges.length + 1)),
            mastery_test_eligible: Boolean(lesson.masteryTestEligible),
            xp_reward: lesson.xpReward,
            questions: lesson.challenges.map((challenge) => ({
              type: challenge.type,
              prompt: challenge.prompt,
              options_json: challenge.choices.map((choice) => ({ id: choice.id, text: choice.label })),
              correct_answer_json: { choiceId: challenge.correctChoiceId },
              explanation_short: challenge.explanation,
              explanation_long: lesson.keyTakeaway ?? lesson.intro,
              tags_json: [slugify(lesson.title), `difficulty_${lesson.difficulty}`, "obsidian_import"]
            }))
          };
        })
      };
    });
  }
  return { generated_by: "scripts/obsidian-import", topics };
}

export function renderTypeScript(content) {
  return `// AUTO-GENERATED by scripts/obsidian-import/import-obsidian-notes.mjs. Do not edit by hand;
// change the Obsidian notes and run \`npm run import:notes -- <vault folder>\` instead.
import type { ImportedNotesContent } from "./importedNotes";

export const IMPORTED_NOTES: ImportedNotesContent = ${JSON.stringify(content, null, 2)};
`;
}
