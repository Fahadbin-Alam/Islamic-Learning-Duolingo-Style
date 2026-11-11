import { hadith, quran, quranQuote, type DeepUnit } from "./deepKit";

// More deep units for the Prayer topic: wudu as the Prophet ﷺ made it, the reward of the adhan, the night prayer,
// and how Allah made salah easy for the sick and the traveller. Every card is one ayah or one sahih hadith
// (number as sunnah.com gives it), with its exact English words to highlight. Only what is agreed on.

const WUDU: DeepUnit = {
  key: "pray-wudu-sunnah",
  topicId: "prayer",
  branchId: "prayer-wudu-sunnah",
  branch: { title: "Wudu like the Prophet ﷺ", description: "How he ﷺ washed for salah, and the light wudu leaves on the believers." },
  name: "wudu like the Prophet ﷺ",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "four-parts",
      title: "The four parts of wudu",
      line: "Wash the face, the arms, wipe the head, wash the feet.",
      facts: ["Quran 5:6", "Arms up to the elbows", "Feet up to the ankles"],
      quote: quranQuote(5, 6),
      source: quran(5, 6, "O you who believe, when you rise for prayer, wash your faces and your arms up to the elbows, wipe your heads, and wash your feet up to the ankles."),
      difficulty: 1,
      questions: [
        { q: "When does Quran 5:6 tell us to make wudu?", a: "When we rise for prayer", wrong: ["Only on Friday", "Only in Ramadan", "Only after eating"], why: "When you rise for prayer, wash your faces." },
        { q: "How far are the arms washed?", a: "Up to the elbows", wrong: ["Only the fingers", "Up to the wrists", "Up to the shoulders"], why: "Your arms up to the elbows." },
        { q: "What is done to the head in wudu?", a: "It is wiped", wrong: ["It is shaved", "It is covered", "It is skipped"], why: "Wipe your heads." },
        { q: "In wudu the feet are washed up to the ankles.", tf: true, why: "Wash your feet up to the ankles." }
      ]
    },
    {
      slug: "uthman-shows",
      title: "Uthman shows the way",
      line: "Uthman washed each part three times, as he ﷺ did.",
      facts: ["Told by Humran", "Then two rak'ahs with focus"],
      source: hadith("bukhari", "159", "Humran", "Sahih", "Uthman washed his hands three times, rinsed his mouth and nose, washed his face and arms three times, wiped his head and washed his feet three times. He said: whoever makes wudu like mine and prays two rak'ahs without his mind wandering, his past sins are forgiven.", "If anyone performs ablution like that of mine"),
      difficulty: 1,
      questions: [
        { q: "What did Uthman wash first?", a: "His hands", wrong: ["His feet", "His head", "His back"], why: "He poured water over his hands and washed them thrice." },
        { q: "How many times did Uthman wash his face?", a: "Three times", wrong: ["Ten times", "Not at all", "Seven times"], why: "He washed his face and forearms thrice." },
        { q: "What is forgiven for wudu like his, then two focused rak'ahs?", a: "Past sins", wrong: ["Nothing at all", "Only the next prayer", "Only debts"], why: "His past sins will be forgiven." },
        { q: "Uthman learned this wudu by watching the Prophet ﷺ.", tf: true, why: "He said: I saw the Prophet ﷺ make wudu like this." }
      ]
    },
    {
      slug: "once-is-enough",
      title: "Once is enough too",
      line: "He ﷺ sometimes washed each part only once.",
      facts: ["Told by Ibn Abbas", "Twice each, told by Abdullah bin Zaid"],
      source: hadith("bukhari", "157", "Ibn Abbas", "Sahih", "The Prophet ﷺ made wudu washing each part only once. Other times he washed each part twice, and other times three times.", "performed ablution by washing the body parts only once"),
      difficulty: 1,
      questions: [
        { q: "How many times did he ﷺ wash each part in Bukhari 157?", a: "Only once", wrong: ["Five times", "Ten times", "Never"], why: "Washing the body parts only once." },
        { q: "Who told us about the wudu with each part washed once?", a: "Ibn Abbas", wrong: ["Anas", "Abu Hurairah", "Jabir"], why: "Narrated by Ibn Abbas." },
        { q: "Wudu with each part washed once is still a correct wudu.", tf: true, why: "He ﷺ did it himself, so it is from the sunnah." }
      ]
    },
    {
      slug: "a-handful",
      title: "One handful at a time",
      line: "Ibn Abbas used one handful of water for each part.",
      facts: ["Told by Ata bin Yasar", "Right side first"],
      source: hadith("bukhari", "140", "Ata bin Yasar", "Sahih", "Ibn Abbas took a handful of water for his mouth and nose, a handful for his face, a handful for each arm, wiped his head, then a handful for each foot. He said: I saw the Messenger of Allah ﷺ make wudu like this.", "took another handful of water and washed his right forearm"),
      difficulty: 2,
      questions: [
        { q: "Which arm did Ibn Abbas wash first?", a: "His right forearm", wrong: ["His left forearm", "Neither arm", "Both at the end"], why: "He washed his right forearm, then his left." },
        { q: "How much water did he take for each part?", a: "A handful", wrong: ["A full bucket", "A whole river", "None at all"], why: "He ladled out a handful of water." },
        { q: "Wudu needs only a little water, not a lot.", tf: true, why: "A handful for each part was enough." }
      ]
    },
    {
      slug: "shining-faces",
      title: "Shining on Judgment Day",
      line: "Wudu will make the believers' faces and limbs shine.",
      facts: ["Told by Abu Hurairah", "Al-Ghurr al-Muhajjalun"],
      source: hadith("bukhari", "136", "Abu Hurairah", "Sahih", "On the Day of Resurrection my ummah will be called the ones with shining faces and limbs, from the traces of wudu. So whoever can increase his shine, let him do so.", "whoever can increase the area of his radiance should do so"),
      difficulty: 2,
      questions: [
        { q: "What will shine on the believers on Judgment Day?", a: "Their faces and limbs", wrong: ["Their shoes", "Their houses", "Their money"], why: "From the trace of ablution." },
        { q: "What leaves that shining trace?", a: "Wudu", wrong: ["Gold", "Sunlight", "Perfume"], why: "From the traces of wudu." },
        { q: "Making wudu often adds to the believer's light.", tf: true, why: "Whoever can increase his radiance should do so." }
      ]
    },
    {
      slug: "eight-gates",
      title: "Eight gates open",
      line: "Say the shahadah after wudu, and eight gates of Jannah open.",
      facts: ["Told by Umar", "Jami at-Tirmidhi 55"],
      source: hadith("tirmidhi", "55", "Umar bin Al-Khattab", "Sahih", "Whoever makes wudu well, then says: I testify that none has the right to be worshipped but Allah alone, and that Muhammad is His servant and Messenger; O Allah, make me among those who repent and those who purify themselves, then the eight gates of Paradise are opened for him.", "Then eight gates of Paradise are opened for him, that may enter by whichever of them wishes"),
      difficulty: 2,
      questions: [
        { q: "How many gates of Jannah open for him?", a: "Eight gates", wrong: ["One gate", "Three gates", "Twenty gates"], why: "Then eight gates of Paradise are opened for him." },
        { q: "What does he say after wudu?", a: "The shahadah and a du'a", wrong: ["Nothing", "A poem", "A joke"], why: "I testify that none has the right to be worshipped but Allah." },
        { q: "In the du'a we ask Allah to make us among those who purify themselves.", tf: true, why: "Make me among those who purify themselves." },
        { q: "Which gate may he enter?", a: "Whichever gate he wishes", wrong: ["Only the last gate", "No gate", "Only a small gate"], why: "He may enter by whichever of them he wishes." }
      ]
    }
  ]
};

