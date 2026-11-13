import { hadith, type DeepUnit } from "./deepKit";

// One more Marriage and family unit: weddings and new homes, from Sahih al-Bukhari, Jami at-Tirmidhi and Sunan
// an-Nasa'i. A poor Muslim better than an earth full of the proud, Allah's help for one who marries to stay chaste, the
// best wife, a wedding in Shawwal, the words the Ansar women said to a bride, and carpets that would soon come. Every
// card is one sahih or hasan hadith with its number, narrator and grade, and its exact English words to highlight.
// None of these hadith is taught anywhere else in the app.

const WEDDINGS: DeepUnit = {
  key: "marriage-weddings-and-new-homes",
  topicId: "marriage",
  branchId: "marriage-weddings-and-new-homes",
  branch: { title: "Weddings and new homes", description: "A poor man of faith, Allah's help for the one who marries, the best wife, a wedding in Shawwal, words for a bride, and carpets to come." },
  name: "weddings and new homes",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "better-than-an-earth-full",
      title: "Better than an earth full",
      line: "The poor man was better than an earth full of the other.",
      facts: ["Told by Sahl ibn Sa'd", "People praised the first man's rank", "The second man was a poor Muslim"],
      source: hadith("bukhari", "5091", "Sahl ibn Sa'd", "Sahih", "Sahl ibn Sa'd said: a man passed by the Messenger of Allah ﷺ, who asked what they said of him. They said: if he proposes he should be married, if he intercedes he should be heard, and if he speaks he should be listened to. Then a poor Muslim passed by, and they said the opposite of him. He ﷺ said: this poor man is better than an earth full of men like the first.", "This poor man is better than so many of the first as filling the earth"),
      difficulty: 2,
      questions: [
        { q: "Which of the two men did he ﷺ say was better?", a: "The poor Muslim", wrong: ["The first man", "Neither of the two", "Both men alike"], why: "This poor man is better than so many of the first as filling the earth, he ﷺ said." },
        { q: "What did people say if the first man proposed?", a: "He should be given in marriage", wrong: ["He should wait a year", "He should ask the poor", "He should pay twice"], why: "If he asks for a lady's hand, he ought to be given her in marriage, they replied." },
        { q: "People said the poor man would not be listened to.", tf: true, why: "If he speaks, he should not be listened to, they said; yet he ﷺ called him better." }
      ]
    },
    {
      slug: "allahs-help-in-marriage",
      title: "Allah's help in marriage",
      line: "Allah helps the one who marries to keep himself chaste.",
      facts: ["Told by Abu Hurairah", "Three whom Allah has a right to help", "One of them marries to stay chaste"],
      source: hadith("tirmidhi", "1655", "Abu Hurairah", "Hasan (Darussalam)", "Abu Hurairah said: the Messenger of Allah ﷺ said: there are three whom it is a right upon Allah to help: the mujahid in the cause of Allah, the mukatab who means to pay for his freedom, and the one getting married who intends chastity.", "the one getting married who intends chastity"),
      difficulty: 1,
      questions: [
        { q: "Which one getting married does Allah help, he ﷺ said?", a: "One who intends chastity", wrong: ["One who wants to show off", "One who marries for fame", "One who wants a big feast"], why: "And the one getting married who intends chastity, he ﷺ said of the three Allah helps." },
        { q: "How many people did he ﷺ name whom Allah helps?", a: "Three kinds of people", wrong: ["Two kinds of people", "Five kinds of people", "Seven kinds of people"], why: "There are three for whom it is a right upon Allah to help him, he ﷺ said." },
        { q: "One who marries to keep chaste has Allah's help.", tf: true, why: "Helping the one getting married who intends chastity is a right upon Allah, he ﷺ said." }
      ]
    },
    {
      slug: "which-woman-is-best",
      title: "Which woman is best?",
      line: "The best wife makes him happy when he looks at her.",
      facts: ["Told by Abu Hurairah", "He ﷺ was asked: which woman is best?", "She honors his wishes in herself and wealth"],
      source: hadith("nasai", "3231", "Abu Hurairah", "Hasan (Darussalam)", "Abu Hurairah said: the Messenger of Allah ﷺ was asked: which woman is best? He said: the one who makes him happy when he looks at her, obeys him when he asks her, and does not go against his wishes in herself or her wealth.", "The one who makes him happy when he looks at her, obeys him when he commands her"),
      difficulty: 2,
      questions: [
        { q: "Which woman is best, he ﷺ said?", a: "One who makes him happy to see", wrong: ["One with the most gold", "One from the richest family", "One with the finest clothes"], why: "The one who makes him happy when he looks at her, he ﷺ said when asked." },
        { q: "Which of these did he ﷺ name in the best wife?", a: "She obeys him when he asks", wrong: ["She owns the most land", "She is from a famous tribe", "She has the most jewelry"], why: "Obeys him when he commands her, he ﷺ said of the best woman." },
        { q: "The best wife cares for his wishes about her wealth.", tf: true, why: "She does not go against his wishes with regard to herself nor her wealth, he ﷺ said." }
      ]
    },
    {
      slug: "married-in-shawwal",
      title: "Married in Shawwal",
      line: "Aishah said: he ﷺ married me in the month of Shawwal.",
      facts: ["Told by Aishah", "Shawwal: the month after Ramadan", "She liked her women to marry in Shawwal"],
      source: hadith("nasai", "3236", "Aishah", "Sahih (Darussalam)", "Urwah said that Aishah said: the Messenger of Allah ﷺ married me in Shawwal, and my married life began in Shawwal; and which of his wives was more beloved to him than me? Aishah liked the weddings of her women to be in Shawwal.", "The Messenger of Allah married me in Shawwal"),
      difficulty: 1,
      questions: [
        { q: "In which month did he ﷺ marry Aishah?", a: "Shawwal", wrong: ["Ramadan", "Muharram", "Rajab"], why: "The Messenger of Allah ﷺ married me in Shawwal, Aishah said." },
        { q: "Who tells us of her own wedding in Shawwal?", a: "Aishah", wrong: ["Hafsah", "Umm Salamah", "Sawdah"], why: "The Messenger of Allah ﷺ married me in Shawwal, Aishah said, as Urwah reported." },
        { q: "Aishah liked her women's weddings to be in Shawwal.", tf: true, why: "Aishah liked for her women's marriages to be in Shawwal, Urwah reported." }
      ]
    },
    {
      slug: "words-for-a-bride",
      title: "Words for a bride",
      line: "The Ansar women wished the bride good and blessings.",
      facts: ["Told by Aishah", "Her mother brought her into the house", "Women of the Ansar were waiting there"],
      source: hadith("bukhari", "5156", "Aishah", "Sahih", "Aishah said: when the Prophet ﷺ married me, my mother came and brought me into the house, where there were women of the Ansar. They said: may you prosper, have blessings and have good omen.", "May you prosper and have blessings and have good omen"),
      difficulty: 1,
      questions: [
        { q: "What did the Ansar women say to the bride?", a: "May you prosper, with blessings", wrong: ["Go back home now", "Sit and stay quiet", "Be quick about it"], why: "May you prosper and have blessings and have good omen, the women of the Ansar said." },
        { q: "Who brought Aishah into the house?", a: "Her mother", wrong: ["Her sister", "Her aunt", "Her father"], why: "My mother came to me and made me enter the house, Aishah said." },
        { q: "Women of the Ansar were in the house to greet her.", tf: true, why: "I saw some women from the Ansar there, Aishah said, and they wished her blessings." }
      ]
    },
    {
      slug: "carpets-will-come",
      title: "Carpets will come",
      line: "He ﷺ told Jabir: you shall soon have carpets.",
      facts: ["Told by Jabir ibn Abdullah", "Jabir asked: where can we get carpets?", "Later his wife reminded him of it"],
      source: hadith("bukhari", "3631", "Jabir ibn Abdullah", "Sahih", "Jabir said: the Prophet ﷺ asked: have you got carpets? I said: where can we get carpets? He said: you shall soon have carpets. Later, when I told my wife to take her carpets out of my sight, she would say: did the Prophet ﷺ not tell you that you would soon have carpets? So I would leave it.", "Have you got carpets … But you shall soon have carpets"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ tell Jabir they would soon have?", a: "Carpets", wrong: ["Camels", "Swords", "Gardens"], why: "But you shall soon have carpets, he ﷺ said when Jabir asked where to get them." },
        { q: "What did Jabir's wife remind him of?", a: "His ﷺ words about carpets", wrong: ["A promise to travel", "A debt to pay", "A guest coming"], why: "Did the Prophet ﷺ not tell you that you would soon have carpets? she would say." },
        { q: "Jabir stopped asking his wife to remove the carpets.", tf: true, why: "So I would give up my request, Jabir said, when she reminded him of his ﷺ words." }
      ]
    }
  ]
};

export const MARRIAGE_WEDDING_UNITS: readonly DeepUnit[] = [WEDDINGS];
