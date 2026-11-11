import * as Speech from "expo-speech";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, ScrollView, StyleSheet, Text, View } from "react-native";
import { SAY_WORDS, sayBeats, sayTranslit, type SayWord } from "../../data/sayWords";
import { t } from "../../i18n";
import { findArabicVoice, recitationForArabic } from "../../services/arabicVoice";
import { playAyah, stopAyah } from "../../services/ayahPlayer";
import { markWordSaid, useSaidWords } from "../../services/saidWords";
import { openSource } from "../../services/sourceLink";
import { ArabicText, withHonorifics } from "../ArabicText";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { Mascot, type MascotAct, type MascotMood } from "../Mascot";
import { useReduceMotion } from "../motion";
import { PopIn } from "../PopIn";
import { Sheet } from "../Sheet";
import { feedback } from "../sound";
import { Tappable } from "../Tappable";
import { textScaled } from "../textScale";
import { colors, darken, fonts, lighten, radii, space, text } from "../theme";
import { TapToPlay } from "../lesson/Teacher";
import { useBackToClose } from "./sheetParts";

/** How long each beat ("Bis", "mil", "lah") stays lit while the learner says it. */
export const BEAT_MS = 460;
/** The count before saying along: 3, 2, 1. */
const COUNT_FROM = 3;
const COUNT_MS = 650;

type Phase = { kind: "ready" } | { kind: "count"; left: number } | { kind: "saying"; beat: number } | { kind: "done" };

/**
 * How a word is heard: the reciter when the word is part of the ayah it cites (never a robot voice for the Quran),
 * otherwise the phone's own Arabic voice when it has one. Without either, there is no Listen button.
 */
