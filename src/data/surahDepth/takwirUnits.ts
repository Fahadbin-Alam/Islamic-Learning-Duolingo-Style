import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah At-Takwir ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on At-Takwir 81:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_81_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on At-Takwir 81:${ayah}`,
    url: `https://quran.com/81:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 81:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q81 = (ayah: number) => quranQuote(81, ayah);


/** Ayahs 1 to 7: the sun folded up, the stars scattered, and everything gathered on the Last Day. */
const TAKWIR_ONE: DeepUnit = {
  key: "takwir1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-81",
  name: "At-Takwir, ayahs 1-7",
  kind: "skill",
  lessonType: "surah",
  surahName: "At-Takwir",
  lessons: [
    {
      slug: "the-sun-folded-up",
      title: "The sun folded up",
      line: "On the Last Day the sun is rolled up, losing its light.",
      facts: ["Kuwwirat: folded up", "Like a turban being wound"],
      quote: q81(1),
      source: ik(1, "Ibn Kathir says At-Takwir means folding one part into another, like a turban; the sun will be rolled up and its light will go.", "part of it will be folded up into another part of it"),
      difficulty: 1,
      questions: [
        { q: "What happens to the sun, per 81:1?", a: "It is folded up", wrong: ["It grows bigger", "It turns green", "It stops in place"], why: "When the sun is Kuwwirat." },
        { q: "What does At-Takwir mean, per Ibn Kathir?", a: "Folding one part into another", wrong: ["Breaking into stones", "Melting into water", "Spinning faster"], why: "At-Takwir means to gather one part of something with another part of it." },
        { tf: true, q: "Qatadah said the sun's light will go away.", why: "Qatadah said, Its light will go away." }
      ]
    },
    {
      slug: "sun-and-moon-folded",
      title: "Sun and moon folded",
      line: "The Prophet ﷺ said the sun and moon will be folded up.",
      facts: ["Both lose their light", "Only Allah remains"],
      quote: q81(1),
      source: hadith("bukhari", "3200", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said the sun and the moon will be folded up, losing their light, on the Day of Resurrection.", "The sun and the moon will be folded up"),
      difficulty: 2,
      questions: [
        { q: "What will be folded up, per the hadith?", a: "The sun and the moon", wrong: ["The seas", "The mountains", "The trees"], why: "The sun and the moon will be folded up on the Day of Resurrection." },
        { q: "When will this happen?", a: "On the Day of Resurrection", wrong: ["Every winter", "Every night", "Never"], why: "The sun and the moon will be folded up on the Day of Resurrection." },
        { tf: true, q: "Folded up means losing their light.", why: "The sun and the moon will be folded up, deprived of their light." }
      ]
    },
    {
      slug: "stars-scattered",
      title: "Stars scattered",
      line: "The stars will fall and scatter like something poured out.",
      facts: ["Inkadarat: scattered", "Insibab: poured out"],
      quote: q81(2),
      source: ik(2, "Ibn Kathir says the stars will be scattered, as in 82:2; the root of the word means to be poured out.", "when they are scattered"),
      difficulty: 2,
      questions: [
        { q: "What happens to the stars, per 81:2?", a: "They are scattered", wrong: ["They grow brighter", "They sing", "They stay still"], why: "And when the stars Inkadarat, meaning, when they are scattered." },
        { q: "Which ayah says the same, per Ibn Kathir?", a: "82:2", wrong: ["2:255", "1:1", "112:1"], why: "And when the stars have fallen and scattered. (82:2)" },
        { tf: true, q: "Inkidar comes from a word meaning to be poured out.", why: "The basis of the word Inkidar is Insibab, which means to be poured out." }
      ]
    },
    {
      slug: "mountains-pass-away",
      title: "Mountains pass away",
      line: "Mountains will leave their places and the earth turns flat.",
      facts: ["Suyyirat: made to move", "A level plain"],
      quote: q81(3),
      source: ik(3, "Ibn Kathir says the mountains will not stay in their places, and the earth will be left a flat, level plain.", "they will not remain in their places"),
      difficulty: 1,
      questions: [
        { q: "What happens to the mountains, per 81:3?", a: "They are made to pass away", wrong: ["They grow taller", "They turn to gold", "They stay forever"], why: "And when the mountains are made to pass away." },
        { q: "How will the earth be left, per Ibn Kathir?", a: "A flat, level plain", wrong: ["Full of hills", "Under water", "Covered in ice"], why: "Then the earth will be left as a flat, level plain." },
        { tf: false, q: "The mountains will stay in their places.", why: "They will not remain in their places and they will be destroyed." }
      ]
    },
    {
      slug: "precious-camels-left",
      title: "Precious camels left alone",
      line: "People will leave their most precious camels in fear.",
      facts: ["Ishar: pregnant she-camels", "Uttilat: abandoned"],
      quote: q81(4),
      source: ik(4, "Ibn Kathir says the Ishar were the best camels, yet people will be too busy with the Day's terror to tend to them.", "So the people will be too busy to tend to her"),
      difficulty: 2,
      questions: [
        { q: "What are Al-Ishar, per Mujahid?", a: "Pregnant she-camels", wrong: ["Young horses", "Sheep", "Birds"], why: "Ikrimah and Mujahid said, Ishar are pregnant she-camels." },
        { q: "Why are they left, per Ibn Kathir?", a: "People are too busy with the terror", wrong: ["They ran away", "They were sold", "They were sick"], why: "This will be due to what will suddenly overtake them of the great, terrifying situation." },
        { tf: true, q: "These camels were the most valued wealth to Arabs.", why: "After she used to be the most important thing to them." }
      ]
    },
    {
      slug: "wild-beasts-gathered",
      title: "Wild beasts gathered",
      line: "Every creature will be gathered on that Day, even the flies.",
      facts: ["Hushirat: gathered", "Animals are communities"],
      quote: q81(5),
      source: ik(5, "Ibn Kathir says the wild beasts will be gathered; Ibn Abbas said everything will be gathered, even the flies.", "Everything will be gathered, even the flies"),
      difficulty: 2,
      questions: [
        { q: "What is gathered, per 81:5?", a: "The wild beasts", wrong: ["The clouds", "The ships", "The coins"], why: "And when the wild beasts are gathered together." },
        { q: "What did Ibn Abbas say is gathered?", a: "Everything, even the flies", wrong: ["Only people", "Only lions", "Nothing"], why: "Ibn Abbas said, Everything will be gathered, even the flies." },
        { tf: true, q: "Ayah 6:38 calls animals communities like us.", why: "Nor a bird that flies with its two wings, but are communities like you." }
      ]
    },
    {
      slug: "the-seas-blaze",
      title: "The seas blaze",
      line: "On that Day even the seas will burn like fire.",
      facts: ["Sujjirat: set ablaze", "See also 52:6"],
      quote: q81(6),
      source: ik(6, "Ibn Kathir says the seas will become a blazing fire, linking the ayah to 52:6, by the seas kindled.", "And when the seas become as blazing fire"),
      difficulty: 2,
      questions: [
        { q: "What happens to the seas, per 81:6?", a: "They become a blazing fire", wrong: ["They freeze", "They dry into sand", "They turn sweet"], why: "And when the seas become as blazing fire." },
        { q: "Which ayah does Ibn Kathir link it to?", a: "52:6, by the seas kindled", wrong: ["1:2, all praise", "112:2, Allah the Eternal", "114:1, Lord of mankind"], why: "And by the seas kindled, Masjur. (52:6)" },
        { tf: false, q: "The seas will stay calm on the Last Day.", why: "And when the seas become as blazing fire." }
      ]
    },
    {
      slug: "souls-paired",
      title: "Souls paired up",
      line: "Each person is grouped with those whose deeds were like his.",
      facts: ["Zuwwijat: paired", "Choose good company"],
      quote: q81(7),
      source: ik(7, "Ibn Kathir says each soul is gathered with its like; every man is with those who did the same deeds.", "Every man will be with every group of people who performed the same deeds that he did"),
      difficulty: 2,
      questions: [
        { q: "What happens to souls, per 81:7?", a: "They are joined with their mates", wrong: ["They are erased", "They sleep", "They become stars"], why: "And when the souls are joined with their mates." },
        { q: "With whom is each person grouped?", a: "Those who did the same deeds", wrong: ["Those from his city", "Those of his height", "Strangers at random"], why: "Every man will be with every group of people who performed the same deeds that he did." },
        { tf: true, q: "Ayah 56:7 speaks of people in three groups.", why: "And you all will be in three groups." }
      ]
    }
  ]
};

/** Ayahs 8 to 14: the wronged baby girl, the open pages, Jannah brought near, and every soul knowing its deeds. */
const TAKWIR_TWO: DeepUnit = {
  key: "takwir2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-81",
  name: "At-Takwir, ayahs 8-14",
  kind: "skill",
  lessonType: "surah",
  surahName: "At-Takwir",
  lessons: [
    {
      slug: "the-wronged-baby-girl",
      title: "The wronged baby girl",
      line: "Before Islam some buried baby girls; Allah will ask about them.",
      facts: ["Al-Maw'udah: the buried girl", "Islam ended this cruelty"],
      quote: q81(8),
      source: ik(8, "Ibn Kathir says some people before Islam buried baby girls out of hatred of girls; asking the girl warns the one who wronged her.", "if the one who was wronged is questioned"),
      difficulty: 2,
      questions: [
        { q: "Why did some bury baby girls before Islam?", a: "They hated having girls", wrong: ["They were told to", "For a festival", "It never happened"], why: "The people of the pre-Islamic time of ignorance would bury in the dirt due to their hatred of girls." },
        { q: "Whom does her question warn, per Ibn Kathir?", a: "The one who wronged her", wrong: ["Her mother", "The angels", "The animals"], why: "If the one who was wronged is questioned, what does the wrongdoer think then?" },
        { tf: true, q: "Allah takes the side of the one who was wronged.", why: "This will be a means of frightening her murderer." }
      ]
    },
    {
      slug: "for-what-sin",
      title: "For what sin?",
      line: "She did no wrong, and that Day she will ask for justice.",
      facts: ["Bi ayyi dhanbin: for what sin", "No one is wronged forever"],
      quote: q81(9),
      source: ik(9, "Ibn Abbas said she will ask; Abu Ad-Duha said she will demand justice for her blood.", "She will ask, meaning she will demand restitution for her blood"),
      difficulty: 2,
      questions: [
        { q: "What is asked in 81:9?", a: "For what sin was she killed?", wrong: ["Where is her home?", "Who is her friend?", "What is her name?"], why: "For what sin was she killed?" },
        { q: "What will she demand, per Abu Ad-Duha?", a: "Justice for her blood", wrong: ["Gold", "A house", "Nothing"], why: "She will ask, meaning she will demand restitution for her blood." },
        { tf: false, q: "The baby girl had done a sin.", why: "The female infant will be asked what sin she committed that caused her to be killed." }
      ]
    },
    {
      slug: "daughters-a-shield",
      title: "Daughters are a shield",
      line: "Daughters treated kindly become a shield from the Fire.",
      facts: ["Daughters are a blessing", "Kindness to girls"],
      quote: q81(9),
      source: hadith("bukhari", "5995", "Aishah", "Sahih", "A mother split one date between her two daughters; the Prophet ﷺ said whoever is tested with daughters and is generous to them, they will shield him from the Fire.", "then they will act as a shield for him from the"),
      difficulty: 3,
      questions: [
        { q: "What did the mother do with one date?", a: "Split it between her two daughters", wrong: ["Ate it herself", "Threw it away", "Sold it"], why: "She found nothing with me except one date which I gave to her and she divided it between her two daughters." },
        { q: "What will daughters be, per the hadith?", a: "A shield from the Fire", wrong: ["A burden", "A punishment", "A test with no reward"], why: "Then they will act as a shield for him from the Fire." },
        { tf: true, q: "Being generous to daughters brings great reward.", why: "Whoever is in charge of these daughters and treats them generously, then they will act as a shield for him." }
      ]
    },
    {
      slug: "pages-laid-open",
      title: "Pages laid open",
      line: "Each person's record will be handed to him, written as he lived.",
      facts: ["Suhuf: pages", "We write our own record"],
      quote: q81(10),
      source: ik(10, "Qatadah said your page is written, rolled up, then given to you; so look at what you yourself have had written.", "So let each man look at what he himself dictated to be written in his paper"),
      difficulty: 2,
      questions: [
        { q: "What is laid open, per 81:10?", a: "The pages", wrong: ["The doors", "The graves", "The seas"], why: "And when the pages are laid open." },
        { q: "How is the paper given, per Ad-Dahhak?", a: "In the right or the left hand", wrong: ["On the head", "In a box", "Not at all"], why: "Every person will be given his paper in his right hand or in his left hand." },
        { tf: true, q: "Qatadah said we dictate what is written in our pages.", why: "Let each man look at what he himself dictated to be written in his paper." }
      ]
    },
    {
      slug: "sky-stripped-away",
      title: "The sky stripped away",
      line: "The sky will be pulled away like a cover being stripped off.",
      facts: ["Kushitat: stripped off", "Nothing stays hidden"],
      quote: q81(11),
      source: ik(11, "Mujahid said the heaven will be drawn away; As-Suddi said stripped off.", "Stripped off"),
      difficulty: 2,
      questions: [
        { q: "What happens to the heaven, per 81:11?", a: "It is stripped off", wrong: ["It turns green", "It grows thicker", "It stays the same"], why: "And when the heaven is Kushitat." },
        { q: "What did Mujahid say Kushitat means?", a: "It is drawn away", wrong: ["It is painted", "It is filled", "It is lit"], why: "Mujahid said, It drawns away." },
        { tf: false, q: "As-Suddi said Kushitat means painted gold.", why: "As-Suddi said, Stripped off." }
      ]
    },
    {
      slug: "jannah-brought-near",
      title: "Jannah brought near",
      line: "The Fire is kindled and Jannah is brought close to its people.",
      facts: ["Su'irat: kindled", "Uzlifat: brought near"],
      quote: q81(13),
      source: ik(13, "Ad-Dahhak, Qatadah and others said Paradise will be brought near to its people; As-Suddi said Hell is heated.", "This means it will be brought near to its inhabitants"),
      difficulty: 2,
      questions: [
        { q: "What is brought near, per 81:13?", a: "Paradise", wrong: ["The sea", "The moon", "A city"], why: "And when Paradise is brought near." },
        { q: "What does Su'irat mean, per As-Suddi?", a: "It is heated", wrong: ["It is cooled", "It is closed", "It is moved"], why: "As-Suddi said, It is heated." },
        { tf: true, q: "Paradise is brought near to its people.", why: "This means it will be brought near to its inhabitants." }
      ]
    },
    {
      slug: "every-soul-will-know",
      title: "Every soul will know",
      line: "When all this happens, each soul will know what it has done.",
      facts: ["Ahdarat: brought forth", "Good and bad both shown"],
      quote: q81(14),
      source: ik(14, "Ibn Kathir says the ayah answers all the signs before it: then every soul will know what it has done.", "every soul will know what it has done"),
      difficulty: 2,
      questions: [
        { q: "What will every person know, per 81:14?", a: "What he has brought", wrong: ["The time of sunset", "Others' secrets", "Nothing"], why: "Every person will know what he has brought." },
        { q: "Which ayah does Ibn Kathir link it to?", a: "3:30, confronted with all the good and evil", wrong: ["1:5, You alone we worship", "2:2, no doubt in it", "110:1, victory comes"], why: "On the Day when every person will be confronted with all the good he has done, and all the evil he has done." },
        { tf: false, q: "Some deeds will be hidden from their doers that Day.", why: "Every soul will know what it has done, and that will be brought forth for it." }
      ]
    }
  ]
};

/** Ayahs 15 to 29: the hiding stars, Jibril the trusted messenger, and the Quran as a reminder for all. */
const TAKWIR_THREE: DeepUnit = {
  key: "takwir3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-81",
  name: "At-Takwir, ayahs 15-29",
  kind: "skill",
  lessonType: "surah",
  surahName: "At-Takwir",
  lessons: [
    {
      slug: "stars-that-hide",
      title: "Stars that hide",
      line: "Allah swears by stars that hide by day and move at night.",
      facts: ["Al-Khunnas: those that withdraw", "Al-Kunnas: those that hide"],
      quote: q81(15),
      source: ik(15, "Ali was asked about Al-Khunnas and said they are the stars that disappear in the day and appear at night.", "These are the stars that withdraw"),
      difficulty: 2,
      questions: [
        { q: "What are Al-Khunnas, per Ali?", a: "Stars that hide by day", wrong: ["Birds at dawn", "Fish in the sea", "Winds of winter"], why: "These are the stars that withdraw during the day and sweep across the sky at night." },
        { q: "What does 81:16 call them?", a: "Al-Jawar Al-Kunnas", wrong: ["Al-Asifat", "Al-Mursalat", "As-Sabihat"], why: "Al-Jawar Al-Kunnas." },
        { tf: true, q: "These stars appear and sweep across the sky at night.", why: "And sweep across the sky, appear, at night." }
      ]
    },
    {
      slug: "recited-at-fajr",
      title: "Recited at Fajr",
      line: "The Prophet ﷺ recited these oaths in the Fajr prayer.",
      facts: ["Salat al-Fajr", "Short surahs in prayer"],
      quote: q81(17),
      source: hadith("muslim", "456", "Amr bin Huraith", "Sahih", "Amr bin Huraith heard the Prophet ﷺ recite, by the night when it As'as, in the morning prayer.", "recite in the morning prayer"),
      difficulty: 2,
      questions: [
        { q: "In which prayer did he recite it?", a: "The morning prayer", wrong: ["Isha", "Asr", "Jumuah only"], why: "I heard the Messenger of Allah recite in the morning prayer." },
        { q: "Which ayah did Amr hear, per the hadith?", a: "By the night when it As'as", wrong: ["By the fig and olive", "By the sun", "By the dawn"], why: "Wal-laili idha As'asa." },
        { tf: true, q: "At-Takwir was recited aloud in Fajr.", why: "I prayed the Morning prayer behind the Prophet ﷺ and I heard him reciting." }
      ]
    },
    {
      slug: "night-and-dawn",
      title: "Night and dawn",
      line: "Allah swears by the coming night and the breathing dawn.",
      facts: ["As'as: comes or goes", "Tanaffas: breathes, brightens"],
      quote: q81(18),
      source: ik(18, "Ibn Kathir says As'as can mean coming or going; he prefers coming. Qatadah said the day Tanaffas when it brightens.", "When it brightens and advances"),
      difficulty: 3,
      questions: [
        { q: "What does Tanaffas mean, per Qatadah?", a: "It brightens and advances", wrong: ["It ends", "It rains", "It sleeps"], why: "Qatadah said, When it brightens and advances." },
        { q: "Which meaning of As'as does Ibn Kathir prefer?", a: "When it approaches", wrong: ["When it is hot", "When it is noisy", "When it stops"], why: "I believe that the intent is when it approaches." },
        { tf: true, q: "As'as can mean both coming and going.", why: "The word As'as is used to mean advancing and retreating, with both meanings sharing the same word." }
      ]
    },
    {
      slug: "an-honourable-messenger",
      title: "An honourable messenger",
      line: "The Quran was brought by Jibril, a noble angel.",
      facts: ["Rasul karim: noble messenger", "Jibril brought the Quran"],
      quote: q81(19),
      source: ik(19, "Ibn Kathir says the noble messenger is an honourable angel with good character and radiant appearance: Jibril.", "he is Jibril"),
      difficulty: 1,
      questions: [
        { q: "Who is the honourable messenger in 81:19?", a: "Jibril", wrong: ["Mikail", "Israfil", "A poet"], why: "Referring to an honorable angel, who has good character and a radiant appearance, and he is Jibril." },
        { q: "Whose word does he bring, per 81:19?", a: "The Word through a noble messenger", wrong: ["His own poems", "Old stories", "Rumours"], why: "Verily, this is the Word of a most honorable messenger." },
        { tf: true, q: "Ibn Abbas and many others said the messenger is Jibril.", why: "Ibn Abbas, Ash-Shabi, Maymun bin Mihran, Al-Hasan, Qatadah and others have said this." }
      ]
    },
    {
      slug: "mighty-and-trusted",
      title: "Mighty and trusted",
      line: "Jibril is strong, high in rank, obeyed and trustworthy.",
      facts: ["Dhi Quwwah: mighty", "Amin: trustworthy"],
      quote: q81(20),
      source: ik(20, "Ibn Kathir says Jibril has high status and rank with Allah, is obeyed among the highest angels, and is trustworthy.", "he has high status and lofty rank with Allah"),
      difficulty: 2,
      questions: [
        { q: "What is Jibril, per 81:20?", a: "Mighty, with high rank by the Throne", wrong: ["Weak and lowly", "Unknown", "A human king"], why: "Dhi Quwwah, with the Lord of the Throne, Makin." },
        { q: "Where is he obeyed, per Qatadah?", a: "In the heavens", wrong: ["In the markets", "In the deserts", "In the seas"], why: "Qatadah said, Obeyed there, This means in the heavens." },
        { tf: false, q: "Jibril is a low-ranking angel.", why: "He is not one of the lower ranking angels. Rather he is from the high ranking, prestigious angels." }
      ]
    },
    {
      slug: "not-a-madman",
      title: "Your companion is not mad",
      line: "Allah defends His Prophet ﷺ: your companion is not a madman.",
      facts: ["Sahibukum: your companion", "Allah praises both messengers"],
      quote: q81(22),
      source: ik(22, "Ash-Shabi and others said your companion means Muhammad ﷺ; Allah praised both His angelic and human messengers.", "This refers to Muhammad"),
      difficulty: 1,
      questions: [
        { q: "Who is your companion in 81:22?", a: "Muhammad ﷺ", wrong: ["Jibril", "Abu Bakr", "Musa"], why: "Ash-Shabi, Maymun bin Mihran, Abu Salih and others all said, This refers to Muhammad." },
        { q: "What does 81:22 deny about him?", a: "That he is a madman", wrong: ["That he is honest", "That he is kind", "That he prays"], why: "And your companion is not a madman." },
        { tf: true, q: "Allah praised both Jibril and Muhammad ﷺ.", why: "The Almighty Lord has commended His angelic Messenger, Jibril, just as He has commended His human Messenger, Muhammad." }
      ]
    },
    {
      slug: "he-saw-jibril",
      title: "He saw Jibril",
      line: "The Prophet ﷺ saw Jibril's true form on the clear horizon.",
      facts: ["Al-Ufuq al-Mubin: clear horizon", "First sighting in Makkah"],
      quote: q81(23),
      source: ik(23, "Ibn Kathir says Muhammad ﷺ saw Jibril in his true created form on the clear horizon; this was the first sighting, in Makkah.", "in the form that Allah created him in"),
      difficulty: 2,
      questions: [
        { q: "Where did he see him, per 81:23?", a: "On the clear horizon", wrong: ["In a dream only", "In a mosque", "At sea"], why: "And indeed he saw him in the clear horizon." },
        { q: "Which sighting was it, per Ibn Kathir?", a: "The first, in Makkah", wrong: ["The last", "In Madinah", "In Jerusalem"], why: "This refers to the first sighting which occurred at Al-Batha, Makkah." },
        { tf: true, q: "Ibn Kathir thinks At-Takwir came before the Night Journey.", why: "This Surah was revealed before the Night Journey, because nothing has been mentioned in it except this sighting." }
      ]
    },
    {
      slug: "six-hundred-wings",
      title: "Six hundred wings",
      line: "Ibn Masud reported the Prophet ﷺ saw Jibril with 600 wings.",
      facts: ["Angels are mighty creations", "Jibril's true form"],
      quote: q81(23),
      source: hadith("bukhari", "3232", "Abdullah ibn Mas'ud", "Sahih", "Ibn Masud told that the Prophet ﷺ had seen the angel of revelation with six hundred wings.", "having 600 wings"),
      difficulty: 3,
      questions: [
        { q: "How many wings did he see, per the hadith?", a: "Six hundred", wrong: ["Two", "Seventy", "Twelve"], why: "The Prophet ﷺ had seen him having 600 wings." },
        { q: "Who reported this?", a: "Ibn Masud", wrong: ["Abu Jahl", "Abu Lahab", "Fir'awn"], why: "Ibn Masud informed us that the Prophet ﷺ had seen him having 600 wings." },
        { tf: true, q: "Ibn Kathir also mentions the six hundred wings.", why: "In the form that Allah created him in, and he had six hundred wings." }
      ]
    },
    {
      slug: "not-holding-back",
      title: "Nothing held back",
      line: "The Prophet ﷺ passed on all of the revelation and hid nothing.",
      facts: ["Danin: stingy", "Zanin: doubtful"],
      quote: q81(24),
      source: ik(24, "Qatadah said Allah revealed the unseen Quran to Muhammad ﷺ and he did not keep it from people but conveyed it to all.", "he did not withhold it from the people"),
      difficulty: 3,
      questions: [
        { q: "What did he not withhold, per Qatadah?", a: "The revelation", wrong: ["His wealth only", "His food", "His home"], why: "Allah revealed it to Muhammad and he did not withhold it from the people." },
        { q: "What does Danin mean, per Sufyan?", a: "Stingy", wrong: ["Brave", "Tired", "Hungry"], why: "The Danin is one who is stingy." },
        { tf: true, q: "Both readings, Zanin and Danin, are confirmed.", why: "Both of recitations have been confirmed by numerous routes of transmission." }
      ]
    },
    {
      slug: "from-unlettered-to-scholars",
      title: "From unlettered to scholars",
      line: "He ﷺ taught everyone, and his people became great scholars.",
      facts: ["As-Sa'di explains", "Rich, poor, man, woman"],
      quote: q81(24),
      source: saadi(81, 24, "As-Sa'di says the Prophet ﷺ held nothing back from rich or poor, man or woman, town or desert; he was sent to a people who could not read, and before he died they had become great scholars.", "فلم يمت صلى الله عليه وسلم حتى كانوا علماء ربانيين"),
      difficulty: 2,
      questions: [
        { q: "Whom did the Prophet ﷺ teach, per as-Sa'di?", a: "Everyone, rich and poor", wrong: ["Only the rich", "Only men", "Only leaders"], why: "He held back nothing from rich or poor, man or woman, says as-Sa'di." },
        { q: "What had his people become before he ﷺ died?", a: "Great scholars", wrong: ["Still unlettered", "Only traders", "Poets only"], why: "They became godly scholars, and others became their students." },
        { tf: true, q: "The Prophet ﷺ is trusted by the people of heaven and earth.", why: "As-Sa'di on 81:24." }
      ]
    },
    {
      slug: "not-from-shaytan",
      title: "Not from Shaytan",
      line: "Shaytan could never produce the Quran, nor would it suit him.",
      facts: ["Rajim: outcast", "Ayah 26:210"],
      quote: q81(25),
      source: ik(25, "Ibn Kathir says the Quran is not the word of an outcast devil; he is not able to produce it, nor does it suit him.", "he is not able to produce it"),
      difficulty: 2,
      questions: [
        { q: "Whose word is the Quran not, per 81:25?", a: "The outcast Shaytan", wrong: ["Allah", "A noble angel", "The Lord of the Throne"], why: "And it is not the word of the outcast Shaytan." },
        { q: "Why could Shaytan not bring it, per Ibn Kathir?", a: "He is not able to", wrong: ["He was busy", "He forgot", "He was asleep"], why: "This means that he is not able to produce it, nor is it befitting of him to do so." },
        { tf: false, q: "The devils can hear and bring down revelation.", why: "Verily, they have been removed far from hearing it." }
      ]
    },
    {
      slug: "where-are-you-going",
      title: "Where are you going?",
      line: "The truth is clear, so where do deniers' minds go?",
      facts: ["Ayna tadh-habun: where are you going", "Fake words are plain to see"],
      quote: q81(26),
      source: ik(26, "Ibn Kathir says Abu Bakr heard the false words of Musaylimah and said they did not come from a god.", "By Allah, this speech did not come from a god"),
      difficulty: 2,
      questions: [
        { q: "What does 81:26 ask?", a: "Then where are you going?", wrong: ["Who is your father?", "What is your trade?", "When will you sleep?"], why: "Then where are you going?" },
        { q: "What did Abu Bakr say of the false words?", a: "They did not come from a god", wrong: ["They were beautiful", "They were true", "They were old"], why: "By Allah, this speech did not come from a god." },
        { tf: true, q: "Qatadah said it means: away from Allah's Book.", why: "Qatadah said, Then where are you going? Meaning, from the Book of Allah and His obedience." }
      ]
    },
    {
      slug: "a-reminder-for-all",
      title: "A reminder for all",
      line: "The Quran reminds all; seekers of guidance hold to it.",
      facts: ["Dhikr lil-alamin: reminder for all", "Istiqamah: walking straight"],
      quote: q81(27),
      source: ik(28, "Ibn Kathir says whoever seeks guidance must hold to the Quran, for it is his salvation and guidance.", "whoever seeks guidance, then he must adhere to this"),
      difficulty: 2,
      questions: [
        { q: "For whom is the Reminder, per 81:27?", a: "The creatures, all of them", wrong: ["Only Arabs", "Only scholars", "Only kings"], why: "Verily, this is no less than a Reminder to the creatures." },
        { q: "What should a seeker of guidance do?", a: "Hold firmly to the Quran", wrong: ["Follow his whims", "Ask fortune tellers", "Do nothing"], why: "Whoever seeks guidance, then he must adhere to this Quran." },
        { tf: true, q: "The Quran is for whoever wills to walk straight.", why: "To whomsoever among you who wills to walk straight." }
      ]
    },
    {
      slug: "only-if-allah-wills",
      title: "Only if Allah wills",
      line: "We choose, but nothing happens unless Allah wills it.",
      facts: ["Mashi'ah: will", "Rabb al-Alamin: Lord of all"],
      quote: q81(29),
      source: ik(29, "Ibn Kathir says guidance and going astray are not left to people alone but happen by the will of Allah, Lord of all that exists.", "all of this is according to the will of Allah the Exalted"),
      difficulty: 3,
      questions: [
        { q: "What does 81:29 say about our will?", a: "We cannot will unless Allah wills", wrong: ["Our will is all that counts", "Allah has no will", "Will does not exist"], why: "And you cannot will unless that Allah wills, the Lord of all that exists." },
        { q: "Who is the Lord of all that exists?", a: "Allah", wrong: ["The sun", "The angels", "The kings"], why: "He is the Lord of all that exists." },
        { tf: false, q: "Guidance depends only on our own wish.", why: "The will is not left to you all, rather, all of this is according to the will of Allah the Exalted." }
      ]
    }
  ]
};

export const TAKWIR_UNITS: readonly DeepUnit[] = [TAKWIR_ONE, TAKWIR_TWO, TAKWIR_THREE];
