import { hadith, type DeepUnit } from "./deepKit";

// One more Manners unit: salam and visitors, from Sunan Abi Dawud, Sahih Muslim and Sunan Ibn Majah. The salam he ﷺ
// taught for asking to come in, standing to one side of a door, being sent for, a sign to come in, the words he ﷺ
// said not to greet with, and honoring a respected visitor. Every card is one sahih or hasan hadith with its number,
// narrator and grade, and its exact English words to highlight. None of these hadith is taught anywhere else in the
// app.

const COMING_IN: DeepUnit = {
  key: "manners-salam-and-visitors",
  topicId: "manners",
  branchId: "manners-salam-and-visitors",
  branch: { title: "Salam and visitors", description: "Salam when asking to come in, standing to one side, being sent for, a sign to enter, the right words of salam, and honoring a visitor." },
  name: "salam and visitors",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "salam-then-may-i-come-in",
      title: "Salam, then may I come in?",
      line: "Ask to come in like this: As-salamu alaykum, may I come in?",
      facts: ["Told by a man of Banu Amir", "He had only asked: may I come in?", "He ﷺ let him in after his salam"],
      source: hadith("abudawud", "5177", "A man of Banu Amir", "Sahih (Al-Albani)", "Rib'i ibn Hirash said: a man of Banu Amir told him that he asked the Prophet ﷺ for permission while he was in the house, saying: may I come in? He ﷺ said to his servant: go out to him and teach him how to ask permission; tell him to say: as-salamu alaykum, may I come in? The man heard it and said: as-salamu alaykum, may I come in? So he ﷺ let him in, and he entered.", "teach him how to ask permission to enter the house"),
      difficulty: 1,
      questions: [
        { q: "What had the man said at the door?", a: "May I come in?", wrong: ["Who is inside?", "Is anyone awake?", "Is this your house?"], why: "He asked for permission saying only: may I enter, the man of Banu Amir said." },
        { q: "Which words did he ﷺ want the man to add?", a: "As-salamu alaykum", wrong: ["Bismillah", "Alhamdulillah", "Subhan Allah"], why: "He ﷺ told his servant to teach him to say: Peace be upon you, may I enter?" },
        { q: "He ﷺ let the man in once he said salam.", tf: true, why: "When the man said the salam and asked, he ﷺ permitted him, and he entered." }
      ]
    },
    {
      slug: "stand-to-one-side",
      title: "Stand to one side",
      line: "At a door he ﷺ stood to one side, not in front.",
      facts: ["Told by Abdullah ibn Busr", "He ﷺ said salam twice at the door", "Doors had no curtains back then"],
      source: hadith("abudawud", "5186", "Abdullah ibn Busr", "Sahih (Al-Albani)", "Abdullah ibn Busr said: when the Messenger of Allah ﷺ came to someone's door, he did not stand facing it, but stood by its right or left side and said: as-salamu alaykum, as-salamu alaykum. That was because doors had no curtains at that time.", "he did not face it squarely, but faced the right or left corner"),
      difficulty: 1,
      questions: [
        { q: "Where did he ﷺ stand at someone's door?", a: "By its right or left side", wrong: ["Right in front of it", "Far across the road", "Behind a tall tree"], why: "He did not face it squarely, but faced the right or left corner, Abdullah ibn Busr said." },
        { q: "Why did he ﷺ stand to one side?", a: "Doors had no curtains then", wrong: ["The sun was too hot", "The road was too narrow", "The door was too low"], why: "There were no curtains on the doors of houses at that time." },
        { q: "He ﷺ said salam at the door of the people he visited.", tf: true, why: "He ﷺ would say peace be upon you twice, Abdullah ibn Busr said." }
      ]
    },
    {
      slug: "when-you-are-sent-for",
      title: "When you are sent for",
      line: "Being sent for counts as permission to come in.",
      facts: ["Told by Abu Hurairah", "A friend sends someone to call you", "Still say salam as you come in"],
      source: hadith("abudawud", "5189", "Abu Hurairah", "Sahih (Al-Albani)", "Abu Hurairah said: the Prophet ﷺ said: when a man sends his messenger to another man, that is his permission to come in.", "sent to another indicates his permission to enter"),
      difficulty: 1,
      questions: [
        { q: "A friend sends someone to call you over. What is that?", a: "His permission to come in", wrong: ["A reason to stay away", "A sign that you are late", "A test of your speed"], why: "A man's messenger sent to another indicates his permission to enter, he ﷺ said." },
        { q: "Who brings you the permission, in his ﷺ words?", a: "The messenger he sends", wrong: ["The neighbor next door", "A trader passing by", "A child at play"], why: "The messenger a man sends to another is his permission to enter, he ﷺ said." },
        { q: "Being sent for counts as permission to come in.", tf: true, why: "A man's messenger sent to another indicates his permission to enter, he ﷺ said." }
      ]
    },
    {
      slug: "a-sign-to-come-in",
      title: "A sign to come in",
      line: "He ﷺ gave Ibn Mas'ud a sign that he could come in.",
      facts: ["Told by Abdullah ibn Mas'ud", "A raised curtain meant: come in", "So did hearing his ﷺ quiet voice"],
      source: hadith("muslim", "2169a", "Abdullah ibn Mas'ud", "Sahih", "Ibn Mas'ud said: the Messenger of Allah ﷺ said to me: your permission to come in is that the curtain is raised, or that you hear my quiet voice, until I tell you not to.", "The sign that you have been permitted to come in is that the curtain is raised"),
      difficulty: 2,
      questions: [
        { q: "What was one sign that Ibn Mas'ud could come in?", a: "The curtain was raised", wrong: ["A bell was rung", "A lamp was lit", "A drum was beaten"], why: "Your sign to come in is that the curtain is raised, he ﷺ told Ibn Mas'ud." },
        { q: "What other sign could Ibn Mas'ud go by?", a: "Hearing his ﷺ quiet voice", wrong: ["Seeing a fire at night", "Smelling food cooking", "Hearing a camel call"], why: "Or that you hear me speaking quietly, until I forbid you, he ﷺ told Ibn Mas'ud." },
        { q: "He ﷺ gave Ibn Mas'ud a special sign to come in.", tf: true, why: "That the curtain is raised, or you hear me speak quietly, is your sign, he ﷺ said." }
      ]
    },
    {
      slug: "the-right-words-of-salam",
      title: "The right words of salam",
      line: "He ﷺ said: do not greet with alayka as-salam.",
      facts: ["Told by Abu Jurayy al-Hujaymi", "He had said: alayka as-salam, Messenger of Allah", "He ﷺ called that the greeting of the dead"],
      source: hadith("abudawud", "5209", "Abu Jurayy al-Hujaymi", "Sahih (Al-Albani)", "Abu Jurayy al-Hujaymi said: I came to the Prophet ﷺ and said: alayka as-salam, Messenger of Allah. He said: do not say alayka as-salam, for alayka as-salam is the greeting of the dead.", "Upon you be peace, Messenger of Allah! He said: Do not say: Upon you be peace"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ tell Abu Jurayy not to say?", a: "Alayka as-salam", wrong: ["As-salamu alaykum", "Bismillah", "Alhamdulillah"], why: "Do not say: Upon you be peace, alayka as-salam, he ﷺ told Abu Jurayy." },
        { q: "What did he ﷺ call the words alayka as-salam?", a: "The greeting of the dead", wrong: ["The greeting of kings", "The greeting of traders", "The greeting of travelers"], why: "Upon you be peace is the salutation to the dead, he ﷺ said." },
        { q: "He ﷺ told Abu Jurayy not to greet with alayka as-salam.", tf: true, why: "Do not say: Upon you be peace, for that is the greeting of the dead, he ﷺ said." }
      ]
    },
    {
      slug: "honor-a-respected-visitor",
      title: "Honor a respected visitor",
      line: "When a man respected by his people visits, honor him.",
      facts: ["Told by Abdullah ibn Umar", "He is someone his people look up to", "Every guest should be treated kindly"],
      source: hadith("ibnmajah", "3712", "Abdullah ibn Umar", "Hasan (Al-Albani)", "Ibn Umar said: the Messenger of Allah ﷺ said: when a man who is respected among his people comes to you, honor him.", "If there comes to you a man who is respected among his own people, then honor him"),
      difficulty: 1,
      questions: [
        { q: "A man his people respect comes to you. What should you do?", a: "Honor him", wrong: ["Turn him away", "Pass him by", "Keep him waiting"], why: "If there comes to you a man respected among his own people, then honor him, he ﷺ said." },
        { q: "Which visitor did he ﷺ tell us to honor?", a: "One respected among his people", wrong: ["Only one who brings gifts", "Only one who is rich", "Only one from our town"], why: "A man who is respected among his own people, then honor him, he ﷺ said." },
        { q: "He ﷺ told us to honor a man respected among his people.", tf: true, why: "If there comes to you a man who is respected among his own people, then honor him." }
      ]
    }
  ]
};

export const MANNERS_COMING_IN_UNITS: readonly DeepUnit[] = [COMING_IN];
