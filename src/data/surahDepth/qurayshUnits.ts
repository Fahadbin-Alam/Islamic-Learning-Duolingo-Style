import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Quraysh ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Quraysh 106:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_106_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Quraysh 106:${ayah}`,
    url: `https://quran.com/106:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 106:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q106 = (ayah: number) => quranQuote(106, ayah);


/** Ayahs 1 and 2: Allah brought the Quraysh together and kept their winter and summer journeys safe. */
const QURAYSH_ONE: DeepUnit = {
  key: "quraysh1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-106",
  name: "Quraysh, ayahs 1-2",
  kind: "skill",
  lessonType: "surah",
  surahName: "Quraysh",
  lessons: [
    {
      slug: "linked-to-al-fil",
      title: "Linked to Al-Fil",
      line: "Quraysh continues the story of the Elephant.",
      facts: ["Two separate surahs", "One connected meaning"],
      quote: q106(1),
      source: ik(1, "Quraysh is a separate surah, yet directly related to Al-Fil before it, as Ibn Ishaq and Ibn Zayd explained.", "directly related to the one which precedes it"),
      difficulty: 1,
      questions: [
        { q: "Which surah is Quraysh linked to?", a: "Al-Fil, just before it", wrong: ["Al-Fatihah", "Al-Kahf", "Yasin"], why: "This Surah is directly related to the one which precedes it." },
        { q: "What separates the two surahs in the Mushaf?", a: "Bismillah written between them", wrong: ["A blank page", "A picture", "Nothing at all"], why: "They wrote In the Name of Allah between these two Surahs." },
        { tf: false, q: "Quraysh and Al-Fil are one single surah.", why: "The consensus of the Muslims is that they are two separate and independent Surahs." }
      ]
    },
    {
      slug: "ilaf-bringing-together",
      title: "Ilaf: bringing together",
      line: "Allah saved Makkah so the Quraysh could live united and safe.",
      facts: ["Ilaf: uniting, taming", "Safe in their city"],
      quote: q106(1),
      source: ik(1, "Allah stopped the Elephant to gather the Quraysh, to unite them and bring them together safely in their city.", "to unite them and bring them together safely in their city"),
      difficulty: 1,
      questions: [
        { q: "What does Ilaf mean, per Ibn Kathir?", a: "Uniting them and bringing them together", wrong: ["Fighting them", "Sending them away", "Taxing them"], why: "To unite them and bring them together safely in their city." },
        { q: "Why did Allah stop the Elephant, per Ibn Kathir?", a: "To keep the Quraysh united and safe", wrong: ["To punish the Quraysh", "To move the Ka'bah", "To end all trade"], why: "In order to gather the Quraysh and bring them together safely." },
        { tf: true, q: "Ibn Jarir said the opening shows amazement at the favor.", why: "You should be amazed at the uniting of the Quraysh and My favor upon them." }
      ]
    },
    {
      slug: "winter-and-summer-journeys",
      title: "Winter and summer journeys",
      line: "Quraysh traders went to Yemen in winter and Ash-Sham in summer.",
      facts: ["Winter: Yemen", "Summer: Ash-Sham"],
      quote: q106(2),
      source: ik(2, "Their winter journey was to Yemen and their summer journey to Ash-Sham, for trade.", "during their journey in the winter to Yemen and in the summer to Ash-Sham"),
      difficulty: 2,
      questions: [
        { q: "Where did the winter caravan go?", a: "Yemen", wrong: ["Ash-Sham", "Egypt", "Persia"], why: "Their journey in the winter to Yemen." },
        { q: "Where did the summer caravan go?", a: "Ash-Sham", wrong: ["Yemen", "India", "Abyssinia"], why: "And in the summer to Ash-Sham." },
        { tf: true, q: "The journeys were mostly for trade.", why: "Through trade and other than that." }
      ]
    },
    {
      slug: "honored-travelers",
      title: "Honored travelers",
      line: "People respected the Quraysh as neighbors of Allah's House.",
      facts: ["People of the sanctuary", "Safe on the road"],
      quote: q106(2),
      source: ik(2, "They traveled safely because people respected them as residents of Allah's sanctuary; whoever knew them honored them.", "whoever knew them would honor them"),
      difficulty: 2,
      questions: [
        { q: "Why were the Quraysh safe on the road?", a: "They lived by Allah's sanctuary", wrong: ["They had huge armies", "They paid every tribe", "They traveled at night"], why: "Because they were the residents of Allah's sanctuary." },
        { q: "Who else was safe, per Ibn Kathir?", a: "Those who traveled with them", wrong: ["Nobody else", "Only their camels", "Only kings"], why: "Even those who traveled with them would be safe because of them." },
        { tf: true, q: "Makkah is a secure sanctuary, as 29:67 says.", why: "Have they not seen that We have made it a secure sanctuary?" }
      ]
    }
  ]
};

