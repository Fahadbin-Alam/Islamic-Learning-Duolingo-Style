import { hadith, quran, quranQuote, type DeepUnit } from "./deepKit";

// The later years of the Seerah that the first units skip: Khaybar, Mu'tah, Hunayn and Ta'if, and Tabuk. They sit
// in time order inside SEERAH_UNITS (seerahUnits.ts). Every card is one ayah or one sahih hadith of al-Bukhari
// (number as sunnah.com gives it), with its exact English words to highlight. Only what is agreed on.

const KHAYBAR: DeepUnit = {
  key: "seerah-khaybar",
  topicId: "prophets",
  branchId: "seerah-khaybar",
  branch: { title: "Seerah: Khaybar", description: "The march to Khaybar, the flag given to Ali, the people of the ship, and lessons in honesty." },
  name: "Khaybar",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "the-march",
      title: "Singing on the march",
      line: "On the march, Amir sang: without You, O Allah, no guidance.",
      facts: [
        "Khaybar was a land of strong forts and date farms, north of Madinah.",
        "Amir ibn al-Akwa was a poet who rode with the army.",
        "The Prophet ﷺ asked who he was and prayed for mercy on him."
      ],
      source: hadith("bukhari", "4196", "Salamah ibn al-Akwa", "Sahih", "On the way to Khaibar at night, Amir recited poetry: O Allah, without You we would not have been guided, nor given charity, nor prayed. The Prophet ﷺ said: May Allah bestow His mercy on him.", "May Allah bestow His Mercy on him"),
      difficulty: 1,
      questions: [
        { q: "What did Amir sing on the march to Khaybar?", a: "O Allah, without You we would not be guided", wrong: ["O Allah, give us gold and land", "We will win by our own strength", "O Madinah, we will return soon"], why: "His poem said: without You we would not have been guided, nor given charity, nor prayed." },
        { q: "What did the Prophet ﷺ say when he heard Amir?", a: "May Allah have mercy on him", wrong: ["Stop singing at once", "Sing it louder", "Go back to Madinah"], why: "He ﷺ asked who it was, then prayed for mercy on him." },
        { q: "Khaybar was a land of forts and date farms north of Madinah.", tf: true, why: "It had strong forts and rich farms." }
      ]
    },
    {
      slug: "waiting-for-morning",
      title: "Waiting for the morning",
      line: "He ﷺ reached Khaybar at night, and waited for morning.",
      facts: [
        "It was his way: no attack in the dark of night.",
        "At dawn the farmers came out with spades and baskets.",
        "They cried out: Muhammad and his army!"
      ],
      source: hadith("bukhari", "4197", "Anas ibn Malik", "Sahih", "The Prophet ﷺ reached Khaibar at night, and it was his habit not to attack people at night until it was morning. In the morning the people came out with their spades and baskets.", "whenever he reached the enemy at night, he will not attack them till it was morning"),
      difficulty: 1,
      questions: [
        { q: "When did the army reach Khaybar?", a: "At night", wrong: ["At noon", "On the day of Eid", "After a month of rest"], why: "He ﷺ reached Khaibar at night." },
        { q: "What was his way when he reached an enemy at night?", a: "Wait until morning", wrong: ["Attack at once", "Light fires all night", "Send a letter and leave"], why: "He would not attack them till it was morning." },
        { q: "The people of Khaybar came out in the morning with spades and baskets.", tf: true, why: "They came out to work their farms and saw the army." }
      ]
    },
    {
      slug: "the-flag",
      title: "The flag for Ali",
      line: "The flag went to one who loves Allah and His Messenger ﷺ.",
      facts: [
        "Every Companion hoped all night that it would be him.",
        "In the morning he ﷺ asked for Ali, whose eyes were sore.",
        "He ﷺ spat in Ali's eyes and prayed, and Ali was cured."
      ],
      source: hadith("bukhari", "4210", "Sahl bin Sa'd", "Sahih", "On the day of Khaibar the Prophet ﷺ said: Tomorrow I will give this flag to a man through whose hands Allah will give us victory. He loves Allah and His Messenger, and he is loved by Allah and His Messenger.", "Tomorrow I will give this flag to a man through whose hands Allah will give us victory"),
      difficulty: 2,
      questions: [
        { q: "Who was given the flag at Khaybar?", a: "Ali ibn Abi Talib", wrong: ["Khalid ibn al-Walid", "Abu Ubaydah", "Sa'd ibn Abi Waqqas"], why: "In the morning he ﷺ asked: Where is Ali ibn Abi Talib?" },
        { q: "What was wrong with Ali that morning?", a: "His eyes were sore", wrong: ["He had a broken arm", "He was far away in Yemen", "He had a fever"], why: "They said: he is suffering from eye trouble." },
        { q: "The man with the flag loves Allah and His Messenger, and they love him.", tf: true, why: "That is how he ﷺ described him the night before." }
      ]
    },
    {
      slug: "red-camels",
      title: "Better than red camels",
      line: "One person guided through you beats the finest red camels.",
      facts: [
        "He ﷺ told Ali: go calmly, and first invite them to Islam.",
        "Red camels were the finest wealth an Arab could own.",
        "Guiding one heart is worth more than the best of this world."
      ],
      source: hadith("bukhari", "4210", "Sahl bin Sa'd", "Sahih", "He ﷺ told Ali: Proceed and do not hurry. Call them to Islam and tell them of Allah's rights, for by Allah, if a single man is guided by Allah through you, that is better for you than red camels.", "even if a single man is led on the right path"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ tell Ali to do first?", a: "Invite them to Islam", wrong: ["Burn their farms", "Attack before dawn", "Take their gold"], why: "Call them to embrace Islam and tell them of Allah's rights." },
        { q: "What is better than red camels?", a: "One person guided through you", wrong: ["A big army", "A full treasury", "A new fort"], why: "If a single man is guided by Allah through you, it is better than red camels." },
        { q: "Red camels were the finest wealth of the Arabs.", tf: true, why: "That is why he ﷺ used them as the example." }
      ]
    },
    {
      slug: "two-hijrahs",
      title: "The people of the ship",
      line: "Ja'far's people came home from Abyssinia at Khaybar.",
      facts: [
        "They had lived for years far away in Abyssinia, Ethiopia.",
        "Abu Musa and his people had sailed there and met Ja'far.",
        "He ﷺ said: you, the people of the ship, have two hijrahs."
      ],
      source: hadith("bukhari", "4231", "Abu Musa al-Ash'ari", "Sahih", "Asma bint Umays told the Prophet ﷺ what Umar had said. He ﷺ said: He has no more right over me than you. He and his companions have one migration, and you, the people of the boat, have two migrations.", "nothing in the world was more cheerful and greater than what the Prophet"),
      difficulty: 3,
      questions: [
        { q: "Where did Ja'far and his group come back from?", a: "Abyssinia", wrong: ["Yemen", "Syria", "Iraq"], why: "They had migrated to the Negus in Ethiopia." },
        { q: "How many hijrahs did he ﷺ say the people of the ship had?", a: "Two", wrong: ["One", "Three", "None"], why: "You, the people of the boat, have two migrations." },
        { q: "The people of the ship were sad when they heard his words.", tf: false, why: "Nothing in the world made them happier than what he ﷺ said about them." }
      ]
    },
    {
      slug: "the-farms",
      title: "Farming for half",
      line: "Khaybar's farmers kept their land for half of its crop.",
      facts: [
        "The Muslims did not throw the farmers out.",
        "The farmers worked the land and kept half of what grew.",
        "This deal lasted until the time of Umar."
      ],
      source: hadith("bukhari", "2285", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ gave the land of Khaibar to the Jews to work on and cultivate, and to take half of its yield.", "gave the land of Khaibar to the Jews to work on and cultivate and take half of its yield"),
      difficulty: 3,
      questions: [
        { q: "Who farmed the land of Khaybar after the battle?", a: "Its own people, the Jews of Khaybar", wrong: ["Only the Muhajirun", "Farmers from Yemen", "No one, it was left empty"], why: "He ﷺ gave them the land to work on and cultivate." },
        { q: "What share of the crop did the farmers keep?", a: "Half", wrong: ["A tenth", "A quarter", "All of it"], why: "They took half of its yield." },
        { q: "This farming deal lasted until the time of Umar.", tf: true, why: "Ibn Umar said it went on till Umar moved them out." }
      ]
    },
    {
      slug: "the-stolen-sheet",
      title: "The stolen sheet",
      line: "A sheet stolen from the spoils became fire on its taker.",
      facts: [
        "The spoils of Khaybar were cows, camels, goods and gardens.",
        "A man was hit by an arrow and people called him a martyr.",
        "He ﷺ said no: a sheet he had taken unfairly burned him."
      ],
      source: hadith("bukhari", "4234", "Abu Hurayrah", "Sahih", "When people called a slain man a martyr, the Prophet ﷺ said: No, by Him in Whose Hand my soul is, the sheet he took on the day of Khaibar before the sharing out has become a flame of Fire burning him.", "has become a flame of Fire burning him"),
      difficulty: 4,
      questions: [
        { q: "What did the man take before the spoils were shared?", a: "A sheet of cloth", wrong: ["A horse", "A bag of gold", "A sword"], why: "The sheet he took before the sharing became a flame of Fire." },
        { q: "What did another man do when he heard this?", a: "He brought back the shoe straps he took", wrong: ["He hid them better", "He ran away", "He laughed at it"], why: "He brought one or two shoe straps and said: these are things I took." },
        { q: "Taking even a small thing from shared wealth unfairly is a big sin.", tf: true, why: "He ﷺ called even a strap a strap of Fire." }
      ]
    },
    {
      slug: "donkey-meat",
      title: "Pots of donkey meat",
      line: "At Khaybar he ﷺ forbade the meat of tame donkeys.",
      facts: [
        "After the victory, the hungry army lit fires to cook.",
        "He ﷺ asked what was cooking. They said: donkey meat.",
        "He ﷺ told them to throw it away, and they obeyed."
      ],
      source: hadith("bukhari", "4215", "Abdullah ibn Umar", "Sahih", "On the day of Khaibar, the Prophet ﷺ forbade the eating of garlic and the meat of donkeys.", "forbade the eating of garlic and the meat of donkeys"),
      difficulty: 4,
      questions: [
        { q: "Which meat did he ﷺ forbid at Khaybar?", a: "The meat of tame donkeys", wrong: ["Camel meat", "Sheep meat", "Fish"], why: "He ﷺ forbade the meat of donkeys on the day of Khaibar." },
        { q: "What did the army do with the pots of donkey meat?", a: "They threw the meat away", wrong: ["They ate it secretly", "They sold it", "They gave it to the poor"], why: "He ﷺ said throw away the meat, and they did." },
        { q: "The Companions argued and kept eating the meat.", tf: false, why: "They obeyed at once, even though they were hungry." }
      ]
    },
    {
      slug: "the-poison",
      title: "The poisoned meal",
      line: "He ﷺ felt the pain of Khaybar's poison until his last days.",
      facts: [
        "A cooked sheep with poison was given to him at Khaybar.",
        "Allah kept him alive to finish his mission.",
        "In his last illness he ﷺ said he still felt its pain."
      ],
      source: hadith("bukhari", "4428", "Aishah", "Sahih", "In the illness in which he died, the Prophet ﷺ used to say: O Aishah, I still feel the pain caused by the food I ate at Khaibar.", "I still feel the pain caused by the food I ate at Khaibar"),
      difficulty: 5,
      questions: [
        { q: "What happened to him ﷺ at Khaybar?", a: "He ate food with poison in it", wrong: ["He was hit by an arrow", "He fell from his camel", "He lost his way"], why: "He ﷺ spoke of the pain of the food he ate at Khaibar." },
        { q: "When did he ﷺ say he still felt its pain?", a: "In his last illness", wrong: ["The next morning", "At the Conquest of Makkah", "Never"], why: "He said it in the illness in which he died." },
        { q: "Aishah is the one who heard him say this.", tf: true, why: "He ﷺ said it to her: O Aishah, I still feel the pain." }
      ]
    }
  ]
};

