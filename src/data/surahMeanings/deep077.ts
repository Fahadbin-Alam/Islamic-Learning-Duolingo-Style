import type { PassageDeep } from "./types";

/**
 * Al-Mursalat (Those Sent Forth) in depth, passage by passage (the same passages as s077.ts). Our own plain
 * summary of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_077: Record<string, PassageDeep> = {
  "1-15": {
    meaning: [
      "By those sent forth one after another, and those that blow strongly: what you are promised will surely come.",
      "When the stars are dimmed, the sky is split open, and the mountains are blown away.",
      "Woe that Day to the deniers: a line that returns again and again through the surah."
    ],
    story: "Umm al-Fadl heard her son Ibn Abbas recite Al-Mursalat and said it was the last surah she heard the Prophet ﷺ recite, in the sunset prayer.",
    hadith: { collection: "bukhari", number: 763, narrator: "Ibn Abbas", text: "Umm al-Fadl heard me reciting Wal-mursalati 'urfa and said: my son, you reminded me that it was the last I heard the Messenger of Allah ﷺ recite in the Maghrib prayer." },
    takeaway: "A warning repeated is a mercy: Allah wants us to wake up before it is late.",
    q: [
      ["Ayah 15: what line comes again and again?", "Woe that Day to the deniers", "By the fig and the olive", "Read in your Lord's name", "Say: He is Allah, One"],
      ["In which prayer was it the last surah Umm al-Fadl heard?", "The sunset prayer", "The dawn prayer", "The Eid prayer", "The noon prayer"]
    ]
  },
  "16-28": {
    meaning: [
      "Did We not destroy the earlier deniers? So We do with the guilty.",
      "Did We not create you from a humble fluid, placed in a safe resting place for a known term?",
      "Did We not make the earth a home for the living and the dead, set tall mountains, and give you sweet water?"
    ],
    takeaway: "Every sip of fresh water is a reason to believe and give thanks.",
    q: [
      ["Ayah 27: what kind of water did Allah give us?", "Sweet water", "Salty water", "Muddy water", "Only rain"],
      ["Ayah 20: what were we created from?", "A humble fluid", "Pure light", "Hot fire", "Hard stone"]
    ]
  },
  "29-40": {
    meaning: [
      "Go to what you used to deny: a shadow of smoke in three columns.",
      "It gives no shade and is no help against the flame.",
      "This is a Day they will not speak, nor be allowed to make excuses."
    ],
    takeaway: "No pleading will work on that Day: make amends today.",
    q: [
      ["Ayah 31: what does the shadow of smoke not give?", "Any shade", "Any sound", "Any colour", "Any smell"],
      ["Ayah 36: what will they not be allowed to make?", "Excuses", "Friends", "Houses", "Journeys"]
    ]
  },
  "41-50": {
    meaning: [
      "The mindful will be among shades and springs, and any fruit they desire.",
      "Eat and drink happily for what you used to do; so do We reward those who do good.",
      "When they are told to bow down, they do not bow. In what speech after this will they believe?"
    ],
    takeaway: "When you hear the call to prayer, bow: that is how the mindful live.",
    q: [
      ["Ayah 41: where will the mindful be?", "Among shades and springs", "In a dry desert", "In dark caves", "On cold peaks"],
      ["Ayah 48: what do the deniers not do when told?", "Bow down", "Sit down", "Walk away", "Speak up"]
    ]
  }
};
