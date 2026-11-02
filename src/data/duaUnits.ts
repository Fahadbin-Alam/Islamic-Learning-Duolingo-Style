import type { LearningSection } from "../types";
import { ADHKAR, dhikrArabic, type Dhikr } from "./adhkar";
import { hadith, quran, quranQuote, type DeepLesson, type DeepUnit } from "./deepKit";

// The Duas and adhkar topic: the morning and evening adhkar, sleeping and waking, the duas of the day, duas from the
// Quran and the reward of remembering Allah. Every card is from the Quran or a hadith graded sahih or hasan, number and
// grade as sunnah.com gives them; the Arabic of each hadith is copied from the collection's own text. Anything weak or
// disputed is left out. The daily routine itself (tap to count, listen) is in adhkar.ts and AdhkarSheet.

const dhikr = (id: string): Dhikr => {
  const found = Object.values(ADHKAR)
    .flat()
    .find((item) => item.id === id);
  if (!found) throw new Error(`No dhikr ${id}`);
  return found;
};
/** A lesson card's quote: the dhikr's Arabic and its hadith. */
const said = (id: string) => {
  const item = dhikr(id);
  return { text: dhikrArabic(item), reference: item.source.reference ?? item.source.title };
};

const MORNING_EVENING: DeepUnit = {
  key: "dua-adhkar",
  topicId: "duas",
  branchId: "duas-morning-evening",
  branch: { title: "Morning and evening adhkar", description: "The words the Prophet ﷺ said as each day began and ended." },
  name: "the daily adhkar",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "remember-much",
      title: "Remember Allah much",
      line: "Allah tells believers: remember Me much, morning and evening.",
      facts: ["Quran 33:41-42", "Glorify Him morning and evening"],
      quote: quranQuote(33, 41),
      source: quran(33, 41, "O you who believe, remember Allah with much remembrance, and glorify Him morning and evening."),
      difficulty: 1,
      questions: [
        { q: "How much does Allah ask the believers to remember Him?", a: "Much, often", wrong: ["Once a year", "Only in Ramadan", "Never out loud"], why: "Remember Allah with much remembrance (33:41)." },
        { q: "When does 33:42 say to glorify Allah?", a: "Morning and evening", wrong: ["Only at noon", "Only on Fridays", "Only on Eid"], why: "And glorify Him morning and evening." },
        { q: "Adhkar means words of remembering Allah.", tf: true, why: "Dhikr is remembering Allah; adhkar is its plural." }
      ]
    },
    {
      slug: "three-quls",
      title: "The three Quls",
      line: "Read the three Quls three times, morning and evening.",
      facts: ["Surahs 112, 113 and 114", "Three times each time", "Enough for you against everything"],
      quote: quranQuote(112, 1),
      source: dhikr("quls").source,
      difficulty: 1,
      questions: [
        { q: "How many times are the three Quls read in the morning and evening?", a: "Three times", wrong: ["Once a week", "Seven times", "Forty times"], why: "Three times in the evening and the morning." },
        { q: "What did the Prophet ﷺ say they would be for you?", a: "Enough against everything", wrong: ["A way to get rich", "A cure for hunger", "A reason to skip prayer"], why: "Abu Dawud 5082." },
        { q: "The three Quls are Al-Ikhlas, Al-Falaq and An-Nas.", tf: true, why: "The last three surahs of the Quran." }
      ]
    },
    {
      slug: "kingdom",
      title: "The kingdom is Allah's",
      line: "We have reached the morning, and the kingdom belongs to Allah.",
      facts: ["Asbahna wa asbahal-mulku lillah", "In the evening: Amsayna wa amsal-mulku lillah", "Ask for the good of the day"],
      quote: said("morning-mulk"),
      source: dhikr("morning-mulk").source,
      difficulty: 2,
      questions: [
        { q: "Who does the whole kingdom belong to, as we start the day?", a: "Allah", wrong: ["The king of the land", "Whoever is richest", "No one at all"], why: "The kingdom belongs to Allah." },
        { q: "What do you ask for in this dhikr?", a: "The good of the day and what comes after", wrong: ["A new phone", "To never work again", "Fame among people"], why: "Rabbi as'aluka khayra ma fi hadhal-yawm." },
        { q: "In the evening you say Amsayna, we have reached the evening.", tf: true, why: "The same words, with evening in place of morning." }
      ]
    },
    {
      slug: "by-you",
      title: "By You we live",
      line: "O Allah, by You we live and by You we die.",
      facts: ["Allahumma bika asbahna", "To You is the rising"],
      quote: said("morning-bika"),
      source: dhikr("morning-bika").source,
      difficulty: 2,
      questions: [
        { q: "In this dua, by whom do we live and die?", a: "By Allah", wrong: ["By luck", "By our own strength", "By the stars"], why: "Bika nahya wa bika namut." },
        { q: "What comes at the end of it?", a: "To You is the rising", wrong: ["To us is the reward", "We fear no one", "Today is ours"], why: "Wa ilaykan-nushur." },
        { q: "The Prophet ﷺ said these words every morning and evening.", tf: true, why: "Abu Dawud 5068." }
      ]
    },
    {
      slug: "master",
      title: "The master of asking forgiveness",
      line: "Sayyid al-istighfar: the best way to ask Allah to forgive you.",
      facts: ["You created me and I am Your servant", "Said with firm faith, a way to Paradise"],
      quote: said("master-istighfar"),
      source: dhikr("master-istighfar").source,
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ call this dua?", a: "The master of asking forgiveness", wrong: ["The dua of travel", "The dua for rain", "The dua for food"], why: "Sayyid al-istighfar, Bukhari 6306." },
        { q: "Someone says it in the day with firm faith and dies before evening. Where are they?", a: "Among the people of Paradise", wrong: ["They must repeat it first", "Nothing is promised", "Only if it was Friday"], why: "He will be from the people of Paradise." },
        { q: "In this dua you admit your sins to Allah.", tf: true, why: "Wa abu'u laka bi dhanbi: I admit my sins." }
      ]
    },
    {
      slug: "abu-bakr",
      title: "Words for Abu Bakr",
      line: "Abu Bakr asked for daily words; he ﷺ taught him this dua.",
      facts: ["Knower of the unseen and the seen", "Morning, evening and bedtime"],
      quote: said("abu-bakr"),
      source: dhikr("abu-bakr").source,
      difficulty: 3,
      questions: [
        { q: "Who asked the Prophet ﷺ for words to say morning and evening?", a: "Abu Bakr", wrong: ["Abu Jahl", "A king of Persia", "Qarun"], why: "Tirmidhi 3392." },
        { q: "From what evil does this dua seek refuge?", a: "Your own self and Shaytan", wrong: ["Rain and wind", "Hard homework", "Your neighbors"], why: "From the evil of my self and of Shaytan and his shirk." },
        { q: "He ﷺ said to say it at bedtime too.", tf: true, why: "Morning, evening and when you go to bed." }
      ]
    },
    {
      slug: "well-being",
      title: "Asking for well-being",
      line: "He ﷺ never left asking Allah for well-being, morning or evening.",
      facts: ["Al-'afwa wal-'afiyah: pardon and well-being", "In religion, life, family and wealth"],
      quote: said("afiyah"),
      source: dhikr("afiyah").source,
      difficulty: 3,
      questions: [
        { q: "What two things does this dua ask for first?", a: "Pardon and well-being", wrong: ["Gold and silver", "Power and fame", "Sleep and food"], why: "Al-'afwa wal-'afiyah." },
        { q: "How often did the Prophet ﷺ say it?", a: "Every morning and evening, never leaving it", wrong: ["Once in his life", "Only when ill", "Only on Hajj"], why: "Ibn Majah 3871." },
        { q: "The dua asks Allah to guard you from every side.", tf: true, why: "In front, behind, right, left, above and below." }
      ]
    },
    {
      slug: "no-harm",
      title: "Nothing can harm",
      line: "Say it three times; no sudden trouble strikes you till evening.",
      facts: ["Bismillahil-ladhi la yadurru", "Three times, morning and evening"],
      quote: said("no-harm"),
      source: dhikr("no-harm").source,
      difficulty: 2,
      questions: [
        { q: "How many times do you say Bismillahil-ladhi la yadurru?", a: "Three times", wrong: ["Once a year", "Ten times", "A thousand times"], why: "Abu Dawud 5088." },
        { q: "With Allah's name, what can harm on earth or in the sky?", a: "Nothing", wrong: ["Only big things", "Only animals", "Anything at all"], why: "With whose name nothing can cause harm." },
        { q: "Aban, who told the hadith, was struck on a day he forgot to say it.", tf: true, why: "He said: I was angry that day and forgot to say them." }
      ]
    },
    {
      slug: "hundred-tasbih",
      title: "Glory and praise, 100 times",
      line: "Subhanallahi wa bihamdih 100 times, morning and evening.",
      facts: ["Glory be to Allah, and all praise is His", "No one brings better on the Last Day"],
      quote: said("tasbih-100"),
      source: dhikr("tasbih-100").source,
      difficulty: 2,
      questions: [
        { q: "How many times do you say Subhanallahi wa bihamdih here?", a: "100 times", wrong: ["3 times", "10 times", "7 times"], why: "One hundred times, Muslim 2692." },
        { q: "Who brings better on the Day of Judgment?", a: "Only one who said the same or more", wrong: ["Anyone who is rich", "Anyone older", "No one is better"], why: "Except one who said the same or more." },
        { q: "Subhanallahi wa bihamdih means glory be to Allah, and all praise is His.", tf: true, why: "Subhan means glory; hamd means praise." }
      ]
    },
    {
      slug: "hundred-tahlil",
      title: "Allah alone, 100 times",
      line: "Say La ilaha illallahu wahdahu 100 times in a day.",
      facts: ["Like freeing ten slaves", "100 good deeds, 100 sins wiped", "A guard from Shaytan till evening"],
      quote: said("tahlil-100"),
      source: dhikr("tahlil-100").source,
      difficulty: 3,
      questions: [
        { q: "Saying it 100 times in a day is like freeing how many slaves?", a: "Ten", wrong: ["One", "A hundred", "Two"], why: "Bukhari 3293." },
        { q: "What happens to 100 bad deeds?", a: "They are wiped away", wrong: ["They double", "They stay the same", "They are moved to a friend"], why: "A hundred bad deeds are wiped off." },
        { q: "This dhikr guards you from Shaytan until the evening.", tf: true, why: "Protected from Satan that day until evening." }
      ]
    },
    {
      slug: "perfect-words",
      title: "Allah's perfect words",
      line: "Seek refuge in Allah's perfect words when the evening comes.",
      facts: ["A'udhu bi kalimatillahit-tammat", "A man stung by a scorpion"],
      quote: said("perfect-words"),
      source: dhikr("perfect-words").source,
      difficulty: 3,
      questions: [
        { q: "What stung the man in this hadith?", a: "A scorpion", wrong: ["A bee", "A snake", "A spider"], why: "Muslim 2709a." },
        { q: "When should he have said these words?", a: "In the evening", wrong: ["At noon only", "On Eid only", "After the sting"], why: "Had you said in the evening..." },
        { q: "You seek refuge in Allah's perfect words from the evil of what He created.", tf: true, why: "Min sharri ma khalaq." }
      ]
    }
  ]
};

