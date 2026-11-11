import { hadith, type DeepUnit } from "./deepKit";

// One more unit for the Day of Judgment: deeds that bring light, and a place near the Prophet ﷺ, on that Day, and
// the darkness of doing wrong. Every card is one sahih hadith (number and grade as sunnah.com gives them), with
// its exact English words to highlight, and none of them is taught anywhere else in the app.

const LIGHT: DeepUnit = {
  key: "akhirah-light",
  topicId: "akhirah",
  branchId: "akhirah-light-on-that-day",
  branch: { title: "Light on that Day", description: "Deeds that bring light and a seat near him ﷺ on the Day of Judgment, and the darkness of doing wrong." },
  name: "light on that Day",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "walk-in-the-dark",
      title: "Walking to the masjid in the dark",
      line: "Walking to the masjid in the dark brings light on that Day.",
      facts: ["Told by Buraydah ibn al-Hasib", "Good news of a perfect light"],
      source: hadith("abudawud", "561", "Buraydah ibn al-Hasib", "Sahih (Al-Albani)", "The Prophet ﷺ said: give good news to those who walk to the masjids in the dark of a perfect light on the Day of Judgment.", "Give good tidings to those who walk to the mosques in darkness for having a perfect light on the Day of Judgment"),
      difficulty: 1,
      questions: [
        { q: "Who gets a perfect light on the Day of Judgment, in Abu Dawud 561?", a: "Those who walk to the masjid in the dark", wrong: ["Those who sleep early", "Those who stay at home", "Those with the brightest lamps"], why: "Give good tidings to those who walk to the mosques in darkness." },
        { q: "What kind of light will they have?", a: "A perfect light", wrong: ["A tiny spark", "A light for one night", "No light at all"], why: "For having a perfect light on the Day of Judgment." },
        { q: "Walking to the masjid on a dark night is wasted effort.", tf: false, why: "They are given good tidings of a perfect light on the Day of Judgment." }
      ]
    },
    {
      slug: "love-for-allah",
      title: "Loving each other for Allah",
      line: "Those who love each other for Allah get podiums of light.",
      facts: ["Told by Mu'adh ibn Jabal", "A hadith qudsi: Allah says it"],
      source: hadith("tirmidhi", "2390", "Mu'adh ibn Jabal", "Sahih (Al-Albani)", "Allah, the Mighty and Majestic, said: those who love each other for the sake of My Majesty will be on podiums of light.", "Those who love each other for the sake of My Majesty shall be upon podiums of light"),
      difficulty: 1,
      questions: [
        { q: "Where will those who love each other for Allah be?", a: "On podiums of light", wrong: ["On thrones of gold", "On clouds of rain", "On carpets of silk"], why: "Those who love each other for the sake of My Majesty shall be upon podiums of light." },
        { q: "Whose words are these, in Tirmidhi 2390?", a: "Allah's, in a hadith qudsi", wrong: ["A poet of Makkah", "A king of Persia", "A trader of Sham"], why: "Allah, the Mighty and Sublime, said: Those who love each other for the sake of My Majesty." },
        { q: "Being friends for Allah's sake is rewarded on the Last Day.", tf: true, why: "They shall be upon podiums of light." }
      ]
    },
    {
      slug: "best-character-nearest",
      title: "Sitting near him ﷺ on that Day",
      line: "Those best in character will sit nearest to him ﷺ on that Day.",
      facts: ["Told by Jabir ibn Abdullah", "Good manners bring you close"],
      source: hadith("tirmidhi", "2018", "Jabir ibn Abdullah", "Sahih (Al-Albani)", "The Prophet ﷺ said: the most beloved of you to me, and the nearest to me in my gathering on the Day of Judgment, are those best of you in character. The most disliked, and the farthest, are those who chatter, boast and are arrogant.", "the nearest to sit with me on the Day of Judgment is the best of you in character"),
      difficulty: 1,
      questions: [
        { q: "Who will sit nearest to him ﷺ on the Day of Judgment?", a: "Those best in character", wrong: ["Those with the most money", "Those who talk the most", "Those with famous names"], why: "The nearest to sit with me on the Day of Judgment is the best of you in character." },
        { q: "Who will sit farthest from him ﷺ?", a: "Those who chatter and boast", wrong: ["Those who smile", "Those who are shy", "Those who listen"], why: "The farthest are the chatterers, the boasters and the arrogant." },
        { q: "Good manners can bring you close to him ﷺ on the Last Day.", tf: true, why: "The most beloved among you to me is the best of you in character." }
      ]
    },
    {
      slug: "darkness-of-wrong",
      title: "Wrongdoing turns to darkness",
      line: "Wronging others will be darkness on the Day of Resurrection.",
      facts: ["Told by Ibn Umar", "Zulm: doing wrong to others"],
      source: hadith("bukhari", "2447", "Ibn Umar", "Sahih", "The Prophet ﷺ said: wronging others will be darkness on the Day of Resurrection.", "Oppression will be a darkness on the Day of Resurrection"),
      difficulty: 1,
      questions: [
        { q: "What will wronging others be on the Day of Resurrection?", a: "Darkness", wrong: ["Light", "Shade", "Gold"], why: "Oppression will be a darkness on the Day of Resurrection." },
        { q: "Which of these is zulm, wronging someone?", a: "Taking a friend's toy without asking", wrong: ["Sharing your lunch", "Saying salam", "Helping a neighbor"], why: "Oppression will be a darkness on the Day of Resurrection." },
        { q: "Being unfair to people is small and has no effect later.", tf: false, why: "Oppression will be a darkness on the Day of Resurrection." }
      ]
    },
    {
      slug: "more-thankful",
      title: "Seeing what you were saved from",
      line: "Everyone in Jannah is shown what they were saved from.",
      facts: ["Told by Abu Hurairah", "So they will be more thankful"],
      source: hadith("bukhari", "6569", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: no one will enter Paradise without being shown the place he would have had in the Fire had he rejected faith, so that he will be more thankful.", "so that he may be more thankful"),
      difficulty: 2,
      questions: [
        { q: "Why is each person of Jannah shown the place they were saved from?", a: "So they will be more thankful", wrong: ["So they will be afraid", "So they can go back", "So they can choose again"], why: "So that he may be more thankful." },
        { q: "Who told us Bukhari 6569?", a: "Abu Hurairah", wrong: ["Anas ibn Malik", "Ibn Abbas", "Jabir ibn Abdullah"], why: "Narrated Abu Huraira." },
        { q: "The people of Jannah will thank Allah for saving them.", tf: true, why: "So that he may be more thankful." }
      ]
    },
    {
      slug: "space-of-a-bow",
      title: "A bow's length of Jannah",
      line: "A bow's length of Jannah is better than the whole world.",
      facts: ["Told by Abu Hurairah", "Better than all the sun shines on"],
      source: hadith("bukhari", "3253", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: a place in Paradise as small as the bow of one of you is better than all that the sun rises and sets on.", "a place in Paradise equal to an arrow bow of one of you, is better than"),
      difficulty: 2,
      questions: [
        { q: "How much of Jannah is better than the whole world?", a: "A space as small as a bow", wrong: ["Only a big palace", "Only a whole garden", "Only a river"], why: "A place in Paradise equal to an arrow bow of one of you, is better than the whole earth." },
        { q: "What is that small place in Jannah better than?", a: "All the sun rises and sets on", wrong: ["One big house", "A bag of coins", "A single city"], why: "Is better than the whole earth on which the sun rises and sets." },
        { q: "Even the smallest place in Jannah beats everything in this world.", tf: true, why: "Better than the whole earth on which the sun rises and sets." }
      ]
    }
  ]
};

export const AKHIRAH_MORE_UNITS: DeepUnit[] = [LIGHT];
