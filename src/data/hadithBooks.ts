import type { LearningSection } from "../types";
import { hadith, type DeepUnit } from "./deepKit";

// The Books of Sahih al-Bukhari and Sahih Muslim, taught one book at a time in their own topic. Each unit takes
// one book (Faith, Purification, Good manners...) and teaches the hadith from it that every Muslim needs, one card
// per hadith, with its number and grade as sunnah.com gives them and the words on that page lit up. Hadith already
// taught elsewhere in the app are left out, and so is anything the scholars differ on.

const FAITH: DeepUnit = {
  key: "book-iman",
  topicId: "sahihayn",
  branchId: "hadith-book-iman",
  branch: { title: "The Book of Faith", description: "From the Books of Faith in Bukhari and Muslim: what iman is, and how it grows." },
  name: "the Book of Faith",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "sixty-branches",
      title: "Faith has many branches",
      line: "Faith has more than sixty branches, and haya is one.",
      facts: ["Haya: shyness that stops sin", "Faith is many good deeds"],
      source: hadith("bukhari", "9", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: faith has more than sixty branches, and haya (shyness that keeps you from wrong) is a branch of faith.", "consists of more than sixty branches"),
      difficulty: 1,
      questions: [
        { q: "How many branches does faith have in Bukhari 9?", a: "More than sixty", wrong: ["Only one", "Exactly five", "Just three"], why: "Faith is not one deed but many." },
        { q: "Which branch of faith does this hadith name?", a: "Haya, good shyness", wrong: ["Wealth", "Strength", "Poetry"], why: "Haya keeps a person away from what is wrong." },
        { q: "Faith is only one single deed.", tf: false, why: "It has more than sixty branches." }
      ]
    },
    {
      slug: "taste-of-faith",
      title: "The taste of faith",
      line: "Content with Allah, Islam and the Prophet ﷺ? You taste faith.",
      facts: ["Allah as your Lord", "Islam as your religion", "Muhammad ﷺ as your Prophet"],
      source: hadith("muslim", "34", "Al-Abbas ibn Abd al-Muttalib", "Sahih", "The Prophet ﷺ said: he has found the taste of faith who is content with Allah as his Lord, with Islam as his religion and with Muhammad as his Prophet.", "who is content with Allah as his Lord, with Islam as his religion"),
      difficulty: 2,
      questions: [
        { q: "Who finds the taste of faith?", a: "One content with Allah as Lord", wrong: ["One who is rich", "One who is famous", "One who argues most"], why: "Sahih Muslim 34." },
        { q: "Allah as Lord, Islam as religion, and...?", a: "Muhammad ﷺ as Prophet", wrong: ["Wealth as the goal", "Your tribe as guide", "Fame as the aim"], why: "Being content with all three gives faith its sweetness." },
        { q: "Being happy with Islam as your religion is part of tasting faith.", tf: true, why: "Content with Islam as his religion." }
      ]
    },
    {
      slug: "fresh-start",
      title: "A fresh start",
      line: "Who sincerely accepts Islam has his past sins forgiven by Allah.",
      facts: ["A good deed: ten to 700 times", "A bad deed: written as one"],
      source: hadith("bukhari", "41", "Abu Sa'id al-Khudri", "Sahih", "If a person embraces Islam sincerely, Allah forgives his past sins. Then each good deed is rewarded ten to seven hundred times, and a bad deed is written as it is, unless Allah forgives it.", "the reward of his good deeds will be ten times to seven hundred times"),
      difficulty: 2,
      questions: [
        { q: "Someone sincerely accepts Islam. What about his past sins?", a: "Allah forgives them", wrong: ["They stay forever", "They double", "He must pay for each"], why: "Sahih al-Bukhari 41." },
        { q: "After that, a good deed can be rewarded up to...?", a: "Seven hundred times", wrong: ["Two times", "Only once", "Fifty times"], why: "Ten times up to seven hundred times." },
        { q: "One bad deed is written as ten bad deeds.", tf: false, why: "A bad deed is written as one, unless Allah forgives it." }
      ]
    },
    {
      slug: "small-and-steady",
      title: "Small and steady",
      line: "The deed Allah loves most is the one done regularly.",
      facts: ["Do what you can keep up", "Allah never tires of rewarding"],
      source: hadith("bukhari", "43", "Aishah", "Sahih", "Do deeds within your strength, for Allah does not tire of giving reward until you tire. The deed most loved by Allah is the one done regularly.", "that which is done regularly"),
      difficulty: 2,
      questions: [
        { q: "Which deed does Allah love most?", a: "The one done regularly", wrong: ["The longest one, once", "The one others see", "The hardest one, then stop"], why: "Sahih al-Bukhari 43." },
        { q: "How much worship did he ﷺ tell us to take on?", a: "What we can keep up", wrong: ["As much as possible, then quit", "None at all", "Only in Ramadan"], why: "Do deeds within your strength." },
        { q: "Two rak'ahs every night beat one long night and then nothing.", tf: true, why: "The best deed is the one done regularly." }
      ]
    },
    {
      slug: "easy-deeds",
      title: "Deeds people can do",
      line: "The Prophet ﷺ told people to do deeds they could keep up.",
      facts: ["He knew Allah best", "He feared Allah most"],
      source: hadith("bukhari", "20", "Aishah", "Sahih", "Whenever the Prophet ﷺ ordered the Muslims to do something, he ordered them deeds easy for them. He said: I fear Allah most and know Him best of you.", "he used to order them deeds which were easy for them to do"),
      difficulty: 2,
      questions: [
        { q: "What kind of deeds did the Prophet ﷺ order?", a: "Deeds people could do", wrong: ["Deeds no one could do", "Only the hardest ones", "None at all"], why: "Sahih al-Bukhari 20." },
        { q: "Who did he ﷺ say knows Allah best and fears Him most?", a: "He himself ﷺ", wrong: ["The richest man", "The angels only", "The oldest man"], why: "So his way is the best way." },
        { q: "Making Islam as hard as you can is what he ﷺ taught.", tf: false, why: "He ordered deeds that were easy for people." }
      ]
    },
    {
      slug: "jarir-pledge",
      title: "Jarir's promise",
      line: "Jarir promised to pray, pay zakat and be sincere to Muslims.",
      facts: ["A pledge to the Prophet ﷺ", "Sincere to every Muslim"],
      source: hadith("bukhari", "57", "Jarir ibn Abdullah", "Sahih", "Jarir said: I pledged to the Prophet ﷺ to pray, to pay zakat, and to be sincere and true to every Muslim.", "be sincere and true to every Muslim"),
      difficulty: 2,
      questions: [
        { q: "Prayer, zakat, and what else did Jarir promise?", a: "Sincerity to every Muslim", wrong: ["To get rich", "To travel far", "To write poetry"], why: "Sahih al-Bukhari 57." },
        { q: "Who made this promise to the Prophet ﷺ?", a: "Jarir ibn Abdullah", wrong: ["Abu Jahl", "Abu Lahab", "Qarun"], why: "He pledged it to the Prophet ﷺ himself." },
        { q: "Wishing good for other Muslims is part of the religion.", tf: true, why: "Jarir pledged to be sincere to every Muslim." }
      ]
    },
    {
      slug: "never-call-kafir",
      title: "Never call a Muslim kafir",
      line: "Call a Muslim a disbeliever, and it falls on one of you.",
      facts: ["Guard your tongue", "Don't judge hearts"],
      source: hadith("muslim", "60a", "Ibn Umar", "Sahih", "The Prophet ﷺ said: when a man calls his brother a disbeliever, it returns to one of them.", "When a man calls his brother an unbeliever, it returns"),
      difficulty: 3,
      questions: [
        { q: "What happens when someone calls his brother a disbeliever?", a: "It falls on one of them", wrong: ["Nothing at all", "He earns reward", "It makes him wise"], why: "Sahih Muslim 60a." },
        { q: "Your friend makes a mistake. What fits this hadith?", a: "Advise him kindly", wrong: ["Call him a kafir", "Tell everyone he left Islam", "Stop greeting him forever"], why: "That word is too heavy to throw at a Muslim." },
        { q: "Calling a Muslim a disbeliever is fine when you are angry.", tf: false, why: "The word comes back on one of the two." }
      ]
    },
    {
      slug: "insulting-a-muslim",
      title: "Insults are sinful",
      line: "Insulting a Muslim is fusuq, a sin that disobeys Allah.",
      facts: ["Fusuq: disobeying Allah", "Fighting him is kufr"],
      source: hadith("bukhari", "48", "Abdullah ibn Mas'ud", "Sahih", "The Prophet ﷺ said: insulting a Muslim is fusuq (disobedience), and fighting him is kufr.", "Abusing a Muslim is Fusuq"),
      difficulty: 3,
      questions: [
        { q: "What did he ﷺ call insulting a Muslim?", a: "Fusuq, disobedience", wrong: ["A small joke", "A good habit", "Nothing at all"], why: "Sahih al-Bukhari 48." },
        { q: "What does fusuq mean?", a: "Disobeying Allah", wrong: ["Being polite", "Fasting", "Travelling"], why: "Fusuq is going out of Allah's obedience." },
        { q: "Calling a Muslim bad names is harmless fun.", tf: false, why: "Insulting a Muslim is fusuq." }
      ]
    },
    {
      slug: "passing-thoughts",
      title: "Thoughts you don't act on",
      line: "Allah forgives bad thoughts we never say or act on.",
      facts: ["Thoughts come and go", "Words and deeds are written"],
      source: hadith("muslim", "127a", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: Allah has forgiven my Ummah the bad thoughts that come into their hearts, as long as they do not speak of them or act on them.", "as long as they did not speak about them or did not act upon them"),
      difficulty: 2,
      questions: [
        { q: "A bad thought pops into your head, and you push it away. What then?", a: "Allah forgives it", wrong: ["It is a big sin", "You must tell everyone", "Your prayer breaks"], why: "Sahih Muslim 127a." },
        { q: "When does a bad thought become a deed?", a: "When you say or do it", wrong: ["Never", "When you sleep", "When it rains"], why: "As long as they do not speak or act on it." },
        { q: "Allah is merciful about thoughts we never act on.", tf: true, why: "He forgave the Ummah these passing thoughts." }
      ]
    },
    {
      slug: "two-qirats",
      title: "Two mountains of reward",
      line: "Stay with a funeral until burial for two qirats of reward.",
      facts: ["One qirat: like Mount Uhud", "Prayer only: one qirat"],
      source: hadith("bukhari", "47", "Abu Hurairah", "Sahih", "Whoever follows a Muslim's funeral with faith, hoping for reward, and stays until the prayer and burial are done, returns with two qirats, each like Mount Uhud. Who prays and leaves before burial gets one.", "Each Qirat is like the size of the (Mount) Uhud"),
      difficulty: 2,
      questions: [
        { q: "How big is one qirat of reward?", a: "Like Mount Uhud", wrong: ["Like a grain", "Like a coin", "Like a house"], why: "Sahih al-Bukhari 47." },
        { q: "You pray the funeral prayer, then leave before burial. You get...?", a: "One qirat", wrong: ["Two qirats", "Nothing", "Ten qirats"], why: "Staying until burial gives two." },
        { q: "Following a funeral to the burial earns two qirats.", tf: true, why: "With faith and hoping for Allah's reward." }
      ]
    },
    {
      slug: "the-strangers",
      title: "Good news for the strangers",
      line: "Islam began as something strange, and will return strange.",
      facts: ["Good news for the strangers", "Stay firm when few do"],
      source: hadith("muslim", "145", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: Islam began as something strange and will return to being strange, so good news for the strangers.", "so good tidings for the stranger"),
      difficulty: 3,
      questions: [
        { q: "How did Islam begin, says Muslim 145?", a: "As something strange", wrong: ["As a big empire", "As a king's religion", "With everyone at once"], why: "In Makkah only a few believed at first." },
        { q: "Who gets good news in this hadith?", a: "The strangers", wrong: ["The proud", "The loud", "The lazy"], why: "Those who hold on when few others do." },
        { q: "Feeling different for keeping Islam is a reason to give up.", tf: false, why: "Good news for the strangers." }
      ]
    },
    {
      slug: "the-simple-path",
      title: "A simple path to Paradise",
      line: "Pray, take halal as halal, avoid haram: a way to Paradise.",
      facts: ["Asked by An-Nu'man ibn Qawqal", "The Prophet ﷺ said yes"],
      source: hadith("muslim", "15a", "Jabir ibn Abdullah", "Sahih", "An-Nu'man ibn Qawqal asked: will I enter Paradise if I pray the obligatory prayers, keep away from the forbidden and take the permitted as permitted? The Prophet ﷺ said yes.", "The Prophet (ﷺ) replied in the affirmative"),
      difficulty: 2,
      questions: [
        { q: "Which prayers did An-Nu'man promise to keep?", a: "The obligatory ones", wrong: ["None", "Only Eid", "Only Friday"], why: "Sahih Muslim 15a." },
        { q: "What did the Prophet ﷺ answer him?", a: "Yes", wrong: ["No", "Maybe later", "He stayed silent"], why: "He replied yes: Paradise." },
        { q: "Keeping the basics well is a path to Paradise.", tf: true, why: "Obligatory prayer, avoid haram, take halal as halal." }
      ]
    }
  ]
};

const PURITY: DeepUnit = {
  key: "book-taharah",
  topicId: "sahihayn",
  branchId: "hadith-book-taharah",
  branch: { title: "The Book of Purification", description: "From the Books of Wudu and Purification: how the Prophet ﷺ kept clean, and what wudu gives you." },
  name: "the Book of Purification",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "sins-wash-away",
      title: "Washed clean",
      line: "Wudu washes away the sins of the face, hands and feet.",
      facts: ["Sins of the eyes, with the face", "He comes out pure"],
      source: hadith("muslim", "244", "Abu Hurairah", "Sahih", "When a Muslim washes his face in wudu, every sin his eyes looked at goes with the water; with his hands, the sins of his hands; with his feet, the sins his feet walked to, until he comes out pure.", "he comes out pure from all sins"),
      difficulty: 1,
      questions: [
        { q: "What leaves with the water of wudu?", a: "Sins", wrong: ["Good deeds", "Our names", "Nothing"], why: "Sahih Muslim 244." },
        { q: "Washing the face takes away the sins of...?", a: "The eyes", wrong: ["The feet", "The ears only", "Other people"], why: "Every sin his eyes looked at." },
        { q: "After wudu, a Muslim comes out pure from sins.", tf: true, why: "He comes out pure from all sins." }
      ]
    },
    {
      slug: "under-the-nails",
      title: "Even under the nails",
      line: "Good wudu takes sins out, even from under the nails.",
      facts: ["Told by Uthman ibn Affan", "Do wudu well"],
      source: hadith("muslim", "245", "Uthman ibn Affan", "Sahih", "The Prophet ﷺ said: whoever does wudu well, his sins come out of his body, even from under his nails.", "even coming out from under his nails"),
      difficulty: 1,
      questions: [
        { q: "From where do sins come out, even?", a: "Under the nails", wrong: ["The hair only", "The clothes", "The shoes"], why: "Sahih Muslim 245." },
        { q: "What kind of wudu does this?", a: "Wudu done well", wrong: ["Rushed wudu", "Half a wudu", "Wudu with no water"], why: "Whoever does wudu well." },
        { q: "Who told this hadith?", a: "Uthman ibn Affan", wrong: ["Abu Jahl", "Abu Lahab", "Qarun"], why: "The third caliph." }
      ]
    },
    {
      slug: "a-missed-spot",
      title: "A missed spot",
      line: "A man left a nail-sized dry spot; he was told: redo wudu.",
      facts: ["Seen by Umar", "Then he prayed"],
      source: hadith("muslim", "243", "Umar ibn al-Khattab", "Sahih", "A man did wudu and left a spot the size of a nail on his foot dry. The Prophet ﷺ saw it and said: go back and do your wudu well. He did, then prayed.", "Go back and perform ablution well"),
      difficulty: 2,
      questions: [
        { q: "How big was the dry spot the man left?", a: "The size of a nail", wrong: ["His whole arm", "His whole face", "Nothing was dry"], why: "Sahih Muslim 243." },
        { q: "What did the Prophet ﷺ tell him?", a: "Go back and do wudu well", wrong: ["Pray as you are", "Skip prayer today", "Only wipe it with sand"], why: "Every part must be washed." },
        { q: "Missing a small spot in wudu does not matter.", tf: false, why: "He was told to go back and do it well." }
      ]
    },
    {
      slug: "wash-hands-on-waking",
      title: "Wash your hands first",
      line: "On waking, wash your hands three times before dipping them.",
      facts: ["You don't know where they were", "Before putting them in water"],
      source: hadith("muslim", "278d", "Abu Hurairah", "Sahih", "When one of you wakes from sleep, he should wash his hands three times before putting them in the water pot, for he does not know where his hand was during the night.", "he should wash his hands three times before putting it in the utensil"),
      difficulty: 1,
      questions: [
        { q: "How many times do you wash your hands on waking?", a: "Three times", wrong: ["Once", "Seven times", "Not at all"], why: "Sahih Muslim 278." },
        { q: "Why wash them first?", a: "You don't know where they were", wrong: ["To waste water", "For fun", "To make noise"], why: "Where his hand was during the night." },
        { q: "Wash your hands before dipping them in the water pot.", tf: true, why: "Before putting them in the utensil." }
      ]
    },
    {
      slug: "the-right-side",
      title: "Start with the right",
      line: "The Prophet ﷺ liked to start with the right in everything.",
      facts: ["Shoes, hair, washing", "Told by Aishah"],
      source: hadith("bukhari", "168", "Aishah", "Sahih", "The Prophet ﷺ liked to start with the right when putting on shoes, combing his hair, washing, and in everything else.", "used to like to start from the right side"),
      difficulty: 1,
      questions: [
        { q: "Which side did the Prophet ﷺ like to start with?", a: "The right", wrong: ["The left", "The back", "Any side"], why: "Sahih al-Bukhari 168." },
        { q: "Which of these did Aishah name?", a: "Putting on shoes", wrong: ["Riding a horse", "Writing poems", "Building walls"], why: "Shoes, combing hair, washing and more." },
        { q: "In wudu we wash the right arm before the left.", tf: true, why: "He liked to start with the right in washing too." }
      ]
    },
    {
      slug: "toilet-dua",
      title: "The toilet dua",
      line: "Before the toilet, ask Allah's protection from all evil things.",
      facts: ["Allahumma inni a'udhu bika", "Minal khubuthi wal khaba'ith"],
      source: hadith("bukhari", "142", "Anas ibn Malik", "Sahih", "When the Prophet ﷺ went to relieve himself he said: Allahumma inni a'udhu bika minal khubuthi wal khaba'ith, O Allah, I seek refuge in You from all evil and wicked things.", "I seek Refuge with You from all offensive and wicked things"),
      difficulty: 1,
      questions: [
        { q: "When did the Prophet ﷺ say this dua?", a: "Before going to the toilet", wrong: ["Before eating", "Before sleeping", "After Eid"], why: "Sahih al-Bukhari 142." },
        { q: "What does the dua ask for?", a: "Refuge from evil things", wrong: ["More food", "Rain", "A long trip"], why: "From all offensive and wicked things." },
        { q: "The toilet dua begins: Allahumma inni a'udhu bika.", tf: true, why: "O Allah, I seek refuge in You." }
      ]
    },
    {
      slug: "siwak",
      title: "The siwak",
      line: "The Prophet ﷺ almost made siwak a must before every prayer.",
      facts: ["Siwak: a tooth stick", "He did not want it hard on us"],
      source: hadith("bukhari", "887", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: if it were not hard on my people, I would have ordered them to clean their teeth with siwak for every prayer.", "clean their teeth with Siwak for every prayer"),
      difficulty: 1,
      questions: [
        { q: "What is a siwak?", a: "A stick to clean teeth", wrong: ["A prayer mat", "A water jug", "A kind of food"], why: "Cut from the arak tree." },
        { q: "Why did he ﷺ not order it for every prayer?", a: "It could be hard on us", wrong: ["He disliked it", "It was not allowed", "Nobody had one"], why: "If it were not hard on my people." },
        { q: "Using siwak before prayer is a loved sunnah.", tf: true, why: "He almost ordered it for every prayer." }
      ]
    },
    {
      slug: "the-full-bath",
      title: "The full bath",
      line: "In ghusl he washed his hands, made wudu, then washed all over.",
      facts: ["Ghusl: the full bath", "Water three times on the head"],
      source: hadith("bukhari", "248", "Aishah", "Sahih", "When the Prophet ﷺ took the full bath (ghusl), he washed his hands, did wudu as for prayer, ran his fingers through the roots of his hair, poured three handfuls on his head, then water over his whole body.", "pour three handfuls of water over his head"),
      difficulty: 2,
      questions: [
        { q: "What is ghusl?", a: "The full bath", wrong: ["Washing only the face", "A kind of prayer", "A dua"], why: "Washing the whole body." },
        { q: "What did he ﷺ do right after washing his hands?", a: "Wudu, as for prayer", wrong: ["Ate a meal", "Slept", "Went outside"], why: "Sahih al-Bukhari 248." },
        { q: "How many handfuls did he pour on his head?", a: "Three", wrong: ["One", "Ten", "None"], why: "Then he poured water all over his body." }
      ]
    },
    {
      slug: "wiping-the-khuff",
      title: "Wiping over leather socks",
      line: "Wipe over leather socks: travellers three days, others one day.",
      facts: ["Khuff: a leather sock", "Asked of Ali by Shurayh"],
      source: hadith("muslim", "276a", "Ali ibn Abi Talib", "Sahih", "Aishah sent Shurayh to ask Ali, who travelled with the Prophet ﷺ. Ali said: he set three days and nights for the traveller and one day and night for the one at home.", "three days and three nights for a traveller and one day and one night for the resident"),
      difficulty: 3,
      questions: [
        { q: "How long may a traveller wipe over leather socks?", a: "Three days and nights", wrong: ["One hour", "A whole month", "Never"], why: "Sahih Muslim 276." },
        { q: "And someone at home?", a: "One day and night", wrong: ["Three days", "A week", "Forever"], why: "For the resident, one day and one night." },
        { q: "Whom did Aishah send Shurayh to ask?", a: "Ali ibn Abi Talib", wrong: ["Abu Lahab", "Abu Jahl", "Qarun"], why: "He used to travel with the Prophet ﷺ." }
      ]
    },
    {
      slug: "wudu-then-prayer",
      title: "Wudu, then a humble prayer",
      line: "Good wudu and a humble prayer wipe out past sins.",
      facts: ["As long as no major sin", "For every prayer time"],
      source: hadith("muslim", "228", "Uthman ibn Affan", "Sahih", "When a prayer time comes and a Muslim does wudu well and prays with humility and bowing, it wipes out his past sins, as long as he has not done a major sin; and this is for all time.", "it will be an expiation for his past sins, so long as he has not committed a major sin"),
      difficulty: 3,
      questions: [
        { q: "Good wudu plus a humble prayer wipe out...?", a: "Past sins", wrong: ["Good deeds", "Our names", "Nothing"], why: "Sahih Muslim 228." },
        { q: "Which sins are not covered, says this hadith?", a: "Major sins", wrong: ["Small slips", "All sins", "Forgotten ones"], why: "As long as he has not done a major sin." },
        { q: "This blessing comes at every prayer time.", tf: true, why: "And this applies for all times." }
      ]
    },
    {
      slug: "erases-sins-raises-ranks",
      title: "Wipes out sins, raises ranks",
      line: "Full wudu, walking to the masjid, waiting for prayer raise you.",
      facts: ["Even when it's hard", "Waiting for the next prayer"],
      source: hadith("muslim", "251a", "Abu Hurairah", "Sahih", "Shall I tell you what Allah wipes out sins and raises ranks with? Doing wudu fully when it is hard, many steps to the masjid, and waiting for the next prayer after a prayer.", "Performing the ablution thoroughly despite odds"),
      difficulty: 3,
      questions: [
        { q: "Which wudu did he ﷺ name?", a: "Full wudu, even when hard", wrong: ["Rushed wudu", "No wudu", "Wudu once a week"], why: "Sahih Muslim 251." },
        { q: "What else wipes out sins in this hadith?", a: "Many steps to the masjid", wrong: ["Sleeping late", "Shopping", "Long games"], why: "Each step to the masjid counts." },
        { q: "Waiting for the next prayer after praying is one of the three.", tf: true, why: "Waiting for the next prayer after a prayer." }
      ]
    },
    {
      slug: "our-brothers",
      title: "His brothers not yet born",
      line: "He ﷺ longed for his brothers: believers who came after him.",
      facts: ["He will know them by wudu", "Bright on face and limbs"],
      source: hadith("muslim", "249a", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: I wish we could see our brothers. They said: are we not your brothers? He said: you are my companions; our brothers are those who have not come yet. He will know them by the brightness of wudu.", "our brothers are those who have, so far, not come into the world"),
      difficulty: 2,
      questions: [
        { q: "Who did he ﷺ call his brothers?", a: "Believers who came after him", wrong: ["Only his uncles", "The kings of Rome", "No one"], why: "Sahih Muslim 249." },
        { q: "What did he ﷺ call the people with him?", a: "His companions", wrong: ["Strangers", "His enemies", "Travellers"], why: "You are my companions." },
        { q: "How will he ﷺ know his Ummah on that Day?", a: "By the brightness of wudu", wrong: ["By their clothes", "By their wealth", "By their height"], why: "Like horses with white blazes." }
      ]
    }
  ]
};

const ADAB: DeepUnit = {
  key: "book-adab",
  topicId: "sahihayn",
  branchId: "hadith-book-adab",
  branch: { title: "The Book of Good Manners", description: "From Bukhari's Book of Adab and Muslim's Book of Good Conduct: how a Muslim treats people." },
  name: "the Book of Good Manners",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "charity-every-day",
      title: "Charity with no money",
      line: "Every Muslim gives charity: work, help, do good, or stop harm.",
      facts: ["Work and give", "Help the one in need"],
      source: hadith("bukhari", "6022", "Abu Musa al-Ash'ari", "Sahih", "Every Muslim must give charity. If he has nothing, he works and gives; if he can't, he helps someone in need; if not, he tells people to do good; if not, he holds back from harm, and that is charity.", "Then he should refrain from doing evil"),
      difficulty: 1,
      questions: [
        { q: "Who must give charity, says this hadith?", a: "Every Muslim", wrong: ["Only the rich", "Only scholars", "Only on Eid"], why: "Sahih al-Bukhari 6022." },
        { q: "You have no money at all. What can be your charity?", a: "Helping someone in need", wrong: ["Nothing", "Taking from others", "Staying angry"], why: "He should help the one in need." },
        { q: "Even holding back from harm counts as charity.", tf: true, why: "Refraining from evil is charity." }
      ]
    },
    {
      slug: "no-cursing",
      title: "He never cursed",
      line: "The Prophet ﷺ never cursed, insulted, or used foul words.",
      facts: ["Told by Anas", "Gentle even when correcting"],
      source: hadith("bukhari", "6031", "Anas ibn Malik", "Sahih", "The Prophet ﷺ did not insult people, use foul words, or curse. When he wanted to correct one of us, he said: what is wrong with him, may his forehead be dusty.", "was not one who would abuse (others) or say obscene words"),
      difficulty: 1,
      questions: [
        { q: "Did the Prophet ﷺ use foul words?", a: "Never", wrong: ["Sometimes", "When angry", "Every day"], why: "Sahih al-Bukhari 6031." },
        { q: "How did he ﷺ correct people?", a: "Gently, without insults", wrong: ["By cursing", "By shouting names", "By hitting"], why: "May his forehead be dusty: a soft word." },
        { q: "Who told us this, having served him for years?", a: "Anas ibn Malik", wrong: ["Abu Jahl", "Abu Lahab", "Fir'awn"], why: "Anas served the Prophet ﷺ for ten years." }
      ]
    },
    {
      slug: "too-much-praise",
      title: "Too much praise",
      line: "Praising someone too much to his face can ruin him.",
      facts: ["You cut his back", "Praise fairly"],
      source: hadith("bukhari", "6060", "Abu Musa al-Ash'ari", "Sahih", "The Prophet ﷺ heard a man praising another too much and said: you have cut the man's back.", "You have destroyed (or cut) the back of the man"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ say to the man who over-praised?", a: "You cut the man's back", wrong: ["Well done", "Praise him more", "Say it louder"], why: "Sahih al-Bukhari 6060." },
        { q: "Why is too much praise harmful?", a: "It can make him proud", wrong: ["It costs money", "It is too quiet", "It wastes paper"], why: "Pride can ruin a person." },
        { q: "Fair, honest praise is better than too much.", tf: true, why: "He ﷺ warned against overdoing it." }
      ]
    },
    {
      slug: "allah-covered-it",
      title: "Don't expose what Allah hid",
      line: "Allah covered a sin at night; in the morning he told everyone.",
      facts: ["Everyone forgiven but them", "Keep Allah's cover"],
      source: hadith("bukhari", "6069", "Abu Hurairah", "Sahih", "All my Ummah will be forgiven except those who sin openly: a man sins at night while Allah covers it, then in the morning says: I did this and that last night.", "in the morning he removes Allah"),
      difficulty: 3,
      questions: [
        { q: "Who did Allah cover in this hadith?", a: "A man who sinned at night", wrong: ["A man who prayed", "A traveller", "A child"], why: "Sahih al-Bukhari 6069." },
        { q: "What did the man do in the morning?", a: "Told people his sin", wrong: ["Gave charity", "Prayed Fajr", "Read Quran"], why: "He removed Allah's cover from himself." },
        { q: "If you slip, repent quietly and don't boast about it.", tf: true, why: "Those who sin openly are not forgiven like the rest." }
      ]
    },
    {
      slug: "greet-first",
      title: "The better one greets first",
      line: "Don't cut off a Muslim over three nights; greet first.",
      facts: ["Not more than three nights", "The better one says salam first"],
      source: hadith("bukhari", "6077", "Abu Ayyub al-Ansari", "Sahih", "It is not allowed to cut off a brother for more than three nights, each turning away when they meet. The better of the two is the one who greets the other first.", "the better of the two will be the one who greets the other first"),
      difficulty: 2,
      questions: [
        { q: "Two friends quarrel. Who is the better one?", a: "The one who greets first", wrong: ["The one who waits", "The one who shouts", "The one who leaves"], why: "Sahih al-Bukhari 6077." },
        { q: "How long at most may Muslims stop talking?", a: "Three nights", wrong: ["Three years", "Forever", "A month"], why: "Not more than three nights." },
        { q: "Saying salam first after a fight is a sign of weakness.", tf: false, why: "The one who greets first is the better of the two." }
      ]
    },
    {
      slug: "if-no-shame",
      title: "If you have no shame",
      line: "The early prophets said: if you feel no shame, do anything.",
      facts: ["From the first prophets", "Haya keeps us from wrong"],
      source: hadith("bukhari", "6120", "Abu Mas'ud al-Ansari", "Sahih", "The Prophet ﷺ said: among the words of the earlier prophets that people have kept is: if you feel no shame, do whatever you like.", "One of the sayings of the early Prophets"),
      difficulty: 3,
      questions: [
        { q: "Whose saying is this, as the Prophet ﷺ told us?", a: "The earlier prophets", wrong: ["Poets of Makkah", "The Romans", "Kings of Persia"], why: "Sahih al-Bukhari 6120." },
        { q: "What does losing haya (shame) lead to?", a: "Doing any wrong freely", wrong: ["More prayers", "Good manners", "Kindness"], why: "If you feel no shame, do whatever you like: a warning." },
        { q: "Haya is a shield that holds us back from wrong.", tf: true, why: "Without it, nothing stops a person." }
      ]
    },
    {
      slug: "not-stung-twice",
      title: "Not stung twice",
      line: "A believer is not stung twice from the same hole.",
      facts: ["Learn from mistakes", "Be wise, not fooled twice"],
      source: hadith("bukhari", "6133", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: a believer is not stung twice from the same hole.", "A believer is not stung twice"),
      difficulty: 2,
      questions: [
        { q: "A believer is not stung twice from...?", a: "The same hole", wrong: ["The same tree", "The same river", "The same book"], why: "Sahih al-Bukhari 6133." },
        { q: "What does this teach?", a: "Learn from what hurt you", wrong: ["Trust everyone always", "Never try again", "Forget all lessons"], why: "A believer is wise, not fooled twice." },
        { q: "A believer keeps making the same mistake.", tf: false, why: "He is not stung twice from the same hole." }
      ]
    },
    {
      slug: "with-those-you-love",
      title: "With those you love",
      line: "A man loved Allah and His Messenger ﷺ; he'll be with them.",
      facts: ["What have you prepared?", "Love Allah and His Messenger ﷺ"],
      source: hadith("bukhari", "6171", "Anas ibn Malik", "Sahih", "A man asked when the Hour would be. He ﷺ said: what have you prepared for it? He said: not much prayer, fasting or charity, but I love Allah and His Messenger. He said: you will be with those you love.", "You will be with those whom you love"),
      difficulty: 2,
      questions: [
        { q: "The man asked about the Hour. What did he ﷺ ask back?", a: "What have you prepared?", wrong: ["Where do you live?", "How old are you?", "Who is your father?"], why: "Sahih al-Bukhari 6171." },
        { q: "What did the man say he had?", a: "Love of Allah and His Messenger ﷺ", wrong: ["Lots of gold", "Many camels", "A big house"], why: "Not much prayer or fasting, but love." },
        { q: "We will be with those we love.", tf: true, why: "So love the Prophet ﷺ and good people." }
      ]
    },
    {
      slug: "the-sneeze",
      title: "Two men sneezed",
      line: "Two men sneezed; the one who said Alhamdulillah got the reply.",
      facts: ["Yarhamukallah: Allah have mercy on you", "Say Alhamdulillah when you sneeze"],
      source: hadith("bukhari", "6221", "Anas ibn Malik", "Sahih", "Two men sneezed by the Prophet ﷺ. He said yarhamukallah to one and not the other, and said: that one praised Allah, and the other did not.", "That one praised Allah (at the time of sneezing)"),
      difficulty: 1,
      questions: [
        { q: "Why did only one man get yarhamukallah?", a: "He praised Allah", wrong: ["He was older", "He was louder", "He was rich"], why: "Sahih al-Bukhari 6221." },
        { q: "What do you say when you sneeze?", a: "Alhamdulillah", wrong: ["Nothing", "Bismillah", "Ameen"], why: "Then others say yarhamukallah." },
        { q: "What does yarhamukallah mean?", a: "May Allah have mercy on you", wrong: ["Good morning", "See you soon", "Thank you"], why: "The reply to one who praised Allah." }
      ]
    },
    {
      slug: "abu-umayr-bird",
      title: "Abu Umayr's little bird",
      line: "He ﷺ asked little Abu Umayr: what did your little bird do?",
      facts: ["An-nughayr: a little bird", "He played kindly with children"],
      source: hadith("bukhari", "6203", "Anas ibn Malik", "Sahih", "The Prophet ﷺ had the best character. My little brother Abu Umayr had a pet bird, and he ﷺ would say to him: O Abu Umayr, what did the little bird (nughayr) do?", "What did Al-Nughair (nightingale) (do)"),
      difficulty: 1,
      questions: [
        { q: "What pet did little Abu Umayr have?", a: "A little bird", wrong: ["A camel", "A cat", "A horse"], why: "Sahih al-Bukhari 6203." },
        { q: "What does this teach about the Prophet ﷺ?", a: "He was kind to children", wrong: ["He ignored children", "He disliked pets", "He was always too busy"], why: "He had the best character." },
        { q: "Whose little brother was Abu Umayr?", a: "Anas ibn Malik's", wrong: ["Abu Jahl's", "Umar's", "Bilal's"], why: "Anas told the story." }
      ]
    },
    {
      slug: "glass-vessels",
      title: "Gently, Anjashah",
      line: "Drive gently, Anjashah, you carry glass: the women on camels.",
      facts: ["Anjashah: a camel driver", "Glass: be gentle with women"],
      source: hadith("bukhari", "6211", "Anas ibn Malik", "Sahih", "The Prophet ﷺ had a camel driver called Anjashah with a fine voice. He said: gently, Anjashah, do not break the glass vessels, meaning the women.", "Do not break the glass vessels"),
      difficulty: 2,
      questions: [
        { q: "Who was Anjashah?", a: "A camel driver", wrong: ["A king", "A trader from Rome", "A poet of Quraysh"], why: "Sahih al-Bukhari 6211." },
        { q: "Whom did the Prophet ﷺ call glass vessels?", a: "The women riding", wrong: ["The camels", "The water jars", "The men"], why: "So drive gently." },
        { q: "This hadith teaches care and gentleness with women.", tf: true, why: "Do not break the glass vessels." }
      ]
    },
    {
      slug: "cutting-ties",
      title: "Never cut family ties",
      line: "One who cuts off his relatives will not enter Paradise.",
      facts: ["Told by Jubayr ibn Mut'im", "Keep ties with family"],
      source: hadith("bukhari", "5984", "Jubayr ibn Mut'im", "Sahih", "The Prophet ﷺ said: the one who cuts off ties of kinship will not enter Paradise.", "The person who severs the bond of kinship will not enter Paradise"),
      difficulty: 2,
      questions: [
        { q: "Who will not enter Paradise, says Bukhari 5984?", a: "One who cuts off relatives", wrong: ["One who visits family", "One who calls his aunt", "One who gives gifts"], why: "Cutting family ties is a major sin." },
        { q: "Your cousin hasn't spoken to you in months. What fits?", a: "Reach out and keep the tie", wrong: ["Cut him off too", "Forget him forever", "Speak badly of him"], why: "Keeping family ties pleases Allah." },
        { q: "Who told this hadith?", a: "Jubayr ibn Mut'im", wrong: ["Abu Lahab", "Abu Jahl", "Qarun"], why: "A companion from Quraysh." }
      ]
    },
    {
      slug: "six-rights",
      title: "Six rights of a Muslim",
      line: "A Muslim has six rights over his brother Muslim.",
      facts: ["Greet him, accept his invite", "Advise him, bless his sneeze", "Visit him ill, follow his funeral"],
      source: hadith("muslim", "2162b", "Abu Hurairah", "Sahih", "A Muslim has six rights over another: greet him when you meet, accept his invitation, advise him when he asks, say yarhamukallah when he sneezes and praises Allah, visit him when ill, and follow his funeral.", "Six are the rights of a Muslim over another Muslim"),
      difficulty: 2,
      questions: [
        { q: "How many rights does a Muslim have over another in Muslim 2162?", a: "Six", wrong: ["Two", "Ten", "One"], why: "Greet, accept, advise, bless the sneeze, visit, follow." },
        { q: "Your classmate is sick at home. Which right fits?", a: "Visit him", wrong: ["Ignore him", "Laugh at him", "Forget him"], why: "When he falls ill, visit him." },
        { q: "When a Muslim asks your advice, give it sincerely.", tf: true, why: "When he seeks your counsel, give it." }
      ]
    },
    {
      slug: "father-friends",
      title: "Your father's friends",
      line: "The best goodness is being kind to your father's loved ones.",
      facts: ["Ibn Umar gave his donkey", "And his own turban"],
      source: hadith("muslim", "2552a", "Abdullah ibn Umar", "Sahih", "Ibn Umar met a desert Arab whose father was a friend of Umar, gave him his donkey and his turban, and said: I heard the Prophet ﷺ say: the finest goodness is to be kind to the loved ones of your father.", "His father was loved dearly by"),
      difficulty: 3,
      questions: [
        { q: "What is the finest goodness, says Muslim 2552?", a: "Kindness to your father's loved ones", wrong: ["Buying a big house", "Being famous", "Winning races"], why: "Even after the father has died." },
        { q: "What did Ibn Umar give the man?", a: "His donkey and turban", wrong: ["A sword", "A camel herd", "Nothing"], why: "His father was a friend of Umar." },
        { q: "Being good to parents can go on after they pass away.", tf: true, why: "Through kindness to the people they loved." }
      ]
    },
    {
      slug: "allah-will-not-forgive",
      title: "Who are we to judge?",
      line: "A man swore Allah won't forgive someone; Allah forgave that one.",
      facts: ["Only Allah forgives", "Never close the door for others"],
      source: hadith("muslim", "2621", "Jundub", "Sahih", "A man said: by Allah, Allah will not forgive so-and-so. Allah said: who swears by Me that I will not forgive so-and-so? I have forgiven him, and wiped out your deeds.", "I have granted pardon to so and so"),
      difficulty: 3,
      questions: [
        { q: "What did the man swear about another?", a: "Allah won't forgive him", wrong: ["He will be rich", "He will travel", "He will be king"], why: "Sahih Muslim 2621." },
        { q: "Whom did Allah forgive?", a: "The one he spoke about", wrong: ["The one who swore", "No one", "Only the angels"], why: "I have forgiven him." },
        { q: "We can say for sure that Allah will never forgive someone.", tf: false, why: "Forgiveness belongs to Allah alone." }
      ]
    }
  ]
};

