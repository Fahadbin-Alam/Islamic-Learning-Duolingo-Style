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

/** Ayahs 51 to 77: lawful food, one religion of all the Prophets, the people who hurry to good, and pondering the Quran. */
const MUMINUN_TWO: DeepUnit = {
  key: "muminun2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-23",
  name: "Al-Mu'minun, ayahs 51 to 77",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Mu'minun",
  lessons: [
    {
      slug: "eat-lawful-do-good",
      title: "Eat lawful food, do good",
      line: "Allah told the Messengers to eat good food and do good.",
      facts: ["Tayyibat means lawful, good food", "Lawful food helps you do good deeds"],
      quote: q23(51),
      source: ik(51, "Allah commands His Messengers and servants to eat lawful food and do righteous deeds. Ibn Kathir says this shows that eating what is lawful helps a person do good deeds.", "eating what is lawful helps one to do righteous deeds"),
      difficulty: 2,
      questions: [
        { q: "Who is spoken to first in 23:51?", a: "The Messengers", wrong: ["The angels", "The jinn", "The kings"], why: "O Messengers! Eat of the Tayyibat and do righteous deeds." },
        { q: "What does eating lawful food help with, per Ibn Kathir?", a: "Doing righteous deeds", wrong: ["Getting rich", "Sleeping well", "Growing tall"], why: "Eating what is lawful helps one to do righteous deeds." },
        { tf: true, q: "Sa'id bin Jubayr said Tayyibat means lawful things.", why: "Sa'id bin Jubayr and Ad-Dahhak said: this means lawful." }
      ]
    },
    {
      slug: "allah-is-good",
      title: "Allah is Good",
      line: "Allah is Good and accepts only what is good.",
      facts: ["The hadith quotes ayah 23:51", "Unlawful food blocks a person's dua"],
      quote: q23(51),
      source: hadith("muslim", "1015", "Abu Hurairah", "Sahih", "The Prophet ﷺ said Allah is Good and accepts only what is good. He told of a traveller raising his hands in dua while his food, drink and clothes were unlawful: how can his dua be answered?", "Allah is Good and He therefore, accepts only that which is good"),
      difficulty: 2,
      questions: [
        { q: "What does Allah accept, in the hadith?", a: "Only what is good", wrong: ["Anything at all", "Only gold", "Only long prayers"], why: "Allah is Good and He therefore, accepts only that which is good." },
        { q: "Why was the traveller's dua not answered?", a: "His food and clothes were unlawful", wrong: ["He prayed too quietly", "He was too tired", "He prayed too short"], why: "His diet is unlawful, his drink is unlawful, and his clothes are unlawful." },
        { tf: false, q: "Allah gave the believers different orders than the Messengers about food.", why: "Allah commanded the believers as He commanded the Messengers: eat of the good things." }
      ]
    },
    {
      slug: "prophets-were-shepherds",
      title: "Every Prophet was a shepherd",
      line: "Every Prophet tended sheep, and they ate from honest work.",
      facts: ["The Prophet ﷺ tended sheep in Makkah", "Dawud ate from his own handiwork"],
      quote: q23(51),
      source: hadith("bukhari", "2262", "Abu Hurairah", "Sahih", "The Prophet ﷺ said Allah did not send any Prophet who did not tend sheep. They asked about him, and he said: yes, I tended the sheep of the people of Makkah for a few qirats.", "Allah did not send any prophet but shepherded sheep"),
      difficulty: 2,
      questions: [
        { q: "What job did every Prophet do, in the hadith?", a: "Tending sheep", wrong: ["Building ships", "Selling cloth", "Making swords"], why: "Allah did not send any prophet but shepherded sheep." },
        { q: "Whose sheep did the Prophet ﷺ tend?", a: "The people of Makkah's", wrong: ["The king's", "His uncle's only", "Nobody's"], why: "Yes, I used to shepherd the sheep of the people of Mecca for some Qirats." },
        { tf: true, q: "Ibn Kathir mentions that Dawud ate from his own earnings.", why: "Dawud, upon him be peace, used to eat from the earnings of his own hand." }
      ]
    },
    {
      slug: "one-religion",
      title: "One religion for all",
      line: "All the Prophets brought one religion: worship Allah alone.",
      facts: ["Later nations split into sects", "Each group was happy with its own"],
      quote: q23(52),
      source: ik(52, "Allah says the religion of all the Prophets is one: the call to worship Allah alone with no partner. Later the nations broke it into sects, each group happy with what it had.", "which is the call to worship Allah Alone with no partner or associate"),
      difficulty: 3,
      questions: [
        { q: "How many religions did the Prophets bring, in 23:52?", a: "One", wrong: ["Two", "Seven", "One for each land"], why: "And verily, this your religion is one religion, and I am your Lord." },
        { q: "What was that one religion's call?", a: "Worship Allah alone", wrong: ["Worship the stars", "Worship the kings", "Worship the ancestors"], why: "The call to worship Allah Alone with no partner or associate." },
        { q: "What did the nations do after, in 23:53?", a: "Split into sects", wrong: ["Stayed united", "Built one city", "Forgot their names"], why: "But they have broken their religion among them into sects." }
      ]
    },
    {
      slug: "wealth-is-not-honor",
      title: "Wealth is not a sign of honor",
      line: "Money and children do not prove Allah is pleased with you.",
      facts: ["Some thought wealth meant Allah loved them", "Allah says: they perceive not"],
      quote: q23(55),
      source: ik(55, "Some deceived people thought their wealth and children showed that Allah honored them. Ibn Kathir says the matter is not as they claim: these were only given to test them and give them more time.", "think that what We give them of wealth and children is because they are honored"),
      difficulty: 3,
      questions: [
        { q: "What did some people think wealth proved?", a: "That Allah honored them", wrong: ["That they were sick", "That they were poor", "That they must share it all"], why: "Do these deceived people think that what We give them of wealth and children is because they are honored?" },
        { q: "What does Allah say about them, in 23:56?", a: "They perceive not", wrong: ["They are grateful", "They are right", "They are humble"], why: "We hasten unto them with good things. Nay, but they perceive not." },
        { tf: false, q: "Having lots of money always means Allah is pleased with you.", why: "But this thinking is wrong, and their hopes will be dashed." }
      ]
    },
    {
      slug: "in-awe-of-their-lord",
      title: "In awe of their Lord",
      line: "Good believers do good deeds and still stand in awe of Allah.",
      facts: ["They believe in His signs", "They worship none but Him"],
      quote: q23(57),
      source: ik(57, "Even though they do good and have faith, these believers stay in awe of Allah. Al-Hasan Al-Basri said the believer combines good deeds with awe, while the disbeliever combines bad deeds with feeling safe.", "The believer combines Ihsan with awe"),
      difficulty: 3,
      questions: [
        { q: "How do these believers live, in 23:57?", a: "In awe of their Lord", wrong: ["Proud of themselves", "Careless", "Without hope"], why: "Verily, those who live in awe for fear of their Lord." },
        { q: "What does the believer combine, per Al-Hasan?", a: "Ihsan with awe", wrong: ["Wealth with fame", "Sleep with play", "Anger with pride"], why: "The believer combines Ihsan with awe." },
        { q: "What do they not do, in 23:59?", a: "Join partners with Allah", wrong: ["Give charity", "Pray at night", "Believe in His signs"], why: "And those who join not anyone as partners with their Lord." }
      ]
    },
    {
      slug: "give-with-fearful-hearts",
      title: "Giving with humble hearts",
      line: "They give charity and worry it may not be good enough.",
      facts: ["They know they will return to Allah", "They hurry and race in good deeds"],
      quote: q23(60),
      source: ik(60, "These believers give charity while fearing it may not be accepted, because of some shortcoming in it. They are the ones who hurry to good deeds and are foremost in them.", "they give in charity, fearing that it may not be accepted from them"),
      difficulty: 3,
      questions: [
        { q: "Why do they fear when they give, per Ibn Kathir?", a: "It may not be accepted", wrong: ["They will become poor", "People will laugh", "They gave too much"], why: "They give in charity, fearing that it may not be accepted from them." },
        { q: "Why are their hearts full of fear, in 23:60?", a: "They will return to their Lord", wrong: ["They lost their money", "They are lost", "They forgot to pray"], why: "Because they are sure to return to their Lord." },
        { q: "What do they hasten in, in 23:61?", a: "Good deeds", wrong: ["Buying things", "Going to sleep", "Winning arguments"], why: "It is these who hasten in the good deeds, and they are foremost in them." }
      ]
    },
    {
      slug: "never-beyond-capacity",
      title: "Never more than you can bear",
      line: "Allah never asks a soul to do more than it can bear.",
      facts: ["A Book records every deed truly", "No one is wronged at all"],
      quote: q23(62),
      source: ik(62, "Allah is just: He does not burden any soul with more than it can bear. He keeps a true record of deeds, nothing good is left out, and He forgives many bad deeds of His believing servants.", "He does not burden any soul with more than it can bear"),
      difficulty: 3,
      questions: [
        { q: "How much does Allah task a person, in 23:62?", a: "Only within capacity", wrong: ["Double their strength", "Whatever is hardest", "Nothing at all"], why: "And We task not any person except according to his capacity." },
        { q: "What speaks the truth, in 23:62?", a: "A Record with Allah", wrong: ["The stars", "The wind", "A king's scroll"], why: "And with Us is a Record which speaks the truth." },
        { tf: true, q: "None of a believer's good deeds will be left out of the Record.", why: "Nothing will be omitted from their record of good deeds." }
      ]
    },
    {
      slug: "ponder-the-quran",
      title: "Pondering the Quran",
      line: "Allah asks: have they not pondered over the Quran?",
      facts: ["Pondering keeps a person from sin", "Believers try to understand and act"],
      quote: q23(68),
      source: ik(68, "Allah blames those who did not think about the Quran. Qatadah said: if people had pondered its meaning and understood it, they would have found in the Quran a barrier against disobeying Allah.", "if the people had pondered the meaning and understood it properly"),
      difficulty: 4,
      questions: [
        { q: "What does Allah ask in 23:68?", a: "Have they not pondered the Word?", wrong: ["Have they not counted the stars?", "Have they not built a house?", "Have they not travelled?"], why: "Have they not pondered over the Word?" },
        { q: "What would pondering give people, per Qatadah?", a: "A barrier against sin", wrong: ["Lots of money", "A long life", "A big house"], why: "They would have found in the Quran a deterrent to disobeying Allah." },
        { q: "What should people do with the Quran, per Ibn Kathir?", a: "Understand it and act on it", wrong: ["Keep it on a shelf", "Only carry it", "Read it once"], why: "To accept it and give thanks for it, and try to understand it and act in accordance with it." }
      ]
    },
    {
      slug: "known-as-truthful",
      title: "Known for honesty",
      line: "His people always knew the Prophet ﷺ as honest and trusted.",
      facts: ["Ja'far told An-Najashi the same", "Even Abu Sufyan admitted it"],
      quote: q23(69),
      source: ik(69, "Allah asks: did they not know their Messenger? They knew the honesty and good character he grew up with. Even Abu Sufyan, before Islam, told Heraclius the truth that he was noble and truthful.", "the honesty, trustworthiness and good character with which he grew up among them"),
      difficulty: 4,
      questions: [
        { q: "What does Allah ask in 23:69?", a: "Did they not recognize their Messenger?", wrong: ["Did they not see the sea?", "Did they not hear the thunder?", "Did they not know the stars?"], why: "Or is it that they did not recognize their Messenger so they deny him?" },
        { q: "Who told Heraclius the Prophet ﷺ was truthful?", a: "Abu Sufyan", wrong: ["Abu Lahab", "An-Najashi", "Kisra"], why: "They could only tell the truth and admit that he was indeed noble and truthful." },
        { q: "Whom did Ja'far bin Abi Talib speak to?", a: "An-Najashi, the king of Ethiopia", wrong: ["Heraclius", "Kisra", "Fir'awn"], why: "Ja'far bin Abi Talib said to An-Najashi, the king of Ethiopia." }
      ]
    }
  ]
};

