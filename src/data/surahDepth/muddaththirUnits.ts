import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Al-Muddaththir ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Muddaththir 74:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_74_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Muddaththir 74:${ayah}`,
    url: `https://quran.com/74:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 74:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q74 = (ayah: number) => quranQuote(74, ayah);


/** Ayahs 1 to 10: arise and warn, magnify your Lord, purify your garments, and the Trumpet. */
const MUDDATHTHIR_ONE: DeepUnit = {
  key: "muddaththir1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-74",
  name: "Al-Muddaththir, ayahs 1-10",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Muddaththir",
  lessons: [
    {
      slug: "wrap-me-up",
      title: "Wrap me up",
      line: "Seeing the angel again, he asked to be wrapped up.",
      facts: ["Muddaththir: the one covered up", "Came after the pause in revelation"],
      quote: q74(1),
      source: hadith("bukhari", "4922", "Jabir ibn Abdullah", "Sahih", "The Prophet ﷺ heard a voice, looked up and saw the angel; he went home and asked to be wrapped up, and then O you wrapped up, arise and warn was revealed.", "told her to wrap me up and pour cold water on me"),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ ask his family to do?", a: "Wrap him up", wrong: ["Cook food", "Call the tribe", "Open the door"], why: "So I went to Khadija and told her to wrap me up and pour cold water on me." },
        { q: "Which ayahs were revealed right after?", a: "O you wrapped up! Arise and warn", wrong: ["Read in the name of your Lord", "Say He is Allah, One", "By the dawn"], why: "Then, O you wrapped up! Arise and warn, Surat Al-Muddaththir was revealed." },
        { tf: true, q: "Revelation came often and steadily after these ayahs.", why: "After this, the revelation started coming strongly and frequently in succession." }
      ]
    },
    {
      slug: "arise-and-warn",
      title: "Arise and warn",
      line: "The Prophet ﷺ was told to rise with zeal and warn.",
      facts: ["Indhar: warning", "The start of his mission"],
      quote: q74(2),
      source: ik(2, "Ibn Kathir says arise and warn means get ready to go out with zeal and warn people; with this he became a Messenger.", "prepare to go forth with zeal and warn the people"),
      difficulty: 1,
      questions: [
        { q: "What was the Prophet ﷺ told to do in 74:2?", a: "Arise and warn", wrong: ["Sleep and rest", "Travel to Syria", "Build a house"], why: "Arise and warn!" },
        { q: "What did these ayahs begin, per Ibn Kathir?", a: "His work as Messenger", wrong: ["His trade", "His marriage", "His travels"], why: "With this the Prophet ﷺ attained messengership just as he attained prophethood with the first revelation." },
        { tf: false, q: "He was told to warn people quietly and slowly, without zeal.", why: "Prepare to go forth with zeal and warn the people." }
      ]
    },
    {
      slug: "magnify-your-lord",
      title: "Magnify your Lord",
      line: "Declare the greatness of Allah above everything.",
      facts: ["Takbir: Allahu Akbar", "Allah is greater than all"],
      quote: q74(3),
      source: ik(3, "Ibn Kathir says magnify your Lord means declare His greatness.", "to declare the greatness of Him"),
      difficulty: 1,
      questions: [
        { q: "What does magnify your Lord mean?", a: "Declare His greatness", wrong: ["Look at Him", "Draw Him", "Forget Him"], why: "And magnify your Lord, to declare the greatness of Him." },
        { q: "Which words declare Allah's greatness?", a: "Allahu Akbar", wrong: ["Bismillah", "Ameen", "Insha'Allah"], why: "And magnify your Lord!" },
        { tf: true, q: "Magnifying Allah was among the first commands to the Prophet ﷺ.", why: "Arise and warn! And magnify your Lord!" }
      ]
    },
    {
      slug: "purify-your-garments",
      title: "Purify your garments",
      line: "Keep clothes clean, earnings lawful, and the heart pure.",
      facts: ["Taharah: purity", "Outer and inner cleanliness"],
      quote: q74(4),
      source: ik(4, "Ibn Sirin said purify your garments means wash them with water; Said ibn Jubayr said purify your heart and intentions; Al-Hasan said beautify your character.", "This means purify your heart and your intentions"),
      difficulty: 2,
      questions: [
        { q: "What did Ibn Sirin say purify your garments means?", a: "Clean them with water", wrong: ["Dye them red", "Sell them", "Burn them"], why: "This means clean them with water." },
        { q: "What did Said ibn Jubayr say to purify?", a: "Your heart and intentions", wrong: ["Your shoes", "Your house", "Your tent"], why: "This means purify your heart and your intentions." },
        { tf: true, q: "Ibn Abbas linked pure clothes to lawful earnings.", why: "Do not let your garments that you wear be from earnings that are unlawful." }
      ]
    },
    {
      slug: "half-of-faith",
      title: "Cleanliness is half of faith",
      line: "The Prophet ﷺ said cleanliness is half of faith.",
      facts: ["Wudu cleans body and soul", "Alhamdulillah fills the scale"],
      quote: q74(4),
      source: hadith("muslim", "223", "Abu Malik al-Ash'ari", "Sahih", "The Prophet ﷺ said cleanliness is half of faith, and Alhamdulillah fills the scale.", "Cleanliness is half of faith"),
      difficulty: 1,
      questions: [
        { q: "What is half of faith, per the hadith?", a: "Cleanliness", wrong: ["Wealth", "Strength", "Travel"], why: "Cleanliness is half of faith." },
        { q: "What does Alhamdulillah fill, per the hadith?", a: "The scale", wrong: ["A cup", "A room", "A river"], why: "And al-Hamdu Lillah fills the scale." },
        { tf: false, q: "Cleanliness has nothing to do with faith.", why: "Cleanliness is half of faith." }
      ]
    },
    {
      slug: "keep-away-from-idols",
      title: "Keep away from idols",
      line: "Ar-Rujz means idols; stay far away from them.",
      facts: ["Rujz: idols", "Tawhid from the start"],
      quote: q74(5),
      source: ik(5, "Ibn Abbas said Ar-Rujz are idols, so keep away from them; Mujahid, Ikrimah and Qatadah said the same.", "Ar-Rujz are idols, so keep away from them"),
      difficulty: 1,
      questions: [
        { q: "What does Ar-Rujz mean, per Ibn Abbas?", a: "Idols", wrong: ["Rain", "Horses", "Markets"], why: "Ar-Rujz are idols, so keep away from them." },
        { q: "What should we do with idols?", a: "Keep away from them", wrong: ["Decorate them", "Visit them", "Trade them"], why: "And keep away from Ar-Rujz!" },
        { tf: false, q: "In 74:5, Ar-Rujz means good food.", why: "Verily, it is the idols." }
      ]
    },
    {
      slug: "give-without-expecting",
      title: "Give without wanting more back",
      line: "Never give a gift just to get more back.",
      facts: ["Give for Allah", "Mujahid: do not grow weak in good"],
      quote: q74(6),
      source: ik(6, "Ibn Abbas said do not give any gift seeking to get back more than it; Mujahid said do not slacken in seeking more good.", "Do not give any gift seeking to get"),
      difficulty: 2,
      questions: [
        { q: "What does 74:6 forbid, per Ibn Abbas?", a: "Giving to get more back", wrong: ["Giving at all", "Eating gifts", "Saying thanks"], why: "Do not give any gift seeking to get back more than it." },
        { q: "What did Mujahid say Tamnun means?", a: "To become weak", wrong: ["To become rich", "To travel", "To boast"], why: "Tamnun in the language of the Arabs means to become weak." },
        { tf: true, q: "Mujahid said do not slacken in seeking more good.", why: "Do not slacken in seeking more good." }
      ]
    },
    {
      slug: "forget-your-favours",
      title: "Forget your favours",
      line: "Do good to people, then forget it; seek reward from Allah alone.",
      facts: ["As-Sa'di explains", "No reminding of favours"],
      quote: q74(6),
      source: saadi(74, 6, "As-Sa'di says do not remind people of the good you did them or see yourself above them; do good as much as you can, forget it, and seek its reward from Allah alone.", "لا تمنن على الناس بما أسديت إليهم"),
      difficulty: 2,
      questions: [
        { q: "After doing good to someone, we should...?", a: "Forget it and seek Allah's reward", wrong: ["Remind them often", "Ask for more back", "Tell everyone"], why: "Forget your kindness and seek reward only from Allah, says as-Sa'di." },
        { q: "What should we not do with favours we gave?", a: "Remind people of them", wrong: ["Forget them", "Hide them", "Be humble"], why: "Do not hold your favours over people." },
        { tf: true, q: "Treat those you helped and others the same.", why: "As-Sa'di on 74:6." }
      ]
    },
    {
      slug: "patient-for-your-lord",
      title: "Patient for your Lord",
      line: "Make your patience with people's harm for Allah's sake.",
      facts: ["Sabr for Allah", "Patience in giving too"],
      quote: q74(7),
      source: ik(7, "Mujahid said be patient with their harms for the Face of your Lord; Ibrahim An-Nakhai said be patient in your giving for Allah.", "make your patience with their harms be for the Face of your Lord"),
      difficulty: 2,
      questions: [
        { q: "For whose sake should we be patient, per 74:7?", a: "For our Lord", wrong: ["For praise", "For money", "For fame"], why: "And be patient for the sake of your Lord!" },
        { q: "What did Ibrahim An-Nakhai say to be patient in?", a: "Giving for Allah", wrong: ["Eating", "Sleeping", "Travelling"], why: "Be patient in your giving for the sake of Allah, the Mighty and Majestic." },
        { tf: true, q: "Patience with people's harm can be an act of worship.", why: "Make your patience with their harms be for the Face of your Lord." }
      ]
    },
    {
      slug: "the-trumpet",
      title: "When the Trumpet is blown",
      line: "The Naqur is the Trumpet that will be blown on that Day.",
      facts: ["Naqur: the Trumpet", "Shaped like a horn"],
      quote: q74(8),
      source: ik(8, "Ibn Abbas, Mujahid, Al-Hasan and others said the Naqur is the Trumpet; Mujahid said it is shaped like a horn.", "It is in the shape of a horn"),
      difficulty: 2,
      questions: [
        { q: "What is the Naqur, per Ibn Abbas?", a: "The Trumpet", wrong: ["A drum", "A bell", "A flute"], why: "Naqur: It is the Trumpet." },
        { q: "What shape is it, per Mujahid?", a: "A horn", wrong: ["A ball", "A box", "A ring"], why: "Mujahid said: It is in the shape of a horn." },
        { tf: true, q: "Many early scholars agreed the Naqur is the Trumpet.", why: "Ibn Abbas, Mujahid, Ash-Shabi, Zayd ibn Aslam, Al-Hasan, Qatadah and others all said: It is the Trumpet." }
      ]
    },
    {
      slug: "allah-is-sufficient",
      title: "Allah is sufficient for us",
      line: "Say: Allah is sufficient for us, the best One to trust.",
      facts: ["Hasbunallah wa nimal wakil", "Said by Ibrahim and Muhammad ﷺ"],
      quote: q74(8),
      source: hadith("bukhari", "4563", "Ibn Abbas", "Sahih", "Ibn Abbas said Allah is sufficient for us and He is the best Disposer of affairs was said by Ibrahim in the fire, and by Muhammad ﷺ when told an army was gathering.", "when he was thrown into the fire"),
      difficulty: 2,
      questions: [
        { q: "Who said Hasbunallah when thrown into the fire?", a: "Ibrahim", wrong: ["Musa", "Nuh", "Yunus"], why: "Allah is Sufficient for us and He Is the Best Disposer of affairs, was said by Ibrahim when he was thrown into the fire." },
        { q: "What happened to the believers' faith when warned of an army?", a: "It increased", wrong: ["It ended", "It weakened", "Nothing"], why: "But it only increased their faith and they said: Allah is Sufficient for us." },
        { tf: false, q: "Hasbunallah is said only when things are easy.", why: "It was said by Muhammad when they said, A great army is gathering against you." }
      ]
    },
    {
      slug: "a-hard-day",
      title: "A hard Day for deniers",
      line: "That Day will be hard and far from easy for the disbelievers.",
      facts: ["Yawm asir: a hard day", "Believers hope for ease"],
      quote: q74(9),
      source: ik(10, "Ibn Kathir says that Day will be severe and not easy for the disbelievers, as 54:8 says: this is a hard Day.", "it will not be easy for them"),
      difficulty: 2,
      questions: [
        { q: "How is that Day described in 74:9?", a: "A Hard Day", wrong: ["A holiday", "A short day", "A quiet day"], why: "Truly, that Day will be a Hard Day." },
        { q: "For whom is it far from easy?", a: "The disbelievers", wrong: ["The believers", "The angels", "The prophets"], why: "Far from easy for the disbelievers." },
        { tf: true, q: "Ayah 54:8 also calls it a hard Day.", why: "The disbelievers will say: This a Hard Day. (54:8)" }
      ]
    }
  ]
};

