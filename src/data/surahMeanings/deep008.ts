import type { PassageDeep } from "./types";

/**
 * Al-Anfal in depth, passage by passage (the same passages as s008.ts). Our own plain summary of Tafsir Ibn
 * Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_008: Record<string, PassageDeep> = {
  "1-10": {
    meaning: [
      "True believers' hearts tremble when Allah is mentioned, and their faith grows when His ayahs are recited.",
      "They pray, give from what Allah gave them, and put their trust in their Lord.",
      "At Badr the believers called for help, and Allah answered: I will help you with a thousand angels."
    ],
    story: "Before Badr, the Prophet ﷺ faced the qiblah and prayed with raised hands until his cloak fell. Abu Bakr put it back on him, and Allah sent down ayah 9.",
    hadith: { collection: "muslim", number: 1763, narrator: "Umar ibn al-Khattab", text: "On the day of Badr the Prophet ﷺ faced the qiblah and called on his Lord until his cloak fell; then Allah revealed 8:9." },
    takeaway: "Victory comes from Allah: pray hard, then trust Him.",
    q: [
      ["Ayah 9: how many angels did Allah promise at Badr?", "A thousand", "Ten", "One hundred", "Seven"],
      ["Before Badr, who put the Prophet's ﷺ cloak back on him?", "Abu Bakr", "Umar", "Bilal", "Khalid"]
    ]
  },
  "11-28": {
    meaning: [
      "At Badr Allah sent calm sleep over the believers and rain to make them pure and steady.",
      "Answer Allah and the Messenger ﷺ when he calls you to what gives you life.",
      "Know that your wealth and your children are a test, and with Allah is a great reward."
    ],
    takeaway: "Love your family and money, but never let them pull you from Allah.",
    q: [
      ["Ayah 11: what did Allah send down at Badr to make them pure?", "Rain", "Snow", "Sand", "Fire"],
      ["Ayah 24: what does the Messenger ﷺ call us to?", "What gives us life", "What makes us rich", "Sleep", "War only"]
    ]
  },
  "29-44": {
    meaning: [
      "If you are mindful of Allah, He gives you a furqan: a way to tell right from wrong.",
      "They plotted against the Prophet ﷺ in Makkah, but Allah is the best of planners.",
      "Badr was the Day of Criterion, when the two armies met."
    ],
    takeaway: "Taqwa clears your sight: you start to see right and wrong plainly.",
    q: [
      ["Ayah 30: where did they plot against the Prophet ﷺ?", "In Makkah", "In Madinah", "In Ta'if", "In Egypt"],
      ["Ayah 41: what is Badr called?", "The Day of Criterion", "The Day of Rest", "The Day of Trade", "The Day of Clouds"]
    ]
  },
  "45-58": {
    meaning: [
      "When you meet a force, stand firm and remember Allah much, so you succeed.",
      "Obey Allah and His Messenger ﷺ, do not quarrel or you lose strength; be patient: Allah is with the patient.",
      "Do not be like those who marched out proudly, to show off to people."
    ],
    takeaway: "Unity is strength: quarrels make a team weak.",
    q: [
      ["Ayah 46: whom is Allah with?", "The patient", "The proud", "The loud", "The lazy"],
      ["Ayah 47: how did some march out that we must not copy?", "Proudly, to show off", "Quietly", "With prayer", "With patience"]
    ]
  },
  "59-66": {
    meaning: [
      "If the other side leans toward peace, lean toward it too, and trust in Allah.",
      "Allah joined the believers' hearts; spending all the earth's wealth could not have done it.",
      "Prophet, Allah is enough for you, and for the believers who follow you."
    ],
    takeaway: "Choose peace when it is offered, and trust Allah with the rest.",
    q: [
      ["Ayah 63: could all the earth's wealth have joined their hearts?", "No, only Allah joined them", "Yes, easily", "Only gold could", "Only a king could"],
      ["Ayah 64: what is enough for the Prophet ﷺ and believers?", "Allah is enough", "Their army is", "Their wealth is", "Their tribe is"]
    ]
  },
  "67-75": {
    meaning: [
      "Allah tells the captives: if He sees good in your hearts, He will give you better than what was taken.",
      "The Muhajirun and the Ansar who sheltered and helped them are allies of one another.",
      "Relatives have closer rights to one another in Allah's Book."
    ],
    takeaway: "Brotherhood in faith joins strangers; family keeps its rights too.",
    q: [
      ["Ayah 70: if Allah sees good in a captive's heart, what will He give?", "Better than what was taken", "Nothing", "Only a warning", "A punishment"],
      ["Ayah 75: who have closer rights to one another?", "Relatives", "Strangers", "Kings", "Traders"]
    ]
  }
};
