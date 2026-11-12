import { hadith, type DeepUnit } from "./deepKit";

// One more Fasting unit: fasting with good manners. Honest words, generosity, mercy and ease, and children
// joining in. Every card is one sahih hadith of al-Bukhari (number as sunnah.com gives it), with its exact
// English words to highlight. Only what the scholars agree on.

const FAST_MANNERS: DeepUnit = {
  key: "fast-manners",
  topicId: "fasting",
  branchId: "fasting-good-manners",
  branch: { title: "Fasting with good manners", description: "A fast is more than no food: honest words, generosity, mercy and ease, and children joining in." },
  name: "fasting with good manners",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "false-speech",
      title: "More than food and drink",
      line: "If you fast, also leave lying and bad deeds.",
      facts: ["Told by Abu Hurairah", "A fast of the tongue too"],
      source: hadith("bukhari", "1903", "Abu Hurairah", "Sahih", "Whoever does not give up false speech and acting on it, Allah has no need of his leaving his food and drink.", "Whoever does not give up forged speech and evil actions"),
      difficulty: 1,
      questions: [
        { q: "Besides food and drink, what should a fasting person give up?", a: "Lying and bad deeds", wrong: ["Smiling at people", "Saying salam", "Reading Quran"], why: "Whoever does not give up forged speech and evil actions." },
        { q: "Whose hunger does Allah have no need of?", a: "The one who keeps lying and doing wrong", wrong: ["The one who prays", "The one who gives charity", "The one who reads Quran"], why: "Allah is not in need of his leaving his food and drink." },
        { q: "A real fast keeps the tongue clean too.", tf: true, why: "Give up forged speech and evil actions." }
      ]
    },
    {
      slug: "faster-than-wind",
      title: "More generous than the wind",
      line: "In Ramadan he ﷺ was more generous than a blowing wind.",
      facts: ["Told by Ibn Abbas", "Jibril met him every night"],
      source: hadith("bukhari", "1902", "Ibn Abbas", "Sahih", "The Prophet ﷺ was the most generous of people, and most of all in Ramadan, when Jibril met him every night and he recited the Quran to him. Then he was more generous than a fast wind.", "used to be more generous than a fast wind"),
      difficulty: 1,
      questions: [
        { q: "When was he ﷺ at his most generous?", a: "In Ramadan", wrong: ["In winter", "On journeys", "During Hajj"], why: "He used to be more so in the month of Ramadan." },
        { q: "Who met him ﷺ every night of Ramadan?", a: "Jibril", wrong: ["Mika'il", "Israfil", "Abu Bakr"], why: "Gabriel used to meet him on every night of Ramadan." },
        { q: "What did he ﷺ do with Jibril each night?", a: "Recite the Quran to him", wrong: ["Count money", "Plan journeys", "Write letters"], why: "The Prophet ﷺ used to recite the Holy Qur'an to Gabriel." }
      ]
    },
    {
      slug: "no-wisal",
      title: "Out of mercy to us",
      line: "Out of mercy, he ﷺ forbade fasting day and night nonstop.",
      facts: ["Told by Aishah", "Fasting nonstop is called wisal"],
      source: hadith("bukhari", "1964", "Aishah", "Sahih", "The Messenger of Allah ﷺ forbade al-wisal, fasting day and night without breaking, out of mercy to the people. They said: but you do it. He said: I am not like you; my Lord gives me food and drink.", "forbade Al-Wisal out of mercy to them"),
      difficulty: 1,
      questions: [
        { q: "Why did he ﷺ forbid fasting day and night nonstop?", a: "Out of mercy to the people", wrong: ["To save food", "Because it was Eid", "To make it harder"], why: "He forbade Al-Wisal out of mercy to them." },
        { q: "What did he ﷺ say about himself?", a: "My Lord gives me food and drink", wrong: ["I fast only on Mondays", "I am just like you", "Fasting is only for the young"], why: "I am not similar to you, for my Lord gives me food and drink." },
        { q: "Islam asks us to fast so hard that we harm ourselves.", tf: false, why: "He forbade Al-Wisal out of mercy to them." }
      ]
    },
    {
      slug: "wool-toys",
      title: "Little ones learn to fast",
      line: "Ansar children fasted, playing with wool toys until iftar.",
      facts: ["Told by Rubayyi' bint Mu'awwidh", "The fast of Ashura"],
      source: hadith("bukhari", "1960", "Rubayyi' bint Mu'awwidh", "Sahih", "We used to fast on the day of Ashura and have our boys fast too. We made them toys of wool, and if one of them cried for food we gave him the toy until it was time to break the fast.", "We used to make toys of wool for the boys"),
      difficulty: 1,
      questions: [
        { q: "What did the Ansar make for their fasting children?", a: "Toys of wool", wrong: ["Sweets", "Kites", "Clay pots"], why: "We used to make toys of wool for the boys." },
        { q: "When did the children get to eat?", a: "At the time of breaking the fast", wrong: ["Whenever they cried", "At noon", "After two days"], why: "Till it was the time of the breaking of the fast." },
        { q: "Children can be helped to practise fasting little by little.", tf: true, why: "We used to fast on that day regularly and also make our boys fast." }
      ]
    },
    {
      slug: "so-it-stays-easy",
      title: "So it would not be too hard",
      line: "He ﷺ stayed home so night prayer would not become a duty.",
      facts: ["Told by Aishah", "In al-Bukhari's Book of Tarawih"],
      source: hadith("bukhari", "2012", "Aishah", "Sahih", "The Prophet ﷺ prayed in the masjid at night, and more people joined him each night. On the fourth night the masjid could not hold them, and he only came out for Fajr. He said: your presence was not hidden from me, but I feared the night prayer would be made a duty on you and you would not manage it.", "your presence was not hidden from me but I was afraid lest the night prayer"),
      difficulty: 2,
      questions: [
        { q: "Why did he ﷺ not come out on the fourth night?", a: "He feared it would become a duty", wrong: ["He was travelling", "He was angry with them", "The masjid was closed"], why: "I was afraid lest the night prayer should be enjoined on you." },
        { q: "How many people came on the fourth night?", a: "More than the masjid could hold", wrong: ["Only one man", "Nobody came", "Just his family"], why: "The Mosque was overwhelmed with people and could not accommodate them." },
        { q: "He ﷺ cared that his ummah could keep up its worship.", tf: true, why: "You might not be able to carry it on." }
      ]
    }
  ]
};

export const FASTING_MORE_UNITS: DeepUnit[] = [FAST_MANNERS];
