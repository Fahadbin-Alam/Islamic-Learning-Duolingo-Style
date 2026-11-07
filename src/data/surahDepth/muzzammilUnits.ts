import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Al-Muzzammil ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Muzzammil 73:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_73_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Muzzammil 73:${ayah}`,
    url: `https://quran.com/73:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 73:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q73 = (ayah: number) => quranQuote(73, ayah);


/** Ayahs 1 to 4: the call to stand at night and to recite the Quran slowly. */
const MUZZAMMIL_ONE: DeepUnit = {
  key: "muzzammil1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-73",
  name: "Al-Muzzammil, ayahs 1 to 4",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Muzzammil",
  lessons: [
    {
      slug: "o-wrapped-one",
      title: "O you wrapped up",
      line: "Allah gently called the Prophet ﷺ to rise from his wrap.",
      facts: ["Muzzammil: the wrapped one", "A gentle call to prayer"],
      quote: q73(1),
      source: ik(1, "Ibn Abbas, Ad-Dahhak and As-Suddi said O you wrapped up means O you who are asleep; Allah told His Messenger to rise and pray.", "This means, O you who are asleep"),
      difficulty: 1,
      questions: [
        { q: "What does Muzzammil mean?", a: "The one wrapped up", wrong: ["The traveller", "The king", "The warrior"], why: "O you wrapped up!" },
        { q: "What does O you wrapped up mean, per Ibn Abbas?", a: "O you who are asleep", wrong: ["O you who are rich", "O you who are far", "O you who are sad"], why: "This means, O you who are asleep." },
        { tf: false, q: "Allah told the Prophet ﷺ to stay wrapped up and rest all night.", why: "He commands him to get up and stand in prayer to His Lord." }
      ]
    },
    {
      slug: "stand-the-night",
      title: "Stand the night, but a little",
      line: "The Prophet ﷺ was told to pray about half the night.",
      facts: ["Qiyam al-Layl: night prayer", "A little more or less is fine"],
      quote: q73(2),
      source: ik(3, "Ibn Kathir says Allah commanded standing in prayer for half the night, a little more or less, with no hardship in the small change.", "We have commanded you to stand in prayer for half of the night"),
      difficulty: 2,
      questions: [
        { q: "How much of the night was he told to stand?", a: "About half of it", wrong: ["Five minutes", "None of it", "Only the last hour"], why: "Half of it, or less than that, a little, or a little more." },
        { q: "Was a little more or less a problem?", a: "No, there was no hardship", wrong: ["Yes, it was a sin", "Yes, he had to repeat", "Only on Fridays"], why: "There is no hardship on you concerning that slight increase or decrease." },
        { tf: true, q: "Night prayer was a special duty for the Prophet ﷺ himself.", why: "This was obligatory upon him alone." }
      ]
    },
    {
      slug: "a-thankful-servant",
      title: "A thankful servant",
      line: "He prayed until his feet swelled, out of thankfulness to Allah.",
      facts: ["Shukr: thankfulness", "Worship is thanks to Allah"],
      quote: q73(2),
      source: hadith("bukhari", "1130", "Al-Mughirah ibn Shubah", "Sahih", "The Prophet ﷺ prayed at night until his feet swelled; when asked why, he said: Should I not be a thankful slave?", "Should I not be a thankful slave"),
      difficulty: 2,
      questions: [
        { q: "What happened to his feet from long prayer?", a: "They swelled", wrong: ["They were cut", "They froze", "Nothing"], why: "The Prophet ﷺ used to stand in the prayer till both his feet or legs swelled." },
        { q: "Why did he pray so much?", a: "To be a thankful servant", wrong: ["To be famous", "To win a contest", "To stay awake"], why: "Should I not be a thankful slave?" },
        { tf: false, q: "The Prophet ﷺ prayed long only because people watched him.", why: "He said: Should I not be a thankful slave?" }
      ]
    },
    {
      slug: "recite-slowly",
      title: "Recite the Quran slowly",
      line: "Tartil means reciting slowly so the heart can understand.",
      facts: ["Tartil: slow, clear recitation", "Think about what you read"],
      quote: q73(4),
      source: ik(4, "Ibn Kathir says Rattil means recite it slowly, which helps understanding and reflection; Aishah said he recited a surah so slowly it seemed longer than longer ones.", "recite it slowly, for that will help in understanding"),
      difficulty: 1,
      questions: [
        { q: "What does Tartil mean, per Ibn Kathir?", a: "Reciting slowly", wrong: ["Reciting fast", "Reciting silently", "Skipping ayahs"], why: "Recite it slowly, for that will help in understanding the Quran and contemplating it." },
        { q: "Why recite slowly?", a: "To understand and reflect", wrong: ["To finish late", "To sound older", "To tire out"], why: "For that will help in understanding the Quran and contemplating it." },
        { tf: true, q: "His slow recitation made a surah seem longer than longer ones.", why: "He used to recite the chapter slowly, so much so that it would be longer than chapters that were actually longer than it." }
      ]
    },
    {
      slug: "prolonging-the-sounds",
      title: "Stretching the sounds",
      line: "Anas said the Prophet ﷺ stretched the sounds as he recited.",
      facts: ["Madd: stretching a sound", "Bismillah recited with care"],
      quote: q73(4),
      source: hadith("bukhari", "5046", "Anas ibn Malik", "Sahih", "Anas was asked how the Prophet ﷺ recited; he said it had long stretched sounds, and recited the Bismillah stretching its words.", "It was characterized by the prolongation of certain sounds"),
      difficulty: 2,
      questions: [
        { q: "How did Anas describe his recitation?", a: "Certain sounds were stretched", wrong: ["Very fast", "Very quiet", "Without stopping"], why: "It was characterized by the prolongation of certain sounds." },
        { q: "Which words did Anas recite as an example?", a: "The Bismillah", wrong: ["Ayat al-Kursi", "Surah Al-Ikhlas", "The adhan"], why: "He then recited: In the Name of Allah, the Most Beneficent, the Most Merciful." },
        { tf: false, q: "The Prophet ﷺ rushed through his recitation.", why: "It was characterized by the prolongation of certain sounds." }
      ]
    },
    {
      slug: "move-your-heart",
      title: "Let the Quran move your heart",
      line: "Pause at the Quran's wonders; do not race to the end.",
      facts: ["Quality over speed", "Feel what you read"],
      quote: q73(4),
      source: ik(4, "Ibn Masud said do not rush through the Quran like poetry; stop at its amazing parts and let your heart move with it.", "Stop at its amazing parts and make your heart move with it"),
      difficulty: 2,
      questions: [
        { q: "What did Ibn Masud say to do at amazing parts?", a: "Stop and let the heart move", wrong: ["Skip them", "Read faster", "Close the book"], why: "Stop at its amazing parts and make your heart move with it." },
        { q: "What should not be your only concern?", a: "Reaching the end of the surah", wrong: ["Understanding", "Reflecting", "Saying it clearly"], why: "None of you should let his concern be to reach the end of the chapter." },
        { tf: true, q: "Ibn Masud warned against rushing the Quran like poetry.", why: "Do not rush through it like the hasty recitation of poetry." }
      ]
    },
    {
      slug: "a-beautiful-voice",
      title: "A beautiful voice",
      line: "Abu Musa was praised for his sweet voice in reciting.",
      facts: ["Beautify the Quran with your voice", "Dawud had a lovely voice"],
      quote: q73(4),
      source: hadith("bukhari", "5048", "Abu Musa", "Sahih", "The Prophet ﷺ told Abu Musa he had been given one of the sweet melodious voices of the family of Dawud.", "You have been given one of the mazamir"),
      difficulty: 2,
      questions: [
        { q: "Whom did the Prophet ﷺ praise for his voice?", a: "Abu Musa", wrong: ["Abu Jahl", "Abu Lahab", "Abu Talib"], why: "O Abu Musa! You have been given one of the mazamir." },
        { q: "Whose family's voices was his compared to?", a: "Dawud's", wrong: ["Firawn's", "Qarun's", "Haman's"], why: "One of the mazamir of the family of Dawud." },
        { tf: true, q: "Abu Musa said he would have beautified it more had he known.", why: "If I knew that you had been listening to my recitation, I would have truly beautified it for you." }
      ]
    }
  ]
};

