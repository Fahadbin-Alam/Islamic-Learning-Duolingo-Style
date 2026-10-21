import { COURSE, LESSONS_BY_ID } from "../data/course";
import { FOUNDATION_QUESTION_BANK } from "../data/foundationQuestionBank";
import type { Challenge, LessonSource } from "../types";

// Content checks across every question the app ships. Each test collects all
// problems first so one run lists everything that needs fixing.

const lessons = Object.values(LESSONS_BY_ID);
const challenges: Challenge[] = lessons.flatMap((lesson) => lesson.challenges);

const BROKEN_TEXT = [
  { name: "template leak", pattern: /\$\{|\bundefined\b|\bNaN\b|\[object Object\]/ },
  { name: "double period", pattern: /[^.]\.\.(?!\.)/ },
  { name: "double space", pattern: / {2,}/ },
  { name: "space before punctuation", pattern: / [,.;:?!]/ }
];

// Names the generated curriculum once lowercased mid-sentence ("the life of bilal ibn rabah").
const PROPER_NAMES = [
  "Abu Bakr",
  "Umar",
  "Uthman",
  "Ali ibn Abi Talib",
  "Bilal",
  "Khalid",
  "Salman",
  "Anas",
  "Allah",
  "Quran",
  "Ramadan",
  "Arafah",
  "Makkah",
  "Maryam",
  "Khadijah",
  "Aishah",
  "Hafsah",
  "Yusuf",
  "Musa",
  "Ibrahim"
];

function textIssues(text: string) {
  const issues = BROKEN_TEXT.filter(({ pattern }) => pattern.test(text)).map(({ name }) => name);
  for (const name of PROPER_NAMES) {
    if (new RegExp(`(^|[^A-Za-z'-])${name.toLowerCase()}([^A-Za-z]|$)`).test(text)) {
      issues.push(`lowercased name "${name}"`);
    }
  }
  return issues;
}

function challengeTexts(challenge: Challenge) {
  return [
    challenge.prompt,
    challenge.explanation,
    challenge.miniLesson,
    challenge.easierExplanation,
    challenge.reviewSuggestion,
    ...challenge.choices.map((choice) => choice.label)
  ].filter((text): text is string => Boolean(text));
}

describe("lesson questions", () => {
  test("the course has lessons and questions", () => {
    expect(lessons.length).toBeGreaterThan(500);
    // Fewer, shorter companion units since round 3: each teaches its own facts, with no filler lessons.
    expect(challenges.length).toBeGreaterThan(1500);
  });

  test("every lesson has at least one question", () => {
    expect(lessons.filter((lesson) => lesson.challenges.length === 0).map((lesson) => lesson.id)).toEqual([]);
  });

  test("question ids are unique", () => {
    const seen = new Set<string>();
    const duplicates = challenges.filter((challenge) => {
      const duplicate = seen.has(challenge.id);
      seen.add(challenge.id);
      return duplicate;
    });
    expect(duplicates.map((challenge) => challenge.id)).toEqual([]);
  });

  test("every question has a prompt, an explanation, and an answer among distinct options", () => {
    const problems: string[] = [];
    for (const challenge of challenges) {
      const ids = challenge.choices.map((choice) => choice.id);
      const labels = challenge.choices.map((choice) => choice.label.trim().toLowerCase());
      if (!challenge.prompt.trim()) problems.push(`${challenge.id}: empty prompt`);
      if (!challenge.explanation.trim()) problems.push(`${challenge.id}: empty explanation`);
      if (!ids.includes(challenge.correctChoiceId)) problems.push(`${challenge.id}: answer not among options`);
      if (new Set(ids).size !== ids.length) problems.push(`${challenge.id}: duplicate option ids`);
      if (new Set(labels).size !== labels.length) problems.push(`${challenge.id}: duplicate option text`);
      if (labels.some((label) => !label)) problems.push(`${challenge.id}: empty option`);
      if (challenge.type === "multiple_choice" && ids.length < 3) problems.push(`${challenge.id}: fewer than three options`);
      if (challenge.type === "true_false" && [...ids].sort().join(",") !== "false,true") {
        problems.push(`${challenge.id}: true/false options are not exactly True and False`);
      }
    }
    expect(problems).toEqual([]);
  });

  test("question text has no broken formatting or lowercased names", () => {
    const problems = challenges.flatMap((challenge) =>
      challengeTexts(challenge).flatMap((text) => textIssues(text).map((issue) => `${challenge.id}: ${issue} in "${text}"`))
    );
    const lessonProblems = lessons.flatMap((lesson) =>
      [lesson.title, lesson.intro, lesson.explanationContent ?? ""].flatMap((text) =>
        textIssues(text).map((issue) => `${lesson.id}: ${issue} in "${text}"`)
      )
    );
    expect([...problems, ...lessonProblems]).toEqual([]);
  });

  test("the correct answer is not predictable from its position", () => {
    const multipleChoice = challenges.filter((challenge) => challenge.type === "multiple_choice");
    const firstSlot = multipleChoice.filter((challenge) => challenge.choices[0]?.id === challenge.correctChoiceId).length;
    expect(firstSlot / multipleChoice.length).toBeLessThan(0.4);

    const trueFalse = challenges.filter((challenge) => challenge.type === "true_false");
    const trueShare = trueFalse.filter((challenge) => challenge.correctChoiceId === "true").length / trueFalse.length;
    expect(trueShare).toBeGreaterThan(0.25);
    expect(trueShare).toBeLessThan(0.75);
  });
});

describe("lesson sources", () => {
  const sources = new Map<string, LessonSource>();
  for (const lesson of lessons) {
    for (const source of [...lesson.sources, ...(lesson.sourceReferences ?? [])]) {
      sources.set(`${source.id}|${source.reference}|${source.url}`, source);
    }
  }
  const hadith = [...sources.values()].filter((source) => source.category === "hadith");

  test("every hadith source names its reference, narrator, and grade", () => {
    const problems = hadith
      .filter((source) => !source.reference?.trim() || !source.from?.trim() || !source.grade?.trim())
      .map((source) => source.id);
    expect(problems).toEqual([]);
  });

  test("a hadith citation is one checked hadith, not a placeholder or a narrator's page", () => {
    const shown = [...hadith, ...lessons.map((lesson) => lesson.learnSource).filter((source): source is LessonSource => source?.category === "hadith")];
    const problems = shown
      .filter((source) => /imported from obsidian|see sunnah\.com grading/i.test(`${source.from} ${source.grade}`) || /sunnah\.com\/narrator\//.test(source.url))
      .map((source) => `${source.id}: ${source.url} (${source.from}; ${source.grade})`);
    expect(problems).toEqual([]);
  });

  test("hadith links point at the hadith number they cite", () => {
    const problems: string[] = [];
    for (const source of hadith) {
      const number = source.reference?.match(/(\d+[a-z]?)\s*$/)?.[1];
      const linked = source.url.match(/sunnah\.com\/[a-z]+:(\d+[a-z]?)/)?.[1];
      // In-book links like sunnah.com/muslim/16/3 carry no hadith number to compare.
      if (number && linked && number !== linked) {
        problems.push(`${source.id}: cites ${source.reference} but links ${source.url}`);
      }
    }
    expect(problems).toEqual([]);
  });

  test("the same hadith number is never described with different narrators", () => {
    const narratorsByReference = new Map<string, Set<string>>();
    for (const source of hadith) {
      const reference = source.reference?.replace(/`/g, "").replace(/\s+/g, " ").trim() ?? "";
      const narrator = (source.from ?? "").split(";")[0].trim();
      if (!narratorsByReference.has(reference)) narratorsByReference.set(reference, new Set());
      narratorsByReference.get(reference)!.add(narrator);
    }
    // "Abu Musa al-Ashari" and "Abu Burda reporting from Abu Musa al-Ashari" agree; only
    // narrators where neither name contains the other point at a wrong citation.
    const agree = (a: string, b: string) => a.toLowerCase().includes(b.toLowerCase()) || b.toLowerCase().includes(a.toLowerCase());
    const conflicts = [...narratorsByReference.entries()]
      .filter(([, narrators]) => [...narrators].some((a) => [...narrators].some((b) => !agree(a, b))))
      .map(([reference, narrators]) => `${reference}: ${[...narrators].join(" / ")}`);
    expect(conflicts).toEqual([]);
  });
});

describe("lessons imported from notes", () => {
  const imported = lessons.filter((lesson) => lesson.id.startsWith("lesson-notes-"));
  const surahOf = (url?: string) => Number(/^https:\/\/quran\.com\/(\d+)(?:[/?#]|$)/.exec(url ?? "")?.[1]) || undefined;

  test("unit names are written for learners", () => {
    const names = COURSE.sections.flatMap((section) => section.branches.map((branch) => `${branch.title} | ${branch.description}`));
    expect(names.filter((name) => /your notes/i.test(name))).toEqual([]);
  });

  test("a surah with its own unit is taught there, not a second time in a list", () => {
    const quran = COURSE.sections.find((section) => section.topicId === "quran_tafseer")!;
    const ownUnit = new Map(quran.branches.filter((branch) => branch.surahName).map((branch) => [surahOf(branch.sourceReferences?.[0]?.url), branch.id]));
    const problems = quran.nodes
      .map((node) => ({ node, surah: surahOf(LESSONS_BY_ID[node.lessonIds[0]].sources[0]?.url) }))
      .filter(({ node, surah }) => node.id.startsWith("notes-") && surah && ownUnit.has(surah) && ownUnit.get(surah) !== node.branchId)
      .map(({ node }) => node.id);
    expect(problems).toEqual([]);
  });

  test("Quran units follow the learning order: Al-Fatihah, Juz Amma from An-Nas back, then the mushaf", () => {
    const quran = COURSE.sections.find((section) => section.topicId === "quran_tafseer")!;
    const rank = (surah: number) => (surah === 1 ? 0 : surah >= 78 ? 1 + (114 - surah) : 100 + surah);
    // A lesson's first source may be the hadith its card says (Ayat al-Kursi, Sahih Muslim 810); its surah is
    // the first Quran source it lists.
    const surahOfNode = (node: (typeof quran.nodes)[number]) =>
      LESSONS_BY_ID[node.lessonIds[0]].sources.map((source) => surahOf(source.url)).find((surah) => surah !== undefined);
    const surahs = quran.nodes.map(surahOfNode).filter((surah): surah is number => surah !== undefined);
    const firstOfUnit = quran.branches.map((branch) =>
      Math.min(...quran.nodes.filter((node) => node.branchId === branch.id).map((node) => surahOfNode(node)).filter((surah): surah is number => surah !== undefined).map(rank))
    );
    expect(firstOfUnit).toEqual([...firstOfUnit].sort((left, right) => left - right));
    expect(quran.branches[0].title).toBe("Surah Al-Fatihah");
    // Right after Al-Fatihah: An-Nas, Al-Falaq, Al-Ikhlas, Al-Masad.
    expect([...new Set(surahs)].slice(0, 5)).toEqual([1, 114, 113, 112, 111]);
  });

  test("a lesson about one person stays short and opens with what they are known for", () => {
    const people = imported.filter((lesson) => /^lesson-notes-(sahabah|prophets|women-of-the-book)-/.test(lesson.id));
    expect(people.length).toBeGreaterThan(100);
    expect(people.filter((lesson) => lesson.challenges.length > 4 || /^Known for:/.test(lesson.intro)).map((lesson) => lesson.id)).toEqual([]);
  });

  test("text has no typing slips from older translations and one way of spelling names", () => {
    const slips = [/(^|[\s"“:(,])0 [A-Za-z]/, /\b(an|any|no|other) Allah\b/, /[\u00C0-\u024F\u1E00-\u1EFF]/];
    const problems = imported.flatMap((lesson) =>
      [lesson.title, lesson.intro, lesson.explanationContent ?? "", ...lesson.challenges.flatMap(challengeTexts)]
        .filter((text) => slips.some((pattern) => pattern.test(text)))
        .map((text) => `${lesson.id}: "${text.slice(0, 80)}"`)
    );
    expect(problems).toEqual([]);
  });
});

describe("placement questions", () => {
  test("question ids are unique", () => {
    const ids = FOUNDATION_QUESTION_BANK.map((question) => question.id);
    expect(ids.filter((id, index) => ids.indexOf(id) !== index)).toEqual([]);
  });

  test("every question is answerable from what it shows", () => {
    const problems: string[] = [];
    for (const question of FOUNDATION_QUESTION_BANK) {
      const where = question.id;
      const options = question.options ?? [];
      const answer = question.correctAnswer;
      if (!question.prompt.trim()) problems.push(`${where}: empty prompt`);
      if (!question.explanationShort.trim()) problems.push(`${where}: empty short explanation`);
      if (new Set(options.map((option) => option.trim().toLowerCase())).size !== options.length) {
        problems.push(`${where}: duplicate options`);
      }
      problems.push(
        ...[question.prompt, question.scenario ?? "", question.explanationShort, question.explanationLong, ...options].flatMap((text) =>
          textIssues(text).map((issue) => `${where}: ${issue} in "${text}"`)
        )
      );

      switch (question.type) {
        case "true_false":
          if (options.join(",") !== "True,False" || !["True", "False"].includes(String(answer))) {
            problems.push(`${where}: true/false needs True/False options and answer`);
          }
          break;
        case "multi_select":
          if (!Array.isArray(answer) || answer.length === 0 || answer.some((item) => !options.includes(item))) {
            problems.push(`${where}: multi-select answers must all be options`);
          }
          if (Array.isArray(answer) && answer.length === options.length) {
            problems.push(`${where}: multi-select has no wrong option`);
          }
          break;
        case "correct_order":
          if (!Array.isArray(answer) || answer.length < 2 || (question.orderItems && [...question.orderItems].sort().join("|") !== [...answer].sort().join("|"))) {
            problems.push(`${where}: correct order must list the items to order`);
          }
          break;
        case "match_pairs": {
          const pairs = question.pairs ?? [];
          const expected = Object.fromEntries(pairs.map((pair) => [pair.left, pair.right]));
          if (pairs.length < 2 || JSON.stringify(expected) !== JSON.stringify(answer)) {
            problems.push(`${where}: match pairs must agree with the answer`);
          }
          break;
        }
        case "fill_in_blank":
          if (typeof answer !== "string" || !question.prompt.includes("____")) {
            problems.push(`${where}: fill in the blank needs a blank and a text answer`);
          } else if (!(question.acceptedAnswers ?? []).includes(answer.toLowerCase())) {
            problems.push(`${where}: accepted answers must include the answer`);
          }
          break;
        case "reflection_prompt":
          break;
        default:
          if (typeof answer !== "string" || !options.includes(answer)) {
            problems.push(`${where}: answer must be one of the options`);
          }
          if (options.length < 2) problems.push(`${where}: fewer than two options`);
      }
    }
    expect(problems).toEqual([]);
  });

  test("the correct answer is not predictable from its position", () => {
    const singleAnswer = FOUNDATION_QUESTION_BANK.filter(
      (question) => typeof question.correctAnswer === "string" && (question.options?.length ?? 0) > 2
    );
    const firstSlot = singleAnswer.filter((question) => question.options?.[0] === question.correctAnswer).length;
    expect(firstSlot / singleAnswer.length).toBeLessThan(0.4);
  });
});
