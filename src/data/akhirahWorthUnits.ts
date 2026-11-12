import { hadith, type DeepUnit } from "./deepKit";

// One more Akhirah unit: what this world is worth, from Jami at-Tirmidhi, Sunan an-Nasa'i and Sahih al-Bukhari.
// Estates that pull the heart, what in this world is spared the curse, a lifespan of sixty to seventy years, what the
// people of this world call nobility, kept from the world out of love, and a house built only for rain and sun. Every
// card is one sahih or hasan hadith with its number, narrator and grade, and its exact English words to highlight. None
// of these hadith is taught anywhere else in the app.

const WORTH: DeepUnit = {
  key: "akhirah-what-this-world-is-worth",
  topicId: "akhirah",
  branchId: "akhirah-what-this-world-is-worth",
  branch: { title: "What this world is worth", description: "Estates that pull the heart, what is spared in this world, sixty to seventy years, what people call nobility, kept from the world out of love, and a house for rain and sun." },
  name: "what this world is worth",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "do-not-take-to-estates",
      title: "Do not take to estates",
      line: "Do not take to estates, lest you come to desire this world.",
      facts: ["Told by Abdullah ibn Mas'ud", "An estate: farmland and property", "The worry: coming to desire the world"],
      source: hadith("tirmidhi", "2328", "Abdullah ibn Mas'ud", "Sahih (Al-Albani)", "Abdullah ibn Mas'ud said: the Messenger of Allah ﷺ said: do not take to estates, so that you become desirous of this world.", "Do not take to the estate, such that you become desirous of the world"),
      difficulty: 2,
      questions: [
        { q: "Who reported the warning about estates?", a: "Abdullah ibn Mas'ud", wrong: ["Abu Dharr al-Ghifari", "Anas ibn Malik", "Abu Musa al-Ash'ari"], why: "Do not take to the estate, Abdullah ibn Mas'ud heard him ﷺ say." },
        { q: "What can taking to estates lead to, he ﷺ warned?", a: "Desiring this world", wrong: ["Forgetting how to read", "Losing your friends", "Getting sick often"], why: "Such that you become desirous of the world, Ibn Mas'ud heard him ﷺ say." },
        { q: "He ﷺ warned against what makes the heart desire this world.", tf: true, why: "Do not take to estates, he ﷺ said, such that you become desirous of the world." }
      ]
    },
    {
      slug: "except-dhikr-and-learning",
      title: "Except dhikr and learning",
      line: "Except dhikr and learning, this world is cursed, he ﷺ said.",
      facts: ["Told by Abu Hurairah", "Dhikr: remembering Allah", "And what helps one to remember Him"],
      source: hadith("tirmidhi", "2322", "Abu Hurairah", "Hasan (Al-Albani)", "Abu Hurairah said: the Messenger of Allah ﷺ said: this world is cursed, and what is in it is cursed, except the remembrance of Allah and what helps it, and the one who knows and the one who learns.", "except for remembrance of Allah, what is conducive to that, the knowledgeable person and the learning person"),
      difficulty: 2,
      questions: [
        { q: "Which people did he ﷺ name as exceptions?", a: "The scholar and the student", wrong: ["The rich and the famous", "The strong and the tall", "The king and his guards"], why: "Remembrance of Allah is spared, and so are the knowledgeable person and the student." },
        { q: "Which deed did he ﷺ name first as an exception?", a: "The remembrance of Allah", wrong: ["Collecting gold", "Building towers", "Winning races"], why: "Except for remembrance of Allah and what is conducive to that, he ﷺ said." },
        { q: "The one who learns is among the exceptions he ﷺ named.", tf: true, why: "The knowledgeable person and the learning person are named, with remembering Allah." }
      ]
    },
    {
      slug: "sixty-to-seventy-years",
      title: "Sixty to seventy years",
      line: "The lifespan of his ﷺ Ummah is sixty to seventy years.",
      facts: ["Told by Abu Hurairah", "Ummah: the nation that follows him ﷺ", "Sixty to seventy years"],
      source: hadith("tirmidhi", "2331", "Abu Hurairah", "Hasan Sahih (Al-Albani)", "Abu Hurairah said: the Messenger of Allah ﷺ said: the lifespan of my Ummah is from sixty to seventy years.", "The lifespan for my Ummah is from sixty years to seventy"),
      difficulty: 1,
      questions: [
        { q: "What lifespan did he ﷺ give for his Ummah?", a: "Sixty to seventy years", wrong: ["Two hundred years", "Ten to twenty years", "Three hundred years"], why: "The lifespan for my Ummah is from sixty years to seventy, he ﷺ said." },
        { q: "What is the Ummah he ﷺ spoke of?", a: "The nation that follows him", wrong: ["A city in Yemen", "A tribe of Makkah", "A group of angels"], why: "Ummah means the nation of Muhammad ﷺ, whose lifespan is sixty to seventy years." },
        { q: "Most of his ﷺ Ummah will live for many hundreds of years.", tf: false, why: "No. The lifespan of his ﷺ Ummah is from sixty to seventy years." }
      ]
    },
    {
      slug: "what-people-call-nobility",
      title: "What people call nobility",
      line: "Worldly people take wealth as nobility, he ﷺ said.",
      facts: ["Told by Buraydah ibn al-Hasib", "Nobility: what makes one honored", "The people of this world go after it"],
      source: hadith("nasai", "3225", "Buraydah ibn al-Hasib", "Sahih (Al-Albani)", "Buraydah said: the Messenger of Allah ﷺ said: the nobility of the people of this world, which they always go after, is wealth.", "The nobility of the people of this world"),
      difficulty: 2,
      questions: [
        { q: "What do the people of this world count as nobility?", a: "Wealth", wrong: ["Good manners", "Knowledge", "Patience"], why: "The nobility of the people of this world, which they go after, is wealth." },
        { q: "Whose idea of nobility is wealth, he ﷺ said?", a: "The people of this world", wrong: ["The people of Paradise", "The angels", "The prophets"], why: "The nobility of the people of this world is wealth, Buraydah heard him ﷺ say." },
        { q: "He ﷺ said the people of this world go after wealth as nobility.", tf: true, why: "The nobility they always go after is wealth, Buraydah heard him ﷺ say." }
      ]
    },
    {
      slug: "kept-from-the-world",
      title: "Kept from the world out of love",
      line: "When Allah loves someone, He keeps the world from him.",
      facts: ["Told by Qatadah ibn an-Nu'man", "Like keeping water from one who is sick", "A sign of Allah's love"],
      source: hadith("tirmidhi", "2036", "Qatadah ibn an-Nu'man", "Sahih (Al-Albani)", "Qatadah ibn an-Nu'man said: the Messenger of Allah ﷺ said: when Allah loves a servant, He keeps him away from this world, just as one of you keeps water away from his sick one.", "When Allah loves a slave, He prevents him from the world, just as one of you prevents his sick from water"),
      difficulty: 3,
      questions: [
        { q: "What does Allah keep from a servant He loves?", a: "The world", wrong: ["Faith", "Good deeds", "The Quran"], why: "When Allah loves a slave, He prevents him from the world, he ﷺ said." },
        { q: "What did he ﷺ liken it to?", a: "Keeping water from a sick one", wrong: ["Keeping food from a guest", "Keeping light from a reader", "Keeping rain from a farm"], why: "Just as one of you prevents his sick from water, he ﷺ said." },
        { q: "Getting less of this world can be a sign of Allah's love.", tf: true, why: "When Allah loves a servant, He keeps him from the world, as water is kept from the sick." }
      ]
    },
    {
      slug: "a-house-for-rain-and-sun",
      title: "A house for rain and sun",
      line: "Ibn Umar built a house just to keep off rain and sun.",
      facts: ["Told by Abdullah ibn Umar", "He built it with his own hands", "No one helped him build it"],
      source: hadith("bukhari", "6302", "Abdullah ibn Umar", "Sahih", "Ibn Umar said: in the lifetime of the Prophet ﷺ I built a house with my own hands, to shelter me from the rain and shade me from the sun, and none of Allah's creation helped me build it.", "I built a house with my own hands so that it might protect me from the rain and shade me from the sun"),
      difficulty: 2,
      questions: [
        { q: "Why did Ibn Umar build his house?", a: "For shelter from rain and sun", wrong: ["For storing trade goods", "For hosting big feasts", "For keeping horses"], why: "So that it might protect me from the rain and shade me from the sun, he said." },
        { q: "Who helped Ibn Umar build it?", a: "Nobody", wrong: ["His father Umar", "Some hired builders", "His whole tribe"], why: "None of Allah's creatures assisted me in building it, Ibn Umar said." },
        { q: "Ibn Umar built this house during the life of the Prophet ﷺ.", tf: true, why: "During the life-time of the Prophet ﷺ, he built it with his own hands." }
      ]
    }
  ]
};

export const AKHIRAH_WORTH_UNITS: readonly DeepUnit[] = [WORTH];
