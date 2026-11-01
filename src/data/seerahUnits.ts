import { hadith, quran, quranQuote, type DeepUnit } from "./deepKit";

// The life of the Prophet ﷺ (the Seerah), in order, as new units at the end of the "Lives of the Prophets" topic.
// Every card is from the Quran or a hadith checked on sunnah.com (number and grade as sunnah.com gives them).
// Stories found only in weak reports, and anything the scholars differ on, are left out.

const EARLY: DeepUnit = {
  key: "seerah-early",
  topicId: "prophets",
  branchId: "seerah-early-life",
  branch: { title: "Seerah: the early years", description: "The Prophet ﷺ before revelation: his birth, his childhood, and his good name in Makkah." },
  name: "his ﷺ early years",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "monday",
      title: "Born on a Monday",
      line: "He ﷺ was born on a Monday, the day revelation began too.",
      facts: ["In Makkah", "On a Monday"],
      source: hadith("muslim", "1162", "Abu Qatadah", "Sahih", "Asked about fasting on Monday, the Prophet ﷺ said: that is the day I was born, and the day revelation was first sent to me."),
      difficulty: 1,
      questions: [
        { q: "On which day of the week was he ﷺ born?", a: "Monday", wrong: ["Friday", "Saturday", "Wednesday"], why: "He ﷺ said so when asked about fasting on Mondays." },
        { q: "What else happened on a Monday?", a: "Revelation first came to him", wrong: ["The Hijrah began", "Badr was fought", "Makkah was opened"], why: "Sahih Muslim 1162." },
        { q: "He ﷺ fasted on Mondays because it was the day he was born.", tf: true, why: "That was his answer when asked about it." }
      ]
    },
    {
      slug: "orphan",
      title: "An orphan given shelter",
      line: "He ﷺ grew up an orphan, and Allah gave him shelter.",
      facts: ["Quran 93:6", "Allah took care of him"],
      quote: quranQuote(93, 6),
      source: quran(93, 6, "Did He not find you an orphan and give you shelter?"),
      difficulty: 1,
      questions: [
        { q: "How did he ﷺ grow up, as Quran 93:6 says?", a: "As an orphan", wrong: ["As a prince", "As a rich trader", "In a far land"], why: "Did He not find you an orphan?" },
        { q: "Who gave the orphan ﷺ shelter?", a: "Allah", wrong: ["The Romans", "No one", "The Persians"], why: "And gave you shelter." },
        { q: "Allah reminds him ﷺ of his childhood to show His care.", tf: true, why: "Surah Ad-Duha is full of Allah's kindness to him." }
      ]
    },
    {
      slug: "chest",
      title: "His chest is washed",
      line: "As a boy, Jibril washed his heart ﷺ with Zamzam water.",
      facts: ["He was playing with boys", "A golden basin", "Zamzam water"],
      source: hadith("muslim", "162c", "Anas ibn Malik", "Sahih", "Jibril came to the Messenger of Allah ﷺ while he was playing with the boys, opened his chest, took a clot from his heart and said: that was Satan's share; then he washed it with Zamzam water in a golden basin and put it back."),
      difficulty: 2,
      questions: [
        { q: "What was he ﷺ doing when Jibril came?", a: "Playing with other boys", wrong: ["Praying in Hira", "Trading in Syria", "Herding camels"], why: "Sahih Muslim 162c." },
        { q: "What was his heart ﷺ washed with?", a: "Zamzam water", wrong: ["Rain water", "Milk", "River water"], why: "In a golden basin." },
        { q: "Anas said he saw the marks on his chest ﷺ.", tf: true, why: "Anas reported it himself." }
      ]
    },
    {
      slug: "shepherd",
      title: "A shepherd of Makkah",
      line: "He ﷺ looked after sheep, like every prophet before him.",
      facts: ["Every prophet herded sheep", "Paid a few qirats"],
      source: hadith("bukhari", "2262", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: Allah sent no prophet who did not herd sheep. They asked: you too? He said: yes, I herded sheep for the people of Makkah for some qirats."),
      difficulty: 1,
      questions: [
        { q: "What job did every prophet do?", a: "Herd sheep", wrong: ["Build ships", "Sell cloth", "Make swords"], why: "Allah sent no prophet who did not herd sheep." },
        { q: "Whose sheep did he ﷺ herd?", a: "The people of Makkah's", wrong: ["The king's", "Only his own", "The Romans'"], why: "For some qirats, a small pay." },
        { q: "He ﷺ was paid for his work as a shepherd.", tf: true, why: "He was paid a few qirats." }
      ]
    },
    {
      slug: "kabah-stones",
      title: "Building the Ka'bah",
      line: "Before prophethood, he ﷺ carried stones to rebuild the Ka'bah.",
      facts: ["With his uncle Al-Abbas", "Allah kept him modest"],
      source: hadith("bukhari", "1582", "Jabir ibn Abdullah", "Sahih", "When the Ka'bah was rebuilt, the Prophet ﷺ and Al-Abbas carried stones; when he took off his waist cloth he fell down, and asked for it back and covered himself."),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ carry when the Ka'bah was rebuilt?", a: "Stones", wrong: ["Water", "Wood", "Gold"], why: "Sahih al-Bukhari 1582." },
        { q: "Which uncle carried stones with him ﷺ?", a: "Al-Abbas", wrong: ["Abu Lahab", "Abu Jahl", "Hamzah"], why: "Jabir tells it." },
        { q: "Even as a young man, Allah protected his modesty ﷺ.", tf: true, why: "He fell when uncovered and asked for his cloth at once." }
      ]
    },
    {
      slug: "never-lied",
      title: "Never once a liar",
      line: "Even his enemies said he ﷺ had never told a lie.",
      facts: ["Abu Sufyan said it", "Before Islam too"],
      source: hadith("bukhari", "7", "Ibn Abbas", "Sahih", "Heraclius asked Abu Sufyan, then an enemy of Islam: did you ever accuse him of lying before he claimed prophethood? He said no. Does he break promises? No."),
      difficulty: 2,
      questions: [
        { q: "Who said he ﷺ had never lied, while still his enemy?", a: "Abu Sufyan", wrong: ["Abu Bakr", "Ali", "Bilal"], why: "He told it to Heraclius, the Roman emperor." },
        { q: "Did he ﷺ ever break his promises?", a: "No, never", wrong: ["Sometimes", "Only in war", "Only to enemies"], why: "Abu Sufyan had to say no." },
        { q: "Heraclius asked about him ﷺ to test if he was truthful.", tf: true, why: "One who never lies to people would not lie about Allah." }
      ]
    },
    {
      slug: "protected-uncle",
      title: "His uncle's protection",
      line: "Allah protected him ﷺ in Makkah through his uncle Abu Talib.",
      facts: ["Abu Talib, his uncle", "Seven first went public"],
      source: hadith("ibnmajah", "150", "Abdullah ibn Masud", "Hasan", "The first seven to show their Islam openly were the Messenger of Allah ﷺ, Abu Bakr, Ammar, his mother Sumayyah, Suhaib, Bilal and Al-Miqdad; Allah protected the Messenger ﷺ through his uncle Abu Talib."),
      difficulty: 2,
      questions: [
        { q: "Through whom did Allah protect him ﷺ in Makkah?", a: "His uncle Abu Talib", wrong: ["The king of Persia", "Abu Lahab", "The Romans"], why: "Sunan Ibn Majah 150." },
        { q: "How many people first showed their Islam openly?", a: "Seven", wrong: ["Two", "Forty", "One hundred"], why: "Abdullah ibn Mas'ud named them." },
        { q: "Bilal was one of the first seven to show Islam openly.", tf: true, why: "With Abu Bakr, Ammar, Sumayyah, Suhaib and Al-Miqdad." }
      ]
    }
  ]
};

const REVELATION: DeepUnit = {
  key: "seerah-wahy",
  topicId: "prophets",
  branchId: "seerah-revelation",
  branch: { title: "Seerah: the first revelation", description: "The cave of Hira, the first word Iqra, Waraqah's words, and how revelation came." },
  name: "the first revelation",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "dreams",
      title: "Dreams like daybreak",
      line: "Revelation began with true dreams, clear like the dawn.",
      facts: ["True dreams first", "Then he loved solitude"],
      source: hadith("bukhari", "3", "Aishah", "Sahih", "Revelation to the Messenger of Allah ﷺ began with good dreams that came true like the light of daybreak; then he came to love being alone."),
      difficulty: 1,
      questions: [
        { q: "How did revelation begin?", a: "With true dreams", wrong: ["With a loud voice", "With a book from the sky", "With a letter"], why: "They came true like the light of dawn." },
        { q: "What did he ﷺ come to love after the dreams?", a: "Being alone to worship", wrong: ["Trading trips", "Poetry contests", "Big feasts"], why: "Then seclusion was made dear to him." },
        { q: "The first dreams were unclear and hard to read.", tf: false, why: "They were clear, like the light of daybreak." }
      ]
    },
    {
      slug: "hira",
      title: "The cave of Hira",
      line: "He ﷺ would worship alone in Hira for many nights.",
      facts: ["A cave near Makkah", "He took food with him", "Then back to Khadijah"],
      source: hadith("bukhari", "3", "Aishah", "Sahih", "He ﷺ used to go alone to the cave of Hira and worship there for many nights, taking food with him, then return to Khadijah for more."),
      difficulty: 1,
      questions: [
        { q: "Where did he ﷺ go to worship alone?", a: "The cave of Hira", wrong: ["The cave of Thawr", "Mount Uhud", "Ta'if"], why: "Sahih al-Bukhari 3." },
        { q: "Who did he ﷺ go back to for more food?", a: "Khadijah", wrong: ["Abu Talib", "Abu Bakr", "Halimah"], why: "Then he would return to Khadijah." },
        { q: "He ﷺ stayed in Hira only for an hour at a time.", tf: false, why: "He stayed many nights before going home." }
      ]
    },
    {
      slug: "iqra",
      title: "Read!",
      line: "The angel said: Read! He ﷺ said: I am not a reader.",
      facts: ["Asked three times", "Quran 96:1"],
      quote: quranQuote(96, 1),
      source: hadith("bukhari", "3", "Aishah", "Sahih", "The angel came to him in Hira and said: Read! He ﷺ said: I am not a reader. The angel pressed him hard three times, then said: Read in the name of your Lord who created."),
      difficulty: 1,
      questions: [
        { q: "What was the first word the angel said?", a: "Read (Iqra)", wrong: ["Pray", "Listen", "Write"], why: "Iqra: Read!" },
        { q: "What did he ﷺ answer?", a: "I am not a reader", wrong: ["I will read later", "Who are you?", "I am busy"], why: "He ﷺ could not read or write." },
        { q: "How many times did the angel press him ﷺ?", a: "Three", wrong: ["Once", "Seven", "Ten"], why: "Then came the first ayahs of Surah Al-Alaq." }
      ]
    },
    {
      slug: "pen",
      title: "Taught by the pen",
      line: "The first ayahs say Allah taught people what they did not know.",
      facts: ["Quran 96:1-5", "Knowledge is from Allah"],
      quote: quranQuote(96, 5),
      source: quran(96, 5, "Read, and your Lord is the Most Generous, who taught by the pen, taught man what he did not know."),
      difficulty: 1,
      questions: [
        { q: "Which surah's ayahs came first?", a: "Al-Alaq", wrong: ["Al-Fatihah", "Al-Baqarah", "Al-Ikhlas"], why: "Surah 96, ayahs 1 to 5." },
        { q: "What does Allah say He taught by?", a: "The pen", wrong: ["The sword", "The stars", "Gold"], why: "Who taught by the pen." },
        { q: "The very first ayahs are about reading and learning.", tf: true, why: "Read, and Allah taught man what he did not know." }
      ]
    },
    {
      slug: "waraqah",
      title: "Waraqah's words",
      line: "Waraqah said: this is the angel Allah sent to Musa.",
      facts: ["Khadijah's cousin", "An old, blind scholar"],
      source: hadith("bukhari", "3", "Aishah", "Sahih", "Khadijah took him ﷺ to her cousin Waraqah ibn Nawfal, who said: this is the Namus (Jibril) whom Allah sent to Musa; I wish I were young when your people drive you out. No man came with what you bring without being opposed."),
      difficulty: 2,
      questions: [
        { q: "Who took him ﷺ to Waraqah ibn Nawfal?", a: "Khadijah", wrong: ["Abu Bakr", "Abu Talib", "Ali"], why: "Waraqah was her cousin." },
        { q: "Waraqah said the angel was the one sent to whom?", a: "Musa", wrong: ["Nuh", "Yusuf", "Adam"], why: "This is the Namus that Allah sent to Musa." },
        { q: "Waraqah warned that his people would drive him ﷺ out.", tf: true, why: "Everyone who brought such a message was opposed." }
      ]
    },
    {
      slug: "how-it-came",
      title: "How revelation came",
      line: "Revelation came like a ringing bell, or the angel as a man.",
      facts: ["The bell was hardest", "Sweat on cold days"],
      source: hadith("bukhari", "2", "Aishah", "Sahih", "Asked how revelation came, he ﷺ said: sometimes like the ringing of a bell, the hardest on me; sometimes the angel comes as a man and speaks. Aishah saw sweat on his forehead on a very cold day."),
      difficulty: 2,
      questions: [
        { q: "Which way of revelation was hardest on him ﷺ?", a: "Like the ringing of a bell", wrong: ["In a dream", "As a man speaking", "Written on stone"], why: "He said it was the hardest on him." },
        { q: "What did Aishah see on cold days of revelation?", a: "Sweat on his forehead", wrong: ["Snow on his hair", "Tears only", "Nothing at all"], why: "Revelation was heavy." },
        { q: "The angel sometimes came looking like a man.", tf: true, why: "He spoke, and the Prophet ﷺ understood." }
      ]
    },
    {
      slug: "muddaththir",
      title: "Arise and warn",
      line: "After a pause, Allah said: you wrapped up, arise and warn.",
      facts: ["The angel on a chair", "Quran 74:1-5"],
      quote: quranQuote(74, 1),
      source: hadith("bukhari", "4", "Jabir ibn Abdullah", "Sahih", "After a pause in revelation, he ﷺ saw the angel of Hira sitting on a chair between the sky and the earth; he went home saying: wrap me up. Then Allah revealed: O you wrapped up, arise and warn. After that, revelation came often."),
      difficulty: 2,
      questions: [
        { q: "Where did he ﷺ see the angel after the pause?", a: "On a chair between sky and earth", wrong: ["Inside the Ka'bah", "In the market", "On a ship"], why: "The same angel from Hira." },
        { q: "What did Allah command in Surah Al-Muddaththir?", a: "Arise and warn", wrong: ["Sleep and rest", "Leave Makkah now", "Build a palace"], why: "O you wrapped up, arise and warn." },
        { q: "After Al-Muddaththir, revelation came often.", tf: true, why: "Jabir said it kept coming, one after another." }
      ]
    }
  ]
};

