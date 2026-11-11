import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { Animated, Easing, Pressable, StyleSheet, Text, View } from "react-native";
import { t } from "../../i18n";
import type { GameSoundEvent } from "../../services/gameSoundLibrary";
import { Camel, type CamelOutfit } from "../Camel";
import { Mascot, type MascotMood, type MascotOutfit } from "../Mascot";
import { smoothKeys, useReduceMotion } from "../motion";
import { feedback } from "../sound";
import { colors, fonts } from "../theme";

/**
 * Who teaches a lesson, and what they wear. Every lesson page has its teacher on it, saying the lesson: the
 * camel teaches the Quran (in round reading glasses) and the stories of the prophets and the Companions (in a
 * desert head-cloth); the kid teaches the rest, dressed for the topic. Only made-up characters: never a prophet,
 * a Companion or anyone meant to stand for them.
 */
export type TeacherLook = { character: "kid"; outfit: MascotOutfit } | { character: "camel"; outfit: CamelOutfit };

const KID: TeacherLook = { character: "kid", outfit: "plain" };

const LOOKS: Record<string, TeacherLook> = {
  quran_tafseer: { character: "camel", outfit: "reader" },
  prophets: { character: "camel", outfit: "traveler" },
  sahabah: { character: "camel", outfit: "traveler" },
  women_of_the_book: { character: "camel", outfit: "traveler" },
  scholars: { character: "kid", outfit: "scholar" },
  hadith: { character: "kid", outfit: "scholar" },
  aqidah: { character: "kid", outfit: "scholar" },
  hajj: { character: "kid", outfit: "ihram" },
  akhirah: { character: "kid", outfit: "lantern" },
  sahihayn: { character: "kid", outfit: "scholar" },
  eid: { character: "kid", outfit: "festive" },
  duas: { character: "kid", outfit: "lantern" },
  ramadan: { character: "kid", outfit: "lantern" },
  fasting: { character: "kid", outfit: "lantern" }
};

/** The teacher for a topic (its id, e.g. "quran_tafseer"); the kid in everyday clothes for any other. */
export function teacherFor(topicId?: string): TeacherLook {
  return (topicId && LOOKS[topicId]) || KID;
}

/** Roughly how long it takes to say a line out loud, so the mouth stops when the words do. */
export function talkTime(text: string | undefined) {
  const words = (text ?? "").trim().split(/\s+/).filter(Boolean).length;
  return words ? Math.min(5200, 600 + words * 190) : 0;
}

export type TeacherProps = {
  look?: TeacherLook;
  /** The kid's look ("girl"/"boy"; legacy "hijabi"/"muslim_man"). */
  variant: string;
  accent: string;
  /** Height-ish size in px: the kid's width, or the camel's width (a camel is wider than it is tall). */
  size: number;
  mood?: MascotMood;
  /** Talk for this long (ms). */
  talkMs?: number;
  testID?: string;
};

/** The lesson's teacher, standing still and talking. A tap makes it react (see TapToPlay). */
export function Teacher({ look = KID, variant, accent, size, mood = "happy", talkMs = 0, testID = "lesson-teacher" }: TeacherProps) {
  if (look.character === "camel") {
    // The camel is wide and short: a little bigger, so its face reads the same size as the kid's.
    return (
      <TapToPlay testID={testID}>
        {() => <Camel size={Math.round(size * 1.25)} accent={accent} outfit={look.outfit} talkMs={talkMs} />}
      </TapToPlay>
    );
  }
  return (
    <TapToPlay testID={testID}>
      {(tapMood) => <Mascot variant={variant} mood={tapMood ?? mood} accent={accent} size={size} outfit={look.outfit} talkMs={talkMs} />}
    </TapToPlay>
  );
}

/** What a tap on the teacher does: a face, a sound, a move and a short kind word, one after another. */
type TeacherTap = { mood: MascotMood; sound: GameSoundEvent; move: "hop" | "wiggle" | "spin" | "squish"; line: string };

