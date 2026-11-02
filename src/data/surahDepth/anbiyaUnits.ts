import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

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
      source: ik(66, "The people looked down and admitted the idols cannot speak. Ibrahim asked: then why worship, instead of Allah, things that can neither help nor harm you? Have you no sense?", "if they cannot speak and they can neither benefit you nor harm you, then why do you worship them instead of Allah"),
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

export const ANBIYA_UNITS: readonly DeepUnit[] = [ANBIYA_ONE, ANBIYA_TWO];
