import { hadith, type DeepUnit } from "./deepKit";

// Deeper lessons for ten more companions, each joining the companion's own unit in the Sahabah topic after its
// starter circles. Every lesson rests on a sahih hadith (Bukhari or Muslim, or Tirmidhi graded sahih); stories
// from weak chains are left out.

const KHALID: DeepUnit = {
  key: "khalid",
  topicId: "sahabah",
  branchId: "sahabi-khalid-ibn-al-walid",
  name: "Khalid ibn al-Walid",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "sword-of-allah",
      title: "One of Allah's swords",
      line: "At Mu'tah, after three leaders fell, Khalid took the flag.",
      facts: ["This was said at the Battle of Mu'tah.", "Three leaders fell before him.", "Allah gave the Muslims victory."],
      source: hadith("bukhari", "3757", "Anas ibn Malik", "Sahih", "Zaid, Ja'far and Ibn Rawaha fell carrying the flag; then one of Allah's swords took it, and Allah gave victory."),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ call Khalid?", a: "One of the swords of Allah", wrong: ["The lion of Allah", "The trustworthy one", "The truthful one"], why: "He said a sword of Allah took the flag." },
        { q: "At which battle did Khalid take the flag?", a: "Mu'tah", wrong: ["Badr", "Uhud", "Khandaq"], why: "Mu'tah was fought far north, near Sham." },
        { q: "Who carried the flag first at Mu'tah?", a: "Zaid", wrong: ["Khalid", "Ja'far", "Ibn Rawaha"], why: "Zaid, then Ja'far, then Ibn Rawaha, then Khalid." },
        { q: "The Prophet ﷺ told the people about Mu'tah before the news arrived.", tf: true, why: "Allah let him know, and his eyes filled with tears." }
      ]
    },
    {
      slug: "nine-swords",
      title: "Nine broken swords",
      line: "At Mu'tah, nine swords broke in Khalid's hand.",
      facts: ["Only a Yemeni sword was left.", "He told this himself."],
      source: hadith("bukhari", "4265", "Khalid bin Al-Walid", "Sahih", "On the day of Mu'tah nine swords broke in my hand; only a Yemeni sword of mine was left."),
      difficulty: 3,
      questions: [
        { q: "How many swords broke in Khalid's hand at Mu'tah?", a: "Nine", wrong: ["Two", "Five", "Twenty"], why: "He said nine swords broke in his hand." },
        { q: "Which sword was left in his hand?", a: "A Yemeni sword", wrong: ["A sword from Rome", "The Prophet's ﷺ sword", "A wooden sword"], why: "Only his Yemeni sword was left." },
        { q: "What does this show about Khalid at Mu'tah?", a: "He stood firm in a very hard battle", wrong: ["He ran away early", "He did not fight", "He fought for money"], why: "Breaking nine swords means a long, hard fight." },
        { q: "Someone else told this story about Khalid.", tf: false, why: "Khalid told it about himself." }
      ]
    },
    {
      slug: "armor-for-allah",
      title: "Armor kept for Allah",
      line: "Khalid kept his armor and weapons for Allah's cause.",
      facts: ["The zakat collectors asked him for zakat.", "The Prophet ﷺ defended him."],
      source: hadith("bukhari", "1468", "Abu Hurairah", "Sahih", "You are unfair to Khalid: he has kept his armor and weapons for Allah's cause."),
      difficulty: 3,
      questions: [
        { q: "Why did the Prophet ﷺ say asking Khalid for zakat was unfair?", a: "His armor was kept for Allah's cause", wrong: ["Khalid was too poor", "Khalid was not a Muslim", "Khalid had paid twice"], why: "His armor was already given for Allah." },
        { q: "Who defended Khalid when the zakat collector complained?", a: "The Prophet ﷺ", wrong: ["Abu Bakr", "Umar", "No one"], why: "The Prophet ﷺ himself spoke up for him." },
        { q: "What had Khalid set aside for Allah's cause?", a: "His armor and weapons", wrong: ["His camels", "His house", "His gold"], why: "He kept them for the path of Allah." },
        { q: "Khalid used his armor to show off.", tf: false, why: "He kept it only for Allah's cause." }
      ]
    },
    {
      slug: "lizard",
      title: "Not haram, just disliked",
      line: "Khalid ate a dish the Prophet ﷺ disliked but did not forbid.",
      facts: ["It was in Maymunah's house.", "The dish was a roasted dabb lizard.", "The Prophet ﷺ watched him eat it."],
      source: hadith("bukhari", "5537", "Khalid bin Al-Walid", "Sahih", "It is not haram, but it is not found in my people's land, so I dislike it. Khalid ate it as the Prophet ﷺ watched."),
      difficulty: 4,
      questions: [
        { q: "Khalid asked if the roasted lizard was haram. What was the answer?", a: "No, but I dislike it", wrong: ["Yes, it is haram", "Only on Fridays", "Only for kids"], why: "Not haram, just not food of his people's land." },
        { q: "Why did the Prophet ﷺ not eat it?", a: "It was not found in his people's land", wrong: ["It was haram", "He was fasting", "It was too hot"], why: "He was not used to it, so he disliked it." },
        { q: "What does this teach about food?", a: "Disliking a food does not make it haram", wrong: ["Every disliked food is haram", "Never eat new food", "Only eat what others eat"], why: "Only Allah and His Messenger ﷺ make things haram." }
      ]
    }
  ]
};

