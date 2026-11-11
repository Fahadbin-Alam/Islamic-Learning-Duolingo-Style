import { hadith, type DeepUnit } from "./deepKit";

// One more Aqidah unit: faith in the unseen, from Jami at-Tirmidhi and Sunan Abi Dawud. Believing in the decree, good
// and bad, the Pen told to write it, light cast on creation, a need in the land where you will die, one card against
// ninety-nine scrolls, and heavens where every spot holds an angel in sujud. Every card is one sahih or hasan hadith
// with its number, narrator and grade, and its exact English words to highlight, and none of them is taught anywhere
// else in the app. Which thing Allah created first is left out on purpose, as scholars differ on it, and so is the
// Sur being a horn (Tirmidhi 2430), as the Taha and Kahf lessons already teach it through Ibn Kathir.

const UNSEEN: DeepUnit = {
  key: "aqidah-faith-in-the-unseen",
  topicId: "aqidah",
  branchId: "aqidah-faith-in-the-unseen",
  branch: { title: "Faith in the unseen", description: "Believing in the decree, the Pen told to write it, light cast on creation, a need in the land where you die, one card against ninety-nine scrolls, and heavens full of angels." },
  name: "faith in the unseen",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "believing-in-the-decree",
      title: "Believing in the decree",
      line: "True faith believes in the decree, its good and its bad.",
      facts: ["Told by Jabir ibn Abdullah", "What struck you would not have missed you", "What missed you would not have struck you"],
      source: hadith("tirmidhi", "2144", "Jabir ibn Abdullah", "Sahih (Al-Albani)", "Jabir said: the Messenger of Allah ﷺ said: a servant does not truly believe until he believes in the decree, its good and its bad, and knows that what struck him would not have missed him, and what missed him would not have struck him.", "he knows that what struck him would not have missed him, and that what missed him would not have struck him"),
      difficulty: 2,
      questions: [
        { q: "What must a believer believe in, its good and its bad?", a: "Allah's decree", wrong: ["Lucky days", "Bad omens", "The stars"], why: "A servant does not believe until he believes in the decree, he ﷺ said." },
        { q: "What does such a believer know about what struck him?", a: "It was never going to miss him", wrong: ["It came by chance", "It was bad luck", "Someone else chose it"], why: "And what missed him would not have struck him, he ﷺ said." },
        { q: "Believing in the decree includes its bad as well as its good.", tf: true, why: "Its good and its bad, he ﷺ said, as Jabir told it." }
      ]
    },
    {
      slug: "the-pen-wrote-it",
      title: "The Pen wrote it",
      line: "Allah told the Pen: write all that was decreed.",
      facts: ["Told by Ubadah ibn as-Samit to his son", "Write what was decreed about everything", "Until the Last Hour comes"],
      source: hadith("abudawud", "4700", "Ubadah ibn as-Samit", "Sahih (Al-Albani)", "Ubadah ibn as-Samit said to his son: you will not taste the reality of faith until you know that what came to you could not miss you, and what missed you could not come to you. I heard the Messenger of Allah ﷺ say: Allah created the Pen and said to it: write. It asked: my Lord, what shall I write? He said: write what was decreed about everything, until the Last Hour comes.", "Write what was decreed about everything till the Last Hour comes"),
      difficulty: 2,
      questions: [
        { q: "What did Allah tell the Pen to write?", a: "What was decreed for everything", wrong: ["Only the names of kings", "Only the seas", "Only the mountains"], why: "Write what was decreed about everything till the Last Hour comes, He said." },
        { q: "Until when did the Pen write?", a: "Until the Last Hour comes", wrong: ["Until the first night", "Until the first rain", "Until the first sunrise"], why: "Write what was decreed about everything, Allah told it." },
        { q: "Ubadah taught his son about the decree.", tf: true, why: "You will not taste the reality of faith until you know it, he told his son." }
      ]
    },
    {
      slug: "light-upon-creation",
      title: "Light upon creation",
      line: "Whoever Allah's light touched was guided, he ﷺ said.",
      facts: ["Told by Abdullah ibn Amr", "Allah created His creation in darkness", "The pens have dried with Allah's knowledge"],
      source: hadith("tirmidhi", "2642", "Abdullah ibn Amr", "Sahih (Al-Albani)", "Abdullah ibn Amr said: the Messenger of Allah ﷺ said: Allah created His creation in darkness, then cast His light upon them. Whoever that light touched was guided, and whoever it did not touch went astray. That is why I say: the pens have dried with Allah's knowledge.", "so whoever is touched by that light he is guided, and whoever is not, he goes astray"),
      difficulty: 3,
      questions: [
        { q: "What did Allah cast upon His creation?", a: "His light", wrong: ["A shadow", "A storm", "A river"], why: "He created His creation in darkness, then cast His light upon them." },
        { q: "Who was guided, he ﷺ said?", a: "Whoever the light touched", wrong: ["Whoever was strongest", "Whoever was richest", "Whoever was oldest"], why: "And whoever the light did not touch went astray." },
        { q: "The pens have dried with Allah's knowledge.", tf: true, why: "He ﷺ said it after telling how Allah's light was cast on creation." }
      ]
    },
    {
      slug: "a-need-in-that-land",
      title: "A need in that land",
      line: "Where you will die, Allah gives you a need to go.",
      facts: ["Told by Matar ibn Ukamis", "Allah decrees the land of each death", "He gives the person a need there"],
      source: hadith("tirmidhi", "2146", "Matar ibn Ukamis", "Sahih (Al-Albani)", "Matar ibn Ukamis said: the Messenger of Allah ﷺ said: when Allah decrees that a servant will die in a land, He gives him some need there.", "is to die in a land, He makes him have some need from it"),
      difficulty: 2,
      questions: [
        { q: "What does Allah give a person in the land where he will die?", a: "A need to go there", wrong: ["A new house", "A big crowd", "A warning dream"], why: "He makes him have some need from it, he ﷺ said." },
        { q: "Who decides the land where each person will die?", a: "Allah", wrong: ["The person himself", "The person's family", "The doctors"], why: "When Allah decrees that a servant is to die in a land, he ﷺ said." },
        { q: "A need can lead a person to the land where he will die.", tf: true, why: "Allah makes him have some need from it, he ﷺ said." }
      ]
    },
    {
      slug: "one-card-ninety-nine-scrolls",
      title: "One card, ninety-nine scrolls",
      line: "One card of La ilaha illallah will outweigh ninety-nine scrolls.",
      facts: ["Told by Abdullah ibn Amr", "Each scroll as far as the eye can see", "Nothing is heavier than the Name of Allah"],
      source: hadith("tirmidhi", "2639", "Abdullah ibn Amr", "Sahih (Al-Albani)", "Abdullah ibn Amr said: the Messenger of Allah ﷺ said: on the Day of Judgment, ninety-nine scrolls of a man's deeds will be laid out, each as far as the eye can see. Then a card will be brought out that says: I testify that none is worthy of worship but Allah, and that Muhammad is His servant and Messenger. The scrolls will go on one pan of the scale and the card on the other: the scrolls will be light and the card heavy, for nothing is heavier than the Name of Allah.", "the scrolls will be light, and the card will be heavy, nothing is heavier than the Name of Allah"),
      difficulty: 2,
      questions: [
        { q: "What is written on the card?", a: "The two testimonies of faith", wrong: ["A list of prayers", "A list of his trips", "The man's name"], why: "I testify that none is worthy of worship but Allah, and that Muhammad is His Messenger." },
        { q: "How long is each of the ninety-nine scrolls?", a: "As far as the eye can see", wrong: ["One hand span", "One finger long", "One short page"], why: "Ninety-nine scrolls will be laid out for him, he ﷺ said." },
        { q: "Nothing is heavier than the Name of Allah on the scale.", tf: true, why: "The scrolls will be light, and the card will be heavy, he ﷺ said." }
      ]
    },
    {
      slug: "no-spot-without-an-angel",
      title: "No spot without an angel",
      line: "No spot in the heavens is without an angel in sujud.",
      facts: ["Told by Abu Dharr", "I see what you do not see, he ﷺ said", "Each spot of four fingers has an angel"],
      source: hadith("tirmidhi", "2312", "Abu Dharr", "Hasan (Al-Albani)", "Abu Dharr said: the Messenger of Allah ﷺ said: I see what you do not see, and I hear what you do not hear. The heavens moan, and they have the right to moan: there is no spot in them the size of four fingers without an angel placing his forehead there, prostrating to Allah.", "except that there is an angel placing his forehead in it, prostrating to Allah"),
      difficulty: 2,
      questions: [
        { q: "What is in every spot of the heavens, he ﷺ said?", a: "An angel in sujud", wrong: ["A shining star", "A rain cloud", "A flying bird"], why: "An angel is placing his forehead there, prostrating to Allah, he ﷺ said." },
        { q: "How big is each spot that has an angel?", a: "Four fingers wide", wrong: ["A mile wide", "A city wide", "A valley wide"], why: "There is no spot the size of four fingers without an angel in it, he ﷺ said." },
        { q: "Some parts of the heavens have no angels in them.", tf: false, why: "No. Not one spot of four fingers is without an angel in sujud, he ﷺ said." }
      ]
    }
  ]
};

export const AQIDAH_UNSEEN_UNITS: DeepUnit[] = [UNSEEN];
