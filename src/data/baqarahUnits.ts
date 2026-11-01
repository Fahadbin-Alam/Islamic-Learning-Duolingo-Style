import type { LessonSource } from "../types";
import { hadith, quranQuote, type DeepUnit } from "./deepKit";

// Surah Al-Baqarah ayah by ayah: after the unit's short circles and its passages, every ayah or small group of
// ayahs gets a lesson of its own, so a learner walks through the whole surah slowly. Each card is one ayah's
// meaning as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with that ayah in Arabic.
// Where the scholars give different explanations, the card keeps to what they agree on.

/** Tafsir Ibn Kathir on Al-Baqarah 2:ayah, on quran.com. */
function ik(ayah: number, summary: string): LessonSource {
  return {
    id: `deep_ibn_kathir_2_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Baqarah 2:${ayah}`,
    url: `https://quran.com/2:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 2:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary
  };
}

const q2 = (ayah: number) => quranQuote(2, ayah);

/** Ayahs 1 to 74: the believers, the disbelievers and the hypocrites; Adam; the Children of Israel; the cow. */
const BAQARAH_ONE: DeepUnit = {
  key: "baqarah1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-baqarah",
  name: "Al-Baqarah, ayahs 1 to 74",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Baqarah",
  lessons: [
    {
      slug: "medina",
      title: "A Madinah surah",
      line: "Al-Baqarah came down in Madinah, after the Hijrah.",
      facts: ["The longest surah", "286 ayahs", "Named after a cow"],
      quote: q2(1),
      source: ik(1, "Ibn Abbas and Abdullah ibn az-Zubayr said Surat al-Baqarah was revealed in Madinah, and there is no difference of opinion over this."),
      difficulty: 2,
      questions: [
        { q: "Where was Al-Baqarah revealed?", a: "Madinah", wrong: ["Makkah", "Taif", "Jerusalem"], why: "Ibn Kathir: no difference of opinion on this." },
        { q: "How many ayahs does Al-Baqarah have?", a: "286", wrong: ["7", "114", "40"], why: "It is the longest surah." },
        { q: "Al-Baqarah means...", a: "The Cow", wrong: ["The Cave", "The Bee", "The Elephant"], why: "From the story of the cow in ayahs 67 to 73." }
      ]
    },
    {
      slug: "alif-lam-mim",
      title: "Alif Lam Mim",
      line: "Alif Lam Mim: letters whose full meaning Allah knows best.",
      facts: ["Said by Abu Bakr and Umar", "Also Uthman, Ali, Ibn Mas'ud"],
      quote: q2(1),
      source: ik(1, "The separate letters at the start of some surahs are among the things whose knowledge Allah kept for Himself; this was reported from Abu Bakr, Umar, Uthman, Ali and Ibn Mas'ud."),
      difficulty: 3,
      questions: [
        { q: "What does Al-Baqarah begin with?", a: "Alif Lam Mim", wrong: ["Ya Sin", "Ta Ha", "Qaf"], why: "Three separate letters." },
        { q: "Who knows the full meaning of these letters?", a: "Allah", wrong: ["Every child", "Poets", "Nobody can ever learn Arabic"], why: "Reported from Abu Bakr, Umar, Uthman, Ali and Ibn Mas'ud." },
        { q: "The Quran is made of the same letters the Arabs used, yet none could match it.", tf: true, why: "Ibn Kathir notes this wisdom of the letters." }
      ]
    },
    {
      slug: "no-doubt",
      title: "No doubt in it",
      line: "This is the Book: no doubt in it, guidance for the mindful.",
      facts: ["Rayb means doubt", "Muttaqin: the mindful"],
      quote: q2(2),
      source: ik(2, "The Book is the Quran, and rayb means doubt: there is no doubt that it was revealed from Allah. It is guidance for the muttaqin, those who fear Allah and obey Him."),
      difficulty: 2,
      questions: [
        { q: "What does 'rayb' mean in 2:2?", a: "Doubt", wrong: ["Light", "Story", "Gold"], why: "No doubt that it is from Allah." },
        { q: "Who does the Quran guide, in 2:2?", a: "The mindful (muttaqin)", wrong: ["Only Arabs", "Only scholars", "Nobody"], why: "Guidance for the muttaqin." },
        { q: "Which 'Book' is meant in 2:2?", a: "The Quran", wrong: ["A diary", "A school book", "A poem"], why: "Ibn Kathir: the Book is the Quran." }
      ]
    },
    {
      slug: "unseen",
      title: "Faith in the unseen",
      line: "The mindful believe in what they cannot see.",
      facts: ["Allah, angels, Jannah", "The Last Day", "Iman means trust"],
      quote: q2(3),
      source: ik(3, "Iman means to trust and believe. The unseen includes belief in Allah, His angels, His books, His messengers, the Last Day, Paradise and the Fire, and the meeting with Allah."),
      difficulty: 2,
      questions: [
        { q: "What is 'al-ghayb'?", a: "The unseen", wrong: ["The sky", "The past", "The sea"], why: "What we believe in without seeing." },
        { q: "Which is part of the unseen?", a: "The angels", wrong: ["Your shoes", "The moon", "Your house"], why: "We believe in them without seeing them." },
        { q: "Ibn Abbas said 'they believe' means...", a: "They trust", wrong: ["They argue", "They guess", "They forget"], why: "Iman is trust." }
      ]
    },
    {
      slug: "pray-spend",
      title: "They pray and give",
      line: "They keep up the prayer and spend from what Allah gave them.",
      facts: ["Prayer done properly", "Giving from His gift"],
      quote: q2(3),
      source: ik(3, "Establishing the prayer means performing it with its bowing, prostration, recitation, humility and on time; spending includes zakah and spending on family and others."),
      difficulty: 2,
      questions: [
        { q: "What does 'establish the prayer' mean?", a: "Pray it properly and on time", wrong: ["Build a mosque", "Pray once a year", "Talk about prayer"], why: "With its bowing, sujud and humility." },
        { q: "Who gave them what they spend?", a: "Allah", wrong: ["Their friends", "Luck", "Themselves alone"], why: "They spend from what We provided them." },
        { q: "Spending on your own family counts as good spending.", tf: true, why: "Ibn Kathir includes it." }
      ]
    },
    {
      slug: "all-books",
      title: "All the books",
      line: "They believe in the Quran and in the books before it.",
      facts: ["Tawrah, Injil, Zabur", "Certain of the Hereafter"],
      quote: q2(4),
      source: ik(4, "They believe in what Allah sent to the Messenger and in what He sent to the messengers before, without differentiating, and they are certain of the Hereafter."),
      difficulty: 2,
      questions: [
        { q: "Which books do the believers believe in?", a: "The Quran and the books before it", wrong: ["Only the Quran", "No books", "Only poems"], why: "Quran 2:4." },
        { q: "What are they certain about?", a: "The Hereafter", wrong: ["Tomorrow's weather", "Their grades", "Getting rich"], why: "Wa bil-akhirati hum yuqinun." },
        { q: "Which is a book Allah sent before the Quran?", a: "The Tawrah", wrong: ["A history book", "A newspaper", "A novel"], why: "Given to Musa." }
      ]
    },
    {
      slug: "successful",
      title: "The successful",
      line: "These are on guidance from their Lord: they are the successful.",
      facts: ["Al-muflihun: the successful", "Success in both lives"],
      quote: q2(5),
      source: ik(5, "Those who have these qualities are upon light and guidance from Allah, and they are the successful in this life and the Hereafter."),
      difficulty: 2,
      questions: [
        { q: "What does 'al-muflihun' mean?", a: "The successful", wrong: ["The rich", "The famous", "The strong"], why: "Quran 2:5." },
        { q: "Where does their guidance come from?", a: "Their Lord", wrong: ["Their phone", "Their friends", "The stars"], why: "On guidance from their Lord." },
        { q: "Their success is only in this world.", tf: false, why: "In this life and the Hereafter." }
      ]
    },
    {
      slug: "stubborn",
      title: "Warned or not",
      line: "For some who reject, warning or not, they will not believe.",
      facts: ["About the stubborn", "Not about everyone"],
      quote: q2(6),
      source: ik(6, "Those who have covered up the truth and decided to disbelieve: it is the same whether you warn them or not, they will not believe; so do not grieve over them."),
      difficulty: 3,
      questions: [
        { q: "Who does 2:6 describe?", a: "Those set on rejecting the truth", wrong: ["Every non-Muslim", "Children", "New Muslims"], why: "Those who decided to disbelieve." },
        { q: "What does Ibn Kathir say the Prophet ﷺ should not do over them?", a: "Grieve", wrong: ["Pray", "Smile", "Speak"], why: "Do not grieve over them." },
        { q: "Ayah 2:6 means we should stop inviting people to Islam.", tf: false, why: "Only Allah knows who will believe." }
      ]
    },
    {
      slug: "seal",
      title: "A seal on hearts",
      line: "A seal on their hearts came after they turned away.",
      facts: ["Sins cover the heart", "Repent to keep it clean"],
      quote: q2(7),
      source: ik(7, "Qatadah said: Shaytan controlled them when they obeyed him, so Allah sealed their hearts; the Prophet ﷺ said that a sin leaves a black spot on the heart, and repentance polishes it."),
      difficulty: 3,
      questions: [
        { q: "Why were their hearts sealed?", a: "They kept obeying Shaytan and sinning", wrong: ["By bad luck", "Because they were poor", "For no reason"], why: "Qatadah, in Ibn Kathir." },
        { q: "What polishes a heart after a sin?", a: "Repentance", wrong: ["Sleep", "Money", "Games"], why: "A sin leaves a spot; tawbah cleans it." },
        { q: "Repenting quickly keeps the heart soft.", tf: true, why: "The hadith Ibn Kathir quotes here." }
      ]
    },
    {
      slug: "say-we-believe",
      title: "Words, not hearts",
      line: "Some say 'we believe' but do not: they only fool themselves.",
      facts: ["The hypocrites (munafiqun)", "Showed up in Madinah"],
      quote: q2(9),
      source: ik(9, "Hypocrisy is showing good and hiding evil. It appeared in Madinah; the hypocrites think they deceive Allah and the believers, but they only deceive themselves."),
      difficulty: 2,
      questions: [
        { q: "What is a munafiq?", a: "One who shows faith but hides disbelief", wrong: ["A new Muslim", "A traveler", "A scholar"], why: "Showing good, hiding evil." },
        { q: "Who do the hypocrites really fool?", a: "Only themselves", wrong: ["Allah", "The angels", "Everyone forever"], why: "Quran 2:9." },
        { q: "Where did hypocrisy appear?", a: "In Madinah", wrong: ["Only in Makkah", "In Rome", "In Yemen"], why: "When Islam became strong there." }
      ]
    },
    {
      slug: "disease",
      title: "A sick heart",
      line: "In their hearts is a sickness, and Allah let it grow.",
      facts: ["The sickness is doubt", "Lying makes it worse"],
      quote: q2(10),
      source: ik(10, "The disease in their hearts is doubt; Allah increased their doubt, and theirs is a painful torment because they used to lie."),
      difficulty: 3,
      questions: [
        { q: "What is the 'sickness' in their hearts?", a: "Doubt", wrong: ["A fever", "Hunger", "Sadness"], why: "Ibn Kathir: the disease is doubt." },
        { q: "What habit of theirs is named in 2:10?", a: "Lying", wrong: ["Fasting", "Giving", "Smiling"], why: "Because they used to lie." },
        { q: "Doubt left alone tends to grow.", tf: true, why: "Allah increased their disease." }
      ]
    },
    {
      slug: "reformers",
      title: "'We only fix things'",
      line: "They spread mischief, then say: we are only fixing things.",
      facts: ["Sinning is mischief", "Truly, they are the corrupters"],
      quote: q2(12),
      source: ik(12, "Mischief on earth is disobeying Allah; whoever disobeys Allah on earth spreads mischief. The hypocrites claimed to be reformers, but they are the corrupters."),
      difficulty: 3,
      questions: [
        { q: "What do they claim when told 'don't cause mischief'?", a: "We are only reformers", wrong: ["We are sorry", "We will stop", "We are tired"], why: "Quran 2:11." },
        { q: "What does Ibn Kathir say mischief on earth is?", a: "Disobeying Allah", wrong: ["Building houses", "Planting trees", "Studying"], why: "Whoever disobeys Allah spreads mischief." },
        { q: "What are they really?", a: "The corrupters", wrong: ["The reformers", "The teachers", "The leaders"], why: "Quran 2:12." }
      ]
    },
    {
      slug: "fools",
      title: "Who is the fool?",
      line: "They call believers fools; they are the real fools.",
      facts: ["Quran 2:13", "Faith is wisdom"],
      quote: q2(13),
      source: ik(13, "When told to believe as the people believe, they said: shall we believe as the fools believe? Allah said they are the fools, but they do not know."),
      difficulty: 2,
      questions: [
        { q: "What did the hypocrites call the believers?", a: "Fools", wrong: ["Heroes", "Kings", "Friends"], why: "Quran 2:13." },
        { q: "Who does Allah say the fools are?", a: "The hypocrites themselves", wrong: ["The believers", "The angels", "Children"], why: "They are the fools." },
        { q: "Someone mocks you for praying. What does 2:13 teach?", a: "Faith is wise; stay firm", wrong: ["Stop praying", "Mock them back", "Hide your faith forever"], why: "The mocker is the one who loses." }
      ]
    },
    {
      slug: "two-faces",
      title: "Two faces",
      line: "With believers: 'we believe'. With their own: 'just joking'.",
      facts: ["Quran 2:14", "Allah lets them run on"],
      quote: q2(14),
      source: ik(14, "When they meet the believers they show faith, and when they are alone with their leaders they say: we are with you, we were only mocking. Allah mocks them and leaves them wandering."),
      difficulty: 3,
      questions: [
        { q: "What do they tell their friends in private?", a: "We were only joking", wrong: ["We believe", "We are sorry", "Let's pray"], why: "Quran 2:14." },
        { q: "What does having two faces show?", a: "Hypocrisy", wrong: ["Kindness", "Wisdom", "Bravery"], why: "One face for each group." },
        { q: "A believer is the same in public and in private.", tf: true, why: "The opposite of 2:14." }
      ]
    },
    {
      slug: "bad-trade",
      title: "A losing trade",
      line: "They traded guidance for going astray: a trade with no profit.",
      facts: ["Quran 2:16", "Lost the real wealth"],
      quote: q2(16),
      source: ik(16, "They exchanged guidance for misguidance, preferring error; their trade brought no profit and they were not guided."),
      difficulty: 2,
      questions: [
        { q: "What did they give away in 2:16?", a: "Guidance", wrong: ["Gold", "Land", "Camels"], why: "They bought error with guidance." },
        { q: "How did their trade end?", a: "No profit at all", wrong: ["Big profit", "A fair deal", "A gift"], why: "Their trade was profitless." },
        { q: "Giving up prayer for a game is a losing trade.", tf: true, why: "Swapping the best for the worst." }
      ]
    },
    {
      slug: "fire-parable",
      title: "The fire went out",
      line: "They lit a fire, then Allah took its light away.",
      facts: ["Light, then darkness", "Deaf, dumb and blind to truth"],
      quote: q2(17),
      source: ik(17, "Allah compares the hypocrites to one who kindled a fire that lit what was around him, then its light was taken and he was left in darkness, unable to see: they saw guidance, then chose blindness."),
      difficulty: 3,
      questions: [
        { q: "What happened to the man's fire?", a: "Its light was taken away", wrong: ["It grew bigger", "It became gold", "It turned to water"], why: "Quran 2:17." },
        { q: "What does the light stand for?", a: "The guidance they saw", wrong: ["Electricity", "The sun", "Money"], why: "They saw it, then turned away." },
        { q: "How does 2:18 describe them?", a: "Deaf, dumb and blind", wrong: ["Wise and calm", "Happy and free", "Strong and fast"], why: "To the truth, they cannot return." }
      ]
    },
    {
      slug: "storm-parable",
      title: "Lost in a storm",
      line: "Like people in a storm, fingers in ears, scared of thunder.",
      facts: ["Rain is the Quran", "Lightning: flashes of faith"],
      quote: q2(19),
      source: ik(19, "Another parable: a rainstorm with darkness, thunder and lightning. The rain is the Quran; they put fingers in their ears from fear; when the light shines they walk, and when it is dark they stand still."),
      difficulty: 3,
      questions: [
        { q: "In this parable, what is the rain?", a: "The Quran", wrong: ["Their money", "Their tears", "The sea"], why: "Ibn Kathir explains it so." },
        { q: "What do they do when lightning flashes?", a: "Walk a little in its light", wrong: ["Run home", "Sleep", "Sing"], why: "Then stand still in the dark." },
        { q: "Why do they put fingers in their ears?", a: "Out of fear", wrong: ["To dance", "To hear better", "To greet"], why: "Fearing the thunder." }
      ]
    },
    {
      slug: "worship-lord",
      title: "Worship your Lord",
      line: "O people, worship your Lord who created you and those before.",
      facts: ["A call to all mankind", "So you may be mindful"],
      quote: q2(21),
      source: ik(21, "Allah calls on all mankind to worship Him alone, since He alone created them and those before them; He is the One who deserves worship."),
      difficulty: 2,
      questions: [
        { q: "Who does 2:21 speak to?", a: "All mankind", wrong: ["Only Arabs", "Only men", "Only angels"], why: "Ya ayyuhan-nas: O people." },
        { q: "Why does Allah deserve worship, in 2:21?", a: "He created us and those before us", wrong: ["He is far away", "Because of our parents", "No reason given"], why: "The Creator is the One worshipped." },
        { q: "What does worship lead to, at the end of 2:21?", a: "Being mindful of Allah", wrong: ["Getting rich", "Being famous", "Sleeping more"], why: "La'allakum tattaqun." }
      ]
    },
    {
      slug: "earth-bed",
      title: "The earth, a bed",
      line: "The earth a bed, the sky a roof, and rain from above.",
      facts: ["Fruits as food", "Set up no rivals to Him"],
      quote: q2(22),
      source: ik(22, "Allah made the earth a resting place and the sky a canopy, and sent rain bringing out fruits as provision; so do not set up rivals to Allah while you know He alone created all this."),
      difficulty: 2,
      questions: [
        { q: "What did Allah make the earth, in 2:22?", a: "A bed, a resting place", wrong: ["A ball", "A prison", "A ship"], why: "Quran 2:22." },
        { q: "What does the rain bring out?", a: "Fruits for us to eat", wrong: ["Gold", "Stones", "Fire"], why: "Provision for you." },
        { q: "'Andad' in 2:22 means...", a: "Rivals set up with Allah", wrong: ["Rain clouds", "Mountains", "Prayers"], why: "Do not set up rivals while you know." }
      ]
    },
    {
      slug: "challenge",
      title: "Bring one surah",
      line: "If you doubt it, bring one surah like it.",
      facts: ["Still unanswered", "Even the shortest surah"],
      quote: q2(23),
      source: ik(23, "Allah challenges those who doubt the Quran to produce one surah like it and call their helpers; they will never be able to, and this challenge has stood ever since."),
      difficulty: 2,
      questions: [
        { q: "What does 2:23 challenge doubters to bring?", a: "One surah like it", wrong: ["A mountain", "An angel", "A new moon"], why: "Quran 2:23." },
        { q: "Has anyone met the challenge?", a: "No, never", wrong: ["Yes, many times", "Only once", "Yes, a poet"], why: "And you will never do it (2:24)." },
        { q: "The challenge holds even for the shortest surah.", tf: true, why: "Any surah like it." }
      ]
    },
    {
      slug: "fuel",
      title: "Fear the Fire",
      line: "You cannot do it, so fear the Fire of people and stones.",
      facts: ["Quran 2:24", "Prepared for disbelievers"],
      quote: q2(24),
      source: ik(24, "You will never be able to do it, so fear the Fire whose fuel is people and stones, prepared for the disbelievers."),
      difficulty: 3,
      questions: [
        { q: "What does 2:24 say about meeting the challenge?", a: "You will never do it", wrong: ["Try next year", "Ask a poet", "It is easy"], why: "Wa lan taf'alu." },
        { q: "What is the Fire's fuel?", a: "People and stones", wrong: ["Wood", "Oil", "Paper"], why: "Quran 2:24." },
        { q: "Who is the Fire prepared for?", a: "Those who reject", wrong: ["Everyone", "Animals", "Angels"], why: "U'iddat lil-kafirin." }
      ]
    },
    {
      slug: "good-news",
      title: "Good news",
      line: "Believers who do good: gardens with rivers, forever.",
      facts: ["Fruits that look alike", "Pure spouses"],
      quote: q2(25),
      source: ik(25, "Allah gives good news to those who believe and do good deeds: gardens with rivers beneath, fruits that look alike but taste different, purified spouses, and they stay there forever."),
      difficulty: 2,
      questions: [
        { q: "What two things earn the good news in 2:25?", a: "Faith and good deeds", wrong: ["Money and fame", "Age and height", "Luck and looks"], why: "Amanu wa 'amilus-salihat." },
        { q: "What flows beneath the gardens?", a: "Rivers", wrong: ["Lava", "Sand", "Nothing"], why: "Quran 2:25." },
        { q: "The fruits of Jannah look alike but taste...", a: "Different", wrong: ["The same", "Bad", "Like nothing"], why: "Ibn Kathir explains it so." }
      ]
    },
    {
      slug: "mosquito",
      title: "Even a mosquito",
      line: "Allah is not shy to give the example of a mosquito.",
      facts: ["Believers: it is the truth", "Doubters: why this?"],
      quote: q2(26),
      source: ik(26, "Allah is not ashamed to give a parable of a mosquito or something bigger or smaller; believers know it is the truth from their Lord, while disbelievers ask what Allah meant by it."),
      difficulty: 3,
      questions: [
        { q: "Which small creature does 2:26 mention?", a: "A mosquito", wrong: ["An ant", "A bee", "A fly"], why: "Ba'udah: a mosquito." },
        { q: "What do believers say about the example?", a: "It is the truth from our Lord", wrong: ["It is silly", "It is too small", "Nothing"], why: "Quran 2:26." },
        { q: "Small things in creation can teach big lessons.", tf: true, why: "Allah uses even a mosquito." }
      ]
    },
    {
      slug: "covenant-break",
      title: "Promise breakers",
      line: "The losers break Allah's promise and cut what He joined.",
      facts: ["Cutting family ties", "Spreading mischief"],
      quote: q2(27),
      source: ik(27, "These are the defiantly disobedient: they break Allah's covenant after confirming it, cut what Allah ordered joined, such as ties of kinship, and spread mischief; they are the losers."),
      difficulty: 3,
      questions: [
        { q: "What do they cut that Allah ordered joined?", a: "Family ties", wrong: ["Ropes", "Bread", "Hair"], why: "Ibn Kathir: ties of kinship." },
        { q: "What do they break after making it?", a: "Allah's covenant", wrong: ["Their phones", "A window", "A record"], why: "Quran 2:27." },
        { q: "Visiting relatives keeps what Allah ordered joined.", tf: true, why: "The opposite of 2:27." }
      ]
    },
    {
      slug: "dead-then-alive",
      title: "You were dead",
      line: "You were lifeless, He gave you life, then death, then life.",
      facts: ["Then you return to Him", "How can anyone deny Him?"],
      quote: q2(28),
      source: ik(28, "How can you disbelieve in Allah? You were nothing, and He brought you to life; then He will cause you to die, then bring you back to life, and to Him you will return."),
      difficulty: 3,
      questions: [
        { q: "What were we before Allah gave us life?", a: "Lifeless, nothing", wrong: ["Stars", "Angels", "Kings"], why: "Quran 2:28." },
        { q: "How many times does 2:28 mention being given life?", a: "Twice", wrong: ["Once", "Three times", "Never"], why: "Life now, then life after death." },
        { q: "Where do we all return?", a: "To Allah", wrong: ["To the sea", "To nowhere", "To our cities"], why: "Then to Him you will be returned." }
      ]
    },
    {
      slug: "seven-heavens",
      title: "All for you",
      line: "He made all on earth for you, then made seven heavens.",
      facts: ["Quran 2:29", "He knows everything"],
      quote: q2(29),
      source: ik(29, "Allah created everything on the earth for you, then turned to the heaven and made it seven heavens, and He has knowledge of all things."),
      difficulty: 2,
      questions: [
        { q: "For whom did Allah create what is on earth?", a: "For us", wrong: ["For nobody", "Only for animals", "Only for kings"], why: "Khalaqa lakum: for you." },
        { q: "How many heavens does 2:29 mention?", a: "Seven", wrong: ["One", "Three", "Ten"], why: "Sab'a samawat." },
        { q: "What should we do with Allah's gifts on earth?", a: "Use them well and thank Him", wrong: ["Waste them", "Ignore them", "Destroy them"], why: "They are a trust." }
      ]
    },
    {
      slug: "khalifah",
      title: "People on the earth",
      line: "Allah told the angels: I will place people on the earth.",
      facts: ["One generation after another", "The angels asked why"],
      quote: q2(30),
      source: ik(30, "Allah told the angels He would place on earth people succeeding one another. They asked, wanting to understand, not objecting: will You place those who cause mischief? He said: I know what you do not know."),
      difficulty: 3,
      questions: [
        { q: "Who did Allah tell about placing people on earth?", a: "The angels", wrong: ["The jinn", "The animals", "The stars"], why: "Quran 2:30." },
        { q: "Why did the angels ask?", a: "To understand, not to object", wrong: ["Out of jealousy", "To argue", "To refuse"], why: "Ibn Kathir explains this." },
        { q: "What did Allah answer?", a: "I know what you do not know", wrong: ["Be quiet", "Never mind", "Ask later"], why: "Quran 2:30." }
      ]
    },
    {
      slug: "names",
      title: "Adam learns the names",
      line: "Allah taught Adam the names of all things.",
      facts: ["The angels did not know them", "Knowledge is an honor"],
      quote: q2(31),
      source: ik(31, "This shows Adam's virtue: Allah taught him the names of all things, which the angels did not know. Ibn Abbas said: the names people know, such as human, animal, earth, sea, mountain."),
      difficulty: 2,
      questions: [
        { q: "What did Allah teach Adam?", a: "The names of all things", wrong: ["How to fly", "Poetry", "Nothing"], why: "Quran 2:31." },
        { q: "Did the angels know the names?", a: "No", wrong: ["Yes, all", "Some", "Only Jibril"], why: "Allah showed Adam's honor through knowledge." },
        { q: "What gave Adam honor over the angels in 2:31-33?", a: "Knowledge from Allah", wrong: ["His height", "His wealth", "His age"], why: "Knowledge is a gift." }
      ]
    },
    {
      slug: "subhanaka",
      title: "We only know what You taught",
      line: "Glory to You, we know only what You taught us.",
      facts: ["Humble about knowledge", "Al-'Alim, Al-Hakim"],
      quote: q2(32),
      source: ik(32, "The angels glorified Allah and admitted that no one knows anything except what He teaches; He is the All-Knowing, the All-Wise."),
      difficulty: 2,
      questions: [
        { q: "What did the angels say first?", a: "Glory be to You", wrong: ["We know it all", "Ask Adam", "Not fair"], why: "Subhanaka." },
        { q: "What do they admit?", a: "We only know what You taught us", wrong: ["We know more than Adam", "We forgot", "We will guess"], why: "Quran 2:32." },
        { q: "When you don't know, the angels' way is to say so.", tf: true, why: "Humility about knowledge." }
      ]
    },
    {
      slug: "adam-tells",
      title: "Adam tells them",
      line: "Adam told the angels the names, as Allah taught him.",
      facts: ["Allah knows the unseen", "And what we show and hide"],
      quote: q2(33),
      source: ik(33, "Allah told Adam to inform them of the names, and he did; Allah said: did I not tell you I know the unseen of the heavens and earth, and what you show and hide?"),
      difficulty: 3,
      questions: [
        { q: "Who told the angels the names?", a: "Adam", wrong: ["Jibril", "Iblis", "Nobody"], why: "Quran 2:33." },
        { q: "What does Allah know, in 2:33?", a: "The unseen and what we hide", wrong: ["Only what we say", "Only the past", "Only big things"], why: "What you show and what you hide." },
        { q: "Allah knows our secrets.", tf: true, why: "Quran 2:33." }
      ]
    },
    {
      slug: "iblis",
      title: "Iblis refused",
      line: "The angels bowed to Adam, but Iblis refused out of pride.",
      facts: ["A bow of honor, by Allah's order", "Pride was his downfall"],
      quote: q2(34),
      source: ik(34, "Allah honored Adam by ordering the angels to prostrate to him as greeting and respect, in obedience to Allah. Iblis refused and was arrogant, and so became a disbeliever."),
      difficulty: 2,
      questions: [
        { q: "Who refused to bow to Adam?", a: "Iblis", wrong: ["Jibril", "Mika'il", "Every angel"], why: "Quran 2:34." },
        { q: "Why did he refuse?", a: "Pride", wrong: ["He was tired", "He didn't hear", "He was asleep"], why: "Abaa wastakbara: he refused and was proud." },
        { q: "The angels bowed because Allah ordered it.", tf: true, why: "Obeying Allah, honoring Adam." }
      ]
    },
    {
      slug: "the-tree",
      title: "Don't go near the tree",
      line: "Eat freely in the Garden, but do not go near this tree.",
      facts: ["Adam and his wife", "One rule, many gifts"],
      quote: q2(35),
      source: ik(35, "Allah let Adam and his wife live in Paradise and eat freely from it, and forbade them one tree only; this was a test."),
      difficulty: 2,
      questions: [
        { q: "How many trees were they told to avoid?", a: "One", wrong: ["All of them", "Seven", "None"], why: "Only this tree." },
        { q: "Where did Adam and his wife live first?", a: "In the Garden", wrong: ["In Makkah", "On a mountain", "In a cave"], why: "Quran 2:35." },
        { q: "What does this show about Allah's rules?", a: "Many gifts, few limits", wrong: ["Only rules, no gifts", "No rules at all", "Rules make no sense"], why: "Eat freely, avoid one tree." }
      ]
    },
    {
      slug: "slip",
      title: "Shaytan made them slip",
      line: "Shaytan made them slip, and they came down to the earth.",
      facts: ["Earth: a home for a time", "Shaytan is an enemy"],
      quote: q2(36),
      source: ik(36, "Shaytan caused them to slip and took them out of the bliss they were in; Allah sent them down to the earth, a dwelling place and enjoyment for a time, with enmity between them and Shaytan."),
      difficulty: 3,
      questions: [
        { q: "Who made Adam and his wife slip?", a: "Shaytan", wrong: ["An angel", "An animal", "Each other"], why: "Quran 2:36." },
        { q: "How long is the earth our home?", a: "For a while", wrong: ["Forever", "One day", "Never"], why: "Enjoyment for a time." },
        { q: "Shaytan is a friend to people.", tf: false, why: "He is an open enemy." }
      ]
    },
    {
      slug: "words-tawbah",
      title: "Words of repentance",
      line: "Adam received words from his Lord, and Allah forgave him.",
      facts: ["'Our Lord, we wronged ourselves'", "Quran 7:23"],
      quote: q2(37),
      source: ik(37, "The words Adam received are explained by Allah's statement in 7:23: Our Lord, we have wronged ourselves; if You do not forgive us and have mercy on us, we will be among the losers."),
      difficulty: 3,
      questions: [
        { q: "What did Adam receive from his Lord?", a: "Words of repentance", wrong: ["A crown", "A sword", "Gold"], why: "Quran 2:37." },
        { q: "Which ayah explains the words?", a: "Quran 7:23", wrong: ["Quran 1:1", "Quran 112:1", "Quran 2:255"], why: "Rabbana zalamna anfusana." },
        { q: "What did Adam's mistake end with?", a: "Repentance and forgiveness", wrong: ["Pride", "Blaming others", "Giving up"], why: "Unlike Iblis, he repented." }
      ]
    },
    {
      slug: "no-fear",
      title: "No fear, no grief",
      line: "Whoever follows My guidance: no fear for them, no grief.",
      facts: ["Guidance comes with messengers", "Quran 2:38"],
      quote: q2(38),
      source: ik(38, "Allah promised that guidance would come through prophets and books; whoever follows it will have no fear of what is ahead and no grief over what they left."),
      difficulty: 2,
      questions: [
        { q: "What is promised to those who follow guidance?", a: "No fear and no grief", wrong: ["Riches", "Fame", "Long life"], why: "Quran 2:38." },
        { q: "How does Allah's guidance come?", a: "Through prophets and books", wrong: ["Through stars", "Through dreams only", "Through luck"], why: "Ibn Kathir explains it." },
        { q: "No fear about what?", a: "What is ahead in the Hereafter", wrong: ["Spiders", "Tests at school", "The dark"], why: "And no grief over what passed." }
      ]
    },
    {
      slug: "bani-israel",
      title: "Remember My favor",
      line: "Children of Israel: remember My favor and keep My promise.",
      facts: ["Israel is Ya'qub", "Keep yours, He keeps His"],
      quote: q2(40),
      source: ik(40, "Israel is the Prophet Ya'qub. Allah reminds his children of His favors and tells them: fulfill My covenant, believing in Muhammad ﷺ, and I will fulfill yours."),
      difficulty: 3,
      questions: [
        { q: "Who is 'Israel' in 2:40?", a: "Ya'qub, a prophet", wrong: ["Musa", "A city", "An angel"], why: "Ibn Kathir: Israel is Ya'qub." },
        { q: "What are they told to remember?", a: "Allah's favors on them", wrong: ["Their wars", "Their money", "Nothing"], why: "Quran 2:40." },
        { q: "What does Allah promise if they keep their covenant?", a: "He keeps His", wrong: ["Nothing", "A new land only", "Gold"], why: "Fulfill My covenant, I fulfill yours." }
      ]
    },
    {
      slug: "truth-lies",
      title: "Don't mix truth with lies",
      line: "Don't mix truth with lies, or hide the truth you know.",
      facts: ["Quran 2:42", "Honesty with knowledge"],
      quote: q2(42),
      source: ik(42, "Allah forbade them from mixing truth with falsehood and from hiding the truth while they knew it, such as the description of the Prophet ﷺ in their books."),
      difficulty: 3,
      questions: [
        { q: "What does 2:42 forbid mixing?", a: "Truth with falsehood", wrong: ["Milk with water", "Colors", "Languages"], why: "Quran 2:42." },
        { q: "What else does it forbid?", a: "Hiding the truth you know", wrong: ["Telling the truth", "Learning", "Asking questions"], why: "While you know it." },
        { q: "A friend asks you to twist a story a little. What fits 2:42?", a: "Tell it straight", wrong: ["Add a small lie", "Hide the key part", "Make it funnier with lies"], why: "Truth stays clean." }
      ]
    },
    {
      slug: "bow-together",
      title: "Pray together",
      line: "Pray, give zakah, and bow with those who bow.",
      facts: ["Prayer in congregation", "Join the ummah of Muhammad ﷺ"],
      quote: q2(43),
      source: ik(43, "Allah commands them to establish the prayer, give zakah, and bow with those who bow, meaning to be among the ummah of Muhammad ﷺ; many scholars use it as evidence for praying in congregation."),
      difficulty: 3,
      questions: [
        { q: "What three things does 2:43 command?", a: "Pray, give zakah, bow with others", wrong: ["Eat, sleep, play", "Travel, trade, rest", "Fast, read, write"], why: "Quran 2:43." },
        { q: "'Bow with those who bow' points to...", a: "Praying in congregation", wrong: ["Exercising", "Bowing to kings", "Sports"], why: "Many scholars take it so." },
        { q: "Praying with others in the masjid is encouraged.", tf: true, why: "Bow with those who bow." }
      ]
    },
    {
      slug: "forget-yourselves",
      title: "Do what you say",
      line: "Do you tell others to do good and forget yourselves?",
      facts: ["Practice what you teach", "Quran 2:44"],
      quote: q2(44),
      source: ik(44, "Allah criticized those who ordered people to do good and did not do it themselves; the point is not to stop advising, but to do the good as well."),
      difficulty: 3,
      questions: [
        { q: "What does 2:44 criticize?", a: "Telling others good but not doing it", wrong: ["Giving advice", "Reading the Book", "Helping people"], why: "And forget yourselves." },
        { q: "Ibn Kathir says the fix is to...", a: "Do the good yourself too", wrong: ["Stop advising", "Advise louder", "Hide"], why: "Not to stop advising." },
        { q: "You tell your sister to pray but skip yours. What does 2:44 say?", a: "Pray yourself too", wrong: ["It's fine", "Stop telling her", "Only tell others"], why: "Do what you say." }
      ]
    },
    {
      slug: "patience-prayer",
      title: "Patience and prayer",
      line: "Seek help through patience and prayer, easy for the humble.",
      facts: ["The Prophet ﷺ prayed when worried", "Humble hearts find it easy"],
      quote: q2(45),
      source: ik(45, "Allah commands seeking help through patience and prayer; the Prophet ﷺ used to pray when something worried him. Prayer is heavy except for the humble who are certain they will meet their Lord."),
      difficulty: 2,
      questions: [
        { q: "What two things should we seek help through?", a: "Patience and prayer", wrong: ["Money and fame", "Anger and shouting", "Games and sleep"], why: "Quran 2:45." },
        { q: "What did the Prophet ﷺ do when worried?", a: "He prayed", wrong: ["He slept", "He shouted", "He ran"], why: "Ibn Kathir reports it." },
        { q: "Who finds prayer easy, in 2:45-46?", a: "The humble", wrong: ["The proud", "The lazy", "The rich"], why: "Those sure to meet their Lord." }
      ]
    },
    {
      slug: "no-soul-helps",
      title: "No one can help",
      line: "Fear a Day when no soul can help another at all.",
      facts: ["No ransom taken", "Quran 2:48"],
      quote: q2(48),
      source: ik(48, "Fear the Day of Resurrection, when no one can benefit another, no intercession is accepted from the disbelievers, no ransom is taken, and no one will help them."),
      difficulty: 3,
      questions: [
        { q: "On that Day, can one soul pay for another?", a: "No", wrong: ["Yes, with gold", "Yes, family can", "Yes, friends can"], why: "No ransom is taken." },
        { q: "What is this Day?", a: "The Day of Resurrection", wrong: ["Eid", "A Friday", "A birthday"], why: "Quran 2:48." },
        { q: "What saves you on that Day?", a: "Your own faith and deeds", wrong: ["Your family name", "Your money", "Your friends' deeds"], why: "Each soul answers for itself." }
      ]
    },
    {
      slug: "pharaoh",
      title: "Saved from Pharaoh",
      line: "Allah saved them from Pharaoh's people, who harmed their sons.",
      facts: ["A great trial", "Quran 2:49"],
      quote: q2(49),
      source: ik(49, "Allah reminds the Children of Israel how He saved them from Pharaoh's people, who afflicted them with terrible torment, killing their sons and sparing their women; in that was a great trial."),
      difficulty: 3,
      questions: [
        { q: "Who did Allah save the Children of Israel from?", a: "Pharaoh's people", wrong: ["The Romans", "Ya'juj", "The Persians"], why: "Quran 2:49." },
        { q: "Who did Pharaoh's people harm the most?", a: "Their baby sons", wrong: ["Their animals", "Their houses only", "Nobody"], why: "A great trial." },
        { q: "What does 2:49 call it?", a: "A great trial", wrong: ["A game", "A small thing", "A holiday"], why: "Bala'un 'azim." }
      ]
    },
    {
      slug: "sea-parted",
      title: "The sea parted",
      line: "Allah parted the sea for them and drowned Pharaoh's people.",
      facts: ["While they watched", "Quran 2:50"],
      quote: q2(50),
      source: ik(50, "Allah parted the sea for Musa and his people and saved them, and drowned Pharaoh's people while the Children of Israel watched."),
      difficulty: 2,
      questions: [
        { q: "What did Allah part for them?", a: "The sea", wrong: ["A mountain", "The sky", "A desert"], why: "Quran 2:50." },
        { q: "What happened to Pharaoh's people?", a: "They drowned", wrong: ["They became rich", "They escaped", "They flew"], why: "While you were watching." },
        { q: "Who led the Children of Israel across?", a: "Musa", wrong: ["Isa", "Nuh", "Yusuf"], why: "The story of Musa." }
      ]
    },
    {
      slug: "calf",
      title: "The golden calf",
      line: "While Musa was away, they worshipped a calf; Allah forgave them.",
      facts: ["Musa was away forty nights", "So that you may be grateful"],
      quote: q2(51),
      source: ik(51, "When Musa went for forty nights to receive the Tawrah, they took the calf for worship; then Allah forgave them so that they might be grateful."),
      difficulty: 3,
      questions: [
        { q: "How long was Musa away?", a: "Forty nights", wrong: ["Three days", "A year", "Seven nights"], why: "Quran 2:51." },
        { q: "What did they wrongly worship?", a: "A calf", wrong: ["The sun", "A tree", "A river"], why: "Quran 2:51." },
        { q: "Why did Allah forgive them, in 2:52?", a: "So they might be grateful", wrong: ["So they would forget", "Because they were rich", "No reason"], why: "La'allakum tashkurun." }
      ]
    },
    {
      slug: "see-allah",
      title: "'Show us Allah'",
      line: "They said: we won't believe until we see Allah openly.",
      facts: ["A thunderbolt struck them", "Then Allah revived them"],
      quote: q2(55),
      source: ik(55, "They said to Musa: we will not believe you until we see Allah plainly; the thunderbolt seized them as they looked on, then Allah raised them up after their death so that they might be grateful."),
      difficulty: 3,
      questions: [
        { q: "What did they demand from Musa?", a: "To see Allah openly", wrong: ["Gold", "Water", "A king"], why: "Quran 2:55." },
        { q: "What struck them?", a: "A thunderbolt", wrong: ["A flood", "A storm of sand", "An earthquake"], why: "Quran 2:55." },
        { q: "What did Allah do after?", a: "Brought them back to life", wrong: ["Left them", "Made them kings", "Nothing"], why: "Quran 2:56." }
      ]
    },
    {
      slug: "manna",
      title: "Manna and quails",
      line: "Allah shaded them with clouds and fed them manna and quails.",
      facts: ["In the desert", "Eat the good things"],
      quote: q2(57),
      source: ik(57, "In the wilderness Allah shaded them with clouds from the sun and sent down manna and quails: eat of the good things We provided you."),
      difficulty: 2,
      questions: [
        { q: "What shaded them in the desert?", a: "Clouds", wrong: ["Trees", "Tents of gold", "Mountains"], why: "Quran 2:57." },
        { q: "What food did Allah send down?", a: "Manna and quails", wrong: ["Bread and fish", "Rice and meat", "Dates only"], why: "Al-manna was-salwa." },
        { q: "Quails are a kind of...", a: "Bird", wrong: ["Fish", "Fruit", "Bread"], why: "Salwa: a small bird." }
      ]
    },
    {
      slug: "hittah",
      title: "Say 'forgive us'",
      line: "Enter the town humbly and say 'hittah', forgive us.",
      facts: ["Some changed the word", "Changing Allah's word is wrong"],
      quote: q2(58),
      source: ik(58, "They were told to enter the gate bowing and say hittah, meaning: remove our sins. The wrongdoers changed the word to something else and entered mockingly."),
      difficulty: 3,
      questions: [
        { q: "What does 'hittah' ask for?", a: "Forgive our sins", wrong: ["Give us gold", "Open the gate", "Make us kings"], why: "Remove our sins from us." },
        { q: "How were they told to enter?", a: "Humbly, bowing", wrong: ["Running", "Shouting", "On horses"], why: "Quran 2:58." },
        { q: "What did the wrongdoers do?", a: "Changed the word", wrong: ["Said it perfectly", "Stayed silent", "Went home"], why: "Quran 2:59." }
      ]
    },
    {
      slug: "springs",
      title: "Twelve springs",
      line: "Musa struck the rock and twelve springs gushed out.",
      facts: ["One for each tribe", "Do no mischief on earth"],
      quote: q2(60),
      source: ik(60, "When Musa asked for water for his people, Allah told him to strike the stone with his staff, and twelve springs gushed out, one for each of the twelve tribes; each knew its drinking place."),
      difficulty: 2,
      questions: [
        { q: "What did Musa strike?", a: "A rock", wrong: ["The sea", "A tree", "The ground"], why: "With his staff." },
        { q: "How many springs came out?", a: "Twelve", wrong: ["Seven", "Two", "Forty"], why: "One for each tribe." },
        { q: "Each tribe knew its own spring.", tf: true, why: "Quran 2:60." }
      ]
    },
    {
      slug: "onions",
      title: "Better for worse?",
      line: "They asked for onions and lentils instead of food from heaven.",
      facts: ["Ungrateful for a gift", "Quran 2:61"],
      quote: q2(61),
      source: ik(61, "They grew tired of manna and quails and asked for vegetables, cucumbers, garlic, lentils and onions; Musa said: would you exchange what is better for what is lower?"),
      difficulty: 3,
      questions: [
        { q: "What did they ask for instead of manna?", a: "Vegetables, lentils and onions", wrong: ["Gold", "More quails", "Water"], why: "Quran 2:61." },
        { q: "What did Musa ask them?", a: "Would you swap better for worse?", wrong: ["Are you hungry?", "Who cooks?", "Where is the market?"], why: "Quran 2:61." },
        { q: "What is the lesson?", a: "Be grateful for Allah's gifts", wrong: ["Always want more", "Complain often", "Never eat"], why: "Ingratitude loses blessings." }
      ]
    },
    {
      slug: "mountain",
      title: "The mountain above",
      line: "Allah raised the mountain above them: hold the Book firmly.",
      facts: ["Take it with strength", "Remember what is in it"],
      quote: q2(63),
      source: ik(63, "Allah reminds them of the covenant He took and the mountain He raised above them: hold firmly what We gave you and remember what is in it, so that you may be mindful."),
      difficulty: 3,
      questions: [
        { q: "What did Allah raise above them?", a: "A mountain", wrong: ["A cloud of gold", "A bird", "A ship"], why: "Quran 2:63." },
        { q: "How were they told to hold the Book?", a: "Firmly", wrong: ["Lightly", "Never", "Only on holidays"], why: "Bi-quwwah: with strength." },
        { q: "How should we hold the Quran today?", a: "Firmly: read it and live by it", wrong: ["Only keep it on a shelf", "Read it once", "Ignore it"], why: "Remember what is in it." }
      ]
    },
    {
      slug: "sabbath",
      title: "The Sabbath",
      line: "Those who broke the Sabbath were made like apes.",
      facts: ["A warning to others", "A lesson for the mindful"],
      quote: q2(65),
      source: ik(65, "A town of the Children of Israel tricked their way around the Sabbath ban on fishing; Allah turned them into apes as a punishment and a warning to those after them."),
      difficulty: 4,
      questions: [
        { q: "Which day's rule did they break?", a: "The Sabbath", wrong: ["Friday", "Eid", "Monday"], why: "Quran 2:65." },
        { q: "What were they made like?", a: "Apes", wrong: ["Birds", "Fish", "Lions"], why: "Quran 2:65." },
        { q: "Why is this told, in 2:66?", a: "As a warning and a lesson", wrong: ["For fun", "To scare animals", "No reason"], why: "A lesson for the mindful." }
      ]
    },
    {
      slug: "the-cow",
      title: "The cow",
      line: "Musa said: Allah commands you to sacrifice a cow.",
      facts: ["This is why it is Al-Baqarah", "They asked: are you mocking us?"],
      quote: q2(67),
      source: ik(67, "Musa told his people that Allah commanded them to sacrifice a cow; they said: do you make fun of us? He said: I seek refuge with Allah from being among the ignorant."),
      difficulty: 2,
      questions: [
        { q: "What were they told to sacrifice?", a: "A cow", wrong: ["A camel", "A sheep", "A bird"], why: "Quran 2:67." },
        { q: "What did they ask Musa?", a: "Are you mocking us?", wrong: ["Where is it?", "What color?", "Can we eat it?"], why: "Quran 2:67." },
        { q: "Musa said mocking people is the way of...", a: "The ignorant", wrong: ["The wise", "The brave", "The kind"], why: "I seek refuge from being among the ignorant." }
      ]
    },
    {
      slug: "too-many-questions",
      title: "Too many questions",
      line: "They kept asking about the cow, so the task got harder.",
      facts: ["Its age, then its color", "Yellow, pleasing to see"],
      quote: q2(69),
      source: ik(69, "Had they sacrificed any cow, it would have been enough; but they made it hard for themselves with questions about its age, color and work, so Allah made it hard for them."),
      difficulty: 3,
      questions: [
        { q: "What would have been enough at first?", a: "Any cow", wrong: ["A golden cow", "Ten cows", "No cow"], why: "Ibn Kathir explains it." },
        { q: "What color was the cow, in 2:69?", a: "Bright yellow", wrong: ["Black", "White", "Red"], why: "Safra'u faqi'un lawnuha." },
        { q: "What does this teach about Allah's orders?", a: "Obey simply; don't hunt for excuses", wrong: ["Always ask for more rules", "Delay as long as you can", "Change the order"], why: "They made it hard on themselves." }
      ]
    },
    {
      slug: "unknown-man",
      title: "Who did it?",
      line: "A man was found dead; Allah showed who had done it.",
      facts: ["Struck with part of the cow", "He spoke the name"],
      quote: q2(72),
      source: ik(72, "A man of the Children of Israel was murdered and they disputed over who did it; Allah ordered them to strike the dead man with part of the cow, and he came back to life and named the one who did it."),
      difficulty: 3,
      questions: [
        { q: "What were they arguing about?", a: "Who caused a man's death", wrong: ["Who owned the cow", "Who was king", "Where to live"], why: "Quran 2:72." },
        { q: "How was the truth shown?", a: "The man was struck with part of the cow", wrong: ["A dream", "A letter", "A coin toss"], why: "Quran 2:73." },
        { q: "What does 2:73 show Allah can do?", a: "Bring the dead back to life", wrong: ["Nothing new", "Only make rain", "Only make cows"], why: "Thus Allah brings the dead to life." }
      ]
    },
    {
      slug: "stone-hearts",
      title: "Hearts like stone",
      line: "Their hearts became hard as stone, or even harder.",
      facts: ["Some rocks gush water", "Some fall in awe of Allah"],
      quote: q2(74),
      source: ik(74, "After all these signs their hearts hardened like stones or harder; yet some stones let rivers gush out, some split and water comes out, and some fall down for fear of Allah."),
      difficulty: 3,
      questions: [
        { q: "What were their hearts like, in 2:74?", a: "Like stone or harder", wrong: ["Like water", "Like gold", "Like flowers"], why: "Quran 2:74." },
        { q: "What do some stones do?", a: "Let water gush out", wrong: ["Sing", "Fly", "Grow"], why: "Even stones soften." },
        { q: "How do we keep our hearts soft?", a: "Remember Allah and read the Quran", wrong: ["Ignore reminders", "Stay angry", "Never pray"], why: "Hearts harden when signs are ignored." }
      ]
    },
    {
      slug: "virtue",
      title: "Shaytan runs away",
      line: "Shaytan runs from a house where Al-Baqarah is recited.",
      facts: ["Don't make homes like graves", "Sahih Muslim 780"],
      source: hadith("muslim", "780", "Abu Hurairah", "Sahih", "Do not make your houses graves; Shaytan runs away from the house in which Surat al-Baqarah is recited."),
      difficulty: 2,
      questions: [
        { q: "Who runs from a house where Al-Baqarah is recited?", a: "Shaytan", wrong: ["The angels", "The neighbors", "The cat"], why: "Muslim 780." },
        { q: "What did he say not to make our houses?", a: "Like graves", wrong: ["Like palaces", "Like schools", "Like shops"], why: "Fill homes with Quran and prayer." },
        { q: "Reciting Al-Baqarah at home is a protection.", tf: true, why: "Muslim 780." }
      ]
    }
  ]
};

/** Ayahs 75 to 176: the covenant, Ibrahim and the Ka'bah, the new qiblah, patience, the signs of Allah, good food. */
const BAQARAH_TWO: DeepUnit = {
  key: "baqarah2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-baqarah",
  name: "Al-Baqarah, ayahs 75 to 176",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Baqarah",
  lessons: [
    {
      slug: "heard-and-changed",
      title: "They heard, then changed it",
      line: "Some heard Allah's words, understood them, then twisted them.",
      facts: ["Knowing is not enough", "Honesty with revelation"],
      quote: q2(75),
      source: ik(75, "A group among the Children of Israel heard the Word of Allah and changed its meaning after they had understood it, knowingly. So the believers should not expect easy faith from such people."),
      difficulty: 3,
      questions: [
        { q: "What did some do after understanding Allah's words, in 2:75?", a: "Twisted their meaning", wrong: ["Taught them well", "Wrote them in gold", "Recited them daily"], why: "They changed it knowingly." },
        { q: "Did they twist it by mistake?", a: "No, they knew what they did", wrong: ["Yes, by accident", "Yes, they were children", "They never heard it"], why: "After they had understood it." },
        { q: "Knowing the truth is enough even if you change it.", tf: false, why: "Knowledge must be followed honestly." }
      ]
    },
    {
      slug: "wishful",
      title: "Only wishful thinking",
      line: "Some knew nothing of the Book but their own wishes.",
      facts: ["Ummi: cannot read", "Amani: false hopes"],
      quote: q2(78),
      source: ik(78, "Ummiyyun are those who do not read or write and do not know what is in the Book; they only have amani, wishful hopes, and guesses."),
      difficulty: 3,
      questions: [
        { q: "What did they rely on instead of the Book, in 2:78?", a: "Wishful hopes and guesses", wrong: ["Careful study", "The scholars' books", "The Tawrah by heart"], why: "Amani: false desires." },
        { q: "What does 'ummi' mean?", a: "One who does not read or write", wrong: ["A king", "A traveler", "A poet"], why: "Ibn Kathir explains it so." },
        { q: "What protects us from wishful religion?", a: "Learning what Allah really said", wrong: ["Guessing", "Following rumors", "Ignoring the Quran"], why: "Know the Book itself." }
      ]
    },
    {
      slug: "woe-writers",
      title: "Written by their own hands",
      line: "Woe to those who write words and call them Allah's.",
      facts: ["For a small price", "Lying about Allah"],
      quote: q2(79),
      source: ik(79, "Woe to those who write a book with their own hands and say this is from Allah, to buy with it a small price; woe for what their hands wrote and what they earned."),
      difficulty: 3,
      questions: [
        { q: "What does 2:79 warn against?", a: "Writing words and calling them Allah's", wrong: ["Writing letters", "Reading books", "Learning to write"], why: "Lying about Allah is a great sin." },
        { q: "Why did they do it?", a: "For a small worldly price", wrong: ["To help the poor", "By accident", "To please Allah"], why: "To buy with it a small price." },
        { q: "Saying 'Allah said' about something He did not say is serious.", tf: true, why: "Quran 2:79." }
      ]
    },
    {
      slug: "few-days",
      title: "'Only a few days'",
      line: "They said the Fire would touch them for a few days only.",
      facts: ["A claim with no promise", "Deeds decide, not names"],
      quote: q2(80),
      source: ik(80, "They claimed the Fire would touch them only for a number of days. Allah asks: have you taken a promise from Allah, or do you say about Allah what you do not know?"),
      difficulty: 3,
      questions: [
        { q: "What did they claim in 2:80?", a: "The Fire would touch them only a few days", wrong: ["They would never die", "They were angels", "The world would end soon"], why: "A claim without proof." },
        { q: "What does Allah ask them?", a: "Did you take a promise from Allah?", wrong: ["Are you hungry?", "Where do you live?", "Who is your king?"], why: "Or do you say what you do not know?" },
        { q: "Being from a certain family guarantees Jannah.", tf: false, why: "Faith and deeds decide." }
      ]
    },
    {
      slug: "earns-evil",
      title: "Surrounded by sins",
      line: "Whoever earns evil and is surrounded by sins loses.",
      facts: ["Believers who do good win", "Ashab al-Jannah"],
      quote: q2(82),
      source: ik(81, "Whoever earns evil and his sins surround him, those are the people of the Fire; and those who believe and do righteous deeds are the people of Jannah, forever."),
      difficulty: 2,
      questions: [
        { q: "Who are the people of Jannah, in 2:82?", a: "Those who believe and do good", wrong: ["Those with big families", "Those who are rich", "Those who never work"], why: "Faith with good deeds." },
        { q: "What surrounds the losers in 2:81?", a: "Their sins", wrong: ["Their friends", "Their houses", "Their money"], why: "Sins piled up without repentance." },
        { q: "What should we do after a sin, so it does not pile up?", a: "Repent quickly", wrong: ["Add more", "Forget it", "Blame others"], why: "Tawbah wipes it away." }
      ]
    },
    {
      slug: "covenant-list",
      title: "The covenant",
      line: "Worship only Allah, be good to parents, orphans and the poor.",
      facts: ["Speak good to people", "Prayer and zakah"],
      quote: q2(83),
      source: ik(83, "Allah took a covenant from the Children of Israel: worship none but Allah, be good to parents, relatives, orphans and the poor, speak good to people, pray and give zakah. Most turned away."),
      difficulty: 2,
      questions: [
        { q: "What comes first in the covenant of 2:83?", a: "Worship none but Allah", wrong: ["Build houses", "Travel far", "Collect gold"], why: "Tawhid comes before everything." },
        { q: "Right after worshipping Allah, who must we be good to?", a: "Parents", wrong: ["Kings", "Rich people", "Strangers only"], why: "Parents come next." },
        { q: "How should we speak to people, in 2:83?", a: "Speak good to them", wrong: ["Speak harshly", "Never speak", "Only to friends"], why: "Wa qulu lin-nasi husna." }
      ]
    },
    {
      slug: "part-of-book",
      title: "Half the Book?",
      line: "Do you believe in part of the Book and reject the rest?",
      facts: ["Take all of it", "No picking and choosing"],
      quote: q2(85),
      source: ik(85, "They were told not to shed each other's blood or drive each other from their homes; they broke this, yet ransomed captives as the Book said. Allah asks: do you believe in part of the Book and reject part?"),
      difficulty: 3,
      questions: [
        { q: "What does 2:85 blame them for?", a: "Following only the parts they liked", wrong: ["Reading too much", "Giving charity", "Praying at night"], why: "Believing in part, rejecting part." },
        { q: "How should a Muslim take the Quran?", a: "All of it, with trust", wrong: ["Only the easy parts", "Only the stories", "Only on Fridays"], why: "Ibn Kathir explains it so." },
        { q: "Picking only the rules we like is fine.", tf: false, why: "Quran 2:85." }
      ]
    },
    {
      slug: "ruh-qudus",
      title: "Messengers one after another",
      line: "Allah sent Musa, then messengers, then Isa with clear signs.",
      facts: ["Ruh al-Qudus is Jibril", "Many messengers"],
      quote: q2(87),
      source: ik(87, "Allah gave Musa the Tawrah and sent messengers after him, and gave Isa son of Maryam clear proofs and supported him with Ruh al-Qudus, who is Jibril."),
      difficulty: 3,
      questions: [
        { q: "Who is Ruh al-Qudus, in 2:87?", a: "Jibril", wrong: ["Musa", "A star", "A king"], why: "Ibn Kathir: it is Jibril." },
        { q: "Whom did Allah support with clear signs in 2:87?", a: "Isa son of Maryam", wrong: ["Fir'awn", "Qarun", "Haman"], why: "Quran 2:87." },
        { q: "Did Allah send messengers after Musa?", a: "Yes, one after another", wrong: ["No, none", "Only one", "Only kings"], why: "Wa qaffayna min ba'dihi bir-rusul." }
      ]
    },
    {
      slug: "wrapped-hearts",
      title: "'Our hearts are wrapped'",
      line: "They said our hearts are wrapped; really their rejection did it.",
      facts: ["An excuse, not a reason", "Little do they believe"],
      quote: q2(88),
      source: ik(88, "They said: our hearts are ghulf, covered, so we do not understand. Allah said: rather He has cursed them for their disbelief, so little do they believe."),
      difficulty: 3,
      questions: [
        { q: "What excuse did they give in 2:88?", a: "Our hearts are covered", wrong: ["We are too busy", "We are sick", "We are poor"], why: "Qulubuna ghulf." },
        { q: "What was the real reason?", a: "Their own rejection", wrong: ["Bad weather", "No one told them", "They were too young"], why: "Allah shows the truth." },
        { q: "Blaming our hearts is an excuse to stop trying.", tf: true, why: "We should keep asking Allah for guidance." }
      ]
    },
    {
      slug: "recognized",
      title: "They knew him",
      line: "They awaited a prophet, then rejected him out of envy.",
      facts: ["Envy blocks truth", "They knew the signs"],
      quote: q2(89),
      source: ik(89, "Before he came, they used to pray for victory through the coming prophet; when the Prophet ﷺ came and they recognized him, they rejected him out of envy that Allah chose him from the Arabs."),
      difficulty: 3,
      questions: [
        { q: "What were they waiting for, before 2:89?", a: "A coming prophet", wrong: ["A new king", "Rain", "A war"], why: "They knew his description." },
        { q: "Why did they reject him, in 2:90?", a: "Envy", wrong: ["They never heard of him", "He was unkind", "He asked for money"], why: "Envy that Allah chose him." },
        { q: "Envy can stop a person from accepting the truth.", tf: true, why: "Quran 2:90." }
      ]
    },
    {
      slug: "calf-love",
      title: "Love of the calf",
      line: "We heard and disobeyed; the calf's love soaked their hearts.",
      facts: ["Words without obeying", "Love shapes deeds"],
      quote: q2(93),
      source: ik(93, "When the mountain was raised over them they said: we hear and we disobey, and the love of the calf soaked into their hearts because of their disbelief."),
      difficulty: 3,
      questions: [
        { q: "What did they say in 2:93?", a: "We hear and we disobey", wrong: ["We hear and we obey", "We are sorry", "Teach us more"], why: "Sami'na wa 'asayna." },
        { q: "What did the believers say instead, in 2:285?", a: "We hear and we obey", wrong: ["We hear and we disobey", "We will think", "Not now"], why: "Sami'na wa ata'na." },
        { q: "What soaked into their hearts?", a: "Love of the calf", wrong: ["Love of Musa", "Love of learning", "Love of charity"], why: "Quran 2:93." }
      ]
    },
    {
      slug: "long-life",
      title: "A thousand years",
      line: "Some wish for a thousand years, but long life saves no one.",
      facts: ["Only deeds help", "Allah sees all"],
      quote: q2(96),
      source: ik(96, "They are the most eager of people for life; each wishes he could live a thousand years, but even that would not push the punishment away from him. Allah sees what they do."),
      difficulty: 2,
      questions: [
        { q: "How long did some wish to live, in 2:96?", a: "A thousand years", wrong: ["Ten years", "One day", "Forever young"], why: "Quran 2:96." },
        { q: "Would a long life alone save them?", a: "No, deeds decide", wrong: ["Yes, always", "Yes, if rich", "Yes, if famous"], why: "It would not push the punishment away." },
        { q: "What is the best use of a long life?", a: "Filling it with good deeds", wrong: ["Collecting more money", "Sleeping more", "Worrying"], why: "Every day is a chance." }
      ]
    },
    {
      slug: "jibril-enemy",
      title: "An enemy of Jibril?",
      line: "Whoever is an enemy of Jibril, he only brought the Quran down.",
      facts: ["Jibril and Mika'il", "Angels obey Allah"],
      quote: q2(97),
      source: ik(97, "Some said Jibril was their enemy. Allah said: Jibril brought the Quran down to your heart by Allah's permission, confirming what came before; whoever is an enemy of Allah, His angels, Jibril and Mika'il, Allah is his enemy."),
      difficulty: 3,
      questions: [
        { q: "What did Jibril bring down, in 2:97?", a: "The Quran", wrong: ["Rain", "Gold", "Armies"], why: "To your heart, by Allah's permission." },
        { q: "Which two angels are named in 2:98?", a: "Jibril and Mika'il", wrong: ["Harut and Marut only", "Munkar and Nakir", "Malik and Ridwan"], why: "Quran 2:98." },
        { q: "Hating an angel of Allah is fine.", tf: false, why: "They do only what Allah commands." }
      ]
    },
    {
      slug: "magic",
      title: "Magic is from the devils",
      line: "The devils taught magic; it harms only by Allah's permission.",
      facts: ["Sulayman did not disbelieve", "Harm, never benefit"],
      quote: q2(102),
      source: ik(102, "The devils lied about Sulayman's kingdom and taught people magic. Sulayman did not disbelieve, the devils did. Magic harms no one except by Allah's permission, and it harms and does not benefit."),
      difficulty: 4,
      questions: [
        { q: "Who taught people magic, in 2:102?", a: "The devils", wrong: ["Sulayman", "The prophets", "The scholars"], why: "Sulayman did not disbelieve." },
        { q: "Can magic harm anyone without Allah's permission?", a: "No", wrong: ["Yes, always", "Only at night", "Only on Fridays"], why: "Except by Allah's permission." },
        { q: "What does 2:102 say magic brings?", a: "Harm, not benefit", wrong: ["Wealth", "Wisdom", "Health"], why: "Ma yadurruhum wa la yanfa'uhum." }
      ]
    },
    {
      slug: "unzurna",
      title: "Say 'unzurna'",
      line: "Don't say 'ra'ina', say 'unzurna', and listen well.",
      facts: ["Choose clear, kind words", "Respect the Prophet ﷺ"],
      quote: q2(104),
      source: ik(104, "Some people twisted the word ra'ina into an insult. Allah told the believers to say unzurna, 'look at us, be patient with us', instead, and to listen."),
      difficulty: 3,
      questions: [
        { q: "Which word were believers told to use, in 2:104?", a: "Unzurna", wrong: ["Ra'ina", "Ya Muhammad", "Hey you"], why: "Unzurna: look at us." },
        { q: "Why was 'ra'ina' left?", a: "Some twisted it into an insult", wrong: ["It was too long", "It was Persian", "It was a name"], why: "Ibn Kathir explains it." },
        { q: "What does 2:104 teach about our words?", a: "Choose clear, respectful words", wrong: ["Words never matter", "Joke about anything", "Speak in riddles"], why: "Manners in speech." }
      ]
    },
    {
      slug: "better-ayah",
      title: "Something better",
      line: "When Allah changes a ruling, He brings one better or similar.",
      facts: ["Naskh: replacing a ruling", "Allah is able"],
      quote: q2(106),
      source: ik(106, "Whatever ayah Allah abrogates or causes to be forgotten, He brings one better than it or like it. Allah is able to do all things, and the kingdom of the heavens and earth is His."),
      difficulty: 4,
      questions: [
        { q: "When a ruling is replaced, what does Allah bring, in 2:106?", a: "One better or like it", wrong: ["Nothing", "Something worse", "A riddle"], why: "Quran 2:106." },
        { q: "Why can Allah do this?", a: "He is able to do all things", wrong: ["He changed His mind", "He forgot", "People voted"], why: "His is the kingdom." },
        { q: "Which ruling changed later in Al-Baqarah?", a: "The direction of prayer", wrong: ["Belief in Allah", "Honesty", "Kindness to parents"], why: "The qiblah, in 2:142-150." }
      ]
    },
    {
      slug: "forgive-overlook",
      title: "Forgive and overlook",
      line: "Forgive and overlook until Allah brings His command.",
      facts: ["Patience with others", "Good deeds sent ahead"],
      quote: q2(109),
      source: ik(109, "Many wished to turn the believers back from faith out of envy; Allah told the believers to forgive and overlook, and to keep praying and giving zakah, for whatever good they send ahead they will find with Allah."),
      difficulty: 2,
      questions: [
        { q: "What were believers told to do in 2:109?", a: "Forgive and overlook", wrong: ["Take revenge", "Give up faith", "Argue all day"], why: "Fa'fu wasfahu." },
        { q: "What happens to good you send ahead, in 2:110?", a: "You find it with Allah", wrong: ["It is lost", "It is forgotten", "It goes to others"], why: "Quran 2:110." },
        { q: "A classmate teases you for your faith. What fits 2:109?", a: "Stay calm, forgive and keep praying", wrong: ["Shout back", "Stop praying", "Tease them worse"], why: "Patience and prayer." }
      ]
    },
    {
      slug: "submits-face",
      title: "Submit and do good",
      line: "Whoever submits to Allah and does good has his reward.",
      facts: ["Islam plus ihsan", "No fear, no grief"],
      quote: q2(112),
      source: ik(112, "Whoever submits his face to Allah sincerely, and is a muhsin following the right way, will have his reward with his Lord. Deeds need sincerity and the right way to be accepted."),
      difficulty: 3,
      questions: [
        { q: "Who has his reward with his Lord, in 2:112?", a: "Whoever submits to Allah and does good", wrong: ["Whoever is born rich", "Whoever claims it", "Whoever is famous"], why: "Quran 2:112." },
        { q: "What two things make a deed accepted, says Ibn Kathir?", a: "Sincerity and the right way", wrong: ["Size and speed", "Money and fame", "Luck and age"], why: "For Allah, as He taught." },
        { q: "Just claiming Jannah is enough.", tf: false, why: "Bring proof: faith and good deeds." }
      ]
    },
    {
      slug: "masajid",
      title: "Keep the masjids open",
      line: "Who is more wrong than one who stops Allah's name in masjids?",
      facts: ["Masjids are for remembrance", "Keep them open and alive"],
      quote: q2(114),
      source: ik(114, "Who is more unjust than one who prevents Allah's name from being mentioned in His masjids and works to ruin them? Masjids are for Allah's remembrance."),
      difficulty: 2,
      questions: [
        { q: "What does 2:114 call blocking Allah's name in masjids?", a: "The worst wrong", wrong: ["A small thing", "A good deed", "A game"], why: "Who is more unjust?" },
        { q: "What are masjids for?", a: "Remembering Allah", wrong: ["Shouting", "Selling goods", "Playing loud games"], why: "Allah's name is mentioned there." },
        { q: "Helping keep a masjid clean and open is good.", tf: true, why: "The opposite of 2:114." }
      ]
    },
    {
      slug: "east-west",
      title: "East and west",
      line: "East and west are Allah's; wherever you turn, there is Allah.",
      facts: ["Prayed on his camel", "Sahih Muslim 700c"],
      quote: q2(115),
      source: hadith("muslim", "700c", "Ibn Umar", "Sahih", "The Messenger of Allah ﷺ prayed voluntary prayer on his camel while coming from Makkah to Madinah, whichever way it faced, and about this the ayah came: wherever you turn, there is the Face of Allah."),
      difficulty: 3,
      questions: [
        { q: "To whom do the east and the west belong, in 2:115?", a: "To Allah", wrong: ["To kings", "To nobody", "To the sun"], why: "Quran 2:115." },
        { q: "How did he ﷺ pray voluntary prayers on a journey?", a: "On his camel, whichever way it faced", wrong: ["He never did", "Only standing on the ground", "Only at home"], why: "Muslim 700c." },
        { q: "Can Allah be worshipped anywhere?", a: "Yes, all the earth is His", wrong: ["Only in one city", "Only indoors", "Only in the morning"], why: "East and west are His." }
      ]
    },
    {
      slug: "kun",
      title: "Be, and it is",
      line: "Allah has no son. He says 'Be', and it is.",
      facts: ["Kun fayakun", "Everything obeys Him"],
      quote: q2(117),
      source: ik(117, "They said Allah has taken a son; glory be to Him! All in the heavens and earth belong to Him and obey Him. He originated the heavens and earth, and when He decrees a thing He only says to it 'Be', and it is."),
      difficulty: 2,
      questions: [
        { q: "What does Allah say when He decrees a thing, in 2:117?", a: "Be", wrong: ["Wait", "Maybe", "Later"], why: "Kun fayakun." },
        { q: "Does Allah need a son?", a: "No, glory be to Him", wrong: ["Yes", "Sometimes", "Only one"], why: "Everything already belongs to Him." },
        { q: "Badi' in 2:117 means...", a: "Originator, making without a model", wrong: ["Copier", "Builder of houses", "Painter"], why: "He made the heavens and earth from nothing." }
      ]
    },
    {
      slug: "haqqa-tilawah",
      title: "Recite it as it deserves",
      line: "Those who recite the Book as it deserves truly believe in it.",
      facts: ["Read, understand, follow", "Halal and haram"],
      quote: q2(121),
      source: ik(121, "Those given the Book who recite it as it should be recited are true believers. Ibn Mas'ud said: reciting it properly means making its halal halal, its haram haram, and not twisting its words."),
      difficulty: 3,
      questions: [
        { q: "What does 'haqqa tilawatihi' mean?", a: "Reciting it as it deserves", wrong: ["Reciting it fast", "Reading it once", "Singing it loudly"], why: "Quran 2:121." },
        { q: "What did Ibn Mas'ud say proper reciting includes?", a: "Following its halal and haram", wrong: ["Only a nice voice", "Only speed", "Only the stories"], why: "And not twisting its words." },
        { q: "Reading the Quran well means living by it too.", tf: true, why: "Ibn Kathir quotes Ibn Mas'ud." }
      ]
    },
    {
      slug: "ibrahim-tested",
      title: "Ibrahim was tested",
      line: "Allah tested Ibrahim with commands; he fulfilled them all.",
      facts: ["Made an imam for people", "Not for wrongdoers"],
      quote: q2(124),
      source: ik(124, "Allah tested Ibrahim with commands and he fulfilled them, so Allah made him an imam for people. Ibrahim asked: and from my children? Allah said: My promise does not reach the wrongdoers."),
      difficulty: 3,
      questions: [
        { q: "What did Allah make Ibrahim after his tests?", a: "An imam, a leader for people", wrong: ["A king", "A trader", "A poet"], why: "Quran 2:124." },
        { q: "What did Ibrahim ask for his children?", a: "That some be leaders too", wrong: ["Gold", "Long life", "Nothing"], why: "And from my children?" },
        { q: "Whom does Allah's promise not reach, in 2:124?", a: "The wrongdoers", wrong: ["The poor", "The young", "Travelers"], why: "La yanalu 'ahdi az-zalimin." }
      ]
    },
    {
      slug: "safe-house",
      title: "A house of safety",
      line: "Allah made the House a place to return to, and of safety.",
      facts: ["Maqam Ibrahim", "Umar's wish, Bukhari 402"],
      quote: q2(125),
      source: hadith("bukhari", "402", "Umar ibn al-Khattab", "Sahih", "My Lord agreed with me in three things. I said: O Messenger of Allah ﷺ, I wish we took the Station of Ibrahim as a place of prayer; then came the ayah: take the Station of Ibrahim as a place of prayer."),
      difficulty: 3,
      questions: [
        { q: "What did Allah make the House, in 2:125?", a: "A place of return and safety", wrong: ["A market", "A palace", "A fort for war"], why: "Mathabatan lin-nasi wa amna." },
        { q: "Whose wish matched the ayah about Maqam Ibrahim?", a: "Umar", wrong: ["Abu Jahl", "Abu Lahab", "Qarun"], why: "Bukhari 402." },
        { q: "Who were told to purify the House for worshippers?", a: "Ibrahim and Isma'il", wrong: ["Musa and Harun", "Dawud and Sulayman", "Yunus and Ayyub"], why: "Quran 2:125." }
      ]
    },
    {
      slug: "city-safe",
      title: "Make this city safe",
      line: "Ibrahim prayed: make this a safe city and feed its people.",
      facts: ["Makkah's safety", "Fruits brought from far"],
      quote: q2(126),
      source: ik(126, "Ibrahim prayed: my Lord, make this a secure city and provide its people with fruits, those who believe. Allah said: and whoever disbelieves, I will let him enjoy a little."),
      difficulty: 2,
      questions: [
        { q: "What did Ibrahim ask for Makkah, in 2:126?", a: "Safety and food", wrong: ["Rivers of gold", "Tall towers", "A big army"], why: "A secure city with fruits." },
        { q: "Did Ibrahim's dua come true?", a: "Yes, Makkah is safe and fed", wrong: ["No", "Only for a day", "Nobody knows"], why: "Fruits reach it from everywhere." },
        { q: "What does 2:126 teach us to do?", a: "Make dua for our cities", wrong: ["Never ask Allah", "Only ask for ourselves", "Give up hope"], why: "Follow Ibrahim's way." }
      ]
    },
    {
      slug: "raising-house",
      title: "Raising the House",
      line: "Ibrahim and Isma'il raised the Ka'bah: Lord, accept from us.",
      facts: ["Working and praying", "Rabbana taqabbal minna"],
      quote: q2(127),
      source: ik(127, "Ibrahim and Isma'il raised the foundations of the House, saying: our Lord, accept from us; You are the All-Hearing, All-Knowing. They did a great deed and still feared it might not be accepted."),
      difficulty: 2,
      questions: [
        { q: "Who raised the foundations of the Ka'bah, in 2:127?", a: "Ibrahim and Isma'il", wrong: ["Nuh and his son", "Musa and Harun", "Adam alone"], why: "Quran 2:127." },
        { q: "What did they pray while working?", a: "Our Lord, accept from us", wrong: ["Make us famous", "Pay us well", "Let us rest"], why: "Rabbana taqabbal minna." },
        { q: "After a good deed, what does their dua teach?", a: "Ask Allah to accept it", wrong: ["Boast about it", "Forget Allah", "Ask for praise"], why: "Humble even after great work." }
      ]
    },
    {
      slug: "make-us-muslim",
      title: "Make us Muslims",
      line: "Make us submit to You, and our children; show us our rites.",
      facts: ["Dua for the children", "Show us our manasik"],
      quote: q2(128),
      source: ik(128, "Ibrahim and Isma'il prayed: our Lord, make us Muslims, submitting to You, and from our children a nation submitting to You, show us our rites of worship and accept our repentance."),
      difficulty: 2,
      questions: [
        { q: "What did they ask for their children, in 2:128?", a: "A nation submitting to Allah", wrong: ["Riches", "Fame", "Power"], why: "Wa min dhurriyyatina." },
        { q: "What does 'manasik' mean in 2:128?", a: "Rites of worship", wrong: ["Markets", "Houses", "Songs"], why: "Show us how to worship You." },
        { q: "Even prophets asked Allah to accept their repentance.", tf: true, why: "Wa tub 'alayna." }
      ]
    },
    {
      slug: "send-messenger",
      title: "Send them a messenger",
      line: "Ibrahim prayed for a messenger; Allah sent Muhammad ﷺ.",
      facts: ["Recite, teach, purify", "Dua answered"],
      quote: q2(129),
      source: ik(129, "Ibrahim prayed that Allah send to the people of Makkah a messenger from among them, to recite His ayahs, teach them the Book and wisdom and purify them. Allah answered with Muhammad ﷺ."),
      difficulty: 2,
      questions: [
        { q: "Who answered Ibrahim's dua in 2:129?", a: "Muhammad ﷺ", wrong: ["Musa", "Sulayman", "Yusuf"], why: "A messenger from among them." },
        { q: "What would the messenger do, in 2:129?", a: "Recite, teach and purify", wrong: ["Collect taxes", "Build palaces", "Lead wars only"], why: "Quran 2:129." },
        { q: "A dua can be answered long after it is made.", tf: true, why: "Ibrahim's dua, answered centuries later." }
      ]
    },
    {
      slug: "deen-ibrahim",
      title: "The way of Ibrahim",
      line: "Who turns from Ibrahim's way, except one who fools himself?",
      facts: ["Chosen in this world", "Righteous in the next"],
      quote: q2(130),
      source: ik(130, "No one turns away from the religion of Ibrahim, pure tawhid, except one who fools himself. Allah chose him in this world, and in the Hereafter he is among the righteous."),
      difficulty: 2,
      questions: [
        { q: "Who turns away from Ibrahim's way, in 2:130?", a: "One who fools himself", wrong: ["A wise person", "A scholar", "A prophet"], why: "Illa man safiha nafsah." },
        { q: "What was at the heart of Ibrahim's way?", a: "Worshipping Allah alone", wrong: ["Idols", "Stars", "Kings"], why: "Pure tawhid." },
        { q: "Where is Ibrahim in the Hereafter, in 2:130?", a: "Among the righteous", wrong: ["Forgotten", "Among the losers", "Unknown"], why: "Quran 2:130." }
      ]
    },
    {
      slug: "wasiyyah",
      title: "A father's last advice",
      line: "Ibrahim and Ya'qub told their sons: die only as Muslims.",
      facts: ["'What will you worship?'", "Faith passed on"],
      quote: q2(133),
      source: ik(133, "Ibrahim advised his sons, and so did Ya'qub: Allah chose this religion for you, so do not die except as Muslims. At death Ya'qub asked: what will you worship after me? They said: your God, the God of your fathers."),
      difficulty: 2,
      questions: [
        { q: "What did Ya'qub ask his sons at death, in 2:133?", a: "What will you worship after me?", wrong: ["Who gets my money?", "Where will you live?", "What will you eat?"], why: "His biggest worry was their faith." },
        { q: "What did they answer?", a: "Your God, the One God", wrong: ["Our money", "The stars", "Nothing"], why: "The God of Ibrahim, Isma'il and Ishaq." },
        { q: "What does this teach parents?", a: "Care most about children's faith", wrong: ["Only leave wealth", "Never talk about faith", "Only care for grades"], why: "Faith is the best gift." }
      ]
    },
    {
      slug: "passed-nation",
      title: "A nation that has passed",
      line: "They have what they earned; you have what you earned.",
      facts: ["Your own deeds count", "No borrowing good deeds"],
      quote: q2(134),
      source: ik(134, "That was a nation that has passed away. They have what they earned and you have what you earned; being related to righteous people will not help you without your own deeds."),
      difficulty: 2,
      questions: [
        { q: "Does a good ancestor save you without your own deeds?", a: "No", wrong: ["Yes, always", "Yes, if famous", "Only on Fridays"], why: "You have what you earned." },
        { q: "Will you be asked about others' deeds, in 2:134?", a: "No, only your own", wrong: ["Yes, everyone's", "Only your parents'", "Only your friends'"], why: "Wa la tus'aluna 'amma kanu ya'malun." },
        { q: "Honor righteous ancestors by doing good like them.", tf: true, why: "Ibn Kathir explains it." }
      ]
    },
    {
      slug: "all-prophets",
      title: "We believe in all of them",
      line: "We believe in all the prophets and make no division among them.",
      facts: ["Ibrahim to Isa", "We submit to Him"],
      quote: q2(136),
      source: ik(136, "Say: we believe in Allah and what was sent to us, and to Ibrahim, Isma'il, Ishaq, Ya'qub and the tribes, and what Musa, Isa and the prophets were given; we make no distinction between any of them."),
      difficulty: 2,
      questions: [
        { q: "Which prophets do Muslims believe in, in 2:136?", a: "All of them", wrong: ["Only Muhammad ﷺ", "Only Musa", "Only Ibrahim"], why: "No distinction among them." },
        { q: "Which of these is named in 2:136?", a: "Isa", wrong: ["Luqman", "Dhul-Qarnayn", "Khidr"], why: "Musa and Isa are named." },
        { q: "Believing in one prophet and rejecting another is fine.", tf: false, why: "Quran 2:136." }
      ]
    },
    {
      slug: "sibghah",
      title: "Allah's color",
      line: "Take the sibghah of Allah: His religion; whose color is better?",
      facts: ["Sibghah: dye, color", "Islam colors life"],
      quote: q2(138),
      source: ik(138, "Our sibghah is the sibghah of Allah, and whose sibghah is better than Allah's? Ibn Abbas and others said it means the religion of Allah."),
      difficulty: 3,
      questions: [
        { q: "What does 'sibghah' literally mean?", a: "A dye or color", wrong: ["A song", "A house", "A sword"], why: "Like dye soaking cloth." },
        { q: "What is 'the sibghah of Allah', says Ibn Abbas?", a: "Allah's religion", wrong: ["A flag", "A painting", "A rainbow"], why: "Ibn Kathir reports it." },
        { q: "Like dye, faith should show in all our life.", tf: true, why: "Whose color is better than Allah's?" }
      ]
    },
    {
      slug: "fools-qiblah",
      title: "'Why did they turn?'",
      line: "Fools will ask why the Muslims turned from their old qiblah.",
      facts: ["East and west are His", "He guides whom He wills"],
      quote: q2(142),
      source: ik(142, "The foolish among people will say: what turned them away from their qiblah? Say: to Allah belong the east and the west; He guides whom He wills to a straight path."),
      difficulty: 2,
      questions: [
        { q: "What did foolish people question, in 2:142?", a: "The change of qiblah", wrong: ["The fasting", "The adhan", "The Friday sermon"], why: "What turned them from their qiblah?" },
        { q: "What is the answer in 2:142?", a: "East and west belong to Allah", wrong: ["We got lost", "The old one broke", "It was a mistake"], why: "Lillahil-mashriqu wal-maghrib." },
        { q: "Which way did the Muslims face before the Ka'bah?", a: "Jerusalem (Bayt al-Maqdis)", wrong: ["Yemen", "Egypt", "Persia"], why: "For sixteen or seventeen months." }
      ]
    },
    {
      slug: "middle-nation",
      title: "A middle nation",
      line: "Allah made this ummah a just middle nation, witnesses for all.",
      facts: ["Wasat: just and best", "Witnesses for Nuh"],
      quote: q2(143),
      source: hadith("bukhari", "4487", "Abu Sa'id al-Khudri", "Sahih", "Nuh will be asked: did you convey the Message? He will say yes. His people will deny it, and Muhammad ﷺ and his followers will testify for him. That is the meaning of: We made you a just nation, that you be witnesses."),
      difficulty: 3,
      questions: [
        { q: "What does 'wasat' mean in 2:143?", a: "Just and best, balanced", wrong: ["Small", "Lazy", "Late"], why: "Ibn Kathir explains it." },
        { q: "For which prophet will this ummah testify?", a: "Nuh", wrong: ["Fir'awn", "Qarun", "Haman"], why: "Bukhari 4487." },
        { q: "What is a balanced ummah like?", a: "Fair, not extreme either way", wrong: ["Harsh to everyone", "Careless about religion", "Always in the middle of fights"], why: "Just and the best." }
      ]
    },
    {
      slug: "faith-not-lost",
      title: "Your prayers were not lost",
      line: "Allah would never let the prayers before the change go to waste.",
      facts: ["Sahih al-Bukhari 4486", "Allah is Most Kind"],
      quote: q2(143),
      source: hadith("bukhari", "4486", "Al-Bara ibn Azib", "Sahih", "He ﷺ prayed toward Jerusalem for sixteen or seventeen months, wishing for the Ka'bah. Some men had died before the change, and people wondered about them; Allah revealed: Allah would never let your faith be lost."),
      difficulty: 3,
      questions: [
        { q: "What worried people about those who died before the change?", a: "Whether their prayers counted", wrong: ["Their houses", "Their debts", "Their names"], why: "Bukhari 4486." },
        { q: "What did Allah answer, in 2:143?", a: "He would never let your faith be lost", wrong: ["Pray them again", "They are lost", "Nobody knows"], why: "Wa ma kanallahu liyudi'a imanakum." },
        { q: "'Faith' in 2:143 includes the prayers they prayed.", tf: true, why: "Al-Bara's report." }
      ]
    },
    {
      slug: "turn-face",
      title: "Turn to the Ka'bah",
      line: "We see you look to the sky; now turn to al-Masjid al-Haram.",
      facts: ["He ﷺ longed for it", "Wherever you are"],
      quote: q2(144),
      source: ik(144, "The Prophet ﷺ kept looking to the sky hoping for the qiblah to change to the Ka'bah. Allah said: We will turn you to a qiblah that pleases you; so turn your face toward al-Masjid al-Haram, wherever you are."),
      difficulty: 2,
      questions: [
        { q: "Why did he ﷺ keep looking to the sky?", a: "Hoping the qiblah would change", wrong: ["Watching the weather", "Counting stars", "Looking for birds"], why: "Quran 2:144." },
        { q: "Which way do Muslims face in prayer since 2:144?", a: "The Ka'bah in Makkah", wrong: ["The sunrise", "Jerusalem", "Any way they like"], why: "Shatral-Masjidil-Haram." },
        { q: "Do Muslims everywhere face the same Ka'bah?", a: "Yes, wherever they are", wrong: ["No, only in Makkah", "Only on Friday", "Only in Ramadan"], why: "Wa haythu ma kuntum." }
      ]
    },
    {
      slug: "quba-turn",
      title: "Turning mid-prayer",
      line: "People at Quba heard the news and turned during their prayer.",
      facts: ["Sahih al-Bukhari 4488", "Obeying at once"],
      quote: q2(144),
      source: hadith("bukhari", "4488", "Ibn Umar", "Sahih", "While people were praying Fajr in the Quba mosque, someone came and said Allah had revealed that they should face the Ka'bah, so they turned toward the Ka'bah."),
      difficulty: 2,
      questions: [
        { q: "Where were the people praying Fajr?", a: "The Quba mosque", wrong: ["In Makkah", "In Taif", "In Jerusalem"], why: "Bukhari 4488." },
        { q: "What did they do when they heard?", a: "Turned to the Ka'bah at once", wrong: ["Waited a year", "Argued", "Left the masjid"], why: "They obeyed right away." },
        { q: "What does their turning teach?", a: "Obey Allah quickly", wrong: ["Delay obeying", "Ask many questions first", "Ignore news"], why: "Unlike the people of the cow." }
      ]
    },
    {
      slug: "race-good",
      title: "Race to good",
      line: "Everyone faces some direction, so race each other to good.",
      facts: ["Fastabiqul-khayrat", "Allah gathers all"],
      quote: q2(148),
      source: ik(148, "Every nation has a direction it faces, so hasten to good deeds. Wherever you are, Allah will bring you all together; Allah is able to do all things."),
      difficulty: 2,
      questions: [
        { q: "What does 'fastabiqul-khayrat' mean?", a: "Race to good deeds", wrong: ["Race to be rich", "Run away", "Win every game"], why: "Quran 2:148." },
        { q: "What will Allah do wherever we are?", a: "Bring us all together", wrong: ["Forget us", "Leave us", "Split us forever"], why: "On the Day of Resurrection." },
        { q: "Your friend gave charity first. What fits 2:148?", a: "Be happy and race to do good too", wrong: ["Feel jealous", "Stop giving", "Mock them"], why: "A good kind of competition." }
      ]
    },
    {
      slug: "remember-me",
      title: "Remember Me",
      line: "Remember Me and I will remember you; be grateful.",
      facts: ["Sahih al-Bukhari 7405", "Allah draws near"],
      quote: q2(152),
      source: hadith("bukhari", "7405", "Abu Hurairah", "Sahih", "Allah says: I am as My servant thinks of Me, and I am with him when he remembers Me. If he remembers Me in himself, I remember him in Myself; if in a gathering, I remember him in a better gathering."),
      difficulty: 2,
      questions: [
        { q: "What does Allah promise in 2:152?", a: "Remember Me, I will remember you", wrong: ["Pay Me, I pay you", "Forget Me", "Wait for Me"], why: "Fadhkuruni adhkurkum." },
        { q: "If you remember Allah in a gathering, He...", a: "Remembers you in a better gathering", wrong: ["Ignores it", "Forgets you", "Waits a year"], why: "Bukhari 7405." },
        { q: "What else does 2:152 ask of us?", a: "Be grateful, not ungrateful", wrong: ["Be loud", "Be rich", "Be famous"], why: "Washkuru li wa la takfurun." }
      ]
    },
    {
      slug: "with-patient",
      title: "Allah is with the patient",
      line: "Seek help in patience and prayer; Allah is with the patient.",
      facts: ["Sahih Muslim 2999", "Good in every state"],
      quote: q2(153),
      source: hadith("muslim", "2999", "Suhaib", "Sahih", "How wonderful is the believer's affair: all of it is good. If something good comes, he is grateful, and that is good for him; if a hardship comes, he is patient, and that is good for him."),
      difficulty: 2,
      questions: [
        { q: "Who is Allah with, in 2:153?", a: "The patient", wrong: ["The proud", "The loud", "The lazy"], why: "Innallaha ma'as-sabirin." },
        { q: "What should a believer do when good comes, in Muslim 2999?", a: "Be grateful", wrong: ["Boast", "Hide it", "Waste it"], why: "Gratitude is good for him." },
        { q: "And when hardship comes?", a: "Be patient", wrong: ["Give up", "Complain to everyone", "Stop praying"], why: "Patience is good for him." }
      ]
    },
    {
      slug: "alive",
      title: "They are alive",
      line: "Don't call those who die in Allah's way dead: they are alive.",
      facts: ["Alive with their Lord", "We cannot perceive it"],
      quote: q2(154),
      source: ik(154, "Allah said do not say about those who die in His way that they are dead; rather they are alive, given provision with their Lord, but you do not perceive it."),
      difficulty: 3,
      questions: [
        { q: "What does 2:154 say about those who die in Allah's way?", a: "They are alive", wrong: ["They are forgotten", "They are lost", "They are asleep forever"], why: "Bal ahya'." },
        { q: "Can we see their life?", a: "No, we do not perceive it", wrong: ["Yes, always", "Only at night", "Only scholars can"], why: "Wa lakin la tash'urun." },
        { q: "Their life is with their Lord, not on this earth.", tf: true, why: "Ibn Kathir explains it." }
      ]
    },
    {
      slug: "tests",
      title: "We will test you",
      line: "We are tested with fear, hunger and loss; the patient win.",
      facts: ["Tests are certain", "Patience wins"],
      quote: q2(155),
      source: ik(155, "Allah tells us He will test His servants with some fear and hunger, and loss of wealth, lives and fruits; whoever is patient is rewarded, and whoever despairs is not."),
      difficulty: 2,
      questions: [
        { q: "Which of these is a test named in 2:155?", a: "Hunger", wrong: ["Too much sleep", "Long holidays", "Too many friends"], why: "Fear, hunger, loss of wealth, lives and fruits." },
        { q: "Who gets good news in 2:155?", a: "The patient", wrong: ["The richest", "The fastest", "The tallest"], why: "Wa bashshiris-sabirin." },
        { q: "Being tested means Allah does not love you.", tf: false, why: "Tests come to everyone, to raise the patient." }
      ]
    },
    {
      slug: "inna-lillah",
      title: "To Allah we belong",
      line: "In loss, say: to Allah we belong, and to Him we return.",
      facts: ["Sahih Muslim 918a", "Umm Salamah's story"],
      quote: q2(156),
      source: hadith("muslim", "918a", "Umm Salamah", "Sahih", "Any Muslim struck by a calamity who says what Allah commanded, 'to Allah we belong and to Him we return; O Allah, reward me in my loss and give me better', Allah gives him better. When Abu Salamah died she said it, and Allah gave her the Messenger of Allah ﷺ."),
      difficulty: 2,
      questions: [
        { q: "What do the patient say in hardship, in 2:156?", a: "To Allah we belong and to Him we return", wrong: ["It's not fair", "Why me?", "I give up"], why: "Inna lillahi wa inna ilayhi raji'un." },
        { q: "What did Umm Salamah get after saying the dua?", a: "Someone better: the Prophet ﷺ as husband", wrong: ["Nothing", "Gold", "A palace"], why: "Muslim 918a." },
        { q: "What is added to the dua in Muslim 918a?", a: "O Allah, reward me and give me better", wrong: ["Take everything", "Make me famous", "Punish others"], why: "Allahumma'jurni fi musibati." }
      ]
    },
    {
      slug: "safa-marwah",
      title: "Safa and Marwah",
      line: "Safa and Marwah are among the signs of Allah.",
      facts: ["Hajar ran between them", "Aishah taught Urwah"],
      quote: q2(158),
      source: hadith("bukhari", "1643", "Aishah", "Sahih", "Urwah thought 2:158 meant walking between Safa and Marwah could be skipped. Aishah said: no, my nephew; the ayah came because some Ansar felt unsure about it, and the Messenger of Allah ﷺ made the walk between them a practice."),
      difficulty: 3,
      questions: [
        { q: "What are Safa and Marwah, in 2:158?", a: "Signs of Allah", wrong: ["Two rivers", "Two cities", "Two palaces"], why: "Min sha'a'irillah." },
        { q: "Who corrected Urwah's understanding of 2:158?", a: "Aishah", wrong: ["Abu Jahl", "Abu Lahab", "Fir'awn"], why: "Bukhari 1643." },
        { q: "Which mother ran between Safa and Marwah looking for water?", a: "Hajar, mother of Isma'il", wrong: ["Maryam", "Asiyah", "Sarah"], why: "Pilgrims walk where she walked." }
      ]
    },
    {
      slug: "hiding-truth",
      title: "Hiding the clear signs",
      line: "Hiding Allah's guidance is a great sin, unless one repents.",
      facts: ["Repent, reform, make clear", "Allah accepts tawbah"],
      quote: q2(160),
      source: ik(159, "Those who hide the clear proofs and guidance Allah revealed are cursed, except those who repent, correct themselves and make the truth clear; Allah accepts their repentance, He is the Most Merciful."),
      difficulty: 3,
      questions: [
        { q: "What is the sin in 2:159?", a: "Hiding Allah's clear guidance", wrong: ["Teaching it", "Writing it down", "Sharing it"], why: "Quran 2:159." },
        { q: "What three things save them, in 2:160?", a: "Repent, reform, make it clear", wrong: ["Hide it better", "Move away", "Stay silent"], why: "Illal-ladhina tabu wa aslahu wa bayyanu." },
        { q: "Allah accepts repentance even after a big sin.", tf: true, why: "At-Tawwab ar-Rahim." }
      ]
    },
    {
      slug: "one-god",
      title: "Your God is One",
      line: "Your God is One God; none is worshipped but Him, the Merciful.",
      facts: ["Ar-Rahman, Ar-Rahim", "Tawhid"],
      quote: q2(163),
      source: ik(163, "Allah tells us He is One with no partner and no equal; He is the One God, there is no god but Him, Ar-Rahman, Ar-Rahim."),
      difficulty: 1,
      questions: [
        { q: "How many gods does 2:163 say there are?", a: "One God", wrong: ["Two", "Three", "Many"], why: "Wa ilahukum ilahun wahid." },
        { q: "Which two names of Allah end 2:163?", a: "Ar-Rahman, Ar-Rahim", wrong: ["Al-Malik, Al-Quddus", "Al-Ghafur, Al-Wadud", "As-Sami', Al-Basir"], why: "The Most Merciful, the Especially Merciful." },
        { q: "Is anyone else worthy of worship?", a: "No one", wrong: ["Angels", "Prophets", "Saints"], why: "La ilaha illa huwa." }
      ]
    },
    {
      slug: "signs",
      title: "Signs for those who think",
      line: "Sky, earth, night, day, ships, rain: signs for thinking people.",
      facts: ["Winds and clouds", "Look and reflect"],
      quote: q2(164),
      source: ik(164, "In the creation of the heavens and earth, the alternation of night and day, ships sailing the sea, rain that revives the earth, animals spread on it, the winds and the clouds, are signs for people who reason."),
      difficulty: 2,
      questions: [
        { q: "Which is named as a sign in 2:164?", a: "Ships sailing the sea", wrong: ["Cars", "Planes", "Phones"], why: "Quran 2:164." },
        { q: "Who benefits from these signs?", a: "People who reason", wrong: ["People who sleep", "People who never look", "Nobody"], why: "Li-qawmin ya'qilun." },
        { q: "Watching clouds and rain can be worship when you reflect.", tf: true, why: "They point to the Creator." }
      ]
    },
    {
      slug: "love-allah",
      title: "Love Allah most",
      line: "Some love idols like they love Allah; believers love Allah more.",
      facts: ["Love that leads to obeying", "Leaders will disown"],
      quote: q2(165),
      source: ik(165, "Some people take rivals besides Allah and love them as they love Allah; but the believers are stronger in their love for Allah. On that Day the leaders will disown their followers."),
      difficulty: 3,
      questions: [
        { q: "Who loves Allah the most, in 2:165?", a: "The believers", wrong: ["The idol makers", "The leaders", "Nobody"], why: "Wal-ladhina amanu ashaddu hubban lillah." },
        { q: "What will leaders do to their followers, in 2:166?", a: "Disown them", wrong: ["Save them", "Pay them", "Thank them"], why: "Quran 2:166." },
        { q: "Whom should we love most?", a: "Allah", wrong: ["Our phones", "Famous people", "Money"], why: "Then His Messenger ﷺ, then others for His sake." }
      ]
    },
    {
      slug: "halal-tayyib",
      title: "Halal and good",
      line: "Eat what is halal and good; don't follow Shaytan's footsteps.",
      facts: ["Sahih Muslim 1015", "Halal food, answered dua"],
      quote: q2(168),
      source: hadith("muslim", "1015", "Abu Hurairah", "Sahih", "Allah is Good and accepts only what is good. He mentioned a traveler, dusty and disheveled, raising his hands: O Lord, O Lord, while his food, drink and clothing are haram; so how can he be answered?"),
      difficulty: 2,
      questions: [
        { q: "What food does 2:168 tell people to eat?", a: "Halal and good", wrong: ["Anything at all", "Only meat", "Only bread"], why: "Halalan tayyiba." },
        { q: "Whose footsteps should we not follow?", a: "Shaytan's", wrong: ["The prophets'", "Our teachers'", "Good friends'"], why: "Quran 2:168." },
        { q: "What can stop a dua being answered, in Muslim 1015?", a: "Haram food and clothing", wrong: ["Short hair", "A long trip", "Asking twice"], why: "Allah accepts only what is good." }
      ]
    },
    {
      slug: "fathers-way",
      title: "'Our fathers did it'",
      line: "We follow our fathers, they say, even if fathers were misguided.",
      facts: ["Follow proof, not habit", "Think for yourself"],
      quote: q2(170),
      source: ik(170, "When told to follow what Allah revealed, they say: we follow what we found our fathers doing. Even if their fathers understood nothing and had no guidance?"),
      difficulty: 2,
      questions: [
        { q: "What excuse do they give in 2:170?", a: "We follow our fathers", wrong: ["We are tired", "We are hungry", "We are busy"], why: "Quran 2:170." },
        { q: "What does Allah ask about those fathers?", a: "What if they had no guidance?", wrong: ["Were they rich?", "Were they tall?", "Were they famous?"], why: "Even if they understood nothing?" },
        { q: "What should decide what we follow?", a: "What Allah revealed", wrong: ["Old habits only", "What is popular", "Whatever is easy"], why: "Revelation over habit." }
      ]
    },
    {
      slug: "good-and-thanks",
      title: "Eat and give thanks",
      line: "Believers, eat the good things We gave you, and thank Allah.",
      facts: ["Food is His gift", "Thank Him"],
      quote: q2(172),
      source: ik(172, "Allah commands the believers to eat from the good, lawful things He provided and to thank Him for it, if it is Him they worship."),
      difficulty: 1,
      questions: [
        { q: "What does 2:172 ask after eating good things?", a: "Thank Allah", wrong: ["Sleep", "Complain", "Waste the rest"], why: "Washkuru lillah." },
        { q: "Who gave us our food?", a: "Allah", wrong: ["Only the shop", "Luck", "Nobody"], why: "Min tayyibati ma razaqnakum." },
        { q: "Saying alhamdulillah after eating fits 2:172.", tf: true, why: "Thanking Allah for food." }
      ]
    },
    {
      slug: "forbidden-food",
      title: "What is forbidden",
      line: "Forbidden: carrion, blood, pork, and food offered to idols.",
      facts: ["Necessity is excused", "Allah is Forgiving"],
      quote: q2(173),
      source: ik(173, "Allah forbade dead animals, blood, the flesh of swine, and what is offered to other than Allah. Whoever is forced by need, not wanting it and not going beyond need, has no sin."),
      difficulty: 2,
      questions: [
        { q: "Which of these does 2:173 forbid?", a: "Pork", wrong: ["Dates", "Milk", "Honey"], why: "The flesh of swine." },
        { q: "What if a person is forced by hunger, with nothing else?", a: "No sin, taking only what is needed", wrong: ["Still a big sin", "Eat as much as you like", "Must starve"], why: "Quran 2:173." },
        { q: "Food offered to an idol is halal.", tf: false, why: "Offered to other than Allah is forbidden." }
      ]
    },
    {
      slug: "small-price",
      title: "Selling for a small price",
      line: "Hiding the truth for a small price is a terrible trade.",
      facts: ["Truth over money", "Allah won't speak to them"],
      quote: q2(174),
      source: ik(174, "Those who hide what Allah revealed of the Book and sell it for a small price eat nothing but fire into their bellies; Allah will not speak to them on the Day of Resurrection or purify them."),
      difficulty: 3,
      questions: [
        { q: "For what did they hide the truth, in 2:174?", a: "A small worldly price", wrong: ["To protect people", "By mistake", "For Allah"], why: "Thamanan qalila." },
        { q: "What does Allah not do with them on that Day?", a: "Speak to them or purify them", wrong: ["Count them", "See them", "Gather them"], why: "Quran 2:174." },
        { q: "Telling the truth is better than money.", tf: true, why: "The lesson of 2:174." }
      ]
    }
  ]
};

/** Ayahs 177 to 286: true goodness, fasting, Hajj, spending, Talut, Ayat al-Kursi, debts and the closing duas. */
const BAQARAH_THREE: DeepUnit = {
  key: "baqarah3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-baqarah",
  name: "Al-Baqarah, ayahs 177 to 286",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Baqarah",
  lessons: [
    {
      slug: "birr",
      title: "What true goodness is",
      line: "Goodness is not facing east or west, but faith and giving.",
      facts: ["Faith, charity, prayer", "Keeping promises, patience"],
      quote: q2(177),
      source: ik(177, "Righteousness is not turning your faces east or west; it is believing in Allah, the Last Day, the angels, the Book and the prophets, giving wealth to relatives, orphans, the poor and travelers, praying, giving zakah, keeping promises and being patient."),
      difficulty: 3,
      questions: [
        { q: "What does 2:177 say true goodness is NOT?", a: "Just facing east or west", wrong: ["Believing in Allah", "Giving charity", "Being patient"], why: "It is faith and deeds." },
        { q: "Which of these is part of 'birr' in 2:177?", a: "Keeping your promises", wrong: ["Winning arguments", "Wearing new clothes", "Being famous"], why: "Those who fulfill their promise." },
        { q: "Goodness is both belief and action.", tf: true, why: "Faith, then giving, prayer and patience." }
      ]
    },
    {
      slug: "life-in-justice",
      title: "Life in justice",
      line: "In fair justice there is life, and forgiving is better still.",
      facts: ["Justice protects lives", "Forgiveness is a mercy"],
      quote: q2(179),
      source: ik(179, "Allah made equal justice a law so that people hold back from harming one another, which protects lives; and He allowed the victim's family to forgive, a lightening and a mercy from your Lord."),
      difficulty: 4,
      questions: [
        { q: "What does 2:179 say is found in fair justice?", a: "Life", wrong: ["Wealth", "Fame", "Sleep"], why: "Fil-qisasi hayah." },
        { q: "How does justice protect life?", a: "People hold back from harming others", wrong: ["It makes people rich", "It stops the rain", "It ends all work"], why: "Ibn Kathir explains it." },
        { q: "What does 2:178 call the family's choice to forgive?", a: "A mercy from your Lord", wrong: ["A weakness", "A crime", "A mistake"], why: "Takhfifun min rabbikum wa rahmah." }
      ]
    },
    {
      slug: "fasting-written",
      title: "Fasting is prescribed",
      line: "Fasting was written for you as for those before you.",
      facts: ["So you gain taqwa", "Not new to Islam"],
      quote: q2(183),
      source: ik(183, "Allah addresses the believers and commands them to fast, as it was prescribed for the nations before them, so that they may gain taqwa, purifying the body and soul."),
      difficulty: 1,
      questions: [
        { q: "Who fasted before the Muslims, says 2:183?", a: "Nations before them", wrong: ["Nobody ever", "Only angels", "Only animals"], why: "Kama kutiba 'alal-ladhina min qablikum." },
        { q: "Why do we fast, in 2:183?", a: "To gain taqwa", wrong: ["To lose weight only", "To save money", "To sleep more"], why: "La'allakum tattaqun." },
        { q: "Fasting trains the heart, not just the stomach.", tf: true, why: "It builds taqwa." }
      ]
    },
    {
      slug: "sick-traveler",
      title: "Ease for the sick",
      line: "The sick or traveling can make up the days later.",
      facts: ["Allah wants ease", "Make up later"],
      quote: q2(184),
      source: ik(184, "Fasting is for a counted number of days. Whoever is sick or on a journey may break the fast and make up the same number of days later."),
      difficulty: 2,
      questions: [
        { q: "What can a sick person do in Ramadan, in 2:184?", a: "Make up the days later", wrong: ["Never fast again", "Pay a fine only", "Fast twice as long"], why: "Fa'iddatun min ayyamin ukhar." },
        { q: "Who else may break the fast?", a: "A traveler", wrong: ["A busy student", "Someone bored", "A sports fan"], why: "Aw 'ala safar." },
        { q: "Fasting is for how many days, in 2:184?", a: "A counted number of days", wrong: ["All year", "Only one day", "As many as you like"], why: "Ayyaman ma'dudat." }
      ]
    },
    {
      slug: "ramadan-quran",
      title: "The month of the Quran",
      line: "Ramadan is the month the Quran was sent down; Allah wants ease.",
      facts: ["Guidance and criterion", "Say Allahu akbar"],
      quote: q2(185),
      source: ik(185, "Allah praised Ramadan above other months by choosing it to send down the Quran. He wants ease for you, not hardship, and that you complete the days and glorify Him for guiding you."),
      difficulty: 1,
      questions: [
        { q: "What was sent down in Ramadan, in 2:185?", a: "The Quran", wrong: ["The Tawrah only", "Rain", "Gold"], why: "Shahru Ramadanal-ladhi unzila fihil-Quran." },
        { q: "What does Allah want for us, in 2:185?", a: "Ease, not hardship", wrong: ["Hardship", "Hunger forever", "Sadness"], why: "Yuridullahu bikumul-yusr." },
        { q: "What do we do after completing the days?", a: "Glorify Allah (takbir)", wrong: ["Forget Him", "Stay silent", "Sleep all Eid"], why: "Wa litukabbirullah." }
      ]
    },
    {
      slug: "i-am-near",
      title: "I am near",
      line: "When My servants ask about Me: I am near, I answer.",
      facts: ["Ask Him directly", "Respond to Him"],
      quote: q2(186),
      source: ik(186, "When My servants ask you about Me, I am near; I answer the call of the caller when he calls on Me. So let them respond to Me and believe in Me, that they may be guided. No one's dua is wasted."),
      difficulty: 1,
      questions: [
        { q: "How close is Allah to one who calls Him, in 2:186?", a: "Near", wrong: ["Far away", "Too busy", "Unreachable"], why: "Fa inni qarib." },
        { q: "Do we need a go-between to ask Allah?", a: "No, ask Him directly", wrong: ["Yes, always", "Only through a king", "Only once a year"], why: "I answer the caller." },
        { q: "What does Allah ask of us in return?", a: "Respond to Him and believe", wrong: ["Pay Him", "Forget Him", "Ask nothing"], why: "Falyastajibu li walyu'minu bi." }
      ]
    },
    {
      slug: "white-thread",
      title: "The white thread",
      line: "Eat and drink until dawn's white thread shows against the night.",
      facts: ["Sahih al-Bukhari 1916", "Adi's two threads"],
      quote: q2(187),
      source: hadith("bukhari", "1916", "Adi ibn Hatim", "Sahih", "When the ayah came, I put a white thread and a black thread under my pillow and looked at them all night. The Messenger of Allah ﷺ told me: it means the darkness of the night and the whiteness of the dawn."),
      difficulty: 2,
      questions: [
        { q: "Until when may a fasting person eat, in 2:187?", a: "Until dawn appears", wrong: ["Until noon", "All day", "Until Asr"], why: "The white thread from the black." },
        { q: "What did Adi put under his pillow?", a: "A white and a black thread", wrong: ["A Quran", "Dates", "A lamp"], why: "Bukhari 1916." },
        { q: "What do the threads really mean?", a: "Night's darkness and dawn's light", wrong: ["Real threads", "Two colors of clothes", "Day and month"], why: "As the Prophet ﷺ explained." }
      ]
    },
    {
      slug: "no-bribes",
      title: "No unjust wealth",
      line: "Don't eat each other's wealth unjustly or bribe judges.",
      facts: ["Honest earnings", "No bribes"],
      quote: q2(188),
      source: ik(188, "Do not consume one another's wealth unjustly, nor offer it to judges to take part of people's wealth sinfully while you know. A judge's ruling does not make wrong into right."),
      difficulty: 2,
      questions: [
        { q: "What does 2:188 forbid?", a: "Taking wealth unjustly", wrong: ["Trading", "Giving gifts", "Saving money"], why: "Quran 2:188." },
        { q: "Offering money to judges to win unfairly is...", a: "A bribe, forbidden", wrong: ["A gift", "Charity", "Fine"], why: "While you know it is wrong." },
        { q: "Copying someone's work and selling it as yours fits 2:188.", tf: false, why: "It is taking what is not yours." }
      ]
    },
    {
      slug: "crescents",
      title: "The new moons",
      line: "The new moons mark times for people and for Hajj.",
      facts: ["Islamic months by the moon", "Righteousness is taqwa"],
      quote: q2(189),
      source: ik(189, "They asked about the crescents. Say: they are signs marking times for people and for Hajj. Righteousness is not entering houses from the back, but having taqwa."),
      difficulty: 2,
      questions: [
        { q: "What are the new moons for, in 2:189?", a: "Marking times and Hajj", wrong: ["Luck", "Telling fortunes", "Decoration only"], why: "Mawaqitu lin-nasi wal-hajj." },
        { q: "How do Muslims know Ramadan starts?", a: "By the new moon", wrong: ["By the weather", "By the sun's heat", "By guessing"], why: "Lunar months." },
        { q: "What is true righteousness, in 2:189?", a: "Taqwa", wrong: ["Entering houses from the back", "Fancy doors", "Long names"], why: "Walakinnal-birra manittaqa." }
      ]
    },
    {
      slug: "no-transgress",
      title: "Do not go too far",
      line: "Even in battle, never cross the limits Allah set.",
      facts: ["Rules even in war", "No harming the innocent"],
      quote: q2(190),
      source: ik(190, "Fight those who fight you, but do not transgress. Ibn Kathir says this forbids mutilation, cheating, and harming women, children, the old, and monks."),
      difficulty: 4,
      questions: [
        { q: "What does Allah dislike, in 2:190?", a: "Those who transgress limits", wrong: ["Those who pray", "Those who forgive", "Those who are patient"], why: "Innallaha la yuhibbul-mu'tadin." },
        { q: "Who must never be harmed, says Ibn Kathir?", a: "Women, children and the old", wrong: ["Nobody is protected", "Only kings", "Only soldiers"], why: "Islam has rules even in war." },
        { q: "In Islam, even war has strict limits.", tf: true, why: "Quran 2:190." }
      ]
    },
    {
      slug: "ruin",
      title: "Don't throw yourselves into ruin",
      line: "Spend in Allah's way; don't throw yourselves into ruin.",
      facts: ["Abu Ayyub explained it", "Do good: ihsan"],
      quote: q2(195),
      source: hadith("abudawud", "2512", "Abu Ayyub", "Sahih", "Abu Ayyub said this ayah came about the Ansar: when Islam grew strong, they thought to stay home with their wealth and leave spending in Allah's way. Ruin was staying with their wealth and leaving the effort."),
      difficulty: 3,
      questions: [
        { q: "What does 2:195 tell us to do with wealth?", a: "Spend it in Allah's way", wrong: ["Hide it all", "Waste it", "Burn it"], why: "Wa anfiqu fi sabilillah." },
        { q: "What was the 'ruin', says Abu Ayyub?", a: "Clinging to wealth and leaving the effort", wrong: ["Spending too much", "Praying too much", "Fasting too much"], why: "Abu Dawud 2512." },
        { q: "How does 2:195 end?", a: "Do good: Allah loves the good-doers", wrong: ["Be rich", "Be loud", "Be first"], why: "Innallaha yuhibbul-muhsinin." }
      ]
    },
    {
      slug: "hajj-manners",
      title: "Manners of Hajj",
      line: "In Hajj: no rude talk, no sinning, no arguing.",
      facts: ["Taqwa: the best provision", "Known months"],
      quote: q2(197),
      source: ik(197, "Hajj is in well-known months. Whoever begins it must avoid obscene talk, sins and arguing. Take provision, and the best provision is taqwa."),
      difficulty: 2,
      questions: [
        { q: "Which of these is forbidden in Hajj, in 2:197?", a: "Arguing", wrong: ["Making dua", "Walking", "Drinking water"], why: "Wa la jidala fil-hajj." },
        { q: "What is the best provision, in 2:197?", a: "Taqwa", wrong: ["Gold", "Food only", "Fine clothes"], why: "Fa inna khayraz-zadit-taqwa." },
        { q: "Staying calm when crowds push fits 2:197.", tf: true, why: "No arguing in Hajj." }
      ]
    },
    {
      slug: "trade-hajj",
      title: "Trade during Hajj",
      line: "No sin in seeking Allah's bounty in trade during Hajj.",
      facts: ["Remember Him at Muzdalifah", "Halal trade"],
      quote: q2(198),
      source: ik(198, "Ibn Abbas said people felt unsure about trading in Hajj, so Allah revealed: there is no sin on you in seeking bounty from your Lord. Then remember Allah at al-Mash'ar al-Haram."),
      difficulty: 3,
      questions: [
        { q: "Is buying and selling during Hajj a sin, says 2:198?", a: "No, it is allowed", wrong: ["Yes, always", "Only on Fridays", "Only for kings"], why: "Laysa 'alaykum junah." },
        { q: "Where should pilgrims remember Allah after 'Arafat?", a: "Al-Mash'ar al-Haram", wrong: ["The market", "At home", "In Taif"], why: "At Muzdalifah." },
        { q: "Earning halal money can be part of a good life.", tf: true, why: "Seeking Allah's bounty." }
      ]
    },
    {
      slug: "both-worlds",
      title: "Good in both worlds",
      line: "Our Lord, give us good here and in the Hereafter.",
      facts: ["Rabbana atina", "His most frequent dua"],
      quote: q2(201),
      source: ik(201, "Some only ask for this world and have no share in the Hereafter. Others say: our Lord, give us good in this world and good in the Hereafter, and protect us from the Fire. Ibn Kathir says this dua gathers every good."),
      difficulty: 1,
      questions: [
        { q: "What does the dua in 2:201 ask for?", a: "Good in both worlds", wrong: ["Only money", "Only fame", "Only this world"], why: "Fid-dunya hasanah wa fil-akhirati hasanah." },
        { q: "What else does it ask protection from?", a: "The Fire", wrong: ["Rain", "Work", "Friends"], why: "Wa qina 'adhaban-nar." },
        { q: "Asking only for this world is the best dua.", tf: false, why: "Those people have no share in the Hereafter." }
      ]
    },
    {
      slug: "sweet-words",
      title: "Sweet words, bad deeds",
      line: "Some talk sweetly, but when given power, spread ruin.",
      facts: ["Watch deeds, not words", "Pride stops repentance"],
      quote: q2(205),
      source: ik(204, "Some people's speech pleases you and they swear by Allah, yet they are the worst in disputes; when they gain power they spread ruin, and when told to fear Allah, pride drives them to sin."),
      difficulty: 3,
      questions: [
        { q: "What gives this person away, in 2:204-205?", a: "His deeds, not his words", wrong: ["His clothes", "His voice", "His height"], why: "When he gains power he spreads ruin." },
        { q: "What happens when he is told 'fear Allah', in 2:206?", a: "Pride takes hold of him", wrong: ["He repents", "He thanks them", "He stays silent"], why: "Akhadhat-hul-'izzatu bil-ithm." },
        { q: "If someone reminds you to fear Allah, what fits?", a: "Accept it humbly", wrong: ["Get angry", "Mock them", "Ignore them"], why: "The opposite of 2:206." }
      ]
    },
    {
      slug: "fully-in",
      title: "Enter Islam fully",
      line: "Enter Islam completely; don't follow Shaytan's footsteps.",
      facts: ["All of Islam", "Shaytan is an enemy"],
      quote: q2(208),
      source: ik(208, "Allah commands the believers to enter Islam completely, practicing all its rulings as much as they can, and not to follow Shaytan, who is a clear enemy."),
      difficulty: 2,
      questions: [
        { q: "How should believers enter Islam, in 2:208?", a: "Completely", wrong: ["Halfway", "Only on Fridays", "Only in Ramadan"], why: "Udkhulu fis-silmi kaffah." },
        { q: "Whose footsteps does 2:208 warn against?", a: "Shaytan's", wrong: ["The prophets'", "Our parents'", "The scholars'"], why: "He is a clear enemy." },
        { q: "Practicing as much of Islam as we can fits 2:208.", tf: true, why: "Ibn Kathir explains it." }
      ]
    },
    {
      slug: "help-near",
      title: "Allah's help is near",
      line: "Did you think you'd enter Jannah without tests like theirs?",
      facts: ["Tests came before", "Help is near"],
      quote: q2(214),
      source: ik(214, "Do you think you will enter Jannah without being tested like those before you? They were shaken until the Messenger and the believers said: when is Allah's help? Surely, Allah's help is near."),
      difficulty: 2,
      questions: [
        { q: "What does 2:214 say came to those before us?", a: "Hard tests", wrong: ["Only ease", "Nothing", "Endless holidays"], why: "They were shaken." },
        { q: "What did the believers ask?", a: "When is Allah's help?", wrong: ["Where is the market?", "Who is king?", "Why pray?"], why: "Mata nasrullah?" },
        { q: "What is the answer at the end of 2:214?", a: "Allah's help is near", wrong: ["There is no help", "Wait forever", "Give up"], why: "Ala inna nasrallahi qarib." }
      ]
    },
    {
      slug: "spend-on",
      title: "Whom to spend on",
      line: "Spend on parents, relatives, orphans, the poor and travelers.",
      facts: ["Family first", "Allah knows every good"],
      quote: q2(215),
      source: ik(215, "They ask what to spend. Say: whatever good you spend is for parents, relatives, orphans, the poor and the stranded traveler; whatever good you do, Allah knows it."),
      difficulty: 1,
      questions: [
        { q: "Who comes first in 2:215?", a: "Parents", wrong: ["Strangers", "The rich", "Celebrities"], why: "Fa lil-walidayn." },
        { q: "Which of these is named in 2:215?", a: "The traveler in need", wrong: ["The richest man", "A famous singer", "A king"], why: "Ibnis-sabil." },
        { q: "Does Allah know even small good deeds?", a: "Yes, every one", wrong: ["Only big ones", "No", "Only public ones"], why: "Fa innallaha bihi 'alim." }
      ]
    },
    {
      slug: "dislike-good",
      title: "It may be good for you",
      line: "You may dislike a thing that is good for you.",
      facts: ["Allah knows, we don't", "Trust His plan"],
      quote: q2(216),
      source: ik(216, "Perhaps you dislike something while it is good for you, and like something while it is bad for you. Allah knows and you do not know."),
      difficulty: 1,
      questions: [
        { q: "What does 2:216 say about things we dislike?", a: "They may be good for us", wrong: ["They are always bad", "They never happen", "They are luck"], why: "'Asa an takrahu shay'an wa huwa khayrun lakum." },
        { q: "Who knows what is truly best?", a: "Allah", wrong: ["Only us", "Our phones", "Nobody"], why: "Wallahu ya'lamu wa antum la ta'lamun." },
        { q: "You missed the bus and met a friend who needed help. What fits 2:216?", a: "It may have been good for you", wrong: ["It was pure bad luck", "Allah forgot you", "Nothing happens for a reason"], why: "Trust Allah's plan." }
      ]
    },
    {
      slug: "wine-gambling",
      title: "Wine and gambling",
      line: "In wine and gambling the harm is greater than the benefit.",
      facts: ["Later fully forbidden", "Give the surplus"],
      quote: q2(219),
      source: ik(219, "They ask about wine and gambling. Say: in them is great sin and some benefit, but the sin is greater. This was a step; later Allah fully forbade them in Surat al-Ma'idah."),
      difficulty: 2,
      questions: [
        { q: "What does 2:219 say about wine and gambling?", a: "Their harm is greater than benefit", wrong: ["They are healthy", "They are fine in moderation", "They bring luck"], why: "Wa ithmuhuma akbaru min naf'ihima." },
        { q: "Where were they fully forbidden later?", a: "Surat al-Ma'idah", wrong: ["Surat al-Fatihah", "Surat al-Ikhlas", "They never were"], why: "Ibn Kathir explains the steps." },
        { q: "What should we spend, says 2:219?", a: "What is beyond our needs", wrong: ["Everything we have", "Nothing", "Only coins"], why: "Qulil-'afw." }
      ]
    },
    {
      slug: "orphans",
      title: "Caring for orphans",
      line: "Improving an orphan's affairs is best; they are your brothers.",
      facts: ["Honest care", "Allah knows intentions"],
      quote: q2(220),
      source: ik(220, "When the warning about orphans' wealth came, people feared even sharing food with them. Allah said: improving their affairs is best, and if you mix with them, they are your brothers."),
      difficulty: 2,
      questions: [
        { q: "What is best for orphans, in 2:220?", a: "Improving their affairs", wrong: ["Ignoring them", "Taking their money", "Sending them away"], why: "Islahun lahum khayr." },
        { q: "How does 2:220 describe orphans you live with?", a: "Your brothers", wrong: ["Strangers", "Servants", "Guests only"], why: "Fa ikhwanukum." },
        { q: "Allah knows who means harm and who means good.", tf: true, why: "Wallahu ya'lamul-mufsida minal-muslih." }
      ]
    },
    {
      slug: "oaths",
      title: "Don't swear away good",
      line: "Don't use Allah's name in oaths to avoid doing good.",
      facts: ["Careless oaths forgiven", "The heart counts"],
      quote: q2(224),
      source: ik(224, "Do not make your oaths by Allah an excuse to stop doing good, being dutiful and making peace between people. Allah does not hold you to careless oaths, but to what your hearts intend."),
      difficulty: 3,
      questions: [
        { q: "What does 2:224 warn against?", a: "Swearing not to do good", wrong: ["Doing good", "Making peace", "Being kind"], why: "Quran 2:224." },
        { q: "Which oaths does Allah not hold against us, in 2:225?", a: "Careless slips of the tongue", wrong: ["All oaths", "Oaths in court", "Promises to parents"], why: "Bil-laghwi fi aymanikum." },
        { q: "What does Allah hold us to?", a: "What our hearts intended", wrong: ["Nothing", "Only the words", "Only written oaths"], why: "Bima kasabat qulubukum." }
      ]
    },
    {
      slug: "nursing",
      title: "Two full years",
      line: "Mothers nurse their babies for two full years, if they wish.",
      facts: ["Father provides kindly", "No one burdened too much"],
      quote: q2(233),
      source: ik(233, "Mothers may nurse their children for two full years for whoever wishes to complete it, and the father provides their food and clothing kindly. No soul is burdened beyond its capacity."),
      difficulty: 2,
      questions: [
        { q: "How long is full nursing, in 2:233?", a: "Two years", wrong: ["Two months", "Ten years", "One week"], why: "Hawlayni kamilayn." },
        { q: "Who provides for the mother and baby?", a: "The father, with kindness", wrong: ["Nobody", "The neighbors", "The baby"], why: "Bil-ma'ruf." },
        { q: "Islam cares for babies and mothers.", tf: true, why: "No soul is burdened too much." }
      ]
    },
    {
      slug: "dont-forget-kindness",
      title: "Don't forget kindness",
      line: "Even when parting, do not forget kindness between you.",
      facts: ["Grace to each other", "Allah sees all"],
      quote: q2(237),
      source: ik(237, "Even when a marriage ends, Allah tells both sides: do not forget kindness and generosity between you; to forgive is nearer to taqwa."),
      difficulty: 2,
      questions: [
        { q: "What should people not forget, even when parting?", a: "Kindness between them", wrong: ["Their anger", "Their grudges", "Their arguments"], why: "Wa la tansawul-fadla baynakum." },
        { q: "What is nearer to taqwa, in 2:237?", a: "Forgiving", wrong: ["Arguing", "Taking more", "Shouting"], why: "Wa an ta'fu aqrabu lit-taqwa." },
        { q: "After a fight with a friend, what fits 2:237?", a: "Stay kind and forgive", wrong: ["Spread rumors", "Take revenge", "Never speak again"], why: "Do not forget kindness." }
      ]
    },
    {
      slug: "middle-prayer",
      title: "Guard the prayers",
      line: "Guard the prayers, especially the middle prayer, Asr.",
      facts: ["Sahih Muslim 628", "Stand humbly"],
      quote: q2(238),
      source: hadith("muslim", "628", "Abdullah ibn Mas'ud", "Sahih", "On the day of al-Ahzab, the enemy kept the Messenger of Allah ﷺ from the afternoon prayer until the sun turned red. He said: they kept us from the middle prayer, the Asr prayer."),
      difficulty: 2,
      questions: [
        { q: "What does 2:238 command?", a: "Guard the prayers", wrong: ["Skip some prayers", "Pray once a week", "Pray only in Ramadan"], why: "Hafizu 'alas-salawat." },
        { q: "Which prayer did he ﷺ call the middle prayer?", a: "Asr", wrong: ["Fajr only", "A night prayer", "Eid prayer"], why: "Muslim 628." },
        { q: "How should we stand in prayer, in 2:238?", a: "Humbly, devoted to Allah", wrong: ["Rushing", "Talking", "Looking around"], why: "Wa qumu lillahi qanitin." }
      ]
    },
    {
      slug: "pray-anyway",
      title: "Pray even in fear",
      line: "If afraid, pray walking or riding; prayer is never dropped.",
      facts: ["Prayer in every state", "Remember Allah after"],
      quote: q2(239),
      source: ik(239, "If you fear an enemy, pray on foot or riding, however you can; when you are safe again, remember Allah as He taught you. Prayer is never dropped while one is able."),
      difficulty: 2,
      questions: [
        { q: "How can someone in danger pray, in 2:239?", a: "Walking or riding", wrong: ["Not at all", "Only later", "Only at home"], why: "Fa rijalan aw rukbana." },
        { q: "Is the prayer dropped in hard times?", a: "No, it is done as one can", wrong: ["Yes, always", "Yes, for a year", "Only on trips"], why: "Ibn Kathir explains it." },
        { q: "Even sick in bed, a Muslim prays as they can.", tf: true, why: "Prayer adjusts; it is not dropped." }
      ]
    },
    {
      slug: "goodly-loan",
      title: "A goodly loan",
      line: "Who will lend Allah a good loan, which He multiplies many times?",
      facts: ["Charity is a loan to Allah", "He returns it many times"],
      quote: q2(245),
      source: ik(245, "Allah encourages spending in His cause: who will lend Allah a goodly loan so He multiplies it many times? Allah withholds and gives abundantly, and to Him you return."),
      difficulty: 2,
      questions: [
        { q: "What does 2:245 call spending for Allah?", a: "A goodly loan", wrong: ["A tax", "A waste", "A fine"], why: "Qardan hasana." },
        { q: "What does Allah do with it?", a: "Multiplies it many times", wrong: ["Loses it", "Keeps it the same", "Returns half"], why: "Ad'afan kathirah." },
        { q: "Who gives and withholds provision?", a: "Allah", wrong: ["Luck", "Banks", "Nobody"], why: "Wallahu yaqbidu wa yabsut." }
      ]
    },
    {
      slug: "talut",
      title: "Talut the king",
      line: "Allah chose Talut as king for his knowledge and strength.",
      facts: ["Not chosen for wealth", "A sign: the Ark"],
      quote: q2(247),
      source: ik(247, "The Children of Israel asked their prophet for a king. Allah chose Talut; they objected that he was not rich. Their prophet said: Allah chose him and gave him more knowledge and strength."),
      difficulty: 3,
      questions: [
        { q: "Why did Allah choose Talut, in 2:247?", a: "Knowledge and strength", wrong: ["His wealth", "His fame", "His family name"], why: "Bastatan fil-'ilmi wal-jism." },
        { q: "What did the people object to?", a: "He was not rich", wrong: ["He was too tall", "He was too young", "He could not read"], why: "Quran 2:247." },
        { q: "Good leaders are chosen for wealth.", tf: false, why: "Knowledge and strength matter more." }
      ]
    },
    {
      slug: "river-test",
      title: "The river test",
      line: "Talut's army was tested by a river; few held back.",
      facts: ["Only a handful allowed", "Small groups can win"],
      quote: q2(249),
      source: ik(249, "Talut said: Allah will test you with a river; whoever drinks from it is not with me, except a handful. Most drank; the few who obeyed said: how often a small group has beaten a large one by Allah's permission."),
      difficulty: 3,
      questions: [
        { q: "What was the test in 2:249?", a: "Not drinking from a river", wrong: ["Climbing a mountain", "Fasting a year", "Crossing a desert"], why: "Except a handful." },
        { q: "How many passed the test?", a: "Only a few", wrong: ["Everyone", "Nobody", "Most of them"], why: "Illa qalilan minhum." },
        { q: "What did the faithful few say?", a: "A small group can win by Allah's permission", wrong: ["Let's go home", "We are too few", "We need more water"], why: "Kam min fi'atin qalilah." }
      ]
    },
    {
      slug: "dawud-jalut",
      title: "Dawud and Jalut",
      line: "They prayed for patience, and young Dawud defeated Jalut.",
      facts: ["Rabbana afrigh 'alayna sabra", "Kingship and wisdom"],
      quote: q2(251),
      source: ik(251, "The believers prayed: our Lord, pour patience on us and make our feet firm. They defeated Jalut's army by Allah's permission; Dawud brought Jalut down, and Allah gave Dawud kingship and wisdom."),
      difficulty: 2,
      questions: [
        { q: "Who defeated Jalut, in 2:251?", a: "Dawud", wrong: ["Talut", "Musa", "Sulayman"], why: "Wa qatala Dawudu Jalut." },
        { q: "What did the believers pray for?", a: "Patience and firm feet", wrong: ["Gold", "More soldiers", "To go home"], why: "Rabbana afrigh 'alayna sabran." },
        { q: "What did Allah give Dawud?", a: "Kingship and wisdom", wrong: ["Nothing", "Only a sword", "Only wealth"], why: "Wa atahullahul-mulka wal-hikmah." }
      ]
    },
    {
      slug: "before-a-day",
      title: "Spend before that Day",
      line: "Spend now, before a Day with no trade and no friendship.",
      facts: ["Now is the time", "Only deeds then"],
      quote: q2(254),
      source: ik(254, "Allah commands the believers to spend from what He gave them before a Day comes when there is no buying, no friendship to help, and no intercession except by His permission."),
      difficulty: 2,
      questions: [
        { q: "What will be missing on that Day, in 2:254?", a: "Trade and friendship to help", wrong: ["The sun", "People", "Allah's knowledge"], why: "La bay'un fihi wa la khullah." },
        { q: "When should we spend in good?", a: "Now, in this life", wrong: ["After death", "Never", "Only when old"], why: "Min qabli an ya'tiya yawm." },
        { q: "Good deeds done now are saved for that Day.", tf: true, why: "Quran 2:254." }
      ]
    },
    {
      slug: "greatest-ayah",
      title: "The greatest ayah",
      line: "Ayat al-Kursi is the greatest ayah in Allah's Book.",
      facts: ["Sahih Muslim 810", "Ubayy's answer"],
      quote: q2(255),
      source: hadith("muslim", "810", "Ubayy ibn Ka'b", "Sahih", "The Messenger of Allah ﷺ asked: which ayah of Allah's Book is greatest? I said: Allah, there is no god but Him, the Ever-Living, the Sustainer. He patted my chest and said: may knowledge delight you."),
      difficulty: 1,
      questions: [
        { q: "Which is the greatest ayah, in Muslim 810?", a: "Ayat al-Kursi", wrong: ["The first ayah of Al-Fatihah", "The last ayah of the Quran", "2:1"], why: "Muslim 810." },
        { q: "Who answered correctly?", a: "Ubayy ibn Ka'b", wrong: ["Abu Jahl", "Abu Lahab", "Qarun"], why: "May knowledge delight you." },
        { q: "What are Allah's names at its start?", a: "Al-Hayy, Al-Qayyum", wrong: ["Al-Malik, Al-Quddus", "Al-Ghafur, Ash-Shakur", "Al-Wahhab, Ar-Razzaq"], why: "The Ever-Living, the Sustainer." }
      ]
    },
    {
      slug: "kursi-night",
      title: "Ayat al-Kursi at night",
      line: "Recite Ayat al-Kursi in bed and a guard stays with you.",
      facts: ["Sahih al-Bukhari 5010", "Protection till morning"],
      quote: q2(255),
      source: hadith("bukhari", "5010", "Abu Hurairah", "Sahih", "Abu Hurairah guarded the zakah food and caught a thief, who taught him: when you go to bed, recite Ayat al-Kursi, and a guard from Allah stays with you and no devil comes near till morning. The Prophet ﷺ said: he told you the truth, though he is a liar; that was a devil."),
      difficulty: 2,
      questions: [
        { q: "When should we recite Ayat al-Kursi, in Bukhari 5010?", a: "When going to bed", wrong: ["Only at Eid", "Only when eating", "Only in the car"], why: "A guard stays till morning." },
        { q: "Who taught it to Abu Hurairah in the story?", a: "A devil, who spoke the truth that time", wrong: ["An angel", "A king", "A child"], why: "He told you the truth, though he is a liar." },
        { q: "What does it bring until morning?", a: "Protection from Allah", wrong: ["Gold", "Bad dreams", "Nothing"], why: "Bukhari 5010." }
      ]
    },
    {
      slug: "no-compulsion",
      title: "No compulsion",
      line: "No compulsion in religion; truth stands clear from error.",
      facts: ["The firm handhold", "Faith must be chosen"],
      quote: q2(256),
      source: ik(256, "Do not force anyone to enter Islam, for its proofs are clear. Whoever rejects false gods and believes in Allah has grasped the firmest handhold that never breaks."),
      difficulty: 2,
      questions: [
        { q: "What does 2:256 say about forcing faith?", a: "No compulsion in religion", wrong: ["Force is fine", "Only force children", "Only on Fridays"], why: "La ikraha fid-din." },
        { q: "What has the believer grasped, in 2:256?", a: "The firmest handhold", wrong: ["A broken rope", "A sword", "A coin"], why: "Al-'urwatul-wuthqa." },
        { q: "True faith must come from the heart.", tf: true, why: "That is why there is no compulsion." }
      ]
    },
    {
      slug: "into-light",
      title: "Out of darkness into light",
      line: "Allah is the believers' Protector; He brings them into light.",
      facts: ["Darknesses, plural", "Light, one"],
      quote: q2(257),
      source: ik(257, "Allah is the Wali of the believers; He brings them out of darknesses into light. Ibn Kathir notes 'light' is one because truth is one, while falsehood has many kinds."),
      difficulty: 2,
      questions: [
        { q: "Who is the Protector (Wali) of the believers, in 2:257?", a: "Allah", wrong: ["Money", "Kings", "Stars"], why: "Allahu waliyyul-ladhina amanu." },
        { q: "Where does Allah bring them?", a: "Out of darkness into light", wrong: ["Into darkness", "Nowhere", "Into the sea"], why: "Minaz-zulumati ilan-nur." },
        { q: "Why is 'light' one but 'darknesses' many?", a: "Truth is one; falsehood has many kinds", wrong: ["A spelling mistake", "There are many truths", "No reason"], why: "Ibn Kathir explains it." }
      ]
    },
    {
      slug: "sun-from-east",
      title: "Ibrahim and the king",
      line: "Allah brings the sun from the east; bring it from the west.",
      facts: ["A clear proof", "The king was stunned"],
      quote: q2(258),
      source: ik(258, "A king argued with Ibrahim about his Lord. Ibrahim said: my Lord gives life and death. The king claimed he did too. Ibrahim said: Allah brings the sun from the east, so bring it from the west; the king was dumbfounded."),
      difficulty: 2,
      questions: [
        { q: "Who argued with Ibrahim about his Lord, in 2:258?", a: "A proud king", wrong: ["His son", "An angel", "A prophet"], why: "Because Allah had given him a kingdom." },
        { q: "What challenge silenced the king?", a: "Bring the sun from the west", wrong: ["Make it rain", "Count the stars", "Build a tower"], why: "Fa'ti biha minal-maghrib." },
        { q: "What does the story show?", a: "Only Allah controls creation", wrong: ["Kings control the sun", "Arguing is always bad", "The sun can stop"], why: "Clear proof silences falsehood." }
      ]
    },
    {
      slug: "hundred-years",
      title: "A hundred years",
      line: "A man wondered how a ruined town lives again; Allah showed him.",
      facts: ["Died for 100 years", "His food unchanged"],
      quote: q2(259),
      source: ik(259, "A man passed a ruined town and wondered how Allah would revive it. Allah caused him to die for a hundred years, then raised him; his food had not changed, and he watched his donkey's bones come together."),
      difficulty: 3,
      questions: [
        { q: "How long did the man stay dead, in 2:259?", a: "A hundred years", wrong: ["One day", "Ten years", "A week"], why: "Mi'ata 'am." },
        { q: "What had not changed when he woke?", a: "His food and drink", wrong: ["The town", "His donkey", "The trees"], why: "Lam yatasannah." },
        { q: "What did he say after seeing it?", a: "Allah is able to do all things", wrong: ["It was a dream", "I don't believe it", "Nothing"], why: "A'lamu annallaha 'ala kulli shay'in qadir." }
      ]
    },
    {
      slug: "four-birds",
      title: "Ibrahim and the four birds",
      line: "Ibrahim asked to see how Allah raises the dead: four birds came.",
      facts: ["To calm his heart", "They came flying"],
      quote: q2(260),
      source: ik(260, "Ibrahim asked: my Lord, show me how You give life to the dead. Allah said: do you not believe? He said: yes, but to reassure my heart. He took four birds, placed parts on hills, called them, and they came flying."),
      difficulty: 3,
      questions: [
        { q: "Why did Ibrahim ask, in 2:260?", a: "To reassure his heart", wrong: ["He doubted Allah", "For fun", "To test Allah"], why: "Walakin liyatma'inna qalbi." },
        { q: "How many birds were there?", a: "Four", wrong: ["Two", "Ten", "One"], why: "Arba'atan minat-tayr." },
        { q: "What happened when Ibrahim called them?", a: "They came flying to him", wrong: ["Nothing", "They ran away", "They stayed still"], why: "Ya'tinaka sa'ya." }
      ]
    },
    {
      slug: "seven-hundred",
      title: "One grain, seven hundred",
      line: "Spending for Allah is like a grain growing seven hundred grains.",
      facts: ["Seven ears, 100 each", "He multiplies more"],
      quote: q2(261),
      source: ik(261, "Those who spend in Allah's way are like a grain that grows seven ears, each with a hundred grains; Allah multiplies even more for whom He wills."),
      difficulty: 1,
      questions: [
        { q: "How many grains come from one, in 2:261?", a: "Seven hundred", wrong: ["Seven", "Ten", "Two"], why: "Seven ears, a hundred each." },
        { q: "Can Allah give even more?", a: "Yes, for whom He wills", wrong: ["No", "Only less", "Only the same"], why: "Wallahu yuda'ifu liman yasha'." },
        { q: "A small charity can grow huge with Allah.", tf: true, why: "Quran 2:261." }
      ]
    },
    {
      slug: "no-reminders",
      title: "Don't spoil your charity",
      line: "A kind word is better than charity followed by hurt.",
      facts: ["No reminding, no hurting", "Allah is Rich"],
      quote: q2(263),
      source: ik(263, "Kind words and forgiveness are better than charity followed by harm. Do not ruin your charity by reminding people of it or hurting them, like one who spends to show off."),
      difficulty: 2,
      questions: [
        { q: "What is better than charity followed by hurt, in 2:263?", a: "A kind word and forgiveness", wrong: ["More money", "Silence forever", "A loud speech"], why: "Qawlun ma'rufun wa maghfirah." },
        { q: "What spoils charity, in 2:264?", a: "Reminding and hurting", wrong: ["Giving secretly", "Smiling", "Giving a little"], why: "Bil-manni wal-adha." },
        { q: "You gave a friend money; later you keep reminding them. What fits 2:264?", a: "Stop: it spoils the reward", wrong: ["Remind them more", "Tell everyone", "Ask for double"], why: "Don't ruin your charity." }
      ]
    },
    {
      slug: "burnt-garden",
      title: "The burnt garden",
      line: "Would you like your garden burned when you are old and weak?",
      facts: ["Sahih al-Bukhari 4538", "Ibn Abbas explained"],
      quote: q2(266),
      source: hadith("bukhari", "4538", "Ubaid bin Umair", "Sahih", "Umar asked the Companions about 2:266. Ibn Abbas said it is a parable for deeds: a rich man who did good, then Allah sent Shaytan to him and he sinned until his good deeds were lost."),
      difficulty: 4,
      questions: [
        { q: "What does the garden stand for, says Ibn Abbas?", a: "A person's good deeds", wrong: ["Real farming", "Money in a bank", "A city"], why: "Bukhari 4538." },
        { q: "What lost the man his 'garden'?", a: "Sinning after doing good", wrong: ["Rain", "Old age only", "Bad soil"], why: "His good deeds were lost." },
        { q: "Keep doing good to the end of life.", tf: true, why: "Don't let sins burn your deeds." }
      ]
    },
    {
      slug: "give-good",
      title: "Give from the good",
      line: "Give from the good things you earn, not the worst you have.",
      facts: ["Only give what you'd take", "Allah is Rich"],
      quote: q2(267),
      source: ik(267, "Spend from the good things you have earned and that Allah brought from the earth; do not aim for the bad to give it, when you yourselves would not take it except with closed eyes."),
      difficulty: 1,
      questions: [
        { q: "What should we give, in 2:267?", a: "From the good things", wrong: ["Only broken things", "Only leftovers", "Nothing"], why: "Min tayyibati ma kasabtum." },
        { q: "Would you happily take what you give, if it were bad?", a: "No", wrong: ["Yes, gladly", "Only on Fridays", "Only if free"], why: "Except with closed eyes." },
        { q: "Giving a toy you still like fits 2:267.", tf: true, why: "Give from the good." }
      ]
    },
    {
      slug: "fear-poverty",
      title: "Shaytan threatens poverty",
      line: "Shaytan threatens you with poverty; Allah promises forgiveness.",
      facts: ["Don't fear giving", "Allah is generous"],
      quote: q2(268),
      source: ik(268, "Shaytan threatens you with poverty so you hold back from giving, and orders you to sin, while Allah promises forgiveness from Him and bounty."),
      difficulty: 2,
      questions: [
        { q: "What does Shaytan threaten us with, in 2:268?", a: "Poverty", wrong: ["Wealth", "Health", "Friends"], why: "Ya'idukumul-faqr." },
        { q: "What does Allah promise?", a: "Forgiveness and bounty", wrong: ["Poverty", "Nothing", "Sadness"], why: "Maghfiratan minhu wa fadla." },
        { q: "Why does Shaytan scare us about money?", a: "So we stop giving", wrong: ["To help us", "To make us rich", "No reason"], why: "Ibn Kathir explains it." }
      ]
    },
    {
      slug: "wisdom",
      title: "Given wisdom",
      line: "Whoever is given wisdom has been given much good.",
      facts: ["Hikmah is a gift", "Understanding the Quran"],
      quote: q2(269),
      source: ik(269, "Allah gives wisdom to whom He wills, and whoever is given wisdom has been given abundant good. Ibn Abbas said wisdom here is understanding the Quran."),
      difficulty: 2,
      questions: [
        { q: "What has someone with wisdom been given, in 2:269?", a: "Much good", wrong: ["Little", "Nothing", "Only trouble"], why: "Khayran kathira." },
        { q: "What did Ibn Abbas say wisdom means in 2:269?", a: "Understanding the Quran", wrong: ["Being old", "Being rich", "Being loud"], why: "Ibn Kathir reports it." },
        { q: "Who takes the lesson, says 2:269?", a: "People of understanding", wrong: ["Nobody", "Only kings", "Only children"], why: "Ulul-albab." }
      ]
    },
    {
      slug: "secret-charity",
      title: "Giving in secret",
      line: "Giving openly is good; giving in secret to the poor is better.",
      facts: ["Shaded on that Day", "Left hand doesn't know"],
      quote: q2(271),
      source: hadith("bukhari", "1423", "Abu Hurairah", "Sahih", "Seven will be shaded by Allah on the Day there is no shade but His, among them a man who gives charity so secretly that his left hand does not know what his right hand gave."),
      difficulty: 2,
      questions: [
        { q: "Which charity is better, in 2:271?", a: "Secret charity to the poor", wrong: ["Charity to show off", "No charity", "Only loud charity"], why: "Fahuwa khayrun lakum." },
        { q: "How secret is the charity in Bukhari 1423?", a: "The left hand doesn't know", wrong: ["Everyone hears", "Posted online", "Announced loudly"], why: "Bukhari 1423." },
        { q: "Giving openly is never allowed.", tf: false, why: "It is good; secret is better." }
      ]
    },
    {
      slug: "dont-beg",
      title: "The poor who don't ask",
      line: "Some poor people are too dignified to beg; look for them.",
      facts: ["Know them by signs", "Dignity in need"],
      quote: q2(273),
      source: ik(273, "Give to the poor who are held back in Allah's cause and cannot travel to earn. The unaware think them rich because they do not beg; you know them by their signs, and they do not ask people insistently."),
      difficulty: 2,
      questions: [
        { q: "Why do some think these poor are rich, in 2:273?", a: "They don't beg", wrong: ["They wear gold", "They shout", "They own palaces"], why: "Minat-ta'affuf." },
        { q: "How do we recognize them?", a: "By their signs", wrong: ["By loud asking", "We can't", "By their cars"], why: "Ta'rifuhum bisimahum." },
        { q: "What does 2:273 teach us to do?", a: "Look out for quiet people in need", wrong: ["Only help those who shout", "Help nobody", "Wait to be asked"], why: "Dignified people need help too." }
      ]
    },
    {
      slug: "riba",
      title: "Trade is allowed, riba is not",
      line: "Allah allowed trade and forbade riba, interest.",
      facts: ["Riba is forbidden", "Charity grows"],
      quote: q2(275),
      source: ik(275, "Those who take riba said trade is just like riba, but Allah permitted trade and forbade riba. Allah destroys riba and makes charity grow."),
      difficulty: 3,
      questions: [
        { q: "What did Allah allow and forbid, in 2:275?", a: "Allowed trade, forbade riba", wrong: ["Allowed riba, forbade trade", "Forbade both", "Allowed both"], why: "Wa ahallallahul-bay'a wa harramar-riba." },
        { q: "What does Allah make grow, in 2:276?", a: "Charity", wrong: ["Riba", "Greed", "Debt"], why: "Wa yurbis-sadaqat." },
        { q: "What does Allah wipe out, in 2:276?", a: "Riba", wrong: ["Charity", "Trade", "Savings"], why: "Yamhaqullahur-riba." }
      ]
    },
    {
      slug: "give-time",
      title: "Give the debtor time",
      line: "If a debtor is struggling, give him time; forgiving is better.",
      facts: ["Sahih Muslim 1563a", "Saved on that Day"],
      quote: q2(280),
      source: hadith("muslim", "1563a", "Abu Qatadah", "Sahih", "Abu Qatadah's debtor said he was hard up, and Abu Qatadah said: I heard the Messenger of Allah ﷺ say: whoever wishes Allah to save him from the distress of the Day of Resurrection, let him give time to a struggling debtor or forgive the debt."),
      difficulty: 2,
      questions: [
        { q: "What should we do if a debtor is struggling, in 2:280?", a: "Give him time", wrong: ["Shame him", "Take his home", "Add interest"], why: "Fanaziratun ila maysarah." },
        { q: "What is even better than waiting?", a: "Forgiving the debt", wrong: ["Doubling it", "Telling everyone", "Taking his car"], why: "Wa an tasaddaqu khayrun lakum." },
        { q: "What does Muslim 1563a promise the lender who gives time?", a: "Relief on the Day of Resurrection", wrong: ["More interest", "Nothing", "Fame"], why: "Saved from that Day's distress." }
      ]
    },
    {
      slug: "write-debts",
      title: "Write it down",
      line: "When you take a debt for a set time, write it down.",
      facts: ["The longest ayah", "Two witnesses"],
      quote: q2(282),
      source: ik(282, "The ayah of debts, the longest in the Quran, tells believers to write down a debt for a fixed term, with a fair writer and witnesses, so no one is wronged and no one forgets."),
      difficulty: 2,
      questions: [
        { q: "What does 2:282 tell us to do with debts?", a: "Write them down", wrong: ["Forget them", "Hide them", "Double them"], why: "Faktubuh." },
        { q: "What is special about 2:282?", a: "It is the longest ayah", wrong: ["It is the shortest", "It is the first", "It has no words"], why: "Ibn Kathir notes it." },
        { q: "Why write debts down?", a: "So no one is wronged or forgets", wrong: ["To shame people", "For fun", "To make it longer"], why: "Fairness for both sides." }
      ]
    },
    {
      slug: "what-you-hide",
      title: "What's in yourselves",
      line: "Whether you show or hide what's in you, Allah knows it.",
      facts: ["The Companions worried", "We hear and obey"],
      quote: q2(284),
      source: hadith("muslim", "126", "Ibn Abbas", "Sahih", "When 2:284 came, the Companions were deeply worried. The Prophet ﷺ told them: say, we hear and obey and submit. Then Allah revealed: Allah does not burden a soul beyond its capacity."),
      difficulty: 3,
      questions: [
        { q: "What does Allah know, in 2:284?", a: "What we show and what we hide", wrong: ["Only what we say", "Only what we write", "Nothing hidden"], why: "Quran 2:284." },
        { q: "What did he ﷺ tell the worried Companions to say?", a: "We hear and obey", wrong: ["We give up", "It's too hard", "Not us"], why: "Muslim 126." },
        { q: "What did Allah reveal after their obedience?", a: "No soul is burdened beyond its capacity", wrong: ["A harder rule", "Nothing", "A warning"], why: "La yukallifullahu nafsan illa wus'aha." }
      ]
    },
    {
      slug: "amana-rasul",
      title: "The Messenger ﷺ believed",
      line: "The Messenger ﷺ and the believers say: we hear and obey.",
      facts: ["Sahih al-Bukhari 5009", "Enough for the night"],
      quote: q2(285),
      source: hadith("bukhari", "5009", "Abu Mas'ud", "Sahih", "The Prophet ﷺ said: whoever recites the last two ayahs of Surat al-Baqarah at night, they will be enough for him."),
      difficulty: 1,
      questions: [
        { q: "What do the believers say, in 2:285?", a: "We hear and we obey", wrong: ["We hear and disobey", "Maybe later", "Not now"], why: "Sami'na wa ata'na." },
        { q: "What do the last two ayahs of Al-Baqarah give at night?", a: "They are enough for you", wrong: ["Nothing", "Bad dreams", "Hunger"], why: "Bukhari 5009." },
        { q: "Do the believers separate between Allah's messengers?", a: "No", wrong: ["Yes", "Sometimes", "Only two"], why: "La nufarriqu bayna ahadin min rusulih." }
      ]
    },
    {
      slug: "no-burden",
      title: "Not beyond your capacity",
      line: "Allah burdens no soul beyond what it can bear.",
      facts: ["Rabbana la tu'akhidhna", "Pardon, forgive, mercy"],
      quote: q2(286),
      source: ik(286, "Allah does not burden a soul beyond its capacity; it gets what good it earned and bears what evil it earned. Then the duas: do not hold us to account if we forget or err, pardon us, forgive us, have mercy on us."),
      difficulty: 1,
      questions: [
        { q: "What does Allah never do, in 2:286?", a: "Burden a soul beyond its capacity", wrong: ["Forgive", "Show mercy", "Listen to duas"], why: "La yukallifullahu nafsan illa wus'aha." },
        { q: "What do we ask if we forget or make a mistake?", a: "Don't hold it against us", wrong: ["Punish us more", "Ignore us", "Make it harder"], why: "Rabbana la tu'akhidhna in nasina aw akhta'na." },
        { q: "Which three things do we ask at the very end?", a: "Pardon, forgiveness and mercy", wrong: ["Gold, fame and power", "Sleep, food and play", "Nothing"], why: "Wa'fu 'anna waghfir lana warhamna." }
      ]
    }
  ]
};

export const BAQARAH_UNITS: readonly DeepUnit[] = [BAQARAH_ONE, BAQARAH_TWO, BAQARAH_THREE];
