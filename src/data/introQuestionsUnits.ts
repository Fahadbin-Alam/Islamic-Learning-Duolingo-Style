import { hadith, type DeepUnit } from "./deepKit";

// One more unit for people new to Islam: questions people asked him ﷺ, and his short answers, from Sahih al-Bukhari,
// Sahih Muslim, Sunan Ibn Majah and Sunan Abi Dawud. A deed that leads to Paradise, something useful to do, who the
// best people are, relatives who cut you off, how often to forgive, and what is left when you cannot do more. Every
// card is one sahih hadith with its number, narrator and grade, and its exact English words to highlight, and none of
// them is taught anywhere else in the app.

const QUESTIONS: DeepUnit = {
  key: "intro-questions-they-asked",
  topicId: "intro",
  branchId: "intro-questions-they-asked",
  branch: { title: "Questions they asked him ﷺ", description: "A deed for Paradise, something useful, the best people, relatives who cut you off, forgiving often, and keeping your harm away." },
  name: "the questions they asked him ﷺ",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "a-deed-for-paradise",
      title: "A deed for Paradise",
      line: "Worship Allah alone, pray, give zakat, and keep family ties.",
      facts: ["Told by Abu Ayyub al-Ansari", "A man asked for a deed for Paradise", "He ﷺ said: he has a need"],
      source: hadith("bukhari", "1396", "Abu Ayyub al-Ansari", "Sahih", "Abu Ayyub said: a man said to the Prophet ﷺ: tell me of a deed that will take me into Paradise. The people said: what is the matter with him? The Prophet ﷺ said: he has a need. Then he said: worship Allah and join nothing with Him, pray, give zakat, and keep the ties of kinship.", "you should worship Allah and do not ascribe any partners to Him, offer prayer perfectly, pay the Zakat and keep good relations with your Kith and kin"),
      difficulty: 1,
      questions: [
        { q: "What did the man ask him ﷺ for?", a: "A deed for Paradise", wrong: ["A gift of gold", "A strong camel", "A new house"], why: "Tell me of such a deed as will make me enter Paradise, the man said." },
        { q: "Which of these was in his ﷺ answer?", a: "Keeping ties with family", wrong: ["Building a big house", "Owning many camels", "Wearing fine clothes"], why: "Pay the Zakat and keep good relations with your kith and kin, he ﷺ said." },
        { q: "He ﷺ said the man had a real need to ask.", tf: true, why: "He has something to ask, he ﷺ said, when the people wondered about the man." }
      ]
    },
    {
      slug: "something-that-benefits",
      title: "Something that benefits",
      line: "Remove harmful things from the paths Muslims use.",
      facts: ["Told by Abu Barzah al-Aslami", "He asked to be taught something useful", "Clear what harms people on the road"],
      source: hadith("muslim", "2618", "Abu Barzah al-Aslami", "Sahih", "Abu Barzah said: I said: Messenger of Allah, teach me something that I may benefit from. He ﷺ said: remove what harms people from the paths of the Muslims.", "Remove the troublesome thing from the paths of the Muslims"),
      difficulty: 1,
      questions: [
        { q: "What did Abu Barzah ask him ﷺ to teach him?", a: "Something to benefit from", wrong: ["A new poem", "A way to get rich", "A clever riddle"], why: "Teach me something so that I may derive benefit from it, Abu Barzah said." },
        { q: "What did he ﷺ tell Abu Barzah to do?", a: "Remove harm from paths", wrong: ["Buy a fast horse", "Learn some poetry", "Sell his sheep"], why: "Remove the troublesome thing from the paths of the Muslims, he ﷺ said." },
        { q: "Moving harm off a path is a good deed to do.", tf: true, why: "Remove the troublesome thing from the paths of the Muslims, he ﷺ told Abu Barzah." }
      ]
    },
    {
      slug: "the-best-people",
      title: "The best people",
      line: "The best people have a pure heart and honest speech.",
      facts: ["Told by Abdullah ibn Amr", "A pure heart has no sin or envy", "Honest in what they say"],
      source: hadith("ibnmajah", "4216", "Abdullah ibn Amr", "Sahih (Al-Albani)", "Abdullah ibn Amr said: the Messenger of Allah ﷺ was asked: which people are best? He said: everyone who is pure of heart and true in speech. They said: we know true in speech, but what is pure of heart? He said: the heart that fears Allah and is clean, with no sin, wrongdoing, hatred or envy in it.", "Everyone who is pure of heart and sincere in speech"),
      difficulty: 2,
      questions: [
        { q: "Which people did he ﷺ call the best?", a: "The pure-hearted and truthful", wrong: ["The rich and powerful", "The strong and tall", "The famous and loud"], why: "Everyone who is pure of heart and sincere in speech, he ﷺ said." },
        { q: "What is not found in a pure heart, he ﷺ said?", a: "Sin, hatred or envy", wrong: ["Love or kindness", "Mercy or care", "Joy or thanks"], why: "Pious and pure, with no sin, injustice, rancor or envy in it, he ﷺ said." },
        { q: "A pure heart has no envy in it.", tf: true, why: "Pious and pure, with no sin, injustice, rancor or envy in it, he ﷺ said." }
      ]
    },
    {
      slug: "when-family-cuts-you-off",
      title: "When family cuts you off",
      line: "Keep doing good to family, even if they cut you off.",
      facts: ["Told by Abu Hurairah", "He was kind, and they were harsh", "A helper from Allah stays with him"],
      source: hadith("muslim", "2558", "Abu Hurairah", "Sahih", "Abu Hurairah said: a man said: Messenger of Allah, I have relatives; I keep ties with them and they cut me off, I am good to them and they are bad to me, I am gentle with them and they are harsh with me. He ﷺ said: if it is as you say, it is as if you feed them hot ashes, and a helper from Allah will stay with you against them as long as you keep to this.", "If it is so as you say, then you in fact throw hot ashes"),
      difficulty: 2,
      questions: [
        { q: "What did the man's relatives do to him?", a: "Cut him off", wrong: ["Sent him gifts", "Visited him daily", "Helped his work"], why: "I try to have close relationship, but they sever this relation, the man said." },
        { q: "Who stays with him while he keeps doing good?", a: "A helper from Allah", wrong: ["A rich friend", "A strong guard", "A wise judge"], why: "There would always remain with you, on behalf of Allah, one to support you, he ﷺ said." },
        { q: "Allah's help stays with one who keeps doing good to them.", tf: true, why: "A helper from Allah stays with you as long as you keep to this, he ﷺ said." }
      ]
    },
    {
      slug: "forgive-and-forgive-again",
      title: "Forgive, and forgive again",
      line: "Forgive a servant seventy times a day, he ﷺ said.",
      facts: ["Told by Ibn Umar", "The man asked more than once", "Seventy times every day"],
      source: hadith("abudawud", "5164", "Ibn Umar", "Sahih (Al-Albani)", "Ibn Umar said: a man came to the Prophet ﷺ and asked: Messenger of Allah, how many times should I forgive a servant? He was silent. The man asked again, and he was silent. When he asked a third time, he said: forgive him seventy times every day.", "When he asked a third time, he replied: Forgive him seventy times daily"),
      difficulty: 1,
      questions: [
        { q: "How many times a day did he ﷺ say to forgive?", a: "Seventy times", wrong: ["Three times", "Seven times", "Only once"], why: "Forgive him seventy times daily, he ﷺ replied to the man." },
        { q: "Who was the man asking about forgiving?", a: "The one who served him", wrong: ["The one who taught him", "The one who lived next door", "The one who sold to him"], why: "How often shall I forgive a servant, the man asked the Messenger of Allah ﷺ." },
        { q: "He ﷺ taught them to forgive servants many times.", tf: true, why: "Forgive him seventy times daily, he ﷺ said when asked about a servant." }
      ]
    },
    {
      slug: "and-if-i-cannot",
      title: "And if I cannot?",
      line: "If you can do nothing else, keep your harm from people.",
      facts: ["Told by Abu Dharr", "He kept asking: and if I cannot?", "Keeping harm away is charity"],
      source: hadith("bukhari", "2518", "Abu Dharr", "Sahih", "Abu Dharr asked the Prophet ﷺ about the best deeds, and each time he asked: and if I cannot do that? He ﷺ said: help the weak, or do something for one who cannot do it himself. He asked: and if I cannot? He said: keep your harm away from people, for that is a charity from you for yourself.", "Refrain from harming others for this will be regarded as a charitable deed for your own good"),
      difficulty: 2,
      questions: [
        { q: "What did Abu Dharr keep asking him ﷺ?", a: "And if I cannot?", wrong: ["And how much?", "And who else?", "And where to?"], why: "If I cannot do that, Abu Dharr asked, and he ﷺ gave him another good deed." },
        { q: "What did he ﷺ say keeping harm away counts as?", a: "Charity for yourself", wrong: ["A debt to repay", "A small sin", "A favor for later"], why: "Refrain from harming others, for this will be a charitable deed for your own good." },
        { q: "Helping someone who cannot do his work is a good deed.", tf: true, why: "Help the weak or do good for a person who cannot work for himself, he ﷺ said." }
      ]
    }
  ]
};

export const INTRO_QUESTIONS_UNITS: DeepUnit[] = [QUESTIONS];
