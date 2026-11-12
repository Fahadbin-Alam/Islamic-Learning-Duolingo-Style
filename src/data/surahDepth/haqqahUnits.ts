import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Al-Haqqah ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Haqqah 69:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_69_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Haqqah 69:${ayah}`,
    url: `https://quran.com/69:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 69:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q69 = (ayah: number) => quranQuote(69, ayah);


/** Ayahs 1 to 12: the Day that must come, and the nations that denied it. */
const HAQQAH_ONE: DeepUnit = {
  key: "haqqah1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-69",
  name: "Al-Haqqah, ayahs 1 to 12",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Haqqah",
  lessons: [
    {
      slug: "the-sure-reality",
      title: "The Sure Reality",
      line: "Al-Haqqah is a name for the Day of Judgement.",
      facts: ["Al-Haqqah: the sure reality", "The Day will surely come"],
      quote: q69(1),
      source: ik(1, "Ibn Kathir says Al-Haqqah is one of the names of the Day of Judgement.", "Al-Haqqah is one of the names of the Day of Judgement"),
      difficulty: 1,
      questions: [
        { q: "What is Al-Haqqah a name for?", a: "The Day of Judgement", wrong: ["A city in Arabia", "A kind of tree", "A month of the year"], why: "Al-Haqqah is one of the names of the Day of Judgement." },
        { q: "What does Al-Haqqah mean?", a: "The sure reality", wrong: ["The long night", "The great river", "The first prayer"], why: "Al-Haqqah is the Day when the promise and the threat will surely come true." },
        { tf: false, q: "Al-Haqqah is the name of a mountain.", why: "Al-Haqqah is one of the names of the Day of Judgement." }
      ]
    },
    {
      slug: "promise-comes-true",
      title: "The promise comes true",
      line: "On that Day, every promise and warning of Allah comes true.",
      facts: ["Allah keeps His promise", "Nothing can stop that Day"],
      quote: q69(2),
      source: ik(2, "Ibn Kathir says the Day is called Al-Haqqah because during it the promise and the threat will surely occur.", "because during it the promise and the threat will inevitably occur"),
      difficulty: 2,
      questions: [
        { q: "Why is the Day called Al-Haqqah?", a: "Promise and warning surely occur", wrong: ["The sun is hot", "People sleep long", "The sea is calm"], why: "Because during it the promise and the threat will inevitably occur." },
        { q: "Can the promise of that Day fail?", a: "No, it will surely happen", wrong: ["Yes, often", "Only sometimes", "Nobody knows"], why: "During it the promise and the threat will inevitably occur." },
        { tf: true, q: "Allah's warning about the Last Day will come true.", why: "During it the promise and the threat will inevitably occur." }
      ]
    },
    {
      slug: "how-great-that-day",
      title: "How great that Day is",
      line: "Allah asks: what will make you know what Al-Haqqah is?",
      facts: ["A question to wake us", "The Day is very great"],
      quote: q69(3),
      source: ik(3, "Ibn Kathir says Allah declared the greatness of this matter by asking what will make you know what Al-Haqqah is.", "Allah has declared the greatness of this matter"),
      difficulty: 2,
      questions: [
        { q: "Why does Allah ask what Al-Haqqah is?", a: "To show how great it is", wrong: ["Because no one cares", "To make a joke", "To test spelling"], why: "Allah has declared the greatness of this matter." },
        { q: "What does 69:3 ask?", a: "What will make you know Al-Haqqah?", wrong: ["Who built the Kaaba?", "When is Ramadan?", "Where is the sea?"], why: "And what will make you know what Al-Haqqah is?" },
        { tf: false, q: "The Day of Judgement is a small matter.", why: "Allah has declared the greatness of this matter." }
      ]
    },
    {
      slug: "nations-that-denied",
      title: "Nations that denied",
      line: "Thamud and Ad denied the Day, and they were destroyed.",
      facts: ["Al-Qariah: the Striking Hour", "Lessons from the past"],
      quote: q69(4),
      source: ik(4, "Ibn Kathir says Allah then mentions the destruction of the nations that denied the Resurrection.", "Then Allah mentions the destruction of the nations that denied the Resurrection"),
      difficulty: 2,
      questions: [
        { q: "Which two nations are named in 69:4?", a: "Thamud and Ad", wrong: ["Rome and Persia", "Saba and Madyan", "Egypt and Babylon"], why: "Thamud and Ad denied the Qariah!" },
        { q: "What did those nations deny?", a: "The Resurrection", wrong: ["The rain", "The harvest", "Their kings"], why: "Allah mentions the destruction of the nations that denied the Resurrection." },
        { tf: false, q: "Thamud and Ad believed in the Day of Judgement.", why: "Allah mentions the destruction of the nations that denied the Resurrection." }
      ]
    },
    {
      slug: "thamud-and-the-shout",
      title: "Thamud and the cry",
      line: "Thamud were destroyed by a mighty cry, At-Taghiyah.",
      facts: ["At-Taghiyah: the awful cry", "Allah's power is real"],
      quote: q69(5),
      source: ik(5, "Ibn Kathir says At-Taghiyah is the cry and the quake that silenced them; Qatadah said At-Taghiyah is the shout.", "At-Taghiyah is the shout"),
      difficulty: 2,
      questions: [
        { q: "What destroyed Thamud?", a: "At-Taghiyah, a mighty cry", wrong: ["A flood", "A cold wind", "A swarm of locusts"], why: "As for Thamud, they were destroyed by the Taghiyah!" },
        { q: "What did Qatadah say At-Taghiyah is?", a: "The shout", wrong: ["The fire", "The sea", "The sand"], why: "Qatadah said, At-Taghiyah is the shout." },
        { tf: true, q: "Thamud were punished with a mighty cry.", why: "It is the cry which will silence them, and the quake that will silence them." }
      ]
    },
    {
      slug: "thamud-transgressed",
      title: "Thamud transgressed",
      line: "Some scholars said At-Taghiyah means their sins and pride.",
      facts: ["Sin brings ruin", "Tughyan: going too far"],
      quote: q69(5),
      source: ik(5, "Mujahid said At-Taghiyah means the sins, and others said it means transgression, citing 91:11.", "They said that it means transgression"),
      difficulty: 3,
      questions: [
        { q: "What did Mujahid say At-Taghiyah means?", a: "The sins", wrong: ["The camels", "The houses", "The rain"], why: "Mujahid said, At-Taghiyah means the sins." },
        { q: "Which ayah did Ibn Zayd recite as proof?", a: "Thamud denied through their transgression", wrong: ["By the pen", "Say: He is Allah, One", "By the fig and olive"], why: "Thamud denied through their transgression. (91:11)" },
        { tf: false, q: "Thamud were destroyed for being too kind.", why: "They said that it means transgression." }
      ]
    },
    {
      slug: "ad-and-the-wind",
      title: "Ad and the wind",
      line: "Ad were destroyed by a cold, furious wind.",
      facts: ["Sarsar: very cold", "Atiyah: blowing hard"],
      quote: q69(6),
      source: ik(6, "Ibn Kathir says Sarsar means a cold wind, and Atiyah means severe blowing, with no mercy or blessing in it.", "meaning, a cold wind"),
      difficulty: 2,
      questions: [
        { q: "What does Sarsar mean?", a: "Cold", wrong: ["Hot", "Wet", "Gentle"], why: "And as for Ad, they were destroyed by a wind Sarsar, meaning, a cold wind." },
        { q: "What does Atiyah mean?", a: "Blowing very hard", wrong: ["Very quiet", "Very short", "Very sweet"], why: "This means severe blowing of the wind." },
        { tf: false, q: "The wind sent on Ad was a gentle breeze.", why: "It blew fiercely upon them without any mercy or blessing." }
      ]
    },
    {
      slug: "east-and-west-wind",
      title: "The east and west wind",
      line: "A wind helped the Prophet ﷺ, and a wind destroyed Ad.",
      facts: ["As-Saba: the east wind", "Ad-Dabur: the west wind"],
      quote: q69(6),
      source: hadith("bukhari", "1035", "Ibn Abbas", "Sahih", "The Prophet ﷺ said he was granted victory with As-Saba, the east wind, and the nation of Ad was destroyed by Ad-Dabur, the west wind.", "I was granted victory with As-Saba"),
      difficulty: 3,
      questions: [
        { q: "Which wind helped the Prophet ﷺ?", a: "As-Saba, the east wind", wrong: ["Ad-Dabur", "A storm of sand", "No wind"], why: "I was granted victory with As-Saba." },
        { q: "Which wind destroyed Ad?", a: "Ad-Dabur, the west wind", wrong: ["As-Saba", "A warm breeze", "A sea wind"], why: "The nation of Ad was destroyed by Ad-Dabur, the westerly wind." },
        { tf: true, q: "Allah uses the wind for help or for punishment.", why: "I was granted victory with As-Saba and the nation of Ad was destroyed by Ad-Dabur." }
      ]
    },
    {
      slug: "seven-nights-eight-days",
      title: "Seven nights, eight days",
      line: "The wind blew on Ad for seven nights and eight days.",
      facts: ["Husum: one after another", "No one could stop it"],
      quote: q69(7),
      source: ik(7, "Ibn Masud, Ibn Abbas, Mujahid and others said Husum means in succession, one day after another.", "Husum means in succession"),
      difficulty: 2,
      questions: [
        { q: "How long did the wind blow on Ad?", a: "Seven nights and eight days", wrong: ["One hour", "Three days", "Forty years"], why: "Which Allah imposed on them for seven nights and eight days Husum." },
        { q: "What does Husum mean?", a: "In succession", wrong: ["In silence", "In the sea", "In the shade"], why: "Ibn Masud, Ibn Abbas, Mujahid, Ikrimah, Ath-Thawri and others all said, Husum means in succession." },
        { tf: false, q: "The wind on Ad stopped after one night.", why: "For seven nights and eight days Husum, meaning in succession." }
      ]
    },
    {
      slug: "none-of-them-left",
      title: "None of them left",
      line: "Do you see any of them left? Not one remained.",
      facts: ["Power does not last", "Only Allah remains"],
      quote: q69(8),
      source: ik(8, "Ibn Kathir says they all went, down to the last of them, and Allah did not leave them any successors.", "Rather they are all gone, right down to the last of them"),
      difficulty: 2,
      questions: [
        { q: "What does 69:8 ask?", a: "Do you see any remnants?", wrong: ["Do you see the moon?", "Who built the ship?", "Where is the garden?"], why: "Do you see any remnants of them?" },
        { q: "How many of Ad remained?", a: "None at all", wrong: ["Half of them", "Only the kings", "Most of them"], why: "Rather they are all gone, right down to the last of them." },
        { tf: false, q: "Ad left many successors who carried on their ways.", why: "Allah did not make for them any successors." }
      ]
    },
    {
      slug: "firawn-and-the-sin",
      title: "Firawn and the sin",
      line: "Firawn, those before him and overturned towns rejected Allah.",
      facts: ["Al-Khatiah: the great sin", "Rejecting revelation"],
      quote: q69(9),
      source: ik(9, "Ibn Kathir says Al-Khatiah means their rejection of what Allah revealed; Ar-Rabi said disobedience.", "means their rejection of what Allah revealed"),
      difficulty: 3,
      questions: [
        { q: "Who is named with those before him in 69:9?", a: "Firawn", wrong: ["Qarun", "Haman", "Namrud"], why: "And Firawn, and those before him, and the cities overthrown committed Al-Khatiah." },
        { q: "What does Al-Khatiah mean, per Ibn Kathir?", a: "Rejecting what Allah revealed", wrong: ["Building tall towers", "Losing a battle", "Forgetting a name"], why: "Al-Khatiah means their rejection of what Allah revealed." },
        { tf: true, q: "The overthrown cities were nations who rejected their Messengers.", why: "The overthrown cities: those nations that rejected their Messengers." }
      ]
    },
    {
      slug: "deny-one-deny-all",
      title: "Deny one, deny all",
      line: "Whoever denies one Messenger denies all of the Messengers.",
      facts: ["All brought one message", "Believe in every prophet"],
      quote: q69(10),
      source: ik(10, "Ibn Kathir says whoever denies a Messenger denies all of the Messengers, as in 26:105 and 26:123.", "So whoever denies a Messenger, then verily, he denies all of the Messengers"),
      difficulty: 3,
      questions: [
        { q: "What does denying one Messenger mean?", a: "Denying all of them", wrong: ["Nothing at all", "Denying only him", "Liking the others more"], why: "So whoever denies a Messenger, then verily, he denies all of the Messengers." },
        { q: "What does Rabiyah mean?", a: "Great and severe", wrong: ["Small and soft", "Late and slow", "Sweet and cool"], why: "Rabiyah means, great, severe and painful." },
        { tf: false, q: "A person may believe in some prophets and deny others.", why: "Whoever denies a Messenger, then verily, he denies all of the Messengers." }
      ]
    },
    {
      slug: "carried-in-the-ship",
      title: "Carried in the ship",
      line: "In the flood, Allah carried the believers with Nuh in the ship.",
      facts: ["Nuh's Ark", "All people descend from them"],
      quote: q69(11),
      source: ik(11, "Ibn Kathir says the people of the earth were covered with the flood except those with Nuh in the ship, so all people are from Nuh and his offspring.", "the people of the earth were covered with the flood except for those who were with Nuh in the ship"),
      difficulty: 2,
      questions: [
        { q: "Who was saved from the flood?", a: "Those with Nuh in the ship", wrong: ["Those on mountains", "Those in towers", "No one"], why: "Except for those who were with Nuh in the ship." },
        { q: "What did Ibn Abbas say the water rising beyond its limits means?", a: "It increased greatly", wrong: ["It dried up", "It froze", "It turned sweet"], why: "Ibn Abbas and others said, The water rising beyond its boundary means it increased abundantly." },
        { tf: true, q: "All people today come from those saved with Nuh.", why: "Thus, are humans all from the loins of Nuh and his progeny." }
      ]
    },
    {
      slug: "ships-a-reminder",
      title: "Ships are a reminder",
      line: "Allah kept ships for us so we remember His favor.",
      facts: ["Ships are a blessing", "Remember Allah when riding"],
      quote: q69(12),
      source: ik(12, "Ibn Kathir says Allah kept ships in the earth for us, so we ride the waters of the seas and remember His favor, as in 43:12-13.", "so that you ride upon the currents of the water in the seas"),
      difficulty: 3,
      questions: [
        { q: "Why did Allah keep ships for people?", a: "To ride the seas", wrong: ["To build houses", "To store grain", "To scare animals"], why: "So that you ride upon the currents of the water in the seas." },
        { q: "What should we remember when riding?", a: "The favor of our Lord", wrong: ["Our own strength", "The weather only", "Nothing"], why: "And then may remember the favor of your Lord when you mount thereon. (43:13)" },
        { tf: false, q: "Ships came about by luck, not as a favor from Allah.", why: "Allah reminds humanity of His blessing: We carried you in the ship." }
      ]
    },
    {
      slug: "ears-that-retain",
      title: "Ears that remember",
      line: "The story is for ears that hear, understand and remember.",
      facts: ["Listen and reflect", "Use what you hear"],
      quote: q69(12),
      source: ik(12, "Ibn Abbas said a retaining ear is one that is retentive and hearing; Qatadah said it benefits from what it hears from Allah's Book.", "This means an ear that is retentive and hearing"),
      difficulty: 2,
      questions: [
        { q: "What is a retaining ear, per Ibn Abbas?", a: "Retentive and hearing", wrong: ["Very large", "Always closed", "Hearing music"], why: "Ibn Abbas said, This means an ear that is retentive and hearing." },
        { q: "What did Qatadah say such an ear does?", a: "Benefits from Allah's Book", wrong: ["Forgets quickly", "Hears only jokes", "Ignores advice"], why: "An ear that Allah gives intelligence, so it benefits by what it hears from Allah's Book." },
        { tf: false, q: "Hearing the Quran is enough without thinking about it.", why: "A receptive ear may understand and reflect upon this bounty." }
      ]
    }
  ]
};

