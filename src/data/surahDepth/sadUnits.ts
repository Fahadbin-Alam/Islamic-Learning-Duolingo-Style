import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Sad ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Sad 38:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_38_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Sad 38:${ayah}`,
    url: `https://quran.com/38:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 38:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q38 = (ayah: number) => quranQuote(38, ayah);

/** Ayahs 1 to 16: the Quran full of reminding, the pride of the deniers, and the nations before them. */
const SAD_ONE: DeepUnit = {
  key: "sad1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-38",
  name: "Sad, ayahs 1 to 16",
  kind: "skill",
  lessonType: "surah",
  surahName: "Sad",
  lessons: [
    {
      slug: "the-letter-sad",
      title: "The letter Sad",
      line: "The surah opens with a single letter: Sad.",
      facts: ["One of the separate letters", "Explained at the start of Al-Baqarah"],
      quote: q38(1),
      source: ik(1, "Ibn Kathir says the separate letters were already discussed at the start of the Tafsir of Al-Baqarah.", "We have already discussed the separate letters"),
      difficulty: 1,
      questions: [
        { q: "Which letter opens Surah Sad?", a: "Sad", wrong: ["Qaf", "Nun", "Alif"], why: "Sad. By the Quran full of reminding." },
        { q: "Where did Ibn Kathir explain these letters?", a: "At the start of Al-Baqarah", wrong: ["At the end of An-Nas", "In Al-Fil", "Nowhere"], why: "We have already discussed the separate letters in the beginning of the Tafsir of Surat Al-Baqarah." },
        { tf: true, q: "Some surahs open with separate letters.", why: "We have already discussed the separate letters in the beginning of the Tafsir of Surat Al-Baqarah." }
      ]
    },
    {
      slug: "full-of-reminding",
      title: "Full of reminding",
      line: "Allah swears by the Quran, full of reminding.",
      facts: ["A reminder for this life", "And for the Hereafter"],
      quote: q38(1),
      source: ik(1, "The Quran includes all that is a reminder and a benefit to people in this life and the Hereafter; others said it means full of honour.", "a reminder and a benefit to people in this life and the Hereafter"),
      difficulty: 2,
      questions: [
        { q: "By what does Allah swear, in 38:1?", a: "The Quran full of reminding", wrong: ["The sun", "The fig", "The dawn"], why: "Sad. By the Quran full of reminding." },
        { q: "What does the Quran give, per Ibn Kathir?", a: "Reminder and benefit in both lives", wrong: ["Wealth only", "Fame only", "Nothing new"], why: "A reminder and a benefit to people in this life and the Hereafter." },
        { q: "What did others say the word means?", a: "Full of honour", wrong: ["Full of stories", "Full of rules", "Full of poems"], why: "Full of honor, of high standing. There is no contradiction between the two views." }
      ]
    },
    {
      slug: "false-pride",
      title: "False pride",
      line: "The deniers are in false pride and opposition.",
      facts: ["Pride and tribalism", "Stubborn opposition"],
      quote: q38(2),
      source: ik(2, "False pride means arrogance and tribalism; opposition means they stubbornly go against the Quran.", "arrogance and tribalism"),
      difficulty: 2,
      questions: [
        { q: "What are the deniers in, in 38:2?", a: "False pride and opposition", wrong: ["Joy and peace", "Sleep", "Prayer"], why: "Nay, those who disbelieve are in false pride and opposition." },
        { q: "What is false pride, per Ibn Kathir?", a: "Arrogance and tribalism", wrong: ["Hunger", "Shyness", "Kindness"], why: "Are in false pride, meaning, arrogance and tribalism." },
        { tf: false, q: "The deniers benefit from the reminder.", why: "The disbelievers will not benefit from it because they are in false pride." }
      ]
    },
    {
      slug: "no-time-to-escape",
      title: "No time to escape",
      line: "Past nations cried out, but it was too late.",
      facts: ["They cried for help", "Repenting when life was over"],
      quote: q38(3),
      source: ik(3, "When the punishment came, they called for help, but it did not save them; Muhammad bin Kab said they called for Tawhid when their lives were over.", "They called for Tawhid when their lives were over"),
      difficulty: 2,
      questions: [
        { q: "What did past nations do, in 38:3?", a: "Cried out too late", wrong: ["Escaped", "Won", "Slept"], why: "And they cried out when there was no longer time for escape." },
        { q: "What did they call for, per Muhammad bin Kab?", a: "Tawhid, when life was over", wrong: ["Gold", "Ships", "Kings"], why: "They called for Tawhid when their lives were over." },
        { tf: true, q: "Repentance must come before death arrives.", why: "They resorted to repentance when their lives were over." }
      ]
    },
    {
      slug: "a-warner-from-among-them",
      title: "A warner from among them",
      line: "They wondered that a warner came from among themselves.",
      facts: ["A human like them", "They called him a sorcerer"],
      quote: q38(4),
      source: ik(4, "The idolators were amazed that the Messenger ﷺ was a human being like themselves, and called him a sorcerer and a liar.", "a human being like themselves"),
      difficulty: 2,
      questions: [
        { q: "What amazed them, in 38:4?", a: "A warner from among them", wrong: ["A new star", "A flood", "A big market"], why: "And they wonder that a warner has come to them from among themselves." },
        { q: "What does from among them mean, per Ibn Kathir?", a: "A human being like them", wrong: ["An angel", "A jinn", "A king"], why: "Meaning, a human being like themselves." },
        { q: "What did the deniers call him, in 38:4?", a: "A sorcerer, a liar", wrong: ["A poet only", "A king", "A doctor"], why: "And the disbelievers say: This is a sorcerer, a liar." }
      ]
    },
    {
      slug: "one-god",
      title: "One God",
      line: "They were shocked: has he made the gods into One God?",
      facts: ["Tawhid amazed them", "Idols filled their hearts"],
      quote: q38(5),
      source: ik(5, "They were amazed at the call to worship One God, since their forefathers taught them idol worship.", "the One Who is to worshipped is One and there is no god besides Him"),
      difficulty: 2,
      questions: [
        { q: "What did they find curious, in 38:5?", a: "Making the gods One God", wrong: ["Praying at night", "Giving charity", "Fasting"], why: "Has he made the gods into One God. Verily, this is a curious thing!" },
        { q: "Who taught them idol worship, per Ibn Kathir?", a: "Their forefathers", wrong: ["The Prophets", "The angels", "Their children"], why: "They had learned from their forefathers to worship idols." },
        { tf: true, q: "The Prophet ﷺ called them to worship Allah alone.", why: "The Messenger ﷺ called them to rid their hearts of that and to worship Allah Alone." }
      ]
    },
    {
      slug: "la-ilaha-illallah",
      title: "La ilaha illallah",
      line: "The one word he asked of them was La ilaha illallah.",
      facts: ["The heart of Islam", "Saying it truly leads to Paradise"],
      quote: q38(5),
      source: hadith("muslim", "26", "Uthman ibn Affan", "Sahih", "He who died knowing that there is no god but Allah entered Paradise.", "that there is no god but Allah entered Paradise"),
      difficulty: 2,
      questions: [
        { q: "Who enters Paradise, in the hadith?", a: "One who dies knowing La ilaha illallah", wrong: ["Only the rich", "Only the strong", "Only Arabs"], why: "He who died knowing that there is no god but Allah entered Paradise." },
        { q: "Who narrated the hadith on dying with Tawhid?", a: "Uthman ibn Affan", wrong: ["Abu Jahl", "Abu Talib", "Fir'awn"], why: "It was narrated on the authority of Uthman ibn Affan." },
        { tf: true, q: "Tawhid is what the Quraysh leaders rejected.", why: "Has he made the gods into One God. Verily, this is a curious thing!" }
      ]
    },
    {
      slug: "remain-constant-to-your-gods",
      title: "Remain constant to your gods",
      line: "The leaders said: go on, hold to your gods!",
      facts: ["Chiefs and nobles spoke", "Do not answer his call"],
      quote: q38(6),
      source: ik(6, "The leaders are the chiefs and nobles, telling people to persist in their religion and not answer the call to Tawhid.", "the chiefs and masters and nobles"),
      difficulty: 2,
      questions: [
        { q: "Who went about saying it, in 38:6?", a: "The leaders among them", wrong: ["The children", "The slaves", "The travellers"], why: "And the leaders among them went about saying: Go on, and remain constant to your gods!" },
        { q: "Who are the leaders, per Ibn Kathir?", a: "Chiefs, masters and nobles", wrong: ["Farmers", "Poets", "Shepherds"], why: "Meaning the chiefs and masters and nobles." },
        { q: "What did go on mean, per Ibn Kathir?", a: "Persist in your religion", wrong: ["Go to sleep", "Go to war", "Go to sea"], why: "Go on, meaning, persist in your religion." }
      ]
    },
    {
      slug: "a-thing-designed",
      title: "A thing designed",
      line: "They claimed Tawhid was a plan to gain power.",
      facts: ["A false charge", "They refused to answer"],
      quote: q38(6),
      source: ik(6, "Ibn Jarir said they claimed the call to Tawhid was a plan to gain power and followers.", "something by which he wishes to gain power over you"),
      difficulty: 3,
      questions: [
        { q: "What did they call Tawhid, in 38:6?", a: "A thing designed", wrong: ["A gift", "A dream", "A song"], why: "Verily, this is a thing designed!" },
        { q: "What did they claim he wanted, per Ibn Jarir?", a: "To gain power over them", wrong: ["To leave Makkah", "To sell goods", "To rest"], why: "Something by which he wishes to gain power over you, and exalt his own position." },
        { tf: false, q: "The leaders agreed to answer the call.", why: "So that he will have followers among you, but we will not respond to him." }
      ]
    },
    {
      slug: "nothing-but-an-invention",
      title: "Nothing but an invention",
      line: "They said: we never heard this; it is an invention!",
      facts: ["New to their ears", "They called it a lie"],
      quote: q38(7),
      source: ik(7, "They said they had never heard of this Tawhid in the religion of later days, and called it an invention.", "we have not heard anything like this Tawhid"),
      difficulty: 3,
      questions: [
        { q: "What did they call it, in 38:7?", a: "An invention", wrong: ["A wonder", "A blessing", "A promise"], why: "This is nothing but an invention!" },
        { q: "What had they not heard of, per Ibn Kathir?", a: "This Tawhid", wrong: ["Trade", "Poetry", "Rain"], why: "We have not heard anything like this Tawhid to which Muhammad calls us in the religion of these later days." },
        { q: "What did Mujahid and Qatadah say it means?", a: "A lie", wrong: ["A poem", "A dream", "A truth"], why: "This is nothing but an invention! Mujahid and Qatadah said, A lie." }
      ]
    },
    {
      slug: "sent-down-to-him",
      title: "Sent down to him?",
      line: "They asked: why was the Reminder sent to him alone?",
      facts: ["They doubted Allah's choice", "They had not tasted punishment"],
      quote: q38(8),
      source: ik(8, "They thought it unlikely that he would be singled out to receive the Quran, because they had not yet tasted the punishment.", "They thought it unlikely that he would be singled out from among them"),
      difficulty: 3,
      questions: [
        { q: "What did they ask, in 38:8?", a: "Was the Reminder sent to him alone?", wrong: ["Where is the sea?", "Who is the king?", "When is the feast?"], why: "Has the Reminder been sent down to him alone from among us?" },
        { q: "What did they think unlikely, per Ibn Kathir?", a: "That he was singled out", wrong: ["That rain falls", "That trade works", "That stars shine"], why: "They thought it unlikely that he would be singled out from among them to receive the Quran." },
        { q: "Why did they speak so, per Ibn Kathir?", a: "They had not tasted punishment yet", wrong: ["They were wise", "They were sick", "They were travelling"], why: "They say this because they have not yet tasted the punishment and vengeance of Allah." }
      ]
    },
    {
      slug: "treasures-of-mercy",
      title: "Treasures of mercy",
      line: "Do they own the treasures of your Lord's mercy?",
      facts: ["Allah gives to whom He wills", "The Almighty, the Bestower"],
      quote: q38(9),
      source: ik(9, "Allah is the Almighty whose might cannot be overcome, and the Bestower who gives whatever He wills to whomever He wills.", "the Almighty Whose might cannot be overcome"),
      difficulty: 3,
      questions: [
        { q: "What do they not own, in 38:9?", a: "The treasures of Allah's mercy", wrong: ["Their houses", "Their camels", "Their tents"], why: "Or have they the treasures of the mercy of your Lord, the Almighty, the Real Bestower?" },
        { q: "What does Almighty mean, per Ibn Kathir?", a: "His might cannot be overcome", wrong: ["He is far away", "He sleeps", "He forgets"], why: "The Almighty Whose might cannot be overcome." },
        { q: "What does the Bestower do, per Ibn Kathir?", a: "Gives what He wills to whom He wills", wrong: ["Gives only kings", "Gives nothing", "Gives by luck"], why: "The Bestower Who gives whatever He wills to whomsoever He wills." }
      ]
    },
    {
      slug: "let-them-ascend",
      title: "Let them ascend",
      line: "If they own the heavens, let them climb up!",
      facts: ["A challenge they cannot meet", "The ways to heaven"],
      quote: q38(10),
      source: ik(10, "If they own the heavens and earth, let them ascend; Ibn Abbas, Mujahid and others said the means are the ways to heaven.", "The ways to the heaven"),
      difficulty: 3,
      questions: [
        { q: "What are they challenged to do, in 38:10?", a: "Ascend up with means", wrong: ["Dig a well", "Build a ship", "Cross a sea"], why: "If so, let them ascend up with means." },
        { q: "What are the means, per Ibn Abbas and Mujahid?", a: "The ways to heaven", wrong: ["Ropes", "Camels", "Ladders of wood"], why: "Ibn Abbas, Mujahid, Said bin Jubayr, Qatadah and others said, The ways to the heaven." },
        { tf: true, q: "The dominion of the heavens is Allah's alone.", why: "Or is it that the dominion of the heavens and the earth and all that is between them is theirs?" }
      ]
    },
    {
      slug: "a-defeated-host",
      title: "A defeated host",
      line: "They will be a defeated host, like confederates of old.",
      facts: ["Defeated like those before", "Fulfilled at Badr"],
      quote: q38(11),
      source: ik(11, "The deniers would be defeated and disgraced like the Confederates of old, which is what happened on the day of Badr.", "which is what happened on the day of Badr"),
      difficulty: 3,
      questions: [
        { q: "What will they be, in 38:11?", a: "A defeated host", wrong: ["A great nation", "Kings", "Winners"], why: "They will be a defeated host like the Confederates of the old times." },
        { q: "When did this happen, per Ibn Kathir?", a: "On the day of Badr", wrong: ["At Uhud", "At Tabuk", "Never"], why: "Their multitude will be put to flight, which is what happened on the day of Badr." },
        { tf: true, q: "Allah foretold their defeat before it happened.", why: "These hosts of disbelievers will be defeated and overwhelmed, just as the Confederates of the old times." }
      ]
    },
    {
      slug: "the-nations-before",
      title: "The nations before",
      line: "Nuh, Ad, Firawn, Thamud, Lut and Al-Aykah all denied.",
      facts: ["Stronger than the Quraysh", "Their strength did not save them"],
      quote: q38(12),
      source: ik(12, "These nations were greater and stronger with more wealth and children, but it did not protect them from Allah's punishment.", "they were greater and stronger than you, they had more wealth and children"),
      difficulty: 3,
      questions: [
        { q: "Which Pharaoh title is in 38:12?", a: "Man of stakes", wrong: ["Man of ships", "Man of books", "Man of peace"], why: "And Fir'awn the man of stakes." },
        { q: "Who else is named, in 38:13?", a: "Thamud, Lut's people, Al-Aykah", wrong: ["Quraysh", "Romans", "Persians"], why: "And Thamud, and the people of Lut, and the Dwellers of Al-Aykah." },
        { q: "How were they compared, per Ibn Kathir?", a: "Stronger and richer", wrong: ["Weaker", "Fewer", "Poorer"], why: "They were greater and stronger than you, they had more wealth and children." }
      ]
    },
    {
      slug: "such-were-the-confederates",
      title: "Such were the Confederates",
      line: "Thamud, Lut's people and Al-Aykah: such were the Confederates.",
      facts: ["Their stories are told often", "Great nations, now gone"],
      quote: q38(13),
      source: ik(13, "Allah reminds us of past nations whose stories are told in detail in many places in the Quran.", "We have already seen their stories in detail in numerous places"),
      difficulty: 3,
      questions: [
        { q: "What are these nations called, in 38:13?", a: "The Confederates", wrong: ["The Helpers", "The Emigrants", "The Companions"], why: "And Thamud, and the people of Lut, and the Dwellers of Al-Aykah; such were the Confederates." },
        { q: "To which Prophet was Al-Aykah sent?", a: "Shuayb", wrong: ["Hud", "Salih", "Yunus"], why: "The dwellers of Al-Aykah belied the Messengers, when Shuayb said to them (26:176-177)." },
        { q: "Where are their stories told, per Ibn Kathir?", a: "In many places in the Quran", wrong: ["Nowhere", "Only in poems", "Only in Sad"], why: "We have already seen their stories in detail in numerous places in the Quran." }
      ]
    },
    {
      slug: "they-denied-the-messengers",
      title: "They denied the Messengers",
      line: "Each one denied the Messengers, so punishment was due.",
      facts: ["Denial was the reason", "A warning to those addressed"],
      quote: q38(14),
      source: ik(14, "The reason for their destruction was their disbelief in the Messengers, so those addressed should beware.", "The reason for their destruction was their disbelief in the Messengers"),
      difficulty: 3,
      questions: [
        { q: "What did every one of them do, in 38:14?", a: "Denied the Messengers", wrong: ["Built towers", "Fed the poor", "Kept the Sabbath"], why: "Not one of them but denied the Messengers; therefore My torment was justified." },
        { q: "What was the reason, per Ibn Kathir?", a: "Disbelief in the Messengers", wrong: ["Bad weather", "Wars", "Old age"], why: "The reason for their destruction was their disbelief in the Messengers." },
        { tf: false, q: "Their wealth protected them from punishment.", why: "That did not protect them from the punishment of Allah at all." }
      ]
    },
    {
      slug: "a-single-sayhah",
      title: "A single Sayhah",
      line: "They only wait for one Blast, with no pause.",
      facts: ["The blast on the Trumpet", "Israfil will blow it"],
      quote: q38(15),
      source: ik(15, "This Sayhah is the blast on the Trumpet, when Allah commands Israfil to sound a long note.", "This Sayhah is the blast on the Trumpet"),
      difficulty: 3,
      questions: [
        { q: "What do they wait for, in 38:15?", a: "A single Sayhah", wrong: ["A ship", "Rain", "A king"], why: "And these only wait for a single Sayhah there will be no pause or ending thereto." },
        { q: "What is the Sayhah, per Ibn Kathir?", a: "The blast on the Trumpet", wrong: ["Thunder only", "A war cry", "A bird"], why: "This Sayhah is the blast on the Trumpet." },
        { q: "Who will blow the Trumpet, per Ibn Kathir?", a: "Israfil", wrong: ["Jibril", "Mikail", "Malik"], why: "Allah will command Israfil to sound a long note." }
      ]
    },
    {
      slug: "between-the-two-blowings",
      title: "Between the two blowings",
      line: "The Prophet ﷺ said there is forty between the two blowings.",
      facts: ["Abu Hurairah did not say forty what", "Allah will rebuild the bodies"],
      quote: q38(15),
      source: hadith("bukhari", "4814", "Abu Hurairah", "Sahih", "The Prophet ﷺ said there will be forty between the two blowings of the Trumpet, and Allah will rebuild the bodies.", "Between the two blowing of the trumpet there will be forty"),
      difficulty: 3,
      questions: [
        { q: "What is between the two blowings, in the hadith?", a: "Forty", wrong: ["Seven", "One hundred", "Three"], why: "Between the two blowing of the trumpet there will be forty." },
        { q: "Did Abu Hurairah say forty days or years?", a: "He refused to say", wrong: ["Forty days", "Forty years", "Forty months"], why: "They said, Forty years? I refused to reply." },
        { tf: true, q: "The Trumpet will be blown twice.", why: "Between the two blowing of the trumpet there will be forty." }
      ]
    },
    {
      slug: "hasten-our-share",
      title: "Hasten our share",
      line: "They mocked: Lord, hasten our share before Judgement!",
      facts: ["Said in mockery", "The Prophet ﷺ told to be patient"],
      quote: q38(16),
      source: ik(16, "Allah denounces them for asking for the punishment to be hastened, and commands His Messenger to be patient.", "to be patient in the face of their insults"),
      difficulty: 4,
      questions: [
        { q: "What did they ask for, in 38:16?", a: "Qittana hastened", wrong: ["Rain", "Forgiveness", "Guidance"], why: "Our Lord! Hasten to us Qittana before the Day of Reckoning!" },
        { q: "What did Ibn Abbas and Mujahid say it means?", a: "Hasten the punishment", wrong: ["Hasten the rain", "Hasten the harvest", "Hasten the feast"], why: "Ibn Abbas, Mujahid, Ad-Dahhak, Al-Hasan and others said, They asked for the punishment to be hastened." },
        { q: "What was the Prophet ﷺ told to do, per Ibn Kathir?", a: "Be patient", wrong: ["Leave them", "Curse them", "Fight at once"], why: "Allah commanded His Messenger to be patient in the face of their insults." }
      ]
    }
  ]
};

