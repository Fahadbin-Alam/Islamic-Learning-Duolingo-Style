import { hadith, quran, quranQuote, type DeepUnit } from "./deepKit";

// New companions for the Sahabah topic, each a unit of its own: Khubayb and Asim, Usayd ibn Hudayr, Thabit ibn
// Qays, Al-Miqdad, Hakim ibn Hizam, and Sa'id ibn Zayd with his father. Every lesson is one sahih hadith of
// al-Bukhari (number as sunnah.com gives it) or an ayah, with its exact English words to highlight.

const KHUBAYB: DeepUnit = {
  key: "khubayb",
  topicId: "sahabah",
  branchId: "sahabi-khubayb-ibn-adi",
  branch: { title: "Khubayb and Asim", description: "Ten brave men, a kind prisoner, grapes out of season, two rak'ahs, and a cloud of wasps." },
  name: "Khubayb and Asim",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "the-ten",
      title: "Ten men on a hill",
      line: "Asim led ten men, and refused to surrender to the enemy.",
      facts: [
        "The Prophet ﷺ sent them to bring news, after Badr.",
        "About two hundred archers followed their tracks by date stones.",
        "Asim prayed: O Allah, tell Your Prophet ﷺ our news."
      ],
      source: hadith("bukhari", "3045", "Abu Hurairah", "Sahih", "The Prophet ﷺ sent ten men under Asim ibn Thabit. Two hundred archers followed them by the date stones they left. Asim said: By Allah, I will not come down under the protection of a disbeliever. O Allah, tell Your Prophet our news.", "O Allah! Convey our news to Your Prophet"),
      difficulty: 1,
      questions: [
        { q: "Who led the ten men?", a: "Asim ibn Thabit", wrong: ["Khalid ibn al-Walid", "Zayd ibn Harithah", "Abu Ubaydah"], why: "They went under the leadership of Asim ibn Thabit al-Ansari." },
        { q: "How did the enemy find them?", a: "By the date stones they left", wrong: ["By their fire smoke", "By a spy among them", "By their horses' tracks"], why: "They found the place where they had eaten dates from Madinah." },
        { q: "Asim asked Allah to tell the Prophet ﷺ their news.", tf: true, why: "O Allah! Convey our news to Your Prophet." }
      ]
    },
    {
      slug: "the-kind-prisoner",
      title: "A kind prisoner",
      line: "A captive in Makkah, Khubayb would not harm a little child.",
      facts: [
        "Khubayb was held by the family of a man killed at Badr.",
        "Their small boy wandered to him while he held a razor.",
        "He said: are you afraid I would harm him? I never would."
      ],
      source: hadith("bukhari", "3045", "Abu Hurairah", "Sahih", "The daughter of Al-Harith said: I saw him with my son on his thigh and the razor in his hand. He saw my fear and said: Are you afraid that I will kill him? I will never do so. By Allah, I never saw a prisoner better than Khubaib.", "By Allah, I never saw a prisoner better than Khubaib"),
      difficulty: 2,
      questions: [
        { q: "Where was Khubayb held as a prisoner?", a: "In Makkah", wrong: ["In Madinah", "In Ta'if", "In Yemen"], why: "They sold him in Makkah, after Badr." },
        { q: "What did Khubayb say about the little boy?", a: "I will never harm him", wrong: ["Give me the boy", "Free me or else", "Take him away"], why: "He saw her fear and said: I will never do so." },
        { q: "The boy's mother said she never saw a better prisoner.", tf: true, why: "By Allah, I never saw a prisoner better than Khubaib." }
      ]
    },
    {
      slug: "grapes-in-chains",
      title: "Grapes in chains",
      line: "In chains, Khubayb ate fresh grapes when Makkah had no fruit.",
      facts: [
        "He was tied in iron chains.",
        "There was no fruit in Makkah at that time.",
        "She said: it was provision Allah gave to Khubayb."
      ],
      source: hadith("bukhari", "3045", "Abu Hurairah", "Sahih", "She said: I saw him eating from a bunch of grapes in his hand while he was chained in irons, and there was no fruit in Makkah at that time. It was provision that Allah gave to Khubaib.", "It was a boon Allah bestowed upon Khubaib"),
      difficulty: 3,
      questions: [
        { q: "What was Khubayb eating in his chains?", a: "Fresh grapes", wrong: ["Dry bread", "Dates from Madinah", "Nothing at all"], why: "She saw him eating from a bunch of grapes." },
        { q: "Why was it so strange?", a: "Makkah had no fruit then", wrong: ["Grapes were forbidden", "He hated grapes", "It was Ramadan"], why: "There was no fruit in Makkah at that time." },
        { q: "The woman called the grapes a gift from Allah.", tf: true, why: "It was a boon Allah bestowed upon Khubaib." }
      ]
    },
    {
      slug: "two-rakahs",
      title: "Two rak'ahs first",
      line: "Before he was killed, Khubayb asked to pray two rak'ahs.",
      facts: [
        "They took him out of the Haram to be killed.",
        "He kept the prayer short, so they would not think he was afraid.",
        "He began the Sunnah of two rak'ahs before being killed."
      ],
      source: hadith("bukhari", "3045", "Abu Hurairah", "Sahih", "Khubaib asked to pray two rak'ahs, and they let him. He said: Had I not feared you would think I was afraid, I would have prayed longer. So Khubaib began the practice of praying two rak'ahs for any Muslim about to be killed in captivity.", "Khubaib who set the tradition for any Muslim sentenced to death in captivity"),
      difficulty: 4,
      questions: [
        { q: "What did Khubayb ask for before he was killed?", a: "To pray two rak'ahs", wrong: ["A last meal", "To see his family", "To be set free"], why: "He asked them to let him offer two rak'ahs." },
        { q: "Why did he keep his prayer short?", a: "So they would not think he was afraid", wrong: ["He was tired", "He forgot the surahs", "It was very hot"], why: "Had I not feared you would think I was afraid, I would have prayed longer." },
        { q: "Khubayb began the Sunnah of two rak'ahs before being killed.", tf: true, why: "It was Khubaib who set this practice for any Muslim in that state." }
      ]
    },
    {
      slug: "the-wasps",
      title: "Guarded by wasps",
      line: "Allah sent a cloud of wasps to guard Asim's body.",
      facts: [
        "Quraysh sent men to take a part of Asim's body.",
        "A swarm like a shady cloud came over him.",
        "They could not touch him."
      ],
      source: hadith("bukhari", "3045", "Abu Hurairah", "Sahih", "Quraysh sent people to bring a part of Asim's body. A swarm of wasps, like a shady cloud, was sent to hover over Asim and protect him, so they could not cut anything from him.", "a swarm of wasps, resembling a shady cloud, were sent to hover over"),
      difficulty: 5,
      questions: [
        { q: "What guarded Asim's body?", a: "A swarm of wasps", wrong: ["A pack of lions", "A great flood", "His brothers"], why: "A swarm of wasps, like a shady cloud, protected him." },
        { q: "What did the swarm look like?", a: "A shady cloud", wrong: ["A burning fire", "A flock of birds", "A sandstorm"], why: "A swarm of wasps, resembling a shady cloud." },
        { q: "Quraysh managed to take a part of Asim's body.", tf: false, why: "They could not cut off anything from his flesh." }
      ]
    }
  ]
};

