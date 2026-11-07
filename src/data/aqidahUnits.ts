import { hadith, quran, quranQuote, type DeepUnit } from "./deepKit";

// Deep units for the Beliefs (aqidah) topic: tawhid, the angels, the books and messengers, the decree, Allah's
// names, and faith that grows. Only what the Quran and sahih hadith state plainly; matters the schools of
// belief argue over are left out.

const TAWHID: DeepUnit = {
  key: "aq-tawhid",
  topicId: "aqidah",
  branchId: "aqidah-tawhid",
  name: "tawhid",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "allahs-right",
      title: "Allah's right on us",
      line: "Allah's right on His servants: worship Him and join no partner.",
      facts: ["Told to Mu'adh", "On a donkey ride"],
      source: hadith("bukhari", "2856", "Mu'adh ibn Jabal", "Sahih", "The Prophet ﷺ asked Mu'adh: do you know Allah's right on His servants, and their right on Him? Allah's right is that they worship Him and join nothing with Him; their right on Him is that He does not punish whoever joins nothing with Him."),
      difficulty: 1,
      questions: [
        { q: "What is Allah's right on His servants?", a: "Worship Him, join no partner", wrong: ["Give gold", "Build masjids only", "Fast every day"], why: "Sahih al-Bukhari 2856." },
        { q: "What is the servants' right on Allah, as promised?", a: "Not to punish those without shirk", wrong: ["Wealth", "Long life", "Fame"], why: "Whoever joins nothing with Him." },
        { q: "Who was riding with him ﷺ when he taught this?", a: "Mu'adh ibn Jabal", wrong: ["Abu Jahl", "Heraclius", "Waraqah"], why: "Riding behind him on a donkey." }
      ]
    },
    {
      slug: "sincere",
      title: "From a sincere heart",
      line: "Say La ilaha illallah sincerely; Allah keeps you from the Fire.",
      facts: ["Sincerity is the key"],
      source: hadith("bukhari", "128", "Anas ibn Malik", "Sahih", "No one testifies sincerely from his heart that none is worthy of worship but Allah and that Muhammad is His Messenger, except that Allah keeps him from the Fire."),
      difficulty: 1,
      questions: [
        { q: "How must the shahadah be said?", a: "Sincerely, from the heart", wrong: ["Only loudly", "Only once a year", "Only in Arabic class"], why: "Sahih al-Bukhari 128." },
        { q: "What does Allah keep such a person from?", a: "The Fire", wrong: ["All tests", "Hard work", "Sadness"], why: "Allah keeps him from the Fire." },
        { q: "Words without belief in the heart are enough.", tf: false, why: "It must be sincere, from the heart." }
      ]
    },
    {
      slug: "greatest-sin",
      title: "The greatest sin",
      line: "The greatest sin: setting up a rival to Allah, your Maker.",
      facts: ["Shirk is the worst"],
      source: hadith("bukhari", "4477", "Abdullah ibn Mas'ud", "Sahih", "I asked the Prophet ﷺ: which sin is greatest with Allah? He said: that you set up a rival to Allah, though He alone created you."),
      difficulty: 1,
      questions: [
        { q: "Which sin is the greatest with Allah?", a: "Setting up a rival to Allah", wrong: ["Missing breakfast", "Being shy", "Being poor"], why: "Sahih al-Bukhari 4477." },
        { q: "Why is shirk so wrong?", a: "Allah alone created you", wrong: ["It is expensive", "It is noisy", "It is new"], why: "Though He alone created you." },
        { q: "Shirk means giving Allah's rights to others.", tf: true, why: "Like worship, du'a and trust." }
      ]
    },
    {
      slug: "not-forgiven",
      title: "The one sin not forgiven",
      line: "Allah forgives anything below shirk for whom He wills.",
      facts: ["Quran 4:48", "Unless one repents"],
      quote: quranQuote(4, 48),
      source: quran(4, 48, "Allah does not forgive that partners be joined with Him, but forgives what is less than that for whom He wills."),
      difficulty: 2,
      questions: [
        { q: "Which sin does Quran 4:48 say Allah does not forgive?", a: "Joining partners with Him", wrong: ["Every small sin", "Forgetting a du'a", "Being late"], why: "If one dies upon it without repenting." },
        { q: "What does Allah forgive, says the ayah?", a: "Anything less, for whom He wills", wrong: ["Nothing at all", "Only big sins", "Only on Fridays"], why: "His mercy is wide." },
        { q: "A person who repents from shirk can be forgiven.", tf: true, why: "Many companions left shirk and were forgiven." }
      ]
    },
    {
      slug: "luqman",
      title: "Luqman's first advice",
      line: "Luqman told his son first: do not join partners with Allah.",
      facts: ["Quran 31:13", "Shirk is a great wrong"],
      quote: quranQuote(31, 13),
      source: quran(31, 13, "Luqman said to his son, advising him: my son, do not join partners with Allah; joining partners is a great wrong."),
      difficulty: 1,
      questions: [
        { q: "What was Luqman's first advice to his son?", a: "Do not join partners with Allah", wrong: ["Get rich", "Travel far", "Sleep early"], why: "Quran 31:13." },
        { q: "What does Luqman call shirk?", a: "A great wrong", wrong: ["A small slip", "A good habit", "A custom"], why: "Joining partners is a great wrong." },
        { q: "Parents should teach tawhid first.", tf: true, why: "Luqman began with it." }
      ]
    },
    {
      slug: "for-allah-alone",
      title: "Deeds for Allah alone",
      line: "Allah needs no partner: a deed shared with others, He leaves it.",
      facts: ["A hadith qudsi", "Do it for Allah"],
      source: hadith("muslim", "2985", "Abu Hurairah", "Sahih", "Allah says: I am the One most free of need of a partner. Whoever does a deed for Me and someone else too, I leave him with what he joined with Me."),
      difficulty: 2,
      questions: [
        { q: "What happens to a deed done for Allah and to show off?", a: "Allah leaves it", wrong: ["Double reward", "Full reward", "Half reward"], why: "Sahih Muslim 2985." },
        { q: "What should our deeds be for?", a: "Allah alone", wrong: ["Likes and praise", "Family only", "Money"], why: "That is ikhlas." },
        { q: "Allah needs partners to help Him.", tf: false, why: "He is the One most free of need." }
      ]
    },
    {
      slug: "ask-allah",
      title: "When you ask, ask Allah",
      line: "He ﷺ told a boy: when you ask, ask Allah; seek His help.",
      facts: ["Ibn Abbas was a boy", "Be mindful of Allah"],
      source: hadith("tirmidhi", "2516", "Ibn Abbas", "Sahih", "O boy, I will teach you words: be mindful of Allah and He will protect you; be mindful of Allah and you will find Him before you; when you ask, ask Allah; when you seek help, seek help from Allah."),
      difficulty: 1,
      questions: [
        { q: "When you ask, who should you ask?", a: "Allah", wrong: ["A grave", "A star", "A lucky charm"], why: "Jami at-Tirmidhi 2516." },
        { q: "If you are mindful of Allah, what does He do?", a: "He protects you", wrong: ["He forgets you", "Nothing", "He tests you less"], why: "Be mindful of Allah and He will protect you." },
        { q: "He ﷺ taught tawhid even to children.", tf: true, why: "Ibn Abbas was a boy riding behind him." }
      ]
    }
  ]
};

