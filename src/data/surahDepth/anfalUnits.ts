import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Al-Anfal ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a
// lesson, explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one
// explains the ayah. Each source opens at the highlighted words that say the lesson's point. Al-Anfal came down about
// Badr; the lessons teach its trust, patience and manners and leave the battle details out.

/** Tafsir Ibn Kathir on Al-Anfal 8:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_8_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Anfal 8:${ayah}`,
    url: `https://quran.com/8:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 8:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q8 = (ayah: number) => quranQuote(8, ayah);

/** Ayahs 1 to 19: the spoils belong to Allah, the true believers, Badr, the angels, the rain and the handful of sand. */
const ANFAL_ONE: DeepUnit = {
  key: "anfal1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-8",
  name: "Al-Anfal, ayahs 1 to 19",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Anfal",
  lessons: [
    {
      slug: "surah-of-badr",
      title: "A surah about Badr",
      line: "Al-Anfal came down about Badr, the first great battle.",
      facts: ["Anfal: spoils of war", "75 ayahs, Madani"],
      quote: q8(1),
      source: hadith("bukhari", "4645", "Sa'id ibn Jubayr", "Sahih", "Sa'id ibn Jubayr asked Ibn Abbas about Surat al-Anfal, and he said it was revealed in connection with the Battle of Badr.", "It was revealed in connection with the Battle of Badr"),
      difficulty: 2,
      questions: [
        { q: "Which battle did Al-Anfal come down about, per Ibn Abbas?", a: "Badr", wrong: ["Uhud", "Khandaq", "Hunayn"], why: "It was revealed in connection with the Battle of Badr." },
        { q: "What does al-anfal mean?", a: "The spoils of war", wrong: ["The prayers", "The angels", "The camels"], why: "Ibn Abbas: al-anfal are the spoils of war." },
        { q: "Sa'id ibn Jubayr asked Ibn Abbas about the surah.", tf: true, why: "I asked Ibn Abbas regarding Surat al-Anfal." }
      ]
    },
    {
      slug: "spoils-for-allah",
      title: "The spoils belong to Allah",
      line: "Asked about the spoils: they belong to Allah and His Messenger.",
      facts: ["Fear Allah", "Fix what is between you"],
      quote: q8(1),
      source: ik(1, "Ibn Abbas said al-anfal are the spoils of war. The ayah tells the believers the spoils are for Allah and His Messenger, so they should fear Allah, settle their differences and obey.", "Al-Anfal are the spoils of war"),
      difficulty: 2,
      questions: [
        { q: "To whom do the spoils belong, in 8:1?", a: "Allah and the Messenger ﷺ", wrong: ["The strongest", "The first to grab", "The richest"], why: "Qulil-anfalu lillahi war-rasul." },
        { q: "What should the believers fix, in 8:1?", a: "What is between them", wrong: ["Their swords", "Their tents", "Their prices"], why: "Wa aslihu dhata baynikum." },
        { q: "The ayah makes obedience a sign of faith.", tf: true, why: "Wa ati'ullaha wa rasulahu in kuntum mu'minin." }
      ]
    },
    {
      slug: "hearts-tremble",
      title: "Hearts that tremble",
      line: "True believers' hearts tremble when Allah is mentioned.",
      facts: ["Wajilat: they tremble", "Then they obey"],
      quote: q8(2),
      source: ik(2, "When Allah is mentioned, a true believer feels fear in his heart, so he does what Allah orders and stays away from what He forbids. As-Suddi said: a man about to sin stops when told to fear Allah.", "The quality of a true believer is that when Allah is mentioned, he feels a fear in his heart"),
      difficulty: 2,
      questions: [
        { q: "What happens to believers' hearts when Allah is mentioned, in 8:2?", a: "They feel fear", wrong: ["They feel nothing", "They get bored", "They feel proud"], why: "Wajilat qulubuhum." },
        { q: "What does that fear lead to, per Ibn Kathir?", a: "Doing His orders, leaving His bans", wrong: ["Running away", "Giving up", "Staying silent"], why: "He implements His orders and abstains from His prohibitions." },
        { q: "Per As-Suddi, being told to fear Allah can stop a sin.", tf: true, why: "He abstains when he is told: have Taqwa of Allah." }
      ]
    },
    {
      slug: "faith-grows",
      title: "Faith grows with the Quran",
      line: "When Allah's ayahs are recited, the believers' faith increases.",
      facts: ["Iman goes up", "Tawakkul: trust in Allah"],
      quote: q8(2),
      source: ik(2, "When His ayahs are recited, the believers grow in faith and conviction, and they trust their Lord, hoping in none but Him. Faith rises and falls.", "they increase their faith) and conviction"),
      difficulty: 3,
      questions: [
        { q: "What increases when the ayahs are recited, in 8:2?", a: "Their faith", wrong: ["Their wealth", "Their fear of people", "Their sleep"], why: "Zadat-hum imana." },
        { q: "On whom do the believers rely, in 8:2?", a: "Their Lord", wrong: ["Their tribe", "Their wealth", "Their weapons"], why: "Wa ala rabbihim yatawakkalun." },
        { q: "Faith can increase, as 8:2 shows.", tf: true, why: "They increase their faith and conviction." }
      ]
    },
    {
      slug: "believers-in-truth",
      title: "Believers in truth",
      line: "They pray, they spend, and they are the believers in truth.",
      facts: ["Salah and spending", "Ranks, forgiveness, provision"],
      quote: q8(4),
      source: ik(3, "After their faith, Allah describes their deeds: establishing prayer, which is Allah's right, and spending, which includes zakah and other dues. For them are ranks with their Lord, forgiveness and generous provision.", "Spending from what Allah has granted includes giving the Zakah"),
      difficulty: 3,
      questions: [
        { q: "Which two deeds does 8:3 name?", a: "Prayer and spending", wrong: ["Travel and trade", "Fasting and Hajj", "Sleep and food"], why: "Yuqimunas-salata wa mimma razaqnahum yunfiqun." },
        { q: "What does spending include, per Ibn Kathir?", a: "Zakah and other dues", wrong: ["Only gifts to friends", "Only taxes", "Nothing required"], why: "Spending from what Allah has granted includes giving the Zakah." },
        { q: "What are they called, in 8:4?", a: "The believers in truth", wrong: ["The rich", "The leaders", "The poets"], why: "Ula'ika humul-mu'minuna haqqa." }
      ]
    },
    {
      slug: "disliked-but-good",
      title: "Disliked, but it was good",
      line: "Some disliked going to Badr, yet it brought guidance and help.",
      facts: ["They wanted the caravan", "Allah chose the meeting"],
      quote: q8(5),
      source: ik(5, "Some believers disliked meeting the armed enemy, so Allah decided the meeting would happen without their planning. That event carried guidance, light, victory and triumph, like 2:216: you may dislike what is good for you.", "This incident carried guidance, light, victory and triumph"),
      difficulty: 3,
      questions: [
        { q: "What did a group of believers dislike, in 8:5?", a: "Going out to meet the enemy", wrong: ["Praying", "Giving charity", "Staying home"], why: "Wa inna faraqan minal-mu'minina lakarihun." },
        { q: "What did the event carry, per Ibn Kathir?", a: "Guidance, light, victory, triumph", wrong: ["Only loss", "Only wealth", "Only fear"], why: "This incident carried guidance, light, victory and triumph." },
        { q: "Ibn Kathir links this to 2:216: you may dislike what is good for you.", tf: true, why: "It may be that you dislike a thing which is good for you." }
      ]
    },
    {
      slug: "one-of-two-parties",
      title: "One of the two groups",
      line: "They hoped for the caravan; Allah willed the truth to win.",
      facts: ["Abu Sufyan's caravan", "The armed army"],
      quote: q8(7),
      source: ik(7, "Allah promised them one of two groups: the caravan or the army. They wished for the unarmed one, but Allah willed them to meet the army so He could make His religion clear and Islam prevail.", "He willed for you to meet the armed enemy [rather than the caravan]"),
      difficulty: 3,
      questions: [
        { q: "Which group did they wish for, in 8:7?", a: "The unarmed one", wrong: ["The armed one", "Neither", "Both at once"], why: "Wa tawadduna anna ghayra dhatish-shawkati takunu lakum." },
        { q: "Whose caravan was it, per Ibn Kathir?", a: "Abu Sufyan's", wrong: ["Abu Jahl's", "Fir'awn's", "Abu Lahab's"], why: "Abu Sufyan had left Sham with Quraysh's caravan." },
        { q: "What did Allah will, in 8:7-8?", a: "That the truth triumph", wrong: ["That they get rich", "That they go home", "That they hide"], why: "Liyuhiqqal-haqqa wa yubtilal-batil." }
      ]
    },
    {
      slug: "badr-dua",
      title: "The du'a at Badr",
      line: "The Prophet ﷺ begged Allah for His promise; Allah answered.",
      facts: ["Tastaghithun: crying for help", "Abu Bakr: enough"],
      quote: q8(9),
      source: hadith("bukhari", "3953", "Ibn Abbas", "Sahih", "On the day of Badr the Prophet ﷺ said: O Allah, I appeal to You to fulfil Your covenant and promise. Abu Bakr took his hand and said: this is sufficient for you. He came out saying: their multitude will be put to flight.", "I appeal to You (to fulfill) Your Covenant and Promise"),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ ask for at Badr, in Bukhari 3953?", a: "Allah's covenant and promise", wrong: ["Gold", "More horses", "A truce"], why: "I appeal to You to fulfill Your Covenant and Promise." },
        { q: "Who took his hand and said: this is enough?", a: "Abu Bakr", wrong: ["Umar", "Ali", "Uthman"], why: "Then Abu Bakr took hold of him by the hand." },
        { q: "In 8:9, Allah answered their call for help.", tf: true, why: "Idh tastaghithuna rabbakum fastajaba lakum." }
      ]
    },
    {
      slug: "miqdad-promise",
      title: "We will not say what Musa's people said",
      line: "Al-Miqdad: we stand on your right, left, front and back.",
      facts: ["Unlike Musa's people", "The Prophet ﷺ smiled"],
      quote: q8(9),
      source: hadith("bukhari", "3952", "Abdullah ibn Mas'ud", "Sahih", "Al-Miqdad said to the Prophet ﷺ: we will not say as Musa's people said, go you and your Lord. We will be on your right, your left, in front and behind. The Prophet's ﷺ face shone with happiness.", "We will not say as the People of Moses said"),
      difficulty: 3,
      questions: [
        { q: "Whose words did Al-Miqdad refuse to repeat?", a: "Musa's people", wrong: ["Nuh's people", "Fir'awn's chiefs", "The Quraysh"], why: "We will not say as the People of Moses said." },
        { q: "How did the Prophet ﷺ react, per Ibn Mas'ud?", a: "His face shone with joy", wrong: ["He was angry", "He left", "He was silent"], why: "I saw the face of the Prophet ﷺ getting bright with happiness." },
        { q: "Al-Miqdad's words recall 5:24.", tf: true, why: "Go you and your Lord and fight you two." }
      ]
    },
    {
      slug: "angels-in-succession",
      title: "A thousand angels, one after another",
      line: "Allah sent a thousand angels, following each other in ranks.",
      facts: ["Murdifin: in succession", "Glad tidings"],
      quote: q8(9),
      source: ik(9, "Allah answered with a thousand angels, murdifin: Ibn Abbas said this means each behind the other in succession.", "meaning each behind the other in succession"),
      difficulty: 3,
      questions: [
        { q: "How many angels does 8:9 mention?", a: "A thousand", wrong: ["Ten", "A hundred", "Seven"], why: "Bi-alfin minal-mala'ikati murdifin." },
        { q: "What does murdifin mean, per Ibn Abbas?", a: "One behind the other", wrong: ["Hidden", "Sleeping", "Riding horses"], why: "Each behind the other in succession." },
        { q: "Badr was won by the Muslims' numbers alone.", tf: false, why: "Allah sent help from the angels." }
      ]
    },
    {
      slug: "victory-only-from-allah",
      title: "Victory is only from Allah",
      line: "The angels were good news; victory comes only from Allah.",
      facts: ["Bushra: good news", "Hearts at rest"],
      quote: q8(10),
      source: ik(10, "Sending the angels and telling the believers about it was good news so their hearts would rest. Allah could give victory without the angels: victory only comes from Him.", "victory only comes from Him, without need to send the angels"),
      difficulty: 4,
      questions: [
        { q: "Why were they told about the angels, in 8:10?", a: "As good news, to calm hearts", wrong: ["To make them lazy", "To scare them", "To boast"], why: "Illa bushra wa litatma'inna bihi qulubukum." },
        { q: "Where does victory come from, in 8:10?", a: "Only from Allah", wrong: ["From the angels alone", "From numbers", "From weapons"], why: "Wa man-nasru illa min indillah." },
        { q: "Per Ibn Kathir, Allah needed the angels to win.", tf: false, why: "Victory only comes from Him, without need to send the angels." }
      ]
    },
    {
      slug: "slumber-of-peace",
      title: "Sleep as a gift of safety",
      line: "Before Badr, Allah sent calm sleep on the believers as safety.",
      facts: ["Nu'as: light sleep", "Fear removed"],
      quote: q8(11),
      source: ik(11, "Allah reminds the believers of the sleep He sent on them as safety from the fear they felt at the size of the enemy and their own small number.", "Allah reminds the believers of the slumber that He sent down on them as security from the fear they suffered from"),
      difficulty: 3,
      questions: [
        { q: "What covered the believers before Badr, in 8:11?", a: "A calm slumber", wrong: ["A dust storm", "Darkness", "Snow"], why: "Idh yughash-shikumun-nu'asa amanatan minh." },
        { q: "What did the slumber take away, per Ibn Kathir?", a: "Their fear", wrong: ["Their faith", "Their food", "Their weapons"], why: "As security from the fear they suffered from." },
        { q: "Something similar happened at Uhud, per 3:154.", tf: true, why: "Slumber overtook a party of you." }
      ]
    },
    {
      slug: "rain-at-badr",
      title: "Rain that cleaned and steadied",
      line: "Rain fell to clean them, calm their hearts and firm their feet.",
      facts: ["Taharah: purity", "Shaytan's whisper removed"],
      quote: q8(11),
      source: ik(11, "At Badr the Muslims were on sand, away from the water, and Shaytan whispered to them. Allah sent heavy rain so they could drink and purify, removed Shaytan's whisper, and made the sand firm.", "Allah sent down heavy rain, allowing the Muslims to drink and use it for purity"),
      difficulty: 4,
      questions: [
        { q: "What did the rain do, per Ibn Kathir?", a: "Gave water for drinking and purity", wrong: ["Flooded the camp", "Ruined the food", "Stopped the battle"], why: "Allowing the Muslims to drink and use it for purity." },
        { q: "What did the rain remove, in 8:11?", a: "Shaytan's whisper", wrong: ["The enemy", "The angels", "The sand"], why: "Wa yudh-hiba ankum rijzash-shaytan." },
        { q: "What did the rain do to their feet, in 8:11?", a: "Made them firm", wrong: ["Made them slip", "Made them tired", "Nothing"], why: "Wa yuthabbita bihil-aqdam." }
      ]
    },
    {
      slug: "do-not-flee",
      title: "Never turn your back",
      line: "Believers must not run from the battle and leave their brothers.",
      facts: ["Unless a tactic", "Or joining another group"],
      quote: q8(15),
      source: ik(15, "When the believers meet the enemy, they must not run away and leave their fellow Muslims behind. Turning as a battle tactic, or to join another Muslim group, is allowed.", "do not run away from battle and leave your fellow Muslims behind"),
      difficulty: 4,
      questions: [
        { q: "What does 8:15 forbid on the battlefield?", a: "Turning your back", wrong: ["Making du'a", "Standing in rows", "Being patient"], why: "Fala tuwalluhumul-adbar." },
        { q: "Which is allowed, in 8:16?", a: "Joining another Muslim group", wrong: ["Hiding at home", "Going over to the enemy", "Taking the spoils first"], why: "Aw mutahayyizan ila fi'ah." },
        { q: "Why is running away so bad, per Ibn Kathir?", a: "It leaves fellow Muslims behind", wrong: ["It is tiring", "It is slow", "It is noisy"], why: "Do not run away from battle and leave your fellow Muslims behind." }
      ]
    },
    {
      slug: "allah-threw",
      title: "You did not throw, Allah threw",
      line: "The Prophet ﷺ threw sand; Allah made it reach them all.",
      facts: ["A handful of sand", "Allah gives success"],
      quote: q8(17),
      source: ik(17, "The Prophet ﷺ threw a handful of sand at the enemy at Badr after praying humbly. Allah made it reach every one of their eyes. So Allah says: you did not throw, but Allah threw.", "Allah made this handful of sand enter the eyes of the idolators"),
      difficulty: 4,
      questions: [
        { q: "What did the Prophet ﷺ throw at Badr, per Ibn Kathir?", a: "A handful of sand", wrong: ["A spear", "A stone", "His cloak"], why: "Then he threw a handful of sand at the disbelievers." },
        { q: "Who made the sand reach them, in 8:17?", a: "Allah", wrong: ["The wind alone", "The angels alone", "The Prophet ﷺ by his strength"], why: "Wa ma ramayta idh ramayta wa lakinnallaha rama." },
        { q: "What did he do before throwing, per Ibn Kathir?", a: "Prayed humbly to Allah", wrong: ["Slept", "Ate", "Counted the enemy"], why: "The Prophet ﷺ invoked Allah humbly and expressing his neediness." }
      ]
    },
    {
      slug: "not-by-numbers",
      title: "Not by numbers",
      line: "Victory does not depend on numbers or weapons, but on Allah.",
      facts: ["Few beat many", "A fair test"],
      quote: q8(17),
      source: ik(17, "Allah states that victory does not depend on numbers or collecting weapons and shields. Victory is from Him, as in 2:249: how often has a small group overcome a mighty host by Allah's leave.", "victory does not depend on numbers or collecting weapons and shields"),
      difficulty: 4,
      questions: [
        { q: "Victory depends on numbers and weapons, per Ibn Kathir.", tf: false, why: "Victory does not depend on numbers or collecting weapons and shields." },
        { q: "Which ayah does Ibn Kathir add: a small group beats a mighty host?", a: "2:249", wrong: ["1:5", "112:1", "36:82"], why: "How often has a small group overcome a mighty host by Allah's leave." },
        { q: "Why did Allah do this, in 8:17?", a: "To test the believers well", wrong: ["To make them proud", "To end all tests", "To punish them"], why: "Wa liyubliyal-mu'minina minhu bala'an hasana." }
      ]
    },
    {
      slug: "they-asked-for-judgment",
      title: "They asked for a judgment",
      line: "The Makkans asked Allah to judge; the judgment came at Badr.",
      facts: ["Fath: judgment", "If you stop, it is better"],
      quote: q8(19),
      source: ik(19, "The disbelievers asked Allah for victory and a judgment between them and the believers, and they got what they asked for. If they stop, it is better for them, and Allah is with the believers.", "you invoked Allah for victory, judgement and a decision"),
      difficulty: 5,
      questions: [
        { q: "What did the disbelievers ask Allah for, in 8:19?", a: "A judgment", wrong: ["Rain", "Wealth", "Children"], why: "In tastaftihu faqad ja'akumul-fath." },
        { q: "What would be better for them, in 8:19?", a: "To stop", wrong: ["To return", "To gather more", "To hide"], why: "Wa in tantahu fahuwa khayrun lakum." },
        { q: "With whom is Allah, in 8:19?", a: "The believers", wrong: ["The most numerous", "The richest", "No one"], why: "Wa annallaha ma'al-mu'minin." }
      ]
    }
  ]
};

