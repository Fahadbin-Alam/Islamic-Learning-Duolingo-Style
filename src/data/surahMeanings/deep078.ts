import type { PassageDeep } from "./types";

/**
 * An-Naba (the Great News) in depth, passage by passage (the same passages as s078.ts). Our own plain summary
 * of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_078: Record<string, PassageDeep> = {
  "1-16": {
    meaning: [
      "What are they asking one another about? About the great news, which they argue over.",
      "Did We not make the earth a bed, and the mountains as pegs?",
      "We made your sleep for rest, the night a covering, and sent rain to grow grain, plants and gardens."
    ],
    takeaway: "Your bed, your nights and your food are all signs: the Maker can raise you again.",
    q: [
      ["Ayah 7: what are the mountains like?", "Pegs", "Pillows", "Clouds", "Rivers"],
      ["Ayah 9: what did Allah make our sleep?", "A rest", "A waste of time", "A punishment", "A long journey"]
    ]
  },
  "17-30": {
    meaning: [
      "The Day of Decision is a fixed appointment.",
      "The Day the Horn is blown and you come forth in crowds, and the sky is opened like gates.",
      "They did not expect a reckoning, and We have counted everything in a record."
    ],
    takeaway: "Nothing you do is lost: fill your book with deeds you will be glad to see.",
    q: [
      ["Ayah 18: how will people come forth that Day?", "In crowds", "One by one, slowly", "Riding horses", "Hidden in caves"],
      ["Ayah 29: how has Allah kept count of everything?", "In a record", "In people's heads", "In the stars", "In the sand"]
    ]
  },
  "31-40": {
    meaning: [
      "For the mindful is success: gardens, vineyards, and a full cup.",
      "They will hear there no idle talk and no lies: a reward from your Lord, a generous gift.",
      "On that Day man will see what his hands sent ahead, and the denier will say: I wish I were dust."
    ],
    takeaway: "Send good ahead now, so that Day brings joy, not regret.",
    q: [
      ["Ayah 35: what will the mindful never hear there?", "Idle talk and lies", "Birds singing", "Kind greetings", "Running water"],
      ["Ayah 40: what will the denier wish he were?", "Dust", "A king", "A bird", "A mountain"]
    ]
  }
};
