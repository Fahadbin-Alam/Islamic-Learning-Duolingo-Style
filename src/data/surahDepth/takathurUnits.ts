import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah At-Takathur ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on At-Takathur 102:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_102_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on At-Takathur 102:${ayah}`,
    url: `https://quran.com/102:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 102:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q102 = (ayah: number) => quranQuote(102, ayah);


/** Ayahs 1 to 4: competing for more distracts people until they reach the graves; only deeds go with them. */
const TAKATHUR_ONE: DeepUnit = {
  key: "takathur1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-102",
  name: "At-Takathur, ayahs 1-4",
  kind: "skill",
  lessonType: "surah",
  surahName: "At-Takathur",
  lessons: [
    {
      slug: "competing-for-more",
      title: "Competing for more",
      line: "Chasing more of the world distracts people from the Hereafter.",
      facts: ["Takathur: competing for more", "Alhakum: it distracts you"],
      quote: q102(1),
      source: ik(1, "People are busy with love of the world, its delights and adornments, and it distracts them from seeking the Hereafter.", "all are preoccupied by love of the world, its delights and its adornments"),
      difficulty: 1,
      questions: [
        { q: "What diverts people, per 102:1?", a: "The mutual increase", wrong: ["The night", "The rain", "The stars"], why: "The mutual increase diverts you." },
        { q: "What does it distract from, per Ibn Kathir?", a: "Seeking the Hereafter", wrong: ["Eating", "Sleeping", "Shopping"], why: "This distracts you from seeking the Hereafter and desiring it." },
        { tf: true, q: "Love of the world can make us forget the Hereafter.", why: "All are preoccupied by love of the world, its delights and its adornments." }
      ]
    },
    {
      slug: "more-of-anything",
      title: "More of anything",
      line: "Allah does not say more of what, so it covers everything.",
      facts: ["As-Sa'di explains", "Money, children, fame"],
      quote: q102(1),
      source: saadi(102, 1, "As-Sa'di says the thing competed for is not named so it covers all of it: wealth, children, followers, status and more.", "ولم يذكر المتكاثر به"),
      difficulty: 2,
      questions: [
        { q: "Why does 102:1 not say more of what?", a: "To cover everything", wrong: ["It was forgotten", "Only gold", "Only camels"], why: "Not named so it includes all, says as-Sa'di." },
        { q: "Which of these is also a race for more?", a: "Fame and status", wrong: ["Prayer", "Fasting", "Charity"], why: "Wealth, children, followers, status and more." },
        { tf: true, q: "Competing for more can distract from worship.", why: "As-Sa'di on 102:1." }
      ]
    },
    {
      slug: "until-you-visit-the-graves",
      title: "Until you visit the graves",
      line: "The distraction lasts until death brings people to the graves.",
      facts: ["Al-Maqabir: the graves", "Death comes to all"],
      quote: q102(2),
      source: ik(2, "The distraction keeps people busy until death comes and they visit the graves, becoming their people.", "This delays you until death comes to you and you visit the graves"),
      difficulty: 1,
      questions: [
        { q: "How long does the distraction last, per 102:2?", a: "Until you visit the graves", wrong: ["Until noon", "Until Eid", "Until you are rich"], why: "Until you visit the graves." },
        { q: "What does visit the graves mean, per Ibn Kathir?", a: "Death comes to you", wrong: ["You go on a trip", "You build a house", "You buy land"], why: "This delays you until death comes to you and you visit the graves." },
        { tf: true, q: "We should prepare for the Hereafter before death comes.", why: "This delays you until death comes to you." }
      ]
    },
    {
      slug: "only-visitors",
      title: "Only visitors",
      line: "Allah calls them visitors to the graves, not people who stay.",
      facts: ["As-Sa'di explains", "Barzakh: a stop on the way"],
      quote: q102(2),
      source: saadi(102, 2, "As-Sa'di says Allah called them visitors, not residents, so the grave is a stop on the way to the lasting home.", "أن الله سماهم زائرين"),
      difficulty: 2,
      questions: [
        { q: "What does Allah call people in the graves?", a: "Visitors", wrong: ["Owners", "Kings", "Residents"], why: "Allah named them visitors, not residents." },
        { q: "The grave is a stop on the way to...?", a: "The lasting home", wrong: ["A second life on earth", "Nowhere", "A new city"], why: "On the way to the lasting home, says as-Sa'di." },
        { tf: false, q: "The grave is where people stay forever.", why: "They are visitors. As-Sa'di on 102:2." }
      ]
    },
    {
      slug: "my-wealth-my-wealth",
      title: "My wealth, my wealth",
      line: "Only what we used up or gave away is truly ours.",
      facts: ["Eaten, worn, or given", "Charity is sent ahead"],
      quote: q102(1),
      source: hadith("muslim", "2958", "Abdullah ibn ash-Shikhkhir", "Sahih", "He was reciting At-Takathur and said: the son of Adam says my wealth, my wealth, but only what he ate, wore out, or gave in charity is really his.", "My wealth, my wealth"),
      difficulty: 2,
      questions: [
        { q: "Which surah was he reciting then?", a: "At-Takathur", wrong: ["Al-Fatihah", "Yasin", "Al-Mulk"], why: "As he was reciting: Abundance diverts you." },
        { q: "What does the son of Adam keep saying?", a: "My wealth, my wealth", wrong: ["My friend, my friend", "My home, my home", "My time, my time"], why: "The son of Adam claims: My wealth, my wealth." },
        { tf: true, q: "Charity is wealth sent ahead for us.", why: "Or you gave as charity and sent it forward." }
      ]
    },
    {
      slug: "three-things-are-yours",
      title: "Three things are yours",
      line: "From all your wealth, only three things are really yours.",
      facts: ["What you eat", "What you wear, what you give"],
      quote: q102(1),
      source: hadith("muslim", "2959", "Abu Hurairah", "Sahih", "Only three things of a servant's wealth are his: what he eats, what he wears out, and what he gives in charity; the rest he leaves to others.", "out of his wealth three things are only his"),
      difficulty: 2,
      questions: [
        { q: "How many things of his wealth are really his?", a: "Three", wrong: ["One", "Five", "Ten"], why: "Out of his wealth three things are only his." },
        { q: "Which of these is one of the three?", a: "What he gives in charity", wrong: ["What he hides", "What he counts", "What he locks away"], why: "Or he gives as charity, and this is what he stored for himself." },
        { tf: false, q: "We take all our wealth with us when we die.", why: "Because you are to depart and leave it for other people." }
      ]
    },
    {
      slug: "only-deeds-stay",
      title: "Only deeds stay",
      line: "Family and money go home after the burial, but deeds stay.",
      facts: ["Three follow the dead", "Deeds remain"],
      quote: q102(2),
      source: hadith("bukhari", "6514", "Anas ibn Malik", "Sahih", "Three follow a dead person to the grave: family, wealth and deeds; family and wealth go back, and deeds stay with him.", "relatives and his property go back while his deeds remain with him"),
      difficulty: 2,
      questions: [
        { q: "How many things follow the dead to the grave?", a: "Three", wrong: ["Two", "Four", "Seven"], why: "A dead person is followed by three." },
        { q: "What stays with him?", a: "His deeds", wrong: ["His money", "His family", "His house"], why: "Relatives and his property go back while his deeds remain with him." },
        { tf: true, q: "Good deeds are the only friends that stay.", why: "His deeds remain with him." }
      ]
    },
    {
      slug: "growing-old-with-wishes",
      title: "Growing old with wishes",
      line: "With age, love of wealth and long life grow too.",
      facts: ["Long hopes", "Love of wealth"],
      quote: q102(1),
      source: hadith("bukhari", "6421", "Anas ibn Malik", "Sahih", "The son of Adam grows old, and two wishes grow old with him: love of wealth and hope for a long life.", "love for wealth and"),
      difficulty: 3,
      questions: [
        { q: "Which two wishes grow with age?", a: "Love of wealth and long life", wrong: ["Love of sleep and food", "Love of sport and games", "Love of books and maps"], why: "Love for wealth and a wish for a long life." },
        { q: "What happens to these wishes as man ages?", a: "They grow old with him", wrong: ["They vanish", "They turn to fear", "They become small"], why: "The son of Adam grows old and so also two desires grow old with him." },
        { tf: true, q: "Even old people must guard against greed.", why: "Two desires grow old with him, love for wealth and a wish for a long life." }
      ]
    },
    {
      slug: "you-shall-come-to-know",
      title: "You shall come to know",
      line: "Allah warns twice: soon you will know the truth.",
      facts: ["Kalla: Nay!", "A warning after a warning"],
      quote: q102(3),
      source: ik(3, "Al-Hasan Al-Basri said the two ayahs are a warning after a warning; Ad-Dahhak said the first is to disbelievers and the second to believers.", "This is a threat after a threat"),
      difficulty: 3,
      questions: [
        { q: "What does 102:3 say?", a: "Nay! You shall come to know!", wrong: ["Rest, all is fine!", "Go and play!", "Gather more!"], why: "Nay! You shall come to know!" },
        { q: "What did Al-Hasan call 102:3-4?", a: "A threat after a threat", wrong: ["A story", "A riddle", "A promise of wealth"], why: "This is a threat after a threat." },
        { q: "To whom is 102:4 addressed, per Ad-Dahhak?", a: "The believers", wrong: ["The angels", "The animals", "The jinn only"], why: "Again nay! You shall come to know, meaning, O you believers." }
      ]
    }
  ]
};