const ANGELS: DeepUnit = {
  key: "aq-malaikah",
  topicId: "aqidah",
  branchId: "aqidah-pillars-of-iman",
  name: "the angels",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "light",
      title: "Made from light",
      line: "Angels were made from light, jinn from fire, Adam from clay.",
      facts: ["A pillar of iman"],
      source: hadith("muslim", "2996", "Aishah", "Sahih", "The angels were created from light, the jinn from smokeless fire, and Adam from what you have been told of."),
      difficulty: 1,
      questions: [
        { q: "What were the angels made from?", a: "Light", wrong: ["Fire", "Clay", "Water"], why: "Sahih Muslim 2996." },
        { q: "What were the jinn made from?", a: "Smokeless fire", wrong: ["Light", "Clay", "Wind"], why: "And Adam from clay." },
        { q: "Believing in angels is part of iman.", tf: true, why: "It is one of the six pillars." }
      ]
    },
    {
      slug: "wings",
      title: "Jibril's six hundred wings",
      line: "He ﷺ saw Jibril in his real form, with six hundred wings.",
      facts: ["Six hundred wings"],
      source: hadith("bukhari", "3232", "Abdullah ibn Mas'ud", "Sahih", "Ibn Mas'ud told that the Prophet ﷺ saw Jibril with six hundred wings."),
      difficulty: 2,
      questions: [
        { q: "How many wings did Jibril have?", a: "Six hundred", wrong: ["Two", "Six", "Sixty"], why: "Sahih al-Bukhari 3232." },
        { q: "Who brought revelation to the prophets?", a: "Jibril", wrong: ["Malik", "Israfil", "Ridwan"], why: "He is the angel of revelation." },
        { q: "Angels are mighty creations of Allah.", tf: true, why: "Jibril's size shows Allah's power." }
      ]
    },
    {
      slug: "recorders",
      title: "The noble recorders",
      line: "Noble angels write down our deeds; they know what we do.",
      facts: ["Quran 82:10-12", "Every deed is written"],
      quote: quranQuote(82, 11),
      source: quran(82, 11, "Over you are guardians, noble and writing; they know whatever you do."),
      difficulty: 1,
      questions: [
        { q: "What do the noble angels do, as Quran 82:11 says?", a: "Write down our deeds", wrong: ["Cook our food", "Build houses", "Sleep"], why: "Noble and writing." },
        { q: "What do they know?", a: "Whatever we do", wrong: ["Only big deeds", "Nothing", "Only words"], why: "They know whatever you do." },
        { q: "Knowing angels write helps us choose good.", tf: true, why: "Every deed is in our record." }
      ]
    },
    {
      slug: "fajr-asr",
      title: "Angels at Fajr and Asr",
      line: "Angels change shifts at Fajr and Asr: we left them praying.",
      facts: ["Night and day angels", "They meet at Fajr, Asr"],
      source: hadith("bukhari", "555", "Abu Hurairah", "Sahih", "Angels take turns among you by night and by day and meet at Fajr and Asr. Those who stayed go up, and Allah asks them, though He knows best: how did you leave My servants? They say: we left them praying, and we came to them praying."),
      difficulty: 2,
      questions: [
        { q: "At which prayers do the angels change shifts?", a: "Fajr and Asr", wrong: ["Dhuhr and Isha", "Maghrib only", "Jumu'ah only"], why: "Sahih al-Bukhari 555." },
        { q: "What do they tell Allah about the believers?", a: "We left them praying", wrong: ["They were sleeping", "They were playing", "Nothing"], why: "And we came to them praying." },
        { q: "Praying Fajr and Asr on time is extra special.", tf: true, why: "The angels report it to Allah." }
      ]
    },
    {
      slug: "two-angels",
      title: "Two angels each morning",
      line: "Each day two angels pray: O Allah, replace what the giver gave.",
      facts: ["Giving brings more"],
      source: hadith("bukhari", "1442", "Abu Hurairah", "Sahih", "Every day two angels come down: one says, O Allah, give more to the one who spends; the other says, O Allah, bring loss to the one who holds back."),
      difficulty: 2,
      questions: [
        { q: "What does the first angel pray for?", a: "More for the one who gives", wrong: ["Loss for the giver", "Rain", "Long life"], why: "Sahih al-Bukhari 1442." },
        { q: "Who does the second angel pray against?", a: "The one who holds back", wrong: ["The giver", "Children", "Travelers"], why: "Bring loss to the miser." },
        { q: "Charity makes your wealth less in the end.", tf: false, why: "The angels pray for the giver." }
      ]
    },
    {
      slug: "death",
      title: "The angel of death",
      line: "An angel of death is put in charge of every soul.",
      facts: ["Quran 32:11", "Then back to Allah"],
      quote: quranQuote(32, 11),
      source: quran(32, 11, "Say: the angel of death put in charge of you will take your souls; then to your Lord you will be returned."),
      difficulty: 1,
      questions: [
        { q: "Who takes the souls, as Quran 32:11 says?", a: "The angel of death", wrong: ["Jibril only", "The jinn", "No one"], why: "Put in charge of you." },
        { q: "Where does everyone return after death?", a: "To their Lord", wrong: ["To nothing", "To the stars", "To the earth only"], why: "Then to your Lord you will be returned." },
        { q: "Every soul has an angel put in charge of its death.", tf: true, why: "Quran 32:11." }
      ]
    },
    {
      slug: "obey",
      title: "They never disobey",
      line: "Angels never disobey Allah, and do just what they are told.",
      facts: ["Quran 66:6"],
      quote: quranQuote(66, 6),
      source: quran(66, 6, "Over the Fire are stern, strong angels who do not disobey Allah in what He commands them, and do what they are commanded."),
      difficulty: 1,
      questions: [
        { q: "Do angels ever disobey Allah?", a: "Never", wrong: ["Sometimes", "Often", "Only at night"], why: "Quran 66:6." },
        { q: "What do angels do?", a: "What they are commanded", wrong: ["Whatever they like", "Nothing", "What people ask"], why: "They do what they are commanded." },
        { q: "Angels have a free choice to sin, like people.", tf: false, why: "They always obey." }
      ]
    }
  ]
};