const USAYD: DeepUnit = {
  key: "usayd",
  topicId: "sahabah",
  branchId: "sahabi-usayd-ibn-hudayr",
  branch: { title: "Usayd ibn Hudayr", description: "An Ansari whose Quran brought the angels near, and who thanked Abu Bakr's family." },
  name: "Usayd ibn Hudayr",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "the-horse",
      title: "The startled horse",
      line: "Usayd recited Al-Baqarah at night, and his horse jumped.",
      facts: [
        "Each time he recited, the horse was startled.",
        "Each time he stopped, the horse was calm.",
        "His little son Yahya was near the horse, so he stopped."
      ],
      source: hadith("bukhari", "5018", "Usaid bin Hudair", "Sahih", "While Usaid was reciting Surat Al-Baqarah at night, his horse tied beside him was startled. When he stopped, it was quiet; when he recited again, it was startled again. His son Yahya was near it, so he stopped.", "the horse was suddenly startled and troubled"),
      difficulty: 1,
      questions: [
        { q: "Which surah was Usayd reciting at night?", a: "Al-Baqarah", wrong: ["Al-Kahf", "Ya-Sin", "Al-Mulk"], why: "He was reciting Surat Al-Baqarah at night." },
        { q: "What did the horse do when he recited?", a: "It was startled", wrong: ["It fell asleep", "It ran away", "It ate its food"], why: "When he started again, the horse was startled again." },
        { q: "Usayd stopped because his son was near the horse.", tf: true, why: "He was afraid the horse might trample Yahya." }
      ]
    },
    {
      slug: "lamps-in-the-sky",
      title: "Lamps in the sky",
      line: "Usayd saw a cloud like lamps, and it was angels listening.",
      facts: [
        "He looked up and saw something like a cloud with lamps.",
        "He told the Prophet ﷺ the next morning.",
        "He ﷺ said: those were angels, come near for your voice."
      ],
      source: hadith("bukhari", "5018", "Usaid bin Hudair", "Sahih", "He saw something like a cloud with what looked like lamps. The Prophet ﷺ said: Those were angels who came near to you for your voice. Had you kept reciting till dawn, people would have seen them in the morning.", "Those were Angels who came near to you for your voice"),
      difficulty: 2,
      questions: [
        { q: "What did Usayd see in the sky?", a: "A cloud like lamps", wrong: ["A shooting star", "A full moon", "A flock of birds"], why: "Something like a cloud containing what looked like lamps." },
        { q: "What was the cloud, he ﷺ said?", a: "Angels come to hear him", wrong: ["Jinn", "A storm", "Smoke from a fire"], why: "Those were angels who came near to you for your voice." },
        { q: "If he had kept reciting, people would have seen them at dawn.", tf: true, why: "It would have remained till morning when people would have seen it." }
      ]
    },
    {
      slug: "family-of-abu-bakr",
      title: "Not your first blessing",
      line: "When tayammum came down, Usayd thanked Abu Bakr's family.",
      facts: [
        "Aishah's necklace was lost, and the army stopped with no water.",
        "Then Allah sent down the ayah of tayammum.",
        "Usayd said: this is not your first blessing, family of Abu Bakr."
      ],
      source: hadith("bukhari", "334", "Aishah", "Sahih", "The army stopped to look for Aishah's lost necklace where there was no water. Allah revealed the ayah of tayammum. Usaid bin Hudair said: O family of Abu Bakr, this is not the first blessing of yours.", "This is not the first blessing of yours"),
      difficulty: 3,
      questions: [
        { q: "Why did the army stop with no water?", a: "To look for Aishah's necklace", wrong: ["A camel was sick", "A storm came", "They were lost"], why: "Her necklace was lost, and they stayed to search for it." },
        { q: "What did Allah send down then?", a: "The ayah of tayammum", wrong: ["The ayah of fasting", "The ayah of Hajj", "The ayah of zakat"], why: "Allah revealed the verses of tayammum." },
        { q: "Usayd said it was not the first blessing from Abu Bakr's family.", tf: true, why: "O the family of Abu Bakr! This is not the first blessing of yours." }
      ]
    }
  ]
};