/** Ayahs 17 to 40: Dawud, the two litigants, the prostration of Sad, and Sulayman's kingdom. */
const SAD_TWO: DeepUnit = {
  key: "sad2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-38",
  name: "Sad, ayahs 17 to 40",
  kind: "skill",
  lessonType: "surah",
  surahName: "Sad",
  lessons: [
    {
      slug: "dawud-endued-with-strength",
      title: "Dawud, full of strength",
      line: "Remember Dawud, strong in worship and ever turning to Allah.",
      facts: ["Strength in knowledge and action", "He prayed a third of the night"],
      quote: q38(17),
      source: ik(17, "Al-Ayd means strength in knowledge and action; Dawud prayed a third of the night and fasted half a lifetime.", "Al-Ayd means strength in knowledge and action"),
      difficulty: 1,
      questions: [
        { q: "Whom are we told to remember, in 38:17?", a: "Dawud", wrong: ["Fir'awn", "Qarun", "Haman"], why: "And remember Our slave Dawud, endued with Al-Ayd." },
        { q: "What does Al-Ayd mean, per Ibn Kathir?", a: "Strength in knowledge and action", wrong: ["Great wealth", "A big army", "A long life"], why: "Al-Ayd means strength in knowledge and action." },
        { q: "How much of the night did he pray, per Ibn Kathir?", a: "A third", wrong: ["All of it", "None", "A tenth"], why: "He used to spend a third of the night in prayer." }
      ]
    },
    {
      slug: "the-fasting-of-dawud",
      title: "The fasting of Dawud",
      line: "The most beloved fasting to Allah is the fasting of Dawud.",
      facts: ["He fasted every other day", "He slept, prayed, then slept"],
      quote: q38(17),
      source: hadith("bukhari", "3420", "Abdullah ibn Amr", "Sahih", "The most beloved fasting and prayer to Allah were those of Dawud: fasting on alternate days and praying a third of the night.", "who used to fast on alternate days"),
      difficulty: 2,
      questions: [
        { q: "How did Dawud fast, in the hadith?", a: "On alternate days", wrong: ["Every day", "Once a year", "Never"], why: "The fasting of David who used to fast on alternate days." },
        { q: "How much of the night did he pray, in the hadith?", a: "A third", wrong: ["Half", "All", "A quarter"], why: "He used to sleep for the first half of the night and pray for 1/3 of it." },
        { tf: true, q: "Balance of rest and worship is beloved to Allah.", why: "The most beloved prayer to Allah was the prayer of David who used to sleep for half of the night." }
      ]
    },
    {
      slug: "the-mountains-glorify",
      title: "The mountains glorify",
      line: "The mountains glorified Allah with Dawud, morning and evening.",
      facts: ["At sunrise and day's end", "Mountains echoed his praise"],
      quote: q38(18),
      source: ik(18, "Allah caused the mountains to glorify His praises with Dawud at sunrise and at the end of the day.", "Allah caused the mountains to glorify His praises with him at sunrise and at the end of the day"),
      difficulty: 2,
      questions: [
        { q: "What glorified Allah with Dawud, in 38:18?", a: "The mountains", wrong: ["The ships", "The idols", "The markets"], why: "Verily, We made the mountains to glorify Our praises with him." },
        { q: "When did they glorify, per Ibn Kathir?", a: "At sunrise and day's end", wrong: ["At midnight only", "At noon only", "Once a year"], why: "At sunrise and at the end of the day." },
        { tf: true, q: "Ibn Abbas linked Ishraq in 38:18 to the Duha prayer.", why: "I used to say, What is Salat Al-Ishraq, but now I know what it is." }
      ]
    },
    {
      slug: "the-birds-assembled",
      title: "The birds assembled",
      line: "The birds gathered too, all obedient to him.",
      facts: ["They hovered in the air", "They glorified Allah with him"],
      quote: q38(19),
      source: ik(19, "If a bird heard Dawud reciting the Zabur, it would stay hovering in the air, glorifying Allah along with him.", "it would stay hovering in the air, glorifying Allah along with him"),
      difficulty: 2,
      questions: [
        { q: "What also gathered, in 38:19?", a: "The birds", wrong: ["The fish", "The lions", "The camels"], why: "And so did the birds assembled, all obedient to him." },
        { q: "What did a passing bird do, per Ibn Kathir?", a: "Hovered and glorified Allah", wrong: ["Flew away", "Slept", "Ate seeds"], why: "It would stay hovering in the air, glorifying Allah along with him." },
        { q: "What was Dawud reciting, per Ibn Kathir?", a: "The Zabur", wrong: ["Poetry", "The Injil", "Songs of war"], why: "If a bird flew by him and heard him chanting the Zabur, it would not go away." }
      ]
    },
    {
      slug: "a-strong-kingdom",
      title: "A strong kingdom",
      line: "Allah made his kingdom strong and gave him wisdom and judgement.",
      facts: ["Wisdom and sound judgement", "Fair rules for every case"],
      quote: q38(20),
      source: ik(20, "Qatadah said sound judgement is two witnesses for the plaintiff or an oath by the defendant, the basis of judging until Resurrection.", "Two witnesses for the plaintiff or an oath on the part of the defendant"),
      difficulty: 2,
      questions: [
        { q: "What did Allah give Dawud, in 38:20?", a: "Al-Hikmah and sound judgement", wrong: ["Ships of gold", "A long beard", "Many horses"], why: "We made his kingdom strong and gave him Al-Hikmah and sound judgement in speech and decision." },
        { q: "What is sound judgement, per Qatadah?", a: "Two witnesses or an oath", wrong: ["Guessing", "Drawing lots", "Asking a poet"], why: "Two witnesses for the plaintiff or an oath on the part of the defendant." },
        { q: "What is Al-Hikmah, per As-Suddi?", a: "Prophethood", wrong: ["Gold", "Medicine", "Building"], why: "As-Suddi said: Al-Hikmah, Prophethood." }
      ]
    },
    {
      slug: "the-work-of-his-hands",
      title: "The work of his hands",
      line: "Though a king, Dawud ate from what he earned himself.",
      facts: ["The best food is earned", "A king who worked"],
      quote: q38(20),
      source: hadith("bukhari", "2072", "Al-Miqdam", "Sahih", "Nobody eats better food than what he earned with his own hands, and Dawud ate from the earnings of his own work.", "used to eat from the earnings of his manual labor"),
      difficulty: 2,
      questions: [
        { q: "What is the best meal, in the hadith?", a: "One earned by your own hands", wrong: ["A king's feast", "A free gift", "Food from the market"], why: "Nobody has ever eaten a better meal than that which one has earned by working with one's own hands." },
        { q: "From what did Dawud eat, in the hadith?", a: "The earnings of his own labour", wrong: ["Taxes", "Gifts", "Spoils"], why: "The Prophet of Allah, David used to eat from the earnings of his manual labor." },
        { tf: true, q: "Honest work is honoured in Islam.", why: "Nobody has ever eaten a better meal than that which one has earned by working with one's own hands." }
      ]
    },
    {
      slug: "the-litigants",
      title: "The litigants",
      line: "Two men climbed the wall into Dawud's prayer room.",
      facts: ["He was in his Mihrab", "Ibn Kathir avoids weak stories"],
      quote: q38(21),
      source: ik(21, "Ibn Kathir says the stories told about this are mostly Israiliyat, so it is better to speak briefly and leave its knowledge to Allah.", "it is better to speak briefly of this story"),
      difficulty: 2,
      questions: [
        { q: "How did they enter, in 38:21?", a: "Climbed over the wall", wrong: ["Through the door", "By boat", "With guards"], why: "When they climbed over the wall into his Mihrab." },
        { q: "What does Ibn Kathir advise about the story?", a: "Speak briefly of it", wrong: ["Add many details", "Make up an end", "Ignore the ayah"], why: "It is better to speak briefly of this story and refer knowledge of it to Allah." },
        { tf: true, q: "Not every story told in tafsir is reliable.", why: "The scholars of Tafsir mention a story which is mostly based upon Israiliyat narrations." }
      ]
    },
    {
      slug: "he-was-startled",
      title: "He was startled",
      line: "Dawud was alarmed, but they said: fear not, judge between us.",
      facts: ["No one was to enter that day", "They asked for a fair ruling"],
      quote: q38(22),
      source: ik(22, "He was alarmed because he was in his Mihrab, where no one was to enter that day, and they had climbed the fence.", "had climbed the fence surrounding his Mihrab"),
      difficulty: 3,
      questions: [
        { q: "What did they ask Dawud, in 38:22?", a: "To judge between them with truth", wrong: ["To give them gold", "To leave", "To fight"], why: "Judge between us with truth, and treat us not with injustice." },
        { q: "Why was he alarmed, per Ibn Kathir?", a: "They climbed into his Mihrab", wrong: ["They had swords", "It was night", "They shouted"], why: "He did not realize that these two people had climbed the fence surrounding his Mihrab." },
        { tf: true, q: "They told him not to be afraid.", why: "They said: Fear not! We are two litigants." }
      ]
    },
    {
      slug: "ninety-nine-ewes",
      title: "Ninety-nine ewes",
      line: "One had ninety-nine ewes and wanted the other's single ewe.",
      facts: ["A case of greed", "He overpowered him in speech"],
      quote: q38(23),
      source: ik(23, "And he overpowered me in speech means he defeated me in argument.", "he defeated me"),
      difficulty: 3,
      questions: [
        { q: "How many ewes did the brother have, in 38:23?", a: "Ninety-nine", wrong: ["Ten", "One hundred", "Seven"], why: "Verily, this my brother has ninety-nine ewes, while I have only one ewe." },
        { q: "What did he demand, in 38:23?", a: "The single ewe", wrong: ["A camel", "A house", "Gold"], why: "And he says: Hand it over to me." },
        { q: "What does overpowered in speech mean, per Ibn Kathir?", a: "He defeated me", wrong: ["He sang to me", "He praised me", "He forgot me"], why: "And he overpowered me in speech means, he defeated me." }
      ]
    },
    {
      slug: "dawud-judges",
      title: "Dawud judges",
      line: "He ruled: he wronged you; many partners wrong each other.",
      facts: ["Except believers who do good", "And they are few"],
      quote: q38(24),
      source: ik(24, "Ibn Abbas said Dawud guessed that Allah had tested him, so he sought forgiveness and fell down prostrate.", "We tested him"),
      difficulty: 3,
      questions: [
        { q: "Who do not wrong their partners, in 38:24?", a: "Believers who do good", wrong: ["The rich", "The strong", "Everyone"], why: "Many partners oppress one another, except those who believe and do righteous good deeds, and they are few." },
        { q: "What did Dawud realise, per Ibn Abbas?", a: "Allah had tested him", wrong: ["He was rich", "They were angels", "He was sick"], why: "Ibn Abbas said that this means, We tested him." },
        { q: "What did he do then, in 38:24?", a: "Fell prostrate and repented", wrong: ["Left the city", "Went to war", "Slept"], why: "And he sought forgiveness of his Lord, and he fell down prostrate and turned to Allah in repentance." }
      ]
    },
    {
      slug: "the-prostration-of-sad",
      title: "The prostration of Sad",
      line: "The Prophet ﷺ prostrated when reciting this ayah.",
      facts: ["Not an obligatory prostration", "Following Dawud's guidance"],
      quote: q38(24),
      source: hadith("bukhari", "1069", "Ibn Abbas", "Sahih", "The prostration of Sad is not compulsory, but Ibn Abbas saw the Prophet ﷺ prostrate when reciting it.", "is not a compulsory one"),
      difficulty: 3,
      questions: [
        { q: "Is the prostration of Sad compulsory, in the hadith?", a: "No", wrong: ["Yes, always", "Only on Friday", "Only in Ramadan"], why: "The prostration of Sad is not a compulsory one." },
        { q: "What did Ibn Abbas see, in the hadith?", a: "The Prophet ﷺ prostrating at it", wrong: ["Him skipping it", "Him standing", "Him leaving"], why: "But I saw the Prophet ﷺ prostrating while reciting it." },
        { q: "What kind of prostration is it, per Ibn Kathir?", a: "A prostration of thanks", wrong: ["A prostration of fear", "A forgotten one", "None at all"], why: "It is a prostration of thanks, Sajdat Shukr." }
      ]
    },
    {
      slug: "follow-their-guidance",
      title: "Follow their guidance",
      line: "Dawud prostrated, so the Prophet ﷺ prostrated too.",
      facts: ["Allah said: follow their guidance", "Dawud is among them"],
      quote: q38(24),
      source: hadith("bukhari", "4807", "Ibn Abbas", "Sahih", "Ibn Abbas explained that Allah told the Prophet ﷺ to follow the guidance of the Prophets, and Dawud prostrated here.", "So David was the one of those prophets whom Prophet"),
      difficulty: 3,
      questions: [
        { q: "Who asked Ibn Abbas about this prostration?", a: "Mujahid", wrong: ["Abu Jahl", "Qarun", "Haman"], why: "I asked Mujahid regarding the prostration in Surat Sad. He said, I asked Ibn Abbas." },
        { q: "Which ayah did Ibn Abbas cite?", a: "So follow their guidance (6:90)", wrong: ["Say He is Allah", "Read in the Name", "By the dawn"], why: "Those are they whom Allah had guided. So follow their guidance (6.90)." },
        { tf: true, q: "The Prophet ﷺ followed Dawud in this prostration.", why: "David prostrated, so Allah's Messenger performed this prostration too." }
      ]
    },
    {
      slug: "forgiven-and-near",
      title: "Forgiven and near",
      line: "Allah forgave him; he has nearness and a good return.",
      facts: ["High levels of Paradise", "For repentance and justice"],
      quote: q38(25),
      source: ik(25, "He will be brought close to Allah and given the lofty levels of Paradise for his repentance and perfect justice.", "the lofty levels of Paradise, because of his repentance and his perfect justice in his kingdom"),
      difficulty: 3,
      questions: [
        { q: "What did Allah do, in 38:25?", a: "Forgave him", wrong: ["Punished him", "Forgot him", "Exiled him"], why: "So, We forgave him that, and verily, for him is a near access to Us." },
        { q: "What is the good return, per Ibn Kathir?", a: "The lofty levels of Paradise", wrong: ["A palace on earth", "A long life", "Gold"], why: "Which means the lofty levels of Paradise." },
        { q: "Why was he given it, per Ibn Kathir?", a: "Repentance and justice", wrong: ["His wealth", "His army", "His family"], why: "Because of his repentance and his perfect justice in his kingdom." }
      ]
    },
    {
      slug: "pulpits-of-light",
      title: "Pulpits of light",
      line: "The just will sit on pulpits of light near Ar-Rahman.",
      facts: ["Just with their families", "And in all they rule"],
      quote: q38(25),
      source: hadith("muslim", "1827", "Abdullah ibn Umar", "Sahih", "Those who are just in their rule, with their families and in all they do will sit on pulpits of light at the right of Ar-Rahman.", "will be seated on the pulpits of light"),
      difficulty: 3,
      questions: [
        { q: "Where will the just sit, in the hadith?", a: "On pulpits of light", wrong: ["On thrones of gold", "On the ground", "On ships"], why: "The Dispensers of justice will be seated on the pulpits of light." },
        { q: "Who are the just, in the hadith?", a: "Fair in rule and with family", wrong: ["Only kings", "Only judges", "Only the rich"], why: "Those who do justice in their rules, in matters relating to their families and in all that they undertake to do." },
        { tf: true, q: "Being fair at home is part of justice.", why: "Those who do justice in their rules, in matters relating to their families." }
      ]
    },
    {
      slug: "judge-with-truth",
      title: "Judge with truth",
      line: "O Dawud, judge with truth and do not follow desire.",
      facts: ["Advice to every ruler", "Desire leads astray"],
      quote: q38(26),
      source: ik(26, "This is advice from Allah to those in authority: rule by the truth and justice He revealed and do not stray.", "This is advice from Allah, may He be exalted, to those who are in positions of authority"),
      difficulty: 3,
      questions: [
        { q: "What was Dawud made, in 38:26?", a: "A successor on the earth", wrong: ["A sailor", "A poet", "A merchant"], why: "O Dawud! Verily, We have placed you as a successor on the earth." },
        { q: "What must he not follow, in 38:26?", a: "Desire", wrong: ["The truth", "The Book", "Justice"], why: "And follow not your desire for it will mislead you from the path of Allah." },
        { q: "To whom is this advice, per Ibn Kathir?", a: "Those in authority", wrong: ["Only children", "Only farmers", "No one"], why: "This is advice from Allah to those who are in positions of authority." }
      ]
    },
    {
      slug: "they-forgot-the-reckoning",
      title: "They forgot the Reckoning",
      line: "Those who stray from Allah's path forgot the Day of Reckoning.",
      facts: ["Neglect brings regret", "Work for that Day"],
      quote: q38(26),
      source: ik(26, "As-Suddi said they neglected to work for the Day of Reckoning, which Ibn Kathir says fits the apparent meaning.", "This interpretation is more in accordance with the apparent meaning of the Ayah"),
      difficulty: 4,
      questions: [
        { q: "Why do the strayers suffer, in 38:26?", a: "They forgot the Day of Reckoning", wrong: ["They were poor", "They were weak", "They were young"], why: "Because they forgot the Day of Reckoning." },
        { q: "What did they neglect, per As-Suddi?", a: "To work for that Day", wrong: ["Their farms", "Their trade", "Their sleep"], why: "Because of what they neglected to do for the sake of the Day of Reckoning." },
        { tf: true, q: "Ibn Kathir preferred As-Suddi's view of 38:26.", why: "This interpretation is more in accordance with the apparent meaning of the Ayah." }
      ]
    },
    {
      slug: "not-without-purpose",
      title: "Not without purpose",
      line: "Allah did not create the heavens and earth without purpose.",
      facts: ["Created to worship Him", "Then all are gathered"],
      quote: q38(27),
      source: ik(27, "Allah did not create the creatures in vain; He created them to worship Him alone, then He will gather them and reward or punish.", "He created them to worship Him Alone"),
      difficulty: 3,
      questions: [
        { q: "How did Allah not create the world, in 38:27?", a: "Without purpose", wrong: ["With wisdom", "With order", "With truth"], why: "And We created not the heaven and the earth and all that is between them without purpose!" },
        { q: "Why were creatures created, per Ibn Kathir?", a: "To worship Him alone", wrong: ["To play", "To rule others", "For no reason"], why: "He created them to worship Him Alone." },
        { q: "Who thinks it was without purpose, per Ibn Kathir?", a: "Those denying the resurrection", wrong: ["The angels", "The Prophets", "The scholars"], why: "Those who do not think that the resurrection and the place of return will occur." }
      ]
    },
    {
      slug: "not-equal",
      title: "Not equal",
      line: "Allah will not treat the righteous like the corrupt.",
      facts: ["Justice needs a Hereafter", "The oppressed get their right"],
      quote: q38(28),
      source: ik(28, "They are not equal before Allah, so there must be another realm where the obedient are rewarded and the oppressed get justice.", "They are not equal before Allah"),
      difficulty: 3,
      questions: [
        { q: "Whom will Allah not treat alike, in 38:28?", a: "The pious and the evildoers", wrong: ["Sun and moon", "Day and night", "Land and sea"], why: "Or shall We treat those who have Taqwa as the evildoers?" },
        { q: "What does Ibn Kathir conclude?", a: "There must be a resurrection", wrong: ["Life is random", "Nothing comes after", "All are the same"], why: "There must inevitably be a resurrection and recompense." },
        { tf: true, q: "Some wrongdoers die rich, so justice needs another life.", why: "We see evildoers and criminals are prospering until they die in that state." }
      ]
    },
    {
      slug: "a-blessed-book",
      title: "A blessed Book",
      line: "A blessed Book, sent down so people ponder its ayahs.",
      facts: ["Full of blessings", "Meant for reflection"],
      quote: q38(29),
      source: ik(29, "The Quran is a blessed Book sent down so people ponder it, and men of understanding are those with wisdom and reason.", "those who are possessed of wisdom and reason"),
      difficulty: 3,
      questions: [
        { q: "Why was the Book sent, in 38:29?", a: "To ponder its ayahs", wrong: ["To hang on walls", "To sell", "To keep closed"], why: "That they may ponder over its Verses, and that men of understanding may remember." },
        { q: "How is the Book described, in 38:29?", a: "Full of blessings", wrong: ["Hard to read", "Only stories", "For one tribe"], why: "A Book which We have sent down to you, full of blessings." },
        { q: "Who are men of understanding, per Ibn Kathir?", a: "Those with wisdom and reason", wrong: ["Rich men", "Strong men", "Old men"], why: "Meaning, those who are possessed of wisdom and reason." }
      ]
    },
    {
      slug: "an-excellent-servant",
      title: "An excellent servant",
      line: "Allah gave Dawud Sulayman: an excellent, repenting servant.",
      facts: ["He inherited prophethood", "Always turning to Allah"],
      quote: q38(30),
      source: ik(30, "Sulayman inherited prophethood from Dawud, and was praised for obedience, much worship and always turning to Allah.", "he inherited prophethood from him"),
      difficulty: 3,
      questions: [
        { q: "Whom did Allah give Dawud, in 38:30?", a: "Sulayman", wrong: ["Yahya", "Harun", "Lut"], why: "And to Dawud We gave Sulayman. How excellent a servant!" },
        { q: "What did Sulayman inherit, per Ibn Kathir?", a: "Prophethood", wrong: ["Only gold", "Only land", "Horses"], why: "And Sulayman inherited Dawud, meaning, he inherited prophethood from him." },
        { q: "Why is he praised, per Ibn Kathir?", a: "Obedient and ever repenting", wrong: ["Rich and famous", "Tall and strong", "A great poet"], why: "He was very much obedient, worshipping Allah much and always turning to Allah in repentance." }
      ]
    },
    {
      slug: "the-fine-horses",
      title: "The fine horses",
      line: "Fine, swift horses were shown to Sulayman in the afternoon.",
      facts: ["He was a king", "Horses of the highest breed"],
      quote: q38(31),
      source: ik(31, "These trained horses were shown to Sulayman as king; Mujahid said they were swift horses.", "they were swift horses"),
      difficulty: 3,
      questions: [
        { q: "What was shown to him, in 38:31?", a: "Well trained horses", wrong: ["Camels", "Ships", "Birds"], why: "When there were displayed before him, in the afternoon, well trained horses of the highest breed." },
        { q: "When were they shown, in 38:31?", a: "In the afternoon", wrong: ["At dawn", "At midnight", "In winter"], why: "When there were displayed before him, in the afternoon." },
        { q: "What were they like, per Mujahid?", a: "Swift", wrong: ["Slow", "Old", "Tiny"], why: "They were the kind of horses which stand on three legs and raise the fourth, and they were swift horses." }
      ]
    },
    {
      slug: "until-the-sun-set",
      title: "Until the sun set",
      line: "Looking at the horses, he forgot Asr until sunset.",
      facts: ["Not on purpose", "The Prophet ﷺ once prayed Asr late"],
      quote: q38(32),
      source: ik(32, "Many Salaf said he missed Asr through forgetfulness, not on purpose, as happened to the Prophet ﷺ on the day of Khandaq.", "He did not miss it deliberately, but because of forgetfulness"),
      difficulty: 3,
      questions: [
        { q: "What did he love, in 38:32?", a: "The good, the horses", wrong: ["Gold", "Fame", "Sleep"], why: "He said: I did love the good instead of remembering my Lord." },
        { q: "Which prayer was missed, per the Salaf?", a: "Asr", wrong: ["Fajr", "Isha", "Duha"], why: "He was so busy looking at the horses that he missed the time of Asr prayer." },
        { q: "When did the same happen to the Prophet ﷺ?", a: "On the day of Khandaq", wrong: ["At Badr", "At Hunayn", "At Tabuk"], why: "As happened to the Prophet ﷺ on the day of Khandaq." }
      ]
    },
    {
      slug: "something-better",
      title: "Something better",
      line: "He asked for the horses; Allah later gave him something better.",
      facts: ["Prayer comes first", "Allah gave him the wind"],
      quote: q38(33),
      source: ik(33, "Since he dispensed with them for Allah, Allah compensated him with something better: the wind that blew by his order.", "Allah compensated him with something better, the wind"),
      difficulty: 4,
      questions: [
        { q: "What did he ask for, in 38:33?", a: "Bring them back to me", wrong: ["Sell them", "Feed them", "Free them"], why: "Then he said: Bring them back to me." },
        { q: "What did Allah give him instead, per Ibn Kathir?", a: "The wind", wrong: ["More horses", "Camels", "Ships"], why: "Allah compensated him with something better, the wind which blew gently by his order." },
        { tf: true, q: "Whoever gives something up for Allah gets better.", why: "Allah compensated him with something better, the wind." }
      ]
    },
    {
      slug: "tested-and-he-returned",
      title: "Tested, and he returned",
      line: "Allah tested Sulayman, and he turned back to Him.",
      facts: ["He asked forgiveness", "Then asked for a kingdom"],
      quote: q38(34),
      source: ik(34, "After this test he turned back to Allah, asked forgiveness and asked for a unique kingdom.", "after this test, he turned back to Him and asked for forgiveness"),
      difficulty: 4,
      questions: [
        { q: "What did Allah do, in 38:34?", a: "Tested Sulayman", wrong: ["Forgot him", "Removed him", "Punished him"], why: "And indeed, We tried Sulayman." },
        { q: "What did he do after, per Ibn Kathir?", a: "Turned back and asked forgiveness", wrong: ["Gave up", "Got angry", "Left his land"], why: "After this test, he turned back to Him and asked for forgiveness." },
        { tf: true, q: "Even Prophets turn to Allah after a test.", why: "And he returned. After this test, he turned back to Him." }
      ]
    },
    {
      slug: "a-unique-kingdom",
      title: "A unique kingdom",
      line: "Lord, forgive me and give me a kingdom like no other.",
      facts: ["Allah is the Bestower", "The Prophet ﷺ respected his dua"],
      quote: q38(35),
      source: ik(35, "Some said it means no one after him will have the right to ask Allah for such a kingdom; several hadiths support this.", "No one after me will have the right to ask Allah for such a kingdom"),
      difficulty: 4,
      questions: [
        { q: "What did Sulayman ask first, in 38:35?", a: "Forgiveness", wrong: ["Gold", "Revenge", "Rain"], why: "He said: My Lord! Forgive me." },
        { q: "What kingdom did he ask for, in 38:35?", a: "One no one after him has", wrong: ["A small farm", "A ship", "A city of gold"], why: "And bestow upon me a kingdom such as shall not belong to any other after me." },
        { q: "What Name of Allah ends the dua, in 38:35?", a: "The Bestower", wrong: ["The Avenger", "The Last", "The Creator"], why: "Verily, You are the Bestower." }
      ]
    },
    {
      slug: "my-brother-sulayman",
      title: "My brother Sulayman",
      line: "The Prophet ﷺ let a jinn go, honouring Sulayman's dua.",
      facts: ["He overpowered the jinn", "Then he remembered 38:35"],
      quote: q38(35),
      source: hadith("bukhari", "461", "Abu Hurairah", "Sahih", "The Prophet ﷺ overpowered a jinn who tried to spoil his prayer, but let him go remembering Sulayman's dua.", "but I remembered the statement of my brother Solomon"),
      difficulty: 4,
      questions: [
        { q: "What did the jinn try to do, in the hadith?", a: "Interrupt his prayer", wrong: ["Steal food", "Burn the masjid", "Hide a book"], why: "A big demon from the Jinns came to me and wanted to interrupt my prayers." },
        { q: "Why did he let him go, in the hadith?", a: "He remembered Sulayman's dua", wrong: ["He was afraid", "He was tired", "He forgot"], why: "But I remembered the statement of my brother Solomon." },
        { tf: true, q: "The Prophet ﷺ called Sulayman his brother.", why: "But I remembered the statement of my brother Solomon." }
      ]
    },
    {
      slug: "the-wind-obeyed",
      title: "The wind obeyed",
      line: "Allah made the wind blow gently at his command.",
      facts: ["Wherever he wished", "Faster than horses"],
      quote: q38(36),
      source: ik(36, "The wind blew gently by his order wherever in the world he wanted.", "wherever in the world he wanted"),
      difficulty: 3,
      questions: [
        { q: "What was subjected to him, in 38:36?", a: "The wind", wrong: ["The sea", "The sun", "The moon"], why: "So, We subjected to him the wind; it blew gently by his order wherever he willed." },
        { q: "Where did it go, per Ibn Kathir?", a: "Wherever in the world he wanted", wrong: ["Only north", "Only to sea", "Nowhere"], why: "Wherever he willed means, wherever in the world he wanted." },
        { tf: true, q: "The wind's morning trip was a month's journey.", why: "Its morning lasted a month's journey, and its afternoon lasted a month's journey." }
      ]
    },
    {
      slug: "builders-and-divers",
      title: "Builders and divers",
      line: "Allah gave him jinn who built and dived for him.",
      facts: ["High rooms and basins", "Pearls from the sea"],
      quote: q38(37),
      source: ik(37, "Some built high rooms and basins, and others dived into the sea for pearls and jewels.", "dived into the sea recovering pearls, jewels"),
      difficulty: 3,
      questions: [
        { q: "What kinds worked for him, in 38:37?", a: "Builders and divers", wrong: ["Singers and poets", "Farmers", "Sailors"], why: "And the Shayatin, from every kind of builder and diver." },
        { q: "What did the divers bring, per Ibn Kathir?", a: "Pearls and jewels", wrong: ["Fish", "Sand", "Shells only"], why: "Who dived into the sea recovering pearls, jewels and other precious things." },
        { q: "What did the builders make, per Ibn Kathir?", a: "High rooms and basins", wrong: ["Ships", "Swords", "Idols to worship"], why: "Some whom he used to build high rooms, images, basins as large as reservoirs." }
      ]
    },
    {
      slug: "bound-in-fetters",
      title: "Bound in fetters",
      line: "Others were bound in chains for refusing to work.",
      facts: ["The rebels were chained", "Sulayman ruled them all"],
      quote: q38(38),
      source: ik(38, "Those tied up in chains were the ones who rebelled and refused to work, or whose work was bad.", "These were the ones who had rebelled and refused to work"),
      difficulty: 3,
      questions: [
        { q: "How were others kept, in 38:38?", a: "Bound in fetters", wrong: ["Free to roam", "Asleep", "Hidden"], why: "And also others bound in fetters." },
        { q: "Who were they, per Ibn Kathir?", a: "Those who rebelled", wrong: ["The best workers", "His sons", "The birds"], why: "These were the ones who had rebelled and refused to work." },
        { tf: false, q: "All the jinn obeyed him freely.", why: "These were the ones who had rebelled and refused to work, or else their work was bad." }
      ]
    },
    {
      slug: "our-gift",
      title: "Our gift",
      line: "This is Our gift: give or hold back, without account.",
      facts: ["He could give as he wished", "The Prophet ﷺ chose humility"],
      quote: q38(39),
      source: ik(39, "The Prophet ﷺ chose being a servant Messenger over being a king, because it has greater value with Allah.", "has a greater value before Allah and brings a higher status in the Hereafter"),
      difficulty: 4,
      questions: [
        { q: "What did Allah tell Sulayman, in 38:39?", a: "Spend or withhold", wrong: ["Give it all away", "Hide it", "Sell it"], why: "This is Our gift, so spend you or withhold, no account will be asked of you." },
        { q: "What did our Prophet ﷺ choose, per Ibn Kathir?", a: "Servant and Messenger", wrong: ["Prophet and king", "Rich merchant", "Army chief"], why: "He chose the former because it has a greater value before Allah." },
        { q: "Why did he choose it, per Ibn Kathir?", a: "Greater value with Allah", wrong: ["Less work", "More gold", "Fame"], why: "It has a greater value before Allah and brings a higher status in the Hereafter." }
      ]
    },
    {
      slug: "near-to-allah",
      title: "Near to Allah",
      line: "For Sulayman too is nearness to Allah and a good return.",
      facts: ["A great share on that Day", "In this world and the next"],
      quote: q38(40),
      source: ik(40, "Allah tells us Sulayman will have nearness and a good return in this world and the Hereafter.", "meaning, in this world and the Hereafter"),
      difficulty: 4,
      questions: [
        { q: "What is for Sulayman, in 38:40?", a: "Nearness and a good return", wrong: ["Punishment", "Nothing", "Shame"], why: "And verily, for him is a near access to Us, and a good final return." },
        { q: "Where is his good return, per Ibn Kathir?", a: "This world and the Hereafter", wrong: ["Only this world", "Only his palace", "Only the sea"], why: "Meaning, in this world and the Hereafter." },
        { q: "Who else got these same words, in 38:25?", a: "Dawud", wrong: ["Fir'awn", "Qarun", "Haman"], why: "So, We forgave him that, and verily, for him is a near access to Us, and a good place of return (38:25)." }
      ]
    }
  ]
};

