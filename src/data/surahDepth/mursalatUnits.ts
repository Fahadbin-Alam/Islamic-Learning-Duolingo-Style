import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Al-Mursalat ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Mursalat 77:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_77_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Mursalat 77:${ayah}`,
    url: `https://quran.com/77:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 77:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q77 = (ayah: number) => quranQuote(77, ayah);


/** Ayahs 1 to 15: the winds and the angels, the promise that will come, and the Day of Sorting Out. */
const MURSALAT_ONE: DeepUnit = {
  key: "mursalat1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-77",
  name: "Al-Mursalat, ayahs 1-15",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Mursalat",
  lessons: [
    {
      slug: "revealed-in-a-cave",
      title: "Revealed in a cave at Mina",
      line: "Al-Mursalat came to the Prophet ﷺ in a cave at Mina.",
      facts: ["Revealed in Makkah", "Learned straight from his mouth"],
      quote: q77(1),
      source: hadith("bukhari", "1830", "Abdullah ibn Masud", "Sahih", "Ibn Masud said they were with the Prophet ﷺ in a cave at Mina when Al-Mursalat was revealed, and he heard it straight from his mouth.", "in a cave at Mina, when Surat-wal-Mursalat were revealed"),
      difficulty: 1,
      questions: [
        { q: "Where was the Prophet ﷺ when Al-Mursalat came?", a: "In a cave at Mina", wrong: ["In Madinah's market", "On a ship", "In Syria"], why: "While we were in the company of the Prophet ﷺ in a cave at Mina, when Surat-wal-Mursalat were revealed." },
        { q: "How did Ibn Masud learn the surah?", a: "Straight from his mouth", wrong: ["From a book", "From a dream", "From a poet"], why: "I heard it directly from his mouth as soon as he recited its revelation." },
        { tf: false, q: "Ibn Masud learned Al-Mursalat years after it came down.", why: "As soon as he recited its revelation." }
      ]
    },
    {
      slug: "the-last-surah-she-heard",
      title: "The last surah she heard",
      line: "Umm al-Fadl last heard him ﷺ recite it at Maghrib.",
      facts: ["Umm al-Fadl: Ibn Abbas's mother", "Recited in Maghrib"],
      quote: q77(1),
      source: hadith("bukhari", "763", "Ibn Abbas", "Sahih", "Umm al-Fadl heard her son Ibn Abbas recite Al-Mursalat and said it was the last surah she heard from the Messenger of Allah, in the Maghrib prayer.", "it was the last Sura I heard from Allah"),
      difficulty: 2,
      questions: [
        { q: "In which prayer did he recite it, per Umm al-Fadl?", a: "Maghrib", wrong: ["Fajr", "Dhuhr", "Isha"], why: "He recited it in the Maghrib prayer." },
        { q: "Who reminded Umm al-Fadl of it?", a: "Her son Ibn Abbas", wrong: ["Her neighbor", "A traveler", "Her father"], why: "Umm al-Fadl heard me reciting Wal Mursalati Urfan, and said, O my son! Your recitation made me remember." },
        { tf: true, q: "Al-Mursalat was the last surah she heard from the Prophet ﷺ.", why: "It was the last Sura I heard from Allah's Messenger." }
      ]
    },
    {
      slug: "winds-sent-forth",
      title: "Winds sent forth",
      line: "Allah swears by winds that blow, storm and spread clouds.",
      facts: ["Al-Asifat: strong winds", "An-Nashirat: spreading winds"],
      quote: q77(3),
      source: ik(3, "Ibn Masud said the first three are the wind; Ibn Kathir says An-Nashirat are winds that spread clouds across the sky.", "the winds that scatter into clouds in the horizons of the sky"),
      difficulty: 2,
      questions: [
        { q: "What are the first three, per Ibn Masud?", a: "The wind", wrong: ["The stars", "The rivers", "The birds"], why: "He, Ibn Masud, said, The wind. He said the same about Al-Asifat Asfa and An-Nashirat Nashra." },
        { q: "What do An-Nashirat do, per Ibn Kathir?", a: "Scatter clouds across the sky", wrong: ["Dig the earth", "Light the night", "Freeze the sea"], why: "An-Nashirat are the winds that scatter into clouds in the horizons of the sky." },
        { tf: true, q: "Ayah 7:57 says winds come as glad news before rain.", why: "And it is He Who sends the winds as heralds of glad tidings, going before His mercy. (7:57)" }
      ]
    },
    {
      slug: "angels-who-separate",
      title: "Angels who separate truth",
      line: "Angels bring revelation that separates truth from falsehood.",
      facts: ["Al-Fariqat: those who separate", "Al-Mulqiyat: those who deliver"],
      quote: q77(5),
      source: ik(4, "Ibn Kathir says, with no difference of opinion, these are the angels who bring revelation, separating truth from falsehood.", "separating between the truth and falsehood, guidance and misguidance"),
      difficulty: 2,
      questions: [
        { q: "Who are Al-Fariqat and Al-Mulqiyat?", a: "The angels", wrong: ["The winds", "The clouds", "The mountains"], why: "The Fariqat that separate, the Mulqiyat that remind, meaning, the angels." },
        { q: "What do they separate?", a: "Truth from falsehood", wrong: ["Land from sea", "Day from night", "Gold from silver"], why: "Separating between the truth and falsehood, guidance and misguidance, and the lawful and the forbidden." },
        { tf: false, q: "Scholars differed on whether Al-Fariqat are the angels.", why: "There is no difference of opinion, because they, the angels, are the ones who descend with Allah's command." }
      ]
    },
    {
      slug: "what-you-are-promised",
      title: "What you are promised",
      line: "The oaths affirm that the promised Day will surely come.",
      facts: ["Wa'd: a promise", "No escaping the Hour"],
      quote: q77(7),
      source: ik(7, "Ibn Kathir says the Hour, the resurrection and the reward for every deed will come to pass, with no avoiding it.", "All of this will occur, meaning it will come to pass and there is no avoiding it"),
      difficulty: 1,
      questions: [
        { q: "What is sworn about in 77:7?", a: "What we are promised will occur", wrong: ["Rain will come", "The sea will dry", "Kings will rule"], why: "Surely, what you are promised will occur." },
        { q: "How is every doer rewarded, per Ibn Kathir?", a: "Based on his deed", wrong: ["By his wealth", "By his family", "By chance"], why: "The rewarding of every doer of a deed based upon his deed." },
        { tf: false, q: "Some deeds will go without any reward.", why: "The rewarding of every doer of a deed based upon his deed." }
      ]
    },
    {
      slug: "stars-sky-and-mountains",
      title: "Stars, sky and mountains",
      line: "Stars lose their light, the sky splits, and mountains vanish.",
      facts: ["Tumisat: lost their light", "Nusifat: blown away"],
      quote: q77(10),
      source: ik(10, "Ibn Kathir says the mountains will be removed until no sight or trace of them remains.", "they will be removed and no sight or trace of them will remain"),
      difficulty: 2,
      questions: [
        { q: "What happens to the stars, per 77:8?", a: "They lose their light", wrong: ["They grow bigger", "They turn blue", "They sing"], why: "Then when the stars lose their lights, meaning, their light will leave." },
        { q: "What happens to the mountains, per 77:10?", a: "They are blown away", wrong: ["They grow taller", "They turn to gold", "They stay"], why: "And when the mountains are blown away." },
        { tf: false, q: "Some trace of the mountains will remain.", why: "They will be removed and no sight or trace of them will remain." }
      ]
    },
    {
      slug: "the-messengers-gathered",
      title: "The Messengers gathered",
      line: "On that Day the Messengers are gathered at their set time.",
      facts: ["Uqqitat: given a set time", "Ayah 5:109"],
      quote: q77(11),
      source: ik(11, "Ibn Abbas said Uqqitat means gathered; Ibn Zayd linked it to the Day Allah gathers the Messengers together.", "On the Day when Allah will gather the Messengers together"),
      difficulty: 2,
      questions: [
        { q: "What does Uqqitat mean, per Ibn Abbas?", a: "Gathered", wrong: ["Hidden", "Forgotten", "Scattered"], why: "Ibn Abbas said that Uqqitat means Gathered." },
        { q: "Which ayah did Ibn Zayd compare it to?", a: "5:109", wrong: ["1:1", "2:255", "112:1"], why: "On the Day when Allah will gather the Messengers together. (5:109)" },
        { tf: true, q: "The Messengers will be brought forward on that Day.", why: "And the Prophets and the witnesses will be brought forward. (39:69)" }
      ]
    },
    {
      slug: "the-day-of-sorting-out",
      title: "The Day of Sorting Out",
      line: "The Day of Sorting Out separates people by their deeds.",
      facts: ["Yawm al-Fasl", "Woe to deniers: ten times"],
      quote: q77(13),
      source: ik(13, "Ibn Kathir says the Day of Sorting Out is when the earth and heavens are changed and all appear before Allah, the One.", "This is the Day of Sorting Out"),
      difficulty: 2,
      questions: [
        { q: "For what Day are the signs postponed, per 77:13?", a: "The Day of Sorting Out", wrong: ["A market day", "A harvest day", "A festival"], why: "For the Day of Sorting Out." },
        { q: "How many times does woe to the deniers appear?", a: "Ten", wrong: ["Two", "Five", "Twenty"], why: "Woe that Day to the deniers! appears in 77:15, 19, 24, 28, 34, 37, 40, 45, 47 and 49." },
        { tf: true, q: "On that Day all will appear before Allah, the One.", why: "And they will appear before Allah, the One, the Irresistible. (14:48)" }
      ]
    }
  ]
};

