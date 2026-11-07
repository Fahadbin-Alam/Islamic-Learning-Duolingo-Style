import type { PassageDeep } from "./types";

/**
 * Al-Mumtahanah (the Woman Tested) in depth, passage by passage (the same passages as s060.ts). Our own plain
 * summary of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_060: Record<string, PassageDeep> = {
  "1-6": {
    meaning: [
      "Believers, do not take Allah's enemies as close allies when they drove out the Messenger ﷺ and you.",
      "Ibrahim and those with him are a fine example: they told their people, we have nothing to do with your idols.",
      "Ibrahim prayed: our Lord, we rely on You, we turn to You, and to You is the return."
    ],
    story: "Hatib secretly wrote to Makkah about the Prophet's ﷺ plans. The Prophet ﷺ forgave him, as he had fought at Badr, and these ayahs came down.",
    hadith: { collection: "bukhari", number: 3007, narrator: "Ali ibn Abi Talib", text: "The Prophet ﷺ sent us to catch up with a woman carrying a letter from Hatib to the people of Makkah... He said: he was present at Badr. Then Allah revealed: O you who believe, do not take My enemies and yours as allies." },
    takeaway: "Put loyalty to Allah first, and copy Ibrahim's trust.",
    q: [
      ["Ayah 4: who is a fine example for believers?", "Ibrahim and those with him", "Pharaoh", "Qarun", "Abu Lahab"],
      ["Ayah 4: on whom did Ibrahim rely?", "On our Lord", "On his tribe", "On his wealth", "On the idols"]
    ]
  },
  "7-13": {
    meaning: [
      "Perhaps Allah will put love between you and those you now oppose; Allah is Forgiving, Merciful.",
      "Allah does not forbid you to be kind and fair to those who did not fight you or drive you out.",
      "Allah loves the just."
    ],
    story: "Asma's mother, not yet Muslim, came to visit. Asma asked the Prophet ﷺ if she should be kind to her. He said: yes, keep good ties with your mother.",
    hadith: { collection: "bukhari", number: 2620, narrator: "Asma bint Abi Bakr", text: "My mother came to me while she was a polytheist... I asked Allah's Messenger ﷺ: shall I keep good ties with her? He said: yes, keep good ties with your mother." },
    takeaway: "Be kind and fair with all peaceful neighbours, whatever their faith.",
    q: [
      ["Ayah 8: who may we be kind and fair to?", "Those who did not fight us", "No one", "Only Muslims", "Only family"],
      ["Ayah 8: whom does Allah love?", "The just", "The proud", "The cruel", "The lazy"]
    ]
  }
};
