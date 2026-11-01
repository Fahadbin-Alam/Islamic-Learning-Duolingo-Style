import { hadith, quran, quranQuote, type DeepUnit } from "./deepKit";

// Deep units for the Fasting topic, added after its own four units: the reward of fasting, suhur and iftar,
// extra fasts, ease for those who can't, and the last ten nights. Every card is from the Quran or a sahih hadith
// (number and grade as sunnah.com gives them). Points the schools of fiqh differ on are left out.

const REWARD: DeepUnit = {
  key: "fast-reward",
  topicId: "fasting",
  branchId: "fasting-reward",
  branch: { title: "The reward of fasting", description: "What Allah promises the one who fasts: a shield, forgiveness and joy." },
  name: "the reward of fasting",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "before-you",
      title: "Like those before you",
      line: "Fasting was written for us as it was for nations before us.",
      facts: ["Quran 2:183", "To gain taqwa"],
      quote: quranQuote(2, 183),
      source: quran(2, 183, "O you who believe, fasting is prescribed for you as it was prescribed for those before you, so that you may become mindful of Allah."),
      difficulty: 1,
      questions: [
        { q: "Were Muslims the first people told to fast?", a: "No, nations before fasted too", wrong: ["Yes, the very first", "Only angels fasted before", "No one fasts anymore"], why: "As it was prescribed for those before you." },
        { q: "What is fasting meant to grow in us?", a: "Taqwa, mindfulness of Allah", wrong: ["Hunger for fame", "Love of money", "Laziness"], why: "Quran 2:183: so that you may gain taqwa." },
        { q: "Fasting is a command found in the Quran.", tf: true, why: "Fasting is prescribed for you." }
      ]
    },
    {
      slug: "shield",
      title: "Fasting is a shield",
      line: "Fasting is a shield. If someone fights you, say: I am fasting.",
      facts: ["A shield from sin", "Say: I am fasting"],
      source: hadith("bukhari", "1894", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: fasting is a shield. The fasting person should not behave foolishly, and if someone fights or insults him, he should say twice: I am fasting."),
      difficulty: 1,
      questions: [
        { q: "What did the Prophet ﷺ call fasting?", a: "A shield", wrong: ["A burden", "A punishment", "A game"], why: "Sahih al-Bukhari 1894." },
        { q: "Someone insults you while fasting. What do you say?", a: "I am fasting", wrong: ["Insult them back", "Break your fast", "Say nothing ever again"], why: "He ﷺ said to say it twice." },
        { q: "A fasting person should stay calm and avoid fights.", tf: true, why: "Fasting shields you from foolish words." }
      ]
    },
    {
      slug: "musk",
      title: "Better than musk",
      line: "To Allah, a fasting mouth smells better than musk.",
      facts: ["Musk is a perfume", "Left food for Allah"],
      source: hadith("bukhari", "1894", "Abu Hurairah", "Sahih", "By Him in whose hand my soul is, the smell from the mouth of a fasting person is better to Allah than the smell of musk. He has left his food, drink and desires for My sake."),
      difficulty: 1,
      questions: [
        { q: "To Allah, a fasting mouth smells better than what?", a: "Musk", wrong: ["Bread", "Roses only", "Rain"], why: "Sahih al-Bukhari 1894." },
        { q: "Why does Allah love the fasting person?", a: "He left food and drink for Allah", wrong: ["He slept all day", "He ate in secret", "He shouted loudly"], why: "He left them for My sake, says Allah." },
        { q: "Musk is a famous sweet perfume.", tf: true, why: "So the comparison is a great honor." }
      ]
    },
    {
      slug: "forgiven",
      title: "Sins forgiven",
      line: "Fast Ramadan with faith and hope, and past sins are forgiven.",
      facts: ["With faith", "Hoping for reward"],
      source: hadith("bukhari", "38", "Abu Hurairah", "Sahih", "Whoever fasts Ramadan out of faith and hoping for Allah's reward, his past sins will be forgiven."),
      difficulty: 1,
      questions: [
        { q: "Fasting Ramadan with faith and hope brings what?", a: "Past sins forgiven", wrong: ["A new house", "No more tests", "Fame"], why: "Sahih al-Bukhari 38." },
        { q: "Which two things must go with the fast?", a: "Faith and hoping for reward", wrong: ["Fame and praise", "Sleep and rest", "Shopping and gifts"], why: "Out of faith and hoping for reward." },
        { q: "Fasting only to look good gets the same promise.", tf: false, why: "It must be with faith, hoping for Allah's reward." }
      ]
    },
    {
      slug: "gates",
      title: "Gates opened",
      line: "In Ramadan, heaven's gates open and the devils are chained.",
      facts: ["Hell's gates closed", "Devils chained"],
      source: hadith("bukhari", "1899", "Abu Hurairah", "Sahih", "When Ramadan begins, the gates of heaven are opened, the gates of Hell are closed, and the devils are chained."),
      difficulty: 1,
      questions: [
        { q: "What happens to heaven's gates when Ramadan begins?", a: "They are opened", wrong: ["They are locked", "They disappear", "Nothing at all"], why: "Sahih al-Bukhari 1899." },
        { q: "What happens to the devils in Ramadan?", a: "They are chained", wrong: ["They grow stronger", "They are set free", "They become angels"], why: "And the devils are chained." },
        { q: "The gates of Hell are closed in Ramadan.", tf: true, why: "As the hadith says." }
      ]
    },
    {
      slug: "seventy-years",
      title: "Seventy years away",
      line: "Fast one day for Allah; He keeps you far from the Fire.",
      facts: ["One day's fast", "Seventy years away"],
      source: hadith("bukhari", "2840", "Abu Sa'id al-Khudri", "Sahih", "Whoever fasts one day for Allah's sake, Allah will keep his face away from the Fire the distance of seventy years."),
      difficulty: 2,
      questions: [
        { q: "One day's fast for Allah keeps your face how far from the Fire?", a: "Seventy years' distance", wrong: ["One step", "Seven days", "One mile"], why: "Sahih al-Bukhari 2840." },
        { q: "How many days of fasting does this promise need?", a: "Just one, for Allah", wrong: ["A whole year", "Forty days", "Seven years"], why: "Whoever fasts one day for Allah's sake." },
        { q: "The fast must be for Allah's sake.", tf: true, why: "Not for show." }
      ]
    },
    {
      slug: "two-joys",
      title: "Two joys",
      line: "A fasting person has two joys: at iftar, and meeting his Lord.",
      facts: ["Joy at iftar", "Joy meeting Allah"],
      source: hadith("bukhari", "1904", "Abu Hurairah", "Sahih", "There are two joys for the fasting person: one when he breaks his fast, and one when he meets his Lord and is pleased with his fasting."),
      difficulty: 2,
      questions: [
        { q: "When is the fasting person's first joy?", a: "When breaking the fast", wrong: ["At suhur", "At noon", "When the alarm rings"], why: "Sahih al-Bukhari 1904." },
        { q: "When is the second joy?", a: "When meeting his Lord", wrong: ["At school", "At the market", "At bedtime"], why: "He is pleased with his fasting then." },
        { q: "Feeling happy at iftar is part of the reward.", tf: true, why: "The Prophet ﷺ named it as one of the two joys." }
      ]
    }
  ]
};

