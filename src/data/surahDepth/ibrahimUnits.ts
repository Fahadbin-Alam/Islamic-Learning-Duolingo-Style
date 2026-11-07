import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Ibrahim ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Ibrahim 14:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_14_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Ibrahim 14:${ayah}`,
    url: `https://quran.com/14:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 14:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q14 = (ayah: number) => quranQuote(14, ayah);

/** Ayahs 1 to 12: out of darkness into light, Musa and the days of Allah, thankfulness, and the Messengers' trust in Allah. */
const IBRAHIM_ONE: DeepUnit = {
  key: "ibrahim1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-14",
  name: "Ibrahim, ayahs 1 to 12",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ibrahim",
  lessons: [
    {
      slug: "darkness-into-light",
      title: "Out of darkness into light",
      line: "The Quran was sent to lead people from darkness into light.",
      facts: ["By their Lord's leave", "To the path of the Almighty"],
      quote: q14(1),
      source: ik(1, "Allah sent the Quran to the Prophet ﷺ, for all people, Arabs and non-Arabs, to lead them from misguidance to guidance, by His leave, to the path of the Almighty, the Praised.", "lead mankind away from misguidance and crookedness to guidance and the right way"),
      difficulty: 2,
      questions: [
        { q: "Why was the Book revealed, in 14:1?", a: "To lead mankind from darkness into light", wrong: ["To tell old tales", "To praise kings", "To list laws of trade"], why: "A Book which We have revealed unto you in order that you might lead mankind out of darkness into light." },
        { q: "To whose path does it lead, in 14:1?", a: "The Almighty, the Praised", wrong: ["The kings", "The poets", "The ancestors"], why: "By their Lord's leave to the path of the Almighty, the Praised." },
        { q: "Who was the Quran sent to, per Ibn Kathir?", a: "All people, Arabs and non-Arabs", wrong: ["Arabs only", "Scholars only", "One tribe"], why: "Sent to all the people of the earth, Arabs and non-Arabs alike." }
      ]
    },
    {
      slug: "preferring-this-world",
      title: "Preferring this world",
      line: "Some love this world over the Hereafter and block Allah's path.",
      facts: ["They want His path crooked", "His path stays straight"],
      quote: q14(3),
      source: ik(1, "The disbelievers prefer this world, work hard for it and forget the Hereafter. They turn people away from following the Messengers and want Allah's path crooked, though it is straight.", "even though it is straight itself"),
      difficulty: 3,
      questions: [
        { q: "What do they prefer, in 14:3?", a: "This world over the Hereafter", wrong: ["The Hereafter", "Prayer", "Charity"], why: "Those who prefer the life of this world to the Hereafter." },
        { q: "What do they seek in Allah's path, in 14:3?", a: "Crookedness", wrong: ["Light", "Mercy", "Knowledge"], why: "And hinder (men) from the path of Allah and seek crookedness therein." },
        { q: "Ibn Kathir says Allah's path becomes crooked when people betray it.", tf: false, why: "Even though it is straight itself and does not deviate on account of those who defy or betray it." }
      ]
    },
    {
      slug: "language-of-his-people",
      title: "In his people's language",
      line: "Every Messenger spoke his people's language to make it clear.",
      facts: ["A kindness from Allah", "The Prophet ﷺ was sent to all"],
      quote: q14(4),
      source: ik(4, "Out of kindness, Allah sent each Messenger from among his people, speaking their language, so they could understand. Each was sent to his own people, while the Prophet ﷺ was sent to all people.", "Allah is Kind and Compassionate with His creation"),
      difficulty: 2,
      questions: [
        { q: "In whose language was every Messenger sent, in 14:4?", a: "His people's language", wrong: ["Arabic only", "A secret tongue", "The kings' language"], why: "And We sent not a Messenger except with the language of his people." },
        { q: "Why his people's language, in 14:4?", a: "To make the message clear", wrong: ["To hide it", "To test them", "To please kings"], why: "In order that he might make (the Message) clear for them." },
        { q: "What does sending them in their own language show, per Ibn Kathir?", a: "Allah's kindness to His creation", wrong: ["Their wealth", "Nothing", "Their poetry"], why: "Allah is Kind and Compassionate with His creation, sending Messengers to them from among them and speaking their language." }
      ]
    },
    {
      slug: "sent-to-all-mankind",
      title: "Sent to all mankind",
      line: "Earlier Prophets went to their nation; ours ﷺ to all mankind.",
      facts: ["Five gifts no one had before", "The earth made a place of prayer"],
      quote: q14(4),
      source: hadith("bukhari", "335", "Jabir ibn Abdullah", "Sahih", "The Prophet ﷺ said he was given five things no one before him had, among them that the earth was made a place of prayer, the right of intercession, and that every Prophet was sent to his nation only, but he was sent to all mankind.", "Every Prophet used to be sent to his nation only but I have been sent to all mankind"),
      difficulty: 3,
      questions: [
        { q: "How many things was the Prophet ﷺ given that no one had before?", a: "Five", wrong: ["Two", "Seven", "Ten"], why: "I have been given five things which were not given to any one else before me." },
        { q: "To whom was the Prophet ﷺ sent?", a: "All mankind", wrong: ["Makkah only", "The Arabs only", "One tribe"], why: "Every Prophet used to be sent to his nation only but I have been sent to all mankind." },
        { q: "Where may his followers pray, per the hadith?", a: "Wherever the prayer time comes", wrong: ["Only in Makkah", "Only indoors", "Only on mountains"], why: "Anyone of my followers can pray wherever the time of a prayer is due." },
        { q: "Who narrated the hadith of the five gifts?", a: "Jabir ibn Abdullah", wrong: ["Abu Musa", "Anas", "Ibn Umar"], why: "Narrated Jabir bin Abdullah: I have been given five things." }
      ]
    },
    {
      slug: "the-days-of-allah",
      title: "The days of Allah",
      line: "Musa was told to remind his people of the days of Allah.",
      facts: ["The days of His favors", "Signs for the patient and thankful"],
      quote: q14(5),
      source: ik(5, "Musa was sent to lead his people from darkness into light and remind them of Allah's days: His favors when He saved them from Fir'awn, parted the sea, shaded them with clouds, and sent manna and quails.", "favors and bounties which He bestowed on them when He delivered them"),
      difficulty: 3,
      questions: [
        { q: "What was Musa told to remind them of, in 14:5?", a: "The days of Allah", wrong: ["Their wealth", "Old poems", "Their ancestors"], why: "And remind them of the annals (or days) of Allah." },
        { q: "What are the days of Allah, per Ibn Kathir?", a: "His favors on them", wrong: ["Feast days only", "Market days", "Days of the week"], why: "Remind them of Allah's days, meaning, favors and bounties which He bestowed on them." },
        { q: "For whom are these signs, in 14:5?", a: "Every patient, thankful person", wrong: ["The rich only", "The kings", "No one"], why: "Truly, therein are Ayat for every patient, thankful (person)." },
        { q: "Qatadah said the excellent servant is patient in trials and thankful in ease.", tf: true, why: "Excellent is the servant who if he is tested, he observes patience, and if he is granted prosperity, he is thankful." }
      ]
    },
    {
      slug: "patient-and-thankful",
      title: "Patient and thankful",
      line: "Every matter of a believer is good: patience and thanks.",
      facts: ["Only true for a believer", "Both bring reward"],
      quote: q14(5),
      source: hadith("muslim", "2999", "Suhaib", "Sahih", "The Prophet ﷺ said the affair of a believer is amazing, for there is good in all of it. If good comes he thanks Allah, and if hardship comes he is patient, and both are good for him.", "Strange are the ways of a believer for there is good in every affair of his"),
      difficulty: 3,
      questions: [
        { q: "What does a believer do in good times, in the hadith?", a: "He thanks Allah", wrong: ["He boasts", "He forgets Allah", "He hides it"], why: "If he has an occasion to feel delight, he thanks (God), thus there is a good for him in it." },
        { q: "What does a believer do in trouble?", a: "He is patient", wrong: ["He complains to all", "He gives up", "He blames others"], why: "If he gets into trouble and shows resignation (and endures it patiently), there is a good for him in it." },
        { q: "Who narrated the hadith on the believer's amazing affair?", a: "Suhaib", wrong: ["Anas", "Abu Musa", "Jabir"], why: "Suhaib reported that Allah's Messenger ﷺ said: Strange are the ways of a believer." }
      ]
    },
    {
      slug: "saved-from-firawn",
      title: "Saved from Fir'awn",
      line: "Musa reminded them how Allah saved them from Fir'awn's cruelty.",
      facts: ["A great favor from Allah", "Or a great trial"],
      quote: q14(6),
      source: ik(6, "Musa reminded his people how Allah saved them from Fir'awn, who harmed their sons and kept the women. Being saved was a great favor that they could never fully thank Allah for.", "a great favor for which you are unable to perfectly thank Him"),
      difficulty: 3,
      questions: [
        { q: "What did Musa tell his people to call to mind, in 14:6?", a: "Allah's favor in saving them", wrong: ["Their gold", "Their old idols", "Their battles"], why: "Call to mind Allah's favor to you, when He delivered you from Fir'awn's people." },
        { q: "From whom were they delivered, in 14:6?", a: "Fir'awn's people", wrong: ["The people of Ad", "Sea pirates", "Desert tribes"], why: "When He delivered you from Fir'awn's people who were afflicting you with horrible torment." },
        { q: "What does the tremendous trial in 14:6 mean, per one view?", a: "A great favor they could not fully thank", wrong: ["A great feast", "A long journey", "A new law"], why: "For He granted you a great favor for which you are unable to perfectly thank Him." }
      ]
    },
    {
      slug: "thank-and-get-more",
      title: "Thank Him, get more",
      line: "If you give thanks, Allah gives you more.",
      facts: ["Ungratefulness loses the favor", "Allah does not need our thanks"],
      quote: q14(7),
      source: ik(6, "Allah declared: if you appreciate My favor, I will give you more of it. If you deny it, the punishment is losing the favor and being held to account.", "if you appreciate My favor on you, I will give you more of it"),
      difficulty: 2,
      questions: [
        { q: "What does Allah promise the thankful, in 14:7?", a: "I will give you more", wrong: ["Nothing", "A test", "Less"], why: "If you give thanks, I will give you more." },
        { q: "What is the punishment for ingratitude, per Ibn Kathir?", a: "Losing the favor", wrong: ["More wealth", "A long life", "Nothing"], why: "By depriving you of the favor and punishing you for being unappreciative of it." },
        { q: "Thanking Allah for a favor makes it grow.", tf: true, why: "If you appreciate My favor on you, I will give you more of it." }
      ]
    },
    {
      slug: "rich-and-praised",
      title: "Rich and Worthy of praise",
      line: "If all on earth disbelieve, Allah still needs nothing.",
      facts: ["He is Worthy of all praise", "Our thanks help only us"],
      quote: q14(8),
      source: ik(6, "Musa said that if everyone on earth disbelieved, Allah would lose nothing. He does not need His servants' thanks, and He is Worthy of all praise even if they deny Him.", "Allah does not need the gratitude of His servants"),
      difficulty: 3,
      questions: [
        { q: "What is Allah, in 14:8?", a: "Rich and Worthy of all praise", wrong: ["In need of thanks", "Tired", "Unknown"], why: "Then verily, Allah is Rich (free of all needs), Worthy of all praise." },
        { q: "Who spoke the words of 14:8?", a: "Musa", wrong: ["Fir'awn", "Harun", "Nuh"], why: "And Musa said: If you disbelieve, you and all on earth together." },
        { q: "Allah needs His servants to thank Him.", tf: false, why: "Allah does not need the gratitude of His servants, and He is worthy of all praise." }
      ]
    },
    {
      slug: "o-my-servants",
      title: "O My servants",
      line: "All mankind's goodness adds nothing to Allah's kingdom.",
      facts: ["Ask Him and He gives", "His treasure never decreases"],
      quote: q14(8),
      source: hadith("muslim", "2577", "Abu Dharr", "Sahih", "Allah said: O My servants, seek guidance, food, clothing and forgiveness from Me and I will give. If all of you, first to last, asked and I gave each one, it would not lessen My kingdom.", "O My servants, all of you are astray except for those I have guided"),
      difficulty: 4,
      questions: [
        { q: "What does Allah say to ask Him for, in the hadith?", a: "Guidance, food and forgiveness", wrong: ["Only gold", "Only rain", "Nothing"], why: "So seek guidance of Me... seek food of Me... seek forgiveness of Me and I shall forgive you." },
        { q: "What happens to Allah's kingdom if He gives everyone what they ask?", a: "It does not decrease", wrong: ["It halves", "It ends", "It doubles"], why: "If I gave each one of them what they asked, that will not decrease My kingdom." },
        { q: "Who narrated the hadith O My servants?", a: "Abu Dharr", wrong: ["Abu Hurayrah", "Jabir", "Suhaib"], why: "Abu Dharr reported Allah's Messenger ﷺ as saying that Allah said: O My servants." },
        { q: "What has Allah forbidden for Himself, in the hadith?", a: "Oppression", wrong: ["Mercy", "Giving", "Forgiving"], why: "O My servants, I have forbidden oppression for Myself." }
      ]
    },
    {
      slug: "nations-before-you",
      title: "Nations before you",
      line: "Nuh's people, Ad and Thamud rejected their Messengers' proofs.",
      facts: ["Only Allah knows them all", "They said: we are in doubt"],
      quote: q14(9),
      source: ik(9, "Allah tells of the people of Nuh, Ad, Thamud and many nations after them whose number only He knows. Their Messengers came with clear proofs, but they rejected them and said they were in grave doubt.", "Only Allah knows the count of these nations"),
      difficulty: 3,
      questions: [
        { q: "Which nations are named in 14:9?", a: "Nuh's people, Ad and Thamud", wrong: ["Rome and Persia", "Egypt and Babylon", "Saba and Madyan"], why: "Has not the news reached you, of those before you, the people of Nuh, Ad, and Thamud?" },
        { q: "Who knows all the nations after them, in 14:9?", a: "Only Allah", wrong: ["The historians", "The genealogists", "The kings"], why: "And those after them? None knows them but Allah." },
        { q: "What did they say about the message, in 14:9?", a: "We are in grave doubt", wrong: ["We believe it", "Teach us more", "We will think"], why: "And we are really in grave doubt as to that to which you invite us." }
      ]
    },
    {
      slug: "doubt-about-allah",
      title: "A doubt about Allah?",
      line: "Can there be doubt about Allah, Creator of heavens and earth?",
      facts: ["He calls you to forgive you", "Most nations knew a Creator"],
      quote: q14(10),
      source: ik(10, "The Messengers asked: can there be doubt about Allah, the only Creator? Most nations accepted a Creator but called on others besides Him. Allah calls people to forgive them and give them time.", "Most nations were, and still are, affirming the existence of the Creator"),
      difficulty: 3,
      questions: [
        { q: "What did the Messengers ask, in 14:10?", a: "Can there be a doubt about Allah?", wrong: ["Where is the gold?", "Who is your king?", "Why are you poor?"], why: "Can there be a doubt about Allah, the Creator of the heavens and the earth?" },
        { q: "Why does Allah call people, in 14:10?", a: "To forgive their sins", wrong: ["To tax them", "To punish them", "To test their wealth"], why: "He calls you that He may forgive you of your sins and give you respite for a term appointed." },
        { q: "What did most nations do, per Ibn Kathir?", a: "Accept a Creator but call on others", wrong: ["Deny any Creator", "Worship Allah alone", "Worship nothing"], why: "Most nations were affirming the existence of the Creator, but they call upon intermediaries besides Him." }
      ]
    },
    {
      slug: "human-like-you",
      title: "Human like you",
      line: "The Messengers said: we are human, but Allah chose us.",
      facts: ["Miracles only by His permission", "Believers trust Allah"],
      quote: q14(11),
      source: ik(10, "The nations said the Messengers were only humans like them. The Messengers agreed, but said Allah gives His grace of prophethood to whom He wills, and they bring a miracle only by His permission.", "affirming that truly, they were only human being like their nations"),
      difficulty: 3,
      questions: [
        { q: "What did the nations say, in 14:10?", a: "You are only human beings like us", wrong: ["You are angels", "You are kings", "You are jinn"], why: "You are no more than human beings like us!" },
        { q: "How did the Messengers answer, in 14:11?", a: "We are human, but Allah chose us", wrong: ["We are angels", "We are rich", "We are kings"], why: "We are no more than human beings like you, but Allah bestows His grace to whom He wills." },
        { q: "How can a Messenger bring a proof, in 14:11?", a: "Only by Allah's permission", wrong: ["Any time he wants", "By magic", "By paying"], why: "It is not ours to bring you an authority (proof) except by the permission of Allah." }
      ]
    },
    {
      slug: "why-not-trust-allah",
      title: "Why not trust Allah?",
      line: "He guided us, so we trust Him and bear your harm patiently.",
      facts: ["Patience with hurtful words", "Let those who trust, trust Him"],
      quote: q14(12),
      source: ik(10, "The Messengers said: why should we not trust Allah, when He guided us to the clearest way? We will be patient with all the harm you cause us, the foolish acts and hurtful words.", "after He had guided us to the best, most clear and plain way"),
      difficulty: 3,
      questions: [
        { q: "Why did the Messengers trust Allah, in 14:12?", a: "He guided them in their ways", wrong: ["He made them rich", "He made them kings", "Their people asked"], why: "And why should we not put our trust in Allah while He indeed has guided us in our ways?" },
        { q: "How did they face the harm, in 14:12?", a: "With patience", wrong: ["With revenge", "By running", "With anger"], why: "And we shall certainly bear with patience all the hurt you may cause us." },
        { q: "In whom should those who trust put their trust, in 14:12?", a: "In Allah alone", wrong: ["In their tribe", "In wealth", "In kings"], why: "And in Allah (alone) let those who trust, put their trust." }
      ]
    }
  ]
};

