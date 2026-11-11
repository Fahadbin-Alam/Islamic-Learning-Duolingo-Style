import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { ayahPosition } from "../../services/ayahPlayer";
import { ayahPieces, ayahWordTimes, wordAt } from "../../services/ayahWords";
import { ArabicText, type ArabicTextProps } from "../ArabicText";
import { useAyahPlayback } from "./AyahListen";

/** One ayah of a passage: its key ("2:255") and the recitation that plays it (quranAudioUrl). */
export type RecitedPart = { key: string; url: string };

/** How often the light checks where the recitation is. */
const TICK_MS = 60;
const LIT = "rgba(255, 207, 51, 0.55)";

/** Where each ayah's words start in the whole passage, when the timings fit the text word for word. */
function passageTimes(ayahs: readonly RecitedPart[], words: number) {
  let offset = 0;
  const parts: Array<RecitedPart & { offset: number; times: number[] }> = [];
  for (const ayah of ayahs) {
    const times = ayahWordTimes(ayah.key);
    if (!times) return undefined;
    parts.push({ ...ayah, offset, times });
    offset += times.length - 1;
  }
  return offset === words ? parts : undefined;
}

/** True when the passage's words can light up: every ayah has timings and together they fit the text word for word. */
export function fitsRecitation(text: string, ayahs: readonly RecitedPart[]): boolean {
  return ayahs.length > 0 && passageTimes(ayahs, ayahPieces(text).words) !== undefined;
}

/**
 * The word of the passage (counted from 0 across all its ayahs) that the reciter is saying now, while one of its
 * ayahs plays; undefined otherwise, and always for a text its timings do not fit.
 */
export function useRecitedWord(ayahs: readonly RecitedPart[], words: number): number | undefined {
  const playback = useAyahPlayback();
  const playingIndex = playback.status === "playing" ? ayahs.findIndex((ayah) => ayah.url === playback.url) : -1;
  const playing = playingIndex >= 0;
  const keys = ayahs.map((ayah) => `${ayah.key} ${ayah.url}`).join("|");
  // The timings load with the first recitation, not with the page.
  const parts = useMemo(() => (playing ? passageTimes(ayahs, words) : undefined), [playing, keys, words]); // eslint-disable-line react-hooks/exhaustive-deps
  const part = parts?.[playingIndex];
  const [word, setWord] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!part) {
      setWord(undefined);
      return undefined;
    }
    const tick = () => {
      const seconds = ayahPosition(part.url);
      const local = seconds === undefined ? undefined : wordAt(part.times, seconds);
      const next = local === undefined ? undefined : part.offset + local;
      setWord((current) => (current === next ? current : next));
    };
    tick();
    const timer = setInterval(tick, TICK_MS);
    return () => clearInterval(timer);
  }, [part]);

  return part ? word : undefined;
}

/**
 * Quran text whose words light up one by one, in gold, as the reciter says them (Listen under it), so a learner
 * can follow the Arabic. `ayahs` are the ayahs the text holds, in order; `text` is exactly their words. Shown as a
 * plain ArabicText while nothing of it is playing, or when the timings do not fit the text.
 */
export function RecitedAyah({ text, ayahs, ...props }: Omit<ArabicTextProps, "children"> & { text: string; ayahs: readonly RecitedPart[] }) {
  const { pieces, words } = useMemo(() => ayahPieces(text), [text]);
  const lit = useRecitedWord(ayahs, words);
  if (lit === undefined) {
    return <ArabicText {...props}>{text}</ArabicText>;
  }
  return (
    <ArabicText {...props}>
      {pieces.map((piece, index) =>
        piece.word === lit ? (
          <Text key={index} style={styles.lit} testID="recited-word">
            {piece.text}
          </Text>
        ) : (
          piece.text
        )
      )}
    </ArabicText>
  );
}

const styles = StyleSheet.create({
  lit: {
    backgroundColor: LIT
  }
});
