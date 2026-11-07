import type { PassageDeep } from "./types";

/**
 * Al-A'la (the Most High) in depth, passage by passage (the same passages as s087.ts). Our own plain summary of
 * Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_087: Record<string, PassageDeep> = {
  "1-8": {
    meaning: [
      "Glorify the name of your Lord, the Most High, who created and proportioned, who measured and guided.",
      "Who brings out the green pasture, then turns it into dark, dry stubble.",
      "We will make you recite and you will not forget, except what Allah wills; We ease you to the easy way."
    ],
    story: "The Prophet ﷺ used to recite Al-A'la and Al-Ghashiyah in the Eid prayers and in the Friday prayer.",
    hadith: { collection: "muslim", number: 878, narrator: "An-Nu'man ibn Bashir", text: "The Messenger of Allah ﷺ used to recite in the two Eids and in the Friday prayer: Sabbihisma rabbikal-a'la and Hal ataka hadithul-ghashiyah." },
    takeaway: "In sujud we say 'Subhana Rabbiyal A'la': praise Him as the Most High.",
    q: [
      ["Ayah 6: what does Allah promise the Prophet ﷺ?", "He will recite and not forget", "He will be rich", "He will be a king", "He will never be sad"],
      ["Besides Fridays, when did the Prophet ﷺ often recite it?", "In the Eid prayers", "Only at night", "Only in Ramadan", "At weddings"]
    ]
  },
  "9-19": {
    meaning: [
      "Successful is the one who purifies himself, remembers his Lord's name, and prays.",
      "But you prefer this worldly life, while the Hereafter is better and more lasting.",
      "This is in the earlier pages too: the pages of Ibrahim and Musa."
    ],
    takeaway: "Choose what lasts: give today's time to what helps you forever.",
    q: [
      ["Ayah 17: which is better and more lasting?", "The Hereafter", "This world", "Money", "Fame"],
      ["Ayah 19: in whose pages was this message too?", "Ibrahim and Musa", "Nuh and Hud", "Dawud and Sulayman", "Isa and Yahya"]
    ]
  }
};
