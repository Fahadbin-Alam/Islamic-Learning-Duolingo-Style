import type { PassageDeep } from "./types";

/**
 * Al-Hadid (Iron) in depth, passage by passage (the same passages as s057.ts). Our own plain summary of Tafsir
 * Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_057: Record<string, PassageDeep> = {
  "1-6": {
    meaning: [
      "All in the heavens and earth glorify Allah; He is the Mighty, the Wise.",
      "He is the First and the Last, the Highest and the Nearest, and He knows all things.",
      "He created the heavens and earth in six days; He is with you wherever you are, seeing what you do."
    ],
    story: "Before sleep, the Prophet ﷺ taught a dua: O Allah, You are the First, nothing is before You, and You are the Last, nothing is after You.",
    hadith: { collection: "muslim", number: 2713, narrator: "Abu Hurayrah", text: "O Allah, You are the First, there is nothing before You; You are the Last, there is nothing after You; You are the Highest, there is nothing above You; You are the Nearest, there is nothing nearer than You." },
    takeaway: "Be good even when alone: your Lord sees all you do.",
    q: [
      ["Ayah 3: what does Allah call Himself?", "The First and the Last", "The Second", "The Middle", "The Newest"],
      ["Ayah 4: where is Allah with you?", "Wherever you are", "Only in the masjid", "Only in Makkah", "Nowhere"]
    ]
  },
  "7-10": {
    meaning: [
      "Believe in Allah and His Messenger ﷺ, and spend from what He has entrusted to you.",
      "Why do you not spend, when to Allah belongs the inheritance of the heavens and earth?",
      "Those who gave and strove before the Victory rank higher than those who did after; Allah promised good to all."
    ],
    takeaway: "Give early and often: what you hold is a trust, not truly yours.",
    q: [
      ["Ayah 7: what are believers told to do with wealth?", "Spend from what He entrusted", "Hide it all", "Waste it", "Bury it"],
      ["Ayah 10: who rank higher?", "Those who gave before the Victory", "Those who never gave", "The richest", "The latest"]
    ]
  },
  "11-19": {
    meaning: [
      "Who will lend Allah a goodly loan? He multiplies it for them, and they will have a generous reward.",
      "On that Day you will see the believers, their light running before them and on their right.",
      "Is it not time for believers' hearts to soften at Allah's reminder and the truth sent down?"
    ],
    takeaway: "Let the Quran reach your heart: read it slowly and often.",
    q: [
      ["Ayah 11: what does Allah do with a goodly loan?", "He multiplies it", "Forgets it", "Returns half", "Refuses it"],
      ["Ayah 12: where does the believers' light run?", "Before them and on their right", "Behind them", "Nowhere", "Above the clouds"]
    ]
  },
  "20-25": {
    meaning: [
      "Worldly life is play, show and boasting, like rain whose plants delight farmers, then dry up into straw.",
      "Race to forgiveness from your Lord and a Paradise as wide as the heavens and earth.",
      "No hardship strikes on earth or in yourselves but it is written before; so do not grieve over what you miss."
    ],
    story: "The Prophet ﷺ said: how wonderful the believer's affair is! If good comes, he is thankful; if harm comes, he is patient; both are good for him.",
    hadith: { collection: "muslim", number: 2999, narrator: "Suhaib", text: "How wonderful is the affair of the believer, for all of it is good... if good comes to him he is thankful, and that is good for him; if harm comes to him he is patient, and that is good for him." },
    takeaway: "Do not over-love this world: it fades like dried grass.",
    q: [
      ["Ayah 21: what should we race toward?", "Forgiveness and Paradise", "Fame", "Money", "Games"],
      ["Ayah 22: what is true of every hardship?", "It is written before", "It is random", "It lasts forever", "It is never seen"]
    ]
  },
  "26-29": {
    meaning: [
      "Allah sent Nuh and Ibrahim, and placed prophethood and the Book among their children.",
      "Then He sent Isa son of Maryam, and put kindness and mercy in his followers' hearts.",
      "Believers, fear Allah and believe in His Messenger ﷺ: He gives you a double share of mercy and a light."
    ],
    takeaway: "Keep kindness in your heart, like the best of those before us.",
    q: [
      ["Ayah 26: which two prophets are named first?", "Nuh and Ibrahim", "Adam and Shith", "Hud and Salih", "Yusuf and Yaqub"],
      ["Ayah 28: what will the faithful be given?", "A double share of mercy", "A bag of gold", "A long life", "A big house"]
    ]
  }
};
