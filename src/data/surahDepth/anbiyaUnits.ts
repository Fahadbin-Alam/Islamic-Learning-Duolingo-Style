import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Al-Anbiya ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Anbiya 21:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_21_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Anbiya 21:${ayah}`,
    url: `https://quran.com/21:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 21:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}


const q21 = (ayah: number) => quranQuote(21, ayah);

/** Ayahs 1 to 35: the reckoning draws near, Messengers were human, nothing was made for play, and every soul tastes death. */
const ANBIYA_ONE: DeepUnit = {
  key: "anbiya1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-21",
  name: "Al-Anbiya, ayahs 1 to 35",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Anbiya",
  lessons: [
    {
      slug: "the-reckoning-draws-near",
      title: "The reckoning draws near",
      line: "The reckoning is near, yet many people are busy and careless.",
      facts: ["The Hour is close", "Prepare for it now"],
      quote: q21(1),
      source: ik(1, "The surah opens with a warning: the Day of Reckoning is coming close, yet people turn away, not working for it or getting ready for it.", "This is a warning from Allah of the approach of the Hour, and that people are heedless of it"),
      difficulty: 2,
      questions: [
        { q: "What draws near for mankind, in 21:1?", a: "Their reckoning", wrong: ["A storm", "A feast", "A king"], why: "Draws near for mankind their reckoning, while they turn away in heedlessness." },
        { q: "What are people doing, in 21:1?", a: "Turning away in heedlessness", wrong: ["Preparing well", "Praying all night", "Waiting eagerly"], why: "While they turn away in heedlessness." },
        { q: "What does heedless mean, per Ibn Kathir?", a: "Not preparing for the Hour", wrong: ["Very busy praying", "Asleep at night", "Travelling far"], why: "They are not working for it or preparing for it." }
      ]
    },
    {
      slug: "ibn-masuds-treasure",
      title: "Ibn Mas'ud's treasure",
      line: "Ibn Mas'ud called Al-Anbiya one of his oldest treasures.",
      facts: ["Among the earliest surahs", "Learned by heart early"],
      quote: q21(1),
      source: hadith("bukhari", "4994", "Abdullah ibn Mas'ud", "Sahih", "Ibn Mas'ud named Bani Isra'il, Al-Kahf, Maryam, Ta-Ha and Al-Anbiya as among the first surahs he learned, his old treasure.", "are amongst my first earnings and my old property"),
      difficulty: 2,
      questions: [
        { q: "Who called these surahs his old property?", a: "Abdullah ibn Mas'ud", wrong: ["Abu Bakr", "Umar", "Ali"], why: "Narrated Abdullah bin Mas'ud: Surat Bani-Israel, Al-Kahf, Maryam, Taha, Al-Anbiya are amongst my first earnings and my old property." },
        { q: "Which surah is NOT in his list?", a: "Al-Baqarah", wrong: ["Al-Kahf", "Maryam", "Ta-Ha"], why: "Surat Bani-Israel, Al-Kahf, Maryam, Taha, Al-Anbiya are amongst my first earnings and my old property." },
        { q: "Al-Anbiya is among the surahs Ibn Mas'ud learned early.", tf: true, why: "Al-Anbiya are amongst my first earnings and my old property." }
      ]
    },
    {
      slug: "listening-while-they-play",
      title: "Listening while they play",
      line: "They heard new revelation while playing, hearts elsewhere.",
      facts: ["The Quran is fresh", "Hearts distracted"],
      quote: q21(2),
      source: ik(2, "Each new piece of revelation reached them, yet they listened as if it were a game, hearts busy with other things. Ibn Abbas reminded people that their Book is the newest from Allah, pure and unchanged.", "your Book is the most recently revealed from Allah, and you read it pure and unadulterated"),
      difficulty: 2,
      questions: [
        { q: "How did they listen, in 21:2?", a: "While they played", wrong: ["With tears", "In silence", "Writing it down"], why: "Comes not unto them an admonition from their Lord as a recent revelation but they listen to it while they play." },
        { q: "What were their hearts, in 21:3?", a: "Occupied", wrong: ["Calm", "Open", "Thankful"], why: "With their hearts occupied." },
        { q: "How did Ibn Abbas describe our Book?", a: "Newest and unchanged", wrong: ["Oldest of all", "Hard to find", "Only for scholars"], why: "Your Book is the most recently revealed from Allah, and you read it pure and unadulterated." }
      ]
    },
    {
      slug: "he-hears-and-knows",
      title: "He hears and knows",
      line: "Whatever is said in the heavens and earth, Allah knows it.",
      facts: ["Nothing is hidden", "They called it magic"],
      quote: q21(4),
      source: ik(4, "The deniers whispered that the Prophet ﷺ was only a man and his message was magic. He answered: my Lord knows all that is said in the heavens and the earth.", "Nothing at all is hidden from the One Who knows that"),
      difficulty: 2,
      questions: [
        { q: "What did the wrongdoers whisper, in 21:3?", a: "He is only a human", wrong: ["He is an angel", "He is a king", "He is rich"], why: "Is this more than a human being like you? Will you submit to magic while you see it?" },
        { q: "What does Allah know, in 21:4?", a: "All said in heaven and earth", wrong: ["Only loud words", "Only Arabic", "Only the past"], why: "My Lord knows what is said in the heavens and on earth. And He is the All-Hearer, the All-Knower." },
        { q: "What did they call the Quran, in 21:5?", a: "Mixed-up dreams", wrong: ["A history book", "A song of praise", "A law code"], why: "Nay, they say: These are mixed up false dreams! Nay, he has invented it! Nay, he is a poet!" }
      ]
    },
    {
      slug: "messengers-were-human",
      title: "Messengers were human",
      line: "Every Messenger was a human who ate food and passed away.",
      facts: ["Not angels", "Ask people of knowledge"],
      quote: q21(7),
      source: ik(7, "All Messengers before were men, not angels. They ate, walked in markets and later died. Allah sent them from among the people so others could learn from them.", "He sent to them Messengers from among themselves so that they could receive the Message from them and learn from them"),
      difficulty: 3,
      questions: [
        { q: "Whom did Allah send before, in 21:7?", a: "Men He revealed to", wrong: ["Only angels", "Only kings", "Jinn"], why: "And We sent not before you but men to whom We revealed." },
        { q: "Whom should you ask if you do not know, in 21:7?", a: "The people of the Reminder", wrong: ["Fortune tellers", "Anyone nearby", "No one"], why: "So ask the people of the Reminder if you do not know." },
        { q: "Did the Messengers eat food, in 21:8?", a: "Yes, they ate food", wrong: ["No, never", "Only fruit", "Only on Eid"], why: "And We did not place them in bodies that did not eat food, nor were they immortals." }
      ]
    },
    {
      slug: "a-book-of-honour",
      title: "A book of honour",
      line: "The Quran brings honour to those who hold on to it.",
      facts: ["Dhikrukum means your honour", "Will you not understand?"],
      quote: q21(10),
      source: ik(10, "Allah reminds them of the Quran's high status: it is a Book with their honour in it. Ibn Abbas explained Dhikrukum as honour for you, so they should value and accept it.", "Honor for you"),
      difficulty: 3,
      questions: [
        { q: "What did Allah send down, in 21:10?", a: "A Book with your honour", wrong: ["A golden tablet", "A sword", "A crown"], why: "Indeed, We have sent down for you a Book in which there is Dhikrukum." },
        { q: "What does Dhikrukum mean, per Ibn Abbas?", a: "Honour for you", wrong: ["Your wealth", "Your house", "Your food"], why: "Ibn Abbas said: Honor for you." },
        { q: "What does 21:10 ask at the end?", a: "Will you not understand?", wrong: ["Will you not eat?", "Will you not sleep?", "Will you not travel?"], why: "Will you not then understand?" }
      ]
    },
    {
      slug: "not-created-for-play",
      title: "Not created for play",
      line: "Allah did not create the heavens and earth as a game.",
      facts: ["Created with wisdom", "Good is rewarded"],
      quote: q21(16),
      source: ik(16, "Allah created the heavens, the earth and all between them with truth and justice, not for play, so that the good are rewarded and wrongdoing is answered for.", "He created the heavens and the earth in truth"),
      difficulty: 3,
      questions: [
        { q: "Why were the heavens not created, in 21:16?", a: "For play", wrong: ["For a reason", "With wisdom", "With justice"], why: "We created not the heavens and the earth and all that is between them for play." },
        { q: "How were they created, per Ibn Kathir?", a: "In truth, with justice", wrong: ["By chance", "As a joke", "For no reason"], why: "Allah tells us that He created the heavens and the earth in truth, with justice." },
        { q: "Allah created the world without any purpose, per 21:16.", tf: false, why: "We created not the heavens and the earth and all that is between them for play." }
      ]
    },
    {
      slug: "truth-defeats-falsehood",
      title: "Truth defeats falsehood",
      line: "Allah hurls truth at falsehood, and falsehood vanishes.",
      facts: ["Truth is strong", "Falsehood fades"],
      quote: q21(18),
      source: ik(18, "Allah throws the truth against falsehood, and it breaks it and it disappears. Ibn Kathir says this means Allah makes the truth clear, and so falsehood is beaten.", "We explain the truth and thus defeat falsehood"),
      difficulty: 3,
      questions: [
        { q: "What does Allah fling against falsehood, in 21:18?", a: "The truth", wrong: ["A rock", "Fire", "Wind"], why: "Nay, We fling the truth against the falsehood, so it destroys it, and behold, it disappears." },
        { q: "What happens to falsehood, in 21:18?", a: "It disappears", wrong: ["It grows", "It wins", "It hides"], why: "So it destroys it, and behold, it disappears." },
        { q: "How is falsehood beaten, per Ibn Kathir?", a: "By explaining the truth", wrong: ["By shouting", "By force", "By ignoring it"], why: "We explain the truth and thus defeat falsehood." }
      ]
    },
    {
      slug: "every-doubt-has-an-answer",
      title: "Every doubt has an answer",
      line: "For every false doubt, Allah's proofs hold a clear answer.",
      facts: ["As-Sa'di explains", "Proofs of the truth"],
      quote: q21(18),
      source: saadi(21, 18, "As-Sa'di says Allah has taken it on Himself to make the truth win: no one brings a doubt, from reason or from texts, to support falsehood or reject the truth, except that Allah's proofs hold what crushes it, and he says this is true for every religious question, one by one.", "وهذا عام في جميع المسائل الدينية"),
      difficulty: 2,
      questions: [
        { q: "What answers a false doubt about the religion, per as-Sa'di on 21:18?", a: "Allah's clear proofs", wrong: ["Nothing can", "Shouting louder", "Only silence"], why: "Allah's proofs of reason and revelation crush every doubt." },
        { q: "Which questions does the rule cover, per as-Sa'di on 21:18?", a: "Every religious question", wrong: ["Only a few", "Only about prayer", "Only about money"], why: "He says it holds for all religious questions, one by one." },
        { tf: true, q: "Falsehood fades away once the truth is shown.", why: "As-Sa'di on 21:18." }
      ]
    },
    {
      slug: "the-angels-never-tire",
      title: "The angels never tire",
      line: "The angels glorify Allah night and day, never tired or bored.",
      facts: ["Never too proud", "Worship without slackening"],
      quote: q21(20),
      source: ik(19, "Everyone in the heavens and earth belongs to Allah. The angels near Him are never too proud to worship and never grow weary. They glorify Him night and day without slowing.", "they do not get tired or feel bored"),
      difficulty: 3,
      questions: [
        { q: "Are the angels too proud to worship, in 21:19?", a: "No, never", wrong: ["Yes, some are", "Only on Fridays", "Only at night"], why: "And those who are near Him are not too proud to worship Him, nor are they weary." },
        { q: "When do they glorify Him, in 21:20?", a: "Night and day", wrong: ["Only at dawn", "Once a year", "Only on Fridays"], why: "They glorify His praises night and day, they never slacken." },
        { q: "Do the angels get bored, per Ibn Kathir?", a: "No, they never do", wrong: ["Yes, often", "Sometimes", "Only at night"], why: "They do not get tired or feel bored." }
      ]
    },
    {
      slug: "if-there-were-other-gods",
      title: "If there were other gods",
      line: "If there were other gods, the heavens and earth would be ruined.",
      facts: ["Order shows One God", "Idols cannot give life"],
      quote: q21(22),
      source: ik(22, "Idols cannot bring the dead to life. If there were gods besides Allah, the heavens and the earth would fall into ruin. Their perfect order shows there is only One God.", "if there were another god besides Him, the heavens and the earth would be ruined"),
      difficulty: 3,
      questions: [
        { q: "What would happen with other gods, in 21:22?", a: "Heavens and earth ruined", wrong: ["More rain", "Longer days", "Nothing at all"], why: "Had there been therein gods besides Allah, then verily, both would have been ruined." },
        { q: "Can idols raise the dead, per Ibn Kathir?", a: "No, they cannot", wrong: ["Yes, some can", "Only big ones", "Only at night"], why: "Can they bring the dead back to life and bring them forth from the earth? They cannot do any of that." },
        { q: "How is Allah named in 21:22?", a: "Lord of the Throne", wrong: ["Lord of a city", "Lord of one tribe", "A small god"], why: "Glorified be Allah, the Lord of the Throne, above all that they associate with Him." }
      ]
    },
    {
      slug: "he-is-not-questioned",
      title: "He is not questioned",
      line: "No one questions Allah's doing, but all will be questioned.",
      facts: ["Perfect wisdom", "We will be asked"],
      quote: q21(23),
      source: ik(23, "Allah is the Ruler whose decision no one can overturn, because of His might, knowledge, wisdom and justice. He will ask His creation about what they did.", "He is the Ruler Whose rule cannot be overturned"),
      difficulty: 3,
      questions: [
        { q: "Who cannot be questioned, in 21:23?", a: "Allah", wrong: ["Kings", "Scholars", "Parents"], why: "He cannot be questioned as to what He does, while they will be questioned." },
        { q: "Who will be questioned, in 21:23?", a: "His creation", wrong: ["No one", "Only animals", "Only angels"], why: "While they will be questioned." },
        { q: "Why is no one able to object, per Ibn Kathir?", a: "His might, wisdom and justice", wrong: ["He is far away", "No one cares", "He sleeps"], why: "None can object to it, because of His might, majesty, pride, knowledge, wisdom, justice and subtlety." }
      ]
    },
    {
      slug: "every-messenger-taught-tawhid",
      title: "Every Messenger taught tawhid",
      line: "Every Messenger was told: there is no god but Me, worship Me.",
      facts: ["One message", "Fitrah agrees"],
      quote: q21(25),
      source: ik(25, "Every Prophet Allah sent called people to worship Allah alone, with no partner. The natural inclination in every person, the fitrah, also points to this truth.", "Every Prophet who was sent by Allah called people to worship Allah Alone"),
      difficulty: 3,
      questions: [
        { q: "What was revealed to every Messenger, in 21:25?", a: "There is no god but Me", wrong: ["Build a temple", "Obey kings", "Collect gold"], why: "And We did not send any Messenger before you but We revealed to him: There is no God but I, so worship Me." },
        { q: "What did they ask the deniers, in 21:24?", a: "Bring your proof", wrong: ["Bring your gold", "Bring your army", "Bring your idols"], why: "Say: Bring your proof." },
        { q: "What also bears witness to tawhid, per Ibn Kathir?", a: "The fitrah", wrong: ["The stars", "Old poems", "Dreams"], why: "The natural inclination of man (Al-Fitrah) also bears witness to that." }
      ]
    },
    {
      slug: "honoured-servants",
      title: "Honoured servants",
      line: "Angels are honoured servants who act only on Allah's command.",
      facts: ["Not His children", "They fear Him"],
      quote: q21(26),
      source: ik(26, "Some Arabs claimed angels were Allah's daughters. Allah says they are honoured servants. They never speak before Him and only do what He commands.", "the angels are servants of Allah who are honored by Him"),
      difficulty: 4,
      questions: [
        { q: "What are the angels, in 21:26?", a: "Honoured servants", wrong: ["His children", "Gods", "Kings"], why: "Glory to Him! They are but honored servants." },
        { q: "When do the angels speak, in 21:27?", a: "Not before He speaks", wrong: ["Whenever they like", "Before Him", "Never at all"], why: "They speak not until He has spoken, and they act on His command." },
        { q: "For whom can they intercede, in 21:28?", a: "Whom He is pleased with", wrong: ["Anyone", "Only kings", "No one ever"], why: "And they cannot intercede except for him with whom He is pleased." }
      ]
    },
    {
      slug: "joined-then-parted",
      title: "Joined, then parted",
      line: "The heavens and earth were one piece, then Allah parted them.",
      facts: ["Rain from the sky", "Plants from the earth"],
      quote: q21(30),
      source: ik(30, "In the beginning the heavens and earth were joined as one, then Allah separated them. Ibn Abbas said the sky did not rain and the earth grew nothing, then rain and plants came forth.", "in the beginning they were all one piece"),
      difficulty: 4,
      questions: [
        { q: "What were the heavens and earth, in 21:30?", a: "Joined together", wrong: ["Always apart", "Made of gold", "Under the sea"], why: "Have not those who disbelieve known that the heavens and the earth were joined together as one united piece, then We parted them?" },
        { q: "What came from the sky after, per Ibn Abbas?", a: "Rain", wrong: ["Snow only", "Stones", "Fire"], why: "Rain came forth from the heavens and vegetation came forth from the earth." },
        { q: "Who did Ibn Umar say was given knowledge of the Quran?", a: "Ibn Abbas", wrong: ["Mujahid", "Qatadah", "Ikrimah"], why: "Now I know that Ibn Abbas has been given knowledge of the Quran." }
      ]
    },
    {
      slug: "every-living-thing-from-water",
      title: "Every living thing from water",
      line: "Allah made every living thing from water.",
      facts: ["Water is the origin of life", "A sign to believe"],
      quote: q21(30),
      source: ik(30, "Allah made every living thing from water. People see with their own eyes how life grows step by step, and that points to the Creator who can do anything.", "the origin of every living thing is in water"),
      difficulty: 4,
      questions: [
        { q: "From what is every living thing made, in 21:30?", a: "Water", wrong: ["Fire", "Light", "Stone"], why: "And We have made from water every living thing. Will they not then believe?" },
        { q: "What is the origin of life, per Ibn Kathir?", a: "Water", wrong: ["Air", "Sand", "Gold"], why: "Meaning, the origin of every living thing is in water." },
        { q: "What does 21:30 ask after?", a: "Will they not then believe?", wrong: ["Will they not swim?", "Will they not drink?", "Will they not sail?"], why: "And We have made from water every living thing. Will they not then believe?" }
      ]
    },
    {
      slug: "spread-salam",
      title: "Spread salam",
      line: "Spread salam, feed others, pray at night, and enter Paradise.",
      facts: ["His first words in Madinah", "Simple deeds, big reward"],
      quote: q21(30),
      source: hadith("tirmidhi", "2485", "Abdullah ibn Salam", "Sahih", "When the Prophet ﷺ arrived in Madinah, the first thing he said was: spread salam, feed others, and pray while people sleep, and you will enter Paradise in peace.", "Spread the Salam, feed(others), and perform Salat while the people are sleeping"),
      difficulty: 4,
      questions: [
        { q: "What did the Prophet ﷺ say first in Madinah?", a: "Spread the salam", wrong: ["Build walls", "Gather gold", "Leave the city"], why: "O you people! Spread the Salam, feed others, and perform Salat while the people are sleeping." },
        { q: "When should we pray, in the hadith?", a: "While people sleep", wrong: ["Only at noon", "Only on Eid", "Never at night"], why: "And perform Salat while the people are sleeping; you will enter Paradise with Salam." },
        { q: "Abdullah ibn Salam knew the face was not a liar's face.", tf: true, why: "When I gazed upon the face of the Messenger of Allah, I knew that this face was not the face of a liar." }
      ]
    },
    {
      slug: "mountains-and-a-guarded-sky",
      title: "Mountains and a guarded sky",
      line: "Mountains keep the earth steady; the sky is a protected roof.",
      facts: ["Passes for travel", "Signs we pass by"],
      quote: q21(31),
      source: ik(31, "Allah set firm mountains that steady the earth, with passes so people can travel. He made the sky a roof, high and guarded, yet many walk past these signs without thinking.", "mountains which stabilize the earth and keep it steady"),
      difficulty: 4,
      questions: [
        { q: "Why were mountains placed, in 21:31?", a: "So the earth would not shake", wrong: ["To block the sun", "To hold rain", "To scare people"], why: "And We have placed on the earth firm mountains, lest it should shake with them." },
        { q: "What did Allah make the heaven, in 21:32?", a: "A safe, guarded roof", wrong: ["A sea", "A floor", "A cave"], why: "And We have made the heaven a roof, safe and well-guarded." },
        { q: "What do the highways in mountains help, per Ibn Kathir?", a: "Travel between lands", wrong: ["Grow food", "Make rain", "Hide treasure"], why: "Mountain passes through which they may travel from region to region, country to country." }
      ]
    },
    {
      slug: "each-in-an-orbit",
      title: "Each in an orbit",
      line: "Night, day, sun and moon each float in its own orbit.",
      facts: ["Night and day switch", "Sun and moon have paths"],
      quote: q21(33),
      source: ik(33, "Allah made night for stillness and day for light and work. The sun and moon each have their own light, path and time. Ibn Abbas said they revolve like a spinning wheel.", "They revolve like a spinning wheel, in a circle"),
      difficulty: 4,
      questions: [
        { q: "How do the sun and moon move, in 21:33?", a: "Each floating in an orbit", wrong: ["Standing still", "Falling down", "Swapping places"], why: "And He it is Who has created the night and the day, and the sun and the moon, each in an orbit floating." },
        { q: "How did Ibn Abbas describe them?", a: "Like a spinning wheel", wrong: ["Like a river", "Like a bird", "Like a tree"], why: "Ibn Abbas said: They revolve like a spinning wheel, in a circle." },
        { q: "Is the moon's light the same as the sun's, per Ibn Kathir?", a: "No, it is different", wrong: ["Yes, exactly", "It has none", "It is brighter"], why: "The moon which shines with a different light and travels on a different path and has its own allotted time." }
      ]
    },
    {
      slug: "every-soul-tastes-death",
      title: "Every soul tastes death",
      line: "Everyone tastes death; Allah tests us with ease and hardship.",
      facts: ["No one lives forever", "Tests of good and bad"],
      quote: q21(35),
      source: ik(35, "No human was given everlasting life in this world. Everyone will taste death. Allah tests us with hard times and easy times, to see who is thankful and who is patient.", "We shall test you, sometimes with difficulties and sometimes with ease"),
      difficulty: 4,
      questions: [
        { q: "Who will taste death, in 21:35?", a: "Everyone", wrong: ["Only the old", "Only the sick", "Only sinners"], why: "Everyone is going to taste death." },
        { q: "With what does Allah test us, in 21:35?", a: "With evil and with good", wrong: ["Only with wealth", "Only with illness", "Not at all"], why: "And We shall test you with evil and with good by way of trial." },
        { q: "Why does Allah test with ease too, per Ibn Kathir?", a: "To see who is thankful", wrong: ["To make us lazy", "For no reason", "To reward the rich"], why: "To see who will give thanks and who will be ungrateful, who will have patience and who will despair." }
      ]
    }
  ]
};

