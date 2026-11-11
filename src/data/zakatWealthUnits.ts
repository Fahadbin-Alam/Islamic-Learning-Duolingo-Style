import { hadith, type DeepUnit } from "./deepKit";

// One more Zakat unit: being wise with wealth, from Sahih al-Bukhari and Sunan Abi Dawud. Sharing what is spare, who
// comes first when you spend, a goat lent for its milk, Thawban's promise never to beg, a reward for spending on your
// own children, and taking what comes without greed. Every card is one sahih or hasan hadith with its number, narrator
// and grade, and its exact English words to highlight, and none of them is taught anywhere else in the app.

const WEALTH: DeepUnit = {
  key: "zakat-wise-wealth",
  topicId: "zakat",
  branchId: "zakat-wise-wealth",
  branch: { title: "Wise with wealth", description: "Sharing what is spare, yourself first, a goat lent for its milk, Thawban's promise, a reward for your own children, and taking without greed." },
  name: "being wise with wealth",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "share-what-is-spare",
      title: "Share what is spare",
      line: "Give your spare mount and supplies to one who has none.",
      facts: ["Told by Abu Sa'id al-Khudri", "A man on a journey looked around for help"],
      source: hadith("abudawud", "1663", "Abu Sa'id al-Khudri", "Sahih (Al-Albani)", "Abu Sa'id said: we were on a journey with the Messenger of Allah ﷺ when a man came on his camel and kept turning it right and left. He ﷺ said: whoever has a spare mount, let him give it to one who has no mount, and whoever has spare supplies, let him give them to one who has none. We came to think that none of us had a right to anything spare.", "he who has a spare riding beast should give it to him who has no riding beast"),
      difficulty: 2,
      questions: [
        { q: "What should you do with a spare mount, he ﷺ said?", a: "Give it to one who has none", wrong: ["Sell it at a good price", "Keep it for a race", "Rent it out for money"], why: "He who has a spare riding beast should give it to him who has none." },
        { q: "What did the Companions come to feel about anything spare?", a: "No one had a right to keep it", wrong: ["It was best kept hidden", "It should be sold at once", "It was only for the rich"], why: "We thought that none of us had a right in surplus property, Abu Sa'id said." },
        { q: "He ﷺ said spare supplies should go to one who has none.", tf: true, why: "Whoever has spare supplies should give them to one who has none, he ﷺ said." }
      ]
    },
    {
      slug: "who-comes-first",
      title: "Who comes first",
      line: "Spend on yourself first, then on your family, he ﷺ said.",
      facts: ["Told by Abu Hurairah", "Then a servant, then as you see best"],
      source: hadith("abudawud", "1691", "Abu Hurairah", "Hasan (Al-Albani)", "The Prophet ﷺ told people to give charity. A man said: Messenger of Allah, I have a dinar. He said: spend it on yourself. He said: I have another. He said: spend it on your children. He said: I have another. He said: spend it on your wife. He said: I have another. He said: spend it on your servant. He said: I have another. He said: you know best.", "I have a dinar. He said: Spend it on yourself"),
      difficulty: 2,
      questions: [
        { q: "On whom did he ﷺ say to spend the first dinar?", a: "On yourself", wrong: ["On a stranger", "On a feast", "On a new horse"], why: "Spend it on yourself, he ﷺ told the man with one dinar." },
        { q: "What did he ﷺ say when the man had a fifth dinar?", a: "You know best", wrong: ["Bring it to the masjid", "Keep it for Friday", "Save it for Hajj"], why: "You know best what to do with it, he ﷺ told the man at the end." },
        { q: "He ﷺ said to spend the first dinar on a stranger.", tf: false, why: "No. Spend the first dinar on yourself, he ﷺ said." }
      ]
    },
    {
      slug: "a-goat-for-its-milk",
      title: "The goat lent for its milk",
      line: "The best of forty good deeds: lending a goat for its milk.",
      facts: ["Told by Abdullah ibn Amr", "Done hoping for Allah's reward"],
      source: hadith("bukhari", "2631", "Abdullah ibn Amr", "Sahih", "The Messenger of Allah ﷺ said: there are forty good deeds, and the best of them is lending a she-goat for its milk. Whoever does one of them, hoping for its reward and sure of Allah's promise, Allah will enter him into Paradise for it. Hassan, one of the narrators, said: we tried to count the deeds below it, like answering one who sneezes and moving harm from the road, but we could not reach even fifteen.", "There are forty virtuous deeds and the best of them is the Maniha of a she-goat"),
      difficulty: 2,
      questions: [
        { q: "Which of the forty good deeds is the best, he ﷺ said?", a: "Lending a goat for its milk", wrong: ["Building a tall house", "Buying a fast horse", "Winning a race"], why: "There are forty virtuous deeds and the best of them is the Maniha of a she-goat." },
        { q: "What does Allah give for one of these deeds, done for His reward?", a: "Entry into Paradise", wrong: ["A bag of gold", "Fame among people", "A long journey"], why: "Then Allah will make him enter Paradise because of it, he ﷺ said." },
        { q: "The narrators easily counted all forty good deeds.", tf: false, why: "No. We tried to count those good deeds, but we failed to count even fifteen." }
      ]
    },
    {
      slug: "thawbans-promise",
      title: "Thawban's promise",
      line: "He ﷺ promised Paradise to whoever never begs from people.",
      facts: ["Told by Thawban, who served him ﷺ", "After that, Thawban asked no one for anything"],
      source: hadith("abudawud", "1643", "Thawban", "Sahih (Al-Albani)", "Thawban, who served the Messenger of Allah ﷺ, said: he ﷺ said: whoever promises me that he will not beg from people, I promise him Paradise. Thawban said: I will. After that he never asked anyone for anything.", "If anyone guarantees me that he will not beg from people, I will guarantee him Paradise"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ promise to whoever never begs from people?", a: "Paradise", wrong: ["A big house", "A herd of camels", "A fast horse"], why: "I will guarantee him Paradise, he ﷺ said." },
        { q: "After the promise, whom did Thawban ask for things?", a: "Not a single person", wrong: ["Only his close friends", "Only the wealthy", "Only his own family"], why: "Thawban never asked anyone for anything after that." },
        { q: "Not begging from people is a way to Paradise.", tf: true, why: "Whoever promises not to beg from people, he ﷺ promised him Paradise." }
      ]
    },
    {
      slug: "a-reward-at-home",
      title: "A reward at home",
      line: "Umm Salamah was rewarded for spending on her own sons.",
      facts: ["Told by Umm Salamah's daughter", "They were Abu Salamah's children"],
      source: hadith("bukhari", "1467", "Umm Salamah, through her daughter", "Sahih", "Umm Salamah said: O Messenger of Allah, will I be rewarded if I spend on the children of Abu Salamah? They are my sons too. The Prophet ﷺ said: spend on them, and you will be rewarded for what you spend on them.", "Spend on them and you will get a reward for what you spend on them"),
      difficulty: 1,
      questions: [
        { q: "On whom did Umm Salamah ask about spending?", a: "Her own sons", wrong: ["Her neighbours", "Some travellers", "Her guests"], why: "Abu Salama's offspring are also my sons, Umm Salamah said." },
        { q: "What did he ﷺ say she would get for spending on them?", a: "A reward", wrong: ["Nothing at all", "A stern warning", "A debt to repay"], why: "Spend on them, he ﷺ told Umm Salamah, and you will get a reward for it." },
        { q: "Spending on your own children can bring a reward.", tf: true, why: "Spend on them and you will get a reward for what you spend on them, he ﷺ said." }
      ]
    },
    {
      slug: "take-it-without-greed",
      title: "Take it without greed",
      line: "Take a gift you did not ask for, but never chase one.",
      facts: ["Told by Umar ibn al-Khattab", "Umar said: give it to someone poorer"],
      source: hadith("bukhari", "1473", "Umar ibn al-Khattab", "Sahih", "Umar said: the Messenger of Allah ﷺ used to give me things, and I would say: give it to someone poorer and more in need than me. He ﷺ said: take it. If something of this wealth comes to you while you did not ask for it and are not greedy for it, take it. And if it does not come, do not run after it.", "If you are given something from this property, without asking for it or having greed for it take it"),
      difficulty: 2,
      questions: [
        { q: "What did Umar ask him ﷺ to do with the gift?", a: "Give it to someone poorer", wrong: ["Add more to it", "Sell it in the market", "Keep it for later"], why: "Would you give it to a poorer and more needy one than I? Umar said." },
        { q: "When should you take what you are given, he ﷺ said?", a: "If you did not ask or crave it", wrong: ["Only if it is gold", "Only on Fridays", "Never at all"], why: "Without asking for it or having greed for it, take it, he ﷺ said." },
        { q: "He ﷺ said to run after wealth that is not given to you.", tf: false, why: "No. If you are not given wealth, do not run after it, he ﷺ said." }
      ]
    }
  ]
};

export const ZAKAT_WEALTH_UNITS: DeepUnit[] = [WEALTH];
