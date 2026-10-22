import { translateStudyText } from "../../services/contentLocalization";
import type { Challenge, Lesson, SupportedLanguage } from "../../types";
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
