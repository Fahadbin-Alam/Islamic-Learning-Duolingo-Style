import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Ad-Duha ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Ad-Duha 93:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_93_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Ad-Duha 93:${ayah}`,
    url: `https://quran.com/93:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 93:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q93 = (ayah: number) => quranQuote(93, ayah);



/** Ayahs 1 to 5: comfort for Muhammad ﷺ: his Lord has not left him, and the Hereafter is better. */
const DUHA_ONE: DeepUnit = {
  key: "duha1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-93",
  name: "Ad-Duha, ayahs 1-5",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ad-Duha",
  lessons: [
    {
      slug: "why-ad-duha-came-down",
      title: "Why Ad-Duha came down",
      line: "Revelation paused and some mocked; Ad-Duha came as comfort.",
      facts: ["Jibril came later", "Allah answered the mockers"],
      quote: q93(1),
      source: hadith("bukhari", "4951", "Jundub ibn Abdullah", "Sahih", "Revelation was delayed for a while, and a woman said his companion had left him. Then Allah revealed: your Lord has neither forsaken you nor hated you.", "has neither forsaken you, not hated you"),
      difficulty: 2,
      questions: [
        { q: "What paused before Ad-Duha came down?", a: "Revelation", wrong: ["The rain", "The trade", "The prayer times"], why: "Jibril was slow in coming to the Messenger of Allah." },
        { q: "What did the mockers claim?", a: "His Lord had left him", wrong: ["He had moved away", "He was rich", "He was a king"], why: "So the idolators said, Muhammad's Lord has abandoned him." },
        { tf: true, q: "Allah answered them with Surah Ad-Duha.", why: "So Allah revealed: By the forenoon. By the night when it darkens." }
      ]
    },
    {
      slug: "by-the-forenoon",
      title: "By the forenoon",
      line: "Allah swears by the bright morning hours and the light in them.",
      facts: ["Ad-Duha: the forenoon", "Light after darkness"],
      quote: q93(1),
      source: ik(1, "Ibn Kathir says Allah swears by the forenoon and the light He placed in it.", "Allah is swearing by the forenoon and the light that He has placed in it"),
      difficulty: 1,
      questions: [
        { q: "By what does Allah swear in 93:1?", a: "The forenoon", wrong: ["The sunset", "The stars", "The sea"], why: "By the forenoon." },
        { q: "What did Allah place in the forenoon, per Ibn Kathir?", a: "Light", wrong: ["Rain", "Silence", "Cold"], why: "The forenoon and the light that He has placed in it." },
        { tf: true, q: "Ad-Duha is the bright time of the morning.", why: "By the forenoon." }
      ]
    },
    {
      slug: "the-still-night",
      title: "The still night",
      line: "Allah swears by the night when it settles and grows dark.",
      facts: ["Saja: settles, grows still", "Light and dark both show His power"],
      quote: q93(2),
      source: ik(2, "Mujahid, Qatadah and others said Saja means it settles and darkens; both light and darkness show the Creator's power.", "This is a clear proof of the power of the Creator"),
      difficulty: 2,
      questions: [
        { q: "By what does Allah swear in 93:2?", a: "The night when it darkens", wrong: ["The day when it rises", "The wind when it blows", "The moon when it fades"], why: "By the night when it darkens." },
        { q: "What does Saja mean, per Mujahid?", a: "It settles and darkens", wrong: ["It shines", "It burns", "It flies"], why: "Meaning, it settles, darkens and overcomes them." },
        { tf: false, q: "Light and darkness show nothing about the Creator.", why: "This is a clear proof of the power of the Creator of this light and that darkness." }
      ]
    },
    {
      slug: "your-lord-has-not-left-you",
      title: "Your Lord has not left you",
      line: "Allah has not left His Messenger ﷺ and does not dislike him.",
      facts: ["Wadda'a: left, abandoned", "Qala: hated"],
      quote: q93(3),
      source: ik(3, "Ibn Kathir says the ayah means: He has not abandoned you, and He does not hate you.", "He has not abandoned you"),
      difficulty: 1,
      questions: [
        { q: "What does 93:3 say?", a: "Your Lord has not forsaken you", wrong: ["Your Lord is far", "Your Lord is angry", "Your Lord forgot"], why: "Your Lord has neither forsaken you nor hates you." },
        { q: "What does Qala mean, per Ibn Kathir?", a: "Hate", wrong: ["Love", "Speak", "Forget"], why: "Nor hates, Qala, you. Meaning, He does not hate you." },
        { tf: true, q: "When things feel quiet, Allah has still not left us.", why: "Your Lord has neither forsaken you nor hates you." }
      ]
    },
    {
      slug: "the-hereafter-is-better",
      title: "The Hereafter is better",
      line: "The life to come is better for him than this world.",
      facts: ["Al-Akhirah: the Hereafter", "He chose what is with Allah"],
      quote: q93(4),
      source: ik(4, "Ibn Kathir says the Hereafter is better for him than this abode, so he cared little for worldly things, and at the end he chose what is with Allah.", "the abode of the Hereafter is better for you than this current abode"),
      difficulty: 2,
      questions: [
        { q: "What is better for him, per 93:4?", a: "The Hereafter", wrong: ["Gold", "A palace", "A kingdom"], why: "And indeed the Hereafter is better for you than the present." },
        { q: "How did he treat worldly things, per Ibn Kathir?", a: "He cared little for them", wrong: ["He collected them", "He boasted of them", "He chased them"], why: "He was the greatest of them in his disregard for worldly matters." },
        { tf: false, q: "At the end he chose to stay in this world.", why: "He chose that which is with Allah over this lowly world." }
      ]
    },
    {
      slug: "each-stage-better",
      title: "Each stage better",
      line: "Every later part of his ﷺ life was better than the one before.",
      facts: ["As-Sa'di explains", "Rising step by step"],
      quote: q93(4),
      source: saadi(93, 4, "As-Sa'di says every later stage of the Prophet's ﷺ life was better than the one before; he kept rising until he reached a rank no one else reached.", "كل حالة متأخرة من أحوالك"),
      difficulty: 2,
      questions: [
        { q: "How did each stage of his ﷺ life compare?", a: "Better than before", wrong: ["Worse than before", "Always the same", "Unknown"], why: "Each later state was better than the earlier, says as-Sa'di." },
        { q: "Until when did he ﷺ keep rising?", a: "Until he died", wrong: ["Until age 40", "Until the Hijrah", "Until Badr"], why: "He kept rising in rank until he died." },
        { tf: true, q: "Allah gave His Messenger ﷺ victory over his enemies.", why: "As-Sa'di on 93:4." }
      ]
    },
    {
      slug: "like-a-rider-under-a-tree",
      title: "Like a rider under a tree",
      line: "Muhammad ﷺ was in the world like a rider resting in shade.",
      facts: ["He slept on a straw mat", "This world is a short stop"],
      quote: q93(4),
      source: hadith("tirmidhi", "2377", "Abdullah ibn Mas'ud", "Sahih", "The Prophet ﷺ slept on a mat that marked his side. Offered a soft bed, he said: I am in this world only like a rider who rests in the shade of a tree, then leaves it.", "as a rider seeking shade under a tree"),
      difficulty: 2,
      questions: [
        { q: "What did he sleep on?", a: "A straw mat", wrong: ["A silk bed", "A golden couch", "A thick carpet"], why: "He was sleeping upon a mat, and the mat had left marks on his side." },
        { q: "What did he compare himself to in this world?", a: "A rider resting in shade", wrong: ["A king on a throne", "A sailor at sea", "A guard at a gate"], why: "I am not in the world but as a rider seeking shade under a tree." },
        { tf: true, q: "A rider in shade soon moves on.", why: "Then he catches his breath and leaves it." }
      ]
    },
    {
      slug: "until-you-are-pleased",
      title: "Until you are pleased",
      line: "Allah will give His Messenger ﷺ until he is well pleased.",
      facts: ["Yu'tika: will give you", "Pleased about his Ummah"],
      quote: q93(5),
      source: ik(5, "Ibn Kathir says Allah will give him until he is pleased about his followers and what He prepared for him.", "Allah will give him until He pleases him concerning his followers"),
      difficulty: 2,
      questions: [
        { q: "What does 93:5 promise?", a: "Your Lord will give you until you are pleased", wrong: ["You will be tested more", "You will be alone", "You will rest now"], why: "And verily, your Lord will give you so that you shall be well-pleased." },
        { q: "Concerning whom will he be pleased, per Ibn Kathir?", a: "His followers", wrong: ["His enemies", "Kings", "Traders"], why: "Allah will give him until He pleases him concerning his followers." },
        { tf: false, q: "The promise is only about this world.", why: "Meaning, in the final abode Allah will give him until He pleases him." }
      ]
    },
    {
      slug: "the-river-al-kawthar",
      title: "The river Al-Kawthar",
      line: "Part of the gift is Al-Kawthar, a river in Paradise.",
      facts: ["Al-Kawthar: abundant good", "Domes of hollow pearls"],
      quote: q93(5),
      source: ik(5, "Ibn Kathir says part of the gift is the River of Al-Kawthar, with domes of hollowed pearls on its banks and banks that smell of musk.", "From this will be the River of Al-Kawthar"),
      difficulty: 2,
      questions: [
        { q: "Which river is part of the gift?", a: "Al-Kawthar", wrong: ["The Nile", "The Euphrates", "Zamzam"], why: "From this will be the River of Al-Kawthar." },
        { q: "What stands on its banks?", a: "Domes of hollowed pearls", wrong: ["Stone towers", "Wooden huts", "Iron gates"], why: "Which will have domes of hollowed pearls on its banks." },
        { tf: true, q: "The banks of Al-Kawthar smell of musk.", why: "The mud on its banks will be the strongest fragrance of musk." }
      ]
    }
  ]
};

