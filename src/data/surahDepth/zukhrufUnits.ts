import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Az-Zukhruf ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Az-Zukhruf 43:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_43_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Az-Zukhruf 43:${ayah}`,
    url: `https://quran.com/43:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 43:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q43 = (ayah: number) => quranQuote(43, ayah);

/** Ayahs 1 to 22: a clear Arabic Quran, the earth made for us, the rider's dua, and the idolaters' false claims. */
const ZUKHRUF_ONE: DeepUnit = {
  key: "zukhruf1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-43",
  name: "Az-Zukhruf, ayahs 1 to 22",
  kind: "skill",
  lessonType: "surah",
  surahName: "Az-Zukhruf",
  lessons: [
    {
      slug: "ha-mim-opens-zukhruf",
      title: "Ha Mim opens Az-Zukhruf",
      line: "Az-Zukhruf opens with Ha Mim, the fourth such surah in a row.",
      facts: ["Az-Zukhruf means gold adornments", "Named after 43:35"],
      quote: q43(1),
      source: ik(1, "Ibn Kathir explains the Book is plain and clear in both wording and meaning.", "plain and clear in both wording and meaning"),
      difficulty: 1,
      questions: [
        { q: "Which letters open Az-Zukhruf, in 43:1?", a: "Ha Mim", wrong: ["Alif Lam Mim", "Ya Sin", "Ta Ha"], why: "The surah opens: Ha Mim." },
        { q: "What does Az-Zukhruf mean?", a: "Gold adornments", wrong: ["The Smoke", "The Cave", "The Bee"], why: "Zukhruf means adornments of gold, named after 43:35." },
        { tf: true, q: "Az-Zukhruf comes right after Ash-Shura.", why: "Az-Zukhruf is surah 43, after Ash-Shura, surah 42." }
      ]
    },
    {
      slug: "by-the-clear-book",
      title: "By the clear Book",
      line: "Allah swears by the clear Book, the Quran.",
      facts: ["Clear in wording and meaning", "Revealed in eloquent Arabic"],
      quote: q43(2),
      source: ik(2, "Ibn Kathir says the Quran is clear because it came in Arabic, the most eloquent language for communication.", "the most eloquent language for communication among people"),
      difficulty: 1,
      questions: [
        { q: "By what does Allah swear, in 43:2?", a: "The manifest Book", wrong: ["The sun", "The fig", "The dawn"], why: "By the manifest Book." },
        { q: "How is the Book clear, per Ibn Kathir?", a: "In wording and meaning", wrong: ["Only in sound", "Only in length", "Only in script"], why: "Plain and clear in both wording and meaning." },
        { tf: true, q: "Ibn Kathir calls Arabic a most eloquent language.", why: "The most eloquent language for communication among people." }
      ]
    },
    {
      slug: "arabic-to-understand",
      title: "Arabic, to understand",
      line: "Allah made it an Arabic Quran so we may understand it.",
      facts: ["Understand it", "Ponder its meanings"],
      quote: q43(3),
      source: ik(3, "Ibn Kathir says it came in Arabic so you may understand it and ponder its meanings.", "that you may understand it and ponder its meanings"),
      difficulty: 1,
      questions: [
        { q: "Why is the Quran in Arabic, in 43:3?", a: "That you may understand", wrong: ["To be short", "To be secret", "To rhyme only"], why: "We have made it a Quran in Arabic that you may be able to understand." },
        { q: "What should we do with its meanings, per Ibn Kathir?", a: "Ponder them", wrong: ["Ignore them", "Hide them", "Change them"], why: "That you may understand it and ponder its meanings." },
        { q: "Which ayah does Ibn Kathir link to 43:3?", a: "26:195, plain Arabic language", wrong: ["2:255", "112:1", "1:1"], why: "In the plain Arabic language (26:195)." }
      ]
    },
    {
      slug: "in-the-mother-of-the-book",
      title: "In the Mother of the Book",
      line: "The Quran is with Allah in the Mother of the Book, exalted.",
      facts: ["The Preserved Tablet", "Full of wisdom"],
      quote: q43(4),
      source: ik(4, "Ibn Abbas and Mujahid said the Mother of the Book is Al-Lawh Al-Mahfuz, the Preserved Tablet.", "Al-Lawh Al-Mahfuz"),
      difficulty: 2,
      questions: [
        { q: "What is the Mother of the Book, per Ibn Abbas?", a: "The Preserved Tablet", wrong: ["Makkah", "The Kabah", "A scroll"], why: "The Mother of the Book means Al-Lawh Al-Mahfuz, the Preserved Tablet." },
        { q: "How is the Quran described, in 43:4?", a: "Exalted, full of wisdom", wrong: ["Hidden, unclear", "New, untested", "Short, simple"], why: "Indeed exalted, full of wisdom." },
        { q: "Why does 43:4 show its high status, per Ibn Kathir?", a: "So people will respect it", wrong: ["To scare angels", "To make it long", "For no reason"], why: "So that the people of earth will respect it, venerate it and obey it." }
      ]
    },
    {
      slug: "the-reminder-kept-coming",
      title: "The Reminder kept coming",
      line: "Allah did not stop the Quran, though people turned away.",
      facts: ["Mercy kept the call going", "About twenty years of calling"],
      quote: q43(5),
      source: ik(5, "Qatadah said Allah, by His mercy, kept sending the Quran and calling people to it, though many turned away.", "Allah by His mercy persisted in sending it"),
      difficulty: 2,
      questions: [
        { q: "What does 43:5 ask?", a: "Shall We take away the Reminder?", wrong: ["Shall We send rain?", "Shall We build?", "Shall We sleep?"], why: "Shall We then take away the Reminder from you, because you are a people excessive?" },
        { q: "Why did the Quran keep coming, per Qatadah?", a: "By Allah's mercy", wrong: ["By chance", "Because they asked", "By force"], why: "Allah by His mercy persisted in sending it and calling them to it." },
        { tf: true, q: "Allah kept calling people even when they turned away.", why: "He did not stop calling them, even though they were heedless and turned away." }
      ]
    },
    {
      slug: "many-prophets-before",
      title: "Many Prophets before",
      line: "Allah sent many Prophets to the nations of old.",
      facts: ["The Prophet ﷺ was consoled", "Told to be patient"],
      quote: q43(6),
      source: ik(6, "Ibn Kathir says Allah consoled the Prophet ﷺ for his people's disbelief and commanded him to bear it with patience.", "commands him to bear it with patience"),
      difficulty: 2,
      questions: [
        { q: "Whom did Allah send to the men of old, in 43:6?", a: "Many Prophets", wrong: ["No one", "Only kings", "Only poets"], why: "And how many a Prophet have We sent amongst the men of old." },
        { q: "What was the Prophet ﷺ told, per Ibn Kathir?", a: "To bear it with patience", wrong: ["To give up", "To leave", "To be angry"], why: "Allah consoles His Prophet and commands him to bear it with patience." },
        { tf: true, q: "Earlier Prophets faced rejection too.", why: "Then Allah consoles His Prophet for the disbelief of his people." }
      ]
    },
    {
      slug: "they-mocked-every-prophet",
      title: "They mocked every Prophet",
      line: "Every Prophet who came to them, they mocked him.",
      facts: ["Mockery is old", "Truth stays true"],
      quote: q43(7),
      source: ik(7, "Ibn Kathir says they disbelieved each Prophet and mocked him.", "they disbelieved him and mock at him"),
      difficulty: 2,
      questions: [
        { q: "What did people do to the Prophets, in 43:7?", a: "Mocked them", wrong: ["Crowned them", "Paid them", "Ignored no one"], why: "And never came there a Prophet to them but they used to mock at him." },
        { q: "What did they do besides mock, per Ibn Kathir?", a: "Disbelieved him", wrong: ["Followed him", "Fed him", "Thanked him"], why: "They disbelieved him and mock at him." },
        { tf: false, q: "Being mocked means a message is false.", why: "Every true Prophet was mocked, yet their message was true." }
      ]
    },
    {
      slug: "stronger-nations-destroyed",
      title: "Stronger nations destroyed",
      line: "Allah destroyed nations far stronger than the Quraysh.",
      facts: ["Strength did not save them", "Their story is a lesson"],
      quote: q43(8),
      source: ik(8, "Ibn Kathir says those destroyed were stronger in power than the Quraysh who rejected the Prophet ﷺ.", "they were stronger in power than these"),
      difficulty: 2,
      questions: [
        { q: "Who were destroyed, in 43:8?", a: "Men stronger than these", wrong: ["Only the weak", "Only animals", "No one"], why: "Then We destroyed men stronger in power than these." },
        { q: "What does the example mean, per Mujahid and others?", a: "Their way of life and lesson", wrong: ["Their poems", "Their buildings", "Their names"], why: "Mujahid said: The way of their life. Others said: Their lesson." },
        { q: "Which ayah does Ibn Kathir link to 43:8?", a: "40:82, travel and see", wrong: ["2:255", "1:1", "112:1"], why: "Have they not traveled through the earth and seen what was the end of those before them? (40:82)" }
      ]
    },
    {
      slug: "they-admit-allah-created",
      title: "They admit Allah created",
      line: "Ask who made the heavens and earth; they say: the Almighty.",
      facts: ["They knew Allah is the Creator", "Yet worshipped idols too"],
      quote: q43(9),
      source: ik(9, "Ibn Kathir says they admit Allah alone is the Creator, yet still worship idols alongside Him.", "they will admit that the Creator of all that is Allah Alone"),
      difficulty: 2,
      questions: [
        { q: "Who made the heavens and earth, they said in 43:9?", a: "The All-Mighty, the All-Knower", wrong: ["Their idols", "Their fathers", "Nature alone"], why: "They will surely say: The All-Mighty, the All-Knower created them." },
        { q: "What was their mistake, per Ibn Kathir?", a: "Worshipping others too", wrong: ["Denying a Creator", "Praying too much", "Fasting"], why: "Yet they still worship others, idols and false gods, alongside Him." },
        { tf: true, q: "Knowing Allah is the Creator should lead to worshipping only Him.", why: "They admit the Creator is Allah Alone, with no partner, yet worship others." }
      ]
    },
    {
      slug: "earth-like-a-bed",
      title: "The earth like a bed",
      line: "Allah made the earth a bed, with roads to find our way.",
      facts: ["Smooth, stable and firm", "Mountains keep it steady"],
      quote: q43(10),
      source: ik(10, "Ibn Kathir says the earth is smooth, stable and firm so we can travel, stand, sleep and walk on it.", "smooth, stable and firm"),
      difficulty: 1,
      questions: [
        { q: "What is the earth like, in 43:10?", a: "A bed", wrong: ["A wall", "A cave", "A ship"], why: "Who has made for you the earth like a bed." },
        { q: "Why are there roads, in 43:10?", a: "So you may find your way", wrong: ["To get lost", "For kings only", "To race"], why: "And has made for you roads therein, in order that you may find your way." },
        { q: "How is the earth, per Ibn Kathir?", a: "Smooth, stable and firm", wrong: ["Always shaking", "Soft as water", "Hot as fire"], why: "Smooth, stable and firm, so that you can travel about in it." }
      ]
    },
    {
      slug: "rain-in-due-measure",
      title: "Rain in due measure",
      line: "Rain revives dead land; so too we will be brought out.",
      facts: ["Rain sent as we need", "A sign of the Resurrection"],
      quote: q43(11),
      source: ik(11, "Ibn Kathir says reviving dry land points to how Allah will bring bodies back to life on the Day of Resurrection.", "how He will bring bodies back to life on the Day of Resurrection"),
      difficulty: 2,
      questions: [
        { q: "How does Allah send water, in 43:11?", a: "In due measure", wrong: ["All at once", "Never", "Only at sea"], why: "And Who sends down water from the sky in due measure." },
        { q: "What does dead land coming alive show, per Ibn Kathir?", a: "How we will be raised again", wrong: ["Nothing", "Only farming", "Only weather"], why: "Allah draws attention to how He will bring bodies back to life on the Day of Resurrection." },
        { tf: true, q: "We will be brought forth like the land is revived.", why: "Then We revive a dead land therewith, and even so you will be brought forth." }
      ]
    },
    {
      slug: "pairs-ships-and-cattle",
      title: "Pairs, ships and cattle",
      line: "Allah made all pairs, and gave us ships and cattle to ride.",
      facts: ["Pairs of plants and animals", "Animals made easy for us"],
      quote: q43(12),
      source: ik(12, "Ibn Kathir says the pairs include all kinds of plants, crops, fruits, flowers and animals.", "all kinds of plants, crops, fruits, flowers"),
      difficulty: 2,
      questions: [
        { q: "What did Allah create, in 43:12?", a: "All the pairs", wrong: ["Only one of each", "Only birds", "Only trees"], why: "And Who has created all the pairs." },
        { q: "What do we ride, in 43:12?", a: "Ships and cattle", wrong: ["Clouds", "Stars", "Mountains"], why: "And has appointed for you ships and cattle on which you ride." },
        { q: "What do the pairs include, per Ibn Kathir?", a: "Plants, crops, fruits, flowers, animals", wrong: ["Only stones", "Only people", "Only stars"], why: "All kinds of plants, crops, fruits, flowers, and all different kinds of animals." }
      ]
    },
    {
      slug: "the-riders-dua",
      title: "The rider's dua",
      line: "Riding, we say: Glory to Him Who made this serve us.",
      facts: ["The Prophet ﷺ said it on journeys", "We could not do it alone"],
      quote: q43(13),
      source: hadith("muslim", "1342", "Abdullah ibn Umar", "Sahih", "When setting out on a journey, the Prophet ﷺ said Allahu Akbar three times, then: Glory to Him Who subdued this for us, and we could not have done it, and to our Lord we return.", "Hallowed is He Who subdued for us this"),
      difficulty: 2,
      questions: [
        { q: "What do we say when we ride, in 43:13?", a: "Glory to Him Who subjected this to us", wrong: ["I am strong", "Hurry up", "Nothing"], why: "Glory to Him Who has subjected this to us, and we could have never had it." },
        { q: "How many times did he say Allahu Akbar first, per Muslim 1342?", a: "Three", wrong: ["One", "Seven", "Ten"], why: "He glorified Allah, saying Allahu Akbar thrice, and then said the dua." },
        { q: "What does we could never have had it mean, per Ibn Abbas?", a: "We could not do it ourselves", wrong: ["We bought it", "We made it", "We found it"], why: "Ibn Abbas and others said: We could not have done this ourselves." }
      ]
    },
    {
      slug: "to-our-lord-we-return",
      title: "To our Lord we return",
      line: "Every trip reminds us of our last journey back to Allah.",
      facts: ["The best provision is taqwa", "Earthly trips point to the Hereafter"],
      quote: q43(14),
      source: ik(14, "Ibn Kathir says mentioning earthly journeys draws attention to the journey of the Hereafter.", "mention of earthly journeys draws attention to the journey of the Hereafter"),
      difficulty: 2,
      questions: [
        { q: "To whom do we return, in 43:14?", a: "To our Lord", wrong: ["To our town", "To our tribe", "To the sea"], why: "And verily, to Our Lord we indeed are to return." },
        { q: "What do earthly trips remind us of, per Ibn Kathir?", a: "The journey of the Hereafter", wrong: ["Shopping", "Holidays", "Nothing"], why: "Mention of earthly journeys draws attention to the journey of the Hereafter." },
        { q: "What is the best provision, per 2:197?", a: "Taqwa", wrong: ["Gold", "Food", "Clothes"], why: "And take a provision for the journey, but the best provision is the Taqwa (2:197)." }
      ]
    },
    {
      slug: "a-share-for-his-servants",
      title: "A share for His servants",
      line: "They gave some of His servants a share with Him: ungrateful.",
      facts: ["They made up lies about Allah", "Man is often ungrateful"],
      quote: q43(15),
      source: ik(15, "Ibn Kathir says Allah describes the lies and fabrications of the idolaters about Him.", "Here Allah speaks of the lies and fabrications of the idolators"),
      difficulty: 2,
      questions: [
        { q: "What did they assign, in 43:15?", a: "A share with Him to some servants", wrong: ["Charity", "Prayers", "Land"], why: "Yet, they assign to some of His servants a share with Him." },
        { q: "What is man called, in 43:15?", a: "A manifest ingrate", wrong: ["Always grateful", "An angel", "A king"], why: "Verily, man is indeed a manifest ingrate." },
        { tf: true, q: "Their claims about Allah were made up.", why: "Allah speaks of the lies and fabrications of the idolators." }
      ]
    },
    {
      slug: "daughters-for-allah",
      title: "Daughters for Allah?",
      line: "They claimed daughters for Allah, and chose sons for themselves.",
      facts: ["A false claim about Allah", "Allah has no children"],
      quote: q43(16),
      source: ik(16, "Ibn Kathir says 43:16 is a denunciation of them in the strongest terms.", "This is a denunciation of them in the strongest terms"),
      difficulty: 2,
      questions: [
        { q: "What did they claim, in 43:16?", a: "Allah took daughters", wrong: ["Allah has no partner", "Allah is One", "Allah is Merciful"], why: "Or has He taken daughters out of what He has created, and He has selected for you sons?" },
        { q: "How does Ibn Kathir describe 43:16?", a: "A denunciation in the strongest terms", wrong: ["Praise", "A story", "A riddle"], why: "This is a denunciation of them in the strongest terms." },
        { tf: false, q: "Allah has children.", why: "The Creator is Unique, One, and does not have any offspring." }
      ]
    },
    {
      slug: "a-face-gone-dark",
      title: "A face gone dark",
      line: "They grieved at a daughter's birth, yet gave daughters to Allah.",
      facts: ["They disliked daughters", "Yet called angels His daughters"],
      quote: q43(17),
      source: ik(17, "Ibn Kathir asks how they could dislike a daughter so much and yet attribute daughters to Allah.", "so how can they dislike that so much and yet they attribute it to Allah"),
      difficulty: 3,
      questions: [
        { q: "How did one of them react to a daughter, in 43:17?", a: "His face became dark with grief", wrong: ["He threw a feast", "He smiled", "He gave charity"], why: "His face becomes dark, and he is filled with grief." },
        { q: "What contradiction does Ibn Kathir point out?", a: "They disliked it, yet gave it to Allah", wrong: ["They loved daughters", "They had no children", "They prayed a lot"], why: "So how can they dislike that so much and yet they attribute it to Allah?" },
        { tf: true, q: "Their claim contradicted their own feelings.", why: "They hated the news of a daughter yet claimed Allah had daughters." }
      ]
    },
    {
      slug: "their-own-measure",
      title: "By their own measure",
      line: "Allah answers the idolaters with their own way of thinking.",
      facts: ["Their claim fails by their rules", "Allah is far above it"],
      quote: q43(18),
      source: ik(18, "Ibn Kathir says 43:18 shows that, by the idolaters' own view, their claim could not be attributed to Allah.", "so how can this be attributed to Allah"),
      difficulty: 3,
      questions: [
        { q: "Whose view does 43:18 answer?", a: "The idolaters' own view", wrong: ["The angels' view", "The Prophets' view", "The scholars' view"], why: "Allah answers them with how they themselves thought." },
        { q: "What question does Ibn Kathir end 43:18 with?", a: "How can this be attributed to Allah?", wrong: ["Where is Makkah?", "Who is the king?", "When is the Hour?"], why: "So how can this be attributed to Allah?" },
        { tf: true, q: "Allah is far above every false claim.", why: "Exalted and sanctified be He far above that." }
      ]
    },
    {
      slug: "did-they-witness",
      title: "Did they witness it?",
      line: "They called angels female; did they see them being made?",
      facts: ["Angels are servants of Allah", "Their words are recorded"],
      quote: q43(19),
      source: ik(19, "Ibn Kathir explains: did they see Allah creating the angels as females? Their claim will be recorded and questioned.", "did they see Allah creating them as females"),
      difficulty: 3,
      questions: [
        { q: "What are the angels, in 43:19?", a: "Servants of the Most Gracious", wrong: ["His daughters", "His partners", "Idols"], why: "The angels who themselves are servants of the Most Gracious." },
        { q: "What does Allah ask them, in 43:19?", a: "Did they witness their creation?", wrong: ["Did they pray?", "Did they travel?", "Did they fast?"], why: "Did they witness their creation?" },
        { q: "What will happen to their testimony?", a: "Recorded, and they will be questioned", wrong: ["Forgotten", "Rewarded", "Erased"], why: "Their testimony will be recorded, and they will be questioned." }
      ]
    },
    {
      slug: "no-proof-for-idols",
      title: "No proof for idols",
      line: "They said: Had Allah willed, we would not worship them. A lie.",
      facts: ["They used decree as an excuse", "They had no knowledge"],
      quote: q43(20),
      source: ik(20, "Ibn Kathir says they worshipped them with no proof, evidence or permission from Allah.", "They worshipped them with no proof, evidence or permission from Allah"),
      difficulty: 3,
      questions: [
        { q: "What excuse did they give, in 43:20?", a: "Had Allah willed, we would not worship them", wrong: ["We were busy", "We forgot", "We were young"], why: "If it had been the will of the Most Gracious, we should not have worshipped them." },
        { q: "What did they have, in 43:20?", a: "No knowledge of that", wrong: ["Clear proof", "A Book", "A sign"], why: "They have no knowledge whatsoever of that. They do nothing but lie." },
        { q: "What was their worship based on, per Ibn Kathir?", a: "No proof or permission", wrong: ["A revealed Book", "A Prophet", "A miracle"], why: "They worshipped them with no proof, evidence or permission from Allah." }
      ]
    },
    {
      slug: "no-book-behind-them",
      title: "No Book behind them",
      line: "Did Allah give them an earlier Book to hold on to? No.",
      facts: ["No revealed proof for idols", "Only guesses"],
      quote: q43(21),
      source: ik(21, "Ibn Kathir says Allah condemns them for worshipping others with no evidence or proof.", "Allah condemns the idolators for worshipping others instead of Allah with no evidence or proof"),
      difficulty: 3,
      questions: [
        { q: "What does 43:21 ask?", a: "Did We give them a Book before this?", wrong: ["Did they build?", "Did they travel?", "Did they win?"], why: "Or have We given them any Book before this to which they are holding fast?" },
        { q: "Did they have a Book for idols, per Ibn Kathir?", a: "No, they had no proof", wrong: ["Yes, a big one", "Yes, from Musa", "Yes, from Isa"], why: "Allah condemns the idolators for worshipping others with no evidence or proof." },
        { tf: true, q: "Worship must be based on proof from Allah.", why: "They worshipped others instead of Allah with no evidence or proof." }
      ]
    },
    {
      slug: "we-found-our-fathers",
      title: "We found our fathers",
      line: "Their only reason: we found our fathers on this way.",
      facts: ["Blind copying", "No proof at all"],
      quote: q43(22),
      source: ik(22, "Ibn Kathir says they had no grounds except imitating their fathers and forefathers.", "they are imitating their fathers and forefathers"),
      difficulty: 3,
      questions: [
        { q: "What did they say, in 43:22?", a: "We found our fathers on a way", wrong: ["We found a Book", "We saw an angel", "We had a dream"], why: "We found our fathers following a certain way and religion." },
        { q: "What was their only basis, per Ibn Kathir?", a: "Imitating their forefathers", wrong: ["A Prophet", "A revealed Book", "Clear proof"], why: "They have no grounds apart from the fact that they are imitating their fathers and forefathers." },
        { tf: false, q: "Copying our fathers is proof enough in religion.", why: "Ibn Kathir: this is their claim with no evidence." }
      ]
    }
  ]
};

