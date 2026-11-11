import { translateStudyText } from "../../services/contentLocalization";
import type { Challenge, Lesson, SupportedLanguage } from "../../types";
import { correctLabel, teachLesson, type TeachLesson } from "./lessonPages";
import { getLessonLine } from "./lessonSteps";
import { shortWhy } from "./lessonText";

// The learn card's line and the feedback sheet's Why line are cut from the English lesson by rules that
// read English sentences. Other languages translate the line the English rules picked, so every language
// shows the same sentence (scripts/i18n lists these lines for translation).

export function localizedLessonLine(english: Pick<Lesson, "intro" | "title"> & Partial<Pick<Lesson, "keyTakeaway" | "whatYouWillLearn" | "learnLine">>, language: SupportedLanguage) {
  return translateStudyText(getLessonLine(english), language);
}

export function englishWhy(challenge: Pick<Challenge, "explanation" | "easierExplanation" | "prompt" | "choices" | "correctChoiceId">) {
  return shortWhy({
    explanation: challenge.explanation,
    easierExplanation: challenge.easierExplanation,
    prompt: challenge.prompt,
    correctLabel: challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label ?? ""
  });
}

export function localizedWhy(challenge: Pick<Challenge, "explanation" | "easierExplanation" | "prompt" | "choices" | "correctChoiceId">, language: SupportedLanguage) {
  const why = englishWhy(challenge);
  return why && translateStudyText(why, language);
}

/**
 * The Good to know page in the learner's language. Its shape (a sentence, or a flash card) is chosen from the English
 * question, since the rules read English words; then each part is translated. A sentence with no translation yet is
 * left out (an English sentence never shows in another language): the page shows the translated flash card instead.
 */
export function localizedTeach(english: Pick<Challenge, "prompt" | "choices" | "correctChoiceId" | "explanation" | "type">, language: SupportedLanguage): TeachLesson {
  const teach = teachLesson(english);
  if (language === "en") return teach;
  const prompt = english.prompt.trim();
  const answer = correctLabel(english).trim();
  const answerShown = translateStudyText(answer, language);
  const promptShown = translateStudyText(prompt, language);
  const filled = /_{2,}/.test(prompt) ? prompt.replace(/_{2,}/, answer) : undefined;
  const lines = teach.lines.flatMap((line) => {
    const text = line.trim();
    if (filled && text === filled) return promptShown !== prompt && /_{2,}/.test(promptShown) ? [promptShown.replace(/_{2,}/, answerShown)] : [];
    const shown = translateStudyText(text, language);
    return shown.trim() !== text ? [shown] : [];
  });
  const card = teach.card ?? (lines.length ? undefined : { question: prompt, answer });
  return {
    lines,
    card: card && { ...card, question: translateStudyText(card.question, language), answer: translateStudyText(card.answer, language) },
    answer: teach.answer && answerShown
  };
}