/** Ayahs 5 to 8: if only they knew for sure; they will see the Fire, then be asked about every blessing. */
const TAKATHUR_TWO: DeepUnit = {
  key: "takathur2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-102",
  name: "At-Takathur, ayahs 5-8",
  kind: "skill",
  lessonType: "surah",
  surahName: "At-Takathur",
  lessons: [
    {
      slug: "if-you-knew-for-sure",
      title: "If you knew for sure",
      line: "Sure knowledge would stop us chasing wealth over the Hereafter.",
      facts: ["Ilm al-yaqin: sure knowledge", "Knowledge changes actions"],
      quote: q102(5),
      source: ik(5, "If you knew with true knowledge, you would not be distracted by rivalry for wealth from seeking the Hereafter.", "you knew with true knowledge, you would not be diverted by rivalry for wealth"),
      difficulty: 1,
      questions: [
        { q: "What kind of knowledge does 102:5 mention?", a: "Sure knowledge", wrong: ["Old knowledge", "Secret knowledge", "Half knowledge"], why: "Nay! If you knew with a sure knowledge." },
        { q: "What would sure knowledge stop, per Ibn Kathir?", a: "Being diverted by rivalry for wealth", wrong: ["Eating and drinking", "Praying", "Learning"], why: "You would not be diverted by rivalry for wealth." },
        { tf: true, q: "Real knowledge of the Hereafter changes how we live.", why: "If you knew with true knowledge, you would not be diverted." }
      ]
    },
    {
      slug: "you-will-see-it",
      title: "You will see it",
      line: "Allah explains the warning: people will see the Fire.",
      facts: ["Ayn al-yaqin: seeing for sure", "The warning explained"],
      quote: q102(6),
      source: ik(6, "Ayahs 6-7 explain the earlier warning: people will see the Fire, and then see it with certainty of sight.", "This is the explanation of the previous threat"),
      difficulty: 2,
      questions: [
        { q: "What does 102:6 say they will see?", a: "The blazing Fire", wrong: ["A garden", "A palace", "A river"], why: "Verily, you shall see the blazing Fire!" },
        { q: "How will they see it, per 102:7?", a: "With certainty of sight", wrong: ["In a dream", "From far away", "Only in a story"], why: "And again, you shall see it with certainty of sight!" },
        { tf: true, q: "102:6-7 explain the warning of 102:3-4.", why: "This is the explanation of the previous threat." }
      ]
    },
    {
      slug: "asked-about-the-blessings",
      title: "Asked about the blessings",
      line: "We will be asked about thanks for health, safety and food.",
      facts: ["An-Naim: the blessings", "Thanks by worship"],
      quote: q102(8),
      source: ik(8, "On that Day all will be asked about thanking Allah for His favors, like health, safety and provision.", "questioned concerning your gratitude towards the favors that Allah blessed you with, such as health, safety, sustenance"),
      difficulty: 2,
      questions: [
        { q: "What will we be asked about, per 102:8?", a: "The delights", wrong: ["The weather", "Our names", "Our height"], why: "Then on that Day you shall be asked about the delights!" },
        { q: "Which blessing does Ibn Kathir name?", a: "Health", wrong: ["Fame", "Power", "Beauty"], why: "Such as health, safety, sustenance and other things." },
        { tf: true, q: "We thank Allah by worshipping Him.", why: "Did you return His favors by being thankful to Him and worshipping Him." }
      ]
    },
    {
      slug: "a-meal-of-dates",
      title: "A meal of dates",
      line: "Even a simple meal after hunger is a blessing to answer for.",
      facts: ["Abu Bakr and Umar", "A kind Ansari host"],
      quote: q102(8),
      source: hadith("muslim", "2038", "Abu Hurairah", "Sahih", "Hungry, he, Abu Bakr and Umar were fed dates and meat by an Ansari; he said they would be asked about this blessing on the Day of Judgement.", "you will certainly be questioned about this bounty on the Day of judgment"),
      difficulty: 3,
      questions: [
        { q: "What brought them out of their houses?", a: "Hunger", wrong: ["A wedding", "A journey", "A market"], why: "They said: Allah's Messenger, it is hunger." },
        { q: "Who fed them?", a: "A man of the Ansar", wrong: ["A king", "A trader from Syria", "Their neighbors in Makkah"], why: "And all of them came to the house of an Ansari." },
        { tf: true, q: "He said they would be asked about that meal.", why: "You will certainly be questioned about this bounty on the Day of judgment." }
      ]
    },
    {
      slug: "health-and-free-time",
      title: "Health and free time",
      line: "Health and free time are blessings many people waste.",
      facts: ["Use your health well", "Fill free time with good"],
      quote: q102(8),
      source: hadith("bukhari", "6412", "Ibn Abbas", "Sahih", "There are two blessings that many people lose out on: health and free time.", "health and free time"),
      difficulty: 3,
      questions: [
        { q: "Which two blessings do many people waste?", a: "Health and free time", wrong: ["Gold and silver", "Food and water", "Sun and moon"], why: "Two blessings that many people are deceived into losing: health and free time." },
        { q: "What is a good use of free time?", a: "Learning and good deeds", wrong: ["Wasting it all", "Hurting others", "Forgetting Allah"], why: "There are two blessings that many people are deceived into losing." },
        { tf: false, q: "Free time is not a blessing.", why: "There are two blessings: health and free time." }
      ]
    }
  ]
};

export const TAKATHUR_UNITS: readonly DeepUnit[] = [TAKATHUR_ONE, TAKATHUR_TWO];