function useWordVoice(visible: boolean, soundOn: boolean) {
  const [voice, setVoice] = useState<string | null>(null);
  const playing = useRef<string | null>(null);
  useEffect(() => {
    if (!visible || !soundOn) return undefined;
    let live = true;
    void findArabicVoice().then((id) => {
      if (live) setVoice(id);
    });
    return () => {
      live = false;
    };
  }, [visible, soundOn]);

  const stop = () => {
    if (playing.current) stopAyah(playing.current);
    playing.current = null;
    try {
      void Speech.stop();
    } catch {
      // Nothing to stop.
    }
  };
  useEffect(() => {
    if (!visible) stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const recitation = (word: SayWord) => recitationForArabic(word.arabic, [word.source.reference]);
  const canListen = (word: SayWord) => soundOn && (Boolean(recitation(word)) || Boolean(voice));
  const listen = (word: SayWord) => {
    stop();
    const url = recitation(word);
    if (url) {
      playing.current = url;
      playAyah(url, { once: true });
      return;
    }
    if (!voice) return;
    try {
      Speech.speak(word.arabic, { language: "ar", voice, rate: 0.75 });
    } catch {
      // Hearing it is a bonus.
    }
  };
  return { canListen, listen, stop };
}

/**
 * "Say it out loud": everyday Islamic words to say with the teacher. Listen to the word, then SAY IT WITH ME counts
 * 3, 2, 1 and lights up each beat ("Bis · mil · lah") as the teacher says it, so the learner says it along, out loud.
 * I SAID IT! cheers and moves on. Practice only: nothing is recorded and nothing is scored.
 */
export function SayItSheet({
  visible,
  onClose,
  mascotVariant = "girl",
  accent = colors.green,
  soundOn = true,
  topGap = 40,
  bottomInset = 0
}: {
  visible: boolean;
  onClose: () => void;
  mascotVariant?: string;
  accent?: string;
  /** The learner's sound setting: off, the Listen button is left out. */
  soundOn?: boolean;
  topGap?: number;
  bottomInset?: number;
}) {
  useBackToClose(visible, onClose);
  const said = useSaidWords();
  const reduceMotion = useReduceMotion();
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>({ kind: "ready" });
  const [cheer, setCheer] = useState<MascotAct | undefined>(undefined);
  const [run, setRun] = useState(0);
  const voice = useWordVoice(visible, soundOn);
  const word = SAY_WORDS[index] ?? SAY_WORDS[0];
  const beats = useMemo(() => sayBeats(word), [word]);
  const beatCount = beats.reduce((sum, part) => sum + part.length, 0);
  const chips = useRef<ScrollView>(null);
  const nextTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearNext = () => {
    if (nextTimer.current) clearTimeout(nextTimer.current);
    nextTimer.current = null;
  };
  useEffect(() => clearNext, []);

  // The count, then one beat after another; each step is its own timer so leaving stops it at once.
  useEffect(() => {
    if (!visible) return undefined;
    if (phase.kind === "count") {
      const timer = setTimeout(() => setPhase(phase.left > 1 ? { kind: "count", left: phase.left - 1 } : { kind: "saying", beat: 0 }), reduceMotion ? 200 : COUNT_MS);
      return () => clearTimeout(timer);
    }
    if (phase.kind === "saying") {
      const timer = setTimeout(() => setPhase(phase.beat + 1 < beatCount ? { kind: "saying", beat: phase.beat + 1 } : { kind: "done" }), BEAT_MS);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [phase, beatCount, visible, reduceMotion]);

  useEffect(() => {
    if (!visible) {
      clearNext();
      setCheer(undefined);
      setPhase({ kind: "ready" });
    }
  }, [visible]);

  const go = (next: number) => {
    clearNext();
    voice.stop();
    setCheer(undefined);
    setIndex((next + SAY_WORDS.length) % SAY_WORDS.length);
    setPhase({ kind: "ready" });
  };

  // A new word scrolls its chip into view.
  useEffect(() => {
    chips.current?.scrollTo?.({ x: Math.max(0, index * 120 - 80), animated: !reduceMotion });
  }, [index, reduceMotion]);

  const sayAlong = () => {
    voice.stop();
    feedback("pop", "light");
    setRun((value) => value + 1);
    setPhase({ kind: "count", left: COUNT_FROM });
  };

  const saidIt = () => {
    markWordSaid(word.id);
    feedback("correct", "success");
    setCheer({ kind: "celebrate", key: `${word.id}-${run}` });
    setPhase({ kind: "ready" });
    // A moment to enjoy the cheer, then the next word.
    clearNext();
    nextTimer.current = setTimeout(() => go(index + 1), reduceMotion ? 300 : 1100);
  };

  const litUpTo = phase.kind === "saying" ? phase.beat : phase.kind === "done" ? beatCount : -1;
  const mood: MascotMood = phase.kind === "done" || cheer ? "cheer" : "happy";
  const doneCount = SAY_WORDS.filter((each) => said.includes(each.id)).length;
  let beatNumber = -1;

  return (
    <Sheet visible={visible} onClose={onClose} bottomInset={0} style={[styles.sheet, { top: topGap, paddingBottom: 0 }]} testID="say-sheet">
      <View style={styles.header}>
        <Text style={styles.heading} accessibilityRole="header" numberOfLines={2}>
          {t("Say it out loud")}
        </Text>
        <Tappable onPress={onClose} accessibilityLabel={t("Close")} testID="say-close" style={styles.close} hitSlop={8} pressScale={0.88}>
          <Icon name="close" size={22} color={colors.inkSoft} />
        </Tappable>
      </View>
      <Text style={styles.sub}>{t("Say each word out loud with the teacher. Just practice, no score!")}</Text>

      <ScrollView ref={chips} horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll} contentContainerStyle={styles.chips} testID="say-words">
        {SAY_WORDS.map((each, at) => {
          const done = said.includes(each.id);
          return (
            <Tappable
              key={each.id}
              onPress={() => go(at)}
              pressScale={0.94}
              style={[styles.chip, done ? styles.chipDone : null, at === index ? { borderColor: accent, backgroundColor: lighten(accent, 0.88) } : null]}
              accessibilityRole="button"
              accessibilityState={{ selected: at === index }}
              accessibilityLabel={done ? t("{word}, said", { word: sayTranslit(each) }) : sayTranslit(each)}
              testID={`say-word-${each.id}`}
            >
              {done ? <Icon name="check" size={14} color={colors.green} /> : null}
              <Text style={styles.chipText} numberOfLines={1}>
                {sayTranslit(each)}
              </Text>
            </Tappable>
          );
        })}
      </ScrollView>

      <ScrollView style={styles.scroll} contentContainerStyle={[styles.content, { paddingBottom: 28 + bottomInset }]} showsVerticalScrollIndicator={false}>
        <View style={styles.teacherRow}>
          <TapToPlay testID="say-teacher">
            {(tapMood) => (
              <Mascot key={`talk-${run}-${phase.kind === "saying" ? "on" : "off"}`} variant={mascotVariant} accent={accent} size={84} mood={tapMood ?? mood} act={cheer} talkMs={phase.kind === "saying" ? (beatCount - Math.max(0, litUpTo)) * BEAT_MS : 0} />
            )}
          </TapToPlay>
          <View style={styles.counter}>
            <Text style={styles.counterText} testID="say-progress">
              {t("Word {count} of {total}", { count: index + 1, total: SAY_WORDS.length })}
            </Text>
            <Text style={styles.counterSaid} testID="say-said-count">
              {t("{count} said out loud", { count: doneCount })}
            </Text>
          </View>
        </View>

        <PopIn key={word.id} from="scale" style={[styles.card, { borderColor: lighten(accent, 0.6) }]}>
          <View testID="say-card">
            <ArabicText size={word.arabic.length > 30 ? 30 : 40} weight="bold" color={darken(accent, 0.35)} testID="say-arabic">
              {word.arabic}
            </ArabicText>
            <View style={styles.beats} accessible accessibilityLabel={sayTranslit(word)} testID="say-beats">
              {beats.map((part, wordAt) => (
                <View key={`${word.id}-${wordAt}`} style={styles.beatWord}>
                  {part.map((beat, beatAt) => {
                    beatNumber += 1;
                    const lit = beatNumber <= litUpTo;
                    const now = phase.kind === "saying" && beatNumber === litUpTo;
                    return (
                      <Beat key={`${beatAt}-${beat}`} text={beat} lit={lit} now={now} accent={accent} joined={beatAt < part.length - 1} />
                    );
                  })}
                </View>
              ))}
            </View>
            <Text style={styles.meaning} testID="say-meaning">
              {withHonorifics(t(word.meaning))}
            </Text>
            <View style={styles.whenBox}>
              <Text style={styles.whenLabel}>{t("When to say it")}</Text>
              <Text style={styles.whenText} testID="say-when">
                {withHonorifics(t(word.when))}
              </Text>
            </View>
            <Tappable onPress={() => openSource(word.source)} style={styles.source} accessibilityRole="link" accessibilityLabel={t("Open source {name}", { name: word.source.reference ?? word.source.title })} hitSlop={6} testID="say-source">
              <Icon name="book" size={16} />
              <Text style={styles.sourceText} numberOfLines={1}>
                {word.source.reference ?? word.source.title}
              </Text>
              <Icon name="chevronRight" size={14} color={colors.inkSoft} />
            </Tappable>
          </View>
        </PopIn>

        {phase.kind === "count" ? (
          <PopIn key={`count-${phase.left}`} from="scale" style={styles.countWrap}>
            <Text style={[styles.count, { color: accent }]} testID="say-count">
              {phase.left}
            </Text>
          </PopIn>
        ) : null}

        <View style={styles.buttons}>
          {phase.kind === "done" ? (
            <>
              <GameButton label={t("I said it!")} icon="check" fullWidth onPress={saidIt} testID="say-said" />
              <GameButton label={t("Again")} variant="secondary" fullWidth onPress={sayAlong} testID="say-again" />
            </>
          ) : (
            <>
              <GameButton label={t("Say it with me")} icon="speech" fullWidth onPress={sayAlong} disabled={phase.kind !== "ready"} testID="say-along" />
              {voice.canListen(word) ? <GameButton label={t("Listen")} icon="speaker" variant="secondary" fullWidth onPress={() => voice.listen(word)} disabled={phase.kind !== "ready"} testID="say-listen" /> : null}
            </>
          )}
          <View style={styles.steps}>
            <Tappable onPress={() => go(index - 1)} style={styles.step} accessibilityLabel={t("Previous word")} hitSlop={6} testID="say-prev">
              <Icon name="arrowLeft" size={22} color={colors.inkSoft} />
            </Tappable>
            <Tappable onPress={() => go(index + 1)} style={styles.step} accessibilityLabel={t("Next word")} hitSlop={6} testID="say-next">
              <View style={styles.flip}>
                <Icon name="arrowLeft" size={22} color={colors.inkSoft} />
              </View>
            </Tappable>
          </View>
        </View>
      </ScrollView>
    </Sheet>
  );
}

/** One beat of the word: grey until it is said, then the topic color, with a little hop the moment it lights up. */
function Beat({ text: beat, lit, now, accent, joined }: { text: string; lit: boolean; now: boolean; accent: string; joined: boolean }) {
  const reduceMotion = useReduceMotion();
  const hop = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!now || reduceMotion) return undefined;
    hop.setValue(0);
    const run = Animated.timing(hop, { toValue: 1, duration: 320, easing: Easing.out(Easing.quad), useNativeDriver: true });
    run.start();
    return () => run.stop();
  }, [now, reduceMotion, hop]);
  return (
    <Animated.View style={{ transform: [{ translateY: hop.interpolate({ inputRange: [0, 0.4, 1], outputRange: [0, -6, 0] }) }, { scale: hop.interpolate({ inputRange: [0, 0.4, 1], outputRange: [1, 1.15, 1] }) }] }}>
      <Text style={[styles.beat, lit ? { color: darken(accent, 0.2) } : null]} testID={lit ? "say-beat-lit" : "say-beat"}>
        {beat}
        {joined ? <Text style={styles.beatDot}>·</Text> : null}
      </Text>
    </Animated.View>
  );
}