const FOOD: DeepUnit = {
  key: "book-food",
  topicId: "sahihayn",
  branchId: "hadith-book-food",
  branch: { title: "The Book of Food and Drink", description: "From the Books of Food and Drinks: how the Prophet ﷺ ate, drank and shared his food." },
  name: "the Book of Food and Drink",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "feed-the-hungry",
      title: "Feed, visit, set free",
      line: "Feed the hungry, visit the sick, and free the captive.",
      facts: ["Three good deeds", "Told by Abu Musa"],
      source: hadith("bukhari", "5373", "Abu Musa al-Ash'ari", "Sahih", "The Prophet ﷺ said: feed the hungry, visit the sick, and set the captive free.", "Give food to the hungry, pay a visit to the sick"),
      difficulty: 1,
      questions: [
        { q: "Whom did he ﷺ tell us to feed?", a: "The hungry", wrong: ["Only guests who are rich", "Only family", "No one"], why: "Sahih al-Bukhari 5373." },
        { q: "Feed the hungry, free the captive, and...?", a: "Visit the sick", wrong: ["Build a tower", "Buy new clothes", "Win a race"], why: "Three deeds in one short hadith." },
        { q: "Giving food to a hungry person is a deed the Prophet ﷺ ordered.", tf: true, why: "Give food to the hungry." }
      ]
    },
    {
      slug: "food-for-two",
      title: "Enough for one more",
      line: "Food for two is enough for three; three's for four.",
      facts: ["Share your plate", "Blessing in sharing"],
      source: hadith("bukhari", "5392", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: the food of two is enough for three, and the food of three is enough for four.", "The food for two persons is sufficient for three"),
      difficulty: 1,
      questions: [
        { q: "Food for two people is enough for...?", a: "Three people", wrong: ["One person", "Ten people", "Nobody"], why: "Sahih al-Bukhari 5392." },
        { q: "A friend comes while you eat with your brother. What fits?", a: "Share the food", wrong: ["Hide the plate", "Tell him to leave", "Eat faster"], why: "Food for two is enough for three." },
        { q: "Food for three people is enough for four.", tf: true, why: "Sharing brings blessing." }
      ]
    },
    {
      slug: "one-stomach",
      title: "A believer eats little",
      line: "A believer is content with a little food.",
      facts: ["Eats in one stomach", "Not greedy for food"],
      source: hadith("bukhari", "5394", "Ibn Umar", "Sahih", "The Prophet ﷺ said: a believer eats in one stomach (is content with a little), while a disbeliever eats in seven.", "A believer eats in one intestine"),
      difficulty: 2,
      questions: [
        { q: "How does a believer eat, says Bukhari 5394?", a: "Content with a little", wrong: ["As much as he can", "Only sweets", "Never at all"], why: "He eats in one stomach." },
        { q: "What does eating in one stomach mean?", a: "Being content with little", wrong: ["Eating once a year", "Eating alone", "Eating standing"], why: "Not greedy for food." },
        { q: "Eating far too much is the way of a believer.", tf: false, why: "A believer is content with a little." }
      ]
    },
    {
      slug: "not-leaning",
      title: "Not leaning back",
      line: "The Prophet ﷺ said: I do not eat while leaning back.",
      facts: ["Told by Abu Juhayfah", "Humble when eating"],
      source: hadith("bukhari", "5398", "Abu Juhayfah", "Sahih", "The Prophet ﷺ said: I do not eat while leaning.", "I do not take my meals while leaning"),
      difficulty: 1,
      questions: [
        { q: "How did the Prophet ﷺ not eat?", a: "Leaning back", wrong: ["Sitting", "With his right hand", "With others"], why: "Sahih al-Bukhari 5398." },
        { q: "Who heard him say it?", a: "Abu Juhayfah", wrong: ["Abu Jahl", "Abu Lahab", "Qarun"], why: "A young companion." },
        { q: "Sitting humbly while eating follows his Sunnah.", tf: true, why: "He did not eat leaning." }
      ]
    },
    {
      slug: "lick-your-fingers",
      title: "Where is the blessing?",
      line: "Eat a dropped bite, lick your fingers: blessing may be there.",
      facts: ["Clean the dropped bite", "Don't leave it for Shaytan"],
      source: hadith("muslim", "2033b", "Jabir ibn Abdullah", "Sahih", "If a bite falls, pick it up, wipe off any dirt and eat it, and do not leave it for Shaytan. Do not wipe your hand until you lick your fingers, for you do not know where the blessing in your food is.", "he does not know in what portion of the food the blessing lies"),
      difficulty: 1,
      questions: [
        { q: "A clean bite falls on the mat. What do you do?", a: "Wipe it and eat it", wrong: ["Kick it away", "Leave it there", "Throw the plate"], why: "Sahih Muslim 2033." },
        { q: "Why lick your fingers before wiping them?", a: "The blessing may be there", wrong: ["To be silly", "To skip washing", "To make noise"], why: "You don't know where the blessing is." },
        { q: "We should leave dropped food for Shaytan.", tf: false, why: "Do not leave it for Shaytan." }
      ]
    },
    {
      slug: "share-with-the-cook",
      title: "Share with the one who cooked",
      line: "Give the one who cooked your food a share of it.",
      facts: ["He bore the heat", "At least a handful or two"],
      source: hadith("bukhari", "5460", "Abu Hurairah", "Sahih", "When your servant brings your food, if you don't seat him with you, give him a handful or two, for he bore its heat and worked to cook it.", "for he has suffered from its heat"),
      difficulty: 2,
      questions: [
        { q: "Who should get a share of the food?", a: "The one who cooked it", wrong: ["Only the eldest", "Only guests", "No one"], why: "Sahih al-Bukhari 5460." },
        { q: "Why does the cook deserve a share?", a: "He bore its heat", wrong: ["He is rich", "He asked loudly", "He is a king"], why: "He suffered its heat and worked hard." },
        { q: "Inviting the cook to eat with you is even better.", tf: true, why: "If not, at least a handful or two." }
      ]
    },
    {
      slug: "three-days-bread",
      title: "A simple table",
      line: "His family never had wheat bread three days running.",
      facts: ["Told by Aishah", "A simple, humble life"],
      source: hadith("bukhari", "5416", "Aishah", "Sahih", "The family of Muhammad ﷺ never ate their fill of wheat bread for three days in a row from his coming to Madinah until he died.", "had not eaten wheat bread to their satisfaction for three consecutive days"),
      difficulty: 2,
      questions: [
        { q: "What did his family not have three days in a row?", a: "Wheat bread to the full", wrong: ["Water", "Prayer", "Visitors"], why: "Sahih al-Bukhari 5416." },
        { q: "What does this teach about his life?", a: "It was simple and humble", wrong: ["He loved feasts", "He was greedy", "He hoarded food"], why: "He chose a simple life." },
        { q: "Who told us this?", a: "Aishah", wrong: ["Abu Jahl", "Fir'awn", "Qarun"], why: "She lived in his home." }
      ]
    },
    {
      slug: "the-gourd",
      title: "The tailor's gourd",
      line: "Anas saw him ﷺ pick out gourd, so Anas loved gourd forever.",
      facts: ["A tailor's invitation", "Barley bread and soup"],
      source: hadith("bukhari", "5436", "Anas ibn Malik", "Sahih", "A tailor invited the Prophet ﷺ to a meal of barley bread and soup with gourd. I saw him pick out the gourd, and I have loved gourd ever since.", "since then I have kept on liking gourd"),
      difficulty: 1,
      questions: [
        { q: "Who invited the Prophet ﷺ to this meal?", a: "A tailor", wrong: ["A king", "A rich trader", "A general"], why: "He accepted a simple man's invitation." },
        { q: "What did the Prophet ﷺ pick from the dish?", a: "Gourd", wrong: ["Gold", "Candy", "Pearls"], why: "Sahih al-Bukhari 5436." },
        { q: "Anas loved gourd because the Prophet ﷺ liked it.", tf: true, why: "Since then I have loved gourd." }
      ]
    },
    {
      slug: "garlic-and-onion",
      title: "Fresh breath for the masjid",
      line: "Ate raw garlic or onion? Keep away from the masjid.",
      facts: ["Don't bother people", "Told by Jabir"],
      source: hadith("bukhari", "5452", "Jabir ibn Abdullah", "Sahih", "The Prophet ﷺ said: whoever has eaten garlic or onion should keep away from us, or from our masjid.", "Whoever has eaten garlic or onion should keep away from us"),
      difficulty: 2,
      questions: [
        { q: "After eating raw garlic, where should you not go?", a: "The masjid", wrong: ["Home", "School", "The park"], why: "Sahih al-Bukhari 5452." },
        { q: "Why keep away?", a: "The smell bothers people", wrong: ["Garlic is haram", "It breaks wudu", "It is a sin to eat"], why: "Care for those praying near you." },
        { q: "Eating garlic is forbidden in Islam.", tf: false, why: "It is allowed; just keep its smell from the masjid." }
      ]
    },
    {
      slug: "every-intoxicant",
      title: "Every intoxicant",
      line: "Every drink that intoxicates is haram.",
      facts: ["Asked about honey wine", "Told by Aishah"],
      source: hadith("bukhari", "5585", "Aishah", "Sahih", "The Prophet ﷺ was asked about bit', a drink made from honey. He said: every drink that intoxicates is haram.", "All drinks that intoxicate are unlawful"),
      difficulty: 2,
      questions: [
        { q: "Which drinks are haram, says Bukhari 5585?", a: "Every drink that intoxicates", wrong: ["Only grape wine", "Only milk", "None of them"], why: "Whatever it is made from." },
        { q: "He ﷺ was asked about a drink made from...?", a: "Honey", wrong: ["Water", "Rice", "Coffee"], why: "Al-bit' was a honey drink." },
        { q: "A new kind of drink that makes people drunk is halal.", tf: false, why: "Every intoxicating drink is haram." }
      ]
    },
    {
      slug: "three-breaths",
      title: "Three breaths",
      line: "He ﷺ drank in three breaths, breathing outside the cup.",
      facts: ["More quenching", "Healthier and better"],
      source: hadith("muslim", "2028b", "Anas ibn Malik", "Sahih", "The Prophet ﷺ breathed three times while drinking, outside the cup, and said: it quenches thirst more, is healthier and better.", "It is more thirst- quenching, healthier and more wholesome"),
      difficulty: 1,
      questions: [
        { q: "In how many breaths did he ﷺ drink?", a: "Three", wrong: ["One", "Ten", "Twenty"], why: "Sahih Muslim 2028." },
        { q: "Where did he breathe?", a: "Outside the cup", wrong: ["Into the cup", "Under water", "Nowhere"], why: "Never breathe into the drink." },
        { q: "He said three breaths quench thirst more.", tf: true, why: "More quenching, healthier and better." }
      ]
    },
    {
      slug: "the-right-first",
      title: "The right first",
      line: "He ﷺ served the man on his right before Abu Bakr.",
      facts: ["Abu Bakr was on his left", "The right, then the right"],
      source: hadith("bukhari", "5619", "Anas ibn Malik", "Sahih", "Milk was brought to the Prophet ﷺ with a bedouin on his right and Abu Bakr on his left. He drank, gave it to the bedouin and said: the right, then the right.", "The right (first)"),
      difficulty: 2,
      questions: [
        { q: "Who got the drink after the Prophet ﷺ?", a: "The bedouin on his right", wrong: ["Abu Bakr on his left", "The youngest", "No one"], why: "Sahih al-Bukhari 5619." },
        { q: "Who sat on his left?", a: "Abu Bakr", wrong: ["Abu Jahl", "Qarun", "Fir'awn"], why: "Yet the right came first." },
        { q: "When passing drinks round, start with the person on your right.", tf: true, why: "The right, then the right." }
      ]
    },
    {
      slug: "cover-the-cup",
      title: "Cover it, even with a stick",
      line: "Cover your drink, even with just a stick across it.",
      facts: ["A cup of milk from An-Naqi", "Told by Jabir"],
      source: hadith("bukhari", "5605", "Jabir ibn Abdullah", "Sahih", "Abu Humayd brought a cup of milk from An-Naqi. The Prophet ﷺ said: why didn't you cover it, even by putting a stick across it?", "Will you not cover it, even by placing a stick across"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ tell Abu Humayd about the milk?", a: "Cover it", wrong: ["Spill it", "Sell it", "Hide it in sand"], why: "Sahih al-Bukhari 5605." },
        { q: "With what, at the very least?", a: "A stick across it", wrong: ["Gold", "A rock", "Nothing"], why: "Even by placing a stick across it." },
        { q: "Covering food and drink is a sunnah.", tf: true, why: "He asked: will you not cover it?" }
      ]
    }
  ]
};