/** Ayahs 13 to 18: the Trumpet, the earth and sky changed, and all brought before Allah. */
const HAQQAH_TWO: DeepUnit = {
  key: "haqqah2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-69",
  name: "Al-Haqqah, ayahs 13 to 18",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Haqqah",
  lessons: [
    {
      slug: "one-blowing",
      title: "A single blowing",
      line: "The Trumpet is blown once, and Allah's command is done.",
      facts: ["As-Sur: the Trumpet", "Allah's command is never stopped"],
      quote: q69(13),
      source: ik(13, "Ibn Kathir says it is one blowing because the command of Allah cannot be opposed or prevented, and needs no repeating.", "because the command of Allah cannot be opposed or prevented"),
      difficulty: 2,
      questions: [
        { q: "How many times is the Trumpet blown in 69:13?", a: "With one blowing", wrong: ["Ten times", "Every day", "Never"], why: "Then when the Trumpet will be blown with one blowing." },
        { q: "Why is one blowing enough?", a: "Allah's command cannot be stopped", wrong: ["The Trumpet is small", "People are asleep", "It is very quiet"], why: "Because the command of Allah cannot be opposed or prevented, and it does not need to be repeated." },
        { tf: false, q: "Allah's command must be repeated many times to happen.", why: "The command of Allah cannot be opposed or prevented, and it does not need to be repeated or stressed." }
      ]
    },
    {
      slug: "earth-and-mountains",
      title: "Earth and mountains moved",
      line: "The earth and mountains are lifted and flattened in one blow.",
      facts: ["The earth will change", "Mountains are not forever"],
      quote: q69(14),
      source: ik(14, "Ibn Kathir says the earth and mountains will be stretched out flat, and the earth will change into something other than the earth.", "the earth will change into something else other than the earth"),
      difficulty: 2,
      questions: [
        { q: "What happens to the mountains?", a: "Crushed with a single crushing", wrong: ["They grow taller", "They turn to gold", "Nothing at all"], why: "And the earth and the mountains shall be removed from their places, and crushed with a single crushing." },
        { q: "What will the earth become?", a: "Something other than this earth", wrong: ["A bigger garden", "Exactly the same", "A frozen sea"], why: "The earth will change into something else other than the earth." },
        { tf: true, q: "Even the mountains will not stay in place on that Day.", why: "The earth and the mountains shall be removed from their places." }
      ]
    },
    {
      slug: "the-event-occurs",
      title: "The Event occurs",
      line: "Then the great Event, the Day of Judgement, takes place.",
      facts: ["Al-Waqiah: the Event", "The Day is certain"],
      quote: q69(15),
      source: ik(15, "Ibn Kathir explains that the Event in 69:15 means the Day of Judgement.", "Then on that Day shall the Event occur"),
      difficulty: 1,
      questions: [
        { q: "What is the Event in 69:15?", a: "The Day of Judgement", wrong: ["A big wedding", "A market day", "A sports match"], why: "Then on that Day shall the Event occur, meaning, the Day of Judgement." },
        { q: "When does the Event occur?", a: "After the Trumpet and the crushing", wrong: ["Before the flood", "Every year", "At sunrise daily"], why: "After the blowing and the crushing: Then on that Day shall the Event occur." },
        { tf: false, q: "The Event in 69:15 is something that will never happen.", why: "Then on that Day shall the Event occur." }
      ]
    },
    {
      slug: "sky-torn-apart",
      title: "The sky split open",
      line: "The sky will split open and become weak on that Day.",
      facts: ["The sky will open", "Nothing lasts but Allah"],
      quote: q69(16),
      source: ik(16, "Ibn Kathir says the heaven will be split and frail; Ibn Jurayj linked it to 78:19, the heaven opened like gates.", "And the heaven will be rent asunder, for that Day it will be frail and torn up"),
      difficulty: 2,
      questions: [
        { q: "What happens to the sky in 69:16?", a: "Split and become frail", wrong: ["Turn green", "Grow larger", "Stay the same"], why: "And the heaven will be rent asunder, for that Day it will be frail and torn up." },
        { q: "Which ayah did Ibn Jurayj compare it to?", a: "The heaven opened as gates", wrong: ["By the pen", "Read in the name", "By the dawn"], why: "And the heaven shall be opened, it will become as gates. (78:19)" },
        { tf: true, q: "The strong sky will become weak on that Day.", why: "For that Day it will be frail and torn up." }
      ]
    },
    {
      slug: "angels-on-its-sides",
      title: "Angels on its sides",
      line: "The angels will stand on the edges of the heavens.",
      facts: ["Al-Malak: the angels", "Angels obey Allah"],
      quote: q69(17),
      source: ik(17, "Ibn Kathir says the angels collectively will be standing on the sides of the heavens.", "the angels collectively will be standing on the sides of the heavens"),
      difficulty: 2,
      questions: [
        { q: "Where will the angels stand?", a: "On the sides of the heavens", wrong: ["Under the sea", "Inside caves", "On the moon"], why: "The angels collectively will be standing on the sides of the heavens." },
        { q: "What does Malak refer to?", a: "The angels as a whole", wrong: ["One king", "A star", "A bird"], why: "The word Malak is referring to the species of angels, all of them." },
        { tf: false, q: "Only one angel will be present on that Day.", why: "The angels collectively will be standing on the sides of the heavens." }
      ]
    },
    {
      slug: "eight-carry-the-throne",
      title: "Eight carry the Throne",
      line: "On that Day, eight angels will carry the Throne of Allah.",
      facts: ["Al-Arsh: the Throne", "Angels of great size"],
      quote: q69(17),
      source: ik(17, "Ibn Kathir says on the Day of Judgement eight angels will carry the Throne of your Lord above them.", "Day of Judgement eight angels will carry the Throne"),
      difficulty: 2,
      questions: [
        { q: "How many angels carry the Throne that Day?", a: "Eight", wrong: ["Two", "Four", "Seven"], why: "Eight angels will, that Day, bear the Throne of your Lord above them." },
        { q: "Whose Throne do they carry?", a: "The Throne of Allah", wrong: ["A king's throne", "A golden chair", "A prophet's seat"], why: "And eight angels will, that Day, bear the Throne of your Lord above them." },
        { tf: true, q: "The angels who carry the Throne are very great in size.", why: "Between the lobe of his ear to his shoulder is the distance of seven hundred years of travelling." }
      ]
    },
    {
      slug: "nothing-hidden",
      title: "Nothing will be hidden",
      line: "All are brought before Allah, and no secret stays hidden.",
      facts: ["Allah knows every secret", "Live as if seen"],
      quote: q69(18),
      source: ik(18, "Ibn Kathir says all will be presented to the Knower of secrets, from Whom none of our affairs are hidden.", "He is the Knower of all things apparent, secret and hidden"),
      difficulty: 2,
      questions: [
        { q: "What happens to secrets on that Day?", a: "None will be hidden", wrong: ["All stay hidden", "Some are lost", "They are forgotten"], why: "That Day shall you be brought to Judgement, not a secret of you will be hidden." },
        { q: "Before Whom are people presented?", a: "The Knower of secrets", wrong: ["A judge of the town", "Their friends", "No one"], why: "You will all be presented to the Knower of the secrets and private counsels." },
        { tf: false, q: "A person can hide a deed from Allah on that Day.", why: "He is the One from Whom none of your affairs are hidden." }
      ]
    },
    {
      slug: "be-ready-for-that-day",
      title: "Be ready for that Day",
      line: "Since Allah knows all, we prepare with good deeds now.",
      facts: ["Ask forgiveness today", "Do good in secret too"],
      quote: q69(18),
      source: ik(18, "Ibn Kathir says Allah is the Knower of all things apparent, secret and hidden, so nothing of us is hidden from Him.", "you will all be presented to the Knower of the secrets and private counsels"),
      difficulty: 3,
      questions: [
        { q: "What does Allah know of us?", a: "Things open, secret and hidden", wrong: ["Only what we say", "Only good deeds", "Only big things"], why: "He is the Knower of all things apparent, secret and hidden." },
        { q: "Who will be presented before Allah?", a: "All of us", wrong: ["Only kings", "Only prophets", "Only angels"], why: "You will all be presented to the Knower of the secrets and private counsels." },
        { tf: false, q: "Private talk is unknown to Allah.", why: "You will all be presented to the Knower of the secrets and private counsels." }
      ]
    }
  ]
};