const SLEEP: DeepUnit = {
  key: "dua-sleep",
  topicId: "duas",
  branchId: "duas-sleep",
  branch: { title: "Sleeping and waking", description: "What the Prophet ﷺ said before sleep and as he woke." },
  name: "sleeping and waking",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "kursi",
      title: "Ayat al-Kursi at bedtime",
      line: "Read Ayat al-Kursi in bed; a guard from Allah stays with you.",
      facts: ["Quran 2:255", "No devil comes near you until morning", "A thief taught it to Abu Hurairah"],
      quote: quranQuote(2, 255),
      source: dhikr("ayat-al-kursi").source,
      difficulty: 2,
      questions: [
        { q: "Who stays with you after you read Ayat al-Kursi in bed?", a: "A guard from Allah", wrong: ["A thief", "Your shadow", "No one"], why: "Bukhari 2311." },
        { q: "Who first told Abu Hurairah about it?", a: "A thief who kept coming back", wrong: ["A merchant", "A king", "His mother"], why: "He told you the truth, though he is a liar, said the Prophet ﷺ." },
        { q: "Ayat al-Kursi is ayah 255 of Al-Baqarah.", tf: true, why: "Quran 2:255." }
      ]
    },
    {
      slug: "baqarah-end",
      title: "The end of Al-Baqarah",
      line: "The last two ayahs of Al-Baqarah at night are enough for you.",
      facts: ["Quran 2:285-286", "Enough for you that night"],
      quote: quranQuote(2, 285),
      source: dhikr("baqarah-end").source,
      difficulty: 2,
      questions: [
        { q: "Which ayahs are enough for you when read at night?", a: "The last two of Al-Baqarah", wrong: ["The first two of Al-Fatihah", "Any ayah of Yusuf", "The middle of Al-Kahf"], why: "Bukhari 5009." },
        { q: "What do those two ayahs do for the one who reads them?", a: "They are enough for him", wrong: ["They make him rich", "They end his fast", "Nothing"], why: "That will be sufficient for him." },
        { q: "These ayahs end with: help us against the people who disbelieve.", tf: true, why: "Fansurna 'alal-qawmil-kafirin." }
      ]
    },
    {
      slug: "blow-quls",
      title: "Blow and wipe",
      line: "Blow into your hands, read the three Quls, and wipe over you.",
      facts: ["Head and face first", "Three times"],
      quote: quranQuote(113, 1),
      source: dhikr("blow-quls").source,
      difficulty: 2,
      questions: [
        { q: "Where did the Prophet ﷺ start wiping with his hands?", a: "His head and face", wrong: ["His feet", "His knees", "His back only"], why: "Starting with his head and face." },
        { q: "How many times did he do it?", a: "Three times", wrong: ["Once", "Seven times", "Ten times"], why: "Bukhari 5017." },
        { q: "He read Al-Ikhlas, Al-Falaq and An-Nas into his hands.", tf: true, why: "Then wiped over his body." }
      ]
    },
    {
      slug: "better-than-servant",
      title: "Better than a servant",
      line: "33 Subhanallah, 33 Alhamdulillah, 34 Allahu Akbar at bedtime.",
      facts: ["Fatimah asked for a servant", "He ﷺ taught her and Ali this instead"],
      quote: said("sleep-allahu-akbar"),
      source: dhikr("sleep-allahu-akbar").source,
      difficulty: 2,
      questions: [
        { q: "What did Fatimah ask her father ﷺ for?", a: "A servant", wrong: ["A new house", "A horse", "Money for a trip"], why: "Her hands hurt from the hand mill." },
        { q: "How many times is Allahu Akbar said at bedtime?", a: "34", wrong: ["33", "10", "100"], why: "34 takbir, 33 tasbih, 33 tahmid." },
        { q: "He ﷺ said these words are better than a servant.", tf: true, why: "Bukhari 3705." }
      ]
    },
    {
      slug: "bismika",
      title: "In Your name I sleep",
      line: "Before sleep: Bismika Allahumma amutu wa ahya.",
      facts: ["In Your name, O Allah, I die and I live", "Sleep is like a small death"],
      quote: said("bismika"),
      source: dhikr("bismika").source,
      difficulty: 1,
      questions: [
        { q: "What does Bismika Allahumma amutu wa ahya mean?", a: "In Your name, O Allah, I die and I live", wrong: ["Good night, everyone", "I am very tired", "Wake me at Fajr"], why: "Bukhari 6324." },
        { q: "When did the Prophet ﷺ say it?", a: "When he lay down to sleep", wrong: ["When he ate", "When he traveled", "When he sneezed"], why: "Whenever he intended to go to bed." },
        { q: "The dua calls sleep a kind of dying.", tf: true, why: "Allah takes the souls in sleep (Quran 39:42)." }
      ]
    },
    {
      slug: "last-words",
      title: "Your last words at night",
      line: "Make wudu, lie on your right side, and say this dua last.",
      facts: ["Allahumma aslamtu wajhi ilayk", "If you die that night, you die on the fitrah"],
      quote: said("aslamtu"),
      source: dhikr("aslamtu").source,
      difficulty: 3,
      questions: [
        { q: "Which side did the Prophet ﷺ say to lie on?", a: "The right side", wrong: ["The left side", "On your back", "Face down"], why: "Lie on your right side." },
        { q: "What do you do before lying down, in this hadith?", a: "Make wudu as for prayer", wrong: ["Eat a big meal", "Watch a video", "Nothing at all"], why: "Bukhari 247." },
        { q: "Whoever dies that night after saying it dies upon the fitrah.", tf: true, why: "You die upon the fitrah, the natural faith." }
      ]
    },
    {
      slug: "waking",
      title: "When you wake up",
      line: "Waking up: praise Allah who gave us life after sleep.",
      facts: ["Al-hamdu lillahil-ladhi ahyana", "To Him is the rising"],
      quote: said("waking"),
      source: dhikr("waking").source,
      difficulty: 1,
      questions: [
        { q: "What is the first thing to say when you wake up?", a: "Praise Allah who gave us life again", wrong: ["Check your phone", "Complain about the cold", "Nothing at all"], why: "Bukhari 6312." },
        { q: "What does wa ilayhin-nushur mean?", a: "And to Him is the rising", wrong: ["And I am hungry", "And it is morning", "And peace be on you"], why: "We will all rise to Allah one day." },
        { q: "The Prophet ﷺ thanked Allah as soon as he woke.", tf: true, why: "When he got up he would say it." }
      ]
    }
  ]
};

