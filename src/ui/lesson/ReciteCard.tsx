import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ayahPosition, playAyah, stopAyah } from "../../services/ayahPlayer";
import { ayahPieces, ayahWordTimes } from "../../services/ayahWords";
import { t } from "../../i18n";
import { ArabicText } from "../ArabicText";
import { Icon } from "../Icon";
import { useReduceMotion } from "../motion";
import { Tappable } from "../Tappable";
import { colors, darken, fonts, lighten } from "../theme";
import { useRecitedWord } from "./RecitedAyah";

/** The reciter stops this long before the last word starts, so none of it is heard before the answer. */
const LEAD_S = 0.08;
/** How often the recitation's place is checked on its way to the gap. */
const TICK_MS = 50;
/** Within this much of the gap, a timer stops it on time instead of the next check. */
const CLOSE_S = 0.25;
const BLINK_MS = 480;
const LIT = "rgba(255, 207, 51, 0.55)";
const GAP_BG = lighten(colors.gold, 0.72);
const GAP_GLOW = "rgba(255, 194, 26, 0.75)";
const ANSWER_BG = "rgba(33, 181, 115, 0.18)";
/** The gap where the last word goes: about a word wide. */
const GAP = "   ؟   ";

export type ReciteCardProps = {
  /** The whole ayah, as the lesson quoted it. */
  text: string;
  /** "112:4": its word timings (ayahWords.ts). */
  ayahKey: string;
  /** Its recitation (quranAudio.ts). */
  url: string;
  /** The word (from 0) the learner picks: a gap until the answer. */
  gap: number;
  /** Plays the ayah from its start, or stops it. */
  onPlay: () => void;
  playing: boolean;
  /** After CHECK: the gap shows its word, and a recitation stopped at the gap goes on to say it. */
  answered: boolean;
  accent: string;
};

/**
 * "How does the ayah end?": the ayah with its last word missing. Listen recites it with each word lighting up as it is
 * said, and stops just before the gap, which glows: the learner's turn. Once answered, the word fills the gap and the
 * reciter says it.
 */
export function ReciteCard({ text, ayahKey, url, gap, onPlay, playing, answered, accent }: ReciteCardProps) {
  const reduceMotion = useReduceMotion();
  const { pieces, words } = useMemo(() => ayahPieces(text), [text]);
  const ayahs = useMemo(() => [{ key: ayahKey, url }], [ayahKey, url]);
  const lit = useRecitedWord(ayahs, words);
  const stopAt = useMemo(() => {
    const start = ayahWordTimes(ayahKey)?.[gap];
    return start === undefined ? undefined : Math.max(0, start - LEAD_S);
  }, [ayahKey, gap]);
  // Stopped before the last word, waiting for the learner.
  const [waiting, setWaiting] = useState(false);
  const waitingRef = useRef(waiting);
  waitingRef.current = waiting;
  const [glow, setGlow] = useState(false);

  useEffect(() => {
    if (playing) setWaiting(false);
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

  // Answered while waiting: the reciter goes on from the gap and says the word.
  useEffect(() => {
    if (!answered || !waitingRef.current) return;
    setWaiting(false);
    playAyah(url, { once: true, resume: true });
  }, [answered, url]);

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
  useEffect(() => () => stopAyah(url), [url]);

  const hint = playing ? t("Listening…") : waiting && !answered ? t("Your turn") : t("Tap to listen");
  return (
    <View style={[styles.card, { borderColor: lighten(accent, 0.55) }]} testID="recite-card">
      <ArabicText size={23} quran align="right" color={colors.ink} style={styles.ayah} testID="recite-ayah">
        {pieces.map((piece, index) => {
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
      <View style={styles.row}>
        <Tappable
          onPress={onPlay}
          pressScale={0.92}
          style={[styles.play, { backgroundColor: accent, borderBottomColor: darken(accent, 0.22) }]}
          accessibilityRole="button"
          accessibilityLabel={playing ? t("Stop") : t("Listen")}
          testID="recite-play"
        >
          {playing ? <View style={styles.stopSquare} /> : <Icon name="speaker" size={24} color={colors.white} />}
        </Tappable>
        <Text style={[styles.hint, waiting && !answered ? { color: darken(colors.gold, 0.35) } : null]} testID="recite-hint">
          {hint}
        </Text>
      </View>
    </View>
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
