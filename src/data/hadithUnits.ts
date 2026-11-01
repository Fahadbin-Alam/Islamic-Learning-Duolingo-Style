import { hadith, type DeepUnit } from "./deepKit";

// Units built on famous hadith: the hadith scholars teach first and hadith about seeking knowledge (end of the
// Foundation topic), and hadith for a good heart (end of Manners). The Hadith topic itself stays the short child's
// path its tests pin down. Each card is one sahih or hasan hadith, with its number and grade as sunnah.com gives them.

const FAMOUS: DeepUnit = {
  key: "hadith-famous",
  topicId: "foundation",
  branchId: "hadith-famous",
  branch: { title: "Famous hadith", description: "Short hadith that scholars teach first, because so much of Islam is in them." },
  name: "famous hadith",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "intentions",
      title: "Deeds and intentions",
      line: "Deeds are judged by intentions; each gets what he intended.",
      facts: ["First hadith in Bukhari", "Told by Umar"],
      source: hadith("bukhari", "1", "Umar ibn al-Khattab", "Sahih", "The reward of deeds depends on intentions, and every person gets what he intended."),
      difficulty: 1,
      questions: [
        { q: "What are deeds judged by?", a: "Intentions", wrong: ["Their size", "Who sees them", "How loud they are"], why: "Sahih al-Bukhari 1." },
        { q: "Which hadith opens Sahih al-Bukhari?", a: "Deeds are by intentions", wrong: ["The hadith of the dog", "The hadith of Badr", "None at all"], why: "Imam al-Bukhari put it first." },
        { q: "Two people do the same deed. Can their reward differ?", a: "Yes, by their intentions", wrong: ["No, never", "Only if one is older", "Only on Fridays"], why: "Each gets what he intended." }
      ]
    },
    {
      slug: "ihsan",
      title: "As if you see Him",
      line: "Ihsan: worship Allah as if you see Him; He sees you.",
      facts: ["Taught by Jibril", "Islam, iman, ihsan"],
      source: hadith("muslim", "8a", "Umar ibn al-Khattab", "Sahih", "Jibril asked: tell me about ihsan. He ﷺ said: that you worship Allah as if you see Him, for though you do not see Him, He sees you."),
      difficulty: 2,
      questions: [
        { q: "What is ihsan?", a: "Worship as if you see Allah", wrong: ["Praying only when watched", "Worship once a year", "Being rich"], why: "Sahih Muslim 8a." },
        { q: "Who came to ask about Islam, iman and ihsan?", a: "Jibril, as a man", wrong: ["Abu Jahl", "A king of Rome", "A child"], why: "He ﷺ told Umar afterward: that was Jibril." },
        { q: "Even when we can't see Allah, He sees us.", tf: true, why: "He sees you." }
      ]
    },
    {
      slug: "what-concerns-you",
      title: "Leave what's not your business",
      line: "Good Islam means leaving what does not concern you.",
      facts: ["Less gossip", "Less wasted time"],
      source: hadith("tirmidhi", "2317", "Abu Hurairah", "Sahih", "Part of the excellence of a person's Islam is that he leaves what does not concern him."),
      difficulty: 1,
      questions: [
        { q: "What does good Islam leave alone?", a: "What does not concern you", wrong: ["Prayer", "Kindness", "Family"], why: "Jami at-Tirmidhi 2317." },
        { q: "Friends gossip about someone. What fits this hadith?", a: "Stay out of it", wrong: ["Spread it further", "Add more details", "Post it online"], why: "It does not concern you." },
        { q: "Minding your own business is part of good Islam.", tf: true, why: "Leaving what doesn't concern him." }
      ]
    },
    {
      slug: "clear-and-doubtful",
      title: "Clear, and in between",
      line: "Halal is clear, haram is clear; avoid the doubtful between.",
      facts: ["Protect your religion", "Protect your honor"],
      source: hadith("bukhari", "52", "An-Nu'man bin Bashir", "Sahih", "The halal is clear and the haram is clear, and between them are doubtful things many people don't know. Whoever avoids them protects his religion and his honor."),
      difficulty: 2,
      questions: [
        { q: "What lies between clear halal and clear haram?", a: "Doubtful things", wrong: ["Nothing at all", "Only sweets", "Only games"], why: "Sahih al-Bukhari 52." },
        { q: "What do you protect by avoiding doubtful things?", a: "Your religion and honor", wrong: ["Your money only", "Your phone", "Nothing"], why: "He protects his religion and his honor." },
        { q: "When unsure if something is halal, it's safer to leave it.", tf: true, why: "Avoid the doubtful things." }
      ]
    },
    {
      slug: "nasihah",
      title: "Religion is sincerity",
      line: "The religion is sincerity: to Allah, His Book, His Messenger ﷺ.",
      facts: ["Told by Tamim ad-Dari", "And to all Muslims"],
      source: hadith("muslim", "55a", "Tamim ad-Dari", "Sahih", "The religion is sincerity. We asked: to whom? He ﷺ said: to Allah, His Book, His Messenger, the leaders of the Muslims and all of them."),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ say the religion is?", a: "Sincerity", wrong: ["A family name", "A tradition only", "Hard rules"], why: "Sahih Muslim 55a." },
        { q: "Which of these is named in the hadith?", a: "Allah's Book", wrong: ["Gold", "Poetry", "Markets"], why: "To Allah, His Book, His Messenger." },
        { q: "Sincerity to Muslims is part of the religion.", tf: true, why: "Their leaders and all of them." }
      ]
    },
    {
      slug: "good-after-bad",
      title: "A good deed after a bad one",
      line: "Fear Allah anywhere; follow a bad deed with a good one.",
      facts: ["Told to Abu Dharr", "Good wipes out bad"],
      source: hadith("tirmidhi", "1987", "Abu Dharr", "Hasan", "Have taqwa of Allah wherever you are, follow a bad deed with a good one to wipe it out, and treat people with good character."),
      difficulty: 1,
      questions: [
        { q: "You made a mistake. What does this hadith say to do?", a: "Follow it with a good deed", wrong: ["Give up", "Hide forever", "Make another mistake"], why: "Jami at-Tirmidhi 1987." },
        { q: "Where should we be mindful of Allah?", a: "Wherever we are", wrong: ["Only in the masjid", "Only in Ramadan", "Only at home"], why: "Have taqwa wherever you are." },
        { q: "How should we treat people, says this hadith?", a: "With good character", wrong: ["Coldly", "Rudely", "Only if they are rich"], why: "Treat people with good character." }
      ]
    },
    {
      slug: "steadfast",
      title: "Believe, then stay firm",
      line: "Say: I believe in Allah, then stay firm on it.",
      facts: ["Asked by Sufyan", "A short, full answer"],
      source: hadith("muslim", "38", "Sufyan ibn Abdullah ath-Thaqafi", "Sahih", "I said: tell me something about Islam I won't need to ask anyone else. He ﷺ said: say, I believe in Allah, then be steadfast."),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ tell Sufyan to say?", a: "I believe in Allah", wrong: ["I am the best", "I will try later", "Nothing"], why: "Sahih Muslim 38." },
        { q: "And after saying it?", a: "Stay firm on it", wrong: ["Forget it", "Change it often", "Keep it secret"], why: "Then be steadfast." },
        { q: "Being steadfast means staying on the right path every day.", tf: true, why: "Not just once, but always." }
      ]
    }
  ]
};