const DAY: DeepUnit = {
  key: "dua-day",
  topicId: "duas",
  branchId: "duas-every-day",
  branch: { title: "Duas for every day", description: "Short duas for eating, leaving home, the mosque, travel and more." },
  name: "the duas of the day",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "eat",
      title: "Before you eat",
      line: "Say Bismillah, eat with your right hand, from what is near you.",
      facts: ["Umar ibn Abi Salamah was a boy", "Three manners in one hadith"],
      quote: { text: "سَمِّ اللَّهَ، وَكُلْ بِيَمِينِكَ وَكُلْ مِمَّا يَلِيكَ", reference: "Sahih al-Bukhari 5376" },
      source: hadith("bukhari", "5376", "Umar bin Abi Salamah", "Sahih", "I was a boy in the care of the Prophet ﷺ and my hand went all over the dish. He said: O boy, mention the name of Allah, eat with your right hand, and eat from what is near you.", "eat with your right hand"),
      difficulty: 1,
      questions: [
        { q: "What do you say before eating?", a: "Bismillah", wrong: ["Alhamdulillah", "Allahu Akbar", "Subhanallah"], why: "Mention the name of Allah." },
        { q: "Which hand do you eat with?", a: "The right hand", wrong: ["The left hand", "Either, it does not matter", "Both at once"], why: "Bukhari 5376." },
        { q: "You should eat from what is nearest to you on the plate.", tf: true, why: "Eat from what is near you." }
      ]
    },
    {
      slug: "forgot",
      title: "If you forget Bismillah",
      line: "Forgot Bismillah? Say: Bismillahi awwalahu wa akhirah.",
      facts: ["In the name of Allah at its start and its end"],
      quote: { text: "بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ", reference: "Sunan Abi Dawud 3767" },
      source: hadith("abudawud", "3767", "Aishah", "Sahih (Al-Albani)", "When one of you eats, he should mention Allah's name; if he forgets at the beginning, he should say: in the name of Allah at its beginning and its end.", "at the beginning and at the end of it"),
      difficulty: 2,
      questions: [
        { q: "You remember halfway through the meal that you forgot Bismillah. What do you say?", a: "Bismillahi awwalahu wa akhirah", wrong: ["Nothing, it is too late", "Start the meal again", "Alhamdulillah only"], why: "Abu Dawud 3767." },
        { q: "What does awwalahu wa akhirah mean?", a: "At its start and its end", wrong: ["Thank you for the food", "I am full now", "Pass the bread"], why: "In the name of Allah at its start and its end." },
        { q: "Forgetting Bismillah means the meal can never be blessed.", tf: false, why: "You can still say it when you remember." }
      ]
    },
    {
      slug: "after-eating",
      title: "After you eat",
      line: "After meals he ﷺ praised Allah: much, good, blessed praise.",
      facts: ["Al-hamdu lillahi kathiran tayyiban", "We can never do without Him"],
      quote: { text: "الْحَمْدُ لِلَّهِ كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ، غَيْرَ مَكْفِيٍّ، وَلاَ مُوَدَّعٍ وَلاَ مُسْتَغْنًى عَنْهُ، رَبَّنَا", reference: "Sahih al-Bukhari 5458" },
      source: hadith("bukhari", "5458", "Abu Umamah", "Sahih", "When his meal was taken away, the Prophet ﷺ used to say: all praise is for Allah, much good and blessed praise; we can never do without it, nor leave it, nor stop needing it, our Lord.", "Rabbuna"),
      difficulty: 2,
      questions: [
        { q: "When did the Prophet ﷺ say Al-hamdu lillahi kathiran tayyiban?", a: "When his meal was finished", wrong: ["Before sleeping", "On a journey", "When it rained"], why: "Bukhari 5458." },
        { q: "What kind of praise is it?", a: "Much, good and blessed", wrong: ["Short and quiet", "Only on Eid", "Loud and boastful"], why: "Kathiran tayyiban mubarakan fih." },
        { q: "Thanking Allah after food is a sunnah.", tf: true, why: "The Prophet ﷺ did it after his meals." }
      ]
    },
    {
      slug: "toilet",
      title: "Entering and leaving the toilet",
      line: "Going in, seek Allah's refuge; coming out, say Ghufranak.",
      facts: ["From evil things and evil ones", "Ghufranak: Your forgiveness"],
      quote: { text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ", reference: "Sahih al-Bukhari 142" },
      source: hadith("bukhari", "142", "Anas ibn Malik", "Sahih", "When the Prophet ﷺ went to the toilet he would say: O Allah, I seek refuge in You from evil things and evil ones.", "answer the call of nature"),
      difficulty: 1,
      questions: [
        { q: "Before going into the toilet, what do you ask Allah for?", a: "Refuge from evil things and evil ones", wrong: ["A good meal", "Rain", "A long life"], why: "Allahumma inni a'udhu bika minal-khubuthi wal-khaba'ith." },
        { q: "What do you say when you come out?", a: "Ghufranak", wrong: ["Bismillah", "Amin", "Allahu Akbar"], why: "Abu Dawud 30: Ghufranak, Your forgiveness." },
        { q: "Ghufranak means: I ask Your forgiveness.", tf: true, why: "Aishah said he said it when he came out." }
      ]
    },
    {
      slug: "leave-home",
      title: "Leaving home",
      line: "Leaving home, say Bismillah and put your trust in Allah.",
      facts: ["Bismillah, tawakkaltu 'alallah", "La hawla wa la quwwata illa billah", "You are guided, defended and protected"],
      quote: { text: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ لاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللَّهِ", reference: "Sunan Abi Dawud 5095" },
      source: hadith("abudawud", "5095", "Anas ibn Malik", "Sahih (Al-Albani)", "When a man leaves his house and says: in the name of Allah, I trust in Allah, there is no might and no power except with Allah, it is said to him: you are guided, defended and protected, and the devils move away from him.", "You are guided, defended and protected"),
      difficulty: 2,
      questions: [
        { q: "What is said to the one who says this dua leaving home?", a: "You are guided, defended and protected", wrong: ["You will be late", "Go back inside", "Nothing is said"], why: "Abu Dawud 5095." },
        { q: "What does tawakkaltu 'alallah mean?", a: "I trust in Allah", wrong: ["I am going out", "I am hungry", "I forgot my keys"], why: "Tawakkul is trusting Allah." },
        { q: "The devils move away from the one who says it.", tf: true, why: "The devils go far from him." }
      ]
    },
    {
      slug: "mosque",
      title: "The mosque doors",
      line: "Going in, ask for His mercy; going out, ask for His bounty.",
      facts: ["Allahummaftah li abwaba rahmatik", "Allahumma inni as'aluka min fadlik"],
      quote: { text: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ", reference: "Sahih Muslim 713a" },
      source: hadith("muslim", "713a", "Abu Usaid", "Sahih", "When one of you enters the mosque, let him say: O Allah, open for me the doors of Your mercy. And when he leaves, let him say: O Allah, I ask You of Your bounty.", "open for me the doors of Thy mercy"),
      difficulty: 2,
      questions: [
        { q: "Entering the mosque, you ask Allah to open the doors of what?", a: "His mercy", wrong: ["His kitchen", "The market", "The school"], why: "Abwaba rahmatik: the doors of Your mercy." },
        { q: "Leaving the mosque, you ask Allah for what?", a: "His bounty", wrong: ["His anger", "A faster car", "Nothing"], why: "Min fadlik: of Your bounty." },
        { q: "The same dua is said going in and going out.", tf: false, why: "Mercy going in, bounty going out." }
      ]
    },
    {
      slug: "sneeze",
      title: "When someone sneezes",
      line: "Sneeze: say Alhamdulillah. Hearing it: say Yarhamukallah.",
      facts: ["Then: Yahdikumullahu wa yuslihu balakum", "Three steps"],
      quote: { text: "الْحَمْدُ لِلَّهِ · يَرْحَمُكَ اللَّهُ · يَهْدِيكُمُ اللَّهُ وَيُصْلِحُ بَالَكُمْ", reference: "Sahih al-Bukhari 6224" },
      source: hadith("bukhari", "6224", "Abu Hurairah", "Sahih", "If one of you sneezes, let him say Al-hamdu lillah, and his brother should say Yarhamuk Allah. Then let him say: Yahdikumullahu wa yuslihu balakum, may Allah guide you and set your affairs right.", "Yahdikumul-lah wa Yuslih balakum"),
      difficulty: 1,
      questions: [
        { q: "You sneeze. What do you say?", a: "Alhamdulillah", wrong: ["Bismillah", "Astaghfirullah", "Nothing"], why: "Bukhari 6224." },
        { q: "Your friend sneezes and says Alhamdulillah. What do you say?", a: "Yarhamukallah", wrong: ["Alhamdulillah too", "Bless you only", "Inna lillah"], why: "May Allah have mercy on you." },
        { q: "The sneezer answers: Yahdikumullahu wa yuslihu balakum.", tf: true, why: "May Allah guide you and set your affairs right." }
      ]
    },
    {
      slug: "adhan",
      title: "After the adhan",
      line: "After the adhan, ask Allah to give the Prophet ﷺ al-wasilah.",
      facts: ["Repeat the words of the adhan first", "His intercession for you"],
      quote: { text: "اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلاَةِ الْقَائِمَةِ آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ", reference: "Sahih al-Bukhari 614" },
      source: hadith("bukhari", "614", "Jabir ibn Abdullah", "Sahih", "Whoever says after hearing the adhan: O Allah, Lord of this perfect call and the prayer about to be held, give Muhammad al-wasilah and excellence, and raise him to the praised station You promised him, my intercession will be his on the Day of Resurrection.", "my intercession for him will be allowed"),
      difficulty: 3,
      questions: [
        { q: "What does the Prophet ﷺ promise the one who says this dua?", a: "His intercession on the Last Day", wrong: ["A free meal", "Good grades", "No more prayers"], why: "Bukhari 614." },
        { q: "While the adhan is called, what do you say?", a: "The same words as the caller", wrong: ["Nothing, just wait", "Your own song", "Only Amin"], why: "Say what the mu'adhdhin says (Bukhari 611)." },
        { q: "The dua asks Allah to raise the Prophet ﷺ to the praised station.", tf: true, why: "Maqaman mahmudan." }
      ]
    },
    {
      slug: "after-salah",
      title: "After the salah",
      line: "After salam: Astaghfirullah three times, then antas-salam.",
      facts: ["Allahumma antas-salam: O Allah, You are Peace", "O Owner of majesty and honor"],
      quote: { text: "اللَّهُمَّ أَنْتَ السَّلاَمُ وَمِنْكَ السَّلاَمُ تَبَارَكْتَ ذَا الْجَلاَلِ وَالإِكْرَامِ", reference: "Sahih Muslim 591" },
      source: hadith("muslim", "591", "Thawban", "Sahih", "When the Prophet ﷺ finished his prayer, he asked forgiveness three times and said: O Allah, You are Peace and from You is peace; blessed are You, O Owner of majesty and honor.", "He begged forgiveness three times"),
      difficulty: 2,
      questions: [
        { q: "How many times did he ﷺ say Astaghfirullah after the prayer?", a: "Three", wrong: ["One", "Ten", "Thirty-three"], why: "Muslim 591a." },
        { q: "What does Allahumma antas-salam mean?", a: "O Allah, You are Peace", wrong: ["O Allah, I am tired", "Peace be on the people", "Allah is the Greatest"], why: "As-Salam is one of Allah's names." },
        { q: "Asking forgiveness right after praying is a sunnah.", tf: true, why: "Even after a good deed, we ask for forgiveness." }
      ]
    },
    {
      slug: "travel",
      title: "Setting out on a journey",
      line: "On his ride, he ﷺ said Allahu Akbar three times, then this dua.",
      facts: ["Glory to Him who made this serve us", "Quran 43:13-14"],
      quote: { text: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ", reference: "Sahih Muslim 1342" },
      source: hadith("muslim", "1342", "Abdullah ibn Umar", "Sahih", "When the Prophet ﷺ mounted his camel for a journey he said Allahu Akbar three times, then: glory to Him who made this serve us, for we could not have done it ourselves, and to our Lord we will return.", "and we are going to return to our Lord"),
      difficulty: 3,
      questions: [
        { q: "What did he ﷺ say three times before the travel dua?", a: "Allahu Akbar", wrong: ["Bismillah", "Amin", "Subhanallah"], why: "Muslim 1342." },
        { q: "The travel dua thanks Allah for making what serve us?", a: "Our ride", wrong: ["Our friends", "The weather", "Our money"], why: "Sakhkhara lana hadha: He made this serve us." },
        { q: "These words are also in the Quran, in Surah Az-Zukhruf.", tf: true, why: "Quran 43:13-14." }
      ]
    },
    {
      slug: "visit-sick",
      title: "Visiting the sick",
      line: "Visiting someone ill, he ﷺ said: La ba'sa, tahurun in sha Allah.",
      facts: ["No harm: a cleansing, if Allah wills", "Illness can wipe away sins"],
      quote: { text: "لاَ بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ", reference: "Sahih al-Bukhari 3616" },
      source: hadith("bukhari", "3616", "Abdullah ibn Abbas", "Sahih", "When the Prophet ﷺ visited a sick person he would say: no harm, it is a cleansing, if Allah wills.", "when visiting a patient used to say"),
      difficulty: 2,
      questions: [
        { q: "What does tahurun mean in this dua?", a: "A cleansing", wrong: ["A punishment", "A sleep", "A journey"], why: "The illness cleanses sins, if Allah wills." },
        { q: "When did he ﷺ say La ba'sa, tahurun in sha Allah?", a: "When visiting someone ill", wrong: ["At a wedding", "When it rained", "At the market"], why: "Bukhari 3616." },
        { q: "Visiting the sick is part of the Prophet's ﷺ way.", tf: true, why: "He visited the sick and made dua for them." }
      ]
    },
    {
      slug: "anger",
      title: "When you get angry",
      line: "Angry? Say: A'udhu billahi minash-shaytan.",
      facts: ["I seek refuge in Allah from Shaytan", "Two men were shouting"],
      quote: { text: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ", reference: "Sahih al-Bukhari 3282" },
      source: hadith("bukhari", "3282", "Sulayman ibn Surad", "Sahih", "Two men were insulting each other and one grew red with anger. The Prophet ﷺ said: I know a word that would take his anger away: I seek refuge with Allah from Satan.", "I seek Refuge with Allah from Satan"),
      difficulty: 1,
      questions: [
        { q: "What word takes anger away, as the Prophet ﷺ said?", a: "A'udhu billahi minash-shaytan", wrong: ["Shouting louder", "Alhamdulillah", "Nothing helps"], why: "Bukhari 3282." },
        { q: "What does A'udhu billah mean?", a: "I seek refuge in Allah", wrong: ["I am the strongest", "Leave me alone", "Thank you"], why: "Seeking Allah's protection from Shaytan." },
        { q: "Anger can come from Shaytan.", tf: true, why: "So we seek refuge in Allah from him." }
      ]
    }
  ]
};

const QURAN_DUAS: DeepUnit = {
  key: "dua-quran",
  topicId: "duas",
  branchId: "duas-quran",
  branch: { title: "Duas from the Quran", description: "Short duas of the prophets and believers, straight from the Quran." },
  name: "the duas of the Quran",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "best",
      title: "Good in this world and the next",
      line: "His ﷺ most frequent dua: Rabbana atina fid-dunya hasanah.",
      facts: ["Quran 2:201", "Good here, good there, saved from the Fire"],
      quote: quranQuote(2, 201),
      source: hadith("bukhari", "6389", "Anas ibn Malik", "Sahih", "The most frequent dua of the Prophet ﷺ was: O Allah, our Lord, give us good in this world and good in the Hereafter, and save us from the punishment of the Fire.", "The most frequent invocation"),
      difficulty: 1,
      questions: [
        { q: "Which dua did the Prophet ﷺ make most often?", a: "Rabbana atina fid-dunya hasanah", wrong: ["Rabbi zidni 'ilma", "The dua of travel", "The dua for rain"], why: "Bukhari 6389." },
        { q: "What does it ask for?", a: "Good in this world and the next", wrong: ["Only money", "Only a long life", "Only good weather"], why: "Fid-dunya hasanah wa fil-akhirati hasanah." },
        { q: "This dua also asks to be saved from the Fire.", tf: true, why: "Wa qina 'adhaban-nar." }
      ]
    },
    {
      slug: "knowledge",
      title: "More knowledge",
      line: "Allah taught His Prophet ﷺ: my Lord, increase me in knowledge.",
      facts: ["Quran 20:114", "Rabbi zidni 'ilma"],
      quote: quranQuote(20, 114),
      source: quran(20, 114, "Exalted is Allah, the True King. And do not hasten with the Quran before its revelation is completed to you, and say: my Lord, increase me in knowledge."),
      difficulty: 1,
      questions: [
        { q: "What does Rabbi zidni 'ilma ask for?", a: "More knowledge", wrong: ["More sleep", "More food", "More games"], why: "Quran 20:114." },
        { q: "A good time to say Rabbi zidni 'ilma is...", a: "Before studying", wrong: ["Only when sick", "Only at night", "Never out loud"], why: "Asking Allah to grow what you learn." },
        { q: "Allah Himself taught this dua in the Quran.", tf: true, why: "And say: my Lord, increase me in knowledge." }
      ]
    },
    {
      slug: "steady",
      title: "Keep our hearts steady",
      line: "Our Lord, do not let our hearts swerve after You guided us.",
      facts: ["Quran 3:8", "Rabbana la tuzigh qulubana"],
      quote: quranQuote(3, 8),
      source: quran(3, 8, "Our Lord, let not our hearts deviate after You have guided us, and grant us mercy from Yourself. You are the Giver."),
      difficulty: 2,
      questions: [
        { q: "What does the dua in 3:8 ask Allah to keep steady?", a: "Our hearts", wrong: ["Our houses", "Our money", "The weather"], why: "La tuzigh qulubana." },
        { q: "After what should our hearts not swerve?", a: "After Allah guided us", wrong: ["After dinner", "After school", "After a holiday"], why: "Ba'da idh hadaytana." },
        { q: "The dua also asks Allah for mercy.", tf: true, why: "Wa hab lana min ladunka rahmah." }
      ]
    },
    {
      slug: "parents",
      title: "A dua for parents",
      line: "My Lord, have mercy on my parents as they raised me.",
      facts: ["Quran 17:24", "Rabbir-hamhuma kama rabbayani saghira"],
      quote: quranQuote(17, 24),
      source: quran(17, 24, "Lower to them the wing of humility out of mercy and say: my Lord, have mercy upon them as they brought me up when I was small."),
      difficulty: 1,
      questions: [
        { q: "Who is the dua in 17:24 for?", a: "Your parents", wrong: ["Your teacher", "Your friends", "Your neighbors"], why: "Have mercy upon them as they raised me." },
        { q: "Why do we ask mercy for them?", a: "They raised us when we were small", wrong: ["They are rich", "They are famous", "They asked us to"], why: "Kama rabbayani saghira." },
        { q: "The ayah also says to be humble with your parents.", tf: true, why: "Lower to them the wing of humility." }
      ]
    },
    {
      slug: "family",
      title: "Joy in our families",
      line: "Our Lord, make our spouses and children a joy to our eyes.",
      facts: ["Quran 25:74", "And make us leaders of the God-fearing"],
      quote: quranQuote(25, 74),
      source: quran(25, 74, "Our Lord, grant us from our spouses and children comfort to our eyes, and make us leaders for the righteous."),
      difficulty: 2,
      questions: [
        { q: "What does 25:74 ask our families to be?", a: "A joy to our eyes", wrong: ["Rich and famous", "Far away", "Always quiet"], why: "Qurrata a'yun: comfort of the eyes." },
        { q: "Who makes this dua in Surah Al-Furqan?", a: "The servants of the Most Merciful", wrong: ["The people of Firawn", "The hypocrites", "The angels only"], why: "The ayahs describe 'Ibad ar-Rahman." },
        { q: "The dua asks to be leaders of the God-fearing.", tf: true, why: "Waj'alna lil-muttaqina imama." }
      ]
    },
    {
      slug: "musa",
      title: "Musa's dua",
      line: "My Lord, open my chest for me and make my task easy.",
      facts: ["Quran 20:25-28", "Before Musa went to Firawn", "Untie the knot from my tongue"],
      quote: quranQuote(20, 25),
      source: quran(20, 25, "Musa said: my Lord, expand for me my chest, ease my task for me, and untie the knot from my tongue, that they may understand my speech."),
      difficulty: 2,
      questions: [
        { q: "Who first made the dua Rabbish-rah li sadri?", a: "Musa", wrong: ["Yunus", "Adam", "Ibrahim"], why: "Quran 20:25." },
        { q: "Where was Musa about to go?", a: "To Firawn", wrong: ["To Makkah", "To the market", "To sleep"], why: "Allah sent him to Firawn." },
        { q: "A good time for this dua is before a hard talk or a test.", tf: true, why: "It asks for an open chest and an easy task." }
      ]
    },
    {
      slug: "adam",
      title: "Adam's dua",
      line: "Adam and Hawwa said: our Lord, we have wronged ourselves.",
      facts: ["Quran 7:23", "Rabbana zalamna anfusana"],
      quote: quranQuote(7, 23),
      source: quran(7, 23, "They said: our Lord, we have wronged ourselves, and if You do not forgive us and have mercy on us, we will surely be among the losers."),
      difficulty: 2,
      questions: [
        { q: "Who said Rabbana zalamna anfusana?", a: "Adam and Hawwa", wrong: ["Firawn and Haman", "Musa and Harun", "The people of Ad"], why: "Quran 7:23." },
        { q: "What did they admit?", a: "We have wronged ourselves", wrong: ["We did nothing wrong", "Shaytan is innocent", "We want more fruit"], why: "They blamed themselves and asked forgiveness." },
        { q: "Saying sorry to Allah is the way of Adam.", tf: true, why: "Unlike Iblis, he admitted his mistake." }
      ]
    },
    {
      slug: "yunus",
      title: "Yunus in the whale",
      line: "Yunus called from the whale: no god but You; glory to You!",
      facts: ["Quran 21:87", "La ilaha illa anta subhanaka", "Allah saved him"],
      quote: quranQuote(21, 87),
      source: quran(21, 87, "He called out within the darknesses: there is no god except You; glory be to You; indeed I have been of the wrongdoers. So We answered him and saved him from the distress."),
      difficulty: 2,
      questions: [
        { q: "Where was Yunus when he made this dua?", a: "In the darkness, inside the whale", wrong: ["On a mountain", "In a palace", "In the market"], why: "He called out within the darknesses." },
        { q: "What did Allah do after his dua?", a: "Answered him and saved him", wrong: ["Ignored him", "Sent a storm", "Made him king"], why: "Quran 21:88." },
        { q: "Yunus admitted his own wrong in the dua.", tf: true, why: "Inni kuntu minaz-zalimin." }
      ]
    }
  ]
};

const DHIKR: DeepUnit = {
  key: "dua-dhikr",
  topicId: "duas",
  branchId: "duas-reward",
  branch: { title: "The reward of dhikr", description: "Why remembering Allah is the lightest and the heaviest deed." },
  name: "the reward of dhikr",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "hearts-rest",
      title: "Hearts find rest",
      line: "In the remembrance of Allah, hearts find rest.",
      facts: ["Quran 13:28", "Dhikr calms the heart"],
      quote: quranQuote(13, 28),
      source: quran(13, 28, "Those who believe and whose hearts find rest in the remembrance of Allah. Surely in the remembrance of Allah hearts find rest."),
      difficulty: 1,
      questions: [
        { q: "In what do hearts find rest, says 13:28?", a: "The remembrance of Allah", wrong: ["Money", "Games", "Sleeping late"], why: "Bi dhikrillahi tatma'innul-qulub." },
        { q: "You feel worried before an exam. What does this ayah point you to?", a: "Remembering Allah", wrong: ["Giving up", "Shouting", "Skipping prayer"], why: "Dhikr brings calm." },
        { q: "Dhikr is only for the mosque.", tf: false, why: "You can remember Allah anywhere, any time." }
      ]
    },
    {
      slug: "remember-me",
      title: "Remember Me, I remember you",
      line: "Allah says: remember Me, and I will remember you.",
      facts: ["Quran 2:152", "Be thankful to Me"],
      quote: quranQuote(2, 152),
      source: quran(2, 152, "So remember Me; I will remember you. And be grateful to Me and do not deny Me."),
      difficulty: 1,
      questions: [
        { q: "What does Allah promise the one who remembers Him?", a: "He will remember them", wrong: ["Nothing", "A new car", "Fame"], why: "Fadhkuruni adhkurkum." },
        { q: "What else does 2:152 ask of us?", a: "To be thankful to Allah", wrong: ["To be proud", "To be lazy", "To complain"], why: "Washkuru li." },
        { q: "Allah remembers the one who remembers Him.", tf: true, why: "Quran 2:152." }
      ]
    },
    {
      slug: "living-dead",
      title: "The living and the dead",
      line: "Remembering Allah or not is like being alive or dead.",
      facts: ["Told by Abu Musa", "The one who remembers is like the living", "Dhikr gives the heart life"],
      quote: { text: "مَثَلُ الَّذِي يَذْكُرُ رَبَّهُ وَالَّذِي لاَ يَذْكُرُ مَثَلُ الْحَىِّ وَالْمَيِّتِ", reference: "Sahih al-Bukhari 6407" },
      source: hadith("bukhari", "6407", "Abu Musa al-Ash'ari", "Sahih", "The example of one who remembers his Lord and one who does not is like the living and the dead.", "a living creature compared to a dead one"),
      difficulty: 2,
      questions: [
        { q: "The one who remembers Allah is like what?", a: "A living person", wrong: ["A sleeping person", "A dead person", "A lost person"], why: "Bukhari 6407." },
        { q: "And the one who never remembers Him?", a: "Like the dead", wrong: ["Like a king", "Like a bird", "Like a teacher"], why: "Like the living and the dead." },
        { q: "Dhikr keeps the heart alive.", tf: true, why: "That is the meaning of the example." }
      ]
    },
    {
      slug: "two-words",
      title: "Two light words",
      line: "Two words, light on the tongue, heavy on the Scale.",
      facts: ["Subhanallahi wa bihamdih", "Subhanallahil-'azim", "Loved by the Most Merciful"],
      quote: { text: "سُبْحَانَ اللَّهِ الْعَظِيمِ، سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", reference: "Sahih al-Bukhari 6406" },
      source: hadith("bukhari", "6406", "Abu Hurairah", "Sahih", "Two words are light on the tongue, heavy on the Scale and loved by the Most Merciful: Subhanallahil-'azim and Subhanallahi wa bihamdih.", "very easy for the tongue to say"),
      difficulty: 2,
      questions: [
        { q: "Where are the two words heavy?", a: "On the Scale", wrong: ["In your pocket", "In your bag", "Nowhere"], why: "Heavy in the balance." },
        { q: "Which pair are the two words?", a: "Subhanallahi wa bihamdih, Subhanallahil-'azim", wrong: ["Bismillah, Amin", "Salam, Shukran", "Insha'Allah, Masha'Allah"], why: "Bukhari 6406." },
        { q: "These words are loved by the Most Merciful.", tf: true, why: "Habibatani ilar-Rahman." }
      ]
    },
    {
      slug: "four-words",
      title: "The four best words",
      line: "Four words are the most loved to Allah.",
      facts: ["Subhanallah, Alhamdulillah", "La ilaha illallah, Allahu Akbar", "Start with any of them"],
      quote: { text: "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلاَ إِلَهَ إِلاَّ اللَّهُ وَاللَّهُ أَكْبَرُ", reference: "Sahih Muslim 2137a" },
      source: hadith("muslim", "2137a", "Samurah ibn Jundub", "Sahih", "The most beloved words to Allah are four: Subhanallah, Al-hamdu lillah, La ilaha illallah and Allahu Akbar. It does not matter which of them you begin with.", "The dearest phrases to Allah are four"),
      difficulty: 2,
      questions: [
        { q: "How many words are most loved to Allah in this hadith?", a: "Four", wrong: ["Two", "Ten", "Seven"], why: "Muslim 2137a." },
        { q: "Which of these is one of them?", a: "Allahu Akbar", wrong: ["Good morning", "Thank you", "Well done"], why: "With Subhanallah, Alhamdulillah and La ilaha illallah." },
        { q: "You must say them in one fixed order.", tf: false, why: "It does not matter which you begin with." }
      ]
    },
    {
      slug: "treasure",
      title: "A treasure of Paradise",
      line: "La hawla wa la quwwata illa billah is a treasure of Paradise.",
      facts: ["No might and no power except with Allah", "Told to Abu Musa"],
      quote: { text: "لاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللَّهِ", reference: "Sahih al-Bukhari 6384" },
      source: hadith("bukhari", "6384", "Abu Musa al-Ash'ari", "Sahih", "The Prophet ﷺ told Abu Musa: say La hawla wa la quwwata illa billah, for it is one of the treasures of Paradise.", "one of the treasures of Paradise"),
      difficulty: 2,
      questions: [
        { q: "La hawla wa la quwwata illa billah is a treasure of where?", a: "Paradise", wrong: ["The ocean", "A king's palace", "The desert"], why: "Bukhari 6384." },
        { q: "What does it mean?", a: "No might and no power except with Allah", wrong: ["I am strong alone", "Let us go home", "Peace be upon you"], why: "Every strength is from Allah." },
        { q: "On that journey he ﷺ also said: Allah is not deaf or far away.", tf: true, why: "You call One who hears and sees." }
      ]
    },
    {
      slug: "salawat",
      title: "Salawat on the Prophet ﷺ",
      line: "Send one salawat on the Prophet ﷺ; Allah sends you ten.",
      facts: ["Allahumma salli 'ala Muhammad", "Told by Abu Hurairah"],
      quote: { text: "مَنْ صَلَّى عَلَىَّ وَاحِدَةً صَلَّى اللَّهُ عَلَيْهِ عَشْرًا", reference: "Sahih Muslim 408" },
      source: hadith("muslim", "408", "Abu Hurairah", "Sahih", "He who sends blessings upon me once, Allah sends blessings upon him ten times.", "Allah would bless him ten times"),
      difficulty: 1,
      questions: [
        { q: "Send one salawat on the Prophet ﷺ. How many blessings does Allah send you?", a: "Ten", wrong: ["One", "Two", "None"], why: "Muslim 408." },
        { q: "Which words send salawat?", a: "Allahumma salli 'ala Muhammad", wrong: ["Alhamdulillah", "Astaghfirullah", "Amin"], why: "O Allah, send blessings on Muhammad." },
        { q: "Writing ﷺ after his name is a short salawat.", tf: true, why: "It stands for sallallahu 'alayhi wa sallam." }
      ]
    },
    {
      slug: "istighfar",
      title: "A hundred times a day",
      line: "The Prophet ﷺ asked Allah's forgiveness 100 times a day.",
      facts: ["Astaghfirullah", "Told by Al-Agharr al-Muzani"],
      quote: { text: "وَإِنِّي لأَسْتَغْفِرُ اللَّهَ فِي الْيَوْمِ مِائَةَ مَرَّةٍ", reference: "Sahih Muslim 2702a" },
      source: hadith("muslim", "2702a", "Al-Agharr al-Muzani", "Sahih", "The Prophet ﷺ said: there is at times a shade over my heart, and I seek forgiveness from Allah a hundred times a day.", "a hundred times a day"),
      difficulty: 2,
      questions: [
        { q: "How many times a day did the Prophet ﷺ ask forgiveness?", a: "A hundred", wrong: ["Once", "Five", "Seven"], why: "Muslim 2702a." },
        { q: "Which word asks Allah for forgiveness?", a: "Astaghfirullah", wrong: ["Alhamdulillah", "Masha'Allah", "Subhanallah"], why: "I ask Allah's forgiveness." },
        { q: "Only people with big sins need istighfar.", tf: false, why: "Even the Prophet ﷺ did it a hundred times a day." }
      ]
    },
    {
      slug: "worry",
      title: "When you are worried",
      line: "O Allah, I seek refuge in You from worry and grief.",
      facts: ["Allahumma inni a'udhu bika minal-hammi wal-hazan", "Also from laziness and debt"],
      quote: { text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْجُبْنِ وَالْبُخْلِ، وَضَلَعِ الدَّيْنِ، وَغَلَبَةِ الرِّجَالِ", reference: "Sahih al-Bukhari 6369" },
      source: hadith("bukhari", "6369", "Anas ibn Malik", "Sahih", "The Prophet ﷺ used to say: O Allah, I seek refuge with You from worry and grief, from weakness and laziness, from cowardice and stinginess, from heavy debt and from being overpowered by men.", "I seek refuge with You from worry and grief"),
      difficulty: 2,
      questions: [
        { q: "What two feelings does this dua start with?", a: "Worry and grief", wrong: ["Joy and fun", "Hunger and thirst", "Heat and cold"], why: "Minal-hammi wal-hazan." },
        { q: "Which of these does it also seek refuge from?", a: "Laziness", wrong: ["Prayer", "Reading", "Kindness"], why: "Wal-'ajzi wal-kasal." },
        { q: "The Prophet ﷺ used to say this dua himself.", tf: true, why: "Bukhari 6369." }
      ]
    },
    {
      slug: "distress",
      title: "In times of distress",
      line: "In distress he ﷺ said: La ilaha illallahul-'Azimul-Halim.",
      facts: ["Lord of the mighty Throne", "Lord of the heavens and the earth"],
      quote: { text: "لاَ إِلَهَ إِلاَّ اللَّهُ الْعَظِيمُ الْحَلِيمُ، لاَ إِلَهَ إِلاَّ اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لاَ إِلَهَ إِلاَّ اللَّهُ رَبُّ السَّمَوَاتِ، وَرَبُّ الأَرْضِ، وَرَبُّ الْعَرْشِ الْكَرِيمِ", reference: "Sahih al-Bukhari 6346" },
      source: hadith("bukhari", "6346", "Abdullah ibn Abbas", "Sahih", "At a time of distress the Prophet ﷺ used to say: there is no god but Allah, the Mighty, the Forbearing; no god but Allah, Lord of the mighty Throne; no god but Allah, Lord of the heavens, Lord of the earth and Lord of the noble Throne.", "at a time of distress"),
      difficulty: 3,
      questions: [
        { q: "When did the Prophet ﷺ say this dhikr?", a: "In times of distress", wrong: ["At weddings", "When eating", "On Eid only"], why: "Bukhari 6346." },
        { q: "Allah is called Lord of what in it?", a: "The mighty Throne", wrong: ["The market", "The palace", "The ships"], why: "Rabbul-'arshil-'azim." },
        { q: "In hard times he ﷺ turned to praising Allah.", tf: true, why: "Each line begins: there is no god but Allah." }
      ]
    }
  ]
};

export const DUA_UNITS: readonly DeepUnit[] = [MORNING_EVENING, SLEEP, DAY, QURAN_DUAS, DHIKR];

/** The Duas and adhkar topic. Its units hold only deep lessons, added by addDeepUnits. */
export const DUAS_SECTION: LearningSection = {
  id: "duas",
  topicId: "duas",
  title: "Duas and adhkar",
  description: "Morning and evening adhkar, bedtime duas and the duas of the day, from the Quran and sahih hadith.",
  badge: "Topic 12",
  focus: "Morning and evening, sleep and waking, eating, travel, the mosque, and duas from the Quran.",
  mascot: "hijabi",
  accentColor: "#2E9C8F",
  starsTarget: 0,
  branches: [],
  nodes: []
};

/** Lessons, for tests. */
export const DUA_LESSONS: readonly DeepLesson[] = DUA_UNITS.flatMap((unit) => unit.lessons);
