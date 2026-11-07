import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Al-Mutaffifin ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Mutaffifin 83:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_83_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Mutaffifin 83:${ayah}`,
    url: `https://quran.com/83:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 83:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q83 = (ayah: number) => quranQuote(83, ayah);


/** Ayahs 1 to 6: woe to those who cheat in measure, and the Day all stand before the Lord of all. */
const MUTAFFIFIN_ONE: DeepUnit = {
  key: "mutaffifin1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-83",
  name: "Al-Mutaffifin, ayahs 1-6",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Mutaffifin",
  lessons: [
    {
      slug: "woe-to-the-cheaters",
      title: "Woe to the cheaters",
      line: "Allah warns those who cheat when they measure or weigh.",
      facts: ["Al-Mutaffifin: those who cheat", "Tatfif: short-changing"],
      quote: q83(1),
      source: ik(1, "Ibn Abbas said the people of Madinah cheated in measure until this was revealed; then they gave good measure.", "to be stingy with measurement and weight"),
      difficulty: 1,
      questions: [
        { q: "What is Tatfif, per Ibn Kathir?", a: "Being stingy in measure and weight", wrong: ["Being generous", "Travelling for trade", "Counting stars"], why: "The meaning of the word Tatfif is to be stingy with measurement and weight." },
        { q: "What did Madinah's traders do after it came down?", a: "They gave good measure", wrong: ["They cheated more", "They closed shops", "They moved away"], why: "After this, they began to give good measure." },
        { tf: true, q: "Woe means loss and destruction for the cheaters.", why: "Those whom He has promised loss and destruction, whom are meant by Woe." }
      ]
    },
    {
      slug: "full-measure-for-themselves",
      title: "Full measure for themselves",
      line: "Cheaters take full measure but give others less.",
      facts: ["Yastawfun: demand full", "Yukhsirun: give less"],
      quote: q83(2),
      source: ik(2, "Ibn Kathir says they take their right in full and even extra, but give others less than due.", "they take their right by demanding full measure and extra as well"),
      difficulty: 1,
      questions: [
        { q: "What do they demand when receiving, per 83:2?", a: "Full measure", wrong: ["Half measure", "Nothing", "A gift"], why: "Those who, when they have to receive by measure from men, demand full measure." },
        { q: "What do they do when giving, per 83:3?", a: "Give less than due", wrong: ["Give extra", "Give exactly", "Refuse to sell"], why: "And when they have to give by measure or weight to men, give less than due." },
        { tf: false, q: "Cheaters treat others the way they want to be treated.", why: "They take their right by demanding full measure and extra as well." }
      ]
    },
    {
      slug: "give-full-measure",
      title: "Give full measure",
      line: "Allah commands honest weights; Shu'ayb's people cheated.",
      facts: ["Ayah 17:35", "The people of Shu'ayb"],
      quote: q83(3),
      source: ik(3, "Ibn Kathir says Allah commanded full measure and weight, and destroyed the people of Shuayb for cheating.", "Allah commanded that the measure and weight should be given in full"),
      difficulty: 2,
      questions: [
        { q: "What did Allah command, per Ibn Kathir?", a: "Give measure and weight in full", wrong: ["Weigh only gold", "Never trade", "Trade only at night"], why: "Verily, Allah commanded that the measure and weight should be given in full." },
        { q: "Which people were destroyed for cheating?", a: "The people of Shu'ayb", wrong: ["The people of Yunus", "The people of Ibrahim", "The people of Isa"], why: "Allah destroyed the people of Shuayb because of their cheating in weights and measurements." },
        { tf: true, q: "Ayah 17:35 says honest weighing is better in the end.", why: "And weigh with a balance that is straight. That is good and better in the end." }
      ]
    },
    {
      slug: "whoever-cheats",
      title: "Whoever cheats",
      line: "Muhammad ﷺ found hidden wet grain: cheaters are not of us.",
      facts: ["Honest selling", "Show the flaw"],
      quote: q83(3),
      source: hadith("muslim", "102", "Abu Hurairah", "Sahih", "The Prophet ﷺ found rain-soaked grain hidden under dry grain and said it should be on top for people to see; he who deceives is not of him.", "He who deceives is not of"),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ find in the heap?", a: "Wet grain hidden under dry", wrong: ["Gold coins", "Stones", "Insects"], why: "He thrust his hand in that heap and his fingers were moistened." },
        { q: "Where should the wet part have been?", a: "On top, for people to see", wrong: ["At the bottom", "Thrown away", "Sold at night"], why: "Why did you not place this over other eatables so that the people could see it?" },
        { tf: false, q: "Hiding a flaw in goods is fine if no one notices.", why: "He who deceives is not of me." }
      ]
    },
    {
      slug: "fair-in-arguments-too",
      title: "Fair in arguments too",
      line: "Give others their full due, even their good points in a debate.",
      facts: ["As-Sa'di explains", "Fairness shows humility"],
      quote: q83(3),
      source: saadi(83, 3, "As-Sa'di says just as we must give people their full measure, in a debate we must also show the good proofs of the other side and look at them fairly.", "فيجب عليه أيضًا أن يبين ما لخصمه من الحجج"),
      difficulty: 3,
      questions: [
        { q: "Al-Mutaffifin teaches fairness in weighing and...?", a: "In arguments too", wrong: ["Only in food", "Only in gold", "Nowhere else"], why: "Even proofs and views are included, says as-Sa'di." },
        { q: "In a debate, what must we also show?", a: "The other side's good proofs", wrong: ["Only our proofs", "Nothing at all", "Their mistakes only"], why: "Show the proofs of the other side too." },
        { tf: true, q: "Short-measuring people is a kind of stealing.", why: "As-Sa'di on 83:3." }
      ]
    },
    {
      slug: "a-great-day",
      title: "A great Day",
      line: "Cheaters forget that they will be raised on a great Day.",
      facts: ["Yawmun Azim: a great Day", "Allah knows hidden things"],
      quote: q83(4),
      source: ik(4, "Ibn Kathir asks: do these people not fear the resurrection and standing before the One who knows every hidden secret?", "do these people not fear the resurrection"),
      difficulty: 2,
      questions: [
        { q: "What do cheaters not think of, per 83:4?", a: "That they will be resurrected", wrong: ["That prices will rise", "That rain will fall", "That shops will close"], why: "Do they not think that they will be resurrected." },
        { q: "What kind of Day is it, per 83:5?", a: "A Great Day", wrong: ["A small day", "A holiday", "A market day"], why: "On a Great Day." },
        { tf: true, q: "Allah knows the innermost secrets on that Day.", why: "Standing before He Who knows the hidden matters and the innermost secrets." }
      ]
    },
    {
      slug: "standing-before-the-lord",
      title: "Standing before the Lord",
      line: "All will stand before Allah, some deep in their sweat.",
      facts: ["Rabb al-Alamin", "Deeds decide the hardship"],
      quote: q83(6),
      source: hadith("bukhari", "4938", "Ibn Umar", "Sahih", "The Prophet ﷺ said when mankind stands before the Lord of the Worlds, some will be in sweat up to the middle of their ears.", "some of them will be enveloped in their sweat up to the middle of their ears"),
      difficulty: 2,
      questions: [
        { q: "Before whom will mankind stand, per 83:6?", a: "The Lord of all that exists", wrong: ["A king", "The angels only", "Each other"], why: "The Day when all mankind will stand before the Lord of all that exists." },
        { q: "How high will sweat reach for some, per the hadith?", a: "To the middle of their ears", wrong: ["Only to their feet", "No one will sweat", "Over the mountains"], why: "Some of them will be enveloped in their sweat up to the middle of their ears." },
        { tf: true, q: "The Prophet ﷺ sought refuge from the hardship of that standing.", why: "Then he would seek refuge from the hardship of the standing on the Day of Judgement." }
      ]
    }
  ]
};

