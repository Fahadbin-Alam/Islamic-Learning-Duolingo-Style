import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ayahPosition, playAyah, stopAyah } from "../../services/ayahPlayer";
import { ayahPieces, ayahWordTimes, type AyahPiece } from "../../services/ayahWords";
import { t } from "../../i18n";
import { ArabicText } from "../ArabicText";
import { Icon } from "../Icon";
import { useReduceMotion } from "../motion";
import { Tappable } from "../Tappable";
import { scaleFont } from "../textScale";
import { colors, darken, fonts, lighten } from "../theme";
import { useAyahPlayback } from "./AyahListen";
import { useRecitedWord } from "./RecitedAyah";

/** The reciter stops this long before the last word starts, so none of it is heard before the answer. */
const LEAD_S = 0.08;
/** How often the recitation's place is checked on its way to the gap. */
const TICK_MS = 50;
/** Within this much of the gap, a timer stops it on time instead of the next check. */
const CLOSE_S = 0.25;
const BLINK_MS = 480;
/** The ayah's size, bigger with "Bigger text" in Settings, like the question above it. */
const AYAH_SIZE = 23;
const LIT = "rgba(255, 207, 51, 0.55)";
const GAP_BG = lighten(colors.gold, 0.72);
const GAP_GLOW = "rgba(255, 194, 26, 0.75)";
const ANSWER_BG = "rgba(33, 181, 115, 0.18)";
/** The gap where the last word goes: about a word wide. */
const GAP = "   ؟   ";

export type ReciteCardProps = {
  /** The whole ayah, as the lesson quoted it. */
  text: string;
  /** "112:4": its word timings (ayahWords.ts). */
  ayahKey: string;
  /** Its recitation (quranAudio.ts). */
  url: string;
  /** The word (from 0) the learner picks: a gap until the answer. With `next`, the ayah's number of words: none hidden. */
  gap: number;
  /** "Which ayah comes next?": the ayah after it, a gap of its own until the answer; then the reciter goes on to it. */
  next?: { text: string; ayahKey: string; url: string };
  /** Plays the ayah from its start, or stops it. */
  onPlay: () => void;
  playing: boolean;
  /** After CHECK: the gap shows its answer, and a recitation waiting at the gap goes on to say it. */
  answered: boolean;
  accent: string;
  /** Memorizing a surah: its number of ayahs, so the card says which one this is ("Ayah 2 of 4"). */
  ayahs?: number;
};

/**
 * The Quran's listening questions (reciteQuestion.ts). "How does the ayah end?": the ayah with its last word missing.
 * Listen recites it with each word lighting up as it is said, and stops just before the gap, which glows: the
 * learner's turn. Once answered, the word fills the gap and the reciter says it. "Which ayah comes next?": the whole
 * ayah, recited to its end, and a glowing gap under it for the next one; once answered, the next ayah fills it and
 * the reciter goes on to it, its words lighting up in turn.
 */
