import type { Challenge, Lesson, LessonSource } from "../types";

/** The source behind a question's answer, for the chip on the answer sheet. */
export type AnswerSource = { label: string; url: string; site: LessonSource["site"] };

function asAnswer(source: LessonSource): AnswerSource {
  return { label: source.reference?.trim() || source.site, url: source.url, site: source.site };
}

/**
 * The question's own link first, named by the lesson source it points to. A question asked again in a review keeps
 * the source of the lesson it came from. With no link of its own, the lesson's learn-card source, then its first.
 */
export function findAnswerSource(challenge: Challenge, lesson: Lesson, lessonsById: Record<string, Lesson | undefined>): AnswerSource | undefined {
  const from = challenge.sourceLessonId ? lessonsById[challenge.sourceLessonId] ?? lesson : lesson;
  const pool = [from.learnSource, ...from.sources, lesson.learnSource, ...lesson.sources].filter((source): source is LessonSource => Boolean(source?.url));
  if (challenge.resourceUrl) {
    const match = pool.find((source) => source.url === challenge.resourceUrl);
    if (match) {
      return asAnswer(match);
    }
    return /youtu\.?be/.test(challenge.resourceUrl) ? { label: "YouTube", url: challenge.resourceUrl, site: "YouTube" } : undefined;
  }
  const own = from.learnSource ?? from.sources[0];
  return own ? asAnswer(own) : undefined;
}
