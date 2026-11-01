import type { PassageDeep } from "./types";

/**
 * Al-Insan (Man) in depth, passage by passage (the same passages as s076.ts). Our own plain summary of Tafsir
 * Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out, including the
 * weak reports naming who the feeding in ayah 8 was about.
 */
export const DEEP_076: Record<string, PassageDeep> = {
  "1-6": {
    meaning: [
      "Was there not a long stretch of time when man was nothing worth mentioning?",
      "We created him from a mixed drop to test him, and gave him hearing and sight.",
      "We showed him the way: whether he is grateful or ungrateful is his choice."
    ],
    story: "On Friday mornings the Prophet ﷺ used to recite As-Sajdah and Al-Insan in the dawn prayer.",
    hadith: { collection: "bukhari", number: 891, narrator: "Abu Hurairah", text: "The Prophet ﷺ used to recite in the Fajr prayer on Friday: Alif Lam Mim Tanzil (As-Sajdah) and Hal ata 'alal-insan." },
    takeaway: "Allah showed you the path; you choose to thank Him or not. Choose thanks.",
    q: [
      ["Ayah 3: what did Allah show man?", "The way", "A treasure", "A palace", "A secret door"],
      ["On which day's dawn prayer did the Prophet ﷺ recite it?", "Friday", "Monday", "Eid day", "Saturday"]
    ]
  },
  "7-12": {
    meaning: [
      "They fulfil their vows and fear a Day whose evil spreads far.",
      "They give food, though they love it, to the poor, the orphan and the captive.",
      "We feed you only for Allah's face; we want no reward from you, nor thanks."
    ],
    takeaway: "Give what you love, and give it for Allah: not for a thank-you.",
    q: [
      ["Ayah 8: whom do the righteous feed?", "The poor, orphan and captive", "Only their friends", "Only the rich", "Only themselves"],
      ["Ayah 9: what do they want back from those they feed?", "No reward, nor thanks", "A big thank-you", "Money later", "Their praise"]
    ]
  },
  "13-22": {
    meaning: [
      "Reclining on couches, they see there neither burning sun nor bitter cold.",
      "Its shade is close over them, and its fruit hangs low, easy to pick.",
      "Cups of silver are passed among them, and they wear fine green silk."
    ],
    takeaway: "Every patient day here earns a lasting comfort there.",
    q: [
      ["Ayah 15: what are their cups made of?", "Silver", "Clay", "Wood", "Stone"],
      ["Ayah 13: what will they never see there?", "Burning sun nor bitter cold", "Green trees", "Flowing rivers", "Their families"]
    ]
  },
  "23-31": {
    meaning: [
      "It is We who sent down the Quran to you in stages, so be patient for your Lord's decision.",
      "Remember your Lord's name morning and evening, and at night prostrate to Him and glorify Him long.",
      "You do not will anything unless Allah wills; He is All-Knowing, All-Wise."
    ],
    takeaway: "Keep Allah's name on your tongue from dawn to dusk.",
    q: [
      ["Ayah 25: when should we remember our Lord's name?", "Morning and evening", "Once a year", "Only when sad", "Only at Eid"],
      ["Ayah 23: how was the Quran sent down?", "In stages", "All in one night", "Written on stone", "By a poet"]
    ]
  }
};
