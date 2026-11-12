import { hadith, type DeepUnit } from "./deepKit";

// One more book for the Bukhari and Muslim topic: Muslim's Book of Virtues. A stone in Makkah that greeted him ﷺ, two
// angels in white beside him at Uhud, sitting after Fajr until sunrise, his hand in every bowl of water the servants of
// Madinah brought, heads lowered when revelation came, and a day when seeing him would be dearer than family and wealth.
// Every card is one sahih hadith of that book (number as sunnah.com gives it) with its exact English words to
// highlight, and none of them is taught anywhere else in the app. The food that lasted until it was weighed (2280,
// 2281) is left out, as it needs a scholar to set it beside the hadith on measuring food, and so are the reports on
// how long he ﷺ stayed in Makkah and his age (2350, 2353), where the narrations differ.

const VIRTUES: DeepUnit = {
  key: "book-fadail",
  topicId: "sahihayn",
  branchId: "hadith-book-fadail",
  branch: { title: "The Book of Virtues", description: "From Sahih Muslim's Book of Virtues: a stone's greeting, two angels at Uhud, sitting till sunrise, a hand in every bowl, heads lowered, and longing to see him ﷺ." },
  name: "the Book of Virtues",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "the-stone-that-greeted-him",
      title: "The stone that greeted him",
      line: "In Makkah, a stone used to greet him ﷺ before prophethood.",
      facts: ["Told by Jabir ibn Samurah", "Before he ﷺ was sent as a Prophet", "He ﷺ said: I know it even now"],
      source: hadith("muslim", "2277", "Jabir ibn Samurah", "Sahih", "Jabir ibn Samurah said: the Messenger of Allah ﷺ said: I know a stone in Makkah that used to greet me with salam before I was sent as a Prophet, and I know it even now.", "I recognise the stone in Mecca which used to pay me salutations before my advent as a Prophet"),
      difficulty: 1,
      questions: [
        { q: "What did the stone in Makkah use to do?", a: "Greet him with salam", wrong: ["Give him water", "Show him the road", "Tell him the time"], why: "The stone in Mecca used to pay me salutations, he ﷺ said." },
        { q: "In which city was the stone that greeted him ﷺ?", a: "Makkah", wrong: ["Madinah", "Ta'if", "Jerusalem"], why: "I recognise the stone in Mecca which used to greet me, he ﷺ said." },
        { q: "He ﷺ said he still knew that stone.", tf: true, why: "I recognise that even now, he ﷺ said of the stone that greeted him." }
      ]
    },
    {
      slug: "two-angels-at-uhud",
      title: "Two angels at Uhud",
      line: "At Uhud, two angels in white stood beside him ﷺ.",
      facts: ["Told by Sa'd ibn Abi Waqqas", "One on his right, one on his left", "Jibril and Mika'il"],
      source: hadith("muslim", "2306", "Sa'd ibn Abi Waqqas", "Sahih", "Sa'd said: on the day of Uhud I saw, on the right and the left of the Messenger of Allah ﷺ, two men in white clothes whom I never saw before or after, and they were Jibril and Mika'il.", "two persons dressed in white clothes and whom I did not see before nor after that, and they were Gabriel and Michael"),
      difficulty: 2,
      questions: [
        { q: "What were the two at his ﷺ side wearing?", a: "White clothes", wrong: ["Green clothes", "Black clothes", "Red clothes"], why: "Two persons dressed in white clothes, Sa'd said of the day of Uhud." },
        { q: "Which two angels did Sa'd see beside him ﷺ at Uhud?", a: "Jibril and Mika'il", wrong: ["Harut and Marut", "Munkar and Nakir", "Israfil and Malik"], why: "And they were Gabriel and Michael, Sa'd said of the two in white." },
        { q: "Sa'd had often seen those two men before Uhud.", tf: false, why: "No. Sa'd said he never saw those two men before that day, nor after it." }
      ]
    },
    {
      slug: "sitting-until-sunrise",
      title: "Sitting until sunrise",
      line: "He ﷺ sat after Fajr until the sun rose.",
      facts: ["Told by Jabir ibn Samurah", "Asked by Simak ibn Harb", "They laughed, and he ﷺ smiled"],
      source: hadith("muslim", "2322", "Jabir ibn Samurah", "Sahih", "Simak ibn Harb asked Jabir ibn Samurah if he used to sit with the Messenger of Allah ﷺ. He said: yes, often. He would not get up from the place where he prayed Fajr until the sun rose. They would talk about the days before Islam and laugh, and he ﷺ would only smile.", "from the place where he offered the dawn prayer until the sun rose, and after the rising of the sun he stood up"),
      difficulty: 2,
      questions: [
        { q: "Until when did he ﷺ stay where he prayed Fajr?", a: "Until the sun rose", wrong: ["Until midday", "Until Asr", "Until night came"], why: "He did not stand up from where he prayed Fajr until the sun rose, Jabir said." },
        { q: "What did the Companions do as they talked of old days?", a: "They would laugh", wrong: ["They would weep", "They would stay silent", "They would write it down"], why: "They talked of the days of ignorance and laughed, and he ﷺ smiled, Jabir said." },
        { q: "He ﷺ would smile as they talked and laughed.", tf: true, why: "They would laugh, and Allah's Messenger ﷺ smiled only, Jabir ibn Samurah said." }
      ]
    },
    {
      slug: "a-hand-in-every-bowl",
      title: "A hand in every bowl",
      line: "He ﷺ dipped his hand in every bowl the servants brought.",
      facts: ["Told by Anas ibn Malik", "The servants of Madinah came after Fajr", "Even on cold mornings"],
      source: hadith("muslim", "2324", "Anas ibn Malik", "Sahih", "Anas said: when the Messenger of Allah ﷺ finished the Fajr prayer, the servants of Madinah came with their vessels of water, and he dipped his hand in every vessel they brought, even on cold mornings.", "the servants of Medina came to him with utensils containing water, and no utensil was brought in which he did not dip his hand"),
      difficulty: 1,
      questions: [
        { q: "Who brought vessels of water to him ﷺ after Fajr?", a: "The servants of Madinah", wrong: ["The traders of Makkah", "The kings of Yemen", "The poets of Ta'if"], why: "The servants of Medina came to him with utensils containing water, Anas said." },
        { q: "When did the servants bring him ﷺ their water?", a: "After the Fajr prayer", wrong: ["After the Isha prayer", "At midday", "Late at night"], why: "When he had completed his dawn prayer, the servants of Medina came to him, Anas said." },
        { q: "He ﷺ dipped his hand in their water even on cold mornings.", tf: true, why: "Sometimes they came in the cold dawn, and he dipped his hand in them, Anas said." }
      ]
    },
    {
      slug: "heads-lowered",
      title: "Heads lowered",
      line: "When revelation came, he ﷺ lowered his head.",
      facts: ["Told by Ubadah ibn as-Samit", "His Companions lowered their heads too", "He ﷺ raised his head once it was over"],
      source: hadith("muslim", "2335", "Ubadah ibn as-Samit", "Sahih", "Ubadah ibn as-Samit said: when revelation came down to the Messenger of Allah ﷺ, he lowered his head, and his Companions lowered their heads. When it was over, he raised his head.", "he lowered his head and so lowered his Companions their heads"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ do as revelation came down?", a: "Lowered his head", wrong: ["Stood up to walk", "Tied up his camel", "Called for food"], why: "When wahi descended upon him, he lowered his head, Ubadah ibn as-Samit said." },
        { q: "What did his Companions do at that time?", a: "Lowered their heads too", wrong: ["Went out to the market", "Lit a big fire", "Started to eat"], why: "He lowered his head and so his Companions lowered their heads, Ubadah said." },
        { q: "He ﷺ raised his head once the revelation was over.", tf: true, why: "When that state was over, he raised his head, Ubadah ibn as-Samit said." }
      ]
    },
    {
      slug: "longing-to-see-him",
      title: "Longing to see him",
      line: "One day, seeing him ﷺ would be dearer than family.",
      facts: ["Told by Abu Hurairah", "A day would come without seeing him ﷺ", "Dearer than family and wealth"],
      source: hadith("muslim", "2364", "Abu Hurairah", "Sahih", "Abu Hurairah said: the Messenger of Allah ﷺ said: by Him in Whose Hand is the soul of Muhammad, a day will come to you when you will not see me, and a glimpse of me then will be dearer to one of you than his family and his wealth.", "a day would come to you when you would not be able to see me"),
      difficulty: 2,
      questions: [
        { q: "One day, seeing him ﷺ would be dearer than what?", a: "Family and wealth", wrong: ["Sleep and comfort", "Shade and water", "Bread and salt"], why: "A glimpse of my face would be dearer to one than his family and property, he ﷺ said." },
        { q: "What did he ﷺ say they would one day be unable to do?", a: "See him", wrong: ["Ride their camels", "Plant their palms", "Build their homes"], why: "A day would come to you when you would not be able to see me, he ﷺ said." },
        { q: "He ﷺ swore by Allah as he said these words.", tf: true, why: "By Him in Whose Hand is the life of Muhammad, he ﷺ began, Abu Hurairah said." }
      ]
    }
  ]
};

export const HADITH_BOOK_VIRTUES_UNITS: readonly DeepUnit[] = [VIRTUES];
