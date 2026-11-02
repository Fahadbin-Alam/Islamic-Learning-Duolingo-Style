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

export const SHUARA_UNITS: readonly DeepUnit[] = [SHUARA_ONE];
