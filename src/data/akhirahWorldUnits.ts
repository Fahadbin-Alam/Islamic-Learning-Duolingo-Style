import { hadith, type DeepUnit } from "./deepKit";

// One more unit for the Day of Judgment topic: this world and the next, from the Book of Zuhd in Jami at-Tirmidhi.
// Every card is one sahih or hasan hadith (number, narrator and grade as sunnah.com gives them), with its exact
// English words to highlight, and none of them is taught anywhere else in the app.

const WORLD: DeepUnit = {
  key: "akhirah-this-world",
  topicId: "akhirah",
  branchId: "akhirah-this-world",
  branch: { title: "This world and the next", description: "Safe and fed is plenty, greed that harms faith, life that passes fast, the best of people, the tongue, and asking Allah." },
  name: "this world and the next",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "world-gathered",
      title: "As if you had the whole world",
      line: "Safe, healthy, with food for today: the world is yours.",
      facts: ["Told by Ubaidullah ibn Mihsan, a Companion", "Safety, health and food for the day"],
      source: hadith("tirmidhi", "2346", "Ubaidullah ibn Mihsan", "Hasan (Al-Albani)", "The Prophet ﷺ said: whoever among you wakes up safe in his home, healthy in his body, with his food for the day, it is as if the whole world has been gathered for him.", "secured in his dwelling, healthy in his body, having his food for the day"),
      difficulty: 1,
      questions: [
        { q: "Which three things make it as if you had the world?", a: "Safety, health and food for the day", wrong: ["Gold, silver and land", "Fame, power and praise", "A palace, horses and guards"], why: "Secured in his dwelling, healthy in his body, having his food for the day." },
        { q: "Waking up safe, healthy and fed is like what, he ﷺ said?", a: "Having the whole world", wrong: ["Having nothing at all", "Needing much more", "Being still poor"], why: "As if the world has been gathered for him, he ﷺ said." },
        { q: "Being safe and healthy today is a great blessing.", tf: true, why: "Waking safe, healthy and fed is as if the world were gathered for you." }
      ]
    },
    {
      slug: "two-wolves",
      title: "Like two wolves among sheep",
      line: "Greed for money and fame harms faith as wolves harm sheep.",
      facts: ["Told by Ka'b ibn Malik", "Two wolves loose among sheep"],
      source: hadith("tirmidhi", "2376", "Ka'b ibn Malik", "Sahih (Al-Albani)", "The Prophet ﷺ said: two wolves let loose among sheep do no more harm to them than a man's greed for wealth and status does to his religion.", "Two wolves free among sheep are no more destructive to them"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ compare greed for wealth and honor to?", a: "Two wolves among sheep", wrong: ["A river in the desert", "A lamp at night", "A tree in winter"], why: "Two wolves free among sheep are no more destructive to them." },
        { q: "What does that greed harm, he ﷺ said?", a: "A person's religion", wrong: ["Only his clothes", "Only his sheep", "Nothing at all"], why: "A man's desire for wealth and honor is that harmful to his religion." },
        { q: "Chasing more money and fame can hurt your faith.", tf: true, why: "Two wolves loose among sheep do no more harm than that greed." }
      ]
    },
    {
      slug: "life-is-short",
      title: "Life passes quickly",
      line: "Seeing a hut being fixed, he ﷺ said life is even shorter.",
      facts: ["Told by Abdullah ibn Amr", "The hut had grown weak"],
      source: hadith("tirmidhi", "2335", "Abdullah ibn Amr", "Sahih (Al-Albani)", "Abdullah ibn Amr said: the Prophet ﷺ passed by while we were fixing a hut of ours. He asked: what is this? We said it had grown weak, so we were fixing it. He said: I see the matter as quicker than that.", "passed by us while we were repairing a hut of ours"),
      difficulty: 2,
      questions: [
        { q: "What was being repaired when he ﷺ passed by?", a: "A hut", wrong: ["A masjid", "A well", "A boat"], why: "Their hut had grown weak, so they were repairing it." },
        { q: "What did he ﷺ say passes faster than a hut grows weak?", a: "Life", wrong: ["A camel", "A cloud", "A river"], why: "I do not think but that the matter of life is more fleeting than that." },
        { q: "The Prophet ﷺ reminded them that life is short.", tf: true, why: "He said the matter of life is more fleeting than a weak hut." }
      ]
    },
    {
      slug: "best-of-people",
      title: "The best of people",
      line: "The best person lives long and does good deeds.",
      facts: ["Told by Abdullah ibn Busr", "A Bedouin asked the question"],
      source: hadith("tirmidhi", "2329", "Abdullah ibn Busr", "Sahih (Al-Albani)", "A Bedouin asked: Messenger of Allah, who is the best of people? He ﷺ said: the one whose life is long and whose deeds are good.", "He whose life is long and his deeds are good"),
      difficulty: 1,
      questions: [
        { q: "Who asked him ﷺ about the best of people?", a: "A Bedouin", wrong: ["A poet", "A rich trader", "A shepherd"], why: "Abdullah ibn Busr narrated that a Bedouin said: O Messenger of Allah." },
        { q: "Who is the best of people, he ﷺ said?", a: "One whose life is long and deeds are good", wrong: ["One with the most gold", "One with the most land", "One who is most famous"], why: "Abdullah ibn Busr heard him ﷺ give the Bedouin that answer." },
        { q: "A long life filled with good deeds is the best.", tf: true, why: "He ﷺ said the best is he whose life is long and his deeds are good." }
      ]
    },
    {
      slug: "the-tongue",
      title: "The body speaks to the tongue",
      line: "Each morning the body asks the tongue to fear Allah.",
      facts: ["Told by Abu Sa'id al-Khudri", "If the tongue is straight, so is the body"],
      source: hadith("tirmidhi", "2407", "Abu Sa'id al-Khudri", "Hasan (Al-Albani)", "The Prophet ﷺ said: when the son of Adam wakes up, all his body parts humble themselves before the tongue and say: fear Allah for our sake, for we are only part of you; if you are straight, we are straight, and if you are crooked, we are crooked.", "If you are straight we are straight and if you are crooked we are crooked"),
      difficulty: 2,
      questions: [
        { q: "What do the body parts ask the tongue each morning?", a: "To fear Allah for them", wrong: ["To speak louder", "To eat more sweets", "To sleep late"], why: "Fear Allah regarding us, we are only part of you." },
        { q: "If the tongue is straight, what happens to the body?", a: "The body is straight too", wrong: ["The body becomes crooked", "The body gets tired", "Nothing changes at all"], why: "If you are straight we are straight, the body parts say." },
        { q: "What we say can lead the whole body to good or bad.", tf: true, why: "If you are crooked we are crooked, the body parts tell the tongue." }
      ]
    },
    {
      slug: "ask-allah",
      title: "Bring your need to Allah",
      line: "Bring your need to Allah, and He will send provision.",
      facts: ["Told by Abdullah ibn Mas'ud", "Sooner or later, Allah provides"],
      source: hadith("tirmidhi", "2326", "Abdullah ibn Mas'ud", "Sahih (Al-Albani)", "The Prophet ﷺ said: whoever is struck by need and takes it to people, his need is not ended; whoever takes it to Allah, Allah will send him provision, sooner or later.", "And whoever suffers from destitution and he beseeches Allah for it, Allah will send provisions to him, sooner or later"),
      difficulty: 2,
      questions: [
        { q: "To whom should you bring your need, he ﷺ said?", a: "To Allah, not to people", wrong: ["To people, not to Allah", "To no one at all", "To the richest man"], why: "Whoever beseeches the people for it, his destitution shall not end." },
        { q: "When will Allah send provision to the one who asks Him?", a: "Sooner or later", wrong: ["Never", "Only in old age", "Only once he stops asking"], why: "Whoever beseeches Allah for it, Allah will send provisions to him." },
        { q: "Taking your need only to people always ends it.", tf: false, why: "No. His destitution shall not end, he ﷺ said." }
      ]
    }
  ]
};

export const AKHIRAH_WORLD_UNITS: DeepUnit[] = [WORLD];
