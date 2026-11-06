import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Ar-Rahman ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Ar-Rahman 55:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_55_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Ar-Rahman 55:${ayah}`,
    url: `https://quran.com/55:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 55:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q55 = (ayah: number) => quranQuote(55, ayah);

/** Ayahs 1 to 25: the Most Merciful taught the Quran, and the favors of creation, each followed by the question: which favor will you deny? */
const RAHMAN_ONE: DeepUnit = {
  key: "rahman1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-55",
  name: "Ar-Rahman, ayahs 1 to 25",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ar-Rahman",
  lessons: [
    {
      slug: "the-most-merciful",
      title: "The Most Merciful",
      line: "The surah opens with Allah's name: Ar-Rahman.",
      facts: ["Ar-Rahman means the Most Merciful", "The surah lists His favors"],
      quote: q55(1),
      source: ik(1, "Ibn Kathir says Allah tells of His favors and His mercy for His creatures, first of all the Quran.", "Allah informs of His favors and His mercy for His creatures"),
      difficulty: 1,
      questions: [
        { q: "What is the first word of Surah 55?", a: "Ar-Rahman", wrong: ["Al-Hamd", "Qul", "Alif Lam Mim"], why: "Ar-Rahman! He has taught the Quran." },
        { q: "What does the surah tell of, per Ibn Kathir?", a: "Allah's favors and mercy", wrong: ["Battles", "Laws of trade", "Old kings"], why: "Allah informs of His favors and His mercy for His creatures." },
        { tf: true, q: "Ar-Rahman means the Most Gracious, the Most Merciful.", why: "In the Name of Allah, the Most Gracious, the Most Merciful." }
      ]
    },
    {
      slug: "the-start-of-the-mufassal",
      title: "The start of the Mufassal",
      line: "Ibn Masud counted Ar-Rahman as the start of the Mufassal.",
      facts: ["Mufassal are the shorter surahs", "Recite slowly, not like poetry"],
      quote: q55(1),
      source: hadith("bukhari", "775", "Abdullah ibn Mas'ud", "Sahih", "A man said he recited the Mufassal in one rakah at night. Ibn Masud said that was too quick, like reciting poetry.", "This recitation is (too quick) like the recitation of poetry"),
      difficulty: 3,
      questions: [
        { q: "What did Ibn Masud dislike, per Bukhari 775?", a: "Reciting too quickly", wrong: ["Reciting at night", "Reciting in pairs", "Reciting softly"], why: "This recitation is (too quick) like the recitation of poetry." },
        { q: "How did he ﷺ recite the Mufassal surahs?", a: "In pairs in each rakah", wrong: ["All in one rakah", "Only on Fridays", "Only in Ramadan"], why: "I know the identical Suras which the Prophet ﷺ used to recite in pairs." },
        { tf: true, q: "Ibn Masud counted Ar-Rahman as the start of the Mufassal.", why: "And Ibn Masud considered Surat Ar-Rahman to be the beginning of the Mufassal section." }
      ]
    },
    {
      slug: "he-taught-the-quran",
      title: "He taught the Quran",
      line: "The Most Merciful taught the Quran.",
      facts: ["The Quran is His first favor named", "He made it easy to learn"],
      quote: q55(2),
      source: ik(2, "Ibn Kathir says Allah revealed the Quran and made memorizing and understanding it easy for those He shows mercy to.", "He made memorizing and understanding of it easy"),
      difficulty: 1,
      questions: [
        { q: "What did Ar-Rahman teach, in 55:2?", a: "The Quran", wrong: ["Trade", "Poetry", "Farming"], why: "He has taught the Quran." },
        { q: "What did Allah make easy, per Ibn Kathir?", a: "Memorizing and understanding it", wrong: ["Getting rich", "Avoiding work", "Travel"], why: "He made memorizing and understanding of it easy for those on whom He has bestowed His mercy." },
        { tf: true, q: "Teaching the Quran is named before creating man.", why: "Ar-Rahman! He has taught the Quran. He created man." }
      ]
    },
    {
      slug: "he-created-man",
      title: "He created man",
      line: "Allah created the human being.",
      facts: ["Every person is Allah's creation", "Then He taught us to speak"],
      quote: q55(3),
      source: ik(3, "Ibn Kathir lists the opening favors together: He taught the Quran, created man, and taught him clear speech.", "He created man. He taught him Al-Bayan"),
      difficulty: 1,
      questions: [
        { q: "Whom did Allah create, in 55:3?", a: "Man", wrong: ["The angels", "The jinn", "The stars"], why: "He created man." },
        { q: "What comes right after 55:3?", a: "He taught him Al-Bayan", wrong: ["He sent the flood", "He split the moon", "He raised a ship"], why: "He created man. He taught him Al-Bayan." },
        { tf: true, q: "Our life itself is one of Allah's favors.", why: "Allah informs of His favors and His mercy for His creatures." }
      ]
    },
    {
      slug: "clear-speech",
      title: "Clear speech",
      line: "Allah taught man Al-Bayan, clear speech.",
      facts: ["Al-Hasan: eloquent speech", "Tongue and lips form letters"],
      quote: q55(4),
      source: ik(4, "Ibn Kathir says Al-Bayan is eloquent speech: Allah made it easy to pronounce letters with the mouth, tongue and lips.", "making it easy for them to speak and pronounce letters"),
      difficulty: 2,
      questions: [
        { q: "What did Al-Hasan say Al-Bayan means?", a: "Eloquent speech", wrong: ["Good sight", "Strong arms", "Fast running"], why: "He taught him Al-Bayan. Al-Hasan said: Eloquent speech." },
        { q: "Which parts form letters, per Ibn Kathir?", a: "Mouth, tongue and lips", wrong: ["Hands and feet", "Eyes and ears", "Heart and lungs"], why: "The alveolar bridge, the tongue and the lips." },
        { tf: true, q: "Speech helps us recite the Quran.", why: "Teaching the servants how to recite it by making it easy for them to speak." }
      ]
    },
    {
      slug: "speech-and-writing",
      title: "Speech and writing",
      line: "Al-Bayan covers both speaking and writing what is in your mind.",
      facts: ["As-Sa'di explains", "A gift above animals"],
      quote: q55(4),
      source: saadi(55, 4, "As-Sa'di says Al-Bayan is making clear what is in the heart, covering both speaking and writing, and it is among the greatest blessings that set humans apart from animals.", "وهذا شامل للتعليم النطقي والتعليم الخطي"),
      difficulty: 1,
      questions: [
        { q: "What does Al-Bayan include, per as-Sa'di?", a: "Speaking and writing", wrong: ["Only singing", "Only walking", "Only eating"], why: "It covers speech and writing, says as-Sa'di." },
        { q: "What does Al-Bayan set humans apart from?", a: "Other animals", wrong: ["Angels", "Prophets", "Each other"], why: "It is a blessing that distinguishes humans from other creatures." },
        { tf: true, q: "Being able to write is a blessing from Allah.", why: "As-Sa'di on 55:4." }
      ]
    },
    {
      slug: "sun-and-moon-on-courses",
      title: "Sun and moon on courses",
      line: "The sun and moon run on exact, fixed courses.",
      facts: ["Never late, never off course", "Linked with 36:40"],
      quote: q55(5),
      source: ik(5, "Ibn Kathir says the sun and moon move in orbit by exact calculation, never delayed or disturbed.", "according to precise calculation that is never delayed nor disturbed"),
      difficulty: 2,
      questions: [
        { q: "How do the sun and moon run, in 55:5?", a: "On fixed courses", wrong: ["At random", "Backward", "Only at night"], why: "The sun and the moon run on fixed courses." },
        { q: "Is their timing ever late, per Ibn Kathir?", a: "No, never delayed", wrong: ["Yes, each winter", "Yes, sometimes", "Only the moon"], why: "According to precise calculation that is never delayed nor disturbed." },
        { q: "Which ayah does Ibn Kathir link with 55:5?", a: "36:40", wrong: ["2:255", "112:1", "1:2"], why: "It is not for the sun to overtake the moon. They all float, each in an orbit. (36:40)" }
      ]
    },
    {
      slug: "stars-and-trees-prostrate",
      title: "Stars and trees prostrate",
      line: "The stars and the trees bow down to Allah.",
      facts: ["All creation submits to Allah", "Linked with 22:18"],
      quote: q55(6),
      source: ik(6, "Ibn Kathir says the clearest meaning of An-Najm is the star in the sky, as 22:18 says all things prostrate to Allah.", "This is the saying that is the most obvious"),
      difficulty: 3,
      questions: [
        { q: "What prostrates, in 55:6?", a: "The Najm and the trees", wrong: ["The seas", "The clouds", "The winds"], why: "And the Najm and the trees prostrating." },
        { q: "What did Mujahid say An-Najm is?", a: "The star in the sky", wrong: ["A river", "A mountain", "A bird"], why: "Mujahid said, An-Najm (the star); the one that is in the sky." },
        { q: "What did Ibn Abbas say An-Najm is?", a: "Plants lying on the ground", wrong: ["The moon", "A camel", "A cloud"], why: "Ibn Abbas said, An-Najm refers to the plants that lay on the ground." }
      ]
    },
    {
      slug: "the-balance",
      title: "The balance",
      line: "Allah raised the sky high and set up the balance.",
      facts: ["The balance means justice", "Linked with 57:25"],
      quote: q55(7),
      source: ik(7, "Ibn Kathir says the balance here means justice, as in 57:25.", "meaning the justice"),
      difficulty: 2,
      questions: [
        { q: "What did Allah set up, in 55:7?", a: "The balance", wrong: ["A tower", "A wall", "A throne of gold"], why: "And the heaven He has raised high, and He has set up the balance." },
        { q: "What is the balance, per Ibn Kathir?", a: "Justice", wrong: ["Gold", "Weather", "A scale only"], why: "And He has set up the balance, meaning the justice." },
        { q: "Which ayah does Ibn Kathir link with 55:7?", a: "57:25", wrong: ["2:183", "97:1", "36:82"], why: "And sent down with them the Book and the balance that mankind may keep up equity. (57:25)" }
      ]
    },
    {
      slug: "do-not-transgress",
      title: "Do not transgress",
      line: "Allah set the balance so we never cross the limits of justice.",
      facts: ["Creation is founded on justice", "We must keep to justice too"],
      quote: q55(8),
      source: ik(8, "Ibn Kathir says Allah created the heavens and earth in justice and truth, so all things stand on justice.", "He created the heavens and earth in justice and truth"),
      difficulty: 2,
      questions: [
        { q: "Why was the balance set, in 55:8?", a: "So you do not transgress", wrong: ["So you get rich", "So you sleep", "So you travel"], why: "In order that you may not transgress the balance." },
        { q: "How were the heavens and earth made?", a: "In justice and truth", wrong: ["By chance", "In play", "In haste"], why: "He created the heavens and earth in justice and truth." },
        { tf: true, q: "Being unfair breaks the balance Allah set.", why: "So that everything is founded on, and observing, justice and truth." }
      ]
    },
    {
      slug: "weigh-with-justice",
      title: "Weigh with justice",
      line: "Weigh fairly and never give short measure.",
      facts: ["No cheating in weights", "Fairness in every deal"],
      quote: q55(9),
      source: ik(9, "Ibn Kathir says do not cheat in weights and measures, but observe justice and fairness.", "do not cheat in the weights and measures"),
      difficulty: 1,
      questions: [
        { q: "What must we not do, in 55:9?", a: "Make the balance short", wrong: ["Sell fruit", "Use scales", "Buy grain"], why: "And observe the weight with equity and do not make the balance deficient." },
        { q: "What does 55:9 forbid, per Ibn Kathir?", a: "Cheating in weights", wrong: ["Trading", "Farming", "Traveling"], why: "Do not cheat in the weights and measures, but rather observe justice and fairness." },
        { q: "Which ayah does Ibn Kathir link with 55:9?", a: "26:182", wrong: ["2:1", "18:10", "67:1"], why: "And weigh with the true and straight balance. (26:182)" }
      ]
    },
    {
      slug: "he-who-cheats",
      title: "He who cheats",
      line: "He ﷺ found hidden wet grain and warned against cheating.",
      facts: ["Put the wet part on top", "A cheater is not of his way"],
      quote: q55(9),
      source: hadith("muslim", "102", "Abu Hurairah", "Sahih", "The Prophet ﷺ found wet grain hidden in a heap and said: He who deceives is not of me.", "He who deceives is not of me"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ find in the heap, per Muslim 102?", a: "Wet grain hidden inside", wrong: ["Gold coins", "Stones", "Insects"], why: "He thrust his hand in that heap and his fingers were moistened." },
        { q: "What did he ﷺ say about one who deceives?", a: "He is not of me", wrong: ["He is clever", "He is forgiven", "He is rich"], why: "He who deceives is not of me." },
        { tf: true, q: "Hiding a fault in what we sell is cheating.", why: "Why did you not place this over other eatables so that the people could see it?" }
      ]
    },
    {
      slug: "the-earth-laid-out",
      title: "The earth laid out",
      line: "Allah laid out the earth for all creatures.",
      facts: ["Made stable with mountains", "Al-Anam means the creatures"],
      quote: q55(10),
      source: ik(10, "Ibn Kathir says Allah laid out the earth and steadied it with mountains, a home for every kind of creature.", "so that it would be stable for its residents"),
      difficulty: 2,
      questions: [
        { q: "For whom was the earth laid, in 55:10?", a: "For the creatures", wrong: ["For angels only", "For kings only", "For no one"], why: "And the earth He has put down (laid) for Al-Anam." },
        { q: "What steadies the earth, per Ibn Kathir?", a: "Firm mountains", wrong: ["Rivers", "Clouds", "Trees"], why: "Balanced it with firm mountains, so that it would be stable for its residents." },
        { tf: true, q: "Creatures differ in shape, color and language.", why: "Different in species, shape, color and language." }
      ]
    },
    {
      slug: "fruits-and-palms",
      title: "Fruits and palms",
      line: "On earth are fruits, and date palms with sheathed clusters.",
      facts: ["Fruits of every color and taste", "Akmam are sheathed stalks"],
      quote: q55(11),
      source: ik(11, "Ibn Kathir says the date palm is named for its benefit, fresh and dry; Akmam are its sheathed fruit stalks.", "because of its benefit, both fresh and dry"),
      difficulty: 2,
      questions: [
        { q: "Which tree is named, in 55:11?", a: "The date palm", wrong: ["The olive", "The fig", "The oak"], why: "And date palms producing Akmam." },
        { q: "Why is the date palm named, per Ibn Kathir?", a: "Its benefit, fresh and dry", wrong: ["Its height", "Its shade", "Its wood"], why: "Allah mentioned the date tree specifically because of its benefit, both fresh and dry." },
        { q: "What are Akmam, per Ibn Abbas?", a: "Sheathed fruit stalks", wrong: ["Roots", "Thorns", "Leaves"], why: "Ibn Abbas said Al-Akmam, means sheathed fruit stalks." }
      ]
    },
    {
      slug: "grain-and-sweet-plants",
      title: "Grain and sweet plants",
      line: "And grain with its husk, and fragrant plants.",
      facts: ["Asf is the straw of grain", "Rayhan: leaves or sweet plants"],
      quote: q55(12),
      source: ik(12, "Ibn Kathir says these are crops with straw, like wheat and barley, and Rayhan are the leaves on the stems.", "such as wheat and barley"),
      difficulty: 3,
      questions: [
        { q: "What does Asf mean, per Ibn Abbas?", a: "Straw", wrong: ["Fruit", "Water", "Seeds"], why: "Ibn Abbas said that in, And also corn, with its Asf, Asf means straw." },
        { q: "What did Al-Hasan say Rayhan means?", a: "Sweet-scented plants", wrong: ["Rocks", "Rain", "Birds"], why: "Al-Hasan said that it means sweet-scented plants." },
        { q: "Which crops does Ibn Kathir name?", a: "Wheat and barley", wrong: ["Rice and tea", "Corn and cotton", "Beans and peas"], why: "The various crops that produce straw, such as wheat and barley." }
      ]
    },
    {
      slug: "which-favor-will-you-deny",
      title: "Which favor will you deny?",
      line: "Then which of your Lord's favors will you both deny?",
      facts: ["Said to mankind and jinn", "Repeated 31 times in the surah"],
      quote: q55(13),
      source: ik(13, "Ibn Kathir says it means: O mankind and jinn, which of Allah's favors do you deny? You are surrounded by them.", "O mankind and Jinn, which of the favors that Allah has given to you do you deny"),
      difficulty: 1,
      questions: [
        { q: "Who are you both, per Ibn Kathir?", a: "Mankind and jinn", wrong: ["Two angels", "Two kings", "Two brothers"], why: "O mankind and Jinn, which of the favors that Allah has given to you do you deny?" },
        { q: "What should we say when we hear it?", a: "None of Your favors do we deny", wrong: ["Nothing", "Maybe later", "Some of them"], why: "O Allah! None of Your favors do we deny. All praise is due to You." },
        { tf: true, q: "Ibn Abbas would answer: Nay, our Lord!", why: "Ibn Abbas used to say, Nay, our Lord! meaning, None of Your favors do we deny." }
      ]
    },
    {
      slug: "the-jinns-answer",
      title: "The jinn's answer",
      line: "Hearing Allah's favours, we should admit them and thank Him.",
      facts: ["As-Sa'di explains", "None of Your favours we deny"],
      quote: q55(13),
      source: saadi(55, 13, "As-Sa'di praises the jinn's answer when the Prophet ﷺ recited Ar-Rahman: none of Your favours, our Lord, do we deny, so praise is Yours; a servant should admit Allah's favours and thank Him.", "فهذا الذي ينبغي للعبد إذا تليت عليه نعم الله وآلاؤه، أن يقر بها ويشكر"),
      difficulty: 2,
      questions: [
        { q: "What did the jinn say at each which favour line?", a: "We deny none of Your favours", wrong: ["They stayed silent", "They laughed", "They left"], why: "None of Your favours, our Lord, do we deny; to You is praise." },
        { q: "What should we do when Allah's favours are recited, per as-Sa'di?", a: "Admit them and thank Him", wrong: ["Ignore them", "Count them only", "Forget them"], why: "A servant should affirm them and give thanks, says as-Sa'di." },
        { tf: true, q: "The favours in Ar-Rahman are for both humans and jinn.", why: "As-Sa'di on 55:13." }
      ]
    },
    {
      slug: "clay-like-pottery",
      title: "Clay like pottery",
      line: "Allah created man from dry clay, like pottery.",
      facts: ["Adam was made from clay", "Like the clay of a potter"],
      quote: q55(14),
      source: ik(14, "Ibn Kathir says Allah created mankind from clay like that used in pottery.", "He created mankind from clay, like that used in pottery"),
      difficulty: 1,
      questions: [
        { q: "From what was man created, in 55:14?", a: "Sounding clay", wrong: ["Fire", "Light", "Water only"], why: "He created man from sounding clay like the clay of pottery." },
        { q: "What is the clay likened to?", a: "Pottery clay", wrong: ["Sand", "Stone", "Iron"], why: "Like the clay of pottery." },
        { tf: true, q: "Adam, the first man, was made from clay.", why: "Allah mentions that He created mankind from clay, like that used in pottery." }
      ]
    },
    {
      slug: "jinn-from-fire",
      title: "Jinn from fire",
      line: "And Allah created the jinn from a smokeless flame.",
      facts: ["The jinn are made of fire", "From its best, smokeless part"],
      quote: q55(15),
      source: ik(15, "Ibn Kathir reports Ibn Abbas: the jinn were made from the best part of the fire, its smokeless flame.", "From the best part of the fire, from its smokeless flame"),
      difficulty: 2,
      questions: [
        { q: "From what were the jinn made, in 55:15?", a: "A smokeless flame of fire", wrong: ["Clay", "Light", "Water"], why: "And the Jinn He created from a smokeless flame of fire." },
        { q: "Which part of the fire, per Ibn Abbas?", a: "The best part, its smokeless flame", wrong: ["Its ashes", "Its smoke", "Its coals"], why: "From the best part of the fire, from its smokeless flame." },
        { tf: false, q: "The jinn were created from clay.", why: "The Jinn He created from a smokeless flame of fire." }
      ]
    },
    {
      slug: "angels-from-light",
      title: "Angels from light",
      line: "Angels from light, jinn from fire, Adam from clay.",
      facts: ["Three kinds of creation", "Each from a different thing"],
      quote: q55(15),
      source: hadith("muslim", "2996", "Aishah", "Sahih", "The Prophet ﷺ said the angels were made from light, the jinn from fire, and Adam from what was described to you.", "The Angels were born out of light"),
      difficulty: 2,
      questions: [
        { q: "From what were angels made, per Muslim 2996?", a: "Light", wrong: ["Fire", "Clay", "Water"], why: "The Angels were born out of light." },
        { q: "From what was Adam made, as described?", a: "Clay", wrong: ["Light", "Fire", "Wind"], why: "Adam was born as he has been defined for you (i. e. he is fashioned out of clay)." },
        { q: "Who narrated Muslim 2996?", a: "Aishah", wrong: ["Anas", "Umar", "Abu Bakr"], why: "Aishah reported that Allah's Messenger said." }
      ]
    },
    {
      slug: "the-favor-of-our-making",
      title: "The favor of our making",
      line: "Our very making is a favor: which favor will you deny?",
      facts: ["Man and jinn are both addressed", "Both owe thanks to Allah"],
      quote: q55(16),
      source: ik(16, "Ibn Kathir says after naming the creation of man and jinn, the question of 55:13 comes again, as explained before.", "was explained above"),
      difficulty: 1,
      questions: [
        { q: "Which favor is just named before 55:16?", a: "Creating man and jinn", wrong: ["The ships", "The pearls", "The gardens"], why: "He created man from sounding clay. And the Jinn He created from a smokeless flame." },
        { q: "Who is asked in 55:16?", a: "Mankind and jinn", wrong: ["Only angels", "Only animals", "Only prophets"], why: "Then which of the blessings of your Lord will you both deny?" },
        { tf: true, q: "Being created at all is a favor from Allah.", why: "Allah informs of His favors and His mercy for His creatures." }
      ]
    },
    {
      slug: "two-easts-two-wests",
      title: "Two easts, two wests",
      line: "He is Lord of the two easts and the two wests.",
      facts: ["Summer and winter sunrise", "Summer and winter sunset"],
      quote: q55(17),
      source: ik(17, "Ibn Kathir says the two easts and two wests are the sunrise and sunset points of summer and winter.", "the sunrise of summer and winter and the sunset of summer and winter"),
      difficulty: 2,
      questions: [
        { q: "What are the two easts, per Ibn Kathir?", a: "Summer and winter sunrises", wrong: ["Two countries", "Two rivers", "Two moons"], why: "Meaning the sunrise of summer and winter and the sunset of summer and winter." },
        { q: "Which ayah speaks of all the sunrises?", a: "70:40", wrong: ["55:1", "2:2", "114:6"], why: "So, I swear by the Lord of all the points of sunrise and sunset. (70:40)" },
        { tf: true, q: "The changing sunrise points bring benefits to creation.", why: "The different places of sunrise and sunset and the benefits that this variation brings to the created." }
      ]
    },
    {
      slug: "the-favor-of-seasons",
      title: "The favor of seasons",
      line: "Changing sunrises bring seasons: which favor will you deny?",
      facts: ["Seasons help crops and life", "Allah alone controls them"],
      quote: q55(18),
      source: ik(18, "Ibn Kathir links this with 73:9: the Lord of the east and the west, none is worthy of worship but He.", "none has the right to be worshipped but He"),
      difficulty: 2,
      questions: [
        { q: "Which favor comes just before 55:18?", a: "The two easts and two wests", wrong: ["The two seas", "The two gardens", "The two springs"], why: "The Lord of the two easts and the Lord of the two wests." },
        { q: "What does 73:9 say about the Lord of the east?", a: "None is worshipped but He", wrong: ["He sleeps", "He has partners", "He is far"], why: "The Lord of the east and the west; none has the right to be worshipped but He." },
        { tf: true, q: "We should trust Allah alone, as 73:9 says.", why: "So take Him alone as a trustee. (73:9)" }
      ]
    },
    {
      slug: "two-seas-meet",
      title: "Two seas meet",
      line: "He let the two seas flow, meeting each other.",
      facts: ["Fresh water and salt water", "Rivers meet the sea"],
      quote: q55(19),
      source: ik(19, "Ibn Kathir says the two seas are the fresh and salty waters, the fresh coming from running rivers.", "The two seas are the fresh and salty waters"),
      difficulty: 2,
      questions: [
        { q: "What are the two seas, per Ibn Kathir?", a: "Fresh and salty waters", wrong: ["Two oceans of salt", "Two lakes", "Rain and snow"], why: "The two seas are the fresh and salty waters." },
        { q: "Where does the fresh water come from?", a: "Running rivers", wrong: ["Clouds only", "Ice", "Wells"], why: "The former coming from running rivers." },
        { q: "What did Ibn Abbas say Maraja means?", a: "Let them loose", wrong: ["Froze them", "Dried them", "Hid them"], why: "He has Maraja the two seas, or let them loose, according to Ibn Abbas." }
      ]
    },
    {
      slug: "a-barrier-between",
      title: "A barrier between",
      line: "Between them is a barrier neither can cross.",
      facts: ["Each keeps its own nature", "Linked with 25:53"],
      quote: q55(20),
      source: ik(20, "Ibn Kathir says Allah placed a barrier between the two waters so neither spoils the other.", "so that they do not transgress upon each other"),
      difficulty: 2,
      questions: [
        { q: "What is between the two seas, in 55:20?", a: "A barrier", wrong: ["A bridge", "A wall of ice", "A city"], why: "Between them is a barrier which none of them can transgress." },
        { q: "Why is the barrier there, per Ibn Kathir?", a: "So neither spoils the other", wrong: ["For ships", "For fishing", "For war"], why: "So that they do not transgress upon each other, which would spoil the characteristics they were created with." },
        { q: "Which ayah does Ibn Kathir link with 55:20?", a: "25:53", wrong: ["55:60", "1:7", "2:30"], why: "One palatable and sweet, and the other salty and bitter; and He has set a barrier. (25:53)" }
      ]
    },
    {
      slug: "the-favor-of-water",
      title: "The favor of water",
      line: "Sweet water to drink: which favor will you deny?",
      facts: ["Fresh water stays sweet", "Each water keeps its nature"],
      quote: q55(21),
      source: ik(21, "Ibn Kathir says the barrier keeps each water as it was created, which would otherwise be spoiled.", "which would spoil the characteristics they were created with"),
      difficulty: 2,
      questions: [
        { q: "Which favor comes just before 55:21?", a: "The barrier between two seas", wrong: ["The ships", "The pearls", "The fruits"], why: "Between them is a barrier which none of them can transgress." },
        { q: "What would happen without the barrier?", a: "The waters would be spoiled", wrong: ["Nothing", "More fish", "More rain"], why: "Which would spoil the characteristics they were created with." },
        { tf: true, q: "Sweet water to drink is a great favor.", why: "One palatable and sweet, and the other salty and bitter. (25:53)" }
      ]
    },
    {
      slug: "pearls-and-coral",
      title: "Pearls and coral",
      line: "From both seas come pearls and Marjan.",
      facts: ["Marjan: small pearls or coral", "Adornment from Allah"],
      quote: q55(22),
      source: ik(22, "Ibn Kathir says pearls are well known, and many said Marjan means small pearls; others said large precious pearls.", "As for Marjan they say it means small pearls"),
      difficulty: 2,
      questions: [
        { q: "What comes from the seas, in 55:22?", a: "Pearls and Marjan", wrong: ["Gold and silver", "Iron and copper", "Salt and sand"], why: "Out of them both come out pearls and Al-Marjan." },
        { q: "What does Marjan mean, per many scholars?", a: "Small pearls", wrong: ["Shells", "Fish", "Seaweed"], why: "As for Marjan they say it means small pearls." },
        { tf: true, q: "Ibn Abbas said rain drops in oysters turn into pearls.", why: "When it rains, the oysters in the sea open their mouths. What falls in them, the drops, turns into pearls." }
      ]
    },
    {
      slug: "the-favor-of-adornment",
      title: "The favor of adornment",
      line: "Pearls are a gift of beauty: which favor will you deny?",
      facts: ["Adornment is a favor", "Allah reminds us of it"],
      quote: q55(23),
      source: ik(23, "Ibn Kathir says since adornment is a favor from Allah to the people of earth, He reminded them of it.", "this type of adornment is a favor from Allah to the people of earth"),
      difficulty: 1,
      questions: [
        { q: "Which favor comes just before 55:23?", a: "Pearls and Marjan", wrong: ["The sun and moon", "The ships", "The gardens"], why: "Out of them both come out pearls and Al-Marjan." },
        { q: "Why are pearls mentioned, per Ibn Kathir?", a: "They are a favor to remind us", wrong: ["To sell them", "To count them", "To fear them"], why: "Since this type of adornment is a favor from Allah to the people of earth, He reminded them of it." },
        { tf: true, q: "Beautiful things are also gifts from Allah.", why: "This type of adornment is a favor from Allah to the people of earth." }
      ]
    },
    {
      slug: "ships-like-mountains",
      title: "Ships like mountains",
      line: "His are the ships sailing the seas, tall like mountains.",
      facts: ["Ships carry trade and goods", "Mujahid: those with sails"],
      quote: q55(24),
      source: ik(24, "Ibn Kathir says the ships are like mountains in size, and carry goods from one land to another.", "they are like mountains with their great size"),
      difficulty: 2,
      questions: [
        { q: "What are Al-Jawar, per Ibn Kathir?", a: "Ships that float", wrong: ["Birds", "Fish", "Clouds"], why: "And His are Al-Jawar Al-Munshaat, meaning the ships that float." },
        { q: "What are the ships like, in 55:24?", a: "Mountains", wrong: ["Leaves", "Feathers", "Stones"], why: "In the seas like Alam. They are like mountains with their great size." },
        { q: "Which ships did Mujahid call Munshaat?", a: "Those that hoist a sail", wrong: ["Small boats only", "Sunken ships", "War ships only"], why: "Whatever ship hoists a sail, it is from Munshaat." }
      ]
    },
    {
      slug: "the-favor-of-ships",
      title: "The favor of ships",
      line: "Ships bring us goods from far lands: which favor will you deny?",
      facts: ["Trade between lands", "Goods we need reach us"],
      quote: q55(25),
      source: ik(25, "Ibn Kathir says ships carry the goods people need from one province to another.", "transporting cargo from one area to another"),
      difficulty: 1,
      questions: [
        { q: "Which favor comes just before 55:25?", a: "Ships sailing the seas", wrong: ["Two gardens", "Pearls", "Fruit"], why: "And His are Al-Jawar Al-Munshaat, in the seas like Alam." },
        { q: "What do ships carry, per Ibn Kathir?", a: "Goods people need", wrong: ["Only kings", "Only soldiers", "Nothing"], why: "Transporting different types of goods they need." },
        { tf: true, q: "Trade by sea is one of Allah's favors.", why: "Ships provide various benefits for people, including transporting different types of goods they need." }
      ]
    }
  ]
};