/** Ayahs 23 to 45: Ibrahim's lasting word, wealth is no sign of Allah's love, the companion of the heedless, and holding fast to the Quran. */
const ZUKHRUF_TWO: DeepUnit = {
  key: "zukhruf2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-43",
  name: "Az-Zukhruf, ayahs 23 to 45",
  kind: "skill",
  lessonType: "surah",
  surahName: "Az-Zukhruf",
  lessons: [
    {
      slug: "the-same-old-excuse",
      title: "The same old excuse",
      line: "The rich in every town said: we follow our fathers.",
      facts: ["Past nations said the same", "Their hearts were alike"],
      quote: q43(23),
      source: ik(23, "Ibn Kathir says what the Quraysh said was already said by nations before them who rejected the Messengers.", "what these people say was already said by those who were like them"),
      difficulty: 1,
      questions: [
        { q: "Who said we follow our fathers, in 43:23?", a: "The luxurious ones of every town", wrong: ["The poor only", "The Prophets", "The angels"], why: "The luxurious ones among them said: We found our fathers following a certain way." },
        { q: "Was this excuse new, per Ibn Kathir?", a: "No, past nations said it too", wrong: ["Yes, brand new", "Only once", "Only in Makkah"], why: "What these people say was already said by those who were like them." },
        { tf: true, q: "Every warner before faced this same excuse.", why: "We sent not a warner before you to any town but the luxurious ones said this." }
      ]
    },
    {
      slug: "even-with-better-guidance",
      title: "Even with better guidance?",
      line: "Even if I bring you better guidance? They said: we disbelieve.",
      facts: ["Pride blocked the truth", "Not lack of proof"],
      quote: q43(24),
      source: ik(24, "Ibn Kathir says even if convinced, they would not follow, because of their evil intentions and arrogance towards the truth.", "because of their evil intentions and their arrogance towards the truth"),
      difficulty: 2,
      questions: [
        { q: "What did the warner ask, in 43:24?", a: "Even if I bring better guidance?", wrong: ["Will you pay me?", "Where is your king?", "Who is your father?"], why: "Even if I bring you better guidance than that which you found your fathers following?" },
        { q: "Why would they still refuse, per Ibn Kathir?", a: "Arrogance towards the truth", wrong: ["No proof", "Too busy", "Too young"], why: "Because of their evil intentions and their arrogance towards the truth." },
        { tf: false, q: "They refused because the guidance was weak.", why: "Even if they were convinced of the truth, they would not follow it." }
      ]
    },
    {
      slug: "see-the-end-of-deniers",
      title: "See the end of deniers",
      line: "Allah punished the deniers; see how their story ended.",
      facts: ["Deniers destroyed", "Believers saved"],
      quote: q43(25),
      source: ik(25, "Ibn Kathir says see how the deniers were destroyed and how Allah saved the believers.", "how they were destroyed and how Allah saved the believers"),
      difficulty: 2,
      questions: [
        { q: "What does 43:25 tell us to see?", a: "The end of those who denied", wrong: ["The stars", "The markets", "The palaces"], why: "Then see what was the end of those who denied." },
        { q: "Whom did Allah save, per Ibn Kathir?", a: "The believers", wrong: ["The proud", "The rich", "No one"], why: "How they were destroyed and how Allah saved the believers." },
        { tf: true, q: "The stories of past nations are lessons for us.", why: "See what became of them, how they were destroyed and how Allah saved the believers." }
      ]
    },
    {
      slug: "ibrahim-stands-apart",
      title: "Ibrahim stands apart",
      line: "Ibrahim told his father and people: I am free of your idols.",
      facts: ["Leader of the monotheists", "Father of later Prophets"],
      quote: q43(26),
      source: ik(26, "Ibn Kathir calls Ibrahim the leader of the monotheists and the father of all subsequent Prophets.", "the leader of the monotheists and the father of all subsequent Prophets"),
      difficulty: 2,
      questions: [
        { q: "What did Ibrahim say, in 43:26?", a: "I am innocent of what you worship", wrong: ["I will join you", "I am your king", "I am tired"], why: "Verily, I am innocent of what you worship." },
        { q: "What does Ibn Kathir call Ibrahim?", a: "Leader of the monotheists", wrong: ["A king of Egypt", "A poet", "A merchant"], why: "The leader of the monotheists and the father of all subsequent Prophets." },
        { q: "Who claimed his religion, per Ibn Kathir?", a: "The Quraysh", wrong: ["The Romans", "The Persians", "No one"], why: "From whom Quraysh were descended and claimed to have taken their religion." }
      ]
    },
    {
      slug: "he-will-guide-me",
      title: "He will guide me",
      line: "Except Him Who created me; He will surely guide me.",
      facts: ["Worship only the Creator", "Trust Him for guidance"],
      quote: q43(27),
      source: ik(27, "Ibn Kathir quotes Ibrahim: I am innocent of what you worship, except Him Who created me.", "except Him Who created me"),
      difficulty: 2,
      questions: [
        { q: "Whom did Ibrahim keep worshipping, in 43:27?", a: "Him Who created me", wrong: ["The stars", "The idols", "The king"], why: "Except Him Who created me; and verily, He will guide me." },
        { q: "What did Ibrahim trust Allah to do?", a: "Guide him", wrong: ["Make him rich", "Make him king", "Make him famous"], why: "And verily, He will guide me." },
        { tf: true, q: "Ibrahim disowned idol worship, even his father's.", why: "He disowned his father's and his people's worship of idols." }
      ]
    },
    {
      slug: "a-lasting-word",
      title: "A lasting word",
      line: "Ibrahim left La ilaha illallah as a lasting word in his family.",
      facts: ["The word is La ilaha illallah", "Some still say it"],
      quote: q43(28),
      source: ik(28, "Ikrimah, Mujahid and others said the lasting word is La ilaha illallah, still said by some of his offspring.", "This means, La ilaha illallah, and there are still those among his offspring who say it"),
      difficulty: 2,
      questions: [
        { q: "What is the lasting word, per Mujahid and others?", a: "La ilaha illallah", wrong: ["A poem", "A name", "A song"], why: "This means, La ilaha illallah, and there are still those among his offspring who say it." },
        { q: "Why did he leave it, in 43:28?", a: "That they may turn back", wrong: ["To be famous", "To get rich", "To rule"], why: "And he made it a word lasting among his offspring, that they may turn back." },
        { q: "What did Ibn Zayd call it?", a: "The word of Islam", wrong: ["The word of kings", "The word of poets", "A secret word"], why: "Ibn Zayd said: The word of Islam." }
      ]
    },
    {
      slug: "a-messenger-making-clear",
      title: "A Messenger making clear",
      line: "Allah let them enjoy life until a clear Messenger came.",
      facts: ["His message was clear", "His warning was clear"],
      quote: q43(29),
      source: ik(29, "Ibn Kathir says the Messenger ﷺ came with a message that was clear and a warning that was clear.", "his message is clear and his warning is clear"),
      difficulty: 2,
      questions: [
        { q: "What came to them, in 43:29?", a: "The truth and a clear Messenger", wrong: ["A storm", "A king", "A famine"], why: "Till there came to them the truth, and a Messenger making things clear." },
        { q: "How was his message, per Ibn Kathir?", a: "Clear", wrong: ["Hidden", "Confusing", "Short"], why: "His message is clear and his warning is clear." },
        { tf: true, q: "They lived long in misguidance before the truth came.", why: "They lived a long life in their misguidance." }
      ]
    },
    {
      slug: "they-called-it-magic",
      title: "They called it magic",
      line: "When the truth came, they said: this is magic.",
      facts: ["Arrogance and envy", "They pushed him away"],
      quote: q43(30),
      source: ik(30, "Ibn Kathir says they were arrogant and stubborn, and pushed him away out of disbelief, envy and transgression.", "they were arrogant and stubborn"),
      difficulty: 2,
      questions: [
        { q: "What did they call the truth, in 43:30?", a: "Magic", wrong: ["Poetry", "Medicine", "History"], why: "They said: This is magic, and we disbelieve therein." },
        { q: "Why did they push him away, per Ibn Kathir?", a: "Disbelief, envy and transgression", wrong: ["He was unkind", "He was rich", "He was silent"], why: "They pushed him away out of disbelief, envy and transgression." },
        { tf: false, q: "They rejected it because it was unclear.", why: "They were arrogant and stubborn, not lacking clear proof." }
      ]
    },
    {
      slug: "a-great-man-of-two-towns",
      title: "A great man of two towns?",
      line: "They asked: why not a great man of the two towns?",
      facts: ["The two towns: Makkah and Taif", "Allah chooses His Messenger"],
      quote: q43(31),
      source: ik(31, "Ibn Kathir says they wanted the Quran revealed to some man great and prominent in their eyes, from Makkah or Taif.", "some man who was great and prominent in their eyes"),
      difficulty: 3,
      questions: [
        { q: "What did they ask, in 43:31?", a: "Why not a great man of the two towns?", wrong: ["Why Arabic?", "Why at night?", "Why so long?"], why: "Why is not this Quran sent down to some great man of the two towns?" },
        { q: "Which are the two towns, per Ibn Abbas?", a: "Makkah and Taif", wrong: ["Madinah and Khaybar", "Egypt and Syria", "Yemen and Oman"], why: "The two towns are Makkah and Taif, per Ibn Abbas and others." },
        { q: "Who decides where the Message goes, per Ibn Kathir?", a: "Allah", wrong: ["The chiefs", "The rich", "The crowd"], why: "The matter has nothing to do with them; it is for Allah to decide." }
      ]
    },
    {
      slug: "allah-divides-livelihood",
      title: "Allah divides livelihood",
      line: "Allah divides livelihood; His mercy beats all they gather.",
      facts: ["People need each other", "Mercy is better than wealth"],
      quote: q43(32),
      source: ik(32, "Ibn Kathir says Allah's mercy towards His creation is better for them than the wealth of this world.", "the mercy of Allah towards His creation is better for them than the wealth"),
      difficulty: 3,
      questions: [
        { q: "Who portions out livelihood, in 43:32?", a: "Allah", wrong: ["The kings", "The traders", "Chance"], why: "It is We Who portion out between them their livelihood in this world." },
        { q: "Why are some raised above others, per As-Suddi?", a: "So people need one another", wrong: ["To be proud", "To fight", "By luck"], why: "Some employ others in their work, because one needs the other." },
        { q: "What is better than what they amass, in 43:32?", a: "The mercy of your Lord", wrong: ["More gold", "More land", "More fame"], why: "But the mercy of your Lord is better than what they amass." }
      ]
    },
    {
      slug: "silver-roofs",
      title: "Silver roofs",
      line: "Wealth is no sign of love; deniers could have silver roofs.",
      facts: ["Wealth is a test", "Not a sign of being loved"],
      quote: q43(33),
      source: ik(33, "Ibn Kathir says many would think giving wealth is a sign that Allah loves a person, and would choose disbelief for wealth.", "many ignorant people would think that Our giving them wealth was a sign that We love"),
      difficulty: 3,
      questions: [
        { q: "What could Allah give deniers, in 43:33?", a: "Silver roofs and stairs", wrong: ["Nothing at all", "Only tents", "Only caves"], why: "We would have provided for those who disbelieve silver roofs for their houses, and elevators." },
        { q: "Why did He not, per Ibn Abbas and others?", a: "People would think wealth means Allah loves them", wrong: ["Silver ran out", "It was too heavy", "No reason"], why: "Many ignorant people would think that Our giving them wealth was a sign that We love them." },
        { tf: false, q: "Being rich proves Allah loves a person.", why: "Wealth is not a sign of Divine Pleasure, says Ibn Kathir." }
      ]
    },
    {
      slug: "doors-and-thrones",
      title: "Doors and thrones",
      line: "Even their doors and thrones could have been made of silver.",
      facts: ["All of silver", "Still worth little to Allah"],
      quote: q43(34),
      source: ik(34, "Ibn Kathir says their doors and the thrones they recline on would all be made of silver.", "all of that would be made of silver"),
      difficulty: 2,
      questions: [
        { q: "What else is named, in 43:34?", a: "Doors and thrones to recline on", wrong: ["Swords", "Horses", "Books"], why: "And for their houses, doors, and thrones on which they could recline." },
        { q: "What would they be made of, per Ibn Kathir?", a: "Silver", wrong: ["Wood", "Clay", "Stone"], why: "All of that would be made of silver." },
        { tf: true, q: "Fancy things of this world are small before Allah.", why: "All that belongs to this transient world which is insignificant before Allah." }
      ]
    },
    {
      slug: "gold-is-not-the-goal",
      title: "Gold is not the goal",
      line: "Gold is only for this world; the Hereafter is for the pious.",
      facts: ["Zukhruf means gold", "Gold vessels are for the Hereafter"],
      quote: q43(35),
      source: hadith("bukhari", "5426", "Hudhaifah", "Sahih", "The Prophet ﷺ said: do not drink or eat from gold and silver vessels, for they are for the unbelievers in this world and for us in the Hereafter.", "for such things are for the unbelievers in this worldly life and for us in the Hereafter"),
      difficulty: 3,
      questions: [
        { q: "What would all this be, in 43:35?", a: "Only enjoyment of this world", wrong: ["Forever ours", "A reward in Paradise", "Proof of faith"], why: "Yet all this would have been nothing but an enjoyment of this world." },
        { q: "For whom is the Hereafter, in 43:35?", a: "Those who have taqwa", wrong: ["The rich", "The famous", "Everyone"], why: "And the Hereafter with your Lord is for those who have Taqwa." },
        { q: "What did the Prophet ﷺ forbid, per Bukhari 5426?", a: "Eating from gold and silver vessels", wrong: ["Eating dates", "Drinking milk", "Eating bread"], why: "Do not drink in silver or golden vessels, and do not eat in plates of such metals." }
      ]
    },
    {
      slug: "the-hereafter-for-the-pious",
      title: "The Hereafter for the pious",
      line: "The Hereafter with Allah is only for those who have taqwa.",
      facts: ["No one else shares it", "Umar wept at the simple mat"],
      quote: q43(35),
      source: ik(35, "Ibn Kathir says the Hereafter is exclusively for those with taqwa, and no one else will share it with them.", "it is exclusively for them, and no one else will share it with them"),
      difficulty: 3,
      questions: [
        { q: "For whom is the Hereafter, per Ibn Kathir?", a: "Only for those with taqwa", wrong: ["For everyone equally", "For the rich", "For kings"], why: "It is exclusively for them, and no one else will share it with them." },
        { q: "What made Umar weep, per Ibn Kathir?", a: "The Prophet ﷺ resting on a rough mat", wrong: ["A storm", "A lost camel", "A sad poem"], why: "He saw him resting on a rough mat which had left marks on his side." },
        { q: "What did the Prophet ﷺ tell Umar?", a: "This world is for them, the Hereafter for us", wrong: ["Buy a better mat", "Go home", "Be silent"], why: "Does it not please you that this world is for them and the Hereafter is for us?" }
      ]
    },
    {
      slug: "a-bad-companion",
      title: "A bad companion",
      line: "Ignore Allah's remembrance, and Shaytan becomes a companion.",
      facts: ["Everyone has a jinn companion", "Allah helped the Prophet ﷺ against his"],
      quote: q43(36),
      source: hadith("muslim", "2814", "Abdullah ibn Mas'ud", "Sahih", "The Prophet ﷺ said every one of us has a companion from the jinn. Asked about himself, he said Allah helped him, so he is safe and it commands him only good.", "Allah helps me against him and so I am safe from his hand"),
      difficulty: 3,
      questions: [
        { q: "What happens to one who turns from Allah's remembrance, in 43:36?", a: "A Shaytan becomes his companion", wrong: ["He gets rich", "He sleeps well", "Nothing"], why: "We appoint for him Shaytan to be a Qarin, a companion to him." },
        { q: "What does Ya'shu mean, per Ibn Kathir?", a: "Weakness of insight", wrong: ["Strong sight", "Fast walking", "Loud voice"], why: "Al-Asha refers to weakness of vision; meant is weakness of insight." },
        { q: "What did the Prophet ﷺ say about his companion, per Muslim 2814?", a: "Allah helps me and I am safe", wrong: ["I have none", "It is my friend", "It is an angel"], why: "Allah helps me against him and so I am safe from his hand." }
      ]
    },
    {
      slug: "they-think-they-are-guided",
      title: "They think they are guided",
      line: "These companions block the path, yet the misled feel guided.",
      facts: ["Shaytan leads astray", "The misled feel sure"],
      quote: q43(37),
      source: ik(37, "Ibn Kathir says for one who neglects guidance, Allah sends a Shaytan to lead him astray.", "We send to him a Shaytan to lead him astray"),
      difficulty: 3,
      questions: [
        { q: "What do the companions do, in 43:37?", a: "Hinder them from the path", wrong: ["Guide them", "Feed them", "Protect them"], why: "And verily, they hinder them from the path." },
        { q: "What do the misled think, in 43:37?", a: "That they are guided", wrong: ["That they are lost", "That they are sick", "Nothing"], why: "But they think that they are guided aright." },
        { tf: true, q: "Feeling sure is not the same as being right.", why: "They hinder them from the path, but they think that they are guided aright." }
      ]
    },
    {
      slug: "distance-of-two-easts",
      title: "The distance of two easts",
      line: "That Day he wishes his companion were far as east from west.",
      facts: ["Regret too late", "A worst companion"],
      quote: q43(38),
      source: ik(38, "Ibn Kathir says on the Day of Resurrection he will complain about the Shaytan who was appointed to accompany him.", "he will complain about the Shaytan who was appointed to accompany him"),
      difficulty: 3,
      questions: [
        { q: "What does he wish, in 43:38?", a: "The distance of two easts between them", wrong: ["To stay together", "To go home", "To sleep"], why: "Would that between me and you were the distance of the two easts." },
        { q: "What does he call the companion, in 43:38?", a: "A worst companion", wrong: ["A best friend", "A helper", "A guide"], why: "A worst companion indeed!" },
        { q: "What will he do on that Day, per Ibn Kathir?", a: "Complain about the Shaytan", wrong: ["Thank him", "Follow him", "Forget him"], why: "He will complain about the Shaytan who was appointed to accompany him." }
      ]
    },
    {
      slug: "sharing-brings-no-help",
      title: "Sharing brings no help",
      line: "Being together in punishment will not help them at all.",
      facts: ["No comfort in company", "Each bears his own"],
      quote: q43(39),
      source: ik(39, "Ibn Kathir says being together will not help them in the slightest.", "will not help you in the slightest"),
      difficulty: 3,
      questions: [
        { q: "Will sharing the punishment help them, in 43:39?", a: "No, it will not profit them", wrong: ["Yes, a lot", "Only a little", "Only at night"], why: "It will profit you not this Day as you did wrong." },
        { q: "What does Ibn Kathir say about being together?", a: "It will not help in the slightest", wrong: ["It makes it easy", "It ends it", "It cancels it"], why: "Your being together will not help you in the slightest." },
        { tf: true, q: "Bad friends cannot save us on that Day.", why: "It will profit you not this Day, and you will be sharers in the punishment." }
      ]
    },
    {
      slug: "guidance-is-from-allah",
      title: "Guidance is from Allah",
      line: "You cannot make the deaf hear; guidance is in Allah's hands.",
      facts: ["The Prophet ﷺ conveyed", "Allah guides whom He wills"],
      quote: q43(40),
      source: ik(40, "Ibn Kathir says the Prophet's ﷺ duty was only to convey; Allah guides whom He wills, wisely and justly.", "All you have to do is convey the Message"),
      difficulty: 3,
      questions: [
        { q: "What does 43:40 ask?", a: "Can you make the deaf hear?", wrong: ["Can you fly?", "Can you count stars?", "Can you build?"], why: "Can you make the deaf to hear, or can you guide the blind?" },
        { q: "What was the Prophet's ﷺ task, per Ibn Kathir?", a: "Convey the Message", wrong: ["Force belief", "Punish them", "Rule them"], why: "All you have to do is convey the Message, but you do not have to guide them." },
        { tf: true, q: "Allah is Wise and Just in whom He guides.", why: "Allah guides whomsoever He wills, and He is Wise and Just in doing so." }
      ]
    },
    {
      slug: "even-if-we-take-you",
      title: "Even if We take you",
      line: "Even if the Prophet ﷺ passed away, Allah would deal with them.",
      facts: ["Allah's promise is sure", "Not tied to one lifetime"],
      quote: q43(41),
      source: ik(41, "Ibn Kathir says Allah would surely punish them, even if the Prophet ﷺ passed away first.", "even if you pass away"),
      difficulty: 3,
      questions: [
        { q: "What does 43:41 promise?", a: "Allah will deal with them, even after", wrong: ["They will win", "Nothing happens", "They will rule"], why: "And even if We take you away, We shall indeed take vengeance on them." },
        { q: "Does it depend on the Prophet ﷺ living, per Ibn Kathir?", a: "No, even if he passed away", wrong: ["Yes, only if alive", "Only in Makkah", "Only at war"], why: "We will inevitably punish them, even if you pass away." },
        { tf: true, q: "Allah's promise does not depend on anyone's lifetime.", why: "We will inevitably wreak vengeance upon them, even if you pass away." }
      ]
    },
    {
      slug: "allah-is-able-to-do-both",
      title: "Able to do both",
      line: "Or Allah may show you their end; He has full power.",
      facts: ["He showed the Prophet ﷺ victory", "Before he passed away"],
      quote: q43(42),
      source: ik(42, "Ibn Kathir says Allah is able to do both, and He showed His Messenger power over his enemies before his death.", "We are able to do both"),
      difficulty: 3,
      questions: [
        { q: "What may Allah show, in 43:42?", a: "What He threatened them with", wrong: ["A new city", "A treasure", "A dream"], why: "Or if We show you that wherewith We threaten them, then verily, We have perfect command over them." },
        { q: "What does Allah say He can do, per Ibn Kathir?", a: "Both", wrong: ["Neither", "Only one", "Only wait"], why: "We are able to do both." },
        { tf: true, q: "Allah has perfect command over all people.", why: "Then verily, We have perfect command over them." }
      ]
    },
    {
      slug: "hold-fast-to-it",
      title: "Hold fast to it",
      line: "Hold fast to what is revealed; you are on the straight path.",
      facts: ["The Quran is truth", "Leads to Paradise"],
      quote: q43(43),
      source: ik(43, "Ibn Kathir says hold fast to the Quran, for it is truth and leads to the straight path to the Gardens of Delight.", "for it is truth and what it leads to is truth"),
      difficulty: 2,
      questions: [
        { q: "What are we told, in 43:43?", a: "Hold fast to what is revealed", wrong: ["Let it go", "Change it", "Hide it"], why: "So hold you fast to that which is revealed to you." },
        { q: "Where is the Prophet ﷺ, in 43:43?", a: "On the straight path", wrong: ["Lost", "In doubt", "Far away"], why: "Verily, you are on the straight path." },
        { q: "Where does the Quran lead, per Ibn Kathir?", a: "To the Gardens of Delight", wrong: ["To wealth", "To fame", "To power"], why: "The straight path that leads to Gardens of Delight and eternal goodness." }
      ]
    },
    {
      slug: "an-honor-for-you",
      title: "An honor for you",
      line: "The Quran honors you and your people; you will be asked.",
      facts: ["Revealed in their language", "We will be asked how we acted"],
      quote: q43(44),
      source: ik(44, "Ibn Abbas, Mujahid and others said the Dhikr means it is an honor for you and your people.", "it is an honor for you and your people"),
      difficulty: 3,
      questions: [
        { q: "What does Dhikr mean in 43:44, per Ibn Abbas?", a: "An honor", wrong: ["A burden", "A secret", "A game"], why: "It is an honor for you and your people." },
        { q: "What will we be questioned about, per Ibn Kathir?", a: "The Quran and how we acted on it", wrong: ["Our clothes", "Our houses", "Our names"], why: "About this Quran, and how you acted upon it and what your response to it was." },
        { tf: true, q: "Those who know the Quran best should follow it most.", why: "They have the best understanding of it and hence are obliged to be the most steadfast." }
      ]
    },
    {
      slug: "ask-the-messengers",
      title: "Ask the Messengers",
      line: "Did Allah ever allow other gods? Every Messenger said no.",
      facts: ["All called to worship Allah alone", "All forbade idols"],
      quote: q43(45),
      source: ik(45, "Ibn Kathir says all the Messengers called their people to worship Allah alone and forbade idols.", "all the Messengers called their people to the same"),
      difficulty: 3,
      questions: [
        { q: "What question is in 43:45?", a: "Did We appoint gods besides the Most Gracious?", wrong: ["Who is the king?", "Where is the sea?", "When is Eid?"], why: "Did We ever appoint gods to be worshipped besides the Most Gracious?" },
        { q: "What did all Messengers call to, per Ibn Kathir?", a: "Worship of Allah alone", wrong: ["Many gods", "Ancestors", "Stars"], why: "All the Messengers called their people to the worship of Allah Alone." },
        { q: "Which ayah does Ibn Kathir link to 43:45?", a: "16:36, worship Allah and avoid false gods", wrong: ["2:255", "1:1", "114:1"], why: "We have sent among every Ummah a Messenger: Worship Allah, and avoid all false deities (16:36)." }
      ]
    }
  ]
};

