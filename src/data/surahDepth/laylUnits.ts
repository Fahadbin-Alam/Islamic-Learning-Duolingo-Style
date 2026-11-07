import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Al-Layl ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Layl 92:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_92_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Layl 92:${ayah}`,
    url: `https://quran.com/92:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 92:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q92 = (ayah: number) => quranQuote(92, ayah);



/** Ayahs 1 to 4: oaths by night, day, and the One who made male and female; our efforts differ. */
const LAYL_ONE: DeepUnit = {
  key: "layl1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-92",
  name: "Al-Layl, ayahs 1-4",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Layl",
  lessons: [
    {
      slug: "by-the-night",
      title: "By the night",
      line: "Allah swears by the night when it covers all with darkness.",
      facts: ["Al-Layl: the night", "Yaghsha: covers"],
      quote: q92(1),
      source: ik(1, "Ibn Kathir says the night envelops: it covers the creation with its darkness.", "when it covers the creation with its darkness"),
      difficulty: 1,
      questions: [
        { q: "By what does Allah swear in 92:1?", a: "The night as it envelops", wrong: ["The sea as it roars", "The sun as it rises", "The wind as it blows"], why: "By the night as it envelops." },
        { q: "What does the night cover, per Ibn Kathir?", a: "The creation, with darkness", wrong: ["Only the sea", "Only the moon", "Nothing"], why: "When it covers the creation with its darkness." },
        { tf: true, q: "Al-Layl is among the short surahs for Isha.", why: "By the night as it envelops, 92." }
      ]
    },
    {
      slug: "by-the-day",
      title: "By the day",
      line: "Allah swears by the day when it appears with bright light.",
      facts: ["An-Nahar: the day", "Tajalla: shines out"],
      quote: q92(2),
      source: ik(2, "Ibn Kathir says the day appears with its light and its radiance.", "with its light and its radiance"),
      difficulty: 1,
      questions: [
        { q: "By what does Allah swear in 92:2?", a: "The day as it appears", wrong: ["The night as it ends", "The star as it falls", "The rain as it pours"], why: "By the day as it appears." },
        { q: "How does the day appear, per Ibn Kathir?", a: "With light and radiance", wrong: ["With clouds", "With cold", "With silence"], why: "Meaning, with its light and its radiance." },
        { tf: false, q: "Night and day are the same, so Allah swears by one thing.", why: "These things that are being sworn by are opposites." }
      ]
    },
    {
      slug: "male-and-female",
      title: "Male and female",
      line: "Allah swears by Himself, who made male and female in pairs.",
      facts: ["Dhakar: male", "Untha: female"],
      quote: q92(3),
      source: ik(3, "Ibn Kathir links 92:3 to 78:8, We created you in pairs, and 51:49, of everything We created pairs.", "And of everything We have created pairs"),
      difficulty: 2,
      questions: [
        { q: "By Whom does Allah swear in 92:3?", a: "Him Who created male and female", wrong: ["The first king", "The angels", "The prophets"], why: "By Him Who created male and female." },
        { q: "Which ayah says Allah created you in pairs?", a: "78:8", wrong: ["2:2", "36:1", "112:4"], why: "And We have created you in pairs." },
        { tf: true, q: "51:49 says Allah made pairs of everything.", why: "And of everything We have created pairs." }
      ]
    },
    {
      slug: "your-efforts-differ",
      title: "Your efforts differ",
      line: "People work in different ways: some do good and some do evil.",
      facts: ["Shatta: different, scattered", "Opposites, like night and day"],
      quote: q92(4),
      source: ik(4, "Just as the oaths are opposites, deeds are opposites: there are those who do good and those who do evil.", "there are those who do good and there are those who do evil"),
      difficulty: 2,
      questions: [
        { q: "What does 92:4 say about our efforts?", a: "They are diverse", wrong: ["They are all equal", "They do not matter", "They are hidden"], why: "Certainly, your efforts and deeds are diverse." },
        { q: "How do the oaths fit the answer, per Ibn Kathir?", a: "Both are opposites", wrong: ["Both are colours", "Both are sounds", "Both are numbers"], why: "Just as these things that are being sworn by are opposites, likewise that which this swearing is about." },
        { tf: true, q: "Some people do good and some do evil.", why: "There are those who do good and there are those who do evil." }
      ]
    },
    {
      slug: "what-is-it-for",
      title: "What is it for?",
      line: "Deeds done for Allah last; deeds for passing goals fade.",
      facts: ["As-Sa'di explains", "The goal decides"],
      quote: q92(4),
      source: saadi(92, 4, "As-Sa'di says efforts differ by their goal: work for the lasting Face of Allah lasts and helps its doer, while work for a passing goal fades with it.", "هل هو وجه الله الأعلى الباقي"),
      difficulty: 2,
      questions: [
        { q: "Which deeds last, per as-Sa'di?", a: "Deeds done for Allah", wrong: ["Deeds for fame", "Deeds for money", "Deeds for praise"], why: "Work for the lasting Face of Allah lasts with it." },
        { q: "What happens to work for a passing goal?", a: "It fades with it", wrong: ["It grows", "It lasts forever", "It becomes gold"], why: "The effort is lost when its goal is lost." },
        { tf: true, q: "Why we do a deed matters as much as the deed.", why: "As-Sa'di on 92:4." }
      ]
    }
  ]
};

