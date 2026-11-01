import type { PassageDeep } from "./types";

/**
 * Adh-Dhariyat (the Scattering Winds) in depth, passage by passage (the same passages as s051.ts). Our own plain
 * summary of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_051: Record<string, PassageDeep> = {
  "1-23": {
    meaning: [
      "By the scattering winds and the rain clouds: what you are promised is true, and the Judgement will come.",
      "The mindful slept little at night; before dawn they asked forgiveness, and gave a share to those who ask.",
      "In the earth and in yourselves are signs; and in the heavens is your provision and what you are promised."
    ],
    story: "The Prophet ﷺ said: in the last third of every night, Allah says: who will call on Me so I answer, ask Me so I give, seek forgiveness so I forgive?",
    hadith: { collection: "bukhari", number: 1145, narrator: "Abu Hurayrah", text: "Our Lord descends every night to the nearest heaven when the last third of the night remains, saying: who calls on Me that I may answer him? Who asks Me that I may give him? Who seeks My forgiveness that I may forgive him?" },
    takeaway: "Wake a little early sometimes: the end of the night is the time to ask.",
    q: [
      ["Ayah 22: where is our provision?", "In the heavens", "In the sea", "In a cave", "Under a rock"],
      ["Ayah 18: when did the mindful ask forgiveness?", "Before dawn", "At noon", "Never", "Only in winter"]
    ]
  },
  "24-46": {
    meaning: [
      "Angel guests came to Ibrahim and said: peace. He said: peace, and quickly brought a fat roasted calf.",
      "When they did not eat, he felt afraid; they said: do not fear, and gave him news of a knowing son.",
      "His wife came, struck her face and said: an old woman who never had children? They said: so your Lord said."
    ],
    story: "The Prophet ﷺ said: whoever believes in Allah and the Last Day, let him honour his guest generously.",
    hadith: { collection: "bukhari", number: 6018, narrator: "Abu Hurayrah", text: "Anybody who believes in Allah and the Last Day should not harm his neighbour, and should entertain his guest generously, and should say what is good or keep quiet." },
    takeaway: "Welcome guests warmly and serve them your best, like Ibrahim did.",
    q: [
      ["Ayah 26: what did Ibrahim serve his guests?", "A roasted calf", "Bread only", "Fish", "Nothing"],
      ["Ayah 28: what news did the guests give Ibrahim?", "A knowing son", "A new house", "Great wealth", "A long journey"]
    ]
  },
  "47-60": {
    meaning: [
      "Allah built the sky with might, and He keeps expanding it; He spread out the earth, how well He spread it.",
      "Of everything He created pairs, so that you may remember; so flee to Allah.",
      "Allah created jinn and humans only to worship Him; He is the Provider, the Strong."
    ],
    takeaway: "Turn daily life into a gift to Allah with a good intention.",
    q: [
      ["Ayah 56: why did Allah create jinn and humans?", "To worship Him", "To play", "To fight", "To sleep"],
      ["Ayah 49: what did Allah create of everything?", "Pairs", "Only one", "Copies", "Nothing"]
    ]
  }
};