const styles = textScaled(
  StyleSheet.create({
    sheet: { paddingTop: 14 },
    header: { flexDirection: "row", alignItems: "center", marginBottom: 2 },
    heading: { ...text.h2, flex: 1, minWidth: 0 },
    close: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: colors.mist },
    sub: { fontFamily: fonts.bodyBold, fontSize: 15, lineHeight: 21, color: colors.inkSoft },
    chipsScroll: { flexGrow: 0, marginTop: space.sm, marginHorizontal: -space.lg },
    chips: { gap: space.xs, paddingHorizontal: space.lg },
    chip: { flexDirection: "row", alignItems: "center", gap: 4, height: 36, paddingHorizontal: space.sm, borderRadius: 18, borderWidth: 2, borderColor: colors.line, backgroundColor: colors.white },
    chipDone: { borderColor: lighten(colors.green, 0.5) },
    chipText: { fontFamily: fonts.bodyHeavy, fontSize: 14, color: colors.ink, maxWidth: 220 },
    scroll: { flex: 1, marginTop: space.sm },
    content: { gap: space.md },
    teacherRow: { flexDirection: "row", alignItems: "flex-end", gap: space.md },
    counter: { flex: 1, paddingBottom: space.sm },
    counterText: { fontFamily: fonts.displayHeavy, fontSize: 18, color: colors.ink },
    counterSaid: { fontFamily: fonts.bodyBold, fontSize: 14, color: colors.inkSoft, marginTop: 2 },
    card: { borderWidth: 2, borderRadius: radii.lg, backgroundColor: colors.white, paddingVertical: space.md, paddingHorizontal: space.md },
    // The transliteration reads left to right in every language, Urdu and Arabic too.
    beats: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", columnGap: 12, rowGap: 4, marginTop: space.xs, direction: "ltr" },
    beatWord: { flexDirection: "row", alignItems: "flex-end", direction: "ltr" },
    beat: { fontFamily: fonts.displayHeavy, fontSize: 26, lineHeight: 34, color: colors.lineLip },
    beatDot: { color: colors.line },
    meaning: { marginTop: space.sm, fontFamily: fonts.bodyHeavy, fontSize: 18, lineHeight: 24, color: colors.ink, textAlign: "center" },
    whenBox: { marginTop: space.sm, borderRadius: radii.md, backgroundColor: colors.mist, padding: space.sm },
    whenLabel: { fontFamily: fonts.bodyHeavy, fontSize: 12, letterSpacing: 0.6, textTransform: "uppercase", color: colors.inkSoft },
    whenText: { marginTop: 2, fontFamily: fonts.bodyBold, fontSize: 16, lineHeight: 22, color: colors.ink },
    source: { flexDirection: "row", alignItems: "center", alignSelf: "center", gap: 6, marginTop: space.sm, paddingVertical: 6, paddingHorizontal: 12, borderRadius: radii.pill, borderWidth: 2, borderColor: colors.line },
    sourceText: { fontFamily: fonts.bodyHeavy, fontSize: 14, color: colors.ink, flexShrink: 1 },
    countWrap: { alignItems: "center" },
    count: { fontFamily: fonts.displayHeavy, fontSize: 56, lineHeight: 64 },
    buttons: { gap: space.sm },
    steps: { flexDirection: "row", justifyContent: "space-between" },
    step: { width: 48, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: colors.mist },
    flip: { transform: [{ scaleX: -1 }] }
  })
);
