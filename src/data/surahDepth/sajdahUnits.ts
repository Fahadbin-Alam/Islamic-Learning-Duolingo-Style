import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah As-Sajdah ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on As-Sajdah 32:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_32_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on As-Sajdah 32:${ayah}`,
    url: `https://quran.com/32:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 32:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q32 = (ayah: number) => quranQuote(32, ayah);

/** Ayahs 1 to 14: the Book with no doubt, creation in six Days, how man is made, the angel of death, and regret on the Day. */
const SAJDAH_ONE: DeepUnit = {
  key: "sajdah1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-32",
  name: "As-Sajdah, ayahs 1 to 14",
  kind: "skill",
  lessonType: "surah",
  surahName: "As-Sajdah",
  lessons: [
    {
      slug: "friday-fajr-surah",
      title: "The Friday Fajr surah",
      line: "The Prophet ﷺ recited As-Sajdah at Fajr on Fridays.",
      facts: ["Opens with Alif Lam Mim", "Paired with Al-Insan"],
      quote: q32(1),
      source: hadith("bukhari", "891", "Abu Hurairah", "Sahih", "The Prophet ﷺ used to recite As-Sajdah and Al-Insan in the Fajr prayer on Friday.", "used to recite the following in the Fajr prayer of Friday"),
      difficulty: 2,
      questions: [
        { q: "Which letters open As-Sajdah, in 32:1?", a: "Alif Lam Mim", wrong: ["Ta Ha", "Ya Sin", "Sad"], why: "Alif Lam Mim." },
        { q: "In which prayer did he recite it, in the hadith?", a: "Fajr on Friday", wrong: ["Maghrib daily", "Isha on Monday", "Eid only"], why: "Used to recite the following in the Fajr prayer of Friday." },
        { q: "Which surah came with it, in the hadith?", a: "Al-Insan", wrong: ["Al-Fatihah", "Yasin", "Al-Mulk"], why: "Alif, Lam, Mim, Tanzil and Hal-ata-ala-l-Insani." }
      ]
    },
    {
      slug: "no-doubt-in-it",
      title: "No doubt in it",
      line: "The Book comes from the Lord of all, with no doubt.",
      facts: ["The Quran is from Allah", "Ibn Kathir explains the letters in Al-Baqarah"],
      quote: q32(2),
      source: ik(2, "There is no doubt at all that the Quran was revealed from the Lord of all that exists.", "no doubt whatsoever that it has been revealed"),
      difficulty: 2,
      questions: [
        { q: "What is in the Book, in 32:2?", a: "No doubt", wrong: ["Some doubt", "Many riddles", "Old myths"], why: "The revelation of the Book in which there is no doubt." },
        { q: "From whom is it, in 32:2?", a: "The Lord of all that exists", wrong: ["A poet", "A wise man", "The Romans"], why: "Is from the Lord of all that exists." },
        { tf: true, q: "Ibn Kathir explains the letters again in As-Sajdah.", why: "We discussed the individual letters at the beginning of Surat Al-Baqarah, and there is no need to repeat it here." }
      ]
    },
    {
      slug: "a-warner-to-a-people",
      title: "A warner to a people",
      line: "Deniers said he made it up; it is the truth from Allah.",
      facts: ["No warner had come to them", "Sent so they may be guided"],
      quote: q32(3),
      source: ik(3, "The idolators claimed he made up the Quran himself. Allah answers that it is the truth, sent so people may follow the truth.", "in order that they may follow the truth"),
      difficulty: 3,
      questions: [
        { q: "What did the idolators claim, in 32:3?", a: "He fabricated it", wrong: ["He found it", "He bought it", "He dreamed it"], why: "Or say they: He has fabricated it?" },
        { q: "What does fabricated mean, per Ibn Kathir?", a: "Made it up himself", wrong: ["Copied it", "Sang it", "Wrote it on stone"], why: "He has made it up by himself." },
        { q: "Why was it sent, in 32:3?", a: "So they may be guided", wrong: ["To amuse them", "To scare them only", "To make them rich"], why: "In order that they may be guided." }
      ]
    },
    {
      slug: "six-days-and-the-throne",
      title: "Six Days and the Throne",
      line: "Allah created the heavens and earth in six Days.",
      facts: ["No protector besides Him", "Intercession only by His leave"],
      quote: q32(4),
      source: ik(4, "Allah alone controls all affairs. There is no creator besides Him, and no one intercedes except whom He permits.", "no intercessor except the one to whom He gives permission"),
      difficulty: 3,
      questions: [
        { q: "In how many Days were the heavens made, in 32:4?", a: "Six", wrong: ["One", "Seven", "Forty"], why: "And all that is between them in six Days." },
        { q: "Who can intercede, per Ibn Kathir?", a: "Only whom Allah permits", wrong: ["Anyone rich", "Every idol", "No one ever"], why: "No intercessor except the one to whom He gives permission." },
        { q: "Whom do we have besides Him, in 32:4?", a: "No protector at all", wrong: ["Our tribe", "Our idols", "Our kings"], why: "You have none, besides Him, as a protector or an intercessor." }
      ]
    },
    {
      slug: "the-command-comes-down",
      title: "The command comes down",
      line: "Allah sends the command down and it goes up to Him.",
      facts: ["A Day like a thousand years", "Angels travel fast"],
      quote: q32(5),
      source: ik(5, "The angel crosses a distance of five hundred years when he comes down or goes up, yet does it in the blink of an eye.", "but he covers it in the blink of an eye"),
      difficulty: 4,
      questions: [
        { q: "How long is that Day, in 32:5?", a: "A thousand years", wrong: ["One hour", "Ten years", "Seven days"], why: "In one Day, the space whereof is a thousand years of your reckoning." },
        { q: "How fast does the angel travel, per Mujahid?", a: "In the blink of an eye", wrong: ["In a year", "In a month", "In a week"], why: "But he covers it in the blink of an eye." },
        { q: "Where does the command come from, in 32:5?", a: "The heavens", wrong: ["The sea", "The mountains", "The west"], why: "He directs the command from the heavens to the earth." }
      ]
    },
    {
      slug: "mighty-and-merciful",
      title: "Mighty and Merciful",
      line: "He knows the unseen and seen, All-Mighty, Most Merciful.",
      facts: ["All deeds rise to Him", "Might joined with mercy"],
      quote: q32(6),
      source: ik(6, "Allah sees all that His servants do, small and large. He is Almighty in His mercy and Most Merciful in His might.", "He is Almighty in His mercy and Most Merciful in His might"),
      difficulty: 3,
      questions: [
        { q: "What does Allah know, in 32:6?", a: "The unseen and the seen", wrong: ["Only the seen", "Only the past", "Only words"], why: "That is He, the All-Knower of the unseen and the seen." },
        { q: "How does Ibn Kathir join the two Names?", a: "Mighty in mercy, merciful in might", wrong: ["Mighty only", "Merciful only", "Neither"], why: "He is Almighty in His mercy and Most Merciful in His might." },
        { q: "Which deeds rise to Him, per Ibn Kathir?", a: "All, small and large", wrong: ["Only big ones", "Only prayers", "None"], why: "All their deeds, major and minor, significant and insignificant, ascend to Him." }
      ]
    },
    {
      slug: "everything-made-well",
      title: "Everything made well",
      line: "Allah made everything well, and began man from clay.",
      facts: ["Adam was made from clay", "Allah's work is beautiful"],
      quote: q32(7),
      source: ik(7, "Zayd bin Aslam said Allah created everything well. He made Adam, the father of mankind, from clay.", "He created the father of mankind, Adam, from clay"),
      difficulty: 3,
      questions: [
        { q: "How did Allah make everything, in 32:7?", a: "Good", wrong: ["Rushed", "Broken", "Plain"], why: "Who made everything He has created good." },
        { q: "From what did He begin man, in 32:7?", a: "Clay", wrong: ["Fire", "Light", "Stone"], why: "And He began the creation of man from clay." },
        { q: "Who was first made from clay, per Ibn Kathir?", a: "Adam", wrong: ["Nuh", "Ibrahim", "Musa"], why: "He created the father of mankind, Adam, from clay." }
      ]
    },
    {
      slug: "his-offspring",
      title: "His offspring",
      line: "Then Allah made Adam's children from a humble fluid.",
      facts: ["Humans grow from a drop", "A humble start teaches humility"],
      quote: q32(8),
      source: ik(8, "After Adam, people come into being from a Nutfah, a small drop, by the will of Allah.", "they reproduce in this fashion, from a Nutfah"),
      difficulty: 3,
      questions: [
        { q: "Whose offspring is meant, in 32:8?", a: "Adam's", wrong: ["The angels'", "The jinn's", "The animals'"], why: "Then He made his offspring from semen of despised water." },
        { q: "What is the Nutfah, per Ibn Kathir?", a: "The small drop we begin from", wrong: ["A kind of clay", "A star", "A plant"], why: "They reproduce in this fashion, from a Nutfah." },
        { tf: true, q: "Our humble beginning should keep us humble.", why: "Then He made his offspring from semen of despised water." }
      ]
    },
    {
      slug: "hearing-sight-and-reason",
      title: "Hearing, sight and reason",
      line: "Allah shaped man, gave him a soul, hearing, sight and reason.",
      facts: ["Use gifts to worship Allah", "Few give real thanks"],
      quote: q32(9),
      source: ik(9, "The truly blessed person uses hearing, sight and reason to worship and obey his Lord.", "the one who is truly blessed is the one who uses them to worship and obey his Lord"),
      difficulty: 3,
      questions: [
        { q: "What did Allah breathe into him, in 32:9?", a: "The soul", wrong: ["Fire", "Wind", "Smoke"], why: "And breathed into him the soul." },
        { q: "What three gifts does 32:9 name?", a: "Hearing, sight, reason", wrong: ["Gold, silver, land", "Food, water, air", "Wings, fins, claws"], why: "And He gave you hearing, sight and the sense of deduction." },
        { q: "Who is truly blessed, per Ibn Kathir?", a: "One who uses them to worship", wrong: ["One who is rich", "One who sleeps", "One who is tall"], why: "The one who is truly blessed is the one who uses them to worship and obey his Lord." }
      ]
    },
    {
      slug: "lost-in-the-earth",
      title: "Lost in the earth",
      line: "They asked: once lost in the earth, will we be made again?",
      facts: ["Allah made us from nothing", "Raising us again is easy"],
      quote: q32(10),
      source: ik(10, "They thought coming back unlikely. But the One who made them from nothing only says Be, and it is.", "the power of the One Who created them from nothing"),
      difficulty: 3,
      questions: [
        { q: "What did they ask, in 32:10?", a: "Will we be created anew?", wrong: ["Where is the sea?", "Who is king?", "When is Eid?"], why: "When we are lost in the earth, shall we indeed be created anew?" },
        { q: "What do they truly deny, in 32:10?", a: "Meeting their Lord", wrong: ["The sun", "Their names", "The rain"], why: "Nay, but they deny the meeting with their Lord." },
        { q: "What does Allah say to a thing He wills, per Ibn Kathir?", a: "Be", wrong: ["Wait", "Maybe", "Later"], why: "Who when He wills a thing merely says to it, Be! and it is." }
      ]
    },
    {
      slug: "the-angel-of-death",
      title: "The angel of death",
      line: "The angel of death set over you takes the souls.",
      facts: ["He has helpers", "Then we return to Allah"],
      quote: q32(11),
      source: ik(11, "The angel of death is a specific angel, and he has helpers. After death, people are raised and brought to their Lord.", "The angel of death has helpers"),
      difficulty: 4,
      questions: [
        { q: "Who takes the souls, in 32:11?", a: "The angel of death", wrong: ["The angel of rain", "A jinn", "No one"], why: "The angel of death, who is set over you, will take your souls." },
        { q: "Does he work alone, per Ibn Kathir?", a: "No, he has helpers", wrong: ["Yes, always alone", "Only at night", "Only with people"], why: "The angel of death has helpers." },
        { q: "Where are we brought after, in 32:11?", a: "To our Lord", wrong: ["To the sea", "To nowhere", "Back to earth"], why: "Then you shall be brought to your Lord." }
      ]
    },
    {
      slug: "send-us-back",
      title: "Send us back",
      line: "That Day the guilty will beg: send us back to do good.",
      facts: ["Seeing is too late then", "Act now while you can"],
      quote: q32(12),
      source: ik(12, "They will say they now see and hear, and ask to return. Allah knows they would behave as before if sent back.", "they would behave as they did previously"),
      difficulty: 4,
      questions: [
        { q: "What will they ask, in 32:12?", a: "To be sent back", wrong: ["For gold", "For sleep", "For food"], why: "Our Lord! We have now seen and heard, so send us back." },
        { q: "How will they hold their heads, in 32:12?", a: "Hanging down", wrong: ["High up", "Turned away", "Covered"], why: "When the criminals shall hang their heads before their Lord." },
        { q: "What would they do if sent back, per Ibn Kathir?", a: "Behave as before", wrong: ["Change fully", "Become angels", "Stay silent"], why: "They would behave as they did previously." }
      ]
    },
    {
      slug: "guidance-is-allahs",
      title: "Guidance is Allah's",
      line: "Had Allah willed, He would have guided every soul.",
      facts: ["Allah gave people a choice", "Seek His guidance"],
      quote: q32(13),
      source: ik(13, "Ibn Kathir links this to 10:99: had your Lord willed, all on earth would have believed.", "And had your Lord willed, those on earth would have believed, all of them together"),
      difficulty: 4,
      questions: [
        { q: "What could Allah have given every soul, in 32:13?", a: "Its guidance", wrong: ["Wealth", "Wings", "Kingdoms"], why: "And if We had willed, surely We would have given every person his guidance." },
        { q: "Which ayah does Ibn Kathir link to 32:13?", a: "10:99", wrong: ["2:255", "1:1", "112:1"], why: "And had your Lord willed, those on earth would have believed, all of them together. (10:99)" },
        { tf: true, q: "Ibn Kathir seeks refuge with Allah from that end.", why: "We seek refuge with Allah and in His perfect Words from that." }
      ]
    },
    {
      slug: "forgetting-the-meeting",
      title: "Forgetting the meeting",
      line: "Those who acted as if they forgot the Day are left out.",
      facts: ["Nothing escapes Allah", "Remember the meeting with Him"],
      quote: q32(14),
      source: ik(14, "They acted as if they had forgotten the Day. Allah will deal with them as if forgotten, though nothing escapes Him.", "but nothing escapes … attention, and He makes the punishment fit the crime"),
      difficulty: 5,
      questions: [
        { q: "What did they forget, in 32:14?", a: "The meeting of this Day", wrong: ["Their homes", "Their names", "Their food"], why: "Then taste because of your forgetting the meeting of this Day of yours." },
        { q: "Does Allah truly forget, per Ibn Kathir?", a: "No, nothing escapes Him", wrong: ["Yes, sometimes", "Only small things", "Only at night"], why: "We will deal with you as if We have forgotten you, but nothing escapes Allah." },
        { q: "Which ayah does Ibn Kathir link to 32:14?", a: "45:34", wrong: ["2:2", "36:1", "55:13"], why: "This Day We will forget you as you forgot the meeting of this Day of yours. (45:34)" }
      ]
    }
  ]
};

