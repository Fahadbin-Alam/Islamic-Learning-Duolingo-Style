import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Al-Qiyamah ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Qiyamah 75:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_75_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Qiyamah 75:${ayah}`,
    url: `https://quran.com/75:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 75:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q75 = (ayah: number) => quranQuote(75, ayah);


/** Ayahs 1 to 15: the oath, the self-blaming soul, the bones and fingertips, the Day's signs, and no escape. */
const QIYAMAH_ONE: DeepUnit = {
  key: "qiyamah1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-75",
  name: "Al-Qiyamah, ayahs 1-15",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Qiyamah",
  lessons: [
    {
      slug: "by-the-day-of-resurrection",
      title: "By the Day of Resurrection",
      line: "Allah swears by the Day of Resurrection: it will surely come.",
      facts: ["Al-Qiyamah: the Resurrection", "La before an oath adds force"],
      quote: q75(1),
      source: ik(1, "Ibn Kathir says the oath affirms the final return and answers those who claim bodies will not be raised.", "what is being sworn about is the affirmation of the final abode"),
      difficulty: 1,
      questions: [
        { q: "By what does Allah swear in 75:1?", a: "The Day of Resurrection", wrong: ["The sun", "The fig", "The pen"], why: "Nay! I swear by the Day of Resurrection." },
        { q: "What does the oath affirm, per Ibn Kathir?", a: "The final return", wrong: ["A good harvest", "A long life", "A new city"], why: "What is being sworn about is the affirmation of the final abode." },
        { tf: true, q: "The oath answers those who say bodies will not be raised.", why: "The refutation against the claim of the ignorant that the resurrection of bodies will not occur." }
      ]
    },
    {
      slug: "the-self-blaming-soul",
      title: "The self-blaming soul",
      line: "A believer checks himself and blames himself for faults.",
      facts: ["An-Nafs Al-Lawwamah", "Asking: what did I intend?"],
      quote: q75(2),
      source: ik(2, "Al-Hasan Al-Basri said every believer blames himself and asks what he intended, while the sinner goes on without blaming himself.", "we think that every believer blames himself"),
      difficulty: 2,
      questions: [
        { q: "What does An-Nafs Al-Lawwamah do?", a: "Blames itself", wrong: ["Sleeps all day", "Praises itself", "Forgets everything"], why: "Verily, by Allah, we think that every believer blames himself." },
        { q: "Who does not blame himself, per Al-Hasan?", a: "The sinner", wrong: ["The believer", "The scholar", "The teacher"], why: "However, the sinner proceeds ahead and he does not blame himself." },
        { tf: false, q: "A believer never asks what he meant by his words.", why: "He says, What did I intend by my statement? What did I intend by my eating?" },
        { q: "What does the soul regret, per Mujahid?", a: "Good deeds it missed", wrong: ["Money it spent", "Games it lost", "Food it ate"], why: "He is sorry for what he missed of good deeds and he blames himself for it." }
      ]
    },
    {
      slug: "gathering-his-bones",
      title: "Gathering his bones",
      line: "Some think the bones cannot be gathered again; Allah can.",
      facts: ["Resurrection of the body", "Nothing is hard for Allah"],
      quote: q75(3),
      source: ik(3, "Ibn Kathir says man wrongly thinks Allah cannot return his bones and gather them from their places.", "We are not able to return his bones and gather them from their various places"),
      difficulty: 1,
      questions: [
        { q: "What does man wrongly think, per 75:3?", a: "His bones will not be gathered", wrong: ["He will live forever", "He will be rich", "He will fly"], why: "Does man think that We shall not assemble his bones?" },
        { q: "From where will the bones be gathered?", a: "From their various places", wrong: ["From one box", "From the sea only", "From the sky"], why: "Return his bones and gather them from their various places." },
        { tf: false, q: "Gathering scattered bones is too hard for Allah.", why: "Surely, We will gather them and We are quite able to put together his fingertips." }
      ]
    },
    {
      slug: "even-the-fingertips",
      title: "Even the fingertips",
      line: "Allah can rebuild even the tips of his fingers perfectly.",
      facts: ["Banan: fingertips", "Allah's power is complete"],
      quote: q75(4),
      source: ik(4, "Ibn Kathir says Allah will surely gather the bones and is able to put together even the fingertips.", "Surely, We will gather them and We are quite able to put together his fingertips"),
      difficulty: 2,
      questions: [
        { q: "What can Allah put together, per 75:4?", a: "The tips of his fingers", wrong: ["The stars only", "The mountains", "His clothes"], why: "Yes, We are able to put together in perfect order the tips of his fingers." },
        { q: "What does Banan mean?", a: "Fingertips", wrong: ["Toes", "Hair", "Teeth"], why: "We could make his Banan, which are the tips of his fingers, all equal." },
        { tf: true, q: "Allah could raise man with more than he had before.", why: "If We wished We could surely resurrect him with more than what he originally had." }
      ]
    },
    {
      slug: "following-his-whims",
      title: "Following his whims",
      line: "He rushes after his whims and mocks the Day.",
      facts: ["Hawa: desires", "A question meant to deny"],
      quote: q75(5),
      source: ik(5, "Mujahid said man wants to go ahead following his whims; Ibn Kathir says his question about the Day only denies it.", "he wants to proceed ahead following his own whims"),
      difficulty: 2,
      questions: [
        { q: "What does man want, per Mujahid?", a: "To follow his whims", wrong: ["To pray more", "To give charity", "To learn"], why: "He wants to proceed ahead following his own whims." },
        { q: "What does he ask in 75:6?", a: "When the Day will be", wrong: ["Where water is", "Who his tribe is", "What to eat"], why: "He asks: When will be this Day of Resurrection?" },
        { tf: false, q: "He asked about the Day so he could get ready for it.", why: "His question is only a question of denying its occurrence, and rejecting its existence." }
      ]
    },
    {
      slug: "not-lack-of-proof",
      title: "Not lack of proof",
      line: "He denies the Day to keep sinning, not for lack of proof.",
      facts: ["As-Sa'di explains", "Fujur: sinning on purpose"],
      quote: q75(5),
      source: saadi(75, 5, "As-Sa'di says the denier does not reject Allah's power because the proofs are weak, but because he wants to deny what lies ahead of him and keep doing wrong.", "وإنما وقع ذلك منه أن قصده وإرادته أن يكذب"),
      difficulty: 3,
      questions: [
        { q: "Why does the denier reject the Day, per as-Sa'di?", a: "He wants to keep sinning", wrong: ["The proofs are weak", "No one told him", "He is too young"], why: "Not for lack of proof, but because he wants to deny, says as-Sa'di." },
        { q: "Are the proofs of the Day weak?", a: "No, they are clear", wrong: ["Yes", "There are none", "Only one"], why: "His denial is not from weak proofs." },
        { tf: true, q: "Sometimes people deny the truth because it asks them to change.", why: "As-Sa'di on 75:5." }
      ]
    },
    {
      slug: "when-the-sight-is-dazzled",
      title: "When the sight is dazzled",
      line: "On that Day eyes are dazzled and the moon loses its light.",
      facts: ["Khasafa: the moon darkens", "Sun and moon joined"],
      quote: q75(8),
      source: ik(8, "Ibn Kathir says eyes will be dazzled by that Day, the moon loses its light, and the sun and moon are rolled up.", "meaning, its light will go away"),
      difficulty: 2,
      questions: [
        { q: "What happens to the moon, per 75:8?", a: "It is eclipsed", wrong: ["It grows bigger", "It turns green", "It splits in four"], why: "And the moon will be eclipsed, meaning, its light will go away." },
        { q: "What will happen to the sun and moon, per Mujahid?", a: "They will be rolled up", wrong: ["They will shine more", "They will swap places", "They will stay the same"], why: "And the sun and moon will be joined together. Mujahid said, They will be rolled up." },
        { tf: true, q: "Eyes will be dazzled by the great events of that Day.", why: "The intent is that the eyes will be dazzled, humbled, diminished." }
      ]
    },
    {
      slug: "no-place-to-flee",
      title: "No place to flee",
      line: "Man will look for escape, but there is no refuge.",
      facts: ["Wazar: a refuge", "Only Allah can save"],
      quote: q75(10),
      source: ik(11, "Ibn Kathir says man will want to flee, but there will be no place to hide or seek shelter.", "be no place for you to seek shelter"),
      difficulty: 1,
      questions: [
        { q: "What will man say, per 75:10?", a: "Where is the refuge to flee?", wrong: ["Where is my house?", "Where is the market?", "Where is my horse?"], why: "On that Day man will say: Where is the refuge to flee?" },
        { q: "What does no refuge mean, per Ibn Kathir?", a: "No place to seek shelter", wrong: ["No food left", "No more rain", "No road signs"], why: "There is no refuge, meaning, there will be no place for you to seek shelter." },
        { tf: false, q: "Some people will find a hiding place from that Day.", why: "There will be no place for you to hide." }
      ]
    },
    {
      slug: "the-final-destination",
      title: "The final destination",
      line: "Every journey ends with the return to Allah.",
      facts: ["Al-Mustaqarr: the place of rest", "All return to Allah"],
      quote: q75(12),
      source: ik(12, "Ibn Kathir says unto your Lord will be the place of rest means the place of return and the final destination.", "meaning, the place of return and the final destination"),
      difficulty: 1,
      questions: [
        { q: "To whom is the place of rest, per 75:12?", a: "To your Lord", wrong: ["To the kings", "To the angels", "To the tribe"], why: "Unto your Lord will be the place of rest that Day." },
        { q: "What does place of rest mean, per Ibn Kathir?", a: "The final destination", wrong: ["A bed", "A garden walk", "A long nap"], why: "Meaning, the place of return and the final destination." },
        { tf: true, q: "Everyone returns to Allah in the end.", why: "Unto your Lord will be the place of rest that Day." }
      ]
    },
    {
      slug: "told-of-every-deed",
      title: "Told of every deed",
      line: "Man is told every deed, small and large, first and last.",
      facts: ["Sent forward and left behind", "No deed is lost"],
      quote: q75(13),
      source: ik(13, "Ibn Kathir says man will be told of all his deeds: old and recent, first and last, small and large.", "he will be informed of all of his deeds"),
      difficulty: 2,
      questions: [
        { q: "What will man be told of, per 75:13?", a: "What he sent forward and left behind", wrong: ["His height", "His family tree", "His age"], why: "Man will be informed of what he sent forward, and what he left behind." },
        { tf: false, q: "Only the big deeds will be shown on that Day.", why: "The first of them and the last of them, the small of them and the large of them." },
        { q: "Which ayah says Allah treats no one unjustly?", a: "18:49", wrong: ["2:255", "112:1", "1:1"], why: "And they will find all that they did, placed before them, and your Lord treats no one with injustice. (18:49)" }
      ]
    },
    {
      slug: "a-witness-against-himself",
      title: "A witness against himself",
      line: "Man knows what he did; even his own limbs will speak.",
      facts: ["Basirah: clear knowledge", "The limbs bear witness"],
      quote: q75(14),
      source: ik(14, "Ibn Kathir says man will be a witness against himself; Ibn Abbas said his hearing, sight, hands and legs.", "he will be a witness against himself"),
      difficulty: 2,
      questions: [
        { q: "Who witnesses against man, per 75:14?", a: "Himself", wrong: ["His neighbor", "His friend", "No one"], why: "Nay! Man will be well informed about himself." },
        { q: "What will witness, per Ibn Abbas?", a: "His hearing, sight, hands and legs", wrong: ["His clothes", "His house", "His camel"], why: "His hearing, his sight, his two hands, his two legs and his limbs." },
        { tf: true, q: "Man will know full well what he did, even if he denies it.", why: "Knowing full well what he did, even though he will try to make excuses and deny it." }
      ]
    },
    {
      slug: "see-your-own-faults",
      title: "See your own faults",
      line: "Some see others' small sins but miss their own.",
      facts: ["Check yourself first", "Muhasabah: self-accounting"],
      quote: q75(14),
      source: ik(14, "Qatadah said some people see the faults and sins of others yet are heedless of their own sins.", "he is heedless of his own sins"),
      difficulty: 2,
      questions: [
        { q: "What did Qatadah say such a person sees?", a: "Other people's faults", wrong: ["His own faults", "The stars", "Nothing"], why: "Someone who sees the shortcomings of the people and their sins, yet he is heedless of his own sins." },
        { q: "What is he heedless of?", a: "His own sins", wrong: ["The weather", "His food", "His friends"], why: "Yet he is heedless of his own sins." },
        { tf: false, q: "Looking at others' faults is better than checking our own.", why: "Nay! Man will be well informed about himself." }
      ]
    },
    {
      slug: "excuses-will-not-help",
      title: "Excuses will not help",
      line: "On that Day excuses are not accepted.",
      facts: ["Ma'adhir: excuses", "Honesty now, not later"],
      quote: q75(15),
      source: ik(15, "Qatadah said even though he will try to make false excuses on that Day, they will not be accepted from him.", "they will not be accepted from him"),
      difficulty: 1,
      questions: [
        { q: "What will man put forth, per 75:15?", a: "His excuses", wrong: ["His gold", "His horses", "His poems"], why: "Though he may put forth his excuses." },
        { q: "What happens to the excuses, per Qatadah?", a: "They are not accepted", wrong: ["They are rewarded", "They are written in gold", "They are cheered"], why: "Even though he will try to make false excuses on that Day, they will not be accepted from him." },
        { tf: true, q: "Excuses will bring no profit to wrongdoers that Day.", why: "The Day when their excuses will be of no profit to wrongdoers. (40:52)" }
      ]
    }
  ]
};

