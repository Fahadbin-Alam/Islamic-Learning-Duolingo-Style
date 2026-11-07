import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah An-Naba ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on An-Naba 78:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_78_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on An-Naba 78:${ayah}`,
    url: `https://quran.com/78:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 78:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q78 = (ayah: number) => quranQuote(78, ayah);


/** Ayahs 1 to 16: the great news, and Allah's signs in the earth, sleep, night, day, sky, sun and rain. */
const NABA_ONE: DeepUnit = {
  key: "naba1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-78",
  name: "An-Naba, ayahs 1-16",
  kind: "skill",
  lessonType: "surah",
  surahName: "An-Naba",
  lessons: [
    {
      slug: "the-great-news",
      title: "The great news",
      line: "People argue about the great news: the Day of Judgement.",
      facts: ["An-Naba: the news", "Believers and deniers"],
      quote: q78(2),
      source: ik(2, "Ibn Kathir says they are asking about the Day of Judgement, which is the great news, and people split into believers and deniers.", "They are asking about the matter of the Day of Judgement, and it is the great news"),
      difficulty: 1,
      questions: [
        { q: "What is the great news, per Ibn Kathir?", a: "The Day of Judgement", wrong: ["A new king", "A good harvest", "A long trip"], why: "They are asking about the matter of the Day of Judgement, and it is the great news." },
        { q: "How are people divided about it?", a: "Believers and deniers", wrong: ["Rich and poor", "Old and young", "Near and far"], why: "There are those who believe in it and those who disbelieve in it." },
        { tf: false, q: "Everyone agreed about the Day of Judgement.", why: "About which they are in disagreement." }
      ]
    },
    {
      slug: "they-will-come-to-know",
      title: "They will come to know",
      line: "Allah repeats: they will surely come to know the truth.",
      facts: ["Kalla: nay", "Said twice for force"],
      quote: q78(4),
      source: ik(4, "Ibn Kathir says nay, they will come to know, said twice, is a direct warning to those who deny the Day.", "a direct warning"),
      difficulty: 1,
      questions: [
        { q: "What does Allah say twice in 78:4-5?", a: "They will come to know", wrong: ["They will win", "They will sleep", "They will forget"], why: "Nay, they will come to know! Nay, again, they will come to know!" },
        { q: "What is it, per Ibn Kathir?", a: "A direct warning", wrong: ["A riddle", "A song", "A greeting"], why: "This is a severe threat and a direct warning." },
        { tf: true, q: "The warning is for those who deny the Day of Judgement.", why: "Allah threatens those who deny the Day of Judgement." }
      ]
    },
    {
      slug: "the-earth-as-a-bed",
      title: "The earth as a bed",
      line: "Allah made the earth a firm, peaceful place to rest on.",
      facts: ["Mihad: a bed", "A sign of Allah's power"],
      quote: q78(6),
      source: ik(6, "Ibn Kathir says Allah made the earth an established, firm and peaceful resting place for people.", "an established, firm and peaceful resting place"),
      difficulty: 1,
      questions: [
        { q: "What did Allah make the earth, per 78:6?", a: "A bed", wrong: ["A wall", "A mirror", "A tent"], why: "Have We not made the earth as a bed?" },
        { q: "What kind of place is it, per Ibn Kathir?", a: "Firm and peaceful", wrong: ["Shaky and loud", "Dark and cold", "Empty and dry"], why: "An established, firm and peaceful resting place." },
        { tf: true, q: "Allah's signs in creation prove He can raise the dead.", why: "He brings this as a proof of His ability to do whatever He wishes concerning the matter of the Hereafter." }
      ]
    },
    {
      slug: "mountains-as-pegs",
      title: "Mountains as pegs",
      line: "Mountains are like pegs that hold the earth steady.",
      facts: ["Awtad: pegs", "A stable home"],
      quote: q78(7),
      source: ik(7, "Ibn Kathir says Allah made the mountains as pegs to hold the earth in place, so it does not quake.", "He made them as pegs for the earth to hold it in place"),
      difficulty: 1,
      questions: [
        { q: "What are the mountains, per 78:7?", a: "Pegs", wrong: ["Walls", "Towers", "Pillows"], why: "And the mountains as pegs?" },
        { q: "Why are they like pegs, per Ibn Kathir?", a: "To hold the earth in place", wrong: ["To block the sun", "To store water only", "To mark borders"], why: "He made them as pegs for the earth to hold it in place, make it stable and firm." },
        { tf: false, q: "Mountains make the earth unsuitable to live on.", why: "This is so that it may be suitable for dwelling and not quake with those who are in it." }
      ]
    },
    {
      slug: "created-in-pairs",
      title: "Created in pairs",
      line: "Allah made us in pairs, male and female, with love and mercy.",
      facts: ["Azwaj: pairs", "Ayah 30:21"],
      quote: q78(8),
      source: ik(8, "Ibn Kathir says created in pairs means male and female, like 30:21 which speaks of affection and mercy.", "male and female"),
      difficulty: 1,
      questions: [
        { q: "How did Allah create us, per 78:8?", a: "In pairs", wrong: ["All alone", "In threes", "Without families"], why: "And We have created you in pairs." },
        { q: "What did Allah put between spouses, per 30:21?", a: "Affection and mercy", wrong: ["Fear and doubt", "Silence", "Arguments"], why: "And He has put between you affection and mercy. (30:21)" },
        { tf: true, q: "Pairs in 78:8 means male and female.", why: "Meaning, male and female." }
      ]
    },
    {
      slug: "sleep-for-rest",
      title: "Sleep for rest",
      line: "Sleep is a gift that lets us rest from the day's work.",
      facts: ["Subat: rest", "A daily mercy"],
      quote: q78(9),
      source: ik(9, "Ibn Kathir says sleep is a stop of movement so we can rest from going about for our living during the day.", "a cessation of movement in order to attain rest"),
      difficulty: 1,
      questions: [
        { q: "What did Allah make sleep, per 78:9?", a: "A thing for rest", wrong: ["A waste of time", "A punishment", "A game"], why: "And We have made your sleep as a thing for rest." },
        { q: "What does sleep stop, per Ibn Kathir?", a: "Movement", wrong: ["Breathing", "The heart", "Thinking of Allah forever"], why: "A cessation of movement in order to attain rest." },
        { tf: true, q: "Sleep gives rest after seeking a living all day.", why: "To attain rest from the frequent repetition and going about in search of livelihood during the day." }
      ]
    },
    {
      slug: "the-bedtime-dua",
      title: "The bedtime dua",
      line: "Say Bismika amutu wa ahya at bedtime; praise Allah on waking.",
      facts: ["Bismika amutu wa ahya", "Alhamdulillah on waking"],
      quote: q78(9),
      source: hadith("bukhari", "6312", "Hudhayfah", "Sahih", "When the Prophet ﷺ went to bed he said Bismika amutu wa ahya, and on waking he praised Allah who gave us life again.", "Bismika amutu wa ahya"),
      difficulty: 2,
      questions: [
        { q: "What did he say when going to bed?", a: "Bismika amutu wa ahya", wrong: ["Allahu Akbar", "Ameen", "Ya Rabb"], why: "When the Prophet ﷺ went to bed, he would say: Bismika amutu wa ahya." },
        { q: "What did he say on waking?", a: "Alhamdulillah who gave us life", wrong: ["Good morning", "Nothing", "Let me sleep"], why: "Al-hamdu li l-lahil-ladhi ahyana ba'da ma amatana wa ilaihin-nushur." },
        { tf: false, q: "He said nothing when he woke up.", why: "And when he got up he would say: Al-hamdu li l-lahil-ladhi ahyana." }
      ]
    },
    {
      slug: "night-and-day",
      title: "Night and day",
      line: "Night covers us for rest; day is for earning a living.",
      facts: ["Libas: a covering", "Ma'ash: livelihood"],
      quote: q78(11),
      source: ik(11, "Ibn Kathir says the night's darkness covers people, and the day is bright so they can go about for their livelihood.", "By it they are able to come and go for their livelihood"),
      difficulty: 1,
      questions: [
        { q: "What is the night, per 78:10?", a: "A covering", wrong: ["A wall", "A road", "A storm"], why: "And We have made the night as a covering." },
        { q: "What is the day for, per 78:11?", a: "Livelihood", wrong: ["Only sleep", "Only games", "Nothing"], why: "And We have made the day for livelihood." },
        { tf: true, q: "Qatadah called the night a tranquil residence.", why: "Qatadah commented, meaning, a tranquil residence." }
      ]
    },
    {
      slug: "seven-heavens-and-a-lamp",
      title: "Seven heavens and a lamp",
      line: "Above us are seven strong heavens and the shining sun.",
      facts: ["Sab'an shidada: seven strong", "Siraj: a lamp"],
      quote: q78(13),
      source: ik(13, "Ibn Kathir says the shining lamp is the radiant sun that gives light to all the world.", "the radiant sun that gives light to all of the world"),
      difficulty: 1,
      questions: [
        { q: "What did Allah build above us, per 78:12?", a: "Seven strong heavens", wrong: ["Two roofs", "Ten towers", "One cloud"], why: "And We have built above you seven strong." },
        { q: "What is the shining lamp, per Ibn Kathir?", a: "The sun", wrong: ["The moon", "A star", "A fire"], why: "Meaning, the radiant sun that gives light to all of the world." },
        { tf: true, q: "The heavens are adorned with stars.", why: "The seven heavens in their vastness, loftiness, perfection, precision, and adornment with both stable and moving stars." }
      ]
    },
    {
      slug: "rain-from-the-clouds",
      title: "Rain from the clouds",
      line: "Allah pours down plenty of rain from heavy clouds.",
      facts: ["Mu'sirat: rain clouds", "Thajjaj: pouring"],
      quote: q78(14),
      source: ik(14, "Ibn Abbas said Mu'sirat are the clouds; Mujahid and Qatadah said Thajjaj means poured out.", "Thajjaj means poured out"),
      difficulty: 2,
      questions: [
        { q: "What are the Mu'sirat, per Ibn Abbas?", a: "The clouds", wrong: ["The mountains", "The rivers", "The stars"], why: "Ibn Abbas said, From the Mu'sirat means from the clouds." },
        { q: "What does Thajjaj mean, per Mujahid?", a: "Poured out", wrong: ["Frozen", "Salty", "Hidden"], why: "Mujahid, Qatadah, and Ar-Rabi bin Anas all said, Thajjaj means poured out." },
        { tf: true, q: "Ibn Zayd said Thajjaj means abundant.", why: "Ibn Zayd said, Abundant." }
      ]
    },
    {
      slug: "the-rain-dua",
      title: "The rain dua",
      line: "When it rained, the Prophet ﷺ asked for a strong, fruitful rain.",
      facts: ["Sayyiban nafi'an", "Rain is a mercy"],
      quote: q78(14),
      source: hadith("bukhari", "1032", "Aishah", "Sahih", "Whenever the Prophet ﷺ saw rain, he said: O Allah, let it be a strong, fruitful rain.", "O Allah! Let it be a strong fruitful rain"),
      difficulty: 1,
      questions: [
        { q: "What did he say when he saw rain?", a: "O Allah, a strong fruitful rain", wrong: ["Stop the rain", "Bring the sun", "Nothing"], why: "Whenever Allah's Messenger saw the rain, he used to say, O Allah! Let it be a strong fruitful rain." },
        { q: "Who told us about this dua?", a: "Aishah", wrong: ["Umar", "Bilal", "Abu Jahl"], why: "Narrated Aishah: Whenever Allah's Messenger saw the rain." },
        { tf: true, q: "We can ask Allah to make rain beneficial.", why: "O Allah! Let it be a strong fruitful rain." }
      ]
    },
    {
      slug: "grains-and-gardens",
      title: "Grains and gardens",
      line: "Rain brings grains, vegetables and thick gardens of fruit.",
      facts: ["Habb: grains", "Alfaf: thick, gathered"],
      quote: q78(16),
      source: ik(15, "Ibn Kathir says Allah brings out great abundance, goodness, benefit and blessing through this water.", "so that We may bring out great abundance, goodness, benefit, and blessing through this water"),
      difficulty: 1,
      questions: [
        { q: "What grows from the rain, per 78:15?", a: "Grains and vegetation", wrong: ["Stones", "Metal", "Sand only"], why: "That We may produce therewith grains and vegetations." },
        { q: "What does Alfaf mean, per Ibn Abbas?", a: "Gathered", wrong: ["Dry", "Empty", "Far apart"], why: "Ibn Abbas and other said, Alfaf means gathered." },
        { tf: true, q: "Gardens have fruits of many colors, tastes and smells.", why: "Gardens of various fruits, differing colors, and a wide variety of tastes and fragrances." }
      ]
    }
  ]
};

