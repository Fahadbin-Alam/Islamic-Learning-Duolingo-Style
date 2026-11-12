import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah As-Saffat ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on As-Saffat 37:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_37_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on As-Saffat 37:${ayah}`,
    url: `https://quran.com/37:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 37:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q37 = (ayah: number) => quranQuote(37, ayah);

/** Ayahs 1 to 26: the angels in ranks, the guarded sky, the denial of the resurrection, and the Day of Recompense. */
const SAFFAT_ONE: DeepUnit = {
  key: "saffat1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-37",
  name: "As-Saffat, ayahs 1 to 26",
  kind: "skill",
  lessonType: "surah",
  surahName: "As-Saffat",
  lessons: [
    {
      slug: "those-in-ranks",
      title: "Those in ranks",
      line: "Allah swears by those standing in ranks: the angels.",
      facts: ["The angels form ranks in heaven", "Our prayer rows are like theirs"],
      quote: q37(1),
      source: ik(1, "Ibn Masud and many others said those ranged in ranks are the angels; Qatadah said they form ranks in the heavens.", "The angels form ranks in the heavens"),
      difficulty: 1,
      questions: [
        { q: "Who are those ranged in ranks, per Ibn Masud?", a: "The angels", wrong: ["The soldiers", "The birds", "The stars"], why: "By those ranged in ranks. They are the angels." },
        { q: "Where do the angels form ranks, per Qatadah?", a: "In the heavens", wrong: ["In the sea", "In caves", "In markets"], why: "Qatadah said, The angels form ranks in the heavens." },
        { tf: true, q: "Many early scholars agreed these are the angels.", why: "This was also the view of Ibn Abbas, Masruq, Said bin Jubayr, Ikrimah, Mujahid and others." }
      ]
    },
    {
      slug: "rows-like-the-angels",
      title: "Rows like the angels",
      line: "The Prophet ﷺ taught us to make rows like the angels.",
      facts: ["Fill the front rows first", "Stand close together"],
      quote: q37(1),
      source: hadith("muslim", "430", "Jabir ibn Samurah", "Sahih", "The Prophet ﷺ asked why we do not form rows as the angels do before their Lord: they complete the first rows and stand close.", "They make the first rows complete and keep close together in the row"),
      difficulty: 2,
      questions: [
        { q: "How do angels make rows, in the hadith?", a: "Front rows first, standing close", wrong: ["Back rows first", "In circles", "Far apart"], why: "They make the first rows complete and keep close together in the row." },
        { q: "What did the Prophet ﷺ ask the people?", a: "Why not form rows like angels?", wrong: ["Why pray at all?", "Why not sit?", "Why speak?"], why: "Why do not you draw yourselves up in rows as angels do in the presence of their Lord?" },
        { tf: true, q: "Neat prayer rows follow the way of the angels.", why: "They make the first rows complete and keep close together in the row." }
      ]
    },
    {
      slug: "those-who-drive-the-clouds",
      title: "Those who drive the clouds",
      line: "By those who drive the clouds: angels again.",
      facts: ["Angels move the clouds", "By Allah's command"],
      quote: q37(2),
      source: ik(2, "As-Suddi and others said the second oath refers to angels who drive the clouds.", "means that they drive the clouds"),
      difficulty: 2,
      questions: [
        { q: "What do these angels drive, in 37:2?", a: "The clouds", wrong: ["The ships", "The camels", "The winds of war"], why: "By those who drive the clouds in a good way." },
        { q: "Who said 37:2 means driving clouds?", a: "As-Suddi and others", wrong: ["No one", "Only poets", "Only kings"], why: "As-Suddi and others said that the Ayah means that they drive the clouds." },
        { tf: false, q: "Those who drive the clouds are people.", why: "By those who drive the clouds in a good way. They are the angels." }
      ]
    },
    {
      slug: "those-who-bring-the-reminder",
      title: "Those who bring the Reminder",
      line: "By those who bring the Dhikr from Allah to mankind.",
      facts: ["Angels bring revelation", "The Scriptures and the Quran"],
      quote: q37(3),
      source: ik(3, "As-Suddi said the angels bring the Scriptures and the Quran from Allah to mankind.", "The angels bring the Scriptures and the"),
      difficulty: 2,
      questions: [
        { q: "What do they bring, in 37:3?", a: "The Dhikr", wrong: ["Rain only", "Gold", "Armies"], why: "By those who bring the Dhikr." },
        { q: "What is the Dhikr, per As-Suddi?", a: "The Scriptures and the Quran", wrong: ["Poems", "Songs", "Stories of kings"], why: "The angels bring the Scriptures and the Quran from Allah to mankind." },
        { q: "How many oaths open the surah?", a: "Three", wrong: ["One", "Two", "Ten"], why: "By those ranged in ranks. By those who drive the clouds. By those who bring the Dhikr." }
      ]
    },
    {
      slug: "your-god-is-one",
      title: "Your God is One",
      line: "Truly, your God is One.",
      facts: ["The point of the oaths", "None worthy of worship but Him"],
      quote: q37(4),
      source: ik(4, "This is the statement the oaths are sworn for: there is no god worthy of worship but Allah.", "there is no God worthy of worship but He"),
      difficulty: 2,
      questions: [
        { q: "What do the oaths confirm, in 37:4?", a: "Your God is One", wrong: ["The sky is blue", "Angels are many", "Clouds bring rain"], why: "Verily, your God is indeed One." },
        { q: "What does it state, per Ibn Kathir?", a: "None is worthy of worship but Him", wrong: ["There are many gods", "Angels are gods", "Stars are gods"], why: "Stating that there is no God worthy of worship but He." },
        { tf: true, q: "The oaths in ayahs 1 to 3 lead up to Tawhid.", why: "This is the One by Whom the oath is sworn, stating that there is no God worthy of worship but He." }
      ]
    },
    {
      slug: "lord-of-the-sunrises",
      title: "Lord of the sunrises",
      line: "Lord of heavens, earth, all between, and every sunrise.",
      facts: ["He controls stars and planets", "West is implied by east"],
      quote: q37(5),
      source: ik(5, "He is the Sovereign controlling all heavenly bodies that rise in the east and set in the west.", "He is the Sovereign Who is controlling His creation"),
      difficulty: 3,
      questions: [
        { q: "What is He Lord of, in 37:5?", a: "Every point of sunrise", wrong: ["Only the sea", "Only Makkah", "Only the moon"], why: "And Lord of every point of the sun's risings." },
        { q: "Why is the west not mentioned, per Ibn Kathir?", a: "It is implied", wrong: ["It does not exist", "It is forgotten", "It is not His"], why: "There is no need for the west to be mentioned too, because it is implied in what is said." },
        { q: "What does all that is between them mean?", a: "Created beings", wrong: ["Empty space only", "Nothing", "Only air"], why: "And all that is between them, means, of created beings." }
      ]
    },
    {
      slug: "the-adorned-sky",
      title: "The adorned sky",
      line: "Allah adorned the nearest heaven with the stars.",
      facts: ["Beauty for those who look", "Stars give light"],
      quote: q37(6),
      source: ik(6, "Allah adorned the lowest heaven with stars, which give light to the people of the earth.", "The stars and planets in the sky give light to the people of earth"),
      difficulty: 1,
      questions: [
        { q: "What adorns the near heaven, in 37:6?", a: "The stars", wrong: ["Mountains", "Rivers", "Birds"], why: "Verily, We have adorned the near heaven with the stars." },
        { q: "What do the stars give, per Ibn Kathir?", a: "Light to the people of earth", wrong: ["Rain", "Food", "Gold"], why: "The stars and planets in the sky give light to the people of earth." },
        { tf: true, q: "The night sky is a beauty from Allah.", why: "He has adorned the lowest heaven with the heavenly bodies for those among the people of the earth who look at it." }
      ]
    },
    {
      slug: "guarded-from-every-devil",
      title: "Guarded from every devil",
      line: "The sky is guarded against every rebellious devil.",
      facts: ["Protected as it should be", "Devils try to eavesdrop"],
      quote: q37(7),
      source: ik(7, "The sky is protected as it should be from every insolent devil who tries to eavesdrop.", "every insolent and impudent devil, when he wants to eavesdrop"),
      difficulty: 2,
      questions: [
        { q: "What is the sky guarded against, in 37:7?", a: "Every rebellious Shaytan", wrong: ["Birds", "Clouds", "Angels"], why: "And to guard against every rebellious Shaytan." },
        { q: "What do the devils try to do, per Ibn Kathir?", a: "Eavesdrop", wrong: ["Pray", "Sleep", "Build"], why: "Every insolent and impudent devil, when he wants to eavesdrop." },
        { q: "What does to guard mean, per Ibn Kathir?", a: "To protect as it should be", wrong: ["To decorate", "To light", "To cool"], why: "And to guard, meaning, to protect as it should be protected." }
      ]
    },
    {
      slug: "they-cannot-listen",
      title: "They cannot listen",
      line: "Devils cannot hear the angels above; they are driven off.",
      facts: ["The higher group is the angels", "Pelted from every side"],
      quote: q37(8),
      source: ik(8, "They cannot reach the higher group, the heavens and the angels in them, and are struck from every side.", "which refers to the heavens and the angels in them"),
      difficulty: 2,
      questions: [
        { q: "Whom can the devils not hear, in 37:8?", a: "The higher group", wrong: ["Each other", "People", "Animals"], why: "They cannot listen to the higher group." },
        { q: "Who is the higher group, per Ibn Kathir?", a: "The heavens and angels in them", wrong: ["Kings", "Mountains", "Birds"], why: "Which refers to the heavens and the angels in them." },
        { q: "From where are they pelted?", a: "From every side", wrong: ["Only below", "Only the east", "Never"], why: "For they are pelted from every side." }
      ]
    },
    {
      slug: "outcast",
      title: "Outcast",
      line: "They are outcasts, pushed back from the sky.",
      facts: ["Rejected and repelled", "Lasting punishment later"],
      quote: q37(9),
      source: ik(9, "Outcast means they are rejected, repelled and prevented from reaching the sky.", "they are rejected, and are repelled and prevented from reaching it"),
      difficulty: 2,
      questions: [
        { q: "What are the devils called, in 37:9?", a: "Outcast", wrong: ["Honoured", "Guests", "Guards"], why: "Outcast, and theirs is a constant torment." },
        { q: "What does outcast mean, per Ibn Kathir?", a: "Repelled from the sky", wrong: ["Welcomed", "Rewarded", "Hidden"], why: "They are rejected, and are repelled and prevented from reaching it." },
        { tf: true, q: "Their lasting punishment is in the Hereafter.", why: "Means, in the Hereafter, they will have an ongoing, everlasting and painful torment." }
      ]
    },
    {
      slug: "the-piercing-flame",
      title: "The piercing flame",
      line: "Any devil that snatches a word is chased by a bright flame.",
      facts: ["Some pass words to fortune-tellers", "Stronger guard after the Prophet ﷺ came"],
      quote: q37(10),
      source: ik(10, "Ibn Abbas said once the Prophet ﷺ was sent, the flame never missed a devil trying to listen.", "the flaming fire would come and would not miss him"),
      difficulty: 3,
      questions: [
        { q: "What chases the thieving devil, in 37:10?", a: "A flame of piercing brightness", wrong: ["A bird", "A cloud", "A wind"], why: "And they are pursued by a flaming fire of piercing brightness." },
        { q: "Whom do they pass words to, per Ibn Kathir?", a: "The soothsayer", wrong: ["The angels", "The king", "The scholar"], why: "So the other devil takes it to the soothsayer." },
        { q: "What changed when the Prophet ﷺ was sent?", a: "The flame never missed", wrong: ["Devils were welcomed", "Stars stopped", "Nothing"], why: "The flaming fire would come and would not miss him." }
      ]
    },
    {
      slug: "harder-to-create",
      title: "Harder to create?",
      line: "Ask them: are they harder to create, or the heavens?",
      facts: ["The heavens are greater", "Man is from sticky clay"],
      quote: q37(11),
      source: ik(11, "They admitted the heavens and earth were harder to create, so why deny the resurrection?", "why do they deny the resurrection, when they see things that are greater than that which they deny"),
      difficulty: 2,
      questions: [
        { q: "What were people made from, in 37:11?", a: "Sticky clay", wrong: ["Fire", "Light", "Iron"], why: "Verily, We created them of a sticky clay." },
        { q: "What does the question prove, per Ibn Kathir?", a: "Resurrection is easy for Allah", wrong: ["Clay is strong", "People are greater", "The sky is weak"], why: "Why do they deny the resurrection, when they see things that are greater than that which they deny?" },
        { q: "What is sticky clay, per Qatadah?", a: "Clay that sticks to the hand", wrong: ["Sand", "Stone", "Ash"], why: "Qatadah said, It is that which sticks to the hand." }
      ]
    },
    {
      slug: "you-wondered-they-mocked",
      title: "You wondered, they mocked",
      line: "The Prophet ﷺ wondered at them, while they mocked.",
      facts: ["He ﷺ was certain of the truth", "They mocked out of disbelief"],
      quote: q37(12),
      source: ik(12, "The Prophet ﷺ was astounded that people mocked the truth of the resurrection he was certain of.", "was astounded by the mockery of the misguided ones"),
      difficulty: 2,
      questions: [
        { q: "What did the deniers do, in 37:12?", a: "Mock", wrong: ["Pray", "Weep", "Listen"], why: "Nay, you wondered while they mock." },
        { q: "What astounded the Prophet ﷺ, per Qatadah?", a: "Their mockery", wrong: ["The stars", "The sea", "Their wealth"], why: "Muhammad was astounded by the mockery of the misguided ones among the sons of Adam." },
        { tf: true, q: "He ﷺ was certain the resurrection is true.", why: "Whilst you were certain that it is true." }
      ]
    },
    {
      slug: "no-attention",
      title: "No attention",
      line: "When they are reminded, they pay no attention.",
      facts: ["Reminders were ignored", "Hearts were closed"],
      quote: q37(13),
      source: ik(13, "They opposed and mocked what they were told because of their intense disbelief.", "They oppose what you say because of their intense disbelief"),
      difficulty: 2,
      questions: [
        { q: "What happens when they are reminded, in 37:13?", a: "They pay no attention", wrong: ["They thank", "They cry", "They obey"], why: "And when they are reminded, they pay no attention." },
        { q: "Why did they oppose him ﷺ, per Ibn Kathir?", a: "Intense disbelief", wrong: ["Lack of food", "Fear of rain", "Love of truth"], why: "They oppose what you say because of their intense disbelief." },
        { tf: false, q: "They listened carefully to every reminder.", why: "And when they are reminded, they pay no attention." }
      ]
    },
    {
      slug: "mocking-the-signs",
      title: "Mocking the signs",
      line: "When they see a sign from Allah, they make fun of it.",
      facts: ["A sign is clear proof", "Mockery is not an answer"],
      quote: q37(14),
      source: ik(14, "An Ayah means clear evidence and proof; Mujahid and Qatadah said they made fun of it.", "means, clear evidence and proof"),
      difficulty: 2,
      questions: [
        { q: "What do they do with a sign, in 37:14?", a: "Mock at it", wrong: ["Study it", "Follow it", "Hide it"], why: "And when they see an Ayah from Allah, they mock at it." },
        { q: "What does Ayah mean in 37:14, per Ibn Kathir?", a: "Clear evidence and proof", wrong: ["A poem", "A story", "A rumour"], why: "And when they see an Ayah means, clear evidence and proof." },
        { q: "Who said they make fun of it?", a: "Mujahid and Qatadah", wrong: ["The angels", "No one", "Their kings"], why: "Mujahid and Qatadah said, They make fun of it." }
      ]
    },
    {
      slug: "nothing-but-magic",
      title: "Nothing but magic",
      line: "They said: this is nothing but plain magic!",
      facts: ["A label to avoid thinking", "The truth stays true"],
      quote: q37(15),
      source: ik(15, "They told the Prophet ﷺ that what he brought was nothing but plain magic.", "this that you have brought is nothing but plain magic"),
      difficulty: 2,
      questions: [
        { q: "What did they call the message, in 37:15?", a: "Evident magic", wrong: ["Poetry", "History", "Medicine"], why: "And they say: This is nothing but evident magic!" },
        { q: "What did they mean, per Ibn Kathir?", a: "His message was plain magic", wrong: ["He was wise", "He was right", "He was rich"], why: "This that you have brought is nothing but plain magic." },
        { tf: true, q: "Calling truth magic does not make it false.", why: "When they see an Ayah, clear evidence and proof, they mock at it." }
      ]
    },
    {
      slug: "dust-and-bones",
      title: "Dust and bones",
      line: "They asked: once we are dust and bones, will we rise?",
      facts: ["They thought it unlikely", "They did not believe"],
      quote: q37(16),
      source: ik(16, "They thought being raised after becoming dust and bones was unlikely, and did not believe it.", "They thought that this was unlikely to happen, and they did not believe it"),
      difficulty: 2,
      questions: [
        { q: "What did they ask, in 37:16?", a: "Shall we be resurrected?", wrong: ["Shall we be rich?", "Shall we travel?", "Shall we rule?"], why: "When we are dead and have become dust and bones, shall we verily be resurrected?" },
        { q: "What did they think, per Ibn Kathir?", a: "It was unlikely", wrong: ["It was certain", "It was soon", "It was easy"], why: "They thought that this was unlikely to happen, and they did not believe it." },
        { tf: false, q: "They believed in the resurrection.", why: "They thought that this was unlikely to happen, and they did not believe it." }
      ]
    },
    {
      slug: "and-our-fathers",
      title: "And our fathers?",
      line: "And our fathers of old, too? they asked in disbelief.",
      facts: ["Long-gone generations", "All will be raised"],
      quote: q37(17),
      source: ik(17, "They doubted that even their ancient forefathers could be brought back.", "They thought that this was unlikely to happen"),
      difficulty: 2,
      questions: [
        { q: "Whom did they also ask about, in 37:17?", a: "Their fathers of old", wrong: ["Their animals", "Their houses", "Their idols"], why: "And also our fathers of old?" },
        { q: "How did they see it, per Ibn Kathir?", a: "As unlikely", wrong: ["As certain", "As near", "As good"], why: "They thought that this was unlikely to happen, and they did not believe it." },
        { tf: true, q: "Even the first generations will be raised.", why: "Yes, you will be raised up on the Day of Resurrection, after you have become dust and bones." }
      ]
    },
    {
      slug: "yes-and-humbled",
      title: "Yes, and humbled",
      line: "Say: Yes, and you will be humbled then.",
      facts: ["Raised after becoming dust", "Shamed before His might"],
      quote: q37(18),
      source: ik(18, "Tell them: yes, you will be raised after becoming dust and bones, and humbled before His might.", "put to shame before His great might"),
      difficulty: 2,
      questions: [
        { q: "What is the answer, in 37:18?", a: "Yes, and you will be humiliated", wrong: ["No", "Maybe", "Only some"], why: "Say: Yes, and you shall then be humiliated." },
        { q: "Before what are they humbled, per Ibn Kathir?", a: "His great might", wrong: ["Their friends", "Their kings", "The sea"], why: "Put to shame before His great might." },
        { q: "Which ayah says all come to Him humbled?", a: "27:87", wrong: ["1:1", "112:1", "2:255"], why: "And all shall come to Him, humbled (27:87)." }
      ]
    },
    {
      slug: "a-single-call",
      title: "A single call",
      line: "One single call, and they will stand there staring.",
      facts: ["One command from Allah", "All come out of the earth"],
      quote: q37(19),
      source: ik(19, "It will be a single command from Allah; He will call them once and they will stand before Him.", "it will be a single command from Allah"),
      difficulty: 2,
      questions: [
        { q: "How many calls raise them, in 37:19?", a: "One", wrong: ["Ten", "Seven", "A hundred"], why: "It will be a single Zajrah, and behold, they will be staring." },
        { q: "What is the Zajrah, per Ibn Kathir?", a: "A single command from Allah", wrong: ["A storm", "A song", "An army"], why: "It will be a single command from Allah." },
        { q: "What will they do after, in 37:19?", a: "Stand staring", wrong: ["Sleep", "Run home", "Sit and eat"], why: "And behold, they will be staring." }
      ]
    },
    {
      slug: "the-day-of-recompense",
      title: "The Day of Recompense",
      line: "They will say: Woe to us! This is the Day of Recompense!",
      facts: ["They blame themselves", "Regret comes too late"],
      quote: q37(20),
      source: ik(20, "The disbelievers will blame themselves and admit they wronged themselves, when regret no longer helps.", "they will be filled with regret at the time when regret will not avail them anything"),
      difficulty: 2,
      questions: [
        { q: "What will they call that Day, in 37:20?", a: "The Day of Recompense", wrong: ["A holiday", "Market day", "A normal day"], why: "They will say: Woe to us! This is the Day of Recompense!" },
        { q: "What will fill them, per Ibn Kathir?", a: "Regret that does not help", wrong: ["Joy", "Pride", "Calm"], why: "They will be filled with regret at the time when regret will not avail them anything." },
        { tf: true, q: "They will admit they wronged themselves.", why: "How they will blame themselves and admit that they wronged themselves in this world." }
      ]
    },
    {
      slug: "the-day-you-denied",
      title: "The Day you denied",
      line: "This is the Day of Judgement that you used to deny.",
      facts: ["Said by angels and believers", "A rebuke for the deniers"],
      quote: q37(21),
      source: ik(21, "The angels and the believers will say this to the deniers as a rebuke.", "This will be said to them as a rebuke and reproof"),
      difficulty: 2,
      questions: [
        { q: "What Day did they deny, in 37:21?", a: "The Day of Judgement", wrong: ["Friday", "Eid", "The day of rain"], why: "This is the Day of Judgement which you used to deny." },
        { q: "Who will say it, per Ibn Kathir?", a: "The angels and the believers", wrong: ["Their idols", "Their children", "No one"], why: "And the angels and the believers will say." },
        { q: "Why will it be said, per Ibn Kathir?", a: "As a rebuke", wrong: ["As a joke", "As praise", "As a greeting"], why: "This will be said to them as a rebuke and reproof." }
      ]
    },
    {
      slug: "gathered-with-their-like",
      title: "Gathered with their like",
      line: "Wrongdoers are gathered with others like them.",
      facts: ["Companions means counterparts", "We are known by our company"],
      quote: q37(22),
      source: ik(22, "Umar said companions means those like them; each kind of wrongdoer is gathered with its own kind.", "Their companions means their counterparts, those who are like them"),
      difficulty: 3,
      questions: [
        { q: "Who is gathered with the wrongdoers, in 37:22?", a: "Their companions", wrong: ["The angels", "The believers", "The Prophets"], why: "Assemble those who did wrong, together with their companions." },
        { q: "What does companions mean, per An-Numan?", a: "Their counterparts", wrong: ["Their servants", "Their judges", "Their teachers"], why: "Their companions means their counterparts, those who are like them." },
        { q: "What else is gathered with them, in 37:22?", a: "What they worshipped", wrong: ["Their gold", "Their houses", "Their camels"], why: "And what they used to worship." }
      ]
    },
    {
      slug: "instead-of-allah",
      title: "Instead of Allah",
      line: "The false gods they worshipped are gathered with them.",
      facts: ["Idols cannot save them", "Led towards the Fire"],
      quote: q37(23),
      source: ik(23, "Their idols and false gods will be gathered together with them in the same place.", "their idols and false gods will be gathered together with them in the same place"),
      difficulty: 2,
      questions: [
        { q: "What were they worshipping, in 37:23?", a: "Others instead of Allah", wrong: ["Allah alone", "Nothing", "Only the sun"], why: "And what they used to worship. Instead of Allah." },
        { q: "Where are the idols, per Ibn Kathir?", a: "Gathered with them", wrong: ["In heaven", "Lost forever", "Protecting them"], why: "Their idols and false gods will be gathered together with them in the same place." },
        { tf: false, q: "Their idols will defend them that Day.", why: "Their idols and false gods will be gathered together with them in the same place." }
      ]
    },
    {
      slug: "stop-them-for-questions",
      title: "Stop them for questions",
      line: "Stop them: they are to be questioned.",
      facts: ["Asked about words and deeds", "First about their company"],
      quote: q37(24),
      source: ik(24, "They are stopped to be questioned about what they did and said; Ibn Abbas said they will be brought to account.", "stop them so that they may be questioned about the things they did and said"),
      difficulty: 3,
      questions: [
        { q: "Why are they stopped, in 37:24?", a: "To be questioned", wrong: ["To rest", "To eat", "To pray"], why: "But stop them, verily, they are to be questioned." },
        { q: "About what, per Ibn Kathir?", a: "What they did and said", wrong: ["Their height", "Their names only", "The weather"], why: "Stop them so that they may be questioned about the things they did and said in this world." },
        { q: "What is asked first, per Uthman bin Zaidah?", a: "The company he kept", wrong: ["His wealth", "His job", "His home"], why: "The first thing about which a man will be asked is the company that he kept." }
      ]
    },
    {
      slug: "why-not-help-each-other",
      title: "Why not help each other?",
      line: "What is wrong with you? Why do you not help each other?",
      facts: ["They had promised help", "No one can help"],
      quote: q37(25),
      source: ik(25, "It is said as a rebuke, since they had claimed they would all help one another.", "as you claimed that you would all help one another"),
      difficulty: 2,
      questions: [
        { q: "What are they asked, in 37:25?", a: "Why do you not help one another?", wrong: ["Where is your food?", "Who is your king?", "When did you sleep?"], why: "What is the matter with you? Why do you not help one another?" },
        { q: "Why is it asked, per Ibn Kathir?", a: "They had claimed to help each other", wrong: ["To get directions", "To learn names", "To pass time"], why: "As you claimed that you would all help one another." },
        { tf: true, q: "Their worldly alliances will be useless that Day.", why: "What is the matter with you? Why do you not help one another?" }
      ]
    },
    {
      slug: "they-surrender",
      title: "They surrender",
      line: "No, that Day they will fully surrender.",
      facts: ["No resisting His command", "No escape"],
      quote: q37(26),
      source: ik(26, "They will be subject to the command of Allah and unable to resist it or avoid it.", "they will be subjected to the command of Allah, and they will not be able to resist it or avoid it"),
      difficulty: 2,
      questions: [
        { q: "What will they do that Day, in 37:26?", a: "Surrender", wrong: ["Fight", "Escape", "Argue"], why: "Nay, but that Day they shall surrender." },
        { q: "Can they resist, per Ibn Kathir?", a: "No", wrong: ["Yes", "With help", "For a while"], why: "They will not be able to resist it or avoid it." },
        { q: "To what will they be subject, per Ibn Kathir?", a: "The command of Allah", wrong: ["Their leaders", "Their desires", "The devils"], why: "They will be subjected to the command of Allah." }
      ]
    }
  ]
};

