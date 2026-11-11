import { hadith, type DeepUnit } from "./deepKit";

// One more Aqidah unit: faith in the heart, from Jami at-Tirmidhi. Trusting Allah while doing your part, acting for
// His sake, good deeds before the end, faith that rises and falls, and repentance while there is time. Every card is
// one sahih or hasan hadith with its number, narrator and grade, and its exact English words to highlight, and none
// of them is taught anywhere else in the app.

const FAITH: DeepUnit = {
  key: "aqidah-faith-in-the-heart",
  topicId: "aqidah",
  branchId: "aqidah-faith-in-the-heart",
  branch: { title: "Faith in the heart", description: "Tie your camel and trust Allah, act for His sake, good deeds before the end, a time for this and a time for that, and repenting in time." },
  name: "faith in the heart",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "tie-it-and-trust",
      title: "Tie it, and trust Allah",
      line: "Tie your camel, then put your trust in Allah.",
      facts: ["Told by Anas ibn Malik", "Tawakkul: trusting Allah"],
      source: hadith("tirmidhi", "2517", "Anas ibn Malik", "Hasan (Al-Albani)", "Anas said: a man asked, O Messenger of Allah, shall I tie my camel and trust in Allah, or leave it loose and trust in Allah? He ﷺ said: tie it, and trust in Allah.", "O Messenger of Allah! Shall I tie it and rely"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ tell the man to do with his camel?", a: "Tie it, and trust Allah", wrong: ["Leave it loose", "Sell it at once", "Give it to a friend"], why: "Tie it and rely upon Allah, he ﷺ said." },
        { q: "What is the lesson about trusting Allah?", a: "Do your part, then trust Him", wrong: ["Do nothing and wait", "Trust only yourself", "Worry about everything"], why: "The man asked whether to tie it or leave it loose and trust Allah." },
        { q: "Trusting Allah means you never need to take care.", tf: false, why: "No. Tie it and rely upon Allah: take care, and trust Him." }
      ]
    },
    {
      slug: "for-the-sake-of-allah",
      title: "For the sake of Allah",
      line: "Give and love for Allah's sake, and faith is made perfect.",
      facts: ["Told by Mu'adh ibn Anas al-Juhani", "Five things, all for Allah"],
      source: hadith("tirmidhi", "2521", "Mu'adh ibn Anas al-Juhani", "Hasan (Al-Albani)", "The Prophet ﷺ said: whoever gives for the sake of Allah, holds back for the sake of Allah, loves for the sake of Allah, dislikes for the sake of Allah, and marries for the sake of Allah has perfected his faith.", "Whoever gives for the sake of Allah, withholds for the sake of Allah, loves for the sake of Allah"),
      difficulty: 2,
      questions: [
        { q: "Whose faith is made perfect, he ﷺ said?", a: "Who acts for the sake of Allah", wrong: ["Who owns the most", "Who talks the most", "Who is the strongest"], why: "Whoever gives, withholds and loves for the sake of Allah." },
        { q: "Which of these did he ﷺ name as done for Allah?", a: "Giving and loving", wrong: ["Sleeping and eating", "Running and riding", "Buying and selling"], why: "He ﷺ also named holding back, and marrying, for the sake of Allah." },
        { q: "Love for the sake of Allah is part of faith.", tf: true, why: "Whoever loves for the sake of Allah has perfected his faith, he ﷺ said." }
      ]
    },
    {
      slug: "good-before-the-end",
      title: "Good deeds before the end",
      line: "When Allah wants good for someone, He uses him for good deeds.",
      facts: ["Told by Anas ibn Malik", "The Companions asked: how?"],
      source: hadith("tirmidhi", "2142", "Anas ibn Malik", "Sahih (Al-Albani)", "The Prophet ﷺ said: when Allah wants good for a servant, He puts him to work. They asked: how does He put him to work, O Messenger of Allah? He said: He guides him to do righteous deeds before his death.", "By making him meet up with the righteous deeds before death"),
      difficulty: 2,
      questions: [
        { q: "What does Allah do for one He wants good for?", a: "Puts him to work in good deeds", wrong: ["Gives him a long rest", "Makes him rich at once", "Lets him do as he likes"], why: "He puts him in action: He guides him to righteous deeds." },
        { q: "When does Allah guide him to these good deeds?", a: "Before his death", wrong: ["Only in his youth", "Only on Fridays", "After he dies"], why: "By making him meet up with the righteous deeds before death." },
        { q: "Doing good deeds is a sign that Allah wants good for you.", tf: true, why: "When Allah wants good for a servant, He puts him to work in good." }
      ]
    },
    {
      slug: "hanzalah",
      title: "A time for this, a time for that",
      line: "A time for this and a time for that, he ﷺ told Hanzalah.",
      facts: ["Told by Hanzalah al-Usaidi", "One of his ﷺ scribes"],
      source: hadith("tirmidhi", "2514", "Hanzalah al-Usaidi", "Sahih (Al-Albani)", "Hanzalah feared he had become a hypocrite: with the Prophet ﷺ they remembered Paradise and the Fire as if they could see them, but at home, busy with family and work, they forgot much. Abu Bakr said the same happened to him. The Prophet ﷺ said: if you stayed as you are with me, the angels would shake your hands; but, Hanzalah, there is a time for this and a time for that.", "There is a time for this and a time for that"),
      difficulty: 2,
      questions: [
        { q: "Why was Hanzalah crying?", a: "He feared he was a hypocrite", wrong: ["He had lost his camel", "He was very hungry", "He had missed a prayer"], why: "With him ﷺ they felt Paradise near, but at home they forgot much." },
        { q: "Who would shake their hands if that feeling never left?", a: "The angels", wrong: ["The kings", "The prophets", "The jinn"], why: "In your gatherings, upon your beds and in your paths." },
        { q: "He ﷺ told Hanzalah he was a hypocrite.", tf: false, why: "No. He ﷺ told Hanzalah: there is a time for this and a time for that." }
      ]
    },
    {
      slug: "repent-in-time",
      title: "Repent while there is time",
      line: "Allah accepts repentance until the very last breath.",
      facts: ["Told by Abdullah ibn Umar", "Before the soul reaches the throat"],
      source: hadith("tirmidhi", "3537", "Abdullah ibn Umar", "Hasan (Al-Albani)", "The Prophet ﷺ said: Allah accepts the repentance of His servant until his soul reaches his throat at death.", "Indeed Allah accepts the repentance of a slave as long as"),
      difficulty: 1,
      questions: [
        { q: "Until when does Allah accept a servant's repentance?", a: "Until his last breath", wrong: ["Only until age forty", "Only in Ramadan", "Only once in a life"], why: "As long as his soul does not reach his throat, he ﷺ said." },
        { q: "What should a sinner do while he still lives?", a: "Repent to Allah", wrong: ["Lose all hope", "Wait for old age", "Hide his sins forever"], why: "Allah accepts the repentance of a slave until his soul reaches his throat." },
        { q: "A person who sinned a lot can never repent.", tf: false, why: "No. Allah accepts repentance from a person until his last breath." }
      ]
    }
  ]
};

export const AQIDAH_FAITH_UNITS: DeepUnit[] = [FAITH];
