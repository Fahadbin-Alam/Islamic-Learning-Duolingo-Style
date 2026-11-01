import type { PassageDeep } from "./types";

/**
 * At-Tahrim (the Forbidding) in depth, passage by passage (the same passages as s066.ts). Our own plain summary
 * of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out (such as
 * the reports about what led to ayah 1), and the lessons stay on what every family can use.
 */
export const DEEP_066: Record<string, PassageDeep> = {
  "1-7": {
    meaning: [
      "Believers, protect yourselves and your families from a Fire whose fuel is people and stones.",
      "Over it are stern angels who never disobey Allah in what He commands, and do what they are told.",
      "On that Day excuses will not help; you are only repaid for what you used to do."
    ],
    story: "The Prophet ﷺ said: each of you is a shepherd, responsible for his flock: a man for his family, and a woman for her home.",
    hadith: { collection: "bukhari", number: 893, narrator: "Ibn Umar", text: "All of you are shepherds and each of you is responsible for his flock. A man is a shepherd of his family... a woman is a shepherd of her husband's house." },
    takeaway: "Help your loved ones learn and pray: you look after them like a shepherd.",
    q: [
      ["Ayah 6: whom must we protect from the Fire?", "Ourselves and our families", "Only friends", "Only neighbours", "No one"],
      ["Ayah 6: what are the angels over it like?", "They never disobey Allah", "They sleep", "They argue", "They leave"]
    ]
  },
  "8-12": {
    meaning: [
      "Believers, turn to Allah in sincere repentance; perhaps your Lord will wipe out your sins.",
      "Allah gives the example of Pharaoh's wife, who prayed: my Lord, build me a house near You in Paradise.",
      "And Maryam, who guarded her chastity and believed in her Lord's words and Books."
    ],
    story: "The Prophet ﷺ said: many men reached perfection, but among women only Maryam, daughter of Imran, and Asiyah, Pharaoh's wife.",
    hadith: { collection: "bukhari", number: 3411, narrator: "Abu Musa al-Ash'ari", text: "Many men reached perfection, but none among the women reached perfection except Maryam, the daughter of Imran, and Asiyah, the wife of Pharaoh." },
    takeaway: "Your faith is your own: stay true even in a hard home.",
    q: [
      ["Ayah 11: what did Pharaoh's wife ask for?", "A house near Allah in Paradise", "A bigger palace", "More gold", "A long life"],
      ["Ayah 8: what kind of repentance are we told to make?", "Sincere repentance", "Half-hearted", "Delayed", "None"]
    ]
  }
};
