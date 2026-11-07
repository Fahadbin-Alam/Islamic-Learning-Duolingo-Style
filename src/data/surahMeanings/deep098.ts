import type { PassageDeep } from "./types";

/**
 * Al-Bayyinah (the Clear Proof) in depth, passage by passage (the same passages as s098.ts). Our own plain
 * summary of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_098: Record<string, PassageDeep> = {
  "1-5": {
    meaning: [
      "The deniers would not leave their ways until the clear proof came to them.",
      "A messenger from Allah, reciting purified pages holding upright writings.",
      "They were only told to worship Allah sincerely, pray, and give zakah: that is the upright religion."
    ],
    story: "The Prophet ﷺ told Ubayy ibn Ka'b that Allah had asked him to recite this surah to him. Ubayy asked: Allah named me? He ﷺ said yes, and Ubayy wept.",
    hadith: { collection: "bukhari", number: 4959, narrator: "Anas ibn Malik", text: "The Prophet ﷺ said to Ubayy: Allah has commanded me to recite to you Lam yakunil-ladhina kafaru. Ubayy said: did He name me? He said: yes. So Ubayy wept." },
    takeaway: "Keep your worship pure for Allah: that is the straight religion.",
    q: [
      ["Ayah 5: how were people told to worship Allah?", "Sincerely, for Him alone", "Only on Fridays", "With idols too", "For show"],
      ["To whom was the Prophet ﷺ told to recite it?", "Ubayy ibn Ka'b", "Abu Jahl", "Abu Lahab", "Bilal"]
    ]
  },
  "6-8": {
    meaning: [
      "Those who reject the truth will be in the fire of Jahannam: they are the worst of creatures.",
      "Those who believe and do righteous deeds are the best of creation.",
      "Their reward is gardens of Eden forever; Allah is pleased with them, and they with Him."
    ],
    takeaway: "Faith plus good deeds lifts a person above all creatures.",
    q: [
      ["Ayah 7: who are the best of creation?", "Those who believe and do good", "The strongest", "The richest", "The tallest"],
      ["Ayah 8: who is pleased with whom?", "Allah with them, and they with Him", "Only kings", "No one", "Only the angels"]
    ]
  }
};