const MAKKAH: DeepUnit = {
  key: "seerah-makkah",
  topicId: "prophets",
  branchId: "seerah-makkah-call",
  branch: { title: "Seerah: calling in Makkah", description: "The call from Mount Safa, Abu Lahab, hard years for the believers, and Allah's comfort." },
  name: "the call in Makkah",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "declare",
      title: "Say it openly",
      line: "Allah told him ﷺ to declare the message openly.",
      facts: ["Quran 15:94"],
      quote: quranQuote(15, 94),
      source: quran(15, 94, "So proclaim what you are commanded, and turn away from those who worship others with Allah."),
      difficulty: 1,
      questions: [
        { q: "What did Quran 15:94 tell him ﷺ to do?", a: "Proclaim the message openly", wrong: ["Keep it secret", "Leave Makkah", "Stop preaching"], why: "So proclaim what you are commanded." },
        { q: "Who was he ﷺ told to turn away from?", a: "Those who worship others", wrong: ["His family", "The poor", "Children"], why: "Turn away from the idol worshippers." },
        { q: "The message was meant to stay hidden forever.", tf: false, why: "Allah told him to proclaim it." }
      ]
    },
    {
      slug: "safa",
      title: "The call from Safa",
      line: "He ﷺ climbed Safa and called every clan of Quraysh.",
      facts: ["Quran 26:214", "Warn your nearest kin"],
      quote: quranQuote(26, 214),
      source: hadith("bukhari", "4770", "Ibn Abbas", "Sahih", "When 'warn your nearest kin' was revealed, the Prophet ﷺ climbed Safa and called the clans of Quraysh until they gathered: if I told you an army was in the valley, would you believe me? They said: yes, we have only known you to be truthful."),
      difficulty: 1,
      questions: [
        { q: "Which hill did he ﷺ climb to call Quraysh?", a: "Safa", wrong: ["Uhud", "Hira", "Thawr"], why: "Sahih al-Bukhari 4770." },
        { q: "Who did Allah first tell him ﷺ to warn?", a: "His nearest kin", wrong: ["The Romans", "Only strangers", "The Persians"], why: "Quran 26:214." },
        { q: "Quraysh said they had only known him ﷺ to be truthful.", tf: true, why: "So they said they would believe him." }
      ]
    },
    {
      slug: "abu-lahab",
      title: "Abu Lahab's reply",
      line: "His own uncle Abu Lahab cursed him, and Allah sent Surah 111.",
      facts: ["His uncle", "Surah Al-Masad"],
      quote: quranQuote(111, 1),
      source: hadith("bukhari", "4770", "Ibn Abbas", "Sahih", "Abu Lahab said: may you perish all day! Is this why you gathered us? Then Allah revealed: may the hands of Abu Lahab perish, and he has perished."),
      difficulty: 1,
      questions: [
        { q: "Who answered the call at Safa with a curse?", a: "Abu Lahab", wrong: ["Abu Talib", "Al-Abbas", "Hamzah"], why: "His own uncle." },
        { q: "Which surah was revealed about him?", a: "Al-Masad (111)", wrong: ["Al-Fil (105)", "Al-Kawthar (108)", "An-Nas (114)"], why: "May the hands of Abu Lahab perish." },
        { q: "Being family of the Prophet ﷺ saved Abu Lahab.", tf: false, why: "Family ties do not help without faith." }
      ]
    },
    {
      slug: "fatimah-helps",
      title: "Fatimah helps her father",
      line: "While he ﷺ prayed, they put filth on his back. Fatimah came.",
      facts: ["At the Ka'bah", "Abu Jahl's group", "Fatimah was young"],
      source: hadith("bukhari", "240", "Abdullah ibn Mas'ud", "Sahih", "Abu Jahl's group put a camel's dirty insides on the Prophet's ﷺ back while he prostrated at the Ka'bah, and laughed; he stayed in sujud until Fatimah, then a girl, came and threw it off him."),
      difficulty: 2,
      questions: [
        { q: "What was he ﷺ doing when they mocked him?", a: "Praying at the Ka'bah", wrong: ["Eating at home", "Trading", "Sleeping"], why: "He was in sujud." },
        { q: "Who came and removed it from his back?", a: "Fatimah, his daughter", wrong: ["Abu Bakr", "Umar", "Khadijah"], why: "She was a young girl then." },
        { q: "He ﷺ stopped praying to fight back.", tf: false, why: "He stayed in sujud, patient." }
      ]
    },
    {
      slug: "khabbab",
      title: "Patience, not hurry",
      line: "Believers were hurt. He ﷺ said: be patient, Islam will spread.",
      facts: ["In the Ka'bah's shade", "From Sana'a to Hadramawt"],
      source: hadith("bukhari", "3612", "Khabbab ibn al-Aratt", "Sahih", "They complained to him ﷺ in the shade of the Ka'bah and asked him to pray for help. He said believers before them faced far worse and did not leave their religion; this religion will spread until a rider goes from Sana'a to Hadramawt fearing only Allah, but you are hasty."),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ say Islam would reach?", a: "Safety from Sana'a to Hadramawt", wrong: ["Only Makkah", "Nowhere", "Only the rich"], why: "A rider would fear none but Allah." },
        { q: "What did he ﷺ tell those who complained?", a: "You are in a hurry", wrong: ["Give up Islam", "Fight now", "Hide forever"], why: "Be patient; the help of Allah is coming." },
        { q: "Believers before them had faced worse tests.", tf: true, why: "Yet they held on to their faith." }
      ]
    },
    {
      slug: "not-you",
      title: "They deny Allah's signs",
      line: "Allah comforted him ﷺ: they do not call you a liar.",
      facts: ["Quran 6:33", "Allah saw his sadness"],
      quote: quranQuote(6, 33),
      source: quran(6, 33, "We know that what they say saddens you; they do not call you a liar, but the wrongdoers reject the signs of Allah."),
      difficulty: 2,
      questions: [
        { q: "What did Allah know about him ﷺ in Quran 6:33?", a: "Their words made him sad", wrong: ["He was angry", "He was afraid", "He wanted wealth"], why: "We know that what they say saddens you." },
        { q: "What were the wrongdoers really rejecting?", a: "The signs of Allah", wrong: ["His family", "His trade", "His poetry"], why: "They did not truly think him a liar." },
        { q: "Allah comforts His Messenger ﷺ in the Quran.", tf: true, why: "Quran 6:33 is one example." }
      ]
    },
    {
      slug: "guidance",
      title: "Only Allah guides",
      line: "He ﷺ begged his uncle to say La ilaha illallah.",
      facts: ["Abu Talib was dying", "Quran 28:56"],
      quote: quranQuote(28, 56),
      source: hadith("bukhari", "3884", "Al-Musayyab", "Sahih", "When Abu Talib was dying, the Prophet ﷺ said: uncle, say La ilaha illallah, a word I can plead for you with Allah. Abu Jahl kept him from it. Then Allah revealed: you cannot guide whom you love, but Allah guides whom He wills."),
      difficulty: 3,
      questions: [
        { q: "What did he ﷺ ask his dying uncle to say?", a: "La ilaha illallah", wrong: ["Goodbye", "Forgive Quraysh", "Nothing"], why: "So he could plead for him with Allah." },
        { q: "Who guides hearts, as Quran 28:56 says?", a: "Allah alone", wrong: ["The Prophet ﷺ", "Family", "Kings"], why: "You cannot guide whom you love." },
        { q: "Even a prophet cannot put faith into a heart.", tf: true, why: "Our job is to call; Allah guides." }
      ]
    }
  ]
};