const BILAL: DeepUnit = {
  key: "bilal",
  topicId: "sahabah",
  branchId: "sahabi-bilal-ibn-rabah",
  name: "Bilal",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "first-adhan",
      title: "Bilal, stand and call!",
      line: "In Madinah, Bilal was told: stand and call to prayer.",
      facts: ["Before, people guessed the prayer time.", "Bells and horns were turned down.", "Umar suggested a man who calls out."],
      source: hadith("bukhari", "604", "Ibn Umar", "Sahih", "The Muslims in Madinah discussed how to call to prayer; the Prophet ﷺ said: O Bilal, stand and call to prayer."),
      difficulty: 2,
      questions: [
        { q: "Whom did the Prophet ﷺ tell to call the adhan?", a: "Bilal", wrong: ["Umar", "Anas", "Abu Hurairah"], why: "He said: O Bilal, get up and call." },
        { q: "Before the adhan, how did Muslims know the prayer time?", a: "They guessed it", wrong: ["Ringing a bell", "Blowing a horn", "Lighting a fire"], why: "They gathered by guessing the time." },
        { q: "Which ideas did the Muslims NOT choose?", a: "A bell or a horn", wrong: ["A man calling", "Bilal's voice", "Calling aloud"], why: "They chose a human voice, not a bell or horn." },
        { q: "Who first suggested that a man should call people to prayer?", a: "Umar", wrong: ["Bilal", "Uthman", "Ali"], why: "Umar suggested it; then Bilal was chosen." }
      ]
    },
    {
      slug: "footsteps",
      title: "Footsteps in Paradise",
      line: "Bilal prayed after every wudu, a deed heard in Paradise.",
      facts: ["He prayed after every wudu.", "He was asked at the Fajr prayer."],
      source: hadith("bukhari", "1149", "Abu Hurairah", "Sahih", "I heard your footsteps before me in Paradise. Bilal said: whenever I made wudu, I prayed after it."),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ hear in Paradise?", a: "Bilal's footsteps", wrong: ["Bilal's adhan", "Bilal's voice reciting", "Bilal's laugh"], why: "He heard his footsteps ahead of him." },
        { q: "Which deed did Bilal say he did?", a: "Praying after every wudu", wrong: ["Fasting every day", "Giving all his money", "Reading all night"], why: "Whenever he made wudu, he prayed after it." },
        { q: "A small habit, done always, can be very great.", tf: true, why: "Bilal's steady habit was praised." },
        { q: "When did the Prophet ﷺ ask Bilal about this?", a: "At the Fajr prayer", wrong: ["At Isha", "On Eid", "In Ramadan"], why: "He asked him at the time of Fajr." }
      ]
    },
    {
      slug: "our-master",
      title: "\"Our master\"",
      line: "Umar called Bilal 'our master', freed by Abu Bakr.",
      facts: ["Abu Bakr bought Bilal and freed him.", "Islam honors people for their taqwa."],
      source: hadith("bukhari", "3754", "Jabir bin Abdullah", "Sahih", "Umar used to say: Abu Bakr is our master, and he freed our master, meaning Bilal."),
      difficulty: 3,
      questions: [
        { q: "What did Umar call Bilal?", a: "Our master", wrong: ["Our servant", "Our guest", "Our helper"], why: "Umar called him 'our master', a great honor." },
        { q: "Who freed Bilal?", a: "Abu Bakr", wrong: ["Umar", "Uthman", "Abu Sufyan"], why: "Abu Bakr freed him, so Umar praised both." },
        { q: "What does Umar's saying teach?", a: "Faith, not birth, gives honor", wrong: ["Rich people are better", "Freed people stay low", "Only Arabs are honored"], why: "A freed man was called 'our master'." },
        { q: "Umar was the one who told this.", tf: true, why: "Jabir heard Umar say it." }
      ]
    },
    {
      slug: "two-callers",
      title: "Before Fajr",
      line: "Bilal called before dawn; eat until the second adhan.",
      facts: ["Madinah had two callers to prayer.", "Eat until Ibn Umm Maktum calls."],
      source: hadith("bukhari", "617", "Abdullah bin Umar", "Sahih", "Bilal calls the adhan at night, so eat and drink until Ibn Umm Maktum calls."),
      difficulty: 4,
      questions: [
        { q: "Bilal called an adhan at night. What were people told?", a: "Keep eating until the second adhan", wrong: ["Stop eating at once", "Pray Fajr now", "Go back to sleep"], why: "The second caller marked true Fajr." },
        { q: "Who called the adhan at true Fajr?", a: "Ibn Umm Maktum", wrong: ["Bilal", "Abu Mahdhurah", "Umar"], why: "His adhan meant the fast had begun." },
        { q: "How many callers to prayer did Madinah have, by Bukhari 617?", a: "Two", wrong: ["One", "Four", "Ten"], why: "Bilal and Ibn Umm Maktum." }
      ]
    }
  ]
};

