import type { PassageDeep } from "./types";

/**
 * An-Nur (the Light) in depth, passage by passage (the same passages as s024.ts). Our own plain summary of
 * Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out, and so
 * are the punishment rulings, which are for scholars and courts, not a kids' quiz.
 */
export const DEEP_024: Record<string, PassageDeep> = {
  "1-10": {
    meaning: [
      "This is a surah Allah sent down with clear rules, so that you may take heed.",
      "Accusing a chaste woman of sin without four witnesses is a grave wrong.",
      "Such accusers are not to be believed, unless they repent and put things right."
    ],
    takeaway: "Never accuse anyone of sin without proof: guard people's honour.",
    q: [
      ["Ayah 4: how many witnesses are needed before such an accusation?", "Four witnesses", "One", "Two", "None"],
      ["Ayah 5: what can such accusers still do?", "Repent and put things right", "Nothing at all", "Pay and forget it", "Hide it"]
    ]
  },
  "11-20": {
    meaning: [
      "Some spread a lie about Aisha, the Prophet's ﷺ wife; Allah Himself declared her innocent.",
      "When you heard it, why did you not think well of each other and say: this is a clear lie?",
      "You passed it on with your tongues, thinking it small, but with Allah it was huge."
    ],
    takeaway: "Heard a rumour? Think well of people, and do not pass it on.",
    q: [
      ["Whom did Allah Himself declare innocent of the lie?", "Aisha", "Khadijah", "Fatimah", "Maryam"],
      ["Ayah 15: how did people treat passing on the rumour?", "Thinking it small", "As a great sin", "As a secret", "As a joke only"]
    ]
  },
  "21-26": {
    meaning: [
      "Do not follow Shaytan's footsteps: he commands what is shameful and wrong.",
      "Let the generous not swear to stop giving to relatives and the poor.",
      "Let them pardon and overlook: would you not love Allah to forgive you?"
    ],
    story: "Abu Bakr stopped helping his poor relative Mistah, who had joined the lie. When ayah 22 came, he said: yes, I love that Allah forgives me, and helped him again.",
    hadith: { collection: "bukhari", number: 4750, narrator: "Aisha", text: "Abu Bakr used to support Mistah... he swore he would never spend on him again. Then Allah revealed 24:22, and Abu Bakr said: yes, by Allah, I love that Allah should forgive me, and resumed." },
    takeaway: "Forgive people who hurt you: you want Allah to forgive you too.",
    q: [
      ["After ayah 22, what did Abu Bakr do for Mistah?", "Helped him again", "Sent him away", "Never spoke to him", "Took his house"],
      ["Ayah 22: what should the generous do?", "Pardon and overlook", "Stop giving", "Take revenge", "Shout at them"]
    ]
  },
  "27-34": {
    meaning: [
      "Do not enter other people's homes until you ask permission and greet those inside.",
      "If you are told to go back, then go back: that is purer for you.",
      "Tell believing men and women to lower their gaze and guard their modesty."
    ],
    takeaway: "Knock, greet, and wait for a yes: good manners are part of faith.",
    q: [
      ["Ayah 27: what must we do before entering others' homes?", "Ask permission and greet", "Walk straight in", "Shout loudly", "Climb the wall"],
      ["Ayah 28: what if we are told to go back?", "Go back", "Insist", "Get angry", "Wait at the door"]
    ]
  },
  "35-40": {
    meaning: [
      "Allah is the Light of the heavens and the earth: light upon light.",
      "His light is like a lamp in a glass shining like a star, lit from a blessed olive tree.",
      "In houses Allah allowed to be raised, men glorify Him morning and evening."
    ],
    takeaway: "Allah's guidance is light: keep your heart near it in the masjid and in prayer.",
    q: [
      ["Ayah 35: Allah is the Light of what?", "Of the heavens and the earth", "Of the sea only", "Of the moon only", "Of one city"],
      ["Ayah 35: the lamp is lit from what tree?", "A blessed olive tree", "A palm tree", "A fig tree", "An oak"]
    ]
  },
  "41-50": {
    meaning: [
      "Everyone in the heavens and earth glorifies Allah, and so do the birds with wings spread.",
      "Each one knows its own way of prayer and glorifying.",
      "Allah drives the clouds, joins them, and piles them up, and you see rain come out."
    ],
    takeaway: "Even creatures of the sky praise Allah: do not let them out-praise you.",
    q: [
      ["Ayah 41: which creatures glorify Allah with wings spread?", "The birds", "The fish", "The lions", "The ants"],
      ["Ayah 43: what comes out of the piled-up clouds?", "Rain", "Fire", "Sand", "Stones only"]
    ]
  },
  "51-57": {
    meaning: [
      "When called to Allah and His Messenger ﷺ, the believers say: we hear and we obey.",
      "Allah promised those who believe and do good that He would make them successors on earth.",
      "Keep up the prayer, give zakah, and obey the Messenger ﷺ, so that you may receive mercy."
    ],
    takeaway: "Answer Allah's call with a yes, never with 'maybe later'.",
    q: [
      ["Ayah 51: what do believers say when called to Allah?", "We hear and we obey", "Maybe later", "Not now", "Why should we?"],
      ["Ayah 56: what three deeds bring Allah's mercy?", "Prayer, zakah and obeying", "Shopping", "Sleeping", "Arguing"]
    ]
  },
  "58-61": {
    meaning: [
      "Children and helpers should ask permission at three private times.",
      "Before the dawn prayer, at midday rest, and after the night prayer.",
      "When you enter homes, greet one another with a greeting blessed and good from Allah."
    ],
    takeaway: "Teach children to knock at private times: Islam guards privacy.",
    q: [
      ["Ayah 58: how many private times need permission?", "Three", "One", "Five", "Seven"],
      ["Ayah 61: how should we greet when entering homes?", "With a blessed, good greeting", "Silently", "With a shout", "With a whistle"]
    ]
  },
  "62-64": {
    meaning: [
      "True believers, when gathered with the Messenger ﷺ on a matter, do not leave without permission.",
      "Do not call the Messenger ﷺ the way you call one another.",
      "To Allah belongs all in the heavens and earth; He knows what you are upon."
    ],
    takeaway: "Speak about the Prophet ﷺ with honour, and do not slip away from good gatherings.",
    q: [
      ["Ayah 62: what do believers ask before leaving the Messenger ﷺ?", "Permission", "Money", "Food", "Nothing"],
      ["Ayah 63: how should we not call the Messenger ﷺ?", "The way we call one another", "With respect", "With his title", "Politely"]
    ]
  }
};
