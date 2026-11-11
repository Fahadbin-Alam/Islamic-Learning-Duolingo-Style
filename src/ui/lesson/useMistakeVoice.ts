import { useCallback, useEffect, useRef, useState } from "react";
import { getActiveLanguage } from "../../i18n";
import { findTeacherVoice, knownTeacherVoice, mistakeExplanation, speakingMs, speakTeacher, stopTeacher } from "../../services/teacherVoice";

/**
 * The speaker on a wrong answer's sheet: tap it and the teacher says the right answer and why, its mouth moving
 * while it talks. Nothing plays by itself. Stops when the sheet goes (the next question) or on a second tap.
 *
 * Returns `onListen` (undefined when the phone has no voice for the language, so the button hides), whether it is
 * talking, and `talkMs` for the mascot's mouth (0 when quiet).
 */
export function useMistakeVoice(open: boolean, correct: boolean, correctLabel?: string, why?: string) {
  const language = getActiveLanguage();
  const [voice, setVoice] = useState<string | null>(() => knownTeacherVoice(language) ?? null);
  const [talkMs, setTalkMs] = useState(0);
  const turn = useRef(0);

  useEffect(() => {
    let live = true;
    void findTeacherVoice(language).then((id) => {
      if (live) setVoice(id);
    });
    return () => {
      live = false;
    };
  }, [language]);

  // The sheet went, or the answer changed: stop talking.
  useEffect(() => {
    if (open) return undefined;
    turn.current += 1;
    setTalkMs(0);
    return undefined;
  }, [open]);
  useEffect(() => {
    if (talkMs <= 0) return undefined;
    // A voice that fails without a word still ends the talking, a little after it should have finished.
    const fallback = setTimeout(() => setTalkMs(0), talkMs + 2500);
    return () => {
      clearTimeout(fallback);
      stopTeacher();
    };
  }, [talkMs]);

  const text = open && !correct ? mistakeExplanation(correctLabel, why, language) : "";
  const listening = talkMs > 0;
  const onListen = useCallback(() => {
    turn.current += 1;
    if (listening) {
      stopTeacher();
      setTalkMs(0);
      return;
    }
    const mine = turn.current;
    setTalkMs(speakingMs(text));
    speakTeacher(text, language, voice ?? "", () => {
      if (turn.current === mine) setTalkMs(0);
    });
  }, [language, listening, text, voice]);

  return { onListen: voice !== null && text ? onListen : undefined, listening, talkMs };
}