const ABU_UBAYDAH: DeepUnit = {
  key: "abuubaydah",
  topicId: "sahabah",
  branchId: "sahabi-abu-ubaydah-ibn-al-jarrah",
  name: "Abu Ubaydah",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "amin",
      title: "The trustworthy one",
      line: "Every nation has a trustworthy one; ours is Abu Ubaydah.",
      facts: ["Amin: trustworthy", "He was one of the ten promised Paradise."],
      source: hadith("bukhari", "3744", "Anas ibn Malik", "Sahih", "Every nation has an amin, a trustworthy one, and the amin of this nation is Abu Ubaydah ibn al-Jarrah."),
      difficulty: 2,
      questions: [
        { q: "What title did the Prophet ﷺ give Abu Ubaydah?", a: "The trustworthy one of this nation", wrong: ["The sword of Allah", "The first muezzin", "The best reciter"], why: "He called him the amin of this nation." },
        { q: "What does amin mean?", a: "Trustworthy", wrong: ["Brave", "Rich", "Fast"], why: "Amin: someone you can trust fully." },
        { q: "Abu Ubaydah is one of the ten given good news of Paradise.", tf: true, why: "Tirmidhi 3747 names him among the ten." }
      ]
    },
    {
      slug: "najran",
      title: "Sent to Najran",
      line: "Najran asked for an honest man; the Prophet ﷺ chose Abu Ubaydah.",
      facts: ["Every companion hoped to be chosen.", "Najran: a land south of Makkah"],
      source: hadith("bukhari", "4380", "Hudhaifah", "Sahih", "Najran's leaders asked for a trustworthy man; the Prophet ﷺ said: get up, Abu Ubaydah. This is the trustworthy one of this nation."),
      difficulty: 3,
      questions: [
        { q: "What kind of man did the people of Najran ask for?", a: "A trustworthy, honest man", wrong: ["A strong fighter", "A rich trader", "A poet"], why: "They wanted only an honest man." },
        { q: "How did the companions feel before he chose?", a: "Each hoped to be chosen", wrong: ["No one wanted to go", "They were scared", "They did not care"], why: "Everyone wished for that honor." },
        { q: "Whom did the Prophet ﷺ send?", a: "Abu Ubaydah", wrong: ["Khalid", "Umar", "Bilal"], why: "He said: get up, O Abu Ubaydah." }
      ]
    },
    {
      slug: "khabat",
      title: "The army of leaves",
      line: "Abu Ubaydah led 300 riders so hungry they ate tree leaves.",
      facts: ["Jaysh al-Khabat: army of leaves", "The sea gave them a huge fish."],
      source: hadith("bukhari", "4361", "Jabir bin Abdullah", "Sahih", "Three hundred riders under Abu Ubaydah grew so hungry they ate leaves; then the sea threw out a huge fish and they ate from it for half a month."),
      difficulty: 3,
      questions: [
        { q: "How many riders did Abu Ubaydah lead?", a: "300", wrong: ["30", "1,000", "12"], why: "Jabir said they were three hundred riders." },
        { q: "Why was it called the army of leaves?", a: "They were so hungry they ate leaves", wrong: ["They hid in trees", "They wore leaves", "They camped in a forest"], why: "Khabat means leaves beaten off trees." },
        { q: "How did Allah feed them at last?", a: "The sea threw out a huge fish", wrong: ["A caravan came", "Rain made grass grow", "They found dates"], why: "They ate from it for half a month." },
        { q: "The leader of the army was Abu Bakr.", tf: false, why: "Abu Ubaydah was the commander." }
      ]
    },
    {
      slug: "decree",
      title: "From decree to decree",
      line: "Umar to Abu Ubaydah: we go from Allah's decree to His decree.",
      facts: ["A sickness had spread in Sham.", "Umar chose to go back.", "Abu Ubaydah led the army in Sham."],
      source: hadith("bukhari", "5729", "Abdullah ibn Abbas", "Sahih", "Abu Ubaydah asked: are you running from Allah's decree? Umar said: yes, from Allah's decree to Allah's decree."),
      difficulty: 5,
      questions: [
        { q: "Why did Umar decide not to enter Sham?", a: "A sickness had spread there", wrong: ["The roads were closed", "It was winter", "He was ill"], why: "An epidemic broke out in Sham." },
        { q: "What did Abu Ubaydah ask Umar?", a: "Are you running from Allah's decree?", wrong: ["Why are you late?", "Who will lead us?", "Where is the army?"], why: "He questioned turning back." },
        { q: "What was Umar's answer?", a: "From Allah's decree to Allah's decree", wrong: ["Decree does not matter", "We will never return", "We will fight it"], why: "Taking care is also by Allah's decree." }
      ]
    }
  ]
};

const TALHAH: DeepUnit = {
  key: "talhah",
  topicId: "sahabah",
  branchId: "sahabi-talhah-ibn-ubaydillah",
  name: "Talhah",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "shield-hand",
      title: "The hand that shielded",
      line: "Talhah's hand stayed weak after he shielded the Prophet ﷺ.",
      facts: ["It was at the Battle of Uhud.", "He guarded him with his own hand."],
      source: hadith("bukhari", "3724", "Qais ibn Abi Hazim", "Sahih", "I saw Talhah's paralyzed hand, with which he had shielded the Prophet ﷺ."),
      difficulty: 2,
      questions: [
        { q: "What did Talhah protect at Uhud?", a: "The Prophet ﷺ", wrong: ["The camels", "The flag", "The water"], why: "He shielded the Prophet ﷺ with his hand." },
        { q: "What happened to Talhah's hand?", a: "It stayed weak", wrong: ["It was fine", "It grew stronger", "He lost his sword"], why: "Qais saw his paralyzed hand later." },
        { q: "Talhah put the Prophet's ﷺ safety before his own.", tf: true, why: "He used his own hand as a shield." }
      ]
    },
    {
      slug: "two-left",
      title: "Two stayed with him",
      line: "At one hard moment of Uhud, only Talhah and Sa'd stayed.",
      facts: ["It was the hardest moment of Uhud.", "Sa'd: Sa'd ibn Abi Waqqas"],
      source: hadith("bukhari", "4060", "Abu Uthman", "Sahih", "On the day of Uhud, none remained with the Prophet ﷺ except Talhah and Sa'd."),
      difficulty: 3,
      questions: [
        { q: "Which two stayed with the Prophet ﷺ at that moment at Uhud?", a: "Talhah and Sa'd", wrong: ["Abu Bakr and Umar", "Bilal and Anas", "Khalid and Zubayr"], why: "Only Talhah and Sa'd remained then." },
        { q: "In which battle did this happen?", a: "Uhud", wrong: ["Badr", "Khaybar", "Hunayn"], why: "It was the hard day of Uhud." },
        { q: "What does it show about Talhah?", a: "He stood firm when it was hardest", wrong: ["He liked to be alone", "He arrived late", "He was a guard by job"], why: "He stayed when most were scattered." }
      ]
    },
    {
      slug: "hira",
      title: "Be still, Hira",
      line: "Hira shook, and he ﷺ said: be still, martyrs are on you.",
      facts: ["With him were Abu Bakr, Umar and Uthman.", "Ali, Talhah and Zubayr were there too."],
      source: hadith("muslim", "2417", "Abu Hurairah", "Sahih", "Hira shook; the Prophet ﷺ said: be still, there is none on you but a prophet, a siddiq and martyrs. Talhah and Zubayr were with him."),
      difficulty: 4,
      questions: [
        { q: "Which mountain shook under them?", a: "Hira", wrong: ["Uhud", "Thawr", "Arafah"], why: "They were on Mount Hira." },
        { q: "What did the Prophet ﷺ tell the mountain?", a: "Be still", wrong: ["Grow taller", "Move away", "Speak"], why: "He told it to be calm." },
        { q: "What did he say was on the mountain?", a: "A prophet, a siddiq and martyrs", wrong: ["Only kings", "Only traders", "Only angels"], why: "Talhah and Zubayr were among the martyrs." }
      ]
    }
  ]
};

