import type { PassageDeep } from "./types";

/**
 * Al-'Alaq (the Clinging Clot) in depth, passage by passage (the same passages as s096.ts). Our own plain
 * summary of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_096: Record<string, PassageDeep> = {
  "1-5": {
    meaning: [
      "Read in the name of your Lord who created: He created man from a clinging clot.",
      "Read, and your Lord is the Most Generous, who taught by the pen.",
      "He taught man what he did not know."
    ],
    story: "In the cave of Hira, the angel Jibril came to the Prophet ﷺ and said: read! He ﷺ said: I cannot read. Then Jibril recited these first ayahs.",
    hadith: { collection: "bukhari", number: 3, narrator: "Aishah", text: "The angel came to him and said: Read! He said: I am not a reader... Then he said: Read in the name of your Lord who created." },
    takeaway: "Islam began with one word, read: seek knowledge in Allah's name.",
    q: [
      ["Ayah 2: what was man created from?", "A clinging clot", "Fire", "Light", "Stone"],
      ["Where did Jibril first bring the Quran?", "The cave of Hira", "The Ka'bah", "Madinah", "Mount Uhud"]
    ]
  },
  "6-14": {
    meaning: [
      "No! Man oversteps the limits when he sees himself as rich and needing no one.",
      "Surely the return is to your Lord.",
      "Have you seen the one who stops a servant when he prays? Does he not know Allah sees?"
    ],
    takeaway: "Wealth can make people proud: remember you still need Allah.",
    q: [
      ["Ayah 7: when does man overstep the limits?", "When he thinks he needs no one", "When he is hungry", "When he sleeps", "When he prays"],
      ["Ayah 14: what does the man who blocks prayer forget?", "That Allah sees", "His name", "His money", "His way home"]
    ]
  },
  "15-19": {
    meaning: [
      "No! If he does not stop, We will seize him by the forelock, a lying, sinful forelock.",
      "Let him call his gang; Allah will call the angel guards.",
      "No! Do not obey him: prostrate and draw near to Allah."
    ],
    story: "The Prophet ﷺ said the closest a servant is to his Lord is while in sajdah, so make plenty of dua then.",
    hadith: { collection: "muslim", number: 482, narrator: "Abu Hurairah", text: "The nearest a servant comes to his Lord is when he is prostrating, so make abundant supplication." },
    takeaway: "Do not let anyone stop your prayer: in sajdah you are nearest to Allah.",
    q: [
      ["Ayah 19: what does Allah tell us to do?", "Prostrate and draw near", "Run away", "Stay quiet", "Sleep"],
      ["When is a servant nearest to his Lord?", "While prostrating", "While eating", "While sleeping", "While shopping"]
    ]
  }
};
