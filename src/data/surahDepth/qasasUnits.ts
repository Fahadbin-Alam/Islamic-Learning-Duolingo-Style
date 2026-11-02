import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Al-Qasas ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Qasas 28:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_28_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Qasas 28:${ayah}`,
    url: `https://quran.com/28:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 28:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}


const q28 = (ayah: number) => quranQuote(28, ayah);
/** Ayahs 1 to 13: the clear Book, Fir'awn's tyranny, Musa in the river, Asiyah, and Musa returned to his mother. */
const QASAS_ONE: DeepUnit = {
  key: "qasas1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-28",
  name: "Al-Qasas, ayahs 1 to 13",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Qasas",
  lessons: [
    {
      slug: "the-clear-book",
      title: "The clear Book",
      line: "The Quran is a clear Book showing things as they are.",
      facts: ["Ta Sin Mim opens the surah", "It tells past and future"],
      quote: q28(2),
      source: ik(2, "These are the ayahs of the clear Book: a Book that makes plain the true reality of things, and tells us what happened and what will happen.", "the Book which is clear and makes plain the true reality of things"),
      difficulty: 2,
      questions: [
        { q: "Which letters open Al-Qasas?", a: "Ta Sin Mim", wrong: ["Alif Lam Mim", "Ya Sin", "Ha Mim"], why: "Ta Sin Mim. These are the Ayat of the manifest Book." },
        { q: "What does the clear Book make plain?", a: "The true reality of things", wrong: ["Only old poems", "Only laws of trade", "Nothing new"], why: "The Book which is clear and makes plain the true reality of things." },
        { tf: true, q: "The Quran tells of what happened and what will happen.", why: "And tells us about what happened and what will happen." }
      ]
    },
    {
      slug: "news-in-truth",
      title: "The news, in truth",
      line: "Allah tells the story of Musa and Fir'awn exactly as it was.",
      facts: ["As if you were there", "For people who believe"],
      quote: q28(3),
      source: ik(3, "Allah recites to the Prophet ﷺ the news of Musa and Fir'awn in truth, for people who believe: telling things as they really were, as if you were there seeing them.", "We tell you about things as they really were"),
      difficulty: 2,
      questions: [
        { q: "Whose news is told in 28:3?", a: "Musa and Fir'awn", wrong: ["Nuh and his son", "Yusuf and his brothers", "Sulayman and Saba"], why: "We recite to you some of the news of Musa and Fir'awn in truth." },
        { q: "How is the story told?", a: "As it really was", wrong: ["As a fable", "With changes", "As a guess"], why: "We tell you about things as they really were, as if you are there." },
        { tf: true, q: "The story is told for people who believe.", why: "For a people who believe." }
      ]
    },
    {
      slug: "fir-awn-the-tyrant",
      title: "Fir'awn the tyrant",
      line: "Fir'awn was arrogant, split his people, and oppressed Israel.",
      facts: ["He feared a boy from Israel", "He was a mischief-maker"],
      quote: q28(4),
      source: ik(4, "Fir'awn exalted himself in the land: an arrogant oppressor and tyrant. He divided people into classes, forced the Children of Israel into hard labor and harmed their sons, fearing a boy among them would end his kingdom.", "he was an arrogant oppressor and tyrant"),
      difficulty: 3,
      questions: [
        { q: "How does Ibn Kathir describe Fir'awn?", a: "An arrogant tyrant", wrong: ["A humble king", "A fair judge", "A wise teacher"], why: "He was an arrogant oppressor and tyrant." },
        { q: "Whom did Fir'awn weaken, per Ibn Kathir?", a: "The Children of Israel", wrong: ["His own army", "The Arabs", "The Romans"], why: "Weakening a group among them. This refers to the Children of Israel." },
        { q: "What did Fir'awn fear?", a: "A boy who would end his rule", wrong: ["A flood", "A famine", "A foreign army"], why: "He feared that there might appear among them the boy who would be the cause of his destruction." }
      ]
    },
    {
      slug: "a-favor-to-the-weak",
      title: "A favor to the weak",
      line: "Allah chose to make the oppressed leaders and inheritors.",
      facts: ["No power beats Allah's decree", "His fear came true"],
      quote: q28(5),
      source: ik(5, "Allah willed to favor the weak and make them leaders and inheritors. Fir'awn hoped his power would save him, but despite his great power as a king he could not oppose the decree of Allah.", "Despite his great power as a king he could not oppose the decree of Allah"),
      difficulty: 3,
      questions: [
        { q: "What did Allah will for the weak, in 28:5?", a: "To make them leaders", wrong: ["To leave them weak", "To send them away", "To make them servants"], why: "And We wished to do a favor to those who were weak in the land, and to make them rulers." },
        { q: "Could Fir'awn's power stop Allah's decree?", a: "No, not at all", wrong: ["Yes, for a while", "Yes, forever", "Only with Haman"], why: "Despite his great power as a king he could not oppose the decree of Allah." },
        { tf: true, q: "What Fir'awn feared is what happened to him.", why: "And We let Fir'awn and Haman and their armies receive from them that which they feared." }
      ]
    },
    {
      slug: "the-mother-of-musa-is-inspired",
      title: "Musa's mother is inspired",
      line: "Allah told Musa's mother: nurse him, and do not fear.",
      facts: ["Allah promised his return", "He would be a Messenger"],
      quote: q28(7),
      source: ik(7, "When Musa's mother was worried and confused, it was inspired into her heart what to do: nurse him, and if she feared for him, place him in the river and not grieve, for Allah would bring him back and make him a Messenger.", "it was inspired into her heart and mind what she should do"),
      difficulty: 3,
      questions: [
        { q: "What was she told to do if she feared, in 28:7?", a: "Put him in the river", wrong: ["Hide him in a cave", "Give him to Fir'awn", "Run to Madyan"], why: "When you fear for him, then cast him into the river and fear not, nor grieve." },
        { q: "What two promises did Allah give her?", a: "His return and his prophethood", wrong: ["Gold and a palace", "A long life only", "A new home"], why: "We shall bring him back to you, and shall make him one of the Messengers." },
        { tf: true, q: "Allah put into her heart what she should do.", why: "It was inspired into her heart and mind what she should do." }
      ]
    },
    {
      slug: "the-box-on-the-nile",
      title: "The box on the Nile",
      line: "She hid baby Musa in a box on the Nile.",
      facts: ["Her house was by the Nile", "It reached Fir'awn's palace"],
      quote: q28(8),
      source: ik(8, "Her house was by the Nile. She made a box into a cradle and hid Musa in it on the river, tied with a rope. One day she forgot to tie it, and the water carried him to Fir'awn's house, where he was picked up.", "Her house was on the banks of the Nile, so she took a box and made it into a cradle"),
      difficulty: 4,
      questions: [
        { q: "On which river was her house?", a: "The Nile", wrong: ["The Euphrates", "The Jordan", "The Tigris"], why: "Her house was on the banks of the Nile." },
        { q: "What did she make the box into?", a: "A cradle", wrong: ["A boat for herself", "A chest of gold", "A table"], why: "She took a box and made it into a cradle." },
        { q: "Who picked him up, in 28:8?", a: "The household of Fir'awn", wrong: ["Shepherds of Madyan", "His sister", "Fishermen"], why: "Then the household of Fir'awn picked him up." }
      ]
    },
    {
      slug: "a-comfort-of-the-eye",
      title: "A comfort of the eye",
      line: "Fir'awn's wife Asiyah loved the baby and saved him from harm.",
      facts: ["She asked to keep him", "Allah guided her through him"],
      quote: q28(9),
      source: ik(9, "Fir'awn's wife, Asiyah bint Muzahim, said: a comfort of the eye for me and you, do not harm him, perhaps he will benefit us. And so it was: Allah guided her through him and caused her to dwell in Paradise.", "Allah guided her through him and caused her to dwell in Paradise because of him"),
      difficulty: 4,
      questions: [
        { q: "What did Fir'awn's wife call the baby, in 28:9?", a: "A comfort of the eye", wrong: ["A danger", "A servant", "A stranger"], why: "A comfort of the eye for me and for you." },
        { q: "What was the name of Fir'awn's wife?", a: "Asiyah", wrong: ["Maryam", "Hajar", "Bilqis"], why: "His wife Asiyah bint Muzahim came to the child's defence." },
        { q: "How did Musa benefit her, per Ibn Kathir?", a: "Allah guided her through him", wrong: ["He made her rich", "He made her queen", "He built her a house"], why: "Allah guided her through him and caused her to dwell in Paradise because of him." }
      ]
    },
    {
      slug: "asiyah-among-the-best",
      title: "Asiyah among the best",
      line: "The Prophet ﷺ named Asiyah among the most perfect of women.",
      facts: ["Asiyah and Maryam", "Faith in a tyrant's house"],
      quote: q28(9),
      source: hadith("bukhari", "3411", "Abu Musa al-Ash'ari", "Sahih", "The Prophet ﷺ said: many men reached perfection, but among women none reached it except Asiyah, the wife of Fir'awn, and Maryam, the daughter of Imran.", "none amongst the women reached this level except Asia"),
      difficulty: 5,
      questions: [
        { q: "Which two women did the Prophet ﷺ say reached perfection?", a: "Asiyah and Maryam", wrong: ["Hajar and Sarah", "Bilqis and Asiyah", "Maryam and Hajar"], why: "None amongst the women reached this level except Asia, Pharaoh's wife, and Mary, the daughter of Imran." },
        { q: "Who narrated the hadith on perfect women?", a: "Abu Musa al-Ash'ari", wrong: ["Aisha", "Anas", "Abu Hurairah"], why: "Narrated Abu Musa: Allah's Messenger ﷺ said." },
        { tf: true, q: "Asiyah kept her faith while living in Fir'awn's palace.", why: "Allah guided her through him and caused her to dwell in Paradise." }
      ]
    },
    {
      slug: "an-empty-heart",
      title: "An empty heart",
      line: "Musa's mother thought only of him, but Allah held her firm.",
      facts: ["She nearly told everyone", "Allah strengthened her heart"],
      quote: q28(10),
      source: ik(10, "When her child was lost in the river, the heart of Musa's mother became empty: she could think of nothing in this world except Musa. She nearly told people, had Allah not given her strength and patience.", "she could not think of any matter in this world except Musa"),
      difficulty: 4,
      questions: [
        { q: "What happened to her heart, in 28:10?", a: "It became empty", wrong: ["It became hard", "It became proud", "It forgot him"], why: "And the heart of the mother of Musa became empty." },
        { q: "Why did she not reveal the secret?", a: "Allah strengthened her heart", wrong: ["She was asleep", "She was far away", "No one asked"], why: "Had We not strengthened her heart, so that she might remain as one of the believers." },
        { tf: true, q: "She could think only of Musa.", why: "She could not think of any matter in this world except Musa." }
      ]
    },
    {
      slug: "his-sister-follows",
      title: "His sister follows",
      line: "Musa's sister quietly followed him to see what would happen.",
      facts: ["She watched from afar", "No one suspected her"],
      quote: q28(11),
      source: ik(11, "Musa's mother told his older sister: follow him. She traced him and looked for news around the city, watching from afar as if she was not interested, while they did not notice.", "follow his traces and look for information about him"),
      difficulty: 4,
      questions: [
        { q: "Whom did the mother send, in 28:11?", a: "His sister", wrong: ["His brother Harun", "A servant", "A neighbor"], why: "And she said to his sister: Follow him." },
        { q: "How did the sister watch him?", a: "From afar, quietly", wrong: ["Up close, loudly", "From the palace", "She did not watch"], why: "So she watched him from a far place, while they perceived not." },
        { tf: false, q: "Fir'awn's people suspected the sister at first sight.", why: "She recognized him, but she did not give any indication nor did they suspect her." }
      ]
    },
    {
      slug: "no-nurse-but-his-mother",
      title: "No nurse but his mother",
      line: "Baby Musa refused every nurse until his own mother came.",
      facts: ["Allah forbade other nurses", "His sister offered a family"],
      quote: q28(12),
      source: ik(12, "Musa refused milk from every wet nurse. It was decreed that no one would nurse him except his own mother. His sister offered a household to care for him, and he was brought back to his mother.", "It was decreed that no one should nurse him except his own mother"),
      difficulty: 5,
      questions: [
        { q: "Whom did Musa refuse, in 28:12?", a: "Every other nurse", wrong: ["His mother", "His sister", "Asiyah"], why: "And We had already forbidden foster suckling mothers for him." },
        { q: "What did the sister offer?", a: "A household to raise him", wrong: ["Gold for Fir'awn", "To take him away", "A new nurse from Madyan"], why: "Shall I direct you to a household who will rear him for you?" },
        { q: "Who alone was to nurse him?", a: "His own mother", wrong: ["Asiyah", "His sister", "A royal servant"], why: "It was decreed that no one should nurse him except his own mother." }
      ]
    },
    {
      slug: "allahs-promise-is-true",
      title: "Allah's promise is true",
      line: "Musa came back, and his mother saw Allah's promise is true.",
      facts: ["Her eye was comforted", "Relief came quickly"],
      quote: q28(13),
      source: ik(13, "Allah returned Musa to his mother so her eye would be comforted and she would not grieve, and she would know Allah's promise is true. There was only a short time between her distress and the way out.", "There was only a short time between the distress and the way out"),
      difficulty: 5,
      questions: [
        { q: "Why was Musa returned, in 28:13?", a: "To comfort her and end her grief", wrong: ["To punish her", "To test Fir'awn", "To go to Madyan"], why: "So We restored him to his mother, that her eye might be comforted, and that she might not grieve." },
        { q: "What did she come to know, in 28:13?", a: "Allah's promise is true", wrong: ["Fir'awn is kind", "The river is safe", "Nothing at all"], why: "And that she might know that the promise of Allah is true." },
        { q: "How long was her distress, per Ibn Kathir?", a: "A short time", wrong: ["Ten years", "Forty years", "Her whole life"], why: "There was only a short time between the distress and the way out." }
      ]
    },
    {
      slug: "good-hidden-in-hardship",
      title: "Good hidden in hardship",
      line: "Something we dislike can bring good, as Allah knows best.",
      facts: ["Most people do not know", "Trust Allah's wisdom"],
      quote: q28(13),
      source: ik(13, "Most people do not know the wisdom of Allah in what He does. A thing may happen that people do not like, but its result is good, as in: perhaps you dislike a thing that is good for you.", "For a thing may happen that people do not like, but its consequences are good"),
      difficulty: 5,
      questions: [
        { q: "What do most people not know, per 28:13?", a: "Allah's wisdom", wrong: ["The river's path", "Fir'awn's plans", "Their own names"], why: "But most of them know not: they do not know the wisdom of Allah in His actions." },
        { q: "Which ayah does Ibn Kathir link to this?", a: "2:216", wrong: ["1:1", "112:1", "36:1"], why: "And it may be that you dislike a thing which is good for you (2:216)." },
        { tf: true, q: "Something we dislike can turn out good for us.", why: "For a thing may happen that people do not like, but its consequences are good." }
      ]
    }
  ]
};

