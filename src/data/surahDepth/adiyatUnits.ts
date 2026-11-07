import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Al-'Adiyat ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-'Adiyat 100:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_100_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-'Adiyat 100:${ayah}`,
    url: `https://quran.com/100:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 100:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q100 = (ayah: number) => quranQuote(100, ayah);


/** Ayahs 1 to 5: Allah swears by the running horses, their sparks, the dawn, the dust and the charge. */
const ADIYAT_ONE: DeepUnit = {
  key: "adiyat1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-100",
  name: "Al-'Adiyat, ayahs 1-5",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-'Adiyat",
  lessons: [
    {
      slug: "by-the-running-horses",
      title: "By the running horses",
      line: "Allah swears by horses running hard in His path, panting.",
      facts: ["Al-Adiyat: those that run", "Dabha: the panting sound"],
      quote: q100(1),
      source: ik(1, "Allah swears by the horses as they gallop in His path, running and panting with the sound a horse makes when it runs.", "Allah swears by the horses"),
      difficulty: 1,
      questions: [
        { q: "By what does Allah swear in 100:1, per Ibn Kathir?", a: "Running horses", wrong: ["Flying birds", "Swimming fish", "Walking camels"], why: "Allah swears by the horses when they are made to gallop." },
        { q: "What is the snorting sound, per Ibn Kathir?", a: "The horse panting as it runs", wrong: ["A lion roaring", "Thunder", "A drum"], why: "The sound that is heard from the horse when it runs." },
        { tf: true, q: "The horses run in the path of Allah.", why: "When they are made to gallop into battle in His path." }
      ]
    },
    {
      slug: "sparks-of-fire",
      title: "Sparks of fire",
      line: "Their hooves strike the rocks so hard that sparks fly.",
      facts: ["Al-Muriyat: spark makers", "Hooves on rock"],
      quote: q100(2),
      source: ik(2, "Their hooves strike the rocks, which makes sparks of fire fly from them.", "the striking of their hooves on the rocks, which causes sparks of fire to fly from them"),
      difficulty: 1,
      questions: [
        { q: "What do the horses strike in 100:2?", a: "Sparks of fire", wrong: ["Drops of rain", "Bells", "Lamps"], why: "Striking sparks of fire." },
        { q: "What makes the sparks, per Ibn Kathir?", a: "Hooves hitting rocks", wrong: ["Swords clashing", "Lightning", "Torches"], why: "The striking of their hooves on the rocks." },
        { tf: false, q: "The sparks come from torches the riders carry.", why: "The striking of their hooves on the rocks, which causes sparks of fire to fly from them." }
      ]
    },
    {
      slug: "at-dawn",
      title: "At dawn",
      line: "They charge in the early morning, as Ibn Kathir explains.",
      facts: ["Subha: early morning", "Al-Mughirat: the chargers"],
      quote: q100(3),
      source: ik(3, "The charge was made in the early morning, as the Messenger of Allah ﷺ used to set out early.", "the raid that is carried out in the early morning time"),
      difficulty: 2,
      questions: [
        { q: "When do they charge, per 100:3?", a: "At dawn", wrong: ["At noon", "At sunset", "At midnight"], why: "And scouring to the raid at dawn." },
        { q: "What does Ibn Kathir say about the time?", a: "Early morning", wrong: ["Late night", "After Asr", "At Isha"], why: "The raid that is carried out in the early morning time." },
        { tf: true, q: "Ibn Abbas said they went out in the morning for Allah.", why: "This means the invasion of the horses in the morning in the way of Allah." }
      ]
    },
    {
      slug: "he-listened-for-the-adhan",
      title: "He listened for the Adhan",
      line: "Hearing the Adhan from a town, he left it in peace.",
      facts: ["The Adhan marks Muslims", "He waited till morning"],
      quote: q100(3),
      source: hadith("bukhari", "610", "Anas ibn Malik", "Sahih", "He waited till morning; if he heard the Adhan from a people he left them alone, and if not, he went ahead.", "if he heard Adhan he would postpone the attack"),
      difficulty: 2,
      questions: [
        { q: "What did he listen for in the morning?", a: "The Adhan", wrong: ["Drums", "Horses", "Bells"], why: "He would wait and see: if he heard Adhan he would postpone." },
        { q: "What did he do if he heard it?", a: "Left them alone", wrong: ["Went faster", "Called his army", "Took their goods"], why: "If he heard Adhan he would postpone the attack." },
        { tf: true, q: "He never let them start before morning.", why: "He never allowed us to attack till morning." }
      ]
    },
    {
      slug: "clouds-of-dust",
      title: "Clouds of dust",
      line: "The galloping horses stir up clouds of dust.",
      facts: ["Naq: dust", "Athurna: they raise"],
      quote: q100(4),
      source: ik(4, "The horses raise dust at the place of battle as they run.", "dust at the place of the battle with the horses"),
      difficulty: 2,
      questions: [
        { q: "What do they raise in 100:4?", a: "Dust in clouds", wrong: ["Flags", "Tents", "Songs"], why: "And raise the dust in clouds the while." },
        { q: "Where is the dust, per Ibn Kathir?", a: "At the place of battle", wrong: ["In a city", "On a ship", "In a garden"], why: "Dust at the place of the battle with the horses." },
        { tf: true, q: "Running hooves stir up the dust.", why: "The dust is stirred up by it." }
      ]
    },
    {
      slug: "into-the-midst",
      title: "Into the midst",
      line: "Then they all charge together into the middle.",
      facts: ["Wasatna: into the middle", "Jamaa: all together"],
      quote: q100(5),
      source: ik(5, "Then they are all together in the middle of that place; Ibn Abbas and others said into the midst of the enemy.", "then are all in the middle of that spot, together"),
      difficulty: 3,
      questions: [
        { q: "Where do they go in 100:5?", a: "Into the midst", wrong: ["Back home", "Up a hill", "Into the sea"], why: "And penetrating forthwith as one into the midst." },
        { q: "How do they enter, per Ibn Kathir?", a: "All together", wrong: ["One by one", "Very slowly", "In secret"], why: "Then are all in the middle of that spot, together." },
        { q: "What do the five oaths lead to?", a: "A truth about man in 100:6", wrong: ["A story of a king", "A list of foods", "A prayer time"], why: "This is the subject what is being sworn about." }
      ]
    }
  ]
};

/** Ayahs 6 to 11: man is ungrateful and loves wealth, until the graves open and what is in the hearts comes out. */
const ADIYAT_TWO: DeepUnit = {
  key: "adiyat2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-100",
  name: "Al-'Adiyat, ayahs 6-11",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-'Adiyat",
  lessons: [
    {
      slug: "man-is-ungrateful",
      title: "Man is ungrateful",
      line: "The oaths swear that man is ungrateful to his Lord.",
      facts: ["Kanud: ungrateful", "The point of the oaths"],
      quote: q100(6),
      source: ik(6, "The oaths are about this: man is ungrateful for the favors of his Lord and rejects them.", "is ungrateful for the favors of His Lord and he rejects them"),
      difficulty: 1,
      questions: [
        { q: "What does 100:6 say about man?", a: "He is ungrateful to his Lord", wrong: ["He is always thankful", "He is very strong", "He never forgets"], why: "Verily, man is ungrateful to his Lord." },
        { q: "What does Al-Kanud mean, per many Salaf?", a: "Ungrateful", wrong: ["Brave", "Tired", "Hungry"], why: "Al-Kanud means ungrateful." },
        { tf: true, q: "100:6 is what the oaths are sworn about.", why: "This is the subject what is being sworn about." }
      ]
    },
    {
      slug: "holding-back-what-is-owed",
      title: "Holding back what is owed",
      line: "Kanud: one who holds back the good he owes his Lord.",
      facts: ["As-Sa'di explains", "Unless Allah guides him"],
      quote: q100(6),
      source: saadi(100, 6, "As-Sa'di says kanud is one who holds back the rights he owes his Lord; the self tends to laziness, except those Allah guides.", "لمنوع للخير الذي عليه لربه"),
      difficulty: 2,
      questions: [
        { q: "What is kanud, per as-Sa'di?", a: "Holding back what is owed", wrong: ["Running fast", "Giving freely", "Sleeping long"], why: "One who withholds the good he owes his Lord." },
        { q: "Who is saved from being kanud?", a: "Whom Allah guides", wrong: ["The rich", "The strong", "Nobody"], why: "Except the one Allah guides, says as-Sa'di." },
        { tf: true, q: "We owe Allah duties of the body and of wealth.", why: "Rights of wealth and body. As-Sa'di on 100:6." }
      ]
    },
    {
      slug: "counting-troubles",
      title: "Counting troubles",
      line: "The ungrateful count their troubles and forget Allah's gifts.",
      facts: ["Count your blessings", "Do not only count troubles"],
      quote: q100(6),
      source: ik(6, "Al-Hasan said Al-Kanud is the one who counts the troubles that hit him and forgets the favors of Allah.", "Al-Kanud is the one who counts the calamities"),
      difficulty: 2,
      questions: [
        { q: "Who is Al-Kanud, per Al-Hasan?", a: "One who counts troubles and forgets favors", wrong: ["One who counts coins", "One who counts stars", "One who counts friends"], why: "Al-Kanud is the one who counts the calamities and he forgets Allah's favors." },
        { q: "What does Al-Kanud forget?", a: "Allah's favors", wrong: ["His name", "His home", "His food"], why: "And he forgets Allah's favors." },
        { tf: true, q: "Remembering Allah's gifts keeps us from ingratitude.", why: "Al-Kanud is the one who counts the calamities and he forgets Allah's favors." }
      ]
    },
    {
      slug: "good-in-every-affair",
      title: "Good in every affair",
      line: "A believer is thankful in good times and patient in hard ones.",
      facts: ["Shukr: thankfulness", "Sabr: patience"],
      quote: q100(6),
      source: hadith("muslim", "2999", "Suhaib", "Sahih", "The believer's affair is all good: when happy he thanks Allah, and when in trouble he is patient, and both are good for him.", "if he has an occasion to feel delight, he thanks"),
      difficulty: 2,
      questions: [
        { q: "What does a believer do in happy times?", a: "Thanks Allah", wrong: ["Shows off", "Forgets Allah", "Gets lazy"], why: "If he has an occasion to feel delight, he thanks God." },
        { q: "What does he do in trouble?", a: "Shows patience", wrong: ["Gets angry", "Gives up", "Blames others"], why: "If he gets into trouble and shows resignation and endures it patiently." },
        { tf: true, q: "For a believer, there is good in every affair.", why: "There is good in every affair of his." }
      ]
    },
    {
      slug: "a-witness-to-it",
      title: "A witness to it",
      line: "Allah sees man's ingratitude, and man shows it himself.",
      facts: ["Allah is a witness", "Our deeds show our hearts"],
      quote: q100(7),
      source: ik(7, "Qatadah and Ath-Thawri said Allah is a witness to it; Al-Qurazi said man himself shows it by his words and deeds.", "And indeed Allah is a witness to that"),
      difficulty: 2,
      questions: [
        { q: "Who is a witness to it, per Qatadah?", a: "Allah", wrong: ["His neighbor", "His camel", "Nobody"], why: "And indeed Allah is a witness to that." },
        { q: "What did Al-Qurazi say?", a: "Man witnesses it himself", wrong: ["The angels deny it", "Nobody can know", "Only kings see it"], why: "Man is a witness himself to the fact that he is ungrateful." },
        { tf: true, q: "Our words and deeds can show ingratitude.", why: "This is apparent from his statements and deeds." }
      ]
    },
    {
      slug: "a-strong-love-of-wealth",
      title: "A strong love of wealth",
      line: "Man loves wealth so strongly it can make him stingy.",
      facts: ["Al-Khayr: wealth here", "Shadid: intense"],
      quote: q100(8),
      source: ik(8, "Man is severe in his love of wealth, and that love can make him greedy and stingy; Ibn Kathir says both meanings are correct.", "he is covetous and stingy due to the love of wealth"),
      difficulty: 2,
      questions: [
        { q: "What is man violent in love of, per 100:8?", a: "Wealth", wrong: ["Sleep", "Travel", "Poetry"], why: "And verily, he is violent in the love of wealth." },
        { q: "What can love of wealth make him, per Ibn Kathir?", a: "Greedy and stingy", wrong: ["Kind and generous", "Fast and strong", "Quiet and calm"], why: "He is covetous and stingy due to the love of wealth." },
        { tf: true, q: "Ibn Kathir says both meanings of 100:8 are correct.", why: "However, both views are correct." }
      ]
    },
    {
      slug: "a-valley-of-gold",
      title: "A valley of gold",
      line: "With a valley of gold, man would still want a second.",
      facts: ["Greed never ends", "Allah forgives who repents"],
      quote: q100(8),
      source: hadith("bukhari", "6439", "Anas ibn Malik", "Sahih", "If the son of Adam had a valley full of gold he would want two, and Allah forgives whoever repents.", "he would like to have two valleys"),
      difficulty: 3,
      questions: [
        { q: "If man had one valley of gold, what would he want?", a: "Two valleys", wrong: ["Nothing more", "A smaller one", "Silver instead"], why: "He would like to have two valleys." },
        { q: "Whom does Allah forgive, per the hadith?", a: "Whoever repents", wrong: ["Only the rich", "Only the old", "Nobody"], why: "And Allah forgives him who repents to Him." },
        { tf: false, q: "More money always makes people feel full.", why: "If Adam's son had a valley full of gold, he would like to have two valleys." }
      ]
    },
    {
      slug: "real-richness",
      title: "Real richness",
      line: "Real richness is a content heart, not many things.",
      facts: ["Ghina an-nafs: rich soul", "Contentment is wealth"],
      quote: q100(8),
      source: hadith("bukhari", "6446", "Abu Hurairah", "Sahih", "Wealth is not having many possessions; real wealth is feeling content in the soul.", "wealth is feeling sufficiency in the soul"),
      difficulty: 3,
      questions: [
        { q: "What is real wealth, per the hadith?", a: "Contentment in the soul", wrong: ["Many houses", "Many camels", "Many coins"], why: "Rather, true wealth is feeling sufficiency in the soul." },
        { q: "What is wealth not about?", a: "Having many possessions", wrong: ["Being thankful", "Being content", "Trusting Allah"], why: "Wealth is not in having many possessions." },
        { tf: true, q: "A poor person can be rich in his heart.", why: "Wealth is feeling sufficiency in the soul." }
      ]
    },
    {
      slug: "when-the-graves-open",
      title: "When the graves open",
      line: "On the Last Day the graves will open and everyone will rise.",
      facts: ["Buthira: poured out", "Every soul rises"],
      quote: q100(9),
      source: ik(9, "Allah urges us to look past this world to the Hereafter: the dead in the graves will be brought out.", "the dead that are in it will be brought out"),
      difficulty: 2,
      questions: [
        { q: "What will be poured forth in 100:9?", a: "The contents of the graves", wrong: ["The seas", "The clouds", "The markets"], why: "When the contents of the graves are poured forth." },
        { q: "What does Ibn Kathir say comes out?", a: "The dead in them", wrong: ["Gold coins", "Old books", "Water"], why: "The dead that are in it will be brought out." },
        { tf: true, q: "100:9 urges us to work for the Hereafter.", why: "Allah encourages abstinence from worldly things and striving for the Hereafter." }
      ]
    },
    {
      slug: "what-is-in-the-hearts",
      title: "What is in the hearts",
      line: "Hidden thoughts and intentions will all come into the open.",
      facts: ["As-Sudur: the chests", "Intentions matter"],
      quote: q100(10),
      source: ik(10, "Ibn Abbas and others said what was hidden in people's souls will be exposed and made clear.", "what was in their souls would be exposed and made apparent"),
      difficulty: 3,
      questions: [
        { q: "What will be made known in 100:10?", a: "What is in the breasts", wrong: ["What is in the sky", "What is in the sea", "What is in the bags"], why: "And that which is in the breasts shall be made known." },
        { q: "What did Ibn Abbas say will be exposed?", a: "What was in their souls", wrong: ["Their houses", "Their clothes", "Their names"], why: "What was in their souls would be exposed and made apparent." },
        { tf: false, q: "Secret intentions will stay hidden forever.", why: "What was in their souls would be exposed and made apparent." }
      ]
    },
    {
      slug: "allah-looks-at-hearts",
      title: "Allah looks at hearts",
      line: "Allah looks at our hearts and deeds, not our looks or wealth.",
      facts: ["Taqwa is in the heart", "Deeds matter, not looks"],
      quote: q100(10),
      source: hadith("muslim", "2564", "Abu Hurairah", "Sahih", "Allah does not look at your faces or wealth, but at your hearts and your deeds.", "He looks to your heart and to your deeds"),
      difficulty: 3,
      questions: [
        { q: "What does Allah look at, per the hadith?", a: "Hearts and deeds", wrong: ["Faces and wealth", "Clothes and homes", "Names and tribes"], why: "But He looks to your heart and to your deeds." },
        { q: "What does Allah not look at?", a: "Our faces and wealth", wrong: ["Our hearts", "Our deeds", "Our intentions"], why: "Verily Allah does not look to your faces and your wealth." },
        { tf: false, q: "Allah judges people by their looks.", why: "Verily Allah does not look to your faces and your wealth." }
      ]
    },
    {
      slug: "well-acquainted",
      title: "Well-Acquainted",
      line: "Allah knows all they did and will never wrong anyone.",
      facts: ["Al-Khabir: the All-Aware", "Perfect justice"],
      quote: q100(11),
      source: ik(11, "Allah knows everything they did and will repay them fully, without the slightest injustice.", "He does not do even the slightest amount of injustice"),
      difficulty: 3,
      questions: [
        { q: "What will their Lord be that Day, per 100:11?", a: "Well-Acquainted with them", wrong: ["Far from them", "Unaware", "Asleep"], why: "Verily, that Day their Lord will be Well-Acquainted with them." },
        { q: "What will Allah never do, per Ibn Kathir?", a: "The slightest injustice", wrong: ["Reward good", "Know deeds", "Forgive"], why: "He does not do even the slightest amount of injustice." },
        { tf: true, q: "Allah knows everything people used to do.", why: "He knows all of that they used to do." }
      ]
    },
    {
      slug: "why-that-day",
      title: "Why name that Day?",
      line: "Allah always knows us; that Day He rewards what He knows.",
      facts: ["As-Sa'di explains", "Al-Khabir: the All-Aware"],
      quote: q100(11),
      source: saadi(100, 11, "As-Sa'di says Allah knows His servants at all times; He names that Day because it is when He rewards what He knows.", "وخص خبره بذلك اليوم"),
      difficulty: 3,
      questions: [
        { q: "Does Allah know us only on the Last Day?", a: "No, at all times", wrong: ["Yes, only then", "Only at night", "Only in Ramadan"], why: "He is aware of them at all times, says as-Sa'di." },
        { q: "Why does 100:11 name that Day?", a: "Reward comes then", wrong: ["He learns then", "He forgets before", "No reason"], why: "The meaning is the reward for deeds." },
        { tf: true, q: "Allah knows both our hidden and open deeds.", why: "As-Sa'di on 100:11." }
      ]
    }
  ]
};

export const ADIYAT_UNITS: readonly DeepUnit[] = [ADIYAT_ONE, ADIYAT_TWO];
