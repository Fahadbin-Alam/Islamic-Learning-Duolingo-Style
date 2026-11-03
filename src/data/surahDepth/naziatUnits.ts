import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah An-Nazi'at ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on An-Nazi'at 79:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_79_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on An-Nazi'at 79:${ayah}`,
    url: `https://quran.com/79:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 79:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q79 = (ayah: number) => quranQuote(79, ayah);


/** Ayahs 1 to 14: the oaths by the angels, the two blasts, and the people raised onto the open earth. */
const NAZIAT_ONE: DeepUnit = {
  key: "naziat1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-79",
  name: "An-Nazi'at, ayahs 1-14",
  kind: "skill",
  lessonType: "surah",
  surahName: "An-Nazi'at",
  lessons: [
    {
      slug: "angels-who-take-souls",
      title: "Angels who take souls",
      line: "Allah swears by the angels who take out souls at death.",
      facts: ["An-Nazi'at: those who pull out", "Some souls leave with ease"],
      quote: q79(1),
      source: ik(1, "Ibn Masud, Ibn Abbas and others said these are the angels who remove the souls of the children of Adam; some souls leave with ease.", "These are the angels who remove the souls from the Children of Adam"),
      difficulty: 1,
      questions: [
        { q: "Who are those who pull out, per Ibn Masud?", a: "The angels who remove souls", wrong: ["The winds", "The stars", "The rivers"], why: "These are the angels who remove the souls from the Children of Adam." },
        { q: "What does An-Nashitat in 79:2 describe?", a: "Freeing briskly", wrong: ["Sleeping deeply", "Building homes", "Planting seeds"], why: "By those who free briskly." },
        { tf: true, q: "For some people the angels remove the soul with ease.", why: "There are those people whose souls the angels remove with ease." }
      ]
    },
    {
      slug: "swimmers-and-racers",
      title: "Swimmers and racers",
      line: "The swimmers and the racers are angels obeying Allah.",
      facts: ["As-Sabihat: the swimmers", "As-Sabiqat: the racers"],
      quote: q79(3),
      source: ik(3, "Ibn Masud said the swimmers are the angels, and Ali, Masruq and others said the racers are the angels too.", "They are the angels"),
      difficulty: 2,
      questions: [
        { q: "Who are the swimmers, per Ibn Masud?", a: "The angels", wrong: ["Fish", "Ships", "Clouds"], why: "And by the swimmers, swimming. Ibn Masud said, They are the angels." },
        { q: "What does 79:4 swear by?", a: "The racers, racing", wrong: ["The horses, running", "The birds, flying", "The trees, growing"], why: "And by the racers, racing." },
        { tf: false, q: "Ali said the racers are the horses of war.", why: "It has been narrated from Ali, Masruq, Mujahid, Abu Salih, and Al-Hasan Al-Basri that this means the angels." }
      ]
    },
    {
      slug: "those-who-arrange-affairs",
      title: "Those who arrange affairs",
      line: "Angels carry out Allah's command from the heaven to the earth.",
      facts: ["Al-Mudabbirat: those who arrange", "By the command of their Lord"],
      quote: q79(5),
      source: ik(5, "Ali, Mujahid and others said they are the angels; Al-Hasan added that they control affairs from the heaven to the earth by Allah's command.", "They control the affairs from the heaven to the earth"),
      difficulty: 2,
      questions: [
        { q: "Who arranges affairs, per 79:5?", a: "The angels", wrong: ["The kings", "The stars", "The jinn"], why: "Ali, Mujahid, Ata, Abu Salih, Al-Hasan, Qatadah, Ar-Rabi bin Anas, and As-Suddi all said, They are the angels." },
        { q: "By whose command do they act, per Al-Hasan?", a: "By the command of their Lord", wrong: ["By their own wish", "By the people's vote", "By chance"], why: "Meaning by the command of their Lord, the Mighty and Majestic." },
        { tf: true, q: "Angels control affairs from the heaven to the earth.", why: "They control the affairs from the heaven to the earth." }
      ]
    },
    {
      slug: "the-two-blasts",
      title: "The two blasts",
      line: "The Day begins with two blasts of the Trumpet, one by one.",
      facts: ["Ar-Rajifah: the first blast", "Ar-Radifah: the second blast"],
      quote: q79(6),
      source: ik(6, "Ibn Abbas said Ar-Rajifah and Ar-Radifah are the two blasts of the Trumpet, the first and the second.", "These are the two blasts"),
      difficulty: 2,
      questions: [
        { q: "What are Ar-Rajifah and Ar-Radifah, per Ibn Abbas?", a: "The two blasts of the Trumpet", wrong: ["Two rivers", "Two angels", "Two mountains"], why: "These are the two blasts, the first and the second." },
        { q: "What follows Ar-Rajifah, per 79:7?", a: "Ar-Radifah", wrong: ["Silence forever", "A long night", "A flood"], why: "On the Day the Rajifah shakes, followed by the Radifah." },
        { tf: true, q: "Mujahid linked the first blast to the earth and mountains shaking.", why: "On the Day the earth and the mountains shake." }
      ]
    },
    {
      slug: "trembling-hearts",
      title: "Trembling hearts",
      line: "On that Day hearts tremble and eyes are lowered in fear.",
      facts: ["Wajifah: trembling", "Khashi'ah: humbled"],
      quote: q79(8),
      source: ik(8, "Ibn Abbas said the trembling hearts are afraid, and the eyes will be lowly from the terrors they see.", "the eyes will be lowly and disgraced from what they will witness of terrors"),
      difficulty: 2,
      questions: [
        { q: "What does trembling mean, per Ibn Abbas?", a: "Afraid", wrong: ["Happy", "Sleepy", "Hungry"], why: "Ibn Abbas said, This means afraid." },
        { q: "What happens to their vision, per 79:9?", a: "Humiliated", wrong: ["Sharper", "Unchanged", "Shining"], why: "Their vision humiliated." },
        { tf: false, q: "Eyes will be raised high in pride that Day.", why: "The eyes will be lowly and disgraced from what they will witness of terrors." }
      ]
    },
    {
      slug: "back-from-the-graves",
      title: "Back from the graves?",
      line: "Deniers asked how decayed bones could ever come back to life.",
      facts: ["Al-Hafirah: the grave", "Nakhirah: decayed"],
      quote: q79(10),
      source: ik(10, "Mujahid said Al-Hafirah are the graves; the deniers thought rising after their bones decayed was impossible.", "which are the graves"),
      difficulty: 2,
      questions: [
        { q: "What is Al-Hafirah, per Mujahid?", a: "The graves", wrong: ["The deserts", "The valleys", "The seas"], why: "Al-Hafirah, which are the graves." },
        { q: "What does Nakhirah mean, per Ibn Abbas?", a: "Decayed", wrong: ["Shining", "Strong", "Buried deep"], why: "Ibn Abbas, Mujahid and Qatadah, all said, This means decayed." },
        { tf: true, q: "Ibn Abbas said a decayed bone is one that air enters.", why: "It is the bone when it has decayed and air enters into it." }
      ]
    },
    {
      slug: "a-return-with-loss",
      title: "A return with loss",
      line: "Quraysh mocked: if we come back, we will surely be losers.",
      facts: ["Karrah: a return", "Khasirah: with loss"],
      quote: q79(12),
      source: ik(12, "Muhammad bin Kab said the Quraysh said that if Allah brought them back after death, they would surely be losers.", "If Allah brings us back to life after we die, then surely we will be losers"),
      difficulty: 2,
      questions: [
        { q: "What did they call the return, per 79:12?", a: "A return with loss", wrong: ["A happy return", "A short trip", "A dream"], why: "It would in that case be a return with loss." },
        { q: "Who said so, per Muhammad bin Kab?", a: "The Quraysh", wrong: ["The angels", "The believers", "The Romans"], why: "Muhammad bin Kab said that the Quraysh said, If Allah brings us back to life after we die, then surely we will be losers." },
        { tf: true, q: "Their words show they feared loss, yet still denied.", why: "If Allah brings us back to life after we die, then surely we will be losers." }
      ]
    },
    {
      slug: "a-single-cry",
      title: "Just a single cry",
      line: "Raising all people takes only one call from Allah.",
      facts: ["Zajrah: a single cry", "Israfil blows the Trumpet"],
      quote: q79(13),
      source: ik(13, "Ibn Kathir says the resurrection is one command that will not be repeated, when Israfil blows the Trumpet and all stand looking.", "this is a matter that is from Allah that will not occur twice"),
      difficulty: 2,
      questions: [
        { q: "How many cries will it take, per 79:13?", a: "Only a single one", wrong: ["Seven", "Forty", "One hundred"], why: "But it will be only a single Zajrah." },
        { q: "Which angel blows the Trumpet, per Ibn Kathir?", a: "Israfil", wrong: ["Jibril", "Mikail", "Malik"], why: "When Allah commands the angel Israfil to blow into the Sur." },
        { tf: false, q: "The call to rise will need to be repeated many times.", why: "A matter that is from Allah that will not occur twice." }
      ]
    },
    {
      slug: "on-the-open-earth",
      title: "On the open earth",
      line: "Everyone will suddenly stand on the face of a level earth.",
      facts: ["As-Sahirah: the face of the earth", "A new, level earth"],
      quote: q79(14),
      source: ik(14, "Ibn Abbas said As-Sahirah means the entire earth; Ikrimah and others said the face of the earth, a level place.", "As-Sahirah means the face of the earth"),
      difficulty: 3,
      questions: [
        { q: "What is As-Sahirah, per Ikrimah and Al-Hasan?", a: "The face of the earth", wrong: ["A deep cave", "A high tower", "The ocean floor"], why: "As-Sahirah means the face of the earth." },
        { q: "What kind of place is it, per Mujahid?", a: "A level place", wrong: ["A steep hill", "A thick forest", "A narrow valley"], why: "As-Sahirah is a level place." },
        { tf: true, q: "Ar-Rabi said no sin will ever be done on that earth.", why: "It will be an earth that no sin will be performed on it." }
      ]
    }
  ]
};

/** Ayahs 15 to 26: Musa sent to Fir'awn, the great sign, Fir'awn's denial, and his end as a lesson. */
const NAZIAT_TWO: DeepUnit = {
  key: "naziat2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-79",
  name: "An-Nazi'at, ayahs 15-26",
  kind: "skill",
  lessonType: "surah",
  surahName: "An-Nazi'at",
  lessons: [
    {
      slug: "the-valley-of-tuwa",
      title: "The valley of Tuwa",
      line: "Allah spoke to Musa in the holy, purified valley of Tuwa.",
      facts: ["Tuwa: a valley's name", "Muqaddas: purified"],
      quote: q79(15),
      source: ik(16, "Ibn Kathir says Allah called out speaking to Musa in the purified valley; Tuwa, by what is correct, is the valley's name.", "it is the name of a valley"),
      difficulty: 1,
      questions: [
        { q: "Where did Allah call Musa, per 79:16?", a: "In the holy valley of Tuwa", wrong: ["On a ship", "In a palace", "In a cave at sea"], why: "When his Lord called him in the holy valley of Tuwa." },
        { q: "What does holy mean, per Ibn Kathir?", a: "Purified", wrong: ["Crowded", "Dark", "Far"], why: "In the holy valley, meaning purified." },
        { tf: true, q: "Tuwa is the name of a valley.", why: "According to what is correct, it is the name of a valley." }
      ]
    },
    {
      slug: "go-to-firawn",
      title: "Go to Fir'awn",
      line: "Allah sent Musa to Fir'awn, who had gone beyond all bounds.",
      facts: ["Tagha: transgressed", "Haughty and arrogant"],
      quote: q79(17),
      source: ik(17, "Ibn Kathir says Fir'awn had become haughty, rebellious and arrogant.", "he has become haughty, rebellious and arrogant"),
      difficulty: 1,
      questions: [
        { q: "To whom was Musa sent, per 79:17?", a: "Fir'awn", wrong: ["Qarun", "Haman", "Namrud"], why: "Go to Fir'awn; verily, he has transgressed all bounds." },
        { q: "What had Fir'awn become, per Ibn Kathir?", a: "Haughty, rebellious and arrogant", wrong: ["Kind and humble", "Poor and weak", "Old and sick"], why: "He has become haughty, rebellious and arrogant." },
        { tf: false, q: "Fir'awn was humble before Musa came.", why: "He has become haughty, rebellious and arrogant." }
      ]
    },
    {
      slug: "would-you-purify-yourself",
      title: "Would you purify yourself?",
      line: "Musa invited Fir'awn kindly to a way that would purify him.",
      facts: ["Tazakka: to purify oneself", "Invite with a gentle question"],
      quote: q79(18),
      source: ik(18, "Ibn Kathir says Musa asked Fir'awn whether he would respond to the way that purifies, meaning submit and obey.", "Will you respond to the path and way that will purify you"),
      difficulty: 2,
      questions: [
        { q: "What did Musa ask Fir'awn, per 79:18?", a: "Would you purify yourself?", wrong: ["Will you give me gold?", "Will you leave Egypt?", "Will you fight me?"], why: "And say to him: Would you purify yourself?" },
        { q: "What does purifying mean, per Ibn Kathir?", a: "Submitting and obeying", wrong: ["Washing clothes", "Building a temple", "Paying a tax"], why: "Will you submit and be obedient?" },
        { tf: true, q: "Musa began his call with a gentle question.", why: "Say to him, Will you respond to the path and way that will purify you?" }
      ]
    },
    {
      slug: "guided-to-fear-him",
      title: "Guided to fear Him",
      line: "Knowing Allah softens a hard heart into a humble one.",
      facts: ["Khashyah: fear of Allah", "A soft, humble heart"],
      quote: q79(19),
      source: ik(19, "Ibn Kathir says the guidance would make Fir'awn's heart humble, obedient and submissive after it was hard.", "so that your heart will become humble, obedient, and submissive to Him"),
      difficulty: 2,
      questions: [
        { q: "To what would Musa guide him, per Ibn Kathir?", a: "The worship of his Lord", wrong: ["A hidden treasure", "A new land", "A strong army"], why: "I will guide you to the worship of your Lord." },
        { q: "What would his heart become?", a: "Humble and obedient", wrong: ["Proud and hard", "Empty", "Angry"], why: "So that your heart will become humble, obedient, and submissive to Him after it was hard." },
        { tf: true, q: "Fear of Allah comes after knowing Him.", why: "And that I guide you to your Lord, so you should fear Him." }
      ]
    },
    {
      slug: "the-great-sign",
      title: "The great sign",
      line: "Musa showed Fir'awn a clear proof that he came from Allah.",
      facts: ["Al-Ayah al-Kubra: the great sign", "A clear proof"],
      quote: q79(20),
      source: ik(20, "Ibn Kathir says Musa showed Fir'awn, along with his truthful call, a strong evidence and a clear proof.", "a strong evidence and a clear proof"),
      difficulty: 2,
      questions: [
        { q: "What did Musa show him, per 79:20?", a: "The great sign", wrong: ["A golden crown", "A map", "A letter"], why: "Then he showed him the great sign." },
        { q: "What was the sign, per Ibn Kathir?", a: "A strong evidence and a clear proof", wrong: ["A magic trick", "A dream", "A rumour"], why: "A strong evidence and a clear proof of the truthfulness of what he had come up with from Allah." },
        { tf: false, q: "Musa came with no proof at all.", why: "Musa showed him, along with this truthful call, a strong evidence and a clear proof." }
      ]
    },
    {
      slug: "knowing-is-not-believing",
      title: "Knowing is not believing",
      line: "Fir'awn knew the truth, yet faith needs the heart to submit.",
      facts: ["Recognition: knowing", "Faith: acting on it"],
      quote: q79(21),
      source: ik(21, "Ibn Kathir says Fir'awn knew Musa brought the truth but denied it; recognition is knowledge of the heart, faith is its action.", "recognition is the knowledge of the heart, and faith is its action"),
      difficulty: 3,
      questions: [
        { q: "What did Fir'awn do, per 79:21?", a: "Denied and disobeyed", wrong: ["Believed at once", "Thanked Musa", "Ran away"], why: "But he denied and disobeyed." },
        { q: "What is faith, per Ibn Kathir?", a: "Complying with the truth and submitting", wrong: ["Only knowing facts", "Only saying words", "Being rich"], why: "And it, faith, is to comply with the truth and submit to it." },
        { tf: false, q: "Knowing the truth is enough to be a believer.", why: "His knowledge that what Musa had come to him with was the truth, did not necessitate his being a believer in it." }
      ]
    },
    {
      slug: "gathering-the-magicians",
      title: "Gathering the magicians",
      line: "Fir'awn turned away and gathered magicians against Musa.",
      facts: ["Yas'a: striving", "Falsehood against truth"],
      quote: q79(22),
      source: ik(22, "Ibn Kathir says Fir'awn answered the truth with falsehood by gathering magicians to face Musa's miracles.", "by his gathering the group of magicians"),
      difficulty: 2,
      questions: [
        { q: "How did Fir'awn strive, per Ibn Kathir?", a: "He gathered the magicians", wrong: ["He built a bridge", "He gave charity", "He prayed"], why: "This was by his gathering the group of magicians in order to confront that which Musa had come up with." },
        { q: "What did he do next, per 79:23?", a: "Gathered his people and called out", wrong: ["Fell silent", "Left the city", "Hid in his palace"], why: "So he gathered and called out." },
        { tf: true, q: "Fir'awn met the truth with falsehood.", why: "Meaning, in responding to the truth with falsehood." }
      ]
    },
    {
      slug: "i-am-your-lord",
      title: "A false claim",
      line: "Fir'awn falsely claimed to be the people's highest lord.",
      facts: ["Al-A'la: the most high", "Only Allah is Lord"],
      quote: q79(24),
      source: ik(24, "Ibn Abbas and Mujahid said Fir'awn said this after claiming for forty years that he knew no other god for them.", "for the past forty years"),
      difficulty: 2,
      questions: [
        { q: "What did Fir'awn claim, per 79:24?", a: "I am your lord, most high", wrong: ["I am a prophet", "I am a poor man", "I am a farmer"], why: "Saying: I am your lord, most high." },
        { q: "How long had he made a claim like this, per Ibn Abbas?", a: "Forty years", wrong: ["Four days", "Ten months", "Seventy years"], why: "I have not known of any other god for you all other than me, for the past forty years." },
        { tf: false, q: "Fir'awn was right to call himself lord.", why: "Allah seized him with punishing example for the Hereafter and the first." }
      ]
    },
    {
      slug: "an-example-for-all",
      title: "An example for all",
      line: "Allah seized Fir'awn and made him a warning for tyrants.",
      facts: ["Nakal: an example", "In this life and the next"],
      quote: q79(25),
      source: ik(25, "Ibn Kathir says Allah seized Fir'awn severely and made an example of him for rebellious people like him.", "He made an example and admonition of him"),
      difficulty: 2,
      questions: [
        { q: "What did Allah do to Fir'awn, per 79:25?", a: "Seized him as an example", wrong: ["Made him king forever", "Forgot him", "Rewarded him"], why: "So Allah seized him with punishing example for the Hereafter and the first." },
        { q: "For whom is he an example, per Ibn Kathir?", a: "Rebellious people like him", wrong: ["The angels", "The animals", "Only Musa"], why: "He made an example and admonition of him for those rebellious people in the world who are like him." },
        { tf: true, q: "The example covers this life and the Hereafter.", why: "A punishing example for the Hereafter and the first life." }
      ]
    },
    {
      slug: "the-day-musa-was-saved",
      title: "The day Musa was saved",
      line: "Allah saved Bani Israel on Ashura, so the Prophet ﷺ fasted it.",
      facts: ["Ashura: a day of thanks", "Fasting as thanks to Allah"],
      quote: q79(25),
      source: hadith("bukhari", "2004", "Ibn Abbas", "Sahih", "The Prophet ﷺ found the Jews of Madinah fasting Ashura, the day Allah rescued Bani Israel from their enemy, so he fasted it and told Muslims to fast.", "the day on which Allah rescued Bani Israel from their enemy"),
      difficulty: 3,
      questions: [
        { q: "What happened on Ashura, per the hadith?", a: "Allah rescued Bani Israel", wrong: ["The Quran came down", "Makkah was opened", "Rain fell for a year"], why: "The day on which Allah rescued Bani Israel from their enemy." },
        { q: "What did the Prophet ﷺ do on that day?", a: "Fasted and told Muslims to fast", wrong: ["Held a feast", "Travelled", "Slept all day"], why: "So, the Prophet ﷺ fasted on that day and ordered the Muslims to fast." },
        { tf: true, q: "The Jews of that city also fasted on Ashura.", why: "The Prophet ﷺ came and saw the Jews fasting on the day of Ashura." }
      ]
    },
    {
      slug: "a-lesson-for-whoever-fears",
      title: "A lesson for whoever fears",
      line: "The story of Musa comforts believers and warns those who deny.",
      facts: ["Ibrah: a lesson", "Truth wins in the end"],
      quote: q79(26),
      source: ik(26, "Ibn Kathir says the story told the Prophet ﷺ that whoever opposes him will meet an end like Fir'awn's.", "Thus is the punishment of whoever opposes you"),
      difficulty: 2,
      questions: [
        { q: "Who takes a lesson from it, per 79:26?", a: "Whoever fears", wrong: ["Whoever is rich", "Whoever is strong", "No one"], why: "In this is a lesson for whoever fears." },
        { q: "To whom was the story told, per Ibn Kathir?", a: "Muhammad ﷺ", wrong: ["Fir'awn", "Qarun", "The magicians"], why: "Allah informs His Messenger Muhammad about His Messenger Musa." },
        { tf: false, q: "Fir'awn stopped disbelieving after the miracles.", why: "Fir'awn continued in his disbelief and transgression until Allah seized him." }
      ]
    }
  ]
};

/** Ayahs 27 to 33: the heaven is harder to create than people, and the earth spread out for us. */
const NAZIAT_THREE: DeepUnit = {
  key: "naziat3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-79",
  name: "An-Nazi'at, ayahs 27-33",
  kind: "skill",
  lessonType: "surah",
  surahName: "An-Nazi'at",
  lessons: [
    {
      slug: "harder-than-the-heaven",
      title: "Harder than the heaven?",
      line: "The One who built the heaven can easily raise people again.",
      facts: ["The heaven is greater", "Resurrection is easy for Allah"],
      quote: q79(27),
      source: ik(27, "Ibn Kathir says the heaven is more difficult to create than people, so bringing people back is no hardship for Allah.", "rather the heaven is more difficult to create than you"),
      difficulty: 2,
      questions: [
        { q: "What does 79:27 ask people?", a: "Are you harder to create, or the heaven?", wrong: ["Are you richer than kings?", "Are you older than the sea?", "Are you faster than wind?"], why: "Are you more difficult to create or is the heaven that He constructed?" },
        { q: "Which is harder to create, per Ibn Kathir?", a: "The heaven", wrong: ["A person", "A bird", "A seed"], why: "Rather the heaven is more difficult to create than you." },
        { tf: true, q: "Ayah 40:57 says the heavens and earth are greater than mankind.", why: "The creation of the heavens and the earth is greater than the creation of mankind." }
      ]
    },
    {
      slug: "raised-and-perfected",
      title: "Raised and perfected",
      line: "Allah raised the sky high and adorned it with stars.",
      facts: ["Samk: its height", "Sawwaha: perfected it"],
      quote: q79(28),
      source: ik(28, "Ibn Kathir says Allah made the heaven a lofty structure, vast in space, with equal sides, adorned with stars.", "He made it a lofty structure, vast in its space"),
      difficulty: 1,
      questions: [
        { q: "What did Allah do to the heaven, per 79:28?", a: "Raised its height and perfected it", wrong: ["Lowered it", "Filled it with sand", "Split it in two"], why: "He raised its height, and has perfected it." },
        { q: "What adorns the heaven at night, per Ibn Kathir?", a: "Stars", wrong: ["Lanterns", "Birds", "Clouds of gold"], why: "Adorned with stars at night and in the darkness." },
        { tf: true, q: "The heaven is vast, with equal sides.", why: "A lofty structure, vast in its space, with equal sides." }
      ]
    },
    {
      slug: "night-and-forenoon",
      title: "Night and forenoon",
      line: "Allah made the night dark and the day bright and clear.",
      facts: ["Aghtasha: made dark", "Duha: forenoon light"],
      quote: q79(29),
      source: ik(29, "Ibn Kathir says Allah made its night dark and extremely black, and its day bright, luminous and clear.", "He made its night dark and extremely black, and its day bright"),
      difficulty: 1,
      questions: [
        { q: "What does Aghtasha mean, per Ibn Abbas?", a: "He made it dark", wrong: ["He made it cold", "He made it long", "He made it loud"], why: "He did Aghtasha of its night means that He made it dark." },
        { q: "What did Allah bring out, per 79:29?", a: "Its forenoon", wrong: ["Its rivers", "Its winds", "Its mountains"], why: "Its night He covers and He brings out its forenoon." },
        { tf: false, q: "Allah made the day dark and the night bright.", why: "He made its night dark and extremely black, and its day bright, luminous, shining and clear." }
      ]
    },
    {
      slug: "the-earth-spread-out",
      title: "The earth spread out",
      line: "After the heaven, Allah spread the earth and brought out water.",
      facts: ["Daha: spread out", "Mar'a: pasture"],
      quote: q79(30),
      source: ik(30, "Ibn Kathir says the earth was created before the heaven but spread out after it, bringing out its water and pasture.", "the earth was created before the heaven was created, but it was only spread out after the creation of the heaven"),
      difficulty: 3,
      questions: [
        { q: "What did Allah bring out of the earth, per 79:31?", a: "Its water and its pasture", wrong: ["Its gold and silver", "Its fire", "Its ice"], why: "And brought forth therefrom its water and its pasture." },
        { q: "When was the earth spread out, per Ibn Kathir?", a: "After the heaven was created", wrong: ["Before anything", "Last of all days", "Never"], why: "It was only spread out after the creation of the heaven." },
        { tf: true, q: "Ibn Jarir preferred the view that the earth was spread later.", why: "This is the meaning of what was said by Ibn Abbas and others, and it was the explanation preferred by Ibn Jarir." }
      ]
    },
    {
      slug: "mountains-fixed-firmly",
      title: "Mountains fixed firmly",
      line: "Allah set the mountains firmly so the earth stays settled.",
      facts: ["Arsaha: fixed firmly", "Allah is Most Kind"],
      quote: q79(32),
      source: ik(32, "Ibn Kathir says Allah settled the mountains, made them firm and established them in their places.", "He settled them, made them firm, and established them in their places"),
      difficulty: 1,
      questions: [
        { q: "What did Allah fix firmly, per 79:32?", a: "The mountains", wrong: ["The clouds", "The rivers", "The stars"], why: "And the mountains He has fixed firmly." },
        { q: "Why are the mountains firm, per Ibn Kathir?", a: "So the earth is calmly settled", wrong: ["To block the sun", "To hold the rain", "To make it cold"], why: "He also made its mountains firm so that it would be calmly settled with its dwellers." },
        { tf: true, q: "Ibn Kathir calls Allah Most Kind to His creation.", why: "He is Most Kind to His creation, Most Merciful." }
      ]
    },
    {
      slug: "provision-for-you",
      title: "Provision for you",
      line: "Water, plants and animals are Allah's gifts for this life.",
      facts: ["Mata': provision", "For you and your cattle"],
      quote: q79(33),
      source: ik(33, "Ibn Kathir says springs, rivers, plants, fruits and firm mountains are all a means of enjoyment for people and their cattle.", "All of this is a means of beneficial enjoyment for His creatures"),
      difficulty: 2,
      questions: [
        { q: "For whom is the provision, per 79:33?", a: "You and your cattle", wrong: ["Only kings", "Only birds", "Only angels"], why: "As provision and benefit for you and your cattle." },
        { q: "How long are these gifts given, per Ibn Kathir?", a: "Until the end of this life", wrong: ["Forever in this world", "One year", "Only in summer"], why: "Until the end of time and the expiration of this life." },
        { tf: false, q: "The cattle give people nothing to use.", why: "Providing them of what cattle they need, which they eat and ride upon." }
      ]
    }
  ]
};

/** Ayahs 34 to 46: the Great Catastrophe, two final homes, holding back desire, and the Hour known only to Allah. */
const NAZIAT_FOUR: DeepUnit = {
  key: "naziat4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-79",
  name: "An-Nazi'at, ayahs 34-46",
  kind: "skill",
  lessonType: "surah",
  surahName: "An-Nazi'at",
  lessons: [
    {
      slug: "the-great-catastrophe",
      title: "The Great Catastrophe",
      line: "The Day of Judgement overcomes every other matter.",
      facts: ["At-Tammah al-Kubra: the Great Catastrophe", "Named by Ibn Abbas"],
      quote: q79(34),
      source: ik(34, "Ibn Abbas said the Great Catastrophe is the Day of Judgement, named so because it will overcome every matter.", "It has been called this because it will overcome every matter"),
      difficulty: 2,
      questions: [
        { q: "What is the Great Catastrophe, per Ibn Abbas?", a: "The Day of Judgement", wrong: ["A great flood", "A war", "An eclipse"], why: "This refers to the Day of Judgement. This has been said by Ibn Abbas." },
        { q: "Why is it called that, per Ibn Kathir?", a: "It overcomes every matter", wrong: ["It is very loud", "It is very long", "It is very bright"], why: "It has been called this because it will overcome every matter." },
        { tf: true, q: "Ayah 54:46 calls the Hour more grievous and bitter.", why: "And the Hour will be more grievous and more bitter." }
      ]
    },
    {
      slug: "remembering-every-deed",
      title: "Remembering every deed",
      line: "On that Day each person recalls all he did, good and bad.",
      facts: ["Sa'a: what he strove for", "Do good while you can"],
      quote: q79(35),
      source: ik(35, "Ibn Kathir says the son of Adam will then reflect on all his deeds, both good and evil.", "the Son of Adam will reflect upon all of his deeds, both the good and the evil"),
      difficulty: 2,
      questions: [
        { q: "What will man remember, per 79:35?", a: "What he strove for", wrong: ["His dreams", "His house", "His friends' names"], why: "The Day when man shall remember what he strove for." },
        { q: "Which deeds will he reflect on, per Ibn Kathir?", a: "Both the good and the evil", wrong: ["Only the good", "Only the evil", "None"], why: "The Son of Adam will reflect upon all of his deeds, both the good and the evil." },
        { tf: false, q: "Remembering then will help him change his deeds.", why: "On the Day will man remember, but how will that remembrance avail him?" }
      ]
    },
    {
      slug: "hell-made-plain-to-see",
      title: "Plain to see",
      line: "On that Day the Fire is shown so all can see it.",
      facts: ["Burrizat: made apparent", "Seen with their own eyes"],
      quote: q79(36),
      source: ik(36, "Ibn Kathir says Hell will become apparent to the onlookers, and people will see it with their own eyes.", "so the people will see it with their own eyes"),
      difficulty: 2,
      questions: [
        { q: "What is made apparent, per 79:36?", a: "Hell", wrong: ["A hidden city", "A treasure", "A new sea"], why: "And Hell shall be made apparent for whoever sees." },
        { q: "How will people see it, per Ibn Kathir?", a: "With their own eyes", wrong: ["In a dream", "In a book", "Only by hearing"], why: "So the people will see it with their own eyes." },
        { tf: true, q: "The Fire will not be hidden that Day.", why: "It will become apparent for the onlookers." }
      ]
    },
    {
      slug: "putting-this-world-first",
      title: "Putting this world first",
      line: "Whoever rebels and puts this world before his faith loses most.",
      facts: ["Taghiya: rebelled", "Athara: preferred"],
      quote: q79(38),
      source: ik(38, "Ibn Kathir says this is one who rebels arrogantly and gives this world precedence over his religion and Hereafter; his end is the Fire.", "he gives it precedence over the matters of his religion and his Hereafter"),
      difficulty: 2,
      questions: [
        { q: "What did he prefer, per 79:38?", a: "The life of this world", wrong: ["The Hereafter", "The prayer", "His family"], why: "And preferred the life of this world." },
        { q: "What does transgressed mean, per Ibn Kathir?", a: "Rebels and behaves arrogantly", wrong: ["Travels far", "Works hard", "Sleeps late"], why: "Then for him who transgressed, meaning, who rebels and behaves arrogantly." },
        { tf: true, q: "His final home will be the Fire, per 79:39.", why: "Verily, his abode will be the Hell." }
      ]
    },
    {
      slug: "holding-back-desire",
      title: "Holding back desire",
      line: "Whoever fears Allah and resists desire has Jannah as home.",
      facts: ["Maqam Rabbih: standing before his Lord", "Al-Hawa: desire"],
      quote: q79(40),
      source: ik(40, "Ibn Kathir says this one fears Allah's judgement, keeps his soul from its desires and makes it obey its Master; Paradise is his home.", "he prevents his soul from following its desires, and he compels it to obey its Master"),
      difficulty: 2,
      questions: [
        { q: "What did he fear, per 79:40?", a: "Standing before his Lord", wrong: ["Losing his money", "Being poor", "Growing old"], why: "But as for him who feared standing before his Lord." },
        { q: "Where is his abode, per 79:41?", a: "Paradise", wrong: ["A palace on earth", "The sea", "The desert"], why: "Verily Paradise will be his abode." },
        { tf: true, q: "Holding back from desires is part of fearing Allah.", why: "He prevents his soul from following its desires, and he compels it to obey its Master." }
      ]
    },
    {
      slug: "surrounded-by-hardships",
      title: "Surrounded by hardships",
      line: "Jannah is reached through hard things; desires lead to the Fire.",
      facts: ["Patience leads to Jannah", "Desire leads astray"],
      quote: q79(40),
      source: hadith("bukhari", "6487", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said the Fire is surrounded by desires and passions, while Paradise is surrounded by disliked things.", "while Paradise is surrounded by all kinds of disliked undesirable things"),
      difficulty: 3,
      questions: [
        { q: "What surrounds Paradise, per the hadith?", a: "Disliked, hard things", wrong: ["Desires and passions", "Gold walls", "Nothing"], why: "While Paradise is surrounded by all kinds of disliked undesirable things." },
        { q: "What surrounds the Fire, per the hadith?", a: "Desires and passions", wrong: ["Hard things", "Prayers", "Good deeds"], why: "The Fire is surrounded by all kinds of desires and passions." },
        { tf: false, q: "The path to Jannah is always easy and pleasant.", why: "Paradise is surrounded by all kinds of disliked undesirable things." }
      ]
    },
    {
      slug: "only-allah-knows-the-hour",
      title: "Only Allah knows the Hour",
      line: "No creature knows when the Hour comes; Allah alone knows.",
      facts: ["Mursaha: its appointed time", "Knowledge with Allah"],
      quote: q79(42),
      source: ik(42, "Ibn Kathir says knowledge of the Hour is not with the Prophet ﷺ nor any creature, but with Allah alone.", "Rather the knowledge of it is with Allah"),
      difficulty: 2,
      questions: [
        { q: "What did they ask about, per 79:42?", a: "When the Hour will come", wrong: ["When it will rain", "Who will be king", "Where gold is"], why: "They ask you about the Hour, when will be its appointed time?" },
        { q: "With whom is its knowledge, per 79:44?", a: "With your Lord", wrong: ["With the angels", "With the scholars", "With the stars"], why: "To your Lord it is limited." },
        { tf: false, q: "Some people know the exact day of the Hour.", why: "Its knowledge is not with you, nor with any creature." }
      ]
    },
    {
      slug: "jibril-asks-about-the-hour",
      title: "Jibril asks about the Hour",
      line: "Asked about the Hour, the Prophet ﷺ knew no more than Jibril.",
      facts: ["Hadith of Jibril", "Signs, but no date"],
      quote: q79(44),
      source: hadith("bukhari", "50", "Abu Hurairah", "Sahih", "Jibril asked the Prophet ﷺ about faith, Islam, Ihsan and the Hour; of the Hour he said the one answering knows no more than the one asking.", "The answerer has no better knowledge than the questioner"),
      difficulty: 3,
      questions: [
        { q: "Who asked the Prophet ﷺ about the Hour?", a: "Jibril", wrong: ["Abu Bakr", "A king", "A child"], why: "Then he further asked, When will the Hour be established?" },
        { q: "What was his answer?", a: "The answerer knows no more than the asker", wrong: ["Next year", "In a hundred years", "On a Friday soon"], why: "The answerer has no better knowledge than the questioner." },
        { tf: true, q: "He said he would tell of the Hour's portents.", why: "But I will inform you about its portents." }
      ]
    },
    {
      slug: "only-a-warner",
      title: "Only a warner",
      line: "The Prophet ﷺ was sent to warn, and whoever fears Allah follows.",
      facts: ["Mundhir: a warner", "Fear leads to success"],
      quote: q79(45),
      source: ik(45, "Ibn Kathir says Allah sent the Prophet ﷺ to warn mankind; whoever fears Allah follows him and succeeds.", "I sent you to warn mankind and caution them"),
      difficulty: 2,
      questions: [
        { q: "What is the Prophet ﷺ, per 79:45?", a: "A warner for those who fear it", wrong: ["A judge of the Hour", "A king", "A poet"], why: "You are only a warner for those who fear it." },
        { q: "Who will follow him, per Ibn Kathir?", a: "Whoever fears Allah", wrong: ["Only the rich", "Only his tribe", "No one"], why: "So whoever fears Allah, fears standing before Him, and His threat, then he will follow you." },
        { tf: true, q: "Following him leads to success.", why: "Then he will follow you, and thus be successful and victorious." }
      ]
    },
    {
      slug: "an-afternoon-or-a-morning",
      title: "An afternoon or a morning",
      line: "On that Day this whole life will feel like a single afternoon.",
      facts: ["Ashiyyah: afternoon", "Duha: morning"],
      quote: q79(46),
      source: ik(46, "Ibn Kathir says when they rise from their graves, the worldly life will seem only an afternoon of one day.", "they will feel that the period of the worldy life was short"),
      difficulty: 2,
      questions: [
        { q: "How long will life seem, per 79:46?", a: "An afternoon or its morning", wrong: ["A thousand years", "A whole year", "A month"], why: "As if they had not tarried except an afternoon or its morning." },
        { q: "What is Ashiyyah, per Ibn Abbas?", a: "From noon until sunset", wrong: ["From sunset to dawn", "Midnight", "Dawn only"], why: "As for Ashiyyah, it is the time between noon until the setting of the sun." },
        { tf: true, q: "Duha is the time between sunrise and noon.", why: "Or its Duha morning, what is between sunrise and midday." }
      ]
    },
    {
      slug: "a-stranger-or-a-traveller",
      title: "A stranger or a traveller",
      line: "Life is short, so live like a traveller passing through.",
      facts: ["Use health before sickness", "Use life before death"],
      quote: q79(46),
      source: hadith("bukhari", "6416", "Ibn Umar", "Sahih", "The Prophet ﷺ held Ibn Umar's shoulder and told him to be in this world like a stranger or a traveller.", "Be in this world as if you were a stranger or a traveler"),
      difficulty: 3,
      questions: [
        { q: "How should we live in this world, per the hadith?", a: "Like a stranger or a traveller", wrong: ["Like a king", "Like it lasts forever", "Like a guard"], why: "Be in this world as if you were a stranger or a traveler." },
        { q: "What did Ibn Umar say to take from health?", a: "For your sickness", wrong: ["For your wealth", "For your fame", "For your games"], why: "And take from your health for your sickness, and from your life for your death." },
        { tf: false, q: "Ibn Umar taught to expect a long life ahead.", why: "If you survive till the evening, do not expect to be alive in the morning." }
      ]
    }
  ]
};

export const NAZIAT_UNITS: readonly DeepUnit[] = [NAZIAT_ONE, NAZIAT_TWO, NAZIAT_THREE, NAZIAT_FOUR];
