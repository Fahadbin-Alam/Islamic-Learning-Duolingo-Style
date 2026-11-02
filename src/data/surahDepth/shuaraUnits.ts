import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Ash-Shu'ara ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Ash-Shu'ara 26:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_26_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Ash-Shu'ara 26:${ayah}`,
    url: `https://quran.com/26:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 26:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}


const q26 = (ayah: number) => quranQuote(26, ayah);

/** Ayahs 1 to 68: the clear Book, faith by choice, Musa and Harun sent to Fir'awn, the debate, the sorcerers who believed, and the sea that parted. */
const SHUARA_ONE: DeepUnit = {
  key: "shuara1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-26",
  name: "Ash-Shu'ara, ayahs 1 to 68",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ash-Shu'ara",
  lessons: [
    {
      slug: "the-clear-book",
      title: "The clear Book",
      line: "These are ayahs of a clear Book that shows truth from falsehood.",
      facts: ["Ta Sin Mim are opening letters", "Mubin means clear"],
      quote: q26(2),
      source: ik(2, "The surah opens with the letters Ta Sin Mim. These are the verses of the clear Quran, a Book that is not unclear and that separates truth from falsehood and guidance from misguidance.", "the clear and unambiguous Book which distinguishes between truth and falsehood"),
      difficulty: 2,
      questions: [
        { q: "What does Mubin mean, in 26:2?", a: "Clear", wrong: ["Hidden", "Short", "Old"], why: "These are the verses of the Clear Qur'an, the clear and unambiguous Book." },
        { q: "What does the clear Book tell apart?", a: "Truth from falsehood", wrong: ["Day from night", "Rich from poor", "Land from sea"], why: "The Book which distinguishes between truth and falsehood, misguidance and guidance." },
        { tf: true, q: "Ash-Shu'ara opens with the letters Ta Sin Mim.", why: "Ta Sin Mim. These are Ayat of the Book Mubin." }
      ]
    },
    {
      slug: "do-not-grieve-yourself",
      title: "Do not wear yourself out",
      line: "The Prophet ﷺ grieved so much that people would not believe.",
      facts: ["Allah comforted him", "Guidance is in Allah's hand"],
      quote: q26(3),
      source: ik(3, "Allah tells His Messenger ﷺ that he might almost destroy himself with grief because they do not believe. Allah consoles him: his keenness for their guidance is noble, but he should not destroy himself in sorrow.", "because of your keenness that they should be guided and your grief for them"),
      difficulty: 2,
      questions: [
        { q: "Why was the Prophet ﷺ so sad, in 26:3?", a: "They did not believe", wrong: ["He was poor", "He was ill", "He lost a battle"], why: "Because of your keenness that they should be guided and your grief for them." },
        { q: "How did Allah treat the Prophet ﷺ in 26:3?", a: "Consoling him", wrong: ["Blaming him", "Ignoring him", "Testing his wealth"], why: "Here Allah is consoling His Messenger for the lack of faith of those among the disbelievers." },
        { tf: false, q: "The Prophet ﷺ did not care if people were guided.", why: "He grieved because of his keenness that they should be guided." }
      ]
    },
    {
      slug: "faith-by-choice",
      title: "Faith by choice",
      line: "Allah could force a sign, but He wants belief that is chosen.",
      facts: ["Necks would bend if He willed", "No compulsion in true faith"],
      quote: q26(4),
      source: ik(4, "If Allah willed, He could send a sign from the sky that would force them to believe, bending their necks. He does not do that because He wants people to believe by their own choice.", "We do not want anyone to believe except by choice"),
      difficulty: 2,
      questions: [
        { q: "Why does Allah not force a sign on them?", a: "He wants faith by choice", wrong: ["He cannot", "He forgot", "They asked Him not to"], why: "We will not do that because We do not want anyone to believe except by choice." },
        { q: "What would a forced sign do, in 26:4?", a: "Bend their necks in humility", wrong: ["Make them rich", "Make them sleep", "Move the mountains"], why: "We could send down to them from the heaven a sign, to which they would bend their necks in humility." },
        { tf: true, q: "Allah has the power to make everyone believe.", why: "And had your Lord willed, those on earth would have believed, all of them together." }
      ]
    },
    {
      slug: "turning-from-the-reminder",
      title: "Turning from every reminder",
      line: "Each new reminder came, and most people turned away from it.",
      facts: ["They mocked the truth", "They will learn the result"],
      quote: q26(5),
      source: ik(5, "Every time a new reminder came down from the Most Merciful, most people turned away. They denied and mocked it, and soon they will come to know the result of that denial.", "every time a Scripture comes from heaven to them, most of the people turn away from it"),
      difficulty: 2,
      questions: [
        { q: "What did most people do with each reminder?", a: "Turned away", wrong: ["Memorized it", "Wrote it in gold", "Asked for more"], why: "Every time a Scripture comes from heaven to them, most of the people turn away from it." },
        { q: "What will come to the mockers, in 26:6?", a: "News of what they mocked", wrong: ["More wealth", "A long sleep", "A new king"], why: "They will come to know the news of the consequences of this denial after a while." },
        { tf: true, q: "The reminder comes from the Most Merciful.", why: "And never comes there unto them a Reminder as a recent revelation from the Most Gracious." }
      ]
    },
    {
      slug: "every-good-kind",
      title: "Every good kind grows",
      line: "Look at the earth: Allah grows every good kind in it.",
      facts: ["Crops, fruits and animals", "A sign of His power"],
      quote: q26(7),
      source: ik(7, "Allah tells those who deny that He is the One who created the earth and made every good kind of crop, fruit and animal grow in it. This is a sign of His power, yet most people do not believe.", "Who created the earth and caused every good kind of crop, fruit and animal to grow therein"),
      difficulty: 3,
      questions: [
        { q: "What does Allah ask us to look at, in 26:7?", a: "The earth and what grows", wrong: ["Only the stars", "Only the sea", "Old palaces"], why: "Do they not observe the earth, how much of every good kind We cause to grow therein?" },
        { q: "What grows by His will, per Ibn Kathir?", a: "Crops, fruit and animals", wrong: ["Only stones", "Only gold", "Nothing at all"], why: "Who created the earth and caused every good kind of crop, fruit and animal to grow therein." },
        { q: "What is this growth, in 26:8?", a: "A sign", wrong: ["An accident", "A story", "A secret"], why: "Verily, in this is an Ayah, meaning an evidence of the power of the Creator." }
      ]
    },
    {
      slug: "mighty-and-merciful",
      title: "The Mighty, the Merciful",
      line: "Allah is All-Mighty, yet He gives the sinner time to repent.",
      facts: ["He does not rush punishment", "This line repeats in the surah"],
      quote: q26(9),
      source: ik(9, "Your Lord is the All-Mighty, with power over all things, and the Most Merciful to His creation. He does not hurry to punish someone who sins; He gives him time to repent.", "He does not hasten to punish the one who sins, but He gives him time to repent"),
      difficulty: 3,
      questions: [
        { q: "How does the Most Merciful treat a sinner?", a: "Gives time to repent", wrong: ["Punishes at once", "Forgets him", "Makes him rich"], why: "He does not hasten to punish the one who sins, but He gives him time to repent." },
        { q: "Who is Allah Most Merciful to, per Sa'id bin Jubayr?", a: "Those who repent to Him", wrong: ["Only kings", "Only the strong", "No one"], why: "He is Most Merciful towards those who repent to Him and turn to Him." },
        { tf: true, q: "All-Mighty means having power over all things.", why: "The One Who has power over all things, to subdue and control them." }
      ]
    },
    {
      slug: "musa-asks-for-harun",
      title: "Musa asks for Harun",
      line: "Sent to Fir'awn, Musa asked Allah to send his brother Harun too.",
      facts: ["Musa feared his tongue was slow", "Allah granted his request"],
      quote: q26(13),
      source: ik(13, "Allah called Musa and sent him to the wrongdoing people of Fir'awn. Musa feared they would deny him, felt his chest tighten and his speech was not fluent, so he asked Allah to send Harun with him.", "So, Musa asked Allah to remove these difficulties for him"),
      difficulty: 3,
      questions: [
        { q: "Who did Musa ask Allah to send with him?", a: "His brother Harun", wrong: ["Yusuf", "Ibrahim", "Shuayb"], why: "And my tongue expresses not well. So send for Harun." },
        { q: "Which people was Musa sent to, in 26:11?", a: "The people of Fir'awn", wrong: ["The people of Lut", "The people of Ad", "The people of Saba"], why: "Go to the people who are wrongdoers. The people of Fir'awn." },
        { tf: false, q: "Musa felt no worry at all about the task.", why: "He said: My Lord! Verily, I fear that they will deny me, and my breast straitens." }
      ]
    },
    {
      slug: "we-are-with-you",
      title: "We are with you, listening",
      line: "Allah told Musa and Harun: go, We are with you, listening.",
      facts: ["Allah protects His Messengers", "Free the Children of Israel"],
      quote: q26(15),
      source: ik(15, "Allah told Musa not to be afraid: go both of you with Our signs, We are with you, listening. Ibn Kathir explains it as Allah being with them with His protection, care, support and help.", "I will be with you by My protection, care, support and help"),
      difficulty: 3,
      questions: [
        { q: "What does Allah promise Musa and Harun, in 26:15?", a: "We are with you, listening", wrong: ["You will be kings", "You will never tire", "You will be rich"], why: "Go you both with Our signs. Verily, We shall be with you, listening." },
        { q: "What does being with them mean, per Ibn Kathir?", a: "Protection, care, support, help", wrong: ["Sitting beside them", "Nothing special", "Only watching"], why: "I will be with you by My protection, care, support and help." },
        { q: "What did they ask Fir'awn to do, in 26:17?", a: "Let the Children of Israel go", wrong: ["Build a temple", "Pay a tax", "Leave Egypt himself"], why: "So allow the Children of Israel to go with us." }
      ]
    },
    {
      slug: "a-favor-and-a-wrong",
      title: "A favor and a great wrong",
      line: "Fir'awn boasted of raising Musa, but he enslaved a whole people.",
      facts: ["Musa admitted his past mistake", "Allah later made him a Messenger"],
      quote: q26(22),
      source: ik(22, "Fir'awn reminded Musa that he raised him as a child. Musa answered: whatever favor you did me is outweighed by your enslaving the Children of Israel. One kindness to one man is nothing next to wronging a whole people.", "whatever favors you did in bringing me up are offset by the evil you did by enslaving the Children of Israel"),
      difficulty: 3,
      questions: [
        { q: "What favor did Fir'awn remind Musa of?", a: "Raising him as a child", wrong: ["Giving him a ship", "Teaching him to read", "Making him a minister"], why: "Did we not bring you up among us as a child?" },
        { q: "How did Musa answer that favor, in 26:22?", a: "You enslaved my people", wrong: ["I thank you forever", "I will serve you", "I forgot it"], why: "Whatever favors you did in bringing me up are offset by the evil you did by enslaving the Children of Israel." },
        { q: "When did Musa make his old mistake, per 26:20?", a: "Before revelation came to him", wrong: ["After he became a Prophet", "On the day of the sea", "In old age"], why: "When I was in error, meaning before revelation was sent to me and before Allah made me a Prophet." }
      ]
    },
    {
      slug: "lord-of-all-worlds",
      title: "Who is the Lord of the worlds?",
      line: "Musa said: the Lord of the heavens, the earth and all between.",
      facts: ["Fir'awn claimed to be the only god", "Fir'awn called Musa mad"],
      quote: q26(24),
      source: ik(24, "Fir'awn did not believe in the Creator at all and asked who this Lord of the worlds was. Musa said: the Lord of the heavens and the earth and all between them, their Creator, Owner and Controller.", "the Creator, Sovereign and Controller of all that"),
      difficulty: 3,
      questions: [
        { q: "How did Musa describe Allah, in 26:24?", a: "Lord of heavens and earth", wrong: ["Lord of Egypt only", "Lord of the river", "Lord of the sorcerers"], why: "The Lord of the heavens and the earth, and all that is between them." },
        { q: "What did Fir'awn claim, per Ibn Kathir?", a: "No god but himself", wrong: ["Many gods", "He was a Prophet", "He was a sorcerer"], why: "They believed that they had no other lord than Fir'awn." },
        { q: "What did Fir'awn call Musa, in 26:27?", a: "A madman", wrong: ["A king", "A poet", "A merchant"], why: "Verily, your Messenger who has been sent to you is a madman!" }
      ]
    },
    {
      slug: "east-and-west",
      title: "Lord of the east and west",
      line: "Allah raises the sun in the east; Fir'awn could not.",
      facts: ["Like Ibrahim's debate with the king", "If you did but understand"],
      quote: q26(28),
      source: ik(28, "Musa said Allah is Lord of the east and the west. Allah made the east where the heavenly bodies rise and the west where they set. If Fir'awn were truly a god, let him make them rise in the west.", "then let him turn things around so that the heavenly bodies set in the east and rise in the west"),
      difficulty: 3,
      questions: [
        { q: "What could Fir'awn not do, per Ibn Kathir?", a: "Make the sun rise in the west", wrong: ["Speak to people", "Build cities", "Gather soldiers"], why: "Then let him turn things around so that the heavenly bodies set in the east and rise in the west." },
        { q: "Which Prophet made a similar point to a king?", a: "Ibrahim", wrong: ["Nuh", "Yunus", "Isa"], why: "Allah brings the sun from the east. So cause it to rise from the west. (2:258)" },
        { tf: true, q: "Musa told them to use their minds.", why: "Lord of the east and the west, and all that is between them, if you did but understand!" }
      ]
    },
    {
      slug: "the-stick-and-the-hand",
      title: "The stick and the shining hand",
      line: "Fir'awn lost the debate; Musa then showed two clear signs.",
      facts: ["The stick became a serpent", "His hand shone white"],
      quote: q26(33),
      source: ik(33, "When Fir'awn lost the argument he threatened Musa with prison. Musa offered a clear proof: his stick became a huge serpent, and his hand came out shining white like a piece of the moon.", "shining like a piece of the moon"),
      difficulty: 4,
      questions: [
        { q: "What did Fir'awn do after losing the debate?", a: "Threatened prison", wrong: ["Believed", "Ran away", "Gave a gift"], why: "If you choose a god other than me, I will certainly put you among the prisoners." },
        { q: "What did his hand look like, per Ibn Kathir?", a: "Shining like a piece of the moon", wrong: ["Dark like night", "Red like fire", "Covered in gold"], why: "And behold, it was white to all beholders! It was shining like a piece of the moon." },
        { q: "What did the stick become, in 26:32?", a: "A clear serpent", wrong: ["A tree", "A bird", "A sword"], why: "So he threw his stick, and behold, it was a serpent, manifest." }
      ]
    },
    {
      slug: "gather-the-sorcerers",
      title: "Gather every sorcerer",
      line: "Fir'awn called sorcerers from every city to face Musa.",
      facts: ["He called the signs magic", "Allah let all the people see"],
      quote: q26(37),
      source: ik(37, "Fir'awn told his chiefs that Musa was a skilled sorcerer who wanted to take their land. They advised him to delay Musa and bring every sorcerer. Allah decreed it so that all the people would gather and see His signs on one day.", "so that all the people would gather in one place and the signs and proof of Allah would be made manifest"),
      difficulty: 4,
      questions: [
        { q: "What did Fir'awn call the miracles, in 26:34?", a: "Sorcery", wrong: ["A dream", "A trick of light", "A gift"], why: "Verily, this is indeed a well-versed sorcerer." },
        { q: "What was Allah's wisdom in the gathering?", a: "All people would see His signs", wrong: ["To feed the people", "To pick a king", "To hold a market"], why: "So that all the people would gather in one place and the signs and proof of Allah would be made manifest." },
        { tf: false, q: "Fir'awn admitted the stick was a miracle.", why: "Fir'awn was trying to convince them that this was sorcery, not a miracle." }
      ]
    },
    {
      slug: "by-the-might-of-firawn",
      title: "By the might of Fir'awn",
      line: "The sorcerers asked for a reward and swore by Fir'awn's might.",
      facts: ["The crowd followed the king's way", "Musa told them to throw first"],
      quote: q26(44),
      source: ik(44, "The sorcerers asked Fir'awn for a reward if they won, and he promised to bring them close. They threw their ropes and sticks saying: by the might of Fir'awn we will win. Ibn Kathir says this is what ignorant people say.", "This is what the ignorant masses say when they do something"),
      difficulty: 4,
      questions: [
        { q: "What did the sorcerers ask Fir'awn for, in 26:41?", a: "A reward if they won", wrong: ["Their freedom", "A new land", "Forgiveness"], why: "Will there surely be a reward for us if we are the winners?" },
        { q: "What did they swear by when they threw?", a: "The might of Fir'awn", wrong: ["The Lord of the worlds", "The river", "Their fathers"], why: "By the might of Fir'awn, it is we who will certainly win!" },
        { q: "Why did the crowd say they would follow the sorcerers?", a: "They followed their king's religion", wrong: ["They loved truth", "Musa asked them", "They were paid"], why: "The people were followers of the religion of their king." }
      ]
    },
    {
      slug: "the-sorcerers-bow-down",
      title: "The sorcerers bow down",
      line: "The stick swallowed their tricks; the sorcerers fell in sujud.",
      facts: ["Truth always beats falsehood", "Lord of Musa and Harun"],
      quote: q26(46),
      source: ik(46, "Musa threw his stick and it swallowed everything they had faked. The sorcerers knew this was no magic, so at that moment they believed and fell in prostration to Allah, Lord of Musa and Harun.", "At that moment they believed in Musa and prostrated to Allah"),
      difficulty: 4,
      questions: [
        { q: "What did Musa's stick do, in 26:45?", a: "Swallowed what they faked", wrong: ["Broke in two", "Flew away", "Turned to gold"], why: "Then Musa threw his stick, and behold, it swallowed up all that they falsely showed." },
        { q: "What did the sorcerers do next?", a: "Fell down in prostration", wrong: ["Ran away", "Fought Musa", "Asked for gold"], why: "At that moment they believed in Musa and prostrated to Allah." },
        { tf: true, q: "Faith and falsehood never meet without faith winning.", why: "They never confront one another but faith always prevails." }
      ]
    },
    {
      slug: "no-harm",
      title: "No harm",
      line: "Threatened, the new believers said: no harm, we return to Allah.",
      facts: ["They hoped for forgiveness", "First of their people to believe"],
      quote: q26(50),
      source: ik(50, "Fir'awn threatened them harshly, but his threats only increased their faith. They said: no harm, to our Lord we return. They hoped Allah would forgive them, as they were the first Egyptians to believe.", "that will not harm us and we do not care"),
      difficulty: 4,
      questions: [
        { q: "What did Fir'awn's threats do to their faith?", a: "Increased it", wrong: ["Ended it", "Weakened it", "Hid it"], why: "His threats against them resulted only in an increase in their faith and submission to Allah." },
        { q: "Why did they call themselves first believers, in 26:51?", a: "First Egyptians to believe", wrong: ["First humans", "First Prophets", "First to fast"], why: "Because we are the first of our people, the Egyptians, to believe." },
        { q: "Why was saying Musa taught them magic nonsense?", a: "They had never met him", wrong: ["Musa was asleep", "They were too old", "Harun taught them"], why: "They had never met Musa before that day, so how could he have been their chief who taught them how to do magic." }
      ]
    },
    {
      slug: "depart-by-night",
      title: "Leave by night",
      line: "Allah told Musa to lead the Children of Israel out by night.",
      facts: ["Fir'awn called his armies", "They lost their gardens and treasures"],
      quote: q26(52),
      source: ik(52, "After the proof was clear and Fir'awn stayed arrogant, Allah told Musa to take the Children of Israel out of Egypt by night. Fir'awn gathered his armies, calling them a small band, but he lost his gardens, springs and treasures.", "So Allah commanded Musa, peace be upon him, to take the Children of Israel out of Egypt by night"),
      difficulty: 4,
      questions: [
        { q: "When did Musa lead his people out, in 26:52?", a: "By night", wrong: ["At noon", "On a feast day", "In winter only"], why: "Depart by night with My servants, verily, you will be pursued." },
        { q: "What did Fir'awn call the Children of Israel?", a: "A small band", wrong: ["A great army", "His friends", "Strangers"], why: "Verily, these indeed are but a small band." },
        { q: "Who inherited what Fir'awn left, per 26:59?", a: "The Children of Israel", wrong: ["The sorcerers", "The Romans", "No one"], why: "Thus and We caused the Children of Israel to inherit them." }
      ]
    },
    {
      slug: "my-lord-is-with-me",
      title: "My Lord is with me",
      line: "Sea ahead, army behind, Musa said: my Lord is with me.",
      facts: ["His people feared being caught", "Musa trusted Allah's promise"],
      quote: q26(62),
      source: ik(62, "Fir'awn caught up at sunrise by the Red Sea, with the sea ahead and the army behind. The people said: we will be caught. Musa said: no, my Lord is with me, nothing you fear will happen, He does not break His promise.", "nothing of what you fear will happen to you, for Allah is the One Who commanded me to bring you here"),
      difficulty: 4,
      questions: [
        { q: "Where were the believers trapped, per Ibn Kathir?", a: "Between the sea and the army", wrong: ["In a desert cave", "On a mountain", "Inside a city"], why: "The sea was ahead of them and Fir'awn and his troops were behind them." },
        { q: "What did Musa answer, in 26:62?", a: "My Lord is with me", wrong: ["Let us surrender", "Let us swim", "Let us fight"], why: "Nay, verily with me is my Lord. He will guide me." },
        { tf: true, q: "Musa trusted that Allah keeps His promise.", why: "Allah is the One Who commanded me to bring you here, and He does not go back on His promise." }
      ]
    },
    {
      slug: "the-third-is-allah",
      title: "Two, and the third is Allah",
      line: "In the cave, the Prophet ﷺ trusted Allah just as Musa did.",
      facts: ["Abu Bakr feared being seen", "Trust in Allah in every danger"],
      quote: q26(62),
      source: hadith("bukhari", "3653", "Abu Bakr as-Siddiq", "Sahih", "Abu Bakr said to the Prophet ﷺ in the cave: if any of them looks down at his feet, he will see us. The Prophet ﷺ said: what do you think of two, when the third of them is Allah?", "the third of whom is Allah"),
      difficulty: 5,
      questions: [
        { q: "Where were they when Abu Bakr was afraid?", a: "In the cave", wrong: ["At sea", "In Madinah", "In a market"], why: "Abu Bakr said: I said to the Prophet ﷺ while I was in the Cave." },
        { q: "What did the Prophet ﷺ say about the two of them?", a: "The third of them is Allah", wrong: ["We must run", "We are lost", "Call for help"], why: "What do you think of two (persons) the third of whom is Allah?" },
        { q: "How is this like Musa at the sea?", a: "Both trusted Allah in danger", wrong: ["Both crossed water", "Both met Fir'awn", "Both were alone"], why: "Musa said: verily with me is my Lord. The Prophet ﷺ said: the third of whom is Allah." }
      ]
    },
    {
      slug: "the-sea-parts",
      title: "The sea parts",
      line: "Musa struck the sea, and the water stood like huge mountains.",
      facts: ["Twelve paths, one per tribe", "The seabed became dry"],
      quote: q26(63),
      source: ik(63, "Allah told Musa to strike the sea with his stick, and it split. Each part stood like a huge mountain. Ibn Abbas said the sea divided into twelve paths, one for each tribe, and Allah made the seabed dry.", "The sea divided into twelve paths, one for each of the tribes"),
      difficulty: 5,
      questions: [
        { q: "What did each part of the sea look like, in 26:63?", a: "A huge mountain", wrong: ["A small wave", "A cloud", "A river"], why: "And it parted, and each separate part became like huge mountain." },
        { q: "How many paths, per Ibn Abbas?", a: "Twelve", wrong: ["Two", "Seven", "Forty"], why: "The sea divided into twelve paths, one for each of the tribes." },
        { tf: false, q: "The path through the sea stayed muddy.", why: "Allah sent the wind to the sea bed to make it solid like the land." }
      ]
    },
    {
      slug: "the-day-of-ashura",
      title: "Saved, and the fast of Ashura",
      line: "Allah saved Musa on Ashura, so Muslims fast that day.",
      facts: ["None of the believers was lost", "We have more claim over Musa"],
      quote: q26(65),
      source: hadith("bukhari", "2004", "Abdullah ibn Abbas", "Sahih", "The Prophet ﷺ came to Madinah and found people fasting on Ashura, the day Allah saved the Children of Israel from their enemy, and Musa fasted it. He said: we have more claim over Musa than you, and he fasted it and told Muslims to fast.", "the day on which Allah rescued Bani Israel from their enemy"),
      difficulty: 5,
      questions: [
        { q: "What happened on the day of Ashura?", a: "Allah saved the Children of Israel", wrong: ["The Kaaba was built", "Nuh's flood began", "Yusuf became minister"], why: "This is a good day, the day on which Allah rescued Bani Israel from their enemy." },
        { q: "What did the Prophet ﷺ say about Musa?", a: "We have more claim over Musa", wrong: ["Musa is not ours", "Forget that day", "Only Jews should fast"], why: "We have more claim over Moses than you." },
        { q: "What happened to Fir'awn's army, in 26:66?", a: "They were drowned", wrong: ["They believed", "They went home", "They crossed safely"], why: "And We saved Musa and all those with him. Then We drowned the others." }
      ]
    },
    {
      slug: "a-sign-for-all",
      title: "A sign for all time",
      line: "Musa's story is proof of Allah's help to those who believe.",
      facts: ["Yet most do not believe", "Mighty to punish, Merciful to forgive"],
      quote: q26(67),
      source: ik(67, "In this story is a sign: its wonders and Allah's help to His believing servants are clear proof of His wisdom. Yet most people do not believe. Your Lord is the All-Mighty, the Most Merciful.", "this story with its wonders and tales of aid to the believing servants of Allah is definitive proof"),
      difficulty: 5,
      questions: [
        { q: "What does Musa's story prove, per Ibn Kathir?", a: "Allah aids His believers", wrong: ["Kings always win", "Magic is real power", "The sea is dangerous"], why: "This story with its wonders and tales of aid to the believing servants of Allah is definitive proof." },
        { q: "Which two names close this story, in 26:68?", a: "All-Mighty, Most Merciful", wrong: ["All-Hearing, All-Seeing", "First, Last", "King, Holy"], why: "And verily your Lord, He is truly the All-Mighty, the Most Merciful." },
        { tf: true, q: "Most people still do not believe after such signs.", why: "Verily, in this is indeed a sign, yet most of them are not believers." }
      ]
    }
  ]
};

/** Ayahs 69 to 140: Ibrahim against idols and his prayers, the clean heart, Nuh and the laden ship, and Hud warning the people of 'Ad. */
const SHUARA_TWO: DeepUnit = {
  key: "shuara2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-26",
  name: "Ash-Shu'ara, ayahs 69 to 140",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ash-Shu'ara",
  lessons: [
    {
      slug: "what-do-you-worship",
      title: "What do you worship?",
      line: "Ibrahim asked his father and people what their statues were.",
      facts: ["He spoke out from a young age", "An example for this Ummah"],
      quote: q26(70),
      source: ik(70, "Allah told His Messenger ﷺ to recite Ibrahim's story so the Ummah would follow his sincerity and trust in Allah. Ibrahim asked his father and people: what do you worship? Meaning, what are these statues you are so devoted to?", "what are these statues to which you are so devoted"),
      difficulty: 2,
      questions: [
        { q: "Who did Ibrahim ask, in 26:70?", a: "His father and his people", wrong: ["Fir'awn", "The angels", "Traders"], why: "When he said to his father and his people: What do you worship?" },
        { q: "Why was his story told to the Ummah?", a: "To follow his example", wrong: ["To learn farming", "To fear statues", "To travel"], why: "So that they could follow this example of sincerity towards Allah, putting one's trust in Him." },
        { tf: true, q: "His people said they were devoted to idols.", why: "We worship idols, and to them we are ever devoted." }
      ]
    },
    {
      slug: "we-found-our-fathers",
      title: "We found our fathers doing it",
      line: "Idols cannot hear or help; the people only copied their fathers.",
      facts: ["Do they hear when you call?", "Copying is not a proof"],
      quote: q26(74),
      source: ik(74, "Ibrahim asked: do they hear you when you call, or help or harm you? They had no answer except: we found our fathers doing so. They knew the idols could do nothing, but they rushed to copy their fathers.", "They knew that their idols could not do anything, but they had seen their fathers doing this"),
      difficulty: 2,
      questions: [
        { q: "What did Ibrahim ask about the idols, in 26:72?", a: "Do they hear you?", wrong: ["Are they gold?", "Who made them?", "Are they old?"], why: "He said: Do they hear you when you call?" },
        { q: "What was the people's only reason?", a: "Their fathers did it", wrong: ["The idols spoke", "They saw miracles", "A Prophet said so"], why: "They said: (Nay) but we found our fathers doing so." },
        { tf: false, q: "The people believed the idols could truly help.", why: "They knew that their idols could not do anything, but they had seen their fathers doing this." }
      ]
    },
    {
      slug: "not-afraid-of-idols",
      title: "Not afraid of idols",
      line: "Ibrahim said idols are his enemies; only the Lord is not.",
      facts: ["If they can harm, let them try", "Nuh and Hud spoke the same way"],
      quote: q26(77),
      source: ik(77, "Ibrahim said that what they worshipped was an enemy to him, except the Lord of the worlds. If these idols have any power, let them harm me; I am their enemy and do not care about them.", "I am an enemy to them and I do not care about them"),
      difficulty: 2,
      questions: [
        { q: "Who did Ibrahim exclude from his enmity, in 26:77?", a: "The Lord of the worlds", wrong: ["His father", "The king", "The stars"], why: "Verily, they are enemies to me, save the Lord of Al-'Alamin." },
        { q: "What did Ibrahim show by daring the idols?", a: "They have no power", wrong: ["He was afraid", "He wanted gifts", "He loved them"], why: "If these idols mean anything and have any influence, then let them do me any kind of harm." },
        { q: "Which word did Ibrahim leave lasting among his offspring?", a: "La ilaha illallah", wrong: ["A poem", "A family name", "A song"], why: "And he made it a Word lasting among his offspring, meaning: La Ilaha Illallah." }
      ]
    },
    {
      slug: "he-feeds-me",
      title: "He feeds me and gives me drink",
      line: "Ibrahim worshipped the One who created, guides and feeds him.",
      facts: ["He sends rain from the clouds", "Water for people and animals"],
      quote: q26(79),
      source: ik(79, "Ibrahim said he worships only the One who created him and guides him, and who feeds him and gives him drink. Allah provides from the heavens and earth, driving clouds and sending sweet water for people and animals.", "He is my Creator Who provides for me from that which He has made available in the heavens and on earth"),
      difficulty: 3,
      questions: [
        { q: "What two things does Allah do first, in 26:78?", a: "Creates and guides", wrong: ["Sleeps and wakes", "Buys and sells", "Builds and breaks"], why: "Who has created me, and it is He Who guides me." },
        { q: "How does Allah give drink, per Ibn Kathir?", a: "He sends sweet rainwater", wrong: ["Only from wells people dig", "From the idols", "He does not"], why: "He sends down the water fresh and sweet so that many of those whom He has created may drink." },
        { tf: true, q: "Animals also drink from the water Allah sends.", why: "So that many of those whom He has created, animals and men alike, may drink from it." }
      ]
    },
    {
      slug: "when-i-am-ill",
      title: "When I am ill, He cures me",
      line: "Ibrahim said: when I am ill, He cures me.",
      facts: ["Only Allah truly heals", "Good things are named for Allah"],
      quote: q26(80),
      source: ik(80, "Ibrahim said when I am ill, He cures me. He spoke of illness as his own, though Allah decrees it, out of respect towards Allah. No one can heal except Allah, who heals through the means that lead to recovery.", "Here he attributed sickness to himself, even though it is Allah Who decrees it, out of respect towards Allah"),
      difficulty: 3,
      questions: [
        { q: "Why did Ibrahim say when I am ill?", a: "Out of respect for Allah", wrong: ["He was never ill", "He blamed doctors", "He forgot"], why: "Here he attributed sickness to himself, even though it is Allah Who decrees it, out of respect towards Allah." },
        { q: "Who truly heals, per Ibn Kathir?", a: "Only Allah", wrong: ["Only medicine", "The idols", "The stars"], why: "When I fall sick, no one is able to heal me but Him, Who heals me with the means that may lead to recovery." },
        { tf: false, q: "Taking medicine goes against trusting Allah to cure.", why: "Allah heals me with the means that may lead to recovery." }
      ]
    },
    {
      slug: "dua-for-the-sick",
      title: "The dua for the sick",
      line: "Visiting the sick, the Prophet ﷺ asked Allah, the One who cures.",
      facts: ["Lord of the people, take it away", "No cure but His"],
      quote: q26(80),
      source: hadith("bukhari", "5675", "Aisha", "Sahih", "Whenever the Prophet ﷺ visited a sick person he prayed: take away the illness, O Lord of the people, cure him, You are the One who cures. There is no cure but Yours, a cure that leaves no illness.", "Cure him as You are the One Who cures"),
      difficulty: 3,
      questions: [
        { q: "When did the Prophet ﷺ say this dua?", a: "When visiting the sick", wrong: ["At sunrise only", "Before eating", "On Eid only"], why: "Whenever Allah's Messenger ﷺ paid a visit to a patient, he used to invoke Allah." },
        { q: "What does the dua call Allah?", a: "The One Who cures", wrong: ["The One who sleeps", "The doctor's helper", "The Lord of idols"], why: "Cure him as You are the One Who cures. There is no cure but Yours." },
        { q: "Which cure does the dua ask for?", a: "One that leaves no illness", wrong: ["A slow one", "A costly one", "A secret one"], why: "A cure that leaves no disease." }
      ]
    },
    {
      slug: "only-he-forgives",
      title: "Only He forgives",
      line: "Allah gives life and death, and only He forgives sins.",
      facts: ["Ibrahim hoped for forgiveness", "The Day of Recompense"],
      quote: q26(82),
      source: ik(82, "Allah causes death and then gives life again; no one else can. Ibrahim hoped Allah would forgive his faults on the Day of Recompense, because no one can forgive sins in this world or the next except Him.", "no one is able to forgive sins in this world or the Hereafter except Him"),
      difficulty: 3,
      questions: [
        { q: "Who can forgive sins, per Ibn Kathir?", a: "Only Allah", wrong: ["Any Prophet", "Any scholar", "The idols"], why: "No one is able to forgive sins in this world or the Hereafter except Him." },
        { q: "When did Ibrahim hope to be forgiven, in 26:82?", a: "On the Day of Recompense", wrong: ["On his birthday", "At the market", "Never"], why: "And Who, I hope, will forgive me my faults on the Day of Recompense." },
        { tf: true, q: "Only Allah gives life and causes death.", why: "He is the One Who gives life and causes death, and no one besides Him is able to do that." }
      ]
    },
    {
      slug: "a-good-name-after-me",
      title: "A good name after me",
      line: "Ibrahim asked for knowledge and a good name after him.",
      facts: ["Hukm means knowledge", "Peace be upon Ibrahim"],
      quote: q26(84),
      source: ik(84, "Ibrahim asked Allah for Hukm, which Ibn Abbas said is knowledge, to join the righteous, and to be remembered well after his death as a good example. Allah granted it: peace be upon Ibrahim.", "cause me to be remembered in a good manner after my death"),
      difficulty: 4,
      questions: [
        { q: "What is Hukm, per Ibn Abbas?", a: "Knowledge", wrong: ["Wealth", "A kingdom", "Strength"], why: "Here Ibrahim asks his Lord to give him Hukm. Ibn Abbas said: This is knowledge." },
        { q: "What did Ibrahim ask for in 26:84?", a: "A good mention after him", wrong: ["A tall palace", "Many camels", "A long life"], why: "Cause me to be remembered in a good manner after my death, so that I will be taken as a good example." },
        { q: "Which garden did he ask to inherit, in 26:85?", a: "The Paradise of Delight", wrong: ["A garden in Egypt", "His father's farm", "A royal garden"], why: "And make me one of the inheritors of the Paradise of Delight." }
      ]
    },
    {
      slug: "a-clean-heart",
      title: "A clean heart",
      line: "On that Day only a clean heart helps, not wealth or sons.",
      facts: ["Free of shirk", "The sound heart of a believer"],
      quote: q26(89),
      source: ik(89, "On the Day of Resurrection no wealth or children can save anyone. Only the one who comes to Allah with a clean heart is helped: a heart free from any impurity or shirk, the sound heart of the believer.", "free from any impurity or Shirk"),
      difficulty: 4,
      questions: [
        { q: "What will not help on that Day, in 26:88?", a: "Wealth and sons", wrong: ["A clean heart", "Faith", "Sincerity"], why: "The Day whereon neither wealth nor sons will avail." },
        { q: "What is a clean heart, per Ibn Kathir?", a: "Free from impurity and shirk", wrong: ["A happy heart", "A strong heart", "A rich heart"], why: "Meaning, free from any impurity or Shirk." },
        { q: "What did Sa'id bin al-Musayyib call it?", a: "The sound heart", wrong: ["The proud heart", "The soft heart", "The loud heart"], why: "Sa'id bin Al-Musayyib said: The clean heart is the sound heart." }
      ]
    },
    {
      slug: "the-heart-leads-the-body",
      title: "The heart leads the body",
      line: "The Prophet ﷺ said: a good heart makes the body good.",
      facts: ["Stay away from doubtful things", "Keep the heart clean"],
      quote: q26(89),
      source: hadith("bukhari", "52", "An-Nu'man bin Bashir", "Sahih", "The Prophet ﷺ said halal and haram are clear, with doubtful things between them; whoever avoids the doubtful protects his religion. In the body is a piece of flesh: if it is good the whole body is good, and if it is spoiled the body is spoiled. It is the heart.", "There is a piece of flesh in the body"),
      difficulty: 4,
      questions: [
        { q: "What piece of flesh did the Prophet ﷺ mean?", a: "The heart", wrong: ["The hand", "The tongue", "The eye"], why: "There is a piece of flesh in the body: if it becomes good the whole body becomes good, and that is the heart." },
        { q: "What protects one's religion, per An-Nu'man's hadith?", a: "Avoiding doubtful things", wrong: ["Arguing a lot", "Owning land", "Staying silent always"], why: "Whoever saves himself from these suspicious things saves his religion and his honor." },
        { tf: true, q: "When the heart is spoiled, the whole body is spoiled.", why: "But if it gets spoilt the whole body gets spoilt and that is the heart." }
      ]
    },
    {
      slug: "paradise-brought-near",
      title: "Paradise brought near",
      line: "Paradise will be brought close, adorned for the people of taqwa.",
      facts: ["They chose it over this world", "False gods cannot help anyone"],
      quote: q26(90),
      source: ik(90, "Paradise will be brought near to those who had taqwa, adorned and decorated for them to see. They are the pious who preferred it over this world and worked for it. Those who worshipped others will find their false gods cannot help them.", "adorned and decorated for them to behold it"),
      difficulty: 4,
      questions: [
        { q: "For whom is Paradise brought near, in 26:90?", a: "People of taqwa", wrong: ["The richest", "The strongest", "Everyone"], why: "And Paradise will be brought near to those who had Taqwa." },
        { q: "How will Paradise look to them?", a: "Adorned and decorated", wrong: ["Empty", "Hidden", "Far away"], why: "It will be brought close to its people, adorned and decorated for them to behold it." },
        { q: "What did its people do in this world?", a: "Preferred it and strove for it", wrong: ["Ignored it", "Mocked it", "Only wished for it"], why: "Its people are the pious who preferred it to whatever was in this world, and strove for it." }
      ]
    },
    {
      slug: "too-late-regret",
      title: "Regret that comes too late",
      line: "The misled will admit their error and wish to return, too late.",
      facts: ["No intercessor, no close friend", "Choose rightly now"],
      quote: q26(102),
      source: ik(102, "Those who followed misguiding leaders will blame them, then see that they themselves are to blame. They will say: we were clearly wrong, we have no intercessor or close friend, and wish to return to the world to believe.", "Then they will realize that themselves are to blame"),
      difficulty: 4,
      questions: [
        { q: "What will they admit, in 26:97?", a: "We were in clear error", wrong: ["We were right", "We were tricked by Prophets", "Nothing"], why: "By Allah, we were truly in a manifest error." },
        { q: "What will they wish for, in 26:102?", a: "A chance to return", wrong: ["More gold", "A long sleep", "A new idol"], why: "If we only had a chance to return, we shall truly be among the believers!" },
        { tf: false, q: "Their leaders will be able to save them.", why: "Can you avail us anything from the Fire? Then they will realize that themselves are to blame." }
      ]
    },
    {
      slug: "nuh-the-first-messenger",
      title: "Nuh, the first Messenger",
      line: "Nuh was the first Messenger sent once idol worship began.",
      facts: ["Denying one denies all", "Will you not have taqwa?"],
      quote: q26(105),
      source: ik(105, "Nuh was the first Messenger Allah sent to the people of earth after they began to worship idols. His people denied him, and denying him was like denying all the Messengers.", "who was the first Messenger sent by Allah to the people of earth after they started to worship idols"),
      difficulty: 4,
      questions: [
        { q: "Why does 26:105 say they denied the Messengers?", a: "Denying one is denying all", wrong: ["Many came at once", "It is a mistake", "Nuh had many names"], why: "Allah revealed that their disbelieving in him was akin to disbelieving in all the Messengers." },
        { q: "When was Nuh sent, per Ibn Kathir?", a: "After idol worship began", wrong: ["Before Adam", "After Musa", "In Makkah"], why: "Who was the first Messenger sent by Allah to the people of earth after they started to worship idols." },
        { q: "What did Nuh ask his people, in 26:106?", a: "Will you not have taqwa?", wrong: ["Will you pay me?", "Will you build a ship?", "Will you travel?"], why: "When their brother Nuh said to them: Will you not have Taqwa?" }
      ]
    },
    {
      slug: "no-payment-asked",
      title: "No payment asked",
      line: "Nuh was a trustworthy Messenger who asked no reward from people.",
      facts: ["He added and removed nothing", "His reward is with Allah"],
      quote: q26(109),
      source: ik(109, "Nuh said he was a trustworthy Messenger, passing on Allah's message without adding or removing anything. He asked them for no payment for his advice; his reward was with the Lord of the worlds.", "I do not want any payment for the advice I give you"),
      difficulty: 4,
      questions: [
        { q: "What did trustworthy mean for Nuh?", a: "Passing the message exactly", wrong: ["Keeping money safe", "Never speaking", "Being rich"], why: "I convey the Messages of my Lord to you, and I do not add anything to them or take anything away from them." },
        { q: "What payment did Nuh ask, in 26:109?", a: "None", wrong: ["Half their crops", "Gold", "A house"], why: "No reward do I ask of you for it; my reward is only from the Lord of all that exists." },
        { tf: true, q: "Hud later said the very same words to his people.", why: "He said to them, as Nuh had said to his people." }
      ]
    },
    {
      slug: "i-will-not-drive-them-away",
      title: "I will not drive them away",
      line: "Nuh refused to send away poor believers to please the proud.",
      facts: ["Hearts are for Allah to judge", "Noble or common, all are welcome"],
      quote: q26(114),
      source: ik(114, "The leaders said they would not follow Nuh when the lowly followed him. Nuh said their account is with Allah, and refused to drive the believers away: whoever believes belongs with him, whether noble or common.", "whether he is noble or common, upper-class or lower-class"),
      difficulty: 5,
      questions: [
        { q: "Why did the leaders refuse Nuh, in 26:111?", a: "Poor people followed him", wrong: ["He was poor", "He was a stranger", "He asked for money"], why: "Shall we believe in you, when the inferior follow you?" },
        { q: "Who judges what is in people's hearts, per Nuh?", a: "Allah", wrong: ["Nuh", "The leaders", "The crowd"], why: "Whatever is in their hearts is for Allah to know." },
        { q: "Which believers did Nuh welcome?", a: "Noble and common alike", wrong: ["Only the rich", "Only his family", "Only the strong"], why: "Then he belongs to me and I to him, whether he is noble or common, upper-class or lower-class." }
      ]
    },
    {
      slug: "the-laden-ship",
      title: "The laden ship",
      line: "Allah saved Nuh and the believers in a ship full of pairs.",
      facts: ["Nuh called for many years", "Judge between me and them"],
      quote: q26(119),
      source: ik(119, "Nuh called his people night and day for a long time, but they threatened to stone him. He asked Allah to judge between them. Allah saved him and the believers in the laden ship, filled with one pair from every species.", "one pair from every species"),
      difficulty: 5,
      questions: [
        { q: "What did his people threaten, in 26:116?", a: "To stone him", wrong: ["To exile him to sea", "To make him king", "To fine him"], why: "If you cease not, O Nuh you will surely be among those stoned." },
        { q: "What filled the laden ship, per Ibn Kathir?", a: "Cargo and pairs of every species", wrong: ["Only gold", "Only soldiers", "Nothing"], why: "One that is filled with cargo and the couples, one pair from every species." },
        { q: "How did Nuh call his people?", a: "Night and day, secretly and openly", wrong: ["Once only", "By letter", "Only on Fridays"], why: "Calling them to Allah night and day, in secret and openly." }
      ]
    },
    {
      slug: "ad-of-the-sand-hills",
      title: "'Ad of the sand hills",
      line: "Hud was sent to 'Ad, a tall, strong people near Hadramawt.",
      facts: ["They came after Nuh's people", "Blessed with wealth and gardens"],
      quote: q26(124),
      source: ik(124, "Hud was sent to his people 'Ad, who lived in the Ahqaf, curved sand-hills near Hadramawt by Yemen. They came after Nuh's people, were tall and strong, and had wealth, gardens and children, yet they worshipped others.", "curved sand-hills near Hadramawt"),
      difficulty: 5,
      questions: [
        { q: "Where did 'Ad live, per Ibn Kathir?", a: "Sand hills near Hadramawt", wrong: ["The banks of the Nile", "Makkah", "Damascus"], why: "His people used to live in the Ahqaf, curved sand-hills near Hadramawt, on the borders of Yemen." },
        { q: "When did 'Ad live?", a: "After the people of Nuh", wrong: ["Before Adam", "After Musa", "In Madinah's time"], why: "They lived after the time of Nuh." },
        { tf: false, q: "Hud was a stranger from another land.", why: "So Allah sent Hud, one of their own, as a Messenger." }
      ]
    },
    {
      slug: "building-to-show-off",
      title: "Building to show off",
      line: "Hud warned against useless towers built only to show off.",
      facts: ["They built as if living forever", "They were harsh like tyrants"],
      quote: q26(128),
      source: ik(128, "'Ad built huge landmarks on high places for fun, not need, just to show off their strength. Hud told them this wasted time and effort. They built strong fortresses as if they would live forever, and seized people like tyrants.", "for fun and to show off your strength"),
      difficulty: 5,
      questions: [
        { q: "Why did 'Ad build their landmarks?", a: "To show off their strength", wrong: ["To shelter the poor", "To pray in them", "To store food"], why: "Not because you need it, but for fun and to show off your strength." },
        { q: "How did they build, in 26:129?", a: "As if living forever", wrong: ["With mud", "Quickly", "Only for guests"], why: "And do you get for yourselves Masani' as if you will live therein forever?" },
        { q: "Why was it blameworthy?", a: "It wasted time and effort", wrong: ["It was too small", "It was ugly", "It was too cheap"], why: "It was a waste of time and exhausted people's bodies for no purpose." }
      ]
    },
    {
      slug: "remember-his-gifts",
      title: "Remember His gifts",
      line: "Hud reminded them of cattle, children, gardens and springs.",
      facts: ["Warning with encouragement", "Fear a great Day"],
      quote: q26(133),
      source: ik(133, "Hud began reminding them of Allah's blessings: cattle, children, gardens and springs. He called them with encouragement and warning, fearing for them the punishment of a great Day, but it did not help.", "Then Hud began reminding them of the blessings that Allah had bestowed upon them"),
      difficulty: 5,
      questions: [
        { q: "Which blessings did Hud name, in 26:133-134?", a: "Cattle, children, gardens, springs", wrong: ["Ships and ports", "Gold and silk", "Horses and swords"], why: "He has aided you with cattle and children, and gardens and springs." },
        { q: "How did Hud call his people?", a: "With hope and warning", wrong: ["Only with threats", "With money", "Only by silence"], why: "So he called them to Allah with words of encouragement and words of warning." },
        { tf: true, q: "Hud feared the punishment of a great Day for them.", why: "Verily, I fear for you the torment of a Great Day." }
      ]
    },
    {
      slug: "same-to-us",
      title: "It is all the same to us",
      line: "'Ad ignored Hud, so a fierce wind ended them.",
      facts: ["They followed their forefathers", "Stronger than the strongest"],
      quote: q26(139),
      source: ik(139, "'Ad said: it is all the same to us whether you preach or not, and we will not be punished. They kept denying Hud, so Allah destroyed them with a strong, furious, freezing wind, stronger than the strongest people.", "Allah sent against them a strong and furious wind"),
      difficulty: 5,
      questions: [
        { q: "What did 'Ad say to Hud, in 26:136?", a: "Preaching makes no difference", wrong: ["Teach us more", "We believe", "Give us time"], why: "It is the same to us whether you preach or be not of those who preach." },
        { q: "How were 'Ad destroyed, per Ibn Kathir?", a: "A strong, furious wind", wrong: ["A flood", "An earthquake", "A fire"], why: "Allah sent against them a strong and furious wind, a fiercely blowing wind that was intensely cold." },
        { q: "Why was a wind suited to them?", a: "It was stronger than their strength", wrong: ["They loved wind", "They lived at sea", "It was summer"], why: "They were the strongest and fiercest of people, so Allah overpowered them with something even stronger." }
      ]
    }
  ]
};

/** Ayahs 141 to 227: Salih and the she-camel, Lut, Shu'ayb and fair measures, the Quran brought by Jibril, warning near family, and the poets. */
const SHUARA_THREE: DeepUnit = {
  key: "shuara3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-26",
  name: "Ash-Shu'ara, ayahs 141-227",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ash-Shu'ara",
  lessons: [
    {
      slug: "salih-and-thamud",
      title: "Salih and Thamud",
      line: "Salih was sent to Thamud, Arabs of Al-Hijr, after 'Ad.",
      facts: ["He asked them for no reward", "He reminded them of blessings"],
      quote: q26(142),
      source: ik(142, "Salih was sent to his people Thamud, Arabs who lived in Al-Hijr between Wadi Al-Qura and Syria. They came after 'Ad and before Ibrahim. Salih called them to worship Allah alone and asked no reward from them.", "Thamud came after"),
      difficulty: 2,
      questions: [
        { q: "Where did Thamud live, per Ibn Kathir?", a: "Al-Hijr", wrong: ["Egypt", "Yemen's sand hills", "Madinah"], why: "They were Arabs living in the city of Al-Hijr, which is between Wadi Al-Qura and Greater Syria." },
        { q: "When did Thamud live?", a: "After 'Ad, before Ibrahim", wrong: ["Before Nuh", "After Musa", "After Isa"], why: "Thamud came after 'Ad and before Ibrahim, peace be upon him." },
        { tf: true, q: "Salih asked his people for no reward.", why: "He told them that he did not seek any reward from them for his call to them." }
      ]
    },
    {
      slug: "houses-in-the-mountains",
      title: "Houses carved in mountains",
      line: "Thamud carved fine houses in mountains, with gardens and palms.",
      facts: ["Will you be left safe forever?", "Built for show, not need"],
      quote: q26(149),
      source: ik(149, "Salih reminded them of Allah's gifts: safety, gardens, springs, crops and soft ripe dates. They skillfully carved houses into mountains, but for extravagant show, not because they needed them.", "They were highly skilled in the arts of masonry and stone-carving"),
      difficulty: 2,
      questions: [
        { q: "Where did Thamud build houses, in 26:149?", a: "In the mountains", wrong: ["On boats", "In the sand", "In trees"], why: "And you hew out in the mountains, houses with great skill." },
        { q: "What were they skilled in, per Ibn Kathir?", a: "Stone-carving", wrong: ["Shipbuilding", "Weaving silk", "Horse racing"], why: "They were highly skilled in the arts of masonry and stone-carving." },
        { q: "What were their dates like, in 26:148?", a: "Soft and ripe", wrong: ["Dry and hard", "Bitter", "Very few"], why: "And date palms with soft clusters. Ibn Abbas said: when it becomes ripe and soft." }
      ]
    },
    {
      slug: "do-not-obey-the-wasteful",
      title: "Do not obey the wasteful",
      line: "Salih warned: do not follow leaders who spread mischief.",
      facts: ["The extravagant cause corruption", "They never set things right"],
      quote: q26(151),
      source: ik(151, "Salih told them to fear Allah and obey him, and not to follow the extravagant who make mischief and never set things right. These were their chiefs and leaders who called them to shirk and to oppose the truth.", "their chiefs and leaders, who called them to Shirk"),
      difficulty: 2,
      questions: [
        { q: "Who are the extravagant, per Ibn Kathir?", a: "Their chiefs and leaders", wrong: ["The poor", "The children", "The travelers"], why: "Meaning, their chiefs and leaders, who called them to Shirk, disbelief and opposition to the truth." },
        { q: "What do the extravagant do, in 26:152?", a: "Make mischief, not reform", wrong: ["Build schools", "Feed the poor", "Guard the land"], why: "Who make mischief in the land, and reform not." },
        { tf: false, q: "Salih told them to obey their chiefs over Allah.", why: "And follow not the command of the extravagant." }
      ]
    },
    {
      slug: "the-she-camel",
      title: "The she-camel from the rock",
      line: "Thamud asked for a sign; a she-camel came out of a rock.",
      facts: ["Water shared day by day", "Some believed, most did not"],
      quote: q26(155),
      source: ik(155, "They called Salih bewitched and asked for a sign: a she-camel from a rock they pointed to. Salih prayed, the rock split and the she-camel came out. She would drink one day, and they the next.", "the rock to which they had pointed split open"),
      difficulty: 3,
      questions: [
        { q: "Where did the she-camel come from?", a: "A rock that split open", wrong: ["The desert", "The sea", "A market"], why: "Then the rock to which they had pointed split open, revealing a she-camel." },
        { q: "How was the water shared, in 26:155?", a: "Each on its own day", wrong: ["All at once", "Only at night", "She never drank"], why: "She will drink from your water one day, and on the next day you will drink from it." },
        { q: "What did Salih do before the sign came?", a: "He prayed to Allah", wrong: ["He ran away", "He hit the rock", "He asked for money"], why: "Salih stood and prayed, then he prayed to Allah to grant them their request." }
      ]
    },
    {
      slug: "touch-her-not",
      title: "Do not harm her",
      line: "They harmed the she-camel against the warning, then felt regret.",
      facts: ["Her milk fed them all", "Regret came too late"],
      quote: q26(157),
      source: ik(157, "Salih warned them not to harm her. She lived among them for a long time and they all drank their fill of her milk. Then they plotted against her, harmed her, and became regretful, but the punishment came.", "they benefitted from her milk which they took in sufficient quantities for every one to drink his fill"),
      difficulty: 3,
      questions: [
        { q: "What did the she-camel give them?", a: "Milk for everyone", wrong: ["Gold", "Wool only", "Nothing"], why: "They benefitted from her milk which they took in sufficient quantities for every one to drink his fill." },
        { q: "What did Salih warn them, in 26:156?", a: "Do not harm her", wrong: ["Sell her", "Ride her", "Hide her"], why: "And touch her not with harm, lest the torment of a Great Day should seize you." },
        { tf: true, q: "They became regretful after harming her.", why: "But they killed her, and then they became regretful." }
      ]
    },
    {
      slug: "lut-is-saved",
      title: "Lut and his family saved",
      line: "Allah saved Lut, Ibrahim's nephew, and his family.",
      facts: ["They lived in Sadum", "His wife stayed behind"],
      quote: q26(170),
      source: ik(160, "Lut was the nephew of Ibrahim. Allah sent him to the people of Sadum to worship Allah alone and leave a shameful sin. They threatened to drive him out, and Allah saved him and his family, except his wife.", "the nephew of Ibrahim Al-Khalil"),
      difficulty: 3,
      questions: [
        { q: "How was Lut related to Ibrahim?", a: "His nephew", wrong: ["His son", "His father", "His teacher"], why: "He was Lut bin Haran bin Azar, the nephew of Ibrahim Al-Khalil." },
        { q: "What did his people threaten, in 26:167?", a: "To drive him out", wrong: ["To crown him", "To pay him", "To follow him"], why: "If you cease not, O Lut, verily, you will be one of those who are driven out!" },
        { q: "Who was not saved with Lut's family?", a: "His wife", wrong: ["His daughters", "His guests", "No one"], why: "Except an old woman among those who remained behind. This was his wife." }
      ]
    },
    {
      slug: "people-of-the-thicket",
      title: "The people of the thicket",
      line: "The people of Al-Aykah were the people of Madyan, sent Shu'ayb.",
      facts: ["Al-Aykah was a worshipped tree", "One nation, two names"],
      quote: q26(176),
      source: ik(176, "The companions of Al-Aykah were the people of Madyan, per the most correct view. Aykah was a tree, or thicket, they worshipped. So Shu'ayb is not called their brother here, since the name was tied to their idol.", "The companions of Al-Aykah were the people of Madyan, according to the most correct view"),
      difficulty: 3,
      questions: [
        { q: "Who were the people of Al-Aykah?", a: "The people of Madyan", wrong: ["The people of 'Ad", "Fir'awn's people", "The people of Lut"], why: "The companions of Al-Aykah were the people of Madyan, according to the most correct view." },
        { q: "What was Al-Aykah?", a: "A tree they worshipped", wrong: ["A river", "A king", "A mountain"], why: "Al-Aykah, which was a tree which they used to worship." },
        { q: "Why is Shu'ayb not called their brother, in 26:177?", a: "The name honored their idol", wrong: ["He was a stranger", "He was angry", "He had no family"], why: "Because they called themselves by a name denoting their deification of Al-Aykah." }
      ]
    },
    {
      slug: "give-full-measure",
      title: "Give full measure",
      line: "Shu'ayb said: weigh fairly; give as you take.",
      facts: ["Use a true balance", "Do not cheat people"],
      quote: q26(181),
      source: ik(181, "Shu'ayb told them to give full measure and weigh with a true balance, not to cheat people of their things or cause corruption. When you give, give in full, just as you want it when you take.", "Give as you take, and take as you give"),
      difficulty: 4,
      questions: [
        { q: "What is the rule of fair trade, per Ibn Kathir?", a: "Give as you take", wrong: ["Take more than you give", "Never trade", "Only buy"], why: "Give as you take, and take as you give." },
        { q: "What must the balance be, in 26:182?", a: "True and straight", wrong: ["Heavy", "Golden", "Hidden"], why: "And weigh with the true and straight balance." },
        { tf: false, q: "Giving short measure is fine if no one notices.", why: "And defraud not people by reducing their things." }
      ]
    },
    {
      slug: "the-day-of-shadow",
      title: "The Day of the Shadow",
      line: "They dared Shu'ayb to drop the sky; a shading cloud ended them.",
      facts: ["My Lord knows best what you do", "They got what they asked for"],
      quote: q26(189),
      source: ik(189, "They called Shu'ayb bewitched and a liar and dared him to make a piece of the sky fall on them. Their punishment matched what they asked for: after days of great heat, a cloud came that they ran under, and the punishment came from it.", "This is what they asked for, when they asked for a part of the heaven to fall upon them"),
      difficulty: 4,
      questions: [
        { q: "What did they dare Shu'ayb to do, in 26:187?", a: "Make the sky fall on them", wrong: ["Build a tower", "Bring rain", "Find gold"], why: "So, cause a piece of the heaven to fall on us, if you are of the truthful!" },
        { q: "What was Shu'ayb's answer, in 26:188?", a: "My Lord knows best", wrong: ["I will do it now", "I cannot hear you", "Pay me first"], why: "He said: My Lord is the Best Knower of what you do." },
        { q: "Why did a cloud fit their punishment?", a: "They asked for the sky to fall", wrong: ["They loved clouds", "It was winter", "They were farmers"], why: "This is what they asked for, when they asked for a part of the heaven to fall upon them." }
      ]
    },
    {
      slug: "brought-by-jibril",
      title: "Brought down by Jibril",
      line: "Jibril, the trustworthy Ruh, brought the Quran down.",
      facts: ["From the Lord of the worlds", "Nothing added or removed"],
      quote: q26(193),
      source: ik(193, "The Quran is a revelation from the Lord of the worlds. The trustworthy Ruh who brought it down is Jibril, with no dispute about it. He brought it to the Prophet's ﷺ heart, with nothing added or taken away.", "This refers to Jibril, peace be upon him"),
      difficulty: 4,
      questions: [
        { q: "Who is the trustworthy Ruh, in 26:193?", a: "Jibril", wrong: ["Mikail", "A poet", "A king"], why: "Which the trustworthy Ruh has brought down. This refers to Jibril, peace be upon him." },
        { q: "Where was it brought down, in 26:194?", a: "Upon his heart", wrong: ["On a stone", "Into a book", "On a mountain"], why: "Upon your heart that you may be (one) of the warners." },
        { tf: true, q: "Scholars do not dispute that the Ruh is Jibril.", why: "This is an issue concerning which there is no dispute." }
      ]
    },
    {
      slug: "clear-arabic",
      title: "In clear Arabic",
      line: "The Quran came in clear, eloquent Arabic, leaving no excuse.",
      facts: ["Mentioned in earlier Books", "Scholars of Israel knew it"],
      quote: q26(195),
      source: ik(195, "The Quran was revealed in perfect, eloquent Arabic so it would be clear, leave no room for excuses and show the straight path. It was also mentioned in earlier Books, and fair-minded scholars of the Children of Israel recognized it.", "We have revealed in perfect and eloquent Arabic, so that it may be quite clear"),
      difficulty: 4,
      questions: [
        { q: "In which language was the Quran revealed, in 26:195?", a: "Plain Arabic", wrong: ["Hebrew", "Greek", "Persian"], why: "In the plain Arabic language." },
        { q: "Why clear Arabic, per Ibn Kathir?", a: "To leave no excuse", wrong: ["To be short", "To be secret", "To rhyme"], why: "So that it may be quite clear, leaving no room for excuses and establishing clear proof." },
        { q: "Who recognized it from their Books, in 26:197?", a: "Scholars of the Children of Israel", wrong: ["The poets", "The sorcerers", "Fir'awn's chiefs"], why: "Is it not a sign to them that the learned scholars of the Children of Israel knew it?" }
      ]
    },
    {
      slug: "always-a-warner-first",
      title: "Always a warner first",
      line: "Allah never punished a town before sending it a warner.",
      facts: ["Allah is never unjust", "Comfort does not save anyone"],
      quote: q26(208),
      source: ik(208, "Allah is just: He does not destroy any nation until He has warned it, sent Messengers and left it no excuse. Years of comfort will not help those who still deny when the promise comes.", "He does not destroy any nation until after He has left them with no excuse"),
      difficulty: 4,
      questions: [
        { q: "What comes before any town is punished, in 26:208?", a: "A warner", wrong: ["A storm", "A famine", "Nothing"], why: "And never did We destroy a township but it had its warners." },
        { q: "What does this show about Allah, per Ibn Kathir?", a: "His justice", wrong: ["His anger only", "His hurry", "His distance"], why: "Allah tells us of His justice towards His creation." },
        { q: "Will years of enjoyment help deniers, in 26:207?", a: "No, it will not avail them", wrong: ["Yes, fully", "Only if rich", "Only the old"], why: "All that with which they used to enjoy shall not avail them." }
      ]
    },
    {
      slug: "not-from-devils",
      title: "Not from the devils",
      line: "Devils could never bring the Quran: it does not suit them.",
      facts: ["They are unable to", "They are kept from hearing"],
      quote: q26(211),
      source: ik(211, "The Quran was not brought by devils, for three reasons: it does not suit them, since it commands good; they are not able to; and they were kept far from hearing it while it was being revealed.", "it could not be the case for three reasons"),
      difficulty: 5,
      questions: [
        { q: "How many reasons does Ibn Kathir give?", a: "Three", wrong: ["One", "Seven", "Ten"], why: "It could not be the case for three reasons that the Shayatin brought it down." },
        { q: "Why would the Quran not suit devils?", a: "It commands good", wrong: ["It is too short", "It is in Arabic", "It is old"], why: "This contains words enjoining what is right and forbidding what is evil, and light, guidance." },
        { tf: true, q: "Devils were kept from hearing it, in 26:212.", why: "Verily, they have been removed far from hearing it." }
      ]
    },
    {
      slug: "warn-your-family",
      title: "Warn your near family",
      line: "Told to warn his family, the Prophet ﷺ called from As-Safa.",
      facts: ["They trusted his truthfulness", "He warned them of the Hereafter"],
      quote: q26(214),
      source: hadith("bukhari", "4770", "Abdullah ibn Abbas", "Sahih", "When 26:214 came, the Prophet ﷺ climbed As-Safa and called the tribes of Quraysh. He asked: if I told you an army was in the valley, would you believe me? They said yes, we have only known you to speak the truth. He said: I am a warner to you.", "we have not found you telling anything other than the truth"),
      difficulty: 5,
      questions: [
        { q: "Where did the Prophet ﷺ call his people from?", a: "As-Safa", wrong: ["The Kaaba roof", "Uhud", "A ship"], why: "The Prophet ﷺ ascended the Safa (mountain) and started calling." },
        { q: "Why did Quraysh say they would believe him?", a: "He always told the truth", wrong: ["He was rich", "He was a poet", "He was the oldest"], why: "They said: Yes, for we have not found you telling anything other than the truth." },
        { q: "Who does 26:214 tell him to warn first?", a: "His near kindred", wrong: ["Only strangers", "Only kings", "Only the Jinn"], why: "And warn your tribe of near kindred." }
      ]
    },
    {
      slug: "i-cannot-save-you",
      title: "I cannot save you from Allah",
      line: "The Prophet ﷺ told even Fatima: your own deeds must save you.",
      facts: ["Family ties do not replace faith", "Each must work for himself"],
      quote: q26(214),
      source: hadith("bukhari", "4771", "Abu Hurairah", "Sahih", "When 26:214 came, the Prophet ﷺ called out to Quraysh, to Abbas, to Safiyyah and to Fatima: save yourselves, I cannot save you from Allah. To Fatima he said: ask me what you wish of my wealth, but I cannot save you from Allah.", "Ask what you wish from my property, but I cannot save you from Allah"),
      difficulty: 5,
      questions: [
        { q: "What did the Prophet ﷺ tell Fatima?", a: "I cannot save you from Allah", wrong: ["You are safe anyway", "Do nothing", "Only pray at night"], why: "Ask what you wish from my property, but I cannot save you from Allah." },
        { q: "What could Fatima ask him for?", a: "His wealth", wrong: ["Paradise for free", "A kingdom", "Nothing at all"], why: "O Fatima, the daughter of Muhammad! Ask what you wish from my property." },
        { tf: false, q: "Being related to a Prophet is enough to be saved.", why: "O Abbas, the son of Abdul Muttalib! I cannot save you from Allah." }
      ]
    },
    {
      slug: "lower-your-wing",
      title: "Gentle with the believers",
      line: "Allah told the Prophet ﷺ to be humble and kind to believers.",
      facts: ["Trust the Mighty, the Merciful", "He is your Helper"],
      quote: q26(215),
      source: ik(215, "Allah told His Messenger ﷺ to warn his close family and to be kind and gentle with the believers who followed him, to put his trust in the Almighty, the Most Merciful, who is his Helper and Protector.", "to be kind and gentle with the believing servants of Allah who followed him"),
      difficulty: 5,
      questions: [
        { q: "How should he treat the believers, in 26:215?", a: "Kind and humble", wrong: ["Strict and cold", "Distant", "Proud"], why: "And be kind and humble to the believers who follow you." },
        { q: "Whom should he trust, in 26:217?", a: "The All-Mighty, Most Merciful", wrong: ["His tribe", "His wealth", "The poets"], why: "And put your trust in the All-Mighty, the Most Merciful." },
        { q: "What is Allah to him, per Ibn Kathir?", a: "Helper and Protector", wrong: ["A stranger", "A judge only", "Far away"], why: "For He is your Helper, Protector and Supporter." }
      ]
    },
    {
      slug: "he-sees-you-pray",
      title: "He sees you when you stand",
      line: "Allah sees you stand in prayer, alone or in a group.",
      facts: ["He sees every bow and sujud", "All-Hearing, All-Knowing"],
      quote: q26(218),
      source: ik(218, "Allah sees you when you stand up to pray, and your movements among those who prostrate. Qatadah said He sees you when you pray alone and when you pray in congregation. He hears and knows everything.", "He sees you when you pray alone and when you pray in congregation"),
      difficulty: 5,
      questions: [
        { q: "What does standing up mean, per Ibn Abbas?", a: "Standing to pray", wrong: ["Standing to trade", "Waking up only", "Standing to fight"], why: "Ibn Abbas said that the Ayah, Who sees you when you stand up, means: To pray." },
        { q: "When does Allah see you pray, per Qatadah?", a: "Alone and in congregation", wrong: ["Only in the mosque", "Only on Friday", "Only at night"], why: "He sees you when you pray alone and when you pray in congregation." },
        { q: "Which names end this passage, in 26:220?", a: "All-Hearer, All-Knower", wrong: ["King, Holy", "First, Last", "Creator, Shaper"], why: "Verily, He, only He, is the All-Hearer, the All-Knower." }
      ]
    },
    {
      slug: "fortune-tellers",
      title: "Fortune-tellers are nothing",
      line: "Fortune-tellers mix one stolen word with a hundred lies.",
      facts: ["Devils come to liars", "Do not trust fortune-tellers"],
      quote: q26(222),
      source: hadith("bukhari", "5762", "Aisha", "Sahih", "People asked the Prophet ﷺ about fortune-tellers and he said: they are nothing. They said sometimes what they say comes true. He said: a jinn snatches a true word and pours it into the ear of his friend, who mixes it with a hundred lies.", "The foreteller then mixes with that word one hundred lies"),
      difficulty: 5,
      questions: [
        { q: "What did the Prophet ﷺ say about fortune-tellers?", a: "They are nothing", wrong: ["They are wise", "They are Prophets", "Ask them often"], why: "Some people asked Allah's Messenger ﷺ about the fore-tellers. He said: They are nothing." },
        { q: "How many lies are mixed with one true word?", a: "One hundred", wrong: ["One", "Ten", "None"], why: "The foreteller then mixes with that word one hundred lies." },
        { q: "On whom do the devils descend, in 26:222?", a: "Every sinful liar", wrong: ["The Prophets", "The angels", "The believers"], why: "They descend on every lying, sinful person." }
      ]
    },
    {
      slug: "the-poets",
      title: "The poets",
      line: "Poets say what they do not do; the Prophet ﷺ was no poet.",
      facts: ["The astray follow them", "The Quran is not poetry"],
      quote: q26(226),
      source: ik(226, "Some poets wander into every kind of nonsense and say what they do not do, and the misguided follow them. The Messenger ﷺ who brought the Quran was not a poet or soothsayer; his case was clearly different.", "They indulge in every kind of nonsense"),
      difficulty: 5,
      questions: [
        { q: "What do such poets do, in 26:226?", a: "Say what they do not do", wrong: ["Always tell the truth", "Teach Quran", "Never speak"], why: "And that they say what they do not do." },
        { q: "How did Ibn Abbas explain 26:225?", a: "They indulge in nonsense", wrong: ["They pray much", "They farm", "They travel"], why: "Ibn Abbas said: They indulge in every kind of nonsense." },
        { tf: false, q: "The Prophet ﷺ was a poet.", why: "The Messenger ﷺ to whom this Qur'an was revealed, was not a soothsayer or a poet." }
      ]
    },
    {
      slug: "the-good-poets",
      title: "Poets who believe",
      line: "Believing poets who do good and remember Allah are excepted.",
      facts: ["Good deeds wipe out bad", "Words can defend the truth"],
      quote: q26(227),
      source: ik(227, "Except those who believe, do good deeds, remember Allah much and defend themselves when wronged. Ibn Kathir says this includes poets who once mocked Islam, then repented and praised it, for good deeds wipe out bad deeds.", "for good deeds wipe out bad deeds"),
      difficulty: 5,
      questions: [
        { q: "Which poets are excepted, in 26:227?", a: "Those who believe and do good", wrong: ["The richest poets", "The oldest poets", "None"], why: "Except those who believe and do righteous deeds, and remember Allah much." },
        { q: "What did repentant poets do, per Ibn Kathir?", a: "Praised Islam to make up", wrong: ["Stopped speaking", "Left Arabia", "Burned their books"], why: "So they praised Islam and its followers in order to make up for their insults." },
        { q: "What rule does Ibn Kathir give about repentant poets?", a: "Good deeds wipe out bad", wrong: ["Words never matter", "Poems are sins", "Old sins stay forever"], why: "For good deeds wipe out bad deeds." }
      ]
    }
  ]
};

export const SHUARA_UNITS: readonly DeepUnit[] = [SHUARA_ONE, SHUARA_TWO, SHUARA_THREE];