const SUHUR: DeepUnit = {
  key: "fast-suhur",
  topicId: "fasting",
  branchId: "fasting-suhur-iftar",
  branch: { title: "Suhur and iftar", description: "The two meals of the fasting day, the way the Prophet ﷺ ate them." },
  name: "suhur and iftar",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "blessing",
      title: "Blessing in suhur",
      line: "Eat suhur, for there is blessing in it.",
      facts: ["Even a little", "The meal before dawn"],
      source: hadith("bukhari", "1923", "Anas bin Malik", "Sahih", "The Prophet ﷺ said: take suhur, for in suhur there is blessing."),
      difficulty: 1,
      questions: [
        { q: "What did the Prophet ﷺ say is in suhur?", a: "Blessing", wrong: ["Harm", "Nothing at all", "Only tiredness"], why: "Sahih al-Bukhari 1923." },
        { q: "When is suhur eaten?", a: "Before dawn", wrong: ["At sunset", "At noon", "At midnight only"], why: "It is the meal before the fast begins." },
        { q: "The Prophet ﷺ told us to skip suhur.", tf: false, why: "He told us to eat it, for it has blessing." }
      ]
    },
    {
      slug: "fifty-verses",
      title: "Suhur close to dawn",
      line: "His ﷺ suhur ended about fifty verses' time before Fajr.",
      facts: ["Told by Zaid ibn Thabit", "Suhur, then prayer"],
      source: hadith("bukhari", "1921", "Zaid ibn Thabit", "Sahih", "We ate suhur with the Prophet ﷺ, then he stood for the prayer. Asked how long was between them, Zaid said: the time to recite fifty verses."),
      difficulty: 2,
      questions: [
        { q: "How long between his ﷺ suhur and the prayer?", a: "About fifty verses' time", wrong: ["Three hours", "A whole day", "No time at all"], why: "Sahih al-Bukhari 1921." },
        { q: "So when did he ﷺ eat suhur?", a: "Late, close to dawn", wrong: ["Right after Isha", "At sunset", "At noon"], why: "Only fifty verses before the prayer." },
        { q: "Zaid ibn Thabit ate suhur with the Prophet ﷺ.", tf: true, why: "He told Anas about it." }
      ]
    },
    {
      slug: "two-adhans",
      title: "Eat until the second call",
      line: "Bilal called at night; they ate until Ibn Umm Maktum's call.",
      facts: ["Two callers", "The second meant dawn"],
      source: hadith("bukhari", "617", "Abdullah bin Umar", "Sahih", "Bilal calls the adhan at night, so eat and drink until Ibn Umm Maktum calls. He was a blind man who called only when told: it is dawn."),
      difficulty: 2,
      questions: [
        { q: "Whose adhan told them to stop eating?", a: "Ibn Umm Maktum's", wrong: ["Bilal's first call", "Abu Bakr's", "No one's"], why: "Sahih al-Bukhari 617." },
        { q: "Ibn Umm Maktum called when told what?", a: "It is dawn", wrong: ["It is noon", "It is sunset", "It is midnight"], why: "He was blind and waited to be told." },
        { q: "Bilal's call at night meant the fast had started.", tf: false, why: "They kept eating until the second call." }
      ]
    },
    {
      slug: "hasten",
      title: "Don't delay iftar",
      line: "People stay on good while they hurry to break the fast.",
      facts: ["Break it at sunset", "No waiting"],
      source: hadith("bukhari", "1957", "Sahl bin Sa'd", "Sahih", "The people will remain on the right path as long as they hasten to break the fast."),
      difficulty: 1,
      questions: [
        { q: "When should we break the fast?", a: "Right at sunset", wrong: ["An hour after", "At midnight", "At dawn"], why: "Hurrying iftar is the right path." },
        { q: "People stay on good as long as they do what?", a: "Hurry to break the fast", wrong: ["Delay iftar", "Skip iftar", "Eat before sunset"], why: "Sahih al-Bukhari 1957." },
        { q: "Waiting long after sunset earns extra reward.", tf: false, why: "He ﷺ praised hurrying to break it." }
      ]
    },
    {
      slug: "dates",
      title: "Dates, or water",
      line: "He ﷺ broke his fast with fresh dates, dry dates, or water.",
      facts: ["Before Maghrib prayer", "Water if no dates"],
      source: hadith("abudawud", "2356", "Anas ibn Malik", "Hasan Sahih", "The Messenger of Allah ﷺ broke his fast before praying with fresh dates; if there were none, then dry dates; and if there were none, a few sips of water."),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ break his fast with first?", a: "Fresh dates", wrong: ["Cake", "Meat", "Bread"], why: "Sunan Abi Dawud 2356." },
        { q: "If there were no dates at all, then what?", a: "A few sips of water", wrong: ["He kept fasting", "Milk only", "Nothing"], why: "Mouthfuls of water." },
        { q: "He ﷺ ate before praying Maghrib.", tf: true, why: "He broke his fast before praying." }
      ]
    },
    {
      slug: "feed",
      title: "Feed a fasting person",
      line: "Feed a fasting person and get his reward, his not cut.",
      facts: ["Same reward", "His is not cut"],
      source: hadith("tirmidhi", "807", "Zaid bin Khalid Al-Juhani", "Sahih", "Whoever gives food to a fasting person to break his fast gets the same reward as him, without the fasting person's reward being lessened."),
      difficulty: 1,
      questions: [
        { q: "What do you get for feeding someone at iftar?", a: "The same reward as his fast", wrong: ["Nothing", "Half a reward", "Only thanks"], why: "Jami at-Tirmidhi 807." },
        { q: "Does the fasting person lose some reward?", a: "No, nothing is cut", wrong: ["Yes, half", "Yes, all of it", "Only if he's rich"], why: "Without his reward being lessened." },
        { q: "Sharing iftar food with others earns reward.", tf: true, why: "Whoever gives food to break the fast." }
      ]
    },
    {
      slug: "white-thread",
      title: "The white thread",
      line: "Eat until dawn's white thread shows from the black of night.",
      facts: ["Quran 2:187", "Then fast until night"],
      source: quran(2, 187, "Eat and drink until the white thread of dawn becomes clear to you from the black thread, then complete the fast until night."),
      difficulty: 2,
      questions: [
        { q: "What is the white thread in this ayah?", a: "The first light of dawn", wrong: ["A real string", "The moon", "A white cloth"], why: "The white thread of dawn, Quran 2:187." },
        { q: "Until when does the fast last?", a: "Until night", wrong: ["Until noon", "Until Asr", "Until the next dawn"], why: "Then complete the fast until night." },
        { q: "Eating is allowed before dawn.", tf: true, why: "Eat and drink until dawn is clear." }
      ]
    }
  ]
};

