import { hadith, type DeepUnit } from "./deepKit";

// One more Marriage unit: love and kindness at home, from the life of the Prophet ﷺ. Every card is one sahih
// hadith (number and grade as sunnah.com gives them), with its exact English words to highlight, and none of them
// is taught anywhere else in the app.

const LOVE_AT_HOME: DeepUnit = {
  key: "marriage-love",
  topicId: "marriage",
  branchId: "marriage-love-and-kindness",
  branch: { title: "Love and kindness at home", description: "Noticing feelings, sharing fun, a wife's own choice, a simple walimah, and du'as for each other." },
  name: "love and kindness at home",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "he-knew-her-moods",
      title: "He knew how she felt",
      line: "He ﷺ could tell when Aishah was pleased or upset with him.",
      facts: ["Told by Aishah", "She said: I leave out only your name"],
      source: hadith("bukhari", "5228", "Aishah", "Sahih", "The Messenger of Allah ﷺ said to Aishah: I know when you are pleased with me and when you are upset. When pleased you say: no, by the Lord of Muhammad; when upset you say: no, by the Lord of Ibrahim. She said: yes, but I leave out only your name.", "I know when you are pleased with me or angry with me"),
      difficulty: 1,
      questions: [
        { q: "How could he ﷺ tell that Aishah was pleased?", a: "She swore by the Lord of Muhammad", wrong: ["She gave him a gift", "She cooked his food", "She wore new clothes"], why: "When you are pleased with me, you say: No, by the Lord of Muhammad." },
        { q: "What did she say when she was upset?", a: "No, by the Lord of Ibrahim", wrong: ["No, by the Lord of Musa", "Nothing at all", "No, by the Lord of the Ka'bah"], why: "When you are angry with me, then you say: No, by the Lord of Abraham." },
        { q: "A kind spouse notices how the other one feels.", tf: true, why: "I know when you are pleased with me or angry with me." }
      ]
    },
    {
      slug: "watching-together",
      title: "Until she had seen enough",
      line: "He ﷺ screened Aishah while she watched the Abyssinians play.",
      facts: ["Told by Aishah", "Abyssinia: old Ethiopia"],
      source: hadith("bukhari", "5236", "Aishah", "Sahih", "The Prophet ﷺ screened Aishah with his cloak while she watched the Abyssinians playing in the courtyard of the masjid, and she kept watching until she was satisfied.", "while I was looking at the Ethiopians who were playing in the courtyard of the mosque"),
      difficulty: 1,
      questions: [
        { q: "Who was playing in the courtyard of the masjid?", a: "The Abyssinians", wrong: ["Some camels", "The boys of Quraysh", "Traders from Sham"], why: "I was looking at the Ethiopians who were playing in the courtyard of the mosque." },
        { q: "How long did he ﷺ let her watch?", a: "Until she had seen enough", wrong: ["One quick look", "Until the adhan", "Only a minute"], why: "I continued watching till I was satisfied." },
        { q: "He ﷺ was patient and gentle with his wife's fun.", tf: true, why: "He was screening me with his garment while I was looking, till I was satisfied." }
      ]
    },
    {
      slug: "barirah-chose",
      title: "Barirah's own choice",
      line: "He ﷺ only spoke up for Mughith; the choice was Barirah's.",
      facts: ["Told by Ibn Abbas", "Mughith loved her and wept"],
      source: hadith("bukhari", "5283", "Ibn Abbas", "Sahih", "When Barirah was freed she chose to part from her husband Mughith, who followed her weeping. The Prophet ﷺ asked her: why not go back to him? She asked: are you ordering me? He said: no, I am only speaking up for him. She said: then I have no need of him.", "Do you order me to do so"),
      difficulty: 1,
      questions: [
        { q: "What did Barirah ask when he ﷺ said she could go back?", a: "Are you ordering me?", wrong: ["Where is Mughith?", "Can I think it over?", "Will you pay me?"], why: "Do you order me to do so?" },
        { q: "What did he ﷺ answer her?", a: "No, I only speak up for him", wrong: ["Yes, you must", "Go back today", "Ask your father"], why: "No, I only intercede for him." },
        { q: "Barirah had to take his suggestion as an order.", tf: false, why: "He said: No, I only intercede for him. She said: I am not in need of him." }
      ]
    },
    {
      slug: "nothing-like-marriage",
      title: "Nothing like marriage",
      line: "For two who love each other, nothing is like marriage.",
      facts: ["Told by Ibn Abbas", "Sunan Ibn Majah 1847"],
      source: hadith("ibnmajah", "1847", "Ibn Abbas", "Sahih (Al-Albani)", "The Messenger of Allah ﷺ said: there is nothing like marriage for two who love one another.", "There is nothing like marriage, for two who love one another"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ say is best for two who love each other?", a: "Marriage", wrong: ["Staying apart", "Only letters", "Waiting for years"], why: "There is nothing like marriage, for two who love one another." },
        { q: "Which book records 'nothing like marriage'?", a: "Sunan Ibn Majah", wrong: ["Sahih al-Bukhari", "Sahih Muslim", "Jami at-Tirmidhi"], why: "Sunan Ibn Majah 1847." },
        { q: "Islam honors love by making it halal through nikah.", tf: true, why: "There is nothing like marriage, for two who love one another." }
      ]
    },
    {
      slug: "simple-walimah",
      title: "A walimah of barley",
      line: "He ﷺ once gave a wedding meal of just two mudds of barley.",
      facts: ["Told by Safiyyah bint Shaybah", "A mudd: a small measure of grain"],
      source: hadith("bukhari", "5172", "Safiyyah bint Shaybah", "Sahih", "The Prophet ﷺ gave a wedding meal of two mudds of barley when he married one of his wives.", "gave a banquet with two Mudds of barley on marrying some of his wives"),
      difficulty: 2,
      questions: [
        { q: "What was that walimah made of?", a: "Two mudds of barley", wrong: ["Ten roasted camels", "Plates of sweets", "A hundred sheep"], why: "He gave a banquet with two Mudds of barley." },
        { q: "What does a walimah of barley teach us?", a: "Keep it simple, as you can afford", wrong: ["It must be huge", "It must cost a lot", "Only kings may hold one"], why: "The Prophet ﷺ gave a banquet with two Mudds of barley." },
        { q: "A walimah only counts if it costs a lot.", tf: false, why: "He gave a banquet with two Mudds of barley on marrying some of his wives." }
      ]
    },
    {
      slug: "duas-for-each-other",
      title: "Du'as for each other",
      line: "He ﷺ made du'a for his wives, and they made du'a for him.",
      facts: ["Told by Anas ibn Malik", "After his walimah for Zaynab"],
      source: hadith("bukhari", "5154", "Anas ibn Malik", "Sahih", "After the walimah for his marriage to Zaynab, the Prophet ﷺ went round to the homes of the Mothers of the Believers, as was his custom, making du'a for them, and they made du'a for him.", "Then he went out as was his custom on marrying, he came to the dwelling places of the mothers of the Believers"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ do at his wives' homes after the walimah?", a: "He made du'a for them", wrong: ["He asked for gifts", "He checked their food", "He counted their coins"], why: "He came to the dwelling places of the mothers of the Believers, invoking good on them." },
        { q: "What did his wives do in return?", a: "They made du'a for him", wrong: ["They stayed silent", "They sent him away", "They asked for money"], why: "And they were invoking good on him." },
        { q: "A husband and wife can make du'a for each other.", tf: true, why: "He invoked good on them, and they invoked good on him." }
      ]
    }
  ]
};

export const MARRIAGE_MORE_UNITS: DeepUnit[] = [LOVE_AT_HOME];
