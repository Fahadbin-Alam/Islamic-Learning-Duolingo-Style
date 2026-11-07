import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Al-Hajj ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Hajj 21:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_22_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Hajj 22:${ayah}`,
    url: `https://quran.com/22:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 22:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}


const q22 = (ayah: number) => quranQuote(22, ayah);

/** Ayahs 1 to 24: taqwa before the Hour, signs of the Resurrection in our creation and in the rain, and everything prostrating to Allah. */
const HAJJ_ONE: DeepUnit = {
  key: "hajj1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-22",
  name: "Al-Hajj, ayahs 1 to 24",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Hajj",
  lessons: [
    {
      slug: "taqwa-before-the-hour",
      title: "Taqwa before the Hour",
      line: "Allah calls all people to taqwa before the Hour comes.",
      facts: ["The Hour begins with a great shaking", "Taqwa protects us on that Day"],
      quote: q22(1),
      source: ik(1, "Al-Hajj opens by calling all mankind to have taqwa of their Lord, and tells of the great shaking of the Hour, so that people prepare for it.", "Allah commands His servants to have Taqwa of Him"),
      difficulty: 2,
      questions: [
        { q: "Whom does 22:1 call to taqwa?", a: "All mankind", wrong: ["Only the Prophets", "Only the angels", "Only the old"], why: "O mankind! Have Taqwa of your Lord!" },
        { q: "What does 22:1 call terrible?", a: "The shaking of the Hour", wrong: ["A storm at sea", "A long winter", "A lost battle"], why: "Verily, the earthquake of the Hour is a terrible thing." },
        { tf: true, q: "Allah warns us of the Hour so we can prepare.", why: "Allah commands His servants to have Taqwa of Him, and informs them of the terrors of that Day." }
      ]
    },
    {
      slug: "arguing-without-knowledge",
      title: "Arguing without knowledge",
      line: "Some argue about Allah with no knowledge and follow Shaytan.",
      facts: ["Speak about Allah only with knowledge", "Shaytan misleads those who follow him"],
      quote: q22(3),
      source: ik(3, "Some people argue about Allah without sound knowledge and follow every rebellious devil. Whoever follows Shaytan, he leads him astray.", "without sound knowledge"),
      difficulty: 2,
      questions: [
        { q: "How do they argue about Allah, in 22:3?", a: "Without knowledge", wrong: ["With proof", "With the Quran", "With kindness"], why: "Among mankind is he who disputes about Allah, without knowledge." },
        { q: "Whom do they follow, in 22:3?", a: "Every rebellious Shaytan", wrong: ["The Prophets", "The scholars", "Their parents"], why: "And follows every rebellious Shaytan." },
        { tf: false, q: "Shaytan guides those who follow him.", why: "Whosoever follows him, he will mislead him." }
      ]
    },
    {
      slug: "created-from-dust",
      title: "Created from dust",
      line: "If you doubt the Resurrection, look at how Allah made you.",
      facts: ["Adam was created from dust", "The One who made you can remake you"],
      quote: q22(5),
      source: ik(5, "Allah answers doubt about the Resurrection with our own creation: Adam was created from dust, and his children step by step in the womb. The One who began creation can bring it back.", "you were originally created from dust"),
      difficulty: 2,
      questions: [
        { q: "What doubt does 22:5 answer?", a: "Doubt about the Resurrection", wrong: ["Doubt about the weather", "Doubt about trade", "Doubt about travel"], why: "O mankind! If you are in doubt about the Resurrection." },
        { q: "What were we first created from, in 22:5?", a: "Dust", wrong: ["Fire", "Light", "Gold"], why: "Then verily, We have created you from dust." },
        { q: "Who was created from dust, per Ibn Kathir?", a: "Adam", wrong: ["Nuh", "Ibrahim", "Musa"], why: "You were originally created from dust, which is what Adam was created from." }
      ]
    },
    {
      slug: "weak-strong-weak",
      title: "Weak, then strong, then weak",
      line: "We are born weak, grow strong, and some reach old age.",
      facts: ["Allah gives strength little by little", "Some die young, some grow very old"],
      quote: q22(5),
      source: ik(5, "We come out as weak babies. Allah gives us strength gradually and makes our parents kind to us, until we reach full strength. Some die young, and some reach old age and forget what they knew.", "Then Allah gives him strength, gradually"),
      difficulty: 3,
      questions: [
        { q: "How does Allah bring us out, in 22:5?", a: "As infants", wrong: ["As adults", "As scholars", "As kings"], why: "Then We bring you out as infants." },
        { q: "How does Allah give us strength, per Ibn Kathir?", a: "Gradually", wrong: ["All at once", "Only in old age", "Never"], why: "Then Allah gives him strength, gradually." },
        { tf: true, q: "Some people reach an old age where they forget what they knew.", why: "So that he knows nothing after having known." }
      ]
    },
    {
      slug: "dead-earth-comes-alive",
      title: "Dead earth comes alive",
      line: "Rain brings dry earth to life; Allah will raise the dead too.",
      facts: ["The earth swells and grows plants", "A sign of the Resurrection"],
      quote: q22(5),
      source: ik(5, "You see the earth dry and lifeless. When Allah sends rain, it stirs, swells and grows every lovely kind of plant. In the same way Allah will bring the dead back to life.", "it is stirred to life, that is, vegetation begins to grow"),
      difficulty: 3,
      questions: [
        { q: "What happens when rain falls on dry earth, in 22:5?", a: "It stirs and grows plants", wrong: ["It cracks more", "It turns to stone", "Nothing happens"], why: "When We send down water on it, it is stirred to life, and it swells and puts forth every lovely kind." },
        { q: "What does the reviving earth prove, per Ibn Kathir?", a: "Allah can raise the dead", wrong: ["Rain is a god", "The earth is eternal", "Plants have souls"], why: "This is another sign of the power of Allah to bring the dead back to life." },
        { q: "What is Allah able to do, in 22:6?", a: "All things", wrong: ["Only some things", "Only small things", "Nothing alone"], why: "It is He Who gives life to the dead, and it is He Who is able to do all things." }
      ]
    },
    {
      slug: "hour-no-doubt",
      title: "The Hour has no doubt",
      line: "The Hour is surely coming, and Allah will raise the buried.",
      facts: ["No doubt about the Hour", "Allah creates them anew"],
      quote: q22(7),
      source: ik(7, "The Hour will surely come. Allah will bring back to life those in the graves after they became dust, creating them anew.", "He will bring them back to life after they have become dust"),
      difficulty: 3,
      questions: [
        { q: "Is there any doubt about the Hour, in 22:7?", a: "No doubt at all", wrong: ["A little doubt", "Only some say so", "It may not come"], why: "And surely, the Hour is coming, there is no doubt about it." },
        { q: "Whom will Allah resurrect, in 22:7?", a: "Those in the graves", wrong: ["Only animals", "Only kings", "No one"], why: "And certainly, Allah will resurrect those who are in the graves." },
        { tf: true, q: "Allah can bring people back after they became dust.", why: "He will bring them back to life after they have become dust." }
      ]
    },
    {
      slug: "neck-bent-in-pride",
      title: "Turning away in pride",
      line: "The proud turn their neck away when called to the truth.",
      facts: ["No knowledge, guidance or Book", "Pride stops them from the truth"],
      quote: q22(8),
      source: ik(8, "Some argue about Allah with no knowledge, no guidance and no Book. They turn their neck away in pride, too proud to follow the truth, and lead others astray.", "Too proud to follow the truth when he is called to it"),
      difficulty: 3,
      questions: [
        { q: "What three things do they lack, in 22:8?", a: "Knowledge, guidance, a Book", wrong: ["Money, land, sons", "Food, water, shade", "Friends, horses, swords"], why: "Who disputes about Allah, without knowledge or guidance, or a Book giving light." },
        { q: "What does bending the neck mean, per Ibn Abbas?", a: "Too proud to follow truth", wrong: ["Feeling tired", "Looking at the sky", "Bowing in prayer"], why: "Too proud to follow the truth when he is called to it." },
        { q: "Is Allah ever unjust to His servants, in 22:10?", a: "Never", wrong: ["Sometimes", "Only to the poor", "Only on Fridays"], why: "And verily, Allah is not unjust to servants." }
      ]
    },
    {
      slug: "worship-on-the-edge",
      title: "Worship on the edge",
      line: "Some worship Allah only while life goes their way.",
      facts: ["Edge means in doubt", "A test makes them turn back"],
      quote: q22(11),
      source: ik(11, "Some worship Allah as if standing on an edge. If good comes, they are content; if a test comes, they turn back. They lose both this world and the Hereafter.", "in doubt. Others said that it meant on the edge"),
      difficulty: 3,
      questions: [
        { q: "What does upon the edge mean, per Mujahid?", a: "In doubt", wrong: ["In a hurry", "In secret", "In a mosque"], why: "Upon the edge means, in doubt." },
        { q: "What does such a person do when tested, in 22:11?", a: "He turns back", wrong: ["He prays more", "He gives charity", "He thanks Allah"], why: "But if a Fitnah strikes him, he turns back on his face." },
        { q: "What does he lose, in 22:11?", a: "This world and the Hereafter", wrong: ["Only some money", "Only a friend", "Nothing"], why: "He loses both this world and the Hereafter. That is the evident loss." }
      ]
    },
    {
      slug: "edge-sons-and-foals",
      title: "Good only if it pays",
      line: "Some called Islam good only when they gained from it.",
      facts: ["Ibn Abbas explained 22:11", "Faith is not a trade deal"],
      quote: q22(11),
      source: hadith("bukhari", "4742", "Ibn Abbas", "Sahih", "Ibn Abbas said about 22:11: a man would come to Madinah, and if he had a son and his mares had foals he called the religion good, and if not, he called it bad.", "if his wife brought a son and his mares produces offspring"),
      difficulty: 4,
      questions: [
        { q: "When did such a man call Islam good, per Ibn Abbas?", a: "When he got sons and foals", wrong: ["When he learned Quran", "When he prayed", "When he fasted"], why: "If his wife brought a son and his mares produced offspring, he would say, This religion is good." },
        { tf: false, q: "True faith depends on getting what we want.", why: "Allah blames worshipping Him on the edge: content with good, turning back at a test." },
        { q: "Where did these men come to, per Ibn Abbas?", a: "Madinah", wrong: ["Makkah", "Ta'if", "Sham"], why: "A man used to come to Medina." }
      ]
    },
    {
      slug: "neither-harm-nor-benefit",
      title: "Neither harm nor benefit",
      line: "Idols can neither help nor harm the one who calls them.",
      facts: ["Calling others besides Allah is straying far", "An evil friend to have"],
      quote: q22(12),
      source: ik(12, "He calls on idols and false gods besides Allah that can neither benefit him nor harm him. That is straying far away, and such a helper is an evil friend.", "they can neither benefit him nor harm him"),
      difficulty: 4,
      questions: [
        { q: "What can the false gods do, in 22:12?", a: "Neither harm nor benefit", wrong: ["Give rain", "Give children", "Heal the sick"], why: "He calls besides Allah unto that which can neither harm him nor profit him." },
        { q: "What does 22:12 call worshipping them?", a: "Straying far away", wrong: ["A small slip", "A good idea", "A hidden gift"], why: "That is a straying far away." },
        { q: "Who is the evil Mawla, per Mujahid?", a: "The idols", wrong: ["The angels", "The Prophets", "The parents"], why: "Mujahid said, This means the idols." }
      ]
    },
    {
      slug: "gardens-for-believers",
      title: "Gardens for the believers",
      line: "Believers who do good enter Gardens with flowing rivers.",
      facts: ["Faith in the heart and good deeds", "Allah does what He wills"],
      quote: q22(14),
      source: ik(14, "After the misguided, Allah mentions the righteous: those who believe in their hearts and prove it with good deeds. They will have dwellings in the high ranks of Paradise.", "they will inherit dwellings in the lofty ranks of the gardens of Paradise"),
      difficulty: 4,
      questions: [
        { q: "Whom will Allah admit to Gardens, in 22:14?", a: "Believers who do good deeds", wrong: ["Anyone who is rich", "Only scholars", "Only the old"], why: "Allah will admit those who believe and do righteous good deeds to Gardens." },
        { q: "What flows beneath the Gardens, in 22:14?", a: "Rivers", wrong: ["Lava", "Sand", "Ice"], why: "Gardens underneath which rivers flow." },
        { q: "How do believers confirm faith, per Ibn Kathir?", a: "By their actions", wrong: ["By their wealth", "By their family", "By their clothes"], why: "They believe firmly in their hearts and confirm their faith by their actions." }
      ]
    },
    {
      slug: "clear-ayat",
      title: "Clear ayat",
      line: "Allah sent the Quran down as clear signs for people.",
      facts: ["Clear in words and meaning", "Allah guides whom He wills"],
      quote: q22(16),
      source: ik(16, "Allah sent the Quran down as clear ayat, clear in its words and in its meaning, as proof from Allah to all people. Allah guides whom He wills.", "clear in its wording and its meaning"),
      difficulty: 4,
      questions: [
        { q: "How did Allah send the Quran down, in 22:16?", a: "As clear ayat", wrong: ["As riddles", "As secret codes", "As poems"], why: "Thus have We sent it down as clear Ayat." },
        { q: "In what two ways is it clear, per Ibn Kathir?", a: "Wording and meaning", wrong: ["Paper and ink", "Sound and colour", "Length and size"], why: "Clear in its wording and its meaning." },
        { tf: true, q: "Guidance is in Allah's hands.", why: "And surely, Allah guides whom He wills." }
      ]
    },
    {
      slug: "allah-will-judge",
      title: "Allah will judge between them",
      line: "Allah will judge between all religions on Resurrection Day.",
      facts: ["He judges with justice", "He witnesses every deed"],
      quote: q22(17),
      source: ik(17, "Believers, Jews, Sabians, Christians, Magians and idol worshippers: Allah will judge between them all on the Day of Resurrection with justice, for He witnesses all they do.", "He is a Witness over their deeds"),
      difficulty: 4,
      questions: [
        { q: "When will Allah judge between the groups, in 22:17?", a: "On the Day of Resurrection", wrong: ["Tomorrow", "Never", "In this life only"], why: "Allah will judge between them on the Day of Resurrection." },
        { q: "How will Allah judge, per Ibn Kathir?", a: "With justice", wrong: ["By chance", "By wealth", "By tribe"], why: "Allah will judge between them on the Day of Resurrection with justice." },
        { q: "What is Allah over all things, in 22:17?", a: "A Witness", wrong: ["A stranger", "Unaware", "Far away"], why: "Verily, Allah is over all things a Witness." }
      ]
    },
    {
      slug: "everything-prostrates",
      title: "Everything prostrates to Allah",
      line: "Sun, moon, stars, mountains, trees and animals all bow to Allah.",
      facts: ["Each prostrates in its own way", "Many people prostrate willingly"],
      quote: q22(18),
      source: ik(18, "Everything in the heavens and the earth prostrates to Allah in a way that fits its nature. The sun, moon and stars are named because some worship them, yet they bow to their Creator.", "Everything prostrates to His might"),
      difficulty: 4,
      questions: [
        { q: "Which are named as prostrating, in 22:18?", a: "Sun, moon, stars, mountains, trees", wrong: ["Only the angels", "Only the birds", "Only the sea"], why: "And the sun, and the moon, and the stars, and the mountains, and the trees, and Ad-Dawabb." },
        { q: "Why are sun and moon named, per Ibn Kathir?", a: "Some people worship them", wrong: ["They are the biggest", "They never move", "They are closest"], why: "These are mentioned by name, because they are worshipped instead of Allah." },
        { q: "How does each thing prostrate, per Ibn Kathir?", a: "In a way fitting its nature", wrong: ["Just like people", "Only at night", "Only on Friday"], why: "Everything prostrates in a manner that befits its nature." }
      ]
    },
    {
      slug: "sun-under-the-throne",
      title: "The sun bows under the Throne",
      line: "The sun prostrates beneath the Throne and asks to rise again.",
      facts: ["It waits for Allah's permission", "One day it will rise in the west"],
      quote: q22(18),
      source: hadith("bukhari", "3199", "Abu Dharr", "Sahih", "The Prophet ﷺ asked Abu Dharr at sunset where the sun goes. He said it goes and prostrates beneath the Throne and asks permission to rise again.", "till it prostrates Itself underneath the Throne"),
      difficulty: 5,
      questions: [
        { q: "Where does the sun prostrate, per the hadith?", a: "Beneath the Throne", wrong: ["In the sea", "On a mountain", "In a cave"], why: "It goes till it prostrates itself underneath the Throne." },
        { q: "What does the sun ask for, per the hadith?", a: "Permission to rise again", wrong: ["More light", "A rest day", "A new path"], why: "And takes the permission to rise again." },
        { q: "What did Abu Dharr answer when asked?", a: "Allah and His Messenger ﷺ know", wrong: ["It sinks in the sea", "It goes to sleep", "I do not care"], why: "I replied, Allah and His Apostle know better." }
      ]
    },
    {
      slug: "sajdah-of-recitation",
      title: "A prostration ayah",
      line: "Reciting a sajdah ayah and prostrating makes Shaytan weep.",
      facts: ["22:18 is a place of sajdah", "Adam's children obey; Iblis refused"],
      quote: q22(18),
      source: hadith("muslim", "81", "Abu Hurairah", "Sahih", "The Prophet ﷺ said when a person recites a sajdah ayah and prostrates, Shaytan goes aside weeping, saying the son of Adam was told to prostrate and did, and he was told and refused.", "the son of Adam was commanded to prostrate, and he prostrated"),
      difficulty: 5,
      questions: [
        { q: "What does Shaytan do when we prostrate at a sajdah ayah?", a: "Goes aside weeping", wrong: ["Laughs", "Joins in", "Stays near"], why: "The Satan goes into seclusion and weeps." },
        { q: "Who refused to prostrate, per the hadith?", a: "Shaytan", wrong: ["Adam", "The angels", "The animals"], why: "I was commanded to prostrate, but I refused." },
        { tf: true, q: "Muslims prostrate when reciting 22:18.", why: "It is an ayah of sajdah, mentioning everything prostrating to Allah." }
      ]
    },
    {
      slug: "adornment-of-wudu",
      title: "Shining where wudu reached",
      line: "In Paradise, believers are adorned where their wudu reached.",
      facts: ["Bracelets of gold and pearls", "Garments of silk"],
      quote: q22(23),
      source: hadith("muslim", "250", "Abu Hurairah", "Sahih", "The Prophet ﷺ said the adornment of the believer in Paradise will reach the places that his wudu reached.", "In a believer adornment would reach the places where ablution reaches"),
      difficulty: 5,
      questions: [
        { q: "What adorns believers in Paradise, in 22:23?", a: "Bracelets of gold and pearls", wrong: ["Iron chains", "Crowns of wood", "Rings of clay"], why: "Wherein they will be adorned with bracelets of gold and pearls." },
        { q: "How far does the adornment reach, per the hadith?", a: "As far as wudu reached", wrong: ["Only the head", "Only the feet", "Nowhere"], why: "In a believer adornment would reach the places where ablution reaches." },
        { q: "What will their garments be, in 22:23?", a: "Silk", wrong: ["Wool", "Cotton", "Leather"], why: "And their garments therein will be of silk." }
      ]
    },
    {
      slug: "guided-to-good-speech",
      title: "Guided to good words",
      line: "In Paradise believers hear only good words like Salam.",
      facts: ["Their greeting is peace", "They praise their Lord"],
      quote: q22(24),
      source: ik(24, "The people of Paradise are guided to good speech: greetings of peace and words of respect. They are guided to the path of the One worthy of all praise, and praise Him for His blessings.", "They will be guided to a place in which they will hear good speech"),
      difficulty: 5,
      questions: [
        { q: "To what are they guided, in 22:24?", a: "Goodly speech", wrong: ["Loud arguing", "Silly talk", "Silence forever"], why: "And they are guided unto goodly speech." },
        { q: "What greeting is heard in Paradise, per Ibn Kathir?", a: "Salam, peace", wrong: ["Go away", "Who are you?", "Hurry up"], why: "Their greeting therein will be: Salam." },
        { q: "Whose path are they guided to, in 22:24?", a: "The One Worthy of all praise", wrong: ["A king's", "A merchant's", "A poet's"], why: "And they are guided to the path of Him, Who is Worthy of all praises." }
      ]
    }
  ]
};