/** Ayahs 27 to 61: followers and leaders blame each other, the pride against La ilaha illallah, the sincere servants in Paradise, and the believer who looks down at his old companion. */
const SAFFAT_TWO: DeepUnit = {
  key: "saffat2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-37",
  name: "As-Saffat, ayahs 27 to 61",
  kind: "skill",
  lessonType: "surah",
  surahName: "As-Saffat",
  lessons: [
    {
      slug: "blaming-one-another",
      title: "Blaming one another",
      line: "On that Day, they turn to one another, asking and blaming.",
      facts: ["Followers blame leaders", "Leaders blame followers"],
      quote: q37(27),
      source: ik(27, "Allah tells us the disbelievers will blame one another on the Day of Resurrection.", "the disbeliever will blame one another in the arena of Resurrection"),
      difficulty: 2,
      questions: [
        { q: "What will they do, in 37:27?", a: "Question one another", wrong: ["Sleep", "Sing", "Leave"], why: "And they will turn to one another and question one another." },
        { q: "What will they do, per Ibn Kathir?", a: "Blame one another", wrong: ["Thank one another", "Forgive one another", "Ignore one another"], why: "The disbeliever will blame one another in the arena of Resurrection." },
        { tf: true, q: "Friends in falsehood turn on each other that Day.", why: "The disbeliever will blame one another in the arena of Resurrection." }
      ]
    },
    {
      slug: "from-the-right-side",
      title: "From the right side",
      line: "Followers say: you came at us from the right side.",
      facts: ["Using power over the weak", "Blocking them from good"],
      quote: q37(28),
      source: ik(28, "Ibn Abbas said they will say: you forced us with your power over us, as we were weak and you were strong.", "You used to force us because of your position of power over us"),
      difficulty: 3,
      questions: [
        { q: "From where did the leaders come, in 37:28?", a: "From the right side", wrong: ["From the sea", "From behind a wall", "From the sky"], why: "It was you who used to come to us from the right side." },
        { q: "What does it mean, per Ibn Abbas?", a: "You forced us with your power", wrong: ["You fed us", "You taught us", "You guided us"], why: "You used to force us because of your position of power over us, for we were weak and you were strong." },
        { q: "What did they block, per As-Suddi?", a: "The truth", wrong: ["The road", "The rain", "The door"], why: "You used to come to us to block the truth, and you made falsehood look attractive to us." }
      ]
    },
    {
      slug: "you-were-not-believers",
      title: "You were not believers",
      line: "Leaders reply: no, you yourselves did not believe.",
      facts: ["Each heart chose for itself", "Blame does not save"],
      quote: q37(29),
      source: ik(29, "The leaders will say: your own hearts denied faith and were open to disbelief and sin.", "your hearts denied faith and were open to disbelief and sin"),
      difficulty: 2,
      questions: [
        { q: "What do the leaders reply, in 37:29?", a: "You were not believers", wrong: ["We are sorry", "We will help", "Follow us again"], why: "They will reply: Nay, you yourselves were not believers." },
        { q: "What do they say of the followers, per Ibn Kathir?", a: "Their hearts denied faith", wrong: ["They were forced", "They were asleep", "They were young"], why: "Your hearts denied faith and were open to disbelief and sin." },
        { tf: true, q: "Each person is answerable for his own heart.", why: "Your hearts denied faith and were open to disbelief and sin." }
      ]
    },
    {
      slug: "no-authority",
      title: "No authority",
      line: "We had no authority over you; you were transgressors.",
      facts: ["No proof for their call", "Followers chose wrong"],
      quote: q37(30),
      source: ik(30, "They admit they had no proof for what they called to; the followers chose to go against the truth.", "we had no proof of the truth of that to which we called you"),
      difficulty: 3,
      questions: [
        { q: "What did the leaders not have, in 37:30?", a: "Authority over them", wrong: ["Money", "Houses", "Children"], why: "And we had no authority over you." },
        { q: "What does no authority mean, per Ibn Kathir?", a: "No proof for their call", wrong: ["No army", "No land", "No voice"], why: "We had no proof of the truth of that to which we called you." },
        { q: "What were the followers, in 37:30?", a: "A transgressing people", wrong: ["Helpless victims", "Believers", "Scholars"], why: "Nay! But you were a transgressing people." }
      ]
    },
    {
      slug: "the-word-came-true",
      title: "The word came true",
      line: "The Word of our Lord has come true against us.",
      facts: ["They admit their fate", "Too late to change"],
      quote: q37(31),
      source: ik(31, "The arrogant admit Allah's Word is justified against them, that they will taste the punishment.", "the Word of Allah has been justified against us"),
      difficulty: 2,
      questions: [
        { q: "What has come true, in 37:31?", a: "The Word of their Lord", wrong: ["Their dreams", "Their plans", "Their poems"], why: "So now the Word of our Lord has been justified against us." },
        { q: "Who says 37:31, per Ibn Kathir?", a: "Those who were arrogant", wrong: ["The angels", "The believers", "The Prophets"], why: "Those who were arrogant will say to those who were deemed weak, the Word of Allah has been justified against us." },
        { tf: true, q: "They admit it only when it is too late.", why: "So now the Word of our Lord has been justified against us." }
      ]
    },
    {
      slug: "astray-ourselves",
      title: "Astray ourselves",
      line: "We led you astray because we were astray ourselves.",
      facts: ["They called to their own path", "The followers answered"],
      quote: q37(32),
      source: ik(32, "They say: we called you to follow the path we were on, and you responded.", "called you to follow the path which we were on, and you responded"),
      difficulty: 2,
      questions: [
        { q: "Why did they mislead others, in 37:32?", a: "They were astray themselves", wrong: ["For money", "By mistake", "Out of love"], why: "So we led you astray because we were ourselves astray." },
        { q: "What did the followers do, per Ibn Kathir?", a: "They responded", wrong: ["They refused", "They ran", "They argued"], why: "We called you to follow the path which we were on, and you responded." },
        { tf: true, q: "Choose your leaders and friends with care.", why: "We called you to follow the path which we were on, and you responded." }
      ]
    },
    {
      slug: "sharing-the-punishment",
      title: "Sharing the punishment",
      line: "That Day, all of them share in the punishment.",
      facts: ["Each as he deserves", "Leaders and followers alike"],
      quote: q37(33),
      source: ik(33, "All of them will be in Hell, each according to what he deserves.", "each according to what he deserves"),
      difficulty: 2,
      questions: [
        { q: "Who shares the punishment, in 37:33?", a: "All of them", wrong: ["Only leaders", "Only followers", "No one"], why: "Then verily, that Day, they will all share in the torment." },
        { q: "How is it measured, per Ibn Kathir?", a: "Each as he deserves", wrong: ["All the same", "By wealth", "By age"], why: "All of them will be in Hell, each according to what he deserves." },
        { tf: false, q: "Followers escape because they only followed.", why: "Then verily, that Day, they will all share in the torment." }
      ]
    },
    {
      slug: "how-criminals-are-dealt-with",
      title: "How criminals are dealt with",
      line: "That is how Allah deals with the criminals.",
      facts: ["A fixed way of justice", "A warning for all"],
      quote: q37(34),
      source: ik(34, "Allah says this is how He deals with criminals, then explains their crime: pride against Tawhid.", "Certainly, that is how We deal with criminals"),
      difficulty: 2,
      questions: [
        { q: "Whom does 37:34 speak of?", a: "The criminals", wrong: ["The angels", "The Prophets", "The children"], why: "Certainly, that is how We deal with the criminals." },
        { q: "What comes next, in 37:35?", a: "Their pride against La ilaha illallah", wrong: ["Their wealth", "Their travels", "Their houses"], why: "Truly, when it was said to them: La ilaha illallah, they puffed themselves up with pride." },
        { tf: true, q: "Allah's justice follows a steady way.", why: "Certainly, that is how We deal with criminals." }
      ]
    },
    {
      slug: "too-proud-for-tawhid",
      title: "Too proud for Tawhid",
      line: "Told La ilaha illallah, they puffed up with pride.",
      facts: ["Too arrogant to say it", "The key to Paradise"],
      quote: q37(35),
      source: ik(35, "In this world they were too arrogant to say these words as the believers said them.", "they were too arrogant to say these words as the believers said them"),
      difficulty: 2,
      questions: [
        { q: "What were they told to say, in 37:35?", a: "La ilaha illallah", wrong: ["Goodbye", "Thank you", "Welcome"], why: "Truly, when it was said to them: La ilaha illallah, they puffed themselves up with pride." },
        { q: "Why would they not say it, per Ibn Kathir?", a: "Arrogance", wrong: ["Shyness", "Hunger", "Illness"], why: "They were too arrogant to say these words as the believers said them." },
        { tf: false, q: "They said it humbly like the believers.", why: "They were too arrogant to say these words as the believers said them." }
      ]
    },
    {
      slug: "knowing-la-ilaha-illallah",
      title: "Knowing La ilaha illallah",
      line: "Whoever dies knowing there is no god but Allah enters Paradise.",
      facts: ["The great word of Tawhid", "Know it and live by it"],
      quote: q37(35),
      source: hadith("muslim", "26", "Uthman ibn Affan", "Sahih", "The Prophet ﷺ said whoever dies knowing that there is no god but Allah enters Paradise.", "that there is no god but Allah entered Paradise"),
      difficulty: 3,
      questions: [
        { q: "Who enters Paradise, in the hadith?", a: "Who dies knowing there is no god but Allah", wrong: ["Who is richest", "Who is oldest", "Who travels most"], why: "He who died knowing that there is no god but Allah entered Paradise." },
        { q: "Who narrated the hadith on dying with Tawhid?", a: "Uthman ibn Affan", wrong: ["Abu Jahl", "Abu Lahab", "Fir'awn"], why: "It is narrated on the authority of Uthman." },
        { tf: true, q: "The deniers were too proud for this very word.", why: "Truly, when it was said to them: La ilaha illallah, they puffed themselves up with pride." }
      ]
    },
    {
      slug: "a-mad-poet",
      title: "A mad poet?",
      line: "They said: shall we leave our gods for a mad poet?",
      facts: ["Clinging to forefathers' ways", "Insulting the Messenger ﷺ"],
      quote: q37(36),
      source: ik(36, "They meant: shall we stop worshipping our gods and our forefathers' gods because of this man's words?", "Shall we stop worshipping our gods and the gods of our forefathers"),
      difficulty: 2,
      questions: [
        { q: "What did they call him ﷺ, in 37:36?", a: "A mad poet", wrong: ["A wise king", "A rich trader", "A brave soldier"], why: "Are we going to abandon our gods for the sake of a mad poet?" },
        { q: "What did they refuse to stop, per Ibn Kathir?", a: "Worshipping their forefathers' gods", wrong: ["Trading", "Travelling", "Farming"], why: "Shall we stop worshipping our gods and the gods of our forefathers?" },
        { tf: false, q: "The Prophet ﷺ was a poet.", why: "Nay! he has come with the truth and he confirms the Messengers." }
      ]
    },
    {
      slug: "he-brought-the-truth",
      title: "He brought the truth",
      line: "No! He brought the truth and confirmed the Messengers.",
      facts: ["Stories and laws from Allah", "As earlier Prophets foretold"],
      quote: q37(37),
      source: ik(37, "He brought the truth and fulfilled the earlier prophecies about his praiseworthy character.", "he fulfills their prophecies of his praiseworthy characteristics"),
      difficulty: 3,
      questions: [
        { q: "What did he ﷺ bring, in 37:37?", a: "The truth", wrong: ["Poems", "Magic", "Riddles"], why: "Nay! he has come with the truth and he confirms the Messengers." },
        { q: "How does he confirm the Messengers, per Ibn Kathir?", a: "He fulfils their prophecies", wrong: ["He copies them", "He replaces them", "He forgets them"], why: "He fulfills their prophecies of his praiseworthy characteristics and his perfect way." },
        { q: "What did he bring, per Ibn Kathir?", a: "Stories and commandments", wrong: ["Only songs", "Only trade", "Only warnings of rain"], why: "The Messenger of Allah has brought the truth with all that Allah has revealed to him of stories and commandments." }
      ]
    },
    {
      slug: "a-painful-taste",
      title: "A painful taste",
      line: "The deniers will taste a painful punishment.",
      facts: ["Addressed to the deniers", "An exception follows"],
      quote: q37(38),
      source: ik(38, "Allah addresses the deniers, then makes an exception for His sincere believing servants.", "Then He makes an exception in the case of His sincerely believing servants"),
      difficulty: 2,
      questions: [
        { q: "What will they taste, in 37:38?", a: "The painful torment", wrong: ["Sweet fruit", "Cool water", "Honey"], why: "Verily, you are going to taste the painful torment." },
        { q: "Who is the exception, per Ibn Kathir?", a: "His sincere believing servants", wrong: ["The rich", "The kings", "The poets"], why: "Then He makes an exception in the case of His sincerely believing servants." },
        { q: "Which surah has a similar exception?", a: "Al-Asr (103)", wrong: ["Al-Fil (105)", "Al-Masad (111)", "An-Nas (114)"], why: "By the Time. Verily, man is in loss, Except those who believe and do righteous deeds (103:1-3)." }
      ]
    },
    {
      slug: "only-what-you-did",
      title: "Only what you did",
      line: "You are repaid only for what you used to do.",
      facts: ["Perfect fairness", "No one wronged"],
      quote: q37(39),
      source: ik(39, "Allah tells the deniers they are repaid nothing except for what they used to do.", "and you will be requited nothing except for what you used to do"),
      difficulty: 2,
      questions: [
        { q: "What are they repaid for, in 37:39?", a: "What they used to do", wrong: ["Others' deeds", "Nothing", "Their names"], why: "And you will be requited nothing except for what you used to do." },
        { tf: true, q: "Allah repays people only for their own deeds.", why: "And you will be requited nothing except for what you used to do." },
        { tf: false, q: "People are punished for deeds they never did.", why: "And you will be requited nothing except for what you used to do." }
      ]
    },
    {
      slug: "the-chosen-servants",
      title: "The chosen servants",
      line: "Except the chosen, sincere servants of Allah.",
      facts: ["Not brought to hard account", "Good deeds multiplied"],
      quote: q37(40),
      source: ik(40, "They will not taste the painful torment; good deeds are multiplied ten to seven hundred times or more.", "each good deed will be rewarded in multiples of between ten and seven hundred"),
      difficulty: 3,
      questions: [
        { q: "Who is excepted, in 37:40?", a: "The chosen servants of Allah", wrong: ["The kings", "The wealthy", "The poets"], why: "Save the chosen servants of Allah." },
        { q: "How are their good deeds rewarded, per Ibn Kathir?", a: "Ten to seven hundred times or more", wrong: ["Once only", "Half", "Not at all"], why: "Each good deed will be rewarded in multiples of between ten and seven hundred, or as much as Allah wills." },
        { q: "What happens to their bad deeds, per Ibn Kathir?", a: "Overlooked", wrong: ["Doubled", "Shown to all", "Kept forever"], why: "Their evil acts, if there are any, will be overlooked." }
      ]
    },
    {
      slug: "a-known-provision",
      title: "A known provision",
      line: "For them is a known provision.",
      facts: ["Qatadah: it means Paradise", "Explained in the next ayah"],
      quote: q37(41),
      source: ik(41, "Qatadah and As-Suddi said the known provision means Paradise.", "This means Paradise"),
      difficulty: 2,
      questions: [
        { q: "What do they have, in 37:41?", a: "A known provision", wrong: ["A hidden debt", "A long trial", "A small hut"], why: "For them there will be a known provision." },
        { q: "What is it, per Qatadah and As-Suddi?", a: "Paradise", wrong: ["Gold coins", "A farm", "A palace on earth"], why: "Qatadah and As-Suddi said, This means Paradise." },
        { tf: true, q: "The next ayah explains this provision.", why: "It is explained further in the next Ayah: Fruits." }
      ]
    },
    {
      slug: "fruits-and-honour",
      title: "Fruits and honour",
      line: "Fruits of every kind, and they are honoured.",
      facts: ["Different kinds of fruit", "Served in comfort"],
      quote: q37(42),
      source: ik(42, "Fruits means of different kinds; honoured means they will be served and live in luxury.", "they will be served and will live a life of luxury"),
      difficulty: 2,
      questions: [
        { q: "What do they have, in 37:42?", a: "Fruits", wrong: ["Bread only", "Water only", "Nothing"], why: "Fruits; and they shall be honored." },
        { q: "What kinds of fruit, per Ibn Kathir?", a: "Different kinds", wrong: ["Only one", "Only dates", "Only figs"], why: "Fruits meaning, of different kinds." },
        { q: "What does honoured mean, per Ibn Kathir?", a: "Served, in comfort", wrong: ["Watched", "Tested", "Forgotten"], why: "They will be served and will live a life of luxury." }
      ]
    },
    {
      slug: "gardens-of-delight",
      title: "Gardens of Delight",
      line: "In the Gardens of Delight.",
      facts: ["Their home forever", "Joy beyond imagining"],
      quote: q37(43),
      source: ik(43, "The sincere servants will be in the Gardens of Delight, facing one another on thrones.", "the Gardens of Delight, facing one another on thrones"),
      difficulty: 1,
      questions: [
        { q: "Where are they, in 37:43?", a: "Gardens of Delight", wrong: ["A desert", "A city", "A cave"], why: "In the Gardens of Delight." },
        { tf: true, q: "The Gardens are for the sincere servants of Allah.", why: "Save the chosen servants of Allah. In the Gardens of Delight." },
        { q: "What comes after, in 37:44?", a: "Facing one another on thrones", wrong: ["Walking alone", "Standing in lines", "Hiding"], why: "In the Gardens of Delight, facing one another on thrones." }
      ]
    },
    {
      slug: "facing-one-another",
      title: "Facing one another",
      line: "On thrones, facing one another.",
      facts: ["No one sees another's back", "Warm company"],
      quote: q37(44),
      source: ik(44, "Mujahid said none of them will look at another's back.", "One of them will not look"),
      difficulty: 2,
      questions: [
        { q: "How do they sit, in 37:44?", a: "Facing one another", wrong: ["Back to back", "Alone", "In a line"], why: "Facing one another on thrones." },
        { q: "What does it mean, per Mujahid?", a: "No one sees another's back", wrong: ["They are far apart", "They never meet", "They sit on the ground"], why: "Mujahid said, One of them will not look at one another's backs." },
        { q: "On what do they sit, in 37:44?", a: "Thrones", wrong: ["Rocks", "Sand", "Mats"], why: "Facing one another on thrones." }
      ]
    },
    {
      slug: "a-cup-passed-around",
      title: "A cup passed around",
      line: "A cup from a flowing spring is passed around them.",
      facts: ["A stream that never runs dry", "Pure, unlike drinks of this world"],
      quote: q37(45),
      source: ik(45, "The cup comes from a flowing stream which they do not fear will ever be cut off.", "they do not fear will ever be cut off or cease"),
      difficulty: 2,
      questions: [
        { q: "What is passed around them, in 37:45?", a: "A pure cup", wrong: ["A plate of bread", "A letter", "A ring"], why: "Round them will be passed a cup of pure wine." },
        { q: "Will the stream run dry, per Ibn Kathir?", a: "Never", wrong: ["Soon", "Each night", "After a year"], why: "Wine from a flowing stream which they do not fear will ever be cut off or cease." },
        { tf: true, q: "Paradise drink is unlike this world's drink.", why: "Allah refined the wine of Paradise from the bad effects of the wine of this world." }
      ]
    },
    {
      slug: "white-and-delicious",
      title: "White and delicious",
      line: "White and delicious to those who drink.",
      facts: ["Bright, shining colour", "Taste as good as its colour"],
      quote: q37(46),
      source: ik(46, "Its taste will be as good as its colour, and it has a pleasant smell.", "its taste will be as good as its color"),
      difficulty: 2,
      questions: [
        { q: "What colour is it, in 37:46?", a: "White", wrong: ["Red", "Black", "Green"], why: "White, delicious to the drinkers." },
        { q: "How is its taste, per Ibn Kathir?", a: "As good as its colour", wrong: ["Bitter", "Sour", "Plain"], why: "Its taste will be as good as its color." },
        { q: "What colour did Zayd bin Aslam describe?", a: "Bright and shining", wrong: ["Dull", "Murky", "Dark"], why: "With a bright, shining color." }
      ]
    },
    {
      slug: "no-headache",
      title: "No headache",
      line: "No harm comes from it, and no one loses their mind.",
      facts: ["No ache, no sickness", "Minds stay clear"],
      quote: q37(47),
      source: ik(47, "Mujahid said it will not make them lose their minds, unlike the drinks of this world.", "It will not cause them to lose their minds"),
      difficulty: 2,
      questions: [
        { q: "What will they not suffer, in 37:47?", a: "Intoxication", wrong: ["Joy", "Peace", "Comfort"], why: "Nor will they suffer intoxication therefrom." },
        { q: "What does Ghawl mean, per Ibn Kathir?", a: "Bad effects like aches", wrong: ["Sweetness", "Colour", "Cups"], why: "Headaches and stomach aches, which is the meaning of Ghawl." },
        { q: "What did Mujahid say about it?", a: "It will not take their minds", wrong: ["It makes them sleep", "It makes them sad", "It runs out"], why: "Mujahid said, It will not cause them to lose their minds." }
      ]
    },
    {
      slug: "chaste-companions",
      title: "Chaste companions",
      line: "Beside them are chaste spouses with beautiful eyes.",
      facts: ["Gaze kept for their spouses", "Pure and modest"],
      quote: q37(48),
      source: ik(48, "Qasirat At-Tarf means chaste ones who do not look at anyone other than their husbands.", "who will not look at anyone other than their husbands"),
      difficulty: 2,
      questions: [
        { q: "What are their eyes like, in 37:48?", a: "Wide and beautiful", wrong: ["Small", "Closed", "Tired"], why: "And beside them will be Qasirat-At-Tarf with wide and beautiful eyes." },
        { q: "What does Qasirat At-Tarf mean, per Ibn Kathir?", a: "Chaste, looking only at their spouses", wrong: ["Very tall", "Very old", "Far away"], why: "Chaste females, who will not look at anyone other than their husbands." },
        { tf: true, q: "Modesty is honoured even in Paradise.", why: "Chaste females, who will not look at anyone other than their husbands." }
      ]
    },
    {
      slug: "hidden-pearls",
      title: "Like hidden pearls",
      line: "As if they were well-protected treasures.",
      facts: ["Ibn Abbas: like hidden pearls", "Untouched and pure"],
      quote: q37(49),
      source: ik(49, "Ibn Abbas said Bayd Maknun means hidden pearls; Al-Hasan said protected, never touched.", "means, as if they were hidden pearls"),
      difficulty: 3,
      questions: [
        { q: "What does Bayd Maknun mean, per Ibn Abbas?", a: "Hidden pearls", wrong: ["Open fields", "Old coins", "Bright lamps"], why: "As if they were Bayd Maknun, means, as if they were hidden pearls." },
        { q: "What did Al-Hasan say it means?", a: "Protected, never touched", wrong: ["Broken", "Lost", "Sold"], why: "Al-Hasan said: means, protected, never touched by any hands." },
        { tf: true, q: "Maknun means well preserved.", why: "Ibn Jarir view concerning the meaning of Maknun (well preserved)." }
      ]
    },
    {
      slug: "talking-in-paradise",
      title: "Talking in Paradise",
      line: "In Paradise they turn to one another, sharing their stories.",
      facts: ["Talking of life in the world", "Delights no eye has seen"],
      quote: q37(50),
      source: ik(50, "The people of Paradise ask one another how they were in this world and what they went through.", "asking one another about their situation, how they were in this world"),
      difficulty: 2,
      questions: [
        { q: "What do they do, in 37:50?", a: "Question one another", wrong: ["Sleep", "Work", "Argue"], why: "Then they will turn to one another, mutually questioning." },
        { q: "What do they ask about, per Ibn Kathir?", a: "Their life in the world", wrong: ["The weather", "Prices", "Directions"], why: "Asking one another about their situation, how they were in this world and what they suffered." },
        { tf: true, q: "This is a happy talk, unlike the blaming of the deniers.", why: "This is part of their conversation when they get together to converse and drink, sitting on their thrones." }
      ]
    },
    {
      slug: "no-eye-has-seen",
      title: "No eye has seen",
      line: "Allah prepared what no eye has seen and no ear has heard.",
      facts: ["Beyond imagination", "For His righteous servants"],
      quote: q37(50),
      source: hadith("bukhari", "3244", "Abu Hurairah", "Sahih", "The Prophet ﷺ said Allah prepared for His righteous servants what no eye has seen, no ear has heard and no heart has imagined.", "things which have never been seen by an eye, or heard by an ear"),
      difficulty: 3,
      questions: [
        { q: "What has Allah prepared, in the hadith?", a: "What no eye has seen", wrong: ["Only gold", "A bigger world", "Long sleep"], why: "I have prepared for My Pious slaves things which have never been seen by an eye, or heard by an ear." },
        { q: "For whom is it prepared?", a: "His pious servants", wrong: ["Everyone", "The proud", "The idle"], why: "I have prepared for My Pious slaves." },
        { tf: true, q: "Paradise is more than a human mind can imagine.", why: "Or imagined by a human being." }
      ]
    },
    {
      slug: "i-had-a-companion",
      title: "I had a companion",
      line: "One of them says: I had a companion in the world.",
      facts: ["The companion was an idolater", "The speaker was a believer"],
      quote: q37(51),
      source: ik(51, "Ibn Abbas said this is about an idolater who had a believing companion in this world.", "This refers to an idolator man who had a companion among the believers in this world"),
      difficulty: 2,
      questions: [
        { q: "What does the speaker recall, in 37:51?", a: "A companion in the world", wrong: ["A lost ring", "A long trip", "A house"], why: "A speaker of them will say: Verily, I had a companion." },
        { q: "Who was the companion, per Ibn Abbas?", a: "An idolater", wrong: ["An angel", "A Prophet", "A scholar"], why: "This refers to an idolator man who had a companion among the believers in this world." },
        { tf: true, q: "Friends can take very different paths.", why: "An idolator man who had a companion among the believers in this world." }
      ]
    },
    {
      slug: "do-you-really-believe",
      title: "Do you really believe?",
      line: "He used to say: are you one of those who believe?",
      facts: ["Mocking belief in resurrection", "Said in stubbornness"],
      quote: q37(52),
      source: ik(52, "He mocked his friend's belief in resurrection and reckoning, out of disbelief and stubbornness.", "He used to say that by way of astonishment, disbelief and stubbornness"),
      difficulty: 2,
      questions: [
        { q: "What did the companion ask, in 37:52?", a: "Are you among those who believe?", wrong: ["Are you hungry?", "Are you rich?", "Are you tired?"], why: "Who used to say: Are you among those who believe." },
        { q: "Believe in what, per Ibn Kathir?", a: "Resurrection and reckoning", wrong: ["Ghosts", "Luck", "Stars"], why: "Do you believe in the resurrection after death, and the Reckoning and reward or punishment?" },
        { q: "How did he say it, per Ibn Kathir?", a: "In stubborn disbelief", wrong: ["With love", "With hope", "With respect"], why: "He used to say that by way of astonishment, disbelief and stubbornness." }
      ]
    },
    {
      slug: "shall-we-be-repaid",
      title: "Shall we be repaid?",
      line: "When we are dust and bones, shall we really be repaid?",
      facts: ["Madinun: brought to account", "Or: rewarded for deeds"],
      quote: q37(53),
      source: ik(53, "Mujahid said Madinun means brought to account; Ibn Abbas said rewarded or punished for deeds. Both are correct.", "Both views are correct"),
      difficulty: 3,
      questions: [
        { q: "What did he doubt, in 37:53?", a: "Being repaid after death", wrong: ["The sunrise", "The rain", "The market"], why: "When we die and become dust and bones, shall we indeed be indebted (Madinun)?" },
        { q: "What does Madinun mean, per Mujahid?", a: "Brought to account", wrong: ["Sleeping", "Lost", "Forgotten"], why: "Mujahid and As-Suddi said, Brought to account." },
        { q: "What did Ibn Kathir say of the two views?", a: "Both are correct", wrong: ["Both are wrong", "Only one is right", "Unknown"], why: "Both views are correct." }
      ]
    },
    {
      slug: "will-you-look-down",
      title: "Will you look down?",
      line: "The believer says to his friends: will you look down?",
      facts: ["Look over", "Said in Paradise"],
      quote: q37(54),
      source: ik(54, "Will you look down means look over; the believer says it to his friends in Paradise.", "The believer will say this to his companions among the people of Paradise"),
      difficulty: 2,
      questions: [
        { q: "What does the speaker ask, in 37:54?", a: "Will you look down?", wrong: ["Will you sleep?", "Will you leave?", "Will you sing?"], why: "The speaker said: Will you look down?" },
        { q: "To whom does he say it, per Ibn Kathir?", a: "His friends in Paradise", wrong: ["The angels of Hell", "His old companion", "No one"], why: "The believer will say this to his companions among the people of Paradise." },
        { q: "What does look down mean, per Ibn Kathir?", a: "Look over", wrong: ["Sleep", "Bow", "Cry"], why: "Meaning, look over." }
      ]
    },
    {
      slug: "he-saw-him",
      title: "He saw him",
      line: "He looked down and saw his old friend amid the Fire.",
      facts: ["His friend chose denial", "A sad sight, a lesson"],
      quote: q37(55),
      source: ik(55, "Ibn Abbas and others said he saw him in the middle of Hell.", "This means, in the middle of Hell"),
      difficulty: 2,
      questions: [
        { q: "Where did he see his companion, in 37:55?", a: "In the midst of the Fire", wrong: ["In a garden", "On a throne", "At a river"], why: "So he looked down and saw him in the midst of the Fire." },
        { q: "What does in the midst mean, per Ibn Abbas?", a: "In the middle of Hell", wrong: ["At its door", "Near Paradise", "Far away"], why: "This means, in the middle of Hell." },
        { tf: true, q: "The friend had mocked belief in the Hereafter.", why: "Who used to say: Are you among those who believe." }
      ]
    },
    {
      slug: "you-nearly-ruined-me",
      title: "You nearly ruined me",
      line: "By Allah, you nearly ruined me!",
      facts: ["Had he obeyed his friend", "A friend can lead to harm"],
      quote: q37(56),
      source: ik(56, "The believer says: by Allah, you nearly caused me to be doomed, if I had obeyed you.", "you nearly caused me to be doomed, if I had obeyed you"),
      difficulty: 2,
      questions: [
        { q: "What does the believer say, in 37:56?", a: "You nearly ruined me", wrong: ["I miss you", "Come up", "Thank you"], why: "He said: By Allah! You have nearly ruined me." },
        { q: "How would he have been ruined, per Ibn Kathir?", a: "By obeying his friend", wrong: ["By fasting", "By giving charity", "By praying"], why: "You nearly caused me to be doomed, if I had obeyed you." },
        { tf: true, q: "Bad company can pull a person to ruin.", why: "You nearly caused me to be doomed, if I had obeyed you." }
      ]
    },
    {
      slug: "the-grace-of-my-lord",
      title: "The grace of my Lord",
      line: "But for my Lord's grace, I would have been there too.",
      facts: ["Guidance is His favour", "Never take faith for granted"],
      quote: q37(57),
      source: ik(57, "Were it not for my Lord's favour and mercy, guiding me to faith, I would have been like you.", "had mercy upon me and guided me to faith and to belief in Him Alone"),
      difficulty: 3,
      questions: [
        { q: "What saved him, in 37:57?", a: "The grace of his Lord", wrong: ["His wealth", "His strength", "His family name"], why: "Had it not been for the grace of my Lord, I would certainly have been among those brought forth." },
        { q: "What did Allah guide him to, per Ibn Kathir?", a: "Faith and belief in Him alone", wrong: ["A treasure", "A new city", "A ship"], why: "He bestowed His grace upon me, had mercy upon me and guided me to faith and to belief in Him Alone." },
        { q: "Which ayah says we could not be guided but by Allah?", a: "7:43", wrong: ["1:1", "112:4", "114:1"], why: "And never could we have found guidance, were it not that Allah had guided us! (7:43)" }
      ]
    },
    {
      slug: "no-more-death",
      title: "No more death",
      line: "Are we not to die again, except our first death?",
      facts: ["Joy that lasts forever", "No punishment to come"],
      quote: q37(58),
      source: ik(58, "The believers say this in joy, knowing they will remain in Paradise forever with no punishment and no death.", "they are to remain in Paradise forever with no punishment and no death to come"),
      difficulty: 2,
      questions: [
        { q: "What do they ask in joy, in 37:58?", a: "Are we not to die any more?", wrong: ["When is dinner?", "Who is king?", "Where is home?"], why: "Are we then not to die any more?" },
        { q: "What do they realise, per Ibn Kathir?", a: "Paradise is forever", wrong: ["It will end", "It is a dream", "It is far"], why: "They are to remain in Paradise forever with no punishment and no death to come." },
        { tf: true, q: "In Paradise there is no more death.", why: "They are to remain in Paradise forever with no punishment and no death to come." }
      ]
    },
    {
      slug: "only-the-first-death",
      title: "Only the first death",
      line: "Only our first death, and we will not be punished.",
      facts: ["Death ends worldly joys", "Paradise joys never end"],
      quote: q37(59),
      source: ik(59, "Al-Hasan said they know death ends every delight in the world, so they rejoice that it will never come again.", "They know that death brings an end to every delight"),
      difficulty: 3,
      questions: [
        { q: "Which death do they mention, in 37:59?", a: "Their first death", wrong: ["Their tenth", "A second one", "None"], why: "Except our first death, and we shall not be punished?" },
        { q: "What does death end, per Al-Hasan?", a: "Every delight of this world", wrong: ["Nothing", "Only pain", "Only hunger"], why: "They know that death brings an end to every delight." },
        { tf: false, q: "Delights of Paradise end with a second death.", why: "They are to remain in Paradise forever with no punishment and no death to come." }
      ]
    },
    {
      slug: "the-supreme-success",
      title: "The supreme success",
      line: "Truly, this is the supreme success!",
      facts: ["The greatest win", "Forever in Allah's mercy"],
      quote: q37(60),
      source: ik(60, "When they ask if death will come again, it will be said: No, truly this is the supreme success.", "Truly, this is the supreme success"),
      difficulty: 2,
      questions: [
        { q: "What is Paradise called, in 37:60?", a: "The supreme success", wrong: ["A small reward", "A short rest", "A test"], why: "Truly, this is the supreme success!" },
        { tf: true, q: "Eternal life in Paradise is the greatest win.", why: "Truly, this is the supreme success!" },
        { tf: false, q: "Worldly wealth is the supreme success.", why: "Truly, this is the supreme success! said of Paradise." }
      ]
    },
    {
      slug: "for-this-let-them-work",
      title: "For this, let them work",
      line: "For the like of this, let the workers work.",
      facts: ["Work in this world", "Reach it in the Hereafter"],
      quote: q37(61),
      source: ik(61, "Ibn Jarir said: for the like of this pleasure and success, let people work in this world to attain it.", "the workers work in this world, so that they may attain it in the Hereafter"),
      difficulty: 2,
      questions: [
        { q: "What should workers work for, in 37:61?", a: "The like of this", wrong: ["Fame", "Gold", "Praise"], why: "For the like of this let the workers work." },
        { q: "Where should they work, per Ibn Jarir?", a: "In this world", wrong: ["In Paradise", "In the grave", "Nowhere"], why: "Let the workers work in this world, so that they may attain it in the Hereafter." },
        { q: "Whose words are these, per Ibn Jarir?", a: "Allah's", wrong: ["The believer's", "The angel's", "A poet's"], why: "These are the Words of Allah." }
      ]
    }
  ]
};