/** Ayahs 19 to 24: the joy of the one given his Record in his right hand. */
const HAQQAH_THREE: DeepUnit = {
  key: "haqqah3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-69",
  name: "Al-Haqqah, ayahs 19 to 24",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Haqqah",
  lessons: [
    {
      slug: "record-in-right-hand",
      title: "The Record in the right hand",
      line: "The one given his Record in his right hand is overjoyed.",
      facts: ["Kitab: the Record of deeds", "Right hand: good news"],
      quote: q69(19),
      source: ik(19, "Ibn Kathir says Allah informs of the happiness of those who receive their Book in the right hand on the Day of Judgement.", "Allah informs of the happiness of those who receive their Book in the right hand"),
      difficulty: 1,
      questions: [
        { q: "In which hand does the happy one get his Record?", a: "The right hand", wrong: ["The left hand", "Behind his back", "No hand"], why: "Then as for him who will be given his Record in his right hand." },
        { q: "How does he feel?", a: "Very happy", wrong: ["Afraid", "Bored", "Angry"], why: "Allah informs of the happiness of those who receive their Book in the right hand." },
        { tf: false, q: "Receiving the Record in the right hand is bad news.", why: "Allah informs of the happiness of those who receive their Book in the right hand." }
      ]
    },
    {
      slug: "come-read-my-record",
      title: "Come, read my Record!",
      line: "He tells everyone: take my Record and read it!",
      facts: ["Joy wants to share", "Good deeds bring delight"],
      quote: q69(19),
      source: ik(19, "Ibn Kathir says he invites everyone to read his Book because he knows it holds good and purely virtuous deeds.", "because he knows that what is in it is good and purely virtuous deeds"),
      difficulty: 2,
      questions: [
        { q: "What does he say to people?", a: "Read my Record!", wrong: ["Hide my Record!", "Burn my Record!", "Forget my Record!"], why: "Out of his extreme pleasure is his saying to everyone that he meets: read my Record!" },
        { q: "Why is he happy to show it?", a: "It is full of good deeds", wrong: ["It is very short", "It is empty", "It is golden"], why: "Because he knows that what is in it is good and purely virtuous deeds." },
        { tf: true, q: "Allah can replace a believer's bad deeds with good ones.", why: "He will be of those whom Allah replaced their bad deeds with good deeds." }
      ]
    },
    {
      slug: "sins-covered",
      title: "Sins covered and forgiven",
      line: "Allah covers the believer's sins and forgives them that Day.",
      facts: ["As-Sitr: Allah's covering", "Hope in His mercy"],
      quote: q69(19),
      source: hadith("bukhari", "2441", "Safwan ibn Muhriz", "Sahih", "Allah brings the believer near and covers him, and he admits his sins. Allah says: I covered them in the world and I forgive them today.", "I did screen your sins in the world and I forgive them for you today"),
      difficulty: 3,
      questions: [
        { q: "What does Allah say to the believer?", a: "I covered and forgive them", wrong: ["I will show everyone", "I never saw them", "I will count them twice"], why: "I did screen your sins in the world and I forgive them for you today." },
        { q: "What is given to him after that?", a: "The book of his good deeds", wrong: ["A heavy chain", "An empty page", "Nothing"], why: "And then he will be given the book of his good deeds." },
        { tf: false, q: "Allah exposes every sin of the believer in public.", why: "Allah will bring a believer near Him and shelter him with His Screen." }
      ]
    },
    {
      slug: "i-was-sure",
      title: "I was sure of this Day",
      line: "He says: I truly believed I would meet my account.",
      facts: ["Yaqin: certainty", "Faith shapes deeds"],
      quote: q69(20),
      source: ik(20, "Ibn Kathir says he means: I used to be certain in the worldly life that this day would definitely come, as in 2:46.", "I used to be certain in the worldly life that this day would definitely come"),
      difficulty: 2,
      questions: [
        { q: "What does he say in 69:20?", a: "I believed I would meet my account", wrong: ["I forgot this Day", "I never knew", "I hoped to escape"], why: "Surely, I did believe that I shall meet my account!" },
        { q: "What was he sure of in the world?", a: "This Day would come", wrong: ["He would live forever", "His wealth would save him", "No one would ask him"], why: "I used to be certain in the worldly life that this day would definitely come." },
        { tf: true, q: "Being sure of the Hereafter helped him do good.", why: "I used to be certain in the worldly life that this day would definitely come." }
      ]
    },
    {
      slug: "a-pleasing-life",
      title: "A pleasing life",
      line: "He will live a life that pleases him fully.",
      facts: ["Radiyah: well-pleasing", "Joy without end"],
      quote: q69(21),
      source: ik(21, "Ibn Kathir says a life well-pleasing means a pleasant life.", "So he shall be in a life, well-pleasing"),
      difficulty: 1,
      questions: [
        { q: "What kind of life will he have?", a: "Well-pleasing", wrong: ["Tiring", "Short", "Lonely"], why: "So he shall be in a life, well-pleasing." },
        { q: "What does well-pleasing mean, per Ibn Kathir?", a: "Pleasant", wrong: ["Hard", "Silent", "Dark"], why: "So he shall be in a life, well-pleasing, meaning, pleasant." },
        { tf: false, q: "The people of Paradise will feel sad and tired.", why: "So he shall be in a life, well-pleasing, meaning, pleasant." }
      ]
    },
    {
      slug: "a-lofty-paradise",
      title: "A lofty Paradise",
      line: "He will be in a high Paradise with joy that lasts forever.",
      facts: ["Jannah Aliyah: lofty garden", "Eternal joy"],
      quote: q69(22),
      source: ik(22, "Ibn Kathir says a lofty Paradise means high palaces, pleasant places and eternal joy.", "pleasant stations and eternal joy"),
      difficulty: 2,
      questions: [
        { q: "Where will he be?", a: "In a lofty Paradise", wrong: ["In a dark valley", "In a small hut", "In a desert"], why: "In a lofty Paradise." },
        { q: "How long does its joy last?", a: "Forever", wrong: ["One day", "A year", "Until noon"], why: "Having elevated castles, pleasant stations and eternal joy." },
        { tf: true, q: "Paradise has high castles.", why: "In a lofty Paradise, meaning, having elevated castles." }
      ]
    },
    {
      slug: "one-hundred-levels",
      title: "One hundred levels",
      line: "Paradise has a hundred levels; ask Allah for Al-Firdaus.",
      facts: ["Al-Firdaus: the highest", "Aim high in dua"],
      quote: q69(22),
      source: hadith("bukhari", "2790", "Abu Hurairah", "Sahih", "The Prophet ﷺ said Paradise has a hundred grades, so when you ask Allah, ask for Al-Firdaus, the best and highest part of Paradise.", "ask for Al-firdaus which is the best and highest part of Paradise"),
      difficulty: 3,
      questions: [
        { q: "How many grades does Paradise have?", a: "One hundred", wrong: ["Seven", "Ten", "One"], why: "Paradise has one-hundred grades." },
        { q: "What should we ask Allah for?", a: "Al-Firdaus", wrong: ["The lowest level", "Only wealth", "Nothing"], why: "So, when you ask Allah, ask for Al-firdaus which is the best and highest part of Paradise." },
        { tf: false, q: "All of Paradise is one single level.", why: "Paradise has one-hundred grades, and the distance between each two is like the distance between the Heaven and the Earth." }
      ]
    },
    {
      slug: "fruits-near-at-hand",
      title: "Fruits close at hand",
      line: "The fruits hang low, easy to reach even while resting.",
      facts: ["Qutuf: bunches of fruit", "Ease with no effort"],
      quote: q69(23),
      source: ik(23, "Al-Bara bin Azib said the fruits are close enough to reach while lying on one's bed.", "This means close enough for one of them"),
      difficulty: 2,
      questions: [
        { q: "How are the fruits of Paradise?", a: "Low and near at hand", wrong: ["High and far", "Hidden away", "Very few"], why: "The fruits in bunches whereof will be low and near at hand." },
        { q: "What did Al-Bara bin Azib say?", a: "They can be reached lying down", wrong: ["They need a ladder", "They grow once a year", "They are sold"], why: "This means close enough for one of them to reach them while he is lying on his bed." },
        { tf: false, q: "People of Paradise must climb to get fruit.", why: "Close enough for one of them to reach them while he is lying on his bed." }
      ]
    },
    {
      slug: "eat-and-drink",
      title: "Eat and drink with joy",
      line: "They are told: eat and drink for the good you sent ahead.",
      facts: ["Deeds sent before", "A warm welcome"],
      quote: q69(24),
      source: ik(24, "Ibn Kathir says this will be said to them as an invitation of blessing, favor and goodness.", "this will be said to them as an invitation to them of blessing, favor and goodness"),
      difficulty: 2,
      questions: [
        { q: "What are they told in 69:24?", a: "Eat and drink at ease", wrong: ["Wait outside", "Work harder", "Go back"], why: "Eat and drink at ease for that which you have sent on before you in days past!" },
        { q: "For what are they rewarded?", a: "Deeds sent on before", wrong: ["Their family name", "Their money", "Their looks"], why: "For that which you have sent on before you in days past." },
        { tf: true, q: "Good deeds in this life are sent ahead for the Hereafter.", why: "Eat and drink at ease for that which you have sent on before you in days past." }
      ]
    },
    {
      slug: "by-allahs-mercy",
      title: "By Allah's mercy",
      line: "No one enters Paradise by deeds alone, only by Allah's mercy.",
      facts: ["Do good steadily", "Rahmah: mercy"],
      quote: q69(24),
      source: hadith("bukhari", "6463", "Abu Hurairah", "Sahih", "The Prophet ﷺ said deeds alone will not save anyone, not even him, unless Allah covers him with mercy. So do good sincerely and moderately.", "unless and until Allah bestows His Mercy on me"),
      difficulty: 3,
      questions: [
        { q: "What saves a person in the end?", a: "Allah's mercy", wrong: ["Deeds alone", "Wealth", "Family"], why: "No, even I will not be saved unless and until Allah bestows His Mercy on me." },
        { q: "How should we do good deeds?", a: "Sincerely and moderately", wrong: ["Only once", "To show off", "Never"], why: "Therefore, do good deeds properly, sincerely and moderately." },
        { tf: false, q: "Since mercy saves us, deeds do not matter.", why: "Therefore, do good deeds properly, sincerely and moderately." }
      ]
    }
  ]
};

