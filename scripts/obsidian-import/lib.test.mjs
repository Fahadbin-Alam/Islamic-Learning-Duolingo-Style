import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { pickDistractors } from "./facts.mjs";
import { cleanText, extractQuestions, firstSentence, importVault, parseFrontmatter, parseNote, renderTypeScript, resolveTopic } from "./lib.mjs";

const sampleVault = join(dirname(fileURLToPath(import.meta.url)), "sample-vault");

function vaultWith(files) {
  const root = mkdtempSync(join(tmpdir(), "obsidian-import-"));
  for (const [path, text] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), text);
  }
  return root;
}

test("parses Obsidian properties", () => {
  const { data, body } = parseFrontmatter("---\ntitle: \"Umar\"\norder: 2\npremium: true\ntags: [a, b]\nsources:\n  - https://quran.com/9/100\n---\nBody");
  assert.deepEqual(data, { title: "Umar", order: 2, premium: true, tags: ["a", "b"], sources: ["https://quran.com/9/100"] });
  assert.equal(body, "Body");
});

test("strips Obsidian syntax", () => {
  assert.equal(cleanText("[[Abu Bakr|The Siddiq]] and [[Umar]] ==led== **well** #tag %%hidden%% ![[pic.png]]"), "The Siddiq and Umar led well");
  assert.equal(cleanText("See https://sunnah.com/bukhari:1 for more"), "for more");
});

test("maps folder and property names to topics", () => {
  assert.equal(resolveTopic("Sahaba"), "sahabah");
  assert.equal(resolveTopic("Quran"), "quran_tafseer");
  assert.equal(resolveTopic("Adab"), "manners");
  assert.equal(resolveTopic("Random"), undefined);
});

test("reads every question style", () => {
  const { questions, prose } = extractQuestions([
    "Some prose.",
    "Q: Pick one",
    "- [ ] Wrong",
    "- [x] Right",
    "Explanation: Because.",
    "",
    "Q: Open question?",
    "A: The answer",
    "T/F: Statement",
    "A: False",
    "> It is false.",
    "Who led the prayer?:: Abu Bakr",
    "born:: 573 CE"
  ]);
  assert.equal(questions.length, 4);
  assert.deepEqual(questions[0].options.map((option) => option.correct), [false, true]);
  assert.equal(questions[0].explanation, "Because.");
  assert.equal(questions[1].answer, "The answer");
  assert.equal(questions[2].isTrueFalse, true);
  assert.equal(questions[2].explanation, "It is false.");
  assert.equal(questions[3].isFlashcard, true);
  assert.match(prose, /born:: 573 CE/, "Dataview fields stay as prose");
});

test("a note without ## headings becomes a single lesson", () => {
  const note = parseNote("Prose here.\n\nQ: Is it?\nA: True", { filePath: "x.md", folderTopic: "manners" });
  assert.equal(note.lessons.length, 1);
  assert.equal(note.lessons[0].title, "x");
  assert.equal(note.lessons[0].questions.length, 1);
});

test("imports the sample vault into app lessons", () => {
  const result = importVault(sampleVault);
  assert.deepEqual(result.stats, { notes: 10, branches: 5, lessons: 14, questions: 31 });
  assert.deepEqual(result.content.sections.map((section) => section.topicId), ["manners", "sahabah", "quran_tafseer", "hadith"]);

  const sahabah = result.content.sections[1];
  assert.equal(sahabah.branches[0].title, "Abu Bakr as-Siddiq");
  assert.deepEqual(sahabah.nodes.slice(0, 3).map((node) => node.requiredNodeIds.length), [0, 1, 1]);
  assert.equal(sahabah.nodes[1].requiredNodeIds[0], sahabah.nodes[0].id);

  const hijrah = result.content.lessonsById["lesson-notes-sahabah-abu-bakr-as-siddiq-the-hijrah"];
  assert.equal(hijrah.keyTakeaway, "True friendship means standing with the truth when it is costly.");
  assert.equal(hijrah.sources[0].url, "https://quran.com/9/40");
  assert.equal(hijrah.challenges.length, 3);
  for (const lesson of Object.values(result.content.lessonsById)) {
    for (const challenge of lesson.challenges) {
      assert.ok(challenge.choices.some((choice) => choice.id === challenge.correctChoiceId), challenge.prompt);
      assert.equal(new Set(challenge.choices.map((choice) => choice.label)).size, challenge.choices.length, challenge.prompt);
    }
  }

  const tf = hijrah.challenges.find((challenge) => challenge.type === "true_false");
  assert.equal(tf.correctChoiceId, "false");
  const flashcard = hijrah.challenges.find((challenge) => challenge.prompt.startsWith("Which surah"));
  assert.equal(flashcard.choices.find((choice) => choice.id === flashcard.correctChoiceId).label, "Surah at-Tawbah");

  const title = result.content.lessonsById["lesson-notes-sahabah-abu-bakr-as-siddiq-accepting-islam"].challenges[1];
  assert.ok(!title.choices.some((choice) => choice.label === "Abu Bakr as-Siddiq"), "wrong choices never overlap the right answer");
});