/** Ayahs 14 to 24: Musa grows up, the fight, his repentance, the warning, the flight to Madyan, and the two women at the well. */
const QASAS_TWO: DeepUnit = {
  key: "qasas2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-28",
  name: "Al-Qasas, ayahs 14 to 24",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Qasas",
  lessons: [
    {
      slug: "wisdom-and-knowledge",
      title: "Wisdom and knowledge",
      line: "When Musa grew up, Allah gave him wisdom and knowledge.",
      facts: ["Mujahid: prophethood", "Allah rewards the good"],
      quote: q28(14),
      source: ik(14, "When Musa reached full strength and maturity, Allah gave him Hukm and religious knowledge. Mujahid said this means prophethood. This is how Allah rewards those who do good.", "Mujahid said that this means prophethood"),
      difficulty: 2,
      questions: [
        { q: "What did Musa receive when grown, in 28:14?", a: "Hukm and knowledge", wrong: ["A kingdom", "Gold", "An army"], why: "We bestowed on him Hukm and knowledge." },
        { q: "What did Mujahid say Hukm means in 28:14?", a: "Prophethood", wrong: ["Wealth", "Strength", "Fame"], why: "Mujahid said that this means prophethood." },
        { tf: true, q: "Allah rewards the doers of good.", why: "And thus do We reward the doers of good." }
      ]
    },
    {
      slug: "the-fight-in-the-city",
      title: "The fight in the city",
      line: "Musa struck a man to help another, and the man died.",
      facts: ["He did not mean to kill", "He blamed Shaytan's trick"],
      quote: q28(15),
      source: ik(15, "Musa entered the city and found two men fighting, an Israelite and a Copt. The Israelite asked for help, and Musa struck the other with his fist, and he died. Musa said this was from Shaytan, a clear misleading enemy.", "The Israelite man asked Musa, peace be upon him, for help"),
      difficulty: 2,
      questions: [
        { q: "What did Musa find in the city, in 28:15?", a: "Two men fighting", wrong: ["A market fire", "A wedding", "A lost child"], why: "He found there two men fighting." },
        { q: "What did Musa use, per Mujahid?", a: "His fist", wrong: ["A sword", "His stick", "A stone"], why: "Mujahid said: this means he punched him with his fist." },
        { tf: true, q: "Musa said the deed came from Shaytan.", why: "This is of Shaytan's doing, verily, he is a plain misleading enemy." }
      ]
    },
    {
      slug: "forgive-me-my-lord",
      title: "Forgive me, my Lord",
      line: "Musa said: I wronged myself, so forgive me. And Allah forgave.",
      facts: ["Admit the mistake", "Allah is Most Merciful"],
      quote: q28(16),
      source: ik(16, "Musa said: my Lord, I have wronged myself, so forgive me. Then Allah forgave him; He is the Oft-Forgiving, the Most Merciful.", "Then He forgave him. Verily, He is the Oft-Forgiving, the Most Merciful"),
      difficulty: 3,
      questions: [
        { q: "What did Musa say, in 28:16?", a: "I have wronged myself", wrong: ["It was not me", "He deserved it", "I will hide it"], why: "My Lord! Verily, I have wronged myself, so forgive me." },
        { q: "How did Allah answer, in 28:16?", a: "He forgave him", wrong: ["He punished him", "He ignored him", "He took his strength"], why: "Then He forgave him." },
        { tf: true, q: "Asking Allah for forgiveness is the way back after a mistake.", why: "So forgive me. Then He forgave him." }
      ]
    },
    {
      slug: "never-a-helper-of-wrong",
      title: "Never a helper of wrong",
      line: "Musa promised never again to help wrongdoers.",
      facts: ["Thankful for Allah's favor", "A promise to Allah"],
      quote: q28(17),
      source: ik(17, "Musa said: my Lord, for the favor You gave me of honor, power and blessings, I will never again be a helper of the criminals, those who disbelieve in You and go against Your commands.", "those who disbelieve in You and go against Your commands"),
      difficulty: 3,
      questions: [
        { q: "What did Musa promise, in 28:17?", a: "Never to help criminals", wrong: ["To become king", "To leave Egypt", "To stop praying"], why: "I will nevermore be a helper of the criminals!" },
        { q: "Who are the criminals, per Ibn Kathir?", a: "Those who defy Allah", wrong: ["Only thieves", "Foreigners", "Shepherds"], why: "Those who disbelieve in You and go against Your commands." },
        { tf: true, q: "Musa thanked Allah for His favors.", why: "My Lord! For that with which You have favored me." }
      ]
    },
    {
      slug: "the-secret-comes-out",
      title: "The secret comes out",
      line: "The next day the same man cried out, and the secret spread.",
      facts: ["Musa was afraid", "Fir'awn sent men after him"],
      quote: q28(19),
      source: ik(19, "The next day the same man called Musa for help again. Musa called him a clear misleader. Fearing Musa, the man blurted out the killing, which nobody but he and Musa knew, and word reached Fir'awn.", "Nobody except him and Musa, peace be upon him, knew about it"),
      difficulty: 4,
      questions: [
        { q: "How did Musa feel the next day, in 28:18?", a: "Afraid and watchful", wrong: ["Proud", "Careless", "Happy"], why: "So he became afraid, looking about in the city." },
        { q: "What did Musa call the man?", a: "A plain misleader", wrong: ["A true friend", "A wise man", "A brave man"], why: "Musa said to him: Verily, you are a plain misleader!" },
        { q: "Who knew of the killing before he spoke?", a: "Only him and Musa", wrong: ["The whole city", "Fir'awn", "Haman"], why: "Nobody except him and Musa, peace be upon him, knew about it." }
      ]
    },
    {
      slug: "the-man-who-ran",
      title: "The man who ran",
      line: "A man ran across the city to warn Musa.",
      facts: ["He took a shorter route", "A sincere adviser"],
      quote: q28(20),
      source: ik(20, "A man came running from the farthest end of the city. He had the courage to take a shorter route than those sent after Musa, reached him first, and said: the chiefs plan to kill you, so escape; I am a sincere adviser.", "he had the courage to take a different route"),
      difficulty: 4,
      questions: [
        { q: "From where did the man come, in 28:20?", a: "The farthest end of the city", wrong: ["The palace", "Madyan", "The river"], why: "And there came a man running, from the farthest end of the city." },
        { q: "How did he reach Musa first?", a: "By a shorter route", wrong: ["On a horse", "By boat", "He flew"], why: "He had the courage to take a different route, a shorter route than those who were sent after Musa." },
        { tf: true, q: "The man told Musa to escape.", why: "To kill you, so escape. Truly, I am one of the good advisers to you." }
      ]
    },
    {
      slug: "toward-madyan",
      title: "Toward Madyan",
      line: "Musa fled alone and prayed: my Lord, guide me.",
      facts: ["Save me from the wrongdoers", "Allah guided his path"],
      quote: q28(22),
      source: ik(22, "Musa left Egypt alone, though he was not used to it, praying to be saved from the wrongdoers. Heading for Madyan, he took a smooth and easy route and said: perhaps my Lord will guide me to the right way.", "he took a smooth and easy route"),
      difficulty: 4,
      questions: [
        { q: "What did Musa pray, in 28:21?", a: "Save me from the wrongdoers", wrong: ["Give me a kingdom", "Make me rich", "Punish them now"], why: "My Lord! Save me from the people who are wrongdoers!" },
        { q: "Where did Musa head, in 28:22?", a: "Madyan", wrong: ["Makkah", "Saba", "Babylon"], why: "And when he went towards Madyan." },
        { tf: true, q: "Musa asked Allah to guide him to the right way.", why: "It may be that my Lord guides me to the right way." }
      ]
    },
    {
      slug: "two-women-at-the-well",
      title: "Two women at the well",
      line: "At Madyan's well, Musa kindly watered two women's flocks.",
      facts: ["Their father was very old", "They waited for the shepherds"],
      quote: q28(23),
      source: ik(23, "At the well of Madyan, shepherds were watering, and two women held their sheep back. Musa felt sorry for them and asked why. They said they waited for the shepherds to finish, and their father was very old. So he watered for them.", "he felt sorry for them and took pity on them"),
      difficulty: 5,
      questions: [
        { q: "Why were the women waiting, in 28:23?", a: "For the shepherds to finish", wrong: ["For rain", "For their brother", "For a festival"], why: "We cannot water until the shepherds take their flocks." },
        { q: "Why did they come themselves?", a: "Their father was very old", wrong: ["They liked the walk", "They were lost", "They had no sheep"], why: "And our father is a very old man." },
        { q: "How did Musa feel on seeing them?", a: "He felt pity for them", wrong: ["He was annoyed", "He ignored them", "He laughed"], why: "He felt sorry for them and took pity on them." }
      ]
    },
    {
      slug: "i-am-in-need",
      title: "I am in need",
      line: "In the shade, Musa told Allah: I need Your good.",
      facts: ["He sat beneath a tree", "The women heard his prayer"],
      quote: q28(24),
      source: ik(24, "After watering the flocks, Musa went back to the shade. Ibn Abbas, Ibn Masud and As-Suddi said he sat beneath a tree, and said: my Lord, truly I am in need of whatever good You send down to me.", "He sat beneath a tree"),
      difficulty: 5,
      questions: [
        { q: "Where did Musa rest, per Ibn Abbas?", a: "Beneath a tree", wrong: ["In a cave", "In a palace", "By the sea"], why: "Ibn Abbas, Ibn Masud and As-Suddi said: He sat beneath a tree." },
        { q: "What did Musa say, in 28:24?", a: "I am in need of Your good", wrong: ["I am the strongest", "Pay me now", "I want to go home"], why: "My Lord! Truly, I am in need of whatever good that You bestow on me!" },
        { tf: true, q: "Musa asked Allah, not people, for what he needed.", why: "My Lord! Truly, I am in need of whatever good that You bestow on me!" }
      ]
    }
  ]
};