/** Ayahs 7 to 17: Sijjin, the hearts covered by sins, and those veiled from their Lord. */
const MUTAFFIFIN_TWO: DeepUnit = {
  key: "mutaffifin2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-83",
  name: "Al-Mutaffifin, ayahs 7-17",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Mutaffifin",
  lessons: [
    {
      slug: "sijjin",
      title: "Sijjin",
      line: "The record of the wicked is kept in Sijjin, a narrow place.",
      facts: ["Sijjin: from Sijn, prison", "The lowest of the low"],
      quote: q83(7),
      source: ik(7, "Ibn Kathir says the record of the wicked is in Sijjin, a word from Sijn, prison, meaning straitened circumstances.", "which is derived from the word prison"),
      difficulty: 2,
      questions: [
        { q: "Where is the record of the wicked, per 83:7?", a: "In Sijjin", wrong: ["In Illiyyin", "In the sea", "In a palace"], why: "Nay! Truly, the Record of the wicked is in Sijjin." },
        { q: "What word does Sijjin come from?", a: "Sijn, prison", wrong: ["Sajdah, bowing", "Sama, sky", "Salam, peace"], why: "Sijjin, which is derived from the word prison, Sijn." },
        { tf: true, q: "Asking what Sijjin is shows how serious it is.", why: "Thus, Allah expresses the greatness of this matter, saying; And what will make you know what Sijjin is?" }
      ]
    },
    {
      slug: "a-register-inscribed",
      title: "A register inscribed",
      line: "Their record is written and complete; nothing added or removed.",
      facts: ["Kitabun Marqum: a written book", "Sealed and finished"],
      quote: q83(9),
      source: ik(9, "Muhammad bin Kab said the register is inscribed and completed; no one can add to it or remove anything from it.", "No one can add to it and no one can remove anything from it"),
      difficulty: 2,
      questions: [
        { q: "What is the record called in 83:9?", a: "A Register inscribed", wrong: ["A blank page", "A lost letter", "A song"], why: "A Register inscribed." },
        { q: "Can anyone change it, per Ibn Kathir?", a: "No, nothing added or removed", wrong: ["Yes, angels edit it", "Yes, the owner can", "Only on Fridays"], why: "No one can add to it and no one can remove anything from it." },
        { tf: false, q: "The register is still open to changes after death.", why: "It is inscribed, written, and completed." }
      ]
    },
    {
      slug: "woe-to-the-deniers",
      title: "Woe to the deniers",
      line: "Woe to those who deny the Day of Recompense as far-fetched.",
      facts: ["Wayl: woe, ruin", "Denial of the Day"],
      quote: q83(10),
      source: ik(11, "Ibn Kathir says the deniers do not believe the Day will happen and think it far-fetched.", "they do not believe it will happen"),
      difficulty: 1,
      questions: [
        { q: "Whom does 83:11 describe?", a: "Those who deny the Day of Recompense", wrong: ["Those who pray", "Those who give charity", "Those who travel"], why: "Those who deny the Day of Recompense." },
        { q: "What does Woe mean, per Ibn Kathir?", a: "Destruction and devastation", wrong: ["Welcome", "Good luck", "Goodbye"], why: "Basically, it means destruction and devastation." },
        { tf: true, q: "The deniers think the Day is far-fetched.", why: "Thus, they consider it a matter that is farfetched." }
      ]
    },
    {
      slug: "transgressor-and-sinner",
      title: "The transgressor, the sinner",
      line: "Only one who crosses limits and lies keeps denying the Day.",
      facts: ["Mu'tad: transgressor", "Athim: sinner"],
      quote: q83(12),
      source: ik(12, "Ibn Kathir says such a person does the forbidden, lies when he speaks, breaks promises and is abusive when he argues.", "he lies whenever he speaks, he breaks his promises"),
      difficulty: 2,
      questions: [
        { q: "Who denies the Day, per 83:12?", a: "Every transgressor and sinner", wrong: ["Every child", "Every traveller", "Every farmer"], why: "And none can deny it except every transgressor beyond bounds, the sinner." },
        { q: "What does he do with promises, per Ibn Kathir?", a: "He breaks them", wrong: ["He keeps them", "He writes them down", "He forgets none"], why: "He lies whenever he speaks, he breaks his promises whenever he makes them." },
        { tf: true, q: "Lying and breaking promises are signs of this sinner.", why: "He lies whenever he speaks, he breaks his promises whenever he makes them." }
      ]
    },
    {
      slug: "tales-of-the-ancients",
      title: "Tales of the ancients?",
      line: "When the Quran is recited, the denier calls it old stories.",
      facts: ["Asatir al-Awwalin: old tales", "Ayah 16:24"],
      quote: q83(13),
      source: ik(13, "Ibn Kathir says whenever he hears Allah's words he denies them, thinking they were gathered from old books.", "he denies it and has ill thoughts about it"),
      difficulty: 2,
      questions: [
        { q: "What does the denier call the ayat, per 83:13?", a: "Tales of the ancients", wrong: ["Words of wisdom", "Good news", "A true promise"], why: "When Our Ayat are recited to him, he says: Tales of the ancients!" },
        { q: "Where does he claim it came from, per Ibn Kathir?", a: "Books of the ancients", wrong: ["The angels", "A dream", "The stars"], why: "He believes that it is a collection gathered from the books of the ancients." },
        { tf: false, q: "The Quran is a collection of old stories.", why: "Rather, it is the Word of Allah, His inspiration and His revelation to His Messenger." }
      ]
    },
    {
      slug: "rust-on-the-heart",
      title: "Rust on the heart",
      line: "Sins pile up like rust on the heart; repentance clears it.",
      facts: ["Ran: a covering, rust", "Repent often"],
      quote: q83(14),
      source: ik(14, "Ibn Kathir says only a dark covering from many sins blocked their hearts from believing.", "the dark covering cast over it from the many sins"),
      difficulty: 3,
      questions: [
        { q: "What is on their hearts, per 83:14?", a: "The Ran, a covering", wrong: ["Light", "Gold", "Nothing"], why: "Nay! But on their hearts is the Ran which they used to earn." },
        { q: "What causes the Ran, per Ibn Kathir?", a: "Many sins", wrong: ["Hunger", "Old age", "Cold weather"], why: "The dark covering cast over it from the many sins and wrong they committed." },
        { tf: true, q: "Ibn Kathir says repenting polishes the heart clean.", why: "If he repents from it, his heart is polished clean." }
      ]
    },
    {
      slug: "veiled-from-their-lord",
      title: "Veiled from their Lord",
      line: "Deniers will be kept from seeing Allah; believers will see Him.",
      facts: ["Mahjubun: veiled", "Believers will see Allah"],
      quote: q83(15),
      source: ik(15, "Ash-Shafii said that this ayah proves the believers will see Allah on that Day.", "In this Ayah is a proof that the believers will see Him"),
      difficulty: 3,
      questions: [
        { q: "From what are the deniers veiled, per 83:15?", a: "From seeing their Lord", wrong: ["From the sun", "From their families", "From food"], why: "Nay! Surely, they will be veiled from seeing their Lord that Day." },
        { q: "What did Ash-Shafii learn from 83:15?", a: "The believers will see Allah", wrong: ["No one sees anything", "Angels are veiled", "Nothing"], why: "In this Ayah is a proof that the believers will see Him, the Mighty and Sublime, on that Day." },
        { tf: true, q: "Being veiled from Allah is a great loss.", why: "Along with this they will be veiled from seeing their Lord and Creator on the Day of Judgement." }
      ]
    },
    {
      slug: "what-you-used-to-deny",
      title: "What you used to deny",
      line: "The deniers will be told: this is what you used to deny.",
      facts: ["Tukadhdhibun: you denied", "Truth cannot be escaped"],
      quote: q83(17),
      source: ik(17, "Ibn Kathir says they will also be among the people of the Fire, and will be told this as a rebuke.", "this will be said to them by way of scolding"),
      difficulty: 2,
      questions: [
        { q: "What will be said to them, per 83:17?", a: "This is what you used to deny", wrong: ["Welcome home", "Rest now", "You were right"], why: "Then, it will be said to them: This is what you used to deny!" },
        { q: "Where will they enter, per 83:16?", a: "The Fire", wrong: ["Jannah", "A palace", "A garden"], why: "Then verily, they will indeed enter the burning flame of Hell." },
        { tf: false, q: "The words in 83:17 are words of comfort.", why: "This will be said to them by way of scolding, rebuking, belittling, and humiliation." }
      ]
    }
  ]
};