const THABIT: DeepUnit = {
  key: "thabit",
  topicId: "sahabah",
  branchId: "sahabi-thabit-ibn-qays",
  branch: { title: "Thabit ibn Qays", description: "The speaker of the Ansar, who feared his loud voice, and was given good news of Jannah." },
  name: "Thabit ibn Qays",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "lower-your-voices",
      title: "Lower your voices",
      line: "Allah said: do not raise your voices over the Prophet's ﷺ.",
      facts: [
        "It is from good manners with the Messenger ﷺ.",
        "Raising the voice over his could ruin a person's deeds.",
        "Thabit had a naturally loud voice, so he was afraid."
      ],
      quote: quranQuote(49, 2),
      source: quran(49, 2, "O you who believe, do not raise your voices above the voice of the Prophet, or be loud to him in speech as you are loud to one another, lest your deeds become worthless while you do not notice."),
      difficulty: 1,
      questions: [
        { q: "What did Allah tell the believers about their voices?", a: "Do not raise them over the Prophet's ﷺ", wrong: ["Always speak loudly", "Never speak at all", "Only whisper at home"], why: "Do not raise your voices above the voice of the Prophet ﷺ." },
        { q: "Why was Thabit afraid of the ayah on voices?", a: "He had a loud voice", wrong: ["He could not hear", "He never spoke", "He was far away"], why: "Thabit had a naturally loud voice." },
        { q: "Raising the voice over the Prophet's ﷺ could ruin deeds.", tf: true, why: "Lest your deeds become worthless while you do not notice." }
      ]
    },
    {
      slug: "sad-at-home",
      title: "Sad at home",
      line: "Thabit sat at home, head down, sure his deeds were lost.",
      facts: [
        "The Prophet ﷺ noticed he was missing and asked about him.",
        "A man found him sitting sadly in his house.",
        "Thabit said: I raised my voice over his, so I am of the Fire."
      ],
      source: hadith("bukhari", "3613", "Anas ibn Malik", "Sahih", "The Prophet ﷺ noticed Thabit was missing. A man found him sitting at home, his head drooping. Thabit said: I used to raise my voice over the Prophet's, so my good deeds are lost and I am of the people of the Fire.", "sitting in his house drooping his head"),
      difficulty: 2,
      questions: [
        { q: "Who noticed that Thabit was missing?", a: "The Prophet ﷺ", wrong: ["Thabit's wife", "No one", "Abu Jahl"], why: "The Prophet ﷺ noticed the absence of Thabit." },
        { q: "How did the man find Thabit?", a: "Sitting sadly with his head down", wrong: ["Laughing with friends", "Asleep in the masjid", "Working in his farm"], why: "He saw him sitting in his house drooping his head." },
        { q: "The Prophet ﷺ cared about a companion who went missing.", tf: true, why: "He noticed and sent someone to ask about him." }
      ]
    },
    {
      slug: "people-of-jannah",
      title: "You are of the people of Jannah",
      line: "Thabit was told: you are of the people of Jannah.",
      facts: [
        "The man went back to Thabit with great good news.",
        "He ﷺ said Thabit was of the people of Paradise.",
        "His fear of Allah was itself a sign of his faith."
      ],
      source: hadith("bukhari", "3613", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said: Go and say to Thabit, You are not from the people of the Fire, but from the people of Paradise.", "You are not from the people of Fire, but from the people of Paradise"),
      difficulty: 3,
      questions: [
        { q: "What good news did Thabit get?", a: "He is of the people of Jannah", wrong: ["He would be rich", "He would rule Madinah", "He would live long"], why: "You are not from the people of the Fire, but from the people of Paradise." },
        { q: "Who sent Thabit the good news?", a: "The Prophet ﷺ", wrong: ["Abu Bakr", "His father", "The people of Makkah"], why: "He ﷺ said: go and say to Thabit." },
        { q: "Thabit was told he was of the people of the Fire.", tf: false, why: "He was told the opposite: of the people of Paradise." }
      ]
    },
    {
      slug: "the-speaker",
      title: "He will answer you",
      line: "He ﷺ took Thabit to answer Musaylimah the liar for him.",
      facts: [
        "Musaylimah came to Madinah wanting to rule after the Prophet ﷺ.",
        "He ﷺ said: if you asked me for this stick, I would not give it.",
        "Then: this is Thabit ibn Qays, who will answer you for me."
      ],
      source: hadith("bukhari", "4373", "Ibn Abbas", "Sahih", "Musaylimah the liar came to Madinah. The Prophet ﷺ went to him with Thabit ibn Qays, holding a palm stick, and said: If you ask me for this piece, I will not give it to you. And this is Thabit ibn Qays, who will answer your questions on my behalf.", "this is Thabit bin Qais who will answer your questions on my behalf"),
      difficulty: 4,
      questions: [
        { q: "Whom did Thabit answer for the Prophet ﷺ?", a: "Musaylimah the liar", wrong: ["Abu Sufyan", "The king of Rome", "The Negus"], why: "Musaylimah came to Madinah, and Thabit answered him." },
        { q: "What did he ﷺ hold in his hand?", a: "A palm stick", wrong: ["A sword", "A letter", "A flag"], why: "He had a stick of a date palm in his hand." },
        { q: "He ﷺ said he would not give Musaylimah even the stick.", tf: true, why: "If you ask me for this piece, I will not give it to you." }
      ]
    }
  ]
};

