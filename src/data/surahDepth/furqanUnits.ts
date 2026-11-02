import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Al-Furqan ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Furqan 25:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_25_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Furqan 25:${ayah}`,
    url: `https://quran.com/25:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 25:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}


const q25 = (ayah: number) => quranQuote(25, ayah);

/** Ayahs 1 to 34: the Criterion sent down, idols that create nothing, Messengers who ate and walked in markets, choosing friends, deserting the Quran, and why it came in stages. */
const FURQAN_ONE: DeepUnit = {
  key: "furqan1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-25",
  name: "Al-Furqan, ayahs 1 to 34",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Furqan",
  lessons: [
    {
      slug: "the-criterion",
      title: "The Criterion",
      line: "The Quran is Al-Furqan: it tells truth apart from falsehood.",
      facts: ["Allah's blessing never ends", "It warns all nations"],
      quote: q25(1),
      source: ik(1, "Blessed is Allah who sent down the Criterion to His servant ﷺ, to warn all nations. The surah is named Al-Furqan because the Quran separates truth from falsehood, guidance from misguidance, right from wrong.", "it is the criterion that decides between truth and falsehood"),
      difficulty: 2,
      questions: [
        { q: "Why is the surah called Al-Furqan?", a: "It separates truth from falsehood", wrong: ["It is very long", "It was first revealed", "It is about animals"], why: "It is the criterion that decides between truth and falsehood, guidance and misguidance." },
        { q: "To whom is he a warner, in 25:1?", a: "All nations", wrong: ["Only Makkah", "Only Arabs", "Only kings"], why: "That he may be a warner to all nations." },
        { tf: true, q: "Calling him Allah's servant is a praise.", why: "This description is one of praise and commendation, because here Allah is connecting him to Himself." }
      ]
    },
    {
      slug: "sent-down-in-stages",
      title: "Revealed ayah after ayah",
      line: "Earlier Books came at once; the Quran came bit by bit.",
      facts: ["Nazzala means sent down often", "It shows great care for the Prophet ﷺ"],
      quote: q25(1),
      source: ik(1, "Each earlier Book was sent down at one time, but the Quran came gradually, ayah after ayah and surah after surah. Ibn Kathir says this shows greater care for the one receiving it.", "was revealed gradually, in stages, Ayat after Ayat"),
      difficulty: 2,
      questions: [
        { q: "How were earlier Books sent down?", a: "At one time", wrong: ["Over 23 years", "Never", "One letter a year"], why: "Each of the previous Books was sent down at one time." },
        { q: "How was the Quran revealed?", a: "Gradually, ayah after ayah", wrong: ["All in one night", "As one big scroll", "Only in dreams"], why: "The Qur'an was revealed gradually, in stages, Ayat after Ayat, rulings after rulings." },
        { q: "What does it show, per Ibn Kathir?", a: "Greater care for the Prophet ﷺ", wrong: ["Allah was busy", "It was less important", "Nothing at all"], why: "This is more eloquent and indicative of greater care for the one to whom it is revealed." }
      ]
    },
    {
      slug: "measured-everything",
      title: "Everything measured exactly",
      line: "Allah made everything and gave each thing its exact measure.",
      facts: ["He has no son and no partner", "All is under His control"],
      quote: q25(2),
      source: ik(2, "To Allah belongs the dominion of the heavens and earth; He has no son and no partner. He created everything and measured it exactly. Everything besides Him is created and under His control.", "everything apart from Him is created and subject to Him"),
      difficulty: 2,
      questions: [
        { q: "How did Allah create everything, in 25:2?", a: "Measured exactly", wrong: ["By accident", "Half finished", "Without a plan"], why: "He has created everything, and has measured it exactly according to its due measurements." },
        { q: "What is everything besides Allah, per Ibn Kathir?", a: "Created and under Him", wrong: ["Equal to Him", "Partly divine", "Without a maker"], why: "Everything apart from Him is created and subject to Him." },
        { tf: false, q: "Allah shares His dominion with a partner.", why: "For Whom there is no partner in the dominion." }
      ]
    },
    {
      slug: "gods-that-create-nothing",
      title: "Gods that create nothing",
      line: "Idols cannot create even a gnat's wing; they are made things.",
      facts: ["They cannot help or harm themselves", "Only Allah gives life and death"],
      quote: q25(3),
      source: ik(3, "Idol worshippers took gods besides Allah that could not even create the wing of a gnat. They were themselves created, could not help or harm themselves, and had no power over life or death.", "idols who could not even create the wing of a gnat"),
      difficulty: 3,
      questions: [
        { q: "What could the idols not create, per Ibn Kathir?", a: "Even a gnat's wing", wrong: ["Only the sun", "Only mountains", "Only rivers"], why: "Idols who could not even create the wing of a gnat, but were themselves created." },
        { q: "What power do idols lack, in 25:3?", a: "Over death, life and raising the dead", wrong: ["Only over rain", "Only over trade", "None, they have all power"], why: "And possess no power of causing death, nor of giving life, nor of raising the dead." },
        { tf: true, q: "The idols were themselves created.", why: "Who created nothing but are themselves created." }
      ]
    },
    {
      slug: "knower-of-the-secret",
      title: "The Knower of secrets",
      line: "The Quran came from Allah, who knows every secret.",
      facts: ["They called it old tales, but it was true", "Allah still invites them to repent"],
      quote: q25(6),
      source: ik(6, "The disbelievers called the Quran a lie and old tales. Allah says it was sent by the One who knows the secrets of the heavens and earth. He is Forgiving and Merciful, inviting them to repent.", "This is an invitation to them to repent and turn back to Allah"),
      difficulty: 3,
      questions: [
        { q: "What did the disbelievers call the Quran, in 25:5?", a: "Tales of the ancients", wrong: ["A true message", "A song", "A law book"], why: "And they say: Tales of the ancients which he has written down." },
        { q: "Who sent the Quran down, in 25:6?", a: "He who knows the secrets", wrong: ["Old poets", "Scribes", "Travellers"], why: "Say: It has been sent down by Him Who knows the secret of the heavens and the earth." },
        { q: "Why mention Forgiving and Merciful, per Ibn Kathir?", a: "To invite them to repent", wrong: ["To scare them away", "To end the talk", "No reason"], why: "This is an invitation to them to repent and turn back to Allah." }
      ]
    },
    {
      slug: "messengers-ate-and-walked",
      title: "Messengers ate and walked in markets",
      line: "Every Messenger ate food and walked in markets like us.",
      facts: ["Being human does not lower a Messenger", "Allah gave them miracles and proofs"],
      quote: q25(20),
      source: ik(20, "The disbelievers asked why the Messenger ﷺ eats and walks in markets. Allah says every Messenger before ate food and went to markets to earn a living. That did not lower them; Allah gave them noble manners and miracles.", "they all used to eat food needing the nourishment in it"),
      difficulty: 3,
      questions: [
        { q: "What did they ask about the Messenger ﷺ, in 25:7?", a: "Why he eats and walks in markets", wrong: ["Why he sleeps at night", "Why he prays", "Why he smiles"], why: "Why does this Messenger eat food, and walk about in the markets." },
        { q: "What did earlier Messengers do, in 25:20?", a: "Ate food and walked in markets", wrong: ["Never ate", "Never left home", "Lived in the sky"], why: "They ate food and walked in the markets." },
        { tf: true, q: "Earlier Messengers went to markets to earn a living.", why: "They used to go around in the marketplaces seeking to engage in trade and earn a livelihood." }
      ]
    },
    {
      slug: "some-a-trial-for-others",
      title: "A test for each other",
      line: "Allah tests some people through others: will you be patient?",
      facts: ["Allah sees who obeys", "Patience is the answer"],
      quote: q25(20),
      source: ik(20, "Allah made some people a trial for others, to show who will obey and who will not. Will you have patience? Your Lord is All-Seeing and knows who deserves what.", "We test some of you by means of others"),
      difficulty: 3,
      questions: [
        { q: "What did Allah make some people, in 25:20?", a: "A trial for others", wrong: ["Angels", "Kings over all", "Free of tests"], why: "And We have made some of you as a trial for others." },
        { q: "What does Allah ask, in 25:20?", a: "Will you have patience?", wrong: ["Will you be rich?", "Will you be famous?", "Will you win?"], why: "Will you have patience? And your Lord is Ever All-Seer." },
        { q: "Why does Allah test people through others, per Ibn Kathir?", a: "To see who obeys", wrong: ["To make them rich", "For fun", "To make them sleep"], why: "So that We may see who will be obedient and who will be disobedient." }
      ]
    },
    {
      slug: "paradise-of-eternity",
      title: "The Paradise of eternity",
      line: "In Paradise the pious get all they wish, forever.",
      facts: ["No eye has seen its delights", "It is a promise from your Lord"],
      quote: q25(16),
      source: ik(16, "Allah promised the pious the eternal Paradise as reward. They will have all they desire, things no eye has seen and no ear has heard. It will never end and they will never leave it.", "no eye has seen, no ear has heard"),
      difficulty: 3,
      questions: [
        { q: "Who is promised the Paradise of eternity, in 25:15?", a: "Those who have Taqwa", wrong: ["Those who are rich", "Those who are strong", "Everyone automatically"], why: "Or the Paradise of Eternity which is promised to those who have Taqwa." },
        { q: "What will they have there, in 25:16?", a: "All that they desire", wrong: ["Only water", "Half their wishes", "Nothing new"], why: "For them there will be therein all that they desire." },
        { tf: false, q: "The delights of Paradise will one day come to an end.", why: "They will abide therein forever; it will never cease or come to an end." }
      ]
    },
    {
      slug: "best-abode",
      title: "The best home",
      line: "On that Day, the people of Paradise have the best home.",
      facts: ["They rise to high levels", "A place of safety and beauty"],
      quote: q25(24),
      source: ik(24, "On the Day of Resurrection the people of Paradise will have the best home and the fairest place of rest. They rise to high levels and safe dwellings, in a place of safety, beauty and goodness.", "so they will be in a place of safety, beauty and goodness"),
      difficulty: 4,
      questions: [
        { q: "What do the people of Paradise have, in 25:24?", a: "The best abode", wrong: ["A small tent", "A long road", "A hard bed"], why: "The dwellers of Paradise will, on that Day, have the best abode." },
        { q: "What kind of place is it, per Ibn Kathir?", a: "Safety, beauty and goodness", wrong: ["Noise and dust", "Fear and worry", "Cold and dark"], why: "So they will be in a place of safety, beauty and goodness." },
        { tf: true, q: "The people of Paradise rise to lofty levels.", why: "Because the people of Paradise will ascend to lofty degrees and secure dwellings." }
      ]
    },
    {
      slug: "would-that-i-had-not",
      title: "Choose your friends well",
      line: "A wrongdoer will wish he had not followed a bad friend.",
      facts: ["He bites his hands in regret", "The bad friend led him away"],
      quote: q25(28),
      source: ik(28, "On that Day the wrongdoer will wish he had taken the Messenger's ﷺ path, and say: if only I had not taken so-and-so as a close friend. That friend led him away from the Quran.", "the one among the propagators of misguidance who diverted him from true guidance"),
      difficulty: 4,
      questions: [
        { q: "What will the wrongdoer wish, in 25:27?", a: "He had followed the Messenger's ﷺ path", wrong: ["He had more money", "He had travelled more", "He had slept more"], why: "Would that I had taken a path with the Messenger ﷺ." },
        { q: "Whom will he wish he never befriended, in 25:28?", a: "So-and-so who misled him", wrong: ["His parents", "His teacher", "The Prophet ﷺ"], why: "Would that I had never taken so-and-so as an intimate friend!" },
        { q: "What did the bad friend lead him away from, in 25:29?", a: "The Reminder, the Quran", wrong: ["His shop", "His house", "His food"], why: "He indeed led me astray from the Reminder after it had come to me." }
      ]
    },
    {
      slug: "musk-seller-and-blacksmith",
      title: "The musk seller and the blacksmith",
      line: "A good friend is like musk; a bad one is like bellows.",
      facts: ["Musk: you get a nice smell", "Bellows: your clothes may burn"],
      quote: q25(28),
      source: hadith("bukhari", "5534", "Abu Musa al-Ash'ari", "Sahih", "The Prophet ﷺ said a good friend is like one carrying musk: he gives you some, you buy some, or you enjoy its smell. A bad friend is like one blowing bellows: he burns your clothes or you get a bad smell.", "The example of a good pious companion and an evil one is that of a person carrying musk and another blowing a pair of bellows"),
      difficulty: 4,
      questions: [
        { q: "What is a good friend like, in the hadith?", a: "One carrying musk", wrong: ["One carrying stones", "One carrying fire", "One carrying mud"], why: "That of a person carrying musk and another blowing a pair of bellows." },
        { q: "What might a bad friend do, like the bellows?", a: "Burn your clothes", wrong: ["Give you perfume", "Give you gold", "Teach you Quran"], why: "The one who is blowing a pair of bellows will either burn your clothes or you will get a bad smell from him." },
        { tf: true, q: "Even if he gives you nothing, a good friend leaves a good smell.", why: "Or you will get a good smell from him." }
      ]
    },
    {
      slug: "deserting-the-quran",
      title: "Do not desert the Quran",
      line: "Not reading, understanding or living the Quran is deserting it.",
      facts: ["The Messenger ﷺ will complain", "Ponder and act on it"],
      quote: q25(30),
      source: ik(30, "The Messenger ﷺ will say: my Lord, my people deserted this Quran. Ibn Kathir says not listening, not believing, not pondering its meanings and not acting on it are all ways of deserting it.", "not pondering its meanings and trying to understand it is the same as forsaking it"),
      difficulty: 4,
      questions: [
        { q: "What will the Messenger ﷺ say, in 25:30?", a: "My people deserted this Quran", wrong: ["My people built towers", "My people grew rich", "My people travelled far"], why: "O my Lord! Verily, my people deserted this Qur'an." },
        { q: "What is a way of deserting it, per Ibn Kathir?", a: "Not pondering its meanings", wrong: ["Reading it daily", "Acting on it", "Teaching it"], why: "Not pondering its meanings and trying to understand it is the same as forsaking it." },
        { q: "What did the idol worshippers do when it was recited?", a: "Made noise to not hear it", wrong: ["Listened quietly", "Wrote it down", "Cried with joy"], why: "When he would recite Qur'an to them, they would talk nonsense or speak about something else." }
      ]
    },
    {
      slug: "allah-is-enough-guide",
      title: "Allah is enough as Guide",
      line: "Every Prophet had foes, but Allah is enough as Helper.",
      facts: ["Enemies called people astray", "Followers of the Book get Allah's help"],
      quote: q25(31),
      source: ik(31, "Like the Prophet ﷺ, every Prophet had enemies among the wrongdoers who called people to misguidance. But your Lord is enough as Guide and Helper for whoever follows His Messenger and believes in His Book.", "Allah will be his Guide and Helper in this world and the Hereafter"),
      difficulty: 5,
      questions: [
        { q: "What did every Prophet have, in 25:31?", a: "An enemy among the criminals", wrong: ["A palace", "A big army", "No trouble at all"], why: "Thus have We made for every Prophet an enemy among the criminals." },
        { q: "Who is sufficient, in 25:31?", a: "Your Lord, as Guide and Helper", wrong: ["Strong friends", "Lots of money", "Tall walls"], why: "But sufficient is your Lord as a Guide and Helper." },
        { q: "For whom is Allah Guide and Helper, per Ibn Kathir?", a: "Whoever follows His Messenger ﷺ", wrong: ["Whoever is richest", "Whoever is loudest", "Only kings"], why: "For the one who follows His Messenger and believes in His Book, Allah will be his Guide and Helper." }
      ]
    },
    {
      slug: "to-strengthen-your-heart",
      title: "To strengthen your heart",
      line: "The Quran came in stages over years to strengthen hearts.",
      facts: ["They asked why not all at once", "It came as events needed it"],
      quote: q25(32),
      source: ik(32, "Disbelievers asked why the Quran was not sent all at once like earlier Books. Allah says it came in stages over twenty-three years, with events and rulings as needed, to strengthen the believers' hearts.", "it was revealed in stages over twenty-three years"),
      difficulty: 5,
      questions: [
        { q: "What did disbelievers ask, in 25:32?", a: "Why not revealed all at once?", wrong: ["Why in Arabic?", "Why at night?", "Why so short?"], why: "Why is not the Qur'an revealed to him all at once?" },
        { q: "Why was it revealed in stages, in 25:32?", a: "To strengthen the heart", wrong: ["To save paper", "To make it harder", "For no reason"], why: "Thus, that We may strengthen your heart thereby." },
        { q: "Over how long was it revealed, per Ibn Kathir?", a: "Twenty-three years", wrong: ["One night", "Three days", "One hundred years"], why: "It was revealed in stages over twenty-three years, according to events and circumstances." }
      ]
    },
    {
      slug: "the-better-explanation",
      title: "The better explanation",
      line: "For every argument, Allah sends the truth, explained better.",
      facts: ["Their doubts got clear answers", "Truth is said more clearly"],
      quote: q25(33),
      source: ik(33, "Whatever argument or doubt the disbelievers brought, Allah answered with the truth of that same matter, more clearly and more eloquently than anything they said.", "more clearly and more eloquently than anything they say"),
      difficulty: 5,
      questions: [
        { q: "What does Allah reveal for every example they bring, in 25:33?", a: "The truth and better explanation", wrong: ["Silence", "A harder question", "A joke"], why: "But We reveal to you the truth, and the better explanation thereof." },
        { q: "How is the answer given, per Ibn Kathir?", a: "More clearly and eloquently", wrong: ["More loudly", "More quickly", "More secretly"], why: "We respond to them with the truth of that same matter, more clearly and more eloquently than anything they say." },
        { tf: true, q: "Ibn Abbas said the Quran was first sent down on Laylatul-Qadr.", why: "The Qur'an was sent down all at once to the first heaven on Laylatul-Qadr." }
      ]
    }
  ]
};

export const FURQAN_UNITS: readonly DeepUnit[] = [FURQAN_ONE];
