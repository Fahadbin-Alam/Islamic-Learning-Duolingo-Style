import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

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

export const HAJJ_UNITS: readonly DeepUnit[] = [HAJJ_ONE, HAJJ_TWO];
