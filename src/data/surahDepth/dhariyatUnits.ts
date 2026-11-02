import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Adh-Dhariyat ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Adh-Dhariyat 51:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_51_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Adh-Dhariyat 51:${ayah}`,
    url: `https://quran.com/51:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 51:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q51 = (ayah: number) => quranQuote(51, ayah);

/** Ayahs 1 to 23: oaths that the Day is true, the doubters, the qualities of the people of Taqwa, and signs all around. */
const DHARIYAT_ONE: DeepUnit = {
  key: "dhariyat1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-51",
  name: "Adh-Dhariyat, ayahs 1 to 23",
  kind: "skill",
  lessonType: "surah",
  surahName: "Adh-Dhariyat",
  lessons: [
    {
      slug: "the-scattering-winds",
      title: "The scattering winds",
      line: "Allah swears by the winds that scatter, and the clouds.",
      facts: ["Adh-Dhariyat: the scattering winds", "Ali explained it from the minbar"],
      quote: q51(1),
      source: ik(1, "Ibn Kathir reports that Ali, asked on the minbar in Kufah, said the scattering Dhariyat are the winds.", "ascended the Minbar in Kufah"),
      difficulty: 1,
      questions: [
        { q: "What are the Dhariyat, per Ali?", a: "The winds", wrong: ["The stars", "The birds", "The rivers"], why: "By the scattering Dhariyat, and Ali said, The wind." },
        { q: "Who asked Ali about these ayahs?", a: "Ibn Al-Kawwa", wrong: ["Ibn Abbas", "Abu Hurayrah", "Anas"], why: "Ibn Al-Kawwa stood up and said, O Leader of the faithful!" },
        { q: "Where was Ali when he explained these ayahs?", a: "On the minbar in Kufah", wrong: ["In Makkah", "On a journey", "In a market"], why: "Ali bin Abi Talib ascended the Minbar in Kufah." }
      ]
    },
    {
      slug: "the-laden-clouds",
      title: "The laden clouds",
      line: "The clouds carry heavy loads of water across the sky.",
      facts: ["Hamilat: the laden clouds", "Winds bring the clouds"],
      quote: q51(2),
      source: ik(2, "Ibn Kathir says the oaths rise in order: winds bring the clouds, the stars are above them, and the angels above that.", "The winds bring the clouds, the stars are above them"),
      difficulty: 2,
      questions: [
        { q: "What are the laden Hamilat, per Ali?", a: "The clouds", wrong: ["The camels", "The ships", "The mountains"], why: "And the laden Hamilat? Ali said, The clouds." },
        { q: "What brings the clouds, per Ibn Kathir?", a: "The winds", wrong: ["The ships", "The stars", "The birds"], why: "The winds bring the clouds, the stars are above them." },
        { tf: true, q: "The oaths go from lower things to higher ones, per Ibn Kathir.", why: "The things mentioned were ascendant in their order, beginning with the lower, then mentioning the higher one after that." }
      ]
    },
    {
      slug: "the-sailing-ships",
      title: "The sailing ships",
      line: "Allah swears by the ships that sail along with ease.",
      facts: ["Jariyat: the ships", "Or the stars in orbit"],
      quote: q51(3),
      source: ik(3, "Ali said the steady Jariyat are the ships, and the distributors of command are the angels.", "The ships"),
      difficulty: 2,
      questions: [
        { q: "What are the steady Jariyat, per Ali?", a: "The ships", wrong: ["The winds", "The fish", "The clouds"], why: "And the steady Jariyat? Ali said, The ships." },
        { tf: true, q: "Some scholars said the Jariyat may be the stars in orbit.", why: "Some scholars said that Al-Jariyat Yusra refers to the stars that float in their orbits with ease." },
        { q: "How do the Jariyat move, in 51:3?", a: "Steadily, with ease", wrong: ["Wildly", "Not at all", "Backward"], why: "And the steady Jariyat." }
      ]
    },
    {
      slug: "the-distributing-angels",
      title: "The distributing angels",
      line: "The angels carry and distribute Allah's commands.",
      facts: ["They come down with His orders", "Highest of the oaths"],
      quote: q51(4),
      source: ik(4, "Ibn Kathir says the angels distribute by Allah's order and descend with His commands and decrees.", "the angels who distribute by Allah"),
      difficulty: 2,
      questions: [
        { q: "Who are the distributors of command, per Ali?", a: "The angels", wrong: ["The kings", "The prophets", "The scholars"], why: "And the distributors of command? Ali said, it refers to The angels." },
        { q: "What do the angels bring down, per Ibn Kathir?", a: "Allah's commands and decrees", wrong: ["Rain only", "Gold", "Stars"], why: "They descend with Allah's legislative orders and the decrees He determines." },
        { tf: true, q: "The angels are the highest of the four oaths, per Ibn Kathir.", why: "The stars are above them and the angels who distribute by Allah's order are above that." }
      ]
    },
    {
      slug: "the-promise-is-true",
      title: "The promise is true",
      line: "What you are promised is true, and the Recompense will come.",
      facts: ["Ad-Din: the Recompense", "The oaths confirm it"],
      quote: q51(5),
      source: ik(5, "Ibn Kathir says these oaths are a vow from Allah that the Resurrection will surely come to pass.", "These Ayat contain a vow from Allah that Resurrection shall come to pass"),
      difficulty: 1,
      questions: [
        { q: "What does 51:5 say of the promise?", a: "It is surely true", wrong: ["It is far", "It is a dream", "It is unknown"], why: "Verily, that which you are promised is surely true." },
        { q: "What does Ad-Din mean in 51:6, per Ibn Kathir?", a: "The Recompense", wrong: ["The market", "The journey", "The weather"], why: "And verily, Ad-Din, the Recompense, will occur." },
        { tf: true, q: "The oaths at the start of 51 confirm the Resurrection.", why: "These Ayat contain a vow from Allah that Resurrection shall come to pass." }
      ]
    },
    {
      slug: "the-recompense-will-come",
      title: "The Recompense will come",
      line: "The Day of Recompense will surely happen.",
      facts: ["Ad-Din: repayment for deeds", "A truthful promise"],
      quote: q51(6),
      source: ik(6, "Ibn Kathir says Ad-Din, the Recompense, will surely come to pass.", "it will surely come to pass"),
      difficulty: 1,
      questions: [
        { q: "What will surely occur, in 51:6?", a: "Ad-Din, the Recompense", wrong: ["A great flood", "A new king", "A long winter"], why: "And verily, Ad-Din is sure to occur." },
        { q: "What does Ibn Kathir call the promise in 51:5?", a: "A truthful promise", wrong: ["A guess", "A story", "A dream"], why: "Verily, that which you are promised is surely true, it is a truthful promise." },
        { tf: true, q: "Every deed will be repaid on the Day of Recompense.", why: "And verily, Ad-Din, the Recompense, will occur, it will surely come to pass." }
      ]
    },
    {
      slug: "a-sky-full-of-paths",
      title: "A sky full of paths",
      line: "Allah swears by the sky full of beauty and paths.",
      facts: ["Hubuk: beauty and perfection", "Stars adorn it"],
      quote: q51(7),
      source: ik(7, "Ibn Abbas said Hubuk means full of beauty, grace, magnificence and perfection.", "Full of beauty, grace, magnificence and perfection"),
      difficulty: 2,
      questions: [
        { q: "What does Hubuk mean, per Ibn Abbas?", a: "Full of beauty and perfection", wrong: ["Full of rain", "Full of birds", "Empty"], why: "Ibn Abbas said; Full of beauty, grace, magnificence and perfection." },
        { q: "What do all the sayings on Hubuk return to?", a: "Beauty and complexity", wrong: ["Darkness", "Cold", "Noise"], why: "All of these sayings return to the same meaning, that of beauty and complexity." },
        { tf: true, q: "Ibn Kathir says the sky is beautified with stars.", why: "Beautified with stars such as the sun and orbiting planets such as the moon." }
      ]
    },
    {
      slug: "different-ideas",
      title: "Different ideas",
      line: "Those who deny have mixed-up claims that never agree.",
      facts: ["Some said true, some denied", "Truth stays consistent"],
      quote: q51(8),
      source: ik(8, "Ibn Kathir says the deniers have different and confused opinions that do not agree with each other.", "have different and confused opinions that do not connect or conform to each other"),
      difficulty: 2,
      questions: [
        { q: "What does 51:8 say they have?", a: "Different ideas", wrong: ["One clear view", "No ideas", "Good proofs"], why: "Certainly, you have different ideas." },
        { q: "About what were their ideas different, per Qatadah?", a: "About the Quran", wrong: ["About trade", "About poetry", "About weather"], why: "Qatadah commented on the Ayah, You have different ideas about the Quran." },
        { tf: true, q: "Their claims contradicted one another, per Ibn Kathir.", why: "Have different and confused opinions that do not connect or conform to each other." }
      ]
    },
    {
      slug: "turned-aside",
      title: "Turned aside",
      line: "Only those already turned away are fooled by such claims.",
      facts: ["Falsehood fools the heedless", "Seek sound understanding"],
      quote: q51(9),
      source: ik(9, "Ibn Kathir says confused claims only fool those who are already misguided inside.", "these confused and different opinions only fool those who are inwardly misguided"),
      difficulty: 2,
      questions: [
        { q: "Who is turned aside, in 51:9?", a: "He who is turned aside", wrong: ["Every traveler", "The believers", "The angels"], why: "Turned aside therefrom is he who is turned aside." },
        { q: "Whom do these claims fool, per Ibn Kathir?", a: "Those inwardly misguided", wrong: ["The wise", "The scholars", "Everyone"], why: "These confused and different opinions only fool those who are inwardly misguided." },
        { tf: true, q: "Ibn Abbas said the misguided is led away from the truth.", why: "He who is misguided is led astray from it." }
      ]
    },
    {
      slug: "the-doubters",
      title: "The doubters",
      line: "51:10-11 blame those who doubt and stay heedless.",
      facts: ["Al-Kharrasun: liars, doubters", "Sahun: heedless play"],
      quote: q51(10),
      source: ik(10, "Ibn Kathir says Al-Kharrasun are those who claim they will never be raised, doubting the Resurrection.", "Al-Kharrasun are those who claim that they will never be brought back to life"),
      difficulty: 2,
      questions: [
        { q: "Who are Al-Kharrasun, per Ibn Kathir?", a: "Those who deny being raised", wrong: ["Farmers", "Sailors", "Builders"], why: "Al-Kharrasun are those who claim that they will never be brought back to life, doubting the coming of Resurrection." },
        { q: "What did Qatadah say Al-Kharrasun are?", a: "People of doubt and suspicion", wrong: ["People of trade", "People of the sea", "People of poetry"], why: "Qatadah said, Al-Kharrasun are the people of doubt and suspicion." },
        { q: "What did Muadh say in one of his speeches?", a: "Destroyed be the doubters", wrong: ["Welcome the doubters", "Doubt is good", "Never ask"], why: "During one of his speeches he said, Destroyed be the doubters." }
      ]
    },
    {
      slug: "heedless-and-playful",
      title: "Heedless and playful",
      line: "Some live covered in heedlessness, playing their life away.",
      facts: ["Sahun: heedless", "Wake the heart"],
      quote: q51(11),
      source: ik(11, "Ibn Abbas and others said under a cover of Sahun means heedless and playful in disbelief and doubt.", "In disbelief and doubt, they are heedless and playful"),
      difficulty: 2,
      questions: [
        { q: "What does Sahun mean, per Ibn Abbas?", a: "Heedless and playful", wrong: ["Very wise", "Very busy", "Very tired"], why: "In disbelief and doubt, they are heedless and playful." },
        { q: "What are they under, in 51:11?", a: "A cover of Sahun", wrong: ["A tent", "A cloud", "A tree"], why: "Who are under a cover of Sahun." },
        { tf: true, q: "A believer avoids a heedless, careless life.", why: "In disbelief and doubt, they are heedless and playful." }
      ]
    },
    {
      slug: "when-is-the-day",
      title: "When is the Day?",
      line: "They mocked: when is the Day? It will come, they will see.",
      facts: ["Asked in denial", "Do not rush the warning"],
      quote: q51(12),
      source: ik(12, "Ibn Kathir says they asked when the Day of Recompense is out of denial, stubbornness and doubt.", "They utter this statement in denial, stubbornness, doubt and suspicion"),
      difficulty: 2,
      questions: [
        { q: "What did they ask, in 51:12?", a: "When is the Day of Ad-Din?", wrong: ["Where is the rain?", "Who is the king?", "What is the price?"], why: "They ask: When will be the Day of Ad-Din?" },
        { q: "Why did they ask, per Ibn Kathir?", a: "In denial and doubt", wrong: ["To learn", "To prepare", "To pray"], why: "They utter this statement in denial, stubbornness, doubt and suspicion." },
        { tf: true, q: "Allah answered their question in the next ayah, 51:13.", why: "They utter this statement in denial, stubbornness, doubt and suspicion. Allah the Exalted replied." }
      ]
    },
    {
      slug: "a-day-of-trial",
      title: "A day of trial",
      line: "Those who mocked the Day will face its trial.",
      facts: ["Yuftanun: put to trial", "Do not mock the warning"],
      quote: q51(13),
      source: ik(13, "Ibn Kathir says Ibn Abbas, Mujahid and others said Yuftanun means punished.", "Yuftanun means punished"),
      difficulty: 3,
      questions: [
        { q: "What does Yuftanun mean, per Ibn Abbas?", a: "Punished", wrong: ["Rewarded", "Forgiven", "Moved"], why: "Ibn Abbas, Mujahid, Al-Hasan and several others said that Yuftanun means punished." },
        { q: "What did they used to ask, in 51:14?", a: "For it to be hastened", wrong: ["For it to be delayed", "For more rain", "For a king"], why: "This is what you used to ask to be hastened!" },
        { tf: true, q: "51:13 answers their question about the Day.", why: "They ask: When will be the Day of Ad-Din? Allah the Exalted replied." }
      ]
    },
    {
      slug: "they-asked-to-hasten-it",
      title: "They asked to hasten it",
      line: "They mockingly asked to hurry it; it came as a rebuke.",
      facts: ["Patience is wiser", "Taste your trial"],
      quote: q51(14),
      source: ik(14, "Ibn Kathir says 51:14 is said to them in rebuke, since they used to ask for it to be hastened.", "This will be said admonishing"),
      difficulty: 3,
      questions: [
        { q: "What will be said to them, in 51:14?", a: "Taste your trial", wrong: ["Welcome home", "Rest now", "Go back"], why: "Taste you your trial! This is what you used to ask to be hastened!" },
        { q: "How is 51:14 said to them, per Ibn Kathir?", a: "As a rebuke", wrong: ["As praise", "As a joke", "As a question"], why: "This will be said admonishing, chastising, humiliating and belittling them." },
        { tf: true, q: "Asking for punishment to come quickly is foolish.", why: "This is what you used to ask to be hastened!" }
      ]
    },
    {
      slug: "gardens-and-springs",
      title: "Gardens and springs",
      line: "The people of Taqwa will be among gardens and springs.",
      facts: ["Joy in what Allah gives", "They did good before"],
      quote: q51(15),
      source: ik(15, "Ibn Kathir says on the Day of Return the people of Taqwa will be amid gardens and springs.", "that on the Day of their Return they will be amidst gardens and springs"),
      difficulty: 1,
      questions: [
        { q: "Where will the people of Taqwa be, in 51:15?", a: "Among Gardens and Springs", wrong: ["In deserts", "On mountains", "At sea"], why: "Verily, those who have Taqwa will be in the midst of Gardens and Springs." },
        { q: "What do they do with what Allah gives, in 51:16?", a: "Take joy in it", wrong: ["Sell it", "Hide it", "Ignore it"], why: "Taking joy in the things which their Lord has given them." },
        { tf: false, q: "The people of Taqwa will be in deserts.", why: "Verily, those who have Taqwa will be in the midst of Gardens and Springs." }
      ]
    },
    {
      slug: "doers-of-good-before",
      title: "Doers of good before",
      line: "They earned it by doing good in this life.",
      facts: ["Like 69:24", "Deeds sent ahead"],
      quote: q51(16),
      source: ik(16, "Ibn Kathir says they were doers of good before that, in the life of the world, as 69:24 says.", "in the life of the world"),
      difficulty: 1,
      questions: [
        { q: "When were they doers of good, per Ibn Kathir?", a: "In the life of the world", wrong: ["Only in Paradise", "Never", "Only at the end"], why: "Verily, they were before that, in the life of the world, gooddoers." },
        { q: "Which ayah says: eat and drink for what you sent before?", a: "69:24", wrong: ["2:2", "112:1", "55:1"], why: "Eat and drink at ease for that which you have sent on before you in days past! (69:24)" },
        { tf: true, q: "They receive delight, happiness and favors from their Lord.", why: "They will receive what their Lord gives them, meaning, delight, happiness and favors." }
      ]
    },
    {
      slug: "little-sleep-at-night",
      title: "Little sleep at night",
      line: "They slept little at night, standing in prayer.",
      facts: ["Tahajjud: night prayer", "Hardly a night without prayer"],
      quote: q51(17),
      source: ik(17, "Mutarrif said hardly a night passed without them praying to Allah, at the start or the middle of it.", "Hardly a night would pass by them that they did not pray to Allah the Exalted and Most Honored"),
      difficulty: 2,
      questions: [
        { q: "How did they sleep, in 51:17?", a: "But little by night", wrong: ["All night long", "Only in the day", "Never at all"], why: "They used to sleep but little by night." },
        { q: "What did Mutarrif say of their nights?", a: "Hardly one passed without prayer", wrong: ["They slept all night", "They traveled", "They feasted"], why: "Hardly a night would pass by them that they did not pray to Allah the Exalted and Most Honored." },
        { q: "What did Anas say they prayed between?", a: "Maghrib and Isha", wrong: ["Fajr and Dhuhr", "Asr and Maghrib", "Dhuhr and Asr"], why: "They used to pray between Al-Maghrib and Al-Isha." }
      ]
    },
    {
      slug: "four-keys-to-paradise",
      title: "Four keys to Paradise",
      line: "Feed others, keep ties, spread Salam, pray at night.",
      facts: ["The first words in Madinah", "Abdullah ibn Salam heard them"],
      quote: q51(17),
      source: ik(17, "Ibn Kathir reports the first words Abdullah ibn Salam heard in Madinah: feed food, keep ties, spread Salam, pray at night.", "pray at night while people are asleep, and you will enter Paradise in peace"),
      difficulty: 2,
      questions: [
        { q: "Who heard these words when he ﷺ reached Madinah?", a: "Abdullah ibn Salam", wrong: ["Abu Bakr", "Bilal", "Umar"], why: "Abdullah bin Salam said, When the Messenger of Allah arrived at Al-Madinah." },
        { q: "What did Abdullah ibn Salam know from his face?", a: "Not the face of a liar", wrong: ["He was tired", "He was a king", "He was a stranger"], why: "When I saw his face, I knew that it was not the face of a liar." },
        { q: "Which is one of the four deeds?", a: "Spread the Salam", wrong: ["Build towers", "Travel far", "Win races"], why: "O people! Feed with food, keep relations to kith and kin, spread the Salam, pray at night while people are asleep." }
      ]
    },
    {
      slug: "forgiveness-before-dawn",
      title: "Forgiveness before dawn",
      line: "Before dawn, they asked Allah for forgiveness.",
      facts: ["Like 3:17", "The last third of the night"],
      quote: q51(18),
      source: ik(18, "Ibn Kathir says they prayed at night and asked forgiveness in the last hours before dawn.", "delayed asking Allah for forgiveness until the latter hours before dawn"),
      difficulty: 2,
      questions: [
        { q: "When did they ask forgiveness, in 51:18?", a: "In the hours before dawn", wrong: ["At noon", "At sunset", "At midday meal"], why: "And in the hours before dawn, they were asking for forgiveness." },
        { q: "Which ayah also praises asking forgiveness before dawn?", a: "3:17", wrong: ["2:255", "112:1", "1:5"], why: "And those who seek forgiveness during the last hours of the night. (3:17)" },
        { tf: true, q: "Yaqub delayed his dua for his sons until before dawn, per many.", why: "When Yaqub said to his sons: I will ask my Lord for forgiveness for you (12:98), he delayed doing so until the hours before dawn." }
      ]
    },
    {
      slug: "the-last-third",
      title: "The last third",
      line: "In the last third of night, Allah asks: who will call Me?",
      facts: ["Ask, seek forgiveness", "Until Fajr begins"],
      quote: q51(18),
      source: hadith("bukhari", "1145", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said that in the last third of every night Allah asks: is there anyone to call Me, ask Me, or seek My forgiveness, that I may answer, give, and forgive?", "Is there anyone seeking My forgiveness, so that I may forgive him"),
      difficulty: 2,
      questions: [
        { q: "When does Allah call out, per Bukhari 1145?", a: "The last third of the night", wrong: ["At noon", "At sunset", "The first hour"], why: "When the last third of the night remains." },
        { q: "What does Allah offer the one seeking forgiveness?", a: "That He may forgive him", wrong: ["Gold", "A long life", "Nothing"], why: "Is there anyone seeking My forgiveness, so that I may forgive him?" },
        { tf: true, q: "Ibn Kathir cites Bukhari 1145 to explain 51:18.", why: "It is confirmed in the Sahih collections as well as others, from several Companions." }
      ]
    },
    {
      slug: "the-right-of-the-poor",
      title: "The right of the poor",
      line: "Their wealth held a right for the asker and the deprived.",
      facts: ["Sa'il: the one who asks", "Mahrum: the deprived"],
      quote: q51(19),
      source: ik(19, "Ibn Kathir says they set aside a part of their wealth for the one who asks and the one deprived.", "He then mentioned their quality of spending in charity and acts of compassion and kindness"),
      difficulty: 2,
      questions: [
        { q: "Who is the Sa'il, per Ibn Kathir?", a: "The poor who asks others", wrong: ["A rich trader", "A traveler", "A guest"], why: "The Sa'il is the poor who begs others, and he has a due right." },
        { q: "Who is the Mahrum, per Qatadah and Az-Zuhri?", a: "One who does not ask anyone", wrong: ["One who asks a lot", "A king", "A merchant"], why: "The Mahrum is the one who does not ask the people for anything." },
        { tf: true, q: "Aishah said the Mahrum has no job to earn a living.", why: "He is the displaced, the one who does not have a profession to easily earn an income from." }
      ]
    },
    {
      slug: "the-hidden-poor",
      title: "The hidden poor",
      line: "The truly poor may never ask, so look out for them.",
      facts: ["Their need is unknown", "Give with care"],
      quote: q51(19),
      source: hadith("bukhari", "1479", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said the poor is not the one who goes around asking for a bite or a date, but the one who lacks enough, whose need is unknown, and who does not beg.", "whose condition is not known to others, that others may give him something in charity"),
      difficulty: 3,
      questions: [
        { q: "Who is truly poor, per Bukhari 1479?", a: "One whose need is unknown", wrong: ["One who begs most", "One who is loud", "One who travels"], why: "The poor is that who has not enough money to satisfy his needs and whose condition is not known to others." },
        { q: "Who is not the poor meant, per Bukhari 1479?", a: "One who goes round asking", wrong: ["One who stays home", "One who is quiet", "One who works"], why: "The poor person is not the one who goes round the people and ask them for a mouthful or two." },
        { tf: true, q: "Ibn Kathir links Bukhari 1479 to the Mahrum in 51:19.", why: "Az-Zuhri added that the Messenger of Allah said, The poor (Miskin) is not the one who goes round to the people." }
      ]
    },
    {
      slug: "signs-on-the-earth",
      title: "Signs on the earth",
      line: "The earth holds signs for those with certain faith.",
      facts: ["Plants, animals, rivers", "Mountains and oceans"],
      quote: q51(20),
      source: ik(20, "Ibn Kathir says the earth has signs of the Creator's might: plants, animals, valleys, mountains, rivers and oceans.", "the various plants, animals, valleys, mountains, deserts, rivers and oceans"),
      difficulty: 1,
      questions: [
        { q: "For whom are the signs on earth, in 51:20?", a: "Those who have certain faith", wrong: ["Only travelers", "Only farmers", "Only kings"], why: "And on the earth are signs for those who have faith with certainty." },
        { q: "What do the signs on earth testify to, per Ibn Kathir?", a: "The might of the Creator", wrong: ["Luck", "Old stories", "Nothing"], why: "There are signs on earth that testify to the might of the Creator and His boundless ability." },
        { tf: true, q: "People have different languages and colors, a sign of Allah.", why: "He also created mankind with different languages, colors, intentions and abilities." }
      ]
    },
    {
      slug: "signs-in-yourselves",
      title: "Signs in yourselves",
      line: "Look at yourself too: will you not then see?",
      facts: ["Every organ in its place", "Joints that bend for worship"],
      quote: q51(21),
      source: ik(21, "Qatadah said whoever thinks about his own creation sees he was made with flexible joints, easy for worship.", "he was created with flexible joints so that it is easy for him to perform acts of worship"),
      difficulty: 2,
      questions: [
        { q: "Where else are signs, in 51:21?", a: "In yourselves", wrong: ["Only in books", "Only in the sky", "Nowhere else"], why: "And also in yourselves. Will you not then see?" },
        { q: "What did Qatadah notice about our bodies?", a: "Flexible joints for worship", wrong: ["Strong teeth", "Long hair", "Loud voices"], why: "He was created with flexible joints so that it is easy for him to perform acts of worship." },
        { tf: true, q: "Allah put every organ where it is most needed.", why: "Allah put every organ in their bodies in its rightful place where they most need it to be." }
      ]
    },
    {
      slug: "provision-from-the-sky",
      title: "Provision from the sky",
      line: "In the sky is your provision and what you are promised.",
      facts: ["Provision: the rain", "Promised: Paradise"],
      quote: q51(22),
      source: ik(22, "Ibn Abbas and Mujahid said the provision in the sky is rain, and what is promised is Paradise.", "meaning, rain"),
      difficulty: 1,
      questions: [
        { q: "What is the provision in the sky, per Ibn Kathir?", a: "Rain", wrong: ["Gold", "Stars", "Birds"], why: "And in the heaven is your provision, meaning, rain." },
        { q: "What is that which you are promised, per Ibn Abbas?", a: "Paradise", wrong: ["A palace on earth", "A long trip", "Fame"], why: "And that which you are promised, meaning Paradise." },
        { tf: true, q: "51:22 says our provision is in the heaven.", why: "And in the heaven is your provision, and that which you are promised." }
      ]
    },
    {
      slug: "as-true-as-you-speak",
      title: "As true as you speak",
      line: "By heaven's Lord, the Day is as true as your own speech.",
      facts: ["Allah swears by Himself", "No room for doubt"],
      quote: q51(23),
      source: ik(23, "Ibn Kathir says Allah swears by Himself that the Judgement is true, so do not doubt it, just as you do not doubt that you speak.", "so do not doubt its coming, just as you do not doubt that you can speak"),
      difficulty: 2,
      questions: [
        { q: "By whom does Allah swear, in 51:23?", a: "The Lord of heaven and earth", wrong: ["The sun", "The fig", "The night"], why: "Then by the Lord of the heaven and the earth, it is the truth, just as you can speak." },
        { q: "How certain is it, per Ibn Kathir?", a: "As certain as our speaking", wrong: ["Half sure", "Only a guess", "Unknown"], why: "So do not doubt its coming, just as you do not doubt that you can speak." },
        { q: "What did Muadh say when speaking to a friend?", a: "As true as your being present", wrong: ["As far as the moon", "As old as time", "As big as a hill"], why: "Muadh would tell a friend that what he said was as true as the friend being present." }
      ]
    }
  ]
};

/** Ayahs 24 to 46: the honored guests of Ibrahim, and lessons from Lut, Musa, Ad, Thamud and Nuh. */
const DHARIYAT_TWO: DeepUnit = {
  key: "dhariyat2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-51",
  name: "Adh-Dhariyat, ayahs 24 to 46",
  kind: "skill",
  lessonType: "surah",
  surahName: "Adh-Dhariyat",
  lessons: [
    {
      slug: "ibrahims-honored-guests",
      title: "Ibrahim's honored guests",
      line: "Guests came to Ibrahim, and he honored them.",
      facts: ["Also told in Hud and Al-Hijr", "The guests were angels"],
      quote: q51(24),
      source: ik(24, "Ibn Kathir says Ibrahim honored his guests, who were three angels in the form of young men.", "whom Ibrahim honored and who"),
      difficulty: 1,
      questions: [
        { q: "Whose guests does 51:24 speak of?", a: "Ibrahim's", wrong: ["Nuh's", "Musa's", "Yunus's"], why: "Has the story reached you, of the honored guests of Ibrahim." },
        { q: "Who were the guests, per Ibn Kathir?", a: "Three angels", wrong: ["Three traders", "Three kings", "Three shepherds"], why: "The three angels; Jibril, Mikail and Israfil came to Ibrahim in the image of handsome young wonderfully graceful men." },
        { tf: true, q: "Ibn Kathir told this story before in Hud and Al-Hijr.", why: "We mentioned this story before in Surah Hud and Al-Hijr." }
      ]
    },
    {
      slug: "a-better-greeting",
      title: "A better greeting",
      line: "They said Salaman; Ibrahim replied with a better Salamun.",
      facts: ["Like 4:86", "Return a greeting with better"],
      quote: q51(25),
      source: ik(25, "Ibn Kathir says Ibrahim chose a better reply, following Allah's command in 4:86.", "So the Friend of Allah chose a better reply in return for their greeting"),
      difficulty: 2,
      questions: [
        { q: "What did Ibrahim reply, in 51:25?", a: "Salamun", wrong: ["Welcome", "Who are you?", "Go away"], why: "They said: Salaman! He answered: Salamun." },
        { q: "Which ayah says to return a greeting with better?", a: "4:86", wrong: ["2:2", "24:27", "49:11"], why: "When you are greeted with a greeting, greet in return with what is better than it, or return it equally. (4:86)" },
        { tf: true, q: "Ibrahim's Salamun was a stronger greeting than theirs.", why: "Reciprocating the greeting with the term Salamun is stronger than the greeting using the term Salaman." }
      ]
    },
    {
      slug: "the-best-food-quickly",
      title: "The best food, quickly",
      line: "Ibrahim quietly hurried and brought his best roasted calf.",
      facts: ["He did not announce it", "Like 11:69"],
      quote: q51(26),
      source: ik(26, "Ibn Kathir says Ibrahim went in quietly and quickly, bringing the best of what he had.", "Ibrahim discretely went inside in haste"),
      difficulty: 2,
      questions: [
        { q: "What did Ibrahim bring, in 51:26?", a: "A roasted calf", wrong: ["Some bread", "Some dates", "Some milk"], why: "Then he turned to his household, and brought out a roasted calf." },
        { q: "How did Ibrahim go to prepare food, per Ibn Kathir?", a: "Quietly and in haste", wrong: ["Slowly", "Loudly", "After a day"], why: "Ibrahim discretely went inside in haste." },
        { tf: true, q: "Ibrahim served the best of what he had.", why: "And brought out a roasted calf, from the best of his menu." }
      ]
    },
    {
      slug: "manners-with-guests",
      title: "Manners with guests",
      line: "He set food near them and kindly asked: will you not eat?",
      facts: ["Food close to guests", "A gentle invitation"],
      quote: q51(27),
      source: ik(27, "Ibn Kathir says 51:27 teaches manners for guests: serve quickly, bring the best, place it near, and invite kindly.", "this Ayah indicates proper manners for honoring guests"),
      difficulty: 2,
      questions: [
        { q: "What did Ibrahim say to his guests, in 51:27?", a: "Will you not eat?", wrong: ["Eat now!", "Pay first", "Leave soon"], why: "And placed it before them (saying): Will you not eat?" },
        { q: "Where did he place the food, per Ibn Kathir?", a: "Close to them", wrong: ["Far away", "Outside", "On a roof"], why: "He did not place the food far from them and invite them to come close to it to eat. Rather, he placed it close to them." },
        { tf: true, q: "Ibrahim did not first say: we will make food for you.", why: "He did not first mention this favor to them by saying, We will make food for you." }
      ]
    },
    {
      slug: "good-news-of-a-son",
      title: "Good news of a son",
      line: "The angels gave Ibrahim good news of a son with knowledge.",
      facts: ["The son: Ishaq", "Then Yaqub after him"],
      quote: q51(28),
      source: ik(28, "Ibn Kathir says the angels gave the good news of Ishaq, and Yaqub after him, news that gladdened both Ibrahim and his wife.", "This news was as good to Ibrahim as it was to his wife"),
      difficulty: 2,
      questions: [
        { q: "Why did Ibrahim feel fear, per 11:70?", a: "Their hands did not reach the food", wrong: ["They were loud", "They were armed", "It was night"], why: "But when he saw their hands went not towards it, he mistrusted them, and felt a sense of fear of them." },
        { q: "What news did they give, in 51:28?", a: "A son having knowledge", wrong: ["A new house", "Much gold", "A long trip"], why: "And they gave him glad tidings of a son having knowledge." },
        { q: "Who was the son, per Ibn Kathir?", a: "Ishaq", wrong: ["Ismail", "Yusuf", "Lut"], why: "The angels delivered the good news to her of a son, Ishaq, and Yaqub after Ishaq." }
      ]
    },
    {
      slug: "an-old-woman-amazed",
      title: "An old woman amazed",
      line: "His wife was amazed: an old woman, who never had a child!",
      facts: ["She struck her forehead in wonder", "Allah is All-Wise, All-Knowing"],
      quote: q51(29),
      source: ik(29, "Ibn Kathir says she wondered how she could give birth, being old and never able to have children.", "How can I give birth while I am an old woman"),
      difficulty: 2,
      questions: [
        { q: "What did she say, in 51:29?", a: "A barren old woman!", wrong: ["A happy day!", "Bring more food!", "Who are you?"], why: "And said: A barren old woman!" },
        { q: "Why was she amazed, per Ibn Kathir?", a: "She was old and never had children", wrong: ["The food was cold", "The guests left", "It rained"], why: "How can I give birth while I am an old woman? And even when I was young I was barren and could not have children." },
        { q: "What did the angels say of Allah, in 51:30?", a: "He is All-Wise, All-Knower", wrong: ["He is far", "He forgot", "He is tired"], why: "They said: Even so says your Lord. Verily, He is the All-Wise, the All-Knower." }
      ]
    },
    {
      slug: "even-so-says-your-lord",
      title: "Even so says your Lord",
      line: "The angels said: so your Lord has said; He is All-Wise.",
      facts: ["Nothing is hard for Allah", "All-Wise, All-Knowing"],
      quote: q51(30),
      source: ik(30, "Ibn Kathir says Allah knows the honor she deserves and is the Most Wise in what He says and decides.", "He is the All-Knower of the honor that you are worthy of"),
      difficulty: 2,
      questions: [
        { q: "What did the angels say, in 51:30?", a: "Even so says your Lord", wrong: ["Wait a year", "Ask again", "We are not sure"], why: "They said: Even so says your Lord." },
        { q: "Which two names end 51:30?", a: "All-Wise, All-Knower", wrong: ["Most Kind, Most Near", "Strong, Mighty", "First, Last"], why: "Verily, He is the All-Wise, the All-Knower." },
        { tf: true, q: "Allah is Most Wise in His words and decisions, per Ibn Kathir.", why: "He is the most Wise in His statements and decisions." }
      ]
    },
    {
      slug: "what-is-your-mission",
      title: "What is your mission?",
      line: "Ibrahim asked the angels: what have you come for?",
      facts: ["They were sent to Lut's people", "Ibrahim pleaded for them"],
      quote: q51(31),
      source: ik(31, "Ibn Kathir says Ibrahim asked the angels about the mission they were sent with.", "what is the mission that you were sent with"),
      difficulty: 2,
      questions: [
        { q: "What did Ibrahim ask, in 51:31?", a: "For what purpose have you come?", wrong: ["Where is your food?", "When will you leave?", "Who is your king?"], why: "Then for what purpose you have come, O messengers?" },
        { q: "To whom were the angels sent, per Ibn Kathir?", a: "The people of Lut", wrong: ["The people of Hud", "The people of Nuh", "The people of Musa"], why: "We have been sent to a people who are criminals, in reference to the people of Lut." },
        { q: "What did the angels call that people, in 51:32?", a: "A people who are criminals", wrong: ["A kind people", "A poor people", "A lost people"], why: "They said: We have been sent to a people who are criminals." }
      ]
    },
    {
      slug: "ibrahims-gentle-heart",
      title: "Ibrahim's gentle heart",
      line: "Ibrahim pleaded for Lut's people: he was gentle and humble.",
      facts: ["Forbearing and humble", "Like 11:74-76"],
      quote: q51(32),
      source: ik(32, "Ibn Kathir quotes 11:74-76: Ibrahim pleaded for the people of Lut, being forbearing, humble in dua, and repentant.", "Verily, Ibrahim was, without doubt forbearing, used to invoke Allah with humility, and was repentant"),
      difficulty: 3,
      questions: [
        { q: "For whom did Ibrahim plead, per 11:74?", a: "The people of Lut", wrong: ["His guests", "Firawn", "His father"], why: "He began to plead with Us for the people of Lut." },
        { q: "How does 11:75 describe Ibrahim?", a: "Forbearing, humble, repentant", wrong: ["Harsh and proud", "Rich and famous", "Quick to anger"], why: "Verily, Ibrahim was, without doubt forbearing, used to invoke Allah with humility, and was repentant." },
        { tf: true, q: "Ibrahim was told the command of his Lord had come.", why: "O Ibrahim! Forsake this. Indeed, the commandment of your Lord has gone forth." }
      ]
    },
    {
      slug: "stones-marked-by-allah",
      title: "Stones marked by Allah",
      line: "The punishment was precise: each stone was marked by Allah.",
      facts: ["Stones of baked clay", "Nothing happens by chance"],
      quote: q51(33),
      source: ik(33, "Ibn Kathir says each stone was recorded with Allah and marked for its target.", "each stone has the name of its companion"),
      difficulty: 3,
      questions: [
        { q: "What were the stones made of, in 51:33?", a: "Clay", wrong: ["Iron", "Gold", "Ice"], why: "To send down upon them stones of clay." },
        { q: "What did Ibrahim say of Lut, per 29:32?", a: "But there is Lut in it", wrong: ["Lut has left", "Lut is asleep", "Lut is a king"], why: "Ibrahim said: But there is Lut in it." },
        { tf: true, q: "The angels promised to save Lut and his family, per 29:32.", why: "We will verily save him and his family except his wife." }
      ]
    },
    {
      slug: "marked-by-your-lord",
      title: "Marked by your Lord",
      line: "Each stone was marked by Allah for the transgressors.",
      facts: ["Marked means written", "Allah's justice is exact"],
      quote: q51(34),
      source: ik(34, "Ibn Kathir says marked means written, recorded with Allah, each stone bearing a name.", "recorded with Allah to their names"),
      difficulty: 3,
      questions: [
        { q: "For whom were the stones marked, in 51:34?", a: "Transgressors", wrong: ["Travelers", "Guests", "Animals"], why: "Marked by your Lord for transgressors." },
        { q: "What was on each stone, per Ibn Kathir?", a: "The name of its target", wrong: ["Nothing", "A picture", "A number"], why: "Recorded with Allah to their names; each stone has the name of its companion." },
        { tf: true, q: "Ibn Kathir says marked means written with Allah.", why: "Marked, or written, by your Lord for transgressors." }
      ]
    },
    {
      slug: "the-believers-saved",
      title: "The believers saved",
      line: "Allah saved the believers; only one household believed.",
      facts: ["Lut and his family", "Except his wife"],
      quote: q51(35),
      source: ik(35, "Ibn Kathir says the believers brought out were Lut and his family, except his wife.", "they are: Lut and his family, except his wife"),
      difficulty: 2,
      questions: [
        { q: "Whom did Allah bring out, in 51:35?", a: "The believers", wrong: ["The rich", "The strong", "Everyone"], why: "So We brought out from therein the believers." },
        { q: "Who was not saved, per Ibn Kathir?", a: "Lut's wife", wrong: ["Lut's daughters", "Lut", "His guests"], why: "They are: Lut and his family, except his wife." },
        { tf: true, q: "Allah saves the believers even when they are few.", why: "So We brought out from therein the believers." }
      ]
    },
    {
      slug: "only-one-household",
      title: "Only one household",
      line: "In the whole town, only one household had submitted to Allah.",
      facts: ["Lut's home", "Faith is not about numbers"],
      quote: q51(36),
      source: ik(36, "Ibn Kathir quotes 51:36: there was not found there any household of the Muslims except one.", "But We found not there any household of the Muslims except one"),
      difficulty: 2,
      questions: [
        { q: "How many Muslim households were there, in 51:36?", a: "One", wrong: ["Ten", "None", "Many"], why: "But We found not there any household of the Muslims except one." },
        { q: "Whose household was it, per Ibn Kathir?", a: "Lut and his family", wrong: ["Ibrahim's", "A trader's", "A king's"], why: "They are: Lut and his family, except his wife." },
        { tf: true, q: "Standing firm on truth matters even if few do.", why: "But We found not there any household of the Muslims except one." }
      ]
    },
    {
      slug: "a-sign-left-behind",
      title: "A sign left behind",
      line: "Allah left a sign there for those who fear His punishment.",
      facts: ["Their land became a dead sea", "A lesson for believers"],
      quote: q51(37),
      source: ik(37, "Ibn Kathir says Allah left proof of what befell them as a lesson for the believers.", "This should provide a lesson for the believers"),
      difficulty: 2,
      questions: [
        { q: "What did Allah leave, in 51:37?", a: "A sign", wrong: ["A treasure", "A city", "A river of milk"], why: "And We have left there a sign for those who fear the painful torment." },
        { q: "For whom is the sign, in 51:37?", a: "Those who fear the punishment", wrong: ["Only travelers", "Only kings", "No one"], why: "For those who fear the painful torment." },
        { tf: true, q: "Ibn Kathir says their land became a dead sea.", why: "We made their dwelling place a putrid, evil, dead sea." }
      ]
    },
    {
      slug: "musa-and-firawn",
      title: "Musa and Firawn",
      line: "Musa came with clear proof, but Firawn turned away proudly.",
      facts: ["Manifest authority: clear proof", "Like 22:9"],
      quote: q51(38),
      source: ik(38, "Ibn Kathir says Musa came with clear proof, but Firawn turned from the truth in rebellion and arrogance.", "meaning, with clear proof and plain evidence"),
      difficulty: 2,
      questions: [
        { q: "With what was Musa sent, in 51:38?", a: "A manifest authority", wrong: ["An army", "Gold", "A ship"], why: "And in Musa, when We sent him to Firawn with a manifest authority." },
        { q: "Why did Firawn turn away, per Ibn Kathir?", a: "Rebellion and arrogance", wrong: ["He was busy", "He was ill", "He was asleep"], why: "In rebellion and arrogance, Firawn turned away from the plain truth that Musa was sent with." },
        { tf: true, q: "Manifest authority means clear proof, per Ibn Kathir.", why: "With a manifest authority, meaning, with clear proof and plain evidence." }
      ]
    },
    {
      slug: "a-sorcerer-or-a-madman",
      title: "A sorcerer or a madman?",
      line: "Firawn called Musa a sorcerer or madman, turning in pride.",
      facts: ["Like 22:9", "Insults are not proofs"],
      quote: q51(39),
      source: ik(39, "Ibn Kathir says Firawn told Musa he was either a magician or a madman because of his message.", "you are either a magician or a madman"),
      difficulty: 2,
      questions: [
        { q: "What did Firawn call Musa, in 51:39?", a: "A sorcerer or a madman", wrong: ["A king", "A poet", "A friend"], why: "And said: A sorcerer or a madman." },
        { q: "Who turned away with Firawn, in 51:39?", a: "His hosts", wrong: ["Musa", "Harun", "The magicians"], why: "But he turned away along with his hosts." },
        { q: "Which ayah speaks of bending the neck in pride?", a: "22:9", wrong: ["2:2", "1:6", "103:2"], why: "Bending his neck in pride, and leading others too far astray from the path of Allah. (22:9)" }
      ]
    },
    {
      slug: "into-the-sea",
      title: "Into the sea",
      line: "Allah took Firawn and his armies into the sea.",
      facts: ["Yamm: the sea", "He was to blame"],
      quote: q51(40),
      source: ik(40, "Ibn Kathir says Firawn was a denying, stubborn disbeliever worthy of blame.", "was a denying sinner and a stubborn disbeliever worthy of blame"),
      difficulty: 2,
      questions: [
        { q: "Where were Firawn and his armies cast, in 51:40?", a: "Into the sea", wrong: ["Into a cave", "Into a desert", "Into a fire"], why: "So We took him and his armies, and dumped them into the sea (Yamm)." },
        { q: "What does Yamm mean, per Ibn Kathir?", a: "The sea", wrong: ["The river bank", "The palace", "The army"], why: "Into the Yamm, into the sea." },
        { tf: true, q: "51:40 says Firawn was blameworthy.", why: "For he was blameworthy." }
      ]
    },
    {
      slug: "the-barren-wind",
      title: "The barren wind",
      line: "Ad were struck by a barren wind that left nothing.",
      facts: ["A wind that brings no good", "Nothing was spared"],
      quote: q51(41),
      source: ik(41, "Ibn Kathir says the barren wind destroys everything and produces nothing.", "that destroys everything and produces nothing"),
      difficulty: 2,
      questions: [
        { q: "What was sent against Ad, in 51:41?", a: "The barren wind", wrong: ["A flood", "An earthquake", "Locusts"], why: "And in Ad when We sent against them the barren wind." },
        { q: "Why is the wind called barren, per Ibn Kathir?", a: "It produces nothing", wrong: ["It is cold", "It is slow", "It is quiet"], why: "That destroys everything and produces nothing." },
        { tf: true, q: "Ad-Dahhak and Qatadah explained the barren wind.", why: "That destroys everything and produces nothing. This was said by Ad-Dahhak, Qatadah and others." }
      ]
    },
    {
      slug: "the-east-wind-helped",
      title: "The east wind helped",
      line: "The east wind helped him ﷺ; the west wind ended Ad.",
      facts: ["As-Saba: easterly wind", "Ad-Dabur: westerly wind"],
      quote: q51(42),
      source: hadith("bukhari", "1035", "Ibn Abbas", "Sahih", "The Prophet ﷺ said he was granted victory with As-Saba, the east wind, and the nation of Ad was destroyed by Ad-Dabur, the west wind.", "I was granted victory with As-Saba"),
      difficulty: 3,
      questions: [
        { q: "Which wind helped him ﷺ, per Bukhari 1035?", a: "As-Saba, the east wind", wrong: ["Ad-Dabur", "A storm", "No wind"], why: "I was granted victory with As-Saba." },
        { q: "Which wind ended Ad, per Bukhari 1035?", a: "Ad-Dabur, the west wind", wrong: ["As-Saba", "The north wind", "A sea breeze"], why: "The nation of Ad was destroyed by Ad-Dabur (westerly wind)." },
        { tf: true, q: "51:42 says the wind spared nothing it reached.", why: "It spared nothing that it reached, but blew it into broken spreads of rotten ruins." }
      ]
    },
    {
      slug: "thamud-given-time",
      title: "Thamud given time",
      line: "Thamud were told: enjoy for a while; they still defied.",
      facts: ["Three days of respite", "Like 41:17"],
      quote: q51(43),
      source: ik(43, "Ibn Kathir says Thamud were given three days of respite, and the punishment came on the fourth morning.", "Thamud were given a respite for three days"),
      difficulty: 2,
      questions: [
        { q: "What were Thamud told, in 51:43?", a: "Enjoy yourselves for a while", wrong: ["Leave at once", "Build a wall", "Go to sea"], why: "And in Thamud, when they were told: Enjoy yourselves for a while!" },
        { q: "How long was their respite, per Ibn Kathir?", a: "Three days", wrong: ["One hour", "Ten years", "Forty days"], why: "Thamud were given a respite for three days." },
        { q: "What did Thamud prefer, per 41:17?", a: "Blindness over guidance", wrong: ["Guidance over blindness", "Trade over war", "The sea over land"], why: "We guided them to the path of truth, but they preferred blindness to guidance. (41:17)" }
      ]
    },
    {
      slug: "they-defied-their-lord",
      title: "They defied their Lord",
      line: "Thamud defied their Lord, and the blast seized them.",
      facts: ["Sa'iqah: the blast", "The fourth morning"],
      quote: q51(44),
      source: ik(44, "Ibn Kathir says in the early morning of the fourth day the punishment overtook Thamud.", "In the early morning of the fourth day, the torment overtook them"),
      difficulty: 2,
      questions: [
        { q: "What did Thamud do, in 51:44?", a: "Defied their Lord's command", wrong: ["Obeyed at once", "Moved away", "Asked forgiveness"], why: "But they insolently defied the command of their Lord." },
        { q: "What overtook Thamud, in 51:44?", a: "The Sa'iqah", wrong: ["A flood", "A wind", "Locusts"], why: "So the Sa'iqah overtook them while they were looking." },
        { q: "When did it come, per Ibn Kathir?", a: "Early on the fourth day", wrong: ["At once", "After a year", "At night"], why: "In the early morning of the fourth day, the torment overtook them." }
      ]
    },
    {
      slug: "unable-to-rise",
      title: "Unable to rise",
      line: "The blast seized Thamud; none could stand or help himself.",
      facts: ["Sa'iqah: the blast", "No escape from Allah's decree"],
      quote: q51(45),
      source: ik(45, "Ibn Kathir says they could not escape or save themselves when the punishment came.", "they were unable to escape and run away from it"),
      difficulty: 2,
      questions: [
        { q: "What could they not do, in 51:45?", a: "Rise up or help themselves", wrong: ["Speak", "Eat", "Sleep"], why: "Then they were unable to rise up, nor could they help themselves." },
        { tf: true, q: "No one can save himself from Allah's punishment.", why: "Nor could they save themselves from the torment that befell them." }
      ]
    },
    {
      slug: "nuhs-people-before",
      title: "Nuh's people before",
      line: "Before them all were the people of Nuh, who rebelled.",
      facts: ["The oldest of these nations", "Their stories teach us"],
      quote: q51(46),
      source: ik(46, "Ibn Kathir says Allah ended the people of Nuh before Firawn, Ad and Thamud.", "We destroyed the people of Nuh before these people"),
      difficulty: 1,
      questions: [
        { q: "Which people came before them, in 51:46?", a: "The people of Nuh", wrong: ["The people of Isa", "The Romans", "The Persians"], why: "So were the people of Nuh before them." },
        { q: "How does 51:46 describe Nuh's people?", a: "A rebellious people", wrong: ["A grateful people", "A small tribe", "A people of the sea"], why: "Verily, they were a people who were rebellious." },
        { tf: true, q: "Nuh's people came before Firawn, Ad and Thamud.", why: "We destroyed the people of Nuh before these people (Firawn, Ad and Thamud)." }
      ]
    }
  ]
};

/** Ayahs 47 to 60: signs in heaven and earth, flee to Allah, and why Allah created jinn and mankind. */
const DHARIYAT_THREE: DeepUnit = {
  key: "dhariyat3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-51",
  name: "Adh-Dhariyat, ayahs 47 to 60",
  kind: "skill",
  lessonType: "surah",
  surahName: "Adh-Dhariyat",
  lessons: [
    {
      slug: "the-heaven-built-high",
      title: "The heaven built high",
      line: "Allah built the heaven as a high roof, kept from falling.",
      facts: ["No pillars hold it", "Allah made it vast"],
      quote: q51(47),
      source: ik(47, "Ibn Kathir says Allah made the heaven a high roof, protected from falling, vast and without pillars.", "We made it as a high roof, protected from falling"),
      difficulty: 2,
      questions: [
        { q: "What did Allah construct, in 51:47?", a: "The heaven", wrong: ["A palace", "A ship", "A wall"], why: "We constructed the heaven, meaning, We made it as a high roof, protected from falling." },
        { q: "What holds up the sky, per Ibn Kathir?", a: "No pillars, only Allah", wrong: ["Mountains", "Clouds", "Tall trees"], why: "We brought its roof higher without pillars to support it." },
        { tf: true, q: "Ibn Kathir says Allah made the heaven vast.", why: "We made it vast and We brought its roof higher without pillars to support it." }
      ]
    },
    {
      slug: "the-earth-a-bed",
      title: "The earth a bed",
      line: "Allah spread the earth as a resting place for all.",
      facts: ["Firash: a spread bed", "How excellent a spreader"],
      quote: q51(48),
      source: ik(48, "Ibn Kathir says Allah made the earth a resting place and spread it out for its people.", "We have made it a resting place for the created"),
      difficulty: 1,
      questions: [
        { q: "What did Allah make the earth, in 51:48?", a: "A Firash, a spread", wrong: ["A wall", "A tower", "A cave"], why: "And We have made the earth a Firash." },
        { q: "What does Firash mean, per Ibn Kathir?", a: "A resting place", wrong: ["A battlefield", "A market", "A prison"], why: "We have made it a resting place for the created." },
        { tf: true, q: "Allah spread the earth for its inhabitants.", why: "How excellent a spreader thereof are We, meaning We spread it for its inhabitants." }
      ]
    },
    {
      slug: "everything-in-pairs",
      title: "Everything in pairs",
      line: "Allah made everything in pairs, so we remember He is One.",
      facts: ["Night and day, sun and moon", "Only the Creator is One"],
      quote: q51(49),
      source: ik(49, "Ibn Kathir says all creation is in pairs, heaven and earth, night and day, so that we know the Creator is One.", "the heaven and earth, night and day, sun and moon, land and sea, light and darkness"),
      difficulty: 2,
      questions: [
        { q: "What did Allah create in pairs, in 51:49?", a: "Everything", wrong: ["Only animals", "Only plants", "Only people"], why: "And of everything We have created pairs, that you may remember." },
        { q: "Which is a pair named by Ibn Kathir?", a: "Night and day", wrong: ["Gold and silver", "Bread and salt", "Rain and snow"], why: "The heaven and earth, night and day, sun and moon, land and sea, light and darkness." },
        { q: "What should the pairs make us remember?", a: "Allah is One, without partners", wrong: ["Count them", "Fear the dark", "Travel more"], why: "That you may remember, and know that the Creator, Allah, is One without partners." }
      ]
    },
    {
      slug: "flee-to-allah",
      title: "Flee to Allah",
      line: "Run to Allah for shelter, and trust Him in everything.",
      facts: ["He is the safe refuge", "A plain warner came"],
      quote: q51(50),
      source: ik(50, "Ibn Kathir says flee to Allah means seek shelter with Him and trust in Him in all your affairs.", "seek shelter with Him and trust in Him in all of your affairs"),
      difficulty: 2,
      questions: [
        { q: "To whom should we flee, in 51:50?", a: "To Allah", wrong: ["To the sea", "To the mountains", "To the king"], why: "So, flee to Allah." },
        { q: "What does flee to Allah mean, per Ibn Kathir?", a: "Seek shelter and trust in Him", wrong: ["Run from home", "Hide in a cave", "Travel far"], why: "Seek shelter with Him and trust in Him in all of your affairs." },
        { tf: true, q: "51:50 calls the Messenger ﷺ a plain warner from Allah.", why: "Verily, I am a plain warner to you from Him." }
      ]
    },
    {
      slug: "no-other-god",
      title: "No other god",
      line: "Do not set up any other god along with Allah.",
      facts: ["The warning is repeated", "Tawhid is the core"],
      quote: q51(51),
      source: ik(51, "Ibn Kathir says 51:51 means do not associate any partners with Allah.", "do not associate any partners with Him"),
      difficulty: 1,
      questions: [
        { q: "What does 51:51 forbid?", a: "Setting up another god", wrong: ["Traveling at night", "Eating dates", "Building homes"], why: "And set not up any other god along with Allah." },
        { q: "What does Ibn Kathir say 51:51 means?", a: "Associate no partners with Him", wrong: ["Pray only once", "Fast every day", "Never speak"], why: "Do not associate any partners with Him." },
        { tf: true, q: "51:50 and 51:51 both end: I am a plain warner to you.", why: "Verily, I am a plain warner to you from Him." }
      ]
    },
    {
      slug: "the-same-old-insult",
      title: "The same old insult",
      line: "Every messenger was called a sorcerer or a madman.",
      facts: ["Allah comforts His Prophet ﷺ", "Old words, new mouths"],
      quote: q51(52),
      source: ik(52, "Ibn Kathir says Allah comforts His Prophet: the disbelievers of old used the same words with their Messengers.", "the disbelievers of old used the same words with their Messengers"),
      difficulty: 2,
      questions: [
        { q: "What was every messenger called, in 51:52?", a: "A sorcerer or a madman", wrong: ["A king", "A poet only", "A friend"], why: "Likewise, no Messenger came to those before them but they said: A sorcerer or a madman!" },
        { q: "Why does Allah mention this, per Ibn Kathir?", a: "To comfort His Prophet ﷺ", wrong: ["To scare him", "To praise them", "To tell a joke"], why: "Allah comforts His Prophet by saying to Him, just as these idolators denied you." },
        { tf: true, q: "The old nations used the same words as Quraysh.", why: "The disbelievers of old used the same words with their Messengers." }
      ]
    },
    {
      slug: "hearts-that-are-alike",
      title: "Hearts that are alike",
      line: "Did they pass it down? No, their hearts are simply alike.",
      facts: ["Same pride, same words", "Transgressing bounds"],
      quote: q51(53),
      source: ik(53, "Ibn Kathir says they are tyrannical people whose hearts are the same, so they say the same words.", "They are tyrannical people whose hearts are the same"),
      difficulty: 3,
      questions: [
        { q: "What does 51:53 ask?", a: "Did they pass this saying down?", wrong: ["Who built the city?", "Where is the sea?", "When is the harvest?"], why: "Have they transmitted this saying to these?" },
        { q: "Why do they say the same words, per Ibn Kathir?", a: "Their hearts are the same", wrong: ["They read one book", "They met each other", "By chance"], why: "They are tyrannical people whose hearts are the same." },
        { tf: true, q: "51:53 calls them a people transgressing bounds.", why: "Nay, they are themselves a people transgressing beyond bounds!" }
      ]
    },
    {
      slug: "turn-away-unblamed",
      title: "Turn away, unblamed",
      line: "Turn away from them; you are not to blame.",
      facts: ["He ﷺ delivered the message", "Allah does not blame him"],
      quote: q51(54),
      source: ik(54, "Ibn Kathir says Allah would not blame the Prophet ﷺ for turning away from the Quraysh idolators.", "We blame you not if you turn away from them"),
      difficulty: 2,
      questions: [
        { q: "What was he ﷺ told, in 51:54?", a: "Turn away from them", wrong: ["Fight them all", "Leave Islam", "Stop praying"], why: "So turn away from them, you are not blameworthy." },
        { q: "Is he ﷺ blamed for turning away, per Ibn Kathir?", a: "No, he is not blamed", wrong: ["Yes, always", "Only a little", "Only at night"], why: "We blame you not if you turn away from them." },
        { tf: true, q: "51:54 was about the idolators of Quraysh, per Ibn Kathir.", why: "O Muhammad, turn away from the Quraysh idolators." }
      ]
    },
    {
      slug: "reminders-help-believers",
      title: "Reminders help believers",
      line: "Keep reminding: reminders benefit the believers.",
      facts: ["Believing hearts benefit", "Never stop reminding"],
      quote: q51(55),
      source: ik(55, "Ibn Kathir says only believing hearts benefit from being reminded.", "for only the believing hearts benefit from being reminded"),
      difficulty: 1,
      questions: [
        { q: "What does 51:55 command?", a: "And remind", wrong: ["And be silent", "And leave", "And hide"], why: "And remind, for verily, the reminding profits the believers." },
        { q: "Whom does reminding profit, in 51:55?", a: "The believers", wrong: ["The proud", "No one", "Only kings"], why: "For verily, the reminding profits the believers." },
        { tf: true, q: "Believing hearts benefit from reminders, per Ibn Kathir.", why: "For only the believing hearts benefit from being reminded." }
      ]
    },
    {
      slug: "created-to-worship",
      title: "Created to worship",
      line: "Allah created jinn and mankind only to worship Him.",
      facts: ["The purpose of life", "Allah does not need us"],
      quote: q51(56),
      source: ik(56, "Ibn Kathir says Allah created them to worship Him alone, not because He needs them.", "I, Allah, only created them so that I order them to worship Me, not that I need them"),
      difficulty: 1,
      questions: [
        { q: "Why were jinn and mankind created, in 51:56?", a: "To worship Allah", wrong: ["To get rich", "To rule others", "To play"], why: "And I created not the Jinn and mankind except that they should worship Me." },
        { q: "Does Allah need our worship, per Ibn Kathir?", a: "No, He does not need them", wrong: ["Yes", "Sometimes", "Only on Fridays"], why: "I, Allah, only created them so that I order them to worship Me, not that I need them." },
        { tf: true, q: "51:56 names both jinn and mankind.", why: "And I created not the Jinn and mankind except that they should worship Me." }
      ]
    },
    {
      slug: "allahs-right-on-us",
      title: "Allah's right on us",
      line: "Allah's right on us: worship Him alone, with no partner.",
      facts: ["Muadh rode behind him ﷺ", "Good news for the faithful"],
      quote: q51(56),
      source: hadith("bukhari", "2856", "Mu'adh ibn Jabal", "Sahih", "The Prophet ﷺ told Muadh that Allah's right on His servants is that they worship Him alone, and their right on Him is that He not punish one who worships none besides Him.", "should not worship any besides Him"),
      difficulty: 3,
      questions: [
        { q: "What is Allah's right on His servants, per Bukhari 2856?", a: "To worship Him alone", wrong: ["To pay a tax", "To build mosques", "To travel"], why: "Allah's right on His slaves is that they should worship Him (Alone) and should not worship any besides Him." },
        { q: "What is the servant's right on Allah, per Bukhari 2856?", a: "Not to be punished if no shirk", wrong: ["Wealth", "Fame", "A long life"], why: "And slave's right on Allah is that He should not punish him who worships none besides Him." },
        { q: "What was Muadh riding, per Bukhari 2856?", a: "A donkey", wrong: ["A camel", "A horse", "A mule"], why: "I was a companion rider of the Prophet ﷺ on a donkey called Ufair." }
      ]
    },
    {
      slug: "allah-needs-nothing",
      title: "Allah needs nothing",
      line: "Allah asks no provision from us, nor that we feed Him.",
      facts: ["We need Him always", "He needs no one"],
      quote: q51(57),
      source: ik(57, "Ibn Kathir says Allah does not need His creatures; they need Him in every condition.", "Allah stated that He does not need creatures, but rather, they are in need of Him in all conditions"),
      difficulty: 2,
      questions: [
        { q: "What does Allah not seek from us, in 51:57?", a: "Any provision", wrong: ["Our prayers", "Our thanks", "Our good deeds"], why: "I seek not any provision from them nor do I ask that they should feed Me." },
        { q: "Who needs whom, per Ibn Kathir?", a: "We need Allah always", wrong: ["Allah needs us", "No one needs anyone", "Only kings need Allah"], why: "He does not need creatures, but rather, they are in need of Him in all conditions." },
        { tf: false, q: "Allah needs us to feed Him.", why: "Nor do I ask that they should feed Me." }
      ]
    },
    {
      slug: "the-all-provider",
      title: "The All-Provider",
      line: "Allah is the All-Provider, Owner of power, the Most Strong.",
      facts: ["Ar-Razzaq: the Provider", "Al-Matin: the Most Strong"],
      quote: q51(58),
      source: ik(58, "Ibn Kathir says Allah alone is their Creator and Provider.", "He is alone their Creator and Provider"),
      difficulty: 1,
      questions: [
        { q: "Which names are in 51:58?", a: "All-Provider, Most Strong", wrong: ["Most Near, Kind", "First, Last", "Light, Guide"], why: "Verily, Allah is the All-Provider, Owner of power, the Most Strong." },
        { q: "Who provides for creation, per Ibn Kathir?", a: "Allah alone", wrong: ["Kings", "Parents only", "Luck"], why: "He is alone their Creator and Provider." },
        { tf: true, q: "Obeying Allah brings the best reward, per Ibn Kathir.", why: "Those who obey Him will be rewarded with the best rewards." }
      ]
    },
    {
      slug: "do-not-rush-it",
      title: "Do not rush it",
      line: "Wrongdoers get a share like those before; do not rush it.",
      facts: ["Like the nations before", "The promise will come"],
      quote: q51(59),
      source: ik(59, "Ibn Kathir says the wrongdoers will receive their due share, so let them not ask for it to be rushed, for it will surely come.", "let them not ask that the punishment is rushed to them, for it will surely come"),
      difficulty: 2,
      questions: [
        { q: "Like whose share is theirs, in 51:59?", a: "Their likes of old", wrong: ["The believers", "The angels", "The prophets"], why: "There is a portion of torment like to the evil portion of torment which came for their likes of old." },
        { q: "What should they not ask, in 51:59?", a: "To hasten it on", wrong: ["For rain", "For food", "For guidance"], why: "So let them not ask Me to hasten on." },
        { tf: true, q: "Ibn Kathir says what was promised will surely come.", why: "Let them not ask that the punishment is rushed to them, for it will surely come." }
      ]
    },
    {
      slug: "the-promised-day",
      title: "The promised Day",
      line: "Woe to the deniers on their promised Day, the Resurrection.",
      facts: ["The last ayah of Adh-Dhariyat", "Be ready for that Day"],
      quote: q51(60),
      source: ik(60, "Ibn Kathir says the Day they have been promised is the Day of Resurrection.", "meaning, the Day of Resurrection"),
      difficulty: 1,
      questions: [
        { q: "Which Day is promised, per Ibn Kathir on 51:60?", a: "The Day of Resurrection", wrong: ["A market day", "A feast day", "A day of rain"], why: "From their Day which they have been promised, meaning, the Day of Resurrection." },
        { q: "Who faces woe, in 51:60?", a: "Those who disbelieve", wrong: ["The believers", "The angels", "The poor"], why: "Then woe to those who disbelieve from their Day which they have been promised." },
        { tf: true, q: "51:60 is the last ayah of Adh-Dhariyat.", why: "This is the end of the Tafsir of Surat Adh-Dhariyat." }
      ]
    }
  ]
};

export const DHARIYAT_UNITS: readonly DeepUnit[] = [DHARIYAT_ONE, DHARIYAT_TWO, DHARIYAT_THREE];