/** Ayahs 13 to 23: the Messengers threatened, deeds like ashes, Shaytan's speech, and the greeting of peace in Paradise. */
const IBRAHIM_TWO: DeepUnit = {
  key: "ibrahim2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-14",
  name: "Ibrahim, ayahs 13 to 23",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ibrahim",
  lessons: [
    {
      slug: "threatened-with-exile",
      title: "Threatened with exile",
      line: "Nations threatened to drive their Messengers out of the land.",
      facts: ["Shu'ayb and Lut were threatened too", "Allah gave the land to the believers"],
      quote: q14(13),
      source: ik(13, "Disbelieving nations threatened to drive their Messengers out unless they returned to the old religion. Allah promised the Messengers they would live in the land after the wrongdoers, as He later opened Makkah to the Prophet ﷺ.", "more dominance until He opened for him Makkah, which sought to expel him"),
      difficulty: 3,
      questions: [
        { q: "What did the disbelievers threaten, in 14:13?", a: "To drive the Messengers out", wrong: ["To make them kings", "To give them gold", "To follow them"], why: "Surely, we shall drive you out of our land, or you shall return to our religion." },
        { q: "What did Allah promise the Messengers, in 14:14?", a: "To dwell in the land after them", wrong: ["To leave the land", "To be silent", "To return to idols"], why: "And indeed, We shall make you dwell in the land after them." },
        { q: "Which city, once hostile, did Allah open to the Prophet ﷺ, per Ibn Kathir?", a: "Makkah", wrong: ["Damascus", "Cairo", "Sana"], why: "Allah kept granting His Messenger more dominance until He opened for him Makkah, which sought to expel him." }
      ]
    },
    {
      slug: "fearing-to-stand-before-him",
      title: "Fearing to stand before Him",
      line: "This promise is for whoever fears standing before Allah.",
      facts: ["Fear of the Day of Resurrection", "Two Gardens for the godfearing"],
      quote: q14(14),
      source: ik(13, "The promise is for the one who fears standing before Allah on the Day of Resurrection and fears His warning. For whoever fears standing before his Lord there are two Gardens.", "this warning is for he who fears standing before Him on the Day of Resurrection"),
      difficulty: 3,
      questions: [
        { q: "For whom is the promise, in 14:14?", a: "Who fears standing before Allah", wrong: ["Who is richest", "Who is strongest", "Who travels most"], why: "This is for him who fears standing before Me and also fears My threat." },
        { q: "What does the one who fears standing before his Lord get, per 55:46?", a: "Two Gardens", wrong: ["One river", "A palace on earth", "A long life"], why: "But for him who fears the standing before his Lord, there will be two Gardens." },
        { q: "When is the standing before Allah, per Ibn Kathir?", a: "The Day of Resurrection", wrong: ["Every Friday", "In a dream", "At sunrise"], why: "He who fears standing before Him on the Day of Resurrection." }
      ]
    },
    {
      slug: "the-arrogant-lost",
      title: "The arrogant lost",
      line: "The Messengers asked Allah for help; every stubborn tyrant lost.",
      facts: ["They rebelled against the truth", "Allah answered His Messengers"],
      quote: q14(15),
      source: ik(13, "The Messengers asked their Lord for victory, and every stubborn, arrogant tyrant who rebelled against the truth ended in loss.", "those who were arrogant and rebelled against the truth"),
      difficulty: 3,
      questions: [
        { q: "What did the Messengers seek, in 14:15?", a: "Victory and help", wrong: ["Wealth", "Rest", "Fame"], why: "And they sought victory and help." },
        { q: "Who was brought to loss, in 14:15?", a: "Every stubborn, arrogant tyrant", wrong: ["Every traveler", "Every farmer", "Every child"], why: "Every obstinate, arrogant dictator was brought to a complete loss and destruction." },
        { q: "Who sought the help, per Ibn Abbas?", a: "The Messengers", wrong: ["The tyrants", "The angels", "The jinn"], why: "Refers to the Messengers who sought the help and victory of their Lord over their nations, according to Ibn Abbas." }
      ]
    },
    {
      slug: "hell-lies-ahead",
      title: "Hell lies ahead of the tyrant",
      line: "The stubborn tyrant who fought the truth has Hell ahead of him.",
      facts: ["A drink he cannot enjoy", "We seek refuge with Allah"],
      quote: q14(16),
      source: ik(16, "Ahead of the stubborn tyrant who rejected the Messengers is Hell, where his drink brings him no relief. Ibn Kathir ends by asking Allah for refuge from all of it.", "we seek refuge with Allah from all of this"),
      difficulty: 3,
      questions: [
        { q: "What lies ahead of the arrogant tyrant, in 14:16?", a: "Hell", wrong: ["A palace", "A garden", "A long rest"], why: "In front of him is Hell." },
        { tf: true, q: "Ibn Kathir asks Allah for refuge from this punishment.", why: "We seek refuge with Allah from all of this." },
        { q: "Who is warned, in 14:15 to 14:16?", a: "The obstinate, arrogant tyrant", wrong: ["The humble believer", "The traveler", "The orphan"], why: "Every obstinate, arrogant dictator was brought to a complete loss." }
      ]
    },
    {
      slug: "no-relief-yet-just",
      title: "No relief, yet Allah is just",
      line: "The tyrant finds no relief there, and Allah wrongs no one.",
      facts: ["He will not die there", "Allah is never unjust"],
      quote: q14(17),
      source: ik(17, "The tyrant sips his drink unwillingly, and death comes from every side, yet he does not die. All of this is a just repayment, for Allah is never unjust to His servants.", "And your Lord is not at all unjust to"),
      difficulty: 4,
      questions: [
        { q: "How will he sip his drink, in 14:17?", a: "Unwillingly", wrong: ["Happily", "Quickly", "With thanks"], why: "He will sip it unwillingly." },
        { q: "Will death end it for him, in 14:17?", a: "No, he will not die", wrong: ["Yes, at once", "After one day", "If he asks"], why: "Death will come to him from every side, yet he will not die." },
        { q: "Is Allah ever unjust to His servants, per 41:46?", a: "Never", wrong: ["Sometimes", "To the weak", "On some days"], why: "And your Lord is not at all unjust to His slaves." }
      ]
    },
    {
      slug: "deeds-like-ashes",
      title: "Deeds like ashes",
      line: "Deeds without faith are ashes blown away on a stormy day.",
      facts: ["Lost when most needed", "Built on no firm ground"],
      quote: q14(18),
      source: ik(18, "Deeds of those who worship others besides Allah have no firm base. On the Day of Judgment they will find nothing left, like ashes scattered by a strong wind, lost when they need them most.", "they lost their rewards when they needed them the most"),
      difficulty: 3,
      questions: [
        { q: "What are the deniers' works like, in 14:18?", a: "Ashes in a stormy wind", wrong: ["Gold in a box", "Seeds in soil", "Water in a well"], why: "Their works are as ashes, on which the wind blows furiously on a stormy day." },
        { q: "Can they keep any of what they earned, in 14:18?", a: "No, nothing", wrong: ["Yes, all of it", "Half of it", "Only their wealth"], why: "They shall not be able to get aught of what they have earned." },
        { q: "When do they lose their rewards, per Ibn Kathir?", a: "When they need them most", wrong: ["Never", "In their youth", "At birth"], why: "They lost their rewards when they needed them the most." }
      ]
    },
    {
      slug: "no-need-of-partners",
      title: "No need of partners",
      line: "Allah leaves any deed shared with a partner to that partner.",
      facts: ["Work only for Allah", "Sincerity keeps deeds"],
      quote: q14(18),
      source: hadith("muslim", "2985", "Abu Hurairah", "Sahih", "Allah said: I have no need of partners. Whoever does a deed for Me and for someone else too, I leave him with the one he associated with Me.", "I am the One, One Who does not stand in need of a partner"),
      difficulty: 4,
      questions: [
        { q: "What does Allah not need, in the hadith?", a: "A partner", wrong: ["Mercy", "Praise", "Nothing at all"], why: "I am the One, One Who does not stand in need of a partner." },
        { q: "What happens to a deed done for Allah and others?", a: "Allah leaves it to the partner", wrong: ["Double reward", "Allah keeps it", "Half reward"], why: "I shall abandon him with one whom he associates with Allah." },
        { q: "Who narrated the hadith on Allah needing no partner?", a: "Abu Hurairah", wrong: ["Jabir", "Suhaib", "Abu Dharr"], why: "Abu Huraira reported Allah's Messenger ﷺ as stating that Allah the Most High said." }
      ]
    },
    {
      slug: "a-new-creation",
      title: "He could bring a new creation",
      line: "Allah could bring a new creation in our place with ease.",
      facts: ["The heavens are greater than man", "So raising the dead is easy"],
      quote: q14(19),
      source: ik(19, "Allah created the heavens and earth, which are greater than man, so raising the dead is no hard thing for Him. If people defy Him, He could take them away and bring a new creation, and that is easy for Him.", "it is easy for Him"),
      difficulty: 3,
      questions: [
        { q: "How did Allah create the heavens and earth, in 14:19?", a: "With truth", wrong: ["By chance", "For play", "With help"], why: "Do you not see that Allah has created the heavens and the earth with truth?" },
        { q: "What could Allah do if He wills, in 14:19?", a: "Bring a new creation", wrong: ["Nothing new", "Stop the sun forever", "Ask the angels"], why: "If He wills, He can remove you and bring (in your place) a new creation." },
        { q: "Is that hard for Allah, in 14:20?", a: "No, not hard at all", wrong: ["Yes, very hard", "Only sometimes", "No one knows"], why: "And for Allah that is not hard or difficult." }
      ]
    },
    {
      slug: "followers-and-leaders",
      title: "Followers and leaders",
      line: "The weak will ask their arrogant leaders for help, and get none.",
      facts: ["All appear before Allah", "Blindly following brings regret"],
      quote: q14(21),
      source: ik(21, "All people will appear before Allah. The weak followers will ask the arrogant leaders they obeyed to save them, but the leaders will admit they cannot help anyone.", "we obeyed your orders and implemented them"),
      difficulty: 4,
      questions: [
        { q: "Who will appear before Allah, in 14:21?", a: "All of them", wrong: ["Only kings", "Only Prophets", "No one"], why: "And they all shall appear before Allah." },
        { q: "What will the weak ask the arrogant, in 14:21?", a: "Can you help us against Allah?", wrong: ["Can we rest?", "Where is the food?", "Who is king?"], why: "Verily, we were following you; can you avail us anything against Allah's torment?" },
        { q: "What do the leaders answer, in 14:21?", a: "Had Allah guided us, we would have guided you", wrong: ["We will save you", "Follow us more", "We are kings"], why: "Had Allah guided us, we would have guided you." }
      ]
    },
    {
      slug: "shaytans-speech",
      title: "Shaytan's speech",
      line: "Shaytan will say: I only called you; blame yourselves, not me.",
      facts: ["Allah's promise was true", "Shaytan's promises betray"],
      quote: q14(22),
      source: ik(22, "When judgment is done, Shaytan will tell his followers that Allah's promise was true while his own was a lie. He had no power over them except calling, and they answered, so they must blame themselves.", "I had no proof for what I called you to"),
      difficulty: 4,
      questions: [
        { q: "What will Shaytan say about Allah's promise, in 14:22?", a: "It was a promise of truth", wrong: ["It was false", "It was late", "It was small"], why: "Verily, Allah promised you a promise of truth." },
        { q: "What power did Shaytan have over them, in 14:22?", a: "Only that he called them", wrong: ["Full control", "He forced them", "He paid them"], why: "I had no authority over you except that I called you, and you responded to me." },
        { q: "Whom does Shaytan tell them to blame, in 14:22?", a: "Themselves", wrong: ["Him", "The angels", "Their parents"], why: "So blame me not, but blame yourselves." },
        { q: "Shaytan can save his followers on that Day.", tf: false, why: "I cannot help you, nor can you help me." }
      ]
    },
    {
      slug: "greeting-of-peace",
      title: "Greeting of peace",
      line: "Believers enter Gardens with rivers, greeted there with Salam.",
      facts: ["They dwell there forever", "By their Lord's permission"],
      quote: q14(23),
      source: ik(22, "Those who believed and did good will enter Gardens with rivers flowing wherever they wish, living there forever and never moved out, and their greeting there will be Salam.", "and will never transfer or be transferred from it"),
      difficulty: 3,
      questions: [
        { q: "Where will the believers enter, in 14:23?", a: "Gardens under which rivers flow", wrong: ["A desert", "A cave", "A palace on earth"], why: "Will be made to enter Gardens under which rivers flow." },
        { q: "What will their greeting be, in 14:23?", a: "Salam, peace", wrong: ["Goodbye", "Silence", "Welcome back"], why: "Their greeting therein will be: Salam (peace!)." },
        { q: "How long will they stay, in 14:23?", a: "Forever", wrong: ["A year", "A hundred years", "Until they leave"], why: "To dwell therein for ever, with the permission of their Lord." }
      ]
    },
    {
      slug: "spread-the-salam",
      title: "Spread the Salam",
      line: "Spread the Salam: it builds love, and love completes faith.",
      facts: ["Faith leads to Paradise", "Love one another"],
      quote: q14(23),
      source: hadith("muslim", "54", "Abu Hurairah", "Sahih", "The Prophet ﷺ said you will not enter Paradise until you believe, and you will not believe until you love one another. Spreading the greeting of Salam among you builds that love.", "you will not believe as long as you do not love one another"),
      difficulty: 3,
      questions: [
        { q: "What builds love between people, in the hadith?", a: "Spreading the Salam", wrong: ["Giving gold", "Staying silent", "Winning arguments"], why: "Give currency to the practice of paying salutation to one another by saying as-salamu alaikum." },
        { q: "What is needed for true faith, in the hadith?", a: "Loving one another", wrong: ["Being rich", "Being famous", "Travelling"], why: "You will not believe as long as you do not love one another." },
        { q: "Who narrated the hadith on spreading Salam?", a: "Abu Hurairah", wrong: ["Anas", "Jabir", "Ibn Umar"], why: "Abu Huraira reported: The Messenger of Allah ﷺ observed: You shall not enter Paradise." }
      ]
    }
  ]
};