/** Ayahs 17 to 30: the fixed Day, the Trumpet, the mountains like a mirage, and every deed recorded. */
const NABA_TWO: DeepUnit = {
  key: "naba2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-78",
  name: "An-Naba, ayahs 17-30",
  kind: "skill",
  lessonType: "surah",
  surahName: "An-Naba",
  lessons: [
    {
      slug: "a-fixed-time",
      title: "A fixed time",
      line: "The Day of Decision has a set time that only Allah knows.",
      facts: ["Miqat: an appointed time", "Ayah 11:104"],
      quote: q78(17),
      source: ik(17, "Ibn Kathir says the Day of Decision has a set appointment that cannot be moved, and no one knows its time except Allah.", "No one knows its exact time except Allah"),
      difficulty: 1,
      questions: [
        { q: "What is the Day of Decision, per 78:17?", a: "A fixed time", wrong: ["A rumor", "A dream", "A festival"], why: "Verily, the Day of Decision is a fixed time." },
        { q: "Who knows its exact time?", a: "Only Allah", wrong: ["The astronomers", "The kings", "The poets"], why: "No one knows its exact time except Allah." },
        { tf: false, q: "The Day's time can be moved earlier or later.", why: "Its time cannot be added to or decreased." }
      ]
    },
    {
      slug: "coming-in-crowds",
      title: "Coming in crowds",
      line: "At the Trumpet, each nation comes with its Messenger.",
      facts: ["As-Sur: the Trumpet", "Afwaj: crowds"],
      quote: q78(18),
      source: ik(18, "Mujahid said crowds means groups after groups; Ibn Jarir said each nation will come with its Messenger.", "each nation will come with its Messenger"),
      difficulty: 2,
      questions: [
        { q: "How will people come forth, per 78:18?", a: "In crowds", wrong: ["One by one alone", "In boats", "On horses"], why: "The Day when the Trumpet will be blown, and you shall come forth in crowds." },
        { q: "With whom will each nation come, per Ibn Jarir?", a: "Its Messenger", wrong: ["Its king", "Its army", "Its poets"], why: "This means that each nation will come with its Messenger." },
        { tf: true, q: "Mujahid explained crowds as groups after groups.", why: "Mujahid said, Groups after groups." }
      ]
    },
    {
      slug: "between-the-two-blowings",
      title: "Between the two blowings",
      line: "Forty pass between the two blowings; then all are raised.",
      facts: ["Two blowings of the Trumpet", "Raised like plants grow"],
      quote: q78(18),
      source: hadith("bukhari", "4935", "Abu Hurairah", "Sahih", "The Prophet ﷺ said between the two blowings is forty; then Allah sends water from the sky and bodies grow like plants grow.", "Allah will send water from the sky and then the dead bodies will grow like vegetation grows"),
      difficulty: 3,
      questions: [
        { q: "What is between the two blowings?", a: "Forty", wrong: ["Seven", "One hundred", "Three"], why: "Between the two sounds of the trumpet, there will be forty." },
        { q: "Did Abu Hurairah say forty of what?", a: "No, he refused to say", wrong: ["Yes, forty days", "Yes, forty years", "Yes, forty months"], why: "Somebody asked Abu Huraira, Forty days? But he refused to reply." },
        { tf: true, q: "Allah will send water and people will grow like plants.", why: "Allah will send water from the sky and then the dead bodies will grow like vegetation grows." }
      ]
    },
    {
      slug: "mountains-like-a-mirage",
      title: "Mountains like a mirage",
      line: "The sky opens like gates and mountains become like a mirage.",
      facts: ["Abwab: gates", "Sarab: a mirage"],
      quote: q78(20),
      source: ik(20, "Ibn Kathir says the mountains will look like something but be nothing, then be removed with no trace left.", "they appear to the one who looks at them as if they are something, but they are actually nothing"),
      difficulty: 2,
      questions: [
        { q: "What will the heaven become, per 78:19?", a: "As gates", wrong: ["As a wall", "As a lake", "As a tent"], why: "And the heaven shall be opened, and it will become as gates." },
        { q: "What will the mountains be like, per 78:20?", a: "A mirage", wrong: ["Gold", "Ice", "Trees"], why: "They will be as if they were a mirage." },
        { tf: true, q: "The gates in the sky are paths for angels to descend.", why: "Meaning, paths, and routes for the descending of the angels." }
      ]
    },
    {
      slug: "hell-lies-in-wait",
      title: "A place of waiting",
      line: "Hell waits, ready, for those who rebel against the Messengers.",
      facts: ["Mirsad: a place of waiting", "Ahqab: long ages of time"],
      quote: q78(21),
      source: ik(21, "Ibn Kathir says Hell is waiting in preparation for the Taghun, the rejectors who oppose the Messengers, as their final home.", "it is waiting in preparation"),
      difficulty: 2,
      questions: [
        { q: "What is Hell, per 78:21?", a: "A place of ambush", wrong: ["A place of rest", "A garden", "An empty land"], why: "Truly, Hell is a place of ambush, meaning, it is waiting in preparation." },
        { q: "Who are the Taghun, per Ibn Kathir?", a: "Rejectors who oppose the Messengers", wrong: ["The angels", "The pious", "Travellers"], why: "These are the disobedient rejectors who oppose the Messengers." },
        { tf: false, q: "Ahqab means a short moment.", why: "Huqb means a period of time." }
      ]
    },
    {
      slug: "nothing-cool-to-drink",
      title: "Nothing cool to drink",
      line: "In the Fire the deniers find no coolness and no good drink.",
      facts: ["Bard: coolness", "Ask Allah for safety"],
      quote: q78(24),
      source: ik(24, "Ibn Kathir says they will find no coolness for their hearts and no good drink, and asks Allah to save us from that.", "they will not find any coolness in Hell for their hearts, nor any good drink"),
      difficulty: 2,
      questions: [
        { q: "What will they not taste, per 78:24?", a: "Anything cool, or any drink", wrong: ["Any sweets", "Any fruit", "Any bread"], why: "Nothing cool shall they taste therein, nor any drink." },
        { q: "What does Ibn Kathir ask after this?", a: "That Allah saves us from it", wrong: ["For more wealth", "For rain", "For a long life"], why: "May Allah save us from that by His beneficence and grace." },
        { tf: true, q: "No coolness reaches their hearts in the Fire.", why: "They will not find any coolness in Hell for their hearts." }
      ]
    },
    {
      slug: "an-exact-recompense",
      title: "An exact recompense",
      line: "Allah is perfectly just: each gets what his deeds earned.",
      facts: ["Jaza'an wifaqa: an exact match", "Allah wrongs no one"],
      quote: q78(26),
      source: ik(26, "Ibn Kathir says what happens to them matches exactly the deeds they did in this life.", "in accordance with their wicked deeds, which they were doing in this life"),
      difficulty: 2,
      questions: [
        { q: "What kind of recompense is it, per 78:26?", a: "An exact recompense", wrong: ["A random one", "A doubled one", "None at all"], why: "An exact recompense." },
        { q: "Why did they not prepare, per 78:27?", a: "They expected no reckoning", wrong: ["They were too busy", "They were too young", "They were ill"], why: "For verily, they used not to look for a reckoning." },
        { tf: false, q: "Some will be punished for more than they did.", why: "In accordance with their wicked deeds, which they were doing in this life." }
      ]
    },
    {
      slug: "everything-is-recorded",
      title: "Everything is recorded",
      line: "Allah has written every deed in a Book.",
      facts: ["Kitab: a Book", "Nothing is missed"],
      quote: q78(29),
      source: ik(29, "Ibn Kathir says Allah knows the deeds of all creatures and has written them, and will reward them by them.", "surely We know the deeds of all of the creatures"),
      difficulty: 1,
      questions: [
        { q: "What has Allah recorded, per 78:29?", a: "All things", wrong: ["Only big things", "Only good things", "Nothing"], why: "And all things We have recorded in a Book." },
        { q: "How are people rewarded, per Ibn Kathir?", a: "Based on their deeds", wrong: ["By luck", "By their looks", "By their wealth"], why: "We have written these deeds for them. We will reward them based upon this." },
        { tf: true, q: "Good deeds bring a good reward.", why: "If their deeds were good then their reward will be good." }
      ]
    },
    {
      slug: "no-one-wronged",
      title: "No one is wronged",
      line: "No one pays for a sin not done; no deed is lost.",
      facts: ["As-Sa'di explains", "A perfect record"],
      quote: q78(29),
      source: saadi(78, 29, "As-Sa'di says every deed is written in the Preserved Tablet, so no one is punished for a sin they did not do, and not one atom of a deed is lost or forgotten.", "فلا يخشى المجرمون أنا عذبناهم بذنوب لم يعملوها"),
      difficulty: 2,
      questions: [
        { q: "Can anyone be punished for a sin they did not do?", a: "No, never", wrong: ["Yes, often", "Only sometimes", "Only on Fridays"], why: "Every deed is written, so no one is punished for what they did not do, says as-Sa'di." },
        { q: "How much of a deed is ever lost?", a: "Not even an atom", wrong: ["Half", "Most of it", "The small ones"], why: "Not one atom of it is lost or forgotten." },
        { tf: true, q: "Allah wrongs no one on Judgment Day.", why: "They wronged themselves. As-Sa'di on 78:26-29." }
      ]
    },
    {
      slug: "good-intentions-written",
      title: "Good intentions are written",
      line: "Even a good deed you only intend is written for you.",
      facts: ["Ten to seven hundred times", "Allah's generosity"],
      quote: q78(29),
      source: hadith("bukhari", "6491", "Ibn Abbas", "Sahih", "Allah writes a full good deed for one who intends good, and ten to seven hundred times or more if he does it; a bad deed held back is written as good.", "If somebody intends to do a good deed and he does not do it, then Allah will write for him a full good deed"),
      difficulty: 3,
      questions: [
        { q: "What if you intend good but do not do it?", a: "A full good deed is written", wrong: ["Nothing is written", "A bad deed is written", "Half a deed"], why: "If somebody intends to do a good deed and he does not do it, then Allah will write for him a full good deed." },
        { q: "How much for a good deed you do?", a: "Ten to seven hundred times or more", wrong: ["Just one", "Two times", "Five times"], why: "From ten to seven hundred times to many more times." },
        { tf: true, q: "A bad deed you hold back from is written as a good deed.", why: "If somebody intended to do a bad deed and he does not do it, then Allah will write a full good deed." }
      ]
    },
    {
      slug: "so-taste-it",
      title: "No increase but punishment",
      line: "Deniers are told their punishment will only increase.",
      facts: ["Dhuqu: taste", "Turn back to Allah now"],
      quote: q78(30),
      source: ik(30, "Ibn Kathir says the people of the Fire are told they will be given no increase except in punishment, matching their sins.", "We will never increase you in anything except torment according to its type"),
      difficulty: 3,
      questions: [
        { q: "What increase do they get, per 78:30?", a: "Only more punishment", wrong: ["More time", "More food", "Forgiveness"], why: "So taste you. No increase shall We give you, except in torment." },
        { q: "What did Abdullah bin Amr say of 78:30?", a: "No ayah on the Fire is harsher", wrong: ["The ayah is about Jannah", "The ayah came last", "The ayah is about rain"], why: "Allah did not reveal any Ayah against the people of the Hellfire worse than this Ayah." },
        { tf: false, q: "Their punishment will slowly fade away.", why: "They will continue increasing in torment forever." }
      ]
    }
  ]
};

