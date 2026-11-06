import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Ghafir ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Ghafir 40:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_40_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Ghafir 40:${ayah}`,
    url: `https://quran.com/40:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 40:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q40 = (ayah: number) => quranQuote(40, ayah);

/** Ayahs 1 to 20: the names of Allah, the angels' dua for believers, the regret of the disbelievers, and the Day of Meeting. */
const GHAFIR_ONE: DeepUnit = {
  key: "ghafir1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-40",
  name: "Ghafir, ayahs 1 to 20",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ghafir",
  lessons: [
    {
      slug: "the-family-of-ha-mim",
      title: "The family of Ha Mim",
      line: "Ghafir is the first of seven surahs that open with Ha Mim.",
      facts: ["Ibn Masud loved the Ha Mim surahs", "He called them like a beautiful garden"],
      quote: q40(1),
      source: ik(1, "Ibn Masud said that reaching the Ha Mim surahs is like reaching a beautiful garden, so he took his time.", "When I reach the family of Ha Mim, it is like reaching a beautiful garden, so I take my time"),
      difficulty: 1,
      questions: [
        { q: "Which letters open Surah Ghafir?", a: "Ha Mim", wrong: ["Alif Lam Mim", "Ya Sin", "Ta Ha"], why: "The surah opens with the letters Ha Mim." },
        { q: "What did Ibn Masud compare the Ha Mim surahs to?", a: "A beautiful garden", wrong: ["A dark cave", "A high wall", "A long road"], why: "When I reach the family of Ha Mim, it is like reaching a beautiful garden, so I take my time." },
        { tf: true, q: "Ibn Masud took his time when reading the Ha Mim surahs.", why: "He said: so I take my time." }
      ]
    },
    {
      slug: "the-almighty-the-all-knower",
      title: "The Almighty, the All-Knower",
      line: "This Book is sent down from Allah, the Almighty, the All-Knower.",
      facts: ["Nothing is hidden from Allah", "Not even an ant under many layers"],
      quote: q40(2),
      source: ik(2, "Ibn Kathir says the Quran is from Allah, from Whom nothing is hidden, not even an ant beneath many layers.", "from Whom nothing is hidden, not even an ant concealed beneath many layers"),
      difficulty: 1,
      questions: [
        { q: "From whom is the Book sent down, in 40:2?", a: "Allah, the Almighty, the All-Knower", wrong: ["A wise man", "A poet", "The kings"], why: "The revelation of the Book is from Allah, the Almighty, the All-Knower." },
        { q: "What small thing does Ibn Kathir say Allah sees?", a: "An ant under many layers", wrong: ["Only big mountains", "Only the sun", "Only cities"], why: "Nothing is hidden from Him, not even an ant concealed beneath many layers." },
        { tf: false, q: "Some small things are hidden from Allah.", why: "Ibn Kathir says nothing is hidden from Him." }
      ]
    },
    {
      slug: "forgiver-of-sin",
      title: "Forgiver of sin",
      line: "Allah is the Forgiver of sin and the Acceptor of repentance.",
      facts: ["He forgives sins of the past", "He accepts repentance for the future"],
      quote: q40(3),
      source: ik(3, "Ibn Kathir says Allah forgives sins done in the past and accepts repentance for sins that may come later, from the one who repents.", "He forgives sins that have been committed in the past"),
      difficulty: 1,
      questions: [
        { q: "Which two names open 40:3?", a: "Forgiver of sin, Acceptor of repentance", wrong: ["The King, the Holy", "The First, the Last", "The Rich, the Praised"], why: "The Forgiver of sin, the Acceptor of repentance." },
        { q: "Which sins does Allah forgive, per Ibn Kathir?", a: "Sins done in the past", wrong: ["Only small ones", "Only one sin", "None at all"], why: "He forgives sins that have been committed in the past." },
        { q: "What does Allah accept for future sins?", a: "Repentance", wrong: ["Gold", "Excuses", "Silence"], why: "He accepts repentance for sins that may be committed in the future, from the one who repents and submits to Him." }
      ]
    },
    {
      slug: "hope-and-fear",
      title: "Hope and fear",
      line: "Allah is Forgiving, yet also Severe in punishment.",
      facts: ["Mercy and punishment come together", "So we keep both hope and fear"],
      quote: q40(3),
      source: ik(3, "Ibn Kathir says mercy and punishment are often mentioned together so that people stay between hope and fear.", "so that people will remain in a state of both hope and fear"),
      difficulty: 2,
      questions: [
        { q: "Who is Allah severe in punishment to, per Ibn Kathir?", a: "The one who keeps on sinning", wrong: ["The one who repents", "Every child", "The sick"], why: "To the one who persists in transgression and prefers the life of this world." },
        { q: "Why are mercy and punishment named together?", a: "To keep hope and fear", wrong: ["To scare only", "To confuse", "For rhyme only"], why: "These two attributes are often mentioned together in the Quran, so that people will remain in a state of both hope and fear." },
        { tf: true, q: "A believer has hope in Allah and fear of Him.", why: "People will remain in a state of both hope and fear." }
      ]
    },
    {
      slug: "the-bestower",
      title: "The Bestower",
      line: "Allah is the Bestower, and to Him is the final return.",
      facts: ["He gives blessings without end", "We can never thank Him enough"],
      quote: q40(3),
      source: ik(3, "Ibn Kathir says Allah is Most Generous, giving ongoing blessings for which His servants can never thank Him enough.", "granting ongoing blessings for which they can never sufficiently thank Him"),
      difficulty: 2,
      questions: [
        { q: "What does the Bestower mean, per Ibn Abbas?", a: "Generous and Rich", wrong: ["Strict and harsh", "Far and hidden", "Quick and loud"], why: "Ibn Abbas said this means He is Generous and Rich." },
        { q: "Can we fully thank Allah for His blessings?", a: "No, they are too many", wrong: ["Yes, in one day", "Yes, with money", "Only on Fridays"], why: "Ongoing blessings for which they can never sufficiently thank Him." },
        { q: "To whom is the final return, in 40:3?", a: "To Allah", wrong: ["To the earth", "To the kings", "To the stars"], why: "La ilaha illa Huwa, to Him is the final return." }
      ]
    },
    {
      slug: "do-not-be-fooled-by-their-wealth",
      title: "Do not be fooled by their wealth",
      line: "Only disbelievers dispute the ayat of Allah.",
      facts: ["Their wealth should not fool you", "Their joy in this world is brief"],
      quote: q40(4),
      source: ik(4, "Ibn Kathir says the easy travel of the disbelievers through the land means their wealth and luxury, which should not deceive anyone.", "means, their wealth and luxurious life"),
      difficulty: 2,
      questions: [
        { q: "Who disputes the ayat of Allah, in 40:4?", a: "Those who disbelieve", wrong: ["The believers", "The angels", "The Prophets"], why: "None disputes in the Ayat of Allah but those who disbelieve." },
        { q: "What should not deceive us, per Ibn Kathir?", a: "Their wealth and luxury", wrong: ["Their prayers", "Their kindness", "Their old age"], why: "Their ability of going about through the land means their wealth and luxurious life." },
        { tf: false, q: "Wealth in this world proves Allah is pleased with someone.", why: "Allah says not to be deceived by it; it is a brief enjoyment." }
      ]
    },
    {
      slug: "nuh-the-first-messenger",
      title: "Nuh, the first Messenger",
      line: "The people of Nuh and later nations denied their Messengers.",
      facts: ["Nuh first forbade idol worship", "The Prophet ﷺ was comforted by them"],
      quote: q40(5),
      source: ik(5, "Ibn Kathir says Nuh was the first Messenger sent to forbid idol worship, and Allah comforted the Prophet ﷺ with the stories of past Prophets.", "Nuh was the first Messenger whom Allah sent to denounce and forbid idol worship"),
      difficulty: 2,
      questions: [
        { q: "Which people denied first, in 40:5?", a: "The people of Nuh", wrong: ["The people of Musa", "The people of Isa", "The people of Yunus"], why: "The people of Nuh denied before these." },
        { q: "What was Nuh the first Messenger to forbid?", a: "Idol worship", wrong: ["Trade", "Travel", "Farming"], why: "Nuh was the first Messenger whom Allah sent to denounce and forbid idol worship." },
        { q: "Why did Allah tell the Prophet ﷺ of past nations?", a: "To comfort him", wrong: ["To scare him", "To blame him", "To test his memory"], why: "Allah consoles His Prophet Muhammad ﷺ for the rejection of his people." }
      ]
    },
    {
      slug: "arguing-with-falsehood",
      title: "Arguing with falsehood",
      line: "They argued with falsehood to push away the plain truth.",
      facts: ["The truth was plain and clear", "So Allah seized them"],
      quote: q40(5),
      source: ik(5, "Ibn Kathir says they made up weak arguments to dispute the truth, which was plain and clear.", "they came up with specious arguments with which to dispute the truth which was so plain and clear"),
      difficulty: 3,
      questions: [
        { q: "How did they dispute the truth, in 40:5?", a: "By means of falsehood", wrong: ["With clear proof", "With kindness", "With silence"], why: "They disputed by means of falsehood to refute therewith the truth." },
        { q: "How was the truth they disputed, per Ibn Kathir?", a: "Plain and clear", wrong: ["Hidden", "Hard to see", "Unknown"], why: "The truth which was so plain and clear." },
        { q: "Why did Allah seize them, per Ibn Kathir?", a: "Because of their sins", wrong: ["For no reason", "By chance", "For their wealth"], why: "I destroyed them, because of the sins they committed." }
      ]
    },
    {
      slug: "the-word-of-your-lord",
      title: "The Word of your Lord",
      line: "The Word of Allah came true against those who disbelieved.",
      facts: ["Past nations were warned", "Those who reject now are warned too"],
      quote: q40(6),
      source: ik(6, "Ibn Kathir says just as the Word came true against past nations, it comes true against those who rejected the Prophet ﷺ.", "just as the Word of punishment was justified against those of the past nations who disbelieved"),
      difficulty: 3,
      questions: [
        { q: "Against whom was the Word justified, in 40:6?", a: "Those who disbelieved", wrong: ["The believers", "The angels", "The children"], why: "Thus has the Word of your Lord been justified against those who disbelieved." },
        { tf: true, q: "Allah treated later deniers like the deniers of the past.", why: "Just as the Word of punishment was justified against those of the past nations who disbelieved, so too is it justified against these." },
        { q: "What does 40:6 say they will be?", a: "Dwellers of the Fire", wrong: ["Kings of the land", "Guides for others", "People of the Garden"], why: "That they will be the dwellers of the Fire." }
      ]
    },
    {
      slug: "the-bearers-of-the-throne",
      title: "The bearers of the Throne",
      line: "The angels who bear the Throne glorify and praise their Lord.",
      facts: ["They say Tasbih and Tahmid", "Tasbih: Allah is free of faults"],
      quote: q40(7),
      source: ik(7, "Ibn Kathir says the Throne-bearers combine Tasbih, declaring Allah free of any fault, with Tahmid, praising Him.", "They combine glorification"),
      difficulty: 2,
      questions: [
        { q: "Who glorify the praises of their Lord, in 40:7?", a: "The bearers of the Throne", wrong: ["The jinn only", "The kings", "The birds only"], why: "Those angels who bear the Throne and those around it glorify the praises of their Lord." },
        { q: "What does Tasbih mean, per Ibn Kathir?", a: "Allah is free of any fault", wrong: ["Asking for food", "Saying goodbye", "Counting days"], why: "Glorification implies that He is free of any shortcomings." },
        { q: "What does Tahmid mean, per Ibn Kathir?", a: "Praising Allah", wrong: ["Sleeping early", "Fasting", "Traveling"], why: "Praise is an affirmation of praise." }
      ]
    },
    {
      slug: "angels-ask-forgiveness-for-us",
      title: "Angels ask forgiveness for us",
      line: "The angels ask forgiveness for those who believe.",
      facts: ["They pray for believers unseen", "Allah commanded them to do so"],
      quote: q40(7),
      source: ik(7, "Ibn Kathir says Allah commanded His close angels to pray for the believers in their absence.", "Allah commanded that His angels who are close to Him should pray for the believers in their absence"),
      difficulty: 2,
      questions: [
        { q: "For whom do the angels ask forgiveness, in 40:7?", a: "Those who believe", wrong: ["Only kings", "Only scholars", "No one"], why: "And ask forgiveness for those who believe." },
        { q: "Who commanded the angels to pray for believers?", a: "Allah", wrong: ["The people", "The jinn", "No one"], why: "Allah commanded that His angels who are close to Him should pray for the believers in their absence." },
        { tf: true, q: "Angels make dua for believers who do not see them.", why: "They pray for the believers in their absence." }
      ]
    },
    {
      slug: "and-the-same-for-you",
      title: "And the same for you",
      line: "Pray for a friend in secret, and an angel prays for you.",
      facts: ["The angel says: the same for you", "So pray for others in secret"],
      quote: q40(7),
      source: hadith("muslim", "2732", "Abu Dharr", "Sahih", "The Prophet ﷺ said no believer prays for his brother in his absence except that the angels say: The same be for you too.", "There is no believing servant who supplicates for his brother behind his back"),
      difficulty: 2,
      questions: [
        { q: "When does an angel pray for you, per Muslim 2732?", a: "When you pray for a brother in secret", wrong: ["When you sleep", "When you shout", "When you eat"], why: "No believing servant supplicates for his brother behind his back except that the angels say: The same be for you too." },
        { q: "What do the angels say, per Muslim 2732?", a: "The same be for you too", wrong: ["Go away", "Say it again", "Not now"], why: "The angels say: The same be for you too." },
        { tf: true, q: "Praying for others brings good to you as well.", why: "The angels say: The same be for you too." }
      ]
    },
    {
      slug: "your-mercy-covers-all-things",
      title: "Your mercy covers all things",
      line: "Our Lord, You cover all things in mercy and knowledge.",
      facts: ["His mercy covers our sins", "His knowledge covers our deeds"],
      quote: q40(7),
      source: ik(7, "Ibn Kathir explains the angels' words: Your mercy covers their sins and Your knowledge covers all they do and say.", "Your mercy encompasses their sins and Your knowledge encompasses all their deeds, words and action"),
      difficulty: 3,
      questions: [
        { q: "What does Allah comprehend in mercy, in 40:7?", a: "All things", wrong: ["Only the sky", "Only angels", "A few things"], why: "Our Lord! You comprehend all things in mercy and knowledge." },
        { q: "Whom do the angels ask Allah to forgive?", a: "Those who repent and follow His way", wrong: ["Those who mock", "Those who boast", "Those who forget"], why: "So forgive those who repent and follow Your way." },
        { q: "What does Allah's knowledge cover, per Ibn Kathir?", a: "All our deeds and words", wrong: ["Only big deeds", "Only words", "Nothing hidden"], why: "Your knowledge encompasses all their deeds, words and action." }
      ]
    },
    {
      slug: "families-together-in-paradise",
      title: "Families together in Paradise",
      line: "Angels ask that believers enter Paradise with family.",
      facts: ["Righteous parents, spouses, children", "Allah raises them to one level"],
      quote: q40(8),
      source: ik(8, "Ibn Kathir says Allah brings righteous families together in neighboring dwellings so they delight in one another.", "bring them together so that they may find delight in one another in neighboring dwellings"),
      difficulty: 2,
      questions: [
        { q: "Who enters with believers, in 40:8?", a: "The righteous among their families", wrong: ["Everyone they met", "Only kings", "No one"], why: "And to the righteous among their fathers, their wives, and their offspring." },
        { q: "Which ayah does Ibn Kathir link to 40:8?", a: "52:21", wrong: ["2:255", "1:1", "112:1"], why: "This is like the Ayah 52:21: to them shall We join their offspring." },
        { tf: true, q: "Allah may raise a family member to join a higher one.", why: "We will raise the one whose deeds are of a lower status so that they will become equal, as a favor and a blessing from Us." }
      ]
    },
    {
      slug: "the-most-sincere-to-believers",
      title: "The most sincere to believers",
      line: "The angels are the most sincere well-wishers of the believers.",
      facts: ["Mutarrif said this of the angels", "Shayatin are the opposite"],
      quote: q40(8),
      source: ik(8, "Mutarrif said the most sincere servants of Allah towards the believers are the angels, then recited this ayah.", "The most sincere of the servants of Allah towards the believers are the angels"),
      difficulty: 3,
      questions: [
        { q: "Who are most sincere to believers, per Mutarrif?", a: "The angels", wrong: ["The Shayatin", "The rich", "The poets"], why: "The most sincere of the servants of Allah towards the believers are the angels." },
        { q: "Who are most treacherous to believers, per Mutarrif?", a: "The Shayatin", wrong: ["The angels", "The parents", "The teachers"], why: "The most treacherous of the servants of Allah towards the believers are the Shayatin." },
        { q: "Which names of Allah end 40:8?", a: "The Almighty, the All-Wise", wrong: ["The First, the Last", "The Rich, the Praised", "The King, the Holy"], why: "Verily, You are the Almighty, the All-Wise." }
      ]
    },
    {
      slug: "the-supreme-success",
      title: "The supreme success",
      line: "Whoever Allah saves from sins that Day has received His mercy.",
      facts: ["Saved from sins and their results", "That is the supreme success"],
      quote: q40(9),
      source: ik(9, "Ibn Kathir says the one Allah saves on the Day of Resurrection is protected from punishment.", "You have protected him and saved him from punishment"),
      difficulty: 2,
      questions: [
        { q: "What is the supreme success, in 40:9?", a: "Being saved from sins that Day", wrong: ["Gaining gold", "Living long", "Being famous"], why: "Whomsoever You save from the sins that Day, him verily, You have taken into mercy. And that is the supreme success." },
        { q: "Which Day is meant in 40:9, per Ibn Kathir?", a: "The Day of Resurrection", wrong: ["A Friday", "The day of Eid", "A rainy day"], why: "That Day means the Day of Resurrection." },
        { tf: true, q: "Whoever Allah saves that Day is protected from punishment.", why: "You have protected him and saved him from punishment." }
      ]
    },
    {
      slug: "when-they-were-called-to-faith",
      title: "When they were called to faith",
      line: "Allah greatly disliked their refusal of faith.",
      facts: ["Faith was offered in this world", "Refusing it brings deep regret"],
      quote: q40(10),
      source: ik(10, "Qatadah said Allah's aversion to those who refused faith in this world is greater than their regret on the Day of Resurrection.", "when Faith is presented to them in this world, and they turn away from it and refuse to accept it"),
      difficulty: 3,
      questions: [
        { q: "What did they refuse, in 40:10?", a: "The call to faith", wrong: ["Food and drink", "Rest", "Gifts"], why: "When you were called to the Faith but you used to refuse." },
        { q: "When was faith offered to them, per Qatadah?", a: "In this world", wrong: ["After death", "In a dream", "Never"], why: "When Faith is presented to them in this world, and they turn away from it." },
        { tf: true, q: "Today is the time to accept faith, before the Last Day.", why: "Faith is presented to them in this world." }
      ]
    },
    {
      slug: "you-made-us-die-twice",
      title: "You made us die twice",
      line: "They say: You gave us death twice and life twice.",
      facts: ["Like ayah 2:28", "They will ask to go back, too late"],
      quote: q40(11),
      source: ik(11, "Ibn Masud said this ayah is like 2:28: you were dead and He gave you life, then death, then life again.", "This Ayah is like the Ayah"),
      difficulty: 3,
      questions: [
        { q: "What do they confess, in 40:11?", a: "Their sins", wrong: ["Their wealth", "Their names", "Their journeys"], why: "Now we confess our sins, then is there any way to get out?" },
        { q: "Which ayah is 40:11 like, per Ibn Masud?", a: "2:28", wrong: ["112:1", "1:2", "36:1"], why: "Ibn Masud said: This Ayah is like the Ayah 2:28." },
        { q: "What answer do they get, per Ibn Kathir?", a: "No way to go back", wrong: ["A second chance", "A long rest", "A new life on earth"], why: "The response will be: There is no way for you to go back to the world." }
      ]
    },
    {
      slug: "when-allah-alone-was-called",
      title: "When Allah alone was called",
      line: "When Allah alone was worshipped, they disbelieved.",
      facts: ["With partners, they believed", "The judgment belongs to Allah"],
      quote: q40(12),
      source: ik(12, "Ibn Kathir says Allah is the Judge of His creation, the Just Who is never unjust.", "He is the Judge of His creation, the Just Who is never unjust"),
      difficulty: 3,
      questions: [
        { q: "What did they do when Allah alone was invoked?", a: "They disbelieved", wrong: ["They believed", "They wept", "They traveled"], why: "When Allah Alone was invoked, you disbelieved; but when partners were joined to Him, you believed!" },
        { q: "To whom does the judgment belong, in 40:12?", a: "To Allah, the Most High", wrong: ["To the idols", "To the people", "To the kings"], why: "So the judgement is only with Allah, the Most High, the Most Great!" },
        { tf: false, q: "Allah is sometimes unjust in His judgment.", why: "He is the Judge of His creation, the Just Who is never unjust." }
      ]
    },
    {
      slug: "rain-and-its-colors",
      title: "Rain and its colors",
      line: "Allah shows His signs and sends provision down from the sky.",
      facts: ["The provision is rain", "One water makes many fruits"],
      quote: q40(13),
      source: ik(13, "Ibn Kathir says the provision is rain, and though it is one kind of water, Allah makes from it crops and fruits of many colors and tastes.", "It is one kind of water, but by His great power He makes all these things different"),
      difficulty: 2,
      questions: [
        { q: "What provision comes from the sky, per Ibn Kathir?", a: "Rain", wrong: ["Gold", "Stones", "Snowmen"], why: "This refers to rain, through which crops and fruits are brought forth." },
        { q: "What does one kind of water bring, per Ibn Kathir?", a: "Fruits of many colors and tastes", wrong: ["Only one fruit", "Only sand", "Nothing"], why: "It is one kind of water, but by His great power He makes all these things different." },
        { q: "Who remembers, in 40:13?", a: "Those who turn in repentance", wrong: ["The proud", "The careless", "The busy"], why: "And none remembers but those who turn in repentance." }
      ]
    },
    {
      slug: "call-upon-allah-sincerely",
      title: "Call upon Allah sincerely",
      line: "Call upon Allah sincerely, even if the disbelievers dislike it.",
      facts: ["Worship and call on Allah alone", "The Prophet ﷺ said this after prayers"],
      quote: q40(14),
      source: hadith("muslim", "594", "Abdullah ibn Az-Zubair", "Sahih", "Ibn Az-Zubair said the Prophet ﷺ ended every prayer with: There is no god but Allah, to Whom we are sincere in devotion, even if the disbelievers dislike it.", "There is no god but Allah, to Whom we are sincere in devotion, even though the unbelievers should disapprove it"),
      difficulty: 2,
      questions: [
        { q: "How should we call upon Allah, in 40:14?", a: "Sincerely, for Him alone", wrong: ["Only when sad", "To show off", "Through idols"], why: "So, call you upon Allah making religion sincerely for Him, however much the disbelievers may hate." },
        { q: "When did the Prophet ﷺ say this dhikr, per Muslim 594?", a: "At the end of every prayer", wrong: ["Only at Eid", "Only in Ramadan", "Only at night"], why: "He uttered it at the end of every obligatory prayer." },
        { tf: true, q: "We stay sincere to Allah even if others dislike it.", why: "To Whom we are sincere in devotion, even though the unbelievers should disapprove it." }
      ]
    },
    {
      slug: "owner-of-high-ranks",
      title: "Owner of high ranks",
      line: "Allah is the Owner of high ranks and of the Throne.",
      facts: ["His Throne is above all creation", "He sends revelation to whom He wills"],
      quote: q40(15),
      source: ik(15, "Ibn Kathir says Allah's mighty Throne is raised above all His creation like a roof.", "His Mighty Throne is raised above all of His creation like a roof"),
      difficulty: 2,
      questions: [
        { q: "What does Allah own, in 40:15?", a: "High ranks and the Throne", wrong: ["Only the seas", "Only the hills", "Nothing high"], why: "Owner of high ranks and degrees, the Owner of the Throne." },
        { q: "Where is the Throne, per Ibn Kathir?", a: "Above all creation, like a roof", wrong: ["Under the earth", "In a city", "In the sea"], why: "His Mighty Throne is raised above all of His creation like a roof." },
        { q: "To whom does Allah send revelation, in 40:15?", a: "Any of His servants He wills", wrong: ["Anyone who asks", "Only kings", "Only the rich"], why: "He sends the revelation by His command to any of His servants He wills." }
      ]
    },
    {
      slug: "the-day-of-mutual-meeting",
      title: "The Day of Mutual Meeting",
      line: "The Day of Mutual Meeting is the Day of Resurrection.",
      facts: ["Everyone meets their deeds that Day", "Nothing of them is hidden from Allah"],
      quote: q40(15),
      source: ik(15, "Ibn Abbas said the Day of Mutual Meeting is a name of the Day of Resurrection, when everyone finds out about his deeds.", "That is the Day when everyone will find out about his deeds, good and bad"),
      difficulty: 2,
      questions: [
        { q: "What is the Day of Mutual Meeting, per Ibn Abbas?", a: "The Day of Resurrection", wrong: ["A market day", "A wedding", "A holiday"], why: "The Day of Mutual Meeting is one of the names of the Day of Resurrection." },
        { q: "What will everyone find out that Day?", a: "About their deeds, good and bad", wrong: ["Their future jobs", "Their old names", "The weather"], why: "That is the Day when everyone will find out about his deeds, good and bad." },
        { tf: true, q: "The revelation came to warn people of that Day.", why: "That he may warn of the Day of Mutual Meeting." }
      ]
    },
    {
      slug: "nothing-hidden-that-day",
      title: "Nothing hidden that Day",
      line: "On that Day they will come out, with nothing hidden from Allah.",
      facts: ["No shelter, shade or cover", "All is equally known to Him"],
      quote: q40(16),
      source: ik(16, "Ibn Kathir says they will all appear in the open, with nothing to shelter, shade or cover them.", "they will all appear in the open, with nothing to give them shelter or shade, or cover them"),
      difficulty: 2,
      questions: [
        { q: "What is hidden from Allah that Day, in 40:16?", a: "Nothing at all", wrong: ["Secrets", "Small deeds", "Dreams"], why: "The Day when they will come out, nothing of them will be hidden from Allah." },
        { q: "How will people appear, per Ibn Kathir?", a: "In the open, with no cover", wrong: ["Behind walls", "In houses", "Under trees"], why: "They will all appear in the open, with nothing to give them shelter or shade, or cover them." },
        { tf: true, q: "Allah knows all people equally well.", why: "Everything will be equally known to Him." }
      ]
    },
    {
      slug: "whose-is-the-kingdom",
      title: "Whose is the kingdom this Day?",
      line: "Whose is the kingdom this Day? Allah's, the Irresistible.",
      facts: ["All other kings are gone", "Allah alone remains"],
      quote: q40(16),
      source: ik(16, "Ibn Kathir says Allah will ask whose is the kingdom today, and answer Himself: Allah's, the One Who has subjugated all things.", "He is the Only One Who has subjugated all things"),
      difficulty: 3,
      questions: [
        { q: "Whose is the kingdom that Day, in 40:16?", a: "Allah's, the One, the Irresistible", wrong: ["The kings of earth", "The rich", "The strong armies"], why: "Whose is the kingdom this Day? It is Allah's, the One, the Irresistible!" },
        { q: "What does the Irresistible mean, per Ibn Kathir?", a: "He has subjugated all things", wrong: ["He sleeps", "He needs help", "He is far"], why: "He is the Only One Who has subjugated all things." },
        { tf: false, q: "Earthly kings keep their power on that Day.", why: "Allah says: where are the kings of the earth? Where are the tyrants?" }
      ]
    },
    {
      slug: "no-injustice-this-day",
      title: "No injustice this Day",
      line: "Every soul is paid for what it earned, with no injustice.",
      facts: ["Good deeds rewarded tenfold", "Allah forbade injustice for Himself"],
      quote: q40(17),
      source: hadith("muslim", "2577", "Abu Dharr", "Sahih", "Allah said: O My servants, I have forbidden injustice for Myself and made it forbidden among you, so do not wrong one another.", "I have forbidden oppression for Myself and have made it forbidden amongst you"),
      difficulty: 3,
      questions: [
        { q: "What will not happen that Day, in 40:17?", a: "Any injustice", wrong: ["Any reward", "Any reckoning", "Any meeting"], why: "This Day shall every person be recompensed for what he earned. This Day no injustice." },
        { q: "How much is a good deed rewarded, per Ibn Kathir?", a: "Tenfold", wrong: ["Half", "The same", "Not at all"], why: "For every good deed He gives a tenfold reward and for every bad deed He gives recompense of one bad deed." },
        { q: "What has Allah forbidden for Himself, per Muslim 2577?", a: "Injustice", wrong: ["Mercy", "Forgiveness", "Kindness"], why: "Allah said: O My servants, I have forbidden injustice for Myself, and made it unlawful for you." }
      ]
    },
    {
      slug: "swift-in-reckoning",
      title: "Swift in reckoning",
      line: "Allah is swift in reckoning.",
      facts: ["All creation judged like one person", "Like the twinkling of an eye"],
      quote: q40(17),
      source: ik(17, "Ibn Kathir says Allah will bring all His creation to account as if bringing just one person to account.", "He will bring all His creation to account as if He is bringing just one person to account"),
      difficulty: 3,
      questions: [
        { q: "How does Allah reckon all creation, per Ibn Kathir?", a: "As if it were one person", wrong: ["Over many years", "One by one, slowly", "Not at all"], why: "He will bring all His creation to account as if He is bringing just one person to account." },
        { tf: true, q: "Judging billions is easy for Allah.", why: "The creation of you all and the resurrection of you all are only as a single person (31:28)." },
        { q: "Which ayah does Ibn Kathir link with a twinkling of an eye?", a: "54:50", wrong: ["2:2", "1:5", "114:1"], why: "And Our commandment is but one as the twinkling of an eye (54:50)." }
      ]
    },
    {
      slug: "the-day-drawing-near",
      title: "The Day drawing near",
      line: "Warn them of the Day that is drawing near.",
      facts: ["A name of the Day of Judgement", "Hearts reach the throats in fear"],
      quote: q40(18),
      source: ik(18, "Ibn Kathir says the Day drawing near is a name of the Day of Judgement, called so because it is close.", "It is so called because it is close"),
      difficulty: 2,
      questions: [
        { q: "What is the Day drawing near, per Ibn Kathir?", a: "The Day of Judgement", wrong: ["Next Friday", "The new moon", "Harvest day"], why: "The Day that is drawing near is one of the names of the Day of Judgement." },
        { q: "Why is it called drawing near?", a: "Because it is close", wrong: ["Because it is far", "Because it is small", "Because it is old"], why: "It is so called because it is close." },
        { q: "What does Kazimin mean, per Ibn Kathir?", a: "Silent", wrong: ["Laughing", "Running", "Singing"], why: "Kazimin means silent, for no one will speak without His permission." }
      ]
    },
    {
      slug: "no-friend-no-intercessor",
      title: "No friend, no intercessor",
      line: "The wrongdoers will have no friend and no intercessor heard.",
      facts: ["Shirk is the wrong meant", "No relative can help them"],
      quote: q40(18),
      source: ik(18, "Ibn Kathir says those who associated others with Allah will have no relative to help and no intercessor to plead for them.", "will have no relative to help them and no intercessor who can plead on their behalf"),
      difficulty: 3,
      questions: [
        { q: "Who will have no friend or intercessor, in 40:18?", a: "The wrongdoers", wrong: ["The believers", "The patient", "The grateful"], why: "There will be no friend, nor an intercessor for the wrongdoers." },
        { q: "What wrong is meant, per Ibn Kathir?", a: "Associating others with Allah", wrong: ["Being poor", "Being young", "Being shy"], why: "Those who wronged themselves by associating others in worship with Allah." },
        { tf: false, q: "A relative can rescue a person who worshipped idols.", why: "They will have no relative to help them and no intercessor who can plead on their behalf." }
      ]
    },
    {
      slug: "the-fraud-of-the-eyes",
      title: "The fraud of the eyes",
      line: "Allah knows the stealing glance and what hearts conceal.",
      facts: ["He sees what eyes look at", "So we feel shy before Allah"],
      quote: q40(19),
      source: ik(19, "Ibn Kathir says Allah knows all things great and small, so people feel a proper shyness before Him and remember that He sees them.", "they will have the proper sense of shyness before Allah"),
      difficulty: 3,
      questions: [
        { q: "What does Allah know, in 40:19?", a: "The fraud of the eyes and hidden thoughts", wrong: ["Only open deeds", "Only words", "Only big sins"], why: "Allah knows the fraud of the eyes, and all that the breasts conceal." },
        { q: "What feeling should this bring, per Ibn Kathir?", a: "Shyness before Allah", wrong: ["Pride", "Boredom", "Carelessness"], why: "So that they will have the proper sense of shyness before Allah." },
        { q: "What is one fraud of the eyes, per Ad-Dahhak?", a: "Saying you saw what you did not", wrong: ["Closing them to sleep", "Crying from joy", "Reading slowly"], why: "A man saying that he has seen something when he has not seen it." }
      ]
    },
    {
      slug: "allah-judges-with-truth",
      title: "Allah judges with truth",
      line: "Allah judges with truth; their idols cannot judge anything.",
      facts: ["He rewards good with good", "He hears and sees all"],
      quote: q40(20),
      source: ik(20, "Ibn Abbas said this means Allah is able to reward the good with good and the evil with evil.", "He is able to reward those who do good with good and those who do evil with evil"),
      difficulty: 2,
      questions: [
        { q: "How does Allah judge, in 40:20?", a: "With truth", wrong: ["With guesses", "With favoritism", "Not at all"], why: "And Allah judges with truth." },
        { q: "What can the idols judge, in 40:20?", a: "Nothing", wrong: ["Small matters", "Their own followers", "The weather"], why: "Those to whom they invoke besides Him, cannot judge anything." },
        { q: "Which two names end 40:20?", a: "The All-Hearer, the All-Seer", wrong: ["The First, the Last", "The Rich, the Praised", "The King, the Holy"], why: "Certainly, Allah! He is the All-Hearer, the All-Seer." }
      ]
    }
  ]
};

