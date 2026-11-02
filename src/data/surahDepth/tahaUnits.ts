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
      slug: "lord-of-the-throne",
      title: "The Most Gracious and the Throne",
      line: "The Most Gracious rose over the Throne; nothing is like Him.",
      facts: ["Allah is above His creation", "Nothing resembles Allah"],
      quote: q20(5),
      source: ik(5, "Ibn Kathir says the safest way is the way of the early Muslims: accept what the Quran and Sunnah say, without likening Allah to His creation.", "The safest path to take in understanding this, is the way of the Salaf"),
      difficulty: 4,
      questions: [
        { q: "Who rose over the Throne, in 20:5?", a: "The Most Gracious", wrong: ["An angel", "A king", "The sun"], why: "The Most Gracious Istawa the Throne." },
        { q: "What is the safest way to understand 20:5, per Ibn Kathir?", a: "The way of the Salaf", wrong: ["Guessing", "Poetry", "Stories of kings"], why: "The safest path to take in understanding this, is the way of the Salaf." },
        { tf: false, q: "Ibn Kathir says we should liken Allah to creation.", why: "Without resembling it to creation, or comparing it to attributes of the creatures." }
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

/** Ayahs 53 to 98: the earth as a bed, the contest with the magicians, the sea split, Ashura, and the golden calf. */
const TAHA_TWO: DeepUnit = {
  key: "taha2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-20",
  name: "Ta-Ha, ayahs 53 to 98",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ta-Ha",
  lessons: [
    {
      slug: "the-earth-like-a-bed",
      title: "The earth like a bed",
      line: "Allah spread the earth like a bed, with paths and rain.",
      facts: ["Roads to travel", "Food for us and our animals"],
      quote: q20(53),
      source: ik(53, "Musa went on describing his Lord to Fir'awn: He made the earth a resting place, opened roads in it, and sent rain that brings out every kind of plant.", "He is the One Who made the earth as a bed for you"),
      difficulty: 3,
      questions: [
        { q: "What did Allah make the earth like, in 20:53?", a: "A bed", wrong: ["A wall", "A cave", "A ship"], why: "Who has made earth for you like a bed; and has opened ways for you therein." },
        { q: "What does the rain bring out, in 20:53?", a: "Various kinds of plants", wrong: ["Only stones", "Gold", "Only sand"], why: "And We have brought forth with it various kinds of vegetation." },
        { q: "Who sees these signs, in 20:54?", a: "People of understanding", wrong: ["Only kings", "Only sailors", "No one"], why: "Verily, in this are Ayat for men of understanding." }
      ]
    },
    {
      slug: "from-the-earth-we-came",
      title: "From the earth we came",
      line: "Made from earth, returned to it, raised from it again.",
      facts: ["Adam made from earth", "Raised again one day"],
      quote: q20(55),
      source: ik(55, "Adam was created from the soil of the earth. When we die we return to it, and on the Day of Resurrection Allah will bring us out of it once again.", "the earth is your beginning"),
      difficulty: 3,
      questions: [
        { q: "What three things does 20:55 say about the earth?", a: "Created, returned, brought out", wrong: ["Built, sold, left", "Seen, heard, lost", "Grown, cut, burned"], why: "Thereof We created you, and into it We shall return you, and from it We shall bring you out once again." },
        { q: "Who was created from the earth, per Ibn Kathir?", a: "Adam, our father", wrong: ["The angels", "The jinn", "The stars"], why: "For your father, Adam, was created with dirt from the surface of the earth." },
        { q: "Fir'awn believed once he saw all the signs, per 20:56.", tf: false, why: "And indeed We showed him all Our Ayat, but he denied and refused." }
      ]
    },
    {
      slug: "the-day-of-the-festival",
      title: "The day of the festival",
      line: "Musa chose a festival morning, so everyone could see clearly.",
      facts: ["Broad daylight", "The truth is never hidden"],
      quote: q20(59),
      source: ik(59, "Fir'awn called the signs magic and wanted a contest. Musa chose their festival day, in the morning light, so the whole people would see. Prophets work openly, never in secret.", "This is the way of the Prophets. Their work is always clear and apparent"),
      difficulty: 3,
      questions: [
        { q: "What did Fir'awn call Musa's signs, in 20:57?", a: "Magic", wrong: ["Miracles", "Dreams", "Poems"], why: "Have you come to drive us out of our land with your magic, O Musa?" },
        { q: "When was the meeting set, in 20:59?", a: "The day of the festival", wrong: ["At midnight", "In secret", "In winter"], why: "Your appointed meeting is the day of the festival, and let the people assemble when the sun has risen." },
        { q: "Why in daylight, per Ibn Kathir?", a: "So all could see it clearly", wrong: ["It was cooler", "Fir'awn slept at night", "To finish early"], why: "This is the way of the Prophets. Their work is always clear and apparent." }
      ]
    },
    {
      slug: "do-not-lie-against-allah",
      title: "Do not lie against Allah",
      line: "Musa warned the magicians not to make lies against Allah.",
      facts: ["The liar fails", "They argued in secret"],
      quote: q20(61),
      source: ik(61, "Before the contest Musa warned the magicians: do not show people something false as if it were real, for that is lying against Allah. They argued among themselves in secret.", "If you do this, then you would be lying on Allah"),
      difficulty: 3,
      questions: [
        { q: "What did Musa warn them, in 20:61?", a: "Invent not a lie against Allah", wrong: ["Run away now", "Bow to Fir'awn", "Hide your ropes"], why: "Woe unto you! Invent not a lie against Allah." },
        { q: "What happens to one who invents a lie, in 20:61?", a: "He fails", wrong: ["He wins", "He gets rich", "He is praised"], why: "And surely, he who invents a lie will fail miserably." },
        { q: "How did they talk afterwards, in 20:62?", a: "In secret", wrong: ["Loudly", "In song", "Not at all"], why: "Then they debated one with another what they must do, and they kept their talk secret." }
      ]
    },
    {
      slug: "you-throw-first",
      title: "You throw first",
      line: "Musa let the magicians throw first, so all would see the truth.",
      facts: ["Ropes seemed to move", "Musa feared for the people"],
      quote: q20(66),
      source: ik(66, "Musa told the magicians to throw first, so their tricks would be seen and the truth made plain. Their ropes and sticks seemed to move, and Musa feared the people would be fooled.", "he feared for the people that they would be tested and deceived by their magic"),
      difficulty: 3,
      questions: [
        { q: "Who threw first, in 20:66?", a: "The magicians", wrong: ["Musa", "Harun", "Fir'awn"], why: "Nay, throw you first! Then behold! their ropes and their sticks, by their magic, appeared to him as though they moved fast." },
        { q: "Did the ropes really move, in 20:66?", a: "No, they only seemed to", wrong: ["Yes, they were alive", "They flew away", "They turned to gold"], why: "Their ropes and their sticks, by their magic, appeared to him as though they moved fast." },
        { q: "What did Musa fear, per Ibn Kathir?", a: "That the people would be fooled", wrong: ["The ropes", "Losing his staff", "The sun"], why: "He feared for the people that they would be tested and deceived by their magic." }
      ]
    },
    {
      slug: "it-swallowed-their-tricks",
      title: "It swallowed their tricks",
      line: "Allah said fear not; Musa's staff swallowed all their tricks.",
      facts: ["The truth won", "Magic never succeeds"],
      quote: q20(69),
      source: ik(69, "Allah told Musa: fear not, you will win, throw what is in your right hand. His staff swallowed every rope and stick in broad daylight, and the truth prevailed over the trick.", "The truth prevailed and the magic was proven to be falsehood"),
      difficulty: 3,
      questions: [
        { q: "What did Allah tell Musa, in 20:68?", a: "Fear not, you will win", wrong: ["Run away", "Wait a year", "Hide your staff"], why: "Fear not! Surely, you will have the upper hand." },
        { q: "What did the staff do, in 20:69?", a: "Swallowed what they made", wrong: ["Broke in two", "Flew away", "Turned to gold"], why: "And throw that which is in your right hand! It will swallow up that which they have made." },
        { q: "The magician will never succeed, whatever his skill, per 20:69.", tf: true, why: "And the magician will never be successful, to whatever amount (of skill) he may attain." }
      ]
    },
    {
      slug: "the-magicians-believed",
      title: "The magicians believed",
      line: "The magicians fell in sujud and believed in Musa's Lord.",
      facts: ["Magicians by morning", "Believers by evening"],
      quote: q20(70),
      source: ik(70, "The magicians knew every trick, so they knew this was no trick. They fell down in sujud and believed. Ibn Abbas said they were magicians in the morning and witnesses of faith by evening.", "At the beginning of the day they were magicians and at the end of the day they were outstanding witnesses of faith"),
      difficulty: 3,
      questions: [
        { q: "What did the magicians do, in 20:70?", a: "Fell down in sujud", wrong: ["Ran away", "Threw again", "Laughed"], why: "So the magicians fell down prostrate. They said: We believe in the Lord of Harun and Musa." },
        { q: "Why did they know it was no trick, per Ibn Kathir?", a: "They knew all the tricks", wrong: ["Fir'awn told them", "They were tired", "A bird told them"], why: "While they were knowledgeable of the various tricks and methods in the sciences of magic, they knew with conviction that what Musa had done was not magic." },
        { q: "How many magicians were there, per Ibn Abbas?", a: "Seventy", wrong: ["Three", "Ten", "A thousand"], why: "The magicians were seventy men who were magicians in the morning, but witnesses of faith by the time evening came." }
      ]
    },
    {
      slug: "firawns-threat",
      title: "Fir'awn's threat",
      line: "Beaten, Fir'awn lied and threatened the magicians harshly.",
      facts: ["Tyrants lie when they lose", "Faith gives courage"],
      quote: q20(71),
      source: ik(71, "When the magicians believed in front of everyone, Fir'awn was defeated. He falsely called Musa their chief and threatened them with a cruel public punishment.", "Then he said a statement that he, the magicians and all creatures knew was a forgery and an utter lie"),
      difficulty: 4,
      questions: [
        { q: "What did Fir'awn ask the magicians, in 20:71?", a: "Believe before I permit you?", wrong: ["Where is your gold?", "Who is your father?", "Are you hungry?"], why: "Believe you in him before I give you permission?" },
        { q: "Whom did Fir'awn call their chief, in 20:71?", a: "Musa", wrong: ["Harun", "Haman", "Qarun"], why: "Verily, he is your chief who has taught you magic." },
        { tf: false, q: "Ibn Kathir says Fir'awn's claim about Musa was true.", why: "A statement that he, the magicians and all creatures knew was a forgery and an utter lie." }
      ]
    },
    {
      slug: "we-will-not-choose-you",
      title: "We will not choose you",
      line: "Threatened, the magicians said: your power ends with this world.",
      facts: ["Faith gave them courage", "The Hereafter lasts"],
      quote: q20(72),
      source: ik(72, "Fir'awn threatened the new believers. They said: we will not choose you over the clear signs and our Creator. Do what you will, your power is only in this passing world.", "Verily, we are hoping in the eternal abode"),
      difficulty: 4,
      questions: [
        { q: "Whom would they not prefer, in 20:72?", a: "Fir'awn", wrong: ["Musa", "Harun", "Their Creator"], why: "We prefer you not over what have come to us of the clear signs and to Him Who created us." },
        { q: "Where is Fir'awn's power only, in 20:72?", a: "In this worldly life", wrong: ["Everywhere", "In the Hereafter", "Over the stars"], why: "So, decree whatever you desire to decree, for you can only decree (regarding) this life of the world." },
        { q: "What were they hoping for, per Ibn Kathir?", a: "The eternal abode", wrong: ["Fir'awn's gold", "A palace", "Fame"], why: "You only have power in this world and it is a world that will come to an end. Verily, we are hoping in the eternal abode." }
      ]
    },
    {
      slug: "better-and-more-lasting",
      title: "Better and more lasting",
      line: "They hoped Allah would forgive them; His reward lasts forever.",
      facts: ["Forced to do magic", "Allah forgives"],
      quote: q20(73),
      source: ik(73, "The magicians asked Allah to forgive their past wrongs and the magic Fir'awn forced on them. They said Allah is better than Fir'awn, and His reward lasts longer than anything Fir'awn promised.", "More lasting in reward than what you promised us and made us aspire to"),
      difficulty: 4,
      questions: [
        { q: "What did they hope Allah would forgive, in 20:73?", a: "Their faults and forced magic", wrong: ["Nothing", "Musa's faults", "Fir'awn's faults"], why: "Verily, we have believed in our Lord, that He may forgive us our faults, and the magic to which you did compel us." },
        { q: "Who forced them to do magic, in 20:73?", a: "Fir'awn", wrong: ["Musa", "Harun", "Their parents"], why: "And the magic to which you did compel us." },
        { q: "Allah's reward is better and more lasting, per 20:73.", tf: true, why: "And Allah is better as regards reward in comparison to your reward, and more lasting." }
      ]
    },
    {
      slug: "meeting-allah-as-a-criminal",
      title: "Meeting Allah as a criminal",
      line: "A criminal before Allah neither dies nor lives in Hell.",
      facts: ["Repent before the meeting", "Allah's warning is mercy"],
      quote: q20(74),
      source: ik(74, "The magicians warned Fir'awn that whoever meets Allah on the Day of Judgment as a criminal will be in Hell, where he neither dies nor lives.", "whoever meets Allah on the Day of Judgment while being a criminal"),
      difficulty: 4,
      questions: [
        { q: "Who warned Fir'awn with 20:74, per Ibn Kathir?", a: "The magicians", wrong: ["Haman", "His soldiers", "His wife"], why: "The clear intent of this is to be a completion of what the magicians admonished Fir'awn with." },
        { q: "What is the state in Hell, in 20:74?", a: "Neither dying nor living", wrong: ["Sleeping", "Resting", "Feasting"], why: "Then surely, for him is Hell, wherein he will neither die nor live." },
        { tf: true, q: "Ibn Kathir explains it as meeting Allah while a criminal.", why: "This means, whoever meets Allah on the Day of Judgment while being a criminal." }
      ]
    },
    {
      slug: "sprouting-like-seeds",
      title: "Sprouting like seeds",
      line: "Believers punished for sins are brought out by intercession.",
      facts: ["Never lose hope in Allah", "Intercession is real"],
      quote: q20(74),
      source: hadith("muslim", "185", "Abu Sa'id al-Khudri", "Sahih", "The Prophet ﷺ said the true people of the Fire neither die nor live in it. Believers touched by it for sins are brought out by intercession and grow anew by the rivers of Paradise.", "then they would sprout forth like the sprouting of seed"),
      difficulty: 5,
      questions: [
        { q: "How are sinful believers brought out, in the hadith?", a: "By intercession", wrong: ["By paying gold", "By running", "By hiding"], why: "Then they would be granted intercession and would be brought in groups." },
        { q: "Where are they spread, in the hadith?", a: "On the rivers of Paradise", wrong: ["In a desert", "On a mountain", "In a cave"], why: "And would be spread on the rivers of Paradise." },
        { q: "What do they grow like, in the hadith?", a: "Seeds in flood silt", wrong: ["Rocks", "Snow", "Clouds"], why: "Then they would sprout forth like the sprouting of seed in the silt carried by flood." }
      ]
    },
    {
      slug: "the-high-ranks",
      title: "The high ranks",
      line: "Believers who do good get the high ranks of Paradise.",
      facts: ["One hundred levels", "Al-Firdaws is highest"],
      quote: q20(75),
      source: ik(75, "Whoever meets Allah as a believer who did good deeds will have the high ranks of Paradise. Ibn Kathir cites the hadith that Paradise has a hundred levels, and the highest is Al-Firdaws.", "Paradise, which has the highest levels"),
      difficulty: 4,
      questions: [
        { q: "What do believers who do good get, in 20:75?", a: "The high ranks", wrong: ["Nothing", "Low ranks", "Gold only"], why: "But whoever comes to Him as a believer, and has done righteous good deeds, for such are the high ranks." },
        { q: "What is the highest part of Paradise?", a: "Al-Firdaws", wrong: ["Al-Kawthar", "Adn only", "Illiyyin's gate"], why: "Al-Firdaws is the name of the highest of its levels." },
        { q: "How many levels does Paradise have, per the hadith?", a: "One hundred", wrong: ["Seven", "Ten", "Fifty"], why: "Paradise has one hundred levels and between each level is a distance like the distance between the sky and the earth." }
      ]
    },
    {
      slug: "ask-allah-for-firdaws",
      title: "Ask Allah for Firdaws",
      line: "When you ask Allah, ask for Al-Firdaws, the best of Paradise.",
      facts: ["Aim high in dua", "Rivers flow from it"],
      quote: q20(75),
      source: hadith("bukhari", "2790", "Abu Hurairah", "Sahih", "The Prophet ﷺ said Paradise has a hundred grades, each as far apart as the heaven and the earth. When you ask Allah, ask for Al-Firdaws, the best and highest part of Paradise.", "So, when you ask Allah (for something), ask for Al-firdaus which is the best and highest part of Paradise"),
      difficulty: 4,
      questions: [
        { q: "What should we ask Allah for, in the hadith?", a: "Al-Firdaws", wrong: ["Gold", "Long life only", "A palace on earth"], why: "So, when you ask Allah (for something), ask for Al-firdaus which is the best and highest part of Paradise." },
        { q: "How far apart are two grades, in the hadith?", a: "Like heaven and earth", wrong: ["One step", "A mile", "A day's walk"], why: "The distance between each of two grades is like the distance between the Heaven and the Earth." },
        { q: "What comes from Al-Firdaws, in the hadith?", a: "The rivers of Paradise", wrong: ["The rain", "The sun", "The wind"], why: "And from it originate the rivers of Paradise." }
      ]
    },
    {
      slug: "those-who-purify-themselves",
      title: "Those who purify themselves",
      line: "Gardens of Adn, forever, reward those who purify themselves.",
      facts: ["Rivers flow beneath", "Free from shirk"],
      quote: q20(76),
      source: ik(76, "The Gardens of Adn, with rivers flowing beneath them, are forever. They are the reward of one who keeps himself pure from shirk, worships Allah alone and follows the Messengers.", "This is the person who worships Allah alone"),
      difficulty: 4,
      questions: [
        { q: "What flows under the Gardens of Adn, in 20:76?", a: "Rivers", wrong: ["Fire", "Sand", "Clouds"], why: "Adn Gardens, under which rivers flow, wherein they will abide forever." },
        { q: "How long will they stay, in 20:76?", a: "Forever", wrong: ["A year", "A hundred years", "Until they leave"], why: "Wherein they will abide forever, and such is the reward of those who purify themselves." },
        { q: "Who purifies himself, per Ibn Kathir?", a: "One who worships Allah alone", wrong: ["One who bathes daily", "One who is rich", "One who is strong"], why: "This is the person who worships Allah alone, without ascribing partners to Him." }
      ]
    },
    {
      slug: "a-dry-path-in-the-sea",
      title: "A dry path in the sea",
      line: "Musa struck the sea; it split into a dry path for them.",
      facts: ["Travel by night", "Fir'awn's army drowned"],
      quote: q20(77),
      source: ik(77, "Musa led the Children of Israel out at night. With the sea ahead and Fir'awn behind, Allah told him to strike the sea. It split, the path dried, and Fir'awn's army was covered by the sea.", "Split for me, by the leave of Allah"),
      difficulty: 4,
      questions: [
        { q: "When did Musa leave, in 20:77?", a: "By night", wrong: ["At noon", "On the festival", "After a year"], why: "Travel by night with My servants and strike a dry path for them in the sea." },
        { q: "What did Musa say as he struck the sea?", a: "Split for me, by Allah's leave", wrong: ["Open, O sea", "Fir'awn commands you", "Nothing"], why: "So Musa struck the sea with his stick and he said, Split for me, by the leave of Allah." },
        { q: "What happened to Fir'awn's army, in 20:78?", a: "The sea covered them", wrong: ["They crossed", "They went home", "They believed"], why: "Then Fir'awn pursued them with his hosts, but the sea completely overwhelmed them and covered them up." }
      ]
    },
    {
      slug: "fasting-ashura",
      title: "Fasting Ashura",
      line: "Musa was saved on Ashura, so the Prophet ﷺ fasted that day.",
      facts: ["A day of thanks", "More right to Musa"],
      quote: q20(80),
      source: hadith("bukhari", "2004", "Ibn Abbas", "Sahih", "In Madinah the Prophet ﷺ found the Jews fasting Ashura, the day Allah saved Musa. He said we have more claim to Musa, so he fasted it and told the Muslims to fast.", "We have more claim over Moses than you"),
      difficulty: 4,
      questions: [
        { q: "Why did the Jews fast Ashura, in the hadith?", a: "Allah saved Musa that day", wrong: ["A harvest day", "A king's birthday", "A new moon"], why: "This is a good day, the day on which Allah rescued Bani Israel from their enemy. So, Moses fasted this day." },
        { q: "What did the Prophet ﷺ say?", a: "We have more claim over Musa", wrong: ["Do not fast it", "Fast only once", "It is a normal day"], why: "We have more claim over Moses than you." },
        { q: "The Prophet ﷺ fasted Ashura and told Muslims to fast it.", tf: true, why: "The Prophet ﷺ fasted on that day and ordered the Muslims to fast on that day." }
      ]
    },
    {
      slug: "allah-forgives-who-repents",
      title: "Allah forgives who repents",
      line: "Allah forgives whoever repents, believes and does good.",
      facts: ["Manna and quail", "Never too late"],
      quote: q20(82),
      source: ik(82, "Allah gave the Children of Israel manna and quail and told them not to transgress. Then He promised: whoever turns to Him in repentance, believes and does good, He accepts, whatever the sin.", "I will accept his repentance regardless of whatever sin he did"),
      difficulty: 4,
      questions: [
        { q: "What food came from the sky, in 20:80?", a: "Manna and quail", wrong: ["Bread and milk", "Dates and honey", "Fish and rice"], why: "And We sent down to you manna and quail." },
        { q: "Whom does Allah forgive, in 20:82?", a: "One who repents, believes, does good", wrong: ["Only the rich", "No one", "Only Prophets"], why: "And verily, I am indeed forgiving to him who repents, believes and does righteous deeds, and then Ihtada." },
        { q: "What does Ihtada mean, per Qatadah?", a: "Holding to Islam until death", wrong: ["Travelling far", "Eating well", "Sleeping early"], why: "This means he adheres to Islam until he dies." }
      ]
    },
    {
      slug: "hurrying-to-please-allah",
      title: "Hurrying to please Allah",
      line: "Musa hurried ahead to meet Allah, hoping to please Him more.",
      facts: ["Forty nights", "Harun left in charge"],
      quote: q20(84),
      source: ik(84, "Allah set Musa a meeting of forty nights at the mountain. Musa hurried ahead, leaving Harun in charge, hoping Allah would be even more pleased with him.", "So You will be more pleased with me"),
      difficulty: 4,
      questions: [
        { q: "Why did Musa hasten, in 20:84?", a: "So Allah would be pleased", wrong: ["To escape", "To rest", "To find food"], why: "And I hastened to You, O my Lord, that You might be pleased." },
        { q: "Whom did Musa leave in charge, per Ibn Kathir?", a: "Harun", wrong: ["As-Samiri", "Yusha", "His wife"], why: "Musa made haste to go to the Mountain and he left his brother, Harun, in charge over the Children of Israel." },
        { q: "How many nights was the meeting, per Ibn Kathir?", a: "Forty", wrong: ["Three", "Seven", "Ten"], why: "Allah made a covenant with Musa of thirty nights after which He added to them ten more nights. Thus, they were forty nights in all." }
      ]
    },
    {
      slug: "the-calf-could-not-answer",
      title: "The calf could not answer",
      line: "As-Samiri made a calf; it could not answer, help or harm.",
      facts: ["Musa returned upset", "Only Allah helps"],
      quote: q20(89),
      source: ik(89, "While Musa was away, As-Samiri made a calf from jewellery and people worshipped it. Allah asked: could they not see it gave no answer and had no power to harm or help?", "it does not respond to them when they ask it and when they speak to it"),
      difficulty: 4,
      questions: [
        { q: "Who led them astray, in 20:85?", a: "As-Samiri", wrong: ["Harun", "Fir'awn", "The magicians"], why: "Verily, We have tried your people in your absence, and As-Samiri has led them astray." },
        { q: "How did Musa return, in 20:86?", a: "Angry and sorrowful", wrong: ["Laughing", "Silent and calm", "Sleepy"], why: "Then Musa returned to his people in a state of anger and sorrow." },
        { q: "What could the calf do, in 20:89?", a: "Nothing, not even answer", wrong: ["Speak", "Bring rain", "Heal the sick"], why: "Did they not see that it could not return them a word, and that it had no power either to harm them or to do them good?" }
      ]
    },
    {
      slug: "harun-warned-them",
      title: "Harun warned them",
      line: "Harun warned: this is a test; your Lord is Most Gracious.",
      facts: ["Follow me", "They refused"],
      quote: q20(90),
      source: ik(90, "Harun told the people the calf was only a test, and that their Lord is the Most Gracious, so they should follow him. They refused until Musa came back.", "He told them that their Lord was the Most Beneficent"),
      difficulty: 4,
      questions: [
        { q: "What did Harun call the calf, in 20:90?", a: "A test", wrong: ["A gift", "A god", "A toy"], why: "O my people! You are being tried in this, and verily, your Lord is the Most Gracious." },
        { q: "What did Harun ask them, in 20:90?", a: "Follow me and obey my order", wrong: ["Leave Egypt", "Build a house", "Pray to the calf"], why: "So follow me and obey my order." },
        { q: "Until when would they keep at it, in 20:91?", a: "Until Musa returned", wrong: ["Until noon", "Forever", "Until it rained"], why: "We will not stop worshipping it, until Musa returns to us." }
      ]
    },
    {
      slug: "o-son-of-my-mother",
      title: "O son of my mother",
      line: "Harun softened Musa's anger by calling him son of my mother.",
      facts: ["Gentle words calm anger", "He feared division"],
      quote: q20(94),
      source: ik(94, "Musa, upset, blamed Harun. Harun answered gently, O son of my mother, explaining he feared splitting the people. Naming their mother was the softest way to calm his brother.", "The mentioning of the mother here is more delicate and profound in bringing about gentleness and mildness"),
      difficulty: 5,
      questions: [
        { q: "How did Harun address Musa, in 20:94?", a: "O son of my mother", wrong: ["O king", "O magician", "O stranger"], why: "He said: O son of my mother! Seize me not by my beard, nor by my head!" },
        { q: "What did Harun fear, in 20:94?", a: "Causing division", wrong: ["The sea", "Hunger", "The calf"], why: "Verily, I feared lest you should say: You have caused a division among the Children of Israel." },
        { q: "Why mention the mother, per Ibn Kathir?", a: "To bring gentleness", wrong: ["To complain", "To boast", "She was there"], why: "The mentioning of the mother here is more delicate and profound in bringing about gentleness and mildness." }
      ]
    },
    {
      slug: "your-god-is-only-allah",
      title: "Your god is only Allah",
      line: "The calf was destroyed; your God is only Allah, Who knows all.",
      facts: ["No god but Him", "His knowledge covers all"],
      quote: q20(98),
      source: ik(98, "Musa sent As-Samiri away and said the calf would be burned and scattered in the sea. Then he said: your God is only Allah, none is worthy of worship but Him, and He knows everything.", "Your God is only Allah, the One Whom there is no true God except Him"),
      difficulty: 5,
      questions: [
        { q: "What would happen to the calf, in 20:97?", a: "Burned and scattered in the sea", wrong: ["Kept in a temple", "Given away", "Buried with gold"], why: "We will certainly burn it, and scatter its particles in the sea." },
        { q: "Who is your God, in 20:98?", a: "Only Allah", wrong: ["The calf", "Musa", "Fir'awn"], why: "Your God is only Allah, there is no God but Him." },
        { q: "What does Allah know, in 20:98?", a: "All things", wrong: ["Some things", "Only the past", "Only Egypt"], why: "He has full knowledge of all things." }
      ]
    }
  ]
};

/** Ayahs 99 to 135: the Quran as a reminder, the Day of Resurrection, "My Lord, increase me in knowledge", Adam, and patience with prayer. */
const TAHA_THREE: DeepUnit = {
  key: "taha3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-20",
  name: "Ta-Ha, ayahs 99 to 135",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ta-Ha",
  lessons: [
    {
      slug: "a-reminder-from-us",
      title: "A reminder from Us",
      line: "Allah told the true stories of old and gave the Quran.",
      facts: ["Stories told as they happened", "No Book more complete"],
      quote: q20(99),
      source: ik(99, "Allah told the Prophet ﷺ the story of Musa exactly as it happened, and gave him the Quran as a reminder. No Prophet was given a Book like it or more complete.", "No Prophet was given any Book like it or more complete than it"),
      difficulty: 3,
      questions: [
        { q: "What did Allah give, in 20:99?", a: "A Reminder from Him", wrong: ["A kingdom", "A treasure", "A palace"], why: "Thus We relate to you some information of what happened before. And indeed We have given you from Us a Reminder." },
        { q: "How are the past stories told, per Ibn Kathir?", a: "Just as they happened", wrong: ["Made more exciting", "With parts missing", "As fables"], why: "We relate to you the information of the past just as it happened, without any increase or decrease." },
        { q: "Was any Prophet given a more complete Book, per Ibn Kathir?", a: "No", wrong: ["Yes, many", "Yes, one", "Only Musa"], why: "No Prophet was given any Book like it or more complete than it." }
      ]
    },
    {
      slug: "a-heavy-burden",
      title: "A heavy burden",
      line: "Whoever turns from the Quran carries a heavy burden that Day.",
      facts: ["Hold on to the Quran", "The Quran is for everyone"],
      quote: q20(100),
      source: ik(100, "Whoever denies the Quran and turns from its guidance will carry a burden of sin on the Day of Resurrection. The Quran is a warning to all it reaches.", "Burden here means sin"),
      difficulty: 4,
      questions: [
        { q: "What does burden mean, per Ibn Kathir?", a: "Sin", wrong: ["A bag", "A rock", "Money"], why: "Burden here means sin." },
        { q: "Whom does the Quran warn, per Ibn Kathir?", a: "Everyone it reaches", wrong: ["Only Arabs", "Only kings", "No one"], why: "The Qur'an is a final warning for everyone it reaches." },
        { tf: true, q: "In 20:100 turning away brings a heavy burden.", why: "Whoever turns away from it, verily, they will bear a heavy burden on the Day of Resurrection." }
      ]
    },
    {
      slug: "an-evil-load",
      title: "An evil load",
      line: "They stay under that load; evil is that load on that Day.",
      facts: ["Sins become heavy", "Lighten your load with repentance"],
      quote: q20(101),
      source: ik(101, "Those who turn from the Quran stay under that burden and cannot avoid or escape it. Evil indeed is that load.", "They will not be able to avoid this or escape it"),
      difficulty: 4,
      questions: [
        { q: "How is the load described, in 20:101?", a: "Evil indeed", wrong: ["Light", "Sweet", "Golden"], why: "And evil indeed will it be that load for them on the Day of Resurrection." },
        { q: "Can they escape the load, per Ibn Kathir?", a: "No", wrong: ["Yes", "With money", "By running"], why: "They will not be able to avoid this or escape it." },
        { tf: true, q: "In 20:101 they will abide under it.", why: "They will abide in that." }
      ]
    },
    {
      slug: "the-horn-is-blown",
      title: "The horn is blown",
      line: "On the Day the Sur is blown, the criminals are gathered.",
      facts: ["Trust Allah and prepare", "Say: Allah is enough for us"],
      quote: q20(102),
      source: ik(102, "The Prophet ﷺ said the Sur is a horn that will be blown. He taught us to say: Allah is sufficient for us, and upon Him we rely.", "It is a horn that will be blown into"),
      difficulty: 4,
      questions: [
        { q: "What is the Sur, per Ibn Kathir?", a: "A horn that will be blown", wrong: ["A drum", "A bell", "A flag"], why: "It is a horn that will be blown into." },
        { q: "Which angel blows the Sur, per Ibn Kathir?", a: "Israfil", wrong: ["Jibril", "Mikail", "Malik"], why: "The angel Israfil will blow into it." },
        { q: "What did the Prophet ﷺ teach us to say?", a: "Allah is sufficient for us", wrong: ["I am afraid", "Run away", "It is far"], why: "Say: Allah is sufficient for us and what a good protector He is." }
      ]
    },
    {
      slug: "it-will-feel-like-a-day",
      title: "It will feel like a day",
      line: "When the Horn is blown, life will feel like just a day.",
      facts: ["The Sur is a horn", "This life is short"],
      quote: q20(104),
      source: ik(104, "On the Day the Horn is blown, people will whisper that they stayed only ten days, and the wisest will say just a day. Then everyone will feel how short this life really was.", "on the Day of Judgement they will sense the shortness of the worldly life"),
      difficulty: 3,
      questions: [
        { q: "What is the Sur, per the hadith Ibn Kathir cites?", a: "A horn blown into", wrong: ["A wall", "A book", "A bell tower"], why: "It is a horn that will be blown into." },
        { q: "How long will the wisest say they stayed, in 20:104?", a: "One day", wrong: ["A thousand years", "Ten years", "A century"], why: "When the best among them in knowledge and wisdom will say: You stayed no longer than a day!" },
        { q: "How will they speak, in 20:103?", a: "In a very low voice", wrong: ["Shouting", "Singing", "Not at all"], why: "They will speak in a very low voice to each other: You stayed not longer than ten." }
      ]
    },
    {
      slug: "the-mountains-scattered",
      title: "The mountains scattered",
      line: "Mountains will become dust, and the earth a flat, level plain.",
      facts: ["No hill or valley", "All voices hushed"],
      quote: q20(105),
      source: ik(105, "People asked about the mountains. Allah said He will blast them into dust and leave the earth flat, with no valley or hill. Every voice will be hushed, and only soft footsteps heard.", "on that Day you will not see in the earth any valley, hill, or any place"),
      difficulty: 3,
      questions: [
        { q: "What will happen to the mountains, in 20:105?", a: "Scattered as dust", wrong: ["Grow taller", "Turn to gold", "Stay the same"], why: "Say: My Lord will blast them and scatter them as particles of dust." },
        { q: "What will the earth become, in 20:106?", a: "A level smooth plain", wrong: ["A deep sea", "A forest", "A mountain"], why: "Then He shall leave it as a level smooth plain." },
        { q: "What does Hamsa mean, per Ibn Abbas?", a: "The steps of feet", wrong: ["Thunder", "Loud cries", "Music"], why: "Sa'id bin Jubayr related that Ibn Abbas said: This means the steps of feet." }
      ]
    },
    {
      slug: "intercession-by-his-leave",
      title: "Intercession by His leave",
      line: "No one may intercede on that Day without Allah's permission.",
      facts: ["The Prophet ﷺ will intercede", "Allah knows all"],
      quote: q20(109),
      source: ik(109, "On the Day of Resurrection no one can intercede unless Allah allows it. Ibn Kathir cites the hadith that the Prophet ﷺ will fall in sujud under the Throne, then be told: intercede, and it will be accepted.", "Speak and you will be heard, intercede and your intercession will be accepted"),
      difficulty: 3,
      questions: [
        { q: "Whose intercession helps, in 20:109?", a: "Whom Allah permits", wrong: ["Anyone rich", "Any king", "No one ever"], why: "On that day no intercession shall avail, except the one for whom the Most Gracious has given permission." },
        { q: "Where will the Prophet ﷺ fall in sujud, in the hadith?", a: "Under the Throne", wrong: ["At a river", "On a mountain", "By a gate"], why: "I will come under the Throne and I will fall down into prostration." },
        { q: "Can creatures encompass Allah's knowledge, per 20:110?", a: "No", wrong: ["Yes, all of it", "Yes, if they study", "Only angels can"], why: "He knows what happens to them, and what will happen to them, but they will never encompass anything of His knowledge." }
      ]
    },
    {
      slug: "the-ever-living-the-sustainer",
      title: "The Ever Living, the Sustainer",
      line: "All faces will be humble before the Ever Living, the Sustainer.",
      facts: ["He never dies", "He never sleeps"],
      quote: q20(111),
      source: ik(111, "Every face will be humbled before Allah, the Ever Living Who never dies, the Sustainer Who never sleeps. Everything needs Him and nothing could last without Him.", "the Ever Living, Who does not die, the Sustainer of all, Who does not sleep"),
      difficulty: 4,
      questions: [
        { q: "Before whom will faces be humbled, in 20:111?", a: "The Ever Living, the Sustainer", wrong: ["The kings", "The angels", "The wealthy"], why: "And all faces shall be humbled before the Ever Living, the Sustainer." },
        { q: "What does Al-Hayy never do, per Ibn Kathir?", a: "Die", wrong: ["Hear", "See", "Speak"], why: "The Ever Living, Who does not die, the Sustainer of all, Who does not sleep." },
        { q: "Everything is in need of Allah, per Ibn Kathir.", tf: true, why: "He is the One Whom everything is in need of and whom nothing could survive without." }
      ]
    },
    {
      slug: "beware-of-wrongdoing",
      title: "Beware of wrongdoing",
      line: "Wronging others becomes darkness on the Day of Resurrection.",
      facts: ["Every right is returned", "Treat others fairly"],
      quote: q20(111),
      source: hadith("muslim", "2578", "Jabir ibn Abdullah", "Sahih", "The Messenger of Allah ﷺ said: beware of wronging others, for wrongdoing will be darkness on the Day of Resurrection.", "Be on your guard against committing oppression, for oppression is a darkness on the Day of Resurrection"),
      difficulty: 4,
      questions: [
        { q: "What will wrongdoing become, in the hadith?", a: "Darkness on that Day", wrong: ["Light", "Gold", "Nothing"], why: "Be on your guard against committing oppression, for oppression is a darkness on the Day of Resurrection." },
        { q: "Who is a failure, in 20:111?", a: "One who carried wrongdoing", wrong: ["One who was poor", "One who was ill", "One who was weak"], why: "And he who carried wrongdoing, will be indeed a complete failure." },
        { q: "What else does the hadith warn against?", a: "Stinginess", wrong: ["Sleeping", "Smiling", "Travelling"], why: "And be on your guard against stinginess." }
      ]
    },
    {
      slug: "no-fear-of-injustice",
      title: "No fear of injustice",
      line: "A believer who does good will never be wronged or shortchanged.",
      facts: ["No extra sins added", "No good deed lost"],
      quote: q20(112),
      source: ik(112, "Whoever does good while believing need not fear injustice. Ibn Abbas and others said their bad deeds will not be increased and their good deeds will not be reduced.", "their evils will not be increased and their good deeds will not be decreased"),
      difficulty: 4,
      questions: [
        { q: "What need the good believer not fear, in 20:112?", a: "Injustice or curtailment", wrong: ["Rain", "Hunger", "Old age"], why: "Then he will have no fear of injustice, nor of any curtailment." },
        { q: "Will their good deeds be reduced, per Ibn Kathir?", a: "No, never", wrong: ["Yes, by half", "Some of them", "Only small ones"], why: "This means that their evils will not be increased and their good deeds will not be decreased." },
        { q: "What does Hadm mean, per Ibn Kathir?", a: "A decrease", wrong: ["An increase", "A gift", "A road"], why: "Zulm means an increase that comes from the sins of others being placed upon the person, and Hadm means a decrease." }
      ]
    },
    {
      slug: "a-quran-in-arabic",
      title: "A Quran in Arabic",
      line: "The Quran came in clear Arabic so people may have taqwa.",
      facts: ["Clear and eloquent", "Allah is the True King"],
      quote: q20(113),
      source: ik(113, "Allah sent the Quran in clear, eloquent Arabic, explaining its warnings so people would leave sins and do good. High above all is Allah, the True King, and everything from Him is true.", "a warner in the clear and eloquent Arabic language"),
      difficulty: 4,
      questions: [
        { q: "In which language was the Quran sent, in 20:113?", a: "Arabic", wrong: ["Persian", "Greek", "Hebrew"], why: "And thus We have sent it down as a Quran in Arabic." },
        { q: "Why were the warnings explained, in 20:113?", a: "So they may have taqwa", wrong: ["To scare them away", "For poetry", "For trade"], why: "And have explained therein in detail the warnings, in order that they may have Taqwa." },
        { q: "How is Allah described, in 20:114?", a: "The True King", wrong: ["A distant king", "One of many", "A sleeping king"], why: "Then High above all be Allah, the True King." }
      ]
    },
    {
      slug: "increase-me-in-knowledge",
      title: "Increase me in knowledge",
      line: "The Prophet ﷺ was taught: My Lord, increase me in knowledge.",
      facts: ["A dua for learners", "Listen first, then recite"],
      quote: q20(114),
      source: ik(114, "The Prophet ﷺ was told not to rush reciting before Jibril finished, but to listen, and to pray: my Lord, increase me in knowledge. He kept growing in knowledge all his life.", "Give me more knowledge from You"),
      difficulty: 4,
      questions: [
        { q: "What dua is taught, in 20:114?", a: "My Lord! Increase me in knowledge", wrong: ["Give me gold", "Make me famous", "Give me a palace"], why: "And say: My Lord! Increase me in knowledge." },
        { q: "What was the Prophet ﷺ told not to do, in 20:114?", a: "Rush before revelation ended", wrong: ["Sleep", "Travel", "Smile"], why: "And be not in haste with the Quran before its revelation is completed to you." },
        { q: "When did he ﷺ stop increasing in knowledge, per Ibn Uyaynah?", a: "Only when he passed away", wrong: ["At forty", "After Hijrah", "After Badr"], why: "The Prophet ﷺ did not cease increasing in knowledge until Allah took him." }
      ]
    },
    {
      slug: "do-not-rush-the-revelation",
      title: "Do not rush the revelation",
      line: "The Prophet ﷺ hurried to recite; Allah promised to gather it.",
      facts: ["Allah kept it in his heart", "Listen, then follow"],
      quote: q20(114),
      source: hadith("bukhari", "5", "Ibn Abbas", "Sahih", "Ibn Abbas said the Messenger of Allah ﷺ would move his lips quickly with the revelation, so Allah revealed: move not your tongue to hasten it; it is for Us to gather it and let you recite it.", "Move not your tongue concerning (the Quran) to make haste therewith"),
      difficulty: 4,
      questions: [
        { q: "What did the Prophet ﷺ do with his lips, in the hadith?", a: "Moved them quickly", wrong: ["Kept them closed", "Whistled", "Covered them"], why: "Allah's Messenger used to bear the revelation with great trouble and used to move his lips quickly with the Inspiration." },
        { q: "Who would gather the Quran in his heart?", a: "Allah", wrong: ["Jibril alone", "The scribes", "His friends"], why: "It is for Us to collect it and to give you the ability to recite it." },
        { q: "Ibn Abbas showed how the lips moved by moving his own.", tf: true, why: "Ibn Abbas moved his lips saying, I am moving my lips in front of you as Allah's Messenger used to move his." }
      ]
    },
    {
      slug: "adam-forgot",
      title: "Adam forgot",
      line: "Adam was given a promise but forgot; Iblis refused to bow.",
      facts: ["Insan and forgetting", "Iblis was proud"],
      quote: q20(115),
      source: ik(115, "Allah took a promise from Adam, but he forgot it. Ibn Abbas said a person is called Insan because he forgot. The angels bowed to honour Adam, but Iblis refused out of pride.", "man was named Insan only because he was given a covenant, but he forgot it"),
      difficulty: 4,
      questions: [
        { q: "What happened to Adam's promise, in 20:115?", a: "He forgot it", wrong: ["He sold it", "He wrote it", "He hid it"], why: "And indeed We made a covenant with Adam before, but he forgot." },
        { q: "Why is man called Insan, per Ibn Abbas?", a: "He forgot his covenant", wrong: ["He is tall", "He is strong", "He speaks"], why: "Verily, man was named Insan only because he was given a covenant, but he forgot it." },
        { q: "Who refused to prostrate, in 20:116?", a: "Iblis", wrong: ["Jibril", "Mika'il", "All the angels"], why: "They prostrated themselves all except Iblis; he refused." }
      ]
    },
    {
      slug: "a-life-of-ease-in-paradise",
      title: "A life of ease in Paradise",
      line: "In Paradise Adam had no hunger, thirst or burning sun.",
      facts: ["Iblis is an enemy", "No burdens there"],
      quote: q20(119),
      source: ik(117, "Allah warned Adam that Iblis was an enemy to him and his wife. In Paradise they had no hunger, no thirst and no burning sun, a life with no burdens and no hardship.", "But here, in Paradise, you live a life of ease with no burdens and no difficulties"),
      difficulty: 4,
      questions: [
        { q: "What did Allah call Iblis, in 20:117?", a: "An enemy to Adam and his wife", wrong: ["A friend", "A teacher", "A guard"], why: "O Adam! Verily, this is an enemy to you and to your wife." },
        { q: "What would they not suffer, in 20:119?", a: "Thirst or the sun's heat", wrong: ["Joy", "Rest", "Peace"], why: "And you will suffer not from thirst therein nor from the sun's heat." },
        { q: "What was life in Paradise like, per Ibn Kathir?", a: "Ease with no burdens", wrong: ["Hard work", "Long journeys", "Many worries"], why: "But here, in Paradise, you live a life of ease with no burdens and no difficulties." }
      ]
    },
    {
      slug: "the-tree-and-the-trick",
      title: "The tree and the trick",
      line: "Shaytan tricked Adam with a false promise of forever.",
      facts: ["A lie about forever", "Shaytan deceives"],
      quote: q20(120),
      source: ik(120, "Shaytan whispered to Adam, offering a tree of eternity and a kingdom that never ends. He swore he was a sincere adviser, and so led them both into the slip by deception.", "he caused them to fall through deception"),
      difficulty: 4,
      questions: [
        { q: "What did Shaytan offer Adam, in 20:120?", a: "The Tree of Eternity", wrong: ["A river", "A crown of gold", "Wings"], why: "O Adam! Shall I lead you to the Tree of Eternity and to a kingdom that will never waste away?" },
        { q: "How did Shaytan make them slip, per Ibn Kathir?", a: "Through deception", wrong: ["By force", "By a storm", "By hunger"], why: "It has already been mentioned that he caused them to fall through deception." },
        { q: "What did Shaytan swear, in 7:21?", a: "That he was a sincere adviser", wrong: ["That he was an angel", "That he was a king", "That he would leave"], why: "And he swore by Allah to them both: Verily, I am one of the sincere well-wishers for you both." }
      ]
    },
    {
      slug: "allah-chose-and-forgave-adam",
      title: "Allah chose and forgave Adam",
      line: "Adam slipped, then Allah chose him, forgave him and guided him.",
      facts: ["Repentance accepted", "Guidance after a mistake"],
      quote: q20(122),
      source: ik(122, "Adam and his wife ate from the tree and slipped. Then Allah chose Adam, turned to him with forgiveness and guided him. A slip followed by repentance can bring a person closer to Allah.", "Then his Lord chose him, and turned to him with forgiveness, and gave him guidance"),
      difficulty: 5,
      questions: [
        { q: "What did Allah do after Adam slipped, in 20:122?", a: "Chose and forgave him", wrong: ["Forgot him", "Left him alone", "Made him an angel"], why: "Then his Lord chose him, and turned to him with forgiveness, and gave him guidance." },
        { q: "What did they cover themselves with, in 20:121?", a: "Leaves of Paradise", wrong: ["Silk", "Wool", "Sand"], why: "And they began to cover themselves with the leaves of the Paradise for their covering." },
        { q: "Allah gave Adam guidance after forgiving him, per 20:122.", tf: true, why: "Then his Lord chose him, and turned to him with forgiveness, and gave him guidance." }
      ]
    },
    {
      slug: "whoever-follows-my-guidance",
      title: "Whoever follows My guidance",
      line: "Whoever follows Allah's guidance is neither lost nor distressed.",
      facts: ["Guidance came through Prophets", "Calm in both lives"],
      quote: q20(123),
      source: ik(123, "Allah sent Adam and his children down to earth and promised guidance through the Prophets. Ibn Abbas said whoever follows it will not be misguided here or distressed in the Hereafter.", "He will not be misguided in this life and he will not be distressed in the Hereafter"),
      difficulty: 5,
      questions: [
        { q: "What happens to one who follows the guidance, in 20:123?", a: "Neither astray nor distressed", wrong: ["Gets rich", "Never works", "Becomes a king"], why: "Then whoever follows My guidance he shall neither go astray nor shall be distressed." },
        { q: "What is the guidance, per Abu Al-Aliyah?", a: "Prophets, Messengers and evidence", wrong: ["Stars", "Dreams", "Old songs"], why: "This guidance means the Prophets, the Messengers and the evidence." },
        { q: "Where will the follower not be distressed, per Ibn Abbas?", a: "In the Hereafter", wrong: ["Only in the market", "Only at home", "Only at sea"], why: "He will not be misguided in this life and he will not be distressed in the Hereafter." }
      ]
    },
    {
      slug: "a-restless-heart",
      title: "A restless heart",
      line: "Turning from Allah's reminder leaves the heart restless.",
      facts: ["Comfort is not happiness", "Peace comes from guidance"],
      quote: q20(124),
      source: ik(124, "Whoever turns away from Allah's reminder has a hard life. Even if he eats and wears whatever he likes, his heart has no certainty or calm, only worry and doubt.", "his heart will not have pure certainty and guidance"),
      difficulty: 5,
      questions: [
        { q: "What life does one who turns away have, in 20:124?", a: "A life of hardship", wrong: ["A life of ease", "A long holiday", "A royal life"], why: "But whosoever turns away from My Reminder, verily, for him is a life of hardship." },
        { q: "Can he be unhappy even with comforts, per Ibn Kathir?", a: "Yes, his heart is restless", wrong: ["No, never", "Only if poor", "Only when ill"], why: "Even if he appears to be in comfort outwardly and he wears whatever he likes, eats whatever he likes and lives wherever he wants, he will not be happy." },
        { q: "What is missing from his heart, per Ibn Kathir?", a: "Certainty and guidance", wrong: ["Blood", "Strength", "Music"], why: "For verily, his heart will not have pure certainty and guidance." }
      ]
    },
    {
      slug: "raised-blind",
      title: "Why raised blind?",
      line: "He asks why he is raised blind, though he once could see.",
      facts: ["Keep the Quran in your life", "Deeds are repaid in kind"],
      quote: q20(125),
      source: ik(125, "The one who turned from Allah's Reminder asks why he is raised blind when he could see in this world.", "This means in the life of this world"),
      difficulty: 4,
      questions: [
        { q: "What does he ask Allah, in 20:125?", a: "Why have You raised me blind?", wrong: ["Where is my gold?", "Who are you?", "Can I sleep?"], why: "O my Lord! Why have you raised me up blind, while I had sight (before)." },
        { q: "When did he have sight, per Ibn Kathir?", a: "In the life of this world", wrong: ["In Paradise", "In the grave", "Never"], why: "This means in the life of this world." },
        { q: "What does raised blind mean, per Mujahid?", a: "He will have no proof", wrong: ["He will sleep", "He will be rich", "He will fly"], why: "Mujahid, Abu Salih and As-Suddi said: This means he will have no proof." }
      ]
    },
    {
      slug: "neglected-that-day",
      title: "Neglected that Day",
      line: "He neglected Allah's signs, so that Day he is neglected.",
      facts: ["Do not ignore the Quran", "The reward fits the deed"],
      quote: q20(126),
      source: ik(126, "Since he turned from Allah's signs as if he never knew them, he is treated that Day as one forgotten. Forgetting words while living by the Quran is not this threat.", "the punishment will be a retribution that is based upon the type of deed that was done"),
      difficulty: 4,
      questions: [
        { q: "Why is he neglected, in 20:126?", a: "He disregarded Allah's Ayat", wrong: ["He was poor", "He was ill", "He traveled"], why: "Like this Our Ayat came unto you, but you disregarded them." },
        { q: "How is the punishment matched, per Ibn Kathir?", a: "To the type of deed", wrong: ["By chance", "By wealth", "By age"], why: "The punishment will be a retribution that is based upon the type of deed that was done." },
        { tf: false, q: "Ibn Kathir says forgetting words while living the Quran is this threat.", why: "Forgetting the words of the Qur'an, while understanding its meaning and acting upon its legislation, is not included." }
      ]
    },
    {
      slug: "more-severe-and-lasting",
      title: "More severe and lasting",
      line: "The Hereafter's punishment is harder and longer than this one.",
      facts: ["This world is small", "Fear Allah in secret"],
      quote: q20(127),
      source: ik(127, "Allah repays those who go beyond bounds and deny His signs. The punishment of the Hereafter is far harder and more lasting than this world's.", "a more grievous and more painful penalty than of this world"),
      difficulty: 4,
      questions: [
        { q: "How is the Hereafter's torment, in 20:127?", a: "More severe and more lasting", wrong: ["Shorter", "Lighter", "The same"], why: "And the torment of the Hereafter is far more severe and more lasting." },
        { q: "Whom does Allah requite, in 20:127?", a: "Him who transgresses bounds", wrong: ["Him who prays", "Him who gives", "Him who fasts"], why: "And thus do We requite him who transgresses beyond bounds." },
        { tf: true, q: "Ibn Kathir says this world's punishment is smaller.", why: "Verily, the torment of this worldly life is more insignificant, compared to the punishment of the Hereafter." }
      ]
    },
    {
      slug: "empty-homes-are-a-lesson",
      title: "Empty homes are a lesson",
      line: "People walk in the homes of ruined nations; that is a sign.",
      facts: ["History teaches", "Use your mind and heart"],
      quote: q20(128),
      source: ik(128, "Allah destroyed nations that denied the Messengers. Their empty homes, now lived in by others, are signs for those with understanding.", "This is witnessed by the empty homes that these people left behind"),
      difficulty: 4,
      questions: [
        { q: "Where do they walk, in 20:128?", a: "In the homes of ruined nations", wrong: ["In Paradise", "On the sea", "In the sky"], why: "How many generations We have destroyed before them in whose dwellings they walk about?" },
        { q: "What witnesses this, per Ibn Kathir?", a: "The empty homes left behind", wrong: ["The stars", "The rivers", "The birds"], why: "This is witnessed by the empty homes that these people left behind." },
        { q: "Who benefit from these signs, per Ibn Kathir?", a: "People of sound understanding", wrong: ["The careless", "The proud", "No one"], why: "This means those who have sound intellect and correct understanding." }
      ]
    },
    {
      slug: "be-patient-and-glorify",
      title: "Be patient and glorify",
      line: "Be patient, and praise Allah before sunrise and before sunset.",
      facts: ["Fajr and Asr", "Night prayer too"],
      quote: q20(130),
      source: ik(130, "Allah comforted the Prophet ﷺ: be patient with what they say, and praise your Lord before sunrise, which is Fajr, before sunset, which is Asr, and in hours of the night.", "Be patient concerning their rejection of you"),
      difficulty: 5,
      questions: [
        { q: "What was the Prophet ﷺ told to be, in 20:130?", a: "Patient", wrong: ["Angry", "Silent forever", "Afraid"], why: "So bear patiently what they say." },
        { q: "Which prayer is before sunrise, per Ibn Kathir?", a: "Fajr", wrong: ["Asr", "Maghrib", "Isha"], why: "And glorify the praises of your Lord before the rising of the sun. This is speaking of the Morning (Fajr) prayer." },
        { q: "Which prayer is before sunset, per Ibn Kathir?", a: "Asr", wrong: ["Fajr", "Dhuhr", "Isha"], why: "And before its setting. This is speaking of the Mid-afternoon (Asr) prayer." }
      ]
    },
    {
      slug: "like-seeing-the-full-moon",
      title: "Like seeing the full moon",
      line: "Believers will see their Lord, so guard Fajr and Asr prayers.",
      facts: ["The full moon", "Do not miss them"],
      quote: q20(130),
      source: hadith("bukhari", "554", "Jarir ibn Abdullah", "Sahih", "Looking at the full moon, the Prophet ﷺ said: you will see your Lord as you see this moon. So if you can, do not miss the prayer before sunrise and before sunset.", "Certainly you will see your Lord as you see this moon"),
      difficulty: 5,
      questions: [
        { q: "What did the Prophet ﷺ look at, in the hadith?", a: "The full moon", wrong: ["The sun", "A star", "The sea"], why: "We were with the Prophet ﷺ and he looked at the moon, full-moon." },
        { q: "Which two prayers did he ﷺ say not to miss?", a: "Before sunrise and sunset", wrong: ["Only Isha", "Only Dhuhr", "Only Eid"], why: "So if you can avoid missing a prayer before the sunrise (Fajr) and a prayer before sunset (Asr), you must do so." },
        { q: "Believers will have trouble seeing their Lord, in the hadith.", tf: false, why: "Certainly you will see your Lord as you see this moon and you will have no trouble in seeing Him." }
      ]
    },
    {
      slug: "never-angry-again",
      title: "Never angry again",
      line: "In Paradise, Allah grants His pleasure and is never angry again.",
      facts: ["That you may be pleased", "The best gift"],
      quote: q20(130),
      source: hadith("bukhari", "6549", "Abu Sa'id al-Khudri", "Sahih", "Allah will ask the people of Paradise if they are pleased. They will say yes. He will say He has better: He will grant them His pleasure and never be angry with them again.", "I will bestow My pleasure and contentment upon you so that I will never be angry with you"),
      difficulty: 5,
      questions: [
        { q: "What will Allah ask the people of Paradise?", a: "Are you pleased?", wrong: ["Are you tired?", "Are you hungry?", "Where are you?"], why: "Allah will say, Are you pleased?" },
        { q: "What is better than all they were given?", a: "Allah's lasting pleasure", wrong: ["More gold", "A bigger river", "More trees"], why: "I will bestow My pleasure and contentment upon you so that I will never be angry with you after forever." },
        { q: "Why does Ibn Kathir link it to 20:130?", a: "It says: that you may be pleased", wrong: ["It names the moon", "It mentions gold", "It names a river"], why: "That you may become pleased with the reward which Allah shall give you." }
      ]
    },
    {
      slug: "do-not-long-for-their-glitter",
      title: "Do not long for their glitter",
      line: "Do not envy others' riches; Allah's provision is better.",
      facts: ["Riches are a test", "Be thankful"],
      quote: q20(131),
      source: ik(131, "Do not long for the luxury others enjoy. It is a short-lived glitter used to test them. What your Lord provides, in this life and the next, is better and lasts longer.", "it is only short-lived splendor and a feeble bounty"),
      difficulty: 5,
      questions: [
        { q: "What should we not strain our eyes toward, in 20:131?", a: "Others' worldly splendour", wrong: ["The Quran", "The sky", "Our parents"], why: "And strain not your eyes in longing for the things We have given for enjoyment to various groups of them, the splendor of the life of this world." },
        { q: "Why are they given it, in 20:131?", a: "To test them", wrong: ["To reward them", "By accident", "To share it"], why: "That We may test them thereby." },
        { q: "What is better and more lasting, in 20:131?", a: "Your Lord's provision", wrong: ["Their palaces", "Their gold", "Their fame"], why: "But the provision of your Lord is better and more lasting." }
      ]
    },
    {
      slug: "prayer-for-your-family",
      title: "Prayer for your family",
      line: "Tell your family to pray, be patient in it; Allah provides.",
      facts: ["Umar woke his family", "Taqwa has the good end"],
      quote: q20(132),
      source: ik(132, "Allah said to tell your family to pray and keep at it yourself. Umar would wake his family at night for prayer and recite this ayah. Allah provides for us, and the good end is for the God-fearing.", "When he would awaken, he would make his family get up as well"),
      difficulty: 5,
      questions: [
        { q: "Whom should we enjoin prayer on, in 20:132?", a: "Our family", wrong: ["Only strangers", "No one", "Only kings"], why: "And enjoin Salah on your family, and be patient in offering them." },
        { q: "Who provides, in 20:132?", a: "Allah provides for us", wrong: ["We provide for Allah", "Kings provide", "No one"], why: "We ask not of you a provision: We provide for you." },
        { q: "Whom did Umar wake for night prayer, per Ibn Kathir?", a: "His family", wrong: ["His neighbours", "The army", "The market"], why: "When he would awaken, he would make his family get up as well." }
      ]
    },
    {
      slug: "the-quran-is-the-sign",
      title: "The Quran is the sign",
      line: "They asked for a sign; the Quran is the greatest sign.",
      facts: ["Every Prophet had signs", "Ours is revelation"],
      quote: q20(133),
      source: hadith("bukhari", "4981", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said every Prophet was given miracles that made people believe, but what he was given is revelation from Allah, so he hoped to have the most followers.", "what I have been given, is Divine Inspiration which Allah has revealed to me"),
      difficulty: 5,
      questions: [
        { q: "What did the deniers ask for, in 20:133?", a: "A sign from his Lord", wrong: ["Gold", "A king", "Rain"], why: "And they say: Why does he not bring us a sign from his Lord?" },
        { q: "What was the Prophet ﷺ given, in the hadith?", a: "Divine revelation", wrong: ["A staff", "A ship", "A camel only"], why: "What I have been given, is Divine Inspiration which Allah has revealed to me." },
        { q: "What did the Prophet ﷺ hope for, in the hadith?", a: "The most followers", wrong: ["The most gold", "A long life", "A big house"], why: "So I hope that my followers will outnumber the followers of the other Prophets on the Day of Resurrection." }
      ]
    },
    {
      slug: "who-is-on-the-straight-path",
      title: "Who is on the straight path",
      line: "Ta-Ha ends: wait, and you will know who is truly guided.",
      facts: ["As-Sirat As-Sawi", "Truth becomes clear"],
      quote: q20(135),
      source: ik(135, "The surah ends by telling the deniers: everyone is waiting, so wait. You will come to know who is on the straight road, and who is truly guided.", "This means the straight road"),
      difficulty: 5,
      questions: [
        { q: "What did the Prophet ﷺ tell them, in 20:135?", a: "Each one is waiting, so wait", wrong: ["Go away", "Pay a tax", "Build a wall"], why: "Say: Each one is waiting, so wait you too." },
        { q: "What does As-Sirat As-Sawi mean, per Ibn Kathir?", a: "The straight road", wrong: ["A bridge", "A river", "A mountain"], why: "This means the straight road." },
        { q: "Would they have asked for a Messenger if punished first, per 20:134?", a: "Yes", wrong: ["No", "Only some", "They stayed silent"], why: "Our Lord! If only You had sent us a Messenger, we should certainly have followed Your Ayat." }
      ]
    }
  ]
};

export const TAHA_UNITS: readonly DeepUnit[] = [TAHA_ONE, TAHA_TWO, TAHA_THREE];
