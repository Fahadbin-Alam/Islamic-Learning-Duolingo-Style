import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Al-Ghashiyah ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Ghashiyah 88:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_88_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Ghashiyah 88:${ayah}`,
    url: `https://quran.com/88:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 88:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q88 = (ayah: number) => quranQuote(88, ayah);


/** Ayahs 1 to 7: the Overwhelming Day, and the tired, humbled faces of those who did not obey. */
const GHASHIYAH_ONE: DeepUnit = {
  key: "ghashiyah1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-88",
  name: "Al-Ghashiyah, ayahs 1-7",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Ghashiyah",
  lessons: [
    {
      slug: "the-overwhelming",
      title: "The Overwhelming",
      line: "Al-Ghashiyah is a name for the Last Day, which covers everyone.",
      facts: ["Al-Ghashiyah: the Overwhelming", "Read at Jumuah and Eid"],
      quote: q88(1),
      source: ik(1, "Ibn Abbas and Qatadah said Al-Ghashiyah is a name of the Day of Judgement, as it overwhelms all people.", "Al-Ghashiyah is one of the names of the Day of Judgement"),
      difficulty: 1,
      questions: [
        { q: "What does 88:1 ask?", a: "Has the news of Al-Ghashiyah come to you?", wrong: ["Who made the stars?", "Where is the sea?", "When is Ramadan?"], why: "Has there come to you the narration of Al-Ghashiyah, the overwhelming?" },
        { q: "What is Al-Ghashiyah, per Ibn Abbas?", a: "A name of the Day of Judgement", wrong: ["A city", "A star", "A river"], why: "Al-Ghashiyah is one of the names of the Day of Judgement." },
        { q: "Why is the Day called that?", a: "It overwhelms all people", wrong: ["It is short", "It is quiet", "It is far away"], why: "It has been called this because it will overwhelm the people and overcome them." }
      ]
    },
    {
      slug: "humbled-faces",
      title: "Humbled faces",
      line: "Some faces will be humbled, when humility no longer helps.",
      facts: ["Khashi'ah: humbled", "Be humble now"],
      quote: q88(2),
      source: ik(2, "Qatadah said Khashiah means humiliated; Ibn Abbas said their humility will not benefit them then.", "They will be humble but this action will be of no benefit to them"),
      difficulty: 2,
      questions: [
        { q: "How will some faces be, per 88:2?", a: "Khashi'ah, humbled", wrong: ["Glowing", "Laughing", "Hidden"], why: "Some faces that Day will be Khashiah." },
        { q: "Will their humility help them then?", a: "No, it will be of no benefit", wrong: ["Yes, fully", "Only a little", "Only at night"], why: "They will be humble but this action will be of no benefit to them." },
        { tf: true, q: "Humbling ourselves before Allah now is what benefits us.", why: "They will be humble but this action will be of no benefit to them." }
      ]
    },
    {
      slug: "laboring-and-weary",
      title: "Laboring and weary",
      line: "Some toiled hard, but not in obedience, and end up weary.",
      facts: ["Amilah: laboring", "Nasibah: weary"],
      quote: q88(3),
      source: ik(3, "Ikrimah and As-Suddi said they labored in this life with disobedience; Umar wept when he remembered the ayah.", "Laboring in the worldly life with disobedience"),
      difficulty: 3,
      questions: [
        { q: "How are these faces described in 88:3?", a: "Laboring, weary", wrong: ["Resting, happy", "Sleeping, calm", "Eating, full"], why: "Laboring, weary." },
        { q: "Who wept when he remembered the ayah?", a: "Umar ibn Al-Khattab", wrong: ["Abu Lahab", "Fir'awn", "A king of Rome"], why: "Umar looked at him and began to weep, remembering the statement of Allah." },
        { tf: false, q: "Hard work alone saves us, even without obeying Allah.", why: "They did many deeds and became weary in their performance, yet they will be cast into a blazing Fire." }
      ]
    },
    {
      slug: "the-hot-fire",
      title: "A Fire intensely hot",
      line: "The disobedient face a Fire of great heat and a boiling spring.",
      facts: ["Hamiyah: intensely hot", "Aniyah: boiling"],
      quote: q88(4),
      source: ik(4, "Ibn Abbas, Al-Hasan and Qatadah said Hamiyah means hot with intense heat.", "hot with intense heat"),
      difficulty: 2,
      questions: [
        { q: "What will they enter, per 88:4?", a: "A Fire, Hamiyah", wrong: ["A cool garden", "A calm sea", "A palace"], why: "They will enter into Fire, Hamiyah." },
        { q: "What will they drink from, per 88:5?", a: "A boiling spring", wrong: ["A cool river", "Fresh milk", "Pure honey"], why: "They will be given to drink from a boiling, Aniyah, spring." },
        { tf: true, q: "Obeying Allah keeps us safe from the Fire.", why: "Laboring in the worldly life with disobedience, and weariness in the Fire." }
      ]
    },
    {
      slug: "no-food-but-thorns",
      title: "No food but thorns",
      line: "Their only food is a thorny plant that gives no strength.",
      facts: ["Dari': a dry thorny plant", "Nothing helps there"],
      quote: q88(6),
      source: ik(6, "Ikrimah said Dari is a thorny tree; Ibn Kathir says it neither nourishes nor removes hunger.", "It is a thorny tree which reaches down to the ground"),
      difficulty: 3,
      questions: [
        { q: "What food will they have, per 88:6?", a: "Only Dari'", wrong: ["Fruits", "Bread", "Meat"], why: "No food will there be for them but from Dari." },
        { q: "What is Dari', per Ikrimah?", a: "A thorny tree", wrong: ["A sweet fruit", "A soft bread", "A clear spring"], why: "It is a thorny tree which reaches down to the ground." },
        { q: "What does 88:7 say of that food?", a: "It neither nourishes nor ends hunger", wrong: ["It makes them strong", "It tastes sweet", "It heals them"], why: "Which will neither nourish nor avail against hunger." }
      ]
    }
  ]
};