/** Ayahs 5 to 9: the weighty Word, the night's special value, and devotion to the Lord of east and west. */
const MUZZAMMIL_TWO: DeepUnit = {
  key: "muzzammil2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-73",
  name: "Al-Muzzammil, ayahs 5 to 9",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Muzzammil",
  lessons: [
    {
      slug: "a-weighty-word",
      title: "A weighty Word",
      line: "The Quran is a heavy Word, great in meaning and in deeds.",
      facts: ["Thaqil: heavy, weighty", "The Quran asks for action"],
      quote: q73(5),
      source: ik(5, "Ibn Kathir says the Word is heavy in the deeds it asks for, and heavy at the time of revelation because of its greatness.", "it will be heavy at the time of its revelation due to its magnificence"),
      difficulty: 2,
      questions: [
        { q: "What does Thaqil mean?", a: "Heavy, weighty", wrong: ["Light", "Short", "Hidden"], why: "Verily, We shall send down to you a Word Thaqil." },
        { q: "Why was revelation heavy, per Ibn Kathir?", a: "Because of its greatness", wrong: ["It was long", "It was loud", "It was cold"], why: "It will be heavy at the time of its revelation due to its magnificence." },
        { tf: true, q: "Al-Hasan and Qatadah linked the weight to acting on it.", why: "Al-Hasan and Qatadah both said: The actions with it." }
      ]
    },
    {
      slug: "like-a-ringing-bell",
      title: "Like the ringing of a bell",
      line: "Revelation sometimes came like a bell and left him sweating.",
      facts: ["Wahy: revelation", "Jibril sometimes came as a man"],
      quote: q73(5),
      source: hadith("bukhari", "2", "Aishah", "Sahih", "The Prophet ﷺ said revelation sometimes came like the ringing of a bell, the hardest form; Aishah saw sweat on his forehead on a very cold day.", "noticed the sweat dropping from his forehead"),
      difficulty: 2,
      questions: [
        { q: "What did the hardest revelation sound like?", a: "The ringing of a bell", wrong: ["A drum", "Thunder", "A bird"], why: "Sometimes it is revealed like the ringing of a bell, this form of Inspiration is the hardest of all." },
        { q: "What did Aishah see on a very cold day?", a: "Sweat on his forehead", wrong: ["Snow", "Tears", "A smile"], why: "I saw the Prophet ﷺ being inspired divinely on a very cold day and noticed the sweat dropping from his forehead." },
        { tf: false, q: "The angel only ever came in his true form.", why: "Sometimes the Angel comes in the form of a man and talks to me." }
      ]
    },
    {
      slug: "rising-at-night",
      title: "The power of the night",
      line: "Night prayer trains the heart and tongue in a quiet time.",
      facts: ["Nashiah: hours of the night", "Fewer distractions at night"],
      quote: q73(6),
      source: ik(6, "Ibn Kathir says standing at night is better for training the heart and the tongue, since the day is busy and noisy.", "is better for training the heart and the tongue"),
      difficulty: 2,
      questions: [
        { q: "What does night prayer train, per Ibn Kathir?", a: "The heart and the tongue", wrong: ["The arms", "The eyes", "The feet"], why: "Standing at night for prayer is better for training the heart and the tongue." },
        { q: "Why is the day harder for reflection?", a: "People are busy and loud", wrong: ["The sun is bright", "Food is ready", "Birds sing"], why: "The daytime is the time for people to disperse and move about, to raise voices and be lively." },
        { tf: true, q: "Every hour of the night can be called Nashiah.", why: "Every hour of it is called Nashiah, so it refers to the periods of time." }
      ]
    },
    {
      slug: "best-voluntary-prayer",
      title: "The best extra prayer",
      line: "After the five prayers, the best prayer is prayer at night.",
      facts: ["Tahajjud: night prayer", "Also: Muharram fasts are best"],
      quote: q73(6),
      source: hadith("muslim", "1163", "Abu Hurairah", "Sahih", "The Prophet ﷺ said the most excellent prayer after the prescribed prayers is prayer during the night.", "the most excellent prayer after what is prescribed is prayer during the night"),
      difficulty: 2,
      questions: [
        { q: "Which extra prayer is the most excellent?", a: "Prayer at night", wrong: ["Prayer at noon", "Prayer at a market", "Prayer while eating"], why: "The most excellent prayer after what is prescribed is prayer during the night." },
        { q: "Which fast is best after Ramadan, per the hadith?", a: "In Allah's month Muharram", wrong: ["In Shawwal only", "Every Saturday", "In Rajab"], why: "The most excellent fast after Ramadan is God's month, al-Muharram." },
        { tf: false, q: "Night prayer is the least rewarded extra prayer.", why: "The most excellent prayer after what is prescribed is prayer during the night." }
      ]
    },
    {
      slug: "a-busy-day",
      title: "The day is for your needs",
      line: "The day is long and busy, so keep the night for worship.",
      facts: ["Sabh: busy time", "Balance work and worship"],
      quote: q73(7),
      source: ik(7, "Ibn Abbas said the long Sabh of the day means free time and sleep; Ibn Zayd said the day is for your needs, so leave the night for devotion.", "leave the night open for your religious devotion"),
      difficulty: 2,
      questions: [
        { q: "What is the lengthy Sabh in 73:7?", a: "The busy time of the day", wrong: ["A long river", "A tall tree", "A desert road"], why: "Verily, for you in the day is lengthy Sabh." },
        { q: "What did Ibn Zayd say to leave the night for?", a: "Religious devotion", wrong: ["Shopping", "Travel", "Games"], why: "Therefore, leave the night open for your religious devotion." },
        { tf: true, q: "Ibn Abbas explained Sabh as free time and sleep.", why: "Ibn Abbas, Ikrimah and Ata ibn Abi Muslim all said: Leisure time and sleep." }
      ]
    },
    {
      slug: "devote-yourself",
      title: "Devote yourself to Him",
      line: "Remember Allah often and make your worship for Him alone.",
      facts: ["Tabattul: full devotion", "Islam keeps family life too"],
      quote: q73(8),
      source: ik(8, "Ibn Abbas, Mujahid and others said devote yourself means make your worship solely for Him; the Prophet ﷺ forbade cutting off marriage for worship.", "make your worship solely for Him alone"),
      difficulty: 2,
      questions: [
        { q: "What does Tabattul mean, per Ibn Abbas?", a: "Worship for Him alone", wrong: ["Leaving the world", "Never marrying", "Living in caves"], why: "This means, make your worship solely for Him alone." },
        { q: "When should we busy ourselves with worship, per 94:7?", a: "When our tasks are done", wrong: ["Never", "Only in old age", "Only in Hajj"], why: "When you have completed your tasks and occupations, then busy yourself in His obedience and His worship." },
        { tf: false, q: "Devotion means giving up marriage forever.", why: "The Prophet ﷺ forbade At-Tabattul, which means total devotion to worship while avoiding getting married." }
      ]
    },
    {
      slug: "lord-of-east-and-west",
      title: "Lord of the east and the west",
      line: "Worship Allah alone, and rely on Him alone as your trustee.",
      facts: ["Wakil: trustee", "Worship and trust go together"],
      quote: q73(9),
      source: ik(9, "Ibn Kathir says Allah owns the east and the west; just as you single Him out for worship, single Him out for reliance.", "Just as you single Him out for worship, you should also single Him out for reliance"),
      difficulty: 2,
      questions: [
        { q: "Who is Lord of the east and the west?", a: "Allah", wrong: ["The sun", "Kings", "The wind"], why: "Lord of the east and the west; La ilaha illa Huwa, so take Him as a trustee." },
        { q: "What should we take Allah as, per 73:9?", a: "A trustee to rely on", wrong: ["A distant king", "A story", "A rumor"], why: "Therefore, take Him as a guardian and trustee." },
        { tf: true, q: "Surah Al-Fatihah also joins worship and asking help.", why: "You Alone we worship, and You Alone we ask for help. (1:5)" }
      ]
    }
  ]
};

