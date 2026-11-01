import type { PassageDeep } from "./types";

/**
 * Al-Qadr (the Night of Decree) in depth, passage by passage (the same passages as s097.ts). Our own plain
 * summary of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on, such as
 * which exact night it is, is left out.
 */
export const DEEP_097: Record<string, PassageDeep> = {
  "1-3": {
    meaning: [
      "Allah sent the Quran down on Laylat al-Qadr, the Night of Decree, in Ramadan.",
      "What will make you know what the Night of Decree is?",
      "The Night of Decree is better than a thousand months."
    ],
    story: "The Prophet ﷺ said: whoever stands in prayer on Laylat al-Qadr with faith, hoping for reward, his past sins are forgiven.",
    hadith: { collection: "bukhari", number: 1901, narrator: "Abu Hurairah", text: "Whoever stands in prayer on Laylat al-Qadr out of faith and hoping for reward, his previous sins will be forgiven." },
    takeaway: "One night of worship can outweigh a lifetime: do not miss it.",
    q: [
      ["Ayah 3: that night is better than how many months?", "A thousand", "Ten", "A hundred", "Twelve"],
      ["What does praying on that night with faith bring?", "Past sins forgiven", "More gold", "A new house", "Nothing"]
    ]
  },
  "4-5": {
    meaning: [
      "On that night the angels and Jibril come down, by their Lord's permission, with every decree.",
      "It is peace, until the rising of the dawn."
    ],
    story: "The Prophet ﷺ told us to look for it in the odd nights of the last ten nights of Ramadan.",
    hadith: { collection: "bukhari", number: 2017, narrator: "Aisha", text: "Search for the Night of Qadr in the odd nights of the last ten nights of Ramadan." },
    takeaway: "Spend the final ten of Ramadan in prayer and dua, hoping to catch it.",
    q: [
      ["Ayah 5: until when is that night peace?", "Until the rising of the dawn", "Until noon", "For one hour", "Until midnight"],
      ["In which nights should we look for it?", "Odd nights of the last ten", "The first night", "Any night of the year", "Only Fridays"]
    ]
  }
};
