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

/** Ayahs 35 to 77: past nations, desires as a god, shade, night, wind and rain, the two seas, and the servants of the Most Gracious. */
const FURQAN_TWO: DeepUnit = {
  key: "furqan2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-25",
  name: "Al-Furqan, ayahs 35 to 77",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Furqan",
  lessons: [
    {
      slug: "harun-as-helper",
      title: "Harun, Musa's helper",
      line: "Allah gave Musa the Book and his brother Harun as a helper.",
      facts: ["Harun was a Prophet too", "Past nations who denied were ruined"],
      quote: q25(35),
      source: ik(35, "Allah gave Musa the Scripture and made his brother Harun his helper, another Prophet who supported him. Allah reminds Quraysh of nations who denied their Messengers: Fir'awn, Nuh's people, Ad and Thamud.", "as another Prophet who helped and supported him"),
      difficulty: 2,
      questions: [
        { q: "Who was Musa's helper, in 25:35?", a: "His brother Harun", wrong: ["Yusuf", "Shu'ayb", "Lut"], why: "And placed his brother Harun with him as a helper." },
        { q: "What was Harun, per Ibn Kathir?", a: "Another Prophet who helped him", wrong: ["A king", "A merchant", "A soldier"], why: "As another Prophet who helped and supported him." },
        { q: "Which people were drowned, in 25:37?", a: "Nuh's people", wrong: ["Ad", "Thamud", "Madyan"], why: "And Nuh's people, when they denied the Messengers, We drowned them." }
      ]
    },
    {
      slug: "desire-as-a-god",
      title: "Desire as a god",
      line: "Some make their own wishes their god and follow them blindly.",
      facts: ["Whatever they like becomes their way", "Some swapped idols for nicer stones"],
      quote: q25(43),
      source: ik(43, "Allah describes one who takes his own desire as his god: whatever he likes becomes his religion. Ibn Abbas said in Jahiliyyah a man would worship a white rock, then swap it for a nicer one.", "whatever he admires and sees as good in his own desires becomes his religion"),
      difficulty: 3,
      questions: [
        { q: "What did he take as his god, in 25:43?", a: "His own desire", wrong: ["The sun", "A king", "His parents"], why: "Have you seen him who has taken as his god his own vain desire." },
        { q: "What becomes his religion, per Ibn Kathir?", a: "Whatever he likes", wrong: ["The Quran", "The Sunnah", "His teacher's advice"], why: "Whatever he admires and sees as good in his own desires becomes his religion and his way." },
        { q: "What did Ibn Abbas say some did in Jahiliyyah?", a: "Swapped a rock for a nicer one", wrong: ["Built a masjid", "Fed the poor", "Read the Tawrah"], why: "A man would worship a white rock for a while, then if he saw another that looked better, he would worship that." }
      ]
    },
    {
      slug: "the-spreading-shadow",
      title: "The spreading shadow",
      line: "Allah spreads the shade at dawn and the sun guides it away.",
      facts: ["He could have made the shade stand still", "We know shade by the sun"],
      quote: q25(45),
      source: ik(45, "Many early scholars said the spread shadow is the time from dawn until sunrise. Allah could have made it still, but He made the sun its guide; the sun follows the shade until it disappears.", "This refers to the period from the beginning of the dawn until the sun rises"),
      difficulty: 2,
      questions: [
        { q: "What did Allah spread, in 25:45?", a: "The shadow", wrong: ["The sea", "The mountains", "The stars"], why: "Have you not seen how your Lord spread the shadow." },
        { q: "What time is it, per the scholars?", a: "From dawn until sunrise", wrong: ["Midnight", "Noon only", "Sunset only"], why: "This refers to the period from the beginning of the dawn until the sun rises." },
        { q: "What did Allah make the shadow's guide, in 25:45?", a: "The sun", wrong: ["The moon", "The wind", "The rain"], why: "But We have made the sun its guide." }
      ]
    },
    {
      slug: "night-and-sleep",
      title: "Night to cover, sleep to rest",
      line: "Night covers us, sleep rests us, and day wakes us to work.",
      facts: ["Sleep refreshes body and soul", "Day is for earning a living"],
      quote: q25(47),
      source: ik(47, "Allah made the night a covering and sleep a rest. Limbs get tired from moving all day, so at night they stop, and sleep refreshes body and soul. Then day comes and people get up to work.", "so sleep provides a rejuvenation for both the body and the soul"),
      difficulty: 2,
      questions: [
        { q: "What did Allah make the night, in 25:47?", a: "A covering", wrong: ["A race", "A market", "A storm"], why: "And it is He Who makes the night a covering for you." },
        { q: "What does sleep do, per Ibn Kathir?", a: "Refreshes body and soul", wrong: ["Makes us weak", "Wastes time", "Nothing"], why: "So sleep provides a rejuvenation for both the body and the soul." },
        { tf: true, q: "Allah made the day a time for people to get up and work.", why: "People get up and go out to earn a living and attend to their business." }
      ]
    },
    {
      slug: "winds-bring-good-news",
      title: "Winds bring good news",
      line: "Allah sends winds ahead of rain like messengers of good news.",
      facts: ["Different winds have different jobs", "Rain water is pure"],
      quote: q25(48),
      source: ik(48, "Allah sends winds as good news before His mercy, the rain. Some winds form clouds, some carry or drive them, some come ahead to announce them. Then He sends pure water from the sky.", "Some of them form the clouds, others carry the clouds or drive them"),
      difficulty: 3,
      questions: [
        { q: "What do the winds bring, in 25:48?", a: "Glad tidings", wrong: ["Bad news", "Darkness", "Nothing"], why: "And it is He Who sends the winds as heralds of glad tidings, going before His mercy." },
        { q: "What do some winds do, per Ibn Kathir?", a: "Form and drive the clouds", wrong: ["Dry the seas", "Light the sky", "Move mountains"], why: "Some of them form the clouds, others carry the clouds or drive them." },
        { q: "What kind of water comes from the sky, in 25:48?", a: "Pure water", wrong: ["Salty water", "Muddy water", "Hot water"], why: "And We send down pure water from the sky." }
      ]
    },
    {
      slug: "rain-shared-out",
      title: "Rain shared out wisely",
      line: "Allah sends rain here, not there, so people remember Him.",
      facts: ["It gives life to dead land", "Most people are not grateful"],
      quote: q25(50),
      source: ik(50, "Allah sends rain to one land and not another, with great wisdom. Ibn Abbas and Ibn Mas'ud said one year has no more rain than another; Allah shares it out as He wills, so people remember His favor.", "Allah distributes the rain as He wills"),
      difficulty: 3,
      questions: [
        { q: "What does rain give life to, in 25:49?", a: "A dead land", wrong: ["Old stones", "The sky", "The stars"], why: "That We may give life thereby to a dead land." },
        { q: "Why is rain shared out, in 25:50?", a: "So people remember Allah's grace", wrong: ["By chance", "To punish all", "For no reason"], why: "And indeed We have distributed it among them in order that they may remember the grace of Allah." },
        { tf: true, q: "Ibn Abbas said one year does not have more rain than another.", why: "One year does not have more rain than another, but Allah distributes the rain as He wills." }
      ]
    },
    {
      slug: "the-two-seas",
      title: "Sweet water and salty sea",
      line: "Allah made sweet rivers and salty seas, with a barrier between.",
      facts: ["Sweet water flows among people", "Shared out by need"],
      quote: q25(53),
      source: ik(53, "Allah created two kinds of water: sweet, like rivers, springs and wells, and salty and bitter, like the seas. He shares the sweet water among His creatures according to their needs, and set a barrier between them.", "He has created the two kinds of water, sweet and salty"),
      difficulty: 3,
      questions: [
        { q: "What two seas are in 25:53?", a: "Sweet and salty", wrong: ["Hot and cold", "Red and black", "Old and new"], why: "This is palatable and sweet, and that is salty and bitter." },
        { q: "Where is the sweet water, per Ibn Kathir?", a: "Rivers, springs and wells", wrong: ["The open ocean", "The clouds only", "Inside rocks only"], why: "The sweet water is like that in rivers, springs and wells." },
        { q: "What is between them, in 25:53?", a: "A barrier and partition", wrong: ["A bridge", "A wall of fire", "Nothing"], why: "And He has set a barrier and a complete partition between them." }
      ]
    },
    {
      slug: "family-by-blood-and-marriage",
      title: "Family by blood and marriage",
      line: "Allah made people from water and gave them family ties.",
      facts: ["First you are someone's child", "Then family grows by marriage"],
      quote: q25(54),
      source: ik(54, "Allah created man from water and gave him relatives by blood and by marriage. At first he is someone's child; then he marries and gains in-laws, and later his own children marry too.", "then he gets married and becomes a son-in-law"),
      difficulty: 3,
      questions: [
        { q: "From what did Allah create man, in 25:54?", a: "Water", wrong: ["Fire", "Light", "Iron"], why: "And it is He Who has created man from water." },
        { q: "What two kinds of family are named, in 25:54?", a: "By blood and by marriage", wrong: ["By money and fame", "By city and tribe", "By age and size"], why: "And has appointed for him kindred by blood, and kindred by marriage." },
        { tf: true, q: "Ibn Kathir says a person starts as someone's child.", why: "In the beginning, he is someone's child, then he gets married." }
      ]
    },
    {
      slug: "the-ever-living",
      title: "Trust the Ever-Living",
      line: "Trust Allah, the Ever-Living who never dies.",
      facts: ["He is the First and the Last", "He is enough as a helper"],
      quote: q25(58),
      source: ik(58, "In all your matters, put your trust in Allah, the Ever-Living who never dies, the First and the Last. Turn to Him; He will be enough for you, and your helper and supporter.", "He will be sufficient for you and will be your helper and supporter"),
      difficulty: 4,
      questions: [
        { q: "In whom should we trust, in 25:58?", a: "The Ever-Living who dies not", wrong: ["A strong friend", "Our money", "Our luck"], why: "And put your trust in the Ever Living One Who dies not." },
        { q: "What will Allah be for those who trust Him, per Ibn Kathir?", a: "Sufficient, a helper", wrong: ["Far away", "Silent", "Busy"], why: "He will be sufficient for you and will be your helper and supporter." },
        { q: "What else are we told to do, in 25:58?", a: "Glorify His praises", wrong: ["Stay quiet", "Sleep more", "Count money"], why: "And glorify His praises, and sufficient is He as the All-Knower of the sins of His servants." }
      ]
    },
    {
      slug: "sun-lamp-moon-light",
      title: "A great lamp and a shining moon",
      line: "Allah placed great stars, a lamp-like sun and a bright moon.",
      facts: ["The sun shines like a lamp", "The moon reflects light"],
      quote: q25(61),
      source: ik(61, "Allah praises Himself for the great stars He set in the sky, and the sun that shines like a lamp, and the moon that gives light, lit by a light different from the sun's own.", "which is the sun which shines like a lamp"),
      difficulty: 4,
      questions: [
        { q: "What is the great lamp, per Ibn Kathir?", a: "The sun", wrong: ["The moon", "A star", "Lightning"], why: "Which is the sun which shines like a lamp." },
        { q: "What does the moon do, in 25:61?", a: "Gives light", wrong: ["Makes rain", "Burns hot", "Stays dark"], why: "And has placed therein a great lamp, and a moon giving light." },
        { q: "What are Al-Buruj, per Mujahid?", a: "The giant stars", wrong: ["Tall towers", "City walls", "Deep wells"], why: "The beauty He created in the heavens of Al-Buruj, the giant stars." }
      ]
    },
    {
      slug: "night-and-day-to-make-up",
      title: "Night and day in turns",
      line: "Night and day take turns, so missed worship can be made up.",
      facts: ["One comes as the other goes", "For those who remember and thank"],
      quote: q25(62),
      source: ik(62, "Allah made night and day follow each other forever, showing the times to worship Him. Whoever misses an act of worship at night can make it up in the day, and whoever misses it in the day can make it up at night.", "So whoever misses an act of worship during the night can make it up during the day"),
      difficulty: 4,
      questions: [
        { q: "How do night and day come, in 25:62?", a: "One after the other", wrong: ["Both at once", "Only night", "Randomly"], why: "And He it is Who has put the night and the day in succession." },
        { q: "Who benefits, in 25:62?", a: "Those who remember or give thanks", wrong: ["Only travellers", "Only farmers", "Nobody"], why: "For such who desires to remember or desires to show his gratitude." },
        { tf: true, q: "Worship missed at night can be made up in the day.", why: "So whoever misses an act of worship during the night can make it up during the day." }
      ]
    },
    {
      slug: "walk-humbly-say-salam",
      title: "Walk humbly, answer with peace",
      line: "Allah's servants walk humbly and answer rude people with peace.",
      facts: ["No pride in their walk", "They do not fight foolish words"],
      quote: q25(63),
      source: ik(63, "The servants of the Most Merciful walk on the earth with dignity and humility, not with pride. This is not a fake weak walk; it is calm and dignity. When foolish people speak to them, they reply with peaceful words.", "they walk with dignity and humility, not with arrogance and pride"),
      difficulty: 4,
      questions: [
        { q: "How do Allah's servants walk, in 25:63?", a: "Humbly, Hawna", wrong: ["Proudly", "Running wildly", "Dragging their feet"], why: "And the servants of the Most Gracious are those who walk on the earth Hawna." },
        { q: "What do they say to the foolish, in 25:63?", a: "Salama, peace", wrong: ["Angry words", "Nothing kind", "Shouts"], why: "And when the foolish address them they say: Salama." },
        { q: "What does Hawna mean, per Ibn Kathir?", a: "Dignity and humility", wrong: ["Speed", "Pride", "Weakness"], why: "They walk with dignity and humility, not with arrogance and pride." }
      ]
    },
    {
      slug: "walk-calmly-to-prayer",
      title: "Walk calmly to prayer",
      line: "Do not rush to prayer; walk calmly and pray what you catch.",
      facts: ["Calm walking is part of good manners", "Make up what you missed"],
      quote: q25(63),
      source: hadith("bukhari", "636", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: when you hear the iqamah, go to the prayer with calm and dignity and do not rush. Pray what you catch and complete what you missed.", "proceed to offer the prayer with calmness and solemnity and do not make haste"),
      difficulty: 4,
      questions: [
        { q: "How should we go to prayer after the iqamah?", a: "Calmly, without rushing", wrong: ["Running fast", "Shouting", "Pushing people"], why: "Proceed to offer the prayer with calmness and solemnity and do not make haste." },
        { q: "What if you miss part of the prayer?", a: "Complete what you missed", wrong: ["Go home", "Start a new one alone", "Skip it all"], why: "And pray whatever you are able to pray and complete whatever you have missed." },
        { tf: false, q: "Running to catch the start of prayer is better.", why: "Proceed to offer the prayer with calmness and solemnity and do not make haste." }
      ]
    },
    {
      slug: "nights-in-prayer",
      title: "Nights in prayer",
      line: "Allah's servants spend part of the night bowing and standing.",
      facts: ["They sleep little at night", "They ask forgiveness before dawn"],
      quote: q25(64),
      source: ik(64, "The servants of the Most Merciful spend the night worshipping their Lord, in prostration and standing. Like those who sleep little at night and ask for forgiveness before dawn.", "meaning, worshipping and obeying Him"),
      difficulty: 5,
      questions: [
        { q: "How do they spend the night, in 25:64?", a: "Prostrate and standing in worship", wrong: ["Watching shows", "Playing games", "Counting coins"], why: "And those who spend the night in worship of their Lord, prostrate and standing." },
        { q: "When do they ask forgiveness, in 51:18?", a: "Before dawn", wrong: ["At noon", "At lunch", "Never"], why: "And in the hours before dawn, they were asking for forgiveness." },
        { tf: true, q: "Ibn Kathir explains it as worshipping and obeying Him.", why: "Meaning, worshipping and obeying Him." }
      ]
    },
    {
      slug: "spend-in-balance",
      title: "Spend in balance",
      line: "They spend neither wastefully nor stingily, but in balance.",
      facts: ["The best way is the middle way", "Do not be stingy with family"],
      quote: q25(67),
      source: ik(67, "When they spend they are not wasteful, spending more than needed, nor stingy with their families. They follow the fairest way: the best of matters are those in the middle.", "The best of matters are those which are moderate"),
      difficulty: 5,
      questions: [
        { q: "How do they spend, in 25:67?", a: "In a just balance", wrong: ["All at once", "Never", "Only on themselves"], why: "Neither extravagant nor stingy, but are in a just balance between them." },
        { q: "Which matters are best, per Ibn Kathir?", a: "Those that are moderate", wrong: ["The most expensive", "The cheapest", "The loudest"], why: "The best of matters are those which are moderate, neither one extreme nor the other." },
        { tf: false, q: "Being stingy with your family is part of good spending.", why: "Nor are they miserly towards their families, not spending enough on their needs." }
      ]
    },
    {
      slug: "sins-turned-to-good",
      title: "Sins turned into good deeds",
      line: "For those who repent and do good, Allah changes sins to good.",
      facts: ["Repentance is accepted", "Allah is Forgiving, Merciful"],
      quote: q25(70),
      source: ik(70, "Allah accepts the repentance of anyone who repents, believes and does good, even after great sins. For them, Allah will change their bad deeds into good deeds. Allah is Oft-Forgiving, Most Merciful.", "Allah will change their sins into good deeds"),
      difficulty: 5,
      questions: [
        { q: "What does Allah change for those who repent, in 25:70?", a: "Their sins into good deeds", wrong: ["Their names", "Their homes", "Nothing"], why: "For those, Allah will change their sins into good deeds." },
        { q: "What three things come with this, in 25:70?", a: "Repent, believe, do good", wrong: ["Travel, trade, rest", "Eat, drink, sleep", "Run, hide, wait"], why: "Except those who repent and believe, and do righteous deeds." },
        { tf: true, q: "Ibn Kathir says repentance is accepted from all deeds if one repents.", why: "Those who repent in this world to Allah from all of those deeds, for then Allah will accept their repentance." }
      ]
    },
    {
      slug: "pass-by-with-dignity",
      title: "Pass by with dignity",
      line: "They avoid false talk and pass by bad play with dignity.",
      facts: ["They never give false witness", "They listen when reminded"],
      quote: q25(72),
      source: ik(72, "Allah's servants do not bear witness to falsehood or attend where it happens. If they pass by bad play or bad talk, they pass with dignity and do not let it touch them.", "they do not let it contaminate them in the slightest"),
      difficulty: 5,
      questions: [
        { q: "How do they pass by bad talk, in 25:72?", a: "With dignity", wrong: ["By joining in", "By laughing", "By filming it"], why: "And if they pass by some evil play or evil talk, they pass by it with dignity." },
        { q: "What do they not bear witness to, in 25:72?", a: "Falsehood", wrong: ["The truth", "Good deeds", "Prayer times"], why: "And those who do not bear witness to falsehood." },
        { q: "How do they react when reminded of Allah's ayahs, in 25:73?", a: "Not deaf and blind", wrong: ["They cover their ears", "They walk away", "They sleep"], why: "When they are reminded of the Ayat of their Lord, fall not deaf and blind thereat." }
      ]
    },
    {
      slug: "comfort-of-our-eyes",
      title: "The comfort of our eyes",
      line: "They pray for family who obey Allah and bring them joy.",
      facts: ["Ask for righteous children", "Ask to lead the pious"],
      quote: q25(74),
      source: ik(74, "Allah's servants pray: our Lord, give us from our spouses and children the comfort of our eyes, and make us leaders of the pious. Ibn Abbas said: children who obey Allah and bring joy in both worlds.", "who will strive to obey Allah and bring them joy in this world and the Hereafter"),
      difficulty: 5,
      questions: [
        { q: "What do they ask for, in 25:74?", a: "Comfort of their eyes in family", wrong: ["Big houses", "Fast horses", "Gold rings"], why: "Our Lord! Bestow on us from our wives and our offspring the comfort of our eyes." },
        { q: "What children bring comfort, per Ibn Abbas?", a: "Those who obey Allah", wrong: ["The richest ones", "The tallest ones", "The loudest ones"], why: "Who will strive to obey Allah and bring them joy in this world and the Hereafter." },
        { q: "Whom do they ask to lead, in 25:74?", a: "Those who have Taqwa", wrong: ["Big armies", "Rich traders", "Kings"], why: "And make us leaders of those who have Taqwa." }
      ]
    },
    {
      slug: "the-highest-place",
      title: "The highest place",
      line: "For their patience, they get Paradise and greetings of peace.",
      facts: ["Angels greet them at every gate", "They stay forever"],
      quote: q25(75),
      source: ik(75, "Those with these qualities will be rewarded on the Day of Resurrection with the highest place, Paradise, because of their patience. They will be greeted with welcome, honor and peace, and stay there forever.", "they will be greeted first with words of welcome and honor"),
      difficulty: 5,
      questions: [
        { q: "Why are they rewarded, in 25:75?", a: "Because of their patience", wrong: ["Because of wealth", "Because of fame", "Because of strength"], why: "Those will be rewarded with the highest place because of their patience." },
        { q: "How are they met there, in 25:75?", a: "With greetings and peace", wrong: ["With silence", "With questions", "With a test"], why: "Therein they shall be met with greetings and the word of peace and respect." },
        { q: "What is the highest place, per the scholars?", a: "Paradise", wrong: ["A mountain", "A palace on earth", "A tower"], why: "With the highest place, which is Paradise." }
      ]
    },
    {
      slug: "because-of-your-dua",
      title: "Because you call on Him",
      line: "Allah cares for us because we call on Him and worship Him.",
      facts: ["We were made to worship Him", "Glorify Him morning and evening"],
      quote: q25(77),
      source: ik(77, "Say: my Lord would not care for you if not for your calling on Him. He created people only to worship Him alone and glorify Him morning and evening.", "He only created mankind to worship Him Alone and to glorify Him morning and evening"),
      difficulty: 5,
      questions: [
        { q: "Why does Allah pay attention to us, in 25:77?", a: "Because of our dua to Him", wrong: ["Because of our money", "Because of our looks", "Because of our homes"], why: "My Lord pays attention to you only because of your invocation to Him." },
        { q: "Why were people created, per Ibn Kathir?", a: "To worship Him alone", wrong: ["To play all day", "To gather wealth", "For no reason"], why: "For He only created mankind to worship Him Alone and to glorify Him morning and evening." },
        { tf: true, q: "Al-Furqan ends with this reminder.", why: "Say: My Lord pays attention to you only because of your invocation to Him." }
      ]
    }
  ]
};

export const FURQAN_UNITS: readonly DeepUnit[] = [FURQAN_ONE, FURQAN_TWO];
