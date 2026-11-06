import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Al-Masad ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Masad 111:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_111_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Masad 111:${ayah}`,
    url: `https://quran.com/111:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 111:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q111 = (ayah: number) => quranQuote(111, ayah);


/** Ayahs 1 and 2: Abu Lahab rejected the call on the mountain, and his wealth will not help him. */
const MASAD_ONE: DeepUnit = {
  key: "masad1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-111",
  name: "Al-Masad, ayahs 1-2",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Masad",
  lessons: [
    {
      slug: "the-call-from-the-mountain",
      title: "The call from the mountain",
      line: "The Prophet ﷺ climbed a mountain and called Quraysh to listen.",
      facts: ["Al-Batha: a valley", "Quraysh gathered"],
      quote: q111(1),
      source: hadith("bukhari", "4972", "Ibn Abbas", "Sahih", "He climbed the mountain and asked Quraysh: if I told you an enemy would attack you, would you believe me?", "If I tell you that an enemy is going to attack you in the morning or in the evening"),
      difficulty: 1,
      questions: [
        { q: "Where did the Prophet ﷺ call Quraysh?", a: "On a mountain near Al-Batha", wrong: ["Inside his house", "At a far market", "On a ship"], why: "He went out towards Al-Batha and ascended the mountain." },
        { q: "What did he first ask them?", a: "Would they believe a warning from him", wrong: ["Would they pay him", "Would they travel with him", "Would they make him king"], why: "If I tell you that an enemy is going to attack you, will you believe me?" },
        { tf: true, q: "Quraysh said yes, they would believe him.", why: "They replied, Yes." }
      ]
    },
    {
      slug: "never-heard-a-lie",
      title: "Never heard a lie",
      line: "Even his enemies said they had never heard him lie.",
      facts: ["As-Sadiq: the truthful", "A plain warner"],
      quote: q111(1),
      source: hadith("bukhari", "4971", "Ibn Abbas", "Sahih", "Quraysh told him they had never heard him tell a lie; then he warned them of a coming punishment.", "We have never heard you telling a lie"),
      difficulty: 2,
      questions: [
        { q: "What did Quraysh say about his honesty?", a: "They never heard him lie", wrong: ["He lied sometimes", "They did not know him", "He was a poet"], why: "We have never heard you telling a lie." },
        { q: "What did he call himself to them?", a: "A plain warner", wrong: ["A rich trader", "A king", "A poet"], why: "I am a plain warner to you of a coming severe punishment." },
        { tf: false, q: "Abu Lahab thanked him for the warning.", why: "Abu Lahab said, May you perish! You gathered us only for this reason?" }
      ]
    },
    {
      slug: "who-was-abu-lahab",
      title: "Who was Abu Lahab?",
      line: "Abu Lahab was the Prophet's ﷺ uncle, yet he opposed him harshly.",
      facts: ["Name: Abdul-Uzza", "Lahab: flame, for his bright face"],
      quote: q111(1),
      source: ik(1, "Abu Lahab was an uncle of the Prophet ﷺ named Abdul-Uzza, called Abu Lahab because of the brightness of his face.", "he was only called Abu Lahab because of the brightness of his face"),
      difficulty: 2,
      questions: [
        { q: "How was Abu Lahab related to the Prophet ﷺ?", a: "He was his uncle", wrong: ["He was his cousin", "He was his neighbor", "He was his teacher"], why: "This man Abu Lahab was one of the uncles of the Messenger of Allah." },
        { q: "Why was he called Abu Lahab?", a: "His face was bright", wrong: ["He lit fires", "He was a cook", "He loved the sun"], why: "He was only called Abu Lahab because of the brightness of his face." },
        { tf: true, q: "Being a relative did not stop him from opposing Islam.", why: "He used to often cause harm to the Messenger of Allah." }
      ]
    },
    {
      slug: "a-prayer-and-news",
      title: "A prayer and news",
      line: "First comes a prayer against him, then news of his end.",
      facts: ["Tabbat: may they perish", "Wa tabb: and he perished"],
      quote: q111(1),
      source: ik(1, "Perish the two hands of Abu Lahab is a supplication against him; and perish he is information about him.", "The first part is a supplication against him and the second is information about him"),
      difficulty: 3,
      questions: [
        { q: "What is the first part of 111:1, per Ibn Kathir?", a: "A supplication against him", wrong: ["A praise of him", "A story of his youth", "A rule on trade"], why: "The first part is a supplication against him." },
        { q: "What is the second part?", a: "Information about him", wrong: ["A question to him", "A gift for him", "A greeting"], why: "The second is information about him." },
        { tf: true, q: "The surah answered Abu Lahab's own words, May you perish.", why: "Abu Lahab said, May you perish! Thus, Allah revealed: Perish the two hands of Abu Lahab." }
      ]
    },
    {
      slug: "wealth-will-not-help",
      title: "Wealth will not help",
      line: "His money and his children could not save him from Allah.",
      facts: ["Mal: wealth", "Kasab: his children"],
      quote: q111(2),
      source: ik(2, "Ibn Abbas and others said Kasab in the ayah means his children.", "Kasab means his children"),
      difficulty: 2,
      questions: [
        { q: "What will not benefit him, per 111:2?", a: "His wealth and his children", wrong: ["His prayers", "His good deeds", "His charity"], why: "His wealth and his children will not benefit him!" },
        { q: "What does Kasab mean, per Ibn Abbas?", a: "His children", wrong: ["His camels", "His house", "His sword"], why: "Kasab means his children." },
        { tf: false, q: "Money can buy safety on the Day of Judgment.", why: "His wealth and his children will not benefit him!" }
      ]
    }
  ]
};

