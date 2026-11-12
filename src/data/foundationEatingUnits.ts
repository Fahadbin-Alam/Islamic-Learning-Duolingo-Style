import { hadith, type DeepUnit } from "./deepKit";

// One more Foundations unit: Sunnahs of eating and drinking, from Sunan Abi Dawud, Sahih Muslim, Sunan Ibn Majah and
// Sahih al-Bukhari. Praising Allah after a meal, praising plain vinegar, dates in the home, the one who serves drinking
// last, olive oil from a blessed tree, and rinsing the mouth after milk. Every card is one sahih hadith with its number,
// narrator and grade, and its exact English words to highlight. Points the schools differ on (drinking while standing,
// drinking from a waterskin) are left out, and none of these hadith is taught anywhere else in the app.

const EATING: DeepUnit = {
  key: "found-eating-drinking",
  topicId: "foundation",
  branchId: "foundation-eating-drinking",
  branch: { title: "Sunnahs of eating and drinking", description: "Praise after a meal, plain vinegar, dates at home, the server drinks last, olive oil, and rinsing after milk." },
  name: "sunnahs of eating and drinking",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "made-easy-to-swallow",
      title: "Made easy to swallow",
      line: "After eating or drinking, he ﷺ praised Allah for it.",
      facts: ["Told by Abu Ayyub al-Ansari", "Allah gives food and drink", "He made it easy to swallow"],
      source: hadith("abudawud", "3851", "Abu Ayyub al-Ansari", "Sahih (Al-Albani)", "Abu Ayyub al-Ansari said: when the Messenger of Allah ﷺ ate or drank, he said: praise be to Allah, Who gave food and drink, made it easy to swallow, and made a way out for it.", "Praise be to Allah Who has given food and drink and made it easy to swallow, and provided an exit for it"),
      difficulty: 1,
      questions: [
        { q: "When did he ﷺ praise Allah with these words?", a: "After eating or drinking", wrong: ["When riding his camel", "On leaving the house", "After the adhan"], why: "When the Messenger of Allah ﷺ ate or drank, he praised Allah, Abu Ayyub said." },
        { q: "What did he ﷺ thank Allah for making easy?", a: "Swallowing the food", wrong: ["Cooking the food", "Buying the food", "Carrying the food"], why: "Praise be to Allah Who has given food and drink and made it easy to swallow." },
        { q: "He ﷺ thanked Allah for food and drink.", tf: true, why: "Praise be to Allah Who has given food and drink, he ﷺ said after eating." }
      ]
    },
    {
      slug: "a-good-condiment",
      title: "A good condiment",
      line: "Vinegar was all they had, and he ﷺ praised it.",
      facts: ["Told by Jabir ibn Abdullah", "Something to eat with bread", "Jabir loved vinegar after that"],
      source: hadith("muslim", "2052", "Jabir ibn Abdullah", "Sahih", "Jabir ibn Abdullah said: the Messenger of Allah ﷺ asked his family for something to eat with his bread. They said: we have nothing but vinegar. He asked for it, began to eat, and said: what a good condiment vinegar is. Jabir said: I have loved vinegar ever since.", "He asked for it, he began to eat it, and then said: Vinegar is a good condiment"),
      difficulty: 1,
      questions: [
        { q: "What did his family have to eat with the bread?", a: "Only vinegar", wrong: ["Only honey", "Only meat", "Only milk"], why: "We have nothing with us but vinegar, his family said, and he asked for it." },
        { q: "What did Jabir love ever since that day?", a: "Vinegar", wrong: ["Barley", "Milk", "Dates"], why: "I have always loved vinegar since I heard it from Allah's Apostle ﷺ, Jabir said." },
        { q: "He ﷺ ate the plain food at home and praised it.", tf: true, why: "He began to eat it, and then said: vinegar is a good condiment, Jabir said." }
      ]
    },
    {
      slug: "dates-at-home",
      title: "Dates at home",
      line: "A home with dates will not go hungry, he ﷺ said.",
      facts: ["Told by Aishah", "He ﷺ said it to Aishah", "He said it two or three times"],
      source: hadith("muslim", "2046", "Aishah", "Sahih", "Aishah said: the Messenger of Allah ﷺ said: a family that has dates will not be hungry. He also said: Aishah, a family with no dates in the house may go hungry, and he said it two or three times.", "A family which has dates will not be hungry"),
      difficulty: 1,
      questions: [
        { q: "Which food keeps a family from hunger, he ﷺ said?", a: "Dates", wrong: ["Grapes", "Melons", "Figs"], why: "A family which has dates will not be hungry, he ﷺ said." },
        { q: "To whom did he ﷺ say these words?", a: "Aishah", wrong: ["Umm Salamah", "Hafsah", "Sawdah"], why: "Aishah, a family which has no dates, its members will be hungry, he ﷺ said." },
        { q: "He ﷺ said a home with dates will not go hungry.", tf: true, why: "A family which has dates will not be hungry, he ﷺ told Aishah." }
      ]
    },
    {
      slug: "the-server-drinks-last",
      title: "The server drinks last",
      line: "The one who serves drinks to people drinks last.",
      facts: ["Told by Abdullah ibn Abi Awfa", "Serve the others first", "Then drink yourself"],
      source: hadith("abudawud", "3725", "Abdullah ibn Abi Awfa", "Sahih (Al-Albani)", "Abdullah ibn Abi Awfa said: the Prophet ﷺ said: the one who gives people their drink is the last of them to drink.", "The supplier of the people is the last"),
      difficulty: 1,
      questions: [
        { q: "Who should drink last, he ﷺ said?", a: "The one who serves", wrong: ["The youngest one", "The oldest one", "The newest guest"], why: "The supplier of the people is the last to drink, he ﷺ said." },
        { q: "When serving water to people, when do you drink?", a: "After everyone else", wrong: ["Before anyone else", "Halfway through", "Only the next day"], why: "The one who gives people their drink is the last of them to drink, he ﷺ said." },
        { q: "The one serving the drinks should drink first.", tf: false, why: "No. The one who serves the people drinks last, he ﷺ said." }
      ]
    },
    {
      slug: "oil-from-a-blessed-tree",
      title: "Oil from a blessed tree",
      line: "Olive oil comes from a blessed tree, he ﷺ said.",
      facts: ["Told by Umar ibn al-Khattab", "Eat it with your food", "Rub it on your skin"],
      source: hadith("ibnmajah", "3319", "Umar ibn al-Khattab", "Sahih (Al-Albani)", "Umar said: the Messenger of Allah ﷺ said: eat olive oil with your food and rub it on yourselves, for it comes from a blessed tree.", "anoint yourselves with it, for it comes from a blessed tree"),
      difficulty: 1,
      questions: [
        { q: "Why did he ﷺ praise olive oil?", a: "From a blessed tree", wrong: ["From a far land", "From a royal garden", "From a rare fruit"], why: "Anoint yourselves with it, for it comes from a blessed tree, he ﷺ said." },
        { q: "Besides eating it, what did he ﷺ say to do with it?", a: "Rub it on the body", wrong: ["Save it for guests", "Give it to animals", "Store it for a year"], why: "Season your food with olive oil and anoint yourselves with it, he ﷺ said." },
        { q: "He ﷺ told them to use olive oil in their food.", tf: true, why: "Season your food with olive oil, for it comes from a blessed tree, he ﷺ said." }
      ]
    },
    {
      slug: "rinse-after-milk",
      title: "Rinse after milk",
      line: "After drinking milk, he ﷺ rinsed his mouth.",
      facts: ["Told by Ibn Abbas", "He ﷺ said: it has fat", "A clean mouth after milk"],
      source: hadith("bukhari", "211", "Ibn Abbas", "Sahih", "Ibn Abbas said: the Messenger of Allah ﷺ drank milk, then rinsed his mouth and said: it has fat in it.", "drank milk, rinsed his mouth and said"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ do after drinking milk?", a: "Rinsed his mouth", wrong: ["Washed his feet", "Combed his hair", "Changed his clothes"], why: "He ﷺ drank milk, rinsed his mouth and said: it has fat, Ibn Abbas said." },
        { q: "Why did he ﷺ rinse his mouth after milk?", a: "Milk has fat in it", wrong: ["Milk is too sweet", "Milk is too cold", "Milk is too sour"], why: "He drank milk, rinsed his mouth and said: it has fat, Ibn Abbas said." },
        { q: "Rinsing the mouth after milk follows his ﷺ way.", tf: true, why: "Allah's Messenger ﷺ drank milk, rinsed his mouth and said: it has fat." }
      ]
    }
  ]
};

export const FOUNDATION_EATING_UNITS: readonly DeepUnit[] = [EATING];