/** Ayahs 16 to 25: how the Quran was received, love of this world, and the faces that look at their Lord. */
const QIYAMAH_TWO: DeepUnit = {
  key: "qiyamah2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-75",
  name: "Al-Qiyamah, ayahs 16-25",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Qiyamah",
  lessons: [
    {
      slug: "do-not-rush-the-tongue",
      title: "Do not rush your tongue",
      line: "The Prophet ﷺ moved his lips fast to keep the revelation.",
      facts: ["Wahy: revelation", "Allah would keep it safe"],
      quote: q75(16),
      source: hadith("bukhari", "4929", "Ibn Abbas", "Sahih", "Ibn Abbas said the Prophet ﷺ moved his tongue and lips as revelation came, which was hard for him, so Allah revealed move not your tongue.", "moved his tongue and lips, and that state used to be very hard for him"),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ do as revelation came?", a: "Moved his tongue and lips", wrong: ["Wrote on a tablet", "Closed his eyes and slept", "Walked away"], why: "He moved his tongue and lips, and that state used to be very hard for him." },
        { q: "Why did he move his lips, per Sufyan?", a: "To memorize it", wrong: ["To sing it", "To argue", "To eat"], why: "Sufyan demonstrated and added, In order to memorize it." },
        { tf: true, q: "Allah told him not to hurry his tongue with the Quran.", why: "Move not your tongue concerning the Quran to make haste therewith." }
      ]
    },
    {
      slug: "allah-will-collect-it",
      title: "Allah will collect it",
      line: "Allah promised to gather the Quran in his chest.",
      facts: ["Jam': collecting", "Hifz: memorizing"],
      quote: q75(17),
      source: hadith("bukhari", "4928", "Ibn Abbas", "Sahih", "Ibn Abbas explained it is for Us to collect it means We will collect it in your chest, and its recitation means We will make you recite it.", "We will make you recite it"),
      difficulty: 2,
      questions: [
        { q: "Where would Allah collect the Quran?", a: "In his chest", wrong: ["In a box", "On a mountain", "In a cave"], why: "It is for Us to collect it means, We will collect it in your chest." },
        { q: "What were the first two phases, per Ibn Kathir?", a: "Gathering it, then reciting it", wrong: ["Writing, then selling", "Hiding, then showing", "Singing, then dancing"], why: "So the first phase was gathering it in his chest, the second phase was recitation." },
        { tf: false, q: "The Prophet ﷺ had to memorize the Quran with no help from Allah.", why: "Allah would make sure to collect it in his chest." }
      ]
    },
    {
      slug: "listen-then-recite",
      title: "Listen, then recite",
      line: "First listen to the angel, then recite as he taught.",
      facts: ["Istima': listening", "Good manners with the Quran"],
      quote: q75(18),
      source: ik(18, "Ibn Kathir says follow its recitation means listen to it, then recite it as the angel taught.", "listen to it then recite it as he taught you to recite it"),
      difficulty: 1,
      questions: [
        { q: "What should he do while the angel recited?", a: "Listen", wrong: ["Recite along fast", "Leave", "Write a poem"], why: "Listen to it then recite it as he taught you to recite it." },
        { q: "What did he do after Jibril left?", a: "Recited it as taught", wrong: ["Forgot it", "Changed it", "Kept silent forever"], why: "When Jibril had left he would recite it just as Allah had promised him." },
        { tf: true, q: "Whenever Jibril came, the Prophet ﷺ would stay silent.", why: "So whenever Jibril would come to him he would be silent." }
      ]
    },
    {
      slug: "allah-will-explain-it",
      title: "Allah will explain it",
      line: "Allah also promised to make its meaning clear.",
      facts: ["Bayan: explanation", "The Sunnah explains the Quran"],
      quote: q75(19),
      source: ik(19, "Ibn Kathir says after memorizing and reciting it, Allah would explain it and inspire him with its meaning.", "We will explain it to you, clarify it and inspire you with its meaning"),
      difficulty: 2,
      questions: [
        { q: "What is the third phase, per Ibn Kathir?", a: "Its explanation", wrong: ["Its sale", "Its hiding", "Its forgetting"], why: "The third phase was its explanation and clarification of its meaning." },
        { q: "Who promised to make the Quran clear?", a: "Allah", wrong: ["The poets", "The kings", "The traders"], why: "Then it is for Us to make it clear." },
        { tf: true, q: "Allah gave the Prophet ﷺ the meaning of what He revealed.", why: "We will explain it to you, clarify it and inspire you with its meaning." }
      ]
    },
    {
      slug: "wait-for-the-teacher",
      title: "Wait for the teacher",
      line: "A learner should not cut in before the teacher finishes.",
      facts: ["As-Sa'di explains", "Adab of learning"],
      quote: q75(19),
      source: saadi(75, 19, "As-Sa'di says this teaches a manner of seeking knowledge: the student should not rush ahead of the teacher, but wait until he finishes and then ask about what is unclear.", "وفي هذه الآية أدب لأخذ العلم، أن لا يبادر المتعلم المعلم"),
      difficulty: 2,
      questions: [
        { q: "What learning manner does Al-Qiyamah 75:19 teach?", a: "Wait until the teacher finishes", wrong: ["Interrupt quickly", "Never ask", "Leave early"], why: "Do not rush the teacher before he finishes, says as-Sa'di." },
        { q: "When should a student ask what is unclear?", a: "After the teacher finishes", wrong: ["In the middle", "Never", "Before he starts"], why: "Once he finishes, ask about what was hard." },
        { tf: true, q: "After this, the Prophet ﷺ listened to Jibril, then recited.", why: "As-Sa'di on 75:19." }
      ]
    },
    {
      slug: "loving-this-world",
      title: "Loving this world",
      line: "Love of this world made them forget the Hereafter.",
      facts: ["Al-Ajilah: the quick life", "Al-Akhirah: the lasting life"],
      quote: q75(20),
      source: ik(20, "Ibn Kathir says what made them reject the Day was that their only concern was this worldly life.", "their only concern is the present worldly life"),
      difficulty: 2,
      questions: [
        { q: "What do they love, per 75:20?", a: "The present life of this world", wrong: ["The Hereafter", "The prayer", "The Quran"], why: "But no! Rather you love the present life of this world." },
        { q: "What do they neglect, per 75:21?", a: "The Hereafter", wrong: ["Their trade", "Their food", "Their sleep"], why: "And neglect the Hereafter." },
        { tf: false, q: "Love of this world helped them believe in the Day.", why: "The only thing that has caused them to reject the Day of Judgement is that their only concern is the present worldly life." }
      ]
    },
    {
      slug: "a-stranger-or-a-traveler",
      title: "A stranger or a traveler",
      line: "Live in this world like a traveler passing through.",
      facts: ["Ghurbah: being a stranger", "Take from health for sickness"],
      quote: q75(21),
      source: hadith("bukhari", "6416", "Ibn Umar", "Sahih", "The Prophet ﷺ took hold of Ibn Umar's shoulder and said be in this world as if you were a stranger or a traveler.", "Be in this world as if you were a stranger or a traveler"),
      difficulty: 2,
      questions: [
        { q: "How should we live in this world, per the hadith?", a: "Like a stranger or traveler", wrong: ["Like a king", "Like it lasts forever", "Like a sleeper"], why: "Be in this world as if you were a stranger or a traveler." },
        { q: "What should we take from our health, per Ibn Umar?", a: "For our sickness", wrong: ["For our games", "For our pride", "For our sleep"], why: "Take from your health for your sickness, and from your life for your death." },
        { tf: true, q: "The Prophet ﷺ held Ibn Umar's shoulder as he taught him.", why: "Allah's Messenger took hold of my shoulder and said, Be in this world as if you were a stranger." }
      ]
    },
    {
      slug: "radiant-faces",
      title: "Radiant faces",
      line: "Believers' faces will shine with joy on that Day.",
      facts: ["Nadirah: radiant", "Joy that never ends"],
      quote: q75(22),
      source: ik(22, "Ibn Kathir says Nadirah comes from Nadarah: splendid, radiant, glowing and delighted with goodness.", "which means splendid, radiant, glowing, delighted with goodness"),
      difficulty: 1,
      questions: [
        { q: "How will some faces be, per 75:22?", a: "Nadirah, radiant", wrong: ["Sad", "Hidden", "Asleep"], why: "Some faces that Day shall be Nadirah." },
        { q: "What does Nadarah mean?", a: "Splendid and glowing", wrong: ["Tired and dull", "Cold and wet", "Small and thin"], why: "Nadarah, which means splendid, radiant, glowing, delighted with goodness." },
        { tf: true, q: "Radiant faces are full of delight in goodness.", why: "Splendid, radiant, glowing, delighted with goodness." }
      ]
    },
    {
      slug: "looking-at-their-lord",
      title: "Looking at their Lord",
      line: "Believers will see their Lord, as clearly as the full moon.",
      facts: ["Ru'yah: seeing Allah", "Guard Fajr and Asr"],
      quote: q75(23),
      source: hadith("bukhari", "554", "Jarir ibn Abdullah", "Sahih", "The Prophet ﷺ looked at the full moon and said you will see your Lord as you see this moon, so do not miss the prayers before sunrise and before sunset.", "Certainly you will see your Lord as you see this moon"),
      difficulty: 2,
      questions: [
        { q: "What was the Prophet ﷺ looking at in the hadith?", a: "The full moon", wrong: ["The sea", "A mountain", "The Ka'bah"], why: "He looked at the moon, full-moon, and said, Certainly you will see your Lord as you see this moon." },
        { q: "Which two prayers did he urge us not to miss?", a: "Fajr and Asr", wrong: ["Dhuhr and Isha", "Maghrib and Isha", "Eid and Jumuah"], why: "A prayer before the sunrise, Fajr, and a prayer before sunset, Asr, you must do so." },
        { tf: true, q: "Scholars of the Salaf agreed that believers will see Allah.", why: "This issue is something that the Companions, the Successors and the Salaf of this nation have agreed upon." }
      ]
    },
    {
      slug: "the-extra-reward",
      title: "The extra reward",
      line: "In Jannah, seeing Allah is the dearest gift of all.",
      facts: ["Ziyadah: the extra", "Ayah 10:26"],
      quote: q75(23),
      source: hadith("muslim", "181", "Suhayb", "Sahih", "When the people of Paradise enter it, Allah asks if they want anything more; then the veil is lifted, and nothing is dearer to them than seeing their Lord.", "Do you wish Me to give you anything more"),
      difficulty: 3,
      questions: [
        { q: "What will Allah ask the people of Paradise?", a: "Do you wish anything more?", wrong: ["Are you tired?", "Are you hungry?", "Who are you?"], why: "Do you wish Me to give you anything more?" },
        { q: "What is dearest to them, per the hadith?", a: "The sight of their Lord", wrong: ["Gold houses", "Rivers of milk", "Fine clothes"], why: "Of things given to them nothing would be dearer to them than the sight of their Lord." },
        { q: "Which ayah did the Prophet ﷺ then recite?", a: "10:26", wrong: ["1:5", "2:255", "112:1"], why: "For those who have done good is the best and extra, Ziyadah. (10:26)" }
      ]
    },
    {
      slug: "gloomy-faces",
      title: "Gloomy faces",
      line: "Faces of those who turned away will be gloomy that Day.",
      facts: ["Basirah: gloomy", "Do good to shine"],
      quote: q75(24),
      source: ik(24, "Ibn Kathir says these are the faces of the sinners; Qatadah said Basirah means gloomy.", "These are the faces of the sinners that will be Basirah"),
      difficulty: 2,
      questions: [
        { q: "What does Basirah mean, per Qatadah?", a: "Gloomy", wrong: ["Shining", "Laughing", "Sleepy"], why: "Qatadah said, This means gloomy." },
        { q: "Whose faces are Basirah, per Ibn Kathir?", a: "The sinners", wrong: ["The believers", "The angels", "The children"], why: "These are the faces of the sinners that will be Basirah on the Day of Judgement." },
        { tf: false, q: "Every face will look the same on that Day.", why: "On the Day when some faces will become white and some faces will become black. (3:106)" }
      ]
    }
  ]
};

