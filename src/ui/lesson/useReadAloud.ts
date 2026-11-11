import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getActiveLanguage } from "../../i18n";
import { stopAyah, subscribeAyahPlayback } from "../../services/ayahPlayer";
import { findTeacherVoice, knownTeacherVoice, speakable, speakTeacherParts, stopTeacher } from "../../services/teacherVoice";
import type { SupportedLanguage } from "../../types";

/**
 * About how long a page takes to say, on the long side: the mouth moves this long at most, and the voice's own "done"
 * closes it sooner. A whole page can be long, so this waits longer than a short reply does.
 */
export function readingMs(text: string) {
  const words = text.split(/\s+/).filter(Boolean).length;
  const pauses = (text.match(/[.!?؟।۔:]/g) ?? []).length;
  return Math.min(180000, Math.max(1500, words * 450 + pauses * 350));
}

/** A page's piece as a sentence the voice pauses after (nothing when it is empty). */
function sentence(part: string | undefined | false) {
  const text = (part || "").replace(/\s+/g, " ").trim();
  return !text ? "" : /[.!?؟।۔:]$/.test(text) ? text : `${text}.`;
}

/** Joins a page's pieces into sentences the voice pauses between. */
export function readAloudText(parts: (string | undefined | false)[]) {
  return parts.map(sentence).filter(Boolean).join(" ");
}

/**
 * One piece of what a page reads out, with the key of the thing on the screen that shows it ("question", "answer-b",
 * "line"...): that thing lights up while the teacher says it (see ReadGlow). No text: nothing is said for it.
 */
export type ReadPart = { key: string; text?: string | false };

/** What the voice says for each piece, in order, the empty ones left out. */
export function spokenParts(parts: ReadPart[], language: SupportedLanguage) {
  return parts.map((part) => ({ key: part.key, text: speakable(sentence(part.text), language) })).filter((part) => part.text);
}

/**
 * The teacher reads a lesson page aloud, in the learner's language, its mouth moving while it talks. Only when the
 * learner taps the speaker (nothing plays by itself); a second tap stops it, and so does leaving the page. Hidden
 * when the phone has no voice for the language (Bangla, Urdu or Arabic need one installed; English always works).
 *
 * Returns `onRead` (undefined when there is nothing to read or no voice), whether it is `reading`, and `talkMs` for
 * the teacher's mouth: undefined until the learner first taps (the page's own talking stays), then the voice's length
 * while it reads and 0 once it stops, so the mouth closes with the voice.
 * `stop` ends the reading (nothing happens when it is not reading).
 *
 * Each piece is said as its own sentence, one after another, and `lit` is the key of the piece being said right now,
 * so it can light up on the screen while the teacher says it: a child who cannot read well yet follows along.
 */
export function useReadAloud(parts: ReadPart[]) {
  const language = getActiveLanguage();
  const [voice, setVoice] = useState<string | null>(() => knownTeacherVoice(language) ?? null);
  const [talkMs, setTalkMs] = useState<number | undefined>(undefined);
  const [lit, setLit] = useState<string | undefined>(undefined);
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

  // Leaving the page (each page is its own card) stops the voice.
  useEffect(
    () => () => {
      turn.current += 1;
      stopTeacher();
    },
    []
  );

  // A voice that fails without a word still ends the talking, a little after it should have finished.
  useEffect(() => {
    if (!talkMs) return undefined;
    const fallback = setTimeout(() => setTalkMs(0), talkMs + 2500);
    return () => clearTimeout(fallback);
  }, [talkMs]);

  // The same words keep the same list from one drawing to the next, so the speaker's tap stays the same function.
  const said = spokenParts(parts, language);
  const saidKey = said.map((part) => `${part.key}\u0001${part.text}`).join("\u0002");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const speech = useMemo(() => said, [saidKey]);
  const reading = Boolean(talkMs);
  const stop = useCallback(() => {
    if (!reading) return;
    turn.current += 1;
    stopTeacher();
    setTalkMs(0);
    setLit(undefined);
  }, [reading]);
  // A recitation that starts (the ayah's Listen, or the word's speaker) stops the reading, so the two never talk
  // over each other. The word said by the phone's own voice stops it by itself.
  const stopRef = useRef(stop);
  stopRef.current = stop;
  useEffect(
    () =>
      subscribeAyahPlayback((playback) => {
        if (playback.status === "loading" || playback.status === "playing") stopRef.current();
      }),
    []
  );
  const onRead = useCallback(() => {
    if (reading) {
      stop();
      return;
    }
    turn.current += 1;
    const mine = turn.current;
    // The ayah's recitation stops, so the two never talk over each other.
    stopAyah();
    // A length a little different each time, so the mouth starts over even for the same words.
    setTalkMs(readingMs(speech.map((part) => part.text).join(" ")) + (mine % 2));
    setLit(undefined);
    speakTeacherParts(
      speech.map((part) => part.text),
      language,
      voice ?? "",
      {
        onPart: (index) => {
          if (turn.current === mine) setLit(speech[index]?.key);
        },
        onEnd: () => {
          if (turn.current !== mine) return;
          setTalkMs(0);
          setLit(undefined);
        }
      }
    );
  }, [language, reading, speech, stop, voice]);

  return { onRead: voice !== null && speech.length ? onRead : undefined, reading, talkMs, stop, lit: reading ? lit : undefined };
}