/** Ayahs 78 to 118: the gifts of hearing, sight and hearts, whose is everything, repelling evil with good, the Scales, and the closing dua. */
const MUMINUN_THREE: DeepUnit = {
  key: "muminun3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-23",
  name: "Al-Mu'minun, ayahs 78 to 118",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Mu'minun",
  lessons: [
    {
      slug: "hearing-sight-hearts",
      title: "Hearing, sight and hearts",
      line: "Allah gave us hearing, eyes and hearts; few say thank you.",
      facts: ["We learn and take lessons with them", "Little thanks you give, says Allah"],
      quote: q23(78),
      source: ik(78, "Allah reminds us of His blessings: He gave us hearing, sight and understanding, through which we come to know things and take lessons. Yet how little people thank Him for them.", "He has given them hearing, sight and understanding"),
      difficulty: 3,
      questions: [
        { q: "What three gifts are named in 23:78?", a: "Hearing, eyes and hearts", wrong: ["Gold, silver and pearls", "Sun, moon and stars", "Food, drink and clothes"], why: "It is He Who has created for you hearing, eyes, and hearts." },
        { q: "What does Allah say about our thanks, in 23:78?", a: "Little thanks you give", wrong: ["You thank too much", "Thanks are not needed", "Only angels thank"], why: "Little thanks you give." },
        { tf: true, q: "We use hearing, sight and understanding to learn lessons.", why: "Through which they come to know things and draw lessons from them." }
      ]
    },
    {
      slug: "night-and-day",
      title: "The turning of night and day",
      line: "Allah gives life and death and turns night into day.",
      facts: ["Night and day follow by His command", "Allah will gather everyone back"],
      quote: q23(80),
      source: ik(80, "Allah gives life and causes death, and by His command night and day follow each other, never leaving their pattern. He asks: will you not then understand?", "by His command night and day are subjugated"),
      difficulty: 3,
      questions: [
        { q: "Who gives life and causes death, in 23:80?", a: "Allah", wrong: ["The sun", "Time", "The doctors"], why: "And it is He Who gives life and causes death." },
        { q: "What else belongs to Allah, in 23:80?", a: "The alternation of night and day", wrong: ["Only the night", "Only the seas", "Only the moon"], why: "And His is the alternation of night and day." },
        { q: "To whom will people be gathered back, in 23:79?", a: "To Allah", wrong: ["To their tribes", "To the mountains", "To nobody"], why: "And it is He Who has created you on the earth, and to Him you shall be gathered back." }
      ]
    },
    {
      slug: "whose-is-the-earth",
      title: "Whose is the earth?",
      line: "Ask who owns the earth; even idol worshippers said Allah.",
      facts: ["Allah is Lord of the Great Throne", "So worship Him alone"],
      quote: q23(84),
      source: ik(84, "Allah tells His Messenger ﷺ to ask: whose is the earth and all in it? They will admit it all belongs to Allah alone. So none should be worshipped but the Creator and Provider.", "they will admit that this belongs to Allah Alone with no partner or associate"),
      difficulty: 4,
      questions: [
        { q: "What did they answer, in 23:85?", a: "It is Allah's", wrong: ["It is ours", "It is the king's", "Nobody's"], why: "They will say: It is Allah's! Say: Will you not then remember?" },
        { q: "Who is Lord of the seven heavens, in 23:86-87?", a: "Allah", wrong: ["The angels", "The stars", "The idols"], why: "Who is Lord of the seven heavens, and Lord of the Great Throne? They will say: Allah." },
        { q: "What does their answer show, per Ibn Kathir?", a: "Only the Creator deserves worship", wrong: ["Idols help Allah", "Everyone owns a part", "Nothing at all"], why: "That none should be worshipped except the Creator and Provider." }
      ]
    },
    {
      slug: "he-protects-all",
      title: "He protects all",
      line: "Allah protects everyone, and no one can protect against Him.",
      facts: ["Everything is in His Hand", "What He wills happens"],
      quote: q23(88),
      source: ik(88, "The sovereignty of everything is in Allah's Hand. He protects, and none can protect against Him. He is the greatest Master; what He wills happens, and what He does not will does not happen.", "He is the greatest Master, and there is none greater than Him"),
      difficulty: 4,
      questions: [
        { q: "In Whose Hand is the sovereignty of everything, in 23:88?", a: "Allah's", wrong: ["The richest king's", "The strongest army's", "No one's"], why: "Say: In Whose Hand is the sovereignty of everything?" },
        { q: "Who can protect against Allah, in 23:88?", a: "No one", wrong: ["A tribe leader", "A great army", "A high wall"], why: "And He protects, while against Whom there is no protector." },
        { tf: true, q: "Whatever Allah wills happens, and what He does not will does not happen.", why: "What He wills happens, and what He does not, will not happen." }
      ]
    },
    {
      slug: "no-son-no-partner",
      title: "No son and no partner",
      line: "Allah has no child and no partner; the universe shows it.",
      facts: ["Many gods would fight each other", "He knows the seen and the unseen"],
      quote: q23(91),
      source: ik(91, "Allah has no child and no partner. If there were many gods, each would keep what he made and there would be no order. But the universe is ordered and joined together perfectly.", "the universe is ordered and cohesive"),
      difficulty: 4,
      questions: [
        { q: "What did Allah never take, in 23:91?", a: "A son", wrong: ["Care of creation", "Knowledge", "Power"], why: "No son did Allah beget, nor is there any god along with Him." },
        { q: "What would happen with many gods, in 23:91?", a: "Each takes what he made", wrong: ["All would agree", "The world grows better", "Nothing would change"], why: "Each god would have taken away what he had created, and some would have tried to overcome others." },
        { q: "What does the universe show, per Ibn Kathir?", a: "It is ordered and cohesive", wrong: ["It is broken", "It is random", "It has no pattern"], why: "But what we see is that the universe is ordered and cohesive." }
      ]
    },
    {
      slug: "repel-evil-with-better",
      title: "Answer bad with good",
      line: "Push back a bad deed with something better.",
      facts: ["Kindness can turn an enemy into a friend", "Only the patient manage it"],
      quote: q23(96),
      source: ik(96, "Allah teaches the best way to deal with people: treat kindly the one who treats you badly, to soften his heart and turn his hatred into love. Only the patient are given this.", "treat kindly the one who treats him badly"),
      difficulty: 4,
      questions: [
        { q: "How should we repel evil, in 23:96?", a: "With what is better", wrong: ["With more evil", "With shouting", "With silence forever"], why: "Repel evil with that which is better." },
        { q: "What can kindness do to an enemy, per Ibn Kathir?", a: "Turn enmity to friendship", wrong: ["Make him richer", "Make him leave town", "Nothing"], why: "So as to soften his heart and turn his enmity to friendship." },
        { q: "Who is granted this quality, in 41:35?", a: "Those who are patient", wrong: ["Those who are rich", "Those who are loud", "Those who are tall"], why: "But none is granted it except those who are patient." }
      ]
    },
    {
      slug: "refuge-from-shayatin",
      title: "Refuge from the whispers",
      line: "Ask Allah to protect you from the whispers of the devils.",
      facts: ["Kindness does not stop the devils", "Say Bismillah before you start things"],
      quote: q23(97),
      source: ik(97, "Allah commanded seeking refuge with Him from the whisperings of the devils, because being kind to them does not help. So we mention Allah at the start of every task, like eating, to keep them away.", "So we are commanded to mention Allah at the beginning of any undertaking"),
      difficulty: 5,
      questions: [
        { q: "What do we seek refuge from, in 23:97?", a: "The whisperings of the Shayatin", wrong: ["The rain", "Hard work", "Our parents"], why: "My Lord! I seek refuge with You from the whisperings of the Shayatin." },
        { q: "Why seek refuge with Allah from them, per Ibn Kathir?", a: "Kindness does not stop them", wrong: ["They are always asleep", "They are weak", "They are our friends"], why: "You cannot protect yourself by being kind to them." },
        { q: "What should we do at the start of any task?", a: "Mention Allah", wrong: ["Stay quiet", "Clap our hands", "Count to ten"], why: "So we are commanded to mention Allah at the beginning of any undertaking." }
      ]
    },
    {
      slug: "heavy-scales",
      title: "The heavy Scales",
      line: "Whoever's good deeds are heavier on the Scales succeeds.",
      facts: ["Family ties will not help that Day", "Even one more good deed can be enough"],
      quote: q23(102),
      source: ik(102, "When the Trumpet is blown, family ties will not help. Those whose good deeds outweigh their bad deeds, even by one, are the successful: saved and admitted to Paradise.", "the one whose good deeds outweigh his bad deeds, even by one"),
      difficulty: 5,
      questions: [
        { q: "Who are successful, in 23:102?", a: "Those whose Scales are heavy", wrong: ["Those with big families", "Those with famous names", "Those with gold"], why: "Then, those whose Scales are heavy, these! they are the successful." },
        { q: "How much heavier must good deeds be, per Ibn Abbas?", a: "Even by one", wrong: ["By a thousand", "By half", "By a mountain"], why: "The one whose good deeds outweigh his bad deeds, even by one." },
        { tf: false, q: "Family ties help each other on that Day, in 23:101.", why: "There will be no kinship among them that Day, nor will they ask of one another." }
      ]
    },
    {
      slug: "heavy-words",
      title: "Two words heavy on the Scale",
      line: "Two easy phrases are very heavy on the Scale.",
      facts: ["SubhanAllahi wa bihamdihi", "SubhanAllahil Azim"],
      quote: q23(102),
      source: hadith("bukhari", "6406", "Abu Hurairah", "Sahih", "The Prophet ﷺ said two phrases are easy on the tongue, heavy on the Scale and loved by the Most Merciful: Subhan Allahil Azim and Subhan Allahi wa bihamdihi.", "very heavy in the balance and are very dear to The Beneficent"),
      difficulty: 5,
      questions: [
        { q: "How are the two phrases on the tongue?", a: "Very easy", wrong: ["Very hard", "Very long", "Very loud"], why: "There are two expressions which are very easy for the tongue to say." },
        { q: "How are they on the Scale?", a: "Very heavy", wrong: ["Very light", "Weightless", "Not counted"], why: "But they are very heavy in the balance." },
        { q: "Which phrase is one of the two?", a: "Subhan Allahi wa bihamdihi", wrong: ["Good morning", "Thank you all", "See you soon"], why: "Subhan Allah Al-Azim and Subhan Allah wa bihamdihi." }
      ]
    },
    {
      slug: "rewarded-for-patience",
      title: "Rewarded for patience",
      line: "Believers who were mocked for their dua win in the end.",
      facts: ["They said: Our Lord, forgive us", "Allah rewards them for their patience"],
      quote: q23(111),
      source: ik(111, "Some of Allah's servants prayed: Our Lord, we believe, so forgive us and have mercy on us. Others laughed at them. Allah rewards them for their patience with joy, safety and Paradise.", "I have caused them to attain the victory of joy, safety, Paradise and salvation from the Fire"),
      difficulty: 5,
      questions: [
        { q: "What did the believers pray, in 23:109?", a: "Our Lord, forgive us and have mercy", wrong: ["Give us gold", "Make us famous", "Let us rest"], why: "Our Lord! We believe, so forgive us and have mercy on us, for You are the Best of all who show mercy!" },
        { q: "Why are they rewarded, in 23:111?", a: "For their patience", wrong: ["For their wealth", "For their family name", "For their strength"], why: "Verily, I have rewarded them this Day for their patience." },
        { q: "What did the mockers do, in 23:110?", a: "Laughed at them", wrong: ["Helped them", "Joined them", "Thanked them"], why: "But you took them for a laughing stock... while you used to laugh at them." }
      ]
    },
    {
      slug: "not-created-in-play",
      title: "Not created for nothing",
      line: "Allah did not create us for play, but to worship Him.",
      facts: ["Life in this world is short", "Everyone returns to Allah"],
      quote: q23(115),
      source: ik(115, "Allah asks: did you think We created you in play, with no purpose, and that you would not return to Us? No: you were created to worship Allah and carry out His commands.", "But you were created to worship Allah and carry out His commands"),
      difficulty: 5,
      questions: [
        { q: "What does Allah ask in 23:115?", a: "Did you think We created you in play?", wrong: ["Did you count the days?", "Did you see the sea?", "Did you build a house?"], why: "Did you think that We had created you in play, and that you would not be brought back to Us?" },
        { q: "Why were we created, per Ibn Kathir?", a: "To worship Allah", wrong: ["To play all day", "To gather money", "For no reason"], why: "But you were created to worship Allah and carry out His commands." },
        { q: "How long will people say they stayed on earth, in 23:113?", a: "A day or part of a day", wrong: ["A thousand years", "Forever", "One hour exactly"], why: "We stayed a day or part of a day. Ask of those who keep account." }
      ]
    },
    {
      slug: "the-true-king",
      title: "The True King",
      line: "Allah is the True King, Lord of the noble Throne.",
      facts: ["He creates nothing in vain", "The Throne is the highest creation"],
      quote: q23(116),
      source: ik(116, "Exalted is Allah, the True King, far above creating anything in vain. None has the right to be worshipped but He, Lord of the Throne, the highest of all creation, described as Karim: splendid.", "for He is the True King Who is far above doing such a thing"),
      difficulty: 5,
      questions: [
        { q: "What does 23:116 call Allah?", a: "The True King", wrong: ["The Old King", "A Hidden King", "One of many kings"], why: "So Exalted be Allah, the True King." },
        { q: "Why is the Throne mentioned, per Ibn Kathir?", a: "It is the highest of creation", wrong: ["It is made of wood", "It is very small", "It is on the earth"], why: "The Throne is mentioned because it is the highest point of all creation." },
        { tf: true, q: "Allah, the True King, creates nothing in vain.", why: "Sanctified be He above the idea that he should create anything in vain." }
      ]
    },
    {
      slug: "forgive-and-have-mercy",
      title: "The dua: forgive and have mercy",
      line: "The surah ends with a dua: My Lord, forgive and have mercy.",
      facts: ["Forgiveness wipes away and hides sins", "Mercy guides you to do good"],
      quote: q23(118),
      source: ik(118, "Allah teaches us to say: My Lord, forgive and have mercy, You are the best of those who show mercy. Forgiveness wipes away and hides sins; mercy guides a person to say and do good.", "forgiveness, in a general sense, means wiping away sins and concealing them from people"),
      difficulty: 5,
      questions: [
        { q: "What dua ends Al-Mu'minun, in 23:118?", a: "My Lord, forgive and have mercy", wrong: ["My Lord, give me gold", "My Lord, make me famous", "My Lord, let me rest"], why: "And say: My Lord! Forgive and have mercy, for You are the Best of those who show mercy!" },
        { q: "What does forgiveness mean, per Ibn Kathir?", a: "Wiping away and hiding sins", wrong: ["Forgetting to pray", "Getting rich", "Never trying again"], why: "Forgiveness, in a general sense, means wiping away sins and concealing them from people." },
        { q: "What does mercy mean, per Ibn Kathir?", a: "Guidance to say and do good", wrong: ["Lots of sleep", "Getting what you want", "Being left alone"], why: "Mercy means guiding a person and helping him to say and do good things." }
      ]
    }
  ]
};

export const MUMINUN_UNITS: readonly DeepUnit[] = [MUMINUN_ONE, MUMINUN_TWO, MUMINUN_THREE];