const EXTRA: DeepUnit = {
  key: "fast-extra",
  topicId: "fasting",
  branchId: "fasting-extra",
  branch: { title: "Extra fasts", description: "The fasts he ﷺ loved beyond Ramadan, and the days not to fast." },
  name: "extra fasts",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "monday-thursday",
      title: "Monday and Thursday",
      line: "Deeds are shown on Monday and Thursday; he ﷺ liked to fast then.",
      facts: ["Deeds shown to Allah", "Twice a week"],
      source: hadith("tirmidhi", "747", "Abu Hurairah", "Sahih", "Deeds are presented on Monday and Thursday, and I love that my deeds be presented while I am fasting."),
      difficulty: 1,
      questions: [
        { q: "On which days are deeds presented?", a: "Monday and Thursday", wrong: ["Friday and Saturday", "Every Sunday", "Only in Ramadan"], why: "Jami at-Tirmidhi 747." },
        { q: "How did he ﷺ want to be when his deeds were shown?", a: "Fasting", wrong: ["Sleeping", "Traveling", "Eating"], why: "I love that my deeds be shown while I fast." },
        { q: "These two days are a good habit for extra fasts.", tf: true, why: "He ﷺ loved fasting on them." }
      ]
    },
    {
      slug: "three-days",
      title: "Three days a month",
      line: "Fast three days each month; it counts like a whole year.",
      facts: ["Each good deed is ten", "Three counts as thirty"],
      source: hadith("bukhari", "1979", "Abdullah ibn Amr", "Sahih", "The Prophet ﷺ told Abdullah ibn Amr: fasting three days a month is equal to fasting the whole year."),
      difficulty: 2,
      questions: [
        { q: "Three days a month count like fasting how long?", a: "A whole year", wrong: ["One week", "One month", "Ten years"], why: "Sahih al-Bukhari 1979." },
        { q: "Why does three days count like thirty?", a: "Each good deed counts as ten", wrong: ["The days are longer", "It's a guess", "Angels add more days"], why: "Ten for every good deed." },
        { q: "Who was told this?", a: "Abdullah ibn Amr", wrong: ["Abu Jahl", "Abu Lahab", "Heraclius"], why: "He wanted to fast every day." }
      ]
    },
    {
      slug: "dawud",
      title: "The fast of Dawud",
      line: "Dawud fasted one day and ate the next. Allah loves that fast.",
      facts: ["Prophet Dawud", "Every other day"],
      source: hadith("bukhari", "1131", "Abdullah ibn Amr", "Sahih", "The most beloved fasting to Allah is the fasting of Dawud: he used to fast one day and not the next."),
      difficulty: 2,
      questions: [
        { q: "How did Prophet Dawud fast?", a: "One day on, one day off", wrong: ["Every single day", "Once a year", "Only Fridays"], why: "Sahih al-Bukhari 1131." },
        { q: "Which extra fast is most loved by Allah?", a: "The fast of Dawud", wrong: ["Fasting every day", "Fasting with no suhur", "Fasting on Eid"], why: "The most beloved fasting to Allah." },
        { q: "Dawud also prayed part of the night and slept part.", tf: true, why: "The same hadith describes his night." }
      ]
    },
    {
      slug: "shaban",
      title: "Most in Sha'ban",
      line: "After Ramadan, he ﷺ fasted most in the month of Sha'ban.",
      facts: ["Sha'ban is before Ramadan", "Told by Aishah"],
      source: hadith("bukhari", "1969", "Aishah", "Sahih", "I never saw the Messenger of Allah ﷺ fast a whole month except Ramadan, and I never saw him fast more in any month than in Sha'ban."),
      difficulty: 2,
      questions: [
        { q: "Besides Ramadan, which month did he ﷺ fast most?", a: "Sha'ban", wrong: ["Shawwal", "Rajab", "Safar"], why: "Sahih al-Bukhari 1969." },
        { q: "Which month did he ﷺ fast in full?", a: "Only Ramadan", wrong: ["Sha'ban too", "Every month", "Muharram"], why: "Aishah never saw him fast a whole month except Ramadan." },
        { q: "Sha'ban comes right before Ramadan.", tf: true, why: "It is the eighth month; Ramadan is the ninth." }
      ]
    },
    {
      slug: "muharram",
      title: "Allah's month, Muharram",
      line: "The best fast after Ramadan is in Allah's month, Muharram.",
      facts: ["First Islamic month"],
      source: hadith("muslim", "1163", "Abu Hurairah", "Sahih", "The best fasting after Ramadan is in Allah's month, al-Muharram, and the best prayer after the obligatory ones is the night prayer."),
      difficulty: 2,
      questions: [
        { q: "Which month did he ﷺ call Allah's month?", a: "Muharram", wrong: ["Ramadan", "Dhul-Hijjah", "Sha'ban"], why: "Sahih Muslim 1163." },
        { q: "And the best prayer after the five?", a: "The night prayer", wrong: ["Eid prayer only", "No other prayer", "A noon nap"], why: "The same hadith names it." },
        { q: "Muharram is the first month of the Islamic year.", tf: true, why: "The year starts with Muharram." }
      ]
    },
    {
      slug: "not-on-eid",
      title: "No fasting on Eid",
      line: "He ﷺ forbade fasting on the two Eid days.",
      facts: ["Eid al-Fitr", "Eid al-Adha"],
      source: hadith("bukhari", "1992", "Abu Sa'id al-Khudri", "Sahih", "The Prophet ﷺ forbade fasting on the day of Eid al-Fitr and the day of Eid al-Adha."),
      difficulty: 1,
      questions: [
        { q: "On which days must we not fast?", a: "The two Eid days", wrong: ["Mondays", "Thursdays", "Days in Sha'ban"], why: "Sahih al-Bukhari 1992." },
        { q: "What are the two Eids?", a: "Eid al-Fitr and Eid al-Adha", wrong: ["Eid al-Qadr and Eid al-Isra", "Two Fridays", "New Year and Ashura"], why: "Both are named in the hadith." },
        { q: "Fasting on Eid earns extra reward.", tf: false, why: "He ﷺ forbade it; Eid is for joy and eating." }
      ]
    },
    {
      slug: "friday",
      title: "Not Friday alone",
      line: "Don't fast Friday alone; add the day before or after it.",
      facts: ["Thursday or Saturday too"],
      source: hadith("bukhari", "1985", "Abu Hurairah", "Sahih", "None of you should fast on Friday unless he fasts a day before it or after it."),
      difficulty: 3,
      questions: [
        { q: "You want to fast on a Friday. What else?", a: "Fast the day before or after", wrong: ["Nothing else", "Skip Jumu'ah", "Fast a whole week"], why: "Sahih al-Bukhari 1985." },
        { q: "Which day should not be fasted on its own?", a: "Friday", wrong: ["Monday", "Thursday", "A day in Muharram"], why: "Unless with a day before or after." },
        { q: "Fasting Thursday and Friday together is fine.", tf: true, why: "That adds the day before." }
      ]
    }
  ]
};