const ZUBAYR: DeepUnit = {
  key: "zubayr",
  topicId: "sahabah",
  branchId: "sahabi-az-zubayr-ibn-al-awwam",
  name: "Az-Zubayr",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "disciple",
      title: "My disciple",
      line: "Every prophet has a disciple, and my disciple is Az-Zubayr.",
      facts: ["Hawari: a close, loyal helper", "He said it at the Battle of the Trench."],
      source: hadith("bukhari", "2846", "Jabir", "Sahih", "Who will bring me news of the enemy? Az-Zubayr said: I will. The Prophet ﷺ said: every prophet has a disciple, and mine is Az-Zubayr."),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ call Az-Zubayr?", a: "His disciple", wrong: ["His scribe", "His guard", "His cook"], why: "He said: my hawari is Az-Zubayr." },
        { q: "What did the Prophet ﷺ ask for at the Trench?", a: "Someone to bring news of the enemy", wrong: ["Someone to dig a well", "Someone to cook", "Someone to recite"], why: "Az-Zubayr answered: I will." },
        { q: "How many times did Az-Zubayr say 'I will'?", a: "More than once", wrong: ["Never", "Only once", "Only after others"], why: "He answered each time the call came." }
      ]
    },
    {
      slug: "ransom",
      title: "My father and mother for you",
      line: "He ﷺ told Az-Zubayr: may my parents be your ransom.",
      facts: ["His son Abdullah saw him ride out.", "It was a scouting trip to Banu Qurayzah."],
      source: hadith("bukhari", "3720", "Abdullah bin Az-Zubair", "Sahih", "Az-Zubayr went to bring news of Banu Qurayzah; on his return the Prophet ﷺ named both his parents for him."),
      difficulty: 3,
      questions: [
        { q: "Who saw Az-Zubayr riding back and forth?", a: "His son Abdullah", wrong: ["His wife", "His father", "Abu Bakr"], why: "Young Abdullah was kept back with the women." },
        { q: "What did the Prophet ﷺ say to him on his return?", a: "May my father and mother be your ransom", wrong: ["You were too slow", "Go home now", "Stay behind next time"], why: "It is a phrase of great love." },
        { q: "Az-Zubayr went to bring news of Banu Qurayzah.", tf: true, why: "He went two or three times." }
      ]
    },
    {
      slug: "best-of-them",
      title: "\"The best of them\"",
      line: "Uthman said: Az-Zubayr is the best of them, as I know.",
      facts: ["People named him to lead next.", "He was the dearest of them to the Prophet ﷺ."],
      source: hadith("bukhari", "3717", "Marwan bin Al-Hakam", "Sahih", "Uthman said of Az-Zubayr: by Him in whose hand my soul is, he is the best of them as I know, and the most beloved to the Prophet ﷺ."),
      difficulty: 4,
      questions: [
        { q: "Who praised Az-Zubayr as 'the best of them'?", a: "Uthman", wrong: ["Umar", "Abu Bakr", "Ali"], why: "Uthman said it when people spoke of a leader." },
        { q: "What else did Uthman say about him?", a: "He was most beloved to the Prophet ﷺ", wrong: ["He was the richest", "He was the oldest", "He was the tallest"], why: "He said he was most beloved to him." },
        { q: "Where was Az-Zubayr when the mountain shook beneath them?", a: "On Mount Hira", wrong: ["On Mount Uhud", "On Mount Thawr", "On Mount Arafah"], why: "Muslim 2417 names him with the others." }
      ]
    }
  ]
};

