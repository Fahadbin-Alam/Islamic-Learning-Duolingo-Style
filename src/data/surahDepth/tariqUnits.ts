import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah At-Tariq ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on At-Tariq 86:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_86_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on At-Tariq 86:${ayah}`,
    url: `https://quran.com/86:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 86:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q86 = (ayah: number) => quranQuote(86, ayah);


/** Ayahs 1 to 10: the night star, the guardian over every soul, our humble beginning, and the Day secrets come out. */
const TARIQ_ONE: DeepUnit = {
  key: "tariq1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-86",
  name: "At-Tariq, ayahs 1-10",
  kind: "skill",
  lessonType: "surah",
  surahName: "At-Tariq",
  lessons: [
    {
      slug: "the-night-visitor",
      title: "The night visitor",
      line: "Allah swears by the sky and At-Tariq, the star seen at night.",
      facts: ["At-Tariq: the night comer", "Hidden by day, seen by night"],
      quote: q86(1),
      source: ik(1, "Qatadah said the star is called Tariq because it is only seen at night and is hidden during the day.", "it is only seen at night and it is hidden during the day"),
      difficulty: 1,
      questions: [
        { q: "By what does Allah swear in 86:1?", a: "The heaven and At-Tariq", wrong: ["The sea and fish", "The fig and olive", "The dawn"], why: "By the heaven, and At-Tariq." },
        { q: "Why is the star called Tariq, per Qatadah?", a: "It is only seen at night", wrong: ["It is very big", "It is red", "It never moves"], why: "The star has been named Tariq because it is only seen at night and it is hidden during the day." },
        { tf: true, q: "Coming home Taruq means arriving suddenly at night.", why: "This means that he comes to them unexpectedly at nighttime." }
      ]
    },
    {
      slug: "the-piercing-star",
      title: "The piercing star",
      line: "At-Tariq is a star whose bright light pierces the dark.",
      facts: ["Ath-Thaqib: piercing, shining", "Stars guard the sky"],
      quote: q86(3),
      source: ik(3, "Ibn Abbas said Ath-Thaqib means the illuminating; Ikrimah said it shines and burns the Shaytan.", "It is illuminating and it burns the Shaytan"),
      difficulty: 2,
      questions: [
        { q: "What does 86:2 ask?", a: "What will make you know what At-Tariq is?", wrong: ["Who made the sea?", "Where is the moon?", "When is the Day?"], why: "And what will make you to know what At-Tariq is?" },
        { q: "What is At-Tariq, per 86:3?", a: "The star, Ath-Thaqib", wrong: ["A bird", "A traveller", "A cloud"], why: "The star, Ath-Thaqib." },
        { q: "What does Ath-Thaqib mean, per Ibn Abbas?", a: "The illuminating", wrong: ["The cold", "The tiny", "The falling"], why: "Ibn Abbas said, The illuminating." }
      ]
    },
    {
      slug: "a-short-surah-for-prayer",
      title: "A surah fit for prayer",
      line: "Short surahs like At-Tariq suit a group prayer.",
      facts: ["Make prayer easy for people", "Imams think of others"],
      quote: q86(1),
      source: ik(1, "An-Nasai records that Muadh led Maghrib with very long surahs, and the Prophet ﷺ said At-Tariq and Ash-Shams would have been enough.", "Was it not sufficient for you to recite"),
      difficulty: 3,
      questions: [
        { q: "What did Muadh recite in Maghrib?", a: "Al-Baqarah and An-Nisa", wrong: ["Al-Fatihah only", "Al-Ikhlas", "Nothing"], why: "Muadh lead the Maghrib prayer and he recited Al-Baqarah and An-Nisa." },
        { q: "Which surahs did he say were enough?", a: "At-Tariq, Ash-Shams and the like", wrong: ["Only the longest ones", "None at all", "Only Al-Baqarah"], why: "Was it not sufficient for you to recite As-Samai wat-Tariq, and Ash-Shamsi wa Duhaha?" },
        { tf: true, q: "An imam should not make the prayer too hard for people.", why: "Are you putting the people to trial O Muadh?" }
      ]
    },
    {
      slug: "a-guardian-over-every-soul",
      title: "A guardian over every soul",
      line: "Every person has a guardian from Allah protecting them.",
      facts: ["Hafiz: guardian", "Angels guard by Allah's command"],
      quote: q86(4),
      source: ik(4, "Ibn Kathir says every soul has a guardian from Allah that protects it from calamities, as in 13:11.", "every soul has a guardian over it from Allah that protects it from the calamities"),
      difficulty: 2,
      questions: [
        { q: "What does every human have, per 86:4?", a: "A protector over him", wrong: ["A crown", "A secret name", "Nothing"], why: "There is no human being but has a protector over him." },
        { q: "What does the guardian protect from?", a: "Calamities", wrong: ["Hunger only", "Sleep", "Rain"], why: "Every soul has a guardian over it from Allah that protects it from the calamities." },
        { q: "Which ayah speaks of angels in succession guarding us?", a: "13:11", wrong: ["2:255", "112:1", "103:1"], why: "For Him, there are angels in succession, before and behind him. They guard him by the command of Allah." }
      ]
    },
    {
      slug: "from-what-was-man-made",
      title: "From what was man made?",
      line: "Allah tells us to think of our small, humble beginning.",
      facts: ["We began weak", "Humility before Allah"],
      quote: q86(5),
      source: ik(5, "Ibn Kathir says the ayah alerts man to the weakness of his origin, to guide him to accept the Hereafter.", "This is alerting man to the weakness of his origin"),
      difficulty: 2,
      questions: [
        { q: "What should man look at, per 86:5?", a: "From what he is created", wrong: ["How rich he is", "How tall he is", "What others own"], why: "So, let man see from what he is created!" },
        { q: "What does the ayah want man to accept, per Ibn Kathir?", a: "The Hereafter", wrong: ["Wealth", "Fame", "Nothing"], why: "The intent of it is to guide man to accept the reality of the Hereafter." },
        { tf: false, q: "Thinking of our beginning should make us proud.", why: "This is alerting man to the weakness of his origin from which he was created." }
      ]
    },
    {
      slug: "a-small-drop-of-water",
      title: "Made from a small drop",
      line: "Each child comes from both parents, by Allah's will.",
      facts: ["Ma'in dafiq: flowing water", "Both parents, by Allah's leave"],
      quote: q86(6),
      source: ik(6, "Ibn Kathir says the child is made from both the father and the mother by the permission of Allah.", "the child is produced from both of them by the permission of Allah"),
      difficulty: 3,
      questions: [
        { q: "From what is man created, per 86:6?", a: "A water gushing forth", wrong: ["Light", "Fire", "Wind"], why: "He is created from a water gushing forth." },
        { q: "From where does it come, per 86:7?", a: "Between the backbone and the ribs", wrong: ["From the sky", "From the sea", "From the mountains"], why: "Proceeding from between the backbone and the ribs." },
        { q: "From whom is the child made, per Ibn Kathir?", a: "Both father and mother", wrong: ["Only the father", "Only the mother", "Neither"], why: "Thus, the child is produced from both of them by the permission of Allah." }
      ]
    },
    {
      slug: "able-to-bring-him-back",
      title: "Able to bring him back",
      line: "Allah, who made us from a drop, can easily bring us back.",
      facts: ["Raj': bringing back", "Starting is harder than repeating"],
      quote: q86(8),
      source: ik(8, "Ibn Kathir says whoever can begin creation is surely able to repeat it, a proof given many times in the Quran.", "whoever is able to begin the creation then he surely is able to repeat it"),
      difficulty: 2,
      questions: [
        { q: "What is Allah able to do, per 86:8?", a: "Bring him back", wrong: ["Forget him", "Leave him", "Nothing more"], why: "Verily, He is Able to bring him back!" },
        { q: "Which ayah says repeating creation is easier for Him?", a: "30:27", wrong: ["1:2", "112:3", "2:2"], why: "And He it is Who originates the creation, then He will repeat it; and this is easier for Him." },
        { tf: true, q: "Bringing us back to life is easy for Allah.", why: "Whoever is able to begin the creation then he surely is able to repeat it." }
      ]
    },
    {
      slug: "secrets-brought-out",
      title: "When secrets come out",
      line: "On the Last Day every hidden secret will be shown openly.",
      facts: ["As-Sara'ir: the secrets", "Be the same in private"],
      quote: q86(9),
      source: ik(9, "Ibn Kathir says on that Day secrets are tested and exposed, and what was concealed becomes known.", "the secret will be made open and that which is concealed will be well known"),
      difficulty: 3,
      questions: [
        { q: "What will be examined that Day, per 86:9?", a: "All the secrets", wrong: ["Only the weather", "Only the coins", "Nothing"], why: "The Day when all the secrets will be examined." },
        { q: "What happens to what is concealed, per Ibn Kathir?", a: "It becomes well known", wrong: ["It stays hidden", "It is erased", "It is forgotten"], why: "The secret will be made open and that which is concealed will be well known." },
        { tf: false, q: "Secrets will stay hidden forever.", why: "Thus, the secret will be made open and that which is concealed will be well known." }
      ]
    },
    {
      slug: "the-flag-of-the-betrayer",
      title: "The flag of the betrayer",
      line: "Muhammad ﷺ said each betrayer gets a flag on the Last Day.",
      facts: ["Ghadr: betrayal", "Keep your promises"],
      quote: q86(9),
      source: hadith("bukhari", "6178", "Ibn Umar", "Sahih", "The Prophet ﷺ said a flag will be set up on the Day of Resurrection for every betrayer, announcing his betrayal before everyone.", "A flag will be fixed on the Day of Resurrection for every betrayer"),
      difficulty: 3,
      questions: [
        { q: "What will each betrayer have that Day?", a: "A flag", wrong: ["A crown", "A horse", "A key"], why: "A flag will be fixed on the Day of Resurrection for every betrayer." },
        { q: "What does the flag show?", a: "His betrayal, before everyone", wrong: ["His wealth", "His family", "His house"], why: "This is the betrayal of so-and-so, the son of so-and-so." },
        { tf: true, q: "Keeping promises and trusts protects us that Day.", why: "Every betrayer will have a flag raised for him behind his back." }
      ]
    },
    {
      slug: "no-power-no-helper",
      title: "No power, no helper",
      line: "That Day no one has strength in himself or help from others.",
      facts: ["Quwwah: power", "Nasir: helper"],
      quote: q86(10),
      source: ik(10, "Ibn Kathir says man will have no power within himself and no helper from outside to save him.", "he will not be able to save himself from the torment of Allah"),
      difficulty: 2,
      questions: [
        { q: "What will man lack, per 86:10?", a: "Power and any helper", wrong: ["Food and water", "Clothes", "Sleep"], why: "Then he will have no power, nor any helper." },
        { q: "Where is the power he lacks, per Ibn Kathir?", a: "Within himself", wrong: ["In his house", "In the sea", "In his pocket"], why: "Any power, meaning, within himself." },
        { q: "Where is the helper he lacks, per Ibn Kathir?", a: "From other than himself", wrong: ["From his own heart", "From the stars", "From a book"], why: "Nor any helper, meaning, from other than himself." }
      ]
    }
  ]
};