/** Ayahs 5 to 11: giving and Taqwa make the way easy; greed and denial lead the other way. */
const LAYL_TWO: DeepUnit = {
  key: "layl2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-92",
  name: "Al-Layl, ayahs 5-11",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Layl",
  lessons: [
    {
      slug: "gives-and-fears-allah",
      title: "Gives and fears Allah",
      line: "The first person gives what Allah commanded and fears Allah.",
      facts: ["A'ta: gave", "Ittaqa: had Taqwa"],
      quote: q92(5),
      source: ik(5, "Ibn Kathir says he gives what he has been commanded to give and he fears Allah in his affairs.", "he gives what he has been commanded to give and he fears Allah in his affairs"),
      difficulty: 2,
      questions: [
        { q: "What two things does he do, per 92:5?", a: "Gives and has Taqwa", wrong: ["Sleeps and eats", "Boasts and hoards", "Runs and hides"], why: "As for him who gives and has Taqwa." },
        { q: "What does he give, per Ibn Kathir?", a: "What he was commanded to give", wrong: ["Only leftovers", "Nothing", "Only to the rich"], why: "He gives what he has been commanded to give." },
        { tf: true, q: "He fears Allah in all his affairs.", why: "He fears Allah in his affairs." }
      ]
    },
    {
      slug: "believes-in-the-best",
      title: "Believes in the best",
      line: "He believes Allah will reward him for what he gives.",
      facts: ["Al-Husna: the best reward", "Giving is never lost"],
      quote: q92(6),
      source: ik(6, "Qatadah said Al-Husna is the compensation for giving; Khusayf said the reward.", "In the reward"),
      difficulty: 2,
      questions: [
        { q: "What does he believe in, per 92:6?", a: "Al-Husna", wrong: ["Luck", "Magic", "Stars"], why: "And believes in Al-Husna." },
        { q: "What is Al-Husna, per Khusayf?", a: "The reward", wrong: ["A city", "A tree", "A song"], why: "Khusayf said, In the reward." },
        { tf: false, q: "Qatadah said Al-Husna means a new house.", why: "Meaning, in the compensation for that. This was said by Qatadah." }
      ]
    },
    {
      slug: "the-path-of-ease",
      title: "The path of ease",
      line: "Allah makes the way to goodness easy for the generous believer.",
      facts: ["Yusra: ease", "Good leads to more good"],
      quote: q92(7),
      source: ik(7, "Ibn Abbas said the path of ease means the way to goodness.", "Meaning for goodness"),
      difficulty: 2,
      questions: [
        { q: "What will Allah make smooth for him, per 92:7?", a: "The path of ease", wrong: ["The path of hardship", "A road of gold", "A sea path"], why: "We will make smooth for him the path of ease." },
        { q: "What did Ibn Abbas say the ease is for?", a: "Goodness", wrong: ["Wealth only", "Fame", "Rest"], why: "Ibn Abbas said, Meaning for goodness." },
        { tf: true, q: "Doing good opens the door to more good.", why: "Allah rewards those who intend good with success." }
      ]
    },
    {
      slug: "keep-doing-good",
      title: "Keep doing good",
      line: "Muhammad ﷺ said: keep doing good deeds, each is made easy.",
      facts: ["Work, do not just wait", "He recited 92:5-10"],
      quote: q92(7),
      source: hadith("bukhari", "4949", "Ali ibn Abi Talib", "Sahih", "At a funeral the Prophet ﷺ said everyone's place is written. They asked if they should stop working. He said: keep doing good deeds, for each finds easy the deeds he was made for. Then he recited 92:5-10.", "everybody will find easy to do such deeds as will lead him to his destined place"),
      difficulty: 3,
      questions: [
        { q: "What did the Companions ask?", a: "Should we stop doing deeds?", wrong: ["Where is the market?", "When is Eid?", "Who is the king?"], why: "Shall we not depend upon what has been written for us and give up deeds?" },
        { q: "What did he tell them?", a: "Carry on doing good deeds", wrong: ["Stop and wait", "Only pray at night", "Leave the town"], why: "Carry on doing good deeds, for everybody will find easy to do such deeds." },
        { tf: true, q: "He then recited ayahs of Al-Layl.", why: "Then he recited: As for him who gives and fears Allah, and believes in the best." }
      ]
    },
    {
      slug: "abu-bakr-freed-the-weak",
      title: "Abu Bakr freed the weak",
      line: "Abu Bakr freed weak Muslims, seeking only Allah's reward.",
      facts: ["He freed the old and women", "Sincere giving"],
      quote: q92(5),
      source: ik(5, "Abu Bakr freed weak new Muslims in Makkah. When his father said to free strong men instead, he said he only wanted what is with Allah.", "Abu Bakr used to free servants upon their acceptance of Islam in Makkah"),
      difficulty: 2,
      questions: [
        { q: "Whom did Abu Bakr free in Makkah?", a: "Weak people who accepted Islam", wrong: ["Only strong guards", "Only traders", "Only his cousins"], why: "He used to free the elderly and the women when they accepted Islam." },
        { q: "What did he say he wanted?", a: "What is with Allah", wrong: ["Strong helpers", "Fame", "More money"], why: "O my father! I only want what is with Allah." },
        { tf: false, q: "Abu Bakr freed people to gain bodyguards.", why: "I only want what is with Allah." }
      ]
    },
    {
      slug: "greedy-and-self-sufficient",
      title: "Greedy and self-sufficient",
      line: "The second person is stingy and thinks he does not need Allah.",
      facts: ["Bakhil: stingy", "Istaghna: felt no need"],
      quote: q92(8),
      source: ik(8, "Ibn Abbas said he is stingy with his wealth and thinks he has no need of his Lord.", "he is stingy with his wealth and considers himself to be in no need of his Lord"),
      difficulty: 2,
      questions: [
        { q: "How is the second person described in 92:8?", a: "Greedy and self-sufficient", wrong: ["Kind and humble", "Brave and fair", "Quiet and shy"], why: "But he who is greedy and thinks himself self-sufficient." },
        { q: "Whom does he think he does not need?", a: "His Lord", wrong: ["His food", "His house", "His sleep"], why: "Considers himself to be in no need of his Lord." },
        { tf: true, q: "Stinginess and pride often go together.", why: "He is stingy with his wealth and considers himself to be in no need of his Lord." }
      ]
    },
    {
      slug: "denies-the-best",
      title: "Denies the best",
      line: "He denies that there is any reward in the Hereafter.",
      facts: ["Kadhdhaba: denied", "No hope of reward"],
      quote: q92(9),
      source: ik(9, "Ibn Kathir says he denies the recompense in the abode of the Hereafter.", "the recompense in the abode of the Hereafter"),
      difficulty: 2,
      questions: [
        { q: "What does he deny, per 92:9?", a: "Al-Husna", wrong: ["The weather", "His name", "The market"], why: "And denies Al-Husna." },
        { q: "What is Al-Husna that he denies?", a: "Recompense in the Hereafter", wrong: ["A new car", "His family", "A garden here"], why: "Meaning, the recompense in the abode of the Hereafter." },
        { tf: false, q: "He gives freely because he hopes for reward.", why: "He is greedy and denies Al-Husna." }
      ]
    },
    {
      slug: "the-path-to-hardship",
      title: "The path to hardship",
      line: "Whoever chooses evil is left to the hard path he chose.",
      facts: ["Usra: hardship", "Our choices matter"],
      quote: q92(10),
      source: ik(10, "Ibn Kathir says Allah rewards those who intend good with success, and whoever intends evil is left to it.", "Allah rewards those who intend good with success, while whoever intends evil is abandoned"),
      difficulty: 3,
      questions: [
        { q: "What will be made smooth for him, per 92:10?", a: "The path to evil", wrong: ["The path of ease", "A golden road", "A garden path"], why: "We will make smooth for him the path to evil." },
        { q: "What happens to one who intends good?", a: "Allah gives him success", wrong: ["He is left alone", "He is punished", "Nothing"], why: "Allah rewards those who intend good with success." },
        { tf: true, q: "Ibn Kathir links this to 6:110.", why: "And We shall leave them in their trespass to wander blindly." }
      ]
    },
    {
      slug: "wealth-will-not-help",
      title: "Wealth will not help",
      line: "When he dies, all his saved money will not help him.",
      facts: ["Taradda: went down", "Spend it well while alive"],
      quote: q92(11),
      source: ik(11, "Mujahid said it means when he dies; Zayd bin Aslam said when he goes down into the Fire.", "This means when he dies"),
      difficulty: 2,
      questions: [
        { q: "What does 92:11 ask?", a: "What will his wealth avail him?", wrong: ["Where is his house?", "Who is his friend?", "What is his name?"], why: "And what will his wealth avail him when he goes down?" },
        { q: "What did Mujahid say goes down means?", a: "When he dies", wrong: ["When he sleeps", "When he sits", "When he travels"], why: "Mujahid said, This means when he dies." },
        { tf: false, q: "Hoarded wealth can save a person after death.", why: "And what will his wealth avail him when he goes down?" }
      ]
    }
  ]
};

