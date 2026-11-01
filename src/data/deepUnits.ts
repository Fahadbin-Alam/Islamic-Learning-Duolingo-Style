import type { Challenge, DifficultyTier, LearningCourse, LearningNode, Lesson, LessonSource } from "../types";
import { hadith, quran, type DeepUnit, type Question } from "./deepKit";
import { EID_SECTION, LIFE_UNITS } from "./lifeUnits";
import { WOMEN_UNITS } from "./womenUnits";
import { AKHIRAH_SECTION, AKHIRAH_UNITS } from "./akhirahUnits";
import { SAHABA_UNITS } from "./sahabaUnits";
export type { DeepUnit } from "./deepKit";
import { QURAN_AYAHS } from "./quranAyahs";
import { SCHOLAR_UNITS, SCHOLARS_SECTION } from "./scholarUnits";

// Deep units: a person's life or a surah's tafsir taught in many small steps, each harder than the one before.
// They come after the short starter circles of their unit, so a beginner still starts simple. Every lesson
// teaches one card (a line, up to three chips, maybe a quote) and asks only what that card shows, with four
// choices. Every fact is from one checked Sunni source: a hadith on sunnah.com (number and grade as sunnah.com
// gives them), the Quran, or Tafsir Ibn Kathir on quran.com. Anything the scholars differ on is left out.

const SURAH_NAMES: Record<number, string> = { 1: "Al-Fatihah", 67: "Al-Mulk", 103: "Al-'Asr", 112: "Al-Ikhlas", 113: "Al-Falaq", 114: "An-Nas" };

