import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Al-Qamar ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Qamar 54:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_54_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Qamar 54:${ayah}`,
    url: `https://quran.com/54:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 54:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q54 = (ayah: number) => quranQuote(54, ayah);

/** Ayahs 1 to 17: the Hour is near, the moon was split, the Day of the caller, and the story of Nuh. */
const QAMAR_ONE: DeepUnit = {
  key: "qamar1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-54",
  name: "Al-Qamar, ayahs 1 to 17",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Qamar",
  lessons: [
    {
      slug: "the-hour-has-drawn-near",
      title: "The Hour has drawn near",
      line: "The Hour has come near, and the moon was split.",
      facts: ["The end of the world is near", "The moon split in his ﷺ time"],
      quote: q54(1),
      source: ik(1, "Ibn Kathir says Allah tells of the approach of the Last Hour, and the end of this world.", "Allah informs about the approach of the Last Hour"),
      difficulty: 1,
      questions: [
        { q: "What has drawn near, in 54:1?", a: "The Hour", wrong: ["The rain", "The harvest", "The winter"], why: "The Hour has drawn near, and the moon has been cleft asunder." },
        { q: "What was cleft asunder, in 54:1?", a: "The moon", wrong: ["The sea", "The mountain", "The sun"], why: "And the moon has been cleft asunder." },
        { tf: true, q: "Ibn Kathir says the end of this world is near.", why: "Allah informs about the approach of the Last Hour and the imminent end and demise of the world." }
      ]
    },
    {
      slug: "recited-on-eid",
      title: "Recited on Eid",
      line: "He ﷺ recited Qaf and Al-Qamar in the two Eid prayers.",
      facts: ["Recited at Eid al-Fitr and al-Adha", "Read at big gatherings"],
      quote: q54(1),
      source: hadith("muslim", "891", "Abu Waqid al-Laythi", "Sahih", "Umar asked Abu Waqid what the Prophet ﷺ recited on the two Eids. He said Qaf and The Hour drew near.", "The Hour drew near, and the moon was rent asunder"),
      difficulty: 2,
      questions: [
        { q: "When did he ﷺ recite Al-Qamar, per Muslim 891?", a: "In the Eid prayers", wrong: ["Only at Fajr", "At funerals", "At weddings"], why: "Umar asked what the Messenger of Allah used to recite on Id-ul-Adha and Id-ul-Fitr." },
        { q: "Which surah went with Al-Qamar at Eid?", a: "Qaf", wrong: ["Yasin", "Al-Mulk", "Ar-Rahman"], why: "He used to recite in them Qaf, and The Hour drew near." },
        { tf: true, q: "Ibn Kathir says these surahs hold promises and warnings.", why: "Because they contain Allah's promises and warnings, and information about the origin of creation, Resurrection, Tawhid." }
      ]
    },
    {
      slug: "like-two-fingers",
      title: "Like two fingers",
      line: "He ﷺ was sent with the Hour as close as two fingers.",
      facts: ["He ﷺ is the last Messenger", "The Hour comes after his time"],
      quote: q54(1),
      source: hadith("bukhari", "6503", "Sahl ibn Sa'd", "Sahih", "The Prophet ﷺ said he was sent and the Hour is like these two, showing two of his fingers.", "I have been sent and the Hour"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ show to explain the nearness?", a: "Two of his fingers", wrong: ["The setting sun", "A grain of sand", "A palm tree"], why: "I have been sent and the Hour (is at hand) as these two, showing his two fingers." },
        { q: "Which name of his ﷺ means the Gatherer?", a: "Al-Hashir", wrong: ["Al-Amin", "Al-Mahi", "Al-Aqib"], why: "Al-Hashir (literally the Gatherer), among the names of the Messenger of Allah." },
        { tf: false, q: "Many prophets will come after him ﷺ before the Hour.", why: "He is the first to be gathered, and all people will be gathered thereafter." }
      ]
    },
    {
      slug: "the-moon-split",
      title: "The moon split",
      line: "Makkah asked for a miracle, and the moon split in two.",
      facts: ["Mount Hira was seen between the halves", "A clear miracle of his ﷺ"],
      quote: q54(1),
      source: hadith("bukhari", "3868", "Anas ibn Malik", "Sahih", "Anas said the people of Makkah asked for a miracle, so the Prophet ﷺ showed them the moon split in two, with Hira between.", "the moon split in two halves between which they saw the Hira"),
      difficulty: 2,
      questions: [
        { q: "Who asked for a miracle, per Anas?", a: "The people of Makkah", wrong: ["The people of Yemen", "The Romans", "The Persians"], why: "The people of Mecca asked Allah's Messenger to show them a miracle." },
        { q: "What mountain was seen between the halves?", a: "Hira", wrong: ["Uhud", "Sinai", "Arafat"], why: "He showed them the moon split in two halves between which they saw the Hira' mountain." },
        { tf: true, q: "Ibn Kathir says the moon split is reported by many chains.", why: "It occurred during the time of Allah's Messenger according to the authentic Mutawatir Hadiths." }
      ]
    },
    {
      slug: "bear-witness",
      title: "Bear witness",
      line: "When the moon split, he ﷺ told the people to bear witness.",
      facts: ["Ibn Masud saw it himself", "One part was over the mountain"],
      quote: q54(1),
      source: hadith("bukhari", "4864", "Abdullah ibn Mas'ud", "Sahih", "Ibn Masud said the moon split in two in the Prophet's ﷺ lifetime, one part over the mountain, and he said: Witness.", "one part remained over the mountain"),
      difficulty: 3,
      questions: [
        { q: "What did he ﷺ say when the moon split?", a: "Witness this", wrong: ["Be silent", "Go home", "Look away"], why: "Allah's Messenger said, Witness this miracle." },
        { q: "Where was one part of the moon, per Ibn Masud?", a: "Over the mountain", wrong: ["In the sea", "On the Kabah", "Under the earth"], why: "One part remained over the mountain, and the other part went beyond the mountain." },
        { tf: true, q: "Ibn Masud said he saw the mountain between the two parts.", why: "I saw the mountain between the two parts of the moon when it was split." }
      ]
    },
    {
      slug: "they-call-it-magic",
      title: "They call it magic",
      line: "When they see a sign, they turn away and call it magic.",
      facts: ["Mustamir means it will soon pass", "They left the proof behind them"],
      quote: q54(2),
      source: ik(2, "Ibn Kathir says when they see a proof they do not believe; they say it is magic that will soon go away.", "will soon go away"),
      difficulty: 2,
      questions: [
        { q: "What did they call the sign, in 54:2?", a: "Magic", wrong: ["A dream", "A cloud", "A poem"], why: "And say: This is magic, Mustamir." },
        { q: "What does Mustamir mean, per Mujahid?", a: "It will soon go away", wrong: ["It is very strong", "It is a gift", "It is old"], why: "Mustamir, means, will soon go away, according to Mujahid, Qatadah and several others." },
        { tf: false, q: "The Quraysh accepted the split moon as a true sign.", why: "The Quraysh said that the cleaving of the moon was false and will soon diminish and fade away." }
      ]
    },
    {
      slug: "they-followed-desires",
      title: "They followed desires",
      line: "They denied and followed desires; every matter will settle.",
      facts: ["Desires pulled them from the truth", "Each deed leads to its end"],
      quote: q54(3),
      source: ik(3, "Ibn Kathir says good deeds take their doers to good, and evil deeds take their doers to evil.", "the good deeds will take their doers to all that is good"),
      difficulty: 2,
      questions: [
        { q: "What did they follow, in 54:3?", a: "Their own desires", wrong: ["Their Prophet", "The stars", "Their scholars"], why: "They denied and followed their own lusts." },
        { q: "Where do good deeds take their doers?", a: "To all that is good", wrong: ["Nowhere", "To fame", "To wealth"], why: "The good deeds will take their doers to all that is good and righteous." },
        { tf: true, q: "Mujahid said every matter settles on the Day of Resurrection.", why: "Mujahid commented by saying, On the Day of Resurrection." }
      ]
    },
    {
      slug: "news-that-warns",
      title: "News that warns",
      line: "The Quran brought them news of past nations to warn them.",
      facts: ["Stories of nations who denied", "Lessons to stop the denial"],
      quote: q54(4),
      source: ik(4, "Ibn Kathir says the Quran brought them news of earlier nations that denied their Messengers, as warnings and lessons.", "wherein there are warnings and lessons"),
      difficulty: 2,
      questions: [
        { q: "What news came to them in the Quran?", a: "News of earlier nations", wrong: ["News of trade", "News of the weather", "News of poets"], why: "There has come to them the news of the earlier nations that disbelieved in their Messengers." },
        { q: "What does Muzdajar hold, per Ibn Kathir?", a: "Warnings and lessons", wrong: ["Riddles", "Songs", "Prices"], why: "Wherein there are warnings and lessons to stop them from idolatry." },
        { tf: true, q: "The stories are meant to stop people from idolatry.", why: "Warnings and lessons to stop them from idolatry and persisting in denial." }
      ]
    },
    {
      slug: "perfect-wisdom",
      title: "Perfect wisdom",
      line: "The Quran is perfect wisdom, yet warnings help not the stubborn.",
      facts: ["Allah guides whom He wills", "Warnings do not help sealed hearts"],
      quote: q54(5),
      source: ik(5, "Ibn Kathir says Allah guides whom He wills, and warnings do not help those whose hearts are sealed.", "Allah guides whomever He wills"),
      difficulty: 3,
      questions: [
        { q: "How does 54:5 describe the message?", a: "Perfect wisdom", wrong: ["A short story", "A riddle", "A poem"], why: "Perfect wisdom, but warners benefit them not." },
        { q: "Whom do warnings not benefit, per Ibn Kathir?", a: "Those with sealed hearts", wrong: ["The young", "The poor", "Travelers"], why: "The preaching of warnings does not benefit those upon whom Allah has written misery and sealed their hearts." },
        { q: "Which ayah does Ibn Kathir link with 54:5?", a: "10:101", wrong: ["2:255", "1:1", "112:1"], why: "But neither Ayat nor warners benefit those who believe not. (10:101)" }
      ]
    },
    {
      slug: "the-caller-calls",
      title: "The caller calls",
      line: "Turn from them; a Day comes when the caller calls.",
      facts: ["The caller calls to the Reckoning", "A hard and serious Day"],
      quote: q54(6),
      source: ik(6, "Ibn Kathir says Allah tells the Prophet ﷺ to turn away from those who deny, and wait for the Day the caller calls.", "turn away from these people who"),
      difficulty: 2,
      questions: [
        { q: "What was he ﷺ told to do, in 54:6?", a: "Turn away from them", wrong: ["Fight them", "Follow them", "Beg them"], why: "O Muhammad, turn away from these people." },
        { q: "To what does the caller call, per Ibn Kathir?", a: "To the Recompense", wrong: ["To a feast", "To a market", "To a race"], why: "The Day that the caller will call them to the Recompense." },
        { tf: true, q: "They denied the miracle and called it continuous magic.", why: "When they witness a miracle, they deny it and say that this is continuous magic." }
      ]
    },
    {
      slug: "like-spreading-locusts",
      title: "Like spreading locusts",
      line: "They come out of their graves like locusts spreading out.",
      facts: ["Eyes lowered in shame", "Huge crowds in a hurry"],
      quote: q54(7),
      source: ik(7, "Ibn Kathir says they rush to the place of Reckoning in crowds, like locusts spreading everywhere.", "as if they were crowds of locusts spreading all about"),
      difficulty: 2,
      questions: [
        { q: "What are people compared to, in 54:7?", a: "Spreading locusts", wrong: ["Birds", "Fish", "Ants"], why: "As if they were locusts spread abroad." },
        { q: "Where do they come out from?", a: "Their graves", wrong: ["Their houses", "The sea", "The mountains"], why: "They will come forth from their graves." },
        { tf: true, q: "They rush to the place of Reckoning in great crowds.", why: "They will gather towards the area of Reckoning in such haste and crowds." }
      ]
    },
    {
      slug: "a-hard-day",
      title: "A hard Day",
      line: "They hurry to the caller; deniers say this is a hard Day.",
      facts: ["No one can slow down", "Hard for those who denied"],
      quote: q54(8),
      source: ik(8, "Ibn Kathir says they rush to the caller without slowing down, and the deniers call it a hard Day.", "without being able to hesitate or slow down"),
      difficulty: 2,
      questions: [
        { q: "What do disbelievers say of that Day?", a: "This is a hard Day", wrong: ["This is an easy Day", "This is a feast", "We are ready"], why: "The disbelievers will say: This is a hard Day." },
        { q: "Can anyone slow down on the way?", a: "No, all hurry to the caller", wrong: ["Yes, the strong", "Yes, the rich", "Only kings"], why: "Towards the caller without being able to hesitate or slow down." },
        { q: "Which ayah does Ibn Kathir link with 54:8?", a: "74:9-10", wrong: ["2:286", "36:1", "55:13"], why: "Truly, that Day will be a Hard Day, far from easy for the disbelievers. (74:9-10)" }
      ]
    },
    {
      slug: "easy-for-the-believers",
      title: "Easy for the believers",
      line: "A hard Day for disbelievers means an easy Day for believers.",
      facts: ["As-Sa'di explains", "Read what is implied"],
      quote: q54(8),
      source: saadi(54, 8, "As-Sa'di says the disbelievers call it a hard Day, as Allah says it is not easy for the disbelievers, and what this implies is that it is easy for the believers.", "مفهوم ذلك أنه يسير سهل على المؤمنين"),
      difficulty: 2,
      questions: [
        { q: "If the Day is hard for disbelievers, for believers it is...?", a: "Easy", wrong: ["Harder", "The same", "Forgotten"], why: "It implies the Day is easy for the believers, says as-Sa'di." },
        { q: "Who calls it a hard Day in Al-Qamar 54:8?", a: "The disbelievers", wrong: ["The angels", "The prophets", "The believers"], why: "The disbelievers say: this is a hard day." },
        { tf: true, q: "People rush toward the caller on that Day.", why: "As-Sa'di on 54:8." }
      ]
    },
    {
      slug: "nuh-was-denied",
      title: "Nuh was denied",
      line: "The people of Nuh denied him and called him mad.",
      facts: ["They called him a madman", "They threatened and warned him"],
      quote: q54(9),
      source: ik(9, "Ibn Kathir says Nuh's people denied him completely, called him mad, and threatened him.", "they denied him categorically and accused him of madness"),
      difficulty: 1,
      questions: [
        { q: "What did Nuh's people call him, in 54:9?", a: "A madman", wrong: ["A king", "A poet", "A merchant"], why: "And said: A madman! Wazdujir." },
        { q: "What did Ibn Zayd say Wazdujir means?", a: "He was threatened and warned", wrong: ["He was rewarded", "He was crowned", "He fell ill"], why: "He was rebuked, deterred, threatened and warned by his people." },
        { tf: true, q: "In 54:9, Allah calls Nuh Our servant.", why: "They rejected Our servant." }
      ]
    },
    {
      slug: "help-me",
      title: "Help me",
      line: "Nuh called on his Lord: I am overcome, so help me.",
      facts: ["Nuh asked help for the religion", "He made his dua to Allah alone"],
      quote: q54(10),
      source: ik(10, "Ibn Kathir explains Nuh's dua: I am weak and cannot resist my people, so help Your religion.", "I am weak and cannot overcome or resist my people"),
      difficulty: 2,
      questions: [
        { q: "What did Nuh say, in 54:10?", a: "I have been overcome, so help me", wrong: ["I am the strongest", "I will leave", "I am tired of dua"], why: "Then he invoked his Lord: I have been overcome, so help me!" },
        { q: "What did Nuh ask Allah to help, per Ibn Kathir?", a: "His religion", wrong: ["His crops", "His house", "His fame"], why: "I am weak and cannot overcome or resist my people, so help Your religion!" },
        { tf: true, q: "Nuh turned to Allah when his people overpowered him.", why: "Then he invoked his Lord." }
      ]
    },
    {
      slug: "gates-of-heaven-open",
      title: "Gates of heaven open",
      line: "Allah opened the gates of the sky with pouring water.",
      facts: ["Munhamir means abundant", "Not rain from clouds, per Ibn Abbas"],
      quote: q54(11),
      source: ik(11, "Ibn Kathir reports Ibn Abbas: the gates of the sky were opened that day, so the water was not from clouds.", "the water that came down was not from clouds"),
      difficulty: 2,
      questions: [
        { q: "What did As-Suddi say Munhamir means?", a: "Abundant", wrong: ["Salty", "Frozen", "Little"], why: "As-Suddi said about Munhamir, It means abundant." },
        { q: "Per Ibn Abbas, where did that water come from?", a: "The opened gates of the sky", wrong: ["Ordinary clouds", "A river", "A well"], why: "The sky's gates were opened on them that day, and therefore, the water that came down was not from clouds." },
        { tf: false, q: "The flood water came only from normal rain clouds.", why: "The water that came down was not from clouds." }
      ]
    },
    {
      slug: "springs-from-the-earth",
      title: "Springs from the earth",
      line: "Springs burst from the earth, and the waters met as decreed.",
      facts: ["Water rose from every part", "Sky and earth water met"],
      quote: q54(12),
      source: ik(12, "Ibn Kathir says springs gushed from every part of the earth, and the waters of sky and earth met as Allah ordained.", "water and springs gushed forth"),
      difficulty: 2,
      questions: [
        { q: "What gushed forth from the earth, in 54:12?", a: "Springs", wrong: ["Fire", "Gold", "Sand"], why: "And We caused springs to gush forth from the earth." },
        { q: "Which waters met, per Ibn Kathir?", a: "Of the sky and the earth", wrong: ["Of two rivers", "Of two seas", "Of two wells"], why: "So, the waters met, means, of the heaven and the earth." },
        { tf: true, q: "Even ovens with fire in them gushed with water.", why: "Even ovens in which fire was burning, water and springs gushed forth." }
      ]
    },
    {
      slug: "planks-and-nails",
      title: "Planks and nails",
      line: "Allah carried Nuh on a ship of planks and nails.",
      facts: ["Dusur means nails", "A simple ship, saved by Allah"],
      quote: q54(13),
      source: ik(13, "Ibn Kathir says Ibn Abbas and others said Dusur means nails, and Ibn Jarir preferred this view.", "Dusur means nails"),
      difficulty: 2,
      questions: [
        { q: "What was the ship made of, in 54:13?", a: "Planks and nails", wrong: ["Stone", "Glass", "Gold"], why: "And We carried him on a ship made of planks and nails." },
        { q: "What does Dusur mean, per Ibn Abbas?", a: "Nails", wrong: ["Sails", "Ropes", "Oars"], why: "Ibn Abbas, Said bin Jubayr, Al-Qurazi, Qatadah and Ibn Zayd said that Dusur means nails." },
        { tf: true, q: "Ibn Jarir preferred the view that Dusur means nails.", why: "Ibn Jarir preferred this view." }
      ]
    },
    {
      slug: "under-our-protection",
      title: "Under Our protection",
      line: "The ship sailed by Allah's command, a reward for Nuh.",
      facts: ["Guarded by Allah's command", "A reward for the one rejected"],
      quote: q54(14),
      source: ik(14, "Ibn Kathir says the ship floated by Allah's command and under His protection, as a reward for Nuh.", "by Our command and under Our protection and observation"),
      difficulty: 2,
      questions: [
        { q: "How did the ship sail, per Ibn Kathir?", a: "By Allah's command and protection", wrong: ["By luck", "By the wind alone", "By Nuh's strength"], why: "By Our command and under Our protection and observation." },
        { q: "The saving of Nuh was a reward for whom?", a: "The one who was rejected", wrong: ["The deniers", "The kings", "The sailors"], why: "A reward for him who had been rejected." },
        { tf: true, q: "Nuh was rewarded after his people rejected him.", why: "As reward for Nuh, peace be upon him." }
      ]
    },
    {
      slug: "left-as-a-sign",
      title: "Left as a sign",
      line: "Allah left this as a sign; is there anyone who will remember?",
      facts: ["Ships remain a sign for us", "Allah asks: who will remember?"],
      quote: q54(15),
      source: ik(15, "Ibn Kathir says the meaning seems to be that Allah kept ships as a sign for people, as in 36:41-42.", "Allah kept ships as a sign"),
      difficulty: 3,
      questions: [
        { q: "What did Allah leave as a sign, per Ibn Kathir?", a: "Ships", wrong: ["Towers", "Coins", "Gardens"], why: "It appears that the meaning is that Allah kept ships as a sign." },
        { q: "What did Qatadah say remained for a time?", a: "The ship of Nuh", wrong: ["The tower of Babel", "A golden calf", "A palace"], why: "Allah left the ship of Nuh intact until the first generation of this Ummah were able to see it." },
        { q: "Which ayahs does Ibn Kathir cite for ships?", a: "36:41-42", wrong: ["2:1-2", "112:1-2", "18:1-2"], why: "And a sign for them is that We bore their offspring in the laden ship. (36:41-42)" }
      ]
    },
    {
      slug: "fahal-min-muddakir",
      title: "Fahal min muddakir",
      line: "He ﷺ taught Ibn Masud to say Muddakir, with a d.",
      facts: ["Ibn Masud recited to him ﷺ", "He ﷺ corrected the word"],
      quote: q54(15),
      source: hadith("bukhari", "4874", "Abdullah ibn Mas'ud", "Sahih", "Ibn Masud recited Fahal min Mudhdhakir, and the Prophet ﷺ said: It is Fahal min Muddakir.", "It is Fahal-min Muddakir"),
      difficulty: 3,
      questions: [
        { q: "How did he ﷺ say the word should be read?", a: "Muddakir", wrong: ["Mudhdhakir", "Mudakkar", "Madhkur"], why: "The Prophet ﷺ said, It is Fahal-min Muddakir." },
        { q: "Who recited the ayah before him ﷺ?", a: "Abdullah ibn Masud", wrong: ["Abu Hurayrah", "Anas", "Aishah"], why: "Narrated Abdullah: I recited before the Prophet ﷺ." },
        { tf: true, q: "Fahal min muddakir means: is there any who will remember?", why: "Then is there any that will remember?" }
      ]
    },
    {
      slug: "my-warnings",
      title: "My warnings",
      line: "How was Allah's punishment, and His warnings?",
      facts: ["Allah punished those who denied", "He helped His Messengers"],
      quote: q54(16),
      source: ik(16, "Ibn Kathir says Allah asks how His punishment was on deniers, and how He helped His Messengers.", "How was My help that I extended to My Messengers"),
      difficulty: 2,
      questions: [
        { q: "What does 54:16 ask about?", a: "Allah's torment and warnings", wrong: ["The weather", "The ship's size", "The harvest"], why: "Then how terrible was My torment and My warnings?" },
        { q: "Whom did Allah help, per Ibn Kathir?", a: "His Messengers", wrong: ["The deniers", "The rich", "The proud"], why: "How was My help that I extended to My Messengers." },
        { tf: false, q: "The deniers in 54:16 heeded the warnings.", why: "Those who disbelieved in Me and denied My Messengers, who did not heed to My warnings." }
      ]
    },
    {
      slug: "the-quran-made-easy",
      title: "The Quran made easy",
      line: "Allah made the Quran easy to remember; who will remember?",
      facts: ["Easy to recite and to understand", "Allah invites us to remember"],
      quote: q54(17),
      source: ik(17, "Ibn Kathir says Allah made the Quran easy to recite and understand for those who seek it.", "easy to recite and comprehend for those who seek these traits"),
      difficulty: 1,
      questions: [
        { q: "What did Allah make easy, in 54:17?", a: "The Quran", wrong: ["Wealth", "Travel", "Trade"], why: "And We have indeed made the Quran easy to understand and remember." },
        { q: "Easy for whom, per Ibn Kathir?", a: "Those who seek it", wrong: ["Only scholars", "Only Arabs", "No one"], why: "Easy to recite and comprehend for those who seek these traits." },
        { q: "What did Al-Qurazi say the question means?", a: "Is there anyone who will avoid evil?", wrong: ["Who is the richest?", "Who will travel?", "Who can count?"], why: "Muhammad bin Kab Al-Qurazi commented: Is there anyone who will avoid evil?" }
      ]
    },
    {
      slug: "easiest-and-greatest",
      title: "Easiest and greatest",
      line: "Learning the Quran is the easiest and greatest of all knowledge.",
      facts: ["As-Sa'di explains", "Words to memorize, meanings to grasp"],
      quote: q54(17),
      source: saadi(54, 17, "As-Sa'di says Allah made the Quran's words easy to memorize and its meanings easy to understand, so knowing the Quran by memory and meaning is the easiest and greatest of all knowledge.", "ولهذا كان علم القرآن حفظا وتفسيرا، أسهل العلوم، وأجلها على الإطلاق"),
      difficulty: 1,
      questions: [
        { q: "Which knowledge is easiest and greatest, per as-Sa'di?", a: "Knowledge of the Quran", wrong: ["Knowledge of poetry", "Knowledge of trade", "Knowledge of stars"], why: "Quran memory and meaning is the easiest and greatest knowledge, says as-Sa'di." },
        { q: "What did Allah make easy about the Quran?", a: "Its words and meanings", wrong: ["Only its words", "Only its cover", "Nothing"], why: "Words easy to memorize, meanings easy to understand." },
        { tf: true, q: "Whoever turns to the Quran, Allah makes it easy for him.", why: "As-Sa'di on 54:17." }
      ]
    },
    {
      slug: "learn-and-teach",
      title: "Learn and teach",
      line: "The best of you learn the Quran and teach it.",
      facts: ["The Quran is easy to learn", "Teaching it is a great honor"],
      quote: q54(17),
      source: hadith("bukhari", "5027", "Uthman ibn Affan", "Sahih", "The Prophet ﷺ said the best among you are those who learn the Quran and teach it.", "The best among you"),
      difficulty: 1,
      questions: [
        { q: "Who are the best, per Bukhari 5027?", a: "Who learn and teach the Quran", wrong: ["The richest", "The tallest", "The oldest"], why: "The best among you are those who learn the Quran and teach it." },
        { q: "Who narrated Bukhari 5027?", a: "Uthman", wrong: ["Umar", "Ali", "Anas"], why: "Narrated Uthman." },
        { tf: true, q: "Allah made the Quran easy, so all can learn it.", why: "We have indeed made the Quran easy to understand and remember." }
      ]
    }
  ]
};

