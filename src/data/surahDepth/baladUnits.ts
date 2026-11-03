import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Al-Balad ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Balad 90:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_90_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Balad 90:${ayah}`,
    url: `https://quran.com/90:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 90:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q90 = (ayah: number) => quranQuote(90, ayah);



/** Ayahs 1 to 10: the oath by Makkah, man created in hardship, and the gifts of eyes, tongue and the two ways. */
const BALAD_ONE: DeepUnit = {
  key: "balad1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-90",
  name: "Al-Balad, ayahs 1-10",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Balad",
  lessons: [
    {
      slug: "by-this-city",
      title: "By this city",
      line: "Allah swears by Makkah, the Mother of the Towns.",
      facts: ["Al-Balad: the city", "Umm al-Qura: Makkah"],
      quote: q90(1),
      source: ik(1, "Ibn Abbas said the city Allah swears by is Makkah, the Mother of the Towns.", "This means Makkah"),
      difficulty: 1,
      questions: [
        { q: "By what does Allah swear in 90:1?", a: "This city", wrong: ["The sea", "The moon", "The mountain"], why: "Nay! I swear by this city." },
        { q: "Which city is meant, per Ibn Abbas?", a: "Makkah", wrong: ["Madinah", "Jerusalem", "Taif"], why: "This means Makkah." },
        { tf: true, q: "Ibn Kathir calls Makkah the Mother of the Towns.", why: "Allah has sworn by Makkah, the Mother of the Towns." }
      ]
    },
    {
      slug: "a-sacred-city",
      title: "A sacred city",
      line: "Allah made Makkah sacred from the day He made the heavens.",
      facts: ["Haram: sacred, protected", "Even its plants are protected"],
      quote: q90(1),
      source: hadith("bukhari", "1834", "Ibn Abbas", "Sahih", "On the day Makkah was opened, the Prophet ﷺ said Allah made it a sanctuary since He created the heavens and the earth, until the Day of Resurrection; its thorny plants are not cut and its game is not chased.", "a sanctuary since the creation of the heavens and the earth"),
      difficulty: 2,
      questions: [
        { q: "Since when has Makkah been sacred?", a: "Since the heavens and earth were made", wrong: ["Since the first Hajj", "Since the Kaaba was painted", "Since last year"], why: "A sanctuary since the creation of the heavens and the earth." },
        { q: "Until when will it stay sacred?", a: "The Day of Resurrection", wrong: ["The next century", "The end of Ramadan", "A king decides"], why: "It is a sanctuary with Allah's sanctity till the Day of Resurrection." },
        { tf: false, q: "In Makkah, people may chase its animals for sport.", why: "Its game should not be chased." }
      ]
    },
    {
      slug: "free-in-this-city",
      title: "Free in this city",
      line: "Muhammad ﷺ was allowed to enter Makkah for one hour.",
      facts: ["Hillun: permitted", "The opening of Makkah"],
      quote: q90(2),
      source: ik(2, "Ibn Abbas and Al-Hasan said Allah made it lawful for the Prophet ﷺ for one hour of a day only, when Makkah was opened.", "for one hour of a day"),
      difficulty: 2,
      questions: [
        { q: "What does 90:2 say to Muhammad ﷺ?", a: "You are free in this city", wrong: ["You are a guest", "You must leave", "You are a stranger"], why: "And you are free in this city." },
        { q: "For how long was it allowed, per Al-Hasan?", a: "One hour of a day", wrong: ["A whole year", "Forty days", "Forever"], why: "Allah made it lawful for him for one hour of a day." },
        { tf: false, q: "After that hour, fighting in Makkah was allowed for everyone.", why: "Today its sanctity has been restored just as it was sacred yesterday." }
      ]
    },
    {
      slug: "the-father-and-his-children",
      title: "The father and his children",
      line: "Allah swears by Adam, the father of mankind, and his children.",
      facts: ["Walid: the begetter, Adam", "Wa ma walad: his children"],
      quote: q90(3),
      source: ik(3, "Mujahid, Qatadah and many others said the begetter is Adam and what he begot is his children; Ibn Kathir calls this view good and strong.", "by the begetter, Adam, and that which he begot is his children"),
      difficulty: 2,
      questions: [
        { q: "Who is the begetter, per Mujahid?", a: "Adam", wrong: ["Nuh", "Ibrahim", "Any king"], why: "By the begetter, Adam, and that which he begot is his children." },
        { q: "How did Ibn Kathir judge this view?", a: "Good and strong", wrong: ["Weak", "Strange", "Rejected"], why: "This view that Mujahid and his companions have chosen is good and strong." },
        { tf: true, q: "Ibn Jarir said it can mean every father and his children.", why: "It is general and it refers to every father and his children." }
      ]
    },
    {
      slug: "created-in-hardship",
      title: "Created in hardship",
      line: "Allah made man to face struggle and effort all through life.",
      facts: ["Kabad: hardship, toil", "Life is effort"],
      quote: q90(4),
      source: ik(4, "Ibn Abbas said man was created in hardship; Qatadah said in difficulty, and Sa'id said in hardship and seeking a living.", "He was created while in hardship"),
      difficulty: 2,
      questions: [
        { q: "In what was man created, per 90:4?", a: "Kabad, hardship", wrong: ["Endless ease", "Pure play", "Sleep"], why: "Verily, We have created man in Kabad." },
        { q: "What did Qatadah say Kabad means?", a: "Difficulty", wrong: ["Wealth", "Laughter", "Silence"], why: "Qatadah said, In difficulty." },
        { tf: false, q: "Life in this world is meant to be free of any effort.", why: "He was created while in hardship." }
      ]
    },
    {
      slug: "a-mothers-hardship",
      title: "A mother's hardship",
      line: "Mothers carry, bear and nurse their babies with hardship.",
      facts: ["Mujahid linked 90:4 to 46:15", "Honour your mother"],
      quote: q90(4),
      source: ik(4, "Mujahid linked this ayah to 46:15: a mother carries and bears her child with hardship, nurses with hardship, and a living is hardship too.", "His mother bears him with hardship"),
      difficulty: 2,
      questions: [
        { q: "Which ayah did Mujahid link to 90:4?", a: "46:15, the mother bears him with hardship", wrong: ["1:1", "112:1", "2:255"], why: "His mother bears him with hardship. And she brings him forth with hardship." },
        { q: "What else did Mujahid call a hardship?", a: "Earning a living", wrong: ["Sleeping", "Playing", "Eating sweets"], why: "And his livelihood is a hardship." },
        { tf: true, q: "Knowing a mother's hardship should make us kind to her.", why: "His mother bears him with hardship." }
      ]
    },
    {
      slug: "none-can-overcome-him",
      title: "None can overcome him?",
      line: "Man thinks none will ask about his money, but Allah will.",
      facts: ["Allah has power over all", "We will be asked about wealth"],
      quote: q90(5),
      source: ik(5, "Qatadah said man thinks he will not be asked about his wealth, how he earned it and how he spent it.", "how he earned and how he spent it"),
      difficulty: 2,
      questions: [
        { q: "What does man think, per 90:5?", a: "That none can overcome him", wrong: ["That he is weak", "That he is watched", "That he will die soon"], why: "Does he think that none can overcome him?" },
        { q: "What will we be asked about our wealth, per Qatadah?", a: "How we earned and spent it", wrong: ["Its colour", "Its weight", "Who saw it"], why: "How he earned and how he spent it." },
        { tf: false, q: "No one has power over a rich person.", why: "Does he think that none can overcome him?" }
      ]
    },
    {
      slug: "i-wasted-so-much-wealth",
      title: "I wasted so much wealth",
      line: "Man boasts that he spent huge amounts of money.",
      facts: ["Mal lubad: wealth in heaps", "Boasting does not help"],
      quote: q90(6),
      source: ik(6, "Mujahid, Al-Hasan and Qatadah said man boasts that he spent an abundance of wealth.", "I spent an abundance of wealth"),
      difficulty: 2,
      questions: [
        { q: "What does man say in 90:6?", a: "I have wasted wealth in abundance", wrong: ["I am poor", "I gave in secret", "I saved it all"], why: "He says: I have wasted wealth in abundance!" },
        { q: "What does Ibn Kathir say man means?", a: "I spent a lot of wealth", wrong: ["I lost a game", "I found a treasure", "I paid a debt"], why: "The Son of Adam says, I spent an abundance of wealth." },
        { tf: false, q: "Showing off our spending makes the deed worth more.", why: "He says: I have wasted wealth in abundance!" }
      ]
    },
    {
      slug: "allah-sees-him",
      title: "Allah sees him",
      line: "Man forgets that Allah sees all he does and all he spends.",
      facts: ["Allah is Al-Basir, the All-Seeing", "Nothing is hidden"],
      quote: q90(7),
      source: ik(7, "Mujahid said the ayah means: does he think that Allah, the Mighty and Majestic, does not see him?", "does not see him"),
      difficulty: 1,
      questions: [
        { q: "What does man wrongly think, per 90:7?", a: "That none sees him", wrong: ["That he is lost", "That he is tired", "That he is young"], why: "Does he think that none sees him?" },
        { q: "Who sees him, per Mujahid?", a: "Allah, the Mighty and Majestic", wrong: ["Only his family", "No one", "Only kings"], why: "Does he think that Allah, the Mighty and Majestic, does not see him." },
        { tf: true, q: "Allah sees what we spend, even in secret.", why: "Does he think that none sees him?" }
      ]
    },
    {
      slug: "two-eyes",
      title: "Two eyes",
      line: "Allah gave us two eyes so that we can see.",
      facts: ["Aynayn: two eyes", "Every gift is from Allah"],
      quote: q90(8),
      source: ik(8, "Ibn Kathir says the two eyes are given to man for him to see with them.", "for him to see with them"),
      difficulty: 1,
      questions: [
        { q: "What does 90:8 say Allah made for man?", a: "Two eyes", wrong: ["Two wings", "Two hearts", "Two tails"], why: "Have We not made for him two eyes?" },
        { q: "Why were the eyes given, per Ibn Kathir?", a: "To see with them", wrong: ["To sleep", "To hear", "To speak"], why: "Meaning, for him to see with them." },
        { tf: true, q: "Our eyes are a gift we should thank Allah for.", why: "Have We not made for him two eyes?" }
      ]
    },
    {
      slug: "a-tongue-and-two-lips",
      title: "A tongue and two lips",
      line: "The tongue is for speech; lips help us speak and eat.",
      facts: ["Lisan: tongue", "Shafatayn: two lips"],
      quote: q90(9),
      source: ik(9, "The tongue is for speaking and saying what is inside us; the lips help with speaking and eating and beautify the face and mouth.", "beautifying his face and his mouth"),
      difficulty: 2,
      questions: [
        { q: "What does 90:9 mention?", a: "A tongue and two lips", wrong: ["Two hands", "A nose", "Two ears"], why: "And a tongue and two lips?" },
        { q: "What is the tongue for, per Ibn Kathir?", a: "To speak what is inside him", wrong: ["To see", "To walk", "To smell"], why: "So that he can express that which is inside of him." },
        { q: "What do the lips help with?", a: "Speaking, eating and beauty", wrong: ["Hearing", "Seeing far", "Running"], why: "In order to help him with speaking, eating food, and beautifying his face and his mouth." }
      ]
    },
    {
      slug: "the-two-ways",
      title: "The two ways",
      line: "Allah showed us two paths: the good one and the evil one.",
      facts: ["Najdayn: two ways", "We choose with our free will"],
      quote: q90(10),
      source: ik(10, "Ibn Mas'ud, Ali and Ibn Abbas said the two ways are the good and the evil.", "The good and the evil"),
      difficulty: 2,
      questions: [
        { q: "What did Allah show man, per 90:10?", a: "The two ways", wrong: ["Ten roads", "One door", "The stars"], why: "And shown him the two ways?" },
        { q: "What are the two ways, per Ibn Mas'ud?", a: "The good and the evil", wrong: ["East and west", "Land and sea", "Day and night"], why: "The good and the evil." },
        { tf: false, q: "Man has no way to tell good from evil.", why: "And shown him the two ways?" }
      ]
    }
  ]
};

