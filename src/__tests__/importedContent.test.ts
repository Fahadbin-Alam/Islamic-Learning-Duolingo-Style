import { COURSE, LESSONS_BY_ID } from "../data/course";
import { surahLearningRank } from "../data/importedNotes";
import type { Lesson, TopicId } from "../types";

// Checks on the lessons imported from the Obsidian notes (scripts/obsidian-import) as the course shows
// them: where they sit on the path, and that each one is short, true to its learn card and fit for a child.

const section = (topicId: TopicId) => {
  const found = COURSE.sections.find((each) => each.topicId === topicId);
  if (!found) throw new Error(`no ${topicId} section`);
  return found;
};
const lessonOf = (nodeId: string): Lesson | undefined => Object.values(LESSONS_BY_ID).find((lesson) => lesson.nodeId === nodeId);
const imported = Object.values(LESSONS_BY_ID).filter((lesson) => lesson.id.startsWith("lesson-notes-"));
const topicOf = (lesson: Lesson) => COURSE.sections.find((each) => each.nodes.some((node) => node.id === lesson.nodeId))?.topicId;
const asked = (lesson: Lesson) => lesson.challenges.filter((challenge) => !challenge.isReview);
const words = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;
const surahNumber = (lesson: Lesson | undefined) => Number(/quran\.com\/(\d+)$/.exec(lesson?.sources[0]?.url ?? "")?.[1]);

