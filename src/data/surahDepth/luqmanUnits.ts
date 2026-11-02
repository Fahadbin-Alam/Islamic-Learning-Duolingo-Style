import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Luqman ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Luqman 30:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_31_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Luqman 31:${ayah}`,
    url: `https://quran.com/31:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 31:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q31 = (ayah: number) => quranQuote(31, ayah);

/** Ayahs 1 to 19: the Book of wisdom, idle talk, signs of creation, and the advice of Luqman to his son. */
const LUQMAN_ONE: DeepUnit = {
  key: "luqman1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-31",
  name: "Luqman, ayahs 1 to 19",
  kind: "skill",
  lessonType: "surah",
  surahName: "Luqman",
  lessons: [
    {
      slug: "the-wise-book",
      title: "The Wise Book",
      line: "Luqman opens with the letters Alif Lam Mim.",
      facts: ["The Quran is full of wisdom", "Ibn Kathir explains the letters in Al-Baqarah"],
      quote: q31(1),
      source: ik(1, "The surah opens with letters, as Al-Baqarah does. Allah made the Quran a guidance, a healing and a mercy for those who do good.", "a guidance and healing and a mercy for the Muhsinin"),
      difficulty: 2,
      questions: [
        { q: "Which letters open Luqman, in 31:1?", a: "Alif Lam Mim", wrong: ["Ya Sin", "Ta Ha", "Qaf"], why: "Alif Lam Mim." },
        { q: "Where did Ibn Kathir explain such letters?", a: "At the start of Al-Baqarah", wrong: ["In Yasin", "In An-Nas", "Nowhere"], why: "At the beginning of Surat Al-Baqarah we discussed the letters." },
        { tf: true, q: "Ibn Kathir calls the Quran a healing and a mercy.", why: "A guidance and healing and a mercy for the Muhsinin." }
      ]
    },
    {
      slug: "ayahs-of-the-wise-book",
      title: "Ayahs of the Wise Book",
      line: "These are the ayahs of the Wise Book, the Quran.",
      facts: ["Every ayah is a sign", "Wisdom fills the Book"],
      quote: q31(2),
      source: ik(2, "Allah made the Quran a guidance, a healing and a mercy for those who do good deeds.", "a guidance and healing and a mercy for the Muhsinin"),
      difficulty: 2,
      questions: [
        { q: "What is the Book called, in 31:2?", a: "The Wise Book", wrong: ["The Old Book", "The Short Book", "The Lost Book"], why: "These are Ayat of the Wise Book." },
        { q: "What are its verses called, in 31:2?", a: "Ayat", wrong: ["Songs", "Riddles", "Stories only"], why: "These are Ayat of the Wise Book." },
        { tf: true, q: "Ibn Kathir says the Quran is a guidance and healing.", why: "Allah has made the Qur'an a guidance and healing and a mercy for the Muhsinin." }
      ]
    },
    {
      slug: "guide-for-good-doers",
      title: "A guide for the good-doers",
      line: "The Quran is a guide and a mercy for the Muhsinin.",
      facts: ["Muhsinin do good by Allah's law", "They pray on time"],
      quote: q31(3),
      source: ik(3, "The Muhsinin do good as Allah's law teaches. They pray the obligatory prayers properly and on time, then add extra prayers.", "They establish the obligatory prayers in the proper manner and at the correct times"),
      difficulty: 2,
      questions: [
        { q: "For whom is the Book a guide, in 31:3?", a: "The Muhsinin", wrong: ["The proud", "The lazy", "Only kings"], why: "A guide and a mercy for the Muhsinin." },
        { q: "How do they pray, per Ibn Kathir?", a: "Properly and on time", wrong: ["Only on Friday", "Very fast", "Only at night"], why: "They establish the obligatory prayers in the proper manner and at the correct times." },
        { q: "What does the Book bring besides guidance, in 31:3?", a: "Mercy", wrong: ["Wealth", "Fame", "Fear"], why: "A guide and a mercy for the Muhsinin." }
      ]
    },
    {
      slug: "prayer-zakah-certainty",
      title: "Prayer, Zakah and certainty",
      line: "They pray, give Zakah and are certain of the Hereafter.",
      facts: ["Zakah goes to those who deserve it", "Faith in the Hereafter is firm"],
      quote: q31(4),
      source: ik(4, "The good-doers pay Zakah to those who deserve it, keep ties with relatives, and are certain of reward in the Hereafter.", "they pay the Zakah to those who deserve it"),
      difficulty: 3,
      questions: [
        { q: "What do they give, in 31:4?", a: "Zakah", wrong: ["Gifts to kings", "Nothing", "Loans with interest"], why: "Those who perform the Salah and give Zakah." },
        { q: "To whom do they pay Zakah, per Ibn Kathir?", a: "Those who deserve it", wrong: ["Their friends only", "The rich", "Anyone loud"], why: "They pay the Zakah to those who deserve it." },
        { q: "How firm is their faith in the Hereafter, in 31:4?", a: "Certain", wrong: ["Weak", "Unsure", "Forgotten"], why: "And they have faith in the Hereafter with certainty." }
      ]
    },
    {
      slug: "the-successful",
      title: "The successful",
      line: "Such people are on guidance from their Lord and succeed.",
      facts: ["Success in both worlds", "No showing off"],
      quote: q31(5),
      source: ik(5, "They follow Allah's guidance with clear understanding, do not show off, and succeed in this world and the Hereafter.", "they follow His guidance with clear understanding"),
      difficulty: 3,
      questions: [
        { q: "Whose guidance are they on, in 31:5?", a: "Their Lord's", wrong: ["Their tribe's", "Their own", "The crowd's"], why: "Such are on guidance from their Lord." },
        { q: "How do they follow it, per Ibn Kathir?", a: "With clear understanding", wrong: ["Blindly", "Rarely", "In secret only"], why: "They follow His guidance with clear understanding." },
        { tf: true, q: "Ibn Kathir says the good-doers show off for praise.", why: "They do not show off or seek a reward or thanks from other people." }
      ]
    },
    {
      slug: "buying-idle-talk",
      title: "Buying idle talk",
      line: "Some trade the Quran for idle talk that leads people astray.",
      facts: ["Idle talk blocks Allah's signs", "Mocking Allah's path is serious"],
      quote: q31(6),
      source: ik(6, "Ibn Jarir said idle talk is all speech that keeps people from seeing Allah's signs and following His path.", "all speech that hinders people from seeing the signs of Allah and following His path"),
      difficulty: 3,
      questions: [
        { q: "What does such a person buy, in 31:6?", a: "Idle talk", wrong: ["Good books", "Bread", "Land"], why: "And of mankind is he who purchases idle talk." },
        { q: "What is idle talk, per Ibn Jarir?", a: "Speech that blocks Allah's path", wrong: ["Any poem", "Any story", "Any joke"], why: "All speech that hinders people from seeing the signs of Allah and following His path." },
        { q: "What does he do to Allah's path, per Mujahid?", a: "Mocks it", wrong: ["Builds it", "Guards it", "Follows it"], why: "This means mocking the path of Allah and making fun of it." }
      ]
    },
    {
      slug: "loving-falsehood",
      title: "Loving falsehood",
      line: "Liking falsehood grows the more a person chooses it.",
      facts: ["Buying means liking it", "Choose what benefits you"],
      quote: q31(6),
      source: ik(6, "Qatadah said buying idle talk means loving it, and the more misguided one is, the more one prefers falsehood and harm.", "the more he prefers falsehood to the truth and harmful things over beneficial things"),
      difficulty: 4,
      questions: [
        { q: "What does buying it mean, per Qatadah?", a: "He likes it", wrong: ["He pays gold", "He sells it", "He writes it"], why: "His purchasing it means he likes it." },
        { q: "What does the misguided prefer, per Qatadah?", a: "Falsehood over truth", wrong: ["Truth over falsehood", "Silence", "Prayer"], why: "The more he prefers falsehood to the truth and harmful things over beneficial things." },
        { tf: true, q: "Qatadah said one may buy idle talk without spending money.", why: "By Allah, he may not spend money on it, but his purchasing it means he likes it." }
      ]
    },
    {
      slug: "a-deaf-ear",
      title: "Turning a deaf ear",
      line: "When the ayahs are recited, the proud turn away as if deaf.",
      facts: ["Pride closes the ears", "Listen to the Quran gladly"],
      quote: q31(7),
      source: ik(7, "When the Quran is recited to one fond of play, he turns away and acts as if he hears nothing, since he wants no benefit.", "he turns away from them and does not want to hear them"),
      difficulty: 3,
      questions: [
        { q: "How does he turn away, in 31:7?", a: "In pride", wrong: ["In fear", "In sleep", "In joy"], why: "He turns away in pride, as if he heard them not." },
        { q: "What is in his ear, in 31:7?", a: "As if deafness", wrong: ["Music", "Water", "A ring"], why: "As if there were deafness in his ear." },
        { q: "Why does he dislike hearing them, per Ibn Kathir?", a: "He wants no benefit", wrong: ["They are too long", "He is tired", "He is far"], why: "Because it annoys him to hear them since he gains no benefit from them." }
      ]
    },
    {
      slug: "gardens-of-delight",
      title: "Gardens of Delight",
      line: "Believers who do good will have the Gardens of Delight.",
      facts: ["Faith and good deeds together", "Joys never imagined"],
      quote: q31(8),
      source: ik(8, "The righteous believe in Allah and His Messenger ﷺ and do good deeds. They will enjoy delights no human mind has pictured.", "do righteous deeds in accordance with the Laws of Allah"),
      difficulty: 3,
      questions: [
        { q: "What do believers who do good get, in 31:8?", a: "Gardens of Delight", wrong: ["Gold coins now", "Nothing", "Long names"], why: "For them are Gardens of Delight." },
        { q: "Whom do they believe in, per Ibn Kathir?", a: "Allah and His Messenger ﷺ", wrong: ["Only their elders", "Stars", "Kings"], why: "Those who believe in Allah and His Messenger and do righteous deeds." },
        { tf: true, q: "Ibn Kathir says they will want to leave and change.", why: "They will stay there forever, never leaving and never desiring change." }
      ]
    },
    {
      slug: "a-true-promise",
      title: "A true promise",
      line: "They stay forever. Allah's promise is true and never broken.",
      facts: ["Allah never breaks a promise", "He is All-Mighty, All-Wise"],
      quote: q31(9),
      source: ik(9, "Paradise will surely come to pass, for it is Allah's promise, and Allah never breaks His promise.", "this will undoubtedly come to pass, for it is a promise from Allah, and Allah never breaks His promise"),
      difficulty: 3,
      questions: [
        { q: "How long do they stay, in 31:9?", a: "Forever", wrong: ["A year", "A week", "Until bored"], why: "To abide therein." },
        { q: "Does Allah ever break a promise, per Ibn Kathir?", a: "Never", wrong: ["Sometimes", "Often", "Only once"], why: "Allah never breaks His promise." },
        { q: "Which Names end 31:9?", a: "All-Mighty, All-Wise", wrong: ["All-Hearer, All-Seer", "Most High, Most Great", "Rich, Praised"], why: "And He is the All-Mighty, the All-Wise." }
      ]
    },
    {
      slug: "sky-without-pillars",
      title: "A sky without pillars",
      line: "Allah raised the sky with no pillars and set the mountains.",
      facts: ["Mountains steady the earth", "Animals of every kind"],
      quote: q31(10),
      source: ik(10, "Al-Hasan and Qatadah said the sky has no pillars at all. Mountains steady the earth, and Allah sends rain to grow plants in pairs.", "It does not have any pillars, visible or invisible"),
      difficulty: 3,
      questions: [
        { q: "What holds up the sky, per Al-Hasan and Qatadah?", a: "No pillars at all", wrong: ["Hidden pillars", "Giant trees", "Mountains"], why: "It does not have any pillars, visible or invisible." },
        { q: "Why did Allah set the mountains, in 31:10?", a: "So the earth would not shake", wrong: ["To block the sun", "For decoration only", "To mark borders"], why: "Lest it should shake with you." },
        { q: "How do the plants grow, in 31:10?", a: "In pairs", wrong: ["Alone", "In threes", "Upside down"], why: "We cause (plants) of every goodly kind to grow therein in pairs." }
      ]
    },
    {
      slug: "show-me-what-they-made",
      title: "Show Me what they made",
      line: "All this is Allah's creation. What have the idols made?",
      facts: ["Idols create nothing", "Shirk is plain error"],
      quote: q31(11),
      source: ik(11, "Everything mentioned is Allah's creation alone. He challenges the idolators to show what their idols and rivals have made.", "those idols and rivals whom you worship and call upon"),
      difficulty: 4,
      questions: [
        { q: "Whose creation is all of it, in 31:11?", a: "Allah's", wrong: ["The idols'", "Nature's alone", "No one's"], why: "This is the creation of Allah." },
        { q: "Who are those besides Him, per Ibn Kathir?", a: "Idols and rivals they worship", wrong: ["The angels", "The prophets", "Their parents"], why: "Those idols and rivals whom you worship and call upon." },
        { q: "What is the wrongdoers' error, in 31:11?", a: "Plain", wrong: ["Hidden", "Small", "Forgiven"], why: "Nay, the wrongdoers are in plain error." }
      ]
    },
    {
      slug: "wisdom-of-luqman",
      title: "The wisdom of Luqman",
      line: "Allah gave Luqman wisdom and told him: give thanks to Allah.",
      facts: ["Wisdom is understanding", "Thanks helps the thankful"],
      quote: q31(12),
      source: ik(12, "Wisdom means understanding, knowledge and eloquence. Giving thanks benefits the thankful, and Allah needs no one.", "understanding, knowledge and eloquence"),
      difficulty: 3,
      questions: [
        { q: "What did Allah give Luqman, in 31:12?", a: "Al-Hikmah", wrong: ["A kingdom", "A ship", "A palace"], why: "And indeed We bestowed upon Luqman Al-Hikmah." },
        { q: "What does Al-Hikmah mean, per Ibn Kathir?", a: "Understanding, knowledge, eloquence", wrong: ["Wealth and land", "Strength", "Long life"], why: "Means, understanding, knowledge and eloquence." },
        { q: "Whom does thanks help, in 31:12?", a: "The one who thanks", wrong: ["Allah", "No one", "Only kings"], why: "And whoever gives thanks, he gives thanks for (the good of) himself." }
      ]
    },
    {
      slug: "tongue-and-heart",
      title: "The tongue and the heart",
      line: "Luqman said nothing is better than tongue and heart, if good.",
      facts: ["Guard your tongue", "Purify your heart"],
      quote: q31(12),
      source: ik(12, "Asked for the best and then the worst parts of a sheep, Luqman both times chose the tongue and the heart.", "There is nothing better than these if they are good, and there is nothing worse than these if they are bad"),
      difficulty: 4,
      questions: [
        { q: "Which two parts did Luqman choose, per Ibn Kathir?", a: "The tongue and the heart", wrong: ["The eyes and ears", "The hands and feet", "The head and back"], why: "So he brought out the tongue and the heart." },
        { q: "When are they the worst, per Luqman?", a: "When they are bad", wrong: ["When they are old", "Never", "When they are small"], why: "There is nothing worse than these if they are bad." },
        { tf: true, q: "Allah is harmed if people are unthankful.", why: "He has no need of His servants and He will not be harmed by that." }
      ]
    },
    {
      slug: "the-greatest-wrong",
      title: "The greatest wrong",
      line: "Luqman told his son: never join others with Allah in worship.",
      facts: ["Shirk is the greatest wrong", "Advice starts with Tawhid"],
      quote: q31(13),
      source: hadith("bukhari", "32", "Abdullah ibn Mas'ud", "Sahih", "The Companions worried about any wrong spoiling faith. Allah made clear the wrong meant is joining others with Him.", "joining others in worship with Allah is a great injustice"),
      difficulty: 3,
      questions: [
        { q: "To whom did Luqman give this advice, in 31:13?", a: "His son", wrong: ["His king", "His friend", "His master"], why: "And when Luqman said to his son when he was advising him." },
        { q: "What is a great wrong, in the hadith?", a: "Joining others with Allah", wrong: ["Being poor", "Being quiet", "Sleeping late"], why: "Joining others in worship with Allah is a great injustice." },
        { q: "How does Ibn Kathir rank this wrong?", a: "The greatest wrong", wrong: ["A small slip", "A minor fault", "Not a wrong"], why: "Meaning, it is the greatest wrong." }
      ]
    },
    {
      slug: "the-mother-bore-him",
      title: "His mother bore him",
      line: "Be good to parents. Your mother carried you in hardship.",
      facts: ["Weakness upon weakness", "Thank Allah and your parents"],
      quote: q31(14),
      source: ik(14, "Allah reminds us how a mother tires herself night and day for her child, so the child remembers her kindness.", "to remind the son of her previous kind treatment of him"),
      difficulty: 3,
      questions: [
        { q: "How did his mother carry him, in 31:14?", a: "In weakness upon weakness", wrong: ["With ease", "With joy only", "For a day"], why: "His mother bore him in weakness and hardship upon weakness and hardship." },
        { q: "Whom must we thank, in 31:14?", a: "Allah and our parents", wrong: ["Only friends", "Only teachers", "No one"], why: "Give thanks to Me and to your parents." },
        { q: "What did Qatadah call her hardship?", a: "Exhaustion upon exhaustion", wrong: ["A small task", "A game", "Joy upon joy"], why: "Qatadah said: Exhaustion upon exhaustion." }
      ]
    },
    {
      slug: "kind-but-firm",
      title: "Kind but firm",
      line: "Never obey parents in shirk, yet treat them kindly.",
      facts: ["No obedience in shirk", "Still be kind to them"],
      quote: q31(15),
      source: ik(15, "If parents push you to follow them in shirk, do not obey, but keep treating them with kindness and respect.", "but do not let that stop you from behaving with them in the world kindly"),
      difficulty: 4,
      questions: [
        { q: "When should we not obey parents, in 31:15?", a: "If they push us to shirk", wrong: ["Ever", "When tired", "When busy"], why: "But if they strive with you to make you join in worship with Me others... then obey them not." },
        { q: "How do we still treat them, in 31:15?", a: "Kindly", wrong: ["Harshly", "Coldly", "Not at all"], why: "But behave with them in the world kindly." },
        { q: "Whose path should we follow, per Ibn Kathir?", a: "The believers'", wrong: ["The crowd's", "The rich", "Our own"], why: "And follow the path of him who turns to Me in repentance and in obedience. Means, the believers." }
      ]
    },
    {
      slug: "saad-and-his-mother",
      title: "Sa'd and his mother",
      line: "Sa'd honored his mother but would not leave Islam.",
      facts: ["Firm faith, gentle words", "His mother ate in the end"],
      quote: q31(15),
      source: ik(15, "Sa'd said the ayah came about him. His mother refused food to make him leave Islam. He stayed firm and gentle, and she ate.", "I will not give up this religion of mine for anything"),
      difficulty: 5,
      questions: [
        { q: "Who said the ayah came about him?", a: "Sa'd bin Malik", wrong: ["Bilal", "Abu Bakr", "Umar"], why: "Sa'd bin Malik said: This Ayah was revealed concerning me." },
        { q: "What did his mother refuse, per Ibn Kathir?", a: "Food and drink", wrong: ["Sleep", "Money", "Visitors"], why: "Leave this religion of yours, or I will not eat or drink until I die." },
        { tf: true, q: "In the end his mother ate.", why: "So if you want to, eat, and if you want to, do not eat. So she ate." }
      ]
    },
    {
      slug: "a-mustard-seed",
      title: "A mustard seed",
      line: "A deed small as a mustard seed, Allah will bring it out.",
      facts: ["Nothing is hidden from Allah", "Small deeds count"],
      quote: q31(16),
      source: ik(16, "Even a deed the size of a mustard seed, hidden in a rock or the sky, Allah will bring forth and weigh.", "if a wrong action or a sin be equal to the size of a grain of mustard seed"),
      difficulty: 3,
      questions: [
        { q: "How small is the deed, in 31:16?", a: "A mustard seed", wrong: ["A mountain", "A house", "A tree"], why: "If it be (anything) equal to the weight of a grain of mustard seed." },
        { q: "Where might it be hidden, in 31:16?", a: "In a rock", wrong: ["In a pocket", "In a box", "In a well"], why: "And though it be in a rock, or in the heavens or on the earth." },
        { q: "What does Allah know, per Ibn Kathir?", a: "An ant's footsteps at night", wrong: ["Only big things", "Only the past", "Only words"], why: "Well-Aware even of the footsteps of an ant in the darkest night." }
      ]
    },
    {
      slug: "pray-and-be-patient",
      title: "Pray and be patient",
      line: "Pray, call to good, forbid evil, and be patient.",
      facts: ["Prayer on time", "Patience with people"],
      quote: q31(17),
      source: ik(17, "Luqman told his son to pray properly on time, call to good, and be patient, since those who call to good meet hardship.", "being patient when people cause harm or annoyance is one of the most important commandments"),
      difficulty: 4,
      questions: [
        { q: "What should we do with the good, in 31:17?", a: "Enjoin it", wrong: ["Hide it", "Forget it", "Delay it"], why: "Perform the Salah, enjoin the good, and forbid the evil." },
        { q: "How should we pray, per Ibn Kathir?", a: "Properly at set times", wrong: ["Whenever free", "Only on Fridays", "Quickly"], why: "Offer the prayer properly at the appointed times." },
        { q: "Why must the caller be patient, per Ibn Kathir?", a: "People may cause harm", wrong: ["Prayers are long", "Days are hot", "Food is late"], why: "Whoever enjoins what is good... will inevitably encounter harm and annoyance from people." }
      ]
    },
    {
      slug: "no-pride",
      title: "No turned-away face",
      line: "Do not turn your face from people in pride.",
      facts: ["Greet with a cheerful face", "Allah dislikes the boaster"],
      quote: q31(18),
      source: hadith("muslim", "2626", "Abu Dharr", "Sahih", "The Prophet ﷺ said not to look down on any good deed, even meeting your brother with a cheerful face.", "even if it is that you meet your brother with a cheerful countenance"),
      difficulty: 4,
      questions: [
        { q: "How should we not turn our face, in 31:18?", a: "With pride", wrong: ["With joy", "With care", "With patience"], why: "And turn not your face away from men with pride." },
        { q: "How should we meet our brother, in the hadith?", a: "With a cheerful face", wrong: ["With silence", "With a frown", "With a gift only"], why: "Even if it is that you meet your brother with a cheerful countenance." },
        { q: "Who is the boaster, per Ibn Kathir?", a: "One who thinks he is better", wrong: ["One who prays", "One who works", "One who helps"], why: "One who shows off and admires himself, feeling that he is better than others." }
      ]
    },
    {
      slug: "pride-and-beauty",
      title: "Pride is not fine clothes",
      line: "Pride is rejecting truth and looking down on people.",
      facts: ["Allah loves beauty", "Pride is a heart disease"],
      quote: q31(18),
      source: hadith("muslim", "91", "Abdullah ibn Mas'ud", "Sahih", "The Prophet ﷺ said Allah is Graceful and loves grace. Pride is rejecting the truth and looking down on people.", "Verily, Allah is Graceful and He loves Grace"),
      difficulty: 5,
      questions: [
        { q: "What does Allah love, in the hadith?", a: "Grace", wrong: ["Pride", "Boasting", "Laziness"], why: "Verily, Allah is Graceful and He loves Grace." },
        { q: "What is pride, in the hadith?", a: "Rejecting truth, scorning people", wrong: ["Wearing nice shoes", "Being tall", "Being rich"], why: "Pride is disdaining the truth and contempt for the people." },
        { tf: true, q: "In the hadith, liking fine clothes is pride.", why: "Verily, Allah is Graceful and He loves Grace. Pride is disdaining the truth." }
      ]
    },
    {
      slug: "walk-gently-speak-softly",
      title: "Walk gently, speak softly",
      line: "Walk at a moderate pace and lower your voice.",
      facts: ["Not too slow or too fast", "No needless shouting"],
      quote: q31(19),
      source: ik(19, "Walk neither lazily nor too fast, but in between. Do not raise your voice needlessly; the donkey's bray is the harshest sound.", "do not exaggerate in your speaking and do not raise your voice unnecessarily"),
      difficulty: 4,
      questions: [
        { q: "How should we walk, per Ibn Kathir?", a: "Moderately", wrong: ["Very fast", "Very slow", "Backwards"], why: "Walk in a moderate manner, neither slow and lazy nor excessively fast." },
        { q: "What should we lower, in 31:19?", a: "Our voice", wrong: ["Our eyes only", "Our hands", "Our heads"], why: "And be moderate in your walking, and lower your voice." },
        { q: "What is the harshest voice, in 31:19?", a: "The braying of donkeys", wrong: ["Thunder", "The lion", "The wind"], why: "Verily, the harshest of all voices is the braying of the asses." }
      ]
    },
    {
      slug: "allah-protects-trusts",
      title: "Allah guards what is trusted to Him",
      line: "Luqman said: what is trusted to Allah, He protects.",
      facts: ["Trust Allah with what you love", "Luqman's sayings were many"],
      quote: q31(19),
      source: ik(19, "Imam Ahmad recorded from Ibn Umar that Luqman the Wise used to say: when something is entrusted to Allah, He protects it.", "when something is entrusted to the care of Allah, He protects it"),
      difficulty: 5,
      questions: [
        { q: "What does Allah do with what is trusted to Him?", a: "Protects it", wrong: ["Loses it", "Gives it away", "Forgets it"], why: "When something is entrusted to the care of Allah, He protects it." },
        { q: "Who used to say it, per Ibn Kathir?", a: "Luqman the Wise", wrong: ["Firawn", "Qarun", "Haman"], why: "Luqman the Wise used to say: when something is entrusted to the care of Allah, He protects it." },
        { tf: true, q: "Ibn Kathir calls Luqman's advice very useful.", why: "This is very useful advice, which the Qur'an tells us about Luqman." }
      ]
    }
  ]
};

