import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Fussilat ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Fussilat 41:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_41_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Fussilat 41:${ayah}`,
    url: `https://quran.com/41:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 41:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q41 = (ayah: number) => quranQuote(41, ayah);

/** Ayahs 1 to 18: a Book explained in detail, the call to Tawhid, the creation of the earth and heavens, and Ad and Thamud. */
const FUSSILAT_ONE: DeepUnit = {
  key: "fussilat1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-41",
  name: "Fussilat, ayahs 1 to 18",
  kind: "skill",
  lessonType: "surah",
  surahName: "Fussilat",
  lessons: [
    {
      slug: "from-the-most-gracious",
      title: "From the Most Gracious",
      line: "The Quran comes from the Most Gracious, the Most Merciful.",
      facts: ["Fussilat opens with Ha Mim", "Jibril brought it down with truth"],
      quote: q41(1),
      source: ik(1, "Ibn Kathir says the Quran is revealed from the Most Gracious, Most Merciful, brought down by Jibril.", "is revealed from the Most Gracious, Most Merciful"),
      difficulty: 1,
      questions: [
        { q: "From whom is the revelation, in 41:2?", a: "The Most Gracious, the Most Merciful", wrong: ["A poet", "A king", "A wise man"], why: "A revelation from the Most Gracious, the Most Merciful." },
        { q: "Which letters open Fussilat, in 41:1?", a: "Ha Mim", wrong: ["Alif Lam Ra", "Ta Sin", "Qaf"], why: "Ha Mim. A revelation from the Most Gracious, the Most Merciful." },
        { tf: true, q: "Fussilat is one of the Ha Mim surahs.", why: "It opens with Ha Mim, like Ghafir before it." }
      ]
    },
    {
      slug: "a-revelation-of-mercy",
      title: "A revelation of mercy",
      line: "The trustworthy Ruh, Jibril, brought the Quran down with truth.",
      facts: ["Sent down from Allah's mercy", "Brought down upon the Prophet's ﷺ heart"],
      quote: q41(2),
      source: ik(2, "Ibn Kathir links 41:2 to 26:192-194: the trustworthy Ruh, Jibril, brought it down upon the Prophet's ﷺ heart.", "Which the trustworthy Ruh"),
      difficulty: 1,
      questions: [
        { q: "Which two names are in 41:2?", a: "The Most Gracious, the Most Merciful", wrong: ["The King, the Holy", "The First, the Last", "The Strong, the Firm"], why: "A revelation from the Most Gracious, the Most Merciful." },
        { q: "Who brought the Quran down, per the ayah Ibn Kathir cites?", a: "Jibril, the trustworthy Ruh", wrong: ["A poet", "A traveler", "A king"], why: "Which the trustworthy Ruh, Jibril, has brought down upon your heart (26:193)." },
        { tf: true, q: "The Quran comes from Allah's mercy.", why: "A revelation from the Most Gracious, the Most Merciful." }
      ]
    },
    {
      slug: "explained-in-detail",
      title: "Explained in detail",
      line: "A Book whose ayat are explained in detail, in clear Arabic.",
      facts: ["Clear in meaning", "Sound and wise in rulings"],
      quote: q41(3),
      source: ik(3, "Ibn Kathir says the ayat are explained in detail: its meanings are clear and its rulings are sound and wise.", "its meanings are clear and its rulings are sound and wise"),
      difficulty: 2,
      questions: [
        { q: "What does Fussilat mean, from 41:3?", a: "Explained in detail", wrong: ["Hidden away", "Kept short", "Written in stone"], why: "A Book whereof the Ayat are explained in detail." },
        { q: "How are its meanings, per Ibn Kathir?", a: "Clear", wrong: ["Confusing", "Secret", "Changing"], why: "Its meanings are clear and its rulings are sound and wise." },
        { q: "For whom is it, in 41:3?", a: "People who know", wrong: ["Only kings", "Only poets", "No one"], why: "A Quran in Arabic for people who know." }
      ]
    },
    {
      slug: "good-news-and-warning",
      title: "Good news and warning",
      line: "The Quran brings good news and warning, yet most turn away.",
      facts: ["Good news for believers", "Warning for those who reject"],
      quote: q41(4),
      source: ik(4, "Ibn Kathir says the Quran sometimes brings glad tidings to the believers and sometimes a warning to the disbelievers.", "sometimes it brings glad tidings to the believers, and sometimes it brings a warning to the disbelievers"),
      difficulty: 1,
      questions: [
        { q: "What two things does the Quran bring, in 41:4?", a: "Glad tidings and warning", wrong: ["Gold and silver", "Songs and stories", "Maps and rules"], why: "Giving glad tidings and warning." },
        { q: "Who gets the glad tidings, per Ibn Kathir?", a: "The believers", wrong: ["The proud", "The mockers", "No one"], why: "Sometimes it brings glad tidings to the believers." },
        { tf: true, q: "Most of Quraysh turned away though it was clear.", why: "Most of the Quraysh did not understand anything of it at all, despite the fact that it was so clear." }
      ]
    },
    {
      slug: "hearts-under-coverings",
      title: "Hearts under coverings",
      line: "They said: Our hearts are covered and our ears deaf.",
      facts: ["They put up a screen", "They chose their own way"],
      quote: q41(5),
      source: ik(5, "Ibn Kathir explains their words: go your way, and we will go our way, and we will not follow you.", "go your way, and we will go our way, and we will not follow you"),
      difficulty: 2,
      questions: [
        { q: "What did they say of their hearts, in 41:5?", a: "Under coverings", wrong: ["Full of love", "Wide open", "Very soft"], why: "Our hearts are under coverings from that to which you invite us." },
        { q: "What is between them and the Prophet ﷺ, in 41:5?", a: "A screen", wrong: ["A river", "A mountain", "A road"], why: "And between us and you is a screen." },
        { q: "What did they mean, per Ibn Kathir?", a: "We will not follow you", wrong: ["Teach us more", "We agree", "Come back later"], why: "Go your way, and we will go our way, and we will not follow you." }
      ]
    },
    {
      slug: "only-a-human-like-you",
      title: "Only a human like you",
      line: "I am only a human like you; your God is One God.",
      facts: ["Go straight to Allah alone", "Seek His forgiveness"],
      quote: q41(6),
      source: ik(6, "Ibn Kathir says take the straight path to Him means worship Him alone sincerely, as He commanded through His Messengers.", "worship Him Alone sincerely, in accordance with what He has commanded you through His Messengers"),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ say he was, in 41:6?", a: "A human being like you", wrong: ["An angel", "A king", "A jinn"], why: "Say: I am only a human being like you." },
        { q: "What was revealed to him, in 41:6?", a: "Your God is One God", wrong: ["Many gods", "No god", "Gods of stone"], why: "It is revealed to me that your God is One God." },
        { q: "What should we seek, in 41:6?", a: "His forgiveness", wrong: ["Fame", "Revenge", "Gold"], why: "Therefore take straight path to Him and obedience to Him, and seek forgiveness of Him." }
      ]
    },
    {
      slug: "those-who-give-not-zakah",
      title: "Those who give not Zakah",
      line: "Woe to those who give not the Zakah and deny the Hereafter.",
      facts: ["Zakah purifies", "Zakah purifies soul and wealth"],
      quote: q41(7),
      source: ik(7, "Ibn Kathir says Zakah on wealth is so called because it purifies wealth and brings blessing to it.", "it purifies wealth, and it is a means of increasing it"),
      difficulty: 2,
      questions: [
        { q: "Who are blamed in 41:7?", a: "Those who give not the Zakah", wrong: ["Those who pray", "Those who fast", "Those who travel"], why: "Those who give not the Zakah and they are disbelievers in the Hereafter." },
        { q: "What does Zakah do for wealth, per Ibn Kathir?", a: "Purifies and blesses it", wrong: ["Wastes it", "Hides it", "Freezes it"], why: "Zakah purifies wealth, and it is a means of increasing it, blessing it and making it more beneficial." },
        { tf: true, q: "Zakah also means purifying the soul from bad qualities.", why: "Zakah in this ayah is purification of the soul, ridding oneself of all bad qualities, the worst of which is Shirk." }
      ]
    },
    {
      slug: "a-reward-that-never-stops",
      title: "A reward that never stops",
      line: "Believers who do good have a reward that never stops.",
      facts: ["Never cut off", "Never decreases"],
      quote: q41(8),
      source: ik(8, "Mujahid said the reward of the believers will never be cut off or decrease.", "It will never be cut off or decrease"),
      difficulty: 1,
      questions: [
        { q: "What reward do believers get, in 41:8?", a: "An endless reward", wrong: ["A short gift", "A one-time prize", "Nothing"], why: "For them will be an endless reward that will never stop." },
        { q: "What did Mujahid say of the reward?", a: "Never cut off or decreased", wrong: ["It ends soon", "It shrinks", "It is small"], why: "It will never be cut off or decrease." },
        { tf: true, q: "Faith and good deeds go together in 41:8.", why: "Truly, those who believe and do righteous good deeds." }
      ]
    },
    {
      slug: "the-earth-in-two-days",
      title: "The earth in two days",
      line: "Do you disbelieve in Him Who created the earth in two days?",
      facts: ["He is the Lord of all that exists", "The earth was made as a foundation"],
      quote: q41(9),
      source: ik(9, "Ibn Kathir says Allah created the earth first, because it is the foundation, and the foundation is built first, then the roof.", "the foundation should be built first, then the roof"),
      difficulty: 2,
      questions: [
        { q: "In how many days was the earth created, in 41:9?", a: "Two days", wrong: ["One day", "Ten days", "A hundred days"], why: "Do you verily disbelieve in Him Who created the earth in two Days?" },
        { q: "Why was the earth made first, per Ibn Kathir?", a: "It is the foundation", wrong: ["It is smaller", "It is older", "By chance"], why: "He created the earth first, because it is the foundation, and the foundation should be built first, then the roof." },
        { tf: false, q: "Setting up rivals to the Creator makes sense.", why: "And you set up rivals with Him? That is the Lord of all that exists." }
      ]
    },
    {
      slug: "mountains-and-blessings",
      title: "Mountains and blessings",
      line: "Allah set firm mountains on the earth and blessed it.",
      facts: ["He measured its provision", "Each land has what suits it"],
      quote: q41(10),
      source: ik(10, "Ikrimah and Mujahid said Allah placed in every land that which is not suited for any other land.", "He placed in every land that which is not suited for any other land"),
      difficulty: 2,
      questions: [
        { q: "What did Allah place on the earth, in 41:10?", a: "Firm mountains", wrong: ["Towers", "Palaces", "Walls"], why: "He placed therein firm mountains from above it, and He blessed it." },
        { q: "What did Allah measure on the earth?", a: "Its sustenance", wrong: ["Its walls", "Its kings", "Its coins"], why: "And measured therein its sustenance in four Days." },
        { q: "What did Ikrimah and Mujahid say?", a: "Each land has what suits it", wrong: ["All lands are the same", "Only one land is blessed", "Nothing grows"], why: "He placed in every land that which is not suited for any other land." }
      ]
    },
    {
      slug: "we-come-willingly",
      title: "We come willingly",
      line: "Heaven and earth were told to come, and came willingly.",
      facts: ["The heaven was like smoke", "All creation obeys Allah"],
      quote: q41(11),
      source: ik(11, "Ibn Kathir explains their answer: we will respond to You willingly, and all You create in us will obey You.", "we will respond to You willingly"),
      difficulty: 2,
      questions: [
        { q: "What was the heaven like, in 41:11?", a: "Smoke", wrong: ["Ice", "Stone", "Water"], why: "Then He rose over the heaven when it was smoke." },
        { q: "What did the heaven and earth answer?", a: "We come willingly", wrong: ["We refuse", "Not yet", "Ask later"], why: "They both said: We come willingly." },
        { tf: true, q: "Even the heavens and earth obey Allah's command.", why: "We will respond to You willingly." }
      ]
    },
    {
      slug: "seven-heavens",
      title: "Seven heavens",
      line: "Allah made seven heavens and gave each heaven its affair.",
      facts: ["Each heaven has its angels", "Things only Allah knows"],
      quote: q41(12),
      source: ik(12, "Ibn Kathir says Allah placed in each heaven whatever it needs of angels and things known only to Him.", "He placed in each heaven whatever it needs of angels and things which are known only unto Him"),
      difficulty: 2,
      questions: [
        { q: "How many heavens, in 41:12?", a: "Seven", wrong: ["Three", "Five", "Ten"], why: "Then He completed and finished their creation as seven heavens in two Days." },
        { q: "What is in each heaven, per Ibn Kathir?", a: "What it needs of angels", wrong: ["Nothing", "Only clouds", "Only birds"], why: "He placed in each heaven whatever it needs of angels and things which are known only unto Him." },
        { q: "Which names end 41:12?", a: "The Almighty, the All-Knower", wrong: ["The First, the Last", "The Rich, the Praised", "The King, the Holy"], why: "Such is the decree of Him, the Almighty, the All-Knower." }
      ]
    },
    {
      slug: "lamps-in-the-sky",
      title: "Lamps in the sky",
      line: "Allah adorned the nearest heaven with lamps, and as a guard.",
      facts: ["The lamps are stars", "They guard against the Shayatin"],
      quote: q41(12),
      source: ik(12, "Ibn Kathir says the lamps are the stars and planets, and they guard against the Shayatin listening to the angels.", "as protection against the Shayatin, lest they listen to the angels on high"),
      difficulty: 2,
      questions: [
        { q: "What are the lamps, per Ibn Kathir?", a: "Stars and planets", wrong: ["Candles", "Fires on hills", "Lanterns"], why: "The stars and planets which shine on the people of the earth." },
        { q: "What do they guard against?", a: "The Shayatin", wrong: ["Rain", "Birds", "Wind"], why: "As protection against the Shayatin, lest they listen to the angels on high." },
        { tf: true, q: "The stars are both a beauty and a guard.", why: "We adorned the nearest heaven with lamps to be an adornment as well as to guard." }
      ]
    },
    {
      slug: "i-have-warned-you",
      title: "I have warned you",
      line: "I warn you of a blast like the one that struck Ad.",
      facts: ["Past nations were punished", "The warning is a mercy"],
      quote: q41(13),
      source: ik(13, "Ibn Kathir says the Prophet ﷺ warned them of a punishment like the one past nations suffered for rejecting their Messengers.", "I warn you of the punishment of Allah like the punishment that the past nations suffered"),
      difficulty: 2,
      questions: [
        { q: "Which nations are named in 41:13?", a: "Ad and Thamud", wrong: ["Rome and Persia", "Egypt and Sheba", "Madyan and Lut"], why: "I have warned you of a Saiqah like the Saiqah which overtook Ad and Thamud." },
        { q: "What is the warning about, per Ibn Kathir?", a: "A punishment like past nations", wrong: ["A storm of gold", "A long holiday", "A new king"], why: "I warn you of the punishment of Allah like the punishment that the past nations suffered." },
        { tf: true, q: "A warning gives people a chance to change.", why: "If you turn away from that which I have brought to you from Allah, then I warn you." }
      ]
    },
    {
      slug: "why-not-angels",
      title: "Why not angels?",
      line: "They said: If Allah willed, He would have sent angels.",
      facts: ["They rejected human Messengers", "Messengers came from all around"],
      quote: q41(14),
      source: ik(14, "Ibn Kathir explains their claim: we will not follow you because you are just men like us.", "we will not follow you because you are just men like us"),
      difficulty: 2,
      questions: [
        { q: "What did the Messengers say, in 41:14?", a: "Worship none but Allah", wrong: ["Build towers", "Follow the king", "Gather gold"], why: "Worship none but Allah." },
        { q: "Who did they want as Messengers?", a: "Angels", wrong: ["Kings", "Poets", "Traders"], why: "If our Lord had so willed, He would surely have sent down the angels." },
        { q: "Why did they reject the Messengers, per Ibn Kathir?", a: "They were human like them", wrong: ["They were poor", "They were young", "They were far"], why: "We will not follow you because you are just men like us." }
      ]
    },
    {
      slug: "who-is-mightier",
      title: "Who is mightier?",
      line: "Ad said: Who is mightier than us? Allah was mightier.",
      facts: ["They boasted of their strength", "Allah gave them that strength"],
      quote: q41(15),
      source: ik(15, "Ibn Kathir says Ad boasted of their physical strength, thinking it would protect them from Allah's punishment.", "They boasted of their physical strength"),
      difficulty: 2,
      questions: [
        { q: "What did Ad ask, in 41:15?", a: "Who is mightier than us?", wrong: ["Who will help us?", "Who made us?", "Who is our guide?"], why: "And they said: Who is mightier than us in strength?" },
        { q: "What did they boast of, per Ibn Kathir?", a: "Their physical strength", wrong: ["Their prayers", "Their books", "Their kindness"], why: "They boasted of their physical strength, and power." },
        { tf: true, q: "Allah, Who created them, was mightier than them.", why: "See they not that Allah Who created them was mightier in strength than them." }
      ]
    },
    {
      slug: "the-sarsar-wind",
      title: "The Sarsar wind",
      line: "Allah sent upon Ad a furious, cold wind for days.",
      facts: ["Strong, cold and loud", "Seven nights and eight days"],
      quote: q41(16),
      source: ik(16, "Ibn Kathir says the Sarsar wind was strong, intensely cold and loud, a fit answer to their pride in their strength.", "it was a strong wind that was an apt punishment for their being deceived by their physical strength"),
      difficulty: 2,
      questions: [
        { q: "What was sent upon Ad, in 41:16?", a: "A Sarsar wind", wrong: ["A flood", "A fire", "An army"], why: "So, We sent upon them a Sarsar wind in days of calamity." },
        { q: "How was the wind, per Ibn Kathir?", a: "Strong, cold and loud", wrong: ["Warm and gentle", "Soft and quiet", "Short and weak"], why: "It was a strong wind, intensely cold, and it made a furious sound." },
        { q: "How long did it last, per 69:7?", a: "Seven nights and eight days", wrong: ["One hour", "One day", "One year"], why: "Seven nights and eight days in succession (69:7)." }
      ]
    },
    {
      slug: "thamud-preferred-blindness",
      title: "Thamud preferred blindness",
      line: "Thamud were shown the truth, but chose blindness over guidance.",
      facts: ["Salih made the truth clear", "They harmed the she-camel"],
      quote: q41(17),
      source: ik(17, "Ibn Kathir says Allah made the truth clear to Thamud through their Prophet Salih, but they opposed him.", "We showed them the truth and made it clear to them through the words of their Prophet Salih"),
      difficulty: 2,
      questions: [
        { q: "What did Thamud prefer, in 41:17?", a: "Blindness over guidance", wrong: ["Guidance", "Travel", "Trade"], why: "But they preferred blindness to guidance." },
        { q: "Which Prophet was sent to Thamud?", a: "Salih", wrong: ["Hud", "Shuayb", "Lut"], why: "Through the words of their Prophet Salih." },
        { q: "What does We showed them mean, per Ibn Abbas?", a: "We explained to them", wrong: ["We hid from them", "We left them", "We forgot them"], why: "Ibn Abbas and others said: We explained to them." }
      ]
    },
    {
      slug: "we-saved-the-believers",
      title: "We saved the believers",
      line: "Allah saved those who believed and had taqwa.",
      facts: ["Saved with Salih", "Because they feared Allah"],
      quote: q41(18),
      source: ik(18, "Ibn Kathir says Allah saved the believers along with Salih, and no harm came to them, because of their fear of Allah.", "Allah saved them along with His Prophet Salih"),
      difficulty: 1,
      questions: [
        { q: "Whom did Allah save, in 41:18?", a: "Those who believed and had taqwa", wrong: ["The proud", "The rich", "Everyone"], why: "And We saved those who believed and had Taqwa." },
        { q: "With whom were they saved, per Ibn Kathir?", a: "Their Prophet Salih", wrong: ["Hud", "Nuh", "Musa"], why: "Allah saved them along with His Prophet Salih." },
        { tf: true, q: "They were saved because they feared Allah.", why: "Allah saved them because of their fear of Allah." }
      ]
    }
  ]
};

