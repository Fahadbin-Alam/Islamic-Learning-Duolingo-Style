import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah An-Nasr ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on An-Nasr 110:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_110_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on An-Nasr 110:${ayah}`,
    url: `https://quran.com/110:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 110:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q110 = (ayah: number) => quranQuote(110, ayah);


/** Ayahs 1 and 2: Allah's help and the Conquest of Makkah, and people entering Islam in crowds. */
const NASR_ONE: DeepUnit = {
  key: "nasr1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-110",
  name: "An-Nasr, ayahs 1-2",
  kind: "skill",
  lessonType: "surah",
  surahName: "An-Nasr",
  lessons: [
    {
      slug: "help-and-the-conquest",
      title: "Help and the Conquest",
      line: "Al-Fath in An-Nasr is the Conquest of Makkah.",
      facts: ["Nasr: help, victory", "Al-Fath: the Conquest"],
      quote: q110(1),
      source: ik(1, "Al-Fath in An-Nasr is the conquest of Makkah, and there is only one view concerning it.", "there is only one view concerning it"),
      difficulty: 1,
      questions: [
        { q: "What comes in 110:1?", a: "The help of Allah and the Conquest", wrong: ["A great flood", "A long winter", "A new king"], why: "When there comes the help of Allah and the Conquest." },
        { q: "Which conquest is meant, per Ibn Kathir?", a: "The Conquest of Makkah", wrong: ["The Conquest of Persia", "The Conquest of Egypt", "The Conquest of Rome"], why: "The meaning of Al-Fath is the conquest of Makkah." },
        { tf: true, q: "Scholars hold only one view on what Al-Fath means.", why: "There is only one view concerning it." }
      ]
    },
    {
      slug: "what-ibn-abbas-understood",
      title: "What Ibn Abbas understood",
      line: "Young Ibn Abbas saw a sign the Prophet's ﷺ life was ending.",
      facts: ["Umar tested the elders", "Knowledge over age"],
      quote: q110(1),
      source: hadith("bukhari", "4970", "Ibn Abbas", "Sahih", "Umar seated young Ibn Abbas with the elders of Badr; only Ibn Abbas saw An-Nasr as a sign of the Prophet's ﷺ death.", "used to make me sit with the elderly men who had fought in the Battle of Badr"),
      difficulty: 2,
      questions: [
        { q: "Whom did Umar seat Ibn Abbas with?", a: "The elders of Badr", wrong: ["The children", "The traders", "The poets"], why: "Umar used to make me sit with the elderly men who had fought in the Battle of Badr." },
        { q: "What did Ibn Abbas say the surah signaled?", a: "The end of the Prophet's ﷺ life", wrong: ["A coming war", "A good harvest", "A new city"], why: "That is the sign of the death of Allah's Messenger which Allah informed him of." },
        { tf: false, q: "Umar disagreed with Ibn Abbas.", why: "Umar said: I do not know anything about it other than what you have said." }
      ]
    },
    {
      slug: "people-in-crowds",
      title: "People in crowds",
      line: "After Makkah, whole tribes entered Islam in great crowds.",
      facts: ["Afwaj: crowds", "Within two years"],
      quote: q110(2),
      source: ik(2, "After Makkah was conquered, within two years the peninsula of the Arabs was laden with faith.", "the peninsula of the Arabs was laden with faith"),
      difficulty: 2,
      questions: [
        { q: "How did people enter Islam, per 110:2?", a: "In crowds", wrong: ["One by one, secretly", "Not at all", "Only by force"], why: "And you see that the people enter Allah's religion in crowds." },
        { q: "How long until Arabia was full of faith, per Ibn Kathir?", a: "Less than two years", wrong: ["Fifty years", "Ten years", "One hundred years"], why: "Two years did not pass before the peninsula of the Arabs was laden with faith." },
        { tf: true, q: "Many tribes waited for Makkah before accepting Islam.", why: "The different areas of the Arabs were waiting for the conquest of Makkah." }
      ]
    },
    {
      slug: "waiting-for-makkah",
      title: "Waiting for Makkah",
      line: "Tribes said: if he beats his people, he is a true Prophet.",
      facts: ["Watching Quraysh", "Rushing to Islam"],
      quote: q110(2),
      source: hadith("bukhari", "4302", "Amr bin Salamah", "Sahih", "The Arabs delayed Islam until Makkah was conquered; then every tribe rushed to embrace Islam.", "every tribe rushed to embrace Islam"),
      difficulty: 3,
      questions: [
        { q: "What were the tribes waiting for?", a: "The Conquest of Makkah", wrong: ["A rainy season", "A new market", "A royal wedding"], why: "The Arabs delayed their conversion to Islam till the Conquest of Mecca." },
        { q: "What happened when Makkah was conquered?", a: "Every tribe rushed to Islam", wrong: ["Tribes left Arabia", "Tribes went to war", "Nothing changed"], why: "When Mecca was conquered, then every tribe rushed to embrace Islam." },
        { tf: true, q: "Amr bin Salamah's father hurried to accept Islam.", why: "My father hurried to embrace Islam before the other members of my tribe." }
      ]
    }
  ]
};

