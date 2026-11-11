import { createContext, useEffect } from "react";
import { hasQuranMarks } from "../ArabicText";
import { readAloudText, useReadAloud, type ReadPart } from "./useReadAloud";

/** A gap in a sentence ("___") is said as a short pause. */
const GAP = /_{2,}/g;
/** A Quran quote in its brackets: the reciter says the Quran (the ayah's Listen), never the phone's voice. */
const QURAN_QUOTE = /﴿[^﴾]*﴾/g;

function sayable(part: string | undefined | false) {
  if (!part || hasQuranMarks(part)) return undefined;
  return part.replace(QURAN_QUOTE, " ").replace(GAP, " … ");
}

/**
 * What the teacher says when the learner taps the speaker by CHECK: the question, then what it shows to answer with
 * (the sentence with its gap, the answers, the places), in the order the screen shows them, a pause between each. Quran
 * text is left out (it has its own recitation), and a gap is a pause.
 */
export function questionAloudText(parts: (string | undefined | false)[]) {
  return readAloudText(parts.map(sayable));
}

/** The same, part by part, each with the key of what shows it on the screen (it lights up while it is said). */
export function questionParts(parts: ReadPart[]): ReadPart[] {
  return parts.map((part) => ({ key: part.key, text: sayable(part.text) }));
}

/** The key a question's answer lights up with while the teacher says it (see ReadRing). */
export function answerPart(id: string) {
  return `answer-${id}`;
}

/** The question itself, in the asking teacher's bubble. */
export const QUESTION_PART = "question";

/**
 * The teacher reads a question aloud (see useReadAloud): only when the learner taps the speaker, never by itself, and
 * it stops when the answer is checked, so the voice never talks over the answer sheet.
 */
export function useQuestionAloud(parts: ReadPart[], checked: boolean) {
  const aloud = useReadAloud(questionParts(parts));
  const { stop } = aloud;
  useEffect(() => {
    if (checked) stop();
  }, [checked, stop]);
  return aloud;
}

/**
 * How long the asking teacher's mouth moves (ms), from the frame that holds the voice (a game's CHECK bar) to the
 * question bubble inside it. Undefined outside such a frame.
 */
export const QuestionTalkContext = createContext<number | undefined>(undefined);
