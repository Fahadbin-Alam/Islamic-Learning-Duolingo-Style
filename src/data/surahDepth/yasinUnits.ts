import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Ya-Sin ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Ya-Sin 36:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_36_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Ya-Sin 36:${ayah}`,
    url: `https://quran.com/36:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 36:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q36 = (ayah: number) => quranQuote(36, ayah);

/** Ayahs 1 to 27: the wise Quran, the record of deeds and footsteps, and the believer who came running from the far end of the town. */
const YASIN_ONE: DeepUnit = {
  key: "yasin1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-yasin",
  name: "Ya-Sin, ayahs 1 to 27",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ya-Sin",
  lessons: [
    {
      slug: "ya-sin",
      title: "Ya Sin",
      line: "Ya Sin: two letters that open the surah.",
      facts: ["Like the letters opening Al-Baqarah", "Allah knows their full meaning"],
      quote: q36(1),
      source: ik(1, "Ibn Kathir refers back to his explanation of the separate letters at the start of Al-Baqarah.", "We have already discussed the individual letters at the beginning of Surat Al-Baqarah"),
      difficulty: 1,
      questions: [
        { q: "How does Ya-Sin begin, in 36:1?", a: "With two letters", wrong: ["With a story", "With an oath by the sun", "With a dua"], why: "Ya Sin." },
        { q: "Where did Ibn Kathir explain such letters?", a: "At the start of Al-Baqarah", wrong: ["In Al-Fatihah", "In An-Nas", "Nowhere"], why: "We have already discussed the individual letters at the beginning of Surat Al-Baqarah." },
        { tf: true, q: "Other surahs also open with separate letters.", why: "We have already discussed the individual letters at the beginning of Surat Al-Baqarah." }
      ]
    },
    {
      slug: "the-wise-quran",
      title: "The wise Quran",
      line: "Allah swears by the Quran, full of wisdom.",
      facts: ["Perfect and precise", "Falsehood cannot reach it"],
      quote: q36(2),
      source: ik(2, "The Quran is perfect; falsehood cannot come to it from before it or behind it.", "falsehood cannot come to from before it or behind it"),
      difficulty: 2,
      questions: [
        { q: "By what does Allah swear, in 36:2?", a: "The Quran, full of wisdom", wrong: ["The sun", "The fig", "The dawn"], why: "By the Quran, full of wisdom." },
        { q: "What cannot reach the Quran, per Ibn Kathir?", a: "Falsehood", wrong: ["Readers", "Children", "Light"], why: "Al-Muhkam (perfect) which falsehood cannot come to from before it or behind it." },
        { q: "What does Al-Muhkam mean, per Ibn Kathir?", a: "Perfect", wrong: ["Short", "Old", "Hidden"], why: "By the Quran, full of wisdom means, Al-Muhkam (perfect)." }
      ]
    },
    {
      slug: "one-of-the-messengers",
      title: "One of the Messengers",
      line: "Truly, you are one of the Messengers.",
      facts: ["Addressed to Muhammad ﷺ", "Sworn to by the Quran"],
      quote: q36(3),
      source: ik(3, "Allah tells Muhammad ﷺ directly that he is one of the Messengers.", "Truly, you) means, O Muhammad"),
      difficulty: 2,
      questions: [
        { q: "Who is addressed, in 36:3, per Ibn Kathir?", a: "Muhammad ﷺ", wrong: ["Musa", "The angels", "The Jinn"], why: "Truly, you means, O Muhammad." },
        { q: "What is he, in 36:3?", a: "One of the Messengers", wrong: ["A poet", "A king", "A soothsayer"], why: "Truly, you are one of the Messengers." },
        { tf: true, q: "Allah swears by the Quran before saying this.", why: "By the Quran, full of wisdom. Truly, you are one of the Messengers." }
      ]
    },
    {
      slug: "on-a-straight-path",
      title: "On a straight path",
      line: "He ﷺ is on a straight path.",
      facts: ["A straight way and religion", "An upright Law"],
      quote: q36(4),
      source: ik(4, "The Prophet ﷺ follows a straight method, religion and upright law.", "following a straight methodology and religion, and an upright Law"),
      difficulty: 2,
      questions: [
        { q: "Where is the Prophet ﷺ, in 36:4?", a: "On a straight path", wrong: ["On a crooked road", "Lost", "At a crossroad"], why: "On the straight path." },
        { q: "What does it mean, per Ibn Kathir?", a: "A straight way and law", wrong: ["A desert road", "A trade route", "A river"], why: "Following a straight methodology and religion, and an upright Law." },
        { tf: false, q: "The straight path is only a road on earth.", why: "Following a straight methodology and religion, and an upright Law." }
      ]
    },
    {
      slug: "from-the-almighty-most-merciful",
      title: "From the Almighty, Most Merciful",
      line: "Sent down by the Almighty, the Most Merciful.",
      facts: ["Mighty in power", "Merciful to believers"],
      quote: q36(5),
      source: ik(5, "This path is revelation from the Lord of might, Who is Most Merciful to His believing servants.", "Most Merciful to His believing servants"),
      difficulty: 2,
      questions: [
        { q: "Who sent it down, in 36:5?", a: "The Almighty, Most Merciful", wrong: ["A wise man", "The angels alone", "The people"], why: "Sent down by the Almighty, the Most Merciful." },
        { q: "To whom is He Most Merciful, per Ibn Kathir?", a: "His believing servants", wrong: ["Only kings", "Only the rich", "No one"], why: "A revelation from the Lord of might Who is Most Merciful to His believing servants." },
        { tf: true, q: "The Prophet's ﷺ path is revelation from Allah.", why: "This path which you have brought is a revelation from the Lord of might." }
      ]
    },
    {
      slug: "a-heedless-people",
      title: "A heedless people",
      line: "Warn a people whose forefathers had no warner.",
      facts: ["The Arabs had no warner before", "His mission is for all people"],
      quote: q36(6),
      source: ik(6, "No warner came to the Arabs before him, yet his mission is for all mankind.", "is universal, when we discussed the meaning of the Ayah"),
      difficulty: 3,
      questions: [
        { q: "Whose forefathers were not warned, per Ibn Kathir?", a: "The Arabs", wrong: ["The Romans", "The Persians", "The Egyptians"], why: "This refers to the Arabs, for no warner had come to them before him." },
        { q: "How were they, in 36:6?", a: "Heedless", wrong: ["Learned", "Ready", "Grateful"], why: "Whose forefathers were not warned, so they are heedless." },
        { tf: false, q: "His message was only for the Arabs.", why: "The Ayat and Mutawatir Hadiths state that the mission of the Prophet ﷺ is universal." }
      ]
    },
    {
      slug: "the-word-proved-true",
      title: "The Word proved true",
      line: "The Word proved true on most of them; they will not believe.",
      facts: ["Allah knew they would refuse", "Faith is a gift"],
      quote: q36(7),
      source: ik(7, "Allah decreed in the Preserved Tablet that most of them would not believe in Him or His Messengers.", "so they will not believe.) in Allah, or in His Messengers"),
      difficulty: 4,
      questions: [
        { q: "What proved true, in 36:7?", a: "The Word against most", wrong: ["Their poems", "Their dreams", "Their trade"], why: "Indeed the Word has proved true against most of them." },
        { q: "Where was it decreed, per Ibn Jarir?", a: "The Preserved Tablet", wrong: ["A stone", "A tree", "A scroll in Makkah"], why: "Allah has decreed in the Mother of the Book (Al-Lawh Al-Mahfuz) that they will not believe." },
        { q: "In what will they not believe, per Ibn Kathir?", a: "Allah and His Messengers", wrong: ["Rain", "Markets", "Travel"], why: "So they will not believe in Allah, or in His Messengers." }
      ]
    },
    {
      slug: "heads-raised-up",
      title: "Heads raised up",
      line: "Their stubbornness is like a collar holding their heads up.",
      facts: ["A picture of refusing truth", "Hands kept from good"],
      quote: q36(8),
      source: ik(8, "It is like hands tied to the neck, so they cannot reach out to do good deeds.", "they cannot stretch them forth in order to do any good deeds"),
      difficulty: 4,
      questions: [
        { q: "What is described, in 36:8?", a: "Collars that raise the head", wrong: ["Crowns", "Necklaces of gold", "Scarves"], why: "We have put on their necks iron collars reaching to the chins, so that their heads are raised up." },
        { q: "What can they not do, per Ibn Kathir?", a: "Reach out to do good", wrong: ["Eat", "Walk", "Speak"], why: "They cannot stretch them forth in order to do any good deeds." },
        { tf: true, q: "The collar is a picture of being kept from guidance.", why: "We have made them like a person who has a chain around his neck." }
      ]
    },
    {
      slug: "a-barrier-before-and-behind",
      title: "A barrier before and behind",
      line: "A barrier stands before and behind them, so they cannot see.",
      facts: ["A barrier between them and truth", "Abu Jahl could not see him ﷺ"],
      quote: q36(9),
      source: ik(9, "Mujahid said the barrier is between them and the truth; their eyes are blinded to it.", "We have blinded their eyes to the truth"),
      difficulty: 4,
      questions: [
        { q: "What is the barrier between, per Mujahid?", a: "Them and the truth", wrong: ["Two cities", "Two seas", "Day and night"], why: "Mujahid said, Between them and the truth." },
        { q: "What happened to Abu Jahl, per Ikrimah?", a: "He could not see him ﷺ", wrong: ["He became king", "He travelled", "He fell asleep"], why: "He would say, Where is he? Where is he? And he would not be able to see him." },
        { q: "What does We covered them mean, per Ibn Kathir?", a: "Eyes blinded to truth", wrong: ["Given blankets", "Given shade", "Given homes"], why: "We have blinded their eyes to the truth." }
      ]
    },
    {
      slug: "warned-or-not",
      title: "Warned or not",
      line: "For some, a warning makes no difference; they will not believe.",
      facts: ["The warner still conveys", "Hearts must be open"],
      quote: q36(10),
      source: ik(10, "For those decreed to be misguided, warning them has no effect.", "warning them will not help them and will not have any effect on them"),
      difficulty: 3,
      questions: [
        { q: "What is the same to them, in 36:10?", a: "Being warned or not", wrong: ["Day and night", "Rich and poor", "Near and far"], why: "It is the same to them whether you warn them or you warn them not." },
        { q: "What effect does warning have, per Ibn Kathir?", a: "None for them", wrong: ["Great effect", "Some effect", "Makes them kings"], why: "Warning them will not help them and will not have any effect on them." },
        { q: "Which surah begins similarly, per Ibn Kathir?", a: "Al-Baqarah", wrong: ["Al-Kahf", "Yusuf", "Maryam"], why: "Something similar has already been seen at the beginning of Surat Al-Baqarah." }
      ]
    },
    {
      slug: "fears-the-most-gracious-unseen",
      title: "Fears Him unseen",
      line: "The warning helps those who follow the Quran and fear Allah.",
      facts: ["Allah watches when no one else does", "Glad tidings of forgiveness"],
      quote: q36(11),
      source: ik(11, "Even when no one sees him but Allah, he knows Allah is watching him.", "he knows that Allah is watching him and sees what he does"),
      difficulty: 3,
      questions: [
        { q: "Who benefits from the warning, in 36:11?", a: "Who follows the Reminder", wrong: ["Who mocks it", "Who sleeps", "Who boasts"], why: "You can only warn him who follows the Reminder." },
        { q: "What is the Reminder, per Ibn Kathir?", a: "The Quran", wrong: ["A bell", "A letter", "A dream"], why: "Those who follow the Reminder, which is the Quran." },
        { q: "What does fearing unseen mean, per Ibn Kathir?", a: "Knowing Allah watches", wrong: ["Fear of the dark", "Fear of people", "Fear of animals"], why: "He knows that Allah is watching him and sees what he does." }
      ]
    },
    {
      slug: "what-they-leave-behind",
      title: "What they leave behind",
      line: "Allah records our deeds and what we leave behind.",
      facts: ["A good example keeps earning", "Footsteps to the masjid count"],
      quote: q36(12),
      source: hadith("muslim", "1017", "Jarir ibn Abdullah", "Sahih", "The Prophet ﷺ said whoever starts a good practice that others follow gets its reward and the reward of all who follow it.", "He who introduced some good practice in Islam which was followed after him"),
      difficulty: 4,
      questions: [
        { q: "What does Allah record, in 36:12?", a: "Deeds and traces", wrong: ["Only names", "Only words", "Nothing"], why: "We record that which they send before them, and their traces." },
        { q: "What do traces mean, per Mujahid?", a: "Their footsteps", wrong: ["Their coins", "Their clothes", "Their homes"], why: "And their traces. He said, Their footsteps." },
        { q: "Who gets the reward of followers, in the hadith?", a: "Who starts a good practice", wrong: ["Who copies", "Who watches", "Who forgets"], why: "He who introduced some good practice in Islam which was followed after him." },
        { tf: true, q: "Banu Salamah were told their footsteps are recorded.", why: "O Banu Salamah, stay where you are, and your footsteps will be recorded." }
      ]
    },
    {
      slug: "good-that-outlives-you",
      title: "Good that outlives you",
      line: "Knowledge you taught and good you started keep earning reward.",
      facts: ["As-Sa'di explains", "Lasting deeds"],
      quote: q36(12),
      source: saadi(36, 12, "As-Sa'di says what people leave behind includes every good done because of their teaching, advice, books, or a mosque or useful place they built, and the same is true of evil they started.", "فكل خير عمل به أحد من الناس، بسبب علم العبد وتعليمه ونصحه"),
      difficulty: 2,
      questions: [
        { q: "What counts as good we leave behind, per as-Sa'di?", a: "Knowledge we taught others", wrong: ["Our clothes", "Our sleep", "Our games"], why: "Good done because of your teaching is written for you, says as-Sa'di." },
        { q: "Which hadith does as-Sa'di quote on 36:12?", a: "Whoever starts a good sunnah", wrong: ["Actions are by intentions", "Religion is advice", "Smile is charity"], why: "Whoever starts a good sunnah gets its reward and the reward of those who act on it." },
        { tf: true, q: "Building a mosque can keep earning reward after death.", why: "As-Sa'di on 36:12." }
      ]
    },
    {
      slug: "the-dwellers-of-the-town",
      title: "The people of the town",
      line: "Tell them the parable of a town that Messengers visited.",
      facts: ["A lesson for the deniers", "Its name is not certain"],
      quote: q36(13),
      source: ik(13, "Allah tells the Prophet ﷺ to set forth the story of the town and its Messengers as a lesson.", "a similitude; the Dwellers of the Town, when there came Messengers to them"),
      difficulty: 2,
      questions: [
        { q: "What parable is told, in 36:13?", a: "The people of the town", wrong: ["The cave sleepers", "The elephant", "The garden owners"], why: "And put forward to them a similitude; the Dwellers of the Town." },
        { q: "Who came to the town, in 36:13?", a: "Messengers", wrong: ["An army", "Traders", "Poets"], why: "When there came Messengers to them." },
        { tf: true, q: "Some scholars were unsure which town it was.", why: "Some of the Imams were not sure that it was Antioch." }
      ]
    },
    {
      slug: "a-third-messenger",
      title: "A third Messenger",
      line: "Two Messengers were denied, so Allah sent a third.",
      facts: ["They hurried to deny", "Allah strengthens His Messengers"],
      quote: q36(14),
      source: ik(14, "The people hastened to deny the two, so Allah supported them with a third Messenger.", "We supported and strengthened them with a third Messenger"),
      difficulty: 3,
      questions: [
        { q: "How many were sent first, in 36:14?", a: "Two", wrong: ["One", "Five", "Ten"], why: "When We sent to them two Messengers, they denied them both." },
        { q: "What did Allah do then, in 36:14?", a: "Sent a third", wrong: ["Sent rain", "Sent no one", "Closed the town"], why: "So We reinforced them with a third." },
        { q: "How did the people react, per Ibn Kathir?", a: "They hastened to deny", wrong: ["They welcomed them", "They asked questions", "They slept"], why: "They hastened to disbelieve in them." }
      ]
    },
    {
      slug: "only-humans-like-us",
      title: "Only humans like us",
      line: "They said: you are only humans like us; Allah sent nothing.",
      facts: ["Many nations said the same", "They thought Messengers must be angels"],
      quote: q36(15),
      source: ik(15, "They thought a Messenger had to be an angel, as many disbelieving nations said.", "If you are Messengers, you should be angels"),
      difficulty: 3,
      questions: [
        { q: "What did the people say, in 36:15?", a: "You are humans like us", wrong: ["You are angels", "You are kings", "You are jinn"], why: "They said: You are only human beings like ourselves." },
        { q: "What did they think a Messenger should be?", a: "An angel", wrong: ["A king", "A poet", "A merchant"], why: "If you are Messengers, you should be angels." },
        { tf: true, q: "Other nations made the same objection.", why: "This is like what many of the nations said who disbelieved." }
      ]
    },
    {
      slug: "our-lord-knows",
      title: "Our Lord knows",
      line: "The Messengers said: our Lord knows we were sent to you.",
      facts: ["Allah is their witness", "Truth will win in the end"],
      quote: q36(16),
      source: ik(16, "If they were lying, Allah would have punished them, but He would make them prevail.", "If we were lying, He would have taken the utmost vengeance against us"),
      difficulty: 3,
      questions: [
        { q: "Whom did the Messengers call as witness, in 36:16?", a: "Their Lord", wrong: ["The king", "The crowd", "The stars"], why: "Our Lord knows that we have been sent as Messengers to you." },
        { q: "What if they were lying, per Ibn Kathir?", a: "Allah would punish them", wrong: ["They would get rich", "No one would know", "They would rule"], why: "If we were lying, He would have taken the utmost vengeance against us." },
        { tf: true, q: "Allah is enough as a witness.", why: "Say: Sufficient is Allah for a witness between me and you." }
      ]
    },
    {
      slug: "only-to-convey",
      title: "Only to convey",
      line: "Our duty is only to convey the message plainly.",
      facts: ["Obeying brings happiness", "Each chooses his response"],
      quote: q36(17),
      source: ik(17, "All we must do is convey the message; obeying it brings happiness in both worlds.", "if you obey, then happiness will be yours in this world and the Hereafter"),
      difficulty: 2,
      questions: [
        { q: "What was their duty, in 36:17?", a: "To convey plainly", wrong: ["To force people", "To collect taxes", "To rule"], why: "And our duty is only to convey plainly." },
        { q: "What does obeying bring, per Ibn Kathir?", a: "Happiness in both worlds", wrong: ["Only wealth", "Only fame", "Nothing"], why: "If you obey, then happiness will be yours in this world and the Hereafter." },
        { tf: false, q: "Messengers must make everyone believe.", why: "All we have to do is to convey to you the Message with which we have been sent." }
      ]
    },
    {
      slug: "an-evil-omen",
      title: "An evil omen",
      line: "The people blamed the Messengers for bad luck and made threats.",
      facts: ["Blaming others for misfortune", "Threats instead of thought"],
      quote: q36(18),
      source: ik(18, "Qatadah said they claimed that if anything bad happened to them, it would be because of the Messengers.", "if something bad befalls us, it will be because of you"),
      difficulty: 3,
      questions: [
        { q: "What did they see in the Messengers, in 36:18?", a: "An evil omen", wrong: ["A blessing", "A cure", "A friend"], why: "For us, we see an evil omen from you." },
        { q: "What did they mean, per Qatadah?", a: "Bad things are your fault", wrong: ["You bring rain", "You are wise", "You are rich"], why: "If something bad befalls us, it will be because of you." },
        { q: "What did they threaten, in 36:18?", a: "To stone them", wrong: ["To praise them", "To feed them", "To follow them"], why: "If you cease not, we will surely stone you." }
      ]
    },
    {
      slug: "your-omen-is-with-you",
      title: "Your omen is with you",
      line: "The Messengers said: your bad omen is your own doing.",
      facts: ["All things are from Allah", "Reminders are a mercy"],
      quote: q36(19),
      source: ik(19, "Qatadah said: because we reminded you about Allah, you saw an evil omen in us.", "Because we reminded you about Allah, you saw an evil omen in us"),
      difficulty: 4,
      questions: [
        { q: "Where is their omen, in 36:19?", a: "With themselves", wrong: ["With the stars", "With the birds", "With the Messengers"], why: "Your evil omens be with you!" },
        { q: "Why did they see an omen, per Qatadah?", a: "They were reminded of Allah", wrong: ["A black cat", "A bad dream", "A storm"], why: "Because we reminded you about Allah, you saw an evil omen in us." },
        { q: "What were the people called, in 36:19?", a: "Mischievous", wrong: ["Wise", "Humble", "Grateful"], why: "Nay, but you are a people mischievous." }
      ]
    },
    {
      slug: "a-man-came-running",
      title: "A man came running",
      line: "A man ran from the far end of town: follow the Messengers!",
      facts: ["He came to support them", "Known for charity, by report"],
      quote: q36(20),
      source: ik(20, "He urged his people to follow the Messengers who had come to them.", "he urged his people to follow the Messengers who had come to them"),
      difficulty: 3,
      questions: [
        { q: "Where did the man come from, in 36:20?", a: "The farthest part of town", wrong: ["The palace", "The sea", "Another country"], why: "And there came a man running from the farthest part of the town." },
        { q: "What did he urge, in 36:20?", a: "Obey the Messengers", wrong: ["Leave the town", "Build a wall", "Stay silent"], why: "He said, O my people! Obey the Messengers." },
        { q: "What was he known for, per the reports?", a: "Great charity", wrong: ["Great wealth", "Poetry", "Fighting"], why: "He was very charitable, giving half of his earnings in charity." }
      ]
    },
    {
      slug: "they-ask-no-wages",
      title: "They ask no wages",
      line: "Follow those who ask no wages and are rightly guided.",
      facts: ["Sincere callers seek no payment", "Their call is to Allah alone"],
      quote: q36(21),
      source: ik(21, "They ask nothing for the message and are rightly guided in calling to Allah alone.", "they are rightly-guided in what they are calling you to"),
      difficulty: 3,
      questions: [
        { q: "What do the Messengers not ask, in 36:21?", a: "Wages", wrong: ["Prayer", "Faith", "Thanks to Allah"], why: "Obey those who ask no wages of you." },
        { q: "To what do they call, per Ibn Kathir?", a: "Worship of Allah alone", wrong: ["Their own fame", "A new king", "Trade"], why: "The worship of Allah Alone with no partner or associate." },
        { tf: true, q: "Asking nothing in return is a sign of sincerity.", why: "Obey those who ask no wages of you, and who are rightly guided." }
      ]
    },
    {
      slug: "why-should-i-not-worship",
      title: "Why should I not worship Him?",
      line: "Why should I not worship the One Who created me?",
      facts: ["All return to Him", "Worship is owed to the Creator"],
      quote: q36(22),
      source: ik(22, "What could stop me from sincerely worshipping the One Who created me, alone?", "what is there to stop me from sincerely worshipping the One Who has created me"),
      difficulty: 2,
      questions: [
        { q: "Whom should he worship, in 36:22?", a: "The One Who created him", wrong: ["His elders", "The king", "The idols"], why: "And why should I not worship Him Who has created me." },
        { q: "To Whom will all return, in 36:22?", a: "To Allah", wrong: ["To the town", "To the earth only", "To no one"], why: "And to Whom you shall be returned." },
        { q: "When is the return, per Ibn Kathir?", a: "The Day of Resurrection", wrong: ["Next week", "At sunset", "Never"], why: "On the Day of Resurrection, when He will requite you for your deeds." }
      ]
    },
    {
      slug: "their-intercession-is-useless",
      title: "Their help is useless",
      line: "False gods cannot help or save me if Allah wills harm.",
      facts: ["Only Allah removes harm", "Idols neither help nor hurt"],
      quote: q36(23),
      source: ik(23, "These idols can neither harm nor benefit, nor save anyone from trouble.", "These idols can neither cause any harm nor bring any benefit"),
      difficulty: 3,
      questions: [
        { q: "Can false gods save him, in 36:23?", a: "No", wrong: ["Yes", "Sometimes", "On Fridays"], why: "Their intercession will be of no use for me whatsoever, nor can they save me." },
        { q: "What can idols do, per Ibn Kathir?", a: "Neither harm nor benefit", wrong: ["Bring rain", "Heal", "Protect"], why: "These idols can neither cause any harm nor bring any benefit." },
        { q: "What kind of question is Shall I take gods?", a: "A rebuke", wrong: ["A real request", "A joke", "A riddle"], why: "This is a rhetorical question intended to rebuke and chastise." }
      ]
    },
    {
      slug: "plain-error",
      title: "Plain error",
      line: "Taking other gods would put me in plain error.",
      facts: ["Shirk is clear error", "He reasoned it out aloud"],
      quote: q36(24),
      source: ik(24, "He said he would be in clear error if he took idols as gods instead of Allah.", "if I were to take them as gods instead of Allah"),
      difficulty: 2,
      questions: [
        { q: "What would he be in, in 36:24?", a: "Plain error", wrong: ["Great luck", "Safety", "Wealth"], why: "Then verily, I should be in plain error." },
        { q: "When would that be, per Ibn Kathir?", a: "If he took other gods", wrong: ["If he travelled", "If he slept", "If he fasted"], why: "If I were to take them as gods instead of Allah." },
        { tf: true, q: "Worshipping others besides Allah is clear error.", why: "Then verily, I should be in plain error." }
      ]
    },
    {
      slug: "i-have-believed",
      title: "I have believed",
      line: "I have believed in your Lord, so listen to me!",
      facts: ["He may have spoken to the Messengers", "He asked them to witness his faith"],
      quote: q36(25),
      source: ik(25, "Ibn Jarir said the more apparent meaning is that he asked the Messengers to witness his faith before Allah.", "This interpretation is more apparent"),
      difficulty: 3,
      questions: [
        { q: "What did he declare, in 36:25?", a: "I have believed in your Lord", wrong: ["I will leave", "I am king", "I am afraid"], why: "Verily, I have believed in your Lord, so listen to me!" },
        { q: "Whom was he speaking to, per Ibn Jarir?", a: "The Messengers", wrong: ["The king", "The traders", "The children"], why: "Others said that this was addressed to the Messengers. This interpretation is more apparent." },
        { q: "What did he ask them to do, per Ibn Jarir?", a: "Witness his faith", wrong: ["Pay him", "Hide him", "Leave town"], why: "Listen to what I say and bear witness to what I say before my Lord." }
      ]
    },
    {
      slug: "enter-paradise",
      title: "Enter Paradise",
      line: "He was told: enter Paradise; he wished his people knew.",
      facts: ["His people took his life", "He still wished them well"],
      quote: q36(26),
      source: ik(26, "Ibn Abbas said he was sincere to his people in life and after death, wishing they knew his reward.", "He was sincere towards his people during his lifetime"),
      difficulty: 3,
      questions: [
        { q: "What was he told, in 36:26?", a: "Enter Paradise", wrong: ["Go home", "Run away", "Wait"], why: "It was said: Enter Paradise." },
        { q: "What did he wish, in 36:26?", a: "That his people knew", wrong: ["Revenge", "Gold", "A palace"], why: "He said: Would that my people knew." },
        { q: "How was he towards his people, per Ibn Abbas?", a: "Sincere, even after death", wrong: ["Angry", "Bitter", "Silent"], why: "He was sincere towards his people during his lifetime and after his death." }
      ]
    },
    {
      slug: "advising-even-after-death",
      title: "Advising even after death",
      line: "The believing man still wished good for his people after death.",
      facts: ["As-Sa'di explains", "Sincere advice"],
      quote: q36(26),
      source: saadi(36, 26, "As-Sa'di says the believing man, told to enter Paradise, still advised his people after his death as he did in life, wishing they knew how Allah forgave and honored him, so they would leave shirk.", "وناصحا لقومه بعد وفاته، كما نصح لهم في حياته"),
      difficulty: 2,
      questions: [
        { q: "What did the believing man wish after entering Paradise?", a: "That his people knew", wrong: ["Revenge on them", "To forget them", "Nothing"], why: "He wished his people knew how Allah forgave him." },
        { q: "Why did he wish they knew, per as-Sa'di on 36:26?", a: "So they would leave shirk", wrong: ["To make them jealous", "To boast", "To scare them"], why: "If they knew, they would not stay on shirk." },
        { tf: true, q: "He advised his people after death as he did in life.", why: "As-Sa'di on 36:26." }
      ]
    },
    {
      slug: "among-the-honoured",
      title: "Among the honoured",
      line: "My Lord has forgiven me and made me one of the honoured.",
      facts: ["Honoured for his faith", "He wanted them guided"],
      quote: q36(27),
      source: ik(27, "Abu Mijlaz said he was honoured because of his faith in his Lord and belief in the Messengers.", "Because of my faith in my Lord and my belief in the Messengers"),
      difficulty: 3,
      questions: [
        { q: "What did his Lord do, in 36:27?", a: "Forgave and honoured him", wrong: ["Left him", "Forgot him", "Made him king"], why: "That my Lord has forgiven me, and made me of the honored ones!" },
        { q: "Why was he honoured, per Abu Mijlaz?", a: "His faith in Allah", wrong: ["His wealth", "His family", "His strength"], why: "Because of my faith in my Lord and my belief in the Messengers." },
        { tf: true, q: "He was keen that his people be guided.", why: "He was so keen that his people should be guided." }
      ]
    }
  ]
};

