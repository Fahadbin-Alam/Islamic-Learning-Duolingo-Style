import { hadith, type DeepUnit } from "./deepKit";

// One more Hajj unit: answering Allah's call, from Sunan Ibn Majah, Sunan an-Nasa'i and Sunan Abi Dawud. Hurrying to
// Hajj before something gets in the way, the three guests of Allah, a talbiyah to the God of Truth, taking provisions
// as well as trusting Allah, going back to make Hajj with your wife, and Hajj and Umrah as the jihad of the weak.
// Every card is one sahih or hasan hadith with its number, narrator and grade, and its exact English words to
// highlight, and none of them is taught anywhere else in the app. Fiqh details the schools differ on (who must travel
// with a woman, Hajj on behalf of others) are left out.

const LABBAYK: DeepUnit = {
  key: "hajj-answering-the-call",
  topicId: "hajj",
  branchId: "hajj-answering-the-call",
  branch: { title: "Answering Allah's call", description: "Hurrying to Hajj, the guests of Allah, a talbiyah to the God of Truth, taking provisions, going with your wife, and the jihad of the weak." },
  name: "answering Allah's call",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "hurry-to-hajj",
      title: "Hurry to Hajj",
      line: "Whoever means to do Hajj should hurry, before sickness or need.",
      facts: ["Told by Ibn Abbas, from al-Fadl", "He may fall sick or lose his ride", "Or some other need may come up"],
      source: hadith("ibnmajah", "2883", "Ibn Abbas", "Hasan (Al-Albani)", "Ibn Abbas said, from al-Fadl: the Messenger of Allah ﷺ said: whoever intends to perform Hajj, let him hurry to do it, for he may fall sick, lose his mount, or be faced with some need.", "Whoever intends to perform Hajj, let him hasten to do so, for he may fall sick, lose his mount, or be faced with some need"),
      difficulty: 1,
      questions: [
        { q: "What should someone who means to do Hajj do?", a: "Hurry to do it", wrong: ["Wait for old age", "Wait for a sign", "Wait for a friend"], why: "Whoever intends to perform Hajj, let him hasten to do so, he ﷺ said." },
        { q: "Which reason to hurry did he ﷺ give?", a: "He may fall sick", wrong: ["Hajj may get easier", "Prices may fall", "He may grow bored"], why: "For he may fall sick, lose his mount, or be faced with some need, he ﷺ said." },
        { q: "Losing your ride is one thing that can stop a Hajj.", tf: true, why: "He may fall sick, lose his mount, or be faced with some need, he ﷺ said." }
      ]
    },
    {
      slug: "the-guests-of-allah",
      title: "The guests of Allah",
      line: "Three are Allah's guests: the ghazi, the pilgrim, the mu'tamir.",
      facts: ["Told by Abu Hurairah", "The ghazi: who goes out in Allah's cause", "The mu'tamir: who performs Umrah"],
      source: hadith("nasai", "2625", "Abu Hurairah", "Sahih (Al-Albani)", "Abu Hurairah said: the Messenger of Allah ﷺ said: the guests of Allah are three: the one who goes out in Allah's cause, the one doing Hajj, and the one doing Umrah.", "The guests of Allah are three: The ghazi, the Hajj"),
      difficulty: 1,
      questions: [
        { q: "How many are the guests of Allah, he ﷺ said?", a: "Three", wrong: ["Two", "Seven", "Ten"], why: "The guests of Allah are three: the ghazi, the pilgrim and the mu'tamir." },
        { q: "Who is the mu'tamir?", a: "The one doing Umrah", wrong: ["The one selling food", "The one guarding a gate", "The one leading prayer"], why: "The guests of Allah are the ghazi, the pilgrim and the one who does Umrah." },
        { q: "A pilgrim on Hajj is one of the guests of Allah.", tf: true, why: "The guests of Allah are three, and the one doing Hajj is one of them, he ﷺ said." }
      ]
    },
    {
      slug: "o-god-of-truth",
      title: "O God of Truth",
      line: "Labbayka ilahal-haqq: here I am, O God of Truth.",
      facts: ["Told by Abu Hurairah", "Labbayka: here I am, answering You", "Ilahal-haqq: the God of Truth"],
      source: hadith("ibnmajah", "2920", "Abu Hurairah", "Sahih (Al-Albani)", "Abu Hurairah said: the Messenger of Allah ﷺ used to say in his talbiyah: labbayka ilahal-haqq, labbayk: here I am, O God of Truth, here I am.", "Here I am, O god of Truth, here I am"),
      difficulty: 2,
      questions: [
        { q: "What does labbayka mean?", a: "Here I am, answering You", wrong: ["Thank you, my Lord", "Forgive me, my Lord", "Allah is the Greatest"], why: "Labbaika ilahal-haqq: here I am, O God of Truth, here I am." },
        { q: "Who reported his ﷺ words ilahal-haqq in the talbiyah?", a: "Abu Hurairah", wrong: ["Anas ibn Malik", "Jabir ibn Abdullah", "Abdullah ibn Umar"], why: "Abu Hurairah said he ﷺ used to say: labbaika ilahal-haqq, labbaika." },
        { q: "The talbiyah is the call of a pilgrim answering Allah.", tf: true, why: "Labbaika means here I am; he ﷺ said: here I am, O God of Truth, here I am." }
      ]
    },
    {
      slug: "take-provisions",
      title: "Take provisions",
      line: "Some came to Hajj with no food; Allah said: take provisions.",
      facts: ["Told by Ibn Abbas", "People of Yemen came with no provisions", "Quran 2:197: the best provision is taqwa"],
      source: hadith("abudawud", "1730", "Ibn Abbas", "Sahih (Al-Albani)", "Ibn Abbas said: people, the people of Yemen, used to come for Hajj without bringing provisions, saying: we put our trust in Allah. So Allah sent down: and take provisions, but the best provision is taqwa (2:197).", "They would declare we put our trust in Allah. So Allah most high sent down"),
      difficulty: 2,
      questions: [
        { q: "What did they say when they came without provisions?", a: "We put our trust in Allah", wrong: ["We are too poor to buy any", "We forgot them at home", "We will buy them on the way"], why: "They would declare: we put our trust in Allah, Ibn Abbas said." },
        { q: "What is the best provision, Allah says in 2:197?", a: "Taqwa", wrong: ["Gold", "Dates", "Water"], why: "And take provisions, but the best provision is taqwa (Quran 2:197)." },
        { q: "Allah told the pilgrims to take provisions for the road.", tf: true, why: "So Allah sent down: and take provisions, but the best provision is taqwa." }
      ]
    },
    {
      slug: "go-with-your-wife",
      title: "Go with your wife",
      line: "Enlisted for battle, a man was told: go with your wife.",
      facts: ["Told by Ibn Abbas", "A Bedouin had signed up for a campaign", "His wife was setting out for Hajj"],
      source: hadith("ibnmajah", "2900", "Ibn Abbas", "Sahih (Al-Albani)", "Ibn Abbas said: a Bedouin came to the Prophet ﷺ and said: I have enlisted for such and such a campaign, and my wife is going for Hajj. He ﷺ said: go back with her.", "I have enlisted for such and such a military campaign and my wife is going for Hajj"),
      difficulty: 2,
      questions: [
        { q: "Where was the man's wife going?", a: "To Hajj", wrong: ["To the market", "To her parents' town", "To a wedding"], why: "My wife is going for Hajj, the Bedouin told him ﷺ." },
        { q: "What did he ﷺ tell the Bedouin?", a: "Go back with her", wrong: ["Stay with the army", "Send a servant with her", "Wait for next year"], why: "He ﷺ told him to go back and be with his wife on her Hajj." },
        { q: "The man had signed up for a military campaign.", tf: true, why: "I have enlisted for such and such a military campaign, the Bedouin said." }
      ]
    },
    {
      slug: "the-jihad-of-the-weak",
      title: "The jihad of the weak",
      line: "The jihad of the old, young, weak and women: Hajj and Umrah.",
      facts: ["Told by Abu Hurairah", "For the elderly, the young, the weak and women", "Their jihad is Hajj and Umrah"],
      source: hadith("nasai", "2626", "Abu Hurairah", "Hasan (Al-Albani)", "Abu Hurairah said: the Messenger of Allah ﷺ said: the jihad of the elderly, the young, the weak and women is Hajj and Umrah.", "Jihad of the elderly, the young, the weak, and women, is Hajj"),
      difficulty: 3,
      questions: [
        { q: "Whose jihad is Hajj and Umrah, he ﷺ said?", a: "The old, the young, the weak and women", wrong: ["Only kings and chiefs", "Only the rich", "Only soldiers"], why: "He ﷺ named the elderly, the young, the weak and women: their jihad is Hajj and Umrah." },
        { q: "What is the jihad of the weak, he ﷺ said?", a: "Hajj and Umrah", wrong: ["Fasting and silence", "Trading and travel", "Sleeping early"], why: "Jihad of the elderly, the young, the weak, and women, is Hajj and Umrah, he ﷺ said." },
        { q: "Hajj and Umrah are a struggle of effort for Allah's sake.", tf: true, why: "Jihad of the elderly, the young, the weak, and women, is Hajj and Umrah, he ﷺ said." }
      ]
    }
  ]
};

export const HAJJ_LABBAYK_UNITS: DeepUnit[] = [LABBAYK];