/** Ayahs 11 to 17: the returning rain, the splitting earth, and the Quran, a decisive Word and no joke. */
const TARIQ_TWO: DeepUnit = {
  key: "tariq2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-86",
  name: "At-Tariq, ayahs 11-17",
  kind: "skill",
  lessonType: "surah",
  surahName: "At-Tariq",
  lessons: [
    {
      slug: "the-returning-rain",
      title: "The returning rain",
      line: "Allah swears by the sky that sends rain again and again.",
      facts: ["Ar-Raj': the returning rain", "Rain is our provision"],
      quote: q86(11),
      source: ik(11, "Qatadah said the sky returns the provision of the creatures every year; without it they would perish.", "It returns the sustenance of the servants"),
      difficulty: 2,
      questions: [
        { q: "What does the sky do, per 86:11?", a: "Gives rain again and again", wrong: ["Stays dry", "Falls down", "Turns gold"], why: "By the sky which gives rain, again and again." },
        { q: "What does Ar-Raj' mean, per Ibn Abbas?", a: "Rain", wrong: ["Wind", "Sand", "Smoke"], why: "Ibn Abbas said, Ar-raj means rain." },
        { tf: true, q: "Without rain, people and their animals would perish.", why: "Were it not for this, they would all be destroyed and so would their cattle." }
      ]
    },
    {
      slug: "the-earth-that-splits",
      title: "The earth that splits",
      line: "The earth splits open so plants can grow out of it.",
      facts: ["As-Sad': splitting", "Every plant is a sign"],
      quote: q86(12),
      source: ik(12, "Ibn Abbas said the earth splits to bring forth plants; many others said the same.", "Splitting to bring forth plant growths"),
      difficulty: 1,
      questions: [
        { q: "What does the earth do, per 86:12?", a: "Splits", wrong: ["Shrinks", "Freezes", "Rises up"], why: "And the earth which splits." },
        { q: "Why does it split, per Ibn Abbas?", a: "To bring forth plants", wrong: ["To swallow people", "To make noise", "To hide gold"], why: "Splitting to bring forth plant growths." },
        { tf: false, q: "Plants grow without Allah's plan.", why: "And the earth which splits. Splitting to bring forth plant growths." }
      ]
    },
    {
      slug: "the-word-that-separates",
      title: "The Word that separates",
      line: "The Quran is a decisive Word, truth that is never a joke.",
      facts: ["Qawlun fasl: a decisive word", "Hazl: joking"],
      quote: q86(13),
      source: ik(14, "Ibn Abbas said the Word that separates means true; Ibn Kathir says the Quran is serious and true.", "rather it is serious and true"),
      difficulty: 2,
      questions: [
        { q: "What is the Quran, per 86:13?", a: "The Word that separates", wrong: ["A poem", "A song", "A riddle"], why: "Verily, this is the Word that separates." },
        { q: "What is it not, per 86:14?", a: "A thing for amusement", wrong: ["A guide", "The truth", "A mercy"], why: "And it is not a thing for amusement." },
        { q: "What did Ibn Abbas say Fasl means?", a: "True", wrong: ["Short", "Old", "Hidden"], why: "Ibn Abbas said Fasl is, True." }
      ]
    },
    {
      slug: "settles-every-dispute",
      title: "It settles disputes",
      line: "The Quran is the Word that settles arguments between groups.",
      facts: ["As-Sa'di explains", "Fasl: deciding"],
      quote: q86(14),
      source: saadi(86, 14, "As-Sa'di says the Quran is serious, never a joke, and it is the Word that decides between groups and views and settles arguments.", "وهو القول الذي يفصل بين الطوائف والمقالات، وتنفصل به الخصومات"),
      difficulty: 2,
      questions: [
        { q: "What does the Quran settle, per as-Sa'di on 86:14?", a: "Arguments between groups", wrong: ["Only prices", "Only weather", "Nothing"], why: "It decides between groups and views, and ends disputes." },
        { q: "The Quran is never...?", a: "A joke", wrong: ["True", "Clear", "Serious"], why: "It is serious, not jest." },
        { tf: true, q: "When Muslims disagree, the Quran is the judge.", why: "As-Sa'di on 86:14." }
      ]
    },
    {
      slug: "their-plot-and-allahs-plan",
      title: "Their plot and Allah's plan",
      line: "The deniers plotted against the Quran, but Allah's plan wins.",
      facts: ["Kayd: plot", "Allah plans best"],
      quote: q86(16),
      source: ik(15, "Ibn Kathir says they plotted by calling people to oppose the Quran, and Allah answered with His plan.", "they plot against the people in their calling them to oppose the Qur"),
      difficulty: 3,
      questions: [
        { q: "What are the deniers doing, per 86:15?", a: "Plotting a plot", wrong: ["Praying", "Giving charity", "Sleeping"], why: "Verily, they are but plotting a plot." },
        { q: "What does Allah say in 86:16?", a: "And I am planning a plan", wrong: ["I will leave them", "I am tired", "I do not know"], why: "And I am planning a plan." },
        { tf: true, q: "No plot can defeat the plan of Allah.", why: "Verily, they are but plotting a plot. And I am planning a plan." }
      ]
    },
    {
      slug: "too-weak-to-win",
      title: "Too weak to win",
      line: "No human can outplot the Strong, the All-Knowing.",
      facts: ["As-Sa'di explains", "Truth wins"],
      quote: q86(16),
      source: saadi(86, 16, "As-Sa'di says Allah plans to make the truth clear even if the deniers hate it, and a human is far too weak to beat the Strong, the All-Knowing.", "فإن الآدمي أضعف وأحقر من أن يغالب القوي العليم في كيده"),
      difficulty: 2,
      questions: [
        { q: "Why can no one beat Allah's plan?", a: "Humans are far too weak", wrong: ["Plans are equal", "He is not aware", "Luck decides"], why: "A human is too weak to beat the Strong, the Knowing, says as-Sa'di." },
        { q: "What does Allah plan in At-Tariq?", a: "To show the truth", wrong: ["To hide the truth", "To help falsehood", "Nothing"], why: "To make the truth clear and push falsehood away." },
        { tf: true, q: "The truth wins even if the deniers hate it.", why: "As-Sa'di on 86:16." }
      ]
    },
    {
      slug: "give-them-respite",
      title: "Give them a little time",
      line: "Muhammad ﷺ was told to be patient with the deniers.",
      facts: ["Amhil: give respite", "Patience, not haste"],
      quote: q86(17),
      source: ik(17, "Ibn Kathir says: wait for them and do not be in haste; deal gently with them for a little while.", "wait for them and do not be in haste concerning them"),
      difficulty: 2,
      questions: [
        { q: "What was he told to give the deniers, per 86:17?", a: "Respite for a while", wrong: ["Gifts", "Money", "Power"], why: "So, give a respite to the disbelievers; deal gently with them for a while." },
        { q: "What should he not do, per Ibn Kathir?", a: "Be in haste", wrong: ["Be patient", "Pray", "Wait"], why: "Wait for them and do not be in haste concerning them." },
        { q: "Which ayah says they enjoy a little, then face torment?", a: "31:24", wrong: ["1:1", "112:1", "2:286"], why: "We let them enjoy for a little while, then in the end We shall oblige them to enter a great torment." }
      ]
    }
  ]
};

export const TARIQ_UNITS: readonly DeepUnit[] = [TARIQ_ONE, TARIQ_TWO];
