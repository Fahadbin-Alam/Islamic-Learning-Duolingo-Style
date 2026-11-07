import { hadith, quran, quranQuote, type DeepUnit } from "./deepKit";

// Deep units for the Prayer topic, after its own units: the reward of salah, extra prayers, Jumu'ah, and what to
// say after the salah. Every card is from the Quran or a sahih hadith (number and grade as sunnah.com gives them).
// Fiqh details the schools differ on (which prayer is "the middle prayer", exact sunnah counts) are left out.

const REWARD: DeepUnit = {
  key: "pray-reward",
  topicId: "prayer",
  branchId: "prayer-reward",
  branch: { title: "The reward of salah", description: "Why salah matters so much, and what Allah gives the one who guards it." },
  name: "the reward of salah",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "for-my-remembrance",
      title: "Pray to remember Me",
      line: "Allah says: worship Me, and pray to remember Me.",
      facts: ["Quran 20:14", "Said to Musa"],
      quote: quranQuote(20, 14),
      source: quran(20, 14, "Indeed, I am Allah; there is no god but Me, so worship Me and establish prayer for My remembrance."),
      difficulty: 1,
      questions: [
        { q: "Why do we pray, says Quran 20:14?", a: "To remember Allah", wrong: ["To show off", "To exercise", "To pass time"], why: "Establish prayer for My remembrance." },
        { q: "To whom did Allah say this first?", a: "Musa", wrong: ["Nuh", "Yusuf", "Isa"], why: "At the valley of Tuwa, in Surah Ta-Ha." },
        { q: "Salah keeps Allah in our minds through the day.", tf: true, why: "That is its purpose: His remembrance." }
      ]
    },
    {
      slug: "first-judged",
      title: "The first deed judged",
      line: "The first deed judged on Judgment Day is the salah.",
      facts: ["If it's good, he succeeds"],
      source: hadith("tirmidhi", "413", "Abu Hurairah", "Sahih", "The first deed a servant will be judged on on the Day of Resurrection is his salah. If it is sound, he has succeeded; if it is lacking, he has failed and lost."),
      difficulty: 1,
      questions: [
        { q: "Which deed is judged first on Judgment Day?", a: "The salah", wrong: ["Wealth", "Sports", "Clothes"], why: "Jami at-Tirmidhi 413." },
        { q: "If the salah is sound, what happens?", a: "He succeeds", wrong: ["He fails", "Nothing", "He starts again"], why: "If it is sound, he has succeeded." },
        { q: "Extra prayers can help fill what is lacking.", tf: true, why: "The same hadith says Allah looks at his extra prayers." }
      ]
    },
    {
      slug: "steps",
      title: "Every step counts",
      line: "Each step to the masjid raises a level and wipes a sin.",
      facts: ["Make wudu well first", "Angels pray for you"],
      source: hadith("bukhari", "647", "Abu Hurairah", "Sahih", "If he makes wudu well and walks to the masjid only to pray, every step raises him a level and removes a sin. The angels keep praying for him while he stays in his place of prayer."),
      difficulty: 1,
      questions: [
        { q: "What does each step to the masjid do?", a: "Raises a level, wipes a sin", wrong: ["Nothing", "Makes you tired only", "Costs a reward"], why: "Sahih al-Bukhari 647." },
        { q: "Who prays for you while you sit after salah?", a: "The angels", wrong: ["Nobody", "Only the imam", "Birds"], why: "The angels keep praying for him." },
        { q: "Walking to the masjid only to pray matters.", tf: true, why: "With the intention only to pray." }
      ]
    },
    {
      slug: "two-cool",
      title: "The two cool prayers",
      line: "Whoever prays the two cool prayers, Fajr and Asr, enters Jannah.",
      facts: ["Told by Abu Musa"],
      source: hadith("bukhari", "574", "Abu Musa al-Ash'ari", "Sahih", "Whoever prays the two cool prayers will enter Paradise."),
      difficulty: 1,
      questions: [
        { q: "Which are the two cool prayers?", a: "Fajr and Asr", wrong: ["Dhuhr and Isha", "Maghrib and Isha", "Eid and Jumu'ah"], why: "The cool times of morning and afternoon." },
        { q: "What is promised for guarding them?", a: "Jannah", wrong: ["A prize", "Fame", "Money"], why: "Sahih al-Bukhari 574." },
        { q: "Fajr is easy to miss, so its reward is great.", tf: true, why: "It is one of the two cool prayers." }
      ]
    },
    {
      slug: "isha-fajr",
      title: "Isha and Fajr together",
      line: "Pray Isha and Fajr in jamaah: like praying the whole night.",
      facts: ["Told by Uthman"],
      source: hadith("muslim", "656a", "Uthman ibn Affan", "Sahih", "Whoever prays Isha in congregation, it is as if he prayed half the night; and whoever prays Fajr in congregation, it is as if he prayed the whole night."),
      difficulty: 2,
      questions: [
        { q: "Isha in congregation is like praying how long?", a: "Half the night", wrong: ["One minute", "A whole year", "Nothing"], why: "Sahih Muslim 656a." },
        { q: "And Fajr in congregation too?", a: "Like the whole night", wrong: ["Like one hour", "Like nothing", "Like a day of fasting"], why: "As if he prayed the whole night." },
        { q: "Who heard this and taught it?", a: "Uthman ibn Affan", wrong: ["Abu Jahl", "Heraclius", "Abu Lahab"], why: "He told it after Maghrib in the masjid." }
      ]
    },
    {
      slug: "closest",
      title: "Closest in sujud",
      line: "You are closest to your Lord in sujud; make du'a there.",
      facts: ["Forehead on the ground"],
      source: hadith("muslim", "482", "Abu Hurairah", "Sahih", "The closest a servant is to his Lord is when he is in sujud, so make much du'a then."),
      difficulty: 1,
      questions: [
        { q: "When is a servant closest to his Lord?", a: "In sujud", wrong: ["When shopping", "When sleeping", "When boasting"], why: "Sahih Muslim 482." },
        { q: "What should we do much of in sujud?", a: "Du'a", wrong: ["Talking", "Looking around", "Rushing"], why: "So make much du'a then." },
        { q: "Sujud is a time to ask Allah for what you need.", tf: true, why: "He ﷺ told us to make du'a there." }
      ]
    },
    {
      slug: "comfort",
      title: "Give us comfort",
      line: "He ﷺ said: Bilal, call the iqamah and give us comfort by it.",
      facts: ["Salah is rest, not a burden"],
      source: hadith("abudawud", "4985", "Salim ibn Abil-Ja'd", "Sahih", "I heard the Messenger of Allah ﷺ say: Bilal, call the iqamah for prayer; give us comfort by it."),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ find in salah?", a: "Comfort and rest", wrong: ["A burden", "Boredom", "Tiredness"], why: "Give us comfort by it." },
        { q: "Whom did he ﷺ ask to call the iqamah?", a: "Bilal", wrong: ["Abu Jahl", "Khalid", "Heraclius"], why: "Sunan Abi Dawud 4985." },
        { q: "Salah can be a break from a hard day.", tf: true, why: "He ﷺ called it comfort." }
      ]
    },
    {
      slug: "forbids-evil",
      title: "Salah stops bad deeds",
      line: "Salah keeps you away from shameful and bad deeds.",
      facts: ["Quran 29:45", "Remembering Allah is greater"],
      quote: quranQuote(29, 45),
      source: quran(29, 45, "Establish prayer. Indeed, prayer keeps one away from immorality and wrongdoing, and the remembrance of Allah is greater."),
      difficulty: 2,
      questions: [
        { q: "What does salah keep us away from, says 29:45?", a: "Shameful and bad deeds", wrong: ["Friends", "Food", "Work"], why: "Prayer keeps one away from immorality." },
        { q: "What does the ayah call greater?", a: "The remembrance of Allah", wrong: ["Wealth", "Sleep", "Games"], why: "The remembrance of Allah is greater." },
        { q: "Praying well should change how we act.", tf: true, why: "It keeps us from wrongdoing." }
      ]
    }
  ]
};