/** Ayahs 18 to 28: the record of the righteous in Illiyyin, their thrones, their joy and the drink of Tasnim. */
const MUTAFFIFIN_THREE: DeepUnit = {
  key: "mutaffifin3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-83",
  name: "Al-Mutaffifin, ayahs 18-28",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Mutaffifin",
  lessons: [
    {
      slug: "illiyyin",
      title: "Illiyyin, the high place",
      line: "The record of the righteous is kept high, in Illiyyin.",
      facts: ["Illiyyin: from Uluw, highness", "The opposite of Sijjin"],
      quote: q83(18),
      source: ik(18, "Ibn Kathir says the word Illiyyin comes from Uluw, which means highness, the opposite of Sijjin.", "which means highness"),
      difficulty: 2,
      questions: [
        { q: "Where is the record of the righteous, per 83:18?", a: "In Illiyyin", wrong: ["In Sijjin", "In the sea", "In a cave"], why: "Nay! Verily, the Record of Al-Abrar is preserved in Illiyyin." },
        { q: "Illiyyin comes from Uluw. What does Uluw mean?", a: "Highness", wrong: ["Darkness", "Lowness", "Water"], why: "The word Illiyyin is taken from the word Uluw, which means highness." },
        { tf: false, q: "Illiyyin and Sijjin mean the same place.", why: "Their final destination is Illiyyin, which is the opposite of Sijjin." }
      ]
    },
    {
      slug: "witnessed-by-the-nearest",
      title: "Witnessed by those nearest",
      line: "Angels close to Allah witness the record of the righteous.",
      facts: ["Marqum: inscribed", "Al-Muqarrabun: those nearest"],
      quote: q83(21),
      source: ik(21, "Qatadah said those nearest who witness the record are the angels.", "They are the angels"),
      difficulty: 2,
      questions: [
        { q: "What is the record of the righteous, per 83:20?", a: "A register inscribed", wrong: ["A blank page", "A lost scroll", "A spoken word"], why: "A Register inscribed. To which bear witness those nearest." },
        { q: "Who are those nearest, per Qatadah?", a: "The angels", wrong: ["The kings", "The poets", "The traders"], why: "To which bear witness those nearest. They are the angels." },
        { tf: true, q: "Honoured angels witness the record of the righteous.", why: "Those nearest to Allah in each heaven will witness it." }
      ]
    },
    {
      slug: "on-thrones-looking",
      title: "On thrones, looking",
      line: "The righteous will rest on thrones, looking at Allah.",
      facts: ["Al-Araik: raised thrones", "Na'im: lasting delight"],
      quote: q83(23),
      source: ik(23, "Ibn Kathir says the righteous will be on thrones, gazing at their blessings, and it is said at Allah.", "they will be looking at Allah"),
      difficulty: 2,
      questions: [
        { q: "Where will the righteous be, per 83:22?", a: "In delight", wrong: ["In sorrow", "In a desert", "In a prison"], why: "Verily, Al-Abrar will be in Delight." },
        { q: "What are they doing on their thrones, per 83:23?", a: "Looking", wrong: ["Sleeping", "Crying", "Working"], why: "On thrones, looking." },
        { q: "At whom will they look, per one saying?", a: "At Allah", wrong: ["At the deniers", "At the stars", "At no one"], why: "This means that they will be looking at Allah, the Mighty and Sublime." }
      ]
    },
    {
      slug: "see-your-lord-like-the-moon",
      title: "You will see your Lord",
      line: "Believers will see Allah as clearly as the full moon.",
      facts: ["Seeing Allah is the best reward", "Guard Fajr and Asr"],
      quote: q83(23),
      source: hadith("bukhari", "554", "Jarir ibn Abdullah", "Sahih", "The Prophet ﷺ looked at the full moon and said: you will see your Lord as you see this moon, with no trouble. So do not miss the prayers before sunrise and before sunset.", "Certainly you will see your Lord as you see this moon"),
      difficulty: 3,
      questions: [
        { q: "What did he compare seeing Allah to?", a: "Seeing the full moon", wrong: ["Seeing a dream", "Seeing the sea", "Seeing a shadow"], why: "You will see your Lord as you see this moon." },
        { q: "Which prayers did he say not to miss?", a: "Before sunrise and before sunset", wrong: ["Only at night", "Only on Fridays", "Only in Ramadan"], why: "So do not miss the prayers before sunrise and before sunset." },
        { tf: false, q: "The believers will struggle to see Allah.", why: "You will see Him with no trouble, as you see the full moon." }
      ]
    },
    {
      slug: "brightness-of-delight",
      title: "Faces glowing with joy",
      line: "The joy of the righteous will shine on their faces.",
      facts: ["Nadrah: brightness, glow", "Joy shows on the face"],
      quote: q83(24),
      source: ik(24, "Ibn Kathir says you will notice a glow of delight in their faces, from happiness and calm.", "you will notice a glow of delight in their faces"),
      difficulty: 2,
      questions: [
        { q: "What will you recognise in their faces, per 83:24?", a: "The brightness of delight", wrong: ["Fear", "Tiredness", "Sadness"], why: "You will recognize in their faces the brightness of delight." },
        { q: "What does the glow show, per Ibn Kathir?", a: "Happiness and composure", wrong: ["Anger", "Hunger", "Worry"], why: "A description of opulence, decorum, happiness, composure, and authority." },
        { tf: true, q: "The delight of Paradise will show on the faces of its people.", why: "You will notice a glow of delight in their faces when you look at them." }
      ]
    },
    {
      slug: "sealed-with-musk",
      title: "A pure drink sealed with musk",
      line: "Paradise has a pure drink, sealed with sweet musk.",
      facts: ["Ar-Rahiq: a pure drink of Paradise", "Khitam: seal, last touch"],
      quote: q83(25),
      source: ik(25, "Ibn Masud said sealed with musk means mixed with musk, giving it a pleasant smell.", "it will be mixed with musk"),
      difficulty: 2,
      questions: [
        { q: "What is the drink sealed with, per 83:26?", a: "Musk", wrong: ["Salt", "Clay", "Smoke"], why: "Sealed with musk, and for this let those strive who want to strive." },
        { q: "What did Ibn Masud say sealed with musk means?", a: "Mixed with musk", wrong: ["Locked in a jar", "Kept from them", "Made bitter"], why: "This means it will be mixed with musk." },
        { tf: true, q: "Allah gives the drink a pleasant smell for its people.", why: "Allah will make it have a pleasant aroma for them." }
      ]
    },
    {
      slug: "let-them-compete",
      title: "Let them compete for this",
      line: "Whoever wants to compete, let them race for Paradise.",
      facts: ["Tanafus: competing", "Race in good deeds"],
      quote: q83(26),
      source: ik(26, "Ibn Kathir says for a reward like this, let the competitors compete and race toward it.", "Let the competitors compete and race toward the likes of this"),
      difficulty: 3,
      questions: [
        { q: "For what should people strive, per 83:26?", a: "For the bliss of Paradise", wrong: ["For fame", "For more money", "For winning games"], why: "And for this let all those strive who want to strive." },
        { q: "Which ayah says the same, per Ibn Kathir?", a: "37:61, For the like of this let the workers work", wrong: ["1:1, In the name of Allah", "112:1, Say He is Allah", "103:1, By time"], why: "This is similar to Allah's statement, For the like of this let the workers work." },
        { tf: false, q: "Islam says competing is always wrong.", why: "Let the competitors compete and race toward the likes of this." }
      ]
    },
    {
      slug: "tasnim",
      title: "Tasnim, the spring on high",
      line: "The drink is mixed from Tasnim, a spring of the nearest.",
      facts: ["Tasnim: the best drink of Paradise", "Al-Muqarrabun drink it pure"],
      quote: q83(27),
      source: ik(27, "Ibn Kathir says Tasnim is the finest drink of Paradise; the nearest drink it pure and others have it mixed.", "it is the most excellent and exalted drink of the people of Paradise"),
      difficulty: 3,
      questions: [
        { q: "With what is the drink mixed, per 83:27?", a: "Tasnim", wrong: ["Zamzam", "Rain", "Milk"], why: "It will be mixed with Tasnim." },
        { q: "Who drink from Tasnim, per 83:28?", a: "Those nearest to Allah", wrong: ["The deniers", "Only angels", "No one"], why: "A spring whereof drink those nearest to Allah." },
        { q: "What do the companions of the right get?", a: "A drink mixed with Tasnim", wrong: ["Nothing at all", "Only water", "Salt water"], why: "The companions of the right hand will be given a drink that is mixed with it." }
      ]
    }
  ]
};

