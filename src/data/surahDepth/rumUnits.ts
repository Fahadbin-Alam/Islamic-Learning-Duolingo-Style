import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Ar-Rum ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Ar-Rum 30:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_30_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Ar-Rum 30:${ayah}`,
    url: `https://quran.com/30:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 30:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q30 = (ayah: number) => quranQuote(30, ayah);

/** Ayahs 1 to 19: the Romans foretold, a promise kept, signs in ourselves, the Day people separate, and glorifying Allah morning and evening. */
const RUM_ONE: DeepUnit = {
  key: "rum1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-30",
  name: "Ar-Rum, ayahs 1 to 19",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ar-Rum",
  lessons: [
    {
      slug: "the-romans-defeated",
      title: "The Romans defeated",
      line: "Alif Lam Mim. The Romans were beaten in the nearest land.",
      facts: ["Persia beat Rome first", "The Quran told what came next"],
      quote: q30(1),
      source: ik(1, "These ayahs came when Persia had beaten the Romans in Ash-Sham. Heraclius fled to Constantinople, then later won back the upper hand.", "Then Heraclius regained the upper hand"),
      difficulty: 3,
      questions: [
        { q: "Who was defeated, in 30:2?", a: "The Romans", wrong: ["The Persians", "The Quraysh", "The Egyptians"], why: "The Romans have been defeated." },
        { q: "Who beat them at first, per Ibn Kathir?", a: "The king of Persia", wrong: ["The Quraysh", "The Greeks", "The Turks"], why: "These Ayat were revealed about the victory of Sabur, the king of Persia, over Ash-Sham." },
        { q: "Where did Heraclius flee, per Ibn Kathir?", a: "Constantinople", wrong: ["Makkah", "Damascus", "Rome"], why: "Heraclius, the emperor of the Romans, was forced to flee to Constantinople." }
      ]
    },
    {
      slug: "who-wanted-whom",
      title: "Who wanted whom to win",
      line: "Muslims hoped Rome would win, as they too had a Book.",
      facts: ["Idol worshippers backed Persia", "Muslims backed the People of the Book"],
      quote: q30(2),
      source: ik(2, "The idolators wanted Persia to win, since both worshipped idols. The Muslims wanted Rome to win, since they were People of the Book.", "the Muslims wanted the Romans to prevail over the Persians, because they were People of the Book"),
      difficulty: 3,
      questions: [
        { q: "Whom did the Muslims hope would win, per Ibn Kathir?", a: "The Romans", wrong: ["The Persians", "No one", "The Arabs"], why: "The Muslims wanted the Romans to prevail over the Persians, because they were People of the Book." },
        { q: "Why did the idolators favor Persia, per Ibn Kathir?", a: "They also worshipped idols", wrong: ["Persia was near", "Persia paid them", "Persia was Muslim"], why: "The idolators wanted the Persians to prevail over the Romans, because they were idol worshippers." },
        { tf: true, q: "The Prophet ﷺ said the Romans would certainly prevail.", why: "The Messenger of Allah said: They will certainly prevail." }
      ]
    },
    {
      slug: "victory-in-a-few-years",
      title: "Victory in a few years",
      line: "After defeat, the Romans would win within a few years.",
      facts: ["Bid means under ten", "Allah's word came true"],
      quote: q30(3),
      source: ik(3, "Allah foretold the Romans would win after their defeat. Sa'id bin Jubayr said Bid means fewer than ten years, and so it happened.", "means less than ten"),
      difficulty: 3,
      questions: [
        { q: "What would follow their defeat, in 30:3?", a: "Victory", wrong: ["More defeat", "Peace forever", "Exile"], why: "And they, after their defeat, will be victorious." },
        { q: "What does Bid mean, per Sa'id bin Jubayr?", a: "Fewer than ten", wrong: ["A hundred", "Exactly two", "Forty"], why: "Sa'id bin Jubayr said: Bid means less than ten." },
        { tf: true, q: "Abu Bakr told the people of Makkah of the prophecy.", why: "Abu Bakr went out proclaiming throughout Makkah." }
      ]
    },
    {
      slug: "the-matter-is-with-allah",
      title: "The matter is with Allah",
      line: "The decision, before and after, belongs to Allah alone.",
      facts: ["Allah decides outcomes", "Many became Muslim then"],
      quote: q30(4),
      source: ik(4, "Allah decides every matter, before and after. When the Romans did win, as the Quran said, many people became Muslim.", "At that time, many people became Muslim"),
      difficulty: 3,
      questions: [
        { q: "With whom is the decision, in 30:4?", a: "With Allah alone", wrong: ["With kings", "With armies", "With luck"], why: "The decision of the matter, before and after is only with Allah." },
        { q: "What happened when the Romans won, per Ibn Kathir?", a: "Many became Muslim", wrong: ["Makkah fell", "War ended forever", "Nothing"], why: "At that time, many people became Muslim." },
        { q: "Who would rejoice that day, in 30:4?", a: "The believers", wrong: ["The idolators", "The Persians", "No one"], why: "And on that day, the believers will rejoice." }
      ]
    },
    {
      slug: "joy-on-the-day-of-badr",
      title: "Joy on the day of Badr",
      line: "Rome beat Persia the same day Muslims won at Badr.",
      facts: ["Two victories at once", "Allah helps whom He wills"],
      quote: q30(5),
      source: ik(8, "Many scholars said the Romans beat the Persians on the day of Badr, so the believers had two reasons to rejoice.", "the victory of the Romans over the Persians happened on the same day as the battle of Badr"),
      difficulty: 4,
      questions: [
        { q: "Whom does Allah help, in 30:5?", a: "Whom He wills", wrong: ["Only the rich", "No one", "The strongest"], why: "With the help of Allah. He helps whom He wills." },
        { q: "On which day did Rome win, per many scholars?", a: "The day of Badr", wrong: ["The day of Uhud", "The day of Hijrah", "The day of Eid"], why: "The victory of the Romans over the Persians happened on the same day as the battle of Badr." },
        { q: "Which Names end 30:5?", a: "All-Mighty, Most Merciful", wrong: ["All-Hearing, All-Seeing", "Most High, Most Great", "First, Last"], why: "And He is the All-Mighty, the Most Merciful." }
      ]
    },
    {
      slug: "allah-keeps-his-promise",
      title: "Allah keeps His promise",
      line: "A promise from Allah, and Allah never breaks His promise.",
      facts: ["Allah's word comes true", "Most people do not know"],
      quote: q30(6),
      source: ik(9, "The news that Rome would beat Persia was a true promise from Allah that could not change and surely came to pass.", "is a true promise from Allah, truth which cannot be changed"),
      difficulty: 3,
      questions: [
        { q: "Does Allah fail His promise, in 30:6?", a: "Never", wrong: ["Sometimes", "Often", "Only in war"], why: "A promise from Allah, and Allah fails not in His promise." },
        { q: "What do most men not know, per Ibn Kathir?", a: "Allah's decree in His creation", wrong: ["Their names", "The weather", "Their wealth"], why: "They do not know the decree of Allah concerning His creation." },
        { tf: true, q: "Ibn Kathir says Allah's actions are wise and just.", why: "But what He does is wise and is based on justice." }
      ]
    },
    {
      slug: "only-the-outer-world",
      title: "Only the outer world",
      line: "They know the surface of this life but forget the Hereafter.",
      facts: ["Worldly skill is not enough", "Learn your religion too"],
      quote: q30(7),
      source: ik(10, "Al-Hasan Al-Basri said some can weigh a coin on a fingertip, yet do not know how to pray properly.", "but he does not know how to pray properly"),
      difficulty: 3,
      questions: [
        { q: "What do they know, in 30:7?", a: "The outer side of worldly life", wrong: ["The Hereafter", "The unseen", "Nothing at all"], why: "They know only the outer appearance of the life of the world." },
        { q: "What are they heedless of, in 30:7?", a: "The Hereafter", wrong: ["Their trade", "Their food", "Their homes"], why: "And they are heedless of the Hereafter." },
        { q: "What could the man not do, per Al-Hasan Al-Basri?", a: "Pray properly", wrong: ["Weigh coins", "Trade well", "Count money"], why: "He could put a Dirham on his finger and tell how much it weighs, but he does not know how to pray properly." }
      ]
    },
    {
      slug: "causes-without-the-causer",
      title: "Causes without the Causer",
      line: "They see the causes but forget the One who runs them.",
      facts: ["As-Sa'di explains", "Heedless of the Hereafter"],
      quote: q30(7),
      source: saadi(30, 7, "As-Sa'di says those who know only the outer side of this life look at causes and stop there, not seeing the One who controls them; some are brilliant in worldly inventions yet heedless of their religion.", "فهم واقفون مع الأسباب غير ناظرين إلى مسببها المتصرف فيها"),
      difficulty: 2,
      questions: [
        { q: "What do those who know only this world miss, per as-Sa'di?", a: "The One who controls the causes", wrong: ["The weather", "The news", "The markets"], why: "They stop at causes and do not look to the One behind them." },
        { q: "Can a person be clever in worldly things yet heedless of the Hereafter?", a: "Yes", wrong: ["No, never", "Only children", "Only the poor"], why: "Some are brilliant in worldly inventions yet heedless of their religion." },
        { tf: true, q: "Neither longing for Paradise nor fearing the Fire is a sign of heedlessness.", why: "As-Sa'di on 30:7." }
      ]
    },
    {
      slug: "reflect-on-yourselves",
      title: "Reflect on yourselves",
      line: "Allah made the heavens and earth with truth, for a set term.",
      facts: ["Creation is not in vain", "The Day is the appointed time"],
      quote: q30(8),
      source: ik(10, "Pondering creation shows Allah made it in truth, not in jest, lasting until an appointed time, the Day of Resurrection.", "realizing that this was not created in jest or in vain, but in truth"),
      difficulty: 3,
      questions: [
        { q: "How did Allah create the heavens and earth, in 30:8?", a: "With truth, for a term", wrong: ["By chance", "For play", "Forever unchanged"], why: "Allah has created not the heavens and the earth... except with truth and for an appointed term." },
        { q: "What is the appointed time, per Ibn Kathir?", a: "The Day of Resurrection", wrong: ["Next year", "Sunset", "Ramadan"], why: "It will continue until an appointed time, the Day of Resurrection." },
        { tf: true, q: "In 30:8 many people deny meeting their Lord.", why: "And indeed many of mankind deny meeting with their Lord." }
      ]
    },
    {
      slug: "stronger-nations-before",
      title: "Stronger nations before",
      line: "Earlier nations were stronger and built more, yet they fell.",
      facts: ["Power cannot save", "Allah wrongs no one"],
      quote: q30(9),
      source: ik(10, "Past nations had more wealth, strength and building, yet when they denied their Messengers, nothing protected them. Allah was not unjust to them.", "Allah was not at all unjust towards them"),
      difficulty: 4,
      questions: [
        { q: "How were the earlier nations, in 30:9?", a: "Stronger and more numerous", wrong: ["Weaker", "Poorer", "Fewer"], why: "They were superior to them in strength, and they tilled the earth and populated it in greater numbers." },
        { q: "Who wronged them, in 30:9?", a: "They wronged themselves", wrong: ["Allah", "The Messengers", "Their neighbors"], why: "Surely, Allah wronged them not, but they used to wrong themselves." },
        { q: "How much of their wealth was Quraysh given, per Ibn Kathir?", a: "Not one tenth", wrong: ["Twice as much", "The same", "Half"], why: "You have not been given one-tenth of what they were given." }
      ]
    },
    {
      slug: "the-end-of-mocking",
      title: "The end of mocking",
      line: "Those who mocked Allah's signs met an evil end.",
      facts: ["Respect Allah's signs", "Sins lead to more sins"],
      quote: q30(10),
      source: ik(10, "They brought ruin on themselves by rejecting and mocking the signs of Allah, because of their earlier sins.", "They brought destruction upon themselves, when they rejected and mocked the signs of Allah"),
      difficulty: 4,
      questions: [
        { q: "Why was their end evil, in 30:10?", a: "They denied and mocked the Ayat", wrong: ["They were poor", "They traveled", "They were few"], why: "Because they denied the Ayat of Allah and made a mockery of them." },
        { q: "Who brought ruin on them, per Ibn Kathir?", a: "They themselves", wrong: ["Their Prophets", "Their children", "Strangers"], why: "They brought destruction upon themselves, when they rejected and mocked the signs of Allah." },
        { tf: true, q: "Ibn Kathir links 30:10 to 61:5 about hearts turning away.", why: "So when they turned away, Allah turned their hearts away. (61:5)" }
      ]
    },
    {
      slug: "he-begins-and-repeats",
      title: "He begins and repeats",
      line: "Allah starts creation, repeats it, and to Him you return.",
      facts: ["The first creation proves the second", "Each is repaid for deeds"],
      quote: q30(11),
      source: ik(11, "As Allah created at first, He can create again. Then all return to Him on the Day of Resurrection to be repaid for their deeds.", "Just as He was able to create it in the first place, so He is also able to repeat it"),
      difficulty: 3,
      questions: [
        { q: "What does Allah do, in 30:11?", a: "Begins creation and repeats it", wrong: ["Only begins it", "Only ends it", "Forgets it"], why: "Allah originates the creation, then He will repeat it." },
        { q: "How is each person repaid, per Ibn Kathir?", a: "By his deeds", wrong: ["By his wealth", "By his family", "By his looks"], why: "When each will be requited according to his deeds." },
        { tf: true, q: "To Allah we will all be returned, in 30:11.", why: "Then to Him you will be returned." }
      ]
    },
    {
      slug: "hope-ends-for-sinners",
      title: "Hope ends for sinners",
      line: "When the Hour comes, the sinners will be in despair.",
      facts: ["Repent before the Hour", "Hope is for now"],
      quote: q30(12),
      source: ik(12, "When the Hour comes, Ibn Abbas said, the sinners will be filled with despair; Mujahid said they will grieve.", "The sinners will be filled with despair"),
      difficulty: 3,
      questions: [
        { q: "How are the sinners that Day, in 30:12?", a: "In despair", wrong: ["Joyful", "Calm", "Proud"], why: "The criminals will be plunged into destruction with despair." },
        { q: "What did Ibn Abbas say they feel?", a: "Despair", wrong: ["Joy", "Hunger", "Sleepiness"], why: "Ibn Abbas said: The sinners will be filled with despair." },
        { q: "What did Mujahid also say?", a: "The sinners will grieve", wrong: ["The sinners will sleep", "The sinners will win", "The sinners will hide"], why: "According to another report he said: The sinners will grieve." }
      ]
    },
    {
      slug: "no-intercessors",
      title: "No intercessors",
      line: "Their false gods will not speak for them that Day.",
      facts: ["Idols cannot help", "They disown each other"],
      quote: q30(13),
      source: ik(13, "The gods they worshipped will not intercede for them. They will reject and betray them when they need them most.", "the gods whom they used to worship instead of Allah will not intercede for them"),
      difficulty: 3,
      questions: [
        { q: "Who will not intercede, in 30:13?", a: "Those they made equal with Allah", wrong: ["The angels", "The Prophets", "The believers"], why: "No intercessors will they have from those whom they made equal with Allah." },
        { q: "What will they do to their partners, in 30:13?", a: "Reject and deny them", wrong: ["Praise them", "Follow them", "Thank them"], why: "And they will reject and deny their partners." },
        { tf: true, q: "Ibn Kathir says the false gods betray them in their need.", why: "They will reject them and betray them despite their desperate need of them." }
      ]
    },
    {
      slug: "the-day-of-separation",
      title: "The Day of separation",
      line: "When the Hour comes, people will be split into groups.",
      facts: ["Each goes his own way", "Choose your path now"],
      quote: q30(14),
      source: ik(14, "On that Day people are separated by their deeds. Qatadah said this separation will have no reunion afterwards.", "this refers to the separation after which there will be no reunion"),
      difficulty: 4,
      questions: [
        { q: "What happens to people that Day, in 30:14?", a: "They are separated", wrong: ["They sleep", "They return home", "They trade"], why: "That Day shall they be separated." },
        { q: "What did Qatadah say about the separation?", a: "No reunion after it", wrong: ["It lasts an hour", "It is a dream", "It is only for kings"], why: "This refers to the separation after which there will be no reunion." },
        { tf: false, q: "In 30:14 everyone ends up in the same place.", why: "And on the Day when the Hour will be established, that Day shall they be separated." }
      ]
    },
    {
      slug: "the-garden-of-delight",
      title: "The Garden of Delight",
      line: "Believers who do good will be honored in a Garden of Delight.",
      facts: ["Faith with good deeds", "Joy that never ends"],
      quote: q30(15),
      source: ik(15, "Believers who did good deeds will be honored in a garden of delight. Mujahid and Qatadah said they will enjoy a life of luxury.", "they will enjoy a life of luxury"),
      difficulty: 3,
      questions: [
        { q: "Where are the good believers, in 30:15?", a: "A Garden of Delight", wrong: ["A desert", "A market", "A palace on earth"], why: "Such shall be honored and made to enjoy a luxurious life in a Garden of Delight." },
        { q: "What two things are needed, in 30:15?", a: "Faith and good deeds", wrong: ["Wealth and fame", "Sleep and food", "Strength and speed"], why: "Then as for those who believed and did righteous good deeds." },
        { q: "What did Mujahid and Qatadah say it means?", a: "A life of luxury", wrong: ["A short rest", "Hard work", "A long trip"], why: "This means, they will enjoy a life of luxury." }
      ]
    },
    {
      slug: "those-who-denied",
      title: "Those who denied",
      line: "Those who denied the signs and the meeting face punishment.",
      facts: ["Believe in the Hereafter", "Allah is just"],
      quote: q30(16),
      source: ik(16, "Those who denied the Ayat and the meeting of the Hereafter will be brought to punishment, the opposite of the believers.", "those who disbelieved and denied Our Ayat, and the meeting of the Hereafter"),
      difficulty: 3,
      questions: [
        { q: "What did they deny, in 30:16?", a: "The Ayat and the Hereafter", wrong: ["Only the sun", "Their parents", "Their trade"], why: "And as for those who disbelieved and denied Our Ayat, and the meeting of the Hereafter." },
        { q: "To what are they brought, in 30:16?", a: "The torment", wrong: ["A feast", "A garden", "A palace"], why: "Such shall be brought forth to the torment." },
        { tf: true, q: "30:15 and 30:16 describe two different ends.", why: "Those who believed... in a Garden of Delight. And as for those who disbelieved... brought forth to the torment." }
      ]
    },
    {
      slug: "glorify-morning-and-evening",
      title: "Glorify morning and evening",
      line: "Glorify Allah in the evening and in the morning.",
      facts: ["Dhikr at set times", "Ibn Kathir links it to prayer"],
      quote: q30(17),
      source: ik(17, "Allah tells His servants to glorify and praise Him at the times that come one after another, as night falls and as day breaks.", "commands His servants to glorify and praise Him at these times"),
      difficulty: 3,
      questions: [
        { q: "When should we glorify Allah, in 30:17?", a: "Evening and morning", wrong: ["Only Fridays", "Only in Ramadan", "Once a year"], why: "So glorify Allah, when you enter the evening, and when you enter the morning." },
        { q: "What heading does Ibn Kathir give 30:17?", a: "The command to pray five times", wrong: ["The story of Rome", "The rules of trade", "The story of Nuh"], why: "The Command to pray Five Times Daily." },
        { tf: true, q: "Night and day show Allah's might, per Ibn Kathir.", why: "At these times which come one after the other and are indicative of His might and power." }
      ]
    },
    {
      slug: "all-praise-is-his",
      title: "All praise is His",
      line: "All praise in heaven and earth is His, at night and noon.",
      facts: ["Praise Allah all day", "He made night and day"],
      quote: q30(18),
      source: ik(18, "Allah is praised for all He created. Ashiyy is the darkest part of night, and Izhar the brightest part of the day.", "is the time when the darkness is most intense"),
      difficulty: 4,
      questions: [
        { q: "Where is all praise His, in 30:18?", a: "In the heavens and the earth", wrong: ["Only in Makkah", "Only in the sky", "Only at sea"], why: "And His is all the praise in the heavens and the earth." },
        { q: "What is the Ashiyy, per Ibn Kathir?", a: "The darkest time", wrong: ["Sunrise", "Noon", "Lunch"], why: "The Ashiyy is the time when the darkness is most intense." },
        { q: "What is Izhar, per Ibn Kathir?", a: "The brightest part of day", wrong: ["Midnight", "Dawn mist", "A star"], why: "And Izhar is the brightest point of the day." }
      ]
    },
    {
      slug: "living-from-the-dead",
      title: "Living from the dead",
      line: "He brings the living from the dead and revives dry earth.",
      facts: ["Seeds become plants", "So we will be raised"],
      quote: q30(19),
      source: ik(19, "Allah creates things and their opposites: the plant from the seed and the seed from the plant, the chick from the egg and the egg from the hen.", "He creates the plant from the seed and the seed from the plant"),
      difficulty: 3,
      questions: [
        { q: "What does Allah bring from the dead, in 30:19?", a: "The living", wrong: ["Only stones", "Nothing", "Only water"], why: "He brings out the living from the dead." },
        { q: "Which example does Ibn Kathir give?", a: "The plant from the seed", wrong: ["Gold from rock", "Fire from ice", "Rain from sand"], why: "He creates the plant from the seed and the seed from the plant." },
        { q: "What does the revived earth teach, in 30:19?", a: "We too will be raised", wrong: ["Rain is luck", "Seeds are magic", "Nothing"], why: "And He revives the earth after its death. And thus shall you be brought out." }
      ]
    }
  ]
};

