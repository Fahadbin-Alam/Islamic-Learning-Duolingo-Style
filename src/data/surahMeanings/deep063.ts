import type { PassageDeep } from "./types";

/**
 * Al-Munafiqun (the Hypocrites) in depth, passage by passage (the same passages as s063.ts). Our own plain
 * summary of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_063: Record<string, PassageDeep> = {
  "1-8": {
    meaning: [
      "When the hypocrites come to you they say: we bear witness you are the Messenger of Allah ﷺ; but they are liars.",
      "Their looks impress you and you listen to their speech; yet they are like propped-up wood.",
      "They say: spend nothing on the Messenger's ﷺ companions; but the treasures of heaven and earth are Allah's."
    ],
    story: "Young Zayd ibn Arqam reported what a hypocrite leader said. Some doubted him, until Allah sent these ayahs confirming his words.",
    hadith: { collection: "bukhari", number: 4900, narrator: "Zayd ibn Arqam", text: "I heard Abdullah ibn Ubayy saying: do not spend on those who are with Allah's Messenger... I told my uncle, who told the Prophet ﷺ... then Allah revealed: when the hypocrites come to you." },
    takeaway: "Let your inside match your outside: Allah sees the heart.",
    q: [
      ["Ayah 4: what are the hypocrites likened to?", "Propped-up wood", "Strong trees", "Flowing rivers", "Shining stars"],
      ["Ayah 7: whose are the treasures of heaven and earth?", "Allah's", "The kings'", "The hypocrites'", "Nobody's"]
    ]
  },
  "9-11": {
    meaning: [
      "Believers, let not your wealth or children distract you from remembering Allah; whoever does is the loser.",
      "Spend before death comes and one says: my Lord, give me a little more time, so I can give charity.",
      "Allah never delays a soul when its time has come; He knows what you do."
    ],
    takeaway: "Give today: no one knows when their last day will be.",
    q: [
      ["Ayah 9: what must not distract us from Allah?", "Wealth and children", "Prayer", "The Quran", "Good friends"],
      ["Ayah 10: what does the dying one wish he could do?", "Give charity", "Go on holiday", "Buy a house", "Sleep more"]
    ]
  }
};