const MESSENGERS: DeepUnit = {
  key: "aq-rusul",
  topicId: "aqidah",
  branchId: "aqidah-pillars-of-iman",
  name: "the books and messengers",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "zabur",
      title: "Revelation like Nuh's",
      line: "Allah revealed to him ﷺ as He revealed to Nuh and others.",
      facts: ["Quran 4:163", "Zabur to Dawud"],
      quote: quranQuote(4, 163),
      source: quran(4, 163, "We revealed to you as We revealed to Nuh and the prophets after him, to Ibrahim, Isma'il, Ishaq, Ya'qub, the tribes, Isa, Ayyub, Yunus, Harun and Sulayman, and to Dawud We gave the Zabur."),
      difficulty: 2,
      questions: [
        { q: "Which book was given to Dawud?", a: "The Zabur", wrong: ["The Tawrah", "The Injil", "The Quran"], why: "Quran 4:163." },
        { q: "Revelation to him ﷺ was like revelation to whom?", a: "Nuh and the prophets after", wrong: ["Kings", "Poets", "Fortune tellers"], why: "One chain of prophets." },
        { q: "We believe in all the books Allah sent.", tf: true, why: "Belief in the books is a pillar of iman." }
      ]
    },
    {
      slug: "not-all-told",
      title: "Not all were named",
      line: "Allah told us some messengers' stories, and not others.",
      facts: ["Quran 4:164", "Allah spoke to Musa"],
      source: quran(4, 164, "Messengers We have told you of before, and messengers We have not told you of; and Allah spoke to Musa directly."),
      difficulty: 2,
      questions: [
        { q: "Did Allah name every messenger in the Quran?", a: "No, only some", wrong: ["Yes, all of them", "Only three", "None"], why: "Quran 4:164." },
        { q: "To which prophet did Allah speak directly?", a: "Musa", wrong: ["Nuh", "Yunus", "Hud"], why: "And Allah spoke to Musa directly." },
        { q: "There were messengers we do not know by name.", tf: true, why: "Some We have not told you of." }
      ]
    },
    {
      slug: "guarded",
      title: "The Quran is guarded",
      line: "Allah sent down the Quran, and He guards it Himself.",
      facts: ["Quran 15:9", "Unchanged till today"],
      quote: quranQuote(15, 9),
      source: quran(15, 9, "It is We who sent down the Reminder, and We will surely guard it."),
      difficulty: 1,
      questions: [
        { q: "Who guards the Quran?", a: "Allah", wrong: ["Kings", "No one", "Scholars alone"], why: "Quran 15:9." },
        { q: "What does 'the Reminder' mean here?", a: "The Quran", wrong: ["A calendar", "A poem", "A city"], why: "It is We who sent down the Reminder." },
        { q: "The Quran has been changed over time.", tf: false, why: "Allah promised to guard it." }
      ]
    },
    {
      slug: "brothers",
      title: "Prophets are brothers",
      line: "Prophets are brothers with one religion, he ﷺ said.",
      facts: ["Closest to Isa"],
      source: hadith("bukhari", "3443", "Abu Hurairah", "Sahih", "I am the closest of people to Isa son of Maryam in this world and the Hereafter. The prophets are brothers from one father; their mothers differ, but their religion is one."),
      difficulty: 2,
      questions: [
        { q: "What did all the prophets share?", a: "One religion", wrong: ["One city", "One language", "One mother"], why: "Sahih al-Bukhari 3443." },
        { q: "Which prophet did he ﷺ say he was closest to?", a: "Isa", wrong: ["Nuh", "Adam", "Hud"], why: "In this world and the Hereafter." },
        { q: "Every prophet called to worship Allah alone.", tf: true, why: "Their religion is one." }
      ]
    },
    {
      slug: "all-people",
      title: "Sent to all people",
      line: "Past prophets came to their own nation; he ﷺ came to all people.",
      facts: ["Five special gifts", "The whole earth a masjid"],
      source: hadith("bukhari", "335", "Jabir ibn Abdullah", "Sahih", "I was given five things no one before me was given; among them: the earth was made a place of prayer and purity for me, and every prophet was sent to his own people, but I was sent to all people."),
      difficulty: 2,
      questions: [
        { q: "Who was he ﷺ sent to?", a: "All people", wrong: ["Only Arabs", "Only Makkah", "Only his family"], why: "Sahih al-Bukhari 335." },
        { q: "Who were earlier prophets sent to?", a: "Their own people", wrong: ["Everyone on earth", "Only angels", "No one"], why: "Every prophet was sent to his own people." },
        { q: "The whole earth was made a place to pray.", tf: true, why: "One of the five gifts." }
      ]
    }
  ]
};