/** Ayahs 36 to 75: haste, Allah who guards us, the Balance, and Ibrahim breaking the idols and the fire made cool. */
const ANBIYA_TWO: DeepUnit = {
  key: "anbiya2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-21",
  name: "Al-Anbiya, ayahs 36 to 75",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Anbiya",
  lessons: [
    {
      slug: "created-of-haste",
      title: "Created of haste",
      line: "People are hasty, but Allah acts at the time He chooses.",
      facts: ["Mocked yet patient", "Allah's timing is best"],
      quote: q21(37),
      source: ik(37, "The deniers mocked the Prophet ﷺ, and believers wished for quick justice. Allah said man is made hasty, but He delays, then acts at the right time, so do not rush Him.", "He waits, then He does not delay any longer"),
      difficulty: 3,
      questions: [
        { q: "What is man created of, in 21:37?", a: "Haste", wrong: ["Patience", "Light", "Silence"], why: "Man is created of haste. I will show you My Ayat. So ask Me not to hasten them." },
        { q: "What did the deniers do on seeing him ﷺ, in 21:36?", a: "Mocked him", wrong: ["Welcomed him", "Prayed with him", "Gave gifts"], why: "And when those who disbelieved see you, they take you not except for mockery." },
        { q: "What does Allah say not to ask, in 21:37?", a: "To hasten His signs", wrong: ["For forgiveness", "For guidance", "For rain"], why: "I will show you My Ayat. So ask Me not to hasten them." }
      ]
    },
    {
      slug: "when-is-the-promise",
      title: "When is the promise?",
      line: "Deniers mockingly ask when the promise will come.",
      facts: ["Do not rush the Hour", "Prepare instead of mocking"],
      quote: q21(38),
      source: ik(38, "The idol worshippers asked to hasten the punishment out of denial, stubbornness and a belief that it would never happen.", "out of denial, rejection, disbelief, stubbornness and a belief that it will never happen"),
      difficulty: 3,
      questions: [
        { q: "What did the deniers ask, in 21:38?", a: "When will this promise come?", wrong: ["Where is the market?", "Who is the king?", "What is for dinner?"], why: "And they say: When will this promise (come to pass), if you are truthful." },
        { q: "Why did they ask, per Ibn Kathir?", a: "They thought it would never happen", wrong: ["They were curious", "They were ready", "They were afraid"], why: "Out of denial, rejection, disbelief, stubbornness and a belief that it will never happen." },
        { tf: true, q: "The deniers in 21:38 wanted to hasten the punishment.", why: "Allah also tells us how the idolators seek to hasten punishment upon themselves." }
      ]
    },
    {
      slug: "if-only-they-knew",
      title: "If only they knew",
      line: "If they truly knew, they would never ask to hasten it.",
      facts: ["Certainty changes behavior", "Only Allah can help"],
      quote: q21(39),
      source: ik(39, "If the deniers knew for certain that it will come, they would not rush it. On that Day they will have no helper.", "if only they knew for certain that it will inevitably come to pass, they would not seek to hasten it"),
      difficulty: 4,
      questions: [
        { q: "What would certainty stop them doing, per Ibn Kathir?", a: "Seeking to hasten it", wrong: ["Eating", "Sleeping", "Travelling"], why: "If only they knew for certain that it will inevitably come to pass, they would not seek to hasten it." },
        { q: "Will they be helped, in 21:39?", a: "No", wrong: ["Yes", "By idols", "By kings"], why: "And they will not be helped." },
        { q: "Which ayah does Ibn Kathir link about no guardian?", a: "13:34", wrong: ["1:1", "2:255", "112:1"], why: "And they have no guardian against Allah. (13:34)" }
      ]
    },
    {
      slug: "all-of-a-sudden",
      title: "All of a sudden",
      line: "The Hour comes suddenly; none can stop or delay it.",
      facts: ["The Hour comes suddenly", "Be ready every day"],
      quote: q21(40),
      source: ik(40, "It will take them by surprise and confuse them. They will have no way to stop it, and it will not be delayed even for an instant.", "it will not be delayed for them even for an instant"),
      difficulty: 4,
      questions: [
        { q: "How will it come, in 21:40?", a: "All of a sudden", wrong: ["Slowly", "With notice", "Never"], why: "Nay, it will come upon them all of a sudden." },
        { q: "What does perplex them mean, per Ibn Kathir?", a: "It will scare and confuse them", wrong: ["It will please them", "It will feed them", "It will rest them"], why: "It will scare them, and they will succumb to it in confusion." },
        { tf: false, q: "In 21:40 they get a short delay.", why: "It will not be delayed for them even for an instant." }
      ]
    },
    {
      slug: "who-guards-you-night-and-day",
      title: "Who guards you night and day?",
      line: "Allah guards us night and day with an Eye that never sleeps.",
      facts: ["Messengers were mocked before", "Idols cannot help"],
      quote: q21(42),
      source: ik(42, "Allah comforted His Messenger ﷺ: Messengers before were mocked too. Then He reminded people that He protects them by night and day, watching over them with an Eye that never sleeps.", "He protects them by night and by day, taking care of them and watching over them with His Eye that never sleeps"),
      difficulty: 3,
      questions: [
        { q: "Were Messengers mocked before, in 21:41?", a: "Yes, many were", wrong: ["No, never", "Only one", "Only Musa"], why: "Indeed many Messengers were mocked before you." },
        { q: "Who guards us night and day, in 21:42?", a: "The Most Gracious", wrong: ["Our idols", "Our wealth", "No one"], why: "Say: Who can guard and protect you in the night or in the day from the Most Gracious?" },
        { q: "Can the false gods help themselves, in 21:43?", a: "No, they cannot", wrong: ["Yes, easily", "Only at night", "Only big ones"], why: "They have no power to help themselves, nor can they be protected from Us." }
      ]
    },
    {
      slug: "the-balances-of-justice",
      title: "The Balances of justice",
      line: "On that Day even a mustard seed's weight of deeds is counted.",
      facts: ["No one wronged", "Every small deed counts"],
      quote: q21(47),
      source: ik(47, "Allah will set up the Balance of justice on the Day of Resurrection. No one will be wronged, and even a deed the weight of a mustard seed will be brought and weighed.", "The majority of scholars state that it is one Balance"),
      difficulty: 3,
      questions: [
        { q: "What will be set up, in 21:47?", a: "Balances of justice", wrong: ["Tall towers", "Golden thrones", "Big gates"], why: "And We shall set up Balances of justice on the Day of Resurrection." },
        { q: "What small weight will be brought, in 21:47?", a: "A mustard seed", wrong: ["A mountain", "A tree", "A rock"], why: "And if there be the weight of a mustard seed, We will bring it." },
        { q: "How many Balances, per most scholars?", a: "One Balance", wrong: ["Seven", "Ten", "None"], why: "The majority of scholars state that it is one Balance, and the plural form is used here to reflect the large number of deeds." }
      ]
    },
    {
      slug: "light-on-the-tongue",
      title: "Light on the tongue",
      line: "Two short phrases are light to say but heavy on the Balance.",
      facts: ["SubhanAllahi wa bihamdihi", "SubhanAllahil Azim"],
      quote: q21(47),
      source: hadith("bukhari", "6406", "Abu Hurairah", "Sahih", "The Prophet ﷺ said two phrases are easy on the tongue, heavy in the Balance and loved by the Most Merciful: SubhanAllahi wa bihamdihi, SubhanAllahil Azim.", "very easy for the tongue to say, but they are very heavy in the balance"),
      difficulty: 3,
      questions: [
        { q: "How heavy are the two phrases in the Balance?", a: "Very heavy", wrong: ["Very light", "Weightless", "Like a feather"], why: "There are two expressions which are very easy for the tongue to say, but they are very heavy in the balance." },
        { q: "Who loves these phrases, in the hadith?", a: "The Most Merciful", wrong: ["Only the angels", "Only scholars", "Kings"], why: "And are very dear to The Beneficent." },
        { q: "Which phrase is one of the two?", a: "SubhanAllahi wa bihamdihi", wrong: ["Bismillah only", "Ameen", "Salam"], why: "And they are, Subhan Allah Al-Azim and Subhan Allah wa bihamdihi." }
      ]
    },
    {
      slug: "the-criterion-and-a-light",
      title: "The criterion and a light",
      line: "Allah gave Musa and Harun a criterion, a light and a reminder.",
      facts: ["Truth from falsehood", "Fear Allah in private"],
      quote: q21(48),
      source: ik(48, "Allah gave Musa and Harun the Tawrah, a criterion between right and wrong and a light. The heavenly Books separate truth from falsehood. The Quran is also a blessed reminder.", "the heavenly Books included the distinction between truth and falsehood"),
      difficulty: 3,
      questions: [
        { q: "What were Musa and Harun given, in 21:48?", a: "The criterion and a light", wrong: ["A kingdom", "An army", "Gold"], why: "And indeed We granted to Musa and Harun the criterion, and a shining light and a Reminder for those who have Taqwa." },
        { q: "Who fears their Lord unseen, in 21:49?", a: "The God-fearing", wrong: ["The proud", "The careless", "The rich"], why: "Those who fear their Lord in the unseen, and they are afraid of the Hour." },
        { q: "What is the Quran called, in 21:50?", a: "A blessed Reminder", wrong: ["An old tale", "A poem", "A riddle"], why: "And this is a blessed Reminder which We have sent down; will you then deny it?" }
      ]
    },
    {
      slug: "ibrahim-guided-young",
      title: "Ibrahim guided young",
      line: "From a young age, Allah guided Ibrahim to the truth.",
      facts: ["He questioned the idols", "Allah knew him well"],
      quote: q21(51),
      source: ik(51, "Allah gave Ibrahim guidance early in his life. While still young he asked his father and people: what are these statues you are so devoted to?", "He had already guided him at an early age"),
      difficulty: 3,
      questions: [
        { q: "When was Ibrahim guided, per Ibn Kathir?", a: "At an early age", wrong: ["In old age", "After a war", "Never"], why: "Allah is telling us that He gave guidance to Ibrahim aforetime, He had already guided him at an early age." },
        { q: "What did he ask his people, in 21:52?", a: "What are these images?", wrong: ["Where is the market?", "Who is the king?", "When is the feast?"], why: "What are these images, to which you are devoted?" },
        { q: "Whom did Ibrahim question, in 21:52?", a: "His father and people", wrong: ["Only strangers", "Only children", "Only kings"], why: "When he said to his father and his people: What are these images, to which you are devoted?" }
      ]
    },
    {
      slug: "we-found-our-fathers",
      title: "We found our fathers",
      line: "Their only proof was their fathers; Ibrahim said all had erred.",
      facts: ["Copying is not proof", "Allah created all"],
      quote: q21(53),
      source: ik(53, "The people had no evidence except that their forefathers worshipped idols. Ibrahim said both they and their fathers were clearly wrong, and that their Lord is the Creator of the heavens and earth.", "they had no other evidence apart from the misguided actions of their forefathers"),
      difficulty: 3,
      questions: [
        { q: "What was their reason, in 21:53?", a: "Our fathers worshipped them", wrong: ["The idols spoke", "A Prophet said so", "They had proof"], why: "They said: We found our fathers worshipping them." },
        { q: "What did Ibrahim say of them, in 21:54?", a: "You and your fathers erred", wrong: ["You are right", "Only fathers erred", "Keep going"], why: "Indeed you and your fathers have been in manifest error." },
        { q: "Who is your Lord, in 21:56?", a: "Lord of the heavens and earth", wrong: ["The biggest idol", "The king", "The sun"], why: "Nay, your Lord is the Lord of the heavens and the earth, Who created them." }
      ]
    },
    {
      slug: "ibrahim-broke-the-idols",
      title: "Ibrahim broke the idols",
      line: "While the people were out, Ibrahim broke all the idols but one.",
      facts: ["The biggest was left", "To make them think"],
      quote: q21(58),
      source: ik(58, "Ibrahim promised to plan against the idols. When the people went to their festival, he broke them all to pieces except the biggest, so they would turn to it and think.", "he smashed them all, except for the biggest idol"),
      difficulty: 4,
      questions: [
        { q: "Which idol did Ibrahim leave, in 21:58?", a: "The biggest one", wrong: ["The smallest one", "None", "The oldest one"], why: "So he broke them to pieces, except the biggest of them, that they might turn to it." },
        { q: "Where were the people, per Ibn Kathir?", a: "At their festival", wrong: ["At war", "Asleep", "At sea"], why: "When they went out to their festival. They had a festival which they would go out to celebrate." },
        { q: "How did they describe Ibrahim, in 21:60?", a: "A young man", wrong: ["An old king", "A stranger", "A soldier"], why: "We heard a young man talking against them, who is called Ibrahim." }
      ]
    },
    {
      slug: "ask-them-if-they-can-speak",
      title: "Ask them if they can speak",
      line: "Ibrahim said: ask the idols, if they can speak!",
      facts: ["Before all the people", "They knew idols are silent"],
      quote: q21(63),
      source: ik(63, "Brought before a crowd, Ibrahim pointed at the biggest idol and said: ask them, if they can speak. He hoped they would admit by themselves that the idols could not speak at all.", "He was hoping that they would admit of their own volition that these idols could not speak"),
      difficulty: 4,
      questions: [
        { q: "Why bring him before the people, in 21:61?", a: "So they could testify", wrong: ["To praise him", "To crown him", "To feed him"], why: "They said: Then bring him before the eyes of the people, that they may testify." },
        { q: "What did Ibrahim tell them to do, in 21:63?", a: "Ask the idols", wrong: ["Pray to them", "Fix them", "Bury them"], why: "Ask them, if they can speak!" },
        { q: "What did Ibrahim hope they would admit?", a: "Idols cannot speak", wrong: ["He was wrong", "Idols were angry", "Idols were hungry"], why: "He was hoping that they would admit of their own volition that these idols could not speak." }
      ]
    },
    {
      slug: "no-benefit-no-harm",
      title: "No benefit, no harm",
      line: "Why worship what can neither help you nor harm you?",
      facts: ["They looked down", "Ibrahim won the argument"],
      quote: q21(66),
      source: ik(66, "The people looked down and admitted the idols cannot speak. Ibrahim asked: then why worship, instead of Allah, things that can neither help nor harm you? Have you no sense?", "cannot speak and they can neither benefit you nor harm you, then why do you worship them instead of Allah"),
      difficulty: 4,
      questions: [
        { q: "What did the people admit, in 21:65?", a: "These idols do not speak", wrong: ["The idols are angry", "Ibrahim lied", "The idols ran"], why: "Indeed you know well that these speak not!" },
        { q: "What can the idols do, in 21:66?", a: "Neither benefit nor harm", wrong: ["Bring rain", "Heal people", "Give children"], why: "Do you then worship besides Allah, things that can neither profit you nor harm you?" },
        { q: "What did Ibrahim ask at the end, in 21:67?", a: "Have you then no sense?", wrong: ["Are you hungry?", "Where is the king?", "Who are you?"], why: "Fie upon you, and upon that which you worship besides Allah! Have you then no sense?" }
      ]
    },
    {
      slug: "o-fire-be-cool",
      title: "O fire, be cool",
      line: "They threw Ibrahim in a fire; Allah made it cool and safe.",
      facts: ["Allah's command was swift", "Cool, but also safe"],
      quote: q21(69),
      source: ik(69, "Beaten in argument, they built a huge fire and threw Ibrahim in. Allah said: O fire, be cool and safe for Ibrahim. Ibn Abbas said without the word safe, the cold itself would have hurt him.", "Ibrahim would have been harmed by its coldness"),
      difficulty: 4,
      questions: [
        { q: "What did Allah command the fire, in 21:69?", a: "Be cool and safe", wrong: ["Burn higher", "Turn to water", "Move away"], why: "We said: O fire! Be you cool and safety for Ibrahim!" },
        { q: "Why also say safe, per Ibn Abbas?", a: "Or the cold would harm him", wrong: ["To scare them", "No reason", "For the angels"], why: "Were it not for the fact that Allah said and safety, Ibrahim would have been harmed by its coldness." },
        { q: "Who ended up the losers, in 21:70?", a: "Those who plotted", wrong: ["Ibrahim", "Lut", "The angels"], why: "And they wanted to harm him, but We made them the worst losers." }
      ]
    },
    {
      slug: "allah-is-sufficient-for-us",
      title: "Allah is sufficient for us",
      line: "In the fire, Ibrahim said: Allah is enough for me.",
      facts: ["Hasbunallah wa nimal wakil", "Said by two Prophets"],
      quote: q21(69),
      source: hadith("bukhari", "4563", "Ibn Abbas", "Sahih", "Ibn Abbas said: Allah is sufficient for us and He is the best Disposer of affairs was said by Ibrahim when thrown into the fire, and by Muhammad ﷺ when people gathered against him.", "was said by Abraham when he was thrown into the fire"),
      difficulty: 4,
      questions: [
        { q: "What did Ibrahim say in the fire?", a: "Allah is sufficient for us", wrong: ["Help me, people", "I give up", "Nothing at all"], why: "Allah is Sufficient for us and He Is the Best Disposer of affairs, was said by Abraham when he was thrown into the fire." },
        { q: "Which other Prophet said it?", a: "Muhammad ﷺ", wrong: ["Nuh", "Musa", "Yunus"], why: "And it was said by Muhammad ﷺ when they said: A great army is gathering against you." },
        { q: "The words only increased the believers' faith.", tf: true, why: "But it only increased their faith and they said: Allah is Sufficient for us, and He is the Best Disposer." }
      ]
    },
    {
      slug: "the-gift-of-yaqub",
      title: "The gift of Ya'qub",
      line: "Allah gave Ibrahim Ishaq, and Ya'qub as an extra gift.",
      facts: ["A blessed land", "A son who has a son"],
      quote: q21(72),
      source: ik(72, "Allah saved Ibrahim and Lut to a blessed land. He gave Ibrahim Ishaq, and then Ya'qub as an extra gift: a son who has a son. Each was righteous.", "The gift of a son who has a son"),
      difficulty: 5,
      questions: [
        { q: "Whom did Allah give Ibrahim, in 21:72?", a: "Ishaq and Ya'qub", wrong: ["Musa and Harun", "Dawud", "Yusuf alone"], why: "And We bestowed upon him Ishaq, and Ya'qub Nafilatan. Each one We made righteous." },
        { q: "What does Nafilatan mean, per Ata and Mujahid?", a: "As a gift", wrong: ["As a king", "As a servant", "As a test"], why: "Ata and Mujahid said: Nafilatan means as a gift." },
        { q: "Who was rescued with Ibrahim, in 21:71?", a: "Lut", wrong: ["Nuh", "Hud", "Salih"], why: "And We rescued him and Lut to the land which We have blessed for the nations." }
      ]
    },
    {
      slug: "leaders-who-guided",
      title: "Leaders who guided",
      line: "Allah made them leaders who did the good they taught.",
      facts: ["Salah and Zakah", "They worshipped Allah alone"],
      quote: q21(73),
      source: ik(73, "Allah made Ibrahim, Ishaq and Ya'qub leaders to follow, calling to Him. He inspired them to do good, pray and give zakah, and they practised what they told others.", "they did what they enjoined others to do"),
      difficulty: 5,
      questions: [
        { q: "What did Allah make them, in 21:73?", a: "Leaders guiding by His command", wrong: ["Kings", "Merchants", "Poets"], why: "And We made them leaders, guiding by Our command." },
        { q: "What was revealed to them, in 21:73?", a: "Good deeds, Salah and Zakah", wrong: ["Trade rules", "War plans", "Poems"], why: "And We revealed to them the doing of good deeds, performing Salah, and the giving of Zakah." },
        { q: "Did they practise what they taught, per Ibn Kathir?", a: "Yes, they did", wrong: ["No", "Only sometimes", "Only Ishaq"], why: "They did what they enjoined others to do." }
      ]
    },
    {
      slug: "lut-given-wisdom",
      title: "Lut given wisdom",
      line: "Lut followed Ibrahim; Allah gave him wisdom and knowledge.",
      facts: ["He migrated with Ibrahim", "Among the righteous"],
      quote: q21(74),
      source: ik(74, "Lut believed in Ibrahim and migrated with him. Allah gave him wisdom and knowledge, made him a Prophet, saved him from a town that did shameful deeds, and entered him into His mercy.", "He believed in Ibrahim and followed him, and migrated with him"),
      difficulty: 5,
      questions: [
        { q: "What did Allah give Lut, in 21:74?", a: "Wisdom and knowledge", wrong: ["Gold", "An army", "A palace"], why: "And remember Lut, We gave him wisdom and knowledge." },
        { q: "Whom did Lut follow, per Ibn Kathir?", a: "Ibrahim", wrong: ["Nuh", "Musa", "Hud"], why: "He believed in Ibrahim and followed him, and migrated with him." },
        { q: "Where did Allah admit Lut, in 21:75?", a: "Into His mercy", wrong: ["Into a palace", "Into exile", "Into a cave"], why: "And We admitted him to Our mercy; truly, he was of the righteous." }
      ]
    }
  ]
};