const MIQDAD: DeepUnit = {
  key: "miqdad",
  topicId: "sahabah",
  branchId: "sahabi-al-miqdad",
  branch: { title: "Al-Miqdad ibn al-Aswad", description: "A rider of Badr whose words made the Prophet's ﷺ face shine, and a hard question about mercy." },
  name: "Al-Miqdad",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "not-like-musas-people",
      title: "Not like Musa's people",
      line: "At Badr, Al-Miqdad said: we will fight on your right and left.",
      facts: [
        "Musa's people once told him: go, you and your Lord, and fight.",
        "Al-Miqdad said: we will not say that.",
        "The Prophet's ﷺ face shone with joy at his words."
      ],
      source: hadith("bukhari", "3952", "Abdullah ibn Mas'ud", "Sahih", "Al-Miqdad said: We will not say as the people of Musa said, Go you and your Lord and fight. We shall fight on your right and on your left, in front of you and behind you. I saw the face of the Prophet ﷺ shine with happiness.", "we shall fight on your right and on your left and in front of you and behind you"),
      difficulty: 1,
      questions: [
        { q: "Whose words did Al-Miqdad refuse to repeat?", a: "Musa's people", wrong: ["Nuh's people", "Pharaoh's army", "The hypocrites of Madinah"], why: "We will not say as the people of Moses said." },
        { q: "Where did Al-Miqdad say they would fight?", a: "On his right, left, front and back", wrong: ["Only behind him", "Far away from him", "Nowhere"], why: "We shall fight on your right and left, in front and behind." },
        { q: "His words made the Prophet's ﷺ face shine with joy.", tf: true, why: "I saw the face of the Prophet ﷺ getting bright with happiness." }
      ]
    },
    {
      slug: "he-said-la-ilaha",
      title: "After he said the words",
      line: "Al-Miqdad asked about an enemy who said the shahadah.",
      facts: [
        "Al-Miqdad asked about an enemy who said the shahadah to escape.",
        "He ﷺ said: leave him, his life is now protected.",
        "Words of faith protect a person's life."
      ],
      source: hadith("bukhari", "4019", "Ubaydullah ibn Adi", "Sahih", "Al-Miqdad asked: If a disbeliever cut off my hand, then hid behind a tree and said, I submit to Allah, may I kill him? The Prophet ﷺ said: You should not kill him.", "You should not kill him"),
      difficulty: 3,
      questions: [
        { q: "What did he ﷺ say about the enemy who said the words of faith?", a: "Leave him, his life is protected", wrong: ["Fight him anyway", "Make him a slave", "Chase him away"], why: "He ﷺ said: you should not take his life." },
        { q: "What protected the enemy's life, in Al-Miqdad's question?", a: "Saying the words of faith", wrong: ["Hiding behind a tree", "Being strong", "Having money"], why: "Once he said those words, his life was protected." },
        { q: "Al-Miqdad fought at Badr.", tf: true, why: "He was one of those who fought at Badr with the Prophet ﷺ." }
      ]
    }
  ]
};