/** Ayahs 20 to 40: obey and listen, the call that gives life, trials, trust, the plot in Makkah and the open door. */
const ANFAL_TWO: DeepUnit = {
  key: "anfal2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-8",
  name: "Al-Anfal, ayahs 20 to 40",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Anfal",
  lessons: [
    {
      slug: "heard-but-not-hearing",
      title: "We heard, but they did not",
      line: "Do not say we heard, then refuse to really listen.",
      facts: ["Obey while you hear", "Like the hypocrites"],
      quote: q8(21),
      source: ik(20, "Allah commands the believers to obey Him and His Messenger and not be like the hypocrites, who pretend to hear and obey while they do neither.", "who pretend to hear and obey, while in fact they do neither"),
      difficulty: 2,
      questions: [
        { q: "Whom should we obey, in 8:20?", a: "Allah and His Messenger", wrong: ["Our desires", "The crowd", "Only our elders"], why: "Ati'ullaha wa rasulah." },
        { q: "Who says we heard but does not hear, per Ibn Ishaq?", a: "The hypocrites", wrong: ["The angels", "The prophets", "The Ansar"], why: "Who pretend to hear and obey, while in fact they do neither." },
        { q: "Hearing without obeying is real listening, per 8:21.", tf: false, why: "Qalu sami'na wa hum la yasma'un." }
      ]
    },
    {
      slug: "worst-creatures",
      title: "Deaf to the truth",
      line: "The worst creatures are those deaf and dumb to the truth.",
      facts: ["Deaf: will not hear truth", "Dumb: will not grasp it"],
      quote: q8(22),
      source: ik(22, "The worst creatures with Allah are the deaf, who do not hear the truth, and the dumb, who cannot understand it. Every other creature follows the way Allah made it; these were made to worship Allah but refused.", "the deaf) who do not hear the truth"),
      difficulty: 3,
      questions: [
        { q: "Who are the worst creatures, in 8:22?", a: "Those deaf and dumb to the truth", wrong: ["Wild animals", "Insects", "The poor"], why: "Innal-sharrad-dawabbi indallahis-summul-bukm." },
        { q: "What does deaf mean in 8:22, per Ibn Kathir?", a: "They do not hear the truth", wrong: ["They lost hearing", "They are old", "They live far away"], why: "The deaf who do not hear the truth." },
        { q: "Per 8:23, if they heard, they would still turn away.", tf: true, why: "Wa law asma'ahum latawallaw wa hum mu'ridun." }
      ]
    },
    {
      slug: "call-that-gives-life",
      title: "The call that gives life",
      line: "Answer the Messenger's ﷺ call to what gives you life.",
      facts: ["Istajibu: answer", "Al-Fatihah: the greatest surah"],
      quote: q8(24),
      source: hadith("bukhari", "4647", "Abu Sa'id ibn al-Mu'alla", "Sahih", "The Prophet ﷺ called Abu Sa'id while he was praying, and he finished first. The Prophet ﷺ asked what stopped him, quoting 8:24, then taught him that Al-Fatihah is the greatest surah.", "What prevented you from coming to me"),
      difficulty: 3,
      questions: [
        { q: "What does 8:24 tell believers to do?", a: "Answer Allah and the Messenger ﷺ", wrong: ["Wait and see", "Ask others first", "Stay silent"], why: "Istajibu lillahi wa lir-rasul." },
        { q: "What did the Prophet ﷺ then teach Abu Sa'id, in Bukhari 4647?", a: "The greatest surah", wrong: ["A new prayer", "A battle plan", "A poem"], why: "I will inform you of the greatest Sura in the Quran." },
        { q: "Which surah did he name the greatest?", a: "Al-Fatihah", wrong: ["Al-Ikhlas", "Yasin", "Al-Mulk"], why: "Praise be to Allah, the Lord of the worlds." }
      ]
    },
    {
      slug: "between-person-and-heart",
      title: "Allah comes between a person and his heart",
      line: "Allah comes between a person and his heart; ask for firmness.",
      facts: ["Turner of hearts", "Ya muqallibal-qulub"],
      quote: q8(24),
      source: ik(24, "Ibn Abbas said Allah keeps the believer from disbelief and the disbeliever from faith. The Prophet ﷺ often said: O Turner of hearts, make my heart firm on Your religion.", "Allah prevents the believer from disbelief and the disbeliever from faith"),
      difficulty: 4,
      questions: [
        { q: "What does Allah come between, in 8:24?", a: "A person and his heart", wrong: ["Two brothers", "Day and night", "Two armies"], why: "Annallaha yahulu baynal-mar'i wa qalbih." },
        { q: "What du'a did the Prophet ﷺ often say, per Ibn Kathir?", a: "Make my heart firm on Your religion", wrong: ["Give me a kingdom", "Make me famous", "Give me long life"], why: "O You Who changes the hearts, make my heart firm on Your religion." },
        { q: "To Allah we will all be gathered, says 8:24.", tf: true, why: "Wa annahu ilayhi tuhsharun." }
      ]
    },
    {
      slug: "trial-that-spreads",
      title: "A trial that reaches everyone",
      line: "Unchecked sin brings a trial that hits more than the sinners.",
      facts: ["Fitnah: trial", "Stop the wrong"],
      quote: q8(25),
      source: ik(25, "Allah warns of a trial that reaches the wrongdoers and those around them. It will reach the others too if the sins are not stopped and prevented.", "it will reach the others if the sins are not stopped and prevented"),
      difficulty: 4,
      questions: [
        { q: "Who can a fitnah reach, in 8:25?", a: "Not only the wrongdoers", wrong: ["Only the wrongdoers", "Only the rich", "No one"], why: "La tusibannal-ladhina zalamu minkum khassah." },
        { q: "When does it reach others, per Ibn Kathir?", a: "When sins are not stopped", wrong: ["Every Friday", "When it rains", "Never"], why: "It will reach the others if the sins are not stopped and prevented." },
        { q: "Forbidding wrong protects the whole community.", tf: true, why: "Allah commanded the believers to stop evil from flourishing among them." }
      ]
    },
    {
      slug: "remember-you-were-few",
      title: "Remember when you were few",
      line: "Once few and afraid, Allah gave them shelter, help and food.",
      facts: ["Makkah: weak and few", "Madinah: safe home"],
      quote: q8(26),
      source: ik(26, "Allah reminds the believers that they were few and He made them many, weak and fearful and He gave them strength and victory, poor and He gave them provision, so they should be grateful.", "They were few and He made them many, weak and fearful and He provided them with strength and victory"),
      difficulty: 3,
      questions: [
        { q: "What were the believers once, in 8:26?", a: "Few and weak", wrong: ["Many and strong", "Rich and proud", "Kings"], why: "Wadhkuru idh antum qalilun mustad'afuna fil-ard." },
        { q: "Where did Allah give them a safe place, per Ibn Kathir?", a: "Al-Madinah", wrong: ["Ta'if", "Sham", "Yemen"], why: "Allah permitted the believers to migrate to Al-Madinah." },
        { q: "Why did Allah give these favors, in 8:26?", a: "So they would be grateful", wrong: ["So they would boast", "So they would rest", "So they would forget"], why: "La'allakum tashkurun." }
      ]
    },
    {
      slug: "do-not-betray",
      title: "Do not betray a trust",
      line: "Never betray Allah, His Messenger, or your trusts.",
      facts: ["Amanah: trust", "Hatib's letter"],
      quote: q8(27),
      source: ik(27, "The ayah came down about Hatib, who wrote to warn Quraysh, but its ruling is general. Betrayal covers minor and major sins, and the amanah includes the duties Allah gave us.", "Betrayal includes both minor and major sins"),
      difficulty: 4,
      questions: [
        { q: "What does 8:27 forbid?", a: "Betraying trusts", wrong: ["Trading", "Travelling", "Writing"], why: "La takhunullaha war-rasula wa takhunu amanatikum." },
        { q: "What does amanah include, per Ibn Abbas?", a: "The duties Allah gave us", wrong: ["Only money", "Only secrets", "Only land"], why: "The actions that Allah has entrusted the servants with." },
        { q: "The ruling of 8:27 is only for Hatib, per Ibn Kathir.", tf: false, why: "This Ayah is more general, even if it was revealed about a specific incident." }
      ]
    },
    {
      slug: "wealth-and-children-a-test",
      title: "Wealth and children are a test",
      line: "Your wealth and children are a test; Allah's reward is greater.",
      facts: ["Fitnah: a test", "Ajrun azim"],
      quote: q8(28),
      source: ik(28, "Allah gives wealth and children to see who will be grateful and obedient, and who will be busy with them instead of Him.", "He grants these to you so that He knows which of you will be grateful and obedient to Him"),
      difficulty: 4,
      questions: [
        { q: "What are wealth and children, in 8:28?", a: "A test", wrong: ["A curse", "A crime", "A reward only"], why: "Annama amwalukum wa awladukum fitnah." },
        { q: "What does Allah see through them, per Ibn Kathir?", a: "Who is grateful and obedient", wrong: ["Who is the tallest", "Who travels most", "Who sleeps least"], why: "So that He knows which of you will be grateful and obedient to Him." },
        { q: "With Allah is a mighty reward, greater than both.", tf: true, why: "Wa annallaha indahu ajrun azim." }
      ]
    },
    {
      slug: "furqan-for-taqwa",
      title: "Taqwa gives a criterion",
      line: "With taqwa, Allah gives a criterion between truth and falsehood.",
      facts: ["Furqan: criterion", "Sins erased"],
      quote: q8(29),
      source: ik(29, "Furqan was explained as a way out, salvation or help. Ibn Ishaq said it means a criterion between truth and falsehood, which includes the other meanings.", "criterion between truth and falsehood"),
      difficulty: 4,
      questions: [
        { q: "What does Allah give those with taqwa, in 8:29?", a: "Furqan", wrong: ["Gold", "Fame", "Kingdoms"], why: "In tattaqullaha yaj'al lakum furqana." },
        { q: "What did Ibn Ishaq say furqan means?", a: "A criterion between truth and falsehood", wrong: ["A sword", "A book of poems", "A journey"], why: "Criterion between truth and falsehood." },
        { q: "Taqwa also brings forgiveness of sins, in 8:29.", tf: true, why: "Wa yukaffir ankum sayyi'atikum wa yaghfir lakum." }
      ]
    },
    {
      slug: "the-plot-in-makkah",
      title: "The plot in Makkah",
      line: "Quraysh plotted against the Prophet ﷺ; Allah planned best.",
      facts: ["Dar an-Nadwah", "The Hijrah"],
      quote: q8(30),
      source: ik(30, "The chiefs of Quraysh met in Dar an-Nadwah to plan against the Prophet ﷺ: to imprison him, drive him out or worse. Allah saved him, and Allah is the best of planners.", "Some of the chiefs of the various tribes of Quraysh gathered in Dar An-Nadwah"),
      difficulty: 4,
      questions: [
        { q: "Where did Quraysh meet to plot, per Ibn Kathir?", a: "Dar an-Nadwah", wrong: ["The Ka'bah roof", "Ta'if", "Badr"], why: "Quraysh gathered in Dar An-Nadwah." },
        { q: "What does liyuthbituka mean, per Ibn Abbas?", a: "To imprison you", wrong: ["To praise you", "To follow you", "To feed you"], why: "Liyuthbituka means to imprison you." },
        { q: "Who is the best of planners, in 8:30?", a: "Allah", wrong: ["Quraysh", "Iblis", "The poets"], why: "Wallahu khayrul-makirin." }
      ]
    },
    {
      slug: "empty-boast",
      title: "We could say the like",
      line: "They boasted they could match the Quran, but never could.",
      facts: ["Asatir: old tales", "The challenge stands"],
      quote: q8(31),
      source: ik(31, "Quraysh said they could say the like of the Quran. They boasted with words but not actions: they were challenged to bring even one surah and could not.", "They boasted with their words, but not with their actions"),
      difficulty: 4,
      questions: [
        { q: "What did they claim, in 8:31?", a: "We could say the like of it", wrong: ["We believe in it", "We wrote it", "We never heard it"], why: "Law nasha'u laqulna mithla hadha." },
        { q: "What did they call the Quran, in 8:31?", a: "Tales of the ancients", wrong: ["Poetry of kings", "News of tomorrow", "Songs"], why: "In hadha illa asatirul-awwalin." },
        { q: "They met the challenge to bring one surah.", tf: false, why: "They were challenged several times and had no way to meet this challenge." }
      ]
    },
    {
      slug: "two-shelters",
      title: "Two shelters from punishment",
      line: "The Prophet's ﷺ presence and istighfar held punishment back.",
      facts: ["Abu Jahl's prayer", "Istighfar remains"],
      quote: q8(33),
      source: hadith("bukhari", "4648", "Anas ibn Malik", "Sahih", "Abu Jahl said: O Allah, if this is the truth from You, rain stones on us. So Allah revealed: Allah would not punish them while you are among them, nor while they seek forgiveness.", "Allah would not punish them while you were amongst them"),
      difficulty: 4,
      questions: [
        { q: "Who asked for stones to rain down, in Bukhari 4648?", a: "Abu Jahl", wrong: ["Abu Talib", "Abu Sufyan", "Al-Walid"], why: "Abu Jahl said: O Allah! If this is indeed the Truth." },
        { q: "What protected them, in 8:33?", a: "The Prophet ﷺ among them and istighfar", wrong: ["Their idols", "Their walls", "Their wealth"], why: "Wa ma kanallahu liyu'adhdhibahum wa anta fihim." },
        { q: "Per Ibn Abbas, seeking forgiveness still remains as a shelter.", tf: true, why: "The Prophet ﷺ went away, and only seeking forgiveness remained." }
      ]
    },
    {
      slug: "guardians-of-the-masjid",
      title: "The true guardians of the Masjid",
      line: "Only people of taqwa are true guardians of the Sacred Masjid.",
      facts: ["Muka': whistling", "Tasdiyah: clapping"],
      quote: q8(34),
      source: ik(34, "Only the people of taqwa can be guardians of al-Masjid al-Haram. Ibn Abbas said the pagans' 'prayer' at the House was whistling and clapping: muka' and tasdiyah.", "this part of the Ayah refers to whistling"),
      difficulty: 5,
      questions: [
        { q: "Who can be guardians of the Masjid al-Haram, in 8:34?", a: "Those with taqwa", wrong: ["Any tribe", "The richest", "The poets"], why: "In awliya'uhu illal-muttaqun." },
        { q: "What does muka' mean, per Ibn Abbas?", a: "Whistling", wrong: ["Bowing", "Reciting", "Fasting"], why: "Muka' means whistling." },
        { q: "What does tasdiyah mean, per Ibn Abbas?", a: "Clapping the hands", wrong: ["Crying", "Sleeping", "Walking"], why: "Tasdiyah means clapping the hands." }
      ]
    },
    {
      slug: "spending-to-block",
      title: "Spending against Allah's path",
      line: "They spend to block Allah's path; it will turn to regret.",
      facts: ["Hasrah: anguish", "Then they lose"],
      quote: q8(36),
      source: ik(36, "After Badr, Quraysh gathered the caravan's wealth to fight the Muslims again. Allah said their spending would become anguish for them, and they would be overcome.", "but in the end it will become an anguish for them"),
      difficulty: 5,
      questions: [
        { q: "Why do they spend, in 8:36?", a: "To block Allah's path", wrong: ["To feed the poor", "To build mosques", "To free slaves"], why: "Yunfiquna amwalahum liyasuddu an sabilillah." },
        { q: "What will their spending become, in 8:36?", a: "Anguish for them", wrong: ["Their victory", "Their honor", "Their reward"], why: "Thumma takunu alayhim hasratan." },
        { q: "Why does Allah allow this, in 8:37?", a: "To separate the bad from the good", wrong: ["To reward them", "To test the angels", "No reason"], why: "Liyamizallahul-khabitha minat-tayyib." }
      ]
    },
    {
      slug: "the-door-is-open",
      title: "The door is open: stop and be forgiven",
      line: "If they stop, their past is forgiven; Islam wipes it clean.",
      facts: ["Ghufran: forgiveness", "A new start"],
      quote: q8(38),
      source: hadith("bukhari", "6921", "Abdullah ibn Mas'ud", "Sahih", "A man asked if they would be punished for what they did before Islam. The Prophet ﷺ said: whoever does good in Islam will not be punished for what he did before it.", "Whoever does good in Islam will not be punished for what he did in the Pre-Islamic Period of ignorance"),
      difficulty: 5,
      questions: [
        { q: "What happens if they stop, in 8:38?", a: "Their past is forgiven", wrong: ["They are fined", "Nothing changes", "They must leave"], why: "In yantahu yughfar lahum ma qad salaf." },
        { q: "Who is not punished for his past, in Bukhari 6921?", a: "Whoever does good in Islam", wrong: ["Whoever is rich", "Whoever is old", "Everyone, no matter what"], why: "Whoever does good in Islam will not be punished for what he did." },
        { q: "Ibn Kathir also quotes: Islam erases what came before it.", tf: true, why: "Islam erases what occurred before it." }
      ]
    },
    {
      slug: "best-protector",
      title: "The best Protector, the best Helper",
      line: "If they turn away, know that Allah is your Protector and Helper.",
      facts: ["Mawla: protector", "Nasir: helper"],
      quote: q8(40),
      source: ik(38, "If they turn away, the believers should know that Allah is their Protector: what an excellent Protector and what an excellent Helper.", "an excellent protector and (what) an excellent helper"),
      difficulty: 5,
      questions: [
        { q: "Who is the believers' Protector, in 8:40?", a: "Allah", wrong: ["Their army", "Their tribe", "Their wealth"], why: "Annallaha mawlakum." },
        { q: "What does Allah call Himself, in 8:40?", a: "The best Protector and Helper", wrong: ["A distant judge", "Only a king", "Only a witness"], why: "Ni'mal-mawla wa ni'man-nasir." },
        { q: "8:40 tells believers to fear when others turn away.", tf: false, why: "Allah is their Protector, so they need not fear." }
      ]
    }
  ]
};

