import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah At-Taghabun ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on At-Taghabun 64:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_64_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on At-Taghabun 64:${ayah}`,
    url: `https://quran.com/64:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 64:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q64 = (ayah: number) => quranQuote(64, ayah);

/** Ayahs 1 to 6: Allah's dominion, His creation of us in the best shapes, His knowledge of hearts, and the nations before. */
const TAGHABUN_ONE: DeepUnit = {
  key: "taghabun1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-64",
  name: "At-Taghabun, ayahs 1 to 6",
  kind: "skill",
  lessonType: "surah",
  surahName: "At-Taghabun",
  lessons: [
    {
      slug: "last-musabbihat",
      title: "The last glorifying surah",
      line: "At-Taghabun is the last surah that opens with glorifying Allah.",
      facts: ["Musabbihat: glorifying surahs", "All creation praises Allah"],
      quote: q64(1),
      source: ik(1, "Ibn Kathir says At-Taghabun is the last of the Musabbihat, the surahs that open with all creation glorifying Allah.", "This is the last Surah among Al-Musabbihat"),
      difficulty: 2,
      questions: [
        { q: "Which group does At-Taghabun close?", a: "Al-Musabbihat", wrong: ["Al-Mu'awwidhat", "The Ha-Mim surahs", "The long seven"], why: "This is the last Surah among Al-Musabbihat." },
        { q: "What does everything in the heavens and earth do?", a: "Glorifies Allah", wrong: ["Sleeps forever", "Ignores Allah", "Fights Allah"], why: "Whatsoever is in the heavens and whatsoever is on the earth glorifies Allah." },
        { tf: true, q: "All creatures praise the glory of their Creator.", why: "We mentioned before that all creatures praise the glory of Allah, their Creator and Owner." }
      ]
    },
    {
      slug: "dominion-and-praise",
      title: "His is the dominion",
      line: "Allah controls all creation and is praised for all He decrees.",
      facts: ["Al-Mulk: the dominion", "Al-Hamd: all praise"],
      quote: q64(1),
      source: ik(1, "Ibn Kathir explains that Allah controls all creation and is praised for everything He created and decreed.", "He is the One Who has control over all creation, the One praised for all He created and decreed"),
      difficulty: 2,
      questions: [
        { q: "Who has control over all creation?", a: "Allah", wrong: ["The angels", "The kings", "The stars"], why: "He is the One Who has control over all creation." },
        { q: "What is Allah praised for, per Ibn Kathir?", a: "All He created and decreed", wrong: ["Only the rain", "Only the sun", "Only the Quran"], why: "The One praised for all He created and decreed." },
        { tf: true, q: "To Allah belongs all praise.", why: "His is the dominion, and to Him belongs the praise." }
      ]
    },
    {
      slug: "able-to-do-all",
      title: "Able to do all things",
      line: "What Allah wills happens; what He does not will never does.",
      facts: ["Nothing can resist Him", "Qadir: All-Able"],
      quote: q64(1),
      source: ik(1, "Ibn Kathir says whatever Allah wills happens with no resistance, and whatever He does not will never happens.", "whatever He wills occurs without resistance, and whatever He does not will, never occurs"),
      difficulty: 2,
      questions: [
        { q: "What happens to what Allah wills?", a: "It happens", wrong: ["It waits forever", "It is cancelled", "It is forgotten"], why: "Whatever He wills occurs without resistance." },
        { q: "Can anything happen that Allah does not will?", a: "No, never", wrong: ["Yes, often", "Only at night", "Only by luck"], why: "Whatever He does not will, never occurs." },
        { tf: true, q: "Some things can resist Allah's will.", why: "False. Whatever He wills occurs without resistance." }
      ]
    },
    {
      slug: "believers-and-disbelievers",
      title: "Believers and disbelievers",
      line: "Allah created us, and some believe while others disbelieve.",
      facts: ["Allah sees every heart", "He knows who seeks guidance"],
      quote: q64(2),
      source: ik(2, "Ibn Kathir says Allah created people and some became believers and some disbelievers, and He sees who deserves guidance.", "Allah is the One Who sees those who deserve guidance and those who deserve misguidance"),
      difficulty: 3,
      questions: [
        { q: "Who created us, per 64:2?", a: "Allah", wrong: ["Our parents alone", "Nature", "Chance"], why: "He it is Who created you." },
        { q: "Who sees who deserves guidance?", a: "Allah", wrong: ["The crowd", "The kings", "No one"], why: "Allah is the One Who sees those who deserve guidance and those who deserve misguidance." },
        { tf: true, q: "Allah will fully reward each servant for his deeds.", why: "He is the Witness over His servants' deeds and He will completely recompense them." }
      ]
    },
    {
      slug: "all-seer",
      title: "He sees what you do",
      line: "Allah is All-Seer, so nothing we do is hidden from Him.",
      facts: ["Al-Basir: the All-Seer", "Do good even when alone"],
      quote: q64(2),
      source: ik(2, "Ibn Kathir says Allah witnesses His servants' deeds and will fully reward them, which is why He says He is All-Seer of what you do.", "And Allah is All-Seer of what you do"),
      difficulty: 2,
      questions: [
        { q: "What does Al-Basir mean?", a: "The All-Seer", wrong: ["The Most Rich", "The First", "The King"], why: "And Allah is All-Seer of what you do." },
        { q: "What does Allah see, per 64:2?", a: "What we do", wrong: ["Only big deeds", "Only good deeds", "Only public deeds"], why: "And Allah is All-Seer of what you do." },
        { tf: true, q: "A secret good deed is still seen by Allah.", why: "And Allah is All-Seer of what you do." }
      ]
    },
    {
      slug: "created-with-truth",
      title: "Created with truth",
      line: "Allah created the heavens and earth with fairness and wisdom.",
      facts: ["Nothing created for fun", "Everything has a purpose"],
      quote: q64(3),
      source: ik(3, "Ibn Kathir says Allah created the heavens and the earth with truth, meaning with fairness and wisdom.", "with equity and wisdom"),
      difficulty: 2,
      questions: [
        { q: "How were the heavens and earth created?", a: "With truth", wrong: ["By accident", "For play", "Without a plan"], why: "He has created the heavens and the earth with truth." },
        { q: "What does with truth mean, per Ibn Kathir?", a: "With fairness and wisdom", wrong: ["With speed", "With noise", "With gold"], why: "He has created the heavens and the earth with truth, with equity and wisdom." },
        { tf: true, q: "The universe was made without wisdom.", why: "False. He created them with equity and wisdom." }
      ]
    },
    {
      slug: "best-shapes",
      title: "The best shapes",
      line: "Allah shaped people and made their forms beautiful.",
      facts: ["82:6-8 says the same", "Thank Allah for your body"],
      quote: q64(3),
      source: ik(3, "Ibn Kathir says Allah shaped us in the best shapes and forms, and quotes 82:6-8 and 40:64.", "He made you in the best shapes and forms"),
      difficulty: 2,
      questions: [
        { q: "How did Allah make our shapes?", a: "Good and beautiful", wrong: ["Random", "Ugly", "All the same"], why: "And He shaped you and made good your shapes." },
        { q: "Which other ayahs does Ibn Kathir quote?", a: "82:6-8", wrong: ["2:1-3", "114:1-6", "97:1-5"], why: "Who created you, fashioned you perfectly and gave you due proportion. (82:6-8)" },
        { tf: true, q: "Our bodies are a gift to be thankful for.", why: "He made you in the best shapes and forms." }
      ]
    },
    {
      slug: "return-to-him",
      title: "The return is to Him",
      line: "Everyone will return to Allah in the end.",
      facts: ["Al-Masir: the final return", "Life is a journey to Him"],
      quote: q64(3),
      source: ik(3, "Ibn Kathir says And to Him is the return means the return and final destination.", "means the return and final destination"),
      difficulty: 2,
      questions: [
        { q: "To whom is the final return?", a: "To Allah", wrong: ["To the earth only", "To nowhere", "To the stars"], why: "And to Him is the return." },
        { q: "What does Al-Masir mean?", a: "The final destination", wrong: ["The first step", "A market", "A river"], why: "And to Him is the return, means the return and final destination." },
        { tf: true, q: "Our life ends with a return to Allah.", why: "And to Him is the return, means the return and final destination." }
      ]
    },
    {
      slug: "knows-secret-and-open",
      title: "Hidden or shown",
      line: "Allah knows what we hide and what we show.",
      facts: ["He knows what is in hearts", "Nothing is too small"],
      quote: q64(4),
      source: ik(4, "Ibn Kathir says Allah tells of His knowledge of all that is in the heavens, the earth and the souls.", "He knows what you conceal and what you reveal"),
      difficulty: 2,
      questions: [
        { q: "What does Allah know, per 64:4?", a: "What we hide and show", wrong: ["Only what we show", "Only what we say", "Only the past"], why: "He knows what you conceal and what you reveal." },
        { q: "Allah is All-Knower of what is in the...?", a: "Breasts", wrong: ["Markets", "Mountains", "Books"], why: "And Allah is the All-Knower of what is in the breasts." },
        { tf: true, q: "Allah knows our private thoughts.", why: "And Allah is the All-Knower of what is in the breasts." }
      ]
    },
    {
      slug: "allah-looks-at-hearts",
      title: "He looks at hearts",
      line: "Allah looks not at faces or wealth, but hearts and deeds.",
      facts: ["Looks do not raise you", "A pure heart does"],
      quote: q64(4),
      source: hadith("muslim", "2564", "Abu Hurairah", "Sahih", "The Prophet ﷺ said Allah does not look at your faces and wealth but at your hearts and deeds.", "Verily Allah does not look to your faces and your wealth but He looks to your heart and to your deeds"),
      difficulty: 2,
      questions: [
        { q: "What does Allah look at, per the hadith?", a: "Hearts and deeds", wrong: ["Faces and wealth", "Clothes and homes", "Names and tribes"], why: "Allah does not look to your faces and your wealth but He looks to your heart and to your deeds." },
        { q: "What does Allah not judge us by?", a: "Our faces and wealth", wrong: ["Our hearts", "Our deeds", "Our intentions"], why: "Verily Allah does not look to your faces and your wealth." },
        { tf: true, q: "A rich person is better to Allah for being rich.", why: "False. Allah does not look to your faces and your wealth but to your heart and deeds." }
      ]
    },
    {
      slug: "news-of-the-past",
      title: "News of the past",
      line: "Allah reminds us of earlier nations so we learn from them.",
      facts: ["History holds lessons", "They opposed the Messengers"],
      quote: q64(5),
      source: ik(5, "Ibn Kathir says Allah tells of past nations and what happened to them for opposing the Messengers.", "information about them and what happened to them"),
      difficulty: 2,
      questions: [
        { q: "What news does 64:5 ask about?", a: "Nations who disbelieved before", wrong: ["Future cities", "Animals of the sea", "The stars"], why: "Has not the news reached you of those who disbelieved aforetime?" },
        { q: "Why were they punished, per Ibn Kathir?", a: "Opposing the Messengers", wrong: ["Being poor", "Living far", "Being few"], why: "Because of opposing the Messengers and denying the truth." },
        { tf: true, q: "Stories of past nations are lessons for us.", why: "Allah informs about the past nations and the disciplinary lessons they suffered." }
      ]
    },
    {
      slug: "tasted-the-result",
      title: "They tasted the result",
      line: "Those who denied the truth tasted the results of their deeds.",
      facts: ["Deeds have results", "In this life and the next"],
      quote: q64(5),
      source: ik(5, "Ibn Kathir says they tasted the bad results of their denial in this world, and the Hereafter holds more.", "They tasted the evil consequences of their denial and sinful actions"),
      difficulty: 3,
      questions: [
        { q: "What did they taste?", a: "The results of their denial", wrong: ["Sweet fruit", "Cool water", "Victory"], why: "They tasted the evil consequences of their denial and sinful actions." },
        { q: "Where did they taste it first?", a: "In this world", wrong: ["Nowhere", "Only in dreams", "In the sea"], why: "It refers to the punishment and humiliation they received in the life of the world." },
        { tf: true, q: "Ibn Kathir says the Hereafter adds to it.", why: "In the Hereafter, added to the torment they received in this life." }
      ]
    },
    {
      slug: "shall-men-guide-us",
      title: "Shall mere men guide us?",
      line: "They refused Messengers only because the Messengers were human.",
      facts: ["Bayyinat: clear proofs", "Messengers were human"],
      quote: q64(6),
      source: ik(6, "Ibn Kathir says they rejected the idea that a human like them could bring Allah's Message, though he came with clear proofs.", "They discounted and dismissed the possibility that the Message would be sent to a human"),
      difficulty: 3,
      questions: [
        { q: "What did they say about the Messengers?", a: "Shall mere men guide us?", wrong: ["We love you", "Teach us more", "Stay with us"], why: "But they said: Shall mere men guide us?" },
        { q: "What did the Messengers bring?", a: "Clear proofs", wrong: ["Gold", "Armies", "Magic"], why: "There came to them their Messengers with Bayyinat, supporting arguments, evidence, and clear proofs." },
        { tf: true, q: "Being human made the Messengers less true.", why: "False. They came with Bayyinat, clear proofs, but they dismissed a human Messenger." }
      ]
    },
    {
      slug: "allah-not-in-need",
      title: "Allah needs no one",
      line: "Allah did not need them; He is Rich and Worthy of praise.",
      facts: ["Al-Ghani: free of all need", "Al-Hamid: the Praiseworthy"],
      quote: q64(6),
      source: ik(6, "Ibn Kathir says they turned away from the truth, and Allah was not in need of them.", "But Allah was not in need"),
      difficulty: 2,
      questions: [
        { q: "Did Allah need those who turned away?", a: "No, not at all", wrong: ["Yes, very much", "Only a little", "Only their wealth"], why: "But Allah was not in need of them." },
        { q: "What does Al-Ghani mean?", a: "Free of all need", wrong: ["The Strong", "The First", "The Near"], why: "And Allah is not in need, Worthy of all praise." },
        { tf: true, q: "Our worship helps us, not Allah.", why: "But Allah was not in need. And Allah is not in need, Worthy of all praise." }
      ]
    }
  ]
};