const TAIF: DeepUnit = {
  key: "seerah-taif",
  topicId: "prophets",
  branchId: "seerah-taif",
  branch: { title: "Seerah: Ta'if and the jinn", description: "His hardest day, the angel of the mountains, his mercy, and the jinn who believed." },
  name: "Ta'if and the jinn",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "hardest-day",
      title: "His hardest day",
      line: "His hardest day ﷺ was when a chief of Ta'if refused him.",
      facts: ["Harder than Uhud", "Ibn Abd Yalil refused"],
      source: hadith("bukhari", "3231", "Aishah", "Sahih", "Aishah asked if he ﷺ had a day harder than Uhud. He said: the hardest was when I offered myself to Ibn Abd Yalil ibn Abd Kulal, and he did not answer me; I left full of sorrow."),
      difficulty: 2,
      questions: [
        { q: "Aishah asked if he ﷺ had a day harder than which?", a: "Uhud", wrong: ["Badr", "The Hijrah", "Hunayn"], why: "He said yes: the day he was refused." },
        { q: "How did he ﷺ feel after being refused?", a: "Full of sorrow", wrong: ["Angry for revenge", "Happy", "He felt nothing"], why: "He walked on without noticing where." },
        { q: "His hardest day was a day of being rejected, not a battle.", tf: true, why: "Being turned away hurt him most." }
      ]
    },
    {
      slug: "cloud",
      title: "The cloud and Jibril",
      line: "A cloud shaded him ﷺ, and Jibril called from it.",
      facts: ["At Qarn ath-Tha'alib", "Allah heard everything"],
      source: hadith("bukhari", "3231", "Aishah", "Sahih", "At Qarn ath-Tha'alib he ﷺ looked up and saw a cloud shading him, and Jibril in it, who said: Allah has heard what your people said to you and how they answered you."),
      difficulty: 2,
      questions: [
        { q: "What shaded him ﷺ on the way back?", a: "A cloud", wrong: ["A tree", "A tent", "A cave"], why: "And Jibril was in it." },
        { q: "What did Jibril say Allah had heard?", a: "What his people said to him", wrong: ["Nothing at all", "Only the jinn", "The market noise"], why: "Allah hears everything." },
        { q: "Allah left him ﷺ alone in his sorrow.", tf: false, why: "He sent Jibril and an angel to him." }
      ]
    },
    {
      slug: "mountains",
      title: "The angel of the mountains",
      line: "An angel offered to bring two mountains down on them.",
      facts: ["The two Akhshab mountains", "He ﷺ said no"],
      source: hadith("bukhari", "3231", "Aishah", "Sahih", "The angel of the mountains greeted him and said: O Muhammad, if you wish, I will bring the two Akhshab mountains down on them. He ﷺ said: no."),
      difficulty: 2,
      questions: [
        { q: "What did the angel of the mountains offer?", a: "To bring two mountains down on them", wrong: ["Gold and silver", "A palace", "A big army"], why: "If you wish, I will." },
        { q: "What did he ﷺ choose?", a: "No, to be patient with them", wrong: ["Yes, at once", "To wait a year", "To ask Abu Bakr"], why: "Mercy, even after being hurt." },
        { q: "The angel acted without his ﷺ permission.", tf: false, why: "He waited for the Prophet's ﷺ order." }
      ]
    },
    {
      slug: "hope",
      title: "Hope for their children",
      line: "He ﷺ hoped their children would worship Allah alone.",
      facts: ["Mercy, not revenge", "Ta'if later became Muslim"],
      source: hadith("bukhari", "3231", "Aishah", "Sahih", "He ﷺ said: no, rather I hope that Allah will bring from their children people who worship Allah alone and join nothing with Him."),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ hope for the people who hurt him?", a: "Their children would worship Allah", wrong: ["They would be punished", "They would leave Arabia", "Nothing good"], why: "Mercy instead of revenge." },
        { q: "What does the story teach us?", a: "Mercy toward those who hurt us", wrong: ["Always take revenge", "Never call people again", "Stay angry"], why: "He ﷺ looked to their future." },
        { q: "He ﷺ wanted good even for people who refused him.", tf: true, why: "He hoped for their children's guidance." }
      ]
    },
    {
      slug: "jinn-listen",
      title: "The jinn listen",
      line: "A group of jinn listened to the Quran, then warned their people.",
      facts: ["Quran 46:29", "They said: be quiet"],
      quote: quranQuote(46, 29),
      source: quran(46, 29, "We sent a group of jinn to you to listen to the Quran; they said to each other: listen quietly. When it ended, they went back to their people as warners."),
      difficulty: 2,
      questions: [
        { q: "Who came to listen to the Quran in Quran 46:29?", a: "A group of jinn", wrong: ["Angels", "Kings of Persia", "Birds"], why: "We sent a group of jinn to you." },
        { q: "What did the jinn say while listening?", a: "Listen quietly", wrong: ["Let us leave", "Let us laugh", "Speak louder"], why: "They respected the Quran." },
        { q: "After listening, the jinn went to warn their people.", tf: true, why: "They became callers to the truth." }
      ]
    },
    {
      slug: "amazing-quran",
      title: "An amazing Quran",
      line: "The jinn said: we heard an amazing Quran, so we believed.",
      facts: ["Quran 72:1-2", "Surah Al-Jinn"],
      quote: quranQuote(72, 1),
      source: quran(72, 1, "Say: it was revealed to me that a group of jinn listened and said: we have heard an amazing Quran; it guides to the right way, so we believed in it."),
      difficulty: 1,
      questions: [
        { q: "What did the jinn call the Quran?", a: "Amazing", wrong: ["Strange poetry", "Too long", "Magic"], why: "We have heard an amazing Quran." },
        { q: "Which surah tells their words?", a: "Al-Jinn (72)", wrong: ["Al-Kahf (18)", "Yusuf (12)", "Al-Fil (105)"], why: "Surah 72 is named after them." },
        { q: "Some jinn believed in the Quran.", tf: true, why: "So we believed in it." }
      ]
    },
    {
      slug: "mercy",
      title: "A mercy to the worlds",
      line: "Allah sent him ﷺ only as a mercy to all the worlds.",
      facts: ["Quran 21:107", "For people and jinn"],
      quote: quranQuote(21, 107),
      source: quran(21, 107, "We have not sent you except as a mercy to the worlds."),
      difficulty: 1,
      questions: [
        { q: "Why did Allah send him ﷺ, as Quran 21:107 says?", a: "As a mercy to the worlds", wrong: ["To become a king", "To gather wealth", "Only for Arabs"], why: "A mercy to all the worlds." },
        { q: "Who does that mercy reach?", a: "All the worlds", wrong: ["Only Makkah", "Only his family", "Only the rich"], why: "Not one land or one people." },
        { q: "His choice at Ta'if shows this mercy.", tf: true, why: "He prayed for them instead of against them." }
      ]
    }
  ]
};

const ISRA: DeepUnit = {
  key: "seerah-isra",
  topicId: "prophets",
  branchId: "seerah-isra-miraj",
  branch: { title: "Seerah: the Night Journey", description: "Al-Isra to Jerusalem and Al-Mi'raj through the heavens, where the five prayers were given." },
  name: "the Night Journey",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "night-journey",
      title: "From Makkah to Al-Aqsa",
      line: "In one night, Allah took him ﷺ from Makkah to Al-Aqsa.",
      facts: ["Quran 17:1", "This is Al-Isra"],
      quote: quranQuote(17, 1),
      source: quran(17, 1, "Glory be to the One who took His servant by night from Al-Masjid al-Haram to Al-Masjid al-Aqsa, whose surroundings We blessed, to show him Our signs."),
      difficulty: 1,
      questions: [
        { q: "Where did the Night Journey start?", a: "Al-Masjid al-Haram", wrong: ["Madinah", "Ta'if", "Damascus"], why: "Quran 17:1." },
        { q: "Where did it reach on earth?", a: "Al-Masjid al-Aqsa", wrong: ["Cairo", "Yemen", "Baghdad"], why: "Whose surroundings We have blessed." },
        { q: "The journey from Makkah to Al-Aqsa is called Al-Isra.", tf: true, why: "The rising through the heavens is Al-Mi'raj." }
      ]
    },
    {
      slug: "buraq",
      title: "Al-Buraq",
      line: "Al-Buraq: white, bigger than a donkey, smaller than a mule.",
      facts: ["Each step to the horizon", "Tied where prophets tied"],
      source: hadith("muslim", "162a", "Anas ibn Malik", "Sahih", "Al-Buraq was brought to me, a white, long animal, bigger than a donkey and smaller than a mule, placing its hoof as far as it could see. I rode it to Bayt al-Maqdis and tied it to the ring the prophets used."),
      difficulty: 2,
      questions: [
        { q: "What was Al-Buraq like?", a: "Bigger than a donkey, smaller than a mule", wrong: ["A giant bird", "A huge camel", "A ship"], why: "Sahih Muslim 162a." },
        { q: "How far did each step of Al-Buraq reach?", a: "As far as it could see", wrong: ["One meter", "One mile exactly", "Up to the moon"], why: "Its hoof landed at the end of its sight." },
        { q: "He ﷺ tied Al-Buraq where the prophets tied their mounts.", tf: true, why: "At the ring in Bayt al-Maqdis." }
      ]
    },
    {
      slug: "milk",
      title: "He chose the milk",
      line: "Offered milk or wine, he ﷺ chose milk: the fitrah.",
      facts: ["Jibril offered two cups", "Fitrah: the natural way"],
      source: hadith("bukhari", "3394", "Abu Hurairah", "Sahih", "On the night of the journey he ﷺ was given two cups, milk and wine; he took the milk. Jibril said: you have chosen the fitrah; had you taken the wine, your ummah would have gone astray."),
      difficulty: 1,
      questions: [
        { q: "Which cup did he ﷺ choose?", a: "Milk", wrong: ["Wine", "Honey", "Water"], why: "Jibril said: you chose the fitrah." },
        { q: "What does fitrah mean?", a: "The natural, pure way", wrong: ["A kind of food", "A city", "A prayer time"], why: "The way Allah made people." },
        { q: "Choosing the wine would have led his ummah astray.", tf: true, why: "Jibril said so." }
      ]
    },
    {
      slug: "gates",
      title: "Open the gate",
      line: "At each heaven: who is it? Jibril, with Muhammad ﷺ. Welcome!",
      facts: ["Seven heavens", "Each gate asked first"],
      source: hadith("bukhari", "3207", "Malik ibn Sa'sa'ah", "Sahih", "At each heaven the gatekeeper asked: who is it? Jibril. Who is with you? Muhammad. Has he been sent for? Yes. Then it was said: welcome to him, what an excellent visit."),
      difficulty: 2,
      questions: [
        { q: "Who asked for each heaven's gate to be opened?", a: "Jibril", wrong: ["Musa", "Mika'il", "Ibrahim"], why: "He took the Prophet ﷺ up." },
        { q: "What did each heaven say when they heard his name?", a: "Welcome to him", wrong: ["Go back", "Wait outside", "Nothing"], why: "What an excellent visit!" },
        { q: "The gates opened without anyone asking who it was.", tf: false, why: "Each gatekeeper asked: who is it?" }
      ]
    },
    {
      slug: "lower-heavens",
      title: "Adam, Isa, Yahya, Yusuf",
      line: "Adam in the first heaven; Isa and Yahya in the second.",
      facts: ["Yusuf in the third", "Idris in the fourth"],
      source: hadith("bukhari", "3207", "Malik ibn Sa'sa'ah", "Sahih", "In the first heaven he ﷺ met Adam, in the second Isa and Yahya, in the third Yusuf, in the fourth Idris. Each welcomed him."),
      difficulty: 2,
      questions: [
        { q: "Who did he ﷺ meet in the first heaven?", a: "Adam", wrong: ["Ibrahim", "Musa", "Nuh"], why: "Adam said: welcome, son and prophet." },
        { q: "Which two prophets were in the second heaven?", a: "Isa and Yahya", wrong: ["Musa and Harun", "Ibrahim and Ismail", "Yusuf and Ya'qub"], why: "Sahih al-Bukhari 3207." },
        { q: "Who was in the third heaven?", a: "Yusuf", wrong: ["Idris", "Adam", "Dawud"], why: "Then Idris in the fourth." }
      ]
    },
    {
      slug: "upper-heavens",
      title: "Harun, Musa, Ibrahim",
      line: "Harun in the fifth heaven, Musa sixth, Ibrahim seventh.",
      facts: ["Musa wept", "His ummah is bigger"],
      source: hadith("bukhari", "3207", "Malik ibn Sa'sa'ah", "Sahih", "He ﷺ met Harun in the fifth heaven, Musa in the sixth, who wept that more of this young man's followers would enter Jannah than his own, and Ibrahim in the seventh."),
      difficulty: 2,
      questions: [
        { q: "Who was in the seventh heaven?", a: "Ibrahim", wrong: ["Musa", "Harun", "Adam"], why: "He said: welcome, son and prophet." },
        { q: "Why did Musa weep?", a: "More of this ummah will enter Jannah", wrong: ["He was ill", "He missed Egypt", "He was afraid"], why: "More than his own followers." },
        { q: "Harun was in the fifth heaven.", tf: true, why: "Then Musa in the sixth." }
      ]
    },
    {
      slug: "bayt-mamur",
      title: "Al-Bayt al-Ma'mur",
      line: "70,000 angels pray in Al-Bayt al-Ma'mur daily, never returning.",
      facts: ["A house in the heavens", "New angels every day"],
      source: hadith("bukhari", "3207", "Malik ibn Sa'sa'ah", "Sahih", "He ﷺ was shown Al-Bayt al-Ma'mur; Jibril said: 70,000 angels pray in it every day, and when they leave they never come back to it."),
      difficulty: 3,
      questions: [
        { q: "How many angels pray in Al-Bayt al-Ma'mur each day?", a: "70,000", wrong: ["700", "7,000", "7"], why: "And they never return to it." },
        { q: "Do the same angels come back the next day?", a: "No, never", wrong: ["Yes, every day", "Once a week", "Only on Friday"], why: "A new group comes each day." },
        { q: "Al-Bayt al-Ma'mur is a house of worship in the heavens.", tf: true, why: "Jibril showed it to him ﷺ." }
      ]
    },
    {
      slug: "sidrah",
      title: "The Lote Tree",
      line: "Sidrat al-Muntaha: leaves like elephant ears, four rivers below.",
      facts: ["Quran 53:14", "The farthest boundary"],
      quote: quranQuote(53, 14),
      source: hadith("bukhari", "3207", "Malik ibn Sa'sa'ah", "Sahih", "He ﷺ was shown Sidrat al-Muntaha; its fruits were like the jugs of Hajr, its leaves like the ears of elephants, and four rivers came from its root: two hidden ones in Jannah, and two seen ones, the Nile and the Euphrates."),
      difficulty: 3,
      questions: [
        { q: "What were the Lote Tree's leaves like?", a: "Elephants' ears", wrong: ["Gold coins", "Bird feathers", "Tiny needles"], why: "Sahih al-Bukhari 3207." },
        { q: "How many rivers came from its root?", a: "Four", wrong: ["Two", "Seven", "Ten"], why: "Two hidden, two seen." },
        { q: "What does Sidrat al-Muntaha mean?", a: "The Lote Tree of the farthest boundary", wrong: ["The tree of life", "The palm of Makkah", "The garden gate"], why: "Quran 53:14." }
      ]
    },
    {
      slug: "fifty-five",
      title: "Fifty become five",
      line: "Fifty prayers became five, still worth fifty in reward.",
      facts: ["Musa said: ask less", "Five prayers, fifty reward"],
      source: hadith("bukhari", "349", "Abu Dharr", "Sahih", "Allah made fifty prayers due; Musa told him ﷺ to go back and ask for less, again and again, until Allah said: these are five, and they are fifty; My word does not change. He said: I now feel shy before my Lord."),
      difficulty: 1,
      questions: [
        { q: "How many prayers were first given?", a: "Fifty", wrong: ["Five", "Ten", "Seventeen"], why: "Then Musa told him to ask for less." },
        { q: "Five prayers carry the reward of how many?", a: "Fifty", wrong: ["Five", "Ten", "One hundred"], why: "These are five, and they are fifty." },
        { q: "Who kept telling him ﷺ to ask for less?", a: "Musa", wrong: ["Ibrahim", "Jibril", "Adam"], why: "Your ummah will not be able to do it." }
      ]
    },
    {
      slug: "three-gifts",
      title: "Three gifts that night",
      line: "That night he ﷺ was given three gifts for his ummah.",
      facts: ["The five prayers", "End of Al-Baqarah", "Forgiveness for tawhid"],
      source: hadith("muslim", "173", "Abdullah ibn Mas'ud", "Sahih", "He ﷺ was given three things: the five prayers, the last ayahs of Surah Al-Baqarah, and forgiveness of grave sins for whoever of his ummah does not join anything with Allah."),
      difficulty: 2,
      questions: [
        { q: "Which ayahs were given on the Night Journey?", a: "The end of Al-Baqarah", wrong: ["The start of Al-Kahf", "Ayat al-Kursi", "Surah Yasin"], why: "Sahih Muslim 173." },
        { q: "Whose grave sins can be forgiven, as the hadith says?", a: "Those who join nothing with Allah", wrong: ["Everyone at all", "Only the rich", "No one"], why: "Tawhid is the key." },
        { q: "The five prayers were a gift of the Mi'raj.", tf: true, why: "The first of the three gifts." }
      ]
    },
    {
      slug: "jerusalem-shown",
      title: "Jerusalem shown to him",
      line: "Quraysh doubted, so Allah showed him ﷺ Jerusalem to describe.",
      facts: ["He stood at Al-Hijr", "He described it all"],
      source: hadith("bukhari", "3886", "Jabir ibn Abdullah", "Sahih", "When Quraysh did not believe him ﷺ, he stood in Al-Hijr and Allah showed him Bayt al-Maqdis; he described it to them while looking at it."),
      difficulty: 2,
      questions: [
        { q: "What did Quraysh do when they heard of the journey?", a: "They did not believe him", wrong: ["They all believed", "They went to see", "They stayed silent"], why: "It sounded impossible to them." },
        { q: "How did he ﷺ describe Jerusalem to them?", a: "Allah showed it to him", wrong: ["He drew a map", "A traveler told him", "He guessed"], why: "He described it while looking at it." },
        { q: "Allah helped His Messenger ﷺ answer the doubters.", tf: true, why: "He showed him Bayt al-Maqdis." }
      ]
    }
  ]
};

