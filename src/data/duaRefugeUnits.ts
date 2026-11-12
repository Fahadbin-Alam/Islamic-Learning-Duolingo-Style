import { hadith, type DeepUnit } from "./deepKit";

// One more Du'as unit: seeking refuge with Allah, from Sahih al-Bukhari, Sunan Abi Dawud and Jami at-Tirmidhi. Sins
// washed with snow and hail, hard trials and a bad end, poverty and wrong, a house falling, bad character and
// desires, and why he ﷺ sought refuge from debt. Every card is one sahih hadith with its number, narrator and grade,
// and its exact English words to highlight, and none of them is taught anywhere else in the app.

const REFUGE: DeepUnit = {
  key: "duas-seeking-refuge",
  topicId: "duas",
  branchId: "duas-seeking-refuge",
  branch: { title: "Seeking refuge with Allah", description: "Sins washed with snow and hail, hard trials and a bad end, poverty and wrong, a falling house, bad character, and why he ﷺ feared debt." },
  name: "seeking refuge with Allah",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "washed-with-snow-and-hail",
      title: "Washed with snow and hail",
      line: "Ask Allah to wash your sins away with snow and hail.",
      facts: ["Told by Aishah", "He ﷺ sought refuge from the trial of the grave", "And from the trials of wealth and poverty"],
      source: hadith("bukhari", "6368", "Aishah", "Sahih", "Aishah said: the Prophet ﷺ used to say: O Allah, I seek refuge with You from laziness and old age, from sins and from debt, from the trial of the grave and its punishment, from the trial of the Fire and its punishment, from the evil of the trial of wealth, from the trial of poverty, and from the trial of the False Messiah. O Allah, wash away my sins with the water of snow and hail, and cleanse my heart of sins as a white garment is cleansed of dirt, and put a long distance between me and my sins, as You put East and West far apart.", "Wash away my sins with the water of snow and hail"),
      difficulty: 1,
      questions: [
        { q: "With what did he ﷺ ask Allah to wash away sins?", a: "Water of snow and hail", wrong: ["Rose water", "Water of the sea", "Warm milk"], why: "He ﷺ also asked Allah to clean his heart, as a white garment is cleaned of dirt." },
        { q: "How far from sins did he ﷺ ask Allah to put him?", a: "As far as East is from West", wrong: ["One step away", "Behind a small wall", "Across the street"], why: "Put a long distance between me and my sins, as You put East and West far apart." },
        { q: "He ﷺ sought refuge from the trial of poverty.", tf: true, why: "From the evil of the trial of wealth, and from the trial of poverty, he ﷺ would say." }
      ]
    },
    {
      slug: "hard-trials-and-a-bad-end",
      title: "Hard trials and a bad end",
      line: "Seek refuge from hard trials, a bad end and enemies' glee.",
      facts: ["Told by Abu Hurairah", "From severe trials and a bad end", "From a bad fate and the gloating of enemies"],
      source: hadith("bukhari", "6616", "Abu Hurairah", "Sahih", "Abu Hurairah said: the Prophet ﷺ said: seek refuge with Allah from the hardship of severe trials, from reaching a bad end, from a bad fate, and from the gloating of enemies.", "Take refuge with Allah from the difficulties of severe calamities"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ tell us to do about severe calamities?", a: "Seek refuge with Allah", wrong: ["Run and hide", "Blame other people", "Give up hope"], why: "Take refuge with Allah from hard calamities and from reaching a bad end, he ﷺ said." },
        { q: "Which of these did he ﷺ tell us to seek refuge from?", a: "A bad end", wrong: ["A long life", "A big family", "A kind neighbor"], why: "From having an evil end and a bad fate, and from the gloating of enemies, he ﷺ said." },
        { q: "We may ask Allah to keep us from the gloating of enemies.", tf: true, why: "Seek refuge with Allah from the malicious joy of your enemies, he ﷺ said." }
      ]
    },
    {
      slug: "poverty-and-wrong",
      title: "Poverty and wrong",
      line: "Seek refuge from poverty, and from doing or suffering wrong.",
      facts: ["Told by Abu Hurairah", "From poverty, want and lowliness", "And from wronging others, or being wronged"],
      source: hadith("abudawud", "1544", "Abu Hurairah", "Sahih (Al-Albani)", "Abu Hurairah said: the Prophet ﷺ used to say: O Allah, I seek refuge in You from poverty, from want and from lowliness, and I seek refuge in You from doing wrong or being wronged.", "refuge in Thee lest I cause or suffer wrong"),
      difficulty: 2,
      questions: [
        { q: "What three things did he ﷺ seek refuge from first?", a: "Poverty, want and lowliness", wrong: ["Rain, wind and cold", "Work, study and play", "Guests, gifts and food"], why: "He ﷺ used to say: O Allah, I seek refuge in You from poverty, lack and abasement." },
        { q: "What else did he ﷺ ask Allah to keep him from?", a: "Doing wrong or being wronged", wrong: ["Eating too little", "Walking too far", "Speaking too softly"], why: "I seek refuge in Thee lest I cause or suffer wrong, he ﷺ would say." },
        { q: "He ﷺ sought refuge from wronging others, and from being wronged.", tf: true, why: "Both: lest I cause wrong to others, or suffer wrong from them." }
      ]
    },
    {
      slug: "a-house-falling",
      title: "A house falling",
      line: "He ﷺ sought refuge from a house falling, drowning and fire.",
      facts: ["Told by Abu al-Yasar", "From the weakness of very old age", "And from the devil at the time of death"],
      source: hadith("abudawud", "1552", "Abu al-Yasar", "Sahih (Al-Albani)", "Abu al-Yasar said: the Messenger of Allah ﷺ used to make du'a: O Allah, I seek refuge in You from a house falling on me, from falling from a high place, and from drowning, burning and the weakness of very old age. I seek refuge in You from the devil harming me at the time of death, from dying while running away in Your path, and from dying of the sting of a poisonous creature.", "I seek refuge in Thee from my house falling on me"),
      difficulty: 1,
      questions: [
        { q: "Which danger at home did he ﷺ seek refuge from?", a: "The house falling on him", wrong: ["A noisy neighbor", "A dusty floor", "A broken cup"], why: "I seek refuge in Thee from my house falling on me, he ﷺ would say." },
        { q: "Which of these is also in his ﷺ du'a?", a: "Drowning and burning", wrong: ["Laughing and smiling", "Running and jumping", "Eating and drinking"], why: "From falling into an abyss, and from drowning, burning and decrepitude, he ﷺ said." },
        { q: "He ﷺ sought refuge from the devil harming him at death.", tf: true, why: "I seek refuge in You from the devil harming me at the time of my death, he ﷺ said." }
      ]
    },
    {
      slug: "bad-character-and-desires",
      title: "Bad character and desires",
      line: "Seek refuge from bad manners, bad deeds and bad desires.",
      facts: ["Told by Qutbah ibn Malik", "His nephew Ziyad ibn Ilaqah passed it on", "Allahumma inni a'udhu bika min munkaratil-akhlaq"],
      source: hadith("tirmidhi", "3591", "Qutbah ibn Malik", "Sahih (Al-Albani)", "Ziyad ibn Ilaqah said that his uncle, Qutbah ibn Malik, said: the Prophet ﷺ used to say: O Allah, I seek refuge in You from bad character, bad deeds and bad desires.", "I seek refuge in You from evil character, evil actions, and evil desires"),
      difficulty: 2,
      questions: [
        { q: "Which three bad things did he ﷺ seek refuge from?", a: "Character, actions and desires", wrong: ["Rain, wind and storms", "Hunger, thirst and heat", "Noise, dust and smoke"], why: "Allahumma inni a'udhu bika min munkaratil-akhlaqi wal-a'mali wal-ahwa, he ﷺ said." },
        { q: "Who passed on the du'a from his uncle?", a: "Ziyad ibn Ilaqah", wrong: ["Anas ibn Malik", "Abu Hurairah", "Ibn Abbas"], why: "Ziyad heard it from his uncle, Qutbah ibn Malik, who heard the Prophet ﷺ." },
        { q: "He ﷺ asked Allah to protect him from bad character.", tf: true, why: "He used to say: O Allah, I seek refuge in You from evil character and evil deeds." }
      ]
    },
    {
      slug: "why-he-feared-debt",
      title: "Why he ﷺ feared debt",
      line: "Debt can lead a person to lie and to break promises.",
      facts: ["Told by Aishah", "He ﷺ said it in his prayer", "A man asked why he said it so often"],
      source: hadith("bukhari", "2397", "Aishah", "Sahih", "Aishah said: the Messenger of Allah ﷺ used to say in his prayer: O Allah, I seek refuge with You from sins and from debt. Someone said: O Messenger of Allah, how often you seek refuge from debt! He said: when a person is in debt, he tells lies when he speaks, and breaks his promise when he promises.", "If a person is in debt, he tells lies when he speaks, and breaks his promises when he promises"),
      difficulty: 2,
      questions: [
        { q: "When did he ﷺ seek refuge from sins and debt?", a: "In his prayer", wrong: ["At the market", "On a journey", "At a feast"], why: "He ﷺ used to call on Allah in the prayer: I seek refuge with You from sins and debt." },
        { q: "What can debt lead a person to do, he ﷺ said?", a: "Lie and break promises", wrong: ["Sleep and rest more", "Eat and drink more", "Walk and travel more"], why: "If a person is in debt, he tells lies when he speaks, and breaks his promises." },
        { q: "He ﷺ often sought refuge with Allah from debt.", tf: true, why: "A man noticed how very often he ﷺ sought refuge with Allah from being in debt." }
      ]
    }
  ]
};

export const DUA_REFUGE_UNITS: DeepUnit[] = [REFUGE];
