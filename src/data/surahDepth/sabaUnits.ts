import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Saba ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Saba 34:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_34_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Saba 34:${ayah}`,
    url: `https://quran.com/34:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 34:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q34 = (ayah: number) => quranQuote(34, ayah);

/** Ayahs 1 to 21: all praise to Allah, the Hour will come, Dawud and Sulayman, and the people of Saba and their dam. */
const SABA_ONE: DeepUnit = {
  key: "saba1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-34",
  name: "Saba, ayahs 1 to 21",
  kind: "skill",
  lessonType: "surah",
  surahName: "Saba",
  lessons: [
    {
      slug: "all-praise-in-both-worlds",
      title: "All praise in both worlds",
      line: "All praise is for Allah, now and in the Hereafter.",
      facts: ["He owns the heavens and earth", "He is All-Wise, All-Aware"],
      quote: q34(1),
      source: ik(1, "All praise belongs to Allah in this world and the next, for He is the Giver of everything.", "all praise belongs to Him alone in this world and in the Hereafter"),
      difficulty: 2,
      questions: [
        { q: "To whom is all praise due, in 34:1?", a: "Allah", wrong: ["Kings", "Angels", "Ancestors"], why: "All praise is due to Allah, to Whom belongs all that is in the heavens." },
        { q: "When is He praised, per Ibn Kathir?", a: "In this world and the next", wrong: ["Only on Friday", "Only in Ramadan", "Only at night"], why: "All praise belongs to Him alone in this world and in the Hereafter." },
        { q: "What does All-Aware mean, per Ibn Kathir?", a: "Nothing is hidden from Him", wrong: ["He sleeps a little", "He forgets", "He guesses"], why: "From Whom nothing at all is hidden or concealed." }
      ]
    },
    {
      slug: "what-goes-in-and-out",
      title: "What goes in and out",
      line: "He knows what sinks into earth and what rises to the sky.",
      facts: ["Every raindrop and seed", "Good deeds rise to Him"],
      quote: q34(2),
      source: ik(2, "Allah knows the number of raindrops that sink into the earth and the seeds sown, and what rises up, like good deeds.", "He knows the number of raindrops that sink into the depths of the earth"),
      difficulty: 3,
      questions: [
        { q: "What does Allah know, in 34:2?", a: "What goes into the earth", wrong: ["Only the sky", "Only the past", "Nothing hidden"], why: "He knows that which goes into the earth and that which comes forth from it." },
        { q: "What does He count, per Ibn Kathir?", a: "Raindrops in the earth", wrong: ["Only stars", "Only people", "Only coins"], why: "He knows the number of raindrops that sink into the depths of the earth." },
        { q: "What ascends to the heaven, per Ibn Kathir?", a: "Righteous deeds", wrong: ["Dust only", "Smoke", "Birds only"], why: "And what ascends into it, i.e., righteous deeds and other things." }
      ]
    },
    {
      slug: "yes-by-my-lord",
      title: "Yes, by my Lord",
      line: "Say: Yes, by my Lord, the Hour will surely come to you.",
      facts: ["One of three such oaths", "Not a speck escapes His knowledge"],
      quote: q34(3),
      source: ik(3, "This is one of three ayahs where Allah tells His Messenger ﷺ to swear by his Lord that the Hour will come.", "This is one of three Ayat"),
      difficulty: 3,
      questions: [
        { q: "What did deniers say, in 34:3?", a: "The Hour will not come", wrong: ["The Hour is here", "We are ready", "We believe"], why: "The Hour will not come to us." },
        { q: "How many such oaths are there, per Ibn Kathir?", a: "Three", wrong: ["One", "Seven", "Ten"], why: "This is one of three Ayat – there is no fourth." },
        { q: "What escapes His knowledge, in 34:3?", a: "Not even a speck of dust", wrong: ["The oceans", "The far stars", "Small secrets"], why: "Not even the weight of a speck of dust... escapes His knowledge." }
      ]
    },
    {
      slug: "forgiveness-and-provision",
      title: "Forgiveness and provision",
      line: "Believers who do good get forgiveness and generous provision.",
      facts: ["The Hour brings fair reward", "Good and bad are not equal"],
      quote: q34(4),
      source: ik(4, "Allah will favour the blessed, who are the believers, and hold to account those who reject.", "He will bestow His favor upon the blessed, who are the believers"),
      difficulty: 3,
      questions: [
        { q: "What do believers get, in 34:4?", a: "Forgiveness and provision", wrong: ["Gold on earth", "Long life", "Nothing"], why: "Those, theirs is forgiveness and generous provision." },
        { q: "Who are the blessed, per Ibn Kathir?", a: "The believers", wrong: ["The rich", "The strong", "The famous"], why: "He will bestow His favor upon the blessed, who are the believers." },
        { tf: true, q: "Faith and good deeds go together in 34:4.", why: "That He may recompense those who believe and do righteous good deeds." }
      ]
    },
    {
      slug: "striving-against-the-ayahs",
      title: "Striving against the ayahs",
      line: "Those who work to block Allah's ayahs face a painful punishment.",
      facts: ["They turn others away", "They deny the Messengers"],
      quote: q34(5),
      source: ik(5, "These are people who try to turn others away from Allah's path and disbelieve His Messengers.", "those who try to turn others away from the path of Allah"),
      difficulty: 4,
      questions: [
        { q: "What do they do, in 34:5?", a: "Strive against the ayahs", wrong: ["Recite them", "Teach them", "Love them"], why: "But those who strive against Our Ayat to frustrate them." },
        { q: "What else do they do, per Ibn Kathir?", a: "Turn others away", wrong: ["Feed the poor", "Build mosques", "Pray at night"], why: "Those who try to turn others away from the path of Allah." },
        { tf: false, q: "Blocking others from Allah's path is a small matter.", why: "Those, for them will be a severe painful torment." }
      ]
    },
    {
      slug: "people-of-knowledge-see",
      title: "People of knowledge see",
      line: "Those given knowledge see the revelation is the truth.",
      facts: ["It guides to the Mighty One", "He deserves all praise"],
      quote: q34(6),
      source: ik(6, "The Owner of all praise deserves praise in all His words, deeds, laws and decrees.", "in all His words, deeds, laws and decrees, is deserving of praise"),
      difficulty: 3,
      questions: [
        { q: "Who sees the truth, in 34:6?", a: "Those given knowledge", wrong: ["Only kings", "Only poets", "No one"], why: "And those who have been given knowledge see that what is revealed to you... is the truth." },
        { q: "Where does it guide, in 34:6?", a: "To the path of the Mighty", wrong: ["To riches", "To fame", "To the sea"], why: "And that it guides to the path of the Exalted in might, Owner of all praise." },
        { q: "What does Owner of all praise mean, per Ibn Kathir?", a: "Praised in all He does", wrong: ["Praised sometimes", "Praised by few", "Praised for wealth"], why: "In all His words, deeds, laws and decrees, is deserving of praise." }
      ]
    },
    {
      slug: "created-anew",
      title: "Created anew",
      line: "Deniers mocked: after turning to dust, made new again?",
      facts: ["They called it a lie or madness", "It is they who are far astray"],
      quote: q34(7),
      source: ik(7, "The disbelievers denied the Hour would come and mocked the Messenger ﷺ for speaking of it.", "denied that the Hour will come"),
      difficulty: 3,
      questions: [
        { q: "What did they mock, in 34:7?", a: "Being created anew", wrong: ["Eating dates", "Building homes", "Trade trips"], why: "When you have become fully disintegrated into dust... then you will be created (again) anew?" },
        { q: "What did they deny, per Ibn Kathir?", a: "That the Hour will come", wrong: ["That rain falls", "That the sun rises", "That people die"], why: "The disbelievers and heretics denied that the Hour will come." },
        { tf: true, q: "Allah can bring people back after they turn to dust.", why: "You will be restored to life and will receive provision anew." }
      ]
    },
    {
      slug: "a-lie-or-madness",
      title: "A lie or madness?",
      line: "They called him a liar or mad; they are the ones astray.",
      facts: ["He was truthful and wise", "Denial leads far from truth"],
      quote: q34(8),
      source: ik(8, "Muhammad ﷺ is the one telling the truth; he is righteous and wise, and they are the ones far from it.", "is the one who is telling the truth, and is righteous and wise"),
      difficulty: 3,
      questions: [
        { q: "What two claims did they make, in 34:8?", a: "A lie or madness", wrong: ["Poetry or song", "Magic or dreams", "Gold or silver"], why: "Has he invented a lie against Allah, or is there a madness in him?" },
        { q: "Who is truthful, per Ibn Kathir?", a: "Muhammad ﷺ", wrong: ["His mockers", "Their chiefs", "Their poets"], why: "Muhammad is the one who is telling the truth, and is righteous and wise." },
        { q: "Where are the deniers, in 34:8?", a: "In far error", wrong: ["On the right path", "Near the truth", "In safety"], why: "Those who disbelieve in the Hereafter are (themselves) in a torment, and in far error." }
      ]
    },
    {
      slug: "sky-above-earth-below",
      title: "Sky above, earth below",
      line: "Look at the sky and earth around you; there is a sign.",
      facts: ["Allah delays out of patience", "A sign for those who turn to Him"],
      quote: q34(9),
      source: ik(9, "The One Who made the vast heavens and earth can surely bring bodies back to life.", "is able to recreate bodies and revive decayed bones"),
      difficulty: 4,
      questions: [
        { q: "What surrounds them, in 34:9?", a: "The heaven and the earth", wrong: ["Only the sea", "Only mountains", "Only deserts"], why: "See they not what is before them and what is behind them, of the heaven and the earth?" },
        { q: "Whom is the sign for, in 34:9?", a: "One who turns to Allah", wrong: ["The proud", "The careless", "No one"], why: "Verily, in this is a sign for every servant who turns (to Allah) in repentance." },
        { q: "What does the sign prove, per Ibn Kathir?", a: "He can bring bodies back", wrong: ["Rain is random", "Stars rule us", "Nothing"], why: "Is able to recreate bodies and revive decayed bones." }
      ]
    },
    {
      slug: "mountains-sang-with-dawud",
      title: "Mountains sang with Dawud",
      line: "Mountains and birds glorified Allah with Dawud; iron was soft.",
      facts: ["He had a beautiful voice", "Iron bent in his hands"],
      quote: q34(10),
      source: hadith("bukhari", "5048", "Abu Musa", "Sahih", "The Prophet ﷺ told Abu Musa he had been given a sweet voice like those of the family of Dawud.", "of the family of David"),
      difficulty: 3,
      questions: [
        { q: "Who glorified Allah with Dawud, in 34:10?", a: "Mountains and birds", wrong: ["Fish and whales", "Trees only", "Lions"], why: "O you mountains! Glorify with him! And you birds (also)!" },
        { q: "What did Allah make soft for him, in 34:10?", a: "Iron", wrong: ["Gold", "Stone", "Wood"], why: "And We made the iron soft for him." },
        { q: "Whose voice was like Dawud's family, in the hadith?", a: "Abu Musa", wrong: ["Bilal", "Umar", "Salman"], why: "O Abu Musa! You have been given one of the mazamir of the family of David." }
      ]
    },
    {
      slug: "perfect-coats-of-mail",
      title: "Perfect coats of mail",
      line: "Make coats of mail with the rings just right, and do good.",
      facts: ["He made the first chain mail", "Allah sees what you do"],
      quote: q34(11),
      source: ik(11, "Qatadah said Dawud was the first person to make chain mail; before that, armour was made of plates.", "He was the first person ever to make chain mail"),
      difficulty: 3,
      questions: [
        { q: "What was Dawud told to make, in 34:11?", a: "Coats of mail", wrong: ["Ships", "Swords only", "Crowns"], why: "Make you perfect coats of mail." },
        { q: "Who first made chain mail, per Qatadah?", a: "Dawud", wrong: ["Nuh", "Sulayman", "Musa"], why: "He was the first person ever to make chain mail." },
        { q: "How should the rings be, per Mujahid?", a: "Just right", wrong: ["Very loose", "Very tight", "Made of gold"], why: "Do not make the rivets too loose... or make them too tight... but make it just right." }
      ]
    },
    {
      slug: "the-wind-for-sulayman",
      title: "The wind for Sulayman",
      line: "Sulayman rode the wind; Jinn worked for him by Allah's leave.",
      facts: ["A month's journey each half day", "A spring of copper flowed"],
      quote: q34(12),
      source: ik(12, "Many of the Salaf said Qitr means copper; Allah made it flow for Sulayman.", "Qitr means copper"),
      difficulty: 3,
      questions: [
        { q: "What did Allah subject to Sulayman, in 34:12?", a: "The wind", wrong: ["The sun", "The sea", "The moon"], why: "And to Sulayman (We subjected) the wind." },
        { q: "What does Qitr mean, per Ibn Kathir?", a: "Copper", wrong: ["Gold", "Water", "Oil"], why: "Qitr means copper." },
        { q: "By whose leave did the Jinn work, in 34:12?", a: "His Lord's", wrong: ["Their own", "The king's", "No one's"], why: "There were Jinn that worked in front of him, by the leave of his Lord." }
      ]
    },
    {
      slug: "work-with-thanks",
      title: "Work with thanks",
      line: "Work, O family of Dawud, with thanks; few are truly grateful.",
      facts: ["Thanks is shown by actions", "Dawud's prayer was most beloved"],
      quote: q34(13),
      source: hadith("bukhari", "1131", "Abdullah ibn Amr", "Sahih", "The most beloved prayer and fasting to Allah were those of Dawud: he slept half the night, prayed a third, and fasted every other day.", "The most beloved prayer to Allah is that of David"),
      difficulty: 4,
      questions: [
        { q: "How should Dawud's family work, in 34:13?", a: "With thanks", wrong: ["With pride", "With fear only", "In secret"], why: "Work you, O family of Dawud, with thanks!" },
        { q: "How often did Dawud fast, in the hadith?", a: "Every other day", wrong: ["Every day", "Once a year", "Never"], why: "And used to fast on alternate days." },
        { q: "How many servants are grateful, in 34:13?", a: "Few", wrong: ["All", "Most", "None"], why: "But few of My servants are grateful." },
        { tf: true, q: "Ibn Kathir says thanks can be shown by actions.", why: "This indicates that thanks may be expressed by actions as much as by words and intentions." }
      ]
    },
    {
      slug: "what-shukr-is",
      title: "What Shukr is",
      line: "Shukr is admitting Allah's gift and using it to obey Him.",
      facts: ["As-Sa'di explains", "Shukr"],
      quote: q34(13),
      source: saadi(34, 13, "As-Sa'di says shukr, thanks, is the heart admitting the favour is from Allah, receiving it as one in need of it, using it to obey Allah, and keeping it from being used in sin.", "والشكر: اعتراف القلب بمنة اللّه تعالى, وتلقيها افتقارا إليها, وصرفها في طاعة اللّه تعالى"),
      difficulty: 2,
      questions: [
        { q: "What is Shukr, per as-Sa'di on 34:13?", a: "Admitting Allah's gift and using it well", wrong: ["Only saying thanks", "Keeping it secret", "Spending it on fun"], why: "The heart admits His favour and uses it to obey Him." },
        { q: "What must a blessing be kept from, per as-Sa'di?", a: "Being used in sin", wrong: ["Being shared", "Being used at all", "Being seen"], why: "Shukr includes keeping it from being used in disobedience." },
        { tf: true, q: "Few of Allah's servants are truly grateful.", why: "As-Sa'di on 34:13." }
      ]
    },
    {
      slug: "the-staff-and-the-worm",
      title: "The staff and the worm",
      line: "A worm ate his staff; then the Jinn knew he had died.",
      facts: ["The Jinn do not know the Unseen", "They kept working, unaware"],
      quote: q34(14),
      source: ik(14, "When the worm ate the staff and it fell, it became clear the Jinn do not know the Unseen, as they had claimed.", "the Jinn do not know the Unseen"),
      difficulty: 3,
      questions: [
        { q: "What showed his death, in 34:14?", a: "A worm eating his staff", wrong: ["A loud cry", "A bird's song", "An earthquake"], why: "Nothing informed them of his death except a little worm of the earth which kept gnawing away at his stick." },
        { q: "What did the Jinn learn, per Ibn Kathir?", a: "They do not know the Unseen", wrong: ["They are strong", "They can fly", "They are wise"], why: "It also became clear... that the Jinn do not know the Unseen." },
        { q: "How long did he stay leaning, per Ibn Kathir?", a: "Nearly a year", wrong: ["One hour", "Ten years", "A day"], why: "He stayed like that for a long time, nearly a year." }
      ]
    },
    {
      slug: "two-gardens-of-saba",
      title: "Two gardens of Saba",
      line: "Saba had two gardens; eat and be thankful, they were told.",
      facts: ["A good land", "An Oft-Forgiving Lord"],
      quote: q34(15),
      source: ik(15, "The fruit was so plentiful that a basket on a woman's head would fill as she walked under the trees.", "the fruit would fall from the trees and fill the basket"),
      difficulty: 3,
      questions: [
        { q: "What did Saba have, in 34:15?", a: "Two gardens", wrong: ["Two rivers", "Two castles", "Two ships"], why: "Two gardens on the right and on the left." },
        { q: "What were they told, in 34:15?", a: "Eat and be grateful", wrong: ["Fight and win", "Build and boast", "Sleep and rest"], why: "Eat of the provision of your Lord, and be grateful to Him." },
        { q: "How plentiful was the fruit, per Ibn Kathir?", a: "It fell into baskets", wrong: ["Very little", "Only in winter", "None at all"], why: "The fruit would fall from the trees and fill the basket without any need for her to make the effort." },
        { q: "Where was Saba, per Ibn Kathir?", a: "Yemen", wrong: ["Egypt", "Persia", "Rome"], why: "Saba' refers to the kings and people of the Yemen." }
      ]
    },
    {
      slug: "the-dam-burst",
      title: "The dam burst",
      line: "They turned away, so the dam burst and gardens went bitter.",
      facts: ["The dam of Ma'arib", "Fruit trees became thorns"],
      quote: q34(16),
      source: ik(16, "They stopped worshipping Allah alone and thanking Him, so the flood came and the gardens turned to thorny, bitter trees.", "they were replaced with thorny trees"),
      difficulty: 4,
      questions: [
        { q: "What did Allah send, in 34:16?", a: "A flood from the dam", wrong: ["A fire", "Locusts", "Snow"], why: "So We sent against them flood released from the dam." },
        { q: "What did the gardens become, in 34:16?", a: "Bitter fruit gardens", wrong: ["Gold mines", "Lakes", "Palaces"], why: "And We converted their two gardens into gardens producing bitter bad fruit." },
        { q: "Why did it happen, per Ibn Kathir?", a: "They turned from thanks", wrong: ["Bad luck", "No rain", "A war"], why: "From worshipping Allah alone and from giving thanks to Him for the blessings." }
      ]
    },
    {
      slug: "only-the-ungrateful",
      title: "Only the ungrateful",
      line: "Allah requites this way only those who are ungrateful.",
      facts: ["Ingratitude loses blessings", "Thanks keeps them"],
      quote: q34(17),
      source: ik(17, "Mujahid said Allah does not punish in this way except the disbelievers.", "He does not punish anyone except the disbelievers"),
      difficulty: 3,
      questions: [
        { q: "Why were they requited, in 34:17?", a: "They were ungrateful", wrong: ["They were poor", "They were few", "They were far"], why: "Like this We requited them because they were ungrateful disbelievers." },
        { q: "Whom does Allah punish this way, per Mujahid?", a: "The disbelievers", wrong: ["Everyone", "The poor", "The young"], why: "He does not punish anyone except the disbelievers." },
        { tf: true, q: "Being thankful helps keep blessings.", why: "And never do We requite in such a way except those who are ungrateful." }
      ]
    },
    {
      slug: "safe-roads",
      title: "Safe roads",
      line: "Towns lined their road to Syria; travel was safe day and night.",
      facts: ["No need to carry food", "Blessed towns near Jerusalem"],
      quote: q34(18),
      source: ik(18, "They travelled from Yemen to Syria through visible, joined towns, and found water and fruit wherever they stopped.", "wherever they stopped, they would find water and fruits"),
      difficulty: 3,
      questions: [
        { q: "How safe was travel, in 34:18?", a: "Safe night and day", wrong: ["Only by day", "Never safe", "Only in groups"], why: "Travel in them safely both by night and day." },
        { q: "Where were the blessed towns, per Ibn Kathir?", a: "Syria", wrong: ["India", "Egypt", "Persia"], why: "All said that this means the towns of Syria." },
        { q: "What did they find on the way, per Ibn Kathir?", a: "Water and fruits", wrong: ["Robbers", "Deserts", "Nothing"], why: "Wherever they stopped, they would find water and fruits." }
      ]
    },
    {
      slug: "scattered-like-saba",
      title: "Scattered like Saba",
      line: "They asked for longer journeys and were scattered far and wide.",
      facts: ["They became a tale told", "Signs for the patient and thankful"],
      quote: q34(19),
      source: hadith("muslim", "2999", "Suhaib", "Sahih", "The believer's affair is all good: if blessed he thanks Allah, and if troubled he is patient.", "there is a good for him in it"),
      difficulty: 4,
      questions: [
        { q: "What did they ask for, in 34:19?", a: "Longer journeys", wrong: ["More rain", "More towns", "Shorter roads"], why: "Our Lord! Make the stages between our journey longer." },
        { q: "What happened to them, in 34:19?", a: "They were dispersed", wrong: ["They grew rich", "They won a war", "They built a dam"], why: "And We dispersed them all totally." },
        { q: "What does the believer do when blessed, in the hadith?", a: "Thanks Allah", wrong: ["Boasts", "Hides it", "Forgets"], why: "If he has an occasion to feel delight, he thanks (God)." },
        { q: "Whom are the signs for, in 34:19?", a: "The patient and grateful", wrong: ["The proud", "The lazy", "The rich only"], why: "Verily, in this are indeed signs for every steadfast, grateful." }
      ]
    },
    {
      slug: "iblis-and-his-guess",
      title: "Iblis and his guess",
      line: "Iblis' guess proved true; all but the believers followed him.",
      facts: ["He vowed to mislead people", "A group of believers stayed firm"],
      quote: q34(20),
      source: ik(20, "This is like when Iblis refused to bow to Adam and vowed to mislead his offspring, all but a few.", "I will surely seize and mislead his offspring all but a few"),
      difficulty: 4,
      questions: [
        { q: "Whose thought proved true, in 34:20?", a: "Iblis", wrong: ["The angels", "The Prophets", "The kings"], why: "And indeed Iblis did prove true his thought about them." },
        { q: "Who did not follow him, in 34:20?", a: "A group of true believers", wrong: ["No one", "The rich", "The strong"], why: "All except a group of true believers." },
        { q: "What did Iblis vow, per Ibn Kathir?", a: "To mislead Adam's children", wrong: ["To help them", "To guard them", "To leave them"], why: "I will surely seize and mislead his offspring all but a few!" }
      ]
    },
    {
      slug: "no-power-over-them",
      title: "No power over them",
      line: "Iblis had no real power; it was a test of who believes.",
      facts: ["He has no proof", "Allah watches over all"],
      quote: q34(21),
      source: ik(21, "Ibn Abbas said Iblis had no proof. He was allowed only to show who believes in the Hereafter and who doubts.", "This means, he had no proof"),
      difficulty: 4,
      questions: [
        { q: "What authority did Iblis have, in 34:21?", a: "None", wrong: ["Full power", "Half power", "Power over angels"], why: "And he had no authority over them." },
        { q: "What does no authority mean, per Ibn Abbas?", a: "He had no proof", wrong: ["He had no army", "He had no voice", "He had no home"], why: "This means, he had no proof." },
        { q: "Why was it allowed, in 34:21?", a: "To test belief", wrong: ["To reward Iblis", "To punish angels", "By chance"], why: "Except that We might test him who believes in the Hereafter, from him who is in doubt about it." }
      ]
    }
  ]
};