const HIJRAH: DeepUnit = {
  key: "seerah-hijrah",
  topicId: "prophets",
  branchId: "seerah-hijrah",
  branch: { title: "Seerah: the Hijrah", description: "The pledge at Aqabah, the plot in Makkah, and the first days in Madinah." },
  name: "the Hijrah",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "aqabah",
      title: "The pledge at Aqabah",
      line: "Men of Madinah pledged: worship Allah alone, no stealing.",
      facts: ["At night, at Aqabah", "Ubadah was there"],
      source: hadith("bukhari", "18", "Ubadah ibn as-Samit", "Sahih", "On the night of Aqabah he ﷺ said: pledge to me not to join anything with Allah, not to steal, not to commit zina, not to kill your children, not to slander, and not to disobey in good. Whoever keeps it, his reward is with Allah."),
      difficulty: 2,
      questions: [
        { q: "What was the first promise of the pledge?", a: "Worship Allah alone", wrong: ["Give gold", "Fight Quraysh", "Build a city"], why: "Not to join anything with Allah." },
        { q: "Where was the pledge made?", a: "Aqabah, near Makkah", wrong: ["Madinah's market", "Jerusalem", "Ta'if"], why: "Sahih al-Bukhari 18." },
        { q: "Whoever keeps the pledge, his reward is with Allah.", tf: true, why: "He ﷺ promised it." }
      ]
    },
    {
      slug: "plot",
      title: "They plotted, Allah planned",
      line: "Quraysh plotted against him ﷺ, but Allah is the best planner.",
      facts: ["Quran 8:30"],
      quote: quranQuote(8, 30),
      source: quran(8, 30, "Remember when the disbelievers plotted to hold you, end your life or drive you out; they plan, and Allah plans, and Allah is the best of planners."),
      difficulty: 2,
      questions: [
        { q: "Who is the best of planners?", a: "Allah", wrong: ["Quraysh", "The Romans", "Abu Jahl"], why: "Quran 8:30." },
        { q: "What did Quraysh plot, as Quran 8:30 says?", a: "To hold him, end his life or expel him", wrong: ["To make him king", "To give him gold", "To follow him"], why: "Three plans; Allah's plan won." },
        { q: "Their plots stopped the Hijrah.", tf: false, why: "Allah brought him ﷺ safely to Madinah." }
      ]
    },
    {
      slug: "shows-way",
      title: "He shows me the way",
      line: "Asked who he ﷺ was, Abu Bakr said: he shows me the way.",
      facts: ["Abu Bakr was well known", "He meant the way of good"],
      source: hadith("bukhari", "3911", "Anas ibn Malik", "Sahih", "On the way to Madinah, people asked Abu Bakr who the man in front of him was. He said: this man shows me the way. They thought he meant the road; he meant the way of good."),
      difficulty: 2,
      questions: [
        { q: "What did Abu Bakr say about him ﷺ on the road?", a: "He shows me the way", wrong: ["He is my servant", "He is a trader", "I do not know him"], why: "His words were true, and wise." },
        { q: "What did Abu Bakr really mean by 'the way'?", a: "The way of good", wrong: ["The road only", "The market", "The sea route"], why: "People thought he meant the road." },
        { q: "Abu Bakr told a lie to protect him ﷺ.", tf: false, why: "He spoke the truth in a wise way." }
      ]
    },
    {
      slug: "quba",
      title: "First stop: Quba",
      line: "He ﷺ stayed with Banu Amr ibn Awf at Quba fourteen nights.",
      facts: ["Upper Madinah", "Fourteen nights"],
      source: hadith("bukhari", "428", "Anas ibn Malik", "Sahih", "When the Prophet ﷺ arrived, he stopped in upper Madinah among Banu Amr ibn Awf and stayed fourteen nights; then he rode on, with Abu Bakr behind him, to the courtyard of Abu Ayyub's house."),
      difficulty: 2,
      questions: [
        { q: "How long did he ﷺ stay with Banu Amr ibn Awf?", a: "Fourteen nights", wrong: ["One night", "A year", "Forty nights"], why: "Sahih al-Bukhari 428." },
        { q: "At whose house did his camel stop in Madinah?", a: "Abu Ayyub's", wrong: ["Abu Jahl's", "Abu Talib's", "Uthman's"], why: "He dismounted in Abu Ayyub's courtyard." },
        { q: "Abu Bakr rode with him ﷺ on the same mount.", tf: true, why: "Abu Bakr rode behind him." }
      ]
    },
    {
      slug: "masjid",
      title: "Building the Masjid",
      line: "He ﷺ carried stones with them to build the Masjid in Madinah.",
      facts: ["Banu an-Najjar's land", "They wanted no price"],
      source: hadith("bukhari", "428", "Anas ibn Malik", "Sahih", "He ﷺ asked Banu an-Najjar the price of their walled garden; they said: we want its price only from Allah. The companions carried stones, and he ﷺ worked with them, saying: there is no good except the good of the Hereafter; O Allah, forgive the Ansar and the Muhajirun."),
      difficulty: 1,
      questions: [
        { q: "What price did Banu an-Najjar ask for the land?", a: "Only reward from Allah", wrong: ["A thousand dinars", "A camel each", "Half of Makkah"], why: "We seek its price only from Allah." },
        { q: "Did he ﷺ watch while others built?", a: "No, he carried stones too", wrong: ["Yes, he only watched", "He was away", "He paid workers"], why: "He worked with his companions." },
        { q: "What did he ﷺ say while building?", a: "No good but the Hereafter's", wrong: ["Hurry up", "Build it tall", "This is mine"], why: "O Allah, forgive the Ansar and the Muhajirun." }
      ]
    },
    {
      slug: "first-words",
      title: "His first words in Madinah",
      line: "Spread salam, feed people, pray at night: enter Jannah in peace.",
      facts: ["Said by Abdullah ibn Salam", "Not the face of a liar"],
      source: hadith("tirmidhi", "2485", "Abdullah ibn Salam", "Sahih", "When he ﷺ came to Madinah, Abdullah ibn Salam looked at his face and knew it was not the face of a liar. The first thing he said was: O people, spread the salam, feed people, and pray while people sleep; you will enter Paradise in peace."),
      difficulty: 1,
      questions: [
        { q: "What did Abdullah ibn Salam see in his face ﷺ?", a: "It was not a liar's face", wrong: ["A king's crown", "Anger", "Fear"], why: "He knew it at first sight." },
        { q: "Which is in his ﷺ first words in Madinah?", a: "Spread the salam", wrong: ["Build walls", "Gather weapons", "Pay taxes"], why: "And feed people, and pray at night." },
        { q: "These deeds lead to Jannah in peace.", tf: true, why: "You will enter Paradise with salam." }
      ]
    },
    {
      slug: "ibn-salam",
      title: "Three questions",
      line: "A Jewish scholar asked three things only a prophet would know.",
      facts: ["Abdullah ibn Salam", "He became Muslim"],
      source: hadith("bukhari", "3938", "Anas ibn Malik", "Sahih", "Abdullah ibn Salam asked about the first sign of the Hour, the first food of the people of Paradise, and why a child looks like a parent. He ﷺ answered: a fire gathering people from east to west, the extra lobe of fish liver, and the rest. Ibn Salam testified that he is the Messenger of Allah."),
      difficulty: 3,
      questions: [
        { q: "What is the first food of the people of Jannah?", a: "The extra lobe of fish liver", wrong: ["Dates", "Honey", "Bread"], why: "Sahih al-Bukhari 3938." },
        { q: "What did he ﷺ say is the first sign of the Hour?", a: "A fire gathering people east to west", wrong: ["A flood", "A big wind", "A new star"], why: "Gathering people from east to west." },
        { q: "Abdullah ibn Salam accepted Islam after the answers.", tf: true, why: "He bore witness right away." }
      ]
    },
    {
      slug: "calendar",
      title: "Year one: the Hijrah",
      line: "Muslims count years from his ﷺ arrival in Madinah.",
      facts: ["The Hijri calendar", "Not from his birth"],
      source: hadith("bukhari", "3934", "Sahl ibn Sad", "Sahih", "The companions did not count years from the Prophet's ﷺ prophethood or his death, but from his arrival in Madinah."),
      difficulty: 1,
      questions: [
        { q: "From what event do Hijri years start?", a: "The Hijrah to Madinah", wrong: ["His birth", "The first revelation", "His passing"], why: "Sahih al-Bukhari 3934." },
        { q: "What is the Muslim calendar called?", a: "Hijri", wrong: ["Roman", "Persian", "Solar"], why: "Named after the Hijrah." },
        { q: "The Islamic calendar counts from his ﷺ birth.", tf: false, why: "It counts from his arrival in Madinah." }
      ]
    }
  ]
};

