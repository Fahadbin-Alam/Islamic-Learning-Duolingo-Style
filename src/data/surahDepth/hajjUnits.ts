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

export const HAJJ_UNITS: readonly DeepUnit[] = [HAJJ_ONE];