/** Ayahs 11 to 30: the rich man who was given everything, yet called the Quran magic. */
const MUDDATHTHIR_TWO: DeepUnit = {
  key: "muddaththir2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-74",
  name: "Al-Muddaththir, ayahs 11-30",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Muddaththir",
  lessons: [
    {
      slug: "created-alone",
      title: "Born with nothing",
      line: "Allah reminds the denier he was born alone, with nothing.",
      facts: ["We all start with nothing", "Every blessing is from Allah"],
      quote: q74(11),
      source: ik(11, "Ibn Kathir says he came out of his mother's womb alone, without wealth or children, and then Allah gave him plenty.", "without any wealth or children"),
      difficulty: 2,
      questions: [
        { q: "How did the man come into the world, per 74:11?", a: "Alone, with nothing", wrong: ["With gold", "With an army", "With a palace"], why: "He came out of the womb of his mother alone, without any wealth or children." },
        { q: "Who was this man, per Ibn Kathir?", a: "Al-Walid ibn Al-Mughirah", wrong: ["Abu Bakr", "Umar", "Bilal"], why: "The person who is mentioned in this discussion is Al-Walid bin Al-Mughirah Al-Makhzumi." },
        { tf: true, q: "Every person starts life with no wealth of his own.", why: "He came out of the womb of his mother alone, without any wealth or children." }
      ]
    },
    {
      slug: "wealth-and-sons",
      title: "Wealth and sons at his side",
      line: "Allah gave him wealth and sons who stayed by his side.",
      facts: ["Children are a blessing", "Blessings call for thanks"],
      quote: q74(13),
      source: ik(13, "Mujahid said his sons were not absent; servants did the trading while the sons sat with their father, who enjoyed their company.", "He enjoys their company and delights in being with them"),
      difficulty: 2,
      questions: [
        { q: "What did Allah give him in 74:12?", a: "Abundant wealth", wrong: ["Poverty", "Sickness", "Nothing"], why: "And then granted him resources in abundance." },
        { q: "Why were his sons always present?", a: "Servants did their work", wrong: ["They were sick", "They were small", "They were lazy"], why: "Their servants and hired workers handle all of that for them while they are sitting with their father." },
        { tf: false, q: "His sons were always away on trade trips.", why: "They do not travel for business and trade. Rather, their servants and hired workers handle all of that." }
      ]
    },
    {
      slug: "wanting-more",
      title: "He still wanted more",
      line: "Given so much, he still wanted more and opposed the ayat.",
      facts: ["Greed hides gratitude", "Shukr keeps blessings"],
      quote: q74(15),
      source: ik(16, "Ibn Kathir says despite all this he wanted more and stubbornly opposed Allah's ayat, showing ingratitude for blessings he knew.", "This refers to his ungratefulness for his blessings"),
      difficulty: 2,
      questions: [
        { q: "What did he want after all he was given?", a: "Even more", wrong: ["Less", "Nothing", "To give it away"], why: "After all that he desires that I should give more." },
        { q: "How did he treat Allah's ayat?", a: "He opposed them", wrong: ["He loved them", "He taught them", "He wrote them"], why: "Nay! Verily, he has been opposing Our Ayat." },
        { tf: true, q: "His real problem was ingratitude for his blessings.", why: "This refers to his ungratefulness for his blessings after knowing these blessings." }
      ]
    },
    {
      slug: "he-thought-and-plotted",
      title: "He thought and plotted",
      line: "He thought hard about what lie to tell about the Quran.",
      facts: ["Using the mind to deny truth", "Honesty over pride"],
      quote: q74(18),
      source: ik(18, "Ibn Kathir says he thought about what to say when asked about the Quran, and deliberated over what claim to invent against it.", "So he deliberated over what statement he should invent against it"),
      difficulty: 2,
      questions: [
        { q: "What did he do in 74:18?", a: "Thought and plotted", wrong: ["Prayed", "Repented", "Gave charity"], why: "Verily, he thought and plotted." },
        { q: "What was he planning, per Ibn Kathir?", a: "A claim against the Quran", wrong: ["A trade trip", "A wedding", "A poem of praise"], why: "So he deliberated over what statement he should invent against it." },
        { tf: false, q: "He thought deeply in order to accept the truth.", why: "He deliberated over what statement he should invent against it." }
      ]
    },
    {
      slug: "frowned-and-turned",
      title: "He frowned and turned away",
      line: "He frowned, scowled and turned away from the truth in pride.",
      facts: ["Kibr: pride", "Pride blocks guidance"],
      quote: q74(23),
      source: ik(23, "Ibn Kathir says he frowned and scowled, then turned away from the truth and arrogantly refused to accept the Quran.", "he turned away from the truth and arrogantly refused to accept and submit"),
      difficulty: 2,
      questions: [
        { q: "What did he do with his face, per 74:22?", a: "Frowned and scowled", wrong: ["Smiled", "Cried", "Laughed"], why: "Then he frowned and he looked in a bad tempered way." },
        { q: "Why did he turn away, per 74:23?", a: "Out of pride", wrong: ["Out of fear", "Out of hunger", "Out of sleep"], why: "Then he turned back, and was proud." },
        { tf: true, q: "Pride stopped him from accepting the Quran.", why: "He turned away from the truth and arrogantly refused to accept and submit to the Quran." }
      ]
    },
    {
      slug: "not-poetry",
      title: "He knew it was not poetry",
      line: "Even Al-Walid admitted the Quran was sweet and not poetry.",
      facts: ["The Quran's beauty is clear", "Even enemies admitted it"],
      quote: q74(24),
      source: ik(24, "Qatadah said Al-Walid admitted the Quran was not poetry, that it had sweetness and elegance, and yet he still called it magic.", "Verily, it has a sweetness and it is truly elegant"),
      difficulty: 3,
      questions: [
        { q: "What did Al-Walid first admit about the Quran?", a: "It was not poetry", wrong: ["It was a song", "It was a poem", "It was a story"], why: "I thought about what the man says, and it is not poetry." },
        { q: "How did he describe its words?", a: "Sweet and elegant", wrong: ["Rough and plain", "Boring", "Confusing"], why: "Verily, it has a sweetness and it is truly elegant." },
        { tf: false, q: "Al-Walid accepted Islam after admitting this.", why: "He turned away from the truth and arrogantly refused to accept and submit to the Quran." }
      ]
    },
    {
      slug: "word-of-allah",
      title: "Not the word of a man",
      line: "He claimed the Quran was a man's words; it is Allah's Word.",
      facts: ["Kalamullah: Allah's Word", "No human could make it"],
      quote: q74(25),
      source: ik(25, "Ibn Kathir explains he said this is only the word of a human being, meaning he denied it was the Word of Allah.", "it is not the Words of Allah"),
      difficulty: 2,
      questions: [
        { q: "What did he claim in 74:24?", a: "It is old magic", wrong: ["It is a dream", "It is a song", "It is a law"], why: "This is nothing but magic from that of old." },
        { q: "What did he claim in 74:25?", a: "It is a human's words", wrong: ["It is an angel's", "It is a jinn's", "It is a king's"], why: "This is nothing but the word of a human being!" },
        { tf: false, q: "The Quran is the words of a human being.", why: "He invents lies against Allah's Ayat and claims that they are the words of a man." }
      ]
    },
    {
      slug: "nineteen-guardians",
      title: "Nineteen over it",
      line: "Allah says nineteen angels stand guard over the Fire.",
      facts: ["The guardians are angels", "Their number is a test"],
      quote: q74(30),
      source: ik(30, "Ibn Kathir says over it are nineteen means the first of the guardians of Hell, great in appearance and stern in character.", "the first of the guardians of Hell"),
      difficulty: 2,
      questions: [
        { q: "How many are over it, per 74:30?", a: "Nineteen", wrong: ["Seven", "Ten", "Forty"], why: "Over it are nineteen." },
        { q: "Who are the nineteen, per Ibn Kathir?", a: "Guardians of Hell", wrong: ["Prophets", "Kings", "Jinn"], why: "Meaning, the first of the guardians of Hell." },
        { tf: true, q: "The guardians are stern in character.", why: "They are magnificent in their appearance and harsh in their character." }
      ]
    }
  ]
};

