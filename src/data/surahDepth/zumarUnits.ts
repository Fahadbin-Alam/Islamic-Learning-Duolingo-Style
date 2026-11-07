import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Az-Zumar ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Az-Zumar 39:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_39_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Az-Zumar 39:${ayah}`,
    url: `https://quran.com/39:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 39:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q39 = (ayah: number) => quranQuote(39, ayah);

/** Ayahs 1 to 9: the Book from Allah, sincere worship, signs of creation, and the grateful and ungrateful. */
const ZUMAR_ONE: DeepUnit = {
  key: "zumar1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-39",
  name: "Az-Zumar, ayahs 1 to 9",
  kind: "skill",
  lessonType: "surah",
  surahName: "Az-Zumar",
  lessons: [
    {
      slug: "from-the-almighty-the-all-wise",
      title: "From the Almighty, the All-Wise",
      line: "This Book is sent down from Allah, the Almighty, the All-Wise.",
      facts: ["The Quran is truth with no doubt", "All-Wise in all He says and decrees"],
      quote: q39(1),
      source: ik(1, "Ibn Kathir says the Quran is from Allah and is truth in which there is no doubt whatsoever.", "is truth in which there is no doubt whatsoever"),
      difficulty: 1,
      questions: [
        { q: "From whom is this Book sent down, in 39:1?", a: "Allah, the Almighty, the All-Wise", wrong: ["A poet", "A king", "The angels alone"], why: "The revelation of this Book is from Allah, the Almighty, the All-Wise." },
        { q: "What does Ibn Kathir say of the Quran?", a: "Truth with no doubt at all", wrong: ["Old stories", "Poetry", "A guess"], why: "The magnificent Quran, is from Him, and is truth in which there is no doubt whatsoever." },
        { q: "In what is Allah All-Wise, per Ibn Kathir?", a: "All He says, does and decrees", wrong: ["Only in rain", "Only in war", "Only in trade"], why: "The All-Wise, meaning, in all that He says, does, legislates and decrees." }
      ]
    },
    {
      slug: "worship-allah-sincerely",
      title: "Worship Allah sincerely",
      line: "The Book came in truth, so worship Allah sincerely for Him.",
      facts: ["Worship Allah alone", "Call people to the same"],
      quote: q39(2),
      source: ik(2, "Ibn Kathir says this means worship Allah alone with no partner, and call mankind to that.", "so worship Allah Alone with no partner or associate"),
      difficulty: 1,
      questions: [
        { q: "How should we worship Allah, in 39:2?", a: "Sincerely for Him only", wrong: ["To show off", "Now and then", "For praise"], why: "So, worship Allah by doing religious deeds sincerely for Him only." },
        { q: "What else did the Prophet ﷺ do, per Ibn Kathir?", a: "Called mankind to that", wrong: ["Kept it secret", "Wrote poems", "Built idols"], why: "So worship Allah Alone with no partner or associate, and call mankind to that." },
        { tf: true, q: "Allah has no partner, equal or rival.", why: "Teach them that it is not right to worship anyone or anything except Him Alone, and He has no partner, equal or rival." }
      ]
    },
    {
      slug: "the-religion-is-for-allah",
      title: "The religion is for Allah",
      line: "The pure religion belongs to Allah alone.",
      facts: ["Allah accepts only sincere deeds", "No partner shared in a deed"],
      quote: q39(3),
      source: ik(3, "Ibn Kathir says Allah will not accept any deed unless it is done purely and sincerely for Him alone.", "He will not accept any deed unless it is done purely and sincerely for Him Alone"),
      difficulty: 2,
      questions: [
        { q: "For whom is the religion, in 39:3?", a: "For Allah only", wrong: ["For kings", "For tribes", "For idols"], why: "Surely, the religion is for Allah only." },
        { q: "Which deeds does Allah accept, per Ibn Kathir?", a: "Those done sincerely for Him", wrong: ["Any deed at all", "Only big deeds", "Only seen deeds"], why: "He will not accept any deed unless it is done purely and sincerely for Him Alone." },
        { tf: false, q: "A deed done to show off is accepted by Allah.", why: "He will not accept any deed unless it is done purely and sincerely for Him Alone, with no partner or associate." }
      ]
    },
    {
      slug: "to-bring-us-near",
      title: "To bring us near",
      line: "Idol worshippers said their idols bring them near to Allah.",
      facts: ["An old excuse for shirk", "Allah never permitted it"],
      quote: q39(3),
      source: ik(3, "The idolaters said their idols would intercede and bring them closer to Allah; Allah never gave permission for this.", "So that they may intercede for us and bring us closer to Him"),
      difficulty: 2,
      questions: [
        { q: "Why did they worship idols, in 39:3?", a: "To bring them near to Allah", wrong: ["For fun", "For trade", "For music"], why: "We worship them only that they may bring us near to Allah." },
        { q: "What did they hope the idols would do?", a: "Intercede for them", wrong: ["Write books", "Grow crops", "Fight wars"], why: "So that they may intercede for us and bring us closer to Him." },
        { q: "Did Allah permit this, per Ibn Kathir?", a: "No, He hates and forbids it", wrong: ["Yes, always", "Only in Hajj", "Only for kings"], why: "Allah did not give them permission for it, nor does He approve of it; indeed, He hates it and forbids it." }
      ]
    },
    {
      slug: "every-messenger-said-it",
      title: "Every Messenger said it",
      line: "Every Messenger called people to worship Allah alone.",
      facts: ["Worship Allah, avoid Taghut", "The same message in every nation"],
      quote: q39(3),
      source: ik(3, "Ibn Kathir says the Messengers came to refute this and call people to worship Allah alone, citing 16:36 and 21:25.", "came to refute and forbid, and to call people to worship Allah Alone with no partner or associate"),
      difficulty: 2,
      questions: [
        { q: "What did the Messengers call to, per Ibn Kathir?", a: "Worshipping Allah alone", wrong: ["Many gods", "Their own rule", "Wealth"], why: "To call people to worship Allah Alone with no partner or associate." },
        { q: "Which ayah says a Messenger came to every Ummah?", a: "16:36", wrong: ["2:255", "112:1", "1:5"], why: "And verily, We have sent among every Ummah a Messenger: Worship Allah, and avoid Taghut (16:36)." },
        { tf: true, q: "Angels intercede only by Allah's leave.", why: "They do not intercede with Him except by His leave for the one with whom He is pleased." }
      ]
    },
    {
      slug: "allah-will-judge-between-them",
      title: "Allah will judge between them",
      line: "Allah will judge between people in what they differed.",
      facts: ["On the Day of Resurrection", "Each rewarded by his deeds"],
      quote: q39(3),
      source: ik(3, "Ibn Kathir says Allah will judge His creation on the Day of Resurrection, rewarding or punishing each by his deeds.", "will reward or punish each person according to his deeds"),
      difficulty: 2,
      questions: [
        { q: "When will Allah judge between them?", a: "On the Day of Resurrection", wrong: ["Tomorrow", "Never", "In one year"], why: "Verily, Allah will judge between them means, on the Day of Resurrection." },
        { q: "How is each person repaid, per Ibn Kathir?", a: "According to his deeds", wrong: ["By his wealth", "By his tribe", "By chance"], why: "Will reward or punish each person according to his deeds." },
        { q: "Whom does Allah not guide, in 39:3?", a: "A liar and disbeliever", wrong: ["The poor", "The young", "Travellers"], why: "Truly, Allah guides not him who is a liar, and a disbeliever." }
      ]
    },
    {
      slug: "glory-be-to-him",
      title: "Glory be to Him",
      line: "Allah has no son; He is the One, the Irresistible.",
      facts: ["The One, the Self-Sufficient", "Everything is in need of Him"],
      quote: q39(4),
      source: ik(4, "Ibn Kathir says Allah is far above having offspring; He is the One, the Only, the Self-Sufficient Master.", "He is the One, the Only, the Unique, the Self-Sufficient Master"),
      difficulty: 2,
      questions: [
        { q: "Which two Names end 39:4?", a: "The One, the Irresistible", wrong: ["The Kind, the Gentle", "The Seer, the Hearer", "The First, the Last"], why: "But glory be to Him! He is Allah, the One, the Irresistible." },
        { q: "What does Ibn Kathir call Allah?", a: "The Self-Sufficient Master", wrong: ["One among many", "A father", "A son"], why: "He is the One, the Only, the Unique, the Self-Sufficient Master to Whom everything is enslaved and is in need of." },
        { tf: true, q: "Everything is in need of Allah.", why: "The Self-Sufficient Master to Whom everything is enslaved and is in need of." }
      ]
    },
    {
      slug: "night-wraps-the-day",
      title: "Night wraps the day",
      line: "Allah makes night go into day, and day go into night.",
      facts: ["They follow each other", "They never stop"],
      quote: q39(5),
      source: ik(5, "Ibn Kathir says Allah causes the night and day to alternate without ceasing, each seeking the other rapidly.", "He causes them to alternate without ceasing"),
      difficulty: 1,
      questions: [
        { q: "What does Allah make go into the day, in 39:5?", a: "The night", wrong: ["The sea", "The wind", "The stars"], why: "He makes the night to go in the day and makes the day to go in the night." },
        { q: "How do night and day move, per Ibn Kathir?", a: "They alternate without ceasing", wrong: ["They stop at times", "Only in summer", "Randomly"], why: "He has subjugated them and He causes them to alternate without ceasing, each seeking the other rapidly." },
        { tf: true, q: "Allah created the heavens and the earth with truth.", why: "He has created the heavens and the earth with truth." }
      ]
    },
    {
      slug: "an-appointed-term",
      title: "An appointed term",
      line: "The sun and moon each run for an appointed term.",
      facts: ["A time known to Allah", "Ending on the Last Day"],
      quote: q39(5),
      source: ik(5, "Ibn Kathir says the sun and moon run for a time known to Allah, which will end on the Day of Resurrection.", "then it will come to an end on the Day of Resurrection"),
      difficulty: 2,
      questions: [
        { q: "What has Allah subjected, in 39:5?", a: "The sun and the moon", wrong: ["Only the clouds", "Only the sea", "Only the mountains"], why: "And He has subjected the sun and the moon. Each running for an appointed term." },
        { q: "When does their term end, per Ibn Kathir?", a: "On the Day of Resurrection", wrong: ["Never", "In spring", "Every night"], why: "For a period of time that is known to Allah, then it will come to an end on the Day of Resurrection." },
        { q: "Which Names end 39:5?", a: "The Almighty, the Oft-Forgiving", wrong: ["The Rich, the Praised", "The Living, the Eternal", "The Kind, the Wise"], why: "Verily, He is the Almighty, the Oft-Forgiving." }
      ]
    },
    {
      slug: "mighty-yet-forgiving",
      title: "Mighty yet forgiving",
      line: "With all His might, Allah forgives those who turn back to Him.",
      facts: ["Might and forgiveness together", "Repentance opens the door"],
      quote: q39(5),
      source: ik(5, "Ibn Kathir says beside His might and greatness, Allah is Oft-Forgiving to those who turn to Him in repentance.", "He is Oft-Forgiving to those who disobey Him but then turn to Him in repentance"),
      difficulty: 2,
      questions: [
        { q: "To whom is Allah Oft-Forgiving, per Ibn Kathir?", a: "Those who repent to Him", wrong: ["No one", "Only angels", "Only Prophets"], why: "He is Oft-Forgiving to those who disobey Him but then turn to Him in repentance." },
        { q: "What comes beside His forgiveness, per Ibn Kathir?", a: "His might and greatness", wrong: ["His sleep", "His need", "His tiredness"], why: "Beside His might, greatness and pride, He is Oft-Forgiving." },
        { tf: true, q: "A sinner who repents can still be forgiven.", why: "He is Oft-Forgiving to those who disobey Him but then turn to Him in repentance." }
      ]
    },
    {
      slug: "from-a-single-person",
      title: "From a single person",
      line: "Allah made all people from one soul, then made his wife.",
      facts: ["The one soul was Adam", "His wife was Hawwa"],
      quote: q39(6),
      source: ik(6, "Ibn Kathir says all races, languages and colours come from a single soul, Adam, and his wife was Hawwa.", "from a single soul, who was Adam, peace be upon him"),
      difficulty: 1,
      questions: [
        { q: "Who was the single person, per Ibn Kathir?", a: "Adam", wrong: ["Nuh", "Ibrahim", "Musa"], why: "From a single soul, who was Adam, peace be upon him." },
        { q: "Who was his wife, per Ibn Kathir?", a: "Hawwa", wrong: ["Maryam", "Asiyah", "Sarah"], why: "Then made from him his wife, who was Hawwa, peace be upon her." },
        { tf: true, q: "All races and colours come from one soul.", why: "He created you, with all your varied races, types, languages and colors, from a single soul." }
      ]
    },
    {
      slug: "eight-pairs-of-cattle",
      title: "Eight pairs of cattle",
      line: "Allah sent down eight pairs of cattle for us.",
      facts: ["Sheep, goats, camels, oxen", "A male and female of each"],
      quote: q39(6),
      source: ik(6, "Ibn Kathir says the eight are a pair each of sheep, goats, camels and oxen, as in Surah Al-Anam.", "a pair of sheep, a pair of goats, a pair of camels and a pair of oxen"),
      difficulty: 2,
      questions: [
        { q: "How many pairs of cattle, in 39:6?", a: "Eight", wrong: ["Two", "Four", "Ten"], why: "And He has sent down for you of An'am eight pairs." },
        { q: "Which animals are they, per Ibn Kathir?", a: "Sheep, goats, camels, oxen", wrong: ["Lions and tigers", "Horses only", "Birds and fish"], why: "A pair of sheep, a pair of goats, a pair of camels and a pair of oxen." },
        { q: "Where else are they named, per Ibn Kathir?", a: "Surat Al-Anam", wrong: ["Surat Al-Fil", "Surat An-Nas", "Surat Al-Kawthar"], why: "These are the ones that are mentioned in Surat Al-An'am." }
      ]
    },
    {
      slug: "three-veils-of-darkness",
      title: "Three veils of darkness",
      line: "Allah forms us in the womb, stage by stage, in three darknesses.",
      facts: ["Womb, placenta and belly", "Stage after stage"],
      quote: q39(6),
      source: ik(6, "Ibn Kathir says the three darknesses are the womb, the placenta that protects the child, and the belly.", "in the darkness of the womb, the darkness of the placenta"),
      difficulty: 2,
      questions: [
        { q: "Where does Allah form us, in 39:6?", a: "In our mothers' wombs", wrong: ["In the sea", "In the sky", "In a cave"], why: "He creates you in the wombs of your mothers, creation after creation in three veils of darkness." },
        { q: "What are the three darknesses, per Ibn Kathir?", a: "Womb, placenta and belly", wrong: ["Night, cloud, sea", "Cave, tent, house", "Ice, rock, sand"], why: "In the darkness of the womb, the darkness of the placenta which blankets and protects the child, and the darkness of the belly." },
        { tf: true, q: "A baby is formed stage after stage.", why: "Everyone of you is originally a Nutfah, then he becomes an Alaqah, then he becomes a Mudghah." }
      ]
    },
    {
      slug: "such-is-allah-your-lord",
      title: "Such is Allah your Lord",
      line: "This is Allah your Lord; none is worthy of worship but Him.",
      facts: ["He owns the kingdom", "So why turn away?"],
      quote: q39(6),
      source: ik(6, "Ibn Kathir says the One Who created everything is the Lord, so no one else should be worshipped except Him.", "no one else should be worshipped except Him alone"),
      difficulty: 2,
      questions: [
        { q: "Whose is the kingdom, in 39:6?", a: "Allah's", wrong: ["The kings'", "The idols'", "No one's"], why: "Such is Allah your Lord. His is the kingdom." },
        { q: "What does La ilaha illa Huwa mean, per Ibn Kathir?", a: "None is worshipped but Him", wrong: ["He is far", "He is one of many", "He sleeps"], why: "No one else should be worshipped except Him alone with no partner or associate." },
        { q: "What does Ibn Kathir ask the turned away?", a: "What happened to your minds?", wrong: ["Where is your gold?", "Who is your king?", "When will you travel?"], why: "How can you worship anything besides Him? What has happened to your minds?" }
      ]
    },
    {
      slug: "allah-is-not-in-need",
      title: "Allah is not in need",
      line: "If you disbelieve, Allah is not in need of you.",
      facts: ["Disbelief harms only us", "Allah dislikes it for His servants"],
      quote: q39(7),
      source: ik(7, "Ibn Kathir says Allah is independent and has no need of anything, and He does not like disbelief nor enjoin it.", "He does not like it and He does not enjoin it"),
      difficulty: 2,
      questions: [
        { q: "What does Allah not like for His servants, in 39:7?", a: "Disbelief", wrong: ["Rest", "Food", "Travel"], why: "He likes not disbelief for His servants." },
        { q: "Does Allah need anything, per Ibn Kathir?", a: "No, He is Independent", wrong: ["Yes, our praise", "Yes, our wealth", "Only on Fridays"], why: "Allah tells us that He is Independent and has no need of anything in creation." },
        { tf: true, q: "Allah does not enjoin disbelief.", why: "He likes not disbelief for His servants means, He does not like it and He does not enjoin it." }
      ]
    },
    {
      slug: "his-dominion-never-shrinks",
      title: "His dominion never shrinks",
      line: "Even if all were wicked, Allah's dominion would not shrink.",
      facts: ["A hadith qudsi", "Allah forgives all who ask"],
      quote: q39(7),
      source: hadith("muslim", "2577", "Abu Dharr", "Sahih", "Allah said that if all of mankind and jinn were as wicked as the most wicked heart, it would not decrease His dominion at all.", "that would not decrease My dominion in anything"),
      difficulty: 3,
      questions: [
        { q: "What would not shrink, in the hadith?", a: "Allah's dominion", wrong: ["The sea", "The night", "The mountains"], why: "To be as wicked as the most wicked heart of any one man of you, that would not decrease My dominion in anything." },
        { q: "What does Allah forgive, in the hadith?", a: "All sins, for whoever asks", wrong: ["Small sins only", "Nothing", "Only old sins"], why: "You sin by night and by day, and I forgive all sins, so seek forgiveness of Me and I shall forgive you." },
        { q: "Who narrated the hadith?", a: "Abu Dharr", wrong: ["Abu Jahl", "Abu Lahab", "Abu Sufyan"], why: "Abu Dharr reported Allah's Messenger ﷺ as saying that Allah, the Exalted and Glorious, said." }
      ]
    },
    {
      slug: "gratitude-pleases-him",
      title: "Gratitude pleases Him",
      line: "If you are grateful, Allah is pleased with you.",
      facts: ["Gratitude brings more blessing", "Allah loves it for us"],
      quote: q39(7),
      source: ik(7, "Ibn Kathir says Allah likes gratitude for us and will increase His favour upon us.", "He likes this for you and He will increase His favor upon you"),
      difficulty: 1,
      questions: [
        { q: "What pleases Allah, in 39:7?", a: "Being grateful", wrong: ["Being proud", "Being lazy", "Being greedy"], why: "And if you are grateful, He is pleased therewith for you." },
        { q: "What does gratitude bring, per Ibn Kathir?", a: "More of His favour", wrong: ["Less blessing", "Nothing", "Sadness"], why: "He likes this for you and He will increase His favor upon you." },
        { tf: true, q: "Saying thank you to Allah brings more blessing.", why: "He likes this for you and He will increase His favor upon you." }
      ]
    },
    {
      slug: "no-one-carries-anothers-load",
      title: "No one carries another's load",
      line: "No soul carries another's burden; all return to Allah.",
      facts: ["Each asked about himself", "He knows what is in hearts"],
      quote: q39(7),
      source: ik(7, "Ibn Kathir says no person can bear anything for another; each will be asked about his own affairs.", "no person can bear anything for another"),
      difficulty: 2,
      questions: [
        { q: "Who bears the burden of another, in 39:7?", a: "No bearer of burdens", wrong: ["A parent", "A friend", "A king"], why: "No bearer of burdens shall bear the burden of another." },
        { q: "What will each be asked about, per Ibn Kathir?", a: "His own affairs", wrong: ["His neighbour", "His tribe", "Nothing"], why: "No person can bear anything for another; each person will be asked about his own affairs." },
        { q: "What does Allah know fully, in 39:7?", a: "What is in the breasts", wrong: ["Only deeds", "Only words", "Only the past"], why: "Verily, He is the All-Knower of that which is in breasts." }
      ]
    },
    {
      slug: "calling-in-hard-times",
      title: "Calling in hard times",
      line: "In trouble, people call on Allah, then forget Him in ease.",
      facts: ["Sincere in need", "Forgetful in comfort"],
      quote: q39(8),
      source: ik(8, "Ibn Kathir says at times of need man prays to Allah alone, but in ease he forgets that supplication.", "at the time of ease, he forgets that supplication and prayer"),
      difficulty: 2,
      questions: [
        { q: "What does man do when hurt touches him, in 39:8?", a: "Cries to his Lord", wrong: ["Laughs", "Sleeps", "Travels"], why: "And when some hurt touches man, he cries to his Lord, turning to Him in repentance." },
        { q: "What happens in ease, per Ibn Kathir?", a: "He forgets his prayer", wrong: ["He prays more", "He fasts", "He gives charity"], why: "At the time of ease, he forgets that supplication and prayer." },
        { q: "Which ayah is similar, per Ibn Kathir?", a: "10:12", wrong: ["1:1", "112:4", "114:6"], why: "But when We have removed his harm from him, he passes on as if he had never invoked Us for a harm that touched him! (10:12)." }
      ]
    },
    {
      slug: "enjoy-for-a-while",
      title: "Enjoy for a while",
      line: "Those who set up rivals are warned: enjoy for a little while.",
      facts: ["A stern warning", "This life is short"],
      quote: q39(8),
      source: ik(8, "Ibn Kathir says this is a stern threat and solemn warning to those who set up rivals to Allah in times of ease.", "This is a stern threat and solemn warning"),
      difficulty: 3,
      questions: [
        { q: "What do they set up, in 39:8?", a: "Rivals to Allah", wrong: ["Schools", "Wells", "Gardens"], why: "And he sets up rivals to Allah, in order to mislead others from His path." },
        { q: "What kind of words are these, per Ibn Kathir?", a: "A stern threat and warning", wrong: ["Praise", "A promise of reward", "A joke"], why: "This is a stern threat and solemn warning." },
        { tf: false, q: "Take pleasure for a while is a reward for them.", why: "This is a stern threat and solemn warning." }
      ]
    },
    {
      slug: "standing-at-night",
      title: "Standing at night",
      line: "Some stand and bow to Allah in the hours of the night.",
      facts: ["Humble in prostration", "Obedient to Allah and His Messenger"],
      quote: q39(9),
      source: ik(9, "Ibn Kathir says this is one who is humble and fears Allah as he prostrates and stands, in the depths of the night.", "one who is humble and fears Allah when he prostrates and stands"),
      difficulty: 2,
      questions: [
        { q: "When does the obedient one pray, in 39:9?", a: "In the hours of the night", wrong: ["Only at noon", "Never", "Only in Ramadan"], why: "Is one who is obedient to Allah, Ana'a Al-Layl prostrating and standing." },
        { q: "What does Ana'a Al-Layl mean, per Ibn Kathir?", a: "In the depths of the night", wrong: ["At sunrise", "At noon", "At sunset"], why: "Ana'a Al-Layl means in the depths of the night." },
        { q: "Who is the obedient one, per Ibn Masud?", a: "One who obeys Allah and His Messenger", wrong: ["One who is rich", "One who is famous", "One who is strong"], why: "The obedient one is one who obeys Allah and His Messenger." }
      ]
    },
    {
      slug: "best-deed-best-time",
      title: "Best deed, best time",
      line: "Prayer is the best worship; night is its best time.",
      facts: ["As-Sa'di explains", "Qiyam al-Layl"],
      quote: q39(9),
      source: saadi(39, 9, "As-Sa'di says 39:9 praises one who obeys Allah with the best worship, prayer, at the best time, the night, while fearing the Hereafter and hoping for Allah's mercy, inside and out.", "مطيع للّه بأفضل العبادات وهي الصلاة، وأفضل الأوقات وهو أوقات الليل"),
      difficulty: 2,
      questions: [
        { q: "What is the best worship, per as-Sa'di on 39:9?", a: "Prayer", wrong: ["Travel", "Trade", "Sleep"], why: "The best worship is prayer, says as-Sa'di." },
        { q: "What is the best time for it, per as-Sa'di?", a: "The night", wrong: ["Noon", "Market hours", "Any busy time"], why: "The best times are the hours of the night." },
        { tf: true, q: "The one praised in Az-Zumar 39:9 fears the Hereafter and hopes for mercy.", why: "As-Sa'di on 39:9." }
      ]
    },
    {
      slug: "fear-and-hope",
      title: "Fear and hope",
      line: "The believer fears the Hereafter and hopes for Allah's mercy.",
      facts: ["Both are needed in worship", "Hope grows at the time of death"],
      quote: q39(9),
      source: ik(9, "Ibn Kathir says in worship the believer feels both fear and hope; both are essential, and at death hope is uppermost.", "in his worship he feels both fear and hope"),
      difficulty: 3,
      questions: [
        { q: "What does the believer hope for, in 39:9?", a: "The mercy of his Lord", wrong: ["Fame", "Gold", "A long life"], why: "Fearing the Hereafter and hoping for the mercy of his Lord." },
        { q: "What two feelings are in worship, per Ibn Kathir?", a: "Fear and hope", wrong: ["Pride and anger", "Boredom and rush", "Doubt and worry"], why: "In his worship he feels both fear and hope. Both are essential in worship." },
        { q: "What is uppermost at death, per Ibn Kathir?", a: "Hope", wrong: ["Fear", "Anger", "Sadness"], why: "At the time of death, hope is uppermost." }
      ]
    },
    {
      slug: "those-who-know",
      title: "Those who know",
      line: "Are those who know equal to those who do not know?",
      facts: ["Knowledge raises a person", "Only the wise take heed"],
      quote: q39(9),
      source: ik(9, "Ibn Kathir says only one who has understanding will see the difference between the obedient and the one who sets up rivals.", "the only one who will understand the difference between them is the one who has understanding"),
      difficulty: 2,
      questions: [
        { q: "What does 39:9 ask?", a: "Are those who know equal to those who know not?", wrong: ["Who is the strongest?", "Who is the richest?", "Who came first?"], why: "Say: Are those who know equal to those who know not?" },
        { q: "Who will remember, in 39:9?", a: "Men of understanding", wrong: ["The proud", "The careless", "The rich"], why: "It is only men of understanding who will remember." },
        { tf: false, q: "The obedient and the one who sets up rivals are equal.", why: "They are not equal before Allah." }
      ]
    }
  ]
};

