import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Al-Qalam ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Qalam 68:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_68_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Qalam 68:${ayah}`,
    url: `https://quran.com/68:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 68:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q68 = (ayah: number) => quranQuote(68, ayah);

/** Ayahs 1 to 7: the pen and writing, the Prophet's ﷺ reward without end, and his exalted character. */
const QALAM_ONE: DeepUnit = {
  key: "qalam1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-68",
  name: "Al-Qalam, ayahs 1 to 7",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Qalam",
  lessons: [
    {
      slug: "by-the-pen",
      title: "By the pen",
      line: "Allah swears by the pen, the pen people use to write.",
      facts: ["Al-Qalam: the pen", "Nun is a letter"],
      quote: q68(1),
      source: ik(1, "Ibn Kathir says the apparent meaning of the pen is the actual pen used for writing, as in 96:4.", "this refers to the actual pen that is used to write"),
      difficulty: 1,
      questions: [
        { q: "By what does Allah swear in 68:1?", a: "The pen", wrong: ["The sun", "The fig", "The night"], why: "Nun. By the pen and by what they write." },
        { q: "Which pen is meant, per Ibn Kathir?", a: "The pen used to write", wrong: ["A magic pen", "A pen for drawing only", "No pen at all"], why: "The apparent meaning is that this refers to the actual pen that is used to write." },
        { tf: true, q: "Nun is one of the single letters that open some surahs.", why: "Nun is like Sad and Qaf, the individual letters that appear at the beginning of chapters." }
      ]
    },
    {
      slug: "gift-of-writing",
      title: "The gift of writing",
      line: "Allah taught us to write, and writing brings knowledge.",
      facts: ["Writing preserves knowledge", "A favor from Allah"],
      quote: q68(1),
      source: ik(1, "Ibn Kathir says by swearing by the pen, Allah reminds His creatures how He favored them by teaching them to write, through which knowledge is gained.", "by teaching them the skill of writing, through which knowledge is attained"),
      difficulty: 2,
      questions: [
        { q: "What favor does the pen remind us of?", a: "Teaching us to write", wrong: ["Teaching us to swim", "Giving us gold", "Making us tall"], why: "Alerting His creatures to what He has favored them with by teaching them the skill of writing." },
        { q: "What is gained through writing?", a: "Knowledge", wrong: ["Sleep", "Wealth only", "Nothing"], why: "The skill of writing, through which knowledge is attained." },
        { tf: false, q: "Islam does not value writing or learning.", why: "Allah swears by the pen, alerting His creatures to the favor of writing, through which knowledge is attained." }
      ]
    },
    {
      slug: "what-they-write",
      title: "What they write",
      line: "Allah swears by what is written, as angels record deeds.",
      facts: ["Angels record deeds", "Yasturun: they write"],
      quote: q68(1),
      source: ik(1, "Ibn Abbas, Mujahid and Qatadah said what they write; As-Suddi said it is the angels and the deeds of servants they record.", "The angels and the deeds of the servants they record"),
      difficulty: 2,
      questions: [
        { q: "What does Yasturun mean, per Ibn Abbas?", a: "What they write", wrong: ["What they eat", "What they sing", "What they build"], why: "Ibn Abbas, Mujahid and Qatadah all said that this means, what they write." },
        { q: "What did As-Suddi say is written?", a: "The deeds that angels record", wrong: ["Poems", "Shopping lists", "Old maps"], why: "As-Suddi said, The angels and the deeds of the servants they record." },
        { tf: true, q: "Angels write down our deeds.", why: "The angels and the deeds of the servants they record." }
      ]
    },
    {
      slug: "not-insane",
      title: "He was not insane",
      line: "By Allah's grace, he was not mad, as his foes claimed.",
      facts: ["Mocking is not proof", "Truth was his message"],
      quote: q68(2),
      source: ik(2, "Ibn Kathir says the Prophet ﷺ was not crazy as the ignorant among his people claimed, because they denied the guidance and truth he brought.", "you are not crazy as the ignorant among your people claim"),
      difficulty: 2,
      questions: [
        { q: "What does 68:2 say about the Prophet ﷺ?", a: "He is not insane", wrong: ["He is a poet", "He is a king", "He is a magician"], why: "You, by the grace of your Lord, are not insane." },
        { q: "Why did they call him mad?", a: "They denied the truth he brought", wrong: ["He acted strangely", "He was ill", "He forgot things"], why: "They deny the guidance and the clear truth that you have come with. Therefore, they attribute madness to you." },
        { tf: false, q: "The people who mocked him were wise.", why: "You are not crazy as the ignorant among your people claim." }
      ]
    },
    {
      slug: "reward-without-end",
      title: "A reward without end",
      line: "His reward and blessings will never be cut off.",
      facts: ["Mamnun: cut off", "His reward never ends"],
      quote: q68(3),
      source: ik(3, "Ibn Kathir says his reward is great and his blessings will never be cut off or perish.", "abundant blessings which will never be cut off or perish"),
      difficulty: 2,
      questions: [
        { q: "What kind of reward does the Prophet ﷺ have?", a: "One that never ends", wrong: ["A small one", "A short one", "None at all"], why: "For you is the great reward, and abundant blessings which will never be cut off or perish." },
        { q: "What does not Mamnun mean?", a: "Not cut off", wrong: ["Not sweet", "Not new", "Not seen"], why: "The meaning of not Mamnun is that it will not be cut off." },
        { tf: true, q: "Allah promised the Prophet ﷺ an endless reward.", why: "And verily, for you will be reward that is not Mamnun." }
      ]
    },
    {
      slug: "patient-with-harm",
      title: "Patient with harm",
      line: "He earned it by conveying the message with patience.",
      facts: ["Sabr: patience", "Conveying is hard work"],
      quote: q68(3),
      source: ik(3, "Ibn Kathir says his endless reward is because he conveyed the message of his Lord and was patient with their abuse.", "you were patient with their abuse"),
      difficulty: 3,
      questions: [
        { q: "Why does the Prophet ﷺ earn this reward?", a: "He conveyed and stayed patient", wrong: ["He became rich", "He ruled a land", "He fought for fame"], why: "Because you conveyed the Message of your Lord to creation, and you were patient with their abuse." },
        { q: "How did he respond to their abuse?", a: "With patience", wrong: ["With insults", "By giving up", "By running away"], why: "You were patient with their abuse." },
        { tf: false, q: "The Prophet ﷺ answered insults with insults.", why: "You were patient with their abuse." }
      ]
    },
    {
      slug: "exalted-character",
      title: "An exalted character",
      line: "He lived by the Quran, doing its commands and leaving its bans.",
      facts: ["Khuluq: character", "He lived the Quran"],
      quote: q68(4),
      source: ik(4, "Ibn Kathir says Aishah described his character as the Quran: he would act on what the Quran commanded and avoid what it forbade.", "he would act according to the commands and the prohibition in the"),
      difficulty: 2,
      questions: [
        { q: "What does 68:4 say about the Prophet ﷺ?", a: "He has an exalted character", wrong: ["He has great wealth", "He has a palace", "He has an army"], why: "And verily, you are on an exalted character." },
        { q: "How did Aishah describe his character?", a: "His character was the Quran", wrong: ["Like a king", "Like a poet", "Like a merchant"], why: "She said: Verily, the character of the Messenger of Allah was the Quran." },
        { tf: true, q: "He did what the Quran commanded and left what it forbade.", why: "Whatever the Quran commanded, he did it, and whatever it forbade, he avoided it." }
      ]
    },
    {
      slug: "his-good-qualities",
      title: "His good qualities",
      line: "Modesty, kindness, bravery, pardon and gentleness were in him.",
      facts: ["A model for all", "Learn his manners"],
      quote: q68(4),
      source: ik(4, "Ibn Kathir says his exalted character included modesty, kindness, bravery, pardoning, gentleness and every good trait.", "which included the qualities of modesty, kindness, bravery, pardoning, gentleness"),
      difficulty: 2,
      questions: [
        { q: "Which of these was in his character?", a: "Gentleness", wrong: ["Rudeness", "Greed", "Arrogance"], why: "Which included the qualities of modesty, kindness, bravery, pardoning, gentleness." },
        { q: "Which pair is in his qualities?", a: "Bravery and pardoning", wrong: ["Anger and revenge", "Pride and boasting", "Laziness and fear"], why: "Modesty, kindness, bravery, pardoning, gentleness and every other good characteristic." },
        { tf: false, q: "The Prophet ﷺ was known for harshness.", why: "The qualities of modesty, kindness, bravery, pardoning, gentleness." }
      ]
    },
    {
      slug: "ten-years-no-uff",
      title: "Ten years, not one uff",
      line: "Anas served him ten years and never heard a word of annoyance.",
      facts: ["Uff: a word of annoyance", "Kind to his helpers"],
      quote: q68(4),
      source: hadith("bukhari", "6038", "Anas", "Sahih", "Anas served the Prophet ﷺ for ten years and he never said uff to him or blamed him for what he did or did not do.", "for ten years, and he never said to me"),
      difficulty: 2,
      questions: [
        { q: "How long did Anas serve the Prophet ﷺ?", a: "Ten years", wrong: ["One week", "Two months", "Forty years"], why: "I served the Prophet ﷺ for ten years, and he never said to me, Uf." },
        { q: "What did the Prophet ﷺ never say to him?", a: "Uff", wrong: ["Salam", "Thank you", "Bismillah"], why: "He never said to me, Uf, and never blamed me." },
        { tf: true, q: "The Prophet ﷺ was kind to those who served him.", why: "He never said to me, Uf, and never blamed me by saying, Why did you do so." }
      ]
    },
    {
      slug: "best-in-character",
      title: "The best of you",
      line: "He taught: the best of you are those with the best character.",
      facts: ["Akhlaq: manners", "Never used bad words"],
      quote: q68(4),
      source: hadith("bukhari", "3559", "Abdullah ibn Amr", "Sahih", "The Prophet ﷺ never used bad language and said the best among you are those with the best manners and character.", "The best amongst you are those who have the best manners and character"),
      difficulty: 1,
      questions: [
        { q: "Who are the best of us, per the hadith?", a: "Those with the best character", wrong: ["The richest", "The strongest", "The tallest"], why: "The best amongst you are those who have the best manners and character." },
        { q: "What did the Prophet ﷺ never use?", a: "Bad language", wrong: ["Kind words", "Greetings", "Dua"], why: "The Prophet ﷺ never used bad language." },
        { tf: false, q: "Good manners do not matter in Islam.", why: "The best amongst you are those who have the best manners and character." }
      ]
    },
    {
      slug: "he-chose-the-easier",
      title: "He chose the easier way",
      line: "Given two choices, he took the easier, unless it was sinful.",
      facts: ["Islam is ease", "Never for himself"],
      quote: q68(4),
      source: ik(4, "Aishah said he was never given a choice between two things except he chose the easier, as long as it was not a sin, and he never took revenge for himself.", "he was never given the option between two things except that the most beloved of the two to him was the easiest of them"),
      difficulty: 3,
      questions: [
        { q: "Which option did he prefer?", a: "The easier one, if not sinful", wrong: ["The hardest one", "The richest one", "The loudest one"], why: "The most beloved of the two to him was the easiest of them, as long as it did not involve sin." },
        { q: "Did he take revenge for himself?", a: "No, never", wrong: ["Always", "Often", "Only at night"], why: "He would not avenge himself concerning anything that was done to him." },
        { tf: true, q: "He kept further from sin than anyone.", why: "If it did involve sin, then he stayed farther away from sin than any of the people." }
      ]
    },
    {
      slug: "you-will-see",
      title: "You will see",
      line: "Soon all will see who was truly misguided.",
      facts: ["Truth shows in the end", "The Day of Judgement"],
      quote: q68(5),
      source: ik(5, "Ibn Abbas said it means you will know and they will know on the Day of Judgement.", "You will know and they will know on the Day of Judgement"),
      difficulty: 2,
      questions: [
        { q: "What does 68:5 promise?", a: "Both sides will see", wrong: ["No one will know", "Only he will see", "It is a secret"], why: "You will see, and they will see." },
        { q: "When will they know, per Ibn Abbas?", a: "On the Day of Judgement", wrong: ["Tomorrow morning", "Never", "In a dream"], why: "You will know and they will know on the Day of Judgement." },
        { tf: false, q: "The truth will stay hidden forever.", why: "You will know and they will know on the Day of Judgement." }
      ]
    },
    {
      slug: "who-is-lured-away",
      title: "Who was led astray?",
      line: "Maftun means one charmed or lured away from the truth.",
      facts: ["Maftun: led astray", "The deniers were astray"],
      quote: q68(6),
      source: ik(6, "Ibn Kathir says the literal meaning of Maftun is one who has been charmed or lured away from the truth.", "one who has been charmed or lured away from the truth"),
      difficulty: 3,
      questions: [
        { q: "What does Maftun literally mean?", a: "Lured away from the truth", wrong: ["Very rich", "Very brave", "Very old"], why: "The literal meaning of Maftun is one who has been charmed or lured away from the truth." },
        { q: "Which of the two was truly Maftun?", a: "Those who denied him", wrong: ["The Prophet ﷺ", "His companions", "The angels"], why: "Which of you is afflicted with madness. Your Lord knows him who has gone astray." },
        { tf: true, q: "Being lured from the truth is the real loss.", why: "One who has been charmed or lured away from the truth and has strayed from it." }
      ]
    },
    {
      slug: "he-knows-the-guided",
      title: "He knows the guided",
      line: "Allah knows best who is astray and who is guided.",
      facts: ["Allah judges hearts", "Ask Him for guidance"],
      quote: q68(7),
      source: ik(7, "Ibn Kathir says Allah knows which group is truly guided and which is astray from the truth.", "He knows which of the two groups are truly guided among you"),
      difficulty: 2,
      questions: [
        { q: "Who knows best who is guided?", a: "Allah", wrong: ["The crowd", "The rich", "The poets"], why: "Your Lord is the best Knower of those who are guided." },
        { q: "What else does Allah know, per 68:7?", a: "Who has gone astray", wrong: ["Only the weather", "Nothing", "Only numbers"], why: "Your Lord is the best Knower of him who has gone astray from His path." },
        { tf: false, q: "People decide who is truly guided.", why: "He knows which of the two groups are truly guided among you." }
      ]
    },
    {
      slug: "guidance-for-the-fit",
      title: "Guidance for the ready",
      line: "In His wisdom, Allah guides hearts that are fit for guidance.",
      facts: ["As-Sa'di explains", "Wisdom in guidance"],
      quote: q68(7),
      source: saadi(68, 7, "As-Sa'di says Allah knowing who is astray and who is guided shows His wisdom: He guides those who are fit for guidance and not others.", "حيث كان يهدي من يصلح للهداية"),
      difficulty: 3,
      questions: [
        { q: "Whom does Allah guide, per as-Sa'di on 68:7?", a: "Those fit for guidance", wrong: ["Random people", "Only the rich", "No one"], why: "He guides those suited for guidance, says as-Sa'di." },
        { q: "Al-Qalam 68:7 is a promise for whom?", a: "The guided", wrong: ["The deniers", "The proud", "The stingy"], why: "A warning to the lost, a promise to the guided." },
        { tf: true, q: "Allah's guidance follows His perfect wisdom.", why: "As-Sa'di on 68:7." }
      ]
    }
  ]
};

