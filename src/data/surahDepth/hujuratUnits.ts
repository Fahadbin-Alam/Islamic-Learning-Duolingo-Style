import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Al-Hujurat ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Hujurat 49:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_49_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Hujurat 49:${ayah}`,
    url: `https://quran.com/49:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 49:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q49 = (ayah: number) => quranQuote(49, ayah);

/** Ayahs 1 to 10: good manners with the Messenger ﷺ, checking news before acting, and making peace between brothers. */
const HUJURAT_ONE: DeepUnit = {
  key: "hujurat1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-49",
  name: "Al-Hujurat, ayahs 1 to 10",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Hujurat",
  lessons: [
    {
      slug: "do-not-rush-ahead",
      title: "Do not rush ahead",
      line: "Do not put your own opinion before Allah and His Messenger.",
      facts: ["Al-Hujurat means The Dwellings", "Allah hears words and knows intentions"],
      quote: q49(1),
      source: ik(1, "Ibn Kathir says 49:1 teaches good manners with the Messenger ﷺ: do not rush to decide before him, but follow his lead in all matters.", "do not rush in making decisions before him, rather, follow his lead in all matters"),
      difficulty: 1,
      questions: [
        { q: "What does 49:1 forbid?", a: "Deciding before Allah and His Messenger", wrong: ["Praying at night", "Giving charity", "Asking questions"], why: "O you who believe! Make not a decision in advance before Allah and His Messenger." },
        { q: "What did Ibn Abbas say 49:1 means?", a: "Say nothing against Quran and Sunnah", wrong: ["Speak first always", "Never ask anything", "Only listen to elders"], why: "Do not say anything that contradicts the Qur'an and Sunnah." },
        { q: "What does Allah know, per Ibn Kathir on 49:1?", a: "Your intentions", wrong: ["Only your words", "Only the past", "Only big deeds"], why: "Knowing, your intentions." }
      ]
    },
    {
      slug: "what-taqwa-is",
      title: "What Taqwa is",
      line: "Taqwa is obeying Allah upon light, hoping for His reward.",
      facts: ["As-Sa'di explains", "Taqwa"],
      quote: q49(1),
      source: saadi(49, 1, "As-Sa'di quotes Talq ibn Habib: Taqwa is to obey Allah upon light from Allah, hoping for His reward, and to leave disobeying Allah upon light from Allah, fearing His punishment.", "أن تعمل بطاعة الله، على نور من الله، ترجو ثواب الله، وأن تترك معصية الله، على نور من الله، تخشى عقاب الله"),
      difficulty: 2,
      questions: [
        { q: "How did Talq ibn Habib describe Taqwa, quoted by as-Sa'di?", a: "Obeying Allah upon light, hoping for reward", wrong: ["Staying away from people", "Only fasting", "Never speaking"], why: "Obey Allah upon light from Allah, hoping for His reward." },
        { q: "Why do we leave sins, in that description of Taqwa?", a: "Fearing Allah's punishment", wrong: ["To look good", "Because they are boring", "For money"], why: "Leave disobedience upon light, fearing His punishment." },
        { tf: true, q: "Once the Sunnah is clear, it comes before anyone's opinion.", why: "As-Sa'di on 49:1." }
      ]
    },
    {
      slug: "lower-your-voice",
      title: "Lower your voice",
      line: "Do not raise your voice above the Prophet's ﷺ voice.",
      facts: ["Speak with respect and calm", "Like 24:63"],
      quote: q49(2),
      source: ik(2, "Ibn Kathir says the believers were told to speak to him with respect, honor and calmness, not loudly as they speak to each other.", "they were required to speak to him in terms of respect, honor and calmness"),
      difficulty: 1,
      questions: [
        { q: "What does 49:2 tell believers not to raise?", a: "Their voices above his voice", wrong: ["Their hands", "Their flags", "Their tents"], why: "O you who believe! Raise not your voices above the voice of the Prophet ﷺ." },
        { q: "How should they speak to him, per Ibn Kathir?", a: "With respect, honor and calmness", wrong: ["Loudly", "Quickly", "In secret only"], why: "They were required to speak to him in terms of respect, honor and calmness." },
        { tf: true, q: "49:2 warns that deeds could be lost without a person knowing.", why: "Lest your deeds should be thwarted while you perceive not." }
      ]
    },
    {
      slug: "thabit-ibn-qays",
      title: "Thabit's good news",
      line: "Thabit feared for his deeds, but was told he is of Paradise.",
      facts: ["Thabit had a loud voice", "The Prophet ﷺ asked about him"],
      quote: q49(2),
      source: hadith("bukhari", "4846", "Anas ibn Malik", "Sahih", "Thabit ibn Qays sat sad at home, fearing his loud voice had ruined his deeds. The Prophet ﷺ sent word: you are of the people of Paradise.", "You are not from the people of the Hell Fire, but from the people of Paradise"),
      difficulty: 2,
      questions: [
        { q: "Why was Thabit sad, per Bukhari 4846?", a: "He used to raise his voice", wrong: ["He lost money", "He was sick", "He missed a trip"], why: "He used to raise his voice above the voice of the Prophet ﷺ and so all his good deeds had been annulled." },
        { q: "What news was Thabit given, per Bukhari 4846?", a: "He is of the people of Paradise", wrong: ["He must leave", "He must pay", "Nothing"], why: "You are not from the people of the Hell Fire, but from the people of Paradise." },
        { tf: true, q: "The Prophet ﷺ noticed when Thabit was missing.", why: "The Prophet ﷺ missed Thabit bin Qais for a period." }
      ]
    },
    {
      slug: "umar-spoke-softly",
      title: "Umar spoke softly",
      line: "After 49:2, Umar spoke so softly he had to repeat himself.",
      facts: ["The Companions obeyed at once", "Respect shows in the voice"],
      quote: q49(2),
      source: ik(2, "Ibn Kathir says after 49:2 came down, Umar spoke so softly that the Messenger of Allah had to ask him to repeat himself.", "had to ask him to repeat what he said so that he could understand"),
      difficulty: 2,
      questions: [
        { q: "How did Umar speak after 49:2, per Ibn Kathir?", a: "So softly he had to repeat", wrong: ["Very loudly", "Not at all", "Only in writing"], why: "Umar's voice was so low that the Messenger of Allah had to ask him to repeat what he said." },
        { q: "Who reported how Umar spoke?", a: "Abdullah ibn Az-Zubayr", wrong: ["Abu Hurairah", "Anas", "Aishah"], why: "Abdullah bin Az-Zubayr said, After that, Umar's voice was so low." },
        { tf: true, q: "The Companions changed their habits quickly to obey Allah.", why: "Umar's voice was so low that the Messenger of Allah had to ask him to repeat what he said." }
      ]
    },
    {
      slug: "one-small-word",
      title: "One small word",
      line: "A single word can please Allah greatly, or anger Him.",
      facts: ["Watch your words", "Small words, big results"],
      quote: q49(2),
      source: hadith("bukhari", "6478", "Abu Hurairah", "Sahih", "The Prophet ﷺ said a servant may say a word pleasing to Allah without thinking much of it, and Allah raises him by degrees for it.", "may utter a word which pleases Allah without giving it much importance"),
      difficulty: 2,
      questions: [
        { q: "What can one word that pleases Allah do, per Bukhari 6478?", a: "Raise a person by degrees", wrong: ["Nothing at all", "Make him rich", "Make him famous"], why: "Because of that Allah will raise him to degrees of reward." },
        { q: "Why does Ibn Kathir link Bukhari 6478 to 49:2?", a: "Deeds can be lost unknowingly", wrong: ["To praise poets", "To teach grammar", "To count words"], why: "The good deeds of he who caused the Prophet's ﷺ anger will become useless without him even knowing." },
        { tf: true, q: "A careless word can displease Allah, per Bukhari 6478.", why: "A slave may utter a word carelessly which displeases Allah without thinking of its gravity." }
      ]
    },
    {
      slug: "hearts-tested-for-taqwa",
      title: "Hearts tested for Taqwa",
      line: "Those who lower their voices have hearts tested for Taqwa.",
      facts: ["Forgiveness and great reward", "Taqwa lives in the heart"],
      quote: q49(3),
      source: ik(3, "Ibn Kathir says Allah purified their hearts and made them a home for Taqwa.", "whose hearts have been purified by Allah and made as a residence and dwelling for the Taqwa"),
      difficulty: 2,
      questions: [
        { q: "Whose hearts were tested for Taqwa, in 49:3?", a: "Those who lower their voices", wrong: ["Those who shout", "Those who sleep", "Those who travel"], why: "Verily, those who lower their voices in the presence of Allah's Messenger, they are the ones whose hearts Allah has tested for Taqwa." },
        { q: "What do they get, in 49:3?", a: "Forgiveness and a great reward", wrong: ["Gold", "A long trip", "Nothing"], why: "For them is forgiveness and a great reward." },
        { tf: true, q: "Ibn Kathir says their hearts became a home for Taqwa.", why: "Whose hearts have been purified by Allah and made as a residence and dwelling for the Taqwa." }
      ]
    },
    {
      slug: "desire-but-holding-back",
      title: "Holding back from sin",
      line: "One who wants to sin but holds back is tested and better.",
      facts: ["Umar answered a letter", "Self-control is Taqwa"],
      quote: q49(3),
      source: ik(3, "Ibn Kathir reports Umar said the one who feels the desire to sin but does not do it is better, and quoted 49:3.", "He who feels desire to commit a sin, but does not commit it"),
      difficulty: 3,
      questions: [
        { q: "Who did Umar say is better?", a: "One who wants to sin but does not", wrong: ["One who never thinks of it", "One who sins and hides", "Nobody"], why: "He who feels desire to commit a sin, but does not commit it." },
        { q: "Which ayah did Umar quote in his answer?", a: "49:3", wrong: ["2:255", "1:1", "112:1"], why: "They are the ones whose hearts Allah has tested for Taqwa." },
        { tf: true, q: "Holding back from a sin you want is a sign of Taqwa.", why: "They are the ones whose hearts Allah has tested for Taqwa." }
      ]
    },
    {
      slug: "calling-from-outside",
      title: "Calling from outside",
      line: "Some shouted for him from outside his wives' homes.",
      facts: ["Hujurat: the private rooms", "Most of them had no sense"],
      quote: q49(4),
      source: ik(4, "Ibn Kathir says Allah admonished those who called to the Prophet ﷺ from behind the dwellings of his wives.", "from behind the dwellings which belong to his wives"),
      difficulty: 1,
      questions: [
        { q: "From where did they call him, in 49:4?", a: "From behind the dwellings", wrong: ["From the mosque", "From a hill", "From a boat"], why: "Verily, those who call you from behind the dwellings, most of them have no sense." },
        { q: "Whose dwellings were they, per Ibn Kathir?", a: "His wives' homes", wrong: ["The guests' tents", "The market", "The well"], why: "From behind the dwellings which belong to his wives." },
        { tf: true, q: "Al-Hujurat is named after these dwellings.", why: "Those who call you from behind the dwellings." }
      ]
    },
    {
      slug: "patience-is-better",
      title: "Waiting is better",
      line: "Had they waited for him to come out, it would be better.",
      facts: ["Respect people's privacy", "Allah is Forgiving"],
      quote: q49(5),
      source: ik(5, "Ibn Kathir says waiting patiently would have earned them good in this life and the next, and Allah invites them to repent.", "it would have earned them the better benefit of this life and the Hereafter"),
      difficulty: 1,
      questions: [
        { q: "What would have been better for them, in 49:5?", a: "To wait until he came out", wrong: ["To shout louder", "To leave", "To climb in"], why: "And if they had patience till you could come out to them, it would have been better for them." },
        { q: "Which two names end 49:5?", a: "Forgiving, Most Merciful", wrong: ["Strong, Mighty", "First, Last", "King, Holy"], why: "And Allah is Forgiving, Most Merciful." },
        { tf: true, q: "Ibn Kathir says Allah then invites them to repent.", why: "Allah, Worthy of all praise, then encourages them to turn to Him in repentance." }
      ]
    },
    {
      slug: "manners-show-the-mind",
      title: "Manners show the mind",
      line: "Good manners are the sign of a person's good sense.",
      facts: ["As-Sa'di explains", "Adab"],
      quote: q49(5),
      source: saadi(49, 5, "As-Sa'di says Allah blamed those who shouted from outside for lacking sense, because good manners are a sign of intelligence and a sign that Allah wants good for a person.", "فأدب العبد، عنوان عقله، وأن الله مريد به الخير"),
      difficulty: 2,
      questions: [
        { q: "What do a person's good manners show, per as-Sa'di?", a: "His good sense", wrong: ["His wealth", "His height", "His age"], why: "A servant's manners are the sign of his mind, says as-Sa'di." },
        { q: "Why were those who shouted from outside blamed in Al-Hujurat?", a: "They lacked sense and manners", wrong: ["They came late", "They were too quiet", "They brought gifts"], why: "Allah blamed them for not using sense and manners." },
        { tf: true, q: "Good manners can be a sign that Allah wants good for a person.", why: "As-Sa'di on 49:5." }
      ]
    },
    {
      slug: "check-the-news",
      title: "Check the news",
      line: "If an untrustworthy person brings news, check it first.",
      facts: ["Fasiq: one who disobeys openly", "Check before you act"],
      quote: q49(6),
      source: ik(6, "Ibn Kathir says Allah ordered checking news brought by sinners, so no decision is built on something false.", "Allah the Exalted ordered investigating the news that sinners and the wicked bring"),
      difficulty: 2,
      questions: [
        { q: "What should we do with news from a Fasiq, in 49:6?", a: "Verify it", wrong: ["Spread it fast", "Ignore all news", "Believe it at once"], why: "If a Fasiq comes to you with any news, verify it." },
        { q: "Why check the news, in 49:6?", a: "So you do not harm people unknowingly", wrong: ["To win an argument", "To get rich", "To be famous"], why: "Lest you should harm people in ignorance." },
        { tf: true, q: "Hadith scholars refuse narrators whose reliability is unknown.", why: "Groups of the scholars of Hadith refuse to accept narrations from narrators whose reliability is unknown." }
      ]
    },
    {
      slug: "avoid-regret",
      title: "Avoid regret",
      line: "Acting on false news can leave you sorry for what you did.",
      facts: ["Think before sharing", "Words travel fast"],
      quote: q49(6),
      source: ik(6, "Ibn Kathir says a decision built on a sinner's word, true or not, follows the sinner's lead, so news must be checked.", "to make sure of its authenticity"),
      difficulty: 2,
      questions: [
        { q: "How might you feel after acting on false news, in 49:6?", a: "Regretful", wrong: ["Proud", "Rich", "Rested"], why: "And afterwards you become regretful for what you have done." },
        { q: "Why check news, per Ibn Kathir?", a: "To make sure it is true", wrong: ["To make it longer", "To change it", "To hide it"], why: "Allah the Exalted ordered investigating the news that sinners and the wicked bring, to make sure of its authenticity." },
        { tf: false, q: "Sharing news without checking is always fine.", why: "If a Fasiq comes to you with any news, verify it." }
      ]
    },
    {
      slug: "the-messenger-among-you",
      title: "The Messenger ﷺ among you",
      line: "He ﷺ knew better what was good for them than they did.",
      facts: ["Like 33:6", "Our wishes are not always right"],
      quote: q49(7),
      source: ik(7, "Ibn Kathir says if he followed all their opinions and desires, they would end up in trouble and hardship.", "if he obeys all of your opinions and desires, you will earn trouble and hardship"),
      difficulty: 2,
      questions: [
        { q: "What would happen if he followed all their wishes, in 49:7?", a: "They would be in trouble", wrong: ["They would be rich", "Nothing", "They would win"], why: "If he were to obey you in much of the matter, you would surely be in trouble." },
        { q: "Which ayah says the Prophet ﷺ is closer to believers than themselves?", a: "33:6", wrong: ["1:1", "2:255", "112:1"], why: "The Prophet ﷺ is closer to the believers than themselves (33:6)." },
        { tf: true, q: "Ibn Kathir says he cared for them more than they cared for themselves.", why: "He is more knowledgeable about what benefits you and is more concerned with you than you yourselves are." }
      ]
    },
    {
      slug: "faith-made-beloved",
      title: "Faith made beloved",
      line: "Allah made faith dear to believers and sin hateful to them.",
      facts: ["Fusuq and Isyan: sins", "The rightly guided"],
      quote: q49(7),
      source: ik(7, "Ibn Kathir says Allah made faith dear to their souls and beautiful in their hearts, and made all sins hateful.", "made faith dear to your souls and beautified it in your hearts"),
      difficulty: 1,
      questions: [
        { q: "What did Allah make beloved, in 49:7?", a: "Faith", wrong: ["Wealth", "Fame", "Games"], why: "But Allah has endeared the Faith to you and has beautified it in your hearts." },
        { q: "What did Allah make hateful, in 49:7?", a: "Disbelief and sins", wrong: ["Prayer", "Charity", "Kindness"], why: "And has made disbelief, Fusuq and Isyan hateful to you." },
        { q: "What does 49:7 call such people?", a: "The rightly guided", wrong: ["The lost", "The proud", "The lazy"], why: "Such are they who are the rightly guided." }
      ]
    },
    {
      slug: "a-grace-from-allah",
      title: "A grace from Allah",
      line: "Guidance is a gift and a favor from Allah.",
      facts: ["Allah is All-Knowing", "Allah is All-Wise"],
      quote: q49(8),
      source: ik(8, "Ibn Kathir says faith is a favor and bounty from Allah, who knows best who deserves guidance.", "All-Knower in those who deserve guidance and those who deserve misguidance"),
      difficulty: 1,
      questions: [
        { q: "What does 49:8 call guidance?", a: "A grace and favor from Allah", wrong: ["Our own work", "Luck", "A reward for wealth"], why: "This is a grace from Allah and His favor." },
        { q: "Which two names end 49:8?", a: "All-Knowing, All-Wise", wrong: ["Hearing, Seeing", "Strong, Mighty", "First, Last"], why: "And Allah is All-Knowing, All-Wise." },
        { tf: true, q: "Ibn Kathir says Allah knows who deserves guidance.", why: "All-Knower in those who deserve guidance and those who deserve misguidance." }
      ]
    },
    {
      slug: "make-peace-between-them",
      title: "Make peace between them",
      line: "If two groups of believers quarrel, make peace between them.",
      facts: ["Both are still called believers", "Be fair when judging"],
      quote: q49(9),
      source: ik(9, "Ibn Kathir says Allah commands making peace between Muslims who fight, and still calls both groups believers.", "Allah commands making peace between Muslims that fight each other"),
      difficulty: 2,
      questions: [
        { q: "What should we do if two groups of believers fight, in 49:9?", a: "Make peace between them", wrong: ["Join one side", "Walk away", "Laugh"], why: "And if two parties among the believers fall to fighting, then make peace between them both." },
        { q: "Whom does Allah love, in 49:9?", a: "Those who are fair", wrong: ["Those who win", "Those who shout", "Those who are rich"], why: "Verily, Allah loves those who are the equitable." },
        { tf: true, q: "Ibn Kathir says Allah still calls both quarreling groups believers.", why: "Allah calls both opposing groups among Muslims, believers, although they are fighting each other." }
      ]
    },
    {
      slug: "help-your-brother",
      title: "Help your brother",
      line: "Help a wrongdoer by stopping him from doing wrong.",
      facts: ["Help the one wronged", "Stop the one doing wrong"],
      quote: q49(9),
      source: hadith("bukhari", "2444", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said help your brother, wronged or wrongdoer. Asked how to help a wrongdoer, he said: by stopping him from wronging others.", "By preventing him from oppressing others"),
      difficulty: 2,
      questions: [
        { q: "How do you help a brother who wrongs others, per Bukhari 2444?", a: "Stop him from wronging", wrong: ["Help him do it", "Ignore him", "Give him money"], why: "By preventing him from oppressing others." },
        { q: "Whom should you help, per Bukhari 2444?", a: "Your brother, wronged or wrongdoer", wrong: ["Only friends", "Only family", "Only the rich"], why: "Help your brother, whether he is an oppressor or he is an oppressed one." },
        { tf: true, q: "Stopping someone from doing wrong is a way of helping him.", why: "By preventing him from oppressing others." }
      ]
    },
    {
      slug: "pulpits-of-light",
      title: "Pulpits of light",
      line: "The just will sit on pulpits of light near the Most Merciful.",
      facts: ["Fair at home and at work", "Allah loves the just"],
      quote: q49(9),
      source: hadith("muslim", "1827", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ said the just will sit on pulpits of light beside Allah: those just in their rule, their families, and all they take on.", "the Dispensers of justice will be seated on the pulpits of light"),
      difficulty: 2,
      questions: [
        { q: "Where will the just sit, per Muslim 1827?", a: "On pulpits of light", wrong: ["On thrones of gold", "On the ground", "In tents"], why: "The Dispensers of justice will be seated on the pulpits of light." },
        { q: "Where must they be just, per Muslim 1827?", a: "In rule, family and all they do", wrong: ["Only in court", "Only in trade", "Only in war"], why: "Those who do justice in their rules, in matters relating to their families and in all that they undertake to do." },
        { tf: true, q: "Being fair with your own family counts as justice.", why: "In matters relating to their families." }
      ]
    },
    {
      slug: "believers-are-brothers",
      title: "Believers are brothers",
      line: "The believers are one brotherhood, so make peace between them.",
      facts: ["Brothers in Islam", "Taqwa brings mercy"],
      quote: q49(10),
      source: ik(10, "Ibn Kathir says all believers are brothers in Islam, and Allah promises mercy to those who fear and obey Him.", "all of them are brothers in Islam"),
      difficulty: 1,
      questions: [
        { q: "What are the believers, in 49:10?", a: "A brotherhood", wrong: ["Strangers", "Rivals", "Guests"], why: "The believers are but a brotherhood." },
        { q: "What do those with Taqwa receive, in 49:10?", a: "Mercy", wrong: ["Wealth", "Fame", "Land"], why: "And have Taqwa of Allah that you may receive mercy." },
        { tf: true, q: "Ibn Kathir calls the end of 49:10 a promise of mercy.", why: "This is a promise from Allah that He will grant mercy to those who fear and obey Him." }
      ]
    },
    {
      slug: "a-muslim-is-a-brother",
      title: "A brother's duties",
      line: "A Muslim never wrongs his brother and helps him in need.",
      facts: ["Help a brother, Allah helps you", "Cover his faults"],
      quote: q49(10),
      source: hadith("bukhari", "2442", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ said a Muslim is a brother of a Muslim: he does not wrong him, and whoever meets his brother's needs, Allah meets his.", "A Muslim is a brother of another Muslim, so he should not oppress him"),
      difficulty: 2,
      questions: [
        { q: "What must a Muslim never do to his brother, per Bukhari 2442?", a: "Oppress him", wrong: ["Visit him", "Greet him", "Help him"], why: "A Muslim is a brother of another Muslim, so he should not oppress him." },
        { q: "What does Allah do for one who meets a brother's needs?", a: "Meets his needs", wrong: ["Nothing", "Takes his wealth", "Forgets him"], why: "Whoever fulfilled the needs of his brother, Allah will fulfill his needs." },
        { tf: true, q: "Whoever covers a Muslim's faults, Allah will cover his.", why: "Whoever screened a Muslim, Allah will screen him on the Day of Resurrection." }
      ]
    },
    {
      slug: "dua-for-an-absent-brother",
      title: "Praying for a brother",
      line: "Pray for him in secret, and angels say: the same for you.",
      facts: ["A secret dua", "The angel says Amin"],
      quote: q49(10),
      source: hadith("muslim", "2732", "Abu Dharr", "Sahih", "The Prophet ﷺ said no believer prays for his brother behind his back except that the angels say: The same be for you too.", "the Angels do not say: The same be for you too"),
      difficulty: 1,
      questions: [
        { q: "What do the angels say, per Muslim 2732?", a: "The same be for you too", wrong: ["Nothing", "Pray louder", "Go home"], why: "The Angels do not say: The same be for you too." },
        { q: "When is the dua made, per Muslim 2732?", a: "Behind his back, in his absence", wrong: ["Only in front of him", "Only at Hajj", "Only on Friday"], why: "He who supplicates for his brother behind his back." },
        { tf: true, q: "Praying for others brings good back to you.", why: "The same be for you too." }
      ]
    }
  ]
};

/** Ayahs 11 to 18: no mocking, suspicion, spying or backbiting; all people are equal, and honor comes from Taqwa. */
const HUJURAT_TWO: DeepUnit = {
  key: "hujurat2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-49",
  name: "Al-Hujurat, ayahs 11 to 18",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Hujurat",
  lessons: [
    {
      slug: "do-not-mock-others",
      title: "Do not mock others",
      line: "Do not laugh at others; they may be better than you.",
      facts: ["For men and for women", "Allah sees the heart"],
      quote: q49(11),
      source: ik(11, "Ibn Kathir says Allah forbids mocking people, which means humiliating them, since the one mocked may be dearer to Allah.", "Allah the Exalted forbids scoffing at people, which implies humiliating and belittling them"),
      difficulty: 1,
      questions: [
        { q: "Why not mock others, in 49:11?", a: "They may be better than you", wrong: ["They will tell on you", "It wastes time", "It is too loud"], why: "Let not a group scoff at another group, it may be that the latter are better than the former." },
        { q: "Who does 49:11 also tell not to mock others?", a: "Women as well as men", wrong: ["Only kings", "Only children", "Only traders"], why: "Nor let some women scoff at other women, it may be that the latter are better than the former." },
        { tf: true, q: "The one being mocked may be dearer to Allah.", why: "The injured party could be more honored and dearer to Allah the Exalted than those who ridicule and belittle them." }
      ]
    },
    {
      slug: "like-one-body",
      title: "Like one body",
      line: "A fellow believer is called your self: believers are one body.",
      facts: ["As-Sa'di explains", "One body"],
      quote: q49(11),
      source: saadi(49, 11, "As-Sa'di says Allah called a fellow believer your own self in 49:11 because believers should be like one body, and because whoever finds fault with others invites them to find fault with him.", "وسمي الأخ المؤمن نفسًا لأخيه، لأن المؤمنين ينبغي أن يكون هكذا حالهم كالجسد الواحد"),
      difficulty: 2,
      questions: [
        { q: "Why does Al-Hujurat 49:11 call a fellow believer yourselves?", a: "Believers are like one body", wrong: ["They share a house", "They look alike", "They have one name"], why: "Believers should be like one body, says as-Sa'di." },
        { q: "What happens to someone who mocks others, per as-Sa'di?", a: "He invites them to mock him", wrong: ["He gains respect", "Nothing happens", "He gets rewarded"], why: "Finding fault with others makes them find fault with you." },
        { tf: false, q: "Every nickname at all is banned in Al-Hujurat 49:11.", why: "Only nicknames that hurt are banned, says as-Sa'di." }
      ]
    },
    {
      slug: "pride-looks-down-on-people",
      title: "Pride looks down",
      line: "Pride is rejecting the truth and looking down on people.",
      facts: ["Allah is beautiful, loves beauty", "Nice clothes are not pride"],
      quote: q49(11),
      source: hadith("muslim", "91", "Abdullah ibn Mas'ud", "Sahih", "The Prophet ﷺ said Allah is beautiful and loves beauty, and pride is rejecting the truth and looking down on people.", "and contempt for the people"),
      difficulty: 2,
      questions: [
        { q: "What is pride, per Muslim 91?", a: "Rejecting truth, looking down on people", wrong: ["Wearing nice clothes", "Having good shoes", "Being happy"], why: "Pride is disdaining the truth and contempt for the people." },
        { q: "What does Allah love, per Muslim 91?", a: "Beauty", wrong: ["Mess", "Loudness", "Pride"], why: "Verily, Allah is Graceful and He loves Grace." },
        { tf: false, q: "Wanting nice clothes and shoes is pride, per Muslim 91.", why: "A person loves that his dress should be fine... Allah is Graceful and He loves Grace." }
      ]
    },
    {
      slug: "no-hurtful-nicknames",
      title: "No hurtful nicknames",
      line: "Do not call people names they dislike.",
      facts: ["Revealed about Banu Salamah", "Use names people like"],
      quote: q49(11),
      source: ik(11, "Ibn Kathir says this means do not call people by nicknames they dislike, and whoever does not repent is a wrongdoer.", "you should not address people by nick names that people dislike"),
      difficulty: 1,
      questions: [
        { q: "What does 49:11 forbid about names?", a: "Insulting with nicknames", wrong: ["Having long names", "Changing names", "Writing names"], why: "Nor insult one another by nicknames." },
        { q: "About which tribe did this come down, per Ibn Kathir?", a: "Banu Salamah", wrong: ["Quraysh", "Banu Tamim", "Thaqif"], why: "This Ayah was revealed about us, Banu Salamah." },
        { q: "What are those who do not repent called, in 49:11?", a: "Wrongdoers", wrong: ["Winners", "Leaders", "Guests"], why: "And whosoever does not repent, then such are indeed wrongdoers." }
      ]
    },
    {
      slug: "avoid-suspicion",
      title: "Avoid suspicion",
      line: "Avoid much suspicion; some suspicion is a sin.",
      facts: ["Think well of others", "Do not guess the worst"],
      quote: q49(12),
      source: ik(12, "Ibn Kathir says Allah forbids suspicion without foundation about family, relatives and people in general.", "Muslims are to avoid suspicion without foundation"),
      difficulty: 1,
      questions: [
        { q: "What does 49:12 say about suspicion?", a: "Some of it is sin", wrong: ["It is always good", "It is a duty", "It is a game"], why: "Avoid much suspicion; indeed some suspicion is sin." },
        { q: "What kind of suspicion must we avoid, per Ibn Kathir?", a: "Suspicion without foundation", wrong: ["All thinking", "Every question", "Asking for proof"], why: "Muslims are to avoid suspicion without foundation." },
        { tf: true, q: "Ibn Kathir says this includes suspicion about family and relatives.", why: "Which includes having doubts and suspicions about the conduct of one's family, relatives and other people in general." }
      ]
    },
    {
      slug: "find-a-good-excuse",
      title: "Find a good excuse",
      line: "Umar said: think well of a brother's words if you can.",
      facts: ["Give the benefit of the doubt", "Umar's advice"],
      quote: q49(12),
      source: ik(12, "Ibn Kathir reports Umar said never think badly of a believing brother's words as long as you can find a good excuse.", "as long as you can find a good excuse for it"),
      difficulty: 2,
      questions: [
        { q: "What did Umar advise about a brother's words?", a: "Find a good excuse for them", wrong: ["Always doubt them", "Repeat them", "Ignore them"], why: "Never think ill of the word that comes out of your believing brother's mouth, as long as you can find a good excuse for it." },
        { q: "Who gave this advice, per Ibn Kathir?", a: "Umar ibn al-Khattab", wrong: ["Abu Jahl", "Pharaoh", "Qarun"], why: "The Leader of the faithful Umar bin Al-Khattab said." },
        { tf: true, q: "Thinking well of others is part of avoiding suspicion.", why: "Never think ill of the word that comes out of your believing brother's mouth." }
      ]
    },
    {
      slug: "beware-of-suspicion",
      title: "Be brothers",
      line: "Do not spy, envy or hate one another; be brothers.",
      facts: ["Suspicion is the worst false talk", "Be brothers, servants of Allah"],
      quote: q49(12),
      source: hadith("bukhari", "6064", "Abu Hurairah", "Sahih", "The Prophet ﷺ said beware of suspicion, the worst false talk; do not spy, envy or hate each other; servants of Allah, be brothers.", "Beware of suspicion, for suspicion is the worst of false tales"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ call suspicion, per Bukhari 6064?", a: "The worst of false tales", wrong: ["A small mistake", "Smart thinking", "A good guess"], why: "Beware of suspicion, for suspicion is the worst of false tales." },
        { q: "What did he ﷺ tell the servants of Allah to be?", a: "Brothers", wrong: ["Rivals", "Strangers", "Judges"], why: "O Allah's worshipers! Be brothers." },
        { tf: true, q: "Looking for others' faults is forbidden, per Bukhari 6064.", why: "Do not look for the others' faults and do not spy." }
      ]
    },
    {
      slug: "do-not-spy",
      title: "Do not spy",
      line: "Do not spy on others or listen in without permission.",
      facts: ["Tajassus: searching for faults", "Respect privacy"],
      quote: q49(12),
      source: ik(12, "Ibn Kathir says spying usually hides ill intent, and Al-Awza'i said it includes listening to people without permission.", "Tajassus, usually harbors ill intentions"),
      difficulty: 2,
      questions: [
        { q: "What does 49:12 forbid besides suspicion?", a: "Spying", wrong: ["Sleeping", "Eating", "Reading"], why: "And spy not." },
        { q: "What did Al-Awza'i say Tahassus includes?", a: "Listening in without permission", wrong: ["Helping others", "Asking a teacher", "Reading Quran"], why: "Tahassus means, listening to people when they are talking without their permission, or eavesdropping at their doors." },
        { tf: true, q: "Ibn Kathir says spying usually comes with bad intentions.", why: "Tajassus, usually harbors ill intentions." }
      ]
    },
    {
      slug: "what-is-backbiting",
      title: "What is backbiting?",
      line: "Backbiting is saying what your brother would dislike.",
      facts: ["Even if it is true", "If false, it is a lie too"],
      quote: q49(12),
      source: hadith("muslim", "2589", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said backbiting is mentioning your brother in a way he dislikes; if it is true, it is backbiting, and if false, slander.", "Backbiting implies your talking about your brother in a manner which he does not like"),
      difficulty: 2,
      questions: [
        { q: "What is backbiting, per Muslim 2589?", a: "Saying what your brother dislikes", wrong: ["Praising him", "Greeting him", "Helping him"], why: "Backbiting implies your talking about your brother in a manner which he does not like." },
        { q: "What if what you said is true, per Muslim 2589?", a: "It is still backbiting", wrong: ["It is fine", "It is charity", "It is advice"], why: "If that failing is actually found in him what you assert, you in fact backbited him." },
        { tf: true, q: "Saying something false about him is even worse.", why: "If he was not as you say about him, you will have falsely accused him." }
      ]
    },
    {
      slug: "backbiting-is-hateful",
      title: "Backbiting is hateful",
      line: "Allah likens backbiting to something everyone finds disgusting.",
      facts: ["Hate it by nature, hate it by faith", "Honor is sacred"],
      quote: q49(12),
      source: ik(12, "Ibn Kathir says just as people hate that by nature, they should hate backbiting because of their religion.", "so hate backbiting, on account of your religion"),
      difficulty: 3,
      questions: [
        { q: "How should we feel about backbiting, per Ibn Kathir?", a: "Hate it because of our religion", wrong: ["Enjoy it", "Ignore it", "Joke about it"], why: "So hate backbiting, on account of your religion." },
        { q: "What did the Farewell Hajj speech call sacred?", a: "Blood, wealth and honor", wrong: ["Only gold", "Only land", "Only camels"], why: "Verily, your blood, wealth and honor are as sacred among you as the sanctity of this day of yours." },
        { tf: true, q: "Ibn Kathir says 49:12 strongly warns against backbiting.", why: "This Ayah seeks to discourage people from backbiting and warns against it." }
      ]
    },
    {
      slug: "fixing-backbiting",
      title: "Making up for backbiting",
      line: "Stop backbiting, and praise the person where you spoke ill.",
      facts: ["Allah accepts repentance", "Defend others' honor"],
      quote: q49(12),
      source: ik(12, "Ibn Kathir says some scholars advise praising the person in the same gatherings, and defending him from further backbiting.", "one should praise those whom he has backbitten"),
      difficulty: 3,
      questions: [
        { q: "What is repentance from backbiting, per most scholars?", a: "Stop it and intend not to repeat", wrong: ["Pay money", "Fast a month", "Move away"], why: "Repentance for committing the sin of backbiting is that one refrains from backbiting intending not to repeat it again." },
        { q: "What is better to do afterward, per Ibn Kathir?", a: "Praise the person where you spoke ill", wrong: ["Hide forever", "Tell everyone", "Do nothing"], why: "It is better, they said, that one should praise those whom he has backbitten in audiences in which he has committed the act." },
        { q: "Which names end 49:12?", a: "Accepts repentance, Most Merciful", wrong: ["Strong, Mighty", "First, Last", "Hearing, Seeing"], why: "Verily, Allah is the One Who forgives and accepts repentance, Most Merciful." }
      ]
    },
    {
      slug: "no-shunning",
      title: "No long silence",
      line: "A Muslim must not cut off his brother for over three nights.",
      facts: ["Make up quickly", "Be brothers"],
      quote: q49(12),
      source: hadith("bukhari", "6076", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said do not hate, envy or desert one another; be brothers, and a Muslim may not desert his brother for more than three nights.", "it is unlawful for a Muslim to desert his brother Muslim"),
      difficulty: 2,
      questions: [
        { q: "How long at most may a Muslim not speak to his brother?", a: "Three nights", wrong: ["Three months", "One year", "Forever"], why: "It is unlawful for a Muslim to desert his brother Muslim for more than three nights." },
        { q: "What should Allah's servants be, per Bukhari 6076?", a: "Brothers", wrong: ["Strangers", "Enemies", "Rivals"], why: "O Allah's worshipers! Be Brothers!" },
        { tf: false, q: "Holding a grudge for years is fine in Islam.", why: "It is unlawful for a Muslim to desert his brother Muslim for more than three nights." }
      ]
    },
    {
      slug: "one-father-one-mother",
      title: "One father, one mother",
      line: "All people come from Adam and Hawwa, equal in their humanity.",
      facts: ["Nations and tribes", "No one is better by birth"],
      quote: q49(13),
      source: ik(13, "Ibn Kathir says Allah created all people from Adam and Hawwa, and alerted mankind that they are all equal in their humanity.", "alerting mankind that they are all equal in their humanity"),
      difficulty: 1,
      questions: [
        { q: "From what did Allah create us, in 49:13?", a: "A male and a female", wrong: ["Light", "Fire", "Water only"], why: "O mankind! We have created you from a male and a female." },
        { q: "Who are the first parents, per Ibn Kathir?", a: "Adam and Hawwa", wrong: ["Nuh and his wife", "Ibrahim and Sarah", "Unknown"], why: "Therefore, all people are the descendants of Adam and Hawwa." },
        { tf: true, q: "Ibn Kathir says all people are equal in their humanity.", why: "Alerting mankind that they are all equal in their humanity." }
      ]
    },
    {
      slug: "to-know-one-another",
      title: "To know one another",
      line: "Allah made nations and tribes so we may know one another.",
      facts: ["Not to boast", "Mujahid: knowing family names"],
      quote: q49(13),
      source: ik(13, "Ibn Kathir says Allah made nations and tribes so people can know each other by their nation or tribe.", "so that they get to know each other by their nation or tribe"),
      difficulty: 1,
      questions: [
        { q: "Why did Allah make nations and tribes, in 49:13?", a: "So we may know one another", wrong: ["So we may fight", "So we may boast", "No reason"], why: "And made you into nations and tribes that you may know one another." },
        { q: "What did Mujahid say knowing one another means?", a: "So-and-so, son of so-and-so", wrong: ["Being rich", "Being strong", "Being loud"], why: "Refers to one's saying, So-and-so the son of so-and-so, from the tribe of so-and-so." },
        { tf: false, q: "Tribes were made so people could boast over others.", why: "So that they get to know each other by their nation or tribe." }
      ]
    },
    {
      slug: "honor-comes-from-taqwa",
      title: "Honor comes from Taqwa",
      line: "The most honored with Allah is the one with the most Taqwa.",
      facts: ["Not family lineage", "Allah is All-Aware"],
      quote: q49(13),
      source: ik(13, "Ibn Kathir says you earn honor with Allah through Taqwa, not through family lineage.", "you earn honor with Allah the Exalted on account of Taqwa, not family lineage"),
      difficulty: 1,
      questions: [
        { q: "Who is most honorable with Allah, in 49:13?", a: "The one with the most Taqwa", wrong: ["The richest", "The tallest", "The best known"], why: "Verily, the most honorable of you with Allah is that believer who has At-Taqwa." },
        { q: "What does not earn honor with Allah, per Ibn Kathir?", a: "Family lineage", wrong: ["Taqwa", "Good deeds", "Obedience"], why: "You earn honor with Allah the Exalted on account of Taqwa, not family lineage." },
        { q: "Which two names end 49:13?", a: "All-Knowing, All-Aware", wrong: ["Strong, Mighty", "First, Last", "King, Holy"], why: "Verily, Allah is All-Knowing, All-Aware." }
      ]
    },
    {
      slug: "the-most-honorable",
      title: "Who is most honorable?",
      line: "Asked who is most honored, he ﷺ said: the most God-fearing.",
      facts: ["Then he named Yusuf", "Four prophets in a row"],
      quote: q49(13),
      source: hadith("bukhari", "3374", "Abu Hurairah", "Sahih", "Asked who is the most honorable, the Prophet ﷺ said the most God-fearing, then Yusuf, a prophet, son of a prophet, son of a prophet, son of Allah's Khalil.", "The most honorable among them is the one who is the most Allah-fearing"),
      difficulty: 2,
      questions: [
        { q: "Who is most honorable, per Bukhari 3374?", a: "The most God-fearing", wrong: ["The richest", "The strongest", "The oldest"], why: "The most honorable among them is the one who is the most Allah-fearing." },
        { q: "Which prophet did he ﷺ name next, per Bukhari 3374?", a: "Yusuf", wrong: ["Musa", "Nuh", "Isa"], why: "Then the most honorable person is Joseph, Allah's Prophet, the son of Allah's Prophet." },
        { q: "Who is Allah's Khalil in Bukhari 3374?", a: "Ibrahim", wrong: ["Yaqub", "Ishaq", "Yusuf"], why: "The son of Allah's Prophet, the son of Allah's Khalil." }
      ]
    },
    {
      slug: "allah-looks-at-hearts",
      title: "Allah looks at hearts",
      line: "Allah does not look at looks or wealth, but at hearts.",
      facts: ["Piety is in the heart", "He pointed to his chest"],
      quote: q49(13),
      source: hadith("muslim", "2564b", "Abu Hurairah", "Sahih", "The Prophet ﷺ said Allah does not look at your bodies or faces, but at your hearts, and pointed to his chest: piety is here.", "Allah does not look to your bodies nor to your faces but He looks to your hearts"),
      difficulty: 1,
      questions: [
        { q: "What does Allah look at, per Muslim 2564?", a: "Our hearts", wrong: ["Our faces", "Our clothes", "Our houses"], why: "Verily Allah does not look to your bodies nor to your faces but He looks to your hearts." },
        { q: "Where did he ﷺ point when speaking of piety?", a: "His chest", wrong: ["The sky", "The ground", "The door"], why: "He pointed towards his chest thrice." },
        { tf: true, q: "A Muslim must not look down on his brother, per Muslim 2564.", why: "It is a serious evil for a Muslim that he should look down upon his brother Muslim." }
      ]
    },
    {
      slug: "submitted-not-yet-believed",
      title: "We have submitted",
      line: "Some said: we believe; Allah said: say we have submitted.",
      facts: ["Iman is a higher grade than Islam", "Faith grows in the heart"],
      quote: q49(14),
      source: ik(14, "Ibn Kathir says these bedouins were Muslims, not hypocrites, but faith had not yet settled firmly in their hearts.", "Faith is a higher grade than Islam"),
      difficulty: 3,
      questions: [
        { q: "What were they told to say, in 49:14?", a: "We have submitted", wrong: ["We are the best", "We are kings", "We are done"], why: "But say, We have submitted, for Faith has not yet entered your hearts." },
        { q: "Were these bedouins hypocrites, per Ibn Kathir?", a: "No, they were Muslims", wrong: ["Yes", "They were angels", "They were jinn"], why: "The bedouins whom the Ayah mentioned were not hypocrites, rather they were Muslims in whose hearts Faith was not yet firmly established." },
        { q: "Which hadith shows Islam, then Iman, then Ihsan?", a: "The hadith of Jibril", wrong: ["The hadith of the cave", "The hadith of the tree", "The hadith of the well"], why: "This is also demostrated in the Hadith of Jibril, when he questioned the Prophet ﷺ about Islam, then Iman then Ihsan." }
      ]
    },
    {
      slug: "or-merely-a-muslim",
      title: "Or merely a Muslim",
      line: "Sa'd called a man a believer; he ﷺ said: or a Muslim.",
      facts: ["Only Allah sees faith inside", "Sa'd asked three times"],
      quote: q49(14),
      source: hadith("bukhari", "27", "Sa'd ibn Abi Waqqas", "Sahih", "Sa'd said a man was a true believer; the Prophet ﷺ answered each time: or merely a Muslim, since inner faith is known to Allah.", "Or merely a Muslim"),
      difficulty: 3,
      questions: [
        { q: "What did he ﷺ answer Sa'd, per Bukhari 27?", a: "Or merely a Muslim", wrong: ["He is a prophet", "He is a king", "Say nothing"], why: "The Prophet ﷺ commented: Or merely a Muslim." },
        { q: "How many times did Sa'd repeat his question?", a: "More than once", wrong: ["Never", "Once only", "A hundred times"], why: "I could not help repeating my question because of what I knew about him." },
        { tf: true, q: "Ibn Kathir uses this to show Iman is a higher grade than Islam.", why: "Indicating that Iman is a more exclusive grade than Islam." }
      ]
    },
    {
      slug: "no-reward-is-lost",
      title: "No reward is lost",
      line: "Obey Allah and His Messenger, and none of your reward is lost.",
      facts: ["Like 52:21", "Allah is Forgiving"],
      quote: q49(14),
      source: ik(14, "Ibn Kathir says if they obey Allah and His Messenger, He will not decrease any of their rewards.", "He will not decrease any of your rewards"),
      difficulty: 1,
      questions: [
        { q: "What happens if they obey, in 49:14?", a: "Their reward is not reduced", wrong: ["They lose it all", "Nothing", "They get half"], why: "He will not decrease anything in reward for your deeds." },
        { q: "Which ayah also says reward will not be decreased?", a: "52:21", wrong: ["1:1", "2:255", "112:1"], why: "We shall not decrease the reward of their deeds in anything (52:21)." },
        { tf: true, q: "Allah is Forgiving to those who repent, per Ibn Kathir.", why: "Verily, Allah is Oft-Forgiving, Most Merciful, for those who repent and return to Him." }
      ]
    },
    {
      slug: "the-truthful-believers",
      title: "The truthful believers",
      line: "True believers do not doubt, and strive with wealth and selves.",
      facts: ["Faith without doubt", "Giving the best for Allah"],
      quote: q49(15),
      source: ik(15, "Ibn Kathir says true believers have no doubts and their faith is not shaken; they give their best for Allah's pleasure.", "They do not have doubts and their Faith was not shaken"),
      difficulty: 2,
      questions: [
        { q: "What do true believers not do, in 49:15?", a: "Doubt", wrong: ["Pray", "Give", "Strive"], why: "Who have believed in Allah and His Messenger, and afterward doubt not." },
        { q: "With what do they strive, in 49:15?", a: "Their wealth and their lives", wrong: ["Only words", "Only wishes", "Nothing"], why: "But strive with their wealth and their lives for the cause of Allah." },
        { q: "What does 49:15 call them?", a: "The truthful", wrong: ["The famous", "The rich", "The quiet"], why: "Those! They are the truthful." }
      ]
    },
    {
      slug: "allah-knows-your-faith",
      title: "Allah already knows",
      line: "No need to tell Allah your faith; He knows all things.",
      facts: ["Nothing escapes Him", "Not even a speck of dust"],
      quote: q49(16),
      source: ik(16, "Ibn Kathir says nothing in the heavens and earth, even the weight of a speck of dust, escapes Allah.", "Nothing in the heavens and earth, even the weight of a speck of dust"),
      difficulty: 2,
      questions: [
        { q: "What does 49:16 ask them?", a: "Will you inform Allah of your religion?", wrong: ["Where do you live?", "What do you eat?", "Who is your king?"], why: "Say: Will you inform Allah of your religion." },
        { q: "What escapes Allah, per Ibn Kathir?", a: "Nothing, not even a speck of dust", wrong: ["Small things", "Secrets", "The future"], why: "Nothing in the heavens and earth, even the weight of a speck of dust, all that is bigger or smaller, ever escapes His observation." },
        { tf: true, q: "49:16 says Allah is All-Aware of everything.", why: "And Allah is All-Aware of everything." }
      ]
    },
    {
      slug: "islam-is-allahs-favor",
      title: "Islam is Allah's favor",
      line: "Islam is no favor to Allah; guidance is His favor to you.",
      facts: ["The benefit is yours", "Allah guided you"],
      quote: q49(17),
      source: ik(17, "Ibn Kathir says the benefit of Islam is for the one who accepts it, and guidance is a favor from Allah.", "for the benefit of your Islam will only be yours, and this is a favor from Allah to you"),
      difficulty: 2,
      questions: [
        { q: "What did some count as a favor, in 49:17?", a: "Their embracing Islam", wrong: ["Their prayers", "Their trade", "Their poems"], why: "They regard as a favor to you that they have embraced Islam." },
        { q: "Whose favor is guidance, in 49:17?", a: "Allah's", wrong: ["Theirs", "The tribe's", "No one's"], why: "Nay, but Allah has conferred a favor upon you that He has guided you to the Faith." },
        { tf: true, q: "Ibn Kathir says the benefit of Islam is for the one who accepts it.", why: "For the benefit of your Islam will only be yours." }
      ]
    },
    {
      slug: "the-ansar-at-hunayn",
      title: "The Ansar's answer",
      line: "He ﷺ reminded the Ansar of Allah's favors, and they agreed.",
      facts: ["Guided, united, enriched", "Humble hearts"],
      quote: q49(17),
      source: hadith("bukhari", "4330", "Abdullah ibn Zaid", "Sahih", "After Hunayn, the Prophet ﷺ reminded the Ansar that Allah guided, united and enriched them through him; they answered that Allah and His Messenger had done them more favor.", "and then Allah guided you on the Right Path through me"),
      difficulty: 3,
      questions: [
        { q: "What three favors did he ﷺ mention, per Bukhari 4330?", a: "Guided, united, made rich", wrong: ["Fame, land, gold", "Swords, horses, tents", "Songs, games, feasts"], why: "Allah guided you, Allah brought you together through me, and Allah made you rich through me." },
        { q: "How did the Ansar reply, per Bukhari 4330?", a: "Allah and His Messenger did us more favor", wrong: ["We did it ourselves", "We want more", "Nothing"], why: "Allah and His Apostle have more favours to do." },
        { tf: true, q: "Ibn Kathir uses Bukhari 4330 to explain 49:17.", why: "The Prophet ﷺ said to the Ansar on the day of the battle of Hunayn." }
      ]
    },
    {
      slug: "allah-sees-what-you-do",
      title: "Allah sees what you do",
      line: "Allah knows the unseen of heavens and earth and sees all deeds.",
      facts: ["The last ayah of Al-Hujurat", "Nothing is hidden from Him"],
      quote: q49(18),
      source: ik(18, "Ibn Kathir says Allah ends the surah by reminding that He knows all creation completely and sees them all.", "Then Allah reminds that He has complete knowledge of all creations and that He sees them all"),
      difficulty: 1,
      questions: [
        { q: "What does Allah know, in 49:18?", a: "The unseen of the heavens and earth", wrong: ["Only what we say", "Only the past", "Only the sky"], why: "Verily, Allah knows the Unseen of the heavens and the earth." },
        { q: "What does Allah see, in 49:18?", a: "What we do", wrong: ["Only big deeds", "Only good deeds", "Nothing"], why: "And Allah is the All-Seer of what you do." },
        { tf: true, q: "49:18 is the last ayah of Al-Hujurat.", why: "This is the end of the Tafsir of Surat Al-Hujurat." }
      ]
    }
  ]
};

export const HUJURAT_UNITS: readonly DeepUnit[] = [HUJURAT_ONE, HUJURAT_TWO];