/** Ayahs 6 to 8: Allah sheltered the orphan, guided him, and made him rich. */
const DUHA_TWO: DeepUnit = {
  key: "duha2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-93",
  name: "Ad-Duha, ayahs 6-8",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ad-Duha",
  lessons: [
    {
      slug: "an-orphan-given-shelter",
      title: "An orphan given shelter",
      line: "Muhammad ﷺ grew up an orphan, and Allah gave him a home.",
      facts: ["Yatim: orphan", "Awa: gave refuge"],
      quote: q93(6),
      source: ik(6, "His father died before he was born, and his mother Aminah died when he was six; then his grandfather Abdul-Muttalib cared for him.", "his father died while his mother was still pregnant with him"),
      difficulty: 2,
      questions: [
        { q: "How did Allah find him, per 93:6?", a: "An orphan", wrong: ["A king", "A trader", "A traveller"], why: "Did He not find you an orphan and gave you a refuge?" },
        { q: "How old was he when his mother died?", a: "Six", wrong: ["Two", "Ten", "Twenty"], why: "His mother, Aminah bint Wahb died when he was only six years old." },
        { q: "Who cared for him next?", a: "His grandfather Abdul-Muttalib", wrong: ["A stranger", "A king of Yemen", "No one"], why: "He was under the guardianship of his grandfather, Abdul-Muttalib." }
      ]
    },
    {
      slug: "protected-by-his-uncle",
      title: "Protected by his uncle",
      line: "Then his uncle Abu Talib cared for him and protected him.",
      facts: ["Abu Talib: his uncle", "Then the Ansar sheltered him"],
      quote: q93(6),
      source: ik(6, "After his grandfather died, his uncle Abu Talib protected him; later the people of Madinah gave him shelter and support.", "Then his uncle, Abu Talib took responsibility for him"),
      difficulty: 2,
      questions: [
        { q: "How old was he when his grandfather died?", a: "Eight", wrong: ["Three", "Fifteen", "Thirty"], why: "Until he died when Muhammad was eight years old." },
        { q: "Who protected him after that?", a: "His uncle Abu Talib", wrong: ["Abu Lahab", "A Roman king", "No one"], why: "Then his uncle, Abu Talib took responsibility for him." },
        { tf: true, q: "Later the people of Madinah gave him shelter.", why: "When he arrived at their city, they gave him shelter, supported him, defended him." }
      ]
    },
    {
      slug: "guided-to-the-book",
      title: "Guided to the Book",
      line: "Before revelation he did not know the Book; Allah guided him.",
      facts: ["Hada: guided", "42:52: you knew not the Book"],
      quote: q93(7),
      source: ik(7, "Ibn Kathir links 93:7 to 42:52: before revelation you knew not what the Book was, nor faith, and Allah made it a light.", "you knew not what is the Book, nor what is Faith"),
      difficulty: 2,
      questions: [
        { q: "What did Allah do, per 93:7?", a: "Found him unaware and guided him", wrong: ["Left him alone", "Made him a king", "Sent him away"], why: "And He found you unaware and guided you?" },
        { q: "Which ayah did Ibn Kathir link to 93:7?", a: "42:52", wrong: ["2:255", "1:5", "36:1"], why: "You knew not what is the Book, nor what is Faith." },
        { tf: true, q: "Allah made the revelation a light that guides.", why: "But We have made it a light wherewith We guide." }
      ]
    },
    {
      slug: "poor-then-made-rich",
      title: "Poor, then made rich",
      line: "He was poor with a family, and Allah made him rich.",
      facts: ["A'il: poor, in need", "Patient when poor, thankful when rich"],
      quote: q93(8),
      source: ik(8, "Ibn Kathir says he was poor with dependents and Allah made him rich, so he was both the patient poor and the thankful rich.", "you were poor having dependents, so Allah made you wealthy"),
      difficulty: 2,
      questions: [
        { q: "How did Allah find him, per 93:8?", a: "Poor", wrong: ["Rich", "Sick", "Lost at sea"], why: "And He found you poor and made you rich?" },
        { q: "Which two positions did he have, per Ibn Kathir?", a: "Patient poor and thankful rich", wrong: ["King and soldier", "Trader and sailor", "Judge and guard"], why: "The one who is poor and patient, and the one who is wealthy and thankful." },
        { tf: false, q: "Allah made him need people other than Him.", why: "Allah made you wealthy and independent of all others besides Him." }
      ]
    },
    {
      slug: "richness-of-the-soul",
      title: "Richness of the soul",
      line: "True wealth is a heart that feels it has enough.",
      facts: ["Ghina an-nafs: richness of the soul", "Contentment is wealth"],
      quote: q93(8),
      source: hadith("bukhari", "6446", "Abu Hurairah", "Sahih", "The Prophet ﷺ said wealth is not having many possessions; real wealth is feeling sufficiency in the soul.", "wealth is feeling sufficiency in the soul"),
      difficulty: 2,
      questions: [
        { q: "What is true wealth, per the hadith?", a: "Feeling enough in the soul", wrong: ["Many possessions", "A big house", "Many servants"], why: "Real wealth is feeling sufficiency in the soul." },
        { q: "What is wealth NOT, per the hadith?", a: "Having many possessions", wrong: ["Being content", "Being thankful", "Having faith"], why: "Wealth is not in having many possessions." },
        { tf: true, q: "A person with little can still be rich at heart.", why: "Real wealth is feeling sufficiency in the soul." }
      ]
    },
    {
      slug: "content-with-allahs-gift",
      title: "Content with Allah's gift",
      line: "Successful is the Muslim who has enough and is content with it.",
      facts: ["Qana'ah: contentment", "Enough is a blessing"],
      quote: q93(8),
      source: hadith("muslim", "1054", "Abdullah ibn Amr", "Sahih", "The Prophet ﷺ said: successful is the one who accepts Islam, is given enough, and is made content by Allah with what He gave him.", "made contented by Allah with what He has given him"),
      difficulty: 2,
      questions: [
        { q: "Who is successful, per the hadith?", a: "A Muslim given enough and content", wrong: ["The richest trader", "The strongest man", "The most famous"], why: "He is successful who has accepted Islam, who has been provided with sufficient for his want." },
        { q: "Who makes the heart content?", a: "Allah", wrong: ["Money", "Friends", "Fame"], why: "And been made contented by Allah with what He has given him." },
        { tf: false, q: "Success needs much more than enough.", why: "Provided with sufficient for his want and made contented by Allah." }
      ]
    }
  ]
};