const HEART: DeepUnit = {
  key: "hadith-heart",
  topicId: "manners",
  branchId: "hadith-good-heart",
  branch: { title: "Hadith for a good heart", description: "What the Prophet ﷺ taught about the heart, mercy, shyness and good manners." },
  name: "a good heart",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "piece-of-flesh",
      title: "The heart decides",
      line: "If the heart is good, the whole body is good.",
      facts: ["A small piece of flesh"],
      source: hadith("bukhari", "52", "An-Nu'man bin Bashir", "Sahih", "In the body there is a piece of flesh: if it is good, the whole body is good, and if it is bad, the whole body is bad. It is the heart."),
      difficulty: 1,
      questions: [
        { q: "Which part of the body decides the rest?", a: "The heart", wrong: ["The hands", "The hair", "The feet"], why: "Sahih al-Bukhari 52." },
        { q: "If the heart is good, what happens?", a: "The whole body is good", wrong: ["Nothing changes", "Only the eyes change", "You get taller"], why: "The whole body is good." },
        { q: "Taking care of our hearts matters most.", tf: true, why: "The heart leads the whole body." }
      ]
    },
    {
      slug: "best-character",
      title: "The best of you",
      line: "The best of you are those with the best character.",
      facts: ["He ﷺ never spoke rudely"],
      source: hadith("bukhari", "3559", "Abdullah ibn Amr", "Sahih", "The Prophet ﷺ never used bad words, and he used to say: the best of you are those with the best character."),
      difficulty: 1,
      questions: [
        { q: "Who are the best people, he ﷺ said?", a: "Those with the best character", wrong: ["The richest", "The strongest", "The most famous"], why: "Sahih al-Bukhari 3559." },
        { q: "Did he ﷺ ever use bad words?", a: "Never", wrong: ["Often", "When angry", "Only at home"], why: "He never used bad language." },
        { q: "Good manners can make you among the best.", tf: true, why: "The best of you have the best character." }
      ]
    },
    {
      slug: "haya",
      title: "Shyness is faith",
      line: "Modesty, haya, is part of faith.",
      facts: ["Haya: modesty, shyness"],
      source: hadith("bukhari", "24", "Ibn Umar", "Sahih", "The Messenger of Allah ﷺ passed a man telling his brother off for being too shy. He ﷺ said: leave him, for haya is part of faith."),
      difficulty: 1,
      questions: [
        { q: "What is haya part of?", a: "Faith", wrong: ["Weakness", "Laziness", "Rudeness"], why: "Sahih al-Bukhari 24." },
        { q: "A man scolded his brother for being shy. What did he ﷺ say?", a: "Leave him", wrong: ["Scold him more", "Make him loud", "Ignore Islam"], why: "Leave him, for haya is part of faith." },
        { q: "Haya means modesty and shyness from wrong.", tf: true, why: "It keeps a person from bad deeds." }
      ]
    },
    {
      slug: "gentle",
      title: "Allah loves gentleness",
      line: "Allah is gentle, and He loves gentleness.",
      facts: ["Told to Aishah", "Gentleness gets more"],
      source: hadith("muslim", "2593", "Aishah", "Sahih", "Aishah, Allah is Gentle and loves gentleness, and gives for gentleness what He does not give for harshness."),
      difficulty: 1,
      questions: [
        { q: "What does Allah love, says this hadith?", a: "Gentleness", wrong: ["Harshness", "Shouting", "Pride"], why: "Sahih Muslim 2593." },
        { q: "What does gentleness get that harshness doesn't?", a: "What Allah gives for it", wrong: ["Nothing", "Only laughs", "Punishment"], why: "He gives for gentleness what He does not for harshness." },
        { q: "Being gentle is a weakness.", tf: false, why: "Allah loves it and rewards it." }
      ]
    },
    {
      slug: "be-merciful",
      title: "Show mercy, get mercy",
      line: "Be merciful to those on earth, and Allah will show you mercy.",
      facts: ["Ar-Rahman's mercy"],
      source: hadith("tirmidhi", "1924", "Abdullah ibn Amr", "Sahih", "The merciful are shown mercy by Ar-Rahman. Be merciful to those on earth, and the One above the heavens will be merciful to you."),
      difficulty: 1,
      questions: [
        { q: "Who does Ar-Rahman show mercy to?", a: "The merciful", wrong: ["The proud", "The harsh", "Nobody"], why: "Jami at-Tirmidhi 1924." },
        { q: "Whom should we be merciful to?", a: "Those on earth", wrong: ["Only family", "Only friends", "No one"], why: "Be merciful to those on earth." },
        { q: "Being kind to animals is mercy too.", tf: true, why: "They are among those on earth." }
      ]
    },
    {
      slug: "relieve",
      title: "Ease someone's hardship",
      line: "Ease a believer's hardship; Allah eases yours on Judgment Day.",
      facts: ["Help others, Allah helps you"],
      source: hadith("muslim", "2699a", "Abu Hurairah", "Sahih", "Whoever relieves a believer of a hardship of this world, Allah will relieve him of a hardship of the Day of Resurrection. Allah helps a servant as long as he helps his brother."),
      difficulty: 2,
      questions: [
        { q: "Ease someone's hardship. What does Allah do?", a: "Eases yours on Judgment Day", wrong: ["Nothing", "Makes yours harder", "Gives you fame"], why: "Sahih Muslim 2699a." },
        { q: "How long does Allah help a servant?", a: "While he helps his brother", wrong: ["Only one day", "Only if he's rich", "Never"], why: "As long as he helps his brother." },
        { q: "Hiding a Muslim's faults is also rewarded.", tf: true, why: "Allah will hide his faults too." }
      ]
    }
  ]
};