/** Ayahs 29 to 36: the deniers mocked the believers, and on the Last Day the believers will laugh. */
const MUTAFFIFIN_FOUR: DeepUnit = {
  key: "mutaffifin4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-83",
  name: "Al-Mutaffifin, ayahs 29-36",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Mutaffifin",
  lessons: [
    {
      slug: "laughing-at-believers",
      title: "They laughed at the believers",
      line: "In this world the wrongdoers mocked and winked at believers.",
      facts: ["Yataghamazun: winking", "Mockery is a sin"],
      quote: q83(29),
      source: ik(29, "Ibn Kathir says the criminals mocked and despised the believers, winking at each other in contempt.", "they would mock them and despise them"),
      difficulty: 2,
      questions: [
        { q: "What did the criminals do, per 83:29?", a: "Laughed at the believers", wrong: ["Helped the believers", "Prayed with them", "Fed them"], why: "Verily, those who committed crimes used to laugh at those who believed." },
        { q: "What did they do when passing by, per 83:30?", a: "Winked at one another", wrong: ["Gave salam", "Gave gifts", "Stayed silent"], why: "And, whenever they passed by them, used to wink one to another." },
        { tf: true, q: "We should never mock people for their faith.", why: "They would mock them and despise them, and Allah blamed them for it." }
      ]
    },
    {
      slug: "wrong-yet-feeling-safe",
      title: "Wrong, yet feeling safe",
      line: "The worst self-deception: doing great wrong and feeling safe.",
      facts: ["As-Sa'di explains", "Ightirar: being fooled"],
      quote: q83(32),
      source: saadi(83, 32, "As-Sa'di says it is the worst self-deception to do great wrong and still feel safe, as if Allah had promised you success while calling the believers lost.", "وهذا من أعظم ما يكون من الاغترار"),
      difficulty: 3,
      questions: [
        { q: "What is the worst self-deception, per as-Sa'di?", a: "Doing wrong and feeling safe", wrong: ["Being humble", "Fearing Allah", "Doing good quietly"], why: "They joined the worst wrong with feeling safe, says as-Sa'di." },
        { q: "What did the mockers call the believers?", a: "Lost", wrong: ["Wise", "Rich", "Brave"], why: "They said the believers were astray." },
        { tf: false, q: "Allah gave the mockers a promise of success.", why: "It is as if they think so, but no. As-Sa'di on 83:32." }
      ]
    },
    {
      slug: "returning-pleased",
      title: "They went home jesting",
      line: "They went home happy and joking, yet never thanked Allah.",
      facts: ["Fakihin: jesting, pleased", "Gratitude, not mockery"],
      quote: q83(31),
      source: ik(31, "Ibn Kathir says they returned home pleased with all they had, yet still were not grateful to Allah.", "they still are not grateful for Allah"),
      difficulty: 2,
      questions: [
        { q: "How did they return home, per 83:31?", a: "Jesting", wrong: ["Weeping", "Fasting", "Repenting"], why: "And when they returned to their own people, they would return jesting." },
        { q: "What were they not, per Ibn Kathir?", a: "Grateful for Allah's favour", wrong: ["Rich", "Healthy", "Busy"], why: "Yet, with this, they still are not grateful for Allah's favor upon them." },
        { tf: false, q: "They were grateful and kind to the believers.", why: "Rather they busy themselves with despising and envying the believers." }
      ]
    },
    {
      slug: "not-sent-as-watchers",
      title: "Not sent as watchers",
      line: "The deniers called believers astray, but were not their judges.",
      facts: ["Hafizin: watchers, guardians", "Mind your own deeds"],
      quote: q83(32),
      source: ik(32, "Ibn Kathir says the criminals were not made guardians over the deeds of the believers.", "these criminals have not been sent as guardians"),
      difficulty: 3,
      questions: [
        { q: "What did they say about the believers, per 83:32?", a: "These have gone astray", wrong: ["These are wise", "These are rich", "These are our friends"], why: "Verily, these have indeed gone astray!" },
        { q: "What were they not sent as, per 83:33?", a: "Watchers over them", wrong: ["Guests", "Traders", "Neighbours"], why: "But they were not sent as watchers over them." },
        { tf: true, q: "We are not put in charge of judging other people.", why: "These wrongdoers have not been made responsible for them." }
      ]
    },
    {
      slug: "the-believers-will-laugh",
      title: "The believers will laugh",
      line: "On the Last Day the believers will smile, resting on thrones.",
      facts: ["Patience is rewarded", "The last laugh is with Allah"],
      quote: q83(34),
      source: ik(34, "Ibn Kathir says the believers will laugh in return for how they were laughed at, rewarded for their patience.", "as retribution for how those people laughed at them"),
      difficulty: 2,
      questions: [
        { q: "Who will laugh that Day, per 83:34?", a: "Those who believe", wrong: ["The mockers", "No one", "The traders"], why: "But this Day those who believe will laugh at the disbelievers." },
        { q: "Which ayahs say Allah rewards their patience?", a: "23:108-111", wrong: ["2:255", "112:1-4", "1:1-7"], why: "Verily, I have rewarded them this Day for their patience: they are indeed the ones that are successful." },
        { tf: false, q: "Patience against mockery is wasted.", why: "Looking at Allah as reward for bearing the false claims against them." }
      ]
    },
    {
      slug: "paid-in-full",
      title: "Paid in full",
      line: "Allah asks: have the deniers not been paid for what they did?",
      facts: ["Thuwwib: repaid", "Allah's justice is complete"],
      quote: q83(36),
      source: ik(36, "Ibn Kathir says the disbelievers will surely be paid in full for their mocking of the believers.", "they surely will be paid in full"),
      difficulty: 3,
      questions: [
        { q: "What does 83:36 ask?", a: "Are the disbelievers not paid?", wrong: ["Are the stars not bright?", "Is the sea not deep?", "Is the trade not good?"], why: "Are not the disbelievers paid for what they used to do?" },
        { q: "How will they be paid, per Ibn Kathir?", a: "In full, completely", wrong: ["Not at all", "Only a little", "By other people"], why: "They surely will be paid in full, completely and perfectly." },
        { tf: true, q: "Allah's justice leaves nothing out.", why: "They surely will be paid in full, completely and perfectly." }
      ]
    }
  ]
};

export const MUTAFFIFIN_UNITS: readonly DeepUnit[] = [MUTAFFIFIN_ONE, MUTAFFIFIN_TWO, MUTAFFIFIN_THREE, MUTAFFIFIN_FOUR];