/** Ayahs 11 to 16: the steep path of freeing, feeding the hungry, the orphan relative and the needy in the dust. */
const BALAD_TWO: DeepUnit = {
  key: "balad2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-90",
  name: "Al-Balad, ayahs 11-16",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Balad",
  lessons: [
    {
      slug: "the-steep-path",
      title: "The steep path",
      line: "The road to goodness is uphill, yet it leads to safety.",
      facts: ["Al-Aqabah: the steep path", "Good deeds take effort"],
      quote: q90(11),
      source: ik(11, "Ibn Zayd said the ayah asks: will he not travel the path that holds salvation and good?", "the path which contains salvation and good"),
      difficulty: 2,
      questions: [
        { q: "What has man not tried, per 90:11?", a: "To pass the steep path", wrong: ["To climb a tree", "To cross a sea", "To build a tower"], why: "But he has not attempted to pass on the path that is steep." },
        { q: "What does the steep path hold, per Ibn Zayd?", a: "Salvation and good", wrong: ["Gold and silver", "Fame", "Games"], why: "The path which contains salvation and good." },
        { tf: true, q: "Good deeds can feel hard, like climbing uphill.", why: "But he has not attempted to pass on the path that is steep." }
      ]
    },
    {
      slug: "what-is-the-steep-path",
      title: "What is the steep path?",
      line: "Allah asks a question, then explains the steep path Himself.",
      facts: ["A question to make us listen", "Answer comes in 90:13-16"],
      quote: q90(12),
      source: ik(12, "Ibn Zayd said Allah then explains the steep path: freeing a neck and giving food.", "Then He explains this path"),
      difficulty: 2,
      questions: [
        { q: "What does 90:12 ask?", a: "What will make you know the steep path?", wrong: ["Who made the stars?", "Where is the sea?", "When is the night?"], why: "And what will make you know the path that is steep?" },
        { q: "What does Allah do after asking, per Ibn Zayd?", a: "He explains the path", wrong: ["He stays silent", "He changes topic", "He tells a story"], why: "Then He explains this path." },
        { tf: false, q: "The steep path is never explained in the surah.", why: "Then He explains this path by his saying, freeing a neck, or giving food." }
      ]
    },
    {
      slug: "freeing-a-neck",
      title: "Freeing a neck",
      line: "Part of the steep path is setting a person free.",
      facts: ["Fakku raqabah: freeing a neck", "Islam urged freeing slaves"],
      quote: q90(13),
      source: ik(13, "Ibn Kathir explains freeing a neck with the hadith of Abu Hurayrah about freeing a believing slave.", "Whoever frees a believing slave"),
      difficulty: 2,
      questions: [
        { q: "What is the first part of the steep path, per 90:13?", a: "Freeing a neck", wrong: ["Building a palace", "Winning a race", "Buying land"], why: "Freeing a neck." },
        { q: "What does freeing a neck mean?", a: "Setting a slave free", wrong: ["Cutting hair", "Wearing a scarf", "Lifting weights"], why: "Whoever frees a believing slave." },
        { tf: true, q: "Islam rewarded freeing slaves greatly.", why: "Whoever frees a believing slave, Allah will free for every limb one of his limbs from the Fire." }
      ]
    },
    {
      slug: "freed-from-the-fire",
      title: "Freed from the Fire",
      line: "Whoever frees a person, Allah frees him from the Fire.",
      facts: ["The reward matches the deed", "Ali ibn Al-Husayn freed his servant"],
      quote: q90(13),
      source: hadith("bukhari", "2517", "Abu Hurairah", "Sahih", "The Prophet ﷺ said whoever frees a Muslim slave, Allah will save all the parts of his body from the Fire, as he freed the body of the slave.", "Whoever frees a Muslim slave"),
      difficulty: 2,
      questions: [
        { q: "What does Allah do for one who frees a slave?", a: "Saves him from the Fire", wrong: ["Gives him a horse", "Makes him a king", "Nothing"], why: "Allah will save all the parts of his body from the Fire as he has freed the body-parts of the slave." },
        { q: "What did Ali ibn Al-Husayn do on hearing it?", a: "He freed his slave", wrong: ["He sold his slave", "He laughed", "He forgot it"], why: "He freed his slave for whom Abdullah bin Jafar had offered him ten thousand Dirhams." },
        { tf: false, q: "Freeing a person has only a small reward.", why: "Allah will save all the parts of his body from the Fire." }
      ]
    },
    {
      slug: "food-on-a-hungry-day",
      title: "Food on a hungry day",
      line: "Giving food when people are hungry climbs the steep path.",
      facts: ["Masghabah: hunger", "Feed when food is scarce"],
      quote: q90(14),
      source: ik(14, "Ibn Abbas, Ikrimah, Mujahid and Qatadah said Masghabah means a day of hunger.", "Of hunger"),
      difficulty: 2,
      questions: [
        { q: "What else is on the steep path, per 90:14?", a: "Giving food on a day of hunger", wrong: ["Selling food", "Hiding food", "Wasting food"], why: "Or giving food in a day full of Masghabah." },
        { q: "What does Masghabah mean, per Ibn Abbas?", a: "Hunger", wrong: ["Rain", "Joy", "Sleep"], why: "Ibn Abbas said, Of hunger." },
        { tf: true, q: "Feeding people when food is scarce is a great deed.", why: "Or giving food in a day full of Masghabah." }
      ]
    },
    {
      slug: "an-orphan-near-of-kin",
      title: "An orphan near of kin",
      line: "Feed an orphan, especially one who is your relative.",
      facts: ["Yatim: orphan", "Dha maqrabah: a relative"],
      quote: q90(15),
      source: ik(15, "Ibn Abbas, Ikrimah and Al-Hasan said near of kin means an orphan who is related to the giver.", "who is related to him"),
      difficulty: 2,
      questions: [
        { q: "Who is fed in 90:15?", a: "An orphan near of kin", wrong: ["A rich guest", "A king", "A merchant"], why: "To an orphan near of kin." },
        { q: "What does near of kin mean, per Ibn Abbas?", a: "Related to him", wrong: ["Living far away", "Older than him", "A stranger"], why: "Meaning, who is related to him." },
        { tf: false, q: "We should help orphans only if they are strangers.", why: "To an orphan near of kin." }
      ]
    },
    {
      slug: "double-reward-for-relatives",
      title: "Double reward for relatives",
      line: "Charity to a needy relative counts as two good deeds.",
      facts: ["Sadaqah: charity", "Silat ar-rahim: family ties"],
      quote: q90(15),
      source: hadith("tirmidhi", "658", "Salman ibn Amir", "Hasan", "The Prophet ﷺ said charity to the needy is one charity, and to a relative it is two: charity and keeping family ties.", "if it is given to relatives it is"),
      difficulty: 3,
      questions: [
        { q: "How many rewards for charity to a relative?", a: "Two", wrong: ["One", "None", "Ten"], why: "If it is given to relatives it is counted as two: charity and nurturing the ties of kinship." },
        { q: "What are the two rewards?", a: "Charity and family ties", wrong: ["Gold and silver", "Fame and praise", "Fasting and Hajj"], why: "Charity and nurturing the ties of kinship." },
        { tf: true, q: "Ibn Kathir calls this chain authentic.", why: "At-Tirmidhi and An-Nasai both recorded this Hadith and its chain of narration is authentic." }
      ]
    },
    {
      slug: "the-needy-in-the-dust",
      title: "The needy in the dust",
      line: "Feed the very poor who have no home to shelter them.",
      facts: ["Dha matrabah: in the dust", "The poorest of the poor"],
      quote: q90(16),
      source: ik(16, "Ibn Kathir says it means the poor and miserable, clinging to the dirt; Ibn Abbas said one with no house to protect him.", "poor, miserable, and clinging to the dirt"),
      difficulty: 2,
      questions: [
        { q: "Who is fed in 90:16?", a: "A Miskin cleaving to dust", wrong: ["A rich trader", "A soldier", "A guest of honour"], why: "Or to a Miskin cleaving to dust." },
        { q: "What does Dha Matrabah mean, per Ibn Abbas?", a: "One with no house to protect him", wrong: ["A farmer", "A builder", "A traveller with gold"], why: "Who has no house or anything else to protect him against the dirt." },
        { tf: true, q: "The homeless poor deserve our help.", why: "Poor, miserable, and clinging to the dirt." }
      ]
    }
  ]
};