/** Ayahs 24 to 34: the good word like a good tree, the firm word, prayer and charity, and Allah's countless blessings. */
const IBRAHIM_THREE: DeepUnit = {
  key: "ibrahim3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-14",
  name: "Ibrahim, ayahs 24 to 34",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ibrahim",
  lessons: [
    {
      slug: "the-goodly-tree",
      title: "The goodly tree",
      line: "A good word is a tree with firm roots and branches skyward.",
      facts: ["The good word is La ilaha illallah", "Good deeds rise day and night"],
      quote: q14(24),
      source: ik(24, "Ibn Abbas said the good word is La ilaha illallah, the good tree is the believer, the firm root is that word fixed in his heart, and the branches are his deeds rising to the heavens.", "is firm in the believers"),
      difficulty: 3,
      questions: [
        { q: "What is a good word like, in 14:24?", a: "A good tree", wrong: ["A strong wall", "A fast river", "A bright star"], why: "A goodly word as a goodly tree, whose root is firmly fixed, and its branches (reach) to the sky." },
        { q: "What is the good word, per Ibn Abbas?", a: "La ilaha illallah", wrong: ["A kind joke", "A poem", "A greeting only"], why: "A goodly word refers to testifying to La ilaha illallah." },
        { q: "When does the tree give fruit, in 14:25?", a: "At all times, by its Lord's leave", wrong: ["Once a year", "Never", "Only in summer"], why: "Giving its fruit at all times, by the leave of its Lord." },
        { q: "Who is the good tree, per Ibn Abbas?", a: "The believer", wrong: ["A king", "A city", "A river"], why: "As a goodly tree refers to the believer." }
      ]
    },
    {
      slug: "the-date-palm",
      title: "The date palm",
      line: "The Prophet ﷺ said the date palm is like the Muslim.",
      facts: ["Its leaves do not fall", "Ibn Umar was too shy to answer"],
      quote: q14(24),
      source: hadith("bukhari", "4698", "Ibn Umar", "Sahih", "The Prophet ﷺ asked about a tree like a Muslim whose leaves do not fall and which gives fruit again and again. Ibn Umar thought of the date palm but was shy to speak, and the Prophet ﷺ said it is the date palm.", "Tell me of a tree which resembles a Muslim man"),
      difficulty: 3,
      questions: [
        { q: "Which tree is like the Muslim?", a: "The date palm", wrong: ["The olive", "The fig", "The oak"], why: "Allah's Messenger ﷺ said, It is the date-palm tree." },
        { q: "What is special about its leaves, in the hadith?", a: "They do not fall", wrong: ["They are red", "They are huge", "They are bitter"], why: "Its leaves do not fall." },
        { q: "Why did Ibn Umar stay quiet?", a: "He was shy before the elders", wrong: ["He did not know", "He was asleep", "He was away"], why: "Seeing Abu Bakr and Umar saying nothing, I disliked to speak." },
        { q: "Who narrated the hadith of the date palm?", a: "Ibn Umar", wrong: ["Jabir", "Anas", "Abu Musa"], why: "Narrated Ibn Umar: Tell me of a tree which resembles a Muslim man." }
      ]
    },
    {
      slug: "the-evil-tree",
      title: "The evil tree",
      line: "An evil word is an uprooted tree with nothing to stand on.",
      facts: ["Like the bitter colocynth", "Disbelief has no firm base"],
      quote: q14(26),
      source: ik(24, "The evil word is disbelief. It is like a bitter, uprooted plant with no stability, because disbelief has no root or base, and the deeds built on it never rise.", "just like Kufr (disbelief), for it does not have a basis or roots"),
      difficulty: 3,
      questions: [
        { q: "What is an evil word like, in 14:26?", a: "An evil tree uprooted", wrong: ["A tall palm", "A green garden", "A deep well"], why: "And the parable of an evil word is that of an evil tree uprooted from the surface of earth." },
        { q: "What does the uprooted tree lack, in 14:26?", a: "Stability", wrong: ["Leaves", "Color", "Water"], why: "Uprooted from the surface of earth, having no stability." },
        { q: "Which plant did Anas name for it?", a: "The colocynth", wrong: ["The date palm", "The olive", "The vine"], why: "Anas bin Malik said that it is the colocynth tree." }
      ]
    },
    {
      slug: "the-firm-word",
      title: "The firm word",
      line: "Allah keeps believers firm with the firm word, here and after.",
      facts: ["In this world and the next", "Allah does what He wills"],
      quote: q14(27),
      source: ik(27, "Allah keeps the believers firm with the word that stands firm, La ilaha illallah, in this life and in the Hereafter, while the wrongdoers go astray. Allah does what He wills.", "Allah keeps the Believers Firm in This Life and in the Hereafter"),
      difficulty: 3,
      questions: [
        { q: "Whom does Allah keep firm, in 14:27?", a: "Those who believe", wrong: ["The strong", "The rich", "Everyone"], why: "Allah will keep firm those who believe, with the word that stands firm." },
        { q: "Where does Allah keep them firm, in 14:27?", a: "In this world and the Hereafter", wrong: ["Only in this world", "Only in battle", "Only at home"], why: "In this world, and in the Hereafter." },
        { q: "What does Allah do, at the end of 14:27?", a: "Whatever He wills", wrong: ["What people ask", "Nothing", "What kings want"], why: "And Allah does what He wills." }
      ]
    },
    {
      slug: "firm-against-doubts-and-desires",
      title: "Firm against doubts",
      line: "Allah keeps believers firm against doubts and against desires.",
      facts: ["As-Sa'di explains", "Thabat"],
      quote: q14(27),
      source: saadi(14, 27, "As-Sa'di says Allah keeps believers firm in this life: when doubts come, by guiding them to certainty, and when desires come, by a firm will to put what Allah loves first; and in the Hereafter, at death on Islam and in the grave when they answer: Allah is my Lord, Islam my religion, Muhammad my Prophet.", "فيثبتهم الله في الحياة الدنيا عند ورود الشبهات بالهداية إلى اليقين"),
      difficulty: 2,
      questions: [
        { q: "How does Allah keep a believer firm against doubts, per as-Sa'di on 14:27?", a: "By guiding him to certainty", wrong: ["By making him rich", "By ending his life", "By hiding all doubts"], why: "When doubts come, He guides them to certainty." },
        { q: "How does Allah keep a believer firm against desires, per as-Sa'di?", a: "A firm will to put Allah first", wrong: ["Giving in to them", "Ignoring Allah", "Hiding away"], why: "A firm will puts what Allah loves before the soul's wishes." },
        { tf: true, q: "The ayah points to the questioning in the grave.", why: "As-Sa'di on 14:27." }
      ]
    },
    {
      slug: "testifying-in-the-grave",
      title: "Testifying in the grave",
      line: "In the grave, the believer testifies: La ilaha illallah.",
      facts: ["And Muhammad ﷺ is His Messenger", "That is the firm word of 14:27"],
      quote: q14(27),
      source: hadith("bukhari", "1369", "Al-Bara ibn Azib", "Sahih", "The Prophet ﷺ said when a believer is made to sit in his grave, he testifies that none deserves worship but Allah and that Muhammad is His Messenger, and that is the firm word of 14:27.", "he testifies that none has the right to be worshipped but Allah and Muhammad is"),
      difficulty: 4,
      questions: [
        { q: "What does the believer testify in the grave?", a: "La ilaha illallah, Muhammad is His Messenger", wrong: ["His wealth", "His family name", "Nothing"], why: "He testifies that none has the right to be worshipped but Allah and Muhammad is Allah's Apostle." },
        { q: "Which ayah does the grave hadith explain?", a: "14:27", wrong: ["2:255", "112:1", "1:5"], why: "And that corresponds to Allah's statement: Allah will keep firm those who believe (14.27)." },
        { q: "Who narrated the hadith on testifying in the grave?", a: "Al-Bara ibn Azib", wrong: ["Ibn Umar", "Abu Hurayrah", "Jabir"], why: "Narrated Al-Bara bin Azib: When a faithful believer is made to sit in his grave." }
      ]
    },
    {
      slug: "blessings-into-disbelief",
      title: "Blessings into disbelief",
      line: "Some traded Allah's blessing for disbelief and misled others.",
      facts: ["The Prophet ﷺ was the blessing", "They set up rivals to Allah"],
      quote: q14(28),
      source: ik(28, "Allah sent Muhammad ﷺ as a mercy and blessing to all mankind. Those who accepted it with thanks enter Paradise, while those who traded it for disbelief led their people to ruin.", "for Allah sent Muhammad as a mercy and a blessing to all mankind"),
      difficulty: 4,
      questions: [
        { q: "What did they change Allah's blessings into, in 14:28?", a: "Disbelief", wrong: ["Gold", "Thanks", "Prayer"], why: "Have you not seen those who have changed the blessings of Allah into disbelief." },
        { q: "Who is the blessing sent to all mankind, per Ibn Kathir?", a: "Muhammad ﷺ", wrong: ["A king", "A river", "A treasure"], why: "Allah sent Muhammad ﷺ as a mercy and a blessing to all mankind." },
        { q: "What did they set up, in 14:30?", a: "Rivals to Allah", wrong: ["Schools", "Markets", "Gardens"], why: "And they set up rivals to Allah, to mislead (men) from His path!" }
      ]
    },
    {
      slug: "pray-and-spend",
      title: "Pray and spend",
      line: "Tell My servants: pray, and give in secret and openly.",
      facts: ["Before a Day with no trading", "No friendship saves then"],
      quote: q14(31),
      source: ik(31, "Allah orders His believing servants to establish the prayer on time with humility, and to spend from what He gave them, in secret and openly, before a Day when no ransom or friendship will help anyone.", "Establishing the prayer requires performing it on time"),
      difficulty: 3,
      questions: [
        { q: "What should the believers perform, in 14:31?", a: "The Salah", wrong: ["Poems", "Races", "Games"], why: "Say to My servants who have believed, that they should perform the Salah." },
        { q: "How should they spend, in 14:31?", a: "Secretly and openly", wrong: ["Never", "Only in public", "Only once"], why: "And spend (in charity) out of the sustenance We have given them, secretly and openly." },
        { q: "What will not exist on that Day, in 14:31?", a: "Bargaining or befriending", wrong: ["Justice", "Light", "Angels"], why: "Before the coming of a Day on which there will be neither mutual bargaining nor befriending." },
        { q: "What does establishing the prayer require, per Ibn Kathir?", a: "Praying on time with humility", wrong: ["Praying once a year", "Praying loudly", "Praying alone only"], why: "Establishing the prayer requires performing it on time, perfectly, having humility during it." }
      ]
    },
    {
      slug: "made-of-service-to-you",
      title: "Made of service to you",
      line: "Rain, ships, rivers, sun, moon, night and day all serve you.",
      facts: ["Fruits from the rain", "Ships sail by His command"],
      quote: q14(32),
      source: ik(32, "Allah made the sky a ceiling and the earth a bed, sent rain to grow fruits, made ships sail by His command, rivers flow, and the sun, moon, night and day work for people's benefit.", "Allah also made the ships sail on the surface of the water by His command"),
      difficulty: 2,
      questions: [
        { q: "What did Allah bring forth with rain, in 14:32?", a: "Fruits as provision", wrong: ["Stones", "Gold", "Sand"], why: "And sends down water (rain) from the sky, and thereby brought forth fruits as provision for you." },
        { q: "By whose command do ships sail, in 14:32?", a: "By Allah's command", wrong: ["By the wind alone", "By the captain alone", "By chance"], why: "And He has made the ships to be of service to you, that they may sail through the sea by His command." },
        { q: "What else did Allah make of service, in 14:33?", a: "The sun, moon, night and day", wrong: ["Only the stars", "Only the clouds", "Nothing else"], why: "And He has made the sun and the moon... and He has made the night and the day to be of service to you." }
      ]
    },
    {
      slug: "you-cannot-count-them",
      title: "You cannot count them",
      line: "Try to count Allah's blessings, and you never could.",
      facts: ["He gave all you asked", "Even thanking is His gift"],
      quote: q14(34),
      source: ik(32, "Allah gave people all they need. They can never count His blessings, let alone thank Him properly. Dawud said: how can I thank You, when my thanking is also Your gift?", "the servants are never able to count His blessings, let alone thank Him duly"),
      difficulty: 3,
      questions: [
        { q: "Can you count Allah's blessings, in 14:34?", a: "No, never", wrong: ["Yes, easily", "Only the big ones", "With a calculator"], why: "And if you [try to] count the blessings of Allah, never will you be able to count them." },
        { q: "What did Dawud say about thanking Allah?", a: "My thanking is also a favor from You", wrong: ["I thank enough", "I thank once a year", "I do not need to"], why: "How can I ever duly thank You, when my thanking You is also a favor from You to me?" },
        { q: "How is man described at the end of 14:34?", a: "A wrongdoer, ungrateful", wrong: ["Always thankful", "Perfect", "Strong"], why: "Verily, man is indeed an extreme wrongdoer, ungrateful." }
      ]
    },
    {
      slug: "praise-after-eating",
      title: "Praise after eating",
      line: "After meals the Prophet ﷺ praised Allah for endless favor.",
      facts: ["Al-hamdu lillah, much and good", "We always need our Lord"],
      quote: q14(34),
      source: hadith("bukhari", "5458", "Abu Umamah", "Sahih", "When the Prophet ﷺ finished his meal he said: praise be to Allah, much, good and blessed praise, never enough, never left, and never can we do without it, our Lord.", "Al-hamdu li l-lah kathiran taiyiban mubarakan fihi"),
      difficulty: 3,
      questions: [
        { q: "When did the Prophet ﷺ say this praise?", a: "When he finished his meal", wrong: ["Before sleeping", "On a journey", "At sunrise"], why: "Whenever the dining sheet of the Prophet ﷺ was taken away, he used to say." },
        { q: "What does Al-hamdu lillah kathiran mean?", a: "Much praise to Allah", wrong: ["Allah is great", "Peace be upon you", "In the name of Allah"], why: "Al-hamdu li l-lah kathiran taiyiban mubarakan fihi: much, good and blessed praise." },
        { q: "Who narrated the hadith of praise after eating?", a: "Abu Umamah", wrong: ["Abu Musa", "Anas", "Jabir"], why: "Narrated Abu Umama: Whenever the dining sheet of the Prophet ﷺ was taken away." }
      ]
    }
  ]
};

