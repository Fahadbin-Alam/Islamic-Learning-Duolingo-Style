import { hadith, type DeepUnit } from "./deepKit";

// One more unit on the kids' Hadith path: his ﷺ kind ways, from Sahih al-Bukhari. A hand softer than silk, words so
// clear you could count them, a smile for a man who pulled his cloak, a cloak kept for Makhramah, a camel given to
// Ibn Umar, and a gift turned down so kindly that the giver was not sad. Every card is one sahih hadith with its
// number and narrator, and its exact English words to highlight, and none of them is taught anywhere else in the app.

const KIND_WAYS: DeepUnit = {
  key: "kids-kind-ways",
  topicId: "hadith",
  branchId: "hadith-kind-ways",
  branch: { title: "His ﷺ kind ways", description: "A hand softer than silk, words you could count, a smile for a rough man, a cloak kept for Makhramah, a camel given, and a gift kindly refused." },
  name: "his ﷺ kind ways",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "a-hand-softer-than-silk",
      title: "A hand softer than silk",
      line: "Anas never touched silk softer than his ﷺ hand.",
      facts: [
        "Anas ibn Malik told it.",
        "Anas served him ﷺ when he was a boy.",
        "Anas never smelled a scent nicer than his ﷺ."
      ],
      source: hadith("bukhari", "3561", "Anas ibn Malik", "Sahih", "Anas said: I never touched silk, thin or thick, softer than the palm of the Prophet ﷺ, and I never smelled a scent nicer than the scent of the Prophet ﷺ.", "I have never touched silk or Dibaj"),
      difficulty: 1,
      questions: [
        { q: "What did Anas compare his ﷺ hand to?", a: "Silk", wrong: ["Wool", "Cotton", "Leather"], why: "I never touched silk softer than the palm of the Prophet ﷺ, Anas said." },
        { q: "What did Anas say about his ﷺ scent?", a: "It was the nicest he ever smelled", wrong: ["It was like the desert wind", "It was like fresh bread", "It was like the sea"], why: "I never smelled a scent nicer than the scent of the Prophet ﷺ, Anas said." },
        { q: "Even silk was not as soft as his ﷺ hand, Anas said.", tf: true, why: "I have never touched silk or Dibaj softer than the palm of the Prophet ﷺ, Anas said." }
      ]
    },
    {
      slug: "words-you-could-count",
      title: "Words you could count",
      line: "He ﷺ spoke so clearly that you could count his words.",
      facts: [
        "Aishah told it.",
        "He ﷺ never spoke fast and unclearly.",
        "Anyone could count the words he ﷺ said."
      ],
      source: hadith("bukhari", "3567", "Aishah", "Sahih", "Aishah said: the Prophet ﷺ used to speak so clearly that anyone who wanted to count his words could count them. And she said: the Messenger of Allah ﷺ never spoke quickly and unclearly.", "used to talk so clearly that if somebody wanted to count the number of his words"),
      difficulty: 1,
      questions: [
        { q: "How did he ﷺ speak?", a: "Slowly and clearly", wrong: ["In long rhymes", "In a whisper", "In many languages"], why: "He ﷺ used to talk so clearly that you could count his words, Aishah said." },
        { q: "What could a person count when he ﷺ spoke?", a: "His ﷺ words", wrong: ["The stars", "His steps", "The people"], why: "If somebody wanted to count the number of his words, he could do so, Aishah said." },
        { q: "He ﷺ never rushed his words or spoke unclearly.", tf: true, why: "Allah's Messenger ﷺ never talked so quickly and vaguely, Aishah said." }
      ]
    },
    {
      slug: "a-smile-for-a-rough-man",
      title: "A smile for a rough man",
      line: "A man pulled his ﷺ cloak hard, and he ﷺ smiled.",
      facts: [
        "Anas ibn Malik told it.",
        "The cloak left a mark on his ﷺ shoulder.",
        "He ﷺ gave the man a gift."
      ],
      source: hadith("bukhari", "3149", "Anas ibn Malik", "Sahih", "Anas said: I was walking with the Prophet ﷺ, who wore a cloak from Najran with a thick hem. A bedouin came and pulled his cloak so hard that I saw the mark of its hem on his shoulder. The bedouin said: give me something from the wealth of Allah that you have. He ﷺ turned to him, smiled, and ordered that he be given a gift.", "turned to him and smiled, and ordered that a gift be given to him"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ do when the man pulled his cloak?", a: "He smiled and gave him a gift", wrong: ["He sat down to rest", "He asked for some water", "He gave the cloak to Anas"], why: "He ﷺ turned to him and smiled, and ordered that a gift be given to him." },
        { q: "What did the pull leave on his ﷺ shoulder?", a: "A mark from the cloak", wrong: ["A drop of water", "Some sand from the road", "A small leaf"], why: "I could see the mark of the hem of the garment on his shoulder, Anas said." },
        { q: "He ﷺ was gentle even with a rough man.", tf: true, why: "The bedouin pulled his garment hard, but he ﷺ turned to him and smiled." }
      ]
    },
    {
      slug: "we-kept-this-for-you",
      title: "We kept this for you",
      line: "He ﷺ saved a cloak for Makhramah and brought it out.",
      facts: [
        "Al-Miswar told it about his father, Makhramah.",
        "He ﷺ had shared out some cloaks.",
        "Makhramah looked at it, and he was pleased."
      ],
      source: hadith("bukhari", "2599", "Al-Miswar ibn Makhramah", "Sahih", "Al-Miswar said: the Messenger of Allah ﷺ shared out some cloaks and gave none to Makhramah. Makhramah said: my son, come with me to the Messenger of Allah ﷺ. When we got there, he said: call him for me. So I called him, and he ﷺ came out wearing one of those cloaks and said: we kept this for you. Makhramah looked at the cloak and said: Makhramah is pleased (or he ﷺ asked: is Makhramah pleased?).", "He came out wearing one of those cloaks and said"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ say when he came out to Makhramah?", a: "We kept this for you", wrong: ["Bring me some water", "Come and eat with us", "Let us go to the masjid"], why: "He came out wearing one of those cloaks and said: we kept this for you." },
        { q: "How did Makhramah feel about the cloak?", a: "He was pleased", wrong: ["He was worried", "He was sleepy", "He was hungry"], why: "Makhramah looked at the cloak and was pleased, Al-Miswar said." },
        { q: "He ﷺ remembered Makhramah and kept a cloak for him.", tf: true, why: "We kept this cloak for you, he ﷺ said to Makhramah." }
      ]
    },
    {
      slug: "the-camel-is-yours",
      title: "The camel is yours",
      line: "He ﷺ bought Umar's camel and gave it to Ibn Umar.",
      facts: [
        "Abdullah ibn Umar told it.",
        "Abdullah was riding his father Umar's camel.",
        "The camel was hard to control."
      ],
      source: hadith("bukhari", "2611", "Abdullah ibn Umar", "Sahih", "Ibn Umar said: we were with the Prophet ﷺ on a journey, and I was riding a camel that was hard to control. The Prophet ﷺ asked Umar to sell him that camel, and Umar sold it to him. Then he ﷺ said: O Abdullah, the camel is yours.", "on a journey, and I was riding a troublesome camel"),
      difficulty: 1,
      questions: [
        { q: "Who sold the camel to him ﷺ?", a: "Umar", wrong: ["Abu Bakr", "Uthman", "Bilal ibn Rabah"], why: "The Prophet ﷺ asked Umar to sell that camel to him, and Umar sold it." },
        { q: "What did he ﷺ say to Abdullah after buying it?", a: "The camel is yours", wrong: ["Ride it to Makkah", "Feed it well", "Sell it again"], why: "O Abdullah, the camel is for you, he ﷺ said." },
        { q: "He ﷺ gave the camel to Abdullah ibn Umar as a gift.", tf: true, why: "O Abdullah, the camel is for you, he ﷺ said, after Umar sold it to him." }
      ]
    },
    {
      slug: "we-did-not-refuse-your-gift",
      title: "We did not refuse your gift",
      line: "He ﷺ saw sadness on a giver's face, and kindly explained.",
      facts: [
        "As-Sa'b ibn Jaththamah told it.",
        "The gift was a wild donkey.",
        "He ﷺ was in ihram, the state of a pilgrim."
      ],
      source: hadith("bukhari", "2573", "As-Sa'b ibn Jaththamah", "Sahih", "As-Sa'b said: a wild donkey was given to the Messenger of Allah ﷺ at Al-Abwa or Waddan, and he did not accept it. When he ﷺ saw the sadness on the giver's face, he said: we have not refused your gift, but we are in ihram.", "We have not rejected your gift, but we are in the state of Ihram"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ see on the giver's face?", a: "Sadness", wrong: ["A big smile", "Dust from the road", "Sleepiness"], why: "He ﷺ noticed the signs of sorrow on the giver's face, As-Sa'b said." },
        { q: "Why could he ﷺ not take the gift?", a: "He was in ihram", wrong: ["He was fasting that day", "He had eaten already", "He wanted it for the poor"], why: "We have not rejected your gift, but we are in the state of ihram, he ﷺ said." },
        { q: "He ﷺ cared about the feelings of the man who gave the gift.", tf: true, why: "When he ﷺ saw the giver's sadness, he explained: we have not rejected your gift." }
      ]
    }
  ]
};

export const KIDS_KIND_WAYS_UNITS: DeepUnit[] = [KIND_WAYS];
