import { hadith, type DeepUnit } from "./deepKit";

// One more unit on the kids' Hadith path: being someone people can trust, from Jami at-Tirmidhi, Sahih al-Bukhari,
// Sunan an-Nasa'i and Sunan Abi Dawud. Advice asked for is a trust, a believer people trust with what they own,
// borrowing only to pay back, not keeping a lender waiting, paying back with thanks, and weighing out a little more.
// Every card is one sahih or hasan hadith with its number, narrator and grade, and its exact English words to
// highlight, and none of them is taught anywhere else in the app.

const TRUST: DeepUnit = {
  key: "kids-trust",
  topicId: "hadith",
  branchId: "hadith-trust",
  branch: { title: "Someone people can trust", description: "Advice is a trust, trusted by all, borrow only to pay back, don't keep them waiting, say thank you, and weigh a little more." },
  name: "someone people can trust",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "advice-is-a-trust",
      title: "Advice is a trust",
      line: "When a friend asks your advice, give your honest best.",
      facts: ["Told by Abu Hurairah", "Counsel: advice that someone asks you for", "Entrusted: given something to look after"],
      source: hadith("tirmidhi", "2822", "Abu Hurairah", "Sahih (Al-Albani)", "Abu Hurairah said: the Messenger of Allah ﷺ said: the one whose advice is asked for is trusted with it.", "The one whose counsel is sought is entrusted"),
      difficulty: 1,
      questions: [
        { q: "When someone asks you for advice, what are you given?", a: "A trust", wrong: ["A prize", "A secret code", "A test paper"], why: "The one whose counsel is sought is entrusted, he ﷺ said." },
        { q: "A friend asks which choice is best. What do you do?", a: "Give honest, careful advice", wrong: ["Say anything quickly", "Laugh at the question", "Tell others his problem"], why: "The one asked for counsel is trusted with it, so give him your honest best." },
        { q: "Giving bad advice on purpose breaks a trust.", tf: true, why: "The one whose counsel is sought is entrusted, the Messenger of Allah ﷺ said." }
      ]
    },
    {
      slug: "trusted-by-everyone",
      title: "Trusted by everyone",
      line: "People trust a believer with their lives and what they own.",
      facts: ["Told by Abu Hurairah", "Wealth: the money and things people own", "People feel safe leaving things with him"],
      source: hadith("tirmidhi", "2627", "Abu Hurairah", "Hasan Sahih (Al-Albani)", "Abu Hurairah said: the Messenger of Allah ﷺ said: the Muslim is the one whose tongue and hand the Muslims are safe from, and the believer is the one whom people trust with their lives and their wealth.", "the believer is the one with whom the people trust their blood and their wealth"),
      difficulty: 1,
      questions: [
        { q: "Whom do people trust with their lives and wealth?", a: "The believer", wrong: ["The richest man", "The loudest man", "The strongest man"], why: "The believer is the one with whom the people trust their blood and their wealth." },
        { q: "Your friend leaves his bag with you. What do you do?", a: "Keep it safe and give it back", wrong: ["Look through it", "Use what is inside", "Leave it anywhere"], why: "A believer is one whom people trust with their wealth, he ﷺ said." },
        { q: "A believer keeps safe what people leave with him.", tf: true, why: "The believer is the one with whom the people trust their wealth, he ﷺ said." }
      ]
    },
    {
      slug: "borrow-only-to-pay-back",
      title: "Borrow only to pay back",
      line: "Borrow only meaning to pay back, and Allah will help you.",
      facts: ["Told by Abu Hurairah", "Intention: what you mean to do", "Allah helps the one who means to repay"],
      source: hadith("bukhari", "2387", "Abu Hurairah", "Sahih", "Abu Hurairah said: the Prophet ﷺ said: whoever takes people's money meaning to pay it back, Allah will pay it back for him; and whoever takes it meaning to waste it, Allah will ruin him.", "Whoever takes the money of the people with the intention of repaying it, Allah will repay it on his behalf"),
      difficulty: 1,
      questions: [
        { q: "What should you mean to do when you borrow?", a: "Pay it back", wrong: ["Keep it forever", "Lose it somewhere", "Give it away"], why: "Whoever takes the money of the people with the intention of repaying it, he ﷺ said." },
        { q: "Who helps the one who means to repay?", a: "Allah", wrong: ["A rich friend", "Good luck", "The shop owner"], why: "With the intention of repaying it, Allah will repay it on his behalf, he ﷺ said." },
        { q: "Borrowing with no plan to give it back is fine.", tf: false, why: "No. Whoever borrows to waste it and not give it back, Allah will spoil him, he ﷺ said." }
      ]
    },
    {
      slug: "dont-keep-them-waiting",
      title: "Don't keep them waiting",
      line: "If you can pay back now, don't make them wait.",
      facts: ["Told by Abu Hurairah", "Delay: putting off what you should do", "He ﷺ called this delay wrongdoing"],
      source: hadith("bukhari", "2400", "Abu Hurairah", "Sahih", "Abu Hurairah said: the Messenger of Allah ﷺ said: when someone who has the means delays paying back what he owes, that is wrongdoing.", "in repaying debts by a wealthy person is injustice"),
      difficulty: 1,
      questions: [
        { q: "One who can pay back but delays is doing what?", a: "Wrongdoing", wrong: ["A kindness", "A clever thing", "A good deed"], why: "Delay in repaying debts by a wealthy person is injustice, he ﷺ said." },
        { q: "You borrowed a book and finished it. What now?", a: "Give it back soon", wrong: ["Keep it a while more", "Wait until they ask twice", "Lend it to someone else"], why: "Delay in repaying by one who is able is injustice, he ﷺ said." },
        { q: "Making someone wait for what you owe, when you can pay, is fine.", tf: false, why: "No. When one who can pay delays it, that is injustice, he ﷺ said." }
      ]
    },
    {
      slug: "pay-back-and-say-thanks",
      title: "Pay back, and say thank you",
      line: "When you pay back a loan, thank the one who lent it.",
      facts: ["Told by Abdullah ibn Abi Rabi'ah", "He ﷺ borrowed forty thousand from him", "He ﷺ asked Allah to bless his family and wealth"],
      source: hadith("nasai", "4683", "Abdullah ibn Abi Rabi'ah", "Sahih (Al-Albani)", "Abdullah ibn Abi Rabi'ah said: the Prophet ﷺ borrowed forty thousand from me. Then wealth came to him, and he paid me back and said: may Allah bless you in your family and your wealth; the reward for a loan is thanks and repayment.", "the reward for lending is praise and repayment"),
      difficulty: 2,
      questions: [
        { q: "What is the reward for lending, he ﷺ said?", a: "Thanks and being paid back", wrong: ["Extra money", "A big feast", "A new house"], why: "The reward for lending is praise and repayment, he ﷺ said." },
        { q: "What did he ﷺ say as he paid the man back?", a: "May Allah bless your family and wealth", wrong: ["Do not lend again", "Now we are even", "Count it twice"], why: "May Allah bless your family and your wealth for you, he ﷺ said as he repaid." },
        { q: "He ﷺ paid back what he had borrowed.", tf: true, why: "Some wealth came to him, and he paid me back, Abdullah ibn Abi Rabi'ah said." }
      ]
    },
    {
      slug: "weigh-a-little-more",
      title: "Weigh a little more",
      line: "Weighing for someone? Give a little extra, not less.",
      facts: ["Told by Suwayd ibn Qays", "He ﷺ bought trousers from them", "A man weighed out the payment"],
      source: hadith("abudawud", "3336", "Suwayd ibn Qays", "Sahih (Al-Albani)", "Suwayd ibn Qays said: Makhrafah al-Abdi and I brought clothes from Hajar to Makkah. The Messenger of Allah ﷺ came walking to us and bargained with us for some trousers, and we sold them to him. A man there weighed out payments for a wage, and he ﷺ said to him: weigh, and give more than the weight.", "said to him: Weigh out and give overweight"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ tell the man who was weighing?", a: "Weigh, and give a little more", wrong: ["Weigh, and keep some back", "Do not weigh at all", "Weigh it only once"], why: "He ﷺ said to him: weigh out and give overweight, Suwayd ibn Qays said." },
        { q: "What did he ﷺ buy from Suwayd and Makhrafah?", a: "Trousers", wrong: ["Dates", "A camel", "Perfume"], why: "He bargained with us for some trousers, and we sold them to him, Suwayd said." },
        { q: "When paying someone, giving a little less than you owe is fine.", tf: false, why: "No. Weigh out and give overweight, he ﷺ told the man paying for him." }
      ]
    }
  ]
};

export const KIDS_TRUST_UNITS: readonly DeepUnit[] = [TRUST];
