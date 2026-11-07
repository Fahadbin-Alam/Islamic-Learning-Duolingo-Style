import type { PassageDeep } from "./types";

/**
 * As-Sajdah (the Prostration) in depth, passage by passage (the same passages as s032.ts). Our own plain summary
 * of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_032: Record<string, PassageDeep> = {
  "1-11": {
    meaning: [
      "Allah created the heavens and earth and all between them in six days.",
      "He perfected everything He made, and began the creation of man from clay.",
      "He gave you hearing, sight and hearts; how little you give thanks."
    ],
    takeaway: "Your eyes, ears and heart are gifts: use them in ways Allah loves.",
    q: [
      ["Ayah 7: from what did Allah begin the creation of man?", "From clay", "From fire", "From light", "From water only"],
      ["Ayah 9: what did Allah give us that we rarely thank Him for?", "Hearing, sight and hearts", "Gold and silver", "Fame", "Fast cars"]
    ]
  },
  "12-22": {
    meaning: [
      "Believers fall in prostration when reminded, and glorify their Lord without pride.",
      "Their sides leave their beds at night to call on their Lord in fear and hope.",
      "No soul knows what joy is hidden for them as a reward for what they did."
    ],
    story: "The Prophet ﷺ said Allah has prepared for His righteous servants what no eye has seen, no ear has heard, and no heart has imagined.",
    hadith: { collection: "bukhari", number: 4779, narrator: "Abu Hurairah", text: "Allah said: I have prepared for My righteous servants what no eye has seen, no ear has heard, and no human heart has imagined." },
    takeaway: "Get up for even a little night prayer: its reward is beyond imagining.",
    q: [
      ["Ayah 16: what do the believers' sides leave at night?", "Their beds", "Their houses", "Their friends", "Their work"],
      ["Ayah 17: what does no soul know?", "The joy hidden for them", "The way home", "The names of stars", "The price of gold"]
    ]
  },
  "23-30": {
    meaning: [
      "Allah gave Musa the Book and made it guidance for the Children of Israel.",
      "He made leaders among them who guided by His command, because they were patient and certain.",
      "Do they not see how Allah drives water to dry land and brings out crops?"
    ],
    takeaway: "Patience plus firm faith is the path to leading others in good.",
    q: [
      ["Ayah 24: why were these leaders chosen?", "They were patient and certain", "They were rich", "They were loud", "They were tall"],
      ["Ayah 27: what does water bring out of dry land?", "Crops", "Gold", "Stones", "Sand"]
    ]
  }
};