/** Ayahs 41 to 64: Ayyub's patience, the chosen Prophets, Paradise, and the end of the arrogant. */
const SAD_THREE: DeepUnit = {
  key: "sad3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-38",
  name: "Sad, ayahs 41 to 64",
  kind: "skill",
  lessonType: "surah",
  surahName: "Sad",
  lessons: [
    {
      slug: "ayyub-calls-his-lord",
      title: "Ayyub calls his Lord",
      line: "Remember Ayyub, when he called on his Lord in hardship.",
      facts: ["Tested in body, wealth and children", "His heart stayed healthy"],
      quote: q38(41),
      source: ik(41, "Ayyub was tested in his body, his wealth and his children, until only his heart was healthy.", "These tests afflicted his body, his wealth and his children"),
      difficulty: 1,
      questions: [
        { q: "Whom are we told to remember, in 38:41?", a: "Ayyub", wrong: ["Qarun", "Haman", "Azar"], why: "And remember Our servant Ayyub, when he invoked his Lord." },
        { q: "What was tested, per Ibn Kathir?", a: "His body, wealth and children", wrong: ["Only his house", "Only his camels", "Only his voice"], why: "These tests afflicted his body, his wealth and his children." },
        { q: "What part stayed healthy, per Ibn Kathir?", a: "His heart", wrong: ["His legs", "His eyes", "His hands"], why: "Until there was no part of his body that was healthy except his heart." }
      ]
    },
    {
      slug: "the-most-merciful",
      title: "The Most Merciful",
      line: "His dua: distress has seized me, and You are the Most Merciful.",
      facts: ["A dua from 21:83", "He never complained about Allah"],
      quote: q38(41),
      source: ik(41, "Ayyub prayed: distress has seized me, and You are the Most Merciful of all those who show mercy (21:83).", "You are the Most Merciful of all those who show mercy"),
      difficulty: 2,
      questions: [
        { q: "How did Ayyub address Allah, in 21:83?", a: "Most Merciful of the merciful", wrong: ["Lord of armies", "King of kings", "Lord of ships"], why: "Verily, distress has seized me, and You are the Most Merciful of all those who show mercy (21:83)." },
        { q: "What did torment refer to, per Ibn Kathir?", a: "Loss of wealth and children", wrong: ["A storm", "A war", "Hunger only"], why: "Torment referred to the loss of his wealth and children." },
        { tf: true, q: "Ayyub turned to Allah, not away from Him.", why: "Ayyub prayed to the Lord of the worlds, the God of the Messengers." }
      ]
    },
    {
      slug: "his-loyal-wife",
      title: "His loyal wife",
      line: "His wife stayed by him, serving him through the hard years.",
      facts: ["Her faith kept her loyal", "She worked to feed him"],
      quote: q38(41),
      source: ik(41, "His wife stayed devoted to him because of her faith in Allah, working for others to feed and serve him.", "who retained her devotion to him because of her faith in Allah"),
      difficulty: 2,
      questions: [
        { q: "Who stayed with Ayyub, per Ibn Kathir?", a: "His wife", wrong: ["His cousins", "The king", "His neighbours"], why: "Besides his wife, who retained her devotion to him because of her faith in Allah." },
        { q: "Why did she stay, per Ibn Kathir?", a: "Her faith in Allah", wrong: ["For money", "For fame", "She had no choice"], why: "Who retained her devotion to him because of her faith in Allah and His Messenger." },
        { tf: true, q: "She worked for people to feed and serve him.", why: "She used to work for people as a paid servant, and she fed and served him." }
      ]
    },
    {
      slug: "strike-the-ground",
      title: "Strike the ground",
      line: "Strike the ground with your foot: cool water to wash and drink.",
      facts: ["A spring to wash in", "A spring to drink from"],
      quote: q38(42),
      source: ik(42, "A spring flowed; he washed and his outer pain left, then drank from another and became healthy inside and out.", "he became healthy again, inside and out"),
      difficulty: 2,
      questions: [
        { q: "What was Ayyub told, in 38:42?", a: "Strike the ground with your foot", wrong: ["Climb a hill", "Sail away", "Dig with a spade"], why: "Strike the ground with your foot. This is a spring of water to wash in, cool and a drink." },
        { q: "What happened after washing, per Ibn Kathir?", a: "His bodily pain left", wrong: ["He slept", "It rained", "He grew tall"], why: "He commanded him to wash in it, and all the pain and affliction in his body disappeared." },
        { q: "How did he end up, per Ibn Kathir?", a: "Healthy inside and out", wrong: ["Still sick", "Half healed", "Weaker"], why: "He became healthy again, inside and out." }
      ]
    },
    {
      slug: "his-family-restored",
      title: "His family restored",
      line: "Allah gave him back his family, and as many more.",
      facts: ["A mercy from Allah", "Patience leads to a way out"],
      quote: q38(43),
      source: ik(43, "This was a mercy for his patience, and a reminder that patience leads to a solution and a way out.", "the consequence of patience is a solution and a way out"),
      difficulty: 2,
      questions: [
        { q: "What did Allah give back, in 38:43?", a: "His family, and the like of them", wrong: ["Only his camels", "Only his house", "Nothing"], why: "And We gave him back his family, and along with them the like thereof." },
        { q: "Why was it a mercy, per Ibn Kathir?", a: "For his patience and repentance", wrong: ["For his wealth", "For his fame", "By chance"], why: "In return for his patience, steadfastness, repentance, humility and constant turning to Allah." },
        { q: "What is the reminder, per Ibn Kathir?", a: "Patience leads to a way out", wrong: ["Wealth lasts forever", "Hardship never ends", "Complaining helps"], why: "The consequence of patience is a solution and a way out." }
      ]
    },
    {
      slug: "a-gentle-way-out",
      title: "A gentle way out",
      line: "Allah showed Ayyub a gentle way to keep his oath.",
      facts: ["His wife deserved kindness", "A bundle of thin grass"],
      quote: q38(44),
      source: ik(44, "His wife's service and kindness deserved no harm, so Allah gave a gentle way out: one light touch with a bundle of grass.", "how could her service, mercy, compassion and kindness be repaid"),
      difficulty: 3,
      questions: [
        { q: "What was he to take, in 38:44?", a: "A bundle of thin grass", wrong: ["A sword", "A rope", "A stone"], why: "And take in your hand a bundle of thin grass." },
        { q: "What did his wife deserve, per Ibn Kathir?", a: "Kindness for her service", wrong: ["Harm", "Blame", "Exile"], why: "How could her service, mercy, compassion and kindness be repaid with a beating?" },
        { q: "What did Allah find Ayyub, in 38:44?", a: "Patient", wrong: ["Angry", "Lazy", "Proud"], why: "Truly, We found him patient. How excellent a servant!" }
      ]
    },
    {
      slug: "good-in-every-affair",
      title: "Good in every affair",
      line: "For a believer, there is good in ease and in hardship.",
      facts: ["Thanks in good times", "Patience in hard times"],
      quote: q38(44),
      source: hadith("muslim", "2999", "Suhaib", "Sahih", "A believer has good in every affair: he thanks Allah in joy and is patient in hardship, and both are good for him.", "there is good in every affair of his"),
      difficulty: 3,
      questions: [
        { q: "What does a believer do in joy, in the hadith?", a: "Thanks Allah", wrong: ["Boasts", "Forgets Allah", "Sleeps"], why: "If he has an occasion to feel delight, he thanks God, thus there is a good for him in it." },
        { q: "What does he do in trouble, in the hadith?", a: "Endures it patiently", wrong: ["Gives up", "Complains about Allah", "Runs away"], why: "If he gets into trouble and endures it patiently, there is a good for him in it." },
        { tf: true, q: "Ayyub showed the patience praised by the Prophet ﷺ.", why: "Truly, We found him patient. How excellent a servant!" }
      ]
    },
    {
      slug: "strength-and-insight",
      title: "Strength and insight",
      line: "Remember Ibrahim, Ishaq and Yaqub, men of strength and insight.",
      facts: ["Strong in worship", "Deep understanding of religion"],
      quote: q38(45),
      source: ik(45, "Ulil-Aydi wal-Absar means righteous deeds, beneficial knowledge, strength in worship and insight.", "righteous deeds, beneficial knowledge, strength in worship and insight"),
      difficulty: 3,
      questions: [
        { q: "Which three are named, in 38:45?", a: "Ibrahim, Ishaq and Yaqub", wrong: ["Musa, Harun, Yusha", "Nuh, Hud, Salih", "Isa, Yahya, Zakariyya"], why: "And remember Our servants, Ibrahim, Ishaq, and Yaqub." },
        { q: "What does Ulil-Aydi mean, per Ibn Abbas?", a: "Great strength and worship", wrong: ["Great wealth", "Great size", "Great armies"], why: "Ulil-Aydi, Of great strength and worship." },
        { q: "What does wal-Absar mean, per Ibn Abbas?", a: "Understanding of the religion", wrong: ["Good eyesight", "Fast running", "Loud voice"], why: "Wal-Absar means, understanding of the religion." }
      ]
    },
    {
      slug: "remembrance-of-the-abode",
      title: "Remembrance of the Abode",
      line: "Allah chose them with remembrance of the Hereafter.",
      facts: ["Their hearts were for the Hereafter", "They reminded others of it"],
      quote: q38(46),
      source: ik(46, "Qatadah said they used to remind people about the Hereafter and strive for it.", "They used to remind the people about the Abode of the Hereafter"),
      difficulty: 3,
      questions: [
        { q: "How did Allah choose them, in 38:46?", a: "With remembrance of the Abode", wrong: ["With gold", "With palaces", "With armies"], why: "Verily, We did choose them by granting them the remembrance of the Abode." },
        { q: "What did they do, per Qatadah?", a: "Reminded people of the Hereafter", wrong: ["Built towers", "Traded goods", "Wrote poems"], why: "They used to remind the people about the Abode of the Hereafter and to strive for it." },
        { q: "What did Allah remove, per Malik bin Dinar?", a: "Love of this world", wrong: ["Their homes", "Their families", "Their wealth"], why: "Allah removed the love of this world from their hearts." }
      ]
    },
    {
      slug: "chosen-and-best",
      title: "Chosen and the best",
      line: "With Allah, they are among the chosen and the best.",
      facts: ["Elected by Allah", "The best of people"],
      quote: q38(47),
      source: ik(47, "They are among those elected and chosen, and they are the best and the chosen ones.", "they are the best and the chosen ones"),
      difficulty: 3,
      questions: [
        { q: "What are they with Allah, in 38:47?", a: "The chosen and the best", wrong: ["Forgotten", "Ordinary", "Lost"], why: "And they are with Us, verily, of the chosen and the best!" },
        { q: "What does Ibn Kathir say they are?", a: "The best and chosen ones", wrong: ["The richest", "The tallest", "The oldest"], why: "They are the best and the chosen ones." },
        { tf: true, q: "Allah Himself chose the Prophets.", why: "They are among those who have been elected and chosen." }
      ]
    },
    {
      slug: "ismail-alyasa-dhul-kifl",
      title: "Ismail, Al-Yasa and Dhul-Kifl",
      line: "Remember Ismail, Al-Yasa and Dhul-Kifl: all among the best.",
      facts: ["Their stories are in Al-Anbiya", "All are among the best"],
      quote: q38(48),
      source: ik(48, "Ibn Kathir says their stories were discussed in detail in Surat Al-Anbiya.", "We have already discussed their characteristics and stories in detail in Surat Al-Anbiya"),
      difficulty: 3,
      questions: [
        { q: "Who is named with Ismail, in 38:48?", a: "Al-Yasa and Dhul-Kifl", wrong: ["Harun and Musa", "Hud and Salih", "Lut and Shuayb"], why: "And remember Ismail, Al-Yasa, and Dhul-Kifl, all are among the best." },
        { q: "Where are their stories told, per Ibn Kathir?", a: "Surat Al-Anbiya", wrong: ["Surat Al-Fil", "Surat An-Nas", "Surat Al-Asr"], why: "We have already discussed their characteristics and stories in detail in Surat Al-Anbiya." },
        { q: "What is This is a Reminder, per As-Suddi?", a: "The Holy Quran", wrong: ["A poem", "A dream", "A letter"], why: "As-Suddi said, This means the Holy Quran." }
      ]
    },
    {
      slug: "a-good-final-return",
      title: "A good final return",
      line: "For the people of Taqwa is a good final return.",
      facts: ["Their final destination", "Promised by Allah"],
      quote: q38(49),
      source: ik(49, "Allah's believing servants will have a good final return in the Hereafter, which means their ultimate destination.", "which means their ultimate destination"),
      difficulty: 3,
      questions: [
        { q: "Who has a good return, in 38:49?", a: "Those who have Taqwa", wrong: ["The proud", "The rich only", "Everyone"], why: "And verily, for those who have Taqwa is a good final return." },
        { q: "What is the final return, per Ibn Kathir?", a: "Their ultimate destination", wrong: ["Their hometown", "Their grave only", "Their trade"], why: "A good final return in the Hereafter, which means their ultimate destination." },
        { tf: true, q: "Taqwa leads to a good end.", why: "And verily, for those who have Taqwa is a good final return." }
      ]
    },
    {
      slug: "gardens-of-adn",
      title: "Gardens of Adn",
      line: "Eternal gardens, whose gates open for them.",
      facts: ["Adn means eternal", "Gates open to welcome them"],
      quote: q38(50),
      source: ik(50, "Adn Gardens means eternal gardens, and their gates will open for the believers when they come.", "their gates will open for them"),
      difficulty: 3,
      questions: [
        { q: "What are the gardens called, in 38:50?", a: "Adn", wrong: ["Iram", "Babil", "Saba"], why: "Adn Paradise, whose doors will be opened for them." },
        { q: "What does Adn mean, per Ibn Kathir?", a: "Eternal", wrong: ["Small", "Far", "Hidden"], why: "Adn Gardens, meaning, eternal gardens of Paradise." },
        { q: "What happens to the gates, per Ibn Kathir?", a: "They open for them", wrong: ["They stay shut", "They vanish", "They break"], why: "When they come to them, their gates will open for them." }
      ]
    },
    {
      slug: "whatever-they-ask",
      title: "Whatever they ask",
      line: "They recline there and ask for fruits and drinks in plenty.",
      facts: ["Whatever they ask for", "Ready as they like"],
      quote: q38(51),
      source: ik(51, "Whatever they ask for, they will find it, prepared just as they wanted it.", "whatever they ask for, they will find it, and it will be prepared just as they wanted it"),
      difficulty: 3,
      questions: [
        { q: "What do they call for, in 38:51?", a: "Fruits and drinks", wrong: ["Gold coins", "Weapons", "Horses"], why: "Therein they will call for fruits in abundance and drinks." },
        { q: "How is it prepared, per Ibn Kathir?", a: "Just as they want", wrong: ["Late", "Cold", "Too little"], why: "It will be prepared just as they wanted it." },
        { tf: true, q: "People in Paradise rest and recline.", why: "Therein they will recline." }
      ]
    },
    {
      slug: "pure-companions",
      title: "Pure companions",
      line: "Beside them are pure companions, all of equal age.",
      facts: ["Loyal and pure", "All the same age"],
      quote: q38(52),
      source: ik(52, "Ibn Abbas, Mujahid and others said of equal ages means they will all be of the same age.", "they will all be of the same age"),
      difficulty: 3,
      questions: [
        { q: "What age are they, in 38:52?", a: "Equal ages", wrong: ["Very old", "Babies", "All different"], why: "And beside them will be Qasirat-at-Tarf, of equal ages." },
        { q: "What does equal ages mean, per Ibn Abbas?", a: "All the same age", wrong: ["All very old", "All children", "No age"], why: "They will all be of the same age." },
        { tf: true, q: "Paradise has loyal, pure companions.", why: "They restrain their glances from anyone except their husbands." }
      ]
    },
    {
      slug: "what-you-are-promised",
      title: "What you are promised",
      line: "This is what you are promised for the Day of Reckoning.",
      facts: ["After resurrection", "Saved from the Fire"],
      quote: q38(53),
      source: ik(53, "This is what Allah prepared for His pious servants after they are raised from their graves and saved from the Fire.", "after they have been resurrected from their graves and been saved from the Fire"),
      difficulty: 3,
      questions: [
        { q: "When is it promised for, in 38:53?", a: "The Day of Reckoning", wrong: ["Next year", "Ramadan", "Tomorrow"], why: "This it is what you are promised for the Day of Reckoning!" },
        { q: "When do they reach it, per Ibn Kathir?", a: "After resurrection and rescue", wrong: ["At birth", "In childhood", "In this life"], why: "After they have been resurrected from their graves and been saved from the Fire." },
        { tf: true, q: "Allah keeps His promises.", why: "This it is what you are promised for the Day of Reckoning!" }
      ]
    },
    {
      slug: "never-ending-provision",
      title: "Never-ending provision",
      line: "This is Our provision, which will never run out.",
      facts: ["Paradise never ends", "A gift without end"],
      quote: q38(54),
      source: ik(54, "Paradise will never come to an end, disappear or cease to be.", "Paradise will never come to an end or disappear or cease to be"),
      difficulty: 3,
      questions: [
        { q: "What is said of the provision, in 38:54?", a: "It will never finish", wrong: ["It lasts a year", "It is small", "It is shared"], why: "Verily, this is Our provision which will never finish." },
        { q: "What does Ibn Kathir say of Paradise?", a: "It never ends", wrong: ["It ends one day", "It moves", "It shrinks"], why: "Paradise will never come to an end or disappear or cease to be." },
        { q: "Which ayah says what is with Allah remains?", a: "16:96", wrong: ["2:255", "112:1", "1:1"], why: "Whatever is with you, will be exhausted, and whatever is with Allah will remain (16:96)." }
      ]
    },
    {
      slug: "youth-that-never-fades",
      title: "Youth that never fades",
      line: "In Paradise, clothes never wear out and youth never fades.",
      facts: ["Never in need", "Forever young"],
      quote: q38(54),
      source: hadith("muslim", "2836", "Abu Hurairah", "Sahih", "Whoever enters Paradise will enjoy bliss: never in need, clothes never wearing out, youth never fading.", "nor would his clothes wear out, nor his youth would decline"),
      difficulty: 3,
      questions: [
        { q: "What never wears out, in the hadith?", a: "Their clothes", wrong: ["Their swords", "Their shoes only", "Their tents"], why: "He would neither become destitute, nor would his clothes wear out." },
        { q: "What never declines, in the hadith?", a: "Their youth", wrong: ["Their hunger", "Their worry", "Their age"], why: "Nor his youth would decline." },
        { tf: false, q: "People in Paradise grow old.", why: "Nor his youth would decline." }
      ]
    },
    {
      slug: "an-evil-return",
      title: "An evil return",
      line: "For the transgressors is the worst final return.",
      facts: ["Those who disobey Allah", "And oppose the Messengers"],
      quote: q38(55),
      source: ik(55, "The Taghin are those who disobey Allah and oppose His Messengers; theirs is the worst final return.", "which refers to those who disobey Allah"),
      difficulty: 3,
      questions: [
        { q: "Who has an evil return, in 38:55?", a: "The Taghin", wrong: ["The patient", "The pious", "The Prophets"], why: "And for the Taghin will be an evil final return." },
        { q: "Who are the Taghin, per Ibn Kathir?", a: "Those who disobey Allah", wrong: ["Travellers", "Farmers", "Children"], why: "Which refers to those who disobey Allah and oppose the Messengers of Allah." },
        { tf: true, q: "The surah sets the two ends side by side.", why: "Having mentioned the final of the blessed, Allah follows that with mention of the final return of the doomed." }
      ]
    },
    {
      slug: "an-evil-resting-place",
      title: "An evil resting place",
      line: "Hell is where they enter, and an evil place to rest.",
      facts: ["The opposite of Paradise", "A warning, not a wish"],
      quote: q38(56),
      source: ik(56, "They will enter Hell and it will surround them on all sides; it is the worst place to rest.", "they will enter it and it will overwhelm them on all sides"),
      difficulty: 3,
      questions: [
        { q: "What is their resting place, in 38:56?", a: "Hell", wrong: ["A garden", "A palace", "A river"], why: "Hell! Where they will enter it, and worst indeed is that place to rest." },
        { q: "How is it described, in 38:56?", a: "Worst place to rest", wrong: ["A good home", "A short stop", "A meeting place"], why: "And worst indeed is that place to rest." },
        { tf: true, q: "Allah warns so that people can avoid it.", why: "Then Allah scares them with news of how the nations who came before them were destroyed." }
      ]
    },
    {
      slug: "heat-and-cold",
      title: "Heat and cold",
      line: "Their drink is extreme heat, and its opposite, extreme cold.",
      facts: ["Hamim is boiling", "Ghassaq is freezing"],
      quote: q38(57),
      source: ik(57, "Hamim is heated to the ultimate degree, and Ghassaq is its opposite, unbearably cold.", "Ghassaq is the opposite, something that is so intensely cold"),
      difficulty: 4,
      questions: [
        { q: "What is Hamim, per Ibn Kathir?", a: "Heated to the extreme", wrong: ["Cool water", "Fruit juice", "Milk"], why: "Hamim is something that has been heated to the ultimate degree." },
        { q: "What is Ghassaq, per Ibn Kathir?", a: "Unbearably cold", wrong: ["Very sweet", "Very salty", "Very bright"], why: "Ghassaq is the opposite, something that is so intensely cold that it is unbearable." },
        { tf: true, q: "Hamim and Ghassaq are opposites.", why: "Ghassaq is the opposite, something that is so intensely cold." }
      ]
    },
    {
      slug: "other-pairs",
      title: "Other pairs",
      line: "And other punishments of a similar kind, all together.",
      facts: ["Different kinds", "Opposites paired"],
      quote: q38(58),
      source: ik(58, "Al-Hasan Al-Basri said it means different kinds of punishments, in pairs of opposites.", "Different kinds of punishments"),
      difficulty: 4,
      questions: [
        { q: "What else is there, in 38:58?", a: "Others of a similar kind", wrong: ["Rest", "Nothing more", "Gardens"], why: "And other of similar kind, all together!" },
        { q: "What did Al-Hasan say it means?", a: "Different kinds of punishments", wrong: ["Different foods", "Different songs", "Different gardens"], why: "Al-Hasan Al-Basri said, Different kinds of punishments." },
        { q: "How are they arranged, per Ibn Kathir?", a: "As pairs of opposites", wrong: ["One kind only", "By colour", "By size"], why: "A thing and its opposite, serving as punishments." }
      ]
    },
    {
      slug: "no-welcome",
      title: "No welcome",
      line: "A group enters with you; no welcome for them!",
      facts: ["No greetings in Hell", "They blame each other"],
      quote: q38(59),
      source: ik(59, "Instead of greeting one another, the people of Hell will blame and reject one another.", "instead of greeting one another"),
      difficulty: 4,
      questions: [
        { q: "What is said of the new group, in 38:59?", a: "No welcome for them", wrong: ["Welcome home", "Peace be on you", "Sit with us"], why: "This is a troop entering with you, no welcome for them!" },
        { q: "What do they do instead of greeting, per Ibn Kathir?", a: "Blame one another", wrong: ["Hug", "Sing", "Rest"], why: "Instead of greeting one another, they will curse one another." },
        { tf: false, q: "Friends of falsehood stay friends in Hell.", why: "They will accuse one another of being liars and reject one another." }
      ]
    },
    {
      slug: "you-brought-this-on-us",
      title: "You brought this on us",
      line: "The followers say: no welcome for you; you led us to this!",
      facts: ["Followers blame leaders", "Too late to choose"],
      quote: q38(60),
      source: ik(60, "The followers will tell those who misled them: you called us to what led us to this end.", "you called us to that which led us to this fate"),
      difficulty: 4,
      questions: [
        { q: "Whom do the followers blame, in 38:60?", a: "Those who misled them", wrong: ["The angels", "The Prophets", "No one"], why: "Nay, you too! No welcome for you! It is you who brought this upon us." },
        { q: "What do they say, per Ibn Kathir?", a: "You called us to this end", wrong: ["Thank you", "Forgive us", "We were wise"], why: "You called us to that which led us to this fate." },
        { tf: true, q: "Following bad leaders does not excuse anyone.", why: "Each of them will be punished as he deserves." }
      ]
    },
    {
      slug: "a-double-share",
      title: "A double share",
      line: "They ask Allah to double the share of those who misled them.",
      facts: ["Like 7:38", "Each gets what he deserves"],
      quote: q38(61),
      source: ik(61, "Like 7:38, they ask for a double punishment for those who misled them, but each is punished as he deserves.", "each of them will be punished as he deserves"),
      difficulty: 4,
      questions: [
        { q: "What do they ask for, in 38:61?", a: "Double torment for the misleaders", wrong: ["A way out", "Water", "Rest"], why: "Our Lord! Whoever brought this upon us, add to him a double torment in the Fire!" },
        { q: "How is each punished, per Ibn Kathir?", a: "As he deserves", wrong: ["All the same", "By chance", "Not at all"], why: "Each of them will be punished as he deserves." },
        { q: "Which ayah is similar, per Ibn Kathir?", a: "7:38", wrong: ["2:255", "36:1", "1:2"], why: "The last of them will say to the first of them: Our Lord! These misled us (7:38)." }
      ]
    },
    {
      slug: "where-are-they",
      title: "Where are they?",
      line: "They ask: why don't we see those we called bad?",
      facts: ["They mocked the believers", "The believers are not there"],
      quote: q38(62),
      source: ik(62, "Mujahid said Abu Jahl will ask why he does not see Bilal and others; the disbelievers thought the believers would be in Hell.", "that I do not see Bilal"),
      difficulty: 4,
      questions: [
        { q: "Whom do they miss, in 38:62?", a: "Men they counted as bad", wrong: ["Their leaders", "Their idols", "Their children"], why: "What is the matter with us that we see not men whom we used to count among the bad ones?" },
        { q: "Whom did Abu Jahl look for, per Mujahid?", a: "Bilal and others", wrong: ["His father", "The angels", "His camels"], why: "What is the matter with me that I do not see Bilal and Ammar and Suhayb." },
        { tf: true, q: "Those mocked for faith are honoured by Allah.", why: "Then they will find out that they are in the lofty levels of Paradise." }
      ]
    },
    {
      slug: "they-mocked-them",
      title: "They mocked them",
      line: "Did we mock them wrongly, or do our eyes miss them?",
      facts: ["Wishful thinking", "The believers are in Paradise"],
      quote: q38(63),
      source: ik(63, "They console themselves with wishful thinking, then find the believers are in the lofty levels of Paradise.", "are in the lofty levels of Paradise"),
      difficulty: 4,
      questions: [
        { q: "What do they wonder, in 38:63?", a: "Did we mock them wrongly?", wrong: ["Is it night?", "Who built this?", "Where is the sea?"], why: "Did we take them as an object of mockery, or have our eyes failed to perceive them?" },
        { q: "What do they hope, per Ibn Kathir?", a: "That they just missed seeing them", wrong: ["To meet angels", "To find water", "To sleep"], why: "They will try to console themselves with this wishful thinking." },
        { q: "Where are the believers, per Ibn Kathir?", a: "The lofty levels of Paradise", wrong: ["In Hell", "On earth", "Lost"], why: "Then they will find out that they are in the lofty levels of Paradise." }
      ]
    },
    {
      slug: "the-very-truth",
      title: "The very truth",
      line: "The dispute of the people of the Fire is the very truth.",
      facts: ["No doubt in it", "A warning while there is time"],
      quote: q38(64),
      source: ik(64, "What Allah told about the dispute of the people of Hell is true, with no doubt about it.", "is true and there is no doubt concerning it"),
      difficulty: 4,
      questions: [
        { q: "What is the very truth, in 38:64?", a: "The dispute of the Fire's people", wrong: ["A dream", "A poem", "A legend"], why: "Verily, that is the very truth, the mutual dispute of the people of the Fire!" },
        { q: "What does Ibn Kathir say of it?", a: "True, with no doubt", wrong: ["Maybe true", "Only a story", "Unknown"], why: "Is true and there is no doubt concerning it." },
        { tf: true, q: "Knowing this now is a mercy, while we can still change.", why: "In this Quran there is a reminder for those who will be reminded and a lesson for those who will learn a lesson." }
      ]
    }
  ]
};