/** Ayahs 25 to 41: the Sacred Mosque open to all, Ibrahim's call to Hajj, the ten days, sacrifice that reaches Allah as taqwa, and Allah defending the believers. */
const HAJJ_TWO: DeepUnit = {
  key: "hajj2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-22",
  name: "Al-Hajj, ayahs 25 to 41",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Hajj",
  lessons: [
    {
      slug: "masjid-open-to-all",
      title: "A Masjid open to all",
      line: "Allah made Al-Masjid Al-Haram equal for locals and visitors.",
      facts: ["Some blocked believers from it", "Allah warns those who intend wrong there"],
      quote: q22(25),
      source: ik(25, "Allah blames those who blocked the believers from Al-Masjid Al-Haram. He made it open to all people: the one who lives there and the visitor from far away are equal in it.", "which Allah has made equally accessible to all"),
      difficulty: 2,
      questions: [
        { q: "Who are equal in Al-Masjid Al-Haram, in 22:25?", a: "The local and the visitor", wrong: ["Only the rich", "Only Quraysh", "Only the old"], why: "The dweller in it and the visitor from the country are equal there." },
        { q: "What did the disbelievers do, in 22:25?", a: "Blocked people from it", wrong: ["Built it", "Cleaned it", "Guarded it well"], why: "Those who disbelieved and hinder men from the path of Allah, and from Al-Masjid Al-Haram." },
        { tf: true, q: "Even intending wrong in the Haram is warned against.", why: "Whoever inclines to evil actions therein or to do wrong, him We shall cause to taste a painful torment." }
      ]
    },
    {
      slug: "site-of-the-house",
      title: "Ibrahim shown the House",
      line: "Allah showed Ibrahim where to build the House and purify it.",
      facts: ["Built on Tawhid from the start", "Purified for tawaf and prayer"],
      quote: q22(26),
      source: ik(26, "Allah showed Ibrahim the place of the House, guided him to it and allowed him to build it. He told him: associate nothing with Me, and purify My House for those who pray there.", "He guided him to it, entrusted it to him and granted him permission to build it"),
      difficulty: 2,
      questions: [
        { q: "What did Allah show Ibrahim, in 22:26?", a: "The site of the House", wrong: ["A hidden treasure", "A new river", "A far city"], why: "And remember when We showed Ibrahim the site of the House." },
        { q: "What was Ibrahim told first, in 22:26?", a: "Associate nothing with Me", wrong: ["Build it tall", "Paint it gold", "Charge a fee"], why: "Associate not anything with Me." },
        { q: "What does purify My House mean, per Qatadah?", a: "Purify it from shirk", wrong: ["Wash it daily", "Lock its doors", "Paint it white"], why: "Qatadah and Mujahid said: And purify it from Shirk." }
      ]
    },
    {
      slug: "first-masjid-on-earth",
      title: "The first Masjid on earth",
      line: "Al-Masjid Al-Haram was the first masjid built on earth.",
      facts: ["Al-Aqsa came next", "Forty years between them"],
      quote: q22(26),
      source: hadith("bukhari", "3366", "Abu Dharr", "Sahih", "Abu Dharr asked the Prophet ﷺ which masjid was built first. He said Al-Masjid Al-Haram, then Al-Aqsa, with forty years between them.", "Which mosque was first built on the surface of the earth"),
      difficulty: 3,
      questions: [
        { q: "Which masjid was built first, per the hadith?", a: "Al-Masjid Al-Haram", wrong: ["Al-Aqsa", "Masjid Quba", "Masjid An-Nabawi"], why: "He said, Al-Masjid-ul-Haram." },
        { q: "Which masjid came second, per the hadith?", a: "Al-Aqsa", wrong: ["Masjid Quba", "Masjid An-Nabawi", "Masjid Al-Qiblatayn"], why: "Which was built next? He replied, The mosque of Al-Aqsa." },
        { q: "How long was between them, per the hadith?", a: "Forty years", wrong: ["Four years", "Four hundred years", "Forty days"], why: "What was the period between the two? He said, Forty years." }
      ]
    },
    {
      slug: "tawaf-and-prayer",
      title: "For tawaf and prayer",
      line: "The House is purified for those who circle it and pray.",
      facts: ["Tawaf is only around the Ka'bah", "We pray facing it"],
      quote: q22(26),
      source: ik(26, "The House is kept pure for those who circle it, stand, bow and prostrate. Tawaf and prayer are named together because tawaf is done only around the Ka'bah and prayer faces it.", "Tawaf and prayer are mentioned together"),
      difficulty: 3,
      questions: [
        { q: "For whom is the House purified, in 22:26?", a: "Those who circle, stand, bow, prostrate", wrong: ["Traders", "Tourists only", "Kings"], why: "Sanctify My House for those who circumambulate it, and those who stand up, and those who bow and make prostration." },
        { tf: true, q: "Tawaf is done only around the Ka'bah.", why: "This is an act of worship that is done only at the Ka'bah and not at any other spot on earth." },
        { q: "Why are tawaf and prayer named together, per Ibn Kathir?", a: "Both are tied to the House", wrong: ["Both are at night", "Both are short", "Both need water"], why: "Tawaf is done around the Ka'bah and prayer is offered facing its direction." }
      ]
    },
    {
      slug: "proclaim-the-hajj",
      title: "Proclaim the Hajj",
      line: "Allah told Ibrahim to call people to Hajj from every land.",
      facts: ["People come on foot and on camels", "From every deep, far path"],
      quote: q22(27),
      source: ik(27, "Allah told Ibrahim to call mankind to Hajj. Ibrahim asked how his voice could reach them; he was told to call, and Allah would carry it. People still come from every far place.", "Call them and We will convey it"),
      difficulty: 3,
      questions: [
        { q: "What was Ibrahim told to proclaim, in 22:27?", a: "The Hajj", wrong: ["A war", "A market", "A new king"], why: "And proclaim to mankind the Hajj." },
        { q: "How will people come, in 22:27?", a: "On foot and lean camels", wrong: ["Only by ship", "Only riding horses", "They will not come"], why: "They will come to you on foot and on every lean camel." },
        { q: "What was Ibrahim told when he worried his voice was weak?", a: "Call, and Allah conveys it", wrong: ["Shout louder", "Write letters", "Stay silent"], why: "Call them and We will convey it." }
      ]
    },
    {
      slug: "benefits-of-hajj",
      title: "Benefits of Hajj",
      line: "Hajj brings benefits in this world and in the Hereafter.",
      facts: ["Allah's pleasure in the Hereafter", "Trade is allowed during Hajj"],
      quote: q22(28),
      source: ik(28, "Pilgrims witness benefits for them. Ibn Abbas said these are benefits in this world and the Hereafter: Allah's pleasure, and worldly goods such as trade and sacrificial animals.", "Benefits in this world and in the Hereafter"),
      difficulty: 3,
      questions: [
        { q: "What do pilgrims witness, in 22:28?", a: "Things of benefit to them", wrong: ["Only hardship", "Nothing new", "Only crowds"], why: "That they may witness things that are of benefit to them." },
        { q: "Where are the benefits, per Ibn Abbas?", a: "In this world and the Hereafter", wrong: ["Only in this world", "Only in the Hereafter", "Nowhere"], why: "Benefits in this world and in the Hereafter." },
        { q: "Whom should they feed, in 22:28?", a: "The poor in hardship", wrong: ["Only the rich", "Only family", "No one"], why: "Then eat thereof and feed therewith the poor having a hard time." }
      ]
    },
    {
      slug: "best-ten-days",
      title: "The best ten days",
      line: "Good deeds in the first ten days of Dhul-Hijjah are best.",
      facts: ["The appointed days are the ten days", "Say takbir, tahlil and tahmid"],
      quote: q22(28),
      source: hadith("bukhari", "969", "Ibn Abbas", "Sahih", "The Prophet ﷺ said no good deeds done on other days are better than those done in the first ten days of Dhul-Hijjah.", "No good deeds done on other days are superior to those done on these"),
      difficulty: 4,
      questions: [
        { q: "Which days are best for good deeds, per the hadith?", a: "First ten of Dhul-Hijjah", wrong: ["Last ten of Shawwal", "First ten of Rajab", "Any ten days"], why: "No good deeds done on other days are superior to those done on these first ten days of Dhul Hijja." },
        { q: "What are the appointed days, per Ibn Abbas?", a: "The ten days of Dhul-Hijjah", wrong: ["The days of Ramadan", "Every Friday", "The days of Shawwal"], why: "The appointed days are the ten days of Dhul-Hijjah." },
        { tf: true, q: "Ibn Umar and Abu Hurayrah said takbir in the market in these days.", why: "Ibn Umar and Abu Hurayrah used to go out in the marketplace during the ten days and say Takbir." }
      ]
    },
    {
      slug: "fast-of-arafah",
      title: "The fast of Arafah",
      line: "Fasting the day of Arafah wipes out sins of two years.",
      facts: ["Arafah is in the ten days", "For those not on Hajj"],
      quote: q22(28),
      source: hadith("muslim", "1162", "Abu Qatadah", "Sahih", "The Prophet ﷺ was asked about fasting the day of Arafah and said it expiates the sins of the year before and the year after.", "It expiates the sins of the preceding year and the coming year"),
      difficulty: 4,
      questions: [
        { q: "What does fasting Arafah expiate, per the hadith?", a: "Sins of two years", wrong: ["Sins of one day", "Nothing", "Sins of ten years"], why: "It expiates the sins of the preceding year and the coming year." },
        { q: "Which day is Arafah?", a: "The 9th of Dhul-Hijjah", wrong: ["The 1st of Ramadan", "The 10th of Muharram", "The 27th of Rajab"], why: "Fasting on the day of Arafa, the 9th of Dhu'l-Hijja." },
        { tf: true, q: "Arafah is one of the ten best days.", why: "These ten days include the day of Arafah." }
      ]
    },
    {
      slug: "honor-sacred-things",
      title: "Honoring Allah's sacred things",
      line: "Whoever honors what Allah made sacred, it is better for him.",
      facts: ["Avoiding sin earns reward too", "Treat sin as a serious matter"],
      quote: q22(30),
      source: ik(30, "Whoever honors the sacred things of Allah, avoids disobeying Him and sees sin as a serious matter, that is better for him with his Lord. Avoiding sin earns great reward, like doing good does.", "regards committing sin as a very serious matter"),
      difficulty: 4,
      questions: [
        { q: "What is better for whoever honors Allah's sacred things, in 22:30?", a: "It is better with his Lord", wrong: ["It makes him rich", "It changes nothing", "It is a burden"], why: "Whoever honors the sacred things of Allah, then that is better for him with his Lord." },
        { tf: true, q: "Avoiding sin also earns a great reward.", why: "The one who avoids sin will earn a great reward." },
        { q: "How does such a person see sin, per Ibn Kathir?", a: "As a very serious matter", wrong: ["As a small thing", "As a joke", "As normal"], why: "And regards committing sin as a very serious matter." }
      ]
    },
    {
      slug: "shun-idols-false-speech",
      title: "Shun idols and lies",
      line: "Allah joins shirk and false speech: avoid them both.",
      facts: ["False witness is a great sin", "Be devoted to Allah alone"],
      quote: q22(30),
      source: hadith("bukhari", "2654", "Abu Bakrah", "Sahih", "The Prophet ﷺ named the greatest sins: shirk with Allah and being undutiful to parents. Then he sat up and warned against false witness again and again.", "And I warn you against giving a false witness"),
      difficulty: 4,
      questions: [
        { q: "What two things should we shun, in 22:30?", a: "Idols and false speech", wrong: ["Trade and travel", "Food and sleep", "Poems and songs"], why: "So shun the Rijs of the idols, and shun false speech." },
        { q: "What did the Prophet ﷺ keep warning against?", a: "Giving false witness", wrong: ["Eating too much", "Sleeping late", "Walking fast"], why: "And I warn you against giving a false witness, and he kept on saying that warning." },
        { q: "Which sins came first in the hadith?", a: "Shirk and bad treatment of parents", wrong: ["Lying and stealing", "Pride and anger", "Envy and gossip"], why: "To join others in worship with Allah and to be undutiful to one's parents." }
      ]
    },
    {
      slug: "taqwa-of-hearts",
      title: "Taqwa of the hearts",
      line: "Honoring Allah's symbols comes from taqwa in the heart.",
      facts: ["Choose a healthy animal for sacrifice", "The heart shows in the deed"],
      quote: q22(32),
      source: ik(32, "Whoever honors the symbols of Allah, it comes from the taqwa of the hearts. Ibn Abbas said honoring them includes choosing healthy, well-fed animals for sacrifice.", "Honoring them means choosing fat, healthy animals"),
      difficulty: 4,
      questions: [
        { q: "Where does honoring Allah's symbols come from, in 22:32?", a: "Taqwa of the hearts", wrong: ["Love of praise", "Fear of people", "Habit only"], why: "Whosoever honors the Sha'a'ir of Allah, then it is truly from the Taqwa of the hearts." },
        { q: "What does honoring the sacrifice mean, per Ibn Abbas?", a: "Choosing healthy animals", wrong: ["Choosing the cheapest", "Choosing sick ones", "Not caring"], why: "Honoring them means choosing fat, healthy animals for sacrifice." },
        { q: "What are the Sha'a'ir of Allah, per Ibn Kathir?", a: "His commands and symbols", wrong: ["Old poems", "Tribal flags", "Market rules"], why: "Whosoever honors the Sha'a'ir of Allah means, His commands." }
      ]
    },
    {
      slug: "the-best-for-allah",
      title: "The best for Allah",
      line: "Honoring Allah's symbols means giving the best you can.",
      facts: ["As-Sa'di explains", "Sha'a'ir"],
      quote: q22(32),
      source: saadi(22, 32, "As-Sa'di says Allah's symbols are the clear signs of the religion, such as all the rites of Hajj and the sacrificed animals; honoring a sacrifice means choosing a good, healthy, complete one, and honoring them shows taqwa, because it follows honoring Allah Himself.", "فتعظيمها باستحسانها واستسمانها"),
      difficulty: 2,
      questions: [
        { q: "How is a sacrifice animal honored, per as-Sa'di on 22:32?", a: "By choosing a good, healthy one", wrong: ["By choosing the cheapest", "By painting it", "By keeping it"], why: "Honor it by picking a fine, healthy, complete animal." },
        { q: "What are Allah's symbols, per as-Sa'di on 22:32?", a: "The clear signs of the religion", wrong: ["Old flags", "Any custom", "Shapes in the sky"], why: "They are the visible marks of the religion, like the rites of Hajj." },
        { tf: true, q: "Honoring Allah's symbols follows from honoring Allah Himself.", why: "As-Sa'di on 22:32." }
      ]
    },
    {
      slug: "rites-for-every-nation",
      title: "Rites for every nation",
      line: "Every nation was given rites to remember Allah's Name.",
      facts: ["Your God is One God", "Submit to Him alone"],
      quote: q22(34),
      source: ik(34, "Allah gave every nation rites in which they mention His Name. Your God is One God, even if the laws of the Prophets differed; all of them called people to worship Allah alone.", "All of the Prophets called mankind to worship Allah Alone"),
      difficulty: 4,
      questions: [
        { q: "Why were rites given to every nation, in 22:34?", a: "To mention Allah's Name", wrong: ["To gather wealth", "To win wars", "To build towers"], why: "That they may mention the Name of Allah over the beast of cattle that He has given them." },
        { q: "What does 22:34 say about our God?", a: "He is One God", wrong: ["Each nation has one", "He has helpers", "He is far"], why: "And your God is One God, so you must submit to Him Alone." },
        { tf: true, q: "All the Prophets called to worship Allah alone.", why: "All of the Prophets called mankind to worship Allah Alone with no partner or associate." }
      ]
    },
    {
      slug: "the-humble-ones",
      title: "Glad tidings for the humble",
      line: "Good news for the humble who fear Allah, are patient and pray.",
      facts: ["Their hearts tremble at Allah's Name", "They spend from what Allah gave"],
      quote: q22(35),
      source: ik(35, "Give glad tidings to the humble: their hearts fear Allah when He is mentioned, they are patient in hardship, they pray, and they spend on family, the poor and the needy.", "Those who find contentment in their faith"),
      difficulty: 5,
      questions: [
        { q: "What happens to their hearts, in 22:35?", a: "They fear when Allah is named", wrong: ["They grow hard", "They forget", "They feel proud"], why: "Whose hearts are filled with fear when Allah is mentioned." },
        { q: "Who are the Mukhbitin, per Mujahid?", a: "Content in their faith", wrong: ["Rich traders", "Strong fighters", "Famous poets"], why: "Mujahid said: Those who find contentment in their faith." },
        { q: "Which is NOT named in 22:35?", a: "Building palaces", wrong: ["Being patient", "Performing Salah", "Spending in charity"], why: "The patient who bear whatever may befall them, who perform the Salah, and who spend." }
      ]
    },
    {
      slug: "taqwa-reaches-allah",
      title: "Only taqwa reaches Allah",
      line: "Not the meat or blood reaches Allah, only our taqwa.",
      facts: ["Allah needs nothing from us", "He looks at hearts and deeds"],
      quote: q22(37),
      source: ik(37, "Neither the meat nor the blood of the sacrifice reaches Allah, for He needs nothing. What reaches Him is the taqwa and sincerity of His servant.", "Nothing of its flesh or blood reaches Him"),
      difficulty: 5,
      questions: [
        { q: "What reaches Allah from the sacrifice, in 22:37?", a: "Our taqwa", wrong: ["The meat", "The blood", "The price"], why: "It is neither their meat nor their blood that reaches Allah, but it is Taqwa from you that reaches Him." },
        { q: "Why does no meat reach Him, per Ibn Kathir?", a: "He needs nothing", wrong: ["It is too far", "It is not enough", "He refuses gifts"], why: "Nothing of its flesh or blood reaches Him, for He has no need of anything." },
        { q: "Whom should we give glad tidings, in 22:37?", a: "The doers of good", wrong: ["The richest", "The loudest", "The strongest"], why: "And give glad tidings to the doers of good." }
      ]
    },
    {
      slug: "allah-looks-at-hearts",
      title: "Allah looks at hearts",
      line: "Allah does not look at faces or bodies, but at our hearts.",
      facts: ["Taqwa is in the heart", "Deeds show what is inside"],
      quote: q22(37),
      source: hadith("muslim", "2564", "Abu Hurairah", "Sahih", "The Prophet ﷺ said Allah does not look at your bodies or your faces, but He looks at your hearts, and he pointed to his chest.", "Verily Allah does not look to your bodies nor to your faces but He looks to your hearts"),
      difficulty: 5,
      questions: [
        { q: "What does Allah look at, per the hadith?", a: "Our hearts", wrong: ["Our faces", "Our clothes", "Our money"], why: "Allah does not look to your bodies nor to your faces but He looks to your hearts." },
        { q: "Where did the Prophet ﷺ point when speaking of piety?", a: "To his chest", wrong: ["To the sky", "To the Ka'bah", "To his hand"], why: "The piety is here, and while saying so he pointed towards his chest thrice." },
        { tf: false, q: "Allah judges us by how we look.", why: "He looks to your hearts, not your bodies or faces." }
      ]
    },
    {
      slug: "allah-defends-believers",
      title: "Allah defends the believers",
      line: "Allah defends those who believe and trust in Him.",
      facts: ["He protects them from evil plots", "He dislikes the treacherous ingrate"],
      quote: q22(38),
      source: ik(38, "Allah defends His servants who trust Him and turn to Him. He guards them from evil people and plots. He does not like those who break promises and deny His blessings.", "He defends His servants who put their trust in Him"),
      difficulty: 5,
      questions: [
        { q: "Whom does Allah defend, in 22:38?", a: "Those who believe", wrong: ["The strongest", "The wealthiest", "Everyone equally"], why: "Truly, Allah defends those who believe." },
        { q: "Whom does Allah not like, in 22:38?", a: "The treacherous ingrate", wrong: ["The poor", "The weak", "The quiet"], why: "Verily, Allah likes not any treacherous ingrate." },
        { q: "What is ingratitude, per Ibn Kathir?", a: "Denying Allah's blessings", wrong: ["Being poor", "Being tired", "Asking questions"], why: "Ingratitude is to deny the blessings, whereby one does not acknowledge or appreciate them." }
      ]
    },
    {
      slug: "our-lord-is-allah",
      title: "Only for saying Our Lord is Allah",
      line: "Believers were driven out for saying: Our Lord is Allah.",
      facts: ["The Muslims left Makkah", "Allah helps those who help His cause"],
      quote: q22(40),
      source: ik(40, "The believers were driven out of their homes unjustly, only because they said: Our Lord is Allah. Allah protects places where His Name is mentioned much, and He helps those who help His cause.", "when they were expelled from Makkah"),
      difficulty: 5,
      questions: [
        { q: "Why were they driven out, in 22:40?", a: "For saying Our Lord is Allah", wrong: ["For stealing", "For lying", "For no reason given"], why: "Expelled from their homes unjustly only because they said: Our Lord is Allah." },
        { q: "Whom will Allah help, in 22:40?", a: "Those who help His cause", wrong: ["Those who are proud", "Those who are rich", "No one"], why: "Verily, Allah will help those who help His cause." },
        { q: "Which are named as places of Allah's Name, in 22:40?", a: "Monasteries, churches, synagogues, masjids", wrong: ["Markets and castles", "Only palaces", "Only tents"], why: "Sawami', Biya', Salawat, and Masjids, wherein the Name of Allah is mentioned much." }
      ]
    },
    {
      slug: "if-given-power",
      title: "If given power",
      line: "When given power, believers pray, give zakah and enjoin good.",
      facts: ["Uthman said it was about them", "Everyone shares the duty"],
      quote: q22(41),
      source: ik(41, "If Allah gives them power, they establish prayer, give zakah, enjoin good and forbid evil. Umar ibn Abdul-Aziz said this is not only for rulers; it applies to everyone.", "This is not obligatory only for those who are in authority"),
      difficulty: 5,
      questions: [
        { q: "What do believers do when given power, in 22:41?", a: "Pray, give zakah, enjoin good", wrong: ["Build castles", "Collect taxes", "Rest"], why: "Establish the Salah, enforce the Zakah, and they enjoin the good and forbid the evil." },
        { q: "Is the duty only for rulers, per Umar ibn Abdul-Aziz?", a: "No, everyone shares it", wrong: ["Yes, only rulers", "Only scholars", "Only judges"], why: "This is not obligatory only for those who are in authority, it also applies to those who are governed." },
        { q: "With whom rests the end of all matters, in 22:41?", a: "With Allah", wrong: ["With the kings", "With the people", "With fate alone"], why: "And with Allah rests the end of all matters." }
      ]
    }
  ]
};

