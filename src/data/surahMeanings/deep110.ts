import type { PassageDeep } from "./types";

/**
 * An-Nasr (the Help) in depth, passage by passage (the same passages as s110.ts). Our own plain summary of
 * Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_110: Record<string, PassageDeep> = {
  "1-2": {
    meaning: [
      "When Allah's help comes, and the victory, the opening of Makkah,",
      "and you see people entering Allah's religion in crowds, whole tribes at once."
    ],
    story: "Umar asked the elders of Badr about this surah. Young Ibn Abbas said it was a sign that the Prophet's ﷺ mission was complete and his time was near; Umar agreed.",
    hadith: { collection: "bukhari", number: 4970, narrator: "Ibn Abbas", text: "It was the sign of the death of Allah's Messenger ﷺ, which Allah informed him of: when the help of Allah and the victory come, that is the sign of your end." },
    takeaway: "Victory is from Allah alone: never forget who gave it.",
    q: [
      ["Ayah 2: how do people enter Allah's religion?", "In crowds", "Never", "One in a hundred years", "By force"],
      ["What did Ibn Abbas say An-Nasr was a sign of?", "The Prophet's ﷺ mission complete", "A new war", "A famine", "A long life"]
    ]
  },
  "3": {
    meaning: [
      "Then glorify your Lord with praise, and ask Him for forgiveness:",
      "surely He is ever accepting of repentance.",
      "Even at his greatest victory, the Prophet ﷺ was told to turn to Allah humbly."
    ],
    story: "After this surah came, the Prophet ﷺ often said in his bowing and prostration: Subhanaka Allahumma Rabbana wa bihamdika, Allahumma-ghfir li.",
    hadith: { collection: "bukhari", number: 4968, narrator: "Aishah", text: "After Idha ja'a nasrullahi wal-fath was revealed, the Prophet ﷺ did not pray a prayer without saying in it: Subhanaka Rabbana wa bihamdika, Allahumma-ghfir li." },
    takeaway: "When good things happen, say SubhanAllah, Alhamdulillah, and Astaghfirullah.",
    q: [
      ["Ayah 3: what should we do when blessings come?", "Glorify with praise and seek forgiveness", "Boast", "Forget Allah", "Stop praying"],
      ["Ayah 3: how does Allah treat repentance?", "Ever accepting of it", "He rejects it", "Only once", "He ignores it"]
    ]
  }
};