/** Ayahs 65 to 88: the great news, Adam and Iblis, and the Reminder for all the worlds. */
const SAD_FOUR: DeepUnit = {
  key: "sad4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-38",
  name: "Sad, ayahs 65 to 88",
  kind: "skill",
  lessonType: "surah",
  surahName: "Sad",
  lessons: [
    {
      slug: "only-a-warner",
      title: "Only a warner",
      line: "Say: I am only a warner; there is no god but Allah.",
      facts: ["Allah, the One, the Irresistible", "He controls everything"],
      quote: q38(65),
      source: ik(65, "The Prophet ﷺ is told to say he is only a warner, and Allah alone has subjugated and controlled everything.", "He Alone has subjugated and controlled everything"),
      difficulty: 1,
      questions: [
        { q: "What is the Prophet ﷺ, in 38:65?", a: "Only a warner", wrong: ["A king", "A sorcerer", "A poet"], why: "Say: I am only a warner and there is no God worthy of worship except Allah." },
        { q: "Which two Names are in 38:65?", a: "The One, the Irresistible", wrong: ["The First, the Last", "The Kind, the Gentle", "The Seer, the Hearer"], why: "Except Allah the One, the Irresistible." },
        { q: "What does Irresistible mean, per Ibn Kathir?", a: "He controls everything", wrong: ["He is far", "He is silent", "He is new"], why: "He Alone has subjugated and controlled everything." }
      ]
    },
    {
      slug: "mighty-and-forgiving",
      title: "Mighty and forgiving",
      line: "Lord of the heavens and earth, the Almighty, the Oft-Forgiving.",
      facts: ["He owns all of creation", "Power and forgiveness together"],
      quote: q38(66),
      source: ik(66, "He is the Sovereign of all creation, and He is Oft-Forgiving as well as Almighty and All-Powerful.", "He is Oft-Forgiving as well as being Almighty and All-Powerful"),
      difficulty: 2,
      questions: [
        { q: "Of what is Allah Lord, in 38:66?", a: "Heavens, earth and between", wrong: ["Only the earth", "Only the sky", "Only Arabia"], why: "The Lord of the heavens and the earth and all that is between them." },
        { q: "Which two Names end 38:66?", a: "Almighty, Oft-Forgiving", wrong: ["Wise, Knowing", "First, Last", "Living, Eternal"], why: "The Almighty, the Oft-Forgiving." },
        { tf: true, q: "Allah's might does not stop His forgiveness.", why: "He is Oft-Forgiving as well as being Almighty and All-Powerful." }
      ]
    },
    {
      slug: "a-great-news",
      title: "A great news",
      line: "Say: it is great news, yet you turn away from it.",
      facts: ["Allah sent a Messenger", "They neglected it"],
      quote: q38(67),
      source: ik(67, "The great news is something very important: that Allah has sent His Messenger to them.", "something very important, which is that Allah has sent me to you"),
      difficulty: 2,
      questions: [
        { q: "What is it called, in 38:67?", a: "A great news", wrong: ["A small tale", "A rumour", "An old song"], why: "Say: That is a great news." },
        { q: "What is the news, per Ibn Kathir?", a: "Allah sent him to them", wrong: ["A new king", "A new market", "A war"], why: "Something very important, which is that Allah has sent me to you." },
        { tf: true, q: "The Quran is called great news.", why: "Say: That, this Quran, is a great news." }
      ]
    },
    {
      slug: "you-turn-away",
      title: "You turn away",
      line: "From the great news, you turn away.",
      facts: ["They neglected it", "Do not be like them"],
      quote: q38(68),
      source: ik(68, "From which you turn away means you neglect it.", "you neglect it"),
      difficulty: 2,
      questions: [
        { q: "What do they do, in 38:68?", a: "Turn away from it", wrong: ["Study it", "Love it", "Teach it"], why: "From which you turn away!" },
        { q: "What does turning away mean, per Ibn Kathir?", a: "Neglecting it", wrong: ["Reading it", "Memorising it", "Praising it"], why: "From which you turn away means, you neglect it." },
        { tf: false, q: "Neglecting the Quran is a small matter.", why: "Say: That is a great news, from which you turn away!" }
      ]
    },
    {
      slug: "the-chiefs-on-high",
      title: "The chiefs on high",
      line: "I knew nothing of the angels' discussion, except by revelation.",
      facts: ["About the creation of Adam", "Proof of revelation"],
      quote: q38(69),
      source: ik(69, "Without revelation he could not know about the angels on high disputing about Adam and Iblis.", "This refers to their dispute concerning Adam"),
      difficulty: 3,
      questions: [
        { q: "Who are the chiefs on high, in 38:69?", a: "The angels", wrong: ["Kings", "Stars", "Birds"], why: "I had no knowledge of the chiefs, angels, on high when they were disputing and discussing." },
        { q: "What was the discussion about, per Ibn Kathir?", a: "Adam", wrong: ["Rain", "Trade", "Ships"], why: "This refers to their dispute concerning Adam, peace be upon him." },
        { tf: true, q: "The Prophet ﷺ knew it only through revelation.", why: "Were it not for the divine revelation, how could I have known about the dispute of the chiefs on high?" }
      ]
    },
    {
      slug: "a-plain-warner",
      title: "A plain warner",
      line: "Only this is revealed to me: that I am a plain warner.",
      facts: ["He brings only revelation", "Clear and plain"],
      quote: q38(70),
      source: ik(70, "Were it not for revelation, he could not have known about the angels on high.", "were it not for the divine revelation"),
      difficulty: 3,
      questions: [
        { q: "What is revealed to him, in 38:70?", a: "That he is a plain warner", wrong: ["That he is a king", "That he is rich", "That he is a poet"], why: "Only this has been revealed to me, that I am a plain warner." },
        { q: "How did he know of the angels, per Ibn Kathir?", a: "Through divine revelation", wrong: ["From books", "From poets", "By guessing"], why: "Were it not for the divine revelation, how could I have known?" },
        { q: "How many times is he a warner, in 38:65 and 38:70?", a: "Twice", wrong: ["Once", "Five times", "Never"], why: "Say: I am only a warner (38:65). That I am a plain warner (38:70)." }
      ]
    },
    {
      slug: "man-from-clay",
      title: "Man from clay",
      line: "Your Lord told the angels: I will create man from clay.",
      facts: ["Told before creating Adam", "Told in several surahs"],
      quote: q38(71),
      source: ik(71, "Before creating Adam, Allah told the angels He would create a human being from sounding clay.", "He was going to create a human being from sounding clay"),
      difficulty: 2,
      questions: [
        { q: "From what is man created, in 38:71?", a: "Clay", wrong: ["Fire", "Light", "Water only"], why: "Truly, I am going to create man from clay." },
        { q: "To whom did Allah say it, in 38:71?", a: "The angels", wrong: ["The jinn", "The birds", "The mountains"], why: "When your Lord said to the angels: Truly, I am going to create man from clay." },
        { q: "Where else is this story, per Ibn Kathir?", a: "Al-Baqarah, Al-Araf and others", wrong: ["Only Al-Fil", "Only An-Nas", "Nowhere else"], why: "Allah mentions this story in Surat Al-Baqarah, at the beginning of Surat Al-Araf, in Surat Al-Hijr, Al-Isra, Al-Kahf and in Surah Sad." }
      ]
    },
    {
      slug: "fall-down-prostrate",
      title: "Fall down prostrate",
      line: "When I breathe the soul into him, prostrate to him.",
      facts: ["A sign of honour", "Out of obedience to Allah"],
      quote: q38(72),
      source: ik(72, "The angels were to prostrate to Adam as a sign of honour and respect, and out of obedience to Allah.", "as a sign of honor and respect, and out of obedience to the command of Allah"),
      difficulty: 2,
      questions: [
        { q: "When were they to prostrate, in 38:72?", a: "After the soul was breathed in", wrong: ["Before creation", "At night", "Never"], why: "So, when I have fashioned him and breathed into him his soul created by Me, then you fall down prostrate to him." },
        { q: "Why prostrate, per Ibn Kathir?", a: "Honour and obedience to Allah", wrong: ["To worship Adam", "Out of fear", "By habit"], why: "As a sign of honor and respect, and out of obedience to the command of Allah." },
        { tf: false, q: "The prostration was worship of Adam.", why: "As a sign of honor and respect, and out of obedience to the command of Allah." }
      ]
    },
    {
      slug: "all-the-angels",
      title: "All the angels",
      line: "So the angels prostrated, all of them together.",
      facts: ["Every angel obeyed", "Angels never disobey"],
      quote: q38(73),
      source: ik(73, "All of the angels obeyed this command except Iblis, who was not one of them.", "All of the angels obeyed this command except for Iblis"),
      difficulty: 2,
      questions: [
        { q: "How many angels prostrated, in 38:73?", a: "All of them", wrong: ["Half", "A few", "None"], why: "So, the angels prostrated themselves, all of them." },
        { q: "Who did not, per Ibn Kathir?", a: "Iblis", wrong: ["Jibril", "Mikail", "Israfil"], why: "All of the angels obeyed this command except for Iblis." },
        { tf: true, q: "Every angel obeyed Allah's command.", why: "All of the angels obeyed this command." }
      ]
    },
    {
      slug: "iblis-was-proud",
      title: "Iblis was proud",
      line: "Except Iblis: he was proud and became a disbeliever.",
      facts: ["He was one of the jinn", "Pride led to disbelief"],
      quote: q38(74),
      source: ik(74, "Iblis was not one of the angels; he was one of the jinn, and his nature betrayed him.", "He was one of the Jinn"),
      difficulty: 3,
      questions: [
        { q: "What was Iblis, in 38:74?", a: "Proud", wrong: ["Humble", "Sleepy", "Confused"], why: "Except Iblis, he was proud and was one of the disbelievers." },
        { q: "What was Iblis, per Ibn Kathir?", a: "One of the jinn", wrong: ["An angel", "A man", "A bird"], why: "Except for Iblis, who was not one of them. He was one of the Jinn." },
        { tf: true, q: "Pride stopped Iblis from obeying.", why: "Except Iblis, he was proud and was one of the disbelievers." }
      ]
    },
    {
      slug: "what-prevented-you",
      title: "What prevented you?",
      line: "Allah asked: what stopped you from prostrating?",
      facts: ["Adam was honoured", "Iblis argued with his Lord"],
      quote: q38(75),
      source: ik(75, "Iblis refused to prostrate to Adam and argued with his Lord, claiming he was better.", "He refused to prostrate to Adam, and he disputed with his Lord about him"),
      difficulty: 3,
      questions: [
        { q: "What did Allah ask Iblis, in 38:75?", a: "What prevents you from prostrating?", wrong: ["Where were you?", "Who are you?", "Are you hungry?"], why: "O Iblis! What prevents you from prostrating yourself to one whom I have created with Both My Hands?" },
        { q: "What did Iblis do, per Ibn Kathir?", a: "Argued with his Lord", wrong: ["Said sorry", "Prostrated late", "Ran away"], why: "He refused to prostrate to Adam, and he disputed with his Lord about him." },
        { q: "How was Adam made, in 38:75?", a: "With Both of Allah's Hands", wrong: ["By the angels", "By the jinn", "From light"], why: "One whom I have created with Both My Hands." }
      ]
    },
    {
      slug: "i-am-better",
      title: "I am better",
      line: "Iblis said: I am better; fire is better than clay.",
      facts: ["Pride in origin is wrong", "He was wrong"],
      quote: q38(76),
      source: ik(76, "Iblis claimed he was better because he was made from fire and Adam from clay; this was a mistake and disobedience.", "because he was created from fire while Adam was created from clay"),
      difficulty: 3,
      questions: [
        { q: "What did Iblis claim, in 38:76?", a: "I am better than he", wrong: ["I am sorry", "I am weak", "I am lost"], why: "I am better than he. You created me from fire, and You created him from clay." },
        { q: "From what was Iblis made, in 38:76?", a: "Fire", wrong: ["Clay", "Light", "Water"], why: "You created me from fire." },
        { tf: true, q: "Iblis was wrong to think his origin made him better.", why: "He made a mistake by doing this, and he went against the command of Allah." }
      ]
    },
    {
      slug: "light-fire-and-clay",
      title: "Light, fire and clay",
      line: "Angels were made from light, jinn from fire, Adam from clay.",
      facts: ["Three kinds of creation", "Each made by Allah"],
      quote: q38(76),
      source: hadith("muslim", "2996", "Aishah", "Sahih", "The angels were created from light, the jinn from a smokeless flame of fire, and Adam as described in the Quran.", "The Angels were born out of light"),
      difficulty: 3,
      questions: [
        { q: "From what were angels made, in the hadith?", a: "Light", wrong: ["Fire", "Clay", "Water"], why: "The Angels were born out of light." },
        { q: "From what were jinn made, in the hadith?", a: "A spark of fire", wrong: ["Light", "Clay", "Wind"], why: "The Jinns were born out of the spark of fire." },
        { q: "How was Adam made, in the hadith?", a: "As the Quran describes", wrong: ["From light", "From fire", "From stars"], why: "Adam was born as he has been defined in the Quran for you." }
      ]
    },
    {
      slug: "get-out",
      title: "Get out",
      line: "Allah said: get out, you are cast out.",
      facts: ["Sent down from heaven", "Pride brings humiliation"],
      quote: q38(77),
      source: ik(77, "Allah cast Iblis down from the heavens to the earth, disgraced and rejected.", "He cast him down from the heavens, disgraced and rejected, to the earth"),
      difficulty: 3,
      questions: [
        { q: "What was Iblis told, in 38:77?", a: "Get out; you are outcast", wrong: ["Stay and rest", "Rule the angels", "Return later"], why: "Then get out; for verily, you are outcast." },
        { q: "Where was he cast, per Ibn Kathir?", a: "From the heavens to the earth", wrong: ["To the sea", "To a cave", "Nowhere"], why: "He cast him down from the heavens, disgraced and rejected, to the earth." },
        { tf: true, q: "Pride led to Iblis being thrown out.", why: "So Allah exiled him, humiliated him, and cast him out of His mercy." }
      ]
    },
    {
      slug: "despaired-of-mercy",
      title: "Despaired of mercy",
      line: "Allah's curse is on him until the Day of Recompense.",
      facts: ["Iblis means despaired", "Never despair like him"],
      quote: q38(78),
      source: ik(78, "He was called Iblis because he despaired of mercy: there was no hope for him of mercy.", "that there was no hope for him of mercy"),
      difficulty: 3,
      questions: [
        { q: "Until when is the curse, in 38:78?", a: "The Day of Recompense", wrong: ["One year", "Ramadan", "Tomorrow"], why: "And verily, My curse is on you till the Day of Recompense." },
        { q: "What does the name Iblis point to, per Ibn Kathir?", a: "Despairing of mercy", wrong: ["Being strong", "Being clever", "Being fast"], why: "He had Ablasa min Ar-Rahmah, despaired of mercy." },
        { tf: true, q: "A believer should never despair of Allah's mercy.", why: "Iblis had despaired of mercy; that there was no hope for him of mercy." }
      ]
    },
    {
      slug: "give-me-respite",
      title: "Give me respite",
      line: "Iblis asked: give me time until the Resurrection.",
      facts: ["He asked to be delayed", "Until the Day of Resurrection"],
      quote: q38(79),
      source: ik(79, "Iblis asked Allah for a reprieve until the Day of Resurrection.", "Iblis asked Allah to give him a reprieve until the Day of Resurrection"),
      difficulty: 3,
      questions: [
        { q: "What did Iblis ask, in 38:79?", a: "Respite till the Resurrection", wrong: ["Forgiveness", "Paradise", "Gold"], why: "My Lord! Give me then respite till the Day the dead are resurrected." },
        { q: "Did Iblis ask to be forgiven, per Ibn Kathir?", a: "No, he asked for a reprieve", wrong: ["Yes, sincerely", "Yes, twice", "He asked for wealth"], why: "Iblis asked Allah to give him a reprieve until the Day of Resurrection." },
        { tf: false, q: "Iblis repented after his mistake.", why: "Iblis asked Allah to give him a reprieve until the Day of Resurrection." }
      ]
    },
    {
      slug: "allowed-respite",
      title: "Allowed respite",
      line: "Allah said: you are among those given respite.",
      facts: ["Allah is Forbearing", "He does not rush to punish"],
      quote: q38(80),
      source: ik(80, "The Forbearing One, who does not hasten to punish those who disobey, gave him a reprieve.", "Who does not hasten to punish those who disobey Him"),
      difficulty: 3,
      questions: [
        { q: "What did Allah say, in 38:80?", a: "You are allowed respite", wrong: ["Never", "Leave now", "Try again"], why: "Verily, you are of those allowed respite." },
        { q: "Which quality of Allah is shown, per Ibn Kathir?", a: "He is Forbearing", wrong: ["He is hasty", "He is unaware", "He is weak"], why: "The Forbearing One, Who does not hasten to punish those who disobey Him." },
        { tf: true, q: "Allah gives time even to the disobedient.", why: "Who does not hasten to punish those who disobey Him, gave him a reprieve." }
      ]
    },
    {
      slug: "the-appointed-day",
      title: "The appointed day",
      line: "Until the Day of the time appointed.",
      facts: ["A fixed time", "He then rebelled more"],
      quote: q38(81),
      source: ik(81, "When Iblis knew he was safe until the Day of Resurrection, he rebelled and transgressed.", "he rebelled and transgressed"),
      difficulty: 3,
      questions: [
        { q: "Until when is the respite, in 38:81?", a: "The Day of the time appointed", wrong: ["Forever", "Next week", "No limit"], why: "Till the Day of the time appointed." },
        { q: "What did Iblis do then, per Ibn Kathir?", a: "Rebelled and transgressed", wrong: ["Thanked Allah", "Repented", "Hid away"], why: "When he knew that he was safe from destruction until the Day of Resurrection, he rebelled and transgressed." },
        { tf: true, q: "The respite has a fixed end.", why: "Till the Day of the time appointed." }
      ]
    },
    {
      slug: "by-your-might",
      title: "By Your might",
      line: "Iblis swore: by Your might, I will mislead them all.",
      facts: ["His goal is to mislead", "We must be on guard"],
      quote: q38(82),
      source: ik(82, "Like 17:62, Iblis vowed to seize and mislead Adam's offspring, all but a few.", "I will surely seize and mislead his offspring all but a few"),
      difficulty: 4,
      questions: [
        { q: "By what did Iblis swear, in 38:82?", a: "Allah's might", wrong: ["The fire", "The stars", "Himself"], why: "By Your might, then I will surely mislead them all." },
        { q: "What did he vow, in 38:82?", a: "To mislead them all", wrong: ["To help them", "To leave them", "To guide them"], why: "Then I will surely mislead them all." },
        { q: "Which ayah is similar, per Ibn Kathir?", a: "17:62", wrong: ["2:2", "112:1", "36:1"], why: "I will surely seize and mislead his offspring all but a few! (17:62)." }
      ]
    },
    {
      slug: "your-true-servants",
      title: "Your true servants",
      line: "Except Your true servants: he has no power over them.",
      facts: ["Sincere servants are safe", "Allah is their Guardian"],
      quote: q38(83),
      source: ik(83, "The few excepted are Allah's servants; as 17:65 says, Iblis has no authority over them.", "you have no authority over them"),
      difficulty: 4,
      questions: [
        { q: "Whom can Iblis not mislead, in 38:83?", a: "Allah's true servants", wrong: ["The rich", "The strong", "The old"], why: "Except Your true servants amongst them." },
        { q: "Which ayah says he has no power over them?", a: "17:65", wrong: ["2:255", "1:5", "114:1"], why: "Verily, My servants, you have no authority over them (17:65)." },
        { tf: true, q: "Sincere worship protects from Shaytan.", why: "Verily, My servants, you have no authority over them. And All-Sufficient is your Lord as a Guardian." }
      ]
    },
    {
      slug: "the-truth-i-say",
      title: "The truth I say",
      line: "Allah said: the truth is, and the truth I say.",
      facts: ["Allah only speaks truth", "A solemn statement"],
      quote: q38(84),
      source: ik(84, "Mujahid read it as: I am the Truth and the truth I say; As-Suddi said it is an oath by Allah.", "I am the Truth and the truth I say"),
      difficulty: 4,
      questions: [
        { q: "What did Allah say, in 38:84?", a: "The truth is, the truth I say", wrong: ["Maybe so", "Wait and see", "As you like"], why: "The truth is, the truth I say." },
        { q: "How did Mujahid read it?", a: "I am the Truth, and truth I say", wrong: ["Truth is hidden", "Truth is late", "Truth is many"], why: "Some of them, including Mujahid, read this as meaning, I am the Truth and the truth I say." },
        { q: "What did As-Suddi say it is?", a: "An oath sworn by Allah", wrong: ["A poem", "A question", "A joke"], why: "Others, such as As-Suddi, interpreted it as being an oath sworn by Allah." }
      ]
    },
    {
      slug: "those-who-follow-him",
      title: "Those who follow him",
      line: "Hell will be filled with Iblis and all who follow him.",
      facts: ["Following him has a price", "Like 17:63 and 32:13"],
      quote: q38(85),
      source: ik(85, "Like 32:13, Allah's word took effect that Hell will be filled with jinn and people who follow Iblis.", "that I will fill Hell with Jinn and mankind together"),
      difficulty: 4,
      questions: [
        { q: "Who will be with Iblis, in 38:85?", a: "Those who follow him", wrong: ["The angels", "The Prophets", "The sincere"], why: "That I will fill Hell with you and those of them that follow you, together." },
        { q: "Which ayah is similar, per Ibn Kathir?", a: "32:13", wrong: ["1:1", "112:4", "55:13"], why: "But the Word from Me took effect, that I will fill Hell with Jinn and mankind together (32:13)." },
        { tf: true, q: "We choose whom to follow.", why: "And whosoever of them follows you, surely, Hell will be the recompense of you all (17:63)." }
      ]
    },
    {
      slug: "no-wage",
      title: "No wage",
      line: "Say: I ask no wage, and I am no pretender.",
      facts: ["He added nothing to revelation", "He sought only Allah"],
      quote: q38(86),
      source: ik(86, "He asked no worldly reward, and added nothing to what Allah told him, seeking Allah and the Hereafter.", "I do not add anything or take anything away"),
      difficulty: 3,
      questions: [
        { q: "What did he not ask for, in 38:86?", a: "A wage", wrong: ["Patience", "Guidance", "Peace"], why: "Say: No wage do I ask of you for this." },
        { q: "What does Mutakallifin mean, per Ibn Kathir?", a: "One who adds to revelation", wrong: ["A good speaker", "A rich man", "A traveller"], why: "I do not add anything to that which Allah has told me." },
        { q: "What was he seeking, per Ibn Kathir?", a: "Allah and the Hereafter", wrong: ["Fame", "Money", "Power"], why: "By doing this I am seeking the Face of Allah and the Hereafter." }
      ]
    },
    {
      slug: "allah-knows-best",
      title: "Allah knows best",
      line: "Ibn Masud: if you do not know, say Allah knows best.",
      facts: ["Knowledge includes saying I do not know", "He quoted 38:86"],
      quote: q38(86),
      source: hadith("bukhari", "4809", "Abdullah ibn Masud", "Sahih", "Ibn Masud said whoever does not know should say Allah knows best, citing 38:86.", "it is a sign of having knowledge to say about something which one does not know"),
      difficulty: 3,
      questions: [
        { q: "What should one who does not know say?", a: "Allah knows better", wrong: ["Make a guess", "Stay silent forever", "Ask a poet"], why: "If he does not know it, he should say, Allah knows better." },
        { q: "What is saying it a sign of, per Ibn Masud?", a: "Having knowledge", wrong: ["Weakness", "Laziness", "Pride"], why: "It is a sign of having knowledge to say about something which one does not know, Allah knows better." },
        { q: "Which ayah did Ibn Masud cite?", a: "38:86", wrong: ["2:255", "1:1", "112:1"], why: "No wage do I ask of You for this, nor am I one of the pretenders (38.86)." }
      ]
    },
    {
      slug: "a-reminder-for-all",
      title: "A reminder for all",
      line: "The Quran is only a Reminder for all the worlds.",
      facts: ["For people and jinn", "For everyone it reaches"],
      quote: q38(87),
      source: ik(87, "Ibn Abbas said the Quran is a reminder for all who are accountable, people and jinn.", "is a reminder for all those who are held accountable, men and Jinn"),
      difficulty: 3,
      questions: [
        { q: "For whom is the Reminder, in 38:87?", a: "All the creatures", wrong: ["Arabs only", "Scholars only", "Kings only"], why: "It is only a Reminder for all the creatures." },
        { q: "Who is meant, per Ibn Abbas?", a: "People and jinn", wrong: ["Angels only", "Animals", "Stars"], why: "The Quran is a reminder for all those who are held accountable, men and Jinn." },
        { q: "Which ayah says it warns whomever it reaches?", a: "6:19", wrong: ["2:1", "36:1", "114:6"], why: "That I may therewith warn you and whomsoever it may reach (6:19)." }
      ]
    },
    {
      slug: "you-will-know",
      title: "You will know",
      line: "And you will surely know its truth after a while.",
      facts: ["After death", "On the Day of Resurrection"],
      quote: q38(88),
      source: ik(88, "Qatadah said after death and Ikrimah said on the Day of Resurrection; both agree, since whoever dies comes under its rulings.", "because whoever dies comes under the rulings of the Day of Resurrection"),
      difficulty: 4,
      questions: [
        { q: "When will they know, in 38:88?", a: "After a while", wrong: ["Never", "Only today", "In a dream"], why: "And you shall certainly know the truth of it after a while." },
        { q: "What did Qatadah say after a while means?", a: "After death", wrong: ["Next year", "In old age", "At dawn"], why: "Qatadah said, After death." },
        { q: "Why do both views agree, per Ibn Kathir?", a: "Death leads into Resurrection", wrong: ["They are guesses", "They are the same word", "They do not agree"], why: "Because whoever dies comes under the rulings of the Day of Resurrection." }
      ]
    }
  ]
};
export const SAD_UNITS: readonly DeepUnit[] = [SAD_ONE, SAD_TWO, SAD_THREE, SAD_FOUR];