const MUTAH: DeepUnit = {
  key: "seerah-mutah",
  topicId: "prophets",
  branchId: "seerah-mutah",
  branch: { title: "Seerah: Mu'tah", description: "Three leaders in turn, the news before the news, tears for his friends, and a Sword of Allah." },
  name: "Mu'tah",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "three-leaders",
      title: "Three leaders in turn",
      line: "Zayd led, then Ja'far, then Abdullah ibn Rawahah.",
      facts: [
        "Mu'tah is a place in the land of Sham, far north of Madinah.",
        "The Muslims marched there to face a far bigger army.",
        "If Zayd fell, Ja'far would lead; if Ja'far fell, Ibn Rawahah."
      ],
      source: hadith("bukhari", "4261", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ made Zayd ibn Harithah commander at Mu'tah and said: If Zayd is martyred, Ja'far takes over, and if Ja'far is martyred, Abdullah ibn Rawahah takes over.", "should take over his position"),
      difficulty: 1,
      questions: [
        { q: "Who was the first leader at Mu'tah?", a: "Zayd ibn Harithah", wrong: ["Ja'far ibn Abi Talib", "Khalid ibn al-Walid", "Abdullah ibn Rawahah"], why: "He ﷺ appointed Zayd ibn Harithah as commander." },
        { q: "Who would lead if Zayd fell?", a: "Ja'far ibn Abi Talib", wrong: ["Abdullah ibn Rawahah", "Usamah ibn Zayd", "Ali ibn Abi Talib"], why: "If Zayd is martyred, Ja'far takes over." },
        { q: "Mu'tah is in the land of Sham, north of Madinah.", tf: true, why: "The army marched north to the lands of Sham." }
      ]
    },
    {
      slug: "ninety-wounds",
      title: "Ninety wounds",
      line: "Ibn Umar found over ninety wounds on Ja'far's body.",
      facts: [
        "Ja'far took the flag after Zayd and fought until he fell.",
        "Every wound was in front: he never turned his back.",
        "Ibn Umar was in that battle and saw it himself."
      ],
      source: hadith("bukhari", "4261", "Abdullah ibn Umar", "Sahih", "Ibn Umar said: I was among them in that battle. We searched for Ja'far and found him among the martyrs, with over ninety wounds on his body from stabs and arrows.", "found over ninety wounds over his body"),
      difficulty: 2,
      questions: [
        { q: "How many wounds were found on Ja'far?", a: "More than ninety", wrong: ["Three", "About twenty", "None at all"], why: "They found over ninety wounds on his body." },
        { q: "Who saw Ja'far's wounds himself?", a: "Abdullah ibn Umar", wrong: ["Abu Hurayrah", "Anas ibn Malik", "Aishah"], why: "Ibn Umar said: I was present among them in that battle." },
        { q: "Ja'far ran away from the battle.", tf: false, why: "He held the flag and fought until he was martyred." }
      ]
    },
    {
      slug: "news-before-news",
      title: "The news before the news",
      line: "He ﷺ told Madinah about Mu'tah before any rider came.",
      facts: [
        "Allah showed him what was happening far away.",
        "He ﷺ said: Zayd took the flag and fell, then Ja'far, then Ibn Rawahah.",
        "His eyes were full of tears as he told them."
      ],
      source: hadith("bukhari", "4262", "Anas ibn Malik", "Sahih", "The Prophet ﷺ told the people of the martyrdom of Zayd, Ja'far and Ibn Rawahah before the news reached them, and his eyes were shedding tears.", "before the news of their death reached"),
      difficulty: 2,
      questions: [
        { q: "When did he ﷺ tell Madinah about Mu'tah?", a: "Before any news arrived", wrong: ["A month later", "After a letter came", "On the next Eid"], why: "He told them before the news of their death reached." },
        { q: "What were his eyes doing as he spoke?", a: "Shedding tears", wrong: ["Looking angry", "Closed in sleep", "Smiling"], why: "As he ﷺ spoke, his eyes were shedding tears." },
        { q: "Crying out of love and sadness is not against patience.", tf: true, why: "He ﷺ wept for his friends and stayed patient." }
      ]
    },
    {
      slug: "sword-of-allah",
      title: "A Sword of Allah",
      line: "Khalid, a Sword of Allah, took the flag, and Allah gave victory.",
      facts: [
        "After the three leaders fell, Khalid ibn al-Walid took the flag.",
        "He had only become Muslim a few months before.",
        "He ﷺ named him a Sword of Allah that same day."
      ],
      source: hadith("bukhari", "4262", "Anas ibn Malik", "Sahih", "He ﷺ said: Then the flag was taken by a Sword amongst the Swords of Allah, and Allah made them victorious.", "Then the flag was taken by a Sword amongst the Swords of Allah"),
      difficulty: 3,
      questions: [
        { q: "Who took the flag after the three leaders?", a: "Khalid ibn al-Walid", wrong: ["Abu Bakr", "Amr ibn al-As", "Bilal"], why: "The flag was taken by a Sword of the Swords of Allah: Khalid." },
        { q: "What did he ﷺ call Khalid?", a: "A Sword of the Swords of Allah", wrong: ["The Lion of Allah", "The Trusted One of the Ummah", "The Truthful"], why: "That was his name for Khalid that day." },
        { q: "Khalid had been Muslim for many years before Mu'tah.", tf: false, why: "He had become Muslim only a short time before." }
      ]
    },
    {
      slug: "nine-swords",
      title: "Nine broken swords",
      line: "Khalid said: at Mu'tah nine swords broke in my hand.",
      facts: [
        "The fighting was so hard that sword after sword broke.",
        "Only one Yemeni sword was left in his hand.",
        "Khalid led the army back safely to Madinah."
      ],
      source: hadith("bukhari", "4265", "Khalid ibn al-Walid", "Sahih", "Khalid said: On the day of Mu'tah, nine swords were broken in my hand, and nothing was left in my hand except a Yemenite sword of mine.", "nine swords were broken in my hand"),
      difficulty: 3,
      questions: [
        { q: "How many swords broke in Khalid's hand at Mu'tah?", a: "Nine", wrong: ["Two", "Five", "Twenty"], why: "Nine swords were broken in my hand." },
        { q: "What sword was left in his hand?", a: "A sword from Yemen", wrong: ["A sword from Rome", "A wooden sword", "No sword at all"], why: "Only a Yemenite sword of mine remained." },
        { q: "Khalid himself told how hard the fighting was.", tf: true, why: "The hadith is in his own words." }
      ]
    },
    {
      slug: "two-wings",
      title: "The one with two wings",
      line: "Ibn Umar greeted Ja'far's son: son of the one with two wings.",
      facts: [
        "Ja'far held the flag at Mu'tah until he was martyred.",
        "He became known as the one with two wings, Dhul-Janahayn.",
        "The Companions honoured his family after him."
      ],
      source: hadith("bukhari", "3709", "Ash-Sha'bi", "Sahih", "Whenever Ibn Umar greeted the son of Ja'far, he would say: Peace be on you, O son of the one with two wings.", "son of the two-winged person"),
      difficulty: 4,
      questions: [
        { q: "How did Ibn Umar greet Ja'far's son?", a: "Son of the one with two wings", wrong: ["Son of the brave lion", "Son of the swift rider", "Son of the great poet"], why: "He said: peace be on you, O son of the one with two wings." },
        { q: "Who was known as the one with two wings?", a: "Ja'far ibn Abi Talib", wrong: ["Zayd ibn Harithah", "Hamzah", "Abdullah ibn Rawahah"], why: "Ja'far was called Dhul-Janahayn, the one with two wings." },
        { q: "The Companions forgot Ja'far's family after Mu'tah.", tf: false, why: "Ibn Umar honoured his son every time he greeted him." }
      ]
    },
    {
      slug: "food-for-the-family",
      title: "Food for Ja'far's family",
      line: "Make food for Ja'far's family, for grief keeps them busy.",
      facts: [
        "When news of a death comes, the family is full of grief.",
        "He ﷺ told the neighbours to cook for them.",
        "This is the Sunnah: we feed a family in grief."
      ],
      source: hadith("tirmidhi", "998", "Abdullah ibn Ja'far", "Hasan", "When the news of Ja'far's death came, the Prophet ﷺ said: Prepare food for the family of Ja'far, for there has come to them what keeps them busy.", "for indeed something has happened to them that will keep them busy"),
      difficulty: 5,
      questions: [
        { q: "What did he ﷺ ask people to do for Ja'far's family?", a: "Make food for them", wrong: ["Leave them alone for a year", "Ask them to cook for guests", "Hold a big feast"], why: "Prepare food for the family of Ja'far." },
        { q: "Why did the family need food made for them?", a: "Their grief kept them busy", wrong: ["They were travelling", "They were fasting", "They had no kitchen"], why: "Something has come to them that keeps them busy." },
        { q: "Feeding a grieving family is from the Sunnah.", tf: true, why: "He ﷺ told people to do it for Ja'far's family." }
      ]
    }
  ]
};

