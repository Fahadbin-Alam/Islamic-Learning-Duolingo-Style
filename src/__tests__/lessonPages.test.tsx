import React from "react";
import { render, screen } from "@testing-library/react-native";
import { LESSONS_BY_ID } from "../data/course";
import { LearnCard } from "../ui/lesson";
import {
  answeredBy,
  buildLessonFlow,
  contentWords,
  highlightPieces,
  isLearnStep,
  isQuestionStep,
  isRecallLesson,
  lessonPages,
  teachLesson,
  teachText,
  type FlowStep
} from "../ui/lesson/lessonPages";
import type { Lesson } from "../types";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

const LESSONS = Object.values(LESSONS_BY_ID);

/** What the learner has read before each step, as buildLessonFlow counts it. */
function walk(lesson: Lesson, flow: FlowStep[]) {
  const pages = lessonPages(lesson);
  const known = new Set<string>();
  let page = 0;
  const seen: { step: FlowStep; known: Set<string> }[] = [];
  for (const step of flow) {
    seen.push({ step, known: new Set(known) });
    if (isLearnStep(step)) {
      if (step.page === "teach") contentWords(teachText(lesson.challenges[step.index!])).forEach((word) => known.add(word));
      else if (step.page !== "quiz") contentWords(pages[page++].text).forEach((word) => known.add(word));
    }
  }
  return seen;
}

describe("a lesson in small pages: learn, answer, learn, answer, then the circle's quiz", () => {
  it("never asks a lesson's own question before a page has taught its answer", () => {
    const unanswerable: string[] = [];
    for (const lesson of LESSONS) {
      if (isRecallLesson(lesson)) continue;
      const flow = buildLessonFlow(lesson);
      for (const [at, { step, known }] of walk(lesson, flow).entries()) {
        // A Good to know page right before it teaches this very question.
        const taught = flow.slice(0, at).some((before) => isLearnStep(before) && before.page === "teach" && before.index === (step as { index?: number }).index);
        if (isQuestionStep(step) && !step.quiz && !taught && !answeredBy(lesson.challenges[step.index], known)) {
          unanswerable.push(`${lesson.id}: ${lesson.challenges[step.index].prompt}`);
        }
      }
    }
    expect(unanswerable.slice(0, 10)).toEqual([]);
  });

  it("puts a page between two questions while pages are left, and ends with a quiz of the circle", () => {
    for (const lesson of LESSONS) {
      const flow = buildLessonFlow(lesson);
      expect(isLearnStep(flow[0])).toBe(true);
      const quizAt = flow.findIndex((step) => isLearnStep(step) && step.page === "quiz");
      const learning = quizAt >= 0 ? flow.slice(0, quizAt) : flow;
      const pageKinds = learning.filter(isLearnStep).filter((step) => step.page !== "teach").map((step) => step.page);
      // Every page shows once, in order, before the quiz.
      expect(pageKinds).toEqual(lessonPages(lesson).map((page) => page.page));
      if (isRecallLesson(lesson)) continue;
      const own = lesson.challenges.filter((challenge) => !challenge.isReview).length;
      // Each own question once while learning; the quiz asks them again with the reviews.
      expect(learning.filter(isQuestionStep)).toHaveLength(own);
      const quiz = flow.slice(quizAt + 1).filter(isQuestionStep);
      if (own >= 2) {
        expect(quizAt).toBeGreaterThan(0);
        expect(quiz.every((step) => step.quiz)).toBe(true);
        expect(quiz.length).toBe(own + lesson.challenges.filter((challenge) => challenge.isReview).length);
      }
    }
  });

  it("teaches the six pillars before asking how many there are", () => {
    const lesson = LESSONS.find((item) => item.id.endsWith("lastday-pillar"))!;
    const flow = buildLessonFlow(lesson);
    const howMany = lesson.challenges.findIndex((challenge) => /how many pillars/i.test(challenge.prompt));
    const asked = flow.findIndex((step) => isQuestionStep(step) && step.index === howMany);
    const facts = flow.findIndex((step) => isLearnStep(step) && step.page === "facts");
    expect(facts).toBeGreaterThan(-1);
    expect(facts).toBeLessThan(asked);
    expect(lesson.learnFacts!.join(" ")).toMatch(/six pillars/i);
  });

  it("splits a deep Al-Baqarah lesson into the ayah, what you learn, what it means, the story and take home", () => {
    const lesson = LESSONS.find((item) => item.lessonType === "surah" && item.learnDeeper?.story && item.learnDeeper.takeaway && item.learnFacts?.length)!;
    expect(lessonPages(lesson).map((page) => page.page)).toEqual(["start", "facts", "meaning", "story", "takeaway"]);
  });
});

