import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Al-Ma'idah ayah by ayah, the way Ali 'Imran and An-Nisa are taught: every ayah or small group of ayahs gets a
// lesson, explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one
// explains the ayah. Each source opens at the highlighted words that say the lesson's point. Court punishments
// (5:33, 5:38) and the detailed rulings on hunting are left to the scholars.

/** Tafsir Ibn Kathir on Al-Ma'idah 5:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_5_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Ma'idah 5:${ayah}`,
    url: `https://quran.com/5:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 5:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q5 = (ayah: number) => quranQuote(5, ayah);

/** Ayahs 1 to 50: keep your word, help in good, the religion perfected, wudu, justice, the two sons of Adam. */
const MAIDAH_ONE: DeepUnit = {
  key: "maidah1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-maidah",
  name: "Al-Ma'idah, ayahs 1 to 50",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Ma'idah",
  lessons: [
    {
      slug: "keep-word",
      title: "Keep your word",
      line: "Believers, fulfill your promises and the duties Allah set.",
      facts: ["Uqud: firm promises", "Allah's limits too"],
      quote: q5(1),
      source: ik(1, "Ibn Abbas, Mujahid and others said the 'obligations' here are treaties and promises. Ibn Abbas also said they include what Allah made lawful and unlawful in the Quran.", "Ibn Jarir mentioned that there is a consensus for this view"),
      difficulty: 2,
      questions: [
        { q: "What is the first command of Al-Ma'idah?", a: "Fulfill your promises", wrong: ["Build a mosque", "Travel for trade", "Fast three days"], why: "Ya ayyuhal-ladhina amanu awfu bil-'uqud." },
        { q: "'Uqud' in 5:1 means, per Ibn Abbas and Mujahid...", a: "Treaties and promises", wrong: ["Gold coins", "Prayer rugs", "Long journeys"], why: "Ibn Jarir says the scholars agree." },
        { q: "Breaking a promise you made is fine if no one finds out.", tf: false, why: "Allah commands fulfilling every promise." }
      ]
    },
    {
      slug: "help-good",
      title: "Help each other in good",
      line: "Help one another in goodness and taqwa, never in sin.",
      facts: ["Birr: goodness", "Udwan: wrongdoing"],
      quote: q5(2),
      source: ik(2, "Allah commands the believers to help one another do good deeds, which is al-birr, and to avoid evil, which is taqwa. He forbids helping one another in sin and wrongdoing.", "Allah commands His believing servants to help one another perform righteous, good deeds"),
      difficulty: 2,
      questions: [
        { q: "In what should believers help each other, in 5:2?", a: "Goodness and taqwa", wrong: ["Sin and wrongdoing", "Showing off", "Gossip"], why: "Wa ta'awanu 'alal-birri wat-taqwa." },
        { q: "A friend asks you to help him cheat. What does 5:2 say?", a: "Do not help in sin", wrong: ["Help him", "Help a little", "Ask others to help"], why: "Wa la ta'awanu 'alal-ithmi wal-'udwan." },
        { q: "What does 'birr' mean, per Ibn Kathir?", a: "Righteous, good deeds", wrong: ["A well", "A desert", "A journey"], why: "And taqwa is avoiding evil." }
      ]
    },
    {
      slug: "perfected",
      title: "The religion made perfect",
      line: "On Arafah Allah said: today I have perfected your religion.",
      facts: ["Akmaltu: I perfected", "Islam chosen for you"],
      quote: q5(3),
      source: hadith("bukhari", "45", "Umar ibn al-Khattab", "Sahih", "A Jewish man told Umar that if this ayah had come to them, they would have made its day a festival. Umar said he knew when and where it came down: on a Friday, while the Prophet ﷺ stood at Arafat.", "we know when and where this verse was revealed to the Prophet"),
      difficulty: 3,
      questions: [
        { q: "What did Allah perfect, in 5:3?", a: "Your religion", wrong: ["Your wealth", "Your houses", "Your poetry"], why: "Al-yawma akmaltu lakum dinakum." },
        { q: "Where was the Prophet ﷺ when 5:3 came down, per Umar?", a: "Standing at Arafat", wrong: ["In a cave", "At sea", "In Ta'if"], why: "Bukhari 45, on a Friday." },
        { q: "Which religion did Allah choose for us, in 5:3?", a: "Islam", wrong: ["Every religion", "No religion", "Only customs"], why: "Wa raditu lakumul-islama dina." }
      ]
    },
    {
      slug: "biggest-favor",
      title: "Nothing missing",
      line: "Islam is complete; we need no other religion or prophet.",
      facts: ["The biggest favor", "Muhammad ﷺ: the final Prophet"],
      quote: q5(3),
      source: ik(3, "Perfecting the religion is the biggest favor Allah gave this Ummah. They need no other religion or prophet besides Muhammad ﷺ, which is why Allah made him the Final Prophet.", "This, indeed, is the biggest favor from Allah to this Ummah"),
      difficulty: 3,
      questions: [
        { q: "What does Ibn Kathir call the perfecting of Islam?", a: "The biggest favor to this Ummah", wrong: ["A small gift", "A test only", "A rumor"], why: "Wa atmamtu 'alaykum ni'mati." },
        { q: "Does this Ummah need another prophet after Muhammad ﷺ?", tf: false, why: "Allah made him the Final Prophet." },
        { q: "One who is forced by hunger may eat what is forbidden, in 5:3.", tf: true, why: "Fa-innallaha ghafurun rahim." }
      ]
    },
    {
      slug: "good-things",
      title: "The good things are lawful",
      line: "Allah made the good things lawful; mention His Name over food.",
      facts: ["Tayyibat: good, pure things", "Bismillah over it"],
      quote: q5(4),
      source: ik(4, "Allah first named the impure, harmful foods, then said the good things are lawful. Muqatil said tayyibat include all that Muslims are allowed and every lawfully earned provision.", "At-Tayyibat includes everything Muslims are allowed and the various types of legally earned provision"),
      difficulty: 3,
      questions: [
        { q: "What is lawful, in 5:4?", a: "The good things", wrong: ["Everything at all", "Nothing", "Only bread"], why: "Qul uhilla lakumut-tayyibat." },
        { q: "What does Muqatil say tayyibat include?", a: "Lawfully earned provision", wrong: ["Stolen goods", "Gambling wins", "Riba"], why: "Everything Muslims are allowed." },
        { q: "What should be said over what the trained animals catch?", a: "The Name of Allah", wrong: ["Nothing", "A poem", "A name of an idol"], why: "Wadhkurusmallahi 'alayh." }
      ]
    },
    {
      slug: "wudu",
      title: "The steps of wudu",
      line: "Before prayer: wash face, arms to elbows, wipe head, wash feet.",
      facts: ["Face, arms, head, feet", "Tayammum if no water"],
      quote: q5(6),
      source: ik(6, "Allah commanded wudu for the prayer. It is required when one is not in a state of purity, and recommended when one already is.", "This is a command of obligation in the case of impurity"),
      difficulty: 3,
      questions: [
        { q: "How far are the arms washed, in 5:6?", a: "Up to the elbows", wrong: ["Only the fingers", "Up to the wrists", "Up to the shoulders"], why: "Wa aydiyakum ilal-marafiq." },
        { q: "Which part is wiped, not washed, in 5:6?", a: "The head", wrong: ["The face", "The feet", "The arms"], why: "Wamsahu bi-ru'usikum." },
        { q: "Which is the right order in 5:6?", a: "Face, arms, head, feet", wrong: ["Feet, head, arms, face", "Head, feet, face, arms", "Arms, face, feet, head"], why: "The ayah names them in this order." }
      ]
    },
    {
      slug: "ease",
      title: "Allah wants ease",
      line: "Allah does not want hardship for you; He wants to purify you.",
      facts: ["Haraj: hardship", "Purity is a favor"],
      quote: q5(6),
      source: ik(6, "Allah does not want to put you in difficulty. This is why He made things easy and allowed tayammum when ill or without water, as a mercy.", "This is why He made things easy and lenient for you"),
      difficulty: 3,
      questions: [
        { q: "What does Allah not want for us, in 5:6?", a: "Hardship", wrong: ["Purity", "Thankfulness", "Prayer"], why: "Ma yuridullahu liyaj'ala 'alaykum min haraj." },
        { q: "Why was tayammum allowed, per Ibn Kathir?", a: "As ease and mercy", wrong: ["As a test of strength", "For fun", "To replace prayer"], why: "To make things comfortable for you." },
        { q: "What should we be, in return, at the end of 5:6?", a: "Thankful", wrong: ["Proud", "Lazy", "Silent"], why: "La'allakum tashkurun." }
      ]
    },
    {
      slug: "hear-obey",
      title: "We hear and we obey",
      line: "Remember your pledge to Allah: we hear and we obey.",
      facts: ["Sami'na wa ata'na", "Allah knows the hearts"],
      quote: q5(7),
      source: ik(7, "This is the pledge the companions gave the Messenger of Allah ﷺ when they accepted Islam: to hear and obey, whether active or tired.", "when they embraced Islam"),
      difficulty: 3,
      questions: [
        { q: "What did the believers say, in 5:7?", a: "We hear and we obey", wrong: ["We will think", "Maybe later", "We hear and refuse"], why: "Sami'na wa ata'na." },
        { q: "When did the companions give this pledge?", a: "When they embraced Islam", wrong: ["At the end of life", "Only in war", "Never"], why: "Ibn Kathir on 5:7." },
        { q: "What does Allah know, in 5:7?", a: "What is in the hearts", wrong: ["Only actions", "Only words", "Nothing hidden"], why: "Innallaha 'alimun bi-dhatis-sudur." }
      ]
    },
    {
      slug: "just-to-enemy",
      title: "Fair even to enemies",
      line: "Do not let hatred stop you from justice; justice is taqwa.",
      facts: ["Shana'an: hatred", "Justice to friend and foe"],
      quote: q5(8),
      source: ik(8, "Do not let your hatred of some people carry you away from justice with them. Be just with everyone, whether a friend or an enemy.", "Rather, be just with every one, whether a friend or an enemy"),
      difficulty: 3,
      questions: [
        { q: "What must not stop you from justice, in 5:8?", a: "Hatred of a people", wrong: ["Hunger", "Rain", "Distance"], why: "Wa la yajrimannakum shana'anu qawm." },
        { q: "What is justice nearest to, in 5:8?", a: "Taqwa", wrong: ["Wealth", "Fame", "Power"], why: "I'dilu huwa aqrabu lit-taqwa." },
        { q: "Ibn Kathir: be just only with friends.", tf: false, why: "Whether a friend or an enemy." }
      ]
    },
    {
      slug: "by-mercy",
      title: "Paradise by His mercy",
      line: "Believers who do good get forgiveness and a great reward.",
      facts: ["Maghfirah: forgiveness", "Ajrun 'azim: great reward"],
      quote: q5(9),
      source: ik(9, "Believers who do good get forgiveness and Paradise. They do not earn Paradise by their deeds alone, but by Allah's mercy and favor.", "They will not earn Paradise on account of their good actions, but rather on account of His mercy and favor"),
      difficulty: 3,
      questions: [
        { q: "What two things are promised in 5:9?", a: "Forgiveness and a great reward", wrong: ["Gold and silver", "Fame and power", "Sleep and food"], why: "Lahum maghfiratun wa ajrun 'azim." },
        { q: "Ibn Kathir: Paradise is reached mainly by...", a: "Allah's mercy and favor", wrong: ["Wealth", "Family name", "Luck"], why: "Not on account of deeds alone." },
        { q: "Who is the promise for, in 5:9?", a: "Those who believe and do good", wrong: ["Those who only wish", "Everyone", "The famous"], why: "Wa 'amilus-salihat." }
      ]
    },
    {
      slug: "twelve-leaders",
      title: "Twelve leaders",
      line: "Twelve leaders gave Allah the pledge of Isra'il's tribes.",
      facts: ["Mithaq: a pledge", "Prayer, zakah, faith"],
      quote: q5(12),
      source: ik(12, "These twelve leaders gave Allah a pledge, for their tribes, to listen and obey Allah, His Messenger and His Book.", "These twelve people were leaders who gave the pledge to Allah to listen and obey"),
      difficulty: 3,
      questions: [
        { q: "How many leaders were appointed, in 5:12?", a: "Twelve", wrong: ["Seven", "Forty", "Three"], why: "Wa ba'athna minhumuthnay 'ashara naqiba." },
        { q: "What did the pledge include, in 5:12?", a: "Prayer, zakah and believing in the messengers", wrong: ["Only trade", "Only fasting", "Only hunting"], why: "La'in aqamtumus-salata wa ataytumuz-zakah." },
        { q: "What did Allah promise those who kept it?", a: "Forgiveness and Gardens", wrong: ["Kingdoms on earth", "Only gold", "Nothing"], why: "La-ukaffiranna 'ankum sayyi'atikum." }
      ]
    },
    {
      slug: "overlook",
      title: "Forgive and overlook",
      line: "Forgive and overlook; Allah loves those who do good.",
      facts: ["Ihsan: doing good", "Hard hearts from broken pledges"],
      quote: q5(13),
      source: ik(13, "Allah said: forgive them and overlook. This, indeed, is the ultimate victory, and some of the Salaf said you will never treat those who disobey Allah with you better than obeying Allah with them.", "This, indeed, is the ultimate victory and triumph"),
      difficulty: 3,
      questions: [
        { q: "What happened to hearts after breaking the pledge, in 5:13?", a: "They grew hard", wrong: ["They grew soft", "They grew wise", "Nothing changed"], why: "Wa ja'alna qulubahum qasiyah." },
        { q: "What did Allah tell the Prophet ﷺ to do, in 5:13?", a: "Forgive and overlook", wrong: ["Take revenge", "Shout back", "Leave Madinah"], why: "Fa'fu 'anhum wasfah." },
        { q: "Ibn Kathir calls forgiving them, in 5:13...", a: "The ultimate victory", wrong: ["A weakness", "A loss", "A mistake"], why: "Innallaha yuhibbul-muhsinin." }
      ]
    },
    {
      slug: "paths-peace",
      title: "Paths of peace",
      line: "The clear Book guides seekers to the ways of peace.",
      facts: ["Subul as-salam: ways of peace", "Darkness to light"],
      quote: q5(16),
      source: ik(16, "Allah guides those who seek His pleasure to ways of safety and righteousness, brings them from darkness into light, and guides them to a straight path.", "meaning, ways of safety and righteousness"),
      difficulty: 3,
      questions: [
        { q: "Whom does the Book guide, in 5:16?", a: "Those who seek Allah's pleasure", wrong: ["Everyone without trying", "Only kings", "No one"], why: "Man ittaba'a ridwanah." },
        { q: "To what does it guide, in 5:16?", a: "The ways of peace", wrong: ["Ways of war", "Ways of wealth", "Ways of fame"], why: "Subulas-salam." },
        { q: "'Ways of peace' means, per Ibn Kathir...", a: "Ways of safety and righteousness", wrong: ["Roads to Makkah", "Trade routes", "Sea paths"], why: "From darkness into light." }
      ]
    },
    {
      slug: "after-a-gap",
      title: "After a long gap",
      line: "The Prophet ﷺ came after a long gap with no messenger.",
      facts: ["Fatrah: a gap", "Bringer of good news"],
      quote: q5(19),
      source: ik(19, "Allah sent Muhammad ﷺ, the Final Messenger, after a long time had passed between him and Isa son of Maryam, so no one could say no warner came.", "after whom there will be no Prophet or Messenger"),
      difficulty: 3,
      questions: [
        { q: "What came before the Prophet ﷺ, in 5:19?", a: "A gap with no messengers", wrong: ["Many messengers at once", "A great flood", "A kingdom"], why: "'Ala fatratin minar-rusul." },
        { q: "Who came just before that gap?", a: "Isa son of Maryam", wrong: ["Ibrahim", "Nuh", "Yusuf"], why: "The gap was between Isa and Muhammad ﷺ." },
        { q: "Why did he come, in 5:19?", a: "So none can say no warner came", wrong: ["To gather wealth", "To build towers", "To rule Rome"], why: "An taqulu ma ja'ana min bashir." }
      ]
    },
    {
      slug: "two-men",
      title: "Two men with trust",
      line: "Two God-fearing men said: enter the gate and trust in Allah.",
      facts: ["Yusha' and Kalib", "Tawakkul: trust"],
      quote: q5(23),
      source: ik(23, "When the Children of Isra'il refused to obey Musa, two righteous men among them, Yusha' and Kalib, told them to go in through the gate and trust in Allah.", "two righteous men among them"),
      difficulty: 4,
      questions: [
        { q: "What did Musa ask his people to do, in 5:21?", a: "Enter the Holy Land", wrong: ["Go back to Egypt", "Build a ship", "Cross the sea again"], why: "Udkhulul-ardal-muqaddasah." },
        { q: "What did the two men advise, in 5:23?", a: "Enter the gate and trust in Allah", wrong: ["Run away", "Wait forever", "Make a deal"], why: "Wa 'alallahi fa-tawakkalu." },
        { q: "Who were the two men, per Ibn Kathir?", a: "Yusha' and Kalib", wrong: ["Harun and Musa", "Dawud and Sulayman", "Yahya and Zakariyya"], why: "Joshua and Caleb." }
      ]
    },
    {
      slug: "forty-years",
      title: "Forty years lost",
      line: "They refused, so they wandered lost in the land for forty years.",
      facts: ["Yatihun: wander lost", "Musa's dua"],
      quote: q5(26),
      source: ik(26, "They refused Musa's order to enter, so they were lost for forty years, wandering in the land, unsure where to go, because they defied Allah's command.", "were punished for forty years by being lost, wandering in the land"),
      difficulty: 4,
      questions: [
        { q: "How long did they wander, in 5:26?", a: "Forty years", wrong: ["Seven days", "Twelve years", "A hundred years"], why: "Arba'ina sanah, yatihuna fil-ard." },
        { q: "What did they tell Musa, in 5:24?", a: "Go, you and your Lord, and fight", wrong: ["We are ready", "Lead us now", "We trust Allah"], why: "Fadh-hab anta wa rabbuka." },
        { q: "Over whom did Musa say he had power, in 5:25?", a: "Himself and his brother", wrong: ["The whole nation", "Fir'awn", "The angels"], why: "Inni la amliku illa nafsi wa akhi." }
      ]
    },
    {
      slug: "accepted",
      title: "Accepted from the mindful",
      line: "Two sons of Adam offered gifts; Allah accepts from the mindful.",
      facts: ["Habil and Qabil", "Envy leads to evil"],
      quote: q5(27),
      source: ik(27, "Allah accepts only from those who fear Him in their actions. Abu ad-Darda said that being sure Allah accepted even one prayer of his would be better than this world.", "who fear Allah in their actions"),
      difficulty: 4,
      questions: [
        { q: "From whom does Allah accept, in 5:27?", a: "Those with taqwa", wrong: ["The rich", "The loud", "Everyone equally"], why: "Innama yataqabbalullahu minal-muttaqin." },
        { q: "What drove the other brother to evil, per Ibn Kathir?", a: "Envy", wrong: ["Hunger", "Cold", "Fear of animals"], why: "Envy and transgression." },
        { q: "What did Abu ad-Darda say would be better than this world?", a: "Knowing one prayer was accepted", wrong: ["A palace", "A long life", "Many children"], why: "Ibn Kathir on 5:27." }
      ]
    },
    {
      slug: "no-hand",
      title: "I will not raise my hand",
      line: "The good brother said: I will not raise my hand against you.",
      facts: ["Fear of Allah stops harm", "Patience over revenge"],
      quote: q5(28),
      source: ik(28, "The good son of Adam said: if you stretch your hand to harm me, I will never stretch my hand against you, for I fear Allah, the Lord of all that exists.", "I shall never stretch my hand against you"),
      difficulty: 4,
      questions: [
        { q: "Why would he not fight back, in 5:28?", a: "He feared Allah", wrong: ["He was weak", "He was asleep", "He did not care"], why: "Inni akhafullaha rabbal-'alamin." },
        { q: "Whose brother was he?", a: "A son of Adam", wrong: ["A son of Nuh", "A son of Ibrahim", "A son of Ya'qub"], why: "Ibnay Adama bil-haqq." },
        { q: "The good brother planned to strike first.", tf: false, why: "Ma ana bi-basitin yadiya ilayk." }
      ]
    },
    {
      slug: "crow",
      title: "Taught by a crow",
      line: "Allah sent a crow to teach burial; then came regret.",
      facts: ["Ghurab: crow", "Nadam: regret"],
      quote: q5(31),
      source: hadith("bukhari", "3335", "Abdullah ibn Mas'ud", "Sahih", "The Prophet ﷺ said: whenever a life is taken unjustly, the first son of Adam carries a share of its burden, because he was the first to start that way.", "for he was the first to start the tradition"),
      difficulty: 4,
      questions: [
        { q: "What did Allah send, in 5:31?", a: "A crow scratching the ground", wrong: ["An angel with a book", "A storm", "A lion"], why: "Fa-ba'athallahu ghuraban yabhathu fil-ard." },
        { q: "What did the brother feel at the end of 5:31?", a: "Regret", wrong: ["Joy", "Pride", "Nothing"], why: "Fa-asbaha minan-nadimin." },
        { q: "Why does the first son of Adam share every later unjust taking of life, in Bukhari 3335?", a: "He started that evil way", wrong: ["He was the oldest", "He was rich", "He was a king"], why: "Narrated by Abdullah ibn Mas'ud." }
      ]
    },
    {
      slug: "save-life",
      title: "Save one life",
      line: "Saving one life is like saving all of mankind.",
      facts: ["Every life is sacred", "Ahyaha: saved it"],
      quote: q5(32),
      source: ik(32, "Whoever unjustly takes one life is as if he took all, since one life is like another. Whoever saves a life, by protecting it and respecting its sanctity, is as if he saved all mankind.", "it would be as if he saved the life of all mankind"),
      difficulty: 4,
      questions: [
        { q: "Saving one life is like saving whom, in 5:32?", a: "All mankind", wrong: ["One city", "One family", "No one"], why: "Fa-ka'annama ahyan-nasa jami'a." },
        { q: "Why is one life like all lives, per Ibn Kathir?", a: "There is no difference between one life and another", wrong: ["Lives are cheap", "Only kings matter", "Numbers do not matter"], why: "Every soul is sacred." },
        { q: "Pulling a drowning child out of a river fits 5:32.", tf: true, why: "Whoever saves a life." }
      ]
    },
    {
      slug: "wasilah",
      title: "Draw near to Allah",
      line: "Have taqwa and seek the means to come near to Allah.",
      facts: ["Wasilah: means of nearness", "By obeying Him"],
      quote: q5(35),
      source: ik(35, "Ibn Abbas said wasilah means the means of approach. Qatadah said the ayah means: seek nearness to Him by obeying Him and doing what pleases Him.", "Seek the means of approach to Him by obeying Him and performing the acts that please Him"),
      difficulty: 4,
      questions: [
        { q: "What does 'wasilah' mean, per Ibn Abbas?", a: "The means of approach", wrong: ["A rope", "A gate", "A tribe"], why: "Ibn Kathir on 5:35." },
        { q: "How do we seek it, per Qatadah?", a: "By obeying Allah and pleasing Him", wrong: ["By paying money", "By travel only", "By sleeping"], why: "Wabtaghu ilayhil-wasilah." },
        { q: "What is 'Al-Wasilah' also the name of?", a: "The highest grade in Paradise", wrong: ["A river", "A mountain", "A city"], why: "The place of the Messenger ﷺ." }
      ]
    },
    {
      slug: "tawrah",
      title: "The Tawrah: guidance and light",
      line: "The Tawrah had guidance and light; prophets judged by it.",
      facts: ["Rabbaniyyun: devoted scholars", "Ahbar: learned men"],
      quote: q5(44),
      source: ik(44, "Allah praises the Tawrah He sent down to Musa, in which was guidance and light, by which the prophets who submitted to Allah judged.", "Allah next praises the Tawrah that He sent down to His servant and Messenger Musa"),
      difficulty: 4,
      questions: [
        { q: "What was in the Tawrah, in 5:44?", a: "Guidance and light", wrong: ["Only stories", "Only laws of trade", "Nothing"], why: "Fiha hudan wa nur." },
        { q: "To which prophet was the Tawrah sent down?", a: "Musa", wrong: ["Isa", "Dawud", "Ibrahim"], why: "Musa son of Imran." },
        { q: "Who was entrusted to protect Allah's Book, in 5:44?", a: "The devoted scholars and learned men", wrong: ["Kings only", "Merchants", "Poets"], why: "Ar-rabbaniyyuna wal-ahbar." }
      ]
    },
    {
      slug: "pardon-charity",
      title: "Pardoning is charity",
      line: "Forgiving the one who hurt you is a charity with a reward.",
      facts: ["Kaffarah: wiping sins", "A reward for the forgiver"],
      quote: q5(45),
      source: ik(45, "Ibn Abbas said: if one pardons by way of charity, it becomes an expiation for the wrongdoer and a reward for the one who was harmed.", "it will result in expiation for the aggressor and reward for the victim"),
      difficulty: 4,
      questions: [
        { q: "What does 5:45 call forgiving the one who harmed you?", a: "Charity", wrong: ["A weakness", "Forbidden", "Useless"], why: "Fa-man tasaddaqa bihi fa-huwa kaffaratun lah." },
        { q: "Who explained this, as Ibn Kathir quotes?", a: "Ibn Abbas", wrong: ["Abu Jahl", "Fir'awn", "Qarun"], why: "If one pardons by way of charity." },
        { q: "Is the victim forced to pardon, in 5:45?", tf: false, why: "Pardoning is a choice, rewarded as charity." }
      ]
    },
    {
      slug: "injil",
      title: "Isa and the Injil",
      line: "Isa came confirming the Tawrah, given the Injil of guidance.",
      facts: ["Injil: the Gospel", "Confirming before it"],
      quote: q5(46),
      source: ik(46, "Allah sent Isa son of Maryam after the prophets of the Children of Isra'il, confirming the Tawrah, and gave him the Injil: guidance that leads to truth and light that removes doubt.", "a guidance that directs to the truth and a light that removes the doubts"),
      difficulty: 4,
      questions: [
        { q: "Which Book was given to Isa, in 5:46?", a: "The Injil", wrong: ["The Zabur", "The Suhuf", "The Quran"], why: "Wa ataynahul-injil." },
        { q: "What did Isa confirm, in 5:46?", a: "The Tawrah before him", wrong: ["Old poems", "Roman law", "Nothing"], why: "Musaddiqan lima bayna yadayhi minat-tawrah." },
        { q: "The 'light' of the Injil, per Ibn Kathir, does what?", a: "Removes doubts", wrong: ["Lights lamps", "Burns books", "Hides truth"], why: "And solves disputes." }
      ]
    },
    {
      slug: "muhaymin",
      title: "The Quran guards the rest",
      line: "The Quran confirms earlier Books and stands guard over them.",
      facts: ["Muhaymin: trusted guardian", "Confirming what came before"],
      quote: q5(48),
      source: ik(48, "Ibn Abbas said muhaymin means the Trustworthy: the Quran is entrusted over every Book before it.", "means entrusted over it"),
      difficulty: 5,
      questions: [
        { q: "What is the Quran over earlier Books, in 5:48?", a: "Muhaymin, a trusted guardian", wrong: ["Equal and silent", "Below them", "A copy"], why: "Wa muhayminan 'alayh." },
        { q: "What does 'muhaymin' mean, per Ibn Abbas?", a: "The Trustworthy", wrong: ["The Oldest", "The Shortest", "The Hidden"], why: "Ibn Kathir on 5:48." },
        { q: "The Quran confirms the Books before it, in 5:48.", tf: true, why: "Musaddiqan lima bayna yadayhi minal-kitab." }
      ]
    },
    {
      slug: "race-good",
      title: "Race to good deeds",
      line: "Allah tests each nation with what He gave: race to do good.",
      facts: ["Fastabiqul-khayrat", "All return to Allah"],
      quote: q5(48),
      source: ik(48, "Allah gave each nation a law and a way, to test them with what He gave. So compete in good deeds; all of you return to Allah, and He will tell you what you differed in.", "so compete in good deeds"),
      difficulty: 5,
      questions: [
        { q: "What does 5:48 tell us to compete in?", a: "Good deeds", wrong: ["Wealth", "Fame", "Sports only"], why: "Fastabiqul-khayrat." },
        { q: "Why did Allah not make all one nation, in 5:48?", a: "To test them in what He gave", wrong: ["He could not", "By accident", "To end the world"], why: "Wa lakin liyabluwakum fi ma atakum." },
        { q: "Where do all people return, in 5:48?", a: "To Allah", wrong: ["To the earth only", "To nothing", "To their tribes"], why: "Ilallahi marji'ukum jami'a." }
      ]
    },
    {
      slug: "best-judge",
      title: "None judges better",
      line: "Who is better in judgment than Allah, for people of sure faith?",
      facts: ["Jahiliyyah: days of ignorance", "Yaqin: firm faith"],
      quote: q5(50),
      source: ik(50, "Allah blames those who leave His commands, which hold every good and forbid every evil, and turn instead to opinions and desires made up by people.", "which include every type of righteous good thing and prohibit every type of evil"),
      difficulty: 5,
      questions: [
        { q: "Who is best in judgment, in 5:50?", a: "Allah", wrong: ["The majority", "The elders", "The richest"], why: "Wa man ahsanu minallahi hukma." },
        { q: "What judgment does 5:50 blame people for seeking?", a: "That of the days of ignorance", wrong: ["That of the prophets", "That of the Quran", "That of justice"], why: "Afa-hukmal-jahiliyyati yabghun." },
        { q: "For whom is this clear, in 5:50?", a: "People of firm faith", wrong: ["The careless", "The proud", "The sleepy"], why: "Li-qawmin yuqinun." }
      ]
    }
  ]
};