/** Ayahs 10 to 19: patience with deniers, the lesson of Firawn, the great Day, and the Quran as a reminder. */
const MUZZAMMIL_THREE: DeepUnit = {
  key: "muzzammil3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-73",
  name: "Al-Muzzammil, ayahs 10 to 19",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Muzzammil",
  lessons: [
    {
      slug: "patient-with-what-they-say",
      title: "Patient with hurtful words",
      line: "Be patient with mean words and leave people in a kind way.",
      facts: ["Sabr: patience", "Hajr jamil: a graceful leaving"],
      quote: q73(10),
      source: ik(10, "Ibn Kathir says Allah told His Messenger to be patient with what the foolish said and to keep away from them nicely, in a way that is not blameworthy.", "keep away from them in a nice way"),
      difficulty: 1,
      questions: [
        { q: "What was the Prophet ﷺ told in 73:10?", a: "Be patient and leave kindly", wrong: ["Shout back", "Fight them", "Stop preaching"], why: "And be patient with what they say, and keep away from them in a good way." },
        { q: "What does a good way of leaving mean?", a: "A way that is not blameworthy", wrong: ["Slamming doors", "Insulting them", "Never speaking again"], why: "This means in a way that is not blameworthy." },
        { tf: false, q: "Muslims should answer insults with insults.", why: "Allah also commands him to keep away from them in a nice way." }
      ]
    },
    {
      slug: "strength-from-prayer",
      title: "Strength from prayer",
      line: "Night prayer and dhikr give strength to carry heavy tasks.",
      facts: ["As-Sa'di explains", "Then be patient"],
      quote: q73(10),
      source: saadi(73, 10, "As-Sa'di says Allah first ordered prayer and dhikr because they build a strong ability to bear heavy loads, and then ordered patience with the deniers' words.", "وذلك يحصل للعبد ملكة قوية في تحمل الأثقال"),
      difficulty: 2,
      questions: [
        { q: "What do prayer and dhikr give, per as-Sa'di on 73:10?", a: "Strength to bear burdens", wrong: ["More money", "Less sleep only", "Nothing"], why: "They build a strong ability to carry heavy things." },
        { q: "What came after the order to pray in Al-Muzzammil?", a: "Be patient with their words", wrong: ["Fight them", "Insult them", "Leave Makkah"], why: "Patience, and leaving them in a kind way." },
        { tf: true, q: "Leaving people kindly means leaving without harming them.", why: "As-Sa'di on 73:10." }
      ]
    },
    {
      slug: "leave-them-to-me",
      title: "Leave them to Me",
      line: "Allah handles rich deniers; their comfort lasts only a little.",
      facts: ["Wealth brings more duty", "Respite is short"],
      quote: q73(11),
      source: ik(11, "Ibn Kathir says Allah said leave Me to deal with the rich deniers; they were most able to obey and owed rights to others.", "leave Me to deal with the rich rejectors"),
      difficulty: 2,
      questions: [
        { q: "Who are the deniers described in 73:11?", a: "Those with good things of life", wrong: ["The poor", "The sick", "Children"], why: "Those who are in possession of good things of life." },
        { q: "Why were the rich more responsible?", a: "They were more able to obey", wrong: ["They were older", "They were louder", "They lived far"], why: "They are more able to obey than others besides them." },
        { tf: true, q: "The deniers were given respite only for a little while.", why: "And give them respite for a little, meaning, for a little while." }
      ]
    },
    {
      slug: "mountains-like-sand",
      title: "When mountains become sand",
      line: "On that Day, mountains will shake and turn into heaps of sand.",
      facts: ["Tarjuf: to quake", "The earth will be made flat"],
      quote: q73(14),
      source: ik(14, "Ibn Kathir says the mountains will become like hills of sand after being firm rock, until the whole earth is flat.", "they will become like hills of sand after they had been firm rocks"),
      difficulty: 2,
      questions: [
        { q: "What will the mountains become?", a: "Heaps of sand", wrong: ["Gold", "Ice", "Islands"], why: "And the mountains will be a heap of sand poured out." },
        { q: "What will the earth look like after?", a: "Flat, with no valleys or hills", wrong: ["Full of towers", "Covered in forests", "The same as now"], why: "The entire earth becomes a flat land and no curvature will be seen in it." },
        { tf: false, q: "The mountains will stay firm on that Day.", why: "They will become like hills of sand after they had been firm rocks." }
      ]
    },
    {
      slug: "a-witness-over-you",
      title: "A Messenger as witness",
      line: "Allah sent a Messenger to witness people's deeds.",
      facts: ["Shahid: a witness", "Like Musa to Firawn"],
      quote: q73(15),
      source: ik(15, "Ibn Kathir says Allah addresses Quraysh and all people: We sent you a Messenger witnessing your deeds, as We sent one to Firawn.", "witnessing your deeds"),
      difficulty: 2,
      questions: [
        { q: "What is the Messenger ﷺ called in 73:15?", a: "A witness over you", wrong: ["A king over you", "A guard", "A judge of trade"], why: "Verily, We have sent to you a Messenger to be a witness over you." },
        { q: "To whom was a Messenger also sent, per 73:15?", a: "Firawn", wrong: ["Qarun", "Namrud", "Abrahah"], why: "As We did send a Messenger to Fir'awn." },
        { tf: true, q: "The ayah speaks to Quraysh and to all mankind.", why: "Then addresses the disbelievers of the Quraysh, and along with them the rest of mankind." }
      ]
    },
    {
      slug: "lesson-of-firawn",
      title: "The lesson of Firawn",
      line: "Firawn disobeyed his Messenger, so Allah seized him firmly.",
      facts: ["History teaches", "Obey the Messenger ﷺ"],
      quote: q73(16),
      source: ik(16, "Ibn Kathir says beware of denying this Messenger lest what befell Firawn befall you, for this Messenger is even more noble than Musa.", "you should beware of denying this Messenger"),
      difficulty: 2,
      questions: [
        { q: "What did Firawn do with his Messenger?", a: "He disobeyed him", wrong: ["He followed him", "He crowned him", "He ignored no one"], why: "But Fir'awn disobeyed the Messenger ﷺ." },
        { q: "What warning does Ibn Kathir draw?", a: "Beware of denying this Messenger", wrong: ["Beware of the sea", "Beware of Egypt", "Beware of kings"], why: "You should beware of denying this Messenger, lest you be afflicted by that which befell Fir'awn." },
        { tf: false, q: "Ibn Kathir says Musa was greater than our Messenger ﷺ.", why: "Your Messenger is more noble and a greater than Prophet Musa, the son of Imran." }
      ]
    },
    {
      slug: "a-day-that-greys-children",
      title: "A Day of great fear",
      line: "That Day is so great it would turn children's hair grey.",
      facts: ["Allah's promise always comes", "Prepare with faith"],
      quote: q73(17),
      source: ik(18, "Ibn Kathir says the Day turns children grey because of its great horrors, and that Allah's promise of it will surely be fulfilled.", "the promise of this Day will be fulfilled"),
      difficulty: 3,
      questions: [
        { q: "How does 73:17 describe the Day?", a: "It makes children grey-headed", wrong: ["It is short", "It is quiet", "It is a feast"], why: "On a Day that will make the children gray-headed." },
        { q: "Will Allah's promise of that Day come true?", a: "Yes, it is certain", wrong: ["Maybe", "No", "Only for some"], why: "The promise of this Day will be fulfilled. This means it will occur and there is no way around it." },
        { tf: true, q: "The sky will split on that Day.", why: "Whereon the heaven will be cleft asunder?" }
      ]
    },
    {
      slug: "a-reminder",
      title: "A reminder for those who will",
      line: "The surah is a reminder; whoever wills takes a path to Allah.",
      facts: ["Tadhkirah: a reminder", "Choose the path to Allah"],
      quote: q73(19),
      source: ik(19, "Ibn Kathir says this surah is an admonition that people of understanding take benefit from, so whoever wills may take a path to his Lord.", "men of understanding receive admonition from it"),
      difficulty: 1,
      questions: [
        { q: "What does 73:19 call the surah?", a: "An admonition", wrong: ["A story", "A poem", "A riddle"], why: "Verily, this is an admonition." },
        { q: "Who benefits from the admonition?", a: "People of understanding", wrong: ["Only kings", "Only the old", "No one"], why: "Men of understanding receive admonition from it." },
        { tf: true, q: "Our will to follow guidance happens only by Allah's will.", why: "But you cannot will, unless Allah wills. (76:30)" }
      ]
    }
  ]
};

