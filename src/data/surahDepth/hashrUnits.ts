import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Al-Hashr ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Hashr 59:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_59_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Hashr 59:${ayah}`,
    url: `https://quran.com/59:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 59:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q59 = (ayah: number) => quranQuote(59, ayah);

/** Ayahs 1 to 5: everything glorifies Allah, and the story of Bani An-Nadir leaving Madinah. */
const HASHR_ONE: DeepUnit = {
  key: "hashr1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-59",
  name: "Al-Hashr, ayahs 1 to 5",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Hashr",
  lessons: [
    {
      slug: "surah-of-an-nadir",
      title: "The surah of An-Nadir",
      line: "Ibn Abbas called Al-Hashr the surah of Bani An-Nadir.",
      facts: ["Al-Hashr means the Gathering", "Revealed about one tribe in Madinah"],
      quote: q59(1),
      source: hadith("bukhari", "4883", "Sa'id ibn Jubayr", "Sahih", "Sa'id ibn Jubayr asked Ibn Abbas about Surat Al-Hashr, and he said: call it Surat An-Nadir.", "Say Surat An-Nadir"),
      difficulty: 2,
      questions: [
        { q: "What did Ibn Abbas call Al-Hashr?", a: "Surat An-Nadir", wrong: ["Surat Al-Fil", "Surat Quraysh", "Surat Al-Kahf"], why: "Say Surat An-Nadir." },
        { q: "Who asked Ibn Abbas about it?", a: "Sa'id ibn Jubayr", wrong: ["Abu Bakr", "Bilal", "Mus'ab"], why: "Narrated Sa'id: I asked Ibn Abbas about Surat Al-Hashr." },
        { tf: true, q: "Al-Hashr was revealed about Bani An-Nadir.", why: "It was revealed about Bani An-Nadir." }
      ]
    },
    {
      slug: "everything-glorifies",
      title: "Everything glorifies Allah",
      line: "All in the heavens and earth glorifies Allah.",
      facts: ["Tasbih: declaring Allah perfect", "Every creature praises Him its own way"],
      quote: q59(1),
      source: ik(1, "Ibn Kathir says everything in the heavens and on the earth praises, glorifies and reveres Allah and affirms His Oneness.", "everything that exists in the heavens and on the earth praises, glorifies"),
      difficulty: 1,
      questions: [
        { q: "What glorifies Allah, in 59:1?", a: "All in the heavens and earth", wrong: ["Only people", "Only angels", "Only birds"], why: "Whatsoever is in the heavens and whatsoever is on the earth glorifies Allah." },
        { q: "What else does creation affirm, per Ibn Kathir?", a: "His Oneness", wrong: ["Its own power", "Many gods", "Nothing"], why: "Praises, glorifies, reveres and prays to Him and affirms His Oneness." },
        { tf: true, q: "Even things on earth praise Allah.", why: "Whatsoever is on the earth glorifies Allah." }
      ]
    },
    {
      slug: "praise-we-cannot-hear",
      title: "Praise we cannot hear",
      line: "Creation praises Allah in ways we do not understand.",
      facts: ["17:44 says so too", "Stones and trees have their own praise"],
      quote: q59(1),
      source: ik(1, "Ibn Kathir links this to 17:44: there is not a thing but glorifies His praise, but you understand not their glorification.", "But you understand not their glorification"),
      difficulty: 2,
      questions: [
        { q: "Which ayah does Ibn Kathir link to 59:1?", a: "17:44", wrong: ["2:255", "112:1", "1:1"], why: "There is not a thing but glorifies His praise. (17:44)" },
        { q: "Do we understand creation's praise?", a: "No, we do not", wrong: ["Yes, fully", "Only birds", "Only at night"], why: "But you understand not their glorification." },
        { tf: true, q: "The seven heavens glorify Allah.", why: "The seven heavens and the earth and all that is therein, glorify Him." }
      ]
    },
    {
      slug: "almighty-all-wise",
      title: "Almighty, All-Wise",
      line: "Allah is Al-Aziz in majesty and Al-Hakim in His decrees.",
      facts: ["Al-Aziz: invincible majesty", "Al-Hakim: wise in all He decrees"],
      quote: q59(1),
      source: ik(1, "Ibn Kathir says the Almighty means of invincible majesty, and the All-Wise means in what He decrees and legislates.", "of invincible majesty"),
      difficulty: 2,
      questions: [
        { q: "What does Al-Aziz mean, per Ibn Kathir?", a: "Of invincible majesty", wrong: ["Very hungry", "Very small", "Often absent"], why: "And He is the Almighty, meaning of invincible majesty." },
        { q: "Where is Allah All-Wise?", a: "In what He decrees and legislates", wrong: ["Only in war", "Only in trade", "Nowhere"], why: "The All-Wise, in what He decrees and legislates." },
        { tf: true, q: "Al-Hashr opens and ends with Almighty, All-Wise.", why: "And He is the Almighty, the All-Wise. (59:1 and 59:24)" }
      ]
    },
    {
      slug: "a-peace-treaty",
      title: "A peace treaty",
      line: "In Madinah, the Prophet ﷺ made a peace treaty with the tribes.",
      facts: ["Neither side would fight the other", "A promise both sides had to keep"],
      quote: q59(2),
      source: ik(2, "Ibn Kathir says when the Prophet ﷺ migrated to Madinah, he made a peace treaty that he would not fight them and they would not fight him.", "he made a peace treaty with the Jews stipulating that he would not fight them and they would not fight him"),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ make on reaching Madinah?", a: "A peace treaty", wrong: ["A war", "A palace", "A market tax"], why: "He made a peace treaty with the Jews." },
        { q: "What did the treaty promise?", a: "No side would fight the other", wrong: ["Shared homes", "Free food", "One language"], why: "That he would not fight them and they would not fight him." },
        { tf: true, q: "The Prophet ﷺ kept to his treaties.", why: "He made a peace treaty... stipulating that he would not fight them." }
      ]
    },
    {
      slug: "a-broken-promise",
      title: "A broken promise",
      line: "Bani An-Nadir soon broke the treaty they had made.",
      facts: ["Breaking a promise is serious", "Allah's decree then reached them"],
      quote: q59(2),
      source: ik(2, "Ibn Kathir says they soon betrayed the treaty they made with the Messenger of Allah.", "They soon betrayed the treaty"),
      difficulty: 2,
      questions: [
        { q: "What did Bani An-Nadir do to the treaty?", a: "They betrayed it", wrong: ["They kept it", "They wrote more", "They forgot it"], why: "They soon betrayed the treaty." },
        { q: "Can Allah's appointed decree be resisted?", a: "No, never", wrong: ["Yes, with forts", "Yes, with gold", "Only at night"], why: "His appointed destiny touched them; it can never be resisted." },
        { tf: true, q: "Keeping promises matters in Islam.", why: "They soon betrayed the treaty that they made with Allah's Messenger." }
      ]
    },
    {
      slug: "a-plot-revealed",
      title: "A plot revealed",
      line: "Some planned to harm the Prophet ﷺ, and Allah warned him first.",
      facts: ["The plan was made in secret", "Allah protected His Messenger"],
      quote: q59(2),
      source: ik(2, "Ibn Kathir says they planned to harm the Messenger ﷺ, and Allah informed His Messenger of this plot before they could harm him.", "Allah informed His Messenger…of this plot before they could harm him"),
      difficulty: 3,
      questions: [
        { q: "Who told the Prophet ﷺ about the plot?", a: "Allah", wrong: ["A child", "A merchant", "No one"], why: "Allah informed His Messenger of this plot." },
        { q: "When did Allah tell him?", a: "Before they could harm him", wrong: ["After a year", "Too late", "Never"], why: "Before they could harm him." },
        { tf: true, q: "Allah protected His Messenger from their plan.", why: "Allah informed His Messenger of this plot before they could harm him." }
      ]
    },
    {
      slug: "forts-could-not-protect",
      title: "Forts could not protect",
      line: "They thought their strong forts would protect them from Allah.",
      facts: ["Their forts were very strong", "Nothing protects against Allah"],
      quote: q59(2),
      source: ik(2, "Ibn Kathir says they thought their fortifications would save them from Allah, but they did not help them in the least.", "their fortifications will save them from Allah"),
      difficulty: 2,
      questions: [
        { q: "What did they think would protect them?", a: "Their fortresses", wrong: ["Their camels", "Their songs", "Their clothes"], why: "And they thought that their fortresses would defend them from Allah!" },
        { q: "Did the forts help them against Allah?", a: "Not in the least", wrong: ["Yes, fully", "For ten years", "Only the gates"], why: "But they did not help them against Allah in the least." },
        { tf: false, q: "The Muslims expected to take the forts easily.", why: "You did not think that they would get out." }
      ]
    },
    {
      slug: "only-six-days",
      title: "Only six days",
      line: "The forts were surrounded for only six days before they left.",
      facts: ["Their forts were formidable", "Yet they gave up quickly"],
      quote: q59(2),
      source: ik(2, "Ibn Kathir says the Companions surrounded their forts for only six days, though the forts were fortified and formidable.", "The Companions had surrounded their forts for only six days"),
      difficulty: 3,
      questions: [
        { q: "How long were the forts surrounded?", a: "Six days", wrong: ["Six months", "Six years", "One hour"], why: "The Companions had surrounded their forts for only six days." },
        { q: "How strong were the forts?", a: "Fortified and formidable", wrong: ["Made of cloth", "Broken down", "Very small"], why: "Their forts were fortified and formidable." },
        { tf: true, q: "Nobody expected them to leave so soon.", why: "You did not think that they would get out." }
      ]
    },
    {
      slug: "from-where-they-expected-not",
      title: "From where they expected not",
      line: "Allah's decree came from where they never expected.",
      facts: ["No plan can block Allah", "16:26 says the same of others"],
      quote: q59(2),
      source: ik(2, "Ibn Kathir says there came to them from Allah what they did not expect or anticipate.", "there came to them from Allah what they did not expect or anticipate"),
      difficulty: 2,
      questions: [
        { q: "How did Allah reach them?", a: "From where they did not expect", wrong: ["Through the gate only", "With a letter", "Not at all"], why: "But Allah reached them from a place whereof they expected it not." },
        { q: "Which ayah does Ibn Kathir compare?", a: "16:26", wrong: ["1:7", "114:1", "2:286"], why: "From directions they did not perceive. (16:26)" },
        { tf: true, q: "They did not anticipate what came.", why: "What they did not expect or anticipate." }
      ]
    },
    {
      slug: "fear-in-their-hearts",
      title: "Fear in their hearts",
      line: "Allah put fear in their hearts, so they gave up.",
      facts: ["Fear can come only from Allah", "Their hearts lost courage"],
      quote: q59(2),
      source: ik(2, "Ibn Kathir says Allah cast fear, terror and fright in their hearts.", "Allah cast fear, terror and fright in their hearts"),
      difficulty: 2,
      questions: [
        { q: "What did Allah cast into their hearts?", a: "Terror", wrong: ["Joy", "Hunger", "Sleep"], why: "And He cast terror into their hearts." },
        { q: "Who cast the fear, per Ibn Kathir?", a: "Allah", wrong: ["Their leaders", "The weather", "A rumor"], why: "Allah cast fear, terror and fright in their hearts." },
        { tf: true, q: "Their fear came before any big battle.", why: "The Companions had surrounded their forts for only six days." }
      ]
    },
    {
      slug: "awe-for-a-month",
      title: "Awe for a month's journey",
      line: "Allah helped the Prophet ﷺ with awe felt a month's journey away.",
      facts: ["One of five gifts to the Prophet ﷺ", "Given to no one before him"],
      quote: q59(2),
      source: hadith("bukhari", "335", "Jabir ibn Abdullah", "Sahih", "The Prophet ﷺ said he was given five things not given to anyone before, the first being that Allah made him victorious by awe for a month's journey.", "Allah made me victorious by awe"),
      difficulty: 3,
      questions: [
        { q: "How many special gifts does Bukhari 335 list?", a: "Five", wrong: ["Two", "Ten", "Seven"], why: "I have been given five things which were not given to any one else before me." },
        { q: "How far did the awe reach?", a: "A month's journey", wrong: ["One step", "One day", "One mile"], why: "For a distance of one month's journey." },
        { tf: true, q: "Ibn Kathir links this gift to 59:2.", why: "He who was given victory, by Allah frightening his enemies the distance of a month, laid siege to them." }
      ]
    },
    {
      slug: "doors-on-camels",
      title: "Doors on their camels",
      line: "They pulled down their own houses to carry the doors away.",
      facts: ["They took roofs and doors", "With their own hands"],
      quote: q59(2),
      source: ik(2, "Ibn Kathir says they brought down what they wanted to transport from their roofs and doors to carry them on camels.", "brought down what they wanted to transport from their roofs and doors"),
      difficulty: 2,
      questions: [
        { q: "What did they pull down to take along?", a: "Roofs and doors", wrong: ["Trees", "Mountains", "Wells"], why: "Brought down what they wanted to transport from their roofs and doors." },
        { q: "How did they carry these things?", a: "On camels", wrong: ["On ships", "On carts", "On their heads"], why: "So that they could carry them on camels." },
        { tf: true, q: "They demolished dwellings with their own hands.", why: "They demolished their own dwellings with their own hands." }
      ]
    },
    {
      slug: "what-camels-could-carry",
      title: "What camels could carry",
      line: "They were allowed to leave with all their camels could carry.",
      facts: ["Their lives were spared", "Weapons stayed behind"],
      quote: q59(2),
      source: ik(2, "Ibn Kathir says the Prophet ﷺ allowed them to evacuate their forts and take whatever their camels could carry.", "take whatever their camels could carry"),
      difficulty: 2,
      questions: [
        { q: "What could they take with them?", a: "Whatever their camels could carry", wrong: ["Nothing", "Only food", "Only children"], why: "Take whatever their camels could carry." },
        { q: "Where did some of them go?", a: "Khaybar", wrong: ["Makkah", "Yemen", "Egypt"], why: "While others went to Khaybar." },
        { tf: true, q: "Some went to the land of Ash-Sham.", why: "Some of them went to Adhri'at in the area of Ash-Sham." }
      ]
    },
    {
      slug: "take-a-lesson",
      title: "Take a lesson",
      line: "Allah says: take a lesson, you who have eyes.",
      facts: ["Look at how events end", "Learn before it is too late"],
      quote: q59(2),
      source: ik(2, "Ibn Kathir says this means: contemplate the end of those who defied Allah's command.", "Contemplate the end of those who defied"),
      difficulty: 2,
      questions: [
        { q: "Whom does 59:2 tell to take admonition?", a: "Those with eyes", wrong: ["Only kings", "Only scholars", "Only children"], why: "Then take admonition, O you with eyes." },
        { q: "What should we contemplate?", a: "The end of those who defied Allah", wrong: ["The weather", "Old songs", "Market prices"], why: "Contemplate the end of those who defied Allah's command." },
        { tf: true, q: "History is a lesson for people who reflect.", why: "Then take admonition, O you with eyes." }
      ]
    },
    {
      slug: "exile-was-decreed",
      title: "Exile was decreed",
      line: "Allah had written that they would leave Madinah.",
      facts: ["Leaving was lighter than other ends", "Allah's decree is always just"],
      quote: q59(3),
      source: ik(3, "Ibn Kathir says Allah had already decreed that they would evacuate Madinah, leaving their homes and wealth behind.", "Allah had already decreed that they would evacuate Al-Madinah"),
      difficulty: 3,
      questions: [
        { q: "What had Allah decreed for them?", a: "Exile from Madinah", wrong: ["Riches", "Leadership", "Long sleep"], why: "Allah had already decreed that they would evacuate Al-Madinah." },
        { q: "What did they leave behind?", a: "Their homes and wealth", wrong: ["Nothing", "Only toys", "Only books"], why: "Leaving behind their homes and wealth." },
        { tf: true, q: "Without the exile, a harder punishment would have come.", why: "He would certainly have punished them in this world." }
      ]
    },
    {
      slug: "why-it-happened",
      title: "Why it happened",
      line: "This came because they opposed Allah and His Messenger.",
      facts: ["They denied what their Books foretold", "Allah is Severe in punishment"],
      quote: q59(4),
      source: ik(4, "Ibn Kathir says this was because they defied Allah and His Messenger and denied the good news in the earlier Books about Muhammad.", "because they defied Allah and His Messenger"),
      difficulty: 3,
      questions: [
        { q: "Why did this come upon them, in 59:4?", a: "They opposed Allah and His Messenger", wrong: ["They were poor", "They were few", "They were far"], why: "That is because they opposed Allah and His Messenger." },
        { q: "What news did they deny, per Ibn Kathir?", a: "The coming of Muhammad", wrong: ["Rain news", "Trade news", "War news"], why: "Denied the good news... regarding the coming of Muhammad." },
        { tf: true, q: "Earlier Books gave good news of Muhammad.", why: "The good news that Allah sent forth in the Books of previous Messengers regarding the coming of Muhammad." }
      ]
    },
    {
      slug: "known-like-their-children",
      title: "Known like their children",
      line: "They knew he was truly sent, as they knew their own children.",
      facts: ["The signs were clear to them", "Knowing is not the same as believing"],
      quote: q59(4),
      source: ik(4, "Ibn Kathir says they knew these facts about Muhammad just as they knew their own children.", "just as they knew their own children"),
      difficulty: 3,
      questions: [
        { q: "How well did they know he was true?", a: "As they knew their own children", wrong: ["Not at all", "A little", "Only by rumor"], why: "Just as they knew their own children." },
        { q: "How does 59:4 end?", a: "Allah is Severe in punishment", wrong: ["Allah is Forgiving", "Allah is Near", "Allah is Rich"], why: "Then verily, Allah is Severe in punishment." },
        { tf: false, q: "Knowing the truth is enough without following it.", why: "They knew... yet they defied Allah and His Messenger." }
      ]
    },
    {
      slug: "the-linah-palms",
      title: "The Linah palms",
      line: "Linah is a fine kind of date palm named in 59:5.",
      facts: ["Different from Ajwah dates", "Some palms were cut, some left"],
      quote: q59(5),
      source: ik(5, "Ibn Kathir says Linah is an especially good type of date tree; Abu Ubaydah said it differs from Ajwah and Barni.", "Linah is an especially good type of date tree"),
      difficulty: 3,
      questions: [
        { q: "What is Linah?", a: "A fine type of date palm", wrong: ["A river", "A sword", "A fort"], why: "Linah is an especially good type of date tree." },
        { q: "Which dates did Abu Ubaydah say differ from Linah?", a: "Ajwah and Barni", wrong: ["Figs and grapes", "Olives", "Apples"], why: "Linah is a different kind of dates than Ajwah and Barni." },
        { tf: true, q: "Some palms were left standing.", why: "Or you left them standing on their stems." }
      ]
    },
    {
      slug: "by-allahs-leave",
      title: "By Allah's leave",
      line: "Cutting or leaving the palms was done by Allah's permission.",
      facts: ["They asked why trees were cut", "Allah answered in 59:5"],
      quote: q59(5),
      source: ik(5, "Ibn Kathir says Allah revealed that whatever Linah was felled or left was done by His permission, will and leave.", "has been done by His permission"),
      difficulty: 3,
      questions: [
        { q: "By whose leave were the palms cut or left?", a: "Allah's", wrong: ["A king's", "Nobody's", "The army's"], why: "It was by leave of Allah." },
        { q: "What did Bani An-Nadir ask?", a: "Why the trees were cut", wrong: ["For more land", "For a feast", "For a ship"], why: "So why did he order that their trees be cut down?" },
        { tf: true, q: "59:5 was revealed to answer their question.", why: "Allah sent down this honorable Ayah." }
      ]
    },
    {
      slug: "both-groups-approved",
      title: "Both groups approved",
      line: "Some cut the palms, some held back, and the Quran approved both.",
      facts: ["Mujahid explained this", "Both acted by Allah's leave"],
      quote: q59(5),
      source: ik(5, "Ibn Kathir quotes Mujahid: the Quran approved of those who discouraged and those who approved of cutting the trees.", "approved of the actions of those who discouraged and those who approved of cutting these trees"),
      difficulty: 4,
      questions: [
        { q: "Whom did the Quran approve, per Mujahid?", a: "Both groups", wrong: ["Only the cutters", "Only the others", "Neither"], why: "The Qur'an approved of the actions of those who discouraged and those who approved." },
        { q: "Why did some Muhajirin hold back?", a: "The trees were war spoils for Muslims", wrong: ["They were tired", "They were scared", "It was night"], why: "Saying that they were war spoils for Muslims." },
        { tf: true, q: "The Muslims worried about reward and blame.", why: "We must ask Allah's Messenger if we will earn a reward for what we cut." }
      ]
    },
    {
      slug: "palms-of-al-buwayrah",
      title: "The palms of Al-Buwayrah",
      line: "The palms were at Al-Buwayrah, a place near Madinah.",
      facts: ["Ibn Umar narrated it", "59:5 was revealed about it"],
      quote: q59(5),
      source: hadith("bukhari", "4884", "Abdullah ibn Umar", "Sahih", "Ibn Umar said the palms of Bani An-Nadir at Al-Buwayrah were cut down, and Allah revealed 59:5.", "cut down the palm trees of Bani An-Nadir which were at Al-Buwaira"),
      difficulty: 3,
      questions: [
        { q: "Where were the palm trees?", a: "Al-Buwayrah", wrong: ["Uhud", "Badr", "Taif"], why: "The palm trees of Bani An-Nadir which were at Al-Buwaira." },
        { q: "Who narrated Bukhari 4884?", a: "Ibn Umar", wrong: ["Anas", "Aishah", "Abu Bakr"], why: "Narrated Ibn Umar." },
        { tf: true, q: "Al-Buwayrah is a place near Madinah.", why: "Al-Buwaira (a place near Medina)." }
      ]
    }
  ]
};