/** Ayah 3: glorify your Lord with praise and ask His forgiveness; He accepts repentance. */
const NASR_TWO: DeepUnit = {
  key: "nasr2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-110",
  name: "An-Nasr, ayah 3",
  kind: "skill",
  lessonType: "surah",
  surahName: "An-Nasr",
  lessons: [
    {
      slug: "praise-and-forgiveness",
      title: "Praise and forgiveness",
      line: "At the moment of victory, praise Allah and ask His forgiveness.",
      facts: ["Tasbih: glorifying", "Istighfar: seeking forgiveness"],
      quote: q110(3),
      source: ik(3, "Some of the elders said: we were commanded to praise Allah and seek His forgiveness when He helps us and gives us victory.", "We were commanded to praise Allah and seek His forgiveness"),
      difficulty: 1,
      questions: [
        { q: "What does 110:3 command?", a: "Glorify your Lord and ask forgiveness", wrong: ["Celebrate with feasts", "Build a palace", "Rest from worship"], why: "So, glorify the praises of your Lord, and ask His forgiveness." },
        { q: "When should we praise Allah, per the elders?", a: "When He helps us and gives victory", wrong: ["Only when sad", "Only in Ramadan", "Only when old"], why: "We were commanded to praise Allah and seek His forgiveness when He helps us." },
        { tf: false, q: "Victory is a time to boast about ourselves.", why: "We were commanded to praise Allah and seek His forgiveness when He helps us." }
      ]
    },
    {
      slug: "in-ruku-and-sujud",
      title: "In ruku and sujud",
      line: "In bowing and prostration he often said Subhanaka Allahumma.",
      facts: ["Ruku: bowing", "Sujud: prostration"],
      quote: q110(3),
      source: hadith("bukhari", "4968", "Aishah", "Sahih", "He often said in bowing and prostration: Subhanaka Allahumma Rabbana wa bihamdika, Allahumma ighfir li.", "used to say very often in bowing and prostration"),
      difficulty: 2,
      questions: [
        { q: "Where did he say Subhanaka Allahumma?", a: "In bowing and prostration", wrong: ["Only at the market", "Only on journeys", "Only at meals"], why: "He used to say very often in bowing and prostration." },
        { q: "What does Allahumma ighfir li mean?", a: "O Allah, forgive me", wrong: ["O Allah, feed me", "O Allah, make me rich", "O Allah, make me famous"], why: "O Allah, forgive me." },
        { tf: true, q: "He did so to act on the command of the Quran.", why: "According to the order of the Quran." }
      ]
    },
    {
      slug: "the-sign-in-his-ummah",
      title: "The sign in his Ummah",
      line: "When the promised sign came, he praised and sought pardon.",
      facts: ["A promised sign", "Subhan Allah wa bihamdihi"],
      quote: q110(3),
      source: hadith("muslim", "484", "Aishah", "Sahih", "He said his Lord told him he would see a sign in his Ummah, and when he saw it he would glorify and seek forgiveness.", "My Lord informed me that I would soon see a sign in my Ummah"),
      difficulty: 3,
      questions: [
        { q: "What did his Lord tell him he would see?", a: "A sign in his Ummah", wrong: ["A new star", "A great flood", "A golden city"], why: "My Lord informed me that I would soon see a sign in my Ummah." },
        { q: "What was the sign, per the hadith?", a: "Allah's help and victory", wrong: ["An eclipse", "A strong wind", "A dream"], why: "Indeed I saw it: When Allah's help and victory came." },
        { tf: true, q: "Aishah noticed him repeating these words often.", why: "I see that you often repeat the saying Subhan Allahi bihamdihi astaghfirullahi." }
      ]
    },
    {
      slug: "he-accepts-repentance",
      title: "He accepts repentance",
      line: "Allah is At-Tawwab: He keeps accepting all who turn back.",
      facts: ["At-Tawwab: Accepter of repentance", "Never too late"],
      quote: q110(3),
      source: ik(3, "His Lord commanded him to glorify His praises and seek His forgiveness, for He is the One Who accepts repentance.", "for He is the One Who accepts repentance"),
      difficulty: 2,
      questions: [
        { q: "How does 110:3 end?", a: "He accepts repentance and forgives", wrong: ["He is swift to punish", "He is far away", "He needs nothing"], why: "Verily, He is the One Who accepts the repentance and Who forgives." },
        { q: "What does At-Tawwab mean?", a: "The One Who accepts repentance", wrong: ["The One Who sleeps", "The One Who forgets", "The One Who is tired"], why: "For He is the One Who accepts repentance." },
        { tf: false, q: "Allah stops accepting repentance after many sins.", why: "He is the One Who accepts the repentance and Who forgives." }
      ]
    }
  ]
};

export const NASR_UNITS: readonly DeepUnit[] = [NASR_ONE, NASR_TWO];
