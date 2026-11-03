import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Abasa ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Abasa 80:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_80_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Abasa 80:${ayah}`,
    url: `https://quran.com/80:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 80:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q80 = (ayah: number) => quranQuote(80, ayah);


/** Ayahs 1 to 16: the blind seeker, warning everyone equally, and the honoured pages carried by noble angels. */
const ABASA_ONE: DeepUnit = {
  key: "abasa1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-80",
  name: "Abasa, ayahs 1-16",
  kind: "skill",
  lessonType: "surah",
  surahName: "Abasa",
  lessons: [
    {
      slug: "the-blind-seeker",
      title: "The blind seeker",
      line: "A blind believer came asking while a leader was being invited.",
      facts: ["Ibn Umm Maktum: an early Muslim", "Abasa: he frowned"],
      quote: q80(1),
      source: ik(1, "Ibn Kathir says the Prophet ﷺ was inviting a Quraysh leader and asked Ibn Umm Maktum, who was blind, to wait a moment.", "he asked Ibn Umm Maktum to wait for a moment so he could complete his conversation"),
      difficulty: 1,
      questions: [
        { q: "Who was the blind man, per Ibn Kathir?", a: "Ibn Umm Maktum", wrong: ["Abu Jahl", "Bilal", "Abu Talib"], why: "Ibn Umm Maktum came to him, and he was of those who had accepted Islam in its earliest days." },
        { q: "Whom was the Prophet ﷺ speaking to then?", a: "A great leader of the Quraysh", wrong: ["A Roman king", "A child", "A merchant from Yemen"], why: "The Messenger of Allah was addressing one of the great leaders of the Quraysh while hoping that he would accept Islam." },
        { tf: true, q: "Ibn Umm Maktum was one of the earliest Muslims.", why: "He was of those who had accepted Islam in its earliest days." }
      ]
    },
    {
      slug: "he-might-become-pure",
      title: "He might become pure",
      line: "The sincere seeker was the one who might grow pure in heart.",
      facts: ["Yazzakka: becomes pure", "Dhikra: a reminder"],
      quote: q80(3),
      source: ik(3, "Ibn Kathir says the blind man might gain purity in his soul, and the reminder might help him stay away from the forbidden.", "he may attain purification and cleanliness in his soul"),
      difficulty: 2,
      questions: [
        { q: "What might the blind man gain, per 80:3?", a: "He might become pure", wrong: ["He might become rich", "He might become king", "He might leave"], why: "And how can you know that he might become pure?" },
        { q: "How might the reminder help, per Ibn Kathir?", a: "He abstains from the forbidden", wrong: ["He gets wealth", "He gets famous", "He wins a race"], why: "He may receive admonition and abstain from the forbidden." },
        { tf: false, q: "The reminder could not have helped the blind man.", why: "Or he might receive admonition, and the admonition might profit him?" }
      ]
    },
    {
      slug: "the-self-sufficient",
      title: "The one who feels no need",
      line: "Allah guides hearts; the caller is not blamed if people refuse.",
      facts: ["Istaghna: felt self-sufficient", "Only Allah guides hearts"],
      quote: q80(5),
      source: ik(7, "Ibn Kathir says the Prophet ﷺ faced the rich man hoping he would be guided, but is not responsible if he refuses purity.", "you are not responsible for him if he does not attain purification"),
      difficulty: 2,
      questions: [
        { q: "Who thinks himself self-sufficient, per 80:5?", a: "The rich leader", wrong: ["The blind man", "An angel", "A child"], why: "You face the rich person so that perhaps he may be guided." },
        { q: "What if he does not become pure, per 80:7?", a: "The Prophet ﷺ is not responsible", wrong: ["The Prophet ﷺ is punished", "The blind man is blamed", "The city is blamed"], why: "You are not responsible for him if he does not attain purification." },
        { tf: true, q: "The Prophet ﷺ hoped the leader would be guided.", why: "You face the rich person so that perhaps he may be guided." }
      ]
    },
    {
      slug: "the-one-who-came-running",
      title: "The one who came running",
      line: "The blind man came eagerly, fearing Allah and wanting guidance.",
      facts: ["Yas'a: comes running", "Yakhsha: fears Allah"],
      quote: q80(8),
      source: ik(8, "Ibn Kathir says the blind man was seeking the Prophet ﷺ and came so he might be guided by what he heard.", "he is seeking you and he comes to you so that he may be guided"),
      difficulty: 2,
      questions: [
        { q: "How did he come, per 80:8?", a: "Running", wrong: ["Slowly, with no care", "Riding a camel", "With an army"], why: "But as for him who came to you running." },
        { q: "What was in his heart, per 80:9?", a: "Fear of Allah", wrong: ["Pride", "Anger", "Greed"], why: "And is afraid." },
        { tf: true, q: "He came so that he might be guided.", why: "He comes to you so that he may be guided by what you say to him." }
      ]
    },
    {
      slug: "warn-everyone-equally",
      title: "Warn everyone equally",
      line: "The message is for everyone: rich and poor, strong and weak.",
      facts: ["No favourites in dawah", "Allah guides whom He wills"],
      quote: q80(10),
      source: ik(10, "Ibn Kathir says Allah commands His Messenger ﷺ to warn the noble and the weak, rich and poor, men and women, young and old equally.", "he should equal warn the noble and the weak, the poor and the rich"),
      difficulty: 2,
      questions: [
        { q: "Whom should the message reach, per Ibn Kathir?", a: "Everyone equally", wrong: ["Only leaders", "Only the rich", "Only adults"], why: "He should equal warn the noble and the weak, the poor and the rich." },
        { q: "Who guides whomever He chooses?", a: "Allah", wrong: ["The leaders", "The rich", "The crowd"], why: "Then Allah will guide whomever He chooses to a path that is straight." },
        { tf: false, q: "Teaching the young and the poor matters less.", why: "The men and the women, the young and the old." }
      ]
    },
    {
      slug: "a-reminder-for-all",
      title: "A reminder for all",
      line: "The Quran is a reminder; whoever wills will take heed.",
      facts: ["Tadhkirah: a reminder", "The choice is ours"],
      quote: q80(11),
      source: ik(12, "Qatadah and As-Suddi said the admonition is the Quran; whoever wills remembers Allah in all of his affairs.", "so whoever wills, he remembers Allah in all of his affairs"),
      difficulty: 2,
      questions: [
        { q: "What is the admonition, per Qatadah?", a: "The Quran", wrong: ["A poem", "A law of kings", "A dream"], why: "Qatadah and As-Suddi both said, This means the Quran." },
        { q: "Who will pay attention, per 80:12?", a: "Whoever wills", wrong: ["No one", "Only angels", "Only scholars"], why: "So, whoever wills, let him pay attention to it." },
        { tf: true, q: "Ibn Kathir says the surah also teaches giving knowledge equally.", why: "This advice in conveying knowledge equally among people, whether they are of noble or low class." }
      ]
    },
    {
      slug: "honoured-pages",
      title: "Honoured pages",
      line: "The Quran is in honoured pages, raised high and kept pure.",
      facts: ["Mukarramah: honoured", "Mutahharah: purified"],
      quote: q80(13),
      source: ik(14, "Ibn Kathir says all of the Quran is in honoured, respected pages, elevated in status and purified from additions and deficiency.", "from impurity, additions and deficiency"),
      difficulty: 2,
      questions: [
        { q: "Where is the reminder, per 80:13?", a: "In Records held in honour", wrong: ["On a mountain", "In the sea", "In a cave"], why: "In Records held in honor." },
        { q: "What does exalted mean, per Ibn Kathir?", a: "Elevated in status", wrong: ["Very heavy", "Very old", "Very long"], why: "Exalted, meaning, elevated in status." },
        { tf: false, q: "Words have been added to the Quran over time.", why: "Purified, meaning, from impurity, additions and deficiency." }
      ]
    },
    {
      slug: "noble-ambassadors",
      title: "Noble ambassadors",
      line: "Noble, obedient angels carry the revelation like envoys.",
      facts: ["Safarah: ambassadors", "Kiram Bararah: noble, obedient"],
      quote: q80(15),
      source: ik(15, "Ibn Abbas, Mujahid and others said the ambassadors are the angels, who bring revelation like envoys between people.", "These are the angels"),
      difficulty: 2,
      questions: [
        { q: "Who are the Safarah, per Ibn Abbas?", a: "The angels", wrong: ["The poets", "The kings", "The traders"], why: "Ibn Abbas, Mujahid, Ad-Dahhak, and Ibn Zayd, all said, These are the angels." },
        { q: "How are they described, per 80:16?", a: "Honourable and obedient", wrong: ["Proud and lazy", "Hidden and unknown", "Weak and slow"], why: "Honorable and obedient." },
        { tf: true, q: "Their character and deeds are pure and perfect.", why: "Their character and their deeds are righteous, pure and perfect." }
      ]
    },
    {
      slug: "with-the-noble-scribes",
      title: "With the noble scribes",
      line: "Quran masters are with the angels; strugglers earn double.",
      facts: ["Hifz: memorising", "Two rewards for effort"],
      quote: q80(16),
      source: hadith("bukhari", "4937", "Aishah", "Sahih", "The Prophet ﷺ said one who recites the Quran and masters it will be with the noble righteous scribes, and one who struggles gets a double reward.", "will be with the noble righteous scribes"),
      difficulty: 3,
      questions: [
        { q: "Who will be with the noble scribes?", a: "One who masters the Quran", wrong: ["One who sleeps a lot", "One who is rich", "One who travels"], why: "Such a person as recites the Quran and masters it by heart, will be with the noble righteous scribes." },
        { q: "What does one who struggles to recite get?", a: "A double reward", wrong: ["No reward", "Half a reward", "A warning"], why: "And recites it with great difficulty, will have a double reward." },
        { tf: false, q: "Reciting slowly with difficulty earns nothing.", why: "And recites it with great difficulty, will have a double reward." }
      ]
    }
  ]
};

