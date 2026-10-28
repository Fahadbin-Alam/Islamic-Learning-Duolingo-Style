import type { Challenge, DifficultyTier, LearningCourse, LearningNode, Lesson, LessonSource, TopicId } from "../types";
import { QURAN_AYAHS } from "./quranAyahs";

// Deep units: a person's life or a surah's tafsir taught in many small steps, each harder than the one before.
// They come after the short starter circles of their unit, so a beginner still starts simple. Every lesson
// teaches one card (a line, up to three chips, maybe a quote) and asks only what that card shows, with four
// choices. Every fact is from one checked Sunni source: a hadith on sunnah.com (number and grade as sunnah.com
// gives them), the Quran, or Tafsir Ibn Kathir on quran.com. Anything the scholars differ on is left out.

type Question =
  | { q: string; a: string; wrong: [string, string, string]; why: string }
  | { q: string; tf: boolean; why: string };

interface DeepLesson {
  slug: string;
  title: string;
  line: string;
  facts?: string[];
  quote?: { text: string; reference: string };
  source: LessonSource;
  difficulty: DifficultyTier;
  questions: Question[];
}

interface DeepUnit {
  /** Short key for ids: deep-<key>-<slug>. */
  key: string;
  topicId: TopicId;
  /** The existing unit the deep lessons join, after its own circles. */
  branchId: string;
  /** Who or what the unit is about, for the review lines. */
  name: string;
  kind: LearningNode["kind"];
  lessonType: NonNullable<Lesson["lessonType"]>;
  /** A surah unit's surah, on every lesson and circle. */
  surahName?: string;
  lessons: DeepLesson[];
}

function hadith(book: "bukhari" | "muslim" | "tirmidhi", number: string, narrator: string, grade: string, summary: string): LessonSource {
  const names = { bukhari: ["Sahih al-Bukhari", "Imam al-Bukhari"], muslim: ["Sahih Muslim", "Imam Muslim"], tirmidhi: ["Jami at-Tirmidhi", "Imam at-Tirmidhi"] };
  const [collection, collector] = names[book];
  // "3667, 3668": one hadith sunnah.com shows under two numbers; the link goes to the last one, as the reference ends with it.
  const linked = number.split(", ").pop();
  return {
    id: `deep_${book}_${number.replace(/\W+/g, "_")}`,
    site: "Sunnah.com",
    category: "hadith",
    title: `${collection} ${number}`,
    url: `https://sunnah.com/${book}:${linked}`,
    reference: `${collection} ${number}`,
    from: `${narrator}; collected by ${collector}`,
    grade,
    summary
  };
}

function ibnKathir(ayah: number, summary: string): LessonSource {
  return {
    id: `deep_ibn_kathir_1_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Fatihah 1:${ayah}`,
    url: `https://quran.com/1:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 1:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary
  };
}

const ayah = (number: number) => ({ text: QURAN_AYAHS[`1:${number}`], reference: `Quran 1:${number}` });

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
      source: hadith("tirmidhi", "3747", "Abd ar-Rahman ibn Awf", "Sahih (Darussalam)", "The Prophet ﷺ said: Abu Bakr is in Paradise, Umar is in Paradise, Uthman, Ali... ten in all."),
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

export const DEEP_UNITS: readonly DeepUnit[] = [ABU_BAKR, FATIHAH];

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
  const lessonsById = { ...content.lessonsById };
  const sections = content.course.sections.map((section) => {
    const units = DEEP_UNITS.filter((unit) => unit.topicId === section.topicId && section.branches.some((branch) => branch.id === unit.branchId));
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
      const at = nodes.lastIndexOf(own[own.length - 1]) + 1;
      nodes = [...nodes.slice(0, at), ...added, ...nodes.slice(at)];
    }
    return { ...section, nodes, starsTarget: nodes.reduce((total, node) => total + node.starsReward, 0) };
  });
  return { course: { ...content.course, sections }, lessonsById };
}