const BADR: DeepUnit = {
  key: "seerah-badr",
  topicId: "prophets",
  branchId: "seerah-badr",
  branch: { title: "Seerah: Badr", description: "A small group of believers, a night of calm, angels sent down, and help from Allah." },
  name: "the day of Badr",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "few",
      title: "Few in number",
      line: "At Badr the believers were few, and Allah gave them victory.",
      facts: ["Quran 3:123", "A small group"],
      quote: quranQuote(3, 123),
      source: quran(3, 123, "Allah gave you victory at Badr when you were few and weak, so be mindful of Allah, that you may be grateful."),
      difficulty: 1,
      questions: [
        { q: "How does Quran 3:123 describe the believers at Badr?", a: "Few and weak", wrong: ["Many and rich", "Well armed", "Tired of war"], why: "When you were few." },
        { q: "Who gave them victory at Badr?", a: "Allah", wrong: ["Their numbers", "Their wealth", "The Romans"], why: "Allah gave you victory at Badr." },
        { q: "What does Allah ask after the victory?", a: "Be grateful and mindful of Him", wrong: ["Boast about it", "Take more land", "Rest forever"], why: "That you may be grateful." }
      ]
    },
    {
      slug: "talut",
      title: "Like the men of Talut",
      line: "The people of Badr were about 310, like Talut's men.",
      facts: ["Over three hundred and ten", "All were believers"],
      source: hadith("bukhari", "3957", "Al-Bara ibn Azib", "Sahih", "The companions who were at Badr said they were as many as the companions of Talut who crossed the river with him: over three hundred and ten, and none crossed with him but a believer."),
      difficulty: 2,
      questions: [
        { q: "About how many Muslims were at Badr?", a: "Just over 310", wrong: ["Ten thousand", "About 40", "One thousand"], why: "Sahih al-Bukhari 3957." },
        { q: "Whose army had the same number?", a: "Talut's", wrong: ["Fir'awn's", "Dhul-Qarnayn's", "Sulayman's"], why: "Those who crossed the river with him." },
        { q: "Only believers crossed the river with Talut.", tf: true, why: "Al-Bara said so." }
      ]
    },
    {
      slug: "calm",
      title: "Sleep and rain",
      line: "Before Badr, Allah sent calm sleep and rain to steady them.",
      facts: ["Quran 8:11", "Rain firmed the ground"],
      quote: quranQuote(8, 11),
      source: quran(8, 11, "Allah covered you with sleep as calm from Him, and sent rain from the sky to purify you, remove Satan's whispers, strengthen your hearts and make your feet firm."),
      difficulty: 2,
      questions: [
        { q: "What did Allah send over them as calm?", a: "Light sleep", wrong: ["A loud storm", "Great fear", "Hunger"], why: "Sleep as a calm from Him." },
        { q: "What did the rain do, as Quran 8:11 says?", a: "Purified them and made feet firm", wrong: ["Ended the battle", "Flooded the valley", "Scared them away"], why: "And strengthened their hearts." },
        { q: "Allah took away Satan's whispers with the rain.", tf: true, why: "To remove from you the evil of Satan." }
      ]
    },
    {
      slug: "thousand",
      title: "A thousand angels",
      line: "They asked Allah for help, and He sent a thousand angels.",
      facts: ["Quran 8:9", "Help came from du'a"],
      quote: quranQuote(8, 9),
      source: quran(8, 9, "When you called on your Lord for help, He answered you: I will help you with a thousand angels, one after another."),
      difficulty: 1,
      questions: [
        { q: "What did the believers do before help came?", a: "Called on Allah for help", wrong: ["Ran away", "Made a deal", "Gave up"], why: "When you called on your Lord for help." },
        { q: "How many angels does Quran 8:9 mention?", a: "A thousand", wrong: ["Ten", "Seven", "One hundred"], why: "One after another." },
        { q: "Du'a was part of the victory at Badr.", tf: true, why: "Allah answered their call." }
      ]
    },
    {
      slug: "jibril-badr",
      title: "Jibril at Badr",
      line: "At Badr he ﷺ said: this is Jibril, holding his horse's head.",
      facts: ["Ready for battle"],
      source: hadith("bukhari", "3995", "Ibn Abbas", "Sahih", "On the day of Badr the Prophet ﷺ said: this is Jibril, holding the head of his horse, equipped for battle."),
      difficulty: 2,
      questions: [
        { q: "Which angel did he ﷺ point to at Badr?", a: "Jibril", wrong: ["Israfil", "Malik", "Ridwan"], why: "Sahih al-Bukhari 3995." },
        { q: "What was Jibril holding?", a: "His horse's head", wrong: ["A book", "A lamp", "A trumpet"], why: "Ready for battle." },
        { q: "Angels took part at Badr.", tf: true, why: "The Quran and sahih hadith both say so." }
      ]
    },
    {
      slug: "allah-threw",
      title: "Allah threw",
      line: "You did not throw when you threw: Allah did, says Quran 8:17.",
      facts: ["Quran 8:17", "Victory is from Allah"],
      source: quran(8, 17, "It was not you who threw when you threw, but Allah threw, to test the believers with a good test. Allah is All-Hearing, All-Knowing."),
      difficulty: 3,
      questions: [
        { q: "Who truly threw, as Quran 8:17 says?", a: "Allah", wrong: ["The archers", "The wind", "No one"], why: "But Allah threw." },
        { q: "What should a believer learn from this?", a: "Success comes from Allah", wrong: ["We win alone", "Plans never matter", "Never try"], why: "We act, and Allah gives the result." },
        { q: "The believers were tested with a good test.", tf: true, why: "To test the believers with a good test." }
      ]
    },
    {
      slug: "people-of-badr",
      title: "The people of Badr",
      line: "Allah may have told the people of Badr: I have forgiven you.",
      facts: ["Said for Hatib", "A high rank"],
      source: hadith("bukhari", "3007", "Ali ibn Abi Talib", "Sahih", "When Hatib made a mistake, the Prophet ﷺ said: he was at Badr, and who knows, perhaps Allah looked at the people of Badr and said: do as you like, I have forgiven you."),
      difficulty: 3,
      questions: [
        { q: "Why was Hatib forgiven his mistake?", a: "He had been at Badr", wrong: ["He was rich", "He was old", "He was a poet"], why: "The people of Badr have a high rank." },
        { q: "What did he ﷺ say Allah may have told the people of Badr?", a: "I have forgiven you", wrong: ["Go home", "Fight again", "You are kings"], why: "Sahih al-Bukhari 3007." },
        { q: "The people of Badr hold a special honor.", tf: true, why: "Because of their faith on that day." }
      ]
    }
  ]
};