/** Ayahs 17 to 20: belief, patience and mercy, and the people of the Right and of the Left. */
const BALAD_THREE: DeepUnit = {
  key: "balad3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-90",
  name: "Al-Balad, ayahs 17-20",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Balad",
  lessons: [
    {
      slug: "then-he-believed",
      title: "Then he believed",
      line: "Good deeds count when done with true belief, for Allah's reward.",
      facts: ["Iman: belief", "Deeds need faith"],
      quote: q90(17),
      source: ik(17, "Ibn Kathir says along with these pure deeds he believed in his heart, seeking his reward from Allah, as in 17:19 and 16:97.", "he was a believer in his heart, seeking the reward of that from Allah"),
      difficulty: 2,
      questions: [
        { q: "What did he become, per 90:17?", a: "One of those who believed", wrong: ["A king", "A poet", "A trader"], why: "Then he became one of those who believed." },
        { q: "Whose reward was he seeking, per Ibn Kathir?", a: "Allah's", wrong: ["People's praise", "A ruler's gift", "His friends'"], why: "Seeking the reward of that from Allah." },
        { tf: false, q: "Good deeds without belief are enough for the Hereafter.", why: "Whoever works righteousness while being a true believer." }
      ]
    },
    {
      slug: "patience-and-mercy",
      title: "Patience and mercy",
      line: "Believers urge one another to be patient and to show mercy.",
      facts: ["Sabr: patience", "Marhamah: mercy"],
      quote: q90(17),
      source: ik(17, "Ibn Kathir says they advised each other to be patient with harm from people and to be merciful to them.", "to be patient with the harms of the people, and to be merciful with them"),
      difficulty: 2,
      questions: [
        { q: "What two things do they urge, per 90:17?", a: "Patience and compassion", wrong: ["Wealth and fame", "Sleep and food", "Anger and pride"], why: "And recommended one another to patience, and recommended one another to compassion." },
        { q: "Patient with what, per Ibn Kathir?", a: "The harms of the people", wrong: ["Hot weather only", "Long books", "Slow food"], why: "To be patient with the harms of the people, and to be merciful with them." },
        { tf: true, q: "Reminding friends to be patient is a good deed.", why: "And recommended one another to patience." }
      ]
    },
    {
      slug: "be-merciful",
      title: "Be merciful",
      line: "Show mercy on earth, and Allah will show you mercy.",
      facts: ["Ar-Rahman: the Most Merciful", "Mercy brings mercy"],
      quote: q90(17),
      source: hadith("tirmidhi", "1924", "Abdullah ibn Amr", "Sahih", "The Prophet ﷺ said the merciful are shown mercy by Ar-Rahman; be merciful on the earth and the One above the heavens will be merciful to you.", "The merciful are shown mercy by Ar-Rahman"),
      difficulty: 2,
      questions: [
        { q: "Who shows mercy to the merciful?", a: "Ar-Rahman", wrong: ["Only kings", "No one", "Only friends"], why: "The merciful are shown mercy by Ar-Rahman." },
        { q: "To whom should we be merciful?", a: "Those on the earth", wrong: ["Only family", "Only the rich", "Only adults"], why: "Be merciful on the earth, and you will be shown mercy from Who is above the heavens." },
        { tf: true, q: "Being kind to others brings Allah's mercy to us.", why: "Be merciful on the earth, and you will be shown mercy." }
      ]
    },
    {
      slug: "those-on-the-right",
      title: "Those on the Right",
      line: "People of these deeds are the Companions of the Right Hand.",
      facts: ["Ashab al-Maymanah: people of the Right", "Their book in the right hand"],
      quote: q90(18),
      source: ik(18, "Ibn Kathir says those with these qualities are the companions of the Right Hand.", "those who have these characteristics are the companions of the Right Hand"),
      difficulty: 2,
      questions: [
        { q: "Who are they, per 90:18?", a: "Those on the Right", wrong: ["Those on the Left", "Those in front", "Those behind"], why: "They are those on the Right." },
        { q: "Which people are on the Right, per Ibn Kathir?", a: "Those with these qualities", wrong: ["The richest", "The tallest", "The loudest"], why: "Those who have these characteristics are the companions of the Right Hand." },
        { tf: false, q: "Belief, patience and mercy do not affect our place.", why: "Those who have these characteristics are the companions of the Right Hand." }
      ]
    },
    {
      slug: "those-on-the-left",
      title: "Those on the Left",
      line: "Those who rejected Allah's signs are the people of the Left.",
      facts: ["Ashab al-Mash'amah: people of the Left", "Rejecting the signs"],
      quote: q90(19),
      source: ik(19, "Ibn Kathir says those who disbelieved in Allah's signs are the companions of the Left Hand.", "the companions of the Left Hand"),
      difficulty: 2,
      questions: [
        { q: "Who are on the Left, per 90:19?", a: "Those who disbelieved in Our Ayat", wrong: ["Those who fed the poor", "Those who were patient", "Those who freed slaves"], why: "But those who disbelieved in Our Ayat, they are those on the Left." },
        { q: "What did they reject?", a: "Allah's Ayat", wrong: ["Gold", "Food", "Travel"], why: "Those who disbelieved in Our Ayat." },
        { tf: true, q: "The surah ends by showing the two final groups.", why: "They are those on the Right, but those who disbelieved, they are those on the Left." }
      ]
    },
    {
      slug: "no-way-out",
      title: "No way out",
      line: "The Fire will be closed over them, with no way out.",
      facts: ["Mu'sadah: closed, shut", "Choose the right path now"],
      quote: q90(20),
      source: ik(20, "Ibn Abbas said its doors will be closed; Qatadah said there will be no way out of it.", "Its doors will be closed"),
      difficulty: 3,
      questions: [
        { q: "What does Mu'sadah mean, per Ibn Abbas?", a: "Its doors will be closed", wrong: ["It will open wide", "It will cool down", "It will move away"], why: "Ibn Abbas said, Its doors will be closed." },
        { q: "What did Qatadah say about it?", a: "No way out of it", wrong: ["Many doors", "A short stay", "A bright light"], why: "No crevice, and no way out of it forever." },
        { tf: false, q: "Those in it can find a way to escape.", why: "There will be no way for them to avoid it, nor will they have any way out." }
      ]
    }
  ]
};

export const BALAD_UNITS: readonly DeepUnit[] = [BALAD_ONE, BALAD_TWO, BALAD_THREE];