/** Ayahs 19 to 36: limbs that speak on the Last Day, bad companions, stand firm, and repel evil with good. */
const FUSSILAT_TWO: DeepUnit = {
  key: "fussilat2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-41",
  name: "Fussilat, ayahs 19 to 36",
  kind: "skill",
  lessonType: "surah",
  surahName: "Fussilat",
  lessons: [
    {
      slug: "gathered-and-driven",
      title: "Gathered and driven",
      line: "The enemies of Allah will be gathered and driven on.",
      facts: ["First and last gathered together", "A reminder for the idolaters"],
      quote: q41(19),
      source: ik(19, "Ibn Kathir says the keepers will gather the first of them with the last of them.", "the keepers of Hell will gather the first of them with the last of them"),
      difficulty: 2,
      questions: [
        { q: "Who will be gathered, in 41:19?", a: "The enemies of Allah", wrong: ["The angels", "The Prophets", "The believers"], why: "And remember the Day that the enemies of Allah will be gathered to the Fire." },
        { q: "Who will be gathered together, per Ibn Kathir?", a: "The first of them with the last", wrong: ["Only the first", "Only the last", "Only leaders"], why: "The keepers of Hell will gather the first of them with the last of them." },
        { tf: true, q: "41:19 is a reminder to think about that Day.", why: "Remind these idolators of the Day when they will be gathered." }
      ]
    },
    {
      slug: "ears-eyes-and-skin-speak",
      title: "Ears, eyes and skin speak",
      line: "Their ears, eyes and skins will testify about what they did.",
      facts: ["Every deed will be told", "Not a letter is hidden"],
      quote: q41(20),
      source: ik(20, "Ibn Kathir says their limbs will testify to all their deeds, earlier and later; not a single letter will be concealed.", "not a single letter will be concealed"),
      difficulty: 2,
      questions: [
        { q: "What will testify against them, in 41:20?", a: "Their ears, eyes and skins", wrong: ["Their friends", "Their houses", "Their animals"], why: "Their hearing and their eyes and their skins will testify against them as to what they used to do." },
        { q: "How much will be hidden, per Ibn Kathir?", a: "Not a single letter", wrong: ["Half of it", "Most of it", "All small deeds"], why: "All their deeds, earlier and later; not a single letter will be concealed." },
        { tf: true, q: "Our own bodies will speak about our deeds.", why: "Their hearing and their eyes and their skins will testify against them." }
      ]
    },
    {
      slug: "why-do-you-testify",
      title: "Why do you testify?",
      line: "They will ask their skins: Why do you testify against us?",
      facts: ["Allah makes all things speak", "He created us the first time"],
      quote: q41(21),
      source: ik(21, "Ibn Kathir says they will blame their limbs, and their limbs will answer that Allah made them speak.", "they will blame their limbs and their skins when they testify against them"),
      difficulty: 2,
      questions: [
        { q: "What will they ask their skins, in 41:21?", a: "Why do you testify against us?", wrong: ["Where were you?", "Are you tired?", "Who made you?"], why: "And they will say to their skins: Why do you testify against us?" },
        { q: "What will the skins answer?", a: "Allah has caused us to speak", wrong: ["We chose to", "We were paid", "We do not know"], why: "Allah has caused us to speak, as He causes all things to speak." },
        { q: "To whom will we return, in 41:21?", a: "To Allah", wrong: ["To the earth", "To our tribes", "To our homes"], why: "He created you the first time, and to Him you are made to return." }
      ]
    },
    {
      slug: "the-servant-who-argued",
      title: "The servant who argued",
      line: "A man accepts no witness but himself, so his limbs speak.",
      facts: ["The Prophet ﷺ smiled at this", "His own hands and feet spoke"],
      quote: q41(21),
      source: hadith("muslim", "2969", "Anas ibn Malik", "Sahih", "The Prophet ﷺ smiled and told of a servant who will accept no witness but himself; then his mouth is sealed and his hands and feet speak of his deeds.", "it would be said to his hands and feet to speak and they would speak of his deeds"),
      difficulty: 3,
      questions: [
        { q: "What did the servant ask for, per Muslim 2969?", a: "No witness but himself", wrong: ["A lawyer", "His friends", "More time"], why: "I do not deem valid any witness against me but my own self." },
        { q: "What spoke about his deeds?", a: "His hands and feet", wrong: ["His mouth", "His friends", "His house"], why: "It would be said to his hands and feet to speak and they would speak of his deeds." },
        { tf: true, q: "The Prophet ﷺ smiled when he told this.", why: "We were in the company of Allah's Messenger ﷺ when he smiled." }
      ]
    },
    {
      slug: "you-could-not-hide",
      title: "You could not hide",
      line: "You did not hide from your own ears, eyes and skin.",
      facts: ["They thought Allah did not know", "Allah hears every whisper"],
      quote: q41(22),
      source: hadith("bukhari", "4817", "Abdullah ibn Mas'ud", "Sahih", "Three men by the Kabah asked if Allah hears them; one said if He hears loud talk, He hears quiet talk too. Then 41:22 was revealed.", "If He can hear when we talk in a loud tone, then He can also hear when we speak in a low tone"),
      difficulty: 3,
      questions: [
        { q: "What did the men wonder, per Bukhari 4817?", a: "Does Allah hear what we say?", wrong: ["Will it rain?", "Who is king?", "Where is food?"], why: "One of them said: Do you think that Allah hears what we say?" },
        { q: "What did the third man say?", a: "If He hears loud talk, He hears quiet talk", wrong: ["He hears nothing", "He hears only prayers", "He hears only kings"], why: "If He can hear when we talk in a loud tone, then He can also hear when we speak in a low tone." },
        { q: "What did they wrongly think, in 41:22?", a: "Allah did not know much of their deeds", wrong: ["Allah knows all", "Angels write all", "They were watched"], why: "But you thought that Allah knew not much of what you were doing." }
      ]
    },
    {
      slug: "a-thought-that-ruined",
      title: "A thought that ruined",
      line: "Their wrong thought about their Lord brought them to ruin.",
      facts: ["They thought Allah did not see", "Think well of Allah and obey"],
      quote: q41(23),
      source: ik(23, "Ibn Kathir says their belief that Allah did not know much of their deeds is what doomed them.", "your belief that Allah did not know much of what you were doing, is what has caused you to be doomed"),
      difficulty: 3,
      questions: [
        { q: "What ruined them, in 41:23?", a: "Their thought about their Lord", wrong: ["Their poverty", "Their weakness", "Bad luck"], why: "And that thought of yours which you thought about your Lord, has brought you to destruction." },
        { q: "What was that thought, per Ibn Kathir?", a: "Allah did not know much of their deeds", wrong: ["Allah is Merciful", "Allah is One", "Allah is near"], why: "Your belief that Allah did not know much of what you were doing." },
        { tf: true, q: "Knowing Allah sees us helps us do good.", why: "Their belief that Allah did not know much of what they did is what doomed them." }
      ]
    },
    {
      slug: "no-way-back",
      title: "No way back",
      line: "Patient or not, they cannot win Allah's pleasure there.",
      facts: ["Excuses are not accepted then", "Seek His pleasure now"],
      quote: q41(24),
      source: ik(24, "Ibn Kathir says even if they try to please Allah and offer excuses then, nothing of that will be accepted.", "even if they try to please Allah and offer excuses, nothing of that will be accepted from them"),
      difficulty: 3,
      questions: [
        { q: "Will excuses help them then, per Ibn Kathir?", a: "No, none are accepted", wrong: ["Yes, all", "Some of them", "Only long ones"], why: "Even if they try to please Allah and offer excuses, nothing of that will be accepted from them." },
        { q: "What does seeking to please Allah mean, per Ibn Jarir?", a: "Asking to go back to this world", wrong: ["Giving charity", "Fasting", "Praying"], why: "They will ask to go back to this world, but this plea will not be answered." },
        { tf: true, q: "The time to seek Allah's pleasure is in this life.", why: "In the Hereafter their plea to go back will not be answered." }
      ]
    },
    {
      slug: "bad-companions",
      title: "Bad companions",
      line: "Bad companions made their evil deeds look good to them.",
      facts: ["Devils of men and jinn", "They think they are guided"],
      quote: q41(25),
      source: ik(25, "Ibn Kathir says Allah appointed for them companions from the devils of men and jinn who made their deeds look attractive.", "they made their deeds attractive to them in the past"),
      difficulty: 2,
      questions: [
        { q: "What did the companions do, in 41:25?", a: "Made evil look good", wrong: ["Warned them", "Taught them truth", "Helped the poor"], why: "We have assigned for them intimate companions who have made fair seeming to them what was before them and what was behind them." },
        { q: "Who were these companions, per Ibn Kathir?", a: "Devils of men and jinn", wrong: ["Angels", "Prophets", "Scholars"], why: "Close companions from among the devils of man and jinn." },
        { tf: true, q: "Choosing good friends matters a lot.", why: "Bad companions made their deeds attractive to them." }
      ]
    },
    {
      slug: "do-not-listen-to-this-quran",
      title: "Do not listen to this Quran",
      line: "They said: Do not listen to the Quran; drown it out.",
      facts: ["They whistled to confuse", "We are told to listen in silence"],
      quote: q41(26),
      source: ik(26, "Ibn Kathir says Allah commanded us to be different from them: when the Quran is recited, listen and be silent.", "Allah commanded us to be different from that"),
      difficulty: 2,
      questions: [
        { q: "What did the disbelievers say, in 41:26?", a: "Listen not to this Quran", wrong: ["Listen closely", "Learn it", "Write it down"], why: "And those who disbelieve say: Listen not to this Quran, and make noise in the midst of its recitation." },
        { q: "What should we do when the Quran is recited, per 7:204?", a: "Listen and be silent", wrong: ["Talk over it", "Leave", "Whistle"], why: "So, when the Quran is recited, listen to it, and be silent that you may receive mercy (7:204)." },
        { q: "How did they make noise, per Ibn Kathir?", a: "Whistling to confuse", wrong: ["Singing praise", "Clapping in joy", "Ringing bells"], why: "Whistling and trying to make the Messenger of Allah ﷺ confused when he recited Quran." }
      ]
    },
    {
      slug: "a-just-recompense",
      title: "A just recompense",
      line: "Allah will repay them for the worst of what they did.",
      facts: ["A warning for blocking the Quran", "Allah repays with justice"],
      quote: q41(27),
      source: ik(27, "Ibn Kathir says this is in return for what they did when they heard the Quran.", "in return for what they do when they hear the Qur"),
      difficulty: 3,
      questions: [
        { q: "What will Allah requite them for, in 41:27?", a: "The worst of what they did", wrong: ["Their good deeds", "Their sleep", "Their travels"], why: "Certainly, We shall requite them the worst of what they used to do." },
        { q: "What is it in return for, per Ibn Kathir?", a: "How they treated the Quran", wrong: ["Their poverty", "Their weakness", "Their age"], why: "In return for what they do when they hear the Quran." },
        { tf: true, q: "How we treat the Quran matters to Allah.", why: "This is in return for what they do when they hear the Quran." }
      ]
    },
    {
      slug: "the-recompense-of-the-enemies",
      title: "The recompense of the enemies",
      line: "That is the recompense of Allah's enemies, for denying His ayat.",
      facts: ["They denied Allah's ayat", "Their home is the Fire"],
      quote: q41(28),
      source: ik(28, "Ibn Kathir explains the Fire is the recompense of the enemies of Allah for denying His ayat.", "That is the recompense of the enemies of Allah"),
      difficulty: 3,
      questions: [
        { q: "Why is this their recompense, in 41:28?", a: "They denied Allah's ayat", wrong: ["They were poor", "They were weak", "They were young"], why: "A recompense for that they used to deny Our Ayat." },
        { q: "Who are called enemies of Allah in 41:28?", a: "Those who deny His ayat", wrong: ["Those who repent", "Those who pray", "Those who give"], why: "That is the recompense of the enemies of Allah, for that they used to deny Our Ayat." },
        { tf: false, q: "Denying Allah's ayat has no result.", why: "That is the recompense of the enemies of Allah: the Fire." }
      ]
    },
    {
      slug: "show-us-who-misled-us",
      title: "Show us who misled us",
      line: "They will ask Allah to show them who led them astray.",
      facts: ["Followers turn on leaders", "Ali said: Iblis and Adam's son"],
      quote: q41(29),
      source: ik(29, "Ali said those who led them astray are Iblis and the son of Adam who killed his brother.", "Iblis and the son of Adam who killed his brother"),
      difficulty: 3,
      questions: [
        { q: "What will they ask, in 41:29?", a: "Show us who led us astray", wrong: ["Forgive our leaders", "Send us home", "Give us gold"], why: "Our Lord! Show us those among Jinn and men who led us astray." },
        { q: "Who are they, per Ali?", a: "Iblis and the son of Adam who killed his brother", wrong: ["Fir'awn and Haman", "Qarun and Haman", "Ad and Thamud"], why: "Iblis and the son of Adam who killed his brother." },
        { q: "Who first set the example of killing, per the hadith?", a: "The first son of Adam", wrong: ["Iblis", "Fir'awn", "Qarun"], why: "He was the first one who set the precedent of killing another." }
      ]
    },
    {
      slug: "our-lord-is-allah-then-stand-firm",
      title: "Our Lord is Allah, then stand firm",
      line: "Those who say our Lord is Allah and stand firm receive angels.",
      facts: ["Stand firm on Tawhid", "Do not turn to other gods"],
      quote: q41(30),
      source: hadith("muslim", "38", "Sufyan ibn Abdullah ath-Thaqafi", "Sahih", "Sufyan asked for one thing about Islam he would never need to ask again. The Prophet ﷺ said: Say I believe in Allah, then stand firm.", "Say I affirm my faith in Allah and then remain steadfast to it"),
      difficulty: 2,
      questions: [
        { q: "What do they say, in 41:30?", a: "Our Lord is Allah", wrong: ["Our lord is wealth", "We are free", "We are strong"], why: "Verily, those who say: Our Lord is Allah, and then they stand firm." },
        { q: "What did the Prophet ﷺ tell Sufyan, per Muslim 38?", a: "Say I believe in Allah, then stand firm", wrong: ["Travel far", "Stay silent", "Gather wealth"], why: "Say I affirm my faith in Allah and then remain steadfast to it." },
        { q: "What does stand firm mean, per Abu Bakr?", a: "Not associating anything with Allah", wrong: ["Standing all night", "Never sitting", "Living long"], why: "Abu Bakr said: Those are the ones who do not associate anything with Allah." }
      ]
    },
    {
      slug: "fear-not-nor-grieve",
      title: "Fear not, nor grieve",
      line: "Angels descend: Fear not, nor grieve; rejoice in Paradise.",
      facts: ["Fear not what lies ahead", "Grieve not for what is left behind"],
      quote: q41(30),
      source: ik(30, "Ibn Kathir says the angels tell them not to grieve for what they left behind, for the angels will take care of it.", "for what you have left behind of worldly things, children, family, wealth and debt"),
      difficulty: 2,
      questions: [
        { q: "What do the angels say, in 41:30?", a: "Fear not, nor grieve", wrong: ["Hurry up", "Go back", "Wait here"], why: "On them the angels will descend saying: Fear not, nor grieve!" },
        { q: "What glad tidings do they bring?", a: "Paradise that was promised", wrong: ["Gold on earth", "A long life", "A big house"], why: "But receive the glad tidings of Paradise which you have been promised!" },
        { q: "When do the angels come, per Zayd bin Aslam?", a: "At death, in the grave, and at resurrection", wrong: ["Only at birth", "Only on Fridays", "Never"], why: "They will give him glad tidings when he dies, in his grave, and when he is resurrected." }
      ]
    },
    {
      slug: "your-friends-in-both-worlds",
      title: "Your friends in both worlds",
      line: "Angels say: We are your friends in this world and the next.",
      facts: ["They protect by Allah's command", "They stay with believers after"],
      quote: q41(31),
      source: ik(31, "Ibn Kathir says the angels will reassure the believers and take them across the Sirat to the Gardens of delight.", "we will reassure you on the Day of Resurrection and will take you across the Sirat"),
      difficulty: 2,
      questions: [
        { q: "What do the angels say, in 41:31?", a: "We were your friends", wrong: ["We never knew you", "We were strangers", "We were far"], why: "We have been your friends in the life of this world and are so in the Hereafter." },
        { q: "Where will the angels take believers, per Ibn Kathir?", a: "Across the Sirat to Paradise", wrong: ["Back to earth", "To a desert", "To a palace on earth"], why: "We will take you across the Sirat and bring you to the Gardens of delight." },
        { q: "What will they have in Paradise, in 41:31?", a: "All that their souls desire", wrong: ["Only water", "Only shade", "A little"], why: "Therein you shall have all that your souls desire, and all for which you ask." }
      ]
    },
    {
      slug: "a-welcome-from-the-forgiving",
      title: "A welcome from the Forgiving",
      line: "Paradise is a welcome gift from the Oft-Forgiving.",
      facts: ["He forgave their sins", "He covered their faults"],
      quote: q41(32),
      source: ik(32, "Ibn Kathir says it is a welcoming gift from the One Who forgave their sins and concealed their faults.", "a welcoming gift and a blessing from the One Who has forgiven your sins"),
      difficulty: 1,
      questions: [
        { q: "What is Paradise called, in 41:32?", a: "An entertainment from the Oft-Forgiving", wrong: ["A test", "A market", "A school"], why: "An entertainment from the Oft-Forgiving, Most Merciful." },
        { q: "What did Allah do with their faults, per Ibn Kathir?", a: "Concealed them", wrong: ["Shouted them", "Wrote them on walls", "Doubled them"], why: "The One Who has forgiven you, concealed your faults and been Kind and Merciful." },
        { tf: true, q: "Paradise is a gift of Allah's mercy.", why: "A welcoming gift and a blessing from the One Who has forgiven your sins." }
      ]
    },
    {
      slug: "the-best-speech",
      title: "The best speech",
      line: "Who speaks better than one who calls to Allah and does good?",
      facts: ["Practice what you preach", "Say: I am one of the Muslims"],
      quote: q41(33),
      source: ik(33, "Ibn Kathir says this person follows what he says, so it benefits him as well as others.", "he himself follows that which he says, so it benefits him as well as others"),
      difficulty: 2,
      questions: [
        { q: "Who has the best speech, in 41:33?", a: "One who invites to Allah and does good", wrong: ["The loudest", "The richest", "The funniest"], why: "And who is better in speech than he who invites to Allah, and does righteous deeds." },
        { q: "What does this caller do, per Ibn Kathir?", a: "Follows what he says", wrong: ["Says but never does", "Only argues", "Stays quiet"], why: "He himself follows that which he says, so it benefits him as well as others." },
        { q: "Who is foremost in calling to Allah?", a: "The Messenger of Allah ﷺ", wrong: ["The kings", "The poets", "The traders"], why: "The Messenger of Allah ﷺ is the foremost among people in this regard." }
      ]
    },
    {
      slug: "repel-evil-with-good",
      title: "Repel evil with good",
      line: "Repel evil with what is better, and an enemy becomes a friend.",
      facts: ["Good and evil are not equal", "Kindness can melt enmity"],
      quote: q41(34),
      source: ik(34, "Ibn Kathir says when someone wrongs you, treat him well; this leads to reconciliation, love and empathy.", "this good deed will lead to reconciliation, love and empathy"),
      difficulty: 2,
      questions: [
        { q: "How should we repel evil, in 41:34?", a: "With what is better", wrong: ["With more evil", "With shouting", "With silence forever"], why: "Repel the evil with one which is better." },
        { q: "What can the enemy become?", a: "A close friend", wrong: ["A worse enemy", "A stranger", "A king"], why: "Then verily he, between whom and you there was enmity, will become as though he was a close friend." },
        { q: "What does kindness lead to, per Ibn Kathir?", a: "Reconciliation and love", wrong: ["More fights", "Loneliness", "Shame"], why: "This good deed will lead to reconciliation, love and empathy." }
      ]
    },
    {
      slug: "only-the-patient",
      title: "Only the patient",
      line: "Only the patient and the greatly blessed are given this.",
      facts: ["Patience when angry", "Forgiving when wronged"],
      quote: q41(35),
      source: ik(35, "Ibn Abbas said Allah commands believers to be patient when angry, forbearing with ignorance, and forgiving when mistreated.", "Allah commands the believers to be patient when they feel angry"),
      difficulty: 3,
      questions: [
        { q: "Who is given this good trait, in 41:35?", a: "Those who are patient", wrong: ["The quick-tempered", "The proud", "The careless"], why: "But none is granted it except those who are patient." },
        { q: "What does Allah command when we feel angry, per Ibn Abbas?", a: "Be patient", wrong: ["Shout back", "Take revenge", "Leave home"], why: "Allah commands the believers to be patient when they feel angry." },
        { q: "What happens if believers do this, per Ibn Abbas?", a: "Enemies become like close friends", wrong: ["They lose everything", "Nothing changes", "They become weak"], why: "Allah will save them from the Shaytan and subdue their enemies to them until they become like close friends." }
      ]
    },
    {
      slug: "seek-refuge-in-allah",
      title: "Seek refuge in Allah",
      line: "If Shaytan whispers evil to you, seek refuge in Allah.",
      facts: ["Only Allah stops Shaytan", "He is the All-Hearer, All-Knower"],
      quote: q41(36),
      source: ik(36, "Ibn Kathir says the whispers of Shaytan can only be dealt with by seeking refuge with the Creator.", "cannot be dealt with except by seeking refuge with the Creator"),
      difficulty: 2,
      questions: [
        { q: "What should we do when Shaytan whispers, in 41:36?", a: "Seek refuge in Allah", wrong: ["Argue with him", "Ignore Allah", "Give up"], why: "And if an evil whisper from Shaytan tries to turn you away, then seek refuge in Allah." },
        { q: "How are the whispers dealt with, per Ibn Kathir?", a: "Only by seeking refuge with Allah", wrong: ["By being kind to him", "By running", "By sleeping"], why: "They cannot be dealt with except by seeking refuge with the Creator." },
        { q: "Which names end 41:36?", a: "The All-Hearer, the All-Knower", wrong: ["The First, the Last", "The King, the Holy", "The Rich, the Praised"], why: "Verily, He is the All-Hearer, the All-Knower." }
      ]
    }
  ]
};

