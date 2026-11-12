import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Al-Fil ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Fil 105:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_105_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Fil 105:${ayah}`,
    url: `https://quran.com/105:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 105:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q105 = (ayah: number) => quranQuote(105, ayah);


/** Ayahs 1 and 2: the People of the Elephant march on the Ka'bah, and Allah makes their plot go astray. */
const FIL_ONE: DeepUnit = {
  key: "fil1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-105",
  name: "Al-Fil, ayahs 1-2",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Fil",
  lessons: [
    {
      slug: "the-owners-of-the-elephant",
      title: "The Owners of the Elephant",
      line: "Allah saved the Ka'bah from an army that came with an elephant.",
      facts: ["Al-Fil: the elephant", "A favor to the Quraysh"],
      quote: q105(1),
      source: ik(1, "One of the favors Allah did for the Quraysh: He saved them from the People of the Elephant, who tried to tear down the Ka'bah.", "This is one of the favors Allah did for the Quraysh"),
      difficulty: 1,
      questions: [
        { q: "Whom does 105:1 ask about?", a: "The Owners of the Elephant", wrong: ["The People of the Cave", "The People of the Ditch", "The People of Ad"], why: "Have you not seen how your Lord dealt with the Owners of the Elephant?" },
        { q: "What did the army want to destroy?", a: "The Ka'bah", wrong: ["A palace", "A farm", "A bridge"], why: "The People of the Elephant tried to tear down the Ka'bah." },
        { tf: true, q: "Ibn Kathir calls the rescue a favor to the Quraysh.", why: "One of the favors Allah did for the Quraysh." }
      ]
    },
    {
      slug: "a-church-to-rival-the-kabah",
      title: "A church to rival the Ka'bah",
      line: "Abrahah built a huge church for Arabs to visit instead.",
      facts: ["Abrahah: ruler of Yemen", "Al-Qullays: his tall church"],
      quote: q105(1),
      source: ik(1, "Abrahah built a huge church in San'a' and wanted the Arabs to make pilgrimage to it instead of the Ka'bah.", "he began to build a huge church"),
      difficulty: 1,
      questions: [
        { q: "Who led the army of the Elephant?", a: "Abrahah", wrong: ["Fir'awn", "Namrud", "Qarun"], why: "Abrahah built a huge church in San'a' and marched on Makkah." },
        { q: "What did Abrahah want the Arabs to do?", a: "Make pilgrimage to his church", wrong: ["Leave Arabia", "Pay him gold", "Build him ships"], why: "He wanted to force the Arabs to make pilgrimage to his church." },
        { tf: false, q: "The Arab tribes happily accepted his church.", why: "The tribes of Adnan and Qahtan rejected his call." }
      ]
    },
    {
      slug: "the-great-elephant",
      title: "The great elephant",
      line: "Abrahah brought a giant elephant, Mahmud, to pull down walls.",
      facts: ["Mahmud: the elephant", "Chains to pull the walls"],
      quote: q105(1),
      source: ik(1, "Abrahah took along a great, powerful elephant called Mahmud, planning to use it to pull down the Ka'bah.", "This elephant was called Mahmud"),
      difficulty: 2,
      questions: [
        { q: "What was the great elephant called?", a: "Mahmud", wrong: ["Qaswa", "Buraq", "Adbaa"], why: "The elephant was called Mahmud." },
        { q: "How did they plan to use the elephant?", a: "To pull down the walls with chains", wrong: ["To carry water", "To plow fields", "To scare birds"], why: "They planned to tie chains to the pillars and make the elephant pull." },
        { tf: true, q: "The Arabs saw the march as a very grave matter.", why: "When the Arabs heard of the expedition, they considered it an extremely grave matter." }
      ]
    },
    {
      slug: "the-house-has-its-lord",
      title: "The House has its Lord",
      line: "Abdul-Muttalib trusted Allah to guard His own House.",
      facts: ["Two hundred camels", "Allah guards His House"],
      quote: q105(2),
      source: ik(2, "Abdul-Muttalib told Abrahah he was the lord of the camels, and that the House has its Lord Who will defend it.", "it has its Lord Who will defend it"),
      difficulty: 2,
      questions: [
        { q: "What did Abdul-Muttalib ask Abrahah for?", a: "His two hundred camels", wrong: ["A new house", "Gold coins", "An army"], why: "I want the king to return my camels, which are two hundred in number." },
        { q: "Who would defend the House, he said?", a: "Its Lord", wrong: ["The Quraysh army", "The king of Persia", "The camels"], why: "As for the House, it has its Lord Who will defend it." },
        { tf: false, q: "The people of Makkah stayed to fight the army.", why: "He ordered them to leave Makkah and shelter on the mountain tops." }
      ]
    },
    {
      slug: "the-elephant-kneels",
      title: "The elephant kneels",
      line: "Facing Makkah, the elephant knelt and would not move.",
      facts: ["Knelt toward Makkah", "Walked toward Yemen"],
      quote: q105(2),
      source: ik(2, "Whenever they turned the elephant toward Makkah it knelt, yet it walked quickly toward Yemen, Ash-Sham and the east.", "turned him towards Makkah and he knelt down again"),
      difficulty: 2,
      questions: [
        { q: "What did the elephant do facing Makkah?", a: "Knelt down", wrong: ["Ran forward", "Broke the gate", "Fell asleep"], why: "They turned him towards Makkah and he knelt down again." },
        { q: "What happened facing Yemen?", a: "The elephant rose and walked quickly", wrong: ["The elephant knelt", "The elephant ran away", "The elephant cried"], why: "They turned him towards Yemen, and he rose and walked quickly." },
        { tf: true, q: "The elephant would walk any way but toward Makkah.", why: "Toward Yemen, Ash-Sham and the east he walked; toward Makkah he knelt." }
      ]
    },
    {
      slug: "their-plot-went-astray",
      title: "Their plot went astray",
      line: "Allah turned their big plan into nothing at all.",
      facts: ["Kayd: plot", "Tadlil: going astray"],
      quote: q105(2),
      source: ik(2, "Allah destroyed them, defeated them, thwarted their plans and made their efforts in vain.", "thwarted their plans, made their efforts in vain"),
      difficulty: 2,
      questions: [
        { q: "What does 105:2 ask?", a: "Did He not make their plot go astray?", wrong: ["Did they not build a church?", "Did they not win?", "Did they not find water?"], why: "Did He not make their plot go astray?" },
        { q: "What happened to their efforts, per Ibn Kathir?", a: "Allah made them in vain", wrong: ["They succeeded", "They were delayed", "They were doubled"], why: "Allah thwarted their plans and made their efforts in vain." },
        { tf: false, q: "Abrahah managed to damage the Ka'bah a little.", why: "Allah thwarted their plans and made their efforts in vain." }
      ]
    },
    {
      slug: "stopped-like-the-elephant",
      title: "Stopped like the elephant",
      line: "Years later at Hudaybiyyah, a camel knelt the same way.",
      facts: ["Al-Qaswa: his she-camel", "Hudaybiyyah: a peace treaty"],
      quote: q105(2),
      source: hadith("bukhari", "2731", "Al-Miswar and Marwan", "Sahih", "At Hudaybiyyah his she-camel sat down; he said she was not stubborn but was stopped by Him Who stopped the elephant.", "she was stopped by Him Who stopped the elephant"),
      difficulty: 3,
      questions: [
        { q: "Why did Al-Qaswa sit down, per the hadith?", a: "Allah stopped her, as He stopped the elephant", wrong: ["She was tired", "She was hungry", "She was stubborn"], why: "She was stopped by Him Who stopped the elephant." },
        { q: "Where did the she-camel sit down?", a: "Near Hudaybiyyah", wrong: ["In Madinah", "At Badr", "In Ta'if"], why: "He set out at the time of Al-Hudaibiya, and the she-camel sat down." },
        { tf: false, q: "The people said Al-Qaswa was simply sleepy.", why: "They said Al-Qaswa has become stubborn." }
      ]
    }
  ]
};

