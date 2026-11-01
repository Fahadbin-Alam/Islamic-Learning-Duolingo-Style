import type { PassageDeep } from "./types";

/**
 * Al-Mujadilah (the Woman Who Argued) in depth, passage by passage (the same passages as s058.ts). Our own plain
 * summary of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out,
 * and so are the detailed expiation rulings, which are for scholars.
 */
export const DEEP_058: Record<string, PassageDeep> = {
  "1-6": {
    meaning: [
      "Allah heard the woman who argued with you about her husband and complained to Allah.",
      "Allah hears your conversation; He is All-Hearing, All-Seeing.",
      "Calling your wife 'like my mother' does not make her your mother: Allah called that a false, hurtful saying."
    ],
    takeaway: "Tell your Lord your worries: He hears even a quiet complaint.",
    q: [
      ["Ayah 1: who heard the woman's complaint?", "Allah, the All-Hearing", "No one", "Only her husband", "A judge"],
      ["Ayah 2: what did Allah call that old saying?", "False and hurtful", "Kind and true", "A good custom", "A joke"]
    ]
  },
  "7-13": {
    meaning: [
      "Allah knows all in the heavens and earth; no three talk in secret but He is the fourth, by His knowledge.",
      "When told to make room in gatherings, make room: Allah will make room for you.",
      "Allah raises in rank those who believe and those given knowledge."
    ],
    story: "The Prophet ﷺ said: no one should make another stand up from his seat to sit in it; rather, spread out and make room.",
    hadith: { collection: "bukhari", number: 6270, narrator: "Abdullah ibn Umar", text: "The Prophet ﷺ forbade that a man should make another get up from his seat so that he could sit in it, but said: spread out and make room." },
    takeaway: "Make space for others and keep learning: both lift you higher.",
    q: [
      ["Ayah 11: whom does Allah raise in rank?", "Believers given knowledge", "The loudest", "The richest", "The tallest"],
      ["Ayah 11: what should we do when asked to make room?", "Make room", "Refuse", "Leave angry", "Push others"]
    ]
  },
  "14-22": {
    meaning: [
      "Some took as friends a people Allah is angry with; they swear false oaths, knowing they lie.",
      "Shaytan has taken hold of them and made them forget Allah's remembrance.",
      "Allah wrote faith in the hearts of those who love Him above all; they are the party of Allah, who succeed."
    ],
    takeaway: "Keep Allah in your thoughts: forgetting Him is how Shaytan wins.",
    q: [
      ["Ayah 22: who will succeed?", "The party of Allah", "The party of Shaytan", "The liars", "The proud"],
      ["Ayah 19: what did Shaytan make them forget?", "Allah's remembrance", "Their names", "Their homes", "Their food"]
    ]
  }
};
