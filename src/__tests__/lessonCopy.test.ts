import { COURSE, LESSONS_BY_ID } from "../data/course";
import { localizeLessonContent } from "../services/contentLocalization";
import { buildGuidedLesson } from "../services/lessonGuidance";
import type { Challenge, Lesson } from "../types";
import { getLessonLine, isPlayablePractice, LESSON_LINE_MAX_WORDS, lessonLineWords } from "../ui/lesson/lessonSteps";
import { shortWhy } from "../ui/lesson/lessonText";

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

  it("asks two or three questions about the lesson's own line, or reviews lessons before it", () => {
    expect(generated.length).toBeGreaterThan(400);
    const problems: string[] = [];
    for (const lesson of generated) {
      const line = lesson.learnLine!;
      if (lesson.challenges.length < 2 || lesson.challenges.length > 3) problems.push(`${lesson.id}: ${lesson.challenges.length} questions`);
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
    expect(withWhy.length / own.length).toBeGreaterThan(0.65);
    for (const challenge of withWhy) {
      const why = shortWhy({ explanation: challenge.explanation, prompt: challenge.prompt, correctLabel: answerOf(challenge) })!;
      expect(why).not.toBe(challenge.prompt);
      expect(why).not.toBe(challenge.prompt.replace("____", answerOf(challenge)));
    }
  });

  it("says why each false statement is false", () => {
    const falses = generated.flatMap((lesson) => lesson.challenges).filter((challenge) => !challenge.isReview && challenge.id.endsWith("_tf") && answerOf(challenge) === "False");
    expect(falses.length).toBeGreaterThan(100);
    const silent = falses.filter((challenge) => !shortWhy({ explanation: challenge.explanation, prompt: challenge.prompt, correctLabel: "False" }));
    expect(silent.map((challenge) => challenge.id)).toEqual([]);
    // The false statement is the card line with one word changed, so its Why is the card line itself.
    const faceLesson = LESSONS_BY_ID["lesson-prayer-wudu-wash-face"];
    const face = faceLesson.challenges.find((challenge) => challenge.id.endsWith("_tf"))!;
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
    expect(checked).toBeGreaterThan(100);
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
    const localized = localizeLessonContent(thanks!, "fr");
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
