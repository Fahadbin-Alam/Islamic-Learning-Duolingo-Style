import { hadith, type DeepUnit } from "./deepKit";

// One more Du'as unit: du'as from the Sunnah, all from Jami at-Tirmidhi. Asking by Allah's Greatest Name, a man's
// du'a in the masjid, words that Allah affirms, a du'a to be ever grateful, the sajdah du'a a tree said in a dream,
// and the du'a over the first fruit. Every card is one sahih or hasan hadith with its number, narrator and grade,
// and its exact English words to highlight. Which name is the Greatest Name is left out, as scholars differ on it,
// and none of these hadith is taught anywhere else in the app.

const SUNNAH_DUAS: DeepUnit = {
  key: "duas-from-the-sunnah",
  topicId: "duas",
  branchId: "duas-from-the-sunnah",
  branch: { title: "Du'as from the Sunnah", description: "Allah's Greatest Name, a man's du'a in the masjid, words Allah affirms, a du'a to be ever grateful, a tree in a dream, and the first fruit." },
  name: "du'as from the Sunnah",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "the-greatest-name",
      title: "The Greatest Name",
      line: "Called by His Greatest Name, Allah answers and gives.",
      facts: ["Told by Buraydah ibn al-Hasib", "The man said: Al-Ahad, As-Samad", "Who does not beget, nor was begotten"],
      source: hadith("tirmidhi", "3475", "Buraydah ibn al-Hasib", "Sahih (Al-Albani)", "Buraydah said: the Prophet ﷺ heard a man saying: O Allah, I ask You, as I bear witness that You are Allah, none is worthy of worship but You, the One, As-Samad, who does not beget, nor was begotten, and none is like Him. He ﷺ said: by the One in whose Hand is my soul, he has asked Allah by His Greatest Name; when He is called by it He answers, and when He is asked by it He gives.", "he has asked Allah by His Greatest Name, the one which if He is called upon by it, He responds, and when He is asked by it, He gives"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ say the man had asked Allah by?", a: "His Greatest Name", wrong: ["The name of a king", "The name of his father", "The name of an angel"], why: "When He is called by it He answers, and asked by it He gives, he ﷺ said." },
        { q: "Which two names of Allah were in the man's du'a?", a: "Al-Ahad, As-Samad", wrong: ["Al-Malik, Al-Quddus", "Ar-Rahman, Ar-Rahim", "Al-Khaliq, Al-Bari"], why: "The One, As-Samad, who does not beget, nor was begotten, the man said." },
        { q: "The man's du'a used words of Surah al-Ikhlas.", tf: true, why: "Who does not beget, nor was begotten, and none is like Him, the man said." }
      ]
    },
    {
      slug: "a-dua-in-the-masjid",
      title: "A du'a in the masjid",
      line: "A man in the masjid asked Allah by His Greatest Name.",
      facts: ["Told by Anas ibn Malik", "Al-Mannan: the One who gives blessings", "Dhal-Jalali wal-Ikram: Owner of majesty and honor"],
      source: hadith("tirmidhi", "3544", "Anas ibn Malik", "Sahih (Al-Albani)", "Anas said: the Prophet ﷺ entered the masjid, where a man had prayed and was making du'a: O Allah, none is worthy of worship but You, Al-Mannan, Originator of the heavens and the earth, Owner of majesty and honor. The Prophet ﷺ said: do you know what he has called on Allah by? He has called on Allah by His Greatest Name.", "Do you know what he has supplicated Allah with? He has supplicated to Allah by His Greatest Name"),
      difficulty: 2,
      questions: [
        { q: "Where was the man making his du'a?", a: "In the masjid", wrong: ["In the market", "On a journey", "At his home"], why: "He had prayed and was making du'a when he ﷺ came into the masjid, Anas said." },
        { q: "What does Badi'us-samawati wal-ard mean?", a: "Originator of the heavens and earth", wrong: ["Lord of the daybreak", "King of mankind", "Lord of the Throne"], why: "The man called Allah Al-Mannan, Originator of the heavens and the earth." },
        { q: "He ﷺ said the man called on Allah by His Greatest Name.", tf: true, why: "When He is called upon by it, He responds, and when asked by it, He gives." }
      ]
    },
    {
      slug: "allah-affirms-your-words",
      title: "Allah affirms your words",
      line: "Say La ilaha illallah wallahu akbar, and Allah affirms it.",
      facts: ["Told by Abu Sa'id al-Khudri and Abu Hurairah", "La ilaha illallah wallahu akbar", "Allah says: none is worthy of worship but Me"],
      source: hadith("tirmidhi", "3430", "Abu Sa'id al-Khudri and Abu Hurairah", "Sahih (Al-Albani)", "Abu Sa'id al-Khudri and Abu Hurairah said: the Prophet ﷺ said: whoever says: none is worthy of worship but Allah, and Allah is the Greatest, his Lord affirms his words and says: none is worthy of worship but Me, and I am the Greatest. And he ﷺ used to say: whoever says these words in his illness and then dies, the Fire will not consume him.", "of worship except Me, and I am the Greatest"),
      difficulty: 2,
      questions: [
        { q: "Who affirms the words of one who says La ilaha illallah wallahu akbar?", a: "Allah, his Lord", wrong: ["His neighbors", "The people near him", "His teacher"], why: "His Lord says back: none is worthy of worship but Me, and I am the Greatest." },
        { q: "What happens to one who says these words in illness, then dies?", a: "The Fire will not consume him", wrong: ["He will be cured at once", "His wealth will grow", "He will be given gold"], why: "Whoever says it in his illness, then dies, the Fire shall not consume him, he ﷺ said." },
        { q: "Allah answers the one who says La ilaha illallah wallahu akbar.", tf: true, why: "None is worthy of worship but Me, and I am the Greatest, his Lord says." }
      ]
    },
    {
      slug: "make-me-ever-grateful",
      title: "Make me ever grateful",
      line: "He ﷺ asked: my Lord, make me ever grateful to You.",
      facts: ["Told by Ibn Abbas", "Rabbi a'inni wa la tu'in alayya: my Lord, help me", "Rabbij'alni laka shakkara: make me ever grateful"],
      source: hadith("tirmidhi", "3551", "Ibn Abbas", "Sahih (Al-Albani)", "Ibn Abbas said: the Prophet ﷺ used to make du'a: my Lord, help me and do not help others against me, guide me and make guidance easy for me. My Lord, make me ever grateful to You, ever remembering You, ever fearing You, ever obeying You. My Lord, accept my repentance, wash away my sin and answer my du'a.", "My Lord, make me ever-grateful to You, ever-remembering of You, ever-fearful of You, ever-obedient to You"),
      difficulty: 2,
      questions: [
        { q: "What does Rabbi a'inni mean?", a: "My Lord, help me", wrong: ["My Lord, feed me", "My Lord, clothe me", "My Lord, hide me"], why: "Wa la tu'in alayya: and do not help others against me, he ﷺ said." },
        { q: "What does waghsil hawbati mean?", a: "Wash away my sin", wrong: ["Wash my clothes", "Wash my hands", "Wash my face"], why: "My Lord, accept my repentance, wash my sin, answer my call, he ﷺ said." },
        { q: "He ﷺ asked Allah to make him ever grateful to Him.", tf: true, why: "Ever remembering You, ever fearing You, ever obeying You, he ﷺ asked too." }
      ]
    },
    {
      slug: "the-tree-that-prostrated",
      title: "The tree that prostrated",
      line: "In sajdah he ﷺ said what a tree said in a dream.",
      facts: ["Told by Ibn Abbas", "A man saw it in his dream at night", "Allahummaktub li biha indaka ajra: write a reward for me by it"],
      source: hadith("tirmidhi", "3424", "Ibn Abbas", "Hasan (Al-Albani)", "Ibn Abbas said: a man told the Prophet ﷺ he dreamed he was praying behind a tree, and when he prostrated, the tree prostrated with him and said: O Allah, write a reward for me with You for it, remove a sin from me by it, store it for me with You, and accept it from me as You accepted it from Your servant Dawud. Then the Prophet ﷺ recited an ayah of sajdah and prostrated, and Ibn Abbas heard him say the same words.", "and accept it from me as You accepted it from Your worshipper Dawud"),
      difficulty: 2,
      questions: [
        { q: "What did the tree do in the man's dream?", a: "Prostrated with him", wrong: ["Grew sweet fruit", "Fell to the ground", "Gave him shade"], why: "Then the tree said a du'a in its sajdah, the man told him ﷺ." },
        { q: "The du'a asks Allah to accept it as He accepted it from whom?", a: "Dawud", wrong: ["Adam", "Nuh", "Yunus"], why: "As You accepted it from Your servant Dawud, the tree said in the dream." },
        { q: "Ibn Abbas heard him ﷺ say the same words in his sajdah.", tf: true, why: "He ﷺ recited an ayah of sajdah and prostrated, Ibn Abbas said." }
      ]
    },
    {
      slug: "the-first-fruit",
      title: "The first fruit",
      line: "He ﷺ gave the first fruit to the smallest child he saw.",
      facts: ["Told by Abu Hurairah", "People brought him ﷺ the first fruit they saw", "He ﷺ asked Allah to bless their fruit and city"],
      source: hadith("tirmidhi", "3454", "Abu Hurairah", "Sahih (Al-Albani)", "Abu Hurairah said: when people saw the first fruit, they brought it to the Messenger of Allah ﷺ. He would take it and say: O Allah, bless us in our fruits, bless us in our city, and bless us in our sa' and our mudd. Ibrahim prayed to You for Makkah, and I pray to You for Madinah with the like of it. Then he would call the smallest young child he saw and give him that fruit.", "Then he would call the smallest young child he saw and give him that fruit"),
      difficulty: 1,
      questions: [
        { q: "Who did he ﷺ give the first fruit to?", a: "The smallest child he saw", wrong: ["The oldest man there", "The richest trader", "The first man he saw"], why: "First he ﷺ made du'a for blessing, then called a young child over, Abu Hurairah said." },
        { q: "Along with their fruits, what did he ﷺ ask Allah to bless?", a: "Their city", wrong: ["Their ships", "Their clothes", "Their markets"], why: "And bless for us our sa' and our mudd, he ﷺ also said." },
        { q: "He ﷺ asked for Madinah what Ibrahim had asked for Makkah.", tf: true, why: "Ibrahim is Your friend and Your Prophet, he ﷺ said in that du'a." }
      ]
    }
  ]
};

export const DUA_FROM_SUNNAH_UNITS: DeepUnit[] = [SUNNAH_DUAS];
