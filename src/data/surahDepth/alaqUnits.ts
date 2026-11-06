import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Al-Alaq ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Alaq 96:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_96_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Alaq 96:${ayah}`,
    url: `https://quran.com/96:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 96:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q96 = (ayah: number) => quranQuote(96, ayah);


/** Ayahs 1 to 5: the first revelation in the cave of Hira, man made from a clot, and Allah teaching by the pen. */
const ALAQ_ONE: DeepUnit = {
  key: "alaq1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-96",
  name: "Al-Alaq, ayahs 1-5",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Alaq",
  lessons: [
    {
      slug: "the-first-revelation",
      title: "The first revelation",
      line: "Revelation began with true dreams, then quiet worship in Hira.",
      facts: ["Dreams clear as daybreak", "The cave of Hira"],
      quote: q96(1),
      source: hadith("bukhari", "3", "Aishah", "Sahih", "Aishah said revelation began with good dreams that came true like bright daylight; then he loved to worship alone in the cave of Hira.", "was in the form of good dreams which came true like bright daylight"),
      difficulty: 1,
      questions: [
        { q: "How did the revelation begin, per Aishah?", a: "Good dreams that came true", wrong: ["A loud voice", "A letter", "A dream of war"], why: "It was in the form of good dreams which came true like bright daylight." },
        { q: "Where did he go to worship alone?", a: "The cave of Hira", wrong: ["The cave of Thawr", "Mount Uhud", "The valley of Mina"], why: "He used to go in seclusion in the cave of Hira." },
        { tf: true, q: "He took food with him for his days of worship.", why: "He used to take with him the journey food for the stay." }
      ]
    },
    {
      slug: "read-in-the-name",
      title: "Read in the name of your Lord",
      line: "The first words revealed of the Quran were Read!",
      facts: ["Iqra: Read!", "The first five ayahs"],
      quote: q96(1),
      source: ik(1, "The angel came to him in the cave and said Read; the first of the Quran revealed were these five ayahs.", "The angel came to him while he was in the cave and said"),
      difficulty: 1,
      questions: [
        { q: "What was the first word the angel said?", a: "Read!", wrong: ["Pray!", "Listen!", "Go!"], why: "The angel came to him while he was in the cave and said, Read!" },
        { q: "What did he answer the angel?", a: "I am not one who reads", wrong: ["I will read now", "Who are you?", "Teach me later"], why: "I replied: I am not one who reads." },
        { tf: true, q: "Ayahs 96:1-5 were the first of the Quran revealed.", why: "The first thing that was revealed of the Quran were these noble and blessed Ayat." }
      ]
    },
    {
      slug: "the-first-mercy",
      title: "The first mercy",
      line: "The first ayahs revealed were the first mercy to all people.",
      facts: ["A gift to every servant", "The first bounty"],
      quote: q96(1),
      source: ik(1, "These noble and blessed ayahs were the first mercy Allah gave His servants and the first bounty He favored them with.", "They are the first mercy that Allah bestowed upon His servants"),
      difficulty: 1,
      questions: [
        { q: "What does Ibn Kathir call the first ayahs?", a: "The first mercy to His servants", wrong: ["A hard test", "A short story", "A warning only"], why: "They are the first mercy that Allah bestowed upon His servants." },
        { q: "What else were they, per Ibn Kathir?", a: "The first bounty", wrong: ["The last word", "A riddle", "A law of trade"], why: "And the first bounty that Allah favored them with." },
        { tf: false, q: "The first ayahs were only for the Arabs of Makkah.", why: "They are the first mercy that Allah bestowed upon His servants." }
      ]
    },
    {
      slug: "made-from-a-clot",
      title: "Made from a clot",
      line: "Allah, who made man from a small clinging clot, deserves thanks.",
      facts: ["Alaq: a clinging clot", "The surah is named Al-Alaq"],
      quote: q96(2),
      source: ik(2, "These ayahs tell of how man was first made from a clinging clot, and of Allah teaching him what he did not know.", "creation from a dangling clot"),
      difficulty: 1,
      questions: [
        { q: "From what did Allah create man, per 96:2?", a: "A clot", wrong: ["Light", "Fire", "Gold"], why: "He has created man from a clot." },
        { q: "What does the name Al-Alaq mean?", a: "The clinging clot", wrong: ["The pen", "The cave", "The night"], why: "These Ayat inform of the beginning of creation from a dangling clot." },
        { tf: true, q: "Man starts very small, then Allah grows him.", why: "These Ayat inform of the beginning of creation from a dangling clot." }
      ]
    },
    {
      slug: "the-maker-guides",
      title: "The Maker also guides",
      line: "Who made man will guide him with commands, Messengers and Books.",
      facts: ["As-Sa'di explains", "Why creation comes next"],
      quote: q96(2),
      source: saadi(96, 2, "As-Sa'di says the One who created man and cares for him must guide him with commands, by sending Messengers and Books; so creation is named right after Read.", "لا بد أن يدبره بالأمر والنهي"),
      difficulty: 3,
      questions: [
        { q: "How does the Maker guide people?", a: "Messengers and Books", wrong: ["Only dreams", "Only stars", "Not at all"], why: "By sending Messengers and sending down the Books." },
        { q: "Why is creation named right after Read?", a: "The Maker sends guidance", wrong: ["By chance", "For rhyme only", "No reason"], why: "The One who made man must guide him, says as-Sa'di." },
        { tf: true, q: "Allah made all things, then named man by himself.", why: "All creation, then man. As-Sa'di on 96:1." }
      ]
    },
    {
      slug: "khadijahs-comfort",
      title: "Khadijah comforts him",
      line: "Khadijah calmed him: Allah would never disgrace someone so kind.",
      facts: ["Cover me! Cover me!", "Good deeds bring Allah's help"],
      quote: q96(1),
      source: hadith("bukhari", "3", "Aishah", "Sahih", "He came home afraid; Khadijah said Allah would never disgrace him, because he kept ties of family, helped the poor and served guests.", "Allah will never disgrace you"),
      difficulty: 2,
      questions: [
        { q: "What did Khadijah say to calm him?", a: "Allah will never disgrace you", wrong: ["Go back tomorrow", "Tell nobody", "Leave Makkah"], why: "Never! By Allah, Allah will never disgrace you." },
        { q: "Which good deed did Khadijah name?", a: "Helping the poor", wrong: ["Winning races", "Building towers", "Selling well"], why: "You keep good relations with your kith and kin, help the poor and the destitute." },
        { tf: true, q: "She said he served his guests generously.", why: "Serve your guests generously and assist the deserving calamity-afflicted ones." }
      ]
    },
    {
      slug: "waraqahs-words",
      title: "Waraqah knew the angel",
      line: "Waraqah said the angel was the one Allah sent to Musa.",
      facts: ["Waraqah: Khadijah's cousin", "Jibril came to Musa too"],
      quote: q96(1),
      source: hadith("bukhari", "3", "Aishah", "Sahih", "Khadijah took him to her cousin Waraqah, who said this was the same angel Allah had sent to Musa.", "whom Allah had sent to Moses"),
      difficulty: 2,
      questions: [
        { q: "Who was Waraqah to Khadijah?", a: "Her cousin", wrong: ["Her brother", "Her son", "Her father"], why: "Khadija then accompanied him to her cousin Waraqa bin Naufal." },
        { q: "To which Messenger did Waraqah say the angel came before?", a: "Musa", wrong: ["Nuh", "Hud", "Yunus"], why: "This is the same one who keeps the secrets whom Allah had sent to Moses." },
        { tf: false, q: "Waraqah said his people would welcome him warmly.", why: "Anyone who came with something similar to what you have brought was treated with hostility." }
      ]
    },
    {
      slug: "the-most-generous",
      title: "The Most Generous",
      line: "From His generosity, Allah taught man what he did not know.",
      facts: ["Al-Akram: the Most Generous", "Knowledge is a gift"],
      quote: q96(3),
      source: ik(3, "Out of His generosity Allah taught man what he did not know, and so honored him with knowledge.", "He taught man that which he did not know"),
      difficulty: 2,
      questions: [
        { q: "How is your Lord described in 96:3?", a: "The Most Generous", wrong: ["The Most Distant", "The Most Silent", "The Most Strict"], why: "Read! And your Lord is the Most Generous." },
        { q: "What did Allah give man out of generosity?", a: "Knowledge he did not have", wrong: ["Wings", "A long sleep", "Gold mines"], why: "He taught man that which he did not know." },
        { tf: true, q: "Every bit of our knowledge is a gift from Allah.", why: "He taught man that which he did not know." }
      ]
    },
    {
      slug: "taught-by-the-pen",
      title: "Taught by the pen",
      line: "Knowledge lives in the mind, on the tongue and in writing.",
      facts: ["Al-Qalam: the pen", "Mind, tongue and writing"],
      quote: q96(4),
      source: ik(4, "Knowledge can be in the mind, on the tongue, or written with the fingers; so Allah mentions that He taught by the pen.", "Knowledge sometimes is in the mind, sometimes on the tongue, and sometimes in writing with the fingers"),
      difficulty: 2,
      questions: [
        { q: "By what did Allah teach, per 96:4?", a: "The pen", wrong: ["The sword", "The sun", "The rain"], why: "Who has taught by the pen." },
        { q: "Which three places hold knowledge, per Ibn Kathir?", a: "Mind, tongue and writing", wrong: ["Hands, feet and eyes", "Gold, silver and pearls", "Day, night and dawn"], why: "Knowledge sometimes is in the mind, sometimes on the tongue, and sometimes in writing." },
        { tf: true, q: "Written knowledge needs the mind and the tongue first.", why: "And while the last written necessitates the first two, the reverse is not true." }
      ]
    },
    {
      slug: "honored-by-knowledge",
      title: "Honored by knowledge",
      line: "Knowledge raised man, as it raised Adam over the angels.",
      facts: ["Knowledge is honor", "Adam was taught"],
      quote: q96(5),
      source: ik(5, "Allah exalted and honored man by giving him knowledge, the honor by which Adam was distinguished over the angels.", "Allah exalted him and honored him by giving him knowledge"),
      difficulty: 3,
      questions: [
        { q: "How did Allah honor man, per Ibn Kathir?", a: "By giving him knowledge", wrong: ["By making him tall", "By giving him wings", "By making him rich"], why: "Allah exalted him and honored him by giving him knowledge." },
        { q: "Who was distinguished over the angels by knowledge?", a: "Adam", wrong: ["Nuh", "Ibrahim", "Musa"], why: "It is the dignity that the Father of Humanity, Adam, was distinguished with over the angels." },
        { tf: false, q: "Man was born already knowing everything.", why: "He has taught man that which he knew not." }
      ]
    }
  ]
};