const QADAR: DeepUnit = {
  key: "aq-qadar",
  topicId: "aqidah",
  branchId: "aqidah-pillars-of-iman",
  name: "the decree",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "fifty-thousand",
      title: "Written long before",
      line: "Allah wrote all measures fifty thousand years before creation.",
      facts: ["His Throne on water"],
      source: hadith("muslim", "2653b", "Abdullah ibn Amr", "Sahih", "Allah wrote the measures of creation fifty thousand years before He created the heavens and the earth, while His Throne was over the water."),
      difficulty: 2,
      questions: [
        { q: "When did Allah write the measures of creation?", a: "50,000 years before the heavens", wrong: ["Yesterday", "After Adam", "On the Last Day"], why: "Sahih Muslim 2653b." },
        { q: "Where was His Throne then?", a: "Over the water", wrong: ["On a mountain", "In a city", "Nowhere"], why: "As the hadith says." },
        { q: "Nothing surprises Allah.", tf: true, why: "He knew and wrote everything before." }
      ]
    },
    {
      slug: "measure",
      title: "Everything by measure",
      line: "Allah created everything with a set measure.",
      facts: ["Quran 54:49"],
      quote: quranQuote(54, 49),
      source: quran(54, 49, "Indeed, We created everything by a measure."),
      difficulty: 1,
      questions: [
        { q: "How did Allah create everything, says Quran 54:49?", a: "By a measure", wrong: ["By chance", "Without a plan", "By luck"], why: "We created everything by a measure." },
        { q: "What is this belief called?", a: "Belief in qadar", wrong: ["Belief in luck", "Belief in stars", "Belief in omens"], why: "The sixth pillar of iman." },
        { q: "Things happen by pure chance.", tf: false, why: "Everything is by Allah's measure." }
      ]
    },
    {
      slug: "in-a-book",
      title: "Already in a book",
      line: "No hardship comes except it was in a book before it happened.",
      facts: ["Quran 57:22", "Easy for Allah"],
      quote: quranQuote(57, 22),
      source: quran(57, 22, "No hardship strikes on earth or in yourselves except it is in a book before We bring it about; that is easy for Allah."),
      difficulty: 2,
      questions: [
        { q: "Where is every hardship before it happens?", a: "In a book", wrong: ["Nowhere", "In the stars", "In our hands"], why: "Quran 57:22." },
        { q: "How hard is this for Allah?", a: "It is easy for Him", wrong: ["Very hard", "Impossible", "Only for big things"], why: "That is easy for Allah." },
        { q: "Knowing this brings calm in hard times.", tf: true, why: "The next ayah says: so you do not despair." }
      ]
    },
    {
      slug: "four-things",
      title: "Four things written",
      line: "An angel writes four things for each baby before birth.",
      facts: ["Written in the womb"],
      source: hadith("bukhari", "3208", "Abdullah ibn Mas'ud", "Sahih", "Then Allah sends an angel who is told to write four things: his deeds, his provision, his lifespan, and whether he will be wretched or happy."),
      difficulty: 2,
      questions: [
        { q: "How many things does the angel write?", a: "Four", wrong: ["Two", "Seven", "Ten"], why: "Sahih al-Bukhari 3208." },
        { q: "Which is one of the four?", a: "His provision", wrong: ["His height", "His city", "His name"], why: "Deeds, provision, lifespan, and his end." },
        { q: "Our provision is written for us.", tf: true, why: "So we work, and trust Allah." }
      ]
    },
    {
      slug: "keep-working",
      title: "So keep doing good",
      line: "They asked: why work if it is written? He ﷺ said: do good.",
      facts: ["Good is made easy", "Quran 92:5-7"],
      source: hadith("bukhari", "4949", "Ali ibn Abi Talib", "Sahih", "He ﷺ said each person's place is written. They asked: shall we rely on that and leave deeds? He said: do deeds, for each is made easy for what he was created for; then he recited: as for him who gives and fears Allah..."),
      difficulty: 2,
      questions: [
        { q: "Should we stop doing deeds because all is written?", a: "No, keep doing good", wrong: ["Yes, stop", "Only on Fridays", "Only when rich"], why: "Sahih al-Bukhari 4949." },
        { q: "What happens to the one who works for good?", a: "Good is made easy for him", wrong: ["Nothing", "It gets harder", "He is punished"], why: "Each is helped toward what he was made for." },
        { q: "Qadar is an excuse to be lazy.", tf: false, why: "He ﷺ said: do deeds." }
      ]
    },
    {
      slug: "whole-creation",
      title: "If all creation gathered",
      line: "No one can help or harm you beyond what Allah wrote.",
      facts: ["The pens are lifted"],
      source: hadith("tirmidhi", "2516", "Ibn Abbas", "Sahih", "If the whole nation gathered to benefit you, they could only benefit you with what Allah wrote for you; and if they gathered to harm you, they could only harm you with what Allah wrote against you. The pens are lifted and the pages are dry."),
      difficulty: 2,
      questions: [
        { q: "If everyone gathered to harm you, what could happen?", a: "Only what Allah wrote", wrong: ["Anything they want", "Nothing ever", "Double harm"], why: "Jami at-Tirmidhi 2516." },
        { q: "What does 'the pens are lifted' mean?", a: "The decree is written and done", wrong: ["Stop writing school work", "Pens are broken", "Writing is banned"], why: "And the pages are dry." },
        { q: "This hadith makes a believer brave.", tf: true, why: "No one can harm you beyond Allah's decree." }
      ]
    },
    {
      slug: "if-only",
      title: "Don't say 'if only'",
      line: "When hurt comes, say: Allah decreed, and did as He willed.",
      facts: ["'If only' opens Satan's door"],
      source: hadith("muslim", "2664", "Abu Hurairah", "Sahih", "If something befalls you, do not say: if only I had done this, it would have been so. Say: Allah decreed, and what He willed He did; for 'if only' opens the door to Satan."),
      difficulty: 2,
      questions: [
        { q: "What should we say when something bad happens?", a: "Allah decreed and did as He willed", wrong: ["If only I had...", "It's someone's fault", "Bad luck"], why: "Sahih Muslim 2664." },
        { q: "What does 'if only' open, as he ﷺ said?", a: "The door to Satan", wrong: ["A treasure", "A new path", "Nothing"], why: "It brings regret and blame." },
        { q: "Accepting the decree brings peace to the heart.", tf: true, why: "We did our best; Allah decides." }
      ]
    }
  ]
};