/** Ayahs 8 to 16: joyful faces in a lofty Garden, with springs, raised thrones, cushions and carpets. */
const GHASHIYAH_TWO: DeepUnit = {
  key: "ghashiyah2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-88",
  name: "Al-Ghashiyah, ayahs 8-16",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Ghashiyah",
  lessons: [
    {
      slug: "joyful-faces",
      title: "Joyful faces",
      line: "Other faces that Day will shine with joy.",
      facts: ["Na'imah: joyful", "Joy from striving"],
      quote: q88(8),
      source: ik(8, "Ibn Kathir says pleasure will be seen on those faces, earned by their striving.", "pleasure will be noticeable in them"),
      difficulty: 1,
      questions: [
        { q: "How will other faces be, per 88:8?", a: "Joyful", wrong: ["Weary", "Humbled", "Hidden"], why: "Faces that Day will be joyful." },
        { q: "Why will they be joyful, per Ibn Kathir?", a: "Due to their striving", wrong: ["By chance", "Because of wealth", "For no reason"], why: "This will only occur due to their striving." },
        { tf: true, q: "Joy on that Day comes from good effort now.", why: "Pleasure will be noticeable in them. This will only occur due to their striving." }
      ]
    },
    {
      slug: "glad-with-their-effort",
      title: "Glad with their effort",
      line: "The believers will be pleased with the good deeds they did.",
      facts: ["Sa'y: effort, striving", "No good deed is lost"],
      quote: q88(9),
      source: ik(9, "Sufyan said they will be pleased with their deeds.", "They will be pleased with their deeds"),
      difficulty: 1,
      questions: [
        { q: "With what are they glad, per 88:9?", a: "Their endeavor", wrong: ["Their gold", "Their houses", "Their fame"], why: "Glad with their endeavor." },
        { q: "What did Sufyan say they are pleased with?", a: "Their deeds", wrong: ["Their clothes", "Their looks", "Their friends"], why: "They will be pleased with their deeds." },
        { tf: false, q: "Good deeds are forgotten on that Day.", why: "They will be pleased with their deeds." }
      ]
    },
    {
      slug: "a-lofty-garden",
      title: "A lofty Garden",
      line: "They live in a high, bright Garden, safe in their homes.",
      facts: ["Aliyah: lofty", "Safe forever"],
      quote: q88(10),
      source: ik(10, "Ibn Kathir says the Paradise is elevated and brilliant, and they are secure in their dwellings.", "elevated and brilliant, secure in their dwellings"),
      difficulty: 1,
      questions: [
        { q: "Where will they be, per 88:10?", a: "In a lofty Paradise", wrong: ["In a low valley", "In a desert", "In a cave"], why: "In a lofty Paradise." },
        { q: "How does Ibn Kathir describe it?", a: "Elevated and brilliant", wrong: ["Dark and small", "Cold and empty", "Noisy"], why: "Elevated and brilliant, secure in their dwellings." },
        { tf: true, q: "The people of Paradise are secure in their homes.", why: "Elevated and brilliant, secure in their dwellings." }
      ]
    },
    {
      slug: "no-idle-talk",
      title: "No hurtful words",
      line: "In Paradise no one hears foolish or hurtful talk, only peace.",
      facts: ["Laghiyah: idle, hurtful talk", "Only Salam"],
      quote: q88(11),
      source: ik(11, "Ibn Kathir says they will not hear any foolish word in Paradise, as in 19:62: only Salam.", "any foolish word"),
      difficulty: 2,
      questions: [
        { q: "What will they not hear, per 88:11?", a: "Harmful speech or falsehood", wrong: ["Birds singing", "Water flowing", "Greetings"], why: "Where they shall neither hear harmful speech nor falsehood." },
        { q: "What will they hear instead, per 19:62?", a: "Only Salam", wrong: ["Arguments", "Shouting", "Nothing at all"], why: "They shall not hear therein any Laghw, but only Salam." },
        { tf: true, q: "Keeping our tongue clean now prepares us for Paradise.", why: "They will not hear in the Paradise that they will be in, any foolish word." }
      ]
    },
    {
      slug: "flowing-springs",
      title: "Flowing springs",
      line: "Paradise has springs that flow freely, many of them.",
      facts: ["Aynun jariyah: a flowing spring", "Rivers from hills of musk"],
      quote: q88(12),
      source: ik(12, "Ibn Kathir says the single word means springs in general: Paradise has many flowing springs.", "it refers to springs collectively"),
      difficulty: 2,
      questions: [
        { q: "What is in Paradise, per 88:12?", a: "A running spring", wrong: ["A dry well", "A frozen lake", "A salty sea"], why: "Therein will be a running spring." },
        { q: "Is there only one spring, per Ibn Kathir?", a: "No, it means springs in general", wrong: ["Yes, only one", "None at all", "Only on Fridays"], why: "It is not intended to mean that there is only one spring; it refers to springs collectively." },
        { tf: true, q: "The rivers of Paradise flow from hills of musk.", why: "The rivers of Paradise spring forth from beneath hills or mountains of musk." }
      ]
    },
    {
      slug: "thrones-and-cups",
      title: "Raised thrones and ready cups",
      line: "Paradise has high thrones and cups set ready for its people.",
      facts: ["Sururun marfu'ah: raised thrones", "Akwab: cups"],
      quote: q88(13),
      source: ik(13, "Ibn Kathir says the thrones are lofty, and they lower themselves when a friend of Allah wishes to sit.", "whenever the friend of Allah wishes to sit on these lofty thrones"),
      difficulty: 2,
      questions: [
        { q: "What is in Paradise, per 88:13?", a: "Thrones raised high", wrong: ["Broken chairs", "Low stools", "Nothing to sit on"], why: "Therein will be thrones raised high." },
        { q: "What is set at hand, per 88:14?", a: "Cups", wrong: ["Swords", "Coins", "Books"], why: "And cups set at hand." },
        { q: "What are the cups, per Ibn Kathir?", a: "Drinking containers made ready", wrong: ["Empty jars", "Old pots", "Broken bowls"], why: "Drinking containers that are prepared and presented for whoever wants them." }
      ]
    },
    {
      slug: "cushions-and-carpets",
      title: "Cushions and carpets",
      line: "Rows of cushions and soft carpets spread everywhere.",
      facts: ["Namariq: cushions", "Zarabi: carpets"],
      quote: q88(15),
      source: ik(15, "Ibn Abbas said An-Namariq are pillows and Az-Zarabi are carpets, spread for whoever wants to sit.", "An-Namariq are pillows"),
      difficulty: 2,
      questions: [
        { q: "What are set in rows, per 88:15?", a: "Namariq, cushions", wrong: ["Swords", "Stones", "Trees"], why: "And Namariq, set in rows." },
        { q: "What are Az-Zarabi, per Ibn Abbas?", a: "Carpets", wrong: ["Horses", "Lamps", "Windows"], why: "Ibn Abbas said, Az-Zarabi are carpets." },
        { q: "What does Mabthuthah mean in 88:16?", a: "Spread about for sitting", wrong: ["Rolled up", "Locked away", "Thrown out"], why: "Mabthuthah means placed about for whoever would like to sit upon them." }
      ]
    }
  ]
};

