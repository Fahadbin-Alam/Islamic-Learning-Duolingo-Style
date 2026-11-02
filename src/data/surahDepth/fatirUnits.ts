import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Fatir ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Fatir 35:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_35_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Fatir 35:${ayah}`,
    url: `https://quran.com/35:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 35:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q35 = (ayah: number) => quranQuote(35, ayah);

/** Ayahs 1 to 23: the Originator, mercy none can hold back, Shaytan the enemy, the two seas, and the blind and the seeing. */
const FATIR_ONE: DeepUnit = {
  key: "fatir1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-35",
  name: "Fatir, ayahs 1 to 23",
  kind: "skill",
  lessonType: "surah",
  surahName: "Fatir",
  lessons: [
    {
      slug: "originator-of-the-heavens",
      title: "Originator of the heavens",
      line: "Allah began the heavens and earth, and gave angels wings.",
      facts: ["Fatir means the Originator", "Angels have two, three or four wings"],
      quote: q35(1),
      source: ik(1, "Ibn Abbas learned the meaning of Fatir from two bedouins arguing over a well: it means the one who began something.", "The Originator of the heavens and the earth"),
      difficulty: 2,
      questions: [
        { q: "What does Fatir mean, per Ibn Abbas?", a: "The Originator", wrong: ["The Judge", "The Gentle", "The Last"], why: "Fatir of the heavens and the earth means, The Originator of the heavens and the earth." },
        { q: "How did Ibn Abbas learn the word, per Ibn Kathir?", a: "Two bedouins over a well", wrong: ["From a poem", "From a dream", "From a market"], why: "Until two bedouins came to me disputing over a well. One said: I started it." },
        { q: "Why do angels have wings, per Ibn Kathir?", a: "To deliver commands quickly", wrong: ["To look beautiful", "To swim", "To rest"], why: "With which they fly to convey quickly that which they have been commanded to convey." },
        { tf: true, q: "Jibril was seen with six hundred wings.", why: "The Messenger of Allah saw Jibril on the Night of the Isra with six hundred wings." }
      ]
    },
    {
      slug: "mercy-none-can-hold",
      title: "Mercy none can hold back",
      line: "None can stop the mercy Allah sends, or send what He holds.",
      facts: ["What He wills happens", "A dhikr after every prayer"],
      quote: q35(2),
      source: hadith("bukhari", "844", "Al-Mughirah ibn Shu'bah", "Sahih", "After every obligatory prayer the Prophet ﷺ said: O Allah, no one can hold back what You give, and no one can give what You hold back.", "Nobody can hold back what you gave"),
      difficulty: 2,
      questions: [
        { q: "Who can withhold mercy Allah grants, in 35:2?", a: "No one", wrong: ["Kings", "Angels", "Rich people"], why: "Whatever of mercy Allah may grant to mankind, none can withhold it." },
        { q: "When did the Prophet ﷺ say this dhikr, in the hadith?", a: "After every obligatory prayer", wrong: ["Only at dawn", "Only on Eid", "Before sleeping only"], why: "The Prophet ﷺ used to say after every compulsory prayer: nobody can hold back what you gave." },
        { tf: false, q: "Someone else can give what Allah withholds.", why: "And whatever He may withhold, none can grant it thereafter." }
      ]
    },
    {
      slug: "any-creator-but-allah",
      title: "Any creator but Allah?",
      line: "Remember Allah's favour: who else gives rain and food?",
      facts: ["He alone creates and provides", "So He alone is worshipped"],
      quote: q35(3),
      source: ik(3, "Since Allah alone creates and provides, He alone should be worshipped, with no partners.", "He is Independent in His power of creation and provision"),
      difficulty: 2,
      questions: [
        { q: "What should people remember, in 35:3?", a: "The grace of Allah upon them", wrong: ["Their ancestors", "Their wealth", "Their tribe"], why: "O mankind! Remember the grace of Allah upon you!" },
        { q: "Where does provision come from, in 35:3?", a: "The sky and the earth", wrong: ["Only markets", "Only the sea", "Only kings"], why: "Who provides for you from the sky (rain) and the earth?" },
        { q: "What follows from this, per Ibn Kathir?", a: "Worship Him alone", wrong: ["Worship idols too", "Rest from deeds", "Fear the stars"], why: "So He should be worshipped Alone with no partners or associates." }
      ]
    },
    {
      slug: "messengers-denied-before",
      title: "Messengers denied before",
      line: "If they deny you, Messengers before you were denied too.",
      facts: ["A comfort for the Prophet ﷺ", "All matters return to Allah"],
      quote: q35(4),
      source: ik(4, "Allah comforts the Prophet ﷺ: earlier Messengers brought a clear message and were denied too.", "you have an example in the Messengers who came before you"),
      difficulty: 3,
      questions: [
        { q: "Who was denied before, in 35:4?", a: "Earlier Messengers", wrong: ["No one", "Only kings", "Only poets"], why: "And if they deny you, so were Messengers denied before you." },
        { q: "To whom do all matters return, in 35:4?", a: "To Allah", wrong: ["To leaders", "To the people", "To chance"], why: "And to Allah return all matters." },
        { q: "What did Ibn Kathir say the Prophet ﷺ had?", a: "An example in earlier Messengers", wrong: ["A large army", "Much wealth", "A palace"], why: "You have an example in the Messengers who came before you." }
      ]
    },
    {
      slug: "let-not-life-deceive-you",
      title: "Let not life deceive you",
      line: "Allah's promise is true; do not let this short life fool you.",
      facts: ["The chief deceiver is Shaytan", "Lasting good is with Allah"],
      quote: q35(5),
      source: ik(5, "This life is nothing next to what Allah has promised, so do not let passing things distract you from what lasts.", "do not let these transient attractions distract you from that which is lasting"),
      difficulty: 3,
      questions: [
        { q: "What is true, in 35:5?", a: "The promise of Allah", wrong: ["Every rumour", "Fortune tellers", "Old stories"], why: "O mankind! Verily, the promise of Allah is true." },
        { q: "Who is the chief deceiver, per Ibn Abbas?", a: "Shaytan", wrong: ["A king", "A poet", "A merchant"], why: "This refers to Shaytan, as stated by Ibn Abbas." },
        { q: "What should not distract us, per Ibn Kathir?", a: "Passing attractions", wrong: ["Prayer", "The Quran", "Good friends"], why: "Do not let these transient attractions distract you from that which is lasting." }
      ]
    },
    {
      slug: "take-him-as-an-enemy",
      title: "Take him as an enemy",
      line: "Shaytan is your enemy, so treat him as an enemy.",
      facts: ["He openly declared his enmity", "Do not believe his whispers"],
      quote: q35(6),
      source: ik(6, "Shaytan has declared his enmity, so oppose him and do not believe what he tempts you with.", "he has declared his enmity towards you"),
      difficulty: 3,
      questions: [
        { q: "How should we treat Shaytan, in 35:6?", a: "As an enemy", wrong: ["As a friend", "As a guide", "As a judge"], why: "Surely, Shaytan is an enemy to you, so take him as an enemy." },
        { q: "What did Shaytan declare, per Ibn Kathir?", a: "His enmity towards us", wrong: ["His love for us", "His repentance", "His fear of us"], why: "He has declared his enmity towards you, so be even more hostile towards him." },
        { q: "What does Ibn Kathir ask Allah for?", a: "To follow His Book", wrong: ["Gold and silver", "Long journeys", "Fame"], why: "To make us followers of the Book of Allah and of the way of His Messengers." }
      ]
    },
    {
      slug: "forgiveness-and-great-reward",
      title: "Forgiveness and great reward",
      line: "Believers who do good get forgiveness and a great reward.",
      facts: ["Forgiveness covers their sins", "Reward for their good deeds"],
      quote: q35(7),
      source: ik(7, "Those who believe and do good are forgiven their sins and rewarded for their good deeds.", "for the good deeds that they did"),
      difficulty: 3,
      questions: [
        { q: "What do good believers get, in 35:7?", a: "Forgiveness and great reward", wrong: ["Only praise", "Only wealth", "Nothing"], why: "Those who believe and do righteous good deeds, theirs will be forgiveness and a great reward." },
        { q: "What is the forgiveness for, per Ibn Kathir?", a: "Their sins", wrong: ["Their debts", "Their travels", "Their games"], why: "Theirs will be forgiveness, meaning, from whatever sins they did." },
        { q: "What is the great reward for, per Ibn Kathir?", a: "Their good deeds", wrong: ["Their family name", "Their looks", "Their land"], why: "And a great reward, for the good deeds that they did." }
      ]
    },
    {
      slug: "evil-made-fair-seeming",
      title: "Evil made to look good",
      line: "Some see bad deeds as good; do not grieve over them.",
      facts: ["Guidance is in Allah's hand", "He knows what they do"],
      quote: q35(8),
      source: ik(8, "Do not grieve: Allah is Wise in His decree and guides whom He wills with perfect knowledge.", "He has perfect knowledge and wisdom"),
      difficulty: 4,
      questions: [
        { q: "How do some see bad deeds, in 35:8?", a: "As good", wrong: ["As bad", "As boring", "As hard"], why: "Is he to whom the evil of his deeds is made fairseeming, so that he considers it as good?" },
        { q: "What was the Prophet ﷺ told, in 35:8?", a: "Do not destroy yourself in sorrow", wrong: ["Leave the city", "Stop calling", "Fight them all"], why: "So destroy not yourself in sorrow for them." },
        { tf: true, q: "Allah guides with perfect knowledge and wisdom.", why: "In doing so He has perfect knowledge and wisdom." }
      ]
    },
    {
      slug: "winds-and-dead-land",
      title: "Winds and dead land",
      line: "Rain revives dead land; the Resurrection will be like that.",
      facts: ["Dry valleys turn green", "Bodies grow back like seeds"],
      quote: q35(9),
      source: ik(9, "Allah often compares the Resurrection to dead earth coming back to life after rain.", "the earth coming back to life after it has died"),
      difficulty: 3,
      questions: [
        { q: "What do the winds raise, in 35:9?", a: "The clouds", wrong: ["The mountains", "The seas", "The stars"], why: "It is Allah Who sends the winds, so that they raise up the clouds." },
        { q: "What is the Resurrection like, per Ibn Kathir?", a: "Dead earth coming alive", wrong: ["A long sleep", "A sunset", "A river drying"], why: "The analogy of the earth coming back to life after it has died." },
        { q: "How will bodies grow, per Ibn Kathir?", a: "Like seeds in the earth", wrong: ["Like stones", "Like smoke", "Like ice"], why: "The bodies will grow in their graves like seeds grow in the earth." }
      ]
    },
    {
      slug: "good-words-ascend",
      title: "Good words rise to Him",
      line: "Honour belongs to Allah; good words and good deeds rise to Him.",
      facts: ["Seek honour by obeying Allah", "Showing off will fail"],
      quote: q35(10),
      source: ik(10, "Good words are dhikr, Quran and dua; whoever wants honour should seek it by obeying Allah.", "words of remembrance, recitation of Qur"),
      difficulty: 4,
      questions: [
        { q: "To whom does all honour belong, in 35:10?", a: "To Allah", wrong: ["To the rich", "To the strong", "To poets"], why: "Whosoever desires Al-Izzah, then to Allah belongs all Al-Izzah." },
        { q: "What are the good words, per Ibn Kathir?", a: "Dhikr, Quran and dua", wrong: ["Jokes", "Boasting", "Gossip"], why: "Words of remembrance, recitation of Quran, and supplications." },
        { q: "Who plots evil, per Mujahid?", a: "Those who show off", wrong: ["The poor", "Travellers", "Children"], why: "This refers to those who show off by their actions." },
        { tf: false, q: "Showing off fools the wise believers for good.", why: "The believers who have insight are not deceived by that; they soon discover it." }
      ]
    },
    {
      slug: "from-dust-then-pairs",
      title: "From dust, then pairs",
      line: "Allah made us from dust, then pairs; He knows every life.",
      facts: ["Every lifespan is written", "Ties of kin bless life"],
      quote: q35(11),
      source: hadith("bukhari", "5986", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said: whoever would like his provision to be increased and his life extended should keep good ties with his relatives.", "he should keep good relations with his Kith and kin"),
      difficulty: 4,
      questions: [
        { q: "What were we first made from, in 35:11?", a: "Dust", wrong: ["Fire", "Light", "Stone"], why: "And Allah did create you from dust, then from Nutfah." },
        { q: "Where is every lifespan recorded, in 35:11?", a: "In a Book", wrong: ["In the stars", "In the sand", "Nowhere"], why: "Nor is a part cut off from his life, but is in a Book." },
        { q: "What should one keep, in the hadith?", a: "Good ties with relatives", wrong: ["Gold hidden", "Secrets", "Long journeys"], why: "Whoever loves more provision and a longer life should keep good relations with his kin." }
      ]
    },
    {
      slug: "two-seas",
      title: "The two kinds of water",
      line: "Sweet and salty water differ, yet both give fish and pearls.",
      facts: ["Rivers are sweet to drink", "Ships sail the salty sea"],
      quote: q35(12),
      source: ik(12, "Sweet rivers flow among people for their needs; the salty ocean carries big ships; both give food and ornaments.", "This is the ocean in which the big ships sail"),
      difficulty: 3,
      questions: [
        { q: "What do we get from both waters, in 35:12?", a: "Fresh meat and ornaments", wrong: ["Gold coins", "Only salt", "Only sand"], why: "And from them both you eat fresh tender meat, and derive the ornaments that you wear." },
        { q: "What is the sweet water, per Ibn Kathir?", a: "The rivers", wrong: ["The ocean", "The clouds", "The snow"], why: "The fresh, palatable water refers to the rivers which flow among people." },
        { q: "Why are ships made to sail, in 35:12?", a: "To seek His bounty", wrong: ["To escape Him", "To race only", "To get lost"], why: "That you may seek of His bounty, and that you may give thanks." }
      ]
    },
    {
      slug: "night-merges-into-day",
      title: "Night merges into day",
      line: "Allah blends night into day and runs the sun and moon.",
      facts: ["Long and short days by season", "Each runs to an appointed term"],
      quote: q35(13),
      source: ik(13, "Allah takes length from night and gives it to day and back again through summer and winter.", "they take from one another in summer and in winter"),
      difficulty: 3,
      questions: [
        { q: "What has Allah subjected, in 35:13?", a: "The sun and the moon", wrong: ["The idols", "The kings", "The jinn"], why: "And He has subjected the sun and the moon, each runs its course." },
        { q: "Until when do they run, per Ibn Kathir?", a: "The Day of Resurrection", wrong: ["Next year", "Forever", "Until noon"], why: "Each runs its course for a term appointed, means, until the Day of Resurrection." },
        { q: "What is a Qitmir, per Ibn Abbas?", a: "The thin skin on a date stone", wrong: ["A gold coin", "A big rock", "A camel"], why: "This is the thread that is attached to the pit of a date." }
      ]
    },
    {
      slug: "they-cannot-answer",
      title: "They cannot answer",
      line: "False gods cannot hear calls, and could not answer if they did.",
      facts: ["They will disown that worship", "None informs like the All-Knower"],
      quote: q35(14),
      source: ik(14, "The idols do not hear because they have no soul, and they could not grant anything even if they heard.", "they are inanimate and have no soul in them"),
      difficulty: 4,
      questions: [
        { q: "Why do idols not hear, per Ibn Kathir?", a: "They have no soul", wrong: ["They are asleep", "They are far", "They are busy"], why: "They do not hear your supplication, because they are inanimate and have no soul in them." },
        { q: "What will they do on Judgment Day, in 35:14?", a: "Disown that worship", wrong: ["Thank them", "Help them", "Hide them"], why: "And on the Day of Resurrection, they will disown your worshipping them." },
        { q: "Who informs like the All-Knower, in 35:14?", a: "No one", wrong: ["Fortune tellers", "Elders", "Stars"], why: "And none can inform you like Him Who is the All-Knower." }
      ]
    },
    {
      slug: "you-need-allah",
      title: "You need Allah",
      line: "People need Allah in everything; He is Rich, Worthy of praise.",
      facts: ["He needs no one", "All creation is humble before Him"],
      quote: q35(15),
      source: ik(15, "Allah has no need of anyone, while all creation needs Him in everything it does.", "they need Him in all that they do, but He has no need of them at all"),
      difficulty: 3,
      questions: [
        { q: "Who stands in need, in 35:15?", a: "Mankind", wrong: ["Allah", "No one", "Only angels"], why: "O mankind! It is you who stand in need of Allah." },
        { q: "How is Allah described, in 35:15?", a: "Rich, Worthy of all praise", wrong: ["Tired, alone", "Needy, far", "Weak, silent"], why: "But Allah is the Rich, Worthy of all praise." },
        { tf: false, q: "Allah needs His creation to help Him.", why: "They need Him in all that they do, but He has no need of them at all." }
      ]
    },
    {
      slug: "a-new-creation",
      title: "A new creation",
      line: "If He willed, He could replace you with a new creation.",
      facts: ["Nothing is impossible for Him", "A reason for humility"],
      quote: q35(16),
      source: ik(16, "If Allah wanted, He could remove people and bring another people, and that is not hard for Him.", "He could destroy you and bring forth another people"),
      difficulty: 3,
      questions: [
        { q: "What could Allah bring, in 35:16?", a: "A new creation", wrong: ["Nothing new", "Only rain", "Only angels"], why: "If He willed, He could destroy you and bring about a new creation." },
        { q: "Is it hard for Him, per Ibn Kathir?", a: "No, not at all", wrong: ["Very hard", "Only once", "Sometimes"], why: "This is not difficult or impossible for Him." },
        { tf: true, q: "Allah does not depend on any one people.", why: "He could destroy you and bring forth another people." }
      ]
    },
    {
      slug: "not-hard-for-allah",
      title: "Not hard for Allah",
      line: "Replacing a people is not hard for Allah at all.",
      facts: ["His power is complete", "So turn to Him while you can"],
      quote: q35(17),
      source: ik(17, "Allah says this to show it is not difficult or impossible for Him to bring another people.", "this is not difficult or impossible for Him"),
      difficulty: 2,
      questions: [
        { q: "What is not hard for Allah, in 35:17?", a: "Bringing a new creation", wrong: ["Nothing", "Only small things", "Only rain"], why: "And that is not hard for Allah." },
        { q: "How does Ibn Kathir describe it?", a: "Not difficult or impossible", wrong: ["Very rare", "Very slow", "Uncertain"], why: "This is not difficult or impossible for Him." },
        { tf: true, q: "Allah's power has no limit of difficulty.", why: "And that is not hard for Allah." }
      ]
    },
    {
      slug: "no-one-carries-your-load",
      title: "No one carries your load",
      line: "No soul will carry another's burden, not even a close relative.",
      facts: ["Each will be busy with himself", "Purifying yourself helps you"],
      quote: q35(18),
      source: ik(18, "Even a father or son will not carry part of your load, for each will be busy with his own situation.", "each person will be preoccupied with his own self and his own situation"),
      difficulty: 4,
      questions: [
        { q: "Who carries your burden, in 35:18?", a: "No one else", wrong: ["Your father", "Your friend", "Your tribe"], why: "And no bearer of burdens shall bear another's burden." },
        { q: "Why, per Ibn Kathir?", a: "Each is busy with himself", wrong: ["They are far", "They are asleep", "They forgot"], why: "Each person will be preoccupied with his own self and his own situation." },
        { q: "Who benefits from warnings, in 35:18?", a: "Those who fear their Lord unseen", wrong: ["Everyone equally", "The proud", "The careless"], why: "You can warn only those who fear their Lord unseen and perform the Salah." },
        { tf: true, q: "Whoever purifies himself does it for his own good.", why: "And he who purifies himself, then he purifies only for the benefit of himself." }
      ]
    },
    {
      slug: "blind-and-seeing",
      title: "The blind and the seeing",
      line: "The blind and the seeing are not alike.",
      facts: ["The believer sees the truth", "The denier is blind to it"],
      quote: q35(19),
      source: ik(19, "These opposites are not equal; Allah makes them a parable of the believer and the disbeliever.", "the blind and the seeing are not equal"),
      difficulty: 2,
      questions: [
        { q: "What two are not alike, in 35:19?", a: "The blind and the seeing", wrong: ["Day and noon", "Sea and river", "Gold and silver"], why: "Not alike are the blind and the seeing." },
        { q: "Whom do they stand for, per Ibn Kathir?", a: "The believer and disbeliever", wrong: ["Old and young", "Rich and poor", "Kings and slaves"], why: "This is the parable Allah makes of the believers and the disbelievers." },
        { tf: true, q: "The believer walks in light upon a straight path.", why: "The believer sees and hears, and walks in the light upon a straight path." }
      ]
    },
    {
      slug: "darkness-and-light",
      title: "Darkness and light",
      line: "Darkness and light are not the same.",
      facts: ["Faith is light", "Denial is darkness"],
      quote: q35(20),
      source: ik(20, "Darkness and light are not equal, just as believers and deniers are not equal.", "Darkness and light are not equal"),
      difficulty: 2,
      questions: [
        { q: "What is not equal, in 35:20?", a: "Darkness and light", wrong: ["Two lamps", "Two stars", "Two rivers"], why: "Nor are (depths of) darkness and light." },
        { q: "Where does the believer walk, per Ibn Kathir?", a: "In the light", wrong: ["In darkness", "In circles", "Nowhere"], why: "The believer walks in the light upon a straight path." },
        { tf: false, q: "Darkness and light are equal in Allah's sight.", why: "Darkness and light are not equal." }
      ]
    },
    {
      slug: "shade-and-heat",
      title: "Shade and heat",
      line: "Cool shade and the sun's heat are not the same.",
      facts: ["Paradise has shade and springs", "Choose the shade of faith"],
      quote: q35(21),
      source: ik(21, "Shade and the sun's heat are not equal; believers end in Gardens with shade and springs.", "Gardens (Paradise) wherein is shade and springs"),
      difficulty: 3,
      questions: [
        { q: "What is not equal, in 35:21?", a: "Shade and the sun's heat", wrong: ["Rain and snow", "Sand and dust", "Wind and air"], why: "Nor are the shade and the sun's heat." },
        { q: "What is in Paradise, per Ibn Kathir?", a: "Shade and springs", wrong: ["Hot sand", "Only rocks", "Darkness"], why: "Until he comes to settle in Gardens (Paradise) wherein is shade and springs." },
        { tf: true, q: "Faith leads to a cool, shaded home.", why: "Until he comes to settle in Gardens (Paradise) wherein is shade and springs." }
      ]
    },
    {
      slug: "living-and-dead",
      title: "The living and the dead",
      line: "The living and dead differ; Allah makes whom He wills hear.",
      facts: ["Believers are the living", "Guidance is from Allah"],
      quote: q35(22),
      source: ik(22, "Allah guides whom He wills to listen to the proof, accept it and hold to it.", "He guides them to listen to the proof and accept it"),
      difficulty: 3,
      questions: [
        { q: "Who are the living, per Ibn Kathir?", a: "The believers", wrong: ["The rich", "The strong", "The old"], why: "This is the parable Allah makes of the believers who are the living." },
        { q: "Who makes people hear, in 35:22?", a: "Allah", wrong: ["Kings", "Poets", "Crowds"], why: "Verily, Allah makes whom He wills to hear." },
        { q: "What does making them hear mean, per Ibn Kathir?", a: "Listening and accepting proof", wrong: ["Louder voices", "Better ears", "More noise"], why: "He guides them to listen to the proof and accept it and adhere to it." }
      ]
    },
    {
      slug: "only-a-warner",
      title: "Only a warner",
      line: "You are only a warner; your task is to convey.",
      facts: ["Allah guides whom He wills", "The duty is to deliver"],
      quote: q35(23),
      source: ik(23, "All the Prophet ﷺ had to do was convey and warn; guidance is from Allah.", "all you have to do is to convey the Message and warn them"),
      difficulty: 2,
      questions: [
        { q: "What is the Prophet ﷺ called, in 35:23?", a: "Only a warner", wrong: ["A king", "A guard", "A judge of hearts"], why: "You are only a warner." },
        { q: "What was his job, per Ibn Kathir?", a: "To convey and warn", wrong: ["To force belief", "To rule lands", "To collect wealth"], why: "All you have to do is to convey the Message and warn them." },
        { tf: false, q: "The Messenger ﷺ had to force people to believe.", why: "All you have to do is to convey the Message and warn them." }
      ]
    }
  ]
};

/** Ayahs 24 to 45: a warner for every nation, colours in creation, the three kinds of inheritors, Paradise without weariness, and the respite. */
const FATIR_TWO: DeepUnit = {
  key: "fatir2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-35",
  name: "Fatir, ayahs 24 to 45",
  kind: "skill",
  lessonType: "surah",
  surahName: "Fatir",
  lessons: [
    {
      slug: "a-warner-for-every-nation",
      title: "A warner for every nation",
      line: "Every nation had a warner pass among them.",
      facts: ["Glad tidings for believers", "No one was left without an excuse"],
      quote: q35(24),
      source: ik(24, "Allah sent warners to every nation of the children of Adam and left them with no excuse.", "Allah sent warners to them, and left them with no excuse"),
      difficulty: 3,
      questions: [
        { q: "Which nations had a warner, in 35:24?", a: "Every nation", wrong: ["Only the Arabs", "Only one", "None"], why: "And there never was a nation but a warner had passed among them." },
        { q: "Glad tidings are for whom, per Ibn Kathir?", a: "The believers", wrong: ["The proud", "The idols", "The careless"], why: "A bearer of glad tidings to the believers and a warner to the disbelievers." },
        { tf: true, q: "Allah left no nation with an excuse.", why: "Allah sent warners to them, and left them with no excuse." }
      ]
    },
    {
      slug: "clear-signs-and-scriptures",
      title: "Clear signs and Scriptures",
      line: "Messengers came with clear signs, Scriptures and light.",
      facts: ["Clear miracles and proofs", "Those before also denied"],
      quote: q35(25),
      source: ik(25, "The Messengers came with clear miracles and definitive proofs, and with Books.", "clear miracles and definitive proofs"),
      difficulty: 3,
      questions: [
        { q: "What did the Messengers bring, in 35:25?", a: "Clear signs and Scriptures", wrong: ["Gold and silk", "Armies", "Nothing"], why: "Their Messengers came to them with clear signs, and with the Scriptures." },
        { q: "What are the clear signs, per Ibn Kathir?", a: "Miracles and proofs", wrong: ["Road signs", "Flags", "Stars"], why: "Clear signs means clear miracles and definitive proofs." },
        { q: "What is the Book giving light, per Ibn Kathir?", a: "Clear and obvious", wrong: ["Hidden", "Lost", "Unclear"], why: "And with the Book giving light, means clear and obvious." }
      ]
    },
    {
      slug: "then-i-took-hold",
      title: "Then I took hold",
      line: "Those who denied were seized; how great was Allah's response.",
      facts: ["They denied despite proofs", "A lesson for those after"],
      quote: q35(26),
      source: ik(26, "Despite all the proofs, they denied the Messengers, so Allah seized them with His punishment.", "despite all of this, they denied the Messengers and the Message they brought"),
      difficulty: 3,
      questions: [
        { q: "Whom did Allah take hold of, in 35:26?", a: "Those who disbelieved", wrong: ["The believers", "The Prophets", "The angels"], why: "Then I took hold of those who disbelieved." },
        { q: "What did they deny, per Ibn Kathir?", a: "The Messengers and Message", wrong: ["Their own homes", "The weather", "Trade"], why: "Despite all of this, they denied the Messengers and the Message they brought." },
        { tf: false, q: "They were seized before any proof came.", why: "Despite all of this, they denied the Messengers, so I seized them." }
      ]
    },
    {
      slug: "fruits-and-mountains-of-colours",
      title: "Fruits and mountains of colours",
      line: "One rain brings fruits of many colours; mountains too.",
      facts: ["White, red and black mountains", "One water, many colours"],
      quote: q35(27),
      source: ik(27, "From the same water Allah brings forth fruits of many colours, tastes and scents.", "the immense variety of their colors, tastes and scents"),
      difficulty: 3,
      questions: [
        { q: "What comes from one water, in 35:27?", a: "Fruits of various colours", wrong: ["Only one fruit", "Stones", "Salt"], why: "We produce therewith fruits of various colors." },
        { q: "What colours are mountains, in 35:27?", a: "White, red and black", wrong: ["Only green", "Only blue", "All grey"], why: "Among the mountains are Judad, white and red, and Gharabib black." },
        { q: "What does Gharabib mean, per Ikrimah?", a: "High black mountains", wrong: ["Low valleys", "Red sand", "Rivers"], why: "Al-Gharabib means mountains which are high and black." }
      ]
    },
    {
      slug: "those-with-knowledge-fear",
      title: "Those with knowledge fear Him",
      line: "People and animals vary in colour; the knowing truly fear Allah.",
      facts: ["The more you know, the more awe", "Fear keeps you from sin"],
      quote: q35(28),
      source: ik(28, "The more people know about Allah's perfect Names and attributes, the more they fear Him.", "the more they will fear Him"),
      difficulty: 4,
      questions: [
        { q: "Who truly fears Allah, in 35:28?", a: "Those who have knowledge", wrong: ["The richest", "The loudest", "The tallest"], why: "It is only those among His servants who have knowledge that fear Allah." },
        { q: "What is fear, per Said bin Jubayr?", a: "What stops you from sin", wrong: ["A bad dream", "A weakness", "A sickness"], why: "Fear is what stands between you and disobeying Allah." },
        { q: "What also varies in colour, in 35:28?", a: "People and animals", wrong: ["Only birds", "Only rocks", "Only fish"], why: "And likewise, men and moving creatures and cattle are of various colors." },
        { tf: true, q: "Knowing Allah more increases awe of Him.", why: "The more they know about the Almighty, the more they will fear Him." }
      ]
    },
    {
      slug: "a-trade-that-never-fails",
      title: "A trade that never fails",
      line: "Reciting, praying and giving is a trade that will never fail.",
      facts: ["Give secretly and openly", "Learn and teach the Quran"],
      quote: q35(29),
      source: hadith("bukhari", "5027", "Uthman ibn Affan", "Sahih", "The Prophet ﷺ said: the best among you are those who learn the Quran and teach it.", "The best among you (Muslims) are those who learn the Qur"),
      difficulty: 3,
      questions: [
        { q: "What three deeds are named, in 35:29?", a: "Recite, pray and spend", wrong: ["Sleep, eat, rest", "Trade, travel, build", "Hunt, fish, farm"], why: "Those who recite the Book of Allah, and perform the Salah, and spend." },
        { q: "What do they hope for, in 35:29?", a: "A trade that never perishes", wrong: ["Fame", "Palaces now", "Long journeys"], why: "They hope for a (sure) trade-gain that will never perish." },
        { q: "Who is best, in the hadith?", a: "Who learns and teaches Quran", wrong: ["The richest", "The strongest", "The oldest"], why: "The best among you are those who learn the Quran and teach it." }
      ]
    },
    {
      slug: "wages-in-full-and-more",
      title: "Wages in full, and more",
      line: "Allah pays their reward in full and adds more from His grace.",
      facts: ["He forgives sins", "He values even small deeds"],
      quote: q35(30),
      source: ik(30, "Allah rewards them and multiplies it beyond what they imagined; He appreciates even a little good.", "He appreciates even a little of their good deeds"),
      difficulty: 3,
      questions: [
        { q: "How are wages paid, in 35:30?", a: "In full, with more", wrong: ["Half only", "Late", "Never"], why: "That He may pay them their wages in full, and give them even more, out of His grace." },
        { q: "What does Most Ready to appreciate mean, per Ibn Kathir?", a: "He values small good deeds", wrong: ["He wants gifts", "He likes praise only", "He counts sins"], why: "He appreciates even a little of their good deeds." },
        { tf: true, q: "The extra reward may be beyond what they imagined.", why: "And multiply it by adding more, such as has never occurred to them." }
      ]
    },
    {
      slug: "the-very-truth",
      title: "The very truth",
      line: "The Quran is the truth, confirming the Books before it.",
      facts: ["Earlier Books foretold it", "Allah sees all His servants"],
      quote: q35(31),
      source: ik(31, "The Quran confirms the earlier Books, just as they foretold that it would come.", "It confirms them just as they bore witness to the coming of the Qur"),
      difficulty: 3,
      questions: [
        { q: "What does the Quran confirm, in 35:31?", a: "The Books before it", wrong: ["Old poems", "Fortune tellers", "Nothing"], why: "It is the very truth confirming that which was revealed before it." },
        { q: "What did earlier Books do, per Ibn Kathir?", a: "Foretell the Quran", wrong: ["Deny it", "Hide it", "Forget it"], why: "Just as they bore witness to the coming of the Quran." },
        { q: "How is Allah described, in 35:31?", a: "All-Aware, All-Seer", wrong: ["Far, unaware", "Tired", "Silent"], why: "Verily, Allah is indeed All-Aware and All-Seer of His servants." }
      ]
    },
    {
      slug: "three-kinds-of-heirs",
      title: "Three kinds of heirs",
      line: "Heirs of the Book: some fall short, some middle, some ahead.",
      facts: ["All three are from this Ummah", "Racing ahead is a great grace"],
      quote: q35(32),
      source: ik(32, "This Ummah inherited the Book in three ranks; the correct view is that even those who fall short are part of it.", "The correct view is that they are also part of this Ummah"),
      difficulty: 5,
      questions: [
        { q: "Who inherited the Book, per Ibn Abbas?", a: "The Ummah of Muhammad ﷺ", wrong: ["Only kings", "Only scholars", "No one"], why: "This refers to the Ummah of Muhammad; Allah caused it to inherit every Book." },
        { q: "Who follows a middle course, per Ibn Kathir?", a: "Do duties, may miss extras", wrong: ["Skip all duties", "Do only extras", "Do nothing"], why: "They fulfill their obligations and avoid forbidden things, but may neglect some good deeds." },
        { q: "Who are foremost, per Ibn Kathir?", a: "Do duties and extra good", wrong: ["The richest", "The loudest", "The oldest"], why: "They do obligatory actions and things which are encouraged." },
        { tf: true, q: "Those who fall short are still part of this Ummah.", why: "The correct view is that they are also part of this Ummah." }
      ]
    },
    {
      slug: "gardens-of-adn",
      title: "Gardens of Adn",
      line: "They enter Gardens of Adn, adorned with gold, pearls and silk.",
      facts: ["Adornment reaches the wudu", "A reward that lasts"],
      quote: q35(33),
      source: hadith("muslim", "250", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: the adornment of a believer will reach as far as the places his wudu reaches.", "In a believer adornment would reach the places where ablution reaches"),
      difficulty: 3,
      questions: [
        { q: "What gardens will they enter, in 35:33?", a: "Adn, everlasting gardens", wrong: ["Worldly farms", "Desert oases", "Sea gardens"], why: "Adn Gardens will they enter." },
        { q: "How far will adornment reach, in the hadith?", a: "Where wudu reaches", wrong: ["Only the head", "Only the feet", "Nowhere"], why: "In a believer adornment would reach the places where ablution reaches." },
        { q: "What will their garments be, in 35:33?", a: "Silk", wrong: ["Wool", "Leather", "Cotton"], why: "And their garments therein will be of silk." }
      ]
    },
    {
      slug: "grief-removed",
      title: "Grief removed",
      line: "They will say: praise Allah, Who has taken all grief from us.",
      facts: ["Every fear is lifted", "He forgives and values deeds"],
      quote: q35(34),
      source: ik(34, "Every fear of this world and the next is lifted from them; Allah forgives and values the smallest good.", "appreciates even the smallest of their good deeds"),
      difficulty: 3,
      questions: [
        { q: "What has been removed, in 35:34?", a: "All grief", wrong: ["Their memory", "Their names", "Their homes"], why: "All praise be to Allah, Who has removed from us all grief." },
        { q: "What grief is meant, per Ibn Kathir?", a: "Every fear and worry", wrong: ["Only hunger", "Only cold", "Only debt"], why: "Fear of everything that is feared; it has been lifted from us." },
        { q: "What does Allah appreciate, per Ibn Abbas?", a: "Even the smallest good", wrong: ["Only big deeds", "Only wealth", "Only fame"], why: "He forgives them and appreciates even the smallest of their good deeds." }
      ]
    },
    {
      slug: "no-toil-no-weariness",
      title: "No toil, no weariness",
      line: "A lasting home by His grace, where no tiredness touches them.",
      facts: ["We enter by His mercy", "Rest after a life of effort"],
      quote: q35(35),
      source: hadith("bukhari", "6463", "Abu Hurairah", "Sahih", "The Prophet ﷺ said no one is saved by deeds alone, not even him, unless Allah covers him with His mercy; so do good, sincerely and steadily.", "unless and until Allah bestows His Mercy on me"),
      difficulty: 4,
      questions: [
        { q: "How did they get the home, in 35:35?", a: "Out of Allah's grace", wrong: ["By buying it", "By luck", "By force"], why: "Who, out of His grace, has lodged us in a home that will last forever." },
        { q: "What will not touch them, in 35:35?", a: "Toil and weariness", wrong: ["Joy", "Peace", "Light"], why: "Where toil will touch us not nor weariness will touch us." },
        { q: "What saves a person, in the hadith?", a: "Allah's mercy", wrong: ["Wealth", "Family name", "Strength"], why: "Not even me, unless and until Allah bestows His Mercy on me." },
        { tf: false, q: "We should stop doing good since mercy saves us.", why: "Therefore, do good deeds properly, sincerely and moderately." }
      ]
    },
    {
      slug: "the-fate-of-deniers",
      title: "The fate of deniers",
      line: "Those who reject face the Fire, with no relief.",
      facts: ["A just recompense", "Warnings came first"],
      quote: q35(36),
      source: ik(36, "This is the recompense of those who disbelieved in their Lord and denied the truth.", "this is the recompense of everyone who disbelieved in his Lord and denied the truth"),
      difficulty: 4,
      questions: [
        { q: "Whom is this recompense for, per Ibn Kathir?", a: "Those who denied the truth", wrong: ["Those who sinned once", "All people", "Children"], why: "This is the recompense of everyone who disbelieved in his Lord and denied the truth." },
        { q: "Will it be lightened, in 35:36?", a: "No", wrong: ["Yes, soon", "Every Friday", "After a year"], why: "Nor shall its torment be lightened for them." },
        { tf: true, q: "The Quran warns so that people can avoid this end.", why: "Thus do We requite every disbeliever." }
      ]
    },
    {
      slug: "did-we-not-give-you-time",
      title: "Did We not give you time?",
      line: "They beg to return; Allah says: did you not live long enough?",
      facts: ["Sixty years leaves no excuse", "The warner had come"],
      quote: q35(37),
      source: hadith("bukhari", "6419", "Abu Hurairah", "Sahih", "The Prophet ﷺ said Allah accepts no excuse from someone whose life is extended to sixty years.", "Allah will not accept the excuse of any person whose instant of death is delayed till he is sixty years of age"),
      difficulty: 4,
      questions: [
        { q: "What will they ask, in 35:37?", a: "To be let out to do good", wrong: ["For gold", "For sleep", "For food"], why: "Our Lord! Bring us out, we shall do righteous good deeds." },
        { q: "At what age is there no excuse, in the hadith?", a: "Sixty", wrong: ["Twenty", "Forty", "Ninety"], why: "Allah will not accept the excuse of any person whose death is delayed till sixty." },
        { q: "What is the warner, per Qatadah and Ibn Jarir?", a: "The Messengers", wrong: ["A storm", "A king", "A dream"], why: "Proof will be established by the fact that they lived long and Messengers came to them." }
      ]
    },
    {
      slug: "knower-of-the-hearts",
      title: "Knower of the hearts",
      line: "Allah knows the unseen and what is in every heart.",
      facts: ["Secrets are known to Him", "Each is rewarded by deeds"],
      quote: q35(38),
      source: ik(38, "Allah knows all that is hidden and the secrets of the hearts, and rewards everyone by his deeds.", "He knows all that is hidden and the secrets of the hearts"),
      difficulty: 3,
      questions: [
        { q: "What does Allah know, in 35:38?", a: "What is in the breasts", wrong: ["Only actions", "Only words", "Only the past"], why: "Verily, He is the All-Knower of that is in the breasts." },
        { q: "What does He know, per Ibn Kathir?", a: "The secrets of the hearts", wrong: ["Only loud words", "Only crowds", "Only trade"], why: "He knows all that is hidden and the secrets of the hearts." },
        { tf: true, q: "Hidden intentions are known to Allah.", why: "He knows all that is hidden and the secrets of the hearts." }
      ]
    },
    {
      slug: "generation-after-generation",
      title: "Generation after generation",
      line: "He made us successors on earth; denial only harms the denier.",
      facts: ["Long good life raises rank", "Denial adds only loss"],
      quote: q35(39),
      source: ik(39, "The longer believers live and do good, the higher their rank and the more beloved they are to their Creator.", "the longer they live and do good deeds, the higher their status in Paradise will be"),
      difficulty: 4,
      questions: [
        { q: "What did Allah make us, in 35:39?", a: "Successors on earth", wrong: ["Owners of the sky", "Kings forever", "Angels"], why: "He it is Who has made you successors generations after generations in the earth." },
        { q: "Who bears the result of denial, in 35:39?", a: "The denier himself", wrong: ["His neighbours", "His teacher", "No one"], why: "So whosoever disbelieves, on him will be his disbelief." },
        { q: "What does a long good life bring, per Ibn Kathir?", a: "A higher rank in Paradise", wrong: ["More worry", "Nothing extra", "Less reward"], why: "The longer they live and do good deeds, the higher their status in Paradise will be." }
      ]
    },
    {
      slug: "show-me-what-they-created",
      title: "Show me what they created",
      line: "Show me what your partners created; they own nothing at all.",
      facts: ["No share in the heavens", "No Book supports them"],
      quote: q35(40),
      source: ik(40, "The idols own nothing, not even the thin skin of a date stone, and no Book backs their claims.", "they do not possess even the membrane covering the stone of a date"),
      difficulty: 3,
      questions: [
        { q: "What were they asked to show, in 35:40?", a: "What their partners created", wrong: ["Their wealth", "Their homes", "Their poems"], why: "Show Me, what they have created of the earth." },
        { q: "What do idols own, per Ibn Kathir?", a: "Not even a date skin", wrong: ["Half the earth", "The rain", "The stars"], why: "They do not possess even the membrane covering the stone of a date." },
        { q: "What do wrongdoers promise each other, in 35:40?", a: "Only delusions", wrong: ["The truth", "Real help", "Safety"], why: "Nay, the wrongdoers promise one another nothing but delusions." }
      ]
    },
    {
      slug: "he-holds-the-heavens",
      title: "He holds the heavens",
      line: "Allah holds the heavens and earth in place; none else could.",
      facts: ["He is Most Forbearing", "He gives time to repent"],
      quote: q35(41),
      source: ik(41, "Allah sees people disobey yet is patient, gives them time and does not hasten punishment.", "He is patient and gives them time"),
      difficulty: 4,
      questions: [
        { q: "What does Allah hold, in 35:41?", a: "The heavens and the earth", wrong: ["Only mountains", "Only seas", "Only clouds"], why: "Verily, Allah grasps the heavens and the earth lest they should move away." },
        { q: "Who else could hold them, in 35:41?", a: "No one", wrong: ["Angels alone", "Kings", "The stars"], why: "There is not one that could grasp them after Him." },
        { q: "Why is He called Forbearing, per Ibn Kathir?", a: "He is patient and gives time", wrong: ["He is unaware", "He forgets", "He is far"], why: "Yet He is patient and gives them time, He waits and does not hasten the punishment." }
      ]
    },
    {
      slug: "the-oath-they-broke",
      title: "The oath they broke",
      line: "They swore they would follow a warner; when one came, they fled.",
      facts: ["Quraysh made this oath", "Their flight only grew"],
      quote: q35(42),
      source: ik(42, "Quraysh swore that a warner would make them the best guided nation, but they only grew in disbelief.", "they only increased in their disbelief"),
      difficulty: 4,
      questions: [
        { q: "What did they swear, in 35:42?", a: "To be the best guided", wrong: ["To leave Makkah", "To build a wall", "To stay silent"], why: "That if a warner came to them, they would be more guided than any of the nations." },
        { q: "Who swore it, per Ibn Kathir?", a: "Quraysh and the Arabs", wrong: ["The Romans", "The Persians", "The Jinn"], why: "Allah tells us how Quraysh and the Arabs swore by Allah their most binding oath." },
        { q: "What did the warner increase, in 35:42?", a: "Their flight from truth", wrong: ["Their faith", "Their wealth", "Their joy"], why: "When a warner came to them, it increased in them nothing but flight." }
      ]
    },
    {
      slug: "evil-plots-return",
      title: "Evil plots come back",
      line: "Evil plots only surround those who make them.",
      facts: ["Arrogance blocks truth", "Allah's way never changes"],
      quote: q35(43),
      source: ik(43, "The evil consequences of their plotting come back on them, and Allah's way with deniers does not change.", "the evil consequences of that will come back upon them and not on others"),
      difficulty: 4,
      questions: [
        { q: "Whom does an evil plot surround, in 35:43?", a: "The one who makes it", wrong: ["The innocent", "Strangers", "Children"], why: "But the evil plot encompasses only him who makes it." },
        { q: "Why did they flee, per Ibn Kathir?", a: "Arrogance", wrong: ["Fear of rain", "Hunger", "Distance"], why: "They were too arrogant to follow the signs of Allah." },
        { tf: false, q: "Allah's Sunnah changes from people to people.", why: "So, no change will you find in Allah's Sunnah." }
      ]
    },
    {
      slug: "travel-and-see",
      title: "Travel and see",
      line: "Travel the land and see the end of stronger nations before.",
      facts: ["Their wealth did not save them", "Nothing escapes Allah"],
      quote: q35(44),
      source: ik(44, "Their many people, wealth and equipment could not protect them in the slightest when Allah's command came.", "All of that was of no avail to them"),
      difficulty: 3,
      questions: [
        { q: "What should they do, in 35:44?", a: "Travel and see", wrong: ["Stay home", "Sleep", "Hide"], why: "Have they not traveled in the land, and seen what was the end of those before them." },
        { q: "Were earlier nations weaker, in 35:44?", a: "No, they were stronger", wrong: ["Yes, much weaker", "The same", "Unknown"], why: "Though they were superior to them in power." },
        { q: "Did their wealth help, per Ibn Kathir?", a: "Not at all", wrong: ["A little", "Very much", "For a year"], why: "All of that was of no avail to them and could not protect them in the slightest." }
      ]
    },
    {
      slug: "the-respite",
      title: "The respite",
      line: "If Allah took people for every sin, no creature would remain.",
      facts: ["He delays to a set term", "He sees all His servants"],
      quote: q35(45),
      source: ik(45, "Allah delays until the Day of Resurrection, then rewards the obedient and holds the disobedient to account.", "He is delaying until the Day of Resurrection"),
      difficulty: 4,
      questions: [
        { q: "What if Allah punished every sin, in 35:45?", a: "No creature would remain", wrong: ["Nothing would change", "Only kings would go", "More rain"], why: "He would not leave a moving creature on the surface of the earth." },
        { q: "How would animals suffer, per Said bin Jubayr?", a: "Rain would stop", wrong: ["Fire would come", "Seas would rise", "Winds would stop"], why: "He would have stopped sending rain to them, and all the animals would have died." },
        { q: "Until when is the delay, per Ibn Kathir?", a: "The Day of Resurrection", wrong: ["Next spring", "Forever", "Ten years"], why: "But He is delaying until the Day of Resurrection." }
      ]
    }
  ]
};

export const FATIR_UNITS: readonly DeepUnit[] = [FATIR_ONE, FATIR_TWO];
