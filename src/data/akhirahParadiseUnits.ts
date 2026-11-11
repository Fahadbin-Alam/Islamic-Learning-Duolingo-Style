import { hadith, type DeepUnit } from "./deepKit";

// One more unit for the Day of Judgment topic: a glimpse of Paradise, from Jami at-Tirmidhi. Trees with trunks of
// gold, seas that the rivers flow from, a hundred and twenty rows of its people, youth that never ends, the birds of
// al-Kawthar, and the gentle, easy person whom the Fire cannot touch. Every card is one sahih or hasan hadith with
// its number, narrator and grade, and its exact English words to highlight, and none of them is taught anywhere
// else in the app.

const PARADISE: DeepUnit = {
  key: "akhirah-glimpse-of-paradise",
  topicId: "akhirah",
  branchId: "akhirah-glimpse-of-paradise",
  branch: { title: "A glimpse of Paradise", description: "Trunks of gold, seas of honey and milk, a hundred and twenty rows, youth that never ends, the birds of al-Kawthar, and who is forbidden for the Fire." },
  name: "the gardens of Paradise",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "trunks-of-gold",
      title: "Trunks of gold",
      line: "Every tree in Paradise has a trunk of gold.",
      facts: ["Told by Abu Hurairah", "Not one tree in Paradise is left out", "Its trunk is made of gold"],
      source: hadith("tirmidhi", "2525", "Abu Hurairah", "Sahih (Al-Albani)", "Abu Hurairah said: the Messenger of Allah ﷺ said: there is not a tree in Paradise except that its trunk is of gold.", "There is not a tree in Paradise except that its tree is of gold"),
      difficulty: 1,
      questions: [
        { q: "What is the trunk of every tree in Paradise made of?", a: "Gold", wrong: ["Wood", "Stone", "Clay"], why: "Not one tree in Paradise is left out, as Abu Hurairah told it." },
        { q: "How many trees in Paradise have a trunk of gold?", a: "Every one of them", wrong: ["Only one tree", "Only the tallest ones", "Only a few of them"], why: "There is not a tree in Paradise except that its trunk is of gold, he ﷺ said." },
        { q: "The trees of Paradise have trunks of wood.", tf: false, why: "No. The trees of Paradise all have trunks of gold, he ﷺ said." }
      ]
    },
    {
      slug: "seas-of-honey-and-milk",
      title: "Seas of honey and milk",
      line: "Paradise has seas, and its rivers split off from them.",
      facts: ["Told by Mu'awiyah ibn Haydah", "A sea of water, a sea of honey and a sea of milk", "The rivers of Paradise branch out from them"],
      source: hadith("tirmidhi", "2571", "Mu'awiyah ibn Haydah", "Sahih (Al-Albani)", "Mu'awiyah ibn Haydah said: the Prophet ﷺ said: in Paradise there is a sea of water, a sea of honey, a sea of milk and a sea of wine, and then the rivers split off from them.", "Indeed in Paradise there is a sea of water, and a sea of honey"),
      difficulty: 1,
      questions: [
        { q: "What splits off from the seas of Paradise?", a: "The rivers", wrong: ["The gates", "The palaces", "The tents"], why: "After naming each sea, he ﷺ said: then the rivers split off from them." },
        { q: "Which of these is a sea in Paradise?", a: "A sea of honey", wrong: ["A sea of salt", "A sea of sand", "A sea of fire"], why: "A sea of water, a sea of honey and a sea of milk, he ﷺ said." },
        { q: "Paradise has a sea of milk as well as a sea of water.", tf: true, why: "And a sea of honey too, and the rivers split off from them, he ﷺ said." }
      ]
    },
    {
      slug: "a-hundred-and-twenty-rows",
      title: "A hundred and twenty rows",
      line: "Of Paradise's 120 rows, eighty will be from this Ummah.",
      facts: ["Told by Buraydah ibn al-Hasib", "The people of Paradise stand in 120 rows", "Eighty from this Ummah, forty from the rest"],
      source: hadith("tirmidhi", "2546", "Buraydah ibn al-Hasib", "Sahih (Al-Albani)", "Buraydah said: the Messenger of Allah ﷺ said: the people of Paradise are a hundred and twenty rows. Eighty of them are from this Ummah, and forty are from all the other nations.", "The people of Paradise are a hundred and twenty rows, eighty of them are from this nation, and forty are from the rest of the nations"),
      difficulty: 2,
      questions: [
        { q: "How many rows will the people of Paradise make?", a: "A hundred and twenty", wrong: ["Seventy", "Three hundred", "One thousand"], why: "Eighty of the rows are from this Ummah, and forty from the rest, he ﷺ said." },
        { q: "How many of those rows will be from this Ummah?", a: "Eighty", wrong: ["Ten", "Forty", "Twenty"], why: "Forty rows will be from all the other nations, he ﷺ said." },
        { q: "Most of the rows of Paradise will be from this Ummah.", tf: true, why: "Eighty of the hundred and twenty rows, he ﷺ said." }
      ]
    },
    {
      slug: "forever-young",
      title: "Forever young",
      line: "In Paradise, youth never ends and clothes never wear out.",
      facts: ["Told by Abu Hurairah", "The people of Paradise have kohl on their eyes", "They never grow old"],
      source: hadith("tirmidhi", "2539", "Abu Hurairah", "Hasan (Al-Albani)", "Abu Hurairah said: the Messenger of Allah ﷺ said: the people of Paradise have kohl on their eyes. Their youth does not come to an end, and their clothes do not wear out.", "their youth does not come to an end, and their clothes do not wear out"),
      difficulty: 1,
      questions: [
        { q: "What never comes to an end for the people of Paradise?", a: "Their youth", wrong: ["Their hunger", "Their tiredness", "Their worries"], why: "And their clothes do not wear out, he ﷺ said." },
        { q: "What happens to the clothes of the people of Paradise?", a: "They never wear out", wrong: ["They tear quickly", "They fade each day", "They turn to dust"], why: "Their youth does not come to an end either, he ﷺ said." },
        { q: "People in Paradise grow old like people of this world.", tf: false, why: "No. Their youth does not come to an end in Paradise, he ﷺ said." }
      ]
    },
    {
      slug: "birds-by-al-kawthar",
      title: "Birds by al-Kawthar",
      line: "Al-Kawthar has birds with necks like the necks of camels.",
      facts: ["Told by Anas ibn Malik", "Al-Kawthar: a river Allah gave him ﷺ in Paradise", "Whiter than milk, sweeter than honey"],
      source: hadith("tirmidhi", "2542", "Anas ibn Malik", "Hasan Sahih (Al-Albani)", "Anas ibn Malik said: the Messenger of Allah ﷺ was asked what al-Kawthar is. He said: a river in Paradise that Allah has given me, whiter than milk and sweeter than honey. In it are birds whose necks are like the necks of camels.", "In it are birds whose necks are like the necks of camels"),
      difficulty: 1,
      questions: [
        { q: "What are the necks of the birds of al-Kawthar like?", a: "The necks of camels", wrong: ["The necks of swans", "The necks of horses", "The necks of deer"], why: "They are in a river whiter than milk and sweeter than honey, he ﷺ said." },
        { q: "What did he ﷺ say al-Kawthar is?", a: "A river in Paradise", wrong: ["A mountain in Makkah", "A well in Madinah", "A garden on earth"], why: "Allah has given me that river, he ﷺ said when asked about it." },
        { q: "Al-Kawthar is whiter than milk and sweeter than honey.", tf: true, why: "In it are birds whose necks are like the necks of camels, he ﷺ said." }
      ]
    },
    {
      slug: "forbidden-for-the-fire",
      title: "Forbidden for the Fire",
      line: "The Fire is forbidden for one who is gentle and easy.",
      facts: ["Told by Abdullah ibn Mas'ud", "Near to people, gentle and soft", "Easy to deal with"],
      source: hadith("tirmidhi", "2488", "Abdullah ibn Mas'ud", "Sahih (Al-Albani)", "Abdullah ibn Mas'ud said: the Messenger of Allah ﷺ said: shall I not tell you who is forbidden for the Fire, and for whom the Fire is forbidden? Every person who is close to people, gentle, and easy to deal with.", "Shall I not inform you of whom the Fire is unlawful and he is unlawful for the Fire"),
      difficulty: 2,
      questions: [
        { q: "Who did he ﷺ say the Fire is unlawful for?", a: "The gentle, easy person", wrong: ["The richest person", "The loudest person", "The tallest person"], why: "Every person near to people, amicable and easy to deal with, he ﷺ said." },
        { q: "How should you be with people, as he ﷺ taught?", a: "Easy to deal with", wrong: ["Hard to please", "Quick to argue", "Slow to forgive"], why: "Near to people, amicable and easy: the Fire is unlawful for him, he ﷺ said." },
        { q: "He ﷺ asked: shall I not tell you whom the Fire is unlawful for?", tf: true, why: "Every person near to people, amicable and easy, he ﷺ said next." }
      ]
    }
  ]
};

export const AKHIRAH_PARADISE_UNITS: DeepUnit[] = [PARADISE];
