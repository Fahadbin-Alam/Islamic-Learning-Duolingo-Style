import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Al-Qadr ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Qadr 97:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_97_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Qadr 97:${ayah}`,
    url: `https://quran.com/97:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 97:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q97 = (ayah: number) => quranQuote(97, ayah);


/** Ayahs 1 to 3: the Quran sent down in the Night of Al-Qadr, in Ramadan, a night better than a thousand months. */
const QADR_ONE: DeepUnit = {
  key: "qadr1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-97",
  name: "Al-Qadr, ayahs 1-3",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Qadr",
  lessons: [
    {
      slug: "sent-down-on-a-blessed-night",
      title: "Sent down on a blessed night",
      line: "Allah sent the Quran down in Laylat al-Qadr, a blessed night.",
      facts: ["Laylat al-Qadr: Night of Decree", "Also called a blessed night"],
      quote: q97(1),
      source: ik(1, "Allah sent the Quran down in the Night of Al-Qadr, a blessed night, as He says in 44:3.", "it is a blessed night about which Allah says"),
      difficulty: 1,
      questions: [
        { q: "In which night was the Quran sent down, per 97:1?", a: "The Night of Al-Qadr", wrong: ["The night of Eid", "The night of Hijrah", "The night of Badr"], why: "Verily, We have sent it down in the Night of Al-Qadr." },
        { q: "Which other ayah calls it a blessed night?", a: "44:3", wrong: ["2:255", "112:1", "36:1"], why: "We sent it down on a blessed night. 44:3" },
        { tf: true, q: "Laylat al-Qadr is a blessed night.", why: "It is a blessed night about which Allah says." }
      ]
    },
    {
      slug: "in-the-month-of-ramadan",
      title: "In the month of Ramadan",
      line: "The Night of Al-Qadr comes in Ramadan, the month of the Quran.",
      facts: ["Ramadan: month of the Quran", "2:185 agrees"],
      quote: q97(1),
      source: ik(1, "The Night of Al-Qadr is in Ramadan, as Allah says the Quran was revealed in the month of Ramadan in 2:185.", "This is the Night of Al-Qadr and it occurs during the month of Ramadan"),
      difficulty: 1,
      questions: [
        { q: "In which month is the Night of Al-Qadr?", a: "Ramadan", wrong: ["Shaban", "Muharram", "Dhul-Hijjah"], why: "It occurs during the month of Ramadan." },
        { q: "Which ayah says the Quran came in Ramadan?", a: "2:185", wrong: ["97:5", "1:1", "114:1"], why: "The month of Ramadan in which was revealed the Quran. 2:185" },
        { tf: false, q: "Laylat al-Qadr can be in any month of the year.", why: "This is the Night of Al-Qadr and it occurs during the month of Ramadan." }
      ]
    },
    {
      slug: "over-twenty-three-years",
      title: "Over twenty-three years",
      line: "The Quran reached the near heaven first, then came in 23 years.",
      facts: ["Bayt al-Izzah: House of Might", "Parts came as events happened"],
      quote: q97(1),
      source: ik(1, "Ibn Abbas said the Quran came down at once to the House of Might in the lowest heaven, then in parts over twenty-three years.", "based upon the incidents that occurred over a period of twenty-three years"),
      difficulty: 2,
      questions: [
        { q: "Over how many years did the Quran come in parts?", a: "Twenty-three", wrong: ["Ten", "Forty", "Seven"], why: "Over a period of twenty-three years." },
        { q: "Where did it first come all at once, per Ibn Abbas?", a: "The House of Might", wrong: ["The cave of Thawr", "Mount Sinai", "The Kabah roof"], why: "To the House of Might, which is in the heaven of this world." },
        { tf: true, q: "Ayahs often came down as events happened.", why: "Based upon the incidents that occurred over a period of twenty-three years." }
      ]
    },
    {
      slug: "what-will-make-you-know",
      title: "What will make you know?",
      line: "Allah asks a question to show how great this night is.",
      facts: ["A question to make us wonder", "A very high rank"],
      quote: q97(2),
      source: ik(2, "Allah raised the rank of the Night of Al-Qadr, the night He chose for sending the Quran, by asking what will make you know it.", "Then Allah magnified the status of the Night of Al-Qadr"),
      difficulty: 2,
      questions: [
        { q: "What does 97:2 ask?", a: "What will make you know the Night of Al-Qadr?", wrong: ["When is Eid?", "Who built the Kabah?", "How long is a day?"], why: "And what will make you know what the Night of Al-Qadr is?" },
        { q: "Why does Allah ask this, per Ibn Kathir?", a: "To magnify its status", wrong: ["Because no one knew it", "To hide it forever", "To test the angels"], why: "Then Allah magnified the status of the Night of Al-Qadr." },
        { tf: true, q: "Allah chose this night for sending the Quran.", why: "Which He chose for the revelation of the Mighty Quran." }
      ]
    },
    {
      slug: "better-than-a-thousand-months",
      title: "Better than a thousand months",
      line: "Worship on this one night is better than a thousand months.",
      facts: ["1000 months: over 83 years", "One night, a lifetime of reward"],
      quote: q97(3),
      source: ik(3, "Worship in the Night of Al-Qadr equals worship done for a thousand months.", "worship during the Night of Al-Qadr is equivalent to worship performed for a period of one thousand months"),
      difficulty: 2,
      questions: [
        { q: "The Night of Al-Qadr is better than what, per 97:3?", a: "A thousand months", wrong: ["A hundred days", "Ten years", "A thousand nights"], why: "The Night of Al-Qadr is better than a thousand months." },
        { q: "About how many years are a thousand months?", a: "Over 83 years", wrong: ["About 10 years", "About 40 years", "About 100 years"], why: "One thousand months is a little over eighty-three years." },
        { tf: true, q: "Worship on this night is worth a thousand months.", why: "Worship during the Night of Al-Qadr is equivalent to worship performed for a period of one thousand months." }
      ]
    },
    {
      slug: "forgiven-for-standing",
      title: "Forgiven for standing in prayer",
      line: "Pray this night with faith and hope, and past sins are forgiven.",
      facts: ["Iman: sincere faith", "Ihtisab: hoping for reward"],
      quote: q97(3),
      source: hadith("bukhari", "1901", "Abu Hurairah", "Sahih", "Whoever prays on the Night of Qadr with sincere faith, hoping for reward from Allah, has all his previous sins forgiven.", "Whoever established prayers on the night of Qadr out of sincere faith and hoping for a reward from Allah"),
      difficulty: 3,
      questions: [
        { q: "What is the reward for praying on that night with faith?", a: "Previous sins forgiven", wrong: ["A new house", "A long life", "More money"], why: "Then all his previous sins will be forgiven." },
        { q: "Which two things must the prayer have?", a: "Sincere faith and hope for reward", wrong: ["A crowd and a loud voice", "New clothes and perfume", "A long trip and a guide"], why: "Out of sincere faith and hoping for a reward from Allah." },
        { tf: true, q: "Fasting Ramadan with faith also brings forgiveness.", why: "Whoever fasts in the month of Ramadan out of sincere faith, and hoping for a reward from Allah, then all his previous sins will be forgiven." }
      ]
    }
  ]
};