/** Ayahs 35 to 52: Ibrahim's du'a for Makkah and his children, respite for the wrongdoers, and the earth changed. */
const IBRAHIM_FOUR: DeepUnit = {
  key: "ibrahim4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-14",
  name: "Ibrahim, ayahs 35 to 52",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ibrahim",
  lessons: [
    {
      slug: "a-city-of-peace",
      title: "A city of peace",
      line: "Ibrahim asked Allah to make Makkah a city of peace.",
      facts: ["Allah accepted his du'a", "The House is built on Tawhid"],
      quote: q14(35),
      source: ik(35, "The Sacred House was built on worshipping Allah alone. Ibrahim, who settled the city, asked Allah to make Makkah peaceful and secure, and Allah accepted his du'a.", "Allah accepted his supplication"),
      difficulty: 2,
      questions: [
        { q: "What did Ibrahim ask for Makkah, in 14:35?", a: "Peace and security", wrong: ["Gold and silver", "Big markets", "Tall walls"], why: "O my Lord! Make this city (Makkah) one of peace and security." },
        { q: "Did Allah accept Ibrahim's du'a for Makkah, per Ibn Kathir?", a: "Yes", wrong: ["No", "Only half", "Not yet"], why: "He begged Allah to make Makkah peaceful and secure, and Allah accepted his supplication." },
        { q: "On what was the Sacred House established, per Ibn Kathir?", a: "Worship of Allah alone", wrong: ["Trade", "Poetry", "Idols"], why: "The Sacred House in Makkah was established on the worship of Allah alone, without partners." }
      ]
    },
    {
      slug: "keep-us-from-idols",
      title: "Keep us from idols",
      line: "Ibrahim prayed: keep me and my sons away from idols.",
      facts: ["Pray for parents and children too", "Whoever follows me is of me"],
      quote: q14(36),
      source: ik(35, "Ibrahim asked Allah to keep him and his sons from idols. It is good, when making du'a, to ask for your parents and children as well as yourself. He left the matter of those who went astray to Allah.", "It is proper for whoever supplicates to Allah to also ask for the benefit of his parents and offspring"),
      difficulty: 3,
      questions: [
        { q: "What did Ibrahim ask to be kept from, in 14:35?", a: "Worshipping idols", wrong: ["Hunger", "Travel", "Old age"], why: "And keep me and my sons away from worshipping idols." },
        { q: "What did Ibrahim say of those who follow him, in 14:36?", a: "He is of me", wrong: ["He is rich", "He is a king", "He is alone"], why: "But whoso follows me, he verily, is of me." },
        { q: "Whom should we include in our du'a, per Ibn Kathir?", a: "Our parents and children", wrong: ["Only ourselves", "Only kings", "No one"], why: "It is proper for whoever supplicates to Allah to also ask for the benefit of his parents and offspring, as well as himself." }
      ]
    },
    {
      slug: "my-ummah",
      title: "My Ummah, my Ummah",
      line: "Reciting Ibrahim's du'a, the Prophet ﷺ wept for his Ummah.",
      facts: ["Jibril was sent to him", "Allah promised to please him"],
      quote: q14(36),
      source: hadith("muslim", "202", "Abdullah ibn Amr", "Sahih", "The Prophet ﷺ recited Ibrahim's words in 14:36 and Isa's in 5:118, raised his hands, said O Lord, my Ummah, my Ummah, and wept. Allah sent Jibril to tell him: We will please you regarding your Ummah.", "Then he raised his hands and said: O Lord, my Ummah, my Ummah, and wept"),
      difficulty: 4,
      questions: [
        { q: "What did the Prophet ﷺ say, raising his hands?", a: "O Lord, my Ummah, my Ummah", wrong: ["O Lord, my wealth", "O Lord, my home", "O Lord, my tribe"], why: "Then he raised his hands and said: O Lord, my Ummah, my Ummah, and wept." },
        { q: "Whom did Allah send to the Prophet ﷺ?", a: "Jibril", wrong: ["Mika'il", "Israfil", "A messenger from Makkah"], why: "Allah said: O Gabriel, go to Muhammad and ask him: What makes thee weep?" },
        { q: "What did Allah promise him about his Ummah?", a: "We will please you", wrong: ["We will leave them", "We will test them more", "Nothing"], why: "Verily We will please thee with regard to thy Ummah." },
        { q: "Who narrated the hadith of my Ummah, my Ummah?", a: "Abdullah ibn Amr", wrong: ["Abu Hurairah", "Anas", "Jabir"], why: "Abdullah b. Amr b. al-As reported: Verily the Messenger of Allah ﷺ recited the words that Ibrahim uttered." }
      ]
    },
    {
      slug: "a-valley-without-crops",
      title: "A valley without crops",
      line: "Ibrahim left family by the Sacred House so they would pray.",
      facts: ["Hearts drawn to them", "Fruits brought from everywhere"],
      quote: q14(37),
      source: ik(37, "Ibrahim settled some of his children in a barren valley by the Sacred House so they would pray. He asked Allah to draw hearts to them and give them fruits. To this day all kinds of fruit reach Makkah.", "yet all kinds of fruits are being brought to it from all around"),
      difficulty: 3,
      questions: [
        { q: "Where did Ibrahim settle his offspring, in 14:37?", a: "A valley without crops by the House", wrong: ["A green river valley", "A big city", "A mountain top"], why: "I have made some of my offspring dwell in an uncultivable valley by Your Sacred House." },
        { q: "Why did he settle them there, in 14:37?", a: "So they may perform Salah", wrong: ["To trade", "To farm", "To hide"], why: "In order, O our Lord, that they may perform Salah." },
        { q: "What did he ask Allah to provide them, in 14:37?", a: "Fruits", wrong: ["Gold", "Soldiers", "Rain only"], why: "And (O Allah) provide them with fruits so that they may give thanks." },
        { q: "Ibn Kathir says fruits from everywhere reach Makkah, though few trees grow there.", tf: true, why: "There are no fruit producing trees in the Sacred City, yet all kinds of fruits are being brought to it from all around." }
      ]
    },
    {
      slug: "children-in-old-age",
      title: "Children in old age",
      line: "Ibrahim praised Allah for Isma'il and Ishaq, given in old age.",
      facts: ["Allah knows the hidden and open", "He hears every du'a"],
      quote: q14(39),
      source: ik(38, "Ibrahim said Allah knows what we hide and show. He thanked Allah for giving him Isma'il and Ishaq in his old age, for Allah hears and answers those who call on Him.", "He accepts the supplication of those who invoke Him"),
      difficulty: 3,
      questions: [
        { q: "What does Allah know, in 14:38?", a: "What we conceal and reveal", wrong: ["Only the seen", "Only words", "Only the past"], why: "Certainly, You know what we conceal and what we reveal." },
        { q: "Whom was Ibrahim given in old age, in 14:39?", a: "Isma'il and Ishaq", wrong: ["Yusuf and Binyamin", "Musa and Harun", "Dawud and Sulayman"], why: "All praise is due to Allah, Who has given me in old age Isma'il and Ishaq." },
        { q: "What does Ibrahim call his Lord, in 14:39?", a: "The All-Hearer of invocations", wrong: ["The Distant", "The Silent", "The Unknown"], why: "Verily, my Lord is indeed the All-Hearer of invocations." }
      ]
    },
    {
      slug: "make-me-one-who-prays",
      title: "Make me one who prays",
      line: "Make me and my children pray, and forgive all believers.",
      facts: ["Accept my du'a, our Lord", "On the Day of reckoning"],
      quote: q14(40),
      source: ik(38, "Ibrahim asked Allah to make him and his children among those who keep up the prayer, to accept his du'a, and to forgive him, his parents and all the believers on the Day of reckoning.", "make them among those who establish the prayer, as well"),
      difficulty: 3,
      questions: [
        { q: "What did Ibrahim ask to be made, in 14:40?", a: "One who performs Salah", wrong: ["A rich man", "A king", "A famous poet"], why: "O my Lord! Make me one who performs Salah, and (also) from my offspring." },
        { q: "Whom did he ask forgiveness for, in 14:41?", a: "Himself, his parents and the believers", wrong: ["Only himself", "Only kings", "No one"], why: "Our Lord! Forgive me and my parents, and (all) the believers." },
        { q: "When will the reckoning be established, in 14:41?", a: "On the Day of reckoning", wrong: ["Tomorrow", "At sunset", "Every Friday"], why: "On the Day when the reckoning will be established." }
      ]
    },
    {
      slug: "never-unaware",
      title: "Never unaware",
      line: "Allah is not unaware of wrongdoers; He only delays them.",
      facts: ["Everything is on record", "A Day of great awe"],
      quote: q14(42),
      source: ik(42, "Do not think Allah is unaware of what the wrongdoers do because He delays them. He keeps full account of it on record, and gives them time until a Day of great awe.", "Allah keeps full account of this for them and keeps it on record against them"),
      difficulty: 3,
      questions: [
        { q: "Is Allah unaware of the wrongdoers, in 14:42?", a: "No, never", wrong: ["Yes, sometimes", "Only at night", "Only of small things"], why: "Consider not that Allah is unaware of that which the wrongdoers do." },
        { q: "Why is their punishment delayed, in 14:42?", a: "He gives them respite to a Day", wrong: ["He forgot", "He cannot", "He does not care"], why: "But He gives them respite up to a Day when the eyes will stare in horror." },
        { q: "What does Allah do with their deeds, per Ibn Kathir?", a: "Keeps them on record", wrong: ["Forgets them", "Erases them all", "Ignores them"], why: "Allah keeps full account of this for them and keeps it on record against them." }
      ]
    },
    {
      slug: "respite-us-a-little",
      title: "Give us a little more time",
      line: "Wrongdoers will beg for more time to follow the Messengers.",
      facts: ["They swore they would never leave", "They saw earlier nations' end"],
      quote: q14(44),
      source: ik(44, "When the punishment comes, wrongdoers will ask for a little more time to follow the Messengers. But they had sworn there was no Resurrection, and they lived where earlier nations lived without taking a lesson.", "but you did not draw a lesson from their end"),
      difficulty: 4,
      questions: [
        { q: "What will the wrongdoers ask for, in 14:44?", a: "Respite for a little while", wrong: ["More gold", "A palace", "Silence"], why: "Our Lord! Respite us for a little while, we will answer Your call and follow the Messengers!" },
        { q: "What had they sworn before, in 14:44?", a: "That they would not leave the world", wrong: ["To follow the Messengers", "To give charity", "To pray more"], why: "Had you not sworn aforetime that you would not leave (the world for the Hereafter)." },
        { q: "Where did they live, in 14:45?", a: "In dwellings of earlier wrongdoers", wrong: ["In Paradise", "In the sky", "Under the sea"], why: "And you dwelt in the dwellings of men who wronged themselves." }
      ]
    },
    {
      slug: "the-earth-changed",
      title: "The earth changed",
      line: "Allah keeps His promise; the earth and heavens will be changed.",
      facts: ["All appear before the One", "His promise to His Messengers"],
      quote: q14(48),
      source: ik(47, "Allah never breaks His promise to give His Messengers victory. On the Day of Resurrection the earth will be changed to another earth, and so will the heavens, and all will appear before Allah, the One.", "the earth will be changed to an earth other than this earth that we know and recognize"),
      difficulty: 4,
      questions: [
        { q: "Will Allah fail His promise to His Messengers, in 14:47?", a: "Never", wrong: ["Sometimes", "If they ask", "Only once"], why: "So think not that Allah will fail to keep His promise to His Messengers." },
        { q: "What will happen to the earth, in 14:48?", a: "Changed to another earth", wrong: ["Stay the same", "Grow bigger", "Turn to gold"], why: "On the Day when the earth will be changed to another earth and so will be the heavens." },
        { q: "Before whom will all appear, in 14:48?", a: "Allah, the One, the Irresistible", wrong: ["The kings", "The angels only", "Their ancestors"], why: "And they (all creatures) will appear before Allah, the One, the Irresistible." }
      ]
    },
    {
      slug: "a-white-flat-land",
      title: "A white, flat land",
      line: "People will gather on white land, flat like a loaf.",
      facts: ["No landmarks at all", "The earth changed, as in 14:48"],
      quote: q14(48),
      source: hadith("bukhari", "6521", "Sahl ibn Sa'd", "Sahih", "The Prophet ﷺ said people will be gathered on the Day of Resurrection on a reddish-white land like a pure loaf of bread, with no landmarks for anyone.", "The people will be gathered on the Day of Resurrection on reddish white land like a pure loaf of bread"),
      difficulty: 4,
      questions: [
        { q: "What will the land of gathering be like?", a: "A pure loaf of bread", wrong: ["A rocky hill", "A dense forest", "A deep sea"], why: "On reddish white land like a pure loaf of bread." },
        { q: "What will the land have, per Sahl?", a: "No landmarks at all", wrong: ["Many towers", "Rivers and trees", "Old cities"], why: "That land will have no landmarks for anybody." },
        { q: "Who narrated the hadith of the white land?", a: "Sahl ibn Sa'd", wrong: ["Jabir", "Anas", "Abu Umamah"], why: "Narrated Sahl bin Sa'd: I heard the Prophet ﷺ saying, The people will be gathered." }
      ]
    },
    {
      slug: "bound-together",
      title: "Bound together that Day",
      line: "On that Day wrongdoers stand bound together with their like.",
      facts: ["Each with his like", "No one can slip away"],
      quote: q14(49),
      source: ik(49, "On the Day the earth is changed, the people of disbelief and mischief will be gathered and bound together, each with others like them.", "bound together, each with his or her like"),
      difficulty: 4,
      questions: [
        { q: "How will the criminals appear, in 14:49?", a: "Bound together in fetters", wrong: ["Free to roam", "Hidden away", "Asleep"], why: "And you will see the criminals that Day, bound together in fetters." },
        { q: "With whom is each one bound, per Ibn Kathir?", a: "Others like him", wrong: ["His enemies", "The angels", "His teachers"], why: "Bound together, each with his or her like." },
        { tf: false, q: "In 14:49, wrongdoers can hide on that Day.", why: "You will see the criminals that Day, bound together in fetters." }
      ]
    },
    {
      slug: "garments-of-tar",
      title: "Garments of tar",
      line: "Their clothing will be of tar, which catches fire very fast.",
      facts: ["A fitting repayment", "Allah requites each soul"],
      quote: q14(50),
      source: ik(50, "Their garments will be of tar, the pitch used to coat camels. Qatadah said tar is among the fastest things to catch fire.", "Qatiran (tar) is one of the fastest objects to catch fire"),
      difficulty: 4,
      questions: [
        { q: "What will their garments be made of, in 14:50?", a: "Tar", wrong: ["Silk", "Wool", "Cotton"], why: "Their garments will be of Qatiran (tar)." },
        { q: "What was tar used for, per Ibn Kathir?", a: "To coat camels", wrong: ["To build ships only", "To make bread", "To write books"], why: "Their garments will be of Qatiran (pitch), that is used to coat camels." },
        { q: "What did Qatadah say about tar?", a: "It catches fire very fast", wrong: ["It is cold", "It smells sweet", "It is rare"], why: "Qatiran (tar) is one of the fastest objects to catch fire." }
      ]
    },
    {
      slug: "habits-of-ignorance",
      title: "Leave the old habits",
      line: "The Prophet ﷺ warned of four habits from before Islam.",
      facts: ["Do not boast of family", "Repent before it is too late"],
      quote: q14(50),
      source: hadith("muslim", "934", "Abu Malik al-Ash'ari", "Sahih", "The Prophet ﷺ named four habits from before Islam: boasting of rank, mocking others' family lines, seeking rain from stars, and wailing. He urged repentance before death.", "four characteristics belonging to pre-Islamic period which they do not abandon"),
      difficulty: 5,
      questions: [
        { q: "How many old habits did the Prophet ﷺ name?", a: "Four", wrong: ["Two", "Seven", "Ten"], why: "Among my people there are four characteristics belonging to pre-Islamic period." },
        { q: "Which is one of those habits?", a: "Boasting of high rank", wrong: ["Giving charity", "Praying at night", "Visiting the sick"], why: "Boasting of high rank, reviling other peoples' genealogies, seeking rain by stars." },
        { q: "Who narrated the hadith of the four habits?", a: "Abu Malik al-Ash'ari", wrong: ["Abu Hurairah", "Anas", "Jabir"], why: "Abu Malik al-Ash'ari reported Allah's Messenger ﷺ as saying." }
      ]
    },
    {
      slug: "swift-at-reckoning",
      title: "Swift at reckoning",
      line: "Each soul is repaid for its deeds; Allah is swift at reckoning.",
      facts: ["Nothing escapes Him", "Justice for every person"],
      quote: q14(51),
      source: ik(49, "On the Day of Resurrection Allah will repay each person for what they earned. He is swift at reckoning, because He knows everything and nothing escapes Him.", "That Allah may requite each person according to what he has earned"),
      difficulty: 4,
      questions: [
        { q: "Why will people be repaid, in 14:51?", a: "For what each has earned", wrong: ["By chance", "By their names", "By their wealth"], why: "That Allah may requite each person according to what he has earned." },
        { q: "How is Allah at reckoning, in 14:51?", a: "Swift", wrong: ["Slow", "Forgetful", "Unsure"], why: "Truly, Allah is swift at reckoning." },
        { q: "Why is Allah swift at reckoning, per Ibn Kathir?", a: "He knows everything", wrong: ["He hurries", "He asks angels", "He guesses"], why: "For He knows everything and nothing ever escapes His observation." }
      ]
    },
    {
      slug: "a-message-for-mankind",
      title: "A message for mankind",
      line: "The Quran is a message for all: Allah is the only God.",
      facts: ["A warning and a lesson", "For people of understanding"],
      quote: q14(52),
      source: ik(52, "The Quran is a message for all mankind and jinn, to warn them, teach them through its proofs that there is no god but Allah, and remind people of good minds. The surah ends as it began.", "is for all mankind and the Jinns"),
      difficulty: 3,
      questions: [
        { q: "What is the Quran, in 14:52?", a: "A message for mankind", wrong: ["A history book", "A song", "A letter to one king"], why: "This (Quran) is a Message for mankind." },
        { q: "What should they know from it, in 14:52?", a: "That He is the only One God", wrong: ["The price of goods", "The names of kings", "Star charts"], why: "And that they may know that He is the only One God." },
        { q: "Who takes heed, in 14:52?", a: "Men of understanding", wrong: ["No one", "Only kings", "Only the old"], why: "And that men of understanding may take heed." }
      ]
    }
  ]
};

export const IBRAHIM_UNITS: readonly DeepUnit[] = [IBRAHIM_ONE, IBRAHIM_TWO, IBRAHIM_THREE, IBRAHIM_FOUR];
