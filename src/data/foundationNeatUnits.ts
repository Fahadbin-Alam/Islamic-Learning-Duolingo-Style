import { hadith, type DeepUnit } from "./deepKit";

// One more Foundations unit: sunnahs of looking neat, from Sunan Abi Dawud, Jami at-Tirmidhi and Sunan an-Nasa'i.
// Combed hair and washed clothes, caring for your hair, white clothes, showing the trace of Allah's blessings, the
// siwak, and musk as the best of perfumes. Every card is one sahih or hasan hadith with its number, narrator and
// grade, and its exact English words to highlight. Points the schools differ on are left out, and none of these
// hadith is taught anywhere else in the app.

const NEAT: DeepUnit = {
  key: "found-looking-neat",
  topicId: "foundation",
  branchId: "foundation-looking-neat",
  branch: { title: "Sunnahs of looking neat", description: "Combed hair and washed clothes, caring for your hair, white clothes, the trace of Allah's blessings, the siwak, and the best of perfumes." },
  name: "sunnahs of looking neat",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "combed-and-washed",
      title: "Combed and washed",
      line: "He ﷺ wanted messy hair combed and dirty clothes washed.",
      facts: ["Told by Jabir ibn Abdullah", "One man came with untidy hair", "Another man wore dirty clothes"],
      source: hadith("abudawud", "4062", "Jabir ibn Abdullah", "Sahih (Al-Albani)", "Jabir ibn Abdullah said: the Messenger of Allah ﷺ visited us and saw a man with untidy hair. He said: could this man not find something to smooth his hair? He saw another man wearing dirty clothes and said: could this man not find something to wash his clothes with?", "Could this man not find something to make his hair lie down"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ want for the man with untidy hair?", a: "Something to smooth his hair", wrong: ["A hat to hide it", "A seat in the shade", "A cup of water"], why: "Could this man not find something to make his hair lie down, he ﷺ asked." },
        { q: "What did the man in dirty clothes need, he ﷺ said?", a: "Something to wash his clothes", wrong: ["A new pair of shoes", "A bigger tent", "A faster horse"], why: "Could this man not find something to wash his garments with, he ﷺ asked." },
        { q: "He ﷺ wanted a man with untidy hair to smooth it.", tf: true, why: "Could this man not find something to make his hair lie down, he ﷺ asked." }
      ]
    },
    {
      slug: "care-for-your-hair",
      title: "Care for your hair",
      line: "Whoever has hair should take good care of it.",
      facts: ["Told by Abu Hurairah", "Honor it: keep it clean and combed", "Caring for yourself is part of the Sunnah"],
      source: hadith("abudawud", "4163", "Abu Hurairah", "Hasan Sahih (Al-Albani)", "Abu Hurairah said: the Prophet ﷺ said: whoever has hair should honor it.", "He who has hair should honour it"),
      difficulty: 1,
      questions: [
        { q: "What should someone with hair do, he ﷺ said?", a: "Honor it", wrong: ["Hide it under a cloth", "Leave it untidy", "Never wash it"], why: "He who has hair should honour it, he ﷺ said." },
        { q: "What does honoring your hair mean?", a: "Keeping it clean and combed", wrong: ["Showing it off to people", "Never touching it", "Growing it to the ground"], why: "Honor it: keep it washed and combed, not left untidy." },
        { q: "Taking care of our hair is part of the Sunnah.", tf: true, why: "He who has hair should honour it, the Prophet ﷺ said." }
      ]
    },
    {
      slug: "white-clothes",
      title: "White clothes",
      line: "Wear white, he ﷺ said, for it is among your best clothes.",
      facts: ["Told by Abdullah ibn Abbas", "White is among the best of clothes", "The dead are wrapped in white too"],
      source: hadith("abudawud", "4061", "Abdullah ibn Abbas", "Sahih (Al-Albani)", "Ibn Abbas said: the Prophet ﷺ said: wear white clothes, for they are among your best clothes, and wrap your dead in them.", "Wear your white garments, for they are among your best garments, and shroud your dead in them"),
      difficulty: 1,
      questions: [
        { q: "Which clothes did he ﷺ call among our best?", a: "White clothes", wrong: ["Black clothes", "Red clothes", "Green clothes"], why: "Wear your white garments, for they are among your best garments, he ﷺ said." },
        { q: "What else did he ﷺ say to do with white cloth?", a: "Wrap the dead in it", wrong: ["Hang it on the door", "Wrap gifts in it", "Spread it on the road"], why: "And shroud your dead in them, he ﷺ said of white garments." },
        { q: "He ﷺ called white clothes among our best clothes.", tf: true, why: "Wear your white garments, for they are among your best garments, he ﷺ said." }
      ]
    },
    {
      slug: "the-trace-of-his-blessings",
      title: "Show Allah's blessings",
      line: "Allah loves to see the trace of His blessings on us.",
      facts: ["Told by Abdullah ibn Amr", "Look clean and neat with what Allah gave you", "Thank Allah by using His gifts well"],
      source: hadith("tirmidhi", "2819", "Abdullah ibn Amr", "Hasan Sahih (Al-Albani)", "Amr ibn Shu'ayb narrated from his father, from his grandfather Abdullah ibn Amr, that the Messenger of Allah ﷺ said: Allah loves to see the trace of His blessings on His servant.", "Indeed Allah loves to see the results of his favors upon His Slaves"),
      difficulty: 2,
      questions: [
        { q: "What does Allah love to see on His servant?", a: "The trace of His blessings", wrong: ["Signs of pride", "Torn, dirty clothes", "Gold on every finger"], why: "Allah loves to see the results of His favors upon His slaves, he ﷺ said." },
        { q: "Allah has given you good things. How should you look?", a: "Clean and neat, showing His gift", wrong: ["Messy, to hide it", "Proud and showing off", "Sad and gloomy"], why: "Allah loves to see the results of His favors upon His slaves, he ﷺ said." },
        { q: "Allah loves to see the trace of His blessings on His servant.", tf: true, why: "Indeed Allah loves to see the results of His favors upon His slaves, he ﷺ said." }
      ]
    },
    {
      slug: "the-siwak",
      title: "Siwak for a fresh mouth",
      line: "The siwak cleans the mouth and pleases the Lord.",
      facts: ["Told by Aishah", "A siwak is a twig for cleaning teeth", "A clean mouth pleases Allah"],
      source: hadith("nasai", "5", "Aishah", "Sahih (Al-Albani)", "Aishah said: the Prophet ﷺ said: the siwak cleans the mouth and pleases the Lord.", "Siwak is a means of purification for the mouth and is pleasing to the Lord"),
      difficulty: 1,
      questions: [
        { q: "What two things does the siwak do, he ﷺ said?", a: "Cleans the mouth, pleases the Lord", wrong: ["Makes you strong and tall", "Cools the head and feet", "Fills you up like food"], why: "Siwak is a means of purification for the mouth and is pleasing to the Lord, he ﷺ said." },
        { q: "What is a siwak?", a: "A twig for cleaning teeth", wrong: ["A kind of bread", "A water jug", "A prayer mat"], why: "The siwak is a small twig used to clean the teeth and mouth." },
        { q: "Using the siwak is pleasing to Allah.", tf: true, why: "Siwak is a means of purification for the mouth and is pleasing to the Lord, he ﷺ said." }
      ]
    },
    {
      slug: "musk-the-best-scent",
      title: "Musk, the best scent",
      line: "He ﷺ said musk is the best of our perfumes.",
      facts: ["Told by Abu Sa'id al-Khudri", "He ﷺ was asked about musk", "Perfume was dear to him ﷺ"],
      source: hadith("tirmidhi", "992", "Abu Sa'id al-Khudri", "Sahih (Al-Albani)", "Abu Sa'id al-Khudri said: the Prophet ﷺ was asked about musk, and he said: it is the best of your perfumes.", "It is the best of your perfumes"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ call the best of our perfumes?", a: "Musk", wrong: ["Rose", "Saffron", "Amber"], why: "He ﷺ was asked about musk and said: it is the best of your perfumes." },
        { q: "What kind of thing is musk?", a: "A perfume", wrong: ["A fruit", "A cloth", "A stone"], why: "It is the best of your perfumes, he ﷺ said when asked about musk." },
        { q: "He ﷺ called musk the best of perfumes.", tf: true, why: "It is the best of your perfumes, he ﷺ said when asked about musk." }
      ]
    }
  ]
};

export const FOUNDATION_NEAT_UNITS: readonly DeepUnit[] = [NEAT];
