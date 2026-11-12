import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

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
    },
    {
      slug: "asking-by-your-state",
      title: "Asking by your state",
      line: "Showing Allah your need is even more moving than words.",
      facts: ["As-Sa'di explains", "Dua by one's state"],
      quote: q28(24),
      source: saadi(28, 24, "As-Sa'di says Musa watered the flocks seeking only Allah's pleasure, then in the shade asked his Lord for provision by showing his need, and asking by one's state is more eloquent than asking in words.", "والسؤال بالحال أبلغ من السؤال بلسان المقال"),
      difficulty: 2,
      questions: [
        { q: "How did Musa ask Allah, per as-Sa'di on 28:24?", a: "By showing his need", wrong: ["By complaining", "By demanding wages", "By staying silent forever"], why: "He asked by showing his state of need, says as-Sa'di." },
        { q: "Why did Musa water the women's flocks, per as-Sa'di?", a: "Only for Allah's pleasure", wrong: ["For a wage", "To get a job", "To show off"], why: "He sought no wage, only the Face of Allah." },
        { tf: true, q: "Asking by one's state can say more than asking in words.", why: "As-Sa'di on 28:24." }
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

/** Ayahs 33 to 43: Harun as helper, Musa before Fir'awn, the tower of clay, the sea, and the Tawrah. */
const QASAS_FOUR: DeepUnit = {
  key: "qasas4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-28",
  name: "Al-Qasas, ayahs 33 to 43",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Qasas",
  lessons: [
    {
      slug: "harun-as-helper",
      title: "Harun as a helper",
      line: "Musa feared going alone and asked for his brother Harun's help.",
      facts: ["Harun spoke more clearly", "Two voices carry more weight"],
      quote: q28(34),
      source: ik(34, "Musa feared Fir'awn's people and asked that his brother Harun, who spoke more clearly, be sent with him as a helper to confirm him, because the word of two carries more weight than the word of one.", "the word of two carries more weight"),
      difficulty: 2,
      questions: [
        { q: "Whom did Musa ask for, in 28:34?", a: "His brother Harun", wrong: ["His father-in-law", "Asiyah", "The running man"], why: "And my brother Harun, he is more eloquent in speech than me, so send him with me as a helper." },
        { q: "Why is a helper useful, per Ibn Kathir?", a: "Two voices carry more weight", wrong: ["To carry bags", "To fight Fir'awn", "To cook food"], why: "The word of two carries more weight in people's minds than the word of one." },
        { tf: true, q: "Musa said Harun was more eloquent than him.", why: "My brother Harun, he is more eloquent in speech than me." }
      ]
    },
    {
      slug: "strengthened-by-a-brother",
      title: "Strengthened by a brother",
      line: "Allah strengthened Musa through Harun and promised them victory.",
      facts: ["Harun was made a Prophet", "They could not be harmed"],
      quote: q28(35),
      source: ik(35, "Allah said He would strengthen Musa through his brother and give them both power, so Fir'awn's people would have no way of harming them. One of the early scholars said no one did a greater favor for a brother than Musa did for Harun.", "they will have no way or means of harming you"),
      difficulty: 2,
      questions: [
        { q: "How did Allah strengthen Musa, in 28:35?", a: "Through his brother", wrong: ["Through an army", "Through gold", "Through a palace"], why: "We will strengthen your arm through your brother." },
        { q: "Who would be the victors, in 28:35?", a: "Musa, Harun and their followers", wrong: ["Fir'awn", "Haman", "No one"], why: "You two as well as those who follow you, will be the victors." },
        { tf: true, q: "Musa asked for his brother to share his mission.", why: "There is no one who has ever done a greater favor to his brother than Musa did for Harun." }
      ]
    },
    {
      slug: "they-called-it-magic",
      title: "They called it magic",
      line: "They saw clear signs, yet called them invented magic.",
      facts: ["They knew it was true", "Pride stopped them"],
      quote: q28(36),
      source: ik(36, "Musa and Harun showed Fir'awn and his chiefs clear miracles. They knew it was from Allah, but out of disbelief and pride they resorted to stubbornness and false arguments, calling it invented magic.", "they resorted to stubbornness and false arguments"),
      difficulty: 3,
      questions: [
        { q: "What did they call the signs, in 28:36?", a: "Invented magic", wrong: ["A true miracle", "A dream", "A poem"], why: "This is nothing but invented magic." },
        { q: "What did they say of their fathers?", a: "They never heard of this", wrong: ["Their fathers believed", "Their fathers were Prophets", "Nothing"], why: "Never did we hear of this among our fathers of old." },
        { q: "Why did they reject it, per Ibn Kathir?", a: "Stubbornness and pride", wrong: ["No one showed them", "They were asleep", "It was unclear"], why: "They resorted to stubbornness and false arguments. They were too evil and arrogant to follow the truth." }
      ]
    },
    {
      slug: "allah-knows-who-is-guided",
      title: "Allah knows who is guided",
      line: "Musa said: my Lord knows best who brings true guidance.",
      facts: ["Wrongdoers do not succeed", "The good end is Allah's to give"],
      quote: q28(37),
      source: ik(37, "Musa answered: my Lord knows best who came with guidance from Him, and whose will be the happy end; He will judge between us. The wrongdoers will not succeed.", "who will be supported and will prevail"),
      difficulty: 3,
      questions: [
        { q: "Who knows best who is guided, in 28:37?", a: "Musa's Lord", wrong: ["Fir'awn", "The magicians", "The crowd"], why: "My Lord knows best him who came with guidance from Him." },
        { q: "Who will not succeed, in 28:37?", a: "The wrongdoers", wrong: ["The patient", "The poor", "The travelers"], why: "Verily, the wrongdoers will not be successful." },
        { tf: true, q: "Musa left the final judgment to Allah.", why: "My Lord knows best him who came with guidance from Him, and He will decide between me and you." }
      ]
    },
    {
      slug: "a-tower-of-clay",
      title: "A tower of clay",
      line: "Fir'awn claimed to be god and ordered a tall tower built.",
      facts: ["Haman baked the bricks", "He called Musa a liar"],
      quote: q28(38),
      source: ik(38, "Fir'awn said: I know of no god for you but me. He ordered his minister Haman to bake bricks of clay to build a towering palace so he could look at the God of Musa, mocking him as a liar.", "to make bricks in order to build"),
      difficulty: 3,
      questions: [
        { q: "What did Fir'awn claim, in 28:38?", a: "That he was their god", wrong: ["That he was a Prophet", "That he was poor", "That he was a servant"], why: "O chiefs! I know not that you have a god other than me." },
        { q: "What did he ask Haman to build?", a: "A tall tower", wrong: ["A ship", "A wall", "A temple"], why: "Set up for me a Sarh in order that I may look at the God of Musa." },
        { q: "What was the tower made from?", a: "Baked clay bricks", wrong: ["Gold", "Stone from Madyan", "Wood"], why: "So kindle for me a fire, O Haman, to bake clay." }
      ]
    },
    {
      slug: "arrogant-without-right",
      title: "Arrogant without right",
      line: "Fir'awn's armies were proud and denied the return to Allah.",
      facts: ["They denied the Resurrection", "Pride without right"],
      quote: q28(39),
      source: ik(39, "Fir'awn and his armies were arrogant in the land without right. They were oppressors who spread mischief, and they believed there would be no Resurrection.", "they believed that there would be no Resurrection"),
      difficulty: 4,
      questions: [
        { q: "How were Fir'awn and his armies, in 28:39?", a: "Arrogant without right", wrong: ["Humble and fair", "Weak and poor", "Kind to all"], why: "And he and his armies were arrogant in the land, without right." },
        { q: "What did they believe about returning to Allah?", a: "They would never return", wrong: ["They would return soon", "Only kings return", "They were unsure"], why: "They thought that they would never return to Us." },
        { tf: true, q: "Denying the Resurrection fed their pride.", why: "They were arrogant oppressors and they believed that there would be no Resurrection." }
      ]
    },
    {
      slug: "the-end-in-the-sea",
      title: "The end in the sea",
      line: "Allah seized Fir'awn's armies, and they drowned in the sea.",
      facts: ["In a single morning", "See the end of wrongdoers"],
      quote: q28(40),
      source: ik(40, "Allah seized Fir'awn and his armies and cast them into the sea. They were drowned in a single morning, and not one of them was left. So look at the end of the wrongdoers.", "We drowned them in the sea in a single morning"),
      difficulty: 4,
      questions: [
        { q: "Where did Fir'awn's armies end, in 28:40?", a: "In the sea", wrong: ["In the desert", "In Madyan", "In the palace"], why: "So, We seized him and his armies, and We threw them all into the sea." },
        { q: "How long did it take, per Ibn Kathir?", a: "A single morning", wrong: ["A year", "Forty days", "Seven nights"], why: "We drowned them in the sea in a single morning." },
        { tf: true, q: "Their end is a lesson about wrongdoing.", why: "So, behold what was the end of the wrongdoers." }
      ]
    },
    {
      slug: "leaders-the-wrong-way",
      title: "Leaders the wrong way",
      line: "Fir'awn's people lead all who copy their wrong path.",
      facts: ["No help on that Day", "Remembered with blame"],
      quote: q28(41),
      source: ik(41, "Allah made them leaders of the wrong path for those who follow their way, rejecting the Messengers. On the Day of Resurrection they will not be helped, and they are remembered with blame by the believers.", "for those who followed them and took the same path as they did"),
      difficulty: 5,
      questions: [
        { q: "Whom did they lead, per Ibn Kathir?", a: "Those who copy their path", wrong: ["The believers", "The Prophets", "No one"], why: "For those who followed them and took the same path as they did." },
        { q: "Will they be helped on that Day, in 28:41?", a: "No, they will not", wrong: ["Yes, by idols", "Yes, by armies", "Only Fir'awn"], why: "And on the Day of Resurrection, they will not be helped." },
        { tf: true, q: "Their example warns us not to follow wrong leaders.", why: "And We made them leaders inviting to the Fire for those who followed them." }
      ]
    },
    {
      slug: "the-tawrah-a-light",
      title: "The Tawrah, a light",
      line: "After Fir'awn, Allah gave Musa the Tawrah as light and mercy.",
      facts: ["Guidance from blindness", "So people might remember"],
      quote: q28(43),
      source: ik(43, "After destroying Fir'awn and his chiefs, Allah revealed the Tawrah to Musa as enlightenment, guidance and mercy: guidance from blindness and error, and a way to righteous deeds, so people may remember.", "guidance from blindness and error"),
      difficulty: 5,
      questions: [
        { q: "What did Allah give Musa, in 28:43?", a: "The Scripture", wrong: ["A kingdom", "A ship", "A garden"], why: "And indeed We gave Musa the Scripture." },
        { q: "What three things is the Tawrah called?", a: "Light, guidance and mercy", wrong: ["Law, war and tax", "Poems and songs", "Stories only"], why: "As an enlightenment for mankind, and a guidance and a mercy." },
        { q: "When was it given, in 28:43?", a: "After the old nations were destroyed", wrong: ["Before Musa was born", "In Madyan", "At his wedding"], why: "After We had destroyed the generations of old." }
      ]
    }
  ]
};

/** Ayahs 44 to 57: the Prophet ﷺ was not there yet tells the story, excuses of the deniers, believers of the earlier Book, and guidance is from Allah. */
const QASAS_FIVE: DeepUnit = {
  key: "qasas5",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-28",
  name: "Al-Qasas, ayahs 44 to 57",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Qasas",
  lessons: [
    {
      slug: "you-were-not-there",
      title: "You were not there",
      line: "The Prophet ﷺ told Musa's story though he was never there.",
      facts: ["He could not read books", "Allah revealed it to him"],
      quote: q28(44),
      source: ik(44, "The Prophet ﷺ told the stories of the past as if he saw them, though he could not read and grew up among people who knew nothing of them. He was not present at the mountain; Allah revealed it to him.", "you were not present then, but Allah has revealed this to you"),
      difficulty: 2,
      questions: [
        { q: "Was the Prophet ﷺ at the mountain with Musa?", a: "No, Allah revealed it", wrong: ["Yes, he saw it", "He read about it", "A traveler told him"], why: "And you were not among the witnesses, but Allah has revealed this to you." },
        { q: "How does this prove his prophethood?", a: "He told hidden past events", wrong: ["He was rich", "He was a king", "He wrote poems"], why: "He told others about matters of the past, as if he were seeing them, but he was an illiterate man." },
        { tf: true, q: "The Prophet ﷺ could not read books.", why: "But he was an illiterate man who could not read books." }
      ]
    },
    {
      slug: "a-mercy-from-your-lord",
      title: "A mercy from your Lord",
      line: "The Prophet ﷺ was sent as a mercy to people with no warner.",
      facts: ["No warner came before him", "So they may remember"],
      quote: q28(46),
      source: ik(46, "Allah revealed these stories to the Prophet ﷺ as a mercy from Him to him and to His servants, sending him to warn a people to whom no warner had come before, so they may be guided.", "a mercy from Him to you and to His servants"),
      difficulty: 2,
      questions: [
        { q: "Why was the Prophet ﷺ sent, in 28:46?", a: "As a mercy from his Lord", wrong: ["To gain wealth", "To rule Makkah", "To fight Rome"], why: "But you are sent as a mercy from your Lord." },
        { q: "Whom was he sent to warn?", a: "A people with no warner before", wrong: ["The angels", "Only Musa's people", "Only kings"], why: "To give warning to a people to whom no warner had come before you." },
        { tf: true, q: "The aim was that people would remember and be guided.", why: "In order that they may remember or receive admonition." }
      ]
    },
    {
      slug: "no-excuse-left",
      title: "No excuse left",
      line: "A Messenger came so no one could say: no one warned us.",
      facts: ["Proof before judgment", "Allah is fair"],
      quote: q28(47),
      source: ik(47, "Allah sent the Prophet ﷺ to establish proof and give them no excuse, so they could not say: our Lord, why did You not send us a Messenger?", "to give them no excuse"),
      difficulty: 3,
      questions: [
        { q: "What excuse would they make, in 28:47?", a: "No Messenger was sent", wrong: ["We were too busy", "We were too young", "We lived too far"], why: "Our Lord! Why did You not send us a Messenger?" },
        { q: "Why was the Messenger ﷺ sent, per Ibn Kathir?", a: "To leave them no excuse", wrong: ["To make them rich", "To build Makkah", "To end trade"], why: "We have sent you to them to establish proof against them, and to give them no excuse." },
        { tf: true, q: "Allah sends warners before holding people to account.", why: "Messengers as bearers of good news as well as warning in order that mankind should have no plea against Allah." }
      ]
    },
    {
      slug: "two-kinds-of-magic",
      title: "Two kinds of magic",
      line: "Deniers asked for Musa's signs, yet called both messages magic.",
      facts: ["Musa's signs were denied too", "Excuses, not reasons"],
      quote: q28(48),
      source: ik(48, "The deniers asked why the Prophet ﷺ was not given signs like Musa's, though people had rejected Musa's signs too. They called them two kinds of magic, each helping the other, which some said means Musa and Harun working together.", "working together and supporting one another"),
      difficulty: 3,
      questions: [
        { q: "What did deniers ask for, in 28:48?", a: "Signs like Musa's", wrong: ["Gold", "A king", "A garden"], why: "Why is he not given the like of what was given to Musa?" },
        { q: "Had Musa's signs convinced the deniers of old?", a: "No, they denied them", wrong: ["Yes, all believed", "Most believed", "They never saw them"], why: "Did they not disbelieve in that which was given to Musa of old?" },
        { q: "What did they call the two, in 28:48?", a: "Two kinds of magic", wrong: ["Two books of law", "Two poems", "Two kings"], why: "Two kinds of magic, each helping the other!" }
      ]
    },
    {
      slug: "bring-a-better-book",
      title: "Bring a better Book",
      line: "The Prophet ﷺ said: bring a Book better guiding than these two.",
      facts: ["The Tawrah and the Quran", "No better guide exists"],
      quote: q28(49),
      source: ik(49, "Ibn Abbas said the two are the Tawrah and the Quran. The Prophet ﷺ was told to say: bring a Book from Allah that is a better guide than these two, and I will follow it, if you are truthful.", "said that this refers to the Tawrah"),
      difficulty: 4,
      questions: [
        { q: "What were they challenged to bring, in 28:49?", a: "A better Book from Allah", wrong: ["More gold", "An army", "A poet"], why: "Then bring a Book from Allah, which is a better guide than these two." },
        { q: "Which two Books, per Ibn Abbas?", a: "The Tawrah and the Quran", wrong: ["Two poems", "Zabur and Injil", "Two letters"], why: "Ibn Abbas said that this refers to the Tawrah and the Quran." },
        { tf: true, q: "The Prophet ﷺ said he would follow a better Book if one existed.", why: "That I may follow it, if you are truthful." }
      ]
    },
    {
      slug: "following-desires",
      title: "Following desires",
      line: "Who is more astray than one following desires without guidance?",
      facts: ["Desires are no proof", "The Word was made clear"],
      quote: q28(50),
      source: ik(50, "If they cannot answer, they only follow their desires, with no basis or evidence. No one is more astray than one who follows desires with no guidance from the Book of Allah. Allah has made His Word clear to them so they may remember.", "with no guidance taken from the Book of Allah"),
      difficulty: 4,
      questions: [
        { q: "What do they follow, in 28:50?", a: "Their own desires", wrong: ["The Book", "Their Prophet", "Wise elders"], why: "Then know that they only follow their own lusts." },
        { q: "Who is most astray, in 28:50?", a: "One who follows desires without guidance", wrong: ["One who asks questions", "One who travels", "One who is poor"], why: "And who is more astray than one who follows his own lusts, without guidance from Allah?" },
        { tf: true, q: "Allah made His Word clear so people would remember.", why: "And indeed now We have conveyed the Word to them, in order that they may remember." }
      ]
    },
    {
      slug: "believers-of-the-earlier-book",
      title: "Believers of the earlier Book",
      line: "Sincere People of the Book heard the Quran and believed.",
      facts: ["Some wept and accepted Islam", "They believed in One God"],
      quote: q28(53),
      source: ik(53, "Pious scholars of the People of the Book believe in the Quran. When it is recited, they say: we believe, it is the truth from our Lord; even before it we were Muslims, believing in One God and obeying His commands.", "we believed in One God and were sincerely responding"),
      difficulty: 4,
      questions: [
        { q: "What do they say when it is recited, in 28:53?", a: "We believe, it is the truth", wrong: ["It is magic", "We will wait", "It is a poem"], why: "We believe in it. Verily, it is the truth from our Lord." },
        { q: "What were they even before the Quran?", a: "Muslims, believing in One God", wrong: ["Idol worshippers", "Kings", "Magicians"], why: "Even before the Quran came we were Muslims, we believed in One God." },
        { tf: true, q: "Some People of the Book wept on hearing the Quran.", why: "They began to weep, and they embraced Islam." }
      ]
    },
    {
      slug: "a-double-reward",
      title: "A double reward",
      line: "One who believed in his Prophet, then in ours ﷺ, gets double.",
      facts: ["Three get a double reward", "Patience in truth"],
      quote: q28(54),
      source: hadith("bukhari", "97", "Abu Musa al-Ash'ari", "Sahih", "The Prophet ﷺ said: three people will have a double reward, among them a person of the earlier Scriptures who believed in his Prophet and then believed in the Prophet Muhammad ﷺ.", "Three persons will have a double reward"),
      difficulty: 5,
      questions: [
        { q: "How many people get a double reward in the hadith?", a: "Three", wrong: ["Two", "Seven", "Ten"], why: "Three persons will have a double reward." },
        { q: "Who is one of them?", a: "A believer of the earlier Scripture who then accepted Islam", wrong: ["A rich trader", "A strong soldier", "A famous poet"], why: "A person from the people of the scriptures who believed in his prophet and then believed in Muhammad ﷺ." },
        { q: "Why are they rewarded twice, in 28:54?", a: "Because they were patient", wrong: ["Because they were rich", "Because they were first", "Because they were loud"], why: "These will be given their reward twice over, because they are patient." }
      ]
    },
    {
      slug: "repel-evil-with-good",
      title: "Repel evil with good",
      line: "Believers answer bad with good and give from what they have.",
      facts: ["They forgive and overlook", "They give charity"],
      quote: q28(54),
      source: ik(54, "They repel evil with good: they do not respond to evil in kind, but forgive and overlook. And they spend from their lawful provision on family and relatives, pay Zakah and give charity.", "they do not respond to evil in kind, rather they forgive and overlook"),
      difficulty: 5,
      questions: [
        { q: "How do they answer evil, in 28:54?", a: "With good", wrong: ["With more evil", "With silence forever", "With revenge"], why: "And repel evil with good." },
        { q: "What does repelling evil mean, per Ibn Kathir?", a: "Forgiving and overlooking", wrong: ["Shouting back", "Running away", "Taking revenge"], why: "They do not respond to evil in kind, rather they forgive and overlook." },
        { tf: true, q: "They spend from what Allah gave them.", why: "And spend out of what We have provided for them." }
      ]
    },
    {
      slug: "peace-be-to-you",
      title: "Peace be to you",
      line: "When they hear useless talk, they turn away and say: peace.",
      facts: ["To us our deeds", "We do not seek the ignorant"],
      quote: q28(55),
      source: ik(55, "When they hear evil or useless talk, they turn away and do not join those who indulge in it. They say: to us our deeds and to you yours; peace be to you; we do not seek the way of the ignorant.", "they do not mix with the people who indulge in such talk"),
      difficulty: 5,
      questions: [
        { q: "What do they do with vain talk, in 28:55?", a: "Turn away from it", wrong: ["Join in", "Spread it", "Laugh at it"], why: "And when they hear evil vain talk, they withdraw from it." },
        { q: "What do they say, in 28:55?", a: "Peace be to you", wrong: ["Go away now", "You will pay", "Say it again"], why: "To us our deeds, and to you your deeds. Peace be to you." },
        { tf: false, q: "Believers sit with those who indulge in bad talk.", why: "They do not mix with the people who indulge in such talk." }
      ]
    },
    {
      slug: "guidance-is-from-allah",
      title: "Guidance is from Allah",
      line: "Even the Prophet ﷺ cannot guide whom he loves; Allah guides.",
      facts: ["Our job is to convey", "Allah knows who is guided"],
      quote: q28(56),
      source: ik(56, "Allah told His Messenger ﷺ: you cannot guide whom you love, but Allah guides whom He wills. The matter does not rest with you; you only convey the Message. Ibn Kathir says it was revealed about his loving uncle Abu Talib.", "all that you have to do is convey the Message"),
      difficulty: 4,
      questions: [
        { q: "Who guides hearts, in 28:56?", a: "Allah", wrong: ["The Prophet ﷺ alone", "Parents", "Teachers"], why: "Verily, you guide not whom you like, but Allah guides whom He wills." },
        { q: "What is our duty, per Ibn Kathir?", a: "To convey the Message", wrong: ["To force belief", "To stay silent", "To judge hearts"], why: "All that you have to do is convey the Message, and Allah will guide whom He wills." },
        { q: "About whom was 28:56 revealed?", a: "Abu Talib, the Prophet's ﷺ uncle", wrong: ["Abu Bakr", "Umar", "Hamzah"], why: "This Ayah was revealed concerning Abu Talib, the paternal uncle of the Messenger of Allah ﷺ." }
      ]
    },
    {
      slug: "two-kinds-of-guidance",
      title: "Two kinds of guidance",
      line: "The Prophet ﷺ shows the way; only Allah puts faith in hearts.",
      facts: ["As-Sa'di explains", "Hidayah"],
      quote: q28(56),
      source: saadi(28, 56, "As-Sa'di says there are two kinds of guidance: showing and explaining the way, which the Prophet ﷺ did, and putting faith into hearts, which only Allah can do; had he ﷺ been able, he would have guided his uncle Abu Talib.", "فتلك هداية البيان والإرشاد"),
      difficulty: 2,
      questions: [
        { q: "Which guidance did the Prophet ﷺ give, per as-Sa'di?", a: "Showing and explaining the way", wrong: ["Putting faith in hearts", "None at all", "Only to his family"], why: "His was the guidance of explaining and directing, says as-Sa'di." },
        { q: "Who alone puts faith into hearts, per as-Sa'di on 28:56?", a: "Allah", wrong: ["Parents", "Teachers", "Kings"], why: "Creating faith in the heart is in Allah's hand alone." },
        { tf: true, q: "The Prophet ﷺ gave his uncle Abu Talib the best advice of all.", why: "As-Sa'di on 28:56." }
      ]
    },
    {
      slug: "a-secure-sanctuary",
      title: "A secure sanctuary",
      line: "They feared losing their land, but Allah kept Makkah safe.",
      facts: ["Fruits come from all regions", "Their excuse was false"],
      quote: q28(57),
      source: ik(57, "Some said: if we follow you, we will be snatched from our land. Allah answered: have We not made for them a secure sanctuary, to which fruits of every kind are brought from Taif and elsewhere?", "all kinds of fruits from the surrounding regions"),
      difficulty: 5,
      questions: [
        { q: "What did they fear, in 28:57?", a: "Being snatched from their land", wrong: ["Rain", "Wild animals", "The sea"], why: "If we follow the guidance with you, we would be snatched away from our land." },
        { q: "What had Allah made for them?", a: "A secure sanctuary", wrong: ["A great army", "A wall of iron", "A river of gold"], why: "Have We not established for them a secure sanctuary?" },
        { q: "What was brought to it?", a: "Fruits of every kind", wrong: ["Only water", "Only stones", "Nothing"], why: "To which are brought fruits of all kinds, a provision from Ourselves." }
      ]
    }
  ]
};

/** Ayahs 58 to 75: thankless towns, what lasts with Allah, the questions on the Day, Allah chooses, and night and day as mercy. */
const QASAS_SIX: DeepUnit = {
  key: "qasas6",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-28",
  name: "Al-Qasas, ayahs 58 to 75",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Qasas",
  lessons: [
    {
      slug: "thankless-towns",
      title: "Thankless towns",
      line: "Towns that were ungrateful for their ease were left empty.",
      facts: ["They denied Allah's blessings", "Only ruins remained"],
      quote: q28(58),
      source: ik(58, "Many towns that were ungrateful for their good living were destroyed. They were arrogant and denied Allah's blessing. Their land became empty and desolate, with only their dwellings left.", "Their land became empty and desolate"),
      difficulty: 2,
      questions: [
        { q: "What were those towns, in 28:58?", a: "Thankless for their living", wrong: ["Grateful", "Poor and humble", "Far away"], why: "And how many a town have We destroyed, which was thankless for its means of livelihood!" },
        { q: "What happened to their land?", a: "It became empty", wrong: ["It grew richer", "It became a city", "It moved"], why: "Their land became empty and desolate." },
        { tf: true, q: "Ingratitude for blessings is a serious danger.", why: "They were arrogant transgressors who denied Allah's blessing of giving them ample provision." }
      ]
    },
    {
      slug: "never-without-a-messenger",
      title: "Never without a Messenger",
      line: "Allah never destroys a town before sending a Messenger.",
      facts: ["Allah is never unjust", "Sent from the Mother of Towns"],
      quote: q28(59),
      source: ik(59, "Allah is just and does not destroy anyone unjustly. He destroys only after proof is established, sending a Messenger to their mother town. The Prophet ﷺ was sent from Makkah, the Mother of Towns, to all people.", "He does not destroy anyone unjustly"),
      difficulty: 2,
      questions: [
        { q: "What comes before any town is destroyed, in 28:59?", a: "A Messenger is sent", wrong: ["Nothing", "A storm", "A famine"], why: "Never will your Lord destroy the towns until He sends to their mother town a Messenger." },
        { q: "Which town is the Mother of Towns?", a: "Makkah", wrong: ["Madyan", "Egypt", "Saba"], why: "Until He sends to their mother town, meaning Makkah." },
        { tf: true, q: "Allah does not destroy anyone unjustly.", why: "He does not destroy anyone unjustly; He destroys after establishing proof." }
      ]
    },
    {
      slug: "what-allah-has-lasts",
      title: "What Allah has lasts",
      line: "This world is brief; what is with Allah is better and lasts.",
      facts: ["A finger dipped in the sea", "Use your sense"],
      quote: q28(60),
      source: ik(60, "Whatever we are given is the passing joy of this world; what is with Allah is better and lasting. The Prophet ﷺ said this world compared to the Hereafter is like a finger dipped in the sea: see what it brings back.", "as if one of you were to dip his finger in the sea"),
      difficulty: 3,
      questions: [
        { q: "What is better, in 28:60?", a: "What is with Allah", wrong: ["Gold", "Fame", "Big houses"], why: "And that which is with Allah is better and will remain forever." },
        { q: "What did the Prophet ﷺ compare this world to?", a: "Water on a finger from the sea", wrong: ["A mountain", "A long river", "A big feast"], why: "As if one of you were to dip his finger in the sea; let him see what comes back to him." },
        { tf: true, q: "Preferring this world over the Hereafter lacks sense.", why: "Have you then no sense? Do those who prefer this world to the Hereafter have no sense?" }
      ]
    },
    {
      slug: "not-the-same",
      title: "Not the same",
      line: "One promised great reward is unlike one with brief joys.",
      facts: ["A promise that comes true", "A few days of joy"],
      quote: q28(61),
      source: ik(61, "Is the one who believes in Allah's promise of reward for good deeds, which he will surely receive, like one who disbelieves and only enjoys a few days in this life, then is brought to account?", "Is the one who believes in the reward which Allah has promised"),
      difficulty: 3,
      questions: [
        { q: "What does the believer have, in 28:61?", a: "An excellent promise", wrong: ["Only luxuries", "Nothing", "A small reward"], why: "Is he whom We have promised an excellent promise, which he will find true." },
        { q: "How long does the other enjoy, per Ibn Kathir?", a: "A few days", wrong: ["Forever", "A thousand years", "No time"], why: "He is only enjoying a few days in this life." },
        { tf: false, q: "Both kinds of people end up the same.", why: "Is he whom We have promised an excellent promise like him whom We have made to enjoy the luxuries of the life of the world?" }
      ]
    },
    {
      slug: "where-are-the-partners",
      title: "Where are the partners?",
      line: "On that Day, false gods will not answer those who called them.",
      facts: ["Leaders deny their followers", "False hopes vanish"],
      quote: q28(62),
      source: ik(62, "On the Day of Resurrection, Allah will ask those who worshipped others: where are the partners you claimed? Can they help you? Those who misled them will disown them, and when called, the false gods will not answer.", "where are the gods which you used to worship in the world"),
      difficulty: 3,
      questions: [
        { q: "What will Allah ask, in 28:62?", a: "Where are My so-called partners?", wrong: ["Where is your gold?", "Where is your home?", "Who is your king?"], why: "Where are My (so-called) partners whom you used to assert?" },
        { q: "Will the false gods answer, in 28:64?", a: "No, they will not", wrong: ["Yes, quickly", "Only some", "After a year"], why: "They will call upon them, but they will give no answer to them." },
        { q: "What will those who misled others say, in 28:63?", a: "It was not us they worshipped", wrong: ["We are their gods", "We will save them", "We did nothing"], why: "We declare our innocence before You. It was not us they worshipped." }
      ]
    },
    {
      slug: "what-answer-did-you-give",
      title: "What answer did you give?",
      line: "All will be asked how they answered the Messengers.",
      facts: ["Like the questions in the grave", "Repent now and succeed"],
      quote: q28(65),
      source: ik(65, "Allah will ask: what answer did you give the Messengers? It is like the questions in the grave: who is your Lord, who is your Prophet, what is your religion. Whoever repented, believed and did good will be among the successful.", "What was your response to the Messengers who were sent to you"),
      difficulty: 4,
      questions: [
        { q: "What will people be asked, in 28:65?", a: "How they answered the Messengers", wrong: ["How rich they were", "Where they lived", "What they ate"], why: "What answer gave you to the Messengers?" },
        { q: "Which questions is it compared to?", a: "The questions in the grave", wrong: ["School exams", "Market prices", "Travel questions"], why: "This is like the questions which will be asked of a person in his grave: who is your Lord? who is your Prophet?" },
        { q: "Who will be successful, in 28:67?", a: "Who repented, believed and did good", wrong: ["Who hid away", "Who was famous", "Who was strongest"], why: "But as for him who repented, believed, and did righteous deeds, then perhaps he will be among those who are successful." }
      ]
    },
    {
      slug: "allah-creates-and-chooses",
      title: "Allah creates and chooses",
      line: "Allah creates what He wills and chooses; the choice is His.",
      facts: ["What He wills happens", "He knows what hearts hide"],
      quote: q28(68),
      source: ik(68, "Allah alone creates and decides; none can dispute or reverse His judgement. Whatever He wills happens, and what He does not will does not happen. He knows what hearts hide and what they show.", "whatever He wills, for what He wills, happens"),
      difficulty: 4,
      questions: [
        { q: "Who creates and chooses, in 28:68?", a: "Your Lord", wrong: ["The people", "The kings", "The idols"], why: "And your Lord creates whatsoever He wills and chooses." },
        { q: "What happens to what Allah wills?", a: "It happens", wrong: ["It may fail", "It is delayed forever", "It needs help"], why: "Whatever He wills, for what He wills, happens; and what He does not will, does not happen." },
        { tf: true, q: "Allah knows what hearts hide and what they show.", why: "And your Lord knows what their breasts conceal, and what they reveal." }
      ]
    },
    {
      slug: "his-is-the-praise",
      title: "His is the praise",
      line: "Allah is praised first and last, and to Him we all return.",
      facts: ["La ilaha illa Huwa", "His decision stands"],
      quote: q28(70),
      source: ik(70, "He is Allah; none is worthy of worship but Him. He is praised in all He does for His justice and wisdom, in this life and the next. His is the decision none can reverse, and to Him all return.", "He is to be praised for His justice and wisdom"),
      difficulty: 4,
      questions: [
        { q: "Why is Allah praised in all He does?", a: "His justice and wisdom", wrong: ["His wealth", "His armies", "His palace"], why: "In all that He does, He is to be praised for His justice and wisdom." },
        { q: "To whom will we return, in 28:70?", a: "To Allah", wrong: ["To the earth only", "To our fathers", "To no one"], why: "And to Him shall you be returned." },
        { tf: true, q: "None can reverse Allah's decision.", why: "His is the decision, that none can put back." }
      ]
    },
    {
      slug: "night-and-day-a-mercy",
      title: "Night and day, a mercy",
      line: "If night never ended, only Allah could bring the day.",
      facts: ["Night to rest", "Day to seek His bounty"],
      quote: q28(73),
      source: ik(73, "If Allah made the night or the day last until the Resurrection, it would harm us, and no god but Allah could bring the other. By His mercy we rest at night and work by day, and whoever misses worship at night can make it up by day.", "Whoever misses something during the night can make it up during the day"),
      difficulty: 5,
      questions: [
        { q: "Who could bring light if night never ended, in 28:71?", a: "Only Allah", wrong: ["The kings", "The stars", "The people"], why: "Which god besides Allah could bring you light?" },
        { q: "What is the night for, in 28:73?", a: "To rest", wrong: ["To trade", "To travel", "To farm"], why: "That you may rest therein." },
        { q: "What if you miss worship at night?", a: "Make it up in the day", wrong: ["It is lost forever", "Wait a year", "Nothing can be done"], why: "Whoever misses something during the night can make it up during the day, and vice versa." }
      ]
    },
    {
      slug: "a-witness-from-every-nation",
      title: "A witness from every nation",
      line: "A witness from every nation is brought, and false claims vanish.",
      facts: ["The witness is a Messenger", "The truth is with Allah"],
      quote: q28(75),
      source: ik(75, "Allah will bring out a witness from every nation; Mujahid said this means a Messenger. Those who claimed partners will be asked for their proof, will know the truth is with Allah, and their lies will vanish.", "This means a Messenger"),
      difficulty: 5,
      questions: [
        { q: "Who is the witness, per Mujahid?", a: "A Messenger", wrong: ["A king", "An angel only", "A poet"], why: "And We shall take out from every nation a witness. Mujahid said: this means a Messenger." },
        { q: "What will they be asked to bring, in 28:75?", a: "Their proof", wrong: ["Their wealth", "Their children", "Their books of poems"], why: "And We shall say: Bring your proof." },
        { tf: true, q: "Their invented lies will vanish that Day.", why: "And the lies which they invented will disappear from them." }
      ]
    }
  ]
};

/** Ayahs 76 to 88: Qarun's treasure and pride, the advice he refused, the earth swallowing him, the home of the Hereafter, and everything perishes but Allah. */
const QASAS_SEVEN: DeepUnit = {
  key: "qasas7",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-28",
  name: "Al-Qasas, ayahs 76 to 88",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Qasas",
  lessons: [
    {
      slug: "qarun-and-his-treasure",
      title: "Qarun and his treasure",
      line: "Qarun had so much treasure that its keys tired strong men.",
      facts: ["He was of Musa's people", "His keys were a heavy load"],
      quote: q28(76),
      source: ik(76, "Qarun was of Musa's people; many scholars said he was Musa's cousin. Allah gave him so much treasure that its keys were a burden for a group of strong men. Groups of strong men would not have been able to carry them.", "Groups of strong men would not have been able to carry them"),
      difficulty: 2,
      questions: [
        { q: "Whose people was Qarun from, in 28:76?", a: "Musa's people", wrong: ["Fir'awn's family", "The people of Saba", "Madyan"], why: "Verily, Qarun was of Musa's people." },
        { q: "How was he related to Musa, per scholars?", a: "His cousin", wrong: ["His brother", "His father", "No relation"], why: "They all said that he was the cousin of Musa, peace be upon him." },
        { q: "What was heavy for strong men?", a: "The keys to his treasures", wrong: ["His crown", "His sword", "His throne"], why: "That of which the keys would have been a burden to a body of strong men." }
      ]
    },
    {
      slug: "do-not-exult",
      title: "Do not be boastful",
      line: "Good people told Qarun: do not boast, Allah dislikes it.",
      facts: ["Sincere advice", "Thank Allah for wealth"],
      quote: q28(76),
      source: ik(76, "The righteous among his people advised him: do not exult, meaning do not be arrogant and proud of your wealth; Allah does not like those who gloat and do not thank Him for what He gave them.", "do not be arrogant and proud of your wealth"),
      difficulty: 2,
      questions: [
        { q: "What did his people tell him, in 28:76?", a: "Do not exult", wrong: ["Spend it all", "Hide it", "Give it to Fir'awn"], why: "Do not exult. Verily, Allah likes not those who exult." },
        { q: "What does exult mean in 28:76, per Ibn Kathir?", a: "Being proud of wealth", wrong: ["Being generous", "Being shy", "Being tired"], why: "Do not be arrogant and proud of your wealth." },
        { tf: true, q: "Allah does not like those who boast.", why: "Verily, Allah likes not those who exult." }
      ]
    },
    {
      slug: "your-share-of-this-world",
      title: "Your share of this world",
      line: "Seek the Hereafter with wealth, yet keep your lawful share.",
      facts: ["Give each right its due", "Lawful joys are allowed"],
      quote: q28(77),
      source: ik(77, "Use your wealth to draw closer to Allah, and do not forget your lawful share of this world: food, drink, clothing and home. Your Lord, yourself, your family and your guests each have rights over you, so give each of them their due.", "So give each of them their due"),
      difficulty: 3,
      questions: [
        { q: "What should wealth be used to seek, in 28:77?", a: "The home of the Hereafter", wrong: ["More fame", "Power over others", "Nothing"], why: "But seek, with that which Allah has bestowed on you, the home of the Hereafter." },
        { q: "What should not be forgotten, in 28:77?", a: "Your lawful share of this world", wrong: ["Your enemies", "Your old debts", "Your idols"], why: "And forget not your portion of lawful enjoyment in this world." },
        { tf: true, q: "Our family and guests have rights over us.", why: "Your family has rights over you, and your visitors have rights over you. So give each of them their due." }
      ]
    },
    {
      slug: "be-generous-as-allah-was",
      title: "Be generous as Allah was",
      line: "Be good to others as Allah has been good to you.",
      facts: ["Do not spread mischief", "Allah dislikes corruption"],
      quote: q28(77),
      source: ik(77, "Be generous to His creatures as He has been generous to you, and do not aim to spread corruption on earth or harm Allah's creation. Allah does not like the mischief-makers.", "Be generous to His creatures, as He has been generous to you"),
      difficulty: 3,
      questions: [
        { q: "How should we treat others, in 28:77?", a: "Generously, as Allah is to us", wrong: ["Harshly", "Only if paid", "Ignore them"], why: "And be generous as Allah has been generous to you." },
        { q: "Whom does Allah not like, in 28:77?", a: "The mischief-makers", wrong: ["The poor", "The travelers", "The quiet"], why: "Verily, Allah likes not the mischief-makers." },
        { tf: false, q: "Wealth is a reason to harm others.", why: "Do not let your aim be to spread corruption on earth and do harm to Allah's creation." }
      ]
    },
    {
      slug: "because-of-my-knowledge",
      title: "Because of my knowledge",
      line: "Qarun said his wealth came from his own knowledge and merit.",
      facts: ["He refused the advice", "Stronger people were destroyed before"],
      quote: q28(78),
      source: ik(78, "Qarun answered: I was given this only because of my knowledge. He meant: Allah gave me this wealth because He knows I deserve it. Yet Allah had destroyed people before him who were stronger and richer.", "Allah has only given me this wealth because He knows that I deserve it"),
      difficulty: 4,
      questions: [
        { q: "What did Qarun claim, in 28:78?", a: "He earned it by his knowledge", wrong: ["Allah gave it as a test", "He found it", "He stole it"], why: "This has been given to me only because of the knowledge I possess." },
        { q: "What did he think it proved?", a: "That he deserved it", wrong: ["That he must share", "That he was poor", "Nothing"], why: "Allah has only given me this wealth because He knows that I deserve it." },
        { tf: true, q: "Allah destroyed people stronger and richer than Qarun before him.", why: "Allah had destroyed before him generations, men who were stronger than him in might and greater in the amount they had collected." }
      ]
    },
    {
      slug: "qarun-shows-off",
      title: "Qarun shows off",
      line: "Qarun paraded his riches, and some wished they had the same.",
      facts: ["Wishing for this world", "Allah's reward is better"],
      quote: q28(79),
      source: ik(79, "Qarun went out before his people in his finery, with fine clothes, horses and servants. Those who loved this world wished for the same, saying he is very lucky. The people of knowledge said Allah's reward is better.", "he is very lucky and has a great share in this world"),
      difficulty: 4,
      questions: [
        { q: "How did Qarun go out, in 28:79?", a: "In his finery", wrong: ["In rags", "In secret", "At night"], why: "So, he went forth before his people in his finery." },
        { q: "What did worldly people wish?", a: "To have what Qarun had", wrong: ["To leave town", "To be poor", "To become scholars"], why: "Ah, would that we had the like of what Qarun has been given!" },
        { q: "What did the people of knowledge say, in 28:80?", a: "Allah's reward is better", wrong: ["Qarun is right", "Get rich fast", "Nothing"], why: "The reward of Allah is better for those who believe and do righteous deeds." }
      ]
    },
    {
      slug: "only-the-patient",
      title: "Only the patient",
      line: "Allah's reward is better, and only the patient reach it.",
      facts: ["No eye has seen it", "Patience in leaving worldly love"],
      quote: q28(80),
      source: ik(80, "Allah's reward for believers who do good is better than what they saw. Allah prepared for His righteous servants what no eye has seen. As-Suddi said none will reach Paradise except the patient.", "None shall reach Paradise except for the patient"),
      difficulty: 4,
      questions: [
        { q: "Who will attain it, in 28:80?", a: "The patient", wrong: ["The richest", "The fastest", "The loudest"], why: "And this none shall attain except the patient." },
        { q: "What has Allah prepared, per the hadith Ibn Kathir quotes?", a: "What no eye has seen", wrong: ["A small garden", "Gold coins", "A palace on earth"], why: "Allah has prepared for His righteous servants what no eye has seen, no ear has heard." },
        { tf: true, q: "As-Suddi said only the patient reach Paradise.", why: "As-Suddi said: None shall reach Paradise except for the patient." }
      ]
    },
    {
      slug: "the-earth-took-him",
      title: "The earth took him",
      line: "The earth swallowed Qarun and his home; no one could help him.",
      facts: ["Wealth could not save him", "Pride ends badly"],
      quote: q28(81),
      source: ik(81, "Allah caused the earth to swallow Qarun and his home. His wealth, group, servants and followers were of no use to him; they could not protect him, nor could he save himself.", "his wealth, group, servants and retinue were of no avail to him"),
      difficulty: 4,
      questions: [
        { q: "What happened to Qarun, in 28:81?", a: "The earth swallowed him", wrong: ["He became king", "He moved away", "He gave it all away"], why: "So, We caused the earth to swallow him and his dwelling place." },
        { q: "Could his wealth save him?", a: "No, it could not", wrong: ["Yes, fully", "Half of it could", "His servants did"], why: "His wealth, group, servants and retinue were of no avail to him." },
        { tf: true, q: "No group could help him against Allah.", why: "Then he had no group to help him against Allah." }
      ]
    },
    {
      slug: "walking-with-pride",
      title: "Walking with pride",
      line: "The Prophet ﷺ told of a proud man the earth swallowed.",
      facts: ["Pride in clothing", "Humility is safer"],
      quote: q28(81),
      source: hadith("bukhari", "3485", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ said: while a man was walking, dragging his garment out of pride, the earth swallowed him, and he will keep sinking in it until the Day of Resurrection.", "dragging his dress with pride"),
      difficulty: 5,
      questions: [
        { q: "What was the man in the hadith doing?", a: "Dragging his garment with pride", wrong: ["Giving charity", "Praying", "Helping a neighbor"], why: "While a man was walking, dragging his dress with pride." },
        { q: "What happened to him?", a: "The earth swallowed him", wrong: ["He became rich", "He was praised", "Nothing"], why: "He was caused to be swallowed by the earth." },
        { q: "Who narrated the hadith of the proud walker?", a: "Abdullah ibn Umar", wrong: ["Aisha", "Abu Hurairah", "Anas"], why: "Narrated Ibn Umar: The Prophet ﷺ said." }
      ]
    },
    {
      slug: "wealth-is-not-a-sign-of-love",
      title: "Wealth is not a sign of love",
      line: "Those who envied Qarun learned wealth does not prove love.",
      facts: ["Allah gives and holds back", "Thank Him for His grace"],
      quote: q28(82),
      source: ik(82, "Those who had wished for his place said: Allah expands provision for whom He wills and restricts it. Wealth does not show that Allah is pleased with its owner. Had Allah not been gracious, we too could have been swallowed.", "Wealth does not indicate that Allah is pleased with its owner"),
      difficulty: 5,
      questions: [
        { q: "Who changed their minds, in 28:82?", a: "Those who envied Qarun", wrong: ["Qarun himself", "Fir'awn", "The scholars"], why: "And those who desired his position the day before, began to say." },
        { q: "Does wealth prove Allah is pleased?", a: "No, it does not", wrong: ["Yes, always", "Only gold does", "Only for kings"], why: "Wealth does not indicate that Allah is pleased with its owner." },
        { tf: true, q: "Allah gives provision to whom He wills and holds it back.", why: "It is Allah Who expands the provision or restricts it to whomsoever He pleases." }
      ]
    },
    {
      slug: "home-for-the-humble",
      title: "A home for the humble",
      line: "The Hereafter is for those who seek no pride or corruption.",
      facts: ["The good end is for Taqwa", "Showing off is blamed"],
      quote: q28(83),
      source: ik(83, "Allah made the home of the Hereafter for humble believers who do not seek to rise above others or spread corruption. If a person's aim is to show off and look better than others, that is blamed.", "if his intention is to show off and appear better than others"),
      difficulty: 5,
      questions: [
        { q: "For whom is the home of the Hereafter, in 28:83?", a: "Those who seek no pride or corruption", wrong: ["The famous", "The rich", "The strong"], why: "We shall assign to those who do not want to exalt themselves in the land nor cause corruption." },
        { q: "Whose is the good end, in 28:83?", a: "Those with Taqwa", wrong: ["Those with gold", "Those with armies", "Everyone"], why: "And the good end is for those who have Taqwa." },
        { q: "When is wanting to look good blamed?", a: "When it is to show off", wrong: ["Always", "Never", "Only on Fridays"], why: "If his intention is to show off and appear better than others, then that is to be condemned." }
      ]
    },
    {
      slug: "allah-loves-beauty",
      title: "Allah loves beauty",
      line: "Liking nice clothes is not pride; scorning people is.",
      facts: ["Allah is beautiful", "Pride is looking down on people"],
      quote: q28(83),
      source: hadith("muslim", "91", "Abdullah ibn Mas'ud", "Sahih", "A man asked if liking fine clothes and shoes is pride. The Prophet ﷺ said: Allah is beautiful and loves beauty. Pride is rejecting the truth and looking down on people.", "Allah is Graceful and He loves Grace"),
      difficulty: 5,
      questions: [
        { q: "Is liking fine clothes pride?", a: "No, Allah loves beauty", wrong: ["Yes, always", "Only shoes", "Only on Eid"], why: "Verily, Allah is Graceful and He loves Grace." },
        { q: "What is pride, per the Prophet ﷺ?", a: "Rejecting truth and scorning people", wrong: ["Wearing clean clothes", "Being happy", "Being strong"], why: "Pride is disdaining the truth and contempt for the people." },
        { tf: true, q: "Looking down on people is real pride.", why: "Pride is disdaining the truth and contempt for the people." }
      ]
    },
    {
      slug: "better-than-the-deed",
      title: "Better than the deed",
      line: "Good deeds earn more than their worth; bad ones only equal.",
      facts: ["Generosity for good", "Justice for bad"],
      quote: q28(84),
      source: ik(84, "Whoever brings good will have better than it: Allah's reward is greater than the deed, multiplied many times. Whoever brings evil is repaid only for what he did. This is generosity and justice.", "the reward of Allah is better than the good deeds of His servant"),
      difficulty: 4,
      questions: [
        { q: "What does a good deed earn, in 28:84?", a: "Better than it", wrong: ["Exactly the same", "Less than it", "Nothing"], why: "Whosoever brings good, he shall have the better thereof." },
        { q: "How are bad deeds repaid, in 28:84?", a: "Only for what was done", wrong: ["Ten times over", "Not at all ever", "Twice"], why: "Those who do evil deeds will only be requited for what they used to do." },
        { tf: true, q: "Ibn Kathir calls this generosity and justice.", why: "This is the position of generosity and justice." }
      ]
    },
    {
      slug: "back-to-the-return",
      title: "Back to the return",
      line: "Allah promised to bring the Prophet ﷺ back to Makkah.",
      facts: ["He left Makkah, then returned", "A mercy unexpected"],
      quote: q28(85),
      source: ik(85, "He Who gave you the Quran will surely bring you back to the return. Ibn Abbas, in Al-Bukhari, said: to Makkah. Mujahid said: back to your place of birth in Makkah.", "Back to your place of birth in Makkah"),
      difficulty: 5,
      questions: [
        { q: "Where is the return, per Mujahid?", a: "To Makkah", wrong: ["To Madyan", "To Egypt", "To Yemen"], why: "Mujahid said: Back to your place of birth in Makkah." },
        { q: "Did the Prophet ﷺ expect revelation before it came?", a: "No, it was a mercy", wrong: ["Yes, always", "He asked for it", "He bought it"], why: "And you were not expecting that the Book would be sent down to you, but it is a mercy from your Lord." },
        { tf: true, q: "The Quran is a mercy from Allah.", why: "But it is a mercy from your Lord." }
      ]
    },
    {
      slug: "all-perishes-but-allah",
      title: "All perishes but Allah",
      line: "Call on no god but Allah; everything perishes except Him.",
      facts: ["His is the decision", "To Him we return"],
      quote: q28(88),
      source: ik(88, "Do not call on any other god with Allah; none is worthy of worship but Him. Everything will perish except Him. His is the decision and dominion; none can reverse His judgement, and to Him you will return.", "there is none who can reverse His judgement or decision"),
      difficulty: 5,
      questions: [
        { q: "What will perish, in 28:88?", a: "Everything except Allah", wrong: ["Only mountains", "Only people", "Nothing"], why: "Everything will perish save His Face, meaning, everything except Him." },
        { q: "Can anyone reverse Allah's decision?", a: "No one", wrong: ["Kings can", "Angels can", "Many people"], why: "There is none who can reverse His judgement or decision." },
        { tf: true, q: "Al-Qasas ends: to Him you shall be returned.", why: "His is the decision, and to Him you shall be returned." }
      ]
    }
  ]
};

export const QASAS_UNITS: readonly DeepUnit[] = [QASAS_ONE, QASAS_TWO, QASAS_THREE, QASAS_FOUR, QASAS_FIVE, QASAS_SIX, QASAS_SEVEN];