/** Ayahs 17 to 26: look at the camel, sky, mountains and earth; remind, for the reckoning is with Allah. */
const GHASHIYAH_THREE: DeepUnit = {
  key: "ghashiyah3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-88",
  name: "Al-Ghashiyah, ayahs 17-26",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Ghashiyah",
  lessons: [
    {
      slug: "look-at-the-camel",
      title: "Look at the camel",
      line: "Look at the camel: so strong, yet led by a child.",
      facts: ["Ibil: camels", "A sign of Allah's power"],
      quote: q88(17),
      source: ik(17, "Ibn Kathir says the camel is strong yet gentle, carries heavy loads, and lets a weak rider guide it.", "It allows itself to be guided by a weak rider"),
      difficulty: 1,
      questions: [
        { q: "What should we look at, per 88:17?", a: "The camels, how they are created", wrong: ["The cars", "The coins", "The kings"], why: "Do they not look at the camels, how they are created." },
        { q: "Who can guide the strong camel, per Ibn Kathir?", a: "A weak rider", wrong: ["Only a giant", "No one", "Only a king"], why: "It allows itself to be guided by a weak rider." },
        { q: "Why were the Arabs told about camels?", a: "They were their most common animal", wrong: ["They had never seen one", "Camels could talk", "Camels were rare"], why: "The most common domestic animal of the Arabs was the camel." }
      ]
    },
    {
      slug: "the-sky-raised-high",
      title: "The sky raised high",
      line: "Look at the sky: Allah raised it high with no cracks.",
      facts: ["Rufi'at: raised", "Ayah 50:6: no rifts"],
      quote: q88(18),
      source: ik(18, "Shurayh would invite people to look at the camels and how Allah raised the sky in magnificence above the ground.", "how Allah raised it in such magnificence above the ground"),
      difficulty: 1,
      questions: [
        { q: "What should we look at, per 88:18?", a: "The heaven, how it is raised", wrong: ["The road", "The market", "The palace"], why: "And at the heaven, how it is raised." },
        { q: "Which ayah says the sky has no rifts?", a: "50:6", wrong: ["2:255", "112:1", "1:2"], why: "Have they not looked at the heaven above them, how We have made it and adorned it and there are no rifts on it?" },
        { tf: false, q: "Shurayh told people never to look at the sky.", why: "Come out with us so that we may look at the camels and how they were created, and at the sky." }
      ]
    },
    {
      slug: "mountains-and-earth",
      title: "Mountains and earth",
      line: "Mountains hold the earth steady; the earth is spread out.",
      facts: ["Nusibat: set firm", "Sutihat: spread out"],
      quote: q88(19),
      source: ik(19, "Ibn Kathir says mountains are fixed firmly so the earth does not sway, and the earth is spread out and smooth.", "so that the earth does not sway with its dwellers"),
      difficulty: 2,
      questions: [
        { q: "What should we look at, per 88:19?", a: "The mountains, how they are rooted", wrong: ["The clouds", "The ships", "The walls"], why: "And at the mountains, how they are rooted." },
        { q: "Why are mountains firm, per Ibn Kathir?", a: "So the earth does not sway", wrong: ["To block the sun", "To hide gold", "For no reason"], why: "They are firmly affixed so that the earth does not sway with its dwellers." },
        { q: "How is the earth, per 88:20?", a: "Outspread", wrong: ["Rolled up", "Floating", "Shrinking"], why: "And at the earth, how it is outspread." }
      ]
    },
    {
      slug: "spread-and-still-round",
      title: "Spread out, still round",
      line: "The earth is spread out for us, yet it is still round.",
      facts: ["As-Sa'di explains", "Huge things look flat"],
      quote: q88(20),
      source: saadi(88, 20, "As-Sa'di says the earth was spread out so we can live, farm and travel on it, and this does not go against it being round, because it is so huge.", "واعلم أن تسطيحها لا ينافي أنها كرة مستديرة"),
      difficulty: 2,
      questions: [
        { q: "Does a spread-out earth clash with a round one?", a: "No, it is huge", wrong: ["Yes, always", "The Quran says flat", "No one knows"], why: "Spreading does not go against roundness for something so big, says as-Sa'di." },
        { q: "Why was the earth spread out?", a: "To live and farm on", wrong: ["To scare us", "For no reason", "Only for birds"], why: "To settle, farm, build and travel." },
        { tf: true, q: "As-Sa'di says the earth is round.", why: "As-Sa'di on 88:20." }
      ]
    },
    {
      slug: "the-questions-of-dimam",
      title: "The questions of Dimam",
      line: "A desert man asked who made the sky and earth, then believed.",
      facts: ["Dimam ibn Thalabah", "Five prayers, charity, Hajj"],
      quote: q88(19),
      source: ik(19, "Anas said a desert man asked who made the sky, earth and mountains, then asked about prayer, charity and Hajj.", "If he has spoken truthfully, he will certainly enter Paradise"),
      difficulty: 3,
      questions: [
        { q: "Whom did the man say created the heaven and earth?", a: "Allah", wrong: ["The stars", "The kings", "No one"], why: "The man said, Who created the heaven? He replied, Allah." },
        { q: "What did he promise when leaving?", a: "Not to add or take away anything", wrong: ["To come back rich", "To build a house", "To leave Islam"], why: "I will not add anything to these things and I will not decrease anything from them." },
        { q: "What did Muhammad ﷺ say about him?", a: "If truthful, he will enter Paradise", wrong: ["He is a liar", "He must pay gold", "He is a king"], why: "If he has spoken truthfully, he will certainly enter Paradise." }
      ]
    },
    {
      slug: "only-a-reminder",
      title: "You are only a reminder",
      line: "Muhammad ﷺ was sent to remind; guiding hearts belongs to Allah.",
      facts: ["Mudhakkir: one who reminds", "Ayah 13:40: only to convey"],
      quote: q88(21),
      source: ik(21, "Ibn Kathir says: O Muhammad, remind the people with what you were sent; your duty is only to convey.", "Remind the people with what you have been sent with to them"),
      difficulty: 2,
      questions: [
        { q: "What is he told in 88:21?", a: "So remind them", wrong: ["So rule them", "So leave them", "So punish them"], why: "So remind them, you are only one who reminds." },
        { q: "Which ayah says the duty is only to convey?", a: "13:40", wrong: ["2:2", "112:4", "1:4"], why: "Your duty is only to convey the Message and on Us is the reckoning." },
        { tf: true, q: "Our job is to remind kindly; Allah guides hearts.", why: "Remind the people with what you have been sent with to them." }
      ]
    },
    {
      slug: "not-a-controller",
      title: "Not a controller over them",
      line: "No one can force faith into a heart.",
      facts: ["Musaytir: controller", "Faith is from Allah"],
      quote: q88(22),
      source: ik(22, "Ibn Abbas said you are not a dictator over them; Ibn Kathir says you cannot create faith in their hearts.", "you cannot create faith in their hearts"),
      difficulty: 2,
      questions: [
        { q: "What is he not, per 88:22?", a: "A Musaytir over them", wrong: ["A Messenger", "A reminder", "A guide"], why: "You are not a Musaytir over them." },
        { q: "What did Ibn Abbas say Musaytir means?", a: "A dictator", wrong: ["A teacher", "A friend", "A trader"], why: "Ibn Abbas, Mujahid and others said, You are not a dictator over them." },
        { tf: false, q: "Faith can be forced into a heart.", why: "Ibn Zayd said, You are not the one who can force them to have faith." }
      ]
    },
    {
      slug: "your-part-is-done",
      title: "Do your part",
      line: "Once you have reminded people, the rest is not on you.",
      facts: ["As-Sa'di explains", "Remind, then rest"],
      quote: q88(22),
      source: saadi(88, 22, "As-Sa'di says the Prophet ﷺ was sent to remind, not to rule over people's deeds; once you have done your duty, there is no blame on you after that.", "فإذا قمت بما عليك، فلا عليك بعد ذلك لوم"),
      difficulty: 1,
      questions: [
        { q: "After reminding someone, what is on you?", a: "No blame", wrong: ["Their sins", "Forcing them", "Their reward"], why: "Once you do your duty, there is no blame on you, says as-Sa'di." },
        { q: "The Prophet ﷺ was sent to...?", a: "Remind people", wrong: ["Force faith", "Rule all hearts", "Punish people"], why: "Not as a controller over their deeds." },
        { tf: true, q: "We remind; guidance is from Allah.", why: "As-Sa'di on 88:22." }
      ]
    },
    {
      slug: "whoever-turns-away",
      title: "Whoever turns away",
      line: "Whoever turns away and disbelieves faces the greatest loss.",
      facts: ["Tawalla: turned away", "Kafar: disbelieved"],
      quote: q88(23),
      source: ik(23, "Ibn Kathir says he turns away from acting on its pillars and disbelieves with his heart and tongue.", "he turns away from acting upon its pillars"),
      difficulty: 3,
      questions: [
        { q: "Who is excepted in 88:23?", a: "The one who turns away and disbelieves", wrong: ["The one who prays", "The one who gives", "The one who fasts"], why: "Save the one who turns away and disbelieves." },
        { q: "What awaits him, per 88:24?", a: "The greatest punishment", wrong: ["A small prize", "Nothing", "A rest"], why: "Then Allah will punish him with the greatest punishment." },
        { q: "Which ayahs describe one who neither believed nor prayed?", a: "75:31-32", wrong: ["2:1-2", "112:1-2", "1:1-2"], why: "So he neither believed nor prayed! But on the contrary, he belied and turned away!" }
      ]
    },
    {
      slug: "return-and-reckoning",
      title: "Return and reckoning",
      line: "All return to Allah, and He will reckon every deed.",
      facts: ["Iyab: return", "Hisab: reckoning"],
      quote: q88(26),
      source: ik(26, "Ibn Kathir says Allah will reckon their deeds: good for good, and evil for evil.", "If they did good, they will receive good"),
      difficulty: 2,
      questions: [
        { q: "To whom is their return, per 88:25?", a: "To Allah", wrong: ["To their tribe", "To the earth only", "To no one"], why: "Verily, to Us will be their return." },
        { q: "Whose is the reckoning, per 88:26?", a: "Allah's", wrong: ["The kings'", "The judges'", "No one's"], why: "Then verily, for Us will be their reckoning." },
        { tf: true, q: "Every good deed will be rewarded with good.", why: "If they did good, they will receive good." }
      ]
    }
  ]
};

export const GHASHIYAH_UNITS: readonly DeepUnit[] = [GHASHIYAH_ONE, GHASHIYAH_TWO, GHASHIYAH_THREE];