const NAMES: DeepUnit = {
  key: "aq-asma",
  topicId: "aqidah",
  branchId: "aqidah-names-and-attributes",
  name: "Allah's names",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "ninety-nine",
      title: "Ninety-nine names",
      line: "Allah has ninety-nine names; whoever learns them enters Jannah.",
      facts: ["One hundred minus one"],
      source: hadith("bukhari", "2736", "Abu Hurairah", "Sahih", "Allah has ninety-nine names, one hundred minus one; whoever knows them will enter Paradise."),
      difficulty: 1,
      questions: [
        { q: "How many names of Allah are in the hadith?", a: "Ninety-nine", wrong: ["Ten", "Seven", "One thousand"], why: "One hundred minus one." },
        { q: "What is the reward for knowing them?", a: "Jannah", wrong: ["Gold", "Fame", "Long life"], why: "Sahih al-Bukhari 2736." },
        { q: "Learning Allah's names is a great deed.", tf: true, why: "It leads to Jannah." }
      ]
    },
    {
      slug: "call-by-them",
      title: "Call Him by them",
      line: "To Allah belong the best names, so call on Him by them.",
      facts: ["Quran 7:180", "Use them in du'a"],
      quote: quranQuote(7, 180),
      source: quran(7, 180, "To Allah belong the most beautiful names, so call on Him by them."),
      difficulty: 1,
      questions: [
        { q: "What does Quran 7:180 tell us to do with the names?", a: "Call on Him by them", wrong: ["Hide them", "Change them", "Forget them"], why: "So call on Him by them." },
        { q: "How should you ask Allah for mercy?", a: "Ya Rahman, have mercy", wrong: ["With no name", "With a joke", "In anger"], why: "Use the name that fits the need." },
        { q: "Allah's names are the most beautiful.", tf: true, why: "The best names belong to Allah." }
      ]
    },
    {
      slug: "nothing-like",
      title: "Nothing is like Him",
      line: "Nothing is like Allah, and He is the All-Hearing, All-Seeing.",
      facts: ["Quran 42:11"],
      quote: quranQuote(42, 11),
      source: quran(42, 11, "There is nothing like Him, and He is the All-Hearing, the All-Seeing."),
      difficulty: 2,
      questions: [
        { q: "What is like Allah, says Quran 42:11?", a: "Nothing at all", wrong: ["The sun", "Kings", "The angels"], why: "There is nothing like Him." },
        { q: "Which two names end the ayah?", a: "As-Sami' and Al-Basir", wrong: ["Al-Malik and Al-Quddus", "Ar-Razzaq and Al-Wahhab", "Al-Awwal and Al-Akhir"], why: "The All-Hearing, the All-Seeing." },
        { q: "We can imagine exactly how Allah is.", tf: false, why: "Nothing is like Him." }
      ]
    },
    {
      slug: "razzaq",
      title: "Ar-Razzaq, the Provider",
      line: "Allah is Ar-Razzaq, the Provider, the Strong, the Firm.",
      facts: ["Quran 51:58"],
      quote: quranQuote(51, 58),
      source: quran(51, 58, "Indeed Allah is the Provider, the Possessor of strength, the Firm."),
      difficulty: 1,
      questions: [
        { q: "What does Ar-Razzaq mean?", a: "The Provider", wrong: ["The Judge", "The King", "The First"], why: "Quran 51:58." },
        { q: "Who truly provides for us?", a: "Allah", wrong: ["Our boss", "Luck", "The bank"], why: "People are only the means." },
        { q: "Trusting Ar-Razzaq means we stop working.", tf: false, why: "We work, and He provides." }
      ]
    },
    {
      slug: "mercy-wins",
      title: "His mercy wins",
      line: "Allah wrote on His Throne: My mercy overcomes My anger.",
      facts: ["Written with Him"],
      source: hadith("bukhari", "7404", "Abu Hurairah", "Sahih", "When Allah created creation, He wrote in His Book, which is with Him on the Throne: My mercy overcomes My anger."),
      difficulty: 1,
      questions: [
        { q: "What did Allah write about Himself?", a: "My mercy overcomes My anger", wrong: ["I am angry", "I forget", "I am far"], why: "Sahih al-Bukhari 7404." },
        { q: "Where is that Book?", a: "With Him on the Throne", wrong: ["In a cave", "In a library", "Lost"], why: "As the hadith says." },
        { q: "We should always hope in Allah's mercy.", tf: true, why: "His mercy comes before His anger." }
      ]
    }
  ]
};

