import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { ADULT_TEXT, FRIGHTENING_TEXT, MAX_CHIP_WORDS, MAX_CHOICE_LENGTH, MAX_LEARN_FACTS, MAX_LINE_WORDS, MAX_PERSON_QUESTIONS, PERSON_FACTS, displayName, fatherSpellingMismatch, nameInSentence, nameWarnings, pickDistractors, plainName, properName, titleCase } from "./facts.mjs";
import { cleanText, extractQuestions, firstSentence, importVault, parseFrontmatter, parseNote, renderTypeScript, resolveTopic, suspectTextWarnings } from "./lib.mjs";

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
  assert.equal(cleanText("read the quran with abu bakr (in makkah) ; then rest ."), "read the Quran with Abu Bakr (in Makkah); then rest.");
  assert.equal(cleanText("Allah's Messenger said : yes"), "Allah's Messenger said: yes");
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
  // Al-Kawthar and Al-Ikhlas are surahs the scholars differ on, Makkan or Madinan, so neither asks where it was revealed.
  assert.deepEqual(result.stats, { notes: 10, branches: 5, lessons: 14, questions: 27 });
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
  const companions = content.sections.find((section) => section.topicId === "sahabah").branches.find((branch) => branch.title === "Companions");
  assert.ok(companions);
  assert.equal(companions.id, "notes-sahabah-companions-from-your-notes", "the id keeps the first name so saved progress still matches");
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

