import type { PassageDeep } from "./types";

/**
 * Quraysh in depth, passage by passage (the same passages as s106.ts). Our own plain summary of Tafsir Ibn
 * Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_106: Record<string, PassageDeep> = {
  "1-2": {
    meaning: [
      "For the habit of Quraysh, their familiar, safe routine,",
      "their caravans in winter to Yemen and in summer to Sham, travelling in safety."
    ],
    story: "Quraysh lived in a dry valley with no farms, yet traders let them pass safely because they guarded the Ka'bah, so their families had food.",
    takeaway: "The routines that keep you comfortable are gifts from Allah: notice them.",
    q: [
      ["Ayah 2: which two journeys did Quraysh make?", "Winter and summer", "Spring and autumn", "Only by sea", "None"],
      ["Where did the summer caravan go?", "To Sham", "To Egypt", "To India", "To Persia"]
    ]
  },
  "3-4": {
    meaning: [
      "So let them worship the Lord of this House, the Ka'bah,",
      "who fed them against hunger and made them safe from fear."
    ],
    takeaway: "Thank the One who feeds you and keeps you safe by worshipping Him alone.",
    q: [
      ["Ayah 3: whom should Quraysh worship?", "The Lord of this House", "Their idols", "Their leaders", "The caravans"],
      ["Ayah 4: what did Allah protect Quraysh from?", "Hunger and fear", "Rain", "Snow", "Sleep"]
    ]
  }
};
