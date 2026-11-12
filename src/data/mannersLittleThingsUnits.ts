import { hadith, type DeepUnit } from "./deepKit";

// One more Manners unit: little things that matter, from Jami at-Tirmidhi, Sunan Abi Dawud, Sunan Ibn Majah and Sahih
// al-Bukhari. A believer's tongue, his ﷺ answer to those who sneezed hoping for mercy, hating a sin from afar, not
// sitting half in the shade and half in the sun, keeping the masjid clean, and a way of lying down that Allah does not
// love. Every card is one sahih or hasan hadith with its number, narrator and grade, and its exact English words to
// highlight. None of these hadith is taught anywhere else in the app.

const LITTLE_THINGS: DeepUnit = {
  key: "manners-little-things",
  topicId: "manners",
  branchId: "manners-little-things",
  branch: { title: "Little things that matter", description: "A believer's tongue, answering a sneeze, hating a sin, shade and sun, the masjid floor, and how not to lie down." },
  name: "little things that matter",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "a-believers-tongue",
      title: "A believer's tongue",
      line: "A believer does not insult, curse, or speak foul words.",
      facts: ["Told by Abdullah ibn Mas'ud", "No insults and no cursing", "No foul or shameless talk"],
      source: hadith("tirmidhi", "1977", "Abdullah ibn Mas'ud", "Sahih (Al-Albani)", "Abdullah ibn Mas'ud said: the Messenger of Allah ﷺ said: the believer does not attack the honor of others, does not curse, is not shameless and is not foul-mouthed.", "The believer does not insult the honor of others, nor curse"),
      difficulty: 1,
      questions: [
        { q: "Which of these is not the way of a believer?", a: "Cursing others", wrong: ["Greeting others", "Helping others", "Thanking others"], why: "The believer does not insult the honor of others, nor curse, he ﷺ said." },
        { q: "What does a believer not do to the honor of others?", a: "Insult it", wrong: ["Guard it", "Respect it", "Defend it"], why: "The believer does not insult people's honor, nor curse, nor speak foul words, he ﷺ said." },
        { q: "A believer keeps away from foul and shameless talk.", tf: true, why: "The believer does not commit Fahishah, nor is he foul, he ﷺ said." }
      ]
    },
    {
      slug: "when-they-sneezed",
      title: "When they sneezed",
      line: "To Jews who sneezed, he ﷺ said: may Allah guide you.",
      facts: ["Told by Abu Musa al-Ash'ari", "They hoped for a du'a of mercy", "Yahdikumullahu wa yuslihu balakum"],
      source: hadith("tirmidhi", "2739", "Abu Musa al-Ash'ari", "Sahih (Al-Albani)", "Abu Musa al-Ash'ari said: the Jews used to sneeze near the Prophet ﷺ, hoping he would say: may Allah have mercy on you. Instead he would say: may Allah guide you and set your affairs right.", "The Jews used to sneeze in the presence of the Prophet"),
      difficulty: 2,
      questions: [
        { q: "What did the Jews hope to hear when they sneezed near him ﷺ?", a: "May Allah have mercy on you all", wrong: ["May you all live long lives", "Welcome to you all, friends", "May you all be rich and well"], why: "They hoped he would say Yarhamukumullah, may Allah have mercy upon you, Abu Musa said." },
        { q: "What did he ﷺ say to them instead?", a: "May Allah guide you and set your affairs right", wrong: ["May Allah give you long and easy lives", "May Allah make you rich and strong", "May Allah grant you many sons"], why: "Yahdikumullahu wa yuslihu balakum: may Allah guide you and rectify your affairs." },
        { q: "He ﷺ made du'a for guidance for the Jews who sneezed.", tf: true, why: "So he said: Yahdikumullahu wa yuslihu balakum, may Allah guide you, Abu Musa said." }
      ]
    },
    {
      slug: "far-from-a-sin",
      title: "Far from a sin",
      line: "Seeing a sin and hating it is like not being there.",
      facts: ["Told by Al-'Urs ibn 'Amirah al-Kindi", "The heart should hate a sin", "Liking a sin from afar is like being there"],
      source: hadith("abudawud", "4345", "Al-'Urs ibn 'Amirah al-Kindi", "Hasan (Al-Albani)", "Al-'Urs ibn 'Amirah al-Kindi said: the Prophet ﷺ said: when a sin is done on earth, whoever sees it and hates it is like one who was not there, and whoever was not there but is pleased with it is like one who saw it.", "he who sees it and disapproves of it will be taken like one who was not present"),
      difficulty: 2,
      questions: [
        { q: "One who sees a sin and hates it is like whom?", a: "One who was not there", wrong: ["One who did the sin", "One who helped with it", "One who laughed at it"], why: "He who sees it and disapproves of it is like one who was not present, he ﷺ said." },
        { q: "One far away who is pleased with a sin is like whom?", a: "One who saw it", wrong: ["One who never knew of it", "One who stopped it", "One who forgave it"], why: "He who is not present and approves of it will be like him who sees it, he ﷺ said." },
        { q: "Being pleased with a sin, even from far away, is wrong.", tf: true, why: "Whoever was not there but approves of a sin is like one who saw it, he ﷺ said." }
      ]
    },
    {
      slug: "between-shade-and-sun",
      title: "Between shade and sun",
      line: "He ﷺ forbade sitting between the shade and the sun.",
      facts: ["Told by Buraidah al-Aslami", "Half in the shade, half in the sun", "Sit fully in one or the other"],
      source: hadith("ibnmajah", "3722", "Buraidah al-Aslami", "Sahih (Al-Albani)", "Buraidah al-Aslami said: the Prophet ﷺ forbade sitting between the shade and the sun.", "forbade sitting between the shade and sun"),
      difficulty: 1,
      questions: [
        { q: "Where did he ﷺ forbid sitting?", a: "Between the shade and the sun", wrong: ["Under a tall palm tree", "On a mat of palm leaves", "Beside a well of water"], why: "The Prophet ﷺ forbade sitting between the shade and sun, Buraidah said." },
        { q: "What did he ﷺ forbid between the shade and the sun?", a: "Sitting there", wrong: ["Walking there", "Reading there", "Talking there"], why: "He ﷺ forbade sitting between the shade and sun, so sit fully in the shade or the sun." },
        { q: "A believer avoids sitting half in the shade and half in the sun.", tf: true, why: "The Prophet ﷺ forbade sitting between the shade and sun, Buraidah al-Aslami said." }
      ]
    },
    {
      slug: "spitting-in-the-masjid",
      title: "Spitting in the masjid",
      line: "Spitting in the masjid is a sin; burying it wipes it out.",
      facts: ["Told by Anas ibn Malik", "The masjid floor was earth and pebbles then", "Keep the masjid clean"],
      source: hadith("bukhari", "415", "Anas ibn Malik", "Sahih", "Anas ibn Malik said: the Prophet ﷺ said: spitting in the masjid is a sin, and its expiation is to bury it.", "Spitting in the mosque is a sin and its expiation is to bury it"),
      difficulty: 1,
      questions: [
        { q: "What is spitting in the masjid, he ﷺ said?", a: "A sin", wrong: ["A sunnah", "A good habit", "Nothing at all"], why: "Spitting in the mosque is a sin, and its expiation is to bury it, he ﷺ said." },
        { q: "What wipes out that sin, he ﷺ said?", a: "Burying it", wrong: ["Paying a coin", "Fasting one day", "Saying sorry aloud"], why: "Its expiation is to bury it, Anas ibn Malik heard him ﷺ say of spitting." },
        { q: "We should keep the masjid clean.", tf: true, why: "Spitting in the mosque is a sin, he ﷺ said, and its expiation is to bury it." }
      ]
    },
    {
      slug: "not-on-the-stomach",
      title: "Not on the stomach",
      line: "Lying on the stomach is not loved by Allah, he ﷺ said.",
      facts: ["Told by Abu Hurairah", "He ﷺ saw a man lying on his stomach", "Allah does not love that way of lying"],
      source: hadith("tirmidhi", "2768", "Abu Hurairah", "Hasan Sahih (Al-Albani)", "Abu Hurairah said: the Messenger of Allah ﷺ saw a man lying on his stomach, and said: this way of lying is not loved by Allah.", "Indeed such laying is not loved by Allah"),
      difficulty: 1,
      questions: [
        { q: "How was the man lying when he ﷺ saw him?", a: "On his stomach", wrong: ["On his right side", "On his back", "On his left side"], why: "He ﷺ saw a man lying on his stomach and said Allah does not love it, Abu Hurairah said." },
        { q: "What did he ﷺ say about lying on the stomach?", a: "Allah does not love it", wrong: ["Allah loves it best", "Fine after a big meal", "Good for a tired back"], why: "Indeed such lying is not loved by Allah, he ﷺ said." },
        { q: "A believer avoids lying on the stomach.", tf: true, why: "Indeed such lying is not loved by Allah, he ﷺ said of a man on his stomach." }
      ]
    }
  ]
};

export const MANNERS_LITTLE_THINGS_UNITS: readonly DeepUnit[] = [LITTLE_THINGS];