/** Ayahs 8 to 16: no compromise on the truth, and the bad traits of the one who swears much and spreads tales. */
const QALAM_TWO: DeepUnit = {
  key: "qalam2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-68",
  name: "Al-Qalam, ayahs 8 to 16",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Qalam",
  lessons: [
    {
      slug: "do-not-obey-deniers",
      title: "Do not obey the deniers",
      line: "They wanted him to stay silent on idols and leave the truth.",
      facts: ["Stand firm", "Truth is not traded"],
      quote: q68(8),
      source: ik(8, "Mujahid said they wanted him to be quiet about their gods and abandon the truth he was upon.", "you should be quiet about their gods and abandon the truth that you are upon"),
      difficulty: 2,
      questions: [
        { q: "Whom does 68:8 say not to obey?", a: "The deniers", wrong: ["The parents", "The teachers", "The believers"], why: "So, do not obey the deniers." },
        { q: "What did they want, per Mujahid?", a: "Silence about their idols", wrong: ["More prayers", "Charity", "Peace and truth"], why: "You should be quiet about their gods and abandon the truth that you are upon." },
        { tf: true, q: "A Muslim does not give up the truth to please others.", why: "So, do not obey the deniers." }
      ]
    },
    {
      slug: "no-compromise-on-tawhid",
      title: "No deal on worship",
      line: "They hoped he would allow their idols if they allowed his faith.",
      facts: ["Tawhid is not traded", "Kind but firm"],
      quote: q68(9),
      source: ik(9, "Ibn Abbas said they wanted him to permit their idol worship, and they would permit him his religion.", "That you would permit them"),
      difficulty: 3,
      questions: [
        { q: "What deal did they wish for?", a: "Allow their idols, they allow his faith", wrong: ["A trade in camels", "A marriage", "A race"], why: "That you would permit them their idolatry and they also would permit you." },
        { q: "What did they offer in return?", a: "To allow his religion", wrong: ["Gold and silver", "A kingdom", "Nothing"], why: "That you would permit them their idolatry and they also would permit you to practice your religion." },
        { tf: false, q: "Mixing idol worship with Islam is allowed.", why: "So, do not obey the deniers. They wish that you should compromise with them." }
      ]
    },
    {
      slug: "one-who-swears-much",
      title: "Swearing too much",
      line: "Do not obey one who swears often and lies.",
      facts: ["Hallaf: swears much", "Mahin: a liar"],
      quote: q68(10),
      source: ik(10, "Ibn Kathir says the liar, from weakness, hides behind false oaths, using Allah's Names all the time.", "only seeks protection in his false oaths"),
      difficulty: 2,
      questions: [
        { q: "What is a Hallaf?", a: "One who swears much", wrong: ["One who prays much", "One who gives much", "One who reads much"], why: "And do not obey every Hallaf, one who swears much." },
        { q: "What did Ibn Abbas say Mahin means?", a: "The liar", wrong: ["The king", "The guest", "The farmer"], why: "Ibn Abbas said, Al-Mahin means the liar." },
        { tf: true, q: "Swearing by Allah all the time is a bad habit.", why: "He uses them, false oaths, all the time and out of place." }
      ]
    },
    {
      slug: "tale-carrier",
      title: "The tale-carrier",
      line: "Do not obey the slanderer who carries tales to cause fights.",
      facts: ["Namim: tale-carrying", "Keep friends united"],
      quote: q68(11),
      source: ik(11, "Ibn Kathir says Namim is going around among people causing discord and carrying tales to spoil good relations.", "instigating discord between them and carrying tales"),
      difficulty: 2,
      questions: [
        { q: "What does the tale-carrier try to do?", a: "Cause discord between people", wrong: ["Make peace", "Teach kindness", "Help the poor"], why: "The one who goes around among people instigating discord between them and carrying tales." },
        { q: "What is a Hammaz, per Ibn Abbas and Qatadah?", a: "A slanderer", wrong: ["A builder", "A singer", "A guard"], why: "A Hammaz: Ibn Abbas and Qatadah both said, This is slander." },
        { tf: false, q: "Carrying tales between friends is harmless fun.", why: "Carrying tales in order to corrupt relations between people when they are good and pleasant." }
      ]
    },
    {
      slug: "the-qattat",
      title: "No tale-bearer in Paradise",
      line: "The Prophet ﷺ warned: a tale-bearer will not enter Paradise.",
      facts: ["Qattat: tale-bearer", "Hudhayfah narrated it"],
      quote: q68(11),
      source: hadith("bukhari", "6056", "Hudhayfah", "Sahih", "Hudhayfah heard the Prophet ﷺ say a Qattat, one who carries tales to make trouble, will not enter Paradise.", "will not enter Paradise"),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ warn about the tale-bearer?", a: "He will not enter Paradise", wrong: ["He will become rich", "He will be famous", "Nothing"], why: "A Qattat will not enter Paradise." },
        { q: "Who narrated the warning?", a: "Hudhayfah", wrong: ["Abu Jahl", "Haman", "Qarun"], why: "Narrated Hudhaifa: I heard the Prophet ﷺ saying, A Qattat will not enter Paradise." },
        { tf: true, q: "Tale-bearing is a serious sin.", why: "A Qattat will not enter Paradise." }
      ]
    },
    {
      slug: "hinderer-of-good",
      title: "Blocking the good",
      line: "He refuses to give and holds back the good he has.",
      facts: ["Share what you have", "Stinginess is blamed"],
      quote: q68(12),
      source: ik(12, "Ibn Kathir says the hinderer of good refuses to give and withholds the good he has.", "he refuses to give and withholds that which he has of good"),
      difficulty: 2,
      questions: [
        { q: "What does the hinderer of good do?", a: "Refuses to give", wrong: ["Gives freely", "Helps everyone", "Plants trees"], why: "He refuses to give and withholds that which he has of good." },
        { q: "What does sinful mean in 68:12?", a: "He goes into forbidden things", wrong: ["He prays a lot", "He fasts often", "He reads much"], why: "Sinful, meaning, he delves into the forbidden things." },
        { tf: false, q: "Holding back good from others is praised.", why: "Hinderer of the good, transgressor, sinful." }
      ]
    },
    {
      slug: "beyond-the-limits",
      title: "Going beyond the limits",
      line: "Even in what is allowed, he goes past Allah's limits.",
      facts: ["Mutad: transgressor", "Stay within limits"],
      quote: q68(12),
      source: ik(12, "Ibn Kathir says the transgressor goes beyond the set limits even in getting what Allah allowed him.", "he exceeds the legislated bounds"),
      difficulty: 3,
      questions: [
        { q: "What does the transgressor do?", a: "Exceeds the set limits", wrong: ["Stays in limits", "Helps others", "Gives charity"], why: "In attaining that which Allah has made permissible for him, he exceeds the legislated bounds." },
        { q: "Even in what does he cross the limits?", a: "In what is allowed", wrong: ["Only in sleep", "Only in silence", "Never"], why: "In attaining that which Allah has made permissible for him, he exceeds the legislated bounds." },
        { tf: true, q: "Even halal things have limits.", why: "In attaining that which Allah has made permissible for him, he exceeds the legislated bounds." }
      ]
    },
    {
      slug: "cruel-and-harsh",
      title: "Cruel and harsh",
      line: "Utul means cruel, harsh, greedy and stingy.",
      facts: ["Utul: cruel", "Be gentle instead"],
      quote: q68(13),
      source: ik(13, "Ibn Kathir says Utul means one who is cruel, harsh, strong, greedy and stingy.", "means one who is cruel, harsh, strong, greedy and stingy"),
      difficulty: 2,
      questions: [
        { q: "What does Utul mean?", a: "Cruel and harsh", wrong: ["Gentle and kind", "Wise and calm", "Young and new"], why: "Utul means one who is cruel, harsh, strong, greedy and stingy." },
        { q: "Which trait is part of Utul?", a: "Stingy", wrong: ["Generous", "Humble", "Patient"], why: "Cruel, harsh, strong, greedy and stingy." },
        { tf: false, q: "Harshness is a good trait in Islam.", why: "Utul means one who is cruel, harsh, strong, greedy and stingy." }
      ]
    },
    {
      slug: "people-of-paradise",
      title: "Who are the people of Paradise?",
      line: "The humble whom people ignore may be people of Paradise.",
      facts: ["Humility is loved", "Arrogance is hated"],
      quote: q68(13),
      source: hadith("bukhari", "4918", "Haritha bin Wahb", "Sahih", "The Prophet ﷺ said the people of Paradise are every weak, humble person whom people look down upon, and the people of the Fire are the violent and arrogant.", "Every weak and poor obscure person whom the people look down upon"),
      difficulty: 3,
      questions: [
        { q: "Who are the people of Paradise in the hadith?", a: "The humble whom people overlook", wrong: ["The proudest", "The loudest", "The cruelest"], why: "Every weak and poor obscure person whom the people look down upon." },
        { q: "Who are the people of the Fire in it?", a: "The violent and arrogant", wrong: ["The poor", "The quiet", "The kind"], why: "They are all those violent, arrogant and stubborn people." },
        { tf: true, q: "Allah honors the humble even if people ignore them.", why: "Every weak and poor obscure person whom the people look down upon but his oath is fulfilled by Allah." }
      ]
    },
    {
      slug: "known-for-evil",
      title: "Known for his evil",
      line: "Zanim: a man who stands out among people for his evil.",
      facts: ["Bad deeds get known", "Be known for good"],
      quote: q68(13),
      source: ik(13, "Ibn Abbas described the Zanim as a man who stands out, famous for his evil like a marked sheep stands out in its flock.", "he is famous for his evil"),
      difficulty: 3,
      questions: [
        { q: "What is the Zanim known for?", a: "His evil", wrong: ["His kindness", "His learning", "His charity"], why: "The meaning of this is that he is famous for his evil." },
        { q: "What did Ibn Abbas compare him to?", a: "A marked sheep in a flock", wrong: ["A lion", "An eagle", "A horse"], why: "He is famous for his evil just as a sheep that has a piece of its ear cut off stands out among its sister sheep." },
        { tf: false, q: "Evil deeds always stay hidden.", why: "He is famous for his evil." }
      ]
    },
    {
      slug: "proud-of-wealth",
      title: "Proud of his wealth",
      line: "Given wealth and children, he answered with denial.",
      facts: ["Blessings are a test", "Thank, do not boast"],
      quote: q68(14),
      source: ik(14, "Ibn Kathir says this is how he answered Allah's favors of wealth and children: by rejecting His ayahs.", "this is how he responds to the favors that Allah has bestowed upon him of wealth and children"),
      difficulty: 2,
      questions: [
        { q: "What blessings did he have?", a: "Wealth and children", wrong: ["Wisdom and faith", "Patience and peace", "Nothing"], why: "He was so because he had wealth and children." },
        { q: "How did he respond to these favors?", a: "By denying Allah's ayahs", wrong: ["By thanking Allah", "By giving charity", "By praying"], why: "This is how he responds to the favors that Allah has bestowed upon him of wealth and children, by disbelieving." },
        { tf: true, q: "Wealth and children should make us more thankful.", why: "This is how he responds to the favors that Allah has bestowed upon him: by disbelieving." }
      ]
    },
    {
      slug: "tales-of-old",
      title: "Tales of old?",
      line: "When the ayahs are recited, he calls them old stories.",
      facts: ["The Quran is true", "Respect the ayahs"],
      quote: q68(15),
      source: ik(15, "Ibn Kathir says he turns away from Allah's ayahs, claiming they are a lie taken from the tales of the ancients.", "claiming that they are a lie that has been taken from the tales of the ancients"),
      difficulty: 2,
      questions: [
        { q: "What does he call the ayahs?", a: "Tales of the men of old", wrong: ["Words of wisdom", "Clear truth", "A mercy"], why: "When Our Ayat are recited to him, he says: Tales of the men of old!" },
        { q: "What did he claim about the ayahs?", a: "They were taken from old tales", wrong: ["They were new science", "They were songs", "They were laws of kings"], why: "Claiming that they are a lie that has been taken from the tales of the ancients." },
        { tf: false, q: "The Quran is copied from old stories.", why: "Claiming that they are a lie that has been taken from the tales of the ancients." }
      ]
    },
    {
      slug: "made-known",
      title: "Made known to all",
      line: "Allah would expose him so his evil is clear to everyone.",
      facts: ["Allah exposes wrong", "Nothing stays hidden"],
      quote: q68(16),
      source: ik(16, "Ibn Jarir said Allah will make his matter clear and evident so that people know him, like a mark on an animal.", "We will make his matter clear and evident so that they will know him"),
      difficulty: 3,
      questions: [
        { q: "What does Ibn Jarir say Allah will do?", a: "Make his matter clear to all", wrong: ["Hide him", "Reward him", "Forget him"], why: "We will make his matter clear and evident so that they will know him." },
        { q: "What did the mark show?", a: "Who he really was", wrong: ["His wealth", "His age", "His name only"], why: "So that they will know him and he will not be hidden from them." },
        { tf: true, q: "Allah can expose what people hide.", why: "We will make his matter clear and evident so that they will know him." }
      ]
    }
  ]
};