const EXTRA: DeepUnit = {
  key: "pray-extra",
  topicId: "prayer",
  branchId: "prayer-extra",
  branch: { title: "Extra prayers", description: "The sunnah prayers he ﷺ loved: before Fajr, witr, duha, and greeting the masjid." },
  name: "extra prayers",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "twelve",
      title: "A house in Jannah",
      line: "Pray twelve extra rak'ahs a day; a house is built in Jannah.",
      facts: ["Told by Umm Habibah", "She never left them"],
      source: hadith("muslim", "728", "Umm Habibah", "Sahih", "Whoever prays twelve rak'ahs in a day and night, a house will be built for him in Paradise. Umm Habibah said: I never left them since I heard it."),
      difficulty: 1,
      questions: [
        { q: "Twelve extra rak'ahs a day bring what?", a: "A house in Jannah", wrong: ["A new bike", "Nothing", "Fame"], why: "Sahih Muslim 728." },
        { q: "What did Umm Habibah do after hearing it?", a: "Never left them", wrong: ["Forgot it", "Did it once", "Told no one"], why: "I never left them since I heard it." },
        { q: "Extra prayers are on top of the five.", tf: true, why: "They are sunnah, not the obligatory five." }
      ]
    },
    {
      slug: "before-fajr",
      title: "Better than the world",
      line: "Two rak'ahs before Fajr beat the world and all in it.",
      facts: ["Told by Aishah"],
      source: hadith("muslim", "725a", "Aishah", "Sahih", "The two rak'ahs of dawn are better than this world and what it contains."),
      difficulty: 1,
      questions: [
        { q: "The two rak'ahs before Fajr are better than what?", a: "The world and all in it", wrong: ["One sweet", "A toy", "Nothing"], why: "Sahih Muslim 725a." },
        { q: "When are these two rak'ahs prayed?", a: "At dawn, before Fajr's fard", wrong: ["After Isha", "At noon", "At sunset"], why: "The two rak'ahs of dawn." },
        { q: "Who narrated this hadith?", a: "Aishah", wrong: ["Abu Jahl", "Heraclius", "Abu Lahab"], why: "The mother of the believers." }
      ]
    },
    {
      slug: "witr",
      title: "End the night with witr",
      line: "Make witr your last prayer of the night.",
      facts: ["Witr means odd"],
      source: hadith("bukhari", "998", "Abdullah bin Umar", "Sahih", "Make witr your last prayer at night."),
      difficulty: 1,
      questions: [
        { q: "Which prayer should be your last at night?", a: "Witr", wrong: ["Fajr", "Dhuhr", "Duha"], why: "Sahih al-Bukhari 998." },
        { q: "What does witr mean?", a: "Odd", wrong: ["Even", "Long", "Loud"], why: "Its rak'ahs are an odd number." },
        { q: "Witr is prayed in the night, after Isha.", tf: true, why: "It closes the night's prayers." }
      ]
    },
    {
      slug: "duha",
      title: "Duha: charity for your bones",
      line: "Every joint owes charity daily; two rak'ahs of duha cover it.",
      facts: ["Each tasbih is charity", "Duha: mid-morning"],
      source: hadith("muslim", "720", "Abu Dharr", "Sahih", "Every morning charity is due on every joint of yours. Every tasbih, tahmid, tahlil and takbir is charity; and two rak'ahs prayed at duha are enough for all of it."),
      difficulty: 2,
      questions: [
        { q: "What covers the charity due on every joint?", a: "Two rak'ahs of duha", wrong: ["A nap", "One sip of water", "A loud shout"], why: "Sahih Muslim 720." },
        { q: "When is duha prayed?", a: "In the mid-morning", wrong: ["At midnight", "After Maghrib", "Before Fajr"], why: "After sunrise, before Dhuhr." },
        { q: "Saying Subhanallah counts as charity.", tf: true, why: "Every tasbih is charity." }
      ]
    },
    {
      slug: "greet-masjid",
      title: "Greeting the masjid",
      line: "When you enter a masjid, pray two rak'ahs before you sit.",
      facts: ["Before sitting down"],
      source: hadith("bukhari", "444", "Abu Qatadah", "Sahih", "If one of you enters a masjid, let him pray two rak'ahs before he sits."),
      difficulty: 1,
      questions: [
        { q: "You walk into a masjid. What first?", a: "Pray two rak'ahs", wrong: ["Sit and chat", "Lie down", "Eat"], why: "Sahih al-Bukhari 444." },
        { q: "When are they prayed?", a: "Before sitting down", wrong: ["After leaving", "Next week", "Only on Eid"], why: "Before he sits." },
        { q: "The masjid has its own greeting prayer.", tf: true, why: "Two rak'ahs before sitting." }
      ]
    },
    {
      slug: "at-home",
      title: "Pray at home too",
      line: "Pray some prayers at home; don't make your homes like graves.",
      facts: ["Extra prayers at home"],
      source: hadith("bukhari", "432", "Ibn Umar", "Sahih", "Pray some of your prayers in your houses, and do not make them graves."),
      difficulty: 2,
      questions: [
        { q: "Where should some prayers be prayed?", a: "At home", wrong: ["Only at school", "Never at home", "Only outdoors"], why: "Sahih al-Bukhari 432." },
        { q: "A home with no prayer is likened to what?", a: "A grave", wrong: ["A garden", "A palace", "A market"], why: "Do not make them graves." },
        { q: "Family can see and learn when you pray at home.", tf: true, why: "Prayer brings life to a home." }
      ]
    }
  ]
};