/** Ayahs 46 to 65: Musa before Firawn, Firawn's boasting and end, and the true place of Isa son of Maryam. */
const ZUKHRUF_THREE: DeepUnit = {
  key: "zukhruf3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-43",
  name: "Az-Zukhruf, ayahs 46 to 65",
  kind: "skill",
  lessonType: "surah",
  surahName: "Az-Zukhruf",
  lessons: [
    {
      slug: "musa-sent-to-firawn",
      title: "Musa sent to Firawn",
      line: "Musa told Firawn: I am a Messenger of the Lord of all.",
      facts: ["He called to Allah alone", "He came with mighty signs"],
      quote: q43(46),
      source: ik(46, "Ibn Kathir says Allah sent Musa to call Firawn and his chiefs to worship Allah alone, with mighty signs.", "Allah sent him to call them to worship Allah alone"),
      difficulty: 1,
      questions: [
        { q: "What did Musa say, in 43:46?", a: "I am a Messenger of the Lord of all", wrong: ["I am a king", "I am a magician", "I am a poet"], why: "Verily, I am a Messenger of the Lord of all that exists." },
        { q: "To what did Musa call them, per Ibn Kathir?", a: "To worship Allah alone", wrong: ["To leave Egypt only", "To build pyramids", "To pay tax"], why: "Allah sent him to call them to worship Allah alone, with no partner." },
        { q: "Which signs did Musa bring, per Ibn Kathir?", a: "His hand and his staff", wrong: ["A sword and shield", "A crown and ring", "A ship and sail"], why: "He sent him with mighty signs, such as his hand and his staff." }
      ]
    },
    {
      slug: "they-laughed-at-the-signs",
      title: "They laughed at the signs",
      line: "When Musa showed the signs, they laughed at them.",
      facts: ["Arrogant and stubborn", "They mocked the messenger"],
      quote: q43(47),
      source: ik(47, "Ibn Kathir says they rejected his message, made fun of it, and laughed at the one who brought it.", "laughed at the one who had brought it"),
      difficulty: 1,
      questions: [
        { q: "How did they react to the signs, in 43:47?", a: "They laughed at them", wrong: ["They wept", "They believed", "They bowed"], why: "But when he came to them with Our Ayat, behold, they laughed at them." },
        { q: "What did they remain, per Ibn Kathir?", a: "Arrogant and stubborn", wrong: ["Humble", "Grateful", "Thankful"], why: "Yet despite all that they remained arrogant and stubbornly refused to follow him." },
        { tf: true, q: "Mocking the truth is a sign of pride.", why: "They remained arrogant and laughed at the one who had brought it." }
      ]
    },
    {
      slug: "each-sign-greater",
      title: "Each sign greater",
      line: "Every sign was greater than the one before it.",
      facts: ["Flood, locusts, frogs and blood", "Still they did not change"],
      quote: q43(48),
      source: ik(48, "Ibn Kathir says each sign was greater than the last, but despite that they would not give up their sin.", "but despite that they would not give up their sin"),
      difficulty: 2,
      questions: [
        { q: "How was each sign, in 43:48?", a: "Greater than the one before", wrong: ["Smaller", "The same", "Hidden"], why: "And not an Ayah We showed them but it was greater than its fellow preceding it." },
        { q: "Did they change, per Ibn Kathir?", a: "No, they kept their sin", wrong: ["Yes, at once", "Yes, slowly", "Only Firawn"], why: "But despite that they would not give up their sin, misguidance, ignorance and confusion." },
        { q: "Why were they seized with torment, in 43:48?", a: "In order that they might turn", wrong: ["For fun", "By chance", "For no reason"], why: "And We seized them with torment, in order that they might turn." }
      ]
    },
    {
      slug: "o-sorcerer",
      title: "O sorcerer",
      line: "They called Musa a sorcerer, a learned one, and begged his dua.",
      facts: ["Sorcerer meant expert then", "They promised to believe"],
      quote: q43(49),
      source: ik(49, "Ibn Jarir said O sorcerer meant expert or knowledgeable one, since in their time it was a title of respect.", "expert or knowledgeable one"),
      difficulty: 2,
      questions: [
        { q: "What did they ask Musa, in 43:49?", a: "To call on his Lord for them", wrong: ["To leave Egypt", "To be quiet", "To fight"], why: "O you sorcerer! Invoke your Lord for us." },
        { q: "What did sorcerer mean to them, per Ibn Jarir?", a: "Expert or knowledgeable one", wrong: ["Liar", "Thief", "Stranger"], why: "Meaning expert or knowledgeable one; this was the view of Ibn Jarir." },
        { q: "What did they promise, in 43:49?", a: "We shall guide ourselves", wrong: ["We will leave", "We will fight", "We will hide"], why: "Verily, We shall guide ourselves." }
      ]
    },
    {
      slug: "they-broke-their-word",
      title: "They broke their word",
      line: "When the torment was lifted, they broke their promise.",
      facts: ["Every time they went back", "Like 7:133-135"],
      quote: q43(50),
      source: ik(50, "Ibn Kathir says on each occasion they promised to believe if the torment was lifted, and each time they went back on their word.", "on each occasion they went back on their word"),
      difficulty: 2,
      questions: [
        { q: "What did they do when the torment was removed, in 43:50?", a: "Broke their covenant", wrong: ["Believed", "Thanked Musa", "Left Egypt"], why: "But when We removed the torment from them, behold, they broke their covenant." },
        { q: "How often did they break it, per Ibn Kathir?", a: "On each occasion", wrong: ["Never", "Once only", "Twice"], why: "On each occasion they went back on their word." },
        { tf: true, q: "Keeping promises to Allah matters.", why: "They broke their covenant every time the torment was removed." }
      ]
    },
    {
      slug: "firawn-boasts",
      title: "Firawn boasts",
      line: "Firawn boasted: Egypt is mine, and these rivers flow beneath me.",
      facts: ["Gardens and flowing rivers", "Pride in his power"],
      quote: q43(51),
      source: ik(51, "Qatadah said they had gardens and rivers of flowing water.", "They had gardens and rivers of flowing water"),
      difficulty: 2,
      questions: [
        { q: "What did Firawn claim, in 43:51?", a: "The dominion of Egypt", wrong: ["Prophethood", "Humility", "Poverty"], why: "O my people! Is not mine the dominion of Egypt?" },
        { q: "What flowed beneath him, in 43:51?", a: "Rivers", wrong: ["Gold", "Milk", "Fire"], why: "And these rivers flowing underneath me." },
        { q: "What did he imply about Musa, per Ibn Kathir?", a: "That Musa was poor and weak", wrong: ["That Musa was rich", "That Musa was king", "Nothing"], why: "Implying that Musa and his followers were poor and weak." }
      ]
    },
    {
      slug: "who-is-truly-better",
      title: "Who is truly better?",
      line: "Firawn mocked Musa's speech, but Musa was the noble one.",
      facts: ["Firawn lied about Musa", "Musa was truthful and upright"],
      quote: q43(52),
      source: ik(52, "Ibn Kathir says Firawn lied; it was Musa who was noble, truthful, righteous and upright.", "it is Musa who was noble, truthful, righteous and upright"),
      difficulty: 2,
      questions: [
        { q: "What did Firawn claim, in 43:52?", a: "That he was better than Musa", wrong: ["That Musa was better", "That he was a Prophet", "That he was poor"], why: "Am I not better than this one who is despicable?" },
        { q: "Who was truly noble, per Ibn Kathir?", a: "Musa", wrong: ["Firawn", "Haman", "Qarun"], why: "It is Musa who was noble, truthful, righteous and upright." },
        { q: "What did Musa ask Allah, per 20:36?", a: "To loosen his tongue", wrong: ["For a palace", "For gold", "For an army"], why: "He asked Allah to loosen the knot from his tongue, and Allah said: You are granted your request." }
      ]
    },
    {
      slug: "golden-bracelets",
      title: "Golden bracelets?",
      line: "Firawn asked: why no gold bracelets or angels with him?",
      facts: ["He judged by looks only", "Truth is not in gold"],
      quote: q43(53),
      source: ik(53, "Ibn Kathir says Firawn looked only at outward appearances and missed the true inner matters.", "He looked only at outward appearances"),
      difficulty: 2,
      questions: [
        { q: "What did Firawn ask for, in 43:53?", a: "Golden bracelets or angels", wrong: ["A book", "A ship", "Rain"], why: "Why then are not golden bracelets bestowed on him, or angels sent along with him?" },
        { q: "What was Firawn's mistake, per Ibn Kathir?", a: "Judging by outward looks", wrong: ["Being too kind", "Praying too much", "Giving charity"], why: "He looked only at outward appearances." },
        { tf: false, q: "Gold and riches prove someone is right.", why: "He looked only at outward appearances and did not understand the true inner matters." }
      ]
    },
    {
      slug: "he-fooled-his-people",
      title: "He fooled his people",
      line: "Firawn fooled his people, and they obeyed him.",
      facts: ["He confused them", "They were rebellious"],
      quote: q43(54),
      source: ik(54, "Ibn Kathir says Firawn confused them and invited them to misguidance, and they responded.", "he confused them and invited them to misguidance"),
      difficulty: 2,
      questions: [
        { q: "What did Firawn do to his people, in 43:54?", a: "Fooled them", wrong: ["Freed them", "Taught them", "Fed them"], why: "Thus he fooled his people, and they obeyed him." },
        { q: "How did he fool them, per Ibn Kathir?", a: "He confused and misguided them", wrong: ["With gifts", "With prayers", "With songs"], why: "He confused them and invited them to misguidance, and they responded to him." },
        { tf: true, q: "Following a misleader is still a choice.", why: "They obeyed him; verily, they were ever a people who were rebellious." }
      ]
    },
    {
      slug: "drowned-them-all",
      title: "Drowned them all",
      line: "When they provoked Allah's anger, He drowned them all.",
      facts: ["Punishment comes with heedlessness", "Allah is never unjust"],
      quote: q43(55),
      source: ik(55, "Ibn Abbas said: when they angered Us means they provoked Our wrath.", "they provoked Our wrath"),
      difficulty: 3,
      questions: [
        { q: "What happened to Firawn's people, in 43:55?", a: "They were drowned", wrong: ["They won", "They moved", "They slept"], why: "So when they angered Us, We punished them, and drowned them all." },
        { q: "What does angered Us mean, per Ibn Abbas?", a: "They provoked His wrath", wrong: ["They praised Him", "They forgot", "They traveled"], why: "When they angered Us means, they provoked Our wrath." },
        { q: "What did Umar ibn Abdul-Aziz find, per Ibn Kathir?", a: "Punishment comes with heedlessness", wrong: ["Wealth brings safety", "Kings never fall", "Nothing"], why: "I found that punishment comes with negligence." }
      ]
    },
    {
      slug: "a-lesson-for-later",
      title: "A lesson for later people",
      line: "Allah made them a lesson and an example for later generations.",
      facts: ["A precedent for others", "A warning to learn from"],
      quote: q43(56),
      source: ik(56, "Abu Mijlaz and Mujahid said they are an example, a lesson to those who come after them.", "a lesson to those who come after them"),
      difficulty: 2,
      questions: [
        { q: "What did Allah make them, in 43:56?", a: "A precedent and an example", wrong: ["Heroes", "Kings", "Forgotten"], why: "And We made them a precedent, and an example to later generations." },
        { q: "For whom is the lesson, per Mujahid?", a: "Those who come after them", wrong: ["Only Egyptians", "Only kings", "No one"], why: "An example, a lesson to those who come after them." },
        { tf: true, q: "We should learn from Firawn's end.", why: "A lesson to those who come after them." }
      ]
    },
    {
      slug: "when-isa-was-mentioned",
      title: "When Isa was mentioned",
      line: "When Isa son of Maryam was mentioned, the Quraysh cried out.",
      facts: ["They were astounded", "They used it to argue"],
      quote: q43(57),
      source: ik(57, "Ibn Abbas and others said the Quraysh laughed and were astounded when Isa was given as an example.", "they were astounded by that"),
      difficulty: 2,
      questions: [
        { q: "Who is mentioned in 43:57?", a: "The son of Maryam", wrong: ["Musa", "Ibrahim", "Nuh"], why: "And when the son of Maryam is quoted as an example." },
        { q: "How did the Quraysh react, per Ibn Abbas?", a: "They laughed, astounded", wrong: ["They wept", "They believed", "They left"], why: "They laughed, meaning they were astounded by that." },
        { q: "What did they use it for, per Ibn Kathir?", a: "To reject the message", wrong: ["To learn", "To pray", "To give"], why: "They take this argument as a basis for rejecting your message." }
      ]
    },
    {
      slug: "only-to-argue",
      title: "Only to argue",
      line: "They raised Isa only to argue; they are a quarrelsome people.",
      facts: ["They knew he was not meant", "Arguing, not seeking truth"],
      quote: q43(58),
      source: ik(58, "Ibn Kathir says what they said was only for the sake of argument; they did not really believe it.", "What they said was only for the sake of argument"),
      difficulty: 3,
      questions: [
        { q: "What did they ask, in 43:58?", a: "Are our gods better or is he?", wrong: ["Who is the king?", "Where is Makkah?", "When is the Hour?"], why: "And say: Are our gods better or is he?" },
        { q: "Why did they raise this example, in 43:58?", a: "Only for argument", wrong: ["To learn", "To agree", "To pray"], why: "They quoted not the above example except for argument." },
        { q: "What are they called, in 43:58?", a: "A quarrelsome people", wrong: ["A patient people", "A wise people", "A humble people"], why: "Nay! But they are a quarrelsome people." }
      ]
    },
    {
      slug: "isa-a-blessed-servant",
      title: "Isa, a blessed servant",
      line: "Isa was a servant of Allah, blessed and made an example.",
      facts: ["Blessed with prophethood", "A sign of Allah's power"],
      quote: q43(59),
      source: ik(59, "Ibn Kathir says Isa was one of the servants of Allah whom Allah blessed with prophethood and messengership.", "he was no more than one of the servants of Allah whom Allah blessed with prophethood"),
      difficulty: 2,
      questions: [
        { q: "What was Isa, in 43:59?", a: "A servant whom Allah favored", wrong: ["A god", "Son of God", "A king"], why: "He was not more than a servant. We granted Our favor to him." },
        { q: "For whom was he an example, in 43:59?", a: "The Children of Israel", wrong: ["The Romans", "The Arabs only", "The Persians"], why: "And We made him an example for the Children of Israel." },
        { q: "What does example mean, per Ibn Kathir?", a: "A sign of Allah's power", wrong: ["A fashion", "A ruler", "A soldier"], why: "A sign, proof and evidence of Our power to do whatever We will." }
      ]
    },
    {
      slug: "angels-in-your-place",
      title: "Angels in your place",
      line: "Had Allah willed, angels would live on earth in your place.",
      facts: ["Allah needs no one", "He can replace whom He wills"],
      quote: q43(60),
      source: ik(60, "Mujahid said angels would have populated the earth instead of you.", "They would have populated the earth instead of you"),
      difficulty: 2,
      questions: [
        { q: "What could Allah do, in 43:60?", a: "Make angels replace you", wrong: ["Stop the sun", "Remove the sea", "Make no one"], why: "And if it were Our will, We would have made angels to replace you on the earth." },
        { q: "What does replace mean, per Mujahid?", a: "Populate the earth instead of you", wrong: ["Rule the sky", "Guard the sea", "Build cities"], why: "They would have populated the earth instead of you." },
        { tf: true, q: "Allah does not need any of His creation.", why: "If it were Our will, We would have made angels to replace you on the earth." }
      ]
    },
    {
      slug: "a-sign-of-the-hour",
      title: "A sign of the Hour",
      line: "Isa's return is a sign that the Hour is near.",
      facts: ["He will come down before the Hour", "He will judge justly"],
      quote: q43(61),
      source: hadith("bukhari", "3448", "Abu Hurairah", "Sahih", "The Prophet ﷺ said the son of Maryam will soon descend among you and judge mankind justly.", "will soon descend amongst you and will judge mankind justly"),
      difficulty: 3,
      questions: [
        { q: "What is Isa, in 43:61?", a: "A known sign of the Hour", wrong: ["A sign of rain", "A king of Rome", "A poet"], why: "And he shall be a known sign for the coming of the Hour." },
        { q: "What will Isa do, per Bukhari 3448?", a: "Descend and judge justly", wrong: ["Stay away", "Build a palace", "Start a new religion"], why: "The son of Mary will soon descend amongst you and will judge mankind justly." },
        { q: "What is the correct view of 43:61, per Ibn Kathir?", a: "His descent before the Day of Resurrection", wrong: ["His birth", "His childhood", "His travels"], why: "The correct view is that it refers to his descent before the Day of Resurrection." }
      ]
    },
    {
      slug: "shaytan-a-plain-enemy",
      title: "Shaytan, a plain enemy",
      line: "Let not Shaytan block you; he is a plain enemy.",
      facts: ["Follow the straight path", "Shaytan blocks the truth"],
      quote: q43(62),
      source: ik(62, "Ibn Kathir says let not Shaytan hinder you from following the truth.", "from following the truth"),
      difficulty: 2,
      questions: [
        { q: "What is Shaytan to us, in 43:62?", a: "A plain enemy", wrong: ["A friend", "A guide", "A helper"], why: "Verily, he, Shaytan, to you is a plain enemy." },
        { q: "From what does Shaytan hinder, per Ibn Kathir?", a: "From following the truth", wrong: ["From sleeping", "From eating", "From trade"], why: "And let not Shaytan hinder you means, from following the truth." },
        { tf: true, q: "We should never take Shaytan as a guide.", why: "Verily, he to you is a plain enemy." }
      ]
    },
    {
      slug: "isa-came-with-wisdom",
      title: "Isa came with wisdom",
      line: "Isa came with clear proofs and wisdom to settle their disputes.",
      facts: ["Al-Hikmah means prophethood", "Religious matters, not worldly"],
      quote: q43(63),
      source: ik(63, "Ibn Kathir says Al-Hikmah in 43:63 means prophethood, and Ibn Jarir said the differences were religious, not worldly, matters.", "This means religious matters, not worldly matters"),
      difficulty: 3,
      questions: [
        { q: "What did Isa bring, in 43:63?", a: "Al-Hikmah and clear proofs", wrong: ["Gold", "An army", "A palace"], why: "I have come to you with Al-Hikmah, and in order to make clear to you some of that in which you differ." },
        { q: "What does Al-Hikmah mean, per Ibn Kathir?", a: "Prophethood", wrong: ["Medicine", "Poetry", "Trade"], why: "I have come to you with Al-Hikmah, meaning prophethood." },
        { q: "What kind of differences, per Ibn Jarir?", a: "Religious matters", wrong: ["Worldly matters", "Trade deals", "Land disputes"], why: "This means religious matters, not worldly matters." }
      ]
    },
    {
      slug: "my-lord-and-your-lord",
      title: "My Lord and your Lord",
      line: "Isa said: Allah is my Lord and your Lord, so worship Him.",
      facts: ["Isa worshipped Allah too", "That is the straight path"],
      quote: q43(64),
      source: ik(64, "Ibn Kathir explains Isa meant: you and I are enslaved to Him, in need of Him, and worship Him alone.", "you and I are enslaved to Him, in need of Him"),
      difficulty: 3,
      questions: [
        { q: "What did Isa say, in 43:64?", a: "Allah is my Lord and your Lord", wrong: ["I am your lord", "Worship me", "I am Allah"], why: "Verily, Allah! He is my Lord and your Lord. So worship Him." },
        { q: "What is the straight path, per Ibn Kathir?", a: "Worship of the Lord alone", wrong: ["Worship of Isa", "Worship of angels", "Worship of saints"], why: "What I have brought to you is the straight path, which is the worship of the Lord Alone." },
        { tf: true, q: "Isa himself was a servant who needed Allah.", why: "You and I are enslaved to Him, in need of Him." }
      ]
    },
    {
      slug: "the-sects-differed",
      title: "The sects differed",
      line: "Sects split about Isa; he is Allah's servant and Messenger.",
      facts: ["Some said servant and Messenger", "That is the truth"],
      quote: q43(65),
      source: ik(65, "Ibn Kathir says they split into factions; those who said Isa was Allah's servant and Messenger spoke the truth.", "they differed and became parties and factions"),
      difficulty: 3,
      questions: [
        { q: "What did the sects do, in 43:65?", a: "They differed", wrong: ["They united", "They slept", "They left"], why: "But the sects from among themselves differed." },
        { q: "What is the truth about Isa, per Ibn Kathir?", a: "Servant and Messenger of Allah", wrong: ["Son of Allah", "Allah Himself", "Only a teacher"], why: "Some stated that he was the servant and Messenger of Allah, which is true." },
        { tf: true, q: "Allah is far above having a son.", why: "Glorified be Allah far above what they say." }
      ]
    }
  ]
};

