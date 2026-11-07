import type { PassageDeep } from "./types";

/**
 * Luqman in depth, passage by passage (the same passages as s031.ts). Our own plain summary of Tafsir Ibn
 * Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_031: Record<string, PassageDeep> = {
  "1-11": {
    meaning: [
      "These are ayat of the wise Book, guidance and mercy for those who do good.",
      "Some people buy idle talk to lead others away from Allah's path without knowledge.",
      "Allah raised the heavens without pillars you can see, and set firm mountains on the earth."
    ],
    takeaway: "Fill your time with what guides you, not with talk that pulls you away.",
    q: [
      ["Ayah 3: for whom is the Book guidance and mercy?", "Those who do good", "Only kings", "Only scholars", "No one"],
      ["Ayah 10: how did Allah raise the heavens?", "Without pillars you can see", "On golden pillars", "On mountains", "On water"]
    ]
  },
  "12-19": {
    meaning: [
      "Luqman told his son: do not associate anything with Allah; shirk is a tremendous wrong.",
      "Be thankful to Me and to your parents; your mother carried you in weakness upon weakness.",
      "Pray, call to good, be patient; do not turn your cheek in pride, and lower your voice."
    ],
    story: "When 6:82 came, the Companions worried: which of us never wrongs himself? The Prophet ﷺ said it means shirk, as Luqman told his son.",
    hadith: { collection: "bukhari", number: 32, narrator: "Abdullah ibn Mas'ud", text: "When 'those who believe and do not mix their faith with wrong' was revealed, the Companions said: which of us has not wronged himself? So Allah revealed: shirk is a tremendous wrong." },
    takeaway: "Luqman's advice is a full guide: faith, thanks, prayer, patience, humility.",
    q: [
      ["Ayah 13: what did Luqman call a tremendous wrong?", "Shirk", "Being poor", "Being quiet", "Travelling"],
      ["Ayah 19: what did Luqman tell his son to lower?", "His voice", "His hands", "His head", "His bag"]
    ]
  },
  "20-34": {
    meaning: [
      "If all trees were pens and the sea ink, with seven more seas, Allah's words would not run out.",
      "People, do not let the life of this world fool you.",
      "Only Allah knows the Hour, sends the rain, and knows what tomorrow will bring."
    ],
    takeaway: "No one knows tomorrow: do your good today.",
    q: [
      ["Ayah 27: what would never run out, even with seas of ink?", "Allah's words", "The trees", "The pens", "The stars"],
      ["Ayah 34: who knows what tomorrow will bring?", "Only Allah", "Fortune tellers", "Scientists", "Kings"]
    ]
  }
};