/** Ayahs 12 to 16: guidance is from Allah, the warning of the Fire, and who refuses. */
const LAYL_THREE: DeepUnit = {
  key: "layl3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-92",
  name: "Al-Layl, ayahs 12-16",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Layl",
  lessons: [
    {
      slug: "guidance-is-from-allah",
      title: "Guidance is from Allah",
      line: "Allah has taken on Himself to show us the right way.",
      facts: ["Al-Huda: guidance", "Halal and haram made clear"],
      quote: q92(12),
      source: ik(12, "Qatadah said Allah will explain what is lawful and what is forbidden, like 16:9.", "We will explain what is lawful and what is prohibited"),
      difficulty: 2,
      questions: [
        { q: "What is upon Allah, per 92:12?", a: "To give guidance", wrong: ["To give everyone gold", "To end hardship", "To stop the night"], why: "Truly, on Us is to give guidance." },
        { q: "What did Qatadah say Allah will explain?", a: "What is lawful and forbidden", wrong: ["Stock prices", "Star names", "Old poems"], why: "We will explain what is lawful and what is prohibited." },
        { tf: true, q: "Ibn Kathir links this to 16:9.", why: "And upon Allah is the responsibility to explain the Straight path." }
      ]
    },
    {
      slug: "the-last-and-the-first",
      title: "The last and the first",
      line: "This world and the Hereafter both belong to Allah alone.",
      facts: ["Al-Akhirah: the Hereafter", "Al-Ula: this world"],
      quote: q92(13),
      source: ik(13, "Ibn Kathir says both worlds belong to Allah and He is in full control of them.", "they both belong to Us"),
      difficulty: 2,
      questions: [
        { q: "What belongs to Allah, per 92:13?", a: "The last and the first", wrong: ["Only this world", "Only the stars", "Only the sea"], why: "And truly, unto Us belong the last and the first." },
        { q: "What is the last?", a: "The Hereafter", wrong: ["Last night", "The last king", "The final exam"], why: "The last, the Hereafter, and the first, this world." },
        { tf: false, q: "Someone else controls this world besides Allah.", why: "They both belong to Us and I am in complete control of them." }
      ]
    },
    {
      slug: "a-warning-of-the-fire",
      title: "A warning of the Fire",
      line: "Allah warns us out of mercy, to keep us from the Fire.",
      facts: ["Talazza: blazing", "A warning is a mercy"],
      quote: q92(14),
      source: ik(14, "Mujahid said Talazza means blazing. Allah warns so that people can be saved.", "Blazing"),
      difficulty: 2,
      questions: [
        { q: "What does Allah warn of in 92:14?", a: "A blazing Fire", wrong: ["A cold wind", "A long road", "A dark sea"], why: "Therefore I have warned you of a Fire Talazza." },
        { q: "What does Talazza mean, per Mujahid?", a: "Blazing", wrong: ["Frozen", "Quiet", "Small"], why: "Mujahid said, Blazing." },
        { tf: true, q: "A warning gives us time to choose the right path.", why: "Therefore I have warned you." }
      ]
    },
    {
      slug: "the-most-wretched",
      title: "The most wretched",
      line: "Only the most wretched person will enter it for good.",
      facts: ["Al-Ashqa: the most wretched", "Belief saves"],
      quote: q92(15),
      source: ik(15, "Ibn Kathir says none will enter it, surrounded on all sides, except the most wretched.", "except the most wretched"),
      difficulty: 2,
      questions: [
        { q: "Who enters it, per 92:15?", a: "The most wretched", wrong: ["The poorest", "The youngest", "Everyone"], why: "None shall enter it save the most wretched." },
        { q: "How will it surround him, per Ibn Kathir?", a: "On all sides", wrong: ["Only in front", "Not at all", "Only above"], why: "None will enter surrounded by it on all sides except the most wretched." },
        { tf: false, q: "Allah explains who the most wretched is nowhere.", why: "Then Allah explains who this, the most wretched, is." }
      ]
    },
    {
      slug: "denies-and-turns-away",
      title: "Denies and turns away",
      line: "He denies in his heart and turns away from good deeds.",
      facts: ["Kadhdhaba: denied", "Tawalla: turned away"],
      quote: q92(16),
      source: ik(16, "Ibn Kathir says he denies in his heart, and turns away from doing deeds with his limbs.", "from acting with his limbs"),
      difficulty: 2,
      questions: [
        { q: "What two things does he do, per 92:16?", a: "Denies and turns away", wrong: ["Prays and fasts", "Gives and smiles", "Learns and teaches"], why: "Who denies and turns away." },
        { q: "Where does he deny, per Ibn Kathir?", a: "In his heart", wrong: ["Only in the market", "In a letter", "In a dream"], why: "Who denies, meaning, in his heart." },
        { q: "What does he turn away from?", a: "Doing deeds with his limbs", wrong: ["Eating", "Sleeping", "Travelling"], why: "And turns away, meaning, from acting with his limbs." }
      ]
    },
    {
      slug: "all-enter-but-who-refuses",
      title: "All enter, but who refuses",
      line: "The whole Ummah enters Paradise, except those who refuse.",
      facts: ["Obeying him is the way in", "Refusing is disobeying"],
      quote: q92(16),
      source: hadith("bukhari", "7280", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said all my followers will enter Paradise except those who refuse; whoever obeys me enters Paradise, and whoever disobeys me has refused.", "All my followers will enter Paradise except those who refuse"),
      difficulty: 2,
      questions: [
        { q: "Who will not enter Paradise, per the hadith?", a: "Those who refuse", wrong: ["Those who are poor", "Those who are young", "Those who are sick"], why: "All my followers will enter Paradise except those who refuse." },
        { q: "Who is the one who refuses?", a: "Whoever disobeys him", wrong: ["Whoever is shy", "Whoever travels", "Whoever is quiet"], why: "Whoever disobeys me is the one who refuses." },
        { tf: true, q: "Obeying him is the way into Paradise.", why: "Whoever obeys me will enter Paradise." }
      ]
    }
  ]
};

/** Ayahs 17 to 21: the pious who give to purify themselves, for the Face of their Lord. */
const LAYL_FOUR: DeepUnit = {
  key: "layl4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-92",
  name: "Al-Layl, ayahs 17-21",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Layl",
  lessons: [
    {
      slug: "the-pious-kept-far",
      title: "The pious kept far",
      line: "The person with Taqwa will be kept far away from the Fire.",
      facts: ["Al-Atqa: the most pious", "Saved by Taqwa"],
      quote: q92(17),
      source: ik(17, "Ibn Kathir says the righteous, pure, most pious person will be saved from the Fire.", "the righteous, pure, most pious person will be saved from the Fire"),
      difficulty: 2,
      questions: [
        { q: "Who is kept far from it, per 92:17?", a: "Those with Taqwa", wrong: ["Those with money", "Those with fame", "Those with power"], why: "And those with Taqwa will be far removed from it." },
        { q: "What happens to the most pious, per Ibn Kathir?", a: "He is saved from the Fire", wrong: ["He is forgotten", "He is tested again", "Nothing changes"], why: "The righteous, pure, most pious person will be saved from the Fire." },
        { tf: true, q: "The next ayah explains who this person is.", why: "Then He explains who he is by His saying, He who gives of his wealth." }
      ]
    },
    {
      slug: "giving-to-purify",
      title: "Giving to purify",
      line: "He gives his money to obey Allah and to make himself pure.",
      facts: ["Yatazakka: purifies himself", "Charity cleans the heart"],
      quote: q92(18),
      source: ik(18, "Ibn Kathir says he spends in obedience to his Lord to purify himself and what Allah gave him.", "he spends his wealth in obedience of his Lord in order to purify himself"),
      difficulty: 2,
      questions: [
        { q: "Why does he give, per 92:18?", a: "For self-purification", wrong: ["To show off", "To get a reward from people", "To get rid of it"], why: "He who gives of his wealth for self-purification." },
        { q: "In what does he spend, per Ibn Kathir?", a: "In obedience of his Lord", wrong: ["In games", "In boasting", "In waste"], why: "He spends his wealth in obedience of his Lord in order to purify himself." },
        { tf: false, q: "Giving charity has no effect on the giver.", why: "In order to purify himself, his wealth and whatever Allah has bestowed upon him." }
      ]
    },
    {
      slug: "duties-come-first",
      title: "Duties come first",
      line: "Extra charity should never make you miss a duty, like a debt.",
      facts: ["As-Sa'di explains", "Debts and family first"],
      quote: q92(17),
      source: saadi(92, 17, "As-Sa'di says giving purifies only when it does not make you miss a duty, like paying a debt or spending on your family.", "إذا تضمن الإنفاق المستحب ترك واجب"),
      difficulty: 3,
      questions: [
        { q: "Extra charity should not make you miss...?", a: "A duty", wrong: ["A meal", "A trip", "A nap"], why: "Voluntary giving that leaves a duty is not right, says as-Sa'di." },
        { q: "Which is an example of such a duty?", a: "Paying a debt", wrong: ["Buying a toy", "A holiday", "A new phone"], why: "Like a debt or spending on family." },
        { tf: true, q: "Spending on your own family is a duty.", why: "As-Sa'di on 92:17." }
      ]
    },
    {
      slug: "no-favour-to-repay",
      title: "No favour to repay",
      line: "He gives with no favour to repay or to get back.",
      facts: ["Ni'mah tujza: a favour repaid", "Pure giving"],
      quote: q92(19),
      source: ik(19, "Ibn Kathir says his giving is not done so that someone owes him or returns good to him.", "giving his wealth is not done so that he may gain some favor from someone"),
      difficulty: 2,
      questions: [
        { q: "What is not in his mind, per 92:19?", a: "A favour to be paid back", wrong: ["Allah's pleasure", "Helping the poor", "Purifying himself"], why: "And who has in mind no favor from anyone to be paid back." },
        { q: "What kind of giving is praised?", a: "Giving with nothing wanted back", wrong: ["Giving to get more", "Giving for praise", "Giving as a trade"], why: "Giving his wealth is not done so that he may gain some favor from someone." },
        { tf: true, q: "Sincere giving does not wait for a reward from people.", why: "He gives not to get something in return." }
      ]
    },
    {
      slug: "for-the-face-of-allah",
      title: "For the Face of Allah",
      line: "He gives only seeking the Face of his Lord, the Most High.",
      facts: ["Wajh Rabbihi: his Lord's Face", "Hoping to see Allah"],
      quote: q92(20),
      source: ik(20, "Ibn Kathir says he gives hoping for the blessing of seeing Allah in the Gardens of Paradise.", "hoping to attain the blessing of seeing Him"),
      difficulty: 2,
      questions: [
        { q: "Why does he give, per 92:20?", a: "To seek the Face of his Lord", wrong: ["To win a contest", "To be thanked", "To be famous"], why: "Except to seek the Face of his Lord, the Most High." },
        { q: "What does he hope for, per Ibn Kathir?", a: "To see Allah in Paradise", wrong: ["A big house here", "A title", "A long holiday"], why: "Hoping to attain the blessing of seeing Him in the final abode." },
        { tf: false, q: "He gives so people will praise him.", why: "Except to seek the Face of his Lord, the Most High." }
      ]
    },
    {
      slug: "he-will-be-pleased",
      title: "He will be pleased",
      line: "Allah promises that such a giver will surely be pleased.",
      facts: ["Yarda: will be pleased", "A promise from Allah"],
      quote: q92(21),
      source: ik(21, "Ibn Kathir says those with these qualities will indeed be pleased.", "indeed those with these characteristics will be pleased"),
      difficulty: 1,
      questions: [
        { q: "What does 92:21 promise?", a: "He will surely be pleased", wrong: ["He will be tested", "He will be sad", "He will be forgotten"], why: "He, surely, will be pleased." },
        { q: "Who will be pleased, per Ibn Kathir?", a: "Those with these qualities", wrong: ["Only kings", "Everyone", "Only the rich"], why: "Indeed those with these characteristics will be pleased." },
        { tf: true, q: "Sincere giving leads to being pleased in the end.", why: "He, surely, will be pleased." }
      ]
    },
    {
      slug: "abu-bakr-the-giver",
      title: "Abu Bakr the giver",
      line: "Abu Bakr was first in the Ummah to have all these qualities.",
      facts: ["As-Siddiq: the truthful", "The ayahs are general too"],
      quote: q92(19),
      source: ik(21, "Many scholars said these ayahs came down about Abu Bakr; the wording is general, and he was the first of the Ummah to have all these qualities.", "was the first and foremost of this Ummah to have all of these characteristics"),
      difficulty: 3,
      questions: [
        { q: "About whom did many scholars say 92:17-21 came down?", a: "Abu Bakr As-Siddiq", wrong: ["Abu Lahab", "Fir'awn", "Qarun"], why: "Many of the scholars of Tafsir have mentioned that these Ayat were revealed about Abu Bakr As-Siddiq." },
        { q: "Is the wording only for him?", a: "No, it is general", wrong: ["Yes, only him", "Only for kings", "Only for Makkah"], why: "Indeed, the wording of these Ayat is general." },
        { tf: false, q: "Abu Bakr gave so that people would owe him.", why: "And did not consider any of the people as owning him some favor." }
      ]
    },
    {
      slug: "called-from-every-gate",
      title: "Called from every gate",
      line: "Muhammad ﷺ hoped Abu Bakr is called from every gate.",
      facts: ["Gates: prayer, fasting, charity", "Ar-Rayyan: the fasting gate"],
      quote: q92(21),
      source: hadith("bukhari", "3666", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said people of prayer, fasting and charity are called from those gates of Paradise. Abu Bakr asked if anyone is called from all of them. He said: yes, and I hope you are among them.", "I hope you will be among those"),
      difficulty: 2,
      questions: [
        { q: "Which gate is for those who fast?", a: "Ar-Rayyan", wrong: ["The gate of trade", "The gate of sleep", "The gate of kings"], why: "He who is amongst those who observe fast will be called from the gate of fasting, the gate of Raiyan." },
        { q: "What did Abu Bakr ask?", a: "Is anyone called from all gates?", wrong: ["How tall are the gates?", "Who built the gates?", "When do they open?"], why: "Will anyone be called from all those gates?" },
        { q: "What did Muhammad ﷺ reply?", a: "Yes, and I hope you are one", wrong: ["No one at all", "Only angels", "Only prophets"], why: "Yes, and I hope you will be among those, O Abu Bakr." }
      ]
    }
  ]
};

export const LAYL_UNITS: readonly DeepUnit[] = [LAYL_ONE, LAYL_TWO, LAYL_THREE, LAYL_FOUR];