const SAD: DeepUnit = {
  key: "sad",
  topicId: "sahabah",
  branchId: "sahabi-sad-ibn-abi-waqqas",
  name: "Sa'd ibn Abi Waqqas",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "third",
      title: "A third of Islam",
      line: "Sa'd said: for seven days I was one third of the Muslims.",
      facts: ["He was one of the earliest Muslims.", "He told this himself."],
      source: hadith("bukhari", "3727", "Sa'd ibn Abi Waqqas", "Sahih", "No one became Muslim before the day I did, and for seven days I was one third of Islam."),
      difficulty: 2,
      questions: [
        { q: "Sa'd said he was what part of the Muslims for seven days?", a: "One third", wrong: ["One half", "One tenth", "All of them"], why: "He said he was a third of Islam." },
        { q: "What does it show about Sa'd?", a: "He was one of the very first Muslims", wrong: ["He became Muslim last", "He never met the Prophet ﷺ", "He came from Yemen"], why: "Few Muslims existed then." },
        { q: "For how many days did Sa'd say this lasted?", a: "Seven", wrong: ["Three", "Forty", "One"], why: "He said seven days." }
      ]
    },
    {
      slug: "first-arrow",
      title: "The first arrow",
      line: "In hungry early days, Sa'd shot the first Arab arrow for Allah.",
      facts: ["The early days were very hungry.", "They ate tree leaves."],
      source: hadith("bukhari", "3728", "Qais", "Sahih", "I was the first of the Arabs to shoot an arrow for Allah's cause; we had nothing to eat but leaves."),
      difficulty: 3,
      questions: [
        { q: "What was Sa'd the first Arab to do for Allah's cause?", a: "Shoot an arrow", wrong: ["Build a masjid", "Write the Quran", "Call the adhan"], why: "He said it of himself." },
        { q: "What did they eat in those hard early days?", a: "Leaves of trees", wrong: ["Meat every day", "Bread and honey", "Rice"], why: "They had nothing else to eat." },
        { q: "Early Muslims had an easy, comfortable life.", tf: false, why: "They were very hungry and poor." }
      ]
    },
    {
      slug: "shoot",
      title: "Shoot, Sa'd!",
      line: "At Uhud he ﷺ told Sa'd: shoot, may my parents be your ransom!",
      facts: ["Sa'd was a famous archer.", "Ali reported these words too."],
      source: hadith("bukhari", "4059", "Ali", "Sahih", "On the day of Uhud I heard him say: O Sa'd, shoot! May my father and mother be your ransom."),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ tell Sa'd to do at Uhud?", a: "Shoot arrows", wrong: ["Go home", "Carry water", "Guard the camels"], why: "He handed him arrows and said: shoot." },
        { q: "Which kind words did he say with it?", a: "May my father and mother be your ransom", wrong: ["You are late", "Try harder", "Be quiet"], why: "Words of great love and honor." },
        { q: "Sa'd was known for his skill with the bow.", tf: true, why: "He was the first Arab to shoot for Allah." }
      ]
    },
    {
      slug: "mother",
      title: "Kind, but not in shirk",
      line: "Sa'd's mother refused food to turn him; Allah sent ayahs.",
      facts: ["Quran 29:8 and 31:15", "Be kind to your parents.", "But do not obey them in shirk."],
      source: hadith("muslim", "1748", "Sa'd", "Sahih", "Sa'd's mother swore not to eat or drink until he left Islam; Allah revealed: if they push you to shirk, do not obey, but keep them company kindly."),
      difficulty: 4,
      questions: [
        { q: "What did Sa'd's mother do to make him leave Islam?", a: "Refused to eat or drink", wrong: ["Left Makkah", "Took his money", "Burned his house"], why: "She swore not to eat or drink." },
        { q: "What did Allah reveal about her?", a: "Do not obey parents in shirk, but be kind", wrong: ["Obey parents in everything", "Leave your parents", "Never speak to them"], why: "Quran 31:15: keep them company kindly." },
        { q: "What should you do if a parent orders shirk?", a: "Refuse, and stay kind to them", wrong: ["Obey them", "Shout at them", "Cut them off"], why: "Allah said: do not obey, but be kind." }
      ]
    },
    {
      slug: "a-third",
      title: "A third is much",
      line: "Sa'd's will: a third, and even a third is much.",
      facts: ["He was very ill on the last Hajj.", "Leave your heirs rich, not poor."],
      source: hadith("bukhari", "1295", "Sa'd ibn Abi Waqqas", "Sahih", "Two thirds? No. Half? No. A third, and a third is much. Better to leave your heirs rich than poor."),
      difficulty: 5,
      questions: [
        { q: "How much did the Prophet ﷺ allow Sa'd to give away in his will?", a: "One third", wrong: ["Two thirds", "Half", "All of it"], why: "He said: a third, and a third is much." },
        { q: "Why not give away more?", a: "Better to leave heirs rich than poor", wrong: ["Charity is bad", "Wealth must be hidden", "Gifts are not rewarded"], why: "Heirs should not be left to beg." },
        { q: "When was Sa'd very ill?", a: "In the year of the last Hajj", wrong: ["At Badr", "In his childhood", "After Uhud"], why: "The Prophet ﷺ visited him then." }
      ]
    }
  ]
};