/** Ayahs 26 to 45: all will pass away but Allah, all creatures ask of Him, and the Day of Judgment for mankind and jinn. */
const RAHMAN_TWO: DeepUnit = {
  key: "rahman2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-55",
  name: "Ar-Rahman, ayahs 26 to 45",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ar-Rahman",
  lessons: [
    {
      slug: "all-will-perish",
      title: "All will perish",
      line: "Everyone on the earth will pass away.",
      facts: ["Every living thing will die", "Only Allah never dies"],
      quote: q55(26),
      source: ik(26, "Ibn Kathir says all the residents of earth will perish and die, and only Allah, the Ever Living, remains.", "the Ever Living Who never dies"),
      difficulty: 1,
      questions: [
        { q: "What happens to all on earth, in 55:26?", a: "They will perish", wrong: ["They live forever", "They become stars", "They sleep"], why: "Whatsoever is on it (the earth) will perish." },
        { q: "Who never dies, per Ibn Kathir?", a: "Allah, the Ever Living", wrong: ["The angels", "The mountains", "The sun"], why: "Our Lord, the Exalted, the Blessed, is the Ever Living Who never dies." },
        { tf: true, q: "Ash-Shabi said not to stop after 55:26, but read 55:27.", why: "When you have recited, Whatsoever is on it will perish, do not stop, continue reading." }
      ]
    },
    {
      slug: "everything-but-allah-passes",
      title: "Everything but Allah passes",
      line: "He ﷺ praised the poet's words: all but Allah will pass.",
      facts: ["Labid said true words", "This world does not last"],
      quote: q55(26),
      source: hadith("bukhari", "3841", "Abu Hurairah", "Sahih", "The Prophet ﷺ said the truest words of a poet were Labid's: Everything except Allah is perishable.", "Everything except Allah is perishable"),
      difficulty: 2,
      questions: [
        { q: "Whose words did he ﷺ call most true?", a: "Labid's", wrong: ["Hassan's", "Antarah's", "Umayyah's"], why: "The most true words said by a poet was the words of Labid." },
        { q: "What did Labid say?", a: "All but Allah will perish", wrong: ["Gold lasts forever", "Kings never die", "Fame never fades"], why: "Verily, Everything except Allah is perishable." },
        { tf: true, q: "Labid's line agrees with 55:26-27.", why: "Whatsoever is on it will perish. And the Face of your Lord will remain forever." }
      ]
    },
    {
      slug: "owner-of-majesty-and-honor",
      title: "Owner of majesty and honor",
      line: "Your Lord remains forever, Owner of Majesty and Honor.",
      facts: ["Dhul-Jalal wal-Ikram", "Worthy to be obeyed, never defied"],
      quote: q55(27),
      source: ik(27, "Ibn Kathir says Allah is Worthy of being revered and obeyed. Ibn Abbas said Dhul-Jalal wal-Ikram means Owner of greatness and pride.", "Owner of greatness and pride"),
      difficulty: 2,
      questions: [
        { q: "Which name of Allah is in 55:27?", a: "Dhul-Jalal wal-Ikram", wrong: ["Al-Wadud", "Al-Hakim", "As-Sami"], why: "Your Lord Dhul-Jalal wal-Ikram will remain forever." },
        { q: "How did Ibn Abbas explain the name?", a: "Owner of greatness and pride", wrong: ["Owner of wealth", "Owner of the seas", "Owner of time"], why: "Ibn Abbas commented on the meaning of Dhul-Jalal wal-Ikram, by saying, Owner of greatness and pride." },
        { q: "Which ayah does Ibn Kathir link with 55:27?", a: "28:88", wrong: ["2:43", "103:2", "19:1"], why: "Everything will perish save His Face. (28:88)" }
      ]
    },
    {
      slug: "the-favor-of-justice-ahead",
      title: "The favor of a just end",
      line: "Allah will judge all fairly: which favor will you deny?",
      facts: ["All will return to Allah", "His judgment is fair"],
      quote: q55(28),
      source: ik(28, "Ibn Kathir says after all on earth die, they end up in the Hereafter, where Allah judges them by His fair judgment.", "will judge them by His fair judgement"),
      difficulty: 2,
      questions: [
        { q: "Where do all end up, per Ibn Kathir?", a: "In the Hereafter", wrong: ["Nowhere", "In the sea", "In the stars"], why: "All of the inhabitants of the earth will die and end up in the Hereafter." },
        { q: "How will Allah judge them?", a: "By His fair judgment", wrong: ["By luck", "By wealth", "By family"], why: "When He, Dhul-Jalal wal-Ikram, will judge them by His fair judgement." },
        { tf: true, q: "A fair Judge is a favor for those wronged.", why: "Will judge them by His fair judgement." }
      ]
    },
    {
      slug: "all-ask-of-him",
      title: "All ask of Him",
      line: "All in the heavens and earth ask of Him every day.",
      facts: ["All creation needs Allah", "He answers, gives and cures"],
      quote: q55(29),
      source: ik(29, "Ibn Kathir says Allah is free of need and all creatures need Him; among His affairs He answers the caller and cures the sick.", "He answers the supplicant, or gives to the one requesting"),
      difficulty: 2,
      questions: [
        { q: "Who asks of Allah, in 55:29?", a: "All in the heavens and earth", wrong: ["Only prophets", "Only the poor", "Only angels"], why: "Whosoever is in the heavens and on the earth begs of Him." },
        { q: "Name one of His daily affairs, per Ubayd.", a: "He answers the one who calls", wrong: ["He sleeps", "He rests", "He forgets"], why: "Of His affairs is that He answers the supplicant, or gives to the one requesting." },
        { tf: false, q: "Allah needs His creatures.", why: "Allah affirms that He is Rich, Free of all wants for anyone else and that all creatures stand in need of Him." }
      ]
    },
    {
      slug: "never-tired-of-asking",
      title: "Never tired of our asking",
      line: "Allah never tires of people asking Him again and again.",
      facts: ["As-Sa'di explains", "Every day a new matter"],
      quote: q55(29),
      source: saadi(55, 29, "As-Sa'di says Allah answers every need each day, and no matter distracts Him from another; the insistence of those who insist does not weary Him, nor the long asking of those who ask.", "ولا يبرمه إلحاح الملحين، ولا طول مسألة السائلين"),
      difficulty: 2,
      questions: [
        { q: "Does asking Allah many times tire Him, per as-Sa'di?", a: "No, never", wrong: ["Yes", "After ten times", "Only at night"], why: "The insistence of askers never wearies Him, says as-Sa'di." },
        { q: "What does Allah do every day, per Ar-Rahman 55:29?", a: "Meets the needs of all", wrong: ["Rests", "Nothing", "Only one thing"], why: "He enriches the poor, heals the broken, gives and holds back." },
        { tf: true, q: "Every creature needs Allah every moment.", why: "As-Sa'di on 55:29." }
      ]
    },
    {
      slug: "ask-me-and-i-will-give",
      title: "Ask Me and I will give",
      line: "Allah says: ask Me for food and I will feed you.",
      facts: ["A hadith qudsi", "Ask Allah for guidance and food"],
      quote: q55(29),
      source: hadith("muslim", "2577", "Abu Dharr", "Sahih", "Allah says: all of you are hungry except whom I feed, so seek food of Me and I shall feed you.", "so seek food of Me and I shall feed you"),
      difficulty: 2,
      questions: [
        { q: "What does Allah say, per Muslim 2577?", a: "Seek food of Me, I will feed you", wrong: ["Do not ask Me", "Ask only once", "Ask the rich"], why: "So seek food of Me and I shall feed you." },
        { q: "What must we seek for guidance?", a: "Ask Allah for it", wrong: ["Ask the stars", "Wait for luck", "Nothing"], why: "So seek guidance of Me and I shall guide you." },
        { tf: true, q: "Allah forgives all sins for those who ask.", why: "I forgive all sins, so seek forgiveness of Me and I shall forgive you." }
      ]
    },
    {
      slug: "the-favor-of-answered-dua",
      title: "The favor of answered dua",
      line: "He answers and gives each day: which favor will you deny?",
      facts: ["He removes hardship", "He cures the sick"],
      quote: q55(30),
      source: ik(30, "Ibn Kathir quotes Ubayd bin Umayr: among His affairs, He removes adversity or cures the one seeking a cure.", "or removing adversity, or cures the one seeking to be cured"),
      difficulty: 1,
      questions: [
        { q: "Which favor comes just before 55:30?", a: "Allah's care for every request", wrong: ["The two seas", "The ships", "The pearls"], why: "Whosoever is in the heavens and on the earth begs of Him. Every day He is engaged in some affair." },
        { q: "Whom does Allah cure, per Ubayd?", a: "The one seeking a cure", wrong: ["No one", "Only kings", "Only the young"], why: "Or cures the one seeking to be cured." },
        { tf: true, q: "Ubayd said Allah also removes hardship.", why: "Or removing adversity." }
      ]
    },
    {
      slug: "we-shall-attend-to-you",
      title: "We shall attend to you",
      line: "Allah will attend to you, O mankind and jinn.",
      facts: ["Ath-Thaqalan: mankind and jinn", "Nothing busies Allah"],
      quote: q55(31),
      source: ik(31, "Ibn Kathir says Al-Bukhari explained it as We shall recompense you; nothing distracts Allah from anything else.", "Surely, nothing will busy Allah from attending to anything else"),
      difficulty: 2,
      questions: [
        { q: "Who are Ath-Thaqalan, per Ibn Kathir?", a: "Mankind and jinn", wrong: ["Two angels", "Sun and moon", "Two prophets"], why: "O you Thaqalan! refers to the humans and the Jinns." },
        { q: "What did Al-Bukhari say it means?", a: "We shall recompense you", wrong: ["We shall leave you", "We shall forget you", "We shall feed you"], why: "Al-Bukhari said that it means, We shall recompense you." },
        { tf: false, q: "One matter can keep Allah busy from another.", why: "Surely, nothing will busy Allah from attending to anything else." }
      ]
    },
    {
      slug: "the-favor-of-a-warning",
      title: "The favor of a warning",
      line: "A warning before the Day: which favor will you deny?",
      facts: ["Being warned is a mercy", "So we prepare in time"],
      quote: q55(32),
      source: ik(32, "Ibn Kathir explains that Ibn Jurayj said We shall attend to you means We shall judge you.", "We shall judge you"),
      difficulty: 2,
      questions: [
        { q: "What did Ibn Jurayj say 55:31 means?", a: "We shall judge you", wrong: ["We shall feed you", "We shall hide you", "We shall rest"], why: "We shall attend to you, means, We shall judge you." },
        { q: "Why is a warning a favor?", a: "It lets us prepare in time", wrong: ["It is fun", "It brings money", "It is a test of speed"], why: "A Warning for Humans and Jinn." },
        { tf: true, q: "Both mankind and jinn will be judged.", why: "O you Thaqalan! refers to the humans and the Jinns." }
      ]
    },
    {
      slug: "no-escape-without-authority",
      title: "No escape without authority",
      line: "If you can pass beyond the heavens and earth, then pass!",
      facts: ["None can escape Allah's rule", "Only with His command"],
      quote: q55(33),
      source: ik(33, "Ibn Kathir says you will never escape Allah's orders and decrees; they surround you wherever you are.", "you will never be able to escape Allah"),
      difficulty: 2,
      questions: [
        { q: "Who is challenged, in 55:33?", a: "Jinn and men", wrong: ["Only birds", "Only angels", "Only kings"], why: "O assembly of Jinn and men!" },
        { q: "Can anyone escape Allah's rule?", a: "No, it surrounds them", wrong: ["Yes, by flying", "Yes, by digging", "Yes, the strong"], why: "You will never be able to escape Allah's orders and decrees, because it encompasses you." },
        { q: "What does except with authority mean?", a: "Except by Allah's command", wrong: ["Except with money", "Except with ships", "Except at night"], why: "Except with authority, meaning, except with the commandment from Allah." }
      ]
    },
    {
      slug: "angels-surround-the-gathering",
      title: "Angels surround the Gathering",
      line: "On that Day, rows of angels surround all creation.",
      facts: ["Seven lines of angels", "No one can run away"],
      quote: q55(34),
      source: ik(34, "Ibn Kathir says at the Gathering the angels, in seven lines in every direction, will surround the creatures.", "comprising seven lines in every direction"),
      difficulty: 3,
      questions: [
        { q: "How many lines of angels, per Ibn Kathir?", a: "Seven lines", wrong: ["One line", "Three lines", "Ten lines"], why: "The angels, comprising seven lines in every direction, will surround the creatures." },
        { q: "Which ayahs say man will look for a refuge?", a: "75:10-12", wrong: ["1:1-3", "112:1-4", "2:1-3"], why: "On that Day man will say: Where is the refuge to flee? No! There is no refuge! (75:10-12)" },
        { tf: true, q: "Knowing this ahead is a favor, so we prepare.", why: "Then which of the blessings of your Lord will you both deny?" }
      ]
    },
    {
      slug: "flame-and-smoke",
      title: "Flame and smoke",
      line: "Those who flee are turned back by flame and smoke.",
      facts: ["Shuwaz: the flame of fire", "Nuhas: the smoke, per Ibn Abbas"],
      quote: q55(35),
      source: ik(35, "Ibn Kathir reports from Ibn Abbas that Shuwaz is the flame of fire, and Nuhas is the smoke of the fire.", "Shuwāz is the flame of fire"),
      difficulty: 3,
      questions: [
        { q: "What is Shuwaz, per Ibn Abbas?", a: "The flame of fire", wrong: ["A river", "A wind", "A cloud"], why: "Ibn Abbas that Shuwaz is the flame of fire." },
        { q: "What is Nuhas, per Ibn Abbas?", a: "The smoke of the fire", wrong: ["A tree", "A stone", "A star"], why: "And Nuhas, Ibn Abbas: The smoke of the fire." },
        { tf: false, q: "Mankind and jinn can defend themselves that Day.", why: "And you will not be able to defend yourselves." }
      ]
    },
    {
      slug: "the-favor-of-being-told",
      title: "The favor of being told",
      line: "We are warned in time: which favor will you deny?",
      facts: ["The warning comes in this life", "There is still time to repent"],
      quote: q55(36),
      source: ik(36, "Ibn Kathir closes this part with the ayah: you will not be able to defend yourselves, then which favor will you deny?", "and you will not be able to defend yourselves"),
      difficulty: 2,
      questions: [
        { q: "Which ayah ends with 55:36's question?", a: "The warning of flame and smoke", wrong: ["The ships", "The two seas", "The pearls"], why: "There will be sent against you both, Shuwaz of fire and Nuhas. Then which of the blessings of your Lord will you both deny?" },
        { q: "Why is a warning now a favor?", a: "We can still change", wrong: ["It is a story", "It is a game", "It changes nothing"], why: "And you will not be able to defend yourselves." },
        { tf: true, q: "The best time to repent is in this life.", why: "And you will not be able to defend yourselves." }
      ]
    },
    {
      slug: "the-sky-splits",
      title: "The sky splits",
      line: "When the sky splits open and turns red like oil.",
      facts: ["On the Day of Resurrection", "Colors change like dyes"],
      quote: q55(37),
      source: ik(37, "Ibn Kathir says the sky will melt and change colors like dyes, showing the great terror of that Day.", "This demonstrates the extent of the horrors of the Mighty Day of Resurrection"),
      difficulty: 2,
      questions: [
        { q: "When does the sky split, per Ibn Kathir?", a: "On the Day of Resurrection", wrong: ["Every night", "Each winter", "At sunset"], why: "Then when the heaven is rent asunder, on the Day of Resurrection." },
        { q: "What did Mujahid say Dihan means?", a: "Like the colors of dyes", wrong: ["Like ice", "Like sand", "Like glass"], why: "Like Dihan, Like the colors of dyes." },
        { q: "Which ayahs also tell of the sky splitting?", a: "84:1-2", wrong: ["1:1-2", "97:1-2", "108:1-2"], why: "When the heaven is split asunder, and listens to and obeys its Lord. (84:1-2)" }
      ]
    },
    {
      slug: "the-favor-of-knowing-the-day",
      title: "The favor of knowing",
      line: "Allah told us of the Day ahead: which favor will you deny?",
      facts: ["The sky obeys its Lord", "Linked with 69:16 and 25:25"],
      quote: q55(38),
      source: ik(38, "Ibn Kathir links the splitting of the sky with 84:1-2: it listens to and obeys its Lord.", "listens to and obeys its Lord"),
      difficulty: 2,
      questions: [
        { q: "What does the sky do, per 84:2?", a: "Listens to and obeys its Lord", wrong: ["Refuses", "Sleeps", "Hides"], why: "When the heaven is split asunder, and listens to and obeys its Lord." },
        { q: "Which ayah says angels are sent down then?", a: "25:25", wrong: ["2:2", "55:1", "112:3"], why: "The Day when the heaven shall be rent asunder with clouds, and the angels will be sent down. (25:25)" },
        { tf: true, q: "Even the sky obeys Allah's command.", why: "And listens to and obeys its Lord, and it must do so." }
      ]
    },
    {
      slug: "no-question-at-that-time",
      title: "No question at that time",
      line: "At that time, no human or jinn is asked of their sin.",
      facts: ["Then all will be questioned", "Hands and feet will speak"],
      quote: q55(39),
      source: ik(39, "Ibn Kathir says at that moment none speak, then later all are questioned; Qatadah said hands and feet will tell what they did.", "their hands and feet will reveal what they used to do"),
      difficulty: 3,
      questions: [
        { q: "Who is not questioned at that time?", a: "Human or jinn", wrong: ["Only angels", "Only animals", "No one is"], why: "On that Day he will not be questioned about his sin, neither human nor Jinn." },
        { q: "What happens later, per Ibn Kathir?", a: "All are questioned", wrong: ["All are forgotten", "All go home", "Nothing"], why: "This is the case at the time, then all the creatures will be questioned about their deeds." },
        { q: "What did Qatadah say will speak?", a: "Their hands and feet", wrong: ["Their friends", "Their houses", "The stars"], why: "Their mouths will be sealed and their hands and feet will reveal what they used to do." }
      ]
    },
    {
      slug: "the-favor-of-a-fair-record",
      title: "The favor of a fair record",
      line: "Every deed is known to Allah: which favor will you deny?",
      facts: ["All will account for deeds", "Linked with 15:92-93"],
      quote: q55(40),
      source: ik(40, "Ibn Kathir links this with 15:92-93: by your Lord, We shall call all of them to account for all they did.", "We shall certainly call all of them to account"),
      difficulty: 2,
      questions: [
        { q: "What does 15:92-93 say?", a: "All will be called to account", wrong: ["None will be asked", "Only kings will", "Only jinn will"], why: "So, by your Lord, We shall certainly call all of them to account. For all that they used to do." },
        { q: "Which ayahs say they may not give excuses?", a: "77:35-36", wrong: ["2:255-256", "1:6-7", "113:1-2"], why: "That will be a Day when they shall not speak, and they will not be permitted to put forth any excuse. (77:35-36)" },
        { tf: true, q: "Knowing we will be asked helps us do good now.", why: "We shall certainly call all of them to account. For all that they used to do." }
      ]
    },
    {
      slug: "known-by-their-marks",
      title: "Known by their marks",
      line: "The wrongdoers will be known by their marks.",
      facts: ["Each group has its signs", "Believers shine from wudu"],
      quote: q55(41),
      source: ik(41, "Ibn Kathir says the wrongdoers are known by marks, unlike the believers, who shine with light where they washed in wudu.", "the light that will appear on the parts of the body that they used to wash"),
      difficulty: 2,
      questions: [
        { q: "How are the wrongdoers known, in 55:41?", a: "By their marks", wrong: ["By their names", "By their clothes", "By their wealth"], why: "The criminals will be known by their marks." },
        { q: "What marks the believers, per Ibn Kathir?", a: "Light from wudu", wrong: ["Gold crowns", "Tall height", "Loud voices"], why: "The light that will appear on the parts of the body that they used to wash while performing ablution." },
        { tf: true, q: "On that Day, deeds show on people.", why: "By special marks that distinguish them." }
      ]
    },
    {
      slug: "shining-from-wudu",
      title: "Shining from wudu",
      line: "His ﷺ Ummah will shine from the traces of wudu.",
      facts: ["Al-Ghurr al-Muhajjalun", "Keep making wudu well"],
      quote: q55(42),
      source: hadith("bukhari", "136", "Abu Hurairah", "Sahih", "The Prophet ﷺ said on the Day of Resurrection his followers will be called Al-Ghurr al-Muhajjalun from the traces of wudu.", "from the trace of ablution"),
      difficulty: 2,
      questions: [
        { q: "What will his ﷺ followers be called?", a: "Al-Ghurr al-Muhajjalun", wrong: ["Al-Muhajirun", "Al-Ansar", "Al-Mutaffifin"], why: "My followers will be called Al-Ghurr-ul-Muhajjalun." },
        { q: "What makes them shine, per Bukhari 136?", a: "The traces of wudu", wrong: ["Their clothes", "Their gold", "Their tents"], why: "From the trace of ablution." },
        { tf: true, q: "Making wudu regularly increases that light.", why: "Whoever can increase the area of his radiance should do so." }
      ]
    },
    {
      slug: "what-they-denied",
      title: "What they denied",
      line: "This is the Hell the wrongdoers used to deny.",
      facts: ["They said it was not real", "Now they see it"],
      quote: q55(43),
      source: ik(43, "Ibn Kathir says it will be said: this is the Fire you used to deny; now you see it before your eyes.", "this is the Fire that you used to deny existed"),
      difficulty: 2,
      questions: [
        { q: "What did the wrongdoers deny, in 55:43?", a: "Hell", wrong: ["The sun", "Food", "The sea"], why: "This is the Hell which the criminals denied." },
        { q: "What changes on that Day, per Ibn Kathir?", a: "They see it with their eyes", wrong: ["They forget it", "It disappears", "Nothing"], why: "This is the Fire that you used to deny existed; now you see it before your eyes!" },
        { tf: true, q: "Denying something does not make it unreal.", why: "This is the Fire that you used to deny existed." }
      ]
    },
    {
      slug: "a-boiling-drink",
      title: "A boiling drink",
      line: "They go round between the Fire and a boiling drink.",
      facts: ["Hamim means very hot water", "An means it is at full heat"],
      quote: q55(44),
      source: ik(44, "Ibn Kathir says Hamim An is water that is very hot, at its utmost heat.", "Hamim, that is very hot"),
      difficulty: 3,
      questions: [
        { q: "What is Hamim, per Ibn Kathir?", a: "Very hot water", wrong: ["Cold water", "Milk", "Honey"], why: "Hamim, that is very hot." },
        { q: "What did Ibn Zayd say An means?", a: "Prepared", wrong: ["Frozen", "Sweet", "Gone"], why: "Hamim An, that it means prepared. This is also the view of Ibn Zayd." },
        { tf: true, q: "Ibn Kathir says these warnings are a mercy to turn people back.", why: "His warnings against His torment and punishment should encourage all creatures to abandon the Shirk and disobedience they engage in." }
      ]
    },
    {
      slug: "warnings-are-a-mercy",
      title: "Warnings are a mercy",
      line: "Warnings that call us back are a favor: which will you deny?",
      facts: ["Warnings help us leave sin", "Allah's justice is a mercy"],
      quote: q55(45),
      source: ik(45, "Ibn Kathir says punishing wrongdoers and honoring the people of Taqwa are from Allah's grace, mercy and justice, and the warnings are a favor.", "justice, compassion and kindness for His creatures"),
      difficulty: 3,
      questions: [
        { q: "Why are warnings called a favor, per Ibn Kathir?", a: "They help us leave sin", wrong: ["They scare for fun", "They bring wealth", "They are stories"], why: "Should encourage all creatures to abandon the Shirk and disobedience they engage in, and this is why Allah reminded them of this favor." },
        { q: "What does Allah's justice come from?", a: "His grace and mercy", wrong: ["Anger only", "Chance", "Nothing"], why: "Is from Allah's grace, mercy, justice, compassion and kindness for His creatures." },
        { tf: true, q: "Rewarding the people of Taqwa is part of His justice.", why: "Punishing the disobedient criminals as well as favoring those who had Taqwa, is from Allah's grace." }
      ]
    }
  ]
};

