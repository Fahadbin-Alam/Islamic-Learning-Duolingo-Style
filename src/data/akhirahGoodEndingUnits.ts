import { hadith, type DeepUnit } from "./deepKit";

// One more Akhirah unit: a good ending, from Sunan Ibn Majah, Jami at-Tirmidhi and Sunan Abi Dawud. Helping the dying
// say La ilaha illallah, the rank of martyrs for one who asks for it sincerely, deeds that keep growing for one on the
// frontier, tears that keep a man from the Fire, his ﷺ intercession for those with major sins, and a martyr's
// intercession for seventy of his family. Every card is one sahih hadith with its number, narrator and grade, and its
// exact English words to highlight. None of these hadith is taught anywhere else in the app.

const GOOD_ENDING: DeepUnit = {
  key: "akhirah-a-good-ending",
  topicId: "akhirah",
  branchId: "akhirah-a-good-ending",
  branch: { title: "A good ending", description: "La ilaha illallah for the dying, asking sincerely, deeds that keep growing, tears of fear, his ﷺ intercession, and a martyr's seventy." },
  name: "a good ending",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "help-the-dying-say-it",
      title: "Help the dying say it",
      line: "Urge your dying ones to say La ilaha illallah, he ﷺ said.",
      facts: ["Told by Abu Hurairah", "None has the right to be worshipped but Allah", "From Ibn Majah's chapters on funerals"],
      source: hadith("ibnmajah", "1444", "Abu Hurairah", "Sahih (Darussalam)", "Abu Hurairah said: the Messenger of Allah ﷺ said: urge your dying ones to say La ilaha illallah.", "Urge your dying ones to say La ilaha illallah"),
      difficulty: 1,
      questions: [
        { q: "What should we urge the dying to say?", a: "La ilaha illallah", wrong: ["Goodbye to everyone", "Their last wishes", "Their own names"], why: "Urge your dying ones to say La ilaha illallah, he ﷺ said." },
        { q: "Whom did he ﷺ tell us to urge to say it?", a: "Those who are dying", wrong: ["Only the children", "Only the travelers", "Only the scholars"], why: "Urge your dying ones to say La ilaha illallah, the Messenger of Allah ﷺ said." },
        { q: "We help a dying Muslim by reminding him of La ilaha illallah.", tf: true, why: "Urge your dying ones to say La ilaha illallah, he ﷺ told us." }
      ]
    },
    {
      slug: "asking-from-the-heart",
      title: "Asking from the heart",
      line: "Whoever sincerely asks for martyrdom is given its status.",
      facts: ["Told by Sahl ibn Hunaif", "Asked for sincerely, in his heart", "Even if he dies in his bed"],
      source: hadith("tirmidhi", "1653", "Sahl ibn Hunaif", "Sahih (Darussalam)", "Sahl ibn Hunaif said: the Prophet ﷺ said: whoever asks Allah for martyrdom sincerely in his heart, Allah will grant him the status of martyrdom, even if he dies in his bed.", "Allah will grant the status of martyrdom for him, even if he were to die in his bed"),
      difficulty: 2,
      questions: [
        { q: "Where might he die and still get the martyr's status?", a: "In his own bed", wrong: ["Only on a battlefield", "Only in Makkah", "Only on Hajj"], why: "Even if he were to die in his bed, he ﷺ said of one who asks sincerely." },
        { q: "How must he ask Allah for martyrdom?", a: "Sincerely, in his heart", wrong: ["Loudly, before people", "Once a year only", "Through someone else"], why: "Whoever asks Allah for martyrdom sincerely in his heart, he ﷺ said." },
        { q: "A sincere wish for martyrdom can reach its status in bed.", tf: true, why: "Allah will grant the status of martyrdom for him, even if he were to die in his bed." }
      ]
    },
    {
      slug: "deeds-that-keep-growing",
      title: "Deeds that keep growing",
      line: "Deeds stop at death, but the frontier guard's keep growing.",
      facts: ["Told by Fadalah ibn Ubayd", "On the frontier in Allah's path", "He is safe from the trial in the grave"],
      source: hadith("abudawud", "2500", "Fadalah ibn Ubayd", "Sahih (Al-Albani)", "Fadalah ibn Ubayd said: the Prophet ﷺ said: everyone who dies has his deeds completed, except one on the frontier in Allah's path; his deeds keep increasing until the Day of Resurrection, and he is safe from the trial in the grave.", "his deeds will be made to go on increasing till the Day of Resurrection"),
      difficulty: 2,
      questions: [
        { q: "Whose deeds keep growing after death, he ﷺ said?", a: "One guarding the frontier", wrong: ["One who is very rich", "One with a big house", "One who lived longest"], why: "Except one who is on the frontier, for his deeds will be made to go on increasing." },
        { q: "Till when do his deeds keep growing?", a: "Till the Day of Resurrection", wrong: ["Till the next Ramadan", "For forty days", "Till his son grows up"], why: "His deeds will be made to go on increasing till the Day of Resurrection, he ﷺ said." },
        { q: "The frontier guard is kept safe from the trial in the grave.", tf: true, why: "And he will be safe from the trial in the grave, he ﷺ said of one on the frontier." }
      ]
    },
    {
      slug: "tears-of-fear",
      title: "Tears of fear",
      line: "One who weeps from fear of Allah will not enter the Fire.",
      facts: ["Told by Abu Hurairah", "Milk never goes back into the udder", "Dust in Allah's cause and Hell's smoke never meet"],
      source: hadith("tirmidhi", "1633", "Abu Hurairah", "Sahih (Darussalam)", "Abu Hurairah said: the Messenger of Allah ﷺ said: a man who wept out of the fear of Allah shall not enter the Fire until the milk returns to the udder; and dust in the cause of Allah and the smoke of Hell shall never come together.", "A man who wept out of the fear of Allah shall not enter the Fire until the milk returns to the udder"),
      difficulty: 2,
      questions: [
        { q: "Which man will not enter the Fire, he ﷺ said?", a: "One who wept from fear of Allah", wrong: ["One who never smiled", "One who slept little", "One who ate little"], why: "A man who wept out of the fear of Allah shall not enter the Fire, he ﷺ said." },
        { q: "He ﷺ said he won't enter the Fire till what returns to the udder?", a: "The milk", wrong: ["The water", "The honey", "The rain"], why: "Shall not enter the Fire until the milk returns to the udder, he ﷺ said." },
        { q: "Dust in Allah's cause and the smoke of Hell never come together.", tf: true, why: "Dust in the cause of Allah and the smoke of Hell shall not come together, he ﷺ said." }
      ]
    },
    {
      slug: "his-intercession",
      title: "His intercession ﷺ",
      line: "His intercession ﷺ is for those of his Ummah with major sins.",
      facts: ["Told by Anas ibn Malik", "Intercession: asking Allah to forgive others", "For those of his own Ummah"],
      source: hadith("abudawud", "4739", "Anas ibn Malik", "Sahih (Al-Albani)", "Anas ibn Malik said: the Prophet ﷺ said: my intercession will be for those of my people who have committed major sins.", "My intercession will be for those of my people who have committed major sins"),
      difficulty: 2,
      questions: [
        { q: "For whom will his ﷺ intercession be, he said?", a: "His people with major sins", wrong: ["Only those with no sins", "Only the angels", "Only his family"], why: "My intercession will be for those of my people who have committed major sins." },
        { q: "Which sins did he ﷺ name?", a: "Major sins", wrong: ["Only small slips", "Only old sins", "Only sins of others"], why: "Those of my people who have committed major sins, he ﷺ said of his intercession." },
        { q: "His ﷺ intercession gives hope to those with major sins.", tf: true, why: "My intercession will be for those of my people who have committed major sins." }
      ]
    },
    {
      slug: "a-martyrs-seventy",
      title: "A martyr's seventy",
      line: "A martyr's intercession is accepted for seventy of his family.",
      facts: ["Told by Abu ad-Darda", "Seventy members of his own family", "In Abu Dawud's book of jihad"],
      source: hadith("abudawud", "2522", "Abu ad-Darda", "Sahih (Al-Albani)", "Abu ad-Darda said: the Prophet ﷺ said: the intercession of a martyr will be accepted for seventy members of his family.", "The intercession of a martyr will be accepted for seventy members of his family"),
      difficulty: 2,
      questions: [
        { q: "For how many of his family is a martyr's intercession accepted?", a: "Seventy of them", wrong: ["Two of them", "Ten of them", "One of them"], why: "The intercession of a martyr will be accepted for seventy members of his family." },
        { q: "Whose intercession is accepted for seventy of his family?", a: "A martyr's", wrong: ["A king's", "A rich man's", "A poet's"], why: "A martyr's intercession will be accepted for seventy members of his family, he ﷺ said." },
        { q: "A martyr can intercede for members of his family.", tf: true, why: "The intercession of a martyr will be accepted for seventy members of his family." }
      ]
    }
  ]
};

export const AKHIRAH_GOOD_ENDING_UNITS: readonly DeepUnit[] = [GOOD_ENDING];
