import { COURSE, LESSONS_BY_ID } from "../data/course";
import { HADITH_BASICS, HADITH_BASICS_BRANCH_ID } from "../data/hadithBasics";
import { surahLearningRank } from "../data/importedNotes";
import { QURAN_AYAHS } from "../data/quranAyahs";
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
// The surah its Quran source is from: the learn card's ayah comes first in its sources, and can be a hadith about the surah.
const surahNumber = (lesson: Lesson | undefined) =>
  Number(lesson?.sources.map((source) => /quran\.com\/(\d+)/.exec(source.url)?.[1]).find(Boolean));

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

  it("goes through the surahs in the order of the mushaf, Al-Baqarah right after Al-Fatihah", () => {
    const quran = section("quran_tafseer");
    const surahs = quran.nodes.map((node) => surahNumber(lessonOf(node.id)));
    expect(quran.branches[0].id).toBe("quran-surah-fatihah");
    expect(quran.branches[1].id).toBe("quran-surah-baqarah");
    const ranks = surahs.filter((surah) => surah > 0).map(surahLearningRank);
    expect(ranks).toEqual([...ranks].sort((left, right) => left - right));
    expect(surahs.filter((surah) => surah > 0).pop()).toBe(114);
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
    // 15 notes: a weak one (Tirmidhi 1084) and six repeats or hand-dropped narrations stay in the vault. Three are
    // for young children, in the Hadith topic; five are about marriage, in the Marriage topic.
    const hadith = imported.filter((lesson) => lesson.id.startsWith("lesson-notes-hadith-"));
    expect(hadith.filter((lesson) => topicOf(lesson) === "hadith")).toHaveLength(3);
    expect(hadith.filter((lesson) => topicOf(lesson) === "marriage")).toHaveLength(5);
    expect(hadith).toHaveLength(8);
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

const correctLabel = (challenge: Lesson["challenges"][number]) => challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label ?? "";
const shownText = (lesson: Lesson) => [
  lesson.title,
  lesson.learnLine ?? "",
  ...(lesson.learnFacts ?? []),
  lesson.quote?.text ?? "",
  ...lesson.challenges.flatMap((challenge) => [challenge.prompt, challenge.explanation ?? "", ...challenge.choices.map((choice) => choice.label)])
];
// A word of the answer is on the card when a card word starts the same way ("Feeding" and "Feed").
const STOP = new Set(["with", "your", "from", "that", "this", "they", "them", "what", "only", "were", "have", "will", "into", "than", "then"]);
const onCard = (answer: string, card: string) => {
  const cardWords = card.toLowerCase().match(/[a-z']+/g) ?? [];
  const answerWords = (answer.toLowerCase().match(/[a-z']+/g) ?? []).filter((word) => word.length >= 4 && !STOP.has(word));
  return !answerWords.length || answerWords.some((word) => cardWords.some((cardWord) => cardWord.slice(0, 4) === word.slice(0, 4)));
};

describe("Hadith topic", () => {
  const hadith = () => section("hadith");
  const lessonsOf = (branchId: string) => hadith().nodes.filter((node) => node.branchId === branchId).map((node) => lessonOf(node.id)!);

  it("is a child's path: Hadith for kids, then Safe with Allah, and no unit waits behind a gate", () => {
    const branches = hadith().branches;
    expect(branches.map((branch) => branch.title)).toEqual(["Hadith for kids", "Safe with Allah"]);
    expect(branches.some((branch) => branch.gated)).toBe(false);
    // Unit ids stay those of the imported units, so saved progress still counts.
    expect(branches.map((branch) => branch.id)).toEqual([HADITH_BASICS_BRANCH_ID, "notes-hadith-hadith-from-your-notes-1"]);
  });

  it("teaches the hadith about marriage only as the last unit of the Marriage topic, in order", () => {
    const marriage = section("marriage");
    const last = marriage.branches[marriage.branches.length - 1];
    expect(last).toMatchObject({ id: "notes-hadith-hadith-from-your-notes-2", title: "Marriage in the Sunnah" });
    expect(last.gated).toBeFalsy();
    const nodes = marriage.nodes.filter((node) => node.branchId === last.id);
    expect(nodes.map((node) => node.title)).toEqual(
      expect.arrayContaining(["Half of the religion", "Marriage or fasting", "Iblis and his troops", "Choosing a wife", "A righteous wife"])
    );
    expect(nodes.every((node) => node.topicId === "marriage")).toBe(true);
    // Lesson ids are those of the imported hadith, so saved progress still counts.
    expect(nodes.every((node) => node.id.startsWith("notes-hadith-") && lessonOf(node.id)?.id === `lesson-${node.id}`)).toBe(true);
    // Taught in order: the unit opens after the unit before it, and each lesson after the one before it.
    const before = marriage.nodes.filter((node) => node.branchId === marriage.branches[marriage.branches.length - 2].id);
    expect(nodes[0].requiredNodeIds).toEqual([before[before.length - 1].id]);
    expect(nodes.slice(1).every((node, index) => node.requiredNodeIds.join() === nodes[index].id)).toBe(true);
    // Ghaylan's ten wives ("Keep four") is on no path.
    expect(COURSE.sections.flatMap((each) => each.nodes).filter((node) => node.id.endsWith("mishkat-al-masabih-3176"))).toEqual([]);
  });

  it("keeps marriage, wives and Iblis out of the Hadith topic", () => {
    const [kids, safe] = hadith().branches;
    const young = [...lessonsOf(kids.id), ...lessonsOf(safe.id)];
    const adult = /\bmarr|\bwife\b|\bwives\b|husband|fertile|iblis/i;
    expect(young.filter((lesson) => shownText(lesson).some((text) => adult.test(text))).map((lesson) => lesson.title)).toEqual([]);
    expect(hadith().nodes.length).toBe(young.length);
    // Only one gentle lesson on the Dajjal, after Allah's Book and seeking refuge.
    expect(lessonsOf(safe.id).map((lesson) => lesson.title)).toEqual(["Hold on to Allah's Book", "Seek refuge with Allah", "Every prophet warned"]);
    expect(young.filter((lesson) => /grape|one-eyed|blind/i.test(shownText(lesson).join(" ")))).toEqual([]);
  });

  it("teaches each narration once, and never a weak one", () => {
    const ids = hadith().nodes.map((node) => node.id);
    for (const gone of ["sahih-al-bukhari-7407", "sahih-muslim-169e", "sahih-muslim-1400a", "sahih-muslim-2933a", "sahih-muslim-134a", "jami-at-tirmidhi-1084"]) {
      expect(ids.filter((id) => id.endsWith(gone))).toEqual([]);
    }
    const references = hadith().nodes.map((node) => lessonOf(node.id)?.learnSource?.reference);
    expect(references.filter((reference, index) => !reference || references.indexOf(reference) !== index)).toEqual([]);
  });

  it("has 8 to 12 sayings for kids, each a whole quote with its exact reference and page", () => {
    const kids = lessonsOf(HADITH_BASICS_BRANCH_ID);
    expect(kids.length).toBeGreaterThanOrEqual(8);
    expect(kids.length).toBeLessThanOrEqual(12);
    expect(kids.map((lesson) => lesson.id)).toEqual(Object.keys(HADITH_BASICS.lessonsById));
    const problems = kids.flatMap((lesson) => {
      const source = lesson.learnSource;
      const number = /(\d+[a-z]?)$/.exec(source?.reference ?? "")?.[1];
      return [
        ...(words(lesson.learnLine ?? "") > 12 ? [`${lesson.title}: long line`] : []),
        ...(/[.!?]$/.test(lesson.quote?.text ?? "") ? [] : [`${lesson.title}: quote cut`]),
        ...(source && number && source.url.startsWith("https://sunnah.com/") && source.url.endsWith(`:${number}`) ? [] : [`${lesson.title}: source ${source?.url}`]),
        ...((lesson.quote?.reference ?? "").startsWith(source?.reference ?? "-") ? [] : [`${lesson.title}: quote reference ${lesson.quote?.reference}`]),
        ...(asked(lesson).length >= 2 && asked(lesson).length <= 3 ? [] : [`${lesson.title}: ${asked(lesson).length} questions`])
      ];
    });
    expect(problems).toEqual([]);
  });

  it("asks only what the hadith card shows", () => {
    const lessons = hadith().nodes.map((node) => lessonOf(node.id)!);
    const problems = lessons.flatMap((lesson) => {
      const card = [lesson.title, lesson.learnLine ?? "", ...(lesson.learnFacts ?? []), lesson.quote?.text ?? ""].join(" ");
      return asked(lesson)
        .filter((question) => question.type === "multiple_choice")
        .map(correctLabel)
        .filter((answer) => !onCard(answer, card))
        .map((answer) => `${lesson.title}: "${answer}"`);
    });
    expect(problems).toEqual([]);
  });
});

describe("imported lessons stand on their own", () => {
  const library = () => COURSE.sections.filter((each) => [...PEOPLE_TOPICS, "quran_tafseer", "hadith"].includes(each.topicId));

  it("never ask about 'this' hadith or what was said 'here', so a review question still makes sense in another lesson", () => {
    const prompts = library().flatMap((each) => each.nodes.flatMap((node) => asked(lessonOf(node.id)!).map((question) => `${node.id}: ${question.prompt}`)));
    expect(prompts.filter((prompt) => /\bthis (hadith|ayah|surah|narration)\b|\bsaid this\b|\bhere\b/i.test(prompt))).toEqual([]);
  });

  it("show each quoted ayah in Arabic, from the Uthmani text, linked to that ayah", () => {
    const quoted = imported.filter((lesson) => topicOf(lesson) === "quran_tafseer" && lesson.quote);
    expect(quoted.length).toBeGreaterThan(50);
    const problems = quoted.flatMap((lesson) => {
      const ref = /^Quran (\d+):(\d+)$/.exec(lesson.quote!.reference ?? "")?.slice(1);
      if (!ref) return [`${lesson.id}: reference ${lesson.quote!.reference}`];
      return [
        ...(lesson.quote!.text === QURAN_AYAHS[ref.join(":")] ? [] : [`${lesson.id}: not the Arabic ayah`]),
        ...(/[A-Za-z]/.test(lesson.quote!.text) ? [`${lesson.id}: English in the quote`] : []),
        ...(lesson.learnSource?.url === `https://quran.com/${ref.join("/")}` ? [] : [`${lesson.id}: source ${lesson.learnSource?.url}`])
      ];
    });
    expect(problems).toEqual([]);
    // Al-Fatihah's first lesson shows the Bismillah.
    expect(lessonOf("notes-quran-tafseer-surahs-1-10-surah-al-fatihah")?.quote).toEqual({ text: QURAN_AYAHS["1:1"], reference: "Quran 1:1" });
    expect(QURAN_AYAHS["1:1"].startsWith("بِسۡمِ")).toBe(true);
  });

  it("spell a name one way within a lesson", () => {
    const pairs: [RegExp, RegExp][] = [
      [/\bNuh\b/, /\bNoah\b/],
      [/\bGhaylan\b/, /\bGhailan\b/],
      [/\bFatimah\b/, /\bFatima\b/],
      [/\bSafiyyah\b/, /\bSafiyya\b/],
      [/\bKa'bah\b/, /\bKaaba\b/],
      [/\bUmaymah\b/, /\bUmayma\b/],
      [/\bKhuzaymah\b/, /\bKhuzayma\b/]
    ];
    const lessons = library().flatMap((each) => each.nodes.map((node) => lessonOf(node.id)!));
    const problems = lessons.flatMap((lesson) => {
      const text = shownText(lesson).join(" | ");
      return pairs.filter(([one, other]) => one.test(text) && other.test(text)).map(([one]) => `${lesson.id}: ${one.source}`);
    });
    expect(problems).toEqual([]);
  });

  it("leave out facts the sources do not support", () => {
    const people = COURSE.sections.filter((each) => each.topicId === "prophets" || each.topicId === "women_of_the_book").flatMap((each) => each.nodes);
    const cards = people.map((node) => ({ node, lesson: lessonOf(node.id)! })).map(({ node, lesson }) => ({ id: node.id, text: shownText(lesson).join(" | ") }));
    expect(cards.filter(({ text }) => /\bUr\b|Hebron|Jordan|Nineveh|survived Karbala|Yukabid|Lamech|Rifqa/.test(text)).map(({ id }) => id)).toEqual([]);
    // Where a prophet was born or died is never asked, but for the Prophet Muhammad ﷺ.
    const prophets = section("prophets").nodes.filter((node) => node.id !== "prophets-muhammad").map((node) => lessonOf(node.id)!);
    expect(prophets.filter((lesson) => (lesson.learnFacts ?? []).some((fact) => /^(Born in|Passed away in|Buried in)/.test(fact))).map((lesson) => lesson.title)).toEqual([]);
  });

  it("group the women from the notes by theme, without Umm Jamil or Umm Anmar", () => {
    const women = section("women_of_the_book");
    const fromNotes = women.branches.filter((branch) => branch.id.startsWith("notes-"));
    expect(fromNotes.map((branch) => branch.title)).toEqual(["Mothers"]);
    // Ali's family is not a unit, and none of its women are taught anywhere.
    expect(women.branches.map((branch) => branch.title)).not.toContain("Ali's family");
    expect(women.nodes.filter((node) => /zaynab-bint-ali|umm-kulthoom-bint-ali|umm-al-banin|sayyida-nafisa/.test(node.id))).toEqual([]);
    const titles = women.nodes.map((node) => node.title);
    expect(titles.filter((title) => /Umm Jamil|Umm Anmar/.test(title))).toEqual([]);
    // The Mothers of the Believers from the notes are taught with the others, in the order the Prophet ﷺ married them.
    const mothers = women.nodes.filter((node) => node.branchId === "women-mothers").map((node) => node.title);
    const wives = ["Zaynab bint Khuzaymah", "Umm Salamah", "Zaynab bint Jahsh", "Juwayriyah bint al-Harith", "Umm Habibah", "Safiyyah bint Huyayy", "Maymunah bint al-Harith"];
    expect(mothers.filter((title) => wives.includes(title))).toEqual(wives);
    expect(mothers.slice(0, 1)).toEqual(["Khadijah"]);
  });
});

