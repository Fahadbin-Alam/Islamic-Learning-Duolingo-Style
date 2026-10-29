import { COURSE, LESSONS_BY_ID } from "../data/course";
import { IMPORTED_NOTES } from "../data/importedNotes.generated";
import { asksSameLine } from "../data/scalableCurriculum";
import { localizeLessonContent } from "../services/contentLocalization";
import { buildGuidedLesson } from "../services/lessonGuidance";
import type { Challenge, Lesson } from "../types";
import { getLessonLine, isPlayablePractice, LESSON_LINE_MAX_WORDS, lessonLineWords } from "../ui/lesson/lessonSteps";
import { shortWhy } from "../ui/lesson/lessonText";
import { t } from "../i18n";

// Each lesson the app writes itself teaches one line on its learn card and asks about that line.
// Imported notes ("lesson-notes-...") have their own rules and checks.

const pathNodes = COURSE.sections.flatMap((section) => section.nodes);
const pathOrder = new Map(pathNodes.map((node, index) => [node.id, index]));
const pathLessons = pathNodes.flatMap((node) => node.lessonIds.map((id) => LESSONS_BY_ID[id]).filter(Boolean));
const ownLessons = pathLessons.filter((lesson) => !lesson.id.startsWith("lesson-notes-"));
// Lessons built from the curriculum seeds: their questions are named after the lesson.
const generated = ownLessons.filter((lesson) => lesson.challenges.every((challenge) => challenge.id.startsWith(`${lesson.id}_`)));

const answerOf = (challenge: Challenge) => challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label ?? "";

describe("learn card lines", () => {
  it("gives every lesson on the path that is not imported a short line of its own, and shows it", () => {
    // Each companion unit teaches only its own facts now, with no filler lessons, so there are fewer of them.
    expect(ownLessons.length).toBeGreaterThan(450);
    const problems = ownLessons.flatMap((lesson) => {
      const line = lesson.learnLine ?? "";
      const words = lessonLineWords(line);
      if (!line) return [`${lesson.id}: no line`];
      if (words < 3 || words > LESSON_LINE_MAX_WORDS) return [`${lesson.id}: ${words} words`];
      if (getLessonLine(lesson) !== line) return [`${lesson.id}: card shows "${getLessonLine(lesson)}"`];
      return [];
    });
    expect(problems).toEqual([]);
  });

  it("never shows a section label, the bare title or a sentence shared by a whole topic", () => {
    const labels = ownLessons.filter((lesson) => /^(review|challenge|scenario|mastery) lessons\.?$/i.test(getLessonLine(lesson)) || getLessonLine(lesson) === lesson.title);
    expect(labels.map((lesson) => lesson.id)).toEqual([]);
    const count = new Map<string, number>();
    for (const lesson of generated) count.set(lesson.learnLine!, (count.get(lesson.learnLine!) ?? 0) + 1);
    // A general companion line ("At Badr, a small Muslim army won...") is shared by companion units; nothing more.
    expect([...count.values()].every((uses) => uses <= 14)).toBe(true);
  });

  it("prefers the written line, then falls back to the intro", () => {
    expect(getLessonLine({ title: "Wudu", intro: "Long adult prose about purification.", learnLine: "Wudu is the washing we do before salah." })).toBe(
      "Wudu is the washing we do before salah."
    );
    expect(getLessonLine({ title: "Wudu", intro: "Wudu cleans you before prayer.", learnLine: "Wudu" })).toBe("Wudu cleans you before prayer.");
  });
});

describe("generated questions", () => {
  it("drops the old title-recall and topic-bank questions", () => {
    const old = ownLessons.flatMap((lesson) => lesson.challenges).filter((challenge) => /What is this about\?|Which one is true\?/.test(challenge.prompt));
    expect(old.map((challenge) => challenge.id)).toEqual([]);
  });

  it("asks two to four questions about the lesson's own line and earlier ones, or reviews lessons before it", () => {
    expect(generated.length).toBeGreaterThan(400);
    const problems: string[] = [];
    for (const lesson of generated) {
      const line = lesson.learnLine!;
      // A Big quiz asks more: up to six questions.
      const most = /-mastery-lessons$/.test(lesson.id) ? 6 : 4;
      if (lesson.challenges.length < 2 || lesson.challenges.length > most) problems.push(`${lesson.id}: ${lesson.challenges.length} questions`);
      for (const challenge of lesson.challenges) {
        const answer = answerOf(challenge);
        if (challenge.isReview) {
          // A review asks a question from a lesson that comes earlier on the path.
          const from = pathOrder.get(challenge.sourceNodeId ?? "");
          if (from === undefined || from >= (pathOrder.get(lesson.nodeId) ?? 0)) problems.push(`${challenge.id}: reviews ${challenge.sourceNodeId}`);
          continue;
        }
        if (challenge.id.endsWith("_fill") && challenge.prompt.replace("____", answer) !== line) problems.push(`${challenge.id}: blank is not the card line`);
        if (challenge.id.endsWith("_tf") && answer === "True" && challenge.prompt !== line && !/met the Prophet/.test(challenge.prompt)) {
          problems.push(`${challenge.id}: true statement is not the card line`);
        }
      }
    }
    expect(problems).toEqual([]);
  });

  it("asks for the first step only in lessons about an order", () => {
    const firsts = generated.flatMap((lesson) => lesson.challenges.filter((challenge) => challenge.id.endsWith("_first")).map((challenge) => ({ lesson, challenge })));
    expect(firsts.length).toBeGreaterThan(10);
    for (const { lesson, challenge } of firsts) {
      expect(challenge.choices).toHaveLength(3);
      expect(challenge.explanation.startsWith(`${answerOf(challenge)}, then `)).toBe(true);
      expect(lesson.nodeId).toMatch(/^(prayer|hajj|sahabi)-/);
    }
  });

  it("gives Why lines that add something instead of repeating the question", () => {
    const own = generated.flatMap((lesson) => lesson.challenges);
    const withWhy = own.filter((challenge) => shortWhy({ explanation: challenge.explanation, prompt: challenge.prompt, correctLabel: answerOf(challenge) }));
    // A Why that does not explain the answer (a bonus fact) is left out, so some questions have none.
    expect(withWhy.length / own.length).toBeGreaterThan(0.6);
    for (const challenge of withWhy) {
      const why = shortWhy({ explanation: challenge.explanation, prompt: challenge.prompt, correctLabel: answerOf(challenge) })!;
      expect(why).not.toBe(challenge.prompt);
      expect(why).not.toBe(challenge.prompt.replace("____", answerOf(challenge)));
    }
  });

  it("says why each false statement is false", () => {
    const falses = generated.flatMap((lesson) => lesson.challenges).filter((challenge) => !challenge.isReview && challenge.id.endsWith("_tf") && answerOf(challenge) === "False");
    // Further on in a unit the true/false question gives way to multiple-choice ones, so there are fewer.
    expect(falses.length).toBeGreaterThan(40);
    const silent = falses.filter((challenge) => !shortWhy({ explanation: challenge.explanation, prompt: challenge.prompt, correctLabel: "False" }));
    expect(silent.map((challenge) => challenge.id)).toEqual([]);
    // The false statement is the card line with one word changed, so its Why is the card line itself.
    const faceLesson = generated.find((lesson) => lesson.challenges.some((challenge) => challenge.id === `${lesson.id}_tf` && answerOf(challenge) === "False"))!;
    const face = faceLesson.challenges.find((challenge) => challenge.id === `${faceLesson.id}_tf`)!;
    expect(face.prompt === face.explanation || face.explanation === faceLesson.learnLine).toBe(true);
  });
});

