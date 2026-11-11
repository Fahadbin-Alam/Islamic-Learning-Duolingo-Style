import { hadith, type DeepUnit } from "./deepKit";

// One more Manners unit: getting along with people, from Jami at-Tirmidhi and Sunan Ibn Majah. His ﷺ gentle jokes
// that were always true, the best companion and neighbor, patience with people, and Shaytan's plan to divide. Every
// card is one sahih or hasan hadith with its number, narrator and grade, and its exact English words to highlight,
// and none of them is taught anywhere else in the app.

const PEOPLE: DeepUnit = {
  key: "manners-getting-along",
  topicId: "manners",
  branchId: "manners-getting-along",
  branch: { title: "Getting along with people", description: "Jokes that are always true, a she-camel's child, two ears, the best companion and neighbor, patience with people, and Shaytan's plan to divide." },
  name: "getting along with people",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "true-jokes",
      title: "Jokes that are true",
      line: "He ﷺ joked with his Companions, but said only what is true.",
      facts: ["Told by Abu Hurairah", "A good joke has no lie in it"],
      source: hadith("tirmidhi", "1990", "Abu Hurairah", "Sahih (Al-Albani)", "Abu Hurairah said: they said, O Messenger of Allah, you joke with us! He ﷺ said: I say nothing but what is true.", "Indeed I do not say except what is true"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ say about his jokes?", a: "He says only what is true", wrong: ["He jokes only on Eid", "He jokes only with children", "He never jokes at all"], why: "Indeed I do not say except what is true." },
        { q: "Who told the hadith about his jokes ﷺ?", a: "Abu Hurairah", wrong: ["Umar", "Aishah", "Salman al-Farsi"], why: "Abu Hurairah heard the Companions say: you joke with us." },
        { q: "A Muslim may tell a lie to make people laugh.", tf: false, why: "No. Even to make people laugh, he ﷺ said only what is true." }
      ]
    },
    {
      slug: "she-camels-child",
      title: "A she-camel's child",
      line: "He ﷺ joked: every camel is the child of a she-camel.",
      facts: ["Told by Anas ibn Malik", "A man asked him ﷺ for a mount"],
      source: hadith("tirmidhi", "1991", "Anas ibn Malik", "Sahih (Al-Albani)", "Anas said: a man asked the Prophet ﷺ for a camel to ride. He said: I will give you a she-camel's child to ride. The man said: what can I do with a she-camel's child? He ﷺ said: are camels born of anything but she-camels?", "Are camels borne from other than she-camels"),
      difficulty: 1,
      questions: [
        { q: "What did the man ask him ﷺ for?", a: "A camel to ride", wrong: ["Some dates", "A new sword", "A place to sleep"], why: "He ﷺ said: I will let you ride on a she-camel's child." },
        { q: "Why did the man worry about a she-camel's child?", a: "He pictured a baby camel", wrong: ["He wanted a horse", "He disliked camels", "He had no saddle"], why: "He asked what a she-camel's child could ever do." },
        { q: "Every grown camel is the child of a she-camel.", tf: true, why: "Are camels borne from other than she-camels, he ﷺ asked." }
      ]
    },
    {
      slug: "two-ears",
      title: "O you with two ears!",
      line: "He ﷺ playfully called Anas: O you with two ears!",
      facts: ["Told by Anas ibn Malik", "He only meant it as a joke"],
      source: hadith("tirmidhi", "1992", "Anas ibn Malik", "Sahih (Al-Albani)", "Anas said that the Prophet ﷺ called him: O you with two ears! One of the narrators, Abu Usamah, explained that he only meant it as a joke.", "He only meant it as a joke"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ playfully call Anas?", a: "O you with two ears", wrong: ["O you with two eyes", "O little lion", "O fast runner"], why: "Anas heard him ﷺ say: O possessor of two ears." },
        { q: "Why did he ﷺ call Anas that?", a: "As a kind joke", wrong: ["To scold him", "To test his hearing", "To give him a new name"], why: "Abu Usamah said: he only meant it as a joke." },
        { q: "His joke was true, since Anas really has two ears.", tf: true, why: "He only meant it as a joke, and he ﷺ never said what is untrue." }
      ]
    },
    {
      slug: "best-companion",
      title: "The best companion",
      line: "Best with Allah: whoever is best to his companion.",
      facts: ["Told by Abdullah ibn Amr", "The same for neighbors"],
      source: hadith("tirmidhi", "1944", "Abdullah ibn Amr", "Sahih (Al-Albani)", "The Prophet ﷺ said: the best companion in Allah's sight is the one who is best to his companion, and the best neighbor in Allah's sight is the one who is best to his neighbor.", "The companion who is the best to Allah is the one who is best to his companion"),
      difficulty: 1,
      questions: [
        { q: "Who is the best companion in Allah's sight?", a: "The one best to his companion", wrong: ["The one with most friends", "The richest friend", "The one who talks most"], why: "And the best neighbor is the one best to his neighbor." },
        { q: "Who is the best neighbor in Allah's sight?", a: "The one best to his neighbor", wrong: ["The one with the biggest house", "The one who lives there longest", "The one who stays quiet"], why: "Abdullah ibn Amr heard him ﷺ say it of companions and neighbors." },
        { q: "Being good to your neighbor raises you in Allah's sight.", tf: true, why: "The neighbor best to Allah is the one best to his neighbor." }
      ]
    },
    {
      slug: "patient-with-people",
      title: "Patient with people",
      line: "The believer who mixes with people and is patient earns more.",
      facts: ["Told by Abdullah ibn Umar", "Better than keeping away from people"],
      source: hadith("ibnmajah", "4032", "Abdullah ibn Umar", "Sahih (Al-Albani)", "The Prophet ﷺ said: the believer who mixes with people and bears their annoyance with patience has a greater reward than the believer who does not mix with people and does not bear their annoyance.", "The believer who mixes with people and bears their annoyance with patience will have a greater reward"),
      difficulty: 2,
      questions: [
        { q: "Which believer has the greater reward?", a: "One who mixes and is patient", wrong: ["One who stays away from all", "One who argues with people", "One who only stays at home"], why: "He bears their annoyance with patience, he ﷺ said." },
        { q: "What does that believer bear with patience?", a: "The annoyance of people", wrong: ["Hunger and thirst", "Heat and cold", "Long journeys"], why: "Better than the one who does not mix and does not put up with it." },
        { q: "The patient believer who mixes with people has the greater reward.", tf: true, why: "Greater than the believer who keeps away and does not bear their annoyance." }
      ]
    },
    {
      slug: "shaytan-divides",
      title: "Shaytan's plan to divide",
      line: "Shaytan works to spread hatred among those who pray.",
      facts: ["Told by Jabir ibn Abdullah", "He gave up on being worshipped by them"],
      source: hadith("tirmidhi", "1937", "Jabir ibn Abdullah", "Sahih (Al-Albani)", "The Prophet ﷺ said: Shaytan has given up hope that those who pray will worship him, but he works to stir up hatred among them.", "he is engaged in sowing hatred among them"),
      difficulty: 2,
      questions: [
        { q: "What has Shaytan given up on, he ﷺ said?", a: "Being worshipped by those who pray", wrong: ["Whispering to anyone", "Coming near the mosque", "Talking to people"], why: "But he is engaged in sowing hatred among them." },
        { q: "What does Shaytan try to spread among those who pray?", a: "Hatred", wrong: ["Love", "Kindness", "Mercy"], why: "He is busy sowing hatred among them, he ﷺ said." },
        { q: "Shaytan wants Muslims to love one another.", tf: false, why: "No. Shaytan is busy sowing hatred among them." }
      ]
    }
  ]
};

export const MANNERS_PEOPLE_UNITS: DeepUnit[] = [PEOPLE];
