import { hadith, type DeepUnit } from "./deepKit";

// One more Manners unit: words of a believer, from Sahih Muslim, Sunan Abi Dawud, Sunan Ibn Majah and Sahih
// al-Bukhari. No cursing a fever, no boasting about forefathers, a humble and generous servant, a just word to an
// unjust ruler, the believer's generous heart, and kind words for those learning to recite. Every card is one sahih or
// hasan hadith with its number, narrator and grade, and its exact English words to highlight. None of these hadith is
// taught anywhere else in the app.

const BELIEVER_WORDS: DeepUnit = {
  key: "manners-words-of-a-believer",
  topicId: "manners",
  branchId: "manners-words-of-a-believer",
  branch: { title: "Words of a believer", description: "No cursing a fever, no boasting of forefathers, a humble servant, a just word to a ruler, a generous heart, and recite, all is good." },
  name: "words of a believer",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "do-not-curse-a-fever",
      title: "Do not curse a fever",
      line: "A fever wipes away sins, so never curse it, he ﷺ said.",
      facts: ["Told by Jabir ibn Abdullah", "He ﷺ visited a woman shivering with fever", "Like a furnace that cleans iron"],
      source: hadith("muslim", "2575", "Jabir ibn Abdullah", "Sahih", "Jabir ibn Abdullah said: the Messenger of Allah ﷺ visited Umm as-Sa'ib, or Umm al-Musayyib, and asked: why are you shivering? She said: a fever, may Allah not bless it. He said: do not curse the fever, for it takes away the sins of the children of Adam as a furnace takes away the dirt from iron.", "for it expiates the sin of the children of Adam just as furnace removes the alloy of iron"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ say not to do to a fever?", a: "Curse it", wrong: ["Hide it away", "Treat it", "Talk about it"], why: "Do not curse fever, he ﷺ told the woman who was shivering with it." },
        { q: "What does a fever do to a believer's sins?", a: "Wipes them away", wrong: ["Makes them grow", "Moves them to others", "Hides them for later"], why: "For it expiates the sin of the children of Adam, he ﷺ said of fever." },
        { q: "He ﷺ compared a fever to a furnace that cleans iron.", tf: true, why: "Just as a furnace removes the alloy of iron, a fever removes sins, he ﷺ said." }
      ]
    },
    {
      slug: "no-boasting-of-forefathers",
      title: "No boasting of forefathers",
      line: "All people come from Adam, so no boasting about forefathers.",
      facts: ["Told by Abu Hurairah", "Adam was made from dust", "Only faith and good deeds raise a person"],
      source: hadith("abudawud", "5116", "Abu Hurairah", "Hasan (Al-Albani)", "Abu Hurairah said: the Prophet ﷺ said: Allah has taken away from you the pride of the time before Islam and its boasting about forefathers. A person is only a pious believer or a wretched sinner. You are the children of Adam, and Adam was made from dust.", "You are sons of Adam, and Adam came from dust"),
      difficulty: 1,
      questions: [
        { q: "What did Allah take away with Islam, he ﷺ said?", a: "Boasting about forefathers", wrong: ["Love for one's family", "Trade in the markets", "Travel by camel"], why: "Allah has removed the pride of the pre-Islamic period and its boasting in ancestors." },
        { q: "What truly raises a person, he ﷺ taught?", a: "Being a pious believer", wrong: ["A famous family name", "A rich grandfather", "A noble tribe"], why: "One is only a pious believer or a miserable sinner, he ﷺ said." },
        { q: "Every person is a child of Adam.", tf: true, why: "You are sons of Adam, and Adam came from dust, he ﷺ said." }
      ]
    },
    {
      slug: "a-humble-generous-servant",
      title: "A humble, generous servant",
      line: "He ﷺ knelt to eat and said: Allah made me humble.",
      facts: ["Told by Abdullah ibn Busr", "Abdullah gave him ﷺ a sheep as a gift", "A Bedouin asked about how he sat"],
      source: hadith("ibnmajah", "3263", "Abdullah ibn Busr", "Sahih (Al-Albani)", "Abdullah ibn Busr said: I gave the Prophet ﷺ a sheep as a gift, and the Messenger of Allah ﷺ sat on his knees to eat. A Bedouin asked: what is this way of sitting? He said: Allah has made me a humble and generous servant, and has not made me proud and stubborn.", "Allah has made me a humble and generous slave"),
      difficulty: 2,
      questions: [
        { q: "What gift did Abdullah ibn Busr give him ﷺ?", a: "A sheep", wrong: ["A camel", "A cow", "A cloak"], why: "I gave the Prophet ﷺ a sheep as a gift, Abdullah ibn Busr said." },
        { q: "What did he ﷺ say Allah made him?", a: "A humble, generous servant", wrong: ["A king over the Arabs", "A rich trader", "A great poet"], why: "Allah has made me a humble and generous slave, he ﷺ told the Bedouin." },
        { q: "He ﷺ sat on his knees to eat the gift.", tf: true, why: "The Messenger of Allah ﷺ sat on his knees to eat, Abdullah ibn Busr said." }
      ]
    },
    {
      slug: "a-just-word",
      title: "A just word",
      line: "The best jihad is a just word to an unjust ruler.",
      facts: ["Told by Abu Sa'id al-Khudri", "Jihad means striving for Allah's sake", "Speaking up for justice takes courage"],
      source: hadith("abudawud", "4344", "Abu Sa'id al-Khudri", "Sahih (Al-Albani)", "Abu Sa'id al-Khudri said: the Prophet ﷺ said: the best jihad in the path of Allah is a word of justice spoken to an unjust ruler.", "a word of justice to an oppressive ruler"),
      difficulty: 2,
      questions: [
        { q: "What is the best jihad, he ﷺ said?", a: "A just word to an unjust ruler", wrong: ["Praising an unjust ruler", "Giving gifts to a ruler", "Joining a ruler's feast"], why: "The best fighting in the path of Allah is a word of justice to an oppressive ruler." },
        { q: "What kind of word is the best jihad?", a: "A word of justice", wrong: ["A word of praise", "A word of poetry", "A word of anger"], why: "The best jihad is a word of justice to an oppressive ruler, he ﷺ said." },
        { q: "Speaking up for justice before a ruler is a kind of jihad.", tf: true, why: "The best jihad in Allah's path is a just word to an oppressive ruler, he ﷺ said." }
      ]
    },
    {
      slug: "the-generous-heart",
      title: "The generous heart",
      line: "Al-Karm, the generous, is the believer's heart, he ﷺ said.",
      facts: ["Told by Abu Hurairah", "People called the grapevine al-karm", "Al-karm means the generous one"],
      source: hadith("bukhari", "6183", "Abu Hurairah", "Sahih", "Abu Hurairah said: the Messenger of Allah ﷺ said: they say al-karm, the generous one, but al-karm is really the heart of a believer.", "and in fact Al-Karm is the heart of a believer"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ say truly deserves the name al-karm?", a: "The heart of a believer", wrong: ["A tall date palm", "A field of wheat", "A strong camel"], why: "They say Al-Karm, and in fact Al-Karm is the heart of a believer, he ﷺ said." },
        { q: "What does al-karm mean?", a: "The generous one", wrong: ["The strong one", "The wise one", "The rich one"], why: "They say Al-Karm, the generous one, he ﷺ said." },
        { q: "He ﷺ gave the name of generosity to the believer's heart.", tf: true, why: "In fact Al-Karm, the generous, is the heart of a believer, he ﷺ said." }
      ]
    },
    {
      slug: "recite-all-is-good",
      title: "Recite, all is good",
      line: "To Bedouins and non-Arabs reciting, he ﷺ said: all is good.",
      facts: ["Told by Jabir ibn Abdullah", "Some were Bedouins, some were not Arabs", "Keep reciting, even when it is hard"],
      source: hadith("abudawud", "830", "Jabir ibn Abdullah", "Sahih (Al-Albani)", "Jabir ibn Abdullah said: the Messenger of Allah ﷺ came to us while we were reciting the Quran, and among us were Bedouins and non-Arabs. He said: recite, for all of it is good. Soon people will come who will make it straight as an arrow is made straight; they will hurry for its reward and not wait for it.", "there were among us bedouins and the non-Arabs. He said: Recite, all is well"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ say to them as they recited?", a: "Recite, all is good", wrong: ["Rest, then eat", "Go home to sleep", "Sit in a circle"], why: "He said: Recite, all is well, Jabir said of the Bedouins and non-Arabs." },
        { q: "Who were among those reciting the Quran?", a: "Bedouins and non-Arabs", wrong: ["Kings and princes", "Traders from Sham", "Sailors from Yemen"], why: "There were among us bedouins and the non-Arabs, Jabir ibn Abdullah said." },
        { q: "He ﷺ praised the recitation of Bedouins and non-Arabs.", tf: true, why: "Recite, all is well, he ﷺ said to the Bedouins and non-Arabs reciting." }
      ]
    }
  ]
};

export const MANNERS_BELIEVER_WORDS_UNITS: readonly DeepUnit[] = [BELIEVER_WORDS];
