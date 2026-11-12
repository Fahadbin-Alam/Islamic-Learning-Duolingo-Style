import { hadith, type DeepUnit } from "./deepKit";

// One more Hajj unit: Hajj as he ﷺ taught it, from Sahih al-Bukhari, Sahih Muslim, Sunan Ibn Majah and Sunan Abi
// Dawud. Tawaf riding for one who is ill, taking the rites from him, a plain saddle, Ibn Mas'ud throwing where he ﷺ
// stood, Ibn Umar walking as he ﷺ walked, and leaving Muzdalifah before sunrise. Every card is one sahih hadith with
// its number, narrator and grade, and its exact English words to highlight. None of these hadith is taught anywhere
// else in the app.

const TAUGHT: DeepUnit = {
  key: "hajj-as-he-taught-it",
  topicId: "hajj",
  branchId: "hajj-as-he-taught-it",
  branch: { title: "Hajj as he ﷺ taught it", description: "Tawaf riding when ill, taking the rites from him, a plain saddle, Ibn Mas'ud's pebbles, Ibn Umar's walk, and leaving before sunrise." },
  name: "Hajj as he ﷺ taught it",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "riding-when-ill",
      title: "Riding when ill",
      line: "Umm Salamah was ill, so he ﷺ let her do tawaf riding.",
      facts: ["Told by Umm Salamah", "She went round behind the people", "He ﷺ was reciting Surah At-Tur"],
      source: hadith("bukhari", "1619", "Umm Salamah", "Sahih", "Umm Salamah, the wife of the Prophet ﷺ, said: I told the Messenger of Allah ﷺ that I was ill. He said: do the tawaf riding, behind the people. So I did, while the Prophet ﷺ was praying beside the Ka'bah and reciting Surah At-Tur.", "Perform the Tawaf while riding behind the people"),
      difficulty: 1,
      questions: [
        { q: "Why did Umm Salamah do tawaf riding?", a: "She was unwell", wrong: ["She was in a hurry", "She had lost her way", "She was leading a group"], why: "She told him she was ill, and he said: do the tawaf riding, behind the people." },
        { q: "Which surah was he ﷺ reciting while she went round?", a: "At-Tur", wrong: ["Al-Mulk", "Yasin", "Al-Kahf"], why: "He ﷺ was praying beside the Ka'bah and reciting Surat at-Tur, Umm Salamah said." },
        { q: "He ﷺ told her to go round behind the people.", tf: true, why: "Perform the Tawaf while riding behind the people, he ﷺ told Umm Salamah." }
      ]
    },
    {
      slug: "take-your-rites-from-me",
      title: "Take your rites from me",
      line: "On his last Hajj he ﷺ said: learn your rites from me.",
      facts: ["Told by Jabir ibn Abdullah", "He ﷺ threw pebbles riding his camel", "The Day of Nahr is the day of sacrifice"],
      source: hadith("muslim", "1297", "Jabir ibn Abdullah", "Sahih", "Jabir said: I saw the Messenger of Allah ﷺ throwing pebbles while riding his camel on the Day of Nahr, and he was saying: take your rites from me, for I do not know whether I will do Hajj again after this Hajj of mine.", "for I do not know whether I would be performing Hajj after this Hajj of mine"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ tell the people to learn from him?", a: "The rites of Hajj", wrong: ["The roads to Makkah", "The names of the stars", "The old Arab poems"], why: "Learn your rituals by seeing me do them, he ﷺ said while throwing the pebbles." },
        { q: "Why did he ﷺ say to learn them then?", a: "He might not do Hajj again", wrong: ["The rites would soon change", "Makkah would soon close", "Hajj was only for that year"], why: "I do not know whether I would perform Hajj after this Hajj of mine, he ﷺ said." },
        { q: "He ﷺ threw the pebbles while riding his camel.", tf: true, why: "Jabir saw him ﷺ throwing pebbles while riding his camel on the Day of Nahr." }
      ]
    },
    {
      slug: "a-plain-saddle",
      title: "A plain saddle",
      line: "He ﷺ did Hajj on a plain saddle that also held his bags.",
      facts: ["Told by Anas ibn Malik", "A packsaddle is a simple camel saddle", "Anas did his Hajj the same way"],
      source: hadith("bukhari", "1517", "Anas ibn Malik", "Sahih", "Thumamah ibn Abdullah ibn Anas said: Anas did Hajj on a plain packsaddle, and he was not a miser. Anas said: the Messenger of Allah ﷺ did Hajj on a packsaddle, and the same camel carried his baggage too.", "performed Hajj on a packsaddle and the same Mount was carrying his baggage too"),
      difficulty: 1,
      questions: [
        { q: "What is a packsaddle?", a: "A simple camel saddle", wrong: ["A kind of tent", "A leather water bag", "A wooden cart"], why: "He ﷺ did Hajj on a packsaddle, and the same mount carried his bags too, Anas said." },
        { q: "How many camels carried him ﷺ and his bags?", a: "One camel for both", wrong: ["Two camels", "Three camels", "Ten camels"], why: "The same Mount was carrying his baggage too, Anas said." },
        { q: "Anas did his Hajj on a plain saddle as well.", tf: true, why: "Anas performed the Hajj on a packsaddle, and he was not a miser, Thumamah said." }
      ]
    },
    {
      slug: "ibn-masuds-pebbles",
      title: "Ibn Mas'ud's pebbles",
      line: "Ibn Mas'ud threw his pebbles where he ﷺ had stood.",
      facts: ["Told by Abdullah ibn Mas'ud", "The big Jamrah is Jamrat al-Aqabah", "He threw seven small pebbles"],
      source: hadith("bukhari", "1749", "Abdullah ibn Mas'ud", "Sahih", "Abdur-Rahman ibn Yazid said: I did Hajj with Ibn Mas'ud and saw him throw seven small pebbles at the big Jamrah, with the Ka'bah on his left and Mina on his right. Then he said: this is where the one to whom Surah Al-Baqarah was revealed stood, meaning the Messenger of Allah ﷺ.", "This is the place where the one on whom Surat-al-Baqara was revealed"),
      difficulty: 2,
      questions: [
        { q: "Why did Ibn Mas'ud throw from that spot?", a: "To follow the Sunnah exactly", wrong: ["To be closest to Makkah", "To find the most shade", "To get away from the crowd"], why: "This is the place where the one on whom Al-Baqarah was revealed stood, he said." },
        { q: "Which surah did Ibn Mas'ud name?", a: "Al-Baqarah", wrong: ["Al-Hajj", "Al Imran", "An-Nisa"], why: "That is where the one on whom Surat al-Baqarah was revealed stood, Ibn Mas'ud said." },
        { q: "Ibn Mas'ud threw seven small pebbles at the big Jamrah.", tf: true, why: "Abdur-Rahman saw him do Rami of the big Jamra with seven small pebbles." }
      ]
    },
    {
      slug: "ibn-umars-walk",
      title: "Ibn Umar's walk",
      line: "Ibn Umar hurried or walked in sa'i, just as he ﷺ did.",
      facts: ["Told by Abdullah ibn Umar", "Sa'i is going between Safa and Marwah", "Ibn Umar was an old man by then"],
      source: hadith("ibnmajah", "2988", "Abdullah ibn Umar", "Sahih (Al-Albani)", "Ibn Umar said: if I go quickly between Safa and Marwah, it is because I saw the Messenger of Allah ﷺ go quickly, and if I walk, it is because I saw the Messenger of Allah ﷺ walk, even though I am an old man.", "If I go quickly between Safa and Marwah, that is because I saw the Messenger of Allah"),
      difficulty: 2,
      questions: [
        { q: "Why did Ibn Umar walk at times between Safa and Marwah?", a: "To do just what he had seen", wrong: ["To keep off the wet ground", "To talk with the people", "To wait for his camel"], why: "If I walk, that is because I saw the Messenger of Allah ﷺ walking, Ibn Umar said." },
        { q: "Where is sa'i done?", a: "Between Safa and Marwah", wrong: ["Around the Ka'bah", "At the Jamarat", "On Mount Arafah"], why: "If I go quickly between Safa and Marwah, I saw him ﷺ go quickly, Ibn Umar said." },
        { q: "Ibn Umar did what he had seen the Prophet ﷺ do, even when old.", tf: true, why: "I saw the Messenger of Allah ﷺ walking, even though I am an old man, Ibn Umar said." }
      ]
    },
    {
      slug: "before-the-sunrise",
      title: "Before the sunrise",
      line: "He ﷺ left Muzdalifah before sunrise, unlike the pagan Arabs.",
      facts: ["Told by Umar ibn al-Khattab", "The pagans waited for sun on Mount Thabir", "Muzdalifah is between Arafah and Mina"],
      source: hadith("abudawud", "1938", "Umar ibn al-Khattab", "Sahih (Al-Albani)", "Umar ibn al-Khattab said: before Islam, the Arabs would not leave Muzdalifah until they saw the sunlight on Mount Thabir. The Prophet ﷺ went against them and left before sunrise.", "opposed them and returned before the sunrise"),
      difficulty: 2,
      questions: [
        { q: "Until when did the pagans stay at Muzdalifah?", a: "Until the sun rose", wrong: ["Until noon", "Until sunset", "Until midnight"], why: "Before Islam, the Arabs did not leave Muzdalifah until the sun rose, Umar said." },
        { q: "Which mountain did the pagans wait to see in sunlight?", a: "Mount Thabir", wrong: ["Mount Uhud", "Mount Hira", "Mount Thawr"], why: "They did not leave al-Muzdalifah till they saw sunlight on the mountain Thabir." },
        { q: "He ﷺ left Muzdalifah before the sun rose.", tf: true, why: "The Prophet ﷺ opposed them and returned before the sunrise, Umar said." }
      ]
    }
  ]
};

export const HAJJ_TAUGHT_UNITS: readonly DeepUnit[] = [TAUGHT];