/** Ayahs 20 to 32: signs in our creation, marriage, languages, sleep, lightning, the parable of partners, and the Fitrah. */
const RUM_TWO: DeepUnit = {
  key: "rum2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-30",
  name: "Ar-Rum, ayahs 20 to 32",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ar-Rum",
  lessons: [
    {
      slug: "created-from-dust",
      title: "Created from dust",
      line: "Allah made you from dust, and now you spread over the earth.",
      facts: ["Adam was made from dust", "We grow from weak to strong"],
      quote: q30(20),
      source: ik(20, "Allah created our father Adam from dust. Then each person grows from weakness to strength, learning skills and spreading over the earth.", "He created your father Adam out of dust"),
      difficulty: 3,
      questions: [
        { q: "From what did Allah create us, in 30:20?", a: "Dust", wrong: ["Fire", "Light", "Smoke"], why: "And among His signs is this that He created you from dust." },
        { q: "Whom did Allah make from dust, per Ibn Kathir?", a: "Our father Adam", wrong: ["The angels", "The jinn", "The stars"], why: "Is the fact that He created your father Adam out of dust." },
        { q: "What are we now, in 30:20?", a: "Human beings scattered", wrong: ["Stones", "Angels", "Birds"], why: "And then, behold you are human beings scattered!" }
      ]
    },
    {
      slug: "colors-like-the-earth",
      title: "Colors like the earth",
      line: "Adam came from all of the earth, so people differ like soil.",
      facts: ["Our colors are a sign", "No color is better"],
      quote: q30(20),
      source: hadith("tirmidhi", "2955", "Abu Musa al-Ash'ari", "Sahih", "The Prophet ﷺ said Allah created Adam from a handful taken from all the earth, so his children differ like the earth: red, white, black and in between.", "Indeed Allah Most High created Adam from a handful that He took from all of the earth"),
      difficulty: 4,
      questions: [
        { q: "From how much of the earth was Adam made, in the hadith?", a: "A handful from all of it", wrong: ["One valley", "One mountain", "One river bank"], why: "Allah created Adam from a handful that He took from all of the earth." },
        { q: "Why do people differ in color, in the hadith?", a: "They are like the earth", wrong: ["The sun burned them", "By chance", "Their food"], why: "So the children of Adam come in according with the earth." },
        { tf: true, q: "The hadith names red, white and black people.", why: "Some of them come red, and white and black, and between that." }
      ]
    },
    {
      slug: "love-and-mercy",
      title: "Love and mercy",
      line: "Allah made spouses for you, and put love and mercy between you.",
      facts: ["Marriage is a sign", "Find peace in each other"],
      quote: q30(21),
      source: ik(21, "Out of His perfect mercy, Allah made spouses of our own kind and created love and kindness between them.", "He made their wives from their own kind, and created love and kindness between them"),
      difficulty: 3,
      questions: [
        { q: "What did Allah put between spouses, in 30:21?", a: "Affection and mercy", wrong: ["Fear and anger", "Silence", "Rivalry"], why: "And He has put between you affection and mercy." },
        { q: "Why were spouses made, in 30:21?", a: "To find repose in them", wrong: ["To compete", "To be rich", "To be famous"], why: "That you may find repose in them." },
        { q: "From whom are our spouses made, per Ibn Kathir?", a: "Our own kind", wrong: ["The jinn", "Animals", "Angels"], why: "Out of Allah's perfect mercy He made their wives from their own kind." }
      ]
    },
    {
      slug: "languages-and-colors",
      title: "Languages and colors",
      line: "Our many languages and colors are signs of Allah.",
      facts: ["Every face is different", "Only Allah knows all tongues"],
      quote: q30(22),
      source: ik(22, "People speak countless languages, and though all have two eyes, a nose and a mouth, no two faces look the same.", "Only Allah knows the variety of languages spoken among the sons of Adam"),
      difficulty: 3,
      questions: [
        { q: "Which two differences are signs, in 30:22?", a: "Languages and colors", wrong: ["Height and weight", "Food and drink", "Homes and roads"], why: "And the difference of your languages and colors." },
        { q: "Who knows all the languages, per Ibn Kathir?", a: "Only Allah", wrong: ["Scholars", "Kings", "Travelers"], why: "Only Allah knows the variety of languages spoken among the sons of Adam." },
        { tf: true, q: "Ibn Kathir says no two faces are exactly alike.", why: "Each face has its own characteristics and does not look like another." }
      ]
    },
    {
      slug: "sleep-and-seeking",
      title: "Sleep and seeking",
      line: "Your sleep by night and your work by day are His signs.",
      facts: ["Rest is a gift", "Earning is a gift too"],
      quote: q30(23),
      source: ik(23, "Allah made sleep so tiredness goes away, and made the day for travel and earning a living, the opposite of sleep.", "so that their tiredness and exhaustion will go away"),
      difficulty: 3,
      questions: [
        { q: "Which sign is named, in 30:23?", a: "Sleep and seeking His bounty", wrong: ["Fire and smoke", "Gold and silver", "Ships and sails"], why: "And among His signs is your sleep by night and by day, and your seeking of His bounty." },
        { q: "Why do we sleep, per Ibn Kathir?", a: "So tiredness goes away", wrong: ["To waste time", "To hide", "To forget"], why: "So that their tiredness and exhaustion will go away." },
        { q: "What does who listen mean, per Ibn Kathir?", a: "Who understand", wrong: ["Who sing", "Who shout", "Who sleep"], why: "Verily, in that are indeed signs for a people who listen, meaning, understand." }
      ]
    },
    {
      slug: "lightning-fear-and-hope",
      title: "Lightning: fear and hope",
      line: "Lightning brings fear and hope; rain then revives the land.",
      facts: ["Rain revives dead land", "A sign of the Resurrection"],
      quote: q30(24),
      source: ik(24, "We fear the storm and hope for rain when we see lightning. Rain bringing dead land to life is a clear sign of the Resurrection.", "In this is a clear sign and proof of the resurrection"),
      difficulty: 3,
      questions: [
        { q: "Why does Allah show lightning, in 30:24?", a: "For fear and for hope", wrong: ["For games", "For light only", "For nothing"], why: "He shows you the lightning, for fear and for hope." },
        { q: "What do we hope for with lightning, per Ibn Kathir?", a: "Much-needed rain", wrong: ["Snow", "Darkness", "Wind only"], why: "You feel hope, when you see a flash of lightning, that much-needed rain will come." },
        { q: "What does the revived land prove, per Ibn Kathir?", a: "The Resurrection", wrong: ["Good luck", "Nothing", "Magic"], why: "In this is a clear sign and proof of the resurrection." }
      ]
    },
    {
      slug: "standing-by-his-command",
      title: "Standing by His command",
      line: "Heaven and earth stand by His command; one call raises all.",
      facts: ["Allah holds the sky", "One call on that Day"],
      quote: q30(25),
      source: ik(25, "Umar used to swear by the One by Whose command heaven and earth stand. On the Last Day one call will bring everyone out of the earth.", "No, by the One by Whose command the heaven and the earth stand"),
      difficulty: 4,
      questions: [
        { q: "How do heaven and earth stand, in 30:25?", a: "By His command", wrong: ["On pillars", "By chance", "On a whale"], why: "And among His signs is that the heaven and the earth stand by His command." },
        { q: "How will Allah call us out, in 30:25?", a: "With a single call", wrong: ["With many trumpets", "One by one", "By letter"], why: "Then afterwards when He will call you by a single call, behold, you will come out from the earth." },
        { q: "Who swore by the One holding heaven and earth?", a: "Umar bin Al-Khattab", wrong: ["Abu Jahl", "Fir'awn", "Qarun"], why: "Whenever Umar bin Al-Khattab swore an emphatic oath, he would say: No, by the One by Whose command the heaven and the earth stand." }
      ]
    },
    {
      slug: "all-obey-him",
      title: "All obey Him",
      line: "All in the heavens and earth belong to Allah and obey Him.",
      facts: ["Allah owns everything", "All submit, willing or not"],
      quote: q30(26),
      source: ik(26, "Everything in the heavens and earth is owned by Allah and humble before Him, whether willingly or unwillingly.", "they are humble before Him and submit to Him, whether willingly or unwillingly"),
      difficulty: 3,
      questions: [
        { q: "To whom belongs all in heaven and earth, in 30:26?", a: "Allah", wrong: ["Kings", "No one", "The people"], why: "To Him belongs whatever is in the heavens and the earth." },
        { q: "How does creation obey, per Ibn Kathir?", a: "Willingly or unwillingly", wrong: ["Only when paid", "Never", "Only at night"], why: "They are humble before Him and submit to Him, whether willingly or unwillingly." },
        { tf: true, q: "In 30:26 all are obedient to Allah.", why: "All are obedient to Him." }
      ]
    },
    {
      slug: "easier-for-him",
      title: "Easier for Him",
      line: "Allah starts creation and repeats it; that is easier for Him.",
      facts: ["Re-creating is easy for Allah", "None is like Him"],
      quote: q30(27),
      source: ik(27, "Mujahid said repeating creation is easier than starting it, and starting it is easy for Allah. Qatadah said His description is La ilaha illallah.", "Repeating it is easier for Him than originating it, and originating it is easy for Him"),
      difficulty: 4,
      questions: [
        { q: "What is easier for Allah, in 30:27?", a: "Repeating creation", wrong: ["Nothing", "Only rain", "Only sleep"], why: "And He it is Who originates the creation, then He will repeat it; and this is easier for Him." },
        { q: "What did Qatadah say is His highest description?", a: "La ilaha illallah", wrong: ["The richest", "The oldest", "The tallest"], why: "Qatadah said: His description is La ilaha illallah, and there is no Lord but He." },
        { q: "Which Names end 30:27?", a: "All-Mighty, All-Wise", wrong: ["Most Kind, Most Near", "First, Last", "Hearing, Seeing"], why: "And He is the All-Mighty, the All-Wise." }
      ]
    },
    {
      slug: "the-son-of-adam-denies",
      title: "The son of Adam denies",
      line: "Allah said: re-creating man is no harder than creating him.",
      facts: ["Allah has no son", "Resurrection is easy for Him"],
      quote: q30(27),
      source: hadith("bukhari", "4974", "Abu Hurayrah", "Sahih", "Allah said the son of Adam lies against Him by saying He will not recreate him, though the first creation was not easier. He is the One, the Self-Sufficient.", "In fact, the first creation was not easier for Me than new creation"),
      difficulty: 4,
      questions: [
        { q: "What lie does man tell, in the hadith?", a: "That Allah will not recreate him", wrong: ["That he is poor", "That he is tall", "That rain stops"], why: "It is his saying that I will not recreate him as I created him for the first time." },
        { q: "Was the first creation easier, in the hadith?", a: "No, not easier", wrong: ["Yes, much easier", "Only a little", "No one knows"], why: "In fact, the first creation was not easier for Me than new creation." },
        { tf: true, q: "In the hadith Allah is the One, the Self-Sufficient Master.", why: "While I am the One, the Self-Sufficient Master." }
      ]
    },
    {
      slug: "would-you-share-with-servants",
      title: "Would you share with servants?",
      line: "You would not make your servant an equal partner; nor has Allah.",
      facts: ["Allah has no partner", "Use reason to see Tawhid"],
      quote: q30(28),
      source: ik(28, "None of you would like his servant as an equal partner in his wealth. So how can people give Allah partners from His own creation?", "None of you would like to have his servant as a partner in his wealth"),
      difficulty: 4,
      questions: [
        { q: "What parable does 30:28 give?", a: "Servants as equal partners", wrong: ["A spider's house", "A burning lamp", "A tree"], why: "Do you have partners among those whom your right hands possess to share as equals in the wealth We have bestowed on you?" },
        { q: "What would no one like, per Ibn Kathir?", a: "His servant as an equal partner", wrong: ["A good harvest", "A guest", "Rain"], why: "None of you would like to have his servant as a partner in his wealth." },
        { q: "What did the idolators say in their Talbiyah?", a: "You have no partner except one You own", wrong: ["Here I am, alone", "Peace be upon you", "Allahu Akbar"], why: "At Your service, You have no partner except the partner that You have, You own Him and whatever he owns." }
      ]
    },
    {
      slug: "following-desires",
      title: "Following desires",
      line: "Wrongdoers follow their desires without knowledge.",
      facts: ["Seek knowledge, not whims", "Only Allah guides"],
      quote: q30(29),
      source: ik(29, "The idolators followed their desires without knowledge. No one can guide those Allah leaves astray, and none can save them.", "no one can guide them if Allah has decreed that they will be misguided"),
      difficulty: 4,
      questions: [
        { q: "What do the wrongdoers follow, in 30:29?", a: "Their own desires", wrong: ["Clear proof", "The Prophets", "Knowledge"], why: "Nay, but those who do wrong follow their own lusts without knowledge." },
        { q: "Who can guide whom Allah sends astray, in 30:29?", a: "No one", wrong: ["Their friends", "Their idols", "Their wealth"], why: "Then who will guide him whom Allah has sent astray?" },
        { q: "What happens to what Allah wills, per Ibn Kathir?", a: "It happens", wrong: ["It is delayed forever", "It can be stopped", "It is forgotten"], why: "For what He wills, happens and what He does not will, does not happen." }
      ]
    },
    {
      slug: "the-fitrah",
      title: "The Fitrah",
      line: "Turn to the true religion: the Fitrah Allah gave all people.",
      facts: ["We are born knowing Allah", "Keep the Fitrah pure"],
      quote: q30(30),
      source: ik(30, "Allah created His creation to recognize Him and know His Tawhid. Holding to Islam keeps the sound Fitrah He made us with.", "Allah created His creation to recognize Him and know His Tawhid"),
      difficulty: 3,
      questions: [
        { q: "What is Allah's Fitrah, in 30:30?", a: "The nature He gave mankind", wrong: ["A kind of food", "A city", "A tribe"], why: "Allah's Fitrah with which He has created mankind." },
        { q: "Why did Allah create people, per Ibn Kathir?", a: "To know Him and His Tawhid", wrong: ["To get rich", "To play", "To fight"], why: "Allah created His creation to recognize Him and know His Tawhid." },
        { q: "What does Hanif describe, in 30:30?", a: "Turning to the religion sincerely", wrong: ["A trade", "A weapon", "A journey"], why: "So, set you your face towards the religion as a Hanif." }
      ]
    },
    {
      slug: "every-child-on-the-fitrah",
      title: "Every child on the Fitrah",
      line: "Every child is born on the Fitrah, the Prophet ﷺ said.",
      facts: ["Children are born pure", "Parents shape them"],
      quote: q30(30),
      source: hadith("bukhari", "1385", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said every child is born on the true faith, and his parents change him, as an animal gives birth to a whole, perfect young.", "Every child is born with a true faith of Islam"),
      difficulty: 4,
      questions: [
        { q: "How is every child born, in the hadith?", a: "On the true faith", wrong: ["Without any nature", "Already sinful", "Knowing everything"], why: "Every child is born with a true faith of Islam." },
        { q: "Who can change the child, in the hadith?", a: "His parents", wrong: ["His teacher only", "The stars", "No one"], why: "And his parents convert him to Judaism or Christianity or Magianism." },
        { q: "Which ayah did Abu Hurayrah recite after it?", a: "30:30", wrong: ["2:255", "112:1", "1:1"], why: "Allah's Fitrah with which He has created mankind. No change let there be in Allah's Khalq." }
      ]
    },
    {
      slug: "turn-to-him-and-pray",
      title: "Turn to Him and pray",
      line: "Keep turning to Him, fear Him, pray, and never join partners.",
      facts: ["Prayer is the greatest worship", "Ikhlas is the Fitrah"],
      quote: q30(31),
      source: ik(31, "Turn back to Allah, fear Him knowing He watches, and pray. Mu'adh said sincerity, prayer and obedience bring salvation.", "which is the Fitrah with which Allah created mankind"),
      difficulty: 4,
      questions: [
        { q: "What should we keep doing, in 30:31?", a: "Turning to Him in repentance", wrong: ["Turning away", "Sleeping", "Arguing"], why: "And remain always turning in repentance to Him." },
        { q: "What is the greatest act of worship, per Ibn Kathir?", a: "Salah", wrong: ["Travel", "Trade", "Fasting only"], why: "And perform the Salah, which is the greatest act of worship." },
        { q: "What three things did Mu'adh name?", a: "Ikhlas, Salah and obedience", wrong: ["Gold, silver and land", "Food, drink and rest", "Speed, power and fame"], why: "Al-Ikhlas... Salah... and obedience, which is protection." }
      ]
    },
    {
      slug: "do-not-split-the-religion",
      title: "Do not split the religion",
      line: "Do not be like those who split their religion into sects.",
      facts: ["Stay united on the truth", "Follow the Book and Sunnah"],
      quote: q30(32),
      source: ik(32, "Do not be like those who split their religion, believing in parts and rejecting parts, each group pleased with its own.", "believing in parts of it and rejecting other parts"),
      difficulty: 4,
      questions: [
        { q: "What did they do to their religion, in 30:32?", a: "Split it into sects", wrong: ["Kept it whole", "Wrote it down", "Taught it kindly"], why: "Of those who split up their religion, and became sects." },
        { q: "How is each sect, in 30:32?", a: "Pleased with what it has", wrong: ["Sad", "Humble", "Searching"], why: "Each sect rejoicing in that which is with it." },
        { q: "How did they split it, per Ibn Kathir?", a: "Believing some parts, rejecting others", wrong: ["By moving away", "By fasting", "By trading"], why: "Changed it by believing in parts of it and rejecting other parts." }
      ]
    }
  ]
};

/** Ayahs 33 to 45: calling on Allah in hardship, joy and despair, giving to kin, charity that grows, the effects of sin, and the Day none can avert. */
const RUM_THREE: DeepUnit = {
  key: "rum3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-30",
  name: "Ar-Rum, ayahs 33 to 45",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ar-Rum",
  lessons: [
    {
      slug: "sincere-only-in-hardship",
      title: "Sincere only in hardship",
      line: "In harm people call on Allah alone; in ease some forget.",
      facts: ["Remember Allah in ease", "He alone removes harm"],
      quote: q30(33),
      source: ik(33, "In hard times man calls on Allah alone. When ease comes, some start to worship others alongside Him.", "when man is in dire straits, he calls upon Allah alone with no partner"),
      difficulty: 3,
      questions: [
        { q: "What do people do when harm touches them, in 30:33?", a: "Call sincerely on their Lord", wrong: ["Call on idols", "Laugh", "Sleep"], why: "And when harm touches men, they cry sincerely only to their Lord." },
        { q: "What do some do after mercy, in 30:33?", a: "Associate partners", wrong: ["Thank Him more", "Fast", "Give charity"], why: "Behold, a party of them associates partners in worship with their Lord." },
        { tf: true, q: "Ibn Kathir says some change once times of ease come.", why: "Then when times of ease come and they have the choice, some people associate others with Allah." }
      ]
    },
    {
      slug: "enjoy-but-you-will-know",
      title: "Enjoy, but you will know",
      line: "Enjoy for now, Allah says to the ungrateful; you will know.",
      facts: ["Allah's warning is serious", "Be thankful for blessings"],
      quote: q30(34),
      source: ik(34, "One scholar said if an officer warned him like this he would fear, so how about the One Who says to a thing Be, and it is?", "so how about when the One Who is issuing the warning is the One Who merely says to a thing"),
      difficulty: 4,
      questions: [
        { q: "What are they ungrateful for, in 30:34?", a: "The graces Allah gave them", wrong: ["Their own work", "Their idols", "Their enemies"], why: "So as to be ungrateful for the graces which We have bestowed on them." },
        { q: "What will they come to know, in 30:34?", a: "The truth in the end", wrong: ["Nothing", "Only riches", "More games"], why: "Then enjoy; but you will come to know." },
        { tf: true, q: "Ibn Kathir notes a warning from Allah is far weightier than a man's.", why: "If a law enforcment officer were to say this to me, I would be afraid, so how about when the One Who is issuing the warning is the One Who merely says to a thing Be! and it is?" }
      ]
    },
    {
      slug: "no-authority-for-shirk",
      title: "No authority for shirk",
      line: "Did Allah send them proof for their partners? He did not.",
      facts: ["Shirk has no proof", "Truth needs evidence"],
      quote: q30(35),
      source: ik(35, "Allah asks if He sent them any proof for their partners, a question that denounces them, for they had none.", "This is a rhetorical question intended to denounce them, for they have no such thing"),
      difficulty: 4,
      questions: [
        { q: "What does authority mean, per Ibn Kathir?", a: "Proof", wrong: ["A king", "An army", "A city"], why: "Or have We revealed to them an authority, means, proof." },
        { q: "Did they have any proof, per Ibn Kathir?", a: "No, none", wrong: ["Yes, a book", "Yes, a sign", "Some"], why: "This is a rhetorical question intended to denounce them, for they have no such thing." },
        { tf: false, q: "In 30:35 Allah sent proof for their idols.", why: "Or have We revealed to them an authority, which speaks of that which they have been associating with Him?" }
      ]
    },
    {
      slug: "joy-and-despair",
      title: "Joy and despair",
      line: "Given mercy they rejoice; hit by trouble they despair.",
      facts: ["Do not be proud in ease", "Do not lose hope in hardship"],
      quote: q30(36),
      source: ik(36, "Man grows proud with blessings and despairs with hardship, except the believers, who are patient in hardship and do good in ease.", "They are patient during times of difficulty and do good deeds at times of ease"),
      difficulty: 3,
      questions: [
        { q: "What do they do when hardship comes, in 30:36?", a: "Despair", wrong: ["Rejoice", "Pray more", "Give thanks"], why: "But when some evil afflicts them because of what their hands have sent forth, behold, they are in despair!" },
        { q: "Why does the hardship come, in 30:36?", a: "What their hands sent forth", wrong: ["Bad luck", "The stars", "Their neighbors"], why: "Because of what their hands have sent forth." },
        { q: "How are believers different, per Ibn Kathir?", a: "Patient in hardship, good in ease", wrong: ["Always sad", "Always proud", "Never tested"], why: "They are patient during times of difficulty and do good deeds at times of ease." }
      ]
    },
    {
      slug: "the-amazing-believer",
      title: "The amazing believer",
      line: "For a believer every matter is good: thanks or patience.",
      facts: ["Thank Allah in joy", "Be patient in trouble"],
      quote: q30(36),
      source: hadith("muslim", "2999", "Suhaib", "Sahih", "The Prophet ﷺ said the believer's affair is wonderful: in joy he thanks Allah, in hardship he is patient, and both are good for him.", "Strange are the ways of a believer for there is good in every affair of his"),
      difficulty: 4,
      questions: [
        { q: "What does the believer do in joy, in the hadith?", a: "Thanks Allah", wrong: ["Boasts", "Hides", "Complains"], why: "If he has an occasion to feel delight, he thanks, thus there is a good for him in it." },
        { q: "What does the believer do in hardship, in the hadith?", a: "Is patient", wrong: ["Gives up", "Blames others", "Runs away"], why: "If he gets into trouble and shows resignation, there is a good for him in it." },
        { tf: true, q: "In the hadith, every affair of a believer holds good.", why: "Strange are the ways of a believer for there is good in every affair of his." }
      ]
    },
    {
      slug: "provision-by-wisdom",
      title: "Provision by wisdom",
      line: "Allah gives more to some and less to others, by His wisdom.",
      facts: ["Trust Allah's plan", "Wealth is a test"],
      quote: q30(37),
      source: ik(37, "Allah controls provision by His wisdom and justice, giving plenty to some and less to others.", "He is the One Who is controlling and doing that, by His wisdom and justice"),
      difficulty: 3,
      questions: [
        { q: "Who expands and limits provision, in 30:37?", a: "Allah", wrong: ["The market", "The king", "Chance"], why: "Do they not see that Allah expands the provision for whom He wills and straitens it." },
        { q: "How does Allah decide, per Ibn Kathir?", a: "By wisdom and justice", wrong: ["At random", "By votes", "By age"], why: "He is the One Who is controlling and doing that, by His wisdom and justice." },
        { tf: true, q: "In 30:37 there are signs for people who believe.", why: "Verily, in that are indeed signs for a people who believe." }
      ]
    },
    {
      slug: "give-to-kin-and-poor",
      title: "Give to kin and the poor",
      line: "Give relatives, the needy and travelers their due.",
      facts: ["Keep family ties", "Help those in need"],
      quote: q30(38),
      source: ik(38, "Give relatives respect and keep ties, help the needy who lack enough, and the traveler short of money. That is best for those seeking Allah.", "his due of respect and upholding the ties of kinship"),
      difficulty: 3,
      questions: [
        { q: "Which three are named, in 30:38?", a: "Kin, the needy, the traveler", wrong: ["Kings, poets, traders", "Soldiers, guards, judges", "Rich, famous, strong"], why: "So, give to the kindred his due, and to Al-Miskin and to the wayfarer." },
        { q: "Who is the Miskin, per Ibn Kathir?", a: "One without enough", wrong: ["A king", "A merchant", "A guest only"], why: "The one who has nothing to spend on his needs, or he has something but it is not enough." },
        { q: "What is the kin's due, per Ibn Kathir?", a: "Respect and keeping ties", wrong: ["Nothing", "Silence", "Gold only"], why: "His due of respect and upholding the ties of kinship." }
      ]
    },
    {
      slug: "giving-to-get-more",
      title: "Giving to get more",
      line: "Gifts given to get more back gain nothing with Allah.",
      facts: ["Give for Allah alone", "Zakah is multiplied"],
      quote: q30(39),
      source: ik(39, "Ibn Abbas and others said this means a gift given hoping for a bigger one back; it has no reward with Allah. Zakah for Allah is multiplied.", "This means, that which is given as a gift to others in the hope that they will give back more"),
      difficulty: 4,
      questions: [
        { q: "What gift has no increase with Allah, per Ibn Kathir?", a: "One given to get more back", wrong: ["One given to the poor", "One given secretly", "One given to parents"], why: "That which is given as a gift to others in the hope that they will give back more than they were given." },
        { q: "What is multiplied, in 30:39?", a: "Zakah seeking Allah's Face", wrong: ["Interest", "Bets", "Taxes"], why: "But that which you give in Zakah seeking Allah's Face, then those they shall have manifold increase." },
        { tf: true, q: "Ibn Abbas and Mujahid gave the gift meaning.", why: "This is how this Ayah was interpreted by Ibn Abbas, Mujahid, Ad-Dahhak, Qatadah, Ikrimah." }
      ]
    },
    {
      slug: "a-date-like-a-mountain",
      title: "A date like a mountain",
      line: "One honest date given in charity grows like a mountain.",
      facts: ["Small charity counts", "Earn honestly"],
      quote: q30(39),
      source: hadith("bukhari", "1410", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said Allah takes a date's worth of charity from honest money and grows its reward like a foal is raised, till it is like a mountain.", "so much so that it becomes as big as a mountain"),
      difficulty: 4,
      questions: [
        { q: "How small is the charity, in the hadith?", a: "One date", wrong: ["A camel", "A house", "A bag of gold"], why: "If one gives in charity what equals one date-fruit from the honestly earned money." },
        { q: "What money does Allah accept, in the hadith?", a: "Honestly earned money", wrong: ["Any money", "Borrowed money", "Found money"], why: "And Allah accepts only the honestly earned money." },
        { q: "How big does it grow, in the hadith?", a: "As big as a mountain", wrong: ["Like a seed", "Like a tree", "Like a house"], why: "So much so that it becomes as big as a mountain." }
      ]
    },
    {
      slug: "creates-provides-gives-life",
      title: "Creates, provides, gives life",
      line: "Allah creates, feeds, causes death and gives life again.",
      facts: ["No idol can do this", "Glory be to Him"],
      quote: q30(40),
      source: ik(40, "Allah alone creates, provides, gives death and raises again. None of the false partners can do any of that.", "none of them are able to do any of that"),
      difficulty: 3,
      questions: [
        { q: "What four things does Allah do, in 30:40?", a: "Create, provide, cause death, give life", wrong: ["Eat, sleep, walk, talk", "Buy, sell, build, travel", "Sing, dance, play, rest"], why: "Allah is He Who created you, then provided food for you, then will cause you to die, then He will give you life." },
        { q: "Can their partners do any of it, per Ibn Kathir?", a: "No, none of it", wrong: ["Some of it", "All of it", "Half of it"], why: "None of them are able to do any of that." },
        { q: "How are we born, per Ibn Kathir?", a: "Naked and knowing nothing", wrong: ["Rich and wise", "Strong and tall", "Speaking"], why: "He brings man forth from his mother's womb naked and knowing nothing." }
      ]
    },
    {
      slug: "corruption-from-sins",
      title: "Corruption from sins",
      line: "Corruption spread on land and sea from what people did.",
      facts: ["Sins harm the world", "Obedience brings blessing"],
      quote: q30(41),
      source: ik(41, "Abu Al-Aliyah said whoever disobeys Allah on earth corrupts it, because the good of earth and sky depends on obeying Allah.", "the good condition of the earth and the heavens depends on obedience to Allah"),
      difficulty: 4,
      questions: [
        { q: "Where has corruption appeared, in 30:41?", a: "On land and sea", wrong: ["Only in space", "Only in cities", "Nowhere"], why: "Evil has appeared in Al-Barr and Al-Bahr." },
        { q: "Why has it appeared, in 30:41?", a: "What people's hands earned", wrong: ["Bad luck", "The animals", "The weather alone"], why: "Because of what the hands of men have earned." },
        { q: "Why does Allah let them taste it, in 30:41?", a: "So they may return", wrong: ["To destroy all", "For no reason", "To amuse"], why: "That He may make them taste a part of that which they have done, in order that they may return." }
      ]
    },
    {
      slug: "a-grace-in-the-trial",
      title: "A grace in the trial",
      line: "Allah sends a taste of hardship so people turn back.",
      facts: ["As-Sa'di explains", "Hardship as a call back"],
      quote: q30(41),
      source: saadi(30, 41, "As-Sa'di says corruption, shortages and illness spread because of people's sins, and Allah gives a small taste of their deeds' result here so they return; glory to Him who blesses even through trials.", "فسبحان من أنعم ببلائه وتفضل بعقوبته"),
      difficulty: 2,
      questions: [
        { q: "Why does Allah give a taste of hardship in the world, per as-Sa'di?", a: "So people turn back to Him", wrong: ["To destroy everyone", "For no reason", "To make them rich"], why: "So they return from the deeds that caused it, says as-Sa'di." },
        { q: "What would happen if Allah punished people for all they earned?", a: "No creature would be left", wrong: ["Nothing", "Only rain would stop", "Prices would rise"], why: "No creature would be left on the earth." },
        { tf: true, q: "Illness and shortages can come from people's own sins.", why: "As-Sa'di on 30:41." }
      ]
    },
    {
      slug: "travel-and-see",
      title: "Travel and see",
      line: "Travel the land and see how earlier idolators ended.",
      facts: ["History teaches", "Gratitude keeps blessings"],
      quote: q30(42),
      source: ik(42, "Look at what happened to earlier nations when they rejected the Messengers and were ungrateful for blessings. Most of them were idolators.", "so see what happened to them when they rejected the Messengers and were ungrateful for the blessings"),
      difficulty: 3,
      questions: [
        { q: "What were most of them, in 30:42?", a: "Idolators", wrong: ["Believers", "Prophets", "Angels"], why: "Most of them were idolators." },
        { q: "What does 30:42 tell us to do?", a: "Travel and look at their end", wrong: ["Stay home", "Forget history", "Build towers"], why: "Say: Travel in the land and see what was the end of those before you!" },
        { q: "Why did they fall, per Ibn Kathir?", a: "Rejecting Messengers, ungrateful", wrong: ["Too much rain", "Small numbers", "Bad roads"], why: "When they rejected the Messengers and were ungrateful for the blessings." }
      ]
    },
    {
      slug: "before-the-day-comes",
      title: "Before the Day comes",
      line: "Hold to the straight religion before a Day none can stop.",
      facts: ["Hurry to good deeds", "That Day cannot be pushed back"],
      quote: q30(43),
      source: ik(43, "Allah tells His servants to hurry to obey Him and do good, before the Day of Resurrection that no one can avert.", "Allah commands His servants to hasten to obedience to Him and to hasten to do good deeds"),
      difficulty: 3,
      questions: [
        { q: "What can no one do to that Day, in 30:43?", a: "Avert it", wrong: ["See it", "Fear it", "Learn of it"], why: "Before there comes from Allah a Day which none can avert." },
        { q: "What does Allah urge, per Ibn Kathir?", a: "Hurry to good deeds", wrong: ["Rest a while", "Wait and see", "Collect wealth"], why: "Allah commands His servants to hasten to obedience to Him and to hasten to do good deeds." },
        { tf: true, q: "On that Day people will be divided, in 30:43.", why: "On that Day men shall be divided." }
      ]
    },
    {
      slug: "preparing-a-good-place",
      title: "Preparing a good place",
      line: "Who does good prepares a good place for himself.",
      facts: ["Deeds build your future", "Disbelief harms its owner"],
      quote: q30(44),
      source: ik(44, "Whoever disbelieves bears the harm of it, and whoever does good prepares a good place for himself in the Hereafter.", "such will prepare a good place for themselves"),
      difficulty: 3,
      questions: [
        { q: "What do the good-doers prepare, in 30:44?", a: "A good place for themselves", wrong: ["A trap", "A long journey", "Nothing"], why: "And whosoever does righteous good deeds, then such will prepare a good place for themselves." },
        { q: "Who suffers from disbelief, in 30:44?", a: "The one who disbelieves", wrong: ["His neighbor", "Allah", "The angels"], why: "Whosoever disbelieves will suffer from his disbelief." },
        { tf: false, q: "In 30:44 our deeds help only other people.", why: "Such will prepare a good place for themselves." }
      ]
    },
    {
      slug: "reward-from-his-bounty",
      title: "Reward from His bounty",
      line: "Allah rewards believers from His bounty, many times over.",
      facts: ["Reward is a gift", "Allah is just to all"],
      quote: q30(45),
      source: ik(45, "Allah rewards from His bounty: one good deed brings ten, up to seven hundred, as He wills. Even with disbelievers He is just.", "in return for one good deed, he will get the reward for ten, up to seven hundred like it"),
      difficulty: 4,
      questions: [
        { q: "From what does Allah reward, in 30:45?", a: "His bounty", wrong: ["Our wealth", "Our fame", "Our age"], why: "That He may reward those who believe and do righteous good deeds, out of His bounty." },
        { q: "How much for one good deed, per Ibn Kathir?", a: "Ten up to seven hundred", wrong: ["Exactly one", "Two only", "None"], why: "In return for one good deed, he will get the reward for ten, up to seven hundred like it." },
        { q: "How does Allah treat disbelievers, per Ibn Kathir?", a: "Justly, without oppression", wrong: ["Unfairly", "With bribes", "He forgets them"], why: "Yet He is still just with them and does not oppress them." }
      ]
    }
  ]
};

/** Ayahs 46 to 60: winds and rain, helping the believers, the stages of life, the short stay in this world, and patience. */
const RUM_FOUR: DeepUnit = {
  key: "rum4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-30",
  name: "Ar-Rum, ayahs 46 to 60",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ar-Rum",
  lessons: [
    {
      slug: "winds-of-good-news",
      title: "Winds of good news",
      line: "Allah sends winds with good news of rain and drives the ships.",
      facts: ["Winds bring rain", "Thank Allah for hidden gifts"],
      quote: q30(46),
      source: ik(46, "Allah sends winds ahead of His mercy, the rain. They drive ships at sea so we can trade and travel, and give thanks.", "as harbingers of His mercy, meaning that they will be followed by rain"),
      difficulty: 3,
      questions: [
        { q: "What do the winds bring, in 30:46?", a: "Glad tidings", wrong: ["Only dust", "Fear only", "Nothing"], why: "He sends the winds as glad tidings." },
        { q: "What follows the winds, per Ibn Kathir?", a: "Rain", wrong: ["Fire", "Snow only", "Silence"], why: "As harbingers of His mercy, meaning that they will be followed by rain." },
        { q: "Why are we given all this, in 30:46?", a: "So we may be thankful", wrong: ["So we may boast", "So we may sleep", "So we may forget"], why: "In order that you may be thankful." }
      ]
    },
    {
      slug: "helping-believers-is-due",
      title: "Helping believers is due",
      line: "Allah has made it His duty to help the believers.",
      facts: ["Allah supports the faithful", "The Prophet ﷺ was consoled"],
      quote: q30(47),
      source: ik(47, "These words console the Prophet ﷺ: earlier Messengers were rejected too, but Allah saved the believers. Helping them is a duty He took on Himself.", "This is a duty which Allah took upon Himself as a blessing and a favor to them"),
      difficulty: 4,
      questions: [
        { q: "What is incumbent on Allah, in 30:47?", a: "To help the believers", wrong: ["To make all rich", "To end the world now", "To punish all"], why: "And it was incumbent upon Us to help the believers." },
        { q: "Why did Allah take this duty, per Ibn Kathir?", a: "As a blessing and favor", wrong: ["He was forced", "By a deal", "By chance"], why: "This is a duty which Allah took upon Himself as a blessing and a favor to them." },
        { tf: true, q: "Ibn Kathir calls 30:47 consolation for the Prophet ﷺ.", why: "These are words of consolation from Allah to His servant and Messenger Muhammad." }
      ]
    },
    {
      slug: "defend-your-brother",
      title: "Defend your brother",
      line: "Guard a Muslim's honor, and Allah guards your face from Fire.",
      facts: ["Stop backbiting", "Stand up for others kindly"],
      quote: q30(47),
      source: hadith("tirmidhi", "1931", "Abu ad-Darda", "Sahih", "The Prophet ﷺ said whoever protects his brother's honor, Allah will protect his face from the Fire on the Day of Resurrection.", "Allah protects his face from the Fire on the Day of Resurrection"),
      difficulty: 4,
      questions: [
        { q: "What should we protect, in the hadith?", a: "Our brother's honor", wrong: ["Only our money", "Our pride", "Our rank"], why: "Whoever protects his brother's honor." },
        { q: "What does Allah protect in return, in the hadith?", a: "His face from the Fire", wrong: ["His house", "His camel", "His shop"], why: "Allah protects his face from the Fire on the Day of Resurrection." },
        { tf: true, q: "Abu ad-Darda linked the hadith to 30:47, per Ibn Kathir.", why: "Then he recited this Ayah: and it was incumbent upon Us to help the believers." }
      ]
    },
    {
      slug: "clouds-and-raindrops",
      title: "Clouds and raindrops",
      line: "Winds raise clouds, spread them, and rain falls from within.",
      facts: ["Rain is planned by Allah", "Joy follows the rain"],
      quote: q30(48),
      source: ik(48, "Allah spreads the clouds, making a lot from a little, till they fill the horizon. Then the rain falls from their midst.", "From a little He makes a lot"),
      difficulty: 3,
      questions: [
        { q: "What do the winds raise, in 30:48?", a: "Clouds", wrong: ["Mountains", "Waves only", "Sand only"], why: "Allah is He Who sends the winds, so that they raise clouds." },
        { q: "How do the servants feel when rain falls, in 30:48?", a: "They rejoice", wrong: ["They despair", "They hide", "They forget"], why: "Then when He has made them fall on whom of His servants as He wills, lo, they rejoice!" },
        { q: "How does Allah grow the clouds, per Ibn Kathir?", a: "From a little, a lot", wrong: ["From a lot, a little", "Not at all", "By chance"], why: "From a little He makes a lot." }
      ]
    },
    {
      slug: "despair-before-rain",
      title: "Despair before rain",
      line: "Just before rain came, they had lost hope.",
      facts: ["Do not lose hope", "Relief comes after waiting"],
      quote: q30(49),
      source: ik(49, "The rain was late and a long time passed. Then it came suddenly after they began to despair, and the dry land came to life.", "Then the rain came to them suddenly, after they began to despair"),
      difficulty: 3,
      questions: [
        { q: "How were they before the rain, in 30:49?", a: "In despair", wrong: ["Joyful", "Rich", "Asleep"], why: "And verily, before that, just before it was sent down upon them, they were in despair!" },
        { q: "How did the rain come, per Ibn Kathir?", a: "Suddenly", wrong: ["Never", "Slowly over years", "As snow"], why: "Then the rain came to them suddenly, after they began to despair." },
        { tf: true, q: "Ibn Kathir says the rain had been late a long time.", why: "The rain was late, and a long time passed." }
      ]
    },
    {
      slug: "the-traces-of-mercy",
      title: "The traces of His mercy",
      line: "See how Allah revives dead earth; so He will raise the dead.",
      facts: ["Rain is His mercy", "Resurrection is certain"],
      quote: q30(50),
      source: ik(50, "Rain is the trace of Allah's mercy. Reviving dead earth points to reviving people's bodies after they have turned to nothing.", "Thus Allah draws attention to the revival"),
      difficulty: 3,
      questions: [
        { q: "What should we look at, in 30:50?", a: "The effects of Allah's mercy", wrong: ["The stars only", "Our wealth", "The markets"], why: "Look then at the effects of Allah's mercy." },
        { q: "What is the mercy, per Ibn Kathir?", a: "The rain", wrong: ["Gold", "Fire", "Night"], why: "Look then at the effects of Allah's mercy, meaning, the rain." },
        { q: "What does the revived earth point to, per Ibn Kathir?", a: "Raising the dead", wrong: ["Good harvests only", "Nothing", "Floods"], why: "Thus Allah draws attention to the revival of people's bodies after they have died." }
      ]
    },
    {
      slug: "a-yellowing-wind",
      title: "A yellowing wind",
      line: "If a wind dried their crops, they would forget past blessings.",
      facts: ["Stay grateful in loss", "Remember past gifts"],
      quote: q30(51),
      source: ik(51, "If a wind dried up their ripened crops and they turned yellow, they would deny the blessings they had been given before.", "they would deny the previous blessings that they were given"),
      difficulty: 4,
      questions: [
        { q: "What color do they see, in 30:51?", a: "Yellow", wrong: ["Blue", "Red", "White"], why: "And if We send a wind, and they see it turn yellow." },
        { q: "What turns yellow, per Ibn Kathir?", a: "Their crops", wrong: ["The sky", "The sea", "Their clothes"], why: "A wind which dries up the crops which they have tended and cultivated." },
        { q: "What would they do, per Ibn Kathir?", a: "Deny earlier blessings", wrong: ["Thank Allah more", "Plant again happily", "Give charity"], why: "They would deny the previous blessings that they were given." }
      ]
    },
    {
      slug: "the-deaf-who-turn-away",
      title: "The deaf who turn away",
      line: "You cannot make the dead hear, nor the deaf who turn away.",
      facts: ["Guidance is from Allah", "Keep calling with patience"],
      quote: q30(52),
      source: ik(52, "As you cannot make the dead or the deaf hear, you cannot guide those who turn away. That rests with Allah alone.", "That is a matter which rests with Allah"),
      difficulty: 4,
      questions: [
        { q: "Whom can you not make hear, in 30:52?", a: "The dead and the deaf", wrong: ["The believers", "The children", "The angels"], why: "So verily, you cannot make the dead to hear, nor can you make the deaf to hear the call." },
        { q: "With whom does guidance rest, per Ibn Kathir?", a: "With Allah", wrong: ["With the speaker", "With wealth", "With kings"], why: "That is a matter which rests with Allah." },
        { tf: true, q: "In 30:52 the deaf turn their backs and go away.", why: "When they show their backs and turn away." }
      ]
    },
    {
      slug: "those-who-truly-hear",
      title: "Those who truly hear",
      line: "Only those who believe in Our signs and submit will hear.",
      facts: ["Be humble to hear truth", "Respond and obey"],
      quote: q30(53),
      source: ik(53, "Those who are humble, respond and obey will listen to the truth and follow it. That is the state of the believers.", "those who are humble and who respond and obey"),
      difficulty: 3,
      questions: [
        { q: "Who will hear, in 30:53?", a: "Believers who submit", wrong: ["The proud", "The loud", "The rich"], why: "You can make to hear only those who believe in Our Ayat, and have submitted." },
        { q: "What marks them, per Ibn Kathir?", a: "Humility and obedience", wrong: ["Wealth", "Fame", "Strength"], why: "Those who are humble and who respond and obey." },
        { q: "Whom can you not guide, in 30:53?", a: "The blind in their straying", wrong: ["The patient", "The humble", "The sincere"], why: "And you cannot guide the blind from their straying." }
      ]
    },
    {
      slug: "weak-strong-weak",
      title: "Weak, strong, weak",
      line: "Allah made you weak, then strong, then weak with grey hair.",
      facts: ["Life has stages", "Use your strong years well"],
      quote: q30(54),
      source: ik(54, "Man is born weak, grows into strength as a young man, then grows old and weak again, his hair turning grey.", "which is strength after weakness"),
      difficulty: 3,
      questions: [
        { q: "How are we first created, in 30:54?", a: "In weakness", wrong: ["In strength", "Old", "Wise"], why: "Allah is He Who created you in weakness." },
        { q: "What comes after strength, in 30:54?", a: "Weakness and grey hair", wrong: ["More strength", "Youth again", "Wings"], why: "Then after strength gave you weakness and grey hair." },
        { q: "Which Names end 30:54?", a: "All-Knowing, All-Powerful", wrong: ["Most Kind, Most Near", "First, Last", "Mighty, Wise"], why: "And He is the All-Knowing, the All-Powerful." }
      ]
    },
    {
      slug: "just-one-hour",
      title: "Just one hour",
      line: "That Day sinners will swear they stayed only an hour.",
      facts: ["Life is short", "Prepare while there is time"],
      quote: q30(55),
      source: ik(55, "On that Day the disbelievers will swear they did not stay even one hour, as if there were no time to warn them.", "They will swear by Allah that they did not even stay for one hour in this world"),
      difficulty: 4,
      questions: [
        { q: "How long will they say they stayed, in 30:55?", a: "Only an hour", wrong: ["A thousand years", "A month", "Forever"], why: "The criminals will swear that they stayed not but an hour." },
        { q: "Why do they claim it, per Ibn Kathir?", a: "To say they had no warning", wrong: ["To be honest", "To be thankful", "To ask for food"], why: "There was not enough time given to establish proof against them which would leave them with no excuse." },
        { tf: true, q: "In 30:55 they were ever deluded.", why: "Thus were they ever deluded." }
      ]
    },
    {
      slug: "the-learned-reply",
      title: "The learned reply",
      line: "People of knowledge and faith will say: this is the Day.",
      facts: ["Knowledge with faith", "Our stay is recorded"],
      quote: q30(56),
      source: ik(56, "The believers who have knowledge will answer: you stayed as Allah decreed in the Book of deeds, from your creation to this Day.", "meaning, the Book of deeds"),
      difficulty: 4,
      questions: [
        { q: "Who answers them, in 30:56?", a: "Those given knowledge and faith", wrong: ["Their idols", "Their kings", "No one"], why: "And those who have been bestowed with knowledge and Faith will say." },
        { q: "What is the decree of Allah, per Ibn Kathir?", a: "The Book of deeds", wrong: ["A map", "A song", "A treasure"], why: "Indeed you have stayed according to the decree of Allah, meaning, the Book of deeds." },
        { q: "What Day is it, in 30:56?", a: "The Day of Resurrection", wrong: ["Friday", "Eid", "A market day"], why: "So this is the Day of Resurrection, but you knew not." }
      ]
    },
    {
      slug: "no-excuse-that-day",
      title: "No excuse that Day",
      line: "That Day excuses will not help, and there is no going back.",
      facts: ["Repent today", "No second chance after"],
      quote: q30(57),
      source: ik(57, "On the Day of Resurrection the wrongdoers' excuses will not help, and they will not be allowed to return to this world.", "they will not be allowed to return to this world"),
      difficulty: 3,
      questions: [
        { q: "What will not help them, in 30:57?", a: "Their excuses", wrong: ["Their prayers", "Their friends", "The angels"], why: "So, on that Day no excuse of theirs will avail those who did wrong." },
        { q: "Can they return to the world, per Ibn Kathir?", a: "No", wrong: ["Yes, once", "Yes, for a day", "If they ask"], why: "They will not be allowed to return to this world." },
        { tf: true, q: "Ibn Kathir links 30:57 to 41:24.", why: "And if they seek to please Allah, yet they are not of those who will ever be allowed to please Allah. (41:24)" }
      ]
    },
    {
      slug: "every-kind-of-parable",
      title: "Every kind of parable",
      line: "The Quran gives every example, yet deniers call it magic.",
      facts: ["Allah explains clearly", "Open your heart to signs"],
      quote: q30(58),
      source: ik(58, "Allah explained the truth with parables so people understand and follow it. Yet deniers call any sign magic, as they did when the moon split.", "and have set forth for them parables so that they may understand the truth and follow it"),
      difficulty: 4,
      questions: [
        { q: "What is in the Quran, in 30:58?", a: "Every kind of parable", wrong: ["Only laws", "Only names", "No examples"], why: "And indeed We have set forth for mankind, in this Quran every kind of parable." },
        { q: "What do deniers call the signs, in 30:58?", a: "Falsehood and magic", wrong: ["Wisdom", "Light", "Truth"], why: "You follow nothing but falsehood and magic." },
        { q: "Which sign does Ibn Kathir mention they denied?", a: "The moon split", wrong: ["The sun stopped", "The sea dried", "A star fell"], why: "As they said when the moon was cleft asunder." }
      ]
    },
    {
      slug: "sealed-hearts",
      title: "Sealed hearts",
      line: "So Allah seals the hearts of those who refuse to know.",
      facts: ["Keep your heart open", "Seek knowledge"],
      quote: q30(59),
      source: ik(59, "Those against whom the Word is justified will not believe, even if every sign comes to them, as 10:96-97 says.", "will not believe. Even if every sign should come to them"),
      difficulty: 4,
      questions: [
        { q: "Whose hearts are sealed, in 30:59?", a: "Those who know not", wrong: ["The patient", "The humble", "The scholars"], why: "Thus does Allah seal up the hearts of those who know not." },
        { q: "Would every sign change them, per Ibn Kathir?", a: "No", wrong: ["Yes, at once", "Yes, slowly", "Only one sign"], why: "Will not believe. Even if every sign should come to them." },
        { tf: true, q: "Ibn Kathir links 30:59 to 10:96-97.", why: "Truly, those, against whom the Word of your Lord has been justified, will not believe. (10:96-97)" }
      ]
    },
    {
      slug: "be-patient-the-promise-is-true",
      title: "Be patient: the promise is true",
      line: "Be patient; Allah's promise is true. Let no doubter shake you.",
      facts: ["Patience wins", "Stay firm on the truth"],
      quote: q30(60),
      source: ik(60, "Bear their opposition with patience. Allah will fulfill His promise of victory, so stay firm on the truth you were sent with.", "for Allah will fulfill His promise to grant you victory over them"),
      difficulty: 3,
      questions: [
        { q: "What is true, in 30:60?", a: "The promise of Allah", wrong: ["The rumors", "The doubts", "The magic"], why: "So be patient. Verily, the promise of Allah is true." },
        { q: "Who should not shake him, in 30:60?", a: "Those without certain faith", wrong: ["The believers", "His family", "The angels"], why: "And let not those who have no certainty of faith discourage you." },
        { q: "What will Allah grant, per Ibn Kathir?", a: "Victory", wrong: ["Defeat", "Silence", "Exile"], why: "For Allah will fulfill His promise to grant you victory over them." }
      ]
    },
    {
      slug: "ar-rum-at-fajr",
      title: "Ar-Rum at Fajr",
      line: "The Prophet ﷺ recited Ar-Rum at Fajr and urged good wudu.",
      facts: ["Make wudu carefully", "We pray together as one"],
      quote: q30(60),
      source: ik(60, "The Prophet ﷺ recited Ar-Rum at Fajr and found it hard. He asked all who pray with him to make their wudu properly.", "Whoever attends the prayer with us, let him perform Wudu"),
      difficulty: 4,
      questions: [
        { q: "In which prayer did he recite Ar-Rum, per Ibn Kathir?", a: "Fajr", wrong: ["Maghrib", "Isha", "Jumu'ah"], why: "Reports concerning the Virtues of this Surah and that it is recommended to recite it during Fajr." },
        { q: "What did he ask his followers to do?", a: "Make wudu properly", wrong: ["Pray faster", "Stay home", "Recite louder"], why: "Whoever attends the prayer with us, let him perform Wudu properly." },
        { tf: true, q: "Ibn Kathir says the report has a Hasan chain.", why: "This has a Hasan chain of narration, the text itself is Hasan." }
      ]
    }
  ]
};

export const RUM_UNITS: readonly DeepUnit[] = [RUM_ONE, RUM_TWO, RUM_THREE, RUM_FOUR];