describe("Why lines from long notes", () => {
  it("drops a reference with a scrap of the ayah, a chain of names and a label in front of the question", () => {
    expect(shortWhy({ explanation: "Quran 3:66: Lo!", prompt: "Which surah is this ayah from?", correctLabel: "Ali Imran" })).toBeUndefined();
    expect(shortWhy({ explanation: "I said: I am Muhammad b. 'Ali b. Husain.", prompt: "Who asked about the Hajj?", correctLabel: "Muhammad al-Baqir" })).toBeUndefined();
    expect(
      shortWhy({
        explanation: "Why Hajj matters: Hajj is one of the five pillars of Islam.",
        prompt: "“Hajj is one of the five pillars of Islam.” What is this about?",
        correctLabel: "Why Hajj matters"
      })
    ).toBeUndefined();
  });

  it("never leaves a quote open after cutting a long sentence", () => {
    const explanation =
      'The Prophet ﷺ said, "Allah is not hidden from you; indeed He hears everything you say and sees everything you do, wherever you may be."';
    expect(shortWhy({ explanation, prompt: "Where is Allah?", correctLabel: "He sees and hears all" })).toBeUndefined();
  });

  it("keeps the correction of a false statement, even with the same words", () => {
    const line = "In the Hijrah, the Muslims moved from Makkah to Madinah.";
    expect(shortWhy({ explanation: line, prompt: "In the Hijrah, the Muslims moved from Madinah to Makkah.", correctLabel: "False" })).toBe(line);
    expect(shortWhy({ explanation: line, prompt: line, correctLabel: "True" })).toBeUndefined();
    expect(shortWhy({ explanation: "Wudu is the washing we do before salah.", prompt: "Wudu is the washing we do before ____.", correctLabel: "salah" })).toBeUndefined();
  });
});

describe("ordering games", () => {
  // The lessons that teach each step. A game may only come after all of them on the path.
  const TAUGHT_BY: Record<string, string[]> = {
    wudu: ["wash-hands-first", "rinse-mouth", "rinse-nose", "wash-face", "wash-arms", "wipe-head", "wipe-ears", "wash-feet"].map((slug) => `prayer-wudu-${slug}`),
    rakah: ["what-ruku-teaches", "rising-from-ruku", "what-sujud-teaches", "sitting-between-sujud"].map((slug) => `prayer-ruku-and-sujud-${slug}`),
    salah: [
      "prayer-salah-basics-rakah-overview",
      "prayer-salah-basics-pillars-and-obligations",
      "prayer-ruku-and-sujud-sitting-between-sujud",
      "prayer-tashahhud-wording-of-tashahhud",
      "prayer-tashahhud-taslim-ends-the-prayer"
    ]
  };

  it("comes only after every step in it is taught", () => {
    const games = pathNodes.flatMap((node) =>
      node.lessonIds
        .map((id) => LESSONS_BY_ID[id])
        .filter((lesson): lesson is Lesson => Boolean(lesson))
        .flatMap((lesson) => (buildGuidedLesson(lesson, node).practiceActivities ?? []).filter(isPlayablePractice).map((game) => ({ node, game })))
    );
    expect(games.map(({ node }) => node.id)).toEqual(expect.arrayContaining(["prayer-ruku-and-sujud-ruku-sujud-review", "prayer-tashahhud-tashahhud-review"]));
    expect(games.map(({ node }) => node.id)).not.toContain("prayer-salah-basics-rakah-overview");
    for (const { node, game } of games) {
      const kind = /_(wudu|rakah|salah)_order$/.exec(game.id)?.[1];
      expect(kind).toBeDefined();
      for (const taught of TAUGHT_BY[kind!]) {
        expect(pathOrder.get(taught)).toBeLessThan(pathOrder.get(node.id)!);
      }
    }
  });
});

