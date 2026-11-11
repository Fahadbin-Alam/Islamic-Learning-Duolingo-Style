import { hadith, type DeepUnit } from "./deepKit";

// One more Duas unit: the du'as for rain and wind, from Sunan Abi Dawud and Sahih al-Bukhari. Every card is one
// sahih or hasan hadith with its number, narrator and grade, and its exact English words to highlight, and none of
// them is taught anywhere else in the app.

const WEATHER: DeepUnit = {
  key: "dua-rain-and-wind",
  topicId: "duas",
  branchId: "duas-rain-and-wind",
  branch: { title: "Du'as for rain and wind", description: "Asking Allah for rain, around us and not on us, the Rich and the poor, rain fresh from its Lord, and the wind from Allah's mercy." },
  name: "du'as for rain and wind",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "asking-for-rain",
      title: "Asking Allah for rain",
      line: "He ﷺ asked Allah for rain that helps and never harms.",
      facts: ["Told by Jabir ibn Abdullah", "People came weeping in a drought"],
      source: hadith("abudawud", "1169", "Jabir ibn Abdullah", "Sahih (Al-Albani)", "Jabir said: people came to the Prophet ﷺ weeping in a drought. He said: O Allah, give us rain that helps us, plentiful and wholesome, beneficial and not harmful, soon and not late. Then clouds covered the sky.", "give us rain which will replenish us, abundant, fertilising and profitable, not injurious, granting it now without delay"),
      difficulty: 1,
      questions: [
        { q: "Why did the people come to him ﷺ weeping?", a: "There was a drought", wrong: ["A war had begun", "A flood had come", "A guest had left"], why: "They had no rain, so he ﷺ asked Allah to send it." },
        { q: "What kind of rain did he ﷺ ask Allah for?", a: "Rain that helps, not harms", wrong: ["Rain only at night", "Rain for one hour", "Rain only on the sea"], why: "Abundant and profitable, not injurious, and now without delay." },
        { q: "After his du'a, clouds covered the sky.", tf: true, why: "Thereupon the sky became overcast, Jabir said." }
      ]
    },
    {
      slug: "around-us",
      title: "Around us, not on us",
      line: "After a week of rain, he ﷺ said: around us, not on us.",
      facts: ["Told by Anas ibn Malik", "From one Friday to the next"],
      source: hadith("bukhari", "1013", "Anas ibn Malik", "Sahih", "Anas said: on a Friday a man asked the Prophet ﷺ, during the khutbah, to pray for rain, and it rained for a week. The next Friday a man asked him to pray for it to stop. He raised his hands and said: O Allah, around us and not on us; on the plateaus, the mountains, the hills, the valleys and where trees grow. The rain stopped, and they walked out in the sun.", "O Allah! Round about us and not on us. O Allah! On the plateaus, on the mountains, on the hills, in the valleys"),
      difficulty: 2,
      questions: [
        { q: "When did the man ask him ﷺ to pray for rain?", a: "During the Friday khutbah", wrong: ["At the Eid prayer", "At night in the market", "On a journey"], why: "The man came in through the gate facing the pulpit." },
        { q: "What did he ﷺ say when the rain had to stop?", a: "Around us, not on us", wrong: ["Rain only at night", "Rain only on Fridays", "Rain only on the sea"], why: "On the plateaus, the mountains, the hills, the valleys and where trees grow." },
        { q: "After the second du'a, they walked out in the sun.", tf: true, why: "So the rain stopped, and we came out walking in the sun." }
      ]
    },
    {
      slug: "the-rich-and-the-poor",
      title: "The Rich, and we the poor",
      line: "Allah is the Rich, and we are the poor who need Him.",
      facts: ["Told by Aishah", "A pulpit set up at the prayer place"],
      source: hadith("abudawud", "1173", "Aishah", "Hasan (Al-Albani)", "Aishah said: the people complained to the Prophet ﷺ that no rain came. He set a day, went out, praised Allah and said: O Allah, You are Allah, there is no god but You, the Rich, while we are the poor; send down rain upon us. Then clouds came and the rain fell, and when he saw people hurrying to shelter, he laughed.", "O Allah, Thou art Allah, there is no deity but Thou, the Rich, while we are the poor"),
      difficulty: 2,
      questions: [
        { q: "What had the people complained of to him ﷺ?", a: "No rain had come", wrong: ["Too much rain", "A cold winter", "Prices in the market"], why: "You have complained of drought in your homes, he ﷺ said." },
        { q: "In his du'a, what did he ﷺ call the people?", a: "The poor", wrong: ["The strong", "The kings", "The rich"], why: "Thou art Allah, the Rich, while we are the poor." },
        { q: "He ﷺ laughed when he saw people hurrying to shelter.", tf: true, why: "He laughed till his back teeth were visible." }
      ]
    },
    {
      slug: "fresh-from-its-lord",
      title: "Rain fresh from its Lord",
      line: "He ﷺ let the rain touch him, fresh from its Lord.",
      facts: ["Told by Anas ibn Malik", "The Companions asked him why"],
      source: hadith("abudawud", "5100", "Anas ibn Malik", "Sahih (Al-Albani)", "Anas said: rain fell on us while we were with the Prophet ﷺ. He went out and pulled back his garment until some of the rain fell on him. We asked why, and he said: because it has just come from its Lord.", "Because it has recently been with its Lord"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ do when the rain began?", a: "Let some rain fall on him", wrong: ["Ran inside at once", "Covered his head", "Waited under a tree"], why: "He went out and moved his garment until some of the rain fell on him." },
        { q: "Why did he ﷺ want the rain on him?", a: "To touch rain fresh from its Lord", wrong: ["To cool off in the heat", "To wash his clothes", "To show it was strong"], why: "Because it has recently been with its Lord, he ﷺ said." },
        { q: "He ﷺ hurried indoors to stay dry from the rain.", tf: false, why: "No. He went out so that some of the rain fell on him." }
      ]
    },
    {
      slug: "the-wind",
      title: "Do not curse the wind",
      line: "Never curse the wind: ask Allah for its good instead.",
      facts: ["Told by Abu Hurairah", "Wind may bring blessing or punishment"],
      source: hadith("abudawud", "5097", "Abu Hurairah", "Sahih (Al-Albani)", "The Prophet ﷺ said: the wind comes from Allah's mercy; it may bring blessing or punishment. So when you see it, do not curse it, but ask Allah for its good and seek refuge in Allah from its evil.", "So when you see it, do not revile it, but ask Allah for some of its good, and seek refuge in Allah from its evil"),
      difficulty: 1,
      questions: [
        { q: "Where does the wind come from, he ﷺ said?", a: "From Allah's mercy", wrong: ["From the angry sea", "From the stars", "From the mountains"], why: "It may bring blessing, and it may bring punishment." },
        { q: "What should you do when a strong wind blows?", a: "Ask Allah for its good", wrong: ["Curse the wind", "Blame the weather", "Hide and say nothing"], why: "And seek refuge in Allah from its evil." },
        { q: "Cursing the wind is fine when it blows hard.", tf: false, why: "No. Do not revile the wind, but ask Allah for some of its good." }
      ]
    }
  ]
};

export const DUA_WEATHER_UNITS: DeepUnit[] = [WEATHER];