/** Ayahs 16 to 28: lessons from past nations, how Allah makes us, and the earth, mountains and sweet water. */
const MURSALAT_TWO: DeepUnit = {
  key: "mursalat2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-77",
  name: "Al-Mursalat, ayahs 16-28",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Mursalat",
  lessons: [
    {
      slug: "the-nations-before",
      title: "The nations before",
      line: "Nations who rejected the Messengers were destroyed.",
      facts: ["Al-Awwalun: the ancients", "History is a lesson"],
      quote: q77(16),
      source: ik(16, "Ibn Kathir says the ancients destroyed were those who rejected the Messengers and opposed what they brought.", "those who rejected the Messengers and opposed what they came to them with"),
      difficulty: 2,
      questions: [
        { q: "Whom did Allah destroy, per 77:16?", a: "The ancients who denied", wrong: ["The animals", "The angels", "The believers"], why: "Did We not destroy the ancients? Meaning, those who rejected the Messengers." },
        { q: "Who will follow them, per 77:17?", a: "Later generations like them", wrong: ["No one", "Only kings", "Only children"], why: "So shall We make later generations to follow them, meaning, from those who are similar to them." },
        { tf: true, q: "Allah deals the same way with criminals of every age.", why: "Thus do We deal with the criminals." }
      ]
    },
    {
      slug: "from-a-weak-water",
      title: "From a weak water",
      line: "Allah made us from weak water and kept us safe.",
      facts: ["Qarar makin: a safe place", "Allah's power is great"],
      quote: q77(21),
      source: ik(20, "Ibn Kathir says the water is weak next to the Creator's power; Allah keeps it in the womb, made ready to protect it.", "weak and despised in comparison to the power of the Creator"),
      difficulty: 2,
      questions: [
        { q: "What were we created from, per 77:20?", a: "A weak water", wrong: ["Gold", "Fire", "Light"], why: "Did We not create you from a despised water?" },
        { q: "Where did Allah place it, per 77:21?", a: "A place of safety", wrong: ["A desert", "A river", "A cave"], why: "Then We placed it in a place of safety." },
        { tf: true, q: "The first creation shows Allah can create again.", why: "Using the beginning of creation to support the idea of repeating it." }
      ]
    },
    {
      slug: "the-best-to-measure",
      title: "The best to measure",
      line: "Allah set a known time for each baby; He measures perfectly.",
      facts: ["Qadr: measuring", "Six to nine months"],
      quote: q77(23),
      source: ik(22, "Ibn Kathir says a known period means a fixed time, from six to nine months, and Allah is the best to measure.", "for a fixed period of time, which is from six months to nine months"),
      difficulty: 2,
      questions: [
        { q: "For how long, per 77:22?", a: "A known period", wrong: ["Forever", "One day", "No time"], why: "For a known period." },
        { q: "What is the known period, per Ibn Kathir?", a: "Six to nine months", wrong: ["One week", "Two years", "Ten days"], why: "For a fixed period of time, which is from six months to nine months." },
        { tf: true, q: "Allah calls Himself the best to measure.", why: "So We did measure; and We are the best to measure." }
      ]
    },
    {
      slug: "the-earth-holds-us",
      title: "The earth holds us",
      line: "The earth holds the living on its back and the dead inside.",
      facts: ["Kifat: a place that holds", "For the living and the dead"],
      quote: q77(26),
      source: ik(25, "Ash-Shabi said the earth's inside is for the dead and its surface for the living; Ibn Abbas said Kifat means shelter.", "Its interior is for your dead and its surface is for your living"),
      difficulty: 2,
      questions: [
        { q: "What does Kifat mean, per Ibn Abbas?", a: "A place of shelter", wrong: ["A mountain top", "A river bed", "A star"], why: "Ibn Abbas said, Kifat means a place of shelter." },
        { q: "What is the earth's surface for, per Ash-Shabi?", a: "The living", wrong: ["The angels", "The stars", "No one"], why: "Its interior is for your dead and its surface is for your living." },
        { tf: true, q: "77:25 says the earth is for the living and the dead.", why: "Have We not made the earth Kifat for the living and the dead?" }
      ]
    },
    {
      slug: "firm-mountains-sweet-water",
      title: "Firm mountains, sweet water",
      line: "Mountains hold the earth steady and Allah gives sweet water.",
      facts: ["Rawasi: firm mountains", "Furat: sweet water"],
      quote: q77(27),
      source: ik(27, "Ibn Kathir says the mountains keep the earth from shaking, and Furat is cold, delicious water from clouds or springs.", "cold and delicious water from the clouds"),
      difficulty: 1,
      questions: [
        { q: "What are the fixed towers, per Ibn Kathir?", a: "The mountains", wrong: ["Tall palaces", "Big trees", "Lighthouses"], why: "And have placed therein fixed towers, meaning, the mountains." },
        { q: "What is Furat water?", a: "Cold, delicious water", wrong: ["Salty water", "Muddy water", "Hot water"], why: "Meaning, cold and delicious water from the clouds or from the springs of the earth." },
        { tf: false, q: "Mountains make the earth shake and sway.", why: "The earth is held in place with them so that it does not shake and sway." }
      ]
    },
    {
      slug: "reflect-then-believe",
      title: "Reflect, then believe",
      line: "Seeing Allah's signs and still denying Him is a great loss.",
      facts: ["Tafakkur: reflecting", "Signs point to the Creator"],
      quote: q77(28),
      source: ik(28, "Ibn Kathir says woe is for whoever reflects on creation that shows the Creator's greatness, yet still rejects Him.", "woe to whoever reflects upon these created things which demonstrate the greatness of their Creator"),
      difficulty: 2,
      questions: [
        { q: "What do created things show, per Ibn Kathir?", a: "The greatness of the Creator", wrong: ["Nothing at all", "Only chance", "Only beauty"], why: "These created things which demonstrate the greatness of their Creator." },
        { q: "Who earns the woe in 77:28?", a: "Whoever sees the signs yet denies", wrong: ["Whoever travels", "Whoever sleeps early", "Whoever trades"], why: "Woe to whoever reflects upon these created things, then after that continues to reject Him." },
        { tf: false, q: "Reflecting on creation leads away from Allah.", why: "These created things demonstrate the greatness of their Creator." }
      ]
    }
  ]
};