/** Ayahs 62 to 98: the tree of Zaqqum, following forefathers blindly, Nuh's call answered, and Ibrahim breaking the idols. */
const SAFFAT_THREE: DeepUnit = {
  key: "saffat3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-37",
  name: "As-Saffat, ayahs 62 to 98",
  kind: "skill",
  lessonType: "surah",
  surahName: "As-Saffat",
  lessons: [
    {
      slug: "which-is-better",
      title: "Which is better?",
      line: "Is Paradise better, or the tree of Zaqqum?",
      facts: ["Zaqqum is a tree in Hell", "A clear choice"],
      quote: q37(62),
      source: ik(62, "Allah asks whether the delights of Paradise are better, or the tree of Zaqqum which is in Hell.", "or the tree of Zaqqum) which is in Hell"),
      difficulty: 2,
      questions: [
        { q: "What is compared to Paradise, in 37:62?", a: "The tree of Zaqqum", wrong: ["A palm tree", "An olive tree", "A fig tree"], why: "Is that Paradise better entertainment or the tree of Zaqqum?" },
        { q: "Where is Zaqqum, per Ibn Kathir?", a: "In Hell", wrong: ["In Makkah", "In a garden", "In the sea"], why: "Or the tree of Zaqqum which is in Hell." },
        { tf: true, q: "The question invites us to choose wisely.", why: "Is that which He has mentioned of the delights of Paradise better entertainment, or the tree of Zaqqum?" }
      ]
    },
    {
      slug: "a-test-for-wrongdoers",
      title: "A test for wrongdoers",
      line: "Allah made this tree a test for the wrongdoers.",
      facts: ["They mocked: fire burns trees", "Who believes, who denies"],
      quote: q37(63),
      source: ik(63, "Qatadah said they mocked: fire consumes trees. It was a test to see who believes and who disbelieves.", "fire consumes trees"),
      difficulty: 3,
      questions: [
        { q: "What is the tree for the wrongdoers, in 37:63?", a: "A trial", wrong: ["A gift", "A shade", "A home"], why: "Truly, We have made it as a trial for the wrongdoers." },
        { q: "What did they say, per Qatadah?", a: "Fire consumes trees", wrong: ["Trees are tall", "Fire is cold", "Trees are good"], why: "Your companion tells you that in the Fire there is a tree, but fire consumes trees." },
        { q: "What does the test show, per Ibn Kathir?", a: "Who believes and who disbelieves", wrong: ["Who is tallest", "Who is richest", "Who runs fastest"], why: "As a trial with which We test the people to see who will believe and who will disbelieve." }
      ]
    },
    {
      slug: "from-the-bottom-of-hell",
      title: "From the bottom of Hell",
      line: "The tree grows from the bottom of the Fire.",
      facts: ["Rooted deep in Hell", "Fed by the fire"],
      quote: q37(64),
      source: ik(64, "Its roots grow at the bottom of Hell; Qatadah said it is nourished by the fire.", "its roots grow at the bottom of Hell"),
      difficulty: 2,
      questions: [
        { q: "Where does the tree grow, in 37:64?", a: "The bottom of Hell-fire", wrong: ["A riverbank", "A mountain top", "A farm"], why: "Verily, it is a tree that springs out of the bottom of Hell-fire." },
        { q: "What feeds it, per Qatadah?", a: "The fire", wrong: ["Rain", "Rivers", "Sunlight"], why: "Meaning, it is nourished by the fire, for it was created from fire." },
        { tf: false, q: "Fire cannot hold anything Allah creates in it.", why: "It is nourished by the fire, for it was created from fire." }
      ]
    },
    {
      slug: "ugly-fruit",
      title: "Ugly fruit",
      line: "The fruit is ugly, like the heads of devils.",
      facts: ["Described to warn", "Devils are known as ugly"],
      quote: q37(65),
      source: ik(65, "This describes how ugly the tree is; it is likened to devils' heads, which people know to be ugly.", "this is a description of how ugly and repulsive it is"),
      difficulty: 2,
      questions: [
        { q: "What are its fruit stalks like, in 37:65?", a: "Heads of devils", wrong: ["Pearls", "Flowers", "Stars"], why: "The shoots of its fruit stalks are like the heads of Shayatin." },
        { q: "What does it describe, per Ibn Kathir?", a: "How ugly it is", wrong: ["How sweet it is", "How tall it is", "How old it is"], why: "This is a description of how ugly and repulsive it is." },
        { tf: true, q: "People have never seen devils, yet know they are ugly.", why: "Even though they have never seen them, because it is a well-established idea in people's minds that devils are ugly." }
      ]
    },
    {
      slug: "nothing-else-to-eat",
      title: "Nothing else to eat",
      line: "They must eat from it, for there is nothing else.",
      facts: ["No relief from hunger", "Hunger is never satisfied"],
      quote: q37(66),
      source: ik(66, "They will eat from it because they will not find anything else to eat.", "they will not find anything else to eat except this tree"),
      difficulty: 2,
      questions: [
        { q: "What will they do, in 37:66?", a: "Eat from it", wrong: ["Plant it", "Cut it", "Climb it"], why: "Truly, they will eat thereof and fill their bellies therewith." },
        { q: "Why eat it, per Ibn Kathir?", a: "There is nothing else", wrong: ["It is sweet", "It is cheap", "It is healthy"], why: "They will not find anything else to eat except this tree and similar things." },
        { q: "Which ayah says such food does not nourish?", a: "88:7", wrong: ["2:255", "1:2", "112:1"], why: "Which will neither nourish nor avail against hunger (88:6-7)." }
      ]
    },
    {
      slug: "a-boiling-drink",
      title: "A boiling drink",
      line: "On top of it, they are given a boiling drink.",
      facts: ["After eating, then drinking", "No relief in it"],
      quote: q37(67),
      source: ik(67, "Ibn Abbas said they will be given boiling Hamim to drink after eating from Zaqqum.", "given boiling Hamim to drink after they have eaten from Zaqqum"),
      difficulty: 2,
      questions: [
        { q: "What are they given, in 37:67?", a: "Boiling Hamim", wrong: ["Cool water", "Milk", "Honey"], why: "Then on the top of that they will be given boiling Hamim." },
        { q: "When, per Ibn Abbas?", a: "After eating from Zaqqum", wrong: ["Before sleep", "At dawn", "Never"], why: "They will be given boiling Hamim to drink after they have eaten from Zaqqum." },
        { tf: true, q: "Hamim means a boiling drink.", why: "This means they will be given boiling Hamim to drink." }
      ]
    },
    {
      slug: "back-to-the-fire",
      title: "Back to the Fire",
      line: "Then their return is back to the blazing Fire.",
      facts: ["Moving between the two", "No rest for deniers"],
      quote: q37(68),
      source: ik(68, "After that interval they are sent back to the fire, going between it and the boiling water.", "they will be sent back to the burning fire"),
      difficulty: 3,
      questions: [
        { q: "Where do they return, in 37:68?", a: "The flaming fire", wrong: ["Their homes", "The garden", "The market"], why: "Then thereafter, verily, their return is to the flaming fire of Hell." },
        { q: "Which ayah says they go between it and boiling water?", a: "55:44", wrong: ["2:2", "36:1", "103:1"], why: "They will go between it and the fierce boiling water! (55:44)" },
        { q: "What did Ibn Masud say of midday on that Day?", a: "All will be in their final homes", wrong: ["Everyone sleeps", "The sun stops", "Nothing"], why: "Midday on the Day of Resurrection will not come until the people of Paradise will be in Paradise and the people of Hell will be in Hell." }
      ]
    },
    {
      slug: "fathers-on-the-wrong-path",
      title: "Fathers on the wrong path",
      line: "They found their fathers on the wrong path.",
      facts: ["Followed with no proof", "Habit is not evidence"],
      quote: q37(69),
      source: ik(69, "They followed their fathers' misguidance with no evidence or proof.", "they followed them with no evidence or proof"),
      difficulty: 2,
      questions: [
        { q: "How were their fathers, in 37:69?", a: "On the wrong path", wrong: ["Rightly guided", "Scholars", "Prophets"], why: "Verily, they found their fathers on the wrong path." },
        { q: "How did they follow, per Ibn Kathir?", a: "With no proof", wrong: ["After study", "With evidence", "With doubt"], why: "They followed them with no evidence or proof." },
        { tf: false, q: "Doing what our parents did is always right.", why: "They found their fathers following misguidance and they followed them with no evidence or proof." }
      ]
    },
    {
      slug: "rushing-after-them",
      title: "Rushing after them",
      line: "So they rushed along in their footsteps.",
      facts: ["Like running", "Following ignorance"],
      quote: q37(70),
      source: ik(70, "Mujahid said it is like running; Said bin Jubayr said they followed ignorance and foolishness.", "They followed ignorance and foolishness"),
      difficulty: 2,
      questions: [
        { q: "What did they do, in 37:70?", a: "Hastened in their footsteps", wrong: ["Stopped to think", "Turned back", "Asked questions"], why: "So they too hastened in their footsteps!" },
        { q: "What is it like, per Mujahid?", a: "Running", wrong: ["Sleeping", "Swimming", "Flying"], why: "Mujahid said, This is like running." },
        { q: "What did they follow, per Said bin Jubayr?", a: "Ignorance and foolishness", wrong: ["Knowledge", "Wisdom", "Revelation"], why: "Said bin Jubayr said, They followed ignorance and foolishness." }
      ]
    },
    {
      slug: "most-went-astray",
      title: "Most went astray",
      line: "Most of the earlier nations went astray before them.",
      facts: ["They worshipped others with Allah", "A pattern in history"],
      quote: q37(71),
      source: ik(71, "Most previous nations went astray, worshipping other gods alongside Allah.", "most of the previous nations went astray, worshipping other gods alongside Allah"),
      difficulty: 2,
      questions: [
        { q: "Who went astray, in 37:71?", a: "Most of the earlier ones", wrong: ["None", "Only one", "The angels"], why: "And indeed most of the earlier ones went astray before them." },
        { q: "How did they stray, per Ibn Kathir?", a: "Worshipping others with Allah", wrong: ["Trading", "Travelling", "Building"], why: "Most of the previous nations went astray, worshipping other gods alongside Allah." },
        { tf: true, q: "Being the majority does not make a path right.", why: "And indeed most of the earlier ones went astray before them." }
      ]
    },
    {
      slug: "warners-were-sent",
      title: "Warners were sent",
      line: "Allah sent warners among them.",
      facts: ["No nation left without warning", "Messengers called to Tawhid"],
      quote: q37(72),
      source: ik(72, "Allah sent warners among them to alert them to His anger towards those who disbelieve.", "He sent among them warners to alert them"),
      difficulty: 2,
      questions: [
        { q: "Whom did Allah send, in 37:72?", a: "Warners", wrong: ["Armies", "Merchants", "Poets"], why: "And indeed We sent among them warners." },
        { q: "Why were they sent, per Ibn Kathir?", a: "To alert them", wrong: ["To trade", "To rule", "To build"], why: "He sent among them warners to alert them to the anger, wrath and vengeance of Allah towards those who disbelieve." },
        { tf: true, q: "Allah warns before He punishes.", why: "He sent among them warners to alert them." }
      ]
    },
    {
      slug: "see-the-end",
      title: "See the end",
      line: "See what was the end of those who were warned.",
      facts: ["Deniers destroyed", "Believers saved"],
      quote: q37(73),
      source: ik(73, "They persisted in denying, so Allah destroyed the disbelievers and saved the believers.", "He destroyed those who disbelieved in Him and saved the believers"),
      difficulty: 2,
      questions: [
        { q: "What are we told to look at, in 37:73?", a: "The end of those warned", wrong: ["The stars", "Their houses", "Their gold"], why: "Then see what was the end of those who were warned." },
        { q: "What did Allah do, per Ibn Kathir?", a: "Destroyed deniers, saved believers", wrong: ["Saved everyone", "Ignored them", "Gave them kings"], why: "He destroyed those who disbelieved in Him and saved the believers and caused them to prevail." },
        { tf: false, q: "The believers were destroyed with the deniers.", why: "He destroyed those who disbelieved in Him and saved the believers." }
      ]
    },
    {
      slug: "except-the-chosen",
      title: "Except the chosen",
      line: "Except the chosen, sincere servants of Allah.",
      facts: ["The believers were saved", "Sincerity protects"],
      quote: q37(74),
      source: ik(74, "Allah saved the believers and caused them to prevail.", "saved the believers and caused them to prevail"),
      difficulty: 2,
      questions: [
        { q: "Who is excepted, in 37:74?", a: "The chosen servants of Allah", wrong: ["The strong", "The many", "The rich"], why: "Except the chosen servants of Allah." },
        { q: "What happened to the believers, per Ibn Kathir?", a: "Saved and made to prevail", wrong: ["Lost", "Exiled", "Forgotten"], why: "Saved the believers and caused them to prevail." },
        { tf: true, q: "This phrase also appeared in 37:40.", why: "Save the chosen servants of Allah (37:40)." }
      ]
    },
    {
      slug: "nuh-called-out",
      title: "Nuh called out",
      line: "Nuh called on Allah, the best of those who answer.",
      facts: ["He called for 950 years", "Few believed"],
      quote: q37(75),
      source: ik(75, "Nuh stayed among them a thousand years less fifty; when they turned away more, he prayed for help.", "He stayed among them for one thousand years less fifty"),
      difficulty: 2,
      questions: [
        { q: "Who called on Allah, in 37:75?", a: "Nuh", wrong: ["Hud", "Salih", "Lut"], why: "And indeed Nuh invoked Us, and We are the best of those who answer." },
        { q: "How long did he stay among them, per Ibn Kathir?", a: "1000 years less 50", wrong: ["40 years", "100 years", "10 years"], why: "He stayed among them for one thousand years less fifty." },
        { q: "What did he say in prayer, per Ibn Kathir?", a: "I have been overcome, so help me", wrong: ["Give me gold", "Make me king", "Let me rest"], why: "He prayed to his Lord saying, I have been overcome, so help (me)!" }
      ]
    },
    {
      slug: "rescued-from-distress",
      title: "Rescued from distress",
      line: "Allah saved Nuh and his family from the great distress.",
      facts: ["Distress of insults", "And of their disbelief"],
      quote: q37(76),
      source: ik(76, "The great distress means their disbelief and their insults.", "their disbelief and their insults"),
      difficulty: 2,
      questions: [
        { q: "Whom did Allah rescue, in 37:76?", a: "Nuh and his family", wrong: ["The whole town", "The kings", "No one"], why: "And We rescued him and his family from the great distress." },
        { q: "What was the distress, per Ibn Kathir?", a: "Their disbelief and insults", wrong: ["A drought", "A war", "An illness"], why: "Means, their disbelief and their insults." },
        { tf: true, q: "Allah answers those who call on Him with patience.", why: "And indeed Nuh invoked Us, and We are the best of those who answer." }
      ]
    },
    {
      slug: "his-children-remained",
      title: "His children remained",
      line: "Allah made his descendants the ones who remained.",
      facts: ["Only his offspring was left", "People came from them"],
      quote: q37(77),
      source: ik(77, "Ibn Abbas said no one was left except the offspring of Nuh.", "There was no one left apart from the offspring of Nuh"),
      difficulty: 3,
      questions: [
        { q: "Who survived, in 37:77?", a: "His progeny", wrong: ["His enemies", "Only animals", "No one"], why: "And, his progeny, them We made the survivors." },
        { q: "Who was left, per Ibn Abbas?", a: "Only Nuh's offspring", wrong: ["Many nations", "The idol makers", "The rich"], why: "There was no one left apart from the offspring of Nuh." },
        { q: "Who descended from them, per Qatadah?", a: "All people", wrong: ["Only Arabs", "Only kings", "No one"], why: "All people descended from the offspring of Nuh." }
      ]
    },
    {
      slug: "a-good-remembrance",
      title: "A good remembrance",
      line: "Allah left for him a good mention among later people.",
      facts: ["Praised by the Prophets", "Remembered with goodness"],
      quote: q37(78),
      source: ik(78, "Ibn Abbas said he is remembered in a good way; Mujahid said an honourable mention by all the Prophets.", "An honorable mention by all the Prophets"),
      difficulty: 2,
      questions: [
        { q: "What did Allah leave for Nuh, in 37:78?", a: "A good remembrance", wrong: ["A palace", "A treasure", "A statue"], why: "And left for him a goodly remembrance among the later generation." },
        { q: "What did Mujahid say it means?", a: "Honourable mention by the Prophets", wrong: ["A big house", "A long life", "A new ship"], why: "Mujahid said this means An honorable mention by all the Prophets." },
        { q: "What did Ibn Abbas say?", a: "He is remembered well", wrong: ["He is forgotten", "He is unknown", "He is blamed"], why: "Ibn Abbas said, He is remembered in a good way." }
      ]
    },
    {
      slug: "peace-upon-nuh",
      title: "Peace upon Nuh",
      line: "Peace be upon Nuh among all the worlds!",
      facts: ["Greeted by all nations", "An honour from Allah"],
      quote: q37(79),
      source: ik(79, "He is greeted with peace by all groups and nations.", "he is greeted with peace by all groups and nations"),
      difficulty: 2,
      questions: [
        { q: "What is said of Nuh, in 37:79?", a: "Peace be upon Nuh", wrong: ["Shame on Nuh", "Nuh is gone", "Nuh is king"], why: "Salam (peace!) be upon Nuh among the all creatures!" },
        { q: "Who greets him, per Ibn Kathir?", a: "All groups and nations", wrong: ["Only his family", "No one", "Only Arabs"], why: "He is greeted with peace by all groups and nations." },
        { tf: true, q: "We say alayhis salam after Nuh's name.", why: "Salam (peace!) be upon Nuh among the all creatures!" }
      ]
    },
    {
      slug: "rewarding-the-good",
      title: "Rewarding the good",
      line: "That is how Allah rewards those who do good.",
      facts: ["Honoured after death", "Obedience is rewarded"],
      quote: q37(80),
      source: ik(80, "This is how Allah rewards His obedient servants: an honourable mention long after death.", "after he died he is still remembered in a manner that befits his status"),
      difficulty: 2,
      questions: [
        { q: "Whom does Allah reward this way, in 37:80?", a: "The good-doers", wrong: ["The proud", "The lazy", "The rich"], why: "Verily, thus We reward the gooddoers." },
        { q: "How was Nuh honoured, per Ibn Kathir?", a: "Remembered well after death", wrong: ["Given a crown", "Given gold", "Made young"], why: "After he died he is still remembered in a manner that befits his status." },
        { tf: true, q: "Doing good brings honour that lasts.", why: "Verily, thus We reward the gooddoers." }
      ]
    },
    {
      slug: "a-believing-servant",
      title: "A believing servant",
      line: "He was one of Allah's believing servants.",
      facts: ["Sincere in Tawhid", "Certain faith"],
      quote: q37(81),
      source: ik(81, "He was one of the sincere believers in the Oneness of Allah, with certain faith.", "one of the sincere believers in the Oneness of Allah"),
      difficulty: 2,
      questions: [
        { q: "How is Nuh described, in 37:81?", a: "One of Our believing servants", wrong: ["A king", "A trader", "A poet"], why: "Verily, he was one of Our believing servants." },
        { q: "What kind of faith, per Ibn Kathir?", a: "Certain faith", wrong: ["Weak faith", "Doubtful faith", "No faith"], why: "One of those who had certain faith." },
        { tf: true, q: "Being Allah's servant is the highest honour.", why: "Verily, he was one of Our believing servants." }
      ]
    },
    {
      slug: "the-others-drowned",
      title: "The others drowned",
      line: "Then Allah drowned the others.",
      facts: ["No trace left of them", "Remembered only for denial"],
      quote: q37(82),
      source: ik(82, "Allah destroyed them; no trace was left, and they are known only by this description.", "there was no trace whatsoever left of them"),
      difficulty: 2,
      questions: [
        { q: "What happened to the others, in 37:82?", a: "They were drowned", wrong: ["They became kings", "They moved away", "They were rewarded"], why: "Then We drowned the others." },
        { q: "What was left of them, per Ibn Kathir?", a: "No trace", wrong: ["A great city", "Their ships", "Their idols"], why: "We destroyed them, and there was no trace whatsoever left of them." },
        { tf: false, q: "The deniers are remembered with praise.", why: "They are only known by this unfavorable description." }
      ]
    },
    {
      slug: "ibrahim-followed-his-way",
      title: "Ibrahim followed his way",
      line: "Ibrahim was among those who followed Nuh's way.",
      facts: ["Same religion of Tawhid", "Same path"],
      quote: q37(83),
      source: ik(83, "Ibn Abbas said Ibrahim was one of the followers of Nuh's religion; Mujahid said he followed his path.", "he was one of the followers of his religion"),
      difficulty: 2,
      questions: [
        { q: "Who followed Nuh's way, in 37:83?", a: "Ibrahim", wrong: ["Fir'awn", "Namrud", "Qarun"], why: "And verily, among those who followed his way was Ibrahim." },
        { q: "What does it mean, per Ibn Abbas?", a: "He followed his religion", wrong: ["He built a ship", "He lived nearby", "He was his son"], why: "Means, he was one of the followers of his religion." },
        { tf: true, q: "All Prophets called to the same Tawhid.", why: "He was one of the followers of his religion." }
      ]
    },
    {
      slug: "a-sound-heart",
      title: "A sound heart",
      line: "He came to his Lord with a sound heart.",
      facts: ["Free from Shirk", "Sure of the Hour"],
      quote: q37(84),
      source: ik(84, "Al-Hasan said a sound heart is free from Shirk; Ibn Sirin said it knows Allah is true and the Hour will come.", "One that is free from Shirk"),
      difficulty: 3,
      questions: [
        { q: "With what did he come, in 37:84?", a: "A sound heart", wrong: ["Great wealth", "A big army", "Many idols"], why: "When he came to his Lord with a Salim heart." },
        { q: "What is a sound heart, per Al-Hasan?", a: "Free from Shirk", wrong: ["Full of gold", "Very brave", "Never sad"], why: "Al-Hasan said, One that is free from Shirk." },
        { q: "What does it know, per Ibn Sirin?", a: "Allah is true and the Hour will come", wrong: ["Every language", "All prices", "Every road"], why: "One which knows that Allah is true and that the Hour will undoubtedly come to pass." }
      ]
    },
    {
      slug: "what-a-sound-heart-is",
      title: "What a sound heart is",
      line: "A sound heart is free of shirk, doubts, cheating and envy.",
      facts: ["As-Sa'di explains", "Qalb Salim"],
      quote: q37(84),
      source: saadi(37, 84, "As-Sa'di says Ibrahim's sound heart was free of shirk, doubts and desires that block the truth, and also free of cheating and envying people, so he sincerely advised others, starting with his father.", "ومن سلامته أنه سليم من غش الخلق وحسدهم"),
      difficulty: 2,
      questions: [
        { q: "What is a sound heart free of, per as-Sa'di?", a: "Shirk, doubts and envy", wrong: ["Joy", "Love", "Hope"], why: "It is free of shirk, doubts, cheating and envy, says as-Sa'di." },
        { q: "Whom did Ibrahim advise first, per as-Sa'di on 37:84?", a: "His father and his people", wrong: ["The king", "Strangers", "No one"], why: "He advised people for Allah, starting with his father and people." },
        { tf: true, q: "When a heart is sound, it is safe from every evil.", why: "As-Sa'di on 37:84." }
      ]
    },
    {
      slug: "what-do-you-worship",
      title: "What do you worship?",
      line: "He asked his father and people: what do you worship?",
      facts: ["He spoke against idols", "Even to his father"],
      quote: q37(85),
      source: ik(85, "He denounced his people for their worship of idols and false gods.", "He denounced his people for their worship of idols and false gods"),
      difficulty: 2,
      questions: [
        { q: "Whom did he ask, in 37:85?", a: "His father and his people", wrong: ["The king only", "Strangers", "Angels"], why: "When he said to his father and to his people: What is it that which you worship?" },
        { q: "What did he denounce, per Ibn Kathir?", a: "Their worship of idols", wrong: ["Their trade", "Their food", "Their clothes"], why: "He denounced his people for their worship of idols and false gods." },
        { tf: true, q: "Ibrahim spoke the truth even to his own family.", why: "When he said to his father and to his people: What is it that which you worship?" }
      ]
    },
    {
      slug: "a-falsehood",
      title: "A falsehood",
      line: "Is it falsehood, gods besides Allah, that you want?",
      facts: ["False gods are a lie", "A sharp question"],
      quote: q37(86),
      source: ik(86, "He denounced their worship of idols and false gods besides Allah.", "Is it a falsehood"),
      difficulty: 2,
      questions: [
        { q: "What did he call their gods, in 37:86?", a: "A falsehood", wrong: ["A truth", "A help", "A blessing"], why: "Is it a falsehood, gods other than Allah, that you desire?" },
        { q: "What were they choosing, in 37:86?", a: "Gods other than Allah", wrong: ["Allah alone", "Nothing", "Knowledge"], why: "Is it a falsehood, gods other than Allah, that you desire?" },
        { tf: false, q: "Ibrahim praised the idols.", why: "He denounced his people for their worship of idols and false gods." }
      ]
    },
    {
      slug: "what-do-you-think-of-him",
      title: "What do you think of Him?",
      line: "What do you think of the Lord of all the worlds?",
      facts: ["Think of meeting Him", "After worshipping others"],
      quote: q37(87),
      source: ik(87, "Qatadah said it means: what do you think He will do with you when you meet Him?", "what do you think He will do with you when you meet Him"),
      difficulty: 3,
      questions: [
        { q: "About whom did he ask, in 37:87?", a: "The Lord of all that exists", wrong: ["The king", "The idols", "The stars"], why: "Then what think you about the Lord of the all that exists?" },
        { q: "What does it mean, per Qatadah?", a: "What will He do when you meet Him?", wrong: ["Where does He live?", "How old is He?", "Who are His parents?"], why: "What do you think He will do with you when you meet Him, given that you worshipped others alongside Him?" },
        { tf: true, q: "Every person will meet Allah.", why: "What do you think He will do with you when you meet Him?" }
      ]
    },
    {
      slug: "a-look-at-the-stars",
      title: "A look at the stars",
      line: "He glanced at the stars, thinking deeply.",
      facts: ["A sign of deep thought", "Planning to stay behind"],
      quote: q37(88),
      source: ik(88, "Qatadah said the Arabs say of one who thinks deeply that he is looking at the stars.", "The Arabs say of one who thinks deeply that he is looking at the stars"),
      difficulty: 3,
      questions: [
        { q: "Where did he look, in 37:88?", a: "At the stars", wrong: ["At the sea", "At the ground", "At the idols"], why: "Then he cast a glance at the stars." },
        { q: "What does it mean, per Qatadah?", a: "Thinking deeply", wrong: ["Telling fortunes", "Counting", "Sleeping"], why: "The Arabs say of one who thinks deeply that he is looking at the stars." },
        { q: "Why did he want to stay, per Ibn Kathir?", a: "To be alone with their idols", wrong: ["To rest", "To trade", "To hide"], why: "He wanted to be alone with their gods so that he could break them." }
      ]
    },
    {
      slug: "i-am-sick",
      title: "I am sick",
      line: "He said: I am sick, sick at heart of their idols.",
      facts: ["Their festival was near", "He stayed behind"],
      quote: q37(89),
      source: ik(89, "It was said that he meant he was sick at heart of their worshipping idols instead of Allah.", "I am sick at heart of your worshipping idols instead of Allah"),
      difficulty: 3,
      questions: [
        { q: "What did Ibrahim say, in 37:89?", a: "I am sick", wrong: ["I am hungry", "I am busy", "I am king"], why: "And he said: Verily, I am sick." },
        { q: "What was he sick of, per Ibn Kathir?", a: "Their idol worship", wrong: ["The weather", "The food", "Travelling"], why: "I am sick at heart of your worshipping idols instead of Allah." },
        { q: "Where were his people going, per Ibn Kathir?", a: "To their festival", wrong: ["To war", "To Makkah", "To sleep"], why: "So that he could stay behind in the city when they went out for their festival." }
      ]
    },
    {
      slug: "they-left-him",
      title: "They left him",
      line: "So they turned away from him and left.",
      facts: ["The town emptied", "He went quietly to the idols"],
      quote: q37(90),
      source: ik(90, "After they left, he went to the idols quickly and secretly.", "he went to them after they had left, quickly and secretly"),
      difficulty: 2,
      questions: [
        { q: "What did his people do, in 37:90?", a: "Turned away and departed", wrong: ["Stayed with him", "Called a doctor", "Prayed"], why: "So they turned away from him and departed." },
        { q: "How did he go to the idols, per Ibn Kathir?", a: "Quickly and secretly", wrong: ["Slowly and loudly", "With an army", "At dawn with his people"], why: "He went to them after they had left, quickly and secretly." },
        { tf: true, q: "His plan was to show the idols were helpless.", why: "He wanted to be alone with their gods so that he could break them." }
      ]
    },
    {
      slug: "will-you-not-eat",
      title: "Will you not eat?",
      line: "He turned to their idols: will you not eat?",
      facts: ["Food was set before idols", "They cannot eat"],
      quote: q37(91),
      source: ik(91, "They had placed food before the idols so it might be blessed; he asked them: will you not eat?", "They had placed food before them as a sacrifice, so that the food might be blessed"),
      difficulty: 2,
      questions: [
        { q: "What did he ask the idols, in 37:91?", a: "Will you not eat?", wrong: ["Will you sleep?", "Will you run?", "Will you sing?"], why: "Then he turned to their gods and said: Will you not eat?" },
        { q: "Why was food there, per Ibn Kathir?", a: "So it would be blessed", wrong: ["For guests", "For sale", "For animals"], why: "They had placed food before them as a sacrifice, so that the food might be blessed." },
        { tf: true, q: "His question showed the idols were lifeless.", why: "Will you not eat? What is the matter with you that you speak not?" }
      ]
    },
    {
      slug: "why-do-you-not-speak",
      title: "Why do you not speak?",
      line: "What is wrong with you, that you do not speak?",
      facts: ["Idols cannot answer", "Proof against their worship"],
      quote: q37(92),
      source: ik(92, "Ibrahim looked at the food before the idols and asked why they did not eat or speak.", "What is the matter with you that you speak not"),
      difficulty: 2,
      questions: [
        { q: "What could the idols not do, in 37:92?", a: "Speak", wrong: ["Stand", "Shine", "Be carved"], why: "What is the matter with you that you speak not?" },
        { tf: true, q: "A god that cannot speak cannot answer prayers.", why: "What is the matter with you that you speak not?" },
        { tf: false, q: "The idols answered Ibrahim.", why: "What is the matter with you that you speak not?" }
      ]
    },
    {
      slug: "with-his-right-hand",
      title: "With his right hand",
      line: "Then he struck the idols with his right hand.",
      facts: ["The right hand is stronger", "He left the biggest one"],
      quote: q37(93),
      source: ik(93, "He struck them with his right hand, being stronger, leaving all broken except the biggest.", "the right hand is stronger and more powerful"),
      difficulty: 2,
      questions: [
        { q: "How did he strike them, in 37:93?", a: "With his right hand", wrong: ["With a stick", "With his foot", "With fire"], why: "Then he turned upon them, striking them with his right hand." },
        { q: "Why the right hand, per Ibn Kathir?", a: "It is stronger", wrong: ["It is longer", "It is cleaner", "No reason"], why: "Because the right hand is stronger and more powerful." },
        { q: "Which idol did he leave, per Ibn Kathir?", a: "The biggest", wrong: ["The smallest", "None", "The oldest"], why: "Then he left them broken to pieces, all except the biggest of them." }
      ]
    },
    {
      slug: "they-came-rushing",
      title: "They came rushing",
      line: "Then the people came rushing towards him.",
      facts: ["They found out who did it", "Told in detail in Al-Anbiya"],
      quote: q37(94),
      source: ik(94, "Mujahid said they came rushing; the story is told in more detail in Surat Al-Anbiya.", "they came rushing"),
      difficulty: 2,
      questions: [
        { q: "How did they come, in 37:94?", a: "Hastily", wrong: ["Slowly", "Singing", "Silently"], why: "Then they came hastily towards him." },
        { q: "Where is the story told in detail, per Ibn Kathir?", a: "Surat Al-Anbiya", wrong: ["Surat Al-Fil", "Surat An-Nas", "Surat Al-Kawthar"], why: "In Surat Al-Anbiya, it is told in more detail." },
        { tf: true, q: "They first had to find out who did it.", why: "They did not know at first who had done this, until they investigated and found out that Ibrahim was the one." }
      ]
    },
    {
      slug: "what-you-carve",
      title: "What you carve",
      line: "Do you worship what you carve with your own hands?",
      facts: ["Made by their own hands", "How can it be a god?"],
      quote: q37(95),
      source: ik(95, "Do you worship instead of Allah idols that you yourselves carve and fashion with your own hands?", "idols which you yourselves carve and fashion with your own hands"),
      difficulty: 2,
      questions: [
        { q: "What did he ask, in 37:95?", a: "Do you worship what you carve?", wrong: ["Who broke them?", "Where is food?", "When is the festival?"], why: "He said: Worship you that which you yourselves carve?" },
        { q: "Who made the idols, per Ibn Kathir?", a: "The people themselves", wrong: ["Allah", "The angels", "Nobody"], why: "Idols which you yourselves carve and fashion with your own hands." },
        { tf: true, q: "A made thing cannot be worthy of worship.", why: "Do you worship instead of Allah idols which you yourselves carve and fashion with your own hands?" }
      ]
    },
    {
      slug: "allah-created-you",
      title: "Allah created you",
      line: "While Allah created you and what you make!",
      facts: ["He creates doers and deeds", "Even their idols' material"],
      quote: q37(96),
      source: ik(96, "Allah created you and what you do or make; Ibn Kathir notes a report that Allah created every doer and deed.", "Allah has created every doer of deeds and what he does"),
      difficulty: 3,
      questions: [
        { q: "Who created them, in 37:96?", a: "Allah", wrong: ["Their idols", "Their fathers alone", "The stars"], why: "While Allah has created you and what you make!" },
        { q: "What else did Allah create, in 37:96?", a: "What they make", wrong: ["Nothing else", "Only the sky", "Only animals"], why: "While Allah has created you and what you make!" },
        { q: "What did Ibn Kathir say of the two meanings?", a: "They are synonymous", wrong: ["Both are wrong", "They contradict", "Neither is known"], why: "Allah has created you and what you do; or Allah has created you and what you make. Both views are synonymous." }
      ]
    },
    {
      slug: "into-the-fire",
      title: "Into the fire",
      line: "They said: build a furnace and throw him in the fire!",
      facts: ["Proof defeated them", "So they turned to force"],
      quote: q37(97),
      source: ik(97, "When the proof was established against them, they resolved to seize him by force.", "When the proof had been established against them, they resolved to seize him by force"),
      difficulty: 3,
      questions: [
        { q: "What did they plan, in 37:97?", a: "To throw him in a fire", wrong: ["To make him king", "To send him away", "To pay him"], why: "They said: Build for him a building and throw him into the blazing fire!" },
        { q: "Why use force, per Ibn Kathir?", a: "They lost the argument", wrong: ["He attacked them", "He was rich", "The king was ill"], why: "When the proof had been established against them, they resolved to seize him by force." },
        { tf: true, q: "Those who lose an argument sometimes turn to force.", why: "When the proof had been established against them, they resolved to seize him by force." }
      ]
    },
    {
      slug: "made-the-lowest",
      title: "Made the lowest",
      line: "They plotted against him, but Allah made them the lowest.",
      facts: ["Allah saved him from the fire", "His proof prevailed"],
      quote: q37(98),
      source: ik(98, "Allah saved him from the fire and made him prevail, making his proof supreme.", "Allah saved him from the fire and caused him to prevail over them"),
      difficulty: 2,
      questions: [
        { q: "What did Allah make them, in 37:98?", a: "The lowest", wrong: ["The highest", "The richest", "The strongest"], why: "So, they plotted a plot against him, but We made them the lowest." },
        { q: "What did Allah do for Ibrahim, per Ibn Kathir?", a: "Saved him from the fire", wrong: ["Let him burn", "Sent him to sea", "Made him silent"], why: "Allah saved him from the fire and caused him to prevail over them." },
        { tf: true, q: "No plot can harm one whom Allah protects.", why: "So, they plotted a plot against him, but We made them the lowest." }
      ]
    }
  ]
};

