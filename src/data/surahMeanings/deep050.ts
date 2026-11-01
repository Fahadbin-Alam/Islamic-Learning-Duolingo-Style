import type { PassageDeep } from "./types";

/**
 * Qaf in depth, passage by passage (the same passages as s050.ts). Our own plain summary of Tafsir Ibn Kathir
 * and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_050: Record<string, PassageDeep> = {
  "1-15": {
    meaning: [
      "By the glorious Quran: the deniers wonder that a warner came from among them, and doubt rising again.",
      "Do they not look at the sky above them, how Allah built and adorned it with no cracks in it?",
      "Allah sends blessed rain and brings dead land to life; just so, the dead will come out."
    ],
    takeaway: "Every spring is a small preview of the Day of rising.",
    q: [
      ["Ayah 11: how does Qaf show the dead will rise?", "Dead land comes alive with rain", "The sun sets", "Birds fly", "Seas are salty"],
      ["Ayah 6: what is missing from the sky Allah built?", "Any cracks", "Any stars", "Any light", "Any colour"]
    ]
  },
  "16-29": {
    meaning: [
      "Allah created the human and knows what his soul whispers; He is nearer to him than his jugular vein.",
      "Two recording angels sit right and left; not a word is spoken but a watcher is ready to write it.",
      "The stupor of death will come with the truth: that is what you tried to run from."
    ],
    story: "The Prophet ﷺ said: a person may say one word that pleases Allah, without a second thought, and Allah raises him many levels for it.",
    hadith: { collection: "bukhari", number: 6478, narrator: "Abu Hurairah", text: "A servant may speak a word that pleases Allah without paying it much attention, and Allah raises him by degrees because of it." },
    takeaway: "Think before you speak: good words lift you up.",
    q: [
      ["Ayah 16: what is Allah nearer to us than?", "Our jugular vein", "Our friends", "The sky", "Our house"],
      ["Ayah 18: what happens to every word we speak?", "A watcher writes it", "It is lost", "It is forgotten", "Nobody hears it"]
    ]
  },
  "30-45": {
    meaning: [
      "Paradise is brought near the mindful: this is what was promised to all who kept turning back to Allah.",
      "Allah created the heavens, the earth and all between them in six days, and no tiredness touched Him.",
      "Glorify your Lord before sunrise and sunset, and remind with the Quran those who fear His warning."
    ],
    takeaway: "Keep turning back to Allah: Paradise is close to the ones who return.",
    q: [
      ["Ayah 38: how much tiredness touched Allah after creation?", "No tiredness at all", "Great tiredness", "Some tiredness", "A little tiredness"],
      ["Ayah 45: who should be reminded with the Quran?", "Those who fear His warning", "No one", "Only kings", "Only poets"]
    ]
  }
};