/** Ayahs 9 to 11: be kind to orphans and askers, and speak of Allah's blessings. */
const DUHA_THREE: DeepUnit = {
  key: "duha3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-93",
  name: "Ad-Duha, ayahs 9-11",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ad-Duha",
  lessons: [
    {
      slug: "be-gentle-with-the-orphan",
      title: "Be gentle with the orphan",
      line: "As Allah sheltered him, he must never be harsh to an orphan.",
      facts: ["La taqhar: do not oppress", "Be like a kind father"],
      quote: q93(9),
      source: ik(9, "As you were an orphan and Allah sheltered you, do not humiliate the orphan; be kind and gentle. Qatadah said be like a merciful father.", "Be like a merciful father to the orphan"),
      difficulty: 2,
      questions: [
        { q: "What does 93:9 forbid?", a: "Oppressing the orphan", wrong: ["Feeding the orphan", "Teaching the orphan", "Playing with the orphan"], why: "Therefore, treat not the orphan with oppression." },
        { q: "What did Qatadah say we should be?", a: "Like a merciful father", wrong: ["Like a strict judge", "Like a stranger", "Like a guard"], why: "Be like a merciful father to the orphan." },
        { tf: true, q: "The command follows from his own life as an orphan.", why: "Just as you were an orphan and Allah sheltered you, then do not oppress the orphan." }
      ]
    },
    {
      slug: "do-not-turn-away-the-asker",
      title: "Do not turn away the asker",
      line: "Answer whoever asks, for help or for knowledge, with gentleness.",
      facts: ["As-Sa'il: one who asks", "Mercy for the weak"],
      quote: q93(10),
      source: ik(10, "Do not scorn one who asks for knowledge; Ibn Ishaq said do not be harsh to the weak; Qatadah said answer the poor with mercy and gentleness.", "respond to the poor with mercy and gentleness"),
      difficulty: 2,
      questions: [
        { q: "What does 93:10 forbid?", a: "Repulsing the one who asks", wrong: ["Asking questions", "Giving charity", "Speaking softly"], why: "And repulse not the one who asks." },
        { q: "How should we answer the poor, per Qatadah?", a: "With mercy and gentleness", wrong: ["With anger", "With silence", "With a joke"], why: "Respond to the poor with mercy and gentleness." },
        { tf: true, q: "One who asks for knowledge must not be scorned.", why: "Do not scorn the one who asks for knowledge seeking to be guided." }
      ]
    },
    {
      slug: "speak-of-allahs-blessings",
      title: "Speak of Allah's blessings",
      line: "Tell others of the good Allah gave you, out of thanks.",
      facts: ["Fa haddith: so speak of it", "Thanks with the tongue"],
      quote: q93(11),
      source: ik(11, "As you were poor and Allah made you rich, tell about Allah's favour upon you.", "as you were poor and needy, and Allah made you wealthy"),
      difficulty: 2,
      questions: [
        { q: "What does 93:11 command?", a: "Proclaim the grace of your Lord", wrong: ["Hide every blessing", "Boast of yourself", "Keep silent"], why: "And proclaim the grace of your Lord." },
        { q: "Why speak of it, per Ibn Kathir?", a: "He was poor and Allah made him rich", wrong: ["To show off", "To win a prize", "To scare people"], why: "Just as you were poor and needy, and Allah made you wealthy, then tell about Allah's favor upon you." },
        { tf: false, q: "Mentioning Allah's blessings is a kind of boasting.", why: "Then tell about Allah's favor upon you." }
      ]
    },
    {
      slug: "thank-people-too",
      title: "Thank people too",
      line: "Whoever does not thank people has not thanked Allah.",
      facts: ["Shukr: thanks", "Say thank you"],
      quote: q93(11),
      source: hadith("tirmidhi", "1954", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said whoever is not grateful to the people is not grateful to Allah.", "Whoever is not grateful to the people, he is not grateful to Allah"),
      difficulty: 1,
      questions: [
        { q: "Who has not thanked Allah, per the hadith?", a: "One who does not thank people", wrong: ["One who sleeps early", "One who travels", "One who is quiet"], why: "Whoever is not grateful to the people, he is not grateful to Allah." },
        { q: "What should we do when someone helps us?", a: "Thank them", wrong: ["Ignore them", "Forget it", "Complain"], why: "Whoever is not grateful to the people, he is not grateful to Allah." },
        { tf: true, q: "Thanking people is part of thanking Allah.", why: "Whoever is not grateful to the people, he is not grateful to Allah." }
      ]
    }
  ]
};

export const DUHA_UNITS: readonly DeepUnit[] = [DUHA_ONE, DUHA_TWO, DUHA_THREE];