// The same words as scripts/obsidian-import/facts.mjs uses to keep adult text out of children's choices.
const ADULT_TEXT = /\b(fornicat|adulter|concubine|harlot|whore|lewd|incest|lust|sexual|intercourse|private parts|menstrua|genital|unchast|naked|nudity)\w*/i;
const LETTERS_ONLY = /^(?:(?:Alif|Lam|Mim|Ra|Sad|Kaf|Ha|Ya|'?Ain|Ta|Sin|Qaf|Nun|Ta-Ha|Ya-Sin)\b[.,]?\s*)+$/i;
const PEOPLE_TOPICS: TopicId[] = ["sahabah", "prophets", "women_of_the_book"];

describe("imported lessons on the path", () => {
  it("starts Sahabah with the four caliphs, before the companions from the notes", () => {
    const branches = section("sahabah").branches.map((branch) => branch.id);
    expect(branches.slice(0, 4)).toEqual(["sahabi-abu-bakr", "sahabi-umar-ibn-al-khattab", "sahabi-uthman-ibn-affan", "sahabi-ali-ibn-abi-talib"]);
    const firstImported = branches.findIndex((id) => id.startsWith("notes-"));
    expect(branches.slice(firstImported).every((id) => id.startsWith("notes-"))).toBe(true);
  });

  it("puts the built-in prophets and women first, then the people from the notes", () => {
    for (const topicId of ["prophets", "women_of_the_book"] as TopicId[]) {
      const branches = section(topicId).branches.map((branch) => branch.id);
      const firstImported = branches.findIndex((id) => id.startsWith("notes-"));
      expect(firstImported).toBeGreaterThan(0);
      expect(branches.slice(firstImported).every((id) => id.startsWith("notes-"))).toBe(true);
    }
  });

  it("reaches Juz Amma right after Al-Fatihah, starting from An-Nas", () => {
    const quran = section("quran_tafseer");
    const surahs = quran.nodes.map((node) => surahNumber(lessonOf(node.id)));
    const firstJuzAmma = surahs.findIndex((surah) => surah >= 78);
    expect(quran.branches[0].id).toBe("quran-surah-fatihah");
    expect(surahs[firstJuzAmma]).toBe(114);
    // Only the Al-Fatihah unit comes before it.
    expect(firstJuzAmma).toBeLessThanOrEqual(quran.nodes.filter((node) => node.branchId === "quran-surah-fatihah").length);
    const ranks = surahs.filter((surah) => surah > 0).map(surahLearningRank);
    expect(ranks).toEqual([...ranks].sort((left, right) => left - right));
  });

  it("orders the hadith lessons from young children's to adults'", () => {
    const levels = section("hadith").nodes.map((node) => lessonOf(node.id)?.difficulty ?? 0);
    expect(levels).toEqual([...levels].sort((left, right) => left - right));
    expect(levels[0]).toBe(1);
  });

  it("shows each prophet and woman once", () => {
    for (const topicId of ["prophets", "women_of_the_book"] as TopicId[]) {
      const nodes = section(topicId).nodes;
      const builtIn = new Set(nodes.filter((node) => !node.id.startsWith("notes-")).map((node) => node.title.toLowerCase()));
      const fromNotes = nodes.filter((node) => node.id.startsWith("notes-")).map((node) => node.title.toLowerCase());
      expect(fromNotes.filter((title) => builtIn.has(title))).toEqual([]);
      expect(fromNotes.filter((title, index) => fromNotes.indexOf(title) !== index)).toEqual([]);
    }
    const prophets = section("prophets").nodes.map((node) => node.title);
    expect(prophets).not.toContain("Noah");
    expect(prophets.filter((title) => title === "Nuh")).toHaveLength(1);
  });
});

describe("imported lessons", () => {
  it("are all on the path", () => {
    expect(imported.length).toBeGreaterThan(200);
    expect(imported.filter((lesson) => !topicOf(lesson)).map((lesson) => lesson.id)).toEqual([]);
  });

  it("keep choices short and whole", () => {
    const problems = imported.flatMap((lesson) =>
      lesson.challenges.flatMap((challenge) => [
        ...challenge.choices.filter((choice) => choice.label.length > 90).map((choice) => `${lesson.id}: long choice "${choice.label}"`),
        ...[challenge.prompt, ...challenge.choices.map((choice) => choice.label)]
          .filter((text) => /\.\.\.|…/.test(text))
          .map((text) => `${lesson.id}: cut text "${text}"`)
      ])
    );
    expect(problems).toEqual([]);
  });

  it("keep the learn card short: one line of 12 words or fewer and up to 3 chips of 5 words or fewer", () => {
    const problems = imported.flatMap((lesson) => [
      ...(lesson.learnLine && words(lesson.learnLine) > 12 ? [`${lesson.id}: line "${lesson.learnLine}"`] : []),
      ...((lesson.learnFacts?.length ?? 0) > 3 ? [`${lesson.id}: ${lesson.learnFacts?.length} chips`] : []),
      ...(lesson.learnFacts ?? []).filter((fact) => words(fact) > 5).map((fact) => `${lesson.id}: chip "${fact}"`)
    ]);
    expect(problems).toEqual([]);
  });

  it("ask two or three questions about each person, all answered on the learn card", () => {
    const people = imported.filter((lesson) => PEOPLE_TOPICS.includes(topicOf(lesson) as TopicId));
    expect(people.length).toBeGreaterThan(100);
    const problems = people.flatMap((lesson) => {
      const questions = asked(lesson);
      const card = [lesson.title, lesson.learnLine ?? "", ...(lesson.learnFacts ?? [])].join(" | ").toLowerCase();
      return [
        ...(questions.length < 2 || questions.length > 3 ? [`${lesson.id}: ${questions.length} questions`] : []),
        ...questions
          .filter((question) => question.type === "multiple_choice")
          .map((question) => question.choices.find((choice) => choice.id === question.correctChoiceId)?.label ?? "")
          .filter((answer) => !card.includes(answer.toLowerCase()))
          .map((answer) => `${lesson.id}: "${answer}" is not on the learn card`)
      ];
    });
    expect(problems).toEqual([]);
  });

  it("spell names one simple way", () => {
    const titles = COURSE.sections
      .filter((each) => [...PEOPLE_TOPICS, "quran_tafseer"].includes(each.topicId))
      .flatMap((each) => each.nodes.filter((node) => node.id.startsWith("notes-")).map((node) => node.title));
    expect(titles.filter((title) => /aa|ii|uu|oo/i.test(title))).toEqual([]);
    expect(titles.filter((title) => /(^|\s)'?l[^aeiou\s'-]/.test(title))).toEqual([]);
  });

  it("keep adult text out of the Quran lessons", () => {
    const quran = imported.filter((lesson) => topicOf(lesson) === "quran_tafseer");
    const shown = quran.flatMap((lesson) => [
      lesson.quote?.text ?? "",
      ...lesson.challenges.flatMap((challenge) => [challenge.prompt, ...challenge.choices.map((choice) => choice.label)])
    ]);
    expect(shown.filter((text) => ADULT_TEXT.test(text))).toEqual([]);
    // The opening letters alone ("Ha. Mim.", "Ya Sin") are never a quote or a choice.
    expect(shown.filter((text) => LETTERS_ONLY.test(text))).toEqual([]);
  });

  it("ask what a surah's name means only when the name has a meaning", () => {
    const quran = imported.filter((lesson) => topicOf(lesson) === "quran_tafseer");
    const meanings = quran.flatMap((lesson) => asked(lesson).filter((question) => question.prompt.startsWith("What does the name")));
    const choices = meanings.flatMap((question) => question.choices.map((choice) => choice.label));
    expect(choices.filter((label) => ["Ya Sin", "Ta-Ha", "Hud", "Luqman", "Muhammad", "Quraysh", "Jonah", "Noah"].includes(label) || /^The Letter/.test(label))).toEqual([]);
    const yasin = quran.find((lesson) => lesson.title === "Surah Ya-Sin");
    expect(yasin?.learnLine).toBe("Surah Ya-Sin is named after its opening letters, Ya Sin.");
    expect(quran.filter((lesson) => /"[^"]*"[^"]*"/.test(lesson.learnLine ?? "")).map((lesson) => lesson.learnLine)).toEqual([]);
  });

  it("teach each hadith by what it says, with its reference on the quote", () => {
    const hadith = imported.filter((lesson) => topicOf(lesson) === "hadith");
    expect(hadith).toHaveLength(15);
    const problems = hadith.flatMap((lesson) => [
      ...(/\b\d+[a-z]?$/.test(lesson.title) ? [`${lesson.id}: title is a reference`] : []),
      ...(lesson.learnLine ? [] : [`${lesson.id}: no learn line`]),
      ...(lesson.quote && !lesson.quote.reference ? [`${lesson.id}: quote without reference`] : []),
      ...asked(lesson)
        .filter((question) => /which (narration|book)|records this hadith/i.test(question.prompt))
        .map((question) => `${lesson.id}: asks "${question.prompt}"`),
      ...(asked(lesson).length >= 2 ? [] : [`${lesson.id}: fewer than 2 questions`])
    ]);
    expect(problems).toEqual([]);
  });
});
