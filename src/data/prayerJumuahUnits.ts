import { hadith, type DeepUnit } from "./deepKit";

// One more Prayer unit: coming to Jumu'ah, from Jami at-Tirmidhi and Sunan Abi Dawud. One Jumu'ah to the next wiping
// away what is between them, who must come, never leaving it out of carelessness, keeping good clothes for Friday, not
// stepping over people, and moving to another seat when sleepy. Every card is one sahih or hasan hadith with its
// number, narrator and grade, and its exact English words to highlight. Points the schools differ on (which hour of
// Friday is meant, praying while the imam speaks) are left out, and none of these hadith is taught anywhere else in
// the app.

const JUMUAH: DeepUnit = {
  key: "prayer-coming-to-jumuah",
  topicId: "prayer",
  branchId: "prayer-coming-to-jumuah",
  branch: { title: "Coming to Jumu'ah", description: "Friday to Friday, who must come, never leaving it, clothes for Friday, no stepping over people, and a new seat when sleepy." },
  name: "coming to Jumu'ah",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "from-friday-to-friday",
      title: "From Friday to Friday",
      line: "One Jumu'ah to the next wipes away the sins between them.",
      facts: ["Told by Abu Hurairah", "The five prayers wipe away sins too", "As long as major sins are avoided"],
      source: hadith("tirmidhi", "214", "Abu Hurairah", "Sahih (Al-Albani)", "Abu Hurairah said: the Messenger of Allah ﷺ said: the five prayers, and one Jumu'ah to the next, wipe away what is between them, as long as major sins are not done.", "to Al-Jumuah are atonement for what is between them, as long as the major sins have not been committed"),
      difficulty: 1,
      questions: [
        { q: "Besides Jumu'ah, what else wipes away sins between?", a: "The five daily prayers", wrong: ["A long sleep", "A walk in the market", "A big meal"], why: "The five prayers, and Jumu'ah to Jumu'ah, atone for what is between them, he ﷺ said." },
        { q: "What must a person keep away from, for this?", a: "The major sins", wrong: ["Sweet food", "Long journeys", "Cold water"], why: "As long as the major sins have not been committed, he ﷺ said of Jumu'ah." },
        { q: "Jumu'ah to Jumu'ah wipes out the sins between them.", tf: true, why: "Jumu'ah to Jumu'ah atones for what is between, if major sins are avoided, he ﷺ said." }
      ]
    },
    {
      slug: "who-must-come",
      title: "Who must come",
      line: "Jumu'ah is a duty on every Muslim, apart from four people.",
      facts: ["Told by Tariq ibn Shihab", "A slave, a woman, a boy, the sick", "Prayed together in congregation"],
      source: hadith("abudawud", "1067", "Tariq ibn Shihab", "Sahih (Al-Albani)", "Tariq ibn Shihab said: the Prophet ﷺ said: Jumu'ah in congregation is a duty on every Muslim, except four: a slave, a woman, a boy, and someone who is sick.", "The Friday prayer in congregation is a necessary duty for every Muslim, with four exceptions; a slave, a woman, a boy, and a sick person"),
      difficulty: 2,
      questions: [
        { q: "How many exceptions did he ﷺ name for Jumu'ah?", a: "Four", wrong: ["Ten", "Seven", "Twenty"], why: "A duty for every Muslim, with four exceptions, the Prophet ﷺ said." },
        { q: "Which of these did he ﷺ name as excused?", a: "Someone who is sick", wrong: ["A shopkeeper", "A teacher", "A tailor"], why: "A slave, a woman, a boy, and a sick person, he ﷺ named." },
        { q: "Jumu'ah is a duty on every Muslim with no exceptions.", tf: false, why: "No. Every Muslim must come, with four exceptions: a slave, a woman, a boy, and the sick." }
      ]
    },
    {
      slug: "do-not-leave-it",
      title: "Do not leave it",
      line: "Leaving three Jumu'ahs carelessly puts a seal on the heart.",
      facts: ["Told by Abu al-Ja'd ad-Damri", "Three Fridays in a row", "With no excuse, out of carelessness"],
      source: hadith("tirmidhi", "500", "Abu al-Ja'd ad-Damri", "Hasan Sahih (Al-Albani)", "Abu al-Ja'd ad-Damri said: the Messenger of Allah ﷺ said: whoever leaves Jumu'ah three times out of carelessness, Allah sets a seal upon his heart.", "without an excuse, then Allah sets a seal upon his heart"),
      difficulty: 2,
      questions: [
        { q: "What happens to one who leaves three Jumu'ahs?", a: "A seal on his heart", wrong: ["A stronger heart", "Nothing at all", "A lighter heart"], why: "Without an excuse, then Allah sets a seal upon his heart, he ﷺ said." },
        { q: "How many Jumu'ahs did he ﷺ name in this warning?", a: "Three", wrong: ["One", "Forty", "Ten"], why: "Whoever neglects the Friday prayer three times without an excuse, he ﷺ warned." },
        { q: "Missing Jumu'ah with no excuse is a small matter.", tf: false, why: "No. Leaving Jumu'ah three times without an excuse brings a seal on the heart." }
      ]
    },
    {
      slug: "clothes-for-friday",
      title: "Clothes for Friday",
      line: "If you can, keep a good set of clothes for Friday.",
      facts: ["Told by Abdullah ibn Salam", "He ﷺ said it on the minbar", "Besides the clothes you work in"],
      source: hadith("abudawud", "1078", "Abdullah ibn Salam", "Sahih (Al-Albani)", "Abdullah ibn Salam heard the Messenger of Allah ﷺ say on the minbar: what harm is there if one of you, if he can, keeps two garments for Friday besides the two he works in?", "What is the harm if any of you has two garments, if he can provide them, for Friday"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ say to keep for Friday, if you can?", a: "A special set of clothes", wrong: ["A bag of coins", "A new prayer mat", "A big lunch"], why: "What harm is there if any of you has two garments for Friday, he ﷺ said." },
        { q: "Which clothes are the Friday ones kept apart from?", a: "The clothes you work in", wrong: ["Sleeping clothes", "Winter coats", "Travel clothes"], why: "Two garments for Friday, besides the two garments for his daily work, he ﷺ said." },
        { q: "Wearing your best for Jumu'ah is a good thing.", tf: true, why: "What harm if one of you keeps two garments for Friday besides his work clothes, he ﷺ said." }
      ]
    },
    {
      slug: "no-stepping-over-people",
      title: "No stepping over people",
      line: "He ﷺ told a man stepping over people at Jumu'ah: sit down.",
      facts: ["Told by Abdullah ibn Busr", "During the khutbah on a Friday", "He ﷺ told the man: sit down"],
      source: hadith("abudawud", "1118", "Abdullah ibn Busr", "Sahih (Al-Albani)", "Abdullah ibn Busr said: a man came stepping over people while the Prophet ﷺ was giving the khutbah on Friday. The Prophet ﷺ said: sit down, you have bothered people.", "A man came and stepped over the people while the Prophet"),
      difficulty: 1,
      questions: [
        { q: "What did the man do while he ﷺ gave the khutbah?", a: "Stepped over people", wrong: ["Slept by the door", "Sold some dates", "Swept the floor"], why: "A man came and stepped over the people while the Prophet ﷺ was giving the khutbah." },
        { q: "What did he ﷺ tell the man to do?", a: "Sit down", wrong: ["Climb the minbar", "Call the iqamah", "Fetch some water"], why: "Sit down, you have annoyed the people, the Prophet ﷺ told him." },
        { q: "Stepping over people at Jumu'ah bothers them.", tf: true, why: "You have annoyed the people, he ﷺ told the man who stepped over them." }
      ]
    },
    {
      slug: "sleepy-change-your-seat",
      title: "Sleepy? Change your seat",
      line: "If you feel sleepy at Jumu'ah, move to another place.",
      facts: ["Told by Ibn Umar", "While sitting for Jumu'ah", "Moving helps you stay awake"],
      source: hadith("tirmidhi", "526", "Ibn Umar", "Sahih (Al-Albani)", "Ibn Umar said: the Prophet ﷺ said: when one of you feels sleepy at Jumu'ah, let him move from the place where he is sitting.", "When one of you becomes sleepy during the Friday prayer, then let him move from where he is sitting"),
      difficulty: 1,
      questions: [
        { q: "What should you do if sleepy while sitting at Jumu'ah?", a: "Move to another seat", wrong: ["Lie down to sleep", "Go home early", "Talk to stay awake"], why: "Let him move from where he is sitting, he ﷺ said of the sleepy one." },
        { q: "When did he ﷺ say to change your seat?", a: "When you feel sleepy", wrong: ["When it is cold", "When you are hungry", "When the sun is out"], why: "When one of you becomes sleepy during the Friday prayer, let him move, he ﷺ said." },
        { q: "Moving seats when sleepy at Jumu'ah follows his ﷺ advice.", tf: true, why: "When one of you becomes sleepy at Jumu'ah, let him move from his place, he ﷺ said." }
      ]
    }
  ]
};

export const PRAYER_JUMUAH_UNITS: readonly DeepUnit[] = [JUMUAH];