const JUMUAH: DeepUnit = {
  key: "pray-jumuah",
  topicId: "prayer",
  branchId: "prayer-jumuah",
  branch: { title: "Jumu'ah", description: "The Friday prayer: getting ready, listening to the khutbah, and the hour of du'a." },
  name: "Jumu'ah",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "hurry",
      title: "Leave the trade",
      line: "When the call comes on Friday, hurry to remember Allah.",
      facts: ["Quran 62:9", "Leave buying and selling"],
      quote: quranQuote(62, 9),
      source: quran(62, 9, "O you who believe, when the call is made for prayer on Friday, hurry to the remembrance of Allah and leave trade. That is better for you, if you knew."),
      difficulty: 1,
      questions: [
        { q: "What should we leave when Jumu'ah is called?", a: "Buying and selling", wrong: ["The masjid", "Our wudu", "Our family"], why: "Quran 62:9: leave trade." },
        { q: "Where do we hurry to?", a: "The remembrance of Allah", wrong: ["The market", "A game", "Home to sleep"], why: "Hurry to the remembrance of Allah." },
        { q: "Surah Al-Jumu'ah is named after Friday.", tf: true, why: "Jumu'ah means Friday, the day of gathering." }
      ]
    },
    {
      slug: "get-ready",
      title: "Get ready for Jumu'ah",
      line: "Bathe, wear scent, listen quietly: forgiven till next Friday.",
      facts: ["Don't push between people", "Told by Salman"],
      source: hadith("bukhari", "883", "Salman al-Farisi", "Sahih", "Whoever bathes on Friday, cleans himself, puts on oil or scent, goes out without pushing between two people, prays what is written for him, then listens quietly to the imam, is forgiven what is between that Friday and the next."),
      difficulty: 1,
      questions: [
        { q: "What should you do before Jumu'ah?", a: "Bathe and wear scent", wrong: ["Skip wudu", "Wear dirty clothes", "Eat garlic"], why: "Sahih al-Bukhari 883." },
        { q: "What must you not do in the masjid?", a: "Push between two people", wrong: ["Pray", "Listen", "Sit"], why: "He does not separate two people." },
        { q: "What is forgiven for doing it all?", a: "Sins until next Friday", wrong: ["Nothing", "One sin", "Only big sins"], why: "Between that Friday and the next." }
      ]
    },
    {
      slug: "quiet",
      title: "Quiet in the khutbah",
      line: "Even saying 'be quiet' during the khutbah is idle talk.",
      facts: ["Listen to the khutbah"],
      source: hadith("bukhari", "934", "Abu Hurairah", "Sahih", "If you say to your companion 'be quiet' on Friday while the imam is giving the khutbah, you have engaged in idle talk."),
      difficulty: 2,
      questions: [
        { q: "Your friend talks in the khutbah. What do you do?", a: "Stay quiet and listen", wrong: ["Tell him 'shh!' loudly", "Talk back", "Leave"], why: "Saying 'be quiet' is idle talk too." },
        { q: "What should we do in the khutbah?", a: "Listen quietly", wrong: ["Chat", "Play games", "Sleep"], why: "Sahih al-Bukhari 934." },
        { q: "Talking in the khutbah is fine if it's short.", tf: false, why: "Even 'be quiet' counts as idle talk." }
      ]
    },
    {
      slug: "angels-door",
      title: "Angels at the door",
      line: "On Friday, angels at the masjid door write who comes first.",
      facts: ["Early is best", "They stop at the khutbah"],
      source: hadith("bukhari", "929", "Abu Hurairah", "Sahih", "On Friday the angels stand at the masjid door writing down who comes, in order. When the imam sits for the khutbah, they fold their pages and come to listen."),
      difficulty: 1,
      questions: [
        { q: "Who writes down the names at the masjid door?", a: "The angels", wrong: ["The imam", "The guard", "Nobody"], why: "Sahih al-Bukhari 929." },
        { q: "When do the angels close their pages?", a: "When the khutbah starts", wrong: ["At sunrise", "After Asr", "Never"], why: "They fold their pages and listen." },
        { q: "Coming early to Jumu'ah has more reward.", tf: true, why: "The first comers are like those who give a camel." }
      ]
    },
    {
      slug: "hour",
      title: "The hour of du'a",
      line: "On Friday there's an hour when every du'a gets answered.",
      facts: ["A short time"],
      source: hadith("bukhari", "935", "Abu Hurairah", "Sahih", "There is an hour on Friday: a Muslim who meets it while praying and asks Allah for something, Allah gives it to him. He ﷺ showed with his hand how short it is."),
      difficulty: 2,
      questions: [
        { q: "What is special about this hour on Friday?", a: "Du'a is answered", wrong: ["Shops are free", "No one prays", "It lasts all day"], why: "Sahih al-Bukhari 935." },
        { q: "How long is that hour?", a: "Short", wrong: ["All day", "A week", "A month"], why: "He ﷺ showed its shortness with his hand." },
        { q: "Make many du'as on Fridays.", tf: true, why: "To meet that hour." }
      ]
    },
    {
      slug: "after",
      title: "After Jumu'ah",
      line: "After the prayer, spread out, seek Allah's bounty, remember Him.",
      facts: ["Quran 62:10", "Work is allowed after"],
      quote: quranQuote(62, 10),
      source: quran(62, 10, "And when the prayer is finished, spread through the land and seek the bounty of Allah, and remember Allah much so that you may succeed."),
      difficulty: 2,
      questions: [
        { q: "What may we do after Jumu'ah ends?", a: "Go and seek Allah's bounty", wrong: ["Never work again", "Stay until night", "Sleep in the masjid"], why: "Quran 62:10." },
        { q: "What should we keep doing all day?", a: "Remember Allah much", wrong: ["Complain", "Forget Him", "Gossip"], why: "Remember Allah much so you may succeed." },
        { q: "Friday is a day of rest from all work, all day.", tf: false, why: "After the prayer, go and seek Allah's bounty." }
      ]
    }
  ]
};