/** Ayahs 41 to 75: the fifth, the Day of Criterion, standing firm, Shaytan's lie, keeping promises, peace and brotherhood. */
const ANFAL_THREE: DeepUnit = {
  key: "anfal3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-8",
  name: "Al-Anfal, ayahs 41 to 75",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Anfal",
  lessons: [
    {
      slug: "the-fifth",
      title: "One fifth for Allah's causes",
      line: "A fifth of the spoils goes to orphans, the poor and others.",
      facts: ["Khumus: one fifth", "Even a needle counts"],
      quote: q8(41),
      source: ik(41, "A fifth of the spoils is set aside for Allah, the Messenger ﷺ, his relatives, orphans, the poor and the wayfarer. It must be handed over in full, whether little or much, even a thread and needle.", "the one-fifth should be reserved and paid in full"),
      difficulty: 2,
      questions: [
        { q: "How much of the spoils is set aside, in 8:41?", a: "One fifth", wrong: ["One half", "One tenth", "All of it"], why: "Fa anna lillahi khumusah." },
        { q: "Which group is named for the fifth, in 8:41?", a: "Orphans", wrong: ["Merchants", "Poets", "Kings"], why: "Wal-yatama wal-masakini wabnis-sabil." },
        { q: "Per Ibn Kathir, even a needle must be handed over.", tf: true, why: "Whether it was little or substantial, even a yarn and needle." }
      ]
    },
    {
      slug: "day-of-criterion",
      title: "The Day of Criterion",
      line: "Badr is the Day of Criterion: Allah split truth from falsehood.",
      facts: ["Yawm al-Furqan", "Two forces met"],
      quote: q8(41),
      source: ik(41, "Allah made His favor known when He distinguished between truth and falsehood at Badr. That is why the day was called al-Furqan.", "when He distinguished between truth and falsehood in the battle of Badr"),
      difficulty: 2,
      questions: [
        { q: "What does 8:41 call the day of Badr?", a: "The Day of Criterion", wrong: ["The Day of Rest", "The Day of Trade", "The Day of Rain"], why: "Yawmal-furqan." },
        { q: "Why is it called that, per Ibn Kathir?", a: "Allah split truth from falsehood", wrong: ["It rained", "It was a Friday", "Trade began"], why: "He distinguished between truth and falsehood in the battle of Badr." },
        { q: "The Day of Criterion is the day the two forces met.", tf: true, why: "Yawmal-taqal-jam'an." }
      ]
    },
    {
      slug: "met-without-appointment",
      title: "A meeting Allah arranged",
      line: "Had they set a date, they would have missed; Allah arranged it.",
      facts: ["Near and far side", "Clear proof for all"],
      quote: q8(42),
      source: ik(42, "The Muslims camped on the near side of the valley and Quraysh on the far side, with the caravan lower down. Had they set a meeting and known the enemy's numbers, they would not have met them. Allah brought it about.", "you would not have met them"),
      difficulty: 3,
      questions: [
        { q: "Had they made an appointment, what would happen, in 8:42?", a: "They would have missed it", wrong: ["They would win sooner", "They would trade", "Nothing different"], why: "Walaw tawa'adtum lakhtalaftum fil-mi'ad." },
        { q: "Why did the meeting happen, in 8:42?", a: "Allah decreed it", wrong: ["By chance", "For trade", "For a feast"], why: "Liyaqdiyallahu amran kana maf'ula." },
        { q: "Where was the caravan, in 8:42?", a: "On lower ground", wrong: ["On a mountain", "In Makkah", "In Madinah"], why: "War-rakbu asfala minkum." }
      ]
    },
    {
      slug: "few-in-a-dream",
      title: "Few in a dream",
      line: "In a dream the enemy looked few, so hearts grew firm.",
      facts: ["A true dream", "No quarrel, no fear"],
      quote: q8(43),
      source: ik(43, "Mujahid said Allah showed the Prophet ﷺ the enemy as few in a dream. He told his Companions and their resolve grew. Had they seen them as many, they would have lost heart and argued.", "conveyed this news to his Companions and their resolve strengthened"),
      difficulty: 3,
      questions: [
        { q: "How did the enemy look in the dream, in 8:43?", a: "Few", wrong: ["Many", "Hidden", "Friendly"], why: "Idh yurikahumullahu fi manamika qalila." },
        { q: "What would seeing them as many have caused, in 8:43?", a: "Losing heart and arguing", wrong: ["More joy", "A quick win", "A feast"], why: "Lafashiltum wa latanaza'tum fil-amr." },
        { q: "What happened when he told his Companions, per Mujahid?", a: "Their resolve grew", wrong: ["They left", "They laughed", "They slept"], why: "Their resolve strengthened." }
      ]
    },
    {
      slug: "few-in-each-others-eyes",
      title: "Few in each other's eyes",
      line: "Each side looked few to the other, so Allah's decree came true.",
      facts: ["A mercy for believers", "All returns to Allah"],
      quote: q8(44),
      source: ik(44, "When they met, Allah made the disbelievers look few to the believers, which shows His compassion: it encouraged them to meet the enemy.", "Allah made them see few disbelievers in their eyes, so that they would be encouraged"),
      difficulty: 3,
      questions: [
        { q: "How did the enemy look to the believers, in 8:44?", a: "Few", wrong: ["Huge", "Invisible", "Asleep"], why: "Wa idh yurikumuhum idhil-taqaytum fi a'yunikum qalila." },
        { q: "What does this show, per Ibn Kathir?", a: "Allah's compassion for the believers", wrong: ["The believers' strength", "Luck", "Nothing"], why: "Demonstrates Allah's compassion towards the believers." },
        { q: "To Allah all matters return, says 8:44.", tf: true, why: "Wa ilallahi turja'ul-umur." }
      ]
    },
    {
      slug: "do-not-wish-for-the-enemy",
      title: "Do not wish to meet the enemy",
      line: "Ask Allah for safety; if tested, be patient and firm.",
      facts: ["Ask for afiyah", "Stand firm if it comes"],
      quote: q8(45),
      source: hadith("bukhari", "2966", "Abdullah ibn Abi Awfa", "Sahih", "The Prophet ﷺ said: O people, do not wish to meet the enemy, and ask Allah for safety. But if you meet them, be patient. Then he made du'a to Allah, Revealer of the Book and Mover of the clouds.", "Do not wish to face the enemy (in a battle) and ask Allah to save you (from calamities)"),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ say not to wish for?", a: "To meet the enemy", wrong: ["Rain", "Wealth", "Long life"], why: "Do not wish to face the enemy." },
        { q: "What should we ask Allah for instead?", a: "Safety", wrong: ["Fame", "Battles", "Gold"], why: "Ask Allah to save you from calamities." },
        { q: "If the test comes, what should we do, per Bukhari 2966?", a: "Be patient", wrong: ["Run away", "Complain", "Give up"], why: "If you should face the enemy, then be patient." }
      ]
    },
    {
      slug: "firm-and-remembering",
      title: "Stand firm and remember Allah",
      line: "Stand firm, remember Allah much, and do not quarrel.",
      facts: ["Dhikr in hardship", "Quarrels weaken"],
      quote: q8(46),
      source: ik(45, "Believers are told to stand firm, remember Allah and never neglect His remembrance in hard moments, and to obey Allah and His Messenger ﷺ. Disputes make them lose courage, so they must be patient.", "They are commanded to remember Allah while in that condition and never neglect His remembrance"),
      difficulty: 4,
      questions: [
        { q: "What should believers do much, in 8:45?", a: "Remember Allah", wrong: ["Sleep", "Boast", "Argue"], why: "Wadhkurullaha kathiran la'allakum tuflihun." },
        { q: "What does disputing cause, in 8:46?", a: "Losing courage and strength", wrong: ["More wealth", "Better plans", "Nothing"], why: "Wa la tanaza'u fatafshalu wa tadh-haba rihukum." },
        { q: "Allah is with the patient, says 8:46.", tf: true, why: "Innallaha ma'as-sabirin." }
      ]
    },
    {
      slug: "not-for-show",
      title: "Not out of pride or show",
      line: "Never march out proudly just to be seen by people.",
      facts: ["Batar: arrogance", "Ri'a': showing off"],
      quote: q8(47),
      source: ik(47, "Allah forbids copying the idolators who marched out arrogantly to be seen by people. Abu Jahl refused to go home even after the caravan was safe, wanting the Arabs to talk about them.", "boasting arrogantly with people"),
      difficulty: 4,
      questions: [
        { q: "How did the idolators march out, in 8:47?", a: "Proudly, to be seen", wrong: ["Humbly", "In secret", "Unwillingly"], why: "Batarana wa ri'a'an-nas." },
        { q: "Who refused to go home, per Ibn Kathir?", a: "Abu Jahl", wrong: ["Abu Sufyan", "Abu Talib", "Suraqah"], why: "When Abu Jahl was told that the caravan escaped safely." },
        { q: "Showing off is a trait believers should copy.", tf: false, why: "Wa la takunu kalladhina kharaju min diyarihim batara." }
      ]
    },
    {
      slug: "shaytans-empty-promise",
      title: "Shaytan's empty promise",
      line: "Shaytan said: I am your neighbor; when the angels came, he ran.",
      facts: ["As Suraqah", "I see what you see not"],
      quote: q8(48),
      source: ik(48, "Shaytan made their march look good and promised help. He came in the form of Suraqah ibn Malik. When he saw the angels coming to help the believers, he ran away.", "Shaytan witnessed the angels coming to their aid"),
      difficulty: 4,
      questions: [
        { q: "What did Shaytan promise, in 8:48?", a: "I am your neighbor and helper", wrong: ["Gold", "A kingdom", "Rain"], why: "Wa inni jarun lakum." },
        { q: "Whose form did he take, per Ibn Kathir?", a: "Suraqah ibn Malik", wrong: ["Abu Jahl", "Abu Lahab", "Umayyah"], why: "Shaytan appeared to them in the shape of Suraqah bin Malik." },
        { q: "Why did Shaytan run, per Ibn Abbas?", a: "He saw the angels", wrong: ["He got tired", "It rained", "He was hungry"], why: "Shaytan witnessed the angels coming to their aid." }
      ]
    },
    {
      slug: "deceived-by-their-religion",
      title: "Deceived by their religion?",
      line: "Hypocrites mocked the believers; Allah suffices those who trust.",
      facts: ["Hypocrites mocked", "Tawakkul wins"],
      quote: q8(49),
      source: ik(49, "The hypocrites said the believers were deceived by their religion. But whoever trusts in Allah, Allah is All-Mighty, All-Wise.", "But whoever puts his trust in Allah, then surely, Allah is All-Mighty, All-Wise"),
      difficulty: 4,
      questions: [
        { q: "What did the hypocrites say, in 8:49?", a: "They are deceived by their religion", wrong: ["They are strong", "They are rich", "They are right"], why: "Gharra ha'ula'i dinuhum." },
        { q: "What does 8:49 promise those who trust Allah?", a: "Allah is Mighty, Wise for them", wrong: ["They will be alone", "They will lose", "Nothing"], why: "Wa man yatawakkal alallahi fa innallaha azizun hakim." },
        { q: "Those with sick hearts joined the hypocrites in 8:49.", tf: true, why: "Wal-ladhina fi qulubihim marad." }
      ]
    },
    {
      slug: "blessings-change",
      title: "Blessings change when we change",
      line: "Allah does not take a blessing until people change themselves.",
      facts: ["Linked to 13:11", "Fir'awn's people"],
      quote: q8(53),
      source: ik(53, "Allah is perfectly just: He does not take away a blessing He gave except because of evil the people did, as in 13:11. Fir'awn's people lost their gardens and treasures for their sins.", "He will not change a bounty that He has granted someone, except on account of an evil that they committed"),
      difficulty: 4,
      questions: [
        { q: "When does Allah change a blessing, in 8:53?", a: "When people change themselves", wrong: ["Every year", "At random", "Never"], why: "Hatta yughayyiru ma bi-anfusihim." },
        { q: "Which ayah does Ibn Kathir pair with 8:53?", a: "13:11", wrong: ["2:255", "112:1", "36:58"], why: "Allah will not change the condition of a people, 13:11." },
        { q: "Allah wronged Fir'awn's people, per Ibn Kathir.", tf: false, why: "Allah did not wrong them, but it is they who wronged themselves." }
      ]
    },
    {
      slug: "no-treachery",
      title: "No treachery, even with enemies",
      line: "Fear a breach? End the pact openly; Allah hates betrayal.",
      facts: ["Ala sawa': equal terms", "Keep treaties"],
      quote: q8(58),
      source: ik(58, "If a treaty partner may betray, end the treaty openly so both sides know. Allah does not like the treacherous, and this even includes treachery against disbelievers.", "This even includes treachery against the disbelievers"),
      difficulty: 4,
      questions: [
        { q: "How should a treaty be ended, in 8:58?", a: "Openly, on equal terms", wrong: ["In secret", "By surprise", "Never at all"], why: "Fambidh ilayhim ala sawa'." },
        { q: "Whom does Allah not love, in 8:58?", a: "The treacherous", wrong: ["The patient", "The poor", "The travelers"], why: "Innallaha la yuhibbul-kha'inin." },
        { q: "Per Ibn Kathir, treachery is wrong even with disbelievers.", tf: true, why: "This even includes treachery against the disbelievers." }
      ]
    },
    {
      slug: "spending-repaid",
      title: "What you spend is repaid",
      line: "Whatever you spend in Allah's cause is repaid to you in full.",
      facts: ["No injustice", "Seven hundred fold"],
      quote: q8(60),
      source: ik(60, "Whatever is spent in Allah's cause will be repaid in full, and Ibn Kathir recalls 2:261: a grain that grows seven ears with a hundred grains each.", "whatever you spend on Jihad will be repaid to you in full"),
      difficulty: 4,
      questions: [
        { q: "What happens to what is spent in Allah's cause, in 8:60?", a: "It is repaid in full", wrong: ["It is lost", "It is half repaid", "It is forgotten"], why: "Yuwaffa ilaykum wa antum la tuzlamun." },
        { q: "Which parable does Ibn Kathir add?", a: "A grain with seven ears", wrong: ["A tree with no fruit", "A spider's web", "A mirage"], why: "It grows seven ears, and each ear has a hundred grains." },
        { q: "Nobody spending for Allah is wronged, says 8:60.", tf: true, why: "Wa antum la tuzlamun." }
      ]
    },
    {
      slug: "incline-to-peace",
      title: "If they want peace, accept it",
      line: "If the enemy seeks peace, accept it and trust Allah.",
      facts: ["Hudaybiyah", "Tawakkul"],
      quote: q8(61),
      source: ik(61, "If the enemy seeks peace and a truce, accept it and trust in Allah. That is why the Prophet ﷺ accepted the Hudaybiyah truce from Quraysh.", "and accept offers of peace from them"),
      difficulty: 5,
      questions: [
        { q: "What should Muslims do if the enemy leans to peace, in 8:61?", a: "Lean to it too", wrong: ["Refuse it", "Ignore it", "Mock it"], why: "Wa in janahu lis-salmi fajnah laha." },
        { q: "Which truce does Ibn Kathir name?", a: "Hudaybiyah", wrong: ["Ta'if", "Tabuk", "Uhud"], why: "When the pagans inclined to peace in the year of Hudaybiyah." },
        { q: "What should go with making peace, in 8:61?", a: "Trust in Allah", wrong: ["Fear of people", "Doubt", "Pride"], why: "Wa tawakkal alallah." }
      ]
    },
    {
      slug: "hearts-united",
      title: "Hearts only Allah can unite",
      line: "All the wealth on earth could not unite their hearts; Allah did.",
      facts: ["Aws and Khazraj", "Brothers by grace"],
      quote: q8(63),
      source: ik(63, "Before Islam the Ansar tribes of Aws and Khazraj had many wars. All the world's wealth could not have joined them, but Allah united their hearts with the light of faith.", "Before Islam, there were many wars between the Ansar tribes of Aws and Khazraj"),
      difficulty: 5,
      questions: [
        { q: "Who united the believers' hearts, in 8:63?", a: "Allah", wrong: ["Money", "A treaty", "A king"], why: "Wa lakinnallaha allafa baynahum." },
        { q: "Which two tribes were enemies before Islam, per Ibn Kathir?", a: "Aws and Khazraj", wrong: ["Quraysh and Thaqif", "Hashim and Umayyah", "Ad and Thamud"], why: "Many wars between the Ansar tribes of Aws and Khazraj." },
        { q: "All the earth's wealth could have united them, says 8:63.", tf: false, why: "Law anfaqta ma fil-ardi jami'an ma allafta bayna qulubihim." }
      ]
    },
    {
      slug: "allah-is-enough",
      title: "Allah is enough for you",
      line: "Allah is enough for the Prophet ﷺ and his believers.",
      facts: ["Hasbuka Allah", "Few but steadfast"],
      quote: q8(64),
      source: ik(64, "Allah affirms He will suffice, aid, support and help the believers against their enemies, even when the enemy is many and the believers few.", "Allah affirms that He will suffice, aid, support, and help the believers"),
      difficulty: 5,
      questions: [
        { q: "Who is sufficient for the Prophet ﷺ, in 8:64?", a: "Allah", wrong: ["His army", "His tribe", "His wealth"], why: "Ya ayyuhan-nabiyyu hasbukallah." },
        { q: "Who else is Allah enough for, in 8:64?", a: "The believers who follow him", wrong: ["Only kings", "Only scholars", "No one else"], why: "Wa manit-taba'aka minal-mu'minin." },
        { q: "Allah helps the believers even when they are few, per Ibn Kathir.", tf: true, why: "Even if their enemies are numerous... while the believers are few." }
      ]
    },
    {
      slug: "muhajirin-and-ansar",
      title: "The Muhajirin and the Ansar",
      line: "Those who moved and those who sheltered them are allies.",
      facts: ["Brotherhood", "Help in religion"],
      quote: q8(72),
      source: ik(72, "The Muhajirin left homes and wealth for Allah, and the Ansar of Madinah sheltered them. They are allies of one another, which is why the Messenger ﷺ made them brothers.", "forged ties of brotherhood between the Muhajirin and Ansar"),
      difficulty: 5,
      questions: [
        { q: "Who gave shelter, in 8:72?", a: "The Ansar", wrong: ["Quraysh", "The Romans", "The Persians"], why: "Wal-ladhina awaw wa nasaru." },
        { q: "What did the Messenger ﷺ build between them, per Ibn Kathir?", a: "Ties of brotherhood", wrong: ["A wall", "A market", "A fort"], why: "Forged ties of brotherhood between the Muhajirin and Ansar." },
        { q: "What are they to one another, in 8:72?", a: "Allies", wrong: ["Strangers", "Rivals", "Servants"], why: "Ula'ika ba'duhum awliya'u ba'd." }
      ]
    },
    {
      slug: "no-inheritance-across-faiths",
      title: "Inheritance between faiths",
      line: "A Muslim does not inherit from a disbeliever, nor the reverse.",
      facts: ["Allies of each other", "Fitnah if mixed"],
      quote: q8(73),
      source: hadith("bukhari", "6764", "Usamah ibn Zayd", "Sahih", "The Prophet ﷺ said: a Muslim cannot be the heir of a disbeliever, nor can a disbeliever be the heir of a Muslim.", "A Muslim cannot be the heir of a disbeliever, nor can a disbeliever be the heir of a Muslim"),
      difficulty: 5,
      questions: [
        { q: "Can a Muslim inherit from a disbeliever, in Bukhari 6764?", a: "No", wrong: ["Yes, always", "Only land", "Only money"], why: "A Muslim cannot be the heir of a disbeliever." },
        { q: "What are the disbelievers to one another, in 8:73?", a: "Allies", wrong: ["Enemies only", "Strangers", "Servants"], why: "Wal-ladhina kafaru ba'duhum awliya'u ba'd." },
        { q: "What follows if believers do not support each other, in 8:73?", a: "Fitnah and great corruption", wrong: ["Peace", "Wealth", "Rain"], why: "Takun fitnatun fil-ardi wa fasadun kabir." }
      ]
    },
    {
      slug: "believers-in-truth-again",
      title: "The believers in truth, again",
      line: "Al-Anfal ends as it began: these are the believers in truth.",
      facts: ["Forgiveness", "Generous provision"],
      quote: q8(74),
      source: ik(74, "Allah repeats the faith of the believers as at the start of the surah and promises forgiveness and honorable provision: abundant, pure and everlasting, never ending or boring.", "provisions that never end or run out"),
      difficulty: 5,
      questions: [
        { q: "What are the Muhajirin and Ansar called, in 8:74?", a: "The believers in truth", wrong: ["The rich", "The rulers", "The poets"], why: "Ula'ika humul-mu'minuna haqqa." },
        { q: "What is their reward, in 8:74?", a: "Forgiveness and generous provision", wrong: ["Only fame", "Only land", "Nothing yet"], why: "Lahum maghfiratun wa rizqun karim." },
        { q: "Which ayah also called them believers in truth?", a: "8:4", wrong: ["8:30", "8:60", "8:41"], why: "Ula'ika humul-mu'minuna haqqa, in 8:4 and 8:74." }
      ]
    },
    {
      slug: "later-believers-and-kin",
      title: "Later believers and close kin",
      line: "Later believers are of you; relatives inherit first.",
      facts: ["Ulul-arham", "Allah knows all"],
      quote: q8(75),
      source: ik(74, "Those who follow the believers in faith and good deeds later will be with them in the Hereafter. Relatives by blood are nearest to one another in Allah's decree.", "those who follow the path of the believers in faith and performing good deeds, will be with them in the Hereafter"),
      difficulty: 5,
      questions: [
        { q: "What about those who believed later, in 8:75?", a: "They are of you", wrong: ["They are outsiders", "They are less", "They are rejected"], why: "Fa ula'ika minkum." },
        { q: "Who are nearest to one another, in 8:75?", a: "Relatives by blood", wrong: ["Neighbors", "Business partners", "Travelers"], why: "Wa ulul-arhami ba'duhum awla bi-ba'd." },
        { q: "How does Al-Anfal end, in 8:75?", a: "Allah knows everything", wrong: ["Allah is far", "Allah forgets", "Allah is silent"], why: "Innallaha bikulli shay'in alim." }
      ]
    }
  ]
};

export const ANFAL_UNITS: readonly DeepUnit[] = [ANFAL_ONE, ANFAL_TWO, ANFAL_THREE];