/** Ayahs 10 to 31: patience rewarded, sincere worship, the best speech, and the parable of one master. */
const ZUMAR_TWO: DeepUnit = {
  key: "zumar2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-39",
  name: "Az-Zumar, ayahs 10 to 31",
  kind: "skill",
  lessonType: "surah",
  surahName: "Az-Zumar",
  lessons: [
    {
      slug: "good-for-those-who-do-good",
      title: "Good for those who do good",
      line: "Have Taqwa; those who do good get good in this world.",
      facts: ["Good now and in the Hereafter", "Stay steadfast in obedience"],
      quote: q39(10),
      source: ik(10, "Ibn Kathir says Allah commands the believers to stay steadfast, and whoever does good deeds gets good in this world and the next.", "the one who does good deeds in this world"),
      difficulty: 1,
      questions: [
        { q: "Whom does Allah address, in 39:10?", a: "My servants who believe", wrong: ["The angels", "The jinn only", "The animals"], why: "Say: O My servants who believe, have Taqwa of your Lord." },
        { q: "What do those who do good get, in 39:10?", a: "Good", wrong: ["Nothing", "Harm", "Sadness"], why: "Good is for those who do good in this world." },
        { q: "Where is their good, per Ibn Kathir?", a: "In this world and the Hereafter", wrong: ["Only in this world", "Only on Fridays", "Nowhere"], why: "The one who does good deeds in this world, will have a good reward in this world and in the Hereafter." }
      ]
    },
    {
      slug: "allahs-earth-is-spacious",
      title: "Allah's earth is spacious",
      line: "Allah's earth is wide, so move to where you can worship Him.",
      facts: ["Mujahid: emigrate through it", "Keep away from idols"],
      quote: q39(10),
      source: ik(10, "Mujahid said this means emigrate through the earth, strive hard and keep away from idols.", "So emigrate through it and strive hard and keep away from idols"),
      difficulty: 2,
      questions: [
        { q: "What is Allah's earth, in 39:10?", a: "Spacious", wrong: ["Small", "Closed", "Empty"], why: "And Allah's earth is spacious!" },
        { q: "What did Mujahid say it means?", a: "Emigrate and keep from idols", wrong: ["Stay with idols", "Never travel", "Buy land"], why: "So emigrate through it and strive hard and keep away from idols." },
        { tf: true, q: "A believer can move to protect his faith.", why: "So emigrate through it and strive hard and keep away from idols." }
      ]
    },
    {
      slug: "patience-without-measure",
      title: "Patience without measure",
      line: "The patient get their reward in full, without counting.",
      facts: ["Not weighed or measured", "An immense reward in Paradise"],
      quote: q39(10),
      source: ik(10, "Al-Awzai said their reward will not be weighed or measured; they will be given an immense reward.", "Their reward will not be weighed or measured"),
      difficulty: 2,
      questions: [
        { q: "Who get reward without reckoning, in 39:10?", a: "The patient", wrong: ["The proud", "The rich", "The fast"], why: "Only those who are patient shall receive their reward in full, without reckoning." },
        { q: "What did Al-Awzai say of their reward?", a: "Not weighed or measured", wrong: ["Very small", "Paid in coins", "Delayed forever"], why: "Their reward will not be weighed or measured; they will be given an immense reward." },
        { q: "Where is the reward, per As-Suddi?", a: "In Paradise", wrong: ["In the market", "In the palace", "In the desert"], why: "As-Suddi said: In Paradise." }
      ]
    },
    {
      slug: "the-first-of-the-muslims",
      title: "The first of the Muslims",
      line: "The Prophet ﷺ was told to worship Allah with sincere religion.",
      facts: ["Worship Allah alone", "Lead by example"],
      quote: q39(11),
      source: ik(11, "Ibn Kathir says the Prophet ﷺ was commanded to worship Allah alone in all sincerity, with no partner.", "I am commanded to worship Allah alone in all sincerity"),
      difficulty: 2,
      questions: [
        { q: "What was he commanded, in 39:11?", a: "To worship Allah sincerely", wrong: ["To build a palace", "To gather wealth", "To write poems"], why: "Say: Verily, I am commanded to worship Allah, making religion sincerely for Him." },
        { q: "Who was commanded, in 39:11?", a: "The Prophet ﷺ", wrong: ["Only the angels", "Only the jinn", "No one"], why: "Say: Verily, I am commanded to worship Allah, making religion sincerely for Him." },
        { tf: true, q: "Sincere worship means no partner with Allah.", why: "I am commanded to worship Allah alone in all sincerity, with no partner or associate." }
      ]
    },
    {
      slug: "first-to-submit",
      title: "First to submit",
      line: "He was commanded to be the first of the Muslims.",
      facts: ["He led by example", "He obeyed before calling others"],
      quote: q39(12),
      source: ik(12, "Ibn Kathir says the Prophet ﷺ was commanded to worship Allah alone, and to be the first of the Muslims.", "I am commanded to worship Allah alone in all sincerity, with no partner or associate"),
      difficulty: 2,
      questions: [
        { q: "What should he be, in 39:12?", a: "The first of the Muslims", wrong: ["The last to obey", "A king", "A merchant"], why: "And I am commanded this in order that I may be the first of the Muslims." },
        { q: "With what did he worship, per Ibn Kathir?", a: "All sincerity, no partner", wrong: ["Show and pride", "Many partners", "Doubt"], why: "I am commanded to worship Allah alone in all sincerity, with no partner or associate." },
        { tf: true, q: "A caller to Islam should practise it first.", why: "And I am commanded this in order that I may be the first of the Muslims." }
      ]
    },
    {
      slug: "fear-of-a-great-day",
      title: "Fear of a great Day",
      line: "Even the Prophet ﷺ says he fears that great Day.",
      facts: ["The Day of Resurrection", "A lesson for everyone else"],
      quote: q39(13),
      source: ik(13, "Ibn Kathir says if this applies to the Prophet ﷺ, it applies even more so to others.", "it applies even more so to others"),
      difficulty: 2,
      questions: [
        { q: "What is the great Day, per Ibn Kathir?", a: "The Day of Resurrection", wrong: ["A feast day", "A market day", "A wedding day"], why: "I am afraid of the torment of a great Day, meaning the Day of Resurrection." },
        { q: "Who else does the lesson apply to, per Ibn Kathir?", a: "Everyone else, even more", wrong: ["No one", "Only kings", "Only angels"], why: "If what is referred to applies to the Prophet ﷺ it applies even more so to others." },
        { tf: true, q: "Fearing Allah keeps a person from disobeying.", why: "Say: Verily, if I disobey my Lord, I am afraid of the torment of a great Day." }
      ]
    },
    {
      slug: "allah-alone-i-worship",
      title: "Allah alone I worship",
      line: "Say: Allah alone I worship, sincere in my religion for Him.",
      facts: ["A clear stand", "A disowning of shirk"],
      quote: q39(14),
      source: ik(14, "Ibn Kathir says the words worship what you like besides Him are a threat and a disowning of them.", "This is also a threat, and a disowning of them"),
      difficulty: 2,
      questions: [
        { q: "Whom alone does he worship, in 39:14?", a: "Allah", wrong: ["Idols", "Stars", "Kings"], why: "Say: Allah Alone I worship by doing religious deeds sincerely for His sake only." },
        { q: "What are the words worship what you like, per Ibn Kathir?", a: "A threat and a disowning", wrong: ["Permission", "Praise", "A joke"], why: "So, worship what you like besides Him. This is also a threat, and a disowning of them." },
        { tf: false, q: "Worship what you like is permission to worship idols.", why: "This is also a threat, and a disowning of them." }
      ]
    },
    {
      slug: "the-real-losers",
      title: "The real losers",
      line: "The real losers lose themselves and their families on that Day.",
      facts: ["The clearest loss", "Not a loss of money"],
      quote: q39(15),
      source: ik(15, "Ibn Kathir says these are the greatest losers of all, and this is the clearest and most obvious loss.", "this is the clearest and most obvious loss"),
      difficulty: 3,
      questions: [
        { q: "Whom do the losers lose, in 39:15?", a: "Themselves and their families", wrong: ["Their coins", "Their camels", "Their houses"], why: "The losers are those who will lose themselves and their families on the Day of Resurrection." },
        { q: "How does Ibn Kathir describe the loss?", a: "The clearest, most obvious loss", wrong: ["A small loss", "A loss of money", "No loss"], why: "Verily, that will be a manifest loss! means, this is the clearest and most obvious loss." },
        { q: "Who are they, per Ibn Kathir?", a: "The greatest losers of all", wrong: ["The poorest traders", "The weakest soldiers", "The slowest runners"], why: "Say: The losers... means, the greatest losers of all." }
      ]
    },
    {
      slug: "a-warning-out-of-mercy",
      title: "A warning out of mercy",
      line: "Allah warns His servants so they keep away from sin.",
      facts: ["O My servants, have Taqwa", "The warning is a kindness"],
      quote: q39(16),
      source: ik(16, "Ibn Kathir says Allah tells of this to frighten His servants so that they keep away from unlawful things and sin.", "to frighten His servants, so that they will keep away from unlawful things and from sin"),
      difficulty: 2,
      questions: [
        { q: "Why does Allah warn, per Ibn Kathir?", a: "So they keep away from sin", wrong: ["To make them sad", "To scare for no reason", "To end hope"], why: "To frighten His servants, so that they will keep away from unlawful things and from sin." },
        { q: "What does Allah call out, in 39:16?", a: "O My servants, have Taqwa of Me", wrong: ["O kings, rest", "O people, sleep", "O angels, leave"], why: "O My servants, therefore have Taqwa of Me!" },
        { tf: true, q: "Allah still calls the warned ones My servants.", why: "With this Allah frightens His servants: O My servants, therefore have Taqwa of Me!" }
      ]
    },
    {
      slug: "glad-tidings",
      title: "Glad tidings",
      line: "Those who avoid false gods and turn to Allah get good news.",
      facts: ["Good news in both lives", "For everyone who leaves idols"],
      quote: q39(17),
      source: ik(17, "Ibn Kathir says this includes all who avoided idols and turned to the worship of Ar-Rahman; theirs is good news in both lives.", "all others who avoided worshipping idols and turned to the worship of Ar-Rahman"),
      difficulty: 2,
      questions: [
        { q: "What do they avoid, in 39:17?", a: "At-Taghut", wrong: ["Prayer", "Charity", "Fasting"], why: "Those who avoid At-Taghut by not worshipping them and turn to Allah, for them are glad tidings." },
        { q: "Who were named as examples, per Ibn Kathir?", a: "Zayd ibn Amr, Abu Dharr, Salman", wrong: ["Abu Jahl and Abu Lahab", "Fir'awn and Haman", "Qarun and Haman"], why: "Was revealed concerning Zayd bin Amr bin Nufayl and Abu Dharr and Salman Al-Farisi." },
        { q: "Who else is included, per Ibn Kathir?", a: "All who left idols for Ar-Rahman", wrong: ["No one else", "Only Arabs", "Only men"], why: "The correct view is that it includes them and all others who avoided worshipping idols and turned to the worship of Ar-Rahman." }
      ]
    },
    {
      slug: "follow-the-best-of-it",
      title: "Follow the best of it",
      line: "They listen to the Word and follow the best of it.",
      facts: ["Understand and act", "Guided and wise"],
      quote: q39(18),
      source: ik(18, "Ibn Kathir says these are those who understand the Word and act according to it; they have sound reason.", "those who understand it and act in accordance with it"),
      difficulty: 2,
      questions: [
        { q: "What do they follow, in 39:18?", a: "The best of the Word", wrong: ["Rumours", "The crowd", "Their whims"], why: "Those who listen to the Word and follow the best thereof." },
        { q: "What does following the best mean, per Ibn Kathir?", a: "Understanding it and acting on it", wrong: ["Only hearing it", "Selling it", "Hiding it"], why: "Those who understand it and act in accordance with it." },
        { q: "What do men of understanding have, per Ibn Kathir?", a: "Sound reasoning, upright nature", wrong: ["Great wealth", "Many servants", "Loud voices"], why: "They possess sound reasoning and an upright nature." }
      ]
    },
    {
      slug: "the-best-of-all-speech",
      title: "The best of all speech",
      line: "The best speech of all is Allah's and His Messenger's ﷺ.",
      facts: ["As-Sa'di explains", "Ulul-Albab"],
      quote: q39(18),
      source: saadi(39, 18, "As-Sa'di says people of sense listen to all speech, tell good from bad and follow the best, and the best speech of all is the speech of Allah and His Messenger ﷺ; that choosing is the sign of sense.", "وأحسنه على الإطلاق كلام اللّه وكلام رسوله"),
      difficulty: 2,
      questions: [
        { q: "What is the best speech of all, per as-Sa'di?", a: "Allah's and His Messenger's ﷺ", wrong: ["The poets'", "The kings'", "Our own"], why: "The best speech is that of Allah and His Messenger ﷺ, says as-Sa'di." },
        { q: "What is the sign of real sense, per as-Sa'di on 39:18?", a: "Telling good from bad and choosing it", wrong: ["Talking a lot", "Being rich", "Being old"], why: "Knowing the good and choosing it is the sign of sense." },
        { tf: false, q: "One who knows the good but lets desire win has full sense.", why: "As-Sa'di says his sense is lacking." }
      ]
    },
    {
      slug: "only-allah-can-guide",
      title: "Only Allah can guide",
      line: "No one can rescue one whom Allah has left astray.",
      facts: ["Guidance is from Allah", "Ask Him for it always"],
      quote: q39(19),
      source: ik(19, "Ibn Kathir says no one can guide except Allah; whomever He leaves astray cannot be guided, and whomever He guides cannot be led astray.", "whomever He guides cannot be led astray"),
      difficulty: 3,
      questions: [
        { q: "Who can guide, per Ibn Kathir?", a: "Only Allah", wrong: ["Any teacher", "Any king", "Wealth"], why: "No one can guide him apart from Allah." },
        { q: "What of one Allah guides, per Ibn Kathir?", a: "He cannot be led astray", wrong: ["He will be lost", "He must pay", "He forgets"], why: "Whomever Allah leaves astray cannot be guided, and whomever He guides cannot be led astray." },
        { tf: true, q: "We should ask Allah for guidance.", why: "No one can guide him apart from Allah." }
      ]
    },
    {
      slug: "lofty-rooms",
      title: "Lofty rooms",
      line: "The God-fearing get lofty rooms built above each other.",
      facts: ["Rivers flow beneath them", "Allah never breaks His promise"],
      quote: q39(20),
      source: ik(20, "Ibn Kathir says these rooms are story upon story, solidly built, adorned and high, with rivers flowing beneath.", "story upon story, solidly-constructed, adorned and high"),
      difficulty: 1,
      questions: [
        { q: "What is built for the God-fearing, in 39:20?", a: "Lofty rooms, one above another", wrong: ["Tents", "Caves", "Huts"], why: "For them are built lofty rooms, one above another under which rivers flow." },
        { q: "How does Ibn Kathir describe them?", a: "Story upon story, adorned and high", wrong: ["Low and plain", "Made of mud", "Small and dark"], why: "Story upon story, solidly-constructed, adorned and high." },
        { q: "Where do the rivers flow, per Ibn Kathir?", a: "Wherever the people want", wrong: ["Nowhere", "Only at night", "Only uphill"], why: "The rivers flow wherever the people want them to flow." }
      ]
    },
    {
      slug: "like-stars-on-the-horizon",
      title: "Like stars on the horizon",
      line: "High rooms in Paradise look like a far, bright star.",
      facts: ["Ranks differ by deeds", "Open to all true believers"],
      quote: q39(20),
      source: hadith("bukhari", "3256", "Abu Said Al-Khudri", "Sahih", "The Prophet ﷺ said the people of Paradise see the lofty mansions like a bright star on the horizon, and they are for men who believed in Allah and the Messengers.", "these are for the men who believed in Allah and also believed in the Apostles"),
      difficulty: 3,
      questions: [
        { q: "How are the lofty mansions seen, in the hadith?", a: "Like a bright star on the horizon", wrong: ["Like a small hut", "Like a cloud", "Like a mountain"], why: "In the same way as one looks at a brilliant star far away in the East or in the West on the horizon." },
        { q: "Are they only for the Prophets, in the hadith?", a: "No, for those who believed", wrong: ["Yes, only Prophets", "Only for angels", "Only for kings"], why: "These are for the men who believed in Allah and also believed in the Apostles." },
        { q: "Who narrated the hadith?", a: "Abu Said Al-Khudri", wrong: ["Abu Jahl", "Abu Lahab", "Abu Talib"], why: "Narrated Abu Said Al-Khudri." }
      ]
    },
    {
      slug: "rain-then-crops",
      title: "Rain, then crops",
      line: "Allah sends rain, makes springs, then grows colourful crops.",
      facts: ["Water comes from the sky", "Springs flow from the earth"],
      quote: q39(21),
      source: ik(21, "Ibn Kathir says Allah sends water from the sky, settles it in the earth and makes springs flow as needed.", "He causes springs, great and small, to flow as needed"),
      difficulty: 1,
      questions: [
        { q: "Where does water come down from, in 39:21?", a: "The sky", wrong: ["The moon", "The mountains only", "The sea only"], why: "See you not that Allah sends down water from the sky." },
        { q: "What does it become in the earth, in 39:21?", a: "Water springs", wrong: ["Stones", "Gold", "Sand"], why: "And causes it to penetrate the earth, as water springs." },
        { q: "What did Said ibn Jubayr say is its origin?", a: "The snow", wrong: ["The moon", "The sea floor", "The wind"], why: "Said bin Jubayr said, its origins lie in the snow." }
      ]
    },
    {
      slug: "green-then-yellow",
      title: "Green, then yellow",
      line: "The crops wither, turn yellow and break: so is this world.",
      facts: ["Youth then old age", "The blessed one is good after death"],
      quote: q39(21),
      source: ik(21, "Ibn Kathir says this world is green and fresh, then grows old; the blessed one is the one whose state after death is good.", "The blessed one is the one whose state after death will be good"),
      difficulty: 2,
      questions: [
        { q: "What happens to the crops, in 39:21?", a: "They wither and break", wrong: ["They stay green forever", "They fly", "They turn to gold"], why: "Afterward they wither and you see them turn yellow; then He makes them dry and broken pieces." },
        { q: "What does it teach, per Ibn Kathir?", a: "This world fades", wrong: ["This world lasts forever", "Crops are bad", "Rain is rare"], why: "This world is like this, it is green and fresh and beautiful, then it will become old." },
        { q: "Who is blessed, per Ibn Kathir?", a: "One whose state after death is good", wrong: ["The richest", "The tallest", "The oldest"], why: "The blessed one is the one whose state after death will be good." }
      ]
    },
    {
      slug: "a-heart-opened-to-islam",
      title: "A heart opened to Islam",
      line: "One whose heart Allah opened to Islam walks in light.",
      facts: ["Light from his Lord", "Hard hearts do not soften"],
      quote: q39(22),
      source: ik(22, "Ibn Kathir says hardened hearts do not become soft when Allah is mentioned, and do not feel humility or fear.", "they do not become soft when Allah is mentioned"),
      difficulty: 2,
      questions: [
        { q: "Where is the one opened to Islam, in 39:22?", a: "In light from his Lord", wrong: ["In darkness", "In a cave", "In the sea"], why: "Is he whose breast Allah has opened to Islam, so that he is in light from his Lord?" },
        { q: "What is a hardened heart, per Ibn Kathir?", a: "One that does not soften at Allah's name", wrong: ["A strong body", "A brave heart", "A calm mind"], why: "They do not become soft when Allah is mentioned, and they do not feel humility or fear." },
        { q: "Which ayah is similar, per Ibn Kathir?", a: "6:122", wrong: ["2:1", "108:1", "114:1"], why: "Is he who was dead and We gave him life and set for him a light (6:122)." }
      ]
    },
    {
      slug: "the-best-statement",
      title: "The best statement",
      line: "Allah sent down the best speech, a Book alike in its parts.",
      facts: ["Parts that resemble each other", "Oft-repeated so we understand"],
      quote: q39(23),
      source: ik(23, "Ad-Dahhak said the Quran is oft-repeated so that people will understand what their Lord tells them.", "It is oft-repeated so that people will understand what their Lord tells them"),
      difficulty: 2,
      questions: [
        { q: "What does Allah call the Quran, in 39:23?", a: "The Best Statement", wrong: ["A poem", "A song", "A story"], why: "Allah has sent down the Best Statement, a Book, its parts resembling each other, and oft-repeated." },
        { q: "Why is it oft-repeated, per Ad-Dahhak?", a: "So people understand their Lord", wrong: ["To fill pages", "For rhyme", "By chance"], why: "It is oft-repeated so that people will understand what their Lord tells them." },
        { q: "What did Qatadah say resembles another?", a: "One ayah resembles another", wrong: ["One king another", "One city another", "One tribe another"], why: "Qatadah said, One Ayah resembles another and one letter resembles another." }
      ]
    },
    {
      slug: "paradise-then-hell-pairs",
      title: "Pairs of opposites",
      line: "The Quran often mentions a thing, then its opposite.",
      facts: ["Believers then disbelievers", "Paradise then the Fire"],
      quote: q39(23),
      source: ik(23, "Ibn Kathir says passages sometimes mention a thing and its opposite, like believers then disbelievers, or Paradise then Hell.", "sometimes they mention a thing and its opposite"),
      difficulty: 3,
      questions: [
        { q: "What is one meaning of oft-repeated, per Ibn Kathir?", a: "A thing, then its opposite", wrong: ["The same word twice", "Only rhymes", "Only stories"], why: "Sometimes they mention a thing and its opposite." },
        { q: "Which pair does Ibn Kathir give?", a: "Paradise then Hell", wrong: ["Sun then rain", "Sea then land", "Kings then slaves"], why: "Such as when the believers then the disbelievers are mentioned, or when Paradise then Hell are described." },
        { tf: false, q: "Oft-repeated is the same as the unclear ayahs of 3:7.", why: "This is not the same as the Mutashabihat mentioned in the Ayah (3:7)." }
      ]
    },
    {
      slug: "skins-shiver-hearts-soften",
      title: "Skins shiver, hearts soften",
      line: "Their skin shivers, then softens to the remembrance of Allah.",
      facts: ["Fear at the warnings", "Hope at the promises"],
      quote: q39(23),
      source: ik(23, "Ibn Kathir says the righteous understand the promises and warnings: warnings make their skin shiver, and hope softens their hearts.", "because they understand the promises and warnings contained therein"),
      difficulty: 2,
      questions: [
        { q: "What shivers, in 39:23?", a: "The skins of those who fear their Lord", wrong: ["The mountains", "The trees", "The seas"], why: "The skins of those who fear their Lord shiver from it." },
        { q: "Why do they soften, per Ibn Kathir?", a: "Hope for His mercy", wrong: ["Tiredness", "Cold weather", "Boredom"], why: "Then their skin and their heart soften to the remembrance of Allah, because of their hope for His mercy and kindness." },
        { q: "Why do they react so, per Ibn Kathir?", a: "They understand promises and warnings", wrong: ["They are scared of people", "They want praise", "They are unwell"], why: "Because they understand the promises and warnings contained therein." }
      ]
    },
    {
      slug: "calm-like-the-companions",
      title: "Calm like the Companions",
      line: "The Companions listened quietly, eyes weeping, hearts at rest.",
      facts: ["No shouting or fainting", "Calm, with fear and hope"],
      quote: q39(23),
      source: ik(23, "Qatadah said the friends of Allah shiver, weep and find rest; they do not lose their minds and swoon.", "their skin shivers, their eyes weep and their hearts find rest to the remembrance of Allah"),
      difficulty: 3,
      questions: [
        { q: "How did the Companions listen, per Ibn Kathir?", a: "Quietly, with fear", wrong: ["Shouting", "Dancing", "Laughing"], why: "They did not shout or do other actions that are not natural; they would sit quietly with the proper attitude of fear." },
        { q: "What did Qatadah say of the friends of Allah?", a: "Skin shivers, eyes weep, hearts rest", wrong: ["They faint", "They lose their minds", "They run away"], why: "Their skin shivers, their eyes weep and their hearts find rest to the remembrance of Allah." },
        { tf: false, q: "Fainting when hearing the Quran is a sign of the righteous.", why: "He did not say that they lose their minds and swoon; that is the characteristic of the followers of innovation." }
      ]
    },
    {
      slug: "taste-what-you-earned",
      title: "Taste what you earned",
      line: "One facing torment is not like one who comes safe.",
      facts: ["The wrongdoers are rebuked", "The believer comes secure"],
      quote: q39(24),
      source: ik(24, "Ibn Kathir compares this with one who comes secure on the Day of Resurrection, citing 41:40.", "or he who comes secure on the Day of Resurrection"),
      difficulty: 3,
      questions: [
        { q: "What is said to the wrongdoers, in 39:24?", a: "Taste what you used to earn", wrong: ["Rest now", "Welcome", "Go home"], why: "And it will be said to the wrongdoers: Taste what you used to earn!" },
        { q: "With whom is he compared, per Ibn Kathir?", a: "One who comes secure", wrong: ["A king", "A traveller", "A merchant"], why: "Is he who is cast into the Fire better or he who comes secure on the Day of Resurrection? (41:40)." },
        { tf: true, q: "Our deeds are what we earn.", why: "Taste what you used to earn!" }
      ]
    },
    {
      slug: "nations-before-them",
      title: "Nations before them",
      line: "Earlier deniers were punished from where they did not expect.",
      facts: ["Disgrace in this life", "The Hereafter is greater"],
      quote: q39(25),
      source: ik(25, "Ibn Kathir says earlier generations who denied the Messengers were destroyed for their sins, and none could protect them.", "the previous generations who denied the Messengers were destroyed by Allah for their sins"),
      difficulty: 2,
      questions: [
        { q: "From where did the torment come, in 39:25?", a: "Directions they did not perceive", wrong: ["From a warning bell", "From their friends", "From the market"], why: "The torment came on them from directions they perceived not." },
        { q: "Why were they destroyed, per Ibn Kathir?", a: "For their sins", wrong: ["By accident", "For being poor", "For being few"], why: "The previous generations who denied the Messengers were destroyed by Allah for their sins." },
        { tf: true, q: "None could protect them from Allah.", why: "And none had they to protect them from Allah." }
      ]
    },
    {
      slug: "disgrace-in-this-life",
      title: "Disgrace in this life",
      line: "They tasted disgrace in this life; the Hereafter is greater.",
      facts: ["A lesson to beware", "The next life is weightier"],
      quote: q39(26),
      source: ik(26, "Ibn Kathir says what Allah promised them in the Hereafter is worse than whatever befell them in this world.", "is worse than whatever befell them in this world"),
      difficulty: 2,
      questions: [
        { q: "What did they taste, in 39:26?", a: "Disgrace in the present life", wrong: ["Honour", "Victory", "Rest"], why: "So, Allah made them to taste the disgrace in the present life." },
        { q: "What is worse, per Ibn Kathir?", a: "What is promised in the Hereafter", wrong: ["Worldly loss", "Hunger", "Cold"], why: "What Allah has promised them of severe punishment in the Hereafter is worse than whatever befell them in this world." },
        { tf: true, q: "Learning from past nations is wise.", why: "So, let those who are addressed beware." }
      ]
    },
    {
      slug: "every-kind-of-parable",
      title: "Every kind of parable",
      line: "Allah gave every kind of example in the Quran so we remember.",
      facts: ["Parables make meaning close", "Plain Arabic, no crookedness"],
      quote: q39(27),
      source: ik(27, "Ibn Kathir says parables bring the meaning closer to people's minds.", "Because parables bring the meaning closer to people"),
      difficulty: 1,
      questions: [
        { q: "What did Allah put forth, in 39:27?", a: "Every kind of parable", wrong: ["Only laws", "Only names", "Only numbers"], why: "And indeed We have put forth for men, in this Quran every kind of parable in order that they may remember." },
        { q: "Why parables, per Ibn Kathir?", a: "They bring meaning close", wrong: ["For fun", "To confuse", "To fill time"], why: "Because parables bring the meaning closer to people's minds." },
        { tf: true, q: "Examples help us learn from ourselves.", why: "He sets forth for you a parable from yourselves (30:28)." }
      ]
    },
    {
      slug: "plain-arabic-quran",
      title: "A plain Arabic Quran",
      line: "An Arabic Quran with no crookedness, so they may have Taqwa.",
      facts: ["Plain and clear proof", "Heed warnings, seek promises"],
      quote: q39(28),
      source: ik(28, "Ibn Kathir says it is in a plain Arabic tongue with no crookedness, deviation or confusion; it is plain, clear proof.", "with no crookedness, deviation or confusion"),
      difficulty: 2,
      questions: [
        { q: "How is the Quran described, in 39:28?", a: "Arabic, without crookedness", wrong: ["Hard and twisted", "Unclear", "Foreign"], why: "An Arabic Quran, without any crookedness therein in order that they may have Taqwa of Him." },
        { q: "What does it lack, per Ibn Kathir?", a: "Crookedness or confusion", wrong: ["Meaning", "Stories", "Guidance"], why: "It is in a plain Arabic tongue, with no crookedness, deviation or confusion." },
        { q: "What does Taqwa mean, per Ibn Kathir?", a: "Heed warnings, strive for promises", wrong: ["Read fast", "Sing it", "Hide it"], why: "In order that they may heed the warnings contained therein, and strive to attain the promises therein." }
      ]
    },
    {
      slug: "one-master-or-many",
      title: "One master or many",
      line: "A man with quarrelling masters is not like one with one master.",
      facts: ["The idolater and the believer", "The believer serves One"],
      quote: q39(29),
      source: ik(29, "Ibn Abbas, Mujahid and others said this ayah is the parable of the idolater and the sincere believer.", "This Ayah is the parable of the idolator and the sincere believer"),
      difficulty: 2,
      questions: [
        { q: "What is the first man like, in 39:29?", a: "Owned by quarrelling partners", wrong: ["A free king", "A rich trader", "A poet"], why: "A man belonging to many partners disputing with one another." },
        { q: "Whom does the parable describe, per Ibn Abbas?", a: "The idolater and the sincere believer", wrong: ["Two kings", "Two brothers", "Two cities"], why: "This Ayah is the parable of the idolator and the sincere believer." },
        { tf: false, q: "The two men in the parable are equal.", why: "Are those two equal in comparison? meaning, they are not the same." }
      ]
    },
    {
      slug: "tawhid-brings-rest",
      title: "Tawhid brings rest",
      line: "Serving One Lord alone gives the heart full rest and calm.",
      facts: ["As-Sa'di explains", "Tawhid and calm"],
      quote: q39(29),
      source: saadi(39, 29, "As-Sa'di says the idolater is like a slave owned by quarrelling partners, never at rest, calling on one then another, while the one who worships Allah alone is in full rest and calm.", "والموحد مخلص لربه، قد خلصه اللّه من الشركة لغيره، فهو في أتم راحة وأكمل طمأنينة"),
      difficulty: 2,
      questions: [
        { q: "Who is like the slave of quarrelling partners, in Az-Zumar 39:29?", a: "The one who worships many gods", wrong: ["The traveler", "The farmer", "The student"], why: "The idolater is never settled, says as-Sa'di." },
        { q: "What does Tawhid give the heart, per as-Sa'di?", a: "Full rest and calm", wrong: ["Worry", "Confusion", "Nothing"], why: "The one who worships Allah alone is in full rest and calm." },
        { tf: true, q: "The slave of one master knows what his master wants.", why: "As-Sa'di on 39:29." }
      ]
    },
    {
      slug: "you-will-die-and-they-will-die",
      title: "You will die, and they will die",
      line: "The Prophet ﷺ and all people will die and meet their Lord.",
      facts: ["Abu Bakr recited this ayah", "Allah alone is Ever-Living"],
      quote: q39(30),
      source: hadith("bukhari", "3668", "Aishah", "Sahih", "When the Prophet ﷺ died, Abu Bakr said whoever worshipped Allah, Allah is alive and shall never die, and recited 39:30 and 3:144.", "whoever worshipped Allah, then Allah is Alive and shall never die"),
      difficulty: 3,
      questions: [
        { q: "Who recited 39:30 when the Prophet ﷺ died?", a: "Abu Bakr", wrong: ["Abu Jahl", "Abu Lahab", "Abu Sufyan"], why: "Abu Bakr praised and glorified Allah and said... Then he recited: Verily you will die, and they also will die (39.30)." },
        { q: "What did Abu Bakr say of Allah?", a: "He is Alive and never dies", wrong: ["He is far away", "He sleeps", "He is tired"], why: "Whoever worshipped Allah, then Allah is Alive and shall never die." },
        { q: "Which other ayah did he recite?", a: "3:144", wrong: ["2:255", "112:1", "1:1"], why: "Muhammad is no more than an Apostle; and indeed many Apostles have passed away before him (3.144)." }
      ]
    },
    {
      slug: "rights-will-be-restored",
      title: "Rights will be restored",
      line: "People will dispute that Day, and every right returned.",
      facts: ["The wronged gets his right", "Even between animals"],
      quote: q39(31),
      source: hadith("muslim", "2582", "Abu Hurairah", "Sahih", "The Prophet ﷺ said rights will be restored to those entitled to them on the Day of Resurrection, even the hornless sheep from the horned one.", "Rights will certainly be restored to those entitled to them on the Day of Resurrection"),
      difficulty: 3,
      questions: [
        { q: "What happens to rights, in the hadith?", a: "They will be restored", wrong: ["They will be forgotten", "They will be sold", "They will be hidden"], why: "Rights will certainly be restored to those entitled to them on the Day of Resurrection." },
        { q: "Which animal gets its right, in the hadith?", a: "The hornless sheep", wrong: ["The camel", "The horse", "The lion"], why: "Even the hornless sheep will lay claim upon the horned one." },
        { q: "Who disputes, per Ibn Abbas?", a: "The oppressed with the oppressor", wrong: ["Only kings", "Only angels", "No one"], why: "The truthful one will dispute with the liar, the oppressed will dispute with the oppressor." }
      ]
    }
  ]
};