const ADHAN: DeepUnit = {
  key: "pray-adhan-reward",
  topicId: "prayer",
  branchId: "prayer-adhan-reward",
  branch: { title: "The reward of the adhan", description: "How the adhan began with Bilal, what to say when you hear it, and its reward." },
  name: "the reward of the adhan",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "first-adhan",
      title: "Bilal calls the first adhan",
      line: "In Madinah, Bilal was told to stand and call the adhan.",
      facts: ["Told by Ibn Umar", "Umar said: let a man call"],
      source: hadith("bukhari", "604", "Ibn Umar", "Sahih", "In Madinah the Muslims used to gather and guess the prayer time. Some said use a bell, others a horn. Umar said a man should call the people, so the Messenger of Allah ﷺ told Bilal to stand and call the adhan.", "ordered Bilal to get up and pronounce the Adhan for prayers"),
      difficulty: 1,
      questions: [
        { q: "Who was told to call the first adhan?", a: "Bilal", wrong: ["Abu Hurairah", "Anas", "Ibn Abbas"], why: "He ordered Bilal to get up and pronounce the adhan." },
        { q: "Who first said a man should call people to prayer?", a: "Umar", wrong: ["Uthman", "Abu Dharr", "Bilal"], why: "Umar was the first to suggest that a man should call." },
        { q: "Before the adhan, people had to guess the prayer time.", tf: true, why: "They used to guess the time for it." },
        { q: "The Muslims chose a bell like a church bell.", tf: false, why: "They chose a human voice calling the adhan." }
      ]
    },
    {
      slug: "say-what-he-says",
      title: "Repeat after the caller",
      line: "When you hear the adhan, say what the caller says.",
      facts: ["Told by Abu Sa'id al-Khudri"],
      source: hadith("bukhari", "611", "Abu Sa'id Al-Khudri", "Sahih", "Whenever you hear the adhan, say what the mu'adhdhin is saying.", "Whenever you hear the Adhan, say what the"),
      difficulty: 1,
      questions: [
        { q: "What should you do when you hear the adhan?", a: "Say what the caller says", wrong: ["Keep talking", "Turn up music", "Run away"], why: "Say what the mu'adhdhin is saying." },
        { q: "Who is the mu'adhdhin?", a: "The one who calls the adhan", wrong: ["The one who sells food", "The one who sleeps", "The one who drives"], why: "Mu'adhdhin means the caller of the adhan." },
        { q: "Repeating the adhan is a way to share its reward.", tf: true, why: "We take part by saying the same words." }
      ]
    },
    {
      slug: "dua-after-adhan",
      title: "The du'a after the adhan",
      line: "Ask Allah for al-wasilah for him ﷺ after the adhan.",
      facts: ["Told by Jabir", "Allahumma Rabba hadhihi-d-da'wati-t-tammah"],
      source: hadith("bukhari", "614", "Jabir ibn Abdullah", "Sahih", "Whoever after hearing the adhan says: O Allah, Lord of this perfect call and the prayer about to be established, give Muhammad al-wasilah and the virtue, and raise him to the praised station You promised him, my intercession is his on the Day of Resurrection.", "then my intercession for him will be allowed on the Day of Resurrection"),
      difficulty: 2,
      questions: [
        { q: "What does the du'a ask for him ﷺ?", a: "Al-wasilah and the praised station", wrong: ["Gold and silver", "A big palace on earth", "A long holiday"], why: "Give Muhammad al-wasilah and raise him to the praised station." },
        { q: "What does the one who says it receive?", a: "His ﷺ intercession", wrong: ["Nothing", "A new car", "Only praise from people"], why: "My intercession for him will be allowed." },
        { q: "We say the du'a when the adhan is finished.", tf: true, why: "After listening to the adhan." }
      ]
    },
    {
      slug: "everything-hears",
      title: "Every creature is a witness",
      line: "Everyone who hears your adhan will be a witness for you.",
      facts: ["Told by Abu Sa'id al-Khudri", "Even out with the sheep"],
      source: hadith("bukhari", "609", "Abdur-Rahman", "Sahih", "Abu Sa'id said: when you are with your sheep in the open land, raise your voice with the adhan, for every human, jinn or other creature that hears it will be a witness for you on the Day of Resurrection. He heard it from the Messenger of Allah ﷺ.", "whether a human being, a jinn or any other creature, will be a witness for you on the Day of Resurrection"),
      difficulty: 2,
      questions: [
        { q: "Where might a shepherd call the adhan?", a: "Out with his sheep", wrong: ["Only in a palace", "Under the sea", "Never alone"], why: "When you are with your sheep or in the wilderness." },
        { q: "Who will be a witness for the caller?", a: "Every creature that hears it", wrong: ["No one", "Only his family", "Only kings"], why: "A human being, a jinn or any other creature." },
        { q: "Abu Sa'id said to raise your voice with the adhan.", tf: true, why: "Raise your voice in doing so." }
      ]
    },
    {
      slug: "draw-lots",
      title: "They would draw lots",
      line: "If people knew the adhan's reward, they would draw lots.",
      facts: ["Told by Abu Hurairah", "And for the first row"],
      source: hadith("bukhari", "615", "Abu Huraira", "Sahih", "If people knew the reward of the adhan and of the first row, and found no way to get it except by drawing lots, they would draw lots. If they knew the reward of Isha and Fajr in congregation, they would come even if they had to crawl.", "and found no other way to get that except by drawing lots they would draw lots"),
      difficulty: 2,
      questions: [
        { q: "Which row has a great reward?", a: "The first row", wrong: ["The last row", "No row at all", "Outside the masjid"], why: "Standing in the first row." },
        { q: "What would people do to win the adhan?", a: "Draw lots", wrong: ["Stay home", "Give up", "Sleep in"], why: "They would draw lots." },
        { q: "For Isha and Fajr together, people would come even crawling.", tf: true, why: "They would come even if they had to crawl." }
      ]
    }
  ]
};