const HAKIM: DeepUnit = {
  key: "hakim",
  topicId: "sahabah",
  branchId: "sahabi-hakim-ibn-hizam",
  branch: { title: "Hakim ibn Hizam", description: "A generous man of Quraysh, his good deeds before Islam, and the upper hand." },
  name: "Hakim ibn Hizam",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "deeds-before-islam",
      title: "Good deeds before Islam",
      line: "Hakim asked: will I be rewarded for good I did before Islam?",
      facts: [
        "Before Islam he gave charity, freed slaves and kept family ties.",
        "He ﷺ said: you became Muslim with all that good.",
        "Islam kept the reward of his good deeds."
      ],
      source: hadith("bukhari", "1436", "Hakim bin Hizam", "Sahih", "Hakim said: Before Islam I used to give charity, free slaves and keep good ties with my relatives. Shall I be rewarded? The Prophet ﷺ said: You became Muslim with all those good deeds.", "You became Muslim with all those good deeds"),
      difficulty: 1,
      questions: [
        { q: "What did Hakim ask the Prophet ﷺ?", a: "If his good before Islam counted", wrong: ["If he could be a leader", "If he could leave Makkah", "If he could keep his idols"], why: "Shall I be rewarded for those deeds?" },
        { q: "What did he ﷺ answer?", a: "You became Muslim with all that good", wrong: ["It is all lost", "Only half counts", "Do them again"], why: "You became Muslim with all those good deeds." },
        { q: "Hakim kept good ties with his family before Islam.", tf: true, why: "He gave charity, freed slaves and kept family ties." }
      ]
    },
    {
      slug: "the-upper-hand",
      title: "The upper hand",
      line: "The upper, giving hand is better than the lower hand.",
      facts: [
        "Hakim asked the Prophet ﷺ three times, and was given each time.",
        "He ﷺ said: wealth taken without greed is blessed.",
        "Hakim promised to never ask anyone again, and kept it."
      ],
      source: hadith("bukhari", "1472", "Urwah and Sa'id ibn al-Musayyib", "Sahih", "The Prophet ﷺ told Hakim: This wealth is like sweet fresh fruit; whoever takes it without greed is blessed in it. The upper hand is better than the lower hand. Hakim never took anything from anyone after that until he died.", "So Hakim never took anything from anybody after the Prophet"),
      difficulty: 3,
      questions: [
        { q: "Which hand is better, he ﷺ said?", a: "The upper, giving hand", wrong: ["The lower, taking hand", "The left hand", "Both are the same"], why: "The upper giving hand is better than the lower receiving hand." },
        { q: "What did Hakim do after that day?", a: "He never took from anyone again", wrong: ["He asked every day", "He became a beggar", "He left Islam"], why: "Hakim never took anything from anybody after the Prophet ﷺ till he died." },
        { q: "Wealth taken with greed is blessed.", tf: false, why: "Whoever takes it with greed is not blessed in it." }
      ]
    }
  ]
};

