import { hadith, type DeepUnit } from "./deepKit";

// One more unit for people new to Islam: short words of his ﷺ to live by, from Sunan Ibn Majah, Jami at-Tirmidhi and
// Sunan Abi Dawud. Regret that is repentance, silence that saves, the protection of the morning prayer, what your
// neighbors say about you, giving the salam first, and staying away from astrology. Every card is one sahih or hasan
// hadith with its number, narrator and grade, and its exact English words to highlight, and none of them is taught
// anywhere else in the app.

const SHORT_WORDS: DeepUnit = {
  key: "intro-short-words-to-live-by",
  topicId: "intro",
  branchId: "intro-short-words-to-live-by",
  branch: { title: "Short words to live by", description: "Regret that is repentance, silence that saves, the morning prayer's protection, what your neighbors say, giving salam first, and keeping away from astrology." },
  name: "short words to live by",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "regret-is-repentance",
      title: "Regret is repentance",
      line: "Feeling sorry for a sin is itself repentance, he ﷺ said.",
      facts: ["Told by Abdullah ibn Mas'ud", "Asked if he heard it himself, he said yes", "Regret: being truly sorry for a wrong"],
      source: hadith("ibnmajah", "4252", "Abdullah ibn Mas'ud", "Sahih (Al-Albani)", "Ibn Ma'qil said: I went in with my father to Abdullah ibn Mas'ud and heard him say: the Messenger of Allah ﷺ said: regret is repentance. My father asked: did you hear the Prophet ﷺ say it? He said: yes.", "Regret is repentance"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ say regret is?", a: "Repentance", wrong: ["Cowardice", "Laziness", "Foolishness"], why: "Regret is repentance, Abdullah ibn Mas'ud heard him ﷺ say." },
        { q: "What did Ibn Ma'qil's father ask Abdullah?", a: "If he heard it himself", wrong: ["If it was in the Quran", "If he could write it down", "If others knew of it"], why: "Did you hear the Prophet ﷺ say it, he asked, and Abdullah said: yes." },
        { q: "Being truly sorry for a sin is part of turning back to Allah.", tf: true, why: "Regret is repentance, he ﷺ said, as Abdullah told Ibn Ma'qil and his father." }
      ]
    },
    {
      slug: "silence-that-saves",
      title: "Silence that saves",
      line: "Whoever keeps silent is saved, he ﷺ said.",
      facts: ["Told by Abdullah ibn Amr", "Silent: holding back the tongue", "Saved: kept safe from harm"],
      source: hadith("tirmidhi", "2501", "Abdullah ibn Amr", "Sahih (Al-Albani)", "Abdullah ibn Amr said: the Messenger of Allah ﷺ said: whoever is silent is saved.", "Whoever is silent, he is saved"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ say about whoever is silent?", a: "He is saved", wrong: ["He is weak", "He is rude", "He is lonely"], why: "Whoever is silent, he is saved, Abdullah ibn Amr heard him ﷺ say." },
        { q: "Whose words are these: whoever is silent is saved?", a: "The Prophet ﷺ", wrong: ["A poet of old", "A Greek wise man", "An Arab king"], why: "These are his ﷺ words, narrated by Abdullah ibn Amr: whoever is silent, he is saved." },
        { q: "Holding back your tongue can keep you safe.", tf: true, why: "Silence saves, he ﷺ taught: whoever is silent, he is saved." }
      ]
    },
    {
      slug: "under-allahs-protection",
      title: "Under Allah's protection",
      line: "Whoever prays the morning prayer is under Allah's protection.",
      facts: ["Told by Samurah ibn Jundub", "The morning prayer: Fajr", "Allah, the Mighty and Sublime, protects him"],
      source: hadith("ibnmajah", "3946", "Samurah ibn Jundub", "Sahih (Al-Albani)", "Samurah ibn Jundub said: the Prophet ﷺ said: whoever offers the morning prayer is under the protection of Allah, the Mighty and Sublime.", "Whoever offers the morning prayer, he is under the protection of Allah, the Mighty and Sublime"),
      difficulty: 1,
      questions: [
        { q: "Which prayer did he ﷺ name in these words?", a: "The dawn prayer", wrong: ["The noon prayer", "The sunset prayer", "The Isha prayer"], why: "Whoever offers the morning prayer is under the protection of Allah, he ﷺ said." },
        { q: "Whose protection is the one who prays it under?", a: "Allah's", wrong: ["His tribe's", "The ruler's", "His family's"], why: "He is under the protection of Allah, the Mighty and Sublime, Samurah heard him ﷺ say." },
        { q: "Praying Fajr leaves a person without any protection.", tf: false, why: "No. Whoever offers the morning prayer is under the protection of Allah, he ﷺ said." }
      ]
    },
    {
      slug: "what-your-neighbors-say",
      title: "What your neighbors say",
      line: "If your neighbors say you did well, then you did well.",
      facts: ["Told by Abdullah ibn Mas'ud", "A man asked how to know if he did well", "The same if they say you did badly"],
      source: hadith("ibnmajah", "4223", "Abdullah ibn Mas'ud", "Sahih (Al-Albani)", "Abdullah ibn Mas'ud said: a man asked the Messenger of Allah ﷺ: how can I know when I have done well and when I have done badly? He ﷺ said: if you hear your neighbors saying that you have done well, then you have done well; and if you hear them saying that you have done badly, then you have done badly.", "If you hear your neighbors saying that you have done well"),
      difficulty: 1,
      questions: [
        { q: "What did the man want to know?", a: "How to know if he did well", wrong: ["How to grow rich", "Where to build a house", "When to travel for trade"], why: "How can I know when I have done well and when I have done something bad, he asked." },
        { q: "Who did he ﷺ say to listen to?", a: "Your neighbors", wrong: ["Your rivals", "Sellers in the market", "Travelers passing by"], why: "If you hear your neighbors saying you have done well, you have done well, he ﷺ said." },
        { q: "If neighbors say you did badly, he ﷺ said you did badly.", tf: true, why: "If you hear them saying you have done something bad, then you have, he ﷺ said." }
      ]
    },
    {
      slug: "first-to-give-the-salam",
      title: "First to give the salam",
      line: "Those nearest to Allah are the first to give the salam.",
      facts: ["Told by Abu Umamah", "Salam: as-salamu alaykum", "Greet before you are greeted"],
      source: hadith("abudawud", "5197", "Abu Umamah", "Sahih (Al-Albani)", "Abu Umamah said: the Prophet ﷺ said: those nearest to Allah are those who are first to give the salam.", "Those who are nearest to Allah are they who are first to give a salutation"),
      difficulty: 1,
      questions: [
        { q: "Who are nearest to Allah, he ﷺ said?", a: "The first to give the salam", wrong: ["The last to leave a room", "The loudest in a gathering", "The first to sit down"], why: "The nearest to Allah are first to give a salutation, Abu Umamah heard him ﷺ say." },
        { q: "What does giving salam first bring you nearer to?", a: "Allah", wrong: ["Wealth", "Fame", "Power"], why: "Those who are nearest to Allah are they who are first to give a salutation, he ﷺ said." },
        { q: "Waiting for others to greet you first is the better way.", tf: false, why: "No. Those nearest to Allah are the first to greet with a salutation." }
      ]
    },
    {
      slug: "astrology-and-magic",
      title: "Astrology and magic",
      line: "Learning astrology is learning a branch of magic, he ﷺ said.",
      facts: ["Told by Abdullah ibn Abbas", "Astrology: claiming the stars tell the future", "The more of it, the more magic"],
      source: hadith("abudawud", "3905", "Abdullah ibn Abbas", "Hasan (Al-Albani)", "Abdullah ibn Abbas said: the Prophet ﷺ said: if anyone acquires any knowledge of astrology, he acquires a branch of magic, and he gets more of it as long as he keeps at it.", "If anyone acquires any knowledge of astrology, he acquires a branch of magic"),
      difficulty: 1,
      questions: [
        { q: "What is learning astrology, he ﷺ said?", a: "A branch of magic", wrong: ["A branch of medicine", "A branch of poetry", "A branch of trade"], why: "Anyone who acquires knowledge of astrology acquires a branch of magic, he ﷺ said." },
        { q: "What happens the longer one keeps at it?", a: "He gets more of the magic", wrong: ["He gets less of it", "He learns the unseen", "He becomes wise"], why: "He gets more as long as he continues to do so, he ﷺ said." },
        { q: "Astrology is a harmless study, by his ﷺ words.", tf: false, why: "No. Astrology is a branch of magic, and the more one learns, the more magic he gets." }
      ]
    }
  ]
};

export const INTRO_SHORT_WORDS_UNITS: DeepUnit[] = [SHORT_WORDS];