/** Ayahs 32 to 52: the truthful and the liars, Allah is enough, sleep and death, and wealth as a test. */
const ZUMAR_THREE: DeepUnit = {
  key: "zumar3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-39",
  name: "Az-Zumar, ayahs 32 to 52",
  kind: "skill",
  lessonType: "surah",
  surahName: "Az-Zumar",
  lessons: [
    {
      slug: "who-does-more-wrong",
      title: "Who does more wrong?",
      line: "No one does more wrong than one who lies about Allah.",
      facts: ["Lying about Allah", "Denying the truth when it comes"],
      quote: q39(32),
      source: ik(32, "Ibn Kathir says no one does more wrong, because he combines disbelief in Allah and disbelief in His Messenger.", "there is no one who does more wrong than such a person"),
      difficulty: 2,
      questions: [
        { q: "Who does the most wrong, in 39:32?", a: "One who lies against Allah", wrong: ["One who is poor", "One who travels", "One who sleeps"], why: "Then, who does more wrong than one who utters a lie against Allah, and denies the truth when it comes to him!" },
        { q: "What two wrongs does he combine, per Ibn Kathir?", a: "Disbelief in Allah and the Messenger ﷺ", wrong: ["Hunger and thirst", "Debt and loss", "Pride and wealth"], why: "He combines the two aspects of falsehood, disbelief in Allah and disbelief in the Messenger of Allah." },
        { tf: true, q: "Claiming Allah has a son is a lie against Allah.", why: "Claimed that the angels were the daughters of Allah and that Allah had a son, glorified be He far above all that they say." }
      ]
    },
    {
      slug: "he-who-brought-the-truth",
      title: "He who brought the truth",
      line: "The bringer of truth and those who believed are God-fearing.",
      facts: ["The Messenger ﷺ brought it", "The Muslims believed it"],
      quote: q39(33),
      source: ik(33, "Abdur-Rahman ibn Zayd said the one who brought the truth is the Messenger ﷺ, and those who believed are the Muslims.", "The one who brought the truth was the Messenger ﷺ"),
      difficulty: 2,
      questions: [
        { q: "Who brought the truth, per Mujahid and Qatadah?", a: "The Messenger ﷺ", wrong: ["A poet", "A king", "A trader"], why: "The one who brought the truth was the Messenger ﷺ." },
        { q: "Who believed in it, per Ibn Zayd?", a: "The Muslims", wrong: ["The idolaters", "No one", "Only jinn"], why: "Those who believed therein means the Muslims." },
        { q: "What does Taqwa mean, per Ibn Abbas?", a: "They fear and shun Shirk", wrong: ["They gather wealth", "They rule lands", "They write poems"], why: "Ibn Abbas said, They fear and shun Shirk." }
      ]
    },
    {
      slug: "all-they-desire",
      title: "All they desire",
      line: "The good-doers get all they wish for with their Lord.",
      facts: ["Whatever they ask for", "In Paradise"],
      quote: q39(34),
      source: ik(34, "Ibn Kathir says this is in Paradise: whatever they ask for, they will have.", "whatever they ask for they will have"),
      difficulty: 1,
      questions: [
        { q: "What will they have, in 39:34?", a: "All that they desire", wrong: ["Only a little", "Nothing", "Only water"], why: "They shall have all that they will desire with their Lord." },
        { q: "Where is this, per Ibn Kathir?", a: "In Paradise", wrong: ["In the market", "In a palace on earth", "In the desert"], why: "Means, in Paradise; whatever they ask for they will have." },
        { q: "Whose reward is it, in 39:34?", a: "The doers of good", wrong: ["The proud", "The idle", "The deniers"], why: "That is the reward of the doers of good." }
      ]
    },
    {
      slug: "the-best-of-their-deeds",
      title: "The best of their deeds",
      line: "Allah wipes out their bad deeds and rewards by their best.",
      facts: ["Sins forgiven", "Rewarded by their best deeds"],
      quote: q39(35),
      source: ik(35, "Ibn Kathir links this with 46:16: Allah accepts the best of their deeds and overlooks their evil deeds.", "They are those from whom We shall accept the best of their deeds and overlook their evil deeds"),
      difficulty: 2,
      questions: [
        { q: "What does Allah expiate, in 39:35?", a: "The evil of what they did", wrong: ["Their names", "Their homes", "Their prayers"], why: "So that Allah may expiate from them the evil of what they did." },
        { q: "By what are they rewarded, in 39:35?", a: "The best of what they did", wrong: ["The worst they did", "Their wealth", "Their age"], why: "And give them the reward, according to the best of what they used to do." },
        { q: "Which ayah is similar, per Ibn Kathir?", a: "46:16", wrong: ["1:7", "2:1", "113:1"], why: "They are those from whom We shall accept the best of their deeds and overlook their evil deeds (46:16)." }
      ]
    },
    {
      slug: "allah-is-sufficient",
      title: "Allah is sufficient",
      line: "Is not Allah enough for His servant?",
      facts: ["Enough for those who rely on Him", "Idols cannot scare a believer"],
      quote: q39(36),
      source: ik(36, "Ibn Kathir says Allah is sufficient for the one who worships Him and relies upon Him.", "Allah is Sufficient for the one who worships Him and relies upon Him"),
      difficulty: 1,
      questions: [
        { q: "Who is sufficient for His servant, in 39:36?", a: "Allah", wrong: ["Wealth", "Idols", "Kings"], why: "Is not Allah Sufficient for His servant?" },
        { q: "For whom is He sufficient, per Ibn Kathir?", a: "One who worships and relies on Him", wrong: ["Only the rich", "Only the strong", "No one"], why: "Allah is Sufficient for the one who worships Him and relies upon Him." },
        { q: "With what did they try to scare him, per Ibn Kathir?", a: "Their idols", wrong: ["An army", "Wild animals", "Storms"], why: "The idolators tried to scare the Messenger of Allah with their idols and gods." }
      ]
    },
    {
      slug: "never-forsaken",
      title: "Never forsaken",
      line: "Whom Allah guides, none can mislead; He is the Almighty.",
      facts: ["Whoever relies on Him", "Will never be forsaken"],
      quote: q39(37),
      source: ik(37, "Ibn Kathir says whoever relies on Allah and turns to Him will never be forsaken, for He is the Almighty.", "whoever relies on Him and turns to Him, will never be forsaken"),
      difficulty: 2,
      questions: [
        { q: "Who can mislead one Allah guides, in 39:37?", a: "No one", wrong: ["A friend", "A king", "A poet"], why: "And whomsoever Allah guides, for him there will be no misleader." },
        { q: "What of one who relies on Allah, per Ibn Kathir?", a: "He is never forsaken", wrong: ["He is left alone", "He loses all", "He is forgotten"], why: "Whoever relies on Him and turns to Him, will never be forsaken." },
        { tf: true, q: "Allah cannot be overwhelmed by anyone.", why: "He is the Almighty Who cannot be overwhelmed by another." }
      ]
    },
    {
      slug: "they-know-allah-created",
      title: "They know Allah created",
      line: "Ask who made the heavens and earth; they will say Allah.",
      facts: ["They admitted the Creator", "Yet worshipped helpless idols"],
      quote: q39(38),
      source: ik(38, "Ibn Kathir says the idolaters recognised Allah as Creator of all things, yet worshipped others who had no power to benefit or harm.", "the idolators used to recognize that Allah was the Creator of all things"),
      difficulty: 2,
      questions: [
        { q: "Who created the heavens, by their own answer in 39:38?", a: "Allah", wrong: ["Their idols", "Their kings", "Nature"], why: "And verily, if you ask them: Who created the heavens and the earth? Surely, they will say: Allah." },
        { q: "What was their error, per Ibn Kathir?", a: "Worshipping others besides Him", wrong: ["Not knowing Allah", "Travelling too much", "Working hard"], why: "But despite that they still worshipped others besides Him, others who had no power to bring benefit or cause harm." },
        { q: "Can idols remove harm Allah intends, per Ibn Kathir?", a: "No, not at all", wrong: ["Yes, easily", "Sometimes", "Only small harm"], why: "Could they remove His harm? meaning, they cannot do any of that at all." }
      ]
    },
    {
      slug: "sufficient-for-me-is-allah",
      title: "Sufficient for me is Allah",
      line: "Say: Allah is enough for me; in Him the trusting trust.",
      facts: ["Hud said the same", "Trust is placed in Allah"],
      quote: q39(38),
      source: ik(38, "Ibn Kathir explains it as Allah is enough for me, like what Hud said to his people in 11:54-56.", "This is like what Hud, peace be upon him, said to his people"),
      difficulty: 2,
      questions: [
        { q: "What should he say, in 39:38?", a: "Sufficient for me is Allah", wrong: ["My idols are enough", "My wealth is enough", "My tribe is enough"], why: "Say: Sufficient for me is Allah; in Him those who trust must put their trust." },
        { q: "Which Prophet said something similar, per Ibn Kathir?", a: "Hud", wrong: ["Yusuf", "Yahya", "Isa"], why: "This is like what Hud, peace be upon him, said to his people." },
        { q: "What does it mean, per Ibn Kathir?", a: "Allah is enough for me", wrong: ["I need no prayer", "I am alone", "I fear people"], why: "Say: Sufficient for me is Allah means, Allah is enough for me." }
      ]
    },
    {
      slug: "work-as-you-will",
      title: "Work as you will",
      line: "Say: Work your way, I am working; you will come to know.",
      facts: ["A threat and a warning", "The outcome will show"],
      quote: q39(39),
      source: ik(39, "Ibn Kathir says this is a threat and a warning: they will learn the consequences.", "This is a threat and a warning"),
      difficulty: 2,
      questions: [
        { q: "What is said to them, in 39:39?", a: "Work according to your way", wrong: ["Stop and rest", "Join us now", "Go home"], why: "Say: O My people! Work according to your way, I am working." },
        { q: "What kind of words are these, per Ibn Kathir?", a: "A threat and a warning", wrong: ["A gift", "A greeting", "A joke"], why: "This is a threat and a warning." },
        { q: "What will they come to know, per Ibn Kathir?", a: "The consequences", wrong: ["Poetry", "Trade", "Nothing"], why: "Then you will come to know means, you will learn the consequences." }
      ]
    },
    {
      slug: "a-lasting-torment",
      title: "A lasting torment",
      line: "Disgrace may come in this world, and lasting torment later.",
      facts: ["Disgrace in this world", "We seek refuge with Allah"],
      quote: q39(40),
      source: ik(40, "Ibn Kathir says the disgracing torment is in this world, and the lasting one comes on the Day of Resurrection; we seek refuge with Allah.", "We seek refuge with Allah from that"),
      difficulty: 3,
      questions: [
        { q: "Where is the disgracing torment, per Ibn Kathir?", a: "In this world", wrong: ["Nowhere", "Only in dreams", "Only at sea"], why: "To whom comes a disgracing torment means, in this world." },
        { q: "When does the lasting torment come, per Ibn Kathir?", a: "On the Day of Resurrection", wrong: ["Tomorrow", "Next year", "Never"], why: "Ongoing and eternal, with no escape, which will come on the Day of Resurrection." },
        { tf: true, q: "We should seek refuge with Allah from the torment.", why: "We seek refuge with Allah from that." }
      ]
    },
    {
      slug: "guidance-is-for-yourself",
      title: "Guidance is for yourself",
      line: "Guidance helps the guided; straying harms only the stray.",
      facts: ["For mankind and jinn", "The Prophet ﷺ only conveys"],
      quote: q39(41),
      source: ik(41, "Ibn Kathir says the benefit of guidance returns to the person, and the Prophet ﷺ was not responsible for guiding them.", "you are not responsible for guiding them"),
      difficulty: 2,
      questions: [
        { q: "For whom is the Book, per Ibn Kathir?", a: "All mankind and jinn", wrong: ["Only Arabs", "Only kings", "Only scholars"], why: "For all of creation, mankind and Jinn, so that he may warn them therewith." },
        { q: "Who benefits from guidance, in 39:41?", a: "The one who accepts it", wrong: ["Only the Prophet ﷺ", "No one", "Only angels"], why: "So, whosoever accepts the guidance, it is only for himself." },
        { q: "What was not his duty, per Ibn Kathir?", a: "Forcing them to be guided", wrong: ["Conveying", "Warning", "Praying"], why: "You are not responsible for guiding them. Your duty is only to convey (13:40)." }
      ]
    },
    {
      slug: "sleep-the-lesser-death",
      title: "Sleep, the lesser death",
      line: "Allah takes souls at death, and in sleep too.",
      facts: ["Death is the greater death", "Sleep is the lesser death"],
      quote: q39(42),
      source: ik(42, "Ibn Kathir says Allah causes the greater death when angels take souls, and a lesser death when people sleep.", "He keeps the souls of the dead and sends back the souls of the living"),
      difficulty: 2,
      questions: [
        { q: "When does Allah take souls, in 39:42?", a: "At death and during sleep", wrong: ["Only at noon", "Only in winter", "Never"], why: "It is Allah Who takes away the souls at the time of their death, and those that die not during their sleep." },
        { q: "What is sleep called, per Ibn Kathir?", a: "The lesser death", wrong: ["The long rest", "The second life", "A dream world"], why: "He causes them to die a lesser death when they sleep." },
        { q: "Which souls does Allah keep, per Ibn Abbas?", a: "The souls of the dead", wrong: ["The souls of the living", "All souls", "No souls"], why: "He keeps the souls of the dead and sends back the souls of the living, and He does not make any mistakes." }
      ]
    },
    {
      slug: "the-bedtime-dua",
      title: "The bedtime dua",
      line: "The Prophet ﷺ taught a dua for bedtime.",
      facts: ["Shake out the bed first", "Ask mercy if the soul is kept"],
      quote: q39(42),
      source: hadith("bukhari", "6320", "Abu Hurairah", "Sahih", "The Prophet ﷺ taught us to shake out the bed, then ask Allah to have mercy on our soul if He keeps it, and protect it if He sends it back.", "he should shake out his bed with the inside of his waist sheet"),
      difficulty: 3,
      questions: [
        { q: "What should we do first, in the hadith?", a: "Shake out the bed", wrong: ["Eat a meal", "Turn on a lamp", "Read a story"], why: "He should shake out his bed with the inside of his waist sheet, for he does not know what has come on to it after him." },
        { q: "What do we ask if Allah keeps our soul?", a: "Have mercy on it", wrong: ["Wake it early", "Make it rich", "Give it fame"], why: "In amsakta nafsi farhamha: if You take my soul, have mercy on it." },
        { q: "Who narrated the hadith?", a: "Abu Hurairah", wrong: ["Abu Jahl", "Abu Lahab", "Abu Sufyan"], why: "Narrated Abu Huraira: The Prophet ﷺ said, When anyone of you go to bed." }
      ]
    },
    {
      slug: "all-intercession-is-allahs",
      title: "All intercession is Allah's",
      line: "Their idols can do nothing; all intercession belongs to Allah.",
      facts: ["Only by His permission", "For one He is pleased with"],
      quote: q39(44),
      source: ik(44, "Ibn Kathir says intercession is of no avail except for one Allah is pleased with and has given permission; the whole matter rests with Him.", "The whole matter rests with Him"),
      difficulty: 2,
      questions: [
        { q: "To whom belongs all intercession, in 39:44?", a: "Allah", wrong: ["Idols", "Kings", "Priests"], why: "Say: To Allah belongs all intercession." },
        { q: "What can the idols do, in 39:43?", a: "Nothing at all", wrong: ["Grant wishes", "Heal", "Bring rain"], why: "Even if they have power over nothing whatever and have no intelligence?" },
        { q: "Which ayah does Ibn Kathir cite?", a: "2:255", wrong: ["1:2", "112:3", "114:4"], why: "Who is he that can intercede with Him except with His permission? (2:255)." }
      ]
    },
    {
      slug: "idols-have-no-minds",
      title: "Idols have no minds",
      line: "Idols cannot think, hear or see; they are helpless.",
      facts: ["Taken by whim, no proof", "Lifeless and powerless"],
      quote: q39(43),
      source: ik(43, "Ibn Kathir says the idols are not able to do anything; they have no minds, and they cannot hear or see.", "they have no minds with which to think, and they cannot hear or see"),
      difficulty: 2,
      questions: [
        { q: "On what basis were idols taken, per Ibn Kathir?", a: "Their own whims, no proof", wrong: ["Clear proof", "Revelation", "A Prophet"], why: "Whom they have taken on the basis of their own whims, with no evidence or proof." },
        { q: "What can idols not do, per Ibn Kathir?", a: "Think, hear or see", wrong: ["Be carved", "Be carried", "Be broken"], why: "They have no minds with which to think, and they cannot hear or see." },
        { tf: false, q: "Idols can intercede on their own.", why: "Intercession is of no avail except for the one with whom Allah is pleased and to whom He has granted permission to intercede." }
      ]
    },
    {
      slug: "hearts-that-recoil",
      title: "Hearts that recoil",
      line: "At Allah's name alone, the deniers' hearts fill with disgust.",
      facts: ["They rejoice at false gods", "Believers love Allah's name"],
      quote: q39(45),
      source: ik(45, "Mujahid said their hearts are filled with disgust means they recoil in horror; but when idols are mentioned, they feel happy.", "Their hearts are filled with disgust means they recoil in horror"),
      difficulty: 3,
      questions: [
        { q: "When do their hearts fill with disgust, in 39:45?", a: "When Allah alone is mentioned", wrong: ["At night", "In the market", "At meals"], why: "And when Allah Alone is mentioned, the hearts of those who believe not in the Hereafter are filled with disgust." },
        { q: "What does disgust mean, per Mujahid?", a: "They recoil in horror", wrong: ["They smile", "They sleep", "They bow"], why: "Their hearts are filled with disgust means they recoil in horror." },
        { q: "When do they rejoice, in 39:45?", a: "When others are mentioned", wrong: ["When Allah is named", "When they pray", "When they give"], why: "And when those besides Him are mentioned, behold, they rejoice." }
      ]
    },
    {
      slug: "creator-of-the-heavens",
      title: "Creator of the heavens",
      line: "Say: O Allah, Creator of the heavens, Knower of seen and unseen.",
      facts: ["A dua to Allah alone", "He judges all differences"],
      quote: q39(46),
      source: ik(46, "Ibn Kathir says this teaches calling upon Allah alone, Who knows what is secret and what is open.", "what is secret and what is open"),
      difficulty: 2,
      questions: [
        { q: "What does Allah know, in 39:46?", a: "The unseen and the seen", wrong: ["Only the seen", "Only the past", "Only the sky"], why: "All-Knower of the unseen and the seen!" },
        { q: "What do unseen and seen mean, per Ibn Kathir?", a: "What is secret and what is open", wrong: ["Day and night", "Land and sea", "Old and new"], why: "All-Knower of the unseen and the seen! means, what is secret and what is open." },
        { q: "What will Allah judge, in 39:46?", a: "What His servants differed about", wrong: ["Only trade", "Only weather", "Nothing"], why: "You will judge between your servants about that wherein they used to differ." }
      ]
    },
    {
      slug: "the-night-prayer-dua",
      title: "The night prayer dua",
      line: "The Prophet ﷺ opened his night prayer with words like 39:46.",
      facts: ["Lord of Jibril, Mikail, Israfil", "He asked Allah for guidance"],
      quote: q39(46),
      source: hadith("muslim", "770", "Aishah", "Sahih", "Aishah said the Prophet ﷺ began his night prayer: O Allah, Lord of Jibril, Mikail and Israfil, Creator of the heavens and the earth, Knower of the unseen and the seen.", "the Creator of the heavens and the earth, Who knowest the unseen and the seen"),
      difficulty: 3,
      questions: [
        { q: "When did he say this dua, in the hadith?", a: "When he got up at night", wrong: ["At lunch", "On a journey", "In the market"], why: "When he got up at night he would commence his prayer with these words." },
        { q: "Which angels are named, in the hadith?", a: "Jibril, Mikail and Israfil", wrong: ["Harut and Marut", "Munkar and Nakir", "None"], why: "O Allah, Lord of Gabriel, and Michael, and Israfil." },
        { q: "What did he ask for, in the hadith?", a: "Guidance to the Straight Path", wrong: ["Wealth", "Fame", "A kingdom"], why: "Guide me with Thy permission... for it is Thou Who guidest whom Thou wilt to the Straight Path." }
      ]
    },
    {
      slug: "no-ransom-accepted",
      title: "No ransom accepted",
      line: "Even twice the earth's wealth could not buy them out.",
      facts: ["Ransom is not accepted", "Like 3:91, an earth full of gold"],
      quote: q39(47),
      source: ik(47, "Ibn Kathir says the ransom will not be accepted, even an earth full of gold, as in 3:91.", "But the ransom will not be accepted from them"),
      difficulty: 3,
      questions: [
        { q: "What would they offer, in 39:47?", a: "All the earth and as much again", wrong: ["A small coin", "One camel", "Nothing"], why: "If they had all that is on the earth and therewith as much again, they verily, would offer it to ransom themselves." },
        { q: "Is the ransom accepted, per Ibn Kathir?", a: "No", wrong: ["Yes", "Half of it", "Only gold"], why: "But the ransom will not be accepted from them, even if it were to be an earth-full of gold." },
        { tf: true, q: "Deeds in this life matter more than wealth.", why: "But the ransom will not be accepted from them, even if it were to be an earth-full of gold." }
      ]
    },
    {
      slug: "what-they-mocked",
      title: "What they mocked",
      line: "What they mocked will surround them; their deeds will show.",
      facts: ["Sins become apparent", "Mockery turns against them"],
      quote: q39(48),
      source: ik(48, "Ibn Kathir says the punishment they used to make fun of in this world will encompass them.", "the punishment which they used to make fun of in this world will encompass them"),
      difficulty: 3,
      questions: [
        { q: "What becomes apparent, in 39:48?", a: "The evils they earned", wrong: ["Their gold", "Their names", "Their houses"], why: "And the evils of that which they earned will become apparent to them." },
        { q: "What will encircle them, per Ibn Kathir?", a: "What they made fun of", wrong: ["Their friends", "Angels of mercy", "Gardens"], why: "The punishment which they used to make fun of in this world will encompass them." },
        { tf: false, q: "Mocking the warnings makes them go away.", why: "That which they used to mock at will encircle them." }
      ]
    },
    {
      slug: "only-a-trial",
      title: "Only a trial",
      line: "Given a blessing, man says: I earned it by my knowledge.",
      facts: ["Blessings are a test", "Obey or disobey"],
      quote: q39(49),
      source: ik(49, "Ibn Kathir says Allah gives the blessing as a test to see whether he will be obedient or disobedient.", "as a test to see whether he will be obedient or disobedient"),
      difficulty: 2,
      questions: [
        { q: "What does man claim, in 39:49?", a: "Only because of knowledge I got it", wrong: ["Allah gave it", "My parents gave it", "It is a test"], why: "Only because of knowledge I obtained it." },
        { q: "What is the blessing really, in 39:49?", a: "A trial", wrong: ["A reward for pride", "His right", "Luck"], why: "Nay, it is only a trial, but most of them know not." },
        { q: "What is the test, per Ibn Kathir?", a: "Will he obey or disobey", wrong: ["Will he grow taller", "Will he travel", "Will he sing"], why: "As a test to see whether he will be obedient or disobedient." }
      ]
    },
    {
      slug: "like-qarun",
      title: "Like Qarun",
      line: "Those before said the same, and their wealth did not save them.",
      facts: ["Qarun said it too", "Gathered wealth did not help"],
      quote: q39(50),
      source: ik(50, "Ibn Kathir says earlier nations made the same claims, and all they had gathered did not save them, like Qarun in 28:76-78.", "all that they had gathered did not save them"),
      difficulty: 3,
      questions: [
        { q: "Who said it before, in 39:50?", a: "Those before them", wrong: ["No one", "The angels", "The Prophets"], why: "Verily, those before them said it, yet all that they had earned availed them not." },
        { q: "Whom does Ibn Kathir give as an example?", a: "Qarun", wrong: ["Luqman", "Dhul-Qarnayn", "Yusuf"], why: "This is like the Ayah in which Allah tells us how Qarun reacted (28:76-78)." },
        { q: "Did their wealth save them, per Ibn Kathir?", a: "No", wrong: ["Yes", "Partly", "Only the gold"], why: "What they said was not right and all that they had gathered did not save them." }
      ]
    },
    {
      slug: "no-escape",
      title: "No escape",
      line: "Their deeds caught up with them; the same awaits these deniers.",
      facts: ["Earlier nations were overtaken", "They cannot escape"],
      quote: q39(51),
      source: ik(51, "Ibn Kathir says the people addressed will be overtaken for what they earned, just as happened to earlier peoples.", "just as happened to those earlier peoples"),
      difficulty: 3,
      questions: [
        { q: "What overtook those before, in 39:51?", a: "The evil results of their deeds", wrong: ["Good fortune", "Rain", "Sleep"], why: "So, the evil results of that which they earned overtook them." },
        { q: "Can the wrongdoers escape, in 39:51?", a: "No, never", wrong: ["Yes, by running", "Yes, by wealth", "Only some"], why: "And they will never be able to escape." },
        { tf: true, q: "Ibn Kathir says the same happens as to earlier peoples.", why: "Will also be overtaken by the evil results for that which they earned; just as happened to those earlier peoples." }
      ]
    },
    {
      slug: "provision-expanded-or-straitened",
      title: "Provision wide or narrow",
      line: "Allah gives plenty to some and less to others.",
      facts: ["A sign for believers", "Wealth is not a sign of love"],
      quote: q39(52),
      source: ik(52, "Ibn Kathir says Allah gives plenty to some and restricts provision for others, and in this is a lesson and proof.", "He gives plenty to some and restricts the provision for others"),
      difficulty: 2,
      questions: [
        { q: "What does Allah expand and straiten, in 39:52?", a: "The provision", wrong: ["The sky", "The sea", "The mountains"], why: "Do they not know that Allah expands the provision for whom He wills, and straitens it." },
        { q: "What does it mean, per Ibn Kathir?", a: "Plenty to some, less to others", wrong: ["Same for all", "Nothing for anyone", "Only for kings"], why: "He gives plenty to some and restricts the provision for others." },
        { q: "For whom is it a sign, in 39:52?", a: "Folk who believe", wrong: ["The proud", "The lazy", "The deniers"], why: "Verily, in this are signs for the folk who believe!" }
      ]
    }
  ]
};