const KNOWLEDGE: DeepUnit = {
  key: "hadith-knowledge",
  topicId: "foundation",
  branchId: "hadith-knowledge",
  branch: { title: "Hadith about knowledge", description: "Why learning Islam matters, and why every hadith needs a true source." },
  name: "knowledge",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "path-to-jannah",
      title: "A path to Jannah",
      line: "Walk a path to seek knowledge; Allah eases your path to Jannah.",
      facts: ["Learning is worship"],
      source: hadith("muslim", "2699a", "Abu Hurairah", "Sahih", "Whoever takes a path seeking knowledge, Allah makes easy for him a path to Paradise."),
      difficulty: 1,
      questions: [
        { q: "Seeking knowledge makes which path easy?", a: "The path to Jannah", wrong: ["The path to the market", "The path home", "No path"], why: "Sahih Muslim 2699a." },
        { q: "Doing these lessons can be a path of knowledge.", tf: true, why: "Any path seeking knowledge counts." },
        { q: "What kind of knowledge is meant here first?", a: "Knowledge of the religion", wrong: ["Gossip", "Video game cheats", "Rumors"], why: "Knowledge that brings you closer to Allah." }
      ]
    },
    {
      slug: "understanding",
      title: "A sign of good",
      line: "Whom Allah wants good for, He gives understanding of the deen.",
      facts: ["Told by Mu'awiyah"],
      source: hadith("bukhari", "71", "Mu'awiyah", "Sahih", "If Allah wants good for a person, He gives him understanding of the religion. I only distribute; Allah is the One who gives."),
      difficulty: 2,
      questions: [
        { q: "What does Allah give someone He wants good for?", a: "Understanding of the religion", wrong: ["Only money", "A big house", "Fame"], why: "Sahih al-Bukhari 71." },
        { q: "He ﷺ said: I distribute, but who gives?", a: "Allah", wrong: ["The people", "Kings", "Traders"], why: "Allah is the One who gives." },
        { q: "Learning your deen is a sign of good.", tf: true, why: "Allah gives it to whom He wants good for." }
      ]
    },
    {
      slug: "one-verse",
      title: "Pass it on",
      line: "Convey from me, even a single verse.",
      facts: ["Share what you learn"],
      source: hadith("bukhari", "3461", "Abdullah ibn Amr", "Sahih", "Convey from me, even if it is one verse. And whoever lies about me on purpose, let him take his seat in the Fire."),
      difficulty: 1,
      questions: [
        { q: "How much should we pass on?", a: "Even one verse", wrong: ["Only whole books", "Nothing", "Only when grown"], why: "Sahih al-Bukhari 3461." },
        { q: "You learned a hadith today. What fits?", a: "Share it, truthfully", wrong: ["Keep it secret", "Change its words", "Make up more"], why: "Convey, even one verse." },
        { q: "Only scholars may share what they know.", tf: false, why: "Even one verse should be passed on." }
      ]
    },
    {
      slug: "no-lies",
      title: "Never make one up",
      line: "Whoever lies about the Prophet ﷺ on purpose earns the Fire.",
      facts: ["Why sources matter", "Check before you share"],
      source: hadith("bukhari", "110", "Abu Hurairah", "Sahih", "Whoever lies about me on purpose, let him take his seat in the Fire."),
      difficulty: 2,
      questions: [
        { q: "Why does every hadith in this app show a source?", a: "Lying about him ﷺ is a grave sin", wrong: ["For decoration", "To look smart", "No reason"], why: "Sahih al-Bukhari 110." },
        { q: "A friend shares a hadith with no source. What do you do?", a: "Check it before sharing", wrong: ["Share it fast", "Add to it", "Change its words"], why: "We must not say what he ﷺ did not say." },
        { q: "Making up a hadith is a small thing.", tf: false, why: "It earns a seat in the Fire." }
      ]
    },
    {
      slug: "two-people",
      title: "Two people to envy",
      line: "Envy only two: a generous rich man, and a wise teacher.",
      facts: ["Wealth spent rightly", "Wisdom taught to others"],
      source: hadith("bukhari", "73", "Abdullah ibn Mas'ud", "Sahih", "Don't wish to be like anyone except two: one given wealth who spends it rightly, and one given wisdom who acts on it and teaches it."),
      difficulty: 2,
      questions: [
        { q: "Whose wisdom should we wish for?", a: "One who acts on it and teaches it", wrong: ["One who hides it", "One who boasts", "One who forgets it"], why: "Sahih al-Bukhari 73." },
        { q: "Which rich person is worth copying?", a: "One who spends it rightly", wrong: ["One who hoards it", "One who wastes it", "One who shows off"], why: "Wealth spent in the right way." },
        { q: "Teaching what you know is a reason to be admired.", tf: true, why: "He acts on it and teaches it." }
      ]
    },
    {
      slug: "gathering",
      title: "Angels surround them",
      line: "People who study Quran in a masjid get calm, mercy and angels.",
      facts: ["Allah mentions them"],
      source: hadith("muslim", "2699a", "Abu Hurairah", "Sahih", "No people gather in a house of Allah to recite and study the Book of Allah, except that calm descends on them, mercy covers them, the angels surround them, and Allah mentions them to those with Him."),
      difficulty: 2,
      questions: [
        { q: "What surrounds people who study Quran together?", a: "The angels", wrong: ["Birds", "Strangers", "Clouds"], why: "Sahih Muslim 2699a." },
        { q: "What comes down on them?", a: "Calm and mercy", wrong: ["Rain", "Gold", "Fear"], why: "Calm descends and mercy covers them." },
        { q: "Allah mentions them to those with Him.", tf: true, why: "As the hadith says." }
      ]
    }
  ]
};

export const HADITH_UNITS: DeepUnit[] = [FAMOUS, HEART, KNOWLEDGE];