/** Ayahs 17 to 24: the People of the Garden who planned to keep the poor away and forgot to say If Allah wills. */
const QALAM_THREE: DeepUnit = {
  key: "qalam3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-68",
  name: "Al-Qalam, ayahs 17 to 24",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Qalam",
  lessons: [
    {
      slug: "the-garden-owners",
      title: "The owners of the garden",
      line: "Allah tested some people with a garden full of fruit.",
      facts: ["A parable for Quraysh", "Blessings are tests"],
      quote: q68(17),
      source: ik(17, "Ibn Kathir says the garden contained different types of fruits and plants, and it is a parable for those who met Allah's favors with denial.", "This refers to a garden containing different types of fruits and vegetation"),
      difficulty: 1,
      questions: [
        { q: "What did the People of the Garden own?", a: "A garden of fruits", wrong: ["A ship", "A palace", "A mine of gold"], why: "This refers to a garden containing different types of fruits and vegetation." },
        { q: "What does We have tried them mean?", a: "We have tested them", wrong: ["We have fed them", "We have praised them", "We have forgotten them"], why: "Verily, We have tried them, meaning, We have tested them." },
        { tf: true, q: "A blessing like a garden can be a test.", why: "Verily, We have tried them as We tried the People of the Garden." }
      ]
    },
    {
      slug: "a-secret-plan",
      title: "A secret plan",
      line: "They planned an early harvest so the poor would not know.",
      facts: ["They wanted it all", "No charity planned"],
      quote: q68(17),
      source: ik(17, "Ibn Kathir says they vowed at night to pick the fruit in the morning so the poor would not know, to keep it all and give none in charity.", "so that poor and the beggars would not know what they were doing"),
      difficulty: 2,
      questions: [
        { q: "Why did they plan to pick early?", a: "So the poor would not know", wrong: ["To beat the heat", "To sell it fast", "To save the trees"], why: "So that poor and the beggars would not know what they were doing." },
        { q: "What did they want to keep for themselves?", a: "All of the fruit", wrong: ["Only a little", "Only the leaves", "Only the seeds"], why: "In this way they would be able to keep its fruit for themselves and not give any of it in charity." },
        { tf: false, q: "They planned to share the fruit with the poor.", why: "Not give any of it in charity." }
      ]
    },
    {
      slug: "without-in-sha-allah",
      title: "Without If Allah wills",
      line: "They made their plan without saying: if Allah wills.",
      facts: ["In sha Allah: if Allah wills", "Plans need His will"],
      quote: q68(18),
      source: ik(18, "Ibn Kathir says they vowed without saying If Allah wills, so Allah broke their vow.", "Therefore, Allah broke their vow"),
      difficulty: 2,
      questions: [
        { q: "What did they forget to say?", a: "If Allah wills", wrong: ["Good morning", "Thank you", "Goodbye"], why: "Without saying: If Allah wills." },
        { q: "What happened to their vow?", a: "Allah broke it", wrong: ["It came true", "They forgot it", "They wrote it down"], why: "Meaning their vow that they made. Therefore, Allah broke their vow." },
        { tf: true, q: "We should say In sha Allah about future plans.", why: "They swore to pluck the fruits in the morning without saying: If Allah wills." }
      ]
    },
    {
      slug: "while-they-slept",
      title: "While they slept",
      line: "While they slept, a calamity from Allah struck the garden.",
      facts: ["Taif: a night visitor", "Allah controls all"],
      quote: q68(19),
      source: ik(19, "Ibn Kathir says the garden was struck by a destruction from the heavens while they were asleep.", "it was afflicted with some heavenly destruction"),
      difficulty: 2,
      questions: [
        { q: "When did the calamity come?", a: "While they slept", wrong: ["At noon", "During a feast", "On market day"], why: "Then there passed over it a Taif from your Lord while they were asleep." },
        { q: "From whom did it come?", a: "From their Lord", wrong: ["From thieves", "From animals", "From the neighbors"], why: "Then there passed over it a Taif from your Lord." },
        { tf: false, q: "They saw the calamity happen and stopped it.", why: "Then there passed over it a Taif from your Lord while they were asleep." }
      ]
    },
    {
      slug: "like-a-dark-night",
      title: "Like a dark night",
      line: "By morning the garden was black and dry, like a harvested field.",
      facts: ["As-Sarim: stripped bare", "Wealth can vanish"],
      quote: q68(20),
      source: ik(20, "Ibn Abbas said the garden became like the dark night; Ath-Thawri and As-Suddi said like a harvested crop, withered and dry.", "Like the dark night"),
      difficulty: 2,
      questions: [
        { q: "What did Ibn Abbas say the garden became like?", a: "The dark night", wrong: ["A green field", "A river", "A rainbow"], why: "Ibn Abbas said, Like the dark night." },
        { q: "What did Ath-Thawri compare it to?", a: "A withered, dry crop", wrong: ["A fresh orchard", "A full barn", "A flower bed"], why: "Like the crop when it is harvested withered and dry." },
        { tf: true, q: "Allah can take away wealth in one night.", why: "So by the morning it became like As-Sarim." }
      ]
    },
    {
      slug: "calling-each-other",
      title: "Calling one another",
      line: "At dawn they called each other to go and pick the harvest.",
      facts: ["They did not know", "Plans without Allah fail"],
      quote: q68(21),
      source: ik(21, "Ibn Kathir says early in the morning they called each other to go together to pick the harvest.", "they called each other so that they could go together to pick the harvest"),
      difficulty: 1,
      questions: [
        { q: "When did they call each other?", a: "As the morning broke", wrong: ["At midnight", "At sunset", "At noon"], why: "Then they called out one to another as soon as the morning broke." },
        { q: "Why did they call each other?", a: "To go pick the harvest", wrong: ["To pray together", "To feed the poor", "To travel"], why: "They called each other so that they could go together to pick the harvest." },
        { tf: false, q: "They knew the garden was already ruined.", why: "They called each other so that they could go together to pick the harvest." }
      ]
    },
    {
      slug: "go-early",
      title: "Go early",
      line: "They said: go early to your crop to pick it.",
      facts: ["Hurrying to be greedy", "Allah sees every plan"],
      quote: q68(22),
      source: ik(22, "Ibn Kathir explains their words: go early if you want to pluck your harvest fruit.", "if you want to pluck your harvest fruit"),
      difficulty: 1,
      questions: [
        { q: "Where did they say to go?", a: "To their crop", wrong: ["To the mosque", "To the market", "To the sea"], why: "Go to your tilth in the morning, if you would pluck the fruits." },
        { q: "Why go early, per Ibn Kathir?", a: "To pluck the harvest", wrong: ["To water it", "To sell the land", "To rest"], why: "Meaning, if you want to pluck your harvest fruit." },
        { tf: true, q: "Allah knew their plan before they left.", why: "Then Allah, the All-Knower of secrets and private discussions, explained what they were saying." }
      ]
    },
    {
      slug: "they-whispered",
      title: "They whispered",
      line: "They spoke quietly so no one would hear, but Allah heard.",
      facts: ["Allah hears whispers", "Secret plans are known"],
      quote: q68(23),
      source: ik(23, "Ibn Kathir says they spoke privately so no one could hear, then Allah, the Knower of secrets, revealed what they said.", "they spoke privately about what they were doing so that no one could hear"),
      difficulty: 2,
      questions: [
        { q: "How did they speak on the way?", a: "In whispers", wrong: ["Shouting", "Singing", "Laughing loudly"], why: "So they departed, and they were whispering." },
        { q: "Who knew what they whispered?", a: "Allah, Knower of secrets", wrong: ["No one", "Only the birds", "The poor"], why: "Then Allah, the All-Knower of secrets and private discussions, explained what they were saying in private." },
        { tf: false, q: "Whispered plans are hidden from Allah.", why: "Allah, the All-Knower of secrets and private discussions, explained what they were saying." }
      ]
    },
    {
      slug: "no-poor-today",
      title: "No poor person today",
      line: "Their secret: let no poor person enter the garden today.",
      facts: ["Greed blocks charity", "The poor have a right"],
      quote: q68(24),
      source: ik(24, "Ibn Kathir says they told each other not to allow any poor person into the garden that day.", "Do not allow any poor person to enter upon you in it"),
      difficulty: 2,
      questions: [
        { q: "What was their whispered rule?", a: "No poor person enters today", wrong: ["Everyone may enter", "Feed the poor first", "Give half away"], why: "No poor person shall enter upon you into it today." },
        { q: "Whom did they want to keep out?", a: "The poor", wrong: ["The thieves", "The animals", "The kings"], why: "Do not allow any poor person to enter upon you in it, the garden, today." },
        { tf: true, q: "Keeping the poor away from charity is a sin.", why: "Preventing the poor people from receiving their right of the harvested fruit." }
      ]
    }
  ]
};