/** Ayahs 15 to 30: those who fall in prostration, night prayer, hidden joys, the believer and the rebel, the Book of Musa, and the Day of Judgement. */
const SAJDAH_TWO: DeepUnit = {
  key: "sajdah2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-32",
  name: "As-Sajdah, ayahs 15 to 30",
  kind: "skill",
  lessonType: "surah",
  surahName: "As-Sajdah",
  lessons: [
    {
      slug: "they-fall-in-prostration",
      title: "They fall in prostration",
      line: "True believers fall in sajdah when reminded, without pride.",
      facts: ["Listen and obey", "No pride before Allah"],
      quote: q32(15),
      source: ik(15, "Believers listen to the ayahs and obey them in word and deed. They are not too proud to submit.", "they listen to them and obey them in word and deed"),
      difficulty: 3,
      questions: [
        { q: "What do they do when reminded, in 32:15?", a: "Fall down prostrate", wrong: ["Walk away", "Laugh", "Argue"], why: "Who, when they are reminded of them, fall down prostrate." },
        { q: "How do they respond, per Ibn Kathir?", a: "Obey in word and deed", wrong: ["Only in words", "Only in secret", "Not at all"], why: "They listen to them and obey them in word and deed." },
        { q: "What are they not, in 32:15?", a: "Proud", wrong: ["Thankful", "Humble", "Patient"], why: "And they are not proud." }
      ]
    },
    {
      slug: "sides-leave-their-beds",
      title: "Sides leave their beds",
      line: "They leave their beds to call their Lord in fear and hope.",
      facts: ["Night prayer is loved", "Fear and hope together"],
      quote: q32(16),
      source: ik(16, "Mujahid and Al-Hasan said this is the voluntary night prayer: they give up sleep and comfort to call on Allah.", "they pray the voluntary night prayer and forego sleep and resting on a comfortable bed"),
      difficulty: 3,
      questions: [
        { q: "What do their sides forsake, in 32:16?", a: "Their beds", wrong: ["Their homes", "Their friends", "Their food"], why: "Their sides forsake their beds." },
        { q: "How do they call on Allah, in 32:16?", a: "In fear and hope", wrong: ["In anger", "In boredom", "In doubt"], why: "To invoke their Lord in fear and hope." },
        { q: "What prayer is meant, per Mujahid?", a: "The night prayer", wrong: ["Eid prayer", "Rain prayer", "No prayer"], why: "Mujahid and Al-Hasan said that the Ayah refers to voluntary night prayer." }
      ]
    },
    {
      slug: "sweeter-than-sleep",
      title: "Sweeter than sleep",
      line: "For them, night prayer is sweeter than a comfortable bed.",
      facts: ["As-Sa'di explains", "Night prayer"],
      quote: q32(16),
      source: saadi(32, 16, "As-Sa'di says the believers leave their pleasant beds for what is sweeter and dearer to them, night prayer and talking to Allah, calling on Him in fear their deeds are rejected and hope they are accepted.", "إلى ما هو ألذ عندهم منه وأحب إليهم، وهو الصلاة في الليل"),
      difficulty: 2,
      questions: [
        { q: "Why do believers leave their beds at night, per as-Sa'di?", a: "Night prayer is sweeter to them", wrong: ["They cannot sleep", "To eat", "To travel"], why: "Night prayer is sweeter and dearer to them, says as-Sa'di." },
        { q: "What do they fear and hope for, per as-Sa'di on 32:16?", a: "Rejection and acceptance of deeds", wrong: ["Rain and drought", "Profit and loss", "Heat and cold"], why: "They fear their deeds are rejected and hope they are accepted." },
        { tf: true, q: "Spending in As-Sajdah 32:16 includes Zakah and spending on family.", why: "As-Sa'di on 32:16." }
      ]
    },
    {
      slug: "doors-of-good",
      title: "The doors of good",
      line: "Fasting is a shield and charity puts out sins.",
      facts: ["Night prayer is a door of good", "The Prophet ﷺ recited 32:16"],
      quote: q32(16),
      source: hadith("tirmidhi", "2616", "Mu'adh bin Jabal", "Sahih", "The Prophet ﷺ told Mu'adh of the doors of good: fasting is a shield, charity puts out sins, and prayer in the depths of the night.", "Fasting is a shield, and charity extinguishes sins like water extinguishes fire"),
      difficulty: 4,
      questions: [
        { q: "What is fasting, in the hadith?", a: "A shield", wrong: ["A burden", "A game", "A tax"], why: "Fasting is a shield." },
        { q: "What does charity do, in the hadith?", a: "Puts out sins", wrong: ["Makes poor", "Brings fame", "Nothing"], why: "And charity extinguishes sins like water extinguishes fire." },
        { q: "Which prayer is a door of good, in the hadith?", a: "Prayer deep in the night", wrong: ["Prayer at noon only", "Prayer while traveling", "None"], why: "And a man's praying in depths of the night." }
      ]
    },
    {
      slug: "what-no-eye-has-seen",
      title: "What no eye has seen",
      line: "No soul knows the joys kept hidden for the believers.",
      facts: ["Rewards beyond imagining", "A reward for deeds"],
      quote: q32(17),
      source: hadith("bukhari", "4779", "Abu Hurairah", "Sahih", "Allah said He has prepared for His pious servants what no eye has seen, no ear has heard, and no one has imagined.", "such things as no eye has ever seen, no ear has ever heard of"),
      difficulty: 4,
      questions: [
        { q: "Who knows what is hidden for them, in 32:17?", a: "No person", wrong: ["Every scholar", "The kings", "Poets"], why: "No person knows what is kept hidden for them of delights of eyes." },
        { q: "What has no eye seen, in the hadith?", a: "What Allah prepared", wrong: ["The sea", "The moon", "A desert"], why: "I have prepared for my pious worshipers such things as no eye has ever seen." },
        { q: "Why is it given, in 32:17?", a: "For what they used to do", wrong: ["By chance", "For their wealth", "For their looks"], why: "As a reward for what they used to do." }
      ]
    },
    {
      slug: "not-equal",
      title: "Not equal",
      line: "Is the believer like the rebellious? They are not equal.",
      facts: ["Allah is just", "Deeds make the difference"],
      quote: q32(18),
      source: ik(18, "In His justice and generosity, Allah will not judge believers the same way as those who rebelled and rejected the Messengers.", "in His justice and generosity"),
      difficulty: 3,
      questions: [
        { q: "Are the believer and rebel equal, in 32:18?", a: "No", wrong: ["Yes", "Sometimes", "Only in wealth"], why: "Not equal are they." },
        { q: "What shows in this, per Ibn Kathir?", a: "Allah's justice and generosity", wrong: ["Luck", "Chance", "Kings' rules"], why: "In His justice and generosity." },
        { q: "Which ayah does Ibn Kathir link to 32:18?", a: "59:20", wrong: ["1:5", "2:1", "114:1"], why: "Not equal are the dwellers of the Fire and the dwellers of the Paradise. (59:20)" }
      ]
    },
    {
      slug: "gardens-of-abode",
      title: "Gardens of Abode",
      line: "Believers who do good get Gardens of Abode, a welcome.",
      facts: ["Homes and lofty rooms", "Welcomed as honored guests"],
      quote: q32(19),
      source: ik(19, "The Gardens have dwellings and lofty rooms. They are given as a welcome to honor a guest.", "something to welcome and honor a guest"),
      difficulty: 3,
      questions: [
        { q: "What do believers who do good get, in 32:19?", a: "Gardens of Abode", wrong: ["A small tent", "Nothing", "Old ruins"], why: "For them are Gardens of Abode." },
        { q: "What is in the Gardens, per Ibn Kathir?", a: "Dwellings and lofty rooms", wrong: ["Only sand", "Only trees", "Only rivers"], why: "In which there are dwellings and houses and lofty apartments." },
        { q: "What does entertainment mean, per Ibn Kathir?", a: "Welcoming an honored guest", wrong: ["A show", "A game", "A song"], why: "Something to welcome and honor a guest." }
      ]
    },
    {
      slug: "those-who-rebel",
      title: "Those who rebel",
      line: "Rebels who denied the Fire will find no way out of it.",
      facts: ["Denial has a cost", "Return to Allah now"],
      quote: q32(20),
      source: ik(20, "Those who disobeyed Allah and denied the Fire will be told it is what they used to deny.", "this will be said to them by way of rebuke and chastisement"),
      difficulty: 4,
      questions: [
        { q: "Who goes to the Fire, in 32:20?", a: "Those who rebel", wrong: ["Those who pray", "Those who give", "Those who repent"], why: "And as for those who rebel, their abode will be the Fire." },
        { q: "What had they done with the Fire, in 32:20?", a: "Denied it", wrong: ["Feared it", "Studied it", "Avoided it"], why: "Taste you the torment of the Fire which you used to deny." },
        { tf: true, q: "Ibn Kathir says the words are said as a rebuke.", why: "This will be said to them by way of rebuke and chastisement." }
      ]
    },
    {
      slug: "smaller-trials-first",
      title: "Smaller trials first",
      line: "Allah sends smaller trials in this life so people return.",
      facts: ["Hardships can be reminders", "Turn back to Allah"],
      quote: q32(21),
      source: ik(21, "Ibn Abbas said the near trial means illnesses and problems in this world, a test so people repent to Allah.", "diseases and problems in this world"),
      difficulty: 4,
      questions: [
        { q: "Why does Allah send the nearer trial, in 32:21?", a: "So they may return", wrong: ["To destroy all", "For no reason", "To amuse"], why: "In order that they may return." },
        { q: "What is the near trial, per Ibn Abbas?", a: "Illness and worldly problems", wrong: ["Only war", "Only floods", "Only debt"], why: "The near torment means diseases and problems in this world." },
        { q: "What should a trial lead to, per Ibn Abbas?", a: "Repentance", wrong: ["Anger", "Despair", "Boasting"], why: "As a test from Allah to His servants so that they will repent to Him." }
      ]
    },
    {
      slug: "a-taste-before-the-fire",
      title: "A taste before the Fire",
      line: "The lesser punishment includes the punishment of the grave.",
      facts: ["As-Sa'di explains", "Punishment of the grave"],
      quote: q32(21),
      source: saadi(32, 21, "As-Sa'di says the lesser punishment in 32:21 includes hardships in this life and the punishment of the Barzakh, and the ayah is a clear proof of the punishment of the grave before the greater one, the Fire.", "وهذه الآية من الأدلة على إثبات عذاب القبر"),
      difficulty: 2,
      questions: [
        { q: "What does As-Sajdah 32:21 prove, per as-Sa'di?", a: "The punishment of the grave", wrong: ["Life on other planets", "Reincarnation", "Nothing"], why: "The ayah is a proof of the punishment of the grave, says as-Sa'di." },
        { q: "What is the greater punishment, per as-Sa'di on 32:21?", a: "The Fire", wrong: ["Poverty", "Illness", "Old age"], why: "The greater punishment is the punishment of the Fire." },
        { tf: true, q: "Hardships in this life can be a chance to return to Allah.", why: "As-Sa'di on 32:21." }
      ]
    },
    {
      slug: "turning-from-reminders",
      title: "Turning from reminders",
      line: "None wrongs more than one who turns from Allah's reminders.",
      facts: ["Keep remembering Allah", "Do not ignore reminders"],
      quote: q32(22),
      source: ik(22, "Qatadah warned that whoever turns away from remembering Allah becomes most misguided and most in need.", "Beware of turning away from the remembrance of Allah"),
      difficulty: 4,
      questions: [
        { q: "Who does the most wrong, in 32:22?", a: "One who turns from reminders", wrong: ["One who forgets lunch", "One who travels", "One who sleeps"], why: "And who does more wrong than he who is reminded of the Ayat of his Lord, then turns aside therefrom?" },
        { q: "What did Qatadah warn against?", a: "Turning from Allah's remembrance", wrong: ["Eating late", "Long walks", "Too much reading"], why: "Beware of turning away from the remembrance of Allah." },
        { q: "How does such a one end, per Qatadah?", a: "Most misguided", wrong: ["Most rich", "Most famous", "Most rested"], why: "Whoever turns away from remembering Him will be the most misguided and the most in need." }
      ]
    },
    {
      slug: "the-book-of-musa",
      title: "The Book of Musa",
      line: "Allah gave Musa the Book, a guide for the Children of Israel.",
      facts: ["The Tawrah was given to Musa", "The Prophet ﷺ met Musa on the Isra"],
      quote: q32(23),
      source: ik(23, "Allah gave Musa the Tawrah. Qatadah said the meeting refers to the Night of Isra, when the Prophet ﷺ saw Musa.", "he saw Musa and met with him on the Night of Isra"),
      difficulty: 4,
      questions: [
        { q: "What did Allah give Musa, in 32:23?", a: "The Scripture", wrong: ["A ship", "A kingdom", "A garden"], why: "And indeed We gave Musa the Scripture." },
        { q: "Which Book was it, per Ibn Kathir?", a: "The Tawrah", wrong: ["The Injil", "The Zabur", "The Quran"], why: "He gave the Book, the Tawrah, to His servant and Messenger Musa." },
        { q: "When was the meeting, per Qatadah?", a: "The Night of Isra", wrong: ["The day of Badr", "In Makkah at noon", "In a dream at Uhud"], why: "This refers to the Night of Isra." }
      ]
    },
    {
      slug: "leaders-through-patience",
      title: "Leaders through patience",
      line: "Patient believers became leaders, guiding by His command.",
      facts: ["Patience makes leaders", "Certainty in Allah's signs"],
      quote: q32(24),
      source: ik(24, "Sufyan said a man cannot be an example to follow unless he turns away from the temptations of this world.", "A man cannot be an example to be followed unless he shuns the temptation of this world"),
      difficulty: 5,
      questions: [
        { q: "Why were they made leaders, in 32:24?", a: "They were patient and certain", wrong: ["They were rich", "They were loud", "They were many"], why: "When they were patient and used to believe with certainty in Our Ayat." },
        { q: "What did they patiently shun, per Qatadah and Sufyan?", a: "Worldly temptations", wrong: ["Prayer", "Knowledge", "Family"], why: "When they patiently shunned the temptations of this world." },
        { q: "How did leaders guide, in 32:24?", a: "Under Allah's command", wrong: ["By their wishes", "By force only", "By magic"], why: "Leaders, giving guidance under Our command." }
      ]
    },
    {
      slug: "allah-will-judge",
      title: "Allah will judge",
      line: "On the Day, your Lord will judge what they differed over.",
      facts: ["Beliefs and deeds are judged", "Leave final verdicts to Allah"],
      quote: q32(25),
      source: ik(25, "Allah will judge between them on the Day of Resurrection about what they differed over, in beliefs and actions.", "with regard to beliefs and actions"),
      difficulty: 4,
      questions: [
        { q: "When will Allah judge, in 32:25?", a: "On the Day of Resurrection", wrong: ["Tomorrow", "Never", "Each night"], why: "Verily, your Lord will judge between them on the Day of Resurrection." },
        { q: "About what will He judge, per Ibn Kathir?", a: "Beliefs and actions", wrong: ["Clothes and food", "Names", "Weather"], why: "Meaning, with regard to beliefs and actions." },
        { tf: true, q: "In 32:25 Allah judges what they differed over.", why: "Concerning that wherein they used to differ." }
      ]
    },
    {
      slug: "walking-past-ruins",
      title: "Walking past ruins",
      line: "They walk where past nations lived. Will they not listen?",
      facts: ["Past nations are gone", "History holds lessons"],
      quote: q32(26),
      source: ik(26, "People walk through the homes of nations that rejected the Messengers and are gone. In that are signs and lessons.", "there are many signs, proofs and important lessons"),
      difficulty: 4,
      questions: [
        { q: "Where do they walk, in 32:26?", a: "In the old dwellings", wrong: ["On the sea", "In the sky", "Underground"], why: "In whose dwellings they do walk about." },
        { q: "What is in it, per Ibn Kathir?", a: "Signs and lessons", wrong: ["Gold", "Nothing", "Games"], why: "There are many signs, proofs and important lessons." },
        { q: "What should they do, in 32:26?", a: "Listen", wrong: ["Build", "Sleep", "Sell"], why: "Would they not then listen?" }
      ]
    },
    {
      slug: "water-to-dry-land",
      title: "Water to dry land",
      line: "Allah drives water to dry land, and crops grow for all.",
      facts: ["Rain and rivers are mercy", "Dead land shows the resurrection"],
      quote: q32(27),
      source: ik(27, "Allah sends water from the sky or by rivers down from the mountains to lands that need it at set times.", "water carried by rivers down from the mountains to the lands that need it"),
      difficulty: 4,
      questions: [
        { q: "Where does Allah drive water, in 32:27?", a: "To dry land", wrong: ["To the sky", "To the sea only", "Nowhere"], why: "Have they not seen how We drive water to the dry land." },
        { q: "Who eats the crops, in 32:27?", a: "Their cattle and themselves", wrong: ["Only birds", "Only kings", "No one"], why: "Crops providing food for their cattle and themselves." },
        { q: "What does dry land mean, per Ibn Kathir?", a: "Land where nothing grows", wrong: ["Wet land", "City land", "Sea land"], why: "Which means the land where nothing grows." }
      ]
    },
    {
      slug: "when-is-the-judgement",
      title: "When is the judgement?",
      line: "They mocked: when will this judgement come, if you are truthful?",
      facts: ["Mockers rushed the warning", "Fath here means judgement"],
      quote: q32(28),
      source: ik(28, "The disbelievers asked when the Prophet ﷺ would prevail, thinking it would never happen. Al-Fath here means Judgement.", "What is meant by Al-Fath here is Judgement"),
      difficulty: 4,
      questions: [
        { q: "What did they ask about, in 32:28?", a: "When the Fath will be", wrong: ["When rain falls", "When to travel", "When to eat"], why: "When will this Fath be, if you are telling the truth?" },
        { q: "What does Al-Fath mean, per Ibn Kathir?", a: "Judgement", wrong: ["The conquest of Makkah", "A key", "A gate"], why: "What is meant by Al-Fath here is Judgement." },
        { tf: true, q: "Ibn Kathir says they thought it would never happen.", why: "Because they thought this punishment would never happen." }
      ]
    },
    {
      slug: "faith-too-late",
      title: "Faith too late",
      line: "On the Day of Judgement, late faith will not help deniers.",
      facts: ["Believe now", "No respite then"],
      quote: q32(29),
      source: ik(29, "Ibn Kathir says Fath is not the conquest of Makkah, since nearly two thousand people became Muslim that day and were accepted.", "accepted the Islam of the freed Makkan prisoners-of-war, who numbered nearly two thousand"),
      difficulty: 5,
      questions: [
        { q: "What will not help deniers that Day, in 32:29?", a: "Believing then", wrong: ["Their silence", "Their sleep", "Their walking"], why: "No profit will it be to those who disbelieve if they (then) believe!" },
        { q: "Why is it not Makkah's conquest, per Ibn Kathir?", a: "Islam was accepted that day", wrong: ["Makkah was never won", "No one was there", "It rained"], why: "The Messenger of Allah accepted the Islam of the freed Makkan prisoners-of-war." },
        { q: "How many accepted Islam that day, per Ibn Kathir?", a: "Nearly two thousand", wrong: ["Ten", "Fifty", "One million"], why: "Who numbered nearly two thousand." }
      ]
    },
    {
      slug: "turn-aside-and-wait",
      title: "Turn aside and wait",
      line: "Turn from them and wait; they too are waiting.",
      facts: ["Keep conveying the message", "Allah never breaks His promise"],
      quote: q32(30),
      source: ik(30, "Allah told the Prophet ﷺ to turn from the idolators, keep conveying the revelation, and wait for His promised victory.", "for He never breaks His promise"),
      difficulty: 4,
      questions: [
        { q: "What should he do with them, in 32:30?", a: "Turn aside and wait", wrong: ["Fight at once", "Beg them", "Copy them"], why: "So turn aside from them and await." },
        { q: "What should he keep doing, per Ibn Kathir?", a: "Conveying the revelation", wrong: ["Hiding", "Trading", "Resting"], why: "Turn away from these idolators, and convey that which has been revealed to you from your Lord." },
        { q: "Does Allah break His promise, per Ibn Kathir?", a: "Never", wrong: ["Sometimes", "Often", "Only once"], why: "For He never breaks His promise." }
      ]
    }
  ]
};

export const SAJDAH_UNITS: readonly DeepUnit[] = [SAJDAH_ONE, SAJDAH_TWO];