/** Ayahs 29 to 50: the Day of Decision, Allah cannot be harmed, the reward of the pious, and bowing to Allah. */
const MURSALAT_THREE: DeepUnit = {
  key: "mursalat3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-77",
  name: "Al-Mursalat, ayahs 29-50",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Mursalat",
  lessons: [
    {
      slug: "a-shade-that-gives-no-shade",
      title: "A shade that gives no shade",
      line: "The smoke of the Fire looks like shade but protects no one.",
      facts: ["Zill: shade", "Only true shelter is Allah's mercy"],
      quote: q77(31),
      source: ik(31, "Ibn Kathir says the smoke of the flame has no real shade and will not protect from its heat.", "This means it will not protect them from the heat of the flame"),
      difficulty: 2,
      questions: [
        { q: "To what will deniers be told to go, per 77:29?", a: "What they used to deny", wrong: ["A garden", "Their homes", "A river"], why: "Depart you to that which you used to deny!" },
        { q: "Does that shade protect them, per 77:31?", a: "No, it is of no use", wrong: ["Yes, fully", "Only at night", "Only for the rich"], why: "Neither shady nor of any use against the fierce flame of the Fire." },
        { tf: false, q: "The smoke of the Fire gives cool shade.", why: "It will not protect them from the heat of the flame." }
      ]
    },
    {
      slug: "no-excuses-that-day",
      title: "No excuses that Day",
      line: "Deniers will not be allowed to make excuses on that Day.",
      facts: ["The proof is set", "The Day has stages"],
      quote: q77(36),
      source: ik(36, "Ibn Kathir says they will not be able to speak or be allowed to make excuses, for the proof is set against them.", "nor will they be granted permission to speak so that they can make excuses"),
      difficulty: 2,
      questions: [
        { q: "What will they not do, per 77:35?", a: "Speak", wrong: ["Walk", "See", "Hear"], why: "That will be a Day when they shall not speak." },
        { q: "What are they not permitted, per 77:36?", a: "To put forth any excuse", wrong: ["To sit", "To look up", "To drink"], why: "And they will not be permitted to put forth any excuse." },
        { tf: true, q: "Ibn Kathir says the Day of Judgement happens in stages.", why: "The courts of the Day of Judgement will occur in stages." }
      ]
    },
    {
      slug: "the-day-of-decision",
      title: "The Day of Decision",
      line: "Allah gathers the first and the last on one plain.",
      facts: ["Yawm al-Fasl", "First and last together"],
      quote: q77(38),
      source: ik(38, "Ibn Kathir says Allah will gather all of them by His power on one plain, make them hear the caller and see.", "He will gather all of them by His power on one common plane"),
      difficulty: 2,
      questions: [
        { q: "Whom does Allah bring together, per 77:38?", a: "Us and the people of old", wrong: ["Only kings", "Only one nation", "Only the young"], why: "That will be a Day of Decision! We have brought you and the men of old together!" },
        { q: "Where will all be gathered, per Ibn Kathir?", a: "On one common plain", wrong: ["In many cities", "On ships", "In caves"], why: "He will gather all of them by His power on one common plane." },
        { tf: false, q: "People will be gathered in many separate places that Day.", why: "He will gather all of them by His power on one common plane." }
      ]
    },
    {
      slug: "no-one-can-harm-allah",
      title: "No one can harm Allah",
      line: "No plot can harm Allah, and no one can escape His rule.",
      facts: ["Hadith Qudsi", "Ask Allah for guidance"],
      quote: q77(39),
      source: hadith("muslim", "2577", "Abu Dharr", "Sahih", "Allah says: O My servants, you will never be able to harm Me or benefit Me; all are astray except whom I guide, so ask Me for guidance.", "you will not attain harming Me so as to harm Me"),
      difficulty: 3,
      questions: [
        { q: "What does 77:39 challenge the deniers to do?", a: "Use their plot against Allah", wrong: ["Build a wall", "Count the stars", "Run a race"], why: "So, if you have a plot, use it against Me!" },
        { q: "Can anyone harm Allah, per the hadith?", a: "No, never", wrong: ["Yes, kings can", "Yes, if many join", "Only the jinn"], why: "O My servants, you will not attain harming Me so as to harm Me." },
        { q: "What should we ask Allah for, per the hadith?", a: "Guidance", wrong: ["Fame", "Revenge", "Long sleep"], why: "All of you are astray except for those I have guided, so seek guidance of Me and I shall guide you." },
        { tf: true, q: "Allah forbade oppression for Himself.", why: "O My servants, I have forbidden oppression for Myself." }
      ]
    },
    {
      slug: "shades-and-springs",
      title: "Shades and springs",
      line: "The pious enjoy shade, springs and any fruit they wish.",
      facts: ["Muttaqun: the pious", "Fruit they desire"],
      quote: q77(41),
      source: ik(42, "Ibn Kathir says the pious will be among gardens and springs and have whatever fruits they request.", "they will have whatever they request"),
      difficulty: 1,
      questions: [
        { q: "Where will the pious be, per 77:41?", a: "Amidst shades and springs", wrong: ["In deserts", "On mountains", "In a city"], why: "Verily, those who had Taqwa, shall be amidst shades and springs." },
        { q: "What fruits will they have, per 77:42?", a: "Such as they desire", wrong: ["Only dates", "Only grapes", "None"], why: "And fruits, such as they desire." },
        { tf: true, q: "The pious do their duties and leave the forbidden.", why: "Worship Him by performing the obligations and abandoning the forbidden things." }
      ]
    },
    {
      slug: "eat-and-drink-in-comfort",
      title: "Eat and drink in comfort",
      line: "The doers of good are welcomed kindly to eat and drink.",
      facts: ["Muhsinun: doers of good", "Reward for deeds"],
      quote: q77(43),
      source: ik(43, "Ibn Kathir says eat and drink comfortably will be said to them out of kindness, as a reward for the good they did.", "this will be said to them out of kindness for them"),
      difficulty: 1,
      questions: [
        { q: "What are they told in 77:43?", a: "Eat and drink comfortably", wrong: ["Wait outside", "Go back", "Stay hungry"], why: "Eat and drink comfortably for that which you used to do." },
        { q: "Whom does Allah reward this way, per 77:44?", a: "The Muhsinin", wrong: ["The proud", "The lazy", "The liars"], why: "Verily, thus We reward the Muhsinin." },
        { tf: true, q: "These words are said to them out of kindness.", why: "This will be said to them out of kindness for them." }
      ]
    },
    {
      slug: "enjoy-for-a-little-while",
      title: "Enjoy for a little while",
      line: "Worldly enjoyment for deniers is short and brief.",
      facts: ["Qalil: a little", "This life is short"],
      quote: q77(46),
      source: ik(46, "Ibn Kathir says eat and enjoy yourselves for a little while is a warning; the time is short, small and brief.", "for a period of time that is short, small and brief"),
      difficulty: 2,
      questions: [
        { q: "For how long may they enjoy, per 77:46?", a: "A little while", wrong: ["Forever", "A thousand years", "Until they choose"], why: "Eat and enjoy yourselves for a little while." },
        { q: "What kind of command is it, per Ibn Kathir?", a: "A warning", wrong: ["A reward", "A gift", "A joke"], why: "It is commanding them with a command of threat and intimidation." },
        { tf: false, q: "The enjoyment of deniers in this world lasts forever.", why: "For a period of time that is short, small and brief." }
      ]
    },
    {
      slug: "they-would-not-bow",
      title: "They would not bow",
      line: "Told to bow down in prayer, the deniers proudly refused.",
      facts: ["Ruku': bowing", "Pride blocks prayer"],
      quote: q77(48),
      source: ik(48, "Ibn Kathir says when they were told to pray with the believers, they refused and turned away proudly.", "they refuse and turn away from it arrogantly"),
      difficulty: 2,
      questions: [
        { q: "What were they told in 77:48?", a: "Bow down", wrong: ["Sit down", "Run away", "Be quiet"], why: "And when it is said to them: Bow down yourself! They bow not down." },
        { q: "How did they refuse, per Ibn Kathir?", a: "Arrogantly", wrong: ["Sadly", "Sleepily", "Quietly asking"], why: "They refuse and turn away from it arrogantly." },
        { tf: true, q: "Ibn Kathir says they were called to pray in congregation.", why: "When these ignorant disbelievers are ordered to pray with the congregation, they refuse." }
      ]
    },
    {
      slug: "praying-together",
      title: "Praying together",
      line: "Prayer in congregation is twenty-seven times better than alone.",
      facts: ["Jama'ah: congregation", "27 times the reward"],
      quote: q77(48),
      source: hadith("bukhari", "645", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ said prayer in congregation is twenty seven times better than prayer offered alone.", "The prayer in congregation is twenty seven times superior"),
      difficulty: 1,
      questions: [
        { q: "How much better is prayer in congregation?", a: "Twenty seven times", wrong: ["Two times", "Ten times", "The same"], why: "The prayer in congregation is twenty seven times superior to the prayer offered by a person alone." },
        { q: "What is it compared with?", a: "Praying alone", wrong: ["Fasting", "Charity", "Sleeping"], why: "Superior to the prayer offered by a person alone." },
        { tf: true, q: "Joining the believers in prayer brings great reward.", why: "The prayer in congregation is twenty seven times superior." }
      ]
    },
    {
      slug: "what-speech-after-this",
      title: "What speech after this?",
      line: "If they reject this Quran, what words will they ever believe?",
      facts: ["Hadith: speech", "Ayah 45:6"],
      quote: q77(50),
      source: ik(50, "Ibn Kathir says if they do not believe in this Quran, then what talk will they believe in?", "then what talk will they believe in"),
      difficulty: 2,
      questions: [
        { q: "What does 77:50 ask?", a: "In what statement will they believe?", wrong: ["Where is the sea?", "Who is the king?", "When is the harvest?"], why: "Then in what statement after this will they believe?" },
        { q: "Which ayah asks the same, per Ibn Kathir?", a: "45:6", wrong: ["1:1", "2:2", "112:1"], why: "Then in which speech after Allah and His Ayat will they believe? (45:6)" },
        { tf: true, q: "No speech is greater than the Quran.", why: "If they do not believe in this Quran, then what talk will they believe in?" }
      ]
    }
  ]
};

export const MURSALAT_UNITS: readonly DeepUnit[] = [MURSALAT_ONE, MURSALAT_TWO, MURSALAT_THREE];