function ibnKathir(ayah: number, summary: string, surah = 1): LessonSource {
  return {
    id: `deep_ibn_kathir_${surah}_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on ${SURAH_NAMES[surah]} ${surah}:${ayah}`,
    url: `https://quran.com/${surah}:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir ${surah}:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary
  };
}

const ayah = (number: number, surah = 1) => ({ text: QURAN_AYAHS[`${surah}:${number}`], reference: `Quran ${surah}:${number}` });

const ABU_BAKR: DeepUnit = {
  key: "abubakr",
  topicId: "sahabah",
  branchId: "sahabi-abu-bakr",
  name: "Abu Bakr",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "family-lines",
      title: "Expert in family lines",
      line: "Abu Bakr knew the family lines of Quraysh best of all.",
      facts: ["The poet Hassan learned from him", "Same tribe as the Prophet ﷺ"],
      source: hadith("muslim", "2490", "Aishah", "Sahih", "The Prophet ﷺ sent Hassan ibn Thabit to Abu Bakr, who knew the lineage of Quraysh best."),
      difficulty: 2,
      questions: [
        { q: "What did Abu Bakr know better than anyone in Quraysh?", a: "Their family lines", wrong: ["The stars for travel", "Medicine and herbs", "The roads to Sham"], why: "The Prophet ﷺ said Abu Bakr knew the lineage of Quraysh best." },
        { q: "Which poet did the Prophet ﷺ send to learn from Abu Bakr?", a: "Hassan ibn Thabit", wrong: ["Ka'b ibn Zuhayr", "Labid ibn Rabi'ah", "Imru al-Qays"], why: "Hassan answered Quraysh in poems, so he had to know their family lines well." },
        { q: "Abu Bakr and the Prophet ﷺ were from the same tribe.", tf: true, why: "Both were from Quraysh." },
        { q: "Which tribe's family lines did Abu Bakr know best?", a: "Quraysh", wrong: ["The Ansar", "Thaqif", "Banu Tamim"], why: "Quraysh was the tribe of Makkah, his own and the Prophet's ﷺ." }
      ]
    },
    {
      slug: "good-before-islam",
      title: "Known for good",
      line: "A chief said Abu Bakr helped the poor and welcomed guests.",
      facts: ["Chief: Ibn ad-Dughunnah", "Kept ties with family", "Helped people in hardship"],
      source: hadith("bukhari", "3905", "Aishah", "Sahih", "Ibn ad-Dughunnah praised Abu Bakr: he helps the poor, keeps family ties, welcomes guests and helps people in hardship."),
      difficulty: 2,
      questions: [
        { q: "Which chief praised Abu Bakr's good deeds?", a: "Ibn ad-Dughunnah", wrong: ["Abu Jahl", "Abu Sufyan", "Utbah ibn Rabi'ah"], why: "He was the chief of the tribe of Qarah." },
        { q: "Which of these did the chief NOT say about Abu Bakr?", a: "He was the richest man in Makkah", wrong: ["He helped the poor", "He welcomed guests", "He kept ties with family"], why: "He praised his kindness, not his wealth." },
        { q: "The chief said Abu Bakr helped people in ____.", a: "hardship", wrong: ["trade", "battle", "games"], why: "He helped those hit by hard times." },
        { q: "Ibn ad-Dughunnah said a man like Abu Bakr should be driven out.", tf: false, why: "He said a man like Abu Bakr should never be driven out." }
      ]
    },
    {
      slug: "he-speaks-truth",
      title: "He speaks the truth",
      line: "Abu Bakr believed the Prophet ﷺ when others called him a liar.",
      facts: ["Abu Bakr said: he speaks the truth", "Gave himself and his wealth", "Leave my companion alone!"],
      source: hadith("bukhari", "3661", "Abu ad-Darda", "Sahih", "The Prophet ﷺ said: you called me a liar, but Abu Bakr said he speaks the truth, and helped me with himself and his wealth."),
      difficulty: 3,
      questions: [
        { q: "What did Abu Bakr say when others called the Prophet ﷺ a liar?", a: "He speaks the truth", wrong: ["Let us wait and see", "Ask the priests first", "Show me a sign"], why: "That is why he is called As-Siddiq, the one who always believed." },
        { q: "The Prophet ﷺ said Abu Bakr helped him with himself and his ____.", a: "wealth", wrong: ["sword", "poems", "tribe"], why: "He gave his money for Islam from the start." },
        { q: "After a quarrel with Umar, what did the Prophet ﷺ say about Abu Bakr?", a: "Leave my companion alone", wrong: ["Abu Bakr was wrong", "Umar must say sorry first", "Do not talk to each other"], why: "After that nobody hurt Abu Bakr. Umar and Abu Bakr made up." },
        { q: "Abu Bakr kept his wealth for himself and gave only words.", tf: false, why: "The Prophet ﷺ said Abu Bakr helped him with himself and his wealth." }
      ]
    },
    {
      slug: "first-believers",
      title: "The first believers",
      line: "At first, only five slaves, two women and Abu Bakr believed.",
      facts: ["Told by Ammar ibn Yasir", "Very few Muslims at the start"],
      source: hadith("bukhari", "3660", "Ammar ibn Yasir", "Sahih", "Ammar saw the Prophet ﷺ when only five slaves, two women and Abu Bakr were with him."),
      difficulty: 3,
      questions: [
        { q: "Ammar named who was with the Prophet ﷺ at first. Which man did he name?", a: "Abu Bakr", wrong: ["Umar ibn al-Khattab", "Khalid ibn al-Walid", "Abu Sufyan"], why: "Abu Bakr was with the Prophet ﷺ from the very start." },
        { q: "How many slaves did Ammar count among the first Muslims?", a: "Five", wrong: ["Two", "Ten", "Forty"], why: "Five slaves, two women and Abu Bakr." },
        { q: "How many women did Ammar count?", a: "Two", wrong: ["Five", "One", "Seven"], why: "Five slaves, two women and Abu Bakr." },
        { q: "Which companion reported how few Muslims there were at first?", a: "Ammar ibn Yasir", wrong: ["Abu Hurayrah", "Anas ibn Malik", "Ibn Abbas"], why: "Ammar was one of the very first Muslims himself." }
      ]
    },
    {
      slug: "freed-bilal",
      title: "Our master Bilal",
      line: "Umar said Abu Bakr was our master and freed our master Bilal.",
      facts: ["Said by Umar", "Abu Bakr: our master", "Bilal: our master too"],
      source: hadith("bukhari", "3754", "Jabir bin Abdullah", "Sahih", "Umar used to say: Abu Bakr is our master, and he freed our master, meaning Bilal."),
      difficulty: 3,
      questions: [
        { q: "Umar said Abu Bakr freed 'our master'. Who did he mean?", a: "Bilal", wrong: ["Ammar", "Suhayb", "Zayd ibn Harithah"], why: "Bilal had been a slave, and Umar honored him as a master." },
        { q: "What did Umar call Abu Bakr?", a: "Our master", wrong: ["Our judge", "Our poet", "Our guest"], why: "Umar used to say: Abu Bakr is our master." },
        { q: "Who praised Abu Bakr for freeing Bilal?", a: "Umar", wrong: ["Ali", "Uthman", "Talhah"], why: "Jabir heard Umar say it." },
        { q: "Umar looked down on Bilal because he had been a slave.", tf: false, why: "Umar called Bilal 'our master'." }
      ]
    },
    {
      slug: "defending",
      title: "Standing up for him",
      line: "Abu Bakr pulled Uqbah away as he choked the Prophet ﷺ.",
      facts: ["It happened while he prayed", "Abu Bakr quoted Quran 40:28", "Told by Abdullah ibn Amr"],
      source: hadith("bukhari", "3678", "Abdullah ibn Amr", "Sahih", "Uqbah ibn Abi Mu'ayt choked the Prophet ﷺ while he prayed; Abu Bakr pushed him away and recited: will you kill a man because he says my Lord is Allah?"),
      difficulty: 3,
      questions: [
        { q: "Who choked the Prophet ﷺ with a cloth?", a: "Uqbah ibn Abi Mu'ayt", wrong: ["Abu Lahab", "Umayyah ibn Khalaf", "Al-Walid ibn al-Mughirah"], why: "Abdullah ibn Amr called it the worst thing he saw the pagans do." },
        { q: "What was the Prophet ﷺ doing when Uqbah attacked?", a: "Praying", wrong: ["Sleeping", "Trading", "Eating"], why: "Uqbah came at him while he was praying." },
        { q: "Abu Bakr said: will you kill a man because he says...", a: "My Lord is Allah", wrong: ["I am a king", "I am rich", "Leave Makkah"], why: "These are the words of a believer in Quran 40:28." },
        { q: "Who saw this and told the story?", a: "Abdullah ibn Amr", wrong: ["Abu Hurayrah", "Aishah", "Anas ibn Malik"], why: "Urwah asked him what the worst thing was that he saw." }
      ]
    },
    {
      slug: "masjid-at-home",
      title: "A masjid by his house",
      line: "Abu Bakr built a little masjid by his house and wept reciting.",
      facts: ["Set out for Abyssinia first", "Chief brought him back", "Crowds watched him weep"],
      source: hadith("bukhari", "3905", "Aishah", "Sahih", "Abu Bakr set out for Abyssinia, came back under Ibn ad-Dughunnah's protection, and built a masjid in front of his house where he wept reciting."),
      difficulty: 3,
      questions: [
        { q: "Where was Abu Bakr going when he first set out to leave Makkah?", a: "Abyssinia", wrong: ["Madinah", "Yemen", "Taif"], why: "Many Muslims went to Abyssinia when Quraysh hurt them." },
        { q: "What did Abu Bakr build in front of his house?", a: "A little masjid", wrong: ["A market stall", "A well", "A guest tent"], why: "He prayed and recited the Quran there." },
        { q: "What happened when Abu Bakr recited the Quran?", a: "He wept", wrong: ["He sang loudly", "He fell asleep", "He laughed"], why: "Aishah said he could not stop weeping when he recited." },
        { q: "Why were the leaders of Quraysh worried?", a: "Crowds gathered to watch him", wrong: ["He stopped trading", "He was too loud at night", "He left the city"], why: "They feared their women and children would be moved by it." }
      ]
    },
    {
      slug: "allahs-protection",
      title: "Allah's protection",
      line: "Abu Bakr gave back the chief's protection: Allah's was enough.",
      facts: ["Quraysh said: pray only indoors", "He refused to hide"],
      source: hadith("bukhari", "3905", "Aishah", "Sahih", "Abu Bakr told Ibn ad-Dughunnah: I release you from your protection, and I am pleased with the protection of Allah."),
      difficulty: 3,
      questions: [
        { q: "What did Quraysh want from Abu Bakr?", a: "Pray only inside his house", wrong: ["Leave Makkah at once", "Stop trading", "Pay a big fine"], why: "They did not want people to hear him recite." },
        { q: "What did Abu Bakr do with Ibn ad-Dughunnah's protection?", a: "He gave it back", wrong: ["He paid for more", "He shared it with Bilal", "He kept it secretly"], why: "He would not hide his worship to keep it." },
        { q: "Whose protection was Abu Bakr pleased with instead?", a: "Allah's", wrong: ["His tribe's", "The king of Abyssinia's", "Abu Talib's"], why: "He said: I am pleased with the protection of Allah." },
        { q: "Abu Bakr stopped reciting aloud so he could keep the chief's protection.", tf: false, why: "He gave the protection back so he could keep reciting." }
      ]
    },
    {
      slug: "waiting-for-hijrah",
      title: "Waiting for the Hijrah",
      line: "Abu Bakr fed two camels four months, waiting for the Hijrah.",
      facts: ["The Prophet ﷺ said: wait", "He came at noon with the news", "He paid for his camel"],
      source: hadith("bukhari", "3905", "Aishah", "Sahih", "The Prophet ﷺ asked Abu Bakr to wait so they could make Hijrah together; Abu Bakr fed two camels for four months."),
      difficulty: 3,
      questions: [
        { q: "Why did Abu Bakr not go to Madinah with the others?", a: "The Prophet ﷺ asked him to wait", wrong: ["He was ill", "Quraysh locked him up", "He had no camel"], why: "He hoped to make Hijrah with the Prophet ﷺ." },
        { q: "How long did Abu Bakr feed the two camels?", a: "Four months", wrong: ["Four days", "One year", "Ten months"], why: "He kept them ready for the journey." },
        { q: "Abu Bakr offered a camel. What did the Prophet ﷺ say?", a: "Only if I pay for it", wrong: ["No, I will walk", "Give it to Ali", "Yes, as a gift"], why: "He said: I will take it with its price." },
        { q: "When did the Prophet ﷺ come to say it was time?", a: "At noon", wrong: ["At dawn", "At night", "After Asr"], why: "Abu Bakr knew it was big news, as he never came at that hour." }
      ]
    },
    {
      slug: "cave-of-thawr",
      title: "Two belts and a cave",
      line: "Asma tied their food bag with her belt; they hid in Thawr.",
      facts: ["Asma: Dhat an-Nitaqayn", "Cave of Thawr: three nights"],
      source: hadith("bukhari", "3905", "Aishah", "Sahih", "Asma cut her waist belt to tie the food bag and was named Dhat an-Nitaqayn; they stayed three nights in the cave of Thawr."),
      difficulty: 3,
      questions: [
        { q: "What did Asma use to tie the food bag?", a: "Part of her waist belt", wrong: ["Her headscarf", "A palm rope", "A camel rein"], why: "She cut a piece off her belt in the rush." },
        { q: "What name did Asma earn for this?", a: "Dhat an-Nitaqayn", wrong: ["Umm al-Mu'minin", "As-Siddiqah", "Umm al-Khayr"], why: "It means: the one with two belts." },
        { q: "In which cave did they hide?", a: "Thawr", wrong: ["Hira", "Uhud", "Arafat"], why: "Hira is where the first revelation came; Thawr is the Hijrah cave." },
        { q: "How many nights did they stay in the cave?", a: "Three", wrong: ["One", "Seven", "Ten"], why: "Then their guide brought the camels." }
      ]
    },
    {
      slug: "hijrah-helpers",
      title: "His family helps",
      line: "Abu Bakr's son brought news; his freed slave brought milk.",
      facts: ["Son: Abdullah ibn Abi Bakr", "Shepherd: Amir ibn Fuhayrah", "Guide: not Muslim, but trusted"],
      source: hadith("bukhari", "3905", "Aishah", "Sahih", "Abdullah ibn Abi Bakr brought news at night; Amir ibn Fuhayrah grazed sheep by the cave; they hired a trusted guide from Banu ad-Dil."),
      difficulty: 4,
      questions: [
        { q: "Who brought them news from Quraysh each night?", a: "Abdullah ibn Abi Bakr", wrong: ["Abd ar-Rahman ibn Abi Bakr", "Ali ibn Abi Talib", "Zayd ibn Harithah"], why: "He slept by the cave and was back in Makkah by morning." },
        { q: "Who brought sheep to the cave for milk?", a: "Amir ibn Fuhayrah", wrong: ["Bilal ibn Rabah", "Suhayb ar-Rumi", "Salman al-Farisi"], why: "He grazed Abu Bakr's sheep there after dark." },
        { q: "What was Amir ibn Fuhayrah to Abu Bakr?", a: "His freed slave", wrong: ["His brother", "His uncle", "His son-in-law"], why: "Abu Bakr had freed him." },
        { q: "The guide they hired was a Muslim.", tf: false, why: "He was still on the religion of Quraysh, but they trusted him." }
      ]
    },
    {
      slug: "do-not-grieve",
      title: "Do not grieve",
      line: "In the cave, Abu Bakr feared the enemy would see them.",
      facts: ["Quran 9:40: do not grieve", "Allah is with us"],
      quote: { text: "What do you think of two, the third of whom is Allah?", reference: "Sahih al-Bukhari 3653" },
      source: hadith("bukhari", "3653", "Abu Bakr", "Sahih", "In the cave Abu Bakr said: if one of them looked down, he would see us. The Prophet ﷺ said: what do you think of two, the third of whom is Allah?"),
      difficulty: 3,
      questions: [
        { q: "What did Abu Bakr fear in the cave?", a: "The enemy would see them", wrong: ["Snakes in the cave", "Running out of water", "Getting lost"], why: "The men chasing them stood right above the cave." },
        { q: "What did the Prophet ﷺ say to calm him?", a: "Two, and Allah is the third", wrong: ["I brought a sword", "Let us run", "No one knows we are here"], why: "He trusted that Allah was with them." },
        { q: "Which surah tells of the two in the cave?", a: "At-Tawbah", wrong: ["Al-Kahf", "Al-Anfal", "Ya-Sin"], why: "Quran 9:40 is in Surah At-Tawbah. Al-Kahf tells of other young men in a cave." },
        { q: "In Quran 9:40 the Prophet ﷺ tells his companion: do not ____.", a: "grieve", wrong: ["speak", "sleep", "move"], why: "Do not grieve, Allah is with us." }
      ]
    },
    {
      slug: "suraqah",
      title: "The rider who chased them",
      line: "Suraqah chased them for a reward, but his horse sank.",
      facts: ["Reward: blood money for each", "Abu Bakr: he shows me the way"],
      source: hadith("bukhari", "3911", "Anas ibn Malik", "Sahih", "On the way to Madinah, people asked Abu Bakr who the Prophet ﷺ was; he said: this man shows me the way. Suraqah chased them, and his horse threw him."),
      difficulty: 4,
      questions: [
        { q: "Why did Suraqah chase them?", a: "For the reward Quraysh offered", wrong: ["To join them", "To bring them food", "He was lost"], why: "Quraysh offered the blood money of a man for each of them." },
        { q: "What happened to Suraqah's horse?", a: "It sank and threw him", wrong: ["It ran away", "It overtook their camels", "It was stolen"], why: "In the morning he was an enemy, by evening he guarded them." },
        { q: "People asked Abu Bakr who the Prophet ﷺ was. What did he say?", a: "This man shows me the way", wrong: ["He is my servant", "He is a trader", "I do not know him"], why: "He told the truth without giving the Prophet ﷺ away." },
        { q: "What way did Abu Bakr really mean?", a: "The way of goodness", wrong: ["The road only", "The way to the market", "The way back home"], why: "People thought he meant the road, but he meant the path of good." }
      ]
    },
    {
      slug: "all-his-wealth",
      title: "Everything for Allah",
      line: "Umar brought half his wealth; Abu Bakr brought everything.",
      facts: ["Left for family: Allah and His Messenger ﷺ", "Umar: I will never beat him"],
      source: hadith("tirmidhi", "3675", "Umar ibn al-Khattab", "Hasan (Darussalam)", "Umar brought half his wealth; Abu Bakr brought all of it and said he left Allah and His Messenger ﷺ for his family."),
      difficulty: 4,
      questions: [
        { q: "How much of his wealth did Umar bring that day?", a: "Half", wrong: ["A third", "All of it", "A tenth"], why: "Umar hoped to beat Abu Bakr that day." },
        { q: "What did Abu Bakr say he left for his family?", a: "Allah and His Messenger ﷺ", wrong: ["A house and a farm", "Half his wealth", "A year of food"], why: "He trusted Allah to look after them." },
        { q: "What did Umar say after seeing this?", a: "I will never beat him", wrong: ["Abu Bakr was unwise", "Next time I will win", "I gave more than him"], why: "Umar said he would never beat Abu Bakr at anything good." },
        { q: "Who told this story?", a: "Umar", wrong: ["Abu Bakr", "Uthman", "Bilal"], why: "Umar told it himself, praising Abu Bakr." }
      ]
    },
    {
      slug: "badr",
      title: "The day of Badr",
      line: "At Badr, Abu Bakr held the Prophet's ﷺ hand: that is enough.",
      facts: ["The Prophet ﷺ begged Allah", "Told by Ibn Abbas"],
      source: hadith("bukhari", "3953", "Ibn Abbas", "Sahih", "At Badr the Prophet ﷺ called on Allah for His promise; Abu Bakr took his hand and said: that is enough for you."),
      difficulty: 4,
      questions: [
        { q: "What was the Prophet ﷺ doing before the battle of Badr?", a: "Begging Allah for His promise", wrong: ["Sleeping in his tent", "Counting the army", "Writing letters"], why: "He asked Allah again and again for victory." },
        { q: "What did Abu Bakr say as he held his hand?", a: "That is enough", wrong: ["Let us go home", "Pray once more", "We will lose"], why: "He was sure Allah would keep His promise." },
        { q: "Abu Bakr was with the Prophet ﷺ at Badr.", tf: true, why: "He stayed by his side that day." },
        { q: "Who reported this moment at Badr?", a: "Ibn Abbas", wrong: ["Abu Hurayrah", "Aishah", "Jabir"], why: "Ibn Abbas narrated it." }
      ]
    },
    {
      slug: "hudaybiyah",
      title: "Firm at Hudaybiyah",
      line: "At Hudaybiyah, Abu Bakr told Umar: hold on to the Prophet ﷺ.",
      facts: ["He is Allah's Messenger ﷺ", "Allah will help him win", "Same answer as the Prophet ﷺ"],
      source: hadith("bukhari", "2731, 2732", "Al-Miswar bin Makhrama and Marwan", "Sahih", "At Hudaybiyah Umar asked why they should accept the terms; Abu Bakr said: he is Allah's Messenger ﷺ, he does not disobey his Lord, so hold on to him."),
      difficulty: 4,
      questions: [
        { q: "At Hudaybiyah, Umar was upset by the peace terms. What did Abu Bakr say?", a: "Hold on to the Prophet ﷺ", wrong: ["Go back to Madinah", "Fight them now", "Ask the Ansar"], why: "He said: he is on the truth, so hold on to him." },
        { q: "Abu Bakr said Allah would do what for the Prophet ﷺ?", a: "Help him win", wrong: ["Send rain", "Make him rich", "Bring him home"], why: "Abu Bakr was certain Allah would give him victory." },
        { q: "Abu Bakr's answer to Umar was the same as the Prophet's ﷺ.", tf: true, why: "Umar asked them both and got the same answer." },
        { q: "Why did Abu Bakr trust the peace deal?", a: "He is Allah's Messenger ﷺ", wrong: ["It made them rich", "Quraysh were kind", "He liked Makkah"], why: "He knew the Prophet ﷺ never disobeys his Lord." }
      ]
    },
    {
      slug: "forgiving-mistah",
      title: "He forgave",
      line: "Allah told Abu Bakr to forgive a relative, so he kept helping.",
      facts: ["Relative: Mistah", "Ayah: Quran 24:22", "I want Allah to forgive me"],
      source: hadith("bukhari", "4750", "Aishah", "Sahih", "Abu Bakr swore to stop helping Mistah; Allah revealed Quran 24:22, and Abu Bakr said: I want Allah to forgive me, and kept giving to him."),
      difficulty: 4,
      questions: [
        { q: "Which relative did Abu Bakr swear to stop helping?", a: "Mistah", wrong: ["Hassan", "Talhah", "Abu Quhafah"], why: "Mistah had spread hurtful words about Abu Bakr's family." },
        { q: "Which ayah told him to pardon and forgive?", a: "Quran 24:22", wrong: ["Quran 2:255", "Quran 9:40", "Quran 1:5"], why: "It asks: do you not love that Allah should forgive you?" },
        { q: "What did Abu Bakr say when the ayah came?", a: "I want Allah to forgive me", wrong: ["I will think about it", "Only if he says sorry", "Never again"], why: "So he forgave and kept helping Mistah." },
        { q: "Abu Bakr stopped helping Mistah forever.", tf: false, why: "He went back to helping him and said he would never stop." }
      ]
    },
    {
      slug: "four-good-deeds",
      title: "Four good deeds",
      line: "In one day, Abu Bakr fasted, fed the poor, visited the sick.",
      facts: ["He also joined a funeral", "All four: a promise of Jannah"],
      source: hadith("muslim", "1028a", "Abu Hurayrah", "Sahih", "The Prophet ﷺ asked who had fasted, followed a funeral, fed a poor person and visited the sick that day; Abu Bakr had done all four."),
      difficulty: 4,
      questions: [
        { q: "Which of these was NOT one of Abu Bakr's deeds that day?", a: "Building a masjid", wrong: ["Fasting", "Feeding the poor", "Visiting the sick"], why: "The four were fasting, a funeral, feeding the poor and visiting the sick." },
        { q: "What did the Prophet ﷺ say about whoever does all four?", a: "He will enter Jannah", wrong: ["He will be rich", "He will lead the prayer", "He will never be ill"], why: "Doing them all in one day is a sign of a person of Jannah." },
        { q: "How many good deeds had Abu Bakr done that day?", a: "Four", wrong: ["Two", "Three", "Ten"], why: "He said 'I did' to each one." },
        { q: "Besides fasting and helping others, what did Abu Bakr join that day?", a: "A funeral", wrong: ["A wedding", "A battle", "A market"], why: "Following a funeral is a big reward." }
      ]
    },
    {
      slug: "every-gate",
      title: "Every gate of Jannah",
      line: "The Prophet ﷺ hoped Abu Bakr is called from every gate.",
      facts: ["Gate of fasting: Ar-Rayyan", "Gates of prayer and charity too"],
      source: hadith("bukhari", "3666", "Abu Hurayrah", "Sahih", "Some will be called from every gate of Jannah; the Prophet ﷺ said: I hope you are one of them, Abu Bakr."),
      difficulty: 4,
      questions: [
        { q: "What is the gate of Jannah for people who fast called?", a: "Ar-Rayyan", wrong: ["Al-Firdaws", "Al-Kawthar", "As-Salam"], why: "Those who fast enter by Ar-Rayyan." },
        { q: "Abu Bakr asked if anyone is called from every gate. What was the answer?", a: "Yes, and I hope you are", wrong: ["No one at all", "Only the prophets", "Only the martyrs"], why: "The Prophet ﷺ said he hoped Abu Bakr would be one of them." },
        { q: "Who is called from the gate of prayer?", a: "Those known for prayer", wrong: ["Those who fast", "Those who give", "Everyone"], why: "Each gate is for people known for one good deed." },
        { q: "Which companion reported the hadith of the gates?", a: "Abu Hurayrah", wrong: ["Ibn Umar", "Anas ibn Malik", "Ammar"], why: "Abu Hurayrah narrated it." }
      ]
    },
    {
      slug: "not-from-pride",
      title: "Not out of pride",
      line: "Abu Bakr's robe slipped down, but the Prophet ﷺ said: not pride.",
      facts: ["Warning: dragging clothes in pride", "Abu Bakr worried about himself"],
      source: hadith("bukhari", "3665", "Abdullah ibn Umar", "Sahih", "Abu Bakr said one side of his robe slips down; the Prophet ﷺ said: you are not one who does it out of pride."),
      difficulty: 4,
      questions: [
        { q: "What warning made Abu Bakr worry about himself?", a: "Dragging clothes out of pride", wrong: ["Wearing white", "Walking fast", "Eating standing up"], why: "Allah will not look at one who drags his robe out of pride." },
        { q: "What happened to Abu Bakr's robe?", a: "One side slipped down", wrong: ["It was torn", "It was stolen", "It was too short"], why: "It slipped unless he took care." },
        { q: "What did the Prophet ﷺ tell him?", a: "You do not do it out of pride", wrong: ["Buy a new robe", "Stop wearing it", "Ask Umar"], why: "The sin is the pride, and Abu Bakr had none." },
        { q: "This shows Abu Bakr was careful about his own faults.", tf: true, why: "He worried even about a slipping robe." }
      ]
    },
    {
      slug: "khalil",
      title: "The closest friend",
      line: "If the Prophet ﷺ took a khalil, it would be Abu Bakr.",
      facts: ["Khalil: the closest friend", "Only Abu Bakr's door left open", "Abu Bakr wept at the speech"],
      source: hadith("bukhari", "3654", "Abu Sa'id al-Khudri", "Sahih", "The Prophet ﷺ said: if I were to take a khalil other than my Lord, I would take Abu Bakr; close every door to the masjid except Abu Bakr's."),
      difficulty: 4,
      questions: [
        { q: "What does khalil mean?", a: "The closest friend", wrong: ["A neighbor", "A teacher", "A guard"], why: "The Prophet's ﷺ khalil was Allah alone." },
        { q: "Which door to the masjid did the Prophet ﷺ leave open?", a: "Abu Bakr's", wrong: ["Umar's", "Ali's", "Uthman's"], why: "Every other door to the masjid was to be closed." },
        { q: "Why did Abu Bakr weep at the speech?", a: "He knew the Prophet ﷺ was near death", wrong: ["He was ill", "He lost his wealth", "He was scolded"], why: "The Prophet ﷺ spoke of a servant who chose what is with Allah; Abu Bakr understood it was him." },
        { q: "Who did the Prophet ﷺ say had been most generous to him with company and wealth?", a: "Abu Bakr", wrong: ["Uthman", "Khadijah", "Abd ar-Rahman ibn Awf"], why: "He said it in the same speech." }
      ]
    },
    {
      slug: "most-beloved",
      title: "Most beloved",
      line: "Asked who he loved most among men, the Prophet ﷺ said Abu Bakr.",
      facts: ["Asked by Amr ibn al-As", "First: Aishah, then her father", "Next: Umar"],
      source: hadith("bukhari", "3662", "Amr ibn al-As", "Sahih", "Amr asked who was most beloved to the Prophet ﷺ: Aishah; and among men, her father; then Umar."),
      difficulty: 4,
      questions: [
        { q: "Who asked the Prophet ﷺ whom he loved most?", a: "Amr ibn al-As", wrong: ["Khalid ibn al-Walid", "Mu'adh ibn Jabal", "Abu Dharr"], why: "He asked after leading the army of Dhat as-Salasil." },
        { q: "Among men, whom did the Prophet ﷺ love most?", a: "Abu Bakr", wrong: ["Umar", "Ali", "Zayd"], why: "He said: her father, meaning Aishah's father." },
        { q: "Whom did he name after Abu Bakr?", a: "Umar", wrong: ["Uthman", "Ali", "Bilal"], why: "He said: then Umar ibn al-Khattab." },
        { q: "How did the Prophet ﷺ name Abu Bakr in his answer?", a: "Her father", wrong: ["My uncle", "The old man", "The trader"], why: "He had just named Aishah, so he said: her father." }
      ]
    },
    {
      slug: "uhud-shook",
      title: "The mountain shook",
      line: "On Uhud, the Prophet ﷺ called Abu Bakr a siddiq.",
      facts: ["With Umar and Uthman", "A prophet, a siddiq, two martyrs"],
      source: hadith("bukhari", "3675", "Anas ibn Malik", "Sahih", "Uhud shook under the Prophet ﷺ, Abu Bakr, Umar and Uthman; he said: be firm, on you are a prophet, a siddiq and two martyrs."),
      difficulty: 5,
      questions: [
        { q: "Which mountain shook under them?", a: "Uhud", wrong: ["Hira", "Thawr", "Arafah"], why: "The Prophet ﷺ told it: be firm, Uhud." },
        { q: "Who were the two martyrs on the mountain?", a: "Umar and Uthman", wrong: ["Hamzah and Mus'ab", "Ali and Talhah", "Bilal and Ammar"], why: "Both were later killed as martyrs." },
        { q: "What did the Prophet ﷺ call Abu Bakr that day?", a: "A siddiq", wrong: ["A martyr", "A prophet", "A king"], why: "Siddiq: the one who always believes the truth." },
        { q: "How many people were on the mountain with the Prophet ﷺ?", a: "Three", wrong: ["Two", "Four", "Ten"], why: "Abu Bakr, Umar and Uthman." }
      ]
    },
    {
      slug: "leading-hajj",
      title: "Leader of the Hajj",
      line: "A year before the Farewell Hajj, Abu Bakr led the Hajj.",
      facts: ["No idol worshippers after this year", "No tawaf without clothes", "Abu Hurayrah announced it"],
      source: hadith("bukhari", "1622", "Abu Hurayrah", "Sahih", "The Prophet ﷺ made Abu Bakr leader of the Hajj the year before the Farewell Hajj; he sent people to announce that no idol worshipper may make Hajj after that year."),
      difficulty: 4,
      questions: [
        { q: "When did Abu Bakr lead the Hajj?", a: "The year before the Farewell Hajj", wrong: ["After the Prophet ﷺ died", "The year of Badr", "Before the Hijrah"], why: "The Prophet ﷺ made him leader of the pilgrims." },
        { q: "What was announced at that Hajj?", a: "No idol worshipper may come again", wrong: ["Hajj is moved to Madinah", "Only men may come", "Hajj is every two years"], why: "From the next year, only Muslims made Hajj." },
        { q: "Who did Abu Bakr send to make the announcement?", a: "Abu Hurayrah", wrong: ["Bilal", "Anas", "Mu'adh"], why: "Abu Hurayrah went with others to call it out at Mina." },
        { q: "After that year, tawaf without clothes was still allowed.", tf: false, why: "It was announced that no one may make tawaf without clothes." }
      ]
    },
    {
      slug: "leading-salah",
      title: "In the Prophet's ﷺ place",
      line: "Aishah said her father weeps, yet the Prophet ﷺ chose him.",
      facts: ["Aishah: he weeps too much", "Aishah suggested Umar", "He said again: Abu Bakr"],
      source: hadith("bukhari", "679", "Aishah", "Sahih", "In his last illness the Prophet ﷺ said: tell Abu Bakr to lead the people in prayer. Aishah said he weeps and suggested Umar, but he repeated his order."),
      difficulty: 4,
      questions: [
        { q: "Why did Aishah think her father should not lead?", a: "He weeps when he recites", wrong: ["He was too old", "He was travelling", "He was ill"], why: "She said people would not hear him for his weeping." },
        { q: "Whom did Aishah suggest instead?", a: "Umar", wrong: ["Ali", "Uthman", "Bilal"], why: "The Prophet ﷺ still said: tell Abu Bakr to lead." },
        { q: "What did the Prophet ﷺ do when she objected?", a: "Repeated: let Abu Bakr lead", wrong: ["Chose Umar", "Led it himself standing", "Cancelled the prayer"], why: "He would not change his choice." },
        { q: "When did this happen?", a: "In the Prophet's ﷺ last illness", wrong: ["At the conquest of Makkah", "On the Hijrah", "At Badr"], why: "It was in his final days." }
      ]
    },
    {
      slug: "go-to-abu-bakr",
      title: "Then go to Abu Bakr",
      line: "Asked who to turn to after him, he ﷺ said: Abu Bakr.",
      facts: ["She meant: after your death", "Told by Jubayr ibn Mut'im"],
      source: hadith("bukhari", "3659", "Jubayr ibn Mut'im", "Sahih", "A woman asked the Prophet ﷺ what to do if she came back and did not find him; he said: then go to Abu Bakr."),
      difficulty: 5,
      questions: [
        { q: "The woman asked: what if I come back and do not find you? What did she mean?", a: "If the Prophet ﷺ had died", wrong: ["If he moved house", "If he was asleep", "If he went to Makkah"], why: "She was asking who to turn to after him." },
        { q: "Whom did the Prophet ﷺ tell her to go to?", a: "Abu Bakr", wrong: ["Umar", "Ali", "Aishah"], why: "Many scholars saw this as a sign Abu Bakr would lead after him." },
        { q: "Who reported this?", a: "Jubayr ibn Mut'im", wrong: ["Abu Hurayrah", "Anas ibn Malik", "Ibn Abbas"], why: "Jubayr ibn Mut'im narrated it." }
      ]
    },
    {
      slug: "the-speech",
      title: "Allah never dies",
      line: "Abu Bakr said: whoever worshipped Muhammad, Muhammad has died.",
      facts: ["Allah is alive and never dies", "He recited Quran 3:144", "Umar sat down"],
      source: hadith("bukhari", "3667, 3668", "Aishah", "Sahih", "When the Prophet ﷺ died, Abu Bakr said: whoever worshipped Muhammad, Muhammad has died; whoever worships Allah, Allah is alive and never dies. Then he recited 3:144."),
      difficulty: 5,
      questions: [
        { q: "Who said 'whoever worships Allah, Allah is alive and never dies'?", a: "Abu Bakr", wrong: ["Umar", "Ali", "Abbas"], why: "He said it on the day the Prophet ﷺ died." },
        { q: "Which ayah did Abu Bakr recite that day?", a: "Quran 3:144", wrong: ["Quran 2:255", "Quran 9:40", "Quran 112:1"], why: "Muhammad is only a messenger; messengers passed away before him." },
        { q: "What did Umar do when Abu Bakr spoke?", a: "He sat down", wrong: ["He left Madinah", "He argued", "He drew his sword"], why: "Umar had said the Prophet ﷺ had not died, until Abu Bakr spoke." },
        { q: "Abu Bakr told the people to keep worshipping Allah, who never dies.", tf: true, why: "Allah is alive and never dies." }
      ]
    },
    {
      slug: "saqifah",
      title: "The first pledge",
      line: "At Saqifah, Umar pledged to Abu Bakr: the best of us.",
      facts: ["Abu Bakr suggested Umar or Abu Ubaydah", "Then all the people pledged"],
      source: hadith("bukhari", "3667, 3668", "Aishah", "Sahih", "At the hall of Banu Sa'idah Abu Bakr suggested Umar or Abu Ubaydah; Umar said: you are our master, the best of us and the most beloved to the Prophet ﷺ, and pledged to him."),
      difficulty: 5,
      questions: [
        { q: "Whom did Abu Bakr suggest as leader at Saqifah?", a: "Umar or Abu Ubaydah", wrong: ["Himself only", "Ali or Uthman", "Sa'd ibn Ubadah"], why: "He did not ask for it himself." },
        { q: "Who was first to pledge to Abu Bakr?", a: "Umar", wrong: ["Abu Ubaydah", "Uthman", "Talhah"], why: "Umar took his hand and pledged, then the people did." },
        { q: "What did Umar say Abu Bakr was?", a: "The best of us", wrong: ["The richest of us", "The oldest of us", "The strongest of us"], why: "He also said Abu Bakr was the most beloved to the Prophet ﷺ." },
        { q: "After Umar, the people pledged to Abu Bakr too.", tf: true, why: "So Abu Bakr became the first caliph." }
      ]
    },
    {
      slug: "zakat-firm",
      title: "Salah and zakat together",
      line: "Abu Bakr would fight anyone who split salah from zakat.",
      facts: ["Even over one young goat", "Umar later saw he was right"],
      source: hadith("bukhari", "1399, 1400", "Abu Hurayrah", "Sahih", "Abu Bakr said: by Allah, I will fight whoever separates salah and zakat, even if they hold back a young goat they gave in the Prophet's ﷺ time."),
      difficulty: 5,
      questions: [
        { q: "What would Abu Bakr not let anyone split?", a: "Salah and zakat", wrong: ["Fasting and Hajj", "Makkah and Madinah", "Quran and Sunnah"], why: "Zakat is a right on wealth, just as salah is a duty." },
        { q: "Abu Bakr said he would fight even over a young ____.", a: "goat", wrong: ["camel", "horse", "date palm"], why: "Even one young goat they used to give in the Prophet's ﷺ time." },
        { q: "What did Umar come to see about Abu Bakr's choice?", a: "He was right", wrong: ["He was too harsh", "He was wrong", "He was afraid"], why: "Umar said Allah had opened Abu Bakr's heart to it, and he knew it was the truth." }
      ]
    },
    {
      slug: "collecting-quran",
      title: "Gathering the Quran",
      line: "After Yamamah, Abu Bakr had Zayd ibn Thabit gather the Quran.",
      facts: ["Many reciters died at Yamamah", "The idea came from Umar", "Zayd: harder than moving a mountain"],
      source: hadith("bukhari", "4986", "Zayd bin Thabit", "Sahih", "After many reciters died at Yamamah, Umar urged Abu Bakr to gather the Quran, and Abu Bakr gave the task to Zayd ibn Thabit."),
      difficulty: 5,
      questions: [
        { q: "After which battle did Abu Bakr have the Quran gathered?", a: "Yamamah", wrong: ["Badr", "Uhud", "Khaybar"], why: "Many who knew the Quran by heart died there." },
        { q: "Who first urged Abu Bakr to gather the Quran?", a: "Umar", wrong: ["Ali", "Uthman", "Zayd"], why: "Umar feared parts would be lost as reciters died." },
        { q: "Whom did Abu Bakr give the task to?", a: "Zayd ibn Thabit", wrong: ["Ubayy ibn Ka'b", "Mu'adh ibn Jabal", "Abdullah ibn Mas'ud"], why: "Zayd was young, wise and had written the revelation for the Prophet ﷺ." },
        { q: "Zayd said the task was harder than moving what?", a: "A mountain", wrong: ["A city", "An army", "A river"], why: "He said moving a mountain would have been easier." }
      ]
    },
    {
      slug: "last-days",
      title: "His last days",
      line: "Abu Bakr asked to be wrapped in his old clothes, washed.",
      facts: ["Died at 63, like the Prophet ﷺ", "Living need new clothes more", "Died the night before Tuesday"],
      source: hadith("bukhari", "1387", "Aishah", "Sahih", "Abu Bakr asked to be shrouded in his washed garment, saying the living have more right to new clothes; he died on the night before Tuesday."),
      difficulty: 5,
      questions: [
        { q: "What did Abu Bakr want to be shrouded in?", a: "His own old clothes, washed", wrong: ["New white silk", "The Prophet's ﷺ cloak", "A gift from Umar"], why: "He said the living have more right to new clothes." },
        { q: "How old was Abu Bakr when he died?", a: "63", wrong: ["60", "70", "53"], why: "The same age as the Prophet ﷺ and, later, Umar (Sahih Muslim 2348)." },
        { q: "Abu Bakr hoped to die on the same day of the week as the Prophet ﷺ. Which?", a: "Monday", wrong: ["Friday", "Thursday", "Sunday"], why: "He died that night, before Tuesday morning came." }
      ]
    },
    {
      slug: "dream-of-the-well",
      title: "The dream of the well",
      line: "In a dream, Ibn Abi Quhafah drew water after the Prophet ﷺ.",
      facts: ["Ibn Abi Quhafah: Abu Bakr", "One or two buckets", "Then Umar drew the most"],
      source: hadith("bukhari", "3664", "Abu Hurayrah", "Sahih", "In a dream the Prophet ﷺ drew water from a well; then Ibn Abi Quhafah drew one or two buckets, then Ibn al-Khattab drew a huge amount."),
      difficulty: 5,
      questions: [
        { q: "In the dream, who is Ibn Abi Quhafah?", a: "Abu Bakr", wrong: ["Umar", "Uthman", "Ali"], why: "Ibn Abi Quhafah means son of Abu Quhafah, Abu Bakr's father." },
        { q: "How many buckets did Ibn Abi Quhafah draw?", a: "One or two", wrong: ["Ten", "Forty", "None"], why: "Scholars saw this as Abu Bakr's short time as caliph, about two years." },
        { q: "Who took the bucket after him and drew the most?", a: "Umar", wrong: ["Uthman", "Ali", "Khalid"], why: "The Prophet ﷺ said he never saw anyone work as mightily as Ibn al-Khattab." },
        { q: "The Prophet ﷺ was first to draw water in the dream.", tf: true, why: "He drew as much as Allah willed, then handed over the bucket." }
      ]
    },
    {
      slug: "successor",
      title: "Choosing Umar",
      line: "Abu Bakr chose Umar to lead the Muslims after him.",
      facts: ["Umar: one better than me chose", "Umar: the second caliph"],
      source: hadith("bukhari", "7218", "Abdullah ibn Umar", "Sahih", "Umar said: if I name a successor, one better than me, Abu Bakr, did so."),
      difficulty: 5,
      questions: [
        { q: "Whom did Abu Bakr choose to lead after him?", a: "Umar", wrong: ["Ali", "Uthman", "Abu Ubaydah"], why: "Umar became the second caliph." },
        { q: "Later, Umar said someone 'better than me' had named a successor. Who?", a: "Abu Bakr", wrong: ["Abu Ubaydah", "Uthman", "Sa'd"], why: "Umar always saw Abu Bakr as better than himself." },
        { q: "Abu Bakr left the Muslims with no one chosen to lead.", tf: false, why: "He named Umar." }
      ]
    },
    {
      slug: "best-after",
      title: "Ali's answer",
      line: "Ali said the best person after the Prophet ﷺ is Abu Bakr.",
      facts: ["Asked by his son Muhammad", "Then Umar", "Ali: I am just a Muslim"],
      source: hadith("bukhari", "3671", "Muhammad ibn al-Hanafiyyah", "Sahih", "Muhammad ibn al-Hanafiyyah asked his father Ali who was best after the Prophet ﷺ; he said: Abu Bakr, then Umar."),
      difficulty: 5,
      questions: [
        { q: "Who asked Ali who was best after the Prophet ﷺ?", a: "His son Muhammad", wrong: ["Umar", "His son Hasan", "Abu Hurayrah"], why: "He was known as Muhammad ibn al-Hanafiyyah." },
        { q: "Whom did Ali name first?", a: "Abu Bakr", wrong: ["Himself", "Uthman", "Abbas"], why: "Then he named Umar." },
        { q: "Whom did Ali name second?", a: "Umar", wrong: ["Uthman", "Himself", "Talhah"], why: "Abu Bakr, then Umar." },
        { q: "When asked 'Then you?', what did Ali say?", a: "I am just one of the Muslims", wrong: ["Yes, I am third", "Ask Uthman", "I will not answer"], why: "This was Ali's humility." }
      ]
    },
    {
      slug: "ten-promised",
      title: "Promised Jannah",
      line: "Abu Bakr is first of ten the Prophet ﷺ named for Jannah.",
      facts: ["Then Umar, Uthman, Ali", "Told by Abd ar-Rahman ibn Awf"],
      source: hadith("tirmidhi", "3747", "Abdur-Rahman ibn Awf", "Sahih (Darussalam)", "The Prophet ﷺ said: Abu Bakr is in Paradise, Umar is in Paradise, Uthman, Ali... ten in all."),
      difficulty: 5,
      questions: [
        { q: "How many companions did the Prophet ﷺ name together for Jannah?", a: "Ten", wrong: ["Four", "Seven", "Forty"], why: "They are known as the ten promised Jannah." },
        { q: "Whose name comes first in the list?", a: "Abu Bakr", wrong: ["Umar", "Ali", "Abd ar-Rahman"], why: "Then Umar, Uthman and Ali." },
        { q: "Which companion, himself one of the ten, reported this?", a: "Abd ar-Rahman ibn Awf", wrong: ["Abu Hurayrah", "Anas ibn Malik", "Bilal"], why: "His own name is in the list." },
        { q: "Umar, Uthman and Ali are also in the list.", tf: true, why: "All four caliphs are among the ten." }
      ]
    }
  ]
};

const FATIHAH: DeepUnit = {
  key: "fatihah",
  topicId: "quran_tafseer",
  branchId: "quran-surah-fatihah",
  name: "Al-Fatihah",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Fatihah",
  lessons: [
    {
      slug: "names",
      title: "Its many names",
      line: "Al-Fatihah is also called Umm al-Kitab, the Mother of the Book.",
      facts: ["As-Sab' al-Mathani: seven repeated", "Ash-Shifa: the Cure", "Ar-Ruqyah: the healing"],
      source: ibnKathir(1, "Ibn Kathir lists its names: Al-Fatihah, Umm al-Kitab, As-Sab' al-Mathani, Al-Hamd, As-Salah, Ash-Shifa and Ar-Ruqyah."),
      difficulty: 2,
      questions: [
        { q: "What does Umm al-Kitab mean?", a: "Mother of the Book", wrong: ["Key of the Book", "Heart of the Book", "Light of the Book"], why: "Most scholars call Al-Fatihah by this name." },
        { q: "Which name means 'the seven repeated'?", a: "As-Sab' al-Mathani", wrong: ["Umm al-Kitab", "Ash-Shifa", "Ar-Ruqyah"], why: "Its seven ayahs are repeated in every salah." },
        { q: "Ash-Shifa, one name of Al-Fatihah, means what?", a: "The Cure", wrong: ["The Light", "The Key", "The Praise"], why: "Allah's words bring healing." },
        { q: "Al-Fatihah has only one name.", tf: false, why: "Ibn Kathir lists many names for it." }
      ]
    },
    {
      slug: "mother-of-the-book",
      title: "Why the Mother of the Book",
      line: "The Quran begins with it, and every salah begins with it.",
      facts: ["Seven ayahs: all agree", "Holds the meanings of the Quran"],
      source: ibnKathir(1, "Al-Bukhari said it is called Umm al-Kitab because the Quran starts with it and the prayer starts with it; there is no disagreement that it has seven ayahs."),
      difficulty: 3,
      questions: [
        { q: "Why is Al-Fatihah called the Mother of the Book?", a: "The Quran and salah begin with it", wrong: ["It came down last", "It is the longest surah", "It is about mothers"], why: "Ibn Kathir quotes Imam al-Bukhari saying this." },
        { q: "Scholars all agree Al-Fatihah has how many ayahs?", a: "Seven", wrong: ["Six", "Eight", "Five"], why: "There is no disagreement about seven." },
        { q: "Ibn Kathir says Al-Fatihah holds what?", a: "The meanings of the whole Quran", wrong: ["Only stories", "Only rules of fasting", "The names of the prophets"], why: "Praise, worship, the Last Day and guidance are all in it." }
      ]
    },
    {
      slug: "greatest-surah",
      title: "The greatest surah",
      line: "The Prophet ﷺ called Al-Fatihah the greatest surah in the Quran.",
      facts: ["Told to Abu Sa'id ibn al-Mu'alla", "He was praying when called"],
      source: hadith("bukhari", "4474", "Abu Sa'id ibn al-Mu'alla", "Sahih", "The Prophet ﷺ said: I will teach you the greatest surah in the Quran: Alhamdulillahi Rabbil-'alamin, the seven repeated ayahs."),
      difficulty: 3,
      questions: [
        { q: "Which surah did the Prophet ﷺ call the greatest in the Quran?", a: "Al-Fatihah", wrong: ["Al-Ikhlas", "Al-Baqarah", "Ya-Sin"], why: "He called it the seven repeated ayahs and the great Quran." },
        { q: "Whom did the Prophet ﷺ tell this to?", a: "Abu Sa'id ibn al-Mu'alla", wrong: ["Abu Sa'id al-Khudri", "Mu'adh ibn Jabal", "Abu Hurayrah"], why: "Two companions are called Abu Sa'id; this was Ibn al-Mu'alla." },
        { q: "Why did Abu Sa'id not answer the Prophet's ﷺ call at once?", a: "He was praying", wrong: ["He was asleep", "He did not hear", "He was travelling"], why: "The Prophet ﷺ reminded him: answer Allah and His Messenger ﷺ when called (Quran 8:24)." }
      ]
    },
    {
      slug: "two-lights",
      title: "Two lights",
      line: "An angel said: rejoice in two lights no prophet had before.",
      facts: ["Al-Fatihah", "The end of Al-Baqarah", "Reward for every letter"],
      source: hadith("muslim", "806", "Ibn Abbas", "Sahih", "An angel came down and said: rejoice in two lights given to you that no prophet before you was given: Al-Fatihah and the end of Surah Al-Baqarah."),
      difficulty: 4,
      questions: [
        { q: "What were the two lights?", a: "Al-Fatihah and the end of Al-Baqarah", wrong: ["Al-Ikhlas and Al-Falaq", "Ya-Sin and Al-Mulk", "Al-Kahf and Maryam"], why: "The angel named these two." },
        { q: "Prophets before Muhammad ﷺ were also given these two lights.", tf: false, why: "They had not been given to any prophet before him." },
        { q: "What did the angel promise for reciting them?", a: "Reward for every letter", wrong: ["Wealth in this life", "A long life", "No more tests"], why: "Every letter recited from them is given." }
      ]
    },
    {
      slug: "ruqyah",
      title: "A healing",
      line: "A companion read Al-Fatihah over a stung chief; he was cured.",
      facts: ["Stung by a scorpion", "The Prophet ﷺ: how did you know?"],
      source: hadith("bukhari", "5007", "Abu Sa'id al-Khudri", "Sahih", "A companion recited Al-Fatihah over a chief stung by a scorpion and he recovered; the Prophet ﷺ asked how he knew it was a ruqyah."),
      difficulty: 3,
      questions: [
        { q: "What had happened to the tribe's chief?", a: "A scorpion stung him", wrong: ["A snake bit him", "He fell from a camel", "He had a fever"], why: "His people asked the travelling companions for help." },
        { q: "What did the companion recite over him?", a: "Al-Fatihah", wrong: ["Ayat al-Kursi", "Al-Ikhlas", "Al-Asr"], why: "He called it Umm al-Kitab." },
        { q: "What did the Prophet ﷺ ask the companion?", a: "How did you know it is a ruqyah?", wrong: ["Why did you go?", "Who taught you to read?", "Did you pray first?"], why: "A ruqyah is a recitation for healing." }
      ]
    },
    {
      slug: "al-hamd",
      title: "All praise",
      line: "Al-Hamdu lillah: every kind of praise belongs to Allah.",
      facts: ["Praise: for who He is", "Thanks: for what He gives"],
      quote: ayah(2),
      source: ibnKathir(2, "Al before Hamd covers every kind of praise and thanks; hamd is wider than thanks, which is only for what was done."),
      difficulty: 3,
      questions: [
        { q: "In Al-Hamdu lillah, what does 'Al' add?", a: "Every kind of praise", wrong: ["A little praise", "Praise on Fridays", "Praise of people"], why: "All praise and thanks belong to Allah alone." },
        { q: "Which is wider in meaning?", a: "Praise (hamd)", wrong: ["Thanks (shukr)", "They are the same", "Neither"], why: "Hamd praises who He is and what He does." },
        { q: "Thanks (shukr) is given for what?", a: "What He gives and does", wrong: ["His names only", "Nothing", "Only the past"], why: "Praise is for who He is too." }
      ]
    },
    {
      slug: "rabb-al-alamin",
      title: "Lord of all the worlds",
      line: "Rabb means Owner and Master; al-'alamin is all except Allah.",
      facts: ["Rabb alone: said only of Allah", "'Alam: from 'alamah, a sign"],
      quote: ayah(2),
      source: ibnKathir(2, "Ar-Rabb is the owner with full authority; al-'alamin is everything that exists except Allah; 'alam comes from 'alamah, a sign of the Creator."),
      difficulty: 4,
      questions: [
        { q: "What does Rabb mean?", a: "Owner and Master", wrong: ["Only Creator", "Only Judge", "Only Teacher"], why: "Ibn Kathir: the owner with full authority over what he owns." },
        { q: "What does al-'alamin include?", a: "Everything except Allah", wrong: ["Only people", "Only angels", "Only the earth"], why: "Every kind of creation is an 'alam." },
        { q: "'Alam comes from 'alamah. What is an 'alamah?", a: "A sign", wrong: ["A world", "A book", "A light"], why: "All creation is a sign pointing to its Creator." },
        { q: "Said alone, the word Rabb is used only for Allah.", tf: true, why: "For others it is joined to a thing, like rabb ad-dar, owner of the house." }
      ]
    },
    {
      slug: "rahman-rahim",
      title: "The Merciful",
      line: "Ar-Rahman's mercy covers all; Ar-Rahim's is for believers.",
      facts: ["Both from rahmah, mercy", "Ar-Rahman: only for Allah"],
      quote: ayah(3),
      source: ibnKathir(1, "Ar-Rahman and Ar-Rahim come from rahmah; Ar-Rahman is wider and is a name for Allah alone, Ar-Rahim is especially for the believers (33:43)."),
      difficulty: 4,
      questions: [
        { q: "Ar-Rahman and Ar-Rahim come from which word?", a: "Rahmah, mercy", wrong: ["Rabb, Lord", "Hamd, praise", "Din, recompense"], why: "Both are names of mercy." },
        { q: "Which of these is a name for Allah alone?", a: "Ar-Rahman", wrong: ["Ar-Rahim", "Al-Karim", "Al-Halim"], why: "Others can be called merciful, but no one else is Ar-Rahman." },
        { q: "Ar-Rahim's special mercy is for the believers.", tf: true, why: "Allah says: He is ever merciful to the believers (33:43)." },
        { q: "Whose mercy is the wider of the two names?", a: "Ar-Rahman's", wrong: ["Ar-Rahim's", "They are exactly the same", "Neither is about mercy"], why: "It covers all creation in both lives." }
      ]
    },
    {
      slug: "day-of-recompense",
      title: "The Day of Recompense",
      line: "On the Day of Recompense, Allah alone owns anything.",
      facts: ["Ad-Din: the reckoning", "Good for good, evil for evil", "Umar: judge yourself first"],
      quote: ayah(4),
      source: ibnKathir(4, "Yawm ad-Din is the Day of Recompense; on it no one owns anything but Allah. Umar said: hold yourselves to account before you are held to account."),
      difficulty: 4,
      questions: [
        { q: "What does Yawm ad-Din mean?", a: "The Day of Recompense", wrong: ["The day of Eid", "Friday", "The day of Arafah"], why: "It is the Day of Judgment, when deeds are repaid." },
        { q: "Why is Allah called Owner of that Day in particular?", a: "On it no one else owns anything", wrong: ["He owns nothing else", "It is the only day", "People rule other days"], why: "He owns everything always; on that Day no one can even claim to." },
        { q: "Umar said: hold yourself to account before...", a: "You are held to account", wrong: ["You grow old", "You eat", "You sleep"], why: "Ibn Kathir quotes Umar's advice here." }
      ]
    },
    {
      slug: "you-alone",
      title: "You alone",
      line: "Iyyaka comes first: You alone we worship, and no one else.",
      facts: ["First half: free from shirk", "Second half: rely only on Allah", "'Ibadah: love, humility, fear"],
      quote: ayah(5),
      source: ibnKathir(5, "Putting 'You' first means: we worship You alone and rely on You alone. The first half frees us from shirk, the second from trusting our own strength."),
      difficulty: 5,
      questions: [
        { q: "Why does 'Iyyaka' (You) come first in the ayah?", a: "It means You alone, none else", wrong: ["It sounds nicer", "It is a question", "It is a name of the surah"], why: "Putting the object first makes it only His." },
        { q: "The first half, You we worship, frees us from what?", a: "Shirk", wrong: ["Hunger", "Debt", "Sleep"], why: "Worshipping Allah alone is the opposite of shirk." },
        { q: "Ibadah joins love, humility and what?", a: "Fear", wrong: ["Wealth", "Pride", "Anger"], why: "That is its meaning in the religion." },
        { q: "And You we ask for help means we rely on our own strength.", tf: false, why: "It means all help and strength come from Allah." }
      ]
    },
    {
      slug: "divided-prayer",
      title: "A talk with Allah",
      line: "Allah divided Al-Fatihah in salah between Him and His servant.",
      facts: ["Ayah 2: My servant praised Me", "Ayah 4: My servant glorified Me", "Ayah 5: between Me and him"],
      source: hadith("muslim", "395a", "Abu Hurayrah", "Sahih", "Allah said: I have divided the prayer into two halves between Me and My servant; when he says Al-hamdu lillah, Allah says: My servant has praised Me."),
      difficulty: 4,
      questions: [
        { q: "When we say Al-hamdu lillah, what does Allah say?", a: "My servant praised Me", wrong: ["My servant asked Me", "My servant obeyed Me", "Nothing"], why: "Allah answers every ayah." },
        { q: "After Maliki yawm ad-din, Allah says...", a: "My servant glorified Me", wrong: ["My servant praised Me", "This is for My servant", "My servant is afraid"], why: "Owner of the Day is a word of glory." },
        { q: "After Iyyaka na'budu, Allah says it is...", a: "Between Me and My servant", wrong: ["For Me only", "For the angels", "Only for the imam"], why: "Worship is for Allah; help is for the servant." }
      ]
    },
    {
      slug: "straight-path",
      title: "Keep us on the path",
      line: "We ask Allah to keep us firm on the straight path: Islam.",
      facts: ["Sirat: a clear road, no turns", "Asked in every salah"],
      quote: ayah(6),
      source: ibnKathir(6, "As-Sirat al-Mustaqim is the clear path with no branches, and it is Islam; believers ask in every prayer to stay firm on it."),
      difficulty: 5,
      questions: [
        { q: "Ibn Kathir says the straight path is what?", a: "Islam", wrong: ["The road to Makkah", "A bridge only", "Good manners only"], why: "At-Tabari and Ibn Kathir explain it as Islam." },
        { q: "Why does a Muslim ask for guidance in every salah?", a: "To stay firm on it", wrong: ["He is not a Muslim yet", "To get rich", "It is said only once"], why: "We need Allah's help every hour to stay on the path." },
        { q: "In Arabic, what kind of road is a sirat?", a: "Clear, with no turns", wrong: ["Narrow and dark", "Long and winding", "A small side path"], why: "That is how the Arabs used the word." }
      ]
    },
    {
      slug: "favored-ones",
      title: "Those Allah favored",
      line: "The favored: prophets, the truthful, martyrs and the righteous.",
      facts: ["Explained by Quran 4:69", "Avoid: knowing truth, leaving it", "Avoid: losing true knowledge"],
      quote: ayah(7),
      source: ibnKathir(7, "Those Allah favored are the prophets, the truthful, the martyrs and the righteous (4:69); we ask to avoid those who knew the truth and left it, and those who lost true knowledge."),
      difficulty: 5,
      questions: [
        { q: "Which ayah explains 'those You have favored'?", a: "Quran 4:69", wrong: ["Quran 2:2", "Quran 112:1", "Quran 9:40"], why: "It names the prophets, the truthful, the martyrs and the righteous." },
        { q: "Which is NOT among the favored in Quran 4:69?", a: "The rich", wrong: ["The prophets", "The martyrs", "The righteous"], why: "Being favored is about faith and deeds, not wealth." },
        { q: "Ibn Kathir: those who earned anger are those who...", a: "Knew the truth and left it", wrong: ["Never heard of it", "Asked too many questions", "Were poor"], why: "Knowing without acting is what earns anger." },
        { q: "And those who went astray are those who...", a: "Lost true knowledge", wrong: ["Knew it and acted", "Travelled far", "Prayed too much"], why: "They acted without knowing the right way." }
      ]
    },
    {
      slug: "amin",
      title: "Saying Amin",
      line: "After Al-Fatihah we say Amin: O Allah, answer our dua.",
      facts: ["Say it with the imam", "Matching the angels' Amin", "Past sins forgiven"],
      source: hadith("bukhari", "780", "Abu Hurayrah", "Sahih", "Say Amin when the imam says it; whoever's Amin matches the angels' Amin has his past sins forgiven."),
      difficulty: 3,
      questions: [
        { q: "What does Amin mean?", a: "O Allah, answer our dua", wrong: ["The prayer is over", "Allah is great", "Peace be on you"], why: "Ibn Kathir explains it this way." },
        { q: "Whose Amin can ours match?", a: "The angels'", wrong: ["The imam's only", "Our parents'", "The prophets'"], why: "The angels say Amin too." },
        { q: "What is promised to one whose Amin matches the angels'?", a: "Past sins forgiven", wrong: ["A new house", "Riches", "A long life"], why: "So say it with the imam." },
        { q: "Only the imam should say Amin.", tf: false, why: "The Prophet ﷺ said: say Amin when the imam says it." }
      ]
    }
  ]
};

const UMAR: DeepUnit = {
  key: "umar",
  topicId: "sahabah",
  branchId: "sahabi-umar-ibn-al-khattab",
  name: "Umar",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "becoming-muslim",
      title: "Umar becomes Muslim",
      line: "When Umar became Muslim, his people threatened his life.",
      facts: ["He stayed home in fear", "Al-As ibn Wa'il protected him", "The crowd went back"],
      source: hadith("bukhari", "3864", "Ibn Umar", "Sahih", "When Umar became Muslim, his people threatened to kill him; Al-As ibn Wa'il gave him protection and the crowd turned back."),
      difficulty: 2,
      questions: [
        { q: "Why was Umar afraid after he became Muslim?", a: "His people threatened his life", wrong: ["He had lost his wealth", "He was ill", "He had no food"], why: "Quraysh were angry that Umar had left their religion." },
        { q: "Who gave Umar protection that day?", a: "Al-As ibn Wa'il", wrong: ["Abu Jahl", "Abu Lahab", "Utbah ibn Rabi'ah"], why: "His tribe were allies of Umar's family." },
        { q: "What did the crowd do once Umar was protected?", a: "They went back", wrong: ["They attacked his house", "They became Muslim", "They left Makkah"], why: "Al-As told them: there is no way to touch him." },
        { q: "Umar's own son told this story.", tf: true, why: "Abdullah ibn Umar narrated it." }
      ]
    },
    {
      slug: "powerful",
      title: "Strength for Islam",
      line: "Ibn Mas'ud said: we have been strong since Umar became Muslim.",
      facts: ["Told by Abdullah ibn Mas'ud", "Muslims felt stronger"],
      source: hadith("bukhari", "3684", "Abdullah ibn Masud", "Sahih", "Ibn Mas'ud said: we have been powerful since Umar embraced Islam."),
      difficulty: 2,
      questions: [
        { q: "What changed for the Muslims when Umar became Muslim?", a: "They became strong", wrong: ["They left Makkah", "They grew rich", "They stopped praying"], why: "Ibn Mas'ud said they had been powerful ever since." },
        { q: "Which companion said Umar made the Muslims strong?", a: "Abdullah ibn Mas'ud", wrong: ["Abu Hurayrah", "Anas ibn Malik", "Salman al-Farisi"], why: "Ibn Mas'ud was one of the early Muslims of Makkah." },
        { q: "Umar's Islam made the Muslims weaker.", tf: false, why: "It made them stronger." }
      ]
    },
    {
      slug: "hafsah",
      title: "A husband for Hafsah",
      line: "Umar offered his widowed daughter to Uthman, then Abu Bakr.",
      facts: ["Her husband died after Badr", "Then the Prophet ﷺ married her", "Abu Bakr kept the secret"],
      source: hadith("bukhari", "4005", "Ibn Umar", "Sahih", "Umar offered Hafsah in marriage to Uthman, then to Abu Bakr; then the Prophet ﷺ asked for her hand. Abu Bakr later said he had known the Prophet ﷺ spoke of her and kept his secret."),
      difficulty: 3,
      questions: [
        { q: "Whom did Umar first ask to marry Hafsah?", a: "Uthman ibn Affan", wrong: ["Ali ibn Abi Talib", "Abd ar-Rahman ibn Awf", "Az-Zubayr"], why: "Uthman said he would not marry at that time." },
        { q: "Who married Hafsah in the end?", a: "The Prophet ﷺ", wrong: ["Abu Bakr", "Uthman", "Talhah"], why: "She became one of the Mothers of the Believers." },
        { q: "Why had Abu Bakr stayed quiet?", a: "He kept the Prophet's ﷺ secret", wrong: ["He was angry with Umar", "He did not hear", "He was travelling"], why: "He knew the Prophet ﷺ had spoken of her." },
        { q: "Hafsah's first husband died after the battle of Badr.", tf: true, why: "Khunays ibn Hudhafah fought at Badr and died in Madinah." }
      ]
    },
    {
      slug: "lord-agreed",
      title: "My Lord agreed with me",
      line: "Umar said: my Lord agreed with me in three things.",
      facts: ["Praying at Maqam Ibrahim", "The ayah of hijab", "A warning to the Prophet's ﷺ wives"],
      source: hadith("bukhari", "402", "Umar ibn al-Khattab", "Sahih", "Umar said: my Lord agreed with me in three things: taking the Maqam of Ibrahim as a place of prayer, the ayah of hijab, and the ayah about the Prophet's ﷺ wives."),
      difficulty: 3,
      questions: [
        { q: "How many times did Umar say the Quran agreed with his wish?", a: "Three", wrong: ["One", "Seven", "Ten"], why: "He named three things." },
        { q: "Where did Umar wish the Muslims would pray?", a: "At Maqam Ibrahim", wrong: ["On Mount Uhud", "In Masjid al-Aqsa", "At the well of Zamzam"], why: "Allah revealed: take the Maqam of Ibrahim as a place of prayer (Quran 2:125)." },
        { q: "Which ayah came after Umar wished for more privacy for the Prophet's ﷺ wives?", a: "The ayah of hijab", wrong: ["The ayah of fasting", "The ayah of zakat", "The ayah of Hajj"], why: "Umar asked that the wives be covered from men." },
        { q: "Umar told this about himself.", tf: true, why: "Umar is the narrator of the hadith." }
      ]
    },
    {
      slug: "truth-on-tongue",
      title: "Truth on his tongue",
      line: "Allah put the truth on Umar's tongue and in his heart.",
      facts: ["Told by Ibn Umar", "The Quran often agreed with him"],
      source: hadith("tirmidhi", "3682", "Ibn Umar", "Sahih (Darussalam)", "The Prophet ﷺ said: Allah has put the truth upon the tongue and in the heart of Umar."),
      difficulty: 3,
      questions: [
        { q: "Where did Allah put the truth for Umar?", a: "On his tongue and in his heart", wrong: ["In his sword", "In his wealth", "In his poems"], why: "So he often spoke what was right." },
        { q: "Ibn Umar said that often, when Umar gave his view, what happened?", a: "The Quran came down like it", wrong: ["Everyone laughed", "Nobody listened", "He changed his mind"], why: "Like the three things Umar spoke of himself." },
        { q: "Who reported the hadith of truth on Umar's tongue?", a: "Ibn Umar", wrong: ["Abu Bakr", "Aishah", "Ali"], why: "Umar's son Abdullah narrated it." }
      ]
    },
    {
      slug: "inspired",
      title: "One who is inspired",
      line: "Past nations had inspired men; in this ummah, that is Umar.",
      facts: ["Inspired, but not a prophet", "Told by Abu Hurayrah"],
      source: hadith("bukhari", "3689", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said: among the nations before you were people who were inspired though not prophets; if there is any in my ummah, it is Umar."),
      difficulty: 4,
      questions: [
        { q: "The inspired men of the past nations were what?", a: "Guided, but not prophets", wrong: ["Prophets", "Angels", "Kings"], why: "They were given right thoughts, but no revelation." },
        { q: "Who did the Prophet ﷺ say would be the inspired one in his ummah?", a: "Umar", wrong: ["Abu Bakr", "Ali", "Khalid"], why: "He said: if there is any, it is Umar." },
        { q: "Umar was a prophet.", tf: false, why: "There is no prophet after Muhammad ﷺ. Umar was inspired, not a prophet." }
      ]
    },
    {
      slug: "satan-path",
      title: "Shaytan takes another path",
      line: "Shaytan never meets Umar on a path but takes another.",
      facts: ["The women hurried to cover up", "The Prophet ﷺ was smiling"],
      source: hadith("bukhari", "3683", "Sad ibn Abi Waqqas", "Sahih", "The Prophet ﷺ said: O Ibn al-Khattab, never does Shaytan find you on a path but he takes a path other than yours."),
      difficulty: 3,
      questions: [
        { q: "What does Shaytan do if he meets Umar on a path?", a: "He takes another path", wrong: ["He follows him", "He fights him", "He whispers to him"], why: "Shaytan kept away from Umar's firm faith." },
        { q: "Why was the Prophet ﷺ smiling when Umar came in?", a: "The women hid when they heard Umar", wrong: ["Umar told a joke", "Umar brought a gift", "It was Eid"], why: "The women had been raising their voices, then hurried to cover up." },
        { q: "Which companion reported that Shaytan avoids Umar's path?", a: "Sad ibn Abi Waqqas", wrong: ["Abu Hurayrah", "Jabir bin Abdullah", "Anas ibn Malik"], why: "Sa'd was one of the ten promised Jannah." },
        { q: "The women said they feared Umar more because he was gentler.", tf: false, why: "They said Umar was harsher and sterner." }
      ]
    },
    {
      slug: "dearer",
      title: "Dearer than myself",
      line: "Umar learned to love the Prophet ﷺ more than himself.",
      facts: ["First: more than all but myself", "The Prophet ﷺ: not yet", "Umar: now, more than myself"],
      source: hadith("bukhari", "6632", "Abdullah ibn Hisham", "Sahih", "Umar said: you are dearer to me than everything except myself. The Prophet ﷺ said: not until I am dearer than yourself. Umar said: now you are dearer to me than myself. He ﷺ said: now, O Umar."),
      difficulty: 4,
      questions: [
        { q: "What did Umar first say to the Prophet ﷺ?", a: "Dearer than all but myself", wrong: ["Dearer than my wealth only", "As dear as my father", "Dearer than Abu Bakr"], why: "He was honest about what he felt." },
        { q: "What did the Prophet ﷺ answer?", a: "Not until I am dearer than yourself", wrong: ["That is enough", "Love me less", "Love Abu Bakr more"], why: "Full faith means loving him ﷺ more than yourself." },
        { q: "What did the Prophet ﷺ say when Umar said 'now, more than myself'?", a: "Now, O Umar", wrong: ["Not yet", "Say it again", "Ask Abu Bakr"], why: "Umar's faith was now complete." },
        { q: "The Prophet ﷺ was holding Umar's hand.", tf: true, why: "Abdullah ibn Hisham saw it." }
      ]
    },
    {
      slug: "palace",
      title: "A palace in Jannah",
      line: "The Prophet ﷺ dreamed of a palace in Jannah, built for Umar.",
      facts: ["A woman making wudu beside it", "Umar wept"],
      source: hadith("bukhari", "3680", "Abu Hurayrah", "Sahih", "The Prophet ﷺ saw in a dream a palace in Paradise for Umar; he remembered Umar's sense of honor and turned away. Umar wept."),
      difficulty: 3,
      questions: [
        { q: "Whose palace did the Prophet ﷺ see in Jannah?", a: "Umar's", wrong: ["Abu Bakr's", "Bilal's", "Uthman's"], why: "He was told: it is for Umar." },
        { q: "Why did the Prophet ﷺ not go in?", a: "He thought of Umar's sense of honor", wrong: ["The gate was locked", "An angel stopped him", "He was in a hurry"], why: "He respected Umar's ghirah, his protective honor." },
        { q: "What did Umar do when he heard this?", a: "He wept", wrong: ["He laughed", "He left", "He stayed silent"], why: "He said: how could I feel that about you, O Messenger of Allah ﷺ?" },
        { q: "The Prophet ﷺ saw this while awake.", tf: false, why: "It was a dream, and the dreams of prophets are true." }
      ]
    },
    {
      slug: "milk",
      title: "The cup of milk",
      line: "In a dream, the Prophet ﷺ gave Umar his leftover milk.",
      facts: ["Milk flowed through his nails", "Its meaning: knowledge"],
      source: hadith("bukhari", "3681", "Ibn Umar", "Sahih", "The Prophet ﷺ saw himself drinking milk until it flowed from his nails, then gave the rest to Umar. He said it means knowledge."),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ give Umar in the dream?", a: "His leftover milk", wrong: ["A sword", "A key", "A cloak"], why: "He drank until he was full, then gave the rest." },
        { q: "What did the Prophet ﷺ say the milk meant?", a: "Knowledge", wrong: ["Wealth", "Long life", "Victory"], why: "Umar was given great knowledge of the religion." },
        { q: "In the dream, where did the milk flow out?", a: "Through his nails", wrong: ["From a river", "From a well", "From the sky"], why: "He drank so much he saw it flowing through his nails." }
      ]
    },
    {
      slug: "shirt",
      title: "The long shirt",
      line: "In a dream, Umar's shirt was so long he dragged it.",
      facts: ["Others' shirts reached their chests", "Its meaning: religion"],
      source: hadith("bukhari", "3691", "Abu Sa'id al-Khudri", "Sahih", "The Prophet ﷺ saw people in shirts, some reaching only the chest; Umar's was so long he dragged it. He said it means religion."),
      difficulty: 3,
      questions: [
        { q: "What did the long shirt mean?", a: "Religion", wrong: ["Wealth", "Pride", "Power"], why: "Umar's strong faith covered him fully." },
        { q: "How short were some people's shirts in the dream?", a: "Only to their chests", wrong: ["Only to their knees", "Only to their feet", "No shirts at all"], why: "Each shirt showed how much religion a person had." },
        { q: "Which companion reported the dream of the shirts?", a: "Abu Sa'id al-Khudri", wrong: ["Ibn Abbas", "Abu Musa", "Abu Dharr"], why: "He heard the Prophet ﷺ tell it." }
      ]
    },
    {
      slug: "if-a-prophet",
      title: "If there were a prophet",
      line: "If there were a prophet after me, it would be Umar.",
      facts: ["But no prophet comes after him ﷺ", "Told by Uqbah ibn Amir"],
      source: hadith("tirmidhi", "3686", "Uqbah ibn Amir", "Hasan (Darussalam)", "The Prophet ﷺ said: if there were to be a prophet after me, it would have been Umar ibn al-Khattab."),
      difficulty: 4,
      questions: [
        { q: "What did the Prophet ﷺ say about a prophet after him?", a: "If there were, it would be Umar", wrong: ["Umar is a prophet", "Abu Bakr will be one", "One will come soon"], why: "It shows Umar's rank. Muhammad ﷺ is the last prophet." },
        { q: "There will be a prophet after Muhammad ﷺ.", tf: false, why: "He ﷺ is the seal of the prophets (Quran 33:40)." },
        { q: "Which companion reported this?", a: "Uqbah ibn Amir", wrong: ["Umar himself", "Abu Bakr", "Hudhayfah"], why: "Uqbah heard it from the Prophet ﷺ." }
      ]
    },
    {
      slug: "wolf",
      title: "The talking wolf",
      line: "The Prophet ﷺ said: Abu Bakr and Umar believe it too.",
      facts: ["A wolf spoke to a shepherd", "Abu Bakr and Umar were not there"],
      source: hadith("bukhari", "3690", "Abu Hurayrah", "Sahih", "The Prophet ﷺ told of a wolf that spoke to a shepherd. People were amazed; he said: I believe it, and so do Abu Bakr and Umar, though they were not there."),
      difficulty: 4,
      questions: [
        { q: "What did the wolf in the story do?", a: "It spoke to the shepherd", wrong: ["It guarded the sheep", "It ran into the sea", "It became tame"], why: "The Prophet ﷺ told this story of a past wonder." },
        { q: "Who did the Prophet ﷺ say believed it with him?", a: "Abu Bakr and Umar", wrong: ["Ali and Uthman", "Bilal and Ammar", "Everyone there"], why: "He trusted their faith even though they were away." },
        { q: "Abu Bakr and Umar were sitting there when he said it.", tf: false, why: "They were not there, yet he spoke for their faith." }
      ]
    },
    {
      slug: "garden-gate",
      title: "Good news at the gate",
      line: "At a garden gate, Umar was given the good news of Jannah.",
      facts: ["Abu Musa opened the gate", "Abu Bakr, then Umar, then Uthman", "Umar praised Allah"],
      source: hadith("bukhari", "3693", "Abu Musa", "Sahih", "In a garden of Madinah, the Prophet ﷺ told Abu Musa to open the gate and give good news of Paradise to Abu Bakr, then Umar, then Uthman."),
      difficulty: 3,
      questions: [
        { q: "Who opened the garden gate?", a: "Abu Musa", wrong: ["Anas", "Bilal", "Zayd"], why: "Abu Musa al-Ash'ari was with the Prophet ﷺ in the garden." },
        { q: "Who came to the gate second?", a: "Umar", wrong: ["Abu Bakr", "Uthman", "Ali"], why: "Abu Bakr first, then Umar, then Uthman." },
        { q: "What did Umar do when he heard the good news?", a: "He praised Allah", wrong: ["He wept", "He ran in", "He went home"], why: "He thanked Allah for it." }
      ]
    },
    {
      slug: "learning-turns",
      title: "Learning in turns",
      line: "Umar and his Ansari neighbor took turns visiting the Prophet ﷺ.",
      facts: ["Each told the other the news", "Told by Umar"],
      source: hadith("bukhari", "89", "Umar ibn al-Khattab", "Sahih", "Umar and his Ansari neighbor took turns going to the Prophet ﷺ, one day each, and each brought the other the news of revelation and more."),
      difficulty: 3,
      questions: [
        { q: "How did Umar and his neighbor make sure they learned everything?", a: "They took turns going to the Prophet ﷺ", wrong: ["They went once a year", "They read old books", "They never went"], why: "One went one day, the other the next." },
        { q: "What did each bring back for the other?", a: "The news of that day", wrong: ["Gold coins", "Dates only", "Nothing at all"], why: "Including what was revealed that day." },
        { q: "Umar's neighbor was one of the Ansar.", tf: true, why: "Umar called him my Ansari neighbor." }
      ]
    },
    {
      slug: "three-knocks",
      title: "Ask three times",
      line: "Abu Musa asked three times, then left; Umar wanted a witness.",
      facts: ["Ask three times, then return", "Abu Sa'id was the witness"],
      source: hadith("bukhari", "6245", "Abu Sa'id al-Khudri", "Sahih", "Abu Musa asked three times to enter on Umar, got no answer and left; Umar asked for a witness to the hadith, and Abu Sa'id testified the Prophet ﷺ said it."),
      difficulty: 3,
      questions: [
        { q: "What should you do if you ask to come in three times with no answer?", a: "Go back home", wrong: ["Knock until they answer", "Walk in anyway", "Shout louder"], why: "The Prophet ﷺ taught to ask three times, then return." },
        { q: "What did Umar ask Abu Musa to bring?", a: "A witness to the hadith", wrong: ["A gift", "A letter from Makkah", "A camel"], why: "Umar was careful about every hadith." },
        { q: "Who stood as the witness?", a: "Abu Sa'id al-Khudri", wrong: ["Abu Jahl", "Khalid ibn al-Walid", "Abu Sufyan"], why: "He was the youngest in the gathering." }
      ]
    },
    {
      slug: "stopped-at-quran",
      title: "He stopped at the Quran",
      line: "Angry at a rude man, Umar stopped when he heard Quran 7:199.",
      facts: ["Forgive and leave the foolish", "Told by Ibn Abbas"],
      source: hadith("bukhari", "4642", "Ibn Abbas", "Sahih", "Uyaynah spoke rudely to Umar, who grew angry; al-Hurr recited Quran 7:199 on forgiving and leaving the foolish, and Umar stopped at it, holding firmly to Allah's Book."),
      difficulty: 4,
      questions: [
        { q: "What calmed Umar when a rude man insulted him?", a: "Hearing Quran 7:199", wrong: ["A cup of milk", "A long walk", "A gift of gold"], why: "Umar always stopped at Allah's Book." },
        { q: "What does Quran 7:199 tell us to do?", a: "Forgive and leave the foolish", wrong: ["Shout back", "Take revenge", "Stop praying"], why: "Hold to forgiveness and command what is right." },
        { q: "Umar went past what the Quran said when he was angry.", tf: false, why: "Ibn Abbas said he did not overlook the ayah." }
      ]
    },
    {
      slug: "ibn-abbas",
      title: "The young scholar",
      line: "Umar sat young Ibn Abbas with the elders who fought at Badr.",
      facts: ["The elders asked why", "Umar tested them on Surah An-Nasr"],
      source: hadith("bukhari", "4970", "Ibn Abbas", "Sahih", "Umar seated young Ibn Abbas with the elders of Badr and asked about Surah An-Nasr; Ibn Abbas said it told of the Prophet's ﷺ death drawing near, and Umar agreed."),
      difficulty: 4,
      questions: [
        { q: "Why did Umar seat young Ibn Abbas with the elders?", a: "For his knowledge", wrong: ["He was his son", "He was rich", "He was the oldest"], why: "Umar valued knowledge over age." },
        { q: "Which surah did Umar ask the elders about?", a: "An-Nasr", wrong: ["Al-Ikhlas", "Al-Fatihah", "Al-Kawthar"], why: "When the help of Allah comes, and the victory (Quran 110:1)." },
        { q: "What did Ibn Abbas say the surah was telling?", a: "The Prophet's ﷺ death was near", wrong: ["Makkah would be lost", "A war was coming", "Rain would fall"], why: "Umar said: I know nothing of it but what you said." }
      ]
    },
    {
      slug: "black-stone",
      title: "Only a stone",
      line: "Umar kissed the Black Stone and said: you are only a stone.",
      facts: ["It cannot harm or benefit", "He did it to follow the Prophet ﷺ"],
      source: hadith("bukhari", "1597", "Abis ibn Rabi'ah", "Sahih", "Umar kissed the Black Stone and said: I know you are a stone that can neither benefit nor harm; had I not seen the Prophet ﷺ kiss you, I would not have kissed you."),
      difficulty: 3,
      questions: [
        { q: "What did Umar say to the Black Stone?", a: "You cannot harm or benefit", wrong: ["You will bless me", "You are from Jannah", "Grant me my wish"], why: "Only Allah brings harm or benefit." },
        { q: "Why did Umar kiss it then?", a: "He saw the Prophet ﷺ kiss it", wrong: ["For good luck", "Because of his dream", "His father told him"], why: "He followed the Sunnah, not his own idea." },
        { q: "Umar believed the stone had power.", tf: false, why: "He said clearly that it is only a stone." }
      ]
    },
    {
      slug: "uways",
      title: "Uways from Yemen",
      line: "Umar found Uways and asked him to pray for his forgiveness.",
      facts: ["The Prophet ﷺ described him", "He was kind to his mother", "From Qaran, in Yemen"],
      source: hadith("muslim", "2542c", "Usayr ibn Jabir", "Sahih", "The Prophet ﷺ told of Uways ibn Amir of Qaran, good to his mother; whoever meets him should ask him to pray for forgiveness for him. Umar found him and asked."),
      difficulty: 4,
      questions: [
        { q: "Where did Uways come from?", a: "Yemen", wrong: ["Sham", "Egypt", "Iraq"], why: "He came with the helpers from Yemen." },
        { q: "What was Uways known for?", a: "Kindness to his mother", wrong: ["Great wealth", "Fighting skill", "Beautiful poems"], why: "The Prophet ﷺ said Uways was good to his mother." },
        { q: "What did Umar ask Uways to do?", a: "Pray for his forgiveness", wrong: ["Lead the army", "Become a judge", "Teach the Quran"], why: "The Prophet ﷺ had told them to ask him." },
        { q: "Uways met the Prophet ﷺ.", tf: false, why: "The Prophet ﷺ described him before Umar ever met him." }
      ]
    },
    {
      slug: "plague",
      title: "The plague in Sham",
      line: "Hearing of plague in Sham, Umar asked advice and turned back.",
      facts: ["From Allah's decree to Allah's decree", "A hadith settled it", "Told by Ibn Abbas"],
      source: hadith("bukhari", "5729", "Ibn Abbas", "Sahih", "Umar consulted the Muhajirun and Ansar about plague in Sham; Abd ar-Rahman ibn Awf told him the Prophet ﷺ said: do not enter a land with plague, and do not leave it if it breaks out where you are."),
      difficulty: 5,
      questions: [
        { q: "What did Umar do before deciding?", a: "He asked the companions' advice", wrong: ["He decided alone", "He sent a spy", "He waited a year"], why: "He called the Muhajirun, then the Ansar, then the elders." },
        { q: "Abu Ubaydah asked: are you running from Allah's decree? What did Umar say?", a: "From His decree to His decree", wrong: ["Yes, I am scared", "No, I am staying", "Ask the Prophet ﷺ"], why: "Taking care is also part of what Allah decrees." },
        { q: "What did the Prophet ﷺ say about a land with plague?", a: "Do not go into it", wrong: ["Go and help there", "Pray outside it", "Leave it at once"], why: "And if it breaks out where you are, do not run away from it." },
        { q: "Who told Umar the hadith about plague?", a: "Abd ar-Rahman ibn Awf", wrong: ["Abu Ubaydah", "Ibn Abbas", "Khalid ibn al-Walid"], why: "He came late and said: I have some knowledge about this." }
      ]
    },
    {
      slug: "martyrdom-dua",
      title: "Umar's dua",
      line: "Umar asked Allah for martyrdom and death in Madinah.",
      facts: ["Martyrdom in Allah's cause", "Death in the city of the Prophet ﷺ"],
      source: hadith("bukhari", "1890", "Aslam", "Sahih", "Umar said: O Allah, grant me martyrdom in Your cause, and let my death be in the city of Your Messenger ﷺ."),
      difficulty: 3,
      questions: [
        { q: "What did Umar ask Allah for?", a: "Martyrdom and death in Madinah", wrong: ["Long life in Makkah", "Great wealth", "Victory over Rome"], why: "Allah answered both." },
        { q: "In which city did Umar want to die?", a: "Madinah", wrong: ["Makkah", "Jerusalem", "Damascus"], why: "The city of the Prophet ﷺ." },
        { q: "Allah gave Umar both things he asked for.", tf: true, why: "He was killed as a martyr in Madinah." }
      ]
    },
    {
      slug: "stabbed",
      title: "Stabbed at prayer",
      line: "Umar was stabbed as he began leading the prayer.",
      facts: ["He had just said the takbir", "Abd ar-Rahman ibn Awf led on", "Umar died at 63"],
      source: hadith("bukhari", "3700", "Amr ibn Maimun", "Sahih", "Umar was stabbed just after the opening takbir of the prayer; he took Abd ar-Rahman ibn Awf's hand to lead the people, who prayed a short prayer."),
      difficulty: 4,
      questions: [
        { q: "When was Umar stabbed?", a: "As he began the prayer", wrong: ["On a journey", "In his sleep", "In battle"], why: "He had just said Allahu Akbar." },
        { q: "Who led the prayer after Umar was stabbed?", a: "Abd ar-Rahman ibn Awf", wrong: ["Uthman", "Ali", "Ibn Abbas"], why: "Umar took his hand and put him forward." },
        { q: "Before starting, Umar would tell the people what?", a: "Stand in straight rows", wrong: ["Pray at home", "Speak loudly", "Hurry up"], why: "He checked the rows before every prayer." },
        { q: "How old was Umar when he died?", a: "63", wrong: ["50", "70", "40"], why: "Like the Prophet ﷺ and Abu Bakr (Sahih Muslim 2348)." }
      ]
    },
    {
      slug: "afraid-of-allah",
      title: "Afraid to meet Allah",
      line: "Dying, Umar called his good standing a favor from Allah.",
      facts: ["Ibn Abbas comforted him", "Gold the size of the earth"],
      source: hadith("bukhari", "3692", "Al-Miswar ibn Makhramah", "Sahih", "When Umar was stabbed, Ibn Abbas comforted him; Umar said the Prophet's ﷺ and Abu Bakr's pleasure with him were Allah's favor, and that if he had gold filling the earth he would ransom himself from Allah's punishment."),
      difficulty: 4,
      questions: [
        { q: "Who comforted Umar after he was stabbed?", a: "Ibn Abbas", wrong: ["Uthman", "Hafsah", "Abu Ubaydah"], why: "He reminded Umar the Prophet ﷺ and Abu Bakr were pleased with him." },
        { q: "What did Umar call their being pleased with him?", a: "A favor from Allah", wrong: ["His own reward", "Good luck", "A small thing"], why: "He did not rely on his deeds." },
        { q: "Umar said he would give gold filling the earth to be saved from what?", a: "Allah's punishment", wrong: ["Death", "Poverty", "His killer"], why: "Even Umar feared standing before Allah." }
      ]
    },
    {
      slug: "two-companions",
      title: "Beside his two companions",
      line: "Umar asked Aishah to be buried beside his two companions.",
      facts: ["The Prophet ﷺ and Abu Bakr", "Don't say: Chief of the Believers", "He asked for his debts to be paid"],
      source: hadith("bukhari", "3700", "Amr ibn Maimun", "Sahih", "Umar sent his son to ask Aishah's permission to be buried with his two companions, and told him not to call him the Chief of the Believers. He also had his debts counted and paid."),
      difficulty: 5,
      questions: [
        { q: "Whom did Umar mean by his two companions?", a: "The Prophet ﷺ and Abu Bakr", wrong: ["Uthman and Ali", "Hafsah and Aishah", "Bilal and Salman"], why: "He asked to be buried in the same room." },
        { q: "Why did Umar tell his son not to say 'Chief of the Believers'?", a: "He was no longer their chief", wrong: ["He did not like the title", "Aishah did not know him", "It was too long"], why: "He asked as plain Umar ibn al-Khattab." },
        { q: "What did Umar ask his son to do about his debts?", a: "Pay them from the family's wealth", wrong: ["Forget them", "Take it from the treasury", "Ask the Romans"], why: "His debt was about eighty-six thousand." },
        { q: "Aishah refused his request.", tf: false, why: "She agreed, putting him before herself." }
      ]
    },
    {
      slug: "his-debts",
      title: "Pay my debts",
      line: "Dying, Umar told his son to pay all his debts.",
      facts: ["About 86,000 owed", "Ask no one but his people"],
      source: hadith("bukhari", "3700", "Amr ibn Maimun", "Sahih", "Umar had his debts counted, about eighty-six thousand, and told Abdullah to pay them from his family's property, then from Banu Adi, then Quraysh, and no one else."),
      difficulty: 4,
      questions: [
        { q: "What did Umar ask his son to do before he died?", a: "Pay all his debts", wrong: ["Build him a palace", "Forget his debts", "Become caliph"], why: "He did not want to meet Allah owing anyone." },
        { q: "Whose money should pay the debts first?", a: "Umar's own family's", wrong: ["The treasury's", "The Romans'", "Any stranger's"], why: "Then his clan, then Quraysh, and no one else." },
        { q: "Umar's debts were about eighty-six thousand.", tf: true, why: "His son had them counted." }
      ]
    },
    {
      slug: "lift-your-clothes",
      title: "Advice to a young man",
      line: "Even while dying, Umar gently advised a young man.",
      facts: ["Keeps clothes clean", "And is better before Allah"],
      source: hadith("bukhari", "3700", "Amr ibn Maimun", "Sahih", "As a young man turned away, his clothes touching the ground, the dying Umar called him back: lift your clothes, for that keeps them clean and protects you before your Lord."),
      difficulty: 4,
      questions: [
        { q: "What did Umar notice about the young man?", a: "His clothes touched the ground", wrong: ["He had no shoes", "He was crying", "He was laughing"], why: "He called him back to advise him." },
        { q: "What two good things did Umar say lifting them brings?", a: "Clean clothes and safety before Allah", wrong: ["Money and fame", "Speed and strength", "Nothing at all"], why: "He gave advice even on his deathbed." },
        { q: "Umar stopped giving good advice once he was hurt.", tf: false, why: "He advised the young man while dying." }
      ]
    },
    {
      slug: "with-those-you-love",
      title: "With those you love",
      line: "Anas loved Abu Bakr and Umar, hoping to be with them.",
      facts: ["You will be with those you love", "Told by Anas"],
      source: hadith("bukhari", "3688", "Anas ibn Malik", "Sahih", "The Prophet ﷺ told a man: you will be with those you love; Anas said: I love the Prophet ﷺ, Abu Bakr and Umar, and hope to be with them."),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ promise a man who loved Allah and His Messenger?", a: "You will be with those you love", wrong: ["You will be rich", "You will never be sick", "You will be a king"], why: "Love brings people together in the Hereafter." },
        { q: "Whom did Anas say he loved, hoping to be with them?", a: "The Prophet ﷺ, Abu Bakr and Umar", wrong: ["Abu Lahab", "Only himself", "No one"], why: "Even though his deeds were not like theirs." },
        { q: "The companions were very happy to hear they will be with those they love.", tf: true, why: "Anas said nothing made them gladder." }
      ]
    },
    {
      slug: "most-generous",
      title: "No one like Umar",
      line: "Ibn Umar saw no one more generous than his father, Umar.",
      facts: ["After the Prophet ﷺ died", "Told by Aslam"],
      source: hadith("bukhari", "3687", "Aslam", "Sahih", "Ibn Umar said: since the Prophet ﷺ died, I never saw anyone more serious, hard working and generous than Umar."),
      difficulty: 3,
      questions: [
        { q: "How did Ibn Umar describe his father?", a: "Serious, hard working and generous", wrong: ["Lazy and slow", "Rich and proud", "Quiet and shy"], why: "No one after the Prophet ﷺ was more so." },
        { q: "Who said no one after the Prophet ﷺ was as generous as Umar?", a: "His son Abdullah", wrong: ["Abu Jahl", "Khalid", "Bilal"], why: "Ibn Umar told it to Aslam." },
        { q: "Ibn Umar compared Umar with people after the Prophet ﷺ died.", tf: true, why: "Since the Prophet ﷺ died, he saw no one like him." }
      ]
    }
  ]
};

const mulk = (number: number) => ayah(number, 67);

const MULK: DeepUnit = {
  key: "mulk",
  topicId: "quran_tafseer",
  branchId: "quran-surah-mulk",
  name: "Al-Mulk",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Mulk",
  lessons: [
    {
      slug: "intercedes",
      title: "The surah that pleads",
      line: "A surah of thirty ayahs pleads for its reader until forgiven.",
      facts: ["It is Surah Al-Mulk", "Also called Tabarak"],
      source: hadith("tirmidhi", "2891", "Abu Hurayrah", "Hasan (Darussalam)", "The Prophet ﷺ said: there is a surah in the Quran of thirty ayahs which intercedes for a man until he is forgiven: Tabarak alladhi biyadihil-mulk."),
      difficulty: 2,
      questions: [
        { q: "How many ayahs does Surah Al-Mulk have?", a: "Thirty", wrong: ["Seven", "Forty", "Twelve"], why: "The Prophet ﷺ called it a surah of thirty ayahs." },
        { q: "What does Al-Mulk do for the one who reads it?", a: "Pleads for him until forgiven", wrong: ["Makes him rich", "Gives him long life", "Stops all tests"], why: "It intercedes for its reader." },
        { q: "Surah Al-Mulk begins with the word Tabarak.", tf: true, why: "Tabarak alladhi biyadihil-mulk: blessed is He in whose hand is the dominion." }
      ]
    },
    {
      slug: "dominion",
      title: "All rule is His",
      line: "All rule is in Allah's hand; none can undo what He decides.",
      quote: mulk(1),
      source: ibnKathir(1, "Allah glorifies Himself and tells that the dominion is in His Hand: He deals with His creation as He wills, and none can reverse His decree.", 67),
      difficulty: 2,
      questions: [
        { q: "What does Al-Mulk mean?", a: "The dominion, all rule", wrong: ["The angels", "The prayer", "The night"], why: "All power over creation belongs to Allah." },
        { q: "Ibn Kathir says who can reverse Allah's decree?", a: "No one", wrong: ["The angels", "Kings", "The prophets"], why: "He deals with His creation as He wills." },
        { q: "The ayah ends: He is able to do ____.", a: "all things", wrong: ["some things", "most things", "nothing"], why: "Wa huwa 'ala kulli shay'in qadir." }
      ]
    },
    {
      slug: "the-test",
      title: "Life is a test",
      line: "Allah made death and life to test who does the best deeds.",
      facts: ["Best deeds, not most deeds", "He is Almighty and Forgiving"],
      quote: mulk(2),
      source: ibnKathir(2, "He brought creation into being to test them, to see which of them is best in deeds. Allah did not say which of you does the most deeds.", 67),
      difficulty: 3,
      questions: [
        { q: "Why did Allah create death and life?", a: "To test us", wrong: ["To scare us", "For no reason", "To fill the earth"], why: "To test which of you is best in deed." },
        { q: "Ibn Kathir points out the ayah says best deeds, not what?", a: "Most deeds", wrong: ["Hardest deeds", "Secret deeds", "First deeds"], why: "Doing deeds well matters more than doing many." },
        { q: "Allah is Almighty, yet He forgives those who turn to Him.", tf: true, why: "Al-Aziz al-Ghafur: Almighty and Oft-Forgiving." }
      ]
    },
    {
      slug: "seven-heavens",
      title: "No flaw in the sky",
      line: "Look at the seven heavens again: you will find no flaw.",
      facts: ["Seven heavens, one above another", "Look again, and again"],
      quote: mulk(3),
      source: ibnKathir(3, "Allah created seven heavens stacked one above the other; no fault is seen in His creation, and the eye that searches again and again returns tired and humbled.", 67),
      difficulty: 3,
      questions: [
        { q: "How many heavens did Allah create?", a: "Seven", wrong: ["Three", "Ten", "One"], why: "Seven heavens, one above the other." },
        { q: "What will you find if you look for a flaw in the sky?", a: "No flaw at all", wrong: ["Some cracks", "One small gap", "Many holes"], why: "There is no fault in the creation of Ar-Rahman." },
        { q: "How does the eye come back after searching again and again?", a: "Tired and humbled", wrong: ["Proud", "Full of answers", "Angry"], why: "It finds nothing wrong and returns worn out." }
      ]
    },
    {
      slug: "stars",
      title: "Why the stars",
      line: "Qatadah said the stars are beauty, missiles and travel signs.",
      facts: ["Beauty for the sky", "Missiles at the devils", "Signs to find the way"],
      source: ibnKathir(5, "Qatadah said the stars were created for three things: an adornment for the sky, missiles against the devils, and signs for finding the way.", 67),
      difficulty: 4,
      questions: [
        { q: "Which is NOT one of the three purposes of the stars Qatadah gave?", a: "Telling the future", wrong: ["Beauty for the sky", "Missiles at the devils", "Signs to find the way"], why: "Qatadah warned against claiming any other meaning for them." },
        { q: "Ayah 5 calls the stars what?", a: "Lamps", wrong: ["Eyes", "Gates", "Seeds"], why: "We adorned the nearest heaven with lamps." },
        { q: "Stars help travellers find their way.", tf: true, why: "Signs for navigation, as Qatadah said." }
      ]
    },
    {
      slug: "the-warner",
      title: "Did no warner come?",
      line: "Hell's keepers ask: did no warner come to you?",
      facts: ["They say: yes, but we denied", "No punishment before a messenger"],
      source: ibnKathir(8, "Allah reminds of His justice: He does not punish anyone until the proof is set and a messenger is sent (Quran 17:15).", 67),
      difficulty: 4,
      questions: [
        { q: "What do Hell's keepers ask each group?", a: "Did no warner come to you?", wrong: ["Who are you?", "Are you sorry?", "Where is your money?"], why: "And they answer: yes, a warner came, but we denied him." },
        { q: "Ibn Kathir says Allah does not punish until what?", a: "A messenger has been sent", wrong: ["The person is old", "The person asks", "The angels agree"], why: "Allah's justice: the proof comes first (Quran 17:15)." },
        { q: "They say: had we listened or used our ____.", a: "minds", wrong: ["money", "swords", "friends"], why: "We would not be among the people of the Fire." }
      ]
    },
    {
      slug: "unseen",
      title: "Fearing Allah unseen",
      line: "Whoever fears Allah unseen gets forgiveness and a great reward.",
      facts: ["When no one else sees", "Like secret charity"],
      source: ibnKathir(12, "This is the one who fears his Lord when no one sees him but Allah, leaving sins and doing good; his sins are forgiven and he is greatly rewarded.", 67),
      difficulty: 3,
      questions: [
        { q: "What does fearing Allah unseen mean?", a: "Obeying Him when nobody sees", wrong: ["Hiding from people", "Never speaking", "Praying only at night"], why: "Only Allah sees him, and he still obeys." },
        { q: "What is promised to them?", a: "Forgiveness and a great reward", wrong: ["Fame", "Riches", "Long life"], why: "Their sins are wiped out and their reward is big." },
        { q: "Ibn Kathir compares this to whom, from the seven in Allah's shade?", a: "One who gives charity in secret", wrong: ["A strong king", "A famous scholar", "A rich trader"], why: "His left hand does not know what his right hand gave." }
      ]
    },
    {
      slug: "knows-secrets",
      title: "He knows the hearts",
      line: "Whisper or speak aloud: Allah knows what is in the hearts.",
      facts: ["Does the Creator not know?", "Al-Latif, Al-Khabir"],
      quote: mulk(14),
      source: ibnKathir(13, "Whether you keep your talk secret or say it openly, He knows what is in the hearts. Does the One who created not know?", 67),
      difficulty: 3,
      questions: [
        { q: "Allah knows our words if we say them how?", a: "Secretly or aloud", wrong: ["Only aloud", "Only in prayer", "Only in Arabic"], why: "He knows what is in the hearts." },
        { q: "Finish the ayah: Does the One who ____ not know?", a: "created", wrong: ["rules", "hears", "sees"], why: "Ala ya'lamu man khalaq: the Creator surely knows." },
        { q: "Al-Khabir means what?", a: "The All-Aware", wrong: ["The Most Strong", "The First", "The King"], why: "He knows the hidden side of everything." }
      ]
    },
    {
      slug: "earth",
      title: "Walk and eat",
      line: "The earth is made easy: walk on it, eat His provision.",
      facts: ["Work, and trust Allah", "Birds leave hungry, come back full"],
      quote: mulk(15),
      source: ibnKathir(15, "Travel and seek a living, but know your efforts only help if Allah makes it easy; using means does not cancel trusting Allah, as in the hadith of the birds (Jami at-Tirmidhi 2344).", 67),
      difficulty: 4,
      questions: [
        { q: "What does the ayah tell us to do on the earth?", a: "Walk its paths and eat", wrong: ["Stay in one place", "Only pray", "Build palaces"], why: "Walk in its paths and eat of His provision." },
        { q: "In the hadith, birds leave in the morning how?", a: "Hungry", wrong: ["Full", "Sleepy", "Scared"], why: "They leave hungry and return full, trusting Allah." },
        { q: "Ibn Kathir says working hard means you do not need to trust Allah.", tf: false, why: "Using means does not cancel trusting Allah." },
        { q: "What does the ayah end with?", a: "To Him is the return", wrong: ["To Him is the sky", "He is the Lord of Makkah", "Eat and drink"], why: "Wa ilayhin-nushur: to Him you will be raised." }
      ]
    },
    {
      slug: "birds",
      title: "Who holds the birds up?",
      line: "None holds the birds up in the sky but Ar-Rahman.",
      facts: ["Wings spread, then folded", "Out of His mercy"],
      quote: mulk(19),
      source: ibnKathir(19, "Birds spread and fold their wings in flight; Allah holds them up in the air, making the air serve them out of His mercy.", 67),
      difficulty: 3,
      questions: [
        { q: "Who holds the birds up in the air?", a: "Ar-Rahman", wrong: ["The wind alone", "The angels", "Nothing at all"], why: "None upholds them except the Most Merciful." },
        { q: "What do the birds do with their wings in the ayah?", a: "Spread and fold them", wrong: ["Hide them", "Lose them", "Wash them"], why: "Saffat wa yaqbidn: spreading and folding." },
        { q: "Ibn Kathir says Allah keeps them up out of His ____.", a: "mercy", wrong: ["anger", "need", "fear"], why: "He makes the air serve them out of mercy." }
      ]
    },
    {
      slug: "on-his-face",
      title: "Walking face down",
      line: "Who is better guided: one face down, or one walking upright?",
      facts: ["Face down: the disbeliever", "Upright: the believer"],
      quote: mulk(22),
      source: ibnKathir(22, "A parable of the disbeliever, who walks bent on his face not knowing where he goes, and the believer, who walks upright on a straight path, in this life and the next.", 67),
      difficulty: 4,
      questions: [
        { q: "In the parable, who walks face down?", a: "The disbeliever", wrong: ["The believer", "The traveller", "The angel"], why: "He is lost and does not see where he goes." },
        { q: "Who walks upright on a straight path?", a: "The believer", wrong: ["The king", "The disbeliever", "The scholar only"], why: "He is straight inside, and his path is straight." },
        { q: "Ibn Kathir says this picture is true only in this life.", tf: false, why: "It is the same on the Day of Judgement too." }
      ]
    },
    {
      slug: "water",
      title: "If your water sank away",
      line: "If your water sank away, who could bring you flowing water?",
      facts: ["Only Allah", "Water is His favor"],
      quote: mulk(30),
      source: ibnKathir(30, "If the water sank deep into the earth, no axe or strong arm could reach it; only Allah brings flowing water, out of His favor.", 67),
      difficulty: 3,
      questions: [
        { q: "Who can bring back water that sank deep into the earth?", a: "Only Allah", wrong: ["Strong workers", "Kings", "Nobody needs to"], why: "No tool or strong arm could reach it." },
        { q: "What kind of water does the last ayah ask about?", a: "Flowing water", wrong: ["Salty water", "Frozen water", "Rain only"], why: "Ma'in: water that springs and flows." },
        { q: "Ibn Kathir ends: so to Allah belongs all the ____.", a: "praise", wrong: ["land", "gold", "armies"], why: "Water is from His grace, so all praise is His." }
      ]
    }
  ]
};

const UTHMAN: DeepUnit = {
  key: "uthman",
  topicId: "sahabah",
  branchId: "sahabi-uthman-ibn-affan",
  name: "Uthman",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "third",
      title: "Third in rank",
      line: "The companions ranked Abu Bakr first, then Umar, then Uthman.",
      facts: ["In the Prophet's ﷺ lifetime", "Told by Ibn Umar"],
      source: hadith("bukhari", "3697", "Ibn Umar", "Sahih", "In the Prophet's ﷺ lifetime we considered no one equal to Abu Bakr, then Umar, then Uthman."),
      difficulty: 2,
      questions: [
        { q: "In the Prophet's ﷺ lifetime, who did the companions rank third?", a: "Uthman", wrong: ["Ali", "Bilal", "Khalid"], why: "Abu Bakr, then Umar, then Uthman." },
        { q: "Who did they rank first?", a: "Abu Bakr", wrong: ["Umar", "Uthman", "Ali"], why: "No one was seen as equal to Abu Bakr." },
        { q: "Which companion told how they ranked them?", a: "Ibn Umar", wrong: ["Anas", "Aishah", "Abu Hurayrah"], why: "Abdullah ibn Umar narrated it." }
      ]
    },
    {
      slug: "modesty",
      title: "Even angels are shy",
      line: "The Prophet ﷺ said: even the angels are shy before Uthman.",
      facts: ["He fixed his clothes for Uthman", "Told by Aishah"],
      source: hadith("muslim", "2401", "Aishah", "Sahih", "When Uthman asked to come in, the Prophet ﷺ sat up and set his clothes right, and said: should I not be shy before one whom even the angels are shy before?"),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ do when Uthman asked to come in?", a: "He sat up and fixed his clothes", wrong: ["He stood at the door", "He sent him away", "He kept lying down"], why: "He had not done so for Abu Bakr or Umar." },
        { q: "Why did he do that for Uthman?", a: "Even the angels are shy before him", wrong: ["Uthman was a guest", "Uthman was the oldest", "It was cold"], why: "Uthman was known for his great modesty." },
        { q: "Who noticed this and asked about it?", a: "Aishah", wrong: ["Fatimah", "Hafsah", "Umm Salamah"], why: "It was in her room." }
      ]
    },
    {
      slug: "badr",
      title: "Why he missed Badr",
      line: "Uthman missed Badr to nurse his wife, the Prophet's ﷺ daughter.",
      facts: ["Same reward as those at Badr", "Ibn Umar answered a critic"],
      source: hadith("bukhari", "3698", "Uthman ibn Mawhab", "Sahih", "Ibn Umar explained that Uthman missed Badr because his wife, the Prophet's ﷺ daughter, was ill; the Prophet ﷺ told him he would have the reward and share of those at Badr."),
      difficulty: 3,
      questions: [
        { q: "Why did Uthman not fight at Badr?", a: "His wife was ill", wrong: ["He was afraid", "He was travelling", "He was too old"], why: "She was the daughter of the Prophet ﷺ." },
        { q: "What did the Prophet ﷺ promise Uthman for staying?", a: "The reward of those at Badr", wrong: ["Nothing at all", "A new house", "To lead the next army"], why: "He got the same reward and share." },
        { q: "Uthman's wife was the Prophet's ﷺ daughter.", tf: true, why: "Ibn Umar said so in his answer." }
      ]
    },
    {
      slug: "his-hand",
      title: "This is Uthman's hand",
      line: "At the pledge, the Prophet ﷺ said: this hand is Uthman's.",
      facts: ["Uthman was sent to Makkah", "No one there more respected"],
      source: hadith("bukhari", "3698", "Uthman ibn Mawhab", "Sahih", "Uthman was the Prophet's ﷺ envoy in Makkah during the pledge of Ridwan; the Prophet ﷺ held up his right hand and said: this is Uthman's hand, and pledged for him."),
      difficulty: 4,
      questions: [
        { q: "Where was Uthman during the pledge of Ridwan?", a: "In Makkah, sent by the Prophet ﷺ", wrong: ["Sick at home", "In Abyssinia", "In Madinah"], why: "No one in Makkah was more respected than him." },
        { q: "What did the Prophet ﷺ say about his own right hand?", a: "This is Uthman's hand", wrong: ["This is my best hand", "This is for Abu Bakr", "This is for the Ansar"], why: "He made the pledge for Uthman himself." },
        { q: "Uthman missed the pledge because he did not care.", tf: false, why: "He was away on the Prophet's ﷺ own mission." }
      ]
    },
    {
      slug: "rumah",
      title: "The well of Rumah",
      line: "Uthman bought the well of Rumah and equipped a whole army.",
      facts: ["Both were promised Jannah", "The army of hardship: Tabuk"],
      source: hadith("bukhari", "2778", "Abu Abdur-Rahman as-Sulami", "Sahih", "Uthman reminded the companions that the Prophet ﷺ promised Paradise to whoever dug the well of Rumah and to whoever equipped the army of hardship, and he had done both; they confirmed it."),
      difficulty: 3,
      questions: [
        { q: "What did Uthman buy for the Muslims?", a: "The well of Rumah", wrong: ["A market", "A ship", "A fort"], why: "So people could drink freely." },
        { q: "Which army did Uthman equip?", a: "The army of hardship", wrong: ["The army of Badr", "The army of Uhud", "The army of Yamamah"], why: "It went to Tabuk in a time of hardship." },
        { q: "What did the Prophet ﷺ promise for these deeds?", a: "Jannah", wrong: ["Riches", "Leadership", "A long life"], why: "The companions confirmed Uthman did both." }
      ]
    },
    {
      slug: "thousand",
      title: "A thousand dinars",
      line: "Uthman poured a thousand dinars into the Prophet's ﷺ lap.",
      facts: ["For the army of hardship", "Said twice by the Prophet ﷺ"],
      source: hadith("tirmidhi", "3701", "Abd ar-Rahman ibn Samurah", "Hasan (Darussalam)", "Uthman brought a thousand dinars for the army of hardship and poured them into the Prophet's ﷺ lap; he turned them over and said twice: whatever Uthman does after today will not harm him."),
      difficulty: 4,
      questions: [
        { q: "How many dinars did Uthman bring?", a: "A thousand", wrong: ["A hundred", "Ten", "Fifty"], why: "He poured them into the Prophet's ﷺ lap." },
        { q: "What did the Prophet ﷺ say about Uthman that day?", a: "Nothing he does after today will harm him", wrong: ["Give no more", "You are the richest", "Keep half for yourself"], why: "He said it twice." },
        { q: "The money was for which army?", a: "The army of hardship", wrong: ["The army of Badr", "The army to Sham", "The army of Khaybar"], why: "The Tabuk expedition, in a hard year." }
      ]
    },
    {
      slug: "gate",
      title: "Jannah, with a trial",
      line: "Uthman was told: Jannah is yours, after a trial will strike you.",
      facts: ["Third at the garden gate", "He said: Allah's help is sought"],
      source: hadith("bukhari", "3693", "Abu Musa", "Sahih", "At the garden gate, the Prophet ﷺ told Abu Musa to give Uthman good news of Paradise with a calamity that would strike him; Uthman praised Allah and said: Allah's help is sought."),
      difficulty: 4,
      questions: [
        { q: "What came with Uthman's good news of Jannah?", a: "A trial that would strike him", wrong: ["Great wealth", "A long journey", "A new name"], why: "The Prophet ﷺ told of a calamity to come." },
        { q: "What did Uthman say when he heard?", a: "Allah's help is sought", wrong: ["Why me?", "I am afraid", "Tell no one"], why: "He praised Allah and asked for His help." },
        { q: "Who came to the gate before Uthman?", a: "Abu Bakr and Umar", wrong: ["Ali and Talhah", "No one", "Bilal"], why: "Abu Bakr, then Umar, then Uthman." }
      ]
    },
    {
      slug: "uhud",
      title: "A martyr on Uhud",
      line: "On Uhud, the Prophet ﷺ named Uthman one of two martyrs.",
      facts: ["With the Prophet ﷺ, Abu Bakr, Umar", "Be firm, O Uhud"],
      source: hadith("bukhari", "3686", "Anas ibn Malik", "Sahih", "Uhud shook under the Prophet ﷺ, Abu Bakr, Umar and Uthman; he said: be firm, Uhud, for on you are a Prophet, a Siddiq and two martyrs."),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ call Uthman on Uhud?", a: "A martyr", wrong: ["A siddiq", "A prophet", "A king"], why: "The two martyrs were Umar and Uthman." },
        { q: "Who reported this from the Prophet ﷺ?", a: "Anas ibn Malik", wrong: ["Uthman himself", "Ibn Abbas", "Abu Dharr"], why: "Anas was the Prophet's ﷺ servant." },
        { q: "Uthman later died as a martyr.", tf: true, why: "As the Prophet ﷺ foretold." }
      ]
    },
    {
      slug: "forgiven",
      title: "Allah forgave him",
      line: "Ibn Umar said Allah forgave Uthman for what he did at Uhud.",
      facts: ["Quran 3:155", "Ibn Umar defended him"],
      source: hadith("bukhari", "3698", "Uthman ibn Mawhab", "Sahih", "Asked about Uthman at Uhud, Ibn Umar testified that Allah had excused and forgiven him."),
      difficulty: 4,
      questions: [
        { q: "What did Ibn Umar say about Uthman at Uhud?", a: "Allah forgave him", wrong: ["He was never forgiven", "He won the battle alone", "He was not a Muslim"], why: "Allah excused and forgave him, as Quran 3:155 says." },
        { q: "Who defended Uthman when a man spoke against him?", a: "Ibn Umar", wrong: ["Abu Sufyan", "Abu Lahab", "No one"], why: "He answered each of the man's three points." },
        { q: "When Allah forgives someone, we should not blame them for it.", tf: true, why: "Ibn Umar made the man see Uthman's honor." }
      ]
    },
    {
      slug: "the-six",
      title: "One of the six",
      line: "Dying, Umar named six men, Uthman among them, to pick a caliph.",
      facts: ["The Prophet ﷺ was pleased with them", "Ali was one of them too"],
      source: hadith("bukhari", "3700", "Amr ibn Maimun", "Sahih", "Umar named Ali, Uthman, az-Zubayr, Talhah, Sa'd and Abd ar-Rahman, with whom the Prophet ﷺ was pleased when he died, to choose the next caliph."),
      difficulty: 3,
      questions: [
        { q: "How many men did Umar name to choose the next caliph?", a: "Six", wrong: ["Two", "Ten", "One"], why: "Ali, Uthman, az-Zubayr, Talhah, Sa'd and Abd ar-Rahman." },
        { q: "Why did Umar choose these men?", a: "The Prophet ﷺ was pleased with them", wrong: ["They were the oldest", "They were the richest", "They lived nearest"], why: "He was pleased with them when he died." },
        { q: "Ali and Uthman were both among the six.", tf: true, why: "Umar named them both." }
      ]
    },
    {
      slug: "the-pledge",
      title: "Everyone pledged to him",
      line: "Abd ar-Rahman ibn Awf asked the people, then pledged to Uthman.",
      facts: ["Three nights of asking", "Then all the Muslims pledged"],
      source: hadith("bukhari", "7207", "Al-Miswar ibn Makhramah", "Sahih", "Abd ar-Rahman ibn Awf consulted the people for three nights, found they held no one equal to Uthman, and pledged to him; then all the Muslims pledged."),
      difficulty: 4,
      questions: [
        { q: "Who asked the people whom they wanted as caliph?", a: "Abd ar-Rahman ibn Awf", wrong: ["Abu Sufyan", "Mu'awiyah", "Khalid"], why: "The six let him decide for them." },
        { q: "How long did he spend asking people?", a: "Three nights", wrong: ["One hour", "A whole year", "No time at all"], why: "He barely slept those three nights." },
        { q: "Whom did the people see as best for the job?", a: "Uthman", wrong: ["Abu Hurayrah", "Anas", "Bilal"], why: "They held no one equal to Uthman." }
      ]
    },
    {
      slug: "third-adhan",
      title: "A new call for Jumu'ah",
      line: "As Madinah grew, Uthman added a call before Jumu'ah.",
      facts: ["Called out at az-Zawra", "Told by as-Sa'ib ibn Yazid"],
      source: hadith("bukhari", "916", "As-Sa'ib ibn Yazid", "Sahih", "When the people grew in number in Uthman's time, he added a third call for the Friday prayer, given at az-Zawra."),
      difficulty: 4,
      questions: [
        { q: "Why did Uthman add another call before Jumu'ah?", a: "The people had grown in number", wrong: ["The masjid burned", "It rained a lot", "He lost his voice"], why: "More people needed to hear it in time." },
        { q: "Where was the new call given?", a: "At az-Zawra", wrong: ["In Makkah", "In Kufa", "In Damascus"], why: "Az-Zawra was a place by the market of Madinah." },
        { q: "Which prayer was the new call for?", a: "The Friday prayer", wrong: ["Fajr", "Eid", "The funeral prayer"], why: "It was for Jumu'ah." }
      ]
    },
    {
      slug: "one-mushaf",
      title: "One Quran for all",
      line: "Uthman had the Quran copied and sent a copy to each land.",
      facts: ["Hudhayfah feared differences", "From Hafsah's pages"],
      source: hadith("bukhari", "4987", "Anas ibn Malik", "Sahih", "Hudhayfah feared people would differ over the Quran, so Uthman took Hafsah's pages, had Zayd ibn Thabit and others write copies, and sent one to every province."),
      difficulty: 4,
      questions: [
        { q: "Who warned Uthman that people were differing over the Quran?", a: "Hudhayfah ibn al-Yaman", wrong: ["Ali", "Abu Hurayrah", "Ibn Mas'ud"], why: "He saw it among the armies of Sham and Iraq." },
        { q: "Whose pages of the Quran did Uthman copy from?", a: "Hafsah's", wrong: ["Aishah's", "His own", "Ali's"], why: "They were the pages gathered under Abu Bakr." },
        { q: "Who led the writing of the copies?", a: "Zayd ibn Thabit", wrong: ["Ubayy ibn Ka'b", "Mu'awiyah", "Bilal"], why: "With three men of Quraysh." },
        { q: "Where did the copies go?", a: "One to each land", wrong: ["Only to Makkah", "Only to Madinah", "They were hidden"], why: "So every land had the same Quran." }
      ]
    },
    {
      slug: "quraysh-tongue",
      title: "In the tongue of Quraysh",
      line: "If the writers differed, Uthman said: write it as Quraysh speak.",
      facts: ["The Quran came in their tongue"],
      source: hadith("bukhari", "4987", "Anas ibn Malik", "Sahih", "Uthman told the three Qurayshi writers: if you differ with Zayd on anything of the Quran, write it in the tongue of Quraysh, for it was revealed in their tongue."),
      difficulty: 5,
      questions: [
        { q: "In whose way of speaking did Uthman say to write?", a: "Quraysh", wrong: ["The Ansar", "Yemen", "Banu Tamim"], why: "The Quran came down in their tongue." },
        { q: "When should they use it?", a: "If they differed with Zayd", wrong: ["Always for names", "Never", "Only for stories"], why: "It settled any difference in writing." },
        { q: "The Quran was revealed in the tongue of Quraysh.", tf: true, why: "Uthman said so to the writers." }
      ]
    },
    {
      slug: "lost-verse",
      title: "The ayah they searched for",
      line: "Zayd sought one ayah of Al-Ahzab and found it with Khuzaymah.",
      facts: ["Quran 33:23", "Zayd ibn Thabit wrote the copies"],
      source: hadith("bukhari", "4988", "Zayd ibn Thabit", "Sahih", "Zayd missed an ayah of Al-Ahzab that he had heard the Prophet ﷺ recite, searched for it, and found it with Khuzaymah ibn Thabit: among the believers are men true to their covenant with Allah."),
      difficulty: 5,
      questions: [
        { q: "Who found the ayah of Al-Ahzab that Zayd searched for?", a: "Khuzaymah ibn Thabit", wrong: ["Abu Jahl", "Abu Sufyan", "Umayyah ibn Khalaf"], why: "Zayd had heard the Prophet ﷺ recite it." },
        { q: "Who wrote out Uthman's copies of the Quran?", a: "Zayd ibn Thabit", wrong: ["Khalid ibn al-Walid", "Bilal", "Salman"], why: "He led the writers." },
        { q: "That ayah praises men true to their promise to Allah.", tf: true, why: "Quran 33:23." }
      ]
    },
    {
      slug: "wudu",
      title: "Uthman's wudu",
      line: "Uthman showed people the Prophet's ﷺ wudu, step by step.",
      facts: ["Each part washed three times", "Then two rak'ahs, fully focused"],
      source: hadith("bukhari", "159", "Humran", "Sahih", "Uthman made wudu, washing each part three times, and said the Prophet ﷺ said: whoever makes wudu like this and prays two rak'ahs without his mind wandering, his past sins are forgiven."),
      difficulty: 3,
      questions: [
        { q: "How many times did Uthman wash his face?", a: "Three", wrong: ["One", "Two", "Five"], why: "He washed hands, face, arms and feet three times." },
        { q: "What is the reward for this wudu and two focused rak'ahs?", a: "Past sins forgiven", wrong: ["A palace", "Wealth", "Rain"], why: "If the mind does not wander in them." },
        { q: "Who watched Uthman and told it?", a: "Humran", wrong: ["Anas", "Ibn Umar", "Salman"], why: "Humran was Uthman's freed servant." }
      ]
    },
    {
      slug: "best-of-you",
      title: "Learn it, teach it",
      line: "The best of you learn the Quran and teach it.",
      facts: ["Said by the Prophet ﷺ", "Told by Uthman"],
      source: hadith("bukhari", "5027", "Uthman ibn Affan", "Sahih", "The Prophet ﷺ said: the best among you are those who learn the Quran and teach it."),
      difficulty: 2,
      questions: [
        { q: "Who are the best, in the hadith Uthman told?", a: "Those who learn and teach the Quran", wrong: ["The richest", "The strongest", "The oldest"], why: "Learning it and passing it on." },
        { q: "Which companion narrated it?", a: "Uthman", wrong: ["Umar", "Ali", "Abu Bakr"], why: "Uthman, who gave the ummah one written Quran." },
        { q: "Only learning the Quran is enough; teaching it does not matter.", tf: false, why: "The best do both." }
      ]
    }
  ]
};

const ALI: DeepUnit = {
  key: "ali",
  topicId: "sahabah",
  branchId: "sahabi-ali-ibn-abi-talib",
  name: "Ali",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "abu-turab",
      title: "Abu Turab",
      line: "The Prophet ﷺ found Ali dusty in the masjid: get up, Abu Turab!",
      facts: ["Abu Turab: man of dust", "His favorite name"],
      source: hadith("bukhari", "3703", "Sahl ibn Sa'd", "Sahih", "The Prophet ﷺ found Ali asleep in the masjid with dust on his back, wiped it off and said: get up, O Abu Turab. No name was dearer to Ali."),
      difficulty: 2,
      questions: [
        { q: "What does Abu Turab mean?", a: "Man of dust", wrong: ["Man of the sword", "Father of lions", "Man of light"], why: "Dust had covered Ali's back as he slept." },
        { q: "Where was Ali sleeping?", a: "In the masjid", wrong: ["In the desert", "In a tent", "Under a tree"], why: "Fatimah told the Prophet ﷺ he was there." },
        { q: "Ali disliked the name Abu Turab.", tf: false, why: "No name was dearer to him." }
      ]
    },
    {
      slug: "the-cloak",
      title: "Under the cloak",
      line: "The Prophet ﷺ took Ali, Fatimah, Hasan and Husayn in his cloak.",
      facts: ["Then recited Quran 33:33", "Told by Aishah"],
      source: hadith("muslim", "2424", "Aishah", "Sahih", "The Prophet ﷺ went out in a striped cloak; he took Hasan, Husayn, Fatimah and Ali under it, then recited: Allah wishes only to remove impurity from you, people of the household."),
      difficulty: 3,
      questions: [
        { q: "Whom did the Prophet ﷺ wrap in his cloak?", a: "Ali, Fatimah, Hasan and Husayn", wrong: ["Abu Lahab's family", "Only strangers", "No one"], why: "One by one, as each came to him." },
        { q: "Which ayah did he recite then?", a: "Quran 33:33", wrong: ["Quran 2:255", "Quran 112:1", "Quran 1:1"], why: "About Allah purifying the people of the household." },
        { q: "Who told this story?", a: "Aishah", wrong: ["Hafsah", "Khadijah", "Zaynab"], why: "Aishah saw it that morning." }
      ]
    },
    {
      slug: "the-flag",
      title: "The flag at Khaybar",
      line: "At Khaybar, Ali was handed the flag and his eyes were healed.",
      facts: ["Ali had sore eyes", "Healed by the Prophet's ﷺ dua", "Victory came through him"],
      source: hadith("bukhari", "3701", "Sahl bin Sa'd", "Sahih", "The Prophet ﷺ said: tomorrow I will give the flag to a man through whom Allah will give victory. He called Ali, who had sore eyes, put his saliva on them and prayed, and Ali was healed."),
      difficulty: 3,
      questions: [
        { q: "At which battle did Ali get the flag?", a: "Khaybar", wrong: ["Badr", "Uhud", "Hunayn"], why: "Allah gave victory under his lead." },
        { q: "What was wrong with Ali that morning?", a: "His eyes were sore", wrong: ["He was hungry", "His leg was hurt", "He was late"], why: "The Prophet ﷺ healed them with his saliva and dua." },
        { q: "What did everyone hope the night before?", a: "To be given the flag", wrong: ["To go home", "To rest", "To win booty"], why: "Each one hoped it would be him." }
      ]
    },
    {
      slug: "red-camels",
      title: "Better than red camels",
      line: "Invite first: one person guided beats a herd of red camels.",
      facts: ["Advice to Ali at Khaybar", "Red camels: the finest wealth"],
      source: hadith("bukhari", "3701", "Sahl bin Sa'd", "Sahih", "The Prophet ﷺ told Ali: go steadily, invite them to Islam, for if Allah guides one man through you, it is better for you than red camels."),
      difficulty: 4,
      questions: [
        { q: "What did the Prophet ﷺ tell Ali to do first?", a: "Invite them to Islam", wrong: ["Attack at night", "Take their wealth", "Wait a month"], why: "Guiding people comes first." },
        { q: "One person guided through you is better than what?", a: "Red camels", wrong: ["A palace", "A river", "A city"], why: "Red camels were the best wealth of the Arabs." },
        { q: "The Prophet ﷺ told Ali to rush in fast.", tf: false, why: "He said: go steadily until you reach them." }
      ]
    },
    {
      slug: "harun",
      title: "Like Harun to Musa",
      line: "To the Prophet ﷺ, Ali was like Harun to Musa.",
      facts: ["Ali stayed in Madinah", "The journey to Tabuk"],
      source: hadith("bukhari", "4416", "Sad ibn Abi Waqqas", "Sahih", "The Prophet ﷺ left Ali in charge in Madinah when he went to Tabuk and said: will you not be pleased to be to me like Harun to Musa? But there is no prophet after me."),
      difficulty: 4,
      questions: [
        { q: "Where did the Prophet ﷺ leave Ali in charge?", a: "Madinah", wrong: ["Makkah", "Khaybar", "Ta'if"], why: "While the army went to Tabuk." },
        { q: "Ali was to the Prophet ﷺ like who to Musa?", a: "Harun", wrong: ["Yusha", "Khidr", "Shu'ayb"], why: "Musa left his brother Harun in charge of his people." },
        { q: "What did the Prophet ﷺ add?", a: "There is no prophet after me", wrong: ["You will be a prophet", "Follow Harun", "Go to Musa"], why: "Ali was not a prophet." }
      ]
    },
    {
      slug: "better-than-servant",
      title: "Better than a servant",
      line: "Instead of a servant, Ali and Fatimah were taught a dhikr.",
      facts: ["Allahu Akbar 34", "SubhanAllah 33", "Alhamdulillah 33"],
      source: hadith("bukhari", "3705", "Ali ibn Abi Talib", "Sahih", "Fatimah asked for a servant; the Prophet ﷺ came to Ali and Fatimah and taught them to say at bedtime Allahu Akbar 34 times, SubhanAllah 33 and Alhamdulillah 33, better for them than a servant."),
      difficulty: 3,
      questions: [
        { q: "What had Fatimah asked for?", a: "A servant", wrong: ["A house", "Money", "A garden"], why: "Her hands hurt from the grinding stone." },
        { q: "How many times is Allahu Akbar said?", a: "34", wrong: ["33", "10", "100"], why: "34 Allahu Akbar, 33 SubhanAllah, 33 Alhamdulillah." },
        { q: "When is this dhikr said?", a: "When going to bed", wrong: ["After Fajr only", "Before eating", "On Fridays"], why: "The Prophet ﷺ taught it for bedtime." },
        { q: "The Prophet ﷺ said the dhikr was better than a servant.", tf: true, why: "Better for them than what they asked for." }
      ]
    },
    {
      slug: "love-of-ali",
      title: "A sign of faith",
      line: "Only a believer loves Ali; only a hypocrite hates him.",
      facts: ["A promise to Ali", "Told by Ali himself"],
      source: hadith("muslim", "78", "Ali ibn Abi Talib", "Sahih", "Ali said: the Prophet ﷺ promised me that none but a believer would love me and none but a hypocrite would hate me."),
      difficulty: 3,
      questions: [
        { q: "Who loves Ali, by the Prophet's ﷺ promise?", a: "A believer", wrong: ["Everyone", "Only his family", "Only the Ansar"], why: "Loving him is a sign of faith." },
        { q: "Who hates Ali, by the same promise?", a: "A hypocrite", wrong: ["A stranger", "A child", "A traveller"], why: "Hating him is a sign of hypocrisy." },
        { q: "Who told the hadith of loving Ali?", a: "Ali himself", wrong: ["Fatimah", "Hasan", "Umar"], why: "Ali said the Prophet ﷺ promised it to him." }
      ]
    },
    {
      slug: "treaty",
      title: "I will not erase it",
      line: "Writing the treaty, Ali would not erase 'Messenger of Allah'.",
      facts: ["Quraysh objected to it", "The Prophet ﷺ then wrote it himself"],
      source: hadith("bukhari", "2699", "Al-Bara ibn Azib", "Sahih", "Quraysh refused the words 'Messenger of Allah' in the treaty; the Prophet ﷺ told Ali to rub them out, but Ali said he would never erase it, so the Prophet ﷺ took the paper and wrote."),
      difficulty: 4,
      questions: [
        { q: "Who wrote the treaty with Quraysh?", a: "Ali", wrong: ["Abu Bakr", "Uthman", "Zayd"], why: "He was the writer that day." },
        { q: "Which words did Quraysh refuse?", a: "Messenger of Allah", wrong: ["In the name of Allah", "Muhammad", "Peace"], why: "They said: if we believed that, we would not stop you." },
        { q: "What did Ali say?", a: "I will never erase it", wrong: ["Yes, at once", "Let Umar do it", "I cannot write"], why: "Out of love and respect for the Prophet ﷺ." }
      ]
    },
    {
      slug: "hajj-camels",
      title: "In charge of the camels",
      line: "At Hajj, Ali gave all the sacrifice meat away in charity.",
      facts: ["Not even to pay the butcher", "Told by Ali"],
      source: hadith("bukhari", "1717", "Ali ibn Abi Talib", "Sahih", "The Prophet ﷺ put Ali in charge of the sacrificial camels, to give their meat, skins and coverings in charity, and to give the butcher nothing of them as wages."),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ put Ali in charge of at Hajj?", a: "The sacrifice camels", wrong: ["The army", "The water wells", "The market"], why: "Ali looked after their sacrifice." },
        { q: "What happened to the meat and skins?", a: "All were given in charity", wrong: ["They were sold", "They were thrown away", "Ali kept them"], why: "Even the coverings were given away." },
        { q: "The butcher could be paid with some of the meat.", tf: false, why: "Nothing of them was given as his wages." }
      ]
    },
    {
      slug: "praised-umar",
      title: "Ali's words for Umar",
      line: "At Umar's funeral, Ali wished he had deeds like Umar's.",
      facts: ["You will be with your two companions", "Told by Ibn Abbas"],
      source: hadith("bukhari", "3685", "Ibn Abbas", "Sahih", "At Umar's funeral, Ali said: I would love to meet Allah with deeds like yours; I always thought Allah would keep you with your two companions."),
      difficulty: 4,
      questions: [
        { q: "Whose deeds did Ali wish to meet Allah with?", a: "Umar's", wrong: ["Abu Jahl's", "His enemies'", "No one's"], why: "He said so at Umar's funeral." },
        { q: "Who did Ali say Umar would be with?", a: "His two companions", wrong: ["The kings of Persia", "No one at all", "The Romans"], why: "The Prophet ﷺ and Abu Bakr." },
        { q: "Ali and Umar loved and honored each other.", tf: true, why: "Ali prayed for Umar's mercy at his funeral." }
      ]
    },
    {
      slug: "the-sheet",
      title: "Only the Quran",
      line: "Ali had no other book, only the Quran and one sheet.",
      facts: ["And understanding from Allah", "Told by Abu Juhayfah"],
      source: hadith("bukhari", "111", "Abu Juhayfah", "Sahih", "Asked whether he had any book besides the Quran, Ali said: no, only Allah's Book, understanding given to a Muslim, and this sheet about blood money and freeing captives."),
      difficulty: 4,
      questions: [
        { q: "What did Ali say he had besides the Quran?", a: "Only understanding and one sheet", wrong: ["A secret second Quran", "A box of gold", "Many hidden books"], why: "He had no other book." },
        { q: "What was written on Ali's sheet?", a: "Rules on blood money and captives", wrong: ["Poems", "A map", "Shopping lists"], why: "It was about blood money and freeing captives." },
        { q: "Ali had a secret book that others did not know.", tf: false, why: "He said: no, only Allah's Book." }
      ]
    },
    {
      slug: "drink-standing",
      title: "A drink at Kufa",
      line: "In Kufa, Ali drank standing, as he saw the Prophet ﷺ do.",
      facts: ["After the Dhuhr prayer", "Told by an-Nazzal ibn Sabrah"],
      source: hadith("bukhari", "5616", "An-Nazzal ibn Sabrah", "Sahih", "At the masjid of Kufa, Ali washed with water and drank the rest standing, saying people dislike it, but the Prophet ﷺ did as I just did."),
      difficulty: 4,
      questions: [
        { q: "In which city did Ali sit to help the people with their affairs?", a: "Kufa", wrong: ["Makkah", "Damascus", "Cairo"], why: "He sat in the courtyard of the masjid of Kufa." },
        { q: "How did Ali drink the rest of the water?", a: "Standing up", wrong: ["Lying down", "Running", "He did not drink it"], why: "He said the Prophet ﷺ did the same." },
        { q: "Ali showed people what he saw the Prophet ﷺ do.", tf: true, why: "He followed the sunnah even in small things." }
      ]
    },
    {
      slug: "no-division",
      title: "Stay as one",
      line: "Ali told the people of Iraq to judge as before, hating division.",
      facts: ["Until the people are united", "Told by Ubaydah"],
      source: hadith("bukhari", "3707", "Ubaydah as-Salmani", "Sahih", "Ali said: judge as you used to judge, for I hate differing, until the people are one group, or I die as my companions died."),
      difficulty: 5,
      questions: [
        { q: "What did Ali hate among the Muslims?", a: "Division", wrong: ["Prayer", "Charity", "Learning"], why: "He wanted the people to be one group." },
        { q: "How did Ali tell the people of Iraq to judge?", a: "As they used to judge", wrong: ["By guessing", "By the Romans' laws", "Not at all"], why: "He did not want new arguments." },
        { q: "Ali wanted the Muslims to stay united.", tf: true, why: "Until the people are one group, he said." }
      ]
    },
    {
      slug: "humble",
      title: "Just one of the Muslims",
      line: "Ali said the best after the Prophet ﷺ were Abu Bakr, then Umar.",
      facts: ["Asked by his son", "Then you? I am one of the Muslims"],
      source: hadith("bukhari", "3671", "Muhammad ibn al-Hanafiyyah", "Sahih", "Muhammad ibn al-Hanafiyyah asked his father who was best after the Prophet ﷺ. Ali said Abu Bakr, then Umar. Asked 'then you?', he said: I am only one of the Muslims."),
      difficulty: 3,
      questions: [
        { q: "Whom did Ali name as best after the Prophet ﷺ?", a: "Abu Bakr", wrong: ["Himself", "Uthman", "Hasan"], why: "Then Umar." },
        { q: "What did Ali say when asked 'then you?'", a: "I am one of the Muslims", wrong: ["Yes, me", "Ask Umar", "I am the best"], why: "This was his humility." },
        { q: "Who asked Ali this?", a: "His son Muhammad", wrong: ["His son Husayn", "Fatimah", "Ibn Abbas"], why: "Known as Muhammad ibn al-Hanafiyyah." }
      ]
    }
  ]
};

const SPEECH: DeepUnit = {
  key: "speech",
  topicId: "manners",
  branchId: "manners-speech",
  name: "good speech",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "good-or-quiet",
      title: "Say good or stay quiet",
      line: "Believe in Allah and the Last Day? Say good, or stay quiet.",
      facts: ["Also: honor your guest", "Also: do not harm your neighbor"],
      source: hadith("bukhari", "6018", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said: whoever believes in Allah and the Last Day should not harm his neighbor, should honor his guest, and should say what is good or keep quiet."),
      difficulty: 2,
      questions: [
        { q: "If you have nothing good to say, what should you do?", a: "Stay quiet", wrong: ["Say it anyway", "Whisper it", "Write it down"], why: "Say good, or keep quiet." },
        { q: "This advice is for whoever believes in Allah and what?", a: "The Last Day", wrong: ["The angels only", "The prophets only", "The Quran only"], why: "Good speech is a sign of real faith." },
        { q: "The same hadith also says to honor whom?", a: "Your guest", wrong: ["Your boss", "Rich people", "Strangers only"], why: "And do not harm your neighbor." }
      ]
    },
    {
      slug: "safe-tongue",
      title: "Safe from your tongue",
      line: "A Muslim keeps others safe from his tongue and hand.",
      facts: ["Tongue: no hurtful words", "Hand: no harm"],
      source: hadith("bukhari", "10", "Abdullah ibn Amr", "Sahih", "The Prophet ﷺ said: a Muslim is the one from whose tongue and hand the Muslims are safe."),
      difficulty: 2,
      questions: [
        { q: "A true Muslim keeps people safe from his tongue and his what?", a: "Hand", wrong: ["Money", "House", "Eyes"], why: "No harm by word or by deed." },
        { q: "Hurting people with words is fine if you never hit them.", tf: false, why: "The tongue is named first." },
        { q: "Which companion reported this?", a: "Abdullah ibn Amr", wrong: ["Abu Bakr", "Bilal", "Anas"], why: "Abdullah ibn Amr ibn al-As narrated it." }
      ]
    },
    {
      slug: "good-word",
      title: "A good word is charity",
      line: "A good word is charity, like helping someone onto their ride.",
      facts: ["Every joint owes charity daily", "Judging fairly is charity"],
      source: hadith("bukhari", "2989", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said charity is due for every joint each day: judging fairly, helping a man onto his ride or lifting his luggage, and a good word are all charity."),
      difficulty: 2,
      questions: [
        { q: "What does the Prophet ﷺ call a good word?", a: "Charity", wrong: ["Weakness", "Wasted time", "Showing off"], why: "Sadaqah is not only money." },
        { q: "Which of these is also charity in the hadith?", a: "Judging fairly between two people", wrong: ["Winning an argument", "Buying new clothes", "Sleeping early"], why: "Helping with a ride or luggage too." },
        { q: "Charity is owed each day for every what?", a: "Joint of the body", wrong: ["Coin you own", "Friend you have", "Meal you eat"], why: "As thanks to Allah for a healthy body." }
      ]
    },
    {
      slug: "smile",
      title: "A cheerful face",
      line: "Never look down on a good deed, even meeting with a smile.",
      facts: ["Told to Abu Dharr"],
      source: hadith("muslim", "2626", "Abu Dharr", "Sahih", "The Prophet ﷺ said: do not think little of any good deed, even meeting your brother with a cheerful face."),
      difficulty: 2,
      questions: [
        { q: "Which small deed did the Prophet ﷺ say not to look down on?", a: "Meeting your brother cheerfully", wrong: ["Giving a car", "Building a masjid", "A long journey"], why: "Even a smile counts." },
        { q: "A smile is too small to count as a good deed.", tf: false, why: "No good deed is too small." },
        { q: "Who was given this advice?", a: "Abu Dharr", wrong: ["Abu Hurayrah", "Mu'adh", "Salman"], why: "The Prophet ﷺ said it to him." }
      ]
    },
    {
      slug: "truth",
      title: "Truth leads to Jannah",
      line: "Truth leads to goodness, and goodness leads to Jannah.",
      facts: ["Keep telling the truth", "Lying leads to wrongdoing"],
      source: hadith("bukhari", "6094", "Abdullah ibn Masud", "Sahih", "The Prophet ﷺ said: truthfulness leads to righteousness and righteousness leads to Paradise; a man keeps telling the truth until he is a truthful person. Lying leads to wickedness."),
      difficulty: 3,
      questions: [
        { q: "Where does truthfulness lead?", a: "To goodness, then Jannah", wrong: ["To trouble", "To being alone", "Nowhere"], why: "Each truth builds the habit of goodness." },
        { q: "What happens to someone who keeps telling the truth?", a: "He becomes a truthful person", wrong: ["He loses friends", "He gets bored", "He becomes rich"], why: "Truth becomes part of who he is." },
        { q: "Lying leads to wrongdoing.", tf: true, why: "Just as truth leads to good, lies lead to more wrong." },
        { q: "Which companion narrated this?", a: "Abdullah ibn Mas'ud", wrong: ["Abu Musa", "Aishah", "Jabir bin Abdullah"], why: "Ibn Mas'ud heard it from the Prophet ﷺ." }
      ]
    },
    {
      slug: "backbiting",
      title: "What backbiting is",
      line: "Backbiting is saying about your brother what he would dislike.",
      facts: ["Even if it is true", "If untrue, it is worse: slander"],
      source: hadith("muslim", "2589", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said backbiting is talking about your brother in a way he dislikes; if it is true it is backbiting, and if it is not true it is slander."),
      difficulty: 3,
      questions: [
        { q: "What is backbiting?", a: "Saying what he would dislike", wrong: ["Only telling lies", "Talking loudly", "Speaking to his face"], why: "Talking about him behind his back in a way he dislikes." },
        { q: "If what you said about him is true, is it still backbiting?", a: "Yes, it is backbiting", wrong: ["No, it is fine", "Only if you shout", "Only on Fridays"], why: "Even when true, it hurts him." },
        { q: "If what you said is not true, it is what?", a: "Slander", wrong: ["A joke", "Advice", "Allowed"], why: "That is worse: a lie on top of backbiting." }
      ]
    },
    {
      slug: "suspicion",
      title: "No suspicion, no spying",
      line: "Beware of suspicion: it is the most false of talk.",
      facts: ["Do not spy", "Do not envy or hate", "Be brothers"],
      source: hadith("bukhari", "6064", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said: beware of suspicion, for it is the most false of talk; do not look for faults, do not spy, do not envy, do not cut off or hate one another, and be brothers."),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ call suspicion?", a: "The most false of talk", wrong: ["Clever thinking", "A small mistake", "Being careful"], why: "Guessing bad about people is often wrong." },
        { q: "Which of these does the hadith forbid?", a: "Spying on others", wrong: ["Greeting others", "Helping others", "Praying for others"], why: "Do not look for faults or spy." },
        { q: "What does the hadith tell us to be instead?", a: "Brothers", wrong: ["Rivals", "Strangers", "Judges"], why: "O servants of Allah, be brothers." }
      ]
    },
    {
      slug: "talebearer",
      title: "Carrying tales",
      line: "One who carries tales to cause trouble will not enter Jannah.",
      facts: ["Qattat: a talebearer", "Told by Hudhayfah"],
      source: hadith("bukhari", "6056", "Hudhayfah", "Sahih", "The Prophet ﷺ said: a qattat, one who carries tales between people, will not enter Paradise."),
      difficulty: 4,
      questions: [
        { q: "What is a qattat?", a: "One who carries tales to cause trouble", wrong: ["A storyteller at night", "A poet", "A trader"], why: "Passing on talk to turn people against each other." },
        { q: "Carrying tales between people is a small thing.", tf: false, why: "The Prophet ﷺ warned it keeps one out of Jannah." },
        { q: "Who reported this?", a: "Hudhayfah", wrong: ["Ali", "Umar", "Anas"], why: "Hudhayfah ibn al-Yaman narrated it." }
      ]
    },
    {
      slug: "guard-tongue",
      title: "A promise of Jannah",
      line: "Guard your tongue and your chastity, and Jannah is promised.",
      facts: ["Between the jaws: the tongue", "Told by Sahl ibn Sa'd"],
      source: hadith("bukhari", "6474", "Sahl ibn Sa'd", "Sahih", "The Prophet ﷺ said: whoever guarantees me what is between his jaws and what is between his legs, I guarantee Paradise for him."),
      difficulty: 4,
      questions: [
        { q: "'What is between his jaws' means what?", a: "The tongue", wrong: ["The teeth", "Food", "The breath"], why: "Guarding what we say." },
        { q: "What does the Prophet ﷺ promise for guarding both?", a: "Jannah", wrong: ["Wealth", "Fame", "Long life"], why: "He guaranteed Paradise for it." },
        { q: "Which companion narrated it?", a: "Sahl ibn Sa'd", wrong: ["Sa'd ibn Abi Waqqas", "Sa'id ibn Zayd", "Sa'd ibn Mu'adh"], why: "Sahl ibn Sa'd as-Sa'idi." }
      ]
    },
    {
      slug: "leave-arguing",
      title: "Leave the argument",
      line: "A house in Jannah for leaving an argument, even when right.",
      facts: ["Leave lies, even joking", "Best house: good character"],
      source: hadith("abudawud", "4800", "Abu Umamah", "Hasan (Al-Albani)", "The Prophet ﷺ said: I guarantee a house on the edge of Paradise for one who leaves arguing even if he is right, one in the middle for one who leaves lying even in jest, and one at the top for one with good character."),
      difficulty: 5,
      questions: [
        { q: "Who gets a house on the edge of Jannah?", a: "One who leaves arguing, even if right", wrong: ["One who always wins", "One who argues well", "One who stays silent all day"], why: "Letting go keeps hearts clean." },
        { q: "Who gets a house in the middle of Jannah?", a: "One who leaves lies, even joking", wrong: ["One who jokes a lot", "One who travels", "One who sleeps early"], why: "No lying, not even to make people laugh." },
        { q: "Who gets the highest house?", a: "One with good character", wrong: ["The richest", "The loudest", "The strongest"], why: "Good character is the top." }
      ]
    }
  ]
};

const PARENTS: DeepUnit = {
  key: "parents",
  topicId: "manners",
  branchId: "manners-parents-family",
  name: "parents",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "your-mother",
      title: "Your mother, three times",
      line: "Who deserves your kindness most? Mother thrice, then father.",
      facts: ["Mother: said three times", "Then your father"],
      source: hadith("bukhari", "5971", "Abu Hurairah", "Sahih", "A man asked who most deserves his good company; the Prophet ﷺ said: your mother, then your mother, then your mother, then your father."),
      difficulty: 2,
      questions: [
        { q: "How many times did the Prophet ﷺ say 'your mother'?", a: "Three", wrong: ["One", "Two", "Four"], why: "Then he said: your father." },
        { q: "Who came after the mother?", a: "The father", wrong: ["The brother", "The teacher", "The friend"], why: "Your mother three times, then your father." },
        { q: "Mothers are given extra care in Islam.", tf: true, why: "Because of all they go through for us." }
      ]
    },
    {
      slug: "dearest-deeds",
      title: "Among the dearest deeds",
      line: "After prayer on time, kindness to parents is dearest to Allah.",
      facts: ["First: prayer on time", "Second: kindness to parents"],
      source: hadith("bukhari", "527", "Abdullah ibn Mas'ud", "Sahih", "Ibn Mas'ud asked which deed is dearest to Allah; the Prophet ﷺ said: prayer at its time, then kindness to parents, then striving in Allah's cause."),
      difficulty: 3,
      questions: [
        { q: "Which deed did the Prophet ﷺ name first as dearest to Allah?", a: "Prayer on time", wrong: ["Fasting", "Charity", "Hajj"], why: "Then kindness to parents." },
        { q: "What came second?", a: "Kindness to parents", wrong: ["Reading Quran", "Visiting friends", "Travelling"], why: "It comes right after prayer." },
        { q: "Who asked the Prophet ﷺ this question?", a: "Abdullah ibn Mas'ud", wrong: ["Abu Hurayrah", "Ali", "Anas"], why: "He asked which deed is dearest to Allah." }
      ]
    },
    {
      slug: "serve-them",
      title: "Strive in their service",
      line: "A man wanted jihad. The Prophet ﷺ sent him to his parents.",
      facts: ["Are your parents alive?", "Strive in serving them"],
      source: hadith("bukhari", "3004", "Abdullah ibn Amr", "Sahih", "A man asked permission to join the fighting; the Prophet ﷺ asked if his parents were alive, then said: strive in their service."),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ ask the man first?", a: "Are your parents alive?", wrong: ["Are you strong?", "Do you have a horse?", "Can you fight?"], why: "His parents came first." },
        { q: "What did he tell him to do?", a: "Strive in serving his parents", wrong: ["Go and fight", "Go to Makkah", "Find a teacher"], why: "Serving them was his striving." },
        { q: "Serving your parents can be a great act of worship.", tf: true, why: "The Prophet ﷺ called it striving." }
      ]
    },
    {
      slug: "old-age",
      title: "Parents in old age",
      line: "Parents growing old are a door to Jannah. Do not miss it.",
      facts: ["Said three times", "Old parents: a door to Jannah"],
      source: hadith("muslim", "2551a", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said three times: let him be humbled, the one who finds one or both of his parents in old age and does not enter Paradise."),
      difficulty: 4,
      questions: [
        { q: "Whom did the Prophet ﷺ warn about?", a: "One with old parents who misses Jannah", wrong: ["One who travels a lot", "One with no children", "One who is poor"], why: "Caring for them is a way to Jannah." },
        { q: "Old parents are a chance to earn what?", a: "Jannah", wrong: ["Money", "Fame", "Rest"], why: "Serving them opens its door." },
        { q: "How many times did he say it?", a: "Three", wrong: ["Once", "Twice", "Seven"], why: "To show how serious it is." }
      ]
    },
    {
      slug: "a-big-sin",
      title: "A great sin",
      line: "Disobeying parents is among the greatest sins.",
      facts: ["With shirk and false witness"],
      source: hadith("bukhari", "5976", "Abu Bakrah", "Sahih", "The Prophet ﷺ named among the greatest sins: associating partners with Allah, disobeying parents, and false speech and false witness."),
      difficulty: 4,
      questions: [
        { q: "Which of these did the Prophet ﷺ name among the greatest sins?", a: "Disobeying parents", wrong: ["Eating too much", "Sleeping late", "Being shy"], why: "Alongside shirk and false witness." },
        { q: "What other great sin is named with it?", a: "False witness", wrong: ["Travelling", "Laughing", "Buying things"], why: "He kept repeating that one." },
        { q: "Who narrated this hadith of the greatest sins?", a: "Abu Bakrah", wrong: ["Abu Bakr", "Abu Hurayrah", "Abu Dharr"], why: "Abu Bakrah, not Abu Bakr as-Siddiq." }
      ]
    },
    {
      slug: "her-mother",
      title: "Kind to a non-Muslim mother",
      line: "Asma could be kind to her mother, who was not Muslim.",
      facts: ["Asma bint Abi Bakr", "Quran 60:8 came about it"],
      source: hadith("bukhari", "5978", "Asma bint Abi Bakr", "Sahih", "Asma's mother came hoping for her kindness; Asma asked the Prophet ﷺ whether to treat her kindly and he said yes."),
      difficulty: 4,
      questions: [
        { q: "What did Asma ask the Prophet ﷺ?", a: "May I be kind to my mother?", wrong: ["May I leave Madinah?", "May I fast?", "May I sell my house?"], why: "Her mother was not Muslim." },
        { q: "What did he answer?", a: "Yes", wrong: ["No", "Only once", "Ask Abu Bakr"], why: "Kindness to parents stays, even if they are not Muslim." },
        { q: "Asma was the daughter of whom?", a: "Abu Bakr", wrong: ["Umar", "Uthman", "Ali"], why: "Asma bint Abi Bakr." }
      ]
    },
    {
      slug: "family-ties",
      title: "Keep family ties",
      line: "Want more provision and a longer life? Keep ties with family.",
      facts: ["Told by Anas"],
      source: hadith("bukhari", "5986", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said: whoever would like his provision to be increased and his life extended should keep good ties with his relatives."),
      difficulty: 3,
      questions: [
        { q: "What does keeping family ties bring, in the hadith?", a: "More provision and longer life", wrong: ["Fame", "Good looks", "Nothing"], why: "Blessing in wealth and life." },
        { q: "Ties with whom?", a: "Relatives", wrong: ["Only friends", "Only neighbors", "Only teachers"], why: "Your kin, near and far." },
        { q: "Who narrated it?", a: "Anas ibn Malik", wrong: ["Ibn Umar", "Abu Sa'id", "Jabir bin Abdullah"], why: "Anas, the Prophet's ﷺ servant." }
      ]
    }
  ]
};

const NEIGHBORS: DeepUnit = {
  key: "neighbors",
  topicId: "manners",
  branchId: "manners-neighbors-and-guests",
  name: "neighbors and guests",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "jibril",
      title: "Jibril kept advising",
      line: "Jibril spoke of neighbors so much, they seemed set to inherit.",
      facts: ["Told by Aishah"],
      source: hadith("bukhari", "6014", "Aishah", "Sahih", "The Prophet ﷺ said: Jibril kept advising me about the neighbor until I thought he would make him an heir."),
      difficulty: 2,
      questions: [
        { q: "Who kept advising the Prophet ﷺ about neighbors?", a: "Jibril", wrong: ["Abu Bakr", "Mika'il", "Umar"], why: "The angel Jibril." },
        { q: "The Prophet ﷺ thought neighbors might even do what?", a: "Inherit", wrong: ["Move in", "Lead prayer", "Pay zakat"], why: "That is how much their rights matter." },
        { q: "Who narrated this?", a: "Aishah", wrong: ["Fatimah", "Hafsah", "Umm Salamah"], why: "Aishah heard it from the Prophet ﷺ." }
      ]
    },
    {
      slug: "safe-neighbor",
      title: "He does not believe",
      line: "He does not truly believe, whose neighbor is not safe from him.",
      facts: ["Said three times", "Told by Abu Shurayh"],
      source: hadith("bukhari", "6016", "Abu Shurayh", "Sahih", "The Prophet ﷺ said three times: by Allah, he does not believe. Asked who, he said: the one whose neighbor is not safe from his harm."),
      difficulty: 3,
      questions: [
        { q: "Whose faith did the Prophet ﷺ warn about?", a: "One whose neighbor is not safe from him", wrong: ["One with no neighbors", "One who moves often", "One who is quiet"], why: "Harming neighbors spoils faith." },
        { q: "How many times did he say 'he does not believe'?", a: "Three", wrong: ["Once", "Twice", "Ten"], why: "To make the warning strong." },
        { q: "Praying a lot makes it fine to annoy neighbors.", tf: false, why: "Faith shows in how we treat them." }
      ]
    },
    {
      slug: "small-gift",
      title: "No gift is too small",
      line: "Never scorn a gift to a neighbor, even a sheep's hoof.",
      facts: ["Said to the Muslim women", "Small gifts build love"],
      source: hadith("bukhari", "6017", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said: O Muslim women, no neighbor should look down on a gift to her neighbor, even a sheep's hoof."),
      difficulty: 2,
      questions: [
        { q: "What small gift did the Prophet ﷺ name?", a: "A sheep's hoof", wrong: ["A gold ring", "A camel", "A house"], why: "Even something tiny is worth giving." },
        { q: "Only big gifts count between neighbors.", tf: false, why: "Small gifts matter too." },
        { q: "Whom was this said to?", a: "The Muslim women", wrong: ["The soldiers", "The traders", "The children"], why: "O Muslim women, he said." }
      ]
    },
    {
      slug: "more-water",
      title: "Add water to the soup",
      line: "Cooking soup? Add water and share some with your neighbors.",
      facts: ["Told to Abu Dharr"],
      source: hadith("muslim", "2625b", "Abu Dharr", "Sahih", "The Prophet ﷺ said: Abu Dharr, when you make broth, add more water and give some to your neighbor."),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ tell Abu Dharr to add to his soup?", a: "More water", wrong: ["More salt", "More meat", "Honey"], why: "So there is enough to share." },
        { q: "Why add it?", a: "To share with neighbors", wrong: ["To make it hot", "To save it", "To sell it"], why: "Make a little go further for others." },
        { q: "Sharing food with neighbors is part of good manners.", tf: true, why: "Even a little soup." }
      ]
    },
    {
      slug: "nearest-door",
      title: "The nearest door",
      line: "Two neighbors? Give your gift first to the nearest door.",
      facts: ["Aishah asked about it"],
      source: hadith("bukhari", "2259", "Aishah", "Sahih", "Aishah asked which of two neighbors to give a gift; the Prophet ﷺ said: the one whose door is nearer to you."),
      difficulty: 3,
      questions: [
        { q: "Which neighbor comes first for a gift?", a: "The one with the nearest door", wrong: ["The richest one", "The oldest one", "The newest one"], why: "The closest has the greater right." },
        { q: "Who asked this question?", a: "Aishah", wrong: ["Fatimah", "Asma", "Umm Ayman"], why: "She had two neighbors." },
        { q: "Neighbors far away have no rights.", tf: false, why: "All neighbors have rights; the nearest come first." }
      ]
    },
    {
      slug: "guest",
      title: "Honoring a guest",
      line: "Honor your guest: one day of your best, three days of welcome.",
      facts: ["After three days: charity", "A guest should not overstay"],
      source: hadith("bukhari", "6135", "Abu Shurayh al-Ka'bi", "Sahih", "The Prophet ﷺ said: whoever believes in Allah and the Last Day should honor his guest: his due is a day and a night, hospitality is three days, and after that it is charity. A guest should not stay until he burdens his host."),
      difficulty: 4,
      questions: [
        { q: "How long is a guest's full hospitality?", a: "Three days", wrong: ["One week", "One hour", "A month"], why: "The best is given for a day and a night." },
        { q: "What is hosting after three days?", a: "Charity", wrong: ["Forbidden", "A duty", "Rude"], why: "Anything more is a kind gift." },
        { q: "A guest may stay as long as he likes, even if it burdens his host.", tf: false, why: "He should not stay until he burdens his host." }
      ]
    }
  ]
};

const ANGER: DeepUnit = {
  key: "anger",
  topicId: "manners",
  branchId: "manners-emotional-discipline",
  name: "anger",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "real-strength",
      title: "Real strength",
      line: "The strong one is not the wrestler, but who controls his anger.",
      facts: ["Told by Abu Hurayrah"],
      source: hadith("bukhari", "6114", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said: the strong one is not the one who overcomes people by strength, but the one who controls himself when angry."),
      difficulty: 2,
      questions: [
        { q: "Who is truly strong?", a: "One who controls himself when angry", wrong: ["The best wrestler", "The tallest", "The loudest"], why: "Self-control is real strength." },
        { q: "Winning a fight shows true strength.", tf: false, why: "Holding back your anger does." },
        { q: "Who narrated this?", a: "Abu Hurayrah", wrong: ["Abu Bakr", "Abu Dharr", "Abu Musa"], why: "Abu Hurayrah heard the Prophet ﷺ say it." }
      ]
    },
    {
      slug: "dont-be-angry",
      title: "Do not get angry",
      line: "A man asked for advice. Again and again: don't get angry.",
      facts: ["He asked many times", "Same answer each time"],
      source: hadith("bukhari", "6116", "Abu Hurayrah", "Sahih", "A man asked the Prophet ﷺ for advice; he said: do not get angry. The man asked again several times and each time he said: do not get angry."),
      difficulty: 2,
      questions: [
        { q: "What advice did the man get?", a: "Do not get angry", wrong: ["Pray more", "Give charity", "Travel"], why: "Anger is the root of many wrongs." },
        { q: "How did the Prophet ﷺ answer when the man asked again?", a: "The same each time", wrong: ["Something new", "He stayed silent", "He sent him away"], why: "He repeated it to stress it." },
        { q: "The man asked only once.", tf: false, why: "He asked again and again." }
      ]
    },
    {
      slug: "seek-refuge",
      title: "Seek refuge from Shaytan",
      line: "When angry, say: I seek refuge with Allah from Shaytan.",
      facts: ["A'udhu billahi minash-shaytan", "Two men were arguing"],
      source: hadith("bukhari", "3282", "Sulayman ibn Surad", "Sahih", "Two men argued and one's face went red; the Prophet ﷺ said: I know a word that would take his anger away: I seek refuge with Allah from Shaytan."),
      difficulty: 3,
      questions: [
        { q: "What words take anger away, in the hadith?", a: "I seek refuge with Allah from Shaytan", wrong: ["I am right", "Leave me alone", "Count to ten"], why: "A'udhu billahi minash-shaytanir-rajim." },
        { q: "What was happening when the Prophet ﷺ said this?", a: "Two men were arguing", wrong: ["A market opened", "It was Eid", "Rain was falling"], why: "One's face had gone red with anger." },
        { q: "Who reported this?", a: "Sulayman ibn Surad", wrong: ["Salman al-Farisi", "Sulaym", "Sa'd"], why: "He was sitting with the Prophet ﷺ." }
      ]
    },
    {
      slug: "sit-down",
      title: "Sit down, then lie down",
      line: "If you are angry standing, sit; if it stays, lie down.",
      facts: ["Change your position", "Told by Abu Dharr"],
      source: hadith("abudawud", "4782", "Abu Dharr", "Sahih (Al-Albani)", "The Prophet ﷺ said: when one of you is angry while standing, let him sit; if the anger goes, good; otherwise let him lie down."),
      difficulty: 3,
      questions: [
        { q: "If you get angry while standing, what should you do?", a: "Sit down", wrong: ["Run", "Shout", "Stand taller"], why: "Changing position calms you." },
        { q: "If the anger stays after sitting?", a: "Lie down", wrong: ["Stand up again", "Leave the house", "Argue"], why: "Lower still, calmer still." },
        { q: "Who narrated it?", a: "Abu Dharr", wrong: ["Abu Hurayrah", "Abu Bakrah", "Anas"], why: "Abu Dharr al-Ghifari." }
      ]
    },
    {
      slug: "gentleness",
      title: "Gentleness beautifies",
      line: "Gentleness makes everything beautiful; without it, things spoil.",
      facts: ["Told by Aishah"],
      source: hadith("muslim", "2594a", "Aishah", "Sahih", "The Prophet ﷺ said: gentleness is not found in anything except that it beautifies it, and it is not taken from anything except that it spoils it."),
      difficulty: 3,
      questions: [
        { q: "What does gentleness do to anything it is in?", a: "Makes it beautiful", wrong: ["Makes it weak", "Makes it slow", "Nothing"], why: "Kindness adds beauty." },
        { q: "What happens when gentleness is taken away?", a: "Things spoil", wrong: ["Things get faster", "Things get better", "Nothing changes"], why: "Harshness ruins things." },
        { q: "Who narrated this?", a: "Aishah", wrong: ["Hafsah", "Zaynab", "Maymunah"], why: "Aishah, Mother of the Believers." }
      ]
    },
    {
      slug: "three-days",
      title: "Not more than three days",
      line: "Do not cut off a Muslim brother for more than three days.",
      facts: ["Do not hate or envy", "Be brothers"],
      source: hadith("bukhari", "6065", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said: do not hate, envy or turn away from one another; be brothers. A Muslim may not cut off his brother for more than three days."),
      difficulty: 4,
      questions: [
        { q: "How long at most may you stop talking to a Muslim brother?", a: "Three days", wrong: ["One week", "One month", "Forever"], why: "After that, make up." },
        { q: "Which of these does the hadith forbid?", a: "Envying one another", wrong: ["Greeting one another", "Visiting one another", "Helping one another"], why: "No hate, no envy, no turning away." },
        { q: "What should Muslims be to each other?", a: "Brothers", wrong: ["Strangers", "Rivals", "Judges"], why: "O servants of Allah, be brothers." }
      ]
    }
  ]
};

const SPOUSES: DeepUnit = {
  key: "spouses",
  topicId: "marriage",
  branchId: "marriage-home",
  name: "husband and wife",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "shepherds",
      title: "Everyone is a shepherd",
      line: "Each of you is a shepherd, responsible for those in his care.",
      facts: ["A man: for his family", "A woman: for her husband's home and children"],
      source: hadith("bukhari", "893", "Ibn Umar", "Sahih", "The Prophet ﷺ said: all of you are guardians and responsible; a man is guardian of his family, and a woman is guardian of her husband's house and responsible for it."),
      difficulty: 2,
      questions: [
        { q: "In the hadith, a man is the guardian of what?", a: "His family", wrong: ["Only his money", "His friends", "His city"], why: "He is responsible for them." },
        { q: "A woman is the guardian of what?", a: "Her husband's home", wrong: ["The market", "The masjid", "Nothing"], why: "And responsible for it." },
        { q: "Only leaders have someone in their care.", tf: false, why: "All of you are guardians." }
      ]
    },
    {
      slug: "best-to-family",
      title: "Best to his family",
      line: "The best of you is the best to his family.",
      facts: ["I am the best to mine", "Said by the Prophet ﷺ"],
      source: hadith("tirmidhi", "3895", "Aishah", "Sahih (Al-Albani)", "The Prophet ﷺ said: the best of you is the best to his family, and I am the best of you to my family."),
      difficulty: 2,
      questions: [
        { q: "Who is the best of you, in this saying?", a: "The best to his family", wrong: ["The richest", "The most famous", "The strongest"], why: "Goodness starts at home." },
        { q: "Who did the Prophet ﷺ say was best to his family?", a: "He himself", wrong: ["Abu Bakr", "Umar", "Ali"], why: "I am the best of you to my family." },
        { q: "Who narrated it?", a: "Aishah", wrong: ["Khadijah", "Hafsah", "Fatimah"], why: "Aishah, his wife, told it." }
      ]
    },
    {
      slug: "helped-at-home",
      title: "He helped at home",
      line: "The Prophet ﷺ helped his family at home, then went to pray.",
      facts: ["Aishah was asked", "Then he left for salah"],
      source: hadith("bukhari", "676", "Al-Aswad from Aishah", "Sahih", "Aishah was asked what the Prophet ﷺ did at home; she said he busied himself serving his family, and when prayer time came he went out to pray."),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ do at home?", a: "Helped his family", wrong: ["Only rested", "Only gave orders", "Only slept"], why: "He served his family." },
        { q: "What did he do when prayer time came?", a: "Went to pray", wrong: ["Kept working", "Prayed later", "Slept"], why: "Prayer came first." },
        { q: "Who was asked about this?", a: "Aishah", wrong: ["Fatimah", "Anas", "Bilal"], why: "Al-Aswad asked her." }
      ]
    },
    {
      slug: "morsel",
      title: "Even a bite of food",
      line: "Even the bite you put in your wife's mouth is rewarded.",
      facts: ["When done for Allah", "Told by Sa'd ibn Abi Waqqas"],
      source: hadith("bukhari", "56", "Sad ibn Abi Waqqas", "Sahih", "The Prophet ﷺ said: you will be rewarded for whatever you spend for Allah's sake, even a morsel you put in your wife's mouth."),
      difficulty: 3,
      questions: [
        { q: "What small act is rewarded in the hadith?", a: "A bite put in your wife's mouth", wrong: ["Buying a car", "Winning a race", "Going shopping"], why: "Kindness at home is worship." },
        { q: "When is it rewarded?", a: "When done for Allah", wrong: ["Only in Ramadan", "Only if others see", "Never"], why: "The intention makes it worship." },
        { q: "Who narrated this?", a: "Sad ibn Abi Waqqas", wrong: ["Sa'id ibn Zayd", "Sahl ibn Sa'd", "Sa'd ibn Ubadah"], why: "Sa'd, one of the ten promised Jannah." }
      ]
    },
    {
      slug: "spending",
      title: "Spending is charity",
      line: "A man's spending on his family, hoping for reward, is charity.",
      facts: ["Told by Abu Mas'ud"],
      source: hadith("bukhari", "55", "Abu Mas'ud", "Sahih", "The Prophet ﷺ said: when a man spends on his family hoping for reward, it is charity for him."),
      difficulty: 3,
      questions: [
        { q: "Spending on your family, hoping for reward, counts as what?", a: "Charity", wrong: ["Waste", "Nothing", "A debt"], why: "Providing for family is sadaqah." },
        { q: "What makes it count?", a: "Hoping for Allah's reward", wrong: ["Spending a lot", "Telling people", "Buying gifts"], why: "The intention." },
        { q: "Who narrated it?", a: "Abu Mas'ud", wrong: ["Ibn Mas'ud", "Abu Musa", "Abu Sa'id"], why: "Abu Mas'ud al-Ansari." }
      ]
    },
    {
      slug: "dislike-one-trait",
      title: "Look for the good",
      line: "Dislike one trait in your wife? Another will please you.",
      facts: ["A believer should not hate a believing wife"],
      source: hadith("muslim", "1469a", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said: a believing man should not hate a believing woman; if he dislikes one of her traits, he will be pleased with another."),
      difficulty: 3,
      questions: [
        { q: "If a husband dislikes one trait in his wife, what should he remember?", a: "He will like another", wrong: ["Leave at once", "Tell everyone", "Stop talking"], why: "Look for the good in her." },
        { q: "A believing man should not ____ a believing woman.", a: "hate", wrong: ["help", "greet", "thank"], why: "Fairness and kindness at home." },
        { q: "Who narrated this?", a: "Abu Hurayrah", wrong: ["Ibn Umar", "Anas", "Jabir bin Abdullah"], why: "Abu Hurayrah heard it from the Prophet ﷺ." }
      ]
    },
    {
      slug: "choose-religion",
      title: "Choose by faith",
      line: "People marry for wealth, family, beauty or faith: choose faith.",
      facts: ["Four reasons", "Faith is the winner"],
      source: hadith("bukhari", "5090", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: a woman is married for four things: her wealth, her family, her beauty and her religion; so choose the religious one."),
      difficulty: 3,
      questions: [
        { q: "Which of the four did the Prophet ﷺ say to choose?", a: "Religion", wrong: ["Wealth", "Beauty", "Family name"], why: "Faith lasts when the rest fades." },
        { q: "How many reasons for marriage are named?", a: "Four", wrong: ["Two", "Three", "Five"], why: "Wealth, family, beauty and religion." },
        { q: "Beauty is the most important reason to marry.", tf: false, why: "Religion comes first." }
      ]
    },
    {
      slug: "khadijah",
      title: "Khadijah's comfort",
      line: "At the first revelation, Khadijah comforted the Prophet ﷺ.",
      facts: ["Allah will never disgrace you", "You keep family ties", "You help the weak"],
      source: hadith("bukhari", "3", "Aishah", "Sahih", "After the first revelation the Prophet ﷺ came home afraid; Khadijah said: by Allah, Allah will never disgrace you; you keep family ties, help the weak, honor guests and help in hardship."),
      difficulty: 4,
      questions: [
        { q: "What did Khadijah say to comfort him?", a: "Allah will never disgrace you", wrong: ["Go back to the cave", "Tell no one", "You are dreaming"], why: "She reminded him of his goodness." },
        { q: "Which good deed of his did she name?", a: "Keeping family ties", wrong: ["Winning battles", "Being rich", "Writing poems"], why: "And helping the weak and guests." },
        { q: "Khadijah supported her husband at a hard time.", tf: true, why: "She stood by him from the first day." }
      ]
    }
  ]
};

const CHILDREN: DeepUnit = {
  key: "children",
  topicId: "marriage",
  branchId: "marriage-spiritual-home",
  name: "children",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "fitrah",
      title: "Born on the fitrah",
      line: "Every child is born on the fitrah, the natural faith.",
      facts: ["Parents shape the child", "Told by Abu Hurayrah"],
      source: hadith("bukhari", "1385", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said: every child is born on the fitrah, and his parents shape him into another religion."),
      difficulty: 2,
      questions: [
        { q: "What is every child born upon?", a: "The fitrah", wrong: ["Nothing at all", "Its parents' sins", "Bad habits"], why: "The natural faith in Allah." },
        { q: "Who shapes a child after that?", a: "The parents", wrong: ["Only the teacher", "Only the friends", "No one"], why: "So parents have a big duty." },
        { q: "Children are born already sinful.", tf: false, why: "They are born pure, on the fitrah." }
      ]
    },
    {
      slug: "kissing",
      title: "Mercy to children",
      line: "The Prophet ﷺ kissed Al-Hasan: who shows no mercy gets none.",
      facts: ["A man had ten children, never kissed", "Mercy is returned"],
      source: hadith("bukhari", "5997", "Abu Hurayrah", "Sahih", "The Prophet ﷺ kissed Al-Hasan; Al-Aqra said he had ten children and had kissed none. The Prophet ﷺ said: whoever is not merciful will not be shown mercy."),
      difficulty: 2,
      questions: [
        { q: "Whom did the Prophet ﷺ kiss?", a: "His grandson Al-Hasan", wrong: ["A friend", "A traveller", "A soldier"], why: "He showed love openly." },
        { q: "What did he say to the man who never kissed his children?", a: "No mercy shown, no mercy given", wrong: ["Good for you", "Kiss them once", "That is your choice"], why: "Whoever is not merciful is not shown mercy." },
        { q: "How many children did that man have?", a: "Ten", wrong: ["Two", "Five", "Twenty"], why: "Al-Aqra ibn Habis said ten." }
      ]
    },
    {
      slug: "carrying-umamah",
      title: "Praying with Umamah",
      line: "The Prophet ﷺ prayed carrying his little granddaughter Umamah.",
      facts: ["Put her down to bow down", "Picked her up to stand"],
      source: hadith("bukhari", "516", "Abu Qatadah", "Sahih", "The Prophet ﷺ prayed while carrying Umamah, daughter of Zaynab; when he prostrated he put her down, and when he stood he picked her up."),
      difficulty: 3,
      questions: [
        { q: "Whom did the Prophet ﷺ carry while praying?", a: "His granddaughter Umamah", wrong: ["A lamb", "Al-Husayn", "A book"], why: "Umamah, daughter of Zaynab." },
        { q: "What did he do when he went into sujud?", a: "Put her down", wrong: ["Kept holding her", "Stopped the prayer", "Called someone"], why: "And picked her up when he stood." },
        { q: "Who narrated this?", a: "Abu Qatadah", wrong: ["Abu Talhah", "Abu Ayyub", "Abu Bakr"], why: "Abu Qatadah al-Ansari." }
      ]
    },
    {
      slug: "daughters",
      title: "A shield of daughters",
      line: "Be good to your daughters, and they'll be a shield for you.",
      facts: ["A mother split one date", "Told by Aishah"],
      source: hadith("bukhari", "1418", "Aishah", "Sahih", "A mother split a single date between her two daughters; the Prophet ﷺ said: whoever is tested with daughters and is good to them, they will be a shield for him from the Fire."),
      difficulty: 3,
      questions: [
        { q: "What did the poor mother do with one date?", a: "Split it between her daughters", wrong: ["Ate it herself", "Sold it", "Kept it"], why: "She ate nothing herself." },
        { q: "What will daughters raised with kindness be for their parent?", a: "A shield from the Fire", wrong: ["A burden", "A cost", "Nothing special"], why: "Daughters are a blessing." },
        { q: "Who saw the mother and told the Prophet ﷺ?", a: "Aishah", wrong: ["Fatimah", "Hafsah", "Umm Salamah"], why: "The mother came to her door." }
      ]
    },
    {
      slug: "two-girls",
      title: "Close as two fingers",
      line: "Raise two girls well, and you'll be close to the Prophet ﷺ.",
      facts: ["Until they grow up", "Like two fingers together"],
      source: hadith("muslim", "2631", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said: whoever raises two girls until they grow up, he and I will come on the Day of Resurrection like this, and he joined his fingers."),
      difficulty: 4,
      questions: [
        { q: "How close will the one who raises two girls be to the Prophet ﷺ?", a: "Like two fingers together", wrong: ["Far away", "In the same city", "No promise"], why: "He joined his fingers to show it." },
        { q: "Until when must they be raised well?", a: "Until they grow up", wrong: ["Only one year", "Until age five", "Only in Ramadan"], why: "The whole of childhood." },
        { q: "Who narrated this?", a: "Anas ibn Malik", wrong: ["Ibn Abbas", "Abu Dharr", "Jabir bin Abdullah"], why: "Anas heard it from the Prophet ﷺ." }
      ]
    },
    {
      slug: "fair",
      title: "Be fair to your children",
      line: "Fear Allah and be fair between your children.",
      facts: ["A gift to one son only", "The father took it back"],
      source: hadith("bukhari", "2587", "An-Nu'man ibn Bashir", "Sahih", "An-Nu'man's father gave him a gift and asked the Prophet ﷺ to witness it; he asked if he gave all his sons the same, and said: fear Allah and be fair between your children. The father took the gift back."),
      difficulty: 4,
      questions: [
        { q: "What did the Prophet ﷺ ask An-Nu'man's father?", a: "Did you give all your sons the same?", wrong: ["Is it expensive?", "Where did you buy it?", "Is he the oldest?"], why: "He had given only one son." },
        { q: "What did he tell him?", a: "Fear Allah and be fair to your children", wrong: ["Give him more", "That is fine", "Ask his mother"], why: "Fairness between children." },
        { q: "What did the father do then?", a: "Took the gift back", wrong: ["Gave it anyway", "Sold it", "Hid it"], why: "He chose fairness." }
      ]
    },
    {
      slug: "teach-eating",
      title: "O boy, say Bismillah",
      line: "The Prophet ﷺ taught a boy: Bismillah, right hand, nearest food.",
      facts: ["Umar ibn Abi Salamah", "He followed it all his life"],
      source: hadith("bukhari", "5376", "Umar bin Abi Salamah", "Sahih", "As a boy in the Prophet's ﷺ care, Umar ibn Abi Salamah's hand wandered around the dish; he said: O boy, say Bismillah, eat with your right hand, and eat from what is near you."),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ tell the boy to say first?", a: "Bismillah", wrong: ["Alhamdulillah", "Allahu Akbar", "Subhanallah"], why: "Mention Allah's name before eating." },
        { q: "With which hand should we eat?", a: "The right hand", wrong: ["The left hand", "Both hands", "Any hand"], why: "And eat from what is near you." },
        { q: "How did the Prophet ﷺ correct the boy?", a: "Gently, teaching him", wrong: ["By shouting", "By sending him away", "By taking his food"], why: "O boy, he said kindly." }
      ]
    },
    {
      slug: "righteous-child",
      title: "A child who prays for you",
      line: "When a person dies, a good child's dua still helps him.",
      facts: ["Ongoing charity", "Useful knowledge", "A good child's dua"],
      source: hadith("muslim", "1631", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said: when a person dies his deeds end except three: ongoing charity, knowledge that benefits, or a righteous child who prays for him."),
      difficulty: 4,
      questions: [
        { q: "Which of these keeps helping a person after death?", a: "A righteous child's dua", wrong: ["His house", "His car", "His clothes"], why: "One of three things that continue." },
        { q: "How many deeds continue after death in this hadith?", a: "Three", wrong: ["One", "Five", "Ten"], why: "Charity, knowledge and a good child." },
        { q: "Useful knowledge someone left keeps rewarding him.", tf: true, why: "It is one of the three." }
      ]
    }
  ]
};

// The Muhajirun: the companions who left Makkah for Allah's sake. A unit of its own in the Sahabah topic, with
// no starter circles before it.
const MUHAJIRUN: DeepUnit = {
  key: "muhajirun",
  topicId: "sahabah",
  branchId: "sahabi-muhajirun",
  branch: { title: "The Muhajirun", description: "The companions who left Makkah for Madinah, for Allah's sake." },
  name: "the Muhajirun",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "who",
      title: "Who were the Muhajirun?",
      line: "The Muhajirun left their homes and wealth in Makkah for Allah.",
      facts: ["Muhajir: one who emigrates", "The Quran calls them truthful"],
      quote: ayah(8, 59),
      source: quran(59, 8, "The poor emigrants, driven from their homes and wealth, seek Allah's bounty and pleasure and help Allah and His Messenger; they are the truthful."),
      difficulty: 1,
      questions: [
        { q: "What did the Muhajirun leave behind in Makkah?", a: "Their homes and wealth", wrong: ["Only their camels", "Nothing at all", "Their prayers"], why: "They left everything for Allah's sake." },
        { q: "What does the Quran call the Muhajirun?", a: "The truthful", wrong: ["The rich", "The late ones", "The weak"], why: "Quran 59:8 says: they are the truthful." },
        { q: "A muhajir is someone who emigrates.", tf: true, why: "Hijrah means emigrating, leaving one place for another." }
      ]
    },
    {
      slug: "pleased",
      title: "Allah is pleased with them",
      line: "Allah is pleased with the first Muhajirun and Ansar.",
      facts: ["And with those who follow them well", "Gardens with rivers await them"],
      quote: ayah(100, 9),
      source: quran(9, 100, "Allah is pleased with the first forerunners of the Muhajirun and the Ansar and those who follow them well, and has prepared gardens with rivers for them."),
      difficulty: 1,
      questions: [
        { q: "Who is Allah pleased with in Quran 9:100?", a: "The first Muhajirun and Ansar", wrong: ["Only the rich", "Only the kings", "No one at all"], why: "And with those who follow them well." },
        { q: "What has Allah prepared for them?", a: "Gardens with rivers", wrong: ["Gold coins", "A big palace on earth", "Nothing yet"], why: "Gardens with rivers flowing beneath, forever." },
        { q: "Quran 9:100 praises the Muhajirun but not the Ansar.", tf: false, why: "It names both the Muhajirun and the Ansar." }
      ]
    },
    {
      slug: "intention",
      title: "Hijrah is by intention",
      line: "A hijrah is rewarded by the intention behind it.",
      facts: ["Deeds are by intentions", "Told by Umar"],
      source: hadith("bukhari", "1", "Umar ibn al-Khattab", "Sahih", "Deeds are by intentions; whoever emigrated for something of this world, or to marry a woman, his hijrah is for what he emigrated for."),
      difficulty: 2,
      questions: [
        { q: "What decides the reward of a hijrah?", a: "The intention behind it", wrong: ["How far you walk", "How rich you are", "How many go with you"], why: "Deeds are by intentions." },
        { q: "Someone who emigrated only to marry gets what?", a: "Only what he went for", wrong: ["The reward of the Muhajirun", "Double reward", "Nothing to worry about"], why: "His hijrah is for what he emigrated for." },
        { q: "Which companion told the hadith that a hijrah is by intention?", a: "Umar", wrong: ["Bilal", "Anas", "Khalid"], why: "Umar ibn al-Khattab heard it from the Prophet ﷺ." }
      ]
    },
    {
      slug: "true-muhajir",
      title: "The true muhajir",
      line: "The true muhajir leaves everything Allah has forbidden.",
      facts: ["A Muslim harms no one", "Told by Abdullah ibn Amr"],
      source: hadith("bukhari", "10", "Abdullah ibn Amr", "Sahih", "A Muslim is one from whose tongue and hands the Muslims are safe, and a muhajir is one who leaves what Allah has forbidden."),
      difficulty: 2,
      questions: [
        { q: "Who is the true muhajir, says the Prophet ﷺ?", a: "One who leaves what Allah forbade", wrong: ["One who travels the most", "One who owns the most", "One who sleeps the most"], why: "Anyone can make this hijrah today." },
        { q: "Who is a true Muslim in the same hadith?", a: "One whose tongue and hands harm no one", wrong: ["One who wins every argument", "One who never smiles", "One who lives far away"], why: "The Muslims are safe from his tongue and hands." },
        { q: "You can still be a muhajir today by leaving sins.", tf: true, why: "Leaving what Allah forbade is a hijrah too." }
      ]
    },
    {
      slug: "first-teachers",
      title: "The first to arrive",
      line: "Mus'ab ibn Umayr came to Madinah first, to teach the Quran.",
      facts: ["With Ibn Umm Maktum", "Then Bilal, Sa'd and Ammar"],
      source: hadith("bukhari", "3925", "Al-Bara ibn Azib", "Sahih", "The first to come to us were Mus'ab ibn Umayr and Ibn Umm Maktum, teaching people the Quran; then Bilal, Sa'd and Ammar; then Umar with twenty companions; then the Prophet ﷺ."),
      difficulty: 2,
      questions: [
        { q: "Who came to Madinah first, with Ibn Umm Maktum?", a: "Mus'ab ibn Umayr", wrong: ["Abu Sufyan", "Khalid ibn al-Walid", "Abu Jahl"], why: "Al-Bara said they were the first to come." },
        { q: "What did the first two teach the people of Madinah?", a: "The Quran", wrong: ["Poetry", "Trade", "Horse riding"], why: "They were teaching the people the Quran." },
        { q: "Who came after them?", a: "Bilal, Sa'd and Ammar", wrong: ["Abu Lahab and his wife", "The Romans", "No one at all"], why: "Then Umar came with twenty companions." }
      ]
    },
    {
      slug: "joy",
      title: "Madinah's great joy",
      line: "Madinah was never so happy as when the Prophet ﷺ arrived.",
      facts: ["Even the girls called out", "Told by al-Bara"],
      source: hadith("bukhari", "3925", "Al-Bara ibn Azib", "Sahih", "Al-Bara never saw the people of Madinah so joyful as at the Prophet's ﷺ arrival; even the girls were saying: the Messenger of Allah has come."),
      difficulty: 2,
      questions: [
        { q: "How did Madinah feel when the Prophet ﷺ arrived?", a: "Happier than ever", wrong: ["Afraid", "Bored", "Angry"], why: "Al-Bara had never seen them so joyful." },
        { q: "Who called out that the Prophet ﷺ had come?", a: "Even the girls", wrong: ["No one at all", "Only the kings", "Only the soldiers"], why: "The whole town was full of joy." },
        { q: "The Prophet ﷺ reached Madinah before Mus'ab.", tf: false, why: "Mus'ab came first; the Prophet ﷺ came later." }
      ]
    },
    {
      slug: "fever",
      title: "Fever in Madinah",
      line: "In Madinah, Abu Bakr and Bilal fell ill with fever.",
      facts: ["Bilal missed Makkah", "Told by Aishah"],
      source: hadith("bukhari", "3926", "Aishah", "Sahih", "When the Prophet ﷺ came to Madinah, Abu Bakr and Bilal fell ill with fever, and Bilal longed for the valleys of Makkah."),
      difficulty: 3,
      questions: [
        { q: "Who fell ill with fever after the hijrah?", a: "Abu Bakr and Bilal", wrong: ["Umar and Ali", "Khalid and Amr", "No one at all"], why: "Aishah went to see them both." },
        { q: "What did Bilal miss while he was ill?", a: "Makkah", wrong: ["Rome", "Yemen", "Persia"], why: "He longed for its valleys and grasses." },
        { q: "Who visited them and told the Prophet ﷺ?", a: "Aishah", wrong: ["Fatimah", "Hafsah", "Khadijah"], why: "She asked her father and Bilal how they felt." }
      ]
    },
    {
      slug: "love-madinah",
      title: "Make us love Madinah",
      line: "The Prophet ﷺ prayed: make us love Madinah like Makkah, or more.",
      facts: ["Bless its food", "Take its fever away"],
      source: hadith("bukhari", "3926", "Aishah", "Sahih", "The Prophet ﷺ prayed: O Allah, make us love Madinah as we love Makkah or more, make it healthy, bless its measures, and take its fever away."),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ ask Allah for Madinah?", a: "To make them love it like Makkah, or more", wrong: ["To make them leave it", "To make it rich in gold", "To make it bigger than Rome"], why: "He wanted the Muhajirun to feel at home." },
        { q: "What did he ask Allah to take from Madinah?", a: "Its fever", wrong: ["Its rain", "Its dates", "Its people"], why: "He asked for it to be made healthy." },
        { q: "He also asked Allah to bless Madinah's food.", tf: true, why: "He asked Allah to bless its measures of food." }
      ]
    },
    {
      slug: "brothers",
      title: "Brothers in Islam",
      line: "The Prophet ﷺ made each Muhajir a brother to one of the Ansar.",
      facts: ["Abd ar-Rahman and Sa'd ibn ar-Rabi'", "Sa'd offered half his wealth"],
      source: hadith("bukhari", "3780", "Ibrahim ibn Sa'd, from his father", "Sahih", "When the Muhajirun reached Madinah, the Prophet ﷺ made Abd ar-Rahman ibn Awf and Sa'd ibn ar-Rabi' brothers; Sa'd offered to share all he had."),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ do for each Muhajir in Madinah?", a: "Made him a brother to one of the Ansar", wrong: ["Sent him back to Makkah", "Gave him a horse", "Made him a king"], why: "So no one was alone in the new town." },
        { q: "Who became Abd ar-Rahman ibn Awf's brother?", a: "Sa'd ibn ar-Rabi'", wrong: ["Abu Jahl", "Abu Sufyan", "Khalid ibn al-Walid"], why: "Sa'd was one of the richest of the Ansar." },
        { q: "What did Sa'd offer his new brother?", a: "Half his wealth", wrong: ["Nothing at all", "One date", "A job as his servant"], why: "The Ansar were very generous." }
      ]
    },
    {
      slug: "market",
      title: "Show me the market",
      line: "Abd ar-Rahman ibn Awf thanked Sa'd and asked for the market.",
      facts: ["The market of Qaynuqa'", "He came back with a profit"],
      source: hadith("bukhari", "2048", "Abd ar-Rahman ibn Awf", "Sahih", "Abd ar-Rahman said he did not need Sa'd's wealth and asked for a market; they showed him the market of Qaynuqa', and he came back with a profit."),
      difficulty: 3,
      questions: [
        { q: "What did Abd ar-Rahman ask for instead of Sa'd's wealth?", a: "The way to the market", wrong: ["A bigger house", "More camels", "A ride to Makkah"], why: "He wanted to earn his own living." },
        { q: "Which market did they show him?", a: "The market of Qaynuqa'", wrong: ["The market of Rome", "The market of Basra", "The market of Damascus"], why: "It was a market in Madinah." },
        { q: "Abd ar-Rahman came back from the market with nothing.", tf: false, why: "He came back with a profit." }
      ]
    },
    {
      slug: "ansar-love",
      title: "The Ansar loved them",
      line: "The Ansar loved the Muhajirun and put them before themselves.",
      facts: ["Even when they were in need", "Quran 59:9"],
      quote: ayah(9, 59),
      source: quran(59, 9, "Those who had settled in Madinah love those who emigrated to them, and put them before themselves even when they are in need."),
      difficulty: 3,
      questions: [
        { q: "How did the Ansar feel about the Muhajirun?", a: "They loved them", wrong: ["They were jealous", "They ignored them", "They feared them"], why: "Quran 59:9 says they love those who came to them." },
        { q: "Whom did the Ansar put first?", a: "The Muhajirun", wrong: ["Their own wishes", "The rich only", "Their enemies"], why: "They put them before themselves." },
        { q: "The Ansar gave only when they had plenty.", tf: false, why: "They gave even when they were in need." }
      ]
    },
    {
      slug: "but-for-hijrah",
      title: "But for the hijrah",
      line: "The Prophet ﷺ said: but for the hijrah, I'd be an Ansari.",
      facts: ["He would take the Ansar's valley", "Told by Abu Hurayrah"],
      source: hadith("bukhari", "3779", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said: if the Ansar went through a valley, I would take the Ansar's valley; and but for the hijrah, I would have been one of the Ansar."),
      difficulty: 4,
      questions: [
        { q: "Why was the Prophet ﷺ not counted among the Ansar?", a: "Because he made the hijrah", wrong: ["Because he disliked them", "Because he was too young", "Because he lived in Yemen"], why: "But for the hijrah, he would be one of them." },
        { q: "Whose valley would the Prophet ﷺ take?", a: "The Ansar's valley", wrong: ["The Romans' valley", "The Persians' valley", "No valley at all"], why: "He showed how much he loved the Ansar." },
        { q: "Abu Hurayrah said the Ansar sheltered and helped him.", tf: true, why: "That is why the Prophet ﷺ loved them so." }
      ]
    },
    {
      slug: "two-hijrahs",
      title: "Two hijrahs",
      line: "Those who went to Abyssinia first earned two hijrahs.",
      facts: ["Ja'far stayed there with the Negus", "Asma bint Umays asked"],
      source: hadith("bukhari", "4230, 4231", "Abu Musa", "Sahih", "Asma bint Umays told the Prophet ﷺ what Umar said; he replied that Umar and his companions have one hijrah, and the people of the ship have two."),
      difficulty: 4,
      questions: [
        { q: "Where did Ja'far ibn Abi Talib first emigrate to?", a: "Abyssinia", wrong: ["Rome", "Persia", "Iraq"], why: "He stayed there with the Negus, its king." },
        { q: "How many hijrahs did the people of the ship earn?", a: "Two", wrong: ["One", "Three", "None"], why: "First to Abyssinia, then to Madinah." },
        { q: "Who asked the Prophet ﷺ about it?", a: "Asma bint Umays", wrong: ["Aishah", "Fatimah", "Khadijah"], why: "She came back from Abyssinia on the ship." }
      ]
    },
    {
      slug: "negus",
      title: "A prayer for the Negus",
      line: "When the Negus died, the Prophet ﷺ led a funeral prayer for him.",
      facts: ["Ask forgiveness for your brother", "Four takbirs"],
      source: hadith("bukhari", "1327", "Abu Hurayrah", "Sahih", "The Prophet ﷺ told of the Negus's death on the day he died, said: ask forgiveness for your brother, and led the funeral prayer with four takbirs."),
      difficulty: 4,
      questions: [
        { q: "Who was the Negus?", a: "The king of Abyssinia", wrong: ["A king of Rome", "A trader in Makkah", "A chief of the Ansar"], why: "He sheltered the Muhajirun who went there." },
        { q: "What did the Prophet ﷺ tell the Muslims to do for him?", a: "Ask forgiveness for him", wrong: ["Forget him", "Write him a poem", "Send him gifts"], why: "He called him: your brother." },
        { q: "How many takbirs did the Prophet ﷺ say in that prayer?", a: "Four", wrong: ["One", "Two", "Seven"], why: "He lined them up in rows and said four takbirs." }
      ]
    },
    {
      slug: "musab",
      title: "Mus'ab's last cloth",
      line: "Mus'ab died at Uhud with one cloth too short to cover him.",
      facts: ["Grass covered his feet", "Told by Khabbab"],
      source: hadith("bukhari", "1276", "Khabbab", "Sahih", "Mus'ab ibn Umayr was martyred at Uhud; his only cloth could not cover both his head and feet, so the Prophet ﷺ told them to cover his head and put idhkhir grass on his feet."),
      difficulty: 5,
      questions: [
        { q: "Where was Mus'ab ibn Umayr martyred?", a: "At Uhud", wrong: ["At Badr", "In Makkah", "In Abyssinia"], why: "He died in the Battle of Uhud." },
        { q: "What covered Mus'ab's feet?", a: "Grass", wrong: ["A silk cloth", "A cloak of gold", "Nothing at all"], why: "His one cloth could only cover his head." },
        { q: "Mus'ab enjoyed his reward in this world before he died.", tf: false, why: "Khabbab said he died before taking any of it." }
      ]
    },
    {
      slug: "zayd",
      title: "Zayd ibn Harithah",
      line: "People called Zayd 'son of Muhammad' until Quran 33:5 came.",
      facts: ["Call them by their fathers", "Told by Ibn Umar"],
      quote: ayah(5, 33),
      source: hadith("bukhari", "4782", "Abdullah ibn Umar", "Sahih", "They called Zayd ibn Harithah 'Zayd ibn Muhammad' until Allah revealed: call them by their fathers."),
      difficulty: 5,
      questions: [
        { q: "What did people call Zayd before Quran 33:5?", a: "Zayd ibn Muhammad", wrong: ["Zayd ibn Umar", "Zayd ibn Ali", "Zayd ibn Uthman"], why: "The Prophet ﷺ had raised him." },
        { q: "What does Quran 33:5 say to do?", a: "Call people by their fathers' names", wrong: ["Give everyone new names", "Never use names", "Call people by their towns"], why: "So he was Zayd ibn Harithah again." },
        { q: "Who told this story?", a: "Ibn Umar", wrong: ["Anas", "Aishah", "Abu Hurayrah"], why: "Abdullah ibn Umar narrated it." }
      ]
    },
    {
      slug: "after-conquest",
      title: "No hijrah after the conquest",
      line: "Hijrah from Makkah ended at its conquest; good intention stays.",
      facts: ["Jihad remains too", "Told by Ibn Abbas"],
      source: hadith("bukhari", "2783", "Ibn Abbas", "Sahih", "The Prophet ﷺ said: there is no hijrah after the conquest, but jihad and good intention remain."),
      difficulty: 5,
      questions: [
        { q: "When did the hijrah from Makkah end?", a: "After Makkah was opened", wrong: ["Before Badr", "On the first day of Islam", "It never ended"], why: "Makkah had become a Muslim town." },
        { q: "What stays after the hijrah ended?", a: "Jihad and good intention", wrong: ["Nothing at all", "Only trade", "Only poetry"], why: "A Muslim can still earn reward by intention." },
        { q: "Who told the hadith that there is no hijrah after the conquest?", a: "Ibn Abbas", wrong: ["Bilal", "Khalid", "Salman"], why: "Abdullah ibn Abbas narrated it." }
      ]
    }
  ]
};

// An-Nas, Al-Falaq, Al-Ikhlas and Al-'Asr, deeper: their virtues from the hadith and their meaning from Tafsir Ibn
// Kathir, beyond what their passages teach. Each goes at the end of that surah's own unit (addSurahDeepUnits).
// An-Nas: the whisperer and the three surahs of refuge.
const NAS: DeepUnit = {
  key: "nas",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-114",
  name: "An-Nas",
  kind: "skill",
  lessonType: "surah",
  surahName: "An-Nas",
  lessons: [
    {
      slug: "the-whisperer",
      title: "The whisperer who hides",
      line: "Shaytan whispers when we forget and hides when we remember.",
      facts: ["Quran 114:4", "Said by Ibn Abbas"],
      quote: ayah(1, 114),
      source: ibnKathir(4, "Ibn Abbas said: the whisperer sits on the heart; when a person is heedless he whispers, and when he remembers Allah he withdraws.", 114),
      difficulty: 4,
      questions: [
        { q: "When does Shaytan whisper, says Ibn Abbas?", a: "When we forget Allah", wrong: ["Only on Fridays", "Only at noon", "Never"], why: "He whispers when a person is heedless." },
        { q: "What makes the whisperer hide away?", a: "Remembering Allah", wrong: ["Shouting loudly", "Running fast", "Closing the door"], why: "When he remembers Allah, the whisperer withdraws." },
        { q: "Which surah tells of the whisperer who withdraws?", a: "An-Nas", wrong: ["Al-Fil", "Al-Kawthar", "Quraysh"], why: "Quran 114:4." }
      ]
    },
    {
      slug: "before-sleep",
      title: "Before sleeping",
      line: "Each night the Prophet ﷺ read the last three and wiped himself.",
      facts: ["He blew into his cupped hands", "Three times"],
      source: hadith("bukhari", "5017", "Aishah", "Sahih", "Every night in bed the Prophet ﷺ cupped his hands, recited Al-Ikhlas, Al-Falaq and An-Nas, blew into them, and wiped as much of his body as he could, three times."),
      difficulty: 4,
      questions: [
        { q: "What did the Prophet ﷺ recite each night before sleeping?", a: "Al-Ikhlas, Al-Falaq and An-Nas", wrong: ["Only Al-Baqarah", "Nothing at all", "A poem"], why: "Then he wiped his body with his hands." },
        { q: "How many times did he do this?", a: "Three times", wrong: ["Once", "Ten times", "Seven times"], why: "Aishah said he did it three times." },
        { q: "Where did he start wiping?", a: "His head and face", wrong: ["His feet", "His back", "His knees"], why: "Then the front of his body." }
      ]
    },
    {
      slug: "morning-evening",
      title: "Morning and evening",
      line: "Recite the three surahs three times each morning and evening.",
      facts: ["They are enough for you", "Told by Abdullah ibn Khubayb"],
      source: hadith("abudawud", "5082", "Abdullah ibn Khubayb", "Hasan (Al-Albani)", "On a dark rainy night the Prophet ﷺ told Abdullah ibn Khubayb: say Al-Ikhlas and the two surahs of refuge three times morning and evening; they will suffice you for everything."),
      difficulty: 5,
      questions: [
        { q: "How many times should you recite them morning and evening?", a: "Three times", wrong: ["Once a year", "Forty times", "Only once ever"], why: "Three times each morning and evening." },
        { q: "What did the Prophet ﷺ say they would do for you?", a: "Suffice you for everything", wrong: ["Make you rich", "Make you famous", "Nothing"], why: "They are enough as protection." },
        { q: "Which three surahs are they?", a: "Al-Ikhlas, Al-Falaq and An-Nas", wrong: ["Al-Fil, Quraysh and Al-Ma'un", "Al-Asr, Al-Kawthar and Al-Kafirun", "Yasin, Al-Mulk and Al-Kahf"], why: "Al-Ikhlas and the two surahs of refuge." }
      ]
    }
  ]
};

// Al-Falaq, after its passages.
const FALAQ: DeepUnit = {
  key: "falaq",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-113",
  name: "Al-Falaq",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Falaq",
  lessons: [
    {
      slug: "never-seen",
      title: "Ayahs like no others",
      line: "Nothing like Al-Falaq and An-Nas was ever revealed.",
      facts: ["Revealed in one night", "Told by Uqbah ibn Amir"],
      quote: ayah(1, 113),
      source: hadith("muslim", "814a", "Uqbah ibn Amir", "Sahih", "The Prophet ﷺ said: what wonderful ayahs were sent down tonight, the like of which were never seen: Say, I seek refuge with the Lord of the dawn, and Say, I seek refuge with the Lord of mankind."),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ say about Al-Falaq and An-Nas?", a: "Nothing like them was ever seen", wrong: ["They are very long", "They are only for adults", "They came last of all"], why: "He called them wonderful ayahs." },
        { q: "Which two surahs are these?", a: "Al-Falaq and An-Nas", wrong: ["Al-Fatihah and Al-Baqarah", "Al-Kahf and Maryam", "Yasin and Al-Mulk"], why: "Both begin: Say, I seek refuge." },
        { q: "Who heard the Prophet ﷺ say this?", a: "Uqbah ibn Amir", wrong: ["Abu Jahl", "Abu Sufyan", "Khalid"], why: "Uqbah ibn Amir narrated it." }
      ]
    },
    {
      slug: "the-dawn",
      title: "The Lord of the dawn",
      line: "In Al-Falaq we seek refuge with the Lord of the dawn.",
      facts: ["Al-Falaq means the morning", "Said by Jabir and Ibn Abbas"],
      source: ibnKathir(1, "Jabir and Ibn Abbas said: Al-Falaq is the morning, like Allah's words: He is the Cleaver of the daybreak.", 113),
      difficulty: 3,
      questions: [
        { q: "What does al-falaq mean?", a: "The dawn, the morning", wrong: ["The night", "The ocean", "The mountain"], why: "Jabir and Ibn Abbas said: it is the morning." },
        { q: "In Al-Falaq, with whom do we seek refuge?", a: "The Lord of the dawn", wrong: ["The king of Persia", "Our friends", "The stars"], why: "Say: I seek refuge with the Lord of al-Falaq." },
        { q: "Al-Falaq asks Allah to protect us from evil.", tf: true, why: "From the evil of what He has created." }
      ]
    },
    {
      slug: "when-ill",
      title: "When he was ill",
      line: "When ill, the Prophet ﷺ read Al-Falaq and An-Nas on himself.",
      facts: ["Aishah did it for him later", "Hoping for their blessing"],
      source: hadith("bukhari", "5016", "Aishah", "Sahih", "When the Prophet ﷺ was ill he recited the two surahs of refuge and blew over himself; when his illness grew, Aishah recited them and wiped his hand over him, hoping for their blessing."),
      difficulty: 4,
      questions: [
        { q: "What did the Prophet ﷺ recite when he was ill?", a: "Al-Falaq and An-Nas", wrong: ["Only poetry", "Nothing", "Al-Masad"], why: "The two surahs of refuge." },
        { q: "Who recited them for him when he was very ill?", a: "Aishah", wrong: ["Umar", "Bilal", "Khalid"], why: "She wiped his own hand over him." },
        { q: "We can recite these surahs when we are sick.", tf: true, why: "The Prophet ﷺ did, hoping for their blessing." }
      ]
    }
  ]
};

// Al-Ikhlas, after its passages.
const IKHLAS: DeepUnit = {
  key: "ikhlas",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-112",
  name: "Al-Ikhlas",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Ikhlas",
  lessons: [
    {
      slug: "a-third",
      title: "A third of the Quran",
      line: "Al-Ikhlas is equal to a third of the Quran.",
      facts: ["A man recited it again and again", "Told by Abu Sa'id"],
      quote: ayah(1, 112),
      source: hadith("bukhari", "5013", "Abu Sa'id al-Khudri", "Sahih", "A man kept repeating Al-Ikhlas, and another thought it was too little; the Prophet ﷺ swore that it is equal to a third of the Quran."),
      difficulty: 1,
      questions: [
        { q: "What is Al-Ikhlas equal to, says the Prophet ﷺ?", a: "A third of the Quran", wrong: ["Half of the Quran", "One ayah", "Nothing special"], why: "He swore by the One who holds his soul." },
        { q: "What did the man in the hadith do with Al-Ikhlas?", a: "He recited it again and again", wrong: ["He never recited it", "He wrote it on a wall", "He sold it"], why: "Another man thought that was too little." },
        { q: "Al-Ikhlas is a short surah with a great reward.", tf: true, why: "Short, yet equal to a third of the Quran." }
      ]
    },
    {
      slug: "one-night",
      title: "A third in one night",
      line: "You can recite a third of the Quran tonight: recite Al-Ikhlas.",
      facts: ["The companions found it hard", "Told by Abu Sa'id"],
      source: hadith("bukhari", "5015", "Abu Sa'id al-Khudri", "Sahih", "The Prophet ﷺ asked: can any of you recite a third of the Quran in one night? When they found it hard, he said: Allah, the One, the Self-Sufficient, is a third of the Quran."),
      difficulty: 2,
      questions: [
        { q: "How can you recite a third of the Quran in one night?", a: "Recite Al-Ikhlas", wrong: ["Stay up all night", "Read only the first page", "It is impossible"], why: "The Prophet ﷺ said it is a third of the Quran." },
        { q: "How did the companions feel about reciting a third in one night?", a: "They found it hard", wrong: ["They found it easy", "They did not care", "They laughed"], why: "Then the Prophet ﷺ gave them the easy way." },
        { q: "Al-Ikhlas tells us Allah is One.", tf: true, why: "Allah, the One, the Self-Sufficient." }
      ]
    },
    {
      slug: "none-like-him",
      title: "None is like Him",
      line: "Al-Ikhlas ends: there is none equal or comparable to Allah.",
      facts: ["Quran 112:4", "Nothing at all is like Him"],
      source: ibnKathir(4, "There is none similar to Allah, none equal to Him, and nothing at all is like Him.", 112),
      difficulty: 2,
      questions: [
        { q: "What does the last ayah of Al-Ikhlas say about Allah?", a: "None is equal to Him", wrong: ["He has many partners", "He has a son", "He was born"], why: "Ibn Kathir: nothing at all is like Him." },
        { q: "Al-Ikhlas says Allah neither has children nor was born.", tf: true, why: "He begets not, nor was He begotten." },
        { q: "Which surah ends: there is none comparable to Him?", a: "Al-Ikhlas", wrong: ["Al-Fatihah", "Al-Kawthar", "Al-Asr"], why: "Quran 112:4." }
      ]
    },
    {
      slug: "allah-loves-him",
      title: "Allah loves him",
      line: "A man loved Al-Ikhlas, so the Prophet ﷺ said: Allah loves him.",
      facts: ["He ended each prayer's recitation with it", "It describes ar-Rahman"],
      source: hadith("bukhari", "7375", "Aishah", "Sahih", "A leader always ended his recitation in prayer with Al-Ikhlas because it describes ar-Rahman and he loved it; the Prophet ﷺ said: tell him that Allah loves him."),
      difficulty: 3,
      questions: [
        { q: "Why did the man always recite Al-Ikhlas?", a: "It describes Allah, and he loved it", wrong: ["It was the only surah he knew", "To finish quickly", "Someone paid him"], why: "It describes ar-Rahman, the Most Merciful." },
        { q: "What did the Prophet ﷺ say about him?", a: "Tell him that Allah loves him", wrong: ["Tell him to stop", "Tell him to recite less", "Nothing at all"], why: "Love of Al-Ikhlas earned Allah's love." },
        { q: "Who told this story?", a: "Aishah", wrong: ["Hafsah", "Fatimah", "Khadijah"], why: "Aishah narrated it." }
      ]
    }
  ]
};

const ASR: DeepUnit = {
  key: "asr",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-103",
  name: "Al-'Asr",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-'Asr",
  lessons: [
    {
      slug: "time",
      title: "By time",
      line: "Allah swears by time, when people do good or evil.",
      facts: ["Al-'Asr: time", "People are in loss"],
      quote: ayah(1, 103),
      source: ibnKathir(1, "Al-'Asr is the time in which the deeds of the Children of Adam happen, good or evil; Allah swears by it that people are in loss.", 103),
      difficulty: 2,
      questions: [
        { q: "What does al-'asr mean, says Ibn Kathir?", a: "The time in which people act", wrong: ["The sea", "The sun", "A city"], why: "The time of people's good and evil deeds." },
        { q: "What does Allah say people are in?", a: "Loss", wrong: ["Glory", "Sleep", "Safety"], why: "Verily, man is in loss." },
        { q: "Al-'Asr is a very short surah.", tf: true, why: "It has only three ayahs." }
      ]
    },
    {
      slug: "four-things",
      title: "Four things save us",
      line: "Faith, good deeds, truth and patience save us from loss.",
      facts: ["Urge one another", "Quran 103:3"],
      source: ibnKathir(3, "Except those who believe in their hearts, do good deeds with their limbs, urge one another to truth, which is obedience, and to patience against harm.", 103),
      difficulty: 3,
      questions: [
        { q: "Which of these is one of the four things in Al-'Asr?", a: "Urging one another to patience", wrong: ["Collecting money", "Sleeping a lot", "Winning races"], why: "Faith, good deeds, truth and patience." },
        { q: "What does urging the truth mean, says Ibn Kathir?", a: "Obeying Allah and leaving the forbidden", wrong: ["Telling jokes", "Buying gifts", "Staying quiet"], why: "Acts of obedience, and avoiding what is forbidden." },
        { q: "Al-'Asr says faith alone, with no good deeds, is enough.", tf: false, why: "It names faith and good deeds together." }
      ]
    },
    {
      slug: "enough",
      title: "Enough for people",
      line: "Ash-Shafi'i: if people pondered Al-'Asr, it would suffice.",
      facts: ["Imam ash-Shafi'i", "In Tafsir Ibn Kathir"],
      source: ibnKathir(1, "Ash-Shafi'i said: if the people were to ponder this surah, it would be sufficient for them.", 103),
      difficulty: 4,
      questions: [
        { q: "What did ash-Shafi'i say about Al-'Asr?", a: "It would be enough if people pondered it", wrong: ["It is too short to matter", "It is only for scholars", "It should be skipped"], why: "Its three ayahs hold the whole path." },
        { q: "Which great imam said Al-'Asr alone would be enough?", a: "Ash-Shafi'i", wrong: ["Abu Jahl", "Abu Lahab", "Fir'awn"], why: "Ibn Kathir quotes him at the start of the surah." },
        { q: "Pondering means thinking deeply about the meaning.", tf: true, why: "Not just reciting, but reflecting." }
      ]
    }
  ]
};

const SURAH_DEEP_UNITS: readonly DeepUnit[] = [NAS, FALAQ, IKHLAS, ASR];

export const DEEP_UNITS: readonly DeepUnit[] = [ABU_BAKR, UMAR, UTHMAN, ALI, ...SAHABA_UNITS, MUHAJIRUN, FATIHAH, MULK, NAS, FALAQ, IKHLAS, ASR, SPEECH, PARENTS, NEIGHBORS, ANGER, SPOUSES, CHILDREN, ...WOMEN_UNITS, ...LIFE_UNITS, ...SCHOLAR_UNITS, ...AKHIRAH_UNITS];

// The hand-written answer comes first, so the four choices turn by a stable hash of the question id.
function turn<T>(id: string, items: T[]): T[] {
  let hash = 0;
  for (let index = 0; index < id.length; index += 1) hash = (hash * 31 + id.charCodeAt(index)) | 0;
  const start = Math.abs(hash) % items.length;
  return items.map((_, index) => items[(start + index) % items.length]);
}

function challenge(id: string, question: Question, source: LessonSource): Challenge {
  const base = { id, prompt: question.q, explanation: question.why, resourceLabel: "Open source", resourceUrl: source.url };
  if ("tf" in question) {
    return {
      ...base,
      type: "true_false",
      choices: [
        { id: "true", label: "True" },
        { id: "false", label: "False" }
      ],
      correctChoiceId: question.tf ? "true" : "false"
    };
  }
  const choices = turn(id, [question.a, ...question.wrong].map((label, index) => ({ id: "abcd"[index], label })));
  return { ...base, type: "multiple_choice", choices, correctChoiceId: "a" };
}

// A review after every six lessons, and a big quiz at the end: one question from each lesson before it,
// the lesson's last question first in turn, so no two reviews ask the same thing.
const REVIEW_EVERY = 6;

function reviewLesson(unit: DeepUnit, id: string, nodeId: string, title: string, line: string, taught: Lesson[], count: number, difficulty: DifficultyTier): Lesson {
  const picks = taught.slice(-count).map((lesson, index) => {
    const own = lesson.challenges;
    const picked = own[(own.length - 1 + taught.length + index) % own.length];
    return {
      ...picked,
      id: `${nodeId}-recall-${index + 1}`,
      isReview: true,
      sourceNodeId: lesson.nodeId,
      sourceLessonId: lesson.id,
      reviewSuggestion: `Review ${lesson.title}`
    };
  });
  return {
    id,
    nodeId,
    branchId: unit.branchId,
    ...(unit.surahName ? { surahName: unit.surahName } : {}),
    title,
    intro: line,
    learnLine: line,
    lessonType: "review",
    difficulty,
    xpReward: 14,
    sources: [],
    challenges: picks
  };
}

function buildUnit(unit: DeepUnit) {
  const nodes: LearningNode[] = [];
  const lessons: Lesson[] = [];
  const taught: Lesson[] = [];
  const push = (lesson: Lesson, kind: LearningNode["kind"]) => {
    lessons.push(lesson);
    nodes.push({
      id: lesson.nodeId,
      skillId: `skill_deep_${unit.key}_${nodes.length + 1}`,
      title: lesson.title,
      topicId: unit.topicId,
      branchId: unit.branchId,
      ...(unit.surahName ? { surahName: unit.surahName } : {}),
      kind,
      lessonIds: [lesson.id],
      requiredNodeIds: [],
      xpReward: lesson.xpReward,
      starsReward: 3,
      difficulty: lesson.difficulty
    });
  };

  unit.lessons.forEach((item, index) => {
    const nodeId = `deep-${unit.key}-${item.slug}`;
    const id = `lesson-${nodeId}`;
    const lesson: Lesson = {
      id,
      nodeId,
      branchId: unit.branchId,
      ...(unit.surahName ? { surahName: unit.surahName } : {}),
      title: item.title,
      intro: item.line,
      learnLine: item.line,
      ...(item.facts ? { learnFacts: item.facts } : {}),
      ...(item.quote ? { quote: item.quote } : {}),
      learnSource: item.source,
      lessonType: unit.lessonType,
      difficulty: item.difficulty,
      xpReward: 10 + item.difficulty,
      sources: [item.source],
      challenges: item.questions.map((question, number) => challenge(`${nodeId}-q${number + 1}`, question, item.source))
    };
    push(lesson, unit.kind);
    taught.push(lesson);
    const last = index === unit.lessons.length - 1;
    if (!last && (index + 1) % REVIEW_EVERY === 0) {
      const round = (index + 1) / REVIEW_EVERY;
      const reviewId = `deep-${unit.key}-review-${round}`;
      push(reviewLesson(unit, `lesson-${reviewId}`, reviewId, "Deep review", `Can you still remember these about ${unit.name}?`, taught, REVIEW_EVERY, 4), "review");
    }
  });
  const quizId = `deep-${unit.key}-final-quiz`;
  push(reviewLesson(unit, `lesson-${quizId}`, quizId, "Final quiz", `The last test: everything about ${unit.name}!`, taught, Math.min(8, taught.length), 5), "review");
  return { nodes, lessons };
}

/**
 * Adds each deep unit's lessons after its unit's own circles, each one opening after the one before. Runs once
 * the units are arranged (arrangeUnits), before chainCourse. Lesson and node ids are fixed, so progress stays.
 */
export function addDeepUnits(content: { course: LearningCourse; lessonsById: Record<string, Lesson> }) {
  return addUnits(content, DEEP_UNITS.filter((unit) => !SURAH_DEEP_UNITS.includes(unit)));
}

/** Adds the deep units of the surahs whose units addSurahMeanings makes, once it has made them. */
export function addSurahDeepUnits(content: { course: LearningCourse; lessonsById: Record<string, Lesson> }) {
  return addUnits(content, SURAH_DEEP_UNITS);
}

function addUnits(content: { course: LearningCourse; lessonsById: Record<string, Lesson> }, deepUnits: readonly DeepUnit[]) {
  const lessonsById = { ...content.lessonsById };
  // A topic made only of deep units (Scholars, Eid, Day of Judgment) starts as an empty section.
  const all = [SCHOLARS_SECTION, EID_SECTION, AKHIRAH_SECTION].reduce(
    (sections, empty) => (sections.some((section) => section.topicId === empty.topicId) ? sections : [...sections, empty]),
    content.course.sections
  );
  const sections = all.map((topic) => {
    const added = deepUnits.filter((unit) => unit.branch && unit.topicId === topic.topicId && !topic.branches.some((branch) => branch.id === unit.branchId));
    // A new unit goes after the topic's own units, before the ones from the notes.
    const before = topic.branches.findIndex((branch) => branch.id.startsWith("notes-"));
    const split = before === -1 ? topic.branches.length : before;
    const section = added.length
      ? {
          ...topic,
          branches: [
            ...topic.branches.slice(0, split),
            ...added.map((unit) => ({ id: unit.branchId, topicId: unit.topicId, ...unit.branch! })),
            ...topic.branches.slice(split)
          ].map((branch, index) => ({ ...branch, order: index + 1 }))
        }
      : topic;
    const units = deepUnits.filter((unit) => unit.topicId === section.topicId && section.branches.some((branch) => branch.id === unit.branchId));
    if (!units.length) return section;
    let nodes = [...section.nodes];
    for (const unit of units) {
      const own = nodes.filter((node) => node.branchId === unit.branchId);
      const built = buildUnit(unit);
      let previous = own[own.length - 1];
      const added = built.nodes.map((node, index) => {
        const linked = { ...node, order: own.length + index + 1, requiredNodeIds: previous ? [previous.id] : [] };
        const lesson = built.lessons[index];
        lessonsById[lesson.id] = { ...lesson, unlockRules: previous ? [`Complete ${previous.title}`] : [] };
        previous = linked;
        return linked;
      });
      const end = own[own.length - 1];
      const later = new Set(section.branches.slice(section.branches.findIndex((branch) => branch.id === unit.branchId) + 1).map((branch) => branch.id));
      const next = nodes.findIndex((node) => later.has(node.branchId));
      const at = end ? nodes.lastIndexOf(end) + 1 : next === -1 ? nodes.length : next;
      // A topic taught in order may open its next unit after this unit's old last circle: now it waits for the final quiz.
      const moved = (node: LearningNode) =>
        end && node.branchId !== unit.branchId && node.requiredNodeIds.includes(end.id)
          ? { ...node, requiredNodeIds: node.requiredNodeIds.map((id) => (id === end.id ? previous.id : id)) }
          : node;
      nodes = [...nodes.slice(0, at).map(moved), ...added, ...nodes.slice(at).map(moved)];
    }
    return { ...section, nodes, starsTarget: nodes.reduce((total, node) => total + node.starsReward, 0) };
  });
  return { course: { ...content.course, sections }, lessonsById };
}