const EASE: DeepUnit = {
  key: "fast-ease",
  topicId: "fasting",
  branchId: "fasting-ease",
  branch: { title: "Ease in fasting", description: "Allah wants ease for us: travelers, the sick, and making up missed days." },
  name: "ease in fasting",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "allah-wants-ease",
      title: "Allah wants ease",
      line: "Allah wants ease for you, and does not want hardship.",
      facts: ["Quran 2:185"],
      quote: quranQuote(2, 185),
      source: quran(2, 185, "Whoever is sick or on a journey, then an equal number of other days. Allah wants ease for you and does not want hardship for you."),
      difficulty: 1,
      questions: [
        { q: "What does Allah want for us in fasting?", a: "Ease", wrong: ["Hardship", "Pain", "Hunger only"], why: "Quran 2:185." },
        { q: "Who may skip a Ramadan day and make it up?", a: "The sick and travelers", wrong: ["Anyone who is bored", "Anyone busy with games", "No one"], why: "Sick or on a journey: other days." },
        { q: "Islam wants fasting to harm people.", tf: false, why: "He does not want hardship for you." }
      ]
    },
    {
      slug: "traveler",
      title: "The traveler's choice",
      line: "A traveler asked him ﷺ about fasting: fast or not, as you wish.",
      facts: ["Asked by Hamzah al-Aslami"],
      source: hadith("bukhari", "1943", "Aishah", "Sahih", "Hamzah ibn Amr al-Aslami asked the Prophet ﷺ: should I fast while traveling? He said: fast if you wish, and do not fast if you wish."),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ tell the traveler?", a: "Fast or not, as you wish", wrong: ["You must fast", "You may never fast", "Fast twice as long"], why: "Sahih al-Bukhari 1943." },
        { q: "Who asked this question?", a: "Hamzah al-Aslami", wrong: ["Abu Jahl", "Bilal", "Khalid"], why: "Hamzah ibn Amr al-Aslami." },
        { q: "A traveler who doesn't fast makes it up later.", tf: true, why: "Quran 2:185: an equal number of other days." }
      ]
    },
    {
      slug: "other-days",
      title: "Make up the days",
      line: "Missed days are fasted later: the same number of days.",
      facts: ["Quran 2:184", "Same number of days"],
      source: quran(2, 184, "Fasting is for a set number of days. Whoever of you is sick or on a journey, then an equal number of other days."),
      difficulty: 1,
      questions: [
        { q: "You missed 3 days for illness. How many to make up?", a: "Three", wrong: ["One", "Ten", "None"], why: "An equal number of other days." },
        { q: "When are missed days made up?", a: "On other days, after Ramadan", wrong: ["Never", "Only next Ramadan", "On Eid day"], why: "Quran 2:184." },
        { q: "Ramadan is a set number of days.", tf: true, why: "Allah calls them days that are counted." }
      ]
    },
    {
      slug: "aishah-shaban",
      title: "Aishah's make-up days",
      line: "Aishah sometimes made up her Ramadan days as late as Sha'ban.",
      facts: ["Before next Ramadan", "She served the Prophet ﷺ"],
      source: hadith("bukhari", "1950", "Aishah", "Sahih", "Sometimes I had days of Ramadan to make up, and I could not do so until Sha'ban."),
      difficulty: 2,
      questions: [
        { q: "In which month did Aishah sometimes make up her fasts?", a: "Sha'ban", wrong: ["Ramadan", "Shawwal only", "Never"], why: "Sahih al-Bukhari 1950." },
        { q: "Why was she busy, said a narrator?", a: "Serving the Prophet ﷺ", wrong: ["Traveling to Rome", "Building a house", "Selling goods"], why: "Yahya, a narrator, said so." },
        { q: "Sha'ban is still before the next Ramadan.", tf: true, why: "So the days were made up within the year." }
      ]
    },
    {
      slug: "balance",
      title: "Fast and eat, pray and sleep",
      line: "He ﷺ said: fast some days and eat some, pray and sleep.",
      facts: ["Your body has a right", "No fasting all year"],
      source: hadith("bukhari", "1976", "Abdullah ibn Amr", "Sahih", "Abdullah ibn Amr vowed to fast every day and pray all night. The Prophet ﷺ said: you cannot do that. Fast and break your fast, pray and sleep."),
      difficulty: 2,
      questions: [
        { q: "What did Abdullah ibn Amr plan to do?", a: "Fast every day, pray all night", wrong: ["Never fast", "Sleep all day", "Leave Madinah"], why: "Sahih al-Bukhari 1976." },
        { q: "What did the Prophet ﷺ tell him?", a: "Fast and eat, pray and sleep", wrong: ["Never sleep", "Fast every day", "Stop praying"], why: "You cannot do that, he ﷺ said." },
        { q: "Islam asks for balance in worship.", tf: true, why: "He ﷺ stopped too much fasting too." }
      ]
    }
  ]
};

