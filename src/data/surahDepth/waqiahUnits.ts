import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Al-Waqi'ah ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Waqi'ah 56:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_56_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Waqi'ah 56:${ayah}`,
    url: `https://quran.com/56:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 56:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q56 = (ayah: number) => quranQuote(56, ayah);

/** Ayahs 1 to 26: the Event that must come, the three groups of people, and the reward of the foremost. */
const WAQIAH_ONE: DeepUnit = {
  key: "waqiah1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-56",
  name: "Al-Waqi'ah, ayahs 1 to 26",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Waqi'ah",
  lessons: [
    {
      slug: "the-event-that-must-come",
      title: "The Event that must come",
      line: "Al-Waqi'ah is a name for the Day of Resurrection.",
      facts: ["Al-Waqi'ah means the Event that happens", "That Day is real and will surely come"],
      quote: q56(1),
      source: ik(1, "Ibn Kathir says Al-Waqi'ah is one of the names of the Day of Resurrection, because that Day is real and will surely come.", "is one of the names of the Day of Resurrection, because that Day is real and will surely come"),
      difficulty: 1,
      questions: [
        { q: "What is Al-Waqi'ah a name for?", a: "The Day of Resurrection", wrong: ["The month of Ramadan", "A city in Arabia", "A river in Paradise"], why: "Al-Waqi'ah is one of the names of the Day of Resurrection." },
        { q: "Why is the Day called Al-Waqi'ah?", a: "Because it will surely come", wrong: ["Because it is far away", "Because it is a story", "Because it is a dream"], why: "Because that Day is real and will surely come." },
        { tf: true, q: "Surah 56 opens with: When the Event occurs.", why: "When the Waqi'ah occurs." }
      ]
    },
    {
      slug: "nothing-can-stop-it",
      title: "Nothing can stop it",
      line: "When Allah commands that Day to begin, none can stop it.",
      facts: ["No one can push the Day back", "Allah only says Be, and it is"],
      quote: q56(2),
      source: ik(2, "Ibn Kathir says when Allah commands the Day of Resurrection to begin, none can stop it from happening or prevent it from beginning.", "none can stop it from happening or prevent it from beginning"),
      difficulty: 2,
      questions: [
        { q: "Who can stop the Day of Resurrection?", a: "No one at all", wrong: ["The kings", "The scientists", "The strongest army"], why: "None can stop it from happening or prevent it from beginning." },
        { q: "What does 56:2 say about the Event?", a: "Nothing can make it untrue", wrong: ["It may not happen", "It is a story", "It is far off"], why: "There is not, for its occurrence, Kadhibah." },
        { tf: false, q: "People will be able to delay the Hour a little.", why: "None can stop it from happening or prevent it from beginning." }
      ]
    },
    {
      slug: "never-taken-back",
      title: "Never taken back",
      line: "Qatadah said the Day will not be cancelled or called off.",
      facts: ["Allah keeps His promise", "The Day will come exactly as He said"],
      quote: q56(2),
      source: ik(2, "Ibn Kathir quotes Qatadah: the Day shall not be discontinued, taken back or aborted.", "It shall not be discontinued, taken back or aborted"),
      difficulty: 2,
      questions: [
        { q: "What did Qatadah say about the Day?", a: "Never taken back or cancelled", wrong: ["It may be cancelled", "It already happened", "It is only a warning"], why: "It shall not be discontinued, taken back or aborted." },
        { q: "What did Muhammad bin Kab say Kadhibah means?", a: "It will certainly occur", wrong: ["It is a lie", "It will be late", "It is a riddle"], why: "Muhammad bin Ka'b said: It will certainly occur." },
        { tf: true, q: "Allah only says Be! and it is.", why: "And on the Day He will say: Be! and it is! His Word is the Truth." }
      ]
    },
    {
      slug: "bringing-low-raising-up",
      title: "Bringing low, raising up",
      line: "That Day lowers some people and raises others.",
      facts: ["The proud can be brought low", "The humble believers are raised up"],
      quote: q56(3),
      source: ik(3, "Ibn Kathir says Al-Waqi'ah lowers some people even if they had been mighty in this life, and elevates others to the highest grades even if they were weak in this life.", "It also elevates others to the highest grades"),
      difficulty: 2,
      questions: [
        { q: "What does the Day do, in 56:3?", a: "Brings some low, raises others", wrong: ["Raises everyone", "Lowers everyone", "Changes nothing"], why: "Bringing low (some), exalting (others)." },
        { q: "Can a weak believer be raised high that Day?", a: "Yes, to the highest grades", wrong: ["No, never", "Only if rich", "Only if famous"], why: "It also elevates others to the highest grades... even if they were weak in this life." },
        { tf: true, q: "Being mighty in this life does not save anyone that Day.", why: "It lowers some people... even if they had been mighty in this life." }
      ]
    },
    {
      slug: "heard-near-and-far",
      title: "Heard near and far",
      line: "Ibn Abbas said the near and the far will hear it.",
      facts: ["Everyone will hear it", "No one will miss that Day"],
      quote: q56(3),
      source: ik(3, "Ibn Kathir quotes Ibn Abbas that it made the near and the far hear it.", "It made the near and the far hear it"),
      difficulty: 3,
      questions: [
        { q: "Who will hear the Event, per Ibn Abbas?", a: "The near and the far", wrong: ["Only the near", "Only the angels", "Only the kings"], why: "It made the near and the far hear it." },
        { q: "Which scholars said the Day lowers and raises people?", a: "Al-Hasan and Qatadah", wrong: ["Only poets", "No one", "Only Ibn Jarir"], why: "This was said by Al-Hasan, Qatadah and others." },
        { tf: false, q: "Some people will not even hear that the Day has come.", why: "It made the near and the far hear it." }
      ]
    },
    {
      slug: "the-earth-shaken",
      title: "The earth shaken",
      line: "The earth will shake like a sieve shaking its contents.",
      facts: ["The whole earth will move", "Surah 99 speaks of the same shaking"],
      quote: q56(4),
      source: ik(4, "Ibn Kathir quotes Ar-Rabi bin Anas: the earth will be shaken with all that is in it, just as a sifter is shaken with its contents.", "just as a sifter is shaken with its contents"),
      difficulty: 2,
      questions: [
        { q: "What will happen to the earth, in 56:4?", a: "Shaken with a terrible shake", wrong: ["Turned into gold", "Covered in snow", "Left untouched"], why: "When the earth will be shaken with a terrible shake." },
        { q: "What did Ar-Rabi compare the shaking to?", a: "A sifter shaking its contents", wrong: ["A drum", "A boat at sea", "A swing"], why: "Just as a sifter is shaken with its contents." },
        { q: "Which surah also speaks of the earth shaken?", a: "Surah 99", wrong: ["Surah 1", "Surah 112", "Surah 108"], why: "When the earth is shaken with its earthquake. (99:1)" }
      ]
    },
    {
      slug: "mountains-crushed",
      title: "Mountains crushed",
      line: "The great mountains will be crushed into powder.",
      facts: ["Even mountains cannot stand that Day", "Nothing is strong compared to Allah"],
      quote: q56(5),
      source: ik(5, "Ibn Kathir says the mountains will be relentlessly pulverized, as Ibn Abbas, Mujahid and others said.", "relentlessly pulverized"),
      difficulty: 1,
      questions: [
        { q: "What happens to the mountains, in 56:5?", a: "Powdered to dust", wrong: ["They grow taller", "They turn to gold", "They float away whole"], why: "And the mountains will be powdered to dust." },
        { q: "What did Ibn Zayd compare them to, from 73:14?", a: "A heap of sand poured out", wrong: ["A tower of ice", "A field of grass", "A tall tree"], why: "A heap of sand poured out. (73:14)" },
        { tf: true, q: "The strongest things on earth cannot stand that Day.", why: "And the mountains will be powdered to dust." }
      ]
    },
    {
      slug: "like-floating-dust",
      title: "Like floating dust",
      line: "The mountains become dust that floats away with no trace.",
      facts: ["Ali said it is like a dust storm that fades", "Elsewhere they are like carded wool"],
      quote: q56(6),
      source: ik(6, "Ibn Kathir quotes Ali that the mountains will become like the rising dust storm that soon fades away leaving no trace of itself behind.", "like the rising dust storm that soon fades away leaving no trace of itself behind"),
      difficulty: 2,
      questions: [
        { q: "What do the mountains become, in 56:6?", a: "Floating dust particles", wrong: ["Shining rocks", "Tall towers", "Deep lakes"], why: "So that they will become floating dust particles." },
        { q: "What did Ali compare the mountains to?", a: "A dust storm that fades", wrong: ["A river", "A fortress", "A ship"], why: "It will become like the rising dust storm that soon fades away leaving no trace of itself behind." },
        { q: "What else are mountains like, in other ayahs?", a: "Carded wool", wrong: ["Solid iron", "Thick ice", "Hard glass"], why: "Becoming like carded wool on the Day of Resurrection." }
      ]
    },
    {
      slug: "three-groups",
      title: "Three groups",
      line: "On that Day all people will be in three groups.",
      facts: ["Those on the right, and those on the left", "And the foremost, the nearest to Allah"],
      quote: q56(7),
      source: ik(7, "Ibn Kathir says people will be divided into three categories on the Day of Resurrection.", "people will be divided into three categories on the Day of Resurrection"),
      difficulty: 1,
      questions: [
        { q: "Into how many groups will people be, in 56:7?", a: "Three", wrong: ["Two", "Five", "Seven"], why: "And you (all) will be in three groups." },
        { q: "Which group is the highest?", a: "The foremost", wrong: ["Those on the left", "Those on the right", "All are equal"], why: "They are in a better grade and status and nearer to Allah than those on the right side." },
        { q: "Which ayah also lists three kinds of people?", a: "35:32", wrong: ["2:255", "1:1", "112:1"], why: "Of them are some who wrong themselves, and of them are some who follow a middle course, and of them are some who are... foremost in good deeds. (35:32)" }
      ]
    },
    {
      slug: "those-on-the-right",
      title: "Those on the right",
      line: "Those on the right get their book in their right hand.",
      facts: ["They are most of the people of Paradise", "How fortunate they will be!"],
      quote: q56(8),
      source: ik(8, "Ibn Kathir says this group will be given their Books of Records in their right hand, and As-Suddi said they are most of the people of Paradise.", "This category will be given their Books of Records in their right hand"),
      difficulty: 1,
      questions: [
        { q: "In which hand do they get their book?", a: "The right hand", wrong: ["The left hand", "Both hands", "No hand"], why: "This category will be given their Books of Records in their right hand." },
        { q: "Who are most of the people of Paradise, per As-Suddi?", a: "Those on the right", wrong: ["Those on the left", "Only Prophets", "Only kings"], why: "They will comprise the majority of the residents of Paradise." },
        { tf: true, q: "56:8 says how fortunate those on the right will be.", why: "So those on the right – how (fortunate) will be those on the right!" }
      ]
    },
    {
      slug: "those-on-the-left",
      title: "Those on the left",
      line: "Those on the left get their book in their left hand.",
      facts: ["They are the people of the Fire", "We ask Allah to save us from their deeds"],
      quote: q56(9),
      source: ik(9, "Ibn Kathir says this group will be given their Books of Records in their left hands, and he asks Allah to save us from their actions.", "This category will be given their Books of Records in their left hands"),
      difficulty: 1,
      questions: [
        { q: "In which hand do they get their book?", a: "The left hand", wrong: ["The right hand", "Both hands", "On their heads"], why: "This category will be given their Books of Records in their left hands." },
        { q: "What does Ibn Kathir ask Allah for?", a: "To save us from their actions", wrong: ["Wealth", "Fame", "A long journey"], why: "May Allah save us from their actions." },
        { tf: true, q: "56:9 says how unfortunate those on the left will be.", why: "And those on the left – how (unfortunate) will be those on the left!" }
      ]
    },
    {
      slug: "the-foremost",
      title: "The foremost",
      line: "The foremost are the best group, nearest to Allah.",
      facts: ["They include Messengers and Prophets", "And true believers and martyrs"],
      quote: q56(10),
      source: ik(10, "Ibn Kathir says the foremost are the chiefs of those on the right; they include the Messengers, Prophets, true believers and martyrs.", "they include the Messengers, Prophets, true believers and martyrs"),
      difficulty: 2,
      questions: [
        { q: "Who are among the foremost?", a: "Messengers, Prophets and martyrs", wrong: ["Rich traders", "Famous poets", "Strong kings"], why: "They include the Messengers, Prophets, true believers and martyrs." },
        { q: "Are the foremost more or fewer than those on the right?", a: "Fewer", wrong: ["More", "Equal", "No one knows"], why: "They are fewer than those on the right side." },
        { tf: true, q: "The foremost lead those on the right.", why: "They are the chiefs of those on the right side." }
      ]
    },
    {
      slug: "race-to-do-good",
      title: "Race to do good",
      line: "The foremost rushed to do good in this life.",
      facts: ["Being first in good deeds is the key", "Allah tells us to race to forgiveness"],
      quote: q56(10),
      source: ik(10, "Ibn Kathir says those who rush to obey Allah in this life and are foremost in performing acts of righteousness will be among the foremost honored in the Hereafter.", "those who rush to obey Allah in this life and are foremost in performing acts of righteousness"),
      difficulty: 2,
      questions: [
        { q: "Why are the foremost first in the Hereafter?", a: "They rushed to obey Allah", wrong: ["They were rich", "They were tall", "They were famous"], why: "Those who rush to obey Allah in this life and are foremost in performing acts of righteousness." },
        { q: "What does 57:21 tell us to race toward?", a: "Forgiveness and Paradise", wrong: ["Money", "Power", "Praise of people"], why: "Race with one another in hastening towards forgiveness from your Lord, and Paradise." },
        { q: "How wide is Paradise, per 3:133?", a: "As the heavens and the earth", wrong: ["As one city", "As a desert", "As a garden"], why: "And for Paradise as wide as the heavens and the earth. (3:133)" }
      ]
    },
    {
      slug: "the-reward-matches-the-deed",
      title: "The reward matches the deed",
      line: "As people race to good now, they will be first later.",
      facts: ["The reward fits the kind of deed", "Do good early, do not delay"],
      quote: q56(10),
      source: ik(10, "Ibn Kathir says the reward is according to the kind of deed, and as one does, so he is judged.", "Verily, the reward is according to the kind of deed"),
      difficulty: 3,
      questions: [
        { q: "What is the reward according to, per Ibn Kathir?", a: "The kind of deed", wrong: ["Wealth", "Family name", "Height"], why: "Verily, the reward is according to the kind of deed." },
        { q: "Who said the foremost are the Prophets?", a: "Muhammad bin Kab", wrong: ["Pharaoh", "Abu Jahl", "Qarun"], why: "Muhammad bin Ka'b... said that, And those foremost will be foremost is about the Prophets." },
        { tf: true, q: "As-Suddi said the foremost are the people of the highest places in Paradise.", why: "As-Suddi said that they are the residents of the utmost highs (Ahl Al-'Illiyyin, in Paradise)." }
      ]
    },
    {
      slug: "the-nearest-to-allah",
      title: "The nearest to Allah",
      line: "The foremost will be the nearest to Allah.",
      facts: ["Their rank is above those on the right", "Nearness to Allah is the best gift"],
      quote: q56(11),
      source: ik(11, "Ibn Kathir says the foremost are in a better grade and status and nearer to Allah than those on the right side.", "They are in a better grade and status and nearer to Allah than those on the right side"),
      difficulty: 2,
      questions: [
        { q: "What are the foremost called, in 56:11?", a: "The nearest to Allah", wrong: ["The farthest", "The richest", "The loudest"], why: "These will be the nearest (to Allah)." },
        { q: "Whom are they nearer to Allah than?", a: "Those on the right", wrong: ["The angels", "The Prophets", "No one"], why: "Nearer to Allah than those on the right side." },
        { tf: true, q: "The foremost have a better grade than those on the right.", why: "They are in a better grade and status and nearer to Allah than those on the right side." }
      ]
    },
    {
      slug: "gardens-of-delight",
      title: "Gardens of Delight",
      line: "The foremost will live in the Gardens of Delight.",
      facts: ["Their home is in Paradise", "The next ayahs describe their reward"],
      quote: q56(12),
      source: ik(12, "Ibn Kathir closes the passage with: These will be the nearest to Allah, in the Gardens of Delight.", "In the Gardens of Delight"),
      difficulty: 1,
      questions: [
        { q: "Where will the foremost be, in 56:12?", a: "In the Gardens of Delight", wrong: ["In a desert", "In a palace on earth", "On a ship"], why: "In the Gardens of Delight." },
        { q: "What comes right after 56:12?", a: "A description of their reward", wrong: ["A story of Pharaoh", "Laws of trade", "Rules of fasting"], why: "Allah states that the foremost of the close believers are a multitude..." },
        { tf: false, q: "The foremost stay outside Paradise.", why: "In the Gardens of Delight." }
      ]
    },
    {
      slug: "many-from-the-first",
      title: "Many from the first ones",
      line: "Many of the foremost are from the first generations.",
      facts: ["Ibn Kathir: the early part of this Ummah", "Al-Hasan said the same"],
      quote: q56(13),
      source: ik(13, "Ibn Kathir says the correct opinion is that a multitude of those from the first ones refers to the earlier generations of this Ummah.", "refers to the earlier generations of this Ummah"),
      difficulty: 3,
      questions: [
        { q: "Who are the first ones, per Ibn Kathir?", a: "The early generations of this Ummah", wrong: ["The angels", "The jinn", "The animals"], why: "A multitude of those will be from the first ones, refers to the earlier generations of this Ummah." },
        { q: "What did Al-Hasan say about the first ones?", a: "A multitude from early in this Ummah", wrong: ["Only the Prophets", "No one", "Only the kings"], why: "A multitude from the earlier generation of this Ummah." },
        { tf: true, q: "Ibn Kathir says this Ummah is the best of all nations.", why: "This Ummah is the best of all nations, according to the text of the Qur'an." }
      ]
    },
    {
      slug: "the-best-generation",
      title: "The best generation",
      line: "The best people were the Prophet's ﷺ generation, then the next.",
      facts: ["The Companions were the best generation", "Then those after them, then after them"],
      quote: q56(13),
      source: hadith("muslim", "2533", "Abdullah ibn Mas'ud", "Sahih", "The Prophet ﷺ said the best of his Ummah are his own generation, then those nearest to them, then those nearest to them.", "The best of my Umma would be those of the generation nearest to mine"),
      difficulty: 2,
      questions: [
        { q: "Which generation is the best, per Muslim 2533?", a: "The Prophet's ﷺ own generation", wrong: ["The last one", "Ours today", "Before Adam"], why: "The best of my Umma would be those of the generation nearest to mine." },
        { q: "Who comes after them in goodness?", a: "Those nearest to them", wrong: ["No one", "The kings", "The poets"], why: "Then those nearest to them, then those nearest to them." },
        { tf: true, q: "Ibn Kathir uses this to explain the many first ones in 56:13.", why: "The best people are my generation, then the next generation, then the next generation." }
      ]
    },
    {
      slug: "a-few-from-the-later",
      title: "A few from the later ones",
      line: "Fewer of the foremost come from the later generations.",
      facts: ["The later ones are the last of this Ummah", "Still, a group stays upon the truth"],
      quote: q56(14),
      source: ik(14, "Ibn Kathir says a few from the later ones refers to the latter people of this Ummah.", "refers to the latter people of this Ummah"),
      difficulty: 2,
      questions: [
        { q: "Who are the later ones, per Ibn Kathir?", a: "The later people of this Ummah", wrong: ["The angels", "Old nations", "The jinn"], why: "And a few of those will be from the later ones, refers to the latter people of this Ummah." },
        { q: "What did the Prophet ﷺ say a group will always do?", a: "Remain on the truth", wrong: ["Disappear", "Stop praying", "Forget the Quran"], why: "A group of my Ummah will always remain on the truth." },
        { tf: false, q: "No one in the later generations can be among the foremost.", why: "And a few of those will be from the later ones." }
      ]
    },
    {
      slug: "seventy-thousand-without-reckoning",
      title: "Seventy thousand without reckoning",
      line: "Seventy thousand of this Ummah enter Paradise with no reckoning.",
      facts: ["The foremost of this Ummah are many", "Their rank is high because of their religion"],
      quote: q56(14),
      source: ik(14, "Ibn Kathir says in a Mutawatir hadith the Prophet ﷺ mentioned that seventy thousand of this Ummah will enter Paradise without reckoning.", "seventy thousand of this Ummah will enter Paradise without reckoning"),
      difficulty: 3,
      questions: [
        { q: "How many enter Paradise without reckoning?", a: "Seventy thousand", wrong: ["Seven", "Seventy", "Seven hundred"], why: "Seventy thousand of this Ummah will enter Paradise without reckoning." },
        { q: "What kind of hadith is it, per Ibn Kathir?", a: "Mutawatir, from many routes", wrong: ["Weak", "Made up", "Unknown"], why: "In a Mutawatir Hadith, the Prophet ﷺ mentioned that seventy thousand..." },
        { tf: true, q: "Ibn Kathir says this Ummah is more honored than any other.", why: "This Ummah is more honored than any other Ummah." }
      ]
    },
    {
      slug: "thrones-woven-with-gold",
      title: "Thrones woven with gold",
      line: "The foremost sit on thrones woven with gold.",
      facts: ["Mawdunah means woven", "Ibn Abbas said: woven with gold"],
      quote: q56(15),
      source: ik(15, "Ibn Kathir quotes Ibn Abbas that Mawdunah means woven with gold.", "Woven with gold"),
      difficulty: 1,
      questions: [
        { q: "What will the foremost sit on, in 56:15?", a: "Thrones", wrong: ["Rocks", "Sand", "Boats"], why: "(They will be) on thrones, Mawdunah." },
        { q: "What does Mawdunah mean, per Ibn Abbas?", a: "Woven with gold", wrong: ["Made of wood", "Covered in dust", "Very old"], why: "Ibn 'Abbas said, Woven with gold." },
        { tf: true, q: "Mujahid and Qatadah said the same as Ibn Abbas.", why: "Similar was reported from Mujahid, 'Ikrimah, Sa'id bin Jubayr, Zayd bin Aslam, Qatadah..." }
      ]
    },
    {
      slug: "face-to-face",
      title: "Face to face",
      line: "They recline facing each other, no one at the back.",
      facts: ["Friends sit together in Paradise", "No one is left behind the others"],
      quote: q56(16),
      source: ik(16, "Ibn Kathir says they will face each other, and none of them will be in the back lines.", "they will face each other, and none of them will be in the back lines"),
      difficulty: 1,
      questions: [
        { q: "How do they sit, in 56:16?", a: "Reclining face to face", wrong: ["Back to back", "In a line", "Alone"], why: "Reclining thereon, face to face." },
        { q: "Is anyone in the back rows?", a: "No, none of them", wrong: ["Yes, the poor", "Yes, the young", "Yes, the late"], why: "None of them will be in the back lines." },
        { tf: true, q: "Facing each other shows love and friendship.", why: "They will face each other, and none of them will be in the back lines." }
      ]
    },
    {
      slug: "servants-who-never-age",
      title: "Servants who never age",
      line: "Young servants who never grow old go around serving them.",
      facts: ["They stay young forever", "They serve the people of Paradise"],
      quote: q56(17),
      source: ik(17, "Ibn Kathir says these immortal boys will never grow up, get old or change in shape.", "who will never grow up, get old or change in shape"),
      difficulty: 1,
      questions: [
        { q: "Who goes around them, in 56:17?", a: "Immortal boys serving", wrong: ["Angry guards", "Wild animals", "Old men"], why: "Immortal boys will go around them (serving)." },
        { q: "What never happens to these servants?", a: "They never grow old", wrong: ["They never smile", "They never move", "They never speak"], why: "Who will never grow up, get old or change in shape." },
        { tf: false, q: "The servants of Paradise grow old with time.", why: "Who will never grow up, get old or change in shape." }
      ]
    },
    {
      slug: "cups-from-a-flowing-spring",
      title: "Cups from a flowing spring",
      line: "They get cups and jugs from a spring that never runs dry.",
      facts: ["Cups, jugs and glasses are brought", "The drink flows from a spring"],
      quote: q56(18),
      source: ik(18, "Ibn Kathir says the drink is drawn from a flowing spring, not from containers that might get empty.", "a flowing spring, not from containers that might get empty"),
      difficulty: 2,
      questions: [
        { q: "What are they served with, in 56:18?", a: "Cups, jugs and a glass", wrong: ["Bowls of sand", "Empty plates", "Stones"], why: "With cups, and jugs, and a glass from a flowing spring." },
        { q: "Where does the drink come from?", a: "A spring that keeps flowing", wrong: ["A jar that empties", "A well that dries", "The sea"], why: "A flowing spring, not from containers that might get empty." },
        { tf: true, q: "Ibn Kathir says the cups have no handles or spouts.", why: "These cups do not have handles or spouts." }
      ]
    },
    {
      slug: "no-headache-no-harm",
      title: "No headache, no harm",
      line: "The drink of Paradise never hurts the head or the mind.",
      facts: ["Unlike the drinks of this world, it harms no one", "The mind stays clear"],
      quote: q56(19),
      source: ik(19, "Ibn Kathir says, quoting Mujahid and others, that the drink of Paradise does not give them a headache and does not change their reasoning.", "It does not give them a headache"),
      difficulty: 2,
      questions: [
        { q: "What does Yusadda'un mean, per Mujahid?", a: "Getting a headache", wrong: ["Getting rich", "Getting tired", "Getting lost"], why: "Wherefrom neither Yusadda'un means, It does not give them a headache." },
        { q: "What stays safe when they drink?", a: "Their mind", wrong: ["Only their hands", "Nothing", "Only their clothes"], why: "It does not change their sense of reasoning." },
        { tf: true, q: "The drink of Paradise is free of worldly harms.", why: "So Allah mentioned the wine of Paradise free of these characteristics." }
      ]
    },
    {
      slug: "fruit-they-choose",
      title: "Fruit they choose",
      line: "They are brought whatever fruit they choose.",
      facts: ["Every fruit they wish for comes", "Choosing what we like is allowed"],
      quote: q56(20),
      source: ik(20, "Ibn Kathir says whatever fruits they wish for will be distributed among them, and choosing the fruits we prefer is allowed.", "whatever fruits they wish for will be distributed among them"),
      difficulty: 1,
      questions: [
        { q: "What fruit do they get, in 56:20?", a: "Whatever they choose", wrong: ["Only dates", "Only one kind", "None"], why: "And with fruit that they may choose." },
        { q: "What does Ibn Kathir take from 56:20?", a: "We may choose fruits we prefer", wrong: ["We must eat all", "Fruit is forbidden", "Only kings choose"], why: "This Ayah is a proof that we are allowed to choose the fruits that we prefer and wish to eat." },
        { tf: true, q: "In Paradise, a wish for fruit is answered.", why: "Whatever fruits they wish for will be distributed among them." }
      ]
    },
    {
      slug: "birds-they-desire",
      title: "Birds they desire",
      line: "They are given the meat of birds they desire.",
      facts: ["Food in Paradise is what they love", "Every wish is met"],
      quote: q56(21),
      source: ik(21, "Ibn Kathir quotes the ayah: and with the flesh of fowls that they desire.", "And with the flesh of fowls that they desire"),
      difficulty: 1,
      questions: [
        { q: "What meat is named in 56:21?", a: "Birds they desire", wrong: ["Fish only", "None", "Bread"], why: "And with the flesh of fowls that they desire." },
        { q: "Which comes first in 56:20-21, fruit or meat?", a: "Fruit", wrong: ["Meat", "Neither", "Both together"], why: "And with fruit that they may choose. And with the flesh of fowls that they desire." },
        { tf: true, q: "The food of Paradise is what they wish for.", why: "And with the flesh of fowls that they desire." }
      ]
    },
    {
      slug: "pure-as-pearls",
      title: "Pure as pearls",
      line: "The pure companions of Paradise have wide, lovely eyes.",
      facts: ["Hur are the pure companions of Paradise", "Their beauty is pure and clean"],
      quote: q56(22),
      source: ik(22, "Ibn Kathir says they are just as white and pure fresh pearls.", "just as white and pure fresh pearls"),
      difficulty: 2,
      questions: [
        { q: "How are the Hur described, in 56:22?", a: "With wide lovely eyes", wrong: ["With angry faces", "With old faces", "With hidden faces"], why: "And (there will be) Hur with wide lovely eyes." },
        { q: "What does Ibn Kathir compare them to?", a: "White, pure fresh pearls", wrong: ["Stones", "Clouds", "Sand"], why: "Just as white and pure fresh pearls." },
        { tf: true, q: "Surah Ar-Rahman also describes them.", why: "And also their description in Surat Ar-Rahman (chapter 55)." }
      ]
    },
    {
      slug: "like-hidden-pearls",
      title: "Like hidden pearls",
      line: "They are like pearls kept safe in their shells.",
      facts: ["A hidden pearl is never touched or dulled", "37:49 compares them to guarded eggs"],
      quote: q56(23),
      source: ik(23, "Ibn Kathir quotes the ayah: like unto preserved pearls.", "Like unto preserved pearls"),
      difficulty: 2,
      questions: [
        { q: "What are they like, in 56:23?", a: "Preserved pearls", wrong: ["Broken shells", "Grains of sand", "Old coins"], why: "Like unto preserved pearls." },
        { q: "Which surah compares them to guarded eggs?", a: "As-Saffat (37)", wrong: ["Al-Fatihah (1)", "Al-Kawthar (108)", "An-Nas (114)"], why: "As if they were eggs preserved. (37:49), in Surat As-Saffat (chapter 37)." },
        { tf: true, q: "A preserved pearl is kept clean and untouched.", why: "Indicating that they are just as white and pure fresh pearls." }
      ]
    },
    {
      slug: "a-reward-for-their-deeds",
      title: "A reward for their deeds",
      line: "All these gifts are a reward for what they used to do.",
      facts: ["Good deeds in this life lead to Paradise", "Allah never forgets a good deed"],
      quote: q56(24),
      source: ik(24, "Ibn Kathir says these delights are rewards for the good deeds that they performed in this life.", "are rewards for the good deeds that they performed"),
      difficulty: 1,
      questions: [
        { q: "Why are they given these gifts, in 56:24?", a: "As a reward for their deeds", wrong: ["By luck", "For their wealth", "For their looks"], why: "A reward for what they used to do." },
        { q: "When did they do those deeds?", a: "In this life", wrong: ["In Paradise", "Before birth", "Never"], why: "Rewards for the good deeds that they performed (in this life)." },
        { tf: true, q: "Every good deed today counts for the Hereafter.", why: "A reward for what they used to do." }
      ]
    },
    {
      slug: "no-idle-talk",
      title: "No idle talk",
      line: "In Paradise no one hears bad or useless talk.",
      facts: ["No lies, no mean words", "Paradise is calm and kind"],
      quote: q56(25),
      source: ik(25, "Ibn Kathir says they will not hear foul or unnecessary speech in Paradise.", "they will not hear foul or unnecessary speech in Paradise"),
      difficulty: 1,
      questions: [
        { q: "What will they not hear, in 56:25?", a: "Laghw or sinful speech", wrong: ["Any greeting", "Birdsong", "The Quran"], why: "No Laghw (evil vain talk) will they hear therein, nor any sinful speech." },
        { q: "What kind of speech is missing in Paradise?", a: "Foul or useless speech", wrong: ["Kind words", "Greetings", "Praise of Allah"], why: "They will not hear foul or unnecessary speech in Paradise." },
        { tf: true, q: "88:11 also says no harmful speech is heard there.", why: "Where they shall neither hear harmful speech nor falsehood. (88:11)" }
      ]
    },
    {
      slug: "salam-salam",
      title: "Salam, Salam",
      line: "The only words heard are Salam, Salam: peace, peace.",
      facts: ["The people of Paradise greet with salam", "14:23 says the same"],
      quote: q56(26),
      source: ik(26, "Ibn Kathir says they will greet each other with Salam, as Allah said: their greeting therein will be Salaman.", "they will greet each other with Salam"),
      difficulty: 1,
      questions: [
        { q: "What saying is heard, in 56:26?", a: "Salaman! Salaman!", wrong: ["Goodbye", "Hurry up", "Nothing"], why: "But only the saying of: Salaman! Salaman!" },
        { q: "What does Salam mean?", a: "Peace", wrong: ["War", "Food", "Gold"], why: "Salaman (peace!), Salaman (peace!)." },
        { q: "Which ayah also gives the greeting of Paradise?", a: "14:23", wrong: ["2:2", "112:4", "1:5"], why: "Their greeting therein will be: Salaman (peace!). (14:23)" }
      ]
    },
    {
      slug: "spread-salam-now",
      title: "Spread salam now",
      line: "Spreading salam builds love, and love is part of faith.",
      facts: ["We cannot truly believe without loving each other", "Salam spreads that love"],
      quote: q56(26),
      source: hadith("muslim", "54", "Abu Hurairah", "Sahih", "The Prophet ﷺ said we will not enter Paradise until we believe, and we will not believe until we love one another, and spreading salam fosters that love.", "you will not believe as long as you do not love one another"),
      difficulty: 2,
      questions: [
        { q: "What must we do to truly believe, per Muslim 54?", a: "Love one another", wrong: ["Be rich", "Be famous", "Live alone"], why: "You will not believe as long as you do not love one another." },
        { q: "What fosters love among us?", a: "Spreading salam", wrong: ["Arguing", "Boasting", "Staying silent"], why: "Should I not direct you to a thing which, if you do, will foster love amongst you." },
        { tf: true, q: "The greeting of Paradise is also our greeting now.", why: "They will greet each other with Salam." }
      ]
    }
  ]
};

/** Ayahs 27 to 56: the reward of those on the right, and the end of those on the left who denied the Resurrection. */
const WAQIAH_TWO: DeepUnit = {
  key: "waqiah2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-56",
  name: "Al-Waqi'ah, ayahs 27 to 56",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Waqi'ah",
  lessons: [
    {
      slug: "how-fortunate-those-on-the-right",
      title: "How fortunate those on the right",
      line: "Next Allah tells of those on the right, the righteous believers.",
      facts: ["They are a rank below the foremost", "Their reward is still great"],
      quote: q56(27),
      source: ik(27, "Ibn Kathir says after the foremost, Allah mentioned the end of those on the right, the righteous believers.", "those on the right, the righteous believers"),
      difficulty: 1,
      questions: [
        { q: "Who are those on the right?", a: "The righteous believers", wrong: ["The deniers", "The angels", "The jinn only"], why: "He next mentioned the end of those on the right, the righteous believers." },
        { q: "Who is higher, the foremost or those on the right?", a: "The foremost", wrong: ["Those on the right", "Both equal", "Neither"], why: "Those on the right side are lesser in rank than the foremost in faith." },
        { tf: true, q: "56:27 asks: how fortunate will those on the right be?", why: "And those on the right – how (fortunate) will be those on the right?" }
      ]
    },
    {
      slug: "lote-trees-without-thorns",
      title: "Lote trees without thorns",
      line: "They live among lote trees that have no thorns.",
      facts: ["Sidr is the lote tree", "Makhdud means with its thorns removed"],
      quote: q56(28),
      source: ik(28, "Ibn Kathir quotes Ibn Abbas, Mujahid and many others that Sidr Makhdud is the kind without thorns.", "The kind without thorns"),
      difficulty: 2,
      questions: [
        { q: "What tree is named in 56:28?", a: "The lote tree (Sidr)", wrong: ["The palm tree", "The olive tree", "The fig tree"], why: "(They will be) among Sidri Makhdud." },
        { q: "What does Makhdud mean, per many scholars?", a: "Without thorns", wrong: ["Very tall", "Very old", "Without leaves"], why: "The kind without thorns." },
        { tf: true, q: "The lote tree of this world has thorns.", why: "The lote tree, of this life is thorny and carries few fruits." }
      ]
    },
    {
      slug: "heavy-with-fruit",
      title: "Heavy with fruit",
      line: "The lote tree of Paradise is full of fruit, not thorns.",
      facts: ["In this world it has few fruits", "In Paradise its fruit bends the trunk"],
      quote: q56(28),
      source: ik(28, "Ibn Kathir says in the Hereafter the lote tree does not have thorns and carries plenty of fruit, the weight of which strains its trunk.", "it does not have thorns and carries plenty of fruit"),
      difficulty: 2,
      questions: [
        { q: "How is the lote tree of Paradise different?", a: "No thorns and much fruit", wrong: ["More thorns", "No fruit", "No shade"], why: "In the Hereafter, it is the opposite; it does not have thorns and carries plenty of fruit." },
        { q: "What did Ibn Abbas also say Makhdud means?", a: "Laden with fruits", wrong: ["Dry", "Small", "Broken"], why: "And from Ibn 'Abbas: It is the one that is laden with fruits." },
        { tf: true, q: "Ibn Kathir says both meanings apply together.", why: "Ibn Kathir says both meanings apply." }
      ]
    },
    {
      slug: "talh-trees-piled-with-fruit",
      title: "Talh trees piled with fruit",
      line: "Talh trees with fruit piled one on top of another.",
      facts: ["Mandud means piled up", "The Quraysh loved the shade of these trees"],
      quote: q56(29),
      source: ik(29, "Ibn Kathir quotes Mujahid that Mandud means its fruits are piled on top of each other, and Allah was reminding the Quraysh of trees they loved.", "Its fruits are piled on top of each other"),
      difficulty: 2,
      questions: [
        { q: "What does Mandud mean, per Mujahid?", a: "Fruits piled on each other", wrong: ["Thorny", "Leafless", "Small"], why: "Mandud means: Its fruits are piled on top of each other." },
        { q: "Where did the Talh shrub grow?", a: "In the Hijaz", wrong: ["In Egypt", "In Persia", "In Rome"], why: "Refers to large thorny shrub that used to grow in the area of Hijaz (Western Arabia)." },
        { tf: true, q: "The Quraysh liked the shade of Talh and Sidr trees.", why: "They used to like the shade that the Talh and Sidr provided for them." }
      ]
    },
    {
      slug: "talh-the-banana-tree",
      title: "Talh, the banana tree",
      line: "Abu Said and others said Talh means the banana tree.",
      facts: ["People of Yemen called the banana tree Talh", "Ibn Jarir gave only this meaning"],
      quote: q56(29),
      source: ik(29, "Ibn Kathir quotes Abu Said that Talh Mandud means the banana tree, and Ibn Zayd that the people of Yemen call the banana tree Talh.", "The people of Yemen call the banana tree, Talh"),
      difficulty: 3,
      questions: [
        { q: "What tree did Abu Said say Talh is?", a: "The banana tree", wrong: ["The apple tree", "The pine tree", "The olive tree"], why: "Talh Mandud means: The banana tree." },
        { q: "Which people call the banana tree Talh?", a: "The people of Yemen", wrong: ["The people of Egypt", "The people of Rome", "The people of India"], why: "The people of Yemen call the banana tree, Talh." },
        { tf: true, q: "Ibn Jarir mentioned no other meaning for Talh.", why: "Ibn Jarir mentioned no other explanation for Talh." }
      ]
    },
    {
      slug: "shade-that-never-ends",
      title: "Shade that never ends",
      line: "A rider could travel a hundred years in one tree's shade.",
      facts: ["The shade of Paradise is extended", "The Prophet ﷺ recited 56:30 about it"],
      quote: q56(30),
      source: hadith("bukhari", "4881", "Abu Hurairah", "Sahih", "The Prophet ﷺ said there is a tree in Paradise so big that a rider can travel in its shade for a hundred years without passing it, then recited: In shade long extended.", "a rider can travel in its shade for one hundred years without passing it"),
      difficulty: 2,
      questions: [
        { q: "How long to pass the tree's shade, per Bukhari 4881?", a: "One hundred years", wrong: ["One day", "One month", "Ten years"], why: "A rider can travel in its shade for one hundred years without passing it." },
        { q: "Which words did he ﷺ say to recite?", a: "In shade long extended", wrong: ["Say: He is Allah", "All praise is for Allah", "By the dawn"], why: "And if you wish, you can recite: In shade long extended." },
        { tf: true, q: "56:30 promises extended shade.", why: "And in shade Mamdud (extended)." }
      ]
    },
    {
      slug: "water-flowing-always",
      title: "Water flowing always",
      line: "They live by water that flows all the time.",
      facts: ["The water never stops", "In the desert, flowing water was a dream"],
      quote: q56(31),
      source: ik(31, "Ibn Kathir lists the ayah among the gifts of those on the right: and by water flowing constantly.", "And by water flowing constantly"),
      difficulty: 1,
      questions: [
        { q: "What water is promised in 56:31?", a: "Water flowing constantly", wrong: ["Still water", "Salty water", "Frozen water"], why: "And by water flowing constantly." },
        { q: "Who is promised this water?", a: "Those on the right", wrong: ["Those on the left", "No one", "Only kings"], why: "The Reward of Those on the Right." },
        { tf: false, q: "The water of Paradise sometimes stops.", why: "And by water flowing constantly." }
      ]
    },
    {
      slug: "fruit-in-plenty",
      title: "Fruit in plenty",
      line: "Fruit of many kinds, which no eye has ever seen.",
      facts: ["No ear has heard of them", "No heart has imagined them"],
      quote: q56(32),
      source: ik(32, "Ibn Kathir says they will have plenty of fruits of various kinds, that which no eye has ever seen, no ear has ever heard of and no heart has ever imagined.", "that which no eye has ever seen, no ear has ever heard of"),
      difficulty: 2,
      questions: [
        { q: "What does 56:32 promise?", a: "Fruit in plenty", wrong: ["A little fruit", "Only bread", "Only water"], why: "And fruit in plenty." },
        { q: "Has any eye seen fruits like them?", a: "No eye has ever seen them", wrong: ["Yes, in markets", "Yes, in Yemen", "Only kings"], why: "That which no eye has ever seen, no ear has ever heard of." },
        { tf: true, q: "Per 2:25, the fruits look alike but taste different.", why: "The shape will appear similar, but the taste is different." }
      ]
    },
    {
      slug: "the-bunch-he-reached-for",
      title: "The bunch he reached for",
      line: "In the eclipse prayer he ﷺ saw Paradise and reached for fruit.",
      facts: ["He was shown Paradise in prayer", "One bunch would last the whole world"],
      quote: q56(32),
      source: hadith("bukhari", "1052", "Abdullah ibn Abbas", "Sahih", "In the eclipse prayer the Prophet ﷺ saw Paradise and reached for a bunch of its fruit; had he taken it, people would have eaten from it as long as the world remains.", "you would have eaten from it as long as the world remains"),
      difficulty: 3,
      questions: [
        { q: "In which prayer did he ﷺ see Paradise?", a: "The eclipse prayer", wrong: ["The Eid prayer", "The rain prayer", "The night prayer"], why: "The sun eclipsed in the lifetime of the Prophet ﷺ. Allah's Messenger offered the eclipse prayer." },
        { q: "How long would the bunch have lasted?", a: "As long as the world remains", wrong: ["One day", "One week", "One year"], why: "You would have eaten from it as long as the world remains." },
        { tf: true, q: "The people saw him ﷺ reach out, then step back.", why: "We saw you taking something from your place and then we saw you retreating." }
      ]
    },
    {
      slug: "never-cut-off",
      title: "Never cut off",
      line: "The fruit never runs out, in winter or summer.",
      facts: ["No season stops it", "When one is picked, another grows"],
      quote: q56(33),
      source: ik(33, "Ibn Kathir says the supply of these fruits never runs out, winter or summer, and whenever someone takes a fruit, another grows in its place.", "The supply of these fruits never runs out, winter or summer"),
      difficulty: 1,
      questions: [
        { q: "When does the fruit run out?", a: "Never", wrong: ["In winter", "In summer", "At night"], why: "The supply of these fruits never runs out, winter or summer." },
        { q: "What happens when a fruit is picked?", a: "Another grows in its place", wrong: ["The tree dies", "Nothing grows", "The branch breaks"], why: "Whenever someone takes a fruit in Paradise, another one grows in its place." },
        { tf: true, q: "56:33 says the supply is not cut off.", why: "Whose supply is not cut off nor are they out of reach." }
      ]
    },
    {
      slug: "always-in-reach",
      title: "Always in reach",
      line: "Nothing stands between them and the fruit.",
      facts: ["No branch or thorn blocks it", "The fruit is close and easy to take"],
      quote: q56(33),
      source: ik(33, "Ibn Kathir quotes Qatadah: nothing will prevent them from reaching out to get these fruits, no branches, thorns or distance.", "Nothing will prevent them from reaching out to get these fruits, no branches, thorns or distance"),
      difficulty: 2,
      questions: [
        { q: "What can block the fruit, per Qatadah?", a: "Nothing at all", wrong: ["Thorns", "Tall branches", "Distance"], why: "Nothing will prevent them from reaching out to get these fruits, no branches, thorns or distance." },
        { q: "Whose power makes it easy to grasp?", a: "Allah's power", wrong: ["Their strength", "Ladders", "Servants only"], why: "They will be available and easy to grasp by Allah's power." },
        { tf: false, q: "Some fruit in Paradise is out of reach.", why: "Whose supply is not cut off nor are they out of reach." }
      ]
    },
    {
      slug: "couches-raised-high",
      title: "Couches raised high",
      line: "They rest on high couches, soft and comfortable.",
      facts: ["Raised high means honored", "Comfort is part of the reward"],
      quote: q56(34),
      source: ik(34, "Ibn Kathir says the couches are high, soft and comfortable.", "high, soft and comfortable"),
      difficulty: 1,
      questions: [
        { q: "What do they rest on, in 56:34?", a: "Couches raised high", wrong: ["The ground", "Stones", "Sand"], why: "And on couches, raised high." },
        { q: "How does Ibn Kathir describe the couches?", a: "High, soft and comfortable", wrong: ["Low and hard", "Old and torn", "Cold and wet"], why: "Meaning, high, soft and comfortable." },
        { tf: true, q: "The couches of Paradise are comfortable.", why: "High, soft and comfortable." }
      ]
    },
    {
      slug: "a-special-creation",
      title: "A special creation",
      line: "Allah makes the believing wives new again in Paradise.",
      facts: ["Those who grew old become young again", "Allah creates them anew"],
      quote: q56(35),
      source: ik(35, "Ibn Kathir says these are the believing wives: after they became old in this life, they were brought back young in the other life.", "after they became old in this life, they were brought back"),
      difficulty: 2,
      questions: [
        { q: "What does Allah say in 56:35?", a: "We created them a special creation", wrong: ["We left them as they were", "We forgot them", "We made them old"], why: "Verily, We have created them a special creation." },
        { q: "What happens to those who grew old in this life?", a: "They are made young again", wrong: ["They stay old", "They are left out", "They become angels"], why: "After they became old in this life, they were brought back." },
        { tf: true, q: "Paradise has no old age.", why: "After they became old in this life, they were brought back... youthful." }
      ]
    },
    {
      slug: "made-new-and-kind",
      title: "Made new and kind",
      line: "They are made new, youthful, kind and cheerful.",
      facts: ["Allah renews them completely", "Kindness and cheer fill Paradise"],
      quote: q56(36),
      source: ik(36, "Ibn Kathir says they were brought back youthful, beautiful, kind and cheerful.", "youthful … beautiful, kind and cheerful"),
      difficulty: 2,
      questions: [
        { q: "How are they described by Ibn Kathir?", a: "Youthful, kind and cheerful", wrong: ["Old and tired", "Sad and angry", "Weak and sick"], why: "Brought back... youthful... beautiful, kind and cheerful." },
        { q: "Who renews them, per 56:35-36?", a: "Allah", wrong: ["Doctors", "Angels alone", "Themselves"], why: "Verily, We have created them a special creation. And made them virgins." },
        { tf: true, q: "Being cheerful is part of Paradise.", why: "Beautiful, kind and cheerful." }
      ]
    },
    {
      slug: "loving-and-of-one-age",
      title: "Loving and of one age",
      line: "Spouses in Paradise love each other and are of one age.",
      facts: ["Urub means full of love for their husbands", "Atrab means of the same age"],
      quote: q56(37),
      source: ik(37, "Ibn Kathir quotes Ibn Abbas that Atrab means they will be of one age, thirty-three years old.", "They will be of one age, thirty-three years old"),
      difficulty: 2,
      questions: [
        { q: "What does Atrab mean, per Ibn Abbas?", a: "Of one age", wrong: ["Very old", "Very small", "Far away"], why: "Atrab means They will be of one age, thirty-three years old." },
        { q: "What age did Ibn Abbas give?", a: "Thirty-three", wrong: ["Twenty", "Fifty", "Seventy"], why: "They will be of one age, thirty-three years old." },
        { q: "What does Urub mean, per Ibn Abbas?", a: "Sweethearts to their husbands", wrong: ["Strangers", "Servants", "Travelers"], why: "The Urub and their husbands are their sweet hearts, and they are their husbands' sweet hearts." }
      ]
    },
    {
      slug: "for-those-on-the-right",
      title: "For those on the right",
      line: "All these blessings are made for those on the right.",
      facts: ["Ibn Jarir held this view", "The gifts were prepared for them"],
      quote: q56(38),
      source: ik(38, "Ibn Kathir says it appears the meaning is that they were created for those on the right side, the view of Ibn Jarir.", "they were created for those on the right side"),
      difficulty: 2,
      questions: [
        { q: "For whom are these gifts, in 56:38?", a: "Those on the right", wrong: ["Those on the left", "The deniers", "No one"], why: "For those on the right." },
        { q: "Whose view does Ibn Kathir name?", a: "Ibn Jarir", wrong: ["Pharaoh", "Abu Lahab", "Qarun"], why: "This is the view of Ibn Jarir." },
        { tf: true, q: "56:38 ends the list of rewards for those on the right.", why: "Verily, We have created them a special creation... For those on the right." }
      ]
    },
    {
      slug: "shining-like-the-moon",
      title: "Shining like the moon",
      line: "The first group to enter Paradise shine like the full moon.",
      facts: ["Their sweat smells of musk", "They are as tall as Adam, sixty cubits"],
      quote: q56(38),
      source: hadith("bukhari", "3327", "Abu Hurairah", "Sahih", "The Prophet ﷺ said the first group to enter Paradise will glitter like the full moon, the next like the brightest star, and all will resemble their father Adam.", "will be glittering like the full moon"),
      difficulty: 2,
      questions: [
        { q: "How will the first group shine, per Bukhari 3327?", a: "Like the full moon", wrong: ["Like a candle", "Like a lamp", "Not at all"], why: "The first group of people who will enter Paradise, will be glittering like the full moon." },
        { q: "How tall will the people of Paradise be?", a: "Sixty cubits, like Adam", wrong: ["Six cubits", "One cubit", "Six hundred cubits"], why: "All of them will look alike and will resemble their father Adam (in stature), sixty cubits tall." },
        { q: "What will their sweat smell like?", a: "Musk", wrong: ["Smoke", "Nothing", "Salt"], why: "Their combs will be of gold, and their sweat will smell like musk." }
      ]
    },
    {
      slug: "a-multitude-from-the-first",
      title: "A multitude from the first",
      line: "Many of those on the right are from the earlier generations.",
      facts: ["Those on the right are very many", "They come from early and late times"],
      quote: q56(39),
      source: ik(39, "Ibn Kathir says a multitude of those on the right will come from the earlier generations and a multitude from the latter generations.", "a multitude of those on the right will come from the earlier generations"),
      difficulty: 2,
      questions: [
        { q: "How many on the right are from the first, in 56:39?", a: "A multitude", wrong: ["A few", "None", "Exactly ten"], why: "A multitude of those will be from the first generation." },
        { q: "How does 56:39 differ from 56:14?", a: "56:14 says few from the later", wrong: ["They are the same", "56:39 says none", "56:14 says many later"], why: "And a few of those will be from the later ones. (56:14)" },
        { tf: true, q: "Those on the right are more than the foremost.", why: "They are fewer than those on the right side." }
      ]
    },
    {
      slug: "a-multitude-from-the-later",
      title: "A multitude from the later",
      line: "Many of those on the right also come from the later generations.",
      facts: ["Good news for Muslims of every time", "Doors of good are open to us too"],
      quote: q56(40),
      source: ik(40, "Ibn Kathir says 56:39-40 mean a multitude of those on the right come from the earlier generations and a multitude from the latter generations.", "a multitude from the latter generations"),
      difficulty: 2,
      questions: [
        { q: "How many on the right are later, in 56:40?", a: "A multitude", wrong: ["A few", "None", "Only one"], why: "And a multitude of those will be from the later generations." },
        { q: "Can people of our time be among those on the right?", a: "Yes, a multitude", wrong: ["No, never", "Only Prophets", "Only the first"], why: "A multitude from the latter generations." },
        { tf: true, q: "He ﷺ recited 56:39-40 after giving his Companions good news.", why: "Then Allah's Messenger recited this Ayah: A multitude of those will be from the first generation. And a multitude of those will be from the later generations." }
      ]
    },
    {
      slug: "half-of-paradise",
      title: "Half of Paradise",
      line: "He ﷺ hoped his Ummah would be half the people of Paradise.",
      facts: ["First he said a quarter, then a third", "Then he said half"],
      quote: q56(40),
      source: hadith("bukhari", "6528", "Abdullah ibn Mas'ud", "Sahih", "The Prophet ﷺ asked his Companions if they would be pleased to be a quarter, a third, then half of the people of Paradise, and said he hoped they would be half.", "I hope that you will be one half of the people of Paradise"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ hope, per Bukhari 6528?", a: "We are half of Paradise", wrong: ["A tenth of it", "None of it", "A hundredth"], why: "I hope that you will be one half of the people of Paradise." },
        { q: "What did he ﷺ ask about first?", a: "One fourth", wrong: ["One half", "All", "One tenth"], why: "Would it please you to be one fourth of the people of Paradise?" },
        { q: "Who alone enters Paradise, per the hadith?", a: "A Muslim soul", wrong: ["Any rich person", "Anyone famous", "Only the old"], why: "For none will enter Paradise but a Muslim soul." }
      ]
    },
    {
      slug: "ukashah-asked-first",
      title: "Ukkashah asked first",
      line: "Ukkashah asked to be among the seventy thousand.",
      facts: ["Their faces glitter like the full moon", "Asking quickly for good is praised"],
      quote: q56(40),
      source: hadith("bukhari", "6542", "Abu Hurairah", "Sahih", "The Prophet ﷺ said seventy thousand of his followers would enter Paradise with faces like the full moon. Ukkashah asked to be one of them, and the Prophet ﷺ prayed for him.", "seventy thousand in number, whose faces will glitter as the moon does when it is full"),
      difficulty: 3,
      questions: [
        { q: "How will the seventy thousand look?", a: "Faces glittering like the full moon", wrong: ["Faces hidden", "Faces dark", "Faces tired"], why: "Seventy thousand in number, whose faces will glitter as the moon does when it is full." },
        { q: "What did he ﷺ say for Ukkashah?", a: "O Allah, make him one of them", wrong: ["Wait your turn", "Not you", "Ask later"], why: "The Prophet ﷺ said, O Allah, make him one of them." },
        { q: "What did he ﷺ tell the second man?", a: "Ukkashah has preceded you", wrong: ["You are also one", "Come back tomorrow", "Pray more"], why: "Ukasha has preceded you." }
      ]
    },
    {
      slug: "how-unfortunate-those-on-the-left",
      title: "How unfortunate those on the left",
      line: "Now Allah tells of those on the left and their end.",
      facts: ["The surah moves from reward to warning", "The warning helps us avoid their path"],
      quote: q56(41),
      source: ik(41, "Ibn Kathir says after those on the right, Allah mentioned the condition of those on the left.", "What is the condition of those on the left"),
      difficulty: 1,
      questions: [
        { q: "Who does 56:41 turn to?", a: "Those on the left", wrong: ["Those on the right", "The foremost", "The angels"], why: "And those on the left? How will be those on the left." },
        { q: "What does Ibn Kathir say the question means?", a: "What is their condition?", wrong: ["Where is the market?", "Who is the king?", "When is the rain?"], why: "What is the condition of those on the left." },
        { tf: true, q: "Hearing the warning helps us stay away from that path.", why: "He then mentioned the condition of those on the left hand." }
      ]
    },
    {
      slug: "hot-wind-and-boiling-water",
      title: "Hot wind and boiling water",
      line: "Those on the left face a fierce hot wind and boiling water.",
      facts: ["Samum is a fierce hot wind", "Hamim is boiling water"],
      quote: q56(42),
      source: ik(42, "Ibn Kathir says Samum means a fierce hot wind, and Hamim is boiling water.", "a fierce hot wind"),
      difficulty: 2,
      questions: [
        { q: "What is Samum?", a: "A fierce hot wind", wrong: ["Cool rain", "A garden", "A river"], why: "In Samum, means, a fierce hot wind." },
        { q: "What is Hamim?", a: "Boiling water", wrong: ["Cold milk", "Honey", "Snow"], why: "Hamim is boiling water." },
        { tf: false, q: "Those on the left will find a cool breeze.", why: "In Samum, means, a fierce hot wind." }
      ]
    },
    {
      slug: "a-shade-of-smoke",
      title: "A shade of smoke",
      line: "Their only shade is black smoke.",
      facts: ["Yahmum means black smoke", "77:30-31 describes the same shade"],
      quote: q56(43),
      source: ik(43, "Ibn Kathir says the shadow from Yahmum is the shadow of black smoke, per Ibn Abbas, Mujahid and others.", "black smoke"),
      difficulty: 2,
      questions: [
        { q: "What is their shade made of, in 56:43?", a: "Black smoke", wrong: ["Green trees", "White clouds", "Tents"], why: "And a shadow from Yahmum, meaning, black smoke." },
        { q: "Who said Yahmum is the shadow of smoke?", a: "Ibn Abbas and Mujahid", wrong: ["Pharaoh", "Haman", "Qarun"], why: "The shadow of smoke, according to Ibn 'Abbas, Mujahid, 'Ikrimah..." },
        { tf: true, q: "The shade of the Fire gives no help.", why: "Neither shady nor of any use against the fierce flame of the Fire. (77:31)" }
      ]
    },
    {
      slug: "neither-cool-nor-pleasant",
      title: "Neither cool nor pleasant",
      line: "That shade is neither cool nor pleasant to see.",
      facts: ["Barid means cool", "Karim means good or pleasant"],
      quote: q56(44),
      source: ik(44, "Ibn Kathir says it neither brings soft, cool breeze nor appears clear.", "it neither brings soft, cool breeze nor appears clear"),
      difficulty: 2,
      questions: [
        { q: "What does the smoke not bring, in 56:44?", a: "A cool breeze", wrong: ["Darkness", "Heat", "Fear"], why: "It neither brings soft, cool breeze nor appears clear." },
        { q: "What did Al-Hasan say about Karim?", a: "Its sight is not pleasant", wrong: ["It is very bright", "It is sweet", "It is cold"], why: "Nor Karim: Its sight is not pleasant." },
        { tf: false, q: "The smoke of the Fire is cool and clear.", why: "Neither Barid nor Karim." }
      ]
    },
    {
      slug: "lost-in-luxury",
      title: "Lost in luxury",
      line: "In this life they enjoyed pleasures and ignored the Messengers.",
      facts: ["Enjoying blessings is not the problem", "Ignoring Allah is"],
      quote: q56(45),
      source: ik(45, "Ibn Kathir says in this life they enjoyed its pleasures, all the while ignoring what the Messengers brought to them.", "all the while ignoring what the Messengers brought to them"),
      difficulty: 2,
      questions: [
        { q: "What did they do before, in 56:45?", a: "Indulged in luxury", wrong: ["Fasted often", "Gave charity", "Prayed at night"], why: "Verily, before that, they indulged in luxury." },
        { q: "What did they ignore, per Ibn Kathir?", a: "What the Messengers brought", wrong: ["The weather", "Their jobs", "The markets"], why: "All the while ignoring what the Messengers brought to them." },
        { tf: true, q: "Luxury that makes us forget Allah is dangerous.", why: "They were enjoying life's pleasures... all the while ignoring what the Messengers brought to them." }
      ]
    },
    {
      slug: "persisting-in-great-sin",
      title: "Persisting in great sin",
      line: "They kept on in the great sin and never meant to repent.",
      facts: ["The great sin is worshipping others with Allah", "Repenting is always open in this life"],
      quote: q56(46),
      source: ik(46, "Ibn Kathir says they persisted and did not intend to repent, in disbelief and idolatry.", "they persisted and did not intend to repent"),
      difficulty: 2,
      questions: [
        { q: "What did they persist in, in 56:46?", a: "Great sin", wrong: ["Good deeds", "Charity", "Prayer"], why: "And were persisting in great sin." },
        { q: "What did they not intend, per Ibn Kathir?", a: "To repent", wrong: ["To travel", "To eat", "To sleep"], why: "They persisted and did not intend to repent." },
        { q: "What is the great sin, per Ibn Abbas?", a: "Idolatry", wrong: ["Laziness", "Being poor", "Being late"], why: "It means idolatry, according to Ibn 'Abbas." }
      ]
    },
    {
      slug: "the-greatest-sin",
      title: "The greatest sin",
      line: "The greatest sin is to set up a rival to Allah.",
      facts: ["He alone created us", "So He alone is worshipped"],
      quote: q56(46),
      source: hadith("bukhari", "4477", "Abdullah ibn Mas'ud", "Sahih", "The Prophet ﷺ was asked about the greatest sin and said: that you set up a rival to Allah though He alone created you.", "That you set up a rival unto Allah though He Alone created you"),
      difficulty: 2,
      questions: [
        { q: "What is the greatest sin, per Bukhari 4477?", a: "Setting up a rival to Allah", wrong: ["Being poor", "Sleeping late", "Forgetting a name"], why: "That you set up a rival unto Allah though He Alone created you." },
        { q: "Why is it so great a sin?", a: "Allah alone created you", wrong: ["Idols are costly", "It is old", "It is rare"], why: "Though He Alone created you." },
        { tf: true, q: "Ibn Kathir says the great sin of 56:46 is idolatry.", why: "In disbelief in Allah and claiming that the idols and rivals were gods besides Allah." }
      ]
    },
    {
      slug: "dust-and-bones",
      title: "Dust and bones",
      line: "They asked: when we are dust and bones, will we live again?",
      facts: ["They denied the Resurrection", "Allah answers them in the next ayahs"],
      quote: q56(47),
      source: ik(47, "Ibn Kathir says they said this while denying and rejecting the idea that resurrection will ever occur.", "They said this while denying and rejecting the idea that resurrection will ever occur"),
      difficulty: 1,
      questions: [
        { q: "What did they ask, in 56:47?", a: "Will we be raised after dust?", wrong: ["Where is the rain?", "Who is the king?", "When is the harvest?"], why: "When we die and become dust and bones, shall we then indeed be resurrected?" },
        { q: "Why did they ask it?", a: "To deny the Resurrection", wrong: ["To learn more", "To praise Allah", "To be polite"], why: "They said this while denying and rejecting the idea that resurrection will ever occur." },
        { tf: true, q: "56:57-62 answer this question with proofs.", why: "Allah asserts that Resurrection will occur and refutes the misguided atheists who deny it." }
      ]
    },
    {
      slug: "and-our-forefathers",
      title: "And our forefathers?",
      line: "They also asked: and our forefathers too?",
      facts: ["They thought old bones could not live", "Allah raises all of them"],
      quote: q56(48),
      source: ik(48, "Ibn Kathir quotes their words: and also our forefathers?", "And also our forefathers"),
      difficulty: 1,
      questions: [
        { q: "Whom did they also doubt would be raised?", a: "Their forefathers", wrong: ["Their animals", "Their trees", "Their houses"], why: "And also our forefathers?" },
        { q: "What did they think of very old bones?", a: "They could not live again", wrong: ["They were holy", "They were gold", "They were lost"], why: "They said this while denying and rejecting the idea that resurrection will ever occur." },
        { tf: false, q: "The people of old will be left out.", why: "Those of old, and those of later times. All will surely be gathered together." }
      ]
    },
    {
      slug: "first-and-last-together",
      title: "First and last together",
      line: "Say: the first and the last will all be gathered.",
      facts: ["Every child of Adam will be there", "No one will be left out"],
      quote: q56(49),
      source: ik(49, "Ibn Kathir says the earlier and later generations of the Children of Adam will be gathered for the Day of Resurrection and none of them will be left out.", "the earlier and latter generations of the Children of Adam will be gathered"),
      difficulty: 2,
      questions: [
        { q: "Who will be gathered, per 56:49?", a: "Those of old and later times", wrong: ["Only the new", "Only the old", "Only the rich"], why: "Say: (Yes) verily, those of old, and those of later times." },
        { q: "Will anyone be left out?", a: "No, none at all", wrong: ["Yes, the poor", "Yes, the weak", "Yes, the ancient"], why: "None of them will be left out." },
        { tf: true, q: "Allah told the Prophet ﷺ to say this answer.", why: "Say, O Muhammad, that the earlier and latter generations of the Children of Adam will be gathered." }
      ]
    },
    {
      slug: "a-known-day",
      title: "A known Day",
      line: "They will be gathered on a Day whose time is fixed.",
      facts: ["The time will not come early or late", "Only Allah knows when"],
      quote: q56(50),
      source: ik(50, "Ibn Kathir says that time is precisely designated and will not come late, early, nor increase or decrease.", "that time is precisely designated and will not come late, early"),
      difficulty: 2,
      questions: [
        { q: "What kind of Day is it, in 56:50?", a: "A known, appointed Day", wrong: ["A random Day", "An unknown night", "A holiday"], why: "All will surely be gathered together for appointed meeting of a known Day." },
        { q: "Can the Day come early or late?", a: "No, its time is fixed", wrong: ["Yes, early", "Yes, late", "Yes, both"], why: "That time is precisely designated and will not come late, early, nor increase or decrease." },
        { tf: true, q: "11:104 says Allah delays it only for a fixed term.", why: "And We delay it only for a term fixed. (11:104)" }
      ]
    },
    {
      slug: "the-erring-deniers",
      title: "The erring deniers",
      line: "Allah speaks to those who strayed and denied.",
      facts: ["They strayed from guidance", "They denied the truth"],
      quote: q56(51),
      source: ik(51, "Ibn Kathir quotes the ayah: then verily, you the erring-ones, the deniers.", "you the erring-ones, the deniers"),
      difficulty: 1,
      questions: [
        { q: "Who is spoken to in 56:51?", a: "The erring deniers", wrong: ["The foremost", "Those on the right", "The angels"], why: "Then verily, – you the erring-ones, the deniers!" },
        { q: "What two things did they do?", a: "Strayed and denied", wrong: ["Prayed and fasted", "Traveled and traded", "Read and wrote"], why: "You the erring-ones, the deniers!" },
        { tf: true, q: "They are the ones who denied the Resurrection in 56:47.", why: "And they used to say: When we die and become dust and bones, shall we then indeed be resurrected?" }
      ]
    },
    {
      slug: "the-tree-of-zaqqum",
      title: "The tree of Zaqqum",
      line: "The deniers will eat from the bitter tree of Zaqqum.",
      facts: ["Zaqqum is a tree of the Fire", "Zaqqum is the opposite of Paradise fruit"],
      quote: q56(52),
      source: ik(52, "Ibn Kathir says they will be seized and made to eat from the Zaqqum tree.", "made to eat from the Zaqqum tree"),
      difficulty: 2,
      questions: [
        { q: "What tree is named in 56:52?", a: "Zaqqum", wrong: ["Sidr", "Talh", "Tuba"], why: "You verily, will eat of the trees of Zaqqum." },
        { q: "Is Zaqqum in Paradise or the Fire?", a: "The Fire", wrong: ["Paradise", "This world", "The sky"], why: "They will be seized and made to eat from the Zaqqum tree." },
        { tf: true, q: "The fruit of Paradise is the opposite of Zaqqum.", why: "And with fruit that they may choose." }
      ]
    },
    {
      slug: "filled-but-never-fed",
      title: "Filled but never fed",
      line: "They fill their bellies with it, yet it never helps them.",
      facts: ["The food of the Fire brings no good", "A warning to keep away from denial"],
      quote: q56(53),
      source: ik(53, "Ibn Kathir says they will be made to eat from the Zaqqum tree until their stomachs become full.", "until their stomachs become full"),
      difficulty: 2,
      questions: [
        { q: "What happens in 56:53?", a: "They fill their bellies with it", wrong: ["They throw it away", "They plant it", "They sell it"], why: "Then you will fill your bellies therewith." },
        { q: "Does that food bring them any good?", a: "No good at all", wrong: ["It heals them", "It cools them", "It pleases them"], why: "They will be seized and made to eat from the Zaqqum tree." },
        { tf: true, q: "The warning is meant to keep us from their path.", why: "May Allah save us from their actions." }
      ]
    },
    {
      slug: "boiling-water-to-drink",
      title: "Boiling water to drink",
      line: "On top of it they drink boiling water.",
      facts: ["Hamim is boiling water", "Paradise has cool, flowing water instead"],
      quote: q56(54),
      source: ik(54, "Ibn Kathir says Hamim is boiling water.", "Hamim is boiling water"),
      difficulty: 1,
      questions: [
        { q: "What do they drink, in 56:54?", a: "Hamim, boiling water", wrong: ["Cool water", "Milk", "Honey"], why: "And drink the Hamim on top of it." },
        { q: "What does the next ayah compare it to?", a: "Thirsty camels drinking", wrong: ["Birds singing", "Rain falling", "Fish swimming"], why: "And you will drink (that) like Al-Him!" },
        { tf: false, q: "Those on the left get the flowing water of Paradise.", why: "Hamim is boiling water." }
      ]
    },
    {
      slug: "like-thirsty-camels",
      title: "Like thirsty camels",
      line: "They drink like thirsty camels whose thirst never ends.",
      facts: ["Al-Him means thirsty camels", "Their thirst is never quenched"],
      quote: q56(55),
      source: ik(55, "Ibn Kathir says Al-Him means thirsty camels, per Ibn Abbas and others, and they will never quench their thirst.", "Al-Him means thirsty camels"),
      difficulty: 2,
      questions: [
        { q: "What does Al-Him mean, per Ibn Abbas?", a: "Thirsty camels", wrong: ["Hungry lions", "Lost sheep", "Tired horses"], why: "Al-Him means thirsty camels, according to Ibn 'Abbas." },
        { q: "Will their thirst ever be quenched?", a: "Never", wrong: ["Soon", "After a day", "After a year"], why: "The people of Hell, will never quench their thirst from drinking Hamim." },
        { tf: true, q: "As-Suddi said Al-Him is a disease that makes camels thirsty.", why: "Al-Him is a disease that strikes camels, causing them to feel thirst." }
      ]
    },
    {
      slug: "their-welcome",
      title: "Their welcome",
      line: "That is their welcome on the Day of Recompense.",
      facts: ["Believers are welcomed with honor", "Deniers get the opposite"],
      quote: q56(56),
      source: ik(56, "Ibn Kathir says this is their entertainment on the Day of Reckoning, while the believers are given Paradise as hospitality and honor.", "hospitality and honor"),
      difficulty: 2,
      questions: [
        { q: "What does 56:56 call this?", a: "Their entertainment that Day", wrong: ["Their reward", "Their prize", "Their rest"], why: "That will be their entertainment on the Day of Recompense." },
        { q: "What do the believers get, per 18:107?", a: "Gardens of Al-Firdaws", wrong: ["Smoke", "Hot wind", "Nothing"], why: "Shall have the Gardens of Al-Firdaws (Paradise) for their entertainment. (18:107)" },
        { q: "What does entertainment mean for believers?", a: "Hospitality and honor", wrong: ["Games", "Music", "Shopping"], why: "Hospitality and honor." }
      ]
    }
  ]
};

/** Ayahs 57 to 74: proofs of the Resurrection from our own creation, death, the crops, the rain and fire. */
const WAQIAH_THREE: DeepUnit = {
  key: "waqiah3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-56",
  name: "Al-Waqi'ah, ayahs 57 to 74",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Waqi'ah",
  lessons: [
    {
      slug: "we-created-you",
      title: "We created you",
      line: "Allah created us from nothing, so He can bring us back.",
      facts: ["Starting creation is the harder proof", "Bringing back is easier for Him"],
      quote: q56(57),
      source: ik(57, "Ibn Kathir says Allah created us after we were nothing, so the One able to start the creation is more able to bring it back.", "We have created you after you were nothing"),
      difficulty: 1,
      questions: [
        { q: "What does Allah say in 56:57?", a: "We created you", wrong: ["You created yourselves", "No one created you", "The stars created you"], why: "We created you, then why do you believe not?" },
        { q: "What were we before Allah created us?", a: "Nothing", wrong: ["Angels", "Stars", "Trees"], why: "We have created you after you were nothing." },
        { tf: true, q: "Starting creation is a proof that He can repeat it.", why: "Is not that Who is able to start the creation, more able to bring it back?" }
      ]
    },
    {
      slug: "the-lie-of-the-denier",
      title: "The lie of the denier",
      line: "Allah says: the first creation was not easier for Me.",
      facts: ["Denying the return is a lie against Allah", "Allah can create again with ease"],
      quote: q56(57),
      source: hadith("bukhari", "4974", "Abu Hurayrah", "Sahih", "Allah said the son of Adam lies against Him by saying He will not recreate him as He created him the first time, though the first creation was not easier for Him than the new one.", "the first creation was not easier for Me than new creation"),
      difficulty: 3,
      questions: [
        { q: "What lie does the son of Adam tell, per Bukhari 4974?", a: "Allah will not recreate him", wrong: ["Allah is far", "Allah is unaware", "Allah is weak"], why: "It is his saying that I will not recreate him as I created him for the first time." },
        { q: "What does Allah say of the first creation?", a: "Not easier than the new one", wrong: ["Much harder", "Never happened", "Was by chance"], why: "In fact, the first creation was not easier for Me than new creation." },
        { tf: true, q: "Allah says in 30:27 that repeating creation is easier for Him.", why: "And He it is Who originates the creation, then He will repeat it; and this is easier for Him. (30:27)" }
      ]
    },
    {
      slug: "who-starts-each-life",
      title: "Who starts each life?",
      line: "Allah asks: do you see how each new life begins?",
      facts: ["A baby begins from a tiny drop", "Allah grows it stage after stage"],
      quote: q56(58),
      source: ik(58, "Ibn Kathir says Allah asks whether we make that drop stay in the womb and create life from it, stage after stage, or whether Allah does all this.", "create life from it therein, stage after stage"),
      difficulty: 2,
      questions: [
        { q: "What does Allah ask us to look at, in 56:58?", a: "How each new life begins", wrong: ["The markets", "The castles", "The poems"], why: "Do you not see the semen you emit." },
        { q: "How does a baby grow in the womb?", a: "Stage after stage", wrong: ["All at once", "By chance", "With no plan"], why: "And create life from it therein, stage after stage." },
        { tf: true, q: "56:58 is a proof for the Resurrection.", why: "Then Allah said, while bringing forth evidence that Resurrection occurs." }
      ]
    },
    {
      slug: "are-we-the-creator",
      title: "Are We the Creator?",
      line: "Do you create it, or is Allah the Creator?",
      facts: ["Parents cannot create a single cell", "Allah alone creates"],
      quote: q56(59),
      source: ik(59, "Ibn Kathir explains the question: do you create life from it, or is Allah the One Who does all this?", "Or is Allah the One Who does all this"),
      difficulty: 1,
      questions: [
        { q: "Who creates each baby, in 56:59?", a: "Allah, the Creator", wrong: ["The parents", "The doctors", "Nature alone"], why: "Is it you who create it, or are We the Creator?" },
        { q: "What answer does the question expect?", a: "Allah does all this", wrong: ["People do", "No one does", "Animals do"], why: "Or is Allah the One Who does all this?" },
        { tf: true, q: "75:37-40 gives the same proof for the Resurrection.", why: "Was he not a Nutfah... Is not He able to give life to the dead? (75:36-40)" }
      ]
    },
    {
      slug: "the-angel-writes-four-things",
      title: "The angel writes four things",
      line: "An angel writes each baby's deeds, provision and end.",
      facts: ["Allah plans every life before birth", "Then the soul is breathed in"],
      quote: q56(59),
      source: hadith("bukhari", "3208", "Abdullah ibn Mas'ud", "Sahih", "The Prophet ﷺ said each person is formed in the womb in stages, then Allah sends an angel to write four things: his deeds, his provision, his death and whether he will be blessed or wretched.", "Then Allah sends an angel who is ordered to write four things"),
      difficulty: 3,
      questions: [
        { q: "How many things does the angel write?", a: "Four", wrong: ["Two", "Seven", "Ten"], why: "Then Allah sends an angel who is ordered to write four things." },
        { q: "Which is one of the four?", a: "His provision", wrong: ["His height", "His city", "His clothes"], why: "He is ordered to write down his deeds, his livelihood, his (date of) death, and whether he will be blessed or wretched." },
        { tf: true, q: "Each stage in the womb lasts about forty days.", why: "Put together in the womb of the mother in forty days, and then he becomes a clot... for a similar period." }
      ]
    },
    {
      slug: "death-decreed-for-all",
      title: "Death decreed for all",
      line: "Allah decreed death for everyone in heaven and earth.",
      facts: ["No one escapes death", "Everyone is equal in it"],
      quote: q56(60),
      source: ik(60, "Ibn Kathir quotes Ad-Dahhak: Allah made the residents of the heavens and earth equal with regards to death.", "Allah made the residents of the heavens and earth equal with regards to death"),
      difficulty: 1,
      questions: [
        { q: "What has Allah decreed for all, in 56:60?", a: "Death", wrong: ["Wealth", "Fame", "Long life"], why: "We have decreed death to you all." },
        { q: "Who is equal in death, per Ad-Dahhak?", a: "All in heaven and earth", wrong: ["Only the poor", "Only the old", "Only kings"], why: "Allah made the residents of the heavens and earth equal with regards to death." },
        { tf: false, q: "Rich people can escape death.", why: "We have decreed death to you all." }
      ]
    },
    {
      slug: "a-traveler-in-this-world",
      title: "A traveler in this world",
      line: "Live in this world like a stranger or a traveler.",
      facts: ["This world is a journey, not a home", "Prepare for what comes next"],
      quote: q56(60),
      source: hadith("bukhari", "6416", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ held Ibn Umar's shoulder and said: be in this world as if you were a stranger or a traveler.", "Be in this world as if you were a stranger or a traveler"),
      difficulty: 2,
      questions: [
        { q: "How should we live, per Bukhari 6416?", a: "Like a stranger or traveler", wrong: ["Like a king", "Like we never die", "Like a guard"], why: "Be in this world as if you were a stranger or a traveler." },
        { q: "What did Ibn Umar say to take from health?", a: "For your sickness", wrong: ["For games", "For sleep", "For boasting"], why: "Take from your health for your sickness, and (take) from your life for your death." },
        { tf: true, q: "Remembering death helps us prepare.", why: "We have decreed death to you all." }
      ]
    },
    {
      slug: "allah-is-never-unable",
      title: "Allah is never unable",
      line: "Nothing can outrun Allah or stop what He wills.",
      facts: ["Not outstripped means never unable", "His power has no limit"],
      quote: q56(60),
      source: ik(60, "Ibn Kathir says and We are not outstripped means: We are never unable.", "We are never unable"),
      difficulty: 2,
      questions: [
        { q: "What does not outstripped mean, per Ibn Kathir?", a: "Allah is never unable", wrong: ["Allah is slow", "Allah forgets", "Allah is far"], why: "And We are not outstripped, meaning, We are never unable." },
        { q: "Can anyone run away from Allah?", a: "No one at all", wrong: ["The fast", "The strong", "The clever"], why: "And We are not outstripped." },
        { tf: true, q: "56:60 joins death with Allah's power.", why: "We have decreed death to you all, and We are not outstripped." }
      ]
    },
    {
      slug: "in-forms-you-know-not",
      title: "In forms you know not",
      line: "Allah can change our shapes and raise us in new forms.",
      facts: ["The Resurrection body is different", "We cannot imagine it now"],
      quote: q56(61),
      source: ik(61, "Ibn Kathir says Allah is never unable to change your current shapes on the Day of Resurrection, and create you in that you know not.", "to change your current shapes, on the Day of Resurrection"),
      difficulty: 2,
      questions: [
        { q: "What can Allah change, per Ibn Kathir?", a: "Our current shapes", wrong: ["The past", "His promise", "Nothing"], why: "To change your current shapes, on the Day of Resurrection." },
        { q: "What forms will we be raised in, per 56:61?", a: "Forms we know not", wrong: ["Animal forms", "No forms", "Stone forms"], why: "To transfigure you and create you in (forms) that you know not." },
        { tf: true, q: "56:61 speaks of the Day of Resurrection.", why: "To change your current shapes, on the Day of Resurrection." }
      ]
    },
    {
      slug: "the-first-creation",
      title: "The first creation",
      line: "You know the first creation, so why not remember?",
      facts: ["He gave us hearing, sight and hearts", "Who began it can bring it back"],
      quote: q56(62),
      source: ik(62, "Ibn Kathir says He Who is able to create you in the beginning is more able to bring you back and resurrect you to life anew.", "He Who is able to create you in the beginning is more able to bring you back"),
      difficulty: 2,
      questions: [
        { q: "What do we already know, per 56:62?", a: "The first creation", wrong: ["The future", "The unseen", "The Hour"], why: "And indeed, you have already known the first form of creation." },
        { q: "What gifts did Allah give us, per Ibn Kathir?", a: "Hearing, sight and hearts", wrong: ["Wings", "Gold", "Crowns"], why: "He created you and gave you hearing, sight and hearts." },
        { q: "What does 19:67 ask man to remember?", a: "He was nothing before", wrong: ["His wealth", "His tribe", "His house"], why: "Does not man remember that We created him before, while he was nothing? (19:67)" }
      ]
    },
    {
      slug: "what-you-sow",
      title: "What you sow",
      line: "Look at the seeds you plant in the earth.",
      facts: ["We plow and plant", "Allah makes the seed grow"],
      quote: q56(63),
      source: ik(63, "Ibn Kathir says 56:63 is in reference to tilling the earth and planting seeds inside it.", "in reference to tilling the earth and planting seeds inside it"),
      difficulty: 1,
      questions: [
        { q: "What does Allah ask us to see, in 56:63?", a: "What we sow", wrong: ["What we buy", "What we wear", "What we build"], why: "Do you not see what you sow." },
        { q: "What does sowing mean, per Ibn Kathir?", a: "Tilling and planting seeds", wrong: ["Sewing clothes", "Building walls", "Catching fish"], why: "In reference to tilling the earth and planting seeds inside it." },
        { tf: true, q: "Farming is one of Allah's signs.", why: "Allah's Oneness demonstrated by causing the Plants to grow." }
      ]
    },
    {
      slug: "who-makes-it-grow",
      title: "Who makes it grow?",
      line: "We plant the seed, but Allah makes it grow.",
      facts: ["The farmer cannot make one seed sprout", "Allah keeps it firm in the earth"],
      quote: q56(64),
      source: ik(64, "Ibn Kathir says it is Allah Who causes the seeds to remain firmly and grow inside the earth.", "rather it is We Who cause the seeds to remain firmly and grow inside the earth"),
      difficulty: 1,
      questions: [
        { q: "Who is the Grower, in 56:64?", a: "Allah", wrong: ["The farmer", "The rain alone", "The sun alone"], why: "Is it you that make it grow, or are We the Grower?" },
        { q: "What does Allah do to the seeds?", a: "Keeps them firm and grows them", wrong: ["Ignores them", "Sells them", "Counts them"], why: "Rather it is We Who cause the seeds to remain firmly and grow inside the earth." },
        { tf: true, q: "Abu Hurairah recited 56:63-64 to teach good words about farming.", why: "Abu Hurayrah added, Have you not heard Allah's statement, Do you not see what you sow." }
      ]
    },
    {
      slug: "crumbled-crops",
      title: "Crumbled crops",
      line: "If Allah willed, He could dry the crops before harvest.",
      facts: ["A whole harvest depends on Allah", "Leaving it whole is His mercy"],
      quote: q56(65),
      source: ik(65, "Ibn Kathir says Allah grows the seeds with His mercy, and if He willed, He would turn them dry before they ripen.", "If We will, We would turn them dry before they ripen"),
      difficulty: 2,
      questions: [
        { q: "What could Allah do, in 56:65?", a: "Crumble it to dry pieces", wrong: ["Turn it to gold", "Make it fly", "Nothing"], why: "Were it Our will, We could crumble it to dry pieces." },
        { q: "Why does He leave the crops whole?", a: "Out of His mercy", wrong: ["By chance", "Because we earned it alone", "He cannot dry them"], why: "We caused the seeds to grow with Our compassion and mercy and left them intact inside the earth as mercy for you." },
        { q: "What does Tafakkahun mean, per Al-Hasan?", a: "Feeling sorrow", wrong: ["Laughing", "Sleeping", "Running"], why: "Or, feel sorrow, according to Al-Hasan, Qatadah and As-Suddi." }
      ]
    },
    {
      slug: "we-are-ruined",
      title: "We are ruined",
      line: "They would cry out: we are left with loss!",
      facts: ["Mughramun means ruined, left in loss", "They would wonder what happened"],
      quote: q56(66),
      source: ik(66, "Ibn Kathir says if Allah crumbled the plants into dry pieces, people would be left wondering, saying they are ruined.", "if We crumble the plants into dry pieces, you would be wondering"),
      difficulty: 2,
      questions: [
        { q: "What would they say, in 56:66?", a: "We are indeed Mughramun", wrong: ["We are rich", "We are happy", "We are safe"], why: "(Saying:) We are indeed Mughramun!" },
        { q: "How would they feel if the crops dried?", a: "Left wondering and grieving", wrong: ["Glad", "Proud", "Calm"], why: "If We crumble the plants into dry pieces, you would be wondering." },
        { tf: true, q: "Qatadah said they would say: we were punished.", why: "Qatadah commented, You would say, We were punished, sometimes." }
      ]
    },
    {
      slug: "we-are-deprived",
      title: "We are deprived",
      line: "Then they would say: no, we are deprived!",
      facts: ["They would grieve what they spent", "And regret their sins"],
      quote: q56(67),
      source: ik(67, "Ibn Kathir says they would feel grief for what they spent or for the sins they committed in the past.", "They will be feeling grief for what they spent"),
      difficulty: 2,
      questions: [
        { q: "What would they say next, in 56:67?", a: "Nay, we are deprived!", wrong: ["We are winners", "We need nothing", "We will sell more"], why: "Nay, but we are deprived!" },
        { q: "What would they grieve over?", a: "What they spent", wrong: ["Their games", "Their clothes", "Their songs"], why: "They will be feeling grief for what they spent." },
        { tf: true, q: "Tafakkaha can mean enjoying or grieving.", why: "The Arabs say Tafakkahtu when they mean that they have enjoyed something or felt grief." }
      ]
    },
    {
      slug: "the-water-you-drink",
      title: "The water you drink",
      line: "Look at the water you drink every day.",
      facts: ["Drinking water is a daily gift", "We cannot make a single drop"],
      quote: q56(68),
      source: ik(68, "Ibn Kathir quotes the ayah: do you not see the water that you drink?", "Do you not see the water that you drink"),
      difficulty: 1,
      questions: [
        { q: "What does Allah ask us to see, in 56:68?", a: "The water we drink", wrong: ["The gold we keep", "The clothes we wear", "The roads we take"], why: "Do you not see the water that you drink." },
        { q: "What other gifts come from it, per 16:10?", a: "Drink and plants for cattle", wrong: ["Gold", "Iron", "Stone"], why: "From it you drink and from it (grows) the vegetation on which you send your cattle to pasture. (16:10)" },
        { tf: true, q: "Every sip of water is a gift from Allah.", why: "Do you not see the water that you drink." }
      ]
    },
    {
      slug: "down-from-the-clouds",
      title: "Down from the clouds",
      line: "Allah alone sends the rain down from the clouds.",
      facts: ["Al-Muzn means the clouds", "No one else brings the rain"],
      quote: q56(69),
      source: ik(69, "Ibn Kathir says Al-Muzn means clouds, and Allah is the One Who causes the rain to fall.", "Allah is stating that indeed He is the One Who causes the rain to fall"),
      difficulty: 1,
      questions: [
        { q: "What does Al-Muzn mean, per Ibn Abbas?", a: "Clouds", wrong: ["Mountains", "Rivers", "Stars"], why: "From Al-Muzn, meaning clouds, according to Ibn 'Abbas, Mujahid and others." },
        { q: "Who sends the rain down?", a: "Allah", wrong: ["The stars", "The wind alone", "People"], why: "Allah is stating that indeed He is the One Who causes the rain to fall." },
        { tf: false, q: "People can make the clouds rain by themselves.", why: "Is it you who cause it to come down from Al-Muzn, or are We the Cause of it coming down?" }
      ]
    },
    {
      slug: "a-dua-for-rain",
      title: "A dua for rain",
      line: "When he ﷺ saw rain, he asked Allah to make it fruitful.",
      facts: ["Rain can help or harm", "We ask Allah to make it beneficial"],
      quote: q56(69),
      source: hadith("bukhari", "1032", "Aishah", "Sahih", "Aishah said whenever the Prophet ﷺ saw rain he said: O Allah, let it be a strong fruitful rain.", "O Allah! Let it be a strong fruitful rain"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ say when he saw rain?", a: "O Allah, make it fruitful rain", wrong: ["Stop the rain", "Nothing", "Run inside"], why: "O Allah! Let it be a strong fruitful rain." },
        { q: "Who reported it in Bukhari 1032?", a: "Aishah", wrong: ["Abu Jahl", "Pharaoh", "Qarun"], why: "Narrated Aisha: Whenever Allah's Messenger saw the rain..." },
        { tf: true, q: "Making dua at rain shows thanks to the One Who sends it.", why: "Why do you not appreciate the favor Allah does for you by sending down the rain fresh." }
      ]
    },
    {
      slug: "it-could-be-salty",
      title: "Sweet, not salty",
      line: "If Allah willed, He could make rain salty and useless.",
      facts: ["Fresh water is a mercy", "So we should give thanks"],
      quote: q56(70),
      source: ik(70, "Ibn Kathir says if Allah willed, the water would be salty, sour, undrinkable and unfit for growing plants.", "salty, sour, undrinkable and unfit for growing plants"),
      difficulty: 2,
      questions: [
        { q: "What could Allah make the water, in 56:70?", a: "Salty", wrong: ["Golden", "Frozen", "Sweeter"], why: "If We willed, We verily could make it salty." },
        { q: "What would salty rain be unfit for?", a: "Drinking and growing plants", wrong: ["Swimming only", "Nothing", "Washing only"], why: "Salty, sour, undrinkable and unfit for growing plants." },
        { q: "What does 56:70 ask at the end?", a: "Why do you not give thanks?", wrong: ["Why do you sleep?", "Why do you travel?", "Why do you trade?"], why: "Why then do you not give thanks?" }
      ]
    },
    {
      slug: "the-fire-you-kindle",
      title: "The fire you kindle",
      line: "Look at the fire you light from wood.",
      facts: ["Fire comes from trees", "Allah made trees that can burn"],
      quote: q56(71),
      source: ik(71, "Ibn Kathir explains: the fire you start with the use of trees.", "the fire you start with the use of trees"),
      difficulty: 1,
      questions: [
        { q: "What does Allah ask us to see, in 56:71?", a: "The fire we kindle", wrong: ["The snow", "The moon", "The sea"], why: "Do you not see the fire which you kindle." },
        { q: "What is fire started with, per Ibn Kathir?", a: "Trees", wrong: ["Water", "Sand", "Ice"], why: "And the fire you start with the use of trees." },
        { tf: true, q: "Fire is the third gift named after crops and water.", why: "Allah's Oneness demonstrated by causing the Plants to grow, sending down the Rain and creating the Fire that Mankind needs." }
      ]
    },
    {
      slug: "green-trees-that-spark",
      title: "Green trees that spark",
      line: "The Arabs rubbed two green branches together to make fire.",
      facts: ["Al-Markh and Al-Afar were two such trees", "Fire from green wood is a sign"],
      quote: q56(72),
      source: ik(72, "Ibn Kathir says the Arabs had two trees, Al-Markh and Al-Afar; when they rubbed a green branch from each together, sparks of fire came out.", "When they would rub a green branch from each of these two trees against each other, sparkles of fire would emit from them"),
      difficulty: 3,
      questions: [
        { q: "Who grows the tree used for fire, in 56:72?", a: "Allah", wrong: ["The traveler", "The trader", "The king"], why: "Is it you who made the tree thereof to grow, or are We the Grower?" },
        { q: "How did the Arabs make fire from these trees?", a: "Rubbing two green branches", wrong: ["Using glass", "Using water", "Using stones only"], why: "When they would rub a green branch from each of these two trees against each other, sparkles of fire would emit from them." },
        { q: "What were the two trees called?", a: "Al-Markh and Al-Afar", wrong: ["Sidr and Talh", "Tuba and Zaqqum", "Palm and Olive"], why: "The Arabs had two kinds of trees called Al-Markh and Al-'Afar." }
      ]
    },
    {
      slug: "a-reminder-of-the-fire",
      title: "A reminder of the Fire",
      line: "Our fire is a reminder of the much greater Fire.",
      facts: ["Our fire is one part of seventy", "Reminders help us stay on the right path"],
      quote: q56(73),
      source: hadith("bukhari", "3265", "Abu Hurairah", "Sahih", "The Prophet ﷺ said our ordinary fire is one of seventy parts of the Fire of Hell.", "fire is one of 70 parts of the"),
      difficulty: 2,
      questions: [
        { q: "What is our fire a reminder of, per Mujahid?", a: "The Hellfire", wrong: ["The sun", "A feast", "A lamp"], why: "We have made it a Reminder, of the Hellfire, according to Mujahid and Qatadah." },
        { q: "Our fire is how many parts of that Fire?", a: "One of seventy", wrong: ["One of two", "One of ten", "All of it"], why: "Your (ordinary) fire is one of 70 parts of the (Hell) Fire." },
        { tf: true, q: "A reminder helps us choose good and avoid harm.", why: "We have made it a Reminder." }
      ]
    },
    {
      slug: "a-gift-for-travelers",
      title: "A gift for travelers",
      line: "Fire is a gift for travelers in the desert.",
      facts: ["Al-Muqwin means travelers", "Ibn Jarir chose this meaning"],
      quote: q56(73),
      source: ik(73, "Ibn Kathir quotes Ibn Abbas, Mujahid and others: the meaning of Al-Muqwin is travelers.", "The meaning of Al-Muqwin is travelers"),
      difficulty: 2,
      questions: [
        { q: "What does Al-Muqwin mean, per Ibn Abbas?", a: "Travelers", wrong: ["Kings", "Children", "Sailors"], why: "The meaning of Al-Muqwin is travelers." },
        { q: "What did Ibn Zayd say Al-Muqwi means?", a: "The hungry", wrong: ["The sleepy", "The rich", "The angry"], why: "Al-Muqwi means the hungry." },
        { tf: true, q: "Ibn Jarir chose the meaning: travelers.", why: "This is also what Ibn Jarir chose." }
      ]
    },
    {
      slug: "fire-for-everyone",
      title: "Fire for everyone",
      line: "Everyone needs fire to cook, keep warm and light the dark.",
      facts: ["Rich or poor, home or traveling", "Fire is Allah's kindness to all"],
      quote: q56(73),
      source: ik(73, "Ibn Kathir says those at home and traveling, rich or poor, all need fire for cooking, heating and lighting purposes.", "all need fire for cooking, heating and lighting purposes"),
      difficulty: 2,
      questions: [
        { q: "What three uses of fire does Ibn Kathir name?", a: "Cooking, heating and lighting", wrong: ["Swimming, sailing, flying", "Singing, dancing, playing", "Reading, writing, counting"], why: "All need fire for cooking, heating and lighting purposes." },
        { q: "Whose kindness is it that fire can be kindled?", a: "Allah's kindness", wrong: ["The traveler", "The tree", "The stone"], why: "It is out of Allah's kindness that He has made the quality of kindling fire in some elements." },
        { tf: true, q: "Mujahid gave the wider meaning: all who enjoy cooked food.", why: "For the Muqwin, means, all people who enjoy (eating food cooked by fire)." }
      ]
    },
    {
      slug: "glorify-the-most-great",
      title: "Glorify the Most Great",
      line: "After all these signs: glorify your Lord, the Most Great.",
      facts: ["He made fresh water and useful fire", "So we praise Him"],
      quote: q56(74),
      source: ik(74, "Ibn Kathir says glorify the One Who created opposites: He created the fresh tasty water, and the fire that burns yet benefits His servants.", "He created the fresh tasty water"),
      difficulty: 1,
      questions: [
        { q: "What are we told to do, in 56:74?", a: "Glorify the Name of our Lord", wrong: ["Rest", "Travel", "Trade"], why: "Then glorify with praises the Name of your Lord, the Most Great." },
        { q: "Which water did Allah create, per Ibn Kathir?", a: "Fresh, tasty water", wrong: ["Only salty water", "No water", "Only ice"], why: "He created the fresh tasty water." },
        { tf: true, q: "Fire is a benefit now and a warning for later.", why: "Suitable for their livelihood in this life and as a warning and a punishment for them in the Hereafter." }
      ]
    },
    {
      slug: "two-light-words",
      title: "Two light words",
      line: "Two phrases are light on the tongue but heavy on the scale.",
      facts: ["Subhan Allah wa bihamdihi", "Subhan Allah al-Azim"],
      quote: q56(74),
      source: hadith("bukhari", "6406", "Abu Hurairah", "Sahih", "The Prophet ﷺ said two expressions are easy for the tongue, heavy in the balance and dear to the Most Merciful: Subhan Allah al-Azim and Subhan Allah wa bihamdihi.", "very easy for the tongue to say, but they are very heavy in the balance"),
      difficulty: 2,
      questions: [
        { q: "How are the two phrases on the scale?", a: "Very heavy", wrong: ["Very light", "Empty", "Hidden"], why: "Very easy for the tongue to say, but they are very heavy in the balance." },
        { q: "Which phrase matches 56:74?", a: "Subhan Allah al-Azim", wrong: ["Allahu Akbar", "Bismillah", "Alhamdulillah"], why: "Glorify with praises the Name of your Lord, the Most Great." },
        { tf: true, q: "They are dear to the Most Merciful.", why: "And are very dear to The Beneficent (Allah)." }
      ]
    }
  ]
};

/** Ayahs 75 to 96: Allah swears to the greatness of the Quran, the moment of death, and the three ends of every soul. */
const WAQIAH_FOUR: DeepUnit = {
  key: "waqiah4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-56",
  name: "Al-Waqi'ah, ayahs 75 to 96",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Waqi'ah",
  lessons: [
    {
      slug: "by-the-setting-of-the-stars",
      title: "By the setting of the stars",
      line: "Allah swears by the places where the stars set.",
      facts: ["Mawaqi means the setting places", "Mujahid said rising and setting places"],
      quote: q56(75),
      source: ik(75, "Ibn Kathir quotes Mujahid that the Mawaqi of the stars are the setting positions of the stars in the sky.", "The setting positions of the stars in the sky"),
      difficulty: 2,
      questions: [
        { q: "What does Allah swear by, in 56:75?", a: "The Mawaqi of the stars", wrong: ["The fig and olive", "The dawn", "The pen"], why: "Fala! I swear by the Mawaqi' of the stars." },
        { q: "What are the Mawaqi, per Mujahid?", a: "Where the stars set", wrong: ["Where rivers end", "Where birds nest", "Where winds start"], why: "The setting positions of the stars in the sky." },
        { tf: true, q: "Ibn Jarir preferred the meaning of rising and setting places.", why: "This was said by Al-Hasan, Qatadah and preferred by Ibn Jarir." }
      ]
    },
    {
      slug: "no-it-is-not-as-you-claim",
      title: "No, it is not as you claim",
      line: "Fala means: no! The Quran is not what the deniers say.",
      facts: ["Some said the Quran was magic", "Allah answers: it is an honored Quran"],
      quote: q56(75),
      source: ik(75, "Ibn Kathir says Fala means: no, the matter is not as you people claim about the Quran, that it is magic or sorcery; rather it is an honorable Quran.", "The matter is not as you people claim"),
      difficulty: 3,
      questions: [
        { q: "What does the La in Fala do, per Ibn Kathir?", a: "Starts an oath with a no", wrong: ["Means nothing", "Means yes", "Is a name"], why: "Rather it is used at the beginning of an oath when the oath is a negation." },
        { q: "What did deniers claim the Quran was?", a: "Magic or sorcery", wrong: ["A song", "A map", "A law book"], why: "That it is a result of magic or sorcery, rather it is an Honorable Qur'an." },
        { tf: false, q: "Ibn Kathir says the La in Fala is an extra letter with no meaning.", why: "The usage of La (in Fala) is not an extra character without meaning." }
      ]
    },
    {
      slug: "a-great-oath",
      title: "A great oath",
      line: "Allah says this is a great oath, if only you knew.",
      facts: ["A great oath points to a great matter", "The matter sworn on is the Quran"],
      quote: q56(76),
      source: ik(76, "Ibn Kathir says if you knew the greatness of this vow, you will know the greatness of the subject of the vow.", "if you knew the greatness of this vow, you will know the greatness of the subject of the vow"),
      difficulty: 2,
      questions: [
        { q: "How does Allah describe the oath, in 56:76?", a: "A great oath", wrong: ["A small oath", "A broken oath", "A secret oath"], why: "And verily that is indeed a great oath, if you but know." },
        { q: "What does a great oath show, per Ibn Kathir?", a: "The greatness of its subject", wrong: ["Nothing", "That it is false", "That it is a riddle"], why: "If you knew the greatness of this vow, you will know the greatness of the subject of the vow." },
        { tf: true, q: "The oath is about the Quran.", why: "That (this) is indeed an honorable recitation." }
      ]
    },
    {
      slug: "an-honorable-recitation",
      title: "An honorable recitation",
      line: "The Quran is a noble, glorious recitation.",
      facts: ["Quran means a recitation", "Allah revealed it to Muhammad ﷺ"],
      quote: q56(77),
      source: ik(77, "Ibn Kathir says this Quran that was revealed to Muhammad is a Glorious Book.", "is a Glorious Book"),
      difficulty: 1,
      questions: [
        { q: "What is the Quran called, in 56:77?", a: "An honorable recitation", wrong: ["A poem", "A story", "A riddle"], why: "That (this) is indeed an honorable recitation." },
        { q: "How does Ibn Kathir describe it?", a: "A Glorious Book", wrong: ["An old tale", "A song", "A letter"], why: "This Qur'an that was revealed to Muhammad is a Glorious Book." },
        { tf: true, q: "56:77 is what Allah swore the great oath about.", why: "The matter is not as you people claim... rather it is an Honorable Qur'an." }
      ]
    },
    {
      slug: "a-guarded-book",
      title: "A guarded Book",
      line: "The Quran is in a Book that is well guarded.",
      facts: ["Maknun means guarded and hidden", "No one can change it"],
      quote: q56(78),
      source: ik(78, "Ibn Kathir says Maknun means in a glorious, well-guarded, revered Book.", "in a glorious, well-guarded, revered Book"),
      difficulty: 2,
      questions: [
        { q: "Where is the Quran, in 56:78?", a: "In a Book Maknun", wrong: ["In a cave", "In a palace", "In a ship"], why: "In a Book Maknun." },
        { q: "What does Maknun mean, per Ibn Kathir?", a: "Well-guarded and revered", wrong: ["Lost", "Torn", "Forgotten"], why: "In a glorious, well-guarded, revered Book." },
        { tf: true, q: "Ibn Abbas said the Book in 56:78-79 is in heaven.", why: "He said, The Book that is in heaven." }
      ]
    },
    {
      slug: "touched-by-the-pure-ones",
      title: "Touched by the pure ones",
      line: "Only the pure ones, the angels, touch the Book in heaven.",
      facts: ["The pure ones are the angels", "Many early scholars said this"],
      quote: q56(79),
      source: ik(79, "Ibn Kathir quotes Ibn Abbas that the pure ones are the angels, and many others said the same.", "The angels"),
      difficulty: 2,
      questions: [
        { q: "Who touches the Book, in 56:79?", a: "The pure ones", wrong: ["The poets", "The jinn", "The kings"], why: "Which none touches but the pure ones." },
        { q: "Who are the pure ones, per Ibn Abbas?", a: "The angels", wrong: ["The traders", "The scholars", "The children"], why: "The pure ones means: The angels." },
        { tf: true, q: "Anas and Mujahid said the same as Ibn Abbas.", why: "Similar was said by Anas, Mujahid, 'Ikrimah, Sa'id bin Jubayr..." }
      ]
    },
    {
      slug: "not-brought-by-devils",
      title: "Not brought by devils",
      line: "The Quraysh claimed devils brought the Quran. Allah says no.",
      facts: ["Only pure angels brought it down", "26:210 says devils cannot bring it"],
      quote: q56(79),
      source: ik(79, "Ibn Kathir quotes Ibn Zayd: the Quraysh disbelievers claimed that the devils brought down the Quran, and Allah said only the pure ones touch it.", "claimed that the devils brought down the"),
      difficulty: 3,
      questions: [
        { q: "What did the Quraysh claim, per Ibn Zayd?", a: "Devils brought the Quran", wrong: ["Angels wrote poems", "Kings wrote it", "Traders made it"], why: "The Quraysh disbelievers claimed that the devils brought down the Qur'an." },
        { q: "What does 26:210 say about the devils?", a: "They did not bring it down", wrong: ["They wrote it", "They guard it", "They teach it"], why: "And it is not the Shayatin who have brought it down. (26:210)" },
        { tf: true, q: "Ibn Kathir says Ibn Zayd's view is good and fits the others.", why: "This saying is a good saying, and does not contradict those before it." }
      ]
    },
    {
      slug: "with-the-noble-scribes",
      title: "With the noble scribes",
      line: "One who masters the Quran is with the noble angel scribes.",
      facts: ["Struggling reciters get a double reward", "Keep reading even when it is hard"],
      quote: q56(79),
      source: hadith("bukhari", "4937", "Aishah", "Sahih", "The Prophet ﷺ said one who recites the Quran and masters it will be with the noble righteous scribes, and one who struggles to learn it gets a double reward.", "will be with the noble righteous scribes"),
      difficulty: 2,
      questions: [
        { q: "Who will be with the noble scribes?", a: "One who masters the Quran", wrong: ["One who sleeps", "One who boasts", "One who is rich"], why: "Such a person as recites the Qur'an and masters it by heart, will be with the noble righteous scribes." },
        { q: "What does one who struggles to recite get?", a: "A double reward", wrong: ["No reward", "Half a reward", "A warning"], why: "And recites it with great difficulty, will have a double reward." },
        { tf: true, q: "The noble scribes are angels, like the pure ones of 56:79.", why: "That the pure ones means: The angels." }
      ]
    },
    {
      slug: "from-the-lord-of-all",
      title: "From the Lord of all",
      line: "The Quran is sent down from the Lord of all that exists.",
      facts: ["Not magic, sorcery or poetry", "The Quran is the truth with no doubt"],
      quote: q56(80),
      source: ik(80, "Ibn Kathir says the Quran is a revelation from the Lord of all that exists, not as they say that it is magic, sorcery or poetry.", "not as they say that it is magic, sorcery or poetry"),
      difficulty: 1,
      questions: [
        { q: "Who sent the Quran down, in 56:80?", a: "The Lord of all that exists", wrong: ["A poet", "A king", "A wise man"], why: "A revelation from the Lord of all that exists." },
        { q: "What three claims does Ibn Kathir reject?", a: "Magic, sorcery or poetry", wrong: ["Law, story and song", "Trade, war and peace", "Old, new and lost"], why: "Not as they say that it is magic, sorcery or poetry." },
        { tf: true, q: "Ibn Kathir says the Quran is the truth with no doubt.", why: "Rather it is the truth, no doubt about it." }
      ]
    },
    {
      slug: "do-you-take-it-lightly",
      title: "Do you take it lightly?",
      line: "Allah asks: is it this Book that you treat as untrue?",
      facts: ["Mudhinun means denying, not believing", "The Quran deserves full belief"],
      quote: q56(81),
      source: ik(81, "Ibn Kathir quotes Ibn Abbas that Mudhinun means you do not believe in it and deny it.", "You do not believe in and deny"),
      difficulty: 2,
      questions: [
        { q: "What does Mudhinun mean, per Ibn Abbas?", a: "Not believing and denying", wrong: ["Reciting well", "Writing it", "Loving it"], why: "Mudhinun means, You do not believe in and deny." },
        { q: "What talk is meant in 56:81?", a: "The Quran", wrong: ["Poetry", "Market talk", "Gossip"], why: "Is it such a talk that you are Mudhinun?" },
        { tf: true, q: "Ad-Dahhak and As-Suddi said the same as Ibn Abbas.", why: "Similar to this was said by Ad-Dahhak, Abu Hazrah and As-Suddi." }
      ]
    },
    {
      slug: "thanks-by-denying",
      title: "Thanks by denying",
      line: "Allah blames those who answer His gifts with denial.",
      facts: ["Provision here means thanks", "They thanked the stars, not Allah"],
      quote: q56(82),
      source: ik(82, "Ibn Kathir says some scholars said provision here has the meaning of gratitude: you deny without any gratitude.", "provision here has the meaning of gratitude"),
      difficulty: 3,
      questions: [
        { q: "What does provision mean in 56:82, per some scholars?", a: "Gratitude", wrong: ["Gold", "Bread", "Land"], why: "Some of them said that provision has the meaning of gratitude." },
        { q: "What did Ibn Abbas say some people did when it rained?", a: "Thanked a star for it", wrong: ["Thanked Allah", "Prayed", "Gave charity"], why: "Such and such position of a star sent rain!" },
        { tf: true, q: "Ibn Kathir says the chain to Ibn Abbas is Sahih.", why: "This chain of narration is Sahih to Ibn 'Abbas." }
      ]
    },
    {
      slug: "the-rain-and-the-stars",
      title: "The rain and the stars",
      line: "Whoever says rain came by Allah's mercy truly believes.",
      facts: ["Rain comes from Allah, not stars", "He ﷺ taught it after a rainy night"],
      quote: q56(82),
      source: hadith("bukhari", "846", "Zayd ibn Khalid al-Juhani", "Sahih", "After a rainy night at Hudaybiyah the Prophet ﷺ said Allah said: whoever says the rain was by the blessings and mercy of Allah believes in Me, and whoever says it was from a star believes in the star.", "whoever said that the rain was due to the Blessings and the Mercy of Allah had belief in Me"),
      difficulty: 2,
      questions: [
        { q: "Where did he ﷺ teach Bukhari 846?", a: "At Hudaybiyah", wrong: ["At Badr", "At Taif", "At Tabuk"], why: "The Prophet ﷺ led us in the Fajr prayer at Hudaibiya after a rainy night." },
        { q: "Who truly believes, per the hadith?", a: "Who says rain is Allah's mercy", wrong: ["Who praises the stars", "Who stays silent", "Who checks the sky"], why: "Whoever said that the rain was due to the Blessings and the Mercy of Allah had belief in Me." },
        { tf: false, q: "Saying a star brought the rain is fine.", why: "Whoever said that it rained because of a particular star had no belief in Me but believes in that star." }
      ]
    },
    {
      slug: "when-the-soul-reaches-the-throat",
      title: "When the soul reaches the throat",
      line: "At death the soul rises to the throat, beyond our help.",
      facts: ["Al-Hulqum means the throat", "75:26 speaks of the same moment"],
      quote: q56(83),
      source: ik(83, "Ibn Kathir says 56:83 is in reference to the soul at the time of death, when it reaches the throat.", "in reference to the soul"),
      difficulty: 2,
      questions: [
        { q: "What does Al-Hulqum mean?", a: "The throat", wrong: ["The heart", "The hand", "The eye"], why: "Al-Hulqum: the throat, at the time of death." },
        { q: "What reaches the throat, per Ibn Kathir?", a: "The soul", wrong: ["Food", "Water", "A word"], why: "In reference to the soul." },
        { tf: true, q: "Surah 75 also describes the soul reaching the collar bone.", why: "Nay, when (the soul) reaches to the collar bone. (75:26)" }
      ]
    },
    {
      slug: "you-are-looking-on",
      title: "You are looking on",
      line: "Family can only watch; they cannot help.",
      facts: ["No one can hold back death", "Only Allah decides it"],
      quote: q56(84),
      source: ik(84, "Ibn Kathir says the people present are looking at the dying person and witnessing the stupor of death.", "at the dying person"),
      difficulty: 1,
      questions: [
        { q: "What are the people doing, in 56:84?", a: "Looking on", wrong: ["Sleeping", "Traveling", "Trading"], why: "And you at the moment are looking." },
        { q: "Whom are they looking at?", a: "The dying person", wrong: ["The sky", "The market", "The sea"], why: "At the dying person and witnessing the stupor of death that he is experiencing." },
        { tf: false, q: "Family members can stop death if they try.", why: "Then why do you not (intervene) when it reaches Al-Hulqum." }
      ]
    },
    {
      slug: "nearer-than-you",
      title: "Nearer than you",
      line: "Allah, with His angels, is nearer than the people present.",
      facts: ["The angels come to take the soul", "People cannot see them"],
      quote: q56(85),
      source: ik(85, "Ibn Kathir says Allah is nearer with His angels, but you cannot see the angels.", "you cannot see the angels"),
      difficulty: 2,
      questions: [
        { q: "Who is nearer to the dying, in 56:85?", a: "Allah, with His angels", wrong: ["The doctor", "The family", "No one"], why: "But We are nearer to him than you, with Our angels." },
        { q: "Why do people not notice them?", a: "They cannot see the angels", wrong: ["They are asleep", "They are far", "They are busy"], why: "But you see not, you cannot see the angels." },
        { tf: true, q: "6:61 says angels take the soul and never neglect their duty.", why: "Our messengers (angel of death and his assistants) take his soul, and they never neglect their duty. (6:61)" }
      ]
    },
    {
      slug: "if-you-will-not-be-judged",
      title: "If you will not be judged",
      line: "If you think there is no reckoning, then hold back death!",
      facts: ["Madinin means those to be judged", "No one can return the soul"],
      quote: q56(86),
      source: ik(86, "Ibn Kathir quotes Mujahid that if you are not Madinin means: if you are not certain.", "if you are not certain"),
      difficulty: 3,
      questions: [
        { q: "What does if you are not Madinin mean, per Mujahid?", a: "If you are not certain", wrong: ["If you are rich", "If you are tired", "If you are young"], why: "If you are not Madinin, means, if you are not certain." },
        { q: "What did Al-Hasan say the challenge means?", a: "If no reckoning, return the soul", wrong: ["Go to sleep", "Buy more", "Travel far"], why: "If you do not believe that you will be reckoned... then why do you not return this soul to its body?" },
        { tf: true, q: "The challenge in 56:86-87 proves the Reckoning.", why: "When the Soul reaches the Throat at the Time of Death, it cannot be brought back; this proves Reckoning shall occur." }
      ]
    },
    {
      slug: "bring-it-back-if-you-can",
      title: "Bring it back if you can",
      line: "Return the soul, if you are truthful. No one ever can.",
      facts: ["Death shows we are not in control", "Allah is the One Who judges"],
      quote: q56(87),
      source: ik(87, "Ibn Kathir explains: will you not return this soul, that has reached the throat, to its body as it used to be, if you are exempt from the reckoning?", "return this soul, that has reached the throat, to its body"),
      difficulty: 2,
      questions: [
        { q: "What does 56:87 challenge them to do?", a: "Return the soul", wrong: ["Build a tower", "Stop the rain", "Count the stars"], why: "Return the soul, if you are truthful." },
        { q: "Can anyone return a soul to its body?", a: "No one", wrong: ["Doctors", "Kings", "Magicians"], why: "Will you not return this soul, that has reached the throat, to its body as it used to be." },
        { tf: true, q: "This proves people are not free of the Reckoning.", why: "If you are exempt from the reckoning and recompense?" }
      ]
    },
    {
      slug: "if-he-is-of-the-near-ones",
      title: "If he is of the near ones",
      line: "The dying person may be of the Muqarrabin, the near ones.",
      facts: ["They did the duties and the extra worship", "They kept away from the forbidden"],
      quote: q56(88),
      source: ik(88, "Ibn Kathir says the Muqarrabun fulfilled the obligations and the recommended acts of worship and avoided the forbidden and disliked matters.", "who fulfilled the obligations and the recommended acts of worship"),
      difficulty: 2,
      questions: [
        { q: "Who are the Muqarrabin, in 56:88?", a: "The near ones", wrong: ["The far ones", "The deniers", "The strangers"], why: "Then, if he be of the Muqarrabin." },
        { q: "What did they do, per Ibn Kathir?", a: "Duties and extra worship", wrong: ["Only duties", "Nothing", "Only trade"], why: "Who fulfilled the obligations and the recommended acts of worship." },
        { tf: true, q: "56:88-96 are the three groups again, at death.", why: "These are the three types of conditions that people face upon their death." }
      ]
    },
    {
      slug: "rest-and-sweet-provision",
      title: "Rest and sweet provision",
      line: "For them: Rawh, Rayhan and a Garden of Delights.",
      facts: ["Rawh means rest and mercy", "Rayhan means a place of rest and provision"],
      quote: q56(89),
      source: ik(89, "Ibn Kathir quotes Ibn Abbas: Rawh means rest, and Rayhan means place of rest. He says all the explanations are correct and similar.", "Rawh means rest, and Rayhan means place of rest"),
      difficulty: 2,
      questions: [
        { q: "What does Rawh mean, per Ibn Abbas?", a: "Rest", wrong: ["Fear", "Hunger", "Cold"], why: "Rawh means rest, and Rayhan means place of rest." },
        { q: "What did Qatadah say Rawh means?", a: "Mercy", wrong: ["Wind", "Gold", "Sleep"], why: "Qatadah said that Rawh means mercy." },
        { tf: true, q: "Ibn Kathir says all these meanings are correct.", why: "All of these explanations are correct and similar in meaning." }
      ]
    },
    {
      slug: "glad-news-at-death",
      title: "Glad news at death",
      line: "Angels bring the believer glad news at the time of death.",
      facts: ["Come to rest and a Lord not angry", "41:30 also tells of this news"],
      quote: q56(89),
      source: ik(89, "Ibn Kathir says the glad tidings of these traits will be conveyed to them by the angels at the time of death.", "the glad tidings of these traits will be conveyed to them by the angels at the time of death"),
      difficulty: 2,
      questions: [
        { q: "Who brings the glad news, per Ibn Kathir?", a: "The angels", wrong: ["Neighbors", "Strangers", "Birds"], why: "The glad tidings of these traits will be conveyed to them by the angels at the time of death." },
        { q: "What do the angels say, per the hadith of Al-Bara?", a: "Come to Rawh and Rayhan", wrong: ["Go away", "Wait longer", "Say nothing"], why: "O good soul in the good body that you inhabited, come to Rawh, Rayhan and a Lord Who is not angry." },
        { tf: true, q: "41:30 says angels tell the steadfast: fear not, nor grieve.", why: "On them the angles will descend (saying): Fear not, nor grieve! (41:30)" }
      ]
    },
    {
      slug: "loving-to-meet-allah",
      title: "Loving to meet Allah",
      line: "Whoever loves to meet Allah, Allah loves to meet him.",
      facts: ["The believer gets good news at death", "Then nothing is dearer than meeting Allah"],
      quote: q56(89),
      source: hadith("bukhari", "6507", "Ubadah ibn as-Samit", "Sahih", "The Prophet ﷺ said whoever loves to meet Allah, Allah loves to meet him; when death comes, the believer receives the good news of Allah's pleasure and loves to meet Him.", "he receives the good news of Allah"),
      difficulty: 3,
      questions: [
        { q: "Who does Allah love to meet, per Bukhari 6507?", a: "Who loves to meet Allah", wrong: ["Who is rich", "Who is famous", "Who is strong"], why: "Who-ever loves to meet Allah, Allah (too) loves to meet him." },
        { q: "Why does the dying believer love to meet Allah?", a: "He gets news of Allah's pleasure", wrong: ["He is bored", "He is tired", "He is forced"], why: "He receives the good news of Allah's pleasure with him and His blessings upon him." },
        { tf: false, q: "Disliking death means one hates to meet Allah.", why: "But we dislike death. He said: It is not like this." }
      ]
    },
    {
      slug: "souls-like-green-birds",
      title: "Souls like green birds",
      line: "The souls of martyrs live in green birds in Paradise.",
      facts: ["Their nests hang from the Throne", "They eat the fruits of Paradise"],
      quote: q56(89),
      source: hadith("muslim", "1887", "Abdullah ibn Mas'ud", "Sahih", "The Prophet ﷺ said the souls of the martyrs live in the bodies of green birds whose nests are lamps hung from the Throne, and they eat the fruits of Paradise.", "live in the bodies of green birds"),
      difficulty: 3,
      questions: [
        { q: "What do the souls of martyrs live in?", a: "Green birds", wrong: ["Gold boxes", "White clouds", "Stone houses"], why: "The souls, of the martyrs live in the bodies of green birds." },
        { q: "Where are their nests?", a: "Hung from the Throne", wrong: ["In trees on earth", "In caves", "In the sea"], why: "Who have their nests in chandeliers hung from the throne of the Almighty." },
        { tf: true, q: "Ibn Kathir mentions it with Garden of Delights.", why: "The souls of the martyrs live in the bodies of green birds flying wherever they wish in the Gardens of Paradise." }
      ]
    },
    {
      slug: "if-he-is-of-those-on-the-right",
      title: "If he is of those on the right",
      line: "The dying person may be one of those on the right.",
      facts: ["The second group, the righteous", "They too get good news"],
      quote: q56(90),
      source: ik(90, "Ibn Kathir says this means if he, the dying person, is among those on the right.", "if he, the dying person, is among those on the right"),
      difficulty: 1,
      questions: [
        { q: "Who is spoken of in 56:90?", a: "Those on the right", wrong: ["The foremost", "The deniers", "The angels"], why: "And if he be of those on the right." },
        { q: "Who is the he in 56:90?", a: "The dying person", wrong: ["The angel", "The king", "The scholar"], why: "If he, the dying person, is among those on the right." },
        { tf: true, q: "Those on the right are the second of the three groups.", why: "Either they are among the near believers or those below their rank on the right." }
      ]
    },
    {
      slug: "peace-be-upon-you",
      title: "Peace be upon you",
      line: "Angels greet them with salam: you are safe.",
      facts: ["Salam means peace and safety", "They hear they are of those on the right"],
      quote: q56(91),
      source: ik(91, "Ibn Kathir says the angels will deliver the good news to them by saying peace be upon you, you are among those on the right.", "the angels will deliver the good news to them by saying"),
      difficulty: 1,
      questions: [
        { q: "What is said to them, in 56:91?", a: "Salam, peace to you", wrong: ["Go away", "Wait here", "Nothing"], why: "Then Salam (peace) to you from those on the right." },
        { q: "Who greets them, per Ikrimah?", a: "The angels", wrong: ["Their enemies", "Strangers", "Animals"], why: "The angels will greet him with the Salam and convey to him the news that he is among those on the right." },
        { tf: true, q: "Ibn Kathir calls this a good explanation.", why: "This is a good explanation, and it conforms with Allah's statement." }
      ]
    },
    {
      slug: "think-well-of-allah",
      title: "Think well of Allah",
      line: "None of you should die except hoping good from Allah.",
      facts: ["He ﷺ said it three days before he passed", "Hope in Allah's mercy always"],
      quote: q56(91),
      source: hadith("muslim", "2877", "Jabir ibn Abdullah", "Sahih", "Jabir heard the Prophet ﷺ say three days before his death: none of you should die except hoping only good from Allah.", "None of you should die but hoping only good from Allah"),
      difficulty: 2,
      questions: [
        { q: "How should a believer die, per Muslim 2877?", a: "Hoping good from Allah", wrong: ["In fear only", "Without thought", "In anger"], why: "None of you should die but hoping only good from Allah." },
        { q: "When did he ﷺ say it?", a: "Three days before his death", wrong: ["At Badr", "In Ramadan", "On Hajj"], why: "I heard Allah's Messenger say three days before his death." },
        { tf: true, q: "Hoping good from Allah fits the salam in 56:91.", why: "Then Salam (peace) to you from those on the right." }
      ]
    },
    {
      slug: "the-denying-who-strayed",
      title: "The denying who strayed",
      line: "The third group: those who denied and went astray.",
      facts: ["They denied the truth", "They strayed from guidance"],
      quote: q56(92),
      source: ik(92, "Ibn Kathir says this is the dying person who was one of those who denied the truth, who were led astray from guidance.", "who denied the truth, who were led astray from guidance"),
      difficulty: 1,
      questions: [
        { q: "Who is the third group, in 56:92?", a: "The denying, the erring", wrong: ["The foremost", "The patient", "The thankful"], why: "But if he be of the denying, the erring." },
        { q: "What did they deny, per Ibn Kathir?", a: "The truth", wrong: ["Their hunger", "The weather", "Their names"], why: "Who denied the truth, who were led astray from guidance." },
        { tf: true, q: "They are the same as those on the left.", why: "Or those who denied the truth, were led astray from the guidance and were ignorant about Allah." }
      ]
    },
    {
      slug: "a-welcome-of-boiling-water",
      title: "A welcome of boiling water",
      line: "Their welcome is boiling water, not honor.",
      facts: ["Believers are welcomed with Paradise", "Deniers get the opposite"],
      quote: q56(93),
      source: ik(93, "Ibn Kathir says then for him is an entertainment, meaning as a guest, with Hamim.", "as a guest"),
      difficulty: 2,
      questions: [
        { q: "What is their welcome, in 56:93?", a: "Hamim, boiling water", wrong: ["Cool drinks", "Fruit", "Honey"], why: "Then for him is an entertainment with Hamim." },
        { q: "What does entertainment mean, per Ibn Kathir?", a: "Being received as a guest", wrong: ["A game", "A song", "A prize"], why: "Meaning, as a guest." },
        { tf: true, q: "56:56 called the same welcome their entertainment.", why: "That will be their entertainment on the Day of Recompense. (56:56)" }
      ]
    },
    {
      slug: "entry-into-the-fire",
      title: "Entry into the Fire",
      line: "Their end is to enter the Fire.",
      facts: ["The deniers will live in Hellfire", "We ask Allah to protect us"],
      quote: q56(94),
      source: ik(94, "Ibn Kathir says he will reside in Hellfire.", "he will reside in Hellfire"),
      difficulty: 1,
      questions: [
        { q: "What is their end, in 56:94?", a: "Entry in Hellfire", wrong: ["Entry in Paradise", "A long sleep", "Nothing"], why: "And entry in Hellfire." },
        { q: "How long will they stay, per Ibn Kathir?", a: "They will reside there", wrong: ["One night", "One hour", "Never enter"], why: "He will reside in Hellfire." },
        { tf: true, q: "The surah ends each group with its home.", why: "These are the three types of conditions that people face upon their death." }
      ]
    },
    {
      slug: "the-certain-truth",
      title: "The certain truth",
      line: "All of this is the certain truth, with no doubt.",
      facts: ["Haqq al-Yaqin means certain truth", "No one can escape it"],
      quote: q56(95),
      source: ik(95, "Ibn Kathir says this news is the truth; there is no doubt about it, nor escape from it for anyone.", "this news is the truth; there is no doubt about it"),
      difficulty: 1,
      questions: [
        { q: "What does 56:95 call this news?", a: "An absolute truth with certainty", wrong: ["A guess", "A story", "A dream"], why: "Verily, this! This is an absolute truth with certainty." },
        { q: "Can anyone escape it, per Ibn Kathir?", a: "No one", wrong: ["The rich", "The strong", "The clever"], why: "There is no doubt about it, nor escape from it for anyone." },
        { tf: false, q: "The three ends are only a story.", why: "This news is the truth; there is no doubt about it." }
      ]
    },
    {
      slug: "glorify-the-name-of-your-lord",
      title: "Glorify the name of your Lord",
      line: "The surah ends: glorify the Name of your Lord, the Most Great.",
      facts: ["56:74 and 56:96 end the same way", "Praise Allah after every sign"],
      quote: q56(96),
      source: ik(96, "Ibn Kathir closes the surah with the ayah: so, glorify with praises the Name of your Lord, the Most Great.", "So, glorify with praises the Name of your Lord, the Most Great"),
      difficulty: 1,
      questions: [
        { q: "How does Surah Al-Waqi'ah end?", a: "Glorify your Lord, the Most Great", wrong: ["Say: peace", "Fight in the way", "Go to sleep"], why: "So, glorify with praises the Name of your Lord, the Most Great." },
        { q: "Which earlier ayah has the same words?", a: "56:74", wrong: ["56:1", "56:10", "56:50"], why: "Then glorify with praises the Name of your Lord, the Most Great. (56:74)" },
        { tf: true, q: "Ibn Kathir ends the tafsir with praise of Allah.", why: "This is the end of the Tafsir of Surat Al-Waqi'ah, all praise and thanks are due to Allah." }
      ]
    },
    {
      slug: "the-words-allah-loves-most",
      title: "The words Allah loves most",
      line: "The words Allah loves most: Subhan Allah wa bihamdihi.",
      facts: ["Glory be to Allah and praise to Him", "Allah chose them for His angels"],
      quote: q56(96),
      source: hadith("muslim", "2731", "Abu Dharr", "Sahih", "The Prophet ﷺ said the words liked most by Allah are: Glory be to Allah and praise is due to Him.", "the words liked most by Allah are"),
      difficulty: 2,
      questions: [
        { q: "Which words does Allah like most, per Muslim 2731?", a: "Subhan Allah wa bihamdihi", wrong: ["Any poem", "Long speeches", "Loud shouts"], why: "Verily, the words liked most by Allah are: hallowed be Allah and praise is due to Him." },
        { q: "For whom did Allah choose these words?", a: "His angels and servants", wrong: ["Only kings", "Only poets", "No one"], why: "Those for which Allah made a choice for His Angels and His servants." },
        { q: "Who reported Muslim 2731?", a: "Abu Dharr", wrong: ["Abu Jahl", "Abu Lahab", "Qarun"], why: "Abu Dharr reported that Allah's Messenger was asked as to which words were the best." }
      ]
    },
    {
      slug: "forgiven-like-sea-foam",
      title: "Forgiven like sea foam",
      line: "Saying it a hundred times a day wipes sins like sea foam.",
      facts: ["Subhan Allah wa bihamdihi, 100 times", "Even sins as much as sea foam"],
      quote: q56(96),
      source: hadith("bukhari", "6405", "Abu Hurairah", "Sahih", "The Prophet ﷺ said whoever says Subhan Allah wa bihamdihi a hundred times a day will be forgiven all his sins even if they were as much as the foam of the sea.", "will be forgiven all his sins even if they were as much as the foam of the sea"),
      difficulty: 2,
      questions: [
        { q: "How many times a day, per Bukhari 6405?", a: "One hundred", wrong: ["Three", "Ten", "One thousand"], why: "Whoever says, Subhan Allah wa bihamdihi, one hundred times a day." },
        { q: "How big can the forgiven sins be?", a: "As much as the sea foam", wrong: ["One small sin", "None", "Only a few"], why: "Will be forgiven all his sins even if they were as much as the foam of the sea." },
        { tf: true, q: "56:96 tells us to glorify Allah with praise.", why: "So, glorify with praises the Name of your Lord, the Most Great." }
      ]
    }
  ]
};

export const WAQIAH_UNITS: readonly DeepUnit[] = [WAQIAH_ONE, WAQIAH_TWO, WAQIAH_THREE, WAQIAH_FOUR];
