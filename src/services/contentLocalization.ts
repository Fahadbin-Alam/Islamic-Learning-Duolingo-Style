import { t } from "../i18n";
import type { AnswerSource } from "../data/answerSource";
import type { Challenge, Lesson, LessonSource, SupportedLanguage } from "../types";

export function localizeLessonContent(lesson: Lesson, language: SupportedLanguage): Lesson {
  if (language === "en") {
    return lesson;
  }

  return {
    ...lesson,
    title: translateStudyText(lesson.title, language),
    intro: translateStudyText(lesson.intro, language),
    explanationContent: lesson.explanationContent ? translateStudyText(lesson.explanationContent, language) : lesson.explanationContent,
    whatYouWillLearn: lesson.whatYouWillLearn ? translateStudyText(lesson.whatYouWillLearn, language) : lesson.whatYouWillLearn,
    whyItMatters: lesson.whyItMatters ? translateStudyText(lesson.whyItMatters, language) : lesson.whyItMatters,
    keyTakeaway: lesson.keyTakeaway ? translateStudyText(lesson.keyTakeaway, language) : lesson.keyTakeaway,
    storyMoment: lesson.storyMoment ? translateStudyText(lesson.storyMoment, language) : lesson.storyMoment,
    // The learn card's line and fact chips. A quote's catalog entry is taken from a published translation
    // of the ayah or hadith, never written fresh, and stays in English when there is none.
    quote: lesson.quote
      ? { text: translateStudyText(lesson.quote.text, language), reference: lesson.quote.reference ? translateStudyText(lesson.quote.reference, language) : lesson.quote.reference }
      : lesson.quote,
    learnLine: lesson.learnLine ? translateStudyText(lesson.learnLine, language) : lesson.learnLine,
    learnFacts: lesson.learnFacts?.map((fact) => translateStudyText(fact, language)),
    teachingMoments: lesson.teachingMoments?.map((moment) => ({
      ...moment,
      eyebrow: translateStudyText(moment.eyebrow, language),
      title: translateStudyText(moment.title, language),
      body: translateStudyText(moment.body, language),
      actionLabel: moment.actionLabel ? translateStudyText(moment.actionLabel, language) : moment.actionLabel,
      revealLabel: moment.revealLabel ? translateStudyText(moment.revealLabel, language) : moment.revealLabel,
      revealBody: moment.revealBody ? translateStudyText(moment.revealBody, language) : moment.revealBody
    })),
    practiceActivities: lesson.practiceActivities?.map((activity) => ({
      ...activity,
      title: translateStudyText(activity.title, language),
      prompt: translateStudyText(activity.prompt, language),
      instructions: translateStudyText(activity.instructions, language),
      explanation: translateStudyText(activity.explanation, language),
      successLabel: activity.successLabel ? translateStudyText(activity.successLabel, language) : activity.successLabel,
      retryLabel: activity.retryLabel ? translateStudyText(activity.retryLabel, language) : activity.retryLabel,
      options: activity.options.map((choice) => ({
        ...choice,
        label: translateStudyText(choice.label, language)
      }))
    })),
    sources: lesson.sources.map((source) => localizeSource(source, language)),
    // The one source that says the learn card, for its chip: localized the same way as the list it sits in.
    learnSource: lesson.learnSource ? localizeSource(lesson.learnSource, language) : lesson.learnSource,
    challenges: lesson.challenges.map((challenge) => localizeChallenge(challenge, language))
  };
}

function localizeSource(source: LessonSource, language: SupportedLanguage): LessonSource {
  return {
    ...source,
    title: translateStudyText(source.title, language),
    reference: source.reference ? translateStudyText(source.reference, language) : source.reference,
    summary: translateStudyText(source.summary, language),
    from: source.from ? translateStudyText(source.from, language) : source.from,
    grade: source.grade ? translateStudyText(source.grade, language) : source.grade,
    teaches: source.teaches ? translateStudyText(source.teaches, language) : source.teaches,
    whyAttached: source.whyAttached ? translateStudyText(source.whyAttached, language) : source.whyAttached,
    url: localizeSourceUrl(source.url, source.site, language)
  };
}

function localizeChallenge(challenge: Challenge, language: SupportedLanguage): Challenge {
  return {
    ...challenge,
    prompt: translateStudyText(challenge.prompt, language),
    explanation: translateStudyText(challenge.explanation, language),
    miniLesson: challenge.miniLesson ? translateStudyText(challenge.miniLesson, language) : challenge.miniLesson,
    easierExplanation: challenge.easierExplanation ? translateStudyText(challenge.easierExplanation, language) : challenge.easierExplanation,
    reviewSuggestion: challenge.reviewSuggestion ? translateStudyText(challenge.reviewSuggestion, language) : challenge.reviewSuggestion,
    resourceLabel: challenge.resourceLabel ? translateStudyText(challenge.resourceLabel, language) : challenge.resourceLabel,
    choices: challenge.choices.map((choice) => ({
      ...choice,
      label: translateStudyText(choice.label, language)
    }))
  };
}

// Lesson text is translated whole, string by string, from the language's catalog. Anything not yet
// translated stays in English rather than being patched word by word.
export function translateStudyText(text: string, language: SupportedLanguage) {
  if (language === "en" || !text.trim()) {
    return text;
  }

  const trimmed = text.trim();
  const translated = t(trimmed, undefined, language);

  return translated === trimmed ? text : translated;
}

/** The answer sheet's source chip: its label from the catalog, its link opened in the learner's language. */
export function localizeAnswerSource(source: AnswerSource | undefined, language: SupportedLanguage): AnswerSource | undefined {
  return source ? { ...source, label: translateStudyText(source.label, language), url: localizeSourceUrl(source.url, source.site, language) } : undefined;
}

function localizeSourceUrl(url: string, site: LessonSource["site"], language: SupportedLanguage) {
  if (language === "en" || site === "YouTube") {
    return url;
  }

  return `https://translate.google.com/translate?sl=auto&tl=${language}&u=${encodeURIComponent(url)}`;
}
