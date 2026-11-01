import type { PassageDeep } from "./types";

/**
 * Al-'Adiyat (the Chargers) in depth, passage by passage (the same passages as s100.ts). Our own plain summary
 * of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_100: Record<string, PassageDeep> = {
  "1-5": {
    meaning: [
      "By the panting chargers, striking sparks with their hooves,",
      "raiding at dawn, stirring up clouds of dust,",
      "and plunging into the middle of the enemy crowd."
    ],
    takeaway: "Even a horse gives its all for its owner: how much more do we owe Allah?",
    q: [
      ["Ayah 2: what do the hooves strike?", "Sparks", "Water", "Gold", "Flowers"],
      ["Ayah 3: at what time do they raid?", "At dawn", "At noon", "At midnight", "At sunset"]
    ]
  },
  "6-11": {
    meaning: [
      "Truly man is ungrateful to his Lord, and he himself is a witness to that.",
      "And he is intense in his love of wealth.",
      "Does he not know: when the graves are emptied, his Lord will know all about them that Day?"
    ],
    story: "The Prophet ﷺ said: true richness is not having lots of things; true richness is a content soul.",
    hadith: { collection: "bukhari", number: 6446, narrator: "Abu Hurairah", text: "Richness is not having many possessions; real richness is the richness of the soul." },
    takeaway: "Thank Allah for what you have, and do not let the love of money rule you.",
    q: [
      ["Ayah 6: how is man toward his Lord?", "Ungrateful", "Always thankful", "Fearless", "Silent"],
      ["What did the Prophet ﷺ call true richness?", "A content soul", "Lots of gold", "Big houses", "Many camels"]
    ]
  }
};
