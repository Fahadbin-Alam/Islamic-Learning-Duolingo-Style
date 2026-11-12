import { hadith, type DeepUnit } from "./deepKit";

// One more Aqidah unit: what the angels do, from Sunan an-Nasa'i, Sunan Ibn Majah and Jami at-Tirmidhi. Angels who
// bring our salams to him ﷺ, blessings on the first row, Allah boasting before the angels of those who wait for the
// next prayer, wings spread over Sham, the bier of Sa'd ibn Mu'adh that the angels carried, and the angel in charge of
// the clouds. Every card is one sahih or hasan hadith with its number, narrator and grade, and its exact English words
// to highlight. None of these hadith is taught anywhere else in the app. Tirmidhi 3117 goes on to what Isra'il made
// unlawful for himself; only its first part, on the thunder, is taught here.

const ANGELS: DeepUnit = {
  key: "aqidah-what-the-angels-do",
  topicId: "aqidah",
  branchId: "aqidah-what-the-angels-do",
  branch: { title: "What the angels do", description: "Angels who bring our salams, blessings on the first row, Allah boasting of those who wait, wings over Sham, a bier the angels carried, and the angel of the clouds." },
  name: "what the angels do",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "angels-who-bring-the-salams",
      title: "Angels who bring the salams",
      line: "Angels travel the earth bringing him ﷺ our salams.",
      facts: ["Told by Abdullah ibn Mas'ud", "Salam: a greeting of peace", "Ummah: all the Muslims"],
      source: hadith("nasai", "1282", "Abdullah ibn Mas'ud", "Sahih (Al-Albani)", "Abdullah ibn Mas'ud said: the Messenger of Allah ﷺ said: Allah has angels who travel around the earth, conveying to me the salams of my Ummah.", "conveying to me the Salams of my Ummah"),
      difficulty: 3,
      questions: [
        { q: "Where do these angels travel, he ﷺ said?", a: "Around the earth", wrong: ["Only in Makkah", "Only in the sky", "Under the sea"], why: "Allah has angels who travel around on earth, Ibn Mas'ud heard him ﷺ say." },
        { q: "What do they bring to him ﷺ from his Ummah?", a: "Their salams", wrong: ["Their coins", "Their letters", "Their gifts"], why: "Conveying to me the salams of my Ummah, he ﷺ said of these angels." },
        { q: "Our salams on the Prophet ﷺ reach him.", tf: true, why: "Angels travel the earth to bring him ﷺ the salams of his Ummah, Ibn Mas'ud said." }
      ]
    },
    {
      slug: "blessings-on-the-first-row",
      title: "Blessings on the first row",
      line: "Allah and the angels send blessings on the first row.",
      facts: ["Told by Al-Bara ibn Azib", "The first row: just behind the imam", "Come early to reach it"],
      source: hadith("ibnmajah", "997", "Al-Bara ibn Azib", "Sahih (Al-Albani)", "Al-Bara ibn Azib said: I heard the Messenger of Allah ﷺ say: Allah and the angels send blessings upon the first row.", "the angels send blessings upon the first row"),
      difficulty: 3,
      questions: [
        { q: "On which row do Allah and the angels send blessings?", a: "The first row", wrong: ["The last row", "The middle row", "The third row"], why: "Allah and the angels send blessings upon the first row, Al-Bara heard him ﷺ say." },
        { q: "Who sends blessings on the first row, he ﷺ said?", a: "Allah and the angels", wrong: ["Only the imam", "Only the mu'adhdhin", "Only the people"], why: "Al-Bara ibn Azib heard the Messenger of Allah ﷺ say that Allah and the angels bless it." },
        { q: "Allah blesses those who pray in the first row.", tf: true, why: "Allah and the angels send blessings upon the first row, Al-Bara heard him ﷺ say." }
      ]
    },
    {
      slug: "allah-boasts-of-them",
      title: "Waiting for the next prayer",
      line: "Allah boasts to His angels of those awaiting the next prayer.",
      facts: ["Told by Abdullah ibn Amr", "They had prayed Maghrib with him ﷺ", "Some stayed on to wait for Isha"],
      source: hadith("ibnmajah", "801", "Abdullah ibn Amr", "Sahih (Darussalam)", "Abdullah ibn Amr said: we prayed Maghrib with the Messenger of Allah ﷺ; some went home and some stayed. Then he ﷺ came back in a hurry and said: be of good cheer, for your Lord has opened one of the gates of heaven and is boasting of you before the angels, saying: look at My slaves; they have fulfilled one obligatory duty and are awaiting another.", "they have fulfilled one obligatory duty and are awaiting another"),
      difficulty: 3,
      questions: [
        { q: "Before whom does Allah boast of those who wait?", a: "The angels", wrong: ["The kings", "The jinn", "The poets"], why: "Your Lord opened a gate of heaven; He is boasting of you before the angels, he ﷺ said." },
        { q: "Which prayer had they just prayed with him ﷺ?", a: "Maghrib", wrong: ["Fajr", "Zuhr", "Asr"], why: "They had prayed Maghrib with him ﷺ; some went home and some stayed, Abdullah ibn Amr said." },
        { q: "Allah praises those who wait in the masjid for the next prayer.", tf: true, why: "They prayed one prayer and now wait for the next, Allah tells the angels, praising them." }
      ]
    },
    {
      slug: "wings-over-sham",
      title: "Wings over Sham",
      line: "The angels of Ar-Rahman spread their wings over Sham.",
      facts: ["Told by Zayd ibn Thabit", "Tuba: glad tidings and good", "Ash-Sham: the Levant, north of Arabia"],
      source: hadith("tirmidhi", "3954", "Zayd ibn Thabit", "Sahih (Al-Albani)", "Zayd ibn Thabit said: we were with the Messenger of Allah ﷺ collecting the Quran on pieces of cloth, and he ﷺ said: Tuba is for Ash-Sham. We said: why is that, O Messenger of Allah? He said: because the angels of Ar-Rahman spread their wings over it.", "the angels of Ar-Rahman spread their wings over it"),
      difficulty: 3,
      questions: [
        { q: "Which land did he ﷺ say Tuba is for?", a: "Ash-Sham", wrong: ["Persia", "Rome", "Abyssinia"], why: "Tuba is for Ash-Sham, he ﷺ said while they collected the Quran on pieces of cloth." },
        { q: "Why is Tuba for Ash-Sham, he ﷺ said?", a: "Angels spread their wings over it", wrong: ["Its rivers are the most", "Its markets are the biggest", "Its kings are the richest"], why: "Because the angels of Ar-Rahman spread their wings over it, he ﷺ answered." },
        { q: "Zayd ibn Thabit was collecting the Quran with him ﷺ that day.", tf: true, why: "Zayd said they were with him ﷺ, collecting the Quran on pieces of cloth." }
      ]
    },
    {
      slug: "the-angels-carried-him",
      title: "Carried by the angels",
      line: "The angels carried the bier of Sa'd ibn Mu'adh.",
      facts: ["Told by Anas ibn Malik", "Bier: the frame a body is carried on", "Hypocrites: those who hide disbelief"],
      source: hadith("tirmidhi", "3849", "Anas ibn Malik", "Sahih (Darussalam)", "Anas ibn Malik said: when the bier of Sa'd ibn Mu'adh was carried, the hypocrites said: how light his bier is. When this reached the Prophet ﷺ, he said: indeed, the angels were carrying him.", "Indeed, the angels were carrying him"),
      difficulty: 3,
      questions: [
        { q: "Whose bier did the angels carry, he ﷺ said?", a: "Sa'd ibn Mu'adh", wrong: ["Utbah ibn Rabi'ah", "Abu Lahab", "Umayyah ibn Khalaf"], why: "Indeed, the angels were carrying him, he ﷺ said of Sa'd ibn Mu'adh." },
        { q: "What did the hypocrites say as his bier was carried?", a: "How light it is", wrong: ["How heavy it is", "How long it is", "How slow it is"], why: "How light his bier is, the hypocrites said; the angels were carrying him, he ﷺ answered." },
        { q: "The words of the hypocrites about the bier reached him ﷺ.", tf: true, why: "When their words reached the Prophet ﷺ, he said that the angels were carrying Sa'd." }
      ]
    },
    {
      slug: "the-angel-of-the-clouds",
      title: "The angel of the clouds",
      line: "An angel is in charge of the clouds and drives them.",
      facts: ["Told by Abdullah ibn Abbas", "The Jews asked him ﷺ about thunder", "He drives the clouds where Allah wills"],
      source: hadith("tirmidhi", "3117", "Abdullah ibn Abbas", "Hasan (Darussalam)", "Ibn Abbas said: the Jews came to the Prophet ﷺ and said: O Abul-Qasim, tell us about thunder, what is it? He said: an angel among the angels, who is responsible for the clouds, and he drives the clouds wherever Allah wills. They asked: then what is this noise we hear? He said: it is him, striking the clouds as he drives them on, until they go where they are ordered. They said: you have told the truth.", "An angel among the angels, who is responsible for the clouds"),
      difficulty: 3,
      questions: [
        { q: "Who is responsible for the clouds, he ﷺ said?", a: "One of the angels", wrong: ["One of the stars", "One of the kings", "One of the birds"], why: "Asked about thunder, he ﷺ said an angel among the angels drives the clouds." },
        { q: "Where does that angel drive the clouds?", a: "Wherever Allah wills", wrong: ["Wherever people ask", "Only over the sea", "Only over Makkah"], why: "He drives the clouds wherever Allah wills, he ﷺ told the Jews who asked about thunder." },
        { q: "The Jews who asked said he ﷺ had told the truth.", tf: true, why: "After his answer about the thunder, they said: you have told the truth." }
      ]
    }
  ]
};

export const AQIDAH_ANGELS_UNITS: DeepUnit[] = [ANGELS];
