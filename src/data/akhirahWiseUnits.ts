import { hadith, type DeepUnit } from "./deepKit";

// One more Akhirah unit: how the wise look ahead to the next life, from Jami at-Tirmidhi, Sunan Ibn Majah and Sunan
// Abi Dawud. Uthman weeping at graves, the first stage of the Hereafter, the wisest believers who remember death,
// sins that seem small, Salman's fear of owning more than a rider's provision, his ﷺ choice of intercession, and the
// two sins punished in this world too. Every card is one sahih or hasan hadith with its number, narrator and grade,
// and its exact English words to highlight. Points the schools differ on are left out, and none of these hadith is
// taught anywhere else in the app.

const WISE: DeepUnit = {
  key: "akhirah-the-wise-look-ahead",
  topicId: "akhirah",
  branchId: "akhirah-the-wise-look-ahead",
  branch: { title: "The wise look ahead", description: "The grave as the first stage, the wisest believers, sins that seem small, a rider's provision, his ﷺ intercession, and two sins punished early." },
  name: "looking ahead to the next life",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "the-first-stage",
      title: "The first stage",
      line: "The grave is the first stage of the Hereafter.",
      facts: ["Told by Uthman ibn Affan", "He wept at graves until his beard was wet", "Saved there, what comes after is easier"],
      source: hadith("tirmidhi", "2308", "Uthman ibn Affan", "Hasan (Al-Albani)", "Hani, the freed slave of Uthman, said: when Uthman stood at a grave he wept until his beard was wet. He was asked: Paradise and the Fire are mentioned and you do not weep, yet you weep at this? He said: the Messenger of Allah ﷺ said: the grave is the first stage of the Hereafter. Whoever is saved from it, what comes after it is easier; and whoever is not saved from it, what comes after it is harder.", "the grave is the first stage among the stages of the Hereafter"),
      difficulty: 1,
      questions: [
        { q: "What did Uthman do when he stood at a grave?", a: "Wept until his beard was wet", wrong: ["Gave food to the poor", "Sat down to rest", "Told a long story"], why: "When Uthman stood at a grave, he would cry until his beard was soaked." },
        { q: "What is the grave, he ﷺ said?", a: "The first stage of the Hereafter", wrong: ["The end of everything", "A place to rest forever", "The whole of the Hereafter"], why: "The grave is the first stage among the stages of the Hereafter, he ﷺ said." },
        { q: "For one saved in the grave, what follows is easier.", tf: true, why: "If one is saved from it, then what comes after it is easier, he ﷺ said." }
      ]
    },
    {
      slug: "the-wisest-believers",
      title: "The wisest believers",
      line: "The wisest remember death most and prepare best for it.",
      facts: ["Told by Ibn Umar", "A man of the Ansar asked him ﷺ", "Best believer: the one with the best manners"],
      source: hadith("ibnmajah", "4259", "Ibn Umar", "Hasan (Al-Albani)", "Ibn Umar said: a man of the Ansar greeted the Prophet ﷺ and asked: O Messenger of Allah, which of the believers is best? He said: the one with the best manners. He asked: which of them is wisest? He said: the one who remembers death the most and prepares best for it. Those are the wisest.", "The one who remembers death the most and is best in preparing for it"),
      difficulty: 1,
      questions: [
        { q: "Which believer is best, he ﷺ said?", a: "The one with the best manners", wrong: ["The one who talks the most", "The one with the most wealth", "The one with the biggest house"], why: "He who has the best manners among them, he ﷺ said." },
        { q: "Which believers are the wisest, he ﷺ said?", a: "Those who remember death and prepare", wrong: ["Those who gather the most wealth", "Those who win every argument", "Those who never think of death"], why: "The one who remembers death the most and prepares best for it, he ﷺ said." },
        { q: "The wisest people remember death often and prepare for it.", tf: true, why: "Those are the wisest, he ﷺ said of those who remember death and prepare for it." }
      ]
    },
    {
      slug: "sins-that-seem-small",
      title: "Sins that seem small",
      line: "Beware of sins that seem small; Allah keeps account of them.",
      facts: ["Told by Aishah", "He ﷺ said it to Aishah", "A pursuer: one who follows to take account"],
      source: hadith("ibnmajah", "4243", "Aishah", "Sahih (Al-Albani)", "Aishah said: the Messenger of Allah ﷺ said to me: O Aishah, beware of deeds that are thought to be small, for they have a pursuer from Allah.", "deeds that are regarded as insignificant, for they have a pursuer from Allah"),
      difficulty: 1,
      questions: [
        { q: "What do sins that seem small have, he ﷺ said?", a: "A pursuer from Allah", wrong: ["No weight at all", "No record at all", "An easy excuse"], why: "Beware of deeds regarded as insignificant, for they have a pursuer from Allah, he ﷺ said." },
        { q: "Which deeds did he ﷺ tell Aishah to beware of?", a: "Those thought to be small", wrong: ["Those done by mistake", "Those already forgiven", "Those done long ago"], why: "O Aishah, beware of deeds that are regarded as insignificant, he ﷺ said." },
        { q: "A sin is nothing to worry about if it seems small.", tf: false, why: "No. Beware of sins that seem small, for they have a pursuer from Allah, he ﷺ said." }
      ]
    },
    {
      slug: "a-riders-provision",
      title: "A rider's provision",
      line: "Salman wept, fearing he owned more than a rider's provision.",
      facts: ["Told by Anas ibn Malik", "Sa'd visited Salman when he was ill", "Enough: what a rider carries for a trip"],
      source: hadith("ibnmajah", "4104", "Anas ibn Malik", "Sahih (Al-Albani)", "Anas said: Salman fell ill and Sa'd came to visit him, and Salman wept. Sa'd asked why he wept. Salman said: I do not weep out of longing for this world or dislike of the Hereafter, but the Messenger of Allah ﷺ advised us that enough for any of you is like a rider's provision, and I fear I have gone beyond it. And you, Sa'd, fear Allah when you judge, when you divide, and in all you set out to do.", "He advised me that something like the provision of a rider is sufficient for anyone of you"),
      difficulty: 2,
      questions: [
        { q: "How much of this world is enough, he ﷺ advised?", a: "A rider's provision", wrong: ["A full storehouse", "A large farm", "A house full of gold"], why: "Something like the provision of a rider is sufficient for anyone of you, he ﷺ advised." },
        { q: "Why did Salman weep when Sa'd visited him?", a: "He feared he had gone past that advice", wrong: ["He was afraid of being alone", "He missed his old home", "He was in great pain"], why: "He advised me and I think that I have transgressed, Salman said of his ﷺ advice." },
        { q: "Salman said he did not weep out of love for this world.", tf: true, why: "Not out of longing for this world or dislike of the Hereafter, Salman said." }
      ]
    },
    {
      slug: "he-chose-intercession",
      title: "He ﷺ chose intercession",
      line: "Offered half his ummah in Paradise, he ﷺ chose intercession.",
      facts: ["Told by Awf ibn Malik", "A choice from his Lord one night", "Intercession: asking Allah for others"],
      source: hadith("ibnmajah", "4317", "Awf ibn Malik", "Sahih (Al-Albani)", "Awf ibn Malik said: the Messenger of Allah ﷺ said: do you know what choice my Lord gave me tonight? He gave me the choice between half of my ummah entering Paradise and intercession, and I chose intercession. We said: O Messenger of Allah, pray that we are among its people. He said: it is for every Muslim.", "He gave me the choice between admitting half of my nation to Paradise and intercession, and I chose intercession"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ choose when his Lord gave him a choice?", a: "Intercession", wrong: ["Half his ummah in Paradise", "Great wealth on earth", "A long life on earth"], why: "Given the choice, he ﷺ chose intercession over half his nation entering Paradise." },
        { q: "Whom is his ﷺ intercession for, he ﷺ said?", a: "Every Muslim", wrong: ["Only the Companions", "Only the scholars", "Only the martyrs"], why: "They asked to be among its people; he ﷺ said: it is for every Muslim." },
        { q: "The Companions asked him ﷺ to pray that they be among its people.", tf: true, why: "Pray that we will be among its people, they said; he ﷺ said: it is for every Muslim." }
      ]
    },
    {
      slug: "two-sins-punished-early",
      title: "Two sins punished early",
      line: "Oppression and cutting ties are punished in this world too.",
      facts: ["Told by Abu Bakrah", "Punished early, and more in the next world", "Keep family ties and never wrong anyone"],
      source: hadith("abudawud", "4902", "Abu Bakrah", "Sahih (Al-Albani)", "Abu Bakrah said: the Prophet ﷺ said: no sin is more fitting for Allah to hasten its punishment in this world, along with what He stores up for the next world, than oppression and cutting family ties.", "in advance in this world along with what He stores up for him in the next world than oppression and severing ties of relationship"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ say about oppression and cutting family ties?", a: "They are punished soonest", wrong: ["They are small sins", "They are easily forgiven", "They bring no punishment"], why: "No sin is more fitted for punishment in this world than these two, he ﷺ said." },
        { q: "When are these two sins punished, he ﷺ said?", a: "In this world and the next", wrong: ["Only in the next world", "Only in this world", "Never at all"], why: "Punished in advance in this world, along with what He stores up in the next, he ﷺ said." },
        { q: "Cutting off family ties is a light matter.", tf: false, why: "No. No sin is more fitted for early punishment than oppression and cutting ties." }
      ]
    }
  ]
};

export const AKHIRAH_WISE_UNITS: readonly DeepUnit[] = [WISE];
