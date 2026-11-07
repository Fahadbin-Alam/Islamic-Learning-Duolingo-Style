import type { PassageDeep } from "./types";

/**
 * Az-Zumar (the Groups) in depth, passage by passage (the same passages as s039.ts). Our own plain summary of
 * Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_039: Record<string, PassageDeep> = {
  "1-9": {
    meaning: [
      "Worship Allah, making your religion sincerely for Him alone.",
      "He created you from one soul, and wraps the night over the day and the day over the night.",
      "Say: are those who know equal to those who do not know?"
    ],
    takeaway: "Learning your deen is worship: knowledge lifts you up.",
    q: [
      ["Ayah 2: how should we worship Allah?", "Sincerely, for Him alone", "To show off", "Only when sad", "Now and then"],
      ["Ayah 9: who are not equal, the surah asks?", "Those who know and those who don't", "Rich and poor", "Old and young", "Tall and short"]
    ]
  },
  "10-21": {
    meaning: [
      "My servants who believe, be mindful of your Lord; Allah's earth is wide.",
      "The patient will be given their reward without measure.",
      "Give good news to those who listen to speech and follow the best of it."
    ],
    takeaway: "Patience has no price tag: its reward is beyond counting.",
    q: [
      ["Ayah 10: how are the patient rewarded?", "Without measure", "With a little", "Not at all", "Only once"],
      ["Ayah 18: what do the good listeners follow?", "The best of what they hear", "Every rumour", "The loudest voice", "Nothing"]
    ]
  },
  "22-31": {
    meaning: [
      "Allah sent down the best speech, a Book whose parts are alike and repeated.",
      "The skins of those who fear their Lord shiver at it, then their skins and hearts soften to His remembrance.",
      "You will die, and they will die; then on the Day you will settle your disputes before your Lord."
    ],
    takeaway: "Let the Quran reach your heart: it should move you, not just your lips.",
    q: [
      ["Ayah 23: what did Allah send down?", "The best speech", "A poem", "A riddle", "A story"],
      ["Ayah 23: what softens at Allah's remembrance?", "Their skins and hearts", "Rocks", "Iron", "Their clothes"]
    ]
  },
  "32-41": {
    meaning: [
      "Who does more wrong than one who lies about Allah and denies the truth when it comes?",
      "The one who brought the truth and those who believed it are the mindful.",
      "Is Allah not enough for His servant? Yet they scare you with others besides Him."
    ],
    takeaway: "With Him on your side, fear no one else.",
    q: [
      ["Ayah 36: who is enough for His servant?", "Allah is enough", "Money is enough", "Friends are enough", "Kings are enough"],
      ["Ayah 33: whom does Allah call the mindful?", "Those who brought and believed the truth", "The rich", "The poets", "The proud"]
    ]
  },
  "42-52": {
    meaning: [
      "Allah takes souls at the time of their death, and those that do not die, in their sleep.",
      "He keeps those He has decreed death for, and sends the others back for a set time.",
      "Allah widens provision for whom He wills and narrows it; in that are signs for believers."
    ],
    story: "At bedtime the Prophet ﷺ said: in Your name, O Allah, I die and I live. On waking: praise be to Allah who gave us life after death.",
    hadith: { collection: "bukhari", number: 6312, narrator: "Hudhayfah", text: "When the Prophet ﷺ went to bed he said: in Your name, O Allah, I die and I live. When he woke he said: praise be to Allah who gave us life after He caused us to die, and to Him is the rising." },
    takeaway: "Sleep is a small death: say the bedtime and waking duas.",
    q: [
      ["Ayah 42: when else does Allah take souls, besides death?", "In their sleep", "While eating", "While walking", "Never"],
      ["What did the Prophet ﷺ say at bedtime?", "In Your name, O Allah, I die and live", "Good night", "See you", "Nothing"]
    ]
  },
  "53-63": {
    meaning: [
      "Say: My servants who have wronged themselves, do not despair of Allah's mercy.",
      "Allah forgives all sins; He is the Forgiving, the Merciful.",
      "Turn back to your Lord and submit to Him before the punishment comes and regret is too late."
    ],
    takeaway: "No sin is too big to be forgiven: turn back to Him today.",
    q: [
      ["Ayah 53: what should we never despair of?", "Allah's mercy", "Our money", "Our friends", "The weather"],
      ["Ayah 53: which sins can Allah forgive?", "All sins", "Only small ones", "None", "Only one"]
    ]
  },
  "64-70": {
    meaning: [
      "They did not value Allah as He deserves; the whole earth will be in His grip on the Day.",
      "The Horn will be blown; then blown again, and they will stand up, looking on.",
      "The earth will shine with the light of its Lord, and every soul will be paid in full."
    ],
    takeaway: "On that Day nothing is missed: every deed counts.",
    q: [
      ["Ayah 69: with whose light will the earth shine?", "The light of its Lord", "The sun's", "Fire's", "The moon's"],
      ["Ayah 70: how will every soul be paid?", "In full", "Half", "Not at all", "Later"]
    ]
  },
  "71-75": {
    meaning: [
      "The deniers will be driven to Hell in groups.",
      "Those mindful of their Lord will be led to Paradise in groups; its keepers will say: peace be upon you.",
      "The angels surround the Throne, glorifying their Lord; it is said: praise be to Allah, Lord of the worlds."
    ],
    takeaway: "Pick your group now: walk with the mindful in this life.",
    q: [
      ["Ayah 73: what will Paradise's keepers say?", "Peace be upon you", "Go away", "Wait outside", "Who are you?"],
      ["Ayah 75: what surrounds the Throne glorifying Allah?", "The angels", "The stars", "The birds", "The clouds"]
    ]
  }
};
