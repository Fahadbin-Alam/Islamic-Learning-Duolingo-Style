import { COURSE, LESSONS_BY_ID } from "../data/course";
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
    expect(ownLessons.length).toBeGreaterThan(600);
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
    expect(generated.length).toBeGreaterThan(500);
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
    expect(withWhy.length / own.length).toBeGreaterThan(0.8);
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
    // The line alone does not say the face is not last, so the Why does.
    const face = LESSONS_BY_ID["lesson-prayer-wudu-wash-face"].challenges.find((challenge) => challenge.id.endsWith("_tf"))!;
    expect(face.prompt === face.explanation || face.explanation === "The feet are washed last.").toBe(true);
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