/** Ayahs 26 to 40: the moment of death, the one who turned away, man is not left without purpose, and new life. */
const QIYAMAH_THREE: DeepUnit = {
  key: "qiyamah3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-75",
  name: "Al-Qiyamah, ayahs 26-40",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Qiyamah",
  lessons: [
    {
      slug: "who-can-cure-him",
      title: "Who can cure him?",
      line: "At the time of death, people ask who can cure him.",
      facts: ["Taraqi: the collarbones", "Ask Allah for a firm heart"],
      quote: q75(27),
      source: ik(26, "Ibn Kathir says Allah tells of the time of death; Ibn Abbas said people ask who can recite healing prayers to cure him.", "Allah informs of the condition at the time of death"),
      difficulty: 2,
      questions: [
        { q: "Where does the soul reach, per 75:26?", a: "The collarbones", wrong: ["The feet", "The hands", "The knees"], why: "Nay, when it reaches to the collarbones." },
        { q: "What do people ask, per 75:27?", a: "Who can cure him?", wrong: ["Who is rich?", "Who will travel?", "Who will cook?"], why: "And it will be said: Who can cure him?" },
        { tf: true, q: "Ibn Kathir asks Allah to keep us firm at that time.", why: "May Allah make us firm at that time with the Firm Statement." }
      ]
    },
    {
      slug: "the-parting",
      title: "The parting",
      line: "He knows the parting has come, and the Hereafter begins.",
      facts: ["Firaq: parting", "One stage meets the next"],
      quote: q75(28),
      source: ik(29, "Ibn Abbas said that moment is the last day of this world and the first day of the Hereafter.", "This is the last day of the days of this world and the first day of the days of the Hereafter"),
      difficulty: 2,
      questions: [
        { q: "What will he think, per 75:28?", a: "That it was the parting", wrong: ["That it was a dream", "That it was a feast", "That it was a trip"], why: "And he will think that it was the parting." },
        { q: "What meets at that moment, per Ibn Abbas?", a: "This world's last day and the Hereafter's first", wrong: ["Two rivers", "Two armies", "Two seasons"], why: "This is the last day of the days of this world and the first day of the days of the Hereafter." },
        { tf: true, q: "Allah's mercy can ease that moment for whom He wills.", why: "So there will be hardships that will meet more hardships, except for he whom Allah has mercy upon." }
      ]
    },
    {
      slug: "loving-to-meet-allah",
      title: "Loving to meet Allah",
      line: "A believer near death hears good news and loves to meet Allah.",
      facts: ["Liqa' Allah: meeting Allah", "The drive is to your Lord"],
      quote: q75(30),
      source: hadith("bukhari", "6507", "Ubadah ibn as-Samit", "Sahih", "The Prophet ﷺ said whoever loves to meet Allah, Allah loves to meet him; a believer near death is given good news of Allah's pleasure.", "he receives the good news of … pleasure with him and His blessings upon him"),
      difficulty: 3,
      questions: [
        { q: "To whom is the drive that Day, per 75:30?", a: "To your Lord", wrong: ["To the market", "To the sea", "To the city"], why: "The drive will be on that Day to your Lord." },
        { q: "What does a believer near death receive?", a: "Good news of Allah's pleasure", wrong: ["A letter", "A gift of gold", "A long list"], why: "He receives the good news of Allah's pleasure with him and His blessings upon him." },
        { tf: true, q: "Whoever loves to meet Allah, Allah loves to meet him.", why: "Whoever loves to meet Allah, Allah too loves to meet him." },
        { q: "What did Aishah say they dislike?", a: "Death", wrong: ["Rain", "Fasting", "Travel"], why: "Aishah, or some of the wives of the Prophet ﷺ, said, But we dislike death." }
      ]
    },
    {
      slug: "neither-believed-nor-prayed",
      title: "Neither believed nor prayed",
      line: "The denier did not believe, did not pray, and turned away.",
      facts: ["Iman in the heart", "Salah in action"],
      quote: q75(31),
      source: ik(31, "Ibn Kathir says the denier rejected the truth in his heart and turned away from acting on it.", "he used to turn away from acting according to its way"),
      difficulty: 2,
      questions: [
        { q: "What two things did he not do, per 75:31?", a: "Believe and pray", wrong: ["Eat and drink", "Buy and sell", "Run and jump"], why: "So, he neither believed nor prayed!" },
        { q: "What did he do instead, per 75:32?", a: "Denied and turned away", wrong: ["Thanked and obeyed", "Listened and learned", "Gave and shared"], why: "But on the contrary, he denied and turned away!" },
        { tf: false, q: "He denied only with his tongue but acted on the truth.", why: "He used to deny the truth in his heart, and he used to turn away from acting according to its way." }
      ]
    },
    {
      slug: "walking-in-pride",
      title: "Walking in pride",
      line: "He strutted home proudly, so Allah warned him again and again.",
      facts: ["Yatamatta: strutting", "Pride is dangerous"],
      quote: q75(34),
      source: ik(34, "Ibn Kathir says the repeated woe is a clear warning to those who disbelieve and strut about; Ibn Abbas said the Prophet ﷺ said it to Abu Jahl.", "This is a definite warning and threat from Allah to those who disbelieve in Him and strut about when walking"),
      difficulty: 2,
      questions: [
        { q: "How did he walk to his family, per 75:33?", a: "In conceit, admiring himself", wrong: ["Humbly and quietly", "Slowly and tired", "Happily giving gifts"], why: "Then he walked in conceit to his family admiring himself!" },
        { q: "To whom did the Prophet ﷺ first say woe to you?", a: "Abu Jahl", wrong: ["Abu Bakr", "Abu Talib", "Abu Hurairah"], why: "The Messenger of Allah said this to Abu Jahl, then Allah revealed this Ayah." },
        { tf: true, q: "Qatadah called the ayahs a threat followed by a threat.", why: "It is a threat followed by a threat, just as you hear it." }
      ]
    },
    {
      slug: "not-left-without-purpose",
      title: "Not left without purpose",
      line: "Man has commands now and will return to Allah later.",
      facts: ["Suda: neglected", "Commands now, judgement later"],
      quote: q75(36),
      source: ik(36, "Ibn Kathir says the ayah means both: man is given commands in this life and will be raised again.", "Apparently the Ayah includes both meanings"),
      difficulty: 3,
      questions: [
        { q: "What does left neglected mean, per As-Suddi?", a: "Not resurrected", wrong: ["Not fed", "Not named", "Not taught to read"], why: "As-Suddi said, Meaning not resurrected." },
        { q: "What did Mujahid and Ash-Shafi'i say it means?", a: "Not commanded or forbidden", wrong: ["Not allowed to travel", "Not given a home", "Not given friends"], why: "Meaning, he will not be commanded and prohibited." },
        { tf: true, q: "Ibn Kathir says the ayah holds both meanings.", why: "Apparently the Ayah includes both meanings." }
      ]
    },
    {
      slug: "from-a-small-drop",
      title: "From a small drop",
      line: "Allah made man from a small drop, then shaped him perfectly.",
      facts: ["Nutfah: a small drop", "Male and female"],
      quote: q75(38),
      source: ik(38, "Ibn Kathir says man became a clot, then a lump, then was formed and the soul was blown into him, a perfect creation.", "then he was formed and the soul was blown into him"),
      difficulty: 2,
      questions: [
        { q: "What came after the Nutfah, per 75:38?", a: "An Alaqah, then shaping", wrong: ["A tree", "A stone", "A star"], why: "Then he became an Alaqah; then shaped and fashioned in due proportion." },
        { q: "What two kinds did Allah make, per 75:39?", a: "Male and female", wrong: ["Old and new", "Tall and short", "Rich and poor"], why: "And made of him two sexes, male and female." },
        { tf: true, q: "Man is formed by the permission and decree of Allah.", why: "As either a male or a female by the permission and decree of Allah." }
      ]
    },
    {
      slug: "able-to-give-life",
      title: "Able to give life",
      line: "The One who made us can surely raise the dead.",
      facts: ["First creation proves the second", "Ayah 30:27"],
      quote: q75(40),
      source: ik(40, "Ibn Kathir says the One who made this perfect creation from a weak drop can surely repeat it.", "able to repeat that as He did originally"),
      difficulty: 2,
      questions: [
        { q: "What does 75:40 ask?", a: "Is He not able to give life to the dead?", wrong: ["Is the sea deep?", "Is the night long?", "Is the sun hot?"], why: "Is it not so then, that He would be able to give life to the dead?" },
        { q: "Which ayah says repeating creation is easier for Him?", a: "30:27", wrong: ["2:2", "36:1", "55:1"], why: "And He it is Who originates the creation, then He will repeat it; this is easier for Him. (30:27)" },
        { tf: false, q: "Making man the first time was easier than raising him again.", why: "Then He will repeat it; this is easier for Him." }
      ]
    },
    {
      slug: "answering-the-ayah",
      title: "Answering the ayah",
      line: "At ayahs of Allah's glory, the Prophet ﷺ glorified Him.",
      facts: ["Tasbih: SubhanAllah", "Recite with the heart"],
      quote: q75(40),
      source: hadith("muslim", "772", "Hudhayfah", "Sahih", "Hudhayfah prayed with the Prophet ﷺ at night: at ayahs of Allah's glory he glorified Him, at ayahs of asking he asked, and at ayahs of protection he sought protection.", "when he recited the verses which referred to the Glory of Allah, he glorified"),
      difficulty: 3,
      questions: [
        { q: "What did he do at ayahs of Allah's glory?", a: "Glorified Allah", wrong: ["Stopped praying", "Sat down", "Kept silent"], why: "When he recited the verses which referred to the Glory of Allah, he glorified." },
        { q: "What did he do at ayahs about asking Allah?", a: "He asked Allah", wrong: ["He bowed at once", "He left", "He slept"], why: "When he recited the verses which tell how the Lord is to be begged, he would then beg from Him." },
        { tf: true, q: "At ayahs of protection, he sought Allah's protection.", why: "When he recited the verses dealing with protection from the Lord, he sought His protection." }
      ]
    }
  ]
};

export const QIYAMAH_UNITS: readonly DeepUnit[] = [QIYAMAH_ONE, QIYAMAH_TWO, QIYAMAH_THREE];