const HUNAYN: DeepUnit = {
  key: "seerah-hunayn",
  topicId: "prophets",
  branchId: "seerah-hunayn",
  branch: { title: "Seerah: Hunayn and Ta'if", description: "A big army that was too proud, the Prophet ﷺ standing firm, the Ansar's love, and mercy for Hawazin." },
  name: "Hunayn and Ta'if",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "proud-of-numbers",
      title: "Proud of their numbers",
      line: "At Hunayn their great number pleased them, but did not help.",
      facts: [
        "Hunayn is a valley near Makkah, fought just after its conquest.",
        "The army was the biggest the Muslims had ever had.",
        "Victory comes from Allah, not from how many we are."
      ],
      quote: quranQuote(9, 25),
      source: quran(9, 25, "Allah has given you victory in many places, and on the day of Hunayn, when your great number pleased you, but it did not help you at all, and the earth felt narrow for you in all its width; then you turned back, fleeing."),
      difficulty: 1,
      questions: [
        { q: "What pleased the believers before Hunayn?", a: "Their great number", wrong: ["Their new horses", "The cool weather", "Their gold"], why: "Your great number pleased you, but it did not avail you at all." },
        { q: "What does Hunayn teach us?", a: "Victory comes from Allah, not numbers", wrong: ["A bigger army always wins", "Never fight in a valley", "Numbers are all that matter"], why: "Their great number did not help them at all." },
        { q: "Hunayn was fought soon after the Conquest of Makkah.", tf: true, why: "It came in the same year, just after Makkah was opened." }
      ]
    },
    {
      slug: "standing-firm",
      title: "He did not run",
      line: "When many fled, he ﷺ stood firm on his white mule.",
      facts: [
        "The Hawazin archers shot from hiding, and the hasty ones fled.",
        "He ﷺ called out: I am the Prophet ﷺ, no lie; I am the son of Abdul-Muttalib.",
        "Al-Bara said: the Prophet ﷺ did not flee."
      ],
      source: hadith("bukhari", "4315", "Al-Bara ibn Azib", "Sahih", "Al-Bara said: The Prophet ﷺ did not flee, but the hasty people hurried away and Hawazin shot arrows at them. Abu Sufyan ibn al-Harith held the head of his white mule, and he ﷺ was saying: I am the Prophet, undoubtedly; I am the son of Abdul-Muttalib.", "but the hasty people hurried away and the people of Hawazin threw arrows at them"),
      difficulty: 2,
      questions: [
        { q: "What was he ﷺ riding at Hunayn?", a: "A white mule", wrong: ["A black horse", "A red camel", "A donkey"], why: "Abu Sufyan ibn al-Harith held the head of his white mule." },
        { q: "Which tribe shot arrows at Hunayn?", a: "Hawazin", wrong: ["Quraysh", "Banu Qurayzah", "Ghatafan"], why: "The people of Hawazin threw arrows at them." },
        { q: "The Prophet ﷺ ran away at Hunayn.", tf: false, why: "Al-Bara said: the Prophet ﷺ did not flee." }
      ]
    },
    {
      slug: "labbayk",
      title: "Labbayk, O Messenger of Allah",
      line: "He ﷺ called the Ansar, and they answered: Labbayk!",
      facts: [
        "Ten thousand had come with him, and many new Muslims too.",
        "When the line broke, he ﷺ called: O people of the Ansar!",
        "They came back to him, and the enemy was beaten."
      ],
      source: hadith("bukhari", "4333", "Anas ibn Malik", "Sahih", "On the day of Hunayn, when the Muslims fled, the Prophet ﷺ called: O Ansar! They replied: Here we are, O Messenger of Allah, at your service. He got down and said: I am the slave of Allah and His Messenger. Then the pagans were defeated.", "Then the pagans were defeated"),
      difficulty: 2,
      questions: [
        { q: "Whom did he ﷺ call when the line broke?", a: "The Ansar", wrong: ["The people of Makkah", "The archers of Uhud", "The tribe of Hawazin"], why: "He said: O the group of Ansar!" },
        { q: "How many men came with him to Hunayn?", a: "Ten thousand", wrong: ["Three hundred", "One thousand", "Forty thousand"], why: "There were ten thousand with him, besides those new to Islam." },
        { q: "He ﷺ said: I am the slave of Allah and His Messenger.", tf: true, why: "He got down from his mule and said it." }
      ]
    },
    {
      slug: "calm-sent-down",
      title: "Calm sent down",
      line: "Allah sent down His calm, and soldiers no one could see.",
      facts: [
        "Sakinah is a calm and peace that Allah puts in the heart.",
        "Allah also sent angels to help, unseen by the believers.",
        "After the fear came victory, from Allah alone."
      ],
      quote: quranQuote(9, 26),
      source: quran(9, 26, "Then Allah sent down His tranquillity upon His Messenger and upon the believers, and sent down soldiers whom you did not see, and punished those who disbelieved."),
      difficulty: 3,
      questions: [
        { q: "What did Allah send down on the believers at Hunayn?", a: "His calm, sakinah", wrong: ["Rain and hail", "A great wind", "Food from the sky"], why: "Allah sent down His tranquillity upon His Messenger and the believers." },
        { q: "Who were the soldiers the believers did not see?", a: "Angels", wrong: ["Men from Yemen", "Hidden archers", "Jinn of the valley"], why: "He sent down soldiers whom you did not see: angels." },
        { q: "Sakinah is a calm Allah puts in the heart.", tf: true, why: "It is the peace that made the believers firm again." }
      ]
    },
    {
      slug: "siege-of-taif",
      title: "The siege of Ta'if",
      line: "At Ta'if he ﷺ said: we will return, if Allah wills.",
      facts: [
        "The army of Hawazin and Thaqif ran to the forts of Ta'if.",
        "The walls were strong, and many Companions were wounded.",
        "He ﷺ smiled when they were glad to go home after all."
      ],
      source: hadith("bukhari", "4325", "Abdullah ibn Amr", "Sahih", "When the Prophet ﷺ besieged Ta'if and could not conquer it, he said: We will return if Allah wills. When they fought and many were wounded, he said again: We will return tomorrow if Allah wills. That pleased them, and he smiled.", "besieged Taif and could not conquer its people, he said"),
      difficulty: 3,
      questions: [
        { q: "Which city did he ﷺ besiege after Hunayn?", a: "Ta'if", wrong: ["Khaybar", "Madinah", "Jerusalem"], why: "He besieged Taif and could not conquer its people." },
        { q: "What did he ﷺ say about leaving?", a: "We will return, if Allah wills", wrong: ["We will never come back", "We will stay for a year", "Burn the forts first"], why: "He said: We will return, if Allah wills." },
        { q: "He ﷺ smiled when the Companions were glad to go home.", tf: true, why: "That delighted them, and he smiled." }
      ]
    },
    {
      slug: "the-ansar",
      title: "The Ansar take him ﷺ home",
      line: "Others take sheep and camels; the Ansar take him ﷺ home.",
      facts: [
        "He ﷺ gave the spoils of Hunayn to people new to Islam.",
        "Some young Ansar felt left out and sad.",
        "He ﷺ reminded them that he chose them and their land."
      ],
      source: hadith("bukhari", "4330", "Abdullah ibn Zayd", "Sahih", "He ﷺ said to the Ansar: Would you not be pleased that the people go away with sheep and camels while you go with the Prophet to your homes? If the people took a valley or a pass, I would take the valley and pass of the Ansar.", "if the people took their way through a valley or mountain pass"),
      difficulty: 4,
      questions: [
        { q: "Who got most of the spoils of Hunayn?", a: "People new to Islam", wrong: ["The Ansar", "Only the Muhajirun", "The people of Ta'if"], why: "He gave the booty to those whose hearts were newly won to Islam." },
        { q: "What did the Ansar take home instead?", a: "The Messenger of Allah ﷺ", wrong: ["Gold and silver", "The best camels", "A new city"], why: "Others go with sheep and camels; you go with the Prophet ﷺ to your homes." },
        { q: "He ﷺ said he would take the valley of the Ansar.", tf: true, why: "If people took a valley, he would take the valley of the Ansar." }
      ]
    },
    {
      slug: "like-musa",
      title: "Patient like Musa",
      line: "Called unfair, he ﷺ said: Musa was hurt more, and was patient.",
      facts: [
        "A man said the sharing of Hunayn was not just.",
        "He ﷺ answered: who is just, if Allah and His Messenger are not?",
        "Then he remembered Musa, and chose patience."
      ],
      source: hadith("bukhari", "3150", "Abdullah ibn Mas'ud", "Sahih", "A man said the sharing of the spoils of Hunayn was not just. The Prophet ﷺ said: If Allah and His Messenger did not act justly, who else would? May Allah be merciful to Musa, for he was harmed with more than this, yet he kept patient.", "for he was harmed with more than this, yet he kept patient"),
      difficulty: 4,
      questions: [
        { q: "Which prophet did he ﷺ remember when he was hurt?", a: "Musa", wrong: ["Nuh", "Yusuf", "Ibrahim"], why: "May Allah be merciful to Musa, he was harmed with more than this." },
        { q: "What did Musa do when he was harmed?", a: "He was patient", wrong: ["He got angry", "He left his people", "He took revenge"], why: "He was harmed with more than this, yet he kept patient." },
        { q: "He ﷺ shouted back at the man in anger.", tf: false, why: "He answered calmly and chose patience." }
      ]
    },
    {
      slug: "hawazin-returned",
      title: "Mercy for Hawazin",
      line: "Hawazin came as Muslims, and got their families back.",
      facts: [
        "He ﷺ waited more than ten days for them before sharing.",
        "They chose their families over their wealth.",
        "The Companions gladly gave up their shares for them."
      ],
      source: hadith("bukhari", "2307", "Marwan and Al-Miswar", "Sahih", "When the delegates of Hawazin came as Muslims and asked for their families back, the Prophet ﷺ said: These brothers of yours have come with repentance, and I see fit to return their captives to them. The people gave up their shares gladly.", "had given up their shares gladly and willingly"),
      difficulty: 5,
      questions: [
        { q: "What did Hawazin ask for when they came as Muslims?", a: "Their families back", wrong: ["A new leader", "The city of Ta'if", "Weapons"], why: "They said: we choose our captives." },
        { q: "How did the Companions give up their shares?", a: "Gladly and willingly", wrong: ["Only after a fight", "They refused", "For a high price"], why: "They had given up their shares gladly and willingly." },
        { q: "He ﷺ waited for Hawazin for more than ten days.", tf: true, why: "He had been waiting for them for more than ten days." }
      ]
    },
    {
      slug: "umrah-jiranah",
      title: "Umrah from Al-Ji'ranah",
      line: "He ﷺ made Umrah from Al-Ji'ranah after Hunayn.",
      facts: [
        "Al-Ji'ranah is a place between Ta'if and Makkah.",
        "In his life he ﷺ made four Umrahs and one Hajj.",
        "This Umrah came at the end of the Hunayn journey."
      ],
      source: hadith("bukhari", "1778", "Anas ibn Malik", "Sahih", "Anas said the Prophet ﷺ performed Umrah four times, one of them from Al-Ji'ranah where he distributed the war booty, and he performed Hajj once.", "where he distributed the war booty"),
      difficulty: 5,
      questions: [
        { q: "Where did he ﷺ share the spoils of Hunayn?", a: "Al-Ji'ranah", wrong: ["Badr", "Hudaybiyah", "Tabuk"], why: "The Umrah from Al-Ji'ranah, where he distributed the war booty." },
        { q: "How many times did he ﷺ make Umrah?", a: "Four", wrong: ["One", "Two", "Ten"], why: "Anas said: four times." },
        { q: "He ﷺ performed Hajj only once.", tf: true, why: "Anas was asked about Hajj and said: once." }
      ]
    }
  ]
};