/** Ayahs 51 to 120: a people Allah loves, conveying the message, wine and gambling, oaths, the table spread, Isa's answer. */
const MAIDAH_TWO: DeepUnit = {
  key: "maidah2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-maidah",
  name: "Al-Ma'idah, ayahs 51 to 120",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Ma'idah",
  lessons: [
    {
      slug: "loved-people",
      title: "A people He loves",
      line: "Allah brings a people He loves and who love Him.",
      facts: ["Humble with believers", "No fear of blame"],
      quote: q5(54),
      source: ik(54, "These are the qualities of perfect believers: humble with their believing brothers, firm with their enemies, and nothing stops them from obeying Allah, not even the blame of those who blame.", "These are the qualities of perfect believers"),
      difficulty: 3,
      questions: [
        { q: "How are this people with the believers, in 5:54?", a: "Humble", wrong: ["Proud", "Harsh", "Distant"], why: "Adhillatin 'alal-mu'minin." },
        { q: "What do they not fear, in 5:54?", a: "The blame of blamers", wrong: ["Allah", "The Last Day", "Sin"], why: "Wa la yakhafuna lawmata la'im." },
        { q: "Allah loves them and they love Him, in 5:54.", tf: true, why: "Yuhibbuhum wa yuhibbunah." }
      ]
    },
    {
      slug: "true-allies",
      title: "Your true protector",
      line: "Your protector: Allah, His Messenger ﷺ, and praying believers.",
      facts: ["Wali: protector", "Hizbullah: Allah's party"],
      quote: q5(55),
      source: ik(55, "Your protector is Allah, His Messenger, and the believers who pray, give zakah and bow down. Whoever takes them as protectors is of the party of Allah, which wins.", "Verily, your Protector is Allah, His Messenger, and the believers"),
      difficulty: 3,
      questions: [
        { q: "Who is the believers' protector, in 5:55?", a: "Allah, His Messenger ﷺ and the believers", wrong: ["Kings", "The rich", "Strong tribes"], why: "Innama waliyyukumullahu wa rasuluh." },
        { q: "Which believers does 5:55 describe?", a: "Those who pray, give zakah and bow", wrong: ["Those who shout", "Those who boast", "Those who sleep in"], why: "Alladhina yuqimunas-salah." },
        { q: "Who wins in the end, in 5:56?", a: "The party of Allah", wrong: ["The largest army", "The richest group", "No one"], why: "Fa-inna hizballahi humul-ghalibun." }
      ]
    },
    {
      slug: "adhan",
      title: "The call they mocked",
      line: "Some mocked the adhan, yet it calls to the best deed.",
      facts: ["Adhan: the call", "Shaytan flees it"],
      quote: q5(58),
      source: ik(58, "When the adhan is called for the prayer, the best of actions, some made fun of it. Shaytan runs away when he hears the adhan, and comes back when it ends.", "which is the best action there is"),
      difficulty: 3,
      questions: [
        { q: "What did some people mock, in 5:58?", a: "The call to prayer", wrong: ["The market", "The rain", "Poetry"], why: "Wa idha nadaytum ilas-salatit-takhadhuha huzuwan." },
        { q: "What does Shaytan do at the adhan, per Ibn Kathir?", a: "Runs away", wrong: ["Sits closer", "Sleeps", "Prays"], why: "He comes back when it ends." },
        { q: "What should you say when you hear the adhan, in Bukhari 611?", a: "What the caller says", wrong: ["Nothing", "Your own words", "Only amin"], why: "Narrated by Abu Sa'id al-Khudri." }
      ]
    },
    {
      slug: "convey",
      title: "Convey it all",
      line: "Messenger, convey all that came down; Allah will protect you.",
      facts: ["Balligh: convey", "Allah protects him"],
      quote: q5(67),
      source: hadith("bukhari", "4612", "Aishah", "Sahih", "Aishah said: whoever says Muhammad ﷺ hid any part of what was revealed to him is a liar, for Allah says: O Messenger, convey what has been sent down to you from your Lord.", "Whoever tells that Muhammad concealed part of what was revealed to him, is a liar"),
      difficulty: 3,
      questions: [
        { q: "What was the Messenger ﷺ told to do, in 5:67?", a: "Convey what was sent down", wrong: ["Keep some secret", "Write poems", "Leave Makkah"], why: "Ya ayyuhar-rasulu balligh." },
        { q: "Did the Prophet ﷺ hide any part of the revelation, per Aishah?", tf: false, why: "Bukhari 4612: whoever says so is a liar." },
        { q: "Who would protect him, in 5:67?", a: "Allah", wrong: ["His tribe", "Rome", "A wall"], why: "Wallahu ya'simuka minan-nas." }
      ]
    },
    {
      slug: "no-harm",
      title: "No power to harm",
      line: "Why worship what cannot harm you or bring you any good?",
      facts: ["Only Allah hears all", "Only Allah knows all"],
      quote: q5(76),
      source: ik(76, "How can people worship things that cannot keep harm away from them or bring them any benefit, when Allah alone hears what His servants say and knows all things?", "meaning, which cannot prevent harm for you nor bring about your benefit"),
      difficulty: 3,
      questions: [
        { q: "What can false gods do, per 5:76?", a: "Neither harm nor benefit", wrong: ["Bring rain", "Give life", "Grant Paradise"], why: "Ma la yamliku lakum darran wa la naf'a." },
        { q: "Which names end 5:76?", a: "All-Hearer, All-Knower", wrong: ["Most Rich, Praised", "Wise, Forgiving", "Strong, Mighty"], why: "Wallahu huwas-sami'ul-'alim." },
        { q: "Can a statue hear your dua?", tf: false, why: "Only Allah hears what His servants say." }
      ]
    },
    {
      slug: "forbid-evil",
      title: "They did not stop evil",
      line: "They did not stop one another from evil; how bad that was.",
      facts: ["Nahy 'anil-munkar", "Silence spread the sin"],
      quote: q5(79),
      source: ik(79, "They did not stop one another from sins and forbidden things. Allah blamed this so that it would not be copied.", "They did not forbid each other from committing sins and the prohibitions"),
      difficulty: 3,
      questions: [
        { q: "What did they fail to do, in 5:79?", a: "Stop one another from evil", wrong: ["Build houses", "Trade fairly", "Travel"], why: "Kanu la yatanahawna 'an munkarin fa'aluh." },
        { q: "Why did Allah blame them, per Ibn Kathir?", a: "So we would not copy them", wrong: ["For fun", "To end prayer", "To praise them"], why: "So that it would not be imitated." },
        { q: "By whose tongues were they cursed, in 5:78?", a: "Dawud and Isa", wrong: ["Nuh and Hud", "Yusuf and Ya'qub", "Salih and Shu'ayb"], why: "'Ala lisani Dawuda wa 'Isabni Maryam." }
      ]
    },
    {
      slug: "tears",
      title: "Eyes full of tears",
      line: "Some heard the Quran and wept, knowing it was the truth.",
      facts: ["Tafidu minad-dam'", "Write us with the witnesses"],
      quote: q5(83),
      source: ik(83, "When they listen to what came down to the Messenger, their eyes overflow with tears because of the truth they recognized, and they say: our Lord, we believe.", "you see their eyes overflowing with tears because of the truth they have recognized"),
      difficulty: 3,
      questions: [
        { q: "What happened when they heard the Quran, in 5:83?", a: "Their eyes overflowed with tears", wrong: ["They laughed", "They left", "They slept"], why: "Tara a'yunahum tafidu minad-dam'." },
        { q: "Why did they weep?", a: "They recognized the truth", wrong: ["They were hungry", "They were sad about trade", "They were afraid of rain"], why: "Mimma 'arafu minal-haqq." },
        { q: "What did they ask Allah, in 5:83?", a: "Write us among the witnesses", wrong: ["Give us gold", "Make us kings", "Leave us alone"], why: "Faktubna ma'ash-shahidin." }
      ]
    },
    {
      slug: "no-banning-good",
      title: "Do not ban the good",
      line: "Do not forbid the good things Allah made lawful for you.",
      facts: ["Islam is the middle way", "Halal and tayyib"],
      quote: q5(87),
      source: ik(87, "Islam is a middle way between those who go to extremes and those who fall short. So do not forbid the good things Allah allowed, and do not go too far.", "it does not allow excessive application, nor lack of application"),
      difficulty: 4,
      questions: [
        { q: "What does 5:87 forbid?", a: "Banning good things Allah allowed", wrong: ["Eating", "Marrying", "Sleeping"], why: "La tuharrimu tayyibati ma ahallallahu lakum." },
        { q: "Ibn Kathir says Islam is...", a: "A middle way", wrong: ["The hardest way", "No rules", "Only for the old"], why: "Between extremes and falling short." },
        { q: "Someone swears never to eat dates again to be more pious. Does 5:87 support that?", tf: false, why: "Do not forbid what Allah made lawful." }
      ]
    },
    {
      slug: "oaths",
      title: "When you break an oath",
      line: "Break a firm oath? Feed ten poor people, clothe them, or fast.",
      facts: ["Kaffarah: make-up", "Guard your oaths"],
      quote: q5(89),
      source: ik(89, "For a deliberate oath that is broken, the expiation is feeding ten poor people from the middle of what you feed your family, or clothing them, or freeing a slave; whoever cannot, fasts three days.", "for its expiation feed ten poor"),
      difficulty: 4,
      questions: [
        { q: "How many poor are fed for a broken oath, in 5:89?", a: "Ten", wrong: ["Three", "Seven", "Sixty"], why: "It'amu 'asharati masakin." },
        { q: "If you cannot afford it, what do you do, in 5:89?", a: "Fast three days", wrong: ["Nothing", "Fast a month", "Pray once"], why: "Fa-siyamu thalathati ayyam." },
        { q: "Does Allah hold you to slips of the tongue in oaths, in 5:89?", tf: false, why: "La yu'akhidhukumullahu bil-laghwi fi aymanikum." }
      ]
    },
    {
      slug: "khamr",
      title: "Wine and gambling",
      line: "Wine, gambling, idols and lot-arrows are filth: avoid them.",
      facts: ["Khamr: intoxicants", "Maysir: gambling"],
      quote: q5(90),
      source: ik(90, "Ibn Abbas said rijs means an abomination of Shaytan's work. Avoid all of these so that you may succeed.", "avoid all of these abominations"),
      difficulty: 4,
      questions: [
        { q: "What does 5:90 call khamr and gambling?", a: "Filth of Shaytan's work", wrong: ["Gifts", "Medicine", "Small slips"], why: "Rijsun min 'amalish-shaytan." },
        { q: "What must we do with them, in 5:90?", a: "Avoid them", wrong: ["Use a little", "Sell them", "Use on Eid"], why: "Fajtanibuhu la'allakum tuflihun." },
        { q: "What is 'maysir'?", a: "Gambling", wrong: ["Fasting", "Trading", "Hunting"], why: "Ibn Kathir on 5:90." }
      ]
    },
    {
      slug: "enmity",
      title: "What Shaytan wants",
      line: "Shaytan uses wine and gambling to stir hatred and stop prayer.",
      facts: ["Enmity and hatred", "Will you not stop?"],
      quote: q5(91),
      source: hadith("bukhari", "4620", "Anas ibn Malik", "Sahih", "Anas was pouring drinks at Abu Talhah's house when the call came that wine was forbidden. Abu Talhah told him to pour it out, and it flowed through the streets of Madinah.", "Then it (alcoholic drinks) was seen flowing through the streets of Medina"),
      difficulty: 4,
      questions: [
        { q: "What does Shaytan want, in 5:91?", a: "Hatred between you and to stop your prayer", wrong: ["Your health", "Your peace", "Your success"], why: "Innama yuridush-shaytanu an yuqi'a baynakumul-'adawah." },
        { q: "What did the companions do when the ban came, in Bukhari 4620?", a: "Poured it out at once", wrong: ["Sold it", "Hid it", "Drank it last"], why: "It flowed through the streets of Madinah." },
        { q: "In whose house was Anas serving drinks?", a: "Abu Talhah", wrong: ["Abu Jahl", "Abu Lahab", "Abu Sufyan"], why: "Narrated by Anas ibn Malik." }
      ]
    },
    {
      slug: "unseen-test",
      title: "Tested in private",
      line: "In ihram, game came near; Allah tests who fears Him unseen.",
      facts: ["Bil-ghayb: unseen", "Obey in public and private"],
      quote: q5(94),
      source: ik(94, "Allah tested them with game coming near their camp in ihram. They could catch it in public or in secret, and so the obedience of those who obey Him in public and secret became clear.", "This is how the obedience of those who obey Allah in public and secret becomes apparent and tested"),
      difficulty: 4,
      questions: [
        { q: "What did Allah test them with, in 5:94?", a: "Game within easy reach", wrong: ["Hunger", "A storm", "Gold"], why: "Tanaluhu aydikum wa rimahukum." },
        { q: "What does the test show, in 5:94?", a: "Who fears Allah unseen", wrong: ["Who is fastest", "Who is richest", "Who is strongest"], why: "Liya'lamallahu man yakhafuhu bil-ghayb." },
        { q: "Is hunting land game allowed in ihram, in 5:95?", tf: false, why: "La taqtulus-sayda wa antum hurum." }
      ]
    },
    {
      slug: "sea-food",
      title: "Gifts of the sea",
      line: "Sea game is lawful, food for you and for travelers.",
      facts: ["Sayd al-bahr: sea game", "For travelers too"],
      quote: q5(96),
      source: ik(96, "Sea game is food and provision for you and for those traveling on the sea, Ikrimah said. Other scholars said it covers fish that is salted and carried inland for travelers.", "those who are in the sea and traveling along the sea"),
      difficulty: 4,
      questions: [
        { q: "What is lawful even in ihram, in 5:96?", a: "Sea game", wrong: ["Land game", "Birds", "Deer"], why: "Uhilla lakum saydul-bahr." },
        { q: "For whom is it food, in 5:96?", a: "You and travelers", wrong: ["Only kings", "Only fishermen", "No one"], why: "Mata'an lakum wa lis-sayyarah." },
        { q: "What did Allah make the Ka'bah for people, in 5:97?", a: "A place of safety and benefit", wrong: ["A market only", "A fort", "A palace"], why: "Qiyaman lin-nas." }
      ]
    },
    {
      slug: "good-bad",
      title: "Not equal",
      line: "Bad and good are never equal, even when bad is plenty.",
      facts: ["Khabith: bad", "Tayyib: good"],
      quote: q5(100),
      source: ik(100, "A little that is lawful is better than a lot that is evil. People of understanding avoid the forbidden and let the lawful be enough for them.", "the little permissible is better than the abundant evil"),
      difficulty: 4,
      questions: [
        { q: "Are bad and good equal, in 5:100?", tf: false, why: "Qul la yastawil-khabithu wat-tayyib." },
        { q: "Ibn Kathir: a little lawful is better than...", a: "A lot of evil", wrong: ["A little evil", "Nothing", "A good friend"], why: "The little permissible beats the abundant evil." },
        { q: "Whom does 5:100 address?", a: "People of understanding", wrong: ["The careless", "Animals", "Kings"], why: "Ya ulil-albab." }
      ]
    },
    {
      slug: "useless-questions",
      title: "Do not ask needlessly",
      line: "Do not ask about things that would trouble you if shown.",
      facts: ["Good manners in asking", "Ask what helps"],
      quote: q5(101),
      source: hadith("bukhari", "4621", "Anas ibn Malik", "Sahih", "The Prophet ﷺ gave a sermon and said: if you knew what I know, you would laugh little and weep much. The companions covered their faces and wept. A man asked who his father was, and 5:101 came down.", "If you but knew what I know then you would have laughed little and wept much"),
      difficulty: 4,
      questions: [
        { q: "What kind of questions does 5:101 forbid?", a: "Ones that would trouble you if answered", wrong: ["Questions about prayer", "All questions", "Questions to parents"], why: "In tubda lakum tasu'kum." },
        { q: "What did the Prophet ﷺ say if they knew what he knew?", a: "They would laugh little and weep much", wrong: ["They would sleep more", "They would be rich", "They would travel"], why: "Bukhari 4621, from Anas." },
        { q: "Ibn Kathir: 5:101 teaches good manners in asking.", tf: true, why: "Forbidding asking about useless things." }
      ]
    },
    {
      slug: "yourselves",
      title: "Mind yourselves, and others",
      line: "Take care of yourselves, but do not leave evil unchanged.",
      facts: ["Alaykum anfusakum", "Abu Bakr's warning"],
      quote: q5(105),
      source: hadith("tirmidhi", "2168", "Abu Bakr as-Siddiq", "Sahih", "Abu Bakr said: you recite 5:105 but put it in the wrong place. I heard the Messenger of Allah ﷺ say: when people see a wrongdoer and do not take him by the hand, Allah may soon cover them all with punishment.", "When the people see the wrongdoer and they do not take him by the hand"),
      difficulty: 5,
      questions: [
        { q: "What does 5:105 tell believers?", a: "Take care of yourselves", wrong: ["Forget others", "Stop praying", "Leave the city"], why: "'Alaykum anfusakum." },
        { q: "Did Abu Bakr say 5:105 means ignore wrongdoing?", tf: false, why: "He said people put it in the wrong place." },
        { q: "Who narrated this warning in Tirmidhi 2168?", a: "Abu Bakr as-Siddiq", wrong: ["Abu Jahl", "Umar's son", "Abu Lahab"], why: "From the Messenger of Allah ﷺ." }
      ]
    },
    {
      slug: "witnesses",
      title: "Witnesses for a will",
      line: "When death nears, have two just witnesses for your will.",
      facts: ["Wasiyyah: a will", "Two just men"],
      quote: q5(106),
      source: ik(106, "When death approaches one of you and he makes a will, two just men should witness it, so the rights of the heirs are kept.", "take the testimony of two just men of your own folk"),
      difficulty: 5,
      questions: [
        { q: "How many witnesses for a will, in 5:106?", a: "Two just men", wrong: ["One child", "Ten men", "None"], why: "Ithnani dhawa 'adlin minkum." },
        { q: "When is this ruling needed, in 5:106?", a: "When death approaches", wrong: ["At a wedding", "At birth", "On Eid"], why: "Idha hadara ahadakumul-mawt." },
        { q: "What must the witnesses be?", a: "Just and honest", wrong: ["Rich", "Famous", "Young"], why: "Dhawa 'adl." }
      ]
    },
    {
      slug: "messengers-gathered",
      title: "The messengers gathered",
      line: "Allah will gather the messengers and ask how people answered.",
      facts: ["Allam al-ghuyub", "The horror of that Day"],
      quote: q5(109),
      source: ik(109, "When asked how people responded, the messengers will say: we have no knowledge. Mujahid, Al-Hasan and As-Suddi said this is from the horror of that Day.", "is the result of the horror of that Day"),
      difficulty: 5,
      questions: [
        { q: "What will the messengers say, in 5:109?", a: "We have no knowledge", wrong: ["We know all", "Ask the people", "We forgot"], why: "La 'ilma lana." },
        { q: "Why will they say this, per Mujahid?", a: "The horror of that Day", wrong: ["They forgot", "They were tired", "They were angry"], why: "Ibn Kathir on 5:109." },
        { q: "Who alone knows the unseen, in 5:109?", a: "Allah", wrong: ["The messengers", "The angels", "The jinn"], why: "Innaka anta 'allamul-ghuyub." }
      ]
    },
    {
      slug: "isa-miracles",
      title: "By My permission",
      line: "Isa's miracles all came by Allah's permission, not his own.",
      facts: ["Bi-idhni: by My permission", "Jibril supported him"],
      quote: q5(110),
      source: ik(110, "Allah reminds Isa of His favors: speaking in the cradle, the clay bird, healing the blind and lepers, and bringing out the dead, each by Allah's permission.", "and it became a bird by My permission"),
      difficulty: 5,
      questions: [
        { q: "How did the clay bird come to life, in 5:110?", a: "By Allah's permission", wrong: ["By Isa's own power", "By magic", "By chance"], why: "Fa-takunu tayran bi-idhni." },
        { q: "Who supported Isa, in 5:110?", a: "Ruh al-Qudus, Jibril", wrong: ["A king", "An army", "A jinn"], why: "Idh ayyadtuka bi-ruhil-qudus." },
        { q: "When did Isa speak to people, in 5:110?", a: "In the cradle and as a grown man", wrong: ["Only when old", "Never", "Only in dreams"], why: "Fil-mahdi wa kahla." }
      ]
    },
    {
      slug: "table-spread",
      title: "The table spread",
      line: "The disciples asked for a table from heaven; Allah sent it.",
      facts: ["Al-Ma'idah: the table", "Hawariyyun: disciples"],
      quote: q5(114),
      source: ik(112, "This is the story of the Ma'idah, from which the Surah takes its name. Allah accepted Isa's request and sent it down as a favor and a clear proof.", "This is also among the favors that Allah granted His servant and Messenger"),
      difficulty: 5,
      questions: [
        { q: "What did the disciples ask for, in 5:112?", a: "A table of food from heaven", wrong: ["A palace", "A river", "An army"], why: "An yunazzila 'alayna ma'idatan minas-sama'." },
        { q: "Why did they want it, in 5:113?", a: "To eat and grow surer in faith", wrong: ["To sell it", "To show off", "To feed animals"], why: "Wa tatma'inna qulubuna." },
        { q: "The Surah is named after this table.", tf: true, why: "Al-Ma'idah: the table spread." }
      ]
    },
    {
      slug: "isa-answer",
      title: "Isa's answer",
      line: "Isa will say: I only told them to worship Allah alone.",
      facts: ["Subhanak: glory to You", "Worship Allah alone"],
      quote: q5(117),
      source: ik(117, "Isa will say: I only called them to what You sent me with and commanded me to convey: worship Allah, my Lord and your Lord.", "I only called them to what You sent me with and commanded me to convey to them"),
      difficulty: 5,
      questions: [
        { q: "What does Isa say first, in 5:116?", a: "Glory be to You", wrong: ["Yes, I said it", "I forgot", "Ask my mother"], why: "Subhanaka ma yakunu li an aqula ma laysa li bi-haqq." },
        { q: "What did Isa tell people, in 5:117?", a: "Worship Allah, my Lord and your Lord", wrong: ["Worship me", "Worship my mother", "Worship the angels"], why: "U'budullaha rabbi wa rabbakum." },
        { q: "Who was the Watcher over them after Isa was taken up, in 5:117?", a: "Allah", wrong: ["The disciples", "Rome", "No one"], why: "Kunta antar-raqiba 'alayhim." }
      ]
    },
    {
      slug: "all-night",
      title: "One ayah all night",
      line: "The Prophet ﷺ repeated 5:118 in prayer until morning.",
      facts: ["Al-'Aziz al-Hakim", "Hope in Allah's mercy"],
      quote: q5(118),
      source: hadith("nasai", "1010", "Abu Dharr", "Hasan", "Abu Dharr said: the Prophet ﷺ stayed up the whole night repeating one ayah: if You punish them, they are Your servants, and if You forgive them, You are the Almighty, the All-Wise.", "The Prophet (ﷺ) stayed up all night repeating one verse"),
      difficulty: 5,
      questions: [
        { q: "What did the Prophet ﷺ do with 5:118, in Nasa'i 1010?", a: "Repeated it all night", wrong: ["Recited it once", "Never recited it", "Wrote it on a wall"], why: "Narrated by Abu Dharr." },
        { q: "How does 5:118 end?", a: "You are the Almighty, the All-Wise", wrong: ["You are the Rich", "You are the Near", "You are the Last"], why: "Fa-innaka antal-'azizul-hakim." },
        { q: "Who said 5:118 first, as the Quran tells?", a: "Isa son of Maryam", wrong: ["Musa", "Ibrahim", "Nuh"], why: "In tu'adhdhibhum fa-innahum 'ibaduk." }
      ]
    },
    {
      slug: "truthful-day",
      title: "The day truth pays",
      line: "On that Day the truthful profit from their truth.",
      facts: ["Allah pleased with them", "The great success"],
      quote: q5(119),
      source: ik(119, "This is the Day the truthful profit from their truth. Ibn Abbas said: this is the Day when tawhid benefits those who believed in it.", "This is the Day when Tawhid will benefit those who believed in it"),
      difficulty: 5,
      questions: [
        { q: "Who profits on that Day, in 5:119?", a: "The truthful", wrong: ["The rich", "The famous", "The clever liars"], why: "Hadha yawmu yanfa'us-sadiqina sidquhum." },
        { q: "What did Ibn Abbas say benefits them that Day?", a: "Tawhid", wrong: ["Gold", "Their tribe", "Their looks"], why: "Ibn Kathir on 5:119." },
        { q: "What does 5:119 call Allah being pleased with them?", a: "The great success", wrong: ["A small gift", "A test", "A rumor"], why: "Dhalikal-fawzul-'azim." }
      ]
    }
  ]
};

export const MAIDAH_UNITS: readonly DeepUnit[] = [MAIDAH_ONE, MAIDAH_TWO];