/** Ayahs 18 to 40: the stories of Ad, Thamud and the people of Lut, each ending with the call to remember. */
const QAMAR_TWO: DeepUnit = {
  key: "qamar2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-54",
  name: "Al-Qamar, ayahs 18 to 40",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Qamar",
  lessons: [
    {
      slug: "ad-denied",
      title: "Ad denied",
      line: "The people of Ad denied Hud, as Nuh's people did.",
      facts: ["Ad were the people of Hud", "They followed the path of denial"],
      quote: q54(18),
      source: ik(18, "Ibn Kathir says Ad, the people of Hud, denied their Messenger just as the people of Nuh did.", "denied their Messenger, just as the people of Nuh did"),
      difficulty: 1,
      questions: [
        { q: "Who was sent to the people of Ad?", a: "Hud", wrong: ["Salih", "Lut", "Shuayb"], why: "Ad, the People of Hud, denied their Messenger." },
        { q: "Whom did Ad copy in denying?", a: "The people of Nuh", wrong: ["The people of Musa", "The people of Isa", "Nobody"], why: "Just as the people of Nuh did." },
        { tf: true, q: "54:18 asks how Allah's punishment and warnings were.", why: "Ad denied; then how was My torment and My warnings?" }
      ]
    },
    {
      slug: "a-cold-wind",
      title: "A cold wind",
      line: "Allah sent on Ad a bitterly cold, furious wind.",
      facts: ["Sarsar means very cold and furious", "On a day of ongoing calamity"],
      quote: q54(19),
      source: ik(19, "Ibn Kathir says Sarsar is a bitterly cold and furious wind, sent on a day of calamity.", "a bitterly cold and furious wind"),
      difficulty: 2,
      questions: [
        { q: "What did Allah send on Ad, in 54:19?", a: "A violently cold wind", wrong: ["A flood", "A fire", "An earthquake"], why: "We sent against them a violently cold (Sarsar) wind." },
        { q: "What does Sarsar mean, per Ibn Kathir?", a: "Bitterly cold and furious", wrong: ["Hot and dry", "Soft and calm", "Wet and warm"], why: "A bitterly cold and furious wind." },
        { tf: true, q: "Ibn Kathir says their calamity continued into the Hereafter.", why: "The calamity, torment and destruction that they suffered in this life on that day continued with that of the Hereafter." }
      ]
    },
    {
      slug: "east-wind-and-west-wind",
      title: "East wind and west wind",
      line: "The east wind helped him ﷺ; the west wind ended Ad.",
      facts: ["As-Saba helped him ﷺ", "Ad-Dabur struck Ad"],
      quote: q54(19),
      source: hadith("bukhari", "1035", "Ibn Abbas", "Sahih", "The Prophet ﷺ said he was given victory with the east wind, and Ad were destroyed by the west wind.", "I was granted victory with As-Saba"),
      difficulty: 3,
      questions: [
        { q: "Which wind helped him ﷺ, per Bukhari 1035?", a: "As-Saba", wrong: ["Ad-Dabur", "The north wind", "A sandstorm"], why: "I was granted victory with As-Saba." },
        { q: "Which wind destroyed Ad?", a: "Ad-Dabur, the westerly", wrong: ["As-Saba", "A warm breeze", "A sea wind"], why: "The nation of Ad was destroyed by Ad-Dabur (westerly wind)." },
        { tf: true, q: "Winds work only by the command of Allah.", why: "We sent against them a violently cold (Sarsar) wind." }
      ]
    },
    {
      slug: "like-uprooted-palms",
      title: "Like uprooted palms",
      line: "The wind tore them out like uprooted date palm trunks.",
      facts: ["Tall and strong people fell", "Strength did not save them"],
      quote: q54(20),
      source: ik(20, "Ibn Kathir explains that the wind lifted them up and threw them down, leaving them like uprooted palm trunks.", "as if they were uprooted stems of date palms"),
      difficulty: 2,
      questions: [
        { q: "What were Ad likened to, in 54:20?", a: "Uprooted date palm trunks", wrong: ["Fallen leaves", "Broken pots", "Scattered stones"], why: "Plucking out men as if they were uprooted stems of date palms." },
        { q: "What did the wind do to them?", a: "Plucked them out", wrong: ["Warmed them", "Carried rain", "Calmed them"], why: "Plucking out men." },
        { tf: false, q: "Their great strength protected them from the wind.", why: "Plucking out men as if they were uprooted stems of date palms." }
      ]
    },
    {
      slug: "how-was-my-warning",
      title: "How was My warning?",
      line: "Again Allah asks: how was My punishment and My warning?",
      facts: ["The question repeats after each story", "So we stop and reflect"],
      quote: q54(21),
      source: ik(21, "Ibn Kathir quotes the ayahs that end the story of Ad: how was My torment and My warnings, and the Quran is made easy.", "Then, how was My torment and My warnings"),
      difficulty: 1,
      questions: [
        { q: "What does 54:21 ask again?", a: "How were Allah's torment and warnings", wrong: ["Who built the ship", "Where Ad lived", "When the wind ended"], why: "Then, how was My torment and My warnings?" },
        { q: "Which story ends with 54:21?", a: "The story of Ad", wrong: ["The story of Musa", "The story of Yusuf", "The story of Maryam"], why: "The Story of Ad." },
        { tf: true, q: "Al-Qamar repeats this question after the stories.", why: "Then, how was My torment and My warnings?" }
      ]
    },
    {
      slug: "easy-to-remember-again",
      title: "Easy to remember, again",
      line: "Allah repeats: the Quran is made easy, so who will remember?",
      facts: ["The same ayah as 54:17", "A call after every story"],
      quote: q54(22),
      source: ik(22, "Ibn Kathir closes the story of Ad with the repeated ayah: the Quran is easy to remember.", "We have indeed made the Qur"),
      difficulty: 1,
      questions: [
        { q: "Which earlier ayah does 54:22 repeat?", a: "54:17", wrong: ["54:1", "54:9", "54:49"], why: "And We have indeed made the Quran easy to understand and remember; then is there any that will remember?" },
        { q: "What is the call in 54:22?", a: "Is there any who will remember?", wrong: ["Who is the strongest?", "Who owns the most?", "Who came first?"], why: "Then is there any that will remember?" },
        { tf: true, q: "The repeated ayah reminds us after each nation's story.", why: "We have indeed made the Quran easy to understand and remember; then is there any that will remember?" }
      ]
    },
    {
      slug: "thamud-denied",
      title: "Thamud denied",
      line: "Thamud denied the warnings of their Messenger Salih.",
      facts: ["Salih was sent to Thamud", "They rejected his warnings"],
      quote: q54(23),
      source: ik(23, "Ibn Kathir says the people of Thamud denied their Messenger Salih.", "the people of Thamud denied their Messenger Salih"),
      difficulty: 1,
      questions: [
        { q: "Who was sent to Thamud?", a: "Salih", wrong: ["Hud", "Lut", "Nuh"], why: "The people of Thamud denied their Messenger Salih." },
        { q: "What did Thamud deny, in 54:23?", a: "The warnings", wrong: ["Their crops", "Their houses", "Their elders"], why: "Thamud denied the warnings." },
        { tf: false, q: "Thamud believed in Salih at once.", why: "The people of Thamud denied their Messenger Salih." }
      ]
    },
    {
      slug: "a-man-alone",
      title: "A man alone",
      line: "They said: shall we follow one man from among us?",
      facts: ["Pride stopped them", "They feared loss if they followed"],
      quote: q54(24),
      source: ik(24, "Ibn Kathir says they claimed they would fail and lose if they all followed one man from among them.", "We would have earned failure and loss"),
      difficulty: 2,
      questions: [
        { q: "What did Thamud ask, in 54:24?", a: "Shall we follow one man?", wrong: ["Shall we build a ship?", "Shall we travel?", "Shall we fast?"], why: "A man, alone among us, shall we follow him?" },
        { q: "What did they think following him would bring?", a: "Failure and loss", wrong: ["Wealth", "Rain", "Victory"], why: "We would have earned failure and loss if we all submitted to a man from among us." },
        { tf: true, q: "They were amazed the Reminder came to him alone.", why: "They were amazed that the Reminder was sent to him alone among them." }
      ]
    },
    {
      slug: "why-messengers-are-human",
      title: "Why Messengers are human",
      line: "Allah sent human Messengers so people could learn from them.",
      facts: ["As-Sa'di explains", "Mercy and wisdom"],
      quote: q54(25),
      source: saadi(54, 25, "As-Sa'di says it is from Allah's mercy and wisdom that the Messengers were human, because if they were angels, people could not have learned from them.", "ومن رحمته وحكمته أن كانوا من البشر"),
      difficulty: 2,
      questions: [
        { q: "Why were the Messengers human, per as-Sa'di?", a: "So people could learn from them", wrong: ["Angels were busy", "By chance", "To be weak"], why: "If they were angels, people could not learn from them, says as-Sa'di." },
        { q: "What made the Messengers fit for the message?", a: "Gifts and character from Allah", wrong: ["Their wealth", "Their tribe", "Their strength"], why: "Allah favoured them with qualities that made them fit." },
        { tf: true, q: "Sending human Messengers is a mercy from Allah.", why: "As-Sa'di on 54:25." }
      ]
    },
    {
      slug: "they-called-him-a-liar",
      title: "They called him a liar",
      line: "They called Salih an insolent liar.",
      facts: ["They wrongly accused him", "Pride made them deny"],
      quote: q54(25),
      source: ik(25, "Ibn Kathir says they were amazed the Reminder came to Salih alone, and so they called him a liar.", "and therefore, accused him of being a liar"),
      difficulty: 2,
      questions: [
        { q: "What did they call Salih, in 54:25?", a: "An insolent liar", wrong: ["A wise man", "A king", "A healer"], why: "Nay, he is an insolent liar!" },
        { q: "Why did they call him a liar, per Ibn Kathir?", a: "The Reminder came to him alone", wrong: ["He was poor", "He was young", "He was a stranger"], why: "They were amazed that the Reminder was sent to him alone among them, and therefore, accused him of being a liar." },
        { tf: false, q: "Salih had lied to his people before.", why: "Thamud wrongly accused their Messenger Salih." }
      ]
    },
    {
      slug: "tomorrow-they-will-know",
      title: "Tomorrow they will know",
      line: "Soon they will know who the real liar is.",
      facts: ["A warning to Thamud", "A sure promise from Allah"],
      quote: q54(26),
      source: ik(26, "Ibn Kathir says this warns and threatens them, and is a sure promise.", "delivering a sure promise to them"),
      difficulty: 2,
      questions: [
        { q: "What will they know, in 54:26?", a: "Who the insolent liar is", wrong: ["Who is richest", "Where to travel", "When it rains"], why: "Tomorrow they will come to know who is the liar, the insolent one!" },
        { q: "What is 54:26, per Ibn Kathir?", a: "A warning and a sure promise", wrong: ["A joke", "A question", "A trade deal"], why: "Thus warning and threatening them and delivering a sure promise to them." },
        { tf: true, q: "Allah answered their claim against Salih.", why: "Allah the Exalted responded." }
      ]
    },
    {
      slug: "the-she-camel",
      title: "The she-camel",
      line: "A she-camel was sent as a test; Salih must be patient.",
      facts: ["The camel came from solid rock", "Salih would see a good end"],
      quote: q54(27),
      source: ik(27, "Ibn Kathir says Allah sent a she-camel from solid rock as they asked, as a test, and told Salih to be patient.", "emerged from solid rock, according to their request"),
      difficulty: 2,
      questions: [
        { q: "What did Allah send as a test, in 54:27?", a: "A she-camel", wrong: ["A horse", "A ship", "A cow"], why: "Verily, We are sending the she-camel as a test for them." },
        { q: "Where did the she-camel come from?", a: "Solid rock", wrong: ["The sea", "A far land", "A market"], why: "A superb, pregnant female camel that emerged from solid rock, according to their request." },
        { q: "What was Salih told to do?", a: "Watch them and be patient", wrong: ["Leave at once", "Fight them", "Sell the camel"], why: "So watch them, and be patient!" }
      ]
    },
    {
      slug: "water-by-turns",
      title: "Water by turns",
      line: "The water was shared: a day for her, a day for them.",
      facts: ["Each had a set drinking day", "On her day, they drank her milk"],
      quote: q54(28),
      source: ik(28, "Ibn Kathir says the water was one day for the camel and one day for them. Mujahid said they drank her milk on her day.", "one day for her to drink and one day for them to drink"),
      difficulty: 2,
      questions: [
        { q: "How was the water shared, in 54:28?", a: "By turns, day by day", wrong: ["All for them", "All for her", "Only at night"], why: "One day for her to drink and one day for them to drink." },
        { q: "What did they drink on her day, per Mujahid?", a: "Her milk", wrong: ["Rain water", "Juice", "Nothing"], why: "When she drank, they would drink her milk." },
        { tf: true, q: "Ibn Kathir links 54:28 with 26:155.", why: "It has a right to drink, and you have a right to drink on a day, known. (26:155)" }
      ]
    },
    {
      slug: "they-harmed-the-camel",
      title: "They harmed the camel",
      line: "They called their worst man, and he killed the she-camel.",
      facts: ["Named Qudar bin Salif", "He was the worst among them"],
      quote: q54(29),
      source: ik(29, "Ibn Kathir says the scholars of tafsir named him Qudar bin Salif, the most evil among them.", "his name was Qudar bin Salif"),
      difficulty: 2,
      questions: [
        { q: "Who did they call, in 54:29?", a: "Their comrade", wrong: ["Their Prophet", "A stranger", "An angel"], why: "But they called their comrade and he took and killed." },
        { q: "What was his name, per the scholars?", a: "Qudar bin Salif", wrong: ["Hud", "Namrud", "Haman"], why: "His name was Qudar bin Salif; he was the evilest among them." },
        { q: "Which ayah does Ibn Kathir link with 54:29?", a: "91:12", wrong: ["2:255", "1:5", "114:1"], why: "When the most wicked man among them went forth. (91:12)" }
      ]
    },
    {
      slug: "lands-of-thamud",
      title: "The lands of Thamud",
      line: "Passing Al-Hijr, he ﷺ hurried by and said enter only weeping.",
      facts: ["Al-Hijr was the home of Thamud", "He ﷺ covered his head and hurried"],
      quote: q54(30),
      source: hadith("bukhari", "4419", "Ibn Umar", "Sahih", "Passing Al-Hijr, the Prophet ﷺ said not to enter the homes of those unjust to themselves except weeping, and he hurried past.", "Then he covered his head and made his speed fast"),
      difficulty: 3,
      questions: [
        { q: "Which place did he ﷺ pass, per Bukhari 4419?", a: "Al-Hijr", wrong: ["Badr", "Taif", "Uhud"], why: "When the Prophet ﷺ passed by Al-Hijr." },
        { q: "How did he ﷺ say to enter those homes?", a: "Only while weeping", wrong: ["Laughing", "Singing", "Shopping"], why: "Do not enter the dwelling places of those people who were unjust to themselves unless you enter in a weeping state." },
        { tf: true, q: "He ﷺ covered his head and crossed the valley fast.", why: "Then he covered his head and made his speed fast till he crossed the valley." }
      ]
    },
    {
      slug: "like-dry-straw",
      title: "Like dry straw",
      line: "One mighty Cry came, and they became like dry straw.",
      facts: ["None of them remained", "Like grass that dries and blows away"],
      quote: q54(31),
      source: ik(31, "Ibn Kathir says they all perished, like plants and grass that dry and die out.", "They all perished and none of them remained"),
      difficulty: 2,
      questions: [
        { q: "What was sent on Thamud, in 54:31?", a: "A single Sayhah, a Cry", wrong: ["A flood", "A wind", "Locusts"], why: "Verily, We sent against them a single Sayhah." },
        { q: "What did they become like?", a: "Dry straw", wrong: ["Stones", "Gold", "Trees"], why: "And they became like straw Al-Muhtazir." },
        { q: "Per Ibn Zayd, what is Hizar?", a: "A fence of dry bushes", wrong: ["A water well", "A tent", "A sword"], why: "The Arabs used to erect fences (Hizar) made of dried bushes, around their camels and cattle." }
      ]
    },
    {
      slug: "remember-after-thamud",
      title: "Remember after Thamud",
      line: "After Thamud, the call repeats: the Quran is easy, so remember.",
      facts: ["The third time this ayah comes", "Every story is a reminder"],
      quote: q54(32),
      source: ik(32, "Ibn Kathir explains the end of Thamud: they died out, like dry grass the wind scatters.", "they became like the dry grass in the desert"),
      difficulty: 2,
      questions: [
        { q: "What does 54:32 repeat?", a: "The Quran is made easy to remember", wrong: ["The ship of Nuh", "The camel's water", "The wind of Ad"], why: "And indeed, We have made the Quran easy to understand and remember." },
        { q: "What did As-Suddi say they became like?", a: "Dry grass the wind scatters", wrong: ["Rocks", "Rivers", "Clouds"], why: "They became like the dry grass in the desert when it becomes burned and the wind scatters it all about." },
        { tf: true, q: "The stories are told so we take a lesson.", why: "Then is there any that will remember?" }
      ]
    },
    {
      slug: "lut-was-denied",
      title: "Lut was denied",
      line: "The people of Lut denied the warnings of their Prophet.",
      facts: ["They did a great sin", "No nation had done it before"],
      quote: q54(33),
      source: ik(33, "Ibn Kathir says the people of Lut denied their Messenger and did a shameful sin no people had done before.", "the people of Lut defied and denied their Messenger"),
      difficulty: 1,
      questions: [
        { q: "Whose people denied, in 54:33?", a: "Lut's", wrong: ["Ibrahim's", "Yusuf's", "Musa's"], why: "The people of Lut denied the warnings." },
        { q: "What was new about their sin, per Ibn Kathir?", a: "No people had done it before", wrong: ["It was small", "It was hidden", "It was allowed"], why: "The awful immoral sin that no people in the history of mankind had committed before." },
        { tf: false, q: "The people of Lut listened to his warnings.", why: "The people of Lut defied and denied their Messenger." }
      ]
    },
    {
      slug: "saved-before-dawn",
      title: "Saved before dawn",
      line: "Allah saved Lut's family in the last hours of the night.",
      facts: ["Lut left with his daughters", "His wife stayed with her people"],
      quote: q54(34),
      source: ik(34, "Ibn Kathir says Lut's family left in the last part of the night and were saved, but his wife shared her people's end.", "They left the city in the last part of the night"),
      difficulty: 2,
      questions: [
        { q: "When was Lut's family saved, in 54:34?", a: "In the last hour of the night", wrong: ["At noon", "At sunset", "At Asr"], why: "Them We saved in the last hour of the night." },
        { q: "Who left with Lut, per Ibn Kathir?", a: "His daughters", wrong: ["His wife", "The whole town", "Nobody"], why: "Allah's Prophet Lut left Sodom with his daughters in safety, unharmed." },
        { tf: false, q: "Lut's wife was saved with him.", why: "And even Lut's wife suffered the same end as her people." }
      ]
    },
    {
      slug: "a-favor-for-the-thankful",
      title: "A favor for the thankful",
      line: "Saving Lut was a favor; so Allah rewards the thankful.",
      facts: ["Being saved is a favor from Allah", "Thankful people are rewarded"],
      quote: q54(35),
      source: ik(35, "Ibn Kathir quotes the ayah: thus do We reward him who gives thanks.", "Thus do We reward him who gives thanks"),
      difficulty: 1,
      questions: [
        { q: "Whom does Allah reward, in 54:35?", a: "Those who give thanks", wrong: ["The proud", "The lazy", "The loud"], why: "Thus do We reward him who gives thanks." },
        { q: "What was the saving of Lut, in 54:35?", a: "A favor from Allah", wrong: ["Luck", "A trade", "A trick"], why: "As a favor from Us." },
        { tf: true, q: "Thankfulness brings Allah's reward.", why: "Thus do We reward him who gives thanks." }
      ]
    },
    {
      slug: "they-doubted-the-warning",
      title: "They doubted the warning",
      line: "Lut warned them, but they doubted and disputed it.",
      facts: ["Lut warned before it came", "They argued instead of listening"],
      quote: q54(36),
      source: ik(36, "Ibn Kathir says Lut warned them before the punishment came, but they doubted and disputed the warning.", "doubted and disputed the warning"),
      difficulty: 2,
      questions: [
        { q: "What did Lut do before the punishment?", a: "He warned them", wrong: ["He hid", "He joined them", "He was silent"], why: "Before the torment struck his people, he warned them of Allah's torment and punishment." },
        { q: "How did they answer the warning?", a: "They doubted and disputed it", wrong: ["They repented", "They thanked him", "They left"], why: "They did not heed the warning, nor listen to Lut, but instead doubted and disputed the warning." },
        { tf: true, q: "Allah warns people before He punishes them.", why: "And he indeed had warned them of Our punishment." }
      ]
    },
    {
      slug: "the-guests-of-lut",
      title: "The guests of Lut",
      line: "Angels came as guests, and Lut stood to protect them.",
      facts: ["The guests were angels", "Their eyes were made blind"],
      quote: q54(37),
      source: ik(37, "Ibn Kathir says angels came to Lut as guests, he shielded them, and Jibril took away the sight of the attackers.", "while shielding his guests from them"),
      difficulty: 3,
      questions: [
        { q: "Who were Lut's guests, per Ibn Kathir?", a: "Angels", wrong: ["Traders", "Kings", "Shepherds"], why: "That is the night the angels Jibril, Mikail and Israfil came to him." },
        { q: "What did Lut do for his guests?", a: "Shielded them", wrong: ["Sent them away", "Hid himself", "Sold them food"], why: "Lut tried to fend them off, while shielding his guests from them." },
        { q: "What happened to the attackers, in 54:37?", a: "Their eyes were blinded", wrong: ["They became rich", "They fell asleep", "They flew"], why: "So, We blinded their eyes." }
      ]
    },
    {
      slug: "may-allah-have-mercy-on-lut",
      title: "Mercy on Lut",
      line: "He ﷺ said Lut wished for strong support; Allah was his support.",
      facts: ["Lut felt alone that night", "Allah is the strongest support"],
      quote: q54(37),
      source: hadith("bukhari", "3375", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: May Allah forgive Lut, he wanted to have a powerful support.", "He wanted to have a powerful support"),
      difficulty: 3,
      questions: [
        { q: "What did Lut wish for, per Bukhari 3375?", a: "A powerful support", wrong: ["Gold", "A palace", "A ship"], why: "May Allah forgive Lot: He wanted to have a powerful support." },
        { q: "Who narrated Bukhari 3375?", a: "Abu Hurayrah", wrong: ["Anas", "Ibn Umar", "Aishah"], why: "Narrated Abu Huraira." },
        { tf: true, q: "Allah saved Lut and his daughters.", why: "Allah's Prophet Lut left Sodom with his daughters in safety, unharmed." }
      ]
    },
    {
      slug: "seized-in-the-morning",
      title: "Seized in the morning",
      line: "In the early morning, a lasting punishment seized them.",
      facts: ["No way to escape it", "Just as Lut had warned"],
      quote: q54(38),
      source: ik(38, "Ibn Kathir says it was a punishment they had no way to escape or avoid.", "a torment that they had no way of escaping or avoiding"),
      difficulty: 2,
      questions: [
        { q: "When did it seize them, in 54:38?", a: "Early in the morning", wrong: ["At midnight", "At sunset", "At noon"], why: "And verily, an abiding torment seized them early in the morning." },
        { q: "Could they escape it, per Ibn Kathir?", a: "No, there was no escape", wrong: ["Yes, by running", "Yes, by hiding", "Some did by sea"], why: "A torment that they had no way of escaping or avoiding." },
        { tf: true, q: "The punishment came just as Lut had warned.", why: "He warned them of Allah's torment and punishment." }
      ]
    },
    {
      slug: "taste-my-warnings",
      title: "Taste My warnings",
      line: "They were told: taste My punishment and My warnings.",
      facts: ["They mocked the warnings", "Then the warnings came true"],
      quote: q54(39),
      source: ik(39, "Ibn Kathir quotes the ayahs closing Lut's story: taste My torment and My warnings, and the Quran is made easy.", "Then taste you My torment and My warnings"),
      difficulty: 1,
      questions: [
        { q: "What were they told to taste, in 54:39?", a: "Allah's torment and warnings", wrong: ["Sweet fruit", "Cool water", "Fresh bread"], why: "Then taste you My torment and My warnings." },
        { q: "Which story does 54:39 close?", a: "The people of Lut", wrong: ["The people of Nuh", "Ad", "Firawn"], why: "The Story of the People of Lut." },
        { tf: false, q: "The warnings of Lut never came true.", why: "An abiding torment seized them early in the morning." }
      ]
    },
    {
      slug: "remember-after-lut",
      title: "Remember after Lut",
      line: "For the fourth time: the Quran is made easy, so remember.",
      facts: ["Said after Nuh, Ad, Thamud and Lut", "Allah keeps inviting us"],
      quote: q54(40),
      source: ik(40, "Ibn Kathir quotes the call that closes Lut's story: then is there any that will remember?", "then is there any that will remember"),
      difficulty: 1,
      questions: [
        { q: "After which stories does the call repeat?", a: "Nuh, Ad, Thamud and Lut", wrong: ["Musa and Isa", "Yusuf only", "Ibrahim only"], why: "The call comes at 54:17, 54:22, 54:32 and 54:40." },
        { q: "What does the call ask?", a: "Is there any who will remember?", wrong: ["Who is the bravest?", "Who will sail?", "Who will pay?"], why: "Then is there any that will remember?" },
        { tf: true, q: "Remembering means taking a lesson and avoiding evil.", why: "Is there anyone who will avoid evil?" }
      ]
    }
  ]
};

/** Ayahs 41 to 55: Firawn, the warning to Quraysh fulfilled at Badr, everything by Qadar, and the reward of the people of Taqwa. */
const QAMAR_THREE: DeepUnit = {
  key: "qamar3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-54",
  name: "Al-Qamar, ayahs 41 to 55",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Qamar",
  lessons: [
    {
      slug: "warnings-came-to-firawn",
      title: "Warnings came to Firawn",
      line: "Warnings came to Firawn's people through Musa and Harun.",
      facts: ["Musa was helped by Harun", "Good news and warning both came"],
      quote: q54(41),
      source: ik(41, "Ibn Kathir says a Messenger came to Firawn's people, Musa supported by his brother Harun, with good news and warning.", "Musa supported by his brother Harun"),
      difficulty: 1,
      questions: [
        { q: "To whom did warnings come, in 54:41?", a: "The people of Firawn", wrong: ["The people of Ad", "The people of Saba", "The people of Yunus"], why: "And indeed, warnings came to the people of Firawn." },
        { q: "Who helped Musa, per Ibn Kathir?", a: "His brother Harun", wrong: ["His father", "Firawn's wife", "Al-Khidr"], why: "Musa supported by his brother Harun." },
        { tf: true, q: "The Messengers brought good news and warnings.", why: "Their Messengers delivered good news if they believe, and a warning if they rejected the Message." }
      ]
    },
    {
      slug: "seized-by-the-almighty",
      title: "Seized by the Almighty",
      line: "They denied all the signs, so the Almighty seized them.",
      facts: ["Great miracles were shown", "They rejected every one"],
      quote: q54(42),
      source: ik(42, "Ibn Kathir says Musa and Harun had great signs, but Firawn rejected them, and Allah took them as the Almighty does.", "Allah supported Musa and Harun with tremendous miracles and great signs"),
      difficulty: 2,
      questions: [
        { q: "How many signs did they deny, in 54:42?", a: "All of them", wrong: ["Only one", "None", "Half of them"], why: "They denied all Our signs." },
        { q: "Which two names of Allah end 54:42?", a: "Almighty, All-Capable", wrong: ["Most Kind, Most Near", "First, Last", "Light, Truth"], why: "So We seized them with a punishment of the Almighty, All-Capable." },
        { tf: true, q: "Musa and Harun were given great miracles.", why: "Allah supported Musa and Harun with tremendous miracles and great signs." }
      ]
    },
    {
      slug: "are-you-better",
      title: "Are you better?",
      line: "Are the deniers of Makkah better than those nations?",
      facts: ["A question to the Quraysh", "They had no promise of safety"],
      quote: q54(43),
      source: ik(43, "Ibn Kathir says Allah asks the idolaters of Quraysh if they are better than the destroyed nations, or have a promise of safety.", "do you have immunity from Allah"),
      difficulty: 2,
      questions: [
        { q: "Who is asked, in 54:43, per Ibn Kathir?", a: "The idolaters of Quraysh", wrong: ["The angels", "The Sahabah", "The jinn"], why: "Are your disbelievers, meaning, O idolators of the Quraysh." },
        { q: "What immunity is asked about?", a: "Immunity from Allah's punishment", wrong: ["Immunity from taxes", "Immunity from illness", "Immunity from war"], why: "Do you have immunity from Allah that the torment and punishment will not touch you?" },
        { tf: false, q: "Quraysh had a written promise of safety.", why: "Or have you immunity in the Divine Scriptures?" }
      ]
    },
    {
      slug: "a-great-multitude",
      title: "A great multitude",
      line: "They boast: we are a great crowd, and we will win.",
      facts: ["They trusted in their numbers", "Numbers cannot stop Allah"],
      quote: q54(44),
      source: ik(44, "Ibn Kathir says they believed their great gathering would help them against those who wanted to harm them.", "their great gathering will avail them"),
      difficulty: 2,
      questions: [
        { q: "What did they boast, in 54:44?", a: "We are a great multitude", wrong: ["We are humble", "We are few", "We are lost"], why: "Or say they: We are a great multitude, victorious?" },
        { q: "What did they trust, per Ibn Kathir?", a: "Their great gathering", wrong: ["Their Prophet", "Their prayers", "Their charity"], why: "Their great gathering will avail them against those who intend to harm them." },
        { tf: false, q: "A big crowd can stop Allah's decree.", why: "Their multitude will be put to flight." }
      ]
    },
    {
      slug: "they-will-turn-their-backs",
      title: "They will turn their backs",
      line: "Their crowd will be beaten, and they will turn and flee.",
      facts: ["Revealed in Makkah, fulfilled at Badr", "He ﷺ recited it at Badr"],
      quote: q54(45),
      source: ik(45, "Ibn Kathir says their gathering would scatter and be defeated.", "affirming that their gathering shall scatter, and they shall be defeated"),
      difficulty: 2,
      questions: [
        { q: "What will happen to their crowd, in 54:45?", a: "It will be put to flight", wrong: ["It will grow", "It will rule", "It will hide"], why: "Their multitude will be put to flight, and they will show their backs." },
        { q: "What did Ibn Kathir say would happen?", a: "They would scatter and lose", wrong: ["They would win", "They would make peace", "They would move away"], why: "Their gathering shall scatter, and they shall be defeated." },
        { tf: true, q: "Showing their backs means running away.", why: "They will show their backs." }
      ]
    },
    {
      slug: "the-dua-at-badr",
      title: "The dua at Badr",
      line: "At Badr he ﷺ made dua, then went out reciting 54:45.",
      facts: ["He ﷺ asked Allah for His promise", "Abu Bakr comforted him"],
      quote: q54(45),
      source: hadith("bukhari", "4875", "Ibn Abbas", "Sahih", "At Badr the Prophet ﷺ begged Allah for His promise. Abu Bakr held his hand, and he went out reciting 54:45.", "Their multitude will be put to flight, and they will show their backs"),
      difficulty: 3,
      questions: [
        { q: "Where did he ﷺ make the dua, per Bukhari 4875?", a: "In a tent at Badr", wrong: ["In a cave", "At the Kabah", "On a ship"], why: "Allah's Messenger while in a tent on the day of the Battle of Badr." },
        { q: "Who held his ﷺ hand and comforted him?", a: "Abu Bakr", wrong: ["Umar", "Ali", "Hamzah"], why: "Abu Bakr held the Prophet ﷺ by the hand and said, That is enough." },
        { tf: true, q: "He ﷺ went out reciting the promise of 54:45.", why: "So Allah's Messenger went out, reciting Their multitude will be put to flight." }
      ]
    },
    {
      slug: "the-hour-is-more-bitter",
      title: "The Hour is more bitter",
      line: "The Hour is their appointed time, harder and more bitter.",
      facts: ["Revealed in Makkah", "Aishah was a young girl then"],
      quote: q54(46),
      source: hadith("bukhari", "4876", "Aishah", "Sahih", "Aishah said 54:46 was revealed to Muhammad ﷺ at Makkah while she was a young girl at play.", "was revealed to Muhammad at Mecca while I was a playful little girl"),
      difficulty: 2,
      questions: [
        { q: "What is their appointed time, in 54:46?", a: "The Hour", wrong: ["The harvest", "The winter", "The next market"], why: "Nay, but the Hour is their appointed time." },
        { q: "Where was 54:46 revealed, per Aishah?", a: "In Makkah", wrong: ["In Madinah", "At Badr", "In Taif"], why: "Was revealed to Muhammad at Mecca while I was a playful little girl." },
        { tf: true, q: "The Hour is harder than any loss in this world.", why: "And the Hour will be more grievous and more bitter." }
      ]
    },
    {
      slug: "lost-in-error",
      title: "Lost in error",
      line: "The wrongdoers are lost in error and confusion.",
      facts: ["Doubt leads them astray", "True of every denier"],
      quote: q54(47),
      source: ik(47, "Ibn Kathir says the wrongdoers are led away from the truth and lost in confusion because of their doubts.", "misguided away from the truth and engulfed in confusion"),
      difficulty: 2,
      questions: [
        { q: "Where are the criminals, in 54:47?", a: "In error", wrong: ["In safety", "In Paradise", "In charge"], why: "Verily, the criminals are in error and will burn." },
        { q: "What leads them astray, per Ibn Kathir?", a: "Doubt and uncertainty", wrong: ["Hunger", "Travel", "Sleep"], why: "Because of the doubts and uncertainty they are in." },
        { tf: true, q: "Ibn Kathir says this fits every disbeliever.", why: "This description befits every disbeliever and innovator." }
      ]
    },
    {
      slug: "as-they-lived",
      title: "As they lived",
      line: "Those lost in doubt are led to the Fire on that Day.",
      facts: ["They lived not knowing the way", "They are led not knowing where"],
      quote: q54(48),
      source: ik(48, "Ibn Kathir says just as they were lost in doubt and misguided, they will be taken not knowing where they are led.", "unaware of where they will be taken"),
      difficulty: 3,
      questions: [
        { q: "Where are they taken, in 54:48?", a: "Into the Fire", wrong: ["Into a garden", "Home", "To a market"], why: "The Day they will be dragged on their faces into the Fire." },
        { q: "What were they consumed by in life?", a: "Doubt and hesitation", wrong: ["Charity", "Prayer", "Patience"], why: "Just as they were consumed in doubt, suspicion and hesitation, they ended up in the Fire." },
        { tf: true, q: "Their end matches how they lived, per Ibn Kathir.", why: "And just as they were misguided, they will end up being dragged, unaware of where they will be taken." }
      ]
    },
    {
      slug: "all-things-by-qadar",
      title: "All things by Qadar",
      line: "Allah created everything with a set measure, Qadar.",
      facts: ["Allah knew all before it happened", "He wrote all before it happened"],
      quote: q54(49),
      source: ik(49, "Ibn Kathir says Allah knew everything before it happened and recorded it before it happened.", "He knew everything that will occur before it occurred"),
      difficulty: 2,
      questions: [
        { q: "With what did Allah create all things, in 54:49?", a: "With Qadar, a set measure", wrong: ["By chance", "Without a plan", "With help"], why: "Verily, We have created all things with Qadar." },
        { q: "Which ayah does Ibn Kathir link with 54:49?", a: "25:2", wrong: ["2:2", "103:1", "114:1"], why: "He has created everything, and has measured it exactly according to its due measurements. (25:2)" },
        { tf: true, q: "Allah knew everything before it happened.", why: "He knew everything that will occur before it occurred." }
      ]
    },
    {
      slug: "even-capability",
      title: "Even skill is measured",
      line: "Everything is by measure, even weakness and skill.",
      facts: ["Taught by the Companions", "Even small things are decreed"],
      quote: q54(49),
      source: hadith("muslim", "2656", "Abdullah ibn Umar", "Sahih", "Tawus heard Companions say everything is by measure, and Ibn Umar said even incapacity and capability.", "There is a neasure for everything-even for incapacity and-capability"),
      difficulty: 3,
      questions: [
        { q: "What did the Companions say, per Muslim 2656?", a: "Everything is by measure", wrong: ["Nothing is planned", "Only big things count", "All is luck"], why: "I found some Companions of Allah's Messenger as saying: Everything is by measure." },
        { q: "What two things did Ibn Umar name?", a: "Incapacity and capability", wrong: ["Rain and wind", "Gold and silver", "Day and night"], why: "There is a measure for everything, even for incapacity and capability." },
        { tf: true, q: "Even our abilities are part of Allah's decree.", why: "There is a measure for everything, even for incapacity and capability." }
      ]
    },
    {
      slug: "fifty-thousand-years",
      title: "Fifty thousand years",
      line: "Allah wrote the measures fifty thousand years before creation.",
      facts: ["Written before the heavens and earth", "His Throne was upon the water"],
      quote: q54(49),
      source: hadith("muslim", "2653b", "Abdullah ibn Amr", "Sahih", "The Prophet ﷺ said Allah ordained the measures of creation fifty thousand years before the heavens and earth.", "fifty thousand years before He created the heavens and the earth"),
      difficulty: 3,
      questions: [
        { q: "How long before creation were measures set?", a: "Fifty thousand years", wrong: ["Ten years", "A thousand years", "One day"], why: "Allah ordained the measures of the creation fifty thousand years before He created the heavens and the earth." },
        { q: "Where was His Throne then, per Muslim 2653?", a: "Upon the water", wrong: ["Upon a mountain", "Upon the clouds", "Upon the earth"], why: "As His Throne was upon water." },
        { tf: true, q: "Allah wrote all measures before making the heavens.", why: "Before He created the heavens and the earth." }
      ]
    },
    {
      slug: "seek-help-do-not-say-if",
      title: "Seek help, do not say if",
      line: "Ask Allah for help, never give up, and avoid: if only.",
      facts: ["Say: Allah decreed it", "If only opens the door to Shaytan"],
      quote: q54(49),
      source: hadith("muslim", "2664", "Abu Hurairah", "Sahih", "The Prophet ﷺ said seek help from Allah and do not lose heart; when trouble comes, say Allah did what He ordained.", "seek help from Allah and do not lose heart"),
      difficulty: 3,
      questions: [
        { q: "Whom is Allah more pleased with, per Muslim 2664?", a: "A strong believer", wrong: ["A rich believer", "A tall believer", "A quiet believer"], why: "A strong believer is better and is more lovable to Allah than a weak believer." },
        { q: "What should we say when trouble comes?", a: "Allah did what He ordained", wrong: ["If only I had", "It is luck", "Nothing"], why: "Say: Allah did that what He had ordained to do." },
        { tf: false, q: "Saying if only I had is the best reply to trouble.", why: "Your if opens the gate for the Satan." }
      ]
    },
    {
      slug: "the-blink-of-an-eye",
      title: "The blink of an eye",
      line: "Allah's command is one word, quicker than a blink.",
      facts: ["He commands only once", "Done with no delay"],
      quote: q54(50),
      source: ik(50, "Ibn Kathir says Allah commands a thing once, and it comes to be faster than the blink of an eye.", "comes to existence faster than the blinking of an eye"),
      difficulty: 2,
      questions: [
        { q: "What is Allah's command likened to, in 54:50?", a: "The twinkling of an eye", wrong: ["A long journey", "A slow river", "A year"], why: "And Our commandment is but one as the twinkling of an eye." },
        { q: "How many times must Allah command, per Ibn Kathir?", a: "Only once", wrong: ["Twice", "Three times", "Many times"], why: "We only command a thing once, without needing to repeat the command." },
        { tf: false, q: "Allah's command can be delayed for a while.", why: "Without any delay, not even for an instant." }
      ]
    },
    {
      slug: "your-likes-destroyed",
      title: "Your likes destroyed",
      line: "Allah destroyed nations like you; who will take the lesson?",
      facts: ["Earlier nations who denied", "A call to remember again"],
      quote: q54(51),
      source: ik(51, "Ibn Kathir says your likes are the earlier nations who denied their Messengers.", "the earlier nations who denied their Messengers"),
      difficulty: 2,
      questions: [
        { q: "Who are your likes, per Ibn Kathir?", a: "Earlier nations who denied", wrong: ["The angels", "The Sahabah", "Animals"], why: "The earlier nations who denied their Messengers." },
        { q: "What does 54:51 ask at the end?", a: "Is there any who will remember?", wrong: ["Who will rule?", "Who will build?", "Who will trade?"], why: "Then is there any that will remember?" },
        { tf: true, q: "He ﷺ recited 54:51 with Muddakir.", why: "The Prophet ﷺ recited: Fahal-min Muddakir, And verily, We have destroyed nations like unto you." }
      ]
    },
    {
      slug: "all-is-in-the-records",
      title: "All is in the records",
      line: "Everything they did is written in the Books of Record.",
      facts: ["Angels keep the records", "No deed is left out"],
      quote: q54(52),
      source: ik(52, "Ibn Kathir says everything they did is recorded in the Books of Record kept by the angels.", "recorded in the Books of Record entrusted to the angels"),
      difficulty: 2,
      questions: [
        { q: "Where are deeds noted, in 54:52?", a: "In Az-Zubur, the records", wrong: ["In the stars", "In the sand", "Nowhere"], why: "And everything they have done is noted in Az-Zubur." },
        { q: "Who keeps the records, per Ibn Kathir?", a: "The angels", wrong: ["Kings", "Jinn", "Scribes of Makkah"], why: "Recorded in the Books of Record entrusted to the angels." },
        { tf: false, q: "Some deeds are never written down.", why: "Everything they did is recorded." }
      ]
    },
    {
      slug: "small-and-large",
      title: "Small and large",
      line: "Every deed, small or large, is written down.",
      facts: ["Small deeds count too", "All is counted"],
      quote: q54(53),
      source: ik(53, "Ibn Kathir says the Record leaves nothing out, large or small; all is recorded and counted.", "whether large or small, but it is recorded and counted"),
      difficulty: 2,
      questions: [
        { q: "What is written down, in 54:53?", a: "Everything, small and large", wrong: ["Only big deeds", "Only good deeds", "Only bad deeds"], why: "And everything, small and large, is written down." },
        { q: "What does the Record leave out?", a: "Nothing", wrong: ["Small deeds", "Night deeds", "Kind words"], why: "Which leave nothing, whether large or small, but it is recorded and counted." },
        { tf: true, q: "Even small deeds should be taken seriously.", why: "Everything, small and large, is written down." }
      ]
    },
    {
      slug: "a-good-intention-counts",
      title: "A good intention counts",
      line: "Even intending a good deed is written as a good deed.",
      facts: ["Good deeds are multiplied", "Allah is generous in writing"],
      quote: q54(53),
      source: hadith("bukhari", "6491", "Abdullah ibn Abbas", "Sahih", "The Prophet ﷺ said Allah writes good and bad deeds; one who intends good but does not do it gets a full good deed.", "Allah will write for him a full good deed"),
      difficulty: 3,
      questions: [
        { q: "What is written for intending good, per Bukhari 6491?", a: "A full good deed", wrong: ["Nothing", "Half a deed", "A bad deed"], why: "If somebody intends to do a good deed and he does not do it, then Allah will write for him a full good deed." },
        { q: "A good deed done is multiplied up to?", a: "Seven hundred times or more", wrong: ["Two times", "Once only", "Five times"], why: "From ten to seven hundred times to many more times." },
        { tf: true, q: "Allah ordered both good and bad deeds to be written.", why: "Allah ordered that the good and the bad deeds be written." }
      ]
    },
    {
      slug: "gardens-and-rivers",
      title: "Gardens and rivers",
      line: "The people of Taqwa will live among gardens and rivers.",
      facts: ["Taqwa is mindfulness of Allah", "Their end is the best end"],
      quote: q54(54),
      source: ik(54, "Ibn Kathir says the people of Taqwa will be among gardens and rivers, unlike the end of the miserable.", "unlike the end that the miserable are facing"),
      difficulty: 1,
      questions: [
        { q: "Where will the people of Taqwa be, in 54:54?", a: "Among gardens and rivers", wrong: ["In deserts", "In caves", "On ships"], why: "Verily, those who have Taqwa, will be in the midst of Gardens and Rivers." },
        { q: "Whose end is the opposite, per Ibn Kathir?", a: "The miserable", wrong: ["The angels", "The prophets", "The martyrs"], why: "Unlike the end that the miserable are facing." },
        { tf: true, q: "Taqwa leads to Paradise.", why: "Those who have Taqwa, will be in the midst of Gardens and Rivers." }
      ]
    },
    {
      slug: "no-eye-has-seen",
      title: "No eye has seen",
      line: "Allah prepared for His pious servants what no eye has seen.",
      facts: ["Beyond what we imagine", "Ready for the pious"],
      quote: q54(54),
      source: hadith("bukhari", "3244", "Abu Hurairah", "Sahih", "The Prophet ﷺ said Allah prepared for His pious servants what no eye has seen, no ear heard, no heart imagined.", "never been seen by an eye, or heard by an ear"),
      difficulty: 2,
      questions: [
        { q: "For whom is this prepared, per Bukhari 3244?", a: "Allah's pious servants", wrong: ["Everyone", "Only kings", "Only scholars"], why: "I have prepared for My Pious slaves things which have never been seen by an eye." },
        { q: "What has no ear done, per the hadith?", a: "Heard of it", wrong: ["Sung of it", "Lost it", "Sold it"], why: "Never been seen by an eye, or heard by an ear, or imagined by a human being." },
        { tf: true, q: "Paradise is beyond anything we can picture.", why: "Or imagined by a human being." }
      ]
    },
    {
      slug: "a-seat-of-truth",
      title: "A seat of truth",
      line: "In a seat of truth, near the King who has all power.",
      facts: ["A place of honor and pleasure", "The King gives what they wish"],
      quote: q54(55),
      source: ik(55, "Ibn Kathir says the seat of truth is the home of Allah's honor, full of His pleasure and favors, and He grants what they wish.", "He is able to grant them whatever they wish and ask for"),
      difficulty: 2,
      questions: [
        { q: "Where will they sit, in 54:55?", a: "In a seat of truth", wrong: ["In a market", "On a ship", "In a tent"], why: "In a seat of truth, near the Muqtadir King." },
        { q: "What does Muqtadir mean in 54:55?", a: "All-powerful", wrong: ["Forgetful", "Distant", "Weak"], why: "He is able to grant them whatever they wish and ask for." },
        { tf: true, q: "The seat of truth is surrounded by Allah's pleasure.", why: "In the Dwelling of Allah's honor, encompassed by His pleasure, favors, bounties, generosity and compassion." }
      ]
    }
  ]
};

export const QAMAR_UNITS: readonly DeepUnit[] = [QAMAR_ONE, QAMAR_TWO, QAMAR_THREE];
