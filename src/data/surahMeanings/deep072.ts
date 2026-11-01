import type { PassageDeep } from "./types";

/**
 * Al-Jinn in depth, passage by passage (the same passages as s072.ts). Our own plain summary of Tafsir Ibn
 * Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_072: Record<string, PassageDeep> = {
  "1-7": {
    meaning: [
      "Say: it was revealed to me that a group of jinn listened and said: we heard a wonderful recitation.",
      "It guides to right conduct, so we believed in it, and we will never set up partners with our Lord.",
      "Exalted is our Lord's majesty: He has taken neither a wife nor a son."
    ],
    story: "The Prophet ﷺ was leading his Companions in the dawn prayer at Nakhlah. A group of jinn heard the Quran, listened closely, and went back to their people as believers.",
    hadith: { collection: "bukhari", number: 4921, narrator: "Ibn Abbas", text: "The Prophet ﷺ was leading his Companions in the Fajr prayer at Nakhlah... when the jinn heard the Quran, they listened to it and said: this is what has come between us and the news of the heavens." },
    takeaway: "Even jinn were moved by the Quran: let it move your heart too.",
    q: [
      ["Ayah 1: how did the jinn describe the recitation?", "Wonderful", "Boring", "Too loud", "Hard to hear"],
      ["During which prayer did the jinn hear the Quran?", "The dawn prayer", "The night prayer", "The Eid prayer", "The Friday prayer"]
    ]
  },
  "8-15": {
    meaning: [
      "We touched the sky and found it filled with strong guards and shooting flames.",
      "We used to sit there to listen; whoever listens now finds a flame waiting for him.",
      "Among us are those who submit and those who stray; whoever submits has sought the right way."
    ],
    takeaway: "Jinn, like people, choose their path: choose to submit to Allah.",
    q: [
      ["Ayah 8: what filled the sky when the jinn touched it?", "Strong guards and flames", "Soft clouds", "Singing birds", "Bright rainbows"],
      ["Ayah 14: who among the jinn sought the right way?", "Those who submit", "Those who stray", "The oldest jinn", "The strongest jinn"]
    ]
  },
  "16-19": {
    meaning: [
      "Had they stayed firm on the straight way, We would have given them water in plenty.",
      "Whoever turns from his Lord's reminder, He will put him through a hard test.",
      "The places of prostration belong to Allah, so do not call on anyone along with Allah."
    ],
    takeaway: "In the masjid, and everywhere, make your dua to Allah alone.",
    q: [
      ["Ayah 18: to whom do the places of prostration belong?", "To Allah", "To the kings", "To the rich", "To the jinn"],
      ["Ayah 16: what would they get for staying firm?", "Water in plenty", "Gold coins", "Tall towers", "Fast horses"]
    ]
  },
  "20-28": {
    meaning: [
      "Say: I call only on my Lord, and I set up no partner with Him.",
      "Say: I have no power to harm you or to guide you; my task is only to deliver.",
      "He is the Knower of the unseen, and He shows it to no one, except a messenger He chooses."
    ],
    takeaway: "Fortune tellers do not know the future: only Allah does.",
    q: [
      ["Ayah 26: who is the Knower of the unseen?", "Allah", "Fortune tellers", "The jinn", "The stars"],
      ["Ayah 23: what is the Prophet's ﷺ task, he says?", "Only to deliver", "To force people", "To rule all lands", "To punish"]
    ]
  }
};
