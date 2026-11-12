import { hadith, quran, quranQuote, type DeepUnit } from "./deepKit";

// More of Eid and the special days: the ten days of Dhul Hijjah and the sacrifice, Laylat al-Qadr and the last ten
// nights of Ramadan, and the months and fasts of the Islamic year. Each card is one ayah or one sahih hadith
// (number and grade as sunnah.com gives them), told with the story around it. Only what is agreed on.

const DHUL_HIJJAH: DeepUnit = {
  key: "dhul-hijjah",
  topicId: "eid",
  branchId: "eid-dhul-hijjah",
  branch: { title: "The ten days and the sacrifice", description: "The best days of the year, the story of Ibrahim and his son, and the Eid sacrifice." },
  name: "the ten days of Dhul Hijjah",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "best-ten-days",
      title: "The best ten days",
      line: "No good deeds beat those done in Dhul Hijjah's first ten days.",
      facts: [
        "Dhul Hijjah is the last month of the Islamic year, the month of Hajj.",
        "Its ninth day is Arafah; its tenth day is Eid al-Adha.",
        "Fill these days with prayer, dhikr, charity and good deeds."
      ],
      source: hadith("bukhari", "969", "Ibn Abbas", "Sahih", "The Prophet ﷺ said: No good deeds done on other days are better than those done on these days, meaning the first ten days of Dhul Hijjah.", "No good deeds done on other days are superior to those done on these"),
      difficulty: 1,
      questions: [
        { q: "Which ten days are the best for good deeds?", a: "The first ten of Dhul Hijjah", wrong: ["The last ten of Shawwal", "The first ten of Rajab", "Any ten days"], why: "No good deeds on other days are better than those on these ten days." },
        { q: "Which day is the tenth of Dhul Hijjah?", a: "Eid al-Adha", wrong: ["Eid al-Fitr", "Ashura", "The day of Arafah"], why: "Its ninth day is Arafah and its tenth is Eid al-Adha." },
        { q: "Dhul Hijjah is the month of Hajj.", tf: true, why: "Dhul Hijjah is the last month of the year, the month of Hajj." }
      ]
    },
    {
      slug: "ibrahims-dream",
      title: "Ibrahim's dream",
      line: "Ibrahim saw in a dream that he must sacrifice his son.",
      facts: [
        "The dreams of prophets are revelation from Allah.",
        "He told his son, who said: father, do as you are told.",
        "You will find me patient, insha'Allah, the son said."
      ],
      quote: quranQuote(37, 102),
      source: quran(37, 102, "When he reached the age of working with him, Ibrahim said: O my son, I have seen in a dream that I sacrifice you, so see what you think. He said: O my father, do as you are commanded. You will find me, if Allah wills, of the patient."),
      difficulty: 1,
      questions: [
        { q: "What did Ibrahim see in his dream?", a: "That he must sacrifice his son", wrong: ["A great flood", "A new city", "A falling star"], why: "I have seen in a dream that I sacrifice you." },
        { q: "What did the son answer?", a: "Do as you are commanded", wrong: ["Let me run away", "Ask someone else", "Wait ten years"], why: "O my father, do as you are commanded." },
        { q: "The son promised to be patient, if Allah willed.", tf: true, why: "You will find me, if Allah wills, of the patient." }
      ]
    },
    {
      slug: "the-ram",
      title: "A ram in his place",
      line: "Allah saved Ibrahim's son and sent a great ram in his place.",
      facts: [
        "Ibrahim and his son both obeyed, and passed the test.",
        "Allah ransomed the son with a great sacrifice.",
        "Muslims remember them with the sacrifice at Eid al-Adha."
      ],
      quote: quranQuote(37, 107),
      source: quran(37, 107, "And We ransomed him with a great sacrifice."),
      difficulty: 1,
      questions: [
        { q: "What did Allah send in place of Ibrahim's son?", a: "A great sacrifice, a ram", wrong: ["A camel", "A bag of gold", "A dove"], why: "We ransomed him with a great sacrifice." },
        { q: "Which Eid remembers Ibrahim and his son?", a: "Eid al-Adha", wrong: ["Eid al-Fitr", "Ashura", "Laylat al-Qadr"], why: "Muslims remember them with the sacrifice at Eid al-Adha." },
        { q: "Ibrahim's son was harmed in the end.", tf: false, why: "Allah ransomed him with a great sacrifice." }
      ]
    },
    {
      slug: "taqwa-reaches-him",
      title: "What reaches Allah",
      line: "The meat does not reach Allah; your taqwa reaches Him.",
      facts: [
        "Taqwa is being mindful of Allah and fearing to displease Him.",
        "The sacrifice is worship, done for Allah alone.",
        "The meat is eaten by people and shared with the poor."
      ],
      quote: quranQuote(22, 37),
      source: quran(22, 37, "Their meat will not reach Allah, nor will their blood, but what reaches Him is piety from you."),
      difficulty: 2,
      questions: [
        { q: "What of the sacrifice reaches Allah?", a: "The taqwa of the one who gives it", wrong: ["Its meat", "Its blood", "Its price"], why: "What reaches Him is piety from you." },
        { q: "Who eats the meat of the sacrifice?", a: "People, and the poor", wrong: ["No one", "Only the angels", "Only the king"], why: "The meat is eaten by people and shared with the poor." },
        { q: "The sacrifice is worship done for Allah alone.", tf: true, why: "It is worship; what reaches Allah is the giver's taqwa." }
      ]
    },
    {
      slug: "two-rams",
      title: "The Prophet's ﷺ two rams",
      line: "The Prophet ﷺ sacrificed two black and white rams.",
      facts: [
        "He ﷺ did it with his own hands.",
        "He said Bismillah and Allahu Akbar as he did it.",
        "Anas ibn Malik saw it and passed it on."
      ],
      source: hadith("bukhari", "5558", "Anas ibn Malik", "Sahih", "Anas said: The Prophet ﷺ sacrificed two rams, black and white, with his own hands, mentioning the name of Allah and saying Allahu Akbar.", "two rams, black and white in color"),
      difficulty: 1,
      questions: [
        { q: "How many rams did the Prophet ﷺ sacrifice?", a: "Two", wrong: ["One", "Five", "Ten"], why: "The Prophet ﷺ sacrificed two rams, black and white." },
        { q: "What did he ﷺ say as he did it?", a: "Bismillah and Allahu Akbar", wrong: ["Amin", "Subhanallah only", "Nothing at all"], why: "He mentioned the name of Allah and said Allahu Akbar." },
        { q: "The Prophet ﷺ did the sacrifice with his own hands.", tf: true, why: "He did it with his own hands, Anas said." }
      ]
    },
    {
      slug: "eat-feed-store",
      title: "Eat, share and keep",
      line: "One year he ﷺ said: keep no sacrifice meat past three days.",
      facts: [
        "That year people were in hardship, so the meat had to be shared.",
        "The next year he ﷺ said: eat, feed others and store it.",
        "The rule was for the poor to be fed in a hard year."
      ],
      source: hadith("bukhari", "5569", "Salamah bin al-Akwa", "Sahih", "The Prophet ﷺ said: whoever sacrifices should keep none of its meat after three days. The next year the people asked: shall we do as last year? He said: Eat of it, feed others and store some, for that year the people were in hardship and I wanted you to help them.", "Eat of it and feed of it to others and store of it"),
      difficulty: 2,
      questions: [
        { q: "Why was the meat not to be kept past three days that year?", a: "People were in hardship", wrong: ["The meat was bad", "It was too cold", "Ramadan had come"], why: "That year the people were having a hard time, and he wanted them helped." },
        { q: "What did he ﷺ say the next year?", a: "Eat, feed others and store it", wrong: ["Throw it away", "Sell it all", "Give it only to the rich"], why: "Eat of it and feed of it to others and store of it." },
        { q: "The sacrifice meat is meant to be shared with others.", tf: true, why: "Feed of it to others, he ﷺ said." }
      ]
    },
    {
      slug: "pray-and-sacrifice",
      title: "Pray, then sacrifice",
      line: "Allah told the Prophet ﷺ: pray to your Lord and sacrifice.",
      facts: [
        "The ayah is from Surah Al-Kawthar, the shortest surah.",
        "Both the prayer and the sacrifice are for Allah alone.",
        "On Eid al-Adha the prayer comes first, then the sacrifice."
      ],
      quote: quranQuote(108, 2),
      source: quran(108, 2, "So pray to your Lord and sacrifice to Him alone."),
      difficulty: 2,
      questions: [
        { q: "Which surah tells the Prophet ﷺ to pray and sacrifice?", a: "Al-Kawthar", wrong: ["Al-Fatihah", "Al-Ikhlas", "Yasin"], why: "So pray to your Lord and sacrifice, in Surah Al-Kawthar." },
        { q: "On Eid al-Adha, what comes first?", a: "The Eid prayer", wrong: ["The sacrifice", "The feast", "The Hajj"], why: "The prayer comes first, then the sacrifice." },
        { q: "Al-Kawthar is the shortest surah of the Quran.", tf: true, why: "Al-Kawthar has three short ayahs, the shortest surah." }
      ]
    }
  ]
};