/** Ayahs 28 to 54: one blast and the town fell still, the signs of earth, sky and sea, and the Trumpet of the Resurrection. */
const YASIN_TWO: DeepUnit = {
  key: "yasin2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-yasin",
  name: "Ya-Sin, ayahs 28 to 54",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ya-Sin",
  lessons: [
    {
      slug: "no-army-was-needed",
      title: "No army was needed",
      line: "Allah sent no army of angels against them; none was needed.",
      facts: ["The matter was simpler than that", "Allah defends His friends"],
      quote: q36(28),
      source: ik(28, "Allah did not need to send an army of angels; the matter was simpler than that.", "the matter was simpler than that"),
      difficulty: 3,
      questions: [
        { q: "What did Allah not send, in 36:28?", a: "An army from heaven", wrong: ["Rain", "A Messenger", "A book"], why: "And We sent not against his people after him an army from the heaven." },
        { q: "Why, per Ibn Masud?", a: "It was simpler than that", wrong: ["They repented", "They left", "They were hidden"], why: "We did not seek to outnumber them, for the matter was simpler than that." },
        { tf: true, q: "Allah needs no help to carry out His will.", why: "Nor was it needful for Us to send such a thing." }
      ]
    },
    {
      slug: "one-blast",
      title: "One blast",
      line: "Just one blast, and they all fell still.",
      facts: ["One command is enough", "A lesson for all deniers"],
      quote: q36(29),
      source: ik(29, "Allah destroyed that tyrant king and his people, and they left no trace behind.", "leaving no trace behind"),
      difficulty: 3,
      questions: [
        { q: "What came upon them, in 36:29?", a: "One blast", wrong: ["A long war", "A famine", "A flood"], why: "It was but one Sayhah and lo! they all were still." },
        { q: "What remained of them, per Ibn Kathir?", a: "No trace", wrong: ["Their palaces", "Their markets", "Their idols"], why: "They disappeared from the face of the earth, leaving no trace behind." },
        { tf: false, q: "A great army was needed to end them.", why: "It was but one Sayhah and lo! they all were still." }
      ]
    },
    {
      slug: "alas-for-mankind",
      title: "Alas for mankind",
      line: "Alas for people: every Messenger who came, they mocked.",
      facts: ["Regret on the Last Day", "They neglected Allah's command"],
      quote: q36(30),
      source: ik(30, "Qatadah said: alas for mankind, who have neglected the command of Allah.", "Alas for mankind, who have neglected the command of Allah"),
      difficulty: 3,
      questions: [
        { q: "What did they do to every Messenger, in 36:30?", a: "Mock him", wrong: ["Crown him", "Pay him", "Follow him"], why: "There never came a Messenger to them but they used to mock at him." },
        { q: "Why alas, per Qatadah?", a: "They neglected Allah's command", wrong: ["They were poor", "They were few", "They were far"], why: "Alas for mankind, who have neglected the command of Allah." },
        { q: "When will they regret, per Ibn Kathir?", a: "The Day of Resurrection", wrong: ["Every morning", "Never", "In childhood"], why: "They will feel regret and sorrow on the Day of Resurrection." }
      ]
    },
    {
      slug: "they-will-not-return",
      title: "They will not return",
      line: "Past generations were destroyed and will never come back.",
      facts: ["We live in this world once", "No cycle of rebirth"],
      quote: q36(31),
      source: ik(31, "People come to this world only once and will not return to it, refuting belief in reincarnation.", "They came to this world only once, and will not return to it"),
      difficulty: 4,
      questions: [
        { q: "Will past generations return, in 36:31?", a: "No", wrong: ["Yes, as animals", "Yes, as kings", "Every century"], why: "Verily, they will not return to them." },
        { q: "How many times do we come to this world, per Ibn Kathir?", a: "Once", wrong: ["Twice", "Seven times", "Endlessly"], why: "They came to this world only once, and will not return to it." },
        { q: "What false belief does it refute, per Ibn Kathir?", a: "Reincarnation", wrong: ["Prayer", "Charity", "Fasting"], why: "This was the belief in the cycle of reincarnation; Allah refuted their false belief." }
      ]
    },
    {
      slug: "all-brought-before-us",
      title: "All brought before Us",
      line: "Every single one of them will be brought before Allah.",
      facts: ["Past and future nations", "Judged by their deeds"],
      quote: q36(32),
      source: ik(32, "All past nations and those to come will be gathered and brought to account before Allah.", "all of the past nations and those that are yet to come"),
      difficulty: 3,
      questions: [
        { q: "Who will be brought before Allah, in 36:32?", a: "Everyone", wrong: ["Only kings", "Only the good", "Only the last"], why: "And surely, all, everyone of them will be brought before Us." },
        { q: "Which nations, per Ibn Kathir?", a: "Past and future", wrong: ["Only past", "Only Arab", "Only future"], why: "All of the past nations and those that are yet to come, will be gathered." },
        { tf: true, q: "Each will be judged by good and evil deeds.", why: "They will be requited according to their good and evil deeds." }
      ]
    },
    {
      slug: "the-dead-land-lives",
      title: "The dead land lives",
      line: "Dead land given life and grain is a sign for them.",
      facts: ["Proof of the Creator", "Proof of resurrection"],
      quote: q36(33),
      source: ik(33, "Dead land coming to life is evidence of the Creator and His power to raise the dead.", "evidence for them of the existence of the Creator"),
      difficulty: 2,
      questions: [
        { q: "What is the sign, in 36:33?", a: "The dead land given life", wrong: ["A shooting star", "A comet", "A dream"], why: "And a sign for them is the dead land. We give it life." },
        { q: "What does it prove, per Ibn Kathir?", a: "The Creator and resurrection", wrong: ["Good luck", "Rain is random", "Nothing"], why: "Evidence of the existence of the Creator and His power to resurrect the dead." },
        { q: "What comes from it, in 36:33?", a: "Grains to eat", wrong: ["Gold", "Stones", "Smoke"], why: "We bring forth from it grains, so that they eat thereof." }
      ]
    },
    {
      slug: "palms-grapes-and-springs",
      title: "Palms, grapes and springs",
      line: "Allah made gardens of palms and grapes, with gushing springs.",
      facts: ["Rivers flow where needed", "Many kinds of fruit"],
      quote: q36(34),
      source: ik(34, "Allah made rivers flow to the places where they are needed, so people may eat their fruits.", "rivers which flow to the places where they are needed"),
      difficulty: 2,
      questions: [
        { q: "What gardens are named, in 36:34?", a: "Date palms and grapes", wrong: ["Apples and pears", "Wheat only", "Roses"], why: "And We have made therein gardens of date palms and grapes." },
        { q: "What gushes forth, in 36:34?", a: "Springs of water", wrong: ["Oil", "Fire", "Sand"], why: "And We have caused springs of water to gush forth therein." },
        { q: "Where do rivers flow, per Ibn Kathir?", a: "Where they are needed", wrong: ["Only to the sea", "Nowhere", "Uphill only"], why: "Rivers which flow to the places where they are needed." }
      ]
    },
    {
      slug: "will-they-not-give-thanks",
      title: "Will they not give thanks?",
      line: "They eat fruit their hands never made; will they not thank Him?",
      facts: ["Growth is by Allah's mercy", "Countless blessings"],
      quote: q36(35),
      source: ik(35, "Ibn Abbas and Qatadah said all of that comes only by Allah's mercy, not by people's own strength.", "not by their own efforts and labor and strength"),
      difficulty: 3,
      questions: [
        { q: "Who made the fruit, in 36:35?", a: "Not their hands", wrong: ["Their hands alone", "The kings", "The stars"], why: "So that they may eat of the fruit thereof, and their hands made it not." },
        { q: "How does it come, per Ibn Abbas?", a: "By Allah's mercy", wrong: ["By luck", "By force", "By magic"], why: "All of that could only come about by the mercy of Allah, not by their own efforts." },
        { q: "What should they do, in 36:35?", a: "Give thanks", wrong: ["Boast", "Hoard", "Complain"], why: "Will they not then give thanks?" }
      ]
    },
    {
      slug: "glory-to-the-creator-of-pairs",
      title: "He created all pairs",
      line: "Glory to Him Who made pairs of plants, people and more.",
      facts: ["Male and female", "Creatures we do not know"],
      quote: q36(36),
      source: ik(36, "Allah created pairs of crops, people as male and female, and creatures people know nothing of.", "different kinds of creatures of which they know nothing"),
      difficulty: 3,
      questions: [
        { q: "What did Allah create in pairs, in 36:36?", a: "All things", wrong: ["Only birds", "Only stars", "Nothing"], why: "Glory be to Him Who has created all the pairs." },
        { q: "How are humans paired, per Ibn Kathir?", a: "Male and female", wrong: ["Old and young", "Rich and poor", "Tall and short"], why: "As well as of their own kind, means, He made them into male and female." },
        { q: "What is that which they know not, per Ibn Kathir?", a: "Unknown creatures", wrong: ["Old stories", "Lost coins", "Hidden roads"], why: "Different kinds of creatures of which they know nothing." }
      ]
    },
    {
      slug: "the-night-a-sign",
      title: "The night, a sign",
      line: "Night is a sign: the day is pulled away and darkness falls.",
      facts: ["Night and day follow each other", "Sunset ends the fast"],
      quote: q36(37),
      source: hadith("bukhari", "1954", "Umar ibn al-Khattab", "Sahih", "The Prophet ﷺ said: when night comes from this side, the day goes from that side and the sun sets, the fasting person breaks his fast.", "then the fasting person should break his fast"),
      difficulty: 3,
      questions: [
        { q: "What is withdrawn from the night, in 36:37?", a: "The day", wrong: ["The moon", "The stars", "The wind"], why: "We withdraw therefrom the day, and behold, they are in darkness." },
        { q: "When does a fasting person break the fast, in the hadith?", a: "When the sun sets", wrong: ["At noon", "At dawn", "At midnight"], why: "When night falls and the sun sets, then the fasting person should break his fast." },
        { tf: true, q: "Night and day follow one another by Allah's plan.", why: "He has caused them to follow one another, so that one comes and the other goes." }
      ]
    },
    {
      slug: "the-sun-runs-its-course",
      title: "The sun runs its course",
      line: "The sun runs to its appointed term, decreed by the All-Knowing.",
      facts: ["It has a set time", "None can oppose His decree"],
      quote: q36(38),
      source: ik(38, "Qatadah said the sun has an appointed time that it will not go beyond.", "It has an appointed time and it will not go beyond that"),
      difficulty: 3,
      questions: [
        { q: "How does the sun run, in 36:38?", a: "On its fixed course", wrong: ["Randomly", "Backwards", "Not at all"], why: "And the sun runs on its fixed course for a term appointed." },
        { q: "What does the term mean, per Qatadah?", a: "An appointed time", wrong: ["A song", "A name", "A colour"], why: "It has an appointed time and it will not go beyond that." },
        { q: "Whose decree is it, in 36:38?", a: "The Almighty, All-Knowing", wrong: ["The stars", "Chance", "The kings"], why: "That is the decree of the Almighty, the All-Knowing." }
      ]
    },
    {
      slug: "stages-of-the-moon",
      title: "Stages of the moon",
      line: "The moon has stages until it looks like an old date stalk.",
      facts: ["Full on the fourteenth night", "Months are counted by it"],
      quote: q36(39),
      source: ik(39, "The moon grows until it is full on the fourteenth night, then wanes until it looks like an old curved stalk.", "until it becomes full on the fourteenth night of the month"),
      difficulty: 3,
      questions: [
        { q: "What has Allah decreed for the moon, in 36:39?", a: "Stages", wrong: ["One shape", "No light", "Two suns"], why: "And the moon, We have decreed for it stages." },
        { q: "When is it full, per Ibn Kathir?", a: "The fourteenth night", wrong: ["The first night", "The tenth night", "The last night"], why: "Until it becomes full on the fourteenth night of the month." },
        { q: "What does it end up like, in 36:39?", a: "An old curved date stalk", wrong: ["A ball", "A star", "A ring"], why: "Till it returns like the old dried curved date stalk." }
      ]
    },
    {
      slug: "each-in-an-orbit",
      title: "Each in an orbit",
      line: "The sun cannot catch the moon; all float, each in its orbit.",
      facts: ["Each has its limit", "Night and day never gap"],
      quote: q36(40),
      source: ik(40, "Mujahid said each of them has a limit which it does not transgress or fall short of.", "Each of them has a limit which it does not transgress or fall short of"),
      difficulty: 3,
      questions: [
        { q: "What can the sun not do, in 36:40?", a: "Overtake the moon", wrong: ["Shine", "Set", "Rise"], why: "It is not for the sun to overtake the moon." },
        { q: "How do they move, in 36:40?", a: "Float in orbits", wrong: ["Stand still", "Fall down", "Bounce"], why: "They all float, each in an orbit." },
        { q: "What does each have, per Mujahid?", a: "A limit", wrong: ["A rival", "A king", "A rest day"], why: "Each of them has a limit which it does not transgress or fall short of." }
      ]
    },
    {
      slug: "the-laden-ship",
      title: "The laden ship",
      line: "A sign: Allah carried their forefathers in the laden ship.",
      facts: ["The ship of Nuh", "Laden means filled"],
      quote: q36(41),
      source: ik(41, "Ad-Dahhak, Qatadah and Ibn Zayd said the laden ship was the ship of Nuh.", "This was the ship of Nuh"),
      difficulty: 3,
      questions: [
        { q: "Which ship is meant, per Qatadah?", a: "The ship of Nuh", wrong: ["A trade ship", "A fishing boat", "A raft"], why: "This was the ship of Nuh, peace be upon him." },
        { q: "What does laden mean, per Ibn Abbas?", a: "Filled", wrong: ["Empty", "Broken", "Small"], why: "Ibn Abbas said, Laden means filled." },
        { q: "Whom did it carry, per Ibn Kathir?", a: "Their forefathers", wrong: ["Only animals", "Only kings", "No one"], why: "We bore their offspring means, their forefathers." }
      ]
    },
    {
      slug: "the-like-of-it",
      title: "The like of it",
      line: "Allah made for them things like it to ride.",
      facts: ["Ships built after Nuh's", "Camels, ships of the land"],
      quote: q36(42),
      source: ik(42, "Ibn Abbas said this refers to the ships made after the ship of Nuh, which were similar to it.", "the ships which were made after the ship of Nuh"),
      difficulty: 3,
      questions: [
        { q: "What did Allah create for them, in 36:42?", a: "Things like it to ride", wrong: ["Wings", "Towers", "Nothing"], why: "And We have created for them of the like thereunto, on which they ride." },
        { q: "What does it refer to, per Ibn Abbas?", a: "Ships after Nuh's", wrong: ["Horses only", "Clouds", "Carpets"], why: "This refers to the ships which were made after the ship of Nuh." },
        { tf: true, q: "Another view says the camel, ship of the land.", why: "This means the camel, for it is the ship of the land." }
      ]
    },
    {
      slug: "if-we-willed",
      title: "If We willed",
      line: "If Allah willed, the sea could take them, with none to help.",
      facts: ["Safety at sea is a mercy", "No one else can save"],
      quote: q36(43),
      source: ik(43, "There would be no one to save them from their predicament.", "there will be no one to save them from their predicament"),
      difficulty: 3,
      questions: [
        { q: "Who is meant, in 36:43, per Ibn Kathir?", a: "Those aboard ships", wrong: ["Those in houses", "Birds", "Fish"], why: "And if We will, We shall drown them, means, those who are on board the ships." },
        { q: "Who could save them, per Ibn Kathir?", a: "No one but Allah", wrong: ["Sailors", "Kings", "Idols"], why: "There will be no one to save them from their predicament." },
        { tf: true, q: "Safe travel by sea is a gift from Allah.", why: "And if We will, We shall drown them, and there will be no shout for them." }
      ]
    },
    {
      slug: "a-mercy-for-a-while",
      title: "A mercy for a while",
      line: "Only by Allah's mercy are they kept safe, for a while.",
      facts: ["Safe on land and sea", "Until a time Allah knows"],
      quote: q36(44),
      source: ik(44, "By His mercy Allah makes travel easy on land and sea and keeps people safe until an appointed time.", "We make it easy for you to travel on land and sea"),
      difficulty: 3,
      questions: [
        { q: "What keeps them safe, in 36:44?", a: "Mercy from Allah", wrong: ["Luck", "Strong ships alone", "Charms"], why: "Unless it be a mercy from Us, and as an enjoyment for a while." },
        { q: "What does His mercy make easy, per Ibn Kathir?", a: "Travel on land and sea", wrong: ["Laziness", "Sin", "Boasting"], why: "By Our mercy We make it easy for you to travel on land and sea." },
        { q: "Until when, per Ibn Kathir?", a: "A time Allah knows", wrong: ["Forever", "Ten years", "One day"], why: "Until a time that is known to Allah." }
      ]
    },
    {
      slug: "beware-before-and-behind",
      title: "Beware before and behind",
      line: "Told to beware for mercy's sake, they paid no attention.",
      facts: ["Mindful of past sins", "And of the Day to come"],
      quote: q36(45),
      source: ik(45, "If you fear such things, Allah will have mercy on you and save you from His punishment.", "if you fear such things Allah will have mercy on you"),
      difficulty: 3,
      questions: [
        { q: "Why were they told to beware, in 36:45?", a: "To receive mercy", wrong: ["To get rich", "To be famous", "To win wars"], why: "Beware of that which is before you, and that which is behind you, in order that you may receive mercy." },
        { q: "What does it refer to, per Mujahid?", a: "Sins", wrong: ["Enemies", "Animals", "Storms"], why: "Mujahid said, This refers to sins." },
        { q: "What does fearing bring, per Ibn Kathir?", a: "Allah's mercy", wrong: ["Sadness only", "Nothing", "Loss"], why: "If you fear such things Allah will have mercy on you." }
      ]
    },
    {
      slug: "they-turned-away",
      title: "They turned away",
      line: "Every sign that came from their Lord, they turned away from.",
      facts: ["Signs of Tawhid", "They did not benefit"],
      quote: q36(46),
      source: ik(46, "They did not accept or benefit from the signs of Tawhid and the truth of the Messengers.", "they did not accept it or benefit from it"),
      difficulty: 3,
      questions: [
        { q: "What did they do with every sign, in 36:46?", a: "Turned away", wrong: ["Studied it", "Wrote it", "Shared it"], why: "And never came an Ayah from among the Ayat of their Lord to them, but they did turn away from it." },
        { q: "What signs are meant, per Ibn Kathir?", a: "Signs of Tawhid", wrong: ["Road signs", "Weather signs", "Star signs"], why: "Signs of Tawhid and the truth of the Messengers." },
        { tf: false, q: "They benefited from the signs.", why: "They did not accept it or benefit from it." }
      ]
    },
    {
      slug: "shall-we-feed-them",
      title: "Shall we feed them?",
      line: "Told to give, they said: why feed those Allah could feed?",
      facts: ["An excuse not to give", "Charity never lessens wealth"],
      quote: q36(47),
      source: hadith("muslim", "2588", "Abu Hurairah", "Sahih", "The Prophet ﷺ said charity does not decrease wealth, and Allah raises those who forgive and are humble.", "Charity does not decrease wealth"),
      difficulty: 4,
      questions: [
        { q: "What were they told, in 36:47?", a: "Spend from Allah's provision", wrong: ["Build towers", "Go to war", "Stay home"], why: "Spend of that with which Allah has provided you." },
        { q: "What excuse did they give, in 36:47?", a: "Allah could feed them", wrong: ["We are poor", "We forgot", "We are busy"], why: "Shall we feed those whom, if Allah willed, He would have fed?" },
        { q: "What does charity not do, in the hadith?", a: "Decrease wealth", wrong: ["Help anyone", "Count", "Bring reward"], why: "Charity does not decrease wealth." }
      ]
    },
    {
      slug: "when-is-this-promise",
      title: "When is this promise?",
      line: "They asked: when will this promise come, if you are truthful?",
      facts: ["They thought it would never come", "They tried to hurry it"],
      quote: q36(48),
      source: ik(48, "The disbelievers thought the Day of Resurrection would never come to pass.", "the disbelievers thought that the Day of Resurrection would never come to pass"),
      difficulty: 2,
      questions: [
        { q: "What did they ask, in 36:48?", a: "When will the promise come?", wrong: ["Where is the market?", "Who is king?", "What is for dinner?"], why: "When will this promise be fulfilled, if you are truthful?" },
        { q: "What did they think, per Ibn Kathir?", a: "It would never come", wrong: ["It came already", "It was tomorrow", "It was a dream"], why: "The disbelievers thought that the Day of Resurrection would never come to pass." },
        { tf: true, q: "Mocking questions do not delay the Day.", why: "Those who believe not therein seek to hasten it." }
      ]
    },
    {
      slug: "a-single-blast",
      title: "A single blast",
      line: "Only one blast awaits them, while they argue as usual.",
      facts: ["People busy in markets", "No time to prepare"],
      quote: q36(49),
      source: ik(49, "The Trumpet will be blown while people are in their markets and work, arguing as they usually do.", "while the people are in their marketplaces and places of work"),
      difficulty: 3,
      questions: [
        { q: "What awaits them, in 36:49?", a: "A single blast", wrong: ["A long warning", "A letter", "A storm"], why: "They await only but a single Sayhah which will seize them while they are disputing." },
        { q: "Where will people be, per Ibn Kathir?", a: "In markets and work", wrong: ["All asleep", "All praying", "All travelling"], why: "While the people are in their marketplaces and places of work." },
        { q: "Who will blow the Trumpet, per Ibn Kathir?", a: "Israfil", wrong: ["Jibril", "Mikail", "Malik"], why: "Allah will command Israfil to blow into the Trumpet." }
      ]
    },
    {
      slug: "no-time-for-a-will",
      title: "No time for a will",
      line: "They cannot leave a will or return to their families.",
      facts: ["It comes suddenly", "Prepare now"],
      quote: q36(50),
      source: ik(50, "They will not be able to make bequests about their possessions, because the matter is more serious than that.", "because the matter is more serious than that"),
      difficulty: 3,
      questions: [
        { q: "What can they not make, in 36:50?", a: "A bequest", wrong: ["A sound", "A step", "A wish"], why: "Then they will not be able to make bequest." },
        { q: "Where can they not return, in 36:50?", a: "To their family", wrong: ["To work", "To bed", "To school"], why: "Nor they will return to their family." },
        { tf: true, q: "The Hour comes suddenly, so prepare now.", why: "They will not be able to make bequest, because the matter is more serious than that." }
      ]
    },
    {
      slug: "out-of-the-graves",
      title: "Out of the graves",
      line: "The Trumpet is blown and they rush from graves to their Lord.",
      facts: ["The blast of resurrection", "They walk quickly"],
      quote: q36(51),
      source: ik(51, "This is the blast of the resurrection, when people come forth from their graves walking quickly.", "means they will be walking quickly"),
      difficulty: 3,
      questions: [
        { q: "Where will they come out from, in 36:51?", a: "The graves", wrong: ["The sea", "The sky", "Caves"], why: "Behold from the graves they will come out quickly to their Lord." },
        { q: "Which blast is it, per Ibn Kathir?", a: "The blast of resurrection", wrong: ["The first", "A wind", "A thunder"], why: "This will be the third blast of the trumpet, the trumpet blast of the resurrection." },
        { q: "What does Yansilun mean, per Ibn Kathir?", a: "Walking quickly", wrong: ["Sleeping", "Crying", "Sitting"], why: "Yansilun means they will be walking quickly." }
      ]
    },
    {
      slug: "who-raised-us",
      title: "Who raised us up?",
      line: "Who raised us from our sleep? The Messengers spoke truth.",
      facts: ["What the Most Gracious promised", "Believers or angels reply"],
      quote: q36(52),
      source: ik(52, "Al-Hasan said the angels will reply; others said the believers will. Both are possible.", "There is no contradiction because both are possible"),
      difficulty: 4,
      questions: [
        { q: "What will they ask, in 36:52?", a: "Who raised us up?", wrong: ["Where is food?", "Who is king?", "What time is it?"], why: "Woe to us! Who has raised us up from our place of sleep." },
        { q: "What will they hear, in 36:52?", a: "The Messengers spoke truth", wrong: ["Go back to sleep", "Nothing", "Run away"], why: "This is what the Most Gracious had promised, and the Messengers spoke truth!" },
        { q: "Who replies, per Ibn Kathir?", a: "Angels or believers", wrong: ["Their idols", "Their kings", "No one"], why: "The angels will reply to them in this manner. There is no contradiction because both are possible." }
      ]
    },
    {
      slug: "all-brought-at-once",
      title: "All brought at once",
      line: "A single blast, and all are brought before Allah.",
      facts: ["One command gathers all", "Quicker than a blink"],
      quote: q36(53),
      source: ik(53, "Allah will issue but one command, and all of them will be gathered together.", "We will issue but one command, and all of them will be gathered together"),
      difficulty: 3,
      questions: [
        { q: "How many blasts gather them, in 36:53?", a: "One", wrong: ["Ten", "Seven", "A hundred"], why: "It will be but a single Sayhah, so behold they will all be brought up before Us!" },
        { q: "What does Allah issue, per Ibn Kathir?", a: "One command", wrong: ["Many letters", "A long speech", "A warning bell"], why: "We will issue but one command, and all of them will be gathered together." },
        { tf: true, q: "The Hour is as quick as the blink of an eye.", why: "And the matter of the Hour is not but as a twinkling of the eye, or even nearer." }
      ]
    },
    {
      slug: "none-will-be-wronged",
      title: "None will be wronged",
      line: "That Day no soul is wronged; each gets what it did.",
      facts: ["Perfect justice", "Deeds come back to us"],
      quote: q36(54),
      source: ik(54, "On that Day none will be wronged in anything with regard to his deeds.", "This Day, none will be wronged in anything"),
      difficulty: 2,
      questions: [
        { q: "Who will be wronged, in 36:54?", a: "No one", wrong: ["The poor", "The weak", "Children"], why: "This Day, none will be wronged in anything." },
        { q: "How are people repaid, in 36:54?", a: "For what they did", wrong: ["For others' deeds", "By luck", "By wealth"], why: "Nor will you be requited anything except that which you used to do." },
        { tf: false, q: "Some will be punished for deeds they never did.", why: "Nor will you be requited anything except that which you used to do." }
      ]
    }
  ]
};