/** Ayahs 99 to 122: Ibrahim's journey to his Lord, the great test of his son, the ransom, Ishaq, and Musa and Harun. */
const SAFFAT_FOUR: DeepUnit = {
  key: "saffat4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-37",
  name: "As-Saffat, ayahs 99 to 122",
  kind: "skill",
  lessonType: "surah",
  surahName: "As-Saffat",
  lessons: [
    {
      slug: "going-to-my-lord",
      title: "Going to my Lord",
      line: "Ibrahim said: I am going to my Lord; He will guide me.",
      facts: ["He left his people", "After all the signs they saw"],
      quote: q37(99),
      source: ik(99, "After Ibrahim gave up hope that his people would believe, he emigrated away from them.", "he emigrated away from them"),
      difficulty: 2,
      questions: [
        { q: "Where was Ibrahim going, in 37:99?", a: "To his Lord", wrong: ["To the market", "To the king", "To the sea"], why: "And he said: Verily, I am going to my Lord. He will guide me." },
        { q: "What did he do, per Ibn Kathir?", a: "He emigrated from his people", wrong: ["He became king", "He hid in a cave", "He built idols"], why: "He emigrated away from them." },
        { tf: true, q: "Ibrahim trusted Allah to guide him.", why: "Verily, I am going to my Lord. He will guide me." }
      ]
    },
    {
      slug: "grant-me-righteous-children",
      title: "Grant me righteous children",
      line: "My Lord, grant me a child from the righteous.",
      facts: ["He asked for obedient children", "In place of those he left"],
      quote: q37(100),
      source: ik(100, "He asked for obedient children in place of the people and relatives he had left.", "obedient children, in compensation for his people and relatives whom he had left"),
      difficulty: 2,
      questions: [
        { q: "What did Ibrahim ask for, in 37:100?", a: "Righteous offspring", wrong: ["Wealth", "A palace", "Fame"], why: "My Lord! Grant me offspring from the righteous." },
        { q: "What does righteous mean, per Ibn Kathir?", a: "Obedient children", wrong: ["Rich children", "Many servants", "Strong soldiers"], why: "Meaning, obedient children, in compensation for his people and relatives whom he had left." },
        { tf: true, q: "Parents can make dua for righteous children.", why: "My Lord! Grant me offspring from the righteous." }
      ]
    },
    {
      slug: "a-forbearing-boy",
      title: "A forbearing boy",
      line: "Allah gave him good news of a gentle, forbearing boy.",
      facts: ["Ibn Kathir: this was Ismail", "His first son"],
      quote: q37(101),
      source: ik(101, "Ibn Kathir says this child was Ismail, the first son Ibrahim was given glad tidings of, older than Ishaq.", "he was the first child of whom glad tidings were given to Ibrahim"),
      difficulty: 3,
      questions: [
        { q: "What good news came, in 37:101?", a: "A forbearing boy", wrong: ["A great kingdom", "A treasure", "Rain"], why: "So, We gave him the glad tidings of a forbearing boy." },
        { q: "Who was the boy of 37:101, per Ibn Kathir?", a: "Ismail", wrong: ["Yusuf", "Musa", "Dawud"], why: "This child was Ismail, for he was the first child of whom glad tidings were given to Ibrahim." },
        { q: "Who was older, per Ibn Kathir?", a: "Ismail", wrong: ["Ishaq", "They were twins", "Unknown"], why: "He was the first child of whom glad tidings were given to Ibrahim, and he was older than Ishaq." }
      ]
    },
    {
      slug: "the-dream",
      title: "The dream",
      line: "Ibrahim told his son of a dream: a command to sacrifice him.",
      facts: ["Prophets' dreams are revelation", "He asked his son's view"],
      quote: q37(102),
      source: ik(102, "Ubayd bin Umayr said the dreams of the Prophets are revelation; he told his son to test his patience and ease it for him.", "The dreams of the Prophets are revelation"),
      difficulty: 3,
      questions: [
        { q: "What did Ibrahim see, in 37:102?", a: "A dream", wrong: ["A star", "A letter", "An army"], why: "O my son! I have seen in a dream that I am sacrificing you. So look what you think!" },
        { q: "What are Prophets' dreams, per Ubayd bin Umayr?", a: "Revelation", wrong: ["Wishes", "Stories", "Fears"], why: "The dreams of the Prophets are revelation." },
        { q: "Why did he tell his son, per Ibn Kathir?", a: "To ease it and test his patience", wrong: ["To scare him", "To joke", "To send him away"], why: "He told his son that in order to make it easier for him, and also to test his patience and resolve." }
      ]
    },
    {
      slug: "do-what-you-are-commanded",
      title: "Do what you are commanded",
      line: "The son said: father, do as commanded; I will be patient.",
      facts: ["Obeying Allah and his father", "If Allah wills"],
      quote: q37(102),
      source: ik(102, "He meant: obey Allah's command; I will be patient and seek the reward with Allah.", "I will be patient and will seek the reward for that with Allah"),
      difficulty: 3,
      questions: [
        { q: "What did the son say, in 37:102?", a: "Do what you are commanded", wrong: ["Please wait", "I will run", "Ask again"], why: "He said: O my father! Do that which you are commanded." },
        { q: "What did he promise, in 37:102?", a: "To be patient", wrong: ["To be rich", "To be strong", "To be quiet"], why: "If Allah wills, you shall find me of the patient." },
        { q: "What did he seek, per Ibn Kathir?", a: "Reward from Allah", wrong: ["Praise", "Money", "Fame"], why: "I will be patient and will seek the reward for that with Allah." }
      ]
    },
    {
      slug: "patience-with-in-sha-allah",
      title: "Patience with in sha Allah",
      line: "Ismail promised patience, but tied it to Allah's will.",
      facts: ["As-Sa'di explains", "In sha Allah"],
      quote: q37(102),
      source: saadi(37, 102, "As-Sa'di says the son was Ismail, who told his father to do as Allah commanded and promised to be patient, joining it to Allah's will, because nothing happens without Allah's will.", "وقرن ذلك بمشيئة اللّه تعالى، لأنه لا يكون شيء بدون مشيئة اللّه تعالى"),
      difficulty: 2,
      questions: [
        { q: "Why did Ismail say in sha Allah, per as-Sa'di?", a: "Nothing happens without Allah's will", wrong: ["He was unsure of Allah", "It was a habit", "To delay"], why: "Nothing happens without Allah's will, says as-Sa'di." },
        { q: "What are a Prophet's dreams, per as-Sa'di on 37:102?", a: "Revelation", wrong: ["Just thoughts", "Stories", "Guesses"], why: "The dreams of the Prophets are revelation." },
        { tf: true, q: "Ismail was patient, pleasing his Lord and kind to his father.", why: "As-Sa'di on 37:102." }
      ]
    },
    {
      slug: "both-submitted",
      title: "Both submitted",
      line: "When both submitted to Allah, he laid him on his forehead.",
      facts: ["Both obeyed Allah", "The son obeyed his father too"],
      quote: q37(103),
      source: ik(103, "They submitted and followed Allah's command; Ibrahim obeyed Allah, and Ismail obeyed Allah and his father.", "Ibrahim obeyed the command of Allah"),
      difficulty: 3,
      questions: [
        { q: "What did both do, in 37:103?", a: "Submit to Allah", wrong: ["Run away", "Argue", "Ask for time"], why: "Then, when they had both submitted themselves." },
        { q: "Whom did the son obey, per Ibn Kathir?", a: "Allah and his father", wrong: ["Only his mother", "Only himself", "The king"], why: "Ismail obeyed Allah and his father." },
        { tf: true, q: "He laid him facedown so he would not see his face.", why: "He placed him facedown so that he could not have to see his face, so that it would be easier for him." }
      ]
    },
    {
      slug: "o-ibrahim",
      title: "O Ibrahim!",
      line: "Allah called out to him: O Ibrahim!",
      facts: ["The call came in time", "The test was passed"],
      quote: q37(104),
      source: ik(104, "He was called from behind, turned, and saw a fine horned white ram.", "Ibrahim turned, and saw a fine, horned, white ram"),
      difficulty: 2,
      questions: [
        { q: "Who called Ibrahim, in 37:104?", a: "Allah", wrong: ["His son", "His people", "A stranger"], why: "We called out to him: O Ibrahim!" },
        { q: "What did he see when he turned, per Ibn Abbas?", a: "A horned white ram", wrong: ["A camel", "A lion", "An idol"], why: "Ibrahim turned, and saw a fine, horned, white ram." },
        { tf: true, q: "Allah stopped the sacrifice of the son.", why: "We called out to him: O Ibrahim! You have fulfilled the dream!" }
      ]
    },
    {
      slug: "you-fulfilled-the-dream",
      title: "You fulfilled the dream",
      line: "You have fulfilled the dream; so We reward the good.",
      facts: ["Obedience was the goal", "A way out for the patient"],
      quote: q37(105),
      source: ik(105, "This is how Allah deals with those who obey Him in hard things: He makes for them a way out.", "We make for them a way out"),
      difficulty: 3,
      questions: [
        { q: "What did Ibrahim fulfil, in 37:105?", a: "The dream", wrong: ["A debt", "A promise to the king", "A journey"], why: "You have fulfilled the dream! Verily, thus do We reward the doers of good." },
        { q: "What does Allah give the obedient, per Ibn Kathir?", a: "A way out", wrong: ["A harder test", "Nothing", "Wealth only"], why: "This is how We deal with those who obey Us in things that are difficult for them; We make for them a way out." },
        { q: "Which ayah promises a way out for Taqwa?", a: "65:2", wrong: ["1:1", "112:1", "114:1"], why: "And whosoever has Taqwa of Allah, He will make a way for him to get out (65:2-3)." }
      ]
    },
    {
      slug: "a-clear-test",
      title: "A clear test",
      line: "Truly, that was a clear test.",
      facts: ["He hurried to obey", "Allah rewarded his resolve"],
      quote: q37(106),
      source: ik(106, "It was clearly a test, and he hastened to do it in obedience to Allah.", "it was clearly a test when he was commanded to sacrifice his son"),
      difficulty: 2,
      questions: [
        { q: "What was it, in 37:106?", a: "A manifest trial", wrong: ["A game", "A mistake", "A punishment"], why: "Verily, that indeed was a manifest trial." },
        { q: "How did Ibrahim respond, per Ibn Kathir?", a: "He hastened to obey", wrong: ["He refused", "He delayed", "He complained"], why: "He hastened to do it, in submission to the command of Allah and in obedience to Him." },
        { q: "What was the main purpose, per Ibn Kathir?", a: "To reward his patience", wrong: ["To harm his son", "To test the son only", "No purpose"], why: "The purpose of His command had been primarily to reward His close Friend for his patience and resolve." }
      ]
    },
    {
      slug: "a-great-ransom",
      title: "A great ransom",
      line: "Allah ransomed him with a great sacrifice.",
      facts: ["A ram in his place", "The ram horns were kept in the Kabah"],
      quote: q37(107),
      source: ik(107, "The ram horns were kept in the Kabah until the Prophet ﷺ was sent, passed down among the Quraysh.", "The Quraysh had inherited the horns of the ram that Ibrahim sacrificed"),
      difficulty: 3,
      questions: [
        { q: "How was the son ransomed, in 37:107?", a: "With a great sacrifice", wrong: ["With gold", "With a promise", "With nothing"], why: "And We ransomed him with a great sacrifice." },
        { q: "Where were the ram's horns kept, per Ibn Kathir?", a: "In the Kabah", wrong: ["In Egypt", "In a cave", "In Shaam"], why: "I saw the horns of the ram when I entered the House." },
        { tf: true, q: "Muslims remember the ransom at Eid al-Adha.", why: "And We ransomed him with a great sacrifice." }
      ]
    },
    {
      slug: "the-sunnah-of-sacrifice",
      title: "The Sunnah of sacrifice",
      line: "The Prophet ﷺ sacrificed two horned rams for Eid.",
      facts: ["Following Ibrahim's way", "Saying Allah's Name"],
      quote: q37(107),
      source: hadith("bukhari", "5565", "Anas ibn Malik", "Sahih", "The Prophet ﷺ offered two horned rams as sacrifices, saying Allah's Name and Takbir.", "offered as sacrifices, two horned rams"),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ sacrifice, in the hadith?", a: "Two horned rams", wrong: ["Ten camels", "A cow", "Birds"], why: "The Prophet ﷺ offered as sacrifices, two horned rams, black and white in color." },
        { q: "What did he ﷺ say over them?", a: "Allah's Name and Takbir", wrong: ["Nothing", "A poem", "A greeting"], why: "He mentioned Allah's Name over them and said Takbir." },
        { tf: true, q: "Eid sacrifice follows the way of Ibrahim.", why: "And We ransomed him with a great sacrifice." }
      ]
    },
    {
      slug: "remembered-by-later-people",
      title: "Remembered by later people",
      line: "Allah left a good mention for him among later people.",
      facts: ["Loved by all faiths", "Praised forever"],
      quote: q37(108),
      source: ik(108, "Allah follows the story of the sacrifice by honouring Ibrahim and giving him more glad tidings.", "Allah immediately follows that with mention of the glad tidings of his brother Ishaq"),
      difficulty: 2,
      questions: [
        { q: "What did Allah leave for him, in 37:108?", a: "A good mention among later people", wrong: ["A castle", "An army", "A new city"], why: "And We left for him among the later generations." },
        { tf: true, q: "Ibrahim is honoured by people until today.", why: "And We left for him among the later generations." },
        { q: "Who got a good mention, in 37:78?", a: "Nuh", wrong: ["Fir'awn", "Qarun", "Haman"], why: "And left for him a goodly remembrance among the later generation (37:78)." }
      ]
    },
    {
      slug: "peace-upon-ibrahim",
      title: "Peace upon Ibrahim",
      line: "Peace be upon Ibrahim!",
      facts: ["Allah greets him", "We send salam on him"],
      quote: q37(109),
      source: ik(109, "After the test of the sacrifice, Allah says: Salam be upon Ibrahim.", "be upon Ibrahim"),
      difficulty: 1,
      questions: [
        { q: "What is said of Ibrahim, in 37:109?", a: "Peace be upon Ibrahim", wrong: ["Ibrahim is gone", "Ibrahim was wrong", "Ibrahim is king"], why: "Salam (peace!) be upon Ibrahim!" },
        { tf: true, q: "We mention Ibrahim in every prayer's salawat.", why: "Salam (peace!) be upon Ibrahim!" },
        { q: "Who else got Salam, in 37:79?", a: "Nuh", wrong: ["Fir'awn", "Qarun", "Haman"], why: "Salam (peace!) be upon Nuh among the all creatures! (37:79)" }
      ]
    },
    {
      slug: "thus-we-reward",
      title: "Thus We reward",
      line: "That is how Allah rewards those who do good.",
      facts: ["Hard obedience, great reward", "The same promise for us"],
      quote: q37(110),
      source: ik(110, "This is how Allah deals with those who obey Him in things that are difficult for them.", "this is how We deal with those who obey Us in things that are difficult for them"),
      difficulty: 2,
      questions: [
        { q: "Whom does Allah reward, in 37:110?", a: "The doers of good", wrong: ["The proud", "The idle", "The cruel"], why: "Thus indeed do We reward the doers of good." },
        { q: "For what kind of obedience, per Ibn Kathir?", a: "Obedience in hard things", wrong: ["Only easy things", "None", "Only words"], why: "Those who obey Us in things that are difficult for them." },
        { tf: true, q: "This same line was said of Nuh.", why: "Verily, thus We reward the gooddoers (37:80)." }
      ]
    },
    {
      slug: "ibrahim-a-believing-servant",
      title: "A believing servant",
      line: "He was one of Allah's believing servants.",
      facts: ["The close friend of Allah", "Faith tested and proven"],
      quote: q37(111),
      source: ik(111, "Ibrahim was Allah's close friend, who hastened to obey in submission to Allah's command.", "in submission to the command of Allah and in obedience to Him"),
      difficulty: 2,
      questions: [
        { q: "How is Ibrahim described, in 37:111?", a: "A believing servant", wrong: ["A great king", "A merchant", "A poet"], why: "Verily, he was one of Our believing servants." },
        { q: "How did he act, per Ibn Kathir?", a: "In submission to Allah", wrong: ["In doubt", "In anger", "In fear of people"], why: "In submission to the command of Allah and in obedience to Him." },
        { tf: true, q: "Servanthood to Allah is a title of honour.", why: "Verily, he was one of Our believing servants." }
      ]
    },
    {
      slug: "good-news-of-ishaq",
      title: "Good news of Ishaq",
      line: "Allah gave him news of Ishaq, a Prophet among the righteous.",
      facts: ["A second son", "A Prophet himself"],
      quote: q37(112),
      source: ik(112, "After the story of the sacrifice, Allah gives the glad tidings of his brother Ishaq, from whom a righteous Prophet comes.", "from him there will come a righteous Prophet"),
      difficulty: 3,
      questions: [
        { q: "Whose birth was announced, in 37:112?", a: "Ishaq", wrong: ["Yaqub", "Yusuf", "Musa"], why: "And We gave him the glad tidings of Ishaq, a Prophet from the righteous." },
        { q: "What was Ishaq to be, in 37:112?", a: "A Prophet", wrong: ["A king", "A trader", "A soldier"], why: "A Prophet from the righteous." },
        { q: "Which surahs also tell of Ishaq, per Ibn Kathir?", a: "Hud and Al-Hijr", wrong: ["Al-Fil and Quraysh", "An-Nas and Al-Falaq", "Al-Kawthar"], why: "This is also mentioned in Surah Hud (11:71) and in Surat Al-Hijr (15:53-55)." }
      ]
    },
    {
      slug: "blessed-and-their-children",
      title: "Blessed, and their children",
      line: "Allah blessed him and Ishaq; some descendants did good.",
      facts: ["Some do right", "Some wrong themselves"],
      quote: q37(113),
      source: ik(113, "Their offspring include some who do right and some who plainly wrong themselves, like Nuh's descendants.", "We blessed him and Ishaq"),
      difficulty: 3,
      questions: [
        { q: "Whom did Allah bless, in 37:113?", a: "Him and Ishaq", wrong: ["Only the king", "No one", "Only Ismail"], why: "We blessed him and Ishaq." },
        { q: "What are their descendants like, in 37:113?", a: "Some do right, some wrong themselves", wrong: ["All are Prophets", "All are bad", "None remained"], why: "And of their progeny are some that do right, and some that plainly wrong themselves." },
        { tf: false, q: "Being from a Prophet's family guarantees Paradise.", why: "And of their progeny are some that do right, and some that plainly wrong themselves." }
      ]
    },
    {
      slug: "grace-to-musa-and-harun",
      title: "Grace to Musa and Harun",
      line: "Allah gave His grace to Musa and Harun.",
      facts: ["Both made Prophets", "Brothers in the mission"],
      quote: q37(114),
      source: ik(114, "Allah blessed Musa and Harun with prophethood.", "how He blessed Musa and Harun with prophethood"),
      difficulty: 1,
      questions: [
        { q: "Who received Allah's grace, in 37:114?", a: "Musa and Harun", wrong: ["Dawud and Sulayman", "Yusuf and Yaqub", "Hud and Salih"], why: "And, indeed We gave Our grace to Musa and Harun." },
        { q: "What was the grace, per Ibn Kathir?", a: "Prophethood", wrong: ["A palace", "Gold", "A big army"], why: "Allah tells us how He blessed Musa and Harun with prophethood." },
        { tf: true, q: "Musa and Harun were brothers.", why: "And, indeed We gave Our grace to Musa and Harun." }
      ]
    },
    {
      slug: "saved-from-oppression",
      title: "Saved from oppression",
      line: "Allah saved them and their people from great distress.",
      facts: ["Fir'awn oppressed them", "Forced into hard labour"],
      quote: q37(115),
      source: ik(115, "He saved them and the believers from the oppression of Fir'awn, who forced them into the most menial tasks.", "forcing them to do the most menial tasks"),
      difficulty: 2,
      questions: [
        { q: "From what were they saved, in 37:115?", a: "The great distress", wrong: ["A storm", "A famine", "A fire"], why: "And We saved them and their people from the great distress." },
        { q: "Who oppressed them, per Ibn Kathir?", a: "Fir'awn and his people", wrong: ["Namrud", "Ad", "Thamud"], why: "He saved them from the oppression of Firawn and his people." },
        { q: "What were they forced to do, per Ibn Kathir?", a: "The most menial tasks", wrong: ["Rule", "Trade", "Teach"], why: "By forcing them to do the most menial tasks." }
      ]
    },
    {
      slug: "they-became-victors",
      title: "They became victors",
      line: "Allah helped them, and they became the victors.",
      facts: ["The weak prevailed", "By Allah's help"],
      quote: q37(116),
      source: ik(116, "Ultimately He caused them to prevail over their oppressors.", "ultimately He caused them to prevail over them"),
      difficulty: 2,
      questions: [
        { q: "What did they become, in 37:116?", a: "The victors", wrong: ["Slaves", "Wanderers", "Losers"], why: "And helped them, so that they became the victors." },
        { q: "Who caused it, per Ibn Kathir?", a: "Allah", wrong: ["Their swords", "Their wealth", "Luck"], why: "Then ultimately He caused them to prevail over them." },
        { tf: true, q: "Allah can raise the weak over the mighty.", why: "And helped them, so that they became the victors." }
      ]
    },
    {
      slug: "the-clear-scripture",
      title: "The clear Scripture",
      line: "Allah gave them the clear Scripture, the Tawrah.",
      facts: ["The Tawrah", "A light and criterion"],
      quote: q37(117),
      source: ik(117, "Allah revealed to Musa the Clear and Mighty Book, which is the Tawrah.", "the Clear and Mighty Book, which is the Tawrah"),
      difficulty: 2,
      questions: [
        { q: "What were they given, in 37:117?", a: "The clear Scripture", wrong: ["A sword", "A crown", "A ship"], why: "And We gave them the clear Scripture." },
        { q: "Which book is it, per Ibn Kathir?", a: "The Tawrah", wrong: ["The Zabur", "The Injil", "The Quran"], why: "The Clear and Mighty Book, which is the Tawrah." },
        { q: "Which ayah calls it a shining light?", a: "21:48", wrong: ["1:7", "36:1", "112:2"], why: "And indeed We granted to Musa and Harun the criterion, and a shining light (21:48)." }
      ]
    },
    {
      slug: "the-right-path",
      title: "The right path",
      line: "Allah guided them to the straight path.",
      facts: ["In words", "And in deeds"],
      quote: q37(118),
      source: ik(118, "He guided them to the right path in words and deeds.", "meaning, with regard to words and deeds"),
      difficulty: 2,
      questions: [
        { q: "Where were they guided, in 37:118?", a: "The right path", wrong: ["The desert", "The sea", "Egypt's palace"], why: "And guided them to the right path." },
        { q: "In what, per Ibn Kathir?", a: "Words and deeds", wrong: ["Only trade", "Only farming", "Only war"], why: "Meaning, with regard to words and deeds." },
        { tf: true, q: "Guidance covers what we say and what we do.", why: "Meaning, with regard to words and deeds." }
      ]
    },
    {
      slug: "spoken-of-highly",
      title: "Spoken of highly",
      line: "Allah left them a good mention among later people.",
      facts: ["Praised after they died", "Honour that lasts"],
      quote: q37(119),
      source: ik(119, "After they died they would be mentioned in good terms and spoken of highly.", "after they died they would be mentioned in good terms and spoken of highly"),
      difficulty: 2,
      questions: [
        { q: "What was left for them, in 37:119?", a: "A good mention", wrong: ["A pyramid", "A statue", "Gold"], why: "And We left for them among the later generations." },
        { q: "How are they mentioned, per Ibn Kathir?", a: "In good terms", wrong: ["With blame", "Not at all", "With fear"], why: "They would be mentioned in good terms and spoken of highly." },
        { tf: true, q: "Nuh, Ibrahim, Musa and Harun all got this honour.", why: "And We left for them among the later generations." }
      ]
    },
    {
      slug: "peace-upon-musa-and-harun",
      title: "Peace upon Musa and Harun",
      line: "Peace be upon Musa and Harun! They were believing servants.",
      facts: ["Allah rewards good-doers", "Two of His believing servants"],
      quote: q37(120),
      source: ik(120, "Allah explains their good mention: peace upon Musa and Harun, two of His believing servants.", "be upon Musa and Harun"),
      difficulty: 2,
      questions: [
        { q: "Who is greeted with peace, in 37:120?", a: "Musa and Harun", wrong: ["Fir'awn and Haman", "Qarun", "Samiri"], why: "Salam (peace!) be upon Musa and Harun!" },
        { q: "How are they described, in 37:122?", a: "Two believing servants", wrong: ["Two kings", "Two poets", "Two traders"], why: "Verily, they were two of Our believing servants." },
        { tf: true, q: "Allah rewards those who do good, in 37:121.", why: "Verily, thus do We reward the doers of good." }
      ]
    },
    {
      slug: "reward-of-the-good-doers",
      title: "Reward of the good-doers",
      line: "That is how Allah rewards those who do good.",
      facts: ["Said of each Prophet", "A pattern to learn from"],
      quote: q37(121),
      source: ik(121, "Allah repeats: thus do We reward the doers of good, about Musa and Harun.", "Verily, thus do We reward the doers of good"),
      difficulty: 2,
      questions: [
        { q: "What does 37:121 say?", a: "Thus We reward the doers of good", wrong: ["Thus We punish all", "Thus We forget", "Thus We test kings"], why: "Verily, thus do We reward the doers of good." },
        { tf: true, q: "The same words were said of Nuh and Ibrahim.", why: "Verily, thus We reward the gooddoers (37:80, 37:110)." },
        { q: "What is the reward described, per Ibn Kathir?", a: "Good mention after death", wrong: ["Endless wealth", "A long life", "A kingdom"], why: "After they died they would be mentioned in good terms and spoken of highly." }
      ]
    },
    {
      slug: "two-believing-servants",
      title: "Two believing servants",
      line: "They were two of Allah's believing servants.",
      facts: ["Brothers in faith and blood", "Firm against Fir'awn"],
      quote: q37(122),
      source: ik(122, "Allah ends their mention: they were two of His believing servants.", "Verily, they were two of Our believing servants"),
      difficulty: 2,
      questions: [
        { q: "How many believing servants, in 37:122?", a: "Two", wrong: ["One", "Three", "Ten"], why: "Verily, they were two of Our believing servants." },
        { q: "Who are they?", a: "Musa and Harun", wrong: ["Ismail and Ishaq", "Nuh and Ibrahim", "Hud and Salih"], why: "Salam (peace!) be upon Musa and Harun! Verily, they were two of Our believing servants." },
        { tf: true, q: "Faith is the highest description Allah gives.", why: "Verily, they were two of Our believing servants." }
      ]
    }
  ]
};