const LAST_TEN: DeepUnit = {
  key: "laylat-al-qadr",
  topicId: "eid",
  branchId: "eid-laylat-al-qadr",
  branch: { title: "Laylat al-Qadr", description: "The Night of Decree, how to seek it in Ramadan's last ten nights, and its du'a." },
  name: "Laylat al-Qadr",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "better-than-a-thousand",
      title: "Better than a thousand months",
      line: "Laylat al-Qadr is better than a thousand months.",
      facts: [
        "A thousand months is more than eighty-three years.",
        "On this night the Quran was first sent down.",
        "Worship on this one night is worth more than a lifetime."
      ],
      quote: quranQuote(97, 3),
      source: quran(97, 3, "The Night of Decree is better than a thousand months."),
      difficulty: 1,
      questions: [
        { q: "Laylat al-Qadr is better than how many months?", a: "A thousand", wrong: ["Ten", "A hundred", "Twelve"], why: "The Night of Decree is better than a thousand months." },
        { q: "About how many years is a thousand months?", a: "Over eighty-three", wrong: ["Ten", "Forty", "Two hundred"], why: "A thousand months is more than eighty-three years." },
        { q: "The Quran was first sent down on Laylat al-Qadr.", tf: true, why: "On this night the Quran was first sent down." }
      ]
    },
    {
      slug: "peace-until-dawn",
      title: "Peace until dawn",
      line: "Angels and Jibril come down; that night is peace until dawn.",
      facts: [
        "Surah Al-Qadr is five ayahs, all about this one night.",
        "The Spirit in the surah is the angel Jibril.",
        "The night stays peaceful until the sun begins to rise."
      ],
      quote: quranQuote(97, 5),
      source: quran(97, 5, "Peace it is until the emergence of dawn."),
      difficulty: 1,
      questions: [
        { q: "Until when is Laylat al-Qadr peace?", a: "Until dawn", wrong: ["Until midnight", "Until noon", "For one hour"], why: "Peace it is until the emergence of dawn." },
        { q: "Who is the Spirit that comes down that night?", a: "The angel Jibril", wrong: ["A prophet", "A jinn", "The moon"], why: "The Spirit in the surah is the angel Jibril." },
        { q: "Surah Al-Qadr has five ayahs.", tf: true, why: "Surah Al-Qadr is five ayahs, all about this night." }
      ]
    },
    {
      slug: "the-odd-nights",
      title: "Seek it in the odd nights",
      line: "Seek Laylat al-Qadr in the odd nights of Ramadan's last ten.",
      facts: [
        "The odd nights are the 21st, 23rd, 25th, 27th and 29th.",
        "No one knows for sure which night it is.",
        "So a Muslim worships hard on every one of the ten."
      ],
      source: hadith("bukhari", "2017", "Aishah", "Sahih", "The Prophet ﷺ said: Search for the Night of Qadr in the odd nights of the last ten days of Ramadan.", "Search for the Night of Qadr in the odd nights of the last ten days of Ramadan"),
      difficulty: 1,
      questions: [
        { q: "In which nights should you seek Laylat al-Qadr?", a: "The odd nights of the last ten", wrong: ["The first night of Ramadan", "Any night of the year", "Only the night of Eid"], why: "Search for it in the odd nights of the last ten days of Ramadan." },
        { q: "Which is one of the odd nights?", a: "The 27th", wrong: ["The 20th", "The 22nd", "The 30th"], why: "The odd nights are the 21st, 23rd, 25th, 27th and 29th." },
        { q: "Everyone knows for sure which night it is.", tf: false, why: "No one knows for sure, so seek it in all the odd nights." }
      ]
    },
    {
      slug: "the-quarrel",
      title: "Lost to a quarrel",
      line: "The Prophet ﷺ came out to tell which night it was.",
      facts: [
        "Two Muslims were quarrelling, and the knowledge was taken away.",
        "He ﷺ said: perhaps that is better for you.",
        "Quarrels can cost good; keep the peace in Ramadan."
      ],
      source: hadith("bukhari", "2023", "Ubadah ibn as-Samit", "Sahih", "The Prophet ﷺ came out to tell us about the Night of Qadr, but two Muslims were quarrelling, so the knowledge of it was taken away. He said: perhaps that is better for you, so seek it on the 29th, 27th and 25th.", "two Muslims were quarreling with each other"),
      difficulty: 2,
      questions: [
        { q: "Why was the knowledge of the night taken away?", a: "Two Muslims were quarrelling", wrong: ["It was raining", "He forgot", "The mosque was closed"], why: "Two Muslims were quarreling, so the news of it was taken away." },
        { q: "What did he ﷺ say about it being hidden?", a: "It might be better for you", wrong: ["It was a punishment forever", "It will never come again", "Stop looking for it"], why: "That might be for your own good, he said." },
        { q: "Quarrelling can make people lose something good.", tf: true, why: "Because of a quarrel, the knowledge of the night was taken away." }
      ]
    },
    {
      slug: "the-last-ten-nights",
      title: "Working hard in the last ten",
      line: "In the last ten nights the Prophet ﷺ prayed through the night.",
      facts: [
        "He ﷺ tightened his belt, meaning he worked his hardest.",
        "He woke his family to pray with him.",
        "He ﷺ stayed in the mosque in i'tikaf for those ten days."
      ],
      source: hadith("bukhari", "2024", "Aishah", "Sahih", "Aishah said: When the last ten days of Ramadan began, the Prophet ﷺ tightened his waist belt, prayed all night, and kept his family awake for the prayers.", "used to keep his family awake for the prayers"),
      difficulty: 1,
      questions: [
        { q: "What did the Prophet ﷺ do in the last ten nights?", a: "Prayed through the night", wrong: ["Slept early", "Travelled for trade", "Rested at home"], why: "He used to pray all the night." },
        { q: "Whom did he ﷺ wake to pray with him?", a: "His family", wrong: ["Only the guards", "No one", "The traders"], why: "He used to keep his family awake for the prayers." },
        { q: "Tightening his belt meant working his hardest in worship.", tf: true, why: "He tightened his waist belt, meaning he worked hard." }
      ]
    },
    {
      slug: "all-sins-forgiven",
      title: "A night to be forgiven",
      line: "Pray on Laylat al-Qadr with faith, and past sins are forgiven.",
      facts: [
        "Pray with sincere faith, hoping for Allah's reward.",
        "The same is said of fasting Ramadan with faith.",
        "Not for show: the heart must be sincere."
      ],
      source: hadith("bukhari", "1901", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: Whoever prays on the Night of Qadr out of faith and hoping for reward, his past sins will be forgiven; and whoever fasts Ramadan out of faith and hoping for reward, his past sins will be forgiven.", "Whoever established prayers on the night of Qadr out of sincere faith"),
      difficulty: 2,
      questions: [
        { q: "What does praying on Laylat al-Qadr with faith bring?", a: "Past sins forgiven", wrong: ["Great wealth", "A long life", "Nothing more"], why: "All his previous sins will be forgiven." },
        { q: "How must the prayer be done?", a: "With faith, hoping for reward", wrong: ["To be seen by people", "As fast as you can", "Only in a group"], why: "Out of sincere faith and hoping for a reward from Allah." },
        { q: "Fasting Ramadan with faith also brings forgiveness.", tf: true, why: "Whoever fasts in Ramadan out of sincere faith is forgiven too." }
      ]
    },
    {
      slug: "the-dua",
      title: "The du'a for that night",
      line: "Aishah asked: if I find Laylat al-Qadr, what should I say?",
      facts: [
        "Allahumma innaka afuwwun tuhibbul afwa fa'fu anni.",
        "O Allah, You are Pardoning and love to pardon, so pardon me.",
        "To pardon is to wipe a sin away as if it never was."
      ],
      source: hadith("tirmidhi", "3513", "Aishah", "Sahih", "Aishah asked: If I know which night is the Night of Qadr, what should I say? He said: Say: O Allah, You are Pardoning, You love pardon, so pardon me.", "You love pardon, so pardon me"),
      difficulty: 1,
      questions: [
        { q: "Who asked what to say on Laylat al-Qadr?", a: "Aishah", wrong: ["Abu Bakr", "Bilal", "Fatimah"], why: "Aishah asked the Prophet ﷺ what she should say." },
        { q: "What does the du'a ask Allah for?", a: "To pardon us", wrong: ["Riches", "A long journey", "Victory"], why: "You love pardon, so pardon me." },
        { q: "The du'a says Allah loves to pardon.", tf: true, why: "O Allah, You are Pardoning and You love pardon." }
      ]
    }
  ]
};