/** Ayahs 25 to 37: the regret of the one given his Record in his left hand, told gently. */
const HAQQAH_FOUR: DeepUnit = {
  key: "haqqah4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-69",
  name: "Al-Haqqah, ayahs 25 to 37",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Haqqah",
  lessons: [
    {
      slug: "record-in-left-hand",
      title: "The Record in the left hand",
      line: "Whoever gets his Record in his left hand is full of regret.",
      facts: ["Left hand: bad news", "Regret comes too late"],
      quote: q69(25),
      source: ik(25, "Ibn Kathir says these ayahs tell of the wretched one given his Record in his left hand; at that time he will be very remorseful.", "At this time he will be very remorseful"),
      difficulty: 1,
      questions: [
        { q: "How does the one with the left-hand Record feel?", a: "Full of regret", wrong: ["Proud", "Joyful", "Calm"], why: "At this time he will be very remorseful." },
        { q: "What does he wish?", a: "He had not been given his Record", wrong: ["To read it aloud", "To get a second copy", "To show his friends"], why: "I wish that I had not been given my Record!" },
        { tf: false, q: "He happily shows his Record to everyone.", why: "At this time he will be very remorseful." }
      ]
    },
    {
      slug: "wishing-not-to-know",
      title: "Wishing not to know",
      line: "He wishes he had never known what his account is.",
      facts: ["Hisab: the account", "Change while you can"],
      quote: q69(26),
      source: ik(26, "Ibn Kathir quotes him saying he wishes he had not been given his Record and had never known his account.", "I wish that I had not been given my Record"),
      difficulty: 2,
      questions: [
        { q: "What else does he wish in 69:26?", a: "Never to know his account", wrong: ["To count it again", "To sell it", "To frame it"], why: "And that I had never known how my account is!" },
        { q: "When is the time to fix our deeds?", a: "Now, in this life", wrong: ["After the Record comes", "Never", "Only when old"], why: "He will hope for death even though in the worldly life it was the most hated thing to him." },
        { tf: true, q: "Regret on that Day cannot undo past deeds.", why: "At this time he will be very remorseful." }
      ]
    },
    {
      slug: "wealth-did-not-help",
      title: "Wealth did not help",
      line: "He says: my wealth and power did not save me.",
      facts: ["Wealth stays behind", "Only deeds go with you"],
      quote: q69(28),
      source: ik(28, "Ibn Kathir says he means: my wealth and my honor did not protect me from the punishment of Allah.", "my wealth and my honor did not protect me from the punishment of Allah"),
      difficulty: 2,
      questions: [
        { q: "What did not avail him?", a: "His wealth", wrong: ["His prayer", "His charity", "His good deeds"], why: "My wealth has not availed me." },
        { q: "What else is gone from him?", a: "His power", wrong: ["His hunger", "His sleep", "His shadow"], why: "My power has gone from me!" },
        { tf: false, q: "Money can protect a person on the Day of Judgement.", why: "My wealth and my honor did not protect me from the punishment of Allah." }
      ]
    },
    {
      slug: "no-helper-that-day",
      title: "No helper that Day",
      line: "Alone, he finds no helper and no one to save him.",
      facts: ["Each stands alone", "Allah is the only Helper"],
      quote: q69(29),
      source: ik(29, "Ibn Kathir says he will say: the matter has ended with me alone and I have no helper nor anyone to save me.", "I have no helper nor anyone to save me"),
      difficulty: 2,
      questions: [
        { q: "Who helps him that Day?", a: "No one", wrong: ["His friends", "His tribe", "His servants"], why: "I have no helper nor anyone to save me." },
        { q: "How does he face it?", a: "Alone", wrong: ["With an army", "With his family", "With a lawyer"], why: "Now the matter has ended with me alone." },
        { tf: false, q: "A strong tribe can save someone on that Day.", why: "I have no helper nor anyone to save me." }
      ]
    },
    {
      slug: "did-not-believe",
      title: "He did not believe",
      line: "He did not believe in Allah, the Most Great.",
      facts: ["Allah's right: worship", "Al-Azim: the Most Great"],
      quote: q69(33),
      source: ik(33, "Ibn Kathir says he did not establish the right of Allah upon him, of obedience and worship.", "he did not establish the right of Allah upon him"),
      difficulty: 2,
      questions: [
        { q: "What was his first wrong in 69:33?", a: "Not believing in Allah", wrong: ["Being poor", "Being late", "Being quiet"], why: "Verily, he used not to believe in Allah, the Most Great." },
        { q: "What is Allah's right upon His servants?", a: "To worship Him alone", wrong: ["To build towers", "To be rich", "To travel"], why: "Allah has a right upon the servants that they worship Him alone and not associate anything with Him." },
        { tf: true, q: "Worshipping Allah alone is His right upon us.", why: "Allah has a right upon the servants that they worship Him alone." }
      ]
    },
    {
      slug: "did-not-urge-feeding",
      title: "He did not urge feeding",
      line: "He did not encourage feeding the poor.",
      facts: ["People have rights too", "Feeding the poor matters"],
      quote: q69(34),
      source: ik(34, "Ibn Kathir says the servants of Allah have a right upon each other to good treatment and help in righteousness.", "The servants of Allah also have a right upon each other to good treatment and assistance in righteousness and piety"),
      difficulty: 2,
      questions: [
        { q: "What was his second wrong?", a: "Not urging feeding the poor", wrong: ["Eating too much", "Cooking badly", "Selling bread"], why: "And urged not on the feeding of the poor." },
        { q: "What right do people have on each other?", a: "Good treatment and help", wrong: ["Nothing at all", "Only greetings", "Only money"], why: "The servants of Allah also have a right upon each other to good treatment and assistance in righteousness and piety." },
        { tf: false, q: "Caring for the poor is not part of faith.", why: "He did not establish the right of Allah, and he urged not on the feeding of the poor." }
      ]
    },
    {
      slug: "feed-and-greet",
      title: "Feed and greet",
      line: "A fine part of Islam: feed people and greet everyone.",
      facts: ["Salam to all", "Feed the hungry"],
      quote: q69(34),
      source: hadith("bukhari", "12", "Abdullah ibn Amr", "Sahih", "The Prophet ﷺ said a good part of Islam is to feed people and greet those you know and those you do not.", "greet those whom you know and those whom you do not Know"),
      difficulty: 2,
      questions: [
        { q: "What deeds of Islam did the Prophet ﷺ name?", a: "Feeding and greeting", wrong: ["Shouting and boasting", "Sleeping late", "Saving all money"], why: "To feed the poor and greet those whom you know and those whom you do not know." },
        { q: "Whom should we greet?", a: "Those we know and do not know", wrong: ["Only friends", "Only family", "No one"], why: "Greet those whom you know and those whom you do not Know." },
        { tf: true, q: "Feeding the poor is one of the good deeds of Islam.", why: "The Prophet ﷺ replied, To feed the poor and greet those whom you know and those whom you do not know." }
      ]
    },
    {
      slug: "prayer-and-zakah",
      title: "Prayer and Zakah",
      line: "Prayer gives Allah's right; Zakah gives people their right.",
      facts: ["Salah for Allah", "Zakah for the needy"],
      quote: q69(34),
      source: ik(34, "Ibn Kathir says for this reason Allah commanded the prayer and the payment of Zakah.", "Allah commanded performance of the prayer and the payment of Zakah"),
      difficulty: 3,
      questions: [
        { q: "Which two duties match these two rights?", a: "Prayer and Zakah", wrong: ["Fasting and travel", "Sleep and food", "Trade and games"], why: "For this reason, Allah commanded performance of the prayer and the payment of Zakah." },
        { q: "What did the Prophet ﷺ stress near his death?", a: "The prayer", wrong: ["His wealth", "His house", "His horse"], why: "When the Prophet ﷺ was near death he said, The prayer." },
        { tf: false, q: "Islam is only worship, with no duty to people.", why: "Allah commanded performance of the prayer and the payment of Zakah." }
      ]
    },
    {
      slug: "no-friend-that-day",
      title: "No close friend that Day",
      line: "He has no friend that Day who can save him.",
      facts: ["Hamim: a close friend", "Choose good friends now"],
      quote: q69(35),
      source: ik(35, "Ibn Kathir says no one can save him from the punishment of Allah, nor any close friend or intercessor.", "nor any close friend or intercessor whose request would be honored"),
      difficulty: 2,
      questions: [
        { q: "Who can save him in 69:35?", a: "No friend at all", wrong: ["His best friend", "His neighbor", "His teacher"], why: "So no friend has he, this Day, nor anyone to save him." },
        { q: "Whose request is not honored for him?", a: "Any intercessor", wrong: ["Only kings", "Only strangers", "Only children"], why: "Nor any close friend or intercessor whose request would be honored." },
        { tf: false, q: "A close friend can buy him out that Day.", why: "There is no one today who can save him from the punishment of Allah, nor any close friend." }
      ]
    }
  ]
};

