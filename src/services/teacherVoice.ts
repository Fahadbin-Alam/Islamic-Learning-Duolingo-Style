import * as Speech from "expo-speech";
import { t } from "../i18n";
import type { SupportedLanguage } from "../types";

/**
 * The teacher reads out why an answer was wrong: the right answer, then the reason, in the learner's language.
 * Only when the learner taps the speaker (nothing plays by itself), and only in a language the phone can say:
 * English always; Bangla, Urdu and Arabic only when the phone has that voice, since another voice would read the
 * letters wrongly. The button is hidden otherwise.
 */

const SPEECH_CODE: Record<SupportedLanguage, string> = { en: "en", bn: "bn", ur: "ur", ar: "ar" };
const voices = new Map<SupportedLanguage, Promise<string | null>>();

async function listVoices(): Promise<Speech.Voice[]> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<Speech.Voice[]>((resolve) => {
    timer = setTimeout(() => resolve([]), 1500);
  });
  try {
    return (await Promise.race([Speech.getAvailableVoicesAsync(), timeout])) ?? [];
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

/** "" for the phone's own default voice (English), a voice id, or null when the phone cannot say this language. */
export function findTeacherVoice(language: SupportedLanguage): Promise<string | null> {
  if (language === "en") {
    return Promise.resolve("");
  }
  let found = voices.get(language);
  if (!found) {
    const code = SPEECH_CODE[language];
    const lookup = (async () => {
      let list = await listVoices();
      if (list.length === 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        list = await listVoices();
      }
      return list.find((voice) => voice.language?.toLowerCase().startsWith(code))?.identifier ?? null;
    })();
    found = lookup;
    voices.set(language, lookup);
    // "None" is asked again next time: the speech engine may still be starting, or a voice may be installed.
    void lookup.then((id) => {
      if (id === null && voices.get(language) === lookup) {
        voices.delete(language);
      }
    });
  }
  return found;
}

const ARABIC_RUN = /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]+[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿\s،]*/g;

/** Text as the voice should say it: ﷺ said in words, and Arabic script dropped for a voice that cannot read it. */
export function speakable(text: string, language: SupportedLanguage) {
  let spoken = text.replace(/ﷺ/g, ` ${t("peace be upon him", undefined, language)} `);
  if (language === "en" || language === "bn") {
    spoken = spoken.replace(ARABIC_RUN, " ");
  }
  return spoken
    .replace(/\(\s*\)/g, " ")
    .replace(/_{2,}/g, " ")
    .replace(/\s+([,.!?;:])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/** What the teacher says for a wrong answer: the right answer (when it can be said), then why. */
export function mistakeExplanation(correctLabel: string | undefined, why: string | undefined, language: SupportedLanguage) {
  const answer = correctLabel ? speakable(correctLabel, language) : "";
  const reason = why ? speakable(why, language) : "";
  const parts = [answer ? t("The right answer is: {answer}.", { answer }, language) : "", reason];
  return parts.filter(Boolean).join(" ");
}

/** About how long the voice takes, for the teacher's moving mouth (the voice's own "done" ends it sooner). */
export function speakingMs(text: string) {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.min(30000, Math.max(1200, words * 380));
}

export function speakTeacher(text: string, language: SupportedLanguage, voiceId: string, onEnd?: () => void) {
  try {
    void Speech.stop();
    Speech.speak(text, {
      language: SPEECH_CODE[language],
      ...(voiceId ? { voice: voiceId } : null),
      rate: 0.95,
      onDone: onEnd,
      onStopped: onEnd,
      onError: onEnd
    });
  } catch {
    onEnd?.();
  }
}

export function stopTeacher() {
  try {
    void Speech.stop();
  } catch {
    // Nothing was playing.
  }
}

/** Tests only. */
export function resetTeacherVoiceForTests() {
  voices.clear();
}