/** Ayahs 3 to 5: a Fire of flames, and his wife who helped him, with a rope of palm fiber. */
const MASAD_TWO: DeepUnit = {
  key: "masad2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-111",
  name: "Al-Masad, ayahs 3-5",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Masad",
  lessons: [
    {
      slug: "a-fire-of-flames",
      title: "A Fire of flames",
      line: "Abu Lahab, whose name means flame, will meet a Fire of flames.",
      facts: ["Dhat lahab: of flames", "A fitting end"],
      quote: q111(3),
      source: ik(3, "He will enter a Fire full of flames, meaning it has flames.", "it has flames"),
      difficulty: 2,
      questions: [
        { q: "What does 111:3 say he will enter?", a: "A Fire full of flames", wrong: ["A garden", "A palace", "A river"], why: "He will enter a Fire full of flames!" },
        { q: "Which word links his name and the Fire?", a: "Lahab, flame", wrong: ["Nur, light", "Ma, water", "Ard, earth"], why: "He will enter a Fire full of flames (Lahab)." },
        { tf: true, q: "Opposing the truth to the end has a bad outcome.", why: "He will enter a Fire full of flames!" }
      ]
    },
    {
      slug: "family-cannot-save-you",
      title: "Family cannot save you",
      line: "Even the Prophet's ﷺ family must save themselves through faith.",
      facts: ["Each soul for itself", "Faith, not family"],
      quote: q111(3),
      source: hadith("muslim", "204", "Abu Hurairah", "Sahih", "He warned his own tribes and even Fatimah to rescue themselves, saying he had no power to protect them from Allah.", "for I have no power"),
      difficulty: 3,
      questions: [
        { q: "Whom did he warn by name, per the hadith?", a: "His tribes and even Fatimah", wrong: ["Only strangers", "Only kings", "Only traders"], why: "O Fatimah, rescue thyself from the Fire." },
        { q: "Why must each person save themselves?", a: "He had no power to protect them from Allah", wrong: ["He did not care", "He was too busy", "He was far away"], why: "For I have no power to protect you from Allah." },
        { tf: false, q: "Being related to the Prophet ﷺ guarantees Paradise.", why: "I have no power to protect you from Allah." }
      ]
    },
    {
      slug: "his-wife-umm-jamil",
      title: "His wife, Umm Jamil",
      line: "His wife Umm Jamil stood by him in fighting the truth.",
      facts: ["Arwah bint Harb", "Sister of Abu Sufyan"],
      quote: q111(4),
      source: ik(4, "His wife Umm Jamil, Arwah bint Harb, was supportive of her husband in his disbelief, rejection and obstinacy.", "She was supportive of her husband in his disbelief, rejection and obstinacy"),
      difficulty: 2,
      questions: [
        { q: "Who is the wife in 111:4?", a: "Umm Jamil", wrong: ["Khadijah", "Sumayyah", "Asma"], why: "His wife was among the leading women of the Quraysh and she was known as Umm Jamil." },
        { q: "Whose sister was Umm Jamil?", a: "Abu Sufyan", wrong: ["Abu Bakr", "Umar", "Bilal"], why: "She was the sister of Abu Sufyan." },
        { tf: true, q: "She helped her husband in his rejection.", why: "She was supportive of her husband in his disbelief, rejection and obstinacy." }
      ]
    },
    {
      slug: "a-rope-of-palm-fiber",
      title: "A rope of palm fiber",
      line: "Masad is a twisted rope made from palm fibers.",
      facts: ["Masad: palm-fiber rope", "Hablun: rope"],
      quote: q111(5),
      source: ik(5, "Al-Jawhari said Al-Masad refers to fibers; it is also a rope made from fibers or palm leaves.", "it is also a rope made from fibers or palm leaves"),
      difficulty: 3,
      questions: [
        { q: "What is in her neck, per 111:5?", a: "A twisted rope of Masad", wrong: ["A gold necklace", "A silk scarf", "A pearl chain"], why: "In her neck is a twisted rope of Masad." },
        { q: "What is Masad made from, per Al-Jawhari?", a: "Fibers or palm leaves", wrong: ["Silver", "Glass", "Wool only"], why: "It is also a rope made from fibers or palm leaves." },
        { tf: true, q: "Al-Masad is the surah named after the rope.", why: "In her neck is a twisted rope of Masad." }
      ]
    },
    {
      slug: "a-sign-that-came-true",
      title: "A sign that came true",
      line: "Allah foretold they would not believe, and so it was.",
      facts: ["As-Sa'di explains", "Only Allah knows the unseen"],
      quote: q111(5),
      source: saadi(111, 5, "As-Sa'di says the surah came while Abu Lahab and his wife were alive and told they would never accept Islam, and it happened just so.", "ومن لازم ذلك أنهما لا يسلمان"),
      difficulty: 2,
      questions: [
        { q: "Were Abu Lahab and his wife alive when it came?", a: "Yes, both", wrong: ["No, both had died", "Only his wife", "Only Abu Lahab"], why: "The surah came while they had not yet died." },
        { q: "What did the surah show about them?", a: "They would not believe", wrong: ["They would become rich", "They would move away", "They would win"], why: "It follows that they would not accept Islam." },
        { tf: true, q: "Al-Masad is a clear sign of the Quran's truth.", why: "It happened as the Knower of the unseen told. As-Sa'di on 111:5." }
      ]
    }
  ]
};

export const MASAD_UNITS: readonly DeepUnit[] = [MASAD_ONE, MASAD_TWO];