/** Ayahs 38 to 52: the Quran is the true word of Allah, a Reminder, and glorifying our Lord. */
const HAQQAH_FIVE: DeepUnit = {
  key: "haqqah5",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-69",
  name: "Al-Haqqah, ayahs 38 to 52",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Haqqah",
  lessons: [
    {
      slug: "seen-and-unseen",
      title: "What you see and do not see",
      line: "Allah swears by all we see and all we cannot see.",
      facts: ["Signs in creation", "The unseen is real"],
      quote: q69(38),
      source: ik(38, "Ibn Kathir says Allah swears by His creation, in which His signs are seen, and by the hidden things people cannot see.", "He then swears by the hidden things that they cannot see"),
      difficulty: 2,
      questions: [
        { q: "By what does Allah swear in 69:38-39?", a: "What we see and do not see", wrong: ["The sun only", "The pen only", "The fig only"], why: "So, I swear by whatsoever you see, and by whatsoever you see not." },
        { q: "What does creation show, per Ibn Kathir?", a: "Signs of Allah", wrong: ["Nothing", "Only chance", "Only beauty"], why: "Allah swears by His creation, in which some of His signs can be seen in His creatures." },
        { tf: false, q: "Only what we can see is real.", why: "He then swears by the hidden things that they cannot see." }
      ]
    },
    {
      slug: "word-of-an-honored-messenger",
      title: "Word of an honored Messenger",
      line: "The Quran is revelation, brought by an honored Messenger.",
      facts: ["Wahy: revelation", "Rasul: messenger"],
      quote: q69(40),
      source: ik(40, "Ibn Kathir says the oath is that the Quran is His Speech, His inspiration and His revelation to His servant and Messenger.", "His inspiration and His revelation to His servant and Messenger"),
      difficulty: 2,
      questions: [
        { q: "Whose Speech is the Quran?", a: "Allah's", wrong: ["A poet's", "A king's", "A teller's"], why: "This is an oath swearing that the Quran is His Speech, His inspiration and His revelation." },
        { q: "Who is the honored Messenger in 69:40?", a: "Muhammad ﷺ", wrong: ["A poet", "A soothsayer", "A king"], why: "That this is verily the word of an honored Messenger, meaning, Muhammad." },
        { tf: true, q: "The Messenger ﷺ carried the message faithfully.", why: "And the Messenger ﷺ carried out this trust faithfully." }
      ]
    },
    {
      slug: "a-messenger-conveys",
      title: "A messenger conveys",
      line: "A messenger's duty is to pass on the message he is given.",
      facts: ["Tabligh: conveying", "Jibril and Muhammad ﷺ both conveyed"],
      quote: q69(40),
      source: ik(40, "Ibn Kathir says the word messenger carries the meaning of conveying, because the duty of a messenger is to convey from the sender.", "the duty of a messenger is to convey from the sender"),
      difficulty: 3,
      questions: [
        { q: "What is a messenger's duty?", a: "To convey from the sender", wrong: ["To write his own words", "To change the message", "To keep it secret"], why: "The duty of a messenger is to convey from the sender." },
        { q: "In 81:19, who is the honored messenger?", a: "Jibril", wrong: ["Musa", "Isa", "Nuh"], why: "Allah gave this description to the angelic Messenger in Surat At-Takwir, and there it refers to Jibril." },
        { tf: false, q: "A messenger adds his own ideas to Allah's message.", why: "The duty of a messenger is to convey from the sender." }
      ]
    },
    {
      slug: "not-a-poet",
      title: "Not a poet, not a soothsayer",
      line: "The Quran is not poetry and not a fortune-teller's talk.",
      facts: ["Kahin: soothsayer", "Shair: poet"],
      quote: q69(41),
      source: ik(41, "Allah says the Quran is not the word of a poet, nor the word of a soothsayer; little do they believe and remember.", "Nor is it the word of a soothsayer, little is that you remember"),
      difficulty: 2,
      questions: [
        { q: "What is the Quran NOT, per 69:41?", a: "The word of a poet", wrong: ["A Reminder", "The truth", "A revelation"], why: "It is not the word of a poet, little is that you believe." },
        { q: "What else is the Quran NOT, per 69:42?", a: "A soothsayer's word", wrong: ["Allah's Speech", "A guidance", "A healing"], why: "Nor is it the word of a soothsayer, little is that you remember." },
        { tf: false, q: "The Quran was made up by a poet.", why: "It is not the word of a poet, little is that you believe." }
      ]
    },
    {
      slug: "from-the-lord-of-all",
      title: "From the Lord of all",
      line: "The Quran is sent down from the Lord of all that exists.",
      facts: ["Tanzil: sent down", "Rabb al-Alamin"],
      quote: q69(43),
      source: ik(43, "Allah says this is the revelation sent down from the Lord of all that exists.", "This is the revelation sent down from the Lord of all that exists"),
      difficulty: 1,
      questions: [
        { q: "From whom is the Quran sent down?", a: "The Lord of all that exists", wrong: ["The people of Makkah", "Old books", "The angels on their own"], why: "This is the revelation sent down from the Lord of all that exists." },
        { q: "What word does 69:43 use for the Quran?", a: "Revelation sent down", wrong: ["A poem", "A song", "A riddle"], why: "This is the revelation sent down from the Lord of all that exists." },
        { tf: true, q: "The Quran comes from Allah, Lord of all the worlds.", why: "This is the revelation sent down from the Lord of all that exists." }
      ]
    },
    {
      slug: "he-never-forged",
      title: "He never made it up",
      line: "Had he made anything up, Allah would have seized him at once.",
      facts: ["The Prophet ﷺ was truthful", "Allah guards His message"],
      quote: q69(44),
      source: ik(44, "Ibn Kathir says if he had forged anything, Allah would be swift to punish him; and of course, he did not do any of this.", "And of course, Muhammad did not do any of this"),
      difficulty: 3,
      questions: [
        { q: "What would happen if he made up words?", a: "Allah would seize him", wrong: ["Nothing at all", "He would be praised", "People would cheer"], why: "If Muhammad forged something against Us, then We would surely be swift in punishing him." },
        { q: "Did the Prophet ﷺ ever forge anything?", a: "No, never", wrong: ["Yes, once", "Sometimes", "Only small things"], why: "And of course, Muhammad did not do any of this." },
        { tf: false, q: "The Prophet ﷺ added his own words to the Quran.", why: "And of course, Muhammad did not do any of this, as the disbelievers claimed." }
      ]
    },
    {
      slug: "truthful-and-guided",
      title: "Truthful and guided",
      line: "So he is truthful, righteous and guided, supported by Allah.",
      facts: ["Sadiq: truthful", "Miracles as proof"],
      quote: q69(47),
      source: ik(47, "Ibn Kathir says the meaning is that he is truthful, righteous and guided, and Allah helps him with miracles and clear proofs.", "is truthful, righteous and guided because Allah determined what he is to convey from Him"),
      difficulty: 3,
      questions: [
        { q: "Who could stop Allah from seizing a forger?", a: "No one", wrong: ["His tribe", "His friends", "His guards"], why: "And none of you could have prevented it from him." },
        { q: "What does Ibn Kathir say these ayahs prove?", a: "He is truthful and guided", wrong: ["He was a poet", "He was unsure", "He was a ruler"], why: "He is truthful, righteous and guided because Allah determined what he is to convey from Him." },
        { tf: true, q: "Allah helped the Prophet ﷺ with miracles and proofs.", why: "Allah helps him with fantastic miracles and definite proofs." }
      ]
    },
    {
      slug: "reminder-for-the-pious",
      title: "A Reminder for the mindful",
      line: "The Quran is a Reminder for those who have Taqwa.",
      facts: ["Taqwa: being mindful of Allah", "Guidance and healing"],
      quote: q69(48),
      source: ik(48, "Ibn Kathir says the Quran is a Reminder for those who have Taqwa, as in 41:44, a guide and a healing for believers.", "is a Reminder for those who have Taqwa"),
      difficulty: 2,
      questions: [
        { q: "For whom is the Quran a Reminder in 69:48?", a: "Those who have Taqwa", wrong: ["Those who mock", "Only scholars", "Only Arabs"], why: "And verily, this is a Reminder for those who have Taqwa." },
        { q: "What is the Quran for believers, per 41:44?", a: "A guide and a healing", wrong: ["A burden", "A puzzle", "A story only"], why: "Say: It is for those who believe, a guide and a healing. (41:44)" },
        { tf: false, q: "The Quran helps people even if they ignore it.", why: "It is for those who believe, a guide and a healing; for those who disbelieve, it is blindness for them." }
      ]
    },
    {
      slug: "some-will-deny",
      title: "Some will still deny",
      line: "Allah knows some will deny, even after this clear proof.",
      facts: ["Allah knows the hearts", "Denial brings regret"],
      quote: q69(49),
      source: ik(49, "Ibn Kathir says even with this explanation and clarification, there will still be among you those who reject the Quran.", "with this explanation and clarification, there will still be among you those who reject"),
      difficulty: 2,
      questions: [
        { q: "What does Allah know, per 69:49?", a: "Some among you deny", wrong: ["Everyone believes", "No one listens", "All are scholars"], why: "And verily, We know that there are some among you that deny." },
        { q: "What will denial bring the deniers?", a: "Anguish", wrong: ["Joy", "Wealth", "Rest"], why: "And verily this rejection will be anguish for the disbelievers on the Day of Judgement." },
        { tf: false, q: "Clear proof makes every single person believe.", why: "With this explanation and clarification, there will still be among you those who reject." }
      ]
    },
    {
      slug: "absolute-truth",
      title: "The absolute truth",
      line: "The Quran is certain truth with no doubt in it.",
      facts: ["Haqq al-Yaqin: certain truth", "No confusion in it"],
      quote: q69(51),
      source: ik(51, "Ibn Kathir says the Quran is the right and truthful news in which there is no doubt, suspicion or confusion.", "the right and truthful news in which there is no doubt, suspicion or confusion"),
      difficulty: 2,
      questions: [
        { q: "What is the Quran, per 69:51?", a: "An absolute truth with certainty", wrong: ["A guess", "A legend", "A rumor"], why: "And verily, it is an absolute truth with certainty." },
        { q: "What is NOT in it, per Ibn Kathir?", a: "Doubt or confusion", wrong: ["Guidance", "Truth", "Mercy"], why: "The right and truthful news in which there is no doubt, suspicion or confusion." },
        { tf: true, q: "The Quran is true news without any doubt.", why: "The right and truthful news in which there is no doubt, suspicion or confusion." }
      ]
    },
    {
      slug: "three-levels-of-certainty",
      title: "Three levels of certainty",
      line: "Told, seen, then tasted: the Quran gives the top certainty.",
      facts: ["As-Sa'di explains", "Ilm, ayn and haqq al-yaqin"],
      quote: q69(51),
      source: saadi(69, 51, "As-Sa'di says certainty has three levels: knowing from news, then seeing with the eyes, then tasting it yourself; the Quran gives the highest, haqq al-yaqin, to whoever tastes it.", "واليقين مراتبه ثلاثة، كل واحدة أعلى مما قبلها"),
      difficulty: 3,
      questions: [
        { q: "What is the highest level of certainty?", a: "Haqq al-yaqin, tasting it", wrong: ["Hearing a rumour", "Guessing", "Doubting"], why: "Knowledge by tasting and living it, says as-Sa'di." },
        { q: "Ayn al-yaqin is certainty by...?", a: "Seeing with the eyes", wrong: ["Hearing news", "Dreaming", "Guessing"], why: "The second level is what the eyes see." },
        { tf: true, q: "Ilm al-yaqin is knowing from news.", why: "The first level. As-Sa'di on 69:51." }
      ]
    },
    {
      slug: "glorify-your-lord",
      title: "Glorify your Lord",
      line: "So glorify the Name of your Lord, the Most Great.",
      facts: ["Tasbih: glorifying", "Al-Azim: the Most Great"],
      quote: q69(52),
      source: ik(52, "Allah ends Al-Haqqah: so glorify the Name of your Lord, the Most Great, Who sent down this magnificent Quran.", "So glorify the Name of your Lord, the Most Great"),
      difficulty: 1,
      questions: [
        { q: "What does 69:52 tell us to do?", a: "Glorify our Lord", wrong: ["Sleep early", "Travel far", "Count money"], why: "So glorify the Name of your Lord, the Most Great." },
        { q: "Who is the Most Great, per Ibn Kathir?", a: "He Who sent down the Quran", wrong: ["A king", "An angel", "A prophet"], why: "Meaning, He Who sent down this magnificent Quran." },
        { tf: false, q: "Al-Haqqah ends with a story about a garden.", why: "Al-Haqqah ends: So glorify the Name of your Lord, the Most Great." }
      ]
    },
    {
      slug: "glory-in-ruku",
      title: "Glory in ruku",
      line: "In ruku, the Prophet ﷺ said: Glory be to my Mighty Lord.",
      facts: ["Subhana Rabbiyal Azim", "Said while bowing"],
      quote: q69(52),
      source: hadith("muslim", "772", "Hudhayfah", "Sahih", "Hudhayfah prayed with the Prophet ﷺ at night; when he bowed he said: Glory be to my Mighty Lord, Subhana Rabbiyal Azim.", "would then bow and say: Glory be to my Mighty Lord"),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ say in ruku?", a: "Glory be to my Mighty Lord", wrong: ["Allah is One", "Peace be on you", "All praise is His"], why: "He would then bow and say: Glory be to my Mighty Lord." },
        { q: "What did he say in sujud?", a: "Glory be to my Lord most High", wrong: ["Glory be to my Mighty Lord", "Allah listened", "Allahu Akbar only"], why: "He would then prostrate himself and say: Glory be to my Lord most High." },
        { tf: true, q: "We glorify Allah the Most Great in ruku.", why: "He would then bow and say: Glory be to my Mighty Lord." }
      ]
    }
  ]
};

export const HAQQAH_UNITS: readonly DeepUnit[] = [HAQQAH_ONE, HAQQAH_TWO, HAQQAH_THREE, HAQQAH_FOUR, HAQQAH_FIVE];
