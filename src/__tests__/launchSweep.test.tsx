import React from "react";
import { render } from "@testing-library/react-native";
import { COURSE, LESSONS_BY_ID } from "../data/course";
import { LearnCard } from "../ui/lesson";
import { buildLessonFlow, isLearnStep, lessonPages, lessonSummary } from "../ui/lesson/lessonPages";
import { localizeLessonContent } from "../services/contentLocalization";
import { surahNumberForTitle, surahParts } from "../data/surahPictures";
import { setActiveLanguage } from "../i18n";
import type { Lesson, SupportedLanguage } from "../types";

// Before a store release (Fahad, 2026-11-08: "no bugs, no crashing"): every lesson's pages are built, and a lesson
// from every unit of every topic is drawn page by page in each language the app speaks, so a lesson whose data
// is missing a part fails here, not on a phone.

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

const noop = () => undefined;

/** The first lesson of every unit (and the last, with `both`), and every surah's own lesson. */
function sample(both: boolean): Lesson[] {
  const picked = new Map<string, Lesson>();
  for (const section of COURSE.sections) {
    for (const branch of section.branches) {
      const ids = section.nodes.filter((node) => node.branchId === branch.id).flatMap((node) => node.lessonIds);
      for (const id of both ? [ids[0], ids[ids.length - 1]] : [ids[0]]) if (id && LESSONS_BY_ID[id]) picked.set(id, LESSONS_BY_ID[id]);
    }
  }
  for (const lesson of Object.values(LESSONS_BY_ID)) if (/quran/.test(lesson.id) && surahNumberForTitle(lesson.title)) picked.set(lesson.id, lesson);
  return [...picked.values()];
}

async function drawPages(english: Lesson, language: SupportedLanguage) {
  setActiveLanguage(language);
  const lesson = localizeLessonContent(english, language);
  const surah = surahNumberForTitle(english.title);
  const steps = buildLessonFlow(english).filter(isLearnStep);
  for (const step of steps) {
    const { unmount } = await render(
      <LearnCard
        page={step.page}
        context={step.page === "facts" ? lesson.learnContext : undefined}
        summary={step.page === "facts" && lessonSummary(english) ? lesson.learnSource?.summary : undefined}
        englishSummary={step.page === "facts" ? english.learnSource?.summary : undefined}
        sourceHere={step.page === "facts"}
        title={lesson.title}
        line={lesson.learnLine ?? lesson.intro}
        facts={lesson.learnFacts}
        englishFacts={english.learnFacts}
        quote={lesson.quote}
        learnSource={lesson.learnSource}
        deeper={lesson.learnDeeper}
        surah={surah ? { number: surah, parts: surahParts(surah) } : undefined}
        mascotVariant="boy"
        accent="#58CC02"
        quizCount={step.page === "quiz" ? lesson.challenges.length : undefined}
        onContinue={noop}
        onOpenSource={noop}
      />
    );
    await unmount();
  }
}

afterAll(() => setActiveLanguage("en"));

describe("ready to publish: every lesson opens", () => {
  it("builds the pages and the question flow of every lesson in the app", () => {
    const broken: string[] = [];
    for (const lesson of Object.values(LESSONS_BY_ID)) {
      try {
        if (!lessonPages(lesson).length) broken.push(`${lesson.id}: no pages`);
        buildLessonFlow(lesson);
      } catch (error) {
        broken.push(`${lesson.id}: ${(error as Error).message}`);
      }
    }
    expect(broken.slice(0, 10)).toEqual([]);
  });

  it.each(["en", "bn", "ur", "ar"] as SupportedLanguage[])("draws every page of a lesson from every unit in %s", async (language) => {
    const broken: string[] = [];
    for (const lesson of sample(language === "en")) {
      try {
        await drawPages(lesson, language);
      } catch (error) {
        broken.push(`${lesson.id}: ${(error as Error).message}`);
      }
    }
    expect(broken.slice(0, 10)).toEqual([]);
  }, 600_000);

  it("gives every surah's own lesson the story behind its name, in its What you learn box", () => {
    const missing = Object.values(LESSONS_BY_ID)
      .filter((lesson) => /quran/.test(lesson.id) && surahNumberForTitle(lesson.title))
      .filter((lesson) => !lesson.learnContext || !lessonPages(lesson).some((page) => page.page === "facts"))
      .map((lesson) => lesson.id);
    expect(missing).toEqual([]);
  });
});
