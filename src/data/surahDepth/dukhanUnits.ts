import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Ad-Dukhan ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Ad-Dukhan 44:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_44_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Ad-Dukhan 44:${ayah}`,
    url: `https://quran.com/44:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 44:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q44 = (ayah: number) => quranQuote(44, ayah);

/** Ayahs 1 to 16: the Quran sent down on a blessed night, the visible smoke, and people who ask for relief then turn back. */
const DUKHAN_ONE: DeepUnit = {
  key: "dukhan1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-44",
  name: "Ad-Dukhan, ayahs 1 to 16",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ad-Dukhan",
  lessons: [
    {
      slug: "ha-mim-opens-dukhan",
      title: "Ha Mim opens Ad-Dukhan",
      line: "Ad-Dukhan opens with Ha Mim, the fifth such surah in a row.",
      facts: ["Ad-Dukhan means The Smoke", "Named after 44:10"],
      quote: q44(1),
      source: ik(1, "Ibn Kathir begins by saying Allah tells us He revealed the Magnificent Quran on a blessed night.", "Allah tells us that He revealed the Magnificent"),
      difficulty: 1,
      questions: [
        { q: "Which letters open Ad-Dukhan, in 44:1?", a: "Ha Mim", wrong: ["Alif Lam Ra", "Ya Sin", "Sad"], why: "The surah opens: Ha Mim." },
        { q: "What does Ad-Dukhan mean?", a: "The Smoke", wrong: ["The Gold", "The Moon", "The Night"], why: "Dukhan means smoke, named after the visible smoke in 44:10." },
        { tf: true, q: "Ad-Dukhan comes right after Az-Zukhruf.", why: "Ad-Dukhan is surah 44, after Az-Zukhruf, surah 43." }
      ]
    },
    {
      slug: "the-book-that-makes-clear",
      title: "The Book that makes clear",
      line: "Allah swears by the manifest Book that makes things clear.",
      facts: ["The Quran explains clearly", "Allah swears by His Book"],
      quote: q44(2),
      source: ik(2, "Ibn Kathir lists the ayah: by the manifest Book that makes things clear.", "By the manifest Book that makes things clear"),
      difficulty: 1,
      questions: [
        { q: "By what does Allah swear, in 44:2?", a: "The manifest Book", wrong: ["The fig", "The sun", "The night"], why: "By the manifest Book that makes things clear." },
        { q: "What does the Book do, in 44:2?", a: "Makes things clear", wrong: ["Hides things", "Tells stories only", "Stays closed"], why: "By the manifest Book that makes things clear." },
        { tf: true, q: "Ad-Dukhan opens with an oath by the Quran, like Az-Zukhruf.", why: "Both surahs swear by the manifest Book after Ha Mim." }
      ]
    },
    {
      slug: "a-blessed-night",
      title: "A blessed night",
      line: "Allah sent the Quran down on a blessed night, Laylatul-Qadr.",
      facts: ["The Night of Decree", "In the month of Ramadan"],
      quote: q44(3),
      source: ik(3, "Ibn Kathir says Allah revealed the Quran on a blessed night, Laylatul-Qadr, in Ramadan, as 97:1 and 2:185 say.", "on a blessed night, Laylatul-Qadr"),
      difficulty: 2,
      questions: [
        { q: "On what was the Quran sent down, in 44:3?", a: "A blessed night", wrong: ["A rainy day", "A Friday noon", "A winter morning"], why: "We sent it down on a blessed night." },
        { q: "Which night is it, per Ibn Kathir?", a: "Laylatul-Qadr", wrong: ["The night of Eid", "The night of Isra", "The first night of Hajj"], why: "On a blessed night, Laylatul-Qadr (the Night of Decree)." },
        { q: "In which month was the Quran revealed, per 2:185?", a: "Ramadan", wrong: ["Rajab", "Shawwal", "Muharram"], why: "The month of Ramadan in which was revealed the Quran (2:185)." }
      ]
    },
    {
      slug: "best-with-best",
      title: "The best with the best",
      line: "The best speech, on the best night, to the best of people.",
      facts: ["As-Sa'di explains", "Laylatul-Qadr"],
      quote: q44(3),
      source: saadi(44, 3, "As-Sa'di says Allah sent down the best speech, the Quran, on the best night, Laylatul-Qadr, to the best of people, the Prophet ﷺ, in the noble Arabic language, so people could follow its light.", "فأنزل أفضل الكلام بأفضل الليالي والأيام على أفضل الأنام، بلغة العرب الكرام"),
      difficulty: 2,
      questions: [
        { q: "On which night did the best speech come down, per as-Sa'di?", a: "Laylatul-Qadr", wrong: ["The night of Eid", "The first night of the year", "Any night"], why: "The best speech came on the best night, Laylatul-Qadr." },
        { q: "Who received the best speech, per as-Sa'di on 44:3?", a: "The Prophet ﷺ, the best of people", wrong: ["The angels only", "The kings", "The poets"], why: "It came down on the best of people, says as-Sa'di." },
        { tf: true, q: "Laylatul-Qadr is better than a thousand months.", why: "As-Sa'di on 44:3." }
      ]
    },
    {
      slug: "standing-on-laylatul-qadr",
      title: "Standing on that night",
      line: "Pray on Laylatul-Qadr with faith, and past sins are forgiven.",
      facts: ["Pray with sincere faith", "Hope for Allah's reward"],
      quote: q44(3),
      source: hadith("bukhari", "2014", "Abu Hurairah", "Sahih", "The Prophet ﷺ said whoever prays on the Night of Qadr out of sincere faith, hoping for Allah's reward, has his past sins forgiven.", "whoever stood for the prayers in the night of Qadr out of sincere Faith and hoping for a reward from Allah"),
      difficulty: 2,
      questions: [
        { q: "What is forgiven, per Bukhari 2014?", a: "Past sins", wrong: ["Debts to people", "Nothing", "Only future sins"], why: "Then all his previous sins will be forgiven." },
        { q: "With what intention should we pray that night?", a: "Sincere faith and hope of reward", wrong: ["To be seen", "To win a prize", "Out of habit only"], why: "Out of sincere Faith and hoping for a reward from Allah." },
        { tf: true, q: "Fasting Ramadan with faith also brings forgiveness.", why: "Whoever fasted the month of Ramadan out of sincere Faith, then all his past sins will be forgiven." }
      ]
    },
    {
      slug: "seek-it-in-odd-nights",
      title: "Seek it in odd nights",
      line: "Search for Laylatul-Qadr in the odd nights of the last ten.",
      facts: ["The last ten nights of Ramadan", "The odd nights: 21, 23, 25, 27, 29"],
      quote: q44(3),
      source: hadith("bukhari", "2017", "Aishah", "Sahih", "The Prophet ﷺ said: search for the Night of Qadr in the odd nights of the last ten days of Ramadan.", "Search for the Night of Qadr in the odd nights of the last ten days of Ramadan"),
      difficulty: 2,
      questions: [
        { q: "Where should we search for it, per Bukhari 2017?", a: "Odd nights of the last ten of Ramadan", wrong: ["The first night of Ramadan", "Any night of the year", "Only the 15th night"], why: "Search for the Night of Qadr in the odd nights of the last ten days of Ramadan." },
        { q: "Which of these is an odd night of the last ten?", a: "The 27th", wrong: ["The 20th", "The 24th", "The 28th"], why: "The odd nights of the last ten are the 21st, 23rd, 25th, 27th and 29th." },
        { tf: false, q: "We are told the exact date of Laylatul-Qadr.", why: "We are told to search for it in the odd nights of the last ten." }
      ]
    },
    {
      slug: "allah-is-ever-warning",
      title: "Allah is ever warning",
      line: "Allah warns people, showing them what helps and what harms.",
      facts: ["Warnings are a mercy", "So the proof is clear"],
      quote: q44(3),
      source: ik(3, "Ibn Kathir says Allah warns by telling people what is good and harmful for them, so His proof is established.", "telling them what is good for them and what is harmful for them"),
      difficulty: 2,
      questions: [
        { q: "What does Allah say He is, at the end of 44:3?", a: "Ever warning", wrong: ["Ever sleeping", "Ever silent", "Ever far"], why: "Verily, We are ever warning." },
        { q: "What does the warning tell us, per Ibn Kathir?", a: "What is good and what is harmful", wrong: ["The weather", "Future prices", "Secrets of the jinn"], why: "Telling them what is good for them and what is harmful for them." },
        { tf: true, q: "Warnings help us choose what is good.", why: "So that the proof of Allah may be established against His servants." }
      ]
    },
    {
      slug: "every-matter-decreed",
      title: "Every matter decreed",
      line: "On that night, every wise matter is made clear and decreed.",
      facts: ["The year's decrees are written", "Life span and provision"],
      quote: q44(4),
      source: ik(4, "Ibn Kathir says on Laylatul-Qadr the decrees of the coming year are passed from the Preserved Tablet to the angel scribes.", "the decrees are transferred from Al-Lawh Al-Mahfuz to the"),
      difficulty: 3,
      questions: [
        { q: "What is decreed that night, in 44:4?", a: "Every matter", wrong: ["Nothing", "Only rain", "Only wars"], why: "Therein (that night) is decreed every matter, Hakim." },
        { q: "Who writes the year's decrees, per Ibn Kathir?", a: "The angel scribes", wrong: ["The kings", "The poets", "The jinn"], why: "The decrees are transferred from Al-Lawh Al-Mahfuz to the (angelic) scribes." },
        { q: "What does Hakim mean, per Ibn Kathir?", a: "Decided and cannot be changed", wrong: ["Uncertain", "Forgotten", "Hidden forever"], why: "Hakim means decided or confirmed, which cannot be changed or altered." }
      ]
    },
    {
      slug: "a-command-from-us",
      title: "A command from Us",
      line: "All happens by Allah's command; He is ever sending Messengers.",
      facts: ["By His command and leave", "With His knowledge"],
      quote: q44(5),
      source: ik(5, "Ibn Kathir says everything decreed and revealed happens by Allah's command, by His leave and with His knowledge.", "it all happens by His command, by His leave and with His knowledge"),
      difficulty: 3,
      questions: [
        { q: "How do things happen, per Ibn Kathir?", a: "By Allah's command and leave", wrong: ["By luck", "By the stars", "By chance"], why: "It all happens by His command, by His leave and with His knowledge." },
        { q: "What is Allah ever sending, per Ibn Kathir?", a: "Messengers with clear signs", wrong: ["Storms only", "Kings", "Riddles"], why: "Sending Messenger who will recite to them the clear signs of Allah." },
        { tf: true, q: "Nothing happens outside Allah's knowledge.", why: "It all happens by His command, by His leave and with His knowledge." }
      ]
    },
    {
      slug: "a-mercy-from-your-lord",
      title: "A mercy from your Lord",
      line: "Sending Messengers is a mercy; Allah hears and knows all.",
      facts: ["People badly needed guidance", "All-Hearer, All-Knower"],
      quote: q44(6),
      source: ik(6, "Ibn Kathir says Allah sends Messengers to recite His clear signs, and the need for this was urgent.", "The need for this was urgent"),
      difficulty: 2,
      questions: [
        { q: "What is the sending, in 44:6?", a: "A mercy from your Lord", wrong: ["A punishment", "A game", "A secret"], why: "(As) a mercy from your Lord." },
        { q: "Which two names end 44:6?", a: "All-Hearer, All-Knower", wrong: ["Most Kind, Most Near", "First, Last", "Mighty, Wise"], why: "Verily, He is the All-Hearer, the All-Knower." },
        { q: "How badly was guidance needed, per Ibn Kathir?", a: "The need was urgent", wrong: ["Not at all", "Only a little", "Only for kings"], why: "The need for this was urgent." }
      ]
    },
    {
      slug: "lord-of-heavens-and-earth",
      title: "Lord of heaven and earth",
      line: "He is Lord of the heavens, the earth and all in between.",
      facts: ["The Sender of the Quran is the Creator", "If only you had certain faith"],
      quote: q44(7),
      source: ik(7, "Ibn Kathir says the One Who sent down the Quran is the Lord, Creator and Sovereign of the heavens and the earth.", "is the Lord, Creator and Sovereign of the heavens and the earth"),
      difficulty: 2,
      questions: [
        { q: "Allah is Lord of what, in 44:7?", a: "The heavens, the earth and all between", wrong: ["Only the sky", "Only Arabia", "Only the sea"], why: "The Lord of the heavens and the earth and all that is between them." },
        { q: "Who sent down the Quran, per Ibn Kathir?", a: "The Creator of heaven and earth", wrong: ["A poet", "A king", "An angel on his own"], why: "The One Who sent down the Quran is the Lord, Creator and Sovereign of the heavens and the earth." },
        { tf: true, q: "Ayah 44:7 asks for faith with certainty.", why: "If you (but) have a faith with certainty." }
      ]
    },
    {
      slug: "he-gives-life-and-death",
      title: "He gives life and death",
      line: "None is worthy of worship but He; He gives life and death.",
      facts: ["La ilaha illa Huwa", "Lord of our forefathers too"],
      quote: q44(8),
      source: ik(8, "Ibn Kathir links 44:8 to 7:158: to Allah belongs the dominion of the heavens and earth, and He gives life and death.", "to Whom belongs the dominion of the heavens and the earth"),
      difficulty: 2,
      questions: [
        { q: "What does Allah do, in 44:8?", a: "Gives life and causes death", wrong: ["Sleeps", "Forgets", "Needs help"], why: "He gives life and causes death." },
        { q: "Whose Lord is He, in 44:8?", a: "Ours and our forefathers'", wrong: ["Only the rich", "Only Arabs", "Only angels"], why: "Your Lord and the Lord of your forefathers." },
        { q: "Which ayah does Ibn Kathir link to 44:8?", a: "7:158, I am sent to you all", wrong: ["2:255", "112:1", "1:1"], why: "Say: O mankind! Verily, I am sent to you all as the Messenger of Allah (7:158)." }
      ]
    },
    {
      slug: "they-play-in-doubt",
      title: "They play in doubt",
      line: "The truth came, yet they play about in doubt.",
      facts: ["The truth was certain", "They chose doubt and play"],
      quote: q44(9),
      source: ik(9, "Ibn Kathir says the certain truth came to them, but they doubted it and did not believe.", "the certain truth has come to them, but they doubt it"),
      difficulty: 2,
      questions: [
        { q: "What were they doing, in 44:9?", a: "Playing about in doubt", wrong: ["Praying", "Fasting", "Studying"], why: "Nay! They play about in doubt." },
        { q: "What had come to them, per Ibn Kathir?", a: "The certain truth", wrong: ["A storm", "A king", "A rumor"], why: "The certain truth has come to them, but they doubt it." },
        { tf: true, q: "Doubting clear truth is a kind of play, not seeking.", why: "They play about in doubt." }
      ]
    },
    {
      slug: "the-visible-smoke",
      title: "The visible smoke",
      line: "Wait for the Day the sky brings forth a visible smoke.",
      facts: ["The surah's name comes from it", "One of the signs of the Hour"],
      quote: q44(10),
      source: ik(10, "Ibn Kathir says many hadith show the smoke is one of the awaited signs of the Hour, which all people will clearly see.", "the smoke is one of the awaited signs"),
      difficulty: 3,
      questions: [
        { q: "What will the sky bring, in 44:10?", a: "A visible smoke", wrong: ["Gold rain", "A rainbow", "Snow"], why: "The Day when the sky will bring forth a visible smoke." },
        { q: "What is the smoke, per Ibn Kathir?", a: "One of the awaited signs of the Hour", wrong: ["A desert storm", "A volcano", "A fire in a town"], why: "The smoke is one of the awaited signs (of the Hour)." },
        { q: "What does visible mean, per Ibn Kathir?", a: "All people will see it", wrong: ["Only kings see it", "Nobody sees it", "Only at night"], why: "Clearly visible, such that all people will see it." }
      ]
    },
    {
      slug: "ten-signs-of-the-hour",
      title: "Ten signs of the Hour",
      line: "The Hour will not come until ten signs, the smoke among them.",
      facts: ["The sun rising from the west", "The descent of Isa son of Maryam"],
      quote: q44(10),
      source: hadith("muslim", "2901", "Hudhaifah ibn Asid", "Sahih", "The Prophet ﷺ said the Hour will not come until ten signs appear, and he mentioned the smoke, the Dajjal, the beast and the sun rising from the west.", "It will not come until you see ten signs"),
      difficulty: 3,
      questions: [
        { q: "How many signs come before the Hour, per Muslim 2901?", a: "Ten", wrong: ["Two", "Five", "Forty"], why: "It will not come until you see ten signs." },
        { q: "Which is one of the ten signs?", a: "The smoke", wrong: ["A new city", "A flood of gold", "A bright comet"], why: "He made a mention of the smoke, Dajjal, the beast, the rising of the sun from the west." },
        { tf: true, q: "The descent of Isa is among the ten signs.", why: "The descent of Jesus son of Mary." }
      ]
    },
    {
      slug: "covering-mankind",
      title: "Covering mankind",
      line: "The smoke covers mankind; a painful torment.",
      facts: ["The smoke overwhelms people", "Allah's warning before the Hour"],
      quote: q44(11),
      source: ik(11, "Ibn Kathir says the smoke will cover and overwhelm people, which is why the ayah says covering mankind.", "it covered them and overwhelmed them"),
      difficulty: 3,
      questions: [
        { q: "Whom will the smoke cover, in 44:11?", a: "Mankind", wrong: ["Only birds", "Only the sea", "Only one house"], why: "Covering mankind, this is a painful torment." },
        { q: "What does covering mean, per Ibn Kathir?", a: "Covering and overwhelming them", wrong: ["Hiding the sun only", "Cooling the air", "Bringing rain"], why: "It covered them and overwhelmed them." },
        { tf: true, q: "Signs of the Hour remind us to repent early.", why: "The smoke is a warning given before the Hour, so people turn back while they can." }
      ]
    },
    {
      slug: "remove-the-torment",
      title: "Remove the torment",
      line: "They cry: Our Lord, remove it; we shall believe!",
      facts: ["Faith promised only in hardship", "Like 6:27"],
      quote: q44(12),
      source: ik(12, "Ibn Kathir says when disbelievers see Allah's punishment, they ask for it to be taken away, as in 6:27.", "they will ask for it to be taken away from them"),
      difficulty: 3,
      questions: [
        { q: "What do they promise, in 44:12?", a: "We shall become believers", wrong: ["We shall leave", "We shall hide", "We shall build"], why: "Our Lord! Remove the torment from us, really we shall become believers!" },
        { q: "When do they ask, per Ibn Kathir?", a: "When they see the punishment", wrong: ["When they are rich", "When it rains", "When they travel"], why: "When the disbelievers witness the punishment of Allah, they will ask for it to be taken away." },
        { q: "Which ayah does Ibn Kathir link to 44:12?", a: "6:27, would that we were sent back", wrong: ["2:255", "36:1", "103:1"], why: "Would that we were but sent back! Then we would not deny the Ayat of our Lord (6:27)." }
      ]
    },
    {
      slug: "a-messenger-already-came",
      title: "A Messenger already came",
      line: "How can they take heed now? A clear Messenger already came.",
      facts: ["The message was already clear", "No more excuses"],
      quote: q44(13),
      source: ik(13, "Ibn Kathir says they need no further admonition, since Allah already sent them a Messenger with a clear message and warning.", "what further admonition do they need when We have sent them a Messenger with a clear Message and warning"),
      difficulty: 3,
      questions: [
        { q: "Who had already come, in 44:13?", a: "A Messenger explaining things clearly", wrong: ["A king", "A poet", "A merchant"], why: "When a Messenger explaining things clearly has already come to them." },
        { q: "What did the Messenger ﷺ bring, per Ibn Kathir?", a: "A clear message and warning", wrong: ["Gold", "Riddles", "Nothing new"], why: "We have sent them a Messenger with a clear Message and warning." },
        { tf: true, q: "Taking heed is best done before hardship arrives.", why: "How can there be for them an admonition, when a Messenger had already come to them?" }
      ]
    },
    {
      slug: "one-taught-a-madman",
      title: "Taught, and mad?",
      line: "They turned away and said: he is taught by others, a madman.",
      facts: ["They opposed and rejected him", "Name-calling instead of proof"],
      quote: q44(14),
      source: ik(14, "Ibn Kathir says despite the clear message, they turned away, opposed and rejected him, and called him taught and mad.", "they turned away from him, opposed him and rejected him"),
      difficulty: 3,
      questions: [
        { q: "What did they call him, in 44:14?", a: "One taught, a madman", wrong: ["A king", "A prophet of old", "A friend"], why: "And said: (He is) one taught, a madman!" },
        { q: "What did they do, per Ibn Kathir?", a: "Turned away, opposed and rejected him", wrong: ["Followed him", "Thanked him", "Ignored nobody"], why: "They turned away from him, opposed him and rejected him." },
        { tf: false, q: "Name-calling is a strong proof against the truth.", why: "They had no proof; they only turned away and called him names." }
      ]
    },
    {
      slug: "they-would-revert",
      title: "They would go back",
      line: "Allah removes the hardship a while, yet they go back.",
      facts: ["Ease can make people forget", "Like 23:75 and 6:28"],
      quote: q44(15),
      source: ik(15, "Ibn Kathir says if the torment were removed and they were sent back, they would return to disbelief and denial.", "you would go back to your former state of disbelief and denial"),
      difficulty: 3,
      questions: [
        { q: "What does Allah say they will do, in 44:15?", a: "Revert", wrong: ["Thank Him", "Stay firm", "Move away"], why: "Verily, We shall remove the torment for a while. Verily, you will revert." },
        { q: "To what would they return, per Ibn Kathir?", a: "Disbelief and denial", wrong: ["Prayer", "Charity", "Good deeds"], why: "You would go back to your former state of disbelief and denial." },
        { q: "Which ayah does Ibn Kathir link to 44:15?", a: "6:28, they would revert to the forbidden", wrong: ["2:186", "97:1", "112:2"], why: "But if they were returned, they would certainly revert to that which they were forbidden (6:28)." }
      ]
    },
    {
      slug: "the-prophet-prayed-for-rain",
      title: "He prayed for rain",
      line: "In a famine, the Prophet ﷺ prayed for rain even for opponents.",
      facts: ["Abu Sufyan asked for rain", "Ease came, then they reverted"],
      quote: q44(15),
      source: hadith("bukhari", "4821", "Abdullah ibn Mas'ud", "Sahih", "When Quraysh suffered a famine, a man asked the Prophet ﷺ to pray for rain for Mudar. He prayed and it rained, then they went back to their ways.", "prayed for rain and it rained for them"),
      difficulty: 4,
      questions: [
        { q: "What did the Prophet ﷺ do, per Bukhari 4821?", a: "Prayed for rain for them", wrong: ["Left the city", "Stayed silent", "Built a well"], why: "But the Prophet ﷺ prayed for rain and it rained for them." },
        { q: "What did they do once ease returned?", a: "Went back to their old ways", wrong: ["All became Muslim", "Moved to Yemen", "Built a mosque"], why: "They restored prosperity and welfare, they reverted to their ways." },
        { tf: true, q: "The Prophet ﷺ showed mercy even to those who opposed him.", why: "He prayed for rain for Mudar though they had refused him." }
      ]
    },
    {
      slug: "the-great-batshah",
      title: "The great Batshah",
      line: "On that Day Allah will strike with the great grasp.",
      facts: ["Ibn Abbas: the Day of Resurrection", "Badr was also a day of vengeance"],
      quote: q44(16),
      source: ik(16, "Ibn Kathir says the apparent meaning of the great Batshah is the Day of Resurrection, though the day of Badr was also a day of vengeance.", "the apparent meaning is that it refers to the Day of Resurrection"),
      difficulty: 4,
      questions: [
        { q: "With what will Allah strike, in 44:16?", a: "The great Batshah", wrong: ["A small breeze", "A gentle rain", "A soft word"], why: "On the Day when We shall strike you with the great Batshah." },
        { q: "What is its apparent meaning, per Ibn Kathir?", a: "The Day of Resurrection", wrong: ["A market day", "A wedding", "A holiday"], why: "The apparent meaning is that it refers to the Day of Resurrection." },
        { q: "Which battle was also a day of vengeance, per Ibn Kathir?", a: "Badr", wrong: ["Uhud", "Hunayn", "Tabuk"], why: "Although the day of Badr was also a day of vengeance." }
      ]
    }
  ]
};