/** Ayahs 31 to 37: why the number nineteen, the hosts of Allah, and oaths by the moon, night and dawn. */
const MUDDATHTHIR_THREE: DeepUnit = {
  key: "muddaththir3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-74",
  name: "Al-Muddaththir, ayahs 31-37",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Muddaththir",
  lessons: [
    {
      slug: "angels-as-guardians",
      title: "Only angels guard it",
      line: "Allah made only mighty angels the guardians of the Fire.",
      facts: ["Angels cannot be beaten", "Abu Jahl mocked the number"],
      quote: q74(31),
      source: ik(31, "Ibn Kathir says Abu Jahl mocked the number nineteen, but the guardians are angels, extremely strong in creation, who cannot be defeated.", "extremely strong in their creation"),
      difficulty: 2,
      questions: [
        { q: "Who did Allah set as guardians of the Fire?", a: "Angels", wrong: ["Jinn", "Humans", "Animals"], why: "And We have set none but angels as guardians of the Fire." },
        { q: "Who mocked the number, per Ibn Kathir?", a: "Abu Jahl", wrong: ["Abu Bakr", "Abu Talib", "Abu Hurairah"], why: "Abu Jahl said: O people of Quraysh! Are not every ten among you able to defeat one of them?" },
        { tf: false, q: "Ten strong men could beat one of those angels.", why: "They cannot be stood against nor defeated." }
      ]
    },
    {
      slug: "the-number-is-a-test",
      title: "Why the number nineteen",
      line: "The number is a test: it adds faith and brings certainty.",
      facts: ["Some grow in faith", "Others ask why"],
      quote: q74(31),
      source: ik(31, "Ibn Kathir says the number nineteen is a test; the People of the Scripture find it matches their books, and believers increase in faith.", "so that they may know that this Messenger is true"),
      difficulty: 3,
      questions: [
        { q: "Why was the number mentioned, per 74:31?", a: "As a test", wrong: ["As a joke", "For counting money", "For a song"], why: "And We have fixed their number only as a trial for the disbelievers." },
        { q: "What happens to the believers' faith?", a: "It increases", wrong: ["It ends", "It drops", "It stays the same"], why: "And that the believers may increase in faith." },
        { tf: true, q: "The People of the Scripture would see it matched their books.", why: "For he speaks according to the same thing that they have with them of heavenly revealed Scriptures." }
      ]
    },
    {
      slug: "hosts-of-your-lord",
      title: "The hosts of your Lord",
      line: "None knows the number of Allah's soldiers but Him.",
      facts: ["Junud: soldiers, hosts", "Angels beyond counting"],
      quote: q74(31),
      source: ik(31, "Ibn Kathir says none knows the number of Allah's hosts but Him, so no one should think the angels are only nineteen.", "none knows their number and their count except Allah"),
      difficulty: 2,
      questions: [
        { q: "Who knows the number of Allah's hosts?", a: "Only Allah", wrong: ["Scholars", "The jinn", "Astronomers"], why: "And none can know the hosts of your Lord but He." },
        { q: "What mistake does Ibn Kathir warn against?", a: "Thinking there are only nineteen", wrong: ["Thinking there are none", "Counting stars", "Fearing angels"], why: "This is so that one does not make the mistake of thinking that they are only nineteen in all." },
        { tf: false, q: "Allah's angels can be counted by people.", why: "None knows their number and their count except Allah." }
      ]
    },
    {
      slug: "bayt-al-mamur",
      title: "The Frequented House",
      line: "Seventy thousand angels enter the Frequented House each day.",
      facts: ["Al-Bayt al-Mamur: in the 7th heaven", "From the Night Journey"],
      quote: q74(31),
      source: ik(31, "From the Night Journey hadith, the Prophet ﷺ said seventy thousand angels enter the Frequented House in the seventh heaven every day and never return.", "Seventy thousand angels enter into it every day"),
      difficulty: 3,
      questions: [
        { q: "How many angels enter it each day?", a: "Seventy thousand", wrong: ["Seven", "Seven hundred", "Nineteen"], why: "Seventy thousand angels enter into it every day." },
        { q: "Where is the Frequented House?", a: "The seventh heaven", wrong: ["Makkah", "The first heaven", "Under the sea"], why: "The Frequented House, Al-Bayt Al-Mamur, which is in the seventh heaven." },
        { tf: true, q: "The angels who enter never get a second turn.", why: "They do not return to it as it is all that is due upon them, one visit in their lifetime." }
      ]
    },
    {
      slug: "moon-night-dawn",
      title: "By the moon, the night and the dawn",
      line: "Allah swears by the moon, the night and the shining dawn.",
      facts: ["Qasam: an oath", "Signs in the sky"],
      quote: q74(34),
      source: ik(34, "Ibn Kathir says by the night when it withdraws means when it leaves, and by the dawn when it brightens means when it shines.", "meaning, when it shines"),
      difficulty: 1,
      questions: [
        { q: "By what does Allah swear in 74:32?", a: "The moon", wrong: ["The sea", "A mountain", "A tree"], why: "Nay! And by the moon." },
        { q: "What does the dawn brightening mean?", a: "When it shines", wrong: ["When it hides", "When it rains", "When it ends"], why: "And by the dawn when it brightens, meaning, when it shines." },
        { tf: true, q: "Allah also swears by the night as it leaves.", why: "And by the night when it withdraws." }
      ]
    },
    {
      slug: "forward-or-behind",
      title: "Go forward or stay behind",
      line: "Each person chooses to go forward or stay behind.",
      facts: ["The choice is ours", "Accept the warning"],
      quote: q74(37),
      source: ik(37, "Ibn Kathir says the warning is for whoever wishes to accept it and be guided, or to hold back and turn away.", "for whoever wishes to accept the warning and be guided to the truth"),
      difficulty: 2,
      questions: [
        { q: "Whom is the warning for, per 74:36?", a: "Mankind", wrong: ["Only kings", "Only Arabs", "Only angels"], why: "A warning to mankind." },
        { q: "What two choices does 74:37 name?", a: "Go forward or stay behind", wrong: ["Buy or sell", "Sleep or wake", "Eat or fast"], why: "To any of you that chooses to go forward, or to remain behind." },
        { tf: true, q: "Going forward means accepting the warning and guidance.", why: "For whoever wishes to accept the warning and be guided to the truth." }
      ]
    }
  ]
};