const ISLAMIC_YEAR: DeepUnit = {
  key: "islamic-year",
  topicId: "eid",
  branchId: "eid-islamic-year",
  branch: { title: "The Islamic year", description: "Twelve months, four sacred ones, and the fasts the Prophet ﷺ kept through the year." },
  name: "the Islamic year",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "twelve-months",
      title: "Twelve months, four sacred",
      line: "Allah made the year twelve months, and four of them sacred.",
      facts: [
        "The Islamic months follow the moon, not the sun.",
        "So Ramadan comes about eleven days earlier each year.",
        "The sacred months: Muharram, Rajab, Dhul Qa'dah, Dhul Hijjah."
      ],
      quote: quranQuote(9, 36),
      source: quran(9, 36, "The number of months with Allah is twelve in the register of Allah from the day He created the heavens and the earth; of these, four are sacred. So do not wrong yourselves during them."),
      difficulty: 1,
      questions: [
        { q: "How many months are in the Islamic year?", a: "Twelve", wrong: ["Ten", "Thirteen", "Eleven"], why: "The number of months with Allah is twelve." },
        { q: "How many of the months are sacred?", a: "Four", wrong: ["One", "Two", "Six"], why: "Of these, four are sacred." },
        { q: "The Islamic months follow the moon.", tf: true, why: "The months follow the moon, so Ramadan moves each year." }
      ]
    },
    {
      slug: "muharram",
      title: "Allah's month, Muharram",
      line: "The best fasting after Ramadan is in Muharram, Allah's month.",
      facts: [
        "Muharram is the first month of the Islamic year.",
        "Ashura, its tenth day, is in Muharram.",
        "The best extra prayer is prayer in the night."
      ],
      source: hadith("muslim", "1163a", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: The best fasting after Ramadan is in Allah's month, al-Muharram, and the best prayer after the obligatory prayers is the night prayer.", "the most excellent prayer after what is prescribed is prayer during the night"),
      difficulty: 1,
      questions: [
        { q: "Which month is best for fasting after Ramadan?", a: "Muharram", wrong: ["Shawwal", "Rajab", "Safar"], why: "The best fast after Ramadan is in Allah's month al-Muharram." },
        { q: "Which month begins the Islamic year?", a: "Muharram", wrong: ["Ramadan", "Dhul Hijjah", "Sha'ban"], why: "Muharram is the first month of the Islamic year." },
        { q: "The best extra prayer is the night prayer.", tf: true, why: "The best prayer after what is prescribed is prayer during the night." }
      ]
    },
    {
      slug: "shaban",
      title: "Fasting in Sha'ban",
      line: "Aishah never saw him ﷺ fast more in any month than Sha'ban.",
      facts: [
        "Sha'ban is the month just before Ramadan.",
        "He ﷺ fasted a whole month only in Ramadan.",
        "Fasting in Sha'ban gets you ready for Ramadan."
      ],
      source: hadith("bukhari", "1969", "Aishah", "Sahih", "Aishah said: I never saw the Prophet ﷺ fast a whole month except Ramadan, and I did not see him fast in any month more than in Sha'ban.", "did not see him fasting in any month more than in the month of"),
      difficulty: 1,
      questions: [
        { q: "After Ramadan, in which month did he ﷺ fast the most?", a: "Sha'ban", wrong: ["Muharram", "Rajab", "Safar"], why: "I did not see him fasting in any month more than in Sha'ban." },
        { q: "Which month comes just before Ramadan?", a: "Sha'ban", wrong: ["Shawwal", "Muharram", "Dhul Hijjah"], why: "Sha'ban is the month just before Ramadan." },
        { q: "He ﷺ fasted a whole month only in Ramadan.", tf: true, why: "I never saw him fasting a whole month except Ramadan." }
      ]
    },
    {
      slug: "monday-and-thursday",
      title: "Monday and Thursday",
      line: "Deeds are shown to Allah on Mondays and Thursdays.",
      facts: [
        "The Prophet ﷺ loved to be fasting when his deeds were shown.",
        "So he often fasted on Mondays and Thursdays.",
        "An easy extra fast for anyone to try."
      ],
      source: hadith("tirmidhi", "747", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: Deeds are presented on Monday and Thursday, and I love that my deeds be presented while I am fasting.", "Deeds are presented on Monday and Thursday"),
      difficulty: 1,
      questions: [
        { q: "On which days are deeds shown to Allah?", a: "Monday and Thursday", wrong: ["Friday and Saturday", "Sunday only", "Every Tuesday"], why: "Deeds are presented on Monday and Thursday." },
        { q: "How did he ﷺ love to be when his deeds were shown?", a: "Fasting", wrong: ["Travelling", "Asleep", "Eating a feast"], why: "I love that my deeds be presented while I am fasting." },
        { q: "Fasting Monday and Thursday is an extra fast.", tf: true, why: "Only Ramadan is the fard fast; these are extra." }
      ]
    },
    {
      slug: "three-days-a-month",
      title: "Three days a month",
      line: "The Prophet ﷺ told Abu Hurairah to fast three days each month.",
      facts: [
        "He also told him to pray two rak'ahs of Duha.",
        "And to pray witr before going to sleep.",
        "Abu Hurairah called these three his friend's advice."
      ],
      source: hadith("bukhari", "1981", "Abu Hurairah", "Sahih", "Abu Hurairah said: My friend, the Prophet ﷺ, advised me to do three things: to fast three days every month, to pray two rak'ahs of Duha, and to pray witr before sleeping.", "to fast three days a month"),
      difficulty: 2,
      questions: [
        { q: "How many days a month did he ﷺ advise fasting?", a: "Three", wrong: ["One", "Ten", "Fifteen"], why: "To fast three days a month." },
        { q: "When should witr be prayed, by this advice?", a: "Before sleeping", wrong: ["At noon", "After lunch", "At sunset only"], why: "To pray witr before sleeping." },
        { q: "Duha was one of the three things he ﷺ advised.", tf: true, why: "To pray two rak'ahs of Duha prayer." }
      ]
    }
  ]
};

export const EID_UNITS: DeepUnit[] = [DHUL_HIJJAH, LAST_TEN, ISLAMIC_YEAR];