/** Ayahs 46 to 61: the two higher Gardens for those who fear standing before their Lord, and the reward of goodness. */
const RAHMAN_THREE: DeepUnit = {
  key: "rahman3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-55",
  name: "Ar-Rahman, ayahs 46 to 61",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ar-Rahman",
  lessons: [
    {
      slug: "two-gardens-for-the-god-fearing",
      title: "Two Gardens for the God-fearing",
      line: "For whoever fears standing before his Lord, two Gardens.",
      facts: ["He obeys and avoids the forbidden", "He knows the Hereafter is better"],
      quote: q55(46),
      source: ik(46, "Ibn Kathir says he knows the Hereafter is better and lasting, so he obeys his Lord and avoids His prohibitions, and earns two gardens.", "He who knows that the Hereafter is better and more lasting"),
      difficulty: 1,
      questions: [
        { q: "Who gets two Gardens, in 55:46?", a: "Who fears standing before his Lord", wrong: ["Who is rich", "Who is famous", "Who is strong"], why: "But for him who fears the standing before his Lord, there will be two Gardens." },
        { q: "Which ayah does Ibn Kathir link with 55:46?", a: "79:40", wrong: ["2:183", "36:1", "103:1"], why: "And restrained himself from the desires. (79:40)" },
        { tf: true, q: "Ibn Kathir says believing jinn also enter Paradise.", why: "Those among the Jinns who believe and have Taqwa will enter Paradise." }
      ]
    },
    {
      slug: "tears-in-private",
      title: "Tears in private",
      line: "One shaded by Allah: who remembers Him alone and weeps.",
      facts: ["Seven shaded on the Day", "Fear of Allah in private"],
      quote: q55(46),
      source: hadith("bukhari", "1423", "Abu Hurairah", "Sahih", "The Prophet ﷺ named seven whom Allah shades on the Day, among them one who remembers Allah alone and his eyes flow with tears.", "a person who remembers Allah in seclusion and his eyes get flooded with tears"),
      difficulty: 2,
      questions: [
        { q: "How many are shaded, per Bukhari 1423?", a: "Seven", wrong: ["Three", "Ten", "Forty"], why: "Seven people will be shaded by Allah under His shade on the day when there will be no shade except His." },
        { q: "Who is the first of the seven named?", a: "A just ruler", wrong: ["A rich trader", "A poet", "A soldier"], why: "They are: (1) a just ruler." },
        { tf: true, q: "Weeping from fear of Allah when alone is praised.", why: "A person who remembers Allah in seclusion and his eyes get flooded with tears." }
      ]
    },
    {
      slug: "gardens-of-gold-and-silver",
      title: "Gardens of gold and silver",
      line: "Two gardens of silver, and two gardens of gold.",
      facts: ["Their vessels and all in them", "Gold for the foremost"],
      quote: q55(47),
      source: hadith("bukhari", "4878", "Abu Musa", "Sahih", "The Prophet ﷺ said there are two gardens whose vessels and contents are silver, and two of gold.", "Two gardens, the utensils and the contents of which are of silver"),
      difficulty: 2,
      questions: [
        { q: "What are two gardens made of, per Bukhari 4878?", a: "Silver, and two of gold", wrong: ["Wood and stone", "Glass and sand", "Iron and copper"], why: "Two gardens, the utensils and the contents of which are of silver, and two other gardens of gold." },
        { q: "Who narrated Bukhari 4878?", a: "Abu Musa, Abdullah bin Qais", wrong: ["Anas", "Ibn Umar", "Aishah"], why: "Narrated Abdullah bin Qais." },
        { tf: true, q: "Paradise has levels, some higher than others.", why: "There are two gardens made of gold for the Muqarribin and two gardens made of silver for Ashab Al-Yamin." }
      ]
    },
    {
      slug: "spreading-branches",
      title: "Spreading branches",
      line: "Both Gardens have wide, leafy branches.",
      facts: ["Afnan: spreading branches", "Full of every ripe fruit"],
      quote: q55(48),
      source: ik(48, "Ibn Kathir says their trees have beautiful young branches full of every ripe fruit; Ata said Afnan are branches reaching other branches.", "spreading branches of trees that reach the branches of other trees"),
      difficulty: 2,
      questions: [
        { q: "What do the Gardens have, in 55:48?", a: "Afnan, spreading branches", wrong: ["Bare rocks", "Deserts", "Walls"], why: "With Afnan." },
        { q: "What did Ata say Afnan are?", a: "Branches reaching other branches", wrong: ["Roots", "Rivers", "Clouds"], why: "Afnan means spreading branches of trees that reach the branches of other trees." },
        { tf: true, q: "The branches bear every kind of ripe fruit.", why: "Their trees have beautiful young branches that hold and produce every type of ripened beautiful fruit." }
      ]
    },
    {
      slug: "the-favor-of-shade-and-fruit",
      title: "The favor of shade and fruit",
      line: "Branches heavy with fruit: which favor will you deny?",
      facts: ["Beautiful young branches", "Fruit for those who obeyed"],
      quote: q55(49),
      source: ik(49, "Ibn Kathir describes the branches as beautiful and young, producing every type of ripened fruit.", "every type of ripened beautiful fruit"),
      difficulty: 1,
      questions: [
        { q: "Which favor comes just before 55:49?", a: "Spreading branches", wrong: ["Two seas", "Ships", "Pearls"], why: "With Afnan." },
        { q: "What do the branches produce?", a: "Every type of ripe fruit", wrong: ["Only leaves", "Only thorns", "Nothing"], why: "Produce every type of ripened beautiful fruit." },
        { tf: true, q: "Paradise rewards those who obeyed in this life.", why: "So he fulfills what his Lord ordered him and stays away from His prohibitions." }
      ]
    },
    {
      slug: "two-flowing-springs",
      title: "Two flowing springs",
      line: "In both Gardens, two springs flow freely.",
      facts: ["They water the trees", "Al-Hasan: Tasnim and Salsabil"],
      quote: q55(50),
      source: ik(50, "Ibn Kathir says the springs flow freely to water the trees; Al-Hasan named them Tasnim and As-Salsabil.", "one of these springs is called Tasnim, and the other called As-Salsabil"),
      difficulty: 2,
      questions: [
        { q: "How many springs, in 55:50?", a: "Two", wrong: ["One", "Four", "Seven"], why: "In them both will be two springs flowing free." },
        { q: "What did Al-Hasan name the springs?", a: "Tasnim and Salsabil", wrong: ["Zamzam and Kawthar", "Nile and Furat", "Sayhan and Jayhan"], why: "One of these springs is called Tasnim, and the other called As-Salsabil." },
        { tf: true, q: "The springs water the fruit trees.", why: "Free to water these trees and branches that produce all kinds of fruits." }
      ]
    },
    {
      slug: "the-favor-of-springs",
      title: "The favor of springs",
      line: "Springs that never stop: which favor will you deny?",
      facts: ["Water flows freely forever", "Every fruit is watered"],
      quote: q55(51),
      source: ik(51, "Ibn Kathir says the two springs flow free to water the trees that produce all kinds of fruits.", "free to water these trees and branches"),
      difficulty: 1,
      questions: [
        { q: "Which favor comes just before 55:51?", a: "Two flowing springs", wrong: ["Two easts", "Two seas", "Two wests"], why: "In them both will be two springs flowing free." },
        { q: "What do the springs water?", a: "The fruit trees", wrong: ["Deserts", "Ships", "Mountains"], why: "Free to water these trees and branches that produce all kinds of fruits." },
        { tf: true, q: "Flowing water is a favor in this world too.", why: "Then which of the blessings of your Lord will you both deny?" }
      ]
    },
    {
      slug: "every-fruit-in-pairs",
      title: "Every fruit in pairs",
      line: "In both Gardens, every kind of fruit, in pairs.",
      facts: ["Fruits known and unknown", "Better than this world"],
      quote: q55(52),
      source: ik(52, "Ibn Kathir says every kind of fruit, those they knew and better, and those they never knew, with delights no eye has seen.", "that which they knew before, and better, and that which they did not know before"),
      difficulty: 2,
      questions: [
        { q: "What comes in pairs, in 55:52?", a: "Every kind of fruit", wrong: ["Every river", "Every tree", "Every bird"], why: "In them both will be every kind of fruit in pairs." },
        { q: "Which fruits are there, per Ibn Kathir?", a: "Known ones and unknown ones", wrong: ["Only dates", "Only grapes", "Only apples"], why: "That which they knew before, and better, and that which they did not know before." },
        { tf: true, q: "Ibn Abbas said the world shares only names with Paradise.", why: "There is nothing in the world that is in the Hereafter except in name." }
      ]
    },
    {
      slug: "only-the-names-are-the-same",
      title: "Only the names are the same",
      line: "Fruit of every kind: which favor will you deny?",
      facts: ["Every fruit of the world is there", "Far better in taste and value"],
      quote: q55(53),
      source: ik(53, "Ibn Kathir reports Ibn Abbas: there is nothing of this world in the Hereafter except in name, so great is the difference.", "There is nothing in the world that is in the Hereafter except in name"),
      difficulty: 3,
      questions: [
        { q: "What do worldly things share with Paradise, per Ibn Abbas?", a: "Only the names", wrong: ["The taste", "The size", "The color"], why: "There is nothing in the world that is in the Hereafter except in name." },
        { q: "Which bitter fruit did Ibn Abbas say exists there?", a: "Even the colocynth", wrong: ["Lemon", "Onion", "Olive"], why: "There is not a fruit that exists in this life, sweet or bitter, but it exists in Paradise, even the colocynth." },
        { tf: true, q: "Paradise is far beyond this world in delight.", why: "There is such an enormous difference and contrast between the two in enjoyment and value." }
      ]
    },
    {
      slug: "couches-of-silk",
      title: "Couches of silk",
      line: "Reclining on couches lined with rich silk; fruit hangs near.",
      facts: ["Istabraq: thick silk brocade", "Fruit within easy reach"],
      quote: q55(54),
      source: ik(54, "Ibn Kathir says Istabraq is thick silk brocade; Ibn Masud said if this is the lining, imagine the outside.", "This is their interior, so what about it if you see their exterior"),
      difficulty: 2,
      questions: [
        { q: "What lines the couches, in 55:54?", a: "Istabraq, thick silk", wrong: ["Straw", "Leather", "Wool"], why: "Upon the couches lined with Istabraq, which is thick silk brocade." },
        { q: "What did Ibn Masud say about the lining?", a: "Imagine how the outside is", wrong: ["It is the best part", "It is plain", "It is hidden"], why: "This is their interior, so what about it if you see their exterior?" },
        { tf: true, q: "The fruit comes near to whoever wants it.", why: "These fruits descend from their branches to those who wish to have them." }
      ]
    },
    {
      slug: "fruit-near-at-hand",
      title: "Fruit near at hand",
      line: "Fruit lowers itself to them: which favor will you deny?",
      facts: ["Reach it reclining or standing", "Linked with 69:23 and 76:14"],
      quote: q55(55),
      source: ik(55, "Ibn Kathir says the fruit is close to the believers, who take what they wish whether reclining or otherwise.", "who will be able to take any of it they wish"),
      difficulty: 2,
      questions: [
        { q: "How near is the fruit, per Ibn Kathir?", a: "They take whatever they wish", wrong: ["Out of reach", "Only by climbing", "Only on Fridays"], why: "Close to the believers who will be able to take any of it they wish." },
        { q: "Which ayah says fruit bunches hang low?", a: "69:23", wrong: ["2:2", "55:1", "1:5"], why: "The fruits in bunches whereof will be low and near at hand. (69:23)" },
        { tf: true, q: "No effort is needed to reach the fruits there.", why: "Because they are close at hand." }
      ]
    },
    {
      slug: "pure-companions",
      title: "Pure companions",
      line: "In them are pure companions who look only to their spouses.",
      facts: ["Modest and chaste", "Pure for the people of Paradise"],
      quote: q55(56),
      source: ik(56, "Ibn Kathir says Qasirat At-Tarf are chaste spouses who restrain their glances and desire none but their own husbands.", "wives restraining their glances"),
      difficulty: 2,
      questions: [
        { q: "What does Qasirat At-Tarf describe?", a: "Spouses who restrain their glances", wrong: ["Fast horses", "Tall trees", "Wide rivers"], why: "Qasirat At-Tarf, chaste females, wives restraining their glances." },
        { q: "Which scholars gave that meaning?", a: "Ibn Abbas, Qatadah and others", wrong: ["Only poets", "No one", "Kings"], why: "This was said by Ibn Abbas, Qatadah, Ata Al-Khurasani and Ibn Zayd." },
        { tf: true, q: "Ibn Kathir says believing jinn also enter Paradise.", why: "This is also a proof that the believers among the Jinns will enter Paradise." }
      ]
    },
    {
      slug: "the-favor-of-company",
      title: "The favor of good company",
      line: "Loving, faithful company: which favor will you deny?",
      facts: ["Love and loyalty in Paradise", "Jinn and humans both rewarded"],
      quote: q55(57),
      source: ik(57, "Ibn Kathir reports Damrah bin Habib saying the jinn will enter Paradise too.", "Yes, and they will get married"),
      difficulty: 2,
      questions: [
        { q: "Was Damrah asked if jinn enter Paradise?", a: "Yes, and he said they will", wrong: ["No one asked", "He said never", "He did not know"], why: "Damrah bin Habib was asked if the Jinns will enter Paradise and he said, Yes." },
        { q: "Who is addressed by you both in 55:57?", a: "Mankind and jinn", wrong: ["Two kings", "Two angels", "Two rivers"], why: "Then which of the blessings of your Lord will you both deny?" },
        { tf: true, q: "Faithful love is a favor in Paradise.", why: "Desiring none except their husbands." }
      ]
    },
    {
      slug: "like-rubies-and-pearls",
      title: "Like rubies and pearls",
      line: "They are like rubies and pearls.",
      facts: ["Pure as rubies", "White as pearls"],
      quote: q55(58),
      source: ik(58, "Ibn Kathir says Mujahid, Al-Hasan and others said: as pure as rubies and white as Marjan.", "They are as pure as rubies and white as Marjan"),
      difficulty: 2,
      questions: [
        { q: "What are they likened to, in 55:58?", a: "Yaqut and Marjan", wrong: ["Gold and silver", "Moon and sun", "Rain and snow"], why: "They are like Yaqut and Marjan." },
        { q: "What does Yaqut mean?", a: "Rubies", wrong: ["Pearls", "Silver", "Glass"], why: "They are as pure as rubies and white as Marjan." },
        { q: "What does Marjan mean in 55:58?", a: "Pearls", wrong: ["Rubies", "Coral reefs", "Shells"], why: "They described Marjan as pearls." }
      ]
    },
    {
      slug: "like-the-full-moon",
      title: "Like the full moon",
      line: "The first group into Paradise will shine like the full moon.",
      facts: ["Then others like bright stars", "No dirt or illness there"],
      quote: q55(59),
      source: hadith("bukhari", "3245", "Abu Hurairah", "Sahih", "The Prophet ﷺ said the first group to enter Paradise will shine like the moon when it is full.", "will be (glittering) like the moon when it is full"),
      difficulty: 2,
      questions: [
        { q: "How will the first group shine, per Bukhari 3245?", a: "Like the full moon", wrong: ["Like the sun", "Like fire", "Like gold"], why: "The first group who will enter Paradise will be glittering like the moon when it is full." },
        { q: "How will their sweat smell?", a: "Like musk", wrong: ["Like smoke", "Like salt", "Like nothing"], why: "Their sweat will smell like musk." },
        { tf: true, q: "Their combs will be of gold and silver.", why: "Their utensils will be of gold and their combs of gold and silver." }
      ]
    },
    {
      slug: "good-for-good",
      title: "Good for good",
      line: "Is the reward for good anything but good?",
      facts: ["Good deeds earn good reward", "Linked with 10:26"],
      quote: q55(60),
      source: ik(60, "Ibn Kathir says in the Hereafter all that is good is the fitting reward for those who did good in this life.", "all that is good and righteous is the only befitting reward"),
      difficulty: 1,
      questions: [
        { q: "What is the reward for good, in 55:60?", a: "Good", wrong: ["Nothing", "Hardship", "Silence"], why: "Is there any reward for good other than good?" },
        { q: "Which ayah does Ibn Kathir link with 55:60?", a: "10:26", wrong: ["2:286", "18:110", "3:1"], why: "For those who have done good is best reward and even more. (10:26)" },
        { tf: false, q: "Paradise is earned by deeds alone, without Allah's favor.", why: "Tremendous blessings that cannot be earned merely by good deeds, but by Allah's favor and bounty." }
      ]
    },
    {
      slug: "what-is-ihsan",
      title: "What is Ihsan?",
      line: "Ihsan is worshipping Allah as if you see Him.",
      facts: ["Jibril asked the Prophet ﷺ", "If not, know He sees you"],
      quote: q55(60),
      source: hadith("bukhari", "50", "Abu Hurairah", "Sahih", "Jibril asked what Ihsan is. The Prophet ﷺ said: to worship Allah as if you see Him, and if not, know He sees you.", "To worship Allah as if you see Him"),
      difficulty: 2,
      questions: [
        { q: "What is Ihsan, per Bukhari 50?", a: "Worship Allah as if you see Him", wrong: ["Give gold", "Fast every day", "Travel far"], why: "To worship Allah as if you see Him." },
        { q: "Who asked the Prophet ﷺ about Ihsan?", a: "Jibril", wrong: ["Abu Bakr", "A king", "Umar"], why: "Gabriel came and asked." },
        { tf: true, q: "If we cannot reach that, we know Allah sees us.", why: "If you cannot achieve this state of devotion then you must consider that He is looking at you." }
      ]
    },
    {
      slug: "by-his-favor",
      title: "By His favor",
      line: "Reward for good is His bounty: which favor will you deny?",
      facts: ["Deeds alone do not earn it", "His favor and bounty do"],
      quote: q55(61),
      source: ik(61, "Ibn Kathir says these great blessings are not earned merely by deeds, but by Allah's favor and bounty.", "cannot be earned merely by good deeds, but by Allah"),
      difficulty: 2,
      questions: [
        { q: "How are the blessings earned, per Ibn Kathir?", a: "By Allah's favor and bounty", wrong: ["By deeds alone", "By wealth", "By family"], why: "Tremendous blessings that cannot be earned merely by good deeds, but by Allah's favor and bounty." },
        { q: "Which favor comes just before 55:61?", a: "Good rewarded with good", wrong: ["Two seas", "Ships", "The two easts"], why: "Is there any reward for good other than good?" },
        { tf: true, q: "We should do good and hope for Allah's bounty.", why: "But by Allah's favor and bounty." }
      ]
    }
  ]
};