test("output is deterministic", () => {
  assert.equal(renderTypeScript(importVault(sampleVault).content), renderTypeScript(importVault(sampleVault).content));
});

test("skips opted-out notes, notes without a topic and broken questions with warnings", () => {
  const vault = vaultWith({
    "Misc/Untitled.md": "## A\nText.\nQ: x\nA: True",
    "Sahabah/Opted out.md": "---\nimport: false\n---\n## A\nText",
    "Sahabah/Umar.md": "## Two right answers\nText.\nQ: Pick\n- [x] A\n- [x] B\n\n## Fine\nUmar was the second caliph.\nQ: Umar was the second caliph.\nA: True",
    "Sahabah/Sub/Umar.md": "## Again\nSame title.\nQ: ok\nA: True"
  });
  const result = importVault(vault);
  assert.equal(result.stats.notes, 1);
  assert.equal(result.stats.lessons, 1);
  assert.ok(result.warnings.some((warning) => warning.includes("1 notes skipped because no topic was found")));
  assert.ok(result.warnings.some((warning) => warning.includes("exactly one [x]")));
  assert.ok(result.warnings.some((warning) => warning.includes("already produced branch")));
});

test("--topic fills in notes without one", () => {
  const vault = vaultWith({ "Note.md": "Text.\nQ: Ok?\nA: True" });
  assert.equal(importVault(vault, { defaultTopic: "prophets" }).content.sections[0].topicId, "prophets");
});

test("builds backend seed branches in catalog_seed's shape", () => {
  const { backend } = importVault(sampleVault);
  assert.deepEqual(Object.keys(backend.topics), ["manners", "sahabi", "quran", "hadith"]);
  const branch = backend.topics.sahabi[0];
  assert.equal(branch.lessons.length, 3);
  const question = branch.lessons[1].questions[0];
  assert.deepEqual(Object.keys(question).sort(), ["correct_answer_json", "explanation_long", "explanation_short", "options_json", "prompt", "tags_json", "type"]);
  assert.ok(question.options_json.some((option) => option.id === question.correct_answer_json.choiceId));
});

test("builds quizzes from Sahabi person notes", () => {
  const { content } = importVault(sampleVault);
  const companions = content.sections.find((section) => section.topicId === "sahabah").branches.find((branch) => branch.title === "Companions from your notes");
  assert.ok(companions);
  const lesson = content.lessonsById[`lesson-${companions.id}-abdullah-ibn-rawahah`];
  assert.match(lesson.explanationContent, /Tribe: Khazraj/);
  assert.equal(lesson.sources[0].url, "https://sunnah.com/bukhari:4261", "Wikipedia links are left out");
  const tribe = lesson.challenges.find((challenge) => challenge.prompt === "Which tribe was Abdullah ibn Rawahah from?");
  assert.equal(tribe.choices.find((choice) => choice.id === tribe.correctChoiceId).label, "Khazraj");
  assert.ok(!tribe.choices.some((choice) => choice.id !== tribe.correctChoiceId && choice.label === "Khazraj"));
  for (const challenge of lesson.challenges) {
    const wrong = challenge.choices.filter((choice) => choice.id !== challenge.correctChoiceId).map((choice) => choice.label);
    assert.ok(!wrong.some((label) => /8 AH/.test(label)), `"${challenge.prompt}" offers another 8 AH date as a wrong answer`);
  }
});