/** Ayahs 25 to 33: the ruined garden, the best of them who said glorify Allah, their regret, and their hope. */
const QALAM_FOUR: DeepUnit = {
  key: "qalam4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-68",
  name: "Al-Qalam, ayahs 25 to 33",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Qalam",
  lessons: [
    {
      slug: "they-thought-they-had-power",
      title: "They thought they had power",
      line: "They set out sure they could do whatever they planned.",
      facts: ["Power belongs to Allah", "Pride before a fall"],
      quote: q68(25),
      source: ik(25, "Ibn Kathir says they went with strength, thinking they had power to do what they wanted.", "they thought they had power to do what they claimed"),
      difficulty: 2,
      questions: [
        { q: "What did they think they had?", a: "Power to do as they wished", wrong: ["Nothing at all", "Fear of Allah", "Kind hearts"], why: "They thought they had power to do what they claimed and what they were desiring." },
        { q: "How did they set out?", a: "With strength and certainty", wrong: ["Slowly and sadly", "In fear", "Asleep"], why: "And they went in the morning with Hard, meaning, with strength and power." },
        { tf: false, q: "Their own power could guarantee the harvest.", why: "They thought they had power to do what they claimed, yet Allah took it away." }
      ]
    },
    {
      slug: "we-are-lost",
      title: "We must be lost!",
      line: "Seeing it black, they thought they took the wrong path.",
      facts: ["Shock at the loss", "The garden was theirs"],
      quote: q68(26),
      source: ik(26, "Ibn Kathir says when they saw it black and empty, they thought they had walked down the wrong path.", "we have walked down a path other than the one we were seeking to reach it"),
      difficulty: 2,
      questions: [
        { q: "What did they first think?", a: "They had gone the wrong way", wrong: ["Thieves came", "It was a dream", "It was night"], why: "We have walked down a path other than the one we were seeking to reach it." },
        { q: "What did the garden look like?", a: "Black and empty", wrong: ["Green and full", "Covered in snow", "Full of birds"], why: "Black, gloomy and void of any benefit." },
        { tf: true, q: "The change was so great they did not recognize it.", why: "They believed that they had been mistaken in the path they took." }
      ]
    },
    {
      slug: "we-are-deprived",
      title: "We are deprived",
      line: "Then they knew: it was their garden, and they got nothing.",
      facts: ["Mahrumun: deprived", "Greed lost it all"],
      quote: q68(27),
      source: ik(27, "Ibn Kathir says they realized it was their garden after all, but they had no portion and no share of the harvest.", "this is it, but we have no portion and no share"),
      difficulty: 2,
      questions: [
        { q: "What did they finally realize?", a: "They were deprived", wrong: ["They were rich", "They were lost", "It was not theirs"], why: "Nay! Indeed we are deprived!" },
        { q: "What share did they get?", a: "No share at all", wrong: ["Half", "All of it", "A little"], why: "This is it, but we have no portion and no share of harvest." },
        { tf: false, q: "Their plan to keep everything worked.", why: "Indeed we are deprived. We have no portion and no share." }
      ]
    },
    {
      slug: "the-best-of-them",
      title: "The best of them",
      line: "The most just among them reminded them of what he had said.",
      facts: ["Awsat: the most just", "Listen to good advice"],
      quote: q68(28),
      source: ik(28, "Ibn Abbas, Mujahid and others said Awsat means the most just of them and the best of them.", "This means the most just of them and the best of them"),
      difficulty: 2,
      questions: [
        { q: "What does Awsat mean?", a: "The most just of them", wrong: ["The youngest", "The richest", "The loudest"], why: "This means the most just of them and the best of them." },
        { q: "What did he ask them?", a: "Did I not tell you?", wrong: ["Where is the food?", "Who is king?", "What time is it?"], why: "The Awsat among them said, Did I not tell you." },
        { tf: true, q: "One good person had warned them.", why: "The Awsat among them said: Did I not tell you." }
      ]
    },
    {
      slug: "why-not-glorify-allah",
      title: "Why not glorify Allah?",
      line: "He had told them: glorify Allah and thank Him for His gifts.",
      facts: ["Tasbih: glorifying Allah", "Thankfulness protects"],
      quote: q68(28),
      source: ik(28, "Mujahid said it means why not say If Allah wills, and it is also said the best of them told them to glorify Allah and thank Him for what He gave.", "glorify Allah and thank Him for what He has given you and favored you with"),
      difficulty: 3,
      questions: [
        { q: "What does Tusabbihun mean, per Mujahid?", a: "Saying If Allah wills", wrong: ["Swimming", "Selling", "Sleeping"], why: "Why do you not Tusabbihun means why do you not say, If Allah wills." },
        { q: "What else did the best of them urge?", a: "Thanking Allah for His gifts", wrong: ["Hiding the fruit", "Cutting the trees", "Leaving the town"], why: "Why don't you glorify Allah and thank Him for what He has given you and favored you with?" },
        { tf: false, q: "Glorifying Allah has nothing to do with blessings.", why: "Glorify Allah and thank Him for what He has given you and favored you with." }
      ]
    },
    {
      slug: "glory-to-our-lord",
      title: "Glory to our Lord",
      line: "They praised Allah and admitted wrong, but only after the loss.",
      facts: ["Repent before loss", "Admitting wrong is a start"],
      quote: q68(29),
      source: ik(29, "Ibn Kathir says they became obedient and confessed when it no longer benefited them.", "They became obedient when it was of no benefit to them"),
      difficulty: 2,
      questions: [
        { q: "What did they say at last?", a: "Glory to our Lord, we did wrong", wrong: ["It is not our fault", "Let us try again", "Nothing"], why: "They said: Glory to Our Lord! Verily, we have been wrongdoers." },
        { q: "When did they become obedient?", a: "When it no longer helped", wrong: ["Before the night", "At the start", "Never"], why: "They became obedient when it was of no benefit to them." },
        { tf: true, q: "Obeying Allah before trouble comes is better.", why: "They became obedient when it was of no benefit to them." }
      ]
    },
    {
      slug: "blaming-each-other",
      title: "Blaming each other",
      line: "They turned on each other, blaming one another for the plan.",
      facts: ["Blame does not fix it", "Own your mistake"],
      quote: q68(30),
      source: ik(30, "Ibn Kathir says they began blaming each other for their plan to keep the poor from their share.", "they started blaming each other for what they had resolved to do"),
      difficulty: 2,
      questions: [
        { q: "What did they do to each other?", a: "Blamed one another", wrong: ["Hugged", "Thanked", "Ignored"], why: "Then they turned one against another, blaming." },
        { q: "What were they blaming each other for?", a: "Keeping the poor from their share", wrong: ["Bad weather", "Lost tools", "Late breakfast"], why: "Preventing the poor people from receiving their right of the harvested fruit." },
        { tf: false, q: "Blaming each other brought the garden back.", why: "Their response to each other was only to confess their error and sin." }
      ]
    },
    {
      slug: "we-transgressed",
      title: "We went too far",
      line: "They admitted: woe to us, we were transgressors.",
      facts: ["Taghin: transgressors", "Know your limits"],
      quote: q68(31),
      source: ik(31, "Ibn Kathir explains their words: we transgressed and exceeded the bounds until this happened to us.", "we have transgressed, trespassed, violated and exceeded the bounds"),
      difficulty: 2,
      questions: [
        { q: "What did they call themselves?", a: "Taghin, transgressors", wrong: ["Heroes", "Victims", "Winners"], why: "They said: Woe to us! Verily, we were Taghin." },
        { q: "What does Taghin mean, per Ibn Kathir?", a: "Going beyond the bounds", wrong: ["Being patient", "Being thankful", "Being humble"], why: "We have transgressed, trespassed, violated and exceeded the bounds." },
        { tf: true, q: "They finally admitted their own wrongdoing.", why: "Woe to us! Verily, we were Taghin." }
      ]
    },
    {
      slug: "hope-in-our-lord",
      title: "We hope in our Lord",
      line: "They turned to Allah, hoping He would give something better.",
      facts: ["Never lose hope", "Turn back to Allah"],
      quote: q68(32),
      source: ik(32, "Ibn Kathir says they hoped for something better in exchange in this life, or its reward in the Hereafter.", "They were hoping for something better in exchange in this life"),
      difficulty: 2,
      questions: [
        { q: "What did they hope for?", a: "Something better from Allah", wrong: ["Revenge", "More land to steal", "Nothing"], why: "We hope that our Lord will give us in exchange better than it." },
        { q: "In whom did they put their hope?", a: "Their Lord", wrong: ["Their neighbors", "Their wealth", "Their tools"], why: "Truly, we hope in our Lord." },
        { tf: false, q: "After a mistake, a person should lose hope in Allah.", why: "Truly, we hope in our Lord." }
      ]
    },
    {
      slug: "their-generous-father",
      title: "Their generous father",
      line: "Their father used to give the extra harvest in charity.",
      facts: ["He shared with the poor", "The sons stopped it"],
      quote: q68(32),
      source: ik(32, "It is said their father used to reinvest in the garden, save food for his family, and give the excess in charity, but his sons decided to stop.", "he would give away the excess in charity"),
      difficulty: 3,
      questions: [
        { q: "What did their father do with the extra?", a: "Gave it in charity", wrong: ["Burned it", "Hid it", "Threw it away"], why: "He would save some as food for his dependants for the year, and he would give away the excess in charity." },
        { q: "What did the sons think of his charity?", a: "They called it foolish", wrong: ["They praised it", "They doubled it", "They copied it"], why: "Our father was foolish for giving some of this garden's harvest to the poor." },
        { tf: true, q: "Their father was a good example they did not follow.", why: "He would give away the excess in charity. Then, when he died, his children wanted more." }
      ]
    },
    {
      slug: "charity-does-not-decrease",
      title: "Charity never decreases wealth",
      line: "The Prophet ﷺ said: charity does not decrease wealth.",
      facts: ["Give and Allah gives", "Forgiving raises honor"],
      quote: q68(32),
      source: hadith("muslim", "2588", "Abu Hurairah", "Sahih", "The Prophet ﷺ said charity does not decrease wealth, forgiving increases honor, and humility raises a person.", "Charity does not decrease wealth"),
      difficulty: 1,
      questions: [
        { q: "What does charity do to wealth?", a: "It does not decrease it", wrong: ["It ruins it", "It halves it", "It hides it"], why: "Charity does not decrease wealth." },
        { q: "What does forgiving others bring?", a: "More honor from Allah", wrong: ["Shame", "Loss", "Nothing"], why: "No one forgives another except that Allah increases his honor." },
        { tf: false, q: "The garden owners lost wealth because they gave charity.", why: "Charity does not decrease wealth. They lost it by withholding." }
      ]
    },
    {
      slug: "such-is-the-punishment",
      title: "Such is the punishment",
      line: "So it is for the stingy who hold back the poor's right.",
      facts: ["The poor have a right", "The Hereafter is greater"],
      quote: q68(33),
      source: ik(33, "Ibn Kathir says such is the punishment of whoever is stingy with Allah's gifts and withholds the right of the poor and needy.", "withholds the right of the poor and needy"),
      difficulty: 2,
      questions: [
        { q: "Whose punishment is described?", a: "Those who withhold the poor's right", wrong: ["Those who give charity", "Those who pray", "Those who fast"], why: "Is stingy with what Allah has given him and withholds the right of the poor and needy." },
        { q: "Which punishment is greater?", a: "That of the Hereafter", wrong: ["That of this life", "They are equal", "Neither"], why: "But truly, the punishment of the Hereafter is greater if they but knew." },
        { tf: true, q: "The poor have a right in our wealth.", why: "Withholds the right of the poor and needy." }
      ]
    },
    {
      slug: "losing-what-you-misused",
      title: "Losing what you misused",
      line: "Allah may take away the very thing used for wrong.",
      facts: ["As-Sa'di explains", "When most needed"],
      quote: q68(33),
      source: saadi(68, 33, "As-Sa'di says a worldly punishment is that Allah takes away the very thing a person misused and preferred over the Hereafter, just when he needs it most.", "أن يسلب الله العبد الشيء الذي طغى به وبغى"),
      difficulty: 2,
      questions: [
        { q: "What might Allah take from one who misuses a blessing?", a: "That very blessing", wrong: ["Nothing at all", "Only his sleep", "Someone else's"], why: "He takes the thing he transgressed with, says as-Sa'di." },
        { q: "When was the garden taken, per as-Sa'di?", a: "When they needed it most", wrong: ["When they were away", "Years later", "Never"], why: "It is removed when he needs it most." },
        { tf: true, q: "The punishment of the Hereafter is greater.", why: "As-Sa'di on 68:33." }
      ]
    }
  ]
};

