import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah At-Tur ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on At-Tur 52:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_52_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on At-Tur 52:${ayah}`,
    url: `https://quran.com/52:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 52:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q52 = (ayah: number) => quranQuote(52, ayah);

/** Ayahs 1 to 16: Allah's oaths by the Mount, the Book, the Visited House, the sky and the sea, and the Day that will surely come. */
const TUR_ONE: DeepUnit = {
  key: "tur1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-52",
  name: "At-Tur, ayahs 1 to 16",
  kind: "skill",
  lessonType: "surah",
  surahName: "At-Tur",
  lessons: [
    {
      slug: "by-the-mount",
      title: "By the Mount",
      line: "Allah swears by At-Tur, a mountain covered with trees.",
      facts: ["Tur: a mount with trees", "Where Allah spoke to Musa"],
      quote: q52(1),
      source: ik(1, "Ibn Kathir says At-Tur is a mount with trees, like the mount where Allah spoke to Musa.", "At-Tur is the mount that has trees"),
      difficulty: 1,
      questions: [
        { q: "What is a Tur, per Ibn Kathir?", a: "A mount that has trees", wrong: ["A dry desert", "A deep valley", "A river bank"], why: "At-Tur is the mount that has trees, similar to the mount where Allah spoke to Musa." },
        { q: "What is a mount without trees called?", a: "Jabal", wrong: ["Tur", "Wadi", "Bahr"], why: "A mount that does not have trees is called Jabal, not Tur." },
        { tf: true, q: "Allah swears by His creation to show His great ability.", why: "Allah swears by His creation, a testimony to His great ability, that His torment will surely befall His enemies." }
      ]
    },
    {
      slug: "at-tur-in-maghrib",
      title: "At-Tur in Maghrib",
      line: "The Prophet ﷺ recited Surah At-Tur in the Maghrib prayer.",
      facts: ["Jubayr ibn Mutim heard it", "A beautiful recitation"],
      quote: q52(1),
      source: hadith("bukhari", "765", "Jubayr ibn Mutim", "Sahih", "Jubayr ibn Mutim said he heard the Messenger of Allah ﷺ reciting At-Tur in the Maghrib prayer.", "in the Maghrib prayer"),
      difficulty: 1,
      questions: [
        { q: "In which prayer did he ﷺ recite At-Tur, per Bukhari 765?", a: "Maghrib", wrong: ["Fajr", "Dhuhr", "Asr"], why: "I heard the Prophet ﷺ reciting Surat At-Tur while praying Maghrib." },
        { q: "Who heard him ﷺ recite At-Tur?", a: "Jubayr ibn Mutim", wrong: ["Anas", "Abu Bakr", "Bilal"], why: "Malik narrated that Jubayr bin Mutim said, I heard the Prophet ﷺ reciting Surat At-Tur while praying Maghrib." },
        { tf: true, q: "Jubayr never heard a more beautiful recitation, per Ibn Kathir.", why: "Surely, I have never heard a more beautiful voice or recitation than his recitation." }
      ]
    },
    {
      slug: "the-inscribed-book",
      title: "The inscribed Book",
      line: "Allah swears by a Book written down with care.",
      facts: ["The Preserved Tablet", "Or the revealed Books"],
      quote: q52(2),
      source: ik(2, "Ibn Kathir gives two views: the Book inscribed is the Preserved Tablet, or the revealed Books that people recite.", "it is said that it means Al-Lawh Al-Mahfuz"),
      difficulty: 2,
      questions: [
        { q: "What is the Book inscribed, in one view?", a: "The Preserved Tablet", wrong: ["A poem", "A shopping list", "A letter of Quraysh"], why: "And by the Book inscribed, it is said that it means Al-Lawh Al-Mahfuz, the Preserved Table." },
        { q: "What is the second view of the Book inscribed?", a: "The revealed Books people recite", wrong: ["Books of poets", "Books of history", "Books of kings"], why: "The divinely revealed inscribed Books that people recite." },
        { q: "What does Al-Lawh Al-Mahfuz mean?", a: "The Preserved Tablet", wrong: ["The Visited House", "The high roof", "The filled sea"], why: "Al-Lawh Al-Mahfuz, the Preserved Table." }
      ]
    },
    {
      slug: "parchment-unrolled",
      title: "Parchment unrolled",
      line: "The Book is written on parchment spread open.",
      facts: ["Raqq: thin parchment", "Spread out to be read"],
      quote: q52(3),
      source: ik(3, "Ibn Kathir links the parchment unrolled to the revealed Books that people recite.", "In parchment unrolled"),
      difficulty: 2,
      questions: [
        { q: "On what is the Book written, in 52:3?", a: "Parchment unrolled", wrong: ["Stone tablets", "Palm leaves", "Clay pots"], why: "In parchment unrolled." },
        { q: "Which books does Ibn Kathir link to the parchment?", a: "Revealed Books people recite", wrong: ["Books of magic", "Books of poets", "Tax records"], why: "The divinely revealed inscribed Books that people recite, and this is why Allah said, In parchment unrolled." },
        { tf: true, q: "Unrolled means spread open, ready to read.", why: "In parchment unrolled." }
      ]
    },
    {
      slug: "the-visited-house",
      title: "The Visited House",
      line: "Al-Bayt Al-Mamur is a house of worship in the seventh heaven.",
      facts: ["The Kabah of the seventh heaven", "Angels worship Allah inside"],
      quote: q52(4),
      source: ik(4, "Ibn Kathir says angels worship Allah in Al-Bayt Al-Mamur and go around it as people go around the Kabah.", "The angels worship Allah in Al-Bayt Al"),
      difficulty: 2,
      questions: [
        { q: "In which heaven is Al-Bayt Al-Mamur?", a: "The seventh heaven", wrong: ["The first heaven", "The third heaven", "On earth"], why: "Al-Bayt Al-Mamur is the Kabah of those who reside in the seventh heaven." },
        { q: "Who worships Allah in Al-Bayt Al-Mamur?", a: "The angels", wrong: ["The jinn", "The birds", "The prophets only"], why: "The angels worship Allah in Al-Bayt Al-Mamur and perform Tawaf around it." },
        { q: "Which house on earth is it parallel to?", a: "The Kabah", wrong: ["Masjid Al-Aqsa", "Masjid an-Nabawi", "A palace"], why: "Al-Bayt Al-Mamur is parallel to the Kabah." }
      ]
    },
    {
      slug: "seventy-thousand-angels",
      title: "Seventy thousand angels",
      line: "Each day 70,000 angels pray there and never come back.",
      facts: ["Seen on the Night Journey", "A fresh group every day"],
      quote: q52(4),
      source: hadith("bukhari", "3207", "Malik ibn Sa'sa'ah", "Sahih", "On the Night Journey the Prophet ﷺ was shown Al-Bayt Al-Mamur, where 70,000 angels pray daily and, once they leave, never return to it.", "angels perform prayers daily and when they leave they never return to it"),
      difficulty: 3,
      questions: [
        { q: "How many angels pray there daily, per Bukhari 3207?", a: "70,000", wrong: ["700", "7,000", "70"], why: "This is Al Bait-ul-Mamur where 70,000 angels perform prayers daily." },
        { q: "Do the same angels come back the next day?", a: "No, they never return", wrong: ["Yes, every day", "Once a week", "Once a year"], why: "When they leave they never return to it." },
        { q: "Who leaned against it, per Ibn Kathir?", a: "Ibrahim", wrong: ["Musa", "Isa", "Adam"], why: "The Prophet ﷺ saw Ibrahim Al-Khalil, who was reclining with his back on Al-Bayt Al-Mamur." }
      ]
    },
    {
      slug: "the-roof-raised-high",
      title: "The roof raised high",
      line: "Allah swears by the roof raised high: the sky.",
      facts: ["Ali said: the heaven", "A roof, safe and guarded"],
      quote: q52(5),
      source: ik(5, "Ali ibn Abi Talib said the roof raised high means the heaven, and he recited 21:32.", "Meaning the heaven"),
      difficulty: 1,
      questions: [
        { q: "What is the roof raised high, per Ali?", a: "The heaven", wrong: ["A palace", "A mountain", "A tent"], why: "And by the roof raised high, Meaning the heaven." },
        { q: "Which ayah did Ali recite with it?", a: "21:32, the sky a guarded roof", wrong: ["1:1", "2:255", "112:1"], why: "And We have made the heaven a roof, safe and well-guarded. 21:32." },
        { tf: true, q: "Ibn Jarir agreed with this meaning.", why: "Similar was said by Mujahid, Qatadah, As-Suddi, Ibn Jurayj, Ibn Zayd and preferred by Ibn Jarir." }
      ]
    },
    {
      slug: "the-filled-sea",
      title: "The filled sea",
      line: "Allah swears by the sea that is Masjur.",
      facts: ["Kindled on the Last Day", "Or the filled sea"],
      quote: q52(6),
      source: ik(6, "Ibn Kathir says most scholars take it as the oceans, which will be kindled on the Day of Resurrection; Qatadah said Masjur means filled.", "Masjur is the"),
      difficulty: 2,
      questions: [
        { q: "What sea is meant, per the majority?", a: "The oceans of the earth", wrong: ["A sea in the sky", "A lake in Makkah", "A river"], why: "The majority say it refers to the oceans of the earth." },
        { q: "What did Qatadah say Masjur means?", a: "Filled", wrong: ["Frozen", "Dried up", "Salty"], why: "Qatadah said, Masjur is the filled sea." },
        { tf: true, q: "One view: the seas will be kindled on the Last Day.", why: "Masjur, means, the sea will be kindled with fire on the Day of Resurrection." }
      ]
    },
    {
      slug: "the-torment-will-come",
      title: "The torment will come",
      line: "All these oaths say one thing: Allah's punishment will come.",
      facts: ["The answer to the oaths", "For the disbelievers"],
      quote: q52(7),
      source: ik(7, "Ibn Kathir says this ayah is what the oaths are for: His torment will surely strike the disbelievers.", "contains the subject of the vow"),
      difficulty: 2,
      questions: [
        { q: "What do the oaths confirm, in 52:7?", a: "The torment will come", wrong: ["Rain will fall", "A king will come", "Trade will grow"], why: "Verily, the torment of your Lord will surely come to pass." },
        { q: "Whom will the torment strike, per Ibn Kathir?", a: "The disbelievers", wrong: ["The believers", "The angels", "The animals"], why: "Indicating that His torment will surely strike the disbelievers." },
        { tf: true, q: "52:7 contains what the oaths were sworn for.", why: "Verily, the torment of your Lord will surely come to pass, contains the subject of the vow." }
      ]
    },
    {
      slug: "none-can-avert-it",
      title: "None can avert it",
      line: "When Allah decides, no one can stop His punishment.",
      facts: ["Umar heard it at night", "He fell ill for a month"],
      quote: q52(8),
      source: ik(8, "Ibn Kathir says none can stop it, and tells how Umar heard 52:7-8 at night and fell ill for a month.", "none can prevent it or stop it from striking them"),
      difficulty: 2,
      questions: [
        { q: "Who can avert it, in 52:8?", a: "No one", wrong: ["The kings", "The idols", "The wealthy"], why: "There is none that can avert it." },
        { q: "What happened to Umar after hearing it?", a: "He fell ill for a month", wrong: ["He laughed", "He moved city", "He forgot it"], why: "He then went back to his house and fell ill for a month." },
        { q: "What did Umar say on hearing it?", a: "This is a true vow", wrong: ["Recite it again", "I am safe", "Who wrote this"], why: "Umar said, By the Lord of the Kabah, this is a true vow." }
      ]
    },
    {
      slug: "the-sky-will-shake",
      title: "The sky will shake",
      line: "On that Day, the sky will shake and spin violently.",
      facts: ["Mawr: shaking and spinning", "Ibn Jarir chose it"],
      quote: q52(9),
      source: ik(9, "Ibn Abbas and Qatadah said Mawr means shaking violently; Mujahid said spinning violently.", "Shaking violently"),
      difficulty: 2,
      questions: [
        { q: "What does Mawr mean, per Ibn Abbas?", a: "Shaking violently", wrong: ["Shining brightly", "Raining gently", "Growing larger"], why: "Ibn Abbas and Qatadah said, Shaking violently." },
        { q: "What did Mujahid say Mawr means?", a: "Spin violently", wrong: ["Stand still", "Grow dark", "Become cold"], why: "Mujahid said, Spin violently." },
        { tf: true, q: "Ibn Jarir chose spinning and shaking for Mawr.", why: "This was preferred by Ibn Jarir, because of the meaning of the word, Mawra, which denotes meanings of spinning and shaking." }
      ]
    },
    {
      slug: "the-mountains-will-move",
      title: "The mountains will move",
      line: "The mountains will move away and turn to dust.",
      facts: ["Blown by the wind", "Nothing stays firm"],
      quote: q52(10),
      source: ik(10, "Ibn Kathir says the mountains will fade away and become dust blown by the wind.", "will fade away and become scattered particles of dust blown away by the wind"),
      difficulty: 1,
      questions: [
        { q: "What happens to the mountains, in 52:10?", a: "They move away", wrong: ["They grow taller", "They turn to gold", "They stay firm"], why: "And Tasir the mountains Sayr." },
        { q: "What do they become, per Ibn Kathir?", a: "Dust blown by the wind", wrong: ["Rivers", "Trees", "Ice"], why: "Will fade away and become scattered particles of dust blown away by the wind." },
        { tf: false, q: "The mountains stay in place on that Day.", why: "No. Will fade away and become scattered particles of dust blown away by the wind." }
      ]
    },
    {
      slug: "woe-to-the-deniers",
      title: "Woe to the deniers",
      line: "Woe on that Day to those who denied the truth.",
      facts: ["Woe from Allah's punishment", "They chose to deny"],
      quote: q52(11),
      source: ik(11, "Ibn Kathir says woe will be theirs that Day from Allah's punishment.", "woe to them that Day as a result of Allah"),
      difficulty: 1,
      questions: [
        { q: "Who faces woe, in 52:11?", a: "Those who denied", wrong: ["Those who prayed", "The angels", "The orphans"], why: "Then woe that Day to those who denied." },
        { q: "Where does their woe come from, per Ibn Kathir?", a: "Allah's punishment", wrong: ["Hunger", "Their enemies", "Bad weather"], why: "Woe to them that Day as a result of Allah's torment, punishment and affliction." },
        { tf: true, q: "52:11 speaks of the Day of Resurrection.", why: "Describing the Day of Torment, the Day of Resurrection." }
      ]
    },
    {
      slug: "playing-in-falsehood",
      title: "Playing in falsehood",
      line: "They spent life in falsehood, mocking the religion.",
      facts: ["Religion was a joke to them", "Never mock the faith"],
      quote: q52(12),
      source: ik(12, "Ibn Kathir says they lived in falsehood and made the religion something to mock and joke about.", "make the religion the subject of their mockery and jest"),
      difficulty: 2,
      questions: [
        { q: "What were they doing, in 52:12?", a: "Playing in falsehood", wrong: ["Praying", "Fasting", "Giving charity"], why: "Those who were in their falsehood, playing." },
        { q: "What did they make of the religion?", a: "Something to mock", wrong: ["A guide", "A comfort", "A law"], why: "They live in this life in falsehood and make the religion the subject of their mockery and jest." },
        { tf: true, q: "Mocking the religion is a trait of the deniers.", why: "They live in this life in falsehood and make the religion the subject of their mockery and jest." }
      ]
    },
    {
      slug: "driven-to-the-fire",
      title: "Driven to the Fire",
      line: "On that Day, the deniers will be driven to the Fire.",
      facts: ["Driven, not free to choose", "Choose good now"],
      quote: q52(13),
      source: ik(13, "Ibn Kathir says on that Day they will be driven and pushed toward the Fire.", "they will be violently driven and shoved"),
      difficulty: 2,
      questions: [
        { q: "Where are the deniers driven, in 52:13?", a: "To the Fire", wrong: ["To a garden", "To a market", "To their homes"], why: "The Day when they will be pushed down by force to the fire of Hell." },
        { q: "Can they refuse to go?", a: "No, they are driven", wrong: ["Yes, easily", "Only on Fridays", "If they pay"], why: "They will be violently driven and shoved." },
        { tf: true, q: "Many early scholars explained 52:13 the same way.", why: "Mujahid, Ash-Shabi, Muhammad bin Kab, Ad-Dahhak, As-Suddi and Ath-Thawri said that this Ayah means, They will be violently shoved into the Fire." }
      ]
    },
    {
      slug: "the-fire-you-denied",
      title: "The Fire you denied",
      line: "They will be told: this is the Fire you used to deny.",
      facts: ["Said by the angels", "What they denied is real"],
      quote: q52(14),
      source: ik(14, "Ibn Kathir says the angels of punishment will say these words to them as a rebuke.", "the angels of punishment will say these words to them"),
      difficulty: 1,
      questions: [
        { q: "What will they be told, in 52:14?", a: "This is the Fire you denied", wrong: ["Welcome home", "Go back", "Rest now"], why: "This is the Fire, which you used to deny." },
        { q: "Who says these words, per Ibn Kathir?", a: "The angels of punishment", wrong: ["Their friends", "Their parents", "The prophets"], why: "The angels of punishment will say these words to them, while admonishing and chastising them." },
        { tf: true, q: "What the deniers called false will be real.", why: "This is the Fire, which you used to deny." }
      ]
    },
    {
      slug: "is-this-magic",
      title: "Is this magic?",
      line: "They called the truth magic; now they will see it.",
      facts: ["Their old claim is answered", "Eyes now open"],
      quote: q52(15),
      source: ik(15, "Ibn Kathir says they will be told to enter the Fire that surrounds them from every direction.", "which will encircle you from every direction"),
      difficulty: 2,
      questions: [
        { q: "What are they asked, in 52:15?", a: "Is this magic?", wrong: ["Are you hungry?", "Who are you?", "Where is home?"], why: "Is this magic or do you not see?" },
        { q: "Why are they asked about magic?", a: "They called the truth magic", wrong: ["They were magicians", "They liked tricks", "They saw a show"], why: "Is this magic or do you not see? Enter therein." },
        { tf: true, q: "The Fire will surround them from every side.", why: "Enter the Fire, which will encircle you from every direction." }
      ]
    },
    {
      slug: "requited-for-deeds",
      title: "Requited for deeds",
      line: "Allah is never unjust; each gets what their deeds earned.",
      facts: ["Patience will not help then", "Allah is perfectly just"],
      quote: q52(16),
      source: ik(16, "Ibn Kathir says Allah is never unjust with anyone, and He repays each one according to their deeds.", "Allah is never unjust with anyone"),
      difficulty: 2,
      questions: [
        { q: "Why are they repaid, in 52:16?", a: "For what they used to do", wrong: ["For no reason", "For their parents", "For their wealth"], why: "You are only being requited for what you used to do." },
        { q: "Is Allah ever unjust, per Ibn Kathir?", a: "Never", wrong: ["Sometimes", "Often", "Only at night"], why: "And surely, Allah is never unjust with anyone." },
        { q: "Will patience save them then, in 52:16?", a: "No, it is all the same", wrong: ["Yes, fully", "Half of it", "After a week"], why: "Whether you endure its torment and afflictions or not, you will never avert it or be saved from it." }
      ]
    }
  ]
};