/** Ayahs 123 to 148: Ilyas and the idol Bal, Lut's people, and Yunus in the belly of the great fish. */
const SAFFAT_FIVE: DeepUnit = {
  key: "saffat5",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-37",
  name: "As-Saffat, ayahs 123 to 148",
  kind: "skill",
  lessonType: "surah",
  surahName: "As-Saffat",
  lessons: [
    {
      slug: "ilyas-a-messenger",
      title: "Ilyas, a Messenger",
      line: "Ilyas was one of the Messengers.",
      facts: ["Sent to the Children of Israel", "They worshipped an idol, Bal"],
      quote: q37(123),
      source: ik(123, "Ilyas called his people, who had started to worship an idol, to worship Allah alone.", "he called them to Allah, may He be exalted, and forbade them to worship anyone besides Him"),
      difficulty: 2,
      questions: [
        { q: "Who was a Messenger, in 37:123?", a: "Ilyas", wrong: ["Luqman", "Dhul-Qarnayn", "Uzair"], why: "And verily, Ilyas was one of the Messengers." },
        { q: "What did Ilyas forbid, per Ibn Kathir?", a: "Worshipping others besides Allah", wrong: ["Trading", "Farming", "Travelling"], why: "He called them to Allah, and forbade them to worship anyone besides Him." },
        { tf: true, q: "Every Messenger called to Allah alone.", why: "He called them to Allah, may He be exalted, and forbade them to worship anyone besides Him." }
      ]
    },
    {
      slug: "will-you-not-fear-allah",
      title: "Will you not fear Allah?",
      line: "He said to his people: will you not have Taqwa?",
      facts: ["Taqwa: being mindful of Allah", "Worshipping others is the danger"],
      quote: q37(124),
      source: ik(124, "He meant: do you not fear Allah when you worship others instead of Him?", "do you not fear Allah when you worship others instead of Him"),
      difficulty: 2,
      questions: [
        { q: "What did Ilyas ask, in 37:124?", a: "Will you not have Taqwa?", wrong: ["Will you not eat?", "Will you not sleep?", "Will you not trade?"], why: "When he said to his people: Will you not have Taqwa?" },
        { q: "What did he mean, per Ibn Kathir?", a: "Do you not fear Allah?", wrong: ["Do you not fear the king?", "Do you not fear rain?", "Do you not fear night?"], why: "Do you not fear Allah when you worship others instead of Him?" },
        { tf: true, q: "Taqwa keeps a person from worshipping others.", why: "Do you not fear Allah when you worship others instead of Him?" }
      ]
    },
    {
      slug: "bal-or-the-best-of-creators",
      title: "Bal, or the Best of creators?",
      line: "Do you call on Bal and leave the Best of creators?",
      facts: ["Bal means lord, or an idol", "Allah is the Best of creators"],
      quote: q37(125),
      source: ik(125, "Ibn Abbas and others said Bal means lord; Ad-Dahhak said it is an idol they used to worship.", "It is an idol which they used to worship"),
      difficulty: 3,
      questions: [
        { q: "Whom did they call on, in 37:125?", a: "Bal", wrong: ["Allah alone", "Their fathers", "The sun"], why: "Will you call upon Bal and forsake the Best of creators?" },
        { q: "What does Bal mean, per Ibn Abbas?", a: "Lord", wrong: ["River", "King's son", "Mountain"], why: "Ibn Abbas, Mujahid, Ikrimah, Qatadah and As-Suddi said that the word Bal means lord." },
        { q: "Whom were they leaving, in 37:125?", a: "The Best of creators", wrong: ["Their homes", "Their idols", "Their kings"], why: "And forsake the Best of creators." }
      ]
    },
    {
      slug: "your-lord-and-your-fathers-lord",
      title: "Your Lord and your fathers' Lord",
      line: "Allah, your Lord and the Lord of your forefathers.",
      facts: ["He alone deserves worship", "No partners at all"],
      quote: q37(126),
      source: ik(126, "He is the One Who deserves your worship alone, with no partners or associates.", "He is the One Who is deserving of your worship alone, with no partners or associates"),
      difficulty: 2,
      questions: [
        { q: "Whose Lord is Allah, in 37:126?", a: "Theirs and their forefathers'", wrong: ["Only the king's", "Only the angels'", "No one's"], why: "Allah, your Lord and the Lord of your forefathers." },
        { q: "Who deserves worship, per Ibn Kathir?", a: "Allah alone", wrong: ["Bal", "The king", "Their fathers"], why: "He is the One Who is deserving of your worship alone, with no partners or associates." },
        { tf: true, q: "Their forefathers' true Lord was Allah too.", why: "Allah, your Lord and the Lord of your forefathers." }
      ]
    },
    {
      slug: "they-denied-ilyas",
      title: "They denied Ilyas",
      line: "They denied him, so they will be brought for judgement.",
      facts: ["Brought forth on the Day of Reckoning", "Denial has a cost"],
      quote: q37(127),
      source: ik(127, "They will be brought forth for punishment on the Day of Reckoning.", "for the punishment on the Day of Reckoning"),
      difficulty: 2,
      questions: [
        { q: "What did his people do, in 37:127?", a: "Denied him", wrong: ["Followed him", "Crowned him", "Paid him"], why: "But they denied him, so they will certainly be brought forth." },
        { q: "When will they be brought forth, per Ibn Kathir?", a: "The Day of Reckoning", wrong: ["Next spring", "At the market", "Never"], why: "Means, for the punishment on the Day of Reckoning." },
        { tf: false, q: "Denying a Messenger has no result.", why: "But they denied him, so they will certainly be brought forth." }
      ]
    },
    {
      slug: "those-who-believed",
      title: "Those who believed",
      line: "Except Allah's chosen servants among them.",
      facts: ["Those who believe in Him alone", "Saved from the punishment"],
      quote: q37(128),
      source: ik(128, "The chosen servants are those who believe in Allah alone.", "those who believe in Him alone"),
      difficulty: 2,
      questions: [
        { q: "Who is excepted, in 37:128?", a: "The chosen servants of Allah", wrong: ["The strong", "The rich", "Bal's priests"], why: "Save the chosen servants of Allah." },
        { q: "Who are they, per Ibn Kathir?", a: "Those who believe in Him alone", wrong: ["Those with gold", "Those in power", "Those who travel"], why: "Means, those who believe in Him alone." },
        { tf: true, q: "Sincere believers are saved in every story.", why: "Save the chosen servants of Allah." }
      ]
    },
    {
      slug: "praised-ilyas",
      title: "Praised among later people",
      line: "Allah left a good mention for him among later people.",
      facts: ["He is praised", "Spoken of highly"],
      quote: q37(129),
      source: ik(129, "He is praised and spoken of highly.", "he is praised and spoken of highly"),
      difficulty: 2,
      questions: [
        { q: "What was left for Ilyas, in 37:129?", a: "A good mention", wrong: ["A city", "A statue", "A treasure"], why: "And We left for him among the later generations." },
        { q: "How is he spoken of, per Ibn Kathir?", a: "Highly", wrong: ["Badly", "Never", "With fear"], why: "Means, he is praised and spoken of highly." },
        { tf: true, q: "The same honour was given to Nuh, Ibrahim, Musa and Harun.", why: "And We left for him among the later generations." }
      ]
    },
    {
      slug: "peace-upon-ilyasin",
      title: "Peace upon Ilyasin",
      line: "Peace be upon Ilyasin!",
      facts: ["Ilyasin is a form of Ilyas", "Like Ismail and Ismain"],
      quote: q37(130),
      source: ik(130, "Ilyasin is a form of the name Ilyas, as some Arabs said Ismain for Ismail. All of that is fine.", "All of that is fine"),
      difficulty: 3,
      questions: [
        { q: "Who is greeted, in 37:130?", a: "Ilyasin", wrong: ["Bal", "The king", "Ya-Sin"], why: "Salam (peace!) be upon Ilyasin!" },
        { q: "What is Ilyasin, per Ibn Kathir?", a: "A form of the name Ilyas", wrong: ["A different Prophet", "A city", "An idol"], why: "Similarly, one might say for Ismail, Ismain. This is the language of Bani Asad." },
        { q: "What did Ibn Kathir say of such name forms?", a: "All of that is fine", wrong: ["They are errors", "They are forbidden", "They are unknown"], why: "All of that is fine." }
      ]
    },
    {
      slug: "ilyas-rewarded",
      title: "Ilyas rewarded",
      line: "That is how Allah rewards those who do good.",
      facts: ["The pattern repeats", "Good deeds bring honour"],
      quote: q37(131),
      source: ik(131, "Ibn Kathir notes the meaning of these words has already been discussed above.", "We have already discussed the meaning of this above"),
      difficulty: 2,
      questions: [
        { q: "What does 37:131 say?", a: "Thus We reward the doers of good", wrong: ["Thus We forget", "Thus We test kings", "Thus We end"], why: "Verily, thus do We reward the doers of good." },
        { tf: true, q: "Ibn Kathir already explained this phrase earlier.", why: "We have already discussed the meaning of this above." },
        { q: "How often has this line come by 37:131?", a: "Five times", wrong: ["Once", "Twice", "Never"], why: "Thus do We reward the doers of good: 37:80, 37:105, 37:110, 37:121 and 37:131." }
      ]
    },
    {
      slug: "ilyas-a-believer",
      title: "A believing servant",
      line: "He was one of Allah's believing servants.",
      facts: ["Firm against idol worship", "A true servant of Allah"],
      quote: q37(132),
      source: ik(132, "Allah ends the mention of Ilyas: he was one of His believing servants.", "Verily, he was one of Our believing servants"),
      difficulty: 2,
      questions: [
        { q: "How is Ilyas described, in 37:132?", a: "A believing servant", wrong: ["A king", "A trader", "A poet"], why: "Verily, he was one of Our believing servants." },
        { tf: true, q: "Allah praises each Prophet as His servant.", why: "Verily, he was one of Our believing servants." },
        { tf: false, q: "Ilyas joined his people in worshipping Bal.", why: "He called them to Allah, and forbade them to worship anyone besides Him." }
      ]
    },
    {
      slug: "lut-a-messenger",
      title: "Lut, a Messenger",
      line: "Lut was also one of the Messengers.",
      facts: ["Sent to his people", "They denied him"],
      quote: q37(133),
      source: ik(133, "Allah sent His servant and Messenger Lut to his people, and they denied him.", "He sent His servant and Messenger Lut"),
      difficulty: 1,
      questions: [
        { q: "Who was a Messenger, in 37:133?", a: "Lut", wrong: ["Haman", "Qarun", "Azar"], why: "And verily, Lut was one of the Messengers." },
        { q: "How did his people respond, per Ibn Kathir?", a: "They denied him", wrong: ["They followed him", "They honoured him", "They left town"], why: "He sent His servant and Messenger Lut to his people, and they denied him." },
        { tf: true, q: "Lut was a servant and Messenger of Allah.", why: "He sent His servant and Messenger Lut." }
      ]
    },
    {
      slug: "lut-saved",
      title: "Lut saved",
      line: "Allah saved him and all his family.",
      facts: ["Saved from among them", "One exception"],
      quote: q37(134),
      source: ik(134, "Allah saved him and his family, except his wife, who was destroyed along with her people.", "so Allah saved him from among them, him and his family"),
      difficulty: 2,
      questions: [
        { q: "Whom did Allah save, in 37:134?", a: "Lut and his family", wrong: ["The whole town", "Only the rich", "No one"], why: "When We saved him and his family, all." },
        { q: "Who was the exception, per Ibn Kathir?", a: "His wife", wrong: ["His daughter", "His guest", "His neighbour"], why: "Him and his family with the exception of his wife." },
        { tf: true, q: "Allah rescues His Messengers.", why: "So Allah saved him from among them, him and his family." }
      ]
    },
    {
      slug: "the-one-who-stayed-behind",
      title: "The one who stayed behind",
      line: "Except an old woman who remained behind.",
      facts: ["His wife did not believe", "Family ties do not save"],
      quote: q37(135),
      source: ik(135, "His wife was destroyed along with her people.", "who was destroyed along with her people"),
      difficulty: 2,
      questions: [
        { q: "Who remained behind, in 37:135?", a: "An old woman, his wife", wrong: ["His son", "His father", "His friend"], why: "Except an old woman (his wife) who was among those who remained behind." },
        { q: "What happened to her, per Ibn Kathir?", a: "She met her people's end", wrong: ["She was saved", "She became queen", "She left early"], why: "With the exception of his wife, who was destroyed along with her people." },
        { tf: false, q: "Being a Prophet's wife saves a disbeliever.", why: "With the exception of his wife, who was destroyed along with her people." }
      ]
    },
    {
      slug: "the-rest-destroyed",
      title: "The rest destroyed",
      line: "Then Allah destroyed the rest.",
      facts: ["Different kinds of punishment", "Their land became a dead lake"],
      quote: q37(136),
      source: ik(136, "Allah destroyed them with different kinds of punishment and made their land a foul lake.", "Allah destroyed them with different kinds of punishments"),
      difficulty: 2,
      questions: [
        { q: "What happened to the rest, in 37:136?", a: "They were destroyed", wrong: ["They were saved", "They became kings", "They moved away"], why: "Then We destroyed the rest." },
        { q: "How were they destroyed, per Ibn Kathir?", a: "With different punishments", wrong: ["By old age", "By war", "By famine only"], why: "Allah destroyed them with different kinds of punishments." },
        { q: "What did their land become, per Ibn Kathir?", a: "A foul lake", wrong: ["A garden", "A city", "A forest"], why: "And made their vicinity a foul, stinking lake." }
      ]
    },
    {
      slug: "you-pass-by-them",
      title: "You pass by them",
      line: "You pass by their ruins in the morning.",
      facts: ["Near the Dead Sea", "On a busy route"],
      quote: q37(137),
      source: ik(137, "Their land is on a well-travelled route where people pass by night and day, by the Dead Sea.", "on a well-travelled route where people pass by night and day"),
      difficulty: 2,
      questions: [
        { q: "When do they pass by, in 37:137?", a: "In the morning", wrong: ["Never", "Only in Ramadan", "Only on Fridays"], why: "Verily, you pass by them in the morning." },
        { q: "Where is the place, per Ibn Kathir?", a: "By the Dead Sea", wrong: ["In Yemen", "In Makkah", "In India"], why: "The Dead Sea, which lays close to the cities of Sodom and Gomorrah." },
        { q: "What kind of route is it, per Ibn Kathir?", a: "Well-travelled", wrong: ["Hidden", "Closed", "Unknown"], why: "On a well-travelled route where people pass by night and day." }
      ]
    },
    {
      slug: "will-you-not-reflect",
      title: "Will you not reflect?",
      line: "And at night too; will you not then reflect?",
      facts: ["Learn from their end", "A warning for deniers"],
      quote: q37(138),
      source: ik(138, "Will you not learn a lesson from them and realise a similar end awaits the disbelievers?", "will you not learn a lesson from them"),
      difficulty: 2,
      questions: [
        { q: "What are we asked, in 37:138?", a: "Will you not reflect?", wrong: ["Will you not build?", "Will you not trade?", "Will you not sleep?"], why: "And at night; will you not then reflect?" },
        { q: "What should we learn, per Ibn Kathir?", a: "A lesson from their end", wrong: ["Their language", "Their buildings", "Their songs"], why: "Will you not learn a lesson from them and how Allah destroyed them." },
        { tf: true, q: "Ruins of past nations are reminders.", why: "Will you not learn a lesson from them and how Allah destroyed them?" }
      ]
    },
    {
      slug: "yunus-a-messenger",
      title: "Yunus, a Messenger",
      line: "Yunus was one of the Messengers.",
      facts: ["Told also in Al-Anbiya", "Do not rank yourself above him"],
      quote: q37(139),
      source: ik(139, "Ibn Kathir notes the story of Yunus was discussed in Surat Al-Anbiya.", "We have already discussed the story of Yunus"),
      difficulty: 2,
      questions: [
        { q: "Who was a Messenger, in 37:139?", a: "Yunus", wrong: ["Luqman", "Khidr", "Uzair"], why: "And verily, Yunus was one of the Messengers." },
        { q: "Where else is his story, per Ibn Kathir?", a: "Surat Al-Anbiya", wrong: ["Surat Al-Fil", "Surat An-Nas", "Surat Quraysh"], why: "We have already discussed the story of Yunus in Surat Al-Anbiya (21:87-88)." },
        { tf: true, q: "A whole surah is named after Yunus.", why: "And verily, Yunus was one of the Messengers." }
      ]
    },
    {
      slug: "none-better-than-yunus",
      title: "None better than Yunus",
      line: "None should say: I am better than Yunus ibn Matta.",
      facts: ["Respect every Prophet", "Humility before Allah"],
      quote: q37(139),
      source: hadith("bukhari", "3416", "Abu Hurairah", "Sahih", "The Prophet ﷺ said none should say that I am better than Yunus ibn Matta.", "None should say that I am better than Yunus bin Matta"),
      difficulty: 3,
      questions: [
        { q: "What should none say, in the hadith?", a: "I am better than Yunus", wrong: ["I love Yunus", "Yunus was a Prophet", "Peace be upon Yunus"], why: "None should say that I am better than Yunus bin Matta." },
        { q: "Who was Yunus's father, in the hadith?", a: "Matta", wrong: ["Imran", "Azar", "Yaqub"], why: "Yunus bin Matta." },
        { tf: true, q: "We honour Yunus despite his trial.", why: "None should say that I am better than Yunus bin Matta." }
      ]
    },
    {
      slug: "the-laden-ship",
      title: "The laden ship",
      line: "He ran to a ship loaded with cargo.",
      facts: ["Laden means full", "The sea grew rough"],
      quote: q37(140),
      source: ik(140, "Ibn Abbas said the ship was filled with cargo.", "It was filled with cargo"),
      difficulty: 2,
      questions: [
        { q: "Where did Yunus run, in 37:140?", a: "To the laden ship", wrong: ["To a cave", "To the market", "To a mountain"], why: "When he ran to the laden ship." },
        { q: "What does laden mean, per Ibn Abbas?", a: "Filled with cargo", wrong: ["Empty", "Broken", "Small"], why: "Ibn Abbas said, It was filled with cargo." },
        { tf: true, q: "Laden also described Nuh's ship in Ya-Sin.", why: "When he ran to the laden ship." }
      ]
    },
    {
      slug: "drawing-lots",
      title: "Drawing lots",
      line: "They drew lots, and he was among the losers.",
      facts: ["Waves pounded the ship", "He lost three times"],
      quote: q37(141),
      source: ik(141, "The ship was pounded by waves; they drew lots, and Yunus lost the draw three times.", "lost the draw three times"),
      difficulty: 3,
      questions: [
        { q: "What did they do, in 37:141?", a: "Cast lots", wrong: ["Sang songs", "Ate food", "Built a raft"], why: "Then he agreed to cast lots, and he was among the losers." },
        { q: "Why draw lots, per Ibn Kathir?", a: "To lighten the ship", wrong: ["To choose a captain", "For fun", "To share food"], why: "Whoever lost would be thrown overboard so as to lighten the load." },
        { q: "How many times did he lose, per Ibn Kathir?", a: "Three", wrong: ["Once", "Seven", "Ten"], why: "The Prophet of Allah Yunus lost the draw three times." }
      ]
    },
    {
      slug: "the-great-fish",
      title: "The great fish",
      line: "A big fish swallowed him, and he blamed himself.",
      facts: ["Not one bone broken", "By Allah's command"],
      quote: q37(142),
      source: ik(142, "Allah commanded a large fish to swallow Yunus without cutting his flesh or breaking his bones.", "without cutting his flesh or breaking his bones"),
      difficulty: 2,
      questions: [
        { q: "What swallowed Yunus, in 37:142?", a: "A big fish", wrong: ["A wave", "A storm", "A cave"], why: "Then a big fish swallowed him as he had done an act worthy of blame." },
        { q: "Was he harmed, per Ibn Kathir?", a: "No, not a bone broken", wrong: ["Yes, badly", "He lost an arm", "He was blinded"], why: "To swallow Yunus without cutting his flesh or breaking his bones." },
        { q: "Who commanded the fish, per Ibn Kathir?", a: "Allah", wrong: ["The sailors", "The sea king", "No one"], why: "Then Allah commanded a large fish from the Green Sea to come and swallow Yunus." }
      ]
    },
    {
      slug: "he-glorified-allah",
      title: "He glorified Allah",
      line: "Had he not been one who glorifies Allah...",
      facts: ["His good deeds in times of ease", "His dua in the dark"],
      quote: q37(143),
      source: ik(143, "It was said: if he had not done righteous deeds in his times of ease. Ibn Jarir favoured this view.", "if he had not already done righteous deeds during his time of ease"),
      difficulty: 3,
      questions: [
        { q: "What saved Yunus, in 37:143?", a: "Glorifying Allah", wrong: ["His strength", "The sailors", "A ship"], why: "Had he not been of them who glorify Allah." },
        { q: "What did it mean, per one view?", a: "Good deeds in times of ease", wrong: ["Swimming well", "Being rich", "Being young"], why: "If he had not already done righteous deeds during his time of ease." },
        { q: "What was his dua, in 21:87?", a: "La ilaha illa Anta, Subhanaka", wrong: ["Save me now", "Give me a ship", "Make me king"], why: "La ilaha illa Anta, You are glorified! Truly, I have been of the wrongdoers (21:87)." }
      ]
    },
    {
      slug: "remember-him-in-ease",
      title: "Remember Him in ease",
      line: "Yunus's glorifying of Allah before and in the fish saved him.",
      facts: ["As-Sa'di explains", "Tasbih"],
      quote: q37(143),
      source: saadi(37, 143, "As-Sa'di says Yunus was saved because he glorified Allah a lot in his earlier days through much worship, and again in the fish's belly, saying: none has the right to be worshipped but You.", "أي: في وقته السابق بكثرة عبادته لربه، وتسبيحه، وتحميده"),
      difficulty: 2,
      questions: [
        { q: "When did Yunus glorify Allah, per as-Sa'di?", a: "Before and inside the fish", wrong: ["Only after he was saved", "Never", "Only on the ship"], why: "In his earlier days and in the fish's belly, says as-Sa'di." },
        { q: "What did Yunus say inside the fish?", a: "La ilaha illa anta, subhanaka", wrong: ["Save the ship", "Bring me food", "I am innocent"], why: "None has the right to be worshipped but You, glory be to You." },
        { tf: true, q: "Worship in good times can help a person in hard times.", why: "As-Sa'di on 37:143." }
      ]
    },
    {
      slug: "until-the-day-of-resurrection",
      title: "Until the Day of Resurrection",
      line: "He would have stayed in its belly until the Resurrection.",
      facts: ["Remember Allah in ease", "He remembers you in hardship"],
      quote: q37(144),
      source: ik(144, "A narration from Ibn Abbas says: remember Allah in times of ease and He will remember you in difficulty.", "Remember Allah during times of ease and He will remember you during times of difficulty"),
      difficulty: 3,
      questions: [
        { q: "How long would he have stayed, in 37:144?", a: "Until the Day of Resurrection", wrong: ["One night", "A week", "A year"], why: "He would have indeed remained inside its belly till the Day of Resurrection." },
        { q: "What does the narration from Ibn Abbas say?", a: "Remember Allah in ease", wrong: ["Avoid the sea", "Never travel", "Eat less"], why: "Remember Allah during times of ease and He will remember you during times of difficulty." },
        { tf: true, q: "Good deeds in easy times help in hard times.", why: "Remember Allah during times of ease and He will remember you during times of difficulty." }
      ]
    },
    {
      slug: "cast-on-the-shore",
      title: "Cast on the shore",
      line: "Allah cast him onto a bare shore, weak and ill.",
      facts: ["No plants or buildings", "Weak in body"],
      quote: q37(145),
      source: ik(145, "Ibn Abbas said the naked shore is land with no vegetation and no buildings; sick means weak of body.", "land in which there is no vegetation and no buildings"),
      difficulty: 2,
      questions: [
        { q: "Where was he cast, in 37:145?", a: "On a naked shore", wrong: ["In a palace", "On a ship", "In a garden"], why: "But We cast him forth on the naked shore while he was sick." },
        { q: "What does naked shore mean, per Ibn Abbas?", a: "Land with no plants or buildings", wrong: ["A busy port", "A forest", "A city"], why: "This refers to land in which there is no vegetation and no buildings." },
        { q: "What does sick mean, per Ibn Kathir?", a: "Weak of body", wrong: ["Angry", "Asleep", "Lost"], why: "While he was sick, means, when he was weak of body." }
      ]
    },
    {
      slug: "the-gourd-plant",
      title: "The gourd plant",
      line: "Allah made a gourd plant grow over him.",
      facts: ["Big leaves for shade", "Good food, quick to grow"],
      quote: q37(146),
      source: ik(146, "Many said the gourd is squash: it grows quickly, gives shade, and its fruit is good nourishment.", "it grows quickly, its leaves offer shade because of their large size"),
      difficulty: 2,
      questions: [
        { q: "What grew over him, in 37:146?", a: "A gourd plant", wrong: ["A palm tree", "A rose bush", "An olive tree"], why: "And We caused a plant of gourd to grow over him." },
        { q: "What is the gourd, per Ibn Masud and Ibn Abbas?", a: "Squash", wrong: ["Grapes", "Wheat", "Figs"], why: "All said that gourd means squash." },
        { q: "What do its leaves give, per Ibn Kathir?", a: "Shade", wrong: ["Light", "Fire", "Music"], why: "Its leaves offer shade because of their large size and smooth texture." }
      ]
    },
    {
      slug: "the-prophet-liked-gourd",
      title: "The Prophet ﷺ liked gourd",
      line: "The Prophet ﷺ would look for pieces of gourd in the dish.",
      facts: ["Anas saw him eat it", "Anas loved it ever after"],
      quote: q37(146),
      source: hadith("bukhari", "5379", "Anas ibn Malik", "Sahih", "Anas saw the Prophet ﷺ looking for pieces of gourd around the dish, and loved gourd from that day.", "seeking to eat the pieces of gourd from the various sides of the dish"),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ look for, in the hadith?", a: "Pieces of gourd", wrong: ["Meat only", "Bread only", "Dates only"], why: "I saw him seeking to eat the pieces of gourd from the various sides of the dish." },
        { q: "Who invited him to the meal?", a: "A tailor", wrong: ["A king", "A trader", "A farmer"], why: "A tailor invited Allah's Messenger to a meal which he had prepared." },
        { tf: true, q: "Anas loved gourd after seeing this.", why: "Since that day I have liked to eat gourd." }
      ]
    },
    {
      slug: "a-hundred-thousand-or-more",
      title: "A hundred thousand or more",
      line: "Allah sent him to a hundred thousand people or more.",
      facts: ["Back to his own people", "Not less, but more"],
      quote: q37(147),
      source: ik(147, "After the fish, he was sent back to his people; or even more means not less than that, but more.", "The meaning is, not less than that, but rather more"),
      difficulty: 3,
      questions: [
        { q: "How many people, in 37:147?", a: "A hundred thousand or more", wrong: ["Ten", "A thousand", "Seven"], why: "And We sent him to a hundred thousand people or even more." },
        { q: "Where was he sent, per Ibn Kathir?", a: "Back to his own people", wrong: ["To a new land", "To the sailors", "To Egypt"], why: "He was commanded to go back to those to whom he had been sent in the first place." },
        { q: "What does or even more mean, per Ibn Kathir?", a: "Not less, but more", wrong: ["Exactly that", "Fewer", "Unknown"], why: "The meaning is, not less than that, but rather more." }
      ]
    },
    {
      slug: "they-believed",
      title: "They believed",
      line: "They believed, so Allah let them enjoy life for a while.",
      facts: ["The whole town believed", "Saved by their faith"],
      quote: q37(148),
      source: ik(148, "All the people Yunus was sent to believed, and enjoyed life until their appointed end.", "these people to whom Yunus, peace be upon him, had been sent all believed"),
      difficulty: 2,
      questions: [
        { q: "What did his people do, in 37:148?", a: "They believed", wrong: ["They mocked", "They fled", "They fought"], why: "And they believed; so We gave them enjoyment for a while." },
        { q: "Until when, per Ibn Kathir?", a: "Their appointed end", wrong: ["One day", "Forever on earth", "The next storm"], why: "Means, until the time of their appointed end." },
        { q: "Which ayah says Yunus's people were saved by faith?", a: "10:98", wrong: ["2:255", "1:1", "112:1"], why: "Except the people of Yunus; when they believed, We removed from them the torment of disgrace (10:98)." }
      ]
    }
  ]
};