/** Ayahs 34 to 45: the Gardens of Delight, not equal to the criminals, the call to prostrate, and Allah's respite. */
const QALAM_FIVE: DeepUnit = {
  key: "qalam5",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-68",
  name: "Al-Qalam, ayahs 34 to 45",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Qalam",
  lessons: [
    {
      slug: "gardens-of-delight",
      title: "Gardens of Delight",
      line: "The pious get Gardens of Delight that will never end.",
      facts: ["Taqwa: mindfulness of Allah", "Unlike the worldly garden"],
      quote: q68(34),
      source: ik(34, "Ibn Kathir says, after the ruined worldly garden, Allah tells that the pious will have Gardens of Delight in the Hereafter that never end.", "they will have Gardens of Delight in the Hereafter that will never end"),
      difficulty: 1,
      questions: [
        { q: "Who gets the Gardens of Delight?", a: "Those who have Taqwa", wrong: ["The greedy", "The proud", "Everyone at once"], why: "Verily, for those who have Taqwa are Gardens of Delight with their Lord." },
        { q: "How long do those Gardens last?", a: "Forever", wrong: ["One night", "A year", "Until harvest"], why: "Gardens of Delight in the Hereafter that will never end." },
        { tf: true, q: "The gardens of Paradise never wither.", why: "These Gardens will last forever and their pleasures will never cease." }
      ]
    },
    {
      slug: "not-the-same",
      title: "Not the same",
      line: "Allah will never treat the Muslims like the criminals.",
      facts: ["Allah is just", "Deeds make a difference"],
      quote: q68(35),
      source: ik(35, "Ibn Kathir says Allah will not deal equally with them in reward: by the Lord of heaven and earth, surely not.", "Nay, by the Lord of the heaven and the earth, surely not"),
      difficulty: 2,
      questions: [
        { q: "What does 68:35 ask?", a: "Treat Muslims like criminals?", wrong: ["Who owns the garden?", "When is harvest?", "Where is the sea?"], why: "Shall We then treat the Muslims like the criminals?" },
        { q: "What is the answer, per Ibn Kathir?", a: "Surely not", wrong: ["Yes, equally", "Maybe", "Only sometimes"], why: "Nay, by the Lord of the heaven and the earth, surely not!" },
        { tf: false, q: "Good and evil people end up the same.", why: "Shall We then treat the Muslims like the criminals? Surely not!" }
      ]
    },
    {
      slug: "how-do-you-judge",
      title: "How do you judge?",
      line: "Allah asks: what is wrong with you, how can you think that?",
      facts: ["Use sound thinking", "Do not fool yourself"],
      quote: q68(36),
      source: ik(36, "Ibn Kathir explains What is the matter with you as: how can you think that?", "how can you think that"),
      difficulty: 2,
      questions: [
        { q: "What does 68:36 ask?", a: "How do you judge?", wrong: ["What is your name?", "Where do you live?", "Who is your king?"], why: "What is the matter with you? How judge you?" },
        { q: "What does Ibn Kathir say it means?", a: "How can you think that?", wrong: ["Go to sleep", "Leave the city", "Bring food"], why: "Meaning, how can you think that?" },
        { tf: true, q: "Thinking the wicked will be rewarded is unreasonable.", why: "What is the matter with you? How can you think that?" }
      ]
    },
    {
      slug: "do-you-have-a-book",
      title: "Do you have a book?",
      line: "Do they have a book from heaven promising all they wish?",
      facts: ["Claims need proof", "The Quran is the true Book"],
      quote: q68(37),
      source: ik(37, "Ibn Kathir says Allah asks: is there a Book sent down from heaven in your hands that you study, which says this?", "is there in your hands a Book that has been sent down from heaven"),
      difficulty: 2,
      questions: [
        { q: "What does 68:37 ask the deniers?", a: "Do you have a Book?", wrong: ["Do you have gold?", "Do you have a horse?", "Do you have a house?"], why: "Or have you a Book wherein you learn." },
        { q: "What kind of Book is meant?", a: "One sent from heaven", wrong: ["A storybook", "A poem book", "A trade ledger"], why: "Is there in your hands a Book that has been sent down from heaven that you study?" },
        { tf: false, q: "The deniers had a revealed book backing their claim.", why: "Do you have such a Book, containing definite laws, as you claim?" }
      ]
    },
    {
      slug: "whatever-you-choose",
      title: "Whatever you choose?",
      line: "Does any book promise them everything they choose?",
      facts: ["Wishes are not proof", "Only Allah decides"],
      quote: q68(38),
      source: ik(38, "Ibn Kathir explains: that you will attain all that you want and desire.", "that you will attain all that you want and desire"),
      difficulty: 2,
      questions: [
        { q: "What did they assume they would get?", a: "All they choose", wrong: ["Nothing", "Only a little", "Only punishment"], why: "That you shall therein have all that you choose." },
        { q: "Is a wish the same as a promise from Allah?", a: "No", wrong: ["Yes", "Sometimes", "Only on Fridays"], why: "Or have you a Book wherein you learn that you shall therein have all that you choose?" },
        { tf: true, q: "Only Allah decides who gets what in the Hereafter.", why: "That you will attain all that you want and desire? No such Book exists." }
      ]
    },
    {
      slug: "oaths-from-us",
      title: "Do you have a promise from Us?",
      line: "Do they hold oaths from Allah lasting until Judgement Day?",
      facts: ["No covenant for them", "Only Allah promises"],
      quote: q68(39),
      source: ik(39, "Ibn Kathir explains: do you have covenants and confirmed agreements with Us?", "do you have covenants and confirmed agreements with Us"),
      difficulty: 3,
      questions: [
        { q: "What does 68:39 ask?", a: "Do you have oaths from Us?", wrong: ["Do you have land?", "Do you have kings?", "Do you have stars?"], why: "Or have you oaths from Us, lasting until the Day of Judgement?" },
        { q: "How long would such oaths last?", a: "Until the Day of Judgement", wrong: ["One day", "One year", "Until harvest"], why: "Or have you oaths from Us, lasting until the Day of Judgement." },
        { tf: false, q: "Allah promised the deniers whatever they judge.", why: "Do you have covenants and confirmed agreements with Us? They have none." }
      ]
    },
    {
      slug: "who-will-guarantee",
      title: "Who will guarantee it?",
      line: "Ask them: which of them will guarantee that claim?",
      facts: ["Zaim: guarantor", "No one can guarantee it"],
      quote: q68(40),
      source: ik(40, "Ibn Abbas said it means: which of them will be guarantor for that?", "Which of them will be guarantor for that"),
      difficulty: 2,
      questions: [
        { q: "What should they be asked?", a: "Who will guarantee it?", wrong: ["Who will cook?", "Who will sing?", "Who will sleep?"], why: "Ask them, which of them will stand as surety for that!" },
        { q: "What did Ibn Abbas say Zaim means?", a: "Guarantor", wrong: ["Thief", "Farmer", "Guest"], why: "Ibn Abbas said that it means, Which of them will be guarantor for that?" },
        { tf: true, q: "No one can guarantee what only Allah decides.", why: "Ask them, which of them will stand as surety for that!" }
      ]
    },
    {
      slug: "bring-your-partners",
      title: "Bring your partners",
      line: "If they have partners with Allah, let them bring them.",
      facts: ["Idols cannot help", "A challenge they fail"],
      quote: q68(41),
      source: ik(41, "Ibn Kathir explains partners as: do they have idols and rival gods besides Allah?", "do they have idols and rivals gods"),
      difficulty: 2,
      questions: [
        { q: "What are the partners, per Ibn Kathir?", a: "Idols and false gods", wrong: ["Business partners", "Friends", "Teachers"], why: "Meaning, do they have idols and rivals gods besides Allah?" },
        { q: "What are they challenged to do?", a: "Bring their partners", wrong: ["Pay a tax", "Build a wall", "Plant a tree"], why: "Then let them bring their partners if they are truthful!" },
        { tf: false, q: "Their idols could answer the challenge.", why: "Then let them bring their partners if they are truthful!" }
      ]
    },
    {
      slug: "the-great-day",
      title: "That great Day",
      line: "On the Day of Judgement, all will be called to prostrate.",
      facts: ["A Day of great matters", "Believers will prostrate"],
      quote: q68(42),
      source: ik(42, "Ibn Kathir says 68:42 is about the Day of Judgement and the great matters that will happen on it.", "the Day of Judgement and the horrors, earthquakes, trials, tests and great matters"),
      difficulty: 2,
      questions: [
        { q: "Which Day does 68:42 describe?", a: "The Day of Judgement", wrong: ["A market day", "A wedding", "A holiday"], why: "Meaning, the Day of Judgement and the great matters that will occur during it." },
        { q: "What will people be called to do?", a: "Prostrate", wrong: ["Run", "Sing", "Sleep"], why: "And they shall be called to prostrate themselves, but they shall not be able to do so." },
        { tf: true, q: "The believers will prostrate to Allah on that Day.", why: "Every believing male and female will prostrate to Him." }
      ]
    },
    {
      slug: "prostrate-while-you-can",
      title: "Prostrate while you can",
      line: "Those who refused when healthy will not be able to then.",
      facts: ["Pray while healthy", "Sujud: prostration"],
      quote: q68(43),
      source: ik(43, "Ibn Kathir says they refused to prostrate in this life while healthy and safe, so they will be unable to in the Hereafter.", "they refused to do so even though they were healthy and secure"),
      difficulty: 2,
      questions: [
        { q: "When did they refuse to prostrate?", a: "In this life, while healthy", wrong: ["When ill only", "When asleep", "Never"], why: "When they were called to prostrate in the worldly life, they refused to do so even though they were healthy and secure." },
        { q: "What happens to them on that Day?", a: "They cannot prostrate", wrong: ["They rest", "They are crowned", "They fly away"], why: "They shall be called to prostrate themselves, but they shall not be able to do so." },
        { tf: false, q: "Prayer can wait until it is too late.", why: "They refused to do so even though they were healthy and secure." }
      ]
    },
    {
      slug: "do-not-be-fooled-by-ease",
      title: "Do not be fooled by ease",
      line: "Allah may give deniers ease that they wrongly think is honor.",
      facts: ["Istidraj: gradual seizing", "Ease can be a test"],
      quote: q68(44),
      source: ik(44, "Ibn Kathir says they think it is a noble blessing from Allah, but it is really a form of humiliation for them.", "they will believe that it is a noble blessing from Allah, but really the same matter is actually a form of humiliation"),
      difficulty: 3,
      questions: [
        { q: "What do the deniers wrongly think their ease is?", a: "A noble blessing", wrong: ["A warning", "A punishment", "A test"], why: "They will believe that it is a noble blessing from Allah, but really it is a form of humiliation." },
        { q: "From where does the gradual punishment come?", a: "Where they do not perceive", wrong: ["From where they expect", "From the sea", "From the stars"], why: "We shall punish them gradually from directions they perceive not." },
        { tf: true, q: "Wealth while sinning is not a sign of Allah's pleasure.", why: "They will believe that it is a noble blessing from Allah, but really it is a form of humiliation." }
      ]
    },
    {
      slug: "allah-gives-respite",
      title: "Allah gives time",
      line: "Allah gives the wrongdoer time, then seizes him without escape.",
      facts: ["Imla: respite", "Repent while you can"],
      quote: q68(45),
      source: hadith("bukhari", "4686", "Abu Musa", "Sahih", "The Prophet ﷺ said Allah gives respite to the oppressor, but when He seizes him, He does not let him go.", "Allah gives respite to the oppressor, but when He takes him over, He never releases him"),
      difficulty: 2,
      questions: [
        { q: "What does Allah give the oppressor first?", a: "Respite, time", wrong: ["Instant punishment", "A crown", "Nothing"], why: "Allah gives respite to the oppressor." },
        { q: "What happens when Allah seizes him?", a: "He never escapes", wrong: ["He runs away", "He is released", "He hides"], why: "But when He takes him over, He never releases him." },
        { tf: false, q: "Delay in punishment means no punishment.", why: "Allah gives respite to the oppressor, but when He takes him over, He never releases him." }
      ]
    }
  ]
};