const UHUD: DeepUnit = {
  key: "seerah-uhud",
  topicId: "prophets",
  branchId: "seerah-uhud",
  branch: { title: "Seerah: Uhud", description: "The archers on the hill, a hard lesson in obeying, his wounds ﷺ, and a mountain that loves us." },
  name: "the day of Uhud",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "archers",
      title: "The archers on the hill",
      line: "He ﷺ told fifty archers: stay in your place, whatever happens.",
      facts: ["Led by Abdullah ibn Jubayr", "Fifty archers"],
      source: hadith("bukhari", "3039", "Al-Bara ibn Azib", "Sahih", "At Uhud the Prophet ﷺ put Abdullah ibn Jubayr over fifty archers and said: stay in your place, even if you see birds snatching us, until I send for you."),
      difficulty: 1,
      questions: [
        { q: "How many archers did he ﷺ place on the hill?", a: "Fifty", wrong: ["Five", "Five hundred", "Three"], why: "Sahih al-Bukhari 3039." },
        { q: "Who led the archers?", a: "Abdullah ibn Jubayr", wrong: ["Khalid ibn al-Walid", "Abu Bakr", "Hamzah"], why: "He was their commander." },
        { q: "What was their order?", a: "Stay until he sends for you", wrong: ["Chase the enemy", "Go home at noon", "Collect the spoils"], why: "Even if you see birds snatching us." }
      ]
    },
    {
      slug: "they-left",
      title: "When they left the hill",
      line: "Most archers left their place, and the battle turned.",
      facts: ["Quran 3:152", "Some wanted this world"],
      quote: quranQuote(3, 152),
      source: quran(3, 152, "Allah kept His promise until you lost heart, argued about the order and disobeyed after He showed you what you loved; some of you wanted this world and some wanted the Hereafter. Then He forgave you."),
      difficulty: 2,
      questions: [
        { q: "What went wrong at Uhud, as Quran 3:152 says?", a: "They disobeyed the order", wrong: ["The weather", "They had no food", "They were lost"], why: "They argued about the order and disobeyed." },
        { q: "What did some of them want, says the ayah?", a: "This world", wrong: ["To go home", "To sleep", "To build"], why: "Some wanted this world, some the Hereafter." },
        { q: "Allah forgave them after Uhud.", tf: true, why: "And He has forgiven you." }
      ]
    },
    {
      slug: "wounded",
      title: "His wounds ﷺ",
      line: "At Uhud his face ﷺ was wounded; Fatimah cared for him.",
      facts: ["A front tooth broken", "Ali brought water"],
      source: hadith("bukhari", "2911", "Sahl ibn Sa'd", "Sahih", "At Uhud the Prophet's ﷺ face was wounded and a front tooth broken. Fatimah washed the blood while Ali poured water; when it did not stop, she burned a palm mat and put its ashes on the wound, and the bleeding stopped."),
      difficulty: 2,
      questions: [
        { q: "Who washed his wound ﷺ at Uhud?", a: "Fatimah", wrong: ["Aishah", "Khadijah", "Asma"], why: "While Ali poured water." },
        { q: "What stopped the bleeding?", a: "Ash from a burned palm mat", wrong: ["Honey", "Cold water", "A song"], why: "Sahl ibn Sa'd tells it." },
        { q: "He ﷺ was hurt for the sake of this religion.", tf: true, why: "His face was wounded and a tooth broken." }
      ]
    },
    {
      slug: "smell-jannah",
      title: "The smell of Jannah",
      line: "Anas ibn an-Nadr said at Uhud: I smell Jannah beyond Uhud.",
      facts: ["Uncle of Anas ibn Malik", "He was a martyr"],
      source: hadith("bukhari", "2805", "Anas ibn Malik", "Sahih", "Anas ibn an-Nadr went forward at Uhud and said: O Sa'd ibn Mu'adh, Paradise! By the Lord of An-Nadr, I smell its scent from beyond Uhud. He was martyred that day."),
      difficulty: 3,
      questions: [
        { q: "What did Anas ibn an-Nadr smell beyond Uhud?", a: "Jannah", wrong: ["Rain", "Flowers of Madinah", "Smoke"], why: "I smell its scent from beyond Uhud." },
        { q: "Who did he say it to?", a: "Sa'd ibn Mu'adh", wrong: ["Abu Sufyan", "Umar", "Bilal"], why: "Sahih al-Bukhari 2805." },
        { q: "Anas ibn an-Nadr was martyred at Uhud.", tf: true, why: "He gave his life that day." }
      ]
    },
    {
      slug: "do-not-weaken",
      title: "Do not lose heart",
      line: "After Uhud Allah said: do not weaken, do not grieve.",
      facts: ["Quran 3:139"],
      quote: quranQuote(3, 139),
      source: quran(3, 139, "Do not weaken and do not grieve; you will be uppermost if you are believers."),
      difficulty: 1,
      questions: [
        { q: "What did Allah tell the believers after Uhud?", a: "Do not weaken or grieve", wrong: ["Give up", "Leave Madinah", "Blame each other"], why: "Quran 3:139." },
        { q: "Who will be uppermost, says Quran 3:139?", a: "True believers", wrong: ["The rich", "The strong", "The many"], why: "If you are believers." },
        { q: "A hard day means Allah has left the believers.", tf: false, why: "He comforted them right after Uhud." }
      ]
    },
    {
      slug: "loves-us",
      title: "A mountain that loves us",
      line: "Of Uhud he ﷺ said: it loves us, and we love it.",
      facts: ["Near Madinah"],
      source: hadith("bukhari", "4083", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said: this is a mountain that loves us, and we love it."),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ say about Mount Uhud?", a: "It loves us, and we love it", wrong: ["It is cursed", "Never go near it", "It is gold"], why: "Sahih al-Bukhari 4083." },
        { q: "Where is Mount Uhud?", a: "Near Madinah", wrong: ["In Makkah", "In Yemen", "In Syria"], why: "North of Madinah." },
        { q: "He ﷺ hated Uhud after the battle.", tf: false, why: "He said it loves us and we love it." }
      ]
    }
  ]
};

const TRENCH: DeepUnit = {
  key: "seerah-khandaq",
  topicId: "prophets",
  branchId: "seerah-trench",
  branch: { title: "Seerah: the Trench", description: "Digging in the cold and hunger, the rock that turned to sand, and the wind Allah sent." },
  name: "the Trench",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "digging",
      title: "Digging in the cold",
      line: "Hungry and cold, they dug the trench, and he ﷺ prayed for them.",
      facts: ["A very cold morning", "No servants to help"],
      source: hadith("bukhari", "2834", "Anas ibn Malik", "Sahih", "The Prophet ﷺ saw the Muhajirun and Ansar digging on a very cold morning, tired and hungry, and said: O Allah, the real life is the life of the Hereafter, so forgive the Ansar and the Muhajirun. They answered: we are those who pledged to Muhammad to strive as long as we live."),
      difficulty: 1,
      questions: [
        { q: "What was the weather when they dug?", a: "Very cold", wrong: ["Very hot", "Rainy", "Windy and warm"], why: "A very cold morning." },
        { q: "What did he ﷺ say is the real life?", a: "The life of the Hereafter", wrong: ["Life in a palace", "A long life", "A rich life"], why: "So forgive the Ansar and the Muhajirun." },
        { q: "The companions answered him ﷺ with a promise.", tf: true, why: "We pledged to Muhammad as long as we live." }
      ]
    },
    {
      slug: "rock",
      title: "The rock became sand",
      line: "A huge rock stopped them; he ﷺ struck it, and it became sand.",
      facts: ["A stone on his belly", "Three days without food"],
      source: hadith("bukhari", "4101", "Jabir ibn Abdullah", "Sahih", "A big rock blocked the trench. The Prophet ﷺ came down, a stone tied to his belly from hunger, for they had not eaten for three days; he struck the rock with the spade and it became like sand."),
      difficulty: 2,
      questions: [
        { q: "What happened when he ﷺ struck the rock?", a: "It turned to sand", wrong: ["It broke the spade", "Nothing happened", "Water came out"], why: "Sahih al-Bukhari 4101." },
        { q: "Why was a stone tied to his belly ﷺ?", a: "Hunger", wrong: ["Cold", "An injury", "As a weapon"], why: "They had not eaten for three days." },
        { q: "He ﷺ was as hungry as his companions.", tf: true, why: "He shared their hardship." }
      ]
    },
    {
      slug: "from-above",
      title: "From above and below",
      line: "The armies came from all sides; hearts rose to throats.",
      facts: ["Quran 33:10", "Al-Ahzab: the allies"],
      quote: quranQuote(33, 10),
      source: quran(33, 10, "When they came at you from above and below you, when eyes grew wild and hearts reached the throats, and you thought all kinds of thoughts about Allah."),
      difficulty: 2,
      questions: [
        { q: "From where did the enemies come, as Quran 33:10 says?", a: "From above and below", wrong: ["Only the sea", "Only the east", "From nowhere"], why: "From above you and from below you." },
        { q: "What does the surah's name Al-Ahzab mean?", a: "The allied groups", wrong: ["The trench", "The wind", "The night"], why: "Many tribes joined against Madinah." },
        { q: "The believers felt great fear that day.", tf: true, why: "Hearts reached the throats." }
      ]
    },
    {
      slug: "promised",
      title: "This is what was promised",
      line: "Seeing the armies, the believers said: Allah's promise is true.",
      facts: ["Quran 33:22", "Faith grew stronger"],
      quote: quranQuote(33, 22),
      source: quran(33, 22, "When the believers saw the allied armies, they said: this is what Allah and His Messenger promised us; Allah and His Messenger spoke the truth. It only increased them in faith and submission."),
      difficulty: 2,
      questions: [
        { q: "What did the believers say when they saw the armies?", a: "Allah and His Messenger spoke the truth", wrong: ["Let us run", "We are finished", "Let us surrender"], why: "Quran 33:22." },
        { q: "What did the danger do to their faith?", a: "It increased it", wrong: ["It ended it", "Nothing", "It made them doubt"], why: "It only increased them in faith." },
        { q: "Tests can make true believers stronger.", tf: true, why: "Their faith grew." }
      ]
    },
    {
      slug: "wind",
      title: "The wind and the unseen army",
      line: "Allah sent a wind and armies they could not see.",
      facts: ["Quran 33:9", "The allies went home"],
      quote: quranQuote(33, 9),
      source: quran(33, 9, "Remember Allah's favor when armies came at you: We sent against them a wind and armies you did not see. Allah sees what you do."),
      difficulty: 1,
      questions: [
        { q: "What did Allah send against the allies?", a: "A wind and unseen armies", wrong: ["A flood", "An earthquake", "Snow"], why: "Quran 33:9." },
        { q: "Who were the armies they could not see?", a: "Angels", wrong: ["Jinn", "Romans", "Persians"], why: "Armies you did not see." },
        { q: "The believers won the Trench mainly by fighting.", tf: false, why: "Allah sent the wind, and the allies left." }
      ]
    },
    {
      slug: "turn",
      title: "The tide turns",
      line: "After the Trench he ﷺ said: they will not come at us again.",
      facts: ["The last attack on Madinah"],
      source: hadith("bukhari", "4109", "Sulaiman ibn Surad", "Sahih", "On the day of Al-Ahzab the Prophet ﷺ said: from now on we will go to them, and they will not come to us."),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ say after the Trench?", a: "They will not come at us again", wrong: ["We must leave Madinah", "Build more walls", "Make peace forever"], why: "Sahih al-Bukhari 4109." },
        { q: "What does it show about the Trench?", a: "It was a turning point", wrong: ["It was a loss", "It never ended", "It was in Makkah"], why: "Quraysh never attacked Madinah again." },
        { q: "Quraysh attacked Madinah again after the Trench.", tf: false, why: "It happened as he ﷺ said." }
      ]
    }
  ]
};