export const TEACHER_TAPS: TeacherTap[] = [
  { mood: "wave", sound: "hello", move: "hop", line: "Assalamu alaykum!" },
  { mood: "laugh", sound: "giggle", move: "wiggle", line: "Hehe, that tickles!" },
  { mood: "cheer", sound: "boing", move: "hop", line: "You can do it!" },
  { mood: "love", sound: "sparkle", move: "squish", line: "I'm proud of you!" },
  { mood: "surprised", sound: "pop", move: "hop", line: "Oh! Let's keep learning!" },
  { mood: "laugh", sound: "giggle", move: "spin", line: "Keep going!" },
  { mood: "cheer", sound: "xp", move: "hop", line: "MashaAllah, look at you go!" },
  { mood: "happy", sound: "sparkle", move: "wiggle", line: "One more step!" }
];

const TAP_MS = 1700;

/**
 * Makes a teacher (or the asking mascot) something to play with: each tap plays the next reaction in TEACHER_TAPS (a
 * face, its sound and a little buzz, a hop or wiggle), and a small bubble over its head says a kind word. Only
 * friendly reactions: in a lesson the teacher never gets cross or cries.
 */
export function TapToPlay({ children, testID }: { children: (mood: MascotMood | null) => ReactNode; testID?: string }) {
  const reduceMotion = useReduceMotion();
  const [tap, setTap] = useState<{ key: number; pick: TeacherTap } | null>(null);
  const turn = useRef(0);
  const motion = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!tap) return undefined;
    motion.setValue(0);
    const run = reduceMotion ? null : Animated.timing(motion, { toValue: 1, duration: 700, easing: Easing.linear, useNativeDriver: true });
    run?.start();
    const timer = setTimeout(() => setTap(null), TAP_MS);
    return () => {
      run?.stop();
      clearTimeout(timer);
    };
  }, [tap, motion, reduceMotion]);

  const onPress = () => {
    const pick = TEACHER_TAPS[turn.current % TEACHER_TAPS.length];
    turn.current += 1;
    feedback(pick.sound, "light");
    setTap((was) => ({ key: (was?.key ?? 0) + 1, pick }));
  };

  const move = tap && !reduceMotion ? tap.pick.move : null;
  const transform =
    move === "hop"
      ? [{ translateY: motion.interpolate(smoothKeys([0, 0.25, 0.5, 0.65, 1], [0, -14, 0, -4, 0])) }]
      : move === "wiggle"
        ? [{ rotate: motion.interpolate(smoothKeys([0, 0.15, 0.35, 0.55, 0.75, 1], ["0deg", "-8deg", "8deg", "-6deg", "4deg", "0deg"])) }]
        : move === "spin"
          ? [{ rotateY: motion.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] }) }]
          : move === "squish"
            ? [{ scaleY: motion.interpolate(smoothKeys([0, 0.2, 0.45, 0.7, 1], [1, 0.88, 1.08, 0.97, 1])) }]
            : [];

  return (
    <View style={tap ? styles.raised : null}>
      <Pressable onPress={onPress} hitSlop={6} accessibilityRole="button" accessibilityLabel={t("Teacher")} accessibilityHint={t("Tap to play")} testID={testID}>
        <Animated.View style={{ transformOrigin: "bottom", transform } as never}>{children(tap?.pick.mood ?? null)}</Animated.View>
      </Pressable>
      {tap ? <KindWord key={tap.key} line={t(tap.pick.line)} /> : null}
    </View>
  );
}

/** The bubble over the teacher's head: pops up, holds, then floats away. */
function KindWord({ line }: { line: string }) {
  const life = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const run = Animated.timing(life, { toValue: 1, duration: TAP_MS, easing: Easing.linear, useNativeDriver: true });
    run.start();
    return () => run.stop();
  }, [life]);
  return (
    <Animated.View
      pointerEvents="none"
      testID="teacher-word"
      style={[
        styles.word,
        {
          opacity: life.interpolate({ inputRange: [0, 0.08, 0.82, 1], outputRange: [0, 1, 1, 0] }),
          transform: [
            { translateY: life.interpolate({ inputRange: [0, 0.12, 0.82, 1], outputRange: [8, 0, 0, -10] }) },
            { scale: life.interpolate({ inputRange: [0, 0.1, 0.16, 1], outputRange: [0.6, 1.06, 1, 1] }) }
          ]
        }
      ]}
    >
      <Text style={styles.wordText}>{line}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  raised: {
    zIndex: 20,
    elevation: 20
  },
  word: {
    position: "absolute",
    bottom: "100%",
    start: 0,
    width: 160,
    marginBottom: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.line,
    backgroundColor: colors.white
  },
  wordText: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 14,
    lineHeight: 18,
    color: colors.ink
  }
});
