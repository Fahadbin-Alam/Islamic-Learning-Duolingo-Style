import { hadith, type DeepUnit } from "./deepKit";

// One more book for the Bukhari and Muslim topic: al-Bukhari's Book of Gifts. A debt repaid with more, a promise
// kept after he ﷺ passed away, gifts given to a zakat collector, a dress every bride borrowed, one sheep shared among
// 130 people, and a silk cloak passed on. Every card is one sahih hadith of that book (number as sunnah.com gives it)
// with its exact English words to highlight, and none of them is taught anywhere else in the app.

const GIFTS: DeepUnit = {
  key: "book-hibah",
  topicId: "sahihayn",
  branchId: "hadith-book-hibah",
  branch: { title: "The Book of Gifts", description: "From al-Bukhari's Book of Gifts: a debt repaid with more, a promise kept, gifts to a worker, a dress to borrow, one sheep for 130, and a cloak passed on." },
  name: "the Book of Gifts",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "repay-in-the-best-way",
      title: "Repay in the best way",
      line: "He ﷺ paid back an older camel than the one he owed.",
      facts: ["Told by Abu Hurairah", "The owner asked for it harshly", "He ﷺ said: he has a right to ask"],
      source: hadith("bukhari", "2609", "Abu Hurairah", "Sahih", "Abu Hurairah said: the Prophet ﷺ owed a man a young camel, and the man came and asked for it harshly. He ﷺ said: one who has a right may ask for it. Then he gave him a camel older than his own and said: the best of you is the one who repays his debt in the best way.", "The best amongst you is he who repays his debts in the most handsome way"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ give the man back?", a: "An older camel than his", wrong: ["A camel just like his", "A horse and a saddle", "A bag of silver coins"], why: "He ﷺ gave him an older camel than his camel, Abu Hurairah said." },
        { q: "Who is the best of people, he ﷺ said, when it comes to debts?", a: "Whoever repays in the best way", wrong: ["Whoever never borrows", "Whoever lends the most", "Whoever owns the most camels"], why: "The best amongst you is he who repays his debts in the most handsome way." },
        { q: "He ﷺ said the owner had a right to ask for his camel.", tf: true, why: "No doubt, he who has a right can demand it, he ﷺ said." }
      ]
    },
    {
      slug: "a-promise-kept",
      title: "A promise kept for Jabir",
      line: "Abu Bakr gave Jabir what the Prophet ﷺ had promised him.",
      facts: ["Told by Jabir ibn Abdullah", "The money came from Bahrain", "Abu Bakr gave him three handfuls"],
      source: hadith("bukhari", "2598", "Jabir ibn Abdullah", "Sahih", "Jabir said: the Prophet ﷺ told me: when the money of Bahrain comes, I will give you this much, and he pointed three times with his hands. But he ﷺ passed away before it came. When it came, Abu Bakr had it announced that anyone the Prophet ﷺ owed, or had promised something, should come to him. I went and told him what the Prophet ﷺ had promised me, and Abu Bakr gave me three handfuls.", "or was promised to be given something, should come to Abu Bakr"),
      difficulty: 2,
      questions: [
        { q: "Where was the promised money coming from?", a: "Bahrain", wrong: ["Yemen", "Egypt", "Sham"], why: "When the funds of Bahrain come, I will give you this much, he ﷺ told Jabir." },
        { q: "Who kept the promise after the Prophet ﷺ passed away?", a: "Abu Bakr", wrong: ["Bilal ibn Rabah", "Zayd ibn Thabit", "Abu Talhah"], why: "Abu Bakr had it announced that anyone the Prophet ﷺ had promised should come to him." },
        { q: "Abu Bakr gave Jabir three handfuls of the money.", tf: true, why: "On that Abu Bakr gave me three handfuls, Jabir said." }
      ]
    },
    {
      slug: "gifts-for-the-collector",
      title: "Gifts for the collector",
      line: "He ﷺ asked: would the gifts have come if he stayed home?",
      facts: ["Told by Abu Humaid as-Sa'idi", "Ibn al-Lutbiyyah collected the zakat", "He said: this was given to me"],
      source: hadith("bukhari", "2597", "Abu Humaid as-Sa'idi", "Sahih", "Abu Humaid said: the Prophet ﷺ sent a man called Ibn al-Lutbiyyah to collect the zakat. When he came back he said: this is for you, and this was given to me as a gift. He ﷺ said: why did he not stay in his father's or mother's house, to see whether gifts would come to him or not? Whoever takes anything unlawfully from it will carry it on his neck on the Day of Resurrection. Then he raised his hands and said three times: O Allah, have I not conveyed?", "to see whether he would be given presents or not"),
      difficulty: 2,
      questions: [
        { q: "What job was Ibn al-Lutbiyyah sent to do?", a: "Collect the zakat", wrong: ["Teach the Quran", "Lead the people in prayer", "Guard the city"], why: "The Prophet ﷺ appointed a man from Al-Azd to collect the zakat, Abu Humaid said." },
        { q: "Where did he ﷺ say the man should have stayed?", a: "In his parents' house", wrong: ["In the masjid", "On his farm", "In the market"], why: "Why did he not stay in his father's or mother's house, he ﷺ asked." },
        { q: "A worker may keep the gifts given to him because of his job.", tf: false, why: "No. He ﷺ asked whether the gifts would have come to him if he sat at home." }
      ]
    },
    {
      slug: "a-dress-to-borrow",
      title: "A dress every bride borrowed",
      line: "In his ﷺ time, every bride borrowed Aishah's dress.",
      facts: ["Told by Ayman", "It was a coarse dress of five dirhams", "Her servant girl would not even wear it at home"],
      source: hadith("bukhari", "2628", "Ayman", "Sahih", "Ayman said: I went to Aishah while she was wearing a coarse dress worth five dirhams. She said: look at my servant girl, who will not wear it at home. Yet in the time of the Messenger of Allah ﷺ I had a dress like it, and no woman getting ready for her husband failed to send to me to borrow it.", "I had a similar dress which no woman desiring to appear elegant"),
      difficulty: 2,
      questions: [
        { q: "How much was Aishah's coarse dress worth?", a: "Five dirhams", wrong: ["Fifty dirhams", "One gold dinar", "A hundred dirhams"], why: "She was wearing a coarse dress costing five dirhams, Ayman said." },
        { q: "Who came to borrow her dress in his ﷺ time?", a: "Brides getting ready", wrong: ["Women going to the market", "Travellers on a long journey", "Girls going to the masjid"], why: "No woman getting ready for her husband failed to borrow it from me, Aishah said." },
        { q: "Aishah's servant girl would not wear the dress at home.", tf: true, why: "Look at my servant girl, who will not wear it at home, Aishah said." }
      ]
    },
    {
      slug: "a-share-for-everyone",
      title: "A share for everyone",
      line: "He ﷺ shared one sheep among 130, saving shares for the absent.",
      facts: ["Told by Abdur-Rahman ibn Abi Bakr", "A tall man came driving sheep", "All of them ate their fill"],
      source: hadith("bukhari", "2618", "Abdur-Rahman ibn Abi Bakr", "Sahih", "Abdur-Rahman said: we were 130 men with the Prophet ﷺ, and he asked if anyone had food. A man had about a sa' of wheat, and it was made into dough. Then a tall pagan came driving sheep, and he ﷺ asked him: will you sell, or give it as a gift? He said: sell. So he ﷺ bought a sheep, and it was made ready to eat. By Allah, he ﷺ gave every one of the 130 a piece; he gave those who were there, and kept the shares of those who were away. Then he put the meat in two big bowls, all of them ate their fill, and food was left over.", "he gave all those of them who were present; and kept the shares of those who were absent"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ ask the man driving the sheep?", a: "To sell one or give it as a gift", wrong: ["To join them on the road", "To show them the way", "To bring them some water"], why: "Will you sell us a sheep or give it as a present, he ﷺ asked." },
        { q: "What did he ﷺ do for the people who were away?", a: "He kept their shares for them", wrong: ["He saved them some dates", "He sent a man to call them", "He waited for them at the well"], why: "He gave all those who were present, and kept the shares of those who were absent." },
        { q: "After everyone ate their fill, food was still left over.", tf: true, why: "All of them ate to their fill, and more food was left in the two basins." }
      ]
    },
    {
      slug: "to-give-not-to-wear",
      title: "Not to wear, but to give",
      line: "Umar gave a silk cloak to his brother in Makkah.",
      facts: ["Told by Abdullah ibn Umar", "The cloak was a gift from him ﷺ", "His brother was not yet Muslim"],
      source: hadith("bukhari", "2619", "Abdullah ibn Umar", "Sahih", "Ibn Umar said: Umar saw a silk cloak for sale and asked the Prophet ﷺ to buy it to wear on Fridays and when delegations came. He ﷺ said: this is worn by one who has no share in the Hereafter. Later he ﷺ was given some silk cloaks and sent one to Umar. Umar said: how can I wear it, after what you said about it? He ﷺ said: I did not give it to you to wear, but to sell or to give to someone. So Umar sent it to his brother in Makkah, before his brother became Muslim.", "I have not given it to you to wear, but to sell or to give to someone else"),
      difficulty: 2,
      questions: [
        { q: "Why did he ﷺ send Umar the silk cloak?", a: "To sell or to give away", wrong: ["To wear on Fridays", "To wear when guests came", "To keep in his house"], why: "I have not given it to you to wear, but to sell or to give to someone else, he ﷺ said." },
        { q: "Who did Umar give the cloak to?", a: "His brother in Makkah", wrong: ["His son Abdullah", "A poor man in Madinah", "Abu Bakr"], why: "Umar sent it to his brother at Makkah, before his brother became Muslim." },
        { q: "Men may wear silk clothes.", tf: false, why: "No. He ﷺ said silk is worn by one who has no share in the Hereafter." }
      ]
    }
  ]
};

export const HADITH_BOOK_GIFTS_UNITS: DeepUnit[] = [GIFTS];