/** Ayahs 7 to 10: the oath that resurrection is real, the Light of the Quran, and the Day of mutual loss and gain. */
const TAGHABUN_TWO: DeepUnit = {
  key: "taghabun2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-64",
  name: "At-Taghabun, ayahs 7 to 10",
  kind: "skill",
  lessonType: "surah",
  surahName: "At-Taghabun",
  lessons: [
    {
      slug: "claim-no-resurrection",
      title: "A false claim",
      line: "Disbelievers claimed they would never be raised again.",
      facts: ["Allah answered with an oath", "Resurrection is certain"],
      quote: q64(7),
      source: ik(7, "Ibn Kathir says the disbelievers, idol worshippers and atheists claim they will not be resurrected.", "they claim that they will not be resurrected"),
      difficulty: 2,
      questions: [
        { q: "What did the disbelievers claim?", a: "They will not be raised", wrong: ["They will live forever", "They will be kings", "They will fly"], why: "The disbelievers pretend that they will never be resurrected." },
        { q: "How was the Prophet ﷺ told to answer?", a: "Yes! By my Lord", wrong: ["Maybe", "I do not know", "Stay silent"], why: "Say: Yes! By my Lord, you will certainly be resurrected." },
        { tf: true, q: "Resurrection after death is true.", why: "Say: Yes! By my Lord, you will certainly be resurrected." }
      ]
    },
    {
      slug: "three-oaths",
      title: "Three oaths in the Quran",
      line: "Three times, Allah told His Messenger to swear we will rise.",
      facts: ["10:53 in Yunus", "34:3 in Saba"],
      quote: q64(7),
      source: ik(7, "Ibn Kathir says 64:7 is the third ayah where Allah orders His Messenger to swear by his Lord that resurrection will happen, after 10:53 and 34:3.", "This is the third Ayah in which Allah orders"),
      difficulty: 4,
      questions: [
        { q: "How many such oath ayahs are there?", a: "Three", wrong: ["One", "Five", "Seven"], why: "This is the third Ayah in which Allah orders His Messenger to swear by His Lord." },
        { q: "Which surah has the first one?", a: "Yunus", wrong: ["Al-Fatihah", "Al-Ikhlas", "An-Nas"], why: "The first is in Surah Yunus. (10:53)" },
        { tf: true, q: "The second oath ayah is in Surah Saba.", why: "The second is in Surah Saba. (34:3)" }
      ]
    },
    {
      slug: "informed-of-all",
      title: "Told of every deed",
      line: "On that Day, we are told of every deed, big or small.",
      facts: ["Nothing is forgotten", "Small deeds count too"],
      quote: q64(7),
      source: ik(7, "Ibn Kathir says people will be informed of all their actions, major or minor, big or small.", "you will be informed of all of your actions, whether major or minor, big or small"),
      difficulty: 2,
      questions: [
        { q: "Which deeds will we be told about?", a: "All, big or small", wrong: ["Only big ones", "Only bad ones", "Only the last one"], why: "You will be informed of all of your actions, whether major or minor, big or small." },
        { q: "When will we be told?", a: "After resurrection", wrong: ["Before birth", "In a dream", "Never"], why: "You will certainly be resurrected, then you will be informed of what you did." },
        { tf: true, q: "Small good deeds are worth doing.", why: "You will be informed of all of your actions, whether major or minor, big or small." }
      ]
    },
    {
      slug: "easy-for-allah",
      title: "Easy for Allah",
      line: "Raising and rewarding everyone is easy for Allah.",
      facts: ["He made us the first time", "Nothing is hard for Him"],
      quote: q64(7),
      source: ik(7, "Ibn Kathir says resurrecting people and rewarding them is easy for Allah.", "resurrecting and recompensing you is easy for Allah"),
      difficulty: 2,
      questions: [
        { q: "How hard is resurrection for Allah?", a: "Easy", wrong: ["Very hard", "Impossible", "Slow"], why: "And that is easy for Allah." },
        { q: "What is easy for Allah, per Ibn Kathir?", a: "Raising and rewarding us", wrong: ["Only making rain", "Only making stars", "Nothing"], why: "Resurrecting and recompensing you is easy for Allah." },
        { tf: true, q: "Allah can bring everyone back to life.", why: "Resurrecting and recompensing you is easy for Allah." }
      ]
    },
    {
      slug: "the-light-sent-down",
      title: "The Light sent down",
      line: "Allah calls us to believe in Him, His Messenger and the Light.",
      facts: ["The Light is the Quran", "Allah knows our deeds"],
      quote: q64(8),
      source: ik(8, "Ibn Kathir says the Light which Allah sent down is the Quran, and none of our deeds escapes His knowledge.", "none of your deeds ever escapes His knowledge"),
      difficulty: 2,
      questions: [
        { q: "What is the Light in 64:8?", a: "The Quran", wrong: ["The sun", "A lamp", "The moon"], why: "And in the Light which We have sent down, that is, the Quran." },
        { q: "What are we told to believe in?", a: "Allah, His Messenger, the Light", wrong: ["Stars and luck", "Kings and gold", "Dreams"], why: "Therefore, believe in Allah and in His Messenger and in the Light which We have sent down." },
        { tf: true, q: "Some deeds escape Allah's knowledge.", why: "False. None of your deeds ever escapes His knowledge." }
      ]
    },
    {
      slug: "day-of-gathering",
      title: "The Day of Gathering",
      line: "All people, first and last, will be gathered in one place.",
      facts: ["One caller heard by all", "Everyone seen at once"],
      quote: q64(9),
      source: ik(9, "Ibn Kathir says on the Day of Resurrection the earlier and later generations will be gathered in one place.", "the earlier and later generations will all be gathered in one area"),
      difficulty: 3,
      questions: [
        { q: "Who will be gathered on that Day?", a: "The first and last people", wrong: ["Only the rich", "Only one nation", "Only the young"], why: "The earlier and later generations will all be gathered in one area." },
        { q: "What is another name for the Day of Gathering?", a: "The Day of Resurrection", wrong: ["The day of Eid", "The day of rain", "The first day"], why: "The Day of Gathering, meaning the Day of Resurrection." },
        { tf: true, q: "A caller will be heard by all of them.", why: "A caller would be heard by them all, and one's vision would easily see them all." }
      ]
    },
    {
      slug: "day-of-taghabun",
      title: "The Day of At-Taghabun",
      line: "At-Taghabun names Judgment Day: a day of loss and gain.",
      facts: ["The surah is named after it", "Ibn Abbas explained it"],
      quote: q64(9),
      source: ik(9, "Ibn Kathir reports Ibn Abbas saying At-Taghabun is a name of the Day of Judgement, when the people of Paradise gain over the people of the Fire.", "It is one of the names of the Day of Judgement"),
      difficulty: 3,
      questions: [
        { q: "What is At-Taghabun, per Ibn Abbas?", a: "A name of Judgment Day", wrong: ["A city", "A river", "A prophet"], why: "Ibn Abbas said: It is one of the names of the Day of Judgement." },
        { q: "Who gains on that Day?", a: "The people of Paradise", wrong: ["The richest people", "The tallest people", "No one"], why: "Because the people of Paradise will have gained over the people of the Fire." },
        { tf: true, q: "Qatadah and Mujahid said similar to Ibn Abbas.", why: "Qatadah and Mujahid said similarly." }
      ]
    },
    {
      slug: "the-great-success",
      title: "The great success",
      line: "Believe and do good: sins are wiped away and Paradise awaits.",
      facts: ["Gardens with rivers", "Living there forever"],
      quote: q64(9),
      source: ik(9, "Ibn Kathir quotes the ayah: whoever believes and does good, Allah wipes away his sins and admits him to Gardens forever, the great success.", "that will be the great success"),
      difficulty: 2,
      questions: [
        { q: "What two things lead to the great success?", a: "Belief and good deeds", wrong: ["Wealth and fame", "Strength and speed", "Luck and looks"], why: "Whosoever believes in Allah and performs righteous deeds, He will expiate from him his sins." },
        { q: "What flows beneath the Gardens?", a: "Rivers", wrong: ["Sand", "Fire", "Clouds"], why: "Gardens beneath which rivers flow, to dwell therein forever." },
        { tf: true, q: "Ayah 64:10 warns those who deny Allah's signs.", why: "But those who disbelieved and denied Our Ayat, they will be the dwellers of the Fire." }
      ]
    },
    {
      slug: "the-greatest-gain",
      title: "The real win",
      line: "No gain or loss is bigger than Paradise or the Fire.",
      facts: ["Worldly wins are small", "Aim for the real win"],
      quote: q64(10),
      source: ik(10, "Ibn Kathir reports Muqatil bin Hayyan saying no loss and gain is greater than some entering Paradise while others go to the Fire.", "There is no mutual loss and gain greater than these entering Paradise"),
      difficulty: 3,
      questions: [
        { q: "Who said there is no greater loss and gain?", a: "Muqatil bin Hayyan", wrong: ["Abu Lahab", "Firawn", "Qarun"], why: "Muqatil bin Hayyan said, There is no mutual loss and gain greater than these entering Paradise." },
        { q: "What is the greatest gain?", a: "Entering Paradise", wrong: ["Winning a race", "Getting rich", "Being famous"], why: "There is no mutual loss and gain greater than these entering Paradise." },
        { tf: true, q: "Losing money is the biggest loss of all.", why: "False. There is no mutual loss and gain greater than Paradise and the Fire." }
      ]
    }
  ]
};

