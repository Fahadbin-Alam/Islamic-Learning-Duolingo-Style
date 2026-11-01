import type { PassageDeep } from "./types";

/**
 * At-Takwir (the Folding Up) in depth, passage by passage (the same passages as s081.ts). Our own plain summary
 * of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_081: Record<string, PassageDeep> = {
  "1-14": {
    meaning: [
      "When the sun is wrapped up, the stars fall, and the mountains are set moving.",
      "When the seas are set ablaze, and the girl buried by her people is asked for what sin it was done to her.",
      "When the pages of deeds are spread open: then every soul will know what it has brought."
    ],
    takeaway: "Islam ended the burying of girls: every daughter is a blessing to honour.",
    q: [
      ["Ayah 1: what happens to the sun, that Day?", "It is wrapped up", "It gets brighter", "It turns blue", "It grows bigger"],
      ["Ayah 14: what will every soul then know?", "What it has brought", "Nothing at all", "Only others' deeds", "Only its age"]
    ]
  },
  "15-29": {
    meaning: [
      "This is the word of a noble messenger, powerful and trusted, Jibril, honoured with the Lord of the Throne.",
      "Your companion is not a madman: he saw Jibril on the clear horizon, and he does not hold back the unseen.",
      "It is only a reminder to the worlds, for whoever of you wills to go straight."
    ],
    takeaway: "The Quran came by the most trusted angel to the most trusted man ﷺ.",
    q: [
      ["Ayah 23: where did the Prophet ﷺ see Jibril?", "On the clear horizon", "In a dark cave", "Only in a dream", "In the market"],
      ["Ayah 22: what is your companion ﷺ not?", "A madman", "Truthful", "Trusted", "Kind"]
    ]
  }
};