const ANBIYA_THREE: DeepUnit = {
  key: "anbiya3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-21",
  name: "Al-Anbiya, ayahs 76 to 112",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Anbiya",
  lessons: [
    {
      slug: "nuh-answered",
      title: "Nuh answered",
      line: "Nuh called on Allah, and Allah saved him and his family.",
      facts: ["He called his people for 950 years", "Allah saved him from the great distress"],
      quote: q21(76),
      source: ik(76, "Nuh called his people to Allah for a very long time and few believed. When he called on his Lord, Allah answered him and saved him and his family from the great distress.", "he remained among them for one thousand years less fifty"),
      difficulty: 2,
      questions: [
        { q: "What did Allah do when Nuh called, in 21:76?", a: "He answered and saved him", wrong: ["He ignored him", "He delayed it", "He sent him away"], why: "We answered his call and saved him and his family from the great distress." },
        { tf: true, q: "Nuh called his people for 950 years, per Ibn Kathir.", why: "He remained among them for one thousand years less fifty." },
        { q: "Who believed in Nuh, per Ibn Kathir?", a: "Only a few", wrong: ["Everyone", "All the kings", "No one at all"], why: "No one had believed in him except for a few." }
      ]
    },
    {
      slug: "dawud-sulayman-judge",
      title: "Two Prophets judge",
      line: "Dawud and Sulayman judged a case about sheep in a field.",
      facts: ["Sheep grazed a field at night", "Allah gave Sulayman the right understanding"],
      quote: q21(79),
      source: ik(78, "Sheep strayed into a field at night and ate the crop. Dawud and Sulayman both judged the case. Allah gave Sulayman the better understanding, and gave both of them wisdom and knowledge.", "Allah praised Sulayman but He did not condemn Dawud"),
      difficulty: 2,
      questions: [
        { q: "What ate the crop of the field, in 21:78?", a: "Sheep at night", wrong: ["Camels by day", "Birds", "Locusts"], why: "The sheep of certain people had pastured in it at night." },
        { q: "Whom did Allah give the right understanding, in 21:79?", a: "Sulayman", wrong: ["Dawud alone", "The shepherd", "The farmer"], why: "And We made Sulayman to understand the case." },
        { q: "What did both Prophets receive, in 21:79?", a: "Wisdom and knowledge", wrong: ["Only gold", "Only armies", "Nothing"], why: "And to each of them We gave wisdom and knowledge." }
      ]
    },
    {
      slug: "judge-two-rewards",
      title: "A judge's reward",
      line: "A judge who tries his best is rewarded, even if he errs.",
      facts: ["Right verdict: two rewards", "Honest mistake: still one reward"],
      quote: q21(79),
      source: hadith("bukhari", "7352", "Amr ibn al-As", "Sahih", "The Prophet ﷺ said a judge who tries his best and is right gets two rewards, and if he tries his best and is wrong he still gets one reward.", "he will receive a double reward"),
      difficulty: 3,
      questions: [
        { q: "What does a judge who tries hard and is right get?", a: "Two rewards", wrong: ["One reward", "No reward", "Ten rewards"], why: "If his verdict is correct he will receive a double reward." },
        { tf: true, q: "A judge who tries hard but errs still gets a reward.", why: "If his verdict is wrong, even then he will get a reward." },
        { q: "How did Allah treat Dawud's verdict, per Al-Hasan?", a: "He did not blame him", wrong: ["He blamed him", "He punished him", "He removed him"], why: "Allah praised Sulayman but He did not condemn Dawud." }
      ]
    },
    {
      slug: "mountains-birds-dawud",
      title: "Mountains glorify with Dawud",
      line: "Mountains and birds glorified Allah with Dawud's recitation.",
      facts: ["Dawud had a beautiful voice", "He recited the Zabur"],
      quote: q21(79),
      source: ik(79, "Dawud had a beautiful voice when he recited the Zabur. The birds stopped in the air and repeated after him, and the mountains echoed his glorification of Allah.", "the birds would stop and hover in the air"),
      difficulty: 3,
      questions: [
        { q: "What glorified Allah with Dawud, in 21:79?", a: "The mountains and the birds", wrong: ["The rivers and fish", "The stars", "The trees only"], why: "We subjected the mountains and the birds to glorify Our praises along with Dawud." },
        { q: "What did the birds do, per Ibn Kathir?", a: "Hovered and repeated after him", wrong: ["Flew away", "Stayed silent", "Built nests"], why: "The birds would stop and hover in the air, and would repeat after him." },
        { q: "Which Book did Dawud recite, per Ibn Kathir?", a: "The Zabur", wrong: ["The Tawrah", "The Injil", "The Suhuf of Ibrahim"], why: "This refers to the beauty of his voice when he recited his Book, Az-Zabur." }
      ]
    },
    {
      slug: "dawud-armor",
      title: "Dawud's coats of mail",
      line: "Allah taught Dawud to make chain armor to protect people.",
      facts: ["Armor of linked rings", "A blessing to thank Allah for"],
      quote: q21(80),
      source: ik(80, "Allah taught Dawud how to make coats of mail from linked rings. Before that, people wore plated armor. It protected them, so Allah asks: are you then grateful?", "he was the first one to make rings of chain-armor"),
      difficulty: 3,
      questions: [
        { q: "What did Allah teach Dawud to make, in 21:80?", a: "Coats of mail", wrong: ["Ships", "Swords of gold", "Towers"], why: "And We taught him the making of metal coats of mail, to protect you." },
        { tf: true, q: "Dawud was the first to make armor of linked rings, per Qatadah.", why: "He was the first one to make rings of chain-armor." },
        { q: "What question ends 21:80?", a: "Are you then grateful?", wrong: ["Are you then strong?", "Will you fight?", "Who made it?"], why: "To protect you in your fighting. Are you then grateful?" }
      ]
    },
    {
      slug: "wind-for-sulayman",
      title: "The wind for Sulayman",
      line: "Allah made the strong wind run at Sulayman's command.",
      facts: ["It ran to the blessed land", "Allah knows everything"],
      quote: q21(81),
      source: ik(81, "Allah subjected the strong wind to Sulayman. It ran by his command toward the land Allah had blessed. Allah is the All-Knower of everything.", "We subjugated the strong wind to Sulayman"),
      difficulty: 3,
      questions: [
        { q: "What did Allah subject to Sulayman, in 21:81?", a: "The strong wind", wrong: ["The sea", "The sun", "The rain"], why: "And to Sulayman We subjected the wind strongly raging, running by his command." },
        { q: "Toward where did the wind run, in 21:81?", a: "The land Allah had blessed", wrong: ["The desert", "The far east", "The mountains"], why: "Running by his command towards the land which We had blessed." },
        { tf: false, q: "Sulayman controlled the wind by his own power.", why: "Allah subjected the wind to him; it was a gift from Allah." }
      ]
    },
    {
      slug: "ayyub-patience",
      title: "Ayyub's patience",
      line: "Ayyub lost health, wealth and family, yet stayed patient.",
      facts: ["He called on the Most Merciful", "Allah restored his family and more"],
      quote: q21(83),
      source: ik(83, "Ayyub was tested with the loss of his wealth, children and health. He stayed patient and called on Allah, the Most Merciful. Allah removed his distress and gave back his family and the like of them.", "The Prophet of Allah, Ayyub, upon him be peace, had the utmost patience"),
      difficulty: 3,
      questions: [
        { q: "How did Ayyub describe Allah in his dua, in 21:83?", a: "Most Merciful of all", wrong: ["Most Powerful king", "Lord of armies", "Owner of gold"], why: "You are the Most Merciful of all those who show mercy." },
        { q: "What did Allah restore to Ayyub, in 21:84?", a: "His family and the like", wrong: ["Only his house", "Nothing", "Only his camels"], why: "We restored his family to him, and the like thereof along with them." },
        { q: "What quality is Ayyub the best example of?", a: "Patience", wrong: ["Wealth", "Strength", "Travel"], why: "Ayyub had the utmost patience, and he is the best example of that." }
      ]
    },
    {
      slug: "three-patient-ones",
      title: "Three patient ones",
      line: "Isma'il, Idris and Dhul-Kifl were all among the patient.",
      facts: ["Isma'il was the son of Ibrahim", "Allah admitted them to His mercy"],
      quote: q21(85),
      source: ik(85, "Allah mentions Isma'il, Idris and Dhul-Kifl, all of them patient. Isma'il was the son of Ibrahim. Dhul-Kifl is named with Prophets, so it appears he was one too. Allah admitted them to His mercy.", "it appears that he was also a Prophet"),
      difficulty: 4,
      questions: [
        { q: "Which three are named as patient, in 21:85?", a: "Isma'il, Idris and Dhul-Kifl", wrong: ["Nuh, Hud and Salih", "Musa, Harun and Isa", "Adam, Shith and Lut"], why: "And remember Isma'il, Idris and Dhul-Kifl: all were from among the patient." },
        { q: "Whose son was Isma'il, per Ibn Kathir?", a: "Ibrahim", wrong: ["Ishaq", "Nuh", "Ya'qub"], why: "Isma'il was the son of Ibrahim Al-Khalil." },
        { q: "Where did Allah admit them, in 21:86?", a: "Into His mercy", wrong: ["Into a palace", "Into a cave", "Into a ship"], why: "And We admitted them to Our mercy. Verily, they were of the righteous." }
      ]
    },
    {
      slug: "yunus-in-darkness",
      title: "Yunus in the darkness",
      line: "Yunus called on Allah from deep darkness inside the fish.",
      facts: ["He left his people in anger", "Three layers of darkness"],
      quote: q21(87),
      source: ik(87, "Yunus left his people in anger. Inside the fish he called out in the darknesses: there is no god but You, glory be to You, I was of the wrongdoers. Allah answered him.", "The darkness of the belly of the fish, the darkness of the sea and the darkness of the night"),
      difficulty: 3,
      questions: [
        { q: "Which three darknesses, per Ibn Mas'ud?", a: "Fish, sea and night", wrong: ["Cave, sea and storm", "Night, cloud and rain", "Well, prison and night"], why: "The darkness of the belly of the fish, the darkness of the sea and the darkness of the night." },
        { q: "What does the name Dhun-Nun mean?", a: "The one of the fish", wrong: ["The one of the ship", "The one of the cave", "The one of the night"], why: "Nun refers to the fish; it is correct for it to be attributed to him." },
        { q: "What did Yunus admit in his dua, in 21:87?", a: "I was a wrongdoer", wrong: ["I was right", "I was strong", "I was forgotten"], why: "Truly, I have been of the wrongdoers." }
      ]
    },
    {
      slug: "dua-of-yunus",
      title: "The dua of Yunus",
      line: "Any Muslim who says Yunus's dua is answered by Allah.",
      facts: ["La ilaha illa anta, subhanaka", "Inni kuntu minaz-zalimin"],
      quote: q21(88),
      source: hadith("tirmidhi", "3505", "Sa'd ibn Abi Waqqas", "Sahih", "The Prophet ﷺ said the dua of Dhun-Nun in the fish was: none is worthy of worship but You, glory to You, I was of the wrongdoers. No Muslim calls with it except that Allah answers him.", "no Muslim man supplicates with it for anything, ever, except Allah responds to him"),
      difficulty: 4,
      questions: [
        { q: "Whom does Allah save like Yunus, in 21:88?", a: "The believers", wrong: ["Only Prophets", "Only kings", "No one else"], why: "And thus We do deliver the believers." },
        { tf: true, q: "Allah answers any Muslim who calls with Yunus's dua.", why: "No Muslim supplicates with it for anything, ever, except Allah responds to him." },
        { q: "How does Yunus's dua begin?", a: "None is worthy of worship but You", wrong: ["O Allah, give me wealth", "My Lord, forgive my people", "Glory be to my mountain"], why: "There is none worthy of worship except You, Glory to You." }
      ]
    },
    {
      slug: "zakariyya-hasten",
      title: "They hastened to good",
      line: "Zakariyya's family hastened to good with hope and fear.",
      facts: ["Allah gave him Yahya", "They were humble before Allah"],
      quote: q21(90),
      source: ik(90, "Zakariyya asked not to be left alone. Allah gave him Yahya and cured his wife. They rushed to acts of worship and called on Allah with hope and fear, humble before Him.", "acts of worship and acts of obedience towards Allah"),
      difficulty: 4,
      questions: [
        { q: "Whom did Allah give Zakariyya, in 21:90?", a: "Yahya", wrong: ["Isa", "Isma'il", "Yusuf"], why: "So We answered his call, and We bestowed upon him Yahya." },
        { q: "How did they call on Allah, in 21:90?", a: "With hope and fear", wrong: ["With pride", "Only in hard times", "With anger"], why: "They used to call on Us with hope and fear." },
        { q: "What does hastening to good mean, per Ibn Kathir?", a: "Rushing to worship and obedience", wrong: ["Rushing to trade", "Walking fast", "Racing horses"], why: "Acts of worship and acts of obedience towards Allah." }
      ]
    },
    {
      slug: "a-blessed-companion",
      title: "A blessed companion",
      line: "A good companion brings blessing to the one beside them.",
      facts: ["As-Sa'di explains", "Good company"],
      quote: q21(90),
      source: saadi(21, 90, "As-Sa'di says Allah healed the wife of Zakariyya so she could bear Yahya, for the sake of His Prophet, and this shows that a righteous companion is a blessing to the one with him; the Prophets called on Allah in hope and fear, never heedless.", "وهذا من فوائد الجليس، والقرين الصالح، أنه مبارك على قرينه"),
      difficulty: 2,
      questions: [
        { q: "Why was Zakariyya's wife healed to have a child, per as-Sa'di?", a: "For the sake of Zakariyya", wrong: ["By chance", "For her wealth", "For her family name"], why: "Allah healed her for His Prophet Zakariyya." },
        { q: "What lesson does as-Sa'di draw from 21:90 about company?", a: "A good companion brings blessing", wrong: ["Friends do not matter", "Live alone", "Pick rich friends"], why: "A righteous companion is blessed for the one beside him." },
        { tf: true, q: "The Prophets called on Allah with both hope and fear.", why: "As-Sa'di on 21:90." }
      ]
    },
    {
      slug: "maryam-a-sign",
      title: "Maryam and her son a sign",
      line: "Maryam and Isa are a sign that Allah can do anything.",
      facts: ["Maryam guarded her chastity", "Isa was born without a father"],
      quote: q21(91),
      source: ik(91, "Allah made Maryam and her son a sign for the worlds: proof that He is able to do all things. When He wills a thing, He only says to it, Be, and it is.", "evidence that Allah is able to do all things"),
      difficulty: 4,
      questions: [
        { q: "What did Allah make Maryam and her son, in 21:91?", a: "A sign for the worlds", wrong: ["Kings", "Judges", "Merchants"], why: "And We made her and her son a sign for the nations." },
        { q: "What does the sign show, per Ibn Kathir?", a: "Allah is able to do all things", wrong: ["Isa is a god", "Maryam was a queen", "Signs are rare"], why: "Evidence that Allah is able to do all things." },
        { tf: false, q: "Isa had a human father, per the Quran.", why: "Allah created Isa without a father, as a sign of His power." }
      ]
    },
    {
      slug: "prophets-one-religion",
      title: "One religion of the Prophets",
      line: "All the Prophets brought one religion: worship Allah alone.",
      facts: ["Their laws differed", "Their belief was the same"],
      quote: q21(92),
      source: hadith("bukhari", "3443", "Abu Hurairah", "Sahih", "The Prophet ﷺ said he is the nearest of people to Isa son of Maryam. The Prophets are brothers with different mothers, and their religion is one.", "The prophets are paternal brothers; their mothers are different, but their religion is one"),
      difficulty: 4,
      questions: [
        { q: "What did the Prophets share, per the hadith?", a: "One religion", wrong: ["One mother", "One land", "One language"], why: "The prophets are paternal brothers; their mothers are different, but their religion is one." },
        { q: "What does 'your Ummah is one' mean, per Ibn Abbas?", a: "Your religion is one", wrong: ["Your tribe is one", "Your city is one", "Your king is one"], why: "Your religion is one religion." },
        { q: "What did differ between the Prophets, per Ibn Kathir?", a: "Their laws", wrong: ["Their God", "Their belief in Allah", "Nothing at all"], why: "The Laws of each Messenger may have differed, but all worshipped Allah alone." }
      ]
    },
    {
      slug: "no-effort-lost",
      title: "No good effort is lost",
      line: "A believer's good deeds are all written and never wasted.",
      facts: ["Faith plus good deeds", "Allah records every deed"],
      quote: q21(94),
      source: ik(94, "Whoever does righteous deeds while a believer, his effort will not be rejected. Allah records every deed, and none of it is lost.", "all his deeds are recorded and nothing of them at all is lost"),
      difficulty: 4,
      questions: [
        { q: "What happens to a believer's good effort, in 21:94?", a: "It is not rejected", wrong: ["It is forgotten", "It is halved", "It is delayed"], why: "Whoever does righteous good deeds while he is a believer, his efforts will not be rejected." },
        { tf: true, q: "Allah records every good deed of the believer.", why: "All his deeds are recorded and nothing of them at all is lost." },
        { q: "What two things does 21:94 join together?", a: "Faith and good deeds", wrong: ["Wealth and fame", "Strength and speed", "Travel and trade"], why: "Whoever does righteous good deeds while he is a believer." }
      ]
    },
    {
      slug: "no-return-for-ruined-towns",
      title: "No return",
      line: "The people of ruined towns will not return to this world.",
      facts: ["Life comes once", "Use your time well"],
      quote: q21(95),
      source: ik(95, "Ibn Abbas said it is decreed that people of each destroyed town will never return to this world before the Day of Resurrection.", "return to this world before the Day of Resurrection"),
      difficulty: 3,
      questions: [
        { q: "What is laid on every destroyed town, in 21:95?", a: "A ban on returning", wrong: ["A new king", "A tax", "A wall of gold"], why: "And a ban is laid on every town which We have destroyed that they shall not return." },
        { q: "When might they return, per Ibn Kathir?", a: "Not before the Resurrection", wrong: ["Next year", "In a century", "After a flood"], why: "They will never return to this world before the Day of Resurrection." },
        { tf: true, q: "Ibn Abbas said the ban in 21:95 is enforced.", why: "Ibn Abbas said: it is enforced." }
      ]
    },
    {
      slug: "yajuj-and-majuj",
      title: "Ya'juj and Ma'juj",
      line: "Near the end, Ya'juj and Ma'juj rush down from every height.",
      facts: ["A major sign of the Hour", "Allah ends their harm"],
      quote: q21(96),
      source: ik(96, "Ya'juj and Ma'juj are from the children of Adam. Near the end they will be let loose and rush down from every raised land to spread corruption.", "they are from the progeny of Adam"),
      difficulty: 4,
      questions: [
        { q: "Who are let loose, in 21:96?", a: "Ya'juj and Ma'juj", wrong: ["The angels", "The Prophets", "The birds"], why: "Until, when Ya'juj and Ma'juj are let loose." },
        { q: "Whose children are they, per Ibn Kathir?", a: "Adam's", wrong: ["The jinn's", "The angels'", "No one's"], why: "We have already mentioned that they are from the progeny of Adam." },
        { q: "What is a Hadab, per Ibn Kathir?", a: "A raised portion of land", wrong: ["A river", "A cave", "A ship"], why: "A Hadab is a raised portion of land." }
      ]
    },
    {
      slug: "an-opening-in-the-wall",
      title: "An opening in the wall",
      line: "The Prophet ﷺ warned that a small gap opened in their barrier.",
      facts: ["Good must outweigh evil", "Say La ilaha illallah"],
      quote: q21(96),
      source: hadith("bukhari", "3346", "Zaynab bint Jahsh", "Sahih", "The Prophet ﷺ came in fear saying La ilaha illallah, and showed with his fingers a small opening made in the wall of Ya'juj and Ma'juj. Ruin comes when evil grows.", "An opening has been made in the wall of Gog and Magog like this"),
      difficulty: 5,
      questions: [
        { q: "What did the Prophet ﷺ say first, in the hadith?", a: "La ilaha illallah", wrong: ["Subhanallah", "Allahu Akbar", "Bismillah"], why: "None has the right to be worshipped but Allah." },
        { q: "How did he show the opening, in the hadith?", a: "A circle with thumb and finger", wrong: ["A drawing on sand", "Raising both hands", "Pointing up"], why: "Making a circle with his thumb and index finger." },
        { q: "When does ruin come, in the hadith?", a: "When evil increases", wrong: ["When it rains", "When kings travel", "Never"], why: "Yes, when the evil persons will increase." }
      ]
    },
    {
      slug: "we-were-heedless",
      title: "We were heedless",
      line: "As the promise nears, deniers stare: we were heedless!",
      facts: ["Wake up before that Day", "Admit wrong now"],
      quote: q21(97),
      source: ik(97, "When the true promise comes near, the eyes of the disbelievers will stare in fear, and they will admit they were heedless and wrongdoers.", "This is information given by the One Who knows what has happened and what is yet to come"),
      difficulty: 4,
      questions: [
        { q: "What draws near, in 21:97?", a: "The true promise", wrong: ["A storm", "A caravan", "Harvest"], why: "And the true promise shall draw near." },
        { q: "What do the deniers admit, in 21:97?", a: "We were heedless", wrong: ["We were right", "We were rich", "We were brave"], why: "Woe to us! We were indeed heedless of this." },
        { tf: true, q: "Ibn Kathir says this news comes from the All-Knower.", why: "This is information given by the One Who knows what has happened and what is yet to come." }
      ]
    },
    {
      slug: "fuel-for-the-fire",
      title: "Idols are fuel",
      line: "Idols and their worshippers alike become fuel for the Fire.",
      facts: ["Idols cannot save", "Worship Allah alone"],
      quote: q21(98),
      source: ik(98, "Allah told the idol worshippers of Makkah that they and their idols will be fuel for Hell. Ibn Abbas said the word means kindling.", "The fuel of Hell means that which is thrown into it"),
      difficulty: 4,
      questions: [
        { q: "What becomes fuel, in 21:98?", a: "Idols and their worshippers", wrong: ["The angels", "The Prophets", "The believers"], why: "Certainly you and that which you are worshipping now besides Allah, are (but) fuel for Hell!" },
        { q: "What does Hasab mean, per Ibn Abbas?", a: "Kindling", wrong: ["Water", "Gold", "Bread"], why: "Ibn Abbas said: Kindling." },
        { q: "Whom was 21:98 first said to, per Ibn Kathir?", a: "The idolators of Makkah", wrong: ["The angels", "The people of Madinah", "The Prophets"], why: "Allah says to the people of Makkah, the idolators of the Quraysh." }
      ]
    },
    {
      slug: "had-they-been-gods",
      title: "Had they been gods",
      line: "Had the idols been gods, they would never have entered the Fire.",
      facts: ["True God cannot be harmed", "Idols are helpless"],
      quote: q21(99),
      source: ik(99, "If the idols were really gods, they would not enter the Fire. The worshippers and the idols will all stay there.", "if these idols and false gods which you worshipped instead of Allah, had really been gods, they would not have entered the Hellfire"),
      difficulty: 4,
      questions: [
        { q: "What proves idols are not gods, in 21:99?", a: "They enter the Fire", wrong: ["They are old", "They are small", "They are many"], why: "Had these been gods, they would not have entered there." },
        { q: "Who stays there, per Ibn Kathir?", a: "Worshippers and idols", wrong: ["Only idols", "Only kings", "No one"], why: "The worshippers and the objects of their worship will all abide therein forever." },
        { tf: false, q: "Ibn Kathir says the idols truly are gods.", why: "If these idols had really been gods, they would not have entered the Hellfire." }
      ]
    },
    {
      slug: "they-hear-not",
      title: "They hear not",
      line: "There they sigh deeply and hear nothing.",
      facts: ["Allah protects believers", "Good deeds bring good ends"],
      quote: q21(100),
      source: ik(100, "In the Fire they sigh deeply and hear nothing. Then Allah describes the blessed: those whose good deeds Allah rewards with good, kept far from it.", "Just as they did good in this world, Allah will make their final destiny and their reward good"),
      difficulty: 4,
      questions: [
        { q: "What can they not do there, in 21:100?", a: "Hear", wrong: ["Sigh", "Breathe", "Speak"], why: "And therein they will hear not." },
        { q: "Which ayah does Ibn Kathir link to 21:100?", a: "11:106", wrong: ["2:255", "1:1", "36:1"], why: "They will have (in the Fire), Zafir and Shahiq. (11:106)" },
        { tf: true, q: "Ibn Kathir says good doers get a good final reward.", why: "Just as they did good in this world, Allah will make their final destiny and their reward good." }
      ]
    },
    {
      slug: "greatest-terror-no-grief",
      title: "No fear for them",
      line: "The righteous feel no grief that Day; angels greet them.",
      facts: ["Angels meet them at the graves", "This is your promised Day"],
      quote: q21(103),
      source: ik(103, "The greatest terror of that Day will not grieve the people of good. The angels will meet them as they rise from their graves, saying: this is your Day which you were promised.", "the angels will greet them on the Day of Resurrection"),
      difficulty: 4,
      questions: [
        { q: "What will not grieve the righteous, in 21:103?", a: "The greatest terror", wrong: ["Their good deeds", "The angels", "Their families"], why: "The greatest terror will not grieve them." },
        { q: "What will the angels say, in 21:103?", a: "This is your promised Day", wrong: ["Go back", "Wait longer", "Who are you?"], why: "This is your Day which you were promised." },
        { q: "When do the angels greet them, per Ibn Kathir?", a: "As they rise from graves", wrong: ["At birth", "At marriage", "Never"], why: "The angels will greet them on the Day of Resurrection when they emerge from their graves." }
      ]
    },
    {
      slug: "heaven-rolled-scroll",
      title: "The heaven rolled up",
      line: "Allah will roll up the heaven like a written scroll.",
      facts: ["He began creation, He will repeat it", "A promise binding on Allah"],
      quote: q21(104),
      source: ik(104, "On that Day Allah will roll up the heaven like a scroll of writing. As He began the first creation, He will bring it again. It is a promise He will surely keep.", "this will inevitably come to pass on the Day when Allah creates His creation anew"),
      difficulty: 5,
      questions: [
        { q: "How will Allah roll up the heaven, in 21:104?", a: "Like a scroll for books", wrong: ["Like a carpet", "Like a tent", "Like a sail"], why: "The Day when We shall roll up the heaven like a Sijill for books." },
        { q: "What will Allah repeat, in 21:104?", a: "The creation", wrong: ["The flood", "The night", "The seasons"], why: "As We began the first creation, We shall repeat it." },
        { tf: true, q: "Bringing creation back is a promise Allah will keep.", why: "It is a promise binding upon Us. Truly, We shall do it." }
      ]
    },
    {
      slug: "righteous-inherit",
      title: "The righteous inherit",
      line: "Allah's righteous servants will inherit the land of Paradise.",
      facts: ["Written in the Zabur", "A plain message for worshippers"],
      quote: q21(105),
      source: ik(105, "Allah wrote in the Zabur, after the Reminder, that His righteous servants will inherit the land. Ibn Abbas and many others said it means the land of Paradise.", "This means, the land of Paradise"),
      difficulty: 5,
      questions: [
        { q: "Who will inherit the land, in 21:105?", a: "Allah's righteous servants", wrong: ["The strongest", "The richest", "The oldest"], why: "My righteous servants shall inherit the land." },
        { q: "Which land, per Ibn Abbas?", a: "The land of Paradise", wrong: ["Egypt", "Yemen", "Rome"], why: "This means, the land of Paradise." },
        { q: "In which Book was it written, in 21:105?", a: "The Zabur", wrong: ["The Injil", "No Book", "A poem"], why: "We have written in Az-Zabur after the Reminder." }
      ]
    },
    {
      slug: "mercy-to-worlds",
      title: "A mercy to the worlds",
      line: "Allah sent Muhammad ﷺ as a mercy to all the worlds.",
      facts: ["Whoever accepts the mercy is blessed", "He refused to curse people"],
      quote: q21(107),
      source: hadith("muslim", "2599", "Abu Hurairah", "Sahih", "The Prophet ﷺ was asked to curse the idol worshippers. He said: I was not sent to curse, I was sent as a mercy.", "I have not been sent as the invoker of curse, but I have been sent as mercy"),
      difficulty: 5,
      questions: [
        { q: "Why was Muhammad ﷺ sent, in 21:107?", a: "As a mercy to the worlds", wrong: ["To rule the Arabs only", "To gather wealth", "To build a palace"], why: "And We have sent you not but as a mercy for the worlds." },
        { q: "What did the Prophet ﷺ say when asked to curse?", a: "I was sent as mercy", wrong: ["I will curse them", "Wait until tomorrow", "Ask someone else"], why: "I have not been sent as the invoker of curse, but I have been sent as mercy." },
        { tf: false, q: "The mercy of the Prophet ﷺ was only for one tribe.", why: "He sent him as a mercy for all of them, per Ibn Kathir." }
      ]
    },
    {
      slug: "allah-knows-aloud-hidden",
      title: "He knows what is hidden",
      line: "Allah knows what is said aloud and what people hide.",
      facts: ["Your God is One", "Allah is the One to ask for help"],
      quote: q21(110),
      source: ik(110, "Our God is only One God. Allah knows the Unseen completely: what people say openly and what they hide, the small and the great. The surah ends: our Lord is the Most Gracious, whose help is sought.", "Allah knows the Unseen in its entirety"),
      difficulty: 5,
      questions: [
        { q: "What does Allah know, in 21:110?", a: "What is said aloud and hidden", wrong: ["Only what is said", "Only the past", "Only big things"], why: "He knows that which is spoken aloud and He knows that which you conceal." },
        { q: "What was revealed about our God, in 21:108?", a: "He is One God", wrong: ["He has partners", "He has a son", "He sleeps"], why: "It is revealed to me that your God is only One God." },
        { q: "How does Al-Anbiya end, in 21:112?", a: "Our Lord is the Most Gracious", wrong: ["Our Lord is far", "Our Lord is silent", "Our Lord is angry"], why: "Our Lord is the Most Gracious, Whose help is to be sought." }
      ]
    }
  ]
};

export const ANBIYA_UNITS: readonly DeepUnit[] = [ANBIYA_ONE, ANBIYA_TWO, ANBIYA_THREE];
