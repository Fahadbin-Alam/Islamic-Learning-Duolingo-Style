import type { PassageDeep } from "./types";

/**
 * Surah Muhammad in depth, passage by passage (the same passages as s047.ts). Our own plain summary of Tafsir
 * Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out, and so are the
 * battle rulings, which are for scholars, not a kids' quiz.
 */
export const DEEP_047: Record<string, PassageDeep> = {
  "1-11": {
    meaning: [
      "Allah wipes out the deeds of those who deny and block others from His path.",
      "For those who believe in what came to Muhammad ﷺ, Allah removes their sins and sets their state right.",
      "Believers, if you help Allah's religion, He will help you and make your feet firm."
    ],
    takeaway: "Stand up for what is right: Allah stands with those who stand for Him.",
    q: [
      ["Ayah 7: what does Allah do for those who help His religion?", "Helps them and makes their feet firm", "Ignores them", "Makes them weak", "Forgets them"],
      ["Ayah 2: what does Allah set right for the believers?", "Their state", "Their clothes", "Their houses", "Their names"]
    ]
  },
  "12-19": {
    meaning: [
      "Paradise has rivers of water that never goes bad, and rivers of milk whose taste never changes.",
      "It has rivers of pure honey and of a delightful drink, with every fruit, and forgiveness from their Lord.",
      "Know that there is no god but Allah, and ask forgiveness for your sins and for the believers."
    ],
    story: "The Prophet ﷺ said: by Allah, I ask Allah's forgiveness and turn to Him more than seventy times a day.",
    hadith: { collection: "bukhari", number: 6307, narrator: "Abu Hurairah", text: "By Allah, I seek Allah's forgiveness and repent to Him more than seventy times a day." },
    takeaway: "Say la ilaha illallah often, and ask for forgiveness every day.",
    q: [
      ["Ayah 15: which of these is a river of Paradise?", "Pure honey", "Oil", "Sand", "Ink"],
      ["Ayah 19: what are we told to know?", "There is no god but Allah", "The stars' names", "The price of gold", "Old poems"]
    ]
  },
  "20-28": {
    meaning: [
      "Do they not reflect on the Quran, or are there locks upon their hearts?",
      "The hypocrites asked for a surah, but when a firm one came calling them to strive, they shrank back.",
      "Allah brings their hidden grudges to light; you would know them by the tone of their speech."
    ],
    takeaway: "Read slowly and think about each ayah: that opens the heart.",
    q: [
      ["Ayah 24: what does Allah ask people to reflect on?", "The Quran", "The stars", "Their wealth", "Poetry"],
      ["Ayah 30: how could the hypocrites be known?", "By the tone of their speech", "By their clothes", "By their height", "By their names"]
    ]
  },
  "29-38": {
    meaning: [
      "The life of this world is only play and passing fun; believe and be mindful, and He gives your rewards.",
      "Whoever is stingy is stingy only to himself; Allah is the Rich, and you are the poor.",
      "If you turn away, He will bring another people in your place, and they will not be like you."
    ],
    story: "The Prophet ﷺ said: charity never makes wealth less, and Allah raises the one who is humble for His sake.",
    hadith: { collection: "muslim", number: 2588, narrator: "Abu Hurairah", text: "Charity does not decrease wealth, Allah increases the one who forgives in honour, and no one humbles himself for Allah except that Allah raises him." },
    takeaway: "Give in charity gladly: the giver gains the most.",
    q: [
      ["Ayah 38: who is the stingy person really stingy to?", "Himself", "Allah", "The poor", "The angels"],
      ["Ayah 38: what happens if people turn away?", "Allah brings another people", "Nothing at all", "They get richer", "They rule forever"]
    ]
  }
};
