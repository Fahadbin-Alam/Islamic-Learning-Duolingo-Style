import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Al-Mu'minun ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Mu'minun 21:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_23_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Mu'minun 23:${ayah}`,
    url: `https://quran.com/23:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 23:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}


const q23 = (ayah: number) => quranQuote(23, ayah);

/** Ayahs 1 to 50: the qualities of the successful believers, signs in our creation, rain, olives and cattle, and Nuh, Musa and Isa. */
const MUMINUN_ONE: DeepUnit = {
  key: "muminun1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-23",
  name: "Al-Mu'minun, ayahs 1 to 50",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Mu'minun",
  lessons: [
    {
      slug: "successful-believers",
      title: "The successful believers",
      line: "Allah says the believers are truly successful.",
      facts: ["The surah lists their qualities", "Success means winning Allah's blessing"],
      quote: q23(1),
      source: ik(1, "Al-Mu'minun opens: successful indeed are the believers. They have won and are blessed. Then Allah lists their qualities one by one.", "they have attained victory and are blessed"),
      difficulty: 2,
      questions: [
        { q: "Who are successful, in 23:1?", a: "The believers", wrong: ["The rich", "The strong", "The famous"], why: "Successful indeed are the believers." },
        { q: "What does successful mean, per Ibn Kathir?", a: "Won and blessed", wrong: ["Became rich", "Became famous", "Lived long"], why: "They have attained victory and are blessed, for they have succeeded." },
        { tf: true, q: "Al-Mu'minun goes on to describe the believers' qualities.", why: "These are the believers who have the following characteristics." }
      ]
    },
    {
      slug: "khushu-in-salah",
      title: "Khushu in Salah",
      line: "Successful believers pray with humble, calm hearts.",
      facts: ["Khushu is in the heart", "Empty the heart of other things"],
      quote: q23(2),
      source: ik(2, "The believers are humble in their prayer. Ibn Abbas said khushu means fear and calm. It is in the heart, and comes to one who empties his heart for the prayer.", "means those with fear and with tranquillity"),
      difficulty: 2,
      questions: [
        { q: "How do believers pray, in 23:2?", a: "With khushu", wrong: ["In a rush", "Only on Fridays", "Without focus"], why: "Those who with their Salah are Khashi'un." },
        { q: "What is khushu, per Ibn Abbas?", a: "Fear and tranquillity", wrong: ["Loud voice", "Long sleep", "Fast movements"], why: "Khashi'un means those with fear and with tranquillity." },
        { q: "Where is khushu, per Ali?", a: "In the heart", wrong: ["In the clothes", "In the voice", "In the hands"], why: "It was reported from Ali that Khushu means the Khushu of the heart." }
      ]
    },
    {
      slug: "turn-from-idle-talk",
      title: "Turning from idle talk",
      line: "Believers turn away from useless and false talk.",
      facts: ["Laghw is anything of no benefit", "Pass by it with dignity"],
      quote: q23(3),
      source: ik(3, "The believers turn away from laghw: falsehood, sin, and any words or deeds that bring no benefit. When they pass by it, they pass with dignity.", "any words or deeds that are of no benefit"),
      difficulty: 2,
      questions: [
        { q: "What do believers turn away from, in 23:3?", a: "Al-Laghw, idle talk", wrong: ["Their prayers", "Their families", "Good advice"], why: "And those who turn away from Al-Laghw." },
        { q: "What does Laghw include, per Ibn Kathir?", a: "Anything of no benefit", wrong: ["Only songs", "Only lies", "Only trade"], why: "Falsehood, which includes Shirk and sin, and any words or deeds that are of no benefit." },
        { tf: true, q: "Believers pass by idle talk with dignity.", why: "And if they pass by Al-Laghw, they pass by it with dignity." }
      ]
    },
    {
      slug: "pay-the-zakah",
      title: "They pay the zakah",
      line: "Believers give zakah, purifying their wealth and souls.",
      facts: ["Zakah of wealth", "Purifying the soul too"],
      quote: q23(4),
      source: ik(4, "The believers pay zakah. This may mean the zakah of wealth, or purifying the soul from shirk and filth; both may be meant, and the true believer cares for both.", "the true believer is one who pays attention to both matters"),
      difficulty: 3,
      questions: [
        { q: "What do believers pay, in 23:4?", a: "Zakah", wrong: ["Taxes to kings", "Bribes", "Nothing"], why: "And those who pay the Zakah." },
        { q: "What two meanings of zakah does Ibn Kathir give?", a: "Purifying wealth and soul", wrong: ["Buying and selling", "Eating and drinking", "Walking and riding"], why: "It could be that both meanings are intended, purification of the soul and of one's wealth." },
        { tf: true, q: "Ibn Kathir says the true believer cares for both meanings.", why: "The true believer is one who pays attention to both matters." }
      ]
    },
    {
      slug: "keep-trusts-promises",
      title: "Keeping trusts and promises",
      line: "Believers keep what they are trusted with and keep promises.",
      facts: ["Betraying trust is a sign of hypocrisy", "Be true to your word"],
      quote: q23(8),
      source: hadith("bukhari", "33", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said the signs of a hypocrite are three: when he speaks he lies, when he promises he breaks it, and when trusted he is dishonest.", "The signs of a hypocrite are three"),
      difficulty: 3,
      questions: [
        { q: "What do believers guard, in 23:8?", a: "Their trusts and covenants", wrong: ["Their gold only", "Their secrets from Allah", "Their pride"], why: "Those who are faithfully true to their Amanat and to their covenants." },
        { q: "How many signs of a hypocrite are named?", a: "Three", wrong: ["One", "Five", "Ten"], why: "The signs of a hypocrite are three." },
        { q: "Which is a sign of a hypocrite?", a: "Breaking promises", wrong: ["Praying on time", "Giving charity", "Visiting the sick"], why: "Whenever he promises, he always breaks it." }
      ]
    },
    {
      slug: "guard-the-prayers",
      title: "Guarding the prayers",
      line: "The list of qualities begins and ends with Salah.",
      facts: ["Pray on time", "Salah is the best of deeds"],
      quote: q23(9),
      source: hadith("bukhari", "527", "Abdullah ibn Mas'ud", "Sahih", "Ibn Mas'ud asked which deed Allah loves most. The Prophet ﷺ said: prayer at its time, then kindness to parents.", "To offer the prayers at their early stated fixed times"),
      difficulty: 3,
      questions: [
        { q: "What do believers strictly guard, in 23:9?", a: "Their prayers", wrong: ["Their wealth", "Their houses", "Their names"], why: "And those who strictly guard their Salawat." },
        { q: "Which deed does Allah love most, per the hadith?", a: "Prayer on time", wrong: ["Long travel", "Big feasts", "Fine clothes"], why: "To offer the prayers at their early stated fixed times." },
        { q: "What came next after prayer, per the hadith?", a: "Kindness to parents", wrong: ["Trade", "Sleep", "Poetry"], why: "To be good and dutiful to your parents." }
      ]
    },
    {
      slug: "heirs-of-firdaws",
      title: "Heirs of Al-Firdaws",
      line: "Believers with these qualities inherit Al-Firdaws forever.",
      facts: ["Al-Firdaws is the highest Paradise", "Ask Allah for it"],
      quote: q23(11),
      source: hadith("bukhari", "2790", "Abu Hurairah", "Sahih", "The Prophet ﷺ said Paradise has a hundred levels, and when you ask Allah, ask Him for Al-Firdaws, the best and highest part of Paradise.", "ask for Al-firdaus which is the best and highest part of Paradise"),
      difficulty: 3,
      questions: [
        { q: "What will the believers inherit, in 23:11?", a: "Al-Firdaws", wrong: ["A kingdom on earth", "Gold mines", "Nothing"], why: "Who shall inherit Firdaws. They shall dwell therein forever." },
        { q: "What should we ask Allah for, per the hadith?", a: "Al-Firdaws", wrong: ["A long life only", "Wealth only", "Fame"], why: "Ask for Al-Firdaus which is the best and highest part of Paradise." },
        { tf: true, q: "Believers stay in Al-Firdaws forever.", why: "They shall dwell therein forever." }
      ]
    },
    {
      slug: "best-of-creators",
      title: "Blessed is the Best of creators",
      line: "Allah made Adam from clay, then us stage by stage.",
      facts: ["Adam was made from clay", "Then we die and are raised"],
      quote: q23(14),
      source: ik(14, "Allah created Adam from an extract of clay, then made his children grow stage by stage until a complete human. So blessed is Allah, the Best of creators. Then we die and are raised again.", "So Blessed is Allah, the Best of creators"),
      difficulty: 3,
      questions: [
        { q: "What was man first created from, in 23:12?", a: "An extract of clay", wrong: ["Fire", "Light", "Water only"], why: "And indeed We created man out of an extract of Tin." },
        { q: "What does 23:14 say about Allah?", a: "Blessed, Best of creators", wrong: ["Far and silent", "One of many", "Tired"], why: "So Blessed is Allah, the Best of creators." },
        { q: "What comes after death, in 23:16?", a: "Being raised on Resurrection Day", wrong: ["Nothing", "Coming back as animals", "Sleep forever"], why: "Then again, surely you will be resurrected on the Day of Resurrection." }
      ]
    },
    {
      slug: "adam-from-every-earth",
      title: "From every part of the earth",
      line: "Adam was made from soil of the whole earth, so we vary.",
      facts: ["Red, white, black and between", "All are children of Adam"],
      quote: q23(12),
      source: ik(12, "The Prophet ﷺ said Allah created Adam from a handful taken from all over the earth, so his children came in all colours: red, white, black and in between.", "Allah created Adam from a handful which He picked up from throughout the earth"),
      difficulty: 4,
      questions: [
        { q: "From where was Adam's handful taken, per the hadith?", a: "Throughout the earth", wrong: ["One mountain", "One river", "The sky"], why: "Allah created Adam from a handful which He picked up from throughout the earth." },
        { q: "Why do people differ in colour, per the hadith?", a: "Adam came from all the earth", wrong: ["The sun", "Their food", "Their clothes"], why: "So the sons of Adam came forth accordingly, red and white and black and in between." },
        { tf: true, q: "All people of every colour are children of Adam.", why: "The sons of Adam came forth accordingly, red and white and black and in between." }
      ]
    },
    {
      slug: "seven-heavens-above",
      title: "Seven heavens above",
      line: "Allah made seven heavens above us and never ignores creation.",
      facts: ["Nothing is hidden from Him", "He knows every leaf that falls"],
      quote: q23(17),
      source: ik(17, "Allah created seven heavens above us and is never unaware of His creation. He knows what goes into the earth and comes out, and what comes down from the sky and goes up.", "Allah knows what goes into the earth and what comes out of it"),
      difficulty: 4,
      questions: [
        { q: "How many heavens are above us, in 23:17?", a: "Seven", wrong: ["Three", "Five", "Ten"], why: "And indeed We have created above you seven Tara'iq." },
        { q: "Is Allah ever unaware of creation, in 23:17?", a: "Never", wrong: ["Sometimes", "At night", "When busy"], why: "And We are never unaware of the creation." },
        { q: "What does Tara'iq mean, per Mujahid?", a: "The seven heavens", wrong: ["Seven roads", "Seven seas", "Seven clouds"], why: "Mujahid said, This means the seven heavens." }
      ]
    },
    {
      slug: "rain-in-measure",
      title: "Rain in due measure",
      line: "Allah sends rain in just the right amount we need.",
      facts: ["Not too much, not too little", "He could take it away"],
      quote: q23(18),
      source: ik(18, "Allah sends rain in measure: not so much that it ruins land and buildings, not so little that crops fail. He stores it in the earth, and could take it away if He willed.", "not so much that it damages the lands and buildings"),
      difficulty: 4,
      questions: [
        { q: "How does Allah send rain, in 23:18?", a: "In measure", wrong: ["Randomly", "Only in winter", "Without limit"], why: "And We sent down from the sky water in measure." },
        { q: "What does in measure mean, per Ibn Kathir?", a: "Just what is needed", wrong: ["As much as possible", "Very little", "Only on deserts"], why: "Not so much that it damages the lands and buildings, and not so little to be insufficient." },
        { tf: true, q: "Allah could take the water away if He willed.", why: "And verily, We are able to take it away." }
      ]
    },
    {
      slug: "olive-of-sinai",
      title: "The olive of Sinai",
      line: "Allah grows dates, grapes, and the olive tree of Mount Sinai.",
      facts: ["Olive gives oil and food", "Mount Sinai where Musa was spoken to"],
      quote: q23(20),
      source: ik(20, "Rain brings gardens of dates and grapes, and the olive tree from Mount Sinai, where Allah spoke to Musa. It gives oil and a food to eat with bread.", "means the olive tree"),
      difficulty: 4,
      questions: [
        { q: "Which tree springs from Tur Sinai, per Ibn Kathir?", a: "The olive tree", wrong: ["The palm tree", "The fig tree", "The pine tree"], why: "And a tree that springs forth from Tur Sinai means the olive tree." },
        { q: "What does the tree grow, in 23:20?", a: "Oil and relish", wrong: ["Wool", "Honey", "Silk"], why: "That grows oil, and relish for the eaters." },
        { q: "What happened on Mount Sinai, per Ibn Kathir?", a: "Allah spoke to Musa", wrong: ["The Ark landed", "Ibrahim built the House", "Yunus left the fish"], why: "It is the mountain on which Allah spoke to Musa bin Imran." }
      ]
    },
    {
      slug: "lesson-in-cattle",
      title: "A lesson in cattle",
      line: "Cattle give us milk, food and rides; ships carry us too.",
      facts: ["Milk from their bellies", "Wool, meat and carrying loads"],
      quote: q23(21),
      source: ik(21, "In cattle is a lesson: we drink their milk, eat their meat, wear their wool, ride on them and they carry heavy loads to far lands. On them and on ships we are carried.", "they ride on their backs and carry heavy burdens on them to far away lands"),
      difficulty: 4,
      questions: [
        { q: "What do we drink from cattle, in 23:21?", a: "Their milk", wrong: ["Their water", "Their oil", "Nothing"], why: "We give you to drink of that which is in their bellies." },
        { q: "On what two things are we carried, in 23:22?", a: "Cattle and ships", wrong: ["Clouds and birds", "Wind and rain", "Fish and whales"], why: "And on them, and on ships you are carried." },
        { q: "Which is NOT a cattle benefit, per Ibn Kathir?", a: "Making rain", wrong: ["Milk", "Wool", "Carrying loads"], why: "They drink their milk, eat their meat, clothe themselves with wool, and ride them." }
      ]
    },
    {
      slug: "nuh-only-a-human",
      title: "Only a human like you",
      line: "Nuh's chiefs mocked him for being a human like them.",
      facts: ["He called them to worship Allah alone", "They wanted an angel instead"],
      quote: q23(24),
      source: ik(24, "Nuh told his people to worship Allah alone. The chiefs said he was only a human like them seeking to rise above them, and that Allah would have sent angels.", "he is putting himself above you and trying to make himself great"),
      difficulty: 4,
      questions: [
        { q: "What did Nuh call his people to, in 23:23?", a: "Worship Allah alone", wrong: ["Build a city", "Make him king", "Leave the land"], why: "O my people! Worship Allah! You have no other God but Him." },
        { q: "What did the chiefs say about Nuh, in 23:24?", a: "Only a human like you", wrong: ["An angel", "A king", "A jinn"], why: "He is no more than a human being like you." },
        { q: "Whom did they say Allah would send, in 23:24?", a: "Angels", wrong: ["Kings", "Birds", "Giants"], why: "Had Allah willed, He surely could have sent down angels." }
      ]
    },
    {
      slug: "dua-of-the-ark",
      title: "Duas on the Ark",
      line: "Nuh praised Allah on board and asked for a blessed landing.",
      facts: ["Mention Allah at start and end of travel", "Allah is Best of those who bring to land"],
      quote: q23(29),
      source: ik(29, "Nuh was told to build the ship. Once aboard he praised Allah for saving them, and asked: My Lord, land me at a blessed place. He remembered Allah at the start and end of the journey.", "Nuh mentioned Allah at the beginning of his journey and at the end"),
      difficulty: 5,
      questions: [
        { q: "What was Nuh told to say once aboard, in 23:28?", a: "All praise is for Allah who saved us", wrong: ["We are strong", "Let us go fast", "Who will steer?"], why: "All the praise be to Allah, Who has saved us from the people who are wrongdoers." },
        { q: "What landing did Nuh ask for, in 23:29?", a: "A blessed landing place", wrong: ["A rich city", "A high tower", "Any shore"], why: "My Lord! Cause me to land at a blessed landing place." },
        { tf: true, q: "Nuh remembered Allah at the start and end of his journey.", why: "So Nuh mentioned Allah at the beginning of his journey and at the end." }
      ]
    },
    {
      slug: "they-eat-what-you-eat",
      title: "He eats what you eat",
      line: "Later nations also refused a Messenger who ate and drank.",
      facts: ["They denied the Hereafter", "They thought dust cannot live again"],
      quote: q23(33),
      source: ik(33, "After Nuh, Allah sent another Messenger from among a people. Their wealthy chiefs said he eats and drinks like you, and denied being raised after becoming dust and bones.", "they refused to follow a human Messenger"),
      difficulty: 5,
      questions: [
        { q: "Why did the chiefs reject him, in 23:33?", a: "He ate and drank like them", wrong: ["He was too rich", "He was a stranger", "He was silent"], why: "He is no more than a human being like you, he eats of that which you eat." },
        { q: "What did they deny, in 23:35?", a: "Being raised after death", wrong: ["The sun", "Rain", "Their own names"], why: "Does he promise you that when you have died and become dust and bones, you shall come out alive?" },
        { q: "What had Allah given those chiefs, in 23:33?", a: "Luxuries of this life", wrong: ["Prophethood", "Nothing", "Hardship only"], why: "Whom We had given the luxuries and comforts of worldly life." }
      ]
    },
    {
      slug: "no-nation-advances-term",
      title: "Every nation has its term",
      line: "No nation can bring its end forward or delay it.",
      facts: ["Messengers came one after another", "Past nations became lessons"],
      quote: q23(43),
      source: ik(43, "Nations came one after another. None can hasten or delay its appointed term, which Allah wrote before creating them. Messengers came in succession, and past nations became stories and lessons.", "they are taken at the appropriate time, as decreed by Allah"),
      difficulty: 5,
      questions: [
        { q: "Can a nation change its term, in 23:43?", a: "No, neither earlier nor later", wrong: ["Yes, if strong", "Yes, if rich", "Only by voting"], why: "No nation can advance their term, nor can they delay it." },
        { q: "How did Messengers come, in 23:44?", a: "In succession", wrong: ["All at once", "Never", "Only one ever"], why: "Then We sent Our Messengers in succession." },
        { q: "What did past nations become, in 23:44?", a: "Stories and lessons", wrong: ["Kings", "Stars", "Mountains"], why: "And We made them as Ahadith meaning, stories and lessons for mankind." }
      ]
    },
    {
      slug: "musa-and-harun-sent",
      title: "Musa and Harun sent",
      line: "Musa and Harun came with signs; Fir'awn was too proud.",
      facts: ["Fir'awn said they were like us", "Musa was given the Tawrah"],
      quote: q23(45),
      source: ik(45, "Allah sent Musa and his brother Harun to Fir'awn with clear proof. Fir'awn and his chiefs were too proud to follow two humans. Then Allah gave Musa the Tawrah for guidance.", "He revealed the Book to Musa, i.e., the Tawrah"),
      difficulty: 5,
      questions: [
        { q: "Who was sent with Musa, in 23:45?", a: "His brother Harun", wrong: ["Yusuf", "Shu'ayb", "Khidr"], why: "Then We sent Musa and his brother Harun, with Our Ayat and manifest authority." },
        { q: "What were Fir'awn and his chiefs, in 23:46?", a: "Arrogant", wrong: ["Humble", "Grateful", "Afraid"], why: "But they behaved insolently and they were people self-exalting." },
        { q: "What Book was Musa given, per Ibn Kathir?", a: "The Tawrah", wrong: ["The Zabur", "The Injil", "The Suhuf"], why: "He revealed the Book to Musa, the Tawrah." }
      ]
    },
    {
      slug: "isa-and-maryam-a-sign",
      title: "Isa and Maryam a sign",
      line: "Isa and his mother are a sign of Allah's power.",
      facts: ["Adam had no father or mother", "Isa had no father"],
      quote: q23(50),
      source: ik(50, "Allah made Isa and his mother a sign of His power: He created Adam without father or mother, Hawwa from a male, and Isa from a female without a male. He sheltered them on high ground with flowing water.", "He created Adam without a father or a mother"),
      difficulty: 5,
      questions: [
        { q: "What did Allah make Isa and his mother, in 23:50?", a: "A sign", wrong: ["Rulers", "Merchants", "Judges"], why: "And We made the son of Maryam and his mother as a sign." },
        { q: "Who was created without a father or mother?", a: "Adam", wrong: ["Isa", "Yahya", "Nuh"], why: "He created Adam without a father or a mother." },
        { q: "What was their place of refuge like, in 23:50?", a: "High ground with flowing water", wrong: ["A dark cave", "A dry desert", "A busy market"], why: "We gave them refuge on high ground, a place of rest, security and flowing streams." }
      ]
    }
  ]
};

export const MUMINUN_UNITS: readonly DeepUnit[] = [MUMINUN_ONE];
