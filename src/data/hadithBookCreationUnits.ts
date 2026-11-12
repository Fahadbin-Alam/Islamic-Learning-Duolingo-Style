import { hadith, type DeepUnit } from "./deepKit";

// One more book for the Bukhari and Muslim topic: al-Bukhari's Book of the Beginning of Creation. One long talk from
// the start of creation to Paradise and the Fire, a du'a that the Holy Spirit support Hassan, Jibril leading the five
// prayers, Shaytan's three knots on a sleeper, rinsing the nose on waking, and sheep on the mountain tops. Every
// card is one sahih hadith of that book (number as sunnah.com gives it) with its exact English words to highlight,
// and none of them is taught anywhere else in the app. The prophet bitten by an ant (3319) is left out, as its words
// about burning need a scholar to explain them, and so is the green rafraf of 53:18
// (3233), as it sits beside the reports on what he ﷺ saw that night, where the Companions differed.

const CREATION: DeepUnit = {
  key: "book-bad-al-khalq",
  topicId: "sahihayn",
  branchId: "hadith-book-bad-al-khalq",
  branch: { title: "The Book of the Beginning of Creation", description: "From al-Bukhari's Book of the Beginning of Creation: a long talk, the Holy Spirit, Jibril leading the prayer, three knots, and sheep on the hills." },
  name: "the Book of Creation",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "from-the-start-of-creation",
      title: "From the start of creation",
      line: "He ﷺ told of all things, from creation to Paradise.",
      facts: ["Told by Umar ibn al-Khattab", "He ﷺ stood and spoke for a long time", "Some remembered it, and some forgot"],
      source: hadith("bukhari", "3192", "Umar ibn al-Khattab", "Sahih", "Umar said: one day the Prophet ﷺ stood among us for a long time and told us about the beginning of creation, until he told how the people of Paradise will enter their places and the people of the Fire their places. Some remembered what he said, and some forgot it.", "stood up amongst us for a long period and informed us about the beginning of creation"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ start telling them about that day?", a: "The beginning of creation", wrong: ["The price of dates", "The roads to Sham", "The names of the stars"], why: "He informed us about the beginning of creation and talked of it in detail, Umar said." },
        { q: "Where did his ﷺ long talk end?", a: "People going into Paradise and the Fire", wrong: ["The building of the masjid", "A trip to the market", "The first rain of winter"], why: "Till he mentioned how the people of Paradise and of Hell will enter their places." },
        { q: "Everyone who heard him ﷺ that day remembered all of it.", tf: false, why: "No. Some remembered what he had said, and some forgot it, Umar said." }
      ]
    },
    {
      slug: "support-him-with-the-holy-spirit",
      title: "Helped by the Holy Spirit",
      line: "He ﷺ asked Allah to help Hassan with the Holy Spirit.",
      facts: ["Told by Sa'id ibn al-Musayyab", "Hassan ibn Thabit answered for him ﷺ in poetry", "The Holy Spirit is the angel Jibril"],
      source: hadith("bukhari", "3212", "Sa'id ibn al-Musayyab", "Sahih", "Sa'id ibn al-Musayyab said: Umar came to the masjid while Hassan was reciting poetry. Hassan said: I used to recite poetry in this very masjid in front of one who was better than you. Then he turned to Abu Hurairah and said: I ask you by Allah, did you hear the Messenger of Allah ﷺ say: answer for me; O Allah, support him with the Holy Spirit? Abu Hurairah said: yes.", "I used to recite poetry in this very Mosque in the presence of one"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ ask Allah to support Hassan with?", a: "The Holy Spirit", wrong: ["A strong army", "A fast horse", "A bag of gold"], why: "O Allah, support him with the Holy Spirit, Abu Hurairah heard him ﷺ say." },
        { q: "Whom did Hassan ask to say what he had heard?", a: "Abu Hurairah", wrong: ["Bilal ibn Rabah", "Zayd ibn Thabit", "Abu Talhah"], why: "Hassan turned to Abu Hurairah and asked him by Allah, and Abu Hurairah said: yes." },
        { q: "The Holy Spirit in his ﷺ du'a for Hassan is the angel Jibril.", tf: true, why: "Support him with the Holy Spirit, he ﷺ said, and the Holy Spirit is Jibril." }
      ]
    },
    {
      slug: "jibril-led-the-prayer",
      title: "Jibril led the prayer",
      line: "Jibril came down and led him ﷺ in the five prayers.",
      facts: ["Told by Ibn Shihab az-Zuhri", "Urwa told it to Umar ibn Abd al-Aziz", "He ﷺ counted five prayers on his fingers"],
      source: hadith("bukhari", "3221", "Ibn Shihab az-Zuhri", "Sahih", "Ibn Shihab said: Umar ibn Abd al-Aziz once delayed the Asr prayer a little. Urwa said to him: Jibril came down and led the prayer in front of the Prophet ﷺ. Umar said: be sure of what you say, Urwa. Urwa said: I heard Bashir ibn Abi Mas'ud tell from his father that he heard the Messenger of Allah ﷺ say: Jibril came down and led me in prayer, and I prayed with him, then again, then again, then again, then again, counting five prayers on his fingers.", "Gabriel descended and led the prayer in front of the Prophet"),
      difficulty: 2,
      questions: [
        { q: "Who came down and led him ﷺ in the prayer?", a: "Jibril", wrong: ["Bilal ibn Rabah", "Zayd ibn Thabit", "Abu Talhah"], why: "Gabriel descended and led the prayer in front of the Prophet ﷺ, Urwa said." },
        { q: "How many prayers did he ﷺ count on his fingers?", a: "Five", wrong: ["Two", "Three", "Ten"], why: "I prayed with him again and again, he ﷺ said, counting five prayers on his fingers." },
        { q: "Umar ibn Abd al-Aziz asked Urwa to be sure of what he said.", tf: true, why: "Be sure of what you say, Urwa, Umar told him, so Urwa named who he heard it from." }
      ]
    },
    {
      slug: "three-knots",
      title: "Three knots on a sleeper",
      line: "Dhikr, wudu and prayer undo Shaytan's three knots.",
      facts: ["Told by Abu Hurairah", "Shaytan ties three knots on a sleeper", "He whispers: the night is long, sleep on"],
      source: hadith("bukhari", "3269", "Abu Hurairah", "Sahih", "Abu Hurairah said: the Messenger of Allah ﷺ said: while you sleep, Shaytan ties three knots at the back of your head, saying at each knot: the night is long, so sleep on. If you wake and remember Allah, one knot comes undone; if you make wudu, the second comes undone; and if you pray, all the knots come undone, and you start the morning lively and in good spirits. If not, you start it in low spirits and lazy.", "If that person wakes up and celebrates the praises of Allah, then one knot is undone"),
      difficulty: 1,
      questions: [
        { q: "How many knots does Shaytan tie on a sleeper?", a: "Three", wrong: ["One", "Seven", "Ten"], why: "During your sleep, Satan knots three knots at the back of the head, he ﷺ said." },
        { q: "What undoes all of the knots?", a: "Getting up to pray", wrong: ["Sleeping longer", "Eating breakfast", "Turning over"], why: "When he prays, all the knots are undone, and he wakes up lively, he ﷺ said." },
        { q: "Remembering Allah on waking undoes one knot.", tf: true, why: "If he wakes up and celebrates the praises of Allah, one knot is undone, he ﷺ said." }
      ]
    },
    {
      slug: "rinse-the-nose",
      title: "Rinse the nose on waking",
      line: "Waking up for wudu? Rinse your nose three times.",
      facts: ["Told by Abu Hurairah", "Breathe water in, then blow it out", "Shaytan stays the night in the nose"],
      source: hadith("bukhari", "3295", "Abu Hurairah", "Sahih", "Abu Hurairah said: the Prophet ﷺ said: when any of you wakes from sleep and makes wudu, let him rinse his nose by breathing in water and blowing it out three times, for Shaytan spends the night in the upper part of his nose.", "he should wash his nose by putting water in it and then blowing it out thrice"),
      difficulty: 1,
      questions: [
        { q: "Waking up and making wudu, how many times do you rinse the nose?", a: "Three times", wrong: ["Once", "Five times", "Seven times"], why: "He should wash his nose by putting water in it and then blowing it out thrice." },
        { q: "Why rinse the nose on waking, he ﷺ said?", a: "Shaytan spent the night in it", wrong: ["The air is cold", "The water is fresh", "The night was long"], why: "Because Satan has stayed in the upper part of his nose all the night, he ﷺ said." },
        { q: "Rinsing the nose means breathing water in, then blowing it out.", tf: true, why: "Wash the nose by putting water in it and then blowing it out, he ﷺ said." }
      ]
    },
    {
      slug: "sheep-on-the-hills",
      title: "Sheep on the mountain tops",
      line: "A time will come when a man's best wealth is his sheep.",
      facts: ["Told by Abu Sa'id al-Khudri", "He grazes them on the mountain tops", "He flees to keep his faith from trials"],
      source: hadith("bukhari", "3300", "Abu Sa'id al-Khudri", "Sahih", "Abu Sa'id al-Khudri said: the Messenger of Allah ﷺ said: a time will come when the best wealth of a man will be sheep that he grazes on the mountain tops and where the rain falls, fleeing with his religion from trials.", "There will come a time when the best property of a man will be sheep"),
      difficulty: 2,
      questions: [
        { q: "What will be a man's best wealth in that time?", a: "Sheep", wrong: ["Gold", "Horses", "Land"], why: "There will come a time when the best property of a man will be sheep, he ﷺ said." },
        { q: "Why will he take his sheep up the mountains?", a: "To keep his faith safe from trials", wrong: ["To sell them in the city", "To find a cooler house", "To hide from the rain"], why: "Escaping to protect his religion from afflictions, he ﷺ said." },
        { q: "He grazes his sheep where the rain falls.", tf: true, why: "On the tops of mountains and the places where rain falls, he ﷺ said." }
      ]
    }
  ]
};

export const HADITH_BOOK_CREATION_UNITS: readonly DeepUnit[] = [CREATION];
