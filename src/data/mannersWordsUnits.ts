import { hadith, type DeepUnit } from "./deepKit";

// One more Manners unit: choosing your words, from Sunan Abi Dawud and Jami at-Tirmidhi. The thing he ﷺ feared most for
// a man, the show-off who rolls his tongue, "they claim" as a bad riding-beast, "what Allah wills, then", a gentler word
// for a low mood, and the man who says the people are ruined. Every card is one sahih or hasan hadith with its number,
// narrator and grade, and its exact English words to highlight, and none of them is taught anywhere else in the app.
// How clearly he ﷺ spoke (Abu Dawud 4839) is left out, as the kids' path already teaches it from Bukhari 3567.

const WORDS: DeepUnit = {
  key: "manners-choosing-words",
  topicId: "manners",
  branchId: "manners-choosing-words",
  branch: { title: "Choosing your words", description: "The thing he ﷺ feared most, the show-off with words, they claim as a bad riding-beast, putting Allah's will first, a gentler word for a low mood, and the most ruined man." },
  name: "choosing your words",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "what-he-feared-most",
      title: "What he feared most",
      line: "Asked what he feared most, he ﷺ took hold of his tongue.",
      facts: ["Told by Sufyan ibn Abdullah", "He asked: what do you fear most for me?", "He ﷺ took hold of his own tongue"],
      source: hadith("tirmidhi", "2410", "Sufyan ibn Abdullah ath-Thaqafi", "Sahih (Al-Albani)", "Sufyan ibn Abdullah said: I said: O Messenger of Allah, tell me something to hold fast to. He ﷺ said: say, my Lord is Allah, then be steadfast. I said: O Messenger of Allah, what do you fear most for me? He took hold of his own tongue and said: this.", "So he took hold of his tongue and said"),
      difficulty: 1,
      questions: [
        { q: "What did Sufyan ask him ﷺ?", a: "What do you fear most for me?", wrong: ["Where is Paradise?", "When is the Hour?", "Who is the best man?"], why: "He ﷺ took hold of his own tongue and said: this." },
        { q: "What did he ﷺ fear most for Sufyan?", a: "The tongue", wrong: ["Riches", "Enemies", "Hunger"], why: "He took hold of his own tongue and said: this." },
        { q: "He ﷺ pointed to Sufyan's money as the thing he feared most.", tf: false, why: "No. He ﷺ took hold of his own tongue and said: this." }
      ]
    },
    {
      slug: "talking-to-show-off",
      title: "Talking to show off",
      line: "Allah hates the show-off who rolls his tongue like cattle.",
      facts: ["Told by Abdullah ibn Amr", "A show-off with fancy words", "He moves his tongue round as cattle do"],
      source: hadith("abudawud", "5005", "Abdullah ibn Amr", "Sahih (Al-Albani)", "Abdullah ibn Amr said: the Messenger of Allah ﷺ said: Allah hates the man who shows off his eloquence, who moves his tongue round his teeth as cattle do.", "hates the eloquent one among men who moves his tongue round"),
      difficulty: 2,
      questions: [
        { q: "Who does Allah hate among men, he ﷺ said?", a: "The show-off with words", wrong: ["The quiet one", "The shy one", "The slow talker"], why: "He moves his tongue round his teeth as cattle do, he ﷺ said." },
        { q: "The show-off moves his tongue round like what?", a: "Like cattle", wrong: ["Like a bird", "Like a lion", "Like a fish"], why: "Allah hates the eloquent one who moves his tongue round, as cattle do." },
        { q: "Allah loves the man who shows off with his words.", tf: false, why: "No. Allah hates the eloquent one who moves his tongue round as cattle do, he ﷺ said." }
      ]
    },
    {
      slug: "a-bad-riding-beast",
      title: "A bad riding-beast",
      line: "Za'amu, they claim, is a bad riding-beast for a man.",
      facts: ["Abu Mas'ud and Hudhayfah asked each other", "Za'amu means: they claim, or it is said", "He ﷺ called it a bad riding-beast"],
      source: hadith("abudawud", "4972", "Abu Mas'ud and Hudhayfah", "Sahih (Al-Albani)", "Abu Mas'ud asked Hudhayfah, or Hudhayfah asked Abu Mas'ud: what did you hear the Messenger of Allah ﷺ say about za'amu, they claim? He said: I heard the Messenger of Allah ﷺ say: what a bad riding-beast for a man is za'amu.", "it is a bad riding-beast for a man"),
      difficulty: 2,
      questions: [
        { q: "What does the word za'amu mean?", a: "They claim", wrong: ["They pray", "They promise", "They thank"], why: "Za'amu means they alleged, they asserted, or it is said." },
        { q: "Who asked each other about za'amu?", a: "Abu Mas'ud and Hudhayfah", wrong: ["Two traders at a market", "Two poets at a fair", "Two kings at a feast"], why: "Abu Dawud adds: this Abu Abdullah is Hudhayfah." },
        { q: "He ﷺ praised za'amu as a fine way to pass on news.", tf: false, why: "No. It is a bad riding-beast for a man, he ﷺ said." }
      ]
    },
    {
      slug: "what-allah-wills-then",
      title: "Allah's will comes first",
      line: "Say: what Allah wills, then what so-and-so wills.",
      facts: ["Told by Hudhayfah", "Not: what Allah and so-and-so will", "Every other will comes after Allah's"],
      source: hadith("abudawud", "4980", "Hudhayfah", "Sahih (Al-Albani)", "Hudhayfah said: the Prophet ﷺ said: do not say, what Allah wills and so-and-so wills. Say instead: what Allah wills, and afterwards what so-and-so wills.", "What Allah wills and afterwards so and so wills"),
      difficulty: 2,
      questions: [
        { q: "Which words did he ﷺ teach us to say?", a: "What Allah wills, then so-and-so", wrong: ["What so-and-so wills alone", "What Allah and so-and-so will", "What luck wills"], why: "Do not say: what Allah wills and so-and-so wills, he ﷺ said." },
        { q: "What does the word then show?", a: "Allah's will comes first", wrong: ["Both wills are equal", "People decide first", "Luck decides it all"], why: "What Allah wills, and afterwards what so-and-so wills, he ﷺ taught." },
        { q: "He ﷺ said: do not say, what Allah wills and so-and-so wills.", tf: true, why: "Say instead: what Allah wills, and afterwards so-and-so wills." }
      ]
    },
    {
      slug: "a-gentler-word",
      title: "A gentler word for a low mood",
      line: "When you feel low, do not call your soul bad.",
      facts: ["Told by Sahl ibn Hunayf", "Khabuthat nafsi: my soul turned bad", "Laqisat nafsi: my soul feels upset"],
      source: hadith("abudawud", "4978", "Sahl ibn Hunayf", "Sahih (Al-Albani)", "Sahl ibn Hunayf said: the Prophet ﷺ said: none of you should say khabuthat nafsi, my soul has turned bad, but he should say laqisat nafsi, my soul feels upset.", "None of you must say Khabuthat nafsi"),
      difficulty: 2,
      questions: [
        { q: "Instead of khabuthat nafsi, what should you say?", a: "Laqisat nafsi", wrong: ["Halaka an-nas", "Ta'isa ash-shaytan", "Nafsi, nafsi"], why: "Do not say khabuthat nafsi, he ﷺ said; say laqisat nafsi instead." },
        { q: "What does khabuthat nafsi say about your soul?", a: "That it has turned bad", wrong: ["That it is at peace", "That it is grateful", "That it is hungry"], why: "So he ﷺ taught a gentler word: laqisat nafsi, my soul feels upset." },
        { q: "He ﷺ taught us to call our own souls bad when we feel low.", tf: false, why: "No. None of you should say khabuthat nafsi, he ﷺ said." }
      ]
    },
    {
      slug: "the-most-ruined",
      title: "The most ruined one",
      line: "Whoever says the people are ruined is the most ruined.",
      facts: ["Told by Abu Hurairah", "Looking down on people is the fault", "Imam Malik: wrong when said in pride"],
      source: hadith("abudawud", "4983", "Abu Hurairah", "Sahih (Al-Albani)", "Abu Hurairah said: the Prophet ﷺ said: when a man says the people have perished, he is the one who has perished most. Abu Dawud adds that Imam Malik said: said in sadness for the religion, there is no harm in it; said out of pride, looking down on people, it is forbidden.", "When a man says people have perished, he is the one who has suffered that fate most"),
      difficulty: 3,
      questions: [
        { q: "Who is most ruined, he ﷺ said?", a: "The one who says people are ruined", wrong: ["The one who is poor", "The one who is sick", "The one who travels"], why: "When a man says people have perished, he has suffered that fate most." },
        { q: "When is saying it wrong, as Imam Malik explained?", a: "When said out of pride", wrong: ["When said in sadness for faith", "When said with a smile", "When said at night"], why: "In sadness for the religion there is no harm, Malik said; in pride it is forbidden." },
        { q: "Looking down on everyone else is a sign of humility.", tf: false, why: "No. Whoever says the people have perished is the most ruined of them, he ﷺ said." }
      ]
    }
  ]
};

export const MANNERS_WORDS_UNITS: DeepUnit[] = [WORDS];
