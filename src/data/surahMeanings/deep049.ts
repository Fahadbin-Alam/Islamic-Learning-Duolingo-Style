import type { PassageDeep } from "./types";

/**
 * Al-Hujurat (the Rooms) in depth, passage by passage (the same passages as s049.ts). Our own plain summary of
 * Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_049: Record<string, PassageDeep> = {
  "1-5": {
    meaning: [
      "Believers, do not rush ahead of Allah and His Messenger ﷺ; be mindful of Allah, He hears and knows.",
      "Do not raise your voices above the Prophet's ﷺ voice, or speak loudly to him as you do to each other.",
      "Those who lower their voices near Allah's Messenger ﷺ, Allah has tested their hearts for mindfulness."
    ],
    story: "Thabit ibn Qays had a loud voice and feared his deeds were lost, so he stayed home. The Prophet ﷺ said: he is from the people of Paradise.",
    hadith: { collection: "bukhari", number: 4846, narrator: "Anas ibn Malik", text: "The Prophet ﷺ missed Thabit ibn Qays... Thabit said: I used to raise my voice above the Prophet's ﷺ voice, so my deeds are lost. The Prophet ﷺ said: rather, he is from the people of Paradise." },
    takeaway: "Speak softly and kindly, and show the Sunnah deep respect.",
    q: [
      ["Ayah 2: whose voice should we not raise ours above?", "The Prophet's ﷺ voice", "A poet's voice", "The wind's voice", "A child's voice"],
      ["Ayah 1: what must believers not do before Allah's Messenger ﷺ?", "Rush ahead", "Listen", "Obey", "Learn"]
    ]
  },
  "6-10": {
    meaning: [
      "If a wrongdoer brings you news, check it first, so you do not harm people unknowingly and regret it.",
      "If two groups of believers fight, make peace between them, and be just: Allah loves the just.",
      "The believers are brothers, so make peace between your brothers and be mindful of Allah."
    ],
    takeaway: "Before you share a message, ask: is it true? Then help people make up.",
    q: [
      ["Ayah 6: what should we do with news from a wrongdoer?", "Check it first", "Spread it fast", "Believe it", "Laugh at it"],
      ["Ayah 10: what are the believers to each other?", "Brothers", "Strangers", "Rivals", "Enemies"]
    ]
  },
  "11-13": {
    meaning: [
      "Do not mock others: they may be better than you; and do not call each other bad names.",
      "Avoid much suspicion, do not spy, and do not backbite; Allah likens backbiting to something disgusting.",
      "People, Allah made you nations and tribes to know each other; the noblest with Allah is the most mindful."
    ],
    story: "The Prophet ﷺ asked: do you know what backbiting is? It is saying about your brother what he would dislike.",
    hadith: { collection: "muslim", number: 2589, narrator: "Abu Hurayrah", text: "Do you know what backbiting is? They said: Allah and His Messenger know best. He said: mentioning your brother with what he dislikes." },
    takeaway: "Speak about people as if they were standing right beside you.",
    q: [
      ["Ayah 13: who is the noblest with Allah?", "The most mindful", "The richest", "The tallest", "The loudest"],
      ["Ayah 13: why did Allah make nations and tribes?", "To know each other", "To fight", "To boast", "To compete in wealth"]
    ]
  },
  "14-18": {
    meaning: [
      "The Bedouins said: we believe. Say: rather say 'we submit', for faith has not yet entered your hearts.",
      "True believers believe in Allah and His Messenger ﷺ, have no doubt, and strive with wealth and selves.",
      "Do not count your Islam as a favour to the Prophet ﷺ; Allah did you the favour by guiding you."
    ],
    takeaway: "Being guided is a gift: thank your Lord for it daily.",
    q: [
      ["Ayah 15: what do true believers have none of?", "Doubt", "Faith", "Patience", "Hope"],
      ["Ayah 17: who did whom a favour with guidance?", "Allah did us the favour", "We did Allah a favour", "No one", "The Bedouins did"]
    ]
  }
};