/** Ayahs 11 to 13: every hardship is by Allah's permission, He guides the patient heart, obey Him, and trust in Him. */
const TAGHABUN_THREE: DeepUnit = {
  key: "taghabun3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-64",
  name: "At-Taghabun, ayahs 11 to 13",
  kind: "skill",
  lessonType: "surah",
  surahName: "At-Taghabun",
  lessons: [
    {
      slug: "by-allahs-permission",
      title: "Only by His permission",
      line: "No hardship happens except by Allah's permission and decree.",
      facts: ["57:22 says the same", "Nothing happens by chance"],
      quote: q64(11),
      source: ik(11, "Ibn Kathir reports Ibn Abbas saying no calamity happens except by the command of Allah, from His decree and will.", "meaning from His decree and will"),
      difficulty: 2,
      questions: [
        { q: "How does any hardship happen?", a: "By Allah's permission", wrong: ["By pure luck", "By the stars", "By magic"], why: "No calamity occurs, but by the permission of Allah." },
        { q: "Which ayah in Al-Hadid says the same?", a: "57:22", wrong: ["2:255", "1:5", "112:2"], why: "No calamity occurs on the earth or in yourselves but it is inscribed in a record. (57:22)" },
        { tf: true, q: "Ibn Abbas said it is by the command of Allah.", why: "Ibn Abbas said; By the command of Allah, meaning from His decree and will." }
      ]
    },
    {
      slug: "guides-his-heart",
      title: "He guides the heart",
      line: "Whoever is patient in hardship, Allah guides his heart.",
      facts: ["Patience brings guidance", "Allah replaces with better"],
      quote: q64(11),
      source: ik(11, "Ibn Kathir says whoever is struck by a hardship, knows it is Allah's decree and is patient, Allah guides his heart and gives him something better.", "Allah will replace whatever he lost for Him with the same or what is better"),
      difficulty: 3,
      questions: [
        { q: "Whose heart does Allah guide, per 64:11?", a: "Whoever believes in Him", wrong: ["Whoever is rich", "Whoever is loud", "Whoever is tall"], why: "And whosoever believes in Allah, He guides his heart." },
        { q: "What does Allah give the patient one?", a: "The same or better", wrong: ["Nothing", "Only sadness", "Only gold"], why: "Allah will replace whatever he lost for Him with the same or what is better." },
        { tf: true, q: "Patience in hardship brings a reward.", why: "He patiently abides, awaiting Allah's reward, then Allah guides his heart." }
      ]
    },
    {
      slug: "would-not-have-missed",
      title: "Meant for you",
      line: "What reached you was never going to miss you.",
      facts: ["This brings calm", "Certainty in faith"],
      quote: q64(11),
      source: ik(11, "Ibn Kathir reports Ibn Abbas: Allah guides his heart to certainty, so he knows what reached him would not have missed him.", "he will know that what reached him would not have missed him"),
      difficulty: 3,
      questions: [
        { q: "What does Allah guide the heart to?", a: "Certainty", wrong: ["Doubt", "Fear", "Anger"], why: "Allah will guide his heart to certainty." },
        { q: "What could never have missed you?", a: "What reached you", wrong: ["What you wished", "What you lost", "Nothing"], why: "He will know that what reached him would not have missed him." },
        { tf: true, q: "Knowing Allah's decree can calm a sad heart.", why: "What reached him would not have missed him and what has missed him would not have reached him." }
      ]
    },
    {
      slug: "amazing-believer",
      title: "Good in every case",
      line: "A believer gains good: thankful in joy, patient in trouble.",
      facts: ["Shukr in good times", "Sabr in hard times"],
      quote: q64(11),
      source: hadith("muslim", "2999", "Suhaib", "Sahih", "The Prophet ﷺ said the believer's affair is amazing: in joy he is thankful and in trouble he is patient, and both are good for him.", "Strange are the ways of a believer for there is good in every affair of his"),
      difficulty: 2,
      questions: [
        { q: "What does a believer do in good times?", a: "Thanks Allah", wrong: ["Shows off", "Forgets Allah", "Complains"], why: "If he has an occasion to feel delight, he thanks God, thus there is a good for him in it." },
        { q: "What does a believer do in hard times?", a: "Stays patient", wrong: ["Gives up", "Blames others", "Gets angry"], why: "If he gets into trouble and endures it patiently, there is a good for him in it." },
        { tf: true, q: "Suhaib narrated the hadith of the amazing believer.", why: "Suhaib reported that Allah's Messenger said: Strange are the ways of a believer." }
      ]
    },
    {
      slug: "even-a-thorn",
      title: "Even a thorn",
      line: "Even a thorn prick wipes away some sins of a Muslim.",
      facts: ["No pain is wasted", "Sadness counts too"],
      quote: q64(11),
      source: hadith("bukhari", "5641", "Abu Sa'id al-Khudri and Abu Hurairah", "Sahih", "The Prophet ﷺ said no tiredness, illness, sorrow or hurt reaches a Muslim, even a thorn prick, without Allah wiping away some of his sins.", "even if it were the prick he receives from a thorn, but that Allah expiates some of his sins for that"),
      difficulty: 2,
      questions: [
        { q: "What does even a thorn prick do?", a: "Wipes away some sins", wrong: ["Nothing at all", "Adds sins", "Brings bad luck"], why: "Even if it were the prick he receives from a thorn, Allah expiates some of his sins for that." },
        { q: "Which of these is named in the hadith?", a: "Sadness", wrong: ["Laughter", "Sleep", "Hunger only"], why: "No fatigue, nor disease, nor sorrow, nor sadness befalls a Muslim but that Allah expiates some of his sins." },
        { tf: true, q: "Small hurts can still bring a reward.", why: "Even the prick he receives from a thorn, Allah expiates some of his sins for that." }
      ]
    },
    {
      slug: "do-not-say-if-only",
      title: "Do not say if only",
      line: "After trouble, say Allah decreed it, not if only I had...",
      facts: ["Qadar: Allah's decree", "If only opens a door to Shaytan"],
      quote: q64(11),
      source: hadith("muslim", "2664", "Abu Hurairah", "Sahih", "The Prophet ﷺ said when trouble comes, do not say if only I had done this, but say Allah decreed it, for if opens the way for Satan.", "Allah did that what He had ordained to do"),
      difficulty: 3,
      questions: [
        { q: "What should we say after trouble?", a: "Allah decreed it", wrong: ["If only I had...", "It is unfair", "Nothing matters"], why: "Say: Allah did that what He had ordained to do." },
        { q: "What does if only open, per the hadith?", a: "The way for Satan", wrong: ["A treasure", "A new home", "A good path"], why: "Your if opens the gate for the Satan." },
        { tf: true, q: "A strong believer is more loved by Allah.", why: "A strong believer is better and is more lovable to Allah than a weak believer." }
      ]
    },
    {
      slug: "obey-allah-and-messenger",
      title: "Obey Allah and His Messenger",
      line: "The Messenger's ﷺ duty is to convey; our duty is to obey.",
      facts: ["Az-Zuhri explained it", "Message, delivery, following"],
      quote: q64(12),
      source: ik(12, "Ibn Kathir quotes Az-Zuhri: the Message is from Allah, delivering it is the Messenger's ﷺ job, and following it is ours.", "From Allah comes the Message … and the adherence is up to us"),
      difficulty: 3,
      questions: [
        { q: "What is the Messenger's ﷺ duty if people turn away?", a: "Only to convey clearly", wrong: ["To force them", "To give up", "To hide"], why: "If you turn away, then the duty of Our Messenger is only to convey clearly." },
        { q: "Whose job is following the Message?", a: "Ours", wrong: ["The angels", "Only scholars", "No one"], why: "From Allah comes the Message, and the adherence is up to us." },
        { tf: true, q: "Az-Zuhri said the Message comes from Allah.", why: "Az-Zuhri said, From Allah comes the Message." }
      ]
    },
    {
      slug: "who-refuses",
      title: "Who refuses Paradise?",
      line: "Whoever obeys the Prophet ﷺ enters Paradise; disobeying refuses.",
      facts: ["Obedience leads to Paradise", "Paradise is offered to all"],
      quote: q64(12),
      source: hadith("bukhari", "7280", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said all his followers will enter Paradise except those who refuse, and whoever disobeys him is the one who refuses.", "Whoever obeys me will enter Paradise"),
      difficulty: 2,
      questions: [
        { q: "Who will enter Paradise, per the hadith?", a: "Whoever obeys the Prophet ﷺ", wrong: ["Whoever is rich", "Whoever is famous", "Whoever is strong"], why: "Whoever obeys me will enter Paradise." },
        { q: "Who is the one who refuses?", a: "Whoever disobeys him", wrong: ["Whoever travels", "Whoever sleeps", "Whoever is poor"], why: "Whoever disobeys me is the one who refuses." },
        { tf: true, q: "All his followers will enter except those who refuse.", why: "All my followers will enter Paradise except those who refuse." }
      ]
    },
    {
      slug: "la-ilaha-illa-huwa",
      title: "None but Him",
      line: "There is no god but Allah, so believers rely on Him alone.",
      facts: ["Tawhid: Allah is One", "Tawakkul: trusting Allah"],
      quote: q64(13),
      source: ik(13, "Ibn Kathir says Allah first states Tawhid, then commands relying on Him alone, as in 73:9.", "He first informs about Tawhid and its meaning"),
      difficulty: 2,
      questions: [
        { q: "What does La ilaha illa Huwa mean?", a: "No god but Him", wrong: ["Allah is far", "Allah is many", "Allah sleeps"], why: "Allah! La ilaha illa Huwa." },
        { q: "In whom should believers trust?", a: "Allah", wrong: ["Their wealth", "Their friends only", "Luck"], why: "And in Allah therefore let the believers put their trust." },
        { tf: true, q: "Ibn Kathir links 64:13 with 73:9.", why: "The Lord of the east and the west; La ilaha illa Huwa. So take Him alone as Trustee. (73:9)" }
      ]
    },
    {
      slug: "trust-in-their-lord",
      title: "Those who trust Allah",
      line: "Seventy thousand who trust Allah enter Paradise without account.",
      facts: ["Tawakkul is rewarded", "Do your part, trust Allah"],
      quote: q64(13),
      source: hadith("bukhari", "6472", "Ibn Abbas", "Sahih", "The Prophet ﷺ said seventy thousand of his followers will enter Paradise without accounts, those who put their trust in their Lord.", "put their trust in their Lord"),
      difficulty: 3,
      questions: [
        { q: "How many enter Paradise without accounts?", a: "Seventy thousand", wrong: ["Seven", "Seven hundred", "Seventy"], why: "Seventy thousand people of my followers will enter Paradise without accounts." },
        { q: "What quality do they have?", a: "Trust in their Lord", wrong: ["Great wealth", "Big houses", "Loud voices"], why: "And put their trust in their Lord." },
        { tf: true, q: "Ibn Abbas narrated the seventy thousand hadith.", why: "Narrated Ibn Abbas: they put their trust in their Lord." }
      ]
    }
  ]
};

/** Ayahs 14 to 18: family and wealth as a test, pardoning, Taqwa as much as you can, and charity as a loan to Allah. */
const TAGHABUN_FOUR: DeepUnit = {
  key: "taghabun4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-64",
  name: "At-Taghabun, ayahs 14 to 18",
  kind: "skill",
  lessonType: "surah",
  surahName: "At-Taghabun",
  lessons: [
    {
      slug: "family-can-distract",
      title: "When family distracts",
      line: "Loved ones can sometimes keep us busy from good deeds.",
      facts: ["63:9 warns the same", "Love them, but obey Allah"],
      quote: q64(14),
      source: ik(14, "Ibn Kathir says some wives and children can be like enemies when they keep a person busy away from good deeds.", "they might be busied with them rather than with performing the good deeds"),
      difficulty: 3,
      questions: [
        { q: "How can family be like an enemy, per Ibn Kathir?", a: "By distracting from good deeds", wrong: ["By being hungry", "By being loud", "By growing up"], why: "They might be busied with them rather than with performing the good deeds." },
        { q: "Which ayah does Ibn Kathir link to it?", a: "63:9", wrong: ["2:255", "112:1", "1:1"], why: "Let not your properties or your children divert you from the remembrance of Allah. (63:9)" },
        { tf: true, q: "Ibn Zayd said to beware for your religion.", why: "Therefore, beware of them! for your religion, according to Ibn Zayd." }
      ]
    },
    {
      slug: "the-men-of-makkah",
      title: "Held back from Hijrah",
      line: "Some families stopped Muslims in Makkah from migrating.",
      facts: ["Ibn Abbas told the story", "They later joined the Prophet ﷺ"],
      quote: q64(14),
      source: ik(14, "Ibn Kathir reports Ibn Abbas: some men in Makkah wanted to migrate to the Prophet ﷺ, but their families would not let them.", "There were men who embraced Islam in Makkah and wanted to migrate"),
      difficulty: 3,
      questions: [
        { q: "What did these men want to do?", a: "Migrate to the Prophet ﷺ", wrong: ["Leave Islam", "Build a fort", "Go trading"], why: "There were men who embraced Islam in Makkah and wanted to migrate to Allah's Messenger." },
        { q: "Who held them back?", a: "Their wives and children", wrong: ["Their teachers", "Their camels", "The Romans"], why: "However, their wives and children refused to allow them." },
        { tf: true, q: "Ibn Abbas explained the reason for 64:14.", why: "Ibn Abbas said to a man who asked him about this Ayah: There were men who embraced Islam in Makkah." }
      ]
    },
    {
      slug: "pardon-and-forgive",
      title: "Pardon and forgive",
      line: "Allah asked them to pardon, overlook and forgive their families.",
      facts: ["Afw: pardoning", "Safh: overlooking"],
      quote: q64(14),
      source: ik(14, "Ibn Kathir says when these men saw they had missed knowledge, they wanted to blame their families, and Allah told them to pardon and forgive.", "then verily, Allah is Oft-Forgiving, Most Merciful"),
      difficulty: 2,
      questions: [
        { q: "What three things does 64:14 ask?", a: "Pardon, overlook, forgive", wrong: ["Shout, blame, leave", "Run, hide, wait", "Buy, sell, save"], why: "But if you pardon them and overlook, and forgive, then verily, Allah is Oft-Forgiving." },
        { q: "How is Allah described after forgiving?", a: "Oft-Forgiving, Most Merciful", wrong: ["Swift to punish", "Far away", "Silent"], why: "Then verily, Allah is Oft-Forgiving, Most Merciful." },
        { tf: true, q: "Forgiving family is loved by Allah.", why: "If you pardon and overlook, and forgive, then verily, Allah is Oft-Forgiving, Most Merciful." }
      ]
    },
    {
      slug: "wealth-and-children-test",
      title: "A test from Allah",
      line: "Wealth and children are a test of who obeys Allah.",
      facts: ["Fitnah: a test", "Pass by putting Allah first"],
      quote: q64(15),
      source: ik(15, "Ibn Kathir says wealth and children are a test from Allah, to show who obeys Him and who disobeys.", "the wealth and children are a test and trial from Allah the Exalted for His creatures"),
      difficulty: 2,
      questions: [
        { q: "What are wealth and children, per 64:15?", a: "A Fitnah, a test", wrong: ["A punishment", "A game", "A burden only"], why: "Your wealth and your children are only a Fitnah." },
        { q: "What does the test show?", a: "Who obeys Allah", wrong: ["Who is richest", "Who is tallest", "Who is oldest"], why: "So that He knows those who obey Him and those who disobey Him." },
        { tf: true, q: "Wealth can be a test as well as a gift.", why: "The wealth and children are a test and trial from Allah the Exalted for His creatures." }
      ]
    },
    {
      slug: "great-reward-with-allah",
      title: "A great reward",
      line: "With Allah is a great reward, better than this world.",
      facts: ["3:14 says the same", "The Hereafter is better"],
      quote: q64(15),
      source: ik(15, "Ibn Kathir says with Allah, on the Day of Resurrection, is a great reward, and quotes 3:14.", "meaning, on the Day of Resurrection"),
      difficulty: 2,
      questions: [
        { q: "What is with Allah, per 64:15?", a: "A great reward", wrong: ["A small gift", "Nothing", "A long wait"], why: "Whereas Allah! With Him is a great reward." },
        { q: "When is that reward given?", a: "The Day of Resurrection", wrong: ["Every Monday", "Only in Ramadan", "Never"], why: "With Him, meaning, on the Day of Resurrection, is a great reward." },
        { tf: true, q: "Ibn Kathir quotes 3:14 about worldly delights.", why: "This is the pleasure of the present world's life; but Allah has the excellent return with him. (3:14)" }
      ]
    },
    {
      slug: "taqwa-as-you-can",
      title: "As much as you can",
      line: "Fear Allah as much as you are able; He asks no more.",
      facts: ["Allah is kind", "Do your best"],
      quote: q64(16),
      source: ik(16, "Ibn Kathir says have Taqwa of Allah as much as you can means as much as you are able to bear.", "as much as you are able and can bear or endure"),
      difficulty: 2,
      questions: [
        { q: "How much Taqwa does 64:16 ask?", a: "As much as you can", wrong: ["More than you can", "None at all", "Only on Fridays"], why: "So have Taqwa of Allah as much as you can." },
        { q: "What does as you can mean, per Ibn Kathir?", a: "As much as you can bear", wrong: ["Only when easy", "Only when rich", "Only when old"], why: "As much as you are able and can bear or endure." },
        { tf: true, q: "Allah asks only what we are able to do.", why: "So have Taqwa of Allah as much as you can." }
      ]
    },
    {
      slug: "do-what-you-can",
      title: "Do of it what you can",
      line: "Avoid what the Prophet ﷺ forbade; do his orders as you can.",
      facts: ["Stay away from the forbidden", "Do your best with orders"],
      quote: q64(16),
      source: hadith("bukhari", "7288", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said if I forbid you something keep away from it, and if I order you something do of it as much as you can.", "if I forbid you to do something, then keep away from it. And if I order you to do something, then do of it as much as you can"),
      difficulty: 3,
      questions: [
        { q: "What should we do with what he forbade?", a: "Keep away from it", wrong: ["Do a little", "Ask why", "Delay it"], why: "If I forbid you to do something, then keep away from it." },
        { q: "What should we do with what he ordered?", a: "Do as much as we can", wrong: ["Ignore it", "Do it once", "Wait for others"], why: "And if I order you to do something, then do of it as much as you can." },
        { tf: true, q: "Abu Hurayrah narrated the do-what-you-can hadith.", why: "Narrated Abu Huraira: The Prophet ﷺ said, if I order you to do something, then do of it as much as you can." }
      ]
    },
    {
      slug: "listen-and-obey",
      title: "Listen and obey",
      line: "Listen and obey, without straying right or left.",
      facts: ["Follow what is commanded", "Avoid what is forbidden"],
      quote: q64(16),
      source: ik(16, "Ibn Kathir says listen and obey means obey what Allah and His Messenger command without straying to the right or left.", "do not stray from it to the right or left"),
      difficulty: 2,
      questions: [
        { q: "What does 64:16 tell us after Taqwa?", a: "Listen and obey", wrong: ["Sit and wait", "Run and hide", "Talk and argue"], why: "So have Taqwa of Allah as much as you can; listen and obey." },
        { q: "How should we obey, per Ibn Kathir?", a: "Without straying aside", wrong: ["Only when easy", "Only in public", "Only half"], why: "Obey what Allah and His Messenger command you to do and do not stray from it to the right or left." },
        { tf: true, q: "We should not decide before Allah and His Messenger.", why: "Do not utter a statement or make a decision before Allah and His Messenger issue a statement or decision." }
      ]
    },
    {
      slug: "spend-it-is-better",
      title: "Better for yourselves",
      line: "Giving to the needy is better for us in both worlds.",
      facts: ["Give to the poor and weak", "Be kind like Allah is kind"],
      quote: q64(16),
      source: ik(16, "Ibn Kathir says give to relatives, the poor, the needy and the weak; that is better for you in this life and the Hereafter.", "This will be better for you in this life and the Hereafter"),
      difficulty: 2,
      questions: [
        { q: "Who should we give to, per Ibn Kathir?", a: "Relatives, poor and needy", wrong: ["Only the rich", "Only strangers", "No one"], why: "Give from what Allah has granted you to your relatives, the poor, the needy and the weak." },
        { q: "When is giving better for us?", a: "In this life and the next", wrong: ["Only today", "Only in old age", "Never"], why: "This will be better for you in this life and the Hereafter." },
        { tf: true, q: "Charity is good for the giver too.", why: "And spend in charity; that is better for yourselves." }
      ]
    },
    {
      slug: "saved-from-greed",
      title: "Saved from greed",
      line: "Whoever is saved from his own greed is truly successful.",
      facts: ["Shuhh: greed", "59:9 says the same"],
      quote: q64(16),
      source: ik(16, "Ibn Kathir quotes the ayah: whoever is saved from his own greed, they are the successful, as also said in Surat Al-Hashr.", "And whosoever is saved from his own greed, then they are the successful ones"),
      difficulty: 2,
      questions: [
        { q: "Who are the successful ones in 64:16?", a: "Those saved from greed", wrong: ["Those who save most", "Those who win games", "Those who are famous"], why: "And whosoever is saved from his own greed, then they are the successful ones." },
        { q: "Which surah has a similar ayah?", a: "Al-Hashr", wrong: ["Al-Fil", "Al-Asr", "Al-Kawthar"], why: "This was explained with a similar Ayah in Surat Al-Hashr." },
        { tf: true, q: "Greed blocks a person from success.", why: "Whosoever is saved from his own greed, then they are the successful ones." }
      ]
    },
    {
      slug: "loan-to-allah",
      title: "A loan to Allah",
      line: "Charity is a loan to Allah, and He repays it many times.",
      facts: ["2:245 says the same", "Allah replaces what you give"],
      quote: q64(17),
      source: ik(17, "Ibn Kathir says Allah counts charity as a loan to Him, and He replaces whatever we spend and multiplies it.", "Allah considered giving charity as if it is a loan to Him"),
      difficulty: 2,
      questions: [
        { q: "What does Allah call charity in 64:17?", a: "A handsome loan", wrong: ["A tax", "A fine", "A trade"], why: "If you lend to Allah a handsome loan, He will double it for you." },
        { q: "What does Allah do with the loan?", a: "Doubles it and forgives", wrong: ["Keeps it", "Forgets it", "Returns half"], why: "He will double it for you, and will forgive you." },
        { tf: true, q: "Whatever we spend, Allah replaces it.", why: "Whatever you spend, then Allah will replace it." }
      ]
    },
    {
      slug: "date-like-a-mountain",
      title: "A date like a mountain",
      line: "Allah grows one honest date of charity as big as a mountain.",
      facts: ["Only honest money counts", "Small gifts grow huge"],
      quote: q64(17),
      source: hadith("bukhari", "1410", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said if someone gives a date's worth from honest earnings, Allah grows its reward like a foal until it is as big as a mountain.", "so much so that it becomes as big as a mountain"),
      difficulty: 3,
      questions: [
        { q: "How small can the charity be?", a: "One date", wrong: ["A house", "A camel", "A field"], why: "If one gives in charity what equals one date-fruit from the honestly earned money." },
        { q: "How big does its reward grow?", a: "As big as a mountain", wrong: ["As big as a cup", "It stays small", "As big as a tree"], why: "So much so that it becomes as big as a mountain." },
        { tf: true, q: "Allah accepts only honestly earned money.", why: "And Allah accepts only the honestly earned money." }
      ]
    },
    {
      slug: "charity-does-not-decrease",
      title: "Giving never makes you poorer",
      line: "Charity does not decrease wealth, the Prophet ﷺ promised.",
      facts: ["Forgiving raises honor", "Humility raises status"],
      quote: q64(17),
      source: hadith("muslim", "2588", "Abu Hurairah", "Sahih", "The Prophet ﷺ said charity does not decrease wealth, forgiving raises honor, and humility for Allah raises status.", "Charity does not decrease wealth"),
      difficulty: 2,
      questions: [
        { q: "What does charity not do to wealth?", a: "Decrease it", wrong: ["Clean it", "Bless it", "Grow it"], why: "Charity does not decrease wealth." },
        { q: "What does forgiving others bring?", a: "More honor", wrong: ["Shame", "Loss", "Nothing"], why: "No one forgives another except that Allah increases his honor." },
        { tf: true, q: "Humbling yourself for Allah raises you.", why: "No one humbles himself for the sake of Allah except that Allah raises his status." }
      ]
    },
    {
      slug: "shakur-and-halim",
      title: "Ash-Shakur, Al-Halim",
      line: "Allah gives much for little and is gentle with our mistakes.",
      facts: ["Shakur: rewards greatly", "Halim: forbearing"],
      quote: q64(17),
      source: ik(17, "Ibn Kathir says Shakur means Allah gives plenty in return for little, and Halim means He forgives and covers sins.", "He gives abundantly in return for what was little"),
      difficulty: 3,
      questions: [
        { q: "What does Ash-Shakur mean, per Ibn Kathir?", a: "Gives a lot for a little", wrong: ["Very strong", "Very far", "Very quiet"], why: "He gives abundantly in return for what was little." },
        { q: "What does Al-Halim do with our mistakes?", a: "Forgives and covers them", wrong: ["Shouts about them", "Counts them twice", "Shares them"], why: "Halim means, He forgives, pardons, covers and absolves the sins, mistakes, errors and shortcomings." },
        { tf: true, q: "64:17 names both Shakur and Halim.", why: "And Allah is Shakur, Halim." }
      ]
    },
    {
      slug: "unseen-and-seen",
      title: "Knower of unseen and seen",
      line: "The surah ends: Allah knows the unseen and the seen.",
      facts: ["Al-Aziz: the Almighty", "Al-Hakim: the All-Wise"],
      quote: q64(18),
      source: ik(18, "Ibn Kathir closes the surah with the ayah: All-Knower of the unseen and seen, the Almighty, the All-Wise.", "All-Knower of the unseen and seen, the Almighty, the All-Wise"),
      difficulty: 2,
      questions: [
        { q: "What does Allah know, per 64:18?", a: "The unseen and seen", wrong: ["Only the seen", "Only the past", "Only the sky"], why: "All-Knower of the unseen and seen, the Almighty, the All-Wise." },
        { q: "Which two Names end the surah?", a: "Almighty, All-Wise", wrong: ["First, Last", "King, Holy", "Rich, Kind"], why: "The Almighty, the All-Wise." },
        { tf: true, q: "At-Taghabun has eighteen ayahs.", why: "The surah ends at ayah 18: All-Knower of the unseen and seen, the Almighty, the All-Wise." }
      ]
    }
  ]
};

export const TAGHABUN_UNITS: readonly DeepUnit[] = [TAGHABUN_ONE, TAGHABUN_TWO, TAGHABUN_THREE, TAGHABUN_FOUR];