const SAID: DeepUnit = {
  key: "said-ibn-zayd",
  topicId: "sahabah",
  branchId: "sahabi-said-ibn-zayd",
  branch: { title: "Sa'id ibn Zayd", description: "His father who kept to Ibrahim's way before Islam, and a son who feared to take a span of land." },
  name: "Sa'id ibn Zayd",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "religion-of-ibrahim",
      title: "On the religion of Ibrahim",
      line: "Before Islam, Sa'id's father Zayd kept to the way of Ibrahim.",
      facts: [
        "Zayd ibn Amr stood with his back to the Ka'bah.",
        "He said: none of you, Quraysh, follows Ibrahim's religion but me.",
        "He saved baby girls whose fathers wanted to bury them."
      ],
      source: hadith("bukhari", "3828", "Asma bint Abi Bakr", "Sahih", "Asma said: I saw Zayd ibn Amr ibn Nufayl leaning against the Ka'bah, saying: O people of Quraysh, none of you is on the religion of Ibrahim except me. He used to save little girls, saying to a father: do not kill her, I will feed her for you.", "none amongst you is on the religion of Abraham except me"),
      difficulty: 1,
      questions: [
        { q: "Whose religion did Zayd ibn Amr follow?", a: "The religion of Ibrahim", wrong: ["The religion of Quraysh", "No religion", "The religion of Rome"], why: "None amongst you is on the religion of Abraham except me." },
        { q: "Whom did Zayd save?", a: "Baby girls", wrong: ["Captured soldiers", "Lost camels", "Trapped birds"], why: "He told the fathers: leave her, I will feed her for you." },
        { q: "Zayd ibn Amr was the father of Sa'id ibn Zayd.", tf: true, why: "Sa'id ibn Zayd ibn Amr ibn Nufayl was his son." }
      ]
    },
    {
      slug: "allahs-name",
      title: "Only in Allah's name",
      line: "Zayd ate only meat over which Allah's name was said.",
      facts: [
        "Quraysh sacrificed animals in the names of their idols.",
        "Zayd said: Allah made the sheep and sent it rain and grass.",
        "So why sacrifice it in any name but His?"
      ],
      source: hadith("bukhari", "3826", "Abdullah ibn Umar", "Sahih", "Zayd ibn Amr said: I do not eat what you slaughter in the name of your idols. I eat only that on which Allah's name has been mentioned. Allah created the sheep, sent water from the sky for it, and grew grass for it.", "Allah has created the sheep and He has sent the water for it from the sky"),
      difficulty: 2,
      questions: [
        { q: "What meat did Zayd refuse to eat?", a: "Meat offered to idols", wrong: ["All meat", "Camel meat", "Fish"], why: "He ate none but that over which Allah's name was said." },
        { q: "Who did Zayd say made the sheep and its grass?", a: "Allah", wrong: ["The idols", "The shepherds", "No one"], why: "Allah has created the sheep and sent the water and grown the grass." },
        { q: "Zayd lived before the revelation came to the Prophet ﷺ.", tf: true, why: "They met in Baldah before any revelation came." }
      ]
    },
    {
      slug: "a-span-of-land",
      title: "A span of land",
      line: "Sa'id said: how could I take her land? I heard the warning.",
      facts: [
        "A woman named Arwa claimed Sa'id took some of her land.",
        "He said he heard the Prophet ﷺ warn about it.",
        "Whoever takes a span of land unjustly carries it from seven earths."
      ],
      source: hadith("bukhari", "3198", "Sa'id ibn Zayd", "Sahih", "When Arwa claimed he took her land, Sa'id said: How could I? I heard the Prophet ﷺ say: If anyone takes a span of land unjustly, his neck will be encircled with it down seven earths on the Day of Resurrection.", "If anyone takes a span of land unjustly, his neck will be encircled with it down seven earths"),
      difficulty: 3,
      questions: [
        { q: "What was Sa'id accused of?", a: "Taking a woman's land", wrong: ["Stealing a camel", "Missing a battle", "Telling a lie"], why: "Arwa claimed he had taken her land." },
        { q: "What happens to one who takes a span of land unjustly?", a: "It is put around his neck from seven earths", wrong: ["Nothing at all", "He pays a small fine", "He only loses the land"], why: "His neck will be encircled with it down seven earths." },
        { q: "Sa'id said he would never take someone's land unjustly.", tf: true, why: "How should I deprive her of her right? I heard the warning." }
      ]
    }
  ]
};

export const SAHABA_MORE_UNITS: readonly DeepUnit[] = [KHUBAYB, USAYD, THABIT, MIQDAD, HAKIM, SAID];
