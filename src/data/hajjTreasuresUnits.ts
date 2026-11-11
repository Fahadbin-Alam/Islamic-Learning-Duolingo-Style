import { hadith, type DeepUnit } from "./deepKit";

// One more Hajj unit: treasures of the Haram, all from Jami at-Tirmidhi. The Black Stone that came down from
// Paradise and will speak for those who touched it, every step of tawaf, good words while you walk, Zamzam carried
// home, and the man from the mountains of Tayy who asked: is there Hajj for me? Every card is one sahih hadith with
// its number, narrator and grade, and its exact English words to highlight. Fiqh details the schools differ on are
// left out, and none of these hadith is taught anywhere else in the app.

const TREASURES: DeepUnit = {
  key: "hajj-treasures-of-the-haram",
  topicId: "hajj",
  branchId: "hajj-treasures-of-the-haram",
  branch: { title: "Treasures of the Haram", description: "The Black Stone from Paradise, every step of tawaf, good words while you walk, Zamzam to take home, and a long ride to reach Hajj." },
  name: "treasures of the Haram",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "a-stone-from-paradise",
      title: "A stone from Paradise",
      line: "The Black Stone came down from Paradise, whiter than milk.",
      facts: ["Told by Ibn Abbas", "The Black Stone came down from Paradise", "The sins of people made it black"],
      source: hadith("tirmidhi", "877", "Ibn Abbas", "Sahih (Al-Albani)", "Ibn Abbas said: the Messenger of Allah ﷺ said: the Black Stone came down from Paradise, and it was whiter than milk. Then the sins of the children of Adam made it black.", "The Black Stone descended from the Paradise, and it was more white than milk, then it was blackened by the sins of the children of Adam"),
      difficulty: 1,
      questions: [
        { q: "Where did the Black Stone come from?", a: "From Paradise", wrong: ["From a mountain", "From the sea", "From a far land"], why: "The Black Stone descended from Paradise, the Messenger of Allah ﷺ said." },
        { q: "What color was the Black Stone at first?", a: "Whiter than milk", wrong: ["Red as fire", "Green like grass", "Blue like the sky"], why: "Then the sins of the children of Adam made it black, he ﷺ said." },
        { q: "The sins of people turned the Black Stone black.", tf: true, why: "Then it was blackened by the sins of the children of Adam, he ﷺ said." }
      ]
    },
    {
      slug: "the-stone-will-speak",
      title: "The Stone will speak",
      line: "The Black Stone will speak up for those who touched it.",
      facts: ["Told by Ibn Abbas", "Allah will raise it on the Day of Resurrection", "With two eyes to see and a tongue to speak"],
      source: hadith("tirmidhi", "961", "Ibn Abbas", "Sahih (Al-Albani)", "Ibn Abbas said: the Messenger of Allah ﷺ said about the Black Stone: by Allah, Allah will raise it on the Day of Resurrection with two eyes to see with and a tongue to speak with, and it will testify for whoever touched it in truth.", "Allah will raise it on the Day of Resurrection with two eyes by which it sees and a tongue that it speaks with, testifying to whoever touched it in truth"),
      difficulty: 2,
      questions: [
        { q: "What will the Black Stone have on the Day of Resurrection?", a: "Two eyes and a tongue", wrong: ["Two wings and a crown", "Two hands and a lamp", "A door and a key"], why: "With two eyes by which it sees and a tongue that it speaks with, he ﷺ said." },
        { q: "For whom will the Black Stone speak?", a: "Whoever touched it in truth", wrong: ["Only for kings", "Only for the rich", "Whoever only looked at it"], why: "He ﷺ swore by Allah that it will testify for whoever touched it in truth." },
        { q: "The Black Stone will be silent on the Day of Resurrection.", tf: false, why: "No. On the Day of Resurrection it will speak with a tongue, he ﷺ said." }
      ]
    },
    {
      slug: "every-step-in-tawaf",
      title: "Every step in tawaf",
      line: "In tawaf, every step removes a sin and records a good deed.",
      facts: ["Told by Ibn Umar", "Ubayd ibn Umayr asked why he pressed to the two corners", "Touching them wipes away sins"],
      source: hadith("tirmidhi", "959", "Ibn Umar", "Sahih (Al-Albani)", "Ubayd ibn Umayr saw Ibn Umar pressing to reach the two corners of the Ka'bah more than any other Companion did, and asked him why. Ibn Umar said: I heard the Messenger of Allah ﷺ say: touching them wipes away sins. And I heard him say: whoever goes around this House seven times and keeps count, it is as if he freed a slave. And I heard him say: no foot is put down and no foot is raised but Allah removes a sin from him and writes a good deed for him.", "One foot is not put down, nor another raised except that Allah removes a sin from him and records a good merit for him"),
      difficulty: 2,
      questions: [
        { q: "Why did Ibn Umar try so hard to touch the two corners?", a: "Touching them wipes away sins", wrong: ["To rest his tired hands", "To find a lost ring", "To clean the stones"], why: "Ibn Umar had heard him ﷺ say that touching them atones for sins." },
        { q: "Seven rounds of tawaf, counted with care, are like what?", a: "Like freeing a slave", wrong: ["Like fasting a day", "Like giving a gold coin", "Like a long journey"], why: "Going around this House seven times, keeping count, is as if he freed a slave." },
        { q: "Each step in tawaf removes a sin and records a good deed.", tf: true, why: "Allah removes a sin with each foot put down or raised, he ﷺ said." }
      ]
    },
    {
      slug: "only-good-words-in-tawaf",
      title: "Only good words in tawaf",
      line: "Tawaf is like prayer, but you may talk, so speak only good.",
      facts: ["Told by Ibn Abbas", "Tawaf is like salah", "Whoever talks in it should say only good"],
      source: hadith("tirmidhi", "960", "Ibn Abbas", "Sahih (Al-Albani)", "Ibn Abbas said: the Prophet ﷺ said: tawaf around the House is like prayer, except that you talk during it. So whoever talks in it, let him say only what is good.", "Tawaf around the House is similar to Salat except that you talk during it. So whoever talks in it, then let him not say but good"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ say tawaf around the House is like?", a: "Prayer", wrong: ["A race", "A market", "A game"], why: "Tawaf is like salah, except that you may talk during it, he ﷺ said." },
        { q: "If you talk during tawaf, what should you say?", a: "Only good words", wrong: ["Jokes and stories", "News of the market", "Whatever comes to mind"], why: "So whoever talks in it, let him say only what is good, he ﷺ said." },
        { q: "Talking is never allowed in tawaf.", tf: false, why: "No. You may talk in tawaf, but say only what is good, he ﷺ said." }
      ]
    },
    {
      slug: "zamzam-to-take-home",
      title: "Zamzam to take home",
      line: "Aishah took Zamzam water with her, as the Prophet ﷺ did.",
      facts: ["Told by Aishah", "She carried some Zamzam water", "She said he ﷺ used to carry it"],
      source: hadith("tirmidhi", "963", "Aishah", "Sahih (Al-Albani)", "Urwah said that Aishah would carry some Zamzam water with her, and she would say: the Messenger of Allah ﷺ used to carry it.", "Indeed the Messenger of Allah would carry it"),
      difficulty: 1,
      questions: [
        { q: "What did Aishah carry with her?", a: "Zamzam water", wrong: ["Sand from the desert", "Stones from the mountain", "A cage of birds"], why: "Aishah would carry some Zamzam water with her, Urwah ibn az-Zubayr said." },
        { q: "Why did Aishah carry Zamzam water?", a: "He ﷺ used to carry it", wrong: ["To sell it at a market", "To wash her clothes", "To water her garden"], why: "Indeed the Messenger of Allah ﷺ would carry it, Aishah would say." },
        { q: "Carrying Zamzam water home follows his ﷺ way.", tf: true, why: "Aishah carried it, and said the Messenger of Allah ﷺ used to carry it." }
      ]
    },
    {
      slug: "is-there-hajj-for-me",
      title: "Is there Hajj for me?",
      line: "Urwah rode from far mountains and asked: is there Hajj for me?",
      facts: ["Told by Urwah ibn Mudarris", "He came from the two mountains of Tayy", "He reached him ﷺ at Muzdalifah"],
      source: hadith("tirmidhi", "891", "Urwah ibn Mudarris", "Sahih (Al-Albani)", "Urwah ibn Mudarris at-Ta'i said: I came to the Messenger of Allah ﷺ at Muzdalifah as he went out to pray. I said: O Messenger of Allah, I have come from the two mountains of Tayy. I wore out my camel and tired myself, and by Allah, I did not pass a sand hill without stopping on it. Is there Hajj for me? He ﷺ said: whoever attends this prayer of ours and stays with us until we leave, and has stood at Arafat before that by night or by day, has completed his Hajj.", "while he has stood during the night or the day before that at Arafat, then he has completed his Hajj"),
      difficulty: 2,
      questions: [
        { q: "Where did Urwah reach the Prophet ﷺ?", a: "At Muzdalifah", wrong: ["At Mina", "In Madinah", "At Mount Uhud"], why: "Urwah came to him at Muzdalifah as he ﷺ went out to pray." },
        { q: "What did Urwah ask the Prophet ﷺ?", a: "Is there Hajj for me?", wrong: ["May I go home now?", "Where is the Ka'bah?", "May I sell my camel?"], why: "Urwah had come all the way from the two mountains of Tayy." },
        { q: "Urwah had tired out his camel to reach Hajj.", tf: true, why: "Urwah said he wore out his camel and stopped on every sand hill on the way." }
      ]
    }
  ]
};

export const HAJJ_TREASURES_UNITS: DeepUnit[] = [TREASURES];