export function ReciteCard({ text, ayahKey, url, gap, next, onPlay, playing, answered, accent, ayahs }: ReciteCardProps) {
  const reduceMotion = useReduceMotion();
  const playback = useAyahPlayback();
  const nextText = next?.text;
  const nextKey = next?.ayahKey;
  const nextUrl = next?.url;
  const first = useMemo(() => ayahPieces(text), [text]);
  const second = useMemo(() => (nextText ? ayahPieces(nextText) : undefined), [nextText]);
  const parts = useMemo(
    () => [{ key: ayahKey, url }, ...(nextKey && nextUrl ? [{ key: nextKey, url: nextUrl }] : [])],
    [ayahKey, url, nextKey, nextUrl]
  );
  // The word being said, counted across both ayahs.
  const lit = useRecitedWord(parts, first.words + (second?.words ?? 0));
  const nextPlaying = Boolean(nextUrl) && playback.url === nextUrl && (playback.status === "playing" || playback.status === "loading");
  const busy = playing || nextPlaying;
  // "How does the ayah end?" stops before its last word; "Which ayah comes next?" plays the ayah to its end.
  const stopAt = useMemo(() => {
    const start = nextKey ? undefined : ayahWordTimes(ayahKey)?.[gap];
    return start === undefined ? undefined : Math.max(0, start - LEAD_S);
  }, [ayahKey, gap, nextKey]);
  // Stopped at the gap, waiting for the learner.
  const [waiting, setWaiting] = useState(false);
  const waitingRef = useRef(waiting);
  waitingRef.current = waiting;
  // "Which ayah comes next?": this recitation reached the ayah's last word.
  const heardEnd = useRef(false);
  const [glow, setGlow] = useState(false);

  useEffect(() => {
    if (playing) {
      setWaiting(false);
      heardEnd.current = false;
    }
  }, [playing]);

  // Before the answer, the reciter stops at the gap.
  useEffect(() => {
    if (answered || !playing || stopAt === undefined) return undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const stop = () => {
      clearInterval(poll);
      stopAyah(url);
      setWaiting(true);
    };
    const tick = () => {
      const at = ayahPosition(url);
      if (at === undefined || timer) return;
      const left = stopAt - at;
      if (left <= 0) stop();
      else if (left < CLOSE_S) timer = setTimeout(stop, left * 1000);
    };
    const poll = setInterval(tick, TICK_MS);
    tick();
    return () => {
      clearInterval(poll);
      if (timer) clearTimeout(timer);
    };
  }, [answered, playing, stopAt, url]);

  // "Which ayah comes next?": recited to its last word, the ayah waits for the learner when it ends (not when stopped).
  useEffect(() => {
    if (nextText && playing && lit === first.words - 1) heardEnd.current = true;
  }, [nextText, playing, lit, first.words]);
  useEffect(() => {
    if (!nextText || playing || answered || !heardEnd.current) return;
    heardEnd.current = false;
    setWaiting(true);
  }, [nextText, playing, answered]);

  // Answered while waiting: the reciter goes on, from the gap to say the word, or to the next ayah.
  useEffect(() => {
    if (!answered || !waitingRef.current) return;
    setWaiting(false);
    if (nextUrl) playAyah(nextUrl, { once: true });
    else playAyah(url, { once: true, resume: true });
  }, [answered, url, nextUrl]);

  // The waiting gap glows on and off (steady with reduced motion).
  useEffect(() => {
    if (!waiting || answered || reduceMotion) {
      setGlow(waiting && !answered);
      return undefined;
    }
    setGlow(true);
    const timer = setInterval(() => setGlow((on) => !on), BLINK_MS);
    return () => clearInterval(timer);
  }, [waiting, answered, reduceMotion]);

  // The recitation stops with the question.
  useEffect(
    () => () => {
      stopAyah(url);
      if (nextUrl) stopAyah(nextUrl);
    },
    [url, nextUrl]
  );

  const size = scaleFont(AYAH_SIZE);
  const hint = busy ? t("Listening…") : waiting && !answered ? t("Your turn") : t("Tap to listen");
  return (
    <View style={[styles.card, { borderColor: lighten(accent, 0.55) }]} testID="recite-card">
      {ayahs ? (
        <Text style={[styles.place, { color: darken(accent, 0.25), backgroundColor: lighten(accent, 0.88) }]} testID="recite-place">
          {t("Ayah {number} of {count}", { number: Number(ayahKey.split(":")[1]), count: ayahs })}
        </Text>
      ) : null}
      <ArabicText size={size} quran align="right" color={colors.ink} style={styles.ayah} testID="recite-ayah">
        {first.pieces.map((piece, index) => {
          if (piece.word === gap && !answered) {
            return (
              <Text key={index} style={[styles.gap, glow ? styles.gapGlow : null]} testID="recite-gap">
                {GAP}
              </Text>
            );
          }
          if (piece.word >= 0 && piece.word === lit) {
            return (
              <Text key={index} style={styles.lit} testID="recited-word">
                {piece.text}
              </Text>
            );
          }
          if (piece.word === gap) {
            return (
              <Text key={index} style={styles.answer} testID="recite-answer">
                {piece.text}
              </Text>
            );
          }
          return piece.text;
        })}
      </ArabicText>
      {second && !answered ? (
        <View style={[styles.nextGap, glow ? styles.gapGlow : null]} testID="recite-gap">
          <Text style={[styles.nextGapMark, { fontSize: size, lineHeight: Math.round(size * 1.5) }]}>؟</Text>
        </View>
      ) : null}
      {second && answered ? (
        <ArabicText size={size} quran align="right" color={colors.ink} style={[styles.ayah, styles.nextAyah]} testID="recite-answer">
          {litPieces(second.pieces, lit === undefined ? undefined : lit - first.words)}
        </ArabicText>
      ) : null}
      <View style={styles.row}>
        <Tappable
          onPress={nextPlaying && nextUrl ? () => stopAyah(nextUrl) : onPlay}
          pressScale={0.92}
          style={[styles.play, { backgroundColor: accent, borderBottomColor: darken(accent, 0.22) }]}
          accessibilityRole="button"
          accessibilityLabel={busy ? t("Stop") : t("Listen")}
          testID="recite-play"
        >
          {busy ? <View style={styles.stopSquare} /> : <Icon name="speaker" size={24} color={colors.white} />}
        </Tappable>
        <Text style={[styles.hint, waiting && !answered ? { color: darken(colors.gold, 0.35) } : null]} testID="recite-hint">
          {hint}
        </Text>
      </View>
    </View>
  );
}

/** An ayah's pieces, with word `lit` (from 0) lit up while the reciter says it. */
function litPieces(pieces: AyahPiece[], lit: number | undefined) {
  return pieces.map((piece, index) =>
    piece.word >= 0 && piece.word === lit ? (
      <Text key={index} style={styles.lit} testID="recited-word">
        {piece.text}
      </Text>
    ) : (
      piece.text
    )
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: "stretch",
    marginTop: 10,
    marginBottom: 6,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 12,
    borderWidth: 2,
    borderRadius: 18,
    backgroundColor: colors.white
  },
  ayah: {
    alignSelf: "stretch"
  },
  place: {
    alignSelf: "flex-start",
    overflow: "hidden",
    marginBottom: 4,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 999,
    fontFamily: fonts.bodyHeavy,
    fontSize: 13,
    lineHeight: 18
  },
  lit: {
    backgroundColor: LIT
  },
  gap: {
    backgroundColor: GAP_BG,
    color: darken(colors.gold, 0.35)
  },
  gapGlow: {
    backgroundColor: GAP_GLOW
  },
  answer: {
    backgroundColor: ANSWER_BG
  },
  nextGap: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    borderRadius: 12,
    backgroundColor: GAP_BG
  },
  nextGapMark: {
    fontFamily: fonts.bodyHeavy,
    color: darken(colors.gold, 0.35)
  },
  nextAyah: {
    marginTop: 6,
    paddingHorizontal: 6,
    borderRadius: 12,
    backgroundColor: ANSWER_BG
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 8
  },
  play: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 4
  },
  stopSquare: {
    width: 15,
    height: 15,
    borderRadius: 3,
    backgroundColor: colors.white
  },
  hint: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 14,
    color: colors.inkSoft
  }
});
