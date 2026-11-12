import { hadith, type DeepUnit } from "./deepKit";

// One more Zakat unit: how Allah counts charity, from Jami at-Tirmidhi, Sunan an-Nasa'i and Sunan Ibn Majah. The
// honest zakat collector, giving something good and not bad dates, reciting quietly like secret charity, giving one
// in debt more time, spending in Allah's cause written seven hundred times over, and the sleep of one who meant to
// pray at night. Every card is one sahih or hasan hadith with its number, narrator and grade, and its exact English
// words to highlight. Points the schools differ on are left out, and none of these hadith is taught anywhere else in
// the app.

const COUNTED: DeepUnit = {
  key: "zakat-counted-by-allah",
  topicId: "zakat",
  branchId: "zakat-how-allah-counts",
  branch: { title: "How Allah counts charity", description: "An honest zakat collector, giving your best, quiet reciting, time for one in debt, seven hundred times over, and sleep as a gift." },
  name: "how Allah counts charity",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "honest-collector",
      title: "An honest zakat collector",
      line: "Collecting zakat honestly is like striving in Allah's cause.",
      facts: ["Told by Rafi' ibn Khadij", "Al-'amil: the one who collects zakat", "His reward lasts until he returns home"],
      source: hadith("tirmidhi", "645", "Rafi' ibn Khadij", "Hasan Sahih (Al-Albani)", "Rafi' ibn Khadij said: I heard the Messenger of Allah ﷺ say: the one who works collecting charity in truth is like the one who fights in the cause of Allah, until he returns home.", "The one who works in collecting charity in truth is like the one who fights in the cause of Allah"),
      difficulty: 1,
      questions: [
        { q: "Who is like one striving in Allah's cause, he ﷺ said?", a: "An honest zakat collector", wrong: ["One who hoards his gold", "One who boasts of his wealth", "One who sleeps all day"], why: "The one who works in collecting charity in truth, he ﷺ said." },
        { q: "How must the collector do his work?", a: "In truth, honestly", wrong: ["In a great hurry", "With a loud voice", "Only in winter"], why: "Collecting charity in truth is like fighting in the cause of Allah, he ﷺ said." },
        { q: "Even the work of collecting zakat can earn a great reward.", tf: true, why: "Done in truth, it is like striving in Allah's cause until he returns home." }
      ]
    },
    {
      slug: "give-your-best",
      title: "Give the good, not the bad",
      line: "In charity, give something good, not dry, bad dates.",
      facts: ["Told by Awf ibn Malik", "A man had hung up a bunch of dry, bad dates", "He ﷺ came out with a stick in his hand"],
      source: hadith("nasai", "2493", "Awf ibn Malik", "Hasan (Al-Albani)", "Awf ibn Malik said: the Messenger of Allah ﷺ came out with a stick in his hand. A man had hung up a bunch of dry, bad dates as charity. He ﷺ hit the bunch with the stick and said: I wish the one who gave this charity had given something better than this. The one who gave these dry, bad dates will eat dry, bad dates on the Day of Resurrection.", "I wish that the one who gave this Sadaqah had given something better than this"),
      difficulty: 1,
      questions: [
        { q: "What had the man hung up as charity?", a: "A bunch of dry, bad dates", wrong: ["A bag of gold coins", "A new woollen cloak", "A jar of fresh honey"], why: "A man had hung up a bunch of dry and bad dates, Awf ibn Malik said." },
        { q: "What did he ﷺ wish the giver had done?", a: "Given something better", wrong: ["Hung it up higher", "Given it at night", "Given it next year"], why: "I wish the one who gave this Sadaqah had given something better than this, he ﷺ said." },
        { q: "When we give in charity, we should give what is good.", tf: true, why: "He ﷺ wished the giver of the bad dates had given something better." }
      ]
    },
    {
      slug: "quiet-reciting",
      title: "Reciting quietly, giving secretly",
      line: "Reciting the Quran quietly is like giving charity in secret.",
      facts: ["Told by Uqbah ibn Amir", "Aloud is like charity given openly", "Quietly is like charity given in secret"],
      source: hadith("tirmidhi", "2919", "Uqbah ibn Amir", "Sahih (Al-Albani)", "Uqbah ibn Amir said: the Messenger of Allah ﷺ said: the one who recites the Quran aloud is like the one who gives charity openly, and the one who recites the Quran quietly is like the one who gives charity in secret.", "quietly is like the one who gives charity secretly"),
      difficulty: 2,
      questions: [
        { q: "Reciting the Quran aloud is like giving charity how?", a: "Openly", wrong: ["Late at night", "By mistake", "Only once"], why: "One who recites aloud is like one who gives charity publicly, he ﷺ said." },
        { q: "Reciting the Quran quietly is like what?", a: "Charity in secret", wrong: ["Charity taken back", "Charity never given", "Charity given late"], why: "One who recites the Quran quietly is like one who gives charity secretly." },
        { q: "Both reciting aloud and reciting quietly are good.", tf: true, why: "He ﷺ likened both to charity: one given openly, one given in secret." }
      ]
    },
    {
      slug: "time-for-the-debtor",
      title: "Give the debtor more time",
      line: "Give one in hardship more time: each day is charity.",
      facts: ["Told by Buraidah al-Aslami", "Before the debt is due: charity for each day", "After it is due: each day, charity equal to the loan"],
      source: hadith("ibnmajah", "2418", "Buraidah al-Aslami", "Sahih (Al-Albani)", "Buraidah al-Aslami said: the Prophet ﷺ said: whoever gives more time to one in difficulty will have the reward of charity for each day. And whoever gives him more time after the debt is due will have, for each day, the reward of charity equal to the loan.", "an act of charity for each day"),
      difficulty: 2,
      questions: [
        { q: "Giving more time to one in difficulty is charity how often?", a: "For each day", wrong: ["Once only", "Once a year", "Only on Fridays"], why: "He will have the reward of an act of charity for each day, he ﷺ said." },
        { q: "After the debt is due, each day's charity is equal to what?", a: "The amount of the loan", wrong: ["Half a date", "One small coin", "A cup of water"], why: "Charity equal to the amount of the loan, for each day, he ﷺ said." },
        { q: "Being patient with someone who owes you is a kind of charity.", tf: true, why: "Whoever gives respite to one in difficulty has charity for each day." }
      ]
    },
    {
      slug: "seven-hundred-times",
      title: "Seven hundred times over",
      line: "Spending in Allah's cause is written seven hundred times over.",
      facts: ["Told by Khuraim ibn Fatik", "Fi sabilillah: in the cause of Allah", "Allah multiplies it many times"],
      source: hadith("tirmidhi", "1625", "Khuraim ibn Fatik", "Sahih (Al-Albani)", "Khuraim ibn Fatik said: the Messenger of Allah ﷺ said: whoever spends something in the cause of Allah, it is written for him seven hundred times over.", "Whoever spends a sum in the cause of Allah, it is recorded for him seven-hundred fold"),
      difficulty: 1,
      questions: [
        { q: "How many times over is it written, he ﷺ said?", a: "Seven hundred", wrong: ["Two", "Five", "Seventy"], why: "It is recorded for him seven-hundred fold, he ﷺ said." },
        { q: "What must the spending be for, to be written seven hundred times?", a: "The cause of Allah", wrong: ["Showing off", "Games and fun", "Things that harm"], why: "Whoever spends a sum in the cause of Allah, he ﷺ said." },
        { q: "Allah can give back far more than what we give for Him.", tf: true, why: "What is spent in His cause is written seven hundred times over." }
      ]
    },
    {
      slug: "sleep-as-a-gift",
      title: "Sleep as a gift from Allah",
      line: "Meant to pray at night, then slept? Your sleep is charity.",
      facts: ["Told by Abu ad-Darda", "He went to bed meaning to pray at night", "Sleep overcame him until the morning"],
      source: hadith("ibnmajah", "1344", "Abu ad-Darda", "Sahih (Al-Albani)", "Abu ad-Darda said: the Prophet ﷺ said: whoever goes to bed meaning to get up and pray at night, but sleep overcomes him until the morning, what he intended is written for him, and his sleep is a charity given to him by his Lord.", "what he intended will be recorded for him, and his sleep is a charity given to him by his Lord"),
      difficulty: 2,
      questions: [
        { q: "He meant to pray at night but slept till morning. What is written for him?", a: "What he meant to do", wrong: ["Nothing at all", "A bad deed", "Only half a prayer"], why: "What he intended will be recorded for him, he ﷺ said." },
        { q: "What does his sleep become?", a: "A charity from his Lord", wrong: ["A sin", "A wasted night", "A heavy debt"], why: "His sleep is a charity given to him by his Lord, he ﷺ said." },
        { q: "A good intention can be rewarded even when sleep wins.", tf: true, why: "He meant to pray at night, so what he intended is written for him." }
      ]
    }
  ]
};

export const ZAKAT_COUNTED_UNITS: readonly DeepUnit[] = [COUNTED];