const NIGHT: DeepUnit = {
  key: "pray-night",
  topicId: "prayer",
  branchId: "prayer-night",
  branch: { title: "The night prayer", description: "Tahajjud: how the Prophet ﷺ prayed at night, and why he did it." },
  name: "the night prayer",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "praised-station",
      title: "Pray in the night",
      line: "Pray tahajjud at night, as an extra gift for yourself.",
      facts: ["Quran 17:79", "Al-maqam al-mahmud"],
      quote: quranQuote(17, 79),
      source: quran(17, 79, "And in part of the night, pray tahajjud as something extra for you; it may be that your Lord will raise you to a praised station."),
      difficulty: 1,
      questions: [
        { q: "When is tahajjud prayed?", a: "In part of the night", wrong: ["At noon", "At sunset only", "During breakfast"], why: "And in part of the night, pray tahajjud." },
        { q: "What does Allah promise in Quran 17:79?", a: "A praised station", wrong: ["A new house", "A big army", "Fame on earth"], why: "Your Lord may raise you to a praised station." },
        { q: "Tahajjud is an extra prayer, beyond the five.", tf: true, why: "As something extra for you." }
      ]
    },
    {
      slug: "thankful-servant",
      title: "A thankful servant",
      line: "He ﷺ prayed till his feet swelled, to thank Allah.",
      facts: ["Told by Al-Mughirah", "Should I not be thankful?"],
      source: hadith("bukhari", "1130", "Al-Mughirah ibn Shubah", "Sahih", "The Prophet ﷺ used to stand in prayer until his feet swelled. He was asked why, and he said: should I not be a thankful servant?", "pray till both his feet or legs swelled"),
      difficulty: 1,
      questions: [
        { q: "Why did he ﷺ pray so long at night?", a: "To be a thankful servant", wrong: ["To be seen", "To win a prize", "He had no bed"], why: "Should I not be a thankful slave?" },
        { q: "What happened to his feet from standing long?", a: "They swelled", wrong: ["They froze", "They got shoes", "Nothing"], why: "He prayed till both his feet swelled." },
        { q: "Night prayer is a way to thank Allah.", tf: true, why: "He ﷺ called it being a thankful servant." }
      ]
    },
    {
      slug: "eleven",
      title: "Long and beautiful",
      line: "His night prayer was long and beautiful, eleven rak'ahs.",
      facts: ["Told by Aishah", "My heart stays awake"],
      source: hadith("bukhari", "1147", "Abu Salma bin Abdur Rahman", "Sahih", "Aishah said: in Ramadan and other months he ﷺ did not pray more than eleven rak'ahs at night: four, do not ask how beautiful and long, then four, then three. She asked: do you sleep before witr? He said: my eyes sleep but my heart stays awake.", "My eyes sleep but my heart remains awake"),
      difficulty: 2,
      questions: [
        { q: "How many rak'ahs did he ﷺ pray at night?", a: "Eleven", wrong: ["Two", "Forty", "One hundred"], why: "He never exceeded eleven rak'at." },
        { q: "How did Aishah describe those rak'ahs?", a: "Beautiful and long", wrong: ["Short and rushed", "Loud and fast", "Boring"], why: "Do not ask me about their beauty and length." },
        { q: "He ﷺ said: my eyes sleep but my heart stays awake.", tf: true, why: "My eyes sleep but my heart remains awake." }
      ]
    },
    {
      slug: "prayer-of-dawud",
      title: "The prayer of Dawud",
      line: "The prayer Allah loves most is the prayer of Dawud.",
      facts: ["Told by Abdullah ibn Amr", "Slept half, prayed a third"],
      source: hadith("bukhari", "1131", "Abdullah ibn Amr", "Sahih", "The most beloved prayer to Allah is the prayer of Dawud, and the most beloved fast is the fast of Dawud. He slept half the night, prayed a third of it, and slept its sixth; and he fasted every other day.", "The most beloved prayer to Allah is that of David and the most beloved fasts to Allah are those of David"),
      difficulty: 2,
      questions: [
        { q: "Whose night prayer does Allah love most?", a: "Prophet Dawud", wrong: ["Prophet Sulayman", "Prophet Musa", "Prophet Yunus"], why: "The most beloved prayer to Allah is that of David." },
        { q: "How much of the night did Dawud pray?", a: "A third", wrong: ["None of it", "All of it", "One minute"], why: "Then pray for one third of the night." },
        { q: "Dawud also slept part of the night.", tf: true, why: "He slept half the night, then prayed, then slept again." }
      ]
    },
    {
      slug: "leave-their-beds",
      title: "They leave their beds",
      line: "Believers leave their beds to call on Allah at night.",
      facts: ["Quran 32:16", "In fear and in hope"],
      quote: quranQuote(32, 16),
      source: quran(32, 16, "Their sides leave their beds; they call upon their Lord in fear and hope, and they spend from what We have given them."),
      difficulty: 2,
      questions: [
        { q: "What do the believers leave at night?", a: "Their beds", wrong: ["Their prayers", "Their faith", "Their families"], why: "Their sides leave their beds." },
        { q: "How do they call on their Lord?", a: "In fear and hope", wrong: ["In anger", "In boredom", "In pride"], why: "They call upon their Lord in fear and hope." },
        { q: "Quran 32:16 also praises spending from what Allah gave.", tf: true, why: "They spend from what We have given them." }
      ]
    }
  ]
};