/** Ayahs 31 to 40: the success of the pious, no idle talk, speaking only with permission, and the Day of deeds. */
const NABA_THREE: DeepUnit = {
  key: "naba3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-78",
  name: "An-Naba, ayahs 31-40",
  kind: "skill",
  lessonType: "surah",
  surahName: "An-Naba",
  lessons: [
    {
      slug: "success-for-the-pious",
      title: "Success for the pious",
      line: "The pious win gardens of palms and vines in Jannah.",
      facts: ["Mafaz: success", "Hada'iq: gardens"],
      quote: q78(31),
      source: ik(31, "Ibn Abbas said the success is a place of enjoyable recreation; Hada'iq are gardens of palm trees and more.", "A place of enjoyable recreation"),
      difficulty: 1,
      questions: [
        { q: "What is for the pious, per 78:31?", a: "Success", wrong: ["Hardship", "Silence", "Nothing"], why: "Verily, for those who have Taqwa, there will be a success." },
        { q: "What are Hada'iq, per Ibn Kathir?", a: "Gardens of palm trees", wrong: ["Rivers of ice", "Desert tents", "Stone towers"], why: "And Hada'iq are gardens of palm trees and other things." },
        { tf: true, q: "Mujahid said the pious are saved from the Fire.", why: "Mujahid and Qatadah both said, They are successful and thus, they are saved from the Hellfire." }
      ]
    },
    {
      slug: "vineyards-and-companions",
      title: "Vineyards and companions",
      line: "Jannah has vineyards, and companions all of one age.",
      facts: ["A'nab: grapevines", "Atrab: equal in age"],
      quote: q78(33),
      source: ik(33, "Ibn Kathir says Jannah has vineyards, and its companions are equal in age, all of one age.", "This means that they will only have one age"),
      difficulty: 2,
      questions: [
        { q: "What grows in Jannah, per 78:32?", a: "Gardens and vineyards", wrong: ["Thorns", "Only grass", "Nothing"], why: "Hada'iq and vineyards." },
        { q: "What does Atrab mean?", a: "Equal in age", wrong: ["Very old", "Very young", "Far away"], why: "Equal in age. This means that they will only have one age." },
        { tf: true, q: "Hada'iq are gardens of palm trees and more.", why: "And Hada'iq are gardens of palm trees and other things." }
      ]
    },
    {
      slug: "a-full-cup",
      title: "A full cup",
      line: "In Jannah their cups are always full.",
      facts: ["Dihaq: full", "Pure and plenty"],
      quote: q78(34),
      source: ik(34, "Ibn Abbas said Dihaq means continuously filled; Ikrimah said pure; Mujahid and others said completely filled.", "This means completely filled"),
      difficulty: 1,
      questions: [
        { q: "What does Dihaq mean, per Mujahid?", a: "Completely filled", wrong: ["Half empty", "Broken", "Very small"], why: "Mujahid, Al-Hasan, Qatadah, and Ibn Zayd all said, This means completely filled." },
        { q: "What did Ikrimah say Dihaq means?", a: "Pure", wrong: ["Old", "Heavy", "Hot"], why: "Ikrimah said, Pure." },
        { tf: false, q: "The cups of Jannah run empty.", why: "Ibn Abbas said, Continuously filled." }
      ]
    },
    {
      slug: "no-idle-talk",
      title: "No idle talk",
      line: "In Jannah there is no useless talk and no lying.",
      facts: ["Laghw: idle talk", "The abode of peace"],
      quote: q78(35),
      source: ik(35, "Ibn Kathir says there will be no vain, worthless speech in Jannah and no lying; it is the abode of peace.", "there will not be any vain, worthless speech therein, nor any sinful lying"),
      difficulty: 1,
      questions: [
        { q: "What will they not hear, per 78:35?", a: "Laghw nor lying", wrong: ["Birds", "Greetings", "Water"], why: "No Laghw shall they hear therein, nor lying." },
        { q: "What is Jannah called, per Ibn Kathir?", a: "The abode of peace", wrong: ["The house of noise", "The land of tests", "The city of work"], why: "Rather, it will be the abode of peace." },
        { tf: true, q: "Everything in Jannah is free of faults.", why: "Everything that is in it will be free of any shortcomings." }
      ]
    },
    {
      slug: "say-good-or-stay-silent",
      title: "Say good or stay silent",
      line: "A believer says what is good or keeps quiet.",
      facts: ["Guard your tongue", "Be kind to neighbors and guests"],
      quote: q78(35),
      source: hadith("bukhari", "6018", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said whoever believes in Allah and the Last Day should not harm his neighbor, should honor his guest, and should say good or keep quiet.", "should talk what is good or keep quiet"),
      difficulty: 1,
      questions: [
        { q: "What should a believer say, per the hadith?", a: "What is good, or stay quiet", wrong: ["Whatever he wants", "Only jokes", "Nothing ever"], why: "Anybody who believes in Allah and the Last Day should talk what is good or keep quiet." },
        { q: "How should a believer treat his guest?", a: "Generously", wrong: ["Rudely", "Coldly", "Not at all"], why: "Anybody who believes in Allah and the Last Day should entertain his guest generously." },
        { tf: false, q: "Harming a neighbor is fine if he is a stranger.", why: "Anybody who believes in Allah and the Last Day should not harm his neighbor." }
      ]
    },
    {
      slug: "a-sufficient-gift",
      title: "A sufficient gift",
      line: "Jannah is a gift from Allah's favor, full and plenty.",
      facts: ["Ata': a gift", "Hasbi Allah: Allah is enough"],
      quote: q78(36),
      source: ik(36, "Ibn Kathir says the reward is a kindness, mercy and gift from Allah, sufficient and abundant.", "It will be sufficient, suitable, comprehensive and abundant"),
      difficulty: 2,
      questions: [
        { q: "From whom is the gift, per 78:36?", a: "From your Lord", wrong: ["From kings", "From friends", "From traders"], why: "Rewarded from your Lord with a sufficient gift." },
        { q: "How do they receive it, per Ibn Kathir?", a: "By His favor", wrong: ["By buying it", "By force", "By chance"], why: "They will be given it by His favor and from Him." },
        { tf: true, q: "The saying Allah is sufficient for me comes from the same word.", why: "From this comes the saying, Allah is sufficient for me." }
      ]
    },
    {
      slug: "only-with-his-permission",
      title: "Only with His permission",
      line: "No one, not even angels, speaks before Allah without permission.",
      facts: ["Idhn: permission", "Ayah 2:255"],
      quote: q78(37),
      source: ik(37, "Ibn Kathir says no one is able to begin addressing Allah except by His permission, like Ayat al-Kursi says.", "no one is able to begin addressing Him except by His permission"),
      difficulty: 2,
      questions: [
        { q: "Who is the Lord in 78:37?", a: "Of the heavens and the earth", wrong: ["Of one city", "Of the sea only", "Of the stars only"], why: "The Lord of the heavens and the earth, and whatsoever is in between them, the Most Gracious." },
        { q: "Which ayah says none intercedes without His permission?", a: "2:255", wrong: ["1:1", "112:1", "36:1"], why: "Who is he that can intercede with Him except with His permission? (2:255)" },
        { tf: false, q: "Anyone may speak before Allah on that Day as he likes.", why: "On the Day when it comes, no person shall speak except by His leave. (11:105)" }
      ]
    },
    {
      slug: "ar-ruh-and-the-angels",
      title: "Ar-Ruh and the angels in rows",
      line: "Jibril and the angels stand in rows that Day.",
      facts: ["Ar-Ruh: Jibril", "The noblest angel"],
      quote: q78(38),
      source: ik(38, "Ash-Shabi and others said Ar-Ruh is the angel Jibril; Muqatil said he is the noblest of the angels.", "The word Ruh here is referring to the angel Jibril"),
      difficulty: 2,
      questions: [
        { q: "Who is Ar-Ruh, per Ash-Shabi?", a: "The angel Jibril", wrong: ["A wind", "A prophet", "A star"], why: "The word Ruh is referring to the angel Jibril." },
        { q: "How will the angels stand, per 78:38?", a: "In rows", wrong: ["Scattered", "Sitting", "Hidden"], why: "The Day that Ar-Ruh and the angels will stand forth in rows." },
        { tf: true, q: "Muqatil said Ar-Ruh brings the revelation.", why: "The Ruh is the noblest of the angels, the closest of them to the Lord, and the one who delivers the revelation." }
      ]
    },
    {
      slug: "the-true-day",
      title: "The True Day",
      line: "The Day will come, so seek a path to your Lord.",
      facts: ["Al-Yawm al-Haqq", "Choose your path"],
      quote: q78(39),
      source: ik(39, "Ibn Kathir says the True Day will surely come, so whoever wills should seek a place of return and a path to Allah.", "a place of return, a path that leads to Him"),
      difficulty: 1,
      questions: [
        { q: "What is the Day called in 78:39?", a: "The True Day", wrong: ["The Long Night", "The Lost Day", "The New Year"], why: "That is the True Day." },
        { q: "What should whoever wills seek?", a: "A place with his Lord", wrong: ["A palace", "A crown", "A ship"], why: "So, whosoever wills, let him seek a place with His Lord!" },
        { tf: true, q: "The True Day will come to pass with no escape.", why: "It will come to pass and there is no avoiding it." }
      ]
    },
    {
      slug: "seeing-what-hands-sent",
      title: "Seeing what our hands sent forth",
      line: "That Day each person sees every deed he sent ahead.",
      facts: ["Qaddamat yadah: what he sent", "Old and new deeds"],
      quote: q78(40),
      source: ik(40, "Ibn Kathir says all of a person's deeds, good and bad, old and new, will be presented to him.", "all of his deeds will be presented to him"),
      difficulty: 2,
      questions: [
        { q: "What will man see, per 78:40?", a: "What his hands sent forth", wrong: ["His old house", "His friends", "The stars"], why: "The Day when man will see that which his hands have sent forth." },
        { q: "Which deeds will be shown, per Ibn Kathir?", a: "Good and bad, old and new", wrong: ["Only good", "Only bad", "Only new"], why: "All of his deeds will be presented to him, the good and bad, and the old and new." },
        { tf: true, q: "The Day is called near because everything coming will come.", why: "Its occurrence has become close, because everything that is coming will certainly come to pass." }
      ]
    },
    {
      slug: "what-comes-is-near",
      title: "What comes is near",
      line: "Everything that is surely coming is close, so get ready now.",
      facts: ["As-Sa'di explains", "Prepare today"],
      quote: q78(40),
      source: saadi(78, 40, "As-Sa'di says the warned Day is near because everything that is coming is near, so a person should look now, in this world, at what he is sending ahead.", "وكل ما هو آت فهو قريب"),
      difficulty: 2,
      questions: [
        { q: "Why is the Day called near in An-Naba?", a: "All that is coming is near", wrong: ["It is tomorrow", "It already came", "No reason"], why: "Everything that is coming is near, says as-Sa'di." },
        { q: "When should we look at our deeds?", a: "Now, in this world", wrong: ["Only when old", "After death", "Never"], why: "Look now at what you send ahead." },
        { tf: true, q: "Whoever wishes can take a path back to his Lord.", why: "By good deeds. As-Sa'di on 78:39." }
      ]
    },
    {
      slug: "even-the-animals",
      title: "Even the animals get justice",
      line: "Allah's justice is so full that even animals get their rights.",
      facts: ["Al-Adl: justice", "Every right restored"],
      quote: q78(40),
      source: hadith("muslim", "2582", "Abu Hurairah", "Sahih", "The Prophet ﷺ said rights will be restored on the Day of Resurrection, even the hornless sheep will claim against the horned one.", "even the hornless sheep will lay claim upon the horned one"),
      difficulty: 2,
      questions: [
        { q: "What will happen to rights, per the hadith?", a: "They will be restored", wrong: ["They will be forgotten", "They will be sold", "They will be hidden"], why: "Rights will certainly be restored to those entitled to them on the Day of Resurrection." },
        { q: "Which animal claims its right?", a: "The hornless sheep", wrong: ["The lion", "The eagle", "The fish"], why: "Even the hornless sheep will lay claim upon the horned one." },
        { tf: true, q: "Allah judges between the animals with justice.", why: "He will rectify matters between them with His just wisdom that does not wrong anyone." }
      ]
    }
  ]
};

export const NABA_UNITS: readonly DeepUnit[] = [NABA_ONE, NABA_TWO, NABA_THREE];
