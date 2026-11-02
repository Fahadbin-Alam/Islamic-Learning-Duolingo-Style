import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Al-Munafiqun ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Munafiqun 63:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_63_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Munafiqun 63:${ayah}`,
    url: `https://quran.com/63:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 63:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q63 = (ayah: number) => quranQuote(63, ayah);

/** Ayahs 1 to 4: the hypocrites' false witness, their oaths as a screen, sealed hearts, and fine looks with little inside. */
const MUNAFIQUN_ONE: DeepUnit = {
  key: "munafiqun1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-63",
  name: "Al-Munafiqun, ayahs 1 to 4",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Munafiqun",
  lessons: [
    {
      slug: "zaid-heard-the-words",
      title: "A boy who told the truth",
      line: "Young Zaid bin Arqam reported what a hypocrite said.",
      facts: ["People did not believe Zaid", "Allah revealed this surah"],
      quote: q63(1),
      source: hadith("bukhari", "4900", "Zayd ibn Arqam", "Sahih", "Zaid bin Arqam heard Abdullah bin Ubai say bad words, reported them, and was not believed until Allah revealed this surah and confirmed him.", "O Zaid! Allah confirmed your statement"),
      difficulty: 2,
      questions: [
        { q: "Who heard the hypocrite and reported him?", a: "Zaid bin Arqam", wrong: ["Abu Bakr", "Bilal", "Anas"], why: "Narrated Zaid bin Arqam: I heard Abdullah bin Ubai saying it, and reported it." },
        { q: "How did Zaid feel when he was not believed?", a: "Very sad", wrong: ["Proud", "Angry at Allah", "Happy"], why: "Zaid said: I was distressed as I never was before." },
        { tf: true, q: "Allah revealed Al-Munafiqun and confirmed Zaid.", why: "The Prophet ﷺ recited it and said: O Zaid! Allah confirmed your statement." }
      ]
    },
    {
      slug: "false-witness",
      title: "Words without belief",
      line: "Hypocrites said they believed, but did not believe inside.",
      facts: ["Munafiq: a hypocrite", "Outside and inside differ"],
      quote: q63(1),
      source: ik(1, "Ibn Kathir says the hypocrites came to the Prophet ﷺ pretending to be Muslims, so Allah told that their statement had no substance.", "Allah informs that there is no substance to their statement"),
      difficulty: 2,
      questions: [
        { q: "What does Munafiq mean?", a: "A hypocrite", wrong: ["A traveler", "A teacher", "A trader"], why: "The surah is named Al-Munafiqun, the hypocrites, who pretended to be Muslims." },
        { q: "What did Allah say of their witness?", a: "They are liars", wrong: ["They are honest", "They are confused", "They are scholars"], why: "Allah bears witness that the hypocrites are liars indeed." },
        { tf: true, q: "Their statement had real belief behind it.", why: "False. Allah informs that there is no substance to their statement." }
      ]
    },
    {
      slug: "true-words-false-hearts",
      title: "True words, false heart",
      line: "Their words about the Prophet ﷺ were true, not their hearts.",
      facts: ["Allah knows he is His Messenger", "Saying is not believing"],
      quote: q63(1),
      source: ik(1, "Ibn Kathir explains that the hypocrites called liars even though their words about the Prophet ﷺ were true, because they did not believe them inside.", "But they did not believe inwardly in what they declared outwardly"),
      difficulty: 3,
      questions: [
        { q: "Why were they called liars?", a: "They did not believe inside", wrong: ["Their words were false", "They spoke Persian", "They were late"], why: "They did not believe inwardly in what they declared outwardly." },
        { q: "Who does Allah say knows he is His Messenger?", a: "Allah Himself", wrong: ["Only the hypocrites", "Only the Jinn", "No one"], why: "Allah knows that you are indeed His Messenger." },
        { tf: true, q: "Faith means believing inside, not only speaking.", why: "They did not believe inwardly in what they declared outwardly, so Allah called them liars." }
      ]
    },
    {
      slug: "three-signs",
      title: "Three signs of a hypocrite",
      line: "Lying, broken promises and betrayed trust are hypocrite signs.",
      facts: ["A Muslim keeps his word", "A Muslim returns trusts"],
      quote: q63(1),
      source: hadith("bukhari", "33", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said a hypocrite has three signs: he lies when he speaks, breaks his promises, and betrays a trust.", "The signs of a hypocrite are three"),
      difficulty: 2,
      questions: [
        { q: "How many signs of a hypocrite are named?", a: "Three", wrong: ["One", "Seven", "Ten"], why: "The signs of a hypocrite are three." },
        { q: "Which is a sign of a hypocrite?", a: "Breaking promises", wrong: ["Smiling", "Giving charity", "Praying early"], why: "Whenever he promises, he always breaks it." },
        { tf: true, q: "Telling lies is one of the three signs.", why: "Whenever he speaks, he tells a lie." }
      ]
    },
    {
      slug: "oaths-as-a-screen",
      title: "Oaths used as a shield",
      line: "Hypocrites swore false oaths to hide what was inside them.",
      facts: ["Junnah: a shield or screen", "False oaths are a sin"],
      quote: q63(2),
      source: ik(2, "Ibn Kathir says the hypocrites hid behind false oaths, swearing to be what they were not, so some Muslims were deceived.", "the hypocrites shield themselves from Muslims when they falsely and sinfully swear to be what they are not in reality"),
      difficulty: 3,
      questions: [
        { q: "What did they use as a screen?", a: "Their oaths", wrong: ["Their tents", "Their swords", "Their camels"], why: "They have made their oaths a screen." },
        { q: "Why did they swear oaths?", a: "To hide what they really were", wrong: ["To praise Allah", "To sell goods", "To make friends laugh"], why: "They falsely and sinfully swear to be what they are not in reality." },
        { tf: true, q: "Some Muslims were fooled by their oaths.", why: "Some Muslims were deceived because they did not know their falsehood." }
      ]
    },
    {
      slug: "blocking-the-path",
      title: "Turning others away",
      line: "By pretending, they turned others away from Allah's path.",
      facts: ["Their deeds were evil", "Trust must be earned"],
      quote: q63(2),
      source: ik(2, "Ibn Kathir says the hypocrites wanted harm for Islam inside, so trusting them could bring great harm to many people.", "trusting them might bring great harm to many people"),
      difficulty: 3,
      questions: [
        { q: "What did Allah call their deeds in 63:2?", a: "Evil", wrong: ["Small", "Brave", "Forgotten"], why: "Verily, evil is what they used to do." },
        { q: "What could trusting them bring?", a: "Great harm to many", wrong: ["Wealth", "Rain", "Good health"], why: "Trusting them might bring great harm to many people." },
        { tf: true, q: "Some Muslims even copied their outward ways.", why: "Some Muslims believed what hypocrites say and even imitated them in their outward behavior." }
      ]
    },
    {
      slug: "believed-then-turned",
      title: "From faith to disbelief",
      line: "They believed, then turned back and swapped guidance away.",
      facts: ["Guidance is a gift", "Do not trade it away"],
      quote: q63(3),
      source: ik(3, "Ibn Kathir says Allah decreed them hypocrites because they went back from faith to disbelief and swapped guidance for misguidance.", "they reverted from faith to disbelief and exchanged guidance for misguidance"),
      difficulty: 3,
      questions: [
        { q: "What did they exchange guidance for?", a: "Misguidance", wrong: ["Gold", "Land", "Knowledge"], why: "They reverted from faith to disbelief and exchanged guidance for misguidance." },
        { q: "What came first, per 63:3?", a: "They believed", wrong: ["They traveled", "They fought", "They fasted"], why: "That is because they believed, and then disbelieved." },
        { tf: true, q: "They kept their faith firm to the end.", why: "False. They reverted from faith to disbelief." }
      ]
    },
    {
      slug: "hearts-sealed",
      title: "Sealed hearts",
      line: "Their hearts were sealed, so guidance could not reach them.",
      facts: ["Ask Allah to keep hearts open", "Choices shape the heart"],
      quote: q63(3),
      source: ik(3, "Ibn Kathir says Allah sealed their hearts after their choice, so they could not understand guidance nor let goodness in.", "they cannot comprehend the guidance, nor any goodness can reach their hearts"),
      difficulty: 3,
      questions: [
        { q: "What happened to their hearts?", a: "They were sealed", wrong: ["They grew soft", "They were healed", "They were washed"], why: "Therefore their hearts are sealed, so they understand not." },
        { q: "What could not reach their hearts?", a: "Any goodness", wrong: ["Any sound", "Any light", "Any food"], why: "They cannot comprehend the guidance, nor any goodness can reach their hearts." },
        { tf: true, q: "The sealing came after they turned away.", why: "That is because they believed, and then disbelieved; therefore their hearts are sealed." }
      ]
    },
    {
      slug: "bodies-please-you",
      title: "Fine looks, fine words",
      line: "Hypocrites looked handsome and spoke well, but were weak inside.",
      facts: ["Looks do not show faith", "Speech can hide fear"],
      quote: q63(4),
      source: ik(4, "Ibn Kathir says hypocrites looked graceful and spoke well, yet they were weak and full of fear inside.", "hypocrites have a graceful outer appearance and are eloquent"),
      difficulty: 2,
      questions: [
        { q: "What pleased people about the hypocrites?", a: "Their bodies and speech", wrong: ["Their prayers", "Their charity", "Their fasting"], why: "When you look at them, their bodies please you; and when they speak, you listen to their words." },
        { q: "What were they like inside?", a: "Weak and fearful", wrong: ["Brave and strong", "Calm and wise", "Kind and humble"], why: "Hypocrites are truly weak and feeble, full of fear, fright and cowardice." },
        { tf: true, q: "Looking good always means being good.", why: "False. Hypocrites have a graceful outer appearance and are eloquent, yet they are weak inside." }
      ]
    },
    {
      slug: "most-handsome-men",
      title: "The most handsome men",
      line: "Zaid said the men compared to wood were very handsome.",
      facts: ["Allah looks at the heart", "Good looks are not faith"],
      quote: q63(4),
      source: hadith("bukhari", "4903", "Zaid bin Arqam", "Sahih", "Zaid bin Arqam explained that the people compared to propped up wood were the most handsome men.", "They were the most handsome men"),
      difficulty: 3,
      questions: [
        { q: "How did Zaid describe these men?", a: "The most handsome men", wrong: ["The oldest men", "The poorest men", "The shortest men"], why: "Concerning pieces of wood propped up, Zaid said: They were the most handsome men." },
        { q: "What are they compared to in 63:4?", a: "Propped up wood", wrong: ["Tall palm trees", "Bright stars", "Strong mountains"], why: "They are as blocks of wood propped up." },
        { tf: true, q: "Zaid bin Arqam narrated this explanation.", why: "Narrated Zaid bin Arqam: They were the most handsome men." }
      ]
    },
    {
      slug: "propped-up-wood",
      title: "Like propped up wood",
      line: "Propped up wood looks firm but has no life or use.",
      facts: ["A shape with no substance", "Faith gives a person worth"],
      quote: q63(4),
      source: ik(4, "Ibn Kathir explains the wood example: they are shapes without much substance inside.", "They are shapes that do not have much substance"),
      difficulty: 3,
      questions: [
        { q: "What does the wood example teach?", a: "A shape with little inside", wrong: ["Great strength", "Long life", "Hard work"], why: "They are shapes that do not have much substance." },
        { q: "Propped up wood cannot do what?", a: "Stand on its own", wrong: ["Look tall", "Be seen", "Have a shape"], why: "They are as blocks of wood propped up, shapes that do not have much substance." },
        { tf: true, q: "The example praises the hypocrites.", why: "False. They are shapes that do not have much substance." }
      ]
    },
    {
      slug: "every-cry-against-them",
      title: "Scared of every shout",
      line: "Hypocrites thought every shout or scary event was aimed at them.",
      facts: ["A guilty heart is restless", "Faith brings calm"],
      quote: q63(4),
      source: ik(4, "Ibn Kathir says whenever something frightening happened, the hypocrites thought it was aimed at them, showing their cowardice.", "they think that it is headed their way. This is indicative of their cowardice"),
      difficulty: 3,
      questions: [
        { q: "What did they think every cry meant?", a: "It was against them", wrong: ["It was a song", "It was the call to prayer", "It was good news"], why: "They think that every cry is against them." },
        { q: "What did this show about them?", a: "Their cowardice", wrong: ["Their courage", "Their wisdom", "Their wealth"], why: "They think that it is headed their way. This is indicative of their cowardice." },
        { tf: true, q: "A heart with a secret often lives in fear.", why: "Every time something frightening happens, they think that it is headed their way." }
      ]
    },
    {
      slug: "beware-of-them",
      title: "Be careful of them",
      line: "Allah warned the believers to be careful of the hypocrites.",
      facts: ["Be wise, not fooled", "Judge by deeds, not words"],
      quote: q63(4),
      source: ik(4, "Ibn Kathir quotes Allah calling them the enemies and warning the believers to be careful of them.", "They are the enemies, so beware of them"),
      difficulty: 2,
      questions: [
        { q: "What did Allah tell the believers to do?", a: "Beware of them", wrong: ["Copy them", "Follow them", "Praise them"], why: "They are the enemies, so beware of them." },
        { q: "What did Allah call the hypocrites?", a: "The enemies", wrong: ["The guests", "The helpers", "The leaders"], why: "They are the enemies, so beware of them." },
        { tf: true, q: "A believer should not be fooled by fine words.", why: "They are the enemies, so beware of them, even when their bodies please you." }
      ]
    },
    {
      slug: "sheep-between-flocks",
      title: "A sheep between two flocks",
      line: "A hypocrite wanders like a sheep between two flocks.",
      facts: ["Belongs fully to neither", "Believers stay firm"],
      quote: q63(4),
      source: hadith("muslim", "2784", "Ibn Umar", "Sahih", "The Prophet ﷺ compared a hypocrite to a sheep roaming between two flocks, going to one and then the other.", "The similitude of a hypocrite is that of a sheep which roams aimlessly between two flocks"),
      difficulty: 2,
      questions: [
        { q: "What animal is a hypocrite compared to?", a: "A sheep", wrong: ["A lion", "A camel", "A bird"], why: "The similitude of a hypocrite is that of a sheep which roams aimlessly between two flocks." },
        { q: "How many flocks does the sheep wander between?", a: "Two", wrong: ["One", "Three", "Five"], why: "A sheep which roams aimlessly between two flocks." },
        { tf: true, q: "The sheep settles firmly with one flock.", why: "False. She goes to one at one time and to the other at another time." }
      ]
    },
    {
      slug: "heavy-prayers",
      title: "The heaviest prayers",
      line: "Fajr and Isha are the heaviest prayers for hypocrites.",
      facts: ["Their reward is huge", "Believers love to attend"],
      quote: q63(4),
      source: hadith("bukhari", "657", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said no prayer is heavier on the hypocrites than Fajr and Isha, and if they knew their reward they would come even crawling.", "No prayer is heavier upon the hypocrites than the Fajr"),
      difficulty: 3,
      questions: [
        { q: "Which prayers are heaviest for hypocrites?", a: "Fajr and Isha", wrong: ["Dhuhr and Asr", "Asr and Maghrib", "Eid and Friday"], why: "No prayer is heavier upon the hypocrites than the Fajr and the Isha prayers." },
        { q: "If they knew the reward, how would they come?", a: "Even crawling", wrong: ["Never", "Only on Fridays", "Only in Ramadan"], why: "They would have attended them, even if crawling." },
        { tf: true, q: "Praying Fajr with the people is a sign of faith.", why: "No prayer is heavier upon the hypocrites than the Fajr and the Isha prayers." }
      ]
    }
  ]
};

/** Ayahs 5 to 8: turning away in pride, the journey home, "spend not", and honor that belongs to Allah. */
const MUNAFIQUN_TWO: DeepUnit = {
  key: "munafiqun2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-63",
  name: "Al-Munafiqun, ayahs 5 to 8",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Munafiqun",
  lessons: [
    {
      slug: "turning-heads-in-pride",
      title: "Turning away in pride",
      line: "Invited to seek forgiveness, they turned their heads away.",
      facts: ["Pride blocks goodness", "Accept a good invitation"],
      quote: q63(5),
      source: ik(5, "Ibn Kathir says when the hypocrites were invited to have the Prophet ﷺ ask forgiveness for them, they turned away in arrogance.", "they turn away, ignoring this call in arrogance, belittling what they are invited to"),
      difficulty: 2,
      questions: [
        { q: "What were they invited to?", a: "To be prayed for forgiveness", wrong: ["To a feast", "To a trade", "To a journey"], why: "Come, so that the Messenger of Allah may ask forgiveness from Allah for you." },
        { q: "How did they react?", a: "Turned away in pride", wrong: ["Ran to him", "Cried with joy", "Said thank you"], why: "They turn away, ignoring this call in arrogance, belittling what they are invited to." },
        { tf: true, q: "Pride can stop a person from accepting good.", why: "They turn away, ignoring this call in arrogance, and you would see them turning away their faces in pride." }
      ]
    },
    {
      slug: "about-ibn-ubay",
      title: "Who the ayahs are about",
      line: "Early scholars said these ayahs were about Abdullah bin Ubay.",
      facts: ["He led the hypocrites", "He lived in Madinah"],
      quote: q63(5),
      source: ik(5, "Ibn Kathir says several of the Salaf said this whole passage came down about Abdullah bin Ubay bin Salul.", "this entire passage was revealed in the case of"),
      difficulty: 3,
      questions: [
        { q: "Who were these ayahs revealed about?", a: "Abdullah bin Ubay", wrong: ["Abu Lahab", "Firawn", "Qarun"], why: "Several of the Salaf mentioned that this entire passage was revealed in the case of Abdullah bin Ubay bin Salul." },
        { q: "Who are the Salaf?", a: "The early Muslims", wrong: ["The angels", "The Jinn", "Later kings"], why: "Several of the Salaf, the earliest generations of Muslims, mentioned this." },
        { tf: true, q: "Abdullah bin Ubay was a hypocrite leader in Madinah.", why: "Several of the Salaf mentioned that this entire passage was revealed in the case of Abdullah bin Ubay bin Salul." }
      ]
    },
    {
      slug: "did-not-wish-forgiveness",
      title: "He did not want it",
      line: "Told to seek the Prophet's ﷺ prayer, Ibn Ubay refused it.",
      facts: ["His people urged him", "He refused out of pride"],
      quote: q63(5),
      source: ik(5, "Ibn Kathir reports from Ibn Ishaq that Ibn Ubay was told to go back so the Prophet ﷺ could ask forgiveness for him, and he refused.", "I do not wish that he ask Allah to forgive me"),
      difficulty: 3,
      questions: [
        { q: "What did Ibn Ubay say he did not wish for?", a: "To be prayed for forgiveness", wrong: ["To travel", "To eat", "To be rich"], why: "He said: By Allah, I do not wish that he ask Allah to forgive me." },
        { q: "Who urged him to go back?", a: "Some men from the Ansar", wrong: ["His enemies", "The Quraysh", "Travelers"], why: "Some men from Al-Ansar met him at the gate of the Masjid and told him to go back." },
        { tf: true, q: "A believer is happy when someone prays for him.", why: "Ibn Ubay refused it in pride: I do not wish that he ask Allah to forgive me." }
      ]
    },
    {
      slug: "equal-for-them",
      title: "Forgiveness they refused",
      line: "For those who refuse in pride, asking forgiveness will not help.",
      facts: ["Allah guides the humble", "Fasiq: a rebellious one"],
      quote: q63(6),
      source: ik(5, "Ibn Kathir explains that Allah punished their pride: it is equal whether forgiveness is asked for them or not.", "It is equal to them whether you ask forgiveness or ask not forgiveness for them"),
      difficulty: 3,
      questions: [
        { q: "Whom does Allah not guide, per 63:6?", a: "The rebellious people", wrong: ["The poor", "The young", "The travelers"], why: "Verily, Allah guides not the people who are the rebellious." },
        { q: "Why were they not forgiven?", a: "They refused in pride", wrong: ["They were too poor", "They were too young", "They lived far"], why: "Allah punished them for this behavior, saying, It is equal to them whether you ask forgiveness or not." },
        { tf: true, q: "Ibn Kathir links 63:6 to Surat Bara'ah.", why: "As Allah said in Surat Bara'ah, and a discussion preceded there." }
      ]
    },
    {
      slug: "a-fight-over-water",
      title: "A quarrel on a journey",
      line: "On a journey, an emigrant hurt a man of the Ansar.",
      facts: ["Muhajirun: those who moved", "Ansar: the helpers of Madinah"],
      quote: q63(8),
      source: hadith("bukhari", "4905", "Jabir bin Abdullah", "Sahih", "Jabir said that on a journey an emigrant hurt an Ansari man, and each called out to his own group for help.", "O the Ansar! … O the emigrants!"),
      difficulty: 2,
      questions: [
        { q: "Who were the Ansar?", a: "The Muslims of Madinah", wrong: ["The people of Makkah", "Travelers from Yemen", "Traders from Sham"], why: "The Ansar man called out, O the Ansar, and the emigrant called, O the emigrants." },
        { q: "What did each man call out?", a: "The name of his own group", wrong: ["The adhan", "A poem", "A prayer"], why: "The Ansari man said, O the Ansar! and the emigrant said, O the emigrants!" },
        { tf: true, q: "Jabir bin Abdullah narrated this story.", why: "Narrated Jabir bin Abdullah: We were in a Ghazwa." }
      ]
    },
    {
      slug: "call-of-ignorance",
      title: "Leave that call",
      line: "The Prophet ﷺ said group shouting is a call of ignorance.",
      facts: ["Jahiliyyah: the age of ignorance", "Muslims are one family"],
      quote: q63(8),
      source: hadith("bukhari", "4905", "Jabir bin Abdullah", "Sahih", "The Prophet ﷺ asked why they used a call of the days of ignorance, and told them to leave it because it is detestable.", "What is this call for, which is characteristic of the period of ignorance? … as is a detestable thing"),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ call their shouting?", a: "A call of ignorance", wrong: ["A good habit", "A kind of prayer", "A brave act"], why: "What is this call for, which is characteristic of the period of ignorance?" },
        { q: "What did he tell them to do with it?", a: "Leave it", wrong: ["Repeat it", "Write it down", "Sing it louder"], why: "Leave it, as it is a detestable thing." },
        { tf: true, q: "Muslims should not split into groups against each other.", why: "He called group calls characteristic of the period of ignorance and said: Leave it." }
      ]
    },
    {
      slug: "spend-not",
      title: "Spend nothing on them",
      line: "Ibn Ubay told friends to stop feeding the believers.",
      facts: ["He wanted them to scatter", "Food was short on the trip"],
      quote: q63(7),
      source: hadith("bukhari", "4903", "Zaid bin Arqam", "Sahih", "Zaid said food was short on a journey, and Ibn Ubay told his friends not to spend on the Prophet's ﷺ companions so they would leave him.", "that they may disperse and go away from him"),
      difficulty: 3,
      questions: [
        { q: "What did Ibn Ubay tell his friends?", a: "Do not spend on them", wrong: ["Feed them well", "Pray with them", "Travel with them"], why: "Do not spend on those who are with Allah's Messenger, that they may disperse and go away from him." },
        { q: "What did he hope would happen?", a: "They would leave the Prophet ﷺ", wrong: ["They would get rich", "They would grow strong", "They would build a masjid"], why: "That they may disperse and go away from him." },
        { tf: true, q: "Food was short on that journey.", why: "We went out with the Prophet ﷺ on a journey and the people suffered from lack of provisions." }
      ]
    },
    {
      slug: "treasures-belong-to-allah",
      title: "All treasures are Allah's",
      line: "No one can starve the believers, since Allah owns all treasures.",
      facts: ["Provision is from Allah", "People cannot block it"],
      quote: q63(7),
      source: ik(5, "Ibn Kathir quotes the ayah answering them: the treasures of the heavens and earth belong to Allah, but the hypocrites do not understand.", "And to Allah belong the treasures of the heavens and the earth, but the hypocrites comprehend not"),
      difficulty: 2,
      questions: [
        { q: "To whom do the treasures belong?", a: "Allah", wrong: ["The kings", "The traders", "The hypocrites"], why: "And to Allah belong the treasures of the heavens and the earth." },
        { q: "What did the hypocrites fail to grasp?", a: "That Allah provides", wrong: ["How to count", "How to travel", "How to farm"], why: "And to Allah belong the treasures of the heavens and the earth, but the hypocrites comprehend not." },
        { tf: true, q: "Stopping charity can cut off Allah's provision.", why: "False. To Allah belong the treasures of the heavens and the earth." }
      ]
    },
    {
      slug: "allah-confirmed-zaid",
      title: "Allah confirmed Zaid",
      line: "Ibn Ubay denied it, but Allah confirmed Zaid's report.",
      facts: ["Some blamed young Zaid", "Truth came from Allah"],
      quote: q63(7),
      source: hadith("bukhari", "4902", "Zaid bin Arqam", "Sahih", "Zaid said the Ansar blamed him and Ibn Ubay swore he never spoke, then the Prophet ﷺ called Zaid and told him Allah had confirmed him.", "Allah has confirmed your statement"),
      difficulty: 2,
      questions: [
        { q: "What did Ibn Ubay do when asked?", a: "Swore he did not say it", wrong: ["Said sorry", "Ran away", "Stayed silent"], why: "Abdullah bin Ubai swore that he did not say." },
        { q: "What did the Prophet ﷺ tell Zaid?", a: "Allah confirmed your words", wrong: ["You were wrong", "Go home", "Be quiet"], why: "He said, Allah has confirmed your statement." },
        { tf: true, q: "Ayah 63:7 came down about Ibn Ubay's words.", why: "The Verse: They are the ones who say: Spend nothing, was revealed." }
      ]
    },
    {
      slug: "the-more-honorable",
      title: "Who is truly honorable?",
      line: "Ibn Ubay boasted the mighty would drive out the weak.",
      facts: ["He thought he was mighty", "Allah answered him"],
      quote: q63(8),
      source: hadith("bukhari", "4905", "Jabir bin Abdullah", "Sahih", "Jabir said Ibn Ubay boasted that on return to Madinah the more honorable would drive out the meaner.", "if we return Medina, surely, the more honorable will expel therefrom the meaner"),
      difficulty: 3,
      questions: [
        { q: "What did Ibn Ubay boast?", a: "The mighty would drive out the weak", wrong: ["He would give charity", "He would leave Madinah", "He would become Muslim"], why: "If we return Medina, surely, the more honorable will expel therefrom the meaner." },
        { q: "Whom did he mean by the more honorable?", a: "Himself and his people", wrong: ["The Prophet ﷺ", "The angels", "The Muhajirun"], why: "He boasted: the more honorable will expel therefrom the meaner, meaning himself." },
        { tf: true, q: "Allah answered his boast in the same ayah.", why: "But Al-Izzah belongs to Allah, and to His Messenger, and to the believers." }
      ]
    },
    {
      slug: "honor-belongs-to-allah",
      title: "Honor belongs to Allah",
      line: "True honor belongs to Allah, His Messenger and the believers.",
      facts: ["Izzah: honor and might", "Honor comes through faith"],
      quote: q63(8),
      source: ik(5, "Ibn Kathir quotes the answer to Ibn Ubay: honor belongs to Allah, His Messenger and the believers, but the hypocrites do not know.", "belongs to Allah, and to His Messenger, and to the believers, but the hypocrites know not"),
      difficulty: 2,
      questions: [
        { q: "To whom does honor belong, per 63:8?", a: "Allah, His Messenger, the believers", wrong: ["The rich", "The strong tribes", "The hypocrites"], why: "Al-Izzah belongs to Allah, and to His Messenger, and to the believers." },
        { q: "What does Izzah mean?", a: "Honor and might", wrong: ["Sleep", "Travel", "Food"], why: "Al-Izzah belongs to Allah, and to His Messenger, and to the believers." },
        { tf: true, q: "The hypocrites understood where honor comes from.", why: "False. But the hypocrites know not." }
      ]
    },
    {
      slug: "you-are-the-mighty",
      title: "Usayd answers",
      line: "Usayd told the Prophet ﷺ: you are the mighty one.",
      facts: ["Usayd was of the Ansar", "He also asked for gentleness"],
      quote: q63(8),
      source: ik(5, "Ibn Kathir reports from Ibn Ishaq that Usayd bin Al-Hudayr told the Prophet ﷺ he was the mighty one, and asked him to be gentle with Ibn Ubay.", "Indeed, you are the mighty one"),
      difficulty: 3,
      questions: [
        { q: "What did Usayd tell the Prophet ﷺ?", a: "You are the mighty one", wrong: ["Let us go home", "Ibn Ubay is right", "We are hungry"], why: "Usayd said, Indeed, you are the mighty one, O Allah's Messenger." },
        { q: "What else did Usayd ask?", a: "To be gentle with Ibn Ubay", wrong: ["To leave Madinah", "To punish Zaid", "To stop the trip"], why: "Usayd said, Take it easy with him, O Allah's Messenger." },
        { tf: true, q: "Usayd bin Al-Hudayr was one of the Ansar.", why: "Usayd bin Al-Hudayr, of the Ansar, greeted the Prophet ﷺ acknowledging his prophethood." }
      ]
    },
    {
      slug: "stopping-the-gossip",
      title: "Ending the gossip",
      line: "The Prophet ﷺ kept traveling so the quarrel talk would stop.",
      facts: ["He traveled all night", "Tired people slept, talk ended"],
      quote: q63(8),
      source: ik(5, "Ibn Kathir reports the Prophet ﷺ traveled a long time without stopping to keep people busy from talking about what happened.", "He wanted to busy them from talking about what had happened"),
      difficulty: 3,
      questions: [
        { q: "Why did the Prophet ﷺ travel so long?", a: "To stop the quarrel talk", wrong: ["To find water", "To reach Makkah", "To race others"], why: "He wanted to busy them from talking about what had happened." },
        { q: "What did people do when they stopped?", a: "They fell asleep", wrong: ["They argued more", "They went home", "They held a feast"], why: "The minute people felt the ground under their feet, they went to sleep." },
        { tf: true, q: "Stopping gossip early can protect people from harm.", why: "He wanted to busy them from talking about what had happened." }
      ]
    }
  ]
};

/** Ayahs 9 to 11: do not let wealth and children distract you, and give charity before the time runs out. */
const MUNAFIQUN_THREE: DeepUnit = {
  key: "munafiqun3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-63",
  name: "Al-Munafiqun, ayahs 9 to 11",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Munafiqun",
  lessons: [
    {
      slug: "do-not-be-distracted",
      title: "Do not get distracted",
      line: "Wealth and children must not distract us from remembering Allah.",
      facts: ["Both are blessings", "Allah comes first"],
      quote: q63(9),
      source: ik(9, "Ibn Kathir says Allah orders the believers to remember Him often and not be distracted from it by their wealth and children.", "refrain from being distracted from His remembrance by indulging in their properties and children excessively"),
      difficulty: 2,
      questions: [
        { q: "What two things can distract us, per 63:9?", a: "Wealth and children", wrong: ["Rain and wind", "Books and pens", "Sun and moon"], why: "Let not your properties or your children divert you from the remembrance of Allah." },
        { q: "What should they not distract us from?", a: "Remembering Allah", wrong: ["Playing games", "Sleeping", "Shopping"], why: "Refrain from being distracted from His remembrance by indulging in their properties and children excessively." },
        { tf: true, q: "Loving family is fine if Allah still comes first.", why: "The warning is against indulging in their properties and children excessively." }
      ]
    },
    {
      slug: "the-real-losers",
      title: "The real losers",
      line: "Those busied away from Allah by this world are the losers.",
      facts: ["Not money losers", "Losers on the Last Day"],
      quote: q63(9),
      source: ik(9, "Ibn Kathir says those kept busy by worldly life from obeying Allah will lose themselves and their families on the Day of Resurrection.", "They will lose themselves and their families on the Day of Resurrection"),
      difficulty: 3,
      questions: [
        { q: "What does Allah call the distracted ones?", a: "The losers", wrong: ["The winners", "The scholars", "The travelers"], why: "And whosoever does that, then they are the losers." },
        { q: "When is their loss, per Ibn Kathir?", a: "The Day of Resurrection", wrong: ["Next week", "In the market", "At school"], why: "They will lose themselves and their families on the Day of Resurrection." },
        { tf: true, q: "Ibn Kathir says they lose their families too.", why: "They will lose themselves and their families on the Day of Resurrection." }
      ]
    },
    {
      slug: "created-to-remember",
      title: "Why we were created",
      line: "We were created to obey and remember Allah.",
      facts: ["Life has a purpose", "Dhikr: remembering Allah"],
      quote: q63(9),
      source: ik(9, "Ibn Kathir says people busy with this life forget obeying and remembering Allah, which is what they were created for.", "the obedience and remembrance of Allah, for which they were created"),
      difficulty: 2,
      questions: [
        { q: "What were we created for, per Ibn Kathir?", a: "To obey and remember Allah", wrong: ["To collect money", "To win games", "To be famous"], why: "The obedience and remembrance of Allah, for which they were created." },
        { q: "What is Dhikr?", a: "Remembering Allah", wrong: ["Eating", "Traveling", "Building"], why: "Allah orders His servants to remember Him frequently." },
        { tf: true, q: "Allah orders believers to remember Him often.", why: "Allah the Exalted orders His faithful servants to remember Him frequently." }
      ]
    },
    {
      slug: "two-valleys",
      title: "Never enough",
      line: "With two valleys of money, a person would still want a third.",
      facts: ["Greed is never full", "Repentance is open"],
      quote: q63(9),
      source: hadith("bukhari", "6436", "Ibn Abbas", "Sahih", "The Prophet ﷺ said if a person had two valleys of money he would want a third, and Allah forgives whoever repents.", "he would wish for a third … Allah forgives him who repents to Him"),
      difficulty: 3,
      questions: [
        { q: "With two valleys of money, what would he want?", a: "A third", wrong: ["Nothing more", "Only one", "To give it all"], why: "If the son of Adam had two valleys of money, he would wish for a third." },
        { q: "Whom does Allah forgive, per the hadith?", a: "Whoever repents to Him", wrong: ["Only the rich", "Only the old", "No one"], why: "And Allah forgives him who repents to Him." },
        { tf: true, q: "More money alone never fully satisfies a person.", why: "If the son of Adam had two valleys of money, he would wish for a third." }
      ]
    },
    {
      slug: "spend-from-provision",
      title: "Spend from what you have",
      line: "Allah tells us to spend from what He gave us.",
      facts: ["All we have is from Allah", "Giving is a thank you"],
      quote: q63(10),
      source: ik(9, "Ibn Kathir says Allah encourages the believers to spend in His cause from what He provided.", "Allah encourages the believers to spend in His cause"),
      difficulty: 2,
      questions: [
        { q: "Who gave us what we spend?", a: "Allah", wrong: ["Our luck", "The market", "Our friends only"], why: "And spend of that with which We have provided you." },
        { q: "What does Allah encourage, per Ibn Kathir?", a: "Spending in His cause", wrong: ["Saving everything", "Buying more", "Hiding money"], why: "Allah encourages the believers to spend in His cause." },
        { tf: true, q: "63:10 tells us to give before death comes.", why: "And spend of that with which We have provided you before death comes to one of you." }
      ]
    },
    {
      slug: "best-charity",
      title: "The best charity",
      line: "The best charity is given while healthy and hoping for wealth.",
      facts: ["Give while it is hard", "Then the reward is greater"],
      quote: q63(10),
      source: hadith("bukhari", "1419", "Abu Hurairah", "Sahih", "The Prophet ﷺ said the best charity is given while you are healthy, worried about being poor and hoping to be rich.", "The charity which you practice while you are healthy"),
      difficulty: 3,
      questions: [
        { q: "When is charity best, per the hadith?", a: "While healthy", wrong: ["When very old", "When sick", "After death"], why: "The charity which you practice while you are healthy." },
        { q: "What feeling makes the giving greater?", a: "Fear of becoming poor", wrong: ["Feeling bored", "Feeling sleepy", "Feeling full"], why: "While you are healthy, niggardly and afraid of poverty and wish to become wealthy." },
        { tf: true, q: "Abu Hurairah narrated the best-charity hadith.", why: "Narrated Abu Huraira: A man came to the Prophet ﷺ and asked which charity is best." }
      ]
    },
    {
      slug: "do-not-delay",
      title: "Do not wait too long",
      line: "Do not delay charity until the very end of life.",
      facts: ["Time is limited", "Give today, not later"],
      quote: q63(10),
      source: hadith("bukhari", "1419", "Abu Hurairah", "Sahih", "The Prophet ﷺ said do not wait until death is near and then say give this much to this and that person.", "Do not delay it to the time of approaching death"),
      difficulty: 2,
      questions: [
        { q: "What does the hadith say not to delay?", a: "Charity", wrong: ["Sleep", "Meals", "Games"], why: "Do not delay it to the time of approaching death." },
        { q: "When is it too late to give?", a: "When death is near", wrong: ["In the morning", "On Friday", "In winter"], why: "Do not delay it to the time of approaching death and then say, Give so much to such and such." },
        { tf: true, q: "63:10 and the Prophet's ﷺ words agree: give early.", why: "Spend before death comes; do not delay it to the time of approaching death." }
      ]
    },
    {
      slug: "wish-for-more-time",
      title: "Wishing for more time",
      line: "At the end, many wish for a little more time to give.",
      facts: ["They want to give Sadaqah", "And be among the righteous"],
      quote: q63(10),
      source: ik(9, "Ibn Kathir says everyone who fell short will regret it at death and ask for a little more time to do better.", "every person who fell into shortcomings will regret it by the time of his death and will ask for respite"),
      difficulty: 3,
      questions: [
        { q: "What does the person ask for in 63:10?", a: "A little more time", wrong: ["More money", "A new house", "A long trip"], why: "My Lord! If only You would give me respite for a little while." },
        { q: "What would he do with more time?", a: "Give charity", wrong: ["Sleep more", "Play more", "Travel more"], why: "Then I should give Sadaqah from my wealth, and be among the righteous." },
        { tf: true, q: "Those who fell short will feel regret at the end.", why: "Every person who fell into shortcomings will regret it by the time of his death." }
      ]
    },
    {
      slug: "send-me-back",
      title: "Just a word",
      line: "Asking to be sent back at death is only a word.",
      facts: ["Ibn Kathir cites 23:99-100", "Barzakh: the barrier"],
      quote: q63(10),
      source: ik(9, "Ibn Kathir quotes 23:99-100: a person asks to be sent back to do good, but it is only a word, and the Barzakh is behind them.", "No! It is but a word that he speaks"),
      difficulty: 4,
      questions: [
        { q: "Which ayahs does Ibn Kathir quote?", a: "23:99-100", wrong: ["2:255", "112:1-4", "1:1-7"], why: "My Lord! send me back. So that I may do good. No! It is but a word that he speaks. (23:99-100)" },
        { q: "What is the Barzakh?", a: "A barrier until resurrection", wrong: ["A river", "A city", "A mountain"], why: "And behind them is Barzakh (a barrier) until the Day when they will be resurrected." },
        { tf: true, q: "A person is sent back if he asks at death.", why: "False. No! It is but a word that he speaks." }
      ]
    },
    {
      slug: "like-a-traveler",
      title: "Like a traveler",
      line: "Live in this world like a stranger or a traveler.",
      facts: ["A traveler packs light", "Home is the Hereafter"],
      quote: q63(10),
      source: hadith("bukhari", "6416", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ took Ibn Umar by the shoulder and told him to be in this world like a stranger or a traveler.", "Be in this world as if you were a stranger or a traveler"),
      difficulty: 2,
      questions: [
        { q: "How should we live in this world?", a: "Like a traveler", wrong: ["Like a king", "Like it lasts forever", "Like a guard"], why: "Be in this world as if you were a stranger or a traveler." },
        { q: "What did the Prophet ﷺ hold while teaching?", a: "Ibn Umar's shoulder", wrong: ["His hand", "A book", "A stick"], why: "Allah's Messenger took hold of my shoulder and said: Be in this world as if you were a stranger." },
        { tf: true, q: "A traveler does not get too attached to a road stop.", why: "Be in this world as if you were a stranger or a traveler." }
      ]
    },
    {
      slug: "health-before-sickness",
      title: "Use health well",
      line: "Ibn Umar said to use health before sickness comes.",
      facts: ["Use life before it ends", "Do good today"],
      quote: q63(10),
      source: hadith("bukhari", "6416", "Abdullah ibn Umar", "Sahih", "Ibn Umar advised taking from your health for your sickness and from your life for your death.", "take from your health for your sickness"),
      difficulty: 3,
      questions: [
        { q: "What should we take from our health?", a: "Good deeds for sickness", wrong: ["Rest only", "Sleep only", "Nothing"], why: "Take from your health for your sickness, and from your life for your death." },
        { q: "Who gave this advice?", a: "Ibn Umar", wrong: ["Abu Lahab", "Ibn Ubay", "Firawn"], why: "Ibn Umar used to say: take from your health for your sickness." },
        { tf: true, q: "We should do good while we are strong.", why: "Take from your health for your sickness, and from your life for your death." }
      ]
    },
    {
      slug: "no-respite",
      title: "No delay when time comes",
      line: "When a person's time comes, Allah gives no extra time.",
      facts: ["Every life has a set time", "Prepare now"],
      quote: q63(11),
      source: ik(9, "Ibn Kathir says when the time of death comes, no one is given more time.", "when the time of death comes, no one will be granted respite"),
      difficulty: 2,
      questions: [
        { q: "Is anyone given extra time when it comes?", a: "No one", wrong: ["Only the rich", "Only the young", "Everyone"], why: "When the time of death comes, no one will be granted respite." },
        { q: "What should we do since time is set?", a: "Do good now", wrong: ["Wait and see", "Delay good deeds", "Forget about it"], why: "And Allah grants respite to none when his appointed time comes." },
        { tf: true, q: "Every person has an appointed time.", why: "And Allah grants respite to none when his appointed time comes." }
      ]
    },
    {
      slug: "all-aware",
      title: "Allah knows what you do",
      line: "The surah ends: Allah is All-Aware of everything we do.",
      facts: ["Al-Khabir: the All-Aware", "Nothing is hidden from Him"],
      quote: q63(11),
      source: ik(9, "Ibn Kathir closes the surah with the ayah: Allah is All-Aware of what you do.", "And Allah is All-Aware of what you do"),
      difficulty: 2,
      questions: [
        { q: "How does Al-Munafiqun end?", a: "Allah is All-Aware of what you do", wrong: ["Allah is the King", "Spend not", "Beware of them"], why: "And Allah is All-Aware of what you do." },
        { q: "Can hypocrites hide anything from Allah?", a: "No, He knows all", wrong: ["Yes, their oaths", "Yes, their looks", "Yes, at night"], why: "And Allah is All-Aware of what you do." },
        { tf: true, q: "Al-Munafiqun has eleven ayahs.", why: "The surah ends at ayah 11: And Allah is All-Aware of what you do." }
      ]
    }
  ]
};

export const MUNAFIQUN_UNITS: readonly DeepUnit[] = [MUNAFIQUN_ONE, MUNAFIQUN_TWO, MUNAFIQUN_THREE];