const LAST_TEN: DeepUnit = {
  key: "fast-last-ten",
  topicId: "fasting",
  branchId: "fasting-last-ten",
  branch: { title: "The last ten nights", description: "How he ﷺ spent the end of Ramadan, and how to seek Laylat al-Qadr." },
  name: "the last ten nights",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "strive",
      title: "Trying harder",
      line: "In the last ten nights, he ﷺ worked harder than any other time.",
      facts: ["The end of Ramadan", "Told by Aishah"],
      source: hadith("muslim", "1175", "Aishah", "Sahih", "The Messenger of Allah ﷺ used to strive in worship in the last ten nights more than at any other time."),
      difficulty: 1,
      questions: [
        { q: "When did he ﷺ worship hardest of all?", a: "The last ten nights of Ramadan", wrong: ["The first day of Shawwal", "The middle of Rajab", "Eid day"], why: "Sahih Muslim 1175." },
        { q: "Who told us this?", a: "Aishah", wrong: ["Abu Jahl", "Heraclius", "Waraqah"], why: "His wife Aishah." },
        { q: "The end of Ramadan is time to slow down.", tf: false, why: "He ﷺ worked hardest at the end." }
      ]
    },
    {
      slug: "family",
      title: "Waking the family",
      line: "He ﷺ tightened his belt, prayed all night and woke his family.",
      facts: ["Tightened his belt", "Woke his family"],
      source: hadith("bukhari", "2024", "Aishah", "Sahih", "When the last ten days began, the Prophet ﷺ tightened his waist wrapper, gave life to the night, and woke his family."),
      difficulty: 1,
      questions: [
        { q: "Whom did he ﷺ wake up in the last ten nights?", a: "His family", wrong: ["No one", "Only the guards", "The whole city by shouting"], why: "Sahih al-Bukhari 2024." },
        { q: "What does tightening his belt mean here?", a: "Getting ready to work hard", wrong: ["He gained weight", "He went to war", "He bought new clothes"], why: "He ﷺ got serious about worship." },
        { q: "He ﷺ wanted his family to share the reward.", tf: true, why: "He woke them for the night prayer." }
      ]
    },
    {
      slug: "itikaf",
      title: "I'tikaf",
      line: "He ﷺ stayed in the masjid for i'tikaf in the last ten days.",
      facts: ["Every year until he died", "His wives did it after"],
      source: hadith("bukhari", "2026", "Aishah", "Sahih", "The Prophet ﷺ used to do i'tikaf in the last ten days of Ramadan until he passed away, and his wives did i'tikaf after him."),
      difficulty: 2,
      questions: [
        { q: "What is i'tikaf?", a: "Staying in the masjid for worship", wrong: ["A kind of food", "A long trip", "A market"], why: "He ﷺ stayed in the masjid in the last ten days." },
        { q: "Who kept doing i'tikaf after he ﷺ passed away?", a: "His wives", wrong: ["No one", "Only kings", "Only children"], why: "Sahih al-Bukhari 2026." },
        { q: "He ﷺ did i'tikaf only once.", tf: false, why: "Every year until he passed away." }
      ]
    },
    {
      slug: "odd-nights",
      title: "The odd nights",
      line: "Seek Laylat al-Qadr in the odd nights of the last ten.",
      facts: ["21, 23, 25, 27, 29"],
      source: hadith("bukhari", "2017", "Aishah", "Sahih", "Seek the Night of Qadr in the odd nights of the last ten days of Ramadan."),
      difficulty: 1,
      questions: [
        { q: "Where should we seek Laylat al-Qadr?", a: "The odd nights of the last ten", wrong: ["The first night only", "Any night in Shawwal", "Eid night only"], why: "Sahih al-Bukhari 2017." },
        { q: "Which of these is an odd night?", a: "The 25th", wrong: ["The 22nd", "The 24th", "The 26th"], why: "Odd nights: 21, 23, 25, 27, 29." },
        { q: "We were told the exact date of Laylat al-Qadr.", tf: false, why: "We were told to seek it in the odd nights." }
      ]
    },
    {
      slug: "afuww",
      title: "The du'a for that night",
      line: "Say: O Allah, You pardon and love to pardon, so pardon me.",
      facts: ["Taught to Aishah", "Allahumma innaka afuwwun"],
      source: hadith("tirmidhi", "3513", "Aishah", "Sahih", "Aishah asked what to say if she knew the Night of Qadr. He ﷺ said: say, O Allah, You are the Pardoner, You love to pardon, so pardon me."),
      difficulty: 1,
      questions: [
        { q: "What should we ask for on Laylat al-Qadr?", a: "Allah's pardon", wrong: ["Fame", "Gold", "A fast car"], why: "Jami at-Tirmidhi 3513." },
        { q: "Who asked him ﷺ what to say that night?", a: "Aishah", wrong: ["Umar", "Bilal", "Ali"], why: "She asked, and he taught her this du'a." },
        { q: "Allah loves to pardon.", tf: true, why: "You love to pardon, says the du'a." }
      ]
    },
    {
      slug: "stand-the-night",
      title: "Stand that night",
      line: "Pray on Laylat al-Qadr with faith, and past sins are forgiven.",
      facts: ["With faith", "Hoping for reward"],
      source: hadith("bukhari", "1901", "Abu Hurairah", "Sahih", "Whoever prays on the Night of Qadr out of faith and hoping for reward, his past sins will be forgiven."),
      difficulty: 1,
      questions: [
        { q: "Praying on Laylat al-Qadr with faith brings what?", a: "Past sins forgiven", wrong: ["A prize at school", "Nothing", "A long sleep"], why: "Sahih al-Bukhari 1901." },
        { q: "What must the prayer come with?", a: "Faith and hope for reward", wrong: ["Showing off", "Loud music", "A big crowd"], why: "Out of faith and hoping for reward." },
        { q: "This promise is for that one night's prayer.", tf: true, why: "Whoever prays on the Night of Qadr." }
      ]
    },
    {
      slug: "angels-descend",
      title: "Angels come down",
      line: "The angels and the Spirit come down that night. Peace till dawn.",
      facts: ["Quran 97:4-5", "Peace until dawn"],
      quote: quranQuote(97, 4),
      source: quran(97, 4, "The angels and the Spirit descend in it by permission of their Lord with every matter. Peace it is until the rise of dawn."),
      difficulty: 2,
      questions: [
        { q: "Who comes down on Laylat al-Qadr?", a: "The angels and the Spirit", wrong: ["No one", "Only the jinn", "The stars"], why: "Quran 97:4: the angels and the Spirit." },
        { q: "How long does the night's peace last?", a: "Until dawn", wrong: ["Until midnight", "One hour", "Until noon"], why: "Quran 97:5." },
        { q: "That night is full of peace until dawn.", tf: true, why: "Peace it is, until the rise of dawn." }
      ]
    }
  ]
};

export const FASTING_UNITS: DeepUnit[] = [REWARD, SUHUR, EXTRA, EASE, LAST_TEN];