/** Ayahs 46 to 52: no wage asked, patience unlike the Companion of the Fish, the evil eye, and a Reminder to all. */
const QALAM_SIX: DeepUnit = {
  key: "qalam6",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-68",
  name: "Al-Qalam, ayahs 46 to 52",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Qalam",
  lessons: [
    {
      slug: "no-wage-asked",
      title: "No wage asked",
      line: "The Prophet ﷺ called people to Allah without asking any payment.",
      facts: ["His reward is with Allah", "Dawah is free"],
      quote: q68(46),
      source: ik(46, "Ibn Kathir says the Prophet ﷺ called them to Allah without taking any wages, hoping for reward from Allah.", "call them to Allah without taking any wages from them"),
      difficulty: 1,
      questions: [
        { q: "Did the Prophet ﷺ ask for payment?", a: "No, never", wrong: ["Yes, gold", "Yes, camels", "Yes, land"], why: "You call them to Allah without taking any wages from them." },
        { q: "From whom did he hope for reward?", a: "From Allah", wrong: ["From the rich", "From kings", "From the crowd"], why: "Rather, you hope for the reward with Allah." },
        { tf: true, q: "The message of Islam was given freely.", why: "You call them to Allah without taking any wages from them." }
      ]
    },
    {
      slug: "the-unseen",
      title: "Do they own the Unseen?",
      line: "They own no Unseen; they reject from ignorance and pride.",
      facts: ["Ghayb: the Unseen", "Only Allah knows it"],
      quote: q68(47),
      source: ik(47, "Ibn Kathir says they reject what the Prophet ﷺ brought simply due to ignorance, disbelief and stubbornness.", "they reject that which you have brought to them simply due to ignorance, disbelief and obstinacy"),
      difficulty: 3,
      questions: [
        { q: "What does 68:47 ask?", a: "Is the Unseen in their hands?", wrong: ["Is the sea theirs?", "Is the moon theirs?", "Is the market theirs?"], why: "Or that the Unseen is in their hands, so that they can write it down?" },
        { q: "Why do they reject, per Ibn Kathir?", a: "Ignorance and stubbornness", wrong: ["Good evidence", "Deep study", "Lack of time"], why: "They reject that which you have brought to them simply due to ignorance, disbelief and obstinacy." },
        { tf: false, q: "The deniers knew the Unseen.", why: "Or that the Unseen is in their hands? It is not." }
      ]
    },
    {
      slug: "wait-with-patience",
      title: "Wait with patience",
      line: "He was told to be patient with their harm and rejection.",
      facts: ["Victory comes later", "Sabr is strength"],
      quote: q68(48),
      source: ik(48, "Ibn Kathir explains: persevere against the harm your people cause you, for Allah will give you and your followers victory.", "persevere against the harm your people cause you and their rejection"),
      difficulty: 2,
      questions: [
        { q: "What was the Prophet ﷺ told to do?", a: "Wait with patience", wrong: ["Give up", "Get angry", "Leave forever"], why: "So, wait with patience for the decision of your Lord." },
        { q: "What would Allah give him, per Ibn Kathir?", a: "Final victory", wrong: ["Defeat", "Wealth only", "Nothing"], why: "Allah will give you authority over them, and make the final victory for you and your followers." },
        { tf: true, q: "Patience leads to good results.", why: "Make the final victory for you and your followers in this life and the Hereafter." }
      ]
    },
    {
      slug: "companion-of-the-fish",
      title: "The Companion of the Fish",
      line: "The Companion of the Fish is Prophet Yunus, who left his people.",
      facts: ["Dhun-Nun: Yunus", "He left in anger"],
      quote: q68(48),
      source: ik(48, "Ibn Kathir says the Companion of the Fish is Dhun-Nun, Yunus bin Matta, who went off angry with his people.", "who was Yunus bin Matta, when he went off angry with his people"),
      difficulty: 2,
      questions: [
        { q: "Who is the Companion of the Fish?", a: "Prophet Yunus", wrong: ["Prophet Musa", "Prophet Nuh", "Prophet Hud"], why: "Meaning, Dhun-Nun, who was Yunus bin Matta." },
        { q: "How did Yunus leave his people?", a: "Angry", wrong: ["Happy", "Asleep", "With a feast"], why: "When he went off angry with his people." },
        { tf: false, q: "The Prophet ﷺ was told to be exactly like Yunus in leaving.", why: "And be not like the Companion of the Fish." }
      ]
    },
    {
      slug: "distressed-in-the-dark",
      title: "Calling out in distress",
      line: "In the darkness, Yunus called to Allah, deeply distressed.",
      facts: ["Makzum: distressed", "Allah hears every call"],
      quote: q68(48),
      source: ik(48, "Ibn Abbas, Mujahid and As-Suddi said Makzum means while he was distressed.", "while he was distressed"),
      difficulty: 2,
      questions: [
        { q: "What does Makzum mean?", a: "Distressed", wrong: ["Joyful", "Hungry", "Sleepy"], why: "Ibn Abbas, Mujahid and As-Suddi all said, while he was distressed." },
        { q: "What did Yunus do in the darkness?", a: "He called out to Allah", wrong: ["He slept", "He gave up", "He sang"], why: "He called out from the layers of darkness." },
        { tf: true, q: "We can call on Allah in any hardship.", why: "When he cried out to Us while he was Makzum." }
      ]
    },
    {
      slug: "the-dua-of-yunus",
      title: "The dua of Yunus",
      line: "He said: none is worthy of worship but You; I did wrong.",
      facts: ["La ilaha illa Anta", "Admit and repent"],
      quote: q68(49),
      source: ik(49, "Ibn Kathir quotes the call of Yunus in 21:87: none has the right to be worshipped but You, glory be to You, I was of the wrongdoers.", "That none has the right to be worshipped but You"),
      difficulty: 2,
      questions: [
        { q: "What did Yunus say?", a: "None to be worshipped but You", wrong: ["Save me, sea", "I am the best", "Nothing"], why: "That none has the right to be worshipped but You, Glorified are You! Truly, I have been of the wrongdoers." },
        { q: "What saved him, per 68:49?", a: "Grace from his Lord", wrong: ["A ship", "His strength", "A friend"], why: "Had not a grace from his Lord reached him." },
        { tf: false, q: "Yunus blamed others in his dua.", why: "Truly, I have been of the wrongdoers." }
      ]
    },
    {
      slug: "chosen-and-righteous",
      title: "Chosen and righteous",
      line: "Then his Lord chose him and made him one of the righteous.",
      facts: ["Allah honored Yunus", "Respect all prophets"],
      quote: q68(50),
      source: hadith("bukhari", "3416", "Abu Hurairah", "Sahih", "The Prophet ﷺ said no one should say that he is better than Yunus bin Matta.", "None should say that I am better than Yunus bin Matta"),
      difficulty: 2,
      questions: [
        { q: "What did Allah do for Yunus after?", a: "Chose him, made him righteous", wrong: ["Forgot him", "Punished him more", "Sent him away"], why: "Then his Lord chose him and made him of the righteous." },
        { q: "What did the Prophet ﷺ say about Yunus?", a: "None should say I am better than him", wrong: ["He was weak", "He was not a prophet", "He was a king"], why: "None should say that I am better than Yunus bin Matta." },
        { tf: true, q: "We must honor every prophet.", why: "None should say that I am better than Yunus bin Matta." }
      ]
    },
    {
      slug: "looks-of-hatred",
      title: "Looks of hatred",
      line: "The deniers stared at him with hatred, almost making him slip.",
      facts: ["Envy is harmful", "Allah protected him"],
      quote: q68(51),
      source: ik(51, "Ibn Kathir says they were jealous of him out of hatred, and had Allah not protected him, their evil eye would have harmed him.", "they are jealous of you due to their hatred of you"),
      difficulty: 3,
      questions: [
        { q: "What did the deniers almost do with their eyes?", a: "Make him slip", wrong: ["Make him laugh", "Make him rich", "Make him sleep"], why: "Those who disbelieve would almost make you slip with their eyes." },
        { q: "Why did they look at him that way?", a: "Jealousy and hatred", wrong: ["Love", "Respect", "Curiosity"], why: "They are jealous of you due to their hatred of you." },
        { tf: false, q: "Allah left His Prophet without protection.", why: "Were it not for Allah's protection of you, defending you against them." }
      ]
    },
    {
      slug: "the-evil-eye-is-real",
      title: "The evil eye is real",
      line: "He said: the effect of the evil eye is a fact.",
      facts: ["Al-Ayn: the evil eye", "Seek Allah's protection"],
      quote: q68(51),
      source: hadith("bukhari", "5740", "Abu Hurairah", "Sahih", "The Prophet ﷺ said the effect of the evil eye is a fact.", "The effect of an evil eye is a fact"),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ say about the evil eye?", a: "Its effect is a fact", wrong: ["It is a myth", "It is a game", "It is a dream"], why: "The effect of an evil eye is a fact." },
        { q: "Who narrated it?", a: "Abu Hurairah", wrong: ["Abu Lahab", "Haman", "Qarun"], why: "Narrated Abu Huraira: The Prophet ﷺ said, The effect of an evil eye is a fact." },
        { tf: true, q: "Ibn Kathir says 68:51 proves the evil eye is real.", why: "In this Ayah is a proof that the effect of the evil eye and its affliction by the command of Allah is real." }
      ]
    },
    {
      slug: "say-barakallah",
      title: "Ask Allah to bless it",
      line: "When you like something of your brother, ask Allah to bless it.",
      facts: ["Say Barakallah", "Wish others good"],
      quote: q68(51),
      source: ik(51, "Ibn Kathir reports the Prophet ﷺ said: if one of you sees something of his brother that he likes, let him pray for blessings for him.", "If one of you sees something of his brother that he likes, then let him supplicate for blessings for him"),
      difficulty: 1,
      questions: [
        { q: "What should you do when you admire something of a friend?", a: "Ask Allah to bless it", wrong: ["Stare at it", "Envy it", "Take it"], why: "If one of you sees something of his brother that he likes, then let him supplicate for blessings for him." },
        { q: "Which words fit that moment?", a: "Barakallah, may Allah bless it", wrong: ["I want it", "Give it to me", "Nothing"], why: "Then he should ask Allah to bless it, for verily, the evil eye is real." },
        { tf: false, q: "Envying what others have is fine.", why: "If one of you sees something of his brother that he likes, then let him supplicate for blessings for him." }
      ]
    },
    {
      slug: "the-prophets-protection-dua",
      title: "A dua of protection",
      line: "He sought protection for his grandsons with Allah's words.",
      facts: ["As Ibrahim did for his sons", "Al-Hasan and Al-Husayn"],
      quote: q68(51),
      source: hadith("bukhari", "3371", "Ibn Abbas", "Sahih", "The Prophet ﷺ sought refuge for Al-Hasan and Al-Husain with Allah's perfect words from every devil, harmful creature and envious eye, as Ibrahim did for his sons.", "I seek Refuge with Your Perfect Words from every devil"),
      difficulty: 3,
      questions: [
        { q: "With what did the Prophet ﷺ seek refuge?", a: "Allah's perfect words", wrong: ["A charm", "A stone", "A thread"], why: "O Allah! I seek Refuge with Your Perfect Words from every devil." },
        { q: "Which prophet used the same words for his sons?", a: "Ibrahim", wrong: ["Musa", "Isa", "Yunus"], why: "Your forefather, Abraham, used to seek Refuge with Allah for Ishmael and Isaac." },
        { tf: true, q: "Protection is sought from Allah, not from charms.", why: "I seek Refuge with Your Perfect Words from every devil and from every evil, harmful, envious eye." }
      ]
    },
    {
      slug: "called-a-madman",
      title: "Called a madman",
      line: "They attacked him with looks and words, calling him a madman.",
      facts: ["Insults are not arguments", "He stayed patient"],
      quote: q68(51),
      source: ik(51, "Ibn Kathir says they attacked him with their eyes and their tongues, calling him a madman because he brought the Quran.", "they cut at him with their eyes and attack him with their tongues"),
      difficulty: 2,
      questions: [
        { q: "What did they call the Prophet ﷺ?", a: "A madman", wrong: ["A king", "A poet laureate", "A merchant"], why: "And they say: Verily, he is a madman!" },
        { q: "Why did they say this?", a: "Because he brought the Quran", wrong: ["He was ill", "He forgot names", "He was rude"], why: "They say this because he came with the Quran." },
        { tf: false, q: "Calling names proves an argument right.", why: "You, by the grace of your Lord, are not insane." }
      ]
    },
    {
      slug: "a-reminder-to-all",
      title: "A Reminder to all",
      line: "The Quran is nothing but a Reminder to all the worlds.",
      facts: ["Dhikr: a reminder", "For every people"],
      quote: q68(52),
      source: ik(52, "Ibn Kathir ends Al-Qalam with 68:52: it is nothing else but a Reminder to all the creatures.", "But it is nothing else but a Reminder to all the creatures"),
      difficulty: 1,
      questions: [
        { q: "What is the Quran, per 68:52?", a: "A Reminder to all", wrong: ["A poem", "A history book", "A song"], why: "But it is nothing else than a Reminder to all the creatures." },
        { q: "For whom is the Reminder?", a: "All the worlds", wrong: ["One tribe", "Only Arabs", "Only scholars"], why: "A Reminder to all the creatures, Alamin." },
        { tf: true, q: "The Quran is for all people everywhere.", why: "But it is nothing else but a Reminder to all the creatures." }
      ]
    }
  ]
};

export const QALAM_UNITS: readonly DeepUnit[] = [QALAM_ONE, QALAM_TWO, QALAM_THREE, QALAM_FOUR, QALAM_FIVE, QALAM_SIX];
