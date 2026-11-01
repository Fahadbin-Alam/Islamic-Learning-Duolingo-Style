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

export const SEERAH_UNITS: readonly DeepUnit[] = [EARLY, REVELATION, MAKKAH, TAIF, ISRA, HIJRAH];