/** Ayahs 6 to 10: wealth gained without battle, obeying the Messenger ﷺ, the Muhajirin, the Ansar, and those after them. */
const HASHR_TWO: DeepUnit = {
  key: "hashr2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-59",
  name: "Al-Hashr, ayahs 6 to 10",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Hashr",
  lessons: [
    {
      slug: "fai-without-battle",
      title: "Fai: gained without battle",
      line: "Fai is wealth Muslims gained without fighting for it.",
      facts: ["No horses or camels were used", "Bani An-Nadir's wealth was Fai"],
      quote: q59(6),
      source: ik(6, "Ibn Kathir says Fai is the booty the Muslims acquire from the disbelievers without fighting them or using cavalry and camelry.", "the booty that the Muslims acquire from the disbelievers, without fighting them"),
      difficulty: 3,
      questions: [
        { q: "What is Fai?", a: "Wealth gained without fighting", wrong: ["A kind of prayer", "A fast", "A tax on farms"], why: "The booty that the Muslims acquire from the disbelievers, without fighting them." },
        { q: "What did the Muslims not use to gain it?", a: "Cavalry or camelry", wrong: ["Their hands", "Their tents", "Their feet"], why: "For this you made no expedition with either cavalry or camelry." },
        { tf: true, q: "The wealth of Bani An-Nadir was Fai.", why: "The booty collected from Bani An-Nadir was not acquired because of fighting them." }
      ]
    },
    {
      slug: "fear-drove-them-out",
      title: "Fear drove them out",
      line: "No battle was fought; fear from Allah made them leave.",
      facts: ["Allah placed fear in their hearts", "The forts were left without war"],
      quote: q59(6),
      source: ik(6, "Ibn Kathir says the Muslims did not fight Bani An-Nadir in battle; Allah forced them out by the fear He placed in their hearts.", "The Muslims did not fight Bani An-Nadir in battle"),
      difficulty: 2,
      questions: [
        { q: "Was there a big battle with Bani An-Nadir?", a: "No", wrong: ["Yes, for years", "Yes, at sea", "Yes, at Badr"], why: "The Muslims did not fight Bani An-Nadir in battle." },
        { q: "What forced them out of their forts?", a: "Fear Allah placed in their hearts", wrong: ["A flood", "Hunger alone", "A fire"], why: "Allah forced them out of their forts on account of the fear that He placed in their hearts." },
        { tf: true, q: "Allah gives His Messengers power over whom He wills.", why: "But Allah gives power to His Messengers over whomsoever He wills." }
      ]
    },
    {
      slug: "none-can-resist-allah",
      title: "None can resist Allah",
      line: "Allah is Able to do all things, and none can oppose Him.",
      facts: ["He is the Compeller over all", "His will is always done"],
      quote: q59(6),
      source: ik(6, "Ibn Kathir says Allah is powerful and cannot be resisted or opposed; He is the Compeller over all things.", "Allah is powerful and cannot be resisted or opposed"),
      difficulty: 2,
      questions: [
        { q: "How does 59:6 end?", a: "Allah is Able to do all things", wrong: ["Allah is Hungry", "Allah is Far", "Allah forgets"], why: "And Allah is Able to do all things." },
        { q: "Can anyone resist Allah?", a: "No one", wrong: ["Strong kings", "Big armies", "Tall forts"], why: "Allah is powerful and cannot be resisted or opposed." },
        { tf: true, q: "Ibn Kathir calls Allah the Compeller over all things.", why: "He is the Compeller over all things." }
      ]
    },
    {
      slug: "spent-on-good",
      title: "Spent on good causes",
      line: "The Prophet ﷺ spent the Fai on good causes for the Muslims.",
      facts: ["He had the right to decide", "He used it for the community"],
      quote: q59(6),
      source: ik(6, "Ibn Kathir says the Prophet ﷺ spent the Fai on righteous causes and for the benefit of Muslims.", "on righteous causes and for the benefit of Muslims"),
      difficulty: 2,
      questions: [
        { q: "How did the Prophet ﷺ spend the Fai?", a: "On righteous causes", wrong: ["On a palace", "On gold for himself", "He hid it"], why: "The Prophet ﷺ spent the Fai' on righteous causes and for the benefit of Muslims." },
        { q: "Who benefited from it?", a: "The Muslims", wrong: ["Only one man", "No one", "Only kings"], why: "For the benefit of Muslims." },
        { tf: true, q: "The Prophet ﷺ could decide how to spend it.", why: "With his discretion to spend it however he sees fit." }
      ]
    },
    {
      slug: "a-year-for-his-family",
      title: "A year for his family",
      line: "He kept a year's needs for his family and gave the rest.",
      facts: ["Umar described this", "The rest served Allah's cause"],
      quote: q59(6),
      source: ik(6, "Ibn Kathir quotes Umar: the Prophet ﷺ used it for his family's needs a year at a time, and the rest went to equipment in Allah's cause.", "he used it for the needs of his family for a year at a time"),
      difficulty: 3,
      questions: [
        { q: "How long did his family's share last?", a: "A year at a time", wrong: ["A day", "Ten years", "Forever"], why: "He used it for the needs of his family for a year at a time." },
        { q: "Who described this, per Ibn Kathir?", a: "Umar", wrong: ["Bilal", "Khalid", "Hamzah"], why: "Imam Ahmad recorded that Umar said." },
        { tf: true, q: "The rest was used in the cause of Allah.", why: "The rest was used to buy armors and weapons used in the cause of Allah." }
      ]
    },
    {
      slug: "for-those-in-need",
      title: "For those in need",
      line: "59:7 names who receives Fai: kin, orphans, poor, travelers.",
      facts: ["Allah and His Messenger first", "Then kindred, orphans, poor, wayfarer"],
      quote: q59(7),
      source: ik(7, "Ibn Kathir says Fai from all such townships follows the same ruling: for Allah, His Messenger, the kindred, the orphans, the poor and the wayfarer.", "the kindred, the orphans, the poor, and the wayfarer"),
      difficulty: 2,
      questions: [
        { q: "Which group is listed in 59:7?", a: "The orphans", wrong: ["The kings", "The traders", "The soldiers"], why: "It is for Allah, His Messenger, the kindred, the orphans, the poor, and the wayfarer." },
        { q: "What is a wayfarer?", a: "A traveler in need", wrong: ["A farmer", "A judge", "A builder"], why: "The poor, and the wayfarer." },
        { tf: true, q: "The poor have a share in the Fai.", why: "The orphans, the poor, and the wayfarer." }
      ]
    },
    {
      slug: "not-only-for-the-rich",
      title: "Not only for the rich",
      line: "Wealth must not circle only among the rich.",
      facts: ["Islam shares wealth with the poor", "Fairness is part of the law"],
      quote: q59(7),
      source: ik(7, "Ibn Kathir says Fai is spent this way so that wealth does not stay among the wealthy, who would give none of it to the poor.", "so that the wealth does not remain among the wealthy"),
      difficulty: 2,
      questions: [
        { q: "Why is Fai shared this way?", a: "So wealth is not only for the rich", wrong: ["To make kings richer", "To hide it", "To burn it"], why: "In order that it may not become a fortune used by the rich among you." },
        { q: "What might the rich do, per Ibn Kathir?", a: "Give none to the poor", wrong: ["Give it all", "Plant trees", "Build masjids"], why: "Who would spend it as they wish and desire and give none of it to the poor." },
        { tf: true, q: "Islam cares that wealth reaches the poor.", why: "So that the wealth does not remain among the wealthy." }
      ]
    },
    {
      slug: "take-what-he-gives",
      title: "Take what he gives",
      line: "Do what the Messenger ﷺ commands, and avoid what he forbids.",
      facts: ["A rule for every Muslim", "He only commands good"],
      quote: q59(7),
      source: ik(7, "Ibn Kathir says whatever the Messenger ﷺ commands you, do it, and whatever he forbids you, avoid it; he only commands righteousness.", "whatever the Messenger ﷺ commands you, then do it and whatever he forbids you, then avoid it"),
      difficulty: 2,
      questions: [
        { q: "What should we do with what the Messenger ﷺ gives?", a: "Take it", wrong: ["Ignore it", "Return it", "Hide it"], why: "And whatsoever the Messenger ﷺ gives you, take it." },
        { q: "What should we do with what he forbids?", a: "Abstain from it", wrong: ["Try it once", "Ask others", "Do it at night"], why: "And whatsoever he forbids you, abstain (from it)." },
        { tf: true, q: "He only commands righteousness and forbids evil.", why: "Surely, He only commands righteousness and forbids evil." }
      ]
    },
    {
      slug: "as-much-as-you-can",
      title: "As much as you can",
      line: "Do commands as best you can; fully avoid what is forbidden.",
      facts: ["Commands: do what you are able", "Forbidden things: keep away"],
      quote: q59(7),
      source: hadith("bukhari", "7288", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said: if I forbid you something, keep away from it, and if I order you to do something, do of it as much as you can.", "then do of it as much as you can"),
      difficulty: 3,
      questions: [
        { q: "How much of a command should we do?", a: "As much as we can", wrong: ["None of it", "Only half", "Only once"], why: "If I order you to do something, then do of it as much as you can." },
        { q: "What should we do with what he forbids?", a: "Keep away from it", wrong: ["Do a little", "Ask why first", "Wait a year"], why: "If I forbid you to do something, then keep away from it." },
        { tf: true, q: "Ibn Kathir quotes the same teaching under 59:7.", why: "When I order you to do something, then do as much as you can of it." }
      ]
    },
    {
      slug: "taqwa-through-obedience",
      title: "Taqwa through obedience",
      line: "Taqwa means obeying Allah and keeping away from what He forbids.",
      facts: ["Taqwa: mindful fear of Allah", "Shown by obeying Him"],
      quote: q59(7),
      source: ik(7, "Ibn Kathir says have Taqwa means fear Allah by obeying His orders and refraining from His prohibitions.", "fear Allah by obeying His orders and refraining from His prohibitions"),
      difficulty: 2,
      questions: [
        { q: "How do we show Taqwa, per Ibn Kathir?", a: "Obeying Allah's orders", wrong: ["Only feeling sad", "Staying home", "Saying nothing"], why: "Fear Allah by obeying His orders and refraining from His prohibitions." },
        { q: "How does 59:7 end?", a: "Allah is Severe in punishment", wrong: ["Allah is Rich", "Allah is Near", "Allah is Light"], why: "Verily, Allah is Severe in punishment." },
        { tf: true, q: "Keeping away from what Allah forbids is Taqwa.", why: "Refraining from His prohibitions." }
      ]
    },
    {
      slug: "the-emigrants",
      title: "The emigrants",
      line: "The Muhajirin left home and wealth for Allah's pleasure.",
      facts: ["They were forced from Makkah", "They helped Allah and His Messenger"],
      quote: q59(8),
      source: ik(8, "Ibn Kathir says they departed their homes and defied their people, seeking the acceptance of Allah and His favor.", "departed their homes and defied their people, seeking the acceptance of Allah"),
      difficulty: 2,
      questions: [
        { q: "What did the emigrants leave behind?", a: "Their homes and property", wrong: ["Nothing", "Only toys", "Only friends"], why: "Who were expelled from their homes and their property." },
        { q: "What were they seeking?", a: "Allah's bounty and pleasure", wrong: ["Fame", "Gold only", "Revenge"], why: "Seeking bounties from Allah and (His) good pleasure." },
        { tf: true, q: "The poor emigrants have a share in Fai.", why: "And there is also a share in this booty for the poor emigrants." }
      ]
    },
    {
      slug: "the-truthful",
      title: "The truthful",
      line: "Allah calls the emigrants truthful in word and deed.",
      facts: ["As-Sadiqun: the truthful", "Their actions matched their words"],
      quote: q59(8),
      source: ik(8, "Ibn Kathir says they were truthful in statement and deed, and they are the chiefs of the Muhajirin.", "they are those who were truthful in statement and deed"),
      difficulty: 2,
      questions: [
        { q: "What does 59:8 call the emigrants?", a: "The truthful", wrong: ["The lazy", "The forgotten", "The angry"], why: "Such are indeed the truthful." },
        { q: "Truthful in what, per Ibn Kathir?", a: "Statement and deed", wrong: ["Only words", "Only dreams", "Only trade"], why: "They are those who were truthful in statement and deed." },
        { tf: true, q: "They helped Allah and His Messenger.", why: "And helping Allah and His Messenger." }
      ]
    },
    {
      slug: "the-ansar",
      title: "The Ansar",
      line: "The Ansar of Madinah believed before many emigrants came.",
      facts: ["Ansar means the helpers", "They hosted the Muhajirin"],
      quote: q59(9),
      source: ik(9, "Ibn Kathir says these are those who lived in the city of migration before the emigrants arrived and embraced the faith before many of them.", "those who resided in the city to which the migration occurred"),
      difficulty: 2,
      questions: [
        { q: "Where did the Ansar live?", a: "In the city of migration", wrong: ["In Makkah", "In Yemen", "In the desert"], why: "Those who resided in the city to which the migration occurred." },
        { q: "When did many Ansar believe?", a: "Before many emigrants", wrong: ["After 100 years", "Never", "At Badr only"], why: "Who embraced the faith before many of the emigrants." },
        { tf: true, q: "Umar asked the next Khalifah to be kind to the Ansar.", why: "I also recommend him to be kind to the Ansar." }
      ]
    },
    {
      slug: "love-for-the-emigrants",
      title: "Love for the emigrants",
      line: "The Ansar loved the emigrants and shared their wealth with them.",
      facts: ["Generous and honorable", "They comforted their guests"],
      quote: q59(9),
      source: ik(9, "Ibn Kathir says the Ansar, from generosity and honor, loved those who emigrated to them and comforted them with their wealth.", "loved those who emigrated to them and comforted them with their wealth"),
      difficulty: 2,
      questions: [
        { q: "How did the Ansar feel about the emigrants?", a: "They loved them", wrong: ["They feared them", "They ignored them", "They mocked them"], why: "Love those who emigrate to them." },
        { q: "How did they comfort them?", a: "With their wealth", wrong: ["With songs", "With weapons", "With letters"], why: "Comforted them with their wealth." },
        { tf: true, q: "Their love came from generosity and honor.", why: "On account of their generosity and honorable conduct." }
      ]
    },
    {
      slug: "our-brothers-first",
      title: "Our brothers first",
      line: "Offered land, the Ansar said: give our brothers the same.",
      facts: ["They did not want it alone", "The Prophet ﷺ praised their patience"],
      quote: q59(9),
      source: hadith("bukhari", "3794", "Anas ibn Malik", "Sahih", "When the Prophet ﷺ called the Ansar to give them land in Bahrain, they said: not unless you give our emigrant brothers a similar share.", "unless you give to our emigrant brethren a similar share"),
      difficulty: 3,
      questions: [
        { q: "Which land did the Prophet ﷺ offer the Ansar?", a: "Bahrain", wrong: ["Egypt", "Yemen", "Sham"], why: "The Prophet ﷺ called the Ansar in order to give them the territory of Bahrain." },
        { q: "What did the Ansar ask for?", a: "An equal share for the emigrants", wrong: ["More for themselves", "Nothing", "Gold instead"], why: "Unless you give to our emigrant brethren a similar share." },
        { tf: true, q: "The Prophet ﷺ told them to be patient until they meet him.", why: "Be patient till you meet me." }
      ]
    },
    {
      slug: "share-the-fruits",
      title: "Share the fruits",
      line: "The Ansar shared their palm fruits with the emigrants.",
      facts: ["The emigrants tended the trees", "Both shared the harvest"],
      quote: q59(9),
      source: hadith("bukhari", "2325", "Abu Hurairah", "Sahih", "The Ansar asked to divide their palms with the emigrants; the Prophet ﷺ said no, so they asked the emigrants to tend the trees and share the fruits.", "Look after the trees…share the fruits with us"),
      difficulty: 3,
      questions: [
        { q: "What did the Ansar first ask the Prophet ﷺ?", a: "To divide their palms", wrong: ["To sell the palms", "To cut the palms", "To leave Madinah"], why: "Distribute the date palm trees between us and our emigrant brothers." },
        { q: "What did the emigrants answer?", a: "We listen and obey", wrong: ["We refuse", "Not now", "Pay us more"], why: "The emigrants said, We listen and obey." },
        { tf: true, q: "The emigrants worked the trees and shared the fruit.", why: "Look after the trees and share the fruits with us." }
      ]
    },
    {
      slug: "no-envy",
      title: "No envy in their hearts",
      line: "The Ansar felt no envy for what the emigrants were given.",
      facts: ["The emigrants had a higher rank", "The Ansar were glad, not jealous"],
      quote: q59(9),
      source: ik(9, "Ibn Kathir says the Ansar did not have any envy for the Muhajirin because of the better rank Allah gave them.", "the Ansar did not have any envy for the Muhajirin"),
      difficulty: 2,
      questions: [
        { q: "What did the Ansar not feel?", a: "Envy", wrong: ["Love", "Joy", "Faith"], why: "And have no jealousy in their breasts for that which they have been given." },
        { q: "Whom did they not envy?", a: "The Muhajirin", wrong: ["The angels", "The kings", "The birds"], why: "The Ansar did not have any envy for the Muhajirin." },
        { tf: true, q: "A clean heart is free of envy.", why: "Have no jealousy in their breasts." }
      ]
    },
    {
      slug: "others-before-themselves",
      title: "Others before themselves",
      line: "They gave to others first, even when they were in need.",
      facts: ["Ithar: preferring others", "Higher than giving from extra"],
      quote: q59(9),
      source: ik(9, "Ibn Kathir says they preferred giving to the needy over their own needs, even though they too were in need.", "they preferred giving to the needy rather than attending to their own needs"),
      difficulty: 3,
      questions: [
        { q: "Whom did the Ansar put first?", a: "Others in need", wrong: ["Themselves", "The rich", "No one"], why: "They preferred giving to the needy rather than attending to their own needs." },
        { q: "Were the Ansar themselves in need?", a: "Yes, they were", wrong: ["No, they were rich", "Only in winter", "Never"], why: "Even though they were in need of that." },
        { tf: true, q: "Ibn Kathir says this rank is higher than giving what one loves.", why: "This exalted rank is better than the rank of those whom Allah described... in spite of love for it." }
      ]
    },
    {
      slug: "the-lamp-put-out",
      title: "The lamp put out",
      line: "An Ansari couple fed a guest and stayed hungry, lamp put out.",
      facts: ["Only the children's food was left", "They let the guest eat in the dark"],
      quote: q59(9),
      source: hadith("bukhari", "4889", "Abu Hurairah", "Sahih", "An Ansari man hosted a hungry guest of the Prophet ﷺ; his wife put the children to bed and put out the light so the guest could eat, and 59:9 was revealed.", "put them to bed and put out the light"),
      difficulty: 3,
      questions: [
        { q: "What food did the wife have?", a: "Only the children's food", wrong: ["A big feast", "Nothing at all", "Only water"], why: "By Allah, I have nothing but the children's food." },
        { q: "Why did they put out the light?", a: "So the guest could eat", wrong: ["To sleep early", "To save oil", "To hide"], why: "Put them to bed and put out the light; we shall not take our meals tonight." },
        { tf: true, q: "This story led to the words of 59:9.", why: "Then Allah revealed: But give them preference over themselves even though they were in need of that." }
      ]
    },
    {
      slug: "saved-from-greed",
      title: "Saved from greed",
      line: "Whoever is saved from his own greed is truly successful.",
      facts: ["Shuhh: greedy stinginess", "Freedom from it is success"],
      quote: q59(9),
      source: ik(9, "Ibn Kathir says those who are saved from being stingy have earned success and a good achievement.", "those who are saved from being stingy, then they have earned success"),
      difficulty: 2,
      questions: [
        { q: "Who are the successful, in 59:9?", a: "Those saved from their greed", wrong: ["The richest", "The loudest", "The strongest"], why: "And whosoever is saved from his own greed, such are they who will be the successful." },
        { q: "What did they earn, per Ibn Kathir?", a: "Success and a good achievement", wrong: ["Only gold", "Nothing", "Only fame"], why: "They have earned success and a good achievement." },
        { tf: true, q: "Stinginess is something to be saved from.", why: "Those who are saved from being stingy." }
      ]
    },
    {
      slug: "beware-of-stinginess",
      title: "Beware of stinginess",
      line: "Stinginess destroyed people before us, the Prophet ﷺ warned.",
      facts: ["Oppression is darkness on Judgment Day", "Stinginess led to great wrongs"],
      quote: q59(9),
      source: hadith("muslim", "2578", "Jabir ibn Abdullah", "Sahih", "The Prophet ﷺ said: beware of oppression, for it is darkness on the Day of Resurrection, and beware of stinginess, for it destroyed those before you.", "guard against stinginess for stinginess destroyed those who were before you"),
      difficulty: 3,
      questions: [
        { q: "What destroyed those before us?", a: "Stinginess", wrong: ["Charity", "Kindness", "Prayer"], why: "Stinginess destroyed those who were before you." },
        { q: "What is oppression on Judgment Day?", a: "Darkness", wrong: ["Light", "Shade", "A garden"], why: "For oppression is a darkness on the Day of Resurrection." },
        { tf: true, q: "Ibn Kathir quotes the same hadith under 59:9.", why: "Be on your guard against being stingy, for being stingy is what destroyed those who were before you." }
      ]
    },
    {
      slug: "those-who-came-after",
      title: "Those who came after",
      line: "Three groups: Muhajirin, Ansar, and those who follow them.",
      facts: ["Followers in good deeds", "9:100 praises all three"],
      quote: q59(10),
      source: ik(10, "Ibn Kathir says these three types are the Muhajirin, the Ansar and those who followed their righteous lead with excellence.", "These three types are the Muhajirin, the Ansar and those who followed their righteous lead"),
      difficulty: 2,
      questions: [
        { q: "Who is the third group in 59:10?", a: "Those who came after them", wrong: ["The angels", "The hypocrites", "The kings"], why: "And those who came after them say." },
        { q: "Which ayah does Ibn Kathir link?", a: "9:100", wrong: ["2:2", "36:1", "112:4"], why: "And also those who followed them exactly, Allah is well-pleased with them. (9:100)" },
        { tf: true, q: "Muslims today can join the third group.", why: "Those who followed their righteous lead with excellence." }
      ]
    },
    {
      slug: "dua-for-those-before",
      title: "A dua for those before us",
      line: "Later believers ask Allah to forgive the believers before them.",
      facts: ["Pray for earlier Muslims", "In public and in secret"],
      quote: q59(10),
      source: ik(10, "Ibn Kathir says the third group follows the Muhajirin and Ansar in good works and invokes Allah for them in public and secret.", "invoke Allah for them in public and secret"),
      difficulty: 2,
      questions: [
        { q: "What do those who came after say first?", a: "Our Lord, forgive us and our brothers", wrong: ["Give us gold", "Make us famous", "Nothing"], why: "Our Lord! Forgive us and our brethren who have preceded us in faith." },
        { q: "How do they pray for those before?", a: "In public and secret", wrong: ["Never", "Only once", "Only in war"], why: "Who invoke Allah for them in public and secret." },
        { tf: true, q: "Praying for earlier believers is a good quality.", why: "Who invoke Allah for them in public and secret." }
      ]
    },
    {
      slug: "no-hatred-in-hearts",
      title: "No hatred in our hearts",
      line: "They ask Allah to keep hatred and envy out of their hearts.",
      facts: ["Ghill: rage or envy", "A clean heart toward believers"],
      quote: q59(10),
      source: ik(10, "Ibn Kathir says hatred here means rage or envy against those who believed.", "meaning, rage or envy"),
      difficulty: 2,
      questions: [
        { q: "What does hatred mean in 59:10, per Ibn Kathir?", a: "Rage or envy", wrong: ["Hunger", "Tiredness", "Fear of dogs"], why: "Put not in our hearts any hatred), meaning, rage or envy." },
        { q: "How does the dua of 59:10 end?", a: "You are full of kindness, Most Merciful", wrong: ["You are far", "You are tired", "You are angry"], why: "Our Lord! You are indeed full of kindness, Most Merciful." },
        { tf: true, q: "The dua asks for no hatred toward any believers.", why: "Put not in our hearts any hatred against those who have believed." }
      ]
    },
    {
      slug: "forgive-the-ansar",
      title: "Forgive them both",
      line: "The Prophet ﷺ prayed: forgive the Emigrants and the Ansar.",
      facts: ["Said while digging the trench", "Life of the Hereafter is true life"],
      quote: q59(10),
      source: hadith("bukhari", "3797", "Sahl bin Sa'd", "Sahih", "While the Companions dug the trench, the Prophet ﷺ said: O Allah, there is no life except the life of the Hereafter, so forgive the Emigrants and the Ansar.", "please forgive the Emigrants and the Ansar"),
      difficulty: 3,
      questions: [
        { q: "When did the Prophet ﷺ make this dua?", a: "While digging the trench", wrong: ["At a wedding", "On a ship", "In a market"], why: "While we were digging the trench and carrying out the earth on our backs." },
        { q: "What is the only true life, in this dua?", a: "The life of the Hereafter", wrong: ["The life of kings", "A long life", "A rich life"], why: "There is no life except the life of the Hereafter." },
        { tf: true, q: "He asked forgiveness for both Emigrants and Ansar.", why: "So please forgive the Emigrants and the Ansar." }
      ]
    }
  ]
};

/** Ayahs 11 to 17: the hypocrites' empty promises, divided hearts, and the parable of Shaytan. */
const HASHR_THREE: DeepUnit = {
  key: "hashr3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-59",
  name: "Al-Hashr, ayahs 11 to 17",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Hashr",
  lessons: [
    {
      slug: "an-empty-promise",
      title: "An empty promise",
      line: "The hypocrites promised Bani An-Nadir help they never gave.",
      facts: ["Abdullah ibn Ubayy led them", "They said: we will go out with you"],
      quote: q59(11),
      source: ik(11, "Ibn Kathir says Abdullah ibn Ubayy and his like sent a messenger to Bani An-Nadir promising them help.", "sent a messenger to Bani An-Nadir promising them help"),
      difficulty: 2,
      questions: [
        { q: "What did the hypocrites promise?", a: "To help them", wrong: ["To leave Madinah", "To become Muslim", "To pay a tax"], why: "Sent a messenger to Bani An-Nadir promising them help." },
        { q: "Who led the hypocrites, per Ibn Kathir?", a: "Abdullah ibn Ubayy", wrong: ["Abu Sufyan", "Abu Jahl", "Umar"], why: "The hypocrites, Abdullah bin Ubayy and his like." },
        { tf: true, q: "They said: if you are expelled, we will go with you.", why: "If you are expelled, we indeed will go out with you." }
      ]
    },
    {
      slug: "allah-witnesses-the-lie",
      title: "Allah witnesses the lie",
      line: "Allah bears witness that the hypocrites were lying.",
      facts: ["Their words had no intent behind them", "Allah knows what hearts hide"],
      quote: q59(11),
      source: ik(11, "Ibn Kathir says the hypocrites lied in this promise, because it was just words they did not intend to fulfill.", "it was just words that they did not intend to fulfill"),
      difficulty: 2,
      questions: [
        { q: "What does Allah witness about them?", a: "They are liars", wrong: ["They are brave", "They are kind", "They are wise"], why: "But Allah is Witness that they verily are liars." },
        { q: "Why was it a lie, per Ibn Kathir?", a: "They never meant to keep it", wrong: ["They forgot", "They were sick", "It rained"], why: "It was just words that they did not intend to fulfill." },
        { tf: true, q: "A promise made with no plan to keep it is a lie.", why: "It was just words that they did not intend to fulfill." }
      ]
    },
    {
      slug: "they-would-not-help",
      title: "They would not help",
      line: "Allah foretold that the hypocrites would not stand by them.",
      facts: ["They would not leave with them", "Even if they helped, they would flee"],
      quote: q59(12),
      source: ik(12, "Ibn Kathir says the hypocrites would not fight alongside them, and even if they did, they would turn their backs.", "the hypocrites will not fight along with the Jews"),
      difficulty: 2,
      questions: [
        { q: "Would the hypocrites go out with them?", a: "Never", wrong: ["Yes, at once", "Only some", "After a year"], why: "If they are expelled, never will they go out with them." },
        { q: "Even if they helped, what would they do?", a: "Turn their backs", wrong: ["Win easily", "Build forts", "Make peace"], why: "They will turn their backs, and they will not be victorious." },
        { tf: true, q: "Allah told of this before it happened.", why: "This Ayah contains good news." }
      ]
    },
    {
      slug: "good-news",
      title: "Good news for believers",
      line: "Ibn Kathir says 59:12 carried good news for the Muslims.",
      facts: ["Allah told the outcome early", "His promise came true"],
      quote: q59(12),
      source: ik(12, "Ibn Kathir says this Ayah contains good news, just like the Ayah after it.", "This Ayah contains good news"),
      difficulty: 2,
      questions: [
        { q: "What does Ibn Kathir say 59:12 contains?", a: "Good news", wrong: ["A riddle", "A warning to angels", "A story of kings"], why: "This Ayah contains good news." },
        { q: "Did the hypocrites help Bani An-Nadir?", a: "No", wrong: ["Yes, with an army", "Yes, with gold", "Yes, with ships"], why: "The Jews waited for this claim of support, but the hypocrites did not deliver." },
        { tf: true, q: "Allah's word about them came true.", why: "The hypocrites did not deliver." }
      ]
    },
    {
      slug: "fearing-people-more",
      title: "Fearing people more",
      line: "The hypocrites feared the believers more than they feared Allah.",
      facts: ["4:77 describes the same", "True fear belongs to Allah"],
      quote: q59(13),
      source: ik(13, "Ibn Kathir says the hypocrites fear you more than they fear Allah.", "the hypocrites fear you more than they fear Allah"),
      difficulty: 2,
      questions: [
        { q: "Whom did they fear more than Allah?", a: "The believers", wrong: ["Wild animals", "The sea", "The night"], why: "Verily, you are more fearful in their breasts than Allah." },
        { q: "Which ayah does Ibn Kathir compare?", a: "4:77", wrong: ["1:5", "2:2", "114:6"], why: "A section of them fear men as they fear Allah or even more. (4:77)" },
        { tf: true, q: "A believer fears Allah more than people.", why: "The hypocrites fear you more than they fear Allah." }
      ]
    },
    {
      slug: "they-do-not-understand",
      title: "They do not understand",
      line: "Fearing people over Allah shows a lack of understanding.",
      facts: ["Allah is far greater than people", "Understanding brings right fear"],
      quote: q59(13),
      source: ik(13, "Ibn Kathir explains their fear of people, then quotes: that is because they are a people who comprehend not.", "That is because they are a people who comprehend not"),
      difficulty: 3,
      questions: [
        { q: "Why do they fear people more, in 59:13?", a: "They do not comprehend", wrong: ["They are tired", "They are rich", "They are far"], why: "That is because they are a people who comprehend not." },
        { q: "Who truly deserves our fear?", a: "Allah", wrong: ["Neighbors", "Rich people", "Strangers"], why: "You are more fearful in their breasts than Allah." },
        { tf: false, q: "The hypocrites understood the matter well.", why: "They are a people who comprehend not." }
      ]
    },
    {
      slug: "real-understanding",
      title: "Real understanding",
      line: "Real understanding puts fear, hope and love of Allah first.",
      facts: ["As-Sa'di explains", "Fiqh of the heart"],
      quote: q59(13),
      source: saadi(59, 13, "As-Sa'di says real understanding is that fear of the Creator, hope in Him and love for Him come before everything else, and all else follows them.", "وإنما الفقه كل الفقه، أن يكون خوف الخالق ورجاؤه ومحبته مقدمة على غيرها"),
      difficulty: 3,
      questions: [
        { q: "What is real understanding, per as-Sa'di on 59:13?", a: "Putting love and fear of Allah first", wrong: ["Knowing many facts", "Being rich", "Fearing people"], why: "Fear, hope and love of the Creator come before all else, says as-Sa'di." },
        { q: "Whom did the hypocrites fear more than Allah?", a: "The believers", wrong: ["The angels", "Their fathers", "No one"], why: "They feared people who own no harm or benefit." },
        { tf: true, q: "Only Allah truly holds harm and benefit.", why: "As-Sa'di on 59:13." }
      ]
    },
    {
      slug: "behind-walls",
      title: "Only behind walls",
      line: "They would fight only from behind walls and inside forts.",
      facts: ["A sign of fear", "Not in the open field"],
      quote: q59(14),
      source: ik(14, "Ibn Kathir says they will not fight the Muslims except from behind fortified forts, because of fear.", "they will not fight Muslims except from behind besieged fortified forts"),
      difficulty: 2,
      questions: [
        { q: "From where would they fight?", a: "Behind walls and forts", wrong: ["Open fields", "Ships", "Mountaintops"], why: "Except in fortified townships, or from behind walls." },
        { q: "Why, per Ibn Kathir?", a: "Because of fear", wrong: ["Because of rain", "Because of hunger", "Because of law"], why: "Because of their cowardice and fear of Muslims." },
        { tf: true, q: "They fought together only from protected places.", why: "They fight not against you even together, except in fortified townships." }
      ]
    },
    {
      slug: "hearts-divided",
      title: "Hearts divided",
      line: "They looked united, but their hearts were divided.",
      facts: ["Strong enmity among themselves", "Unity of bodies is not unity of hearts"],
      quote: q59(14),
      source: ik(14, "Ibn Kathir says though one may think their forces harmonious, in reality they are divided severely.", "yet in reality, they are divided severely"),
      difficulty: 3,
      questions: [
        { q: "What would you think seeing them?", a: "That they were united", wrong: ["That they were few", "That they were asleep", "That they were angels"], why: "You would think they were united." },
        { q: "What were their hearts really?", a: "Divided", wrong: ["United", "Empty", "Happy"], why: "But their hearts are divided." },
        { tf: true, q: "Their enmity among themselves was very great.", why: "Their enmity among themselves is very great." }
      ]
    },
    {
      slug: "like-one-body",
      title: "Believers like one body",
      line: "Believers are like one body that feels each other's pain.",
      facts: ["Mercy, love and kindness", "One part hurts, all feel it"],
      quote: q59(14),
      source: hadith("bukhari", "6011", "An-Nu'man ibn Bashir", "Sahih", "The Prophet ﷺ said believers in their mercy, love and kindness to each other are like one body: if one part is unwell, the whole body shares it.", "resembling one body"),
      difficulty: 2,
      questions: [
        { q: "What are believers like, in Bukhari 6011?", a: "One body", wrong: ["Many islands", "Strangers", "A crowd"], why: "Resembling one body." },
        { q: "If one part is unwell, what happens?", a: "The whole body shares it", wrong: ["Nothing", "It is cut off", "Only that part hurts"], why: "The whole body shares the sleeplessness and fever with it." },
        { tf: true, q: "Believers should be the opposite of divided hearts.", why: "Their hearts are divided... believers resembling one body." }
      ]
    },
    {
      slug: "those-just-before",
      title: "Those just before them",
      line: "A tribe before them had already tasted the result of betrayal.",
      facts: ["Bani Qaynuqa left Madinah earlier", "History repeated itself"],
      quote: q59(15),
      source: ik(15, "Ibn Kathir says their immediate predecessors were the tribe of Bani Qaynuqa, per Ibn Abbas, Qatadah and Ibn Ishaq.", "referring to the Jewish tribe of Bani Qaynuqa"),
      difficulty: 3,
      questions: [
        { q: "Who were the predecessors in 59:15?", a: "Bani Qaynuqa", wrong: ["Bani Hashim", "Quraysh", "The Romans"], why: "Referring to the Jewish tribe of Bani Qaynuqa." },
        { q: "What did they taste, in 59:15?", a: "The evil result of their conduct", wrong: ["Sweet fruit", "Victory", "Nothing"], why: "They tasted the evil result of their conduct." },
        { tf: true, q: "Ibn Abbas is one source for this view.", why: "According to Ibn Abbas, Qatadah and Muhammad bin Ishaq." }
      ]
    },
    {
      slug: "like-shaytan",
      title: "Like Shaytan",
      line: "The hypocrites were like Shaytan: he lures, then walks away.",
      facts: ["He says: disbelieve", "Then he disowns the one who obeyed"],
      quote: q59(16),
      source: ik(16, "Ibn Kathir says the devil lures people into disbelief, and when they obey him, he disowns them.", "the devil lures mankind into disbelief and when they obey him, he disowns them"),
      difficulty: 3,
      questions: [
        { q: "What does Shaytan say to man first?", a: "Disbelieve", wrong: ["Pray", "Give charity", "Be patient"], why: "Like Shaytan, when he says to man: Disbelieve." },
        { q: "What does he do once man obeys?", a: "He disowns him", wrong: ["He helps him", "He thanks him", "He rewards him"], why: "When they obey him, he disowns them." },
        { tf: true, q: "The hypocrites also left their friends when it got serious.", why: "When matters got serious... the hypocrites betrayed them and abandoned them." }
      ]
    },
    {
      slug: "i-fear-allah",
      title: "I fear Allah, he says",
      line: "Shaytan claims to fear Allah after leading people astray.",
      facts: ["He knows Allah's might", "His words do not save his followers"],
      quote: q59(16),
      source: ik(16, "Ibn Kathir says Shaytan declares himself free of their actions, saying: I fear Allah, the Lord of all that exists.", "I fear Allah, the Lord of all that exists"),
      difficulty: 3,
      questions: [
        { q: "What does Shaytan say after man disbelieves?", a: "I am free of you", wrong: ["Come with me", "I will save you", "Well done"], why: "Shaytan says: I am free of you." },
        { q: "Whom does Shaytan say he fears?", a: "Allah, Lord of all that exists", wrong: ["No one", "The kings", "The jinn"], why: "I fear Allah, the Lord of all that exists!" },
        { tf: false, q: "Following Shaytan brings his help later.", why: "When they obey him, he disowns them." }
      ]
    },
    {
      slug: "end-of-both",
      title: "The end of both",
      line: "The one who misleads and the one who follows share one end.",
      facts: ["Wrongdoing has its recompense", "Choose whom you follow carefully"],
      quote: q59(17),
      source: ik(17, "Ibn Kathir says the end of Shaytan and those who accepted his call is the same, and this is the recompense of every unjust person.", "this is the recompense of every unjust person"),
      difficulty: 3,
      questions: [
        { q: "Whose end is the same, in 59:17?", a: "Shaytan and his followers", wrong: ["The angels", "The Prophets", "The animals"], why: "So, the end of both will be that they will be in the Fire." },
        { q: "Whose recompense is it, per Ibn Kathir?", a: "Every unjust person", wrong: ["Only kings", "Only the poor", "No one"], why: "This is the recompense of every unjust person." },
        { tf: true, q: "Following someone into wrong does not excuse us.", why: "The end of both he, Shaytan... and those who accepted his call." }
      ]
    }
  ]
};

/** Ayahs 18 to 24: look to tomorrow, the mountain humbled by the Quran, and Allah's Beautiful Names. */
const HASHR_FOUR: DeepUnit = {
  key: "hashr4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-59",
  name: "Al-Hashr, ayahs 18 to 24",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Hashr",
  lessons: [
    {
      slug: "look-to-tomorrow",
      title: "Look to tomorrow",
      line: "Each soul should look at what it sends ahead for tomorrow.",
      facts: ["Tomorrow means the Day of Return", "Check yourself before you are judged"],
      quote: q59(18),
      source: ik(18, "Ibn Kathir says this means hold yourselves accountable before you are recompensed.", "hold yourselves accountable before you are recompensed"),
      difficulty: 2,
      questions: [
        { q: "What should every soul look at, in 59:18?", a: "What it sent forth for tomorrow", wrong: ["Its money only", "Its clothes", "Its neighbors"], why: "And let every person look to what he has sent forth for tomorrow." },
        { q: "What does Ibn Kathir advise?", a: "Hold yourselves accountable now", wrong: ["Wait and see", "Forget the past", "Blame others"], why: "Hold yourselves accountable before you are recompensed." },
        { tf: true, q: "59:18 opens by calling the believers.", why: "O you who believe! Have Taqwa of Allah." }
      ]
    },
    {
      slug: "check-yourself",
      title: "Check yourself",
      line: "Al-Hashr 59:18 is the base for checking your own deeds.",
      facts: ["As-Sa'di explains", "Muhasabah"],
      quote: q59(18),
      source: saadi(59, 18, "As-Sa'di says 59:18 is a foundation for a person checking himself: if he sees a slip, he fixes it by stopping and repenting, and if he sees a shortfall, he works to complete it.", "وهذه الآية الكريمة أصل في محاسبة العبد نفسه"),
      difficulty: 2,
      questions: [
        { q: "What is Al-Hashr 59:18 a base for, per as-Sa'di?", a: "Checking your own deeds", wrong: ["Checking others", "Counting money", "Building houses"], why: "It is a foundation for a person holding himself to account, says as-Sa'di." },
        { q: "If you find a slip when checking yourself, you...?", a: "Stop and repent", wrong: ["Hide it", "Blame others", "Keep going"], why: "Fix it by leaving it and turning to Allah." },
        { tf: true, q: "Keeping the Hereafter in mind makes a person work harder.", why: "As-Sa'di on 59:18." }
      ]
    },
    {
      slug: "your-saved-deeds",
      title: "Your saved deeds",
      line: "Think about the good deeds you have saved for your return.",
      facts: ["Good deeds are sent ahead", "We will be shown before our Lord"],
      quote: q59(18),
      source: ik(18, "Ibn Kathir says contemplate what good deeds you have kept for the Day of your return before your Lord.", "contemplate what you have kept for yourselves of good deeds"),
      difficulty: 2,
      questions: [
        { q: "What should we contemplate, per Ibn Kathir?", a: "The good deeds we kept", wrong: ["Our toys", "Our fame", "Our grades only"], why: "Contemplate what you have kept for yourselves of good deeds." },
        { q: "For which Day are they kept?", a: "The Day of our return", wrong: ["Next Friday", "Our birthday", "No day"], why: "For the Day of your return and being paraded before your Lord." },
        { tf: true, q: "Every good deed today is sent ahead.", why: "Let every person look to what he has sent forth for tomorrow." }
      ]
    },
    {
      slug: "the-poor-visitors",
      title: "The poor visitors",
      line: "Seeing poor visitors, the Prophet ﷺ recited 59:18 for charity.",
      facts: ["They came from the tribe of Mudar", "His face changed seeing their need"],
      quote: q59(18),
      source: hadith("muslim", "1017", "Jarir ibn Abdullah", "Sahih", "When very poor people came, the Prophet's ﷺ face changed; he led prayer, then recited 4:1 and a verse of Surah Al-Hashr, 59:18, and urged charity.", "a verse of Sura Hashr"),
      difficulty: 3,
      questions: [
        { q: "Which tribe were the poor visitors from?", a: "Mudar", wrong: ["Quraysh", "Aws", "Thaqif"], why: "All of them, belonged to the tribe of Mudar." },
        { q: "Which surah did he recite from, with 4:1?", a: "Al-Hashr", wrong: ["Al-Fil", "Al-Kawthar", "Al-Asr"], why: "He recited a verse of Sura Hashr." },
        { tf: true, q: "His face changed when he saw their poverty.", why: "The colour of the face of the Messenger of Allah underwent a change when he saw them in poverty." }
      ]
    },
    {
      slug: "even-half-a-date",
      title: "Even half a date",
      line: "People gave what they could, even half a date.",
      facts: ["Dinars, dirhams, clothes, wheat, dates", "Small gifts still count"],
      quote: q59(18),
      source: hadith("muslim", "1017", "Jarir ibn Abdullah", "Sahih", "After the Prophet ﷺ recited 59:18, people gave dinars, dirhams, clothes, wheat and dates, and he said: even if it is half a date.", "even if it is half a date"),
      difficulty: 2,
      questions: [
        { q: "What was the smallest gift he mentioned?", a: "Half a date", wrong: ["A whole camel", "A house", "A sword"], why: "Bring even if it is half a date." },
        { q: "What did people start doing after he recited?", a: "Giving charity", wrong: ["Going home", "Arguing", "Sleeping"], why: "Then the audience began to vie with one another in giving charity." },
        { tf: true, q: "Small charity is still valued.", why: "Even if it is half a date." }
      ]
    },
    {
      slug: "allah-knows-every-deed",
      title: "Allah knows every deed",
      line: "Nothing we do, big or small, escapes Allah's knowledge.",
      facts: ["Taqwa is ordered twice in 59:18", "Allah is All-Aware"],
      quote: q59(18),
      source: ik(18, "Ibn Kathir says nothing that pertains to you ever escapes His observation, major or minor.", "Nothing that pertains to you ever escapes His observation"),
      difficulty: 2,
      questions: [
        { q: "How does 59:18 end?", a: "Allah is All-Aware of what you do", wrong: ["Allah is far", "Allah is sleeping", "Allah forgets"], why: "Verily, Allah is All-Aware of what you do." },
        { q: "How many times does 59:18 order Taqwa?", a: "Twice", wrong: ["Never", "Five times", "Ten times"], why: "Have Taqwa of Allah), again ordering Taqwa." },
        { tf: true, q: "Even small matters are known to Allah.", why: "Nor any matter of yours, whether major or minor, is ever beyond His knowledge." }
      ]
    },
    {
      slug: "do-not-forget-allah",
      title: "Do not forget Allah",
      line: "Do not be like those who forgot Allah.",
      facts: ["Remember Allah often", "Forgetting Him harms the soul"],
      quote: q59(19),
      source: ik(19, "Ibn Kathir says this means do not forget the remembrance of Allah.", "do not forget the remembrance of Allah"),
      difficulty: 2,
      questions: [
        { q: "Whom should we not be like, in 59:19?", a: "Those who forgot Allah", wrong: ["The angels", "The Prophets", "The scholars"], why: "And be not like those who forgot Allah." },
        { q: "What should we not forget, per Ibn Kathir?", a: "The remembrance of Allah", wrong: ["Our shoes", "Our bags", "Our games"], why: "Do not forget the remembrance of Allah." },
        { tf: true, q: "Remembering Allah is a command in 59:19.", why: "And be not like those who forgot Allah." }
      ]
    },
    {
      slug: "forgetting-yourself",
      title: "Forgetting yourself",
      line: "Whoever forgets Allah is made to forget his own good.",
      facts: ["The reward matches the deed", "63:9 warns the same"],
      quote: q59(19),
      source: ik(19, "Ibn Kathir says otherwise He will make you forget to do the good deeds that benefit you, because the recompense matches the action.", "He will make you forget to perform the good deeds that benefit you"),
      difficulty: 3,
      questions: [
        { q: "What does Allah make them forget, in 59:19?", a: "Themselves", wrong: ["Their homes", "Their language", "Their friends"], why: "And He caused them to forget themselves." },
        { q: "What do they forget to do, per Ibn Kathir?", a: "Good deeds that benefit them", wrong: ["Eat", "Sleep", "Travel"], why: "He will make you forget to perform the good deeds that benefit you." },
        { tf: true, q: "Ibn Kathir links 59:19 to 63:9.", why: "Let not your properties or your children divert you from the remembrance of Allah. (63:9)" }
      ]
    },
    {
      slug: "the-rebellious",
      title: "The rebellious",
      line: "Those who forget Allah are called the rebellious, Al-Fasiqun.",
      facts: ["Fasiq: leaving obedience", "Their return is a loss"],
      quote: q59(19),
      source: ik(19, "Ibn Kathir says the rebellious are those who rebel against obedience to Allah.", "those who rebel against obedience to Allah"),
      difficulty: 2,
      questions: [
        { q: "What does 59:19 call those who forget Allah?", a: "The rebellious", wrong: ["The patient", "The thankful", "The guided"], why: "Those are the rebellious." },
        { q: "Who are the rebellious, per Ibn Kathir?", a: "Those who leave obedience to Allah", wrong: ["Those who travel", "Those who sleep", "Those who trade"], why: "Referring to those who rebel against obedience to Allah." },
        { tf: false, q: "The rebellious will succeed on their return.", why: "Who will earn destruction on the Day of Resurrection and failure upon their return." }
      ]
    },
    {
      slug: "never-equal",
      title: "Never equal",
      line: "The people of Paradise and of the Fire are never equal.",
      facts: ["Allah judges with justice", "45:21 says the same"],
      quote: q59(20),
      source: ik(20, "Ibn Kathir says these two categories of people are never the same in the judgement of Allah.", "these two categories of people are never the same"),
      difficulty: 2,
      questions: [
        { q: "Who are not equal, in 59:20?", a: "People of Paradise and of the Fire", wrong: ["Rich and poor", "Old and young", "Near and far"], why: "Not equal are the dwellers of the Fire and the dwellers of the Paradise." },
        { q: "Which ayah does Ibn Kathir add?", a: "45:21", wrong: ["2:1", "103:1", "113:1"], why: "Or do those who earn evil deeds think that We shall hold them equal. (45:21)" },
        { tf: true, q: "Good and evil are never treated the same by Allah.", why: "These two categories of people are never the same." }
      ]
    },
    {
      slug: "the-winners",
      title: "The winners",
      line: "The people of Paradise are the truly successful.",
      facts: ["Al-Faizun: the winners", "Saved from Allah's punishment"],
      quote: q59(20),
      source: ik(20, "Ibn Kathir says the people of Paradise are those who will earn safety and deliverance.", "they are those who will earn safety and deliverance"),
      difficulty: 2,
      questions: [
        { q: "Who are the successful, in 59:20?", a: "The people of Paradise", wrong: ["The famous", "The wealthy", "The strong"], why: "It is the dwellers of Paradise that will be successful." },
        { q: "What do they earn, per Ibn Kathir?", a: "Safety and deliverance", wrong: ["Only gold", "Only fame", "Nothing"], why: "They are those who will earn safety and deliverance." },
        { tf: true, q: "Allah honors the righteous.", why: "Allah asserts that He will honor the righteous." }
      ]
    },
    {
      slug: "a-humbled-mountain",
      title: "A humbled mountain",
      line: "If the Quran came on a mountain, it would humble and split.",
      facts: ["Mountains are hard and huge", "Yet it would crumble from awe"],
      quote: q59(21),
      source: ik(21, "Ibn Kathir says a mountain, hard and huge, would feel humble and crumble from fear of Allah if it understood the Quran.", "will feel humble and crumble from fear of Allah"),
      difficulty: 2,
      questions: [
        { q: "What would a mountain do with the Quran, in 59:21?", a: "Humble itself and split", wrong: ["Grow taller", "Stay the same", "Run away"], why: "You would surely have seen it humbling itself and rent asunder by the fear of Allah." },
        { q: "Why would it crumble, per Ibn Kathir?", a: "From fear of Allah", wrong: ["From rain", "From wind", "From age"], why: "Will feel humble and crumble from fear of Allah." },
        { tf: true, q: "Ibn Kathir calls the mountain hard and huge.", why: "A mountain which is hard and huge." }
      ]
    },
    {
      slug: "what-about-our-hearts",
      title: "What about our hearts?",
      line: "If a mountain would humble itself, our hearts should soften.",
      facts: ["We hear and understand the Quran", "Let it make us humble"],
      quote: q59(21),
      source: ik(21, "Ibn Kathir asks: why do your hearts not feel softness and humbleness, though you understand His Book?", "Why do your hearts not feel softness and humbleness"),
      difficulty: 3,
      questions: [
        { q: "What should the Quran do to our hearts?", a: "Soften and humble them", wrong: ["Harden them", "Bore them", "Nothing"], why: "Why do your hearts not feel softness and humbleness from the fear of Allah." },
        { q: "Why are parables given, in 59:21?", a: "That people may reflect", wrong: ["To scare animals", "For fun only", "To fill pages"], why: "Such are the parables which We put forward to mankind that they may reflect." },
        { tf: true, q: "Ibn Kathir also links this to 2:74 on stones.", why: "And indeed, there are of them which fall down for fear of Allah. (2:74)" }
      ]
    },
    {
      slug: "the-crying-palm",
      title: "The crying palm trunk",
      line: "A palm trunk cried when he moved to a new pulpit.",
      facts: ["He used to stand by it for sermons", "He came down and held it"],
      quote: q59(21),
      source: hadith("bukhari", "3584", "Jabir ibn Abdullah", "Sahih", "The Prophet ﷺ used to stand by a palm trunk on Friday; when a pulpit was made, the trunk cried like a child until he came down and held it.", "The datepalm cried like a child"),
      difficulty: 3,
      questions: [
        { q: "What did the palm trunk do?", a: "Cried like a child", wrong: ["Grew dates", "Fell over", "Stayed silent"], why: "The datepalm cried like a child!" },
        { q: "What did the Prophet ﷺ do then?", a: "Came down and held it", wrong: ["Walked away", "Cut it down", "Laughed"], why: "The Prophet ﷺ descended (the pulpit) and embraced it." },
        { tf: true, q: "Ibn Kathir uses this story to explain 59:21.", why: "The tree trunk missed hearing the remembrance of Allah and the revelation." }
      ]
    },
    {
      slug: "none-but-him",
      title: "None worthy but Him",
      line: "He is Allah: none is worthy of worship but Him.",
      facts: ["La ilaha illa Huwa", "All other gods are false"],
      quote: q59(22),
      source: ik(22, "Ibn Kathir says Allah alone is worthy of worship, and all that is worshipped instead of Him is false.", "Allah states that He Alone is worthy of worship"),
      difficulty: 1,
      questions: [
        { q: "Who alone is worthy of worship?", a: "Allah", wrong: ["The sun", "Kings", "Idols"], why: "He is Allah, beside Whom La ilaha illa Huwa." },
        { q: "What does Ibn Kathir call other objects of worship?", a: "False deities", wrong: ["Helpers", "Partners", "Angels"], why: "All that is being worshipped instead of Allah are false deities." },
        { tf: true, q: "59:22 to 59:24 each begin: He is Allah.", why: "He is Allah, beside Whom La ilaha illa Huwa." }
      ]
    },
    {
      slug: "unseen-and-seen",
      title: "The unseen and the seen",
      line: "Allah knows the unseen and the seen, even ants in the dark.",
      facts: ["Al-Ghayb: what we cannot see", "Ash-Shahadah: what we can see"],
      quote: q59(22),
      source: ik(22, "Ibn Kathir says nothing in heaven or earth escapes His knowledge, great or small, including ants in darkness.", "including ants in darkness"),
      difficulty: 2,
      questions: [
        { q: "What does Allah know, in 59:22?", a: "The unseen and the seen", wrong: ["Only the seen", "Only the past", "Only the sky"], why: "The All-Knower of the unseen and the seen." },
        { q: "Which tiny thing does Ibn Kathir mention?", a: "Ants in darkness", wrong: ["Grains of rice", "Drops of rain", "Fish in the sea"], why: "Including ants in darkness." },
        { tf: true, q: "Nothing escapes Allah's knowledge.", why: "Nothing in heaven or on earth ever escapes His knowledge." }
      ]
    },
    {
      slug: "mercy-in-both-lives",
      title: "Mercy in both lives",
      line: "He is Ar-Rahman and Ar-Rahim, in this life and the next.",
      facts: ["His mercy embraces all things", "7:156 says so"],
      quote: q59(22),
      source: ik(22, "Ibn Kathir says Allah owns the wide mercy that covers all His creation; He is Ar-Rahman and Ar-Rahim of this life and the Hereafter.", "He is Ar-Rahman and Ar-Rahim of this life and the Hereafter"),
      difficulty: 2,
      questions: [
        { q: "Which two Names end 59:22?", a: "Most Gracious, Most Merciful", wrong: ["King, Holy", "Creator, Shaper", "Strong, Firm"], why: "He is the Most Gracious, the Most Merciful." },
        { q: "Where is Allah merciful, per Ibn Kathir?", a: "This life and the Hereafter", wrong: ["Only this life", "Only in dreams", "Only at night"], why: "Ar-Rahman and Ar-Rahim of this life and the Hereafter." },
        { tf: true, q: "Ibn Kathir quotes 7:156: My mercy embraces all things.", why: "And My mercy embraces all things. (7:156)" }
      ]
    },
    {
      slug: "al-malik",
      title: "Al-Malik, the King",
      line: "Al-Malik owns all things and rules them without any rival.",
      facts: ["King and Owner", "Full power, no hindrance"],
      quote: q59(23),
      source: ik(23, "Ibn Kathir says Al-Malik means the Owner and King of all things, with full power over them.", "The Owner and King of all things"),
      difficulty: 2,
      questions: [
        { q: "What does Al-Malik mean?", a: "The Owner and King of all", wrong: ["The Traveler", "The Builder", "The Farmer"], why: "Al-Malik, meaning The Owner and King of all things." },
        { q: "Can anyone resist His rule?", a: "No one", wrong: ["Some kings", "Big armies", "Strong winds"], why: "Who has full power over them without resistance or hindrance." },
        { tf: true, q: "Al-Malik is the first Name listed in 59:23.", why: "He is Allah, beside Whom La ilaha illa Huwa, Al-Malik." }
      ]
    },
    {
      slug: "al-quddus",
      title: "Al-Quddus, the Pure",
      line: "Al-Quddus is the Pure, the Blessed, glorified by the angels.",
      facts: ["Wahb: The Pure", "Mujahid and Qatadah: The Blessed"],
      quote: q59(23),
      source: ik(23, "Ibn Kathir says Al-Quddus means The Pure, per Wahb, and The Blessed, per Mujahid and Qatadah.", "according to Wahb bin Munabbih"),
      difficulty: 3,
      questions: [
        { q: "What does Al-Quddus mean, per Wahb?", a: "The Pure", wrong: ["The Rich", "The Near", "The Fast"], why: "Al-Quddus, meaning The Pure, according to Wahb bin Munabbih." },
        { q: "What did Mujahid and Qatadah say it means?", a: "The Blessed", wrong: ["The Strong", "The Last", "The Wise"], why: "Mujahid and Qatadah said that Al-Quddus means The Blessed." },
        { tf: true, q: "Ibn Jurayj said the angels glorify Al-Quddus.", why: "He Whom the honorable angels glorify." }
      ]
    },
    {
      slug: "as-salam",
      title: "As-Salam, free of all flaws",
      line: "As-Salam is free of every defect in His attributes and acts.",
      facts: ["Salam also means peace", "Nothing lessens His perfection"],
      quote: q59(23),
      source: ik(23, "Ibn Kathir says As-Salam means free from any defects or shortcomings that lessen His perfect attributes and actions.", "Free from any defects or shortcomings"),
      difficulty: 3,
      questions: [
        { q: "What does As-Salam mean, per Ibn Kathir?", a: "Free from any defect", wrong: ["Very quiet", "Far away", "Always new"], why: "Free from any defects or shortcomings." },
        { q: "What is perfect, per Ibn Kathir?", a: "His attributes and actions", wrong: ["Only His words", "Only His creation", "Nothing"], why: "That lessen or decrease His perfect attributes and actions." },
        { tf: true, q: "As-Salam comes right after Al-Quddus in 59:23.", why: "Al-Malik, Al-Quddus, As-Salam." }
      ]
    },
    {
      slug: "al-mumin",
      title: "Al-Mu'min, Giver of safety",
      line: "Al-Mu'min gives His servants safety: He never wrongs them.",
      facts: ["Ibn Abbas: He grants safety", "Qatadah: He affirms His word is true"],
      quote: q59(23),
      source: ik(23, "Ibn Kathir quotes Ibn Abbas: Al-Mu'min is He Who granted safety to His servants by promising never to be unjust to them.", "Who has granted safety to His servants"),
      difficulty: 3,
      questions: [
        { q: "What does Al-Mu'min mean, per Ibn Abbas?", a: "He grants safety to His servants", wrong: ["He sleeps", "He travels", "He needs help"], why: "Who has granted safety to His servants." },
        { q: "What did Allah promise, per Ibn Abbas?", a: "Never to be unjust to them", wrong: ["Gold for all", "No rain", "No death"], why: "By promising that He will never be unjust to them." },
        { tf: true, q: "Qatadah said He affirms His statements are true.", why: "Qatadah said that Al-Mu'min means that Allah affirms that His statements are true." }
      ]
    },
    {
      slug: "al-muhaymin",
      title: "Al-Muhaymin, the Watcher",
      line: "Al-Muhaymin witnesses and watches over all that His servants do.",
      facts: ["Ibn Abbas: the Witness", "58:6 says Allah is Witness over all"],
      quote: q59(23),
      source: ik(23, "Ibn Kathir quotes Ibn Abbas: Al-Muhaymin is the Witness for His servants' actions, the Ever-Watcher over them.", "The Witness for His servants actions"),
      difficulty: 3,
      questions: [
        { q: "What does Al-Muhaymin mean, per Ibn Abbas?", a: "The Witness over deeds", wrong: ["The Forgetful", "The Sleeper", "The Hidden One"], why: "The Witness for His servants actions, that is, the Ever-Watcher over them." },
        { q: "Which ayah does Ibn Kathir link to Al-Muhaymin?", a: "58:6", wrong: ["2:1", "97:1", "114:1"], why: "And Allah is Witness over all things. (58:6)" },
        { tf: true, q: "Allah watches over every person.", why: "The Ever-Watcher over them." }
      ]
    },
    {
      slug: "al-jabbar-al-mutakabbir",
      title: "Al-Jabbar, Al-Mutakabbir",
      line: "Only Allah is worthy to be the Compeller and the Supreme.",
      facts: ["Al-Aziz: Almighty over all", "Pride belongs only to Him"],
      quote: q59(23),
      source: ik(23, "Ibn Kathir says Al-Jabbar and Al-Mutakabbir mean the Only One worthy of being the Compeller and Supreme.", "The Only One worthy of being the Compeller and Supreme"),
      difficulty: 3,
      questions: [
        { q: "Who alone is worthy of being Supreme?", a: "Allah", wrong: ["Kings", "Rich people", "Strong people"], why: "The Only One worthy of being the Compeller and Supreme." },
        { q: "What does Al-Aziz mean, per Ibn Kathir?", a: "Almighty, Dominant over all", wrong: ["Very small", "Very new", "Very far"], why: "He is the Almighty, Dominant over all things." },
        { tf: true, q: "59:23 ends by glorifying Allah above partners.", why: "Glory be to Allah! Above all that they associate as partners with Him." }
      ]
    },
    {
      slug: "glory-and-majesty",
      title: "Glory and Majesty",
      line: "Glory and Majesty belong to Allah alone, so be humble.",
      facts: ["A hadith qudsi", "Pride does not suit a servant"],
      quote: q59(23),
      source: hadith("muslim", "2620", "Abu Sa'id al-Khudri and Abu Hurairah", "Sahih", "Allah said: Glory is His lower garment and Majesty is His cloak, and whoever contends with Him over them will be punished.", "Glory is His lower garment and Majesty is His cloak"),
      difficulty: 3,
      questions: [
        { q: "What is Allah's cloak, in Muslim 2620?", a: "Majesty", wrong: ["Silk", "Light", "Clouds"], why: "Glory is His lower garment and Majesty is His cloak." },
        { q: "What should a servant be, knowing this?", a: "Humble", wrong: ["Proud", "Boastful", "Careless"], why: "He who contends with Me in regard to them I shall torment him." },
        { tf: true, q: "Ibn Kathir cites a hadith like it under Al-Mutakabbir.", why: "Might is My Izar and pride is My Rida." }
      ]
    },
    {
      slug: "khaliq-and-bari",
      title: "Al-Khaliq and Al-Bari",
      line: "Al-Khaliq measures creation; Al-Bari brings it into being.",
      facts: ["Khaliq: measures and proportions", "Bari: invents and brings to be"],
      quote: q59(24),
      source: ik(24, "Ibn Kathir says Al-Khaliq refers to measuring and proportioning, and Al-Bari to inventing and bringing into existence.", "Al-Khaliq refers to measuring and proportioning, Al-Bari refers to inventing"),
      difficulty: 3,
      questions: [
        { q: "What does Al-Khaliq refer to, per Ibn Kathir?", a: "Measuring and proportioning", wrong: ["Sleeping", "Forgetting", "Traveling"], why: "Al-Khaliq refers to measuring and proportioning." },
        { q: "What does Al-Bari refer to?", a: "Bringing into existence", wrong: ["Ending things", "Hiding things", "Counting money"], why: "Al-Bari refers to inventing and bringing into existence." },
        { tf: true, q: "None but Allah can create like this.", why: "Surely, none except Allah is able to measure, bring forth and create." }
      ]
    },
    {
      slug: "al-musawwir",
      title: "Al-Musawwir, the Shaper",
      line: "Al-Musawwir gives everything the shape and form He chooses.",
      facts: ["He says be, and it is", "82:8: He put you together"],
      quote: q59(24),
      source: ik(24, "Ibn Kathir says Al-Musawwir brings into existence anything He wills in the shape and form He decides.", "Who brings into existence anything He wills in the shape and form He decides"),
      difficulty: 2,
      questions: [
        { q: "What does Al-Musawwir do?", a: "Gives everything its shape", wrong: ["Takes away shapes", "Only paints", "Only counts"], why: "Who brings into existence anything He wills in the shape and form He decides." },
        { q: "Which ayah does Ibn Kathir link?", a: "82:8", wrong: ["1:2", "55:1", "108:1"], why: "In whatever form He willed, He put you together. (82:8)" },
        { tf: true, q: "Allah only needs to say be, and it is.", why: "He merely says to it be and it comes to existence." }
      ]
    },
    {
      slug: "the-best-names",
      title: "The Best Names",
      line: "Allah has the Best Names; ninety-nine of them lead to Paradise.",
      facts: ["Al-Asma Al-Husna", "Learning them leads to Paradise"],
      quote: q59(24),
      source: hadith("bukhari", "7392", "Abu Hurairah", "Sahih", "The Prophet ﷺ said Allah has ninety-nine Names, one hundred less one, and whoever memorizes them all will enter Paradise.", "Allah has ninety-nine Names"),
      difficulty: 2,
      questions: [
        { q: "How many Names does the hadith mention?", a: "Ninety-nine", wrong: ["Ten", "Fifty", "One thousand"], why: "Allah has ninety-nine Names, one-hundred less one." },
        { q: "What is promised to one who memorizes them?", a: "Paradise", wrong: ["Gold", "Fame", "A long life"], why: "And he who memorized them all by heart will enter Paradise." },
        { tf: true, q: "59:22 to 24 name many of these Names.", why: "To Him belong the Best Names." }
      ]
    },
    {
      slug: "he-loves-his-names",
      title: "He loves His Names",
      line: "Allah loves His Names and loves to be asked by them.",
      facts: ["As-Sa'di explains", "More than we can count"],
      quote: q59(24),
      source: saadi(59, 24, "As-Sa'di says Allah has very many Names that only He fully knows, all of them beautiful, and He loves them, loves those who love them, and loves His servants to call on Him by them.", "ومن حسنها أن الله يحبها، ويحب من يحبها، ويحب من عباده أن يدعوه ويسألوه بها"),
      difficulty: 2,
      questions: [
        { q: "How should we use Allah's Names, per as-Sa'di?", a: "Call on Him by them", wrong: ["Never say them", "Only write them", "Change them"], why: "He loves His servants to call on Him by them, says as-Sa'di." },
        { q: "Who does Allah love, per as-Sa'di on 59:24?", a: "Those who love His Names", wrong: ["Those who forget them", "No one", "Only angels"], why: "He loves His Names and loves whoever loves them." },
        { tf: true, q: "Every Name of Allah shows a quality of perfection.", why: "As-Sa'di on 59:24." }
      ]
    },
    {
      slug: "almighty-all-wise-again",
      title: "The end is like the start",
      line: "Al-Hashr ends as it began: all glorify the Almighty, All-Wise.",
      facts: ["59:1 and 59:24 match", "His greatness is never humbled"],
      quote: q59(24),
      source: ik(24, "Ibn Kathir says Al-Aziz means His greatness is never humbled, and Al-Hakim means All-Wise in His legislation and decrees.", "His greatness is never humbled"),
      difficulty: 2,
      questions: [
        { q: "How does Al-Hashr end?", a: "He is the Almighty, the All-Wise", wrong: ["He is Near", "He is Rich", "He is First"], why: "And He is the Almighty, the All-Wise." },
        { q: "What does Al-Aziz mean, per Ibn Kathir in 59:24?", a: "His greatness is never humbled", wrong: ["He is small", "He is tired", "He is new"], why: "His greatness is never humbled." },
        { tf: true, q: "All in the heavens and earth glorify Him, in 59:24.", why: "All that is in the heavens and the earth glorify Him." }
      ]
    }
  ]
};

export const HASHR_UNITS: readonly DeepUnit[] = [HASHR_ONE, HASHR_TWO, HASHR_THREE, HASHR_FOUR];