const AFTER: DeepUnit = {
  key: "pray-after",
  topicId: "prayer",
  branchId: "prayer-after-salah",
  branch: { title: "After the salah", description: "The words he ﷺ said after salam, and the du'a he told Mu'adh never to leave." },
  name: "after the salah",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "istighfar",
      title: "Astaghfirullah three times",
      line: "After salam, he ﷺ said Astaghfirullah three times.",
      facts: ["Then: Allahumma antas-salam"],
      source: hadith("muslim", "591", "Thawban", "Sahih", "When the Messenger of Allah ﷺ finished his prayer he asked forgiveness three times and said: O Allah, You are Peace and from You is peace; blessed are You, Owner of majesty and honor."),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ say three times after salam?", a: "Astaghfirullah", wrong: ["Goodbye", "Nothing", "Bismillah"], why: "Sahih Muslim 591." },
        { q: "What does Allahumma antas-salam mean?", a: "O Allah, You are Peace", wrong: ["O Allah, I am tired", "Peace be on me", "Let's go"], why: "And from You is peace." },
        { q: "Asking forgiveness right after salah is Sunnah.", tf: true, why: "He ﷺ did it three times." }
      ]
    },
    {
      slug: "thirty-three",
      title: "33, 33, 33",
      line: "After salah: Subhanallah 33, Alhamdulillah 33, Allahu akbar 33.",
      facts: ["Then one more to make 100"],
      source: hadith("muslim", "597a", "Abu Hurairah", "Sahih", "Whoever says Subhanallah 33 times, Alhamdulillah 33 and Allahu akbar 33 after every prayer, and completes the hundred with La ilaha illallah wahdahu la sharika lah, his sins are forgiven even if like the foam of the sea."),
      difficulty: 1,
      questions: [
        { q: "How many times each: Subhanallah, Alhamdulillah, Allahu akbar?", a: "33", wrong: ["3", "10", "100"], why: "Sahih Muslim 597a." },
        { q: "What makes it a full hundred?", a: "La ilaha illallah...", wrong: ["Clapping", "Amin", "A song"], why: "La ilaha illallah wahdahu la sharika lah." },
        { q: "What is forgiven for it?", a: "Sins, even like sea foam", wrong: ["Only one sin", "Nothing", "Only big sins"], why: "Even if like the foam of the sea." }
      ]
    },
    {
      slug: "muadh-dua",
      title: "Help me remember You",
      line: "After each salah: O Allah, help me remember and thank You.",
      facts: ["I love you, Mu'adh", "Help me worship You well"],
      source: hadith("abudawud", "1522", "Mu'adh bin Jabal", "Sahih", "He ﷺ took Mu'adh's hand and said: by Allah, I love you. Never leave saying after every prayer: O Allah, help me to remember You, to thank You, and to worship You well."),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ tell Mu'adh before the du'a?", a: "By Allah, I love you", wrong: ["You are late", "Go home", "Be quiet"], why: "Sunan Abi Dawud 1522." },
        { q: "What does the du'a ask help for?", a: "Remembering, thanking, worshipping well", wrong: ["Getting rich", "Winning games", "Being famous"], why: "Help me remember You, thank You, worship You well." },
        { q: "When should this du'a be said?", a: "After every prayer", wrong: ["Only on Eid", "Once a year", "Only when sad"], why: "Never leave it after every prayer." }
      ]
    }
  ]
};

export const PRAYER_UNITS: DeepUnit[] = [REWARD, EXTRA, JUMUAH, AFTER];