/** Ayahs 4 and 5: angels and Jibril come down, peace until dawn, and how to seek the night in the last ten. */
const QADR_TWO: DeepUnit = {
  key: "qadr2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-97",
  name: "Al-Qadr, ayahs 4-5",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Qadr",
  lessons: [
    {
      slug: "the-angels-descend",
      title: "The angels descend",
      line: "Many angels come down on this night with blessings and mercy.",
      facts: ["Tanazzalu: they descend", "Angels love dhikr circles"],
      quote: q97(4),
      source: ik(4, "The angels come down in great numbers on this night because of its many blessings, as they come down when the Quran is recited.", "the angels descend in abundance during the Night of Al-Qadr due to its abundant blessings"),
      difficulty: 1,
      questions: [
        { q: "Who descends on this night, per 97:4?", a: "The angels and the Ruh", wrong: ["The stars", "The birds", "The kings"], why: "Therein descend the angels and the Ruh by their Lord's permission." },
        { q: "Why do so many angels come, per Ibn Kathir?", a: "Its abundant blessings", wrong: ["To hide the moon", "To bring cold", "To end Ramadan"], why: "Due to its abundant blessings." },
        { tf: true, q: "Angels also come down when the Quran is recited.", why: "Just as they descend when the Quran is recited." }
      ]
    },
    {
      slug: "the-ruh-is-jibril",
      title: "The Ruh is Jibril",
      line: "Ar-Ruh in 97:4 means Jibril, named alone to honor him.",
      facts: ["Ar-Ruh: Jibril", "Named apart from the angels"],
      quote: q97(4),
      source: ik(4, "Ar-Ruh means the angel Jibril; he is named on his own after the angels to single him out.", "it means the angel Jibril"),
      difficulty: 2,
      questions: [
        { q: "Who is Ar-Ruh in 97:4, per Ibn Kathir?", a: "Jibril", wrong: ["Mikail", "Israfil", "Malik"], why: "Ar-Ruh, it is said, means the angel Jibril." },
        { q: "By whose permission do they descend?", a: "Their Lord", wrong: ["The people", "The kings", "Nobody"], why: "By their Lord's permission with every matter." },
        { tf: true, q: "Jibril is named apart to single him out.", why: "Adding the name of the distinct object separate from the general group." }
      ]
    },
    {
      slug: "peace-until-dawn",
      title: "Peace until dawn",
      line: "The whole night is good and peaceful until Fajr.",
      facts: ["Salam: peace", "Matla al-Fajr: dawn"],
      quote: q97(5),
      source: ik(5, "Qatadah and Ibn Zayd said the whole night is good, with no evil in it, until Fajr comes.", "all of it is good and there is no evil in it until the coming of Fajr"),
      difficulty: 1,
      questions: [
        { q: "Until when is there peace, per 97:5?", a: "Until dawn", wrong: ["Until noon", "Until Isha", "Until Friday"], why: "There is peace until the appearance of dawn." },
        { q: "What did Qatadah say about the night?", a: "All of it is good", wrong: ["Only half is good", "It is very cold", "It is short"], why: "All of it is good and there is no evil in it until the coming of Fajr." },
        { tf: true, q: "Mujahid said Shaytan cannot do harm on that night.", why: "It is security in which Shaytan cannot do any evil or any harm." }
      ]
    },
    {
      slug: "seek-it-in-the-odd-nights",
      title: "Seek it in the odd nights",
      line: "Search for Laylat al-Qadr in the odd nights of the last ten.",
      facts: ["The last ten nights", "21, 23, 25, 27, 29"],
      quote: q97(5),
      source: hadith("bukhari", "2017", "Aishah", "Sahih", "The Messenger of Allah ﷺ said to search for the Night of Qadr in the odd nights of the last ten days of Ramadan.", "Search for the Night of Qadr in the odd nights of the last ten days of Ramadan"),
      difficulty: 2,
      questions: [
        { q: "In which part of Ramadan should we search?", a: "The last ten nights", wrong: ["The first ten nights", "The middle ten nights", "Only the first night"], why: "In the odd nights of the last ten days of Ramadan." },
        { q: "Which kind of nights did he name?", a: "The odd nights", wrong: ["The even nights", "The Friday nights", "The cloudy nights"], why: "Search for the Night of Qadr in the odd nights." },
        { q: "Which of these is an odd night of the last ten?", a: "The 25th", wrong: ["The 20th", "The 22nd", "The 24th"], why: "Search for the Night of Qadr in the odd nights of the last ten days of Ramadan." }
      ]
    },
    {
      slug: "its-date-was-taken-away",
      title: "The date was taken away",
      line: "A quarrel made its date forgotten, maybe for our good.",
      facts: ["Quarrels take away good", "Seek it every odd night"],
      quote: q97(5),
      source: hadith("bukhari", "49", "Ubadah ibn as-Samit", "Sahih", "He came out to tell its date, but two men quarrelled, so its knowledge was taken away; he said maybe that was better for you.", "maybe it was better for you"),
      difficulty: 3,
      questions: [
        { q: "Why was the date taken away?", a: "Two men quarrelled", wrong: ["It rained", "The moon hid", "People slept"], why: "But there happened a quarrel between two Muslim men." },
        { q: "What did he say about losing the date?", a: "Maybe it was better for you", wrong: ["It is lost forever", "Stop seeking it", "It does not matter"], why: "Its knowledge was taken away and maybe it was better for you." },
        { tf: true, q: "Quarrelling between Muslims can take away good.", why: "As so and so and so and so quarrelled, its knowledge was taken away." }
      ]
    },
    {
      slug: "working-hard-in-the-last-ten",
      title: "Working hard in the last ten",
      line: "In the last ten he prayed all night and woke his family.",
      facts: ["Tightened his belt: worked hard", "Woke his family to pray"],
      quote: q97(3),
      source: hadith("bukhari", "2024", "Aishah", "Sahih", "When the last ten nights began, he worked hard, prayed all night and kept his family awake for prayer.", "used to pray all the night, and used to keep his family awake for the prayers"),
      difficulty: 2,
      questions: [
        { q: "What did he do in the last ten nights?", a: "Prayed all night", wrong: ["Slept early", "Travelled", "Went to market"], why: "And used to pray all the night." },
        { q: "What did he do for his family?", a: "Kept them awake for prayer", wrong: ["Sent them away", "Let them sleep", "Gave them gifts only"], why: "And used to keep his family awake for the prayers." },
        { tf: false, q: "He rested more in the last ten nights.", why: "He used to tighten his waist belt, meaning work hard." }
      ]
    },
    {
      slug: "the-dua-of-the-night",
      title: "The dua of the night",
      line: "Aishah learned a dua for this night: Allah, You love to pardon.",
      facts: ["Al-Afuww: the Pardoner", "Allahumma innaka afuwwun"],
      quote: q97(5),
      source: hadith("tirmidhi", "3513", "Aishah", "Sahih", "Aishah asked what to say on the Night of Al-Qadr; he taught her: O Allah, You are Pardoning, You love pardon, so pardon me.", "You love pardon, so pardon me"),
      difficulty: 3,
      questions: [
        { q: "Who asked what to say on that night?", a: "Aishah", wrong: ["Fatimah", "Hafsah", "Umm Salamah"], why: "Aishah narrated: I said, O Messenger of Allah, what should I say in it?" },
        { q: "What do we ask Allah for in this dua?", a: "To pardon us", wrong: ["To make us famous", "To give us gold", "To make us tall"], why: "You love pardon, so pardon me." },
        { q: "What does the dua say Allah loves?", a: "To pardon", wrong: ["To punish", "To be far", "To be silent"], why: "O Allah, indeed You are Pardoning, You love pardon, so pardon me." }
      ]
    }
  ]
};

export const QADR_UNITS: readonly DeepUnit[] = [QADR_ONE, QADR_TWO];
