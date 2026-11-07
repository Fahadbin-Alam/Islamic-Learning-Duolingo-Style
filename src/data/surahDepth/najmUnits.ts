import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah An-Najm ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on An-Najm 53:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_53_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on An-Najm 53:${ayah}`,
    url: `https://quran.com/53:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 53:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q53 = (ayah: number) => quranQuote(53, ayah);

/** Ayahs 1 to 18: the Messenger ﷺ is truthful, the revelation he received through Jibril, and the great signs he saw. */
const NAJM_ONE: DeepUnit = {
  key: "najm1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-53",
  name: "An-Najm, ayahs 1 to 18",
  kind: "skill",
  lessonType: "surah",
  surahName: "An-Najm",
  lessons: [
    {
      slug: "by-the-star",
      title: "By the star",
      line: "Allah swears by the star as it goes down.",
      facts: ["Allah swears by what He wills", "We swear only by Allah"],
      quote: q53(1),
      source: ik(1, "Ibn Kathir says the Creator swears by whatever He wills of His creation, but the created swear only by the Creator.", "the created only vow by the Creator"),
      difficulty: 1,
      questions: [
        { q: "What does Allah swear by, in 53:1?", a: "The star when it goes down", wrong: ["The moon", "The sun at noon", "The clouds"], why: "By the star when it goes down." },
        { q: "By whom may the created swear, per Ibn Kathir?", a: "Only by the Creator", wrong: ["By the stars", "By their parents", "By anything"], why: "The Creator swears by whatever He wills among His creation, but the created only vow by the Creator." },
        { q: "Which star did Mujahid name?", a: "Pleiades setting at Fajr", wrong: ["The sun", "Mars", "The North Star"], why: "Mujahid said, The star refers to Pleiades when it sets at Fajr." }
      ]
    },
    {
      slug: "stars-and-revelation",
      title: "Stars and revelation",
      line: "Stars adorn the sky, and revelation adorns the earth.",
      facts: ["As-Sa'di explains", "A fitting oath"],
      quote: q53(1),
      source: saadi(53, 1, "As-Sa'di says Allah swore by the stars on the truth of the revelation because there is a fitting link: stars adorn the sky, revelation adorns the earth, and without the prophets' knowledge people would be in deeper darkness than night.", "فإن الله تعالى جعل النجوم زينة للسماء، فكذلك الوحي وآثاره زينة للأرض"),
      difficulty: 2,
      questions: [
        { q: "Why swear by the stars on revelation, per as-Sa'di?", a: "Both bring light and beauty", wrong: ["Stars tell the future", "By chance", "Stars are gods"], why: "Stars adorn the sky and revelation adorns the earth, says as-Sa'di." },
        { q: "Without the prophets' knowledge, people would be...?", a: "In deep darkness", wrong: ["Better off", "Just the same", "Richer"], why: "Darker than the blackest night." },
        { tf: true, q: "In An-Najm 53:1, the star can mean all the stars.", why: "As-Sa'di on 53:1." }
      ]
    },
    {
      slug: "the-first-sajdah-surah",
      title: "The first sajdah surah",
      line: "An-Najm was recited in Makkah, and all who heard prostrated.",
      facts: ["Recited in Makkah", "Followed by a sajdah"],
      quote: q53(1),
      source: hadith("bukhari", "1067", "Abdullah ibn Mas'ud", "Sahih", "Ibn Masud said the Prophet ﷺ recited An-Najm in Makkah and prostrated, and those with him prostrated too.", "recited Surat an-Najm"),
      difficulty: 2,
      questions: [
        { q: "Where did he ﷺ recite An-Najm, per Bukhari 1067?", a: "In Makkah", wrong: ["In Madinah", "In Taif", "In Jerusalem"], why: "The Prophet ﷺ recited Surat an-Najm at Mecca and prostrated while reciting it." },
        { q: "What did those with him ﷺ do?", a: "They prostrated too", wrong: ["They left", "They laughed", "They slept"], why: "Those who were with him did the same." },
        { tf: true, q: "An-Najm was the first surah with a sajdah revealed in it.", why: "Surat An-Najm was the first Surah in which a prostration was revealed." }
      ]
    },
    {
      slug: "not-astray",
      title: "Not astray",
      line: "Your companion ﷺ has not gone astray, nor has he erred.",
      facts: ["Not lost like the ignorant", "Not wrong on purpose"],
      quote: q53(2),
      source: ik(2, "Ibn Kathir says this is what the oath is for: the Messenger ﷺ is sane and a follower of truth, on the straight path.", "is sane and a follower of Truth"),
      difficulty: 2,
      questions: [
        { q: "What is denied about him ﷺ, in 53:2?", a: "Going astray or erring", wrong: ["Being kind", "Being honest", "Being patient"], why: "Your companion has neither gone astray nor has he erred." },
        { q: "Who goes astray, per Ibn Kathir?", a: "One without knowledge", wrong: ["One who prays", "One who travels", "One who fasts"], why: "He is neither led astray, such as in the case of the ignorant who does not proceed on any path with knowledge." },
        { q: "Who errs, per Ibn Kathir?", a: "One who knows and turns away", wrong: ["A child", "A sleeper", "A traveler"], why: "Nor is he one who erred, such as in the case of the knowledgeable, who knows the Truth, yet deviates from it intentionally." }
      ]
    },
    {
      slug: "not-from-desire",
      title: "Not from desire",
      line: "He ﷺ does not speak from his own wishes.",
      facts: ["Nothing from his own desire", "He conveys the message"],
      quote: q53(3),
      source: ik(3, "Ibn Kathir says nothing the Prophet ﷺ utters comes from his own desire or wish.", "utters is of his own desire or wish"),
      difficulty: 1,
      questions: [
        { q: "From what does he ﷺ not speak, in 53:3?", a: "Desire", wrong: ["Knowledge", "Truth", "Revelation"], why: "Nor does he speak of desire." },
        { q: "Whose wish shapes his message, per Ibn Kathir?", a: "Not his own", wrong: ["His own", "His tribe", "The kings"], why: "Nothing the Prophet ﷺ utters is of his own desire or wish." },
        { tf: true, q: "53:3 means he ﷺ spoke from personal wishes.", why: "No. Nothing the Prophet ﷺ utters is of his own desire or wish." }
      ]
    },
    {
      slug: "only-revelation",
      title: "Only revelation",
      line: "His message is only revelation, delivered in full.",
      facts: ["No additions, no deletions", "Write: every word is truth"],
      quote: q53(4),
      source: ik(4, "Ibn Kathir says he conveys what he was commanded, in full, without adding or deleting.", "in its entirety without additions or deletions"),
      difficulty: 2,
      questions: [
        { q: "What is his speech, in 53:4?", a: "Revelation revealed", wrong: ["Poetry", "Old stories", "Guesswork"], why: "It is only a revelation revealed." },
        { q: "How does he ﷺ convey it, per Ibn Kathir?", a: "In full, nothing added or cut", wrong: ["In parts", "With changes", "Only to some"], why: "He only conveys to the people what he was commanded to convey, in its entirety without additions or deletions." },
        { q: "What did he ﷺ tell Abdullah ibn Amr to do?", a: "Write", wrong: ["Stop writing", "Forget it", "Hide it"], why: "Write! By He in Whose Hand is my soul, every word that comes out of me is the Truth." }
      ]
    },
    {
      slug: "the-sunnah-is-revelation",
      title: "The Sunnah is revelation",
      line: "An-Najm 53:4 shows the Sunnah is also revelation from Allah.",
      facts: ["As-Sa'di explains", "Protected in what he conveys"],
      quote: q53(4),
      source: saadi(53, 4, "As-Sa'di says the ayah shows the Sunnah is revelation from Allah to His Messenger ﷺ, and that he is protected from error in what he tells about Allah and His law, since his words do not come from desire.", "ودل هذا على أن السنة وحي من الله لرسوله"),
      difficulty: 2,
      questions: [
        { q: "What does An-Najm 53:4 show about the Sunnah, per as-Sa'di?", a: "It is revelation too", wrong: ["It is only opinion", "It is poetry", "It is optional history"], why: "The Sunnah is revelation from Allah to His Messenger ﷺ, says as-Sa'di." },
        { q: "Where do the Prophet's ﷺ words about the religion come from?", a: "Revelation, not desire", wrong: ["Guesses", "Dreams only", "Other people"], why: "His speech comes from revelation, not from desire." },
        { tf: true, q: "Allah sent down to him the Book and the Wisdom.", why: "As-Sa'di on 53:4." }
      ]
    },
    {
      slug: "mighty-in-power",
      title: "Mighty in power",
      line: "He was taught by one mighty in power: Jibril.",
      facts: ["Jibril, the trustworthy angel", "Strong in power"],
      quote: q53(5),
      source: ik(5, "Ibn Kathir says the one mighty in power who taught him is Jibril, peace be upon him.", "he is Jibril, peace be upon him"),
      difficulty: 1,
      questions: [
        { q: "Who taught him ﷺ, per Ibn Kathir?", a: "Jibril", wrong: ["Mikail", "A poet", "A monk"], why: "Mighty in power, he is Jibril, peace be upon him." },
        { q: "How is the teacher described, in 53:5?", a: "Mighty in power", wrong: ["Weak and old", "Young and new", "Hidden"], why: "He has been taught by one mighty in power." },
        { q: "Which ayahs does Ibn Kathir link to 53:5?", a: "81:19-21", wrong: ["2:1-5", "112:1-4", "1:1-7"], why: "Verily, this is the Word a most honorable messenger, owner of power. 81:19-21." }
      ]
    },
    {
      slug: "he-rose",
      title: "He rose",
      line: "Jibril, Dhu Mirrah, rose up in his true form.",
      facts: ["Dhu Mirrah: mighty", "Istawa: he rose"],
      quote: q53(6),
      source: ik(6, "Ibn Kathir says Dhu Mirrah means mighty in power, and the one who rose is the angel Jibril.", "this refers to the angel Jibril"),
      difficulty: 2,
      questions: [
        { q: "What does Dhu Mirrah mean, per Mujahid?", a: "Mighty in power", wrong: ["Very old", "Full of light", "Swift"], why: "Dhu Mirrah, meaning, he is mighty in power, according to Mujahid, Al-Hasan and Ibn Zayd." },
        { q: "Who rose, in 53:6, per Ibn Kathir?", a: "The angel Jibril", wrong: ["The sun", "The moon", "A bird"], why: "Then he Istawa, this refers to the angel Jibril." },
        { tf: true, q: "Al-Hasan, Mujahid and Qatadah all said Jibril rose.", why: "This refers to the angel Jibril, according to Al-Hasan, Mujahid, Qatadah and Ar-Rabi bin Anas." }
      ]
    },
    {
      slug: "the-highest-horizon",
      title: "The highest horizon",
      line: "Jibril was in the highest horizon, where morning comes.",
      facts: ["The east, where day begins", "Filling the sky"],
      quote: q53(7),
      source: ik(7, "Ibn Kathir says Jibril rose to the highest part of the horizon; Ikrimah said it is where the morning comes from.", "The highest horizon where the morning comes from"),
      difficulty: 2,
      questions: [
        { q: "Where was Jibril, in 53:7?", a: "The highest horizon", wrong: ["Under the sea", "In a cave", "On a ship"], why: "While he was in the highest part of the horizon." },
        { q: "What did Ikrimah say the highest horizon is?", a: "Where the morning comes from", wrong: ["Where rain falls", "Where night begins", "Where birds rest"], why: "Ikrimah said, The highest horizon where the morning comes from." },
        { q: "What did Mujahid call it?", a: "The place of sunrise", wrong: ["The place of sunset", "The sea floor", "The desert"], why: "Mujahid said, It is the place of sunrise." }
      ]
    },
    {
      slug: "he-came-closer",
      title: "He came closer",
      line: "Then Jibril drew near and came closer to him ﷺ.",
      facts: ["Jibril came down to earth", "Close to the Prophet ﷺ"],
      quote: q53(8),
      source: ik(8, "Ibn Kathir says Jibril came closer to Muhammad ﷺ while descending to him on earth.", "when Jibril was descending to him on earth"),
      difficulty: 2,
      questions: [
        { q: "What happened in 53:8?", a: "He approached and came closer", wrong: ["He went away", "He hid", "He slept"], why: "Then he approached and came closer." },
        { q: "Who came closer, per Ibn Kathir?", a: "Jibril", wrong: ["A cloud", "A star", "A bird"], why: "Jibril came closer to Muhammad when Jibril was descending to him on earth." },
        { tf: true, q: "Aisha and Ibn Masud said it was Jibril who came near.", why: "It was Jibril who came down near the Prophet ﷺ according to Aishah, the Mother of the faithful, Abdullah bin Masud, Abu Dharr and Abu Hurayrah." }
      ]
    },
    {
      slug: "two-bows-length",
      title: "Two bows' length",
      line: "Jibril came as near as two bows' length, or nearer.",
      facts: ["A bow fully stretched", "Or less is more exact"],
      quote: q53(9),
      source: ik(9, "Ibn Kathir says the distance became only two bow lengths, with the bows stretched out, per Mujahid and Qatadah.", "the distance between them became only two bow lengths"),
      difficulty: 3,
      questions: [
        { q: "How near did Jibril come, in 53:9?", a: "Two bows' length or less", wrong: ["A mile", "A day's walk", "Ten steps"], why: "And was at a distance of two bows' length or less." },
        { q: "What does or less show, per Ibn Kathir?", a: "No more than that", wrong: ["Much farther", "Unknown distance", "A guess"], why: "Or less indicates that the distance was as only as far described, not more." },
        { q: "Which ayah uses or even worse the same way?", a: "2:74", wrong: ["1:1", "112:1", "114:1"], why: "Your hearts were hardened and became as stones or even worse in hardness. 2:74." }
      ]
    },
    {
      slug: "six-hundred-wings",
      title: "Six hundred wings",
      line: "He ﷺ saw Jibril in his true form with 600 wings.",
      facts: ["Ibn Masud reported it", "His true, created form"],
      quote: q53(9),
      source: hadith("bukhari", "4856", "Abdullah ibn Mas'ud", "Sahih", "Explaining 53:9-10, Ibn Masud said the Prophet ﷺ saw Jibril with six hundred wings.", "had seen Gabriel with six hundred wings"),
      difficulty: 2,
      questions: [
        { q: "How many wings did Jibril have, per Bukhari 4856?", a: "Six hundred", wrong: ["Two", "Sixty", "Six thousand"], why: "The Prophet ﷺ had seen Gabriel with six hundred wings." },
        { q: "Which ayahs was Ibn Masud explaining?", a: "53:9-10", wrong: ["2:255", "112:1", "1:5"], why: "Regarding the Verses: And was at a distance of but two bow-lengths or even nearer. 53.9-10." },
        { tf: true, q: "Each wing filled the side of the horizon, per Ibn Kathir.", why: "The Messenger of Allah saw Jibril in his original shape having six hundred wings, each wing filling the side of the horizon." }
      ]
    },
    {
      slug: "whatever-he-revealed",
      title: "Whatever He revealed",
      line: "Allah revealed to His servant what He revealed, through Jibril.",
      facts: ["Two meanings, both true", "Jibril conveyed it"],
      quote: q53(10),
      source: ik(10, "Ibn Kathir says either Jibril conveyed to Muhammad ﷺ what he conveyed, or Allah revealed through Jibril; both meanings are correct.", "Both meanings are correct"),
      difficulty: 2,
      questions: [
        { q: "To whom was it revealed, in 53:10?", a: "His servant", wrong: ["The kings", "The poets", "The jinn"], why: "So Allah revealed to His servant whatever He revealed." },
        { q: "Who is the servant, per Ibn Kathir?", a: "Muhammad ﷺ", wrong: ["Musa", "Isa", "Ibrahim"], why: "Jibril conveyed to Allah's servant Muhammad whatever he conveyed." },
        { tf: true, q: "Ibn Kathir says both meanings of 53:10 are correct.", why: "Allah revealed to His servant Muhammad whatever He revealed through Jibril. Both meanings are correct." }
      ]
    },
    {
      slug: "the-heart-did-not-lie",
      title: "The heart did not lie",
      line: "His heart did not deny what he ﷺ saw.",
      facts: ["What he saw was real", "No trick of the eyes"],
      quote: q53(11),
      source: ik(11, "Ibn Kathir explains the ayah: the heart lied not in what he saw.", "The heart lied not in what he saw"),
      difficulty: 2,
      questions: [
        { q: "What did not lie, in 53:11?", a: "The heart", wrong: ["The eyes", "The tongue", "The hands"], why: "The heart lied not in what he saw." },
        { q: "What does 53:11 confirm?", a: "What he saw was true", wrong: ["He dreamed it", "He imagined it", "He forgot it"], why: "The heart lied not in what he saw." },
        { tf: true, q: "His heart and eyes agreed on what he saw.", why: "The heart lied not in what he saw." }
      ]
    },
    {
      slug: "will-you-dispute",
      title: "Will you dispute?",
      line: "Will you argue with him about what he ﷺ saw?",
      facts: ["The Quraysh argued", "He saw it himself"],
      quote: q53(12),
      source: ik(12, "Ibn Kathir explains the ayah: will you then dispute with him about what he saw?", "Will you then dispute with him about what he saw"),
      difficulty: 2,
      questions: [
        { q: "What does 53:12 ask?", a: "Will you dispute what he saw?", wrong: ["Will you travel?", "Will you trade?", "Will you sleep?"], why: "Will you then dispute with him about what he saw?" },
        { q: "Who saw it, in 53:12?", a: "The Prophet ﷺ himself", wrong: ["The Quraysh", "A poet", "A merchant"], why: "Will you then dispute with him about what he saw?" },
        { tf: true, q: "53:12 blames those who argue about what he saw.", why: "Will you then dispute with him about what he saw?" }
      ]
    },
    {
      slug: "a-second-time",
      title: "A second time",
      line: "He ﷺ saw Jibril in his true form a second time.",
      facts: ["On the Night Journey", "Only twice in true form"],
      quote: q53(13),
      source: ik(13, "Ibn Kathir says this is the second time the Messenger ﷺ saw Jibril in the form Allah created him, on the Night of Isra.", "saw Jibril in the shape that Allah created him"),
      difficulty: 2,
      questions: [
        { q: "When was the second sighting, per Ibn Kathir?", a: "The Night of Isra", wrong: ["The day of Badr", "In Ramadan", "On Hajj"], why: "This is the second time the Messenger of Allah saw Jibril in the shape that Allah created him; it was during the Night of Isra." },
        { q: "How many times did he see Jibril in true form?", a: "Twice", wrong: ["Once", "Ten times", "Every day"], why: "He only saw him twice in his actual and real figure." },
        { tf: true, q: "Jibril was so huge he filled the whole horizon.", why: "He saw Jibril descend from heaven to earth and was so huge that he covered the whole horizon between the sky and earth." }
      ]
    },
    {
      slug: "the-lote-tree",
      title: "The Lote Tree",
      line: "He ﷺ saw Jibril near Sidrat Al-Muntaha, the farthest Lote Tree.",
      facts: ["Sidrah: a lote tree", "Where ascent ends"],
      quote: q53(14),
      source: ik(14, "Ibn Masud said Sidrat Al-Muntaha is where everything that rises from the earth ends, and everything coming down from above it stops.", "There everything terminates that ascends from the earth"),
      difficulty: 2,
      questions: [
        { q: "Where did he ﷺ see Jibril, in 53:14?", a: "Near Sidrat Al-Muntaha", wrong: ["Near the Kabah", "On Mount Uhud", "In Taif"], why: "And indeed he saw him at a second descent. Near Sidrat Al-Muntaha." },
        { q: "What ends at the Sidrah, per Ibn Masud?", a: "All that rises from earth", wrong: ["The rivers", "The deserts", "The roads"], why: "There everything terminates that ascends from the earth and is held there." },
        { q: "What kind of tree is the Sidrah?", a: "A lote tree", wrong: ["A palm tree", "An olive tree", "A fig tree"], why: "When that covered the lote tree which did cover it." }
      ]
    },
    {
      slug: "the-garden-of-abode",
      title: "The Garden of Abode",
      line: "Near the Lote Tree is Jannat Al-Mawa, the Garden of Abode.",
      facts: ["Al-Mawa: the home to stay", "Paradise is near it"],
      quote: q53(15),
      source: ik(15, "Ibn Kathir quotes the ayahs: near Sidrat Al-Muntaha, near it is the Paradise of Abode.", "Near it is the Paradise of Abode"),
      difficulty: 1,
      questions: [
        { q: "What is near the Lote Tree, in 53:15?", a: "The Paradise of Abode", wrong: ["A great sea", "A tall mountain", "A city"], why: "Near it is the Paradise of Abode." },
        { q: "What does Al-Mawa mean?", a: "The abode, a home to stay", wrong: ["A market", "A road", "A desert"], why: "Near it is the Paradise of Abode." },
        { tf: true, q: "Paradise is near Sidrat Al-Muntaha.", why: "Near Sidrat Al-Muntaha. Near it is the Paradise of Abode." }
      ]
    },
    {
      slug: "covered-with-wonders",
      title: "Covered with wonders",
      line: "The Lote Tree was covered with light, angels and colors.",
      facts: ["Golden butterflies", "Wonders beyond words"],
      quote: q53(16),
      source: ik(16, "Ibn Kathir says angels, Allah's Light and spectacular colors covered the Sidrah; Ibn Masud said golden butterflies.", "spectacular colors covered the Sidrah"),
      difficulty: 2,
      questions: [
        { q: "What covered the Sidrah, per Ibn Masud?", a: "Golden butterflies", wrong: ["Snow", "Dust", "Smoke"], why: "When that covered the lote tree which did cover it! He said, Golden butterflies." },
        { q: "What else covered it, per Ibn Kathir?", a: "Angels, light and colors", wrong: ["Rain and wind", "Sand and stones", "Darkness"], why: "The angels, Allah's Light, and spectacular colors covered the Sidrah." },
        { tf: true, q: "53:16 leaves the wonder untold, to show its greatness.", why: "When that covered the lote tree which did cover it!" }
      ]
    },
    {
      slug: "three-gifts",
      title: "Three gifts",
      line: "At the Sidrah he ﷺ was given three gifts for his Ummah.",
      facts: ["The five prayers", "The end of Al-Baqarah"],
      quote: q53(16),
      source: hadith("muslim", "173", "Abdullah ibn Mas'ud", "Sahih", "At Sidrat Al-Muntaha the Prophet ﷺ was given three things: the five prayers, the last ayahs of Al-Baqarah, and forgiveness of great sins for those who join none with Allah.", "he was given five prayers"),
      difficulty: 3,
      questions: [
        { q: "Which prayer gift was given, per Muslim 173?", a: "The five prayers", wrong: ["Eid prayer", "Night prayer only", "Rain prayer"], why: "He was given five prayers." },
        { q: "Which ayahs were given, per Muslim 173?", a: "The end of Al-Baqarah", wrong: ["The start of Yasin", "Al-Fatihah only", "An-Nas"], why: "He was given the concluding verses of Sura al-Baqara." },
        { q: "Who gets great sins forgiven, per Muslim 173?", a: "Those who join none with Allah", wrong: ["Everyone", "Only scholars", "Only the rich"], why: "Remission of serious Sins for those among his Ummah who associate not anything with Allah." }
      ]
    },
    {
      slug: "the-sight-did-not-swerve",
      title: "The sight did not swerve",
      line: "His sight did not turn aside or go past its limit.",
      facts: ["He looked only where told", "Perfect obedience"],
      quote: q53(17),
      source: ik(17, "Ibn Kathir says his sight did not turn right or left, nor pass its limit, showing his firm obedience to Allah.", "demonstrates the Prophet ﷺ"),
      difficulty: 3,
      questions: [
        { q: "What did his sight not do, in 53:17?", a: "Turn aside or go too far", wrong: ["See clearly", "Stay focused", "Look ahead"], why: "The sight turned not aside, nor it transgressed beyond the limit." },
        { q: "Which way did his sight not turn, per Ibn Abbas?", a: "Right or left", wrong: ["Up or down", "Back", "Forward"], why: "The Prophet's ﷺ sight did not turn right or left, according to Ibn Abbas." },
        { q: "What does 53:17 show about him ﷺ?", a: "Firm obedience to Allah", wrong: ["Fear of heights", "Tiredness", "Curiosity"], why: "This is a tremendous quality that demonstrates the Prophet's ﷺ firm obedience to Allah." }
      ]
    },
    {
      slug: "perfect-manners",
      title: "Perfect manners",
      line: "He stayed where Allah placed him, neither short nor beyond.",
      facts: ["As-Sa'di explains", "No falling short, no going too far"],
      quote: q53(17),
      source: saadi(53, 17, "As-Sa'di says this shows the Prophet's ﷺ perfect manners: he stayed in the place Allah put him, did not fall short of it, did not go beyond it, and did not turn aside.", "وهذا كمال الأدب منه صلوات الله وسلامه عليه، أن قام مقاما أقامه الله فيه، ولم يقصر عنه ولا تجاوزه"),
      difficulty: 3,
      questions: [
        { q: "What does An-Najm 53:17 show about the Prophet ﷺ?", a: "His perfect manners", wrong: ["His wealth", "His tribe", "His strength"], why: "It is the perfection of his manners, says as-Sa'di." },
        { q: "Which faults did he ﷺ avoid in that station?", a: "Falling short and going too far", wrong: ["Only being late", "Only speaking", "Nothing"], why: "He did not fall short of it or go beyond it." },
        { tf: true, q: "His sight did not turn right or left.", why: "As-Sa'di on 53:17." }
      ]
    },
    {
      slug: "the-greatest-signs",
      title: "The greatest signs",
      line: "He ﷺ saw some of the greatest signs of his Lord.",
      facts: ["Signs of Allah's might", "Like 17:1"],
      quote: q53(18),
      source: ik(18, "Ibn Kathir links 53:18 to 17:1: signs that testify to Allah's might and greatness.", "signs that testify to Allah"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ see, in 53:18?", a: "The greatest signs of his Lord", wrong: ["Old ruins", "Great armies", "Rich palaces"], why: "Indeed he saw of the greatest signs of his Lord." },
        { q: "Which ayah does Ibn Kathir compare to 53:18?", a: "17:1", wrong: ["2:255", "1:1", "112:1"], why: "In order that We might show him of Our Ayat. 17:1." },
        { tf: true, q: "The signs testify to Allah's might and greatness.", why: "Signs that testify to Allah's might and greatness." }
      ]
    }
  ]
};