/** Ayahs 17 to 37: Musa before Firawn, the night escape and the calm sea, the heavens that did not weep, and the people of Tubba. */
const DUKHAN_TWO: DeepUnit = {
  key: "dukhan2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-44",
  name: "Ad-Dukhan, ayahs 17 to 37",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ad-Dukhan",
  lessons: [
    {
      slug: "a-noble-messenger",
      title: "A noble Messenger",
      line: "Allah tested Firawn's people when a noble Messenger came.",
      facts: ["The noble Messenger is Musa", "Allah spoke to Musa"],
      quote: q44(17),
      source: ik(17, "Ibn Kathir says Allah tested the people of Firawn before the idolaters, and the noble Messenger is Musa, to whom Allah spoke.", "the one to whom Allah spoke"),
      difficulty: 2,
      questions: [
        { q: "Whom did Allah test, in 44:17?", a: "Firawn's people", wrong: ["The people of Nuh", "The people of Lut", "The people of Saba"], why: "And indeed We tried before them Firawn's people." },
        { q: "Who is the noble Messenger, per Ibn Kathir?", a: "Musa", wrong: ["Harun", "Yusuf", "Shuayb"], why: "Means, Musa, peace be upon him, the one to whom Allah spoke." },
        { tf: true, q: "Musa is the one to whom Allah spoke.", why: "The one to whom Allah spoke." }
      ]
    },
    {
      slug: "deliver-allahs-servants",
      title: "Deliver Allah's servants",
      line: "Musa said: hand over Allah's servants; I am a trusted Messenger.",
      facts: ["Let the Children of Israel go", "His message was trustworthy"],
      quote: q44(18),
      source: ik(18, "Ibn Kathir says Musa asked for the Children of Israel, and said what he conveys is trustworthy, like 20:47.", "what I convey to you is trustworthy"),
      difficulty: 2,
      questions: [
        { q: "What did Musa ask Firawn, in 44:18?", a: "Deliver to me the servants of Allah", wrong: ["Give me your palace", "Make me king", "Pay me gold"], why: "Saying: Deliver to me the servants of Allah." },
        { q: "How did Musa describe himself, in 44:18?", a: "A Messenger worthy of all trust", wrong: ["A magician", "A soldier", "A trader"], why: "Verily, I am to you a Messenger worthy of all trust." },
        { q: "Which ayah does Ibn Kathir link to 44:18?", a: "20:47, let the Children of Israel go", wrong: ["2:255", "18:10", "93:1"], why: "So let the Children of Israel go with us, and torment them not (20:47)." }
      ]
    },
    {
      slug: "do-not-exalt-yourselves",
      title: "Do not be arrogant",
      line: "Do not exalt yourselves against Allah; I bring clear proof.",
      facts: ["Pride blocks the truth", "Musa came with clear signs"],
      quote: q44(19),
      source: ik(19, "Ibn Kathir says do not be too arrogant to follow His signs; Musa came with clear and obvious proof.", "do not be too arrogant to follow His signs"),
      difficulty: 3,
      questions: [
        { q: "What did Musa forbid, in 44:19?", a: "Exalting yourselves against Allah", wrong: ["Eating dates", "Travelling", "Building houses"], why: "And exalt not yourselves against Allah." },
        { q: "What does manifest authority mean, per Ibn Kathir?", a: "Clear and obvious proof", wrong: ["A large army", "A golden crown", "A tall tower"], why: "Means, with clear and obvious proof." },
        { tf: true, q: "Arrogance can stop a person from following the truth.", why: "Do not be too arrogant to follow His signs." }
      ]
    },
    {
      slug: "refuge-from-their-harm",
      title: "Refuge from their harm",
      line: "Musa sought refuge in his Lord and theirs from their harm.",
      facts: ["Ibn Abbas: harm by insults", "Qatadah: harm by stones"],
      quote: q44(20),
      source: ik(20, "Ibn Abbas said this means insults, and Qatadah said Musa sought refuge from any harmful words or actions.", "This refers to a verbal assault, which means insults"),
      difficulty: 3,
      questions: [
        { q: "With whom did Musa seek refuge, in 44:20?", a: "My Lord and your Lord", wrong: ["The king", "His tribe", "The army"], why: "And truly, I seek refuge with my Lord and your Lord." },
        { q: "What did Ibn Abbas say the harm meant?", a: "Insults", wrong: ["Hunger", "Cold", "Theft"], why: "This refers to a verbal assault, which means insults." },
        { tf: true, q: "We can seek refuge in Allah from hurtful words.", why: "I seek refuge with Allah from your making any harmful words or actions reach me." }
      ]
    },
    {
      slug: "leave-me-in-peace",
      title: "Leave me in peace",
      line: "If you do not believe me, keep away and leave me alone.",
      facts: ["Live in peace", "Allah will judge between us"],
      quote: q44(21),
      source: ik(21, "Ibn Kathir says Musa meant: let us leave each other alone and live in peace until Allah judges between us.", "let us leave one another alone and live in peace until Allah judges between us"),
      difficulty: 2,
      questions: [
        { q: "What did Musa ask, in 44:21?", a: "Keep away and leave me alone", wrong: ["Fight me", "Follow me by force", "Pay me"], why: "But if you believe me not, then keep away from me and leave me alone." },
        { q: "Until when, per Ibn Kathir?", a: "Until Allah judges between us", wrong: ["Until the harvest", "Until winter", "Forever"], why: "Live in peace until Allah judges between us." },
        { tf: true, q: "Musa chose peace over quarrel.", why: "Let us leave one another alone and live in peace." }
      ]
    },
    {
      slug: "musa-called-upon-his-lord",
      title: "Musa called his Lord",
      line: "Musa called on his Lord: these people are criminals.",
      facts: ["After a long time of calling them", "His prayer was answered"],
      quote: q44(22),
      source: ik(22, "Ibn Kathir says after Musa stayed long among them and they only grew in disbelief, he prayed, and his prayer was answered.", "a prayer which was answered"),
      difficulty: 3,
      questions: [
        { q: "What did Musa say, in 44:22?", a: "These are a criminal people", wrong: ["These are my friends", "These are kings", "These are scholars"], why: "These are indeed the people who are criminals." },
        { q: "Was his prayer answered, per Ibn Kathir?", a: "Yes", wrong: ["No", "Only half", "Years later only"], why: "He prayed to his Lord against them, a prayer which was answered." },
        { q: "What came before the prayer, per Ibn Kathir?", a: "A long time of calling them", wrong: ["One day", "Nothing", "A war"], why: "After Musa had stayed among them for a long time, and the proof of Allah had been established." }
      ]
    },
    {
      slug: "depart-by-night",
      title: "Depart by night",
      line: "Leave by night with My servants; you will be pursued.",
      facts: ["Allah commanded the escape", "Firawn would chase them"],
      quote: q44(23),
      source: ik(23, "Ibn Kathir says Allah commanded Musa to bring the Children of Israel out without Firawn's permission.", "Whereupon Allah commanded him to bring the Children of Israel out from among them"),
      difficulty: 2,
      questions: [
        { q: "When were they told to leave, in 44:23?", a: "By night", wrong: ["At noon", "On Friday", "In spring"], why: "Depart you with My servants by night." },
        { q: "What would happen, in 44:23?", a: "They would be pursued", wrong: ["They would be welcomed", "They would be paid", "Nothing"], why: "Surely, you will be pursued." },
        { q: "Which ayah does Ibn Kathir link to 44:23?", a: "20:77, travel by night", wrong: ["2:255", "55:1", "108:1"], why: "Travel by night with My servants and strike a dry path for them in the sea (20:77)." }
      ]
    },
    {
      slug: "leave-the-sea-calm",
      title: "Leave the sea calm",
      line: "Leave the sea parted and calm; that army will be drowned.",
      facts: ["Musa wanted to close the sea", "Allah told him to keep moving"],
      quote: q44(24),
      source: ik(24, "Ibn Kathir says Musa wanted to strike the sea to close it, but Allah told him to leave it as it was and keep moving.", "leave it as it is and keep moving"),
      difficulty: 3,
      questions: [
        { q: "How was the sea to be left, in 44:24?", a: "As it is, quiet and divided", wrong: ["Closed at once", "Stormy", "Frozen"], why: "And leave the sea as it is (quiet and divided)." },
        { q: "What did Ibn Abbas say it means?", a: "Leave it and keep moving", wrong: ["Go back", "Wait a year", "Swim across"], why: "Leave it as it is and keep moving." },
        { tf: true, q: "Allah gave Musa glad tidings that he need not fear.", why: "He should not fear either being overtaken by Firawn or drowning in the sea." }
      ]
    },
    {
      slug: "gardens-and-springs-left",
      title: "Gardens and springs left",
      line: "How many gardens and springs they left behind!",
      facts: ["Rivers and wells", "All left in one morning"],
      quote: q44(25),
      source: ik(25, "Ibn Kathir explains the gardens and springs they left behind, which refers to rivers and wells.", "this refers to rivers and wells"),
      difficulty: 2,
      questions: [
        { q: "What did Firawn's people leave, in 44:25?", a: "Gardens and springs", wrong: ["Ships", "Camels", "Books"], why: "How many of gardens and springs that they left behind." },
        { q: "What does Ibn Kathir say springs refer to?", a: "Rivers and wells", wrong: ["Clouds", "Mountains", "Deserts"], why: "This refers to rivers and wells." },
        { tf: true, q: "Worldly riches can be lost in a moment.", why: "Then all of that was taken away in a single morning." }
      ]
    },
    {
      slug: "goodly-places",
      title: "Fine places",
      line: "They left green fields and fine, high dwellings.",
      facts: ["Fine dwellings", "Elevated places"],
      quote: q44(26),
      source: ik(26, "Ibn Kathir says goodly places means fine dwellings and beautiful places; Mujahid said elevated places.", "fine dwellings and beautiful places"),
      difficulty: 2,
      questions: [
        { q: "What else did they leave, in 44:26?", a: "Green crops and goodly places", wrong: ["Swords and shields", "Tents only", "Nothing"], why: "And green crops (fields) and goodly places." },
        { q: "What are goodly places, per Ibn Kathir?", a: "Fine dwellings and beautiful places", wrong: ["Prisons", "Caves", "Markets"], why: "Fine dwellings and beautiful places." },
        { q: "What did Mujahid say goodly places means?", a: "Elevated places", wrong: ["Low valleys", "Ships", "Wells"], why: "And goodly places, means elevated places." }
      ]
    },
    {
      slug: "comforts-they-enjoyed",
      title: "Comforts they enjoyed",
      line: "They left the comforts in which they used to delight.",
      facts: ["Food, clothes, wealth and power", "Gone in a single morning"],
      quote: q44(27),
      source: ik(27, "Ibn Kathir says they enjoyed wealth, glory and power, then all of that was taken away in a single morning.", "Then all of that was taken away in a single morning"),
      difficulty: 3,
      questions: [
        { q: "What did they delight in, in 44:27?", a: "Comforts of life", wrong: ["Prayer", "Fasting", "Charity"], why: "And comforts of life wherein they used to take delight." },
        { q: "How fast was it taken, per Ibn Kathir?", a: "In a single morning", wrong: ["Over a century", "Over ten years", "Never"], why: "Then all of that was taken away in a single morning." },
        { tf: false, q: "Power and wealth kept Firawn's people safe.", why: "All of that was taken away in a single morning." }
      ]
    },
    {
      slug: "others-inherited-them",
      title: "Others inherited them",
      line: "Allah made another people inherit all of it.",
      facts: ["The heirs were the Children of Israel", "Allah gives and takes"],
      quote: q44(28),
      source: ik(28, "Ibn Kathir says the other people who inherited them were the Children of Israel.", "namely the Children of Israel"),
      difficulty: 2,
      questions: [
        { q: "What happened to their wealth, in 44:28?", a: "Other people inherited it", wrong: ["It vanished", "It turned to gold", "It was buried"], why: "Thus (it was)! And We made other people inherit them." },
        { q: "Who inherited it, per Ibn Kathir?", a: "The Children of Israel", wrong: ["The Romans", "The Persians", "The Greeks"], why: "Namely the Children of Israel." },
        { tf: true, q: "Everything we own is passed on one day.", why: "And We made other people inherit them." }
      ]
    },
    {
      slug: "heavens-did-not-weep",
      title: "No tears from the sky",
      line: "The heavens and the earth did not weep for them.",
      facts: ["They left no good deeds", "No places of worship missed them"],
      quote: q44(29),
      source: ik(29, "Ibn Kathir says they had no good deeds rising to the heavens and no places of worship on earth to miss them.", "heavens and the earth did not weep for them"),
      difficulty: 3,
      questions: [
        { q: "What did not weep, in 44:29?", a: "The heavens and the earth", wrong: ["Their children", "Their slaves", "Their soldiers"], why: "And the heavens and the earth wept not for them." },
        { q: "Why not, per Ibn Kathir?", a: "They had no righteous deeds", wrong: ["The sky was dry", "It was night", "They lived far away"], why: "They had no righteous deeds which used to ascend through the gates of the heavens." },
        { tf: false, q: "Firawn's people were given more time, in 44:29.", why: "Nor were they given respite." }
      ]
    },
    {
      slug: "the-believer-is-missed",
      title: "The believer is missed",
      line: "When a believer dies, his gate in heaven and prayer place weep.",
      facts: ["Good deeds rise through a gate", "His place of prayer misses him"],
      quote: q44(29),
      source: ik(29, "Ibn Abbas said everyone has a gate in heaven; when a believer dies it misses him and weeps, and so does his prayer place.", "it misses him and weeps for him"),
      difficulty: 3,
      questions: [
        { q: "What does everyone have, per Ibn Abbas?", a: "A gate in the heavens", wrong: ["A star", "A tree", "A river"], why: "There is no one who does not have a gate in the heavens through which his provision comes down." },
        { q: "What on earth weeps for the believer?", a: "His place of prayer", wrong: ["His shop", "His horse", "His sword"], why: "The place of prayer on earth where he used to pray and remember Allah also weeps for him." },
        { tf: true, q: "Praying and remembering Allah leaves a lasting mark.", why: "The place of prayer on earth where he used to pray and remember Allah also weeps for him." }
      ]
    },
    {
      slug: "saved-from-humiliation",
      title: "Saved from humiliation",
      line: "Allah saved the Children of Israel from the humiliating torment.",
      facts: ["They were forced into hard labor", "Allah freed them"],
      quote: q44(30),
      source: ik(30, "Ibn Kathir says Allah reminds them how He saved them from humiliation and subjugation, when they were forced to do menial tasks.", "He saved them from their humiliation and subjugation"),
      difficulty: 2,
      questions: [
        { q: "From what were they saved, in 44:30?", a: "The humiliating torment", wrong: ["A flood", "A famine", "A fire"], why: "And indeed We saved the Children of Israel from the humiliating torment." },
        { q: "What were they forced to do, per Ibn Kathir?", a: "Menial tasks", wrong: ["Rule cities", "Lead armies", "Teach"], why: "When they were forced to do menial tasks." },
        { tf: true, q: "Allah reminds people of His favors so they are grateful.", why: "Allah reminds them of how He saved them." }
      ]
    },
    {
      slug: "the-ashura-fast",
      title: "The fast of Ashura",
      line: "Musa fasted Ashura in thanks; the Prophet ﷺ fasted it too.",
      facts: ["The day is Ashura, 10 Muharram", "A fast of gratitude"],
      quote: q44(30),
      source: hadith("bukhari", "2004", "Abdullah ibn Abbas", "Sahih", "In Madinah the Prophet ﷺ learned Ashura is the day Allah rescued Bani Israel from their enemy and Musa fasted it, so he fasted it and told Muslims to fast.", "the day on which Allah rescued Bani Israel from their enemy"),
      difficulty: 3,
      questions: [
        { q: "What happened on Ashura, per Bukhari 2004?", a: "Allah rescued Bani Israel from their enemy", wrong: ["The Quran was revealed", "Makkah was opened", "The Kaabah was built"], why: "The day on which Allah rescued Bani Israel from their enemy." },
        { q: "What did the Prophet ﷺ do on Ashura?", a: "Fasted and told Muslims to fast", wrong: ["Held a feast", "Travelled", "Nothing"], why: "So, the Prophet ﷺ fasted on that day and ordered (the Muslims) to fast." },
        { tf: true, q: "Musa fasted Ashura in thanks to Allah.", why: "So, Moses fasted this day." }
      ]
    },
    {
      slug: "firawn-was-arrogant",
      title: "Firawn was arrogant",
      line: "Firawn was arrogant, one of those who went beyond all limits.",
      facts: ["Proud and stubborn", "Foolish opinion of himself"],
      quote: q44(31),
      source: ik(31, "Ibn Kathir says Firawn was proud and stubborn, exalted himself in the land, and held a foolish opinion of himself.", "he was proud and stubborn"),
      difficulty: 2,
      questions: [
        { q: "How is Firawn described, in 44:31?", a: "Arrogant and excessive", wrong: ["Humble and kind", "Wise and fair", "Poor and weak"], why: "Verily, he was arrogant and was of the excessive." },
        { q: "What does arrogant mean, per Ibn Kathir?", a: "Proud and stubborn", wrong: ["Shy", "Generous", "Sleepy"], why: "He was proud and stubborn." },
        { q: "Which ayah does Ibn Kathir link to 44:31?", a: "28:4, Firawn exalted himself in the land", wrong: ["2:2", "9:40", "19:1"], why: "Verily, Firawn exalted himself in the land (28:4)." }
      ]
    },
    {
      slug: "chosen-with-knowledge",
      title: "Chosen with knowledge",
      line: "Allah chose them, knowingly, above the nations of their time.",
      facts: ["Chosen above people of their own time", "Every age has people chosen"],
      quote: q44(32),
      source: ik(32, "Qatadah said they were chosen above other people of their own time, and every period has people chosen above others.", "were chosen above the other people of their own time"),
      difficulty: 3,
      questions: [
        { q: "How did Allah choose them, in 44:32?", a: "With knowledge", wrong: ["By chance", "By lottery", "For their wealth"], why: "And We chose them above the nations with knowledge." },
        { q: "Above whom were they chosen, per Qatadah?", a: "People of their own time", wrong: ["All people forever", "The angels", "The Prophets"], why: "They were chosen above the other people of their own time." },
        { q: "Which ayah does Ibn Kathir link to 44:32?", a: "7:144, I have chosen you above men", wrong: ["1:5", "112:4", "114:1"], why: "O Musa I have chosen you above men (7:144), which means, above the people of his time." }
      ]
    },
    {
      slug: "then-came-the-best-ummah",
      title: "Then came the best Ummah",
      line: "Israel was chosen over its time, until the best Ummah came.",
      facts: ["As-Sa'di explains", "The best Ummah"],
      quote: q44(32),
      source: saadi(44, 32, "As-Sa'di says Allah chose the Children of Israel over the people of their time, knowing they deserved it, until He brought the Ummah of Muhammad ﷺ, who were raised above all as the best nation.", "حتى أتى الله بأمة محمد صلى الله عليه وسلم ففضلوا العالمين كلهم"),
      difficulty: 2,
      questions: [
        { q: "Until when were the Children of Israel favored, per as-Sa'di?", a: "Until the Ummah of Muhammad ﷺ came", wrong: ["Forever", "Until Nuh", "Until the Flood"], why: "Then the Ummah of Muhammad ﷺ was raised above all." },
        { q: "How did Allah choose the Children of Israel, in Ad-Dukhan 44:32?", a: "With knowledge of them", wrong: ["By chance", "By their wealth", "By a vote"], why: "He chose them knowing they deserved that favor." },
        { tf: true, q: "Allah made the Ummah of Muhammad ﷺ the best nation brought out for people.", why: "As-Sa'di on 44:32." }
      ]
    },
    {
      slug: "signs-and-a-trial",
      title: "Signs and a test",
      line: "Allah gave them signs that held a clear test.",
      facts: ["Clear proofs and wonders", "A test of who follows guidance"],
      quote: q44(33),
      source: ik(33, "Ibn Kathir says the signs were clear proofs and wonders, an obvious test to show who would be guided.", "an obvious test to show who would be guided by it"),
      difficulty: 3,
      questions: [
        { q: "What did Allah grant them, in 44:33?", a: "Signs with a plain trial", wrong: ["Endless rest", "A crown", "A new sea"], why: "And granted them signs in which there was a plain trial." },
        { q: "What were the signs, per Ibn Kathir?", a: "Clear proofs and extraordinary evidence", wrong: ["Old songs", "Rumors", "Riddles"], why: "Means clear proofs and extraordinary evidence." },
        { tf: true, q: "Blessings can also be a test.", why: "An obvious test to show who would be guided by it." }
      ]
    },
    {
      slug: "these-people-are-saying",
      title: "What deniers say",
      line: "The idolaters of Makkah deny the Resurrection.",
      facts: ["They said life ends at death", "Allah answers them"],
      quote: q44(34),
      source: ik(34, "Ibn Kathir says Allah denounces the idolaters for denying the Resurrection and any life after death.", "denounces the idolators for their denial of the Resurrection"),
      difficulty: 2,
      questions: [
        { q: "What did the idolaters deny, per Ibn Kathir?", a: "The Resurrection", wrong: ["Rain", "Trade", "The sun"], why: "Allah denounces the idolators for their denial of the Resurrection." },
        { q: "Who are these people, in 44:34?", a: "The idolaters of Makkah", wrong: ["The angels", "The believers", "The Prophets"], why: "Verily, these people are saying..." },
        { tf: true, q: "Ad-Dukhan answers those who deny life after death.", why: "Refutation of Those Who deny the Resurrection." }
      ]
    },
    {
      slug: "only-our-first-death",
      title: "Only our first death?",
      line: "They said: there is only our first death; no rising again.",
      facts: ["They saw that forefathers did not return", "A weak argument"],
      quote: q44(35),
      source: ik(35, "Ibn Kathir says they believed there is no life or resurrection after death, because their forefathers had died and not returned.", "no life or resurrection after death"),
      difficulty: 3,
      questions: [
        { q: "What did they claim, in 44:35?", a: "Only our first death, no resurrection", wrong: ["Two lives on earth", "No death at all", "Life in the stars"], why: "There is nothing but our first death, and we shall not be resurrected." },
        { q: "What was their reason, per Ibn Kathir?", a: "Their forefathers died and did not return", wrong: ["A dream", "A book", "An angel told them"], why: "Based on the fact that their forefathers had died and had not returned." },
        { tf: false, q: "There is no life after death.", why: "Ibn Kathir: Allah will bring all creatures back, created anew." }
      ]
    },
    {
      slug: "bring-back-our-forefathers",
      title: "Bring back our fathers",
      line: "They said: bring back our forefathers, if you are truthful.",
      facts: ["A false argument", "Resurrection is on Judgement Day"],
      quote: q44(36),
      source: ik(36, "Ibn Kathir says this is false evidence, for the resurrection happens on the Day of Judgement, not in this world.", "the resurrection will happen on the Day of Judgement, not in this world"),
      difficulty: 3,
      questions: [
        { q: "What did they demand, in 44:36?", a: "Bring back our forefathers", wrong: ["Bring us gold", "Bring us rain", "Bring us a king"], why: "Then bring back our forefathers, if you speak the truth!" },
        { q: "When is the resurrection, per Ibn Kathir?", a: "On the Day of Judgement", wrong: ["Every year", "Tomorrow", "In this world"], why: "The resurrection will happen on the Day of Judgement, not in this world." },
        { tf: true, q: "Ibn Kathir calls their demand a specious argument.", why: "This is false evidence and a specious argument." }
      ]
    },
    {
      slug: "the-people-of-tubba",
      title: "The people of Tubba",
      line: "Are they better than the people of Tubba, whom Allah destroyed?",
      facts: ["Tubba was the title of Himyar kings", "They also denied the Resurrection"],
      quote: q44(37),
      source: ik(37, "Ibn Kathir says Tubba was the title of the kings of Himyar, known as Saba, like Caesar for Rome and Chosroes for Persia.", "when a man became their king, they called him Tubba"),
      difficulty: 4,
      questions: [
        { q: "Whom does 44:37 compare them to?", a: "The people of Tubba", wrong: ["The people of Ad", "The Romans", "The Persians"], why: "Are they better or the people of Tubba and those before them?" },
        { q: "What was Tubba, per Ibn Kathir?", a: "A title of the kings of Himyar", wrong: ["A river", "A mountain", "A city"], why: "When a man became their king, they called him Tubba." },
        { q: "Why were they destroyed, in 44:37?", a: "They were criminals", wrong: ["They were poor", "They were few", "They were far away"], why: "We destroyed them because they were indeed criminals." }
      ]
    },
    {
      slug: "the-tubba-who-honored-the-house",
      title: "A Tubba honored the House",
      line: "One Tubba honored the Kaabah and invited Yemen to guidance.",
      facts: ["He did Tawaf and covered it", "Yemen followed guidance with him"],
      quote: q44(37),
      source: ik(37, "Ibn Kathir says one Tubba, told the House was built by Ibrahim, respected it, did Tawaf and covered it with fine cloth.", "So he respected it, performed Tawaf around it, and covered it with a fine cloth"),
      difficulty: 4,
      questions: [
        { q: "Who built the House, the Tubba was told?", a: "Ibrahim", wrong: ["Sulayman", "Nuh", "Dawud"], why: "That it had been built by Ibrahim Al-Khalil, peace be upon him." },
        { q: "What did the Tubba do at the House?", a: "Performed Tawaf and covered it", wrong: ["Built a tower", "Took its treasure", "Moved it"], why: "So he respected it, performed Tawaf around it, and covered it with a fine cloth." },
        { tf: true, q: "That Tubba invited his people in Yemen to guidance.", why: "He returned to Yemen and invited its people to follow the religion of guidance along with him." }
      ]
    }
  ]
};

