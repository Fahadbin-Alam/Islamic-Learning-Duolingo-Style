import type { PassageDeep } from "./types";

/**
 * Ar-Rum (the Romans) in depth, passage by passage (the same passages as s030.ts). Our own plain summary of
 * Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_030: Record<string, PassageDeep> = {
  "1-10": {
    meaning: [
      "The Romans were beaten in the nearest land, but after their defeat they would win within a few years.",
      "The matter belongs to Allah before and after; that day the believers would rejoice.",
      "It is Allah's promise, and Allah never breaks His promise."
    ],
    story: "When the Persians beat the Romans, the idol-worshippers of Makkah were glad. The Quran said Rome would win within a few years, and it came true.",
    takeaway: "What Allah says will happen does happen: trust His word.",
    q: [
      ["Ayah 4: within how long would the Romans win?", "Within a few years", "In one day", "In a hundred years", "Never"],
      ["Ayah 6: what does Allah never break?", "His promise", "The mountains", "The sea", "The clouds"]
    ]
  },
  "11-19": {
    meaning: [
      "Allah begins creation and then repeats it; then to Him you return.",
      "So glorify Allah when evening comes and when morning comes.",
      "He brings the living out of the dead and revives the earth after it is lifeless."
    ],
    takeaway: "Start and end your day with remembering Allah.",
    q: [
      ["Ayah 17: when should we glorify Allah?", "When evening and morning come", "Only at noon", "Once a year", "Only in Ramadan"],
      ["Ayah 19: what does Allah revive after it is lifeless?", "The earth", "The sun", "The stars", "Idols"]
    ]
  },
  "20-27": {
    meaning: [
      "Among His signs: He created you from dust, and now you are people spreading everywhere.",
      "He made spouses for you to find peace with, and put love and mercy between you.",
      "The variety of your languages and colours is a sign; so is your sleep by night and day."
    ],
    takeaway: "People look and speak differently by Allah's design: respect everyone.",
    q: [
      ["Ayah 21: what did Allah put between spouses?", "Love and mercy", "Anger", "Silence", "A wall"],
      ["Ayah 22: what is a sign of Allah among people?", "Our many languages and colours", "Our money", "Our houses", "Our cars"]
    ]
  },
  "28-40": {
    meaning: [
      "Set your face to the religion, upright: the natural way Allah made people on.",
      "Do not be like those who split their religion into groups, each happy with its own.",
      "Give relatives their right, and the poor and the traveller."
    ],
    story: "The Prophet ﷺ said every child is born on the fitrah, the natural way. Abu Hurairah then recited ayah 30.",
    hadith: { collection: "bukhari", number: 4775, narrator: "Abu Hurairah", text: "Every child is born upon al-fitrah... Then Abu Hurairah recited: the nature of Allah upon which He created people." },
    takeaway: "You were born ready to know Allah: keep that pure nature clean.",
    q: [
      ["Ayah 30: what is the fitrah?", "The natural way Allah made people on", "A city", "A type of food", "A prayer time"],
      ["Ayah 38: to whom should we give their right?", "Relatives, the poor and the traveller", "Only kings", "Only ourselves", "No one"]
    ]
  },
  "41-53": {
    meaning: [
      "Corruption has appeared on land and sea because of what people's hands have earned.",
      "Allah lets them taste some of it, so that they may return to Him.",
      "Allah sends the winds as good news, bringing rain from His mercy."
    ],
    takeaway: "Care for the earth and stop doing wrong: it hurts everyone.",
    q: [
      ["Ayah 41: where has corruption appeared?", "On land and sea", "Only in cities", "Only in the sky", "Nowhere"],
      ["Ayah 46: what do the winds bring as good news?", "Rain from His mercy", "Sand", "Fire", "Cold only"]
    ]
  },
  "54-60": {
    meaning: [
      "Allah created you from weakness, then gave strength after weakness, then weakness and grey hair.",
      "On the Day, the wrongdoers will swear they stayed only an hour.",
      "So be patient: Allah's promise is true."
    ],
    takeaway: "Use your strong years well: old age and weakness come to all.",
    q: [
      ["Ayah 54: what comes after strength, in our life?", "Weakness and grey hair", "More strength", "Wings", "Nothing"],
      ["Ayah 60: what are we told to be, since Allah's promise is true?", "Patient", "Angry", "Worried", "Lazy"]
    ]
  }
};