/** Ayahs 17 to 32: man's beginning and return, and the food Allah grows from the earth. */
const ABASA_TWO: DeepUnit = {
  key: "abasa2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-80",
  name: "Abasa, ayahs 17-32",
  kind: "skill",
  lessonType: "surah",
  surahName: "Abasa",
  lessons: [
    {
      slug: "how-ungrateful",
      title: "How ungrateful!",
      line: "Allah rebukes the one who denies the Hereafter with no proof.",
      facts: ["Kufr: ingratitude, disbelief", "Denial without knowledge"],
      quote: q80(17),
      source: ik(17, "Abu Malik said the ayah is about the rejecting man who denies with no argument, only because it seems far off to him.", "due to his abundant denial without any supporting argument"),
      difficulty: 2,
      questions: [
        { q: "Why does he deny, per Abu Malik?", a: "Because it seems far-fetched to him", wrong: ["Because he has proof", "Because he is a scholar", "Because he saw it"], why: "He denies simply because he thinks it is farfetched and because he lacks knowledge of it." },
        { q: "What does Ibn Jurayj say of how ungrateful he is?", a: "None is worse in disbelief", wrong: ["He is a little ungrateful", "He is thankful", "He is confused"], why: "This means none is worse in disbelief than he is." },
        { tf: false, q: "The denier had a strong argument for his view.", why: "Due to his abundant denial without any supporting argument." }
      ]
    },
    {
      slug: "set-in-due-proportion",
      title: "Set in due proportion",
      line: "From a tiny drop Allah shaped us and wrote our whole life.",
      facts: ["Nutfah: a small drop", "Qaddarah: measured him"],
      quote: q80(19),
      source: ik(19, "Ibn Kathir says Allah decreed each person's life span, provision, deeds and whether he would be miserable or happy.", "He decreed his life span, his sustenance, his deeds"),
      difficulty: 2,
      questions: [
        { q: "From what did Allah create him, per 80:19?", a: "A Nutfah, a small drop", wrong: ["Fire", "Light", "Stone"], why: "From a Nutfah He created him and then set him in due proportion." },
        { q: "What did Allah decree, per Ibn Kathir?", a: "His life span, provision and deeds", wrong: ["Only his name", "Only his height", "Nothing"], why: "He decreed his life span, his sustenance, his deeds, and whether he would be miserable or happy." },
        { tf: true, q: "The One who created us first can bring us back.", why: "He is able to bring him back to life just as He created him initially." }
      ]
    },
    {
      slug: "the-path-made-easy",
      title: "The path made easy",
      line: "Allah made the way of guidance clear and easy to follow.",
      facts: ["As-Sabil: the path", "Grateful or ungrateful"],
      quote: q80(20),
      source: ik(20, "Mujahid said Allah explained the path, made it clear and easy to act on; Ibn Kathir calls this the most correct view.", "We explained it to him, clarified it, and made it easy for him to act upon"),
      difficulty: 3,
      questions: [
        { q: "What did Allah make easy, per 80:20?", a: "The path", wrong: ["Wealth", "Fame", "Sleep"], why: "Then He made the path easy for him." },
        { q: "Which ayah did Mujahid compare it to?", a: "76:3, We guided him on the path", wrong: ["1:1, In the name of Allah", "112:1, Say He is Allah", "2:255, Ayat al-Kursi"], why: "Verily, We guided him on the path, he is either grateful or ungrateful." },
        { tf: true, q: "Ibn Abbas also said the path is the easy birth.", why: "Then He made his coming out of his mother's belly easy for him." }
      ]
    },
    {
      slug: "death-and-rising",
      title: "Death and rising again",
      line: "Allah causes death, gives a grave, then raises when He wills.",
      facts: ["Al-Ba'th: the resurrection", "An-Nushur: raising up"],
      quote: q80(21),
      source: ik(22, "Ibn Kathir says Allah resurrects man after death; this is called Al-Bath and An-Nushur.", "He resurrects him after his death"),
      difficulty: 1,
      questions: [
        { q: "What does Allah do after death, per 80:21?", a: "Puts him in his grave", wrong: ["Leaves him on a road", "Turns him to a star", "Nothing"], why: "Then He causes him to die and puts him in his grave." },
        { q: "When will He resurrect him, per 80:22?", a: "When it is His will", wrong: ["Never", "When people vote", "Every year"], why: "Then when it is His will, He will resurrect him." },
        { tf: true, q: "Resurrection is also called An-Nushur.", why: "This is called Al-Bath, resurrection, and An-Nushur, resuscitation." }
      ]
    },
    {
      slug: "one-bone-remains",
      title: "One bone remains",
      line: "From one tiny bone that never decays, people will be rebuilt.",
      facts: ["The tailbone", "Allah rebuilds us"],
      quote: q80(22),
      source: hadith("bukhari", "4935", "Abu Hurairah", "Sahih", "The Prophet ﷺ said every part of the body decays except one small bone at the end of the spine, from which people will be recreated.", "There is nothing of the human body that does not decay except one bone"),
      difficulty: 3,
      questions: [
        { q: "What part does not decay, per the hadith?", a: "One small bone", wrong: ["The heart", "The hair", "The eyes"], why: "There is nothing of the human body that does not decay except one bone." },
        { q: "What is made from it on the Day?", a: "The body is recreated", wrong: ["A tree", "A star", "Nothing"], why: "Of which the human body will be recreated on the Day of Resurrection." },
        { tf: true, q: "Allah sends rain and bodies grow like plants.", why: "Allah will send water from the sky and then the dead bodies will grow like vegetation grows." }
      ]
    },
    {
      slug: "not-yet-done",
      title: "Not yet fulfilled",
      line: "Man has not yet done all that Allah commanded him.",
      facts: ["Kalla: no, not so", "A set time for all"],
      quote: q80(23),
      source: ik(23, "Ibn Jarir said man has not fulfilled his duties to his Lord; Ibn Kathir adds Allah decreed mankind's duration, then He raises them.", "Allah has decreed the existence of mankind, and its duration"),
      difficulty: 3,
      questions: [
        { q: "What has man not done, per 80:23?", a: "What Allah commanded him", wrong: ["Eaten enough", "Travelled enough", "Slept enough"], why: "Nay, but he has not done what He commanded him." },
        { q: "What did Ibn Jarir say man failed to fulfil?", a: "His obligations to his Lord", wrong: ["His trade deals", "His games", "His travels"], why: "Man has not fulfilled for his Lord the obligations that were imposed upon him." },
        { tf: false, q: "The disbeliever truly fulfilled all of Allah's rights.", why: "He claims that he has fulfilled Allah's right upon him, but he has not done what He commanded him." }
      ]
    },
    {
      slug: "look-at-your-food",
      title: "Look at your food",
      line: "Every meal is a gift, and a sign that life returns.",
      facts: ["Ta'am: food", "Life from dead earth"],
      quote: q80(24),
      source: ik(24, "Ibn Kathir says looking at our food calls us to reflect on Allah's favour, and plants rising from dead earth prove the dead will rise.", "This is a call to reflect upon Allah"),
      difficulty: 1,
      questions: [
        { q: "What should man look at, per 80:24?", a: "His food", wrong: ["His clothes", "His house", "His money"], why: "Then let man look at his food." },
        { q: "What do plants from dead earth prove, per Ibn Kathir?", a: "Bodies can be brought back to life", wrong: ["The earth is flat", "Rain is random", "Nothing at all"], why: "The bodies can be brought to life after being decayed bones and scattered dust." },
        { tf: true, q: "Reflecting on food reminds us of Allah's favour.", why: "This is a call to reflect upon Allah's favor." }
      ]
    },
    {
      slug: "praise-for-every-bite",
      title: "Praise for every bite",
      line: "Allah is pleased when we say Alhamdulillah as we eat and drink.",
      facts: ["Al-Hamdu lillah", "Thanks pleases Allah"],
      quote: q80(24),
      source: hadith("muslim", "2734", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said Allah is pleased with His servant who says Al-Hamdu lillah while taking a morsel of food and while drinking.", "Allah is pleased with His servant who says"),
      difficulty: 2,
      questions: [
        { q: "What pleases Allah, per the hadith?", a: "Saying Al-Hamdu lillah while eating", wrong: ["Eating very fast", "Eating alone", "Wasting food"], why: "Allah is pleased with His servant who says: Al-Hamdu lillah while taking a morsel of food." },
        { q: "When else should we praise Him, per the hadith?", a: "While drinking", wrong: ["Only on Eid", "Only at night", "Never"], why: "While taking a morsel of food and while drinking." },
        { tf: true, q: "Small thanks for food can win Allah's pleasure.", why: "Allah is pleased with His servant who says: Al-Hamdu lillah while taking a morsel of food and while drinking." }
      ]
    },
    {
      slug: "rain-and-split-earth",
      title: "Rain and the split earth",
      line: "Allah pours rain, splits the soil, and seeds rise up.",
      facts: ["Sabban: pouring in abundance", "Shaqqan: splitting"],
      quote: q80(25),
      source: ik(26, "Ibn Kathir says the rain settles into the earth, mixes with the seeds left in it, and they grow and rise up.", "mingles with the parts of the seeds that are left in the earth"),
      difficulty: 1,
      questions: [
        { q: "How does Allah send water, per 80:25?", a: "In abundance", wrong: ["Drop by drop only", "Never", "Only to the sea"], why: "We pour forth water in abundance." },
        { q: "What does Allah split, per 80:26?", a: "The earth", wrong: ["The moon", "The sea", "The sky"], why: "And We split the earth in clefts." },
        { tf: false, q: "Seeds grow without any water.", why: "It mingles with the parts of the seeds that are left in the earth. From this the seeds grow." }
      ]
    },
    {
      slug: "grain-grapes-and-greens",
      title: "Grain, grapes and greens",
      line: "Allah grows grain, grapes and green plants for us and animals.",
      facts: ["Habb: grain", "Qadb: green fodder"],
      quote: q80(27),
      source: ik(27, "Ibn Kathir says Al-Habb is all types of grain, and Al-Qadb are moist green plants that animals graze on.", "Al-Habb refers to all types of seeds"),
      difficulty: 2,
      questions: [
        { q: "What is Al-Habb, per Ibn Kathir?", a: "All types of grain", wrong: ["Rocks", "Flowers only", "Fish"], why: "Al-Habb refers to all types of seeds." },
        { q: "What is Al-Qadb, per Al-Hasan?", a: "Fodder", wrong: ["Gold", "Honey", "Wool"], why: "Al-Hasan Al-Basri said, Al-Qadb is fodder." },
        { tf: true, q: "Animals graze on Al-Qadb.", why: "Al-Qadb are the moist herbal plants that animals graze on." }
      ]
    },
    {
      slug: "olives-and-dates",
      title: "Olives and dates",
      line: "Olives give food and oil; dates are eaten fresh and dried.",
      facts: ["Zaytun: olives", "Nakhl: date palms"],
      quote: q80(29),
      source: ik(29, "Ibn Kathir says olives are food and oil, and dates are eaten in many stages, from unripe to ripe and dried.", "It is eaten for breakfast and used as an oil"),
      difficulty: 1,
      questions: [
        { q: "What two trees are named in 80:29?", a: "Olives and date palms", wrong: ["Apples and pears", "Oak and pine", "Figs and lemons"], why: "And olives and date palms." },
        { q: "How are olives used, per Ibn Kathir?", a: "Eaten and used as oil", wrong: ["Only as wood", "Only as perfume", "Not used"], why: "It is eaten for breakfast and used as an oil." },
        { tf: true, q: "Dates are eaten unripe, ripe and dried.", why: "All of which are varieties of dates that range from unripe, ripe and dried in their textures." }
      ]
    },
    {
      slug: "gardens-and-fruit",
      title: "Gardens and fruit",
      line: "Thick gardens and every kind of fruit are Allah's gifts.",
      facts: ["Ghulb: thick, dense", "Fakihah: fruit"],
      quote: q80(30),
      source: ik(30, "Al-Hasan and Qatadah said Ghulb are thick, handsome date gardens; Fakihah includes every type of fruit.", "Fakihah includes every type of fruit"),
      difficulty: 2,
      questions: [
        { q: "What are Ghulb Hada'iq, per Qatadah?", a: "Thick gardens of date palms", wrong: ["Empty deserts", "Stone walls", "Rivers"], why: "Ghulb are gardens of date palms that are thick and handsome." },
        { q: "What is Fakihah?", a: "Every type of fruit", wrong: ["Only grapes", "Bread", "Milk"], why: "Fakihah includes every type of fruit." },
        { tf: false, q: "Fakihah means only one kind of fruit.", why: "Fakihah includes every type of fruit." }
      ]
    },
    {
      slug: "what-is-abb",
      title: "What is Abb?",
      line: "Abb is grazing plants; the Sahabah never spoke beyond knowledge.",
      facts: ["Abb: herbage for animals", "Say only what you know"],
      quote: q80(31),
      source: ik(31, "Ibn Abbas said Al-Abb is what animals graze on; Abu Bakr feared saying about Allah's Book what he did not know.", "What sky would shade me and what earth would carry me"),
      difficulty: 3,
      questions: [
        { q: "What is Al-Abb, per Ibn Abbas?", a: "Plants eaten by grazing animals", wrong: ["Fruit for people", "Bread", "Fish"], why: "Al-Abb is what the earth grows that is eaten by grazing animals and not people." },
        { q: "Why did Abu Bakr not explain Abb?", a: "He would not speak without knowledge", wrong: ["He was busy", "He forgot", "He was travelling"], why: "If I said about the Book of Allah that which I did not have knowledge of." },
        { tf: true, q: "Umar called asking about its exact look unnecessary.", why: "This is something over burdensome, unnecessary to ask about." }
      ]
    },
    {
      slug: "provision-and-benefit",
      title: "Provision and benefit",
      line: "All these crops feed us and our animals until the Last Day.",
      facts: ["Mata': provision", "For you and your cattle"],
      quote: q80(32),
      source: ik(32, "Ibn Kathir says these are a means of living for people and their cattle in this life until the Day of Judgement.", "a means of livelihood for you all and your cattle"),
      difficulty: 1,
      questions: [
        { q: "For whom is the provision, per 80:32?", a: "You and your cattle", wrong: ["Only birds", "Only kings", "Only angels"], why: "A provision and benefit for you and your cattle." },
        { q: "Until when, per Ibn Kathir?", a: "The Day of Judgement", wrong: ["Next summer", "Ten years", "Forever in this world"], why: "In this life until the coming of the Day of Judgement." },
        { tf: false, q: "These crops are only for people, not animals.", why: "A means of livelihood for you all and your cattle." }
      ]
    }
  ]
};

/** Ayahs 33 to 42: the deafening blast, fleeing from family, and the bright and the dark faces. */
const ABASA_THREE: DeepUnit = {
  key: "abasa3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-80",
  name: "Abasa, ayahs 33-42",
  kind: "skill",
  lessonType: "surah",
  surahName: "Abasa",
  lessons: [
    {
      slug: "the-deafening-blast",
      title: "The deafening blast",
      line: "As-Sakhkhah is a name for the Day: a blast that stuns ears.",
      facts: ["As-Sakhkhah: the deafening blast", "A name of the Last Day"],
      quote: q80(33),
      source: ik(33, "Ibn Abbas said As-Sakhkhah is a name of the Day of Judgement; Al-Baghawi said it is a shout that almost deafens the ears.", "As-Sakhkhah is one of the names of the Day of Judgement"),
      difficulty: 2,
      questions: [
        { q: "What is As-Sakhkhah, per Ibn Abbas?", a: "A name of the Day of Judgement", wrong: ["A river", "A star", "A city"], why: "As-Sakhkhah is one of the names of the Day of Judgement." },
        { q: "Why is it called that, per Al-Baghawi?", a: "It almost deafens the ears", wrong: ["It is silent", "It is bright", "It is cold"], why: "It has been called this because it will deafen the ears." },
        { tf: true, q: "Ibn Jarir thought it may be the Trumpet blast.", why: "Ibn Jarir said, Perhaps it is a name for the blowing into Trumpet." }
      ]
    },
    {
      slug: "fleeing-from-family",
      title: "Fleeing from loved ones",
      line: "That Day people flee from brother, parents, spouse and children.",
      facts: ["Yafirru: flees", "Even prophets say: myself"],
      quote: q80(34),
      source: ik(34, "Ibn Kathir says people will flee from family because the horror is so great; even the great Messengers will say: myself, myself.", "because horror will be so great and the matter will be so weighty"),
      difficulty: 2,
      questions: [
        { q: "From whom does a man flee first, per 80:34?", a: "His brother", wrong: ["His enemy", "A stranger", "His neighbour"], why: "That Day shall a man flee from his brother." },
        { q: "Why do people flee, per Ibn Kathir?", a: "The horror is so great", wrong: ["They are angry", "They are bored", "They are lost"], why: "Because horror will be so great and the matter will be so weighty." },
        { tf: true, q: "Isa will not even ask for his mother Maryam.", why: "I will not even ask Maryam, the woman who gave birth to me." }
      ]
    },
    {
      slug: "busy-with-himself",
      title: "Busy with himself",
      line: "Each person will be too worried about himself to look at others.",
      facts: ["Sha'n: an affair", "Prepare now"],
      quote: q80(37),
      source: ik(37, "Ibn Kathir says each person will be busy with his own affair and distracted from everyone else's.", "he will be preoccupied in his business and distracted from the affairs of others"),
      difficulty: 2,
      questions: [
        { q: "What will each person have, per 80:37?", a: "Enough to make him careless of others", wrong: ["Time to help everyone", "Nothing to worry about", "A long rest"], why: "Every man that Day will have enough to make him careless of others." },
        { q: "What will he be busy with, per Ibn Kathir?", a: "His own affair", wrong: ["His friends' affairs", "Trade", "Games"], why: "He will be preoccupied in his business and distracted from the affairs of others." },
        { tf: false, q: "On that Day people will have time to look at others.", why: "Every man among them on that Day will have enough worries to make him careless of others." }
      ]
    },
    {
      slug: "bright-faces",
      title: "Bright, smiling faces",
      line: "The people of Jannah will have bright faces, smiling with joy.",
      facts: ["Musfirah: bright", "Mustabshirah: rejoicing"],
      quote: q80(38),
      source: ik(38, "Ibn Kathir says these faces are bright and happy from the joy in their hearts; they are the people of Paradise.", "The good news will be apparent on their faces"),
      difficulty: 1,
      questions: [
        { q: "How are some faces that Day, per 80:38?", a: "Bright", wrong: ["Sad", "Hidden", "Asleep"], why: "Some faces that Day will be bright." },
        { q: "Who are they, per Ibn Kathir?", a: "The people of Paradise", wrong: ["The angels only", "The kings", "The deniers"], why: "These will be the people of Paradise." },
        { tf: true, q: "Their joy comes from what is in their hearts.", why: "Happy and pleased due to the joy that will be in their hearts." }
      ]
    },
    {
      slug: "dust-stained-faces",
      title: "Dust-stained faces",
      line: "Deniers' faces will be dusty and dark, a sign of their deeds.",
      facts: ["Ghabarah: dust", "Qatarah: darkness"],
      quote: q80(40),
      source: ik(42, "Ibn Kathir says these faces are covered in darkness; they disbelieved in their hearts and did evil in their actions.", "they are disbelievers in their hearts, evildoers in their actions"),
      difficulty: 2,
      questions: [
        { q: "How are other faces, per 80:40?", a: "Dust-stained", wrong: ["Shining", "Laughing", "Golden"], why: "And other faces that Day will be dust-stained." },
        { q: "What is Qatarah, per Ibn Abbas?", a: "Darkness", wrong: ["Light", "Water", "Smoke"], why: "This means that they, the faces, will be overcome with darkness." },
        { tf: false, q: "Their faces are dark only because of the weather.", why: "They are disbelievers in their hearts, evildoers in their actions." }
      ]
    }
  ]
};

export const ABASA_UNITS: readonly DeepUnit[] = [ABASA_ONE, ABASA_TWO, ABASA_THREE];