/** Ayahs 22 to 54: idols own nothing, sent to all mankind, wealth does not bring us near, and faith too late. */
const SABA_TWO: DeepUnit = {
  key: "saba2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-34",
  name: "Saba, ayahs 22 to 54",
  kind: "skill",
  lessonType: "surah",
  surahName: "Saba",
  lessons: [
    {
      slug: "not-a-speck",
      title: "Not a speck",
      line: "False gods own not a speck of dust in heaven or earth.",
      facts: ["They have no share at all", "Allah needs no helper"],
      quote: q34(22),
      source: ik(22, "Allah has no rival whose support He needs; all creation needs Him.", "all of creation is in need of Him"),
      difficulty: 3,
      questions: [
        { q: "What do false gods own, in 34:22?", a: "Not even a speck", wrong: ["Half the earth", "The sky", "The seas"], why: "They possess not even the weight of a speck of dust." },
        { q: "Does Allah need their help, per Ibn Kathir?", a: "No; all need Him", wrong: ["Yes, often", "Sometimes", "Only in war"], why: "On the contrary, all of creation is in need of Him." },
        { q: "What share do they have, in 34:22?", a: "None", wrong: ["A third", "Half", "Most"], why: "Nor have they any share in either." }
      ]
    },
    {
      slug: "angels-in-awe",
      title: "Angels in awe",
      line: "When Allah speaks, the angels are in awe, then say: the truth.",
      facts: ["No one intercedes without leave", "He is the Most High"],
      quote: q34(23),
      source: hadith("bukhari", "4800", "Abu Hurairah", "Sahih", "When Allah decrees a matter, the angels flutter their wings in submission; then they ask what their Lord said, and say: the truth.", "the angels flutter their wings indicating complete surrender to His saying"),
      difficulty: 4,
      questions: [
        { q: "Who can intercede, in 34:23?", a: "Whom He permits", wrong: ["Anyone", "Only kings", "Idols"], why: "Intercession with Him profits not except for him whom He permits." },
        { q: "What do angels do, in the hadith?", a: "Flutter their wings", wrong: ["Sing songs", "Sleep", "Leave"], why: "The angels flutter their wings indicating complete surrender to His saying." },
        { q: "What do the angels answer, in 34:23?", a: "The truth", wrong: ["We forgot", "Nothing", "A riddle"], why: "They say the truth. And He is the Most High, the Most Great." }
      ]
    },
    {
      slug: "who-provides",
      title: "Who provides?",
      line: "Who gives you provision from the sky and earth? Say: Allah.",
      facts: ["They admitted He provides", "So worship Him alone"],
      quote: q34(24),
      source: ik(24, "They admitted that only Allah sends rain and grows crops, so they should know no one else deserves worship.", "there is no god worthy of worship besides Him"),
      difficulty: 3,
      questions: [
        { q: "Who gives provision, in 34:24?", a: "Allah", wrong: ["The sky itself", "The idols", "The kings"], why: "Who gives you provision from the heavens and the earth? Say: Allah." },
        { q: "What should they realise, per Ibn Kathir?", a: "None but Him deserves worship", wrong: ["Rain is luck", "Idols help", "Kings feed us"], why: "There is no god worthy of worship besides Him." },
        { tf: true, q: "Both sides cannot be right at once.", why: "One of the two sides must be speaking falsehood, and one must be telling the truth." }
      ]
    },
    {
      slug: "each-answers-for-himself",
      title: "Each answers for himself",
      line: "You will not be asked about our sins, nor we about yours.",
      facts: ["The call is to Allah alone", "Like Surah Al-Kafirun"],
      quote: q34(25),
      source: ik(25, "We call people to Allah alone. If you respond, you belong with us; if not, each side answers for its own deeds.", "we call people to Allah, to believe that He is the Only God"),
      difficulty: 3,
      questions: [
        { q: "Who answers for whose deeds, in 34:25?", a: "Each for their own", wrong: ["Leaders for all", "Parents for children", "No one"], why: "You will not be asked about our sins, nor shall we be asked of what you do." },
        { q: "To what do they call, per Ibn Kathir?", a: "To Allah alone", wrong: ["To wealth", "To a tribe", "To a king"], why: "We call people to Allah, to believe that He is the Only God." },
        { q: "Which surah is similar, per Ibn Kathir?", a: "Al-Kafirun", wrong: ["Al-Fil", "Al-Asr", "Al-Kawthar"], why: "Say: O disbelievers! I worship not that which you worship." }
      ]
    },
    {
      slug: "the-just-judge",
      title: "The Just Judge",
      line: "Our Lord will gather us all and judge between us with truth.",
      facts: ["All in one gathering", "Each gets what he did"],
      quote: q34(26),
      source: ik(26, "On the Day of Resurrection, Allah will gather all creation and judge with justice; each will get what his deeds earned.", "He will bring all of creation together in one arena"),
      difficulty: 3,
      questions: [
        { q: "What will Allah do, in 34:26?", a: "Gather us and judge", wrong: ["Forget us", "Leave us", "Hide from us"], why: "Our Lord will assemble us all together, then He will judge between us with truth." },
        { q: "What is He called, in 34:26?", a: "The Just Judge", wrong: ["The Stranger", "The Merchant", "The Guard"], why: "And He is the Just Judge, the All-Knower." },
        { q: "Where will creation be gathered, per Ibn Kathir?", a: "In one arena", wrong: ["In many lands", "At sea", "In caves"], why: "He will bring all of creation together in one arena." }
      ]
    },
    {
      slug: "show-me-the-partners",
      title: "Show me the partners",
      line: "Show me the partners you set up; no, He is Allah alone.",
      facts: ["He has no equal", "Almighty and All-Wise"],
      quote: q34(27),
      source: ik(27, "He has no peer, rival, partner or equal. He is the One and Only God.", "He has no peer, rival, partner or equal"),
      difficulty: 3,
      questions: [
        { q: "What were they asked to show, in 34:27?", a: "Their partners", wrong: ["Their gold", "Their books", "Their homes"], why: "Show me those whom you have joined with Him as partners." },
        { q: "Does Allah have an equal, per Ibn Kathir?", a: "No", wrong: ["Yes, one", "Many", "Some"], why: "He has no peer, rival, partner or equal." },
        { q: "How is He described, in 34:27?", a: "Almighty, All-Wise", wrong: ["Weak, unaware", "Far, silent", "Tired, alone"], why: "But He is Allah, the Almighty, the All-Wise." }
      ]
    },
    {
      slug: "sent-to-all-mankind",
      title: "Sent to all mankind",
      line: "He ﷺ was sent to all people, bringing good news and warning.",
      facts: ["Earlier Prophets came to one people", "Arabs and non-Arabs alike"],
      quote: q34(28),
      source: hadith("bukhari", "335", "Jabir ibn Abdullah", "Sahih", "The Prophet ﷺ said he was given five things, including being sent to all mankind, while earlier Prophets were sent to their own people.", "I have been given five things which were not given to any one else before me"),
      difficulty: 3,
      questions: [
        { q: "To whom was he sent, in 34:28?", a: "All mankind", wrong: ["Only Arabs", "Only Makkah", "Only his tribe"], why: "And We have not sent you except as a giver of glad tidings and a warner to all mankind." },
        { q: "How many special things, in the hadith?", a: "Five", wrong: ["Two", "Ten", "Seven"], why: "I have been given five things which were not given to any one else before me." },
        { q: "What did most people not know, in 34:28?", a: "Most know not", wrong: ["All knew", "Most agreed", "Most wrote it"], why: "And most of men know not." }
      ]
    },
    {
      slug: "when-is-this-promise",
      title: "When is this promise?",
      line: "They asked: when is this promise, if you are truthful?",
      facts: ["They thought it unlikely", "Believers are mindful of it"],
      quote: q34(29),
      source: ik(29, "The disbelievers thought it unlikely the Hour would ever come, so they asked to hurry it.", "the disbelievers believed it unlikely that the Hour would ever come to pass"),
      difficulty: 3,
      questions: [
        { q: "What did they ask, in 34:29?", a: "When is this promise?", wrong: ["Where is the Kabah?", "Who is the king?", "What is the price?"], why: "And they say: When is this promise if you are truthful?" },
        { q: "What did they think of the Hour, per Ibn Kathir?", a: "It was unlikely", wrong: ["It was near", "It was past", "It was fun"], why: "The disbelievers believed it unlikely that the Hour would ever come to pass." },
        { tf: false, q: "Asking about its time made them ready for it.", why: "And they say: When is this promise if you are truthful?" }
      ]
    },
    {
      slug: "a-fixed-day",
      title: "A fixed Day",
      line: "Your appointed Day cannot be moved back or forward an hour.",
      facts: ["The time is fixed", "No delaying, no hurrying"],
      quote: q34(30),
      source: ik(30, "You have a fixed time that cannot be changed. When it comes, it cannot be put back or brought forward.", "you have an appointed time which is fixed and cannot be changed"),
      difficulty: 3,
      questions: [
        { q: "Can the Day be moved, in 34:30?", a: "Not even an hour", wrong: ["By a year", "By a month", "If we ask"], why: "Which you cannot put back for an hour nor put forward." },
        { q: "Can the time change, per Ibn Kathir?", a: "No, it is fixed", wrong: ["Yes, easily", "If kings ask", "Sometimes"], why: "You have an appointed time which is fixed and cannot be changed or altered." },
        { tf: true, q: "Only Allah sets the time of that Day.", why: "The appointment to you is for a Day, which you cannot put back for an hour nor put forward." }
      ]
    },
    {
      slug: "the-weak-blame-the-proud",
      title: "The weak blame the proud",
      line: "Followers will blame leaders: but for you, we would believe.",
      facts: ["Both sides argue", "They rejected the Quran"],
      quote: q34(31),
      source: ik(31, "The weak are the followers, and the arrogant are the leaders and masters.", "this refers to the leaders and masters"),
      difficulty: 4,
      questions: [
        { q: "What did deniers reject, in 34:31?", a: "The Quran and earlier books", wrong: ["Only poems", "Only laws", "Nothing"], why: "We believe not in this Qur'an nor in that which was before it." },
        { q: "Who are the arrogant, per Ibn Kathir?", a: "The leaders and masters", wrong: ["The poor", "The young", "The slaves"], why: "This refers to the leaders and masters." },
        { q: "What will followers say, in 34:31?", a: "Without you we would believe", wrong: ["Thank you", "We are happy", "Lead us again"], why: "Had it not been for you, we should certainly have been believers!" }
      ]
    },
    {
      slug: "it-was-your-own-choice",
      title: "It was your own choice",
      line: "Leaders will reply: did we stop you? You chose it yourselves.",
      facts: ["Guidance had reached them", "Each is responsible"],
      quote: q34(32),
      source: ik(32, "The leaders will say: we only called you, and you followed us without proof; it was your own choice.", "it was your own choice"),
      difficulty: 4,
      questions: [
        { q: "What will leaders ask, in 34:32?", a: "Did we keep you from guidance?", wrong: ["Are you hungry?", "Where is the gold?", "Who is king?"], why: "Did we keep you back from guidance after it had come to you?" },
        { q: "What will leaders claim, per Ibn Kathir?", a: "It was their own choice", wrong: ["It was luck", "It was forced", "It was a dream"], why: "Because of your own desires; it was your own choice." },
        { tf: true, q: "Guidance had already come to the followers.", why: "Did we keep you back from guidance after it had come to you?" }
      ]
    },
    {
      slug: "plotting-night-and-day",
      title: "Plotting night and day",
      line: "The weak say: you plotted night and day; both hide their regret.",
      facts: ["They gave false hopes", "Each gets what he did"],
      quote: q34(33),
      source: ik(33, "Both leaders and followers will feel regret for what they did, and each will be judged by his own deeds.", "both the leaders and the followers will feel regret for what they did"),
      difficulty: 4,
      questions: [
        { q: "When did the leaders plot, in 34:33?", a: "Night and day", wrong: ["Only Fridays", "Once a year", "Never"], why: "Nay, but it was your plotting by night and day." },
        { q: "Who feels regret, per Ibn Kathir?", a: "Leaders and followers", wrong: ["Only leaders", "Only followers", "No one"], why: "Both the leaders and the followers will feel regret for what they did previously." },
        { q: "How are they requited, in 34:33?", a: "For what they did", wrong: ["By chance", "For others' deeds", "Not at all"], why: "Are they requited aught except what they used to do?" }
      ]
    },
    {
      slug: "the-wealthy-rejected",
      title: "The wealthy rejected",
      line: "In every town, the wealthy said: we reject your message.",
      facts: ["The weak often followed first", "Pride blocks the truth"],
      quote: q34(34),
      source: ik(34, "No Prophet was sent to a town but its wealthy disbelieved, while the weaker people followed him.", "the weaker people of the town followed him"),
      difficulty: 3,
      questions: [
        { q: "Who rejected in every town, in 34:34?", a: "The wealthy and luxurious", wrong: ["The children", "The poor", "The travellers"], why: "Those who were given the worldly wealth and luxuries among them said: We believe not." },
        { q: "Who followed the Prophets, per Ibn Kathir?", a: "The weaker people", wrong: ["The kings", "The rich", "The soldiers"], why: "And the weaker people of the town followed him." },
        { tf: true, q: "Allah was consoling His Prophet ﷺ with this.", why: "Allah is consoling His Prophet and commanding him to follow the example of the Messengers." }
      ]
    },
    {
      slug: "more-wealth-more-children",
      title: "More wealth, more children",
      line: "They said: we have more wealth and children; we are safe.",
      facts: ["They thought riches meant love", "That idea is far-fetched"],
      quote: q34(35),
      source: ik(35, "They thought their wealth and children were a sign Allah loved them, so He would not punish them.", "they believed that this was a sign that Allah loved them"),
      difficulty: 4,
      questions: [
        { q: "What did they boast of, in 34:35?", a: "Wealth and children", wrong: ["Knowledge", "Prayer", "Kindness"], why: "We are more in wealth and in children." },
        { q: "What did they think it meant, per Ibn Kathir?", a: "Allah loved them", wrong: ["They were tested", "They should share", "Nothing"], why: "They believed that this was a sign that Allah loved them." },
        { tf: false, q: "More wealth means Allah is pleased with you.", why: "This was too far-fetched." }
      ]
    },
    {
      slug: "provision-is-his-choice",
      title: "Provision is His choice",
      line: "My Lord gives more or less to whom He wills.",
      facts: ["Wealth is not a sign of love", "Most people do not know"],
      quote: q34(36),
      source: ik(36, "He gives wealth to those He loves and those He does not love, and makes poor and rich whom He wills.", "He gives wealth to those whom He loves and those whom He does not love"),
      difficulty: 3,
      questions: [
        { q: "Who decides provision, in 34:36?", a: "My Lord", wrong: ["Luck", "Kings", "Stars"], why: "Verily, my Lord expands the provision to whom He wills and restricts." },
        { q: "Whom does He give wealth, per Ibn Kathir?", a: "Those He loves and not", wrong: ["Only the good", "Only the bad", "Only Arabs"], why: "He gives wealth to those whom He loves and those whom He does not love." },
        { q: "What do most men not know, in 34:36?", a: "How provision works", wrong: ["How to walk", "How to eat", "How to sleep"], why: "But most men know not." }
      ]
    },
    {
      slug: "faith-brings-us-near",
      title: "Faith brings us near",
      line: "Not wealth or children, but faith and good deeds bring us near.",
      facts: ["Allah looks at hearts", "High rooms in Paradise"],
      quote: q34(37),
      source: hadith("muslim", "2564c", "Abu Hurairah", "Sahih", "Allah does not look at your faces or wealth, but at your hearts and your deeds.", "Verily Allah does not look to your faces and your wealth but He looks to your heart and to your deeds"),
      difficulty: 3,
      questions: [
        { q: "What brings us near Allah, in 34:37?", a: "Faith and good deeds", wrong: ["Wealth", "Children", "Fame"], why: "But only he who believes, and does righteous deeds." },
        { q: "What does Allah look at, in the hadith?", a: "Hearts and deeds", wrong: ["Faces", "Wealth", "Clothes"], why: "He looks to your heart and to your deeds." },
        { q: "Where will they live, in 34:37?", a: "High dwellings in peace", wrong: ["Low valleys", "Busy markets", "Deep caves"], why: "And they will reside in the high dwellings (Paradise) in peace and security." },
        { q: "How much is the reward, per Ibn Kathir?", a: "Ten to seven hundred times", wrong: ["Just once", "Half", "Twice only"], why: "The reward will be multiplied for them between ten and seven hundred times." }
      ]
    },
    {
      slug: "blocking-the-path",
      title: "Blocking the path",
      line: "Those who work against Allah's ayahs will face the punishment.",
      facts: ["They block people from Allah", "Each gets his due"],
      quote: q34(38),
      source: ik(38, "They try to block people from Allah's path and from following His Messengers; each will be dealt with by his deeds.", "they will all be punished for their deeds, each one accordingly"),
      difficulty: 4,
      questions: [
        { q: "What do they strive against, in 34:38?", a: "Allah's ayahs", wrong: ["Hunger", "Floods", "Enemies"], why: "And those who strive against Our Ayat, to frustrate them." },
        { q: "How will they be dealt with, per Ibn Kathir?", a: "Each by his deeds", wrong: ["All the same", "By luck", "Not at all"], why: "They will all be punished for their deeds, each one accordingly." },
        { tf: true, q: "Blocking people from guidance is a serious wrong.", why: "Those who try to block people from the path of Allah and from following His Messengers." }
      ]
    },
    {
      slug: "spend-and-he-replaces",
      title: "Spend and He replaces",
      line: "Whatever you spend for Him, He replaces; He is Best Provider.",
      facts: ["Angels pray for the spender", "Contentment is success"],
      quote: q34(39),
      source: hadith("bukhari", "1442", "Abu Hurairah", "Sahih", "Every day two angels come down; one prays: O Allah, give back to every person who spends in Your cause.", "Compensate every person who spends in Your Cause"),
      difficulty: 3,
      questions: [
        { q: "What does Allah do for spenders, in 34:39?", a: "Replaces what they spend", wrong: ["Takes more", "Ignores it", "Fines them"], why: "And whatsoever you spend of anything, He will replace it." },
        { q: "What does one angel pray, in the hadith?", a: "Compensate every spender", wrong: ["Make them poor", "Hide their gold", "Stop them"], why: "O Allah! Compensate every person who spends in Your Cause." },
        { q: "What is Allah, in 34:39?", a: "The Best of providers", wrong: ["A stingy one", "A trader", "A stranger"], why: "And He is the Best of providers." }
      ]
    },
    {
      slug: "spending-does-not-shrink",
      title: "Spending does not shrink",
      line: "Do not think spending for Allah reduces your provision.",
      facts: ["As-Sa'di explains", "Allah replaces it"],
      quote: q34(39),
      source: saadi(34, 39, "As-Sa'di says whatever we spend, on a relative, neighbour, poor person or orphan, Allah replaces; so do not imagine spending reduces provision, and seek provision from Him through the means He commanded.", "فلا تتوهموا أن الإنفاق مما ينقص الرزق"),
      difficulty: 2,
      questions: [
        { q: "Does spending for Allah reduce provision, per as-Sa'di?", a: "No, He replaces it", wrong: ["Yes, always", "Only for the poor", "Only in Ramadan"], why: "Do not imagine spending reduces provision, says as-Sa'di." },
        { q: "Whom can we spend on, per as-Sa'di on 34:39?", a: "Relatives, neighbours, the poor and orphans", wrong: ["Only ourselves", "Only the rich", "No one"], why: "On a relative, a neighbour, a poor person, an orphan or others." },
        { tf: true, q: "We should seek provision from Allah and use the means He commanded.", why: "As-Sa'di on 34:39." }
      ]
    },
    {
      slug: "the-angels-disown-them",
      title: "The angels disown them",
      line: "Allah will ask the angels: did these people worship you?",
      facts: ["The angels say: Glory be to You", "They are His servants"],
      quote: q34(40),
      source: ik(40, "Allah will ask the angels before all creation whether they told people to worship them.", "did you command them to worship you"),
      difficulty: 4,
      questions: [
        { q: "Whom will Allah ask, in 34:40?", a: "The angels", wrong: ["The mountains", "The stars", "The seas"], why: "Then He will say to the angels: Was it you that these people used to worship?" },
        { q: "What does the question mean, per Ibn Kathir?", a: "Did you command them?", wrong: ["Are you tired?", "Are you hungry?", "Where were you?"], why: "Did you command them to worship you?" },
        { tf: true, q: "All people will be gathered on that Day.", why: "And (remember) the Day when He will gather them all together." }
      ]
    },
    {
      slug: "glory-be-to-you",
      title: "Glory be to You",
      line: "Angels say: Glory be to You; they worshipped the Jinn.",
      facts: ["The angels are Allah's servants", "Devils made idols look good"],
      quote: q34(41),
      source: ik(41, "The angels say they are Allah's servants and disown these people; the devils made idol worship look attractive.", "we are Your servants and we disown these people before You"),
      difficulty: 4,
      questions: [
        { q: "What do the angels say first, in 34:41?", a: "Glorified be You", wrong: ["Help us", "We are sorry", "We forgot"], why: "Glorified be You! You are our Protector instead of them." },
        { q: "Whom did they really worship, in 34:41?", a: "The Jinn", wrong: ["The angels", "The stars", "The sea"], why: "Nay, but they used to worship the Jinn." },
        { q: "What do the angels say they are, per Ibn Kathir?", a: "Allah's servants", wrong: ["Gods", "Kings", "Partners"], why: "We are Your servants and we disown these people before You." }
      ]
    },
    {
      slug: "no-help-that-day",
      title: "No help that Day",
      line: "That Day no one can help or harm another.",
      facts: ["Idols will be of no use", "Only Allah's mercy helps"],
      quote: q34(42),
      source: ik(42, "The idols they hoped would help them in hard times will have no power to help or harm.", "Today they will have no power either to benefit you or to harm you"),
      difficulty: 3,
      questions: [
        { q: "Who can help another, in 34:42?", a: "No one", wrong: ["Friends", "Idols", "Leaders"], why: "So Today, none of you can profit or harm one another." },
        { q: "What power will idols have, per Ibn Kathir?", a: "None at all", wrong: ["A little", "A lot", "Half"], why: "Today they will have no power either to benefit you or to harm you." },
        { tf: false, q: "Their idols will rescue them that Day.", why: "None of those idols and rivals whom you hoped would benefit you, will be of any avail to you." }
      ]
    },
    {
      slug: "just-a-man-they-said",
      title: "Just a man, they said",
      line: "They said: a man who would turn you from your fathers' gods.",
      facts: ["They called it magic", "They called it made up"],
      quote: q34(43),
      source: ik(43, "When the ayahs were recited fresh from the Messenger ﷺ, they called them a lie and magic.", "they heard them fresh from the lips of His Messenger"),
      difficulty: 3,
      questions: [
        { q: "What did they say he wanted, in 34:43?", a: "To turn them from old gods", wrong: ["To get rich", "To be king", "To travel"], why: "This is naught but a man who wishes to hinder you from that which your fathers used to worship." },
        { q: "What did they call the truth, in 34:43?", a: "Evident magic", wrong: ["A good word", "A gift", "A cure"], why: "This is nothing but evident magic!" },
        { q: "How did they hear the ayahs, per Ibn Kathir?", a: "Fresh from the Messenger ﷺ", wrong: ["From a book", "From poets", "In dreams"], why: "They heard them fresh from the lips of His Messenger." }
      ]
    },
    {
      slug: "no-book-before",
      title: "No book before",
      line: "No earlier book or warner had come to the Arabs.",
      facts: ["They wished for one", "Then they denied him"],
      quote: q34(44),
      source: ik(44, "The Arabs wished for a warner or book, saying they would be better guided, but when it came they rejected it.", "Allah did not reveal any Book to the Arabs"),
      difficulty: 3,
      questions: [
        { q: "What had the Arabs not been given, in 34:44?", a: "Scriptures to study", wrong: ["Rain", "Camels", "Trade"], why: "And We had not given them Scriptures that they could study." },
        { q: "What did they used to wish, per Ibn Kathir?", a: "For a warner or book", wrong: ["For gold", "For a king", "For war"], why: "If only a warner comes to us or a Book is revealed to us." },
        { tf: true, q: "When the warner came, they rejected him.", why: "But when Allah blessed them with that, they disbelieved him and stubbornly rejected him." }
      ]
    },
    {
      slug: "not-a-tenth",
      title: "Not a tenth",
      line: "Earlier nations were far stronger, yet denial did not save them.",
      facts: ["Quraysh had not a tenth of their power", "Strength cannot stop Allah"],
      quote: q34(45),
      source: ik(45, "Ibn Abbas said they had not even a tenth of the worldly power of the nations before them.", "Of the power of this world"),
      difficulty: 4,
      questions: [
        { q: "What had they not received, in 34:45?", a: "A tenth of the earlier gifts", wrong: ["Any food", "Any rain", "Any children"], why: "These have not received even a tenth of what We had granted to those (of old)." },
        { q: "A tenth of what, per Ibn Abbas?", a: "Worldly power", wrong: ["Books", "Prophets", "Rivers"], why: "Of the power of this world." },
        { tf: true, q: "Great strength did not save earlier nations.", why: "But that did not protect them from the punishment of Allah." }
      ]
    },
    {
      slug: "stand-and-reflect",
      title: "Stand and reflect",
      line: "Stand for Allah in pairs or alone, think: he is not mad.",
      facts: ["Think honestly, without tribe pride", "He warned from Mount Safa"],
      quote: q34(46),
      source: hadith("bukhari", "4801", "Ibn Abbas", "Sahih", "The Prophet ﷺ climbed Safa and asked if they would believe him about an enemy; then said he was a warner before a severe punishment.", "I am a warner to you in face of a terrible punishment"),
      difficulty: 4,
      questions: [
        { q: "How should they stand, in 34:46?", a: "In pairs or alone", wrong: ["In big crowds", "In secret armies", "Not at all"], why: "That you stand up for Allah's sake in pairs and singly, and reflect." },
        { q: "Where did he call them, in the hadith?", a: "Mount Safa", wrong: ["Mount Uhud", "The market", "The sea"], why: "One day the Prophet ﷺ ascended Safa mountain." },
        { q: "What did Quraysh say they would do, in the hadith?", a: "Believe him", wrong: ["Laugh", "Leave", "Fight"], why: "They said, Yes, we will believe you." }
      ]
    },
    {
      slug: "no-wage-from-you",
      title: "No wage from you",
      line: "I ask no wage from you; my reward is from Allah.",
      facts: ["He is Witness over all", "Sincere advice for free"],
      quote: q34(47),
      source: ik(47, "I want nothing from you for conveying Allah's Message; I seek my reward from Allah.", "I do not want anything for conveying the Message of Allah to you"),
      difficulty: 3,
      questions: [
        { q: "Whose wage does he seek, in 34:47?", a: "Allah's", wrong: ["The people's", "The king's", "The tribe's"], why: "My wage is from Allah only." },
        { q: "What does he want from them, per Ibn Kathir?", a: "Nothing", wrong: ["Money", "Land", "Camels"], why: "I do not want anything for conveying the Message of Allah to you." },
        { q: "What is Allah over all things, in 34:47?", a: "A Witness", wrong: ["Unaware", "A guest", "Far"], why: "And He is a Witness over all things." }
      ]
    },
    {
      slug: "he-sends-the-truth",
      title: "He sends the truth",
      line: "My Lord sends down the truth; He knows all that is unseen.",
      facts: ["He chooses His messengers", "Nothing is hidden from Him"],
      quote: q34(48),
      source: ik(48, "He sends the angel with revelation to whom He wills, and nothing is hidden from Him in heaven or earth.", "nothing whatsoever is hidden from Him in the heavens or on earth"),
      difficulty: 3,
      questions: [
        { q: "What does the Lord send down, in 34:48?", a: "The truth", wrong: ["Gold", "Doubt", "Silence"], why: "Verily, my Lord sends down the truth." },
        { q: "What does He know, in 34:48?", a: "The Unseen", wrong: ["Only the seen", "Only today", "Only the past"], why: "The All-Knower of the Unseen." },
        { q: "What is hidden from Him, per Ibn Kathir?", a: "Nothing whatsoever", wrong: ["Deep seas", "The far sky", "Night"], why: "Nothing whatsoever is hidden from Him in the heavens or on earth." }
      ]
    },
    {
      slug: "truth-has-come",
      title: "Truth has come",
      line: "Truth has come; falsehood can neither create nor bring back.",
      facts: ["Recited at the conquest of Makkah", "Falsehood fades away"],
      quote: q34(49),
      source: ik(49, "On the day Makkah was opened, the Prophet ﷺ struck the idols around the Kabah while reciting that truth had come.", "he started to hit the idols with his bow"),
      difficulty: 3,
      questions: [
        { q: "What has come, in 34:49?", a: "The truth", wrong: ["A storm", "A king", "A famine"], why: "Say: The truth has come." },
        { q: "What can falsehood do, in 34:49?", a: "Neither create nor restore", wrong: ["Create anything", "Bring back the dead", "Rule forever"], why: "And the falsehood can neither create anything nor resurrect." },
        { q: "When was it recited, per Ibn Kathir?", a: "At the conquest of Makkah", wrong: ["At Badr", "At Uhud", "At Tabuk"], why: "When the Messenger of Allah entered Al-Masjid Al-Haram on the day of the conquest of Makkah." }
      ]
    },
    {
      slug: "all-hearer-ever-near",
      title: "All-Hearer, Ever Near",
      line: "If guided, it is by my Lord's revelation; He is Ever Near.",
      facts: ["All good is from Allah", "He hears every call"],
      quote: q34(50),
      source: ik(50, "He hears all the words of His servants and is always near to respond when they call on Him.", "He is always near to respond to them when they call on Him"),
      difficulty: 3,
      questions: [
        { q: "Why is he guided, in 34:50?", a: "By his Lord's revelation", wrong: ["By luck", "By his tribe", "By wealth"], why: "But if I remain guided, it is because of the Revelation of my Lord to me." },
        { q: "How near is Allah, in 34:50?", a: "Ever Near", wrong: ["Far away", "Absent", "Asleep"], why: "Truly, He is All-Hearer, Ever Near." },
        { q: "What does He do when we call, per Ibn Kathir?", a: "He responds", wrong: ["Ignores us", "Waits years", "Forgets"], why: "He is always near to respond to them when they call on Him." }
      ]
    },
    {
      slug: "no-escape-then",
      title: "No escape then",
      line: "On that Day the deniers will be seized, with nowhere to run.",
      facts: ["Taken from a near place", "No refuge at all"],
      quote: q34(51),
      source: ik(51, "They will have no way of escape, nowhere to run and no refuge; they are seized from the first moment.", "they will not even be given the slightest chance of escape"),
      difficulty: 4,
      questions: [
        { q: "From where are they seized, in 34:51?", a: "A near place", wrong: ["A far land", "The sea", "The sky"], why: "And they will be seized from a near place." },
        { q: "What chance of escape, per Ibn Kathir?", a: "Not the slightest", wrong: ["A good chance", "One day", "Half"], why: "They will not even be given the slightest chance of escape." },
        { tf: true, q: "Al-Hasan linked the terror to rising from graves.", why: "Al-Hasan Al-Basri said: When they come forth from their graves." }
      ]
    },
    {
      slug: "too-far-to-reach",
      title: "Too far to reach",
      line: "They will say: we believe now. But faith is out of reach.",
      facts: ["The test is in this world", "Believe while you can"],
      quote: q34(52),
      source: ik(52, "The Hereafter is the place of reward, not of testing, so faith cannot be accepted then.", "which is the realm of reward and punishment, not the realm of trial and testing"),
      difficulty: 4,
      questions: [
        { q: "What will they say, in 34:52?", a: "We believe now", wrong: ["We are fine", "We are leaving", "We forgot"], why: "And they will say: We do believe (now)." },
        { q: "Why is it too late, per Ibn Kathir?", a: "The test is over", wrong: ["They are tired", "They are rich", "They are few"], why: "The realm of reward and punishment, not the realm of trial and testing." },
        { tf: true, q: "Faith must be gained in this world.", why: "If they had believed in this world, that would have been good for them." }
      ]
    },
    {
      slug: "guessing-at-the-unseen",
      title: "Guessing at the unseen",
      line: "They denied before and made wild guesses about the Unseen.",
      facts: ["Poet, magician, madman: all guesses", "Their denial was conjecture"],
      quote: q34(53),
      source: ik(53, "They guessed: sometimes they called him a poet, sometimes a soothsayer, a sorcerer, or mad.", "Sometimes they said he was a poet"),
      difficulty: 4,
      questions: [
        { q: "What did they do with the Unseen, in 34:53?", a: "Guessed about it", wrong: ["Studied it", "Saw it", "Wrote it"], why: "And they (used to) conjecture about the Unseen, from a far place." },
        { q: "What did they call him, per Ibn Kathir?", a: "A poet, among others", wrong: ["A king", "A trader", "A farmer"], why: "Sometimes they said he was a poet, sometimes they said he was a soothsayer." },
        { q: "What was their denial based on, per Qatadah?", a: "Mere conjecture", wrong: ["Proof", "Books", "Witnesses"], why: "Their belief that there would be no resurrection... was based on mere conjecture." }
      ]
    },
    {
      slug: "a-barrier-set",
      title: "A barrier set",
      line: "A barrier will stand between them and what they long for.",
      facts: ["Like nations before them", "Beware of doubt"],
      quote: q34(54),
      source: ik(54, "Qatadah said: beware of doubt; whoever dies doubting is raised doubting, and whoever dies sure is raised sure.", "whoever dies believing, with certainty will be raised believing with certainty"),
      difficulty: 4,
      questions: [
        { q: "What is set between them, in 34:54?", a: "A barrier", wrong: ["A bridge", "A door", "A gift"], why: "And a barrier will be set between them and that which they desire." },
        { q: "What were they in, in 34:54?", a: "Grave doubt", wrong: ["Firm faith", "Great joy", "Deep sleep"], why: "Verily, they have been in grave doubt." },
        { q: "What did Qatadah warn against?", a: "Doubt", wrong: ["Sleep", "Travel", "Trade"], why: "Beware of doubt. For whoever dies doubting, will be raised doubting." }
      ]
    }
  ]
};

export const SABA_UNITS: readonly DeepUnit[] = [SABA_ONE, SABA_TWO];
