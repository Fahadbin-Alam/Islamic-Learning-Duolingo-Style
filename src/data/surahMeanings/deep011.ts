import type { PassageDeep } from "./types";

/**
 * Hud in depth, passage by passage (the same passages as s011.ts). Our own plain summary of Tafsir Ibn Kathir
 * and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_011: Record<string, PassageDeep> = {
  "1-24": {
    meaning: [
      "Ask your Lord's forgiveness and turn to Him; He will give you good enjoyment for a set time.",
      "There is no creature on earth but Allah provides for it, and knows where it lives and rests.",
      "He made the heavens and earth in six days, while His Throne was over the water, to test who does best."
    ],
    takeaway: "Your provision is written by Allah: work hard, and do not worry.",
    q: [
      ["Ayah 6: what does Allah know about every creature?", "Where it lives and rests", "Nothing", "Only its name", "Only its colour"],
      ["Ayah 7: why were the heavens and earth made?", "To test who does best", "For no reason", "To be worshipped", "For games"]
    ]
  },
  "25-49": {
    meaning: [
      "Nuh built the ark as Allah taught him, while his people mocked him.",
      "He said: ride in it, in Allah's name it sails and anchors.",
      "His son refused, saying a mountain would save him; the waves came between them."
    ],
    story: "The water rose, then Allah said: earth, swallow your water; sky, hold back. The ark came to rest on Mount Judi.",
    takeaway: "Only Allah saves: not a mountain, not a family name.",
    q: [
      ["Ayah 43: what did Nuh's son think would save him?", "A mountain", "A boat of his own", "His friends", "A cave"],
      ["Ayah 44: where did the ark come to rest?", "On Mount Judi", "In Makkah", "On Sinai", "In the sea"]
    ]
  },
  "50-60": {
    meaning: [
      "Hud told Ad: ask your Lord's forgiveness, and He will send you plenty of rain and add strength to your strength.",
      "He said: I put my trust in Allah, my Lord and your Lord.",
      "There is no creature but He holds it by its forelock."
    ],
    takeaway: "Istighfar brings rain and strength: say astaghfirullah often.",
    q: [
      ["Ayah 52: what did Hud say forgiveness would add to Ad?", "Strength to their strength", "Weakness", "Hunger", "More enemies"],
      ["Ayah 56: what does Allah hold every creature by?", "Its forelock", "Its tail", "Its hand", "Nothing"]
    ]
  },
  "61-68": {
    meaning: [
      "Salih told Thamud: Allah made you from the earth and settled you in it, so ask forgiveness.",
      "He said: my Lord is near and answers.",
      "The she-camel was Allah's sign; they harmed it, and three days later the punishment came."
    ],
    takeaway: "Allah is near and answers: call on Him.",
    q: [
      ["Ayah 61: what did Salih say about his Lord?", "He is near and answers", "He is far away", "He never hears", "He is busy"],
      ["Ayah 65: how many days were they given after harming the camel?", "Three days", "Seven days", "Forty days", "One year"]
    ]
  },
  "69-83": {
    meaning: [
      "Angels came to Ibrahim; he quickly served them a roasted calf, but they did not eat.",
      "They gave his wife good news of Ishaq, and after Ishaq, Yaqub.",
      "She said: shall I have a child when I am old and my husband an old man? This is a wonder!"
    ],
    takeaway: "Treat guests generously, like Ibrahim did.",
    q: [
      ["Ayah 69: what did Ibrahim serve his guests?", "A roasted calf", "Bread and dates", "Milk only", "Fish"],
      ["Ayah 71: who would come after Ishaq?", "Yaqub", "Yusuf", "Musa", "Isa"]
    ]
  },
  "84-95": {
    meaning: [
      "Shu'ayb told Madyan: give full measure and weight, and do not cheat people of their things.",
      "He said: I only want to set things right as far as I can; my success is only from Allah.",
      "Ask your Lord's forgiveness, then turn to Him: my Lord is Merciful and Loving."
    ],
    takeaway: "Do what good you can, and know success comes only from Allah.",
    q: [
      ["Ayah 88: what did Shu'ayb want to do?", "Set things right as far as he could", "Get rich", "Rule Madyan", "Leave his people"],
      ["Ayah 90: how did Shu'ayb describe his Lord?", "Merciful and Loving", "Angry and far", "Silent", "Hard to please"]
    ]
  },
  "96-109": {
    meaning: [
      "Musa was sent with signs to Pharaoh, but his people followed Pharaoh's command.",
      "Pharaoh will lead his people on the Day of Resurrection, as he led them in this life.",
      "On that Day some will be wretched and some happy; no soul speaks except by His leave."
    ],
    takeaway: "Choose whom you follow with care: people stay with them to the end.",
    q: [
      ["Ayah 98: what will Pharaoh do on the Day of Resurrection?", "Lead his people", "Hide", "Become a believer", "Sleep"],
      ["Ayah 105: who may speak on that Day?", "Only by Allah's leave", "Anyone who likes", "Only kings", "No rules"]
    ]
  },
  "110-123": {
    meaning: [
      "Stand firm as you have been commanded, and do not go beyond the limits.",
      "Pray at the two ends of the day and in the early night: good deeds wipe out bad deeds.",
      "We tell you the messengers' stories to make your heart firm."
    ],
    takeaway: "After a bad deed, do a good one: it wipes the bad away.",
    q: [
      ["Ayah 114: at what times are we told to pray?", "The two ends of the day and early night", "Only at noon", "Only once a week", "Never"],
      ["Ayah 120: why are the messengers' stories told?", "To make the heart firm", "To pass time", "To scare us", "For games"]
    ]
  }
};
