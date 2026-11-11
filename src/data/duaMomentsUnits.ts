import { hadith, type DeepUnit } from "./deepKit";

// One more Du'as unit: a du'a for each moment, from Sunan Abi Dawud and Jami at-Tirmidhi. Putting on new clothes,
// waking in the night, dogs barking in the dark, dawn on a journey, praising Allah before you ask, and the words a
// father told his son to keep. Every card is one sahih or hasan hadith with its number, narrator and grade, and its
// exact English words to highlight, and none of them is taught anywhere else in the app.

const MOMENTS: DeepUnit = {
  key: "duas-each-moment",
  topicId: "duas",
  branchId: "duas-each-moment",
  branch: { title: "A du'a for each moment", description: "New clothes, waking in the night, dogs barking, dawn on a journey, praise before you ask, and the words a father told his son to keep." },
  name: "du'as for each moment",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "putting-on-new-clothes",
      title: "Putting on new clothes",
      line: "Praise Allah for new clothes, and ask Him for their good.",
      facts: ["Told by Abu Sa'id al-Khudri", "He ﷺ named it: a turban or a shirt"],
      source: hadith("abudawud", "4020", "Abu Sa'id al-Khudri", "Sahih (Al-Albani)", "Abu Sa'id said: when the Messenger of Allah ﷺ put on a new garment, he named it, a turban or a shirt, and said: O Allah, praise is Yours, as You have clothed me with it. I ask You for its good and the good it was made for, and I seek refuge in You from its evil and the evil it was made for.", "I ask Thee for its good and the good of that for which it was made"),
      difficulty: 1,
      questions: [
        { q: "How did he ﷺ begin the du'a for new clothes?", a: "O Allah, praise is Yours", wrong: ["O Allah, forgive me", "O Allah, make it last", "Peace be on you"], why: "O Allah, praise is Yours, as You have clothed me with it, he ﷺ said." },
        { q: "What did he ﷺ ask Allah for, about the new garment?", a: "Its good, and the good it was made for", wrong: ["More clothes like it", "That it never tears", "That people praise it"], why: "I ask Thee for its good and the good of that for which it was made." },
        { q: "He ﷺ also sought refuge from the garment's evil.", tf: true, why: "I seek refuge in Thee from its evil and the evil of that for which it was made." }
      ]
    },
    {
      slug: "waking-in-the-night",
      title: "Waking in the night",
      line: "Waking at night, he ﷺ said Allahu akbar ten times, and more.",
      facts: ["Told by Aishah", "Ten times each, then he ﷺ began to pray"],
      source: hadith("abudawud", "5085", "Aishah", "Hasan Sahih (Al-Albani)", "Aishah was asked how the Messenger of Allah ﷺ began when he woke at night. She said: you have asked me about something no one asked me before. When he woke at night, he said Allahu akbar ten times, Alhamdulillah ten times, Subhanallahi wa bihamdihi ten times, Subhanal-Malikil-Quddus ten times, asked Allah's forgiveness ten times, and said La ilaha illallah ten times. Then he said ten times: O Allah, I seek refuge in You from the hardship of the Day of Resurrection. Then he began to pray.", "You asked me about a thing which no one asked me before. When he woke up at night, he uttered"),
      difficulty: 2,
      questions: [
        { q: "How many times did he ﷺ say each phrase on waking?", a: "Ten times each", wrong: ["Once each", "Three times each", "A hundred times each"], why: "Allah is Most Great ten times, and Praise be to Allah ten times, Aishah said." },
        { q: "From what did he ﷺ seek refuge, ten times, before praying?", a: "The hardship of the Last Day", wrong: ["The cold of the night", "Hunger and thirst", "Scary dreams"], why: "He ﷺ sought refuge in Allah from the hardship of the Day of Resurrection." },
        { q: "Aishah said many people had asked her the same before.", tf: false, why: "No. You asked me about a thing which no one asked me before, Aishah said." }
      ]
    },
    {
      slug: "when-dogs-bark",
      title: "When dogs bark at night",
      line: "Hearing dogs bark at night, seek refuge in Allah.",
      facts: ["Told by Jabir ibn Abdullah", "They see what you do not see"],
      source: hadith("abudawud", "5103", "Jabir ibn Abdullah", "Sahih (Al-Albani)", "The Prophet ﷺ said: when you hear dogs barking and donkeys braying at night, seek refuge in Allah, for they see what you do not see.", "When you hear the barking of dogs and the braying of asses at night, seek refuge in Allah"),
      difficulty: 1,
      questions: [
        { q: "What should you do when dogs bark at night?", a: "Seek refuge in Allah", wrong: ["Shout back at them", "Throw stones at them", "Run out of the house"], why: "When you hear the barking of dogs at night, seek refuge in Allah, he ﷺ said." },
        { q: "Why should you seek refuge then, he ﷺ said?", a: "They see what you do not see", wrong: ["They want some food", "They feel the cold air", "They want to play"], why: "Dogs and donkeys see what you do not see, he ﷺ said." },
        { q: "Seek refuge in Allah when donkeys bray at night, too.", tf: true, why: "When you hear the braying of asses at night, seek refuge in Allah." }
      ]
    },
    {
      slug: "dawn-on-a-journey",
      title: "At dawn on a journey",
      line: "At dawn on a journey, he ﷺ asked Allah to be with them.",
      facts: ["Told by Abu Hurairah", "He ﷺ began with praise of Allah"],
      source: hadith("abudawud", "5086", "Abu Hurairah", "Sahih (Al-Albani)", "Abu Hurairah said: when the Messenger of Allah ﷺ was on a journey, he would say at dawn: let a hearer hear us praising Allah for His favours and His blessings on us. Our Lord, be with us and be generous to us. I seek refuge in Allah from the Fire.", "Our Lord, accompany us and show favour to us, and I seek refuge in Allah from Hell"),
      difficulty: 2,
      questions: [
        { q: "At what time did he ﷺ say the journey du'a?", a: "At dawn", wrong: ["At noon", "At sunset", "At midnight"], why: "When the Messenger of Allah ﷺ was on a journey, he would say at daybreak." },
        { q: "What did he ﷺ ask the Lord to do for them?", a: "Be with them and favour them", wrong: ["Make the road short", "Send them rain", "Give them gold"], why: "Our Lord, accompany us and show favour to us, he ﷺ said." },
        { q: "He ﷺ ended the journey du'a by seeking refuge from the Fire.", tf: true, why: "And I seek refuge in Allah from Hell, he ﷺ would say." }
      ]
    },
    {
      slug: "praise-first-then-ask",
      title: "Praise first, then ask",
      line: "Praise Allah first, send blessings on the Prophet ﷺ, then ask.",
      facts: ["Told by Fadalah ibn Ubayd", "He ﷺ said of one man: he made haste"],
      source: hadith("abudawud", "1481", "Fadalah ibn Ubayd", "Sahih (Al-Albani)", "Fadalah ibn Ubayd said: the Messenger of Allah ﷺ heard a man making du'a in his prayer who did not praise Allah or send blessings on the Prophet ﷺ. He said: he made haste. Then he called him and said: when one of you prays, let him begin by praising his Lord, then send blessings on the Prophet ﷺ, then ask Allah for whatever he wishes.", "he should mention the exaltation of his Lord in the beginning and praise Him"),
      difficulty: 2,
      questions: [
        { q: "What should come first when you make du'a, he ﷺ said?", a: "Praising Allah", wrong: ["Asking for money", "Raising your voice", "Naming your needs"], why: "He should begin by praising his Lord, he ﷺ said." },
        { q: "What comes after praise, before you ask for what you wish?", a: "Blessings on the Prophet ﷺ", wrong: ["Counting to ten", "Standing up straight", "A long silence"], why: "Then let him send blessings on the Prophet ﷺ, then ask what he wishes." },
        { q: "He ﷺ praised the man who rushed into his du'a.", tf: false, why: "No. He made haste, he ﷺ said of the man, and then he taught him." }
      ]
    },
    {
      slug: "stick-to-these-words",
      title: "Stick to these words",
      line: "Abu Bakrah told his son: keep saying what the Prophet ﷺ said.",
      facts: ["Told by Abu Bakrah's son", "From sadness, laziness and the grave"],
      source: hadith("tirmidhi", "3503", "Abu Bakrah, through his son Muslim", "Sahih isnad (Al-Albani)", "Muslim ibn Abi Bakrah said: my father heard me saying: O Allah, I seek refuge in You from sadness, laziness and the punishment of the grave. He said: my son, from whom did you hear that? I said: I heard you saying them. He said: keep to them, for I heard the Messenger of Allah ﷺ saying them.", "O Allah, I seek refuge in You from sadness and laziness and the punishment of the grave"),
      difficulty: 2,
      questions: [
        { q: "Whom did Abu Bakrah's son learn the du'a from?", a: "His father", wrong: ["His teacher", "A traveller", "His uncle"], why: "I heard you saying them, the son told his father." },
        { q: "From what three things does the du'a seek refuge?", a: "Sadness, laziness, the grave", wrong: ["Rain, wind, the cold", "Hunger, thirst, the heat", "Noise, dust, the dark"], why: "I seek refuge in You from sadness and laziness and the punishment of the grave." },
        { q: "Abu Bakrah told his son to stop saying the du'a.", tf: false, why: "No. Stick to them, Abu Bakrah told his son, for the Prophet ﷺ said them." }
      ]
    }
  ]
};

export const DUA_MOMENTS_UNITS: DeepUnit[] = [MOMENTS];