const SALMAN: DeepUnit = {
  key: "salman",
  topicId: "sahabah",
  branchId: "sahabi-salman-al-farisi",
  name: "Salman",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "pleiades",
      title: "Faith at the stars",
      line: "Faith at the far stars? Salman's people would reach it.",
      facts: ["He put his hand on Salman's shoulder.", "Pleiades: a far star group", "He said it when Surah Al-Jumu'ah came down."],
      source: hadith("bukhari", "4897", "Abu Hurairah", "Sahih", "The Prophet ﷺ put his hand on Salman and said: if faith were at the Pleiades, men from these people would reach it."),
      difficulty: 2,
      questions: [
        { q: "Where did the Prophet ﷺ put his hand as he spoke of the Pleiades?", a: "On Salman", wrong: ["On Abu Hurairah", "On the Ka'bah", "On a book"], why: "He put his hand on Salman al-Farisi." },
        { q: "What did he say Salman's people would reach?", a: "Faith, even at the stars", wrong: ["Gold", "Rome", "The sea"], why: "Even far as the Pleiades, they would reach it." },
        { q: "Salman came from Persia.", tf: true, why: "Al-Farisi means the Persian." }
      ]
    },
    {
      slug: "rights",
      title: "Every right its due",
      line: "Salman: your Lord, body and family each have a right.",
      facts: ["His brother-in-faith: Abu ad-Darda", "The Prophet ﷺ said: Salman is right."],
      source: hadith("bukhari", "1968", "Abu Juhaifa", "Sahih", "Your Lord has a right on you, your soul has a right on you, and your family has a right on you. The Prophet ﷺ said: Salman spoke the truth."),
      difficulty: 3,
      questions: [
        { q: "Who was Salman's brother in faith in Madinah?", a: "Abu ad-Darda", wrong: ["Abu Bakr", "Bilal", "Anas"], why: "The Prophet ﷺ made them brothers." },
        { q: "What was Abu ad-Darda doing too much of?", a: "Fasting and night prayer", wrong: ["Sleeping", "Trading", "Traveling"], why: "He left no rest for his body or family." },
        { q: "Which three have rights on you, Salman said?", a: "Your Lord, your body, your family", wrong: ["Your money, house, horse", "Your friends only", "Only your Lord"], why: "Give each its due." },
        { q: "The Prophet ﷺ said Salman was wrong.", tf: false, why: "He said: Salman spoke the truth." }
      ]
    },
    {
      slug: "six-hundred",
      title: "Between Isa and Muhammad ﷺ",
      line: "Salman said: between Isa and Muhammad ﷺ there were 600 years.",
      facts: ["Salman searched a long time for the truth.", "He knew the people of the earlier books."],
      source: hadith("bukhari", "3948", "Salman", "Sahih", "The time between Isa and Muhammad ﷺ was six hundred years."),
      difficulty: 4,
      questions: [
        { q: "How many years were between Isa and Muhammad ﷺ, Salman said?", a: "600", wrong: ["60", "1,000", "100"], why: "He said six hundred years." },
        { q: "Which prophet came just before Muhammad ﷺ?", a: "Isa", wrong: ["Musa", "Ibrahim", "Nuh"], why: "Isa was the last before him." },
        { q: "Who reported the 600 years between Isa and Muhammad ﷺ?", a: "Salman", wrong: ["Abu Hurairah", "Anas", "Aishah"], why: "Bukhari 3948 is narrated from Salman." }
      ]
    }
  ]
};

const ABU_DHARR: DeepUnit = {
  key: "abudharr",
  topicId: "sahabah",
  branchId: "sahabi-abu-dharr-al-ghifari",
  name: "Abu Dharr",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "search",
      title: "Looking for the truth",
      line: "Abu Dharr sought the Prophet ﷺ in Makkah; Ali led him.",
      facts: ["He sent his brother first.", "Ali hosted him for three nights."],
      source: hadith("bukhari", "3861", "Ibn Abbas", "Sahih", "Abu Dharr came to Makkah, Ali guided him to the Prophet ﷺ, and he became Muslim on the spot."),
      difficulty: 2,
      questions: [
        { q: "Whom did Abu Dharr send to Makkah first?", a: "His brother", wrong: ["His son", "His father", "A trader"], why: "His brother's report did not satisfy him." },
        { q: "Who led Abu Dharr to the Prophet ﷺ?", a: "Ali", wrong: ["Abu Bakr", "Abu Jahl", "Umar"], why: "Ali hosted him and took him there." },
        { q: "What did Abu Dharr do after hearing the Prophet ﷺ?", a: "Became Muslim on the spot", wrong: ["Went home quietly", "Argued with him", "Asked for money"], why: "He accepted Islam right away." }
      ]
    },
    {
      slug: "aloud",
      title: "Said out loud",
      line: "Abu Dharr declared the shahadah aloud in the Masjid al-Haram.",
      facts: ["The Prophet ﷺ said: go tell your people.", "Al-Abbas protected him."],
      source: hadith("bukhari", "3861", "Ibn Abbas", "Sahih", "Abu Dharr declared the shahadah loudly in the Masjid; the people attacked him and al-Abbas protected him."),
      difficulty: 3,
      questions: [
        { q: "Where did Abu Dharr declare his Islam aloud?", a: "In the Masjid al-Haram", wrong: ["In his tent", "In Madinah", "In Sham"], why: "He went to the Masjid in Makkah." },
        { q: "Who protected him from the angry people?", a: "Al-Abbas", wrong: ["Abu Lahab", "Abu Sufyan", "Khalid"], why: "Al-Abbas reminded them his tribe was on their trade road." },
        { q: "The Prophet ﷺ first told him to go back to his people.", tf: true, why: "He said: go back and tell them." }
      ]
    },
    {
      slug: "brothers",
      title: "Your servants are your brothers",
      line: "Feed them from what you eat; dress them as you dress.",
      facts: ["Abu Dharr wore the same cloak as his servant.", "He had once insulted a man's mother."],
      source: hadith("bukhari", "30", "Al-Ma'rur", "Sahih", "You still have some ignorance in you. Your servants are your brothers: feed them what you eat and dress them as you dress."),
      difficulty: 3,
      questions: [
        { q: "Why was Abu Dharr wearing the same cloak as his servant?", a: "He was told: dress them as you dress", wrong: ["They were twins", "It was cheap", "It was Eid"], why: "He followed the Prophet's ﷺ words." },
        { q: "What had Abu Dharr done wrong?", a: "Insulted a man's mother", wrong: ["Missed a prayer", "Stolen food", "Lied in trade"], why: "He was told this was ignorance." },
        { q: "What should you do if a worker's task is too hard?", a: "Help them with it", wrong: ["Shout at them", "Pay them less", "Ignore it"], why: "If you ask much, then help them." },
        { q: "Islam lets you mock a person's family.", tf: false, why: "It was called a trait of ignorance." }
      ]
    },
    {
      slug: "trust",
      title: "Leadership is a trust",
      line: "Asked to lead, Abu Dharr heard: leadership is a trust.",
      facts: ["It can bring regret on Judgment Day.", "Unless it is done rightly."],
      source: hadith("muslim", "1825", "Abu Dharr", "Sahih", "Abu Dharr, you are weak, and leadership is a trust; on the Day of Judgment it brings shame and regret, except for one who takes it rightly."),
      difficulty: 4,
      questions: [
        { q: "What did Abu Dharr ask the Prophet ﷺ for?", a: "A post as a leader", wrong: ["Money", "A horse", "A wife"], why: "He asked to be appointed." },
        { q: "What did the Prophet ﷺ call leadership?", a: "A trust", wrong: ["A prize", "A game", "A right for all"], why: "A trust that must be fulfilled." },
        { q: "Leadership brings regret on Judgment Day, except for whom?", a: "One who does it rightly", wrong: ["The richest", "The oldest", "No exception"], why: "Unless one fulfils its duties." }
      ]
    },
    {
      slug: "smile",
      title: "Even a cheerful face",
      line: "Never belittle any good, even a cheerful face.",
      facts: ["He told this to Abu Dharr.", "A smile is a good deed."],
      source: hadith("muslim", "2626", "Abu Dharr", "Sahih", "Do not think little of any good deed, even meeting your brother with a cheerful face."),
      difficulty: 2,
      questions: [
        { q: "Which small good deed is named in the hadith?", a: "Meeting your brother with a cheerful face", wrong: ["Building a masjid", "Giving gold", "Fasting a year"], why: "Even a cheerful face counts." },
        { q: "What should we never think little of?", a: "Any good deed", wrong: ["Any sin", "Any game", "Any meal"], why: "Small good deeds still matter." },
        { q: "A smile can be a good deed.", tf: true, why: "A cheerful face is named as good." }
      ]
    }
  ]
};