/** Ayahs 21 to 40: the end of past nations, Musa and Fir'awn, and the believing man of Fir'awn's family. */
const GHAFIR_TWO: DeepUnit = {
  key: "ghafir2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-40",
  name: "Ghafir, ayahs 21 to 40",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ghafir",
  lessons: [
    {
      slug: "travel-and-see",
      title: "Travel and see",
      line: "Have they not traveled and seen how past nations ended?",
      facts: ["Past nations were stronger", "They left great buildings behind"],
      quote: q40(21),
      source: ik(21, "Ibn Kathir says past nations left structures, buildings and dwellings that Quraysh could not match, yet Allah punished them.", "such as structures, buildings and dwellings"),
      difficulty: 2,
      questions: [
        { q: "What should they look at, in 40:21?", a: "The end of those before them", wrong: ["The stars only", "Their own riches", "The markets"], why: "Have they not traveled in the land and seen what was the end of those who were before them?" },
        { q: "What traces did past nations leave, per Ibn Kathir?", a: "Buildings and dwellings", wrong: ["Nothing at all", "Only songs", "Only books"], why: "They left behind traces in the earth, such as structures, buildings and dwellings." },
        { tf: false, q: "Their great strength protected them from Allah.", why: "And none had they to protect them from Allah." }
      ]
    },
    {
      slug: "messengers-with-clear-evidence",
      title: "Messengers with clear evidence",
      line: "Messengers came with clear proofs, but they disbelieved.",
      facts: ["The proofs were definite", "Allah is All-Strong"],
      quote: q40(22),
      source: ik(22, "Ibn Kathir says the Messengers came with clear proof and definite evidence, yet the people rejected the Message.", "despite all these signs, they disbelieved and rejected the Message"),
      difficulty: 2,
      questions: [
        { q: "What did the Messengers bring, in 40:22?", a: "Clear evidences", wrong: ["Gold", "Armies", "Poems"], why: "There came to them their Messengers with clear evidences but they disbelieved." },
        { q: "Why were these nations seized, per Ibn Kathir?", a: "They rejected the Message", wrong: ["They were poor", "They were few", "By chance"], why: "Despite all these signs, they disbelieved and rejected the Message." },
        { q: "Which names of Allah end 40:22?", a: "All-Strong, Severe in punishment", wrong: ["Most Kind, Most Gentle", "The First, the Last", "The King, the Holy"], why: "Verily, He is All-Strong, Severe in punishment." }
      ]
    },
    {
      slug: "musa-with-our-signs",
      title: "Musa with Our signs",
      line: "Allah sent Musa with signs and a clear authority.",
      facts: ["Authority means proof", "This comforted the Prophet ﷺ"],
      quote: q40(23),
      source: ik(23, "Ibn Kathir says Allah comforted the Prophet ﷺ with the story of Musa, and that authority means proof and evidence.", "Authority means proof and evidence"),
      difficulty: 1,
      questions: [
        { q: "Whom did Allah send in 40:23?", a: "Musa", wrong: ["Nuh", "Isa", "Yunus"], why: "And indeed We sent Musa with Our Ayat, and a manifest authority." },
        { q: "What does authority mean, per Ibn Kathir?", a: "Proof and evidence", wrong: ["An army", "A palace", "A crown"], why: "Authority means proof and evidence." },
        { tf: true, q: "Musa's story gave comfort to the Prophet ﷺ.", why: "Allah consoles His Prophet Muhammad ﷺ for the disbelief of his people." }
      ]
    },
    {
      slug: "firawn-haman-and-qarun",
      title: "Fir'awn, Haman and Qarun",
      line: "Musa was sent to Fir'awn, Haman and Qarun.",
      facts: ["Haman was the adviser", "Qarun was the richest trader"],
      quote: q40(24),
      source: ik(24, "Ibn Kathir says Fir'awn was king of the Copts of Egypt, Haman his adviser, and Qarun the richest trader of his time.", "who was the richest trader among the people of his time"),
      difficulty: 2,
      questions: [
        { q: "Who was Haman, per Ibn Kathir?", a: "Fir'awn's adviser", wrong: ["A Prophet", "A farmer", "A fisherman"], why: "Haman, who was his adviser." },
        { q: "Who was Qarun, per Ibn Kathir?", a: "The richest trader of his time", wrong: ["A poor shepherd", "A soldier", "A Prophet"], why: "Qarun, who was the richest trader among the people of his time." },
        { q: "What did they call Musa, in 40:24?", a: "A sorcerer, a liar", wrong: ["A king", "A friend", "A teacher"], why: "But they called him: A sorcerer, a liar!" }
      ]
    },
    {
      slug: "plots-in-vain",
      title: "Plots in vain",
      line: "The plots of the disbelievers are nothing but in vain.",
      facts: ["Fir'awn made a second harsh order", "His plan was doomed to fail"],
      quote: q40(25),
      source: ik(25, "Ibn Kathir says their schemes to reduce the Children of Israel were doomed to failure.", "were doomed to failure"),
      difficulty: 2,
      questions: [
        { q: "What happens to the plots of disbelievers, in 40:25?", a: "They come to nothing", wrong: ["They always win", "They grow stronger", "They last forever"], why: "But the plots of disbelievers are nothing but in vain!" },
        { q: "Whom did Fir'awn want to weaken, per Ibn Kathir?", a: "The Children of Israel", wrong: ["His own army", "The Romans", "The traders"], why: "Their schemes and intentions to reduce the numbers of the Children of Israel were doomed to failure." },
        { tf: true, q: "Fir'awn gave this harsh order twice.", why: "This was a second command from Fir'awn. Qatadah said, this was one command after another." }
      ]
    },
    {
      slug: "leave-me-to-deal-with-musa",
      title: "Leave me to deal with Musa",
      line: "Fir'awn said: let him call his Lord; I do not care.",
      facts: ["Fir'awn was stubborn and proud", "He claimed Musa caused mischief"],
      quote: q40(26),
      source: ik(26, "Ibn Kathir says Fir'awn's words, let him call his Lord, mean I do not care, the height of stubbornness.", "This is the utmost in offensive stubbornness"),
      difficulty: 2,
      questions: [
        { q: "What did Fir'awn say about Musa's Lord, in 40:26?", a: "Let him call his Lord", wrong: ["I believe in Him", "I fear Him", "Teach me of Him"], why: "Leave me to kill Musa, and let him call his Lord!" },
        { q: "What did Fir'awn claim to fear, in 40:26?", a: "Musa changing their religion", wrong: ["Losing his crown to Haman", "A flood", "A famine"], why: "I fear that he may change your religion, or that he may cause mischief to appear in the land!" },
        { q: "What does Ibn Kathir call Fir'awn's words?", a: "The utmost stubbornness", wrong: ["Wisdom", "Kindness", "Humility"], why: "This is the utmost in offensive stubbornness." }
      ]
    },
    {
      slug: "musa-seeks-refuge",
      title: "Musa seeks refuge",
      line: "Musa sought refuge in his Lord from every arrogant one.",
      facts: ["Arrogant: those who deny the Reckoning", "Seek Allah's protection from harm"],
      quote: q40(27),
      source: ik(27, "Ibn Kathir says Musa sought refuge and protection with Allah from the evil of Fir'awn and those like him.", "I seek refuge and protection with Allah from his evil and the evil of those like him"),
      difficulty: 2,
      questions: [
        { q: "In whom did Musa seek refuge, in 40:27?", a: "My Lord and your Lord", wrong: ["Fir'awn", "Haman", "His army"], why: "Verily, I seek refuge in my Lord and your Lord." },
        { q: "From whom did Musa seek refuge?", a: "Every arrogant who denies the Reckoning", wrong: ["The poor", "The children", "The believers"], why: "From every arrogant who believes not in the Day of Reckoning!" },
        { tf: true, q: "When we fear harm, we turn to Allah for protection.", why: "Musa said: I seek refuge and protection with Allah from his evil." }
      ]
    },
    {
      slug: "a-believing-man-of-firawns-family",
      title: "A believing man of Fir'awn's family",
      line: "A man of Fir'awn's family hid his faith, then spoke up.",
      facts: ["He was an Egyptian of Fir'awn's family", "He spoke a just word to a ruler"],
      quote: q40(28),
      source: ik(28, "Ibn Kathir says this man hid his faith from his people and only showed it on the day Fir'awn said he would go after Musa.", "This man concealed his Faith from his people"),
      difficulty: 2,
      questions: [
        { q: "Who spoke up in 40:28?", a: "A believing man of Fir'awn's family", wrong: ["Haman", "Qarun", "A magician"], why: "And a believing man of Fir'awn's family, who hid his Faith said." },
        { q: "What had this man kept hidden?", a: "His faith", wrong: ["His wealth", "His name", "His sword"], why: "This man concealed his Faith from his people, the Egyptians." },
        { q: "What is the best jihad, per the hadith Ibn Kathir cites?", a: "A just word before an unjust ruler", wrong: ["Buying a horse", "Building a tower", "Keeping silent"], why: "The best of Jihad is to speak a just word before an unjust ruler." }
      ]
    },
    {
      slug: "because-he-says-my-lord-is-allah",
      title: "Because he says my Lord is Allah",
      line: "Would you harm a man because he says: My Lord is Allah?",
      facts: ["Abu Bakr said these same words", "He defended the Prophet ﷺ at the Kabah"],
      quote: q40(28),
      source: hadith("bukhari", "4815", "Abdullah ibn Amr", "Sahih", "When a man seized the Prophet ﷺ while he prayed at the Kabah, Abu Bakr pushed him away and recited the words of 40:28.", "and has come to you with clear Signs from your Lord"),
      difficulty: 3,
      questions: [
        { q: "Who said the words of 40:28 to defend the Prophet ﷺ?", a: "Abu Bakr", wrong: ["Umar", "Uthman", "Bilal"], why: "Abu Bakr came and seized Uqba's shoulder and said, Would you kill a man because he says: My Lord is Allah?" },
        { q: "Where was the Prophet ﷺ when this happened?", a: "Praying at the Kabah", wrong: ["In the market", "At home", "On a journey"], why: "While Allah's Messenger ﷺ was praying in the courtyard of the Kaba." },
        { tf: true, q: "Saying My Lord is Allah is no crime.", why: "Would you kill a man because he says: My Lord is Allah, and has come to you with clear Signs?" }
      ]
    },
    {
      slug: "if-he-is-a-liar",
      title: "If he is a liar",
      line: "If he lies, that is his sin; if true, his warning comes.",
      facts: ["Common sense: leave him alone", "Allah guides not a liar"],
      quote: q40(28),
      source: ik(28, "Ibn Kathir explains: if you do not believe him, it is only common sense to leave him alone and not harm him.", "it is only common sense to leave him alone and not harm him"),
      difficulty: 3,
      questions: [
        { q: "If Musa lied, on whom is the sin, in 40:28?", a: "On him", wrong: ["On Fir'awn", "On the people", "On no one"], why: "And if he is a liar, upon him will be the sin of his lie." },
        { q: "What was the man's sensible advice, per Ibn Kathir?", a: "Leave him alone, do not harm him", wrong: ["Jail him", "Banish him", "Mock him"], why: "It is only common sense to leave him alone and not harm him." },
        { q: "Whom does Allah not guide, in 40:28?", a: "A transgressor, a liar", wrong: ["The truthful", "The patient", "The humble"], why: "Verily, Allah guides not one who is a transgressor, a liar!" }
      ]
    },
    {
      slug: "yours-is-the-kingdom-today",
      title: "Yours is the kingdom today",
      line: "You rule today, but who will save us from Allah's punishment?",
      facts: ["Thank Allah for power", "Armies cannot stop Allah's decree"],
      quote: q40(29),
      source: ik(29, "Ibn Kathir says the believer urged them to protect their blessing of power by thanking Allah and believing in His Messenger.", "so take care of this blessing by giving thanks to Allah and believing in his Messenger"),
      difficulty: 3,
      questions: [
        { q: "What did the believer remind them of, in 40:29?", a: "Their kingdom today", wrong: ["Their debts", "Their old games", "Their crops"], why: "O my people! Yours is the kingdom today, you being dominant in the land." },
        { q: "How should they keep the blessing, per Ibn Kathir?", a: "By thanking Allah and believing", wrong: ["By building towers", "By more armies", "By hiding gold"], why: "So take care of this blessing by giving thanks to Allah and believing in his Messenger." },
        { tf: false, q: "Soldiers can protect a people from Allah's punishment.", why: "These soldiers and troops will not avail you anything and will not ward off the punishment of Allah." }
      ]
    },
    {
      slug: "fir-awns-false-guidance",
      title: "Fir'awn's false guidance",
      line: "Fir'awn said: I guide you only to the right path. He lied.",
      facts: ["Fir'awn knew Musa was truthful", "He cheated his people"],
      quote: q40(29),
      source: ik(29, "Ibn Kathir says Fir'awn lied, because he knew Musa was telling the truth about his Message.", "because he knew that Musa was telling the truth concerning the Message"),
      difficulty: 3,
      questions: [
        { q: "What did Fir'awn claim, in 40:29?", a: "I guide you only to the right path", wrong: ["I am unsure", "Follow Musa", "Ask the believer"], why: "I show you only that which I see, and I guide you only to the path of right policy!" },
        { q: "Did Fir'awn believe his own words, per Ibn Kathir?", a: "No, he knew Musa was truthful", wrong: ["Yes, fully", "He never thought of it", "He was asleep"], why: "But Fir'awn lied, because he knew that Musa was telling the truth." },
        { tf: true, q: "A leader who cheats his people is in great danger.", why: "Ibn Kathir cites: no leader who dies having cheated his people will smell the fragrance of Paradise." }
      ]
    },
    {
      slug: "the-end-of-the-groups-of-old",
      title: "The end of the groups of old",
      line: "I fear for you an end like the nations of old.",
      facts: ["Nuh, Ad and Thamud were destroyed", "Allah wills no injustice"],
      quote: q40(30),
      source: ik(30, "Ibn Kathir says the believer meant the earlier nations who disbelieved, like the people of Nuh, Ad and Thamud.", "those of the earlier nations who disbelieved the Messengers of Allah"),
      difficulty: 2,
      questions: [
        { q: "What did the believer fear for his people, in 40:30?", a: "An end like the old nations", wrong: ["A poor harvest", "A long journey", "Bad weather"], why: "Verily, I fear for you an end like that day of disaster of the groups of old!" },
        { q: "Which groups were meant, per Ibn Kathir?", a: "Earlier nations who denied Messengers", wrong: ["Traders", "Farmers", "Sailors"], why: "Those of the earlier nations who disbelieved the Messengers of Allah." },
        { tf: true, q: "Each nation had no one to protect it from Allah.", why: "They had no one to protect them or ward off that punishment." }
      ]
    },
    {
      slug: "nuh-ad-and-thamud",
      title: "Nuh, Ad and Thamud",
      line: "Like the people of Nuh, Ad and Thamud, and those after them.",
      facts: ["They were punished for their sins", "Allah wants no injustice for anyone"],
      quote: q40(31),
      source: ik(31, "Ibn Kathir says Allah destroyed them for their sins and their rejection of His Messengers.", "Allah destroyed them for their sins and for their disbelief in and rejection of His Messengers"),
      difficulty: 2,
      questions: [
        { q: "Which nations are named in 40:31?", a: "Nuh, Ad and Thamud", wrong: ["Rome and Persia", "Egypt and Sheba", "Madyan only"], why: "Like the end of the people of Nuh, and Ad, and Thamud and those who came after them." },
        { q: "What does Allah not will for His servants, in 40:31?", a: "Injustice", wrong: ["Mercy", "Guidance", "Rain"], why: "And Allah wills no injustice for His servants." },
        { q: "Why were they destroyed, per Ibn Kathir?", a: "Their sins and rejecting Messengers", wrong: ["Their poverty", "Bad luck", "Old age"], why: "Allah destroyed them for their sins and for their disbelief in and rejection of His Messengers." }
      ]
    },
    {
      slug: "the-day-of-mutual-calling",
      title: "The Day of mutual calling",
      line: "I fear for you the Day when people call to each other.",
      facts: ["That Day is the Day of Resurrection", "There is no refuge but Allah"],
      quote: q40(32),
      source: ik(32, "Ibn Kathir says the Day of mutual calling is the Day of Resurrection.", "meaning, the Day of Resurrection"),
      difficulty: 2,
      questions: [
        { q: "What Day did the believer fear, in 40:32?", a: "The Day of mutual calling", wrong: ["Market day", "A wedding day", "A festival"], why: "Verily, I fear for you the Day when there will be mutual calling." },
        { q: "What is that Day, per Ibn Kathir?", a: "The Day of Resurrection", wrong: ["A war", "A storm", "A trial in court"], why: "Meaning, the Day of Resurrection." },
        { tf: true, q: "The believer warned of the Hereafter, not only this world.", why: "He warned his people of the punishment of Allah in this world and the Hereafter." }
      ]
    },
    {
      slug: "no-protector-from-allah",
      title: "No protector from Allah",
      line: "They will turn and flee, with no protector from Allah.",
      facts: ["No refuge that Day", "Only Allah guides"],
      quote: q40(33),
      source: ik(33, "Ibn Kathir says whomever Allah sends astray will have no other guide except Him.", "whomever Allah sends astray will have no other guide except Him"),
      difficulty: 2,
      questions: [
        { q: "What will they do that Day, in 40:33?", a: "Turn their backs and flee", wrong: ["Sit and rest", "Laugh", "Trade"], why: "A Day when you will turn your backs and flee having no protector from Allah." },
        { q: "Who can guide one Allah sends astray?", a: "No one but Allah", wrong: ["A king", "A friend", "A rich man"], why: "Whomever Allah sends astray will have no other guide except Him." },
        { q: "Which ayah does Ibn Kathir link: No refuge?", a: "75:11-12", wrong: ["2:255", "1:1", "112:1"], why: "No! There is no refuge! Unto your Lord will be the place of rest that Day (75:11-12)." }
      ]
    },
    {
      slug: "yusuf-came-before",
      title: "Yusuf came before",
      line: "Yusuf came to Egypt with clear signs, but they kept doubting.",
      facts: ["Yusuf was a Messenger in Egypt", "They obeyed him only in worldly matters"],
      quote: q40(34),
      source: ik(34, "Ibn Kathir says Yusuf called the people of Egypt to Allah, but they obeyed him only in worldly matters of government.", "they only obeyed him in worldly matters that pertained to his position in the government"),
      difficulty: 3,
      questions: [
        { q: "Which Prophet came to Egypt before Musa, in 40:34?", a: "Yusuf", wrong: ["Ibrahim", "Isa", "Dawud"], why: "And indeed Yusuf did come to you, in times gone by, with clear signs." },
        { q: "In what did the Egyptians obey Yusuf, per Ibn Kathir?", a: "Only worldly matters", wrong: ["Only worship", "Everything", "Nothing"], why: "They only obeyed him in worldly matters that pertained to his position in the government." },
        { q: "What did they say when Yusuf died?", a: "No Messenger will come after him", wrong: ["Let us follow him", "He will return", "Choose a new king"], why: "Till when he died, you said: No Messenger will Allah send after him." }
      ]
    },
    {
      slug: "arguing-without-proof",
      title: "Arguing without proof",
      line: "Disputing Allah's signs with no proof is hateful to Allah.",
      facts: ["Believers dislike it too", "Allah seals proud hearts"],
      quote: q40(35),
      source: ik(35, "Ibn Kathir says those who dispute the proof without evidence from Allah earn His utmost loathing, and Allah seals such hearts.", "Allah will put a seal on his heart so that after that he will not acknowledge anything good"),
      difficulty: 3,
      questions: [
        { q: "How do they dispute, in 40:35?", a: "Without any authority", wrong: ["With clear proof", "With kindness", "In silence"], why: "Those who dispute about the Ayat of Allah, without any authority that has come to them." },
        { q: "Whose hearts does Allah seal, in 40:35?", a: "Every arrogant tyrant", wrong: ["The humble", "The children", "The repentant"], why: "Thus does Allah seal up the heart of every arrogant, tyrant." },
        { tf: true, q: "A sealed heart stops seeing good as good.", why: "Allah will put a seal on his heart so that after that he will not acknowledge anything good or denounce anything evil." }
      ]
    },
    {
      slug: "build-me-a-tower",
      title: "Build me a tower",
      line: "Fir'awn told Haman to build a tall tower to mock Musa.",
      facts: ["Made of baked clay bricks", "He wanted to fool his people"],
      quote: q40(36),
      source: ik(36, "Ibn Kathir says Fir'awn ordered Haman to build a tall, strong fortress of baked clay bricks.", "He built it of bricks made from baked clay"),
      difficulty: 2,
      questions: [
        { q: "What did Fir'awn ask Haman to build, in 40:36?", a: "A tower", wrong: ["A ship", "A bridge", "A wall"], why: "Fir'awn said: O Haman! Build me a tower." },
        { q: "What was it made of, per Ibn Kathir?", a: "Bricks of baked clay", wrong: ["Gold", "Ice", "Wood only"], why: "He built it of bricks made from baked clay." },
        { q: "What ways did Fir'awn want to reach?", a: "The ways of the heavens", wrong: ["The sea roads", "The desert paths", "The mines"], why: "That I may arrive at the ways, the ways of the heavens." }
      ]
    },
    {
      slug: "the-plot-of-firawn",
      title: "The plot of Fir'awn",
      line: "Fir'awn's plot led to nothing but loss.",
      facts: ["His evil deeds looked fair to him", "Ibn Abbas: nothing but ruin"],
      quote: q40(37),
      source: ik(37, "Ibn Abbas and Mujahid said the plot of Fir'awn led to nothing but ruin.", "Meaning nothing but ruin"),
      difficulty: 2,
      questions: [
        { q: "What did Fir'awn think of Musa, in 40:37?", a: "That he was a liar", wrong: ["That he was wise", "That he was a king", "That he was a friend"], why: "And I may look upon the God of Musa, but verily, I think him to be a liar." },
        { q: "What did his plot lead to, per Ibn Abbas?", a: "Nothing but ruin", wrong: ["Great success", "A new city", "A long life"], why: "Ibn Abbas and Mujahid said: Meaning nothing but ruin." },
        { tf: true, q: "Fir'awn's evil deeds were made to seem good to him.", why: "Thus it was made fair seeming, in Fir'awn's eyes, the evil of his deeds." }
      ]
    },
    {
      slug: "follow-me-to-the-right-way",
      title: "Follow me to the right way",
      line: "Follow me, I will guide you to the way of right conduct.",
      facts: ["The true call to right conduct", "Fir'awn's call was false"],
      quote: q40(38),
      source: ik(38, "Ibn Kathir says the believer's call to right conduct was in contrast to the false claim of Fir'awn.", "Follow me, I will guide you to the way of right conduct"),
      difficulty: 2,
      questions: [
        { q: "What did the believer offer, in 40:38?", a: "To guide them to right conduct", wrong: ["Gold and silver", "A new king", "A strong army"], why: "O my people! Follow me, I will guide you to the way of right conduct." },
        { q: "Whose claim was false, per Ibn Kathir?", a: "Fir'awn's", wrong: ["The believer's", "Musa's", "Yusuf's"], why: "This is in contrast to the false claim of Fir'awn." },
        { tf: false, q: "Fir'awn and the believer called to the same path.", why: "The believer's call was in contrast to the false claim of Fir'awn." }
      ]
    },
    {
      slug: "the-home-that-remains",
      title: "The home that remains",
      line: "This life is brief; the Hereafter is the lasting home.",
      facts: ["This world is fleeting", "The Hereafter never ends"],
      quote: q40(39),
      source: ik(39, "Ibn Kathir says this world is small and fleeting, and the Hereafter is an abode with no end and no departure.", "it is insignificant and fleeting, and soon it will diminish and pass away"),
      difficulty: 2,
      questions: [
        { q: "What is this worldly life, in 40:39?", a: "Only an enjoyment", wrong: ["The final home", "Forever", "Everything"], why: "Truly, this life of the world is nothing but an enjoyment." },
        { q: "What is the Hereafter, in 40:39?", a: "The home that remains forever", wrong: ["A short stop", "A dream", "A market"], why: "And verily, the Hereafter that is the home that will remain forever." },
        { q: "How does Ibn Kathir describe this world?", a: "Small and fleeting", wrong: ["Endless", "Perfect", "Unchanging"], why: "It is insignificant and fleeting, and soon it will diminish and pass away." }
      ]
    },
    {
      slug: "reward-without-limit",
      title: "Reward without limit",
      line: "Believers who do good, male or female, enter Paradise.",
      facts: ["An evil deed is paid with its like", "Good is rewarded without limit"],
      quote: q40(40),
      source: ik(40, "Ibn Kathir says the reward cannot be counted; Allah gives an immense reward without end.", "Allah will give an immense reward without end"),
      difficulty: 2,
      questions: [
        { q: "How is an evil deed paid back, in 40:40?", a: "Only with its like", wrong: ["Tenfold", "Never", "With a gift"], why: "Whoever does an evil deed, will not be requited except the like thereof." },
        { q: "Who enters Paradise, in 40:40?", a: "Believers doing good, male or female", wrong: ["Only men", "Only the rich", "Only scholars"], why: "Whosoever does a righteous deed, whether male or female and is a true believer, such will enter Paradise." },
        { q: "How are they provided in Paradise?", a: "Without limit", wrong: ["A little", "Once a year", "Only water"], why: "Where they will be provided therein without limit." }
      ]
    }
  ]
};

