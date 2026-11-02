import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Ta-Ha ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Ta-Ha 20:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_20_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Ta-Ha 20:${ayah}`,
    url: `https://quran.com/20:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 20:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q20 = (ayah: number) => quranQuote(20, ayah);

/** Ayahs 1 to 52: the Quran is a mercy, Musa at the fire, the staff and the shining hand, Musa's prayer, and the first talk with Fir'awn. */
const TAHA_ONE: DeepUnit = {
  key: "taha1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-20",
  name: "Ta-Ha, ayahs 1 to 52",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ta-Ha",
  lessons: [
    {
      slug: "not-sent-to-cause-distress",
      title: "Not sent to cause distress",
      line: "The Quran came as mercy and reminder, not hardship.",
      facts: ["A light and a guide", "A reminder for the God-fearing"],
      quote: q20(2),
      source: ik(2, "Some said the Quran was sent to burden the Prophet ﷺ. Allah answered that He sent it as a reminder, and Qatadah said Allah made it a mercy, a light and a guide to Paradise.", "He made it a mercy, a light and a guide to Paradise"),
      difficulty: 2,
      questions: [
        { q: "Why was the Quran not sent, in 20:2?", a: "To cause distress", wrong: ["To guide", "To remind", "To bring mercy"], why: "We have not sent down the Quran unto you to cause you distress." },
        { q: "What is it instead, in 20:3?", a: "A reminder for the God-fearing", wrong: ["A puzzle", "A burden", "A secret"], why: "But only as a Reminder to those who fear Allah." },
        { q: "What did Qatadah call the Quran?", a: "A mercy, a light and a guide", wrong: ["A heavy load", "A test of strength", "A story only"], why: "He made it a mercy, a light and a guide to Paradise." }
      ]
    },
    {
      slug: "understanding-the-religion",
      title: "Understanding the religion",
      line: "When Allah wants good for someone, He gives them understanding.",
      facts: ["Knowledge is a gift", "Learning is a good sign"],
      quote: q20(2),
      source: hadith("bukhari", "71", "Mu'awiyah", "Sahih", "The Messenger of Allah ﷺ said: If Allah wants good for a person, He gives him understanding of the religion.", "If Allah wants to do good to a person, He makes him comprehend the religion"),
      difficulty: 2,
      questions: [
        { q: "What does Allah give one He wants good for?", a: "Understanding of the religion", wrong: ["Gold", "Fame", "Long life"], why: "If Allah wants to do good to a person, He makes him comprehend the religion." },
        { q: "Who is the true giver, in the hadith?", a: "Allah", wrong: ["The teacher", "The king", "The student"], why: "I am just a distributor, but the grant is from Allah." },
        { q: "Ibn Kathir links the hadith to 20:2.", tf: true, why: "Whomever Allah gives knowledge to, it is because Allah wants him to have an abundance of good." }
      ]
    },
    {
      slug: "he-knows-the-hidden",
      title: "He knows the hidden",
      line: "Allah knows the secret and what is even more hidden.",
      facts: ["All is His", "He has the Best Names"],
      quote: q20(7),
      source: ik(6, "Everything in the heavens, on earth, between them and under the soil belongs to Allah. He knows what is said aloud, the secret, and what is more hidden still.", "This means all of this is owned by Him and in His grasp"),
      difficulty: 2,
      questions: [
        { q: "What belongs to Allah, in 20:6?", a: "All, even under the soil", wrong: ["Only the sky", "Only Arabia", "Only the sea"], why: "To Him belongs all that is in the heavens and all that is on the earth, and all that is between them, and all that is under the soil." },
        { q: "What does Allah know, in 20:7?", a: "The secret and more hidden", wrong: ["Only loud words", "Only deeds", "Only the past"], why: "And if you speak aloud, then verily, He knows the secret and that which is yet more hidden." },
        { q: "To Him belong the Best Names, per 20:8.", tf: true, why: "Allah! There is no God but Him! To Him belong the Best Names." }
      ]
    },
    {
      slug: "musa-sees-a-fire",
      title: "Musa sees a fire",
      line: "Lost on a cold night, Musa saw a fire on the mountain.",
      facts: ["Travelling with his family", "Hoping for warmth and guidance"],
      quote: q20(10),
      source: ik(10, "After his years in Madyan, Musa travelled with his family and got lost on a cold, dark night. He saw a fire on the mountainside and went to bring a flame or find guidance.", "he became lost on the way during a cold, wintery night"),
      difficulty: 2,
      questions: [
        { q: "What did Musa see, in 20:10?", a: "A fire", wrong: ["A river", "A star", "A city"], why: "When he saw a fire, he said to his family: Wait! Verily, I have seen a fire." },
        { q: "What was the night like, per Ibn Kathir?", a: "Cold and dark", wrong: ["Hot and bright", "Rainy and warm", "Calm and sunny"], why: "He became lost on the way during a cold, wintery night." },
        { q: "What did he hope for at the fire, in 20:10?", a: "A flame or guidance", wrong: ["Gold", "Food only", "A horse"], why: "Perhaps I can bring you some burning brand therefrom, or find some guidance at the fire." }
      ]
    },
    {
      slug: "take-off-your-shoes",
      title: "Take off your shoes",
      line: "At the fire, Allah called Musa by name in the sacred valley.",
      facts: ["The valley of Tuwa", "Musa was chosen"],
      quote: q20(12),
      source: ik(12, "At the fire Musa was called by name. Allah told him to take off his shoes, for he was in the sacred valley of Tuwa, and that He had chosen him.", "he was only commanded to remove his sandals due to respect for the blessed spot"),
      difficulty: 2,
      questions: [
        { q: "What was Musa told to take off, in 20:12?", a: "His shoes", wrong: ["His cloak", "His turban", "His ring"], why: "Verily, I am your Lord! So take off your shoes; you are in the sacred valley, Tuwa." },
        { q: "What is Tuwa, per Ibn Abbas?", a: "The name of the valley", wrong: ["A tree", "A city", "A river"], why: "Ibn Abbas said: It is the name of the valley." },
        { q: "Why remove the sandals, per one view?", a: "Respect for the blessed spot", wrong: ["They were wet", "They were new", "To run faster"], why: "He was only commanded to remove his sandals due to respect for the blessed spot." }
      ]
    },
    {
      slug: "pray-to-remember-me",
      title: "Pray to remember Me",
      line: "Allah said: worship Me alone and pray to remember Me.",
      facts: ["Tawhid comes first", "Prayer keeps Allah in mind"],
      quote: q20(14),
      source: ik(14, "Allah told Musa there is no god but Him, so worship Him alone and establish prayer to remember Him. Knowing this is the first duty on every person.", "This is the first obligation upon all responsible people of age"),
      difficulty: 3,
      questions: [
        { q: "What did Allah say first, in 20:14?", a: "There is no God but Me", wrong: ["Build a temple", "Go home", "Gather wealth"], why: "Verily, I am Allah! There is no God but Me, so worship Me." },
        { q: "Why establish the prayer, in 20:14?", a: "For Allah's remembrance", wrong: ["For fame", "For exercise", "For rest"], why: "And perform Salah for My remembrance." },
        { q: "What is the first duty of every person, per Ibn Kathir?", a: "Knowing none is worshipped but Allah", wrong: ["Learning to read", "Earning money", "Travelling"], why: "This is the first obligation upon all responsible people of age, that they know that there is no God worthy of worship except Allah alone." }
      ]
    },
    {
      slug: "a-missed-prayer",
      title: "A missed prayer",
      line: "If you forget a prayer, pray it as soon as you remember.",
      facts: ["No other expiation", "Prayer is for remembrance"],
      quote: q20(14),
      source: hadith("bukhari", "597", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said whoever forgets a prayer should pray it when he remembers, with no other expiation, then recited: Establish prayer for My remembrance.", "If anyone forgets a prayer he should pray that prayer when he remembers it"),
      difficulty: 2,
      questions: [
        { q: "What should one do with a forgotten prayer?", a: "Pray it when remembered", wrong: ["Skip it", "Pay money", "Fast a day"], why: "If anyone forgets a prayer he should pray that prayer when he remembers it." },
        { q: "Is there another expiation, in the hadith?", a: "No, only praying it", wrong: ["Yes, charity", "Yes, fasting", "Yes, a feast"], why: "There is no expiation except to pray the same." },
        { q: "Which ayah did he ﷺ recite?", a: "20:14, prayer for My remembrance", wrong: ["1:1", "2:255", "112:1"], why: "Then he recited: Establish prayer for My remembrance." }
      ]
    },
    {
      slug: "the-hour-is-coming",
      title: "The Hour is coming",
      line: "The Hour will surely come, and only Allah knows when.",
      facts: ["Each rewarded for effort", "Do not follow desires"],
      quote: q20(15),
      source: ik(15, "The Hour is certain to come, and its time is kept hidden. Every person will be rewarded for what he strives for, so do not let disbelievers turn you from it.", "no one knows its appointed time except Me"),
      difficulty: 3,
      questions: [
        { q: "Is the Hour coming, in 20:15?", a: "Yes, surely", wrong: ["No", "Maybe", "It came already"], why: "Verily, the Hour is coming." },
        { q: "Who knows its time, per Ibn Abbas?", a: "Only Allah", wrong: ["The angels", "The scholars", "The stars"], why: "This means that no one knows its appointed time except Me." },
        { q: "Why will the Hour come, in 20:15?", a: "So each is rewarded for effort", wrong: ["To end the sky", "To scare people", "To test kings"], why: "That every person may be rewarded for that which he strives." }
      ]
    },
    {
      slug: "the-staff-became-a-snake",
      title: "The staff became a snake",
      line: "Musa's staff became a moving snake, then a staff again.",
      facts: ["A miracle from Allah", "Fear not"],
      quote: q20(20),
      source: ik(20, "Allah asked Musa what was in his hand to draw his attention to it. When he threw his staff down, it became a quick snake, a great miracle only Allah could do.", "This was a proof from Allah for Musa and a great miracle"),
      difficulty: 2,
      questions: [
        { q: "What did Musa use his stick for, in 20:18?", a: "Leaning and beating down leaves", wrong: ["Fighting", "Fishing", "Writing"], why: "This is my stick, whereon I lean, and wherewith I beat down branches for my sheep." },
        { q: "What did the stick become, in 20:20?", a: "A moving snake", wrong: ["A tree", "A bird", "Gold"], why: "He cast it down, and behold! It was a snake, moving quickly." },
        { q: "What did Allah say next, in 20:21?", a: "Grasp it and fear not", wrong: ["Run away", "Leave it", "Burn it"], why: "Grasp it and fear not; We shall return it to its former state." }
      ]
    },
    {
      slug: "the-shining-hand",
      title: "The shining hand",
      line: "Musa's hand came out shining white, a second sign from Allah.",
      facts: ["Without any disease", "Like a lamp"],
      quote: q20(22),
      source: ik(22, "Musa put his hand to his side and it came out shining white without any illness, like a lamp, showing him he had truly met his Lord.", "it was as if it were a lamp"),
      difficulty: 2,
      questions: [
        { q: "How did his hand come out, in 20:22?", a: "White and shining", wrong: ["Red", "Wet", "Hurt"], why: "It will come forth white and shining, without any disease as another sign." },
        { q: "Did it have any illness, per Ibn Kathir?", a: "No illness at all", wrong: ["A small one", "A burn", "A cut"], why: "This means without any leprosy, ailment, or disfigurement." },
        { q: "What did Al-Hasan compare it to?", a: "A lamp", wrong: ["The sun", "Snow", "A pearl"], why: "He brought it out, and by Allah, it was as if it were a lamp." }
      ]
    },
    {
      slug: "open-my-chest",
      title: "Open my chest",
      line: "Sent to Fir'awn, Musa prayed: open my chest, ease my task.",
      facts: ["A dua for hard tasks", "Loosen my tongue"],
      quote: q20(25),
      source: ik(25, "Allah sent Musa to Fir'awn, the mightiest and most arrogant king. Musa asked Allah to open his chest, ease his task and loosen his tongue, since he could not do it without Allah's help.", "I cannot perform this task if You do not help me"),
      difficulty: 3,
      questions: [
        { q: "What did Musa ask first, in 20:25?", a: "Open for me my chest", wrong: ["Give me gold", "Give me an army", "Let me rest"], why: "O my Lord! Open for me my chest." },
        { q: "Why did he ask for his tongue, in 20:28?", a: "So they understand his speech", wrong: ["To sing", "To shout", "To eat"], why: "And loosen the knot from my tongue, that they understand my speech." },
        { q: "What did Musa admit, per Ibn Kathir?", a: "He needed Allah's help", wrong: ["He was strongest", "He needed no one", "He wanted fame"], why: "I cannot perform this task if You do not help me, aid me and support me." }
      ]
    },
    {
      slug: "harun-my-brother",
      title: "Harun, my brother",
      line: "Musa asked for Harun as helper, to remember Allah much.",
      facts: ["Help from family", "Glorify and remember Allah"],
      quote: q20(30),
      source: ik(29, "Musa asked Allah to make his brother Harun his helper, to share his task, so they could glorify and remember Allah much.", "This was also a request from Musa concerning something not pertaining to himself"),
      difficulty: 2,
      questions: [
        { q: "Whom did Musa ask for, in 20:30?", a: "Harun, his brother", wrong: ["Yusha", "His father-in-law", "His son"], why: "Harun, my brother." },
        { q: "Why did he want Harun, in 20:33-34?", a: "To glorify and remember Allah much", wrong: ["To fight", "To trade", "To rule"], why: "That we may glorify You much, and remember You much." },
        { q: "What does 20:35 say of Allah?", a: "He sees us", wrong: ["He is far", "He is busy", "He sleeps"], why: "Verily, You are ever seeing us." }
      ]
    },
    {
      slug: "under-my-eye",
      title: "Raised under My Eye",
      line: "Baby Musa was carried by the river to Fir'awn's own home.",
      facts: ["Made lovable", "Returned to his mother"],
      quote: q20(39),
      source: ik(39, "Allah answered Musa and reminded him of an earlier favour: his mother put him in a box on the river, and Allah brought him to Fir'awn's home, made him loved, and raised him under His care.", "I made your enemy love you"),
      difficulty: 3,
      questions: [
        { q: "What was Musa told, in 20:36?", a: "You are granted your request", wrong: ["Wait a year", "Ask again", "Go home"], why: "You are granted your request, O Musa!" },
        { q: "Where was baby Musa put, in 20:39?", a: "In a box on the river", wrong: ["In a cave", "On a ship", "In a tree"], why: "Put him into the Tabut and put it into the river." },
        { q: "What did Allah put on Musa, in 20:39?", a: "Love from Him", wrong: ["A crown", "Fear", "Gold"], why: "And I endued you with love from Me, in order that you may be brought up under My Eye." }
      ]
    },
    {
      slug: "back-to-his-mother",
      title: "Back to his mother",
      line: "His sister led him home, so his mother's eyes could be glad.",
      facts: ["He refused other nurses", "Allah's plan"],
      quote: q20(40),
      source: ik(40, "Baby Musa would not feed from any nurse. His sister offered a family to care for him, and so he was returned to his own mother, who no longer had to grieve.", "So We restored you to your mother, that she might cool her eyes and she should not grieve"),
      difficulty: 2,
      questions: [
        { q: "Who helped bring Musa back, in 20:40?", a: "His sister", wrong: ["His brother", "A soldier", "Fir'awn"], why: "When your sister went and said: Shall I show you one who will nurse him?" },
        { q: "Why was he returned, in 20:40?", a: "So his mother would be glad", wrong: ["To travel", "To hide", "To work"], why: "So We restored you to your mother, that she might cool her eyes and she should not grieve." },
        { q: "Musa refused every other nurse, per Ibn Kathir.", tf: true, why: "Women were brought in attempts to find someone who might be able to nurse him. But he refused." }
      ]
    },
    {
      slug: "speak-to-him-mildly",
      title: "Speak to him mildly",
      line: "Musa and Harun were told to speak gently, even to Fir'awn.",
      facts: ["Gentle words reach hearts", "Keep remembering Allah"],
      quote: q20(44),
      source: ik(44, "Allah sent Musa and Harun to Fir'awn, the most arrogant of people, yet told them to speak gently. Soft words reach the heart better and may lead to change.", "their invitation to him was with gentle, soft and easy speech"),
      difficulty: 3,
      questions: [
        { q: "How were they told to speak, in 20:44?", a: "Mildly", wrong: ["Loudly", "Harshly", "Not at all"], why: "And speak to him mildly, perhaps he may accept admonition or fear Allah." },
        { q: "Why speak softly, per Ibn Kathir?", a: "It reaches the heart more", wrong: ["Fir'awn was deaf", "To save time", "To sound weak"], why: "So that the message may have more effect on the souls, and so it would have deeper and more beneficial results." },
        { q: "What should they not slacken in, in 20:42?", a: "Remembering Allah", wrong: ["Walking", "Eating", "Sleeping"], why: "And do not, you both, slacken and become weak in My remembrance." }
      ]
    },
    {
      slug: "i-am-with-you-both",
      title: "I am with you both",
      line: "Afraid, they heard: I am with you both, hearing and seeing.",
      facts: ["Allah protects His Messengers", "Nothing is hidden"],
      quote: q20(46),
      source: ik(46, "Musa and Harun feared Fir'awn would harm them. Allah told them not to fear, for He was with them, hearing and seeing, and Fir'awn could do nothing without His leave.", "I am with you by My protection, My help and My support"),
      difficulty: 2,
      questions: [
        { q: "What did they fear, in 20:45?", a: "That Fir'awn would harm them", wrong: ["Getting lost", "The sea", "Hunger"], why: "Verily, we fear lest he should hasten to punish us or lest he should transgress." },
        { q: "What did Allah say, in 20:46?", a: "I am with you, hearing and seeing", wrong: ["Go back", "Hide", "Wait"], why: "Fear not, verily, I am with you both, hearing and seeing." },
        { q: "How is Allah with them, per Ibn Kathir?", a: "With protection, help and support", wrong: ["With an army", "With gold", "With a ship"], why: "I am with you by My protection, My help and My support." }
      ]
    },
    {
      slug: "peace-on-who-follows-guidance",
      title: "Peace on the guided",
      line: "Peace is on whoever follows the guidance, Musa told Fir'awn.",
      facts: ["Let Israel go", "The Prophet ﷺ wrote the same"],
      quote: q20(47),
      source: ik(47, "Musa and Harun told Fir'awn they were Messengers, asked him to free the Children of Israel, and said peace is on whoever follows guidance. The Prophet ﷺ began his letter to Heraclius with the same words.", "peace be upon you if you follow the guidance"),
      difficulty: 3,
      questions: [
        { q: "What did they ask Fir'awn, in 20:47?", a: "Let the Children of Israel go", wrong: ["Give us gold", "Make us chiefs", "Build a temple"], why: "So let the Children of Israel go with us, and torment them not." },
        { q: "On whom is peace, in 20:47?", a: "Whoever follows the guidance", wrong: ["Only kings", "Only the rich", "Everyone"], why: "And peace will be upon him who follows the guidance!" },
        { q: "Who later used the same greeting in a letter?", a: "The Prophet ﷺ to Heraclius", wrong: ["Fir'awn", "Harun", "A poet"], why: "When the Messenger of Allah ﷺ wrote a letter to Heraclius, he wrote: Peace be upon him who follows the guidance." }
      ]
    },
    {
      slug: "who-is-your-lord",
      title: "Who is your Lord?",
      line: "Our Lord gave everything its form, then guided it, said Musa.",
      facts: ["Every creature has its nature", "Each is guided"],
      quote: q20(50),
      source: ik(50, "Fir'awn asked who their Lord was. Musa said: our Lord gave everything its form and nature, then guided it. He gave each creature what suits it.", "He gave each of His creatures what is suitable for its creation"),
      difficulty: 3,
      questions: [
        { q: "What did Fir'awn ask, in 20:49?", a: "Who is the Lord of you two?", wrong: ["Where are you from?", "What is your name?", "How old are you?"], why: "Who then, O Musa, is the Lord of you two?" },
        { q: "How did Musa describe Allah, in 20:50?", a: "Gave all its form, then guided it", wrong: ["Lives in the sky", "Rules Egypt", "Sleeps at night"], why: "Our Lord is He Who gave to each thing its form and nature, then guided it aright." },
        { q: "What did Allah give each creature, per Ibn Kathir?", a: "What suits its creation", wrong: ["The same shape", "Wings", "A crown"], why: "He gave each of His creatures what is suitable for its creation." }
      ]
    },
    {
      slug: "my-lord-never-forgets",
      title: "My Lord never forgets",
      line: "Allah keeps all in a Record; He never errs or forgets.",
      facts: ["The Preserved Tablet", "Perfect knowledge"],
      quote: q20(52),
      source: ik(52, "Fir'awn asked about past generations. Musa said their knowledge is with his Lord in a Record, and his Lord neither errs nor forgets, unlike creatures who forget.", "nothing eludes Him and He does not miss anything, whether it is small or great"),
      difficulty: 3,
      questions: [
        { q: "Where is the knowledge of past nations, in 20:52?", a: "With my Lord, in a Record", wrong: ["In Egypt", "In old songs", "Lost forever"], why: "The knowledge thereof is with my Lord, in a Record." },
        { q: "What does Allah never do, in 20:52?", a: "Err or forget", wrong: ["Hear", "See", "Create"], why: "My Lord neither errs nor forgets." },
        { q: "What is the Record called, per Ibn Kathir?", a: "Al-Lawh Al-Mahfuz", wrong: ["The Tawrah", "The Zabur", "A scroll of kings"], why: "This Book is called Al-Lawh Al-Mahfuz (The Preserved Tablet)." }
      ]
    }
  ]
};

export const TAHA_UNITS: readonly DeepUnit[] = [TAHA_ONE];