const HUDAYBIYAH: DeepUnit = {
  key: "seerah-hudaybiyah",
  topicId: "prophets",
  branchId: "seerah-hudaybiyah",
  branch: { title: "Seerah: Hudaybiyah", description: "The trip for Umrah, the pledge under the tree, a hard treaty, and a clear victory." },
  name: "Hudaybiyah",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "fourteen-hundred",
      title: "Fourteen hundred",
      line: "About 1,400 companions went with him ﷺ to Hudaybiyah.",
      facts: ["Going for Umrah", "Hudaybiyah was a well"],
      source: hadith("bukhari", "4150", "Al-Bara ibn Azib", "Sahih", "We were fourteen hundred with the Prophet ﷺ on the day of Hudaybiyah. Hudaybiyah was a well; we drew it dry. He ﷺ came, sat at its edge, rinsed his mouth with water, made du'a and poured it in, and it gave water for us and our camels."),
      difficulty: 1,
      questions: [
        { q: "How many companions were at Hudaybiyah?", a: "About 1,400", wrong: ["About 40", "About 10,000", "About 300"], why: "Sahih al-Bukhari 4150." },
        { q: "What was Hudaybiyah?", a: "A well near Makkah", wrong: ["A mountain", "A city in Syria", "A ship"], why: "They drew it dry." },
        { q: "After his du'a ﷺ, the dry well gave water again.", tf: true, why: "Enough for them and their camels." }
      ]
    },
    {
      slug: "fingers",
      title: "Water from his fingers",
      line: "With only a small pot, water flowed between his fingers ﷺ.",
      facts: ["Everyone was thirsty", "All made wudu"],
      source: hadith("bukhari", "3576", "Jabir ibn Abdullah", "Sahih", "At Hudaybiyah the people were thirsty and had only a small pot of water. The Prophet ﷺ put his hand in it, and water began to flow between his fingers like springs; we drank and made wudu."),
      difficulty: 2,
      questions: [
        { q: "Where did the water flow from?", a: "Between his fingers ﷺ", wrong: ["A new river", "The sky", "A rock"], why: "Like springs." },
        { q: "What did they use the water for?", a: "Drinking and wudu", wrong: ["Only for camels", "Washing clothes", "Nothing"], why: "Sahih al-Bukhari 3576." },
        { q: "This was a miracle Allah gave him ﷺ.", tf: true, why: "Many companions saw it." }
      ]
    },
    {
      slug: "tree",
      title: "The pledge under the tree",
      line: "Allah was pleased with those who pledged under the tree.",
      facts: ["Quran 48:18", "Bay'at ar-Ridwan"],
      quote: quranQuote(48, 18),
      source: quran(48, 18, "Allah was pleased with the believers when they pledged to you under the tree; He knew what was in their hearts, sent down calm on them, and rewarded them with a near victory."),
      difficulty: 1,
      questions: [
        { q: "Where did they make the pledge?", a: "Under a tree", wrong: ["Inside the Ka'bah", "In a cave", "On a ship"], why: "Quran 48:18." },
        { q: "What is this pledge called?", a: "Bay'at ar-Ridwan", wrong: ["Bay'at al-Aqabah", "Hilf al-Fudul", "Al-Hijrah"], why: "Ridwan: Allah's pleasure." },
        { q: "Allah said He was pleased with them.", tf: true, why: "Allah was pleased with the believers." }
      ]
    },
    {
      slug: "umar-asks",
      title: "Umar's questions",
      line: "Umar asked why accept hard terms. He ﷺ said: I obey Allah.",
      facts: ["Allah will help me"],
      source: hadith("bukhari", "2731", "Al-Miswar and Marwan", "Sahih", "Umar asked: are you not truly Allah's Messenger? Are we not in the right? Then why accept less in our religion? He ﷺ said: I am Allah's Messenger, I do not disobey Him, and He will make me victorious."),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ answer Umar?", a: "I do not disobey Allah", wrong: ["You are right, let us fight", "Go back to Madinah", "I am tired"], why: "And He will make me victorious." },
        { q: "Why was Umar upset?", a: "The terms seemed unfair", wrong: ["He was hungry", "He was ill", "He lost his camel"], why: "He did not yet see the wisdom." },
        { q: "Trusting Allah's command is better than our own feelings.", tf: true, why: "The treaty led to great good." }
      ]
    },
    {
      slug: "clear-victory",
      title: "A clear victory",
      line: "Going home, Allah revealed: We have given you a clear victory.",
      facts: ["Quran 48:1", "Dearer than the world"],
      quote: quranQuote(48, 1),
      source: hadith("bukhari", "4177", "Umar ibn al-Khattab", "Sahih", "On a journey at night he ﷺ said: tonight a surah was revealed to me that is dearer to me than all the sun rises on. Then he recited: We have given you a clear victory."),
      difficulty: 2,
      questions: [
        { q: "What did Allah call the treaty in Quran 48:1?", a: "A clear victory", wrong: ["A loss", "A mistake", "A small deal"], why: "We have given you a clear victory." },
        { q: "How dear was Surah Al-Fath to him ﷺ?", a: "Dearer than all the sun rises on", wrong: ["Like any surah", "Less than gold", "Not dear"], why: "Sahih al-Bukhari 4177." },
        { q: "What looked like a loss was a victory.", tf: true, why: "Allah called it a clear victory." }
      ]
    },
    {
      slug: "real-victory",
      title: "The real victory",
      line: "Al-Bara said: we count the pledge of Ridwan as the real victory.",
      facts: ["Not only the Conquest"],
      source: hadith("bukhari", "4150", "Al-Bara ibn Azib", "Sahih", "You think the victory is the Conquest of Makkah. We count the victory as the pledge of Ridwan on the day of Hudaybiyah."),
      difficulty: 3,
      questions: [
        { q: "What did Al-Bara call the real victory?", a: "The pledge of Ridwan", wrong: ["Badr", "Uhud", "Ta'if"], why: "Sahih al-Bukhari 4150." },
        { q: "What did others think the victory was?", a: "The Conquest of Makkah", wrong: ["The Trench", "Khaybar", "The Hijrah"], why: "Al-Bara answered them." },
        { q: "To the companions, faith and loyalty were a victory.", tf: true, why: "The pledge was the real win." }
      ]
    },
    {
      slug: "seal",
      title: "Letters to kings",
      line: "He ﷺ had a silver ring made to seal his letters to kings.",
      facts: ["Muhammad Rasul Allah", "Kings read sealed letters"],
      source: hadith("bukhari", "65", "Anas ibn Malik", "Sahih", "The Prophet ﷺ wanted to write to rulers and was told they only read sealed letters, so he had a silver ring made, engraved: Muhammad, Messenger of Allah."),
      difficulty: 2,
      questions: [
        { q: "Why did he ﷺ have a ring made?", a: "To seal letters to rulers", wrong: ["As a gift", "For beauty only", "To trade it"], why: "Rulers only read sealed letters." },
        { q: "What was the ring made of?", a: "Silver", wrong: ["Gold", "Iron", "Wood"], why: "Sahih al-Bukhari 65." },
        { q: "The ring said: Muhammad, Messenger of Allah.", tf: true, why: "Anas saw its white shine." }
      ]
    }
  ]
};

const CONQUEST: DeepUnit = {
  key: "seerah-fath",
  topicId: "prophets",
  branchId: "seerah-conquest",
  branch: { title: "Seerah: the Conquest of Makkah", description: "Ten thousand in Ramadan, Surah Al-Fath on his camel, the idols falling, and safety for Makkah." },
  name: "the Conquest of Makkah",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "ten-thousand",
      title: "Ten thousand in Ramadan",
      line: "He ﷺ set out for Makkah in Ramadan with ten thousand.",
      facts: ["Eight years after Hijrah", "He broke his fast"],
      source: hadith("bukhari", "4276", "Ibn Abbas", "Sahih", "The Prophet ﷺ left Madinah in Ramadan with ten thousand, eight and a half years after the Hijrah; he and they were fasting until Al-Kadid, where he broke his fast."),
      difficulty: 1,
      questions: [
        { q: "How many went with him ﷺ to Makkah?", a: "Ten thousand", wrong: ["Three hundred", "One thousand", "Fifty"], why: "Sahih al-Bukhari 4276." },
        { q: "In which month did they set out?", a: "Ramadan", wrong: ["Dhul-Hijjah", "Muharram", "Shawwal"], why: "They were fasting at first." },
        { q: "He ﷺ broke his fast on the journey.", tf: true, why: "At Al-Kadid; a traveler may break the fast." }
      ]
    },
    {
      slug: "reciting",
      title: "Reciting on his camel",
      line: "He ﷺ entered Makkah reciting Surah Al-Fath on his camel.",
      facts: ["A beautiful voice"],
      source: hadith("bukhari", "4281", "Abdullah ibn Mughaffal", "Sahih", "I saw the Messenger of Allah ﷺ on the day of the Conquest on his camel, reciting Surah Al-Fath in a beautiful, repeating voice."),
      difficulty: 2,
      questions: [
        { q: "Which surah did he ﷺ recite on that day?", a: "Al-Fath", wrong: ["Al-Baqarah", "Yasin", "Al-Mulk"], why: "Sahih al-Bukhari 4281." },
        { q: "Where was he ﷺ as he recited?", a: "On his camel", wrong: ["On the minbar", "In a tent", "On the Ka'bah"], why: "Abdullah ibn Mughaffal saw him." },
        { q: "He ﷺ entered Makkah boasting and proud.", tf: false, why: "He entered reciting the Quran." }
      ]
    },
    {
      slug: "idols",
      title: "Truth has come",
      line: "360 idols stood round the Ka'bah. He ﷺ said: truth has come.",
      facts: ["Quran 17:81", "Falsehood vanished"],
      quote: quranQuote(17, 81),
      source: hadith("bukhari", "4287", "Abdullah ibn Mas'ud", "Sahih", "When the Prophet ﷺ entered Makkah on the day of the Conquest, there were 360 idols around the Ka'bah; he struck them with a stick in his hand, saying: truth has come and falsehood has gone."),
      difficulty: 1,
      questions: [
        { q: "How many idols were around the Ka'bah?", a: "360", wrong: ["7", "40", "1,000"], why: "Sahih al-Bukhari 4287." },
        { q: "What did he ﷺ recite as they fell?", a: "Truth has come, falsehood has gone", wrong: ["Allahu akbar only", "We have won", "Run away"], why: "Quran 17:81." },
        { q: "The Ka'bah was made a house for Allah alone again.", tf: true, why: "As Ibrahim built it." }
      ]
    },
    {
      slug: "safe",
      title: "Whoever enters is safe",
      line: "He ﷺ said: whoever enters Abu Sufyan's house is safe.",
      facts: ["Mercy in victory"],
      source: hadith("muslim", "1780a", "Abu Hurairah", "Sahih", "On the day of the Conquest, Abu Sufyan worried for Quraysh; the Messenger of Allah ﷺ said: whoever enters the house of Abu Sufyan is safe."),
      difficulty: 2,
      questions: [
        { q: "Whose house did he ﷺ make a place of safety?", a: "Abu Sufyan's", wrong: ["Abu Lahab's", "Abu Jahl's", "His own only"], why: "Sahih Muslim 1780a." },
        { q: "What does this show on the day of victory?", a: "Mercy", wrong: ["Revenge", "Pride", "Greed"], why: "He gave safety to old enemies." },
        { q: "Abu Sufyan had once been an enemy of Islam.", tf: true, why: "Yet his house became a place of safety." }
      ]
    },
    {
      slug: "nasr",
      title: "When Allah's help comes",
      line: "Surah An-Nasr: help came, and people entered Islam in crowds.",
      facts: ["Quran 110:1-2", "Then glorify and repent"],
      quote: quranQuote(110, 2),
      source: quran(110, 2, "When the help of Allah and the victory come, and you see people entering Allah's religion in crowds, glorify your Lord with praise and ask His forgiveness."),
      difficulty: 1,
      questions: [
        { q: "How did people enter Islam, as Surah An-Nasr says?", a: "In crowds", wrong: ["One by one, secretly", "Not at all", "Only kings"], why: "Quran 110:2." },
        { q: "What should a believer do after success?", a: "Praise Allah and ask forgiveness", wrong: ["Boast", "Rest forever", "Take revenge"], why: "Glorify your Lord and seek forgiveness." },
        { q: "Success is a time to be humble before Allah.", tf: true, why: "That is the lesson of An-Nasr." }
      ]
    }
  ]
};