/** Ayahs 19 to 32: the idols Al-Lat, Al-Uzza and Manat are only names, intercession is by Allah's leave, and He knows best who is pious. */
const NAJM_TWO: DeepUnit = {
  key: "najm2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-53",
  name: "An-Najm, ayahs 19 to 32",
  kind: "skill",
  lessonType: "surah",
  surahName: "An-Najm",
  lessons: [
    {
      slug: "al-lat-and-al-uzza",
      title: "Al-Lat and Al-Uzza",
      line: "Have you thought about Al-Lat and Al-Uzza, the idols?",
      facts: ["Al-Lat: an idol in Taif", "Al-Uzza: an idol at Nakhlah"],
      quote: q53(19),
      source: ik(19, "Ibn Kathir says Al-Lat was a white stone with a house around it in Taif, and Al-Uzza was a tree at Nakhlah revered by Quraysh.", "Al-Lat was a white stone with inscriptions on"),
      difficulty: 2,
      questions: [
        { q: "Where was Al-Lat, per Ibn Kathir?", a: "In At-Taif", wrong: ["In Madinah", "In Yemen", "In Syria"], why: "There was a house built around Al-Lat in At-Taif." },
        { q: "What was Al-Uzza, per Ibn Jarir?", a: "A tree at Nakhlah", wrong: ["A white stone", "A river", "A statue of gold"], why: "Al-Uzza was a tree on which the idolators placed a monument and curtains, in the area of Nakhlah." },
        { q: "Who revered Al-Uzza?", a: "The Quraysh", wrong: ["The Aws", "Thaqif only", "The Romans"], why: "The Quraysh revered Al-Uzza." }
      ]
    },
    {
      slug: "a-man-who-served-pilgrims",
      title: "A man who served pilgrims",
      line: "Al-Lat was first a man who mixed Sawiq for pilgrims.",
      facts: ["Sawiq: a barley drink", "Later wrongly worshipped"],
      quote: q53(19),
      source: hadith("bukhari", "4859", "Ibn Abbas", "Sahih", "Ibn Abbas said Al-Lat was originally a man who used to mix Sawiq for the pilgrims.", "Lat was originally a man who used to mix Sawiq for the pilgrim"),
      difficulty: 2,
      questions: [
        { q: "Who was Al-Lat at first, per Bukhari 4859?", a: "A man who mixed Sawiq", wrong: ["A king", "A prophet", "An angel"], why: "Lat was originally a man who used to mix Sawiq for the pilgrim." },
        { q: "For whom did he mix Sawiq?", a: "The pilgrims", wrong: ["The soldiers", "The traders", "The kings"], why: "Lat was originally a man who used to mix Sawiq for the pilgrim." },
        { tf: true, q: "After he died, people stayed at his grave and worshipped him.", why: "When he died, they remained next to his grave and worshipped him." }
      ]
    },
    {
      slug: "manat-the-third",
      title: "Manat, the third",
      line: "And Manat, the third idol, between Makkah and Madinah.",
      facts: ["Near Qudayd", "Three famous idols"],
      quote: q53(20),
      source: ik(20, "Ibn Kathir says Manat was an idol at Mushallal near Qudayd, revered by Khuzaah, Aws and Khazraj.", "Manat was another idol in the area of Mushallal near Qudayd"),
      difficulty: 2,
      questions: [
        { q: "Where was Manat, per Ibn Kathir?", a: "Near Qudayd", wrong: ["In Taif", "In Nakhlah", "In Yemen"], why: "Manat was another idol in the area of Mushallal near Qudayd, between Makkah and Al-Madinah." },
        { q: "Why are these three named, per Ibn Kathir?", a: "They were the most famous", wrong: ["They were the only idols", "They were the oldest", "They were gold"], why: "Allah mentioned these three because they were more famous than the others." },
        { tf: true, q: "These idols were later destroyed and a masjid built at Al-Lat.", why: "They carried out the Prophet's ﷺ command and built a Masjid in its place in the city of At-Taif." }
      ]
    },
    {
      slug: "an-unfair-division",
      title: "An unfair division",
      line: "They gave Allah daughters and kept sons for themselves.",
      facts: ["A division most unfair", "Allah has no children"],
      quote: q53(21),
      source: ik(21, "Ibn Kathir says Allah asks: do you choose daughters for Allah and keep sons for yourselves?", "do you choose female offspring for Allah"),
      difficulty: 2,
      questions: [
        { q: "What does 53:21 ask the idolators?", a: "Sons for you, daughters for Him?", wrong: ["Gold for you?", "Land for you?", "Rain for you?"], why: "Is it for you the males and for Him the females?" },
        { q: "What did they claim for Allah?", a: "Daughters", wrong: ["Sons", "Brothers", "Nothing"], why: "Do you choose female offspring for Allah and give preference to yourselves with the males?" },
        { tf: true, q: "Their claim about Allah was false.", why: "Allah the Exalted refutes such innovated lies, falsehood and atheism they invented through worshipping the idols." }
      ]
    },
    {
      slug: "most-unfair",
      title: "Most unfair",
      line: "Such a division would be most unfair, even among people.",
      facts: ["Unjust and foolish", "How much more toward Allah"],
      quote: q53(22),
      source: ik(22, "Ibn Kathir says such a division would be unfair and unjust even among people, so how much worse toward Allah.", "it would be an unfair and unjust division"),
      difficulty: 2,
      questions: [
        { q: "What does 53:22 call that division?", a: "Most unfair", wrong: ["Very fair", "Wise", "Generous"], why: "That indeed is a division most unfair." },
        { q: "Would it be fair even between people?", a: "No, unfair and unjust", wrong: ["Yes, fair", "Sometimes", "Only for kings"], why: "It would be an unfair and unjust division." },
        { tf: true, q: "Ibn Kathir calls the claim foolish and unjust.", why: "Even though this would be foolish and unjust, if you made it between yourselves and others." }
      ]
    },
    {
      slug: "only-names",
      title: "Only names",
      line: "The idols are only names they made up, with no proof.",
      facts: ["Following guesses", "Guidance had come"],
      quote: q53(23),
      source: ik(23, "Ibn Kathir says they have no proof except trust in their forefathers and their own desires, though guidance had come to them.", "they have no proof, except their trust in their forefathers"),
      difficulty: 3,
      questions: [
        { q: "What are the idols, in 53:23?", a: "Names they named", wrong: ["Real gods", "Angels", "Prophets"], why: "They are but names which you have named, you and your fathers." },
        { q: "What does no authority mean, per Ibn Kathir?", a: "No proof", wrong: ["No king", "No army", "No money"], why: "For which Allah has sent down no authority, meaning, proof." },
        { q: "What do they follow, in 53:23?", a: "A guess and desires", wrong: ["Clear proof", "Revelation", "Prophets"], why: "They follow but a guess and that which they themselves desire." }
      ]
    },
    {
      slug: "not-every-wish",
      title: "Not every wish",
      line: "Can a person have whatever he wishes? No, not by wishing.",
      facts: ["Wishing is not enough", "Guidance needs truth"],
      quote: q53(24),
      source: ik(24, "Ibn Kathir says not everyone who claims guidance is guided, and not everyone gets what he wishes for himself.", "not everyone who claims to be guided is truly guided"),
      difficulty: 2,
      questions: [
        { q: "What does 53:24 ask?", a: "Shall man have what he wishes?", wrong: ["Shall man fly?", "Shall man rule?", "Shall man rest?"], why: "Or shall man have what he wishes?" },
        { q: "Is everyone who claims guidance guided?", a: "No", wrong: ["Yes", "Only the rich", "Only the old"], why: "Not everyone who claims to be guided is truly guided." },
        { q: "Which ayah does Ibn Kathir link to 53:24?", a: "4:123, not by desires", wrong: ["1:1", "2:255", "112:1"], why: "It will not be in accordance with desires, nor those of the People of Scripture. 4:123." }
      ]
    },
    {
      slug: "the-last-and-the-first",
      title: "The last and the first",
      line: "To Allah belong the Hereafter and this world.",
      facts: ["He owns both lives", "What He wills happens"],
      quote: q53(25),
      source: ik(25, "Ibn Kathir says all matters belong to Allah; He owns this world and the Hereafter, and what He wills happens.", "Whatever He wills, occurs and whatever He does not will, never occurs"),
      difficulty: 2,
      questions: [
        { q: "What belongs to Allah, in 53:25?", a: "The last and the first", wrong: ["Only the world", "Only Makkah", "Only the sky"], why: "But to Allah belongs the last and the first." },
        { q: "What is the last, per Ibn Kathir?", a: "The Hereafter", wrong: ["Old age", "The last prophet", "The last day of a month"], why: "He is the King and Owner of this world and the Hereafter." },
        { tf: true, q: "Whatever Allah does not will never happens.", why: "Whatever He wills, occurs and whatever He does not will, never occurs." }
      ]
    },
    {
      slug: "intercession-by-leave",
      title: "Intercession by leave",
      line: "Even angels cannot intercede unless Allah permits.",
      facts: ["Only with His leave", "For whom He is pleased"],
      quote: q53(26),
      source: ik(26, "Ibn Kathir says if even the close angels need permission, idols can never intercede for anyone.", "If this is the case with the angels who are close to Him"),
      difficulty: 3,
      questions: [
        { q: "Whose intercession avails nothing, in 53:26?", a: "Angels without Allah's leave", wrong: ["Allah's", "No one's", "The believers'"], why: "Many angels in the heavens, whose intercession will avail nothing, except after Allah has given leave." },
        { q: "Which ayah does Ibn Kathir link to 53:26?", a: "2:255", wrong: ["1:1", "112:1", "114:1"], why: "Who is he that can intercede with Him except with His permission? 2:255." },
        { tf: true, q: "Idols can intercede without Allah's permission.", why: "No. How can you, O ignorant ones, hope for Allah to grant you the intercession of the idols without having His permission?" }
      ]
    },
    {
      slug: "female-names-for-angels",
      title: "Female names for angels",
      line: "Those who deny the Hereafter gave angels female names.",
      facts: ["Angels are servants of Allah", "Not His daughters"],
      quote: q53(27),
      source: ik(27, "Ibn Kathir says Allah rebukes them for giving angels female names and calling them His daughters.", "Allah the Exalted admonishes the idolators for calling the angels female names"),
      difficulty: 2,
      questions: [
        { q: "Who named angels with female names, in 53:27?", a: "Those who deny the Hereafter", wrong: ["The prophets", "The believers", "The angels"], why: "Verily, those who believe not in the Hereafter, name the angels with female names." },
        { q: "What did they claim, per Ibn Kathir?", a: "Angels are Allah's daughters", wrong: ["Angels are jinn", "Angels are kings", "Angels are stars"], why: "Claiming that they are Allah's daughters." },
        { q: "Which ayah does Ibn Kathir link?", a: "43:19", wrong: ["1:1", "2:1", "114:1"], why: "And they make females the angels, who themselves are servants of the Most Gracious. 43:19." }
      ]
    },
    {
      slug: "guessing-is-not-truth",
      title: "Guessing is not truth",
      line: "They have no knowledge; a guess can never replace the truth.",
      facts: ["Zann: a guess", "Truth needs knowledge"],
      quote: q53(28),
      source: ik(28, "Ibn Kathir says conjecture brings no benefit and never takes the place of truth.", "conjecture is of no benefit and never takes the place of truth"),
      difficulty: 2,
      questions: [
        { q: "What do they have, in 53:28?", a: "No knowledge", wrong: ["Clear proof", "A book", "A prophet"], why: "But they have no knowledge thereof." },
        { q: "Can a guess replace the truth?", a: "No, never", wrong: ["Yes", "Sometimes", "If many agree"], why: "Conjecture is of no benefit and never takes the place of truth." },
        { tf: true, q: "Zann in 53:28 means conjecture.", why: "They follow but conjecture, and verily, conjecture is no substitute for the truth." }
      ]
    },
    {
      slug: "beware-of-suspicion",
      title: "Beware of suspicion",
      line: "Suspicion is the most false of talk, so beware of it.",
      facts: ["Do not spy", "Be brothers"],
      quote: q53(28),
      source: hadith("bukhari", "6064", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said: beware of suspicion, for it is the worst of false talk; do not spy, envy or hate one another, and be brothers.", "Beware of suspicion, for suspicion is the worst of false tales"),
      difficulty: 2,
      questions: [
        { q: "What is suspicion, per Bukhari 6064?", a: "The worst of false tales", wrong: ["A good habit", "Wisdom", "Caution"], why: "Beware of suspicion, for suspicion is the worst of false tales." },
        { q: "What does Bukhari 6064 tell us to be?", a: "Brothers", wrong: ["Rivals", "Strangers", "Spies"], why: "O Allah's worshipers! Be brothers." },
        { tf: true, q: "Ibn Kathir cites this to explain 53:28.", why: "In a Hadith recorded in the Sahih, the Messenger of Allah said, Beware of suspicion, for suspicion is the most lying speech." }
      ]
    },
    {
      slug: "turn-from-the-heedless",
      title: "Turn from the heedless",
      line: "Turn away from those who want only this world's life.",
      facts: ["This world is their goal", "Do not follow them"],
      quote: q53(29),
      source: ik(29, "Ibn Kathir says stay away from those who turn from the truth and whose only aim is this life.", "stay away from those who turn away from the Truth and shun them"),
      difficulty: 2,
      questions: [
        { q: "From whom should we withdraw, in 53:29?", a: "Those who turn from the Reminder", wrong: ["The poor", "The sick", "Travelers"], why: "Therefore withdraw from him who turns away from Our Reminder." },
        { q: "What do they desire, in 53:29?", a: "Only this world's life", wrong: ["The Hereafter", "Knowledge", "Guidance"], why: "And desires nothing but the life of this world." },
        { tf: true, q: "Their aim and knowledge are only about this life.", why: "Whose aim and knowledge are concentrated on this life." }
      ]
    },
    {
      slug: "the-limit-of-their-knowledge",
      title: "The limit of their knowledge",
      line: "Worldly life is all they know; Allah knows who is guided.",
      facts: ["A short reach of knowledge", "Allah knows best"],
      quote: q53(30),
      source: ik(30, "Ibn Kathir says seeking this life is the best knowledge they reached, and Allah knows best who is guided.", "seeking this life and striving hard in its affairs is the best knowledge they have acquired"),
      difficulty: 3,
      questions: [
        { q: "What is the limit of their knowledge, in 53:30?", a: "This worldly life", wrong: ["The stars", "The Quran", "The Hereafter"], why: "That is what they could reach of knowledge, meaning, seeking this life." },
        { q: "Who knows best who is guided, in 53:30?", a: "Your Lord", wrong: ["The poets", "The elders", "Everyone"], why: "Verily, your Lord is He, Who knows best him who goes astray from His path, and He knows best him who receives guidance." },
        { q: "Which dua does Ibn Kathir mention?", a: "Make not this life our main concern", wrong: ["Give us gold", "Make us famous", "Give us long life"], why: "O Allah! Make not this life the greatest of our concerns nor the best knowledge that we can attain." }
      ]
    },
    {
      slug: "all-belongs-to-allah",
      title: "All belongs to Allah",
      line: "All in the heavens and earth is Allah's; He repays every deed.",
      facts: ["Good for good", "He rules with justice"],
      quote: q53(31),
      source: ik(31, "Ibn Kathir says Allah owns the heavens and earth, rules with justice, and repays each by their deeds, good for good and evil for evil.", "He recompenses each according to his or her deeds, good for good and evil for evil"),
      difficulty: 2,
      questions: [
        { q: "To whom does all in the heavens belong, in 53:31?", a: "Allah", wrong: ["The angels", "The kings", "No one"], why: "And to Allah belongs all that is in the heavens and all that is on the earth." },
        { q: "How does Allah repay, per Ibn Kathir?", a: "Good for good, evil for evil", wrong: ["By chance", "Evil for good", "Equal for all"], why: "He recompenses each according to his or her deeds, good for good and evil for evil." },
        { tf: true, q: "Those who do good get what is best.", why: "And reward those who do good, with what is best." }
      ]
    },
    {
      slug: "avoiding-great-sins",
      title: "Avoiding great sins",
      line: "The good avoid great sins; Allah forgives small slips.",
      facts: ["Al-Lamam: small faults", "His forgiveness is vast"],
      quote: q53(32),
      source: ik(32, "Ibn Kathir says Al-Lamam means small faults and minor errors, and those who avoid great sins are forgiven them.", "Al-Lamam means, small faults and minor errors"),
      difficulty: 3,
      questions: [
        { q: "What do the good-doers avoid, in 53:32?", a: "Great sins", wrong: ["Hard work", "Charity", "Prayer"], why: "Those who avoid great sins and Al-Fawahish." },
        { q: "What is Al-Lamam, per Ibn Kathir?", a: "Small faults", wrong: ["Great sins", "Good deeds", "Prayers"], why: "Al-Lamam means, small faults and minor errors." },
        { q: "Which ayah does Ibn Kathir link to 53:32?", a: "4:31", wrong: ["1:1", "2:255", "112:1"], why: "If you avoid the great sins which you are forbidden to do, We shall expiate from you your small sins. 4:31." }
      ]
    },
    {
      slug: "do-not-claim-purity",
      title: "Do not claim purity",
      line: "Do not praise yourselves as pure; Allah knows the pious.",
      facts: ["He knew us from creation", "Humility, not boasting"],
      quote: q53(32),
      source: ik(32, "Ibn Kathir says Allah forbids praising oneself as pure and thinking highly of one's own deeds.", "forbidding one from ascribing purity and praising himself"),
      difficulty: 2,
      questions: [
        { q: "What does 53:32 forbid?", a: "Claiming purity for ourselves", wrong: ["Eating meat", "Traveling", "Trading"], why: "So, ascribe not purity to yourselves." },
        { q: "Who knows best who has Taqwa?", a: "Allah", wrong: ["Our friends", "Ourselves", "The crowd"], why: "He knows best him who has Taqwa." },
        { tf: true, q: "Allah knew us when we were made from earth.", why: "He knows you well when He created you from the earth." }
      ]
    },
    {
      slug: "the-name-barrah",
      title: "The name Barrah",
      line: "He ﷺ changed the name Barrah, the pious, to Zaynab.",
      facts: ["Barrah: the pious one", "Allah knows the pious"],
      quote: q53(32),
      source: hadith("muslim", "2142", "Zaynab bint Abi Salamah", "Sahih", "Zaynab said she was named Barrah, and the Prophet ﷺ said: do not hold yourselves pious, Allah knows who is pious; name her Zaynab.", "It is God alone who knows the people of piety among you"),
      difficulty: 3,
      questions: [
        { q: "What name did he ﷺ change, per Muslim 2142?", a: "Barrah", wrong: ["Fatimah", "Maryam", "Aishah"], why: "I was also called Barra, but Allah's Messenger said: Do not hold yourself to be pious." },
        { q: "What new name did he ﷺ give?", a: "Zaynab", wrong: ["Khadijah", "Asma", "Hafsah"], why: "Then, what name should we give to her? He said: Name her as Zainab." },
        { q: "Why was Barrah changed, per Muslim 2142?", a: "Only Allah knows the pious", wrong: ["It was too long", "It was foreign", "It was rude"], why: "It is God alone who knows the people of piety among you." }
      ]
    },
    {
      slug: "praise-with-care",
      title: "Praise with care",
      line: "Overpraising a friend harms him; say: I think so, Allah knows.",
      facts: ["Praise can harm", "Leave judgment to Allah"],
      quote: q53(32),
      source: hadith("bukhari", "2662", "Abu Bakrah", "Sahih", "When a man praised another, the Prophet ﷺ said: you have cut your companion's neck; whoever must praise should say, I think so, and Allah knows the truth.", "Allah knows exactly the truth"),
      difficulty: 3,
      questions: [
        { q: "What did he ﷺ say overpraise does, per Bukhari 2662?", a: "Cuts your companion's neck", wrong: ["Makes him rich", "Makes him wise", "Helps him"], why: "Woe to you, you have cut off your companion's neck." },
        { q: "What should one say when praising?", a: "I think so, Allah knows", wrong: ["He is perfect", "He is the best", "Nothing at all"], why: "I think that he is so and so, and Allah knows exactly the truth." },
        { tf: true, q: "Ibn Kathir cites this under 53:32.", why: "So, ascribe not purity to yourselves. A man praised another man before the Prophet ﷺ. Al-Bukhari, Muslim, Abu Dawud and Ibn Majah collected this Hadith." }
      ]
    }
  ]
};

/** Ayahs 33 to 62: the one who stopped giving, the scrolls of Ibrahim and Musa, Allah's power over life, and the call to prostrate. */
const NAJM_THREE: DeepUnit = {
  key: "najm3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-53",
  name: "An-Najm, ayahs 33 to 62",
  kind: "skill",
  lessonType: "surah",
  surahName: "An-Najm",
  lessons: [
    {
      slug: "he-turned-away",
      title: "He turned away",
      line: "Have you seen the one who turned away from obeying Allah?",
      facts: ["Turning from obedience", "Like 75:31-32"],
      quote: q53(33),
      source: ik(33, "Ibn Kathir says Allah rebukes those who turn away from His obedience.", "Allah the Exalted chastises those who turn away from His obedience"),
      difficulty: 1,
      questions: [
        { q: "Whom does 53:33 point to?", a: "One who turned away", wrong: ["One who prayed", "One who gave", "One who fasted"], why: "Did you observe him who turned away." },
        { q: "What did he turn away from, per Ibn Kathir?", a: "Obeying Allah", wrong: ["His home", "His job", "His friends"], why: "Allah the Exalted chastises those who turn away from His obedience." },
        { q: "Which ayahs does Ibn Kathir link to 53:33?", a: "75:31-32", wrong: ["1:1-7", "2:1-5", "112:1-4"], why: "So he neither believed nor prayed! But on the contrary, he belied and turned away! 75:31-32." }
      ]
    },
    {
      slug: "gave-a-little-then-stopped",
      title: "Gave a little, then stopped",
      line: "He gave a little, then stopped, like diggers who hit a rock.",
      facts: ["Stingy from fear of poverty", "Keep giving"],
      quote: q53(34),
      source: ik(34, "Ikrimah and Said said he is like people digging a well who hit a rock and give up the work.", "Like the case of a people who dig a well"),
      difficulty: 2,
      questions: [
        { q: "What did he do, in 53:34?", a: "Gave a little, then stopped", wrong: ["Gave everything", "Never gave", "Gave daily"], why: "And gave a little, then stopped." },
        { q: "What example did Ikrimah give?", a: "Diggers who hit a rock", wrong: ["A ship in a storm", "A lost camel", "A broken bow"], why: "Like the case of a people who dig a well, during the course of which they find a rock preventing them from completing their work." },
        { tf: true, q: "Ibn Abbas said: gave a little, then stopped giving.", why: "Ibn Abbas said, Gave a little, then stopped giving." }
      ]
    },
    {
      slug: "does-he-know-the-unseen",
      title: "Does he know the Unseen?",
      line: "Does he know the Unseen, that giving will make him poor? No.",
      facts: ["Allah replaces what we spend", "Spend, O Bilal"],
      quote: q53(35),
      source: ik(35, "Ibn Kathir says he stopped giving out of fear of poverty, as if he knew the Unseen, but Allah replaces what is spent.", "who stopped giving for fear of poverty"),
      difficulty: 2,
      questions: [
        { q: "What does 53:35 ask?", a: "Does he know the Unseen?", wrong: ["Does he own land?", "Can he read?", "Is he strong?"], why: "Is with him the knowledge of the Unseen so that he sees?" },
        { q: "Why did he stop giving, per Ibn Kathir?", a: "Fear of poverty", wrong: ["Illness", "A long trip", "Forgetfulness"], why: "Does this person, who stopped giving for fear of poverty, have knowledge of the Unseen?" },
        { q: "What does 34:39 promise, per Ibn Kathir?", a: "Allah replaces what you spend", wrong: ["Wealth never grows", "Giving is lost", "Only kings give"], why: "And whatsoever you spend of anything in Allah's cause, He will replace it. 34:39." }
      ]
    },
    {
      slug: "the-scrolls-of-musa",
      title: "The scrolls of Musa",
      line: "Was he not told what is in the Scrolls of Musa?",
      facts: ["Suhuf: scrolls", "Old truths repeated"],
      quote: q53(36),
      source: ik(36, "Ibn Kathir says the next ayahs explain what Allah revealed in the Scripture of Ibrahim and Musa.", "Allah the Exalted explained what He has revealed in the Scripture of Ibrahim and Musa"),
      difficulty: 1,
      questions: [
        { q: "Whose scrolls are named, in 53:36?", a: "Musa", wrong: ["Nuh", "Yunus", "Dawud"], why: "Or is he not informed with what is in the Suhuf of Musa." },
        { q: "What does Suhuf mean?", a: "Scrolls", wrong: ["Swords", "Ships", "Stones"], why: "What is in the Suhuf of Musa." },
        { tf: true, q: "The following ayahs explain what the scrolls say.", why: "Allah the Exalted explained what He has revealed in the Scripture of Ibrahim and Musa." }
      ]
    },
    {
      slug: "ibrahim-who-fulfilled",
      title: "Ibrahim who fulfilled",
      line: "Ibrahim fulfilled every command and conveyed all of it.",
      facts: ["He obeyed fully", "Made an Imam for mankind"],
      quote: q53(37),
      source: ik(37, "Ibn Abbas said Ibrahim delivered all that Allah ordered him to deliver; he fulfilled every command.", "He delivered all that Allah ordered him to deliver"),
      difficulty: 2,
      questions: [
        { q: "How is Ibrahim described, in 53:37?", a: "He fulfilled", wrong: ["He forgot", "He slept", "He doubted"], why: "And of Ibrahim who fulfilled all that." },
        { q: "What did fulfilled mean, per Ibn Abbas?", a: "Delivered all he was ordered", wrong: ["Built a city", "Won a war", "Traveled far"], why: "He delivered all that Allah ordered him to deliver." },
        { q: "Which ayah does Ibn Kathir link?", a: "2:124, made an Imam", wrong: ["1:1", "112:1", "114:1"], why: "Verily, I am going to make you an Imam for mankind. 2:124." }
      ]
    },
    {
      slug: "no-one-bears-anothers-burden",
      title: "No one bears another's load",
      line: "No soul will carry the sins of another soul.",
      facts: ["Each carries its own", "Even close family cannot"],
      quote: q53(38),
      source: ik(38, "Ibn Kathir says every soul carries its own wrongs, and no one else carries its burden of sin.", "every soul shall carry its own injustices"),
      difficulty: 2,
      questions: [
        { q: "What does 53:38 say?", a: "No one bears another's burden", wrong: ["Parents carry all", "The tribe carries all", "Kings carry all"], why: "That no burdened person shall bear the burden of another." },
        { q: "Whose wrongs does each soul carry?", a: "Its own", wrong: ["Its parents'", "Its friends'", "Nobody's"], why: "Every soul shall carry its own injustices." },
        { q: "Which ayah does Ibn Kathir link to 53:38?", a: "35:18", wrong: ["1:1", "2:255", "112:1"], why: "Nothing of it will be lifted even though he be near of kin. 35:18." }
      ]
    },
    {
      slug: "only-what-he-strives-for",
      title: "Only what he strives for",
      line: "A person has nothing but what he strives for.",
      facts: ["Your effort counts", "Good you earn yourself"],
      quote: q53(39),
      source: ik(39, "Ibn Kathir says just as no soul carries another's burden, a soul benefits only from the good it earns.", "the soul shall only benefit from the good that one earns for himself"),
      difficulty: 2,
      questions: [
        { q: "What does man have, in 53:39?", a: "Only what he does", wrong: ["What he wishes", "What others do", "What he inherits"], why: "And that man can have nothing but what he does." },
        { q: "From whose good does a soul benefit?", a: "Its own earning", wrong: ["Anyone's", "The king's", "Luck's"], why: "The soul shall only benefit from the good that one earns for himself." },
        { tf: true, q: "A righteous child is part of what a parent earned.", why: "These three things are, in reality, a result of one's own deeds, efforts and actions." }
      ]
    },
    {
      slug: "calling-to-guidance",
      title: "Calling to guidance",
      line: "Whoever calls to good gets the reward of all who follow.",
      facts: ["Their reward is not reduced", "Teaching is a deed"],
      quote: q53(39),
      source: hadith("muslim", "2674", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said whoever calls to righteousness gets a reward like those who follow it, without their rewards being reduced.", "without their rewards being diminished in any respect"),
      difficulty: 3,
      questions: [
        { q: "What does one who calls to good get, per Muslim 2674?", a: "Rewards like those who follow", wrong: ["Nothing", "Half a reward", "Only praise"], why: "There would be reward for him like the rewards of those who adhered to it." },
        { q: "Are the followers' rewards reduced?", a: "No, not at all", wrong: ["Yes, by half", "A little", "Only once"], why: "Without their rewards being diminished in any respect." },
        { tf: true, q: "Ibn Kathir says spreading knowledge counts as one's own deed.", why: "The knowledge that one spreads among people which they are guided by is among his actions and deeds." }
      ]
    },
    {
      slug: "deeds-will-be-seen",
      title: "Deeds will be seen",
      line: "Every person's deeds will be seen on the Day of Resurrection.",
      facts: ["Nothing hidden", "Like 9:105"],
      quote: q53(40),
      source: ik(40, "Ibn Kathir says deeds will be seen on the Day of Resurrection, and Allah will remind people of them.", "Then Allah will remind you of your actions"),
      difficulty: 1,
      questions: [
        { q: "What will be seen, in 53:40?", a: "His deeds", wrong: ["His house", "His wealth", "His family"], why: "And that his deeds will be seen." },
        { q: "When will deeds be seen, per Ibn Kathir?", a: "The Day of Resurrection", wrong: ["Every Friday", "In old age", "Never"], why: "And that his deeds will be seen, meaning, on the Day of Resurrection." },
        { q: "Which ayah does Ibn Kathir link to 53:40?", a: "9:105", wrong: ["1:1", "112:1", "114:1"], why: "And say: Do deeds! Allah will see your deeds. 9:105." }
      ]
    },
    {
      slug: "the-fullest-reward",
      title: "The fullest reward",
      line: "Then he will be repaid with the fullest repayment.",
      facts: ["Good for good", "Nothing left out"],
      quote: q53(41),
      source: ik(41, "Ibn Kathir says Allah will repay them for their actions in the best manner, good for good and evil for evil.", "recompense you for them in the best manner"),
      difficulty: 1,
      questions: [
        { q: "How is he repaid, in 53:41?", a: "Full and best recompense", wrong: ["Half", "Nothing", "Late"], why: "Then he will be recompensed with a full and the best recompense." },
        { q: "How does Allah repay, per Ibn Kathir?", a: "In the best manner", wrong: ["Unfairly", "Randomly", "Partly"], why: "Then Allah will remind you of your actions and recompense you for them in the best manner." },
        { tf: true, q: "Allah repays good with good and evil with evil.", why: "Good for good and evil for evil." }
      ]
    },
    {
      slug: "the-end-is-to-allah",
      title: "The end is to Allah",
      line: "To your Lord is the final return of everything.",
      facts: ["To Paradise or the Fire", "Muadh warned the people"],
      quote: q53(42),
      source: ik(42, "Ibn Kathir says this is the return of everything on the Day of Resurrection.", "the return of everything on the Day of Resurrection"),
      difficulty: 1,
      questions: [
        { q: "What is to your Lord, in 53:42?", a: "The End", wrong: ["The middle", "Nothing", "Only rain"], why: "And that to your Lord is the End." },
        { q: "What is the End, per Ibn Kathir?", a: "The return of everything", wrong: ["The end of a book", "Night", "Old age"], why: "Meaning, the return of everything on the Day of Resurrection." },
        { tf: true, q: "Muadh told people the return is to Allah.", why: "Know that the Return is to Allah, either to Paradise or the Fire." }
      ]
    },
    {
      slug: "laughter-and-tears",
      title: "Laughter and tears",
      line: "Allah is the One who makes us laugh and makes us cry.",
      facts: ["He made both", "And their causes"],
      quote: q53(43),
      source: ik(43, "Ibn Kathir says Allah created in His creatures the ability to laugh and weep, and the causes of each.", "He created in His creatures the ability to laugh or weep"),
      difficulty: 1,
      questions: [
        { q: "What does Allah cause, in 53:43?", a: "Laughter and weeping", wrong: ["Rain and wind", "Day and night", "Gold and silver"], why: "And that it is He Who makes laugh, and makes weep." },
        { q: "What else did He create, per Ibn Kathir?", a: "The causes of each", wrong: ["Only sadness", "Only joy", "Nothing else"], why: "He created in His creatures the ability to laugh or weep and the causes for each of these opposites." },
        { tf: true, q: "Both joy and sadness come from Allah's creation.", why: "He created in His creatures the ability to laugh or weep." }
      ]
    },
    {
      slug: "death-and-life",
      title: "Death and life",
      line: "Allah is the One who causes death and gives life.",
      facts: ["Only He gives life", "Like 67:2"],
      quote: q53(44),
      source: ik(44, "Ibn Kathir links 53:44 to 67:2: Who has created death and life.", "Who has created death and life"),
      difficulty: 1,
      questions: [
        { q: "What does Allah do, in 53:44?", a: "Causes death and gives life", wrong: ["Only gives wealth", "Only sends rain", "Only grows trees"], why: "And that it is He Who causes death and gives life." },
        { q: "Which ayah does Ibn Kathir link?", a: "67:2", wrong: ["1:1", "2:1", "114:1"], why: "Who has created death and life. 67:2." },
        { tf: true, q: "Only Allah gives life and death.", why: "And that it is He Who causes death and gives life." }
      ]
    },
    {
      slug: "the-pairs",
      title: "The pairs",
      line: "Allah creates the pairs, male and female.",
      facts: ["Every pair from Him", "Like 75:36-40"],
      quote: q53(45),
      source: ik(45, "Ibn Kathir explains 53:45 with 75:36-40, which ends: is He not able to give life to the dead?", "And made of him two sexes, male and female"),
      difficulty: 1,
      questions: [
        { q: "What does Allah create, in 53:45?", a: "The pairs, male and female", wrong: ["Only stars", "Only rivers", "Only mountains"], why: "And that He creates the pairs, male and female." },
        { q: "Which ayahs does Ibn Kathir link?", a: "75:36-40", wrong: ["1:1-7", "2:1-5", "114:1-6"], why: "And made of him two sexes, male and female. Is not He able to give life to the dead? 75:36-40." },
        { tf: true, q: "The One who creates can also bring the dead to life.", why: "Is not He Allah able to give life to the dead?" }
      ]
    },
    {
      slug: "from-a-small-drop",
      title: "From a small drop",
      line: "Allah makes a person from a tiny drop.",
      facts: ["Nutfah: a small drop", "A sign of His power"],
      quote: q53(46),
      source: ik(46, "Ibn Kathir explains the ayahs: He creates the pairs, male and female, from Nutfah.", "From Nutfah when it is emitted"),
      difficulty: 2,
      questions: [
        { q: "From what does Allah create, in 53:46?", a: "A Nutfah", wrong: ["Gold", "Fire", "Light"], why: "From Nutfah when it is emitted." },
        { q: "What does 53:46 show?", a: "Allah's power to create", wrong: ["Man's power", "Chance", "Nature alone"], why: "From Nutfah when it is emitted." },
        { tf: true, q: "53:46 follows the creation of pairs in 53:45.", why: "And that He creates the pairs, male and female. From Nutfah when it is emitted." }
      ]
    },
    {
      slug: "another-bringing-forth",
      title: "Another bringing forth",
      line: "Allah will bring everyone back to life a second time.",
      facts: ["He made us first", "He can bring us back"],
      quote: q53(47),
      source: ik(47, "Ibn Kathir says just as He first began creation, He is able to bring it back to life for the Day of Judgement.", "just as He first originated creation, He is able to bring it back to life"),
      difficulty: 2,
      questions: [
        { q: "What is upon Allah, in 53:47?", a: "Another bringing forth", wrong: ["Another flood", "Another sun", "Another sea"], why: "And that upon Him is another bringing forth." },
        { q: "What is that bringing forth, per Ibn Kathir?", a: "The Resurrection", wrong: ["A new tree", "A new city", "Spring"], why: "Resurrecting it for the Day of Judgement." },
        { tf: true, q: "Creating again is like creating the first time.", why: "Just as He first originated creation, He is able to bring it back to life." }
      ]
    },
    {
      slug: "wealth-and-contentment",
      title: "Wealth and contentment",
      line: "Allah gives wealth and He gives contentment.",
      facts: ["Aghna: He enriches", "Aqna: He gives contentment"],
      quote: q53(48),
      source: ik(48, "Ibn Abbas and Mujahid said Aghna means He granted, and Aqna means He gave contentment.", "He gave contentment"),
      difficulty: 3,
      questions: [
        { q: "What does Aghna mean, per Mujahid?", a: "He gives wealth", wrong: ["He takes away", "He punishes", "He forgets"], why: "Mujahid said that, Aghna meaning: He gives wealth." },
        { q: "What does Aqna mean, per Ibn Abbas?", a: "He gave contentment", wrong: ["He gave hunger", "He gave fear", "He gave war"], why: "Ibn Abbas and Mujahid said, Aqna means: He gave contentment." },
        { tf: true, q: "Being content is a gift from Allah.", why: "Aqna means: He gave contentment." }
      ]
    },
    {
      slug: "lord-of-sirius",
      title: "Lord of Sirius",
      line: "Allah is the Lord of Ash-Shira, a star some Arabs worshipped.",
      facts: ["Ash-Shira: Sirius", "A star is only created"],
      quote: q53(49),
      source: ik(49, "Ibn Abbas and others said Ash-Shira is the bright star Sirius, which a group of Arabs used to worship.", "which a group of Arabs used to worship"),
      difficulty: 2,
      questions: [
        { q: "What is Ash-Shira, per Ibn Abbas?", a: "The bright star Sirius", wrong: ["The moon", "A mountain", "A river"], why: "Ash-Shira, it is the bright star, named Mirzam Al-Jawza, Sirius." },
        { q: "Who used to worship it?", a: "A group of Arabs", wrong: ["The Romans", "The angels", "The jinn"], why: "Which a group of Arabs used to worship." },
        { tf: true, q: "Allah is the Lord even of the star they worshipped.", why: "And that He is the Lord of Ash-Shira." }
      ]
    },
    {
      slug: "the-former-ad",
      title: "The former Ad",
      line: "Allah destroyed the former Ad, the people of Hud.",
      facts: ["Strong and rebellious", "A wind of seven nights"],
      quote: q53(50),
      source: ik(50, "Ibn Kathir says Ad, the people of Hud, were among the strongest people and the most rebellious against Allah.", "were among the strongest, fiercest people"),
      difficulty: 2,
      questions: [
        { q: "Whom did Allah destroy, in 53:50?", a: "The former Ad", wrong: ["Quraysh", "The Romans", "The Persians"], why: "And that it is He Who destroyed the former Ad." },
        { q: "Whose people were Ad, per Ibn Kathir?", a: "Hud", wrong: ["Salih", "Shuayb", "Lut"], why: "The former Ad, the people of Hud." },
        { q: "How long did the wind last, in 69:7?", a: "Seven nights, eight days", wrong: ["One night", "Forty days", "A year"], why: "Which Allah imposed in them for seven nights and eight days in succession. 69:6-7." }
      ]
    },
    {
      slug: "thamud-none-spared",
      title: "Thamud, none spared",
      line: "And Thamud: He left none of them remaining.",
      facts: ["The people of Salih", "All were destroyed"],
      quote: q53(51),
      source: ik(51, "Ibn Kathir says Allah destroyed all of Thamud and spared none of them.", "He destroyed them all and spared none of them"),
      difficulty: 1,
      questions: [
        { q: "Which people are named, in 53:51?", a: "Thamud", wrong: ["Madyan", "Saba", "Quraysh"], why: "And Thamud. He spared none of them." },
        { q: "How many of them were spared?", a: "None", wrong: ["Half", "Most", "Only the rich"], why: "He destroyed them all and spared none of them." },
        { tf: true, q: "Thamud came after Ad.", why: "And the people of Nuh aforetime, before Ad and Thamud." }
      ]
    },
    {
      slug: "nuhs-people-before",
      title: "Nuh's people before",
      line: "Before them, Nuh's people were even more unjust and rebellious.",
      facts: ["The earliest of them", "Most rebellious"],
      quote: q53(52),
      source: ik(52, "Ibn Kathir says Nuh's people came before Ad and Thamud and were more unjust in disobeying Allah.", "more unjust in disobeying Allah than those who came after them"),
      difficulty: 2,
      questions: [
        { q: "Who came before Ad and Thamud, in 53:52?", a: "The people of Nuh", wrong: ["The people of Lut", "The people of Musa", "The people of Isa"], why: "And the people of Nuh aforetime, before Ad and Thamud." },
        { q: "How are they described, in 53:52?", a: "More unjust and rebellious", wrong: ["Kind and grateful", "Few and weak", "Wise and fair"], why: "Verily, they were more unjust and more rebellious and transgressing." },
        { tf: true, q: "Nuh's people were more unjust than those after them.", why: "More unjust in disobeying Allah than those who came after them." }
      ]
    },
    {
      slug: "the-overturned-cities",
      title: "The overturned cities",
      line: "He destroyed the overturned cities of Lut's people.",
      facts: ["Sodom and Gomorrah", "Turned upside down"],
      quote: q53(53),
      source: ik(53, "Ibn Kathir says these are the cities to which Lut was sent; Allah turned them upside down.", "Allah turned their cities upside down over them"),
      difficulty: 2,
      questions: [
        { q: "What did Allah destroy, in 53:53?", a: "The overthrown cities", wrong: ["The tall towers", "The great dams", "The ships"], why: "And He destroyed the overthrown cities." },
        { q: "To whom were those cities sent, per Ibn Kathir?", a: "Lut", wrong: ["Hud", "Salih", "Yunus"], why: "The cities of Sodom and Gomorrah to which Lut was sent." },
        { tf: true, q: "Allah turned those cities upside down.", why: "Allah turned their cities upside down over them." }
      ]
    },
    {
      slug: "what-covered-them",
      title: "What covered them",
      line: "Then there covered them what covered them: stones from the sky.",
      facts: ["Stones of Sijjil", "A warning to all"],
      quote: q53(54),
      source: ik(54, "Ibn Kathir says what covered them is like the stones of Sijjil that Allah sent on them.", "is like the case with the stones of Sijjil that He sent on them"),
      difficulty: 2,
      questions: [
        { q: "What does 53:54 say?", a: "There covered them what covered", wrong: ["They were saved", "They moved away", "They became rich"], why: "So, there covered them that which did cover." },
        { q: "What covered them, per Ibn Kathir?", a: "Stones of Sijjil", wrong: ["Snow", "Water", "Leaves"], why: "Is like the case with the stones of Sijjil that He sent on them." },
        { q: "Which ayah does Ibn Kathir link to 53:54?", a: "26:173", wrong: ["1:1", "2:255", "112:1"], why: "And We rained on them a rain of torment. 26:173." }
      ]
    },
    {
      slug: "which-favors-will-you-doubt",
      title: "Which favors will you doubt?",
      line: "Which of your Lord's favors, O man, will you doubt?",
      facts: ["Favors all around us", "Addressed to every person"],
      quote: q53(55),
      source: ik(55, "Qatadah said it means: which of Allah's favors to you, O man, do you doubt; Ibn Jarir preferred this.", "the first explanation is better"),
      difficulty: 2,
      questions: [
        { q: "What does 53:55 ask?", a: "Which favor will you doubt?", wrong: ["Where is your home?", "Who is your king?", "What is your name?"], why: "Then which of the graces of your Lord will you doubt?" },
        { q: "Whom is it addressed to, per Qatadah?", a: "Every person", wrong: ["Only angels", "Only jinn", "Only kings"], why: "Which of Allah's favors for you, O man, do you doubt, according to Qatadah." },
        { tf: true, q: "Ibn Jarir preferred Qatadah's explanation.", why: "The first explanation is better, and it is the meaning that Ibn Jarir preferred." }
      ]
    },
    {
      slug: "a-warner-like-those-before",
      title: "A warner like those before",
      line: "Muhammad ﷺ is a warner like the warners of old.",
      facts: ["Not a new kind of messenger", "Like 46:9"],
      quote: q53(56),
      source: ik(56, "Ibn Kathir says Muhammad ﷺ was sent as a Messenger just as the warners of old were sent.", "he was sent as a Messenger as they were sent as Messengers"),
      difficulty: 1,
      questions: [
        { q: "Who is the warner, in 53:56?", a: "Muhammad ﷺ", wrong: ["A poet", "A king", "A soothsayer"], why: "This is a warner, in reference to Muhammad." },
        { q: "Whom is he like, in 53:56?", a: "The warners of old", wrong: ["The kings", "The poets", "The traders"], why: "This is a warner from the warners of old." },
        { q: "Which ayah does Ibn Kathir link?", a: "46:9", wrong: ["1:1", "2:1", "112:1"], why: "Say: I am not a new thing among the Messengers. 46:9." }
      ]
    },
    {
      slug: "the-urgent-warner",
      title: "The urgent warner",
      line: "He ﷺ warned like a man who rushes to save his people.",
      facts: ["Save yourselves!", "Some listened and were safe"],
      quote: q53(56),
      source: hadith("bukhari", "6482", "Abu Musa", "Sahih", "The Prophet ﷺ compared himself to a man who saw an enemy and rushed to warn his people: those who believed him were safe.", "I am a naked warner"),
      difficulty: 3,
      questions: [
        { q: "What did the warner see, per Bukhari 6482?", a: "Enemy forces", wrong: ["A flood", "A fire", "A storm"], why: "I have seen with my own eyes the enemy forces." },
        { q: "What happened to those who obeyed?", a: "They were safe", wrong: ["They were lost", "They were caught", "They got rich"], why: "A group of them obeyed him and went out at night, slowly and stealthily and were safe." },
        { tf: true, q: "Ibn Kathir cites this to explain the warner in 53:56.", why: "And in the Hadith: I am the naked warner, meaning, I was in such a hurry to warn against the evil I saw coming." }
      ]
    },
    {
      slug: "the-hour-draws-near",
      title: "The Hour draws near",
      line: "Al-Azifah, the Day of Resurrection, has drawn near.",
      facts: ["Al-Azifah: the Near", "Like 54:1"],
      quote: q53(57),
      source: ik(57, "Ibn Kathir says the Azifah is the Day of Resurrection, which has drawn nearer.", "the Day of Resurrection, has drawn nearer"),
      difficulty: 1,
      questions: [
        { q: "What draws near, in 53:57?", a: "Al-Azifah", wrong: ["Ramadan", "Winter", "A caravan"], why: "The Azifah draws near." },
        { q: "What is Al-Azifah, per Ibn Kathir?", a: "The Day of Resurrection", wrong: ["A star", "A storm", "A battle"], why: "That which is near, the Day of Resurrection, has drawn nearer." },
        { q: "Which ayah begins the next surah similarly?", a: "54:1, the Hour has drawn near", wrong: ["2:1", "112:1", "1:1"], why: "The Hour has drawn near. 54:1." }
      ]
    },
    {
      slug: "none-but-allah-can-avert-it",
      title: "None but Allah",
      line: "None but Allah can stop it, and only He knows when.",
      facts: ["Only Allah knows its time", "Be ready now"],
      quote: q53(58),
      source: ik(58, "Ibn Kathir says no one besides Allah can stop it, and no one knows when it will come except Him.", "nor does anyone know when it will come, except Him"),
      difficulty: 2,
      questions: [
        { q: "Who can avert it, in 53:58?", a: "None besides Allah", wrong: ["The angels", "The kings", "The scholars"], why: "None besides Allah can avert it." },
        { q: "Who knows when it will come?", a: "Only Allah", wrong: ["Astrologers", "Soothsayers", "Everyone"], why: "Nor does anyone know when it will come, except Him." },
        { tf: true, q: "We can know the exact date of the Hour.", why: "No. Nor does anyone know when it will come, except Him." }
      ]
    },
    {
      slug: "wondering-at-the-quran",
      title: "Wondering at the Quran",
      line: "Do you wonder at this Quran, doubting that it is true?",
      facts: ["Doubting the truth", "Heedless play"],
      quote: q53(59),
      source: ik(59, "Ibn Kathir says they hear the Quran yet turn away in heedless play, doubting that it is true.", "doubting that it is true"),
      difficulty: 2,
      questions: [
        { q: "At what do they wonder, in 53:59?", a: "This recitation", wrong: ["The stars", "The sea", "The market"], why: "Do you then wonder at this recitation." },
        { q: "What does wonder mean in 53:59, per Ibn Kathir?", a: "Doubting it is true", wrong: ["Loving it", "Studying it", "Writing it"], why: "Wonder, doubting that it is true." },
        { tf: true, q: "They heard the Quran yet turned away in play.", why: "They hear the Quran, yet they turn away from it in heedless play." }
      ]
    },
    {
      slug: "laugh-and-weep-not",
      title: "Laughing, not weeping",
      line: "You laugh at it and do not weep, as believers weep.",
      facts: ["Believers weep humbly", "Like 17:109"],
      quote: q53(60),
      source: ik(60, "Ibn Kathir says they laugh and mock, and do not weep as those who believe in it weep.", "just as those who believe in it weep"),
      difficulty: 2,
      questions: [
        { q: "What do they do, in 53:60?", a: "Laugh and weep not", wrong: ["Weep and pray", "Listen and learn", "Sleep"], why: "And you laugh at it and weep not." },
        { q: "Who weeps at the Quran, per Ibn Kathir?", a: "Those who believe in it", wrong: ["The mockers", "The poets", "The traders"], why: "And weep not, just as those who believe in it weep." },
        { q: "Which ayah does Ibn Kathir link to 53:60?", a: "17:109", wrong: ["1:1", "2:1", "114:1"], why: "And they fall down on their faces weeping and it increases their humility. 17:109." }
      ]
    },
    {
      slug: "samidun",
      title: "Samidun",
      line: "You are Samidun: careless, singing, or turning away.",
      facts: ["Ibn Abbas: singing", "Or: turning away"],
      quote: q53(61),
      source: ik(61, "Ibn Abbas said Samidun means singing, in a Yemeni dialect; another report from him says turning away.", "Turning away"),
      difficulty: 3,
      questions: [
        { q: "What does Samidun mean, in one report from Ibn Abbas?", a: "Singing", wrong: ["Praying", "Fasting", "Sleeping"], why: "Ibn Abbas said about Samidun, Singing; in Yemenite dialect Ismid for us means Sing for us." },
        { q: "What is the other meaning from Ibn Abbas?", a: "Turning away", wrong: ["Weeping", "Listening", "Running"], why: "In another narration from Ibn Abbas, he said that, Samidun means, Turning away." },
        { tf: true, q: "Both meanings show heedlessness of the Quran.", why: "Allah the Exalted admonishes the idolators because they hear the Quran, yet they turn away from it in heedless play." }
      ]
    },
    {
      slug: "fall-down-in-prostration",
      title: "Fall down in prostration",
      line: "So prostrate to Allah and worship Him alone.",
      facts: ["A sajdah ayah", "With sincerity and Tawhid"],
      quote: q53(62),
      source: ik(62, "Ibn Kathir says Allah orders His servants to prostrate and worship Him with submission, sincerity and Tawhid.", "with submission, sincerity, and Tawhid"),
      difficulty: 1,
      questions: [
        { q: "What does 53:62 command?", a: "Prostrate and worship Allah", wrong: ["Travel and trade", "Rest and eat", "Build and plant"], why: "So fall you down in prostration to Allah and worship Him." },
        { q: "How should we worship, per Ibn Kathir?", a: "With sincerity and Tawhid", wrong: ["With pride", "Rarely", "For show"], why: "Meaning, with submission, sincerity, and Tawhid." },
        { tf: true, q: "53:62 is the last ayah of An-Najm.", why: "This is the end of the Tafsir of Surat An-Najm. All praise and thanks are due to Allah." }
      ]
    },
    {
      slug: "the-heart-of-worship",
      title: "The heart of worship",
      line: "Sujud is singled out because it is the core of worship.",
      facts: ["As-Sa'di explains", "Humility of heart and body"],
      quote: q53(62),
      source: saadi(53, 62, "As-Sa'di says sujud is named on its own to show its virtue, since it is the secret and core of worship: the servant humbles his heart and body and puts his noblest part on the ground.", "ليدل ذلك على فضله وأنه سر العبادة ولبها"),
      difficulty: 2,
      questions: [
        { q: "Why is sujud named alone in An-Najm 53:62?", a: "It is the core of worship", wrong: ["It is easiest", "It is shortest", "By chance"], why: "Sujud is the secret and core of worship, says as-Sa'di." },
        { q: "What is the core of worship, per as-Sa'di?", a: "Humility before Allah", wrong: ["Speed", "Loud voice", "Many people"], why: "Its core is humility and submission to Allah." },
        { tf: true, q: "In sujud a person puts his face on the ground for Allah.", why: "As-Sa'di on 53:62." }
      ]
    },
    {
      slug: "all-prostrated",
      title: "All prostrated",
      line: "At An-Najm, Muslims, pagans and jinn prostrated with him ﷺ.",
      facts: ["Ibn Abbas reported it", "Even the pagans bowed"],
      quote: q53(62),
      source: hadith("bukhari", "1071", "Ibn Abbas", "Sahih", "Ibn Abbas said the Prophet ﷺ prostrated while reciting An-Najm, and with him prostrated the Muslims, the pagans, the jinn and all the people.", "with him prostrated the Muslims, the pagans, the jinns, and all human beings"),
      difficulty: 2,
      questions: [
        { q: "Who prostrated with him ﷺ, per Bukhari 1071?", a: "Muslims, pagans and jinn", wrong: ["Only Muslims", "Only angels", "No one"], why: "With him prostrated the Muslims, the pagans, the jinns, and all human beings." },
        { q: "Which surah was he ﷺ reciting?", a: "An-Najm", wrong: ["Al-Fatihah", "Yasin", "Al-Mulk"], why: "The Prophet ﷺ prostrated while reciting An-Najm." },
        { tf: true, q: "Al-Muttalib later always prostrated at the end of An-Najm.", why: "Ever since he became Muslim, he would never hear anyone recite this Surah until the end, without prostrating." }
      ]
    }
  ]
};

export const NAJM_UNITS: readonly DeepUnit[] = [NAJM_ONE, NAJM_TWO, NAJM_THREE];