const EASY: DeepUnit = {
  key: "pray-easy",
  topicId: "prayer",
  branchId: "prayer-made-easy",
  branch: { title: "Salah made easy", description: "Praying when you are ill or travelling: Allah never asks more than you can do." },
  name: "salah made easy",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "no-burden",
      title: "Only what you can bear",
      line: "Allah asks no soul for more than it can bear.",
      facts: ["Quran 2:286", "The end of Al-Baqarah"],
      quote: quranQuote(2, 286),
      source: quran(2, 286, "Allah does not burden a soul beyond what it can bear."),
      difficulty: 1,
      questions: [
        { q: "Does Allah ask for more than we can bear?", a: "No, never", wrong: ["Yes, always", "Only on Mondays", "Only for kids"], why: "Allah does not burden a soul beyond what it can bear." },
        { q: "Which surah ends with Quran 2:286?", a: "Al-Baqarah", wrong: ["Al-Ikhlas", "An-Nas", "Al-Kawthar"], why: "It is the last ayah of Surah Al-Baqarah." },
        { q: "Islam's rules fit what a person is able to do.", tf: true, why: "No soul is burdened beyond what it can bear." }
      ]
    },
    {
      slug: "stand-sit-side",
      title: "Stand, sit or lie down",
      line: "Pray standing; if you can't, sitting; else on your side.",
      facts: ["Told by Imran ibn Husayn", "He was ill"],
      source: hadith("bukhari", "1117", "Imran ibn Husayn", "Sahih", "Imran was ill and asked the Prophet ﷺ about the prayer. He said: pray standing; if you cannot, then sitting; and if you cannot, then lying on your side.", "if you cannot do even that, then pray Lying on your side"),
      difficulty: 1,
      questions: [
        { q: "How should a sick person pray who cannot stand?", a: "Sitting down", wrong: ["Not at all", "Only next year", "Only at night"], why: "If you can't, pray while sitting." },
        { q: "And if he cannot even sit?", a: "Lying on his side", wrong: ["Skip it forever", "Standing anyway", "Ask someone to pray for him"], why: "Then pray lying on your side." },
        { q: "A sick person still prays in the way he is able.", tf: true, why: "Standing, then sitting, then lying down." }
      ]
    },
    {
      slug: "two-on-a-journey",
      title: "Two rak'ahs on a journey",
      line: "On a journey, four-rak'ah prayers are shortened to two.",
      facts: ["Told by Aishah", "Quran 4:101"],
      source: hadith("bukhari", "1090", "Aishah", "Sahih", "Aishah said: when the prayers were first made a duty they were two rak'ahs each. Later the prayer on a journey stayed as it was, and the prayer at home was made complete.", "Later the prayer in a journey was kept as it was but the prayers for non-travelers were completed"),
      difficulty: 2,
      questions: [
        { q: "How many rak'ahs is Dhuhr on a journey?", a: "Two", wrong: ["Six", "Ten", "None"], why: "The prayer in a journey was kept as it was: two." },
        { q: "Who told us how the travel prayer began?", a: "Aishah", wrong: ["Anas", "Ibn Umar", "Abu Hurairah"], why: "Narrated by Aishah." },
        { q: "Shortening on a journey is a gift that makes travel easier.", tf: true, why: "Allah made the journey prayer lighter." }
      ]
    },
    {
      slug: "on-his-mount",
      title: "Praying on his camel",
      line: "He ﷺ prayed extra prayers riding, facing his camel's way.",
      facts: ["Told by Jabir", "Only the extra prayers"],
      source: hadith("bukhari", "1094", "Jabir bin Abdullah", "Sahih", "The Prophet ﷺ used to pray the voluntary prayers while riding, facing a direction other than the qiblah.", "used to offer the Nawafil, while riding, facing a direction other than that of the Qibla"),
      difficulty: 2,
      questions: [
        { q: "Which prayers did he ﷺ pray while riding?", a: "The voluntary prayers", wrong: ["Only Jumu'ah", "Only Eid", "None at all"], why: "He used to offer the nawafil while riding." },
        { q: "Which way did he face when riding?", a: "The way he was travelling", wrong: ["Always backwards", "Up at the sky", "He shut his eyes only"], why: "Facing a direction other than that of the qiblah." },
        { q: "Travelling did not stop him ﷺ from extra prayers.", tf: true, why: "He prayed them even while riding." }
      ]
    },
    {
      slug: "same-reward",
      title: "The same reward",
      line: "When you are ill or travel, your usual deeds are still written.",
      facts: ["Told by Abu Musa", "Allah is generous"],
      source: hadith("bukhari", "2996", "Abu Musa", "Sahih", "When a servant falls ill or travels, he gets the same reward as for the good deeds he did at home when healthy.", "he will get reward similar to that he gets for good deeds practiced at home when in good health"),
      difficulty: 2,
      questions: [
        { q: "What does the sick person get for deeds he used to do?", a: "The same reward", wrong: ["No reward", "Half a reward", "A punishment"], why: "He will get reward similar to that he gets at home." },
        { q: "Who else keeps that reward?", a: "The traveller", wrong: ["The one who stops praying", "The lazy one", "No one"], why: "When a slave falls ill or travels." },
        { q: "Allah still writes the good habits of someone who becomes ill.", tf: true, why: "Reward similar to good deeds practiced in good health." }
      ]
    }
  ]
};

export const PRAYER_MORE_UNITS: DeepUnit[] = [WUDU, ADHAN, NIGHT, EASY];
