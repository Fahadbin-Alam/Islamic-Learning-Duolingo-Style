import type { PassageDeep } from "./types";

/**
 * Al-Hashr (the Gathering) in depth, passage by passage (the same passages as s059.ts). Our own plain summary of
 * Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_059: Record<string, PassageDeep> = {
  "1-10": {
    meaning: [
      "Banu Nadir broke their treaty, and Allah made them leave Madinah: take a lesson, you who have eyes.",
      "The Ansar loved those who migrated to them, and put them before themselves even when in need.",
      "Whoever is saved from his own greed, those are the successful."
    ],
    story: "An Ansari couple fed a hungry guest their children's dinner, dimming the lamp so he would not see they ate nothing. Then ayah 9 came down.",
    hadith: { collection: "bukhari", number: 3798, narrator: "Abu Hurayrah", text: "A man came to the Prophet ﷺ hungry... an Ansari took him home, put the children to sleep, put out the lamp and pretended to eat. Allah revealed: they prefer others over themselves even if they are in need (59:9)." },
    takeaway: "Share even when you have little: giving beats holding on.",
    q: [
      ["Ayah 9: who put the Muhajirun before themselves?", "The Ansar", "Quraysh", "The Romans", "The Persians"],
      ["Ayah 9: who are the successful?", "Those saved from their own greed", "The richest", "The loudest", "Those who keep all"]
    ]
  },
  "11-17": {
    meaning: [
      "The hypocrites promised Banu Nadir: if you are driven out, we will go with you; but they lied.",
      "You think they are united, but their hearts are divided.",
      "They are like Shaytan, who tells a person to disbelieve, then says: I have nothing to do with you."
    ],
    takeaway: "Pick friends whose words match what they do.",
    q: [
      ["Ayah 16: who are the hypocrites compared to?", "Shaytan", "Angels", "Prophets", "Scholars"],
      ["Ayah 14: what are their hearts really like?", "Divided", "United", "Pure", "Brave"]
    ]
  },
  "18-24": {
    meaning: [
      "Believers, fear Allah, and let every soul look at what it has sent ahead for tomorrow.",
      "Had Allah sent this Quran down on a mountain, you would see it humbled, split apart in awe of Allah.",
      "He is Allah, the Creator, the Maker, the Shaper; His are the most beautiful names."
    ],
    story: "The Prophet ﷺ said: Allah has ninety-nine names; whoever learns them by heart will enter Paradise.",
    hadith: { collection: "bukhari", number: 2736, narrator: "Abu Hurairah", text: "Allah has ninety-nine names, one hundred less one; whoever learns them by heart will enter Paradise." },
    takeaway: "Learn your Lord's beautiful names one by one, and call Him by them.",
    q: [
      ["Ayah 21: what would a mountain do if the Quran came on it?", "Be humbled and split apart", "Laugh", "Grow taller", "Nothing"],
      ["Ayah 18: what should every soul look at?", "What it sent ahead for tomorrow", "Its clothes", "Its neighbours", "Its money"]
    ]
  }
};