/** Ayahs 6 to 19: man growing proud when rich, Abu Jahl trying to stop the prayer, and drawing near to Allah in sujud. */
const ALAQ_TWO: DeepUnit = {
  key: "alaq2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-96",
  name: "Al-Alaq, ayahs 6-19",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Alaq",
  lessons: [
    {
      slug: "when-man-feels-rich",
      title: "When man feels rich",
      line: "Man grows proud when wealth makes him feel he needs no one.",
      facts: ["Yatgha: he oversteps", "Wealth can test the heart"],
      quote: q96(6),
      source: ik(6, "Man becomes proud, scornful and oversteps when he thinks himself self-sufficient and has much wealth.", "when he considers himself self-sufficient and having an abundance of wealth"),
      difficulty: 1,
      questions: [
        { q: "What does man do, per 96:6?", a: "He transgresses", wrong: ["He sleeps", "He travels", "He forgets to eat"], why: "Nay! Verily, man does transgress." },
        { q: "When does man overstep, per Ibn Kathir?", a: "When he feels rich and needs no one", wrong: ["When he is hungry", "When he is learning", "When he is ill"], why: "When he considers himself self-sufficient and having an abundance of wealth." },
        { tf: true, q: "Feeling we need no one can lead to pride.", why: "Because he considers himself self-sufficient." }
      ]
    },
    {
      slug: "the-return-is-to-allah",
      title: "The return is to Allah",
      line: "Everyone returns to Allah and will be asked about their wealth.",
      facts: ["Ar-Rujaa: the return", "Earned how, spent how"],
      quote: q96(8),
      source: ik(8, "To Allah is the final return, and He will ask you about your wealth: where you got it and how you spent it.", "He will hold you accountable for your wealth"),
      difficulty: 1,
      questions: [
        { q: "To whom is the return, per 96:8?", a: "Your Lord", wrong: ["Your tribe", "Your king", "Your city"], why: "Surely, unto your Lord is the return." },
        { q: "What two things will Allah ask about wealth?", a: "Where it came from and where it went", wrong: ["Its color and size", "Its weight and smell", "Who saw it first"], why: "As to where you obtained it from and how did you spend it." },
        { tf: true, q: "We should earn money in halal ways.", why: "He will hold you accountable for your wealth, as to where you obtained it from." }
      ]
    },
    {
      slug: "stopping-a-servant",
      title: "Stopping a servant from prayer",
      line: "Abu Jahl tried to stop Muhammad ﷺ from praying at the Kabah.",
      facts: ["Abu Jahl: a Quraysh leader", "Salah at the Kabah"],
      quote: q96(9),
      source: ik(9, "Ayahs 9-10 came down about Abu Jahl, who threatened the Prophet ﷺ for praying at the Kabah.", "This was revealed about Abu Jahl"),
      difficulty: 2,
      questions: [
        { q: "About whom were 96:9-10 revealed?", a: "Abu Jahl", wrong: ["Abu Bakr", "Abu Talib", "Abu Hurayrah"], why: "This was revealed about Abu Jahl." },
        { q: "What did he try to stop?", a: "The prayer at the Kabah", wrong: ["A trade trip", "A wedding", "A harvest"], why: "He threatened the Prophet ﷺ for performing Salah at the Kabah." },
        { tf: false, q: "Stopping someone from praying is a small matter.", why: "Have you seen him who prevents a servant when he prays?" }
      ]
    },
    {
      slug: "what-if-he-is-guided",
      title: "What if he is guided?",
      line: "What if the one praying is guided and calls to taqwa?",
      facts: ["Guided in action", "Taqwa in speech"],
      quote: q96(11),
      source: ik(11, "Allah first asked gently: do you think the man you stop is on the straight path in his action, or calls to taqwa in his words?", "is upon the straight path in his action"),
      difficulty: 2,
      questions: [
        { q: "What does 96:11 ask about the one praying?", a: "What if he is on guidance?", wrong: ["Is he rich?", "Is he tall?", "Is he young?"], why: "Have you seen if he is on the guidance?" },
        { q: "What does 96:12 say he may enjoin?", a: "Taqwa", wrong: ["Pride", "Fighting", "Gambling"], why: "Or enjoins Taqwa." },
        { tf: true, q: "Allah first spoke to Abu Jahl with a gentle question.", why: "Allah firstly admonished him with that which was better." }
      ]
    },
    {
      slug: "allah-sees",
      title: "Allah sees",
      line: "Does he not know that Allah sees him and hears his words?",
      facts: ["Allah sees all", "Allah hears all"],
      quote: q96(14),
      source: ik(14, "Does the one who stops the guided man not know that Allah sees him, hears his words and will repay him in full?", "know that Allah sees him and hears his words"),
      difficulty: 2,
      questions: [
        { q: "What does 96:14 remind us?", a: "Allah sees", wrong: ["Allah sleeps", "Allah is far", "Allah forgets"], why: "Knows he not that Allah sees?" },
        { q: "What else does Allah do, per Ibn Kathir?", a: "Hears his words", wrong: ["Ignores him", "Fears him", "Needs him"], why: "Allah sees him and hears his words." },
        { q: "What does 96:13 ask about the one who stops prayer?", a: "What if he denies and turns away?", wrong: ["What if he is rich?", "What if he is tired?", "What if he is far?"], why: "Have you seen if he denies and turns away?" }
      ]
    },
    {
      slug: "if-he-does-not-stop",
      title: "If he does not stop",
      line: "Allah warned him to stop his stubbornness and turn back.",
      facts: ["The forehead: the front lock", "Lying and sinful"],
      quote: q96(15),
      source: ik(15, "If he does not stop his stubborn quarrel, Allah warns him; his forehead lies in its words and sins in its deeds.", "if he does not recant from his discord and obstinacy"),
      difficulty: 2,
      questions: [
        { q: "What does if he ceases not mean, per Ibn Kathir?", a: "If he does not stop his stubbornness", wrong: ["If he stops eating", "If he stops walking", "If he stops talking"], why: "If he does not recant from his discord and obstinacy." },
        { q: "How does 96:16 describe the forehead?", a: "Lying and sinful", wrong: ["Shining and pure", "Small and weak", "Tired and old"], why: "A lying, sinful forehead!" },
        { tf: true, q: "Allah gives warnings so people can turn back.", why: "Nay! If he ceases not." }
      ]
    },
    {
      slug: "let-him-call-his-council",
      title: "Let him call his council",
      line: "No tribe can help against Allah, who sends His own angels.",
      facts: ["Nadiyah: his council", "Az-Zabaniyah: guard angels"],
      quote: q96(17),
      source: ik(17, "Let him call his people and tribe for help; Allah will call His angels, so he may know whose side wins.", "let him call them in order to seek help from them"),
      difficulty: 3,
      questions: [
        { q: "Who is his council, per Ibn Kathir?", a: "His people and tribe", wrong: ["His camels", "His books", "His servants only"], why: "His council, meaning, his people and his tribe." },
        { q: "Whom will Allah call, per 96:18?", a: "The guards of Hell", wrong: ["The kings", "The poets", "The traders"], why: "We will call out the guards of Hell!" },
        { tf: false, q: "Abu Jahl's tribe could have beaten the angels.", why: "This is so that he may know who will win." }
      ]
    },
    {
      slug: "the-angels-guarded-him",
      title: "The angels guarded him",
      line: "Abu Jahl threatened him, but angels would have taken Abu Jahl.",
      facts: ["Allah protects His Messenger", "Threats cannot win"],
      quote: q96(18),
      source: hadith("bukhari", "4958", "Ibn Abbas", "Sahih", "Abu Jahl threatened to harm Muhammad ﷺ if he prayed at the Kabah; he said the angels would take Abu Jahl away if he tried.", "If he does so, the Angels will snatch him away"),
      difficulty: 3,
      questions: [
        { q: "Where did Abu Jahl threaten to stop his prayer?", a: "At the Kabah", wrong: ["In Madinah", "In Taif", "At Badr"], why: "If I see Muhammad praying at the Kaba." },
        { q: "What did he say the angels would do?", a: "Snatch Abu Jahl away", wrong: ["Hide him", "Make him rich", "Carry him home"], why: "If he does so, the Angels will snatch him away." },
        { tf: true, q: "Allah protected His Messenger while he prayed.", why: "If he does so, the Angels will snatch him away." }
      ]
    },
    {
      slug: "a-ditch-of-fire",
      title: "He turned on his heels",
      line: "Abu Jahl came near, then fled back, seeing fire and wings.",
      facts: ["Fire and wings", "Angels stood guard"],
      quote: q96(18),
      source: hadith("muslim", "2797", "Abu Hurairah", "Sahih", "Abu Jahl came to harm him in prayer but turned back, saying he saw between them a ditch of fire, terror and wings.", "There is between me and him a ditch of fire and terror and wings"),
      difficulty: 3,
      questions: [
        { q: "What did Abu Jahl do when he came near?", a: "He turned back on his heels", wrong: ["He sat and prayed", "He shouted loudly", "He ran forward"], why: "He came near him but turned upon his heels and tried to repulse something with his hands." },
        { q: "What did he say he saw?", a: "A ditch of fire and wings", wrong: ["A wall of gold", "A river of milk", "A flock of birds"], why: "There is between me and him a ditch of fire and terror and wings." },
        { tf: true, q: "The angels kept him away from the one praying.", why: "There is between me and him a ditch of fire and terror and wings." }
      ]
    },
    {
      slug: "do-not-obey-him",
      title: "Do not obey him",
      line: "Do not obey him; keep praying, for Allah will protect you.",
      facts: ["Keep worshipping", "Allah is the protector"],
      quote: q96(19),
      source: ik(19, "Do not obey him in stopping your worship; pray wherever you wish and do not worry, for Allah will protect and help you.", "Pray wherever you wish and do not worry about him"),
      difficulty: 2,
      questions: [
        { q: "What does 96:19 tell him?", a: "Do not obey him", wrong: ["Stop praying", "Pray in secret only", "Leave Makkah"], why: "Nay! Do not obey him." },
        { q: "Why not worry, per Ibn Kathir?", a: "Allah will protect and help", wrong: ["The tribe will fight", "Abu Jahl will leave", "Nobody saw him"], why: "For indeed Allah will protect you and help you." },
        { tf: false, q: "Muslims should stop praying when someone mocks them.", why: "Pray wherever you wish and do not worry about him." }
      ]
    },
    {
      slug: "closest-in-sujud",
      title: "Closest in sujud",
      line: "We are nearest to Allah in sujud, so make much dua there.",
      facts: ["Sujud: prostration", "Make dua in sujud"],
      quote: q96(19),
      source: hadith("muslim", "482", "Abu Hurairah", "Sahih", "The nearest a servant comes to his Lord is while in sujud, so make plenty of dua then.", "The nearest a servant comes to his Lord is when he is prostrating himself"),
      difficulty: 3,
      questions: [
        { q: "What does 96:19 command at its end?", a: "Prostrate and draw near", wrong: ["Stand and wait", "Sit and rest", "Run and hide"], why: "Fall prostrate and draw near to Allah!" },
        { q: "When is a servant nearest to Allah?", a: "In sujud", wrong: ["While eating", "While sleeping", "While shopping"], why: "The nearest a servant comes to his Lord is when he is prostrating himself." },
        { q: "What should we do much of in sujud?", a: "Make dua", wrong: ["Stay silent", "Count money", "Look around"], why: "So make supplication in this state." }
      ]
    },
    {
      slug: "a-sajdah-ayah",
      title: "A sajdah ayah",
      line: "Muhammad ﷺ made sujud when he recited 96:19.",
      facts: ["Sajdat at-tilawah", "84:21 too"],
      quote: q96(19),
      source: hadith("muslim", "578", "Abu Hurairah", "Sahih", "Abu Hurairah said they made sujud with the Messenger of Allah ﷺ when he recited Al-Inshiqaq and Al-Alaq.", "We performed prostration along with the Messenger of Allah"),
      difficulty: 3,
      questions: [
        { q: "What did they do at Al-Alaq with him?", a: "Made sujud", wrong: ["Stood up", "Clapped", "Stopped reciting"], why: "We performed prostration along with the Messenger of Allah." },
        { q: "Which other surah did Abu Hurairah name?", a: "Al-Inshiqaq", wrong: ["Al-Fatihah", "Al-Ikhlas", "An-Nas"], why: "When the heaven burst asunder, and Read in the name of Thy Lord." },
        { tf: true, q: "Al-Alaq ends with a place of sujud.", why: "Fall prostrate and draw near to Allah!" }
      ]
    }
  ]
};

export const ALAQ_UNITS: readonly DeepUnit[] = [ALAQ_ONE, ALAQ_TWO];