describe("Good to know pages", () => {
  const base = { type: "multiple_choice" as const, choices: [{ id: "a", label: "Quraysh" }, { id: "b", label: "Aws" }], correctChoiceId: "a" };

  it("fills a fill-in's blank with its answer", () => {
    expect(teachLesson({ ...base, prompt: "Uthman was from ____, the Prophet's ﷺ own tribe.", explanation: "Quraysh." })).toEqual({
      lines: ["Uthman was from Quraysh, the Prophet's ﷺ own tribe."],
      answer: "Quraysh"
    });
  });

  it("says a true statement as it is, and a false one as a card marked False with its Why", () => {
    const tf = { type: "true_false" as const, choices: [{ id: "t", label: "True" }, { id: "f", label: "False" }] };
    expect(teachLesson({ ...tf, correctChoiceId: "t", prompt: "Pilgrims come from every distant place.", explanation: "Quran 22:27." }).lines).toEqual([
      "Pilgrims come from every distant place."
    ]);
    expect(teachLesson({ ...tf, correctChoiceId: "f", prompt: "Friday is a day of rest from all work.", explanation: "After Jumu'ah, go out and seek Allah's bounty." })).toEqual({
      lines: ["After Jumu'ah, go out and seek Allah's bounty."],
      card: { question: "Friday is a day of rest from all work.", answer: "False", isFalse: true }
    });
  });

  it("shows the question and its answer as a flash card when no sentence says it", () => {
    const shown = teachLesson({ ...base, prompt: "Which tribe was Uthman from?", explanation: "Quran 2:1." });
    expect(shown.card).toEqual({ question: "Which tribe was Uthman from?", answer: "Quraysh" });
  });
});

describe("highlights", () => {
  it("marks whole words only, any case", () => {
    expect(highlightPieces("The Last Day is near; the last dayz are not.", ["last day"])).toEqual([
      { text: "The " },
      { text: "Last Day", mark: true },
      { text: " is near; the last dayz are not." }
    ]);
  });
});

describe("LearnCard pages", () => {
  const lesson = LESSONS.find((item) => item.lessonType === "surah" && item.learnDeeper?.story && item.learnDeeper.takeaway && item.learnFacts?.length && item.quote)!;
  const props = {
    title: lesson.title,
    line: "A short line.",
    facts: lesson.learnFacts,
    quote: lesson.quote,
    deeper: lesson.learnDeeper,
    learnSource: lesson.learnSource,
    mascotVariant: "camel",
    accent: "#58CC02",
    onContinue: () => undefined
  };

  it("shows only the ayah on the first page, and only the points on What you learn", async () => {
    await render(<LearnCard {...props} page="start" />);
    expect(screen.getByTestId("learn-quote")).toBeTruthy();
    expect(screen.queryByTestId("learn-facts")).toBeNull();
    expect(screen.queryByTestId("learn-deeper")).toBeNull();

    await render(<LearnCard {...props} page="facts" summary="What the tafsir says." sourceHere marks={["tafsir"]} />);
    expect(screen.getByTestId("learn-facts")).toBeTruthy();
    expect(screen.getByTestId("learn-summary")).toBeTruthy();
    expect(screen.getByTestId("learn-mark")).toHaveTextContent("tafsir");
    expect(screen.queryByTestId("learn-quote")).toBeNull();
    expect(screen.getByTestId("learn-page-title")).toHaveTextContent(lesson.title);
  });

  it("gives the story and Take home a page each, with the tafsir books on the last", async () => {
    await render(<LearnCard {...props} page="story" />);
    expect(screen.getByTestId("learn-deeper-story")).toBeTruthy();
    expect(screen.queryByTestId("learn-deeper-meaning")).toBeNull();
    expect(screen.queryByTestId("learn-deeper-takeaway")).toBeNull();
    expect(screen.queryByTestId("learn-deeper-source")).toBeNull();

    await render(<LearnCard {...props} page="takeaway" />);
    expect(screen.getByTestId("learn-deeper-takeaway")).toBeTruthy();
    expect(screen.queryByTestId("learn-deeper-story")).toBeNull();
    expect(screen.getAllByTestId("learn-deeper-source").length).toBeGreaterThan(0);
  });

  it("says Good to know and Quiz time", async () => {
    await render(<LearnCard {...props} page="teach" teach={{ lines: ["Uthman was from Quraysh."], answer: "Quraysh" }} />);
    expect(screen.getByTestId("learn-page-title")).toHaveTextContent("Good to know");
    expect(screen.getByTestId("learn-mark")).toHaveTextContent("Quraysh");

    await render(<LearnCard {...props} page="quiz" quizCount={4} />);
    expect(screen.getByText("Quiz time!")).toBeTruthy();
    expect(screen.getByText("4 questions on this circle. Get them right to move on.")).toBeTruthy();
  });
});

describe("highlights on screen text", () => {
  it("matches a hyphenated answer after noBreakHyphens", () => {
    const { noBreakHyphens } = require("../ui/lesson/lessonText");
    const pieces = highlightPieces(noBreakHyphens("Allah taught Adam to say As-salamu alaykum."), ["As-salamu alaykum"]);
    expect(pieces.filter((piece) => piece.mark)).toHaveLength(1);
  });
});