/** Ayahs 53 to 75: never despair of Allah's mercy, the Trumpet and the Judgement, and the groups led to their homes. */
const ZUMAR_FOUR: DeepUnit = {
  key: "zumar4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-39",
  name: "Az-Zumar, ayahs 53 to 75",
  kind: "skill",
  lessonType: "surah",
  surahName: "Az-Zumar",
  lessons: [
    {
      slug: "despair-not-of-allahs-mercy",
      title: "Despair not of Allah's mercy",
      line: "O My servants who wronged yourselves, never despair of mercy.",
      facts: ["Allah forgives all sins", "For whoever repents"],
      quote: q39(53),
      source: ik(53, "Ibn Kathir says Allah will forgive all the sins of those who repent, no matter how many, even if they are like the foam of the sea.", "even if they are like the foam of the sea"),
      difficulty: 1,
      questions: [
        { q: "What must we not do, in 39:53?", a: "Despair of Allah's mercy", wrong: ["Pray at night", "Give charity", "Fast"], why: "Despair not of the mercy of Allah, verily, Allah forgives all sins." },
        { q: "How many sins can be forgiven, per Ibn Kathir?", a: "All, even like sea foam", wrong: ["Only ten", "Only small ones", "None"], why: "No matter what or how many his sins are, even if they are like the foam of the sea." },
        { q: "What is the condition, per Ibn Kathir?", a: "Repentance", wrong: ["Wealth", "Old age", "Travel"], why: "Allah forgives all sins provided that a person repents." }
      ]
    },
    {
      slug: "the-door-of-repentance",
      title: "The door of repentance",
      line: "The door of repentance and mercy is wide open.",
      facts: ["No sin is too big", "Allah accepts repentance"],
      quote: q39(53),
      source: ik(53, "Ibn Kathir says one must not despair even if sins are many and great, for the door of repentance and mercy is expansive.", "for the door of repentance and mercy is expansive"),
      difficulty: 2,
      questions: [
        { q: "How wide is the door, per Ibn Kathir?", a: "Expansive", wrong: ["Shut", "Narrow", "Locked"], why: "For the door of repentance and mercy is expansive." },
        { q: "Which ayah says Allah accepts repentance?", a: "9:104", wrong: ["1:4", "112:2", "108:3"], why: "Know they not that Allah accepts repentance from His servants (9:104)." },
        { tf: false, q: "A person with many sins should give up hope.", why: "One must not despair of the mercy of Allah even if his sins are many and great." }
      ]
    },
    {
      slug: "the-ayah-of-most-relief",
      title: "The ayah of most relief",
      line: "Ibn Masud called 39:53 the ayah that brings the most relief.",
      facts: ["2:255 is the greatest ayah", "65:2-3 on reliance"],
      quote: q39(53),
      source: ik(53, "Ibn Masud said the ayah that brings the most relief is in Surat Az-Zumar: despair not of the mercy of Allah.", "which brings the most relief is in Surat Az-Zumar"),
      difficulty: 2,
      questions: [
        { q: "Which ayah brings most relief, per Ibn Masud?", a: "39:53", wrong: ["2:282", "4:11", "9:5"], why: "The Ayah in the Quran which brings the most relief is in Surat Az-Zumar." },
        { q: "Which is the greatest ayah, per Ibn Masud?", a: "2:255", wrong: ["39:53", "112:1", "1:1"], why: "The greatest Ayah in the Book of Allah is: Allah! None has the right to be worshipped but He (2:255)." },
        { q: "What did Ibn Abbas say of those who make people despair?", a: "They rejected the Book of Allah", wrong: ["They are wise", "They are kind", "They are right"], why: "Anyone who makes the servants of Allah despair of His mercy after this, has rejected the Book of Allah." }
      ]
    },
    {
      slug: "allah-loves-to-forgive",
      title: "Allah forgives the repentant",
      line: "Allah forgives those who sin and then ask His forgiveness.",
      facts: ["Keep asking forgiveness", "Then Allah pardons them"],
      quote: q39(53),
      source: hadith("muslim", "2749", "Abu Hurairah", "Sahih", "The Prophet ﷺ said if you did not sin, Allah would replace you with people who would sin and seek forgiveness, and He would pardon them.", "those people who would commit sin and seek forgiveness from Allah, and He would have pardoned them"),
      difficulty: 3,
      questions: [
        { q: "What would the new people do, in the hadith?", a: "Sin and seek forgiveness", wrong: ["Never pray", "Never sin", "Rule the earth"], why: "Those people who would commit sin and seek forgiveness from Allah, and He would have pardoned them." },
        { q: "What would Allah do for them, in the hadith?", a: "Pardon them", wrong: ["Ignore them", "Forget them", "Leave them"], why: "And He would have pardoned them." },
        { tf: true, q: "Allah pardons those who seek His forgiveness.", why: "Those people who would commit sin and seek forgiveness from Allah, and He would have pardoned them." }
      ]
    },
    {
      slug: "the-man-who-was-forgiven",
      title: "The man who was forgiven",
      line: "A man with a dark past went to repent, and was forgiven.",
      facts: ["He headed to a good town", "He died one span closer to it"],
      quote: q39(53),
      source: hadith("bukhari", "3470", "Abu Said Al-Khudri", "Sahih", "The Prophet ﷺ told of a man of Bani Israil with a terrible past who set out to repent; he died on the way, one span closer to the good town, and was forgiven.", "So he was forgiven"),
      difficulty: 3,
      questions: [
        { q: "Where was the man going, in the hadith?", a: "To a town to repent", wrong: ["To a market", "To a war", "To a palace"], why: "He kept on asking till a man advised to go to such and such village." },
        { q: "How close was he to the good town?", a: "One span closer", wrong: ["Far away", "Ten miles", "Halfway"], why: "So he was found to be one span closer to the village he was going to. So he was forgiven." },
        { q: "What happened to him at the end?", a: "He was forgiven", wrong: ["He was punished", "He was forgotten", "He turned back"], why: "So he was forgiven." }
      ]
    },
    {
      slug: "turn-back-before-it-comes",
      title: "Turn back before it comes",
      line: "Turn to your Lord and submit before the punishment comes.",
      facts: ["Hasten to repent", "Do good deeds now"],
      quote: q39(54),
      source: ik(54, "Ibn Kathir says this means hasten to repent and do righteous deeds before His wrath comes.", "hasten to repent and do righteous deeds before His wrath comes upon you"),
      difficulty: 2,
      questions: [
        { q: "To whom should we turn, in 39:54?", a: "Our Lord", wrong: ["Our idols", "Our wealth", "Our friends"], why: "And turn in repentance to your Lord and submit to Him before the torment comes upon you." },
        { q: "What should we hasten to, per Ibn Kathir?", a: "Repent and do good deeds", wrong: ["Sleep", "Gather wealth", "Argue"], why: "Hasten to repent and do righteous deeds before His wrath comes upon you." },
        { tf: true, q: "Repentance should not be delayed.", why: "Hasten to repent and do righteous deeds before His wrath comes upon you." }
      ]
    },
    {
      slug: "follow-the-best-sent-down",
      title: "Follow the best sent down",
      line: "Follow the best your Lord sent down, before it is too late.",
      facts: ["The best is the Quran", "Death may come suddenly"],
      quote: q39(55),
      source: ik(55, "Ibn Kathir says the best sent down is the Quran, and the torment may come without you realizing it.", "before the torment comes on you suddenly while you perceive not"),
      difficulty: 2,
      questions: [
        { q: "What should we follow, in 39:55?", a: "The best of what is sent down", wrong: ["Old habits", "The crowd", "Our whims"], why: "And follow the best of that which is sent down to you from your Lord." },
        { q: "What is the best sent down, per Ibn Kathir?", a: "The Quran", wrong: ["Poetry", "Old tales", "Laws of kings"], why: "And follow the best of that which is sent down to you from your Lord, means, the Quran." },
        { q: "How may the torment come, per Ibn Kathir?", a: "Without you realizing it", wrong: ["With a long notice", "Never", "Only to others"], why: "Before the torment comes on you suddenly while you perceive not! means, without you realizing it." }
      ]
    },
    {
      slug: "alas-my-grief",
      title: "Alas, my grief",
      line: "One who put off repenting will cry out in regret that Day.",
      facts: ["He mocked instead of believing", "He wished he were righteous"],
      quote: q39(56),
      source: ik(56, "Ibn Kathir says the sinner who neglected to repent will regret it and wish he had been one of the righteous.", "will regret it, and will wish that he had been one of the righteous who obeyed Allah"),
      difficulty: 2,
      questions: [
        { q: "What does the person say, in 39:56?", a: "Alas, my grief", wrong: ["What a joy", "I am the best", "I did nothing"], why: "Lest a person should say: Alas, my grief that I was undutiful to Allah." },
        { q: "What will he wish, per Ibn Kathir?", a: "That he had been righteous", wrong: ["That he had more gold", "That he was a king", "Nothing"], why: "Will regret it, and will wish that he had been one of the righteous who obeyed Allah." },
        { q: "What were his deeds like, per Ibn Kathir?", a: "One who mocks, not sincere", wrong: ["Firm in faith", "Sincere", "Humble"], why: "My actions in this world were those of one who ridicules and makes fun, not of one who has firm faith and is sincere." }
      ]
    },
    {
      slug: "if-only-allah-had-guided-me",
      title: "If only Allah had guided me",
      line: "He will say: if only Allah had guided me!",
      facts: ["An excuse too late", "Allah knew it beforehand"],
      quote: q39(57),
      source: ik(57, "Ibn Abbas said Allah tells us what His servants will say before they say it and what they will do before they do it.", "Allah tells us what His servants will say before they say it"),
      difficulty: 3,
      questions: [
        { q: "What does he say, in 39:57?", a: "If only Allah had guided me", wrong: ["I was the best", "I need nothing", "I am happy"], why: "Or lest he should say: If only Allah had guided me, I should indeed have been among those who have Taqwa." },
        { q: "What does Allah know, per Ibn Abbas?", a: "What we will say before we say it", wrong: ["Only the past", "Only words", "Nothing hidden"], why: "Allah tells us what His servants will say before they say it and what they will do before they do it." },
        { q: "Which ayah did Ibn Abbas recite?", a: "35:14", wrong: ["1:5", "2:2", "97:1"], why: "And none can inform you like Him Who is the All-Knower (35:14)." }
      ]
    },
    {
      slug: "if-only-another-chance",
      title: "If only another chance",
      line: "Seeing the torment, he wishes for a second chance to do good.",
      facts: ["He wishes to return", "The chance is now"],
      quote: q39(58),
      source: ik(58, "Ibn Kathir says he will wish that he could go back to this world so that he could do righteous deeds.", "he will wish that he could go back to this world, so that he could do righteous deeds"),
      difficulty: 2,
      questions: [
        { q: "What does he wish for, in 39:58?", a: "Another chance", wrong: ["More gold", "A palace", "Rest"], why: "If only I had another chance, then I should indeed be among the doers of good." },
        { q: "Why does he want to return, per Ibn Kathir?", a: "To do righteous deeds", wrong: ["To see family", "To trade", "To travel"], why: "He will wish that he could go back to this world, so that he could do righteous deeds." },
        { tf: true, q: "Our chance to do good is in this life.", why: "He will wish that he could go back to this world, so that he could do righteous deeds." }
      ]
    },
    {
      slug: "my-ayat-did-come-to-you",
      title: "My ayat did come to you",
      line: "Allah answers: My signs came to you, and you were too proud.",
      facts: ["The proof was given", "Pride made them refuse"],
      quote: q39(59),
      source: ik(59, "Ibn Kathir says Allah's ayat came to them and His proof was established, but they rejected it and were too arrogant to follow it.", "My Ayat did come to you in the world, and My proof was established against you"),
      difficulty: 3,
      questions: [
        { q: "What came to them, in 39:59?", a: "Allah's ayat", wrong: ["Nothing", "Only rain", "Only wealth"], why: "Yes! Verily, there came to you My Ayat and you denied them." },
        { q: "What stopped them, in 39:59?", a: "Pride", wrong: ["Hunger", "Distance", "Illness"], why: "And you denied them, and were proud and were among the disbelievers." },
        { q: "What was established, per Ibn Kathir?", a: "Allah's proof against them", wrong: ["Their innocence", "Their wealth", "Their excuse"], why: "My Ayat did come to you in the world, and My proof was established against you." }
      ]
    },
    {
      slug: "faces-on-that-day",
      title: "Faces on that Day",
      line: "Those who lied about Allah will have darkened faces that Day.",
      facts: ["For lies and fabrications", "Pride kept them from truth"],
      quote: q39(60),
      source: ik(60, "Ibn Kathir says their faces will be darkened because of their lies, and their pride kept them from following the truth.", "because of their lies and fabrications"),
      difficulty: 2,
      questions: [
        { q: "Who will have darkened faces, in 39:60?", a: "Those who lied against Allah", wrong: ["The poor", "The sick", "The young"], why: "And on the Day of Resurrection you will see those who lied against Allah, their faces will be black." },
        { q: "What lie did they tell, per Ibn Kathir?", a: "That He had partners or offspring", wrong: ["About trade", "About weather", "About travel"], why: "By their claims that He had partners or offspring." },
        { q: "Why are their faces so, per Ibn Kathir?", a: "Their lies and fabrications", wrong: ["The sun", "Their age", "Their work"], why: "Their faces will be black means, because of their lies and fabrications." }
      ]
    },
    {
      slug: "no-evil-no-grief",
      title: "No evil, no grief",
      line: "Allah saves the God-fearing; no evil or grief touches them.",
      facts: ["Safe from the great terror", "They gain all that is good"],
      quote: q39(61),
      source: ik(61, "Ibn Kathir says the greater terror will not grieve them; they will be safe from all grief and attain all that is good.", "they will be safe from all grief and removed from all evil"),
      difficulty: 1,
      questions: [
        { q: "Whom does Allah deliver, in 39:61?", a: "Those who have Taqwa", wrong: ["The proud", "The careless", "The deniers"], why: "And Allah will deliver those who have Taqwa to their places of success." },
        { q: "What will not touch them, in 39:61?", a: "Evil", wrong: ["Joy", "Light", "Peace"], why: "Evil shall touch them not, nor shall they grieve." },
        { q: "What will they attain, per Ibn Kathir?", a: "All that is good", wrong: ["Half of the good", "Nothing", "Only rest"], why: "They will be safe from all grief and removed from all evil, and they will attain all that is good." }
      ]
    },
    {
      slug: "creator-of-all-things",
      title: "Creator of all things",
      line: "Allah created everything and takes care of everything.",
      facts: ["Creator, Lord, Sovereign", "All under His control"],
      quote: q39(62),
      source: ik(62, "Ibn Kathir says Allah is the Creator, Lord, Sovereign and Controller of all things; everything is under His dominion.", "He is the Creator, Lord, Sovereign and Controller of all things"),
      difficulty: 1,
      questions: [
        { q: "What did Allah create, in 39:62?", a: "All things", wrong: ["Only the sky", "Only people", "Only animals"], why: "Allah is the Creator of all things, and He is the Trustee over all things." },
        { q: "What is He over all things, in 39:62?", a: "The Trustee", wrong: ["A guest", "A stranger", "A servant"], why: "And He is the Trustee over all things." },
        { tf: true, q: "Everything is subject to Allah's dominion.", why: "Everything is subject to His dominion, power and guardianship." }
      ]
    },
    {
      slug: "the-keys-of-the-heavens",
      title: "The keys of the heavens",
      line: "To Him belong the keys of the heavens and the earth.",
      facts: ["Maqalid means keys", "Or treasures, said As-Suddi"],
      quote: q39(63),
      source: ik(63, "Mujahid said Maqalid means keys; As-Suddi said treasures; both mean the control of all things is in Allah's Hand.", "Both opinions mean that the control of all things is in the Hand of Allah"),
      difficulty: 2,
      questions: [
        { q: "What does Maqalid mean, per Mujahid?", a: "Keys", wrong: ["Clouds", "Rivers", "Doors"], why: "Mujahid said, Maqalid means keys in Persian." },
        { q: "What did As-Suddi say it means?", a: "The treasures", wrong: ["The stars", "The seas", "The winds"], why: "The treasures of the heavens and the earth." },
        { q: "Who are the losers, in 39:63?", a: "Those who disbelieve in Allah's ayat", wrong: ["The poor", "The weak", "Travellers"], why: "And those who disbelieve in the Ayat of Allah, such are they who will be the losers." }
      ]
    },
    {
      slug: "do-you-order-me",
      title: "Do you order me?",
      line: "The idolaters asked him to worship their gods; he refused.",
      facts: ["They offered a swap", "Worship belongs to Allah only"],
      quote: q39(64),
      source: ik(64, "Ibn Abbas said the idolaters called the Prophet ﷺ to worship their gods, and then they would worship his God with him.", "the idolators in their ignorance called the Messenger of Allah"),
      difficulty: 2,
      questions: [
        { q: "What did they ask, per Ibn Abbas?", a: "That he worship their gods", wrong: ["That he leave Makkah", "That he be king", "That he trade"], why: "The idolators in their ignorance called the Messenger of Allah to worship their gods." },
        { q: "What did they offer in return?", a: "To worship his God with him", wrong: ["Gold", "A kingdom", "Marriage"], why: "Then they would worship his God with him." },
        { q: "How does 39:64 address them?", a: "O you fools", wrong: ["O my friends", "O kings", "O wise ones"], why: "Say: Do you order me to worship other than Allah O you fools!" }
      ]
    },
    {
      slug: "shirk-cancels-deeds",
      title: "Shirk cancels deeds",
      line: "Joining partners with Allah makes all good deeds go to waste.",
      facts: ["Told to every Prophet", "Like 6:88"],
      quote: q39(65),
      source: ik(65, "Ibn Kathir links it with 6:88: if they had joined others with Allah, all they did would be of no benefit.", "all that they used to do would have been of no benefit to them"),
      difficulty: 3,
      questions: [
        { q: "What happens to deeds with shirk, in 39:65?", a: "They are in vain", wrong: ["They double", "They stay safe", "They grow"], why: "If you join others in worship with Allah, surely your deeds will be in vain." },
        { q: "To whom was this revealed, in 39:65?", a: "Him and those before him", wrong: ["Only Arabs", "No one", "Only kings"], why: "And indeed it has been revealed to you, as it was to those before you." },
        { q: "Which ayah is similar, per Ibn Kathir?", a: "6:88", wrong: ["2:1", "112:1", "103:1"], why: "All that they used to do would have been of no benefit to them (6:88)." }
      ]
    },
    {
      slug: "worship-allah-and-be-grateful",
      title: "Worship Allah and be grateful",
      line: "Rather, worship Allah alone and be among the grateful.",
      facts: ["For him and his followers", "Sincere for Allah alone"],
      quote: q39(66),
      source: ik(66, "Ibn Kathir says the Prophet ﷺ and those who follow him should make their worship sincerely for Allah alone.", "should make your worship sincerely for Allah Alone"),
      difficulty: 1,
      questions: [
        { q: "What does 39:66 command?", a: "Worship Allah and be grateful", wrong: ["Rest and play", "Gather wealth", "Travel far"], why: "Nay! But worship Allah, and be among the grateful." },
        { q: "Who is addressed, per Ibn Kathir?", a: "Him and those who follow him", wrong: ["Only angels", "Only jinn", "No one"], why: "You and those who follow you and believe in you should make your worship sincerely for Allah Alone." },
        { tf: true, q: "Gratitude is part of worship.", why: "Nay! But worship Allah, and be among the grateful." }
      ]
    },
    {
      slug: "not-a-just-estimate",
      title: "Not a just estimate",
      line: "They did not honour Allah as He truly deserves.",
      facts: ["He is the Almighty", "He can do all things"],
      quote: q39(67),
      source: ik(67, "Ibn Abbas said whoever believes that Allah is able to do all things has made a just estimate of Allah.", "Whoever believes that Allah is able to do all things, has made a just estimate of Allah"),
      difficulty: 2,
      questions: [
        { q: "What did they not make, in 39:67?", a: "A just estimate of Allah", wrong: ["A house", "A treaty", "A journey"], why: "They made not a just estimate of Allah such as is due to Him." },
        { q: "Who makes a just estimate, per Ibn Abbas?", a: "One who believes Allah can do all", wrong: ["One who is rich", "One who is famous", "One who travels"], why: "Whoever believes that Allah is able to do all things, has made a just estimate of Allah such as is due to Him." },
        { q: "What did As-Suddi say they failed to do?", a: "Venerate Him as He deserves", wrong: ["Build towers", "Win wars", "Write poems"], why: "They did not venerate Him as He deserves to be venerated." }
      ]
    },
    {
      slug: "i-am-the-king",
      title: "I am the King",
      line: "Allah will say: I am the King; where are earth's kings?",
      facts: ["The earth in His grasp", "The heavens rolled up"],
      quote: q39(67),
      source: hadith("bukhari", "4812", "Abu Hurairah", "Sahih", "The Prophet ﷺ said Allah will hold the earth and roll up the heavens in His Right Hand, then say: I am the King; where are the kings of the earth?", "I am the King; where are the kings of the earth"),
      difficulty: 3,
      questions: [
        { q: "What will Allah say, in the hadith?", a: "I am the King", wrong: ["I am tired", "I am far", "I am one of many"], why: "And then He will say, I am the King; where are the kings of the earth?" },
        { q: "Whom will Allah ask about, in the hadith?", a: "The kings of the earth", wrong: ["The angels", "The Prophets", "The animals"], why: "I am the King; where are the kings of the earth?" },
        { tf: true, q: "All earthly kings are nothing before Allah.", why: "I am the King; where are the kings of the earth?" }
      ]
    },
    {
      slug: "the-trumpet-is-blown",
      title: "The Trumpet is blown",
      line: "The Trumpet is blown, all fall; blown again, they stand looking.",
      facts: ["All die except whom Allah wills", "Then all rise again"],
      quote: q39(68),
      source: ik(68, "Ibn Kathir says only the Ever Living will remain, and He will say: Whose is the kingdom this day? It is Allah's, the One, the Irresistible.", "there will be left only the Ever Living, Eternal One"),
      difficulty: 2,
      questions: [
        { q: "What happens at the first blowing, in 39:68?", a: "All swoon away", wrong: ["All sing", "All sleep", "All travel"], why: "All who are in the heavens and all who are on the earth will swoon away, except him whom Allah wills." },
        { q: "Who remains, per Ibn Kathir?", a: "Only the Ever Living", wrong: ["The kings", "The mountains", "The seas"], why: "There will be left only the Ever Living, Eternal One." },
        { q: "What happens at the next blowing, in 39:68?", a: "They stand, looking on", wrong: ["They sleep", "They vanish", "They run"], why: "Then it will be blown another time, and behold they will be standing, looking on." }
      ]
    },
    {
      slug: "first-to-raise-his-head",
      title: "First to raise his head",
      line: "The Prophet ﷺ will be first to rise, and see Musa.",
      facts: ["After the second blowing", "Musa holding the Throne"],
      quote: q39(68),
      source: hadith("bukhari", "4813", "Abu Hurairah", "Sahih", "The Prophet ﷺ said he will be the first to raise his head after the second blowing and will see Musa at the Throne.", "I will be the first to raise my head after the second blowing of the trumpet"),
      difficulty: 3,
      questions: [
        { q: "Who raises his head first, in the hadith?", a: "The Prophet ﷺ", wrong: ["Adam", "Nuh", "Isa"], why: "I will be the first to raise my head after the second blowing of the trumpet." },
        { q: "Whom will he see, in the hadith?", a: "Musa", wrong: ["Ibrahim", "Harun", "Yahya"], why: "And will see Moses hanging on the Throne." },
        { q: "After which blowing, in the hadith?", a: "The second", wrong: ["The first", "The fifth", "None"], why: "After the second blowing of the trumpet." }
      ]
    },
    {
      slug: "the-earth-shines",
      title: "The earth shines",
      line: "The earth shines with its Lord's light; the Book is set out.",
      facts: ["The Book of deeds", "Prophets and witnesses come"],
      quote: q39(69),
      source: ik(69, "Qatadah said the Book is the Book of deeds; Ibn Abbas said the Prophets testify they conveyed the Message.", "testifying that they conveyed the Message of Allah to them"),
      difficulty: 2,
      questions: [
        { q: "How does the earth shine, in 39:69?", a: "With the light of its Lord", wrong: ["With fire", "With the sun", "With lamps"], why: "And the earth will shine with the light of its Lord." },
        { q: "What is the Book, per Qatadah?", a: "The Book of deeds", wrong: ["A poem", "A map", "A history"], why: "Qatadah said, The Book of deeds." },
        { q: "What do the Prophets testify, per Ibn Abbas?", a: "That they conveyed the Message", wrong: ["That they were rich", "That they ruled", "Nothing"], why: "They will bear witness against the nations, testifying that they conveyed the Message of Allah to them." }
      ]
    },
    {
      slug: "judged-with-justice",
      title: "Judged with justice",
      line: "All are judged with truth; none is wronged at all.",
      facts: ["Even a mustard seed counts", "Good deeds doubled"],
      quote: q39(70),
      source: ik(70, "Ibn Kathir cites 21:47 and 4:40: none is treated unjustly, and a good deed is doubled.", "but if there is any good"),
      difficulty: 2,
      questions: [
        { q: "How are they judged, per Ibn Kathir?", a: "With justice", wrong: ["By luck", "By wealth", "By tribe"], why: "And it will be judged between them with truth, means, with justice." },
        { q: "What is weighed, per 21:47?", a: "Even a mustard seed", wrong: ["Only mountains", "Only gold", "Nothing small"], why: "And if there be the weight of a mustard seed, We will bring it (21:47)." },
        { q: "What happens to a good deed, per 4:40?", a: "Allah doubles it", wrong: ["It is lost", "It is halved", "It is ignored"], why: "But if there is any good done, He doubles it, and gives from Him a great reward (4:40)." }
      ]
    },
    {
      slug: "driven-in-groups",
      title: "Driven in groups",
      line: "The deniers are asked: did Messengers not come to you?",
      facts: ["Messengers came from among them", "They admit: yes"],
      quote: q39(71),
      source: ik(71, "Ibn Kathir says the Messengers were of their own kind, so they could have spoken to them and learned from them.", "so that you could have spoken to them and learned from them"),
      difficulty: 3,
      questions: [
        { q: "What do the keepers ask, in 39:71?", a: "Did Messengers not come to you?", wrong: ["Where is your gold?", "Who is your king?", "Are you tired?"], why: "Did not the Messengers come to you from yourselves, reciting to you the Ayat of your Lord?" },
        { q: "Why from yourselves, per Ibn Kathir?", a: "So you could learn from them", wrong: ["To be kings", "To trade", "For no reason"], why: "Of your own kind, so that you could have spoken to them and learned from them." },
        { q: "What do they answer, in 39:71?", a: "Yes", wrong: ["No", "We forgot", "Never"], why: "They will say: Yes, but the Word of torment has been justified against the disbelievers." }
      ]
    },
    {
      slug: "the-abode-of-the-arrogant",
      title: "The abode of the arrogant",
      line: "Their pride and refusal of truth led them to an evil abode.",
      facts: ["Pride is the cause", "All creation testifies it is just"],
      quote: q39(72),
      source: ik(72, "Ibn Kathir says their arrogance in this world and refusal to follow the truth led them to this evil destination.", "because of your arrogance in this world and your refusal to follow the truth"),
      difficulty: 3,
      questions: [
        { q: "Whose abode is it, in 39:72?", a: "The arrogant", wrong: ["The humble", "The poor", "The patient"], why: "And what an evil abode of the arrogant!" },
        { q: "What led them there, per Ibn Kathir?", a: "Arrogance and refusing the truth", wrong: ["Bad luck", "Poverty", "Illness"], why: "Because of your arrogance in this world and your refusal to follow the truth." },
        { tf: true, q: "Allah's judgement is completely just.", why: "In accordance with the judgement of the Most Just, the All-Knowing." }
      ]
    },
    {
      slug: "led-to-paradise-in-groups",
      title: "Led to Paradise in groups",
      line: "The God-fearing are led to Paradise in groups, the best first.",
      facts: ["Like with like", "Greeted with peace"],
      quote: q39(73),
      source: ik(73, "Ibn Kathir says they go in groups starting with the best; each group is with others like them.", "Each group will be with others like them"),
      difficulty: 1,
      questions: [
        { q: "How are they led, in 39:73?", a: "In groups", wrong: ["Alone", "In chains", "By force"], why: "And those who had Taqwa will be led to Paradise in groups." },
        { q: "Who goes first, per Ibn Kathir?", a: "The best of them", wrong: ["The youngest", "The richest", "The last"], why: "Starting with the best of them: those who are closest to Allah." },
        { q: "With whom is each group, per Ibn Kathir?", a: "Others like them", wrong: ["Strangers", "No one", "Kings"], why: "Each group will be with others like them, Prophets with Prophets, the true believers with their peers." }
      ]
    },
    {
      slug: "the-gate-opened-for-him",
      title: "The gate opened for him",
      line: "The keeper of Paradise will open first for the Prophet ﷺ.",
      facts: ["He knocks first", "No one enters before him"],
      quote: q39(73),
      source: hadith("muslim", "197", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said the keeper of Paradise will say: it is for you that I was ordered, not to open it for anyone before you.", "It is for thee that I have been ordered, and not to open it for anyone before thee"),
      difficulty: 3,
      questions: [
        { q: "What will the keeper ask, in the hadith?", a: "Who are you?", wrong: ["Where is your gold?", "Are you tired?", "Who sent you?"], why: "And the keeper would say: Who art thou? I would say: Muhammad." },
        { q: "Whom must the gate open for first?", a: "Muhammad ﷺ", wrong: ["Adam", "Ibrahim", "Musa"], why: "It is for thee that I have been ordered, and not to open it for anyone before thee." },
        { q: "Who narrated the hadith?", a: "Anas ibn Malik", wrong: ["Abu Jahl", "Abu Lahab", "Abu Sufyan"], why: "Anas b. Malik reported: The Messenger of Allah ﷺ said." }
      ]
    },
    {
      slug: "salam-alaykum",
      title: "Salam alaykum",
      line: "The keepers greet them: Peace be upon you, you did well!",
      facts: ["Gates opened in honour", "Paradise has eight gates"],
      quote: q39(73),
      source: ik(73, "Ibn Kathir says the gates will be opened as a sign of honour, and the gatekeepers will meet them with glad tidings and peace.", "the gates will be opened for them as a sign of honor"),
      difficulty: 2,
      questions: [
        { q: "What do the keepers say, in 39:73?", a: "Salam Alaykum", wrong: ["Go away", "Wait outside", "Who are you?"], why: "And its keepers will say: Salam Alaykum! You have done well, so enter to abide therein forever." },
        { q: "Why are the gates opened, per Ibn Kathir?", a: "As a sign of honour", wrong: ["By accident", "For trade", "For a while"], why: "The gates will be opened for them as a sign of honor." },
        { q: "How many gates has Paradise, per Ibn Kathir?", a: "Eight", wrong: ["Two", "Five", "Twelve"], why: "It is known from the Sahih Hadiths that Paradise has eight gates." }
      ]
    },
    {
      slug: "the-gate-of-ar-rayyan",
      title: "The gate of Ar-Rayyan",
      line: "Paradise has a gate called Ar-Rayyan, only for those who fast.",
      facts: ["Each good deed has a gate", "Fasting has Ar-Rayyan"],
      quote: q39(73),
      source: hadith("bukhari", "1896", "Sahl bin Sa'd", "Sahih", "The Prophet ﷺ said Paradise has a gate called Ar-Rayyan, and only those who fast will enter through it.", "There is a gate in Paradise called Ar-Raiyan, and those who observe fasts will enter through it"),
      difficulty: 3,
      questions: [
        { q: "What is the gate called, in the hadith?", a: "Ar-Rayyan", wrong: ["Al-Firdaws", "Al-Kawthar", "As-Salam"], why: "There is a gate in Paradise called Ar-Raiyan." },
        { q: "Who enters through it, in the hadith?", a: "Those who fast", wrong: ["Those who trade", "Those who sleep", "Everyone"], why: "Those who observe fasts will enter through it on the Day of Resurrection and none except them will enter through it." },
        { q: "Who narrated the hadith?", a: "Sahl bin Sa'd", wrong: ["Abu Jahl", "Abu Lahab", "Abu Sufyan"], why: "Narrated Sahl: The Prophet ﷺ said." }
      ]
    },
    {
      slug: "wudu-opens-eight-gates",
      title: "Wudu opens eight gates",
      line: "Good wudu then the shahadah opens all eight gates of Paradise.",
      facts: ["Wudu done well", "Then bearing witness"],
      quote: q39(73),
      source: hadith("muslim", "234", "Umar ibn al-Khattab", "Sahih", "The Prophet ﷺ said whoever does wudu well and bears witness to Allah and His Messenger, the eight gates of Paradise are opened for him.", "eight gates of Paradise would be opened for him and he may enter by whichever of them he wishes"),
      difficulty: 3,
      questions: [
        { q: "What opens for him, in the hadith?", a: "The eight gates of Paradise", wrong: ["One small door", "A window", "Nothing"], why: "Eight gates of Paradise would be opened for him and he may enter by whichever of them he wishes." },
        { q: "What comes first, in the hadith?", a: "Doing wudu well", wrong: ["Eating", "Sleeping", "Travelling"], why: "If anyone amongst you performs the ablution, and completes the ablution well." },
        { q: "Which gate may he enter, in the hadith?", a: "Whichever he wishes", wrong: ["Only the last", "Only the first", "None"], why: "He may enter by whichever of them he wishes." }
      ]
    },
    {
      slug: "praise-be-to-allah-who-kept-his-promise",
      title: "Allah kept His promise",
      line: "They say: praise be to Allah, Who kept His promise to us.",
      facts: ["They live where they wish", "An excellent reward"],
      quote: q39(74),
      source: ik(73, "Ibn Kathir says the gatekeepers tell them: your deeds and words were good, your efforts were good, and your reward is good.", "your deeds and words were good, and your efforts were good, and your reward is good"),
      difficulty: 2,
      questions: [
        { q: "What do they say, in 39:74?", a: "Praise be to Allah", wrong: ["We earned it alone", "We are tired", "Where are we?"], why: "All the praises and thanks be to Allah Who has fulfilled His promise to us." },
        { q: "Where can they dwell, in 39:74?", a: "Wherever they will in Paradise", wrong: ["In one room", "Outside", "Nowhere"], why: "We can dwell in Paradise where we will; how excellent a reward for the workers!" },
        { q: "What does you have done well mean, per Ibn Kathir?", a: "Your deeds and words were good", wrong: ["You were rich", "You were famous", "You were strong"], why: "Your deeds and words were good, and your efforts were good, and your reward is good." }
      ]
    },
    {
      slug: "angels-around-the-throne",
      title: "Angels around the Throne",
      line: "Angels surround the Throne, praising their Lord.",
      facts: ["Judgement with full justice", "All creation praises Allah"],
      quote: q39(75),
      source: ik(75, "Ibn Kathir says the angels surround the Throne glorifying their Lord, for He has judged in the fairest and most just manner.", "for He has passed judgement in the fairest and most just manner"),
      difficulty: 2,
      questions: [
        { q: "Where are the angels, in 39:75?", a: "Surrounding the Throne", wrong: ["In the sea", "In the market", "On mountains"], why: "And you will see the angels surrounding the Throne from all round, glorifying the praises of their Lord." },
        { q: "Why do they praise, per Ibn Kathir?", a: "He judged most justly", wrong: ["They are told to sing", "For fun", "They are tired"], why: "For He has passed judgement in the fairest and most just manner." },
        { tf: true, q: "Allah is never unjust.", why: "This is justice from Him and He is never unjust." }
      ]
    },
    {
      slug: "begun-and-ended-with-praise",
      title: "Begun and ended with praise",
      line: "Creation began with praise and ends with praise of Allah.",
      facts: ["6:1 begins with praise", "39:75 ends with praise"],
      quote: q39(75),
      source: ik(75, "Qatadah said Allah began His creation with praise, as in 6:1, and ended it with praise, as in 39:75.", "Allah began His creation with praise"),
      difficulty: 3,
      questions: [
        { q: "What is said at the end of 39:75?", a: "All praise to Allah, Lord of all", wrong: ["Farewell", "We are done", "Who is next?"], why: "And it will be said, All the praises and thanks be to Allah, the Lord of all that exists." },
        { q: "With what did creation begin, per Qatadah?", a: "Praise", wrong: ["Silence", "Fire", "Water"], why: "Allah began His creation with praise, as He said, All praises and thanks be to Allah, Who created the heavens and the earth (6:1)." },
        { q: "Who says the final praise, per Ibn Kathir?", a: "All of creation", wrong: ["One man", "Only kings", "No one"], why: "All of creation, whether animate or inanimate, will speak words of praise to Allah." }
      ]
    }
  ]
};
export const AZ_ZUMAR_UNITS: readonly DeepUnit[] = [ZUMAR_ONE, ZUMAR_TWO, ZUMAR_THREE, ZUMAR_FOUR];