describe("round 3 copy rules", () => {
  const ownTexts = (lesson: Lesson) => [
    lesson.title,
    lesson.learnLine ?? "",
    ...(lesson.learnFacts ?? []),
    ...lesson.challenges.flatMap((challenge) => [challenge.prompt, challenge.explanation, ...challenge.choices.map((choice) => choice.label)])
  ];

  it("makes the false statement the card line with one word changed, so true and false look alike", () => {
    const problems: string[] = [];
    let checked = 0;
    for (const lesson of generated) {
      const fill = lesson.challenges.find((challenge) => challenge.id === `${lesson.id}_fill`);
      const tf = lesson.challenges.find((challenge) => challenge.id === `${lesson.id}_tf`);
      if (!fill || !tf || answerOf(tf) !== "False") continue;
      checked += 1;
      const wrongLines = fill.choices.filter((choice) => choice.id !== fill.correctChoiceId).map((choice) => fill.prompt.replace("____", choice.label));
      if (!wrongLines.includes(tf.prompt)) problems.push(`${tf.id}: ${tf.prompt}`);
      if (tf.explanation !== lesson.learnLine && !shortWhy({ explanation: tf.explanation, prompt: tf.prompt, correctLabel: "False" })) problems.push(`${tf.id}: no correction`);
    }
    expect(checked).toBeGreaterThan(40);
    expect(problems).toEqual([]);
    // Both kinds of answer come up often enough that guessing one does not pay.
    const tfs = generated.flatMap((lesson) => lesson.challenges).filter((challenge) => !challenge.isReview && challenge.id.endsWith("_tf"));
    const trueShare = tfs.filter((challenge) => answerOf(challenge) === "True").length / tfs.length;
    expect(trueShare).toBeGreaterThan(0.3);
    expect(trueShare).toBeLessThan(0.7);
  });

  it("gives the source chip only the one source that says the card, first in the lesson's list", () => {
    const withSource = ownLessons.filter((lesson) => lesson.learnSource);
    expect(withSource.length).toBeGreaterThan(120);
    expect(withSource.filter((lesson) => lesson.sources[0]?.id !== lesson.learnSource!.id).map((lesson) => lesson.id)).toEqual([]);
    // "Allah says: if you are thankful, I will give you more." is Quran 14:7, not the sneezing hadith.
    const thanks = ownLessons.find((lesson) => /if you are thankful/i.test(lesson.learnLine ?? ""));
    expect(thanks?.learnSource?.reference).toBe("Quran 14:7");
    // A companion unit's long article title is never a chip, and its own label is short.
    const sahabah = ownLessons.filter((lesson) => lesson.nodeId.startsWith("sahabi-"));
    expect(sahabah.filter((lesson) => /\(ra\)|The Firsts/.test(lesson.learnSource?.reference ?? "")).map((lesson) => lesson.id)).toEqual([]);
    // A localized lesson keeps its chip, pointing at the same ayah.
    const localized = localizeLessonContent(thanks!, "bn");
    expect(decodeURIComponent(localized.learnSource?.url ?? "")).toContain("quran.com/14/7");
  });

  it("keeps every card line short enough for a small phone", () => {
    expect(ownLessons.filter((lesson) => (lesson.learnLine ?? "").length > 64).map((lesson) => `${lesson.id}: ${lesson.learnLine}`)).toEqual([]);
  });

  it("writes the salawat after the Prophet in every lesson the app writes", () => {
    const missing = new Set<string>();
    for (const lesson of ownLessons) {
      for (const text of ownTexts(lesson)) {
        if (/\b[Tt]he (Prophet|Messenger)(?![a-z])(?!'s\s*ﷺ)(?!\s*ﷺ)(?! of Allah)/.test(text)) missing.add(text);
      }
    }
    expect([...missing]).toEqual([]);
    expect(LESSONS_BY_ID["lesson-foundation-niyyah"].challenges.map((challenge) => challenge.explanation)).toContain(
      "The Prophet ﷺ encouraged greeting people whether you know them or not."
    );
  });

  it("never cuts a number at its decimal point or leaves a question without its answer", () => {
    expect(shortWhy({ explanation: "Zakat on savings is 2.5 percent each year.", prompt: "Zakat on savings is 10 percent each year.", correctLabel: "False" })).toBe(
      "Zakat on savings is 2.5 percent each year."
    );
    expect(getLessonLine({ title: "How much?", intro: "", learnLine: "Zakat on savings is 2.5 percent each year." })).toBe("Zakat on savings is 2.5 percent each year.");
    // "Late, and the imam is bowing?" alone explains nothing, so it stays with its answer.
    expect(
      shortWhy({ explanation: "Late, and the imam is bowing? Say Allahu akbar and join.", prompt: "Late, and the imam is bowing? Say Allahu akbar and wait.", correctLabel: "False" })
    ).toBe("Late, and the imam is bowing? Say Allahu akbar and join.");
    expect(shortWhy({ explanation: "Who could bring it back?", prompt: "Al-Mulk asks about water.", correctLabel: "True" })).toBeUndefined();
    const cut = ownLessons.flatMap((lesson) => lesson.challenges).filter((challenge) => {
      const why = shortWhy({ explanation: challenge.explanation, prompt: challenge.prompt, correctLabel: answerOf(challenge) });
      if (!why) return false;
      const at = challenge.explanation.indexOf(why);
      return /\?["”’)]*$/.test(why) || (at >= 0 && /\d/.test(challenge.explanation.charAt(at + why.length)));
    });
    expect(cut.map((challenge) => challenge.id)).toEqual([]);
  });

  it("teaches each prophet and woman once: no card line is in two units", () => {
    const units = new Map<string, Set<string>>();
    for (const section of COURSE.sections.filter((entry) => entry.topicId === "prophets" || entry.topicId === "women_of_the_book")) {
      for (const node of section.nodes) {
        for (const id of node.lessonIds) {
          const lesson = LESSONS_BY_ID[id];
          if (!lesson?.learnLine || id.startsWith("lesson-notes-")) continue;
          units.set(lesson.learnLine, new Set([...(units.get(lesson.learnLine) ?? []), node.branchId]));
        }
      }
    }
    expect([...units].filter(([, branches]) => branches.size > 1).map(([line]) => line)).toEqual([]);
  });

  it("asks a base person lesson only what its card and chips show", () => {
    const people = ["lesson-adam", "lesson-nuh", "lesson-ibrahim", "lesson-yusuf", "lesson-musa", "lesson-isa", "lesson-muhammad"]
      .concat(["hawwa", "mother-musa", "asiyah", "maryam", "khadijah", "aishah", "hafsah"].map((slug) => `lesson-women-${slug}`))
      .map((id) => LESSONS_BY_ID[id]);
    const problems: string[] = [];
    for (const lesson of people) {
      expect(lesson).toBeDefined();
      const card = [lesson.learnLine ?? "", ...(lesson.learnFacts ?? [])].join(" ").toLowerCase();
      for (const challenge of lesson.challenges) {
        const answer = answerOf(challenge);
        if (answer === "True" || answer === "False") continue;
        const words = answer.toLowerCase().replace(/^(the|in|into|a|an|his|her) /, "").split(/[\s,]+/).filter((word) => word.length > 2);
        if (!words.some((word) => card.includes(word))) problems.push(`${challenge.id}: "${answer}" is not on the card`);
      }
    }
    expect(problems).toEqual([]);
  });

  it("titles a companion review circle as a review and never shows a look-back line under a content title", () => {
    const reviewTitles = new Set(["Review", "Challenge", "Quick quiz", "Life in order", "Big quiz"]);
    const sahabah = ownLessons.filter((lesson) => lesson.nodeId.startsWith("sahabi-"));
    expect(sahabah.length).toBeGreaterThan(100);
    const problems = sahabah.filter((lesson) => {
      const reviewsOnly = lesson.challenges.every((challenge) => challenge.isReview);
      return reviewsOnly !== reviewTitles.has(lesson.title) && !/_first$/.test(lesson.challenges[0]?.id ?? "");
    });
    expect(problems.map((lesson) => `${lesson.id}: ${lesson.title}`)).toEqual([]);
    expect(ownLessons.filter((lesson) => /\b[Aa] [AEIOU]/.test(lesson.learnLine ?? "")).map((lesson) => lesson.learnLine)).toEqual([]);
    expect(ownLessons.filter((lesson) => /\b(lessons|block|threshold|seriousness|reinforcement|scenario|mastery)\b/i.test(lesson.title)).map((lesson) => lesson.title)).toEqual([]);
  });

  it("states Umar's last days exactly", () => {
    const umar = LESSONS_BY_ID["lesson-sahabi-umar-ibn-al-khattab-final-years-and-advice"];
    expect(umar.learnLine).toBe("Umar was hurt while leading Fajr and died a few days later.");
  });

  it("teaches what Al-Fatihah means once, as The Opening", () => {
    const quran = COURSE.sections.find((section) => section.topicId === "quran_tafseer")!;
    const fatihah = quran.nodes.filter((node) => node.branchId === quran.branches[0].id).flatMap((node) => node.lessonIds.map((id) => LESSONS_BY_ID[id]));
    const texts = fatihah.flatMap(ownTexts);
    expect(texts.filter((text) => /Opener|Opening of the Book/.test(text))).toEqual([]);
    expect(texts.filter((text) => /The Opening/.test(text)).length).toBeGreaterThan(0);
  });
});

describe("round 4: each person taught once, in plain lines", () => {
  const nodesOf = (topicId: string) => COURSE.sections.find((section) => section.topicId === topicId)!.nodes;
  const lessonOfNode = (nodeId: string) => LESSONS_BY_ID[pathNodes.find((node) => node.id === nodeId)!.lessonIds[0]];
  const STOP = new Set("the and for with was were are his her she they them their from that this who what when after before not but also very ibn bint".split(" "));
  const NOT_NAMES = new Set(["Allah", "Prophet", "Messenger", "Quran", "Islam", "Muslim", "Muslims", "Paradise", "Sword", "Makkah", "Madinah", "Sham", "Hijrah", "In", "On", "At", "When", "After", "Before", "Once", "The", "As", "Even", "While", "Asked", "Let's"]);
  const contentWords = (text: string) => new Set((text.toLowerCase().replace(/ﷺ/g, "").match(/[a-z']+/g) ?? []).map((word) => word.replace(/'s$/, "")).filter((word) => word.length > 2 && !STOP.has(word)));
  const names = (text: string) => new Set((text.replace(/ﷺ/g, "").match(/\b[A-Z][a-z']+/g) ?? []).map((word) => word.replace(/'s$/, "")).filter((word) => !NOT_NAMES.has(word)));
  // "He served the Prophet ﷺ" on Anas's card reads "Anas ibn Malik served the Prophet ﷺ".
  const named = (line: string, title: string) => line.replace(/^(He|She)\b/, title).replace(/^(His|Her)\b/, `${title}'s`);

  // The lessons about one prophet or woman who has a lesson of their own.
  const PERSON_LESSONS: Record<string, string[]> = {
    Adam: ["prophets-adam", "prophets-early-messengers-adam-and-repentance"],
    Nuh: ["prophets-nuh", "prophets-early-messengers-nuh-and-patience"],
    Ibrahim: ["prophets-ibrahim", "prophets-family-and-sacrifice-ibrahim-and-tawhid"],
    Yusuf: ["prophets-yusuf", "prophets-family-and-sacrifice-yusuf-and-purity"],
    Musa: ["prophets-musa", "prophets-power-and-deliverance-musa-and-fear"],
    Hawwa: ["women-hawwa", "women-quran-depth-hawwa-and-return"],
    "Musa's mother": ["women-mother-musa", "women-quran-depth-mother-of-musa-and-trust"],
    Asiyah: ["women-asiyah", "women-virtues-and-legacy-courage-under-pressure", "women-quran-depth-asiyah-and-steadfastness"],
    Maryam: ["women-maryam", "women-virtues-and-legacy-worship-and-devotion", "women-quran-depth-maryam-and-purity"],
    Khadijah: ["women-khadijah", "women-virtues-and-legacy-service-to-revelation", "women-mothers-depth-khadijah-and-support"],
    Aishah: ["women-aishah", "women-mothers-depth-aishah-and-knowledge"],
    Hafsah: ["women-hafsah"]
  };
  const personOf = new Map(Object.entries(PERSON_LESSONS).flatMap(([person, ids]) => ids.map((id) => [id, person] as const)));

  it("puts all of a prophet's or a woman's lessons in one unit, one right after another", () => {
    const problems: string[] = [];
    for (const [person, ids] of Object.entries(PERSON_LESSONS)) {
      const nodes = ids.map((id) => pathNodes.find((node) => node.id === id));
      if (nodes.some((node) => !node)) {
        problems.push(`${person}: not on the path`);
        continue;
      }
      if (new Set(nodes.map((node) => node!.branchId)).size > 1) problems.push(`${person}: in ${[...new Set(nodes.map((node) => node!.branchId))].join(", ")}`);
      const places = nodes.map((node) => pathOrder.get(node!.id)!);
      if (places.some((place, index) => index > 0 && place !== places[index - 1] + 1)) problems.push(`${person}: lessons apart`);
    }
    expect(problems).toEqual([]);
    // Hafsah's pages are taught once, on her own card.
    expect(pathNodes.filter((node) => node.id === "women-mothers-depth-hafsah-and-preservation")).toEqual([]);
    // The depth units are gone: no two units about the same women.
    const women = COURSE.sections.find((section) => section.topicId === "women_of_the_book")!.branches.map((branch) => branch.title);
    expect(women.filter((title) => /^More |Wives of the Prophet|Virtues and legacy/.test(title))).toEqual([]);
  });

  it("never teaches the same person the same line twice in a topic", () => {
    const problems: string[] = [];
    for (const topicId of ["sahabah", "prophets", "women_of_the_book"]) {
      const cards = nodesOf(topicId)
        .map((node) => ({ node, lesson: lessonOfNode(node.id) }))
        .filter(({ lesson }) => lesson?.learnLine && lesson.challenges.some((challenge) => !challenge.isReview))
        .map(({ node, lesson }) => {
          // Who the lesson is about: the companion of the unit, the person a lesson list names, or the imported person.
          const subject = node.branchId.startsWith("sahabi-") ? node.branchId : (personOf.get(node.id) ?? node.title);
          const line = named(lesson.learnLine!, node.title);
          return { id: node.id, subject, line, words: contentWords(line), names: names(line) };
        });
      for (let left = 0; left < cards.length; left += 1) {
        for (let right = left + 1; right < cards.length; right += 1) {
          const [one, other] = [cards[left], cards[right]];
          if (one.subject !== other.subject) continue;
          const shared = [...one.words].filter((word) => other.words.has(word)).length;
          const [few, many] = one.names.size <= other.names.size ? [one.names, other.names] : [other.names, one.names];
          const sameNames = [...few].every((name) => many.has(name));
          if (one.line === other.line || (sameNames && shared / Math.min(one.words.size, other.words.size) >= 0.75)) problems.push(`${one.id} | ${other.id}: ${one.line} / ${other.line}`);
        }
      }
    }
    expect(problems).toEqual([]);
  });

  it("opens a companion's unit with a card that teaches only what the unit does not", () => {
    const sahabah = COURSE.sections.find((section) => section.topicId === "sahabah")!;
    const problems: string[] = [];
    let openers = 0;
    for (const branch of sahabah.branches.filter((each) => each.id.startsWith("sahabi-"))) {
      const [first, ...rest] = sahabah.nodes.filter((node) => node.branchId === branch.id);
      if (!first.id.startsWith("notes-")) continue;
      openers += 1;
      const card = lessonOfNode(first.id);
      const taught = rest.map((node) => lessonOfNode(node.id)).flatMap((lesson) => [lesson.learnLine ?? "", ...(lesson.learnFacts ?? [])]).join(" | ");
      for (const fact of card.learnFacts ?? []) {
        const value = /^(?:Father|Mother|Tribe): (.+)$/.exec(fact)?.[1];
        const place = /^(Born|Passed away) in (.+)$/.exec(fact);
        if (value && taught.toLowerCase().includes(value.toLowerCase())) problems.push(`${first.id}: ${fact}`);
        if (place && new RegExp(`\\b(${place[1] === "Born" ? "born" : "passed away|died"}) in ${place[2]}`, "i").test(taught)) problems.push(`${first.id}: ${fact}`);
      }
      if (card.challenges.length < 2) problems.push(`${first.id}: ${card.challenges.length} questions`);
      const asked = card.challenges.map(answerOf);
      if (asked.some((answer) => !(card.learnFacts ?? []).some((fact) => fact.endsWith(answer)))) problems.push(`${first.id}: asks what the card does not show`);
    }
    expect(openers).toBeGreaterThanOrEqual(8);
    expect(problems).toEqual([]);
  });

  it("never starts a card line or a question with an unnamed It or Its", () => {
    const unnamed = pathLessons.flatMap((lesson) =>
      [lesson.learnLine ?? "", ...lesson.challenges.map((challenge) => challenge.prompt)].filter((text) => /^Its?\b/.test(text)).map((text) => `${lesson.id}: ${text}`)
    );
    expect(unnamed).toEqual([]);
  });

  it("never marks as false a statement that is true or half true, and fits a or an to the word", () => {
    // Statements an earlier round marked false although they are true, or partly true.
    const halfTrue = [
      "Allah loves good deeds done once, even small ones.",
      "If you eat because you wanted to, keep fasting.",
      "Give zakat for fame, not to show off.",
      "Surah Al-Fatihah says Allah is One, with no equal.",
      "Asking forgiveness? Call on Allah as Al-Malik, the Forgiving.",
      "Using the kitchen or passing wind breaks wudu.",
      "Don't leave wet spots, like your heels.",
      "Now do it all, from hands to face, calm and careful.",
      "Spending on your own games is a charity too.",
      "Spouses treat each other with teasing, never insults.",
      "After hurting your spouse, say sorry and forget it.",
      "Fill the home with salam, thanks, and kind shouts.",
      "Asiyah took in baby Musa and loved him like a servant."
    ];
    const falses = pathLessons.flatMap((lesson) => lesson.challenges).filter((challenge) => challenge.type === "true_false" && answerOf(challenge) === "False");
    expect(falses.length).toBeGreaterThan(100);
    expect(falses.filter((challenge) => halfTrue.includes(challenge.prompt)).map((challenge) => challenge.prompt)).toEqual([]);
    const statements = pathLessons.flatMap((lesson) => [lesson.learnLine ?? "", ...lesson.challenges.filter((challenge) => challenge.type === "true_false").map((challenge) => challenge.prompt)]);
    expect(statements.filter((text) => /\ban (?!hour|honest|honou?r)[b-df-hj-np-tv-z]/i.test(text) || /\ba (?!one\b|un[iu]|use|eu)[aeiou]/i.test(text))).toEqual([]);
  });
});

describe("round 5: reviews stay in their unit, gentle words, names that read right", () => {
  const sectionOf = (topicId: string) => COURSE.sections.find((section) => section.topicId === topicId)!;
  const unitNodes = (topicId: string, branchId: string) => sectionOf(topicId).nodes.filter((node) => node.branchId === branchId);
  // The mixed review unit of Prayer looks back over the units before it on purpose (each lesson names them).
  const MIXED_REVIEW_UNITS = new Set(["prayer-review-and-mastery"]);

  it("asks a review only about lessons before it in its own unit", () => {
    const problems: string[] = [];
    for (const section of COURSE.sections) {
      for (const branch of section.branches.filter((each) => !MIXED_REVIEW_UNITS.has(each.id))) {
        const before = new Set<string>();
        for (const node of unitNodes(section.topicId, branch.id)) {
          const lesson = LESSONS_BY_ID[node.lessonIds[0]];
          for (const challenge of lesson.challenges.filter((each) => each.isReview)) {
            if (!before.has(challenge.sourceLessonId ?? "")) problems.push(`${node.id} asks ${challenge.sourceLessonId}`);
          }
          before.add(lesson.id);
        }
      }
    }
    expect(problems).toEqual([]);
  });

  it("never asks a sentence before the fill-in it gives away", () => {
    // "Allah sent Salih's people a special camel as a sign." (True) told the learner the answer to the
    // "... a special ____ as a sign." question that came next in the Early messengers review.
    const problems: string[] = [];
    for (const lesson of pathLessons) {
      lesson.challenges.forEach((challenge, index) => {
        const givenAway = lesson.challenges.slice(index + 1).find((later) => later.prompt.includes("____") && asksSameLine(challenge, later));
        if (!challenge.prompt.includes("____") && givenAway) problems.push(`${lesson.id}: "${challenge.prompt}" before "${givenAway.prompt}"`);
      });
    }
    expect(problems).toEqual([]);
    const review = LESSONS_BY_ID["lesson-prophets-early-messengers-early-prophets-review"].challenges.filter((challenge) => challenge.isReview);
    expect(review.map((challenge) => challenge.id)).toEqual(review.map((_, index) => `lesson-prophets-early-messengers-early-prophets-review_review_${index + 1}`));
    // With only Salih and Lut to look back on, the review asks Salih's line twice: the fill-in first.
    const prompts = review.map((challenge) => challenge.prompt);
    const sentence = prompts.indexOf("Allah sent Salih's people a special camel as a sign.");
    expect(prompts.indexOf("Allah sent Salih's people a special ____ as a sign.")).toBeLessThan(sentence < 0 ? prompts.length : sentence);
  });

  it("names on a review card only people taught before it in its unit, and quizzes the later Mothers of the Believers", () => {
    const PEOPLE = ["Adam", "Nuh", "Ibrahim", "Ismail", "Ishaq", "Ya'qub", "Yusuf", "Isa", "Hud", "Salih", "Lut", "Musa", "Harun", "Dawud", "Sulayman", "Hawwa", "Asiyah", "Maryam", "Khadijah", "Sawdah", "Aishah", "Hafsah"];
    const problems: string[] = [];
    for (const topicId of ["prophets", "women_of_the_book"]) {
      for (const branch of sectionOf(topicId).branches) {
        const taught: string[] = [];
        for (const node of unitNodes(topicId, branch.id)) {
          const lesson = LESSONS_BY_ID[node.lessonIds[0]];
          // A review asks only earlier lessons' questions (and its own order question); a lesson further on in a
          // unit teaches its own line and asks some earlier questions too.
          const isReview = lesson.challenges.every((challenge) => challenge.isReview || challenge.id.endsWith("_first"));
          if (isReview) {
            const named = PEOPLE.filter((person) => new RegExp(`\\b${person}\\b`).test(lesson.learnLine ?? ""));
            const missing = named.filter((person) => !taught.some((text) => new RegExp(`\\b${person}\\b`).test(text)));
            if (missing.length) problems.push(`${node.id}: ${lesson.learnLine} (${missing.join(", ")} not in the unit before it)`);
          } else {
            taught.push(`${node.title} ${lesson.learnLine ?? ""}`);
          }
        }
      }
    }
    expect(problems).toEqual([]);
    expect(LESSONS_BY_ID["lesson-prophets-family-and-sacrifice-family-review"].learnLine).toBe("Let's remember Ismail, Ishaq and Ya'qub!");
    expect(LESSONS_BY_ID["lesson-prophets-early-messengers-early-prophets-review"].learnLine).toBe("Let's remember Salih and Lut!");
    // The Big quiz after the mid-unit Review asks about the wives taught since that Review.
    const bigQuiz = LESSONS_BY_ID["lesson-women-virtues-and-legacy-women-legacy-review"];
    const wives = bigQuiz.challenges.filter((challenge) => challenge.isReview && /mothers-of-the-believers-from-your-notes/.test(challenge.sourceLessonId ?? ""));
    expect(wives.length).toBeGreaterThanOrEqual(2);
    expect(bigQuiz.challenges.some((challenge) => /quran-depth|courage-under-pressure|worship-and-devotion/.test(challenge.sourceLessonId ?? ""))).toBe(false);
    // Hafsah is a lesson, not a review circle.
    expect(pathNodes.find((node) => node.id === "women-hafsah")?.kind).toBe("story");
  });

  it("never repeats a companion's opener card in a Why line of the same unit", () => {
    const sahabah = sectionOf("sahabah");
    const words = (text: string) => new Set((text.toLowerCase().replace(/ﷺ/g, "").match(/[a-z']+/g) ?? []).map((word) => word.replace(/'s$/, "")).filter((word) => word.length > 2 && !["the", "and", "was", "his", "her", "were"].includes(word)));
    const problems: string[] = [];
    for (const branch of sahabah.branches.filter((each) => each.id.startsWith("sahabi-"))) {
      const [first, ...rest] = unitNodes("sahabah", branch.id);
      if (!first.id.startsWith("notes-")) continue;
      const opener = words(LESSONS_BY_ID[first.lessonIds[0]].learnLine ?? "");
      for (const node of rest) {
        for (const challenge of LESSONS_BY_ID[node.lessonIds[0]].challenges) {
          const why = words(challenge.explanation ?? "");
          const shared = [...why].filter((word) => opener.has(word)).length;
          if (why.size && shared / Math.min(why.size, opener.size) >= 0.75) problems.push(`${node.id}: ${challenge.explanation}`);
        }
      }
    }
    expect(problems).toEqual([]);
    expect(LESSONS_BY_ID[sahabah.nodes.find((node) => node.branchId === "sahabi-az-zubayr-ibn-al-awwam")!.lessonIds[0]].learnLine).toBe("Az-Zubayr's parents were Al-Awwam and Safiyyah.");
  });

  it("keeps frightening words out of every lesson, and keeps the Dajjal lesson to its gentle line", () => {
    const FRIGHTENING = /\b(tortur\w*|behead\w*|slaughter\w*|one-eyed|strike (?:off )?(?:his|her|their) necks?)\b|\bkill (him|her|them)\b/i;
    const texts = (lesson: Lesson) => [
      lesson.title,
      lesson.intro,
      lesson.explanationContent ?? "",
      lesson.keyTakeaway ?? "",
      lesson.learnLine ?? "",
      ...(lesson.learnFacts ?? []),
      lesson.quote?.text ?? "",
      ...lesson.challenges.flatMap((challenge) => [challenge.prompt, challenge.explanation ?? "", ...challenge.choices.map((choice) => choice.label)])
    ];
    const scary = pathLessons.flatMap((lesson) => texts(lesson).filter((text) => FRIGHTENING.test(text)).map((text) => `${lesson.id}: ${text.slice(0, 80)}`));
    expect(scary).toEqual([]);
    const dajjal = LESSONS_BY_ID["lesson-notes-hadith-hadith-from-your-notes-2-sahih-muslim-2930a"];
    expect(dajjal.learnLine).toBe("Every prophet warned his people about the Dajjal, a great liar.");
    expect(dajjal.explanationContent).toBe(dajjal.quote?.text);
    expect(dajjal.intro).not.toMatch(/Ibn Sayyad|neck|kill/i);
    const khabbab = Object.values(LESSONS_BY_ID).find((lesson) => lesson.title === "Khabbab ibn al-Aratt")!;
    expect(khabbab.learnLine).toBe("He was one of the first Muslims and stayed firm in Islam.");
  });

  it("asks clear true or false statements about saying sorry", () => {
    const sorry = LESSONS_BY_ID["lesson-marriage-conflict-and-repair-repair-after-harm"];
    expect(sorry.learnLine).toBe("After hurting your spouse, say sorry and fix the hurt.");
    // "say sorry and repeat it" could mean saying sorry again, which is not wrong.
    const statements = pathLessons.flatMap((lesson) => lesson.challenges).filter((challenge) => challenge.type === "true_false").map((challenge) => challenge.prompt);
    expect(statements.filter((prompt) => /say sorry and repeat it\b/i.test(prompt))).toEqual([]);
  });

  it("calls the wife of Imran by that name in a sentence, and never offers a wrong choice that names the person asked about", () => {
    const imported = pathLessons.filter((lesson) => lesson.id.startsWith("lesson-notes-"));
    const midSentence = imported.flatMap((lesson) => lesson.challenges.map((challenge) => challenge.prompt)).filter((prompt) => /.\bWife of Imran\b/.test(prompt));
    expect(midSentence).toEqual([]);
    const imran = imported.find((lesson) => lesson.title === "The wife of Imran")!;
    expect(imran.challenges.map((challenge) => challenge.prompt)).toContain("What is the wife of Imran known for?");
    const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const people = new Set(["sahabah", "prophets", "women_of_the_book"].flatMap((topicId) => sectionOf(topicId).nodes.map((node) => node.id)));
    const naming = imported
      .filter((lesson) => people.has(lesson.nodeId))
      .flatMap((lesson) =>
        lesson.challenges
          .filter((challenge) => !challenge.isReview)
          .flatMap((challenge) => challenge.choices.filter((choice) => choice.id !== challenge.correctChoiceId && new RegExp(`\\b${escape(lesson.title)}\\b`).test(choice.label)).map((choice) => `${lesson.title}: ${choice.label}`))
      );
    expect(naming).toEqual([]);
  });

  it("gives every surah its own unit, so no Quran span unit is left", () => {
    // Each surah now has its own unit (surahMeanings), so the old "Surah X to Y" spans are all gone.
    expect(sectionOf("quran_tafseer").branches.filter((branch) => / to /.test(branch.title)).map((branch) => branch.title)).toEqual([]);
  });

  it("never asks the tribe of Zaynab bint Jahsh or her brother Abdullah, who were of Asad ibn Khuzaymah, not Quraysh by birth", () => {
    const jahsh = pathLessons.filter((lesson) => /ibn Jahsh|bint Jahsh/.test(lesson.title));
    expect(jahsh.map((lesson) => lesson.title).sort()).toEqual(["Abdullah ibn Jahsh", "Zaynab bint Jahsh"]);
    const asked = pathLessons.flatMap((lesson) => lesson.challenges).filter((challenge) => /tribe was (Zaynab bint|Abdullah ibn) Jahsh/.test(challenge.prompt));
    expect(asked.map((challenge) => challenge.prompt)).toEqual([]);
    for (const lesson of jahsh) expect((lesson.learnFacts ?? []).filter((fact) => /^Tribe/.test(fact))).toEqual([]);
  });
});

describe("round 7: surah meanings and family names written one way", () => {
  // Every imported lesson, also the ones the path leaves out: their facts are other lessons' wrong choices.
  const imported = [...Object.values(IMPORTED_NOTES.lessonsById), ...pathLessons.filter((lesson) => lesson.id.startsWith("lesson-notes-"))];
  const SMALL_WORDS = new Set(["a", "an", "the", "and", "but", "or", "nor", "of", "in", "on", "at", "to", "by", "for", "from", "with", "as"]);
  const lowerWords = (meaning: string) => meaning.split(/\s+/).filter((word, index) => /^\p{Ll}/u.test(word) && (index === 0 || !SMALL_WORDS.has(word)));

  it("writes every surah meaning in title case, on the card, in the Why line and on every answer tile", () => {
    const meanings = new Set<string>();
    for (const lesson of imported.filter((each) => each.id.startsWith("lesson-notes-quran-tafseer-"))) {
      for (const text of [lesson.intro, lesson.learnLine ?? "", lesson.explanationContent ?? "", ...lesson.challenges.map((challenge) => challenge.explanation ?? "")]) {
        for (const match of text.matchAll(/\bmeans "([^"]+)"/g)) meanings.add(match[1]);
      }
      for (const challenge of lesson.challenges.filter((each) => /^What does the name .+ mean\?$/.test(each.prompt))) {
        for (const choice of challenge.choices) meanings.add(choice.label);
      }
    }
    expect(meanings.size).toBeGreaterThan(90);
    expect([...meanings].filter((meaning) => lowerWords(meaning).length)).toEqual([]);
    const maun = imported.find((lesson) => lesson.title === "Surah Al-Ma'un")!;
    expect(maun.learnLine).toBe('Surah Al-Ma\'un means "The Small Kindnesses".');
    expect([...meanings]).toEqual(expect.arrayContaining(["The Small Kindnesses", "Those Who Drag Forth", "Those Who Set the Ranks", "She That Is to Be Examined"]));
  });

  it("spells a father's name the way the child's own name does", () => {
    // "Abu al-As ibn ar-Rabi'" is the son of "Ar-Rabi' ibn Abd al-Uzza": the name after the first ibn or bint is the
    // father's (or a forefather's, as in Abu Ubaydah ibn al-Jarrah, son of Abdullah ibn al-Jarrah), with only the
    // capital of its first letter changed. After ibn, Abu is Abi.
    const lowerFirst = (text: string) => `${text.charAt(0).toLowerCase()}${text.slice(1)}`;
    const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const fatherNamed = (name: string) => {
      const words = name.replace(/\s*ﷺ/g, "").split(/\s+/);
      const link = words.findIndex((word) => word === "ibn" || word === "bint");
      if (link < 0 || !words[link + 1]) return undefined;
      const two = /^(Abi|Abu|Abd|Umm|Dhi)$/.test(words[link + 1]) && words[link + 2];
      return words.slice(link + 1, link + (two ? 3 : 2)).join(" ").replace(/^Abi\b/, "Abu");
    };
    const fathers = (lesson: Lesson) => [
      ...(lesson.learnFacts ?? []).filter((fact) => fact.startsWith("Father: ")).map((fact) => fact.slice("Father: ".length)),
      ...[...(lesson.explanationContent ?? "").matchAll(/(?:^|\. )Father: (.+?)\.(?= |$)/g)].map((match) => match[1]),
      ...lesson.challenges.filter((challenge) => !challenge.isReview && /^Who was the father of /.test(challenge.prompt)).map(answerOf)
    ];
    const checked: string[] = [];
    const problems: string[] = [];
    for (const lesson of imported) {
      const named = fatherNamed(lesson.title);
      for (const father of fathers(lesson)) {
        if (!named) continue;
        const pattern = escape(lowerFirst(named));
        const shown = lowerFirst(father.replace(/\s*ﷺ/g, "").trim());
        checked.push(lesson.title);
        if (!new RegExp(`^${pattern}(?=\\s|$)|(?:^|\\s)ibn ${pattern}(?=\\s|$)`).test(shown)) problems.push(`${lesson.title}: father "${father}"`);
      }
    }
    expect(new Set(checked).size).toBeGreaterThan(50);
    expect(problems).toEqual([]);
    const walid = imported.find((lesson) => lesson.title === "Al-Walid ibn al-Walid ibn al-Mughirah")!;
    expect(walid.learnFacts).toContain("Father: Al-Walid ibn al-Mughirah");
    expect(imported.find((lesson) => lesson.title === "Abu al-As ibn ar-Rabi'")!.learnFacts).toContain("Father: Ar-Rabi' ibn Abd al-Uzza");
    // The old spellings are gone from every lesson, also where they were a wrong choice.
    const labels = imported.flatMap((lesson) => lesson.challenges.flatMap((challenge) => challenge.choices.map((choice) => choice.label)));
    expect(labels.filter((label) => /^(Walid ibn al-Mughirah|Ar-Rabi ibn Abd al-Uzza)$/.test(label))).toEqual([]);
  });

  it("calls a parent who has a lesson of their own by that lesson's title", () => {
    const loose = (name: string) =>
      name.toLowerCase().replace(/ﷺ/g, "").replace(/['’]/g, "").replace(/\b(al|an|ar|as|at|az|ad|ash|adh|ath)-/g, "").replace(/-/g, " ").replace(/\s+/g, " ").trim();
    const people = imported.filter((lesson) => /^lesson-notes-(sahabah|prophets|women-of-the-book)-/.test(lesson.id));
    const titles = new Map(people.map((lesson) => [loose(lesson.title), lesson.title]));
    const problems: string[] = [];
    let matched = 0;
    for (const lesson of people) {
      for (const fact of lesson.learnFacts ?? []) {
        const parent = /^(?:Father|Mother): (.+)$/.exec(fact)?.[1];
        const own = parent && titles.get(loose(parent));
        if (!parent || !own) continue;
        matched += 1;
        if (own !== parent && `The ${parent.replace(/^the /, "")}` !== own) problems.push(`${lesson.title}: "${parent}" but the lesson is "${own}"`);
      }
    }
    expect(matched).toBeGreaterThan(20);
    expect(problems).toEqual([]);
  });
});

describe("salah ordering game", () => {
  it("is a whole two-rak'ah prayer: tashahhud and taslim come only after the second rak'ah", () => {
    const node = pathNodes.find((entry) => entry.id === "prayer-tashahhud-tashahhud-review")!;
    const lesson = LESSONS_BY_ID[node.lessonIds[0]];
    const game = (buildGuidedLesson(lesson, node).practiceActivities ?? []).find(isPlayablePractice)!;
    expect(game.id).toMatch(/_salah_order$/);
    const order = game.correctOrderIds!;
    expect(order).toHaveLength(9);
    expect(order.indexOf("tashahhud")).toBeGreaterThan(order.indexOf("sujud2"));
    expect(order.indexOf("sujud2")).toBeGreaterThan(order.indexOf("qiyam2"));
    expect(order.slice(-2)).toEqual(["tashahhud", "taslim"]);
    // The mascot says what to do, not the lesson's name.
    expect(game.prompt).not.toBe(lesson.title);
    expect(game.prompt).toMatch(/order/i);
    expect(game.options.every((option) => option.label.length <= 20)).toBe(true);
  });
});