const TABUK: DeepUnit = {
  key: "seerah-tabuk",
  topicId: "prophets",
  branchId: "seerah-tabuk",
  branch: { title: "Seerah: Tabuk", description: "The army of hardship in the summer heat, gifts that bought Jannah, tears of the poor, and those who stayed behind." },
  name: "Tabuk",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "go-forth",
      title: "Go forth, light or heavy",
      line: "Allah said: go forth, light or heavy, with wealth and lives.",
      facts: [
        "Tabuk was a long march north, in the burning summer heat.",
        "Dates were ripe and shade was sweet, so it was a hard test.",
        "It was the last march the Prophet ﷺ led."
      ],
      quote: quranQuote(9, 41),
      source: quran(9, 41, "Go forth, whether light or heavy, and strive with your wealth and your lives in the cause of Allah. That is better for you, if you only knew."),
      difficulty: 1,
      questions: [
        { q: "What did Allah tell the believers before Tabuk?", a: "Go forth, light or heavy", wrong: ["Stay home in the heat", "Wait for winter", "Send only the young"], why: "Go forth, whether light or heavy." },
        { q: "What made the march to Tabuk so hard?", a: "Summer heat and a long road", wrong: ["Deep snow", "A short, easy road", "A great flood"], why: "It was a long march in severe heat." },
        { q: "Tabuk was the last march the Prophet ﷺ led.", tf: true, why: "After Tabuk came the Farewell Hajj and his passing." }
      ]
    },
    {
      slug: "army-of-hardship",
      title: "The army of hardship",
      line: "Equip the army of hardship and win Jannah: Uthman did.",
      facts: [
        "The army of Tabuk was called the army of hardship.",
        "There were not enough camels or supplies for everyone.",
        "Uthman gave so much that the Companions bore witness to it."
      ],
      source: hadith("bukhari", "2778", "Abu Abdur-Rahman as-Sulami", "Sahih", "Uthman said: Do you not know that the Prophet ﷺ said, Whoever equips the army of hardship will be granted Paradise, and I equipped it? They agreed with all he said.", "Whoever equip the army of"),
      difficulty: 2,
      questions: [
        { q: "What was the army of Tabuk called?", a: "The army of hardship", wrong: ["The army of the trench", "The army of the tree", "The army of the ship"], why: "He ﷺ called it the army of hardship, Jaysh al-Usrah." },
        { q: "Who equipped the army of hardship?", a: "Uthman ibn Affan", wrong: ["Abu Sufyan", "Khalid ibn al-Walid", "Abu Hurayrah"], why: "Uthman said: and I equipped it." },
        { q: "He ﷺ promised Jannah to whoever equipped that army.", tf: true, why: "Whoever equips the army of hardship will be granted Paradise." }
      ]
    },
    {
      slug: "tears-of-the-poor",
      title: "Tears of the poor",
      line: "Poor believers with no mount turned away in tears.",
      facts: [
        "They came to the Prophet ﷺ asking for a camel to ride.",
        "He ﷺ had none left to give them.",
        "Allah praised them in the Quran for their sincere sadness."
      ],
      quote: quranQuote(9, 92),
      source: quran(9, 92, "Nor is there blame on those who came to you to give them mounts, and you said: I find nothing to carry you. They turned back with their eyes overflowing with tears, sad that they had nothing to spend."),
      difficulty: 2,
      questions: [
        { q: "What did the poor believers ask for?", a: "A mount to ride", wrong: ["Money for food", "Permission to stay home", "A new sword"], why: "They came to you that you might give them mounts." },
        { q: "How did they leave when there was no mount?", a: "With eyes full of tears", wrong: ["Laughing with relief", "Angry and shouting", "Without a word"], why: "They turned back while their eyes overflowed with tears." },
        { q: "Allah blamed these poor believers for staying behind.", tf: false, why: "Allah said there is no blame on them." }
      ]
    },
    {
      slug: "like-harun",
      title: "Like Harun to Musa",
      line: "He ﷺ left Ali in Madinah: like Harun to Musa.",
      facts: [
        "Someone had to look after the families in Madinah.",
        "Ali was sad to be left behind with the women and children.",
        "He ﷺ comforted him, and added: but there is no prophet after me."
      ],
      source: hadith("bukhari", "4416", "Sa'd ibn Abi Waqqas", "Sahih", "The Prophet ﷺ set out for Tabuk and left Ali in charge in Madinah. Ali said: Will you leave me with the children and women? He said: Will you not be pleased to be to me like Harun to Musa? But there will be no prophet after me.", "Will you not be pleased that you will be to me like Aaron to Moses"),
      difficulty: 3,
      questions: [
        { q: "Whom did he ﷺ leave in charge of Madinah?", a: "Ali ibn Abi Talib", wrong: ["Abu Bakr", "Umar", "Uthman"], why: "He set out for Tabuk, appointing Ali as his deputy." },
        { q: "Like whom was Ali to him, he ﷺ said?", a: "Like Harun to Musa", wrong: ["Like Yusuf to Ya'qub", "Like Ismail to Ibrahim", "Like Yahya to Zakariyya"], why: "Will you not be pleased to be to me like Aaron to Moses?" },
        { q: "He ﷺ said there would be no prophet after him.", tf: true, why: "But there will be no prophet after me." }
      ]
    },
    {
      slug: "al-hijr",
      title: "Passing Al-Hijr",
      line: "At Thamud's ruins in Al-Hijr he ﷺ said: pass weeping.",
      facts: [
        "Al-Hijr is where Thamud carved homes in the rock.",
        "Allah destroyed them for killing the she-camel of Salih.",
        "He ﷺ covered his head and hurried through the valley."
      ],
      source: hadith("bukhari", "4419", "Abdullah ibn Umar", "Sahih", "When the Prophet ﷺ passed by Al-Hijr he said: Do not enter the homes of those who wronged themselves unless you enter weeping, lest what befell them befalls you. Then he covered his head and hurried until he crossed the valley.", "Then he covered his head and made his speed fast till he crossed the valley"),
      difficulty: 3,
      questions: [
        { q: "Whose ruins are at Al-Hijr?", a: "The people of Thamud", wrong: ["The people of Nuh", "Pharaoh's people", "The people of Lut"], why: "Al-Hijr was the land of Thamud." },
        { q: "How did he ﷺ say to pass their homes?", a: "Weeping", wrong: ["Laughing", "Taking pictures", "Camping there"], why: "Do not enter unless you are weeping." },
        { q: "He ﷺ covered his head and hurried through the valley.", tf: true, why: "Then he covered his head and went fast till he crossed it." }
      ]
    },
    {
      slug: "the-camel-well",
      title: "Only the she-camel's well",
      line: "Pour out Thamud's water; drink from the she-camel's well.",
      facts: [
        "The army had filled their skins and made dough with that water.",
        "He ﷺ said: pour it out, and feed the dough to the camels.",
        "The one well allowed was the well of Salih's she-camel."
      ],
      source: hadith("bukhari", "3379", "Abdullah ibn Umar", "Sahih", "The people took water from the wells of Thamud at Al-Hijr. The Prophet ﷺ ordered them to pour it out and feed the dough to the camels, and to take water from the well the she-camel used to drink from.", "take water from the well whence the she-camel"),
      difficulty: 4,
      questions: [
        { q: "What did they do with the dough made from Thamud's water?", a: "Fed it to the camels", wrong: ["Baked it as bread", "Buried it", "Sold it in Tabuk"], why: "He ordered them to feed the camels with the dough." },
        { q: "Which well could they drink from?", a: "The well of the she-camel", wrong: ["Any well of Thamud", "The biggest well", "None at all"], why: "Take water from the well the she-camel used to drink from." },
        { q: "The she-camel was the sign given to Prophet Salih.", tf: true, why: "Thamud killed Salih's she-camel and were destroyed." }
      ]
    },
    {
      slug: "the-wind",
      title: "The night of the wind",
      line: "At Tabuk he ﷺ warned: a strong wind tonight, tie your camels.",
      facts: [
        "He ﷺ told everyone not to stand up in the night.",
        "They tied their camels as he said.",
        "The wind came, just as he ﷺ had told them."
      ],
      source: hadith("bukhari", "1481", "Abu Humayd as-Sa'idi", "Sahih", "When we reached Tabuk, the Prophet ﷺ said: There will be a strong wind tonight, so no one should stand, and whoever has a camel should tie it. A strong wind blew at night.", "There will be a strong wind tonight"),
      difficulty: 4,
      questions: [
        { q: "What did he ﷺ warn of at Tabuk?", a: "A strong wind that night", wrong: ["A flood in the valley", "An attack at dawn", "A long drought"], why: "There will be a strong wind tonight." },
        { q: "What were they told to do with their camels?", a: "Tie them up", wrong: ["Let them run free", "Ride them away", "Sell them"], why: "Whoever has a camel should fasten it." },
        { q: "The wind never came that night.", tf: false, why: "A strong wind blew at night, as he ﷺ said." }
      ]
    },
    {
      slug: "held-back-by-excuse",
      title: "With you in reward",
      line: "Those held back by a true excuse shared every step.",
      facts: [
        "On the way home he ﷺ spoke of people who stayed in Madinah.",
        "They were sick, or poor, or had no mount.",
        "Their true intention gave them the reward of the march."
      ],
      source: hadith("bukhari", "4423", "Anas ibn Malik", "Sahih", "Returning from Tabuk, the Prophet ﷺ said: There are some people in Madinah who were with you all the time; you did not cross a valley but they were with you. They were stopped by a genuine excuse.", "because they were stopped by a genuine excuse"),
      difficulty: 5,
      questions: [
        { q: "Who shared the reward of Tabuk without going?", a: "Those held back by a true excuse", wrong: ["Those who were lazy", "Those who were busy trading", "No one"], why: "They were stopped by a genuine excuse." },
        { q: "What gave them the reward?", a: "Their true intention", wrong: ["Their wealth", "Their family name", "Their age"], why: "They wanted to go but a real excuse stopped them." },
        { q: "A sincere intention can earn a reward even when you cannot act.", tf: true, why: "Those people were with them in every valley they crossed." }
      ]
    },
    {
      slug: "the-three",
      title: "The three who stayed behind",
      line: "Allah forgave the three who stayed behind and told the truth.",
      facts: [
        "Ka'b ibn Malik and two others stayed behind with no excuse.",
        "They told the truth, and waited fifty days for Allah's word.",
        "Then Allah turned to them, and they repented."
      ],
      quote: quranQuote(9, 118),
      source: quran(9, 118, "And He also forgave the three who were left behind, until the earth closed in on them in spite of its vastness, and they were sure there is no refuge from Allah except in Him. Then He turned to them so they could repent."),
      difficulty: 5,
      questions: [
        { q: "What did the three do instead of making excuses?", a: "They told the truth", wrong: ["They made up a story", "They ran away", "They blamed others"], why: "They were honest about having no excuse, and Allah forgave them." },
        { q: "How did the earth feel to them while they waited?", a: "Narrow, in spite of its width", wrong: ["Wide and happy", "Like a garden", "Nothing changed"], why: "The earth closed in on them in spite of its vastness." },
        { q: "Ka'b ibn Malik was one of the three.", tf: true, why: "He told his story of Tabuk in Sahih al-Bukhari." }
      ]
    }
  ]
};

export const KHAYBAR_UNIT = KHAYBAR;
export const MUTAH_UNIT = MUTAH;
export const HUNAYN_UNIT = HUNAYN;
export const TABUK_UNIT = TABUK;