const LIVED: DeepUnit = {
  key: "aq-iman",
  topicId: "aqidah",
  branchId: "aqidah-lived-iman",
  name: "living faith",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "branches",
      title: "Over seventy branches",
      line: "Iman has over seventy branches, from tawhid to clearing paths.",
      facts: ["Haya is a branch"],
      source: hadith("muslim", "35b", "Abu Hurairah", "Sahih", "Faith has over seventy branches; the best is saying La ilaha illallah, the least is removing something harmful from the road, and modesty is a branch of faith."),
      difficulty: 1,
      questions: [
        { q: "What is the highest branch of iman?", a: "La ilaha illallah", wrong: ["Giving a gift", "Smiling", "Eating well"], why: "Sahih Muslim 35b." },
        { q: "What is the lowest branch?", a: "Removing harm from the road", wrong: ["Sleeping", "Shopping", "Talking"], why: "Even a small good deed is faith." },
        { q: "Modesty (haya) is part of faith.", tf: true, why: "Haya is a branch of iman." }
      ]
    },
    {
      slug: "sweetness",
      title: "The sweetness of faith",
      line: "Three things bring the sweetness of faith, he ﷺ said.",
      facts: ["Love Allah most", "Love for Allah's sake"],
      source: hadith("bukhari", "16", "Anas ibn Malik", "Sahih", "Whoever has three things tastes the sweetness of faith: Allah and His Messenger are dearer to him than all else; he loves a person only for Allah; and he hates to return to disbelief as he would hate to be thrown into fire."),
      difficulty: 1,
      questions: [
        { q: "Who should be dearest to a believer?", a: "Allah and His Messenger ﷺ", wrong: ["Money", "Fame", "Games"], why: "Sahih al-Bukhari 16." },
        { q: "How should a believer love people?", a: "For Allah's sake", wrong: ["For their money", "For fame", "Only if they are famous"], why: "That is the second of the three." },
        { q: "Faith has a sweetness you can taste.", tf: true, why: "With these three things." }
      ]
    },
    {
      slug: "increases",
      title: "Faith goes up",
      line: "When Allah's ayahs are recited, a believer's faith grows.",
      facts: ["Quran 8:2", "They trust their Lord"],
      quote: quranQuote(8, 2),
      source: quran(8, 2, "The believers are those whose hearts tremble when Allah is mentioned, and when His ayahs are recited, their faith increases, and they rely on their Lord."),
      difficulty: 1,
      questions: [
        { q: "What makes a believer's faith increase, says Quran 8:2?", a: "Hearing Allah's ayahs", wrong: ["Sleeping more", "Buying things", "Arguing"], why: "Their faith increases." },
        { q: "Who do believers rely on?", a: "Their Lord", wrong: ["Their phones", "Luck", "Kings"], why: "And they rely on their Lord." },
        { q: "Hearing the Quran can strengthen faith.", tf: true, why: "As Quran 8:2 says." }
      ]
    },
    {
      slug: "strong",
      title: "The strong believer",
      line: "A strong believer is dearer to Allah than a weak one.",
      facts: ["Good in both", "Don't give up"],
      source: hadith("muslim", "2664", "Abu Hurairah", "Sahih", "The strong believer is better and dearer to Allah than the weak believer, and there is good in both. Strive for what benefits you, seek Allah's help, and do not give up."),
      difficulty: 2,
      questions: [
        { q: "Which believer is dearer to Allah?", a: "The strong believer", wrong: ["The lazy one", "The rich one", "The loud one"], why: "Sahih Muslim 2664." },
        { q: "What should you do with what benefits you?", a: "Strive for it, with Allah's help", wrong: ["Ignore it", "Wait for luck", "Give up"], why: "And do not give up." },
        { q: "There is good in every believer.", tf: true, why: "And there is good in both." }
      ]
    }
  ]
};

export const AQIDAH_UNITS: readonly DeepUnit[] = [TAWHID, ANGELS, MESSENGERS, QADAR, NAMES, LIVED];