/** Ayahs 20 to 34: blessings seen and unseen, the firmest handhold, the endless Words of Allah, ships at sea, and the five keys of the Unseen. */
const LUQMAN_TWO: DeepUnit = {
  key: "luqman2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-31",
  name: "Luqman, ayahs 20 to 34",
  kind: "skill",
  lessonType: "surah",
  surahName: "Luqman",
  lessons: [
    {
      slug: "blessings-seen-and-hidden",
      title: "Blessings seen and hidden",
      line: "Allah gave us all in the sky and earth, seen and hidden.",
      facts: ["Stars, rain and rivers serve us", "Messengers are a blessing too"],
      quote: q31(20),
      source: ik(20, "Allah made the stars, clouds and rain serve us, and gave rivers, crops and fruit. He perfected His blessings by sending Messengers and Books.", "by sending Messengers, revealing Books and removing doubts and excuses"),
      difficulty: 3,
      questions: [
        { q: "What kinds of blessings are there, in 31:20?", a: "Apparent and hidden", wrong: ["Only seen ones", "Only small ones", "None"], why: "And has completed and perfected His graces upon you, apparent and hidden." },
        { q: "Which blessing does Ibn Kathir name?", a: "Sending Messengers", wrong: ["Gold mines", "Fast horses", "Tall towers"], why: "By sending Messengers, revealing Books and removing doubts and excuses." },
        { q: "How do some dispute, in 31:20?", a: "Without knowledge", wrong: ["With proof", "With a Book", "With guidance"], why: "Yet of mankind is he who disputes about Allah without knowledge or guidance or a Book giving light." }
      ]
    },
    {
      slug: "only-our-fathers",
      title: "Only what our fathers did",
      line: "Told to follow revelation, they say: we follow our fathers.",
      facts: ["Habit is not proof", "Follow what Allah sent"],
      quote: q31(21),
      source: ik(21, "Their only proof is copying their forefathers, though those forefathers were misguided.", "they have no other proof except the fact that they are following their forefathers"),
      difficulty: 4,
      questions: [
        { q: "What are they told to follow, in 31:21?", a: "What Allah sent down", wrong: ["Their fathers", "Their wishes", "The crowd"], why: "Follow that which Allah has sent down." },
        { q: "What do they follow instead, in 31:21?", a: "Their fathers' way", wrong: ["The Quran", "Their teachers", "The stars"], why: "Nay, we shall follow that which we found our fathers (following)." },
        { q: "What proof do they have, per Ibn Kathir?", a: "Only copying forefathers", wrong: ["Clear signs", "A revealed Book", "Miracles"], why: "They have no other proof except the fact that they are following their forefathers." }
      ]
    },
    {
      slug: "the-firmest-handhold",
      title: "The firmest handhold",
      line: "Whoever submits to Allah and does good holds the firmest rope.",
      facts: ["Sincerity is key", "All matters return to Allah"],
      quote: q31(22),
      source: ik(22, "Submitting the face means doing deeds sincerely for Allah and following His law. Such a person has a firm promise from Allah.", "he has received a firm promise from Allah that He will not punish him"),
      difficulty: 3,
      questions: [
        { q: "What has he grasped, in 31:22?", a: "The most trustworthy handhold", wrong: ["A weak branch", "A sword", "A crown"], why: "Then he has grasped the most trustworthy handhold." },
        { q: "What is a Muhsin, per Ibn Kathir?", a: "Obeys and avoids the forbidden", wrong: ["Rich and famous", "Strong and tall", "Quiet and alone"], why: "Doing what his Lord has commanded and abstaining from what He has forbidden." },
        { q: "To whom do all matters return, in 31:22?", a: "Allah", wrong: ["Kings", "Judges", "Elders"], why: "And to Allah return all matters for decision." }
      ]
    },
    {
      slug: "do-not-grieve",
      title: "Do not grieve",
      line: "Let not their disbelief sadden you; Allah knows all hearts.",
      facts: ["Comfort for the Prophet ﷺ", "Nothing is hidden from Allah"],
      quote: q31(23),
      source: ik(23, "Allah told the Prophet ﷺ not to grieve over the disbelievers. They will return to Allah, Who knows what is in every heart.", "nothing whatsoever is hidden from Him"),
      difficulty: 4,
      questions: [
        { q: "What should not grieve him, in 31:23?", a: "Their disbelief", wrong: ["The weather", "Hunger", "Travel"], why: "And whoever disbelieves, let not his disbelief grieve you." },
        { q: "What does Allah know, in 31:23?", a: "What is in the breasts", wrong: ["Only deeds", "Only words", "Only the past"], why: "Verily, Allah is the All-Knower of what is in the breasts." },
        { tf: true, q: "Ibn Kathir says some secrets are hidden from Allah.", why: "And nothing whatsoever is hidden from Him." }
      ]
    },
    {
      slug: "a-little-while",
      title: "Only a little while",
      line: "Allah lets the deniers enjoy this world only a little while.",
      facts: ["This life is short", "The Hereafter lasts"],
      quote: q31(24),
      source: ik(24, "The deniers enjoy this world briefly, then return to Allah to face what they did.", "We let them enjoy for a little while"),
      difficulty: 4,
      questions: [
        { q: "How long do they enjoy, in 31:24?", a: "A little while", wrong: ["Forever", "A thousand years", "Never"], why: "We let them enjoy for a little while." },
        { q: "Where is the enjoyment, per Ibn Kathir?", a: "In this world", wrong: ["In Paradise", "In the grave", "In a dream"], why: "We let them enjoy for a little while, means, in this world." },
        { tf: true, q: "Ibn Kathir links 31:24 to 10:69-70.", why: "This is like the Ayah... Enjoyment in this world! and then unto Us will be their return. (10:69-70)" }
      ]
    },
    {
      slug: "they-say-allah",
      title: "They say: Allah",
      line: "Ask who made the heavens and earth; they will say: Allah.",
      facts: ["Their own answer proves Tawhid", "Praise belongs to Allah"],
      quote: q31(25),
      source: ik(25, "The idolators admitted Allah alone created the heavens and earth, yet worshipped others. Their own words are proof against them.", "By their admitting that, proof is established against them"),
      difficulty: 3,
      questions: [
        { q: "Whom do they name as Creator, in 31:25?", a: "Allah", wrong: ["Their idols", "Nature", "No one"], why: "They will certainly say: Allah." },
        { q: "What does their answer establish, per Ibn Kathir?", a: "Proof against them", wrong: ["Their excuse", "Their wisdom", "Nothing"], why: "By their admitting that, proof is established against them." },
        { q: "What should we say then, in 31:25?", a: "All praise is for Allah", wrong: ["We are sorry", "Peace", "Goodbye"], why: "Say: All the praises and thanks be to Allah!" }
      ]
    },
    {
      slug: "al-ghani",
      title: "Al-Ghani, the Rich",
      line: "All in the heavens and earth is Allah's; He needs no one.",
      facts: ["Everything needs Allah", "He is worthy of all praise"],
      quote: q31(26),
      source: ik(26, "Allah needs no one and nothing, while everything needs Him. He is praised for all He created and decreed.", "He has no need of anyone or anything besides Himself, and everything else is in need of Him"),
      difficulty: 4,
      questions: [
        { q: "To whom belongs all in the heavens and earth, in 31:26?", a: "Allah", wrong: ["Kings", "People", "Angels"], why: "To Allah belongs whatsoever is in the heavens and the earth." },
        { q: "What does Al-Ghani mean, per Ibn Kathir?", a: "He needs no one", wrong: ["He is far", "He is new", "He is many"], why: "He has no need of anyone or anything besides Himself." },
        { tf: true, q: "Ibn Kathir says everything else needs Allah.", why: "And everything else is in need of Him." }
      ]
    },
    {
      slug: "trees-as-pens",
      title: "Trees as pens",
      line: "If trees were pens and seas ink, Allah's Words would not end.",
      facts: ["Allah's Words are endless", "Seven means very many"],
      quote: q31(27),
      source: ik(27, "Even if every tree were a pen and the seas were ink, with seven more seas, the pens would break before Allah's Words ended.", "even if all the trees on earth were made into pens and the sea was made into ink"),
      difficulty: 4,
      questions: [
        { q: "What would the trees become, in 31:27?", a: "Pens", wrong: ["Ships", "Houses", "Walls"], why: "And if all the trees on the earth were pens." },
        { q: "What does the number seven show, per Ibn Kathir?", a: "A large amount", wrong: ["Exactly seven", "Seven days", "A small amount"], why: "The number seven is used to indicate a large amount, it is not to be taken literally." },
        { q: "What would not run out, in 31:27?", a: "The Words of Allah", wrong: ["The ink", "The trees", "The pens"], why: "Yet the Words of Allah would not be exhausted." }
      ]
    },
    {
      slug: "like-a-single-soul",
      title: "Like a single soul",
      line: "Creating and raising all people is like one soul for Allah.",
      facts: ["Nothing is hard for Allah", "One command is enough"],
      quote: q31(28),
      source: ik(28, "Creating and raising all of mankind is as easy for Allah as one soul. He commands once, and it happens.", "He only has to command a thing once, and it will happen"),
      difficulty: 4,
      questions: [
        { q: "Our creation and raising are like what, in 31:28?", a: "A single person", wrong: ["A great army", "A hard task", "A long journey"], why: "The creation of you all and the resurrection of you all are only as a single person." },
        { q: "How many times must Allah command, per Ibn Kathir?", a: "Once", wrong: ["Three times", "Seven times", "Daily"], why: "He only has to command a thing once, and it will happen." },
        { q: "Which Names end 31:28?", a: "All-Hearer, All-Seer", wrong: ["All-Mighty, All-Wise", "Rich, Praised", "First, Last"], why: "Verily, Allah is All-Hearer, All-Seer." }
      ]
    },
    {
      slug: "night-into-day",
      title: "Night into day",
      line: "Allah merges night into day and runs the sun and moon.",
      facts: ["Longer days in summer", "Each orbit has a set term"],
      quote: q31(29),
      source: ik(29, "Allah takes from the night and adds to the day, so days grow longer in summer and shorter in winter.", "He takes from the night and adds to the day"),
      difficulty: 3,
      questions: [
        { q: "What does Allah merge, in 31:29?", a: "Night into day", wrong: ["Sea into land", "Fire into water", "Stars into clouds"], why: "See you not that Allah merges the night into the day." },
        { q: "When are days longest, per Ibn Kathir?", a: "In summer", wrong: ["In winter", "In spring", "Never"], why: "Which is what happens in summer when the days are longest." },
        { q: "How do the sun and moon run, in 31:29?", a: "For a term appointed", wrong: ["Without order", "Backwards", "By chance"], why: "Each running its course for a term appointed." }
      ]
    },
    {
      slug: "where-the-sun-goes",
      title: "Where the sun goes",
      line: "The sun prostrates beneath the Throne and asks leave to rise.",
      facts: ["The sun obeys Allah", "It asks leave to rise"],
      quote: q31(29),
      source: hadith("bukhari", "3199", "Abu Dharr", "Sahih", "The Prophet ﷺ asked Abu Dharr where the sun goes at sunset, then said it prostrates beneath the Throne and asks leave to rise.", "till it prostrates Itself underneath the Throne"),
      difficulty: 5,
      questions: [
        { q: "Whom did the Prophet ﷺ ask about the sun?", a: "Abu Dharr", wrong: ["Abu Bakr", "Ali", "Umar"], why: "The Prophet ﷺ asked me at sunset: Do you know where the sun goes?" },
        { q: "Where does the sun prostrate, in the hadith?", a: "Beneath the Throne", wrong: ["In the sea", "On a mountain", "In a cave"], why: "It goes till it prostrates Itself underneath the Throne." },
        { q: "What did Abu Dharr reply?", a: "Allah and His Messenger ﷺ know", wrong: ["It sleeps", "It hides", "It melts"], why: "I replied: Allah and His Apostle know better." }
      ]
    },
    {
      slug: "allah-is-the-truth",
      title: "Allah is the Truth",
      line: "Allah is the Truth; all they call on besides Him is false.",
      facts: ["Idols cannot make a fly", "He is Most High, Most Great"],
      quote: q31(30),
      source: ik(30, "Allah truly exists and is truly God; all else they worship is false. If all came together, they could not create a fly.", "If all the people of heaven and earth were to come together to create a fly, they would not be able to do so"),
      difficulty: 4,
      questions: [
        { q: "What is Allah, in 31:30?", a: "The Truth", wrong: ["A legend", "A rumor", "A guess"], why: "That is because Allah, He is the Truth." },
        { q: "What could no one create, per Ibn Kathir?", a: "A fly", wrong: ["A song", "A house", "A road"], why: "If all the people of heaven and earth were to come together to create a fly, they would not be able to do so." },
        { q: "Which Names end 31:30?", a: "Most High, Most Great", wrong: ["All-Hearer, All-Seer", "Rich, Praised", "Mighty, Wise"], why: "And that Allah, He is the Most High, the Most Great." }
      ]
    },
    {
      slug: "ships-by-his-grace",
      title: "Ships by His grace",
      line: "Ships sail by Allah's grace, signs for the patient and grateful.",
      facts: ["Water carries ships by His power", "Patience in hardship, thanks in ease"],
      quote: q31(31),
      source: ik(31, "Ships sail because Allah gave water the strength to carry them. These are signs for those patient in hardship and thankful in ease.", "every person who bears difficulty with patience and who gives thanks at times of ease"),
      difficulty: 4,
      questions: [
        { q: "How do ships sail, in 31:31?", a: "By Allah's grace", wrong: ["By luck", "By magic", "By wind alone"], why: "The ships sail through the sea by Allah's grace." },
        { q: "For whom are these signs, in 31:31?", a: "The patient and grateful", wrong: ["The proud", "The lazy", "The careless"], why: "Verily, in this are signs for every patient, grateful." },
        { q: "When should we give thanks, per Ibn Kathir?", a: "At times of ease", wrong: ["Never", "Only in loss", "Only at Eid"], why: "Who gives thanks at times of ease." }
      ]
    },
    {
      slug: "waves-like-shades",
      title: "Waves like shades",
      line: "When waves rise like shades, they call on Allah alone.",
      facts: ["Hardship turns hearts to Allah", "Do not forget Him after ease"],
      quote: q31(32),
      source: ik(32, "Waves rise like mountains or clouds, and people pray to Allah alone. Safe on land, some forget. Khattar is one who breaks promises.", "whenever he makes a promise, breaks his promise"),
      difficulty: 5,
      questions: [
        { q: "What are the waves like, per Ibn Kathir?", a: "Mountains or clouds", wrong: ["Small ripples", "Rivers", "Rain drops"], why: "Meaning, like mountains or clouds." },
        { q: "Whom do they call upon then, in 31:32?", a: "Allah only", wrong: ["Their idols", "The captain", "No one"], why: "They invoke Allah, making their invocations for Him only." },
        { q: "What is a Khattar, per Ibn Kathir?", a: "One who breaks promises", wrong: ["A sailor", "A poet", "A guard"], why: "Whenever he makes a promise, breaks his promise." }
      ]
    },
    {
      slug: "no-father-no-son",
      title: "No father, no son",
      line: "Fear a Day when no father or son can help the other.",
      facts: ["Each carries his own deeds", "Do not be fooled by this life"],
      quote: q31(33),
      source: ik(33, "Do not let comfort in this life make you forget the Hereafter, and do not let Shaytan deceive you about Allah.", "do not let your feelings of contentment with this life make you forget about the Hereafter"),
      difficulty: 4,
      questions: [
        { q: "Who cannot help his son, in 31:33?", a: "A father", wrong: ["A friend", "A teacher", "A king"], why: "Fear a Day when no father can avail aught for his son." },
        { q: "Who is the chief deceiver, per Ibn Kathir?", a: "The Shaytan", wrong: ["A king", "A trader", "A poet"], why: "Nor let the chief deceiver deceive you about Allah, refers to the Shaytan." },
        { q: "What must not deceive us, in 31:33?", a: "This present life", wrong: ["The Quran", "Our prayer", "The truth"], why: "Let not then this present life deceive you." }
      ]
    },
    {
      slug: "keys-of-the-unseen",
      title: "The keys of the Unseen",
      line: "Only Allah knows the Hour, the rain, and what is in wombs.",
      facts: ["Five things only Allah knows", "No one knows where he will die"],
      quote: q31(34),
      source: hadith("bukhari", "4697", "Ibn Umar", "Sahih", "The Prophet ﷺ said the keys of the Unseen are five, known only to Allah: tomorrow, the wombs, the rain, where one dies, and the Hour.", "The keys of Unseen are five which none knows but Allah"),
      difficulty: 4,
      questions: [
        { q: "How many keys of the Unseen are there, in the hadith?", a: "Five", wrong: ["Three", "Seven", "Ten"], why: "The keys of Unseen are five which none knows but Allah." },
        { q: "Who knows when the Hour comes, in 31:34?", a: "Allah alone", wrong: ["The angels", "Fortune tellers", "Scientists"], why: "Verily, Allah, with Him is the knowledge of the Hour." },
        { q: "What does no one know, in 31:34?", a: "In what land he will die", wrong: ["His own name", "The days of the week", "His language"], why: "And no person knows in what land he will die." }
      ]
    },
    {
      slug: "allah-alone-knows",
      title: "Allah alone knows",
      line: "No one knows the Unseen unless Allah tells them.",
      facts: ["Not even angels know the Hour", "Allah is All-Knower, All-Aware"],
      quote: q31(34),
      source: ik(34, "These are the keys of the Unseen that Allah kept for Himself. No sent Prophet or close angel knows when the Hour will come.", "These are the keys of the Unseen, whose knowledge Allah alone has kept for Himself"),
      difficulty: 5,
      questions: [
        { q: "Who knows the time of the Hour, per Ibn Kathir?", a: "Allah alone", wrong: ["A close angel", "Every Prophet", "Wise people"], why: "The knowledge of when the Hour will occur is not known to any Prophet who was sent or any angel who is close to Allah." },
        { q: "Which ayah does Ibn Kathir link to 31:34?", a: "6:59", wrong: ["2:255", "112:1", "1:1"], why: "And with Him are the keys of the Unseen, none knows them but He. (6:59)" },
        { tf: true, q: "Ibn Kathir says no one knows what he will earn tomorrow.", why: "No one knows what he will earn tomorrow with regard to this world or the Hereafter." }
      ]
    }
  ]
};

export const LUQMAN_UNITS: readonly DeepUnit[] = [LUQMAN_ONE, LUQMAN_TWO];