const FAREWELL: DeepUnit = {
  key: "seerah-wada",
  topicId: "prophets",
  branchId: "seerah-farewell",
  branch: { title: "Seerah: the Farewell Hajj and his passing", description: "His last Hajj and sermon, the religion completed, his last days, and his last words ﷺ." },
  name: "his ﷺ last year",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "sacred",
      title: "As sacred as this day",
      line: "At his last Hajj he ﷺ said: your blood and wealth are sacred.",
      facts: ["On the day of sacrifice", "Like this day and city"],
      source: hadith("bukhari", "1739", "Ibn Abbas", "Sahih", "On the day of sacrifice he ﷺ asked: what day is this? What city? What month? They said: sacred. He said: your blood, your wealth and your honor are sacred to one another, like this day, in this city, in this month."),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ say are sacred between Muslims?", a: "Blood, wealth and honor", wrong: ["Only gold", "Only land", "Only names"], why: "Sahih al-Bukhari 1739." },
        { q: "Why did he ﷺ first ask about the day, city and month?", a: "To show how sacred they are", wrong: ["He forgot them", "To test their memory only", "To start a game"], why: "Our rights are just as sacred." },
        { q: "Harming a Muslim's honor is a small thing.", tf: false, why: "It is as sacred as the day of Hajj." }
      ]
    },
    {
      slug: "convey",
      title: "Let them pass it on",
      line: "He ﷺ said: let those present tell those who are absent.",
      facts: ["Every Muslim passes it on"],
      source: hadith("bukhari", "1739", "Ibn Abbas", "Sahih", "He ﷺ said: O Allah, have I conveyed? Then: let those present tell those who are absent, and do not go back to disbelief after me, striking one another's necks."),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ ask those present to do?", a: "Tell those who were absent", wrong: ["Keep it secret", "Write it on gold", "Forget it"], why: "So the message reaches everyone." },
        { q: "What did he ﷺ warn them against after him?", a: "Fighting one another", wrong: ["Trading", "Traveling", "Fasting"], why: "Do not go back to disbelief, fighting each other." },
        { q: "Passing on what we learn is part of Islam.", tf: true, why: "Let those present tell those absent." }
      ]
    },
    {
      slug: "book",
      title: "Hold on to the Book",
      line: "Hold on to the Book of Allah, he ﷺ said, and never stray.",
      facts: ["At Arafah", "O Allah, be witness"],
      source: hadith("muslim", "1218", "Jabir ibn Abdullah", "Sahih", "At Arafah he ﷺ said: I have left among you something; if you hold on to it you will never go astray: the Book of Allah. You will be asked about me, so what will you say? They said: you conveyed, fulfilled and advised. He said: O Allah, be witness."),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ leave so we will not go astray?", a: "The Book of Allah", wrong: ["A palace", "Gold", "A sword"], why: "Sahih Muslim 1218." },
        { q: "What did the people say he ﷺ had done?", a: "Conveyed the message", wrong: ["Nothing", "Built cities", "Become king"], why: "You conveyed, fulfilled and advised." },
        { q: "He ﷺ asked Allah to be witness.", tf: true, why: "O Allah, be witness." }
      ]
    },
    {
      slug: "perfected",
      title: "The religion completed",
      line: "On Friday at Arafah came: today I perfected your religion.",
      facts: ["Quran 5:3", "Friday at Arafah"],
      source: hadith("bukhari", "45", "Umar ibn al-Khattab", "Sahih", "A Jewish man told Umar: if the ayah 'today I have perfected your religion for you' had come to us, we would make that day a festival. Umar said: we know the day and place: the Prophet ﷺ was standing at Arafah on a Friday."),
      difficulty: 2,
      questions: [
        { q: "Where was he ﷺ when 'today I perfected your religion' came?", a: "At Arafah", wrong: ["In Madinah", "In Hira", "In Ta'if"], why: "Sahih al-Bukhari 45." },
        { q: "On which day of the week did it come?", a: "Friday", wrong: ["Monday", "Sunday", "Tuesday"], why: "Umar knew the day and the place." },
        { q: "Islam was completed in the Prophet's ﷺ lifetime.", tf: true, why: "Today I have perfected your religion." }
      ]
    },
    {
      slug: "abu-bakr-leads",
      title: "Tell Abu Bakr to lead",
      line: "In his last illness he ﷺ said: let Abu Bakr lead the prayer.",
      facts: ["Said more than once"],
      source: hadith("bukhari", "664", "Aishah", "Sahih", "In his last illness, when the adhan was called, he ﷺ said: tell Abu Bakr to lead the people in prayer. They said Abu Bakr was soft-hearted; he said it again, and again."),
      difficulty: 2,
      questions: [
        { q: "Who did he ﷺ ask to lead the prayer in his illness?", a: "Abu Bakr", wrong: ["Umar", "Ali", "Bilal"], why: "Sahih al-Bukhari 664." },
        { q: "What did people say about Abu Bakr?", a: "He was soft-hearted", wrong: ["He was away", "He was too young", "He did not know the Quran"], why: "They feared he could not stand in his place." },
        { q: "He ﷺ repeated the order more than once.", tf: true, why: "He said it again." }
      ]
    },
    {
      slug: "last-look",
      title: "His last smile",
      line: "On Monday he ﷺ looked at the rows in prayer and smiled.",
      facts: ["Abu Bakr leading", "Face like a Quran page"],
      source: hadith("bukhari", "680", "Anas ibn Malik", "Sahih", "Abu Bakr led the prayers in his illness until Monday; as the people stood in rows, the Prophet ﷺ lifted the curtain of his room and looked at us, his face like a page of the Quran, and smiled."),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ see when he lifted the curtain?", a: "The people praying in rows", wrong: ["An empty masjid", "A market", "A battle"], why: "Sahih al-Bukhari 680." },
        { q: "What did he ﷺ do when he saw them?", a: "He smiled", wrong: ["He wept", "He called out", "He left"], why: "Happy to see his ummah praying." },
        { q: "His face was like a page of the Quran.", tf: true, why: "Anas described it so." }
      ]
    },
    {
      slug: "highest-companion",
      title: "The highest companion",
      line: "His last words ﷺ: O Allah, with the highest companion.",
      facts: ["His head on Aishah's lap", "Prophets are given a choice"],
      source: hadith("bukhari", "4463", "Aishah", "Sahih", "He ﷺ used to say: no prophet dies until he is shown his place in Paradise and given a choice. When death came, with his head on my thigh, he looked up and said: O Allah, with the highest companion."),
      difficulty: 2,
      questions: [
        { q: "What were his last words ﷺ?", a: "O Allah, with the highest companion", wrong: ["Farewell, Makkah", "Bring me water", "Call Abu Bakr"], why: "Sahih al-Bukhari 4463." },
        { q: "What is every prophet given before death?", a: "A choice", wrong: ["A crown", "A letter", "Nothing"], why: "After being shown his place in Paradise." },
        { q: "He ﷺ chose to be with Allah.", tf: true, why: "The highest companion." }
      ]
    },
    {
      slug: "sixty-three",
      title: "Sixty-three years",
      line: "He ﷺ passed away at sixty-three years old.",
      facts: ["Age 63"],
      source: hadith("bukhari", "3536", "Aishah", "Sahih", "Aishah said: the Prophet ﷺ died when he was sixty-three years old."),
      difficulty: 1,
      questions: [
        { q: "How old was he ﷺ when he passed away?", a: "Sixty-three", wrong: ["Forty", "Fifty", "Eighty"], why: "Sahih al-Bukhari 3536." },
        { q: "Who told us his age?", a: "Aishah", wrong: ["Abu Lahab", "Heraclius", "Waraqah"], why: "His wife." },
        { q: "His message stayed after him, in the Quran and Sunnah.", tf: true, why: "He left us the Book of Allah." }
      ]
    }
  ]
};

const CHARACTER: DeepUnit = {
  key: "seerah-khuluq",
  topicId: "prophets",
  branchId: "seerah-character",
  branch: { title: "Seerah: his character ﷺ", description: "What he was like at home and with people: gentle, shy, smiling, easygoing and fair." },
  name: "his ﷺ character",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "great-character",
      title: "A great character",
      line: "Allah says: you are truly of a great character.",
      facts: ["Quran 68:4"],
      quote: quranQuote(68, 4),
      source: quran(68, 4, "And you are truly of a great character."),
      difficulty: 1,
      questions: [
        { q: "How does Allah describe his character ﷺ?", a: "Great", wrong: ["Harsh", "Ordinary", "Proud"], why: "Quran 68:4." },
        { q: "Who praised his character ﷺ in the Quran?", a: "Allah", wrong: ["Quraysh", "The Romans", "The poets"], why: "You are truly of a great character." },
        { q: "Good character is part of following him ﷺ.", tf: true, why: "He is our example." }
      ]
    },
    {
      slug: "quran-character",
      title: "His character was the Quran",
      line: "Aishah said: his character ﷺ was the Quran.",
      facts: ["He lived what it taught"],
      source: hadith("muslim", "746a", "Aishah", "Sahih", "Sa'd ibn Hisham asked Aishah about the character of the Messenger of Allah ﷺ. She said: do you not read the Quran? His character was the Quran."),
      difficulty: 1,
      questions: [
        { q: "What did Aishah say his character ﷺ was?", a: "The Quran", wrong: ["Like a king's", "Strict", "Unknown"], why: "Sahih Muslim 746a." },
        { q: "What does this mean?", a: "He lived what the Quran taught", wrong: ["He only read it", "He kept it hidden", "He changed it"], why: "Its teachings were his manners." },
        { q: "To learn his character, read the Quran.", tf: true, why: "That was Aishah's advice." }
      ]
    },
    {
      slug: "easier",
      title: "He chose the easier way",
      line: "Given two choices, he ﷺ chose the easier, unless it was a sin.",
      facts: ["No revenge for himself"],
      source: hadith("bukhari", "3560", "Aishah", "Sahih", "Whenever the Messenger of Allah ﷺ had a choice of two things, he chose the easier unless it was a sin; and he never took revenge for himself, only when Allah's limits were broken."),
      difficulty: 2,
      questions: [
        { q: "Which choice did he ﷺ usually take?", a: "The easier one, if not a sin", wrong: ["Always the hardest", "The most expensive", "Whatever others chose"], why: "Sahih al-Bukhari 3560." },
        { q: "Did he ﷺ take revenge for himself?", a: "Never", wrong: ["Always", "Sometimes", "Only on Fridays"], why: "Only for Allah's limits." },
        { q: "Islam likes making things easy for people.", tf: true, why: "He chose ease when it was allowed." }
      ]
    },
    {
      slug: "food",
      title: "He never faulted food",
      line: "He ﷺ never criticized food: he ate it, or left it quietly.",
      facts: ["No complaining"],
      source: hadith("bukhari", "3563", "Abu Hurairah", "Sahih", "The Prophet ﷺ never criticized any food; if he liked it he ate it, and if not, he left it."),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ do with food he did not like?", a: "Left it quietly", wrong: ["Complained loudly", "Threw it away", "Sent it back angry"], why: "Sahih al-Bukhari 3563." },
        { q: "Did he ﷺ ever criticize food?", a: "Never", wrong: ["Often", "Only at feasts", "Only at home"], why: "He ate it or left it." },
        { q: "We can follow this at every meal.", tf: true, why: "No complaining about food." }
      ]
    },
    {
      slug: "shy",
      title: "Shyer than a young girl",
      line: "He ﷺ was shyer than a young girl behind her curtain.",
      facts: ["Haya: modesty"],
      source: hadith("bukhari", "3562", "Abu Sa'id al-Khudri", "Sahih", "The Prophet ﷺ was more shy than a young girl behind her curtain."),
      difficulty: 1,
      questions: [
        { q: "How shy was he ﷺ?", a: "Shyer than a young girl in her room", wrong: ["Not shy at all", "Only sometimes", "Shy only with kings"], why: "Sahih al-Bukhari 3562." },
        { q: "What is haya?", a: "Modesty and shyness from wrong", wrong: ["Anger", "Pride", "Laziness"], why: "A beautiful part of faith." },
        { q: "Being shy from wrong is a good quality.", tf: true, why: "He ﷺ had it most of all." }
      ]
    },
    {
      slug: "smiled",
      title: "Always smiling",
      line: "A companion said: I never saw anyone smile more than him ﷺ.",
      facts: ["He smiled most"],
      source: hadith("tirmidhi", "3641", "Abdullah ibn al-Harith ibn Jaz", "Sahih", "I have not seen anyone who smiled more than the Messenger of Allah ﷺ."),
      difficulty: 1,
      questions: [
        { q: "Who smiled more than anyone, a companion said?", a: "The Messenger of Allah ﷺ", wrong: ["Abu Jahl", "Heraclius", "The poets"], why: "Jami at-Tirmidhi 3641." },
        { q: "What can we learn from his smile ﷺ?", a: "Meet people cheerfully", wrong: ["Always frown", "Avoid people", "Smile only for gifts"], why: "Kindness starts with a smile." },
        { q: "He ﷺ was known as gloomy and stern.", tf: false, why: "No one smiled more than him." }
      ]
    }
  ]
};

export const SEERAH_UNITS: readonly DeepUnit[] = [EARLY, REVELATION, MAKKAH, TAIF, ISRA, HIJRAH, BADR, UHUD, TRENCH, HUDAYBIYAH, CONQUEST, FAREWELL, CHARACTER];
