import type { PassageDeep } from "./types";

/**
 * Al-Waqi'ah (the Event) in depth, passage by passage (the same passages as s056.ts). Our own plain summary of
 * Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_056: Record<string, PassageDeep> = {
  "1-26": {
    meaning: [
      "When the Event comes, no one will deny it; it will bring some low and raise others high.",
      "People will be three groups: those on the right, those on the left, and the ones who raced ahead.",
      "The foremost are the nearest to Allah, in gardens of delight; there they hear no idle talk, only: peace."
    ],
    takeaway: "Race to do good: those quick to good now are close on that Day.",
    q: [
      ["Ayah 7: into how many groups are people split?", "Three", "Two", "Five", "Ten"],
      ["Ayah 11: who are the nearest to Allah?", "The foremost", "The richest", "The loudest", "The oldest"]
    ]
  },
  "27-56": {
    meaning: [
      "Those on the right will be among thornless lote trees, spreading shade and flowing water.",
      "There is fruit in plenty, never cut off and never forbidden.",
      "Those on the left were spoiled with luxury, kept to the great sin, and said: will we really be raised?"
    ],
    story: "The Prophet ﷺ said: in Paradise is a tree whose shade a rider could travel in for a hundred years. Then he recited: and spreading shade.",
    hadith: { collection: "bukhari", number: 3252, narrator: "Abu Hurayrah", text: "In Paradise there is a tree in whose shade a rider could travel for a hundred years. Recite if you wish: and extended shade (56:30)." },
    takeaway: "Live simply and thankfully: comfort should never make you forget the Day.",
    q: [
      ["Ayah 30: what do those on the right enjoy?", "Spreading shade and water", "Hunger", "Thirst", "Darkness"],
      ["Ayah 47: what did those on the left ask?", "Will we really be raised?", "Where is the market?", "Who is the king?", "When is dinner?"]
    ]
  },
  "57-74": {
    meaning: [
      "See the seed you sow: is it you who make it grow, or are We the Grower?",
      "See the water you drink: do you send it down from the clouds, or do We?",
      "See the fire you light: did you make its tree, or did We? So glorify the name of your Lord, the Great."
    ],
    takeaway: "Every meal, drink and warm fire is a gift: be thankful for each.",
    q: [
      ["Ayah 64: who makes the crops grow?", "Allah, the Grower", "Farmers alone", "The sun alone", "No one"],
      ["Ayah 74: whose name should we glorify?", "The name of your Lord, the Great", "A king's name", "Our own name", "A poet's name"]
    ]
  },
  "75-96": {
    meaning: [
      "By the setting places of the stars: this is a noble Quran in a well-guarded Book.",
      "None touch it except the purified; it is sent down from the Lord of the worlds.",
      "If the dying one is among the nearest, there is rest, fragrance and a garden of delight."
    ],
    takeaway: "Hold the mushaf with care and clean hands.",
    q: [
      ["Ayah 77: how is the Quran described?", "Noble", "Old", "Difficult", "Secret"],
      ["Ayah 89: what awaits the nearest at death?", "Rest and fragrance", "Fear", "Darkness", "Nothing"]
    ]
  }
};