/** Ayahs 38 to 56: each soul is held by its deeds, the people of the right, and the Quran as a reminder. */
const MUDDATHTHIR_FOUR: DeepUnit = {
  key: "muddaththir4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-74",
  name: "Al-Muddaththir, ayahs 38-56",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Muddaththir",
  lessons: [
    {
      slug: "pledge-for-deeds",
      title: "Held by our deeds",
      line: "Every soul is held by what it earned.",
      facts: ["Rahinah: held as a pledge", "Deeds decide our place"],
      quote: q74(38),
      source: ik(38, "Ibn Abbas and others said every person is a pledge for what he earned, meaning bound to his deeds on the Day of Judgement.", "bound to his deed on the Day of Judgement"),
      difficulty: 2,
      questions: [
        { q: "What is every person held by, per 74:38?", a: "What he has earned", wrong: ["His family", "His wealth", "His looks"], why: "Every person is a pledge for what he has earned." },
        { q: "Who are excepted, per 74:39?", a: "Those on the Right", wrong: ["The rich", "The strong", "The old"], why: "Except those on the Right." },
        { tf: true, q: "Each person is bound to his own deeds.", why: "Meaning, bound to his deed on the Day of Judgement." }
      ]
    },
    {
      slug: "people-of-the-right",
      title: "The people of the Right",
      line: "The people of the Right will be in Gardens, in lofty rooms.",
      facts: ["Ashab al-Yamin", "Jannah has high rooms"],
      quote: q74(40),
      source: ik(40, "Ibn Kathir says the people of the Right will be in Gardens, in lofty rooms, asking about the criminals.", "while they are in lofty rooms"),
      difficulty: 2,
      questions: [
        { q: "Where will the people of the Right be?", a: "In Gardens", wrong: ["In deserts", "In caves", "At sea"], why: "In Gardens they will ask one another." },
        { q: "What will they ask about?", a: "The criminals", wrong: ["The weather", "The market", "The stars"], why: "In Gardens they will ask one another, about criminals." },
        { tf: false, q: "The people of the Right will be in the lowest places.", why: "While they are in lofty rooms." }
      ]
    },
    {
      slug: "no-prayer-no-charity",
      title: "No prayer, no feeding the poor",
      line: "They lost because they did not pray or feed the poor.",
      facts: ["Salah: right of Allah", "Feeding: right of people"],
      quote: q74(43),
      source: ik(44, "Ibn Kathir says they admit: we did not worship Allah, nor did we do good to His creatures.", "we did not worship Allah, nor did we do good to His creatures"),
      difficulty: 2,
      questions: [
        { q: "What was their first admission in 74:43?", a: "We did not pray", wrong: ["We did not travel", "We did not trade", "We did not sleep"], why: "We were not of those who used to offer the Salah." },
        { q: "Whom did they not feed, per 74:44?", a: "The poor", wrong: ["Kings", "Guests of honor", "Animals"], why: "Nor did we feed the poor." },
        { tf: true, q: "Prayer and kindness to people both matter.", why: "We did not worship Allah, nor did we do good to His creatures." }
      ]
    },
    {
      slug: "vain-talk",
      title: "Joining in empty talk",
      line: "They joined vain talk and followed others into going astray.",
      facts: ["Choose good company", "Speak with knowledge"],
      quote: q74(45),
      source: ik(45, "Ibn Kathir says they spoke about what they had no knowledge of; Qatadah said whenever someone went astray, they went astray with them.", "every time someone went astray we would go astray with them"),
      difficulty: 2,
      questions: [
        { q: "With whom did they speak falsehood?", a: "Vain speakers", wrong: ["Scholars", "Prophets", "Angels"], why: "And we used to speak falsehood with vain speakers." },
        { q: "What did Qatadah say they did?", a: "Followed others astray", wrong: ["Led people to good", "Kept quiet", "Studied hard"], why: "Every time someone went astray we would go astray with them." },
        { tf: false, q: "Following the crowd is always safe.", why: "Every time someone went astray we would go astray with them." }
      ]
    },
    {
      slug: "until-certainty",
      title: "Until the certainty came",
      line: "They denied the Day of Recompense until death reached them.",
      facts: ["Al-Yaqin: death", "Worship until the end"],
      quote: q74(47),
      source: ik(47, "Ibn Kathir says Al-Yaqin here means death, as in 15:99: worship your Lord until the certainty comes to you.", "And worship your Lord until there comes unto you the certainty"),
      difficulty: 2,
      questions: [
        { q: "What did they deny, per 74:46?", a: "The Day of Recompense", wrong: ["The sun", "Their names", "Their homes"], why: "And we used to deny the Day of Recompense." },
        { q: "What does Al-Yaqin mean, per Ibn Kathir?", a: "Death", wrong: ["Wealth", "Sleep", "A dream"], why: "Until the certainty, Al-Yaqin, came to us, meaning, death." },
        { tf: true, q: "Ayah 15:99 says worship your Lord until certainty comes.", why: "And worship your Lord until there comes unto you the certainty. (15:99)" }
      ]
    },
    {
      slug: "fleeing-from-a-lion",
      title: "Running like startled donkeys",
      line: "They ran from the reminder like wild donkeys fleeing a lion.",
      facts: ["Qaswarah: a lion", "Do not run from good advice"],
      quote: q74(51),
      source: ik(51, "Ibn Kathir says they fled the truth like a wild donkey flees something chasing it, like a lion; Ibn Abbas said Qaswarah is the lion.", "like a wild donkey when it flees from something that is trying to catch it, like a lion"),
      difficulty: 2,
      questions: [
        { q: "What were they compared to in 74:50?", a: "Wild donkeys", wrong: ["Birds", "Fish", "Camels"], why: "As if they were wild donkeys." },
        { q: "What is Qaswarah, per Ibn Abbas?", a: "The lion", wrong: ["The wolf", "The hunter", "The storm"], why: "It, Qaswarah, is the lion in the Arabic language." },
        { tf: false, q: "They ran towards the reminder happily.", why: "Then what is wrong with them that they turn away from admonition?" }
      ]
    },
    {
      slug: "pages-spread-out",
      title: "They each wanted a book",
      line: "Each wanted his own book from Allah before he would believe.",
      facts: ["Allah chooses His messengers", "Excuses block belief"],
      quote: q74(52),
      source: ik(52, "Mujahid and others said each idolater wanted a book revealed to him as it was to the Prophet ﷺ; Allah knows best whom to give His message.", "each one of these idolators wants to have a book revealed to him"),
      difficulty: 3,
      questions: [
        { q: "What did each of them want, per 74:52?", a: "Pages spread out for himself", wrong: ["A horse", "A palace", "A sword"], why: "Nay, everyone of them desires that he should be given pages spread out." },
        { q: "What was their real problem, per 74:53?", a: "They did not fear the Hereafter", wrong: ["They were poor", "They were busy", "They were young"], why: "Nay! But they fear not the Hereafter." },
        { tf: true, q: "Allah knows best with whom to place His message.", why: "Allah knows best with whom to place His Message. (6:124)" }
      ]
    },
    {
      slug: "worthy-of-taqwa",
      title: "Worthy of taqwa, the One who forgives",
      line: "The Quran is a reminder; Allah deserves taqwa and forgives.",
      facts: ["Ahl at-Taqwa", "Ahl al-Maghfirah"],
      quote: q74(56),
      source: ik(56, "Qatadah said Allah deserves to be feared, and He is worthy to forgive whoever turns to Him and repents.", "He deserves to be feared and He is eligible to forgive the sin of whoever turns to Him"),
      difficulty: 2,
      questions: [
        { q: "What is the Quran called in 74:54?", a: "An admonition", wrong: ["A song", "A tale", "A riddle"], why: "Nay, verily, this is an admonition, meaning, truly the Quran is a reminder." },
        { q: "Whom does Allah forgive, per Qatadah?", a: "Whoever turns to Him", wrong: ["No one", "Only kings", "Only the rich"], why: "He is eligible to forgive the sin of whoever turns to Him and repents." },
        { tf: true, q: "We take heed only if Allah wills.", why: "And they will not receive admonition unless Allah wills." }
      ]
    }
  ]
};

export const MUDDATHTHIR_UNITS: readonly DeepUnit[] = [MUDDATHTHIR_ONE, MUDDATHTHIR_TWO, MUDDATHTHIR_THREE, MUDDATHTHIR_FOUR];
