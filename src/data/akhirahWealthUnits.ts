import { hadith, type DeepUnit } from "./deepKit";

// One more Akhirah unit: wealth and the next life, from Jami at-Tirmidhi and Sahih al-Bukhari. Wealth as the test of
// this ummah, his ﷺ fear that the world would be spread out for us, the rich who will have little on that Day unless
// they give, two brothers and the one who may be provided for because of the other, the poor who enter Paradise
// first, and the hungry people of the Suffah. Every card is one sahih hadith with its number, narrator and grade,
// and its exact English words to highlight. Points the schools differ on are left out, and none of these hadith is
// taught anywhere else in the app.

const WEALTH: DeepUnit = {
  key: "akhirah-wealth-and-next-life",
  topicId: "akhirah",
  branchId: "akhirah-wealth-and-next-life",
  branch: { title: "Wealth and the next life", description: "The test of this ummah, a fear greater than poverty, the rich who give, two brothers, the poor who go first, and the hungry of the Suffah." },
  name: "wealth and the next life",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "the-test-of-this-ummah",
      title: "The test of this ummah",
      line: "Every ummah has its test, and ours is wealth.",
      facts: ["Told by Ka'b ibn Iyad", "Fitnah: a test or trial", "Wealth is the test of this ummah"],
      source: hadith("tirmidhi", "2336", "Ka'b ibn Iyad", "Sahih (Al-Albani)", "Ka'b ibn Iyad said: the Prophet ﷺ said: every ummah has a fitnah, a test, and the fitnah of my ummah is wealth.", "Indeed there is a fitnah for every Ummah, and the Fitnah for my Ummah is wealth"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ call the test of his ummah?", a: "Wealth", wrong: ["Cold weather", "Wild animals", "Hard work"], why: "There is a fitnah for every Ummah, and the Fitnah for my Ummah is wealth." },
        { q: "What does fitnah mean?", a: "A test", wrong: ["A reward", "A holiday", "A market"], why: "There is a fitnah, a trial, for every Ummah, he ﷺ said, and wealth is ours." },
        { q: "Every ummah is given its own test.", tf: true, why: "Indeed there is a fitnah for every Ummah, the Prophet ﷺ said." }
      ]
    },
    {
      slug: "not-poverty-but-plenty",
      title: "Not poverty, but plenty",
      line: "He ﷺ feared the world spread wide for us, not poverty.",
      facts: ["Told by Amr ibn Awf, who was at Badr", "Abu Ubaidah came with wealth from Bahrain", "Racing for the world can distract us"],
      source: hadith("bukhari", "6425", "Amr ibn Awf", "Sahih", "Amr ibn Awf said: Abu Ubaidah came with wealth from Bahrain, and the Ansar came to the Fajr prayer. The Prophet ﷺ smiled when he saw them and said: have good news, and hope for what will please you. By Allah, it is not poverty I fear for you; I fear that the world will be given to you in plenty as it was given to those before you, and you will compete for it as they did, and it will distract you as it distracted them.", "I am not afraid that you will become poor, but I am afraid that worldly wealth will be given to you in abundance"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ fear for us more than poverty?", a: "The world given in plenty", wrong: ["Being too poor", "Cold winters", "Long journeys"], why: "I am afraid that worldly wealth will be given to you in abundance, he ﷺ said." },
        { q: "What would racing for the world do to us, he ﷺ said?", a: "Distract us", wrong: ["Make us kinder", "Make us wiser", "Make us stronger"], why: "You will compete for it as the nations before you did, and it will divert you." },
        { q: "He ﷺ smiled when he saw the Ansar come.", tf: true, why: "Allah's Messenger ﷺ smiled when he saw them, Amr ibn Awf said." }
      ]
    },
    {
      slug: "the-rich-who-give",
      title: "The rich who give",
      line: "The rich will have little that Day, except those who give.",
      facts: ["Told by Abu Dharr", "They walked together one moonlit night", "Give to the right, left, front and back"],
      source: hadith("bukhari", "6443", "Abu Dharr", "Sahih", "Abu Dharr said: one night I found the Messenger of Allah ﷺ walking alone, and he called me to walk with him. He said: those with much will be those with little on the Day of Resurrection, except one whom Allah gives wealth and he gives it out to his right, his left, in front of him and behind him, and does good with it.", "The rich are in fact the poor"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ say about those with much wealth?", a: "They will have little that Day", wrong: ["They will enter Paradise first", "They will not be asked about it", "They will rule in Paradise"], why: "The rich are in fact the poor on the Day of Resurrection, he ﷺ said." },
        { q: "Which rich person is the exception?", a: "One who gives his wealth out", wrong: ["One who saves it all", "One who hides it well", "One who counts it daily"], why: "Except one whom Allah gives wealth and he gives it to his right, left, front and back." },
        { q: "Abu Dharr walked with the Prophet ﷺ one night.", tf: true, why: "Abu Dharr found him ﷺ walking alone at night, and he called him to come along." }
      ]
    },
    {
      slug: "two-brothers",
      title: "Two brothers",
      line: "Your provision may come because of the one you help.",
      facts: ["Told by Anas ibn Malik", "One brother kept coming to the Prophet ﷺ", "The other brother worked in trade"],
      source: hadith("tirmidhi", "2345", "Anas ibn Malik", "Sahih (Al-Albani)", "Anas ibn Malik said: there were two brothers in the time of the Messenger of Allah ﷺ. One of them used to come to the Prophet ﷺ, and the other worked in trade. The one who worked complained to the Prophet ﷺ about his brother, and he ﷺ said: perhaps you are provided for because of him.", "Perhaps you are provided for because of him"),
      difficulty: 1,
      questions: [
        { q: "What did one brother do while the other worked?", a: "He kept coming to the Prophet ﷺ", wrong: ["He slept all day", "He travelled far away", "He played in the market"], why: "One of them used to come to the Prophet ﷺ, and the other had some business." },
        { q: "Why might the working brother be given provision?", a: "Because of his brother", wrong: ["Because of luck", "Because of the market", "Because of his skill alone"], why: "The worker complained, and he ﷺ said: perhaps you are provided for because of him." },
        { q: "Helping someone who seeks knowledge can bring you blessing.", tf: true, why: "He ﷺ told the brother who worked that he may be given provision because of him." }
      ]
    },
    {
      slug: "the-poor-go-first",
      title: "The poor go in first",
      line: "Poor believers enter Paradise half a day before the rich.",
      facts: ["Told by Abu Hurairah", "That half a day is 500 years", "The poor Muslims go in first"],
      source: hadith("tirmidhi", "2354", "Abu Hurairah", "Hasan Sahih (Al-Albani)", "Abu Hurairah said: the Messenger of Allah ﷺ said: the poor Muslims will enter Paradise before their rich by half a day, and that is five hundred years.", "The poor Muslims are admitted into Paradise before their rich by half a day"),
      difficulty: 2,
      questions: [
        { q: "Who enters Paradise first, the poor or the rich?", a: "The poor Muslims", wrong: ["The rich Muslims", "Both groups together", "Whoever is strongest"], why: "The poor Muslims are admitted into Paradise before their rich by half a day." },
        { q: "How long is that half a day?", a: "Five hundred years", wrong: ["Five hours", "Five days", "Fifty days"], why: "Before their rich by half a day, and that is five hundred years, he ﷺ said." },
        { q: "Being poor in this world means Allah does not love you.", tf: false, why: "No. The poor Muslims go into Paradise half a day, five hundred years, before the rich." }
      ]
    },
    {
      slug: "hungry-in-the-suffah",
      title: "Hungry, yet honoured",
      line: "The hungry men of the Suffah had great good with Allah.",
      facts: ["Told by Fadalah ibn Ubayd", "The people of the Suffah were very poor", "Some fell down in prayer from hunger"],
      source: hadith("tirmidhi", "2368", "Fadalah ibn Ubayd", "Sahih (Al-Albani)", "Fadalah ibn Ubayd said: when the Messenger of Allah ﷺ led the prayer, some men fell down from hunger, the people of the Suffah, so that Bedouins would say they were mad. When he ﷺ finished the prayer, he turned to them and said: if you knew what is stored for you with Allah, you would love to have even more poverty and need. Fadalah said: I was with the Messenger of Allah ﷺ that day.", "If you knew what was in store for you with Allah then you would love to be increased in poverty and need"),
      difficulty: 2,
      questions: [
        { q: "Why did some men fall down in the prayer?", a: "From hunger", wrong: ["From laughing", "From the cold", "From being pushed"], why: "Some men would collapse among them during the Salat due to hunger, Fadalah said." },
        { q: "Who were these hungry men?", a: "The people of the Suffah", wrong: ["Traders from Sham", "Soldiers of Rome", "Kings of Yemen"], why: "They were among the Ashab As-Suffah, the poor of the masjid, Fadalah said." },
        { q: "He ﷺ told them Allah had great good stored for them.", tf: true, why: "If you knew what was in store for you with Allah, you would love more need, he ﷺ said." }
      ]
    }
  ]
};

export const AKHIRAH_WEALTH_UNITS: readonly DeepUnit[] = [WEALTH];
