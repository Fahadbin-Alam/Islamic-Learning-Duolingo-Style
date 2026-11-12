import { hadith, type DeepUnit } from "./deepKit";

// One more Manners unit: the rights of others, from Jami at-Tirmidhi, Sunan Abi Dawud and Sunan Ibn Majah. A soul held
// by debt, the evil of bad blood between people, keeping apart from a brother for a year, what a son owes his father,
// the rights of orphans and women, and charity mixed with trade. Every card is one sahih or hasan hadith with its
// number, narrator and grade, and its exact English words to highlight. None of these hadith is taught anywhere else in
// the app.

const RIGHTS: DeepUnit = {
  key: "manners-rights-of-others",
  topicId: "manners",
  branchId: "manners-rights-of-others",
  branch: { title: "The rights of others", description: "A soul held by debt, the evil of bad blood, a year apart, what a son owes his father, orphans and women, and charity mixed with trade." },
  name: "the rights of others",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "a-soul-held-by-debt",
      title: "A soul held by debt",
      line: "A believer's soul is held by his debt until it is settled.",
      facts: ["Told by Abu Hurairah", "A debt: a right owed to someone", "Until the debt is settled for him"],
      source: hadith("tirmidhi", "1078", "Abu Hurairah", "Sahih (Al-Albani)", "Abu Hurairah said: the Messenger of Allah ﷺ said: the believer's soul is suspended by his debt until it is settled for him.", "soul is suspended by his debt until it is settled for him"),
      difficulty: 2,
      questions: [
        { q: "What is the believer's soul suspended by, he ﷺ said?", a: "A debt not yet paid", wrong: ["A trip not yet taken", "A meal not yet eaten", "A book not yet read"], why: "His soul is suspended by his debt, he ﷺ said, until it is settled for him." },
        { q: "Until when does his debt hold his soul?", a: "Until the debt is settled", wrong: ["Until the next Eid", "Until a year passes", "Until the next Friday"], why: "His soul stays suspended until the debt is settled for him, he ﷺ said." },
        { q: "A debt left unpaid can hold back a believer's soul.", tf: true, why: "The believer's soul is suspended by his debt until it is settled for him." }
      ]
    },
    {
      slug: "beware-of-bad-blood",
      title: "Beware of bad blood",
      line: "Beware of ill will between people: it is the Haliqah.",
      facts: ["Told by Abu Hurairah", "Ill will: enmity and hatred", "Al-Haliqah: what cuts away the religion"],
      source: hadith("tirmidhi", "2508", "Abu Hurairah", "Hasan (Al-Albani)", "Abu Hurairah said: the Prophet ﷺ said: beware of ill will between each other, for it is the Haliqah. Ill will between each other means enmity and hatred, and the Haliqah, it is said, is what cuts away the religion.", "Beware of evil with each other, for indeed it is the Haliqah"),
      difficulty: 3,
      questions: [
        { q: "What did he ﷺ call ill will between people?", a: "The Haliqah", wrong: ["A small matter", "A good test", "A kind of joke"], why: "Beware of evil with each other, for indeed it is the Haliqah, he ﷺ said." },
        { q: "What does ill will between people mean?", a: "Enmity and hatred", wrong: ["Jokes and games", "Gifts and visits", "Trade and work"], why: "Evil with each other is enmity and hatred, the explanation in the source says." },
        { q: "The Haliqah, it is said, cuts away at the religion.", tf: true, why: "Ill will between people is the Haliqah, which is said to sever the religion." }
      ]
    },
    {
      slug: "a-year-apart",
      title: "A year apart",
      line: "Cutting off a brother for a year is like shedding his blood.",
      facts: ["Told by Abu Khirash as-Sulami", "Keeping apart from a brother for a year", "As serious as shedding his blood"],
      source: hadith("abudawud", "4915", "Abu Khirash as-Sulami", "Sahih (Al-Albani)", "Abu Khirash as-Sulami heard the Messenger of Allah ﷺ say: whoever keeps apart from his brother for a year, it is like shedding his blood.", "If one keeps apart from his brother for a year, it is like shedding his blood"),
      difficulty: 2,
      questions: [
        { q: "Keeping apart from a brother for how long is like shedding his blood?", a: "A whole year", wrong: ["A whole hour", "A whole morning", "A single day"], why: "A year of keeping apart is as grave as shedding his blood, Abu Khirash heard him ﷺ say." },
        { q: "What is keeping apart for a year like, he ﷺ said?", a: "Shedding his blood", wrong: ["Giving him a gift", "Visiting him often", "Praying for him"], why: "Keeping apart from his brother for a year is like shedding his blood, he ﷺ said." },
        { q: "Shunning a Muslim brother for a long time is a light matter.", tf: false, why: "No. Keeping apart from a brother for a year is like shedding his blood." }
      ]
    },
    {
      slug: "what-a-son-owes-his-father",
      title: "What a son owes his father",
      line: "A son repays his father only by freeing him from slavery.",
      facts: ["Told by Abu Hurairah", "If he finds his father a slave", "He buys him and sets him free"],
      source: hadith("tirmidhi", "1906", "Abu Hurairah", "Sahih (Al-Albani)", "Abu Hurairah said: the Messenger of Allah ﷺ said: a son cannot repay his father unless he finds him a slave, buys him and sets him free.", "A son could not do enough for his father, unless he found him as a slave and purchased him to set him free"),
      difficulty: 3,
      questions: [
        { q: "How can a son fully repay his father, he ﷺ said?", a: "By buying and freeing him", wrong: ["By giving him a meal", "By visiting him once", "By sending him a letter"], why: "Unless he found him as a slave and purchased him to set him free, he ﷺ said." },
        { q: "What must the son do after buying him?", a: "Setting him free", wrong: ["Selling him to another", "Making him work", "Sending him away"], why: "He purchased him to set him free, and only that repays his father, he ﷺ said." },
        { q: "A son can easily repay all that his father did.", tf: false, why: "No. A son could not do enough for his father, unless he set him free from slavery." }
      ]
    },
    {
      slug: "orphans-and-women",
      title: "Orphans and women",
      line: "He ﷺ warned against failing the rights of orphans and women.",
      facts: ["Told by Abu Hurairah", "He ﷺ called Allah to witness", "The two weak ones: orphans and women"],
      source: hadith("ibnmajah", "3678", "Abu Hurairah", "Hasan (Al-Albani)", "Abu Hurairah said: the Messenger of Allah ﷺ said: O Allah, I bear witness that I have warned about failing the rights of the two weak ones: orphans and women.", "the rights of the two weak ones: Orphans and women"),
      difficulty: 2,
      questions: [
        { q: "Who are the two weak ones he ﷺ named?", a: "Orphans and women", wrong: ["Kings and judges", "Traders and farmers", "Poets and singers"], why: "The rights of the two weak ones, orphans and women, he ﷺ said." },
        { q: "Whom did he ﷺ call to witness this warning?", a: "Allah", wrong: ["The angels", "The kings", "The tribes"], why: "O Allah, bear witness that I have issued a warning, he ﷺ said." },
        { q: "The rights of orphans and women must be carefully kept.", tf: true, why: "He ﷺ warned about failing the rights of the two weak ones: orphans and women." }
      ]
    },
    {
      slug: "charity-mixed-with-trade",
      title: "Charity mixed with trade",
      line: "O merchants, mix some charity with your selling.",
      facts: ["Told by Qays ibn Abi Gharazah", "They were once called brokers", "He ﷺ gave them a better name: merchants"],
      source: hadith("ibnmajah", "2145", "Qays ibn Abi Gharazah", "Sahih (Al-Albani)", "Qays ibn Abi Gharazah said: we used to be called brokers, then the Messenger of Allah ﷺ passed by us and called us by a better name. He said: O merchants, selling brings false oaths and idle talk, so mix some charity with it.", "oaths and idle talk, so mix some charity with it"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ tell the merchants to mix with selling?", a: "Some charity", wrong: ["Some rest", "Some travel", "Some farming"], why: "Selling involves oaths and idle talk, so mix some charity with it, he ﷺ said." },
        { q: "What new name did he ﷺ give the brokers?", a: "Merchants", wrong: ["Farmers", "Tailors", "Builders"], why: "He called them by a better name than brokers: O merchants." },
        { q: "Selling can bring idle talk and false oaths.", tf: true, why: "Selling involves false oaths and idle talk, so mix some charity with it, he ﷺ said." }
      ]
    }
  ]
};

export const MANNERS_RIGHTS_UNITS: readonly DeepUnit[] = [RIGHTS];
