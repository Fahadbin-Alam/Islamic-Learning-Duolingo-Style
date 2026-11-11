import { hadith, type DeepUnit } from "./deepKit";

// One more Hajj unit: the pilgrim's way, from the Book of Hajj in Jami at-Tirmidhi. Every card is one sahih or
// hasan sahih hadith (number, narrator and grade as sunnah.com gives them), with its exact English words to
// highlight, and none of them is taught anywhere else in the app.

const WAY: DeepUnit = {
  key: "hajj-pilgrims-way",
  topicId: "hajj",
  branchId: "hajj-pilgrims-way",
  branch: { title: "The pilgrim's way", description: "Hajj and Umrah that clear away sins, the land that joins the talbiyah, raised voices, two rak'ahs after tawaf, no pushing at the Jamarat, and children on Hajj." },
  name: "the pilgrim's way",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "hajj-and-umrah",
      title: "Hajj and Umrah, one after another",
      line: "Hajj and Umrah remove poverty and sins, as bellows clean iron.",
      facts: ["Told by Abdullah ibn Mas'ud", "Iron, gold and silver made clean"],
      source: hadith("tirmidhi", "810", "Abdullah ibn Mas'ud", "Hasan Sahih (Al-Albani)", "The Prophet ﷺ said: follow Hajj with Umrah, for they remove poverty and sins as the bellows remove the dross of iron, gold and silver; and an accepted Hajj has no reward but Paradise.", "for those two remove poverty and sins just as the bellows removes filth from iron, gold, and silver"),
      difficulty: 2,
      questions: [
        { q: "What do Hajj and Umrah remove, he ﷺ said?", a: "Poverty and sins", wrong: ["Rain and wind", "Friends and family", "Hunger and thirst"], why: "Just as the bellows removes filth from iron, gold, and silver." },
        { q: "What did he ﷺ compare their cleaning to?", a: "Bellows cleaning metal", wrong: ["Rain washing a street", "Wind clearing clouds", "Water washing clothes"], why: "The bellows removes filth from iron, gold, and silver." },
        { q: "The only reward for an accepted Hajj is Paradise.", tf: true, why: "There is no reward for Al-Hajj Al-Mabrur except Paradise." }
      ]
    },
    {
      slug: "the-land-answers",
      title: "The land says it with you",
      line: "When a pilgrim says the talbiyah, rocks and trees say it too.",
      facts: ["Told by Sahl ibn Sa'd", "On his right and on his left"],
      source: hadith("tirmidhi", "828", "Sahl ibn Sa'd", "Sahih (Al-Albani)", "The Prophet ﷺ said: no Muslim says the talbiyah but the rocks, trees and earth to his right and left say it with him, to the ends of the land.", "There is no Muslim who says the Talbiyah except that"),
      difficulty: 1,
      questions: [
        { q: "What joins the pilgrim in saying the talbiyah?", a: "Rocks, trees and earth", wrong: ["The angels alone", "Only other pilgrims", "Nothing at all"], why: "On his right and left, until the end of the land, they say it." },
        { q: "Where are the things that say the talbiyah with him?", a: "On his right and left", wrong: ["Only behind him", "Only in front of him", "Only above him"], why: "The rocks, or trees, or mud say the talbiyah with him." },
        { q: "Only people say the talbiyah during Hajj.", tf: false, why: "No. The rocks, trees and earth around him say the talbiyah too." }
      ]
    },
    {
      slug: "raised-voices",
      title: "Say it out loud",
      line: "Jibril asked that the Companions raise their talbiyah aloud.",
      facts: ["Told by As-Sa'ib ibn Khallad", "Jibril brought the command"],
      source: hadith("tirmidhi", "829", "As-Sa'ib ibn Khallad", "Sahih (Al-Albani)", "The Prophet ﷺ said: Jibril came to me and told me to order my Companions to raise their voices with the talbiyah.", "Jibril came to me and ordered me to order my Companions to raise their voices"),
      difficulty: 1,
      questions: [
        { q: "Who told him ﷺ to have them raise their voices?", a: "Jibril", wrong: ["Abu Bakr", "Umar", "Uthman"], why: "Jibril came to me and ordered me to order my Companions." },
        { q: "How did the Companions say the talbiyah?", a: "With raised voices", wrong: ["In silence", "Only in their hearts", "In a whisper"], why: "Raise their voices with the Ihlal, or the talbiyah." },
        { q: "The Companions were told to keep the talbiyah silent.", tf: false, why: "No. They were told to raise their voices with the talbiyah." }
      ]
    },
    {
      slug: "two-rakahs-after-tawaf",
      title: "Two rak'ahs after tawaf",
      line: "Two rak'ahs after tawaf: Al-Kafirun, then Al-Ikhlas.",
      facts: ["Told by Jabir ibn Abdullah", "Both are called suras of sincerity"],
      source: hadith("tirmidhi", "869", "Jabir ibn Abdullah", "Sahih (Al-Albani)", "Jabir said: in the two rak'ahs of tawaf, the Prophet ﷺ recited the two suras of sincerity: Say, O disbelievers, and Say, He is Allah, the One.", "the Messenger of Allah recited the two Surat of Ikhlas"),
      difficulty: 2,
      questions: [
        { q: "Which suras did he ﷺ read in the two rak'ahs of tawaf?", a: "Al-Kafirun and Al-Ikhlas", wrong: ["Al-Falaq and An-Nas", "Yasin and Al-Mulk", "Al-Asr and Al-Kawthar"], why: "Say: O you disbelievers, and: Say: He is Allah, the One." },
        { q: "What are both suras called, in Tirmidhi 869?", a: "The two suras of sincerity", wrong: ["The two suras of light", "The two suras of refuge", "The two suras of mercy"], why: "Jabir called them the two Surat of Ikhlas." },
        { q: "He ﷺ prayed two rak'ahs after his tawaf.", tf: true, why: "Jabir said he ﷺ recited two suras in the two rak'ahs of tawaf." }
      ]
    },
    {
      slug: "no-pushing",
      title: "No pushing at the Jamarat",
      line: "At the Jamarat there was no hitting, no crowding, no shouting.",
      facts: ["Told by Qudamah ibn Abdullah", "He ﷺ rode his she-camel"],
      source: hadith("tirmidhi", "903", "Qudamah ibn Abdullah", "Sahih (Al-Albani)", "Qudamah ibn Abdullah said: I saw the Prophet ﷺ throwing pebbles at the Jamarat on his she-camel, with no hitting, no pushing, and no one shouting: make way, make way.", "upon his she-camel; there was no hitting, nor crowding"),
      difficulty: 2,
      questions: [
        { q: "How did he ﷺ come to throw the pebbles?", a: "On his she-camel", wrong: ["On foot, running", "On a horse", "On a donkey"], why: "Qudamah saw him ﷺ at the Jamarat upon his she-camel." },
        { q: "What was missing around him ﷺ at the Jamarat?", a: "Hitting and crowding", wrong: ["Pilgrims and pebbles", "Prayer and du'a", "Water and shade"], why: "There was no hitting, nor crowding, nor shouts to make way." },
        { q: "Pushing people out of the way fits his ﷺ Sunnah at the Jamarat.", tf: false, why: "No. At the Jamarat there was no hitting and no crowding." }
      ]
    },
    {
      slug: "children-on-hajj",
      title: "Children on Hajj",
      line: "A child can do Hajj, and the mother is rewarded too.",
      facts: ["Told by Jabir ibn Abdullah", "A mother held up her boy"],
      source: hadith("tirmidhi", "924", "Jabir ibn Abdullah", "Sahih (Al-Albani)", "Jabir said: a woman held up her little boy to the Prophet ﷺ and asked: is there Hajj for this one? He said: yes, and you will have a reward.", "A woman held a boy of hers up for the Messenger of Allah"),
      difficulty: 1,
      questions: [
        { q: "What did the mother ask about her boy?", a: "If he could do Hajj", wrong: ["If he could pray yet", "If he could fast yet", "What to name him"], why: "He ﷺ said yes, there is Hajj for him." },
        { q: "Who else gets a reward for the child's Hajj?", a: "His mother", wrong: ["His teacher", "His neighbor", "Nobody at all"], why: "He ﷺ told her: yes, and you will be rewarded." },
        { q: "Children can go on Hajj too.", tf: true, why: "Asked about her young boy, he ﷺ said: yes." }
      ]
    }
  ]
};

export const HAJJ_WAY_UNITS: DeepUnit[] = [WAY];
