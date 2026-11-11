import { hadith, type DeepUnit } from "./deepKit";

// One more unit on the kids' Hadith path: being kind to animals, from Sunan Abi Dawud and Jami at-Tirmidhi. A mother
// bird's young, a thin camel, the rooster that wakes you, a cat at the water, never a living target, and getting down
// to talk. Every card is one sahih hadith with its number, narrator and grade, and its exact English words to
// highlight, and none of them is taught anywhere else in the app.

const ANIMALS: DeepUnit = {
  key: "kids-animals",
  topicId: "hadith",
  branchId: "hadith-animals",
  branch: { title: "Kind to animals", description: "A mother bird's young, a thin camel, the rooster that wakes you, a cat at the water, never a living target, and getting down to talk." },
  name: "kindness to animals",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "the-mother-bird",
      title: "The mother bird",
      line: "Give the baby birds back to their mother, he ﷺ said.",
      facts: [
        "Abdullah ibn Mas'ud was on a journey with him ﷺ.",
        "Some people took a bird's two young ones.",
        "The mother bird came, flapping her wings."
      ],
      source: hadith("abudawud", "2675", "Abdullah ibn Mas'ud", "Sahih (Al-Albani)", "Abdullah ibn Mas'ud said: on a journey we saw a bird with her two young ones, and we took them. The mother bird came, spreading her wings. The Prophet ﷺ came and said: who has upset her by taking her young? Give her young ones back to her. He also saw an ant village that had been burnt, and said: only the Lord of the fire may punish with fire.", "Who grieved this for its young ones? Return its young ones to it"),
      difficulty: 1,
      questions: [
        { q: "What did the people take from the mother bird?", a: "Her two young ones", wrong: ["Her nest of sticks", "Her food and water", "Her long feathers"], why: "The mother bird came, spreading her wings." },
        { q: "What did he ﷺ tell them to do?", a: "Give her young back", wrong: ["Keep them as pets", "Let them fly away", "Sell them in town"], why: "Return its young ones to it, he ﷺ said." },
        { q: "He ﷺ said it was fine to burn the ants' home with fire.", tf: false, why: "No. Only the Lord of the fire may punish with fire, he ﷺ said." }
      ]
    },
    {
      slug: "the-thin-camel",
      title: "The thin camel",
      line: "Animals cannot speak, so fear Allah in how you treat them.",
      facts: [
        "Sahl ibn al-Hanzaliyyah told it.",
        "He ﷺ came upon a very thin camel.",
        "Ride animals only when they are fit and strong."
      ],
      source: hadith("abudawud", "2548", "Sahl ibn al-Hanzaliyyah", "Sahih (Al-Albani)", "The Messenger of Allah ﷺ came upon a very thin camel and said: fear Allah about these animals that cannot speak. Ride them only when they are in good condition.", "Fear Allah regarding these dumb animals. Ride them when they are in good condition"),
      difficulty: 1,
      questions: [
        { q: "What kind of camel did he ﷺ come upon?", a: "A very thin camel", wrong: ["A very fast camel", "A camel with a calf", "A camel that could talk"], why: "He came upon an emaciated camel, Sahl said." },
        { q: "What should we do about animals that cannot speak?", a: "Fear Allah in how we treat them", wrong: ["Leave them in the sun", "Work them all day long", "Keep them hungry"], why: "Fear Allah regarding these dumb animals, he ﷺ said." },
        { q: "Animals should be ridden only when they are fit and strong.", tf: true, why: "Ride them when they are in good condition, he ﷺ said." }
      ]
    },
    {
      slug: "the-rooster",
      title: "Do not curse the rooster",
      line: "Never curse the rooster: it wakes people up for prayer.",
      facts: [
        "Zayd ibn Khalid heard the Prophet ﷺ say it.",
        "Do not say bad words to the rooster.",
        "Its crowing wakes people for prayer."
      ],
      source: hadith("abudawud", "5101", "Zayd ibn Khalid", "Sahih (Al-Albani)", "The Prophet ﷺ said: do not curse the rooster, for it wakes people up for prayer.", "Do not curse the cock, for it awakens for prayer"),
      difficulty: 1,
      questions: [
        { q: "Why should you never curse the rooster?", a: "It wakes people for prayer", wrong: ["It sings sweet songs", "It is very small", "It guards the house"], why: "Do not curse the cock, for it awakens for prayer." },
        { q: "Who heard the Prophet ﷺ say not to curse the rooster?", a: "Zayd ibn Khalid", wrong: ["Abu Hurairah", "Anas ibn Malik", "Abdullah ibn Umar"], why: "Zayd ibn Khalid al-Juhani told it, in Abu Dawud." },
        { q: "Cursing a rooster is fine if it is noisy.", tf: false, why: "No. Do not curse the rooster, for it wakes people for prayer." }
      ]
    },
    {
      slug: "the-cat-and-the-water",
      title: "The cat at the water",
      line: "Abu Qatadah tilted his water so a thirsty cat could drink.",
      facts: [
        "Kabshah poured water for his wudu.",
        "A cat came, and he let it drink.",
        "Cats live and roam among us."
      ],
      source: hadith("tirmidhi", "92", "Abu Qatadah", "Sahih (Al-Albani)", "Kabshah bint Ka'b said: Abu Qatadah came to visit, and I poured water for his wudu. A cat came to drink, so he tilted the vessel until it drank. He saw me looking and said: are you surprised, my niece? The Messenger of Allah ﷺ said: it is not impure; it is one of those that roam around among you.", "It is not impure, it is only one of those roam around among you"),
      difficulty: 1,
      questions: [
        { q: "What did Abu Qatadah do when the cat came?", a: "He tilted the vessel for it", wrong: ["He chased it away", "He covered the water", "He poured the water out"], why: "A cat came to drink, so he lowered the container until it drank." },
        { q: "What did the Prophet ﷺ say about cats?", a: "They roam around among us", wrong: ["They must stay outside", "They bring bad luck", "They are impure"], why: "It is not impure, it is only one of those that roam around among you." },
        { q: "A cat makes water impure when it drinks from it.", tf: false, why: "No. The cat is not impure, he ﷺ said." }
      ]
    },
    {
      slug: "not-a-target",
      title: "Not a target",
      line: "Never use a living thing as a target to shoot at.",
      facts: [
        "Ibn Abbas told it.",
        "A living thing is anything with a soul.",
        "He ﷺ forbade using one as a target."
      ],
      source: hadith("tirmidhi", "1475", "Ibn Abbas", "Sahih (Al-Albani)", "Ibn Abbas said: the Messenger of Allah ﷺ forbade taking anything with a soul as a target to shoot at.", "prohibited taking a living thing as a shooting target"),
      difficulty: 1,
      questions: [
        { q: "What must never be used as a target?", a: "A living thing", wrong: ["A wooden board", "A pile of stones", "A tree stump"], why: "He ﷺ prohibited taking a living thing as a shooting target." },
        { q: "Who told the hadith about targets?", a: "Ibn Abbas", wrong: ["Abu Bakr", "Anas ibn Malik", "Salman al-Farsi"], why: "Ibn Abbas said the Messenger of Allah ﷺ prohibited it." },
        { q: "Using a bird as a target for fun is allowed.", tf: false, why: "No. He ﷺ forbade taking a living thing as a target." }
      ]
    },
    {
      slug: "not-a-pulpit",
      title: "Not a pulpit to sit on",
      line: "Do not sit chatting on an animal's back: get down to talk.",
      facts: [
        "Abu Hurairah heard the Prophet ﷺ say it.",
        "A pulpit is a raised seat for speaking.",
        "Allah made animals to carry us far."
      ],
      source: hadith("abudawud", "2567", "Abu Hurairah", "Sahih (Al-Albani)", "The Prophet ﷺ said: do not treat the backs of your animals as pulpits. Allah made them serve you only to carry you to a land you could not reach without hardship, and He made the earth for you, so do your business on it.", "Do not treat the backs of your beasts as pulpits"),
      difficulty: 2,
      questions: [
        { q: "What should you not treat an animal's back like?", a: "A pulpit to sit and talk on", wrong: ["A bed to sleep on", "A table to eat on", "A shelf for books"], why: "Do not treat the backs of your beasts as pulpits, he ﷺ said." },
        { q: "Why did Allah make animals serve us, he ﷺ said?", a: "To carry us far", wrong: ["To win races", "To show off", "To stand all day"], why: "To convey you to a town which you cannot reach without difficulty." },
        { q: "You should get down and do your talking on the ground.", tf: true, why: "He has made the earth for you, so do your business on it." }
      ]
    }
  ]
};

export const KIDS_ANIMALS_UNITS: DeepUnit[] = [ANIMALS];
