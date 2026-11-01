import React from "react";
import { View } from "react-native";
import { Camel, type CamelOutfit } from "../Camel";
import { Mascot, type MascotMood, type MascotOutfit } from "../Mascot";

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
  eid: { character: "kid", outfit: "festive" },
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

/** The lesson's teacher, standing still and talking. */
export function Teacher({ look = KID, variant, accent, size, mood = "happy", talkMs = 0, testID = "lesson-teacher" }: TeacherProps) {
  if (look.character === "camel") {
    // The camel is wide and short: a little bigger, so its face reads the same size as the kid's.
    return <Camel size={Math.round(size * 1.25)} accent={accent} outfit={look.outfit} talkMs={talkMs} testID={testID} />;
  }
  return (
    <View testID={testID}>
      <Mascot variant={variant} mood={mood} accent={accent} size={size} outfit={look.outfit} talkMs={talkMs} />
    </View>
  );
}
