import { hadith, type DeepUnit } from "./deepKit";

// One more Aqidah unit: when trials come, from Sahih al-Bukhari, Jami at-Tirmidhi and Sunan Abi Dawud. A trial as a
// sign that Allah wants good, his ﷺ fever like two men's, Paradise for patience after losing the sight, trials that
// leave no sin, a rank Allah has written, and calling on Al-Hayy Al-Qayyum when worried. Every card is one sahih or
// hasan hadith with its number, narrator and grade, and its exact English words to highlight, and none of them is
// taught anywhere else in the app.

const TRIALS: DeepUnit = {
  key: "aqidah-trials",
  topicId: "aqidah",
  branchId: "aqidah-trials",
  branch: { title: "When trials come", description: "A trial as a sign of good, a fever like two men's, Paradise for patience, trials that leave no sin, a rank Allah has written, and calling on Al-Hayy Al-Qayyum." },
  name: "trials and patience",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "when-allah-wants-good",
      title: "When Allah wants good",
      line: "When Allah wants good for someone, He tests them.",
      facts: ["Told by Abu Hurairah", "A trial is not always bad news"],
      source: hadith("bukhari", "5645", "Abu Hurairah", "Sahih", "The Messenger of Allah ﷺ said: if Allah wants good for someone, He tests him with trials.", "If Allah wants to do good to somebody, He afflicts him with trials"),
      difficulty: 1,
      questions: [
        { q: "What does Allah do for someone He wants good for?", a: "He tests him with trials", wrong: ["He gives him no work", "He makes him rich at once", "He lets him rest always"], why: "If Allah wants to do good to somebody, He afflicts him with trials." },
        { q: "Which is a good way to see a hard test?", a: "Allah may want good for me", wrong: ["Nothing good can come of it", "I am just unlucky", "I should give up"], why: "He afflicts with trials the one He wants good for, he ﷺ said." },
        { q: "A trial can be a sign that Allah wants good for you.", tf: true, why: "If Allah wants to do good to somebody, He afflicts him with trials." }
      ]
    },
    {
      slug: "a-fever-like-two-mens",
      title: "A fever like two men's",
      line: "He ﷺ had a fever like two men, and double reward.",
      facts: ["Told by Abdullah ibn Mas'ud", "Sins fall like a tree's leaves"],
      source: hadith("bukhari", "5648", "Abdullah ibn Mas'ud", "Sahih", "Abdullah ibn Mas'ud said: I visited the Messenger of Allah ﷺ when he had a high fever, and said: you have a high fever. He said: yes, I have as much fever as two of you. I said: is that because you will have a double reward? He said: yes. No Muslim is hurt by anything, even the prick of a thorn, but Allah wipes away his sins by it, as a tree sheds its leaves.", "Allah expiates his sins because of that, as a tree sheds its leaves"),
      difficulty: 2,
      questions: [
        { q: "How strong was his ﷺ fever, he told Ibn Mas'ud?", a: "As much as two men's", wrong: ["Just a little warm", "Half of one man's", "Gone by the morning"], why: "Yes, I have as much fever as two men of you, he ﷺ said." },
        { q: "What did Ibn Mas'ud ask about the strong fever?", a: "Is it for a double reward?", wrong: ["Is it from the cold?", "Shall I call a doctor?", "Will it end soon?"], why: "Is it because you will have a double reward? Yes, it is so, he ﷺ said." },
        { q: "A Muslim's pain can make his sins fall away like leaves.", tf: true, why: "Allah expiates his sins because of that, as a tree sheds its leaves." }
      ]
    },
    {
      slug: "his-two-dear-things",
      title: "His two dear things",
      line: "Allah promised Paradise to one patient after losing his sight.",
      facts: ["Told by Anas ibn Malik", "A hadith qudsi: Allah said it"],
      source: hadith("bukhari", "5653", "Anas ibn Malik", "Sahih", "Anas heard the Messenger of Allah ﷺ say: Allah said: if I take away My servant's two dear things, his eyes, and he stays patient, I will give him Paradise in their place.", "and he remains patient, I will let him enter Paradise in compensation for them"),
      difficulty: 2,
      questions: [
        { q: "What are the two dear things in the hadith qudsi?", a: "His two eyes", wrong: ["His two hands", "His two sons", "His two houses"], why: "Allah said: If I deprive my slave of his two beloved things, his eyes." },
        { q: "What does Allah give the one who stays patient?", a: "Paradise in their place", wrong: ["New eyes at once", "A long life", "Gold and silver"], why: "I will let him enter Paradise in compensation for them, Allah said." },
        { q: "Allah rewards patience even when a great blessing is taken.", tf: true, why: "If he remains patient, I will let him enter Paradise, Allah said." }
      ]
    },
    {
      slug: "until-no-sin-is-left",
      title: "Until no sin is left",
      line: "Trials keep washing a believer until no sin is left.",
      facts: ["Told by Abu Hurairah", "In self, children and wealth"],
      source: hadith("tirmidhi", "2399", "Abu Hurairah", "Hasan Sahih (Al-Albani)", "The Messenger of Allah ﷺ said: trials keep coming to the believing man and the believing woman, in themselves, their children and their wealth, until they meet Allah with no sin left on them.", "Trials will not cease afflicting the believing man and the believing woman in their self, children, and wealth, until they meet Allah without having any sin"),
      difficulty: 2,
      questions: [
        { q: "In which three things do trials come to a believer?", a: "Self, children and wealth", wrong: ["Sun, moon and stars", "Food, drink and sleep", "Roads, rivers and hills"], why: "Trials will not cease afflicting the believer in their self, children, and wealth." },
        { q: "How does the tested believer meet Allah in the end?", a: "Without any sin", wrong: ["With many debts", "With empty hands", "With no friends"], why: "Trials wash them until they meet Allah without having any sin, he ﷺ said." },
        { q: "Trials can come to a believer's children and wealth too.", tf: true, why: "In their self, children, and wealth, until they meet Allah without any sin." }
      ]
    },
    {
      slug: "a-rank-allah-has-written",
      title: "A rank Allah has written",
      line: "Allah may test you to raise you to a rank He wrote.",
      facts: ["From a Companion, through his grandson", "Allah also gives patience to bear it"],
      source: hadith("abudawud", "3090", "Muhammad ibn Khalid as-Sulami, from his grandfather", "Sahih (Al-Albani)", "A Companion of the Messenger of Allah ﷺ heard him say: when Allah has already written for a servant a rank that his deeds do not reach, He tests him in his body, his wealth or his children, then gives him patience for it, until He brings him to the rank Allah wrote for him.", "When Allah has previously decreed for a servant a rank which he has not attained by his action, He afflicts him in his body, or his property or his children"),
      difficulty: 2,
      questions: [
        { q: "What has Allah already written for some servants?", a: "A rank their deeds do not reach", wrong: ["A life with no tests", "Riches with no effort", "Nothing at all"], why: "When Allah has previously decreed for a servant a rank which he has not attained." },
        { q: "Then what does Allah give him, so he can bear it?", a: "Patience", wrong: ["Anger", "Boredom", "Fear"], why: "He then enables him to endure that, until He brings him to that rank." },
        { q: "A test can lift a servant to a rank his deeds alone would not reach.", tf: true, why: "So that He may bring him to the rank previously decreed for him by Allah." }
      ]
    },
    {
      slug: "ya-hayyu-ya-qayyum",
      title: "O Ever-Living, O Sustainer",
      line: "When worried, he ﷺ said: Ya Hayyu, ya Qayyum.",
      facts: ["Told by Anas ibn Malik", "Bi-rahmatika astaghith: by Your mercy"],
      source: hadith("tirmidhi", "3524", "Anas ibn Malik", "Hasan (Al-Albani)", "Anas said: whenever something worried the Prophet ﷺ, he would say: Ya Hayyu, ya Qayyum, bi-rahmatika astaghith. O Ever-Living, O Sustainer of all, by Your mercy I call for help.", "O Living, O Self-Sustaining Sustainer! In Your Mercy do I seek relief"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ say when a matter worried him?", a: "Ya Hayyu, ya Qayyum", wrong: ["Ya Rabb, ya Karim", "Subhanallah only", "Allahu akbar, three times"], why: "O Living, O Self-Sustaining Sustainer, in Your mercy I seek relief, he ﷺ would say." },
        { q: "By what did he ﷺ ask Allah for help in that du'a?", a: "By His mercy", wrong: ["By his own strength", "By his money", "By his friends"], why: "Bi-rahmatika astaghith: in Your mercy do I seek relief." },
        { q: "Al-Hayy and Al-Qayyum are names of Allah he ﷺ called on.", tf: true, why: "O Living, O Self-Sustaining Sustainer, he ﷺ would say when worried." }
      ]
    }
  ]
};

export const AQIDAH_TRIALS_UNITS: DeepUnit[] = [TRIALS];