/** Ayahs 37 to 54: signs in the sky and earth, the protected Book, the knowledge of the Hour, and signs within ourselves. */
const FUSSILAT_THREE: DeepUnit = {
  key: "fussilat3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-41",
  name: "Fussilat, ayahs 37 to 54",
  kind: "skill",
  lessonType: "surah",
  surahName: "Fussilat",
  lessons: [
    {
      slug: "sun-moon-night-and-day",
      title: "Sun, moon, night and day",
      line: "Night, day, sun and moon are among Allah's signs.",
      facts: ["They help us count time", "Worship days, months and years"],
      quote: q41(37),
      source: ik(37, "Ibn Kathir says Allah gave the sun and moon separate orbits so that people may know nights, days, weeks, months and years.", "so that by the variations in their movements man may know the stages of night and day, of weeks, months and years"),
      difficulty: 1,
      questions: [
        { q: "Which signs are named in 41:37?", a: "Night, day, sun and moon", wrong: ["Rivers and seas", "Trees and hills", "Birds and fish"], why: "And from among His signs are the night and the day, and the sun and the moon." },
        { q: "What do their movements teach us, per Ibn Kathir?", a: "Days, weeks, months and years", wrong: ["Nothing", "Only colors", "Only weather"], why: "So that by the variations in their movements man may know the stages of night and day, of weeks, months and years." },
        { tf: true, q: "The sun gives its own light; the moon reflects light.", why: "He created the sun with its shining light, and the moon with its reflected light." }
      ]
    },
    {
      slug: "prostrate-to-allah-alone",
      title: "Prostrate to Allah alone",
      line: "Bow to Allah Who made the sun and moon, not to them.",
      facts: ["Creations are not gods", "Worship only the Creator"],
      quote: q41(37),
      source: ik(37, "Ibn Kathir says the sun and moon are created things, subject to Allah's dominion and control.", "they are created entities which are in a state of enthrallment to Him, subject to His dominion and control"),
      difficulty: 1,
      questions: [
        { q: "To whom should we prostrate, in 41:37?", a: "To Allah Who created them", wrong: ["To the sun", "To the moon", "To the stars"], why: "Do not prostrate yourselves to the sun nor to the moon, but prostrate yourselves to Allah Who created them." },
        { q: "What are the sun and moon, per Ibn Kathir?", a: "Created things under His control", wrong: ["Gods", "Eternal beings", "Angels"], why: "They are created entities, subject to His dominion and control." },
        { tf: false, q: "Worship of others along with Allah benefits us.", why: "Your worship of Him will be of no benefit to you if you worship others alongside Him." }
      ]
    },
    {
      slug: "they-never-tire",
      title: "They never tire",
      line: "If people are too proud, the angels glorify Him without tiring.",
      facts: ["The angels glorify night and day", "Allah needs no one's worship"],
      quote: q41(38),
      source: ik(38, "Ibn Kathir says those with your Lord are the angels, who glorify Him night and day and never tire.", "glorify Him night and day, and never are they tired"),
      difficulty: 2,
      questions: [
        { q: "Who glorify Allah night and day, per Ibn Kathir?", a: "The angels", wrong: ["The kings", "The idols", "The stars"], why: "Those who are with your Lord are the angels, says Ibn Kathir." },
        { q: "Do they ever tire, in 41:38?", a: "Never", wrong: ["Often", "At night", "On holidays"], why: "Glorify Him night and day, and never are they tired." },
        { tf: true, q: "Allah does not need our worship; we need it.", why: "If people are too proud, there are those with your Lord who glorify Him night and day." }
      ]
    },
    {
      slug: "the-earth-comes-alive",
      title: "The earth comes alive",
      line: "Dry earth comes alive with rain; so will the dead.",
      facts: ["Rain brings crops and fruits", "A sign of the Resurrection"],
      quote: q41(39),
      source: ik(39, "Ibn Kathir says this is among the signs of Allah's ability to bring the dead back to life.", "signs of His ability to bring the dead back to life"),
      difficulty: 1,
      questions: [
        { q: "What happens to barren earth with rain, in 41:39?", a: "It stirs to life", wrong: ["It stays dry", "It turns to stone", "It floods away"], why: "But when We send down water to it, it is stirred to life and growth." },
        { q: "What does this sign show, per Ibn Kathir?", a: "Allah can raise the dead", wrong: ["Rain is random", "Nothing", "Earth is old"], why: "Signs of His ability to bring the dead back to life." },
        { tf: true, q: "Allah is Able to do all things.", why: "Indeed He is Able to do all things." }
      ]
    },
    {
      slug: "not-hidden-from-us",
      title: "Not hidden from Us",
      line: "Those who twist Allah's ayat are not hidden from Him.",
      facts: ["Ilhad: twisting the meaning", "Do what you will; He sees"],
      quote: q41(40),
      source: ik(40, "Ibn Abbas said Al-Ilhad means putting words in their improper places.", "means putting words in their improper places"),
      difficulty: 3,
      questions: [
        { q: "What does Ilhad mean, per Ibn Abbas?", a: "Putting words in wrong places", wrong: ["Reading slowly", "Memorizing", "Writing neatly"], why: "Ibn Abbas said: Al-Ilhad means putting words in their improper places." },
        { q: "Who is better, in 41:40?", a: "One who comes secure on the Last Day", wrong: ["One cast into the Fire", "Both are equal", "Neither"], why: "Is he who is cast into the Fire better or he who comes secure on the Day of Resurrection?" },
        { q: "What does Do what you will mean, per Mujahid?", a: "A warning, for He sees all", wrong: ["Do anything freely", "A reward", "A game"], why: "Do what you will is a threat. Meaning, He knows and sees all that you do." }
      ]
    },
    {
      slug: "an-honorable-book",
      title: "An honorable Book",
      line: "The Quran is an honorable, well-protected Book.",
      facts: ["The Reminder is the Quran", "No one can produce its like"],
      quote: q41(41),
      source: ik(41, "Ibn Kathir says the Quran is protected and preserved, and nobody can produce anything like it.", "it is protected and preserved, and nobody can produce anything like it"),
      difficulty: 1,
      questions: [
        { q: "What is the Reminder, per Qatadah?", a: "The Quran", wrong: ["A poem", "A song", "A letter"], why: "Ad-Dahhak, As-Suddi and Qatadah said: This is the Quran." },
        { q: "How is the Book described, in 41:41?", a: "Honorable and well-protected", wrong: ["Old and forgotten", "Weak and broken", "Secret"], why: "And verily, it is an honorable well-fortified respected Book." },
        { tf: true, q: "No one can produce anything like the Quran.", why: "It is protected and preserved, and nobody can produce anything like it." }
      ]
    },
    {
      slug: "falsehood-cannot-reach-it",
      title: "Falsehood cannot reach it",
      line: "Falsehood cannot come to it from before it or behind it.",
      facts: ["No way to corrupt it", "From the All-Wise, Praiseworthy"],
      quote: q41(42),
      source: ik(42, "Ibn Kathir says there is no way to corrupt the Quran, because it was sent down by the Lord of the worlds.", "there is no way to corrupt it, because it has been sent down by the Lord of the worlds"),
      difficulty: 2,
      questions: [
        { q: "What cannot come to the Quran, in 41:42?", a: "Falsehood", wrong: ["Readers", "Students", "Light"], why: "Falsehood cannot come to it from before it or behind it." },
        { q: "Why can it not be corrupted, per Ibn Kathir?", a: "It is from the Lord of the worlds", wrong: ["It is hidden", "It is short", "It is new"], why: "There is no way to corrupt it, because it has been sent down by the Lord of the worlds." },
        { q: "Which names end 41:42?", a: "The All-Wise, Worthy of all praise", wrong: ["The First, the Last", "The Strong, the Firm", "The King, the Holy"], why: "Sent down by the All-Wise, Worthy of all praise." }
      ]
    },
    {
      slug: "said-to-messengers-before",
      title: "Said to Messengers before",
      line: "Nothing is said to you but what was said to Messengers before.",
      facts: ["They were rejected too", "So be patient like them"],
      quote: q41(43),
      source: ik(43, "Qatadah said just as the Messengers before bore their people's insults with patience, so too the Prophet ﷺ must be patient.", "Just as they bore their people"),
      difficulty: 2,
      questions: [
        { q: "What was said to the Prophet ﷺ, in 41:43?", a: "What was said to Messengers before", wrong: ["Something brand new", "Only praise", "Nothing at all"], why: "Nothing is said to you except what was said to the Messengers before you." },
        { q: "What lesson does Qatadah draw?", a: "Be patient like them", wrong: ["Give up", "Fight back", "Stay home"], why: "Just as they bore their people's insults with patience, so too you must bear your people's insults with patience." },
        { q: "What two things does Allah possess, in 41:43?", a: "Forgiveness and painful punishment", wrong: ["Gold and silver", "Land and sea", "Night and day"], why: "Verily, your Lord is the Possessor of forgiveness, and also the Possessor of painful punishment." }
      ]
    },
    {
      slug: "a-guide-and-a-cure",
      title: "A guide and a cure",
      line: "For those who believe, the Quran is a guide and a cure.",
      facts: ["A cure for doubts", "Deniers do not understand it"],
      quote: q41(44),
      source: ik(44, "Ibn Kathir says the Quran is guidance for the believer's heart and a cure for doubts and confusion.", "is guidance for his heart and a cure for the doubts and confusion"),
      difficulty: 2,
      questions: [
        { q: "What is the Quran for believers, in 41:44?", a: "A guide and a cure", wrong: ["A puzzle", "A burden", "A story only"], why: "Say: It is for those who believe, a guide and a cure." },
        { q: "What does it cure, per Ibn Kathir?", a: "Doubts and confusion", wrong: ["Only fevers", "Hunger", "Tiredness"], why: "This Quran, for the one who believes in it, is guidance for his heart and a cure for the doubts and confusion." },
        { q: "Why was it sent in Arabic, per 41:44?", a: "So they could not complain it was foreign", wrong: ["It is the only language", "For poets only", "By chance"], why: "If We had sent this as a Quran in a foreign language, they would have said: Why are not its verses explained in detail?" }
      ]
    },
    {
      slug: "called-from-far-away",
      title: "Called from far away",
      line: "Deniers are like people called from a place far away.",
      facts: ["The call is far from their hearts", "They do not understand"],
      quote: q41(44),
      source: ik(44, "Mujahid said far away means far away from their hearts.", "Far away from their hearts"),
      difficulty: 3,
      questions: [
        { q: "What is in the deniers' ears, in 41:44?", a: "Heaviness", wrong: ["Music", "Wisdom", "Light"], why: "And as for those who disbelieve, there is heaviness in their ears." },
        { q: "Far away from what, per Mujahid?", a: "From their hearts", wrong: ["From Makkah", "From the sea", "From the sky"], why: "Mujahid said: Far away from their hearts." },
        { tf: true, q: "An open heart helps us benefit from the Quran.", why: "For believers it is guidance for the heart; for deniers it is as if called from far away." }
      ]
    },
    {
      slug: "the-scripture-of-musa",
      title: "The Scripture of Musa",
      line: "Musa was given the Scripture, but people disputed over it.",
      facts: ["A Word delayed their punishment", "The Reckoning is on the Last Day"],
      quote: q41(45),
      source: ik(45, "Ibn Kathir says Allah's Word delays the Reckoning until the Day of Resurrection; otherwise the matter would have been settled.", "to delay the Reckoning until the Day of Resurrection"),
      difficulty: 3,
      questions: [
        { q: "Who was given the Scripture, in 41:45?", a: "Musa", wrong: ["Nuh", "Ibrahim", "Yunus"], why: "And indeed We gave Musa the Scripture, but dispute arose therein." },
        { q: "What did the Word that went forth do, per Ibn Kathir?", a: "Delayed the Reckoning", wrong: ["Ended the world", "Gave them riches", "Made them kings"], why: "To delay the Reckoning until the Day of Resurrection." },
        { tf: true, q: "Musa was also rejected by some, like the Prophet ﷺ.", why: "They disbelieved in him and did not show him any respect." }
      ]
    },
    {
      slug: "for-yourself-or-against-yourself",
      title: "For yourself or against yourself",
      line: "Good deeds help you; evil deeds harm you. Allah is never unjust.",
      facts: ["Each deed returns to its doer", "No one punished without a Messenger"],
      quote: q41(46),
      source: ik(46, "Ibn Kathir says Allah punishes no one except after establishing proof and sending a Messenger to him.", "He does not punish anyone except after establishing proof against him and sending a Messenger to him"),
      difficulty: 2,
      questions: [
        { q: "Whom does a good deed benefit, in 41:46?", a: "The one who does it", wrong: ["Only others", "No one", "Only the rich"], why: "Whosoever does righteous good deed, it is for himself." },
        { q: "Is Allah unjust to His servants?", a: "Not at all", wrong: ["Sometimes", "Rarely", "To some"], why: "And your Lord is not at all unjust to His servants." },
        { q: "When does Allah punish, per Ibn Kathir?", a: "Only after sending a Messenger", wrong: ["Without warning", "At random", "Before birth"], why: "He does not punish anyone except after establishing proof against him and sending a Messenger to him." }
      ]
    },
    {
      slug: "the-knowledge-of-the-hour",
      title: "The knowledge of the Hour",
      line: "Only Allah knows when the Hour will come.",
      facts: ["Jibril asked the Prophet ﷺ", "The one asked knew no more"],
      quote: q41(47),
      source: hadith("bukhari", "50", "Abu Hurairah", "Sahih", "When Jibril asked the Prophet ﷺ about the Hour, he said the one asked knows no better than the one asking.", "The answerer has no better knowledge than the questioner"),
      difficulty: 2,
      questions: [
        { q: "To whom is the knowledge of the Hour, in 41:47?", a: "To Allah alone", wrong: ["To fortune tellers", "To kings", "To scholars"], why: "To Him is referred the knowledge of the Hour." },
        { q: "What did the Prophet ﷺ answer Jibril, per Bukhari 50?", a: "The one asked knows no better", wrong: ["Next year", "In ten years", "Soon"], why: "The answerer has no better knowledge than the questioner." },
        { tf: false, q: "Someone can tell us the exact date of the Hour.", why: "No one knows about that apart from Him." }
      ]
    },
    {
      slug: "every-fruit-and-every-birth",
      title: "Every fruit and every birth",
      line: "Allah knows every fruit that grows and every baby born.",
      facts: ["Not a leaf falls without His knowledge", "He knows every womb"],
      quote: q41(47),
      source: ik(47, "Ibn Kathir says all of that is known to Him; nothing is hidden from your Lord, not even a speck of dust.", "nothing is hidden from your Lord the weight of a speck of dust"),
      difficulty: 2,
      questions: [
        { q: "What does Allah know, in 41:47?", a: "Every fruit and every birth", wrong: ["Only big events", "Only the sky", "Only the past"], why: "No fruit comes out of its sheath, nor does a female conceive nor brings forth young, except by His knowledge." },
        { q: "Which ayah does Ibn Kathir link about leaves?", a: "6:59", wrong: ["2:2", "1:1", "114:1"], why: "Not a leaf falls, but He knows it (6:59)." },
        { q: "Where are My partners? What will they answer?", a: "None of us bears witness to it", wrong: ["They are coming", "They are hiding", "Ask them"], why: "They will say: We inform You that none of us bears witness to it!" }
      ]
    },
    {
      slug: "no-place-of-refuge",
      title: "No place of refuge",
      line: "What they called upon will vanish, and they find no refuge.",
      facts: ["False gods go away", "No escape from Allah's decree"],
      quote: q41(48),
      source: ik(48, "Ibn Kathir says their false gods will go away and be of no benefit to them.", "they will go away, and will be of no benefit to them"),
      difficulty: 2,
      questions: [
        { q: "What happens to their false gods, in 41:48?", a: "They disappear", wrong: ["They help", "They argue", "They grow"], why: "And those whom they used to invoke before shall disappear from them." },
        { q: "What will they realize, in 41:48?", a: "They have no refuge", wrong: ["They are safe", "They can go home", "They won"], why: "And they will perceive that they have no place of refuge." },
        { tf: true, q: "Only Allah can truly help us.", why: "Their false gods will go away, and will be of no benefit to them." }
      ]
    },
    {
      slug: "never-tired-of-asking",
      title: "Never tired of asking",
      line: "Man never tires of asking for good, but despairs at hardship.",
      facts: ["Do not lose hope in Allah", "Hard times also pass"],
      quote: q41(49),
      source: ik(49, "Ibn Kathir says when trials touch him, man thinks he will never experience anything good again.", "he thinks that he will never experience anything good again"),
      difficulty: 2,
      questions: [
        { q: "What does man never tire of, in 41:49?", a: "Asking for good", wrong: ["Thanking Allah", "Giving charity", "Being patient"], why: "Man does not get tired of asking for good." },
        { q: "What does he think in hardship, per Ibn Kathir?", a: "Good will never come again", wrong: ["This will pass", "Allah is near", "I will be patient"], why: "He thinks that he will never experience anything good again." },
        { tf: false, q: "A believer should lose all hope in hard times.", why: "41:49 blames the one who gives up all hope and is lost in despair." }
      ]
    },
    {
      slug: "this-is-due-to-me",
      title: "This is due to me",
      line: "After ease returns, he says: I earned this myself.",
      facts: ["Ungrateful and careless", "He even doubts the Hour"],
      quote: q41(50),
      source: ik(50, "Ibn Kathir says when blessings come after difficulty, he says this is because of me, I deserve this.", "this is because of me, because I deserve this from my Lord"),
      difficulty: 3,
      questions: [
        { q: "What does he say after mercy comes, in 41:50?", a: "This is due to my merit", wrong: ["Alhamdulillah", "Allah gave this", "I am grateful"], why: "He is sure to say: This is due to my merit." },
        { q: "What does he think of the Hour, in 41:50?", a: "It will not come", wrong: ["It is near", "It is certain", "He fears it"], why: "I think not that the Hour will be established." },
        { tf: true, q: "Blessings should make us thank Allah, not boast.", why: "When he is given some blessing, he becomes careless, arrogant and ungrateful." }
      ]
    },
    {
      slug: "long-prayers-only-in-hardship",
      title: "Long prayers only in hardship",
      line: "In ease he turns away; in hardship he makes long prayers.",
      facts: ["Remember Allah in ease too", "Short words, full meaning"],
      quote: q41(51),
      source: ik(51, "Ibn Kathir says in ease he turns away from obedience, but when hardship touches him he asks at length.", "he turns away from doing acts of obedience and is too proud to obey the commands of Allah"),
      difficulty: 3,
      questions: [
        { q: "What does man do in ease, in 41:51?", a: "Turns away and becomes arrogant", wrong: ["Prays more", "Gives more", "Thanks more"], why: "And when We show favor to man, he turns away and becomes arrogant." },
        { q: "What does he do in hardship?", a: "Makes long prayers", wrong: ["Stays silent", "Laughs", "Travels"], why: "But when evil touches him, then he has recourse to long supplications." },
        { tf: true, q: "We should remember Allah in good times and bad.", why: "41:51 blames the one who turns away in ease and only calls on Allah in hardship." }
      ]
    },
    {
      slug: "who-is-more-astray",
      title: "Who is more astray?",
      line: "Who is more astray than one who denies the Quran from Allah?",
      facts: ["Think before you reject", "Opposition leads far from guidance"],
      quote: q41(52),
      source: ik(52, "Ibn Kathir says such a person follows a path that leads far away from guidance.", "is following a path that leads far away from guidance"),
      difficulty: 2,
      questions: [
        { q: "What does 41:52 ask?", a: "What if it is from Allah and you deny it?", wrong: ["Who wrote it?", "How long is it?", "Where is it?"], why: "Tell me, if it is from Allah, and you disbelieve in it?" },
        { q: "Where does opposition lead, per Ibn Kathir?", a: "Far away from guidance", wrong: ["To wisdom", "To peace", "To wealth"], why: "He is following a path that leads far away from guidance." },
        { tf: true, q: "Thinking carefully about the Quran is wise.", why: "What do you think your position is before the One Who revealed it?" }
      ]
    },
    {
      slug: "signs-in-the-horizons-and-ourselves",
      title: "Signs in the horizons and ourselves",
      line: "Allah will show His signs in the universe and within ourselves.",
      facts: ["Until the truth is clear", "Allah is Witness over all"],
      quote: q41(53),
      source: ik(53, "Ibn Kathir says the signs within ourselves may mean man and his body, which shows the wisdom of the Creator.", "man and his physical composition"),
      difficulty: 2,
      questions: [
        { q: "Where will Allah show His signs, in 41:53?", a: "In the universe and within ourselves", wrong: ["Only in books", "Only in dreams", "Nowhere"], why: "We will show them Our signs in the universes, and within themselves." },
        { q: "Until what, in 41:53?", a: "Until it is clear this is the truth", wrong: ["Until they sleep", "Until rain falls", "Until they leave"], why: "Until it becomes manifest to them that this is the truth." },
        { q: "What may signs within mean, per Ibn Kathir?", a: "The human body and its make-up", wrong: ["Our houses", "Our clothes", "Our names"], why: "Ibn Kathir says the signs may be man and his physical composition." }
      ]
    },
    {
      slug: "surrounding-all-things",
      title: "Surrounding all things",
      line: "They doubt meeting their Lord, yet He surrounds all things.",
      facts: ["The Hour will surely come", "All creation is in His control"],
      quote: q41(54),
      source: ik(54, "Ibn Kathir says all of creation is subject to Allah's control, dominion and knowledge.", "all of creation is subject to His control, dominion and knowledge"),
      difficulty: 2,
      questions: [
        { q: "What do they doubt, in 41:54?", a: "Meeting their Lord", wrong: ["The sunrise", "The rain", "Their names"], why: "Lo, verily, they are in doubt concerning the meeting with their Lord." },
        { q: "What does Allah surround, in 41:54?", a: "All things", wrong: ["Only the sky", "Only Makkah", "A few things"], why: "Verily, He is surrounding all things!" },
        { tf: true, q: "Whatever Allah wills happens, and what He does not will does not.", why: "Whatever He wills happens, and whatever He does not will does not happen." }
      ]
    }
  ]
};

export const FUSSILAT_UNITS: readonly DeepUnit[] = [FUSSILAT_ONE, FUSSILAT_TWO, FUSSILAT_THREE];