/** Ayahs 62 to 78: two more Gardens below the first two, and the closing praise of the Owner of Majesty and Honor. */
const RAHMAN_FOUR: DeepUnit = {
  key: "rahman4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-55",
  name: "Ar-Rahman, ayahs 62 to 78",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ar-Rahman",
  lessons: [
    {
      slug: "two-more-gardens",
      title: "Two more Gardens",
      line: "Below these two are two other Gardens.",
      facts: ["Lower in rank than the first", "For the people of the right"],
      quote: q55(62),
      source: ik(62, "Ibn Kathir says these two gardens are lower in virtue and rank than the two before them.", "These two gardens are lower, in virtue and in status than the two before them"),
      difficulty: 2,
      questions: [
        { q: "How do these Gardens compare, per Ibn Kathir?", a: "Lower in rank", wrong: ["Higher in rank", "The very same", "Not in Paradise"], why: "These two gardens are lower, in virtue and in status than the two before them." },
        { q: "Who are the first two for, per Abu Musa?", a: "The Muqarribin, the foremost", wrong: ["Everyone", "The angels", "Children only"], why: "There are two gardens made of gold for the Muqarribin and two gardens made of silver for Ashab Al-Yamin." },
        { tf: true, q: "Ashab Al-Yamin are the people of the right.", why: "The latter two are for those on the right (Ashab Al-Yamin)." }
      ]
    },
    {
      slug: "the-favor-of-many-ranks",
      title: "The favor of many ranks",
      line: "Paradise has ranks for all believers: which favor will you deny?",
      facts: ["The first-named are honored more", "All of Paradise is a gift"],
      quote: q55(63),
      source: ik(63, "Ibn Kathir says mentioning the first two gardens first shows their honor over the latter two.", "this is an obvious form of honoring the first two gardens"),
      difficulty: 2,
      questions: [
        { q: "What shows the first Gardens are higher?", a: "They are named first", wrong: ["They are bigger", "They are older", "Nothing"], why: "Allah mentioned the former two gardens before the latter two, thus indicating their significance." },
        { q: "Which favor comes just before 55:63?", a: "Two more Gardens", wrong: ["Ships", "Pearls", "Two seas"], why: "And below these two, there are two other Gardens." },
        { tf: true, q: "Even the lower Gardens are a great gift.", why: "Then which of the blessings of your Lord will you both deny?" }
      ]
    },
    {
      slug: "dark-green",
      title: "Dark green",
      line: "Dark green from rich watering.",
      facts: ["Mudhammatan: deep green", "Full of greenery"],
      quote: q55(64),
      source: ik(64, "Ibn Kathir reports Ibn Abbas: Mudhammatan means they have become dark green because of much watering.", "they have become dark green because of extensive water irrigation"),
      difficulty: 2,
      questions: [
        { q: "What does Mudhammatan mean, per Ibn Abbas?", a: "Dark green from watering", wrong: ["Bright yellow", "Dry and brown", "Snow white"], why: "Mudhammatan means, they have become dark green because of extensive water irrigation." },
        { q: "What did Muhammad bin Kab say it means?", a: "Full of greenery", wrong: ["Full of stones", "Full of sand", "Empty"], why: "Mudhammatan, Full of greenery." },
        { tf: true, q: "55:64 is a single word ayah.", why: "Mudhammatan." }
      ]
    },
    {
      slug: "the-favor-of-green",
      title: "The favor of green",
      line: "Lush green land: which favor will you deny?",
      facts: ["Green comes from water", "Even this world has green gifts"],
      quote: q55(65),
      source: ik(65, "Ibn Kathir compares: the first gardens have spreading branches, these are dark green from irrigation.", "being dark, because of the intense irrigation"),
      difficulty: 1,
      questions: [
        { q: "Why are these Gardens dark, per Ibn Kathir?", a: "Intense watering", wrong: ["Night", "Shadows", "Smoke"], why: "Mudhammatan, being dark, because of the intense irrigation." },
        { q: "What describes the first two Gardens instead?", a: "Afnan, spreading branches", wrong: ["Dark green", "Gushing springs", "Pomegranates"], why: "Allah described the former gardens: With Afnan." },
        { tf: true, q: "Green plants are a favor in this world too.", why: "Then which of the blessings of your Lord will you both deny?" }
      ]
    },
    {
      slug: "two-gushing-springs",
      title: "Two gushing springs",
      line: "In both, two springs gushing forth.",
      facts: ["Naddakhatan: gushing", "Flowing is stronger than gushing"],
      quote: q55(66),
      source: ik(66, "Ibn Kathir reports Ibn Abbas: Naddakhatan means gushing, and free flowing is stronger than gushing.", "And the free flowing is stronger than gushing"),
      difficulty: 3,
      questions: [
        { q: "What does Naddakhatan mean, per Ibn Abbas?", a: "Gushing", wrong: ["Frozen", "Hidden", "Dry"], why: "Naddakhatan; Ibn Abbas: It means gushing." },
        { q: "Which is stronger, flowing or gushing?", a: "Free flowing", wrong: ["Gushing", "They are equal", "Neither"], why: "And the free flowing is stronger than gushing." },
        { tf: true, q: "Ad-Dahhak said the springs are always full.", why: "They are full of water and constantly gushing." }
      ]
    },
    {
      slug: "the-favor-of-gushing-water",
      title: "The favor of gushing water",
      line: "Springs full and gushing: which favor will you deny?",
      facts: ["Always full of water", "A sign of endless giving"],
      quote: q55(67),
      source: ik(67, "Ibn Kathir reports Ad-Dahhak: they are full of water and constantly gushing.", "they are full of water and constantly gushing"),
      difficulty: 1,
      questions: [
        { q: "Which favor comes just before 55:67?", a: "Two gushing springs", wrong: ["Two seas", "Two easts", "Two ships"], why: "In them both will be two springs Naddakhatan." },
        { q: "Do these springs ever run dry?", a: "No, always gushing", wrong: ["Yes, in summer", "Yes, at night", "Sometimes"], why: "They are full of water and constantly gushing." },
        { tf: true, q: "Ar-Rahman repeats the question after each favor.", why: "Then which of the blessings of your Lord will you both deny?" }
      ]
    },
    {
      slug: "dates-and-pomegranates",
      title: "Dates and pomegranates",
      line: "In both: fruit, date palms and pomegranates.",
      facts: ["Dates and pomegranates named", "The first gardens have more variety"],
      quote: q55(68),
      source: ik(68, "Ibn Kathir says the first description, every kind of fruit in pairs, is better and has more variety.", "the first description is better and refers to more of a variety"),
      difficulty: 2,
      questions: [
        { q: "Which two fruits are named, in 55:68?", a: "Dates and pomegranates", wrong: ["Grapes and figs", "Apples and pears", "Olives and lemons"], why: "In them both will be fruits, and date palms and pomegranates." },
        { q: "Which description has more variety?", a: "Every fruit in pairs, 55:52", wrong: ["Dates and pomegranates", "They are equal", "Neither"], why: "There is no doubt that the first description is better and refers to more of a variety and more types of fruit." },
        { tf: true, q: "Fruits we know are named so we can picture them.", why: "In them both will be fruits, and date palms and pomegranates." }
      ]
    },
    {
      slug: "the-favor-of-fruit",
      title: "The favor of fruit",
      line: "Dates and pomegranates: which favor will you deny?",
      facts: ["We enjoy them here too", "Thank Allah for every fruit"],
      quote: q55(69),
      source: ik(69, "Ibn Kathir compares the fruits of the second gardens with those of the first, which have more types.", "more types of fruit"),
      difficulty: 1,
      questions: [
        { q: "Which favor comes just before 55:69?", a: "Fruit, dates and pomegranates", wrong: ["Ships", "Pearls", "Two seas"], why: "In them both will be fruits, and date palms and pomegranates." },
        { q: "Which Gardens have more types of fruit?", a: "The first two", wrong: ["The second two", "Neither", "Only earthly ones"], why: "The first description is better and refers to more of a variety and more types of fruit." },
        { tf: true, q: "Eating fruit is a time to thank Allah.", why: "Then which of the blessings of your Lord will you both deny?" }
      ]
    },
    {
      slug: "good-and-beautiful",
      title: "Good and beautiful",
      line: "Therein are good and beautiful ones.",
      facts: ["Khayrat Hisan", "Good in manners and beauty"],
      quote: q55(70),
      source: ik(70, "Ibn Kathir says Qatadah explained it as many good and delightful things; most said it means righteous, well mannered, beautiful wives.", "various types of good and delightful things"),
      difficulty: 2,
      questions: [
        { q: "What does Qatadah say Khayrat Hisan are?", a: "Good and delightful things", wrong: ["Dark clouds", "High walls", "Old trees"], why: "There are various types of good and delightful things in these two gardens in Paradise, according to Qatadah." },
        { q: "What does Khayrah mean, per most scholars?", a: "A righteous, well-mannered wife", wrong: ["A horse", "A river", "A tree"], why: "Khayrat is plural of Khayrah and it is a righteous, well-mannered, beautiful woman." },
        { tf: true, q: "Good character is part of beauty in Paradise.", why: "A righteous, well-mannered, beautiful woman." }
      ]
    },
    {
      slug: "the-favor-of-good-character",
      title: "The favor of good character",
      line: "Good manners and beauty: which favor will you deny?",
      facts: ["Manners are named first", "Beauty with goodness"],
      quote: q55(71),
      source: ik(71, "Ibn Kathir says Khayrat Hisan are the good and delightful things in these two gardens.", "Therein will be Khayrat Hisan"),
      difficulty: 2,
      questions: [
        { q: "Which favor comes just before 55:71?", a: "Khayrat Hisan", wrong: ["Two seas", "Ships", "Pearls"], why: "Therein will be Khayrat Hisan." },
        { q: "What does Khayrat mean?", a: "Good ones", wrong: ["Rivers", "Stars", "Rocks"], why: "Khayrat is plural of Khayrah." },
        { tf: true, q: "Good manners are among Allah's favors.", why: "A righteous, well-mannered, beautiful woman." }
      ]
    },
    {
      slug: "pavilions-of-pearl",
      title: "Pavilions of pearl",
      line: "Fair companions, kept safe in pavilions.",
      facts: ["Tents of hollow pearl", "Sixty miles wide"],
      quote: q55(72),
      source: ik(72, "Ibn Kathir quotes the hadith that in Paradise the believer will have a tent of a hollow pearl, sixty miles wide.", "a tent from a hollow pearl, the width thereof is sixty miles"),
      difficulty: 3,
      questions: [
        { q: "What is the believer's tent made of?", a: "A hollow pearl", wrong: ["Wood", "Wool", "Stone"], why: "In Paradise, the believer will have a tent from a hollow pearl." },
        { q: "How wide is the tent, per the hadith?", a: "Sixty miles", wrong: ["Six miles", "One mile", "Six hundred miles"], why: "The width thereof is sixty miles." },
        { tf: true, q: "Hur means fair, beautiful companions.", why: "Hur (beautiful, fair females) guarded in pavilions." }
      ]
    },
    {
      slug: "the-favor-of-safety",
      title: "The favor of safety",
      line: "Homes kept safe and honored: which favor will you deny?",
      facts: ["Guarded and secluded", "The first group is described higher"],
      quote: q55(73),
      source: ik(73, "Ibn Kathir says those who restrain their own glances are higher than those guarded in pavilions, though both are secluded.", "even though both are secluded"),
      difficulty: 3,
      questions: [
        { q: "Which is higher, per Ibn Kathir?", a: "Those who restrain their glances", wrong: ["Those in pavilions", "They are equal", "Neither"], why: "The chaste wives that restrain their glances themselves, are better than those guarded in pavilions." },
        { q: "What do both groups share?", a: "Both are secluded", wrong: ["Both are angels", "Both are absent", "Nothing"], why: "Even though both are secluded." },
        { tf: true, q: "Modesty from within is praised above guarding.", why: "Better than those guarded in pavilions." }
      ]
    },
    {
      slug: "pure-before-them",
      title: "Pure before them",
      line: "Pure, untouched by any human or jinn before them.",
      facts: ["The same as 55:56", "Jinn too are in Paradise"],
      quote: q55(74),
      source: ik(74, "Ibn Kathir says this was explained before at 55:56, and repeats the description of the first group as like rubies and pearls.", "We explained this meaning before"),
      difficulty: 2,
      questions: [
        { q: "Which earlier ayah does 55:74 repeat?", a: "55:56", wrong: ["55:1", "55:13", "55:46"], why: "We explained this meaning before." },
        { q: "How are the first group described again?", a: "Like rubies and pearls", wrong: ["Like stars", "Like gold", "Like flowers"], why: "They are like Yaqut (rubies) and Marjan (pearls)." },
        { tf: true, q: "Both mankind and jinn are spoken to in 55:74-75.", why: "Then which of the blessings of your Lord will you both deny?" }
      ]
    },
    {
      slug: "the-favor-of-purity",
      title: "The favor of purity",
      line: "Pure company in Paradise: which favor will you deny?",
      facts: ["Purity is a gift", "Repeated with honor"],
      quote: q55(75),
      source: ik(75, "Ibn Kathir repeats the line for the first group: like rubies and pearls, then which favor will you deny?", "they are like Yaqut (rubies) and Marjan (pearls)"),
      difficulty: 1,
      questions: [
        { q: "Which favor comes just before 55:75?", a: "Pure companions", wrong: ["Two seas", "Ships", "Pearls of the sea"], why: "Whom never were touched by a human before nor Jinn." },
        { q: "Yaqut and Marjan mean?", a: "Rubies and pearls", wrong: ["Gold and silver", "Sun and moon", "Milk and honey"], why: "They are like Yaqut (rubies) and Marjan (pearls)." },
        { tf: true, q: "Purity is honored in Islam.", why: "Then which of the blessings of your Lord will you both deny?" }
      ]
    },
    {
      slug: "green-cushions-and-carpets",
      title: "Green cushions and carpets",
      line: "Reclining on green cushions and fine carpets.",
      facts: ["Rafraf: cushions", "Abqariy: rich carpets"],
      quote: q55(76),
      source: ik(76, "Ibn Kathir reports Ibn Abbas: Rafraf means cushions, and Abqariy means rich carpets.", "Rafraf means cushions"),
      difficulty: 2,
      questions: [
        { q: "What does Rafraf mean, per Ibn Abbas?", a: "Cushions", wrong: ["Swords", "Birds", "Fruits"], why: "Ibn Abbas: Rafraf means cushions." },
        { q: "What does Abqariy mean?", a: "Rich carpets", wrong: ["Tall trees", "Deep wells", "Strong horses"], why: "Ibn Abbas, Qatadah, Ad-Dahhak and As-Suddi said that Abqariy means rich carpets." },
        { q: "What color are the cushions, in 55:76?", a: "Green", wrong: ["Red", "Black", "Grey"], why: "Reclining on green Rafraf and rich beautiful Abqariy." }
      ]
    },
    {
      slug: "the-favor-of-rest",
      title: "The favor of rest",
      line: "Rest and comfort forever: which favor will you deny?",
      facts: ["No tiredness in Paradise", "Rest after the test of life"],
      quote: q55(77),
      source: ik(77, "Ibn Kathir reports Al-Ala bin Badr: the Rafraf are spread hanging over the couches.", "The Rafraf are arrayed hanging over the couches"),
      difficulty: 2,
      questions: [
        { q: "Where are the Rafraf, per Al-Ala?", a: "Hanging over the couches", wrong: ["On the ground", "In the river", "On the trees"], why: "The Rafraf are arrayed hanging over the couches." },
        { q: "Which favor comes just before 55:77?", a: "Cushions and carpets", wrong: ["Two seas", "Ships", "Pearls"], why: "Reclining on green Rafraf and rich beautiful Abqariy." },
        { tf: true, q: "Ar-Rahman asks this question 31 times.", why: "Then which of the blessings of your Lord will you both deny?" }
      ]
    },
    {
      slug: "blessed-be-his-name",
      title: "Blessed be His Name",
      line: "Blessed is the Name of your Lord, Owner of Majesty and Honor.",
      facts: ["The surah ends with praise", "Ya Dhal-Jalali wal-Ikram"],
      quote: q55(78),
      source: ik(78, "Ibn Kathir says Allah is worthy to be honored, obeyed, worshipped, thanked and remembered, never forgotten.", "remembered and never forgotten"),
      difficulty: 1,
      questions: [
        { q: "How does Surah Ar-Rahman end?", a: "Blessed be the Name of your Lord", wrong: ["Then which favor", "Ar-Rahman", "Say He is One"], why: "Blessed be the Name of your Lord, Dhil-Jalal wal-Ikram." },
        { q: "What did he ﷺ say to persist with, per Ahmad?", a: "Ya Dhal-Jalal wal-Ikram", wrong: ["Ya Rabb only", "Amin", "Bismillah"], why: "Persist in invoking Allah with, Ya Dhal-Jalal wal-Ikram." },
        { tf: true, q: "Allah is to be remembered and never forgotten.", why: "Remembered and never forgotten." }
      ]
    },
    {
      slug: "after-the-salam",
      title: "After the salam",
      line: "After salah he ﷺ said: O Owner of Majesty and Honor.",
      facts: ["Said after finishing prayer", "Said after seeking forgiveness"],
      quote: q55(78),
      source: hadith("muslim", "591", "Thawban", "Sahih", "After his prayer the Prophet ﷺ sought forgiveness three times and said: O Allah, You are Peace, peace comes from You, blessed are You, O Possessor of Glory and Honor.", "Thou art Peace, and peace comes from Thee"),
      difficulty: 2,
      questions: [
        { q: "How many times did he ﷺ seek forgiveness?", a: "Three times", wrong: ["Once", "Seven times", "Ten times"], why: "He begged forgiveness three times." },
        { q: "What did he ﷺ then say, per Muslim 591?", a: "You are Peace, peace comes from You", wrong: ["Allahu Akbar only", "Amin", "Nothing"], why: "O Allah! Thou art Peace, and peace comes from Thee." },
        { tf: true, q: "The dhikr ends with O Possessor of Glory and Honor.", why: "Blessed art Thou, O Possessor of Glory and Honour." }
      ]
    }
  ]
};

export const RAHMAN_UNITS: readonly DeepUnit[] = [RAHMAN_ONE, RAHMAN_TWO, RAHMAN_THREE, RAHMAN_FOUR];