/** Ayah 20: night prayer made easy, the five prayers, zakah, charity and seeking forgiveness. */
const MUZZAMMIL_FOUR: DeepUnit = {
  key: "muzzammil4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-73",
  name: "Al-Muzzammil, ayah 20",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Muzzammil",
  lessons: [
    {
      slug: "allah-knows-your-night",
      title: "Allah knows your night",
      line: "They stood two thirds, half or a third of the night.",
      facts: ["Allah measures night and day", "He sees every effort"],
      quote: q73(20),
      source: ik(20, "Ibn Kathir says they prayed sometimes this much and sometimes that much, unable to stay consistent, so Allah eased it.", "sometimes like this and sometimes like that"),
      difficulty: 2,
      questions: [
        { q: "Which amounts of the night are named in 73:20?", a: "Two thirds, half, a third", wrong: ["All of it", "One minute", "Only dawn"], why: "Your Lord knows that you do stand a little less than two-thirds of the night, or half the night, or a third of the night." },
        { q: "Who measures the night and the day?", a: "Allah", wrong: ["The moon", "The people", "The stars"], why: "And Allah measures the night and the day." },
        { tf: false, q: "Night and day are always the same length.", why: "Sometimes the night and day are equal, and sometimes one of them will be longer or shorter than the other." }
      ]
    },
    {
      slug: "recite-what-is-easy",
      title: "Recite what is easy",
      line: "Allah eased the duty: pray at night as much as is easy.",
      facts: ["Islam is ease", "Qiraah here means prayer"],
      quote: q73(20),
      source: ik(20, "Ibn Kathir says recite what is easy means stand and pray at night as much as is easy, with no set time.", "stand and pray during the night as much as is easy"),
      difficulty: 2,
      questions: [
        { q: "What did Allah say after easing the duty?", a: "Recite what is easy", wrong: ["Recite all night", "Stop reciting", "Recite only once"], why: "So, recite you of the Quran as much as may be easy for you." },
        { q: "What does recite mean in 73:20, per Ibn Kathir?", a: "Pray", wrong: ["Write", "Sing", "Sell"], why: "Allah uses the term recitation, Qiraah, to mean prayer, Salah." },
        { tf: true, q: "Night prayer was made voluntary after being a duty.", why: "Then, the standing for night prayer became voluntary after it used to be obligatory." }
      ]
    },
    {
      slug: "valid-excuses",
      title: "Allah knows our excuses",
      line: "Allah knew some would be sick, travelling or striving.",
      facts: ["Allah is merciful with excuses", "A sign of prophethood"],
      quote: q73(20),
      source: ik(20, "Ibn Kathir says Allah knew people would have excuses like illness, travel for trade or striving in His way; the Makkan surah foretold this.", "it is among the greatest of the signs of prophethood"),
      difficulty: 3,
      questions: [
        { q: "Which excuses are named in 73:20?", a: "Sickness, travel, striving", wrong: ["Games, sleep, fun", "Laziness only", "None"], why: "Some among you sick, others traveling through the land, seeking of Allah's bounty, yet others fighting in Allah's cause." },
        { q: "Why is the ayah a sign of prophethood?", a: "It told of the future", wrong: ["It rhymes", "It is long", "It is short"], why: "It is among the greatest of the signs of prophethood, because it informs about unseen matters of the future." },
        { tf: true, q: "Travelling for honest trade is called seeking Allah's bounty.", why: "Those who are traveling in the land seeking the bounty of Allah in business and trade." }
      ]
    },
    {
      slug: "five-prayers-only",
      title: "Five prayers are the duty",
      line: "Five daily prayers are required; extra prayers are voluntary.",
      facts: ["Fard: required", "Nafl: extra"],
      quote: q73(20),
      source: hadith("bukhari", "46", "Talhah ibn Ubaydillah", "Sahih", "A man from Najd asked about Islam; the Prophet ﷺ said five prayers a day and night, and when asked if more were required, said no, unless voluntary.", "No, but if you want to offer the Nawafil prayers"),
      difficulty: 2,
      questions: [
        { q: "How many prayers are required daily?", a: "Five", wrong: ["Three", "Seven", "Ten"], why: "You have to offer prayers perfectly five times in a day and night." },
        { q: "What did he say about more prayers?", a: "They are voluntary", wrong: ["They are banned", "They are required", "They are useless"], why: "No, but if you want to offer the Nawafil prayers you can." },
        { tf: false, q: "Night prayer is still required for every Muslim.", why: "This Ayah abrogated the standing for prayer at night that Allah previously made obligatory for the Muslims." }
      ]
    },
    {
      slug: "the-last-third",
      title: "The last third of the night",
      line: "In the last third of the night, Allah invites our dua.",
      facts: ["A blessed time for dua", "Ask, and seek forgiveness"],
      quote: q73(20),
      source: hadith("bukhari", "1145", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said our Lord comes down to the nearest heaven when the last third of the night remains, asking who will call on Him, ask Him, or seek His forgiveness.", "when the last third of the night remains"),
      difficulty: 2,
      questions: [
        { q: "When does Allah call to His servants, per the hadith?", a: "The last third of the night", wrong: ["At noon", "At sunset only", "At Asr"], why: "When the last third of the night remains." },
        { q: "What three things does Allah invite?", a: "Dua, asking and forgiveness", wrong: ["Sleep, food, rest", "Trade, travel, war", "Games, songs, jokes"], why: "Is there anyone to invoke Me? Is there anyone to ask Me? Is there anyone seeking My forgiveness?" },
        { tf: true, q: "The last third of the night is a special time for dua.", why: "Is there anyone to invoke Me, so that I may respond to invocation?" }
      ]
    },
    {
      slug: "salah-and-zakah",
      title: "Establish prayer and give zakah",
      line: "Keep the required prayers and pay the required zakah.",
      facts: ["Salah and zakah go together", "Zakah began in Makkah"],
      quote: q73(20),
      source: ik(20, "Ibn Kathir says perform salah and give zakah means establish the obligatory prayers and pay the obligatory zakah.", "establish your obligatory prayers and pay your obligatory Zakah"),
      difficulty: 1,
      questions: [
        { q: "What two duties does 73:20 command?", a: "Salah and zakah", wrong: ["Hajj and Umrah", "Fasting and Eid", "Travel and trade"], why: "And perform Salah and give Zakah." },
        { q: "Where were zakah's exact amounts explained?", a: "Madinah", wrong: ["Makkah", "Taif", "Yemen"], why: "Zakah was made obligatory in Makkah, but the various amounts of Nisab and how much was to be given was clarified in Al-Madinah." },
        { tf: false, q: "Zakah is a voluntary extra, not a duty.", why: "Establish your obligatory prayers and pay your obligatory Zakah." }
      ]
    },
    {
      slug: "a-goodly-loan",
      title: "A goodly loan to Allah",
      line: "Charity is a loan to Allah that He repays far better.",
      facts: ["Qard hasan: a goodly loan", "Nothing given is lost"],
      quote: q73(20),
      source: ik(20, "Ibn Kathir says the goodly loan is charity; Allah rewards it with the best and most abundant reward, and you will find all good you sent ahead.", "Allah will reward for this the best and most abundant of rewards"),
      difficulty: 2,
      questions: [
        { q: "What is the goodly loan, per Ibn Kathir?", a: "Charity", wrong: ["A bank loan", "A gift to kings", "A debt"], why: "And lend to Allah a handsome loan, meaning, from charitable donations." },
        { q: "How will the good we send ahead be found?", a: "Better and greater in reward", wrong: ["Smaller", "Lost", "The same"], why: "You will certainly find it with Allah, better and greater in reward." },
        { tf: true, q: "Ayah 2:245 also speaks of lending Allah a goodly loan.", why: "Who is he that will lend to Allah a goodly loan so that He may multiply it to him many times? (2:245)" }
      ]
    },
    {
      slug: "your-real-wealth",
      title: "Your real wealth",
      line: "Your true wealth is what you spend in good deeds.",
      facts: ["Spend while you can", "Heirs get what is left"],
      quote: q73(20),
      source: hadith("bukhari", "6442", "Abdullah ibn Masud", "Sahih", "The Prophet ﷺ said a person's wealth is what he spends in good during his life, while what he leaves behind is his heirs' wealth.", "his wealth is whatever he spends"),
      difficulty: 3,
      questions: [
        { q: "What is a person's own wealth, per the hadith?", a: "What he spends in good", wrong: ["What he hides", "What he counts", "What he leaves"], why: "So his wealth is whatever he spends in Allah's Cause during his life." },
        { q: "Whose wealth is what he leaves behind?", a: "His heirs", wrong: ["His own", "The king's", "No one's"], why: "While the wealth of his heirs is whatever he leaves after his death." },
        { tf: false, q: "Money kept until death counts as your own in the Hereafter.", why: "The wealth of his heirs is whatever he leaves after his death." }
      ]
    },
    {
      slug: "seek-forgiveness",
      title: "Seek Allah's forgiveness",
      line: "The surah ends: seek forgiveness, for Allah is Most Forgiving.",
      facts: ["Istighfar in every matter", "Al-Ghafur, Ar-Rahim"],
      quote: q73(20),
      source: ik(20, "Ibn Kathir says remember Allah and seek His forgiveness often for all your matters, for He forgives whoever asks.", "seek forgiveness from Him often for all of your matters"),
      difficulty: 1,
      questions: [
        { q: "How does Surah Al-Muzzammil end?", a: "With seeking forgiveness", wrong: ["With a story", "With a battle", "With a riddle"], why: "And seek Forgiveness of Allah. Verily, Allah is Oft-Forgiving, Most-Merciful." },
        { q: "How often should we seek forgiveness?", a: "Often, for all matters", wrong: ["Once a year", "Never", "Only when old"], why: "Seek forgiveness from Him often for all of your matters." },
        { tf: true, q: "Allah is Most Forgiving to whoever seeks His forgiveness.", why: "For verily, He is Most Forgiving, Most Merciful to whoever seeks His forgiveness." }
      ]
    }
  ]
};

export const MUZZAMMIL_UNITS: readonly DeepUnit[] = [MUZZAMMIL_ONE, MUZZAMMIL_TWO, MUZZAMMIL_THREE, MUZZAMMIL_FOUR];