/** Ayahs 55 to 83: the joy of Paradise, limbs that speak, the Quran is not poetry, the bone that was crumbled, and Be! and it is. */
const YASIN_THREE: DeepUnit = {
  key: "yasin3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-yasin",
  name: "Ya-Sin, ayahs 55 to 83",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ya-Sin",
  lessons: [
    {
      slug: "busy-with-joy",
      title: "Busy with joy",
      line: "The people of Paradise will be busy with joyful things that Day.",
      facts: ["Too happy to worry", "A new life of delight"],
      quote: q36(55),
      source: ik(55, "Ibn Abbas said they will be rejoicing; Mujahid said busy with the delights they enjoy.", "With the delights which they are enjoying"),
      difficulty: 2,
      questions: [
        { q: "How are the people of Paradise, in 36:55?", a: "Busy with joyful things", wrong: ["Tired", "Worried", "Bored"], why: "Verily, the dwellers of the Paradise, that Day, will be busy with joyful things." },
        { q: "What are they busy with, per Mujahid?", a: "Their delights", wrong: ["Work", "Debts", "Chores"], why: "With the delights which they are enjoying." },
        { q: "What does it mean, per Ibn Abbas?", a: "They will be rejoicing", wrong: ["They will sleep", "They will travel", "They will study"], why: "Ibn Abbas said, This means that they will be rejoicing." }
      ]
    },
    {
      slug: "shade-and-thrones",
      title: "Shade and thrones",
      line: "They and their spouses rest in shade, reclining on couches.",
      facts: ["Shade of trees", "Beds beneath canopies"],
      quote: q36(56),
      source: ik(56, "Mujahid said the pleasant shade is the shade of trees; the thrones are beds beneath canopies.", "beds beneath canopies"),
      difficulty: 2,
      questions: [
        { q: "Who is with them, in 36:56?", a: "Their spouses", wrong: ["Their enemies", "Strangers", "No one"], why: "They and their wives will be in pleasant shade." },
        { q: "What shade is meant, per Mujahid?", a: "The shade of trees", wrong: ["Clouds", "Walls", "Tents"], why: "Will be in pleasant shade means, in the shade of trees." },
        { q: "What are the thrones, per the Salaf?", a: "Beds beneath canopies", wrong: ["Royal chairs", "Stone seats", "Horses"], why: "Throne means beds beneath canopies." }
      ]
    },
    {
      slug: "all-they-ask-for",
      title: "All they ask for",
      line: "They will have fruits there and all that they ask for.",
      facts: ["Fruits of every kind", "Every wish is found"],
      quote: q36(57),
      source: ik(57, "Whatever they ask for, they will find it, of all kinds and types.", "whatever they ask for, they will find it, all kinds and types"),
      difficulty: 2,
      questions: [
        { q: "What will they have, in 36:57?", a: "Fruits and all they ask", wrong: ["Only water", "Only bread", "Nothing new"], why: "They will have therein fruits and all that they ask for." },
        { q: "What kinds of fruit, per Ibn Kathir?", a: "All kinds", wrong: ["One kind", "Only dates", "Only grapes"], why: "They will have therein fruits means, of all kinds." },
        { tf: true, q: "In Paradise every request is found.", why: "Whatever they ask for, they will find it, all kinds and types." }
      ]
    },
    {
      slug: "salam-from-the-lord",
      title: "Salam from the Lord",
      line: "Peace: a word from the Lord, Most Merciful.",
      facts: ["Allah greets them with peace", "As-Salam is His Name"],
      quote: q36(58),
      source: ik(58, "Ibn Abbas said Allah Himself, Who is As-Salam, will grant peace to the people of Paradise.", "Who is the Peace (As-Salam) will grant peace to the people of Paradise"),
      difficulty: 3,
      questions: [
        { q: "What word is given, in 36:58?", a: "Salam, peace", wrong: ["Wait", "Leave", "Work"], why: "Salam (Peace!), a Word from the Lord, Most Merciful." },
        { q: "Who grants the peace, per Ibn Abbas?", a: "Allah Himself", wrong: ["A guard", "A king", "A neighbour"], why: "Allah Himself, Who is the Peace (As-Salam) will grant peace to the people of Paradise." },
        { q: "What will their greeting be on meeting Him, per 33:44?", a: "Salam", wrong: ["Silence", "A song", "A question"], why: "Their greeting on the Day they shall meet Him will be Salam." }
      ]
    },
    {
      slug: "get-apart-this-day",
      title: "Stand apart this Day",
      line: "The wrongdoers will be told to stand apart that Day.",
      facts: ["Two separate groups", "Believers apart from deniers"],
      quote: q36(59),
      source: ik(59, "Allah commands the disbelievers to stand apart from the believers, so people are in two groups.", "they will be divided into two separate groups"),
      difficulty: 3,
      questions: [
        { q: "What are the wrongdoers told, in 36:59?", a: "Get apart this Day", wrong: ["Come closer", "Sit down", "Go home"], why: "And O you the criminals! Get you apart this Day." },
        { q: "From whom do they stand apart, per Ibn Kathir?", a: "The believers", wrong: ["Their idols", "The angels", "Their families"], why: "He commands them to stand apart from the believers." },
        { q: "How many groups, per Ibn Kathir?", a: "Two", wrong: ["One", "Seven", "Ten"], why: "They will be divided into two separate groups." }
      ]
    },
    {
      slug: "do-not-worship-shaytan",
      title: "Do not worship Shaytan",
      line: "Did I not tell you, Children of Adam, not to obey Shaytan?",
      facts: ["He is a plain enemy", "Allah created and provided"],
      quote: q36(60),
      source: ik(60, "A rebuke to those who obeyed Shaytan though he was their enemy, and disobeyed Ar-Rahman Who provided for them.", "those who obey the Shaytan even though he was a plain enemy to them"),
      difficulty: 3,
      questions: [
        { q: "What were the Children of Adam told, in 36:60?", a: "Not to worship Shaytan", wrong: ["To fear the jinn", "To leave work", "To travel"], why: "Did I not command you, O Children of Adam, that you should not worship Shaytan?" },
        { q: "What is Shaytan to us, in 36:60?", a: "A plain enemy", wrong: ["A friend", "A teacher", "A guard"], why: "Verily, he is a plain enemy to you." },
        { tf: true, q: "Obeying Shaytan is a kind of worshipping him.", why: "Those who obey the Shaytan even though he was a plain enemy to them." }
      ]
    },
    {
      slug: "that-is-the-straight-path",
      title: "That is the straight path",
      line: "Worship Me: that is the straight path.",
      facts: ["Disobey Shaytan", "Worship Allah alone"],
      quote: q36(61),
      source: ik(61, "Allah commanded people to disobey Shaytan and worship Him, and that is the straight path.", "I commanded you to worship Me, and this is the straight path"),
      difficulty: 2,
      questions: [
        { q: "What is the straight path, in 36:61?", a: "Worshipping Allah", wrong: ["Getting rich", "Being famous", "Travelling far"], why: "And that you should worship Me. That is the straight path." },
        { q: "What else was commanded, per Ibn Kathir?", a: "To disobey Shaytan", wrong: ["To obey kings", "To fear people", "To hoard"], why: "I commanded you in the world to disobey the Shaytan." },
        { tf: true, q: "The straight path is worshipping Allah alone.", why: "And that you should worship Me. That is the straight path." }
      ]
    },
    {
      slug: "did-you-not-understand",
      title: "Did you not understand?",
      line: "He led a great many of you astray; did you not think?",
      facts: ["A great multitude misled", "Use your understanding"],
      quote: q36(62),
      source: ik(62, "Did you not have any understanding when you preferred to follow Shaytan over your Lord?", "did you not have any understanding"),
      difficulty: 3,
      questions: [
        { q: "How many did Shaytan mislead, in 36:62?", a: "A great multitude", wrong: ["No one", "Just one", "Only animals"], why: "And indeed he did lead astray a great multitude of you." },
        { q: "What does great multitude mean, per Mujahid?", a: "A large number of people", wrong: ["A few", "A city", "A tribe"], why: "Meaning, a large number of people." },
        { q: "What were they asked, in 36:62?", a: "Did you not understand?", wrong: ["Are you hungry?", "Where are you?", "Who are you?"], why: "Did you not then understand?" }
      ]
    },
    {
      slug: "what-you-were-promised",
      title: "What you were warned of",
      line: "This is the Fire you were warned about.",
      facts: ["The Messengers warned of it", "They did not believe"],
      quote: q36(63),
      source: ik(63, "This is what the Messengers warned you about, and you did not believe them.", "this is what the Messengers warned you about, and you did not believe them"),
      difficulty: 3,
      questions: [
        { q: "Who warned about it, per Ibn Kathir?", a: "The Messengers", wrong: ["Poets", "Kings", "Fortune tellers"], why: "This is what the Messengers warned you about, and you did not believe them." },
        { q: "Did the deniers believe the warning, per Ibn Kathir?", a: "No", wrong: ["Yes", "Half of it", "Later"], why: "And you did not believe them." },
        { tf: true, q: "The Quran warns so people can be saved.", why: "This is what the Messengers warned you about." }
      ]
    },
    {
      slug: "because-you-disbelieved",
      title: "Because you disbelieved",
      line: "They enter it that Day because they used to disbelieve.",
      facts: ["A result of their choice", "Justice, not wrong"],
      quote: q36(64),
      source: ik(64, "It will be said to them as a rebuke and warning after Hell is shown to them.", "after Hell has been shown to them as a rebuke"),
      difficulty: 3,
      questions: [
        { q: "Why do they enter it, in 36:64?", a: "They used to disbelieve", wrong: ["Bad luck", "No reason", "Others pushed"], why: "Enter therein this Day, for that you used to disbelieve." },
        { q: "When is it said, per Ibn Kathir?", a: "After it is shown to them", wrong: ["Before birth", "In childhood", "In dreams"], why: "It will be said after Hell has been shown to them as a rebuke and warning." },
        { tf: false, q: "Anyone enters it without a reason.", why: "Enter therein this Day, for that you used to disbelieve." }
      ]
    },
    {
      slug: "hands-will-speak",
      title: "Hands will speak",
      line: "Their mouths are sealed; hands and legs speak of what they did.",
      facts: ["The body bears witness", "No denial is possible"],
      quote: q36(65),
      source: hadith("muslim", "2969", "Anas ibn Malik", "Sahih", "The Prophet ﷺ smiled and told how a servant will refuse any witness but himself, so his mouth is sealed and his limbs speak.", "Then the seal would be set upon his mouth"),
      difficulty: 4,
      questions: [
        { q: "What will speak, in 36:65?", a: "Their hands", wrong: ["Their homes", "Their friends", "Their idols"], why: "This Day, We shall seal up their mouths, and their hands will speak to Us." },
        { q: "What happens to the mouth, in the hadith?", a: "It is sealed", wrong: ["It sings", "It laughs", "It eats"], why: "Then the seal would be set upon his mouth." },
        { q: "What did the Prophet ﷺ do first, in the hadith?", a: "He smiled", wrong: ["He wept", "He left", "He slept"], why: "We were in the company of Allah's Messenger ﷺ when he smiled." }
      ]
    },
    {
      slug: "if-we-willed-their-eyes",
      title: "If We willed",
      line: "If Allah willed, He could take their sight; how would they see?",
      facts: ["Guidance is Allah's gift", "The path means the truth"],
      quote: q36(66),
      source: ik(66, "Ibn Zayd said the path is the truth: how could they see it if Allah covered their eyes?", "How could they see when We have covered their eyes"),
      difficulty: 4,
      questions: [
        { q: "What could Allah do, in 36:66?", a: "Wipe out their eyes", wrong: ["Give them wings", "Make them kings", "Nothing"], why: "We would surely have wiped out their eyes, so that they would struggle for the path." },
        { q: "What is the path, per Ibn Zayd?", a: "The truth", wrong: ["A road", "A river", "A rope"], why: "Ibn Zayd said the meaning of path is the truth." },
        { tf: true, q: "Seeing the truth is a gift from Allah.", why: "If We willed, We could have misguided them all away from true guidance." }
      ]
    },
    {
      slug: "transformed-in-place",
      title: "Changed in their place",
      line: "If Allah willed, He could fix them in place, unable to move.",
      facts: ["His power over all", "His mercy gives time"],
      quote: q36(67),
      source: ik(67, "As-Suddi said: We could have changed their form.", "We could have changed their form"),
      difficulty: 4,
      questions: [
        { q: "What could Allah do, in 36:67?", a: "Transform them in place", wrong: ["Make them fly", "Make them rich", "Hide them"], why: "And if it had been Our will, We could have transformed them in their places." },
        { q: "What does it mean, per As-Suddi?", a: "Change their form", wrong: ["Change their names", "Change their homes", "Change the weather"], why: "As-Suddi said, We could have changed their form." },
        { q: "What could they not do, in 36:67?", a: "Go forward or back", wrong: ["Sleep", "Eat", "Talk"], why: "Then they would have been unable to go forward nor could they have turned back." }
      ]
    },
    {
      slug: "reversed-in-creation",
      title: "Reversed in creation",
      line: "Whoever lives long grows weak again; will they not understand?",
      facts: ["Strength then weakness", "This world does not last"],
      quote: q36(68),
      source: ik(68, "This world is transient and will end; it is not eternal and lasting.", "this world is transient and will come to an end"),
      difficulty: 3,
      questions: [
        { q: "What happens with long life, in 36:68?", a: "Reversed in creation", wrong: ["Grows stronger", "Never changes", "Becomes young"], why: "And he whom We grant long life, We reverse him in creation." },
        { q: "What does it show, per Ibn Kathir?", a: "This world does not last", wrong: ["Life is forever", "Age is luck", "Nothing"], why: "This world is transient and will come to an end." },
        { q: "What were we created for, per Ibn Kathir?", a: "Another, lasting world", wrong: ["Only this life", "Nothing", "Endless play"], why: "They were created for another world that is not transient, which is the Hereafter." }
      ]
    },
    {
      slug: "not-poetry",
      title: "Not poetry",
      line: "Allah did not teach him ﷺ poetry; this is a plain Quran.",
      facts: ["Not poetry or magic", "Clear to those who ponder"],
      quote: q36(69),
      source: ik(69, "The Quran is not poetry, sorcery or fabrication, as some ignorant people of Quraysh claimed.", "This is not poetry, as some of the ignorant disbelievers of the Quraysh claimed"),
      difficulty: 3,
      questions: [
        { q: "What was he ﷺ not taught, in 36:69?", a: "Poetry", wrong: ["Prayer", "Patience", "Truth"], why: "And We have not taught him poetry, nor is it suitable for him." },
        { q: "What is the Quran, in 36:69?", a: "A Reminder, a plain Quran", wrong: ["A poem", "A spell", "A song"], why: "This is only a Reminder and a plain Quran." },
        { tf: false, q: "Quraysh were right to call it poetry.", why: "This is not poetry, as some of the ignorant disbelievers of the Quraysh claimed." }
      ]
    },
    {
      slug: "warn-the-living",
      title: "Warn the living",
      line: "The Quran warns whoever is truly alive at heart.",
      facts: ["Alive of heart and insight", "A mercy to believers"],
      quote: q36(70),
      source: ik(70, "Qatadah said those who benefit are alive of heart and alive of insight.", "Alive of heart and alive of insight"),
      difficulty: 4,
      questions: [
        { q: "Whom does the Quran warn, in 36:70?", a: "Whoever is living", wrong: ["Only the dead", "Only kings", "Only scholars"], why: "That he or it may give warning to him who is living." },
        { q: "What does living mean, per Qatadah?", a: "Alive of heart and insight", wrong: ["Young in age", "Rich", "Strong"], why: "Qatadah said, Alive of heart and alive of insight." },
        { q: "What is the Quran to believers, per Ibn Kathir?", a: "A mercy", wrong: ["A burden", "A riddle", "A story only"], why: "It is a mercy to the believers and evidence against the disbelievers." }
      ]
    },
    {
      slug: "rain-on-good-land",
      title: "Rain on good land",
      line: "To a living heart, the Quran is like rain on good land.",
      facts: ["As-Sa'di explains", "A living heart"],
      quote: q36(70),
      source: saadi(36, 70, "As-Sa'di says the Quran benefits one whose heart is alive and aware; he grows in knowledge and deeds through it, and the Quran is to his heart like rain to good, fertile land.", "ويكون القرآن لقلبه بمنزلة المطر للأرض الطيبة الزاكية"),
      difficulty: 2,
      questions: [
        { q: "What is the Quran like for a living heart, per as-Sa'di?", a: "Rain on good land", wrong: ["A heavy rock", "A cold wind", "A locked door"], why: "Like rain to good, fertile land, says as-Sa'di." },
        { q: "Who benefits from the Quran, in Ya Sin 36:70?", a: "One whose heart is alive", wrong: ["Only the rich", "Only the old", "Everyone equally"], why: "It warns whoever is truly alive at heart." },
        { tf: true, q: "The Quran leaves the deniers with no excuse left.", why: "As-Sa'di on 36:70." }
      ]
    },
    {
      slug: "cattle-we-made",
      title: "Cattle made for them",
      line: "Allah made cattle for people, and made them their owners.",
      facts: ["A child can lead a camel", "Animals made gentle for us"],
      quote: q36(71),
      source: ik(71, "Even a young child can make a camel kneel and lead a whole train of them.", "they could all be led by a young child"),
      difficulty: 2,
      questions: [
        { q: "What did Allah make, in 36:71?", a: "Cattle", wrong: ["Ships", "Towers", "Roads"], why: "We have created for them of what Our Hands have fashioned, the cattle." },
        { q: "Who can lead a camel, per Ibn Kathir?", a: "Even a young child", wrong: ["Only a giant", "No one", "Only kings"], why: "Even a train of a hundred or more camels could all be led by a young child." },
        { q: "What does their owners mean, per Qatadah?", a: "Their masters", wrong: ["Their enemies", "Their guests", "Their students"], why: "Qatadah said, They are their masters." }
      ]
    },
    {
      slug: "riding-and-eating",
      title: "Riding and eating",
      line: "He made them tame: some to ride and some to eat.",
      facts: ["Carry loads to far lands", "Food from His provision"],
      quote: q36(72),
      source: ik(72, "Some they ride on journeys and use to carry burdens to all regions.", "use them to carry their burdens to all regions"),
      difficulty: 2,
      questions: [
        { q: "What are cattle used for, in 36:72?", a: "Riding and eating", wrong: ["Only singing", "Only racing", "Nothing"], why: "Some of them they have for riding and some they eat." },
        { q: "What do they carry, per Ibn Kathir?", a: "Burdens to all regions", wrong: ["Only kings", "Water only", "Nothing"], why: "They use them to carry their burdens to all regions." },
        { tf: true, q: "Allah made these animals submissive to people.", why: "And We have subdued them unto them." }
      ]
    },
    {
      slug: "will-they-not-be-grateful",
      title: "Will they not be grateful?",
      line: "More benefits and drink come from them; will they not thank Him?",
      facts: ["Wool, hair and milk", "Thank the Creator alone"],
      quote: q36(73),
      source: ik(73, "Benefits come from their wool, fur and hair, and drink from their milk.", "from their wool, fur, and hair"),
      difficulty: 2,
      questions: [
        { q: "What benefits are named, per Ibn Kathir?", a: "Wool, fur and hair", wrong: ["Gold", "Silk", "Glass"], why: "From their wool, fur, and hair, furnishings and articles of convenience." },
        { q: "What drink do they give, per Ibn Kathir?", a: "Milk", wrong: ["Juice", "Honey", "Water"], why: "And they get to drink means, their milk." },
        { q: "Whom should we thank, per Ibn Kathir?", a: "The Creator of them", wrong: ["The animals", "The market", "Luck"], why: "Will they not worship the Creator and Subduer of that, without showing gratitude to others?" }
      ]
    },
    {
      slug: "hoping-to-be-helped",
      title: "Hoping for help",
      line: "They took other gods, hoping to be helped.",
      facts: ["Idols cannot help themselves", "Help is from Allah"],
      quote: q36(74),
      source: ik(74, "They hoped their idols would help them, provide for them and bring them near to Allah.", "hoping that those gods will help them and provide for them"),
      difficulty: 2,
      questions: [
        { q: "Why did they take other gods, in 36:74?", a: "Hoping to be helped", wrong: ["To be honest", "For fun", "For trade"], why: "And they have taken besides Allah, gods, hoping that they might be helped." },
        { q: "What did they hope for, per Ibn Kathir?", a: "Help and provision", wrong: ["Rain only", "Fame", "Sleep"], why: "Hoping that those gods will help them and provide for them." },
        { tf: false, q: "Idols can bring people nearer to Allah.", why: "Allah denounces the idolators for taking the idols as gods alongside Allah." }
      ]
    },
    {
      slug: "they-cannot-help",
      title: "They cannot help",
      line: "Those gods cannot help them at all.",
      facts: ["Weak and powerless", "Cannot even help themselves"],
      quote: q36(75),
      source: ik(75, "Those gods are too weak to help their worshippers; they cannot even help themselves.", "they cannot even help themselves"),
      difficulty: 3,
      questions: [
        { q: "Can the false gods help, in 36:75?", a: "No", wrong: ["Yes", "Sometimes", "Only at night"], why: "They cannot help them." },
        { q: "What can they not do, per Ibn Kathir?", a: "Even help themselves", wrong: ["Shine", "Stand", "Be carried"], why: "They cannot even help themselves or take revenge on those who want to harm them." },
        { q: "Why, per Ibn Kathir?", a: "They cannot hear or think", wrong: ["They are busy", "They are far", "They are asleep"], why: "Because they are inanimate and can neither hear nor comprehend." }
      ]
    },
    {
      slug: "let-not-their-speech-grieve-you",
      title: "Let not their words grieve you",
      line: "Do not grieve at their words; Allah knows all they hide.",
      facts: ["Comfort for the Prophet ﷺ", "Nothing is overlooked"],
      quote: q36(76),
      source: ik(76, "Allah knows everything about them; no deed, great or small, will be overlooked.", "We know everything about them"),
      difficulty: 3,
      questions: [
        { q: "What should not grieve him ﷺ, in 36:76?", a: "Their speech", wrong: ["The weather", "His journey", "His food"], why: "So, let not their speech then grieve you." },
        { q: "What does Allah know, in 36:76?", a: "What they hide and show", wrong: ["Only what they say", "Only the past", "Nothing"], why: "Verily, We know what they conceal and what they reveal." },
        { tf: true, q: "No deed, small or great, will be overlooked.", why: "None of their deeds, great or small, major or minor, will be overlooked." }
      ]
    },
    {
      slug: "from-a-drop",
      title: "From a drop",
      line: "Man was made from a small drop, yet he argues openly.",
      facts: ["Allah began his creation", "He can repeat it"],
      quote: q36(77),
      source: ik(77, "The One Who created man from a weak drop is not unable to recreate him after death.", "The One Who created man from this weak Nutfah is not unable to re-create him after his death"),
      difficulty: 3,
      questions: [
        { q: "What was man made from, in 36:77?", a: "A drop, Nutfah", wrong: ["Gold", "Fire", "Light"], why: "Does not man see that We have created him from Nutfah?" },
        { q: "What does man become, in 36:77?", a: "An open opponent", wrong: ["An angel", "A tree", "A star"], why: "Yet behold he stands forth as an open opponent." },
        { q: "What does it prove, per Ibn Kathir?", a: "He can recreate him", wrong: ["Nothing", "Life is random", "Death is the end"], why: "The One Who created man from this weak Nutfah is not unable to re-create him after his death." }
      ]
    },
    {
      slug: "who-will-revive-bones",
      title: "Who revives these bones?",
      line: "He forgets his own creation and asks: who revives rotten bones?",
      facts: ["A denier crumbled a bone", "He forgot he came from nothing"],
      quote: q36(78),
      source: ik(78, "Man forgets that Allah created him from nothing and brought him into existence.", "Man forgets about himself, that Allah created him from nothing"),
      difficulty: 3,
      questions: [
        { q: "What did the denier ask, in 36:78?", a: "Who revives rotten bones?", wrong: ["Where is water?", "Who is king?", "When is Eid?"], why: "Who will give life to these bones after they are rotten and have become dust?" },
        { q: "What does man forget, per Ibn Kathir?", a: "He came from nothing", wrong: ["His name", "His food", "His road"], why: "Man forgets about himself, that Allah created him from nothing." },
        { tf: true, q: "The ayahs apply to everyone who denies resurrection.", why: "They apply to all those who deny the resurrection after death." }
      ]
    },
    {
      slug: "who-created-them-first",
      title: "Who created them first",
      line: "Say: He Who made them the first time will give them life.",
      facts: ["He knows every scattered bone", "A man forgiven for his fear"],
      quote: q36(79),
      source: hadith("bukhari", "3481", "Abu Hurairah", "Sahih", "The Prophet ﷺ told of a man whose remains were scattered; Allah gathered him and forgave him because he feared Allah.", "I was afraid of You"),
      difficulty: 4,
      questions: [
        { q: "Who will give life to bones, in 36:79?", a: "He Who created them first", wrong: ["Doctors", "No one", "The earth"], why: "Say: He will give life to them Who created them for the first time!" },
        { q: "Why was the man forgiven, in the hadith?", a: "He feared Allah", wrong: ["He was rich", "He was famous", "He was strong"], why: "He replied, O my Lord! I was afraid of You. So Allah forgave him." },
        { tf: true, q: "Allah knows where every scattered part has gone.", why: "He knows about the bones in all areas and regions of the earth." }
      ]
    },
    {
      slug: "fire-from-green-trees",
      title: "Fire from green trees",
      line: "He brings fire out of the green tree for you to kindle.",
      facts: ["Opposites from one source", "Life from the lifeless"],
      quote: q36(80),
      source: ik(80, "Allah brings fire from green, moist trees, just as He brings life back.", "He Who produces for you fire out of the green tree"),
      difficulty: 3,
      questions: [
        { q: "What comes from the green tree, in 36:80?", a: "Fire", wrong: ["Ice", "Gold", "Milk"], why: "He Who produces for you fire out of the green tree." },
        { q: "What do people do with it, in 36:80?", a: "Kindle fires", wrong: ["Build ships", "Write books", "Plant seeds"], why: "When behold you kindle therewith." },
        { tf: true, q: "Fire from green wood shows Allah's wonder.", why: "He Who produces for you fire out of the green tree, when behold you kindle therewith." }
      ]
    },
    {
      slug: "able-to-create-the-like",
      title: "Able to create the like",
      line: "Can the Creator of heavens and earth not create people again?",
      facts: ["The heavens are greater than us", "He is the Supreme Creator"],
      quote: q36(81),
      source: ik(81, "Allah points to creating the heavens and earth as proof that He will re-create our bodies.", "He tells us to find the proof that He will re-create our bodies"),
      difficulty: 3,
      questions: [
        { q: "What did Allah create, in 36:81?", a: "The heavens and the earth", wrong: ["Only the sea", "Only mountains", "Only clouds"], why: "Is not He Who created the heavens and the earth, able to create the like of them?" },
        { q: "What is the like of them, per Ibn Kathir?", a: "Mankind", wrong: ["Stars", "Seas", "Trees"], why: "Able to create the like of them, meaning, the like of mankind." },
        { q: "Which is greater, per 40:57?", a: "Heavens and earth", wrong: ["Mankind", "Both equal", "Neither"], why: "The creation of the heavens and the earth is indeed greater than the creation of mankind." }
      ]
    },
    {
      slug: "be-and-it-is",
      title: "Be! and it is",
      line: "When He wills a thing, He says: Be! and it is.",
      facts: ["One command is enough", "No need to repeat"],
      quote: q36(82),
      source: ik(82, "He only needs to command a thing once; it does not need to be repeated or confirmed.", "He only needs to command a thing once"),
      difficulty: 2,
      questions: [
        { q: "What does Allah say, in 36:82?", a: "Be!", wrong: ["Wait!", "Maybe", "Later"], why: "His command, when He intends a thing, is only that He says to it, Be! and it is." },
        { q: "How many times must He command, per Ibn Kathir?", a: "Once", wrong: ["Twice", "Seven times", "Many times"], why: "He only needs to command a thing once; it does not need to be repeated." },
        { tf: false, q: "His command needs help to happen.", why: "When Allah wants a thing to happen, He only says to it: Be! once, and it is." }
      ]
    },
    {
      slug: "in-his-hand-is-dominion",
      title: "In His Hand is all dominion",
      line: "Glory to Him; all dominion is His, and to Him you return.",
      facts: ["Mulk and Malakut mean the same", "All return to Him"],
      quote: q36(83),
      source: ik(83, "The majority of scholars say Al-Mulk and Al-Malakut mean the same thing.", "Al-Mulk and Al-Malakut mean the same thing"),
      difficulty: 3,
      questions: [
        { q: "What is in His Hand, in 36:83?", a: "Dominion of all things", wrong: ["Only the sky", "Only the sea", "Nothing"], why: "In Whose Hand is the dominion of all things." },
        { q: "To Whom will we return, in 36:83?", a: "To Allah", wrong: ["To the earth", "To kings", "To no one"], why: "And to Him you shall be returned." },
        { q: "Do Mulk and Malakut differ, per Ibn Kathir?", a: "No, they mean the same", wrong: ["Yes, totally", "One is earth only", "Unknown"], why: "Al-Mulk and Al-Malakut mean the same thing; this is the correct view." }
      ]
    }
  ]
};

export const YASIN_UNITS: readonly DeepUnit[] = [YASIN_ONE, YASIN_TWO, YASIN_THREE];
