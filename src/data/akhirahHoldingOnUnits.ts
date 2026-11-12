import { hadith, type DeepUnit } from "./deepKit";

// One more Akhirah unit: holding on in times of trial, from Jami at-Tirmidhi, Sunan Ibn Majah, Sunan Abi Dawud and
// Sahih al-Bukhari. Good deeds before trials like a dark night, worship in a time of bloodshed, keeping clear of strife,
// a man who wishes he were in a grave, keeping far from the Dajjal, and an Ummah like the rain. Every card is one sahih
// or hasan hadith with its number, narrator and grade, and its exact English words to highlight. None of these hadith
// is taught anywhere else in the app.

const HOLDING_ON: DeepUnit = {
  key: "akhirah-holding-on-in-trials",
  topicId: "akhirah",
  branchId: "akhirah-holding-on-in-trials",
  branch: { title: "Holding on in times of trial", description: "Good deeds before the dark trials, worship in a time of bloodshed, keeping clear of strife, wishing for a grave, keeping far from the Dajjal, and an Ummah like the rain." },
  name: "holding on in times of trial",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "rush-to-good-deeds",
      title: "Rush to good deeds",
      line: "Rush to good deeds: trials will come like the dark night.",
      facts: ["Told by Abu Hurairah", "Fitnah: a trial that tests faith", "Some will sell their religion for the world"],
      source: hadith("tirmidhi", "2195", "Abu Hurairah", "Sahih (Darussalam)", "Abu Hurairah said: the Messenger of Allah ﷺ said: rush to do good deeds, for a trial will come like a portion of the dark night. A man will be a believer in the morning and a disbeliever by evening, or a believer in the evening and a disbeliever by morning; one of them will sell his religion for goods of the world.", "morning will come upon a man as a believer, who will be a disbeliever in the evening"),
      difficulty: 3,
      questions: [
        { q: "What did he ﷺ tell us to rush to, before the trials?", a: "Good deeds", wrong: ["Big markets", "Faraway lands", "Tall buildings"], why: "Rush to do good deeds, he ﷺ said, before a Fitnah like a portion of the dark night." },
        { q: "How quickly will some people change in that trial?", a: "From morning to evening", wrong: ["From one year to the next", "From youth to old age", "From one Ramadan to the next"], why: "A man will be a believer in the morning and a disbeliever by evening, he ﷺ warned." },
        { q: "Some people will sell their religion for goods of the world.", tf: true, why: "In that dark trial, one will sell his religion for worldly things, he ﷺ warned." }
      ]
    },
    {
      slug: "worship-in-a-time-of-bloodshed",
      title: "Worship in a time of bloodshed",
      line: "Worship when there is bloodshed is like emigrating to him ﷺ.",
      facts: ["Told by Ma'qil ibn Yasar", "Bloodshed: a time of killing and strife", "Emigrating to him ﷺ: the Hijrah"],
      source: hadith("ibnmajah", "3985", "Ma'qil ibn Yasar", "Sahih (Al-Albani)", "Ma'qil ibn Yasar said: the Messenger of Allah ﷺ said: worship during the time of bloodshed is like emigrating to me.", "Worship during the time of bloodshed is like emigrating to me"),
      difficulty: 3,
      questions: [
        { q: "In which kind of time did he ﷺ praise worship?", a: "A time of bloodshed", wrong: ["A time of plenty", "A time of feasting", "A time of rain"], why: "Worship during the time of bloodshed is like emigrating to me, Ma'qil heard him ﷺ say." },
        { q: "What is such worship like, he ﷺ said?", a: "Emigrating to him ﷺ", wrong: ["Fasting a whole year", "Freeing ten slaves", "Building a masjid"], why: "Like emigrating to me, he ﷺ said of worship when there is bloodshed." },
        { q: "When people turn to killing, worship loses its worth.", tf: false, why: "No. Worship in a time of bloodshed is like emigrating to him ﷺ." }
      ]
    },
    {
      slug: "keep-clear-of-strife",
      title: "Keep clear of strife",
      line: "Happy is he who avoids strife; fine is he who endures it.",
      facts: ["Told by Al-Miqdad ibn al-Aswad", "He ﷺ said it three times", "Strife: dissension among people"],
      source: hadith("abudawud", "4263", "Al-Miqdad ibn al-Aswad", "Sahih (Al-Albani)", "Al-Miqdad ibn al-Aswad swore by Allah that he heard the Messenger of Allah ﷺ say three times: the happy man is he who avoids dissensions; but how fine is the man who is afflicted and shows endurance.", "but how fine is the man who is afflicted and shows endurance"),
      difficulty: 3,
      questions: [
        { q: "Who is the happy man, he ﷺ said?", a: "One who avoids dissensions", wrong: ["One who wins every argument", "One who has many friends", "One who owns much land"], why: "The happy man is he who avoids dissensions, Al-Miqdad swore by Allah he heard him ﷺ say." },
        { q: "Who did he ﷺ call fine, if trials do come?", a: "One who shows endurance", wrong: ["One who blames others", "One who complains loudly", "One who gives up hope"], why: "But how fine is the man who is afflicted and shows endurance, he ﷺ said." },
        { q: "He ﷺ said the words about avoiding strife three times.", tf: true, why: "Happy is the man who avoids dissensions, he ﷺ said, three times over." }
      ]
    },
    {
      slug: "would-that-i-were-in-his-place",
      title: "Would that I were in his place",
      line: "Before the Hour, a man will wish he were in a grave.",
      facts: ["Told by Abu Hurairah", "He passes by someone's grave", "He wishes he were in that place"],
      source: hadith("bukhari", "7115", "Abu Hurairah", "Sahih", "Abu Hurairah said: the Prophet ﷺ said: the Hour will not be established till a man passes by the grave of somebody and says: would that I were in his place.", "till a man passes by a grave of somebody and says"),
      difficulty: 3,
      questions: [
        { q: "What will a man pass by, before the Hour comes?", a: "A grave", wrong: ["A market", "A river", "A mountain"], why: "The Hour will not be established till a man passes by a grave of somebody, he ﷺ said." },
        { q: "What will the man say at the grave?", a: "Would that I were in his place", wrong: ["Would that I were rich", "Would that I were young", "Would that I were a king"], why: "Passing by somebody's grave, he will say: would that I were in his place." },
        { q: "A man wishing he were in a grave is a sign before the Hour.", tf: true, why: "Till a man passes by a grave and wishes to be in it, the Hour will not come, he ﷺ said." }
      ]
    },
    {
      slug: "keep-far-from-the-dajjal",
      title: "Keep far from the Dajjal",
      line: "Whoever hears of the Dajjal should keep far away from him.",
      facts: ["Told by Imran ibn Husayn", "A man will go to him, sure of his faith", "Then follow him, confused by his doubts"],
      source: hadith("abudawud", "4319", "Imran ibn Husayn", "Sahih (Al-Albani)", "Imran ibn Husayn said: the Prophet ﷺ said: let him who hears of the Dajjal go far from him, for by Allah a man will come to him thinking he is a believer, and follow him because of the doubts he stirs in him.", "go far from him for I swear by Allah that a man will come to him thinking he is a believer"),
      difficulty: 3,
      questions: [
        { q: "What should one who hears of the Dajjal do?", a: "Go far from him", wrong: ["Wait to see him", "Follow him closely", "Ask him for help"], why: "Let him who hears of the Dajjal go far from him, Imran ibn Husayn heard him ﷺ say." },
        { q: "What will the man who goes to him think of himself?", a: "That he is a believer", wrong: ["That he is a scholar", "That he is a king", "That he is lost"], why: "Thinking he is a believer, he will follow him because of confused ideas, he ﷺ warned." },
        { q: "Being sure of your faith makes it safe to go near the Dajjal.", tf: false, why: "No. Even one sure he is a believer may follow the Dajjal, he ﷺ warned." }
      ]
    },
    {
      slug: "an-ummah-like-the-rain",
      title: "An Ummah like the rain",
      line: "His ﷺ Ummah is like rain: its start or end, which is better?",
      facts: ["Told by Anas ibn Malik", "Ummah: his ﷺ followers", "No one knows if its start or end is better"],
      source: hadith("tirmidhi", "2869", "Anas ibn Malik", "Hasan Sahih (Al-Albani)", "Anas said: the Messenger of Allah ﷺ said: the parable of my Ummah is that of rain; it is not known whether its beginning is better or its end.", "it is not known if its beginning is better or its end"),
      difficulty: 3,
      questions: [
        { q: "What did he ﷺ liken his Ummah to?", a: "The rain", wrong: ["The sea", "The wind", "The mountains"], why: "The parable of my Ummah is that of a rain, Anas ibn Malik heard him ﷺ say." },
        { q: "What is not known about the rain, he ﷺ said?", a: "Whether its start or end is better", wrong: ["Whether it is pure water", "Whether it is from Allah", "Whether it brings any good"], why: "Its beginning or its end, no one knows which is better, he ﷺ said of his Ummah." },
        { q: "Like rain, his ﷺ Ummah may have good at its end too.", tf: true, why: "The end may be as good as the start: none knows if its beginning is better or its end." }
      ]
    }
  ]
};

export const AKHIRAH_HOLDING_ON_UNITS: DeepUnit[] = [HOLDING_ON];