const IBN_MASUD: DeepUnit = {
  key: "ibnmasud",
  topicId: "sahabah",
  branchId: "sahabi-abdullah-ibn-masud",
  name: "Ibn Mas'ud",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "learn-from-four",
      title: "Learn the Quran from four",
      line: "Learn the Quran from four; Ibn Mas'ud was named first.",
      facts: ["The others were Salim, Ubayy and Mu'adh.", "Reported by Ibn Amr"],
      source: hadith("bukhari", "3758", "Masruq", "Sahih", "Learn the Quran from four: Abdullah ibn Mas'ud, Salim, Ubayy ibn Ka'b and Mu'adh ibn Jabal."),
      difficulty: 2,
      questions: [
        { q: "Who was named first of the four to learn the Quran from?", a: "Abdullah ibn Mas'ud", wrong: ["Abu Hurairah", "Khalid", "Bilal"], why: "The Prophet ﷺ began with Ibn Mas'ud." },
        { q: "Which of these was also one of the four?", a: "Mu'adh ibn Jabal", wrong: ["Abu Jahl", "Abu Sufyan", "Khalid"], why: "The four: Ibn Mas'ud, Salim, Ubayy, Mu'adh." },
        { q: "How many teachers of the Quran did the Prophet ﷺ name?", a: "Four", wrong: ["Two", "Seven", "Ten"], why: "He said: learn it from four." }
      ]
    },
    {
      slug: "recite-to-me",
      title: "Recite to me",
      line: "He ﷺ wept as Ibn Mas'ud recited An-Nisa to him.",
      facts: ["He recited Surah An-Nisa.", "He stopped at ayah 4:41."],
      source: hadith("bukhari", "4582", "Abdullah bin Mas'ud", "Sahih", "Recite to me. I like to hear it from others. He recited An-Nisa until 4:41, and the Prophet's ﷺ eyes were full of tears."),
      difficulty: 3,
      questions: [
        { q: "Why did the Prophet ﷺ ask Ibn Mas'ud to recite?", a: "He liked to hear the Quran from others", wrong: ["He forgot it", "To test him", "He was tired"], why: "He said: I like to hear it from others." },
        { q: "Which surah did Ibn Mas'ud recite?", a: "An-Nisa", wrong: ["Al-Baqarah", "Yasin", "Al-Mulk"], why: "He reached ayah 41 of An-Nisa." },
        { q: "What happened to the Prophet ﷺ at ayah 41?", a: "His eyes filled with tears", wrong: ["He laughed", "He fell asleep", "He left"], why: "The ayah speaks of him as witness." },
        { q: "Listening to the Quran is also a Sunnah.", tf: true, why: "The Prophet ﷺ loved to listen to it." }
      ]
    },
    {
      slug: "seventy",
      title: "Seventy surahs from his mouth",
      line: "Ibn Mas'ud learned 70+ surahs from the Prophet's ﷺ mouth.",
      facts: ["He knew the Book well.", "Yet he said: I am not the best of them."],
      source: hadith("bukhari", "5000", "Shaqiq bin Salamah", "Sahih", "By Allah, I learned over seventy surahs directly from the Prophet ﷺ; I know the Book well, yet I am not the best of them."),
      difficulty: 4,
      questions: [
        { q: "How many surahs did Ibn Mas'ud learn straight from the Prophet ﷺ?", a: "Over seventy", wrong: ["Ten", "Three", "All 114 in a day"], why: "He said seventy and more." },
        { q: "What did he add, to stay humble?", a: "I am not the best of them", wrong: ["I am the best", "No one knows more", "I never forget"], why: "Knowledge made him more humble." },
        { q: "What did knowing the Quran well make Ibn Mas'ud?", a: "More humble", wrong: ["Proud", "Lazy", "Rich"], why: "He said he was not the best of them." }
      ]
    },
    {
      slug: "family",
      title: "Like family",
      line: "Visitors thought Ibn Mas'ud was from the Prophet's ﷺ family.",
      facts: ["Told by Abu Musa", "He and his mother came in often."],
      source: hadith("bukhari", "3763", "Abu Musa Al-Ash'ari", "Sahih", "We thought Ibn Mas'ud was of the Prophet's ﷺ family, as he and his mother went in so often."),
      difficulty: 3,
      questions: [
        { q: "What did Abu Musa first think about Ibn Mas'ud?", a: "He was from the Prophet's ﷺ family", wrong: ["He was a trader", "He was from Yemen", "He was a guard"], why: "He was in the house so often." },
        { q: "Who came into the house with Ibn Mas'ud?", a: "His mother", wrong: ["His son", "His teacher", "His wife"], why: "He and his mother came in often." },
        { q: "Ibn Mas'ud was very close to the Prophet ﷺ.", tf: true, why: "He was always around him." }
      ]
    }
  ]
};