/** Ayahs 41 to 60: the believer's last words, the people of Fir'awn, victory for the Messengers, and Call upon Me. */
const GHAFIR_THREE: DeepUnit = {
  key: "ghafir3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-40",
  name: "Ghafir, ayahs 41 to 60",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ghafir",
  lessons: [
    {
      slug: "i-call-you-to-salvation",
      title: "I call you to salvation",
      line: "I call you to salvation, while you call me to the Fire.",
      facts: ["Salvation is worshipping Allah alone", "And believing in His Messenger"],
      quote: q40(41),
      source: ik(41, "Ibn Kathir says the salvation the believer called to is the worship of Allah alone and belief in His Messenger.", "which is the worship of Allah alone with no partner or associate"),
      difficulty: 2,
      questions: [
        { q: "To what did the believer call his people, in 40:41?", a: "To salvation", wrong: ["To war", "To wealth", "To the tower"], why: "How is it that I call you to salvation while you call me to the Fire!" },
        { q: "What is that salvation, per Ibn Kathir?", a: "Worshipping Allah alone", wrong: ["Obeying Fir'awn", "Building towers", "Gaining land"], why: "Salvation, which is the worship of Allah alone with no partner or associate." },
        { tf: false, q: "Both sides called to the same thing.", why: "I call you to salvation while you call me to the Fire!" }
      ]
    },
    {
      slug: "the-almighty-the-oft-forgiving",
      title: "The Almighty, the Oft-Forgiving",
      line: "I invite you to the Almighty, the Oft-Forgiving.",
      facts: ["Shirk is built on no knowledge", "His might joins His forgiveness"],
      quote: q40(42),
      source: ik(42, "Ibn Kathir says with all His might and pride, Allah still forgives the one who repents to Him.", "with all His might and pride, He still forgives the sin of the one who repents to Him"),
      difficulty: 2,
      questions: [
        { q: "To whom did the believer invite them, in 40:42?", a: "The Almighty, the Oft-Forgiving", wrong: ["The idols", "Fir'awn", "Haman"], why: "And I invite you to the Almighty, the Oft-Forgiving!" },
        { q: "On what is shirk based, per Ibn Kathir?", a: "Ignorance, with no proof", wrong: ["Clear proof", "Revelation", "Wisdom"], why: "On the basis of ignorance, with no proof or evidence." },
        { tf: true, q: "Allah is Almighty and still forgives those who repent.", why: "With all His might and pride, He still forgives the sin of the one who repents to Him." }
      ]
    },
    {
      slug: "idols-have-no-claim",
      title: "Idols have no claim",
      line: "The idols have no claim in this world or in the Hereafter.",
      facts: ["They cannot benefit or harm", "Our return is to Allah"],
      quote: q40(43),
      source: ik(43, "Qatadah said the idols possess no power either to benefit or to harm.", "idols possess no power either to benefit or to harm"),
      difficulty: 2,
      questions: [
        { q: "What claim do the idols have, in 40:43?", a: "None, in this world or the next", wrong: ["A small one", "Only in this world", "A great one"], why: "You call me to one that does not have a claim in this world or in the Hereafter." },
        { q: "What power do idols have, per Qatadah?", a: "No power to benefit or harm", wrong: ["Power over rain", "Power over health", "Some power"], why: "Idols possess no power either to benefit or to harm." },
        { q: "To whom is our return, in 40:43?", a: "To Allah", wrong: ["To the idols", "To Fir'awn", "To the earth only"], why: "And our return will be to Allah." }
      ]
    },
    {
      slug: "i-leave-my-affair-to-allah",
      title: "I leave my affair to Allah",
      line: "You will remember my words; I leave my affair to Allah.",
      facts: ["He put his trust in Allah", "Allah sees all His servants"],
      quote: q40(44),
      source: ik(44, "Ibn Kathir explains the believer's words: I put my trust in Allah and seek His help.", "I put my trust in Allah and seek His help"),
      difficulty: 2,
      questions: [
        { q: "To whom did he leave his affair, in 40:44?", a: "To Allah", wrong: ["To Musa", "To his family", "To the king"], why: "And my affair I leave it to Allah." },
        { q: "What does leaving it to Allah mean, per Ibn Kathir?", a: "Trusting Allah and seeking His help", wrong: ["Giving up", "Running away", "Staying silent"], why: "I put my trust in Allah and seek His help." },
        { q: "What name of Allah ends 40:44?", a: "The All-Seer of His servants", wrong: ["The Bestower", "The First", "The Light"], why: "Verily, Allah is the All-Seer of His servants." }
      ]
    },
    {
      slug: "allah-saved-him",
      title: "Allah saved him",
      line: "Allah saved the believer from the evils they plotted.",
      facts: ["Saved with Musa in this world", "And to Paradise in the Hereafter"],
      quote: q40(45),
      source: ik(45, "Ibn Kathir says Allah saved him in this world along with Musa, and in the Hereafter will admit him to Paradise.", "in this world, Allah saved him along with Musa"),
      difficulty: 2,
      questions: [
        { q: "What did Allah do for the believer, in 40:45?", a: "Saved him from their plots", wrong: ["Left him alone", "Made him king", "Sent him away"], why: "So, Allah saved him from the evils that they plotted against him." },
        { q: "With whom was he saved, per Ibn Kathir?", a: "With Musa", wrong: ["With Haman", "With Qarun", "With Fir'awn"], why: "In this world, Allah saved him along with Musa." },
        { q: "What happened to Fir'awn's people, per Ibn Kathir?", a: "They drowned in the sea", wrong: ["They became rich", "They moved away", "They won"], why: "This refers to drowning in the sea." }
      ]
    },
    {
      slug: "morning-and-evening",
      title: "Morning and evening",
      line: "The people of Fir'awn are shown the Fire morning and evening.",
      facts: ["This happens before the Last Day", "A proof of life in the grave"],
      quote: q40(46),
      source: ik(46, "Ibn Kathir says this ayah is one of the major proofs used by Ahlus-Sunnah that there is punishment in the grave, in Al-Barzakh.", "This Ayah contains one of the major proofs used by the Ahlus-Sunnah"),
      difficulty: 3,
      questions: [
        { q: "When are they shown the Fire, in 40:46?", a: "Morning and afternoon", wrong: ["Only once", "Only at night", "Never"], why: "The Fire, they are exposed to it, morning and afternoon." },
        { q: "What is Al-Barzakh?", a: "The time between death and Resurrection", wrong: ["A city", "A river", "A mountain"], why: "Ibn Kathir uses this ayah for the period of Al-Barzakh, before the Day of Resurrection." },
        { tf: true, q: "Ahlus-Sunnah use 40:46 to prove life in the grave.", why: "This Ayah contains one of the major proofs used by the Ahlus-Sunnah." }
      ]
    },
    {
      slug: "shown-his-place",
      title: "Shown his place",
      line: "After death, each person sees their place morning and evening.",
      facts: ["The people of Paradise see their place", "Until the Day of Resurrection"],
      quote: q40(46),
      source: hadith("bukhari", "1379", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ said when one of you dies, he is shown his place morning and evening until Allah raises him on the Day of Resurrection.", "When anyone of you dies, he is shown his place both in the morning and in the evening"),
      difficulty: 3,
      questions: [
        { q: "What is shown after death, per Bukhari 1379?", a: "One's place, morning and evening", wrong: ["Old friends", "One's house", "Nothing"], why: "When anyone of you dies, he is shown his place both in the morning and in the evening." },
        { q: "Until when, per Bukhari 1379?", a: "The Day of Resurrection", wrong: ["One week", "One year", "Forever in the grave"], why: "This is your place till Allah resurrect you on the Day of Resurrection." },
        { tf: true, q: "The people of Paradise are shown their place in Paradise.", why: "If he is one of the people of Paradise, he is shown his place in it." }
      ]
    },
    {
      slug: "the-weak-and-the-arrogant",
      title: "The weak and the arrogant",
      line: "Followers will ask proud leaders to carry some of their load.",
      facts: ["The leaders cannot help", "Each carries his own load"],
      quote: q40(47),
      source: ik(47, "Ibn Kathir says the followers will ask the leaders whether they can carry a part of their burden for them.", "can you carry a part of our burden for us"),
      difficulty: 3,
      questions: [
        { q: "Whom did the weak follow, in 40:47?", a: "Those who were arrogant", wrong: ["The Prophets", "The believers", "The angels"], why: "The weak will say to those who were arrogant: Verily, we followed you." },
        { q: "What do the followers ask, per Ibn Kathir?", a: "To carry part of their burden", wrong: ["To give them gold", "To make them leaders", "To forget them"], why: "Can you carry a part of our burden for us?" },
        { tf: false, q: "Following proud leaders is a good excuse on that Day.", why: "The leaders will say: we will not bear any part of your burden for you." }
      ]
    },
    {
      slug: "we-are-all-in-it",
      title: "We are all in it",
      line: "The proud will say: We are all in it; Allah has judged.",
      facts: ["No one carries another's load", "Allah judged with justice"],
      quote: q40(48),
      source: ik(48, "Ibn Kathir explains the leaders' answer: we will not bear any part of your burden; our own is enough.", "we will not bear any part of your burden for you"),
      difficulty: 3,
      questions: [
        { q: "What will the arrogant answer, in 40:48?", a: "We are all together in it", wrong: ["We will save you", "Follow us again", "We are free"], why: "We are all together in this! Verily, Allah has judged between His servants!" },
        { q: "Will the leaders carry the followers' burden?", a: "No", wrong: ["Yes, half of it", "Yes, all of it", "Only for friends"], why: "We will not bear any part of your burden for you; our own punishment is enough for us to bear." },
        { tf: true, q: "So we should follow truth, not popular leaders.", why: "On that Day the leaders will not bear any part of the followers' burden." }
      ]
    },
    {
      slug: "asking-the-keepers",
      title: "Asking the keepers",
      line: "They will ask the keepers to pray for one day of relief.",
      facts: ["The keepers will refuse", "Proof had already come"],
      quote: q40(49),
      source: ik(49, "Ibn Kathir says they will ask the keepers, who are like jailers, to pray to Allah to lessen the Fire for even one day.", "to pray to Allah to lessen the Fire for them if only for one day"),
      difficulty: 3,
      questions: [
        { q: "Whom will they ask to pray for them, in 40:49?", a: "The keepers of Hell", wrong: ["Their idols", "Their leaders", "Their families"], why: "Those in the Fire will say to the keepers of Hell: Call upon your Lord." },
        { q: "What will they ask for?", a: "Lighter torment for a day", wrong: ["A way out forever", "Food", "A new chance on earth"], why: "Call upon your Lord to lighten for us the torment for a day!" },
        { tf: true, q: "Now is the time to make dua, while it is accepted.", why: "In the Hereafter the invocation of the disbelievers will not be accepted." }
      ]
    },
    {
      slug: "did-messengers-not-come",
      title: "Did Messengers not come?",
      line: "Did your Messengers not come to you with clear proofs?",
      facts: ["They will say: Yes", "Their calls will be in vain"],
      quote: q40(50),
      source: ik(50, "Ibn Kathir explains the keepers' reply: was not proof established in the world on the lips of the Messengers?", "was not proof established in the world on the lips of the Messengers"),
      difficulty: 3,
      questions: [
        { q: "What will the keepers ask, in 40:50?", a: "Did your Messengers not come?", wrong: ["Who are you?", "Where is your gold?", "Are you tired?"], why: "Did there not come to you, your Messengers with clear evidences?" },
        { q: "What will the people answer?", a: "Yes", wrong: ["No", "We forgot", "Maybe"], why: "They will say: Yes." },
        { q: "What is the call of the disbelievers then?", a: "In vain", wrong: ["Answered", "Delayed", "Half answered"], why: "And the invocation of the disbelievers is nothing but in vain!" }
      ]
    },
    {
      slug: "we-help-our-messengers",
      title: "We help Our Messengers",
      line: "Allah helps His Messengers and believers, now and later.",
      facts: ["The call of the Prophets prevails", "Victory is complete on the Last Day"],
      quote: q40(51),
      source: ik(51, "Ibn Kathir says on the Day of Resurrection the victory will be greater and more complete.", "on the Day of Resurrection the victory will be greater and more complete"),
      difficulty: 2,
      questions: [
        { q: "Whom will Allah make victorious, in 40:51?", a: "His Messengers and the believers", wrong: ["The proud", "The rich only", "The tyrants"], why: "Verily, We will indeed make victorious Our Messengers and those who believe in this world's life." },
        { q: "When is the victory greatest, per Ibn Kathir?", a: "On the Day of Resurrection", wrong: ["On a Monday", "In a war", "At sunrise"], why: "On the Day of Resurrection the victory will be greater and more complete." },
        { q: "Who are the witnesses, per Mujahid?", a: "The angels", wrong: ["The kings", "The trees", "The stars"], why: "Mujahid said: The witnesses are the angels." }
      ]
    },
    {
      slug: "the-message-spread-east-and-west",
      title: "The message spread east and west",
      line: "The Prophet's ﷺ call spread through the world, east and west.",
      facts: ["Makkah and Arabia accepted Islam", "The Companions carried the message"],
      quote: q40(51),
      source: ik(51, "Ibn Kathir says the Companions conveyed the religion until the call of Muhammad ﷺ spread throughout the world, east and west.", "spread throughout the world, east and west"),
      difficulty: 2,
      questions: [
        { q: "How far did the call spread, per Ibn Kathir?", a: "Through the world, east and west", wrong: ["Only Makkah", "Only one valley", "Nowhere"], why: "Until the call of Muhammad ﷺ spread throughout the world, east and west." },
        { q: "Which city did Allah let the Prophet ﷺ return to?", a: "Makkah", wrong: ["Rome", "Cairo", "Damascus"], why: "Allah enabled him to conquer Makkah, and he rejoiced in his return to his homeland." },
        { tf: true, q: "This religion will continue to prevail until the Hour.", why: "This religion will continue to prevail until the Hour begins." }
      ]
    },
    {
      slug: "excuses-do-not-help",
      title: "Excuses do not help",
      line: "On that Day, the excuses of the wrongdoers will not profit them.",
      facts: ["No excuse or ransom accepted", "Far from Allah's mercy"],
      quote: q40(52),
      source: ik(52, "Ibn Kathir says no excuse or ransom will be accepted from them.", "no excuse or ransom will be accepted from them"),
      difficulty: 3,
      questions: [
        { q: "What will not profit the wrongdoers, in 40:52?", a: "Their excuses", wrong: ["Their prayers", "Their kindness", "Their patience"], why: "The Day when their excuses will be of no profit to wrongdoers." },
        { q: "What will be accepted from them, per Ibn Kathir?", a: "No excuse and no ransom", wrong: ["Gold", "Promises", "Apologies"], why: "No excuse or ransom will be accepted from them." },
        { tf: true, q: "The time for excuses is in this life, by repenting.", why: "On that Day no excuse or ransom will be accepted from them." }
      ]
    },
    {
      slug: "musa-was-given-guidance",
      title: "Musa was given guidance",
      line: "Allah gave Musa guidance, and Bani Israil inherited the Book.",
      facts: ["They prevailed through patience", "The Tawrah was a reminder"],
      quote: q40(53),
      source: ik(53, "Ibn Kathir says the Children of Israel prevailed in the end because of their patience in obeying Allah and following Musa.", "because of their patience in obeying Allah and following His Messenger Musa"),
      difficulty: 2,
      questions: [
        { q: "What did Allah give Musa, in 40:53?", a: "The guidance", wrong: ["A palace", "Gold", "A tower"], why: "And, indeed We gave Musa the guidance." },
        { q: "Why did the Children of Israel prevail, per Ibn Kathir?", a: "Patience in obeying Allah", wrong: ["Their army", "Their wealth", "Luck"], why: "Because of their patience in obeying Allah and following His Messenger Musa." },
        { q: "What Scripture did they inherit?", a: "The Tawrah", wrong: ["The Zabur", "The Injil", "The Quran"], why: "The Scripture which they inherited, the Tawrah." }
      ]
    },
    {
      slug: "a-reminder-for-understanding",
      title: "A reminder for understanding",
      line: "The Book was a guide and reminder for those who understand.",
      facts: ["For people of sound nature", "Heavenly books guide the heart"],
      quote: q40(54),
      source: ik(54, "Ibn Kathir says the men of understanding are those of a sound and upright nature.", "those of a sound and upright nature"),
      difficulty: 2,
      questions: [
        { q: "What was the Scripture, in 40:54?", a: "A guide and a reminder", wrong: ["A story only", "A song", "A map"], why: "A guide and a reminder for men of understanding." },
        { q: "Who are men of understanding, per Ibn Kathir?", a: "Those of sound, upright nature", wrong: ["The richest", "The oldest", "The loudest"], why: "Those of a sound and upright nature." },
        { tf: true, q: "Revelation benefits those who reflect.", why: "A guide and a reminder for men of understanding." }
      ]
    },
    {
      slug: "be-patient-the-promise-is-true",
      title: "Be patient, the promise is true",
      line: "Be patient; Allah's promise is true.",
      facts: ["Allah never breaks His promise", "Victory is for the believers"],
      quote: q40(55),
      source: ik(55, "Ibn Kathir says Allah promised that the Prophet's ﷺ word would prevail, and Allah does not break His promises.", "and Allah does not break His promises"),
      difficulty: 2,
      questions: [
        { q: "What was the Prophet ﷺ told to be, in 40:55?", a: "Patient", wrong: ["Angry", "Afraid", "Quick to fight"], why: "So be patient, verily, the promise of Allah is true." },
        { q: "Does Allah break His promises?", a: "Never", wrong: ["Sometimes", "Often", "Only small ones"], why: "And Allah does not break His promises." },
        { q: "What does ask forgiveness encourage, per Ibn Kathir?", a: "The Ummah to seek forgiveness", wrong: ["Sleeping late", "Fasting daily", "Travel"], why: "This encourages the Ummah to seek forgiveness." }
      ]
    },
    {
      slug: "seventy-times-a-day",
      title: "Seventy times a day",
      line: "The Prophet ﷺ sought forgiveness over seventy times a day.",
      facts: ["Istighfar is a daily habit", "Glorify Allah morning and evening"],
      quote: q40(55),
      source: hadith("bukhari", "6307", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: By Allah, I ask Allah for forgiveness and turn to Him in repentance more than seventy times a day.", "I ask for forgiveness from Allah and turn to Him in repentance more than seventy times a day"),
      difficulty: 2,
      questions: [
        { q: "How often did the Prophet ﷺ seek forgiveness, per Bukhari 6307?", a: "More than seventy times a day", wrong: ["Once a year", "Once a week", "Only in Ramadan"], why: "I ask for forgiveness from Allah and turn to Him in repentance more than seventy times a day." },
        { q: "When should we glorify Allah, in 40:55?", a: "In the evening and morning", wrong: ["Only at noon", "Only on Friday", "Only on Eid"], why: "Glorify the praises of your Lord in the Ashi and in the Ibkar." },
        { q: "What is Al-Ibkar, per Ibn Kathir?", a: "The beginning of the day", wrong: ["Midnight", "The middle of the day", "The month"], why: "Ibkar means at the beginning of the day and the end of the night." }
      ]
    },
    {
      slug: "nothing-but-pride",
      title: "Nothing but pride",
      line: "Those who dispute without proof have only pride in their hearts.",
      facts: ["Too proud to follow truth", "Seek refuge from being like them"],
      quote: q40(56),
      source: ik(56, "Ibn Kathir says they are too proud to follow the truth, but the truth will prevail.", "they are too proud to follow the truth and submit to the one who has brought it"),
      difficulty: 3,
      questions: [
        { q: "What is in their hearts, in 40:56?", a: "Nothing but pride", wrong: ["Love of truth", "Humility", "Fear of Allah"], why: "There is nothing else in their breasts except pride." },
        { q: "What stops them, per Ibn Kathir?", a: "Pride in following truth", wrong: ["Lack of time", "Poor eyesight", "Being busy"], why: "They are too proud to follow the truth and submit to the one who has brought it." },
        { q: "What are we told to do, in 40:56?", a: "Seek refuge in Allah", wrong: ["Argue louder", "Stay away from people", "Hide"], why: "So seek refuge in Allah. Verily, it is He Who is the All-Hearer, the All-Seer." }
      ]
    },
    {
      slug: "greater-than-mankind",
      title: "Greater than mankind",
      line: "Creating the heavens and earth is greater than creating people.",
      facts: ["Raising the dead is easy for Allah", "Most people do not ponder this"],
      quote: q40(57),
      source: ik(57, "Ibn Kathir says the One Who created the heavens and the earth is able to do anything less than that, like raising the dead.", "The One Who is able to do that is able to do anything that is less than that"),
      difficulty: 2,
      questions: [
        { q: "Which is greater, in 40:57?", a: "Creating the heavens and earth", wrong: ["Creating people", "Building towers", "Making ships"], why: "The creation of the heavens and the earth is indeed greater than the creation of mankind." },
        { q: "What does this prove, per Ibn Kathir?", a: "Allah can bring people back to life", wrong: ["The earth is flat", "People are greater", "Nothing"], why: "Allah will bring back His creation on the Day of Resurrection. That is very easy for Him." },
        { tf: true, q: "Some Arabs accepted Allah created the heavens but denied resurrection.", why: "They acknowledged something which was greater than that which they denied." }
      ]
    },
    {
      slug: "the-blind-and-the-seeing",
      title: "The blind and the seeing",
      line: "The blind and the seeing are not equal, nor good and evil.",
      facts: ["Believers and wrongdoers differ", "Most people remember little"],
      quote: q40(58),
      source: ik(58, "Ibn Kathir says just as the blind and the seeing differ, the righteous believers and the immoral disbelievers are not equal.", "the righteous believers and the immoral disbelievers are not equal"),
      difficulty: 2,
      questions: [
        { q: "Who are not equal, in 40:58?", a: "The blind and those who see", wrong: ["Two brothers", "Two cities", "Two seasons"], why: "And not equal are the blind and those who see." },
        { q: "Who else are not equal, per Ibn Kathir?", a: "Righteous believers and wrongdoers", wrong: ["Old and young", "Tall and short", "Rich and poor"], why: "The righteous believers and the immoral disbelievers are not equal." },
        { q: "How much do people remember, in 40:58?", a: "Little", wrong: ["Everything", "Most things", "Too much"], why: "Little do you remember!" }
      ]
    },
    {
      slug: "the-hour-is-coming",
      title: "The Hour is coming",
      line: "The Hour is surely coming, with no doubt in it.",
      facts: ["Most people do not believe", "The Hour will surely happen"],
      quote: q40(59),
      source: ik(59, "Ibn Kathir says the Hour will indeed come to pass, though most people doubt it.", "it will indeed come to pass"),
      difficulty: 1,
      questions: [
        { q: "What is surely coming, in 40:59?", a: "The Hour", wrong: ["A drought", "A war", "A king"], why: "Verily, the Hour is surely coming, there is no doubt about it." },
        { q: "How many people believe in it, in 40:59?", a: "Most do not", wrong: ["Everyone", "All scholars only", "No one"], why: "Yet most men believe not." },
        { tf: true, q: "There is no doubt about the Hour.", why: "Verily, the Hour is surely coming, there is no doubt about it." }
      ]
    },
    {
      slug: "call-upon-me",
      title: "Call upon Me",
      line: "Your Lord said: Call upon Me, I will answer you.",
      facts: ["Allah loves to be asked", "He promises to answer"],
      quote: q40(60),
      source: ik(60, "Ibn Kathir says by His grace and kindness, Allah encourages His servants to call upon Him and guarantees to respond.", "Allah encourages His servants to call upon Him, and He guarantees to respond"),
      difficulty: 1,
      questions: [
        { q: "What does Allah promise, in 40:60?", a: "I will answer you", wrong: ["I will ignore you", "Ask others", "Wait a year"], why: "Call upon Me, I will answer you." },
        { q: "What does Allah guarantee, per Ibn Kathir?", a: "To respond", wrong: ["Gold", "Fame", "Long life"], why: "Allah encourages His servants to call upon Him, and He guarantees to respond." },
        { tf: false, q: "Allah dislikes being asked.", why: "The poet said: Allah hates not to be asked, and the son of Adam hates to be asked." }
      ]
    },
    {
      slug: "dua-is-worship",
      title: "Dua is worship",
      line: "The Prophet ﷺ said: Supplication is the worship.",
      facts: ["He then recited 40:60", "The proud refuse to ask Allah"],
      quote: q40(60),
      source: hadith("tirmidhi", "3247", "An-Nu'man bin Bashir", "Sahih", "The Prophet ﷺ said supplication is the worship, then recited: Call upon Me, I will answer you.", "Supplication is the worship"),
      difficulty: 2,
      questions: [
        { q: "What is supplication, per Tirmidhi 3247?", a: "The worship", wrong: ["A small habit", "Only for scholars", "For hard times only"], why: "The Prophet ﷺ said: Supplication is the worship." },
        { q: "Which ayah did the Prophet ﷺ recite after?", a: "40:60", wrong: ["1:1", "2:255", "112:1"], why: "Then he recited: And your Lord said: Call upon Me, I will answer you." },
        { q: "Who scorn Allah's worship, per Ibn Kathir?", a: "Those too proud to call on Him", wrong: ["The humble", "The young", "The poor"], why: "Those who are too proud to call on Me and single Me out." }
      ]
    },
    {
      slug: "two-kinds-of-dua",
      title: "Two kinds of dua",
      line: "Dua is both asking Allah and every act of worship.",
      facts: ["As-Sa'di explains", "Dua of worship and asking"],
      quote: q40(60),
      source: saadi(40, 60, "As-Sa'di says 40:60 commands two kinds of dua: the dua of worship, which is all our worship, and the dua of asking, which is asking for needs; Allah promises to answer, and warns the proud.", "وأمرهم بدعائه، دعاء العبادة، ودعاء المسألة"),
      difficulty: 2,
      questions: [
        { q: "What are the two kinds of dua, per as-Sa'di?", a: "Worship and asking", wrong: ["Loud and quiet", "Long and short", "Morning and night"], why: "Dua of worship and dua of asking, says as-Sa'di." },
        { q: "What awaits those too proud to call on Allah, in Ghafir 40:60?", a: "Hell, humbled", wrong: ["A small reward", "Nothing", "Praise"], why: "They will enter Hell humbled." },
        { tf: true, q: "Allah promised to answer those who call on Him.", why: "As-Sa'di on 40:60." }
      ]
    }
  ]
};

/** Ayahs 61 to 85: signs of Allah's power, the stages of life, patience, cattle and ships, and faith that comes too late. */
const GHAFIR_FOUR: DeepUnit = {
  key: "ghafir4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-40",
  name: "Ghafir, ayahs 61 to 85",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ghafir",
  lessons: [
    {
      slug: "night-for-rest-day-for-work",
      title: "Night for rest, day for work",
      line: "Allah made the night for rest and the day to see.",
      facts: ["Night lets us rest and relax", "Day lets us travel and work"],
      quote: q40(61),
      source: ik(61, "Ibn Kathir says Allah gave the night for rest and the day with its light for journeys and business.", "He has given them the day with its light, so that they can undertake their journeys and engage in their business"),
      difficulty: 1,
      questions: [
        { q: "What is the night for, in 40:61?", a: "Rest", wrong: ["Trade", "Travel", "Farming"], why: "Allah, it is He Who has made the night for you that you may rest therein." },
        { q: "What is the day for, per Ibn Kathir?", a: "Journeys and business", wrong: ["Only sleep", "Nothing", "Only games"], why: "He has given them the day with its light, so that they can undertake their journeys and engage in their business." },
        { q: "What do most people not give, in 40:61?", a: "Thanks", wrong: ["Money", "Time", "Advice"], why: "Truly, Allah is full of bounty to mankind; yet, most of mankind give no thanks." }
      ]
    },
    {
      slug: "the-creator-of-all-things",
      title: "The Creator of all things",
      line: "That is Allah, your Lord, the Creator of all things.",
      facts: ["None has the right to worship but Him", "Idols cannot create anything"],
      quote: q40(62),
      source: ik(62, "Ibn Kathir asks how anyone can worship idols that cannot create anything but are themselves hand-made and carved.", "how can you worship idols which cannot create anything but are themselves hand-made and carved"),
      difficulty: 2,
      questions: [
        { q: "Who is the Creator of all things, in 40:62?", a: "Allah, your Lord", wrong: ["The sun", "The kings", "Nature alone"], why: "That is Allah, your Lord, the Creator of all things." },
        { q: "What can idols create, per Ibn Kathir?", a: "Nothing", wrong: ["Rain", "Children", "Food"], why: "Idols which cannot create anything but are themselves hand-made and carved." },
        { tf: true, q: "Idols are made by people's own hands.", why: "They are themselves hand-made and carved." }
      ]
    },
    {
      slug: "turned-away-before",
      title: "Turned away before",
      line: "Those who denied Allah's signs were turned away in the past too.",
      facts: ["They followed desires", "They had no proof"],
      quote: q40(63),
      source: ik(63, "Ibn Kathir says earlier people also worshipped others with no proof, on the basis of ignorance and desires.", "with no proof or evidence, but on the basis of ignorance and desires"),
      difficulty: 2,
      questions: [
        { q: "Who were turned away, in 40:63?", a: "Those who denied Allah's signs", wrong: ["The patient", "The grateful", "The humble"], why: "Thus were turned away those who used to deny the Ayat of Allah." },
        { q: "What was their worship based on, per Ibn Kathir?", a: "Ignorance and desires", wrong: ["Clear proof", "Revelation", "Knowledge"], why: "With no proof or evidence, but on the basis of ignorance and desires." },
        { tf: false, q: "Turning away from Allah began only in Makkah.", why: "Those who came before them also disbelieved and worshipped others." }
      ]
    },
    {
      slug: "the-earth-and-the-sky",
      title: "The earth and the sky",
      line: "Allah made the earth a home and the sky a canopy.",
      facts: ["Mountains keep the earth steady", "The sky is a protecting roof"],
      quote: q40(64),
      source: ik(64, "Ibn Kathir says Allah made the earth stable for us, and the sky a roof covering and protecting the world.", "a roof covering and protecting the world"),
      difficulty: 1,
      questions: [
        { q: "What did Allah make the earth, in 40:64?", a: "A dwelling place", wrong: ["A prison", "A desert only", "A boat"], why: "Allah, it is He Who has made for you the earth as a dwelling place." },
        { q: "What is the sky like, per Ibn Kathir?", a: "A protecting roof", wrong: ["An empty hole", "A sea", "A wall"], why: "The sky as a canopy means a roof covering and protecting the world." },
        { q: "What keeps the earth from shaking, per Ibn Kathir?", a: "The mountains", wrong: ["The rivers", "The clouds", "The trees"], why: "He strengthened it with the mountains so that it does not shake with you." }
      ]
    },
    {
      slug: "the-best-shape",
      title: "The best shape",
      line: "Allah shaped you and made your shapes good.",
      facts: ["Created in the best form", "Given good, pure food"],
      quote: q40(64),
      source: ik(64, "Ibn Kathir says Allah created us in the best and most perfect form and gave us good food and drink.", "He created you in the best and most perfect form"),
      difficulty: 1,
      questions: [
        { q: "How did Allah make our shapes, in 40:64?", a: "Good", wrong: ["Random", "Ugly", "Unfinished"], why: "And has given you shape and made your shapes good." },
        { q: "In what form are we made, per Ibn Kathir?", a: "The best, most perfect form", wrong: ["A weak form", "A plain form", "A broken form"], why: "He created you in the best and most perfect form." },
        { q: "What ends 40:64?", a: "Blessed be Allah, Lord of all", wrong: ["Go and travel", "Fear the sea", "Count the stars"], why: "That is Allah, your Lord, so Blessed be Allah, the Lord of all that exists." }
      ]
    },
    {
      slug: "the-ever-living",
      title: "The Ever Living",
      line: "He is the Ever Living; call on Him sincerely.",
      facts: ["The First and the Last", "All praise to the Lord of the worlds"],
      quote: q40(65),
      source: ik(65, "Ibn Kathir says Allah is the Ever Living from eternity to eternity, the First and the Last, the Manifest, the Hidden.", "He is the Ever Living, from eternity to eternity"),
      difficulty: 2,
      questions: [
        { q: "Which name of Allah opens 40:65?", a: "The Ever Living", wrong: ["The Generous", "The Light", "The Judge"], why: "He is the Ever Living, La ilaha illa Huwa." },
        { q: "How long is Allah Living, per Ibn Kathir?", a: "From eternity to eternity", wrong: ["For a while", "Since the earth", "Until the Hour"], why: "He is the Ever Living, from eternity to eternity." },
        { tf: true, q: "The Prophet ﷺ praised Allah with sincerity after each prayer.", why: "The Messenger of Allah ﷺ used to say the Tahlil in this fashion after every prayer." }
      ]
    },
    {
      slug: "i-have-been-forbidden",
      title: "I have been forbidden",
      line: "Say: I am forbidden to worship what you worship besides Allah.",
      facts: ["Clear proofs came to him", "Submit to the Lord of all"],
      quote: q40(66),
      source: ik(66, "Ibn Kathir explains that no one apart from Allah deserves worship, so the Prophet ﷺ was told to say this to the idolaters.", "no one apart from Him is deserving of worship"),
      difficulty: 2,
      questions: [
        { q: "What was the Prophet ﷺ forbidden, in 40:66?", a: "Worshipping others besides Allah", wrong: ["Eating dates", "Traveling", "Speaking"], why: "I have been forbidden to worship those whom you worship besides Allah." },
        { q: "What was he commanded, in 40:66?", a: "To submit to the Lord of all", wrong: ["To build idols", "To stay silent", "To leave Makkah"], why: "And I am commanded to submit to the Lord of all that exists." },
        { tf: true, q: "Only Allah deserves worship.", why: "Allah explains that no one apart from Him is deserving of worship." }
      ]
    },
    {
      slug: "from-dust-to-old-age",
      title: "From dust to old age",
      line: "Allah creates you from dust, then you grow to strength and age.",
      facts: ["Each stage is by His decree", "Some die before old age"],
      quote: q40(67),
      source: ik(67, "Ibn Kathir says Allah alone takes us through these stages, by His command, will and decree.", "causes you to pass through these different stages"),
      difficulty: 2,
      questions: [
        { q: "From what were we first created, in 40:67?", a: "Dust", wrong: ["Fire", "Light", "Stone"], why: "It is He, Who has created you from dust." },
        { q: "Who takes us through life's stages, per Ibn Kathir?", a: "Allah alone", wrong: ["Chance", "Our parents alone", "The stars"], why: "He is the One Who Alone causes you to pass through these different stages." },
        { q: "What should we remember, per Ibn Jurayj?", a: "The Resurrection", wrong: ["Our birthday", "The market", "Old games"], why: "Ibn Jurayj said: In order that you may remember the Resurrection." }
      ]
    },
    {
      slug: "be-and-it-is",
      title: "Be, and it is",
      line: "When Allah decides a thing, He says Be, and it is.",
      facts: ["He alone gives life and death", "No one can resist His will"],
      quote: q40(68),
      source: ik(68, "Ibn Kathir says Allah cannot be opposed or resisted; whatever He wills definitely comes to pass.", "Whatever He wills definitely comes to pass"),
      difficulty: 1,
      questions: [
        { q: "Who gives life and death, in 40:68?", a: "Allah", wrong: ["Doctors", "Kings", "Time"], why: "It is He Who gives life and causes death." },
        { q: "What does Allah say to a thing He decides?", a: "Be", wrong: ["Wait", "Maybe", "Later"], why: "When He decides upon a thing He says to it only: Be! and it is." },
        { tf: false, q: "Something Allah wills may fail to happen.", why: "Whatever He wills definitely comes to pass." }
      ]
    },
    {
      slug: "how-are-they-turned-away",
      title: "How are they turned away?",
      line: "See those who dispute Allah's signs; how are they turned away?",
      facts: ["They argue with falsehood", "Their minds turn from truth"],
      quote: q40(69),
      source: ik(69, "Ibn Kathir says Allah asks the Prophet ﷺ to wonder at those who dispute the truth with falsehood, how their minds are turned from it.", "how their minds are diverted from the truth and are misguided"),
      difficulty: 2,
      questions: [
        { q: "What do they dispute, in 40:69?", a: "The Ayat of Allah", wrong: ["Prices", "Land borders", "Recipes"], why: "See you not those who dispute about the Ayat of Allah?" },
        { q: "What happens to their minds, per Ibn Kathir?", a: "Diverted from the truth", wrong: ["Grow wiser", "Find peace", "Stay neutral"], why: "How their minds are diverted from the truth and are misguided." },
        { tf: true, q: "Arguing against clear truth leads one astray.", why: "Their minds are diverted from the truth and are misguided." }
      ]
    },
    {
      slug: "they-will-come-to-know",
      title: "They will come to know",
      line: "Those who deny the Book will come to know.",
      facts: ["A stern warning", "Woe that Day to the deniers"],
      quote: q40(70),
      source: ik(70, "Ibn Kathir says they will come to know is a stern warning and clear threat from the Lord.", "This is a stern warning and clear threat from the Lord"),
      difficulty: 2,
      questions: [
        { q: "What do they deny, in 40:70?", a: "The Book and the Messengers' message", wrong: ["The weather", "The stars", "Trade"], why: "Those who deny the Book, and that with which We sent Our Messengers." },
        { q: "What does they will come to know mean?", a: "A stern warning", wrong: ["A promise of gold", "A riddle", "A joke"], why: "This is a stern warning and clear threat from the Lord." },
        { q: "Which ayah does Ibn Kathir link?", a: "77:15, Woe that Day to the deniers", wrong: ["2:255", "1:1", "108:1"], why: "This is like the Ayah: Woe that Day to the deniers! (77:15)" }
      ]
    },
    {
      slug: "chains-for-the-deniers",
      title: "Chains for the deniers",
      line: "The Quran warns the deniers of chains in the Hereafter.",
      facts: ["A warning, not a story to fear", "Turn back to Allah now"],
      quote: q40(71),
      source: ik(71, "Ibn Kathir says the chains will be attached to the iron collars, a warning for those who deny.", "the chains will be attached to the iron collars"),
      difficulty: 3,
      questions: [
        { q: "Who is warned in 40:71?", a: "Those who deny the Book", wrong: ["The believers", "The children", "The angels"], why: "Ayah 70 to 71: those who deny the Book will come to know, when collars and chains are on their necks." },
        { tf: true, q: "Allah warns so that people turn back before it is late.", why: "This is a stern warning and clear threat from the Lord to these people." },
        { q: "What will be attached to the collars, per Ibn Kathir?", a: "Chains", wrong: ["Flowers", "Bells", "Ribbons"], why: "The chains will be attached to the iron collars." }
      ]
    },
    {
      slug: "boiling-water-and-fire",
      title: "Boiling water and Fire",
      line: "The deniers are warned of boiling water and the Fire.",
      facts: ["Like 55:43-44", "Allah is fair to all"],
      quote: q40(72),
      source: ik(72, "Ibn Kathir links this ayah to 55:43-44: the Hell which the criminals denied.", "This is the Hell which the criminals denied"),
      difficulty: 3,
      questions: [
        { q: "Which ayah does Ibn Kathir link to 40:72?", a: "55:43-44", wrong: ["2:2", "1:7", "112:4"], why: "This is the Hell which the criminals denied. They will go between it and the fierce boiling water! (55:43-44)" },
        { q: "What did the criminals do, per 55:43?", a: "Denied Hell", wrong: ["Feared it", "Prayed often", "Repented"], why: "This is the Hell which the criminals denied." },
        { tf: true, q: "The warnings are for those who denied, not the repentant.", why: "This is the Hell which the criminals denied." }
      ]
    },
    {
      slug: "where-are-your-partners",
      title: "Where are your partners?",
      line: "They will be asked: Where are those you set up as partners?",
      facts: ["The idols cannot help", "They will deny their worship"],
      quote: q40(73),
      source: ik(73, "Ibn Kathir explains the question: where are the idols you worshipped instead of Allah? Can they help you today?", "where are the idols whom you used to worship instead of Allah"),
      difficulty: 2,
      questions: [
        { q: "What will they be asked, in 40:73?", a: "Where are your partners?", wrong: ["Where is your money?", "Where is your home?", "Who is your king?"], why: "Then it will be said to them: Where are all those whom you used to consider partners?" },
        { q: "What is being asked about, per Ibn Kathir?", a: "The idols they worshipped", wrong: ["Their friends", "Their animals", "Their homes"], why: "Where are the idols whom you used to worship instead of Allah?" },
        { tf: false, q: "The idols will come to help them.", why: "Can they help you today? They have vanished from us." }
      ]
    },
    {
      slug: "they-have-vanished",
      title: "They have vanished",
      line: "They will say: They have vanished from us.",
      facts: ["The idols are gone", "They will even deny the worship"],
      quote: q40(74),
      source: ik(74, "Ibn Kathir says they will deny that they ever worshipped the idols, like 6:23.", "they will deny that they worshipped them"),
      difficulty: 3,
      questions: [
        { q: "What will they say of their idols, in 40:74?", a: "They have vanished from us", wrong: ["They are here", "They saved us", "They are asleep"], why: "They will say: They have vanished from us." },
        { q: "What will they claim, per Ibn Kathir?", a: "They never worshipped them", wrong: ["They loved them", "They built more", "They forgot names"], why: "They will deny that they worshipped them." },
        { q: "Whom does Allah leave astray, in 40:74?", a: "The disbelievers", wrong: ["The believers", "The patient", "The thankful"], why: "Thus Allah leads astray the disbelievers." }
      ]
    },
    {
      slug: "exulting-without-right",
      title: "Exulting without right",
      line: "That was for boasting on earth without right.",
      facts: ["Pride and wastefulness", "Humility is the believer's way"],
      quote: q40(75),
      source: ik(75, "Ibn Kathir says the angels will tell them this is the result of their boasting on earth without right and their extravagance.", "your recompense for your exulting in the earth without any right, and for your extravagance"),
      difficulty: 3,
      questions: [
        { q: "Why are they punished, in 40:75?", a: "Exulting on earth without right", wrong: ["Being poor", "Being weak", "Being quiet"], why: "That was because you had been exulting in the earth without any right." },
        { q: "What else did they do, per Ibn Kathir?", a: "Extravagance", wrong: ["Charity", "Fasting", "Patience"], why: "Your exulting in the earth without any right, and for your extravagance." },
        { tf: true, q: "Boasting and waste are traits to avoid.", why: "Their recompense is for exulting in the earth without any right, and for their extravagance." }
      ]
    },
    {
      slug: "an-evil-abode-for-the-arrogant",
      title: "An evil abode for the arrogant",
      line: "An evil home awaits the arrogant who refused Allah's proof.",
      facts: ["Pride is a great danger", "The humble accept the truth"],
      quote: q40(76),
      source: ik(76, "Ibn Kathir says it is a terrible abode for those who arrogantly ignored the signs of Allah and refused His proof.", "for those who arrogantly ignored the signs of Allah and refused to accept His proof and evidence"),
      difficulty: 3,
      questions: [
        { q: "For whom is the evil abode, in 40:76?", a: "The arrogant", wrong: ["The humble", "The poor", "The young"], why: "And indeed what an evil abode of the arrogant!" },
        { q: "What did they do, per Ibn Kathir?", a: "Arrogantly ignored Allah's signs", wrong: ["Followed the signs", "Taught others", "Gave charity"], why: "Those who arrogantly ignored the signs of Allah and refused to accept His proof and evidence." },
        { tf: true, q: "Pride can keep a person from accepting the truth.", why: "They arrogantly ignored the signs of Allah and refused to accept His proof." }
      ]
    },
    {
      slug: "patience-and-the-promise",
      title: "Patience and the promise",
      line: "Be patient; Allah's promise is true, now or later.",
      facts: ["Victory came in his lifetime", "All return to Allah"],
      quote: q40(77),
      source: ik(77, "Ibn Kathir says Allah commanded His Messenger ﷺ to bear the rejection patiently, promising he and his followers would succeed.", "to patiently bear the rejection of those who rejected him"),
      difficulty: 2,
      questions: [
        { q: "What does Allah command in 40:77?", a: "Be patient", wrong: ["Give up", "Hurry", "Be angry"], why: "So be patient, verily, the promise of Allah is true." },
        { q: "What did the Prophet ﷺ bear patiently, per Ibn Kathir?", a: "His people's rejection", wrong: ["Hunger only", "Heat only", "Long travel"], why: "Allah commands His Messenger to patiently bear the rejection of those who rejected him." },
        { q: "To whom will all be returned, in 40:77?", a: "To Allah", wrong: ["To the earth", "To their tribes", "To their homes"], why: "Then still it is to Us they all shall be returned." }
      ]
    },
    {
      slug: "messengers-we-told-of",
      title: "Messengers We told of",
      line: "Some Messengers' stories are told; many others are not.",
      facts: ["There were many more Messengers", "Signs came only by Allah's leave"],
      quote: q40(78),
      source: ik(78, "Ibn Kathir says the Messengers whose stories are not told are many, many more than those whose stories are told.", "they are many, many more than those whose stories have been told"),
      difficulty: 2,
      questions: [
        { q: "Did Allah tell us of every Messenger, in 40:78?", a: "No, only some", wrong: ["Yes, all", "Only one", "None"], why: "Of some of them We have related to you their story. And of some We have not." },
        { q: "How many stories are untold, per Ibn Kathir?", a: "Many, many more", wrong: ["Only two", "None", "A few"], why: "They are many, many more than those whose stories have been told." },
        { q: "How did Prophets bring miracles, in 40:78?", a: "Only by Allah's leave", wrong: ["Whenever they liked", "By magic", "By study"], why: "It was not given to any Messenger that he should bring a sign except by the leave of Allah." }
      ]
    },
    {
      slug: "decided-with-truth",
      title: "Decided with truth",
      line: "When Allah's command comes, the matter is decided with truth.",
      facts: ["Believers are saved", "Followers of falsehood lose"],
      quote: q40(78),
      source: ik(78, "Ibn Kathir says when Allah's command comes, the believers will be saved and the disbelievers destroyed.", "so the believers will be saved and the disbelievers will be destroyed"),
      difficulty: 2,
      questions: [
        { q: "How is the matter decided, in 40:78?", a: "With truth", wrong: ["By chance", "By force", "By vote"], why: "When comes the commandment of Allah, the matter will be decided with truth." },
        { q: "Who are saved, per Ibn Kathir?", a: "The believers", wrong: ["The proud", "The rich", "The loud"], why: "So the believers will be saved and the disbelievers will be destroyed." },
        { q: "Who will be lost, in 40:78?", a: "The followers of falsehood", wrong: ["The patient", "The truthful", "The Messengers"], why: "And the followers of falsehood will then be lost." }
      ]
    },
    {
      slug: "cattle-a-gift",
      title: "Cattle, a gift",
      line: "Allah made cattle for you, to ride some and eat from some.",
      facts: ["Camels, cows and sheep", "Milk, wool and travel"],
      quote: q40(79),
      source: ik(79, "Ibn Kathir says the cattle are camels, cows and sheep, which people ride, eat and drink milk from.", "which refers to camels, cows and sheep"),
      difficulty: 1,
      questions: [
        { q: "Which animals are meant, per Ibn Kathir?", a: "Camels, cows and sheep", wrong: ["Lions and tigers", "Fish and birds", "Cats and dogs"], why: "Which refers to camels, cows and sheep." },
        { q: "What do we do with cattle, in 40:79?", a: "Ride some and eat some", wrong: ["Only watch them", "Only race them", "Nothing"], why: "That you may ride on some of them, and of some you eat." },
        { q: "What is made from their wool, per Ibn Kathir?", a: "Tents and clothing", wrong: ["Swords", "Coins", "Bricks"], why: "The hair and wool of all of these animals is used to make tents, clothing and furnishings." }
      ]
    },
    {
      slug: "on-them-and-on-ships",
      title: "On them and on ships",
      line: "On cattle and on ships you are carried.",
      facts: ["Camels carry heavy loads", "Ships carry us across seas"],
      quote: q40(80),
      source: ik(80, "Ibn Kathir says camels carry heavy burdens on journeys to distant lands.", "they are used for carrying heavy burdens on journeys to distant lands"),
      difficulty: 1,
      questions: [
        { q: "On what are we carried, in 40:80?", a: "Cattle and ships", wrong: ["Clouds", "Trees", "Birds"], why: "And on them and on ships you are carried." },
        { q: "What do camels carry, per Ibn Kathir?", a: "Heavy burdens to far lands", wrong: ["Only children", "Nothing", "Only water"], why: "They are used for carrying heavy burdens on journeys to distant lands." },
        { tf: true, q: "Cows are used for plowing, per Ibn Kathir.", why: "Cattle are eaten and their milk is drunk; they are also used for plowing the earth." }
      ]
    },
    {
      slug: "which-sign-do-you-deny",
      title: "Which sign do you deny?",
      line: "He shows you His signs; which of them will you deny?",
      facts: ["Signs on the horizons", "And within ourselves"],
      quote: q40(81),
      source: ik(81, "Ibn Kathir says Allah shows His proof on the horizons and in ourselves, and only the stubborn deny it.", "His proof and evidence, on the horizons and in yourselves"),
      difficulty: 2,
      questions: [
        { q: "What does 40:81 ask?", a: "Which of Allah's signs do you deny?", wrong: ["Who is the strongest?", "Where is the sea?", "When is the harvest?"], why: "Which, then of the Ayat of Allah do you deny?" },
        { q: "Where are Allah's signs, per Ibn Kathir?", a: "On the horizons and in ourselves", wrong: ["Only in books", "Only in Makkah", "Nowhere"], why: "His proof and evidence, on the horizons and in yourselves." },
        { q: "Who denies the signs, per Ibn Kathir?", a: "The stubborn and arrogant", wrong: ["The humble", "The grateful", "The curious"], why: "You cannot deny any of His signs and proofs, unless you are stubborn and arrogant." }
      ]
    },
    {
      slug: "their-strength-did-not-help",
      title: "Their strength did not help",
      line: "Past nations were stronger, yet their gains did not help them.",
      facts: ["Great wealth and buildings", "None of it stopped Allah's decree"],
      quote: q40(82),
      source: ik(82, "Ibn Kathir says none of their strength, traces and great wealth availed them or prevented Allah's punishment.", "None of that availed them anything and could not prevent the punishment of Allah at all"),
      difficulty: 2,
      questions: [
        { q: "How were the past nations, in 40:82?", a: "More in number and mightier", wrong: ["Few and weak", "Poor and small", "Young and new"], why: "They were more in number than them and mightier in strength." },
        { q: "Did their wealth help them, per Ibn Kathir?", a: "No, not at all", wrong: ["Yes, fully", "A little", "Only some"], why: "None of that availed them anything and could not prevent the punishment of Allah at all." },
        { tf: true, q: "40:82 repeats the call to travel and reflect.", why: "Have they not traveled through the earth and seen what was the end of those before them?" }
      ]
    },
    {
      slug: "proud-of-their-knowledge",
      title: "Proud of their knowledge",
      line: "They were proud of their worldly knowledge and mocked the truth.",
      facts: ["They said: we know better", "What they mocked surrounded them"],
      quote: q40(83),
      source: ik(83, "Mujahid said they claimed: we know better than them, we will not be resurrected and we will not be punished.", "we know better than them, we will not be resurrected"),
      difficulty: 3,
      questions: [
        { q: "What were they glad with, in 40:83?", a: "Their worldly knowledge", wrong: ["The Messengers", "Revelation", "Their prayers"], why: "They were glad and proud with that which they had of the knowledge of worldly things." },
        { q: "What did they claim, per Mujahid?", a: "We know better than them", wrong: ["Teach us", "We are wrong", "We will follow"], why: "They said, we know better than them, we will not be resurrected and we will not be punished." },
        { tf: true, q: "Worldly knowledge without faith can make people proud.", why: "In their ignorance, they rejoiced in what they had of worldly knowledge." }
      ]
    },
    {
      slug: "when-they-saw-the-punishment",
      title: "When they saw the punishment",
      line: "Seeing the punishment, they said: We believe in Allah alone.",
      facts: ["Like Fir'awn while drowning", "Excuses were too late"],
      quote: q40(84),
      source: ik(84, "Ibn Kathir says they affirmed Allah is One only when excuses were of no avail, like Fir'awn as he was drowning.", "this was at the time when excuses were to no avail"),
      difficulty: 3,
      questions: [
        { q: "What did they say on seeing the punishment, in 40:84?", a: "We believe in Allah alone", wrong: ["Save our gold", "We are strong", "It is not real"], why: "We believe in Allah Alone and reject all that we used to associate with Him." },
        { q: "Who said something similar, per Ibn Kathir?", a: "Fir'awn as he drowned", wrong: ["Haman at the tower", "Qarun in his home", "The believing man"], why: "This is like what Fir'awn said as he was drowning." },
        { tf: false, q: "Their late belief was accepted.", why: "This was at the time when excuses were to no avail." }
      ]
    },
    {
      slug: "faith-before-it-is-too-late",
      title: "Faith before it is too late",
      line: "Faith did not help them once they saw the punishment.",
      facts: ["This is Allah's way with all", "Repent while there is time"],
      quote: q40(85),
      source: ik(85, "Ibn Kathir says Allah does not accept repentance from those who repent only when they actually see the punishment.", "this is the ruling of Allah concerning all those who repent only when they actually see the punishment"),
      difficulty: 3,
      questions: [
        { q: "Did their faith help them, in 40:85?", a: "No, it came too late", wrong: ["Yes, fully", "Partly", "For a day"], why: "Then their Faith could not avail them when they saw Our punishment." },
        { q: "Whose repentance is not accepted, per Ibn Kathir?", a: "Those who wait until they see punishment", wrong: ["Those who repent young", "Anyone who asks", "Those who cry"], why: "This is the ruling of Allah concerning all those who repent only when they actually see the punishment." },
        { q: "Who lost utterly, in 40:85?", a: "The disbelievers", wrong: ["The believers", "The Prophets", "The patient"], why: "And there the disbelievers lost utterly." }
      ]
    }
  ]
};

export const GHAFIR_UNITS: readonly DeepUnit[] = [GHAFIR_ONE, GHAFIR_TWO, GHAFIR_THREE, GHAFIR_FOUR];