/** Ayahs 149 to 182: the false claim that angels are Allah's daughters, the angels in their ranks, the promised victory, and the closing glorification. */
const SAFFAT_SIX: DeepUnit = {
  key: "saffat6",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-37",
  name: "As-Saffat, ayahs 149 to 182",
  kind: "skill",
  lessonType: "surah",
  surahName: "As-Saffat",
  lessons: [
    {
      slug: "ask-them",
      title: "Ask them",
      line: "Ask them: daughters for your Lord, and sons for them?",
      facts: ["They wanted sons for themselves", "An unfair claim"],
      quote: q37(149),
      source: ik(149, "Allah denounces those who attributed daughters to Him while wanting sons for themselves.", "Allah denounces those idolators who attribute daughters to Allah"),
      difficulty: 2,
      questions: [
        { q: "What did they claim, in 37:149?", a: "Daughters for Allah", wrong: ["Allah is One", "Angels are servants", "Nothing"], why: "Are there only daughters for your Lord and sons for them?" },
        { q: "What does ask them mean, per Ibn Kathir?", a: "Quiz them in denunciation", wrong: ["Ask for directions", "Ask for help", "Ask their names"], why: "Now ask them means, quiz them by way of denunciation." },
        { q: "Which ayah calls this division unfair?", a: "53:22", wrong: ["2:2", "36:1", "114:6"], why: "Is it for you the males and for Him the females? That indeed is a division most unfair! (53:21-22)" }
      ]
    },
    {
      slug: "did-they-witness",
      title: "Did they witness?",
      line: "Did Allah make the angels female while they watched?",
      facts: ["They never saw their creation", "Claims without knowledge"],
      quote: q37(150),
      source: ik(150, "How did they decide the angels are female when they did not witness their creation?", "how did they decide that the angels are female when they did not witness their creation"),
      difficulty: 2,
      questions: [
        { q: "What did they claim about angels, in 37:150?", a: "That they are female", wrong: ["That they are servants", "That they pray", "That they are many"], why: "Or did We create the angels female while they were witnesses?" },
        { q: "What is the problem, per Ibn Kathir?", a: "They did not witness it", wrong: ["They counted wrong", "They were too young", "Nothing"], why: "How did they decide that the angels are female when they did not witness their creation?" },
        { tf: true, q: "They will be questioned about this claim.", why: "Their testimony will be recorded, and they will be questioned! (43:19)" }
      ]
    },
    {
      slug: "part-of-their-lies",
      title: "Part of their lies",
      line: "Saying such things comes from their own lies.",
      facts: ["Falsehood they invented", "No proof at all"],
      quote: q37(151),
      source: ik(151, "Verily, it is of their falsehood means it is part of the lies they tell.", "it is a part of the lies they tell"),
      difficulty: 2,
      questions: [
        { q: "What is the claim from, in 37:151?", a: "Their falsehood", wrong: ["Revelation", "Science", "A dream"], why: "Verily, it is of their falsehood that they say." },
        { q: "What does it mean, per Ibn Kathir?", a: "Part of their lies", wrong: ["A mistake in counting", "A joke", "A poem"], why: "Means, it is a part of the lies they tell." },
        { tf: false, q: "Their claim came from a revealed Book.", why: "Verily, it is of their falsehood that they say." }
      ]
    },
    {
      slug: "allah-has-no-child",
      title: "Allah has no child",
      line: "They say Allah has offspring; truly, they are liars.",
      facts: ["Three false claims", "Allah is far above that"],
      quote: q37(152),
      source: ik(152, "They said the angels are Allah's daughters, that He has offspring, and they worshipped them: three falsehoods.", "Allah mentions three of the things they said about the angels"),
      difficulty: 3,
      questions: [
        { q: "What did they say, in 37:152?", a: "Allah has begotten", wrong: ["Allah is One", "Allah is Merciful", "Allah sees all"], why: "Allah has begotten. And, verily, they are liars." },
        { q: "How many false claims about angels, per Ibn Kathir?", a: "Three", wrong: ["One", "Seven", "Ten"], why: "Allah mentions three of the things they said about the angels." },
        { tf: true, q: "Allah is far above having any offspring.", why: "Exalted and sanctified be He above that." }
      ]
    },
    {
      slug: "daughters-over-sons",
      title: "Daughters over sons?",
      line: "Has He chosen daughters rather than sons?",
      facts: ["Their own unfair logic", "Turned back on them"],
      quote: q37(153),
      source: ik(153, "What would make Him choose daughters rather than sons? Allah turns their own logic against them.", "what would make Him choose daughters rather than sons"),
      difficulty: 3,
      questions: [
        { q: "What is asked, in 37:153?", a: "Has He chosen daughters over sons?", wrong: ["Has He made rain?", "Has He sent ships?", "Has He made gold?"], why: "Has He then chosen daughters rather than sons?" },
        { q: "What does it mean, per Ibn Kathir?", a: "What would make Him choose that?", wrong: ["Daughters are bad", "Sons are bad", "Nothing"], why: "Meaning, what would make Him choose daughters rather than sons?" },
        { tf: true, q: "The question exposes their unfair thinking.", why: "Then how can they attribute to Allah the share that they would not choose for themselves?" }
      ]
    },
    {
      slug: "how-do-you-judge",
      title: "How do you judge?",
      line: "What is wrong with you? How do you judge?",
      facts: ["No sound reasoning", "Use your mind"],
      quote: q37(154),
      source: ik(154, "What kind of reasoning makes you say that?", "what kind of reasoning makes you say that"),
      difficulty: 2,
      questions: [
        { q: "What does 37:154 ask?", a: "How do you decide?", wrong: ["Where do you live?", "What do you eat?", "When do you sleep?"], why: "What is the matter with you? How do you decide?" },
        { q: "What does it mean, per Ibn Kathir?", a: "What reasoning makes you say that?", wrong: ["Who is your king?", "What is your trade?", "Where is your home?"], why: "Meaning, what kind of reasoning makes you say that?" },
        { tf: true, q: "Islam asks us to think with sound reasoning.", why: "What kind of reasoning makes you say that?" }
      ]
    },
    {
      slug: "will-you-not-remember",
      title: "Will you not remember?",
      line: "Will you not then take heed?",
      facts: ["Stop and reflect", "The truth is clear"],
      quote: q37(155),
      source: ik(155, "Allah asks: will you not remember, or do you have plain evidence to prove what you say?", "evidence to prove what you say"),
      difficulty: 2,
      questions: [
        { q: "What does 37:155 ask?", a: "Will you not remember?", wrong: ["Will you not travel?", "Will you not trade?", "Will you not build?"], why: "Will you not then remember?" },
        { tf: true, q: "Remembering means taking heed of the truth.", why: "Will you not then remember?" },
        { q: "What comes next, in 37:156?", a: "A demand for clear proof", wrong: ["A story of a king", "A list of foods", "A song"], why: "Or is there for you a plain authority?" }
      ]
    },
    {
      slug: "a-plain-authority",
      title: "A plain authority?",
      line: "Or do you have clear proof?",
      facts: ["Claims need evidence", "They had none"],
      quote: q37(156),
      source: ik(156, "A plain authority means evidence to prove what you say.", "evidence to prove what you say"),
      difficulty: 2,
      questions: [
        { q: "What is asked for, in 37:156?", a: "A plain authority", wrong: ["A gift", "A ship", "A crown"], why: "Or is there for you a plain authority?" },
        { q: "What does authority mean, per Ibn Kathir?", a: "Evidence for their claim", wrong: ["A ruler", "An army", "A palace"], why: "Means, evidence to prove what you say." },
        { tf: true, q: "In Islam, a claim about Allah needs proof.", why: "Or is there for you a plain authority?" }
      ]
    },
    {
      slug: "bring-your-book",
      title: "Bring your Book",
      line: "Then bring your Book, if you are truthful!",
      facts: ["A Book from Allah", "Their claim is irrational"],
      quote: q37(157),
      source: ik(157, "Produce evidence from a Book revealed by Allah; what you say is totally irrational.", "What you say is totally irrational"),
      difficulty: 2,
      questions: [
        { q: "What are they challenged to bring, in 37:157?", a: "Their Book", wrong: ["Their gold", "Their army", "Their idols"], why: "Then bring your Book if you are truthful!" },
        { q: "What kind of Book, per Ibn Kathir?", a: "Revealed from heaven by Allah", wrong: ["A poem book", "A trade ledger", "A history book"], why: "Evidence for that derived from a Book revealed from heaven by Allah." },
        { q: "How does Ibn Kathir describe their claim?", a: "Totally irrational", wrong: ["Very wise", "Well proven", "Hard to judge"], why: "What you say is totally irrational." }
      ]
    },
    {
      slug: "kinship-with-the-jinn",
      title: "Kinship with the jinn",
      line: "They invented a kinship between Allah and the jinn.",
      facts: ["A made-up family tie", "The jinn know they will be judged"],
      quote: q37(158),
      source: ik(158, "Mujahid said they claimed angels were Allah's daughters; asked about mothers, they named jinn. All a lie.", "Then who are their mothers"),
      difficulty: 3,
      questions: [
        { q: "What did they invent, in 37:158?", a: "Kinship with the jinn", wrong: ["A new city", "A new prayer", "A calendar"], why: "And they have invented a kinship between Him and the Jinn." },
        { q: "Who asked them who the mothers were?", a: "Abu Bakr", wrong: ["Abu Jahl", "Abu Lahab", "Umayyah"], why: "Abu Bakr said, Then who are their mothers?" },
        { tf: true, q: "Those who say this will be brought for judgement.", why: "Those who say that will be brought forth for punishment on the Day of Reckoning." }
      ]
    },
    {
      slug: "glorified-be-allah",
      title: "Glorified be Allah",
      line: "Glory be to Allah, far above what they claim!",
      facts: ["Far above having offspring", "Free of every fault"],
      quote: q37(159),
      source: ik(159, "Exalted, sanctified and glorified be He far above having any offspring.", "glorified be He far above having any offspring"),
      difficulty: 2,
      questions: [
        { q: "What does 37:159 declare?", a: "Glorified be Allah", wrong: ["Allah has a son", "Angels are gods", "Jinn are kin"], why: "Glorified be Allah! He is free from what they attribute unto Him." },
        { q: "Above what is He, per Ibn Kathir?", a: "Having any offspring", wrong: ["Mercy", "Knowledge", "Power"], why: "Exalted, sanctified and glorified be He far above having any offspring." },
        { tf: true, q: "SubhanAllah declares Allah free of all faults.", why: "Glorified be Allah! He is free from what they attribute unto Him." }
      ]
    },
    {
      slug: "except-his-chosen-servants",
      title: "Except His chosen servants",
      line: "Except the chosen servants of Allah.",
      facts: ["They follow the truth", "Revealed to every Prophet"],
      quote: q37(160),
      source: ik(160, "Allah excludes those He chooses, who follow the truth revealed to every Prophet.", "who are the ones who follow the truth revealed to every Prophet who was sent"),
      difficulty: 3,
      questions: [
        { q: "Who is excepted, in 37:160?", a: "The servants Allah chooses", wrong: ["The jinn", "The idol makers", "The poets"], why: "Except the servants of Allah, whom He chooses." },
        { q: "Who are they, per Ibn Kathir?", a: "Followers of the Prophets' truth", wrong: ["Rich people", "Kings", "Fortune tellers"], why: "Who are the ones who follow the truth revealed to every Prophet who was sent." },
        { tf: true, q: "The chosen servants do not say such lies about Allah.", why: "Except the servants of Allah, whom He chooses." }
      ]
    },
    {
      slug: "you-and-what-you-worship",
      title: "You and what you worship",
      line: "You and what you worship cannot mislead anyone.",
      facts: ["Only the heedless follow", "Truth protects believers"],
      quote: q37(161),
      source: ik(161, "Only those more misguided than them will follow their false worship.", "those who are more misguided than you"),
      difficulty: 3,
      questions: [
        { q: "To whom is 37:161 addressed?", a: "The idolaters", wrong: ["The angels", "The believers", "The Prophets"], why: "Allah says, addressing the idolators: So, verily you and those whom you worship." },
        { q: "Who follows them, per Ibn Kathir?", a: "Those more misguided", wrong: ["The wise", "The believers", "The angels"], why: "The only ones who will believe what you say are those who are more misguided than you." },
        { tf: false, q: "False gods can mislead the sincere believers.", why: "So, verily you and those whom you worship cannot lead astray." }
      ]
    },
    {
      slug: "cannot-lead-astray",
      title: "Cannot lead astray",
      line: "They cannot turn anyone away from Allah.",
      facts: ["Allah protects His servants", "No power over the sincere"],
      quote: q37(162),
      source: ik(162, "Ibn Kathir compares those who follow them to the heedless, who have hearts but do not understand.", "They are the heedless ones"),
      difficulty: 2,
      questions: [
        { q: "What can they not do, in 37:162?", a: "Lead astray", wrong: ["Speak", "Walk", "Eat"], why: "Cannot lead astray." },
        { q: "Who are the followers like, in 7:179?", a: "The heedless", wrong: ["The angels", "The scholars", "The brave"], why: "Those! They are the heedless ones (7:179)." },
        { tf: true, q: "Falsehood only catches those who stay heedless.", why: "They have hearts wherewith they understand not. They are the heedless ones." }
      ]
    },
    {
      slug: "already-bound-for-the-fire",
      title: "Already bound for the Fire",
      line: "Except one who is already headed for the Fire.",
      facts: ["Hearts that refuse to understand", "Eyes that refuse to see"],
      quote: q37(163),
      source: ik(163, "Only those who are more misguided and created for Hell will follow their false worship.", "are those who are more misguided than you and are created for Hell"),
      difficulty: 3,
      questions: [
        { q: "Whom can they mislead, in 37:163?", a: "Those headed for the Fire", wrong: ["The angels", "The Prophets", "Sincere believers"], why: "Except those who are predestined to burn in Hell." },
        { q: "Which ayah says they have hearts but do not understand?", a: "7:179", wrong: ["2:255", "1:5", "112:3"], why: "They have hearts wherewith they understand not (7:179)." },
        { tf: true, q: "Shirk only misleads those who turn away.", why: "The one who is misled by it is the one who is turned aside." }
      ]
    },
    {
      slug: "every-angel-has-a-place",
      title: "Every angel has a place",
      line: "The angels say: each of us has a known place.",
      facts: ["They never overstep it", "Heaven is full of worship"],
      quote: q37(164),
      source: ik(164, "Each angel has his own place in the heavens and in the places of worship, which he does not overstep.", "each one has his own place in the heavens and in the places of worship"),
      difficulty: 2,
      questions: [
        { q: "What does each angel have, in 37:164?", a: "A known place", wrong: ["A house", "A crown", "A ship"], why: "And there is not one of us but has his known place." },
        { q: "Do they overstep it, per Ibn Kathir?", a: "No", wrong: ["Yes, often", "Sometimes", "Only at night"], why: "Each one has his own place in the heavens and in the places of worship, which he does not overstep." },
        { tf: true, q: "The angels are servants, not daughters of Allah.", why: "Declaring the angels to be above the position attributed to them by those who told lies about them." }
      ]
    },
    {
      slug: "we-stand-in-rows",
      title: "We stand in rows",
      line: "The angels say: we stand in rows.",
      facts: ["Rows for worship", "Umar straightened rows like theirs"],
      quote: q37(165),
      source: ik(165, "Umar would say: make your rows straight, for Allah wants you to follow the ways of the angels.", "Make your rows straight, for Allah wants you to follow the ways of the angels"),
      difficulty: 2,
      questions: [
        { q: "How do the angels stand, in 37:165?", a: "In rows", wrong: ["In circles", "Alone", "Lying down"], why: "And verily, we, we stand in rows." },
        { q: "What did Umar say before prayer?", a: "Make your rows straight", wrong: ["Make it quick", "Sit down", "Pray alone"], why: "Make your rows straight, for Allah wants you to follow the ways of the angels." },
        { tf: true, q: "This ties back to the first ayah of the surah.", why: "We stand in rows to worship, as we have already seen in the Ayah By those ranged in ranks." }
      ]
    },
    {
      slug: "rows-like-angels-a-gift",
      title: "Rows like angels: a gift",
      line: "Our prayer rows are made like the rows of the angels.",
      facts: ["One of three gifts", "The earth a place of prayer"],
      quote: q37(165),
      source: hadith("muslim", "522", "Hudhayfah ibn al-Yaman", "Sahih", "The Prophet ﷺ said we were favoured in three things, including that our rows were made like the rows of the angels.", "Our rows have been made like the rows of the angels"),
      difficulty: 3,
      questions: [
        { q: "What are our rows like, in the hadith?", a: "The rows of the angels", wrong: ["Rows of soldiers", "Rows of trees", "Rows of houses"], why: "Our rows have been made like the rows of the angels." },
        { q: "What else is a gift, in the hadith?", a: "The whole earth is a mosque", wrong: ["Gold for all", "No fasting", "Endless rain"], why: "And the whole earth has been made a mosque for us." },
        { q: "What purifies if water is missing, in the hadith?", a: "Its dust", wrong: ["Milk", "Oil", "Nothing"], why: "Its dust has been made a purifier for us in case water is not available." }
      ]
    },
    {
      slug: "those-who-glorify",
      title: "Those who glorify",
      line: "The angels say: we are those who glorify Allah.",
      facts: ["Praising and sanctifying Him", "Humble servants in need of Him"],
      quote: q37(166),
      source: ik(166, "The angels glorify, praise and sanctify Allah; they are His servants, in need of Him and humble before Him.", "We are servants of Him and in need of Him, humbling ourselves before Him"),
      difficulty: 2,
      questions: [
        { q: "What do the angels do, in 37:166?", a: "Glorify Allah", wrong: ["Rule the earth", "Eat and drink", "Sleep"], why: "And verily, we indeed are those who glorify." },
        { q: "How do they see themselves, per Ibn Kathir?", a: "Servants in need of Him", wrong: ["His children", "His partners", "Equal to Him"], why: "We are servants of Him and in need of Him, humbling ourselves before Him." },
        { tf: false, q: "The angels claim to be Allah's daughters.", why: "We are servants of Him and in need of Him, humbling ourselves before Him." }
      ]
    },
    {
      slug: "they-used-to-say",
      title: "They used to say",
      line: "The Quraysh used to say something before Islam came.",
      facts: ["They wished for a reminder", "Before the Prophet ﷺ came"],
      quote: q37(167),
      source: ik(167, "Before the Prophet ﷺ came, they wished for someone to remind them about Allah and bring them His Book.", "they used to wish"),
      difficulty: 2,
      questions: [
        { q: "Who used to say it, per Ibn Kathir?", a: "The Quraysh", wrong: ["The angels", "The jinn", "The Romans"], why: "The Quraysh wished that They could have a Reminder as had the Men of old." },
        { q: "When did they wish it, per Ibn Kathir?", a: "Before the Prophet ﷺ came", wrong: ["After Badr", "In Ramadan", "Never"], why: "They used to wish, before you, O Muhammad, came to them." },
        { tf: true, q: "They wished for a Book like earlier nations had.", why: "To bring them the Book of Allah." }
      ]
    },
    {
      slug: "if-we-had-a-reminder",
      title: "If we had a reminder",
      line: "If only we had a reminder like the people of old!",
      facts: ["Like earlier nations", "A wish they later broke"],
      quote: q37(168),
      source: ik(168, "They wished for someone to remind them about Allah and what happened in earlier times.", "that they would have someone to remind them about Allah and what happened in earlier times"),
      difficulty: 2,
      questions: [
        { q: "What did they wish for, in 37:168?", a: "A reminder", wrong: ["A king", "Gold", "Rain"], why: "If we had a reminder as had the men of old." },
        { q: "Like whom, in 37:168?", a: "The men of old", wrong: ["The Romans", "The jinn", "The angels"], why: "If we had a reminder as had the men of old." },
        { q: "Which ayah says a warner only made them flee?", a: "35:42", wrong: ["1:1", "112:1", "2:2"], why: "Yet when a warner came to them, it increased in them naught but flight (35:42)." }
      ]
    },
    {
      slug: "we-would-be-chosen",
      title: "We would be chosen",
      line: "We would surely have been Allah's sincere servants!",
      facts: ["An empty boast", "Tested when it came"],
      quote: q37(169),
      source: ik(169, "They swore they would be more guided than any nation, yet when a warner came, they only fled.", "they would be more guided than any of the nations"),
      difficulty: 3,
      questions: [
        { q: "What did they claim, in 37:169?", a: "They would be chosen servants", wrong: ["They would be kings", "They would be rich", "They would travel"], why: "We would have indeed been the chosen servants of Allah!" },
        { q: "What did they swear, per 35:42?", a: "To be more guided than all", wrong: ["To build idols", "To leave Makkah", "To stay silent"], why: "They would be more guided than any of the nations before them." },
        { tf: false, q: "They kept their promise when the Prophet ﷺ came.", why: "Yet when a warner came to them, it increased in them naught but flight from the truth." }
      ]
    },
    {
      slug: "they-will-come-to-know",
      title: "They will come to know",
      line: "Yet they disbelieved in it, so they will come to know.",
      facts: ["A stern warning", "For rejecting the Messenger ﷺ"],
      quote: q37(170),
      source: ik(170, "This is a definite and stern warning because they rejected their Lord and His Messenger ﷺ.", "This is a definite and stern threat"),
      difficulty: 2,
      questions: [
        { q: "What did they do when it came, in 37:170?", a: "Disbelieved in it", wrong: ["Thanked Allah", "Followed it", "Memorised it"], why: "But now they disbelieve therein, so they will come to know." },
        { q: "What is so they will come to know, per Ibn Kathir?", a: "A stern warning", wrong: ["A promise of gold", "A greeting", "A riddle"], why: "This is a definite and stern threat because of their disbelief in their Lord." },
        { tf: true, q: "Wishing for guidance is not enough; we must accept it.", why: "But now they disbelieve therein, so they will come to know." }
      ]
    },
    {
      slug: "the-word-gone-forth",
      title: "The Word gone forth",
      line: "Allah's Word has gone forth for His servants, the Messengers.",
      facts: ["Decreed from the start", "In this world and the next"],
      quote: q37(171),
      source: ik(171, "It was stated in the first decree that the Messengers and their followers will prevail in this world and the next.", "the Messengers and their followers will ultimately prevail in this world and the Hereafter"),
      difficulty: 3,
      questions: [
        { q: "For whom has the Word gone forth, in 37:171?", a: "The Messengers", wrong: ["The kings", "The poets", "The jinn"], why: "And, verily, Our Word has gone forth of old for Our servants, the Messengers." },
        { q: "What was decreed, per Ibn Kathir?", a: "They will prevail", wrong: ["They will lose", "They will be forgotten", "They will be rich"], why: "The Messengers and their followers will ultimately prevail in this world and the Hereafter." },
        { q: "Which ayah says Allah and His Messengers will win?", a: "58:21", wrong: ["1:7", "36:83", "112:4"], why: "Allah has decreed: Verily, it is I and My Messengers who shall be the victorious (58:21)." }
      ]
    },
    {
      slug: "made-triumphant",
      title: "Made triumphant",
      line: "They will surely be helped to victory.",
      facts: ["Over those who denied them", "As in every story told"],
      quote: q37(172),
      source: ik(172, "They would prevail over their people who disbelieved, as Allah destroyed deniers and saved believers.", "they would prevail over their people who disbelieved in them"),
      difficulty: 2,
      questions: [
        { q: "What is promised, in 37:172?", a: "They will be made triumphant", wrong: ["They will be defeated", "They will be silent", "They will leave"], why: "That they verily would be made triumphant." },
        { q: "Over whom, per Ibn Kathir?", a: "Their people who disbelieved", wrong: ["The angels", "Other Prophets", "The animals"], why: "They would prevail over their people who disbelieved in them and went against them." },
        { tf: true, q: "Nuh, Ibrahim, Musa and Yunus all saw Allah's help.", why: "How Allah destroyed the disbelievers and saved His believing servants." }
      ]
    },
    {
      slug: "our-hosts-will-win",
      title: "Our hosts will win",
      line: "And Allah's army will surely be the victors.",
      facts: ["Allah's side wins in the end", "Patience is part of it"],
      quote: q37(173),
      source: ik(173, "Allah's hosts would ultimately prevail.", "that they would ultimately prevail"),
      difficulty: 2,
      questions: [
        { q: "Who will be victors, in 37:173?", a: "Allah's hosts", wrong: ["The idolaters", "The jinn", "The rich"], why: "And that Our hosts! they verily would be the victors." },
        { q: "When, per Ibn Kathir?", a: "Ultimately", wrong: ["Never", "Only in dreams", "Right away always"], why: "Means, that they would ultimately prevail." },
        { tf: true, q: "Victory may take time, but it comes.", why: "Means, that they would ultimately prevail." }
      ]
    },
    {
      slug: "turn-away-for-a-while",
      title: "Turn away for a while",
      line: "So turn away from them for a while.",
      facts: ["Bear their harm with patience", "Wait for the appointed time"],
      quote: q37(174),
      source: ik(174, "Bear their annoyance with patience and wait until the appointed time of victory.", "bear their annoyance with patience and wait until an appointed time"),
      difficulty: 2,
      questions: [
        { q: "What is the Prophet ﷺ told, in 37:174?", a: "Turn away for a while", wrong: ["Fight them now", "Leave forever", "Join them"], why: "So, turn away from them for a while." },
        { q: "What does it mean, per Ibn Kathir?", a: "Bear their harm patiently", wrong: ["Hate them", "Give up", "Stop preaching"], why: "Bear their annoyance with patience and wait until an appointed time." },
        { tf: true, q: "Patience is a key part of calling to Allah.", why: "Bear their annoyance with patience and wait until an appointed time." }
      ]
    },
    {
      slug: "watch-and-they-will-see",
      title: "Watch, and they will see",
      line: "Watch them, and they will soon see.",
      facts: ["A warning to the deniers", "Allah's promise is true"],
      quote: q37(175),
      source: ik(175, "Watch them and see what will happen to them because of their opposition and disbelief.", "watch them and see what will happen to them"),
      difficulty: 2,
      questions: [
        { q: "What is he told, in 37:175?", a: "Watch them", wrong: ["Copy them", "Fear them", "Pay them"], why: "And watch them and they shall see." },
        { q: "What will happen, per Ibn Kathir?", a: "They will see the result of opposing", wrong: ["They will become kings", "Nothing", "They will forget"], why: "Watch them and see what will happen to them by way of punishment for their opposition towards you." },
        { tf: true, q: "And they shall see is a warning.", why: "Allah said, as a threat and a warning, and they shall see!" }
      ]
    },
    {
      slug: "rushing-the-punishment",
      title: "Rushing the punishment",
      line: "Do they want Allah's punishment to come faster?",
      facts: ["They mocked the warning", "Stubborn disbelief"],
      quote: q37(176),
      source: ik(176, "They seek to hasten the punishment because they disbelieve in the Prophet ﷺ.", "seek to hasten on the punishment because they disbelieve"),
      difficulty: 2,
      questions: [
        { q: "What do they hasten, in 37:176?", a: "Allah's punishment", wrong: ["Their meals", "Their travels", "Their trade"], why: "Do they seek to hasten on Our torment?" },
        { q: "Why, per Ibn Kathir?", a: "They disbelieve", wrong: ["They are brave", "They are bored", "They are wise"], why: "They seek to hasten on the punishment because they disbelieve in you." },
        { tf: false, q: "Asking for punishment shows wisdom.", why: "Because of their disbelief and stubbornness." }
      ]
    },
    {
      slug: "an-evil-morning",
      title: "An evil morning",
      line: "When it comes to their homes, awful is that morning.",
      facts: ["In their own homes", "For those who were warned"],
      quote: q37(177),
      source: ik(177, "As-Suddi said in their courtyard means in their homes; how terrible that morning will be for them.", "means, in their homes"),
      difficulty: 3,
      questions: [
        { q: "Where does it descend, in 37:177?", a: "In their courtyard", wrong: ["Far away", "In the sea", "On the mountain"], why: "Then, when it descends in their courtyard, evil will be the morning for those who had been warned." },
        { q: "What is the courtyard, per As-Suddi?", a: "Their homes", wrong: ["The market", "The desert", "The sky"], why: "Then, when it descends in their courtyard, means, in their homes." },
        { q: "For whom is the morning evil?", a: "Those who had been warned", wrong: ["The believers", "The angels", "The animals"], why: "Evil will be the morning for those who had been warned!" }
      ]
    },
    {
      slug: "turn-away-again",
      title: "Turn away, again",
      line: "So turn away from them for a while.",
      facts: ["Repeated for emphasis", "Patience, again"],
      quote: q37(178),
      source: ik(178, "This is a reiteration of the command stated above.", "This is a reiteration of the command stated above"),
      difficulty: 2,
      questions: [
        { q: "What is repeated, in 37:178?", a: "Turn away for a while", wrong: ["Fight them", "Leave Makkah", "Stop praying"], why: "So, turn away from them for a while." },
        { q: "Why repeat it, per Ibn Kathir?", a: "To reiterate the command", wrong: ["By mistake", "For rhyme only", "No reason"], why: "This is a reiteration of the command stated above." },
        { tf: true, q: "37:178 repeats 37:174.", why: "This is a reiteration of the command stated above." }
      ]
    },
    {
      slug: "watch-again",
      title: "Watch, again",
      line: "And watch, and they will see.",
      facts: ["The promise repeated", "Allah never breaks His word"],
      quote: q37(179),
      source: ik(179, "Ibn Kathir says this repeats the command stated above. And Allah knows best.", "This is a reiteration of the command stated above"),
      difficulty: 2,
      questions: [
        { q: "What does 37:179 say?", a: "Watch, and they shall see", wrong: ["Sleep, and forget", "Run, and hide", "Eat, and rest"], why: "And watch and they shall see." },
        { tf: true, q: "37:179 repeats 37:175.", why: "This is a reiteration of the command stated above." },
        { tf: true, q: "Repetition in the Quran adds emphasis.", why: "This is a reiteration of the command stated above." }
      ]
    },
    {
      slug: "lord-of-might",
      title: "Lord of might",
      line: "Glory be to your Lord, Lord of might, above their claims!",
      facts: ["Owner of might and power", "None can resist Him"],
      quote: q37(180),
      source: ik(180, "Lord of Al-Izzah means the Owner of might and power Whom none can resist.", "the Owner of might and power Whom none can resist"),
      difficulty: 2,
      questions: [
        { q: "What is your Lord called, in 37:180?", a: "Lord of Al-Izzah", wrong: ["Lord of the market", "Lord of poets", "Lord of the jinn only"], why: "Glorified be your Lord, the Lord of Al-Izzah!" },
        { q: "What does Al-Izzah mean, per Ibn Kathir?", a: "Might and power", wrong: ["Wealth", "Beauty", "Speed"], why: "The Owner of might and power Whom none can resist." },
        { q: "From what is He free, per Ibn Kathir?", a: "What the liars say", wrong: ["Mercy", "Knowledge", "Praise"], why: "He is free from what they attribute unto Him means, from what these lying fabricators say." }
      ]
    },
    {
      slug: "peace-on-the-messengers",
      title: "Peace on the Messengers",
      line: "And peace be upon all the Messengers!",
      facts: ["What they say of Allah is true", "Peace in both worlds"],
      quote: q37(181),
      source: ik(181, "May Allah's peace be upon them in this world and the next, because what they say about their Lord is true.", "because what they say about their Lord is sound, correct and true"),
      difficulty: 2,
      questions: [
        { q: "On whom is peace, in 37:181?", a: "The Messengers", wrong: ["The idolaters", "The jinn", "The kings"], why: "And Salam (peace!) be on the Messengers." },
        { q: "Why, per Ibn Kathir?", a: "What they say of Allah is true", wrong: ["They were rich", "They were many", "They were strong"], why: "Because what they say about their Lord is sound, correct and true." },
        { tf: true, q: "We send peace on all the Messengers.", why: "And Salam be on the Messengers!" }
      ]
    },
    {
      slug: "all-praise-to-allah",
      title: "All praise to Allah",
      line: "All praise and thanks belong to Allah, Lord of all the worlds.",
      facts: ["Praise at the start and end", "Glory and praise go together"],
      quote: q37(182),
      source: ik(182, "Praise be to Him at the beginning and end of all things; glorification and praise often appear together.", "praise be to Him at the beginning and end of all things"),
      difficulty: 2,
      questions: [
        { q: "How does the surah end, in 37:182?", a: "All praise to Allah", wrong: ["A story", "A warning", "A list"], why: "And all the praises and thanks be to Allah, Lord of all that exists." },
        { q: "When is Allah praised, per Ibn Kathir?", a: "At the start and end of all things", wrong: ["Only at night", "Only in Ramadan", "Only in Makkah"], why: "Praise be to Him at the beginning and end of all things." },
        { tf: true, q: "Glorifying and praising Allah often come together.", why: "Because Tasbih implies a declaration of being free from all shortcomings, the two ideas appear together." }
      ]
    },
    {
      slug: "heavy-on-the-scale",
      title: "Heavy on the scale",
      line: "Two easy phrases of glory are heavy on the Scale.",
      facts: ["SubhanAllah wa bihamdihi", "SubhanAllah al-Azim"],
      quote: q37(182),
      source: hadith("bukhari", "6406", "Abu Hurairah", "Sahih", "The Prophet ﷺ said two phrases are easy on the tongue, heavy on the Scale and dear to Allah: SubhanAllah al-Azim and SubhanAllah wa bihamdihi.", "very easy for the tongue to say, but they are very heavy in the balance"),
      difficulty: 3,
      questions: [
        { q: "How are the two phrases, in the hadith?", a: "Easy to say, heavy on the Scale", wrong: ["Hard to say", "Light on the Scale", "Rarely said"], why: "Two expressions which are very easy for the tongue to say, but they are very heavy in the balance." },
        { q: "Which phrase is one of them?", a: "SubhanAllah wa bihamdihi", wrong: ["Good morning", "Salam alaykum only", "Ameen"], why: "Subhan Allah Al-Azim and Subhan Allah wa bihamdihi." },
        { tf: true, q: "The surah ends with glory and praise, like these phrases.", why: "Glorified be your Lord... And all the praises and thanks be to Allah, Lord of all that exists." }
      ]
    }
  ]
};

export const SAFFAT_UNITS: readonly DeepUnit[] = [SAFFAT_ONE, SAFFAT_TWO, SAFFAT_THREE, SAFFAT_FOUR, SAFFAT_FIVE, SAFFAT_SIX];
