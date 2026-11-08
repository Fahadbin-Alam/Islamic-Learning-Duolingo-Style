import type { Challenge, Lesson, LessonSource } from "../types";
import { surahNumberForTitle } from "./surahPictures";

/**
 * Each surah's own lesson ("Surah Al-Baqarah") teaches a short story, not only a meaning: what its name means, why
 * it has that name (the ayah the name comes from), where it was revealed and how many ayahs it has. It is shown on
 * the "What you learn" page as one paragraph, with Quran.com's page of the surah as its source, and a question asks
 * why the surah has its name. Where a surah was revealed is only said where its lesson already said it.
 *
 * surahNames.json: surah -> [ayah the name comes from or null, the reason in English, Bengali, Urdu, Arabic]. The
 * translations of the texts built here are made from it by scripts/surah-intros/translations.mjs.
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const SURAH_NAME_REASONS: Record<string, [number | null, string, string, string, string]> = require("./surahNames.json");

const SURAH_LESSON = /^lesson-notes-quran-tafseer-surahs-/;
const PLACE_IN_INTRO = /\s*It was revealed in (Makkah|Madinah)\.\s*$/;

const capital = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/** "The name comes from the cow Allah told the Children of Israel to slaughter (ayah 67)." */
export function nameSentence(reason: string, ayah: number | null) {
  return ayah ? `The name comes from ${reason} (ayah ${ayah}).` : `The name comes from ${reason}.`;
}

export function placeSentence(place: string | undefined, ayahs: number | undefined) {
  if (!ayahs) return place ? `It was revealed in ${place}.` : "";
  return place ? `It was revealed in ${place} and has ${ayahs} ayahs.` : `It has ${ayahs} ayahs.`;
}

export function namePrompt(title: string) {
  return `Why is it called ${title}?`;
}

export function nameChoice(reason: string) {
  return capital(reason);
}

/** What the surah lesson's intro, facts and title say, and the paragraph built from them. */
export function surahIntro(lesson: Pick<Lesson, "id" | "title" | "intro" | "learnFacts">) {
  if (!SURAH_LESSON.test(lesson.id)) return undefined;
  const number = surahNumberForTitle(lesson.title);
  const name = number ? SURAH_NAME_REASONS[String(number)] : undefined;
  if (!number || !name) return undefined;
  const facts = lesson.learnFacts ?? [];
  const ayahs = Number(facts.map((fact) => fact.match(/^(\d+) ayahs$/)?.[1]).find(Boolean)) || undefined;
  const place = (facts.join(" ") + " " + (lesson.intro ?? "")).match(/[Rr]evealed in (Makkah|Madinah)/)?.[1];
  const opening = (lesson.intro ?? "").replace(PLACE_IN_INTRO, "").trim();
  const [ayah, reason] = name;
  const text = [opening, nameSentence(reason, ayah), placeSentence(place, ayahs)].filter(Boolean).join(" ");
  return { number, ayah, reason, opening, place, ayahs, text };
}

function surahSource(number: number, title: string, summary: string): LessonSource {
  return {
    id: `quran_surah_${number}`,
    site: "Quran.com",
    category: "tafsir",
    title,
    url: `https://quran.com/${number}`,
    reference: `Quran ${number}`,
    from: "The Quran with tafsir on Quran.com",
    grade: "Quran",
    summary
  };
}

/** Three other surahs' reasons, the same every time, never one that reads the same as this one's. */
function otherReasons(number: number, reason: string) {
  const picked: string[] = [];
  for (const step of [37, 71, 13, 53, 89]) {
    const other = SURAH_NAME_REASONS[String(((number - 1 + step) % 114) + 1)]?.[1];
    if (other && other !== reason && !picked.includes(other)) picked.push(other);
    if (picked.length === 3) break;
  }
  return picked;
}

/** The surah's lesson with its story as the source's summary and a question on why it has its name. */
export function withSurahIntro(lesson: Lesson): Lesson {
  const intro = surahIntro(lesson);
  if (!intro) return lesson;
  // A lesson that quotes an ayah keeps its link to that ayah; the story becomes what its source says.
  const learnSource = lesson.learnSource ? { ...lesson.learnSource, summary: intro.text } : surahSource(intro.number, lesson.title, intro.text);
  const id = `${lesson.id}_name`;
  const choices = [intro.reason, ...otherReasons(intro.number, intro.reason)];
  // The right answer's place moves with the surah, so it is not always first.
  const at = intro.number % choices.length;
  const ordered = [...choices.slice(1, at + 1), choices[0], ...choices.slice(at + 1)];
  const question: Challenge = {
    id,
    type: "multiple_choice",
    prompt: namePrompt(lesson.title),
    choices: ordered.map((reason, index) => ({ id: String.fromCharCode(97 + index), label: nameChoice(reason) })),
    correctChoiceId: String.fromCharCode(97 + ordered.indexOf(intro.reason)),
    explanation: nameSentence(intro.reason, intro.ayah),
    sourceNodeId: lesson.nodeId,
    sourceLessonId: lesson.id,
    resourceLabel: "Open source",
    resourceUrl: learnSource.url
  };
  const challenges = lesson.challenges.some((challenge) => challenge.id === id) ? lesson.challenges : [...lesson.challenges, question];
  return { ...lesson, learnSource, challenges };
}