test("builds surah lessons with ayah meaning questions", () => {
  const { content } = importVault(sampleVault);
  const quran = content.sections.find((section) => section.topicId === "quran_tafseer");
  assert.deepEqual(quran.branches.map((branch) => branch.title), ["Surahs 103-112"]);
  assert.deepEqual(quran.nodes.map((node) => node.title), ["Surah Al-'Asr", "Surah Al-Kawthar", "Surah Al-Ikhlas"]);
  const ikhlas = content.lessonsById[quran.nodes[2].lessonIds[0]];
  assert.match(ikhlas.explanationContent, /112:1 Say: He is Allah, the One!/);
  assert.equal(ikhlas.sources.length, 1);
  assert.equal(ikhlas.sources[0].url, "https://quran.com/112");
  const meaning = ikhlas.challenges.find((challenge) => challenge.prompt.startsWith("What does this ayah mean?"));
  assert.match(meaning.prompt, /[؀-ۿ]/, "shows the Arabic");
  const revealed = ikhlas.challenges.find((challenge) => / was revealed in /.test(challenge.prompt));
  assert.equal(revealed.type, "true_false");
  assert.equal(revealed.correctChoiceId, revealed.prompt.endsWith("Makkah.") ? "true" : "false");
});

test("puts hadith notes in the Hadith topic and skips untagged people", () => {
  const result = importVault(sampleVault);
  const hadith = result.content.sections.find((section) => section.topicId === "hadith");
  assert.equal(hadith.nodes[0].title, "Sahih Muslim 134a");
  const lesson = result.content.lessonsById[hadith.nodes[0].lessonIds[0]];
  assert.doesNotMatch(lesson.explanationContent, /[؀-ۿ]|Chapter 60/);
  assert.ok(result.warnings.some((warning) => warning.includes("Abu Jahl")));
  assert.deepEqual(Object.keys(result.backend.topics).sort(), ["hadith", "manners", "quran", "sahabi"]);
});

test("first sentences skip list markers and abbreviations", () => {
  assert.equal(firstSentence("1. Abdullah b. Umar narrated it. More."), "Abdullah b. Umar narrated it.");
  assert.equal(firstSentence("Notes:\n- He died c. 40 AH in Kufa. Then"), "He died c. 40 AH in Kufa.");
});

test("wrong choices are written like the answer", () => {
  const picked = pickDistractors("Quraysh", ["Banu Kalb", "Banu Kilab", "Thaqif", "Khazraj", "Aws", "Banu Mustaliq"], "seed");
  assert.ok(picked.every((value) => !value.startsWith("Banu")), picked.join(", "));
  assert.equal(pickDistractors("Banu Adi", ["Banu Taym", "Banu Hashim", "Banu Makhzum", "Quraysh"], "seed").every((value) => value.startsWith("Banu")), true);
});

test("hadith choices are cut to the same length and drop reference text", () => {
  const long = (n) => Array.from({ length: 30 }, (_, index) => `w${n}${index}`).join(" ");
  const hadith = (name, body, collection) => [`Hadith/${name}.md`, `---\ntype: hadith\ncollection: ${collection}\naliases:\n  - ${name}\n---\n${body}`];
  const vault = vaultWith(
    Object.fromEntries([
      hadith("Sahih Muslim 1", `The Messenger of Allah said: ${long(1)}`, "Sahih Muslim"),
      hadith("Mishkat 2", `Anas reported him saying, “${long(2)}” Baihaqi transmitted it in Shu'ab al-iman. Mishkat al-Masabih 3096`, "Mishkat al-Masabih"),
      hadith("Sahih Bukhari 3", `Narrated Umar: ${long(3)}`, "Sahih al-Bukhari")
    ])
  );
  const { content } = importVault(vault);
  for (const lesson of Object.values(content.lessonsById)) {
    assert.doesNotMatch(lesson.explanationContent, /transmitted|Mishkat al-Masabih 3096/);
    const which = lesson.challenges.find((challenge) => challenge.prompt.startsWith("Which narration"));
    if (!which) continue;
    assert.ok(which.choices.every((choice) => choice.label.endsWith("...")), which.choices.map((choice) => choice.label).join(" | "));
  }
});

test("index and FAQ notes with a type but no questions are skipped quietly", () => {
  const vault = vaultWith({ "Quran/Quran.md": "---\ntype: index\n---\n## Table of Contents\n1. Surahs\n## Sources\nLinks here.\n## More\nText here." });
  const result = importVault(vault);
  assert.equal(result.stats.lessons, 0);
  assert.ok(result.warnings.some((warning) => warning.includes("1 notes skipped because their type")));
});
