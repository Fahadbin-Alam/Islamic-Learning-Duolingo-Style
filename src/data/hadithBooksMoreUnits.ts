import { hadith, type DeepUnit } from "./deepKit";

// One more book for the Bukhari and Muslim topic: al-Bukhari's Book of Knowledge. How the Prophet ﷺ taught, how
// his Companions passed it on, and how knowledge leaves the world. Every card is one sahih hadith (number as
// sunnah.com gives it) with its exact English words to highlight, and none of them is taught anywhere else in the
// app.

const KNOWLEDGE: DeepUnit = {
  key: "book-ilm",
  topicId: "sahihayn",
  branchId: "hadith-book-ilm",
  branch: { title: "The Book of Knowledge", description: "From al-Bukhari's Book of Knowledge: how the Prophet ﷺ taught, and how knowledge is kept and passed on." },
  name: "the Book of Knowledge",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "three-men-at-the-circle",
      title: "Three men and a circle of knowledge",
      line: "One man joined the circle, one sat behind, one walked away.",
      facts: ["Told by Abu Waqid al-Laythi", "Allah took in the one who came close"],
      source: hadith("bukhari", "66", "Abu Waqid al-Laythi", "Sahih", "Three men came while the Prophet ﷺ sat teaching in the masjid. One found a place in the circle, one sat at the back, and one went away. He ﷺ said: the first came to Allah, so Allah took him in; the second was shy, so Allah sheltered him in His mercy; the third turned away, so Allah turned away from him.", "One of them betook himself to Allah, so Allah took him into His grace and mercy and accommodated him"),
      difficulty: 1,
      questions: [
        { q: "What did Allah do for the man who found a place in the circle?", a: "Took him into His mercy", wrong: ["Sent him home", "Made him the leader", "Gave him gold"], why: "One of them betook himself to Allah, so Allah took him into His grace and mercy." },
        { q: "What did the second man do?", a: "Sat shyly at the back", wrong: ["Went to the market", "Fell asleep", "Argued loudly"], why: "The other sat behind the gathering; he felt shy, so Allah sheltered him in His mercy." },
        { q: "Turning away from a lesson about Allah is a good choice.", tf: false, why: "The third turned his face from Allah and went away, so Allah turned His face from him." }
      ]
    },
    {
      slug: "never-boring",
      title: "Not too much, so no one is bored",
      line: "Ibn Mas'ud taught once a week so people would not get bored.",
      facts: ["Told by Abu Wa'il", "He was following the Prophet's ﷺ way"],
      source: hadith("bukhari", "70", "Abu Wa'il", "Sahih", "Abdullah ibn Mas'ud gave a talk every Thursday. A man wished he would teach them every day. He said: what stops me is that I hate to bore you; I choose the right times, as the Prophet ﷺ did with us.", "The only thing which prevents me from doing so, is that I hate to bore you"),
      difficulty: 1,
      questions: [
        { q: "On which day did Ibn Mas'ud give his talk?", a: "Every Thursday", wrong: ["Every day", "Only on Eid", "Once a year"], why: "Abdullah used to give a religious talk to the people on every Thursday." },
        { q: "Why did he not teach every day?", a: "He did not want to bore them", wrong: ["He was too busy", "He was travelling", "He had nothing to say"], why: "The only thing which prevents me from doing so, is that I hate to bore you." },
        { q: "Ibn Mas'ud picked good times to teach, as the Prophet ﷺ did.", tf: true, why: "Selecting a suitable time just as the Prophet ﷺ used to do with us." }
      ]
    },
    {
      slug: "said-three-times",
      title: "Said three times",
      line: "He ﷺ would say a sentence three times so all understood it.",
      facts: ["Told by Anas ibn Malik", "He knocked three times with salam too"],
      source: hadith("bukhari", "95", "Anas ibn Malik", "Sahih", "Whenever the Prophet ﷺ said something important, he repeated it three times so people could understand it well, and when he asked to come in, he gave the salam three times.", "he used to repeat it thrice so that the people could understand it properly from him"),
      difficulty: 1,
      questions: [
        { q: "How many times would he ﷺ repeat a sentence?", a: "Three times", wrong: ["Once only", "Ten times", "Seven times"], why: "He used to repeat it thrice." },
        { q: "Why did he ﷺ repeat it?", a: "So people understood it well", wrong: ["To make it longer", "So it would sound nicer", "To fill the time"], why: "So that the people could understand it properly from him." },
        { q: "A good teacher makes sure everyone understands.", tf: true, why: "He used to repeat it thrice so that the people could understand it properly." }
      ]
    },
    {
      slug: "knowledge-leaves-with-scholars",
      title: "When the scholars are gone",
      line: "Allah takes knowledge away by taking the scholars.",
      facts: ["Told by Abdullah ibn Amr", "Then people follow the ignorant"],
      source: hadith("bukhari", "100", "Abdullah ibn Amr", "Sahih", "The Prophet ﷺ said: Allah does not take knowledge away by snatching it from people's hearts, but by taking the scholars, until none is left; then people take ignorant leaders who give answers without knowledge, going astray and leading others astray.", "but takes it away by the death of the religious learned men"),
      difficulty: 2,
      questions: [
        { q: "How does Allah take knowledge away?", a: "By taking the scholars", wrong: ["By hiding the books", "By wiping people's hearts", "By stopping the rain"], why: "But takes it away by the death of the religious learned men." },
        { q: "Whom do people follow when no scholars are left?", a: "Ignorant leaders", wrong: ["The wisest elders", "The angels", "The prophets"], why: "People will take as their leaders ignorant persons who give their verdict without knowledge." },
        { q: "Learning from scholars while they are with us is important.", tf: true, why: "Knowledge is taken away by the death of the religious learned men." }
      ]
    },
    {
      slug: "make-it-easy",
      title: "Do not drive people away",
      line: "An imam should keep prayer short for the weak and busy.",
      facts: ["Told by Abu Mas'ud al-Ansari", "Some make others dislike good deeds"],
      source: hadith("bukhari", "90", "Abu Mas'ud al-Ansari", "Sahih", "A man said he missed the group prayer because the imam made it so long. The Prophet ﷺ was very angry and said: some of you make people dislike good deeds. Whoever leads people in prayer should keep it short, for among them are the sick, the weak and the busy.", "So whoever leads the people in prayer should shorten it because among them there are the sick the weak and the needy"),
      difficulty: 2,
      questions: [
        { q: "Why did a man miss the group prayer?", a: "The imam made it too long", wrong: ["He was travelling", "He lost his way", "He forgot the time"], why: "So and so, the Imam, prolongs the prayer when he leads us." },
        { q: "Why should an imam keep the prayer short?", a: "The sick, weak and busy pray too", wrong: ["To finish before lunch", "To rush to the market", "So the masjid can close"], why: "Among them there are the sick, the weak and the needy." },
        { q: "Making good deeds too hard can push people away from them.", tf: true, why: "Some of you make others dislike good deeds." }
      ]
    },
    {
      slug: "tell-those-at-home",
      title: "Learn it, then tell your people",
      line: "He ﷺ told Abd al-Qays: learn this, then tell your people.",
      facts: ["Told by Ibn Abbas", "They came from far away"],
      source: hadith("bukhari", "87", "Ibn Abbas", "Sahih", "The delegation of Abd al-Qays came from far away. He ﷺ welcomed them and taught them to believe in Allah alone, to pray, to give zakat and to fast Ramadan, and said: remember these and tell them to the people you left behind.", "and tell them to the people whom you have left behind"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ tell the delegation to do with what they learned?", a: "Tell the people at home", wrong: ["Keep it a secret", "Forget it on the way", "Write it on a wall"], why: "Memorize them and tell them to the people whom you have left behind." },
        { q: "How did he ﷺ greet them?", a: "Welcome, no shame and no regret", wrong: ["Go back home", "Why are you late?", "Bring a gift first"], why: "Welcome, O people, neither will you have disgrace nor will you regret." },
        { q: "Sharing what you learn about Islam is part of learning.", tf: true, why: "Memorize them and tell them to the people whom you have left behind." }
      ]
    }
  ]
};

export const HADITH_BOOK_MORE_UNITS: DeepUnit[] = [KNOWLEDGE];