const ANAS: DeepUnit = {
  key: "anas",
  topicId: "sahabah",
  branchId: "sahabi-anas-ibn-malik",
  name: "Anas",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "brought",
      title: "A wise boy",
      line: "Abu Talhah brought young Anas to serve the Prophet ﷺ.",
      facts: ["Abu Talhah: his stepfather", "He served at home and on trips."],
      source: hadith("bukhari", "2768", "Anas", "Sahih", "Abu Talhah took me to the Prophet ﷺ: Anas is a wise boy, let him serve you. So I served him at home and on journeys."),
      difficulty: 2,
      questions: [
        { q: "Who brought Anas to serve the Prophet ﷺ?", a: "Abu Talhah", wrong: ["Abu Bakr", "Umar", "Bilal"], why: "His stepfather took him." },
        { q: "How did Abu Talhah describe Anas?", a: "A wise boy", wrong: ["A fast runner", "A strong man", "A rich boy"], why: "He said: Anas is a wise boy." },
        { q: "Anas served the Prophet ﷺ only at home.", tf: false, why: "He served at home and on journeys." }
      ]
    },
    {
      slug: "never-uff",
      title: "Never once \"uff\"",
      line: "He ﷺ never said 'uff' or 'why did you?' to Anas.",
      facts: ["Uff: a word of annoyance", "Never 'why did you do that?'"],
      source: hadith("bukhari", "6038", "Anas", "Sahih", "I served the Prophet ﷺ for ten years, and he never said 'uff' to me, nor 'why did you do this?'"),
      difficulty: 2,
      questions: [
        { q: "How long did Anas serve the Prophet ﷺ?", a: "Ten years", wrong: ["One year", "Three years", "Forty years"], why: "Anas said ten years." },
        { q: "What did the Prophet ﷺ never say to him?", a: "Uff", wrong: ["Salam", "Thank you", "Bismillah"], why: "Not even a small word of annoyance." },
        { q: "What can we learn for those who help us?", a: "Be gentle and patient with them", wrong: ["Blame them for everything", "Never thank them", "Shout to be quick"], why: "This was his gentle way." }
      ]
    },
    {
      slug: "dua",
      title: "A du'a for Anas",
      line: "His du'a for Anas: more wealth, more children, and blessing.",
      facts: ["His mother asked for this du'a.", "Umm Sulaym: Anas's mother"],
      source: hadith("bukhari", "6344", "Anas", "Sahih", "My mother said: make du'a for your servant. He said: O Allah, increase his wealth and children, and bless what You give him."),
      difficulty: 3,
      questions: [
        { q: "Who asked the Prophet ﷺ to make du'a for Anas?", a: "His mother", wrong: ["Anas himself", "Abu Bakr", "A neighbor"], why: "She said: make du'a for your servant." },
        { q: "What did he ask Allah to increase for Anas?", a: "His wealth and children", wrong: ["His height", "His fame", "His age only"], why: "And to bless what Allah gave him." },
        { q: "He also asked Allah to bless what He gave Anas.", tf: true, why: "Blessing makes a little go far." }
      ]
    },
    {
      slug: "secret",
      title: "Keeping a secret",
      line: "Anas kept the Prophet's ﷺ secret, even from his own mother.",
      facts: ["He was sent on an errand while playing.", "His mother said: keep it secret."],
      source: hadith("muslim", "2482", "Anas", "Sahih", "He sent me on an errand; my mother asked what it was. I said: a secret. She said: then never tell the secret of Allah's Messenger ﷺ."),
      difficulty: 4,
      questions: [
        { q: "What was Anas doing when the Prophet ﷺ sent him on an errand?", a: "Playing with friends", wrong: ["Sleeping", "Praying", "Eating"], why: "He was playing with other boys." },
        { q: "Whom did Anas refuse to tell the secret?", a: "His own mother", wrong: ["No one asked", "The Prophet ﷺ", "Abu Bakr"], why: "He kept it even from her." },
        { q: "What did his mother say about the secret?", a: "Never tell it to anyone", wrong: ["Tell me now", "Tell your friends", "Write it down"], why: "She taught him to keep trusts." }
      ]
    }
  ]
};

export const SAHABA_UNITS: DeepUnit[] = [KHALID, BILAL, ABU_UBAYDAH, TALHAH, ZUBAYR, SAD, SALMAN, ABU_DHARR, IBN_MASUD, ANAS];