/** Ayahs 17 to 28: the people of Taqwa in Paradise, their families joined with them, and their thanks to Allah. */
const TUR_TWO: DeepUnit = {
  key: "tur2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-52",
  name: "At-Tur, ayahs 17 to 28",
  kind: "skill",
  lessonType: "surah",
  surahName: "At-Tur",
  lessons: [
    {
      slug: "gardens-and-delight",
      title: "Gardens and delight",
      line: "The people of Taqwa will live in Gardens and delight.",
      facts: ["The opposite of the deniers", "Reward for Taqwa"],
      quote: q52(17),
      source: ik(17, "Ibn Kathir says Allah describes the destination of the happy ones, in contrast to the punishment of the miserable.", "Allah the Exalted described the destination of the happy ones"),
      difficulty: 1,
      questions: [
        { q: "Where will the people of Taqwa be, in 52:17?", a: "In Gardens and delight", wrong: ["In a desert", "In the sea", "On a mountain"], why: "Verily, those who have Taqwa will be in Gardens and Delight." },
        { q: "With whom are they contrasted, per Ibn Kathir?", a: "The miserable ones", wrong: ["The angels", "The prophets", "The animals"], why: "In contrast to the torment and punishment of the miserable." },
        { tf: true, q: "Taqwa means being mindful and fearful of Allah.", why: "Verily, those who have Taqwa will be in Gardens and Delight." }
      ]
    },
    {
      slug: "between-fear-and-hope",
      title: "Between fear and hope",
      line: "After the warning comes Paradise, so hearts hold fear and hope.",
      facts: ["As-Sa'di explains", "Targhib and tarhib"],
      quote: q52(17),
      source: saadi(52, 17, "As-Sa'di says after the punishment of the deniers, Allah mentions the delight of the pious to join encouragement and warning, so hearts stay between fear and hope.", "ليجمع بين الترغيب والترهيب، فتكون القلوب بين الخوف والرجاء"),
      difficulty: 2,
      questions: [
        { q: "Why does Paradise follow the warning in At-Tur?", a: "To keep fear and hope together", wrong: ["To fill space", "By chance", "To end the surah"], why: "So hearts stay between fear and hope, says as-Sa'di." },
        { q: "A believer's heart should hold...?", a: "Both fear and hope", wrong: ["Only fear", "Only hope", "Neither"], why: "Hearts between fear and hope." },
        { tf: true, q: "The delight of Paradise is for heart, soul and body.", why: "As-Sa'di on 52:17." }
      ]
    },
    {
      slug: "saved-from-the-fire",
      title: "Saved from the Fire",
      line: "They enjoy Allah's gifts, and He saved them from the Fire.",
      facts: ["Being saved is a gift itself", "Joys no eye has seen"],
      quote: q52(18),
      source: ik(18, "Ibn Kathir says being saved from the Fire is a bounty by itself, and Paradise has delights no eye has seen.", "He saved them from the torment of the Fire, which is a bounty itself"),
      difficulty: 2,
      questions: [
        { q: "What are they enjoying, in 52:18?", a: "What their Lord gave them", wrong: ["What they stole", "What they bought", "What they found"], why: "Enjoying in that which their Lord has bestowed on them." },
        { q: "What does Ibn Kathir call being saved from the Fire?", a: "A bounty by itself", wrong: ["A small thing", "A test", "A punishment"], why: "He saved them from the torment of the Fire, which is a bounty itself." },
        { q: "Which delight does Ibn Kathir list?", a: "Foods, drinks and clothes", wrong: ["Gold coins only", "Only rest", "Only sleep"], why: "Such as various types of foods, drinks, clothes, dwelling places, mounts, and so forth." }
      ]
    },
    {
      slug: "eat-and-drink-with-joy",
      title: "Eat and drink with joy",
      line: "They are told: eat and drink happily for what you did.",
      facts: ["A just reward for deeds", "Still a favor from Allah"],
      quote: q52(19),
      source: ik(19, "Ibn Kathir says this is the just reward for their deeds, and all of it is a favor from Allah.", "surely, all this is a favor from Allah and a reward from Him"),
      difficulty: 1,
      questions: [
        { q: "What are they told, in 52:19?", a: "Eat and drink with happiness", wrong: ["Wait outside", "Work harder", "Go to sleep"], why: "Eat and drink with happiness because of what you used to do." },
        { q: "Why are they rewarded, in 52:19?", a: "Because of what they did", wrong: ["Because of luck", "Because of wealth", "For no reason"], why: "Because of what you used to do." },
        { tf: true, q: "Ibn Kathir says the reward is still a favor from Allah.", why: "Surely, all this is a favor from Allah and a reward from Him." }
      ]
    },
    {
      slug: "thrones-facing-each-other",
      title: "Thrones facing each other",
      line: "They rest on thrones in rows, with pure, beautiful spouses.",
      facts: ["Masfufah: facing each other", "Good company in Paradise"],
      quote: q52(20),
      source: ik(20, "Ibn Kathir says Masfufah means they face one another, and Allah gives them righteous, beautiful spouses.", "We made for them righteous spouses"),
      difficulty: 2,
      questions: [
        { q: "On what do they recline, in 52:20?", a: "Thrones", wrong: ["Rocks", "Sand", "Ships"], why: "They will recline on thrones Masfufah." },
        { q: "What does Masfufah mean, per Ibn Kathir?", a: "Facing each other", wrong: ["Made of wood", "Far apart", "Very small"], why: "The meaning of, Masfufah is they will be facing each other." },
        { q: "What spouses does Allah give them, per Ibn Kathir?", a: "Righteous spouses", wrong: ["No one", "Strangers", "Servants only"], why: "We made for them righteous spouses." }
      ]
    },
    {
      slug: "families-joined",
      title: "Families joined",
      line: "Believing children are raised to their parents' level.",
      facts: ["Parents' eyes are comforted", "No reward is reduced"],
      quote: q52(21),
      source: ik(21, "Ibn Abbas said Allah raises believers' children to their parents' rank, even if their deeds were less, to comfort the parents.", "Allah elevates the ranks of the believers"),
      difficulty: 2,
      questions: [
        { q: "Whom does Allah join with the believers, in 52:21?", a: "Their believing children", wrong: ["Their enemies", "Their neighbors", "Their servants"], why: "And those who believe and whose offspring follow them in faith, to them shall We join their offspring." },
        { q: "Why are the children raised, per Ibn Abbas?", a: "To comfort the parents", wrong: ["To punish them", "For their wealth", "By chance"], why: "So that the eyes of the parents are comforted." },
        { q: "Is the parents' reward reduced for this?", a: "No, not at all", wrong: ["Yes, by half", "A little", "Only once"], why: "And We shall not decrease the reward of their deeds in anything." }
      ]
    },
    {
      slug: "a-child-who-prays",
      title: "A child who prays",
      line: "A righteous child's dua keeps helping parents after death.",
      facts: ["Three things continue", "Charity, knowledge, a child"],
      quote: q52(21),
      source: hadith("muslim", "1631", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said when a person dies, their deeds end except three: ongoing charity, knowledge that benefits, and a righteous child who prays for them.", "recurring charity, or knowledge"),
      difficulty: 2,
      questions: [
        { q: "How many deeds continue after death, per Muslim 1631?", a: "Three", wrong: ["One", "Five", "Ten"], why: "When a man dies, his acts come to an end, but three." },
        { q: "Which is one of the three, per Muslim 1631?", a: "A pious child who prays", wrong: ["A big house", "A famous name", "A strong horse"], why: "Or a pious son, who prays for him." },
        { tf: true, q: "Ibn Kathir cites Muslim 1631 under 52:21.", why: "There is a witnessing narration for it in Sahih Muslim, from the Hadith of Abu Hurayrah." }
      ]
    },
    {
      slug: "a-pledge-for-deeds",
      title: "A pledge for deeds",
      line: "Each person answers only for what they themselves earned.",
      facts: ["No one carries another's sin", "Allah is fair"],
      quote: q52(21),
      source: ik(21, "Ibn Kathir says Allah is fair: He punishes no one for the mistakes of others, even of parents or children.", "He does not punish anyone for the mistakes of others"),
      difficulty: 3,
      questions: [
        { q: "What is every person a pledge for?", a: "What they earned", wrong: ["Their parents' deeds", "Their tribe", "Their wealth"], why: "Every person is a pledge for that which he has earned." },
        { q: "Does Allah punish anyone for others' mistakes?", a: "No, never", wrong: ["Yes, always", "Only parents", "Only children"], why: "He does not punish anyone for the mistakes of others." },
        { tf: false, q: "A parent's sins are added to a child's record.", why: "No. No sin committed by others shall ever be added to one's load, even if committed by his or her parents or offspring." }
      ]
    },
    {
      slug: "fruit-and-meat",
      title: "Fruit and meat",
      line: "Allah gives them fruit and meat, whatever they wish for.",
      facts: ["Every kind they desire", "Never running out"],
      quote: q52(22),
      source: ik(22, "Ibn Kathir says Allah will give them all kinds of fruit and meat, whatever they wish for and desire.", "whatever they wish for and desire"),
      difficulty: 1,
      questions: [
        { q: "What food is named, in 52:22?", a: "Fruit and meat", wrong: ["Bread and salt", "Rice and fish", "Milk and honey"], why: "And We shall provide them with fruit and meat such as they desire." },
        { q: "How much of it do they get, per Ibn Kathir?", a: "Whatever they wish for", wrong: ["One plate a day", "Only on Fridays", "A small share"], why: "Whatever they wish for and desire." },
        { tf: true, q: "Paradise has many kinds of fruit and meat.", why: "We shall provide them with various types and kinds of fruits and meat." }
      ]
    },
    {
      slug: "a-cup-without-harm",
      title: "A cup without harm",
      line: "They share a pure cup that brings no idle talk or sin.",
      facts: ["Laghw: idle talk", "No headache, no harm"],
      quote: q52(23),
      source: ik(23, "Ibn Kathir says the drink of Paradise is purified from every harm: no headache, no foolish talk and no sin.", "Allah purified the wine of the Hereafter from the ills and harm caused by the wine of this life"),
      difficulty: 2,
      questions: [
        { q: "What is the cup free from, in 52:23?", a: "Idle talk and sin", wrong: ["Water", "Sweetness", "Color"], why: "There they shall pass from hand to hand a cup, free from any idle talk, and free from sin." },
        { q: "What does Laghw mean, per Ibn Abbas?", a: "Falsehood", wrong: ["Sweetness", "Water", "Gold"], why: "Ibn Abbas said that Laghw means falsehood." },
        { tf: true, q: "The drink of Paradise causes no headache or harm.", why: "Allah has purified the wine of the Hereafter from causing headaches, stomachaches and intoxication." }
      ]
    },
    {
      slug: "like-preserved-pearls",
      title: "Like preserved pearls",
      line: "Young servants serve them, clean and neat as pearls.",
      facts: ["Graceful and clean", "Pearls kept in shells"],
      quote: q52(24),
      source: ik(24, "Ibn Kathir says their servants in Paradise will be beautiful, clean and neat like well-preserved pearls.", "clean and neat as well-preserved pearls"),
      difficulty: 1,
      questions: [
        { q: "What are the servants like, in 52:24?", a: "Preserved pearls", wrong: ["Shining stars", "Green trees", "Flowing rivers"], why: "To serve them as if they were preserved pearls." },
        { q: "How does Ibn Kathir describe them?", a: "Clean and neat", wrong: ["Tired and slow", "Old and weak", "Loud and rude"], why: "Beautiful, graceful in appearance, clean and neat as well-preserved pearls." },
        { tf: true, q: "The people of Paradise will have servants.", why: "This is a description of the servants and aids, the believers will have in Paradise." }
      ]
    },
    {
      slug: "talking-together",
      title: "Talking together",
      line: "The people of Paradise talk, recalling their life on earth.",
      facts: ["Friends meeting again", "Remembering the past"],
      quote: q52(25),
      source: ik(25, "Ibn Kathir says the believers will draw near each other, talking and remembering their deeds and days in this life.", "talking and remembering their actions and conditions in this life"),
      difficulty: 1,
      questions: [
        { q: "What do they do, in 52:25?", a: "Ask one another", wrong: ["Sleep all day", "Stay silent", "Argue"], why: "And some of them draw near to others, questioning." },
        { q: "What do they talk about, per Ibn Kathir?", a: "Their life in the world", wrong: ["The weather", "Trade prices", "Nothing"], why: "Talking and remembering their actions and conditions in this life." },
        { tf: true, q: "In Paradise the believers meet and talk.", why: "The believers will draw near to each other talking and remembering their actions and conditions in this life." }
      ]
    },
    {
      slug: "afraid-among-family",
      title: "Afraid among family",
      line: "They say: back home, we feared our Lord among our families.",
      facts: ["Fear of Allah in daily life", "At home, not only in mosque"],
      quote: q52(26),
      source: ik(26, "Ibn Kathir says they mean: in the world, among our families, we feared our Lord and His punishment.", "we were afraid of our Lord and fearful of His torment"),
      difficulty: 2,
      questions: [
        { q: "Where were they afraid, in 52:26?", a: "Among their families", wrong: ["In the market", "At sea", "In battle only"], why: "Aforetime, we were afraid in the midst of our families." },
        { q: "Whom did they fear, per Ibn Kathir?", a: "Their Lord", wrong: ["Their neighbors", "Their kings", "The dark"], why: "We were afraid of our Lord and fearful of His torment and punishment." },
        { tf: true, q: "Their fear in the world led to safety in Paradise.", why: "So Allah has been gracious to us, and has saved us from the torment of the Fire." }
      ]
    },
    {
      slug: "allah-was-gracious",
      title: "Allah was gracious",
      line: "Allah was kind to us and saved us from what we feared.",
      facts: ["Safety from the Fire", "All by His favor"],
      quote: q52(27),
      source: ik(27, "Ibn Kathir says they mean Allah granted them a favor and saved them from what they feared.", "He has granted us a favor and saved us from what we feared"),
      difficulty: 1,
      questions: [
        { q: "What did Allah save them from, in 52:27?", a: "The torment of the Fire", wrong: ["A flood", "Hunger", "Their enemies"], why: "So Allah has been gracious to us, and has saved us from the torment of the Fire." },
        { q: "What do they call it, per Ibn Kathir?", a: "A favor from Allah", wrong: ["Their own work", "Good luck", "A trade"], why: "He has granted us a favor and saved us from what we feared." },
        { tf: true, q: "They thank Allah, not themselves, for being saved.", why: "So Allah has been gracious to us, and has saved us from the torment of the Fire." }
      ]
    },
    {
      slug: "we-used-to-call-him",
      title: "We used to call Him",
      line: "We called on Him humbly before, and He answered us.",
      facts: ["He answers sincere duas", "Ar-Rahim: the Most Merciful"],
      quote: q52(28),
      source: ik(28, "Ibn Kathir says they invoked Allah humbly, and He accepted their call and gave them what they wished.", "we used to invoke Him with submission and humility"),
      difficulty: 2,
      questions: [
        { q: "What did they use to do, in 52:28?", a: "Invoke Allah", wrong: ["Ignore Allah", "Sleep late", "Chase wealth"], why: "Verily, We used to invoke Him before." },
        { q: "How did they invoke Him, per Ibn Kathir?", a: "With submission and humility", wrong: ["With pride", "Rarely", "Loudly in markets"], why: "We used to invoke Him with submission and humility, and He accepted our invocation." },
        { q: "Which names end 52:28?", a: "Most Subtle, Most Merciful", wrong: ["All-Hearing, All-Seeing", "First, Last", "King, Holy"], why: "Verily, He is the Most Subtle, the Most Merciful." }
      ]
    }
  ]
};

/** Ayahs 29 to 49: the false claims against the Prophet ﷺ answered, the questions that prove Tawhid, and the command to be patient and glorify Allah. */
const TUR_THREE: DeepUnit = {
  key: "tur3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-52",
  name: "At-Tur, ayahs 29 to 49",
  kind: "skill",
  lessonType: "surah",
  surahName: "At-Tur",
  lessons: [
    {
      slug: "not-a-soothsayer",
      title: "Not a soothsayer",
      line: "Keep reminding: by Allah's grace, he ﷺ is no soothsayer.",
      facts: ["Kahin: a soothsayer", "Quraysh made false claims"],
      quote: q52(29),
      source: ik(29, "Ibn Kathir says Allah tells His Messenger ﷺ to keep reminding, and clears him of the claims of Quraysh.", "you, O Muhammad, are not a Kahin"),
      difficulty: 2,
      questions: [
        { q: "What is he ﷺ told to do, in 52:29?", a: "Remind", wrong: ["Stay silent", "Leave Makkah", "Hide"], why: "Therefore, remind." },
        { q: "What is a Kahin, per Ibn Kathir?", a: "A soothsayer", wrong: ["A poet", "A king", "A merchant"], why: "A Kahin is the soothsayer who receives information from the Jinns." },
        { tf: true, q: "Quraysh falsely called him ﷺ a Kahin.", why: "By the grace of Allah, you, O Muhammad, are not a Kahin, as the ignorant Quraysh idolators claim." }
      ]
    },
    {
      slug: "a-poet-they-said",
      title: "A poet, they said",
      line: "They called him ﷺ a poet and waited for his death.",
      facts: ["Plotting in Dar An-Nadwah", "They hoped he would die"],
      quote: q52(30),
      source: ik(30, "Ibn Abbas said Quraysh met in Dar An-Nadwah and said: chain him and wait, he will die like the poets before him.", "When the Quraysh gathered in the Dar An"),
      difficulty: 2,
      questions: [
        { q: "What did they call him ﷺ, in 52:30?", a: "A poet", wrong: ["A king", "A trader", "A farmer"], why: "Or do they say: A poet! We await for him some calamity by time!" },
        { q: "What were they waiting for, per Ibn Kathir?", a: "His death", wrong: ["His wealth", "His return", "A feast"], why: "We await a disaster to strike him, for example, death." },
        { q: "Where did Quraysh meet to plot?", a: "Dar An-Nadwah", wrong: ["The Kabah roof", "Taif", "Madinah"], why: "When the Quraysh gathered in the Dar An-Nadwah, their meeting place." }
      ]
    },
    {
      slug: "wait-and-i-will-wait",
      title: "Wait, and I will wait",
      line: "Say: wait, I am waiting too, and you will see who wins.",
      facts: ["The good end is for truth", "In this life and the next"],
      quote: q52(31),
      source: ik(31, "Ibn Kathir says they will come to know who is given the good end and victory, in this life and the next.", "you will come to know to whom the good end and triumph shall be granted"),
      difficulty: 2,
      questions: [
        { q: "What is he ﷺ told to say, in 52:31?", a: "Wait, I am waiting too", wrong: ["I give up", "I will leave", "Forgive me"], why: "Say: Wait! I am with you among those who wait!" },
        { q: "What will they come to know, per Ibn Kathir?", a: "Who gets the good end", wrong: ["Who is richest", "Who is oldest", "Who is strongest"], why: "You will come to know to whom the good end and triumph shall be granted." },
        { tf: true, q: "The good end is in this life and the Hereafter.", why: "To whom the good end and triumph shall be granted in this life and the Hereafter." }
      ]
    },
    {
      slug: "do-their-minds-command",
      title: "Do their minds command it?",
      line: "Their own minds know the claims are false; pride drives them.",
      facts: ["They knew the truth inside", "Pride made them stubborn"],
      quote: q52(32),
      source: ik(32, "Ibn Kathir says they knew in their hearts the claims were untrue; they are misguided, stubborn and unjust.", "even though they know in their hearts that they are untrue and false"),
      difficulty: 3,
      questions: [
        { q: "What does 52:32 ask about their minds?", a: "Do they command this?", wrong: ["Are they asleep?", "Are they lost?", "Are they hungry?"], why: "Or do their minds command them this." },
        { q: "Did they believe their own claims, per Ibn Kathir?", a: "No, they knew they were false", wrong: ["Yes, fully", "Only some", "They forgot"], why: "Even though they know in their hearts that they are untrue and false." },
        { q: "What kind of people are they, in 52:32?", a: "Transgressing all bounds", wrong: ["Kind and fair", "Shy and quiet", "Wise and calm"], why: "Or are they people transgressing all bounds?" }
      ]
    },
    {
      slug: "he-forged-it",
      title: "He forged it?",
      line: "They said he made up the Quran; disbelief made them say it.",
      facts: ["The Quran is from Allah", "Their claim had no proof"],
      quote: q52(33),
      source: ik(33, "Ibn Kathir says their disbelief drove them to say he forged the Quran by himself.", "their disbelief drives them to utter these statements"),
      difficulty: 2,
      questions: [
        { q: "What did they claim, in 52:33?", a: "He has forged it", wrong: ["He found it", "He bought it", "He dreamed it"], why: "Or do they say: He has forged it?" },
        { q: "Why did they say it, per Ibn Kathir?", a: "Their disbelief drove them", wrong: ["They had proof", "They were sure", "They were told"], why: "Nay! They believe not, meaning, their disbelief drives them to utter these statements." },
        { tf: true, q: "Allah answers them: they believe not.", why: "Nay! They believe not!" }
      ]
    },
    {
      slug: "bring-one-like-it",
      title: "Bring one like it",
      line: "If the Quran was made up, let them bring something like it.",
      facts: ["The challenge of the Quran", "Not even one surah"],
      quote: q52(34),
      source: ik(34, "Ibn Kathir says even if all jinn and mankind joined, they could never produce the like of the Quran, or even one surah.", "they will never produce something like the"),
      difficulty: 2,
      questions: [
        { q: "What are they challenged to do, in 52:34?", a: "Produce a recitation like it", wrong: ["Build a house", "Win a race", "Write a poem"], why: "Let them then produce a recitation like unto it if they are truthful." },
        { q: "Could all jinn and mankind together do it?", a: "Never", wrong: ["Yes, easily", "In a year", "With help"], why: "Even if they combine their strength, Jinns and mankind alike, they will never produce something like the Quran." },
        { tf: true, q: "They could not even produce one surah like it.", why: "Or ten Surahs like it, or even one Surah!" }
      ]
    },
    {
      slug: "created-by-nothing",
      title: "Created by nothing?",
      line: "Were they made from nothing, or did they make themselves?",
      facts: ["Neither is true", "Allah created them"],
      quote: q52(35),
      source: ik(35, "Ibn Kathir says neither is true: Allah created them and brought them into being after they were nothing.", "Allah is the One Who created them"),
      difficulty: 2,
      questions: [
        { q: "What two choices does 52:35 give?", a: "Made by nothing or self-made", wrong: ["Rich or poor", "Old or young", "Near or far"], why: "Or were they created by nothing? Or were they themselves the creators?" },
        { q: "Which choice is true, per Ibn Kathir?", a: "Neither; Allah created them", wrong: ["The first", "The second", "Both"], why: "Neither is true. Allah is the One Who created them." },
        { tf: true, q: "Allah brought them into being after they were nothing.", why: "Allah is the One Who created them and brought them into existence after they were nothing." }
      ]
    },
    {
      slug: "my-heart-almost-flew",
      title: "My heart almost flew",
      line: "Jubayr heard 52:35-37 and felt his heart almost fly.",
      facts: ["He came to ransom captives", "Later he became Muslim"],
      quote: q52(35),
      source: hadith("bukhari", "4854", "Jubayr ibn Mutim", "Sahih", "Jubayr ibn Mutim heard the Prophet ﷺ recite At-Tur in Maghrib, and at 52:35-37 he said his heart was about to fly.", "my heart was about to fly"),
      difficulty: 3,
      questions: [
        { q: "How did Jubayr feel at 52:35, per Bukhari 4854?", a: "His heart almost flew", wrong: ["He fell asleep", "He walked out", "He laughed"], why: "My heart was about to fly." },
        { q: "Why had Jubayr come to Madinah?", a: "To ransom captives after Badr", wrong: ["To trade dates", "To learn poetry", "To visit family"], why: "Jubayr bin Mutim went to the Messenger of Allah after the battle of Badr to ransom the captured idolators." },
        { tf: true, q: "Hearing these ayahs helped lead Jubayr to Islam.", why: "Hearing the Prophet ﷺ recite this Ayah was one of the reasons that he later embraced Islam." }
      ]
    },
    {
      slug: "did-they-create-the-heavens",
      title: "Did they create the heavens?",
      line: "Did they make the heavens and earth? No, they lack firm belief.",
      facts: ["They knew Allah is Creator", "Yet they worshipped idols"],
      quote: q52(36),
      source: ik(36, "Ibn Kathir says they knew Allah alone is the Creator, but fell into idolatry because they had no firm belief.", "They knew that Allah Alone is the Creator without partners with Him"),
      difficulty: 2,
      questions: [
        { q: "What does 52:36 ask?", a: "Did they create heaven and earth?", wrong: ["Did they build Makkah?", "Did they dig Zamzam?", "Did they own camels?"], why: "Or did they create the heavens and the earth?" },
        { q: "Why did they fall into idolatry, per Ibn Kathir?", a: "No firm belief", wrong: ["Too much knowledge", "Too much prayer", "Poverty"], why: "However, they fell into idolatry because they had no firm belief." },
        { tf: true, q: "The idolators knew Allah alone is the Creator.", why: "They knew that Allah Alone is the Creator without partners with Him." }
      ]
    },
    {
      slug: "the-treasures-of-your-lord",
      title: "The treasures of your Lord",
      line: "Do they hold Allah's treasures, or rule over His creation?",
      facts: ["Allah is the only King", "He does what He wills"],
      quote: q52(37),
      source: ik(37, "Ibn Kathir says they hold no keys to His treasures; Allah alone is King and Owner and does what He wills.", "Allah the Exalted and Most Honored is the Only King and Owner of the existence"),
      difficulty: 2,
      questions: [
        { q: "What does 52:37 ask about treasures?", a: "Are they theirs?", wrong: ["Are they buried?", "Are they gold?", "Are they lost?"], why: "Or are with them the treasures of your Lord?" },
        { q: "Who is the only King, per Ibn Kathir?", a: "Allah", wrong: ["Quraysh", "Caesar", "Kisra"], why: "Allah the Exalted and Most Honored is the Only King and Owner of the existence." },
        { tf: false, q: "The idolators held the keys to Allah's treasures.", why: "No. Do they hold the keys to His treasures in their hands? Never." }
      ]
    },
    {
      slug: "a-stairway-to-heaven",
      title: "A stairway to heaven?",
      line: "Do they have a stairway to listen in? Then bring proof.",
      facts: ["They have no evidence", "Claims need proof"],
      quote: q52(38),
      source: ik(38, "Ibn Kathir says let their listener bring proof; they never can, so they have no evidence at all.", "they have nothing and have no evidence for their stance"),
      difficulty: 2,
      questions: [
        { q: "What does 52:38 ask if they have?", a: "A stairway to heaven", wrong: ["A ship", "A sword", "A tower of gold"], why: "Or have they a stairway, by means of which they listen?" },
        { q: "What must their listener produce?", a: "Manifest proof", wrong: ["Gold", "Poems", "Witnesses only"], why: "Then let their listener produce some manifest proof." },
        { tf: true, q: "Ibn Kathir says they have no evidence for their claims.", why: "They have nothing and have no evidence for their stance." }
      ]
    },
    {
      slug: "daughters-and-sons",
      title: "Daughters and sons?",
      line: "They called angels Allah's daughters; He is far above that.",
      facts: ["Angels are not His children", "A false claim answered"],
      quote: q52(39),
      source: ik(39, "Ibn Kathir says they claimed the angels were Allah's daughters and worshipped them, while they preferred sons for themselves.", "they made the angels Allah"),
      difficulty: 3,
      questions: [
        { q: "What did the idolators claim about the angels?", a: "That they are Allah's daughters", wrong: ["That they are prophets", "That they are jinn", "That they are kings"], why: "Allah admonishes them regarding their claim that He has daughters and that the angels are females!" },
        { q: "What did they prefer for themselves?", a: "Sons", wrong: ["Daughters", "Wealth only", "Nothing"], why: "The pagans chose for themselves male offspring and preferred them instead of females." },
        { tf: true, q: "They also worshipped the angels besides Allah.", why: "Yet, they made the angels Allah's daughters and worshipped them besides Allah." }
      ]
    },
    {
      slug: "no-wage-asked",
      title: "No wage asked",
      line: "He ﷺ never asked them for any wage.",
      facts: ["The message is free", "No debt on them"],
      quote: q52(40),
      source: ik(40, "Ibn Kathir says the Messenger ﷺ asked no wage for preaching, so they carry no burden of debt.", "Nay, you, do not ask them for a wage"),
      difficulty: 1,
      questions: [
        { q: "What does 52:40 ask?", a: "Do you ask them a wage?", wrong: ["Do you own land?", "Do you sell dates?", "Do you write poems?"], why: "Or is it that you ask a wage from them." },
        { q: "Did he ﷺ ask for payment, per Ibn Kathir?", a: "No", wrong: ["Yes, gold", "Yes, camels", "Only from rich"], why: "Nay, you, do not ask them for a wage." },
        { tf: true, q: "A wage would have made them feel burdened with debt.", why: "So that they are burdened with a load of debt." }
      ]
    },
    {
      slug: "the-unseen-is-not-theirs",
      title: "The Unseen is not theirs",
      line: "Do they know the Unseen? Only Allah knows it.",
      facts: ["Al-Ghayb: the Unseen", "Known only to Allah"],
      quote: q52(41),
      source: ik(41, "Ibn Kathir says they have no knowledge of the Unseen, for none in the heavens or earth knows it except Allah.", "none in the heavens or earth knows the Unseen except Allah"),
      difficulty: 2,
      questions: [
        { q: "What does 52:41 ask if they have?", a: "The Unseen", wrong: ["A treasure", "A fortress", "An army"], why: "Or that the Unseen is with them, and they write it down?" },
        { q: "Who knows the Unseen, per Ibn Kathir?", a: "Only Allah", wrong: ["Soothsayers", "Poets", "Stargazers"], why: "None in the heavens or earth knows the Unseen except Allah." },
        { tf: false, q: "A soothsayer can truly know the Unseen.", why: "No. None in the heavens or earth knows the Unseen except Allah." }
      ]
    },
    {
      slug: "the-plotters-are-plotted-against",
      title: "The plotters are plotted against",
      line: "If they plot, their plots will only harm themselves.",
      facts: ["Plots against the truth fail", "Allah protects His Messenger"],
      quote: q52(42),
      source: ik(42, "Ibn Kathir says if they plot against the Messenger ﷺ, their plots will only harm them.", "their plots will only harm them"),
      difficulty: 2,
      questions: [
        { q: "What does 52:42 ask they intend?", a: "A plot", wrong: ["A feast", "A trip", "A trade"], why: "Or do they intend a plot?" },
        { q: "Whom do their plots harm, per Ibn Kathir?", a: "Only themselves", wrong: ["The Messenger ﷺ", "The believers", "No one"], why: "Then let them know that their plots will only harm them." },
        { tf: true, q: "The disbelievers are themselves plotted against.", why: "But those who disbelieve are themselves plotted against!" }
      ]
    },
    {
      slug: "no-god-but-allah",
      title: "No god but Allah",
      line: "Have they a god other than Allah? He is far above partners.",
      facts: ["Subhan Allah: He is far above", "Idols have no power"],
      quote: q52(43),
      source: ik(43, "Ibn Kathir says this is a strong answer to idol worship, and Allah glorifies Himself above what they ascribe.", "Allah next glorifies His Most Honorable Self from what they ascribe to Him"),
      difficulty: 1,
      questions: [
        { q: "What does 52:43 ask?", a: "Have they another god?", wrong: ["Have they a king?", "Have they a city?", "Have they a book?"], why: "Or have they a god other than Allah?" },
        { q: "How does 52:43 end?", a: "Glorified be Allah", wrong: ["Woe to them", "Peace be on them", "They will win"], why: "Glorified be Allah from all that they ascribe as partners." },
        { tf: true, q: "52:43 refutes worshipping idols with Allah.", why: "This Ayah contains harsh refutation directed at the idolators for worshipping the idols." }
      ]
    },
    {
      slug: "just-clouds-they-say",
      title: "Just clouds, they say",
      line: "Even seeing the sky fall, they would say: only clouds.",
      facts: ["Stubborn to the end", "Signs ignored"],
      quote: q52(44),
      source: ik(44, "Ibn Kathir says even if punishment fell from the sky, they would not believe and would call it layers of clouds.", "these are layers of clouds on top of each other"),
      difficulty: 2,
      questions: [
        { q: "What would they say, in 52:44?", a: "Clouds gathered in heaps", wrong: ["A miracle", "We repent", "Save us"], why: "They would say: Clouds gathered in heaps!" },
        { q: "What does 52:44 show about them?", a: "Their stubbornness", wrong: ["Their kindness", "Their wisdom", "Their courage"], why: "Allah the Exalted reaffirms the stubbornness of the idolators." },
        { tf: true, q: "Ibn Kathir links 52:44 to 15:14-15.", why: "They would surely say: Our eyes have been dazzled. Nay, we are a people bewitched. 15:14-15." }
      ]
    },
    {
      slug: "leave-them-till-their-day",
      title: "Leave them till their Day",
      line: "Leave them until they meet the Day of Resurrection.",
      facts: ["The Day will come", "Patience for the Messenger ﷺ"],
      quote: q52(45),
      source: ik(45, "Ibn Kathir says the Day they will meet is the Day of Resurrection.", "on the Day of Resurrection"),
      difficulty: 1,
      questions: [
        { q: "What is he ﷺ told, in 52:45?", a: "Leave them alone", wrong: ["Fight them now", "Follow them", "Beg them"], why: "So leave them alone, O Muhammad." },
        { q: "Which Day do they meet, per Ibn Kathir?", a: "The Day of Resurrection", wrong: ["The day of Badr", "A market day", "Eid day"], why: "Till they meet their Day, in which they will sink into a fainting, on the Day of Resurrection." },
        { tf: true, q: "On that Day they will faint with fear.", why: "Till they meet their Day, in which they will sink into a fainting." }
      ]
    },
    {
      slug: "plots-will-not-help",
      title: "Plots will not help",
      line: "Their plots will not help them, and no one will help.",
      facts: ["Tricks fail on that Day", "No helper but Allah"],
      quote: q52(46),
      source: ik(46, "Ibn Kathir says on the Day of Resurrection their plots from this life will not help them at all.", "their deceit and plots they planned in this life shall not help them in the least"),
      difficulty: 2,
      questions: [
        { q: "What will not avail them, in 52:46?", a: "Their plotting", wrong: ["Their prayers", "Their charity", "Their fasting"], why: "The Day when their plotting shall not avail them at all." },
        { q: "Will anyone help them, in 52:46?", a: "No", wrong: ["Their idols", "Their tribe", "Their wealth"], why: "Nor will they be helped." },
        { tf: false, q: "Their plots will help them a little on that Day.", why: "No. Their deceit and plots they planned in this life shall not help them in the least." }
      ]
    },
    {
      slug: "a-punishment-before-this",
      title: "A punishment before this",
      line: "Hardships in this life are warnings, so people may return.",
      facts: ["Tests in this world", "A chance to repent"],
      quote: q52(47),
      source: ik(47, "Ibn Kathir says Allah tests them with hardships in this world so they might return and repent, but they do not understand.", "so that they might go back and repent"),
      difficulty: 3,
      questions: [
        { q: "What comes before the final punishment, in 52:47?", a: "Another punishment", wrong: ["A great reward", "A long sleep", "Nothing"], why: "And verily, for those who do wrong, there is another punishment before this." },
        { q: "Why does Allah send hardships, per Ibn Kathir?", a: "So they may repent", wrong: ["For no reason", "To destroy all", "To make them rich"], why: "We will torment them in the life of the world and test them with various hardships, so that they might go back and repent." },
        { q: "Which ayah does Ibn Kathir link to 52:47?", a: "32:21, the near torment", wrong: ["1:5", "2:255", "112:1"], why: "We will make them taste of the near torment prior to the supreme torment, in order that they may return. 32:21." }
      ]
    },
    {
      slug: "under-our-care",
      title: "Under Our care",
      line: "Be patient: Allah watches over you and protects you.",
      facts: ["Patience with harm", "Glorify Allah on rising"],
      quote: q52(48),
      source: ik(48, "Ibn Kathir says be patient and do not worry about their harm, for Allah will surely protect you from the people.", "We will surely protect you from the people"),
      difficulty: 2,
      questions: [
        { q: "What is he ﷺ told to do, in 52:48?", a: "Wait patiently", wrong: ["Rush them", "Give up", "Argue"], why: "So wait patiently for the decision of your Lord." },
        { q: "What does Allah promise him ﷺ, per Ibn Kathir?", a: "To protect him from people", wrong: ["Wealth", "A palace", "A long journey"], why: "We will surely protect you from the people." },
        { q: "When should he ﷺ glorify Allah, in 52:48?", a: "When he gets up", wrong: ["Only at noon", "Only in Ramadan", "Never aloud"], why: "And glorify the praises of your Lord when you get up." }
      ]
    },
    {
      slug: "patience-through-dhikr",
      title: "Patience through dhikr",
      line: "The Prophet ﷺ was told to find patience through dhikr.",
      facts: ["As-Sa'di explains", "Glorify when you rise"],
      quote: q52(48),
      source: saadi(52, 48, "As-Sa'di says Allah told His Messenger ﷺ to be patient with His decree, promised to protect him, and told him to seek help for patience through dhikr and worship.", "وأمره أن يستعين على الصبر بالذكر والعبادة"),
      difficulty: 2,
      questions: [
        { q: "How should we find help to be patient, per as-Sa'di on 52:48?", a: "Through dhikr and worship", wrong: ["By complaining", "By sleeping", "By arguing"], why: "Seek help for patience through dhikr and worship, says as-Sa'di." },
        { q: "What does under Our eyes mean in At-Tur 52:48?", a: "Seen and protected by Allah", wrong: ["Hidden from Allah", "Left alone", "Forgotten"], why: "In Allah's sight, guarded and cared for." },
        { tf: true, q: "Glorifying at the end of the night includes the time of Fajr.", why: "As-Sa'di on 52:49." }
      ]
    },
    {
      slug: "waking-at-night",
      title: "Waking at night",
      line: "Whoever wakes at night and praises Allah is answered.",
      facts: ["La ilaha illallah on waking", "Then ask forgiveness"],
      quote: q52(48),
      source: hadith("bukhari", "1154", "Ubadah ibn as-Samit", "Sahih", "The Prophet ﷺ said whoever wakes at night, praises Allah, then asks forgiveness or makes dua, is answered; and if he prays, his prayer is accepted.", "Whoever gets up at night and says"),
      difficulty: 3,
      questions: [
        { q: "What happens to one who wakes and then makes dua?", a: "He is answered", wrong: ["He is ignored", "He must wait a year", "Nothing"], why: "Or invokes Allah, he will be responded to it." },
        { q: "What if he makes wudu and prays, per Bukhari 1154?", a: "His prayer is accepted", wrong: ["It is rejected", "It is delayed", "It is halved"], why: "If he intends and performs ablution and prays, his prayer will be accepted." },
        { tf: true, q: "Ibn Kathir links get up in 52:48 to rising from sleep.", why: "From your sleep, from your bed. And this is the view chosen by Ibn Jarir." }
      ]
    },
    {
      slug: "glorify-at-night",
      title: "Glorify at night",
      line: "Glorify Allah at night, and as the stars fade before dawn.",
      facts: ["Night prayer and Quran", "Two rakahs before Fajr"],
      quote: q52(49),
      source: ik(49, "Ibn Kathir says this means night prayer and Quran, and the two rakahs before Fajr as the stars set.", "the two voluntary Rak"),
      difficulty: 2,
      questions: [
        { q: "When else should he ﷺ glorify Allah, in 52:49?", a: "In the nighttime", wrong: ["Only at noon", "Only on Friday", "Only at Asr"], why: "And in the nighttime also glorify His praises." },
        { q: "What is at the setting of the stars, per Ibn Kathir?", a: "Two rakahs before Fajr", wrong: ["The Isha prayer", "The Eid prayer", "The Asr prayer"], why: "Is in reference to the two voluntary Rakahs before the Dawn prayer." },
        { tf: true, q: "52:49 is the last ayah of At-Tur.", why: "This is the end of the Tafsir of Surat At-Tur, all praise and gratitude is due to Allah." }
      ]
    },
    {
      slug: "never-missed-the-sunnah-of-fajr",
      title: "The Sunnah of Fajr",
      line: "He ﷺ was most regular in the two rakahs before Fajr.",
      facts: ["The most regular Sunnah", "Aisha reported it"],
      quote: q52(49),
      source: hadith("bukhari", "1163", "Aisha", "Sahih", "Aisha said the Prophet ﷺ was never more regular in any voluntary prayer than the two rakahs before Fajr.", "was never more regular and particular in offering any Nawafil than the two rak"),
      difficulty: 2,
      questions: [
        { q: "Which Sunnah was he ﷺ most regular in, per Bukhari 1163?", a: "Two rakahs before Fajr", wrong: ["Four after Isha", "Two after Asr", "Duha prayer"], why: "Never more regular and particular in offering any Nawafil than the two rakat Sunna of the Fajr prayer." },
        { q: "Who reported it, per Bukhari 1163?", a: "Aisha", wrong: ["Umar", "Anas", "Abu Bakr"], why: "Narrated Aisha: The Prophet ﷺ was never more regular in offering any Nawafil than the two rakat of the Fajr prayer." },
        { tf: true, q: "Ibn Kathir cites this to explain the setting of the stars.", why: "It is confimred in the Two Sahihs from Aishah, the Prophet ﷺ was never more regular and particular in offering any voluntary prayer than the two Sunnah Rakahs of the Fajr prayer." }
      ]
    },
    {
      slug: "better-than-the-world",
      title: "Better than the world",
      line: "Two rakahs at dawn are better than the whole world.",
      facts: ["Small deed, huge reward", "Before the Fajr prayer"],
      quote: q52(49),
      source: hadith("muslim", "725", "Aisha", "Sahih", "The Prophet ﷺ said the two rakahs at dawn are better than this world and what it contains.", "better than this world and what it contains"),
      difficulty: 2,
      questions: [
        { q: "What are they better than, per Muslim 725?", a: "This world and all in it", wrong: ["A day of fasting", "A bag of gold", "A long trip"], why: "The two rakahs at dawn are better than this world and what it contains." },
        { q: "When are these two rakahs prayed?", a: "At dawn, before Fajr", wrong: ["After Isha", "At noon", "After Maghrib"], why: "The two rakahs at dawn are better than this world and what it contains." },
        { tf: true, q: "In another wording, they were dearer to him ﷺ than the world.", why: "They are dearer to me than the whole world." }
      ]
    }
  ]
};

export const TUR_UNITS: readonly DeepUnit[] = [TUR_ONE, TUR_TWO, TUR_THREE];
