import { hadith, type DeepUnit } from "./deepKit";

// One more unit on the kids' Hadith path: at the table, from Sahih al-Bukhari and Jami' at-Tirmidhi. Seven dates
// for each one, not two dates at once without asking, eating from the edges, asking the host about one more guest,
// barley with no sieve, and no fancy table. Every card is one sahih hadith with its number and narrator, and its
// exact English words to highlight, and none of them is taught anywhere else in the app.

const TABLE: DeepUnit = {
  key: "kids-table",
  topicId: "hadith",
  branchId: "hadith-table",
  branch: { title: "At the table", description: "Seven dates each, two at once only if friends agree, the edges of the dish, one more guest, barley with no sieve, and no fancy table." },
  name: "at the table",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "seven-dates-each",
      title: "Seven dates each",
      line: "He ﷺ gave each of his companions seven dates.",
      facts: [
        "Abu Hurairah told it.",
        "One of his dates was dry and hard.",
        "Abu Hurairah liked that hard one best."
      ],
      source: hadith("bukhari", "5411", "Abu Hurairah", "Sahih", "Abu Hurairah said: once the Prophet ﷺ shared out dates among his companions and gave each one seven dates. He gave me seven dates too. One of them was dry and hard, but none of them was dearer to me than that one, for it took me a long time to chew.", "distributed dates among his companions and gave each one seven dates"),
      difficulty: 1,
      questions: [
        { q: "How many dates did each companion get?", a: "Seven", wrong: ["Two", "Ten", "One"], why: "He ﷺ gave each one seven dates, and Abu Hurairah got seven too." },
        { q: "Which date did Abu Hurairah like the most?", a: "The hard one", wrong: ["The softest one", "The largest one", "The sweetest one"], why: "He liked the hard one best, for he could chew it for a long time." },
        { q: "Abu Hurairah was happy with the hard date.", tf: true, why: "None of the dates was dearer to Abu Hurairah than that hard one." }
      ]
    },
    {
      slug: "two-dates-at-once",
      title: "Two dates at once",
      line: "Ask your friends before you take two dates at once.",
      facts: [
        "Abdullah ibn Umar told it.",
        "Food was short, so they shared dates.",
        "Two at once is fine if your friends agree."
      ],
      source: hadith("bukhari", "5446", "Abdullah ibn Umar", "Sahih", "Jabalah ibn Suhaym said: in the time of Ibn az-Zubair we were hit by a famine, and he gave us dates to eat. Abdullah ibn Umar would pass by us while we ate and say: do not eat two dates together at once, for the Prophet ﷺ forbade taking two dates together at once. Then Ibn Umar would add: unless a person first asks his companions.", "Do not eat two dates together at a time"),
      difficulty: 1,
      questions: [
        { q: "What did Ibn Umar tell people not to do?", a: "Eat two dates at once", wrong: ["Eat with the right hand", "Say Bismillah first", "Share the dates"], why: "Do not eat two dates together at a time, Ibn Umar said, for he ﷺ forbade it." },
        { q: "When is it fine to take two dates at once?", a: "When your friends agree", wrong: ["When you are the oldest", "When no one is looking", "When you are very hungry"], why: "Unless one takes the permission of one's companions, Ibn Umar used to add." },
        { q: "Good table manners mean thinking of others too.", tf: true, why: "He ﷺ forbade taking two dates at once; Ibn Umar added: unless your companions agree." }
      ]
    },
    {
      slug: "eat-from-the-edges",
      title: "Eat from the edges",
      line: "Blessing comes down to the middle, so eat from the edges.",
      facts: [
        "Ibn Abbas told it.",
        "Blessing comes down to the middle of the food.",
        "So do not start from the middle."
      ],
      source: hadith("tirmidhi", "1805", "Ibn Abbas", "Sahih (Al-Albani)", "Ibn Abbas said: the Prophet ﷺ said: the blessing comes down to the middle of the food, so eat from its edges, and do not eat from its middle.", "the blessing descends to the middle of the food, so eat from its edges"),
      difficulty: 1,
      questions: [
        { q: "Where does the blessing come down in the food?", a: "To the middle", wrong: ["To the edges", "To the water jug", "To the cup"], why: "Indeed the blessing descends to the middle of the food, he ﷺ said." },
        { q: "Where should we eat from, he ﷺ said?", a: "The edges of the food", wrong: ["The middle of the dish", "The biggest piece", "Someone else's side"], why: "Eat from its edges, and do not eat from its middle, he ﷺ said." },
        { q: "Eating from the edges of the food follows the Sunnah.", tf: true, why: "Eat from its edges, and do not eat from its middle, the Prophet ﷺ said." }
      ]
    },
    {
      slug: "one-more-guest",
      title: "One more guest",
      line: "A man followed the guests, so he ﷺ asked the host first.",
      facts: [
        "Abu Mas'ud al-Ansari told it.",
        "Abu Shu'aib invited five guests, with him ﷺ.",
        "The host said yes, and the man came in."
      ],
      source: hadith("bukhari", "5434", "Abu Mas'ud al-Ansari", "Sahih", "Abu Mas'ud said: a man called Abu Shu'aib had a servant who was a butcher. He told him: make a meal so that I can invite the Messenger of Allah ﷺ and four others. So he invited the Messenger of Allah ﷺ and four others, but another man followed them. The Prophet ﷺ said: you invited me as one of five guests, and now another man has followed us. If you wish, you may let him in, and if you wish, you may say no. The host said: I let him in.", "You have invited me as one of five guests, but now another man has followed us"),
      difficulty: 1,
      questions: [
        { q: "How many guests did Abu Shu'aib invite?", a: "Five guests", wrong: ["Two guests", "Ten guests", "Twenty guests"], why: "You have invited me as one of five guests, he ﷺ told the host." },
        { q: "What did he ﷺ do when another man followed them?", a: "He asked the host", wrong: ["He brought more food", "He waited outside", "He picked a seat"], why: "If you wish you can admit him, and if you wish you can refuse him, he ﷺ said." },
        { q: "The host said yes, and the extra man came in.", tf: true, why: "But I admit him, the host said to the Prophet ﷺ." }
      ]
    },
    {
      slug: "blow-off-the-husk",
      title: "Blow off the husk",
      line: "With no sieve, they blew the husk off their barley.",
      facts: [
        "Sahl ibn Sa'd told it.",
        "He ﷺ never saw white flour.",
        "They ground barley, blew it, and baked it."
      ],
      source: hadith("bukhari", "5413", "Sahl ibn Sa'd", "Sahih", "Abu Hazim said: I asked Sahl ibn Sa'd: did the Messenger of Allah ﷺ ever eat white flour? Sahl said: the Messenger of Allah ﷺ never saw white flour from the time Allah sent him until Allah took him. I asked: did people have sieves in his time? He said: he ﷺ never saw a sieve from the time Allah sent him until Allah took him. I asked: how did you eat barley without sifting it? He said: we used to grind it and then blow off its husk, and when the husk flew away, we made the dough and ate it.", "We used to grind it and then blow off its husk"),
      difficulty: 1,
      questions: [
        { q: "How did they clean the barley, with no sieve?", a: "They blew off the husk", wrong: ["They washed it in milk", "They baked it twice", "They gave it away"], why: "We used to grind it and then blow off its husk, Sahl said." },
        { q: "What did he ﷺ never see, Sahl said?", a: "White flour", wrong: ["Barley", "Dates", "Milk"], why: "He ﷺ never saw white flour from the time Allah sent him, Sahl said." },
        { q: "He ﷺ and his companions lived a simple life.", tf: true, why: "They had no sieve and no white flour, and they ate barley bread, Sahl said." }
      ]
    },
    {
      slug: "no-fancy-table",
      title: "No fancy table",
      line: "He ﷺ ate simply: no big tray and no dining table.",
      facts: [
        "Anas ibn Malik told it.",
        "He ﷺ did not eat thin, soft bread.",
        "He ﷺ kept his meals simple."
      ],
      source: hadith("bukhari", "5386", "Anas ibn Malik", "Sahih", "Anas said: as far as I know, the Prophet ﷺ never ate from a big tray, never ate thin, well-baked bread, and never ate at a dining table.", "nor did he ever eat at a dining table"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ never eat at, Anas said?", a: "A dining table", wrong: ["A friend's house", "His own home", "The tailor's house"], why: "Nor did he ever eat at a dining table, Anas said." },
        { q: "What kind of bread did he ﷺ not eat?", a: "Thin, soft bread", wrong: ["Barley bread", "Any bread at all", "Bread with vinegar"], why: "He ﷺ never ate well-baked thin bread, Anas said." },
        { q: "He ﷺ kept his meals plain and simple.", tf: true, why: "He ﷺ never ate from a big tray or at a dining table, Anas said." }
      ]
    }
  ]
};

export const KIDS_TABLE_UNITS: DeepUnit[] = [TABLE];