/** Ayahs 66 to 89: the sudden Hour, friendships on that Day, the joy of Paradise, a gentle warning, and Allah who has no son. */
const ZUKHRUF_FOUR: DeepUnit = {
  key: "zukhruf4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-43",
  name: "Az-Zukhruf, ayahs 66 to 89",
  kind: "skill",
  lessonType: "surah",
  surahName: "Az-Zukhruf",
  lessons: [
    {
      slug: "the-hour-comes-suddenly",
      title: "The Hour comes suddenly",
      line: "The Hour will come suddenly, while people do not expect it.",
      facts: ["The Hour is real and will come", "Many people are unprepared"],
      quote: q43(66),
      source: ik(66, "Ibn Kathir says the Hour is real and will surely come, and it will catch the careless unawares.", "it will catch them unawares"),
      difficulty: 2,
      questions: [
        { q: "How will the Hour come, in 43:66?", a: "Suddenly", wrong: ["Slowly", "With a warning date", "Never"], why: "That it shall come upon them suddenly while they perceive not." },
        { tf: true, q: "Regret will help people once the Hour arrives.", why: "Ibn Kathir: they will feel the utmost regret when regret will not benefit them in the slightest." },
        { q: "What should we do since the Hour is sudden?", a: "Prepare now with good deeds", wrong: ["Wait and see", "Forget about it", "Guess the date"], why: "These negligent people are unprepared for it, so the wise prepare before it comes." }
      ]
    },
    {
      slug: "friends-become-foes",
      title: "Friends become foes",
      line: "On that Day friends become foes, except those with Taqwa.",
      facts: ["Friendship for Allah lasts forever", "Other friendships turn to enmity"],
      quote: q43(67),
      source: ik(67, "Ibn Kathir says every friendship not for the sake of Allah will turn to enmity, but friendship for Allah lasts forever.", "every friendship that exists for a purpose other than for the sake of Allah will turn to enmity"),
      difficulty: 3,
      questions: [
        { q: "Whose friendship lasts, in 43:67?", a: "Those who have Taqwa", wrong: ["The richest", "The loudest", "The strongest"], why: "Friends on that Day will be foes one to another except those who have Taqwa." },
        { q: "Which friendship lasts forever, per Ibn Kathir?", a: "Friendship for the sake of Allah", wrong: ["Friendship for money", "Friendship for fame", "Friendship for games"], why: "Except for that which is for the sake of Allah, which will last forever." },
        { q: "Which Prophet warned his people the same way, in 29:25?", a: "Ibrahim", wrong: ["Nuh", "Yunus", "Lut"], why: "This is like the statement of Ibrahim, peace be upon him, to his people." }
      ]
    },
    {
      slug: "love-that-lasts",
      title: "Love that lasts",
      line: "Love for Allah's sake lasts, because He lasts forever.",
      facts: ["As-Sa'di explains", "Love for Allah"],
      quote: q43(67),
      source: saadi(43, 67, "As-Sa'di says friends who loved each other for other than Allah become enemies on Judgment Day, but the love of the God-fearing lasts, because it lasts as long as the One it was for.", "فإن محبتهم تدوم وتتصل، بدوام من كانت المحبة لأجله"),
      difficulty: 2,
      questions: [
        { q: "Why do some friendships turn to enmity on Judgment Day?", a: "They were not for Allah", wrong: ["They were too short", "They were too far apart", "They were too young"], why: "Their love was for other than Allah, says as-Sa'di." },
        { q: "Why does the love of the God-fearing last, per as-Sa'di?", a: "It was for Allah, Who lasts", wrong: ["They met often", "They were rich", "They were relatives"], why: "It lasts as long as the One it was for." },
        { tf: true, q: "Friends who helped each other in sin become enemies on that Day.", why: "As-Sa'di on 43:67." }
      ]
    },
    {
      slug: "loving-for-allah",
      title: "Loving for Allah",
      line: "Allah will shade those who loved each other for His sake.",
      facts: ["Called on the Day of Resurrection", "Shaded when there is no other shade"],
      quote: q43(67),
      source: hadith("muslim", "2566", "Abu Hurairah", "Sahih", "The Prophet ﷺ said Allah will say on the Day of Resurrection: where are those who loved each other for My glory? Today I shelter them in My shade.", "Today I shall shelter them in My shadow"),
      difficulty: 3,
      questions: [
        { q: "Whom does Allah call for, in Muslim 2566?", a: "Those who loved each other for Him", wrong: ["Those who were famous", "Those who were rich", "Those who were tall"], why: "Where are those who have mutual love for My Glory's sake?" },
        { q: "What does Allah give them that Day?", a: "Shade in His shadow", wrong: ["Gold", "A palace on earth", "A long sleep"], why: "Today I shall shelter them in My shadow when there is no other shadow." },
        { tf: true, q: "Choosing good friends for Allah's sake brings reward.", why: "Ibn Kathir: friendship for the sake of Allah will last forever." }
      ]
    },
    {
      slug: "no-fear-no-grief",
      title: "No fear, no grief",
      line: "My servants, no fear on you this Day, nor will you grieve.",
      facts: ["Allah calls the believers His servants", "He gives them glad tidings"],
      quote: q43(68),
      source: ik(68, "Ibn Kathir says Allah will give the believers glad tidings that they will have no fear and no grief.", "Then He will give them the glad tidings"),
      difficulty: 2,
      questions: [
        { q: "What will not be on Allah's servants, in 43:68?", a: "Fear", wrong: ["Light", "Joy", "Peace"], why: "My servants! No fear shall be on you this Day, nor shall you grieve." },
        { q: "What does Allah give the believers, per Ibn Kathir?", a: "Glad tidings", wrong: ["A test", "A warning", "A riddle"], why: "Then He will give them the glad tidings." },
        { tf: false, q: "Allah tells His servants to grieve on that Day.", why: "Nor shall you grieve." }
      ]
    },
    {
      slug: "who-believed-and-submitted",
      title: "Believed and submitted",
      line: "The glad tidings are for those who believed and were Muslims.",
      facts: ["Belief in the heart", "Submission inside and outside"],
      quote: q43(69),
      source: ik(69, "Ibn Kathir says their hearts believed and they submitted inwardly and outwardly to the Laws of Allah.", "their hearts believed and they submitted inwardly and outwardly"),
      difficulty: 3,
      questions: [
        { q: "Who gets the glad tidings, in 43:69?", a: "Those who believed and were Muslims", wrong: ["Everyone at once", "Only kings", "Only scholars"], why: "Who believed in Our Ayat and were Muslims." },
        { q: "How did they submit, per Ibn Kathir?", a: "Inwardly and outwardly", wrong: ["Only in words", "Only in secret", "Only on Fridays"], why: "They submitted inwardly and outwardly to the Laws of Allah." },
        { tf: true, q: "Al-Mutamir said all people first feel hope, then only believers keep it.", why: "Then all of mankind will be filled with despair apart from the believers." }
      ]
    },
    {
      slug: "enter-paradise-in-joy",
      title: "Enter Paradise in joy",
      line: "Enter Paradise, you and your spouses, in happiness.",
      facts: ["Families of believers enter together", "Tuhbarun means delight and joy"],
      quote: q43(70),
      source: ik(70, "Ibn Kathir says they will be told to enter Paradise with their spouses, in delight and joy.", "in delight and joy"),
      difficulty: 2,
      questions: [
        { q: "Who enters with them, in 43:70?", a: "Their spouses", wrong: ["Strangers", "Kings", "Nobody"], why: "Enter Paradise, you and your wives, in happiness." },
        { q: "What does Tuhbarun mean, per Ibn Kathir?", a: "In delight and joy", wrong: ["In a hurry", "In fear", "In silence"], why: "Means, in delight and joy." },
        { tf: true, q: "Believing families can be joined in Paradise.", why: "You and your wives, in happiness." }
      ]
    },
    {
      slug: "trays-of-gold",
      title: "Trays of gold",
      line: "Gold trays and cups go round, with all that souls desire.",
      facts: ["Fine vessels of gold", "Good food, fragrance and sights"],
      quote: q43(71),
      source: ik(71, "Ibn Kathir says fine vessels of gold with food and drink will pass round, with good food, fragrances and beautiful scenes.", "fine vessels of gold containing food and drink"),
      difficulty: 2,
      questions: [
        { q: "What passes round them, in 43:71?", a: "Trays of gold and cups", wrong: ["Clay pots", "Wooden bowls", "Paper plates"], why: "Trays of gold and cups will be passed round them." },
        { q: "What delights the eyes, per Ibn Kathir?", a: "Beautiful scenes", wrong: ["Dark rooms", "Empty land", "Dust"], why: "Of good food, delightful fragrances and beautiful scenes." },
        { tf: false, q: "People of Paradise will one day want to leave.", why: "You will never leave it or want to exchange it." }
      ]
    },
    {
      slug: "by-mercy-and-deeds",
      title: "By mercy and deeds",
      line: "Paradise is inherited by Allah's mercy; ranks follow deeds.",
      facts: ["Entry is by Allah's mercy", "Higher ranks come from good deeds"],
      quote: q43(72),
      source: ik(72, "Ibn Kathir says no one enters Paradise by deeds alone but by Allah's mercy, while ranks depend on deeds.", "the varying ranks and degrees of Paradise will be attained according to one … righteous deeds"),
      difficulty: 4,
      questions: [
        { q: "Why do they inherit Paradise, in 43:72?", a: "Because of their deeds", wrong: ["Because of wealth", "Because of family name", "By chance"], why: "Because of your deeds that you used to do." },
        { q: "How does anyone enter Paradise, per Ibn Kathir?", a: "By Allah's mercy and grace", wrong: ["By deeds alone", "By money", "By being clever"], why: "That will be by the mercy and grace of Allah." },
        { q: "What depends on our deeds, per Ibn Kathir?", a: "Our rank in Paradise", wrong: ["Our height", "Our birthplace", "Our name"], why: "The varying ranks and degrees of Paradise will be attained according to one's righteous deeds." }
      ]
    },
    {
      slug: "even-i-need-mercy",
      title: "Even I need mercy",
      line: "The Prophet ﷺ said even he needs Allah's mercy, so do good.",
      facts: ["Deeds alone do not save", "Be steady and moderate"],
      quote: q43(72),
      source: hadith("bukhari", "6463", "Abu Hurairah", "Sahih", "The Prophet ﷺ said deeds alone will not save anyone, not even him, unless Allah covers him with mercy. So do good sincerely and moderately.", "unless and until Allah bestows His Mercy on me"),
      difficulty: 4,
      questions: [
        { q: "What saves a person, in Bukhari 6463?", a: "Allah's mercy", wrong: ["Deeds alone", "Money", "Fame"], why: "Even I will not be saved unless and until Allah bestows His Mercy on me." },
        { q: "How should we do good deeds, per the hadith?", a: "Sincerely and moderately", wrong: ["Rarely", "Only to show off", "All at once then stop"], why: "Do good deeds properly, sincerely and moderately." },
        { tf: true, q: "We still do good deeds, while hoping for Allah's mercy.", why: "Therefore, do good deeds properly, sincerely and moderately." }
      ]
    },
    {
      slug: "fruits-in-plenty",
      title: "Fruits in plenty",
      line: "There will be fruits in plenty, to eat as you wish.",
      facts: ["Fruit of every kind", "Completes the picture of joy"],
      quote: q43(73),
      source: ik(73, "Ibn Kathir says fruit of all kinds is mentioned with food and drink to complete the picture of blessing and joy.", "fruit is also mentioned to complete the picture of blessing and joy"),
      difficulty: 2,
      questions: [
        { q: "What is in plenty, in 43:73?", a: "Fruits", wrong: ["Stones", "Clouds", "Coins"], why: "Therein for you will be fruits in plenty, of which you will eat." },
        { q: "Why is fruit mentioned, per Ibn Kathir?", a: "To complete the picture of joy", wrong: ["To warn", "To test", "To count"], why: "Fruit is also mentioned to complete the picture of blessing and joy." },
        { tf: true, q: "People of Paradise eat whatever fruit they choose.", why: "Means, whatever you choose and desire." }
      ]
    },
    {
      slug: "a-lasting-punishment",
      title: "A lasting punishment",
      line: "Wrongdoers stay in Hell; we ask Allah to keep us safe.",
      facts: ["Mentioned right after Paradise", "A warning so we stay away"],
      quote: q43(74),
      source: ik(74, "Ibn Kathir says the description of the blessed is followed by the description of the doomed, as a warning.", "The description of the state of the blessed is followed by a description of the state of the doomed"),
      difficulty: 3,
      questions: [
        { q: "What comes right after Paradise in the surah?", a: "A warning about the doomed", wrong: ["A story of a king", "A list of names", "A dream"], why: "The description of the state of the blessed is followed by a description of the state of the doomed." },
        { q: "Who abides in the torment, in 43:74?", a: "The criminals", wrong: ["The believers", "The angels", "The Prophets"], why: "Verily, the criminals will be in the torment of Hell to abide therein forever." },
        { tf: true, q: "Learning about Hell helps us stay away from wrong.", why: "The doomed are described after the blessed so people take warning." }
      ]
    },
    {
      slug: "no-goodness-left",
      title: "No goodness left",
      line: "The punishment does not lighten, and they lose all hope.",
      facts: ["Not lightened even a moment", "Regret comes too late"],
      quote: q43(75),
      source: ik(75, "Ibn Kathir says the punishment will not lighten for even a moment, and they will despair of any goodness.", "they will despair of any goodness"),
      difficulty: 3,
      questions: [
        { q: "What will not happen, in 43:75?", a: "The torment will not be lightened", wrong: ["The sun will not rise", "Rain will not fall", "The sea will not move"], why: "The torment will not be lightened for them." },
        { q: "How long is it not lightened, per Ibn Kathir?", a: "Not even for one moment", wrong: ["For one day", "For one week", "For one year"], why: "Meaning, not even for one moment." },
        { tf: true, q: "They will despair of any goodness.", why: "Means, they will despair of any goodness." }
      ]
    },
    {
      slug: "we-wronged-them-not",
      title: "Allah wrongs no one",
      line: "Allah did not wrong them; they wronged themselves.",
      facts: ["Messengers were sent to them", "Proof came before punishment"],
      quote: q43(76),
      source: ik(76, "Ibn Kathir says they are punished because they did wrong after proof came and Messengers were sent to them.", "after proof had been established against them"),
      difficulty: 3,
      questions: [
        { q: "Who were the wrongdoers, in 43:76?", a: "They themselves", wrong: ["Allah", "The angels", "The Messengers"], why: "We wronged them not, but they were the wrongdoers." },
        { q: "What came before they were punished, per Ibn Kathir?", a: "Proof and Messengers", wrong: ["Nothing at all", "Only a dream", "Only riches"], why: "After proof had been established against them and Messengers had been sent to them." },
        { tf: false, q: "Allah is ever unjust to His servants.", why: "And your Lord is not at all unjust to His servants." }
      ]
    },
    {
      slug: "the-keeper-malik",
      title: "The keeper, Malik",
      line: "They call to Malik, the keeper, but there is no way out.",
      facts: ["Malik is the angel keeper of Hell", "The Prophet ﷺ recited this on the minbar"],
      quote: q43(77),
      source: ik(77, "Ibn Kathir says Malik is the keeper of Hell, and the Prophet ﷺ recited this ayah on the minbar, as Al-Bukhari reports.", "who is the keeper of Hell"),
      difficulty: 3,
      questions: [
        { q: "Who is Malik, per Ibn Kathir?", a: "The keeper of Hell", wrong: ["A king of Egypt", "A Prophet", "A star"], why: "Who is the keeper of Hell." },
        { q: "What does Malik answer, in 43:77?", a: "You shall abide forever", wrong: ["You may leave", "Wait one day", "Ask again later"], why: "He will say: Verily, you shall abide forever." },
        { q: "Where did the Prophet ﷺ recite 43:77, per Al-Bukhari?", a: "On the minbar", wrong: ["In a cave", "On a ship", "In the market"], why: "I heard the Messenger of Allah reciting on the Minbar." }
      ]
    },
    {
      slug: "hating-the-truth",
      title: "Hating the truth",
      line: "The truth came clearly, but most of them hated the truth.",
      facts: ["Allah explained the truth in detail", "They chose falsehood over it"],
      quote: q43(78),
      source: ik(78, "Ibn Kathir says Allah explained the truth clearly and in detail, but they followed falsehood and refused the truth.", "We have explained it to you clearly and in detail"),
      difficulty: 3,
      questions: [
        { q: "What did most of them hate, in 43:78?", a: "The truth", wrong: ["Gold", "Food", "Rain"], why: "But most of you have a hatred for the truth." },
        { q: "How was the truth given, per Ibn Kathir?", a: "Clearly and in detail", wrong: ["In secret", "Half way", "With no proof"], why: "We have explained it to you clearly and in detail." },
        { tf: true, q: "We should love the truth even when it is hard.", why: "They are blamed because they followed falsehood and refused the truth." }
      ]
    },
    {
      slug: "their-plot-backfires",
      title: "Their plot backfires",
      line: "They plotted against the truth, and Allah also planned.",
      facts: ["Allah's plan is greater", "Their plot turned against them"],
      quote: q43(79),
      source: ik(79, "Mujahid said they wanted to plot evil, and Ibn Kathir says Allah made the result of their plot backfire on them.", "Allah planned it so that the consequences of that would backfire on them"),
      difficulty: 3,
      questions: [
        { q: "What does Allah say, in 43:79?", a: "Then We too are planning", wrong: ["We are asleep", "We do not know", "We will leave"], why: "Or have they plotted some plan? Then We too are planning." },
        { q: "What happened to their plot, per Ibn Kathir?", a: "The results backfired on them", wrong: ["They won", "Nobody noticed", "They forgot it"], why: "Allah planned it so that the consequences of that would backfire on them." },
        { q: "Which ayah is similar, per Ibn Kathir?", a: "27:50, they plotted and We planned", wrong: ["2:255", "112:1", "1:2"], why: "So they plotted a plot, and We planned a plan, while they perceived not (27:50)." }
      ]
    },
    {
      slug: "angels-record-all",
      title: "Angels record all",
      line: "Allah hears secrets, and His angels write everything down.",
      facts: ["Allah hears secret talk", "Angels record big and small deeds"],
      quote: q43(80),
      source: ik(80, "Ibn Kathir says Allah knows what they say in secret and openly, and the angels record their deeds, major and minor.", "the angels are also recording their deeds"),
      difficulty: 2,
      questions: [
        { q: "What do Allah's messengers do, in 43:80?", a: "Record", wrong: ["Sleep", "Forget", "Hide"], why: "Yes (We do) and Our messengers are by them, to record." },
        { q: "Which deeds are written, per Ibn Kathir?", a: "Major and minor", wrong: ["Only big ones", "Only public ones", "None"], why: "The angels are also recording their deeds, major and minor." },
        { tf: false, q: "Whispered secrets are hidden from Allah.", why: "Or do they think that We hear not their secrets and their private counsel? Yes (We do)." }
      ]
    },
    {
      slug: "allah-has-no-son",
      title: "Allah has no son",
      line: "Had the Most Gracious a son, I would worship first.",
      facts: ["A way to show it is impossible", "The Prophet ﷺ obeys all Allah commands"],
      quote: q43(81),
      source: ik(81, "Ibn Kathir says the Prophet ﷺ obeys all that Allah commands, and this conditional does not mean a son is possible.", "I obey all that He commands me"),
      difficulty: 4,
      questions: [
        { q: "Who is the first of the worshippers, in 43:81?", a: "The Prophet ﷺ", wrong: ["Firawn", "Iblis", "Qarun"], why: "Then I am the first of the worshippers." },
        { tf: false, q: "Ibn Kathir says 43:81 means Allah could have a son.", why: "This conditional phrase does not mean that what is described could happen nor that is possible." },
        { q: "Which ayah does Ibn Kathir link to 43:81?", a: "39:4, He is Allah, the One", wrong: ["2:286", "18:1", "55:1"], why: "But glory be to Him! He is Allah, the One, the Irresistible (39:4)." }
      ]
    },
    {
      slug: "lord-of-the-throne",
      title: "Lord of the Throne",
      line: "Glorified is the Lord of heaven, earth and the Throne.",
      facts: ["Allah is far above having offspring", "None is equal to Him"],
      quote: q43(82),
      source: ik(82, "Ibn Kathir says Allah is Unique, One and Self-Sufficient. None is equal to Him or like Him, and He has no offspring.", "There is none equal to Him or like Him"),
      difficulty: 3,
      questions: [
        { q: "Allah is Lord of what, in 43:82?", a: "The heavens, the earth and the Throne", wrong: ["Only the sea", "Only the moon", "Only Makkah"], why: "Glorified is the Lord of the heavens and the earth, the Lord of the Throne!" },
        { q: "Who is equal to Allah, per Ibn Kathir?", a: "No one", wrong: ["The angels", "The Prophets", "The kings"], why: "There is none equal to Him or like Him." },
        { tf: true, q: "Allah is far above all that people falsely say of Him.", why: "Exalted be He from all that they ascribe (to Him)." }
      ]
    },
    {
      slug: "until-they-meet-their-day",
      title: "Until their Day",
      line: "Leave them to their idle talk until they meet their Day.",
      facts: ["Their promised Day is the Resurrection", "Then they will know their end"],
      quote: q43(83),
      source: ik(83, "Ibn Kathir says leave them in their ignorance and play until the promised Day, which is the Day of Resurrection.", "which is the Day of Resurrection"),
      difficulty: 2,
      questions: [
        { q: "What are they busy with, in 43:83?", a: "Nonsense and play", wrong: ["Prayer", "Charity", "Study"], why: "So leave them alone to speak nonsense and play." },
        { q: "What is their promised Day, per Ibn Kathir?", a: "The Day of Resurrection", wrong: ["Eid", "A market day", "Their birthday"], why: "Which is the Day of Resurrection." },
        { tf: true, q: "Wasting life in idle play is a loss.", why: "They play in their world until they meet the Day which they have been promised." }
      ]
    },
    {
      slug: "god-in-heaven-and-earth",
      title: "God in heaven and earth",
      line: "He alone is God in the heaven and God on the earth.",
      facts: ["All in heaven and earth worship Him", "He is All-Wise, All-Knowing"],
      quote: q43(84),
      source: ik(84, "Ibn Kathir says He is the God of those in the heavens and on earth; all of them worship Him and are humbled before Him.", "all of them worship Him and are humbled before Him"),
      difficulty: 3,
      questions: [
        { q: "Where is Allah the only God, in 43:84?", a: "In the heaven and on the earth", wrong: ["Only in the sky", "Only on land", "Only in Makkah"], why: "It is He Who is the only God in the heaven and the only God on the earth." },
        { q: "Which two names end 43:84?", a: "All-Wise, All-Knower", wrong: ["Most Kind, Most Near", "First, Last", "Living, Eternal"], why: "And He is the All-Wise, the All-Knower." },
        { q: "Which ayah is like 43:84, per Ibn Kathir?", a: "6:3, He is Allah in the heavens and earth", wrong: ["97:1", "108:1", "103:1"], why: "And He is Allah in the heavens and on the earth (6:3)." }
      ]
    },
    {
      slug: "knowledge-of-the-hour",
      title: "Knowledge of the Hour",
      line: "Allah owns all, knows the Hour, and to Him we all return.",
      facts: ["Only Allah knows when the Hour comes", "Each will be repaid for deeds"],
      quote: q43(85),
      source: ik(85, "Ibn Kathir says Allah is Sovereign of all things, no one knows the time of the Hour except Him, and all will be repaid.", "no one knows when it will happen except Him"),
      difficulty: 3,
      questions: [
        { q: "Who knows the time of the Hour, per Ibn Kathir?", a: "Only Allah", wrong: ["Fortune tellers", "Star readers", "Everyone"], why: "No one knows when it will happen except Him." },
        { q: "To whom will we return, in 43:85?", a: "To Allah", wrong: ["To nobody", "To the earth only", "To the kings"], why: "And to Whom you (all) will be returned." },
        { tf: true, q: "Each person will be repaid for their deeds.", why: "Each person will be requited for his deeds." }
      ]
    },
    {
      slug: "idols-cannot-intercede",
      title: "Idols cannot intercede",
      line: "False gods cannot intercede; only those who witness truth.",
      facts: ["Idols have no power to help", "Intercession is only by Allah's leave"],
      quote: q43(86),
      source: ik(86, "Ibn Kathir says idols cannot intercede, but one who bears witness to the truth with knowledge may intercede by His leave.", "they are not able to intercede for them"),
      difficulty: 4,
      questions: [
        { q: "What do false gods lack, in 43:86?", a: "Power of intercession", wrong: ["Names", "Statues", "Followers"], why: "Those whom they invoke instead of Him have no power of intercession." },
        { q: "Whose intercession helps, per Ibn Kathir?", a: "One who witnesses the truth, by Allah's leave", wrong: ["Any idol", "Any rich man", "Any stone"], why: "His intercession with Allah will avail, by His leave." },
        { tf: false, q: "Idols can intercede for those who worship them.", why: "They are not able to intercede for them." }
      ]
    },
    {
      slug: "who-created-them",
      title: "Who created them?",
      line: "Ask who created them, they say Allah; why turn away then?",
      facts: ["They admit Allah is the Creator", "Yet they worship others"],
      quote: q43(87),
      source: ik(87, "Ibn Kathir says they admit Allah alone is the Creator, yet still worship others who can do nothing.", "they will admit that He Alone is the Creator of all things"),
      difficulty: 3,
      questions: [
        { q: "What do they answer, in 43:87?", a: "Allah", wrong: ["Their idols", "Nature", "Nobody"], why: "If you ask them who created them, they will surely say: Allah." },
        { q: "What do they admit, per Ibn Kathir?", a: "Allah alone is the Creator", wrong: ["Idols made the world", "The world made itself", "Kings created people"], why: "They will admit that He Alone is the Creator of all things." },
        { tf: true, q: "The Creator alone deserves worship.", why: "Yet despite that they still worship others alongside Him who have nothing and are able to do nothing." }
      ]
    },
    {
      slug: "the-prophets-complaint",
      title: "A complaint to Allah",
      line: "The Prophet ﷺ said: My Lord, these people do not believe.",
      facts: ["He turned to Allah with his worry", "Like his words in 25:30"],
      quote: q43(88),
      source: ik(88, "Ibn Kathir says the Prophet ﷺ complained to his Lord about his people who did not believe in him, like 25:30.", "he complained to his Lord about his people"),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ say, in 43:88?", a: "These people do not believe", wrong: ["These people are kings", "These people are lost at sea", "These people are asleep"], why: "O my Lord! Verily, these are a people who believe not!" },
        { q: "To whom did he complain, per Ibn Kathir?", a: "To his Lord", wrong: ["To the market", "To the king", "To nobody"], why: "He complained to his Lord about his people." },
        { tf: true, q: "We can share our worries with Allah in dua.", why: "He complained to his Lord about his people who did not believe in him." }
      ]
    },
    {
      slug: "say-salam",
      title: "Say: Salam",
      line: "Turn away from them and say Salam; they will come to know.",
      facts: ["Do not answer evil with evil", "Soften hearts and forgive"],
      quote: q43(89),
      source: ik(89, "Ibn Kathir says do not respond to them in the same bad way, but try to soften their hearts and forgive them in word and deed.", "try to soften their hearts and forgive them in word and deed"),
      difficulty: 3,
      questions: [
        { q: "What should he say, in 43:89?", a: "Salam, peace", wrong: ["Go away", "Nothing ever", "Shame on you"], why: "So turn away from them, and say: Salam (peace!)." },
        { q: "How should we answer rude words, per Ibn Kathir?", a: "Soften hearts and forgive", wrong: ["Shout back", "Insult them", "Hit them"], why: "Do not respond to them in the same evil manner... try to soften their hearts and forgive them." },
        { q: "What spread east and west in the end, per Ibn Kathir?", a: "Islam", wrong: ["Idol worship", "The Roman empire", "Silence"], why: "Islam spread throughout the east and the west." }
      ]
    }
  ]
};

export const ZUKHRUF_UNITS: readonly DeepUnit[] = [ZUKHRUF_ONE, ZUKHRUF_TWO, ZUKHRUF_THREE, ZUKHRUF_FOUR];
