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

const MARRIAGE: DeepUnit = {
  key: "book-marriage",
  topicId: "sahihayn",
  branchId: "hadith-book-nikah",
  branch: { title: "The Book of Marriage", description: "From the Books of Marriage: consent, the mahr, the wedding meal and kindness at home." },
  name: "the Book of Marriage",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "marriage-not-monkhood",
      title: "Marriage, not monkhood",
      line: "The Prophet ﷺ did not let Uthman ibn Maz'un give up marriage.",
      facts: ["Islam has no monkhood", "Told by Sa'd ibn Abi Waqqas"],
      source: hadith("bukhari", "5073", "Sa'd ibn Abi Waqqas", "Sahih", "The Prophet ﷺ forbade Uthman ibn Maz'un from staying away from marriage for worship.", "to abstain from marrying"),
      difficulty: 1,
      questions: [
        { q: "What did Uthman ibn Maz'un want to give up?", a: "Marriage", wrong: ["Fasting", "Prayer", "Trade"], why: "He wanted to abstain from marrying, and the Prophet ﷺ forbade it." },
        { q: "What did the Prophet ﷺ say to his wish?", a: "He forbade it", wrong: ["He praised it", "He ordered all to copy it", "He said nothing"], why: "Allah's Messenger ﷺ forbade it." },
        { q: "Leaving marriage forever is a better way to worship.", tf: false, why: "The Prophet ﷺ forbade it. Sahih al-Bukhari 5073." }
      ]
    },
    {
      slug: "her-consent-first",
      title: "Her consent comes first",
      line: "A woman is not married off until she is asked and agrees.",
      facts: ["A shy girl may agree by silence", "Told by Abu Hurairah"],
      source: hadith("bukhari", "5136", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: a woman who was married before is not married again until she is consulted, and a young girl not until she gives permission; her silence shows her permission.", "a virgin should not be given in marriage except after her permission"),
      difficulty: 1,
      questions: [
        { q: "What is needed before a girl is married?", a: "Her permission", wrong: ["Only her father's wish", "Nothing", "A big party"], why: "She is not given in marriage except after her permission." },
        { q: "How may a shy girl show her yes?", a: "By staying silent", wrong: ["By running away", "By crying out no", "By writing a poem"], why: "Her silence indicates her permission." },
        { q: "A woman married before must be consulted too.", tf: true, why: "A matron is not married except after consulting her. Sahih al-Bukhari 5136." }
      ]
    },
    {
      slug: "a-forced-marriage-undone",
      title: "A forced marriage undone",
      line: "Khansa was married against her wish; the Prophet ﷺ cancelled it.",
      facts: ["Her father chose without her", "Told by Khansa bint Khidam"],
      source: hadith("bukhari", "5138", "Khansa bint Khidam", "Sahih", "Khansa's father married her off while she disliked it. She went to the Prophet ﷺ and he declared the marriage invalid.", "he declared that marriage invalid"),
      difficulty: 2,
      questions: [
        { q: "What did Khansa feel about her marriage?", a: "She disliked it", wrong: ["She loved it", "She did not know", "She chose it"], why: "Her father married her off and she disliked that marriage." },
        { q: "What did the Prophet ﷺ do?", a: "Declared it invalid", wrong: ["Told her to accept it", "Sent her away", "Asked for money"], why: "He declared that marriage invalid." },
        { q: "A father may force his grown daughter into a marriage she refuses.", tf: false, why: "The Prophet ﷺ cancelled such a marriage. Sahih al-Bukhari 5138." }
      ]
    },
    {
      slug: "no-swap-marriages",
      title: "No swap marriages",
      line: "He ﷺ forbade swapping daughters in marriage with no mahr.",
      facts: ["This is called shighar", "Told by Ibn Umar"],
      source: hadith("bukhari", "5112", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ forbade shighar: a man marries his daughter to another man so that the other marries his daughter to him, with no mahr for either bride.", "forbade Ash-Shighar"),
      difficulty: 3,
      questions: [
        { q: "What is shighar?", a: "Swapping daughters with no mahr", wrong: ["A wedding song", "A kind of mahr", "A wedding meal"], why: "Each man marries off his daughter to the other without paying mahr." },
        { q: "What did the Prophet ﷺ say about it?", a: "He forbade it", wrong: ["He ordered it", "He praised it", "He made it a sunnah"], why: "Allah's Messenger ﷺ forbade Ash-Shighar." },
        { q: "Each bride has a right to her own mahr.", tf: true, why: "Shighar was forbidden because the brides got no mahr. Sahih al-Bukhari 5112." }
      ]
    },
    {
      slug: "no-proposal-over-a-brother",
      title: "Don't cut in on a proposal",
      line: "Do not propose to a woman your brother has already asked for.",
      facts: ["Wait until he marries or leaves", "Told by Abu Hurairah"],
      source: hadith("bukhari", "5144", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: no one should propose to a woman his Muslim brother has proposed to, but should wait until the first man marries her or leaves her.", "none should ask for the hand of a girl who is already engaged to his (Muslim) brother"),
      difficulty: 2,
      questions: [
        { q: "What must you not do?", a: "Propose over your brother", wrong: ["Ask her family", "Pray istikharah", "Give a mahr"], why: "None should ask for the hand of a girl already engaged to his brother." },
        { q: "When may you propose instead?", a: "When the first suitor leaves", wrong: ["Right away", "Never", "If you are richer"], why: "Wait till the first suitor marries her or leaves her." },
        { q: "The same hadith warns against spying and suspicion.", tf: true, why: "Beware of suspicion and do not spy. Sahih al-Bukhari 5144." }
      ]
    },
    {
      slug: "a-feast-of-one-sheep",
      title: "A feast of one sheep",
      line: "His ﷺ biggest wedding meal, for Zainab, was one sheep.",
      facts: ["The walimah is the wedding meal", "Told by Anas"],
      source: hadith("bukhari", "5168", "Anas ibn Malik", "Sahih", "Anas said the Prophet ﷺ gave no better wedding meal for any wife than for Zainab, and it was one sheep.", "that banquet was with (consisted of) one sheep"),
      difficulty: 1,
      questions: [
        { q: "What was the meal for Zainab's wedding?", a: "One sheep", wrong: ["Ten camels", "A hundred sheep", "Only water"], why: "That banquet consisted of one sheep." },
        { q: "What is the wedding meal called?", a: "Walimah", wrong: ["Aqiqah", "Iftar", "Suhur"], why: "The wedding banquet is the walimah." },
        { q: "A wedding meal must be very costly.", tf: false, why: "His ﷺ best one was a single sheep. Sahih al-Bukhari 5168." }
      ]
    },
    {
      slug: "answer-the-wedding-invite",
      title: "Answer the wedding invite",
      line: "If you are invited to a wedding meal, go.",
      facts: ["Accepting is a right", "Told by Ibn Umar"],
      source: hadith("bukhari", "5173", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ said: if one of you is invited to a wedding meal, he should go.", "If anyone of you is invited to a wedding banquet, he must go for it"),
      difficulty: 1,
      questions: [
        { q: "What should you do with a wedding invite?", a: "Accept and go", wrong: ["Ignore it", "Ask for money", "Send it back"], why: "If invited to a wedding banquet, he must go for it." },
        { q: "Who told this hadith?", a: "Ibn Umar", wrong: ["Anas", "Jabir", "Aishah"], why: "Sahih al-Bukhari 5173." },
        { q: "Going to a wedding meal you are invited to is from the Sunnah.", tf: true, why: "He ﷺ told us to go. Sahih al-Bukhari 5173." }
      ]
    },
    {
      slug: "the-worst-wedding-food",
      title: "The worst wedding food",
      line: "The worst wedding meal invites the rich and leaves out the poor.",
      facts: ["Invite the poor too", "Told by Abu Hurairah"],
      source: hadith("bukhari", "5177", "Abu Hurairah", "Sahih", "Abu Hurairah said: the worst food is a wedding meal where only the rich are invited and the poor are left out.", "The worst food is that of a wedding banquet to which only the rich are invited"),
      difficulty: 2,
      questions: [
        { q: "Which wedding food is the worst?", a: "One that leaves out the poor", wrong: ["One with little food", "One with dates", "One at night"], why: "Only the rich are invited while the poor are not." },
        { q: "What about refusing an invitation without reason?", a: "It is disobeying Allah and His Messenger ﷺ", wrong: ["It is better", "It is a sunnah", "It does not matter"], why: "He who refuses an invitation disobeys Allah and His Messenger ﷺ." },
        { q: "A good wedding meal welcomes the poor as well.", tf: true, why: "Sahih al-Bukhari 5177." }
      ]
    },
    {
      slug: "joy-at-a-wedding",
      title: "Joy at a wedding",
      line: "Seeing families come from a wedding, he ﷺ stood up happily.",
      facts: ["He ﷺ loved the Ansar", "Told by Anas"],
      source: hadith("bukhari", "5180", "Anas ibn Malik", "Sahih", "The Prophet ﷺ saw women and children coming back from a wedding, stood up happily and said: by Allah, you are among the most beloved people to me.", "He got up energetically and happily"),
      difficulty: 2,
      questions: [
        { q: "How did he ﷺ react to the wedding guests?", a: "He stood up happily", wrong: ["He turned away", "He scolded them", "He did not notice"], why: "He got up energetically and happily." },
        { q: "Who were the guests from?", a: "The Ansar", wrong: ["Quraysh", "The Romans", "The Persians"], why: "You, the Ansar, are the most beloved of people to me." },
        { q: "A wedding is a happy time in Islam.", tf: true, why: "He ﷺ met the guests with joy. Sahih al-Bukhari 5180." }
      ]
    },
    {
      slug: "let-her-go-to-the-masjid",
      title: "Let her go to the masjid",
      line: "If your wife asks to go to the masjid, let her go.",
      facts: ["Women prayed in his ﷺ masjid", "Told by Ibn Umar"],
      source: hadith("bukhari", "5238", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ said: if a man's wife asks permission to go to the masjid, he should not forbid her.", "If the wife of anyone of you asks permission to go to the mosque, he should not forbid her"),
      difficulty: 1,
      questions: [
        { q: "If a wife asks to go to the masjid, the husband should...?", a: "Not forbid her", wrong: ["Always refuse", "Make her pay", "Ask the neighbours"], why: "He should not forbid her." },
        { q: "Who told this hadith?", a: "Ibn Umar", wrong: ["Abu Musa", "Jabir", "Anas"], why: "Narrated by Salim from his father, Ibn Umar. Sahih al-Bukhari 5238." },
        { q: "Women came to the masjid in the Prophet's ﷺ time.", tf: true, why: "Sahih al-Bukhari 5238." }
      ]
    },
    {
      slug: "dont-surprise-them-at-night",
      title: "Don't surprise them at night",
      line: "After a long trip, do not come home to family at night.",
      facts: ["Give them time to get ready", "Told by Jabir"],
      source: hadith("bukhari", "5244", "Jabir ibn Abdullah", "Sahih", "The Prophet ﷺ said: when one of you has been away from home a long time, he should not come back to his family at night.", "he should not return to his family at night"),
      difficulty: 2,
      questions: [
        { q: "After a long trip, when should you not arrive home?", a: "At night", wrong: ["In the morning", "At noon", "After Asr"], why: "He should not return to his family at night." },
        { q: "Why is this good manners?", a: "It lets the family get ready", wrong: ["It saves money", "It is cooler", "It is shorter"], why: "Coming suddenly at night can catch the family unprepared." },
        { q: "This is about a long time away from home.", tf: true, why: "When away from his house for a long time. Sahih al-Bukhari 5244." }
      ]
    },
    {
      slug: "milk-family",
      title: "The milk family",
      line: "Nursing makes the same relatives unlawful as birth does.",
      facts: ["A milk mother is like a mother", "Told by Aishah"],
      source: hadith("muslim", "1444b", "Aishah", "Sahih", "The Prophet ﷺ said: what becomes unlawful through birth also becomes unlawful through breastfeeding.", "What becomes unlawful through breastfeeding is that which becomes unlawful through birth"),
      difficulty: 3,
      questions: [
        { q: "Nursing makes unlawful the same as...?", a: "Birth", wrong: ["Friendship", "Neighbours", "Trade"], why: "What becomes unlawful through breastfeeding is what becomes unlawful through birth." },
        { q: "A boy nursed by a woman cannot marry her daughter because...?", a: "They are milk siblings", wrong: ["They are neighbours", "They are rich", "They are young"], why: "Nursing makes them like brother and sister." },
        { q: "A milk brother is like a real brother for marriage rules.", tf: true, why: "Sahih Muslim 1444b." }
      ]
    }
  ]
};

const ADHAN: DeepUnit = {
  key: "book-adhan",
  topicId: "sahihayn",
  branchId: "hadith-book-adhan",
  branch: { title: "The Book of the Adhan", description: "From the Book of the Adhan: the call, the rows, the imam and praying in congregation." },
  name: "the Book of the Adhan",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "two-light-rakahs-at-fajr",
      title: "Two light rak'ahs at Fajr",
      line: "He ﷺ prayed two short rak'ahs between the Fajr adhan and iqamah.",
      facts: ["The sunnah before Fajr", "Told by Aishah"],
      source: hadith("bukhari", "619", "Aishah", "Sahih", "Aishah said the Prophet ﷺ used to pray two light rak'ahs between the adhan and iqamah of Fajr.", "two light rak`at between the Adhan and the Iqama of the Fajr prayer"),
      difficulty: 1,
      questions: [
        { q: "How many rak'ahs did he ﷺ pray before Fajr?", a: "Two", wrong: ["Four", "Six", "None"], why: "He offered two light rak'at between the adhan and iqamah." },
        { q: "Were those two rak'ahs long or short?", a: "Short and light", wrong: ["Very long", "Silent all night", "Only standing"], why: "Two light rak'at." },
        { q: "These two rak'ahs come before the Fajr fard prayer.", tf: true, why: "Between the adhan and the iqamah. Sahih al-Bukhari 619." }
      ]
    },
    {
      slug: "travellers-call-too",
      title: "Travellers call too",
      line: "Even two travellers give the adhan and iqamah; the elder leads.",
      facts: ["Adhan is not only for the masjid", "Told by Malik ibn al-Huwairith"],
      source: hadith("bukhari", "630", "Malik ibn al-Huwairith", "Sahih", "The Prophet ﷺ told two men going on a journey: give the adhan, then the iqamah, and let the older of you lead.", "pronounce Adhan and then Iqama and the oldest of you should lead the prayer"),
      difficulty: 2,
      questions: [
        { q: "What should two travellers do at prayer time?", a: "Give adhan and iqamah", wrong: ["Skip the prayer", "Pray only alone", "Wait till home"], why: "Pronounce adhan and then iqamah." },
        { q: "Who leads them?", a: "The older one", wrong: ["The richer one", "The taller one", "Whoever is faster"], why: "The oldest of you should lead the prayer." },
        { q: "The adhan is only for big masjids.", tf: false, why: "Even two travellers call it. Sahih al-Bukhari 630." }
      ]
    },
    {
      slug: "stand-calmly-for-iqamah",
      title: "Stand calmly for the iqamah",
      line: "At the iqamah, stand up calmly once you see the imam.",
      facts: ["No running or pushing", "Told by Abu Qatadah"],
      source: hadith("bukhari", "638", "Abu Qatadah", "Sahih", "The Prophet ﷺ said: when the iqamah is called, do not stand until you see me, and do it calmly.", "do not stand for the prayer till you see me (in front of you) and do it calmly"),
      difficulty: 2,
      questions: [
        { q: "How should we get up for the prayer?", a: "Calmly", wrong: ["Rushing", "Shouting", "Pushing ahead"], why: "Do it calmly." },
        { q: "When did they stand?", a: "When they saw him ﷺ", wrong: ["Before the adhan", "At sunrise", "After the prayer"], why: "Do not stand till you see me." },
        { q: "Calmness is part of the manners of prayer.", tf: true, why: "Sahih al-Bukhari 638." }
      ]
    },
    {
      slug: "dinner-before-maghrib",
      title: "Dinner first, then Maghrib",
      line: "If dinner is served at Maghrib, eat it first.",
      facts: ["Don't rush the meal", "Told by Anas"],
      source: hadith("bukhari", "672", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said: if supper is served, start eating before praying Maghrib, and do not hurry to finish it.", "If the supper is served start having it before praying the Maghrib prayer"),
      difficulty: 2,
      questions: [
        { q: "If supper is served at Maghrib, what first?", a: "Eat the supper", wrong: ["Throw it away", "Skip Maghrib", "Give it away"], why: "Start having it before praying the Maghrib prayer." },
        { q: "Why does this help the prayer?", a: "The mind is not on food", wrong: ["It makes it longer", "It makes it louder", "It is cheaper"], why: "A hungry person thinking of food cannot focus well." },
        { q: "He ﷺ said not to rush finishing the meal.", tf: true, why: "Do not be hasty in finishing it. Sahih al-Bukhari 672." }
      ]
    },
    {
      slug: "obey-even-a-humble-leader",
      title: "Obey even a humble leader",
      line: "Listen and obey a leader, even one people look down on.",
      facts: ["Not in disobeying Allah", "Told by Anas"],
      source: hadith("bukhari", "693", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said: listen and obey, even if an Ethiopian whose head is like a raisin is made your leader.", "Listen and obey (your chief) even if an Ethiopian"),
      difficulty: 2,
      questions: [
        { q: "Whom did he ﷺ tell us to obey?", a: "The appointed leader", wrong: ["Only the richest", "Only Arabs", "No one"], why: "Listen and obey your chief." },
        { q: "What does the leader's look have to do with it?", a: "Nothing, obey anyway", wrong: ["Obey only the handsome", "Only the tall", "Only the old"], why: "Even if an Ethiopian with a head like a raisin." },
        { q: "Race and looks do not make a Muslim better.", tf: true, why: "Sahih al-Bukhari 693." }
      ]
    },
    {
      slug: "the-imams-mistake",
      title: "The imam's mistake",
      line: "If the imam errs, you keep your reward; the error is his.",
      facts: ["Follow the imam", "Told by Abu Hurairah"],
      source: hadith("bukhari", "694", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: if the imam leads well, you both get the reward; if he errs, you still get your reward and the sin is his.", "you will receive the reward for the prayer and the sin will be his"),
      difficulty: 2,
      questions: [
        { q: "If the imam makes a mistake, who loses?", a: "Only the imam", wrong: ["Everyone", "Only the first row", "The muadhin"], why: "You receive the reward and the sin is his." },
        { q: "If the imam prays well, who is rewarded?", a: "The imam and the people", wrong: ["Only the imam", "Only the people", "No one"], why: "He and you will receive the rewards." },
        { q: "An imam carries a big trust.", tf: true, why: "Sahih al-Bukhari 694." }
      ]
    },
    {
      slug: "one-follower-stands-right",
      title: "One follower stands on the right",
      line: "Ibn Abbas stood on his ﷺ left, and was moved to his right.",
      facts: ["Two praying: follower on the right", "Told by Ibn Abbas"],
      source: hadith("bukhari", "699", "Abdullah ibn Abbas", "Sahih", "Young Ibn Abbas joined the Prophet's ﷺ night prayer on his left, and he ﷺ moved him by the head to his right.", "he drew me to his right by holding me by the head"),
      difficulty: 2,
      questions: [
        { q: "Where should one follower stand?", a: "On the imam's right", wrong: ["On the left", "Far behind", "In front"], why: "He drew me to his right." },
        { q: "Whose house was this in?", a: "Maimunah's", wrong: ["Abu Bakr's", "Umar's", "Ali's"], why: "I passed the night in the house of my aunt Maimuna." },
        { q: "Ibn Abbas was a boy who prayed the night prayer with him ﷺ.", tf: true, why: "Sahih al-Bukhari 699." }
      ]
    },
    {
      slug: "straight-rows-close-together",
      title: "Straight rows, close together",
      line: "Make the rows straight and stand close together.",
      facts: ["Said as the iqamah was called", "Told by Anas"],
      source: hadith("bukhari", "719", "Anas ibn Malik", "Sahih", "As the iqamah was called the Prophet ﷺ faced the people and said: straighten your rows and stand close together.", "Straighten your rows and stand closer together"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ say about the rows?", a: "Straight and close", wrong: ["Wide gaps", "Any shape", "Only one row"], why: "Straighten your rows and stand closer together." },
        { q: "When did he ﷺ say it?", a: "When the iqamah was called", wrong: ["After the prayer", "At night only", "On Eid only"], why: "Once the iqamah was pronounced he faced us." },
        { q: "Leaving gaps in the rows is the Sunnah.", tf: false, why: "Stand closer together. Sahih al-Bukhari 719." }
      ]
    },
    {
      slug: "right-hand-over-left",
      title: "Right hand over left",
      line: "In prayer, the right hand is placed on the left forearm.",
      facts: ["The people were ordered to", "Told by Sahl ibn Sa'd"],
      source: hadith("bukhari", "740", "Sahl ibn Sa'd", "Sahih", "Sahl said: people were told to place the right hand on the left forearm in prayer, an order from the Prophet ﷺ.", "place the right hand on the left forearm in the prayer"),
      difficulty: 1,
      questions: [
        { q: "Which hand goes on top in prayer?", a: "The right", wrong: ["The left", "Neither", "Both down"], why: "Place the right hand on the left forearm." },
        { q: "Where does the right hand rest?", a: "On the left forearm", wrong: ["On the head", "On the knee", "Behind the back"], why: "On the left forearm in the prayer." },
        { q: "This order came from the Prophet ﷺ.", tf: true, why: "Abu Hazim said he knew it was from the Prophet ﷺ. Sahih al-Bukhari 740." }
      ]
    },
    {
      slug: "bow-and-prostrate-fully",
      title: "Bow and prostrate fully",
      line: "Hudhayfah told a man who rushed his bowing: you have not prayed.",
      facts: ["Each position needs calm", "Told by Zaid ibn Wahb"],
      source: hadith("bukhari", "791", "Hudhayfah", "Sahih", "Hudhayfah saw a man not completing his bowing and prostration and told him: you have not prayed.", "not performing the bowing and prostration perfectly"),
      difficulty: 3,
      questions: [
        { q: "What was the man doing wrong?", a: "Rushing bowing and sujud", wrong: ["Praying too long", "Praying in a group", "Saying amin"], why: "He was not performing the bowing and prostration perfectly." },
        { q: "What did Hudhayfah tell him?", a: "You have not prayed", wrong: ["Well done", "Pray faster", "Go home"], why: "You have not prayed." },
        { q: "A prayer rushed like pecking is still complete.", tf: false, why: "Bowing and prostration must be done fully. Sahih al-Bukhari 791." }
      ]
    },
    {
      slug: "waiting-counts-as-prayer",
      title: "Waiting counts as prayer",
      line: "While you wait for the prayer, you are counted as praying.",
      facts: ["He ﷺ delayed Isha one night", "Told by Anas"],
      source: hadith("bukhari", "847", "Anas ibn Malik", "Sahih", "The Prophet ﷺ delayed Isha until midnight, then said: people prayed and slept, but you were in prayer as long as you waited for it.", "you were in the prayer as long as you were waiting for it"),
      difficulty: 2,
      questions: [
        { q: "What is waiting for the prayer counted as?", a: "Being in prayer", wrong: ["Wasted time", "Sleeping", "Nothing"], why: "You were in the prayer as long as you were waiting for it." },
        { q: "Which prayer did he ﷺ delay that night?", a: "Isha", wrong: ["Fajr", "Dhuhr", "Asr"], why: "He delayed the Isha prayer until midnight." },
        { q: "Sitting in the masjid waiting for salah earns reward.", tf: true, why: "Sahih al-Bukhari 847." }
      ]
    },
    {
      slug: "no-garlic-in-the-masjid",
      title: "No garlic smell in the masjid",
      line: "Whoever ate raw garlic should not come into our masjid.",
      facts: ["Don't bother others with smells", "Told by Ibn Umar"],
      source: hadith("bukhari", "853", "Abdullah ibn Umar", "Sahih", "At Khaybar the Prophet ﷺ said: whoever ate from this plant, garlic, should not enter our masjid.", "Whoever ate from this plant (i.e. garlic) should not enter our mosque"),
      difficulty: 1,
      questions: [
        { q: "Which plant did he ﷺ name?", a: "Garlic", wrong: ["Dates", "Wheat", "Mint"], why: "Whoever ate from this plant, garlic." },
        { q: "Why stay away after eating it?", a: "Its smell bothers others", wrong: ["It is haram to eat", "It breaks wudu", "It is costly"], why: "The smell troubles the people praying." },
        { q: "Eating garlic is forbidden in Islam.", tf: false, why: "Only coming to the masjid with its smell is meant. Sahih al-Bukhari 853." }
      ]
    }
  ]
};

const FUNERALS: DeepUnit = {
  key: "book-funerals",
  topicId: "sahihayn",
  branchId: "hadith-book-janaiz",
  branch: { title: "The Book of Funerals", description: "From the Books of Funerals: patience at a death, washing and shrouding, the prayer and the graves." },
  name: "the Book of Funerals",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "how-you-die-matters",
      title: "How you die matters",
      line: "Whoever dies worshipping none but Allah enters Paradise.",
      facts: ["Shirk at death leads to the Fire", "Told by Ibn Mas'ud"],
      source: hadith("bukhari", "1238", "Abdullah ibn Mas'ud", "Sahih", "The Prophet ﷺ said: whoever dies worshipping others with Allah enters the Fire. Ibn Mas'ud said: so whoever dies worshipping none with Allah enters Paradise.", "Anyone who dies worshipping none along with Allah will definitely enter Paradise"),
      difficulty: 1,
      questions: [
        { q: "Who enters Paradise, by this hadith?", a: "One who dies on tawhid", wrong: ["One who dies rich", "One who dies old", "One who dies famous"], why: "Anyone who dies worshipping none along with Allah enters Paradise." },
        { q: "What leads to the Fire at death?", a: "Worshipping others with Allah", wrong: ["Being poor", "Dying young", "Dying far from home"], why: "Anyone who dies worshipping others along with Allah enters the Fire." },
        { q: "The state we die in is what counts.", tf: true, why: "Sahih al-Bukhari 1238." }
      ]
    },
    {
      slug: "patience-at-the-grave",
      title: "Patience at the grave",
      line: "To a woman crying at a grave: fear Allah and be patient.",
      facts: ["Patience is for the first shock", "Told by Anas"],
      source: hadith("bukhari", "1252", "Anas ibn Malik", "Sahih", "The Prophet ﷺ passed a woman weeping beside a grave and said to her: fear Allah and be patient.", "Fear Allah and be patient"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ tell the crying woman?", a: "Fear Allah and be patient", wrong: ["Go home", "Cry louder", "Blame others"], why: "Fear Allah and be patient." },
        { q: "Where was the woman sitting?", a: "Beside a grave", wrong: ["In the market", "In the masjid", "On a mountain"], why: "She was sitting and weeping beside a grave." },
        { q: "Patience is asked of us when we lose someone.", tf: true, why: "Sahih al-Bukhari 1252." }
      ]
    },
    {
      slug: "three-children-who-died",
      title: "Children who died young",
      line: "A Muslim whose three young children die is given Paradise.",
      facts: ["By Allah's mercy to them", "Told by Anas"],
      source: hadith("bukhari", "1248", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said: a Muslim whose three children die before puberty will be given Paradise by Allah, out of His mercy for them.", "will be granted Paradise by Allah due to his mercy for them"),
      difficulty: 2,
      questions: [
        { q: "What does Allah give such a parent?", a: "Paradise", wrong: ["Wealth", "Fame", "Long life"], why: "He will be granted Paradise by Allah." },
        { q: "Why is it given?", a: "Allah's mercy for the children", wrong: ["The parent's money", "Luck", "The doctor"], why: "Due to His mercy for them." },
        { q: "Losing a child is never forgotten by Allah.", tf: true, why: "Sahih al-Bukhari 1248." }
      ]
    },
    {
      slug: "no-slapping-or-tearing",
      title: "No slapping or tearing",
      line: "Slapping cheeks or tearing clothes in grief is not our way.",
      facts: ["Tears are allowed, wailing is not", "Told by Ibn Mas'ud"],
      source: hadith("bukhari", "1294", "Abdullah ibn Mas'ud", "Sahih", "The Prophet ﷺ said: whoever slaps his cheeks, tears his clothes and follows the ways of the Days of Ignorance is not one of us.", "He who slaps his cheeks, tears his clothes"),
      difficulty: 1,
      questions: [
        { q: "Which is NOT allowed in grief?", a: "Tearing your clothes", wrong: ["Quiet tears", "Making dua", "Saying inna lillah"], why: "He who tears his clothes is not one of us." },
        { q: "Such acts come from...?", a: "The Days of Ignorance", wrong: ["The Sunnah", "The Quran", "The Sahabah"], why: "Follows the ways of the Days of Ignorance." },
        { q: "Crying quietly at a death is forbidden.", tf: false, why: "Only wailing, slapping and tearing are meant. Sahih al-Bukhari 1294." }
      ]
    },
    {
      slug: "washing-starts-on-the-right",
      title: "Washing starts on the right",
      line: "Wash the dead from the right, starting with the wudu parts.",
      facts: ["Said for his ﷺ daughter", "Told by Umm Atiyyah"],
      source: hadith("bukhari", "1255", "Umm Atiyyah", "Sahih", "When his daughter died, the Prophet ﷺ told the women washing her: start with the right side and the parts washed in wudu.", "Start with the right side, and the parts which are washed in ablution"),
      difficulty: 2,
      questions: [
        { q: "Which side is washed first?", a: "The right", wrong: ["The left", "The back", "The feet"], why: "Start with the right side." },
        { q: "Which parts come first?", a: "The wudu parts", wrong: ["The hair only", "The back only", "No order"], why: "The parts which are washed in ablution." },
        { q: "Umm Atiyyah helped wash his ﷺ daughter.", tf: true, why: "Sahih al-Bukhari 1255." }
      ]
    },
    {
      slug: "three-white-sheets",
      title: "Three white sheets",
      line: "He ﷺ was shrouded in three white cotton sheets.",
      facts: ["No shirt and no turban", "Told by Aishah"],
      source: hadith("bukhari", "1264", "Aishah", "Sahih", "Aishah said the Prophet ﷺ was shrouded in three white Yemeni cotton sheets, with no shirt or turban among them.", "shrouded in three Yemenite white Suhuliya (pieces of cloth) of cotton"),
      difficulty: 1,
      questions: [
        { q: "How many sheets was he ﷺ shrouded in?", a: "Three", wrong: ["One", "Seven", "Ten"], why: "Shrouded in three white pieces of cloth." },
        { q: "What colour were they?", a: "White", wrong: ["Green", "Black", "Red"], why: "Three Yemenite white cotton cloths." },
        { q: "His ﷺ shroud had a shirt and a turban.", tf: false, why: "There was neither a shirt nor a turban. Sahih al-Bukhari 1264." }
      ]
    },
    {
      slug: "hurry-with-the-funeral",
      title: "Hurry with the funeral",
      line: "Do not delay a burial; hurry the body to what awaits it.",
      facts: ["Good awaits the righteous", "Told by Abu Hurairah"],
      source: hadith("bukhari", "1315", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: hurry with the body; if it was righteous you send it to good, and if not, you put a burden off your necks.", "Hurry up with the dead body"),
      difficulty: 2,
      questions: [
        { q: "What should we do with the funeral?", a: "Hurry with it", wrong: ["Delay it for days", "Hide it", "Leave it"], why: "Hurry up with the dead body." },
        { q: "If the person was righteous, you send them to...?", a: "Good", wrong: ["Harm", "The market", "Nothing"], why: "You are forwarding it to welfare." },
        { q: "Delaying burial for no need is the Sunnah.", tf: false, why: "He ﷺ said to hurry. Sahih al-Bukhari 1315." }
      ]
    },
    {
      slug: "forty-who-pray",
      title: "Forty who pray",
      line: "If forty believers pray over a Muslim, Allah accepts their plea.",
      facts: ["They must not do shirk", "Told by Ibn Abbas"],
      source: hadith("muslim", "948", "Abdullah ibn Abbas", "Sahih", "The Prophet ﷺ said: if a Muslim dies and forty men who associate nothing with Allah pray over him, Allah accepts them as intercessors for him.", "forty men who associate nothing with Allah stand over his prayer"),
      difficulty: 2,
      questions: [
        { q: "How many believers are named in the hadith?", a: "Forty", wrong: ["Three", "Ten", "A thousand"], why: "Forty men who associate nothing with Allah." },
        { q: "What does Allah do with their prayer?", a: "Accepts them as intercessors", wrong: ["Rejects it", "Ignores it", "Delays it"], why: "Allah will accept them as intercessors for him." },
        { q: "Ibn Abbas waited for forty people for his son's funeral.", tf: true, why: "Sahih Muslim 948." }
      ]
    },
    {
      slug: "a-dua-for-the-dead",
      title: "A dua for the dead",
      line: "He ﷺ prayed: O Allah, forgive Abu Salamah and light his grave.",
      facts: ["Say only good near the dying", "Told by Umm Salamah"],
      source: hadith("muslim", "920a", "Umm Salamah", "Sahih", "When Abu Salamah died, the Prophet ﷺ closed his eyes, told the family to say only good, as angels say amin, and prayed for his forgiveness, a spacious grave and light in it.", "O Allah, forgive Abu Salama"),
      difficulty: 2,
      questions: [
        { q: "Why say only good when someone dies?", a: "Angels say amin to it", wrong: ["It is shorter", "No one hears", "It is a custom"], why: "Angels say Amen to what you say." },
        { q: "What did he ﷺ ask for Abu Salamah's grave?", a: "Space and light", wrong: ["Gold", "A tall dome", "Flowers"], why: "Make his grave spacious, and grant him light in it." },
        { q: "He ﷺ closed Abu Salamah's eyes.", tf: true, why: "When the soul is taken away the sight follows it. Sahih Muslim 920a." }
      ]
    },
    {
      slug: "martyrs-buried-as-they-fell",
      title: "Martyrs buried as they fell",
      line: "The martyrs of Uhud were buried in their blood, unwashed.",
      facts: ["Their blood is their witness", "Told by Jabir"],
      source: hadith("bukhari", "1346", "Jabir ibn Abdullah", "Sahih", "On the day of Uhud the Prophet ﷺ said: bury them with their blood, and they were not washed.", "Bury them (i.e. martyrs) with their blood"),
      difficulty: 3,
      questions: [
        { q: "How were the martyrs of Uhud buried?", a: "With their blood", wrong: ["After a long wash", "In silk", "In gold"], why: "Bury them with their blood." },
        { q: "Were they washed?", a: "No", wrong: ["Yes, three times", "Yes, with musk", "Only their hands"], why: "He did not get them washed." },
        { q: "This was after the Battle of Uhud.", tf: true, why: "Sahih al-Bukhari 1346." }
      ]
    },
    {
      slug: "a-nurse-in-paradise",
      title: "A nurse in Paradise",
      line: "When baby Ibrahim died, he ﷺ said: he has a nurse in Paradise.",
      facts: ["Ibrahim was his ﷺ son", "Told by al-Bara"],
      source: hadith("bukhari", "1382", "al-Bara ibn Azib", "Sahih", "When the Prophet's ﷺ little son Ibrahim died, he said: there is a wet-nurse for him in Paradise.", "There is a wet-nurse for him in Paradise"),
      difficulty: 1,
      questions: [
        { q: "Who was Ibrahim here?", a: "The Prophet's ﷺ son", wrong: ["A prophet", "A king", "A neighbour"], why: "Ibrahim, the son of the Prophet ﷺ." },
        { q: "What did he ﷺ say Ibrahim has?", a: "A nurse in Paradise", wrong: ["A palace on earth", "A horse", "Nothing"], why: "There is a wet-nurse for him in Paradise." },
        { q: "Young children who die are in Allah's care.", tf: true, why: "Sahih al-Bukhari 1382." }
      ]
    },
    {
      slug: "respect-the-graves",
      title: "Respect the graves",
      line: "Do not sit on graves, and do not pray facing them.",
      facts: ["Graves are not for worship", "Told by Abu Marthad"],
      source: hadith("muslim", "972a", "Abu Marthad al-Ghanawi", "Sahih", "The Prophet ﷺ said: do not sit on the graves and do not pray facing them.", "Do not sit on the graves and do not pray facing towards them"),
      difficulty: 2,
      questions: [
        { q: "What must we not do on graves?", a: "Sit on them", wrong: ["Make dua for the dead", "Say salam", "Remember death"], why: "Do not sit on the graves." },
        { q: "What else is forbidden?", a: "Praying facing graves", wrong: ["Visiting them", "Walking past", "Crying"], why: "Do not pray facing towards them." },
        { q: "This keeps worship for Allah alone.", tf: true, why: "Sahih Muslim 972a." }
      ]
    },
    {
      slug: "salam-to-the-graves",
      title: "Salam to the graves",
      line: "At a graveyard say: peace be upon you, people of these homes.",
      facts: ["We will join them, insha'Allah", "Told by Buraidah"],
      source: hadith("muslim", "975", "Buraidah", "Sahih", "The Prophet ﷺ taught: peace be upon you, people of these homes, believers and Muslims; we shall join you, if Allah wills; I ask Allah for safety for us and you.", "Peace be upon you, the inhabitants of the city, among the believers, and Muslims, and God willing we shall join you"),
      difficulty: 2,
      questions: [
        { q: "What do we say at a graveyard?", a: "Peace be upon you", wrong: ["Nothing", "Good morning", "Help us"], why: "Peace be upon you, the inhabitants of the city." },
        { q: "What do we ask Allah for?", a: "Safety for us and them", wrong: ["Riches", "Fame", "A long trip"], why: "I beg of Allah peace for us and for you." },
        { q: "The dua reminds us we will die too.", tf: true, why: "God willing we shall join you. Sahih Muslim 975." }
      ]
    }
  ]
};

const HAJJ: DeepUnit = {
  key: "book-hajj",
  topicId: "sahihayn",
  branchId: "hadith-book-hajj",
  branch: { title: "The Book of Hajj", description: "From the Books of Hajj: ihram, the talbiyah, tawaf, Muzdalifah, Mina and the farewell tawaf." },
  name: "the Book of Hajj",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "scent-before-ihram",
      title: "Scent before ihram",
      line: "Aishah perfumed him ﷺ before he entered ihram.",
      facts: ["Before ihram, not after", "Told by Aishah"],
      source: hadith("bukhari", "1539", "Aishah", "Sahih", "Aishah said she used to put scent on the Prophet ﷺ when he was about to enter ihram, and again on leaving it before Tawaf al-Ifadah.", "when he wanted to assume Ihram"),
      difficulty: 2,
      questions: [
        { q: "When did Aishah put scent on him ﷺ?", a: "Before ihram", wrong: ["During tawaf", "At Arafah", "Never"], why: "When he wanted to assume ihram." },
        { q: "When else did she scent him?", a: "On leaving ihram", wrong: ["At Mina's start", "At Fajr only", "On the way home"], why: "On finishing ihram before Tawaf al-Ifadah." },
        { q: "Putting new perfume on while in ihram is fine.", tf: false, why: "The scent was before ihram and after it. Sahih al-Bukhari 1539." }
      ]
    },
    {
      slug: "labbayk-as-the-camel-rose",
      title: "Labbayk as the camel rose",
      line: "He ﷺ began the talbiyah as his camel stood up.",
      facts: ["The miqat of Madinah", "Told by Ibn Umar"],
      source: hadith("bukhari", "1514", "Abdullah ibn Umar", "Sahih", "Ibn Umar saw the Prophet ﷺ mount at Dhul-Hulaifah and begin saying labbayk when his camel stood up.", "when the Mount stood upright"),
      difficulty: 2,
      questions: [
        { q: "Where did he ﷺ start the talbiyah?", a: "Dhul-Hulaifah", wrong: ["Arafah", "Mina", "Taif"], why: "He rode his mount at Dhul-Hulaifah." },
        { q: "When exactly did he ﷺ begin?", a: "When his camel stood up", wrong: ["At night", "After tawaf", "At Arafah"], why: "He started saying labbaik when the mount stood upright." },
        { q: "Dhul-Hulaifah is the miqat for people from Madinah.", tf: true, why: "Sahih al-Bukhari 1514." }
      ]
    },
    {
      slug: "the-words-of-talbiyah",
      title: "The words of the talbiyah",
      line: "Labbayk Allahumma labbayk: here I am, O Allah, here I am.",
      facts: ["No partner have You", "Told by Aishah"],
      source: hadith("bukhari", "1550", "Aishah", "Sahih", "Aishah said the Prophet's ﷺ talbiyah was: here I am, O Allah, here I am; here I am, You have no partner; all praise, blessing and kingdom are Yours; You have no partner.", "Labbaika Allahumma Labbaik, Labbaika la sharika Laka labbaik"),
      difficulty: 1,
      questions: [
        { q: "What does labbayk mean?", a: "Here I am", wrong: ["Goodbye", "Thank you", "Wait for me"], why: "Labbaika Allahumma labbaik: here I am, O Allah." },
        { q: "What does la sharika laka mean?", a: "You have no partner", wrong: ["You are far", "You are many", "You are new"], why: "Labbaika la sharika laka labbaik." },
        { q: "The talbiyah praises Allah for all blessings.", tf: true, why: "All praise and blessings are Yours. Sahih al-Bukhari 1550." }
      ]
    },
    {
      slug: "into-makkah-from-the-top",
      title: "Into Makkah from the top",
      line: "He ﷺ entered Makkah from the high side, left from the low.",
      facts: ["Different way in and out", "Told by Aishah"],
      source: hadith("bukhari", "1577", "Aishah", "Sahih", "Aishah said: when the Prophet ﷺ came to Makkah he entered from its upper side and left from its lower side.", "he entered from its higher side and left from its lower side"),
      difficulty: 2,
      questions: [
        { q: "From which side did he ﷺ enter Makkah?", a: "The higher side", wrong: ["The lower side", "The sea side", "No side"], why: "He entered from its higher side." },
        { q: "Did he ﷺ leave the same way?", a: "No, from the lower side", wrong: ["Yes, the same", "He never left", "By ship"], why: "And left from its lower side." },
        { q: "Aishah told this hadith.", tf: true, why: "Sahih al-Bukhari 1577." }
      ]
    },
    {
      slug: "ramal-in-three-rounds",
      title: "Brisk in three rounds",
      line: "In the first three rounds of tawaf he ﷺ walked briskly.",
      facts: ["Called ramal", "Told by Ibn Umar"],
      source: hadith("bukhari", "1604", "Abdullah ibn Umar", "Sahih", "Ibn Umar said the Prophet ﷺ did ramal, a brisk walk, in the first three rounds of tawaf and walked in the other four, in Hajj and Umrah.", "did Ramal in (first) three rounds (of Tawaf), and walked in the remaining four"),
      difficulty: 2,
      questions: [
        { q: "In how many rounds is ramal done?", a: "The first three", wrong: ["All seven", "The last two", "None"], why: "He did ramal in the first three rounds." },
        { q: "What about the other four rounds?", a: "Normal walking", wrong: ["Running fast", "Sitting", "Crawling"], why: "He walked in the remaining four." },
        { q: "A tawaf has seven rounds.", tf: true, why: "Three with ramal and four walking. Sahih al-Bukhari 1604." }
      ]
    },
    {
      slug: "the-two-yemeni-corners",
      title: "The two corners he touched",
      line: "He ﷺ touched only the two Yemen-side corners of the Ka'bah.",
      facts: ["The Black Stone and Yemeni corners", "Told by Ibn Umar"],
      source: hadith("bukhari", "1609", "Abdullah ibn Umar", "Sahih", "Ibn Umar said he never saw the Prophet ﷺ touch any part of the Ka'bah except the two corners facing Yemen.", "touching except the two Yemenite Corners"),
      difficulty: 3,
      questions: [
        { q: "Which corners did he ﷺ touch?", a: "The two facing Yemen", wrong: ["All four", "None", "Only the Syrian ones"], why: "Touching except the two Yemenite corners." },
        { q: "The Black Stone sits in one of...?", a: "Those two corners", wrong: ["The roof", "The door", "The Hijr"], why: "The two Yemeni-side corners are the Black Stone corner and the Yemeni corner." },
        { q: "Ibn Umar watched closely how he ﷺ did tawaf.", tf: true, why: "Sahih al-Bukhari 1609." }
      ]
    },
    {
      slug: "two-rakahs-at-mina",
      title: "Two rak'ahs at Mina",
      line: "At Mina he ﷺ shortened the four-rak'ah prayers to two.",
      facts: ["Even in safety", "Told by Harithah ibn Wahb"],
      source: hadith("bukhari", "1656", "Harithah ibn Wahb", "Sahih", "Harithah said: the Prophet ﷺ led us in two rak'ahs at Mina, though we were more and safer than ever.", "led us in a two-rak`at prayer at Mina"),
      difficulty: 2,
      questions: [
        { q: "How many rak'ahs did he ﷺ pray at Mina?", a: "Two", wrong: ["Four", "Six", "One"], why: "He led us in a two-rak'at prayer at Mina." },
        { q: "Were they in danger then?", a: "No, safer than ever", wrong: ["Yes, in war", "Yes, in a storm", "They were hiding"], why: "We were in better security than ever." },
        { q: "Shortening prayer was a gift, not only for fear.", tf: true, why: "Sahih al-Bukhari 1656." }
      ]
    },
    {
      slug: "maghrib-and-isha-together",
      title: "Maghrib and Isha together",
      line: "At Muzdalifah he ﷺ prayed Maghrib and Isha together.",
      facts: ["The night after Arafah", "Told by Abu Ayyub"],
      source: hadith("bukhari", "1674", "Abu Ayyub al-Ansari", "Sahih", "Abu Ayyub said: the Prophet ﷺ prayed Maghrib and Isha together at Muzdalifah.", "prayers together at Al-Muzdalifa"),
      difficulty: 1,
      questions: [
        { q: "Which prayers were joined at Muzdalifah?", a: "Maghrib and Isha", wrong: ["Fajr and Dhuhr", "Dhuhr and Asr", "Asr and Maghrib"], why: "He offered the Maghrib and Isha prayers together at Muzdalifah." },
        { q: "Muzdalifah comes after...?", a: "The day of Arafah", wrong: ["Eid prayer", "Farewell tawaf", "Umrah"], why: "Pilgrims go to Muzdalifah on the night after Arafah." },
        { q: "Abu Ayyub al-Ansari told this hadith.", tf: true, why: "Sahih al-Bukhari 1674." }
      ]
    },
    {
      slug: "the-weak-go-early",
      title: "The weak go early",
      line: "He ﷺ let the weak of his family leave Muzdalifah early at night.",
      facts: ["Ease for the weak", "Told by Ibn Abbas"],
      source: hadith("bukhari", "1678", "Abdullah ibn Abbas", "Sahih", "Ibn Abbas said: I was among the weak of his family whom the Prophet ﷺ sent early on the night of Muzdalifah.", "sent on the night of Al-Muzdalifa early being among the weak members of his family"),
      difficulty: 2,
      questions: [
        { q: "Who was sent early from Muzdalifah?", a: "The weak of his family", wrong: ["The strongest men", "Only the camels", "No one"], why: "Among the weak members of his family." },
        { q: "What does this show about Islam?", a: "It eases things for the weak", wrong: ["It is always hard", "Rules never change", "Only the rich matter"], why: "He sent the weak early to spare them the crowds." },
        { q: "Ibn Abbas was a boy then.", tf: true, why: "He was among the weak of the family. Sahih al-Bukhari 1678." }
      ]
    },
    {
      slug: "shave-or-shorten",
      title: "Shave or shorten",
      line: "After Hajj, some shaved their heads and some cut it short.",
      facts: ["He ﷺ shaved", "Told by Ibn Umar"],
      source: hadith("bukhari", "1729", "Abdullah ibn Umar", "Sahih", "Ibn Umar said: the Prophet ﷺ and some companions shaved their heads, and others cut their hair short.", "got their heads shaved and some others got their hair cut short"),
      difficulty: 1,
      questions: [
        { q: "What did the men do with their hair?", a: "Shaved or shortened it", wrong: ["Dyed it", "Braided it", "Nothing"], why: "Some got their heads shaved and some cut their hair short." },
        { q: "What did the Prophet ﷺ do?", a: "He shaved his head", wrong: ["He left it", "He dyed it", "He cut one side"], why: "The Prophet ﷺ and some companions got their heads shaved." },
        { q: "Both shaving and shortening were done.", tf: true, why: "Sahih al-Bukhari 1729." }
      ]
    },
    {
      slug: "no-harm-in-the-order",
      title: "No harm in the order",
      line: "Rites done out of order on Eid? He ﷺ said: no harm.",
      facts: ["Sacrifice, shaving, stoning", "Told by Ibn Abbas"],
      source: hadith("bukhari", "1734", "Abdullah ibn Abbas", "Sahih", "The Prophet ﷺ was asked about the sacrifice, shaving and stoning done before or after their time, and he said: there is no harm in that.", "There is no harm in that"),
      difficulty: 3,
      questions: [
        { q: "What did he ﷺ say about the mixed-up order?", a: "No harm", wrong: ["Redo Hajj", "Pay a big fine", "Leave Makkah"], why: "There is no harm in that." },
        { q: "Which rites were asked about?", a: "Sacrifice, shaving and stoning", wrong: ["Fasting and zakat", "Wudu and adhan", "Trade and travel"], why: "About the sacrifice, shaving and the stoning." },
        { q: "He ﷺ made Hajj easy for people.", tf: true, why: "Sahih al-Bukhari 1734." }
      ]
    },
    {
      slug: "the-farewell-tawaf",
      title: "The farewell tawaf",
      line: "The last thing before leaving Makkah is the farewell tawaf.",
      facts: ["Women in their period are excused", "Told by Ibn Abbas"],
      source: hadith("bukhari", "1755", "Abdullah ibn Abbas", "Sahih", "Ibn Abbas said: people were told to make tawaf of the Ka'bah the last thing before leaving, except women in their period, who were excused.", "the Tawaf of the Ka`ba (Tawaf-al-Wada`) as the lastly thing, before leaving"),
      difficulty: 2,
      questions: [
        { q: "What is the last rite before leaving Makkah?", a: "The farewell tawaf", wrong: ["Stoning", "Shaving", "Fasting"], why: "Tawaf al-Wada as the last thing before leaving." },
        { q: "Who is excused from it?", a: "Women in their period", wrong: ["The rich", "Young men", "No one"], why: "Except the menstruating women who were excused." },
        { q: "The farewell tawaf is done on arrival in Makkah.", tf: false, why: "It is the last thing before leaving. Sahih al-Bukhari 1755." }
      ]
    }
  ]
};

const OATHS: DeepUnit = {
  key: "book-oaths",
  topicId: "sahihayn",
  branchId: "hadith-book-ayman",
  branch: { title: "The Book of Oaths and Vows", description: "From the Books of Oaths and Vows: swearing only by Allah, breaking an oath for something better, and keeping vows of good." },
  name: "the Book of Oaths",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "do-what-is-better",
      title: "Do what is better",
      line: "If a better choice comes, take it and expiate your oath.",
      facts: ["Abu Bakr kept every oath", "Told by Aisha"],
      source: hadith("bukhari", "6621", "Aisha", "Sahih", "Abu Bakr never broke an oath until Allah revealed the expiation. Then he said: if I swear to do something and find something better, I do what is better and expiate my oath.", "then I do what is better and make expiation for my oath"),
      difficulty: 1,
      questions: [
        { q: "What did Abu Bakr do when a better choice came?", a: "Did the better thing and expiated", wrong: ["Kept the oath no matter what", "Forgot the oath", "Made a new oath"], why: "Then I do what is better and make expiation for my oath." },
        { q: "Before the expiation came, did Abu Bakr break oaths?", a: "Never", wrong: ["Often", "Only in trade", "Only when angry"], why: "Abu Bakr had never broken his oaths till Allah revealed the expiation." },
        { q: "An oath can be broken for something better, with expiation.", tf: true, why: "Sahih al-Bukhari 6621." }
      ]
    },
    {
      slug: "an-oath-that-harms-family",
      title: "An oath that harms family",
      line: "Keeping an oath that harms your family is a bigger sin.",
      facts: ["Better to expiate it", "Told by Abu Hurairah"],
      source: hadith("bukhari", "6625", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: whoever insists on keeping an oath that harms his family commits a greater sin than breaking it and making expiation.", "than that of dissolving his oath and making expiation for it"),
      difficulty: 2,
      questions: [
        { q: "What is the bigger sin here?", a: "Keeping an oath that harms family", wrong: ["Making expiation", "Talking to family", "Giving charity"], why: "He commits a greater sin than dissolving his oath and making expiation." },
        { q: "What should he do instead?", a: "Break it and expiate", wrong: ["Swear again", "Leave home", "Stay silent"], why: "Dissolving his oath and making expiation for it." },
        { q: "Our family should not be hurt by our oaths.", tf: true, why: "Sahih al-Bukhari 6625." }
      ]
    },
    {
      slug: "swear-by-allah-or-be-quiet",
      title: "Swear by Allah or be quiet",
      line: "Do not swear by your fathers. Swear by Allah or keep quiet.",
      facts: ["Said to Umar on a journey", "Told by Ibn Umar"],
      source: hadith("bukhari", "6646", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ met Umar swearing by his father and said: Allah forbids you to swear by your fathers. Whoever swears, let him swear by Allah or keep quiet.", "he should swear by Allah or keep quiet"),
      difficulty: 1,
      questions: [
        { q: "Who may we swear by?", a: "Allah only", wrong: ["Our fathers", "Our teachers", "Our country"], why: "Whoever has to take an oath should swear by Allah or keep quiet." },
        { q: "Who was swearing by his father?", a: "Umar", wrong: ["Abu Bakr", "Ali", "Bilal"], why: "He met Umar bin Al-Khattab, who was swearing by his father." },
        { q: "Swearing by your father is fine in Islam.", tf: false, why: "Allah forbids you to swear by your fathers. Sahih al-Bukhari 6646." }
      ]
    },
    {
      slug: "fix-a-wrong-oath",
      title: "Fix a wrong oath",
      line: "Swore by an idol by mistake? Say la ilaha illallah.",
      facts: ["Wiping out the wrong words", "Told by Abu Hurairah"],
      source: hadith("bukhari", "6650", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: whoever swears by Al-Lat and Al-Uzza should say: none has the right to be worshipped but Allah. And whoever invites a friend to gamble should give something in charity.", "None has the right to be worshipped but Allah"),
      difficulty: 2,
      questions: [
        { q: "What should one say after swearing by an idol?", a: "La ilaha illallah", wrong: ["Nothing", "Another oath", "A poem"], why: "He should say: None has the right to be worshipped but Allah." },
        { q: "What should one do after inviting a friend to gamble?", a: "Give something in charity", wrong: ["Gamble once", "Run away", "Sleep"], why: "Whoever says to his friend, come, let me gamble with you, should give something in charity." },
        { q: "A wrong word can be followed by a good one to fix it.", tf: true, why: "Sahih al-Bukhari 6650." }
      ]
    },
    {
      slug: "help-others-keep-oaths",
      title: "Help others keep oaths",
      line: "He ﷺ told us to help others keep their oaths.",
      facts: ["Helping a brother keep his word", "Told by al-Bara"],
      source: hadith("bukhari", "6654", "Al-Bara ibn Azib", "Sahih", "The Prophet ﷺ ordered us to help others fulfil their oaths.", "The Prophet (ﷺ) ordered us to help others to fulfill the oaths"),
      difficulty: 1,
      questions: [
        { q: "What were we told to help others with?", a: "Keeping their oaths", wrong: ["Breaking oaths", "Making more oaths", "Hiding oaths"], why: "He ordered us to help others to fulfill the oaths." },
        { q: "Who told this hadith?", a: "Al-Bara ibn Azib", wrong: ["Anas", "Aisha", "Jabir"], why: "Narrated Al-Bara." },
        { q: "Helping a friend keep his word is a good deed.", tf: true, why: "Sahih al-Bukhari 6654." }
      ]
    },
    {
      slug: "thoughts-are-forgiven",
      title: "Bad thoughts are forgiven",
      line: "Bad thoughts are forgiven if you do not act or speak.",
      facts: ["A mercy for this Ummah", "Told by Abu Hurairah"],
      source: hadith("bukhari", "6664", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: Allah forgives my Ummah the bad things their souls whisper to them, as long as they do not act on it or speak it.", "as long as they do not act (on it) or speak"),
      difficulty: 1,
      questions: [
        { q: "When are bad whispers forgiven?", a: "If we do not act or speak", wrong: ["Never", "Only on Friday", "Only if we tell people"], why: "As long as they do not act on it or speak." },
        { q: "Who forgives these whispers?", a: "Allah", wrong: ["Our friends", "Our teachers", "No one"], why: "Allah forgives my followers what their souls whisper." },
        { q: "A passing bad thought is written as a sin.", tf: false, why: "It is forgiven unless we act or speak. Sahih al-Bukhari 6664." }
      ]
    },
    {
      slug: "a-vow-changes-nothing",
      title: "A vow changes nothing",
      line: "A vow does not change what Allah has decreed.",
      facts: ["It only takes wealth from a miser", "Told by Ibn Umar"],
      source: hadith("bukhari", "6692", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ said: a vow neither brings a thing sooner nor later, but through vows some wealth is taken out of a miser.", "A vow neither hastens nor delays anything"),
      difficulty: 2,
      questions: [
        { q: "Does a vow bring something sooner?", a: "No, it changes nothing", wrong: ["Yes, always", "Only big vows", "Only at night"], why: "A vow neither hastens nor delays anything." },
        { q: "Who loses wealth through vows?", a: "The miser", wrong: ["The poor", "The traveller", "The orphan"], why: "By the making of vows, some of the wealth of a miser is taken out." },
        { q: "Making a vow forces Allah to give us what we want.", tf: false, why: "A vow neither hastens nor delays anything. Sahih al-Bukhari 6692." }
      ]
    },
    {
      slug: "umars-old-vow",
      title: "Umar's old vow",
      line: "Umar vowed i'tikaf before Islam. He was told: fulfil it.",
      facts: ["A night in al-Masjid al-Haram", "Told by Ibn Umar"],
      source: hadith("bukhari", "6697", "Abdullah ibn Umar", "Sahih", "Umar said: I vowed before Islam to do i'tikaf for one night in al-Masjid al-Haram. The Prophet ﷺ said: fulfil your vow.", "Fulfill your vow"),
      difficulty: 2,
      questions: [
        { q: "What had Umar vowed?", a: "One night of i'tikaf", wrong: ["A month of fasting", "A trip to Sham", "To build a well"], why: "I vowed to perform I'tikaf for one night in Al-Masjid-al-Haram." },
        { q: "What was he told?", a: "Fulfil your vow", wrong: ["Forget it", "Pay money instead", "Do it twice"], why: "The Prophet ﷺ said: Fulfill your vow." },
        { q: "A good vow should be kept.", tf: true, why: "Sahih al-Bukhari 6697." }
      ]
    },
    {
      slug: "allahs-right-comes-first",
      title: "Allah's right comes first",
      line: "A sister's vowed Hajj is like a debt. Allah's right comes first.",
      facts: ["Fulfil it for the one who died", "Told by Ibn Abbas"],
      source: hadith("bukhari", "6699", "Abdullah ibn Abbas", "Sahih", "A man said his sister vowed Hajj and died. The Prophet ﷺ said: would you not pay her debts? Then pay Allah's right, for He is more entitled to His right.", "as He is more entitled to receive His rights"),
      difficulty: 2,
      questions: [
        { q: "What did his sister vow?", a: "To do Hajj", wrong: ["To fast a year", "To build a masjid", "To free a slave"], why: "My sister vowed to perform the Hajj, but she died." },
        { q: "What was the vow compared to?", a: "A debt", wrong: ["A gift", "A dream", "A promise to a friend"], why: "Would you not have paid her debts if she had any?" },
        { q: "Allah is more entitled to His right than people.", tf: true, why: "Sahih al-Bukhari 6699." }
      ]
    },
    {
      slug: "no-hurting-yourself",
      title: "No hurting yourself",
      line: "He ﷺ cut the rope of a man tied up during tawaf.",
      facts: ["Worship is not self-harm", "Told by Ibn Abbas"],
      source: hadith("bukhari", "6702", "Abdullah ibn Abbas", "Sahih", "The Prophet ﷺ saw a man doing tawaf tied with a rope while another held him, and he cut the rope.", "The Prophet (ﷺ) cut that rope off"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ do to the rope?", a: "Cut it off", wrong: ["Tied it tighter", "Left it", "Gave it away"], why: "The Prophet ﷺ cut that rope off." },
        { q: "Where was the man?", a: "Doing tawaf at the Kaaba", wrong: ["In the market", "At home", "On a ship"], why: "A man was performing Tawaf around the Kaaba, tied with a rope." },
        { q: "Hard ways that hurt us are not part of worship.", tf: true, why: "Sahih al-Bukhari 6702." }
      ]
    },
    {
      slug: "no-fasting-on-eid",
      title: "No fasting on Eid",
      line: "Even if you vowed to fast daily, do not fast on Eid.",
      facts: ["He ﷺ never fasted on Eid", "Told by Ibn Umar"],
      source: hadith("bukhari", "6705", "Abdullah ibn Umar", "Sahih", "Ibn Umar was asked about a man who vowed to fast every day, then Eid came. He said: the Prophet ﷺ did not fast on Eid al-Adha or Eid al-Fitr, and we do not fast on them.", "He did not fast on the day of `Id al Adha or the day of `Id-al-Fitr"),
      difficulty: 2,
      questions: [
        { q: "What had the man vowed?", a: "To fast every day", wrong: ["To pray all night", "To give all his wealth", "To travel"], why: "A man vowed that he would fast all the days of his life." },
        { q: "Which days are not for fasting?", a: "The two Eids", wrong: ["Mondays", "White days", "Ashura"], why: "He did not fast on the day of Id al-Adha or the day of Id al-Fitr." },
        { q: "A vow can make fasting on Eid allowed.", tf: false, why: "Even then, do not fast on Eid. Sahih al-Bukhari 6705." }
      ]
    },
    {
      slug: "keep-some-of-your-wealth",
      title: "Keep some of your wealth",
      line: "Ka'b wanted to give all he had. He was told: keep some.",
      facts: ["After his repentance from Tabuk", "Told by Ka'b ibn Malik"],
      source: hadith("bukhari", "6690", "Ka'b ibn Malik", "Sahih", "When his repentance was accepted, Ka'b wanted to give all his property for Allah. The Prophet ﷺ said: keep some of your wealth, that is better for you.", "Keep some of your wealth, for that is better for you"),
      difficulty: 2,
      questions: [
        { q: "What did Ka'b want to give away?", a: "All his property", wrong: ["Half his food", "His sword", "His horse only"], why: "I shall give up all my property for the sake of Allah and His Apostle." },
        { q: "What was he told?", a: "Keep some of your wealth", wrong: ["Give it all", "Give nothing", "Sell it"], why: "Keep some of your wealth, for that is better for you." },
        { q: "Islam asks us to leave ourselves with nothing.", tf: false, why: "Keeping some is better for you. Sahih al-Bukhari 6690." }
      ]
    }
  ]
};

const WILLS: DeepUnit = {
  key: "book-wills",
  topicId: "sahihayn",
  branchId: "hadith-book-wasaya",
  branch: { title: "The Book of Wills", description: "From the Books of Wills: writing a will, the one-third limit, charity for those who died, and endowments." },
  name: "the Book of Wills",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "keep-your-will-ready",
      title: "Keep your will ready",
      line: "A Muslim with something to leave should have his will written.",
      facts: ["Not two nights without it", "Told by Ibn Umar"],
      source: hadith("bukhari", "2738", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ said: a Muslim who has something to leave in a will should not spend two nights without having it written and ready.", "without having his last will and testament written and kept ready with him"),
      difficulty: 1,
      questions: [
        { q: "What should a Muslim keep ready?", a: "A written will", wrong: ["A packed bag", "A new house", "A big feast"], why: "His last will and testament written and kept ready with him." },
        { q: "For how long should he not be without it?", a: "Two nights", wrong: ["Two years", "Ten days", "One month"], why: "To stay for two nights without having his last will written." },
        { q: "Writing a will early is part of being ready for death.", tf: true, why: "Sahih al-Bukhari 2738." }
      ]
    },
    {
      slug: "what-he-left-behind",
      title: "What he ﷺ left behind",
      line: "He ﷺ left no money, just a mule, arms and land in charity.",
      facts: ["He did not gather wealth", "Told by Amr ibn al-Harith"],
      source: hadith("bukhari", "2739", "Amr ibn al-Harith", "Sahih", "When the Prophet ﷺ died he left no dirham or dinar, only his white mule, his weapons and a piece of land he had given in charity.", "except his white mule, his arms and a piece of land which he had given in charity"),
      difficulty: 1,
      questions: [
        { q: "How much money did he ﷺ leave?", a: "None", wrong: ["A chest of gold", "A thousand dinars", "Many houses"], why: "He did not leave any Dirham or Dinar." },
        { q: "What colour was his mule?", a: "White", wrong: ["Black", "Brown", "Grey"], why: "Except his white mule." },
        { q: "His land was given in charity.", tf: true, why: "Sahih al-Bukhari 2739." }
      ]
    },
    {
      slug: "he-left-us-the-quran",
      title: "He left us the Quran",
      line: "Asked about his will: he ﷺ left us the Book of Allah.",
      facts: ["The Quran is his legacy", "Told by Ibn Abi Awfa"],
      source: hadith("bukhari", "2740", "Abdullah ibn Abi Awfa", "Sahih", "Talhah asked Ibn Abi Awfa whether the Prophet ﷺ made a will. He said the Prophet ﷺ left as his will the Book of Allah.", "The Prophet (ﷺ) bequeathed Allah"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ leave as his will?", a: "The Book of Allah", wrong: ["A palace", "A sword", "A letter of rulers"], why: "The Prophet ﷺ bequeathed Allah's Book." },
        { q: "Who was asked the question?", a: "Ibn Abi Awfa", wrong: ["Abu Bakr", "Umar", "Zayd"], why: "I asked Abdullah bin Abu Aufa." },
        { q: "Holding on to the Quran keeps his will.", tf: true, why: "Sahih al-Bukhari 2740." }
      ]
    },
    {
      slug: "one-third-is-a-lot",
      title: "One third is a lot",
      line: "Will away one third at most, and even that is a lot.",
      facts: ["The rest goes to heirs", "Told by Ibn Abbas"],
      source: hadith("bukhari", "2743", "Abdullah ibn Abbas", "Sahih", "Ibn Abbas advised people to will less than a third, because the Prophet ﷺ said: one third, and one third is a lot.", "One-third, yet even one third is too much"),
      difficulty: 2,
      questions: [
        { q: "What is the most a will can give away?", a: "One third", wrong: ["One half", "All of it", "Two thirds"], why: "One-third, yet even one third is too much." },
        { q: "What did Ibn Abbas advise?", a: "Giving less than a third", wrong: ["Giving all", "Giving nothing", "Giving half"], why: "I recommend that people reduce what they bequeath to the fourth." },
        { q: "A person may will all his wealth away from his heirs.", tf: false, why: "Up to one third only. Sahih al-Bukhari 2743." }
      ]
    },
    {
      slug: "a-garden-for-his-mother",
      title: "A garden for his mother",
      line: "Sa'd gave his garden in charity for his mother after she died.",
      facts: ["Charity reaches those who died", "Told by Ibn Abbas"],
      source: hadith("bukhari", "2756", "Abdullah ibn Abbas", "Sahih", "Sa'd ibn Ubadah's mother died while he was away. He asked if charity for her would help. The Prophet ﷺ said yes, so Sa'd gave his garden al-Makhraf in charity for her.", "I gave my garden called Al Makhraf in charity on her behalf"),
      difficulty: 1,
      questions: [
        { q: "What did Sa'd give for his mother?", a: "His garden", wrong: ["His horse", "His house", "His sword"], why: "I gave my garden called Al Makhraf in charity on her behalf." },
        { q: "Does charity help a parent who died?", a: "Yes", wrong: ["No", "Only for kings", "Only in Ramadan"], why: "Will it benefit her? The Prophet ﷺ said: Yes." },
        { q: "We can still do good for our parents after they die.", tf: true, why: "Sahih al-Bukhari 2756." }
      ]
    },
    {
      slug: "charity-for-a-father",
      title: "Charity for a father",
      line: "A father died without a will. Charity for him helps him.",
      facts: ["It can lift his burden", "Told by Abu Hurairah"],
      source: hadith("muslim", "1630", "Abu Hurairah", "Sahih", "A man said: my father died and left property without a will. Will it remove his sins if I give charity for him? The Prophet ﷺ said: yes.", "He (the Holy Prophet) said: Yes"),
      difficulty: 1,
      questions: [
        { q: "What had the father not done?", a: "Made a will", wrong: ["Prayed", "Fasted", "Married"], why: "My father died and left behind property without making any will." },
        { q: "What did the son ask about giving?", a: "Charity for his father", wrong: ["A gift to a king", "Money to himself", "A new house"], why: "Would he be relieved if I give sadaqa on his behalf?" },
        { q: "Charity for a parent who died can help them.", tf: true, why: "Sahih Muslim 1630." }
      ]
    },
    {
      slug: "the-price-from-allah",
      title: "The price is from Allah",
      line: "For the masjid land they said: our price is from Allah.",
      facts: ["The land of the Masjid of the Prophet ﷺ", "Told by Anas"],
      source: hadith("bukhari", "2774", "Anas ibn Malik", "Sahih", "When the Prophet ﷺ came to Madinah he asked Banu an-Najjar the price of their garden for the masjid. They said: by Allah, we ask its price only from Allah.", "we will not ask its price except from Allah"),
      difficulty: 1,
      questions: [
        { q: "What was the land for?", a: "Building the masjid", wrong: ["A market", "A palace", "A farm"], why: "When he came to Medina, he ordered that a mosque be built." },
        { q: "Who would they ask the price from?", a: "Allah", wrong: ["The Prophet ﷺ", "The rich", "Nobody ever"], why: "We will not ask its price except from Allah." },
        { q: "Giving land for a masjid is a lasting charity.", tf: true, why: "Sahih al-Bukhari 2774." }
      ]
    },
    {
      slug: "no-money-for-heirs",
      title: "No money for his heirs",
      line: "His heirs get no money. What he left is charity.",
      facts: ["After his wives and workers are cared for", "Told by Abu Hurairah"],
      source: hadith("bukhari", "2776", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: my heirs will not inherit a dinar or dirham. What I leave, after support for my wives and wages of my workers, is charity.", "for whatever I leave (excluding the adequate support of my wives and the wages of my employees) is given in charity"),
      difficulty: 2,
      questions: [
        { q: "What happens to what he ﷺ left?", a: "It is charity", wrong: ["It goes to his heirs", "It is buried", "It goes to kings"], why: "Whatever I leave is given in charity." },
        { q: "Who is cared for first?", a: "His wives and workers", wrong: ["Traders", "Soldiers", "Visitors"], why: "Excluding the adequate support of my wives and the wages of my employees." },
        { q: "The heirs of the Prophet ﷺ inherit his money.", tf: false, why: "My heirs will not inherit a Dinar or a Dirham. Sahih al-Bukhari 2776." }
      ]
    },
    {
      slug: "the-keeper-of-a-waqf",
      title: "The keeper of a waqf",
      line: "Umar's waqf keeper could eat from it but not store for himself.",
      facts: ["A waqf is a lasting endowment", "Told by Ibn Umar"],
      source: hadith("bukhari", "2777", "Abdullah ibn Umar", "Sahih", "When Umar set up an endowment, he said its keeper may eat from it and feed a friend, as long as he stores nothing for himself.", "on the condition that he would not store anything for himself from it"),
      difficulty: 2,
      questions: [
        { q: "What could the keeper do?", a: "Eat from it and feed a friend", wrong: ["Sell it", "Keep all of it", "Close it"], why: "Its administrator could eat from it and also feed his friend." },
        { q: "What could he not do?", a: "Store things for himself", wrong: ["Eat from it", "Work in it", "Visit it"], why: "On the condition that he would not store anything for himself." },
        { q: "A waqf keeps giving after the giver is gone.", tf: true, why: "Sahih al-Bukhari 2777." }
      ]
    },
    {
      slug: "jabirs-fathers-debts",
      title: "Jabir's father's debts",
      line: "Jabir's father died in debt. He ﷺ helped pay it with dates.",
      facts: ["Debts are paid before shares", "Told by Jabir"],
      source: hadith("bukhari", "2781", "Jabir ibn Abdullah", "Sahih", "Jabir's father died at Uhud leaving six daughters and debts. The Prophet ﷺ came at harvest, walked around the biggest heap of dates three times and sat on it, and the debts were paid.", "he went round the biggest heap for three times and sat over it"),
      difficulty: 2,
      questions: [
        { q: "What did Jabir's father leave?", a: "Six daughters and debts", wrong: ["A big palace", "Many camels", "No family"], why: "He left six daughters and some debts to be paid." },
        { q: "What did he ﷺ do at the dates?", a: "Went round the biggest heap", wrong: ["Sold them", "Left them", "Ate them all"], why: "He went round the biggest heap for three times and sat over it." },
        { q: "Paying a dead person's debts matters in Islam.", tf: true, why: "Sahih al-Bukhari 2781." }
      ]
    }
  ]
};

const QURAN_VIRTUES: DeepUnit = {
  key: "book-quran-virtues",
  topicId: "sahihayn",
  branchId: "hadith-book-quran",
  branch: { title: "The Book of the Virtues of the Quran", description: "From the Books of the Virtues of the Quran: learning it, keeping it, reciting it well, and its reward." },
  name: "the Book of the Quran",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "learned-before-he-came",
      title: "Learned before he ﷺ came",
      line: "Al-Bara learned Surah al-A'la before he ﷺ reached Madinah.",
      facts: ["Madinah learned Quran early", "Told by al-Bara"],
      source: hadith("bukhari", "4995", "Al-Bara ibn Azib", "Sahih", "Al-Bara said: I learned Surah al-A'la (Glorify the Name of your Lord, the Most High) before the Prophet ﷺ came to Madinah.", "before the Prophet (ﷺ) came (to Medina)"),
      difficulty: 1,
      questions: [
        { q: "Which surah did al-Bara learn early?", a: "Surah al-A'la", wrong: ["Surah al-Baqarah", "Surah Yusuf", "Surah al-Kahf"], why: "I learnt, Glorify the Name of your Lord the Most High (Surat al-A'la)." },
        { q: "When did he learn it?", a: "Before he ﷺ came to Madinah", wrong: ["After the conquest", "In his old age", "After Hajj"], why: "Before the Prophet ﷺ came to Medina." },
        { q: "Young Companions learned the Quran early.", tf: true, why: "Sahih al-Bukhari 4995." }
      ]
    },
    {
      slug: "recite-in-a-pleasant-voice",
      title: "Recite in a pleasant voice",
      line: "Allah loves to hear the Quran recited in a pleasant voice.",
      facts: ["A beautiful, clear voice", "Told by Abu Hurairah"],
      source: hadith("bukhari", "5023", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: Allah does not listen to anything as He listens to a prophet reciting the Quran in a pleasant voice.", "in a pleasant tone"),
      difficulty: 2,
      questions: [
        { q: "How should the Quran be recited?", a: "In a pleasant voice", wrong: ["Very fast", "Angrily", "Without care"], why: "A prophet who recites the Quran in a pleasant tone." },
        { q: "Who told this hadith?", a: "Abu Hurairah", wrong: ["Anas", "Jabir", "Ibn Umar"], why: "Narrated Abu Huraira." },
        { q: "Making our recitation beautiful is loved.", tf: true, why: "Sahih al-Bukhari 5023." }
      ]
    },
    {
      slug: "like-tied-camels",
      title: "Like tied camels",
      line: "Keep the Quran you memorised like camels you keep tied.",
      facts: ["Let go and it runs away", "Told by Ibn Umar"],
      source: hadith("bukhari", "5031", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ said: one who knows the Quran by heart is like the owner of tied camels. If he keeps them tied he keeps them, and if he lets them go they run away.", "but if he releases them, they will run away"),
      difficulty: 1,
      questions: [
        { q: "What is a hafiz compared to?", a: "An owner of tied camels", wrong: ["A rich trader", "A sailor", "A builder"], why: "Like the owner of tied camels." },
        { q: "What happens if the camels are let go?", a: "They run away", wrong: ["They sleep", "They come home", "They grow"], why: "If he releases them, they will run away." },
        { q: "Memorised Quran needs regular review.", tf: true, why: "Sahih al-Bukhari 5031." }
      ]
    },
    {
      slug: "it-slips-away-fast",
      title: "It slips away fast",
      line: "Keep reviewing the Quran. It slips away faster than a camel.",
      facts: ["He ﷺ swore by Allah on it", "Told by Abu Musa"],
      source: hadith("bukhari", "5033", "Abu Musa al-Ash'ari", "Sahih", "The Prophet ﷺ said: keep reviewing the Quran, for by Him in whose Hand is my soul, it slips away faster than a camel from its rope.", "it is surely more prone to break away than a camel in its bind"),
      difficulty: 1,
      questions: [
        { q: "What slips away faster than a camel?", a: "The Quran we memorised", wrong: ["Our money", "Our friends", "Our time"], why: "It is surely more prone to break away than a camel." },
        { q: "What are we told to do?", a: "Keep reviewing it", wrong: ["Memorise once only", "Hide it", "Leave it"], why: "Commit yourself to the Qur'an." },
        { q: "Once memorised, the Quran never leaves us.", tf: false, why: "It slips away if not reviewed. Sahih al-Bukhari 5033." }
      ]
    },
    {
      slug: "a-reciter-reminded-him",
      title: "A reciter reminded him ﷺ",
      line: "He ﷺ heard a man recite and prayed for mercy for him.",
      facts: ["Reciting aloud can help others", "Told by Aisha"],
      source: hadith("bukhari", "5037", "Aisha", "Sahih", "The Prophet ﷺ heard a man reciting in the masjid and said: may Allah have mercy on him, he reminded me of such and such verses.", "May Allah bestow His Mercy on him"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ say about the reciter?", a: "May Allah have mercy on him", wrong: ["Be quiet", "Go home", "Recite faster"], why: "May Allah bestow His Mercy on him." },
        { q: "Where was the man reciting?", a: "In the masjid", wrong: ["In the market", "On a ship", "In a garden"], why: "He heard a man reciting the Quran in the mosque." },
        { q: "Hearing others recite can remind us of verses.", tf: true, why: "Sahih al-Bukhari 5037." }
      ]
    },
    {
      slug: "say-i-was-made-to-forget",
      title: "Say I was made to forget",
      line: "Don't say I forgot verses. Say I was made to forget.",
      facts: ["Mind how we speak of the Quran", "Told by Ibn Mas'ud"],
      source: hadith("bukhari", "5039", "Abdullah ibn Mas'ud", "Sahih", "The Prophet ﷺ said: why does one of you say I have forgotten such and such verses? Rather, he was made to forget.", "He, in fact, is caused (by Allah) to forget"),
      difficulty: 3,
      questions: [
        { q: "What should one say instead of I forgot?", a: "I was made to forget", wrong: ["I never knew it", "It does not matter", "Nothing at all"], why: "He, in fact, is caused by Allah to forget." },
        { q: "Who told this hadith?", a: "Ibn Mas'ud", wrong: ["Abu Bakr", "Anas", "Salman"], why: "Narrated Abdullah (ibn Mas'ud)." },
        { q: "We should speak about the Quran with care.", tf: true, why: "Sahih al-Bukhari 5039." }
      ]
    },
    {
      slug: "recite-while-hearts-agree",
      title: "Recite while hearts agree",
      line: "Read the Quran while hearts agree. If you argue, get up.",
      facts: ["Do not argue over the Quran", "Told by Jundub"],
      source: hadith("bukhari", "5061", "Jundub ibn Abdullah", "Sahih", "The Prophet ﷺ said: recite the Quran as long as your hearts agree on it, and when you differ about it, stop for the time being.", "then you should stop reciting it (for the time being)"),
      difficulty: 3,
      questions: [
        { q: "When should we stop for a while?", a: "When we start to argue", wrong: ["When it is hot", "When we are hungry", "Never"], why: "When you have any difference of opinion, stop reciting for the time being." },
        { q: "When do we keep reciting together?", a: "While our hearts agree", wrong: ["While we fight", "While we shout", "While we compete"], why: "Recite the Quran as long as you agree." },
        { q: "Arguing over the Quran is a good way to study it.", tf: false, why: "Stop and calm down. Sahih al-Bukhari 5061." }
      ]
    },
    {
      slug: "ibn-abbas-at-ten",
      title: "Ibn Abbas at ten",
      line: "Ibn Abbas was ten and had learned the short surahs by heart.",
      facts: ["Al-Mufassal: the short surahs at the end", "Told by Sa'id ibn Jubayr"],
      source: hadith("bukhari", "5035", "Abdullah ibn Abbas", "Sahih", "Ibn Abbas said: the Prophet ﷺ died when I was a boy of ten, and I had learned the Muhkam, the short surahs called al-Mufassal.", "when I was a boy of ten years, and I had learnt the Muhkam"),
      difficulty: 2,
      questions: [
        { q: "How old was Ibn Abbas then?", a: "Ten years old", wrong: ["Twenty", "Five", "Forty"], why: "I was a boy of ten years." },
        { q: "What had he learned?", a: "The short surahs", wrong: ["Only al-Fatihah", "Poetry", "Nothing"], why: "I had learnt the Muhkam, the Mufassal." },
        { q: "Children can learn many surahs by heart.", tf: true, why: "Sahih al-Bukhari 5035." }
      ]
    },
    {
      slug: "like-a-citron",
      title: "Like a citron",
      line: "A believer who recites is like a citron: good taste, good smell.",
      facts: ["Not reciting: a date with no smell", "Told by Abu Musa"],
      source: hadith("bukhari", "5020", "Abu Musa al-Ash'ari", "Sahih", "The Prophet ﷺ said: a believer who recites the Quran is like a citron, good in taste and smell. A believer who does not recite it is like a date, good in taste but with no smell.", "is like that of a citron which tastes good and smells good"),
      difficulty: 2,
      questions: [
        { q: "A believer who recites is like what?", a: "A citron", wrong: ["A stone", "A thorn", "A cloud"], why: "Like a citron which tastes good and smells good." },
        { q: "A believer who does not recite is like what?", a: "A date with no smell", wrong: ["A rose", "A citron", "A lemon tree"], why: "Like a date which is good in taste but has no smell." },
        { q: "Reciting the Quran adds a good scent to a believer.", tf: true, why: "Sahih al-Bukhari 5020." }
      ]
    },
    {
      slug: "better-than-camels",
      title: "Better than camels",
      line: "Learning two verses is better than getting two big she-camels.",
      facts: ["Three verses, three camels", "Told by Uqbah ibn Amir"],
      source: hadith("muslim", "803", "Uqbah ibn Amir", "Sahih", "The Prophet ﷺ asked who would like two big she-camels each morning. Then he said: going to the masjid to learn or recite two verses is better than two she-camels.", "That is better for him than two she-camels"),
      difficulty: 1,
      questions: [
        { q: "What is better than two she-camels?", a: "Learning two verses", wrong: ["Two houses", "Two horses", "Two swords"], why: "Two verses from the Book of Allah is better for him than two she-camels." },
        { q: "Where did they go to learn?", a: "The masjid", wrong: ["The market", "The desert", "The sea"], why: "Does not one of you go out in the morning to the mosque and learn?" },
        { q: "Each verse learned is worth more than wealth.", tf: true, why: "Sahih Muslim 803." }
      ]
    },
    {
      slug: "two-rewards-for-trying",
      title: "Two rewards for trying",
      line: "Who finds reciting hard but keeps trying gets two rewards.",
      facts: ["The skilled are with the noble angels", "Told by Aisha"],
      source: hadith("muslim", "798a", "Aisha", "Sahih", "The Prophet ﷺ said: one skilled in the Quran is with the noble, righteous angel scribes, and one who stumbles in it and finds it hard has two rewards.", "will have two rewards"),
      difficulty: 1,
      questions: [
        { q: "What does one who finds it hard get?", a: "Two rewards", wrong: ["No reward", "Half a reward", "A warning"], why: "He who falters in it and finds it difficult will have two rewards." },
        { q: "Who is the skilled reciter with?", a: "The noble angel scribes", wrong: ["Kings", "Poets", "Traders"], why: "Associated with the noble, upright, recording angels." },
        { q: "Struggling with recitation is a reason to stop.", tf: false, why: "Keep trying for two rewards. Sahih Muslim 798a." }
      ]
    }
  ]
};

const NIGHT_PRAYER: DeepUnit = {
  key: "book-night-prayer",
  topicId: "sahihayn",
  branchId: "hadith-book-tahajjud",
  branch: { title: "The Book of Night Prayer", description: "From the Books of Tahajjud and voluntary prayer: how he ﷺ prayed at night, the sunnah prayers, and keeping it up." },
  name: "the Book of Night Prayer",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "a-deed-done-always",
      title: "A deed done always",
      line: "The deed he ﷺ loved most was one done regularly.",
      facts: ["He rose when the rooster crowed", "Told by Aisha"],
      source: hadith("bukhari", "1132", "Aisha", "Sahih", "Aisha was asked which deed the Prophet ﷺ loved most. She said: one done regularly. He rose for night prayer when he heard the rooster crow.", "A deed done continuously"),
      difficulty: 1,
      questions: [
        { q: "Which deed did he ﷺ love most?", a: "One done regularly", wrong: ["The longest one", "The hardest one", "One done once"], why: "A deed done continuously." },
        { q: "When did he ﷺ get up at night?", a: "When the rooster crowed", wrong: ["At noon", "At sunset", "Never"], why: "He used to get up on hearing the crowing of a cock." },
        { q: "A small deed done always is better than a big one stopped.", tf: true, why: "Sahih al-Bukhari 1132." }
      ]
    },
    {
      slug: "he-stood-so-long",
      title: "He ﷺ stood so long",
      line: "He ﷺ stood so long at night that Ibn Mas'ud almost sat down.",
      facts: ["Long standing in tahajjud", "Told by Ibn Mas'ud"],
      source: hadith("bukhari", "1135", "Abdullah ibn Mas'ud", "Sahih", "Ibn Mas'ud prayed tahajjud with the Prophet ﷺ, who stood so long that Ibn Mas'ud thought of sitting down and leaving him standing.", "he kept on standing till an ill-thought came to me"),
      difficulty: 2,
      questions: [
        { q: "What did Ibn Mas'ud almost do?", a: "Sit down", wrong: ["Run away", "Fall asleep", "Shout"], why: "It was to sit down and leave the Prophet ﷺ standing." },
        { q: "Which prayer was this?", a: "Tahajjud", wrong: ["Fajr", "Jumu'ah", "Eid"], why: "One night I offered the Tahajjud prayer with the Prophet ﷺ." },
        { q: "He ﷺ stood long in the night prayer.", tf: true, why: "Sahih al-Bukhari 1135." }
      ]
    },
    {
      slug: "two-by-two",
      title: "Two by two",
      line: "Night prayer is two by two. Near dawn, end with one witr.",
      facts: ["Witr closes the night", "Told by Ibn Umar"],
      source: hadith("bukhari", "1137", "Abdullah ibn Umar", "Sahih", "A man asked how to pray at night. The Prophet ﷺ said: two rak'ahs then two rak'ahs, and when you fear dawn is near, pray one rak'ah as witr.", "offer one rak`a as witr"),
      difficulty: 1,
      questions: [
        { q: "How is the night prayer prayed?", a: "Two rak'ahs at a time", wrong: ["Ten at once", "One only", "Five at a time"], why: "Two rak'at followed by two rak'at and so on." },
        { q: "What do we pray when dawn is near?", a: "One rak'ah of witr", wrong: ["Nothing", "Four rak'ahs", "Eid prayer"], why: "When you apprehend the approaching dawn, offer one rak'a as witr." },
        { q: "Witr comes at the end of the night prayer.", tf: true, why: "Sahih al-Bukhari 1137." }
      ]
    },
    {
      slug: "seven-nine-or-eleven",
      title: "Seven, nine or eleven",
      line: "His ﷺ night prayer was seven, nine or eleven rak'ahs.",
      facts: ["Besides the two of Fajr", "Told by Aisha"],
      source: hadith("bukhari", "1139", "Aisha", "Sahih", "Masruq asked Aisha about the Prophet's ﷺ night prayer. She said: seven, nine or eleven rak'ahs, besides the two rak'ahs of Fajr.", "It was seven, nine or eleven rak`at"),
      difficulty: 2,
      questions: [
        { q: "How many rak'ahs could his night prayer be?", a: "Seven, nine or eleven", wrong: ["Always forty", "Only two", "One hundred"], why: "It was seven, nine or eleven rak'at." },
        { q: "What was not counted in these?", a: "The two of Fajr", wrong: ["The witr", "Isha", "Maghrib"], why: "Besides the two rak'at of the Fajr prayer." },
        { q: "His ﷺ night prayer was not always the same number.", tf: true, why: "Sahih al-Bukhari 1139." }
      ]
    },
    {
      slug: "dont-stop-the-night-prayer",
      title: "Don't stop the night prayer",
      line: "Don't be like the one who prayed at night, then stopped.",
      facts: ["Said to Abdullah ibn Amr", "Told by Abdullah ibn Amr"],
      source: hadith("bukhari", "1152", "Abdullah ibn Amr", "Sahih", "The Prophet ﷺ said to Abdullah ibn Amr: do not be like so-and-so, who used to pray at night and then gave it up.", "who used to pray at night and then stopped the night prayer"),
      difficulty: 1,
      questions: [
        { q: "What did so-and-so do wrong?", a: "Stopped his night prayer", wrong: ["Prayed too much", "Fasted too much", "Gave charity"], why: "Who used to pray at night and then stopped the night prayer." },
        { q: "Who was told this?", a: "Abdullah ibn Amr", wrong: ["Abu Bakr", "Bilal", "Ali"], why: "O Abdullah! Do not be like so and so." },
        { q: "Keeping up a good habit matters.", tf: true, why: "Sahih al-Bukhari 1152." }
      ]
    },
    {
      slug: "resting-on-the-right-side",
      title: "Resting on the right side",
      line: "After the two sunnah of Fajr, he ﷺ lay on his right side.",
      facts: ["A short rest before Fajr", "Told by Aisha"],
      source: hadith("bukhari", "1160", "Aisha", "Sahih", "The Prophet ﷺ used to lie down on his right side after praying the two sunnah rak'ahs of Fajr.", "used to lie down on his right side"),
      difficulty: 2,
      questions: [
        { q: "Which side did he ﷺ lie on?", a: "His right side", wrong: ["His left side", "His back", "He stood"], why: "He used to lie down on his right side." },
        { q: "After which prayer?", a: "The two sunnah of Fajr", wrong: ["Isha", "Asr", "Eid"], why: "After offering two rak'at Sunna of the Fajr prayer." },
        { q: "He ﷺ rested on his left side after Fajr sunnah.", tf: false, why: "It was his right side. Sahih al-Bukhari 1160." }
      ]
    },
    {
      slug: "light-fajr-sunnah",
      title: "A light Fajr sunnah",
      line: "He ﷺ kept the two rak'ahs before Fajr very short.",
      facts: ["So light Aisha wondered", "Told by Aisha"],
      source: hadith("bukhari", "1165", "Aisha", "Sahih", "The Prophet ﷺ made the two rak'ahs before Fajr so light that Aisha wondered whether he had recited al-Fatihah.", "used to make the two rak`at before the Fajr prayer so light"),
      difficulty: 2,
      questions: [
        { q: "How were the two before Fajr?", a: "Very light and short", wrong: ["Very long", "Skipped", "Prayed at noon"], why: "He used to make the two rak'at before the Fajr prayer so light." },
        { q: "What did Aisha wonder?", a: "If he recited al-Fatihah", wrong: ["If he was ill", "If it was night", "If he was travelling"], why: "I would wonder whether he recited Al-Fatiha." },
        { q: "The sunnah before Fajr is long in this hadith.", tf: false, why: "It was light. Sahih al-Bukhari 1165." }
      ]
    },
    {
      slug: "sunnah-around-the-prayers",
      title: "Sunnah around the prayers",
      line: "Two before and after Zuhr, and two after Maghrib and Isha.",
      facts: ["Also two after Jumu'ah", "Told by Ibn Umar"],
      source: hadith("bukhari", "1169", "Abdullah ibn Umar", "Sahih", "Ibn Umar prayed with the Prophet ﷺ two rak'ahs before Zuhr and two after it, and two after Jumu'ah, Maghrib and Isha.", "two rak`at after Jumua, Maghrib and `Isha"),
      difficulty: 2,
      questions: [
        { q: "How many after Maghrib?", a: "Two", wrong: ["Four", "None", "Six"], why: "Two rak'at after Jumua, Maghrib and Isha prayers." },
        { q: "Which prayer had two before and two after?", a: "Zuhr", wrong: ["Fajr", "Asr", "Maghrib"], why: "Two rak'at before the Zuhr prayer and two rak'at after the Zuhr prayer." },
        { q: "There is a sunnah after Isha.", tf: true, why: "Sahih al-Bukhari 1169." }
      ]
    },
    {
      slug: "never-missed",
      title: "Never missed",
      line: "He ﷺ never missed four before Zuhr and two before Fajr.",
      facts: ["Prayers he always kept", "Told by Aisha"],
      source: hadith("bukhari", "1182", "Aisha", "Sahih", "Aisha said: the Prophet ﷺ never left four rak'ahs before Zuhr and two rak'ahs before Fajr.", "never missed four rak`at before the Zuhr prayer and two rak`at before the Fajr prayer"),
      difficulty: 2,
      questions: [
        { q: "How many before Zuhr did he ﷺ keep?", a: "Four", wrong: ["One", "Ten", "None"], why: "He never missed four rak'at before the Zuhr prayer." },
        { q: "How many before Fajr?", a: "Two", wrong: ["Four", "Six", "Eight"], why: "And two rak'at before the Fajr prayer." },
        { q: "He ﷺ held on to the sunnah before Fajr.", tf: true, why: "Sahih al-Bukhari 1182." }
      ]
    },
    {
      slug: "pray-before-maghrib",
      title: "Pray before Maghrib",
      line: "Pray before Maghrib, for whoever wishes. It is not a must.",
      facts: ["Said three times", "Told by Abdullah al-Muzani"],
      source: hadith("bukhari", "1183", "Abdullah al-Muzani", "Sahih", "The Prophet ﷺ said three times: pray before Maghrib. The third time he said: for whoever wishes, so people would not take it as a must.", "Whoever wants to offer it can do so"),
      difficulty: 3,
      questions: [
        { q: "How many times did he ﷺ say it?", a: "Three times", wrong: ["Once", "Ten times", "Never"], why: "He said it thrice." },
        { q: "What did he add the third time?", a: "For whoever wishes", wrong: ["It is a must", "Only men", "Only in Ramadan"], why: "Whoever wants to offer it can do so." },
        { q: "Praying before Maghrib is a must for everyone.", tf: false, why: "It is for whoever wishes. Sahih al-Bukhari 1183." }
      ]
    },
    {
      slug: "an-hour-every-night",
      title: "An hour every night",
      line: "Every night there is an hour when Allah gives what is asked.",
      facts: ["Good in this world and the next", "Told by Jabir"],
      source: hadith("muslim", "757a", "Jabir ibn Abdullah", "Sahih", "The Prophet ﷺ said: in the night there is an hour in which no Muslim asks Allah for good of this world and the next but He gives it, and that is every night.", "and that applies to every night"),
      difficulty: 1,
      questions: [
        { q: "What happens in that hour?", a: "Allah gives what is asked", wrong: ["Nothing", "The sun rises", "Prayer is closed"], why: "No Muslim will ask Allah for good without His giving it to him." },
        { q: "How often is this hour?", a: "Every night", wrong: ["Once a year", "Only in Ramadan", "Only on Friday"], why: "And that applies to every night." },
        { q: "The night is a special time for dua.", tf: true, why: "Sahih Muslim 757a." }
      ]
    },
    {
      slug: "pray-while-fresh",
      title: "Pray while fresh",
      line: "He ﷺ untied Zaynab's rope: pray while fresh, stop when tired.",
      facts: ["Ease, not strain", "Told by Anas"],
      source: hadith("muslim", "784a", "Anas ibn Malik", "Sahih", "The Prophet ﷺ found a rope in the masjid that Zaynab held when tired in prayer. He said: untie it. Let one pray while fresh, and when tired, stop.", "Let one pray as long as one feels fresh"),
      difficulty: 2,
      questions: [
        { q: "What was the rope for?", a: "Holding on when tired in prayer", wrong: ["Tying camels", "Drying clothes", "Hanging lamps"], why: "She prays and when she feels tired she holds it." },
        { q: "What did he ﷺ say to do?", a: "Pray while fresh, stop when tired", wrong: ["Pray all night no matter what", "Never pray at night", "Tie the rope tighter"], why: "Let one pray as long as one feels fresh, but when tired one must stop." },
        { q: "Islam asks us to pray past our strength.", tf: false, why: "Pray while fresh. Sahih Muslim 784a." }
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

export const HADITH_BOOK_UNITS: readonly DeepUnit[] = [FAITH, PURITY, ADAB, FOOD, DUA, RIQAQ, DRESS, TRADE, MEDICINE, COMPANIONS, PRAYER, FASTING, ZAKAT, MARRIAGE, ADHAN, FUNERALS, HAJJ, OATHS, WILLS, QURAN_VIRTUES, NIGHT_PRAYER];
