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

const RIQAQ: DeepUnit = {
  key: "book-riqaq",
  topicId: "sahihayn",
  branchId: "hadith-book-riqaq",
  branch: { title: "The Book of Soft Hearts", description: "From the Books of Ar-Riqaq and Az-Zuhd: hadith that make this world small and the heart soft." },
  name: "the Book of Soft Hearts",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "the-square-and-the-line",
      title: "The square and the line",
      line: "He ﷺ drew a square: our lifetime, with hopes reaching past it.",
      facts: ["The square is our lifetime", "Small lines are troubles"],
      source: hadith("bukhari", "6417", "Abdullah ibn Mas'ud", "Sahih", "The Prophet ﷺ drew a square with a line going out of it and small lines on it. He said: this is a person, the square is his lifetime around him, the line going out is his hope, and the small lines are the troubles that may come to him.", "this (line), which is outside (the square), is his hope"),
      difficulty: 2,
      questions: [
        { q: "In the drawing, what did the square stand for?", a: "A person's lifetime", wrong: ["His house", "His money", "His city"], why: "His lease of life encircles him from all sides." },
        { q: "What was the line going outside the square?", a: "His hope", wrong: ["His family", "His road", "His food"], why: "This line, which is outside the square, is his hope." },
        { q: "Our hopes often reach further than our lifetime.", tf: true, why: "The line of hope goes outside the square. Sahih al-Bukhari 6417." }
      ]
    },
    {
      slug: "slave-of-money",
      title: "A slave of money",
      line: "Wretched is the one who is pleased only when given money.",
      facts: ["Dinar, dirham and fine clothes", "Pleased only when given"],
      source: hadith("bukhari", "6435", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: wretched is the slave of the dinar, the dirham and fine clothes; if he is given he is pleased, and if not he is unhappy.", "if he is given, he is pleased; otherwise he is dissatisfied"),
      difficulty: 2,
      questions: [
        { q: "What makes the slave of money happy?", a: "Only being given things", wrong: ["Prayer", "Helping others", "Learning"], why: "If he is given, he is pleased." },
        { q: "What happens when he is not given?", a: "He is unhappy", wrong: ["He thanks Allah", "He gives more", "He smiles"], why: "Otherwise he is dissatisfied." },
        { q: "A believer's heart should belong to Allah, not to money.", tf: true, why: "Sahih al-Bukhari 6435 warns against being a slave of wealth." }
      ]
    },
    {
      slug: "green-and-sweet",
      title: "Wealth is green and sweet",
      line: "Wealth is sweet; taken without greed, Allah blesses it.",
      facts: ["Asked three times by Hakim", "The giving hand is better"],
      source: hadith("bukhari", "6441", "Hakim ibn Hizam", "Sahih", "Hakim asked the Prophet ﷺ three times and was given each time. Then he said: this wealth is green and sweet; whoever takes it without greed is blessed in it, and whoever takes it with greed is like one who eats and is never full. The upper hand is better than the lower hand.", "whoever takes it without greed, Allah will bless it for him"),
      difficulty: 2,
      questions: [
        { q: "How did the Prophet ﷺ describe wealth?", a: "Green and sweet", wrong: ["Heavy and dark", "Bitter and old", "Cold and hard"], why: "This wealth is like green and sweet fruit." },
        { q: "One who takes wealth greedily is like...?", a: "One who eats and is never full", wrong: ["A sleeping lion", "A happy bird", "A full well"], why: "He will be like the one who eats but is never satisfied." },
        { q: "Which hand is better?", a: "The upper, giving hand", wrong: ["The lower, taking hand", "Both are the same", "The empty hand"], why: "The upper hand is better than the lower hand." }
      ]
    },
    {
      slug: "gold-like-uhud",
      title: "Gold like Mount Uhud",
      line: "With gold like Uhud, he ﷺ would keep it only three nights.",
      facts: ["He would spend it for Allah", "Except what pays a debt"],
      source: hadith("bukhari", "6445", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: if I had gold like Mount Uhud, I would not like any of it to stay with me after three nights, except what I keep to pay a debt.", "it would not please me that anything of it should remain with me after three nights"),
      difficulty: 2,
      questions: [
        { q: "How much gold did he ﷺ imagine having?", a: "As much as Mount Uhud", wrong: ["One coin", "A small bag", "A ring"], why: "If I had gold equal to the mountain of Uhud." },
        { q: "How long would he ﷺ keep it?", a: "No more than three nights", wrong: ["Forever", "A whole year", "Ten years"], why: "It would not please me that it remain after three nights." },
        { q: "What would he ﷺ keep back?", a: "Enough to repay debts", wrong: ["A new house", "Nothing for anyone", "Gifts for himself"], why: "Except what I would keep for repaying debts." }
      ]
    },
    {
      slug: "the-simple-bed",
      title: "A simple bed",
      line: "His ﷺ mattress was leather stuffed with palm fibres.",
      facts: ["Told by Aishah", "No soft feathers"],
      source: hadith("bukhari", "6456", "Aishah", "Sahih", "Aishah said: the mattress of the Prophet ﷺ was made of leather stuffed with palm fibres.", "made of a leather case stuffed with palm fibres"),
      difficulty: 1,
      questions: [
        { q: "What was his ﷺ mattress stuffed with?", a: "Palm fibres", wrong: ["Silk", "Feathers", "Cotton"], why: "A leather case stuffed with palm fibres." },
        { q: "Who told us about his mattress?", a: "Aishah", wrong: ["Abu Hurairah", "Anas", "Umar"], why: "Sahih al-Bukhari 6456, narrated by Aishah." },
        { q: "The Prophet ﷺ slept on a very fancy bed.", tf: false, why: "His bed was simple leather with palm fibres." }
      ]
    },
    {
      slug: "three-crescents",
      title: "Three new moons, no cooking",
      line: "Two months could pass with no cooking in his ﷺ homes.",
      facts: ["Dates and water", "Milk gifts from Ansar neighbours"],
      source: hadith("bukhari", "6459", "Aishah", "Sahih", "Aishah told Urwah: we would see three new moons in two months and no fire was lit for cooking in the homes of the Prophet ﷺ. We lived on dates and water, and Ansar neighbours sent milk.", "We used to see three crescents in two months"),
      difficulty: 2,
      questions: [
        { q: "What were the two black things they lived on?", a: "Dates and water", wrong: ["Bread and meat", "Rice and beans", "Honey and milk"], why: "The two black things, dates and water." },
        { q: "Who sometimes sent them milk?", a: "Their Ansar neighbours", wrong: ["Traders from Syria", "No one", "The king of Persia"], why: "Neighbours from the Ansar had milch she-camels." },
        { q: "How many new moons could pass without cooking?", a: "Three", wrong: ["One", "Ten", "Twelve"], why: "Three crescents in two months." }
      ]
    },
    {
      slug: "moths-and-the-fire",
      title: "Holding us back",
      line: "Like moths rushing to a fire, he ﷺ holds us back.",
      facts: ["He holds us by our belts", "He wants us safe"],
      source: hadith("bukhari", "6483", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: my example is like a man who lit a fire, and moths began falling into it while he tried to stop them. I hold you by your belts to keep you from the Fire, but you rush into it.", "I take hold of the knots at your waist"),
      difficulty: 2,
      questions: [
        { q: "What rushed into the fire in this example?", a: "Moths and insects", wrong: ["Birds", "Fish", "Camels"], why: "Moths and other insects started falling into the fire." },
        { q: "What does the Prophet ﷺ do for us in the example?", a: "Holds us back by our belts", wrong: ["Pushes us", "Walks away", "Sleeps"], why: "I take hold of the knots at your waist." },
        { q: "This hadith shows how much he ﷺ cared for his ummah.", tf: true, why: "He tried his best to keep people safe. Sahih al-Bukhari 6483." }
      ]
    },
    {
      slug: "look-below-you",
      title: "Look at those below you",
      line: "If you see someone with more, think of someone with less.",
      facts: ["More money or looks", "Brings thankfulness"],
      source: hadith("bukhari", "6490", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: if one of you looks at someone given more wealth and better looks, let him also look at someone who has less than him.", "then he should also look at the one who is inferior to him"),
      difficulty: 1,
      questions: [
        { q: "You see a friend with a new phone. What fits this hadith?", a: "Think of those with less", wrong: ["Feel angry", "Complain all day", "Take his phone"], why: "Look at the one who has less than you." },
        { q: "What two things are named in this hadith?", a: "Wealth and looks", wrong: ["Height and age", "Food and drink", "Cars and houses"], why: "Made superior to him in property and appearance." },
        { q: "Looking at those with less helps us thank Allah.", tf: true, why: "Sahih al-Bukhari 6490." }
      ]
    },
    {
      slug: "al-adba-the-camel",
      title: "The camel that was beaten",
      line: "His ﷺ fast camel lost a race: nothing worldly stays on top.",
      facts: ["The camel was Al-Adba", "A bedouin's camel won"],
      source: hadith("bukhari", "6501", "Anas ibn Malik", "Sahih", "The Prophet ﷺ had a fast camel called Al-Adba that no one beat, until a bedouin's camel won a race. The Muslims were sad, and he ﷺ said: Allah has made it so that nothing rises high in this world but He lowers it.", "nothing would be raised high in this world except that He lowers"),
      difficulty: 2,
      questions: [
        { q: "What was the name of his ﷺ fast camel?", a: "Al-Adba", wrong: ["Al-Buraq", "Mahmud", "Al-Jamal"], why: "He had a she-camel called Al-Adba." },
        { q: "Who beat Al-Adba in the race?", a: "A bedouin on his camel", wrong: ["Abu Bakr", "A horse rider", "Nobody"], why: "There came a bedouin riding a camel of his, and it outstripped it." },
        { q: "What lesson did he ﷺ give?", a: "Nothing worldly stays on top", wrong: ["Always win races", "Sell slow camels", "Never race"], why: "Nothing is raised high in this world except that He lowers it." }
      ]
    },
    {
      slug: "relieved-or-relieving",
      title: "Resting or giving rest",
      line: "A believer who dies rests from hardship, going to Allah's mercy.",
      facts: ["Said as a funeral passed", "Rest from the world's troubles"],
      source: hadith("bukhari", "6512", "Abu Qatadah", "Sahih", "A funeral passed and the Prophet ﷺ said: resting or giving rest. He explained that a believer rests from the hardships of the world and goes to Allah's mercy.", "A believer is relieved (by death) from the troubles and hardships of the world"),
      difficulty: 2,
      questions: [
        { q: "When did he ﷺ say this?", a: "As a funeral passed", wrong: ["At a wedding", "At Eid", "In a market"], why: "A funeral procession passed by." },
        { q: "Where does the believer go after death?", a: "To Allah's mercy", wrong: ["To nowhere", "Back home", "To the market"], why: "He leaves for the Mercy of Allah." },
        { q: "For a believer, death brings rest from the world's hardships.", tf: true, why: "Sahih al-Bukhari 6512." }
      ]
    },
    {
      slug: "do-not-insult-the-dead",
      title: "Don't speak ill of the dead",
      line: "Do not insult the dead; they have met what they did.",
      facts: ["Told by Aishah", "Their deeds are done"],
      source: hadith("bukhari", "6516", "Aishah", "Sahih", "The Prophet ﷺ said: do not insult the dead, for they have reached what they sent ahead.", "Do not abuse the dead, for they have reached the result of what they have done"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ forbid about the dead?", a: "Insulting them", wrong: ["Praying for them", "Remembering them", "Visiting graves"], why: "Do not abuse the dead." },
        { q: "Why not insult them?", a: "They have met their deeds", wrong: ["They can hear us", "It is boring", "They will return"], why: "They have reached the result of what they have done." },
        { q: "We may make dua for Muslims who have died.", tf: true, why: "Insulting is forbidden; praying for them is good." }
      ]
    },
    {
      slug: "this-world-is-a-prison",
      title: "A prison for the believer",
      line: "This world is a prison for the believer; Jannah waits ahead.",
      facts: ["The believer holds back for Allah", "His true joy is ahead"],
      source: hadith("muslim", "2956", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: this world is a prison for the believer and a paradise for the disbeliever.", "The world is a prison-house for a believer"),
      difficulty: 2,
      questions: [
        { q: "What is this world for the believer?", a: "A prison", wrong: ["A paradise", "A forever home", "A playground"], why: "The world is a prison-house for a believer." },
        { q: "Why is it like a prison for him?", a: "He holds back for Allah", wrong: ["He has no friends", "He is always sick", "He cannot walk"], why: "He keeps away from what Allah forbids, waiting for Jannah." },
        { q: "The believer's best reward comes in the Hereafter.", tf: true, why: "Sahih Muslim 2956." }
      ]
    }
  ]
};

const DRESS: DeepUnit = {
  key: "book-dress",
  topicId: "sahihayn",
  branchId: "hadith-book-libas",
  branch: { title: "The Book of Dress", description: "From the Books of Dress: how the Prophet ﷺ dressed, his shoes, ring and scent." },
  name: "the Book of Dress",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "the-hibra-cloth",
      title: "His favourite cloth",
      line: "His ﷺ favourite garment was the Hibra, a cloth from Yemen.",
      facts: ["Told by Anas", "Made in Yemen"],
      source: hadith("bukhari", "5813", "Anas ibn Malik", "Sahih", "Anas said: the garment the Prophet ﷺ loved most to wear was the Hibra, a Yemeni cloth.", "The most beloved garment to the Prophet (ﷺ) to wear was the Hibra"),
      difficulty: 1,
      questions: [
        { q: "Which garment did he ﷺ love most?", a: "The Hibra", wrong: ["A silk robe", "A golden crown", "A leather coat"], why: "The most beloved garment to him was the Hibra." },
        { q: "Where did the Hibra cloth come from?", a: "Yemen", wrong: ["Rome", "India", "Egypt"], why: "A kind of Yemenese cloth." },
        { q: "Anas told us about this cloth.", tf: true, why: "Sahih al-Bukhari 5813, narrated by Anas." }
      ]
    },
    {
      slug: "sads-handkerchiefs",
      title: "Better than silk",
      line: "Sa'd's handkerchiefs in Jannah beat the finest silk here.",
      facts: ["People admired a silk gift", "Jannah is far better"],
      source: hadith("bukhari", "5836", "Al-Bara ibn Azib", "Sahih", "The Prophet ﷺ was given a silk garment and the people admired it. He said: the handkerchiefs of Sa'd ibn Mu'adh in Paradise are better than this.", "in Paradise are better than this"),
      difficulty: 2,
      questions: [
        { q: "What gift amazed the companions?", a: "A silk garment", wrong: ["A horse", "A sword", "A book"], why: "He was given a silk garment as a gift." },
        { q: "What did he ﷺ say is better than it?", a: "Sa'd's handkerchiefs in Jannah", wrong: ["A gold ring", "A new house", "A bigger gift"], why: "The handkerchiefs of Sa'd bin Mu'adh in Paradise are better." },
        { q: "Even the smallest thing in Jannah is better than the best of this world.", tf: true, why: "Sahih al-Bukhari 5836." }
      ]
    },
    {
      slug: "silk-for-men",
      title: "Silk is not for men",
      line: "Men who wear silk here will not wear it in the Hereafter.",
      facts: ["This ruling is for men", "Women may wear silk"],
      source: hadith("bukhari", "5832", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said: whoever wears silk in this world will not wear it in the Hereafter.", "Whoever wears silk in this world shall not wear it in the Hereafter"),
      difficulty: 2,
      questions: [
        { q: "What happens to a man who wears silk in this world?", a: "He won't wear it in the Hereafter", wrong: ["He gets more", "Nothing at all", "He becomes rich"], why: "He shall not wear it in the Hereafter." },
        { q: "Who is this ruling for?", a: "Men", wrong: ["Women", "Children only", "Everyone"], why: "Scholars agree women are allowed to wear silk." },
        { q: "Women are forbidden to wear silk.", tf: false, why: "The ban on silk is for men only." }
      ]
    },
    {
      slug: "right-shoe-first",
      title: "Right shoe first",
      line: "Put the right shoe on first and take the left off first.",
      facts: ["Right on first", "Right off last"],
      source: hadith("bukhari", "5855", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: when you put on shoes, start with the right; when you take them off, start with the left.", "put on the right shoe first; and if you want to take them off, take the left one first"),
      difficulty: 1,
      questions: [
        { q: "Which shoe goes on first?", a: "The right", wrong: ["The left", "Either one", "Both at once"], why: "Put on the right shoe first." },
        { q: "Which shoe comes off first?", a: "The left", wrong: ["The right", "Neither", "The heavier one"], why: "Take the left one first." },
        { q: "The right shoe is the first on and the last off.", tf: true, why: "Sahih al-Bukhari 5855." }
      ]
    },
    {
      slug: "both-shoes",
      title: "Not one shoe",
      line: "Don't walk in one shoe: wear both or none.",
      facts: ["Both shoes", "Or no shoes at all"],
      source: hadith("bukhari", "5856", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: none of you should walk in one shoe; wear both or take both off.", "he should either put on both shoes or put on no shoes"),
      difficulty: 1,
      questions: [
        { q: "One strap breaks. What fits this hadith?", a: "Take both shoes off", wrong: ["Hop on one shoe", "Walk in one shoe", "Throw one away"], why: "Put on both shoes or no shoes." },
        { q: "How should we walk?", a: "In both shoes or none", wrong: ["In one shoe", "Backwards", "Only barefoot"], why: "Sahih al-Bukhari 5856." },
        { q: "Walking in just one shoe is the Sunnah.", tf: false, why: "None of you should walk wearing one shoe only." }
      ]
    },
    {
      slug: "wear-sandals",
      title: "Like riding",
      line: "Wear sandals often: walking in them is like riding.",
      facts: ["Said on a journey", "Told by Jabir"],
      source: hadith("muslim", "2096", "Jabir ibn Abdullah", "Sahih", "On a journey the Prophet ﷺ said: wear sandals often, for a man in sandals is as if he is riding.", "for a man is riding as it were when he wears sandals"),
      difficulty: 1,
      questions: [
        { q: "Walking in sandals is like...?", a: "Riding", wrong: ["Swimming", "Flying", "Sleeping"], why: "A man is riding as it were when he wears sandals." },
        { q: "When did he ﷺ say this?", a: "On a journey", wrong: ["At a wedding", "In a market", "At home"], why: "During an expedition, says Jabir." },
        { q: "Good sandals make long walks easier.", tf: true, why: "Sahih Muslim 2096." }
      ]
    },
    {
      slug: "the-silver-ring",
      title: "The ring of the caliphs",
      line: "His ﷺ silver ring passed to Abu Bakr, Umar, then Uthman.",
      facts: ["Engraved: Muhammad, Messenger of Allah", "Lost in the well of Aris"],
      source: hadith("bukhari", "5873", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ had a silver ring made. After him Abu Bakr wore it, then Umar, then Uthman, until it fell into the well of Aris. On it was engraved: Muhammad, the Messenger of Allah.", "Afterwards it was worn by Abu Bakr"),
      difficulty: 2,
      questions: [
        { q: "What was his ﷺ ring made of?", a: "Silver", wrong: ["Gold", "Iron", "Wood"], why: "He had a silver ring made for himself." },
        { q: "Who wore it after Abu Bakr?", a: "Umar", wrong: ["Ali", "Mu'awiyah", "Bilal"], why: "Then by Umar, and then by Uthman." },
        { q: "Where was the ring lost?", a: "In the well of Aris", wrong: ["In the sea", "In a market", "In the desert"], why: "Till it fell in the Aris well." }
      ]
    },
    {
      slug: "his-hair",
      title: "His blessed hair",
      line: "His ﷺ hair was neither very straight nor very curly.",
      facts: ["Between earlobes and shoulders", "Told by Anas"],
      source: hadith("bukhari", "5905", "Anas ibn Malik", "Sahih", "Anas said: his hair was neither very straight nor very curly, and it reached between his shoulders and his earlobes.", "neither much straight, nor much curly"),
      difficulty: 1,
      questions: [
        { q: "How was his ﷺ hair?", a: "Neither very straight nor curly", wrong: ["Very curly", "Very straight", "Shaved always"], why: "Neither much straight, nor much curly." },
        { q: "How long was it?", a: "Between earlobes and shoulders", wrong: ["Down to his waist", "Very short", "To his knees"], why: "Between his shoulders and his earlobes." },
        { q: "Anas described the hair of the Prophet ﷺ.", tf: true, why: "Sahih al-Bukhari 5905." }
      ]
    },
    {
      slug: "never-refused-scent",
      title: "He never refused perfume",
      line: "He ﷺ never turned down a gift of perfume.",
      facts: ["Anas did the same", "A small, kind sunnah"],
      source: hadith("bukhari", "5929", "Thumamah ibn Abdullah", "Sahih", "Anas never refused a gift of perfume and said the Prophet ﷺ never refused perfume.", "the Prophet (ﷺ) never used to refuse (a gift of) scent"),
      difficulty: 1,
      questions: [
        { q: "What gift did he ﷺ never refuse?", a: "Perfume", wrong: ["Gold", "Horses", "Land"], why: "He never used to refuse a gift of scent." },
        { q: "Which companion copied this?", a: "Anas", wrong: ["Khalid", "Abu Jahl", "Salman"], why: "Anas never used to refuse a gift of scent." },
        { q: "Accepting perfume as a gift follows the Sunnah.", tf: true, why: "Sahih al-Bukhari 5929." }
      ]
    },
    {
      slug: "the-best-scent",
      title: "The best scent",
      line: "Aishah perfumed him ﷺ with the best scent she could find.",
      facts: ["Its shine showed on his head", "And on his beard"],
      source: hadith("bukhari", "5923", "Aishah", "Sahih", "Aishah said: I perfumed the Prophet ﷺ with the best scent I could find, until I saw its shine on his head and beard.", "with the best scent available"),
      difficulty: 1,
      questions: [
        { q: "What scent did Aishah use?", a: "The best she could find", wrong: ["The cheapest", "None at all", "A strong smoke"], why: "With the best scent available." },
        { q: "Where could its shine be seen?", a: "On his head and beard", wrong: ["On his shoes", "On his cloak", "On his hands only"], why: "I saw the shine of the scent on his head and beard." },
        { q: "Smelling nice is part of a Muslim's good manners.", tf: true, why: "He ﷺ loved good scent. Sahih al-Bukhari 5923." }
      ]
    },
    {
      slug: "none-more-handsome",
      title: "No one more handsome",
      line: "Al-Bara said he never saw anything more handsome than him ﷺ.",
      facts: ["He was of medium height", "Told by Al-Bara"],
      source: hadith("bukhari", "5848", "Al-Bara ibn Azib", "Sahih", "Al-Bara said: the Prophet ﷺ was of medium height. I saw him in a red suit, and I never saw anything better looking than him.", "I did not see anything better than him"),
      difficulty: 1,
      questions: [
        { q: "How tall was the Prophet ﷺ?", a: "Of medium height", wrong: ["Very tall", "Very short", "A giant"], why: "The Prophet ﷺ was of a modest height." },
        { q: "What did Al-Bara never see?", a: "Anything better than him", wrong: ["A camel", "A city", "A sword"], why: "I did not see anything better than him." },
        { q: "Al-Bara ibn Azib narrated this.", tf: true, why: "Sahih al-Bukhari 5848." }
      ]
    },
    {
      slug: "four-beds",
      title: "The fourth bed",
      line: "Beds for you, your wife and a guest; a fourth is Shaytan's.",
      facts: ["Keep what you need", "No showing off"],
      source: hadith("muslim", "2084", "Jabir ibn Abdullah", "Sahih", "The Prophet ﷺ said: a bed for a man, a bed for his wife, a third for a guest, and the fourth is for Shaytan.", "the fourth one is for the Satan"),
      difficulty: 2,
      questions: [
        { q: "Who is the third bed for?", a: "A guest", wrong: ["A cat", "A neighbour's child", "Storage"], why: "The third one for the guest." },
        { q: "Who is the fourth bed for?", a: "Shaytan", wrong: ["A king", "A teacher", "A merchant"], why: "The fourth one is for the Satan." },
        { q: "This hadith teaches us to avoid waste and showing off.", tf: true, why: "Keep what you need. Sahih Muslim 2084." }
      ]
    },
    {
      slug: "children-on-his-mount",
      title: "Children on his ride",
      line: "Children ran to greet him ﷺ; he lifted one before, one behind.",
      facts: ["On arriving in Makkah", "Bani Abdul Muttalib's children"],
      source: hadith("bukhari", "5965", "Abdullah ibn Abbas", "Sahih", "When the Prophet ﷺ reached Makkah, the children of Bani Abdul Muttalib came to meet him. He put one in front of him and another behind him on his ride.", "He then mounted one of them in front of him and the other behind him"),
      difficulty: 1,
      questions: [
        { q: "Who came out to meet him in Makkah?", a: "Children of his clan", wrong: ["Soldiers", "Traders", "Kings"], why: "The children of Bani Abdul Muttalib received him." },
        { q: "What did he ﷺ do with two of them?", a: "Lifted them onto his ride", wrong: ["Sent them home", "Ignored them", "Gave them chores"], why: "One in front of him and the other behind him." },
        { q: "The Prophet ﷺ was kind and playful with children.", tf: true, why: "Sahih al-Bukhari 5965." }
      ]
    },
    {
      slug: "not-on-the-face",
      title: "Never on the face",
      line: "He ﷺ forbade hitting an animal on its face or marking it there.",
      facts: ["Kindness to animals", "The face is honoured"],
      source: hadith("muslim", "2116a", "Jabir ibn Abdullah", "Sahih", "The Prophet ﷺ forbade striking animals on the face or branding them on the face.", "forbade (the animals to be beaten) on the face"),
      difficulty: 1,
      questions: [
        { q: "Where must an animal never be hit?", a: "On its face", wrong: ["Anywhere is fine", "Only on Fridays", "In the stable"], why: "He forbade animals being beaten on the face." },
        { q: "What else did he ﷺ forbid on the face?", a: "Branding it", wrong: ["Washing it", "Feeding it", "Petting it"], why: "Or cauterisation on the face." },
        { q: "Islam teaches kindness to animals.", tf: true, why: "Sahih Muslim 2116." }
      ]
    }
  ]
};

const TRADE: DeepUnit = {
  key: "book-trade",
  topicId: "sahihayn",
  branchId: "hadith-book-buyu",
  branch: { title: "The Book of Trade", description: "From the Books of Sales and Trade: earning, buying and selling the halal way." },
  name: "the Book of Trade",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "halal-or-haram-money",
      title: "Care where money comes from",
      line: "A time will come when people won't care if money is halal.",
      facts: ["A warning from the Prophet ﷺ", "Always check your earnings"],
      source: hadith("bukhari", "2059", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: a time will come when people will not care whether they earn their money lawfully or unlawfully.", "one will not care how one gains one"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ warn people would stop caring about?", a: "Whether money is halal", wrong: ["How much they sleep", "What they wear", "Where they travel"], why: "One will not care how one gains money, legally or illegally." },
        { q: "A Muslim checks that his money is halal.", tf: true, why: "Sahih al-Bukhari 2059 warns against not caring." },
        { q: "How should a Muslim earn?", a: "Only in lawful ways", wrong: ["Any way at all", "By tricking people", "By luck only"], why: "Do not be like those who do not care." }
      ]
    },
    {
      slug: "the-iron-armour",
      title: "Grain on credit",
      line: "He ﷺ bought grain on credit and left his armour as pledge.",
      facts: ["Bought from a Jewish man", "Trade with all people is allowed"],
      source: hadith("bukhari", "2068", "Aishah", "Sahih", "Aishah said: the Prophet ﷺ bought food grain from a Jewish man on credit and gave him his iron armour as a pledge.", "purchased food grains from a Jew on credit and mortgaged his iron armor"),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ buy on credit?", a: "Food grain", wrong: ["A horse", "A house", "Silk"], why: "He purchased food grains on credit." },
        { q: "What did he leave as a pledge?", a: "His iron armour", wrong: ["His ring", "His sword", "His camel"], why: "He mortgaged his iron armor to him." },
        { q: "Muslims may trade fairly with people of other faiths.", tf: true, why: "He bought from a Jewish man. Sahih al-Bukhari 2068." }
      ]
    },
    {
      slug: "working-hands",
      title: "Working with their hands",
      line: "The companions worked with their hands and were told to bathe.",
      facts: ["Hard work is honourable", "Keep clean after work"],
      source: hadith("bukhari", "2071", "Aishah", "Sahih", "Aishah said: the companions of the Prophet ﷺ did their own manual work, so they would sweat, and they were told to take a bath.", "used to practice manual labor"),
      difficulty: 1,
      questions: [
        { q: "What kind of work did the companions do?", a: "Work with their hands", wrong: ["No work at all", "Only trading gold", "Only writing"], why: "They used to practice manual labor." },
        { q: "What were they told to do after sweating?", a: "Take a bath", wrong: ["Sleep", "Buy perfume only", "Stay home"], why: "They were advised to take a bath." },
        { q: "Working hard with your hands is a shameful thing.", tf: false, why: "The companions did it. Sahih al-Bukhari 2071." }
      ]
    },
    {
      slug: "carry-the-wood",
      title: "Better than asking",
      line: "Carrying firewood to sell is better than begging from people.",
      facts: ["Earn with your own effort", "Keep your honour"],
      source: hadith("bukhari", "2074", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: it is better for one of you to cut a bundle of wood and carry it on his back than to ask someone who may or may not give him.", "cut a bundle of wood and carry it over his back"),
      difficulty: 1,
      questions: [
        { q: "What is better than asking people for money?", a: "Carrying wood to earn", wrong: ["Sleeping all day", "Taking secretly", "Doing nothing"], why: "Cut a bundle of wood and carry it over his back." },
        { q: "Why is asking people risky?", a: "They may or may not give", wrong: ["They are always rich", "It is too easy", "It is fun"], why: "Rather than to ask someone who may or may not give him." },
        { q: "Islam praises earning your own living.", tf: true, why: "Sahih al-Bukhari 2074." }
      ]
    },
    {
      slug: "easygoing-trader",
      title: "An easygoing trader",
      line: "Allah's mercy is on one who is easy when buying and selling.",
      facts: ["Easy when buying", "Easy when asking for a debt"],
      source: hadith("bukhari", "2076", "Jabir ibn Abdullah", "Sahih", "The Prophet ﷺ said: may Allah have mercy on a man who is easygoing when he buys, when he sells and when he asks for his money back.", "lenient in his buying, selling, and in demanding back his money"),
      difficulty: 1,
      questions: [
        { q: "Who gets Allah's mercy in this hadith?", a: "One who is easy in trade", wrong: ["One who shouts", "One who cheats", "One who never sells"], why: "Lenient in his buying and selling." },
        { q: "When else should we be easy?", a: "When asking for a debt back", wrong: ["When lying", "When angry", "When sleeping"], why: "And in demanding back his money." },
        { q: "Bargaining harshly and rudely is the Sunnah.", tf: false, why: "The Prophet ﷺ prayed for the easygoing trader." }
      ]
    },
    {
      slug: "forgive-the-debtor",
      title: "The forgiving lender",
      line: "A lender let poor debtors off, so Allah forgave him.",
      facts: ["He told his workers to forgive", "Allah forgave him"],
      source: hadith("bukhari", "2078", "Abu Hurairah", "Sahih", "The Prophet ﷺ told of a merchant who lent to people; when a debtor was in hardship he told his workers: let him off, so that Allah may let us off. So Allah forgave him.", "Forgive him so that Allah may forgive us"),
      difficulty: 2,
      questions: [
        { q: "What did the lender do for poor debtors?", a: "Let them off", wrong: ["Took their house", "Shouted at them", "Added more"], why: "Forgive him so that Allah may forgive us." },
        { q: "What did Allah do for him?", a: "Forgave him", wrong: ["Made him poor", "Ignored him", "Took his shop"], why: "So, Allah forgave him." },
        { q: "Being gentle with people in debt is loved by Allah.", tf: true, why: "Sahih al-Bukhari 2078." }
      ]
    },
    {
      slug: "swearing-to-sell",
      title: "Oaths that kill blessing",
      line: "Swearing may sell the goods but removes Allah's blessing.",
      facts: ["Oaths to push a sale", "Blessing is lost"],
      source: hadith("bukhari", "2087", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: swearing may help sell the goods, but it wipes out the blessing.", "that will be deprived of Allah"),
      difficulty: 2,
      questions: [
        { q: "What does swearing a lot help a seller do?", a: "Sell the goods", wrong: ["Pray more", "Sleep well", "Get healthy"], why: "Swearing may persuade the buyer." },
        { q: "What does it take away?", a: "Allah's blessing", wrong: ["The price tag", "The shop sign", "The weather"], why: "That will be deprived of Allah's blessing." },
        { q: "Honest selling without oaths brings more barakah.", tf: true, why: "Sahih al-Bukhari 2087." }
      ]
    },
    {
      slug: "until-they-part",
      title: "Until they part",
      line: "Buyer and seller may cancel until they part ways.",
      facts: ["A fair right for both", "Told by Hakim ibn Hizam"],
      source: hadith("bukhari", "2108", "Hakim ibn Hizam", "Sahih", "The Prophet ﷺ said: the buyer and the seller may cancel or keep the deal as long as they have not parted.", "have the option of canceling or confirming the deal unless they separate"),
      difficulty: 2,
      questions: [
        { q: "Until when can a deal be cancelled?", a: "Until they part", wrong: ["Never", "After a year", "Only on Fridays"], why: "Unless they separate." },
        { q: "Who has this choice?", a: "Both buyer and seller", wrong: ["Only the buyer", "Only the seller", "Only the judge"], why: "The buyer and the seller have the option." },
        { q: "Who narrated this hadith?", a: "Hakim ibn Hizam", wrong: ["Abu Bakr", "Bilal", "Salman"], why: "Sahih al-Bukhari 2108." }
      ]
    },
    {
      slug: "no-cheating",
      title: "Say: no cheating",
      line: "A man often tricked in trade was told to say: no cheating.",
      facts: ["Say it when you buy", "Protects the weak buyer"],
      source: hadith("bukhari", "2117", "Abdullah ibn Umar", "Sahih", "A man told the Prophet ﷺ that he was often cheated when buying. He told him to say when buying: no cheating.", "told him to say at the time of buying"),
      difficulty: 1,
      questions: [
        { q: "What problem did the man have?", a: "He was often cheated", wrong: ["He was too rich", "He had no shop", "He could not walk"], why: "He was always betrayed in purchasing." },
        { q: "What was he told to say when buying?", a: "No cheating", wrong: ["Give it free", "Hurry up", "Maybe later"], why: "Say at the time of buying: No cheating." },
        { q: "Islam protects people from being tricked in trade.", tf: true, why: "Sahih al-Bukhari 2117." }
      ]
    },
    {
      slug: "measure-your-food",
      title: "Measure and be blessed",
      line: "Measure your food and you will be blessed.",
      facts: ["Know what you have", "Plan and avoid waste"],
      source: hadith("bukhari", "2128", "Al-Miqdam ibn Ma'dikarib", "Sahih", "The Prophet ﷺ said: measure your food and you will be blessed in it.", "Measure your foodstuff and you will be blessed"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ tell us to measure?", a: "Our food", wrong: ["Our steps", "Our hair", "The sky"], why: "Measure your foodstuff." },
        { q: "What comes from measuring it?", a: "Blessing", wrong: ["Sadness", "Hunger", "Noise"], why: "And you will be blessed." },
        { q: "Planning and measuring well is part of the Sunnah.", tf: true, why: "Sahih al-Bukhari 2128." }
      ]
    },
    {
      slug: "ripe-fruit-only",
      title: "Sell fruit when ready",
      line: "Don't sell fruit on the tree before it is clearly ripening.",
      facts: ["Forbidden for seller and buyer", "Protects both from loss"],
      source: hadith("bukhari", "2194", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ forbade selling fruit until it is clearly good, and forbade this to both seller and buyer.", "forbade the sale of fruits till their benefit is evident"),
      difficulty: 2,
      questions: [
        { q: "When may fruit on trees be sold?", a: "When clearly good", wrong: ["Before flowers", "Any time", "Before planting"], why: "Till their benefit is evident." },
        { q: "Who was forbidden this early sale?", a: "Both seller and buyer", wrong: ["Only the seller", "Only the buyer", "No one"], why: "He forbade both the seller and the buyer." },
        { q: "This rule protects people from unfair losses.", tf: true, why: "Fruit may be ruined before it ripens. Sahih al-Bukhari 2194." }
      ]
    },
    {
      slug: "gold-for-gold",
      title: "Gold for gold, equal weight",
      line: "Gold for gold or silver for silver only in equal weight.",
      facts: ["A rule against riba", "Gold for silver as you like"],
      source: hadith("bukhari", "2175", "Abu Bakrah", "Sahih", "The Prophet ﷺ said: do not sell gold for gold except equal in weight, nor silver for silver except equal in weight; but sell gold for silver or silver for gold as you like.", "sell gold for silver or silver for gold as you like"),
      difficulty: 3,
      questions: [
        { q: "How must gold be swapped for gold?", a: "Equal in weight", wrong: ["Double the weight", "Any amount", "Never at all"], why: "Don't sell gold for gold unless equal in weight." },
        { q: "Gold for silver may be traded...?", a: "As you like", wrong: ["Never", "Only equal weight", "Only at night"], why: "Sell gold for silver or silver for gold as you like." },
        { q: "These rules guard against riba, unfair interest.", tf: true, why: "Sahih al-Bukhari 2175." }
      ]
    },
    {
      slug: "pay-the-worker",
      title: "Pay the worker",
      line: "He ﷺ paid the cupper and asked his masters to ease his tax.",
      facts: ["Paid a sa of dates", "Kind to a hard worker"],
      source: hadith("bukhari", "2102", "Anas ibn Malik", "Sahih", "Abu Taybah did cupping for the Prophet ﷺ, so he ordered that he be paid a sa of dates and asked his masters to lower the tax he owed them.", "ordered that he be paid one Sa of dates"),
      difficulty: 2,
      questions: [
        { q: "How was Abu Taybah paid?", a: "With a sa of dates", wrong: ["With nothing", "With a horse", "With a book"], why: "He ordered that he be paid one Sa of dates." },
        { q: "What else did he ﷺ do for him?", a: "Asked to ease his tax", wrong: ["Sent him away", "Took his tools", "Raised his tax"], why: "He ordered his masters to reduce his tax." },
        { q: "Workers should be paid for their work.", tf: true, why: "Sahih al-Bukhari 2102." }
      ]
    }
  ]
};

const MEDICINE: DeepUnit = {
  key: "book-medicine",
  topicId: "sahihayn",
  branchId: "hadith-book-tibb",
  branch: { title: "The Book of Medicine", description: "From the Books of Medicine: cures, duas for the sick, and trusting Allah." },
  name: "the Book of Medicine",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "a-cure-for-every-disease",
      title: "A cure for every disease",
      line: "Allah sent no disease without also sending its cure.",
      facts: ["Seek treatment", "Healing is from Allah"],
      source: hadith("bukhari", "5678", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: there is no disease that Allah has created except that He has also created its cure.", "There is no disease that Allah has created, except that He also has created its treatment"),
      difficulty: 1,
      questions: [
        { q: "What did Allah create along with every disease?", a: "Its cure", wrong: ["A worse disease", "Nothing", "A new name"], why: "He also has created its treatment." },
        { q: "Seeing a doctor goes against trusting Allah.", tf: false, why: "Allah made cures, so we seek them and trust Him." },
        { q: "Who narrated this hadith?", a: "Abu Hurairah", wrong: ["Umar", "Ali", "Bilal"], why: "Sahih al-Bukhari 5678." }
      ]
    },
    {
      slug: "honey-and-cupping",
      title: "Honey and cupping",
      line: "Healing in honey and cupping; he ﷺ disliked branding with fire.",
      facts: ["A gulp of honey", "He forbade cauterising"],
      source: hadith("bukhari", "5680", "Abdullah ibn Abbas", "Sahih", "The Prophet ﷺ said: healing is in three: a drink of honey, cupping, and branding with fire, but I forbid my ummah from branding.", "Healing is in three things: A gulp of honey, cupping"),
      difficulty: 2,
      questions: [
        { q: "Which drink did he ﷺ name for healing?", a: "Honey", wrong: ["Coffee", "Juice", "Cold water only"], why: "A gulp of honey." },
        { q: "Which treatment did he ﷺ forbid his ummah?", a: "Branding with fire", wrong: ["Honey", "Cupping", "Resting"], why: "I forbid my followers to use branding with fire." },
        { q: "How many healing things are named?", a: "Three", wrong: ["One", "Seven", "Ten"], why: "Healing is in three things." }
      ]
    },
    {
      slug: "black-seed",
      title: "The black seed",
      line: "Black seed has healing for every disease except death.",
      facts: ["Called habbat as-sawda", "Death has no cure"],
      source: hadith("bukhari", "5688", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: there is healing in the black seed for every disease except death.", "There is healing in black cumin for all diseases except death"),
      difficulty: 1,
      questions: [
        { q: "What seed did he ﷺ praise for healing?", a: "The black seed", wrong: ["The apple seed", "The sunflower seed", "The rice seed"], why: "There is healing in black cumin." },
        { q: "What can the black seed not cure?", a: "Death", wrong: ["A cold", "A cough", "A headache"], why: "For all diseases except death." },
        { q: "The black seed is mentioned in Sahih al-Bukhari.", tf: true, why: "Sahih al-Bukhari 5688." }
      ]
    },
    {
      slug: "talbina",
      title: "Talbina for the sick",
      line: "Aishah advised talbina for the sick: not tasty, but good.",
      facts: ["A soft barley food", "Good even if disliked"],
      source: hadith("bukhari", "5690", "Aishah", "Sahih", "Aishah used to recommend talbina and said: the sick person dislikes it, yet it is good for him.", "It is disliked (by the patient) although it is beneficial"),
      difficulty: 2,
      questions: [
        { q: "What food did Aishah recommend for the sick?", a: "Talbina", wrong: ["Sweets", "Fried meat", "Ice cream"], why: "Aishah used to recommend at-Talbina." },
        { q: "What did she say about its taste?", a: "Disliked, but beneficial", wrong: ["Very tasty", "Harmful", "Too sweet"], why: "It is disliked although it is beneficial." },
        { q: "Some good medicine does not taste nice.", tf: true, why: "Sahih al-Bukhari 5690." }
      ]
    },
    {
      slug: "truffles",
      title: "Truffles like manna",
      line: "Truffles are like manna, and their water heals the eyes.",
      facts: ["They grow without planting", "Good for the eyes"],
      source: hadith("bukhari", "5708", "Sa'id ibn Zayd", "Sahih", "The Prophet ﷺ said: truffles are like manna, and their water is healing for the eyes.", "Truffles are like Manna"),
      difficulty: 2,
      questions: [
        { q: "Truffles are like...?", a: "Manna", wrong: ["Gold", "Stones", "Leaves"], why: "Truffles are like Manna." },
        { q: "What is their water good for?", a: "The eyes", wrong: ["The teeth", "The feet", "The hair"], why: "Their water heals eye diseases." },
        { q: "Why are they like manna?", a: "They grow without planting", wrong: ["They are sweet", "They fly", "They are gold"], why: "They grow naturally without man's care." }
      ]
    },
    {
      slug: "cool-the-fever",
      title: "Cool a fever with water",
      line: "Cool a fever down with water.",
      facts: ["Told by Aishah", "Water helps the body"],
      source: hadith("bukhari", "5725", "Aishah", "Sahih", "The Prophet ﷺ said: fever is from the heat of Jahannam, so cool it down with water.", "so abate fever with water"),
      difficulty: 1,
      questions: [
        { q: "What should we cool a fever with?", a: "Water", wrong: ["Fire", "Sand", "Oil"], why: "Abate fever with water." },
        { q: "Who narrated this hadith?", a: "Aishah", wrong: ["Abu Bakr", "Anas", "Umar"], why: "Sahih al-Bukhari 5725." },
        { q: "Using water to cool a fever follows his advice ﷺ.", tf: true, why: "So abate fever with water." }
      ]
    },
    {
      slug: "ruqyah-for-the-eye",
      title: "Ruqyah for the evil eye",
      line: "A girl had the evil eye; he ﷺ said: treat her with ruqyah.",
      facts: ["In Umm Salamah's house", "Ruqyah is reciting for healing"],
      source: hadith("bukhari", "5739", "Umm Salamah", "Sahih", "The Prophet ﷺ saw a girl in Umm Salamah's house with a dark mark on her face. He said: she is affected by the evil eye, so treat her with ruqyah.", "so treat her with a Ruqya"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ say had affected the girl?", a: "The evil eye", wrong: ["Hunger", "The sun", "A fall"], why: "She is under the effect of an evil eye." },
        { q: "What treatment did he ﷺ order?", a: "Ruqyah", wrong: ["Ignoring it", "Cutting her hair", "Moving house"], why: "So treat her with a Ruqya." },
        { q: "Whose house was this in?", a: "Umm Salamah's", wrong: ["Abu Jahl's", "Bilal's", "A stranger's"], why: "Sahih al-Bukhari 5739." }
      ]
    },
    {
      slug: "good-word-omen",
      title: "No bad omens",
      line: "No bad omens in Islam; he ﷺ liked hearing a good word.",
      facts: ["No tiyarah", "Fal: a hopeful good word"],
      source: hadith("bukhari", "5754", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: there is no bad omen, and the best is fal. They asked what fal is. He said: a good word that one of you hears.", "A good word that one of you hears"),
      difficulty: 2,
      questions: [
        { q: "A black cat crosses your path. What fits Islam?", a: "Trust Allah, no bad omen", wrong: ["Go back home", "Cancel your plans", "Be afraid all day"], why: "There is no Tiyara." },
        { q: "What is fal?", a: "A good word you hear", wrong: ["A lucky charm", "A magic spell", "A star sign"], why: "A good word that one of you hears." },
        { q: "Hoping for good is better than fearing bad omens.", tf: true, why: "Sahih al-Bukhari 5754." }
      ]
    },
    {
      slug: "ajwa-dates",
      title: "Ajwa dates in the morning",
      line: "Ajwa dates each morning protect from poison and magic that day.",
      facts: ["Told by Sa'd", "Seven dates in another report"],
      source: hadith("bukhari", "5768", "Sa'd ibn Abi Waqqas", "Sahih", "The Prophet ﷺ said: whoever eats some Ajwa dates every morning will not be harmed by poison or magic that day until night.", "he will not be affected by poison or magic on that day till night"),
      difficulty: 2,
      questions: [
        { q: "Which dates are named?", a: "Ajwa dates", wrong: ["Any sweets", "Figs", "Grapes"], why: "If somebody takes some Ajwa dates every morning." },
        { q: "When should they be eaten?", a: "In the morning", wrong: ["At midnight", "Only in Ramadan", "Once a year"], why: "Every morning." },
        { q: "What do they protect from that day?", a: "Poison and magic", wrong: ["Rain", "Tiredness", "Cold"], why: "He will not be affected by poison or magic." }
      ]
    },
    {
      slug: "keep-sick-apart",
      title: "Keep the sick apart",
      line: "Don't mix sick animals with healthy ones: take care.",
      facts: ["A step to stop spreading", "Care plus trust in Allah"],
      source: hadith("bukhari", "5771", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: sick animals should not be brought among healthy ones.", "should not be mixed up with healthy cattle"),
      difficulty: 2,
      questions: [
        { q: "What should not be mixed with healthy animals?", a: "Sick animals", wrong: ["Young animals", "Fat animals", "Clean animals"], why: "Should not be mixed up with healthy cattle." },
        { q: "Taking care to stop sickness spreading is good.", tf: true, why: "As a precaution. Sahih al-Bukhari 5771." },
        { q: "Your class has a stomach bug going round. What fits?", a: "Wash hands and take care", wrong: ["Share every cup", "Ignore it", "Hug the sick"], why: "Take precautions and trust Allah." }
      ]
    },
    {
      slug: "hand-on-the-pain",
      title: "Hand on the pain",
      line: "Hand on the pain: Bismillah thrice, then refuge seven times.",
      facts: ["Bismillah three times", "A'udhu billahi wa qudratihi"],
      source: hadith("muslim", "2202", "Uthman ibn Abi al-As", "Sahih", "Uthman complained of pain, and the Prophet ﷺ said: put your hand where it hurts, say Bismillah three times, and seven times: I seek refuge in Allah and His power from the evil of what I feel and fear.", "Place your hand at the place where you feel pain"),
      difficulty: 2,
      questions: [
        { q: "Where do you put your hand?", a: "Where it hurts", wrong: ["On your head always", "In your pocket", "On the floor"], why: "Place your hand at the place where you feel pain." },
        { q: "How many times do you say Bismillah?", a: "Three", wrong: ["One", "Ten", "Seven"], why: "Say Bismillah three times." },
        { q: "How many times is the refuge said?", a: "Seven", wrong: ["Two", "Three", "Forty"], why: "And seven times A'udhu billahi wa qudratihi." }
      ]
    },
    {
      slug: "jibrils-ruqyah",
      title: "Jibril's ruqyah",
      line: "When he ﷺ was ill, Jibril recited ruqyah over him.",
      facts: ["In the name of Allah", "From every harm and envious eye"],
      source: hadith("muslim", "2186", "Abu Sa'id al-Khudri", "Sahih", "Jibril came to the Prophet ﷺ when he was ill and said: in the name of Allah I recite over you, from everything that harms you and the eye of the envious; may Allah heal you.", "safeguard you from every evil that may harm you"),
      difficulty: 2,
      questions: [
        { q: "Who recited ruqyah over him ﷺ?", a: "Jibril", wrong: ["Abu Bakr", "Umar", "A doctor"], why: "Gabriel came to Allah's Messenger ﷺ." },
        { q: "With whose name did the ruqyah begin?", a: "Allah's", wrong: ["Jibril's", "A king's", "No name"], why: "In the name of Allah." },
        { q: "The ruqyah asked Allah to heal him.", tf: true, why: "Allah would cure you. Sahih Muslim 2186." }
      ]
    },
    {
      slug: "ruqyah-without-shirk",
      title: "Ruqyah without shirk",
      line: "Ruqyah is fine as long as it has no shirk.",
      facts: ["Show it to someone who knows", "Only call on Allah"],
      source: hadith("muslim", "2200", "Awf ibn Malik", "Sahih", "Companions asked about the ruqyahs they used before Islam. He ﷺ said: show me your ruqyahs; there is no harm in ruqyah that has no shirk.", "There is no harm in the incantation which does not smack of polytheism"),
      difficulty: 2,
      questions: [
        { q: "Which ruqyah is allowed?", a: "One with no shirk", wrong: ["Any words at all", "Words to idols", "Secret spells"], why: "No harm in the incantation which does not smack of polytheism." },
        { q: "What did he ﷺ ask them to do first?", a: "Show him their ruqyah", wrong: ["Burn it", "Hide it", "Sell it"], why: "Let me know your incantation." },
        { q: "Ruqyah may call on others besides Allah.", tf: false, why: "Shirk makes it forbidden. Sahih Muslim 2200." }
      ]
    }
  ]
};

const COMPANIONS: DeepUnit = {
  key: "book-companions",
  topicId: "sahihayn",
  branchId: "hadith-book-sahabah",
  branch: { title: "The Book of the Companions", description: "From the Books of the Virtues of the Companions: the people the Prophet ﷺ loved." },
  name: "the Book of the Companions",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "abu-bakr-umar-uthman",
      title: "Abu Bakr, then Umar, then Uthman",
      line: "The companions counted Abu Bakr best, then Umar, then Uthman.",
      facts: ["Said in his ﷺ lifetime", "Told by Ibn Umar"],
      source: hadith("bukhari", "3655", "Abdullah ibn Umar", "Sahih", "Ibn Umar said: in the lifetime of the Prophet ﷺ we used to rank Abu Bakr as the best, then Umar, then Uthman.", "We used to regard Abu Bakr as the best"),
      difficulty: 1,
      questions: [
        { q: "Whom did the companions count as the best?", a: "Abu Bakr", wrong: ["Khalid", "Bilal", "Salman"], why: "We used to regard Abu Bakr as the best." },
        { q: "Who came after Umar?", a: "Uthman", wrong: ["Mu'awiyah", "Zayd", "Hamzah"], why: "Then Umar, and then Uthman." },
        { q: "Who narrated this?", a: "Ibn Umar", wrong: ["Abu Hurairah", "Anas", "Aishah"], why: "Sahih al-Bukhari 3655." }
      ]
    },
    {
      slug: "fatimah-part-of-me",
      title: "Fatimah is part of me",
      line: "Fatimah is part of me; whoever angers her angers me.",
      facts: ["His ﷺ beloved daughter", "Told by Al-Miswar"],
      source: hadith("bukhari", "3714", "Al-Miswar ibn Makhramah", "Sahih", "The Prophet ﷺ said: Fatimah is a part of me, so whoever angers her angers me.", "Fatima is a part of me"),
      difficulty: 1,
      questions: [
        { q: "Whom did he ﷺ call a part of himself?", a: "Fatimah", wrong: ["Aishah", "Khadijah", "Zaynab"], why: "Fatima is a part of me." },
        { q: "Angering Fatimah meant...?", a: "Angering him ﷺ", wrong: ["Nothing", "Pleasing him", "A small joke"], why: "He who makes her angry, makes me angry." },
        { q: "Fatimah was the daughter of the Prophet ﷺ.", tf: true, why: "Sahih al-Bukhari 3714." }
      ]
    },
    {
      slug: "usamah-and-hasan",
      title: "O Allah, love them",
      line: "He ﷺ held Usamah and Al-Hasan and prayed: Allah, love them.",
      facts: ["Both in his lap", "As I love them"],
      source: hadith("bukhari", "3735", "Usamah ibn Zayd", "Sahih", "The Prophet ﷺ would take Usamah and Al-Hasan on his lap and say: O Allah, love them, for I love them.", "O Allah! Love them, as I love them"),
      difficulty: 1,
      questions: [
        { q: "Which two children did he ﷺ hold?", a: "Usamah and Al-Hasan", wrong: ["Umar and Ali", "Bilal and Anas", "Zayd and Hamzah"], why: "He used to take Usama and Al-Hasan in his lap." },
        { q: "What did he ﷺ ask Allah for them?", a: "To love them", wrong: ["To make them rich", "To make them kings", "Nothing"], why: "O Allah! Love them, as I love them." },
        { q: "The Prophet ﷺ showed his love to children openly.", tf: true, why: "Sahih al-Bukhari 3735." }
      ]
    },
    {
      slug: "abu-bakr-carries-hasan",
      title: "Abu Bakr carries Al-Hasan",
      line: "Abu Bakr carried Al-Hasan and said he looked like the Prophet ﷺ.",
      facts: ["Ali laughed", "Love for his ﷺ family"],
      source: hadith("bukhari", "3750", "Uqbah ibn al-Harith", "Sahih", "I saw Abu Bakr carrying Al-Hasan and saying: you look like the Prophet ﷺ, not like Ali, while Ali laughed.", "was laughing at this"),
      difficulty: 1,
      questions: [
        { q: "Whom did Abu Bakr carry?", a: "Al-Hasan", wrong: ["Usamah", "Anas", "Bilal"], why: "I saw Abu Bakr carrying Al-Hasan." },
        { q: "Whom did he say Al-Hasan looked like?", a: "The Prophet ﷺ", wrong: ["Umar", "Abu Talib", "Hamzah"], why: "You resemble the Prophet ﷺ and not Ali." },
        { q: "How did Ali react?", a: "He laughed", wrong: ["He was upset", "He left", "He cried"], why: "While Ali was laughing at this." }
      ]
    },
    {
      slug: "bilal-freed-for-allah",
      title: "Freed for Allah",
      line: "Bilal asked Abu Bakr to free him for the work of Allah.",
      facts: ["Abu Bakr bought and freed him", "Bilal's heart was for Allah"],
      source: hadith("bukhari", "3755", "Qays ibn Abi Hazim", "Sahih", "Bilal said to Abu Bakr: if you bought me for yourself, keep me; but if you bought me for Allah, then leave me to work for Allah.", "if you have bought me for Allah"),
      difficulty: 2,
      questions: [
        { q: "Who had bought Bilal's freedom?", a: "Abu Bakr", wrong: ["Umar", "Abu Jahl", "Uthman"], why: "Bilal said to Abu Bakr: if you have bought me." },
        { q: "What did Bilal want if freed for Allah?", a: "To work for Allah", wrong: ["To get rich", "To travel alone", "To rest forever"], why: "Leave me for Allah's work." },
        { q: "Abu Bakr spent his wealth to free believers.", tf: true, why: "Sahih al-Bukhari 3755." }
      ]
    },
    {
      slug: "abdullah-is-pious",
      title: "Abdullah is a righteous man",
      line: "He ﷺ told Hafsah: your brother Abdullah is a righteous man.",
      facts: ["Abdullah ibn Umar", "Told to his sister Hafsah"],
      source: hadith("bukhari", "3740", "Hafsah", "Sahih", "The Prophet ﷺ said to Hafsah: Abdullah is a righteous man.", "is a pious man"),
      difficulty: 1,
      questions: [
        { q: "Whom did he ﷺ call a righteous man?", a: "Abdullah ibn Umar", wrong: ["Abu Lahab", "Abu Sufyan", "Ka'b"], why: "Abdullah is a pious man." },
        { q: "To whom did he ﷺ say it?", a: "His sister Hafsah", wrong: ["Aishah", "Fatimah", "Umm Sulaym"], why: "He had said to her, Hafsa." },
        { q: "Abdullah ibn Umar was the son of Umar ibn al-Khattab.", tf: true, why: "Ibn Umar narrated it from his sister Hafsa." }
      ]
    },
    {
      slug: "umm-sulaym",
      title: "Visiting Umm Sulaym",
      line: "He ﷺ visited Umm Sulaym out of care: her brother died with him.",
      facts: ["Anas's mother", "Her brother was a martyr"],
      source: hadith("muslim", "2455", "Anas ibn Malik", "Sahih", "The Prophet ﷺ visited Umm Sulaym, and when asked why he said: I feel great care for her; her brother died as a martyr with me.", "I feel great compassion for her"),
      difficulty: 2,
      questions: [
        { q: "Why did he ﷺ visit Umm Sulaym?", a: "He felt compassion for her", wrong: ["To buy dates", "To ask for help", "By accident"], why: "I feel great compassion for her." },
        { q: "Umm Sulaym was the mother of...?", a: "Anas ibn Malik", wrong: ["Umar", "Bilal", "Usamah"], why: "Anas reported it about his mother." },
        { q: "Caring for the families of martyrs is a Sunnah.", tf: true, why: "Sahih Muslim 2455." }
      ]
    },
    {
      slug: "steps-in-jannah",
      title: "Footsteps in Jannah",
      line: "In Jannah he ﷺ heard footsteps: Ghumaysa, Anas's mother.",
      facts: ["Also called Umm Sulaym", "Daughter of Milhan"],
      source: hadith("muslim", "2456", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said: I entered Paradise and heard footsteps. I asked who it was; they said: Ghumaysa bint Milhan, the mother of Anas.", "She is Ghumaisa, daughter of Milhan"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ hear in Jannah?", a: "Footsteps", wrong: ["Thunder", "A bell", "Singing birds"], why: "I heard the noise of steps." },
        { q: "Whose footsteps were they?", a: "Ghumaysa, Anas's mother", wrong: ["Khadijah", "Bilal's", "Hafsah"], why: "She is Ghumaisa, daughter of Milhan." },
        { q: "Ghumaysa and Umm Sulaym are the same woman.", tf: true, why: "Both names are for the mother of Anas." }
      ]
    },
    {
      slug: "throne-shook-for-sad",
      title: "The Throne shook for Sa'd",
      line: "The Throne of the Most Merciful shook when Sa'd ibn Mu'adh died.",
      facts: ["Chief of the Aws", "Said beside his bier"],
      source: hadith("muslim", "2466a", "Jabir ibn Abdullah", "Sahih", "With the bier of Sa'd ibn Mu'adh before them, the Prophet ﷺ said: the Throne of the Most Merciful shook at the death of Sa'd ibn Mu'adh.", "The Throne of the most Gracious shook at the death of Sa"),
      difficulty: 2,
      questions: [
        { q: "What shook at Sa'd's death?", a: "The Throne of Allah", wrong: ["A mountain", "The sea", "A palm tree"], why: "The Throne of the most Gracious shook." },
        { q: "Which companion was this?", a: "Sa'd ibn Mu'adh", wrong: ["Sa'd ibn Abi Waqqas", "Sa'id ibn Zayd", "Salman"], why: "At the death of Sa'd bin Mu'adh." },
        { q: "Sa'd ibn Mu'adh was greatly honoured by Allah.", tf: true, why: "Sahih Muslim 2466." }
      ]
    },
    {
      slug: "always-a-smile",
      title: "Always a smile",
      line: "Jarir said: he ﷺ never looked at me except with a smile.",
      facts: ["Never turned him away", "Since Jarir became Muslim"],
      source: hadith("muslim", "2475a", "Jarir ibn Abdullah", "Sahih", "Jarir said: since I became Muslim, the Prophet ﷺ never refused to see me and never looked at me except with a smile.", "never looked at me but with a smile"),
      difficulty: 1,
      questions: [
        { q: "How did he ﷺ always look at Jarir?", a: "With a smile", wrong: ["With a frown", "Without looking", "Angrily"], why: "Never looked at me but with a smile." },
        { q: "Did he ﷺ ever refuse to see Jarir?", a: "Never", wrong: ["Often", "Every Friday", "Only in Ramadan"], why: "Never refused me permission to see him." },
        { q: "Smiling at your brother is part of the Sunnah.", tf: true, why: "Sahih Muslim 2475." }
      ]
    },
    {
      slug: "the-sharing-ashariyyun",
      title: "The sharing tribe",
      line: "Short of food, the Ash'aris pooled it and shared it equally.",
      facts: ["They are from me", "And I am from them"],
      source: hadith("muslim", "2500", "Abu Musa al-Ash'ari", "Sahih", "The Prophet ﷺ said: when the Ash'aris run short of food, they gather all they have in one cloth and share it equally. They are from me and I am from them.", "They are from me and I am from them"),
      difficulty: 2,
      questions: [
        { q: "What did the Ash'aris do when food ran low?", a: "Pooled and shared equally", wrong: ["Kept it secret", "Sold it", "Ate alone"], why: "They collect whatever is with them and partake equally." },
        { q: "What did he ﷺ say about them?", a: "They are from me", wrong: ["They are strangers", "They are greedy", "Nothing"], why: "They are from me and I am from them." },
        { q: "Sharing food fairly in hard times is loved by the Prophet ﷺ.", tf: true, why: "Sahih Muslim 2500." }
      ]
    },
    {
      slug: "the-ansar",
      title: "My family, the Ansar",
      line: "Accept the good of the Ansar and forgive their slips.",
      facts: ["They will become fewer", "Be kind to them"],
      source: hadith("muslim", "2510", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said: the Ansar are my family and trusted friends. People will grow in number but they will become fewer, so accept the good from them and overlook their mistakes.", "The Ansar are my family and my trusted friends"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ call the Ansar?", a: "My family and trusted friends", wrong: ["Strangers", "Traders", "Guests"], why: "The Ansar are my family and my trusted friends." },
        { q: "What should we do with their mistakes?", a: "Overlook them", wrong: ["Spread them", "Punish them", "Laugh at them"], why: "Overlook their failings." },
        { q: "The Ansar welcomed the Prophet ﷺ in Madinah.", tf: true, why: "They are his helpers. Sahih Muslim 2510." }
      ]
    },
    {
      slug: "ghifar-and-aslam",
      title: "Ghifar and Aslam",
      line: "Allah forgave Ghifar and gave Aslam safety.",
      facts: ["Told to Abu Dharr", "Abu Dharr was from Ghifar"],
      source: hadith("muslim", "2514a", "Abu Dharr", "Sahih", "The Prophet ﷺ told Abu Dharr: go to your people and say: Allah has forgiven Ghifar and given safety to Aslam.", "Ghifar (is a tribe) to whom Allah granted pardon"),
      difficulty: 2,
      questions: [
        { q: "Which tribe did Allah forgive?", a: "Ghifar", wrong: ["Quraysh", "Thaqif", "Hawazin"], why: "Ghifar is a tribe to whom Allah granted pardon." },
        { q: "Which tribe was given safety?", a: "Aslam", wrong: ["Tamim", "Ghatafan", "Asad"], why: "Aslam is the tribe to whom Allah granted safety." },
        { q: "Who carried this good news to his people?", a: "Abu Dharr", wrong: ["Bilal", "Khalid", "Salman"], why: "Go to your people and say. Sahih Muslim 2514." }
      ]
    },
    {
      slug: "guide-the-daws",
      title: "O Allah, guide Daws",
      line: "Asked to curse Daws, he ﷺ prayed: O Allah, guide Daws.",
      facts: ["At-Tufayl's tribe", "Mercy, not curses"],
      source: hadith("muslim", "2524", "Abu Hurairah", "Sahih", "At-Tufayl said the tribe of Daws had refused and asked him to curse them. The Prophet ﷺ said: O Allah, guide Daws and bring them to me.", "Allah guide aright the tribe of Daws and direct them to me"),
      difficulty: 2,
      questions: [
        { q: "What did At-Tufayl ask for Daws?", a: "A curse on them", wrong: ["Gold", "Rain", "A wedding"], why: "Invoke curse upon them." },
        { q: "What did he ﷺ pray instead?", a: "O Allah, guide Daws", wrong: ["Destroy Daws", "Nothing", "Leave them"], why: "Allah guide aright the tribe of Daws." },
        { q: "Which famous companion came from Daws?", a: "Abu Hurairah", wrong: ["Umar", "Ali", "Bilal"], why: "Abu Hurairah, the narrator, was from Daws." }
      ]
    }
  ]
};


const PRAYER: DeepUnit = {
  key: "book-prayer",
  topicId: "sahihayn",
  branchId: "hadith-book-salah",
  branch: { title: "The Book of Prayer", description: "From the Books of Prayer: how the Prophet ﷺ prayed, step by step." },
  name: "the Book of Prayer",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "between-adhan-and-iqamah",
      title: "A prayer between the two calls",
      line: "There is a prayer between the adhan and the iqamah.",
      facts: ["He ﷺ said it three times", "For whoever wants to pray"],
      source: hadith("bukhari", "624", "Abdullah ibn Mughaffal", "Sahih", "The Prophet ﷺ said three times: there is a prayer between the two calls, for whoever wants to pray.", "There is a prayer between the two Adhans"),
      difficulty: 1,
      questions: [
        { q: "When is this extra prayer?", a: "Between adhan and iqamah", wrong: ["After sunrise", "Only at night", "After Eid"], why: "There is a prayer between the two Adhans." },
        { q: "How many times did he ﷺ say it?", a: "Three", wrong: ["One", "Seven", "Ten"], why: "He said it thrice." },
        { q: "This prayer is for whoever wants to pray it.", tf: true, why: "For the one who wants to pray. Sahih al-Bukhari 624." }
      ]
    },
    {
      slug: "do-not-rush-the-imam",
      title: "Never rise before the imam",
      line: "Do not lift your head before the imam does.",
      facts: ["Follow the imam", "A strong warning"],
      source: hadith("bukhari", "691", "Abu Hurairah", "Sahih", "The Prophet ﷺ warned the one who raises his head before the imam that his head may be made like a donkey's.", "who raises his head before the Imam"),
      difficulty: 2,
      questions: [
        { q: "In prayer, you should move...?", a: "After the imam", wrong: ["Before the imam", "Whenever you like", "Faster than him"], why: "Do not raise your head before the Imam." },
        { q: "Which animal is named in the warning?", a: "A donkey", wrong: ["A camel", "A horse", "A cat"], why: "Into that of a donkey." },
        { q: "Rushing ahead of the imam is fine.", tf: false, why: "He ﷺ warned against it. Sahih al-Bukhari 691." }
      ]
    },
    {
      slug: "shorter-for-a-crying-child",
      title: "Shorter for a crying baby",
      line: "Hearing a baby cry, he ﷺ made the prayer shorter.",
      facts: ["Mercy for the mother", "Told by Abu Qatadah"],
      source: hadith("bukhari", "707", "Abu Qatadah", "Sahih", "The Prophet ﷺ said: I start the prayer wanting to make it long, then I hear a child crying and make it short.", "on hearing the cries of a child, I cut it short"),
      difficulty: 1,
      questions: [
        { q: "What made him ﷺ shorten the prayer?", a: "A child crying", wrong: ["Rain", "Hunger", "A guest"], why: "On hearing the cries of a child, I cut it short." },
        { q: "Whom did he ﷺ not want to trouble?", a: "The mother", wrong: ["The imam", "The guard", "The traveler"], why: "I dislike to trouble the child's mother." },
        { q: "An imam should think of the people behind him.", tf: true, why: "Sahih al-Bukhari 707." }
      ]
    },
    {
      slug: "bow-and-prostrate-properly",
      title: "Bow and prostrate properly",
      line: "Do your bowing and your prostrations properly and calmly.",
      facts: ["He ﷺ saw them from behind", "Told by Anas"],
      source: hadith("bukhari", "742", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said: do the bowing and prostrations properly, for I see you from behind me.", "Perform the bowing and the prostrations properly"),
      difficulty: 1,
      questions: [
        { q: "What must be done properly?", a: "Bowing and prostrations", wrong: ["Only the adhan", "Only the dua", "Only standing"], why: "Perform the bowing and the prostrations properly." },
        { q: "He ﷺ said he could see them from...?", a: "Behind him", wrong: ["The roof", "Far away", "A window"], why: "I see you from behind me." },
        { q: "Rushing through bowing is the right way.", tf: false, why: "Do it properly. Sahih al-Bukhari 742." }
      ]
    },
    {
      slug: "looking-around-in-prayer",
      title: "Do not look around",
      line: "Looking around in prayer lets Shaytan steal from it.",
      facts: ["Aishah asked him ﷺ", "Keep your eyes still"],
      source: hadith("bukhari", "751", "Aishah", "Sahih", "Aishah asked about looking around in prayer. He ﷺ said: Shaytan steals part of the prayer that way.", "It is a way of stealing by which Satan takes away"),
      difficulty: 1,
      questions: [
        { q: "Who asked about looking around?", a: "Aishah", wrong: ["Umar", "Anas", "Bilal"], why: "Aisha asked Allah's Messenger." },
        { q: "Looking around in prayer is like...?", a: "Shaytan stealing", wrong: ["Extra reward", "A sunnah", "Resting"], why: "A way of stealing by which Satan takes away." },
        { q: "We should keep our focus in prayer.", tf: true, why: "Sahih al-Bukhari 751." }
      ]
    },
    {
      slug: "the-marked-cloth",
      title: "The cloth that distracted",
      line: "A patterned cloth distracted him ﷺ, so he gave it back.",
      facts: ["He asked for a plain one", "Told by Aishah"],
      source: hadith("bukhari", "752", "Aishah", "Sahih", "The Prophet ﷺ prayed in a marked cloth and said: its marks distracted me. Take it back and bring me a plain one.", "The marks on it diverted my attention"),
      difficulty: 2,
      questions: [
        { q: "What distracted him ﷺ?", a: "Marks on a cloth", wrong: ["A noise", "A bird", "The sun"], why: "The marks on it diverted my attention." },
        { q: "What did he ﷺ ask for instead?", a: "A plain cloth", wrong: ["A gold cloth", "A new rug", "Nothing"], why: "Bring an Inbijaniya (from him), a plain sheet." },
        { q: "Pray where little distracts you.", tf: true, why: "Sahih al-Bukhari 752." }
      ]
    },
    {
      slug: "balanced-prayer",
      title: "Every part in balance",
      line: "His ﷺ bowing, prostrations and pauses were nearly equal.",
      facts: ["No part rushed", "Told by Al-Bara"],
      source: hadith("bukhari", "801", "Al-Bara ibn Azib", "Sahih", "The bowing, the prostrations, the standing after bowing and the sitting between prostrations of the Prophet ﷺ were about equal.", "used to be equal in duration"),
      difficulty: 2,
      questions: [
        { q: "How long were the parts of his ﷺ prayer?", a: "About equal", wrong: ["Very rushed", "Only bowing long", "Random"], why: "Used to be equal in duration." },
        { q: "Who narrated this?", a: "Al-Bara", wrong: ["Abu Bakr", "Hudhayfah", "Samurah"], why: "Sahih al-Bukhari 801." },
        { q: "The pause between prostrations should be skipped.", tf: false, why: "He ﷺ paused there too. Sahih al-Bukhari 801." }
      ]
    },
    {
      slug: "seven-bones",
      title: "Prostrate on seven bones",
      line: "We prostrate on seven bones and leave our clothes and hair.",
      facts: ["Forehead, hands, knees, feet", "Told by Ibn Abbas"],
      source: hadith("bukhari", "810", "Abdullah ibn Abbas", "Sahih", "The Prophet ﷺ said: we were ordered to prostrate on seven bones and not to tuck up our clothes or hair.", "We have been ordered to prostrates on seven bones"),
      difficulty: 1,
      questions: [
        { q: "On how many bones do we prostrate?", a: "Seven", wrong: ["Two", "Four", "Ten"], why: "Ordered to prostrate on seven bones." },
        { q: "What should we not tuck up?", a: "Clothes or hair", wrong: ["Our shoes", "Our prayer rug", "Our sleeves only"], why: "Not to tuck up the clothes or hair." },
        { q: "Who narrated this?", a: "Ibn Abbas", wrong: ["Anas", "Aishah", "Abu Dharr"], why: "Sahih al-Bukhari 810." }
      ]
    },
    {
      slug: "forearms-off-the-ground",
      title: "Lift your forearms",
      line: "In sujud, keep your forearms off the ground.",
      facts: ["Be straight in sujud", "Told by Anas"],
      source: hadith("bukhari", "822", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said: be straight in prostration, and do not lay your forearms on the ground like a dog.", "Be straight in the prostrations"),
      difficulty: 1,
      questions: [
        { q: "In sujud, your forearms should be...?", a: "Off the ground", wrong: ["Flat on the ground", "Behind your back", "On your knees"], why: "None of you should put his forearms on the ground." },
        { q: "Laying the forearms flat is compared to...?", a: "A dog", wrong: ["A lion", "A bird", "A camel"], why: "Like a dog." },
        { q: "We should be straight in prostration.", tf: true, why: "Sahih al-Bukhari 822." }
      ]
    },
    {
      slug: "mud-on-his-forehead",
      title: "Mud on his forehead",
      line: "He ﷺ prostrated in mud and water, and it marked his forehead.",
      facts: ["He ﷺ did not avoid it", "Told by Abu Said"],
      source: hadith("bukhari", "836", "Abu Said al-Khudri", "Sahih", "Abu Said said: I saw the Prophet ﷺ prostrate in mud and water, and I saw the mud on his forehead.", "saw the mark of mud on his forehead"),
      difficulty: 1,
      questions: [
        { q: "What was on his ﷺ forehead?", a: "Mud", wrong: ["Ink", "Sand only", "Paint"], why: "I saw the mark of mud on his forehead." },
        { q: "He ﷺ prostrated in...?", a: "Mud and water", wrong: ["Snow", "A palace", "Grass"], why: "Prostrating in mud and water." },
        { q: "He ﷺ skipped sujud because of the mud.", tf: false, why: "He prostrated in it. Sahih al-Bukhari 836." }
      ]
    },
    {
      slug: "facing-the-people",
      title: "Turning to the people",
      line: "After the prayer, he ﷺ turned to face the people.",
      facts: ["The imam turns around", "Told by Samurah"],
      source: hadith("bukhari", "845", "Samurah ibn Jundub", "Sahih", "Samurah said: when the Prophet ﷺ finished the prayer, he would turn to face us.", "used to face us on completion of the prayer"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ do after leading prayer?", a: "Faced the people", wrong: ["Left at once", "Slept", "Faced the wall"], why: "He used to face us on completion of the prayer." },
        { q: "Who narrated this?", a: "Samurah", wrong: ["Umar", "Bilal", "Abu Musa"], why: "Sahih al-Bukhari 845." },
        { q: "He ﷺ turned to the people after he finished.", tf: true, why: "Sahih al-Bukhari 845." }
      ]
    },
    {
      slug: "clean-mouth-at-night",
      title: "A clean mouth for night prayer",
      line: "Rising for night prayer, he ﷺ first cleaned his mouth.",
      facts: ["Before standing to pray", "Told by Hudhayfah"],
      source: hadith("bukhari", "889", "Hudhayfah", "Sahih", "Hudhayfah said: when the Prophet ﷺ got up at night to pray, he would clean his mouth.", "he used to clean his mouth"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ do on waking at night?", a: "Cleaned his mouth", wrong: ["Ate food", "Went back to sleep", "Went to the market"], why: "He used to clean his mouth." },
        { q: "Who narrated this?", a: "Hudhayfah", wrong: ["Anas", "Abu Hurairah", "Aishah"], why: "Sahih al-Bukhari 889." },
        { q: "Cleanliness is part of getting ready to pray.", tf: true, why: "Sahih al-Bukhari 889." }
      ]
    },
    {
      slug: "a-bath-every-week",
      title: "A bath every seven days",
      line: "Allah has a right on every Muslim: a bath every seven days.",
      facts: ["At least once a week", "Told by Abu Hurairah"],
      source: hadith("bukhari", "898", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: it is Allah's right on every Muslim to bathe at least once in seven days.", "take a bath (at least) once in seven days"),
      difficulty: 1,
      questions: [
        { q: "At least how often should a Muslim bathe?", a: "Once in seven days", wrong: ["Once a month", "Once a year", "Never"], why: "Once in seven days." },
        { q: "Whose right is this bath?", a: "Allah's right", wrong: ["The king's", "No one's", "A neighbor's"], why: "It is Allah's right on every Muslim." },
        { q: "Islam cares about keeping clean.", tf: true, why: "Sahih al-Bukhari 898." }
      ]
    }
  ]
};

const FASTING: DeepUnit = {
  key: "book-fasting",
  topicId: "sahihayn",
  branchId: "hadith-book-sawm",
  branch: { title: "The Book of Fasting", description: "From the Books of Fasting: the moon, suhur, Ashura and the fasts of the Prophet ﷺ." },
  name: "the Book of Fasting",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "fast-when-you-see-the-moon",
      title: "Fast when you see the moon",
      line: "Fast on seeing the new moon, and stop on seeing the next.",
      facts: ["Cloudy sky: Sha'ban is 30 days", "Told by Abu Hurairah"],
      source: hadith("bukhari", "1909", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: start fasting when you see the crescent, stop when you see it, and if it is cloudy, complete thirty days of Sha'ban.", "Start fasting on seeing the crescent"),
      difficulty: 1,
      questions: [
        { q: "What starts the Ramadan fast?", a: "Seeing the crescent", wrong: ["A full moon", "The first rain", "Sunrise only"], why: "Start fasting on seeing the crescent." },
        { q: "If the sky is cloudy, Sha'ban is counted as...?", a: "Thirty days", wrong: ["Ten days", "Twenty days", "Forty days"], why: "Complete thirty days of Sha'ban." },
        { q: "Seeing the crescent also ends Ramadan.", tf: true, why: "Give up fasting on seeing the crescent. Sahih al-Bukhari 1909." }
      ]
    },
    {
      slug: "twenty-nine-or-thirty",
      title: "29 or 30 days",
      line: "A month is sometimes 29 days and sometimes 30.",
      facts: ["He ﷺ showed it with his fingers", "Told by Ibn Umar"],
      source: hadith("bukhari", "1913", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ said: the month is like this and this, sometimes 29 days and sometimes 30.", "sometimes of 29 days and sometimes of thirty days"),
      difficulty: 1,
      questions: [
        { q: "How long can a lunar month be?", a: "29 or 30 days", wrong: ["Always 31 days", "Always 28 days", "40 days"], why: "Sometimes of 29 days and sometimes of thirty days." },
        { q: "Who narrated this?", a: "Ibn Umar", wrong: ["Anas", "Jabir", "Abu Musa"], why: "Sahih al-Bukhari 1913." },
        { q: "Ramadan always has exactly 30 days.", tf: false, why: "It can be 29 or 30. Sahih al-Bukhari 1913." }
      ]
    },
    {
      slug: "no-fast-just-before-ramadan",
      title: "Not a day or two before",
      line: "Do not fast just before Ramadan, unless it is your habit.",
      facts: ["A habit fast is allowed", "Told by Abu Hurairah"],
      source: hadith("bukhari", "1914", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: none of you should fast a day or two before Ramadan, unless it is a fast he usually keeps.", "None of you should fast a day or two before the month of Ramadan"),
      difficulty: 2,
      questions: [
        { q: "What should we not do just before Ramadan?", a: "Fast a day or two", wrong: ["Pray at night", "Give charity", "Read Quran"], why: "None of you should fast a day or two before Ramadan." },
        { q: "Who may still fast that day?", a: "One with that habit", wrong: ["Nobody at all", "Only travelers", "Only children"], why: "Unless he has the habit of fasting." },
        { q: "Someone who always fasts Mondays may fast that Monday.", tf: true, why: "If it is his habit, he can fast. Sahih al-Bukhari 1914." }
      ]
    },
    {
      slug: "eat-till-the-second-adhan",
      title: "Eat until the dawn adhan",
      line: "Bilal called at night; eat until Ibn Umm Maktum calls at dawn.",
      facts: ["Two callers in Madinah", "Told by Aishah"],
      source: hadith("bukhari", "1918", "Aishah", "Sahih", "Bilal gave the adhan at night, so the Prophet ﷺ said: eat and drink until Ibn Umm Maktum calls, for he calls at dawn.", "Carry on taking your meals (eat and drink) till Ibn Um Maktum pronounces the Adhan"),
      difficulty: 2,
      questions: [
        { q: "Whose adhan meant it was dawn?", a: "Ibn Umm Maktum", wrong: ["Bilal", "Abu Bakr", "Umar"], why: "He does not pronounce it till it is dawn." },
        { q: "When did Bilal give his adhan?", a: "At night", wrong: ["At noon", "At sunset", "Never"], why: "Bilal used to pronounce the Adhan at night." },
        { q: "Suhur may be eaten until dawn comes.", tf: true, why: "Carry on eating till dawn. Sahih al-Bukhari 1918." }
      ]
    },
    {
      slug: "suhur-then-fajr",
      title: "Suhur, then hurry to Fajr",
      line: "Sahl ate suhur with his family, then hurried to pray Fajr.",
      facts: ["Suhur close to Fajr", "Told by Sahl ibn Sad"],
      source: hadith("bukhari", "1920", "Sahl ibn Sad", "Sahih", "Sahl said: I used to eat suhur with my family, then hurry to pray Fajr with the Prophet ﷺ.", "I used to take my Suhur meals with my family"),
      difficulty: 1,
      questions: [
        { q: "With whom did Sahl eat suhur?", a: "His family", wrong: ["Alone", "Strangers", "The army"], why: "I used to take my Suhur meals with my family." },
        { q: "What did he hurry to after suhur?", a: "The Fajr prayer", wrong: ["Sleep", "The market", "Breakfast"], why: "Then hurry up for the Fajr prayer." },
        { q: "Suhur was eaten close to Fajr time.", tf: true, why: "He hurried from suhur to Fajr. Sahih al-Bukhari 1920." }
      ]
    },
    {
      slug: "no-blame-on-travelers",
      title: "No blame on the journey",
      line: "On journeys, no one blamed another for fasting or not.",
      facts: ["Both were with him ﷺ", "Told by Anas"],
      source: hadith("bukhari", "1947", "Anas ibn Malik", "Sahih", "Anas said: we traveled with the Prophet ﷺ, and those fasting did not blame those not fasting, nor the other way round.", "neither did the fasting persons criticize those who were not fasting"),
      difficulty: 1,
      questions: [
        { q: "On journeys, did they blame each other about fasting?", a: "No, never", wrong: ["Yes, always", "Only the young", "Only at night"], why: "Neither criticized the other." },
        { q: "Who narrated this?", a: "Anas", wrong: ["Umar", "Hudhayfah", "Salman"], why: "Sahih al-Bukhari 1947." },
        { q: "A traveler may choose to fast or not, and is not blamed.", tf: true, why: "Sahih al-Bukhari 1947." }
      ]
    },
    {
      slug: "no-nonstop-fasting",
      title: "No fasting day and night",
      line: "He ﷺ forbade joining fasts with no food between them.",
      facts: ["Called al-wisal", "Allah fed him ﷺ"],
      source: hadith("bukhari", "1962", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ forbade al-wisal. They said: but you do it. He said: I am not like you; Allah gives me food and drink.", "I am not like you, for I am given food and drink by Allah"),
      difficulty: 2,
      questions: [
        { q: "What is al-wisal?", a: "Fasting nonstop with no iftar", wrong: ["A night prayer", "A kind of charity", "A short fast"], why: "He ﷺ forbade Al-Wisal." },
        { q: "Why could he ﷺ do it?", a: "Allah fed him", wrong: ["He was a king", "He was young", "He ate in secret"], why: "I am given food and drink by Allah." },
        { q: "We are told to join fasts with no food between.", tf: false, why: "He forbade it. Sahih al-Bukhari 1962." }
      ]
    },
    {
      slug: "three-things-advice",
      title: "Three things to keep",
      line: "Fast three days a month, pray Duha, and pray witr before sleep.",
      facts: ["Advice to Abu Hurairah", "Small, steady deeds"],
      source: hadith("bukhari", "1981", "Abu Hurairah", "Sahih", "Abu Hurairah said: my friend ﷺ advised me to fast three days each month, pray two rakahs of Duha, and pray witr before sleeping.", "to fast three days a month"),
      difficulty: 1,
      questions: [
        { q: "How many days a month did he ﷺ advise fasting?", a: "Three", wrong: ["One", "Ten", "Fifteen"], why: "To fast three days a month." },
        { q: "When should witr be prayed, in this advice?", a: "Before sleeping", wrong: ["At noon", "After Asr", "At sunrise"], why: "To pray witr before sleeping." },
        { q: "The advice also had two rakahs of Duha.", tf: true, why: "Two rakat of Duha prayer. Sahih al-Bukhari 1981." }
      ]
    },
    {
      slug: "not-friday-alone",
      title: "Not Friday on its own",
      line: "He ﷺ forbade fasting on a Friday picked out by itself.",
      facts: ["Jabir was asked", "Join it with another day"],
      source: hadith("bukhari", "1984", "Jabir ibn Abdullah", "Sahih", "Jabir was asked: did the Prophet ﷺ forbid fasting on Fridays? He said yes, meaning fasting that day alone.", "Did the Prophet (ﷺ) forbid fasting on Fridays"),
      difficulty: 2,
      questions: [
        { q: "Which day should not be fasted alone?", a: "Friday", wrong: ["Monday", "Thursday", "Saturday"], why: "Did the Prophet ﷺ forbid fasting on Fridays? Yes." },
        { q: "Who answered the question?", a: "Jabir", wrong: ["Aishah", "Ibn Abbas", "Anas"], why: "Sahih al-Bukhari 1984." },
        { q: "The warning is about fasting Friday on its own.", tf: true, why: "If he intends to fast only that day. Sahih al-Bukhari 1984." }
      ]
    },
    {
      slug: "milk-at-arafah",
      title: "Milk at Arafah",
      line: "At Arafah, he ﷺ drank milk from Maymunah for all to see.",
      facts: ["He ﷺ was on Hajj", "People saw he was not fasting"],
      source: hadith("bukhari", "1989", "Maymunah", "Sahih", "People were unsure if the Prophet ﷺ was fasting at Arafah, so Maymunah sent him milk and he drank it while people watched.", "he drank it and the people were looking at him"),
      difficulty: 2,
      questions: [
        { q: "What did Maymunah send him ﷺ?", a: "Milk", wrong: ["Water", "Dates", "Honey"], why: "I sent milk while he was standing at Arafat." },
        { q: "Why did people wonder?", a: "If he was fasting", wrong: ["If he was ill", "If he would leave", "If it would rain"], why: "The people doubted whether he was fasting." },
        { q: "He ﷺ drank it while people watched.", tf: true, why: "The people were looking at him. Sahih al-Bukhari 1989." }
      ]
    },
    {
      slug: "ashura-became-optional",
      title: "Ashura became a choice",
      line: "Once Ramadan was made a duty, the Ashura fast became optional.",
      facts: ["The 10th of Muharram", "Told by Aishah"],
      source: hadith("bukhari", "2001", "Aishah", "Sahih", "The Prophet ﷺ ordered fasting on Ashura, and when Ramadan was made a duty, fasting Ashura became a free choice.", "it became optional for one to fast on that day"),
      difficulty: 1,
      questions: [
        { q: "After Ramadan was made a duty, Ashura became...?", a: "Optional", wrong: ["Forbidden", "A duty", "Forgotten"], why: "It became optional to fast on that day." },
        { q: "Which day is Ashura?", a: "10th of Muharram", wrong: ["1st of Ramadan", "9th of Dhul-Hijjah", "15th of Sha'ban"], why: "The tenth of Muharram." },
        { q: "Ashura was fasted before Ramadan was a duty.", tf: true, why: "He ordered fasting it first. Sahih al-Bukhari 2001." }
      ]
    },
    {
      slug: "ashura-and-ramadan",
      title: "The fasts he ﷺ loved most",
      line: "No fast was sought more by him ﷺ than Ashura and Ramadan.",
      facts: ["Told by Ibn Abbas", "A day and a month"],
      source: hadith("bukhari", "2006", "Abdullah ibn Abbas", "Sahih", "Ibn Abbas said: I never saw the Prophet ﷺ seek a fast more than Ashura and the month of Ramadan.", "this month, meaning the month of Ramadan"),
      difficulty: 1,
      questions: [
        { q: "Which day did he ﷺ seek most to fast?", a: "Ashura", wrong: ["Friday", "Eid day", "Arafah only"], why: "Except this day, the day of Ashura." },
        { q: "Which month, too?", a: "Ramadan", wrong: ["Rajab", "Shawwal", "Safar"], why: "And this month, meaning Ramadan." },
        { q: "Who narrated this?", a: "Ibn Abbas", wrong: ["Abu Bakr", "Ibn Masud", "Bilal"], why: "Sahih al-Bukhari 2006." }
      ]
    }
  ]
};

const ZAKAT: DeepUnit = {
  key: "book-zakat",
  topicId: "sahihayn",
  branchId: "hadith-book-zakah",
  branch: { title: "The Book of Zakat", description: "From the Books of Zakat: what is due, who gives, and the honour of not begging." },
  name: "the Book of Zakat",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "best-charity-family-first",
      title: "Start with your family",
      line: "The best charity leaves you still rich; start with your family.",
      facts: ["Those you look after first", "Told by Abu Hurairah"],
      source: hadith("bukhari", "1426", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: the best charity is given by one who is still well off, and start with those you support.", "start giving first to your dependents"),
      difficulty: 1,
      questions: [
        { q: "Whom should you give to first?", a: "Your dependents", wrong: ["Strangers only", "The rich", "No one"], why: "Start giving first to your dependents." },
        { q: "The best charity comes from one who is...?", a: "Still well off", wrong: ["Left with nothing", "In debt", "Showing off"], why: "Practiced by a wealthy person." },
        { q: "Spending on your family is part of charity.", tf: true, why: "Sahih al-Bukhari 1426." }
      ]
    },
    {
      slug: "the-nisab",
      title: "Below the limit, no zakat",
      line: "No zakat is due below five camels, five wasqs or five uqiyahs.",
      facts: ["Below it, nothing is due", "Told by Abu Said"],
      source: hadith("bukhari", "1459", "Abu Said al-Khudri", "Sahih", "The Prophet ﷺ said: no zakat is due on less than five wasqs of dates, five uqiyahs of silver, or five camels.", "no Zakat is imposed on less than five camels"),
      difficulty: 3,
      questions: [
        { q: "Is zakat due on fewer than five camels?", a: "No", wrong: ["Yes, always", "Only in Ramadan", "Only for kings"], why: "No Zakat is imposed on less than five camels." },
        { q: "Which of these has a zakat limit in this hadith?", a: "Dates", wrong: ["Water", "Firewood", "Sand"], why: "No Zakat is imposed on less than five Awsuq of dates." },
        { q: "Silver also has a limit for zakat.", tf: true, why: "Less than five Awaq of silver. Sahih al-Bukhari 1459." }
      ]
    },
    {
      slug: "charity-for-her-gift-for-us",
      title: "Charity for her, a gift for us",
      line: "Charity meat given to Barirah became a gift when she shared it.",
      facts: ["He ﷺ did not take sadaqah", "Told by Anas"],
      source: hadith("bukhari", "1495", "Anas ibn Malik", "Sahih", "Meat given to Barirah as charity was brought to the Prophet ﷺ. He said: it is charity for Barirah and a gift for us.", "This meat is a thing of charity for Barira but it is a gift for us"),
      difficulty: 2,
      questions: [
        { q: "Who first got the meat as charity?", a: "Barirah", wrong: ["Aishah", "Fatimah", "Umm Ayman"], why: "It had been given to Barira in charity." },
        { q: "For the Prophet ﷺ the meat was...?", a: "A gift", wrong: ["Zakat", "Forbidden", "Spoiled"], why: "It is a gift for us." },
        { q: "Charity changes into a gift once the poor person gives it on.", tf: true, why: "Sahih al-Bukhari 1495." }
      ]
    },
    {
      slug: "zakat-on-crops",
      title: "A tenth or a twentieth",
      line: "Rain-fed crops give a tenth; crops watered by work, a twentieth.",
      facts: ["Less work, more zakat", "Told by Jabir"],
      source: hadith("muslim", "981", "Jabir ibn Abdullah", "Sahih", "The Prophet ﷺ said: a tenth is due on crops watered by rivers or rain, and a twentieth on crops watered by camels.", "a twentieth on what is watered by camels"),
      difficulty: 3,
      questions: [
        { q: "Crops watered by rain give...?", a: "A tenth", wrong: ["A half", "Nothing", "A hundredth"], why: "A tenth is payable on what is watered by rivers, or rains." },
        { q: "Crops watered with camel work give...?", a: "A twentieth", wrong: ["A tenth", "A third", "All of it"], why: "A twentieth on what is watered by camels." },
        { q: "Hard work to water lowers the zakat share.", tf: true, why: "Sahih Muslim 981." }
      ]
    },
    {
      slug: "begging-for-more",
      title: "Begging to get richer",
      line: "Begging to grow rich is asking for hot coals.",
      facts: ["Ask only in real need", "Told by Abu Hurairah"],
      source: hadith("muslim", "1041", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: whoever begs from people to increase his wealth is only asking for live coals.", "is asking only for live coals"),
      difficulty: 2,
      questions: [
        { q: "Begging to grow rich is like asking for...?", a: "Live coals", wrong: ["Gold", "Blessings", "Flowers"], why: "Is asking only for live coals." },
        { q: "Who narrated this?", a: "Abu Hurairah", wrong: ["Muadh", "Anas", "Umar"], why: "Sahih Muslim 1041." },
        { q: "Begging for more when you have enough is good.", tf: false, why: "It is asking for live coals. Sahih Muslim 1041." }
      ]
    },
    {
      slug: "hasan-and-the-date",
      title: "Throw it out, Hasan",
      line: "Al-Hasan took a charity date; he ﷺ told him to throw it out.",
      facts: ["His ﷺ family take no sadaqah", "Told by Abu Hurairah"],
      source: hadith("muslim", "1069a", "Abu Hurairah", "Sahih", "Al-Hasan put a date of the charity in his mouth. The Prophet ﷺ said: throw it out; do you not know that we do not eat charity?", "we do not eat the sadaqa"),
      difficulty: 1,
      questions: [
        { q: "What did Al-Hasan put in his mouth?", a: "A charity date", wrong: ["A coin", "Bread", "A stone"], why: "He took one of the dates of the sadaqa." },
        { q: "Why did he ﷺ stop him?", a: "His family eats no sadaqah", wrong: ["It was sour", "It was dirty", "It was a fast day"], why: "Don't you know that we do not eat the sadaqa?" },
        { q: "The family of the Prophet ﷺ does not take sadaqah.", tf: true, why: "Sahih Muslim 1069a." }
      ]
    },
    {
      slug: "date-in-the-street",
      title: "A date in the street",
      line: "He ﷺ found a date and left it, in case it was charity.",
      facts: ["Careful with what is doubtful", "Told by Anas"],
      source: hadith("muslim", "1071a", "Anas ibn Malik", "Sahih", "The Prophet ﷺ found a date in the street and said: if it were not possibly charity, I would have eaten it.", "If it were not of sadaqa I would have eaten it"),
      difficulty: 1,
      questions: [
        { q: "Where did he ﷺ find the date?", a: "In the street", wrong: ["In the masjid", "In a tree", "In his pocket"], why: "He found a date in the street." },
        { q: "Why didn't he ﷺ eat it?", a: "It might be charity", wrong: ["He was full", "It was rotten", "He disliked dates"], why: "If it were not of sadaqa I would have eaten it." },
        { q: "Being careful with doubtful things is from the Sunnah.", tf: true, why: "Sahih Muslim 1071a." }
      ]
    },
    {
      slug: "just-enough-provision",
      title: "Just enough to live",
      line: "He ﷺ prayed: Allah, give the family of Muhammad just enough.",
      facts: ["Not riches, enough", "Told by Abu Hurairah"],
      source: hadith("muslim", "1055", "Abu Hurairah", "Sahih", "The Prophet ﷺ prayed: O Allah, make the provision of the family of Muhammad just enough to live on.", "make the provision of Muhammad"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ ask for his family?", a: "Just enough to live", wrong: ["Great riches", "Palaces", "Nothing at all"], why: "Sufficient just to sustain life." },
        { q: "Who narrated this?", a: "Abu Hurairah", wrong: ["Aishah", "Ali", "Anas"], why: "Sahih Muslim 1055." },
        { q: "He ﷺ loved a simple life for his family.", tf: true, why: "Sahih Muslim 1055." }
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

export const HADITH_BOOK_UNITS: readonly DeepUnit[] = [FAITH, PURITY, ADAB, FOOD, DUA, RIQAQ, DRESS, TRADE, MEDICINE, COMPANIONS, PRAYER, FASTING, ZAKAT];
