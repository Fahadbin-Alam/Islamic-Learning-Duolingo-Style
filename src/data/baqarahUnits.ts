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

export const BAQARAH_UNITS: readonly DeepUnit[] = [BAQARAH_ONE];
