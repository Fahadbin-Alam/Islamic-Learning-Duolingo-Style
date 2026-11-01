import type { PassageDeep } from "./types";

/**
 * At-Tur (the Mount) in depth, passage by passage (the same passages as s052.ts). Our own plain summary of
 * Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_052: Record<string, PassageDeep> = {
  "1-16": {
    meaning: [
      "By the Mount, a written Book, the much-visited House, the raised roof and the filled sea:",
      "your Lord's punishment will surely come; no one can push it back.",
      "On that Day the sky will sway and the mountains will move away."
    ],
    story: "On the Night Journey, the Prophet ﷺ saw the much-visited House in the heavens: seventy thousand angels pray in it every day and never come back again.",
    hadith: { collection: "bukhari", number: 3207, narrator: "Malik ibn Sa'sa'ah", text: "Then I was shown al-Bayt al-Ma'mur. I asked Jibril about it and he said: this is al-Bayt al-Ma'mur; seventy thousand angels pray in it daily, and when they leave they never return to it." },
    takeaway: "Worship Allah now, while there is still time.",
    q: [
      ["Ayah 4: which House does Allah swear by?", "The much-visited House", "A palace", "A tent", "A fort"],
      ["Ayah 9: what will the sky do on that Day?", "Sway", "Freeze", "Sing", "Stay still"]
    ]
  },
  "17-28": {
    meaning: [
      "The mindful are in gardens and joy, eating and drinking happily for what they used to do.",
      "Allah joins them with the children who followed them in faith, with no loss to the parents' reward.",
      "They will say: we used to be careful with our families; Allah was kind to us and saved us."
    ],
    takeaway: "Teach your family faith: Allah can bring you all together again.",
    q: [
      ["Ayah 21: who joins the mindful in Paradise?", "Their believing children", "Their enemies", "No one", "Strangers"],
      ["Ayah 26: what were they careful about in the world?", "Their families", "Their fame", "Their games", "Their clothes"]
    ]
  },
  "29-49": {
    meaning: [
      "So keep reminding: by your Lord's grace you are neither a fortune teller nor mad.",
      "Were they created from nothing, or are they the creators? Or did they create the heavens and earth?",
      "Be patient for your Lord's decision, you are under Our eyes; glorify Him at night and as stars fade."
    ],
    story: "Before Islam, Jubayr ibn Mut'im heard the Prophet ﷺ recite At-Tur at Maghrib. At ayahs 35 to 37, he said, his heart nearly flew.",
    hadith: { collection: "bukhari", number: 4854, narrator: "Jubayr ibn Mutim", text: "I heard the Prophet ﷺ reciting At-Tur in the Maghrib prayer, and when he reached: were they created from nothing, or are they the creators?... my heart was about to fly." },
    takeaway: "When life is hard, remember: Allah is watching over you.",
    q: [
      ["Ayah 49: when should we glorify Allah?", "At night and as stars fade", "Never", "Only at noon", "Only in Ramadan"],
      ["Ayah 35: which question made Jubayr's heart nearly fly?", "Were they created from nothing?", "What is for dinner?", "Who is the richest?", "Where is the market?"]
    ]
  }
};