/** Ayahs 38 to 59: creation with purpose, the Day of Sorting, the fate of deniers told gently, and the joys of those with taqwa. */
const DUKHAN_THREE: DeepUnit = {
  key: "dukhan3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-44",
  name: "Ad-Dukhan, ayahs 38 to 59",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ad-Dukhan",
  lessons: [
    {
      slug: "not-created-in-play",
      title: "Not created in play",
      line: "Allah did not create the heavens and earth just for play.",
      facts: ["Creation has a purpose", "Allah is perfectly just"],
      quote: q44(38),
      source: ik(38, "Ibn Kathir says Allah tells us of His justice, and that He is far above mere play, folly and falsehood.", "He is far above mere play, folly and falsehood"),
      difficulty: 2,
      questions: [
        { q: "How did Allah not create the world, in 44:38?", a: "For play", wrong: ["With wisdom", "With truth", "With purpose"], why: "And We created not the heavens and the earth, and all that is between them, for mere play." },
        { q: "What is Allah far above, per Ibn Kathir?", a: "Play, folly and falsehood", wrong: ["Mercy", "Justice", "Wisdom"], why: "He is far above mere play, folly and falsehood." },
        { q: "Which ayah does Ibn Kathir link to 44:38?", a: "38:27, not created without purpose", wrong: ["2:1", "96:1", "113:1"], why: "And We created not the heaven and the earth and all that is between them without purpose (38:27)." }
      ]
    },
    {
      slug: "created-with-truth",
      title: "Created with truth",
      line: "Allah created them only with truth, but most do not know.",
      facts: ["We will be brought back to Allah", "Like 23:115"],
      quote: q44(39),
      source: ik(39, "Ibn Kathir links this to 23:115: did you think We created you in play and you would not return to Us?", "Did you think that We had created you in play"),
      difficulty: 3,
      questions: [
        { q: "With what were they created, in 44:39?", a: "With truth", wrong: ["With luck", "With play", "With doubt"], why: "We created them not except with truth." },
        { q: "What do most people not know, in 44:39?", a: "That creation has a true purpose", wrong: ["How to swim", "Where Makkah is", "The names of stars"], why: "But most of them know not." },
        { tf: true, q: "We will all be brought back to Allah.", why: "Did you think that We had created you in play, and that you would not be brought back to Us? (23:115)" }
      ]
    },
    {
      slug: "the-day-of-sorting",
      title: "The Day of Sorting",
      line: "The Day of Sorting is the time appointed for all of them.",
      facts: ["Allah judges between all creatures", "The first and last gathered"],
      quote: q44(40),
      source: ik(40, "Ibn Kathir says this is the Day of Resurrection, when Allah will judge between all creatures, the first and the last.", "This is the Day of Resurrection, when Allah will judge between all creatures"),
      difficulty: 2,
      questions: [
        { q: "What is the appointed time, in 44:40?", a: "The Day of Judgement", wrong: ["Harvest day", "The new moon", "A wedding day"], why: "Verily, the Day of Judgement is the time appointed for all of them." },
        { q: "Who will be gathered, per Ibn Kathir?", a: "The first and the last of them", wrong: ["Only kings", "Only the young", "Only one nation"], why: "He will gather all of them, the first and the last of them." },
        { q: "What will Allah do that Day, per Ibn Kathir?", a: "Judge between all creatures", wrong: ["Sleep", "Stay silent", "Leave them alone"], why: "When Allah will judge between all creatures." }
      ]
    },
    {
      slug: "no-relative-can-help",
      title: "No relative can help",
      line: "That Day no relative can help a relative at all.",
      facts: ["No help from family", "No help from outside"],
      quote: q44(41),
      source: ik(41, "Ibn Kathir says no relative will be able to help another, and no help will come from outside, like 23:101.", "no relative will be able to help another relative"),
      difficulty: 3,
      questions: [
        { q: "Who cannot help, in 44:41?", a: "A near relative", wrong: ["Allah", "Good deeds", "Allah's mercy"], why: "The Day when a near relative cannot avail a near relative in aught." },
        { q: "Will help come from outside, per Ibn Kathir?", a: "No", wrong: ["Yes, from kings", "Yes, from idols", "Yes, from wealth"], why: "No help will come to him from outside." },
        { q: "Which ayah does Ibn Kathir link to 44:41?", a: "23:101, no kinship that Day", wrong: ["1:7", "36:82", "110:1"], why: "There will be no kinship among them that Day, nor will they ask of one another (23:101)." }
      ]
    },
    {
      slug: "except-whom-allah-has-mercy",
      title: "Only Allah's mercy",
      line: "Only those on whom Allah has mercy are helped that Day.",
      facts: ["Allah's mercy is what avails", "The Mighty, the Most Merciful"],
      quote: q44(42),
      source: ik(42, "Ibn Kathir says nothing will avail that Day except the mercy of Allah towards His creation.", "nothing will be of any avail that Day except the mercy of Allah"),
      difficulty: 2,
      questions: [
        { q: "Who is the exception, in 44:42?", a: "Him on whom Allah has mercy", wrong: ["The richest", "The strongest", "The oldest"], why: "Except him on whom Allah has mercy." },
        { q: "Which two names end 44:42?", a: "All-Mighty, Most Merciful", wrong: ["First, Last", "Hearer, Seer", "King, Holy"], why: "Verily, He is the All-Mighty, the Most Merciful." },
        { tf: true, q: "We should always hope for Allah's mercy.", why: "Nothing will be of any avail that Day except the mercy of Allah." }
      ]
    },
    {
      slug: "the-tree-of-zaqqum",
      title: "The tree of Zaqqum",
      line: "The tree of Zaqqum is food for those who sinned and denied.",
      facts: ["A bitter tree in Hell", "For sins in word and deed"],
      quote: q44(43),
      source: ik(43, "Ibn Kathir says the sinners are those who sinned by their words and deeds, the disbelievers.", "Those who sinned by their words and in deeds"),
      difficulty: 3,
      questions: [
        { q: "Which tree is named, in 44:43?", a: "Zaqqum", wrong: ["Sidrah", "Tuba", "The olive"], why: "Verily, the tree of Zaqqum." },
        { q: "Who are the sinners, per Ibn Kathir?", a: "Those who sinned in word and deed", wrong: ["Those who slept late", "The poor", "Children"], why: "Those who sinned by their words and in deeds. These are the disbelievers." },
        { tf: true, q: "The Quran warns so we choose good words and deeds.", why: "Those who sinned by their words and in deeds." }
      ]
    },
    {
      slug: "say-the-evildoer",
      title: "Abu Darda teaches",
      line: "Zaqqum is the food of the sinner; Abu Darda taught it patiently.",
      facts: ["A man misread the word", "Abu Darda gave an easier word"],
      quote: q44(44),
      source: ik(44, "Abu Ad-Darda was teaching a man who kept misreading, so he told him to say: the food of the evildoer.", "Say, the tree of Zaqqum is the food of the evildoer"),
      difficulty: 3,
      questions: [
        { q: "Whose food is Zaqqum, in 44:44?", a: "The sinners", wrong: ["The believers", "The angels", "The animals"], why: "Will be the food of the sinners." },
        { q: "What did the man say by mistake?", a: "The food of the orphan", wrong: ["The food of the king", "The food of the bird", "The food of the poor"], why: "The man said, The food of the orphan." },
        { tf: true, q: "Abu Darda helped the learner with an easier word.", why: "Abu Ad-Darda said, Say, the tree of Zaqqum is the food of the evildoer." }
      ]
    },
    {
      slug: "like-dregs-of-oil",
      title: "Like dregs of oil",
      line: "Zaqqum is like dregs of oil; Allah keep us from it.",
      facts: ["A food no one wants", "A warning to stay away"],
      quote: q44(45),
      source: ik(45, "Ibn Kathir says like boiling oil means like the dregs of oil.", "like the dregs of oil"),
      difficulty: 3,
      questions: [
        { q: "What is it like, in 44:45?", a: "Boiling oil", wrong: ["Cool water", "Sweet honey", "Fresh milk"], why: "Like boiling oil, it will boil in the bellies." },
        { q: "What does boiling oil mean, per Ibn Kathir?", a: "The dregs of oil", wrong: ["Olive oil", "Perfume", "Butter"], why: "Means, like the dregs of oil." },
        { tf: true, q: "We ask Allah to keep us far from Hell.", why: "The Quran describes it so that we stay away from what leads to it." }
      ]
    },
    {
      slug: "like-scalding-water",
      title: "Like scalding water",
      line: "Zaqqum boils inside like scalding water; a warning for us.",
      facts: ["Because of its heat", "A strong warning"],
      quote: q44(46),
      source: ik(46, "Ibn Kathir says it boils inside because of its heat and rancidity.", "because of its heat and rancidity"),
      difficulty: 3,
      questions: [
        { q: "How does it boil, in 44:46?", a: "Like the boiling of scalding water", wrong: ["Like a gentle stream", "Like snow", "Like a breeze"], why: "Like the boiling of scalding water." },
        { q: "Why does it boil, per Ibn Kathir?", a: "Because of its heat", wrong: ["Because of the cold", "Because of the wind", "Because of the night"], why: "Because of its heat and rancidity." },
        { tf: true, q: "Warnings in the Quran are a mercy that guide us.", why: "Allah warns so that people turn to Him before that Day." }
      ]
    },
    {
      slug: "seize-the-denier",
      title: "Taken by the keepers",
      line: "The keepers of Hell will take the denier into its midst.",
      facts: ["Said about the disbeliever", "Many keepers obey at once"],
      quote: q44(47),
      source: ik(47, "Ibn Kathir says this is said about the disbeliever, who will be taken into the middle of the Fire.", "means the disbeliever"),
      difficulty: 3,
      questions: [
        { q: "About whom is 44:47 said, per Ibn Kathir?", a: "The disbeliever", wrong: ["The believer", "The angel", "The child"], why: "Seize him means the disbeliever." },
        { q: "Where is he taken, per Ibn Kathir?", a: "Into the middle of it", wrong: ["To a garden", "To a palace", "Back home"], why: "Into the midst of blazing Fire, means into the middle of it." },
        { tf: true, q: "Allah's angels carry out His command at once.", why: "When Allah says to the keepers of Hell, Seize him, they will rush to seize him." }
      ]
    },
    {
      slug: "may-allah-protect-us",
      title: "May Allah protect us",
      line: "A painful punishment awaits the proud denier; Allah protect us.",
      facts: ["Like 22:19-20", "Ibn Kathir prays for protection"],
      quote: q44(48),
      source: ik(48, "After describing the punishment of 44:48, Ibn Kathir prays: may Allah protect us from that.", "may Allah protect us from that"),
      difficulty: 3,
      questions: [
        { q: "What does Ibn Kathir say after 44:48?", a: "May Allah protect us from that", wrong: ["Nothing", "That is easy", "Do not worry"], why: "May Allah protect us from that." },
        { q: "Which ayah does Ibn Kathir link to 44:48?", a: "22:19", wrong: ["2:255", "55:13", "97:1"], why: "Ibn Kathir explains 44:48 with the ayahs 22:19-20." },
        { tf: true, q: "Asking Allah for protection from Hell is a good dua.", why: "May Allah protect us from that." }
      ]
    },
    {
      slug: "neither-mighty-nor-generous",
      title: "Not mighty, not noble",
      line: "Taste it! You thought you were the mighty, the noble one.",
      facts: ["Said as a rebuke", "Pride is exposed that Day"],
      quote: q44(49),
      source: ik(49, "Ibn Abbas said it means: you are neither mighty nor generous; it is said to rebuke the proud.", "you are neither mighty nor generous"),
      difficulty: 3,
      questions: [
        { q: "What did the denier pretend to be, in 44:49?", a: "The mighty, the generous", wrong: ["The humble", "The poor", "The patient"], why: "Verily, you were (pretending to be) the mighty, the generous." },
        { q: "What did Ibn Abbas say it means?", a: "You are neither mighty nor generous", wrong: ["You are very mighty", "You are a king", "You are forgiven"], why: "This means, you are neither mighty nor generous." },
        { tf: true, q: "Pride in this world is shown to be empty on that Day.", why: "They will say that to him by way of ridicule and rebuke." }
      ]
    },
    {
      slug: "what-you-used-to-doubt",
      title: "What you used to doubt",
      line: "This is what you used to doubt!",
      facts: ["Doubt turns to certainty", "Like 52:13-15"],
      quote: q44(50),
      source: ik(50, "Ibn Kathir says this is what they used to doubt, like 52:13-15: this is the Fire you used to deny.", "this is that whereof you used to doubt"),
      difficulty: 2,
      questions: [
        { q: "What will be said, in 44:50?", a: "This is what you used to doubt", wrong: ["This is a dream", "This is a garden", "This is a gift"], why: "Verily, this is that whereof you used to doubt!" },
        { q: "Which ayah does Ibn Kathir link to 44:50?", a: "52:14, the Fire you used to deny", wrong: ["2:186", "39:53", "93:5"], why: "This is the Fire which you used to deny (52:14)." },
        { tf: true, q: "Ad-Dukhan opened with people playing in doubt, 44:9.", why: "Nay! They play about in doubt (44:9)." }
      ]
    },
    {
      slug: "a-place-of-security",
      title: "A place of security",
      line: "Those with taqwa will be in a place of security.",
      facts: ["Safe from death and worry", "Safe from Shaytan's tricks"],
      quote: q44(51),
      source: ik(51, "Ibn Kathir says in Paradise they will be safe from death and the fear of leaving it, and from every worry and grief.", "safe from death and the fear of leaving it"),
      difficulty: 2,
      questions: [
        { q: "Where will those with taqwa be, in 44:51?", a: "In a place of security", wrong: ["In a desert", "In a storm", "In a prison"], why: "Verily, those who have Taqwa, will be in place of security." },
        { q: "From what will they be safe, per Ibn Kathir?", a: "Death and the fear of leaving", wrong: ["Joy", "Friends", "Light"], why: "Where they will be safe from death and the fear of leaving it." },
        { tf: true, q: "In Paradise there is no worry or grief.", why: "And from every kind of worry, grief, terror and exhaustion." }
      ]
    },
    {
      slug: "blessed-after-doomed",
      title: "Joy after warning",
      line: "After the doomed, the Quran describes the blessed with taqwa.",
      facts: ["Warning then hope", "Taqwa: fear and duty to Allah"],
      quote: q44(51),
      source: ik(51, "Ibn Kathir says when Allah describes the doomed He follows it with the blessed, those who fear Him and are dutiful.", "those who fear Allah and are dutiful towards Him in this world"),
      difficulty: 3,
      questions: [
        { q: "What follows the doomed, per Ibn Kathir?", a: "A description of the blessed", wrong: ["A story of kings", "A list of laws", "Nothing"], why: "When Allah describes the state of the doomed, He follows that with a description of the life of the blessed." },
        { q: "Who has taqwa, per Ibn Kathir?", a: "Those who fear Allah and do their duty", wrong: ["Those who are rich", "Those who are loud", "Those who are tall"], why: "Those who fear Allah and are dutiful towards Him in this world." },
        { tf: true, q: "The Quran balances warning with hope.", why: "He follows that with a description of the life of the blessed." }
      ]
    },
    {
      slug: "among-gardens-and-springs",
      title: "Gardens and springs",
      line: "They will be among gardens and springs.",
      facts: ["The opposite of Zaqqum", "Firawn left gardens; believers gain them"],
      quote: q44(52),
      source: ik(52, "Ibn Kathir says gardens and springs are in direct contrast to the state of the doomed.", "This is in direct contrast to the state of the doomed"),
      difficulty: 2,
      questions: [
        { q: "Where are the people of taqwa, in 44:52?", a: "Among gardens and springs", wrong: ["Among rocks", "In a cave", "In a desert"], why: "Among Gardens and Springs." },
        { q: "What are the gardens in contrast to, per Ibn Kathir?", a: "The state of the doomed", wrong: ["The sea", "The moon", "The market"], why: "This is in direct contrast to the state of the doomed." },
        { tf: true, q: "Firawn's people left gardens and springs, in 44:25.", why: "How many of gardens and springs that they left behind (44:25)." }
      ]
    },
    {
      slug: "fine-silk-facing-each-other",
      title: "Facing each other",
      line: "Dressed in fine silk, they sit facing one another.",
      facts: ["Sundus and Istabraq are silks", "No one turns his back on another"],
      quote: q44(53),
      source: ik(53, "Ibn Kathir says Sundus is the finest silk, and facing each other means none will sit with his back to another.", "none of them will sit with his back to anyone else"),
      difficulty: 3,
      questions: [
        { q: "What do they wear, in 44:53?", a: "Sundus and Istabraq", wrong: ["Wool and cotton", "Leather", "Iron armor"], why: "Dressed in Sundus and Istabraq, facing each other." },
        { q: "What is Sundus, per Ibn Kathir?", a: "The finest silk", wrong: ["A metal", "A fruit", "A river"], why: "Dressed in Sundus means, the finest of silk." },
        { q: "What does facing each other mean, per Ibn Kathir?", a: "No one sits with his back to another", wrong: ["They argue", "They race", "They sleep"], why: "None of them will sit with his back to anyone else." }
      ]
    },
    {
      slug: "companions-with-lovely-eyes",
      title: "Pure companions",
      line: "Allah will give them pure companions with lovely eyes.",
      facts: ["A gift from Allah", "Beyond what we can imagine"],
      quote: q44(54),
      source: ik(54, "Ibn Kathir says the Hur with lovely eyes will be a gift in addition to the believers' own spouses.", "This will be a gift in addition to the beautiful wives given to them"),
      difficulty: 3,
      questions: [
        { q: "What will be given, in 44:54?", a: "Hur with wide lovely eyes", wrong: ["Horses", "Ships", "Swords"], why: "And We shall marry them to Hur (fair females) with wide lovely eyes." },
        { q: "What are they, per Ibn Kathir?", a: "A gift added to their spouses", wrong: ["A test", "Servants of kings", "A punishment"], why: "This will be a gift in addition to the beautiful wives given to them." },
        { tf: true, q: "Paradise holds gifts beyond what we imagine.", why: "Is there any reward for good other than good? (55:60)" }
      ]
    },
    {
      slug: "every-fruit-in-safety",
      title: "Every fruit, in safety",
      line: "They call for every fruit, in peace and security.",
      facts: ["Whatever fruit they ask for", "The supply never runs out"],
      quote: q44(55),
      source: ik(55, "Ibn Kathir says whatever fruit they ask for will be brought, and the supply will never end or be withheld.", "this supply will never come to an end or be withheld"),
      difficulty: 2,
      questions: [
        { q: "What do they call for, in 44:55?", a: "Every kind of fruit", wrong: ["Only water", "Only bread", "Nothing"], why: "They will call therein for every kind of fruit in peace and security." },
        { q: "Will the fruit run out, per Ibn Kathir?", a: "Never", wrong: ["After a year", "In winter", "At night"], why: "This supply will never come to an end or be withheld." },
        { tf: true, q: "In Paradise there is no fear of losing blessings.", why: "They will have the security of knowing that this supply will never come to an end." }
      ]
    },
    {
      slug: "no-death-in-paradise",
      title: "No death there",
      line: "They will never taste death there, after the first death.",
      facts: ["Life forever in Paradise", "Saved from the Fire"],
      quote: q44(56),
      source: ik(56, "Ibn Kathir says the exception strengthens the meaning: they will never taste death there, and are saved from the Fire.", "they will never taste death there"),
      difficulty: 3,
      questions: [
        { q: "What will they never taste, in 44:56?", a: "Death", wrong: ["Fruit", "Water", "Joy"], why: "They will never taste death therein except the first death." },
        { q: "What is the only death, in 44:56?", a: "The first death", wrong: ["A second death", "A death in Paradise", "No death at all"], why: "Except the first death." },
        { tf: true, q: "Allah also saves them from the blazing Fire.", why: "And He will save them from the torment of the blazing Fire." }
      ]
    },
    {
      slug: "never-ill-never-old",
      title: "Never ill, never old",
      line: "In Paradise you are healthy, young and alive forever.",
      facts: ["Never fall ill", "Never grow old"],
      quote: q44(56),
      source: hadith("muslim", "2837", "Abu Sa'id al-Khudri and Abu Hurairah", "Sahih", "The Prophet ﷺ said a caller will announce in Paradise: you will be healthy and never ill, live and never die, stay young and never grow old.", "that you should never fall ill"),
      difficulty: 3,
      questions: [
        { q: "What will never happen in Paradise, per Muslim 2837?", a: "Falling ill", wrong: ["Eating", "Smiling", "Meeting friends"], why: "That you should never fall ill." },
        { q: "What else is promised in Muslim 2837?", a: "Staying young forever", wrong: ["Growing old", "Becoming poor", "Getting tired"], why: "That you would remain young and never grow old." },
        { tf: true, q: "The people of Paradise will never become poor.", why: "You would always live in affluent circumstances and never become destitute." }
      ]
    },
    {
      slug: "a-bounty-from-your-lord",
      title: "A bounty from your Lord",
      line: "All of it is a bounty from your Lord: the supreme success.",
      facts: ["From His kindness", "The greatest win"],
      quote: q44(57),
      source: ik(57, "Ibn Kathir says this is from Allah's bounty and kindness to them, and no one enters Paradise by deeds alone.", "that will be from His bounty and kindness towards them"),
      difficulty: 3,
      questions: [
        { q: "What is it called, in 44:57?", a: "The supreme success", wrong: ["A small prize", "A short rest", "A test"], why: "As a bounty from your Lord! That will be the supreme success." },
        { q: "Where does it come from, per Ibn Kathir?", a: "His bounty and kindness", wrong: ["Our wealth", "Our family", "Luck"], why: "That will be from His bounty and kindness towards them." },
        { tf: true, q: "Real success is entering Paradise.", why: "That will be the supreme success." }
      ]
    },
    {
      slug: "made-easy-in-your-tongue",
      title: "Made easy for you",
      line: "Allah made the Quran easy in your tongue so people remember.",
      facts: ["Easy, plain and clear", "In the most eloquent language"],
      quote: q44(58),
      source: ik(58, "Ibn Kathir says Allah made the Quran easy, plain and clear, in the most eloquent language, so people understand.", "easy, plain and clear, in your language"),
      difficulty: 2,
      questions: [
        { q: "How did Allah make the Quran, in 44:58?", a: "Easy in your tongue", wrong: ["Hard to read", "Secret", "Only for scholars"], why: "Certainly, We have made this easy in your tongue." },
        { q: "Why, in 44:58?", a: "That they may remember", wrong: ["That they may sleep", "That they may argue", "That they may forget"], why: "In order that they may remember." },
        { q: "What does remember mean, per Ibn Kathir?", a: "Understand and know", wrong: ["Sing", "Count", "Copy"], why: "In order that they may understand and know." }
      ]
    },
    {
      slug: "wait-they-are-waiting",
      title: "Wait, they are waiting",
      line: "Wait then; they too are waiting. The truth will win.",
      facts: ["A comfort for the Prophet ﷺ", "Victory for the Messengers"],
      quote: q44(59),
      source: ik(59, "Ibn Kathir says Allah consoles His Messenger: they will come to know who will be victorious, in this world and the Hereafter.", "they will come to know who will be victorious"),
      difficulty: 3,
      questions: [
        { q: "What is the Prophet ﷺ told, in 44:59?", a: "Wait; they too are waiting", wrong: ["Run away", "Give up", "Argue more"], why: "Wait then; verily, they (too) are waiting." },
        { q: "What will they come to know, per Ibn Kathir?", a: "Who will be victorious", wrong: ["The price of gold", "The weather", "The date of Eid"], why: "They will come to know who will be victorious." },
        { q: "Which ayah does Ibn Kathir link to 44:59?", a: "58:21, I and My Messengers shall win", wrong: ["2:1", "48:1", "109:6"], why: "Verily, it is I and My Messengers who shall be the victorious (58:21)." }
      ]
    }
  ]
};

export const DUKHAN_UNITS: readonly DeepUnit[] = [DUKHAN_ONE, DUKHAN_TWO, DUKHAN_THREE];