test("person lessons start with what the person is known for and stay short", () => {
  const { content } = importVault(sampleVault);
  const companions = content.sections.find((section) => section.topicId === "sahabah").branches.find((branch) => branch.title === "Companions");
  const lesson = content.lessonsById[`lesson-${companions.id}-abdullah-ibn-rawahah`];
  assert.match(lesson.intro, /^Poet; third commander at Mu'tah, martyred there\./, "no \"Known for:\" label on the learn card");
  // Questions follow PERSON_FACTS: what they are known for and family first, burial place last.
  const order = PERSON_FACTS.map((fact) => fact.prompt("Abdullah ibn Rawahah"));
  const asked = lesson.challenges.map((challenge) => order.indexOf(challenge.prompt));
  assert.ok(asked.every((index) => index >= 0));
  assert.deepEqual(asked, [...asked].sort((left, right) => left - right));
  for (const each of Object.values(content.lessonsById)) {
    if (each.id.startsWith(`lesson-${companions.id}`)) assert.ok(each.challenges.length <= MAX_PERSON_QUESTIONS, each.title);
  }
});

test("unit names are plain words, never \"from your notes\"", () => {
  const { content } = importVault(sampleVault);
  const titles = content.sections.flatMap((section) => section.branches.map((branch) => `${branch.title} ${branch.description}`));
  assert.ok(titles.every((title) => !/your notes/i.test(title)), titles.join(" | "));
});

test("fixes known slips from older translations and plain-spells transliteration", () => {
  assert.equal(cleanText("There is no Allah save Him, the Mighty."), "There is no god save Him, the Mighty.");
  assert.equal(cleanText("There is no Allah save Me, so fear Me."), "There is no god save Me, so fear Me.");
  assert.equal(cleanText("He is Allah, than whom there is no other Allah."), "He is Allah, than whom there is no other god.");
  assert.equal(cleanText("Is there any Allah beside Allah?"), "Is there any god beside Allah?");
  assert.equal(cleanText("It is inspired in me that your Allah is One Allah, therefor take the straight path"), "It is inspired in me that your God is One God, therefor take the straight path");
  assert.equal(cleanText("Maketh he the gods One Allah? Lo!"), "Maketh he the gods One God? Lo!");
  assert.equal(cleanText("He said: 0 young men, wait."), "He said: O young men, wait.");
  assert.equal(cleanText("Labbaik,0 Allah, Labbaik. Say: 0 unbelievers."), "Labbaik, O Allah, Labbaik. Say: O unbelievers.");
  assert.equal(cleanText("He had 10 young camels in 1440 AH."), "He had 10 young camels in 1440 AH.", "real numbers stay");
  assert.equal(cleanText("Abū Bakr aṣ-Ṣiddīq, ʿAbbās and the Qurʼan"), "Abu Bakr as-Siddiq, 'Abbas and the Qur'an");
  assert.equal(cleanText("قُلْ هُوَ ٱللَّهُ أَحَدٌ"), "قُلْ هُوَ ٱللَّهُ أَحَدٌ", "Arabic is untouched");
});

test("names of people start each part with a capital", () => {
  assert.equal(properName("Khadijah bint khuwaylid"), "Khadijah bint Khuwaylid");
  assert.equal(properName("Dhu al-kifl"), "Dhu al-Kifl");
  assert.equal(properName("Juwayriya bint al-harith"), "Juwayriya bint al-Harith");
  assert.equal(properName("Abu Bakr as-Siddiq"), "Abu Bakr as-Siddiq");
});

test("reports text it cannot fix", () => {
  const warnings = suspectTextWarnings({
    a: { title: "Odd", intro: "She said 0 dear.", explanationContent: "", challenges: [] },
    b: { title: "Fine", intro: "There is no god but Allah.", explanationContent: "", challenges: [] }
  });
  assert.deepEqual(warnings, ['Odd: zero before a word in "She said 0 dear."']);
});

test("builds surah lessons that quote the opening ayah, never asking about its old English", () => {
  const { content } = importVault(sampleVault);
  const quran = content.sections.find((section) => section.topicId === "quran_tafseer");
  assert.deepEqual(quran.branches.map((branch) => branch.title), ["Surahs 103-112"]);
  assert.deepEqual(quran.nodes.map((node) => node.title), ["Surah Al-'Asr", "Surah Al-Kawthar", "Surah Al-Ikhlas"]);
  const ikhlas = content.lessonsById[quran.nodes[2].lessonIds[0]];
  assert.match(ikhlas.explanationContent, /112:1 Say: He is Allah, the One!/);
  assert.equal(ikhlas.sources.length, 1);
  assert.equal(ikhlas.sources[0].url, "https://quran.com/112");
  // The app shows the quoted ayah in Arabic (src/data/quranAyahs.ts); its source is that ayah's page.
  assert.deepEqual(ikhlas.quote, { text: "Say: He is Allah, the One!", reference: "Quran 112:1" });
  assert.equal(ikhlas.learnSource.url, "https://quran.com/112/1");
  assert.equal(ikhlas.learnSource.reference, "Quran 112:1");
  assert.ok(ikhlas.challenges.every((challenge) => !/this ayah/i.test(challenge.prompt)), "no question about the ayah's English");
  // Where Al-Ikhlas and Al-Kawthar were revealed is disputed (as-Suyuti, al-Itqan), so only Al-'Asr asks it.
  const revealedIn = (node) => content.lessonsById[node.lessonIds[0]].challenges.filter((challenge) => / was revealed in /.test(challenge.prompt));
  assert.deepEqual(quran.nodes.map((node) => revealedIn(node).length), [1, 0, 0]);
  const revealed = revealedIn(quran.nodes[0])[0];
  assert.equal(revealed.type, "true_false");
  assert.equal(revealed.correctChoiceId, revealed.prompt.endsWith("Makkah.") ? "true" : "false");
});

test("puts hadith notes in the Hadith topic and skips untagged people", () => {
  const result = importVault(sampleVault);
  const hadith = result.content.sections.find((section) => section.topicId === "hadith");
  assert.equal(hadith.nodes[0].title, "I believe in Allah", "a learner-facing title, not the book number");
  assert.equal(hadith.nodes[0].id, "notes-hadith-hadith-from-your-notes-sahih-muslim-134a", "the id still comes from the reference");
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

test("hadith lessons drop reference text and never offer cut choices", () => {
  const long = (n) => Array.from({ length: 30 }, (_, index) => `w${n}${index}`).join(" ");
  const hadith = (name, body, collection) => [`Hadith/${name}.md`, `---\ntype: hadith\ncollection: ${collection}\naliases:\n  - ${name}\n---\n${body}`];
  const vault = vaultWith(
    Object.fromEntries([
      hadith("Sahih Muslim 1", `The Messenger of Allah said: ${long(1)}`, "Sahih Muslim"),
      hadith("Mishkat 2", `Anas reported him saying, “${long(2)}” Baihaqi transmitted it in Shu'ab al-iman. Mishkat al-Masabih 3096`, "Mishkat al-Masabih"),
      hadith("Sahih Bukhari 3", `Narrated Umar: ${long(3)}`, "Sahih al-Bukhari")
    ])
  );
  const { content, warnings } = importVault(vault);
  for (const lesson of Object.values(content.lessonsById)) {
    assert.doesNotMatch(lesson.explanationContent, /transmitted|Mishkat al-Masabih 3096/);
    for (const challenge of lesson.challenges) {
      assert.doesNotMatch(challenge.prompt, /^Which narration/, "no \"which narration is in this book\" questions");
      assert.ok(challenge.choices.every((choice) => !choice.label.endsWith("...")), challenge.choices.map((choice) => choice.label).join(" | "));
    }
  }
  assert.ok(warnings.some((warning) => warning.includes("add lesson_title:, learn_line: and Q:/A: questions")), "a hadith without its own lesson asks for one");
});

test("a hadith note's own title, line, quote and questions make its lesson", () => {
  const vault = vaultWith({
    "Hadith/Smile.md": [
      "---",
      "type: hadith",
      "collection: Jami' at-Tirmidhi",
      "aliases:",
      "  - Jami' at-Tirmidhi 1956",
      "lesson_title: Smiling is charity",
      "learn_line: Smiling at your brother is a charity.",
      "quote: Your smiling in the face of your brother is charity.",
      "level: 1",
      "---",
      "Narrated Abu Dharr: that the Messenger of Allah (ﷺ) said: Your smiling in the face of your brother is charity. Grade: Sahih (Darussalam)",
      "",
      "Q: What does smiling at your brother count as?",
      "- [x] Charity",
      "- [ ] Wasting time",
      "- [ ] Showing off"
    ].join("\n"),
    "Hadith/Wrong quote.md": "---\ntype: hadith\ncollection: Sahih Muslim\naliases:\n  - Sahih Muslim 99\nlesson_title: Test\nlearn_line: Test line.\nquote: Words that are not in the note.\n---\nThe Prophet (ﷺ) said: Be kind.\n\nQ: Be kind.\nA: True"
  });
  const { content, warnings } = importVault(vault);
  const nodes = content.sections[0].nodes;
  const smile = nodes.find((node) => node.title === "Smiling is charity");
  assert.ok(smile, nodes.map((node) => node.title).join(", "));
  assert.match(smile.id, /jami-at-tirmidhi-1956$/);
  assert.equal(smile.difficulty, 1);
  const lesson = content.lessonsById[smile.lessonIds[0]];
  assert.equal(lesson.learnLine, "Smiling at your brother is a charity.");
  assert.deepEqual(lesson.quote, { text: "Your smiling in the face of your brother is charity.", reference: "Jami' at-Tirmidhi 1956 (Sahih, Darussalam)" });
  assert.equal(lesson.challenges[0].prompt, "What does smiling at your brother count as?");
  const wrong = content.lessonsById[nodes.find((node) => node.title === "Test").lessonIds[0]];
  assert.equal(wrong.quote, undefined, "a quote that is not in the note word for word is never shown");
  assert.ok(warnings.some((warning) => warning.includes("Sahih Muslim 99: the quote is not in the note word for word")));
});

test("names use one simple spelling", () => {
  assert.equal(plainName("Salmaan Al-Faarisiy"), "Salman al-Farisi");
  assert.equal(plainName("'Abd Allah Ibn Mas'uud"), "Abdullah ibn Mas'ud");
  assert.equal(plainName("Fatimah al-Zahra"), "Fatimah az-Zahra");
  assert.equal(plainName("Abdul-Rahman ibn Awf"), "Abd ar-Rahman ibn Awf");
  assert.equal(plainName("Khadijah bint khuwaylid"), "Khadijah bint Khuwaylid");
  assert.equal(displayName("'Lyaash ibn Abi Rabiyyah"), "'Ayyash ibn Abi Rabi'ah", "a hand-checked spelling wins");
  assert.equal(displayName("Noah"), "Nuh");
  assert.equal(displayName("Sulaiman"), "Sulayman");
  assert.equal(displayName("Shaleh"), "Salih");
  for (const shown of ["Nuh", "Sulayman", "Salih", "'Ayyash ibn Abi Rabi'ah", "Salman al-Farisi"]) assert.deepEqual(nameWarnings(shown, shown), [], shown);
  assert.equal(nameWarnings("Salmaan", "Salman").length, 1, "doubled vowels are reported");
  assert.ok(nameWarnings("'Lyaash ibn Abi Rabiyyah", "'Ayyash ibn Abi Rabi'ah").some((warning) => warning.includes("l typed for I")));
  assert.deepEqual(nameWarnings("Luqman", "Luqman"), [], "a real L is fine");
});

test("person lessons ask only about the facts on their learn card", () => {
  const person = (name, fields) => [`People/${name}.md`, `---\ntype: person\ntags: [Sahabi]\n${fields}\n---\nShe was a bitch in the story notes.`];
  const vault = vaultWith(
    Object.fromEntries([
      person("Salmaan Al-Faarisiy", "known_for: Suggested the trench\nfather: Unknown\nbirth_place: Isfahan\ndeath_place: Mada'in"),
      person("Bilal", "known_for: First muezzin\nfather: Rabah\nmother: Hamamah\nbirth_place: Makkah\ndeath_place: Damascus"),
      person("Zayd", "known_for: Named in the Quran\nfather: Harithah ibn Sharahil\nbirth_place: Najd or Makkah\ndeath_place: Mu'tah"),
      person("Suhaib", "known_for: Left his wealth for the Hijrah\nfather: Sinan\nbirth_place: Mosul\ndeath_place: Madinah")
    ])
  );
  const { content, warnings } = importVault(vault);
  const nodes = content.sections[0].nodes;
  assert.ok(nodes.some((node) => node.title === "Salman al-Farisi"), nodes.map((node) => node.title).join(", "));
  assert.ok(nodes.some((node) => node.id.endsWith("-salmaan-al-faarisiy")), "the id keeps the note name");
  assert.ok(warnings.some((warning) => warning.includes("doubled vowel")));
  for (const node of nodes) {
    const lesson = content.lessonsById[node.lessonIds[0]];
    assert.ok(lesson.learnLine && lesson.learnLine.split(/\s+/).length <= MAX_LINE_WORDS, `${node.title}: ${lesson.learnLine}`);
    assert.ok(lesson.learnFacts.length <= MAX_LEARN_FACTS && lesson.learnFacts.every((chip) => chip.split(/\s+/).length <= MAX_CHIP_WORDS), lesson.learnFacts.join(" | "));
    assert.ok(lesson.challenges.length >= 2 && lesson.challenges.length <= MAX_PERSON_QUESTIONS, node.title);
    assert.doesNotMatch(lesson.explanationContent, /bitch/, "a note's own study text is left out");
    assert.ok(!lesson.learnFacts.some((chip) => /Unknown| or /.test(chip)), "nothing the note is unsure of");
    for (const challenge of lesson.challenges) {
      const answer = challenge.choices.find((choice) => choice.id === challenge.correctChoiceId).label;
      const onCard = [lesson.learnLine, ...lesson.learnFacts].some((text) => text.includes(answer) || answer.includes(text.replace(/[.]$/, "")));
      assert.ok(onCard || challenge.prompt.includes(lesson.learnLine.replace(/^(He|She) /, "").replace(/[.]$/, "")), `${challenge.prompt} -> ${answer}`);
    }
  }
});

test("surah lessons keep choices short and suitable for children", () => {
  const ayah = (ref, text) => `### Quran ${ref}\nبِسْمِ ٱللَّهِ\n> ${text}`;
  const surah = (lines) => ["---", "type: surah", "---", ...lines].join("\n");
  const vault = vaultWith({
    "Quran/41 - Surah Fussilat.md": surah([
      "**English name:** Explained in Detail",
      "**Revelation:** Meccan",
      "**Ayahs:** 54",
      ayah("41:1", "Ha. Mim."),
      ayah("41:2", "A revelation from the Beneficent, the Merciful,"),
      ayah("41:3", "A Scripture whereof the verses are expounded, a Lecture in Arabic for people who have knowledge,"),
      ayah("41:4", "Good tidings and a warning. But most of them turn away so that they hear not."),
      ayah("41:5", "They do not commit fornication, and whoever does this shall meet a penalty."),
      ayah("41:6", "Say (unto them O Muhammad): I am only a mortal like you. It is inspired in me that your God is One God, therefor take the straight path unto Him and seek forgiveness of Him.")
    ]),
    "Quran/1 - Surah Al-Fatihah.md": surah(["**English name:** The Opening", "**Revelation:** Meccan", "**Ayahs:** 7", ayah("1:1", "In the name of Allah, the Beneficent, the Merciful.")]),
    "Quran/112 - Surah Al-Ikhlas.md": surah(["**English name:** The Sincerity", "**Revelation:** Meccan", "**Ayahs:** 4", ayah("112:1", "Say: He is Allah, the One!")])
  });
  const { content } = importVault(vault);
  const lessons = Object.values(content.lessonsById);
  assert.equal(lessons.length, 3);
  const fussilat = lessons.find((lesson) => lesson.title === "Surah Fussilat");
  assert.equal(fussilat.learnLine, 'Surah Fussilat means "Explained in Detail".');
  assert.deepEqual(fussilat.learnFacts, ["54 ayahs", "Revealed in Makkah"]);
  assert.ok(fussilat.quote && fussilat.quote.text.length <= MAX_CHOICE_LENGTH && fussilat.quote.reference.startsWith("Quran 41:"));
  assert.doesNotMatch(fussilat.explanationContent, ADULT_TEXT);
  for (const lesson of lessons) {
    for (const challenge of lesson.challenges) {
      for (const choice of challenge.choices) {
        assert.ok(choice.label.length <= MAX_CHOICE_LENGTH, choice.label);
        assert.doesNotMatch(choice.label, ADULT_TEXT);
        assert.notEqual(choice.label, "Ha. Mim.", "the opening letters are never a choice");
      }
    }
  }
});

test("a surah named after a person or its opening letters says so, and that name is never a meaning", () => {
  const surah = (english, revealed, ayahs, ...lines) =>
    ["---", "type: surah", "---", `**English name:** ${english}`, `**Revelation:** ${revealed}`, `**Ayahs:** ${ayahs}`, ...lines].join("\n");
  const vault = vaultWith({
    "Quran/36 - Surah Ya-Sin.md": surah("Ya Sin", "Meccan", 83, "### Quran 36:1", "> Ya Sin."),
    "Quran/38 - Surah Sad.md": surah('The Letter "Saad"', "Meccan", 88),
    "Quran/11 - Surah Hud.md": surah("Hud", "Meccan", 123),
    "Quran/86 - Surah At-Tariq.md": surah("The Nightcommer", "Meccan", 17),
    "Quran/112 - Surah Al-Ikhlas.md": surah("The Sincerity", "Meccan", 4),
    "Quran/113 - Surah Al-Falaq.md": surah("The Daybreak", "Meccan", 5),
    "Quran/114 - Surah An-Nas.md": surah("Mankind", "Meccan", 6)
  });
  const lessons = Object.values(importVault(vault).content.lessonsById);
  const byTitle = (title) => lessons.find((lesson) => lesson.title === title);
  assert.equal(byTitle("Surah Ya-Sin").learnLine, "Surah Ya-Sin is named after its opening letters, Ya Sin.");
  assert.equal(byTitle("Surah Sad").learnLine, "Surah Sad is named after its opening letter, Sad.");
  assert.equal(byTitle("Surah Hud").learnLine, "Surah Hud is named after Prophet Hud.");
  assert.equal(byTitle("Surah At-Tariq").learnLine, 'Surah At-Tariq means "The Nightcomer".');
  // An-Nas has 6 ayahs; the wrong counts are the nearest ones (4, 5, 17, 83 ...), never only big numbers.
  const count = byTitle("Surah An-Nas").challenges.find((challenge) => challenge.prompt.startsWith("How many ayahs"));
  const wrongCounts = count.choices.filter((choice) => choice.id !== count.correctChoiceId).map((choice) => Number(choice.label));
  assert.equal(wrongCounts.length, 3);
  assert.ok(wrongCounts.filter((value) => value <= 17).length >= 2, `wrong counts ${wrongCounts}`);
  for (const lesson of lessons) {
    assert.ok(lesson.learnLine.split(" ").length <= MAX_LINE_WORDS, lesson.learnLine);
    for (const challenge of lesson.challenges) {
      if (["Surah Ya-Sin", "Surah Sad", "Surah Hud"].includes(lesson.title)) assert.doesNotMatch(challenge.prompt, /What does the name/);
      for (const choice of challenge.choices) assert.ok(!["Ya Sin", "Hud", "The Letter Saad"].includes(choice.label), `${lesson.title}: ${choice.label}`);
    }
  }
});

test("fixes slips copied from the English names and Pickthall", () => {
  assert.equal(cleanText("Alif. Lam. Ra. These are verse of the Scripture that maketh plain."), "Alif. Lam. Ra. These are verses of the Scripture that maketh plain.");
  assert.equal(cleanText("The Nightcommer"), "The Nightcomer");
});

test("fixes a space typed after the article's hyphen and reports l for I and rude words", () => {
  assert.equal(cleanText("He said: Ad- Dajjal is blind."), "He said: Ad-Dajjal is blind.");
  const warnings = suspectTextWarnings({
    a: { title: "Typo", intro: "Narrated 'Lyaash ibn Abi Rabiyyah.", explanationContent: "", challenges: [] },
    b: { title: "Rude", intro: "What the shit.", explanationContent: "", challenges: [] },
    c: { title: "Fine", intro: "You'll see Luqman. The lying forelock (Quran 96:16).", explanationContent: "", challenges: [] }
  });
  assert.deepEqual(warnings, ['Typo: l typed for I in "Narrated \'Lyaash ibn Abi Rabiyyah."', 'Rude: rude word in "What the shit."']);
});

test("index and FAQ notes with a type but no questions are skipped quietly", () => {
  const vault = vaultWith({ "Quran/Quran.md": "---\ntype: index\n---\n## Table of Contents\n1. Surahs\n## Sources\nLinks here.\n## More\nText here." });
  const result = importVault(vault);
  assert.equal(result.stats.lessons, 0);
  assert.ok(result.warnings.some((warning) => warning.includes("1 notes skipped because their type")));
});

const hadithNote = (reference, url, text) =>
  ["---", "type: hadith", `collection: "${reference.replace(/\s+\d+\w*$/, "")}"`, "aliases:", `  - "${reference}"`, `source_url: "${url}"`, "tags:", "  - Hadith", "---", "", text, "", reference, url].join("\n");

test("a weak, repeated or hand-dropped hadith never becomes a lesson, and a lesson links its own page", () => {
  const vault = vaultWith({
    "Hadith/Sahih al-Bukhari 3276.md": hadithNote(
      "Sahih al-Bukhari 3276",
      "https://sunnah.com/bukhari:3276",
      "Narrated Abu Huraira: Allah's Messenger (ﷺ) said, \"Satan comes to one of you and says, 'Who created so-and-so? 'till he says, 'Who has created your Lord?' So, when he inspires such a question, one should seek refuge with Allah and give up such thoughts.\""
    ),
    // The same narration as Bukhari 3276, which is in the vault.
    "Hadith/Sahih Muslim 134a.md": hadithNote(
      "Sahih Muslim 134a",
      "https://sunnah.com/muslim:134a",
      "It is narrated on the authority of Abu Huraira that the Messenger of Allah (ﷺ) said: Men will continue to question one another till this is propounded: Allah created all things but who created Allah? He who found himself confronted with such a situation should say: I affirm my faith in Allah."
    ),
    "Hadith/Jami' at-Tirmidhi 1084.md": hadithNote(
      "Jami' at-Tirmidhi 1084",
      "https://sunnah.com/tirmidhi:1084",
      'Abu Hurairah narrated that: The Messenger of Allah said: "When someone whose religion and character you are pleased with proposes to (someone under the care) of one of you, then marry to him." Grade: Da\'if (Darussalam)'
    ),
    "Hadith/Sahih al-Bukhari 7407.md": hadithNote(
      "Sahih al-Bukhari 7407",
      "https://sunnah.com/bukhari:7407",
      'Narrated `Abdullah: Ad-Dajjal was mentioned in the presence of the Prophet. The Prophet (ﷺ) said, "Allah is not hidden from you; He is not one-eyed."'
    )
  });
  const { content, warnings } = importVault(vault);
  const hadith = content.sections.find((section) => section.topicId === "hadith");
  assert.deepEqual(
    hadith.nodes.map((node) => node.id.slice(node.branchId.length + 1)),
    ["sahih-al-bukhari-3276"],
    "Muslim 134a repeats Bukhari 3276, Tirmidhi 1084 is weak, Bukhari 7407 is left out by hand"
  );
  assert.ok(warnings.includes("Hadith: Jami' at-Tirmidhi 1084: graded Da'if; left out") || warnings.some((warning) => /Jami' at-Tirmidhi 1084: graded Da'if; left out/.test(warning)), warnings.join("\n"));
  assert.ok(!warnings.some((warning) => /Sahih Muslim 134a|Sahih al-Bukhari 7407/.test(warning)), "a lesson left out on purpose needs no title");
  const lesson = content.lessonsById[hadith.nodes[0].lessonIds[0]];
  assert.equal(lesson.learnSource.url, "https://sunnah.com/bukhari:3276");
  assert.equal(lesson.learnSource.reference, "Sahih al-Bukhari 3276");
  for (const challenge of lesson.challenges) assert.doesNotMatch(challenge.prompt, /\bthis hadith\b|\bsaid this\b|\bhere\b/i, challenge.prompt);
});

test("people: facts from the Isra'iliyyat and doubtful lines are left out, and so are people left off the path", () => {
  const person = (fields) => ["---", "type: person", ...Object.entries(fields).map(([key, value]) => (key === "tags" ? `tags:\n  - ${value}` : `${key}: "${value}"`)), "---"].join("\n");
  const vault = vaultWith({
    "People/prophets/ibrahim.md": person({ title: "Ibrahim", tags: "Prophet", known_for: "Khalilullah; built the Kaaba with Ismail", father: "Azar", birth_place: "Ur", death_place: "Hebron" }),
    "People/prophets/musa.md": person({ title: "Musa", tags: "Prophet", known_for: "Spoke with Allah; received the Tawrah", father: "Imran (father of Musa)", mother: "Yukabid" }),
    "People/women/umm-jamil.md": person({ title: "Umm Jamil", tags: "Mothers-of-the-Believers", known_for: "Carrier of firewood in Surah al-Masad", father: "Harb ibn Umayya", tribe: "Quraysh" }),
    "People/women/umm-kulthoom-bint-ali.md": person({
      title: "Umm Kulthoom bint 'Alī",
      tags: "Mothers-of-the-Believers",
      known_for: "Granddaughter of the Prophet ﷺ; married Umar ibn al-Khattab; survived Karbala",
      father: "Ali ibn Abi Talib",
      mother: "Fatima al-Zahra",
      birth_place: "Madinah"
    }),
    "People/women/umayma-bint-abd-al-muttalib.md": person({ title: "Umayma bint Abd al-Muttalib", tags: "Mothers-of-the-Believers", known_for: "Aunt of the Prophet ﷺ", father: "Abd al-Muttalib", mother: "Fatima bint Amr" })
  });
  const { content } = importVault(vault);
  const lessons = Object.values(content.lessonsById);
  const byTitle = (title) => lessons.find((lesson) => lesson.title === title);
  assert.equal(byTitle("Umm Jamil"), undefined, "Umm Jamil is not one of the women to look up to");

  const ibrahim = byTitle("Ibrahim");
  assert.deepEqual(ibrahim.learnFacts, ["Father: Azar"]);
  assert.doesNotMatch(JSON.stringify(ibrahim), /\bUr\b|Hebron/);
  assert.doesNotMatch(JSON.stringify(lessons), /Yukabid/, "parents' names only the Isra'iliyyat give");

  const ummKulthum = byTitle("Umm Kulthum bint Ali");
  assert.equal(ummKulthum.learnLine, "She was the Prophet's ﷺ granddaughter, daughter of Ali and Fatimah.");
  assert.doesNotMatch(JSON.stringify(ummKulthum), /Karbala/);

  // One spelling for a name on every screen: "Fatima" in a note is shown "Fatimah", as in the titles.
  const shown = JSON.stringify([byTitle("Umm Kulthum bint Ali"), byTitle("Umaymah bint Abd al-Muttalib")].map((lesson) => [lesson.learnFacts, lesson.challenges]));
  assert.doesNotMatch(shown, /\bFatima\b/);
  assert.match(shown, /Fatimah bint Amr/);
});

test("a surah's meaning is the simple one children learn, and old English ayahs stay out of the lesson", () => {
  const surah = (english, ...ayahs) => ["---", "type: surah", "---", `**English name:** ${english}`, "**Revelation:** Meccan", ...ayahs].join("\n");
  const vault = vaultWith({
    "Quran/104 - Surah Al-Humazah.md": surah(
      "The Traducer",
      "### Quran 104:1",
      "> Woe unto every slandering traducer,",
      "### Quran 104:2",
      "> Who hath gathered wealth (of this world) and arranged it."
    )
  });
  const [lesson] = Object.values(importVault(vault).content.lessonsById);
  assert.equal(lesson.learnLine, 'Surah Al-Humazah means "The Backbiter".');
  assert.doesNotMatch(lesson.explanationContent, /unto|hath/);
  assert.equal(lesson.quote.reference, "Quran 104:1", "the app shows this ayah in Arabic");
});

test("round 5: gentle words for children, names that read right, and no wrong choice that names the person", () => {
  const person = (fields) => ["---", "type: person", ...Object.entries(fields).map(([key, value]) => (key === "tags" ? `tags:\n  - ${value}` : `${key}: "${value}"`)), "---"].join("\n");
  const vault = vaultWith({
    "People/sahabah/khabbaab-ibn-al-arat.md": person({ title: "Khabbaab Ibn Al-Arat", tags: "Sahabi", known_for: "One of the earliest converts; enslaved swordsmith tortured for Islam", death_place: "Kufa" }),
    "People/sahabah/abu-hurayra.md": person({ title: "Abu Hurayra", tags: "Sahabi", known_for: "Narrated the most hadith", death_place: "Madinah" }),
    "People/sahabah/sad-ibn-muaadh.md": person({ title: "Sa'd ibn Mu'aadh", tags: "Sahabi", known_for: "Chief of the Aws", death_place: "Madinah" }),
    "People/sahabah/abu-umamah-al-bahili.md": person({ title: "Abu Umamah al-Bahili", tags: "Sahabi", known_for: "Last companion to die in Syria", death_place: "Homs" }),
    "People/prophets/yahya.md": person({ title: "Yahya", tags: "Prophet", known_for: "Confirmed the coming of Isa", father: "Zakariyya" }),
    "People/prophets/zakaria.md": person({ title: "Zakaria", tags: "Prophet", known_for: "Guardian of Maryam; father of Yahya" }),
    "People/prophets/musa.md": person({ title: "Musa", tags: "Prophet", known_for: "Spoke with Allah; received the Tawrah" }),
    "People/prophets/lut.md": person({ title: "Lut", tags: "Prophet", known_for: "Nephew of Ibrahim; sent to Sodom" }),
    "People/prophets/yunus.md": person({ title: "Yunus", tags: "Prophet", known_for: "Swallowed by the whale" }),
    "People/women/grandmother-of-isa-wife-of-imran.md": person({ title: "Grandmother of Isa / Wife of Imran", tags: "Mothers-of-the-Believers", known_for: "Dedicated Maryam to Allah before her birth" }),
    "People/women/hajar.md": person({ title: "Hajar", tags: "Mothers-of-the-Believers", known_for: "Mother of Ismail" }),
    "People/women/sarah.md": person({ title: "Sarah", tags: "Mothers-of-the-Believers", known_for: "Wife of Ibrahim" }),
    "People/women/aminah.md": person({ title: "Aminah bint Wahb", tags: "Mothers-of-the-Believers", known_for: "Mother of the Prophet" }),
    "People/women/khawlah-bint-jafar-al-hanifiyyah.md": person({ title: "Khawlah bint Ja'far al-Hanifiyyah", tags: "Mothers-of-the-Believers", known_for: "Wife of Ali", father: "Ja'far ibn Qays", tribe: "Banu Hanifa" }),
    "People/women/zaynab-bint-jahsh.md": person({ title: "Zaynab bint Jahsh", tags: "Mothers-of-the-Believers", known_for: "Cousin and wife of the Prophet", father: "Jahsh ibn Riyab", tribe: "Quraysh", birth_place: "Makkah" }),
    "Hadith/2930a.md": [
      "---",
      "type: hadith",
      "collection: Sahih Muslim",
      "aliases:",
      "  - Sahih Muslim 2930a",
      "level: 3",
      "---",
      "'Umar said: Allah's Messenger, permit me that I should strike his neck. He said: there is no good for you to kill him. Then he made a mention of the Dajjal and said: I warn you of him and there is no Prophet who has not warned his people against the Dajjal. He is one-eyed."
    ].join("\n")
  });
  const { content } = importVault(vault);
  const lessons = Object.values(content.lessonsById);
  const byTitle = (title) => lessons.find((lesson) => lesson.title === title);

  // Khabbab: the Sahabah path opens on day one, so nothing on his lesson says "tortured".
  const khabbab = byTitle("Khabbab ibn al-Aratt");
  assert.equal(khabbab.learnLine, "He was one of the first Muslims and stayed firm in Islam.");
  assert.doesNotMatch(JSON.stringify(khabbab), /tortur/i);
  assert.equal(khabbab.keyTakeaway, undefined);

  // A narration with violence in it keeps only the words its card shows.
  assert.match("permit me that I should strike his neck", FRIGHTENING_TEXT);
  assert.doesNotMatch("Every prophet warned his people about the Dajjal.", FRIGHTENING_TEXT);
  const dajjal = byTitle("Every prophet warned");
  assert.ok(dajjal, lessons.map((lesson) => lesson.title).join(", "));
  for (const text of [dajjal.intro, dajjal.explanationContent, ...dajjal.challenges.flatMap((challenge) => [challenge.prompt, challenge.explanation])]) {
    assert.doesNotMatch(text ?? "", FRIGHTENING_TEXT, text);
  }
  assert.equal(dajjal.explanationContent, "I warn you of him and there is no Prophet who has not warned his people against the Dajjal.");
  const seeded = JSON.stringify(importVault(vault).backend.topics.hadith);
  assert.doesNotMatch(seeded, /neck|kill|one-eyed/);

  // "The wife of Imran" reads "the wife of Imran" inside a sentence and "The wife of Imran" as a title or answer.
  assert.equal(nameInSentence("Wife of Imran"), "the wife of Imran");
  assert.equal(nameInSentence("The wife of Imran"), "the wife of Imran");
  assert.equal(nameInSentence("Hajar"), "Hajar");
  assert.equal(nameInSentence("Umm Salamah"), "Umm Salamah");
  const imran = byTitle("The wife of Imran");
  const prompts = imran.challenges.map((challenge) => challenge.prompt);
  assert.ok(!prompts.some((prompt) => /\bWife of Imran\b/.test(prompt)), prompts.join(" | "));
  const labels = imran.challenges.flatMap((challenge) => challenge.choices.map((choice) => choice.label));
  assert.ok(!labels.includes("Wife of Imran"), labels.join(" | "));

  // Khawlah of Banu Hanifah is al-Hanafiyyah, as in the Arabic; her id keeps the note's spelling.
  const khawlah = content.sections.flatMap((section) => section.nodes).find((node) => node.id.endsWith("khawlah-bint-jafar-al-hanifiyyah"));
  assert.equal(khawlah.title, "Khawlah bint Ja'far al-Hanafiyyah");

  // Zaynab bint Jahsh was al-Asadiyyah, of Banu Asad ibn Khuzaymah, allies of Quraysh: her note's "Quraysh" is
  // not asked. Someone whose tribe is certain keeps it on the learn card.
  const zaynab = byTitle("Zaynab bint Jahsh");
  assert.ok(!zaynab.challenges.some((challenge) => /tribe/i.test(challenge.prompt)), zaynab.challenges.map((challenge) => challenge.prompt).join(" | "));
  assert.doesNotMatch(JSON.stringify(zaynab), /Tribe: Quraysh|was from Quraysh/);
  assert.ok(!zaynab.learnFacts.some((fact) => fact.startsWith("Tribe")), zaynab.learnFacts.join(" | "));
  assert.ok(byTitle("Khawlah bint Ja'far al-Hanafiyyah").learnFacts.includes("Tribe: Banu Hanifa"));

  // A wrong choice never names the person asked about: Zakariyya's line names Yahya.
  for (const lesson of lessons) {
    for (const challenge of lesson.challenges) {
      const wrong = challenge.choices.filter((choice) => choice.id !== challenge.correctChoiceId).map((choice) => choice.label);
      assert.ok(!wrong.some((label) => new RegExp(`\\b${lesson.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(label)), `${lesson.title}: ${challenge.prompt} ${wrong.join(" | ")}`);
    }
  }
});

test("round 7: every surah meaning is in title case, and a father is spelled as in his child's name", () => {
  // Quran.com's "The Small kindnesses" (107) and "Those who drag forth" (79) are written like the others.
  assert.equal(titleCase("The Small kindnesses"), "The Small Kindnesses");
  assert.equal(titleCase("Those who drag forth"), "Those Who Drag Forth");
  assert.equal(titleCase("Those who set the Ranks"), "Those Who Set the Ranks");
  assert.equal(titleCase("She that is to be examined"), "She That Is to Be Examined");
  for (const meaning of ["The Mansions of the Stars", "The Congregation, Friday", "Explained in Detail", "The Wind-Curved Sandhills", "He Frowned"]) {
    assert.equal(titleCase(meaning), meaning, "a meaning already in title case is kept");
  }
  const surah = (english) => ["---", "type: surah", "---", `**English name:** ${english}`, "**Revelation:** Meccan", "**Ayahs:** 7"].join("\n");
  const surahs = importVault(
    vaultWith({
      "Quran/107 - Surah Al-Ma'un.md": surah("The Small kindnesses"),
      "Quran/79 - Surah An-Nazi'at.md": surah("Those who drag forth"),
      "Quran/44 - Surah Ad-Dukhan.md": surah("The Smoke"),
      "Quran/95 - Surah At-Tin.md": surah("The Fig")
    })
  );
  const maun = Object.values(surahs.content.lessonsById).find((lesson) => lesson.title === "Surah Al-Ma'un");
  assert.equal(maun.learnLine, 'Surah Al-Ma\'un means "The Small Kindnesses".');
  const meaningQuestion = maun.challenges.find((challenge) => challenge.prompt === "What does the name Surah Al-Ma'un mean?");
  assert.equal(meaningQuestion.choices.find((choice) => choice.id === meaningQuestion.correctChoiceId).label, "The Small Kindnesses");
  const shown = Object.values(surahs.content.lessonsById).flatMap((lesson) => lesson.challenges.flatMap((challenge) => challenge.choices.map((choice) => choice.label)));
  assert.ok(shown.includes("Those Who Drag Forth") && !shown.some((label) => /kindnesses|who drag/.test(label)), shown.join(" | "));

  // The name after ibn or bint is the father's (or a forefather's), spelled the same way; Abi is Abu after ibn.
  assert.equal(fatherSpellingMismatch("Abu al-As ibn ar-Rabi'", "Ar-Rabi ibn Abd al-Uzza"), "Ar-Rabi'");
  assert.equal(fatherSpellingMismatch("Walid ibn al-Walid ibn al-Mughirah", "Walid ibn al-Mughirah"), "Al-Walid");
  assert.equal(fatherSpellingMismatch("Khalid ibn al-Walid", "Walid ibn al-Mughirah"), "Al-Walid");
  assert.equal(fatherSpellingMismatch("Abu al-As ibn ar-Rabi'", "Ar-Rabi'ah ibn Abd al-Uzza"), "Ar-Rabi'", "another name that starts the same way is not the same name");
  for (const [name, father] of [
    ["Abu al-As ibn ar-Rabi'", "Ar-Rabi' ibn Abd al-Uzza"],
    ["Walid ibn al-Walid ibn al-Mughirah", "Al-Walid ibn al-Mughirah"],
    ["Az-Zubayr ibn al-Awwam", "Al-Awwam ibn Khuwaylid"],
    ["Ali ibn Abi Talib", "Abu Talib"],
    ["Aishah bint Abi Bakr", "Abu Bakr as-Siddiq"],
    ["Hamzah ibn Abd al-Muttalib", "Abd al-Muttalib"],
    ["Abdullah ibn Amr ibn al-As", "Amr ibn al-As"],
    ["Abu Ubaydah ibn al-Jarrah", "Abdullah ibn al-Jarrah"],
    ["Ruqayyah bint Muhammad", "Muhammad ﷺ"],
    ["Khawlah bint Ja'far al-Hanafiyyah", "Ja'far ibn Qays"],
    ["Abu Bakr as-Siddiq", "Abu Quhafah"]
  ]) {
    assert.equal(fatherSpellingMismatch(name, father), undefined, `${name}: ${father}`);
  }
  assert.equal(displayName("Walid ibn al-Mughira"), "Al-Walid ibn al-Mughirah");
  assert.equal(displayName("Al-Rabi ibn Abd al-Uzza"), "Ar-Rabi' ibn Abd al-Uzza");

  const person = (fields) => ["---", "type: person", "tags:", "  - Sahabi", ...Object.entries(fields).map(([key, value]) => `${key}: "${value}"`), "---"].join("\n");
  const { content, warnings } = importVault(
    vaultWith({
      "People/sahabah/abu-al-as-ibn-al-rabi.md": person({ title: "Abu al-As ibn al-Rabi", known_for: "Son-in-law of the Prophet", father: "Al-Rabi ibn Abd al-Uzza", tribe: "Quraysh" }),
      "People/sahabah/walid-ibn-al-walid-ibn-al-mughirah.md": person({ title: "Walid ibn al-Walid ibn al-Mughirah", known_for: "Brother of Khalid", father: "Walid ibn al-Mughira", tribe: "Quraysh" }),
      "People/sahabah/zubayr-ibn-al-awwam.md": person({ title: "Zubayr ibn al-Awwam", known_for: "One of the ten promised Paradise", father: "Awwam ibn Khuwaylid", tribe: "Quraysh" }),
      "People/sahabah/said-ibn-al-musayyab.md": person({ title: "Sa'id ibn al-Musayyab", known_for: "A great scholar of Madinah", father: "Musayyab ibn Hazn", tribe: "Quraysh" })
    })
  );
  const lessons = Object.values(content.lessonsById);
  const byTitle = (title) => lessons.find((lesson) => lesson.title === title);
  assert.ok(byTitle("Abu al-As ibn ar-Rabi'").learnFacts.includes("Father: Ar-Rabi' ibn Abd al-Uzza"));
  const walid = byTitle("Walid ibn al-Walid ibn al-Mughirah");
  assert.ok(walid.learnFacts.includes("Father: Al-Walid ibn al-Mughirah"));
  const fatherQuestion = walid.challenges.find((challenge) => challenge.prompt.startsWith("Who was the father of"));
  assert.equal(fatherQuestion.choices.find((choice) => choice.id === fatherQuestion.correctChoiceId).label, "Al-Walid ibn al-Mughirah");
  assert.equal(fatherQuestion.explanation, "The father of Walid ibn al-Walid ibn al-Mughirah was Al-Walid ibn al-Mughirah.");
  // A father spelled another way than in the child's name is reported, so a new note gets a DISPLAY_NAMES entry.
  const spelling = warnings.filter((warning) => warning.includes("the father is shown as"));
  assert.equal(spelling.length, 1, spelling.join("\n"));
  assert.match(spelling[0], /"Musayyab ibn Hazn" but "Sa'id ibn al-Musayyab" spells him "Al-Musayyab"/);
});