const DUA: DeepUnit = {
  key: "book-dua",
  topicId: "sahihayn",
  branchId: "hadith-book-dua",
  branch: { title: "The Book of Supplications", description: "From the Books of Invocations and Remembrance: duas the Prophet ﷺ made and taught." },
  name: "the Book of Supplications",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "abu-bakr-dua",
      title: "Abu Bakr's dua",
      line: "Abu Bakr asked for a dua for prayer: I wronged myself much.",
      facts: ["Allahumma inni zalamtu nafsi", "Only You forgive sins"],
      source: hadith("bukhari", "6326", "Abdullah ibn Amr", "Sahih", "Abu Bakr asked for a dua to say in prayer. He ﷺ said: say, O Allah, I have wronged myself greatly, and none forgives sins but You, so forgive me and have mercy on me; You are the Forgiving, the Merciful.", "Allahumma inni zalamtu nafsi zulman kathiran"),
      difficulty: 2,
      questions: [
        { q: "Who asked for this dua to say in prayer?", a: "Abu Bakr", wrong: ["Abu Jahl", "Abu Lahab", "Qarun"], why: "Sahih al-Bukhari 6326." },
        { q: "The dua says: none forgives sins but...?", a: "Allah", wrong: ["Our friends", "Kings", "Ourselves"], why: "Wa la yaghfirudh-dhunuba illa anta." },
        { q: "Even Abu Bakr asked Allah to forgive his wrongs.", tf: true, why: "I have wronged myself greatly." }
      ]
    },
    {
      slug: "ask-firmly",
      title: "Ask with certainty",
      line: "Ask Allah firmly; don't say: give me if You wish.",
      facts: ["No one forces Allah", "Ask with full hope"],
      source: hadith("bukhari", "6338", "Anas ibn Malik", "Sahih", "When one of you asks Allah, let him ask firmly and not say: O Allah, give me if You wish, for no one can force Allah.", "he should ask with determination"),
      difficulty: 2,
      questions: [
        { q: "How should we ask Allah?", a: "Firmly, with full hope", wrong: ["Unsure and doubtful", "Once, then give up", "Only in secret places"], why: "Sahih al-Bukhari 6338." },
        { q: "Which words did he ﷺ tell us not to say?", a: "Give me if You wish", wrong: ["Ya Allah", "Ameen", "Alhamdulillah"], why: "No one can force Allah anyway." },
        { q: "Ask Allah as one sure He can give.", tf: true, why: "Ask with determination." }
      ]
    },
    {
      slug: "no-wishing-death",
      title: "Never wish for death",
      line: "In hardship, don't wish for death; ask Allah for what's best.",
      facts: ["Let me live while life is good", "Take me when death is better"],
      source: hadith("bukhari", "6351", "Anas ibn Malik", "Sahih", "None of you should wish for death because of a hardship. If he must, let him say: O Allah, keep me alive while life is better for me, and take me when death is better for me.", "Let me live as long as life is better for me"),
      difficulty: 3,
      questions: [
        { q: "A hard time comes. What did he ﷺ forbid?", a: "Wishing for death", wrong: ["Making dua", "Being patient", "Asking for help"], why: "Sahih al-Bukhari 6351." },
        { q: "What does the dua ask Allah for?", a: "Life while it is better for me", wrong: ["Money only", "Fame", "Long holidays"], why: "Keep me alive while life is better." },
        { q: "Feeling very sad? Talk to Allah and to a trusted adult.", tf: true, why: "Ask Allah for what is best, and get help." }
      ]
    },
    {
      slug: "worry-and-grief",
      title: "From worry and grief",
      line: "He ﷺ sought refuge from worry, grief, laziness and heavy debt.",
      facts: ["Allahumma inni a'udhu bika minal hammi wal hazan", "Also from cowardice and stinginess"],
      source: hadith("bukhari", "6369", "Anas ibn Malik", "Sahih", "The Prophet ﷺ used to say: O Allah, I seek refuge in You from worry and grief, from weakness and laziness, from cowardice and stinginess, from heavy debt and from being overpowered by men.", "I seek refuge with You from worry and grief"),
      difficulty: 2,
      questions: [
        { q: "Which two feelings does this dua start with?", a: "Worry and grief", wrong: ["Joy and peace", "Hunger and thirst", "Heat and cold"], why: "Sahih al-Bukhari 6369." },
        { q: "Which of these is also in the dua?", a: "Laziness", wrong: ["Kindness", "Patience", "Charity"], why: "From weakness and laziness." },
        { q: "The Prophet ﷺ asked Allah's help against heavy debt.", tf: true, why: "From being heavily in debt." }
      ]
    },
    {
      slug: "forgive-my-mistakes",
      title: "Forgive my mistakes",
      line: "Forgive my mistakes, my ignorance, and what I overdid.",
      facts: ["Allahummaghfir li khati'ati", "Jokes and serious, all of it"],
      source: hadith("bukhari", "6399", "Abu Musa al-Ash'ari", "Sahih", "The Prophet ﷺ prayed: O Allah, forgive my mistakes, my ignorance, my going too far in my affairs, and what You know better than me; forgive what I did in jest and in earnest, by error and on purpose.", "Allahumma ighfirli khati"),
      difficulty: 3,
      questions: [
        { q: "What does this dua first ask Allah to forgive?", a: "My mistakes", wrong: ["My enemies", "My money", "My house"], why: "Sahih al-Bukhari 6399." },
        { q: "What else is named?", a: "My ignorance", wrong: ["My height", "My name", "My shoes"], why: "Khati'ati wa jahli." },
        { q: "The dua asks forgiveness even for what Allah knows better than us.", tf: true, why: "And what You know better than me." }
      ]
    },
    {
      slug: "turn-harm-into-good",
      title: "A dua for anyone you hurt",
      line: "The Prophet ﷺ asked Allah to turn his harsh words into good.",
      facts: ["A gift on the Day of Resurrection", "Bringing that person near to Allah"],
      source: hadith("bukhari", "6361", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: O Allah, if I ever spoke harshly to a believer, make that a means of bringing him near to You on the Day of Resurrection.", "please let that be a means of bringing him near to You"),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ ask for anyone he spoke harshly to?", a: "That it bring them near to Allah", wrong: ["That they forget it", "That they be punished", "That they move away"], why: "Let that be a means of bringing him near to You." },
        { q: "When did he ask for this good to reach them?", a: "On the Day of Resurrection", wrong: ["The next morning", "In Ramadan only", "At the next Jumuah"], why: "Sahih al-Bukhari 6361." },
        { q: "This dua was made for believers.", tf: true, why: "If I should ever abuse a believer." }
      ]
    },
    {
      slug: "dearer-than-the-world",
      title: "Dearer than the whole world",
      line: "Four words of dhikr: dearer to him ﷺ than the world.",
      facts: ["Four short words", "Dearer than all the sun rises on"],
      source: hadith("muslim", "2695", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: saying subhanallah, alhamdulillah, la ilaha illallah and Allahu akbar is dearer to me than everything the sun rises over.", "is dearer to me than anything over which the sun rises"),
      difficulty: 1,
      questions: [
        { q: "These four words are dearer to him ﷺ than...?", a: "All the sun rises over", wrong: ["One date", "A small cup", "A pair of shoes"], why: "Sahih Muslim 2695." },
        { q: "Which of these is one of the four?", a: "Allahu akbar", wrong: ["Good morning", "See you later", "Hello"], why: "With subhanallah, alhamdulillah and la ilaha illallah." },
        { q: "Saying these four words is easy and greatly loved.", tf: true, why: "Dearer than everything under the sun." }
      ]
    },
    {
      slug: "new-muslim-dua",
      title: "The dua for a new Muslim",
      line: "He ﷺ taught new Muslims to ask forgiveness and mercy.",
      facts: ["Allahummaghfir li warhamni", "Wahdini warzuqni"],
      source: hadith("muslim", "2697a", "Tariq ibn Ashyam", "Sahih", "When someone accepted Islam, the Prophet ﷺ taught him to say: O Allah, forgive me, have mercy on me, guide me and provide for me.", "grant me pardon, have mercy upon me, direct me to the path of righteousness and provide me sustenance"),
      difficulty: 1,
      questions: [
        { q: "Whom did he ﷺ teach this dua to first?", a: "Those who just accepted Islam", wrong: ["Only kings", "Only children", "Only traders"], why: "Sahih Muslim 2697." },
        { q: "Forgive me, have mercy, guide me, and...?", a: "Provide for me", wrong: ["Make me famous", "Make me king", "Make me tall"], why: "Warzuqni: provide for me." },
        { q: "This short dua asks for good in this life and the next.", tf: true, why: "Forgiveness, mercy, guidance and provision." }
      ]
    },
    {
      slug: "bedtime-thanks",
      title: "Thanks before sleep",
      line: "At bedtime, praise Allah who fed us, gave drink and shelter.",
      facts: ["Many have no shelter", "Count your blessings"],
      source: hadith("muslim", "2715", "Anas ibn Malik", "Sahih", "When he ﷺ went to bed he said: praise be to Allah who fed us, gave us drink, was enough for us and gave us shelter; how many have no one to suffice them or shelter them.", "Praise is due to Allah Who fed us, provided us drink"),
      difficulty: 1,
      questions: [
        { q: "When did he ﷺ say this praise?", a: "At bedtime", wrong: ["At sunrise only", "At Eid only", "Before a journey"], why: "Sahih Muslim 2715." },
        { q: "What does the dua remember?", a: "Many have no shelter", wrong: ["Everyone is rich", "Food is boring", "Nothing at all"], why: "So we thank Allah for ours." },
        { q: "This dua thanks Allah for food, drink and a home.", tf: true, why: "Who fed us, gave us drink and shelter." }
      ]
    },
    {
      slug: "guidance-and-taqwa",
      title: "Guidance, taqwa, purity, enough",
      line: "O Allah, I ask You for guidance, taqwa, purity and contentment.",
      facts: ["Al-huda wat-tuqa", "Wal-'afafa wal-ghina"],
      source: hadith("muslim", "2721a", "Abdullah ibn Mas'ud", "Sahih", "The Prophet ﷺ used to pray: O Allah, I ask You for guidance, taqwa, chastity and freedom from need.", "I beg of Thee the right guidance, safeguard against evils, chastity and freedom from want"),
      difficulty: 2,
      questions: [
        { q: "What does this dua ask for first?", a: "Guidance", wrong: ["Gold", "A palace", "Fame"], why: "Sahih Muslim 2721." },
        { q: "Al-ghina here means...?", a: "Not needing people", wrong: ["Singing", "Being loud", "Travel"], why: "Freedom from want." },
        { q: "Taqwa is one of the four things asked for.", tf: true, why: "Al-huda, at-tuqa, al-'afaf, al-ghina." }
      ]
    },
    {
      slug: "straight-as-an-arrow",
      title: "Straight as an arrow",
      line: "Ask for guidance, and picture an arrow flying straight.",
      facts: ["Taught to Ali", "Allahumma ihdini wa saddidni"],
      source: hadith("muslim", "2725a", "Ali ibn Abi Talib", "Sahih", "He ﷺ told Ali: say, O Allah, guide me and keep me on the straight path; and when you say it, think of being guided on the road and of the straightness of an arrow.", "keep in mind the straightness of the arrow"),
      difficulty: 3,
      questions: [
        { q: "Who was taught this dua?", a: "Ali ibn Abi Talib", wrong: ["Abu Jahl", "Qarun", "Fir'awn"], why: "Sahih Muslim 2725." },
        { q: "What should you picture when asking to be kept straight?", a: "A straight arrow", wrong: ["A twisting snake", "A spinning top", "A falling leaf"], why: "The straightness of the arrow." },
        { q: "Thinking about a dua's meaning makes it stronger.", tf: true, why: "He told Ali to keep the meaning in mind." }
      ]
    },
    {
      slug: "rooster-and-donkey",
      title: "The rooster and the donkey",
      line: "Hear a rooster? Ask for Allah's favor. A donkey? Seek refuge.",
      facts: ["Rooster sees an angel", "Donkey sees a devil"],
      source: hadith("muslim", "2729", "Abu Hurairah", "Sahih", "When you hear the rooster crow, ask Allah for His favor, for it has seen an angel; when you hear a donkey bray, seek refuge in Allah from Shaytan, for it has seen a devil.", "When you listen to the crowing of the cock, ask Allah for His favour"),
      difficulty: 2,
      questions: [
        { q: "A rooster crows at dawn. What do you do?", a: "Ask Allah for His favor", wrong: ["Shout back", "Cover your ears", "Nothing"], why: "Sahih Muslim 2729." },
        { q: "A donkey brays. What do you say?", a: "A'udhu billahi minash-shaytan", wrong: ["Alhamdulillah", "Ameen", "Mashallah"], why: "It has seen a devil." },
        { q: "The rooster crows when it has seen an angel.", tf: true, why: "So ask Allah for His favor." }
      ]
    },
    {
      slug: "keep-your-blessings",
      title: "Keep Your blessings on me",
      line: "Ask Allah to keep His blessings and His protection on you.",
      facts: ["Allahumma inni a'udhu bika min zawali ni'matik", "Told by Ibn Umar"],
      source: hadith("muslim", "2739", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ prayed: O Allah, I seek refuge in You from the loss of Your blessing, the change of Your protection, Your sudden punishment and all Your displeasure.", "from the withdrawal of Thine blessing and the change of Thine protection"),
      difficulty: 3,
      questions: [
        { q: "What does this dua ask Allah to keep?", a: "His blessings on us", wrong: ["Our enemies", "Our bad habits", "Nothing"], why: "Sahih Muslim 2739." },
        { q: "And from what else does it seek refuge?", a: "All of Allah's displeasure", wrong: ["Rain", "Friends", "School"], why: "And from every displeasure of Yours." },
        { q: "Blessings can be lost, so we ask Allah to keep them.", tf: true, why: "From the withdrawal of Your blessing." }
      ]
    },
    {
      slug: "as-you-think-of-me",
      title: "As My servant thinks of Me",
      line: "Allah says: I am as My servant thinks of Me.",
      facts: ["Remember Allah, He remembers you", "Come walking, He comes running"],
      source: hadith("muslim", "2675a", "Abu Hurairah", "Sahih", "Allah says: I am as My servant thinks of Me, and I am with him when he remembers Me. If he remembers Me in a gathering, I remember him in a better gathering; if he comes a hand's span closer, I come an arm's length closer.", "I am near to the thought of My servant as he thinks about Me"),
      difficulty: 3,
      questions: [
        { q: "Allah is as His servant...?", a: "Thinks of Him", wrong: ["Looks", "Dresses", "Shouts"], why: "Sahih Muslim 2675." },
        { q: "If you remember Allah in a gathering, He remembers you...?", a: "In a better gathering", wrong: ["Never", "Only at night", "Only if rich"], why: "Better than his remembrance." },
        { q: "So think well of Allah and expect good from Him.", tf: true, why: "I am as My servant thinks of Me." }
      ]
    }
  ]
};

/** The Bukhari and Muslim topic. Its units hold only deep lessons, added by addDeepUnits. */
export const SAHIHAYN_SECTION: LearningSection = {
  id: "sahihayn",
  topicId: "sahihayn",
  title: "Bukhari and Muslim",
  description: "Sahih al-Bukhari and Sahih Muslim, one book at a time: faith, purity, good manners and more.",
  badge: "Topic 12",
  focus: "The hadith every Muslim needs, from the two most trusted hadith books.",
  mascot: "muslim_man",
  accentColor: "#2E8B6E",
  starsTarget: 0,
  branches: [],
  nodes: []
};

export const HADITH_BOOK_UNITS: readonly DeepUnit[] = [FAITH, PURITY, ADAB, FOOD, DUA];
