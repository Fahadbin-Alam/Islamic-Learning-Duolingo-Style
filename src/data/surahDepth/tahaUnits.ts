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

export const TAHA_UNITS: readonly DeepUnit[] = [TAHA_ONE, TAHA_TWO];
