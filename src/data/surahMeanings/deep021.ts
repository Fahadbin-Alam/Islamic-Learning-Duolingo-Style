import type { PassageDeep } from "./types";

/**
 * Al-Anbiya (the Prophets) in depth, passage by passage (the same passages as s021.ts). Our own plain summary
 * of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_021: Record<string, PassageDeep> = {
  "1-10": {
    meaning: [
      "People's reckoning has drawn near, while they turn away, not paying attention.",
      "Each new reminder from their Lord, they listen to while playing.",
      "Allah sent down a Book in which is your reminder; will you not use your minds?"
    ],
    takeaway: "Do not treat the Quran as background noise: listen with your heart.",
    q: [
      ["Ayah 1: what has drawn near to people?", "Their reckoning", "A storm", "A feast", "A long holiday"],
      ["Ayah 2: how do they listen to each new reminder?", "While playing", "In tears", "With full care", "On their knees"]
    ]
  },
  "11-29": {
    meaning: [
      "Allah did not create the sky, the earth and all between them for play.",
      "Truth is hurled at falsehood and breaks it, and falsehood vanishes.",
      "Had there been other gods besides Allah in the heavens and earth, both would have fallen into ruin."
    ],
    takeaway: "Life has a purpose: you were not made for nothing.",
    q: [
      ["Ayah 16: did Allah create the sky and earth for play?", "No, not for play", "Yes, for play", "Only for fun", "For no reason"],
      ["Ayah 22: what if there were other gods?", "Both would fall into ruin", "More rain", "Nothing would change", "More stars"]
    ]
  },
  "30-41": {
    meaning: [
      "The heavens and earth were joined together, then Allah split them apart.",
      "Allah made every living thing from water.",
      "Every soul will taste death; Allah tests you with bad and good."
    ],
    takeaway: "Every sip you drink is a reminder of the One who made life.",
    q: [
      ["Ayah 30: what did Allah make every living thing from?", "Water", "Fire", "Light", "Stone"],
      ["Ayah 35: what does Allah test us with?", "With bad and good", "Only with bad", "Only with good", "With nothing"]
    ]
  },
  "42-50": {
    meaning: [
      "Allah will set up just scales on the Day of Resurrection; no soul will be wronged at all.",
      "Even a deed the weight of a mustard seed will be brought forward.",
      "Allah gave Musa and Harun the Criterion, a light and reminder for the mindful."
    ],
    takeaway: "No good deed is too small: even the tiniest one is counted.",
    q: [
      ["Ayah 47: what tiny weight will still be counted?", "A mustard seed", "A mountain", "A river", "A cloud"],
      ["Ayah 47: what will Allah set up on the Day?", "Just scales", "A market", "A palace", "A wall"]
    ]
  },
  "51-75": {
    meaning: [
      "Young Ibrahim broke the idols, all but the biggest, so his people would turn to it and think.",
      "They said: burn him! Allah said: Fire, be cool and safe for Ibrahim.",
      "Allah saved him and Lut, and gave him Ishaq and Yaqub, all righteous."
    ],
    takeaway: "When Allah protects you, even fire cannot harm you.",
    q: [
      ["Ayah 69: what did Allah tell the fire to be?", "Cool and safe", "Hotter", "Bigger", "Gone forever"],
      ["Ayah 58: which idol did Ibrahim leave unbroken?", "The biggest", "The smallest", "The golden one", "None"]
    ]
  },
  "76-93": {
    meaning: [
      "Ayyub called: harm has touched me, and You are the Most Merciful of the merciful.",
      "Yunus called in the darkness: there is no god but You, glory be to You; I was a wrongdoer.",
      "Zakariya called: do not leave me alone; and Allah gave him Yahya."
    ],
    story: "The Prophet ﷺ said: while Ayyub was bathing, golden locusts fell on him and he gathered them. Allah said: did I not make you rich? He said: yes, but I always need Your blessing.",
    hadith: { collection: "bukhari", number: 279, narrator: "Abu Hurairah", text: "While Ayyub was bathing, golden locusts fell on him and he gathered them. His Lord called: did I not make you rich enough? He said: yes, but I can never do without Your blessing." },
    takeaway: "In trouble, call like the prophets did: Allah answered every one of them.",
    q: [
      ["Ayah 87: where did Yunus call to Allah?", "In the darkness", "On a mountain", "In a palace", "In a garden"],
      ["Ayah 83: what did Ayyub call Allah?", "Most Merciful of the merciful", "Most Rich", "The Strong King", "Lord of the sea"]
    ]
  },
  "94-112": {
    meaning: [
      "Whoever does good while believing, his effort will not be denied; it is written down.",
      "The righteous servants will inherit the earth, as written in the Zabur.",
      "Allah sent the Prophet ﷺ only as a mercy to the worlds."
    ],
    takeaway: "The Prophet ﷺ is a mercy to all: share his kindness with everyone.",
    q: [
      ["Ayah 107: why was the Prophet ﷺ sent?", "As a mercy to the worlds", "To be a king", "To get rich", "To punish all"],
      ["Ayah 105: who will inherit the earth?", "The righteous servants", "The proud", "The rich", "No one"]
    ]
  }
};
