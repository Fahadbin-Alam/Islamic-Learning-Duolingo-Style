import { hadith, type DeepUnit } from "./deepKit";

// One more Du'as unit: du'as he ﷺ made and taught, from Sunan Abi Dawud, Sunan Ibn Majah, Sunan an-Nasa'i, Sahih
// Muslim and Jami at-Tirmidhi. The evil of what was done and not done, words for hard times, the Lord of Jibril,
// Mikail and Israfil, a du'a for religion, world and Hereafter, refuge from a bad neighbor, and counting tasbih on
// the hand. Every card is one sahih or hasan hadith with its number, narrator and grade, and its exact English
// words to highlight. None of these hadith is taught anywhere else in the app.

const MADE_TAUGHT: DeepUnit = {
  key: "duas-made-and-taught",
  topicId: "duas",
  branchId: "duas-he-made-and-taught",
  branch: { title: "Du'as he ﷺ made and taught", description: "Refuge from what was done and not done, words for hard times, the Lord of Jibril, a du'a for this life and the next, a bad neighbor, and counting tasbih." },
  name: "the du'as he ﷺ made and taught",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "done-and-not-done",
      title: "Done and not done",
      line: "He ﷺ sought refuge from the evil of what he had done.",
      facts: ["Told by Aishah", "Farwah ibn Nawfal asked her about his ﷺ du'a", "And from the evil of what he had not done"],
      source: hadith("abudawud", "1550", "Aishah", "Sahih (Al-Albani)", "Farwah ibn Nawfal asked Aishah, the Mother of the Believers, about the du'a of the Messenger of Allah ﷺ. She said: he would say: O Allah, I seek refuge in You from the evil of what I have done, and from the evil of what I have not done.", "I seek refuge in You from the evil of what I have done, and from the evil of what I have not done"),
      difficulty: 1,
      questions: [
        { q: "Which two evils did he ﷺ seek refuge from, Aishah said?", a: "What he had done and not done", wrong: ["What he had bought and sold", "What he had built and planted", "What he had eaten and drunk"], why: "From the evil of what I have done, and of what I have not done, he ﷺ would say." },
        { q: "Whom did Farwah ibn Nawfal ask about his ﷺ du'a?", a: "Aishah", wrong: ["Hafsah", "Umm Salamah", "Maymunah"], why: "Farwah ibn Nawfal asked Aishah, the Mother of the Believers, about his ﷺ du'a." },
        { q: "He ﷺ sought refuge even from the evil of what he had not done.", tf: true, why: "And from the evil of what I have not done, he ﷺ would say, Aishah told Farwah." }
      ]
    },
    {
      slug: "words-for-hard-times",
      title: "Words for hard times",
      line: "In hard times say: Allah, Allah is my Lord.",
      facts: ["Told by Asma bint Umays", "Allahu Rabbi, la ushriku bihi shay'a", "I do not associate anything with Him"],
      source: hadith("ibnmajah", "3882", "Asma bint Umays", "Sahih (Al-Albani)", "Asma bint Umays said: the Messenger of Allah ﷺ taught me some words to say at times of distress: Allah, Allah is my Lord, I do not associate anything with Him.", "Allah, Allah is my Lord, I do not associate anything with Him"),
      difficulty: 1,
      questions: [
        { q: "When did he ﷺ teach Asma to say these words?", a: "At times of distress", wrong: ["At the start of a meal", "On the night of Eid", "When buying new clothes"], why: "He ﷺ taught me some words to say at times of distress, Asma bint Umays said." },
        { q: "What does la ushriku bihi shay'a mean?", a: "I associate nothing with Him", wrong: ["I forget nothing about Him", "I hide nothing from Him", "I ask Him for nothing"], why: "Allah, Allah is my Lord, I do not associate anything with Him." },
        { q: "He ﷺ taught Asma bint Umays words for hard times.", tf: true, why: "He taught me some words to say at times of distress, Asma bint Umays said." }
      ]
    },
    {
      slug: "lord-of-jibril",
      title: "Lord of Jibril and Mikail",
      line: "He ﷺ called on Allah, Lord of Jibril, Mikail and Israfil.",
      facts: ["Told by Aishah", "Jibril, Mikail and Israfil are angels", "Refuge from the heat of the Fire and the grave"],
      source: hadith("nasai", "5519", "Aishah", "Hasan (Al-Albani)", "Aishah said: the Messenger of Allah ﷺ would say: O Allah, Lord of Jibra'il and Mika'il and Lord of Israfil, I seek refuge in You from the heat of the Fire and from the torment of the grave.", "I seek refuge in You from the heat of the Fire"),
      difficulty: 1,
      questions: [
        { q: "Who are Jibril, Mikail and Israfil?", a: "Angels", wrong: ["Prophets", "Companions", "Jinn"], why: "O Allah, Lord of Jibra'il and Mika'il and Lord of Israfil, he ﷺ would say." },
        { q: "From the heat of what did he ﷺ seek refuge?", a: "The Fire of Jahannam", wrong: ["The summer sun", "The desert sand", "The cooking pot"], why: "I seek refuge in You from the heat of the Fire and the torment of the grave, he ﷺ said." },
        { q: "He ﷺ sought refuge from the torment of the grave.", tf: true, why: "From the heat of the Fire and from the torment of the grave, he ﷺ sought refuge." }
      ]
    },
    {
      slug: "set-right-my-religion",
      title: "Set right my religion",
      line: "Ask Allah to set right your religion, world and Hereafter.",
      facts: ["Told by Abu Hurairah", "Religion keeps all our affairs safe", "A good life, and a death that brings rest"],
      source: hadith("muslim", "2720", "Abu Hurairah", "Sahih", "Abu Hurairah said: the Messenger of Allah ﷺ used to say: O Allah, set right for me my religion, which is the safeguard of my affairs; set right for me my world, in which is my living; set right for me my Hereafter, to which I return; make life an increase for me in every good, and make death a rest for me from every evil.", "O Allah, set right for me my religion which is the safeguard of my affairs"),
      difficulty: 2,
      questions: [
        { q: "Which three things did he ﷺ ask Allah to set right?", a: "Religion, world and Hereafter", wrong: ["House, horse and garden", "Friends, food and sleep", "Clothes, shoes and tent"], why: "Set right for me my religion, my world and my Hereafter, he ﷺ would say." },
        { q: "In his ﷺ du'a, what is in this world for us?", a: "Our living", wrong: ["Our final home", "Our only goal", "Our full reward"], why: "Set right for me my world, in which is my living, he ﷺ would say." },
        { q: "He ﷺ asked Allah to make death a rest from every evil.", tf: true, why: "Make death a rest for me from every evil, he ﷺ would say, Abu Hurairah said." }
      ]
    },
    {
      slug: "a-bad-neighbor",
      title: "A bad neighbor",
      line: "Seek refuge with Allah from a bad neighbor at home.",
      facts: ["Told by Abu Hurairah", "A neighbor where you live for good", "A neighbor on a journey soon moves on"],
      source: hadith("nasai", "5502", "Abu Hurairah", "Hasan Sahih (Al-Albani)", "Abu Hurairah said: the Messenger of Allah ﷺ said: seek refuge with Allah from a bad neighbor where you live for good, for a neighbor in the desert will move on.", "Seek refuge with Allah from a bad neighbor in"),
      difficulty: 1,
      questions: [
        { q: "From which neighbor did he ﷺ tell us to seek refuge?", a: "A bad neighbor at home", wrong: ["A neighbor on a journey", "A neighbor who visits", "A neighbor far away"], why: "Seek refuge with Allah from a bad neighbor where you live for good, he ﷺ said." },
        { q: "Why is a bad neighbor on a journey less of a worry?", a: "He will soon move on", wrong: ["He is always kind", "He never says a word", "He has no house"], why: "For a neighbor in the desert will change, he ﷺ said." },
        { q: "We should seek refuge with Allah from a bad neighbor.", tf: true, why: "Seek refuge with Allah from a bad neighbor where you live, he ﷺ said." }
      ]
    },
    {
      slug: "counting-tasbih",
      title: "Counting on his hand",
      line: "He ﷺ counted his tasbih on his hand.",
      facts: ["Told by Abdullah ibn Amr", "Tasbih is saying Subhan Allah", "We can count our dhikr on our hand too"],
      source: hadith("tirmidhi", "3486", "Abdullah ibn Amr", "Sahih (Al-Albani)", "Abdullah ibn Amr said: I saw the Prophet ﷺ counting the tasbih on his hand.", "I saw the Prophet counting the Tasbih on his hand"),
      difficulty: 1,
      questions: [
        { q: "What did Abdullah ibn Amr see him ﷺ count on his hand?", a: "The tasbih", wrong: ["The stars in the sky", "The grains of sand", "The leaves of a tree"], why: "I saw the Prophet ﷺ counting the tasbih on his hand, Abdullah ibn Amr said." },
        { q: "What is tasbih?", a: "Saying Subhan Allah", wrong: ["Saying Bismillah", "Saying Amin", "Saying Insha Allah"], why: "Tasbih means glorifying Allah, saying Subhan Allah." },
        { q: "Abdullah ibn Amr saw him ﷺ counting the tasbih on his hand.", tf: true, why: "I saw the Prophet ﷺ counting the tasbih on his hand, Abdullah ibn Amr said." }
      ]
    }
  ]
};

export const DUA_MADE_TAUGHT_UNITS: readonly DeepUnit[] = [MADE_TAUGHT];
