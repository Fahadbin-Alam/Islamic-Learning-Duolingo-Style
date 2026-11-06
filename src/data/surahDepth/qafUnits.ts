import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Qaf ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Qaf 50:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_50_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Qaf 50:${ayah}`,
    url: `https://quran.com/50:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 50:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q50 = (ayah: number) => quranQuote(50, ayah);

/** Ayahs 1 to 15: the Glorious Quran, wonder at being raised again, signs in the sky and earth, and nations before. */
const QAF_ONE: DeepUnit = {
  key: "qaf1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-50",
  name: "Qaf, ayahs 1 to 15",
  kind: "skill",
  lessonType: "surah",
  surahName: "Qaf",
  lessons: [
    {
      slug: "first-of-the-mufassal",
      title: "First of the Mufassal",
      line: "Qaf begins the Mufassal, the last part of the Quran.",
      facts: ["Mufassal: the shorter surahs", "The Companions counted to find it"],
      quote: q50(1),
      source: ik(1, "Ibn Kathir says Surah Qaf is the first surah of the Mufassal section, as the Companions divided the Quran.", "is the first of the Mufassal, just as we stated"),
      difficulty: 1,
      questions: [
        { q: "Which section does Surah Qaf begin, per Ibn Kathir?", a: "The Mufassal", wrong: ["The first seven", "The middle", "The very end"], why: "Surah Qaf (chapter 50) is the first of the Mufassal, just as we stated." },
        { q: "Who divided the Quran into groups to find the Mufassal?", a: "The Companions", wrong: ["Poets of Makkah", "Later kings", "Nobody"], why: "I asked the Companions of Allah's Messenger how they divided the Qur'an." },
        { tf: false, q: "Ibn Kathir says the Mufassal starts at Surah An-Naba.", why: "This is not true because none of the respected scholars ever supported this opinion." }
      ]
    },
    {
      slug: "recited-on-eid",
      title: "Recited on Eid",
      line: "He ﷺ recited Qaf and Al-Qamar in the Eid prayers.",
      facts: ["Umar asked Abu Waqid", "Qaf and Al-Qamar, surah 54"],
      quote: q50(1),
      source: hadith("muslim", "891", "Abu Waqid al-Laythi", "Sahih", "Umar asked Abu Waqid what the Prophet ﷺ recited in the two Eid prayers. He said: Qaf, and The Hour drew near (Al-Qamar).", "He used to recite in them"),
      difficulty: 2,
      questions: [
        { q: "Who asked what he ﷺ recited on Eid, per Muslim 891?", a: "Umar ibn Al-Khattab", wrong: ["Abu Bakr", "Ali", "Uthman"], why: "Umar b. Khattab asked Abu Waqid al-Laithi what the Messenger of Allah used to recite on Id-ul-Adha and Id-ul-Fitr." },
        { q: "Which two surahs did he ﷺ recite on Eid, per Muslim 891?", a: "Qaf and Al-Qamar", wrong: ["Al-Fatihah and An-Nas", "Yasin and Al-Mulk", "Al-Kahf and Maryam"], why: "Qaf. By the Glorious Qur'an, and The Hour drew near, and the moon was rent asunder." },
        { tf: true, q: "Muslim 891 covers both Eid al-Fitr and Eid al-Adha.", why: "What the Messenger of Allah used to recite on Id-ul-Adha and Id-ul-Fitr." }
      ]
    },
    {
      slug: "the-friday-surah",
      title: "The Friday surah",
      line: "A woman learned Qaf from hearing him ﷺ on Fridays.",
      facts: ["Umm Hisham was his neighbor", "Recited from the minbar"],
      quote: q50(1),
      source: hadith("muslim", "873", "Umm Hisham bint Harithah", "Sahih", "Umm Hisham said she learned Surah Qaf only from the tongue of the Prophet ﷺ, who recited it every Friday on the minbar.", "who used to recite it every Friday on the pulpit when he delivered the sermon to the people"),
      difficulty: 2,
      questions: [
        { q: "How did Umm Hisham learn Surah Qaf, per Muslim 873?", a: "From hearing him ﷺ recite it", wrong: ["From a book", "From her father", "In a dream"], why: "I learnt Qaf. By the Glorious Qur'an from no other source than the tongue of Allah's Messenger." },
        { q: "When did he ﷺ recite Qaf, per Muslim 873?", a: "Every Friday in the sermon", wrong: ["Only in Ramadan", "Only at night", "Once a year"], why: "Who used to recite it every Friday on the pulpit when he delivered the sermon to the people." },
        { q: "What did Umm Hisham share with the Prophet's ﷺ home?", a: "An oven", wrong: ["A well", "A garden", "A camel"], why: "Our oven and that of the Messenger of Allah was one for two years." }
      ]
    },
    {
      slug: "why-qaf-for-crowds",
      title: "Why Qaf for crowds",
      line: "Qaf tells of creation, the Return, and the reward.",
      facts: ["Read at big gatherings", "Hope and warning together"],
      quote: q50(1),
      source: ik(1, "Ibn Kathir says Qaf was recited at Eid and Friday because it tells of creation, Resurrection, the Reckoning, Paradise and reward.", "this Surah contains news of the beginning of creation, Resurrection, the Return"),
      difficulty: 2,
      questions: [
        { q: "Why was Qaf read at big gatherings, per Ibn Kathir?", a: "Tells of creation and the Return", wrong: ["Very short", "Easy rhymes", "About trade"], why: "This Surah contains news of the beginning of creation, Resurrection, the Return." },
        { q: "Where else did he ﷺ recite Qaf besides Fridays?", a: "At the Eids", wrong: ["At weddings", "At markets", "On journeys only"], why: "The Messenger of Allah used to recite this Surah during large gatherings such as the Ids and during Friday sermons." },
        { tf: true, q: "Qaf holds both encouragement and warning, per Ibn Kathir.", why: "Lessons of encouragement, and lessons of discouragement." }
      ]
    },
    {
      slug: "the-letter-qaf",
      title: "The letter Qaf",
      line: "Qaf is one of the letters that open some surahs.",
      facts: ["Like Sad, Nun and Alif Lam Mim", "Allah knows their full meaning"],
      quote: q50(1),
      source: ik(1, "Ibn Kathir says Qaf is one of the single letters that begin some surahs, like Sad and Nun.", "which is one of the letters of the alphabet that are mentioned in the beginning of some Surahs"),
      difficulty: 1,
      questions: [
        { q: "What is Qaf at the start of 50:1, per Ibn Kathir?", a: "A letter that opens some surahs", wrong: ["A city", "A mountain", "A name of a prophet"], why: "Which is one of the letters of the alphabet that are mentioned in the beginning of some Surahs." },
        { q: "Which surah also opens with one letter, like Qaf?", a: "Sad, surah 38", wrong: ["Al-Fatihah", "Al-Ikhlas", "An-Nas"], why: "Sad. (38:1)" },
        { tf: true, q: "Nun (68:1) is another surah opening with a letter.", why: "Nun. (68:1)" }
      ]
    },
    {
      slug: "the-glorious-quran",
      title: "The Glorious Quran",
      line: "Allah swears by the honorable and great Quran.",
      facts: ["Falsehood cannot reach it", "Sent by the All-Wise"],
      quote: q50(1),
      source: ik(1, "Ibn Kathir says By the Glorious Quran means by the honorable and great Quran, which falsehood cannot reach.", "means by the Honorable and Great"),
      difficulty: 1,
      questions: [
        { q: "By what does Allah swear in 50:1?", a: "The Glorious Quran", wrong: ["The sun", "The fig", "The dawn"], why: "Qaf. By the Glorious Qur'an." },
        { q: "What does Glorious mean, per Ibn Kathir?", a: "Honorable and great", wrong: ["Very long", "Very old", "Hard to read"], why: "Means by the Honorable and Great Qur'an." },
        { q: "Which ayah says falsehood cannot come to the Quran?", a: "41:42", wrong: ["2:2", "112:1", "1:2"], why: "Falsehood cannot come to it from before it or behind it. (41:42)" }
      ]
    },
    {
      slug: "a-warner-from-themselves",
      title: "A warner from themselves",
      line: "They were amazed that a man from among them warned them.",
      facts: ["They called it strange", "Messengers are chosen by Allah"],
      quote: q50(2),
      source: ik(2, "Ibn Kathir says they wondered why the Messenger ﷺ sent to them was a human being.", "They wondered at the wisdom behind sending a Messenger who is a human being"),
      difficulty: 1,
      questions: [
        { q: "What amazed the disbelievers, in 50:2?", a: "A warner from among themselves", wrong: ["The rain", "The stars", "A new market"], why: "Nay, they wonder that there has come to them a warner from among themselves." },
        { q: "What did they call the message, in 50:2?", a: "A strange thing", wrong: ["A poem", "A dream", "A good idea"], why: "So the disbelievers say: This is a strange thing!" },
        { tf: true, q: "They found it odd that a messenger was a human being.", why: "They wondered at the wisdom behind sending a Messenger who is a human being." }
      ]
    },
    {
      slug: "allah-chooses-messengers",
      title: "Allah chooses messengers",
      line: "Allah chooses messengers from angels and from people.",
      facts: ["Like 10:2", "Not strange at all"],
      quote: q50(2),
      source: ik(2, "Ibn Kathir quotes 10:2 and says a human messenger is not strange, for Allah chooses messengers from angels and humans.", "this is not strange, for Allah chooses Messengers from angels and humans"),
      difficulty: 2,
      questions: [
        { q: "From whom does Allah choose messengers, per Ibn Kathir?", a: "Angels and humans", wrong: ["Only kings", "Only the rich", "Only angels"], why: "This is not strange, for Allah chooses Messengers from angels and humans." },
        { q: "Which ayah asks: is it a wonder for mankind?", a: "10:2", wrong: ["2:255", "36:1", "67:1"], why: "Is it a wonder for mankind that We have sent Our revelation to a man from among themselves. (10:2)" },
        { tf: false, q: "Ibn Kathir agrees a human messenger is strange.", why: "Meaning, this is not strange." }
      ]
    },
    {
      slug: "a-far-return",
      title: "A far return?",
      line: "They said: once we are dust, coming back is far off.",
      facts: ["They doubted being raised", "Allah answered them"],
      quote: q50(3),
      source: ik(3, "Ibn Kathir says they thought the Resurrection was far off and would never happen.", "They thought that Resurrection was far from happening and will never occur"),
      difficulty: 1,
      questions: [
        { q: "What did they say, in 50:3?", a: "That is a far return", wrong: ["We will return soon", "We love the dust", "We will travel far"], why: "When we are dead and have become dust. That is a far return." },
        { q: "What did they think of the Resurrection, per Ibn Kathir?", a: "That it would never happen", wrong: ["That it was tomorrow", "That it was easy", "That it was a story"], why: "They thought that Resurrection was far from happening and will never occur." },
        { tf: true, q: "Allah answered their doubt in the next ayah, 50:4.", why: "Allah the Exalted responded to their statement by saying, We know that which the earth takes of them." }
      ]
    },
    {
      slug: "what-the-earth-takes",
      title: "What the earth takes",
      line: "Allah knows every bit the earth takes of the dead.",
      facts: ["Nothing is lost to Him", "Ibn Abbas: flesh, bone and hair"],
      quote: q50(4),
      source: ik(4, "Ibn Kathir says how and where bodies turned to dust is never absent from Allah's knowledge.", "all of this is never absent from Allah"),
      difficulty: 2,
      questions: [
        { q: "What does Allah know, in 50:4?", a: "What the earth takes of them", wrong: ["Only the living", "Only the sky", "Only their names"], why: "We know that which the earth takes of them." },
        { q: "What did Ibn Abbas list for what the earth takes?", a: "Flesh, skin, bones and hair", wrong: ["Gold and silver", "Clothes and shoes", "Houses"], why: "It refers to what the earth consumes of their flesh, skin, bones and hair." },
        { tf: true, q: "Allah's knowledge of every body is complete.", why: "All of this is never absent from Allah's knowledge." }
      ]
    },
    {
      slug: "a-book-preserved",
      title: "A Book preserved",
      line: "With Allah is a preserved Book recording everything.",
      facts: ["The Book of decrees", "Nothing is missed"],
      quote: q50(4),
      source: ik(4, "Ibn Kathir says Allah's knowledge covers all, and the Book of decrees records everything precisely.", "the Book of decrees has everything precisely recorded in it"),
      difficulty: 2,
      questions: [
        { q: "What is with Allah, in 50:4?", a: "A Book preserved", wrong: ["A treasure", "A garden", "A key"], why: "And with Us is a Book preserved." },
        { q: "What does the Book of decrees hold, per Ibn Kathir?", a: "Everything, precisely recorded", wrong: ["Only big events", "Only names", "Only the future"], why: "The Book of decrees has everything precisely recorded in it." },
        { tf: false, q: "Some things are left out of the preserved Book.", why: "Our knowledge is encompassing and the Book of decrees has everything precisely recorded in it." }
      ]
    },
    {
      slug: "a-confused-state",
      title: "A confused state",
      line: "Denying the truth left them confused and mixed up.",
      facts: ["Marij means confused", "Truth brings clarity"],
      quote: q50(5),
      source: ik(5, "Ibn Kathir says Marij means in disarray and confusion, the state of everyone who rejects the truth.", "Marij means, in disarray, in a confused state"),
      difficulty: 2,
      questions: [
        { q: "What does Marij mean, per Ibn Kathir?", a: "Confused and in disarray", wrong: ["Very happy", "Very rich", "Far away"], why: "Marij means, in disarray, in a confused state." },
        { q: "Why were they confused, in 50:5?", a: "They denied the truth", wrong: ["They were lost at sea", "They forgot the way", "They slept late"], why: "Nay, but they have denied the truth when it has come to them, so they are in a Marij state." },
        { tf: true, q: "Ibn Kathir links 50:5 to 51:8: you have different ideas.", why: "Certainly, you have different ideas. (51:8-9)" }
      ]
    },
    {
      slug: "a-sky-without-cracks",
      title: "A sky without cracks",
      line: "Look up: Allah built and adorned the sky, with no rifts.",
      facts: ["Adorned with lamps", "Like 67:3-4"],
      quote: q50(6),
      source: ik(6, "Ibn Kathir quotes 67:3: you can see no fault in the creation of the Most Gracious.", "you can see no fault in the creation of the Most Gracious"),
      difficulty: 1,
      questions: [
        { q: "What should they look at, in 50:6?", a: "The heaven above them", wrong: ["The sea below", "Their hands", "The market"], why: "Have they not looked at the heaven above them, how We have made it and adorned it." },
        { q: "What does Furuj mean, per Mujahid?", a: "Clefts", wrong: ["Stars", "Clouds", "Birds"], why: "There are no Furuj in it, meaning clefts, according to Mujahid." },
        { q: "With what is the sky adorned, per Ibn Kathir?", a: "Lamps", wrong: ["Gold", "Flags", "Paint"], why: "How We have made it and adorned it, with lamps." }
      ]
    },
    {
      slug: "the-earth-spread-out",
      title: "The earth spread out",
      line: "Allah spread the earth and set firm mountains on it.",
      facts: ["Rawasi: firm mountains", "They keep the earth steady"],
      quote: q50(7),
      source: ik(7, "Ibn Kathir says Allah made the earth spacious and set mountains to keep it from shaking with its people.", "which are the mountains to save the earth from shaking along with its inhabitants"),
      difficulty: 1,
      questions: [
        { q: "What are Rawasi, per Ibn Kathir?", a: "Mountains", wrong: ["Rivers", "Rocks in the sea", "Clouds"], why: "Which are the mountains to save the earth from shaking along with its inhabitants." },
        { q: "What did Allah do to the earth, in 50:7?", a: "Spread it out", wrong: ["Folded it", "Hid it", "Froze it"], why: "And the earth! We have spread it out." },
        { tf: true, q: "Mountains keep the earth steady for its people.", why: "Which are the mountains to save the earth from shaking along with its inhabitants." }
      ]
    },
    {
      slug: "lovely-pairs",
      title: "Lovely pairs",
      line: "Allah grew every lovely kind of plant in pairs.",
      facts: ["Bahij: a beautiful sight", "Like 51:49"],
      quote: q50(7),
      source: ik(7, "Ibn Kathir says every lovely pair means every kind of plant, fruit and vegetation, a beautiful sight.", "every kind and species of plant, fruit and vegetation"),
      difficulty: 2,
      questions: [
        { q: "What does every lovely pair mean, per Ibn Kathir?", a: "Every kind of plant and fruit", wrong: ["Every bird", "Every star", "Every river"], why: "Every kind and species of plant, fruit and vegetation." },
        { q: "What does Bahij mean, per Ibn Kathir?", a: "A beautiful scene", wrong: ["A tall tree", "A dry land", "A dark night"], why: "Allah's saying Bahij, meaning a beautiful scene." },
        { q: "Which ayah says Allah created pairs of everything?", a: "51:49", wrong: ["2:1", "18:1", "93:1"], why: "And of everything We have created pairs that you may reflect. (51:49)" }
      ]
    },
    {
      slug: "insight-for-who-turns",
      title: "Insight for who turns",
      line: "Creation is a lesson for every servant who turns to Allah.",
      facts: ["Look and reflect", "Humble hearts learn most"],
      quote: q50(8),
      source: ik(8, "Ibn Kathir says looking at the heavens and earth gives insight and proof to every humble, repenting servant.", "provides insight, proof and a lesson for every penitent servant"),
      difficulty: 2,
      questions: [
        { q: "For whom is creation an insight, in 50:8?", a: "Every servant who turns to Allah", wrong: ["Only scientists", "Only kings", "Only travelers"], why: "An insight and a Reminder for every servant who turns to Allah in repentance." },
        { q: "What does looking at creation give, per Ibn Kathir?", a: "Insight, proof and a lesson", wrong: ["Wealth", "Fame", "Nothing"], why: "Provides insight, proof and a lesson for every penitent servant." },
        { tf: true, q: "Reflecting on the sky and earth can grow our faith.", why: "Observing the creation of the heavens and earth provides insight, proof and a lesson." }
      ]
    },
    {
      slug: "blessed-rain",
      title: "Blessed rain",
      line: "Allah sends blessed rain that grows gardens and grain.",
      facts: ["Blessed means beneficial", "Grain stored for later"],
      quote: q50(9),
      source: ik(9, "Ibn Kathir says the blessed water is beneficial, growing gardens and grain harvested for food and storage.", "grains that are harvested for food and for storage for later use"),
      difficulty: 1,
      questions: [
        { q: "What does Allah send down, in 50:9?", a: "Blessed water", wrong: ["Snow only", "Stones", "Sand"], why: "And We send down blessed water (rain) from the sky." },
        { q: "What does blessed mean, per Ibn Kathir?", a: "Beneficial", wrong: ["Cold", "Salty", "Rare"], why: "And We send down blessed water from the sky, meaning beneficial." },
        { tf: true, q: "Grain that is reaped is kept for food and later use.", why: "Grains that are harvested for food and for storage for later use." }
      ]
    },
    {
      slug: "what-creation-proves",
      title: "What creation proves",
      line: "Creation's strength, beauty and gifts point to Allah.",
      facts: ["As-Sa'di explains", "Power, wisdom, mercy"],
      quote: q50(9),
      source: saadi(50, 9, "As-Sa'di says the strength of creation proves Allah's power, its beauty and precision prove His wisdom and knowledge, its benefits for us prove His mercy, and its vast order proves He is One.", "وما فيها من المنافع والمصالح للعباد، دليل على رحمة الله"),
      difficulty: 2,
      questions: [
        { q: "What do creation's benefits for us show, per as-Sa'di?", a: "Allah's mercy", wrong: ["Luck", "Nothing", "Nature alone"], why: "Its benefits for people prove Allah's mercy, says as-Sa'di." },
        { q: "What does the beauty and precision of creation prove?", a: "Allah's wisdom and knowledge", wrong: ["Chance", "Many gods", "Weakness"], why: "Its fine making shows He is the Wisest and All-Knowing." },
        { tf: true, q: "The vast order of creation points to Allah being One.", why: "As-Sa'di on 50:9." }
      ]
    },
    {
      slug: "tall-date-palms",
      title: "Tall date palms",
      line: "Tall date palms with fruit in neat clusters.",
      facts: ["Basiqat: tall and high", "Provision for the servants"],
      quote: q50(10),
      source: ik(10, "Ibn Kathir says Basiqat means tall and high, as Ibn Abbas and others explained.", "meaning, tall and high"),
      difficulty: 1,
      questions: [
        { q: "What does Basiqat mean, per Ibn Kathir?", a: "Tall and high", wrong: ["Short", "Dry", "Young"], why: "And date palms Basiqat, meaning, tall and high." },
        { q: "How is their fruit, in 50:10?", a: "In arranged clusters", wrong: ["Scattered", "Hidden", "Always green"], why: "And date palms Basiqat, with arranged clusters." },
        { q: "For whom are these fruits, in 50:11?", a: "A provision for the servants", wrong: ["Only for birds", "For no one", "Only for kings"], why: "A provision for the servants." }
      ]
    },
    {
      slug: "the-dead-land-lives",
      title: "The dead land lives",
      line: "Rain revives dead land, and so will the dead be raised.",
      facts: ["Thus will be the Resurrection", "A sign we can see"],
      quote: q50(11),
      source: ik(11, "Ibn Kathir says the dead land turning green after rain is proof that Allah will raise the dead.", "Indeed, this should provide proof of Resurrection after death"),
      difficulty: 2,
      questions: [
        { q: "What does Allah give life to, in 50:11?", a: "A dead land", wrong: ["A dry sea", "A broken house", "A lost bird"], why: "And We give life therewith to a dead land." },
        { q: "What does 50:11 compare the living land to?", a: "The Resurrection", wrong: ["The harvest market", "A long journey", "The night"], why: "Thus will be the Resurrection." },
        { q: "Which ayah says Allah was not wearied by creating?", a: "46:33", wrong: ["1:1", "112:4", "97:1"], why: "And was not wearied by their creation, is able to give life to the dead. (46:33)" }
      ]
    },
    {
      slug: "nations-before-them",
      title: "Nations before them",
      line: "Nuh's people, Rass and Thamud denied before Quraysh.",
      facts: ["A reminder for Quraysh", "History teaches"],
      quote: q50(12),
      source: ik(12, "Ibn Kathir says Allah reminds Quraysh of earlier nations who disbelieved before them.", "who disbelieved before them"),
      difficulty: 2,
      questions: [
        { q: "Which nations are named first, in 50:12?", a: "Nuh, Rass and Thamud", wrong: ["Rome and Persia", "Egypt and Yemen", "Saba and Madyan"], why: "Denied before them the people of Nuh, and the Dwellers of Rass, and Thamud." },
        { q: "Whom was 50:12 reminding, per Ibn Kathir?", a: "The disbelievers of Quraysh", wrong: ["The Romans", "The Ansar", "The angels"], why: "Allah the Exalted warns the disbelievers of Quraysh." },
        { tf: true, q: "Ibn Kathir told the story of Ar-Rass in Surah Al-Furqan.", why: "We mentioned their story before in Surat Al-Furqan." }
      ]
    },
    {
      slug: "ad-firawn-and-lut",
      title: "Ad, Firawn and Lut",
      line: "Ad, Firawn and the brethren of Lut also denied.",
      facts: ["Lut was sent to Sadum", "Each one was warned"],
      quote: q50(13),
      source: ik(13, "Ibn Kathir says the brethren of Lut were the people of Sadum and nearby, to whom Lut was sent.", "to whom Lut was sent"),
      difficulty: 2,
      questions: [
        { q: "Who is named in 50:13?", a: "Ad, Firawn and Lut's brethren", wrong: ["Thamud and Madyan", "Rome", "The Ansar"], why: "And Ad, and Firawn, and the brethren of Lut." },
        { q: "Where were the brethren of Lut, per Ibn Kathir?", a: "Sadum and nearby", wrong: ["Makkah", "Yemen", "Egypt"], why: "The people of Sadum (Sodom) and the surrounding areas, to whom Lut was sent." },
        { tf: true, q: "Lut was a messenger sent to his people.", why: "To whom Lut was sent." }
      ]
    },
    {
      slug: "aykah-and-tubba",
      title: "Aykah and Tubba",
      line: "The Dwellers of Al-Aykah and the people of Tubba denied too.",
      facts: ["Al-Aykah: Shuayb's nation", "Tubba: a king of Yemen"],
      quote: q50(14),
      source: ik(14, "Ibn Kathir says Al-Aykah were the nation of Shuayb, and Tubba was a king of Yemen.", "King of Yemen"),
      difficulty: 2,
      questions: [
        { q: "Who were the Dwellers of Al-Aykah, per Ibn Kathir?", a: "The nation of Shuayb", wrong: ["The nation of Hud", "The nation of Musa", "The nation of Yunus"], why: "And the Dwellers of Al-Aykah, they are the nation of Shuayb, peace be upon him." },
        { q: "Who was Tubba, per Ibn Kathir?", a: "A king of Yemen", wrong: ["A king of Egypt", "A merchant", "A poet"], why: "And the people of Tubba, King of Yemen." },
        { tf: true, q: "Ibn Kathir told Tubba's story in Surah Ad-Dukhan.", why: "We explained his story in the Tafsir of Surat Ad-Dukhan." }
      ]
    },
    {
      slug: "deny-one-deny-all",
      title: "Deny one, deny all",
      line: "Whoever denies one messenger has denied them all.",
      facts: ["Like 26:105", "So the threat came true"],
      quote: q50(14),
      source: ik(14, "Ibn Kathir says each nation denied its messenger, and whoever denies one messenger is as if he denied all.", "whoever denies even one Messenger, is as if he has denied all Messengers"),
      difficulty: 3,
      questions: [
        { q: "What is denying one messenger like, per Ibn Kathir?", a: "Denying all messengers", wrong: ["A small mistake", "Nothing", "Half a denial"], why: "Whoever denies even one Messenger, is as if he has denied all Messengers." },
        { q: "Which ayah says Nuh's people denied the Messengers?", a: "26:105", wrong: ["2:2", "71:1", "11:25"], why: "The people of Nuh denied the Messengers. (26:105)" },
        { tf: true, q: "Nuh's people had one messenger, yet denied all, per 26:105.", why: "Even though only one Messenger was sent to them." }
      ]
    },
    {
      slug: "not-tired-by-creation",
      title: "Not tired by creation",
      line: "Allah was not tired by the first creation; again is easier.",
      facts: ["Like 30:27", "Like 36:78-79"],
      quote: q50(15),
      source: ik(15, "Ibn Kathir says starting creation did not tire Allah, and repeating it is even easier.", "starting the creation did not tire Us, and repeating it is even easier"),
      difficulty: 2,
      questions: [
        { q: "What does 50:15 ask?", a: "Were We tired by the first creation?", wrong: ["Who made the stars?", "Where is the sea?", "When is the harvest?"], why: "Were We then tired with the first creation?" },
        { q: "Which is easier, per Ibn Kathir on 50:15?", a: "Repeating the creation", wrong: ["Neither is possible", "Only the first", "Making the stars"], why: "Starting the creation did not tire Us, and repeating it is even easier." },
        { q: "Which ayah says He originates, then repeats creation?", a: "30:27", wrong: ["1:1", "103:1", "55:1"], why: "And He it is Who originates the creation, then He will repeat it; and this is easier for Him. (30:27)" }
      ]
    },
    {
      slug: "no-harder-to-recreate",
      title: "No harder to recreate",
      line: "Allah said: the first creation was no easier than the new.",
      facts: ["A hadith qudsi", "Ibn Kathir cites it for 50:15"],
      quote: q50(15),
      source: hadith("bukhari", "4974", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said Allah said: the son of Adam says I will not recreate him, yet the first creation was not easier for Me than the new creation.", "the first creation was not easier for Me than new creation"),
      difficulty: 3,
      questions: [
        { q: "What did some say about Allah, per Bukhari 4974?", a: "He will not recreate them", wrong: ["He has no power", "He sleeps", "He forgets"], why: "It is his saying that I will not recreate him as I created him for the first time." },
        { q: "What does Allah say of the first creation, per Bukhari 4974?", a: "Not easier than the new one", wrong: ["Much harder", "Never happened", "Was by chance"], why: "In fact, the first creation was not easier for Me than new creation." },
        { tf: true, q: "Bukhari 4974 is a hadith where Allah speaks.", why: "The Prophet ﷺ said, Allah said." }
      ]
    }
  ]
};

/** Ayahs 16 to 29: Allah knows every thought, the recording angels, death and the Trumpet, and Allah's perfect justice. */
const QAF_TWO: DeepUnit = {
  key: "qaf2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-50",
  name: "Qaf, ayahs 16 to 29",
  kind: "skill",
  lessonType: "surah",
  surahName: "Qaf",
  lessons: [
    {
      slug: "allah-knows-whispers",
      title: "Allah knows the whispers",
      line: "Allah created us and knows what our souls whisper.",
      facts: ["Good and bad thoughts alike", "He is our Creator"],
      quote: q50(16),
      source: ik(16, "Ibn Kathir says Allah has complete knowledge of every thought that crosses the mind of a person.", "Allah the Exalted has complete knowledge of all thoughts that cross the mind of man"),
      difficulty: 1,
      questions: [
        { q: "What does Allah know, in 50:16?", a: "What our self whispers to us", wrong: ["Only our words", "Only our deeds", "Only the past"], why: "And indeed We have created man, and We know what his self whispers to him." },
        { q: "Which thoughts does Allah know, per Ibn Kathir?", a: "All of them, good or evil", wrong: ["Only good ones", "Only spoken ones", "Only old ones"], why: "Allah the Exalted has complete knowledge of all thoughts that cross the mind of man, be they good or evil." },
        { tf: true, q: "Allah knows us fully because He created us.", why: "Being their Creator and the Knower of everything about them." }
      ]
    },
    {
      slug: "thoughts-forgiven",
      title: "Bad thoughts forgiven",
      line: "Allah forgives passing bad thoughts we never say or do.",
      facts: ["A mercy for this Ummah", "Words and deeds count"],
      quote: q50(16),
      source: hadith("bukhari", "2528", "Abu Hurairah", "Sahih", "The Prophet ﷺ said Allah forgives what whispers in the hearts of his followers, unless they act on it or say it.", "to forgive what whispers in the hearts of my followers, unless they put it to action or utter it"),
      difficulty: 2,
      questions: [
        { q: "What does Allah forgive, per Bukhari 2528?", a: "Whispers in the heart not acted on", wrong: ["Every bad deed", "Lies we say", "Nothing"], why: "To forgive what whispers in the hearts of my followers, unless they put it to action or utter it." },
        { q: "When does a bad thought count, per Bukhari 2528?", a: "When acted on or spoken", wrong: ["Always", "Never", "Only at night"], why: "Unless they put it to action or utter it." },
        { tf: true, q: "Ibn Kathir quotes this mercy while explaining 50:16.", why: "Verily, Allah the Exalted has forgiven my Ummah for what they talk to themselves about, as long as they do not utter or implement it." }
      ]
    },
    {
      slug: "nearer-than-the-jugular",
      title: "Nearer than the jugular",
      line: "Allah says: We are nearer to him than his jugular vein.",
      facts: ["The jugular is the neck vein", "Nothing about us is hidden"],
      quote: q50(16),
      source: ik(16, "Ibn Kathir says Allah affirms His full dominion over people, as their Creator who knows everything about them.", "Allah the Exalted affirms His absolute dominance over mankind, being their Creator and the Knower of everything about them"),
      difficulty: 2,
      questions: [
        { q: "Nearer than what, in 50:16?", a: "His jugular vein", wrong: ["His shadow", "His house", "His friend"], why: "And We are nearer to him than his jugular vein." },
        { q: "What does Allah affirm over mankind, per Ibn Kathir?", a: "His absolute dominance", wrong: ["Nothing", "Only some power", "Only in the past"], why: "Allah the Exalted affirms His absolute dominance over mankind." },
        { tf: false, q: "Some of our secrets are hidden from Allah.", why: "Being their Creator and the Knower of everything about them." }
      ]
    },
    {
      slug: "shy-before-allah",
      title: "Shy before Allah",
      line: "Knowing Allah is so near, we feel shy to disobey Him.",
      facts: ["As-Sa'di explains", "Muraqabah"],
      quote: q50(16),
      source: saadi(50, 16, "As-Sa'di says knowing Allah is nearer than the jugular vein makes a person watch himself and feel shy that Allah sees him where He forbade, or misses him where He commanded.", "فيستحي منه أن يراه، حيث نهاه، أو يفقده، حيث أمره"),
      difficulty: 2,
      questions: [
        { q: "What should Allah's nearness make us feel, per as-Sa'di?", a: "Shy to disobey Him", wrong: ["Careless", "Proud", "Bored"], why: "Shy that He sees us where He forbade, says as-Sa'di." },
        { q: "Where should Allah never miss us, per as-Sa'di?", a: "Where He commanded us", wrong: ["At the market", "At home", "Nowhere"], why: "Shy that He misses us where He commanded." },
        { tf: true, q: "We should also respect the angels who write our deeds.", why: "As-Sa'di on 50:16." }
      ]
    },
    {
      slug: "two-recording-angels",
      title: "Two recording angels",
      line: "Two angels receive and record our deeds, right and left.",
      facts: ["One on the right", "One on the left"],
      quote: q50(17),
      source: ik(17, "Ibn Kathir says the two receivers are two angels who receive and record the deeds of mankind.", "in reference to the two angels who receive and record the deeds of mankind"),
      difficulty: 1,
      questions: [
        { q: "Who are the two receivers, per Ibn Kathir?", a: "Two angels who record deeds", wrong: ["Two friends", "Two parents", "Two jinn"], why: "In reference to the two angels who receive and record the deeds of mankind." },
        { q: "Where do they sit, in 50:17?", a: "One right and one left", wrong: ["Both in front", "Both behind", "Far away"], why: "One sitting on the right and one on the left." },
        { tf: true, q: "Every person has two angels recording their deeds.", why: "The two receivers (recording angels) receive (each human being)." }
      ]
    },
    {
      slug: "every-word-recorded",
      title: "Every word recorded",
      line: "No word is said but a watcher is ready to record it.",
      facts: ["Raqib: the watcher", "Think before you speak"],
      quote: q50(18),
      source: ik(18, "Ibn Kathir says a scribe stands ready to record every word, leaving no word or movement unrecorded.", "leaving no word or movement unrecorded"),
      difficulty: 1,
      questions: [
        { q: "What is recorded, in 50:18?", a: "Every word said", wrong: ["Only good words", "Only long talks", "Only promises"], why: "Not a word does he (or she) utter but there is a watcher by him ready (to record it)." },
        { q: "What is left unrecorded, per Ibn Kathir?", a: "Nothing at all", wrong: ["Jokes", "Whispers", "Words at night"], why: "Leaving no word or movement unrecorded." },
        { tf: true, q: "Al-Hasan and Qatadah said the scribe records every word.", why: "The scribe records every word that is spoken, according to the explanation of Al-Hasan and Qatadah." }
      ]
    },
    {
      slug: "honorable-scribes",
      title: "Honorable scribes",
      line: "The angels who write our deeds are called honorable scribes.",
      facts: ["Kiraman Katibin", "Like 82:10-12"],
      quote: q50(18),
      source: ik(18, "Ibn Kathir links 50:18 to 82:10-12: honorable angels write down deeds and know all you do.", "Therefore, the scribe records every word that is spoken"),
      difficulty: 2,
      questions: [
        { q: "What does Kiraman Katibin mean, per 82:11?", a: "Honorable writers", wrong: ["Strong guards", "Fast riders", "Kind teachers"], why: "Kiraman (honorable) Katibin writing down (your deeds)." },
        { q: "Which ayahs does Ibn Kathir link to 50:18?", a: "82:10-12", wrong: ["2:1-3", "112:1-4", "1:1-7"], why: "But verily, over you (are appointed angels) to watch you. (82:10-12)" },
        { tf: true, q: "The scribes know all that we do, per 82:12.", why: "They know all that you do. (82:10-12)" }
      ]
    },
    {
      slug: "one-word-pleases-allah",
      title: "One word pleases Allah",
      line: "A single good word can earn Allah's pleasure.",
      facts: ["Alqamah held back many words", "Speak good or stay silent"],
      quote: q50(18),
      source: hadith("bukhari", "6478", "Abu Hurairah", "Sahih", "The Prophet ﷺ said a servant may say a word pleasing to Allah without thinking much of it, and Allah raises him for it.", "may utter a word which pleases Allah without giving it much importance"),
      difficulty: 2,
      questions: [
        { q: "What can one pleasing word do, per Bukhari 6478?", a: "Raise a person in reward", wrong: ["Nothing", "Make him rich", "Make him famous"], why: "Because of that Allah will raise him to degrees of reward." },
        { q: "What did Alqamah say after hearing a similar hadith?", a: "Many words he did not say", wrong: ["He spoke more", "He wrote a book", "He moved away"], why: "How many words did I not utter because of the Hadith that Bilal bin Al-Harith narrated." },
        { tf: true, q: "A careless word can displease Allah, per Bukhari 6478.", why: "A slave may utter a word carelessly which displeases Allah without thinking of its gravity." }
      ]
    },
    {
      slug: "death-comes-in-truth",
      title: "Death comes in truth",
      line: "The pangs of death come in truth, the certain end.",
      facts: ["No one escapes death", "Prepare with good deeds"],
      quote: q50(19),
      source: ik(19, "Ibn Kathir says death comes in truth, bringing the certainty people used to argue about.", "now, I have brought forth to you the certainty that you were disputing"),
      difficulty: 2,
      questions: [
        { q: "What comes in truth, in 50:19?", a: "The stupor of death", wrong: ["A storm", "A king", "A feast"], why: "And the stupor of death will come in truth." },
        { q: "What is said at death, in 50:19?", a: "This is what you were avoiding", wrong: ["Welcome back", "Try again", "Go home"], why: "This is what you have been avoiding!" },
        { tf: true, q: "Ibn Kathir says no one has a way to escape death.", why: "You had no way of escaping or averting this end." }
      ]
    },
    {
      slug: "death-has-its-stupors",
      title: "Death has its stupors",
      line: "At his death he ﷺ said: death has its stupors.",
      facts: ["He wiped his face with water", "With the highest companions"],
      quote: q50(19),
      source: hadith("bukhari", "6510", "Aishah", "Sahih", "Aishah said a water container was before him ﷺ at his death; he wiped his face and said: None has the right to be worshipped but Allah; death has its stupors.", "No doubt, death has its stupors"),
      difficulty: 3,
      questions: [
        { q: "What did he ﷺ say about death, per Bukhari 6510?", a: "Death has its stupors", wrong: ["Death is easy", "Death is far", "Death is a dream"], why: "No doubt, death has its stupors." },
        { q: "What did he ﷺ do with the water, per Bukhari 6510?", a: "Wiped his face with it", wrong: ["Drank it all", "Gave it away", "Poured it out"], why: "He would put his hand into the water and rub his face with it." },
        { q: "What did he ﷺ keep saying, per Bukhari 6510?", a: "With the highest companions", wrong: ["Bring me food", "Call my friends", "Open the door"], why: "Then he raised his hand and started saying, O Allah! with the highest companions." }
      ]
    },
    {
      slug: "the-trumpet-is-blown",
      title: "The Trumpet is blown",
      line: "The Trumpet will be blown: the Day that was promised.",
      facts: ["Then comes the Resurrection", "The Day of the threat"],
      quote: q50(20),
      source: ik(20, "Ibn Kathir says the blowing of the Trumpet brings fear, the death of all, and then the Resurrection.", "the death of everything and then resurrection, all this will occur on the Day of Resurrection"),
      difficulty: 2,
      questions: [
        { q: "What will be blown, in 50:20?", a: "The Trumpet", wrong: ["A drum", "A wind", "A whistle"], why: "And the Trumpet will be blown, that will be the Day of the threat." },
        { q: "What does 50:20 call that Day?", a: "The Day of the threat", wrong: ["The Day of trade", "The Day of rest", "The Day of rain"], why: "That will be the Day of the threat." },
        { tf: true, q: "Ibn Kathir says the Resurrection follows the Trumpet.", why: "The death of everything and then resurrection, all this will occur on the Day of Resurrection." }
      ]
    },
    {
      slug: "a-driver-and-a-witness",
      title: "A driver and a witness",
      line: "Each soul comes with an angel to drive and one to witness.",
      facts: ["Sa'iq: the one who drives", "Shahid: the witness"],
      quote: q50(21),
      source: ik(21, "Ibn Kathir says each person comes with one angel driving him to the gathering and one bearing witness to his deeds.", "meaning, an angel to drive him to the gathering place and an angel to bear witness"),
      difficulty: 2,
      questions: [
        { q: "What is the Sa'iq, per Ibn Kathir?", a: "An angel who drives", wrong: ["A guard of the gate", "A judge", "A scribe"], why: "An angel to drive him to the gathering place." },
        { q: "What is the Shahid, per Ibn Kathir?", a: "An angel who bears witness", wrong: ["A friend", "A trumpet", "A light"], why: "An angel to bear witness against him with regards to his deeds." },
        { q: "Which Companion explained 50:21 in a speech?", a: "Uthman ibn Affan", wrong: ["Abu Bakr", "Umar", "Ali"], why: "He heard Uthman bin Affan giving a speech in which he recited this Ayah." }
      ]
    },
    {
      slug: "sharp-sight-that-day",
      title: "Sharp sight that Day",
      line: "That Day the covering is lifted and sight becomes sharp.",
      facts: ["Heedless no more", "Like 19:38"],
      quote: q50(22),
      source: ik(22, "Ibn Kathir says on the Day of Resurrection everyone will see clearly, but it will not help those who rejected faith.", "Everyone, including the disbelievers, will have clear sight on the Day of Resurrection"),
      difficulty: 2,
      questions: [
        { q: "What is said to the heedless, in 50:22?", a: "Sharp is your sight this Day", wrong: ["Go to sleep", "Come back later", "You are free"], why: "Now We have removed from you, your covering, and sharp is your sight this Day!" },
        { q: "Who will see clearly that Day, per Ibn Kathir?", a: "Everyone", wrong: ["No one", "Only angels", "Only prophets"], why: "Everyone, including the disbelievers, will have clear sight on the Day of Resurrection." },
        { tf: true, q: "Seeing clearly only then will not help those who rejected.", why: "Having sight will not be helpful to the disbelievers on that Day." }
      ]
    },
    {
      slug: "the-record-is-ready",
      title: "The record is ready",
      line: "The recording angel brings the record, complete and exact.",
      facts: ["Nothing added", "Nothing taken away"],
      quote: q50(23),
      source: ik(23, "Ibn Kathir says the scribe angel brings the record prepared and complete, with nothing added or removed.", "prepared and completed without addition or deletion"),
      difficulty: 2,
      questions: [
        { q: "Who speaks in 50:23, per Ibn Kathir?", a: "The scribe angel", wrong: ["A neighbor", "A king", "A bird"], why: "The scribe angel, who is entrusted with recording the deeds of mankind, will testify." },
        { q: "How is the record, per Ibn Kathir?", a: "Complete, nothing added or removed", wrong: ["Half done", "Lost", "Changed"], why: "Prepared and completed without addition or deletion." },
        { tf: true, q: "Allah will judge the creation with fairness.", why: "This is when Allah the Exalted will judge the creation with fairness." }
      ]
    },
    {
      slug: "be-a-helper-of-good",
      title: "Be a helper of good",
      line: "50:24-25 blame the one who blocks good and keeps from charity.",
      facts: ["Keep family ties", "Give charity"],
      quote: q50(24),
      source: ik(25, "Ibn Kathir says the hinderer of good does not do his duties, keep family ties, or give charity.", "nor was he dutiful, keeping ties to kith and kin nor giving charity"),
      difficulty: 2,
      questions: [
        { q: "What did the hinderer of good fail to do, per Ibn Kathir?", a: "Keep family ties and give charity", wrong: ["Travel far", "Build houses", "Sleep early"], why: "Nor was he dutiful, keeping ties to kith and kin nor giving charity." },
        { q: "What is the opposite we should be?", a: "A helper of good", wrong: ["A hinderer of good", "A doubter", "A boaster"], why: "Hinderer of good, meaning for he did not fulfill the duties he was ordered." },
        { tf: true, q: "50:24 speaks of the stubborn one who rejects the truth.", why: "Whose disbelief and denial of truth was horrendous, who used to stubbornly reject the truth." }
      ]
    },
    {
      slug: "transgressor-and-doubter",
      title: "Do not spread doubt",
      line: "50:25 also blames the transgressor and the doubter.",
      facts: ["Qatadah: in speech and deeds", "Doubters spread doubt"],
      quote: q50(25),
      source: ik(25, "Ibn Kathir says the transgressor oversteps limits, and the doubter doubts and spreads doubt to others.", "he doubts and raises doubts in those who scrutinize his behavior"),
      difficulty: 3,
      questions: [
        { q: "How did Qatadah describe the transgressor?", a: "In speech, behavior and affairs", wrong: ["Only in trade", "Only at night", "Only with money"], why: "He is a transgressor in his speech, behavior and affairs." },
        { q: "What does the doubter do, per Ibn Kathir?", a: "Doubts and spreads doubt", wrong: ["Asks to learn", "Keeps quiet", "Gives charity"], why: "He doubts and raises doubts in those who scrutinize his behavior." },
        { tf: true, q: "Ibn Kathir says the transgressor oversteps limits in spending.", why: "He transgresses the limits in spending." }
      ]
    },
    {
      slug: "worship-allah-alone",
      title: "Worship Allah alone",
      line: "The worst error in 50:26 is setting up gods with Allah.",
      facts: ["Shirk: worshipping others", "Tawhid: Allah alone"],
      quote: q50(26),
      source: ik(26, "Ibn Kathir says this person associated others with Allah and worshipped others besides Him.", "he associated others with Allah and worshipped others besides Him"),
      difficulty: 2,
      questions: [
        { q: "What did this person do, in 50:26?", a: "Set up another god with Allah", wrong: ["Prayed at night", "Gave charity", "Kept promises"], why: "Who set up another god with Allah." },
        { q: "What does Ibn Kathir say this means?", a: "Worshipping others besides Allah", wrong: ["Traveling far", "Being poor", "Forgetting a name"], why: "He associated others with Allah and worshipped others besides Him." },
        { tf: true, q: "Worshipping Allah alone is the heart of Islam.", why: "He associated others with Allah and worshipped others besides Him." }
      ]
    },
    {
      slug: "shaytan-disowns-him",
      title: "Shaytan disowns him",
      line: "His devil companion will say: I did not make him go astray.",
      facts: ["Shaytan blames the person", "Like 14:22"],
      quote: q50(27),
      source: ik(27, "Ibn Kathir says the devil assigned to each person will disown him, saying he chose error himself.", "The devil will disown him"),
      difficulty: 2,
      questions: [
        { q: "Who is the companion in 50:27, per Ibn Kathir?", a: "The devil with each person", wrong: ["A recording angel", "A best friend", "A brother"], why: "Refers to the devil who is entrusted to every man, according to Abdullah bin Abbas." },
        { q: "What will the devil say, in 50:27?", a: "I did not push him to transgress", wrong: ["I helped him a lot", "Forgive me", "I was asleep"], why: "Our Lord! I did not push him to transgression, but he was himself in error far astray." },
        { q: "Which ayah has Shaytan say: so blame me not?", a: "14:22", wrong: ["2:2", "36:1", "55:13"], why: "So blame me not, but blame yourselves. (14:22)" }
      ]
    },
    {
      slug: "no-arguing-before-allah",
      title: "No arguing before Allah",
      line: "Allah says: dispute not before Me; the warning came already.",
      facts: ["Messengers and Books came", "The proof was clear"],
      quote: q50(28),
      source: ik(28, "Ibn Kathir says Allah gave sufficient proof through the Messengers and the Books He sent down.", "I have given you sufficient proof by the words of the Messengers"),
      difficulty: 2,
      questions: [
        { q: "What does Allah say, in 50:28?", a: "Dispute not in front of Me", wrong: ["Speak louder", "Come back tomorrow", "Bring a friend"], why: "Dispute not in front of Me, I had already in advance sent you the threat." },
        { q: "How was the proof given, per Ibn Kathir?", a: "By Messengers and Books", wrong: ["By poets", "By kings", "By dreams only"], why: "I have given you sufficient proof by the words of the Messengers, and I have sent down the Divine Books." },
        { tf: true, q: "The warning came long before that Day.", why: "I had already in advance sent you the threat." }
      ]
    },
    {
      slug: "allah-is-never-unjust",
      title: "Allah is never unjust",
      line: "Allah never wrongs His servants; His word does not change.",
      facts: ["Proof comes first", "Perfect justice"],
      quote: q50(29),
      source: ik(29, "Ibn Kathir says Allah punishes no one except for their sins, after the proof was made clear to them.", "except on account of their sins after the proof has been established against them"),
      difficulty: 2,
      questions: [
        { q: "What does Allah say of Himself, in 50:29?", a: "I am not unjust to the servants", wrong: ["I am far away", "I am tired", "I forget"], why: "And I am not unjust to the servants." },
        { q: "What comes before any punishment, per Ibn Kathir?", a: "The proof is made clear", wrong: ["Nothing", "A long sleep", "A payment"], why: "Except on account of their sins after the proof has been established against them." },
        { q: "What did Mujahid say the unchanging sentence means?", a: "I have made My decision", wrong: ["I will think again", "I forgot", "Ask later"], why: "I have made My decision, according to the explanation of Mujahid." }
      ]
    }
  ]
};

/** Ayahs 30 to 45: Paradise brought near, nations before, patience and glorifying Allah, and the Day of coming out. */
const QAF_THREE: DeepUnit = {
  key: "qaf3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-50",
  name: "Qaf, ayahs 30 to 45",
  kind: "skill",
  lessonType: "surah",
  surahName: "Qaf",
  lessons: [
    {
      slug: "room-in-paradise",
      title: "Room in Paradise",
      line: "Paradise is so wide Allah creates new creation to fill it.",
      facts: ["Allah asks Hell: are you filled?", "Paradise has room to spare"],
      quote: q50(30),
      source: ik(30, "Ibn Kathir quotes a hadith in Muslim that Paradise will have empty space until Allah creates another creation to live in it.", "There will be sufficient empty space in Paradise until Allah creates another creation"),
      difficulty: 2,
      questions: [
        { q: "What will Allah ask Hell, in 50:30?", a: "Are you filled?", wrong: ["Are you cold?", "Are you far?", "Are you old?"], why: "On the Day when We will say to Hell: Are you filled?" },
        { q: "What happens to the extra space in Paradise?", a: "Allah creates new creation for it", wrong: ["It stays empty", "It is closed", "It is sold"], why: "There will be sufficient empty space in Paradise until Allah creates another creation." },
        { tf: true, q: "Ibn Kathir says Muslim also recorded the hadith of Anas.", why: "Muslim also collected this Hadith." }
      ]
    },
    {
      slug: "paradise-brought-near",
      title: "Paradise brought near",
      line: "Paradise will be brought close to those who had Taqwa.",
      facts: ["Uzlifat: brought near", "That Day is not far off"],
      quote: q50(31),
      source: ik(31, "Ibn Kathir says Paradise will be brought close and near to the pious on the Day of Resurrection.", "Paradise will be brought close and near to the pious"),
      difficulty: 1,
      questions: [
        { q: "What will be brought near, in 50:31?", a: "Paradise", wrong: ["The mountains", "The sea", "The moon"], why: "And Paradise will be Uzlifat to those who had Taqwa, not far off." },
        { q: "To whom is Paradise brought near?", a: "Those who had Taqwa", wrong: ["The richest", "The strongest", "The loudest"], why: "Paradise will be brought close and near to the pious." },
        { tf: true, q: "Ibn Kathir says that Day is not far off.", why: "And this will occur on the Day of Resurrection, which is not far off." }
      ]
    },
    {
      slug: "returning-and-guarding",
      title: "Returning and guarding",
      line: "Paradise is for those who turn to Allah and keep their word.",
      facts: ["Awwab: often turning back", "Hafiz: keeps the covenant"],
      quote: q50(32),
      source: ik(32, "Ibn Kathir says they return to Allah in sincere repentance, and keep their covenant with Him.", "who preserve their covenant with Allah and do not break or betray it"),
      difficulty: 2,
      questions: [
        { q: "Who is promised Paradise, in 50:32?", a: "Those who return in repentance", wrong: ["Those who boast", "Those who wait", "Those who travel"], why: "This is what you were promised, it is for those returning in sincere repentance, and Hafiz." },
        { q: "What does Hafiz mean, per Ibn Kathir?", a: "Keeps the covenant with Allah", wrong: ["Memorizes poems", "Guards a gate", "Saves money"], why: "Who preserve their covenant with Allah and do not break or betray it." },
        { tf: true, q: "Sincere repentance means intending not to repeat the sin.", why: "Who go back to Allah in sincere repentance intending not to repeat sin." }
      ]
    },
    {
      slug: "feared-allah-unseen",
      title: "Feared Allah unseen",
      line: "They feared the Most Merciful in private, when none saw.",
      facts: ["A heart turned to Allah", "Free of shirk, humble"],
      quote: q50(33),
      source: ik(33, "Ibn Kathir says they feared Allah in secret, when only Allah could see them.", "who feared Allah in secret when only Allah the Exalted and Most Honored could see him"),
      difficulty: 2,
      questions: [
        { q: "Whom did they fear unseen, in 50:33?", a: "Ar-Rahman, the Most Merciful", wrong: ["A king", "Their neighbors", "The dark"], why: "Who feared Ar-Rahman unseen and brought a heart turned in repentance." },
        { q: "What does fearing Him unseen mean, per Ibn Kathir?", a: "In secret, seen by Allah alone", wrong: ["Only in crowds", "Only in Ramadan", "Only when asked"], why: "Who feared Allah in secret when only Allah the Exalted and Most Honored could see him." },
        { q: "What kind of heart do they bring, in 50:33?", a: "A heart turned in repentance", wrong: ["A proud heart", "A busy heart", "A hard heart"], why: "And brought a heart turned in repentance." }
      ]
    },
    {
      slug: "tears-in-private",
      title: "Tears in private",
      line: "Allah shades one who remembers Him alone and weeps.",
      facts: ["One of the seven in shade", "Ibn Kathir cites it for 50:33"],
      quote: q50(33),
      source: hadith("bukhari", "660", "Abu Hurairah", "Sahih", "The Prophet ﷺ said Allah will shade seven on a Day with no shade but His, among them one who remembers Allah alone and his eyes fill with tears.", "a person who remembers Allah in seclusion and his eyes are then flooded with tears"),
      difficulty: 2,
      questions: [
        { q: "How many are shaded, per Bukhari 660?", a: "Seven", wrong: ["Three", "Ten", "Forty"], why: "Allah will give shade, to seven, on the Day when there will be no shade but His." },
        { q: "Who weeps among the seven, per Bukhari 660?", a: "One who remembers Allah alone", wrong: ["One who lost money", "One at a feast", "One who is lost"], why: "A person who remembers Allah in seclusion and his eyes are then flooded with tears." },
        { q: "Which other one is shaded, per Bukhari 660?", a: "A just ruler", wrong: ["A rich trader", "A famous poet", "A fast rider"], why: "These seven persons are a just ruler, a youth who has been brought up in the worship of Allah." }
      ]
    },
    {
      slug: "enter-in-peace",
      title: "Enter in peace",
      line: "They are told: enter Paradise in peace and safety.",
      facts: ["Angels greet them with Salam", "Safe from all harm"],
      quote: q50(34),
      source: ik(34, "Ibn Kathir says they will be safe, and the angels of Allah will greet them with Salam.", "the angels of Allah will greet them with the Salam"),
      difficulty: 1,
      questions: [
        { q: "How do they enter Paradise, in 50:34?", a: "In peace and security", wrong: ["In a rush", "In fear", "Alone and sad"], why: "Enter you therein in peace and security." },
        { q: "Who greets them with Salam, per Ibn Kathir?", a: "The angels of Allah", wrong: ["The kings", "The trees", "The birds"], why: "The angels of Allah will greet them with the Salam." },
        { tf: true, q: "Qatadah explained the peace as a greeting of Salam.", why: "The angels of Allah will greet them with the Salam, according to the explanation of Qatadah." }
      ]
    },
    {
      slug: "the-day-of-forever",
      title: "The Day of forever",
      line: "That Day begins eternal life; they never die again.",
      facts: ["Khulud: forever", "They never wish to leave"],
      quote: q50(34),
      source: ik(34, "Ibn Kathir says they will live in Paradise forever, never die, and never wish to move from it.", "they will reside in Paradise forever and will never die"),
      difficulty: 1,
      questions: [
        { q: "What kind of Day is it, in 50:34?", a: "A Day of eternal life", wrong: ["A Day of rest", "A short Day", "A Day of travel"], why: "This is a Day of eternal life!" },
        { q: "How long do they stay in Paradise, per Ibn Kathir?", a: "Forever", wrong: ["A hundred years", "One day", "Until they tire"], why: "They will reside in Paradise forever and will never die." },
        { tf: false, q: "People in Paradise will wish to move out one day.", why: "Neither be transferred from it nor wish to be transferred from it." }
      ]
    },
    {
      slug: "all-they-wish-and-more",
      title: "All they wish, and more",
      line: "They will have whatever they wish, and Allah has more.",
      facts: ["Like 10:26", "The best and even more"],
      quote: q50(35),
      source: ik(35, "Ibn Kathir says whatever delight they wish for will be brought before them, and Allah has more.", "whatever delights they wish and desire, they will find it brought before them"),
      difficulty: 2,
      questions: [
        { q: "What will they have, in 50:35?", a: "All that they desire", wrong: ["Only food", "Only rest", "Half of it"], why: "There they will have all that they desire, and We have more." },
        { q: "Which ayah says: the best and even more?", a: "10:26", wrong: ["2:255", "18:10", "67:2"], why: "For those who have done good is the best and even more. (10:26)" },
        { tf: true, q: "Their wishes are brought to them in Paradise.", why: "Whatever delights they wish and desire, they will find it brought before them." }
      ]
    },
    {
      slug: "the-greatest-gift",
      title: "The greatest gift",
      line: "The more: seeing Allah, the dearest gift of all.",
      facts: ["The veil is lifted", "Ibn Kathir cites it for 50:35"],
      quote: q50(35),
      source: hadith("muslim", "181", "Suhayb ar-Rumi", "Sahih", "The Prophet ﷺ said Allah will ask the people of Paradise if they wish anything more; then the veil is lifted, and nothing is dearer to them than seeing their Lord.", "Do you wish Me to give you anything more"),
      difficulty: 3,
      questions: [
        { q: "What will Allah ask them, per Muslim 181?", a: "Do you wish for anything more?", wrong: ["Are you tired?", "Where were you?", "Who are you?"], why: "Do you wish Me to give you anything more?" },
        { q: "What is dearest to them, per Muslim 181?", a: "Seeing their Lord", wrong: ["Gold", "Rivers", "Palaces"], why: "Nothing given to them would be dearer to them than the sight of their Lord." },
        { tf: true, q: "Ibn Kathir says the more in 50:35 is seeing Allah.", why: "Suhayb bin Sinan Ar-Rumi said that more refers to looking at the Most Honorable Face of Allah." }
      ]
    },
    {
      slug: "stronger-nations-before",
      title: "Stronger nations before",
      line: "Many nations before were stronger, yet none found escape.",
      facts: ["More people, more buildings", "Wealth did not save them"],
      quote: q50(36),
      source: ik(36, "Ibn Kathir says earlier nations were more numerous and mightier, and built more on earth.", "they were more numerous, mightier than they"),
      difficulty: 2,
      questions: [
        { q: "How were the earlier nations, in 50:36?", a: "Stronger in power", wrong: ["Weaker", "Fewer", "Kinder"], why: "Who were stronger in power than they." },
        { q: "What did Qatadah say they traveled for?", a: "Trade and provisions", wrong: ["Fun only", "War only", "To hide"], why: "They traveled throughout the land seeking provisions through trade and business, more than you have." },
        { q: "What could they not find, in 50:36?", a: "Any place of refuge", wrong: ["Any food", "Any road", "Any water"], why: "Could they find any place of refuge?" }
      ]
    },
    {
      slug: "a-heart-and-an-ear",
      title: "A heart and an ear",
      line: "The reminder helps one who has a heart, or truly listens.",
      facts: ["Listen with a present heart", "Not only with the ears"],
      quote: q50(37),
      source: ik(37, "Ibn Kathir says giving ear means listening with an attentive heart, not talking to oneself.", "he does not talk to himself but listens with an attentive heart"),
      difficulty: 2,
      questions: [
        { q: "For whom is the reminder, in 50:37?", a: "One with a heart or who listens", wrong: ["Only the old", "Only the rich", "Only the strong"], why: "Verily, therein is indeed a reminder for him who has a heart or gives ear while he is heedful." },
        { q: "What does having a heart mean, per Mujahid?", a: "A sound understanding", wrong: ["A big body", "Loud speech", "A long life"], why: "Meaning, a sound understanding with which he comprehends, or, a good mind, according to Mujahid." },
        { tf: true, q: "Ad-Dahhak said the heart must be present when listening.", why: "Someone has given ear when he hears with his ears, while his heart is present and not absent." }
      ]
    },
    {
      slug: "six-days-no-fatigue",
      title: "Six days, no fatigue",
      line: "Allah made heavens and earth in six Days, never tired.",
      facts: ["No sleep or weariness touches Him", "So raising the dead is easy"],
      quote: q50(38),
      source: ik(38, "Ibn Kathir says no sleep, exhaustion or weariness affects Allah, so He can surely raise the dead.", "indicating that no sleep, exhaustion or weariness affects Him"),
      difficulty: 2,
      questions: [
        { q: "In how many Days did Allah create, in 50:38?", a: "Six", wrong: ["One", "Seven", "Ten"], why: "And indeed We created the heavens and the earth and all between them in six Days." },
        { q: "What touched Allah after creating, in 50:38?", a: "Nothing of fatigue", wrong: ["Some tiredness", "A long rest", "Sleep"], why: "And nothing of fatigue touched Us." },
        { tf: true, q: "Ibn Kathir says 50:38 proves Allah can raise the dead.", why: "He Who is able to create the heavens and earth without fatigue, then surely He is able to resurrect the dead." }
      ]
    },
    {
      slug: "be-patient",
      title: "Be patient",
      line: "Bear their words with patience and glorify your Lord.",
      facts: ["Turn away in a good way", "Glorify before sunrise and sunset"],
      quote: q50(39),
      source: ik(39, "Ibn Kathir says the Prophet ﷺ was told to be patient with those who denied him and turn away from them in a good way.", "ordering him to be patient with them and turn away from them in a good way"),
      difficulty: 1,
      questions: [
        { q: "What was he ﷺ told to do with their words, in 50:39?", a: "Bear them with patience", wrong: ["Answer harshly", "Leave Makkah", "Stop praying"], why: "So bear with patience all that they say." },
        { q: "How should he ﷺ turn away, per Ibn Kathir?", a: "In a good way", wrong: ["Angrily", "Forever", "Loudly"], why: "Ordering him to be patient with them and turn away from them in a good way." },
        { q: "When to glorify, in 50:39?", a: "Before sunrise and before sunset", wrong: ["Only at noon", "Only on Fridays", "Only in Ramadan"], why: "And glorify the praises of your Lord, before the rising of the sun and before (its) setting." }
      ]
    },
    {
      slug: "fajr-and-asr",
      title: "Fajr and Asr",
      line: "He ﷺ looked at the moon and urged Fajr and Asr.",
      facts: ["Believers will see their Lord", "Guard the two prayers"],
      quote: q50(39),
      source: hadith("bukhari", "554", "Jarir ibn Abdullah", "Sahih", "The Prophet ﷺ looked at the full moon and said you will see your Lord as you see this moon, so do not miss the prayers before sunrise and sunset; then he recited 50:39.", "you will have no trouble in seeing Him"),
      difficulty: 3,
      questions: [
        { q: "What did he ﷺ look at, per Bukhari 554?", a: "The full moon", wrong: ["The sun", "The sea", "A mountain"], why: "He looked at the moon, full-moon, and said." },
        { q: "Which prayers did he ﷺ urge, per Bukhari 554?", a: "Fajr and Asr", wrong: ["Dhuhr and Isha", "Maghrib only", "Witr and Duha"], why: "A prayer before the sunrise (Fajr) and a prayer before sunset (Asr), you must do so." },
        { tf: true, q: "He ﷺ recited 50:39 after his words, per Bukhari 554.", why: "He then recited Allah's Statement: And celebrate the praises of your Lord before the rising of the sun and before (its) setting. (50.39)" }
      ]
    },
    {
      slug: "glorify-at-night",
      title: "Glorify at night",
      line: "Glorify Allah in part of the night, and pray to Him.",
      facts: ["Like 17:79", "Night prayer brings closeness"],
      quote: q50(40),
      source: ik(40, "Ibn Kathir says glorifying Him during part of the night means praying to Him.", "meaning pray to Him"),
      difficulty: 1,
      questions: [
        { q: "When else should we glorify Allah, in 50:40?", a: "During part of the night", wrong: ["Only at dawn", "Only at noon", "Never at night"], why: "And during a part of the night (also) glorify His praises." },
        { q: "What does glorify at night mean, per Ibn Kathir?", a: "Pray to Him", wrong: ["Sleep early", "Read poems", "Travel"], why: "And during a part of the night glorify His praises, meaning pray to Him." },
        { q: "Which ayah speaks of extra prayer at night?", a: "17:79", wrong: ["2:43", "4:103", "62:9"], why: "And in some parts of the night offer the Salah with it, as an additional prayer for you. (17:79)" }
      ]
    },
    {
      slug: "after-the-prayers",
      title: "After the prayers",
      line: "Ibn Abbas: glorify Allah after every prayer.",
      facts: ["After the prostrations", "Tasbih after Salah"],
      quote: q50(40),
      source: hadith("bukhari", "4852", "Ibn Abbas", "Sahih", "Ibn Abbas said Allah ordered His Prophet ﷺ to glorify Allah after all prayers, referring to the words after the prostrations in 50:40.", "Allah ordered His Prophet to celebrate Allah"),
      difficulty: 2,
      questions: [
        { q: "What does after the prostrations mean, per Ibn Abbas?", a: "Glorifying Allah after prayers", wrong: ["Sleeping after prayer", "Eating after prayer", "Leaving quickly"], why: "Allah ordered His Prophet to celebrate Allah's praises after all prayers." },
        { q: "Which ayah did Ibn Abbas explain, per Bukhari 4852?", a: "50:40", wrong: ["2:2", "112:1", "1:5"], why: "He refers to His Statement: After the prayers." },
        { tf: true, q: "Ibn Kathir says many scholars meant two rakahs after Maghrib.", why: "And after the prostrations refers to the two Rakahs after the Maghrib prayer." }
      ]
    },
    {
      slug: "thirty-three-each",
      title: "Thirty-three each",
      line: "Say SubhanAllah, Alhamdulillah, Allahu Akbar 33 times each.",
      facts: ["The poor asked for a way", "Allah gives His favor to whom He wills"],
      quote: q50(40),
      source: hadith("bukhari", "843", "Abu Hurairah", "Sahih", "Poor Companions worried the rich would surpass them. The Prophet ﷺ taught them to say SubhanAllah, Alhamdulillah and Allahu Akbar 33 times each after every prayer.", "thirty three times each after every"),
      difficulty: 2,
      questions: [
        { q: "Who came worried, per Bukhari 843?", a: "Some poor people", wrong: ["Some kings", "Some traders", "Some poets"], why: "Some poor people came to the Prophet ﷺ and said, The wealthy people will get higher grades." },
        { q: "How many times each, per Bukhari 843?", a: "Thirty-three", wrong: ["Ten", "Seven", "One hundred"], why: "Say Subhana l-lah, Al hamdu li l-lah and Allahu Akbar thirty three times each after every (compulsory) prayer." },
        { q: "Why were the poor worried, per Bukhari 843?", a: "The rich could give charity", wrong: ["They had no mosque", "They could not read", "They were far away"], why: "They have more money by which they perform the Hajj, and Umra; fight and struggle in Allah's Cause and give in charity." }
      ]
    },
    {
      slug: "the-caller-calls",
      title: "The caller calls",
      line: "Listen for the Day a caller calls from a place near.",
      facts: ["The call to the gathering", "The Day of Judgement"],
      quote: q50(41),
      source: ik(41, "Ibn Kathir says the caller will call people to the gathering for the Day of Judgement.", "to the gathering for the Day of Judgement"),
      difficulty: 1,
      questions: [
        { q: "From where does the caller call, in 50:41?", a: "A near place", wrong: ["A far land", "The sea", "A mountain top"], why: "And listen on the Day when the caller will call from a near place." },
        { q: "To what will the caller call, per Ibn Kathir?", a: "The gathering for Judgement", wrong: ["A feast", "A market", "A journey"], why: "To the gathering for the Day of Judgement." },
        { tf: true, q: "50:41 opens with: and listen.", why: "And listen on the Day when the caller will call from a near place." }
      ]
    },
    {
      slug: "the-day-of-coming-out",
      title: "The Day of coming out",
      line: "They hear the Blast in truth: the Day of coming out.",
      facts: ["As-Sayhah: the Blast", "Out from the graves"],
      quote: q50(42),
      source: ik(42, "Ibn Kathir says the Blast is the blowing of the Trumpet, and the coming out is from the graves.", "in reference to the blowing in the Trumpet which will bring forth the truth"),
      difficulty: 2,
      questions: [
        { q: "What is As-Sayhah, per Ibn Kathir?", a: "The blowing of the Trumpet", wrong: ["A storm", "A shout in a market", "Thunder"], why: "In reference to the blowing in the Trumpet which will bring forth the truth." },
        { q: "Coming out from where, per Ibn Kathir?", a: "From the graves", wrong: ["From houses", "From the sea", "From caves"], why: "That will be the Day of coming out, from the graves." },
        { tf: true, q: "Many had denied this truth before it came.", why: "Which will bring forth the truth that most of them discounted and denied." }
      ]
    },
    {
      slug: "life-death-and-return",
      title: "Life, death and return",
      line: "Allah gives life and death, and to Him all return.",
      facts: ["He starts and repeats creation", "Good for good"],
      quote: q50(43),
      source: ik(43, "Ibn Kathir says Allah starts creation and brings it back, and to Him all creation finally returns.", "to Him is the final return of all creations"),
      difficulty: 1,
      questions: [
        { q: "Who gives life and causes death, in 50:43?", a: "Allah", wrong: ["The stars", "Time", "Kings"], why: "Verily, it is We Who give life and cause death." },
        { q: "To whom is the final return, in 50:43?", a: "To Allah", wrong: ["To the earth", "To the sea", "To no one"], why: "And to Us is the final return." },
        { tf: true, q: "Each will be repaid by deeds, good for good.", why: "He will recompense each according to his or her deeds, good for good and evil for evil." }
      ]
    },
    {
      slug: "the-earth-opens",
      title: "The earth opens",
      line: "The earth splits open and people hurry out to obey Allah.",
      facts: ["Like 54:8", "Hastening to the caller"],
      quote: q50(44),
      source: ik(44, "Ibn Kathir says the earth will open above them and they will hurry to the Reckoning, obeying Allah.", "they will all stand and head towards the Reckoning place hastening to obey the command of Allah"),
      difficulty: 2,
      questions: [
        { q: "What happens to the earth, in 50:44?", a: "It is cleft open", wrong: ["It freezes", "It floats", "It shines"], why: "On the Day when the earth shall be cleft, from off them (they will come out) hastening forth." },
        { q: "Where do they hurry, per Ibn Kathir?", a: "To the Reckoning place", wrong: ["Back home", "To the sea", "To markets"], why: "They will all stand and head towards the Reckoning place hastening to obey the command of Allah." },
        { q: "Who blows the Trumpet the second time, per Ibn Kathir?", a: "Israfil", wrong: ["Jibril", "Mikail", "Malik"], why: "Allah the Exalted will command angel Israfil and he will blow in the Trumpet." }
      ]
    },
    {
      slug: "quite-easy-for-allah",
      title: "Quite easy for Allah",
      line: "Gathering all creation is quite easy for Allah.",
      facts: ["Like the blink of an eye, 54:50", "Like one soul, 31:28"],
      quote: q50(44),
      source: ik(44, "Ibn Kathir says bringing them back to life is easy and effortless for Allah.", "bringing them back to life is easy for Us and effortless"),
      difficulty: 2,
      questions: [
        { q: "How hard is the gathering for Allah, in 50:44?", a: "Quite easy", wrong: ["Very hard", "Impossible", "Slow"], why: "That will be a gathering, quite easy for Us." },
        { q: "Which ayah says His command is like a blink?", a: "54:50", wrong: ["2:20", "18:1", "99:1"], why: "And Our commandment is but one as the twinkling of an eye. (54:50)" },
        { q: "What does 31:28 compare raising all of us to?", a: "Raising a single person", wrong: ["Building a city", "Crossing a sea", "Counting stars"], why: "The creation of you all and the resurrection of you all are only as of a single person. (31:28)" }
      ]
    },
    {
      slug: "we-know-what-they-say",
      title: "We know what they say",
      line: "Allah comforts him ﷺ: We know best what they say.",
      facts: ["Do not be worried", "Like 15:97-99"],
      quote: q50(45),
      source: ik(45, "Ibn Kathir says Allah knows all the denial he ﷺ faced, so he need not be worried.", "so do not be concerned"),
      difficulty: 2,
      questions: [
        { q: "What does Allah know best, in 50:45?", a: "What they say", wrong: ["Only the weather", "Only the past", "Only numbers"], why: "We know best what they say." },
        { q: "What does Allah tell him ﷺ, per Ibn Kathir?", a: "Do not be concerned", wrong: ["Be angry", "Give up", "Go away"], why: "Our knowledge is all encompassing of the denial that the idolators are confronting you with, so do not be concerned." },
        { q: "Which ayahs say: glorify and be of those who bow down?", a: "15:97-99", wrong: ["2:1-3", "93:1-3", "103:1-3"], why: "So glorify the praises of your Lord and be of those who prostrate themselves. (15:97-99)" }
      ]
    },
    {
      slug: "no-forcing-in-guidance",
      title: "No forcing in guidance",
      line: "He ﷺ was not sent to force anyone; guidance is Allah's.",
      facts: ["Like 88:21-22", "Like 28:56"],
      quote: q50(45),
      source: ik(45, "Ibn Kathir says forcing people to accept guidance is not part of the Messenger's ﷺ mission.", "it is not you who forces them to accept the guidance"),
      difficulty: 2,
      questions: [
        { q: "What is he ﷺ not, in 50:45?", a: "The one to force them", wrong: ["A messenger", "A reminder", "A guide"], why: "And you are not the one to force them." },
        { q: "Who guides whom He wills, per 28:56?", a: "Allah", wrong: ["Kings", "Teachers", "Anyone who wishes"], why: "Verily, you guide not whom you like, but Allah guides whom He wills. (28:56)" },
        { q: "Which ayahs say: you are only one who reminds?", a: "88:21-22", wrong: ["1:1-2", "2:1-2", "114:1-2"], why: "So remind them, you are only one who reminds. You are not a dictator over them. (88:21-22)" }
      ]
    },
    {
      slug: "remind-with-the-quran",
      title: "Remind with the Quran",
      line: "Remind with the Quran whoever fears Allah's warning.",
      facts: ["Fear and hope together", "The last ayah of Qaf"],
      quote: q50(45),
      source: ik(45, "Ibn Kathir says only those who fear Allah and hope in His promise will take heed of the reminder.", "only those who fear Allah and dread His torment, and hope in His promise will remember and heed"),
      difficulty: 2,
      questions: [
        { q: "With what should he ﷺ remind, in 50:45?", a: "The Quran", wrong: ["Poems", "Stories of kings", "Riddles"], why: "But warn by the Qur'an; him who fears My threat." },
        { q: "Who takes heed, per Ibn Kathir?", a: "Those who fear and hope in Allah", wrong: ["The proud", "The busy", "The careless"], why: "Only those who fear Allah and dread His torment, and hope in His promise will remember and heed." },
        { tf: true, q: "50:45 is the last ayah of Surah Qaf.", why: "This is the end of the Tafsir of Surah Qaf." }
      ]
    },
    {
      slug: "qatadahs-dua",
      title: "Qatadah's dua",
      line: "Qatadah prayed to fear Allah's warning and hope His promise.",
      facts: ["Al-Barr: the Kind", "Ar-Rahim: the Most Merciful"],
      quote: q50(45),
      source: ik(45, "Ibn Kathir ends Qaf with the dua of Qatadah: make us among those who fear Your threat and hope for Your promise.", "Make us among those who fear Your threat and hope for Your promise"),
      difficulty: 3,
      questions: [
        { q: "What did Qatadah ask Allah for?", a: "To fear His threat and hope His promise", wrong: ["Wealth", "Fame", "A long trip"], why: "O Allah! Make us among those who fear Your threat and hope for Your promise." },
        { q: "Which names did Qatadah call Allah by?", a: "Al-Barr and Ar-Rahim", wrong: ["Al-Malik and Al-Quddus", "Al-Awwal and Al-Akhir", "As-Salam and Al-Mumin"], why: "O Barr (Subtle, Kind, Courteous, and Generous), O Rahim (the Most Merciful)." },
        { tf: true, q: "A believer balances fear of Allah with hope in Him.", why: "Make us among those who fear Your threat and hope for Your promise." }
      ]
    }
  ]
};

export const QAF_UNITS: readonly DeepUnit[] = [QAF_ONE, QAF_TWO, QAF_THREE];
