import { hadith, type DeepUnit } from "./deepKit";

// One more Foundations unit: sunnahs of reciting the Quran, from Jami at-Tirmidhi, Sunan an-Nasa'i, Sunan Abi Dawud
// and Sunan Ibn Majah. Two surahs he ﷺ recited before sleeping, the end of Al-Baqarah written before creation,
// beautiful voices, "recite and rise", ten, a hundred and a thousand ayahs at night, and Umm Hani hearing his ﷺ
// recitation from her roof. Every card is one sahih or hasan hadith with its number, narrator and grade, and its
// exact English words to highlight. Points the schools differ on are left out, and none of these hadith is taught
// anywhere else in the app.

const QURAN: DeepUnit = {
  key: "found-reciting-quran",
  topicId: "foundation",
  branchId: "foundation-reciting-the-quran",
  branch: { title: "Sunnahs of reciting the Quran", description: "Two surahs before sleep, the end of Al-Baqarah, beautiful voices, recite and rise, ayahs at night, and a recitation heard from a roof." },
  name: "sunnahs of reciting the Quran",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "two-surahs-before-sleep",
      title: "Two surahs before sleep",
      line: "He ﷺ would not sleep before reciting Az-Zumar and Al-Isra.",
      facts: ["Told by Aishah", "Banu Isra'il is another name for Al-Isra", "Az-Zumar is surah 39, Al-Isra surah 17"],
      source: hadith("tirmidhi", "3405", "Aishah", "Sahih (Al-Albani)", "Aishah said: the Prophet ﷺ would not sleep until he recited Az-Zumar and Banu Isra'il, which is Surat al-Isra.", "would not sleep until he recited Az-Zumar and Banu"),
      difficulty: 1,
      questions: [
        { q: "Which two surahs did Aishah say he ﷺ recited before sleep?", a: "Az-Zumar and Al-Isra", wrong: ["Al-Anfal and At-Tawbah", "An-Nisa and Al-Ma'idah", "Hud and Yusuf"], why: "He would not sleep until he recited Az-Zumar and Banu Isra'il, Aishah said." },
        { q: "What is another name for Surat Bani Isra'il?", a: "Al-Isra", wrong: ["Al-Kahf", "Maryam", "Ta-Ha"], why: "Banu Isra'il, the Children of Israel, is another name for Surat al-Isra, surah 17." },
        { q: "He ﷺ recited Az-Zumar before going to sleep.", tf: true, why: "He would not sleep until he recited Az-Zumar and Banu Isra'il, Aishah said." }
      ]
    },
    {
      slug: "written-before-creation",
      title: "Written before creation",
      line: "The end of Al-Baqarah was written before the heavens were made.",
      facts: ["Told by An-Nu'man ibn Bashir", "Two ayahs from a book Allah wrote", "Recited three nights, no Shaytan comes near"],
      source: hadith("tirmidhi", "2882", "An-Nu'man ibn Bashir", "Sahih (Al-Albani)", "An-Nu'man ibn Bashir said: the Prophet ﷺ said: Allah wrote a book two thousand years before He created the heavens and the earth, and sent down from it two ayahs to end Surat al-Baqarah. If they are recited in a home for three nights, no Shaytan comes near it.", "Allah wrote in a book two thousand years before He created the heavens and the earth"),
      difficulty: 1,
      questions: [
        { q: "How long before the heavens and earth did Allah write that book?", a: "Two thousand years", wrong: ["Two hundred years", "Ten years", "Seven days"], why: "Two thousand years before He created the heavens and the earth, he ﷺ said." },
        { q: "Who will not come near a home where they are recited for three nights?", a: "Shaytan", wrong: ["The angels", "The guests", "The neighbors"], why: "If they are recited for three nights in a home, no Shaitan shall come near it, he ﷺ said." },
        { q: "The last two ayahs of Al-Baqarah come from a book Allah wrote.", tf: true, why: "He sent down two Ayat from it to end Surat Al-Baqarah with, he ﷺ said." }
      ]
    },
    {
      slug: "beautiful-voices",
      title: "Beautiful voices",
      line: "He ﷺ told us to recite the Quran in beautiful voices.",
      facts: ["Told by Al-Bara ibn Azib", "Sunan an-Nasa'i 1016", "Try your best voice when you recite"],
      source: hadith("nasai", "1016", "Al-Bara ibn Azib", "Sahih (Al-Albani)", "Al-Bara ibn Azib said: the Messenger of Allah ﷺ said: make your voices beautiful when you recite the Quran.", "Make your voices beautiful when you recite Quran"),
      difficulty: 1,
      questions: [
        { q: "How did he ﷺ tell us to recite the Quran?", a: "In beautiful voices", wrong: ["In rushed voices", "In harsh voices", "In bored voices"], why: "Make your voices beautiful when you recite Quran, he ﷺ said." },
        { q: "When should we make our voices beautiful, he ﷺ said?", a: "When we recite the Quran", wrong: ["When we argue with others", "When we shout in the market", "When we tell jokes"], why: "Make your voices beautiful when you recite Quran, Al-Bara ibn Azib heard him ﷺ say." },
        { q: "We should recite the Quran in our most beautiful voice.", tf: true, why: "Make your voices beautiful when you recite Quran, he ﷺ said." }
      ]
    },
    {
      slug: "recite-and-rise",
      title: "Recite and rise",
      line: "The one who memorized the Quran will be told: recite and rise.",
      facts: ["Told by Abdullah ibn Amr", "Recite as you recited in the world", "Your rank is at the last ayah you recite"],
      source: hadith("tirmidhi", "2914", "Abdullah ibn Amr", "Hasan Sahih (Al-Albani)", "Abdullah ibn Amr said: the Prophet ﷺ said: it will be said to the one who memorized the Quran: recite and rise, and recite beautifully as you recited in the world, for your rank will be at the last ayah you recite.", "For indeed your rank shall be at the last Ayah you recited"),
      difficulty: 1,
      questions: [
        { q: "What will the one who memorized the Quran be told?", a: "Recite and rise up", wrong: ["Sit down and rest", "Wait at the gate", "Go back and learn"], why: "Recite, and rise up, recite as you would recite in the world, he ﷺ said." },
        { q: "Where will his rank be, he ﷺ said?", a: "At the last ayah he recites", wrong: ["At the first ayah he learned", "At the longest surah he knew", "At the middle of the Quran"], why: "For indeed your rank shall be at the last Ayah you recited, he ﷺ said." },
        { q: "He will be told to recite as he recited in the world.", tf: true, why: "Recite as you would recite in the world, he ﷺ said." }
      ]
    },
    {
      slug: "ayahs-at-night",
      title: "Ten, a hundred, a thousand",
      line: "Ten ayahs in night prayer: not written among the negligent.",
      facts: ["Told by Abdullah ibn Amr", "A hundred ayahs: among the obedient", "A thousand ayahs: among those of huge reward"],
      source: hadith("abudawud", "1398", "Abdullah ibn Amr", "Sahih (Al-Albani)", "Abdullah ibn Amr said: the Prophet ﷺ said: whoever prays at night with ten ayahs will not be written among the negligent; whoever prays at night with a hundred ayahs will be written among the obedient; and whoever prays at night with a thousand ayahs will be written among those with a huge reward.", "If anyone prays at night reciting regularly ten verses, he will not be recorded among the negligent"),
      difficulty: 2,
      questions: [
        { q: "How many ayahs at night keep you from the negligent, he ﷺ said?", a: "Ten ayahs", wrong: ["One ayah", "Three ayahs", "Seven ayahs"], why: "Ten verses at night; he will not be recorded among the negligent, he ﷺ said." },
        { q: "Which brings a place among those of huge reward?", a: "A thousand ayahs at night", wrong: ["Ten ayahs at night", "A hundred ayahs at night", "One ayah at night"], why: "A thousand verses at night: among those who receive huge rewards, he ﷺ said." },
        { q: "One who prays with a hundred ayahs at night is written among the obedient.", tf: true, why: "A hundred verses at night: recorded among those obedient to Allah, he ﷺ said." }
      ]
    },
    {
      slug: "heard-from-the-roof",
      title: "Heard from the roof",
      line: "Umm Hani heard him ﷺ reciting at night from her roof.",
      facts: ["Told by Umm Hani bint Abi Talib", "She was on the roof of her house", "His ﷺ recitation could be heard at night"],
      source: hadith("ibnmajah", "1349", "Umm Hani bint Abi Talib", "Hasan Sahih (Al-Albani)", "Umm Hani bint Abi Talib said: I used to hear the Prophet ﷺ reciting at night when I was on the roof of my house.", "reciting at night when I was on the roof of my house"),
      difficulty: 1,
      questions: [
        { q: "Where was Umm Hani when she heard his ﷺ recitation?", a: "On the roof of her house", wrong: ["In the market", "At the well", "On a journey"], why: "She heard him ﷺ reciting at night when she was on the roof of her house." },
        { q: "When did Umm Hani hear him ﷺ reciting?", a: "At night", wrong: ["At noon", "At sunrise", "At Asr time"], why: "I used to hear the Prophet ﷺ reciting at night, Umm Hani said." },
        { q: "Umm Hani could hear him ﷺ reciting from her house.", tf: true, why: "She heard him ﷺ reciting at night when she was on the roof of her house." }
      ]
    }
  ]
};

export const FOUNDATION_QURAN_UNITS: readonly DeepUnit[] = [QURAN];