/** Ayahs 25 to 32: the shy invitation, the strong and trustworthy, eight or ten years, the fire at At-Tur, the stick and the shining hand. */
const QASAS_THREE: DeepUnit = {
  key: "qasas3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-28",
  name: "Al-Qasas, ayahs 25 to 32",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Qasas",
  lessons: [
    {
      slug: "walking-shyly",
      title: "Walking shyly",
      line: "One woman came shyly and politely invited Musa to her father.",
      facts: ["Good manners in speech", "Her father wanted to reward him"],
      quote: q28(25),
      source: ik(25, "One of the two women came walking shyly. She said: my father calls you to reward you for watering for us. She did not invite him directly, which is an example of good manners. Her father told Musa: fear not, you have escaped the wrongdoers.", "This is an example of good manners"),
      difficulty: 2,
      questions: [
        { q: "How did she walk, in 28:25?", a: "Shyly", wrong: ["Running", "Proudly", "Laughing"], why: "Then there came to him one of them, walking shyly." },
        { q: "Who did she say was inviting Musa?", a: "Her father", wrong: ["Her brother", "The king", "Herself"], why: "Verily, my father calls you that he may reward you." },
        { q: "What did the father tell Musa, in 28:25?", a: "Fear not, you have escaped", wrong: ["Leave at once", "Work for free", "Go back to Egypt"], why: "Fear you not. You have escaped from the people who are wrongdoers." }
      ]
    },
    {
      slug: "strong-and-trustworthy",
      title: "Strong and trustworthy",
      line: "The best worker to hire is the strong and the trustworthy.",
      facts: ["He lifted a heavy rock", "He walked with modesty"],
      quote: q28(26),
      source: ik(26, "One daughter said: father, hire him; the best to hire is the strong, the trustworthy. Asked how she knew, she said he lifted a rock only ten men could lift, and asked her to walk behind him and guide him with a pebble.", "He lifted a rock which could only be lifted by ten men"),
      difficulty: 2,
      questions: [
        { q: "What two qualities did she name, in 28:26?", a: "Strong and trustworthy", wrong: ["Rich and famous", "Young and tall", "Clever and funny"], why: "The best of men for you to hire is the strong, the trustworthy." },
        { q: "How many men usually lifted that rock?", a: "Ten", wrong: ["Two", "Five", "Forty"], why: "He lifted a rock which could only be lifted by ten men." },
        { tf: true, q: "Musa asked her to walk behind him on the way.", why: "He said to me, walk behind me." }
      ]
    },
    {
      slug: "shepherds-like-the-prophets",
      title: "Shepherds like the Prophets",
      line: "Every Prophet tended sheep, and so did our Prophet ﷺ in Makkah.",
      facts: ["Musa tended sheep too", "Honest work is noble"],
      quote: q28(26),
      source: hadith("bukhari", "2262", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: Allah did not send any prophet but that he shepherded sheep. His companions asked: you too? He said: yes, I used to tend the sheep of the people of Makkah for some qirats.", "Allah did not send any prophet but shepherded sheep"),
      difficulty: 3,
      questions: [
        { q: "What work did every Prophet do?", a: "Tending sheep", wrong: ["Trading gold", "Building ships", "Writing books"], why: "Allah did not send any prophet but shepherded sheep." },
        { q: "Whose sheep did the Prophet ﷺ tend?", a: "The people of Makkah", wrong: ["Fir'awn", "The Romans", "His own only"], why: "I used to shepherd the sheep of the people of Mecca for some Qirats." },
        { tf: true, q: "Musa was hired to look after sheep.", why: "O my father! Hire him! As a shepherd to look after the sheep." }
      ]
    },
    {
      slug: "eight-or-ten-years",
      title: "Eight or ten years",
      line: "The old man offered marriage for eight years of work.",
      facts: ["No hardship placed on him", "Allah is witness to the deal"],
      quote: q28(27),
      source: ik(27, "The old man offered to marry one of his daughters to Musa if he tended the flocks for eight years, and ten if he chose. He said: I do not want to put pressure on you. Musa agreed, and said Allah is witness over what we say.", "I do not want to put pressure on you"),
      difficulty: 3,
      questions: [
        { q: "How many years were required, in 28:27?", a: "Eight", wrong: ["Three", "Twelve", "Twenty"], why: "On condition that you serve me for eight years." },
        { q: "What would ten years be?", a: "A favor from Musa", wrong: ["A must", "A punishment", "A loan"], why: "But if you complete ten years, it will be a favor from you." },
        { q: "Who did Musa say is witness, in 28:28?", a: "Allah", wrong: ["The shepherds", "The daughters", "No one"], why: "And Allah is Surety over what we say." }
      ]
    },
    {
      slug: "he-kept-the-longer-term",
      title: "He kept the longer term",
      line: "Ibn Abbas said Musa completed the longer and better term.",
      facts: ["Messengers keep their word", "Ten years of service"],
      quote: q28(29),
      source: hadith("bukhari", "2684", "Sa'id bin Jubair", "Sahih", "A man asked Sa'id bin Jubair which term Musa completed. He asked Ibn Abbas, who said: he completed the longer and better one, for a Messenger of Allah does what he says.", "Moses completed the longer and better period"),
      difficulty: 4,
      questions: [
        { q: "Which term did Musa complete, per Ibn Abbas?", a: "The longer and better one", wrong: ["The shorter one", "Neither", "Only half"], why: "Moses completed the longer and better period." },
        { q: "Why, said Ibn Abbas?", a: "A Messenger does what he says", wrong: ["He was forced", "He had no money", "He forgot the time"], why: "An apostle of Allah always does what he says." },
        { q: "Whom did Sa'id bin Jubair ask?", a: "Ibn Abbas", wrong: ["Abu Hurairah", "Aisha", "Anas"], why: "I went to Ibn Abbas and asked him." }
      ]
    },
    {
      slug: "a-fire-on-a-cold-night",
      title: "A fire on a cold night",
      line: "On a cold dark night, Musa saw a fire at At-Tur.",
      facts: ["They had lost their way", "He went to bring warmth"],
      quote: q28(29),
      source: ik(29, "After the term, Musa set out with his family on a cold, dark, rainy night. He could not light a fire, then saw one at At-Tur and said: wait, perhaps I bring news of the way, or a burning brand to warm you.", "set out on a cold, dark, rainy night"),
      difficulty: 4,
      questions: [
        { q: "Where did Musa see the fire, in 28:29?", a: "Toward At-Tur", wrong: ["In Madyan", "On the Nile", "In Makkah"], why: "He saw a fire in the direction of At-Tur." },
        { q: "What was the night like?", a: "Cold, dark and rainy", wrong: ["Hot and bright", "Calm and starry", "Snowy and silent"], why: "Set out on a cold, dark, rainy night." },
        { q: "Why might he bring news?", a: "They had lost their way", wrong: ["He was bored", "To find gold", "To meet Fir'awn"], why: "Perhaps I may bring to you from there some information. This was because they lost their way." }
      ]
    },
    {
      slug: "i-am-allah",
      title: "I am Allah",
      line: "From the tree in the blessed valley, Allah called: O Musa!",
      facts: ["The fire was in a green bush", "Lord of all that exists"],
      quote: q28(30),
      source: ik(30, "Musa was called from the right side of the valley, in the blessed place, from the tree. He found the fire burning in a green bush and stood amazed. Then his Lord called: O Musa, I am Allah, the Lord of all that exists.", "He found the fire burning in a green bush"),
      difficulty: 4,
      questions: [
        { q: "Where did the call come from, in 28:30?", a: "The tree in the blessed place", wrong: ["The sky", "The river", "A mountain cave"], why: "In the blessed place, from the tree." },
        { q: "Where was the fire burning?", a: "In a green bush", wrong: ["On a rock", "In a lamp", "In the sand"], why: "He found the fire burning in a green bush." },
        { tf: true, q: "Allah told Musa: I am Allah, Lord of all that exists.", why: "O Musa! Verily, I am Allah, the Lord of all that exists!" }
      ]
    },
    {
      slug: "draw-near-and-fear-not",
      title: "Draw near, fear not",
      line: "Musa's stick moved like a snake; he fled, and Allah calmed him.",
      facts: ["Fleeing such a thing is natural", "You are among the secure"],
      quote: q28(31),
      source: ik(31, "Musa threw his stick and saw it moving like a snake, so he turned and fled without looking back, for it is human nature to flee such a thing. Allah said: O Musa, draw near and fear not, you are among the secure.", "it is human nature to flee from such a thing"),
      difficulty: 5,
      questions: [
        { q: "What did the stick become like, in 28:31?", a: "A moving snake", wrong: ["A bird", "A tree", "A sword"], why: "When he saw it moving as if it were a snake." },
        { q: "Why did Musa flee, per Ibn Kathir?", a: "It is human nature", wrong: ["He was weak in faith", "He was told to run", "He was lost"], why: "It is human nature to flee from such a thing." },
        { q: "What did Allah tell him, in 28:31?", a: "Draw near and fear not", wrong: ["Run faster", "Throw it again", "Go home"], why: "O Musa! Draw near, and fear not. Verily, you are of those who are secure." }
      ]
    },
    {
      slug: "the-shining-hand",
      title: "The shining hand",
      line: "Musa's hand came out shining white, with no illness at all.",
      facts: ["Like a piece of the moon", "Two proofs for Fir'awn"],
      quote: q28(32),
      source: ik(32, "Allah told Musa to put his hand into his garment: it would come out shining white, as if a piece of the moon or a flash of lightning, with no illness. The stick and the hand were two proofs for Fir'awn and his chiefs.", "it will be shining white as if it were a piece of the moon"),
      difficulty: 5,
      questions: [
        { q: "How did his hand come out, in 28:32?", a: "White, without illness", wrong: ["Red and hot", "Dark", "Covered in gold"], why: "Put your hand into the opening of your garment, it will come forth white without a disease." },
        { q: "What did it shine like, per Ibn Kathir?", a: "A piece of the moon", wrong: ["A candle", "A diamond", "The sea"], why: "It will be shining white as if it were a piece of the moon or a flash of lightning." },
        { q: "How many proofs were sent to Fir'awn, in 28:32?", a: "Two", wrong: ["One", "Seven", "Ten"], why: "These are two proofs from your Lord to Fir'awn and his chiefs." }
      ]
    },
    {
      slug: "a-hand-against-fear",
      title: "A hand against fear",
      line: "Allah told Musa to hold his hand to his side when afraid.",
      facts: ["Fear would leave him", "Trust Allah in fear"],
      quote: q28(32),
      source: ik(32, "Musa was commanded, when he felt afraid, to draw his hand close to his side, and the fear would go. Ibn Kathir says perhaps if a person follows Musa and puts his hand over his heart, his fear will lessen, if Allah wills.", "draw his hand close to his side to be free from the fear"),
      difficulty: 5,
      questions: [
        { q: "What was Musa told to do when afraid?", a: "Hold his hand to his side", wrong: ["Shout loudly", "Run away", "Close his eyes"], why: "Musa was commanded, when he felt afraid of anything, to draw his hand close to his side." },
        { q: "What does Ibn Kathir suggest for us?", a: "Hand over the heart", wrong: ["Hand on the head", "Clap the hands", "Raise both feet"], why: "Perhaps if a person does this, following the example of Musa, and puts his hand over his heart, his fear will disappear." },
        { tf: true, q: "Ibn Kathir adds: in Allah we place our trust.", why: "In Allah we place our trust." }
      ]
    }
  ]
};

export const QASAS_UNITS: readonly DeepUnit[] = [QASAS_ONE, QASAS_TWO, QASAS_THREE];