/** Ayahs 3 and 4: so worship the Lord of this House, Who fed them and kept them safe. */
const QURAYSH_TWO: DeepUnit = {
  key: "quraysh2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-106",
  name: "Quraysh, ayahs 3-4",
  kind: "skill",
  lessonType: "surah",
  surahName: "Quraysh",
  lessons: [
    {
      slug: "worship-the-lord-of-the-house",
      title: "Worship the Lord of the House",
      line: "Thank Allah for His gifts by worshipping Him alone.",
      facts: ["Rabb: Lord", "Al-Bayt: the House"],
      quote: q106(3),
      source: ik(3, "Let them single Him out for worship, just as He has given them a safe sanctuary and a Sacred House.", "then let them single Him out for worship"),
      difficulty: 1,
      questions: [
        { q: "Whom should the Quraysh worship, per 106:3?", a: "The Lord of this House", wrong: ["Their idols", "Their kings", "Their ancestors"], why: "So, let them worship the Lord of this House." },
        { q: "How should they worship Him, per Ibn Kathir?", a: "Him alone", wrong: ["With idols too", "Only in winter", "Only in summer"], why: "Let them single Him out for worship." },
        { tf: true, q: "Worship is a way of thanking Allah for His favors.", why: "Allah directs them to be grateful for this magnificent favor." }
      ]
    },
    {
      slug: "allahs-right-on-his-servants",
      title: "Allah's right on His servants",
      line: "We owe Allah worship, joining no one with Him.",
      facts: ["Allah's right on us", "Our hope from Him"],
      quote: q106(3),
      source: hadith("bukhari", "2856", "Mu'adh ibn Jabal", "Sahih", "Allah's right on His slaves is that they worship Him alone and worship none besides Him.", "should not worship any besides Him"),
      difficulty: 2,
      questions: [
        { q: "What is Allah's right on His servants?", a: "To worship Him alone", wrong: ["To travel often", "To build houses", "To trade widely"], why: "They should worship Him and should not worship any besides Him." },
        { q: "Who rode with the Prophet ﷺ when he asked?", a: "Mu'adh", wrong: ["Bilal", "Zayd", "Anas"], why: "I was a companion rider of the Prophet ﷺ on a donkey called Ufair." },
        { tf: false, q: "Worshipping idols beside Allah is allowed.", why: "Allah's right on His slaves is that they should not worship any besides Him." }
      ]
    },
    {
      slug: "fed-against-hunger",
      title: "Fed against hunger",
      line: "Allah fed the Quraysh in a dry valley with no crops.",
      facts: ["Jui: hunger", "Atam: fed"],
      quote: q106(4),
      source: ik(4, "He is the Lord of the House and the One Who feeds them against hunger.", "He is the One Who feeds them against hunger"),
      difficulty: 2,
      questions: [
        { q: "What did Allah save them from, per 106:4?", a: "Hunger", wrong: ["Rain", "Snow", "Wind"], why: "Who has fed them against hunger." },
        { q: "Who feeds them, per Ibn Kathir?", a: "The Lord of the House", wrong: ["Their idols", "The traders", "The king of Yemen"], why: "He is the Lord of the House and He is the One Who feeds them against hunger." },
        { tf: true, q: "Every meal we eat is a gift from Allah.", why: "He is the One Who feeds them against hunger." }
      ]
    },
    {
      slug: "safe-from-fear",
      title: "Safe from fear",
      line: "Allah gave them safety, so worship Him without partners.",
      facts: ["Khawf: fear", "Amn: safety"],
      quote: q106(4),
      source: ik(4, "He favors them with safety and gentleness, so they should worship Him alone, without any partner.", "He favors them with safety and gentleness"),
      difficulty: 2,
      questions: [
        { q: "What did Allah make them safe from?", a: "Fear", wrong: ["Rain", "Heat", "Work"], why: "And has made them safe from fear." },
        { q: "Whoever accepts the command gets what, per Ibn Kathir?", a: "Safety in this life and the next", wrong: ["Gold only", "Fame only", "Nothing"], why: "Allah will give him safety in both this life and the Hereafter." },
        { tf: false, q: "Worshipping idols too is fine if we thank Allah.", why: "They should single Him out for worship alone, without any partner." }
      ]
    },
    {
      slug: "praise-him-for-food",
      title: "Praise Him for food",
      line: "Allah is pleased when we say Alhamdulillah as we eat and drink.",
      facts: ["Alhamdulillah: praise Allah", "Each bite and sip"],
      quote: q106(4),
      source: hadith("muslim", "2734", "Anas ibn Malik", "Sahih", "Allah is pleased with His servant who praises Him while taking a morsel of food and while drinking.", "while taking a morsel of food and while drinking"),
      difficulty: 2,
      questions: [
        { q: "What pleases Allah at mealtime, per the hadith?", a: "Saying Alhamdulillah", wrong: ["Eating fast", "Eating alone", "Wasting food"], why: "Allah is pleased with His servant who says Al-Hamdu lillah." },
        { q: "When should we praise Him, per the hadith?", a: "When eating and drinking", wrong: ["Only on Eid", "Only when full", "Only at night"], why: "While taking a morsel of food and while drinking." },
        { tf: true, q: "Anas ibn Malik narrated the hadith.", why: "Anas b. Malik reported it." }
      ]
    },
    {
      slug: "good-in-every-affair",
      title: "Good in every affair",
      line: "Believers give thanks in ease and stay patient in hardship.",
      facts: ["Shukr: thanks", "Sabr: patience"],
      quote: q106(4),
      source: hadith("muslim", "2999", "Suhaib", "Sahih", "A believer thanks Allah when good comes and is patient in trouble, so there is good for him in every affair.", "if he has an occasion to feel delight, he thanks"),
      difficulty: 3,
      questions: [
        { q: "What does a believer do when good comes?", a: "Thanks Allah", wrong: ["Boasts", "Forgets Allah", "Hides it"], why: "If he has an occasion to feel delight, he thanks God." },
        { q: "What does a believer do in trouble?", a: "Stays patient", wrong: ["Complains loudly", "Gives up", "Blames others"], why: "If he gets into trouble and endures it patiently, there is good for him." },
        { tf: true, q: "Every affair holds good for a believer.", why: "There is good in every affair of his." }
      ]
    }
  ]
};

export const QURAYSH_UNITS: readonly DeepUnit[] = [QURAYSH_ONE, QURAYSH_TWO];
