import { hadith, type DeepUnit } from "./deepKit";

// One more Aqidah unit: the balanced way, from Sunan Ibn Majah, Sahih Muslim, Sahih al-Bukhari, Sunan Abi Dawud and
// Sunan an-Nasa'i. Beware of going to extremes in religion, the ruin of those who go too far, a vow of hardship that
// he ﷺ turned into a fast kept well, a good way and moderation as a part of prophethood, his ﷺ prayer and khutbah of
// moderate length, and a du'a for balance in wealth and in poverty. Every card is one sahih or hasan hadith with its
// number, narrator and grade, and its exact English words to highlight. Points the schools differ on are left out,
// and none of these hadith is taught anywhere else in the app.

const BALANCED: DeepUnit = {
  key: "aqidah-the-balanced-way",
  topicId: "aqidah",
  branchId: "aqidah-the-balanced-way",
  branch: { title: "The balanced way", description: "No going to extremes, a vow made easy, a good way and moderation, a prayer of moderate length, and a du'a for balance." },
  name: "the balanced way",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "beware-of-extremes",
      title: "Beware of going to extremes",
      line: "Beware of going to extremes in religion, he ﷺ warned.",
      facts: ["Told by Ibn Abbas", "He ﷺ said it at Hajj, holding small pebbles", "Those before us were ruined by extremes"],
      source: hadith("ibnmajah", "3029", "Ibn Abbas", "Sahih (Al-Albani)", "Ibn Abbas said: on the morning of Aqabah, on his she-camel, the Messenger of Allah ﷺ said: pick up some pebbles for me. I picked up seven small pebbles, and he ﷺ said: throw ones like these. Then he ﷺ said: O people, beware of going to extremes in religion, for those who came before you were destroyed by going to extremes in religion.", "beware of exaggeration in religious matters for those who came before you were doomed because of exaggeration in religious matters"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ warn the people about at Hajj?", a: "Going to extremes in religion", wrong: ["Losing their pebbles", "Selling their camels", "Buying too many gifts"], why: "O people, beware of exaggeration in religious matters, he ﷺ said." },
        { q: "Why must we beware of going to extremes?", a: "Extremes ruined people before us", wrong: ["They cost too much money", "They make people laugh", "They are only for kings"], why: "Those before you were doomed by exaggeration in religion, he ﷺ said." },
        { q: "Going to extremes in religion is a good thing.", tf: false, why: "No. Beware of going to extremes in religion, for it ruined those before you, he ﷺ said." }
      ]
    },
    {
      slug: "those-who-go-too-far",
      title: "Ruined are those who go too far",
      line: "He ﷺ said three times: ruined are those who go to extremes.",
      facts: ["Told by Abdullah ibn Mas'ud", "Going too far: making religion harder than Allah made it", "He ﷺ said it three times"],
      source: hadith("muslim", "2670", "Abdullah ibn Mas'ud", "Sahih", "Abdullah ibn Mas'ud said: the Messenger of Allah ﷺ said: ruined are those who go too far. He ﷺ said it three times.", "Ruined, were those who indulged in hair-splitting"),
      difficulty: 1,
      questions: [
        { q: "Who did he ﷺ say were ruined?", a: "Those who go to extremes", wrong: ["Those who walk fast", "Those who live by the sea", "Those who build houses"], why: "Ruined, were those who indulged in hair-splitting, he ﷺ said, three times over." },
        { q: "How many times did he ﷺ say it?", a: "Three times", wrong: ["Once", "Seven times", "Five times"], why: "Ruined are those who go too far, he ﷺ said, and he repeated it thrice." },
        { q: "Making religion harder than Allah made it leads to ruin.", tf: true, why: "Ruined are those who go too far in religion, he ﷺ warned, saying it three times." }
      ]
    },
    {
      slug: "a-vow-of-hardship",
      title: "A vow to stand in the sun",
      line: "Abu Isra'il vowed hardship; he ﷺ kept only the fast.",
      facts: ["Told by Ibn Abbas", "He vowed to stand in the sun and not speak", "He ﷺ let him keep the fast"],
      source: hadith("bukhari", "6704", "Ibn Abbas", "Sahih", "Ibn Abbas said: while the Prophet ﷺ was giving a khutbah, he saw a man standing and asked about him. They said: this is Abu Isra'il; he has vowed to stand and never sit, not to come into the shade, not to speak, and to fast. The Prophet ﷺ said: tell him to speak, to come into the shade and to sit, but let him complete his fast.", "Order him to speak and let him come in the shade, and make him sit down, but let him complete his fast"),
      difficulty: 2,
      questions: [
        { q: "What had Abu Isra'il vowed to do?", a: "Stand in the sun and not speak", wrong: ["Give away all his camels", "Stay awake for a month", "Never eat bread again"], why: "He vowed to stand, never sit, stay out of the shade, not speak, and fast, they said." },
        { q: "Which part of his vow did he ﷺ let him keep?", a: "His fast", wrong: ["Standing in the sun", "Never speaking", "Never sitting down"], why: "Tell him to speak, sit and come into the shade, but complete his fast, he ﷺ said." },
        { q: "Standing in the sun with no shade is worship Allah asks for.", tf: false, why: "No. He ﷺ told him to come into the shade and sit, and to finish only his fast." }
      ]
    },
    {
      slug: "a-part-of-prophethood",
      title: "A good way and moderation",
      line: "A good way, calm manners and moderation are from prophethood.",
      facts: ["Told by Ibn Abbas", "Moderation: not too much and not too little", "One of the many parts of prophethood"],
      source: hadith("abudawud", "4776", "Ibn Abbas", "Hasan (Al-Albani)", "Ibn Abbas said: the Prophet ﷺ said: a good way, a calm and dignified manner, and moderation are one of the parts of prophethood.", "Good way, dignified good bearing and moderation are the twenty-fifth part of Prophecy"),
      difficulty: 2,
      questions: [
        { q: "A good way and moderation are a part of what?", a: "Prophethood", wrong: ["Poetry", "Trade", "Kingship"], why: "Good way, dignified good bearing and moderation are a part of prophecy, he ﷺ said." },
        { q: "What is moderation?", a: "Not too much and not too little", wrong: ["Always doing the most", "Doing nothing at all", "Copying whatever others do"], why: "Moderation is the middle way, named with a good way as a part of prophecy." },
        { q: "A calm and dignified manner is a part of the prophets' ways.", tf: true, why: "Dignified good bearing and moderation are a part of prophecy, he ﷺ said." }
      ]
    },
    {
      slug: "a-prayer-of-moderate-length",
      title: "A prayer of moderate length",
      line: "His ﷺ prayer and his khutbah were both of moderate length.",
      facts: ["Told by Jabir ibn Samurah", "He prayed behind him ﷺ", "Khutbah: the talk before the Jumu'ah prayer"],
      source: hadith("muslim", "866a", "Jabir ibn Samurah", "Sahih", "Jabir ibn Samurah said: I used to pray with the Messenger of Allah ﷺ, and both his prayer and his khutbah were of moderate length.", "both his prayer and sermon were of moderate length"),
      difficulty: 1,
      questions: [
        { q: "What was his ﷺ khutbah like, Jabir ibn Samurah said?", a: "Of moderate length", wrong: ["Hours and hours long", "Read from a scroll", "Only given once a year"], why: "Both his prayer and sermon were of moderate length, Jabir ibn Samurah said." },
        { q: "How did Jabir ibn Samurah know his ﷺ prayer?", a: "He prayed behind him ﷺ", wrong: ["He read it in a book", "He heard it from a traveler", "He saw it in a dream"], why: "I used to pray with the Messenger of Allah ﷺ, Jabir ibn Samurah said." },
        { q: "The khutbah should go on as long as it can.", tf: false, why: "No. His ﷺ prayer and his khutbah were of moderate length, Jabir said." }
      ]
    },
    {
      slug: "balanced-in-wealth-and-need",
      title: "Balanced when rich or poor",
      line: "Ask Allah to keep you balanced in wealth and in poverty.",
      facts: ["Told by Ammar ibn Yasir", "He said it in a short prayer he led", "He heard it from the Prophet ﷺ"],
      source: hadith("nasai", "1305", "Ammar ibn Yasir", "Sahih (Al-Albani)", "As-Sa'ib said: Ammar ibn Yasir led us in prayer and kept it short. He said: I still said du'as I heard from the Messenger of Allah ﷺ: O Allah, by Your knowledge of the unseen and Your power over creation, keep me alive while life is good for me. I ask You to make me fear You in secret and in public, to speak the truth when pleased and when angry, and to be balanced in wealth and in poverty.", "I ask You to make me moderate in times of wealth and poverty"),
      difficulty: 3,
      questions: [
        { q: "When does Ammar's du'a ask Allah to keep us balanced?", a: "In wealth and in poverty", wrong: ["Only on journeys", "Only in Ramadan", "Only at night"], why: "I ask You to make me moderate in times of wealth and poverty, the du'a says." },
        { q: "When does the du'a ask to speak the truth?", a: "When pleased and when angry", wrong: ["Only when it is easy", "Only to our friends", "Only in the masjid"], why: "I ask You to make me true in speech in times of pleasure and of anger, it goes on." },
        { q: "Ammar ibn Yasir learned the du'a from the Prophet ﷺ.", tf: true, why: "He said them in his prayer, as du'as he heard from the Messenger of Allah ﷺ." }
      ]
    }
  ]
};

export const AQIDAH_BALANCED_UNITS: readonly DeepUnit[] = [BALANCED];