/** Ayahs 3 to 5: birds in flocks, stones of Sijjil, and the army left like eaten straw. */
const FIL_TWO: DeepUnit = {
  key: "fil2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-105",
  name: "Al-Fil, ayahs 3-5",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Fil",
  lessons: [
    {
      slug: "birds-in-flocks",
      title: "Birds in flocks",
      line: "Allah sent birds in flocks, one group after another.",
      facts: ["Tayr: birds", "Ababil: in flocks"],
      quote: q105(3),
      source: ik(3, "Ibn Abbas and Ad-Dahhak said Ababil means some of them following after others.", "Ababil means some of them following after others"),
      difficulty: 1,
      questions: [
        { q: "What did Allah send in 105:3?", a: "Birds in flocks", wrong: ["A great flood", "A strong army", "A loud storm"], why: "And He sent against them birds, in flocks." },
        { q: "What does Ababil mean, per Ibn Abbas?", a: "Some following after others", wrong: ["Very large", "Very quiet", "Very slow"], why: "Ababil means some of them following after others." },
        { tf: true, q: "Al-Hasan and Qatadah said Ababil means many.", why: "Ababil means many." }
      ]
    },
    {
      slug: "three-small-stones",
      title: "Three small stones",
      line: "Each bird carried three tiny stones, yet an army fell.",
      facts: ["One in each claw", "One in the beak"],
      quote: q105(4),
      source: ik(4, "Each bird carried three stones the size of chickpeas and lentils, one in each claw and one in its beak.", "Each bird carried three stones the size of chickpeas and lentils"),
      difficulty: 2,
      questions: [
        { q: "How many stones did each bird carry?", a: "Three", wrong: ["One", "Ten", "Seven"], why: "Each bird carried three stones." },
        { q: "How big were the stones?", a: "Like chickpeas and lentils", wrong: ["Like big rocks", "Like melons", "Like bricks"], why: "Stones the size of chickpeas and lentils." },
        { tf: true, q: "Small things can win when Allah wills.", why: "Tiny stones from birds broke a great army by Allah's will." }
      ]
    },
    {
      slug: "stones-of-sijjil",
      title: "Stones of Sijjil",
      line: "Sijjil stones were hard baked clay, sent by Allah.",
      facts: ["Sijjil: hard baked clay", "Sanj and Jil: stone and clay"],
      quote: q105(4),
      source: ik(4, "Yunus An-Nahwi and Abu Ubaydah said Sijjil means something hard and solid, of stone and clay.", "it means something hard and solid"),
      difficulty: 2,
      questions: [
        { q: "What does Sijjil mean, per the Arabs?", a: "Something hard and solid", wrong: ["Something soft", "Something sweet", "Something wet"], why: "According to the Arabs, it means something hard and solid." },
        { q: "What two things make up Sijjil?", a: "Stone and clay", wrong: ["Iron and wood", "Sand and water", "Gold and silver"], why: "The rocks are of these two types: stone and clay." },
        { tf: false, q: "The birds threw soft mud at the army.", why: "Sijjil means something hard and solid." }
      ]
    },
    {
      slug: "like-eaten-straw",
      title: "Like eaten straw",
      line: "The proud army ended up like straw that cattle had chewed.",
      facts: ["Asf: straw, crop leaves", "Makul: eaten up"],
      quote: q105(5),
      source: ik(5, "Said bin Jubayr said Al-Asf means straw, and Al-Makul is fodder cut for animals.", "This means straw, which the common people call Habbur"),
      difficulty: 2,
      questions: [
        { q: "What did Allah make them like, per 105:5?", a: "Eaten straw", wrong: ["Tall mountains", "Strong walls", "Shining stars"], why: "And He made them like Asf, Makul." },
        { q: "What is Al-Asf, per Said bin Jubayr?", a: "Straw", wrong: ["Stone", "Sand", "Smoke"], why: "This means straw, which the common people call Habbur." },
        { tf: true, q: "Al-Hasan Al-Basri said the same as Said.", why: "Al-Hasan Al-Basri said the same thing." }
      ]
    },
    {
      slug: "they-gained-no-good",
      title: "They gained no good",
      line: "The army went home with nothing; their anger got them nowhere.",
      facts: ["Plans undone", "Abrahah died in Yemen"],
      quote: q105(5),
      source: ik(5, "Allah repelled them in their plan and their anger; they did not achieve any good.", "They did not achieve any good"),
      difficulty: 3,
      questions: [
        { q: "What did the army achieve, per Ibn Kathir?", a: "No good at all", wrong: ["Half their plan", "A small win", "Great riches"], why: "They did not achieve any good." },
        { q: "Where did Abrahah die?", a: "Back in his land of San'a'", wrong: ["Inside Makkah", "On a ship", "In Persia"], why: "He reached his land of San'a', informed the people, and then he died." },
        { tf: false, q: "Abrahah's son later conquered Makkah.", why: "Allah returned the kingdom of Yemen to its Arabs; Makkah stayed safe." }
      ]
    },
    {
      slug: "the-year-of-his-birth",
      title: "The year of his birth",
      line: "The Elephant came in the very year the Prophet ﷺ was born.",
      facts: ["As-Sa'di explains", "A sign before his mission"],
      quote: q105(5),
      source: saadi(105, 5, "As-Sa'di says the Elephant came in the year the Prophet ﷺ was born, one of the signs that came before his message.", "وكانت تلك السنة التي ولد فيها رسول الله"),
      difficulty: 2,
      questions: [
        { q: "What happened in the Year of the Elephant?", a: "The Prophet ﷺ was born", wrong: ["Makkah was conquered", "The Quran was finished", "The Hijrah"], why: "As-Sa'di: it was the year the Prophet ﷺ was born." },
        { q: "As-Sa'di calls the event a sign of...?", a: "His coming message", wrong: ["A new king", "A long drought", "A war with Rome"], why: "One of the signs before his message, says as-Sa'di." },
        { tf: true, q: "Al-Fil shows Allah's power and the truth of His Messenger ﷺ.", why: "As-Sa'di on 105:1 lists both." }
      ]
    },
    {
      slug: "allah-defends-his-house",
      title: "Allah defends His House",
      line: "Allah protected the Ka'bah to honor it, not the Quraysh.",
      facts: ["The Ancient House", "Honored by Allah"],
      quote: q105(3),
      source: ik(3, "Allah helped not for any status of the Quraysh, but to defend the Ancient House, which He would honor.", "in order to defend the Ancient House"),
      difficulty: 3,
      questions: [
        { q: "Why did Allah protect Makkah, per Ibn Kathir?", a: "To defend the Ancient House", wrong: ["For Quraysh pride", "For the trade routes", "For the wells"], why: "We are only helping you in order to defend the Ancient House." },
        { q: "What is the Ancient House?", a: "The Ka'bah", wrong: ["A palace in Yemen", "A church in San'a'", "A fort in Ta'if"], why: "To defend the Ancient House (the Ka'bah)." },
        { tf: true, q: "Allah honors and magnifies the Ka'bah.", why: "The Ancient House, which We will honor, magnify, and venerate." }
      ]
    },
    {
      slug: "held-back-from-makkah",
      title: "Held back from Makkah",
      line: "At the Conquest of Makkah, the Prophet ﷺ recalled the Elephant.",
      facts: ["Makkah is a sanctuary", "No cutting its trees"],
      quote: q105(1),
      source: hadith("muslim", "1355", "Abu Hurayrah", "Sahih", "On the day Makkah was opened he said Allah held back the elephants from Makkah, and Makkah is a sanctuary.", "Verily Allah held back the elephants from Mecca"),
      difficulty: 3,
      questions: [
        { q: "What did Allah hold back from Makkah?", a: "The elephants", wrong: ["The rain", "The traders", "The birds"], why: "Verily Allah held back the elephants from Mecca." },
        { q: "What may not be done in Makkah, per the hadith?", a: "Cutting its trees", wrong: ["Praying", "Giving charity", "Reading Quran"], why: "Its trees are not to be lopped." },
        { tf: true, q: "Makkah is a sanctuary, a protected place.", why: "It was not violable to anyone before me, and it shall not be violable to anyone after me." }
      ]
    }
  ]
};

export const FIL_UNITS: readonly DeepUnit[] = [FIL_ONE, FIL_TWO];