/** Ayahs 42 to 78: hearts that see, a day like a thousand years, signs in rain and night, a fly no idol can create, and a religion with no hardship. */
const HAJJ_THREE: DeepUnit = {
  key: "hajj3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-22",
  name: "Al-Hajj, ayahs 42 to 78",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Hajj",
  lessons: [
    {
      slug: "denied-before-you",
      title: "They denied before you too",
      line: "Allah comforts the Prophet ﷺ: earlier nations denied too.",
      facts: ["Nuh, Ad, Thamud, Ibrahim, Lut, Madyan", "Musa was denied as well"],
      quote: q22(42),
      source: ik(42, "Allah comforts His Prophet ﷺ: the peoples of Nuh, Ad, Thamud, Ibrahim, Lut and Madyan denied their Messengers before, and Musa was denied too, despite clear signs.", "the disbelief of those among his people who opposed him"),
      difficulty: 2,
      questions: [
        { q: "Why does Allah list earlier nations, in 22:42?", a: "To comfort the Prophet ﷺ", wrong: ["To praise them", "To scare children", "To teach history only"], why: "Here Allah consoles His Prophet Muhammad ﷺ for the disbelief of those who opposed him." },
        { q: "Which Prophet's people is named first, in 22:42?", a: "Nuh", wrong: ["Musa", "Isa", "Yusuf"], why: "So did deny before them the people of Nuh, Ad and Thamud." },
        { tf: true, q: "Musa was also denied, per 22:44.", why: "And the dwellers of Madyan; and denied was Musa." }
      ]
    },
    {
      slug: "respite-then-seized",
      title: "Respite, not forgetting",
      line: "Allah gives wrongdoers time, but He does not forget them.",
      facts: ["Delay is a chance to repent", "Allah's grip is certain"],
      quote: q22(44),
      source: hadith("bukhari", "4686", "Abu Musa", "Sahih", "The Prophet ﷺ said Allah gives respite to the wrongdoer, but when He takes him, He does not let him go.", "Allah gives respite to the oppressor"),
      difficulty: 2,
      questions: [
        { q: "What does Allah give the wrongdoer first, per the hadith?", a: "Respite", wrong: ["Wealth only", "Nothing", "Punishment at once"], why: "Allah gives respite to the oppressor." },
        { tf: false, q: "A delay means Allah has forgotten.", why: "When He takes him over, He never releases him." },
        { q: "What does I granted respite mean, per Ibn Kathir?", a: "I delayed and postponed", wrong: ["I forgave all", "I forgot", "I rewarded"], why: "But I granted respite to the disbelievers for a while means, I delayed and postponed." }
      ]
    },
    {
      slug: "hearts-that-see",
      title: "Hearts that see",
      line: "True blindness is not in the eyes but in the heart.",
      facts: ["Travel and learn from ruins", "Insight lives in the heart"],
      quote: q22(46),
      source: ik(46, "Have they not travelled and seen what happened to past nations? The real blind person is not the one whose eyes cannot see, but the one with no insight, who cannot learn the lesson.", "the blind person is not the one whose eyes cannot see, but rather the one who has no insight"),
      difficulty: 3,
      questions: [
        { q: "What grows blind, in 22:46?", a: "The hearts in the breasts", wrong: ["Only the eyes", "The ears", "The hands"], why: "It is not the eyes that grow blind, but it is the hearts which are in the breasts that grow blind." },
        { q: "Who is truly blind, per Ibn Kathir?", a: "One with no insight", wrong: ["One who wears glasses", "One who is old", "One who sleeps"], why: "The blind person is not the one whose eyes cannot see, but rather the one who has no insight." },
        { q: "What does 22:46 urge people to do?", a: "Travel and reflect", wrong: ["Stay home", "Build towers", "Sleep more"], why: "Have they not traveled through the land, and have they hearts wherewith to understand?" }
      ]
    },
    {
      slug: "travel-that-teaches",
      title: "Travel that teaches",
      line: "Seeing the world helps only if the heart reflects on it.",
      facts: ["As-Sa'di explains", "Reflection"],
      quote: q22(46),
      source: saadi(22, 46, "As-Sa'di says Allah calls people to travel with body and heart, to learn from the signs and the ruined nations; mere looking, hearing and walking without thought and reflection does no good, and the blindness that harms is blindness of the heart to the truth.", "وسير البدن الخالي من التفكر والاعتبار"),
      difficulty: 2,
      questions: [
        { q: "What makes travel useful, per as-Sa'di on 22:46?", a: "Reflecting with the heart", wrong: ["Taking photos", "Going far", "Spending a lot"], why: "Walking and looking without reflection does no good." },
        { q: "Which blindness harms the religion, per as-Sa'di?", a: "Blindness of the heart", wrong: ["Blindness of the eyes", "Night blindness", "Color blindness"], why: "It is the heart's blindness to the truth that harms." },
        { tf: true, q: "Allah calls people to travel and learn from past nations.", why: "As-Sa'di on 22:46." }
      ]
    },
    {
      slug: "day-like-thousand-years",
      title: "A day like a thousand years",
      line: "A day with Allah is like a thousand years we count.",
      facts: ["Allah never breaks His promise", "He is never in a hurry"],
      quote: q22(47),
      source: ik(47, "They ask to hurry the punishment, but Allah never fails His promise. A day with your Lord is like a thousand of our years, so He does not rush, and nothing escapes Him.", "what is counted as a thousand years with His creation is as one day with Him"),
      difficulty: 3,
      questions: [
        { q: "How long is a day with your Lord, in 22:47?", a: "Like a thousand years", wrong: ["Like one hour", "Like ten years", "Like a week"], why: "And verily a day with your Lord is as a thousand years of what you reckon." },
        { tf: true, q: "Allah never fails His promise.", why: "And Allah fails not His promise." },
        { q: "What did the deniers ask for, in 22:47?", a: "To hurry the torment", wrong: ["More rain", "A new Prophet", "More time"], why: "And they ask you to hasten on the torment!" }
      ]
    },
    {
      slug: "plain-warner-noble-provision",
      title: "A plain warner",
      line: "The Prophet ﷺ is a plain warner; believers get forgiveness.",
      facts: ["Forgiveness for past sins", "Noble provision means Paradise"],
      quote: q22(50),
      source: ik(50, "The Prophet ﷺ was sent as a clear warner. Those who believe and do good get forgiveness for past sins and a great reward for few good deeds; noble provision means Paradise.", "forgiveness for their previous bad deeds, and a great reward in return for a few good deeds"),
      difficulty: 3,
      questions: [
        { q: "What was the Prophet ﷺ told to say, in 22:49?", a: "I am only a plain warner", wrong: ["I am a king", "I am a poet", "I am an angel"], why: "Say: O mankind! I am sent to you only as a plain warner." },
        { q: "What do believers who do good get, in 22:50?", a: "Forgiveness and noble provision", wrong: ["Only fame", "Only gold", "Nothing yet"], why: "For them is forgiveness and Rizq Karim." },
        { q: "What is Rizq Karim, per Al-Qurazi?", a: "Paradise", wrong: ["A big farm", "A palace on earth", "A trade profit"], why: "When you hear Allah's saying Rizq Karim, this means Paradise." }
      ]
    },
    {
      slug: "reward-of-emigrants",
      title: "Reward of the emigrants",
      line: "Those who leave home for Allah get a provision they love.",
      facts: ["They left family and land for Allah", "An entrance that pleases them"],
      quote: q22(58),
      source: ik(58, "Those who leave their homes, families and lands for Allah, then die, will be given a good provision by Allah in Paradise and an entrance they will be pleased with.", "He will reward them from His bounty and provision in Paradise"),
      difficulty: 3,
      questions: [
        { q: "What will Allah give the emigrants, in 22:58?", a: "A good provision", wrong: ["A small reward", "Nothing", "Only praise"], why: "Surely, Allah will provide a good provision for them." },
        { q: "Who is the Best of providers, in 22:58?", a: "Allah", wrong: ["The kings", "The merchants", "The tribes"], why: "And verily, it is Allah Who indeed is the Best of those who make provision." },
        { q: "How will they feel about their entrance, in 22:59?", a: "Well-pleased", wrong: ["Worried", "Unsure", "Sad"], why: "He will make them enter an entrance with which they shall be well-pleased." }
      ]
    },
    {
      slug: "night-into-day",
      title: "Night into day",
      line: "Allah merges night into day and day into night.",
      facts: ["Long nights in winter", "Long days in summer"],
      quote: q22(61),
      source: ik(61, "Allah makes the night enter the day and the day enter the night: in winter the nights are long, in summer the days are long. He hears and sees everything.", "Sometimes the night is long and the day is short, as in winter"),
      difficulty: 3,
      questions: [
        { q: "What does Allah merge, in 22:61?", a: "Night into day and day into night", wrong: ["Sea into land", "Sun into moon", "Rain into snow"], why: "Allah merges the night into the day, and He merges the day into the night." },
        { q: "When are nights long, per Ibn Kathir?", a: "In winter", wrong: ["In summer", "In spring", "Never"], why: "Sometimes the night is long and the day is short, as in winter." },
        { q: "Which two Names end 22:61?", a: "All-Hearer, All-Seer", wrong: ["All-Rich, All-Praised", "Most High, Most Great", "Oft-Forgiving, Most Kind"], why: "And verily, Allah is All-Hearer, All-Seer." }
      ]
    },
    {
      slug: "allah-is-the-truth",
      title: "Allah is the Truth",
      line: "Allah is the Truth; all else that people call on is false.",
      facts: ["Only He deserves worship", "He is the Most High, Most Great"],
      quote: q22(62),
      source: ik(62, "Allah is the true God; none besides Him deserves worship. Whatever is worshipped instead of Him is false, because it can neither benefit nor harm. He is the Most High, the Most Great.", "the true God, besides Whom no one deserves worship"),
      difficulty: 4,
      questions: [
        { q: "What does 22:62 call Allah?", a: "The Truth", wrong: ["A legend", "One of many", "Far away"], why: "That is because Allah, He is the Truth." },
        { q: "What does 22:62 call what they invoke besides Him?", a: "False", wrong: ["Helpful", "Holy", "Strong"], why: "And what they invoke besides Him, it is false." },
        { q: "Why are false gods false, per Ibn Kathir?", a: "They neither benefit nor harm", wrong: ["They are too old", "They are too small", "They are far"], why: "Everything worshipped instead of Him is false, because it can neither bring benefit nor cause harm." }
      ]
    },
    {
      slug: "earth-turns-green",
      title: "The earth turns green",
      line: "Rain falls and the earth turns green by Allah's kindness.",
      facts: ["He knows every hidden seed", "He is the Most Kind, Well-Aware"],
      quote: q22(63),
      source: ik(63, "Allah sends rain on dry land and it turns green. He knows every seed in every corner of the earth, however small, and each gets its share of water and grows.", "He knows what seeds are in the various regions of the earth"),
      difficulty: 4,
      questions: [
        { q: "What happens to the earth after rain, in 22:63?", a: "It becomes green", wrong: ["It turns red", "It cracks", "It stays dry"], why: "Allah sends down water from the sky, and then the earth becomes green." },
        { q: "What does Allah know, per Ibn Kathir?", a: "Every seed in the earth", wrong: ["Only big trees", "Only crops", "Only rivers"], why: "He knows what seeds are in the various regions of the earth, no matter how small they are." },
        { q: "Which Names end 22:63?", a: "Most Kind, Well-Acquainted", wrong: ["All-Strong, All-Mighty", "Most High, Most Great", "First and Last"], why: "Verily, Allah is the Most Kind and Courteous, Well-Acquainted with all things." }
      ]
    },
    {
      slug: "ships-and-the-sky",
      title: "Ships and the sky held up",
      line: "Allah made ships sail for us and holds the sky from falling.",
      facts: ["Everything on earth serves us", "He is Kind and Merciful to people"],
      quote: q22(65),
      source: ik(65, "Allah made all on earth of use to us: animals, crops and fruits. Ships sail by His command through rough seas, and by His kindness He holds the sky from falling on the earth.", "by His kindness, mercy and power, He withholds the heaven from falling on the earth"),
      difficulty: 4,
      questions: [
        { q: "What sails by Allah's command, in 22:65?", a: "The ships", wrong: ["The clouds", "The mountains", "The castles"], why: "And the ships that sail through the sea by His command." },
        { q: "What does Allah hold back, in 22:65?", a: "The sky from falling", wrong: ["The sun from rising", "The rain forever", "The wind"], why: "He withholds the heaven from falling on the earth except by His leave." },
        { tf: true, q: "Allah is kind to people even when they do wrong.", why: "Allah is for mankind full of kindness, Most Merciful, meaning, even though they do wrong." }
      ]
    },
    {
      slug: "life-death-life",
      title: "Life, death, then life",
      line: "Allah gave us life, will cause us to die, then raise us.",
      facts: ["From nothing to life", "Raised on the Day of Resurrection"],
      quote: q22(66),
      source: ik(66, "Allah gave you life after you were nothing, then will cause you to die, then give you life again on the Day of Resurrection. Yet man is so often ungrateful.", "He gave you life after you were nothing, and brought you into existence"),
      difficulty: 4,
      questions: [
        { q: "What order does 22:66 give?", a: "Life, death, then life again", wrong: ["Death, then nothing", "Life forever here", "Life, then nothing"], why: "It is He, Who gave you life, and then will cause you to die, and will again give you life." },
        { q: "When is the second life, per Ibn Kathir?", a: "The Day of Resurrection", wrong: ["Next spring", "In a dream", "In old age"], why: "And will again give you life means, on the Day of Resurrection." },
        { q: "What does Kafur mean in 22:66, per Ibn Kathir?", a: "Denying", wrong: ["Grateful", "Brave", "Quiet"], why: "Verily, man is indeed Kafurun, meaning, denying." }
      ]
    },
    {
      slug: "invite-to-your-lord",
      title: "Invite them to your Lord",
      line: "Don't let arguments stop you; keep inviting to your Lord.",
      facts: ["You are on straight guidance", "Allah will judge the differences"],
      quote: q22(67),
      source: ik(67, "Every nation was given rites. Do not let their arguing turn you from the truth; keep inviting to your Lord, for you are on a clear, straight path. Allah will judge between you.", "a clear and straight path which will lead you to the desired end"),
      difficulty: 4,
      questions: [
        { q: "What should the Prophet ﷺ keep doing, in 22:67?", a: "Invite them to his Lord", wrong: ["Argue louder", "Give up", "Stay silent forever"], why: "But invite them to your Lord. Verily, you indeed are on the straight guidance." },
        { q: "What should he say if they argue, in 22:68?", a: "Allah knows best what you do", wrong: ["You win", "I will fight", "Leave me"], why: "And if they argue with you, say: Allah knows best of what you do." },
        { q: "Who will judge the differences, in 22:69?", a: "Allah, on Resurrection Day", wrong: ["The elders", "The kings", "No one"], why: "Allah will judge between you on the Day of Resurrection about that wherein you used to differ." }
      ]
    },
    {
      slug: "all-in-the-book",
      title: "All in the Book",
      line: "Allah knows everything, and it is all written in the Book.",
      facts: ["Written before creation", "It is easy for Allah"],
      quote: q22(70),
      source: hadith("muslim", "2653", "Abdullah ibn Amr", "Sahih", "The Prophet ﷺ said Allah wrote the measures of creation fifty thousand years before He created the heavens and the earth, while His Throne was on the water.", "fifty thousand years before He created the heavens and the earth"),
      difficulty: 4,
      questions: [
        { q: "Where is everything recorded, in 22:70?", a: "In the Book", wrong: ["On stone walls", "In the stars", "Nowhere"], why: "Verily, it is all in the Book. Verily, that is easy for Allah." },
        { q: "When were the measures written, per the hadith?", a: "50,000 years before creation", wrong: ["Last year", "At Adam's birth", "At the Flood"], why: "Allah ordained the measures of the creation fifty thousand years before He created the heavens and the earth." },
        { tf: true, q: "Knowing and recording all things is easy for Allah.", why: "Verily, that is easy for Allah." }
      ]
    },
    {
      slug: "cannot-create-a-fly",
      title: "Cannot create a fly",
      line: "All false gods together could not create even one fly.",
      facts: ["They cannot get back what a fly takes", "Weak are seeker and sought"],
      quote: q22(73),
      source: ik(73, "Allah gives a parable: even if all the idols came together, they could not create one fly. If a fly took something from them, they could not get it back. How weak are both.", "Even if all the idols and false gods whom you worship were to come together to create a single fly"),
      difficulty: 5,
      questions: [
        { q: "What can false gods not create, in 22:73?", a: "A fly", wrong: ["A mountain only", "A star only", "A sea only"], why: "Those on whom you call besides Allah cannot create a fly, even though they combine together." },
        { q: "If a fly snatches something, what can they do, in 22:73?", a: "Nothing to get it back", wrong: ["Catch it fast", "Make a new one", "Ask it nicely"], why: "They will have no power to release it from the fly." },
        { q: "Who is the seeker, per Ibn Abbas?", a: "The idol", wrong: ["The fly", "The Prophet ﷺ", "The angel"], why: "Ibn Abbas said, The seeker is the idol and the sought is the fly." }
      ]
    },
    {
      slug: "rightful-esteem",
      title: "Esteem Allah rightly",
      line: "Those who worship idols have not valued Allah as He deserves.",
      facts: ["Allah is All-Strong", "Allah is All-Mighty"],
      quote: q22(74),
      source: ik(73, "Allah shows how weak the idols are and how foolish it is to worship them. Those who do so have not regarded Allah with the esteem He deserves; He is All-Strong, All-Mighty.", "Here Allah points out the insignificance of the idols"),
      difficulty: 5,
      questions: [
        { q: "What have they failed to do, in 22:74?", a: "Esteem Allah rightly", wrong: ["Build idols", "Travel far", "Write books"], why: "They have not regarded Allah with His rightful esteem." },
        { q: "Which Names end 22:74?", a: "All-Strong, All-Mighty", wrong: ["All-Hearer, All-Seer", "Most Kind, Most Merciful", "First and Last"], why: "Verily, Allah is All-Strong, All-Mighty." },
        { q: "What does the fly parable show, per Ibn Kathir?", a: "Idols are weak and worthless", wrong: ["Flies are holy", "Idols are strong", "Flies are evil"], why: "Here Allah points out the insignificance of the idols and the foolishness of those who worship them." }
      ]
    },
    {
      slug: "messengers-chosen",
      title: "Messengers chosen by Allah",
      line: "Allah chooses Messengers from the angels and from people.",
      facts: ["He knows who deserves it", "All matters return to Allah"],
      quote: q22(75),
      source: ik(75, "Allah chooses Messengers from the angels and from mankind to carry His Message. He hears and sees all and knows best who is worthy, and He protects His Messengers.", "He chooses Messengers from His angels as He wills"),
      difficulty: 5,
      questions: [
        { q: "From whom does Allah choose Messengers, in 22:75?", a: "Angels and people", wrong: ["Only kings", "Only jinn", "Only the rich"], why: "Allah chooses Messengers from angels and from men." },
        { q: "To whom do all matters return, in 22:76?", a: "To Allah", wrong: ["To the people", "To the angels", "To no one"], why: "And to Allah return all matters." },
        { tf: true, q: "Allah knows best with whom to place His Message.", why: "Allah knows best with whom to place His Message." }
      ]
    },
    {
      slug: "bow-prostrate-do-good",
      title: "Bow, prostrate, do good",
      line: "Believers: bow, prostrate, worship your Lord and do good.",
      facts: ["Strive for Allah as you ought", "Allah chose this Ummah"],
      quote: q22(77),
      source: ik(78, "Believers are told to bow, prostrate, worship and do good, and strive for Allah with wealth, tongue and body. Allah chose this Ummah and honored it with the noblest Messenger.", "Allah has selected you and chosen you over all other nations"),
      difficulty: 5,
      questions: [
        { q: "What four things are believers told, in 22:77?", a: "Bow, prostrate, worship, do good", wrong: ["Eat, sleep, rest, play", "Buy, sell, travel, build", "Sing, dance, shout, run"], why: "O you who believe! Bow down, and prostrate yourselves, and worship your Lord and do good." },
        { q: "Why do they do it, in 22:77?", a: "That they may succeed", wrong: ["To be famous", "To get rich", "To please people"], why: "And do good that you may be successful." },
        { q: "How should we strive, per Ibn Kathir?", a: "With wealth, tongue and body", wrong: ["With swords only", "With silence", "With money only"], why: "Strive hard in Allah's cause as you ought to strive means, with your wealth and your tongues and your bodies." }
      ]
    },
    {
      slug: "no-hardship-in-religion",
      title: "No hardship in the religion",
      line: "Allah has put no hardship on us in this religion.",
      facts: ["The sick may pray sitting", "The traveller shortens prayer"],
      quote: q22(78),
      source: hadith("bukhari", "1117", "Imran ibn Husayn", "Sahih", "The Prophet ﷺ told a sick man: pray standing; if you cannot, pray sitting; and if you cannot, pray lying on your side.", "Pray while standing and if you can"),
      difficulty: 5,
      questions: [
        { q: "What has Allah not placed on us, in 22:78?", a: "Hardship in religion", wrong: ["Any prayer", "Any duty", "Any reward"], why: "And has not laid upon you in religion any hardship." },
        { q: "If you cannot stand, how do you pray, per the hadith?", a: "Sitting", wrong: ["Not at all", "Only later", "Only in a masjid"], why: "Pray while standing and if you can't, pray while sitting." },
        { q: "How does the traveller pray four-rakah prayers, per Ibn Kathir?", a: "Shortened to two", wrong: ["Made six", "Skipped", "Doubled"], why: "Four Rak'ahs when one is settled, which are shortened to two Rak'ah when one is traveling." }
      ]
    },
    {
      slug: "make-things-easy",
      title: "Make things easy",
      line: "The Prophet ﷺ said: make things easy, not hard, for people.",
      facts: ["Give good news", "Do not push people away"],
      quote: q22(78),
      source: hadith("bukhari", "69", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said: make things easy for people and do not make them hard; give good news and do not drive people away.", "Facilitate things to people"),
      difficulty: 5,
      questions: [
        { q: "What did the Prophet ﷺ tell us to do with religion for people?", a: "Make it easy", wrong: ["Make it hard", "Keep it secret", "Charge for it"], why: "Facilitate things to people and do not make it hard for them." },
        { q: "What should we give people, per the hadith?", a: "Good tidings", wrong: ["Bad news", "Hard rules", "Nothing"], why: "And give them good tidings and do not make them run away." },
        { q: "What does hardship mean in 22:78, per Ibn Abbas?", a: "Difficulty", wrong: ["War", "Hunger", "Travel"], why: "Ibn Abbas said: This means difficulty." }
      ]
    },
    {
      slug: "named-you-muslims",
      title: "He named you Muslims",
      line: "Allah named us Muslims in earlier Books and in the Quran.",
      facts: ["The religion of our father Ibrahim", "Hold fast to Allah, the best Protector"],
      quote: q22(78),
      source: ik(78, "This is the religion of your father Ibrahim. Allah named you Muslims in the earlier Books and in the Quran. So pray, give zakah and hold fast to Allah: He is your Protector and the best Helper.", "He is your Protector and your Helper"),
      difficulty: 5,
      questions: [
        { q: "Who named us Muslims, per Ibn Abbas?", a: "Allah", wrong: ["Ibrahim", "The Arabs", "The angels"], why: "He has named you Muslims before: This refers to Allah, may He be glorified." },
        { q: "Whose religion is it, in 22:78?", a: "Our father Ibrahim's", wrong: ["Fir'awn's", "The Romans'", "The Persians'"], why: "It is the religion of your father Ibrahim." },
        { q: "How does Al-Hajj end, in 22:78?", a: "Excellent Protector and Helper", wrong: ["A hard warning", "A story of war", "A trade rule"], why: "He is your Mawla, what an Excellent Mawla and what an Excellent Helper!" }
      ]
    }
  ]
};

export const HAJJ_UNITS: readonly DeepUnit[] = [HAJJ_ONE, HAJJ_TWO, HAJJ_THREE];
