import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah An-Nur ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on An-Nur 24:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_24_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on An-Nur 24:${ayah}`,
    url: `https://quran.com/24:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 24:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}


const q24 = (ayah: number) => quranQuote(24, ayah);

/** Ayahs 1 to 34: a surah of clear rulings, Allah declaring 'A'ishah innocent, thinking well of believers, forgiving like Abu Bakr, and the manners of homes and the street. */
const NUR_ONE: DeepUnit = {
  key: "nur1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-24",
  name: "An-Nur, ayahs 1 to 34",
  kind: "skill",
  lessonType: "surah",
  surahName: "An-Nur",
  lessons: [
    {
      slug: "a-surah-of-clear-rulings",
      title: "A surah of clear rulings",
      line: "Allah sent down An-Nur with clear ayahs so we remember.",
      facts: ["It explains what is lawful and unlawful", "Allah holds this surah in high esteem"],
      quote: q24(1),
      source: ik(1, "An-Nur opens by saying Allah sent it down and made its rulings binding. Mujahid and Qatadah said it explains the lawful and unlawful, commands and prohibitions, with clear ayahs so we remember.", "Here Allah is pointing out the high esteem in which He holds this Surah"),
      difficulty: 2,
      questions: [
        { q: "What did Allah reveal in An-Nur, per 24:1?", a: "Manifest, clear ayahs", wrong: ["Hidden riddles", "Only stories", "Only poems"], why: "And in it We have revealed manifest Ayat, that you may remember." },
        { q: "What does the surah explain, per Mujahid and Qatadah?", a: "The lawful and unlawful", wrong: ["The stars", "Old poems", "Trade prices"], why: "We have explained what is lawful and unlawful, commands and prohibitions." },
        { tf: true, q: "The first ayah shows Allah holds An-Nur in high esteem.", why: "Here Allah is pointing out the high esteem in which He holds this Surah." }
      ]
    },
    {
      slug: "aishah-declared-innocent",
      title: "Allah declared 'A'ishah innocent",
      line: "When hypocrites spread a lie, Allah declared 'A'ishah innocent.",
      facts: ["A group of hypocrites made up the lie", "Allah called it good for the believers"],
      quote: q24(11),
      source: ik(11, "Hypocrites spread a lie about 'A'ishah, the Mother of the believers, led by Abdullah bin Ubayy. After about a month, Allah revealed ten ayahs declaring her innocent and protecting the honor of His Messenger ﷺ.", "revealed her innocence to protect the honor of the Messenger of Allah"),
      difficulty: 2,
      questions: [
        { q: "Whose innocence did Allah reveal in these ayahs?", a: "'A'ishah, the Mother of the believers", wrong: ["Maryam", "Asiyah", "Hajar"], why: "The next ten Ayat were all revealed concerning 'A'ishah, the mother of the believers." },
        { q: "Who led the group that made up the lie?", a: "Abdullah bin Ubayy", wrong: ["Abu Bakr", "Umar", "Abu Ayyub"], why: "Foremost among this group was 'Abdullah bin Ubayy bin Salul, the leader of the hypocrites." },
        { tf: false, q: "Allah said the whole matter was only bad for the believers.", why: "Consider it not a bad thing for you. Nay, it is good for you." }
      ]
    },
    {
      slug: "think-good-of-believers",
      title: "Think good of believers",
      line: "When you hear a bad rumor, think good of fellow believers.",
      facts: ["Abu Ayyub said: it is all lies", "Ask: would I do such a thing?"],
      quote: q24(12),
      source: ik(12, "Allah asks why the believers did not think good of their own people and call the rumor a lie. When his wife asked Abu Ayyub about it, he said it was all lies, and that 'A'ishah was better than them.", "and it is all lies"),
      difficulty: 2,
      questions: [
        { q: "What should believers do on hearing a rumor, in 24:12?", a: "Think good of their people", wrong: ["Spread it fast", "Add to it", "Believe it at once"], why: "Why then, did not the believers, men and women, when you heard it, think good of their own people." },
        { q: "What did Abu Ayyub say about the rumor?", a: "It is all lies", wrong: ["It may be true", "Tell everyone", "I am not sure"], why: "He said, Yes, and it is all lies." },
        { q: "What should they have called it, in 24:12?", a: "An obvious lie", wrong: ["Great news", "A small joke", "A secret"], why: "And say: This is an obvious lie." }
      ]
    },
    {
      slug: "a-little-thing-to-you",
      title: "Small to you, great to Allah",
      line: "Passing on words you do not know is big in Allah's sight.",
      facts: ["They spoke without knowledge", "They thought it was trivial"],
      quote: q24(15),
      source: ik(15, "People passed the rumor from tongue to tongue, speaking about something they knew nothing about. They thought it was a small matter, but with Allah it was very great.", "you were speaking about something which you knew nothing about"),
      difficulty: 3,
      questions: [
        { q: "How did they pass the rumor on, in 24:15?", a: "With their tongues", wrong: ["With letters", "With drums", "With signs"], why: "When you were propagating it with your tongues." },
        { q: "How did they see it, in 24:15?", a: "As a little thing", wrong: ["As very serious", "As a sin to avoid", "As a test"], why: "You counted it a little thing, while with Allah it was very great." },
        { q: "What was wrong with their talk, per Ibn Kathir?", a: "They spoke without knowledge", wrong: ["It was too quiet", "It was too short", "It was in poems"], why: "You were speaking about something which you knew nothing about." }
      ]
    },
    {
      slug: "do-not-speak-of-it",
      title: "Do not speak of it",
      line: "If you hear a lie about good people, refuse to repeat it.",
      facts: ["Say: it is not right for us to speak of this", "Bad thoughts you never say are forgiven"],
      quote: q24(16),
      source: hadith("bukhari", "5269", "Abu Hurairah", "Sahih", "The Prophet ﷺ said Allah has forgiven his Ummah the bad thoughts that come to their minds, as long as they do not act on them or say them.", "Allah has forgiven my followers the evil thoughts that occur to their minds"),
      difficulty: 3,
      questions: [
        { q: "What should believers say, in 24:16?", a: "It is not right for us to speak of this", wrong: ["Tell me more", "Who else knows?", "Let us share it"], why: "It is not right for us to speak of this. Glory be to You! This is a great lie." },
        { q: "Which thoughts are forgiven, in the hadith?", a: "Ones not said or acted on", wrong: ["Ones we post", "Ones we shout", "Ones we spread"], why: "As long as such thoughts are not put into action or uttered." },
        { tf: true, q: "Allah warns never to repeat such a lie again, in 24:17.", why: "Allah forbids you from it and warns you not to repeat the like of it forever." }
      ]
    },
    {
      slug: "do-not-spread-bad-talk",
      title: "Do not spread bad talk",
      line: "Do not love spreading bad news about believers.",
      facts: ["Stop bad talk; do not pass it on", "Cover a Muslim and Allah covers you"],
      quote: q24(19),
      source: ik(19, "Those who like bad talk to spread among believers are warned. Ibn Kathir says those who hear evil talk should not spread it or pass it on. Leave the matter to Allah, who knows.", "they should not spread such talk or pass it on to others"),
      difficulty: 3,
      questions: [
        { q: "What should one do with evil talk, per Ibn Kathir?", a: "Not pass it on", wrong: ["Share it quickly", "Write it down", "Add details"], why: "They should not spread such talk or pass it on to others." },
        { q: "Who knows the full truth, in 24:19?", a: "Allah", wrong: ["The crowd", "The loudest person", "Whoever heard first"], why: "And Allah knows and you know not." },
        { tf: true, q: "Ibn Kathir quotes a hadith against seeking out others' hidden faults.", why: "Do not annoy the servants of Allah, nor abuse them, nor seek their hidden shortcomings." }
      ]
    },
    {
      slug: "screen-a-muslim",
      title: "Cover your brother",
      line: "Cover a Muslim's faults and Allah will cover yours.",
      facts: ["A Muslim is a brother to a Muslim", "Help him and Allah helps you"],
      quote: q24(19),
      source: hadith("bukhari", "2442", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ said a Muslim is a brother of a Muslim. Whoever meets his brother's needs, Allah meets his, and whoever screens a Muslim, Allah will screen him on the Day of Resurrection.", "whoever screened a Muslim, Allah will screen him on the Day of Resurrection"),
      difficulty: 3,
      questions: [
        { q: "What is a Muslim to another Muslim, in the hadith?", a: "A brother", wrong: ["A stranger", "A rival", "A servant"], why: "A Muslim is a brother of another Muslim." },
        { q: "What does Allah do for one who screens a Muslim?", a: "Screens him on Judgment Day", wrong: ["Makes him famous", "Gives him a house", "Nothing"], why: "Whoever screened a Muslim, Allah will screen him on the Day of Resurrection." },
        { q: "Who fulfils the needs of one who helps his brother?", a: "Allah", wrong: ["His neighbor", "The king", "Nobody"], why: "Whoever fulfilled the needs of his brother, Allah will fulfill his needs." }
      ]
    },
    {
      slug: "footsteps-of-shaytan",
      title: "The footsteps of Shaytan",
      line: "Do not follow Shaytan's footsteps; every sin is one of them.",
      facts: ["Shaytan calls to shameful deeds", "Only Allah's grace purifies us"],
      quote: q24(21),
      source: ik(21, "Allah warns: do not follow the footsteps of Shaytan, who orders shameful and evil deeds. Qatadah said every sin is one of his footsteps. Without Allah's grace, no one would ever be pure.", "Every sin is one of the footsteps of Shaytan"),
      difficulty: 3,
      questions: [
        { q: "Whose footsteps should we not follow, in 24:21?", a: "Shaytan's", wrong: ["The Prophets'", "Our parents'", "The scholars'"], why: "O you who believe! Follow not the Khutuwat of Shaytan." },
        { q: "What is one of Shaytan's footsteps, per Qatadah?", a: "Every sin", wrong: ["Every meal", "Every walk", "Every prayer"], why: "Every sin is one of the footsteps of Shaytan." },
        { q: "Without what would no one be pure, in 24:21?", a: "Allah's grace and mercy", wrong: ["Lots of money", "Strong friends", "Long life"], why: "And had it not been for the grace of Allah and His mercy on you, not one of you would ever have been pure from sins." }
      ]
    },
    {
      slug: "forgive-like-abu-bakr",
      title: "Forgive like Abu Bakr",
      line: "Abu Bakr forgave his poor cousin and kept helping him.",
      facts: ["Mistah had joined in the lie", "Forgive others and Allah forgives you"],
      quote: q24(22),
      source: ik(22, "Abu Bakr swore to stop helping his poor cousin Mistah, who had joined in the lie and then repented. Allah revealed: do you not love that Allah forgives you? Abu Bakr said yes, and never stopped helping him.", "By Allah I will never stop spending on him"),
      difficulty: 3,
      questions: [
        { q: "What does Allah ask in 24:22?", a: "Do you not love that Allah forgives you?", wrong: ["Do you not love money?", "Do you not love fame?", "Do you not love rest?"], why: "Let them pardon and forgive. Do you not love that Allah should forgive you?" },
        { q: "Whom had Abu Bakr been helping?", a: "His poor cousin Mistah", wrong: ["A rich merchant", "A king", "A foreign guest"], why: "Mistah was the cousin of As-Siddiq, the son of his maternal aunt, and he was a poor man." },
        { q: "What did Abu Bakr say in the end?", a: "I will never stop spending on him", wrong: ["I will never forgive him", "I will move away", "I will think about it"], why: "Then he resumed his spending on Mistah and said, By Allah I will never stop spending on him." }
      ]
    },
    {
      slug: "good-words-good-people",
      title: "Good words for good people",
      line: "Good words suit good people, and bad words suit bad people.",
      facts: ["The liars' words suited the liars", "'A'ishah was suited to innocence"],
      quote: q24(26),
      source: ik(26, "Ibn Abbas said: evil words are for evil people, and good words are for good people. The lie suited those who made it up, while 'A'ishah was suited to innocence, for the best of mankind ﷺ married only someone good.", "good words are for good men and good men are for good words"),
      difficulty: 4,
      questions: [
        { q: "Which words suit good people, per Ibn Abbas?", a: "Good words", wrong: ["Bad words", "Loud words", "Secret words"], why: "Good words are for good men and good men are for good words." },
        { q: "What is promised to the good, in 24:26?", a: "Forgiveness and honored provision", wrong: ["Fame and gold", "A long rest", "Power over others"], why: "For them is forgiveness, and honored provision." },
        { tf: true, q: "Ibn Kathir says the hypocrites' words suited the hypocrites, not 'A'ishah.", why: "What the hypocrites attributed to 'A'ishah was more suited to them, and she was most suited to innocence." }
      ]
    },
    {
      slug: "ask-before-entering",
      title: "Ask before entering",
      line: "Before entering someone's home, ask permission and say salam.",
      facts: ["Ask up to three times", "If no answer, go away politely"],
      quote: q24(27),
      source: ik(27, "Allah taught believers not to enter houses other than their own until they ask permission and greet the people with salam. Ask up to three times; if you are allowed, enter, otherwise go away.", "One should seek permission three times"),
      difficulty: 4,
      questions: [
        { q: "What two things come before entering, in 24:27?", a: "Ask permission and greet", wrong: ["Knock once and walk in", "Shout and push", "Peek and enter"], why: "Enter not houses other than your own, until you have asked permission and greeted those in them." },
        { q: "How many times should you ask, per Ibn Kathir?", a: "Three times", wrong: ["Once", "Ten times", "Until they open"], why: "One should seek permission three times." },
        { tf: false, q: "Ibn Kathir says you may enter if nobody answers.", why: "If permission is given, he may enter, otherwise he should go away." }
      ]
    },
    {
      slug: "abu-musa-at-umars-door",
      title: "Abu Musa at Umar's door",
      line: "Abu Musa asked three times, then left, as the Prophet ﷺ taught.",
      facts: ["Umar asked for a witness", "Young Abu Sa'id confirmed it"],
      quote: q24(27),
      source: hadith("bukhari", "6245", "Abu Sa'id al-Khudri", "Sahih", "Abu Musa asked three times to enter on Umar and got no answer, so he left. He said the Prophet ﷺ taught: if you ask three times and are not allowed, go back. Abu Sa'id confirmed it to Umar.", "If anyone of you asks the permission to enter thrice, and the permission is not given, then he should return"),
      difficulty: 4,
      questions: [
        { q: "Why did Abu Musa leave Umar's door?", a: "He asked three times, no answer", wrong: ["He was angry", "He forgot his gift", "It was raining"], why: "I asked permission three times, and I was not given it, so I returned." },
        { q: "Who went as Abu Musa's witness?", a: "Abu Sa'id, the youngest", wrong: ["Ubayy, the oldest", "Umar himself", "Nobody went"], why: "Abu Sa'id was the youngest of them, so I went with Abu Musa and informed Umar." },
        { q: "What should you do after three unanswered asks?", a: "Return home", wrong: ["Open the door", "Knock harder", "Wait all night"], why: "If anyone of you asks the permission to enter thrice, and the permission is not given, then he should return." }
      ]
    },
    {
      slug: "if-told-go-back",
      title: "If told to go back, go back",
      line: "If a host says please go back, leave happily; it is purer.",
      facts: ["Allah knows what you do", "Do not stand pushing at the door"],
      quote: q24(28),
      source: ik(28, "If you find no one home, do not enter until you are allowed. If you are asked to go back, then go back: going back is purer and better for you. Allah knows all that you do.", "going back is purer and better for you"),
      difficulty: 4,
      questions: [
        { q: "What should you do if told to go back, in 24:28?", a: "Go back", wrong: ["Argue", "Wait inside", "Knock again and again"], why: "And if you are asked to go back, go back, for it is purer for you." },
        { q: "What if nobody is home, in 24:28?", a: "Still do not enter", wrong: ["Go in and wait", "Look around", "Take a seat inside"], why: "And if you find no one therein, still enter not until permission has been given." },
        { q: "Why is going back better, per Ibn Kathir?", a: "It is purer for you", wrong: ["It is faster", "It saves money", "It is louder"], why: "Going back is purer and better for you." }
      ]
    },
    {
      slug: "lower-the-gaze",
      title: "Lower your gaze",
      line: "Believers look away from what is not allowed to look at.",
      facts: ["It is purer for the heart", "A sudden glance: look away quickly"],
      quote: q24(30),
      source: ik(30, "Allah commands believers to lower their gaze from what is forbidden and to guard their modesty; that is purer for them. If a person's eyes fall on something forbidden by accident, he should quickly look away.", "he should quickly look away"),
      difficulty: 4,
      questions: [
        { q: "What does Allah tell believers to lower, in 24:30?", a: "Their gaze", wrong: ["Their voices", "Their hands", "Their heads"], why: "Tell the believing men to lower their gaze." },
        { q: "What if your eyes fall on something wrong by accident?", a: "Quickly look away", wrong: ["Keep looking", "Take a picture", "Call friends"], why: "He should quickly look away." },
        { tf: true, q: "Allah says lowering the gaze is purer for believers.", why: "That is purer for them. Verily, Allah is All-Aware of what they do." }
      ]
    },
    {
      slug: "rights-of-the-road",
      title: "The rights of the road",
      line: "Sitting by the road has rights: lower your gaze and greet.",
      facts: ["Do not harm passers-by", "Enjoin good, forbid evil"],
      quote: q24(30),
      source: hadith("bukhari", "2465", "Abu Sa'id al-Khudri", "Sahih", "The Prophet ﷺ said: avoid sitting on the roads. If you must, give the road its rights: lower your gaze, do not harm people, return greetings, and enjoin good and forbid evil.", "They are the lowering of your gazes"),
      difficulty: 5,
      questions: [
        { q: "What is the first right of the road?", a: "Lowering your gaze", wrong: ["Selling things", "Singing loudly", "Blocking the way"], why: "They are the lowering of your gazes, refraining from harming people, returning greetings." },
        { q: "What should you do with greetings on the road?", a: "Return them", wrong: ["Ignore them", "Laugh at them", "Count them"], why: "Refraining from harming people, returning greetings." },
        { q: "What did the Prophet ﷺ first say about roads?", a: "Avoid sitting on them", wrong: ["Build houses on them", "Race on them", "Sleep on them"], why: "Beware! Avoid sitting on the roads." }
      ]
    },
    {
      slug: "all-of-you-turn-to-allah",
      title: "Turn to Allah, all of you",
      line: "Everyone should turn to Allah for forgiveness to succeed.",
      facts: ["Ayah 31 teaches believing women too", "Success is obeying Allah"],
      quote: q24(31),
      source: ik(31, "After teaching believing women modesty too, Allah tells all believers to turn to Him for forgiveness to succeed. Ibn Kathir says the greatest success is doing what Allah and His Messenger ﷺ command.", "the greatest success is to be found in doing what Allah and His Messenger"),
      difficulty: 5,
      questions: [
        { q: "Who must turn to Allah for forgiveness, in 24:31?", a: "All the believers", wrong: ["Only the old", "Only scholars", "Only men"], why: "And all of you beg Allah to forgive you all, O believers, that you may be successful." },
        { q: "Where is the greatest success, per Ibn Kathir?", a: "Obeying Allah and His Messenger ﷺ", wrong: ["Collecting wealth", "Winning games", "Being famous"], why: "The greatest success is to be found in doing what Allah and His Messenger command." },
        { tf: true, q: "Believing women are also told to lower their gaze, in 24:31.", why: "And tell the believing women to lower their gaze." }
      ]
    },
    {
      slug: "allah-will-enrich-them",
      title: "Allah will enrich them",
      line: "Allah encourages marriage and promises to help the poor.",
      facts: ["Ayama means anyone unmarried", "Ibn Mas'ud: seek richness through marriage"],
      quote: q24(32),
      source: ik(32, "Allah commands helping single people to marry, and says if they are poor, He will enrich them from His bounty. Ibn Abbas said Allah encouraged marriage and promised to enrich them.", "Allah encouraged them to get married"),
      difficulty: 5,
      questions: [
        { q: "What does Allah promise the poor who marry, in 24:32?", a: "To enrich them", wrong: ["Nothing at all", "To test them more", "A long trip"], why: "If they be poor, Allah will enrich them out of His bounty." },
        { q: "Who are Al-Ayama, per Ibn Kathir?", a: "Men and women with no spouse", wrong: ["Only children", "Only kings", "Only travellers"], why: "The word Al-Ayama is used to describe a woman who has no husband and a man who has no wife." },
        { q: "What should those who cannot afford marriage do, in 24:33?", a: "Stay chaste and wait", wrong: ["Give up hope", "Borrow forever", "Stop praying"], why: "And let those who find not the financial means for marriage keep themselves chaste, until Allah enriches them." }
      ]
    },
    {
      slug: "examples-from-the-past",
      title: "Examples from the past",
      line: "Allah gives clear ayahs and lessons from past nations.",
      facts: ["The Quran explains things in detail", "Past nations are a warning"],
      quote: q24(34),
      source: ik(34, "Allah sent clear ayahs that explain matters in detail, and the stories of past nations who disobeyed His commands, as a lesson and reminder for those who fear Allah.", "there are Ayat which are clear and explain matters in detail"),
      difficulty: 5,
      questions: [
        { q: "What kind of ayahs did Allah send, in 24:34?", a: "Ayahs that make things plain", wrong: ["Ayahs no one can read", "Only short ayahs", "Only Arabic poems"], why: "And indeed We have sent down for you Ayat that make things plain." },
        { q: "What are the examples of the past, per Ibn Kathir?", a: "Reports of past nations", wrong: ["Old recipes", "Ancient maps", "Royal songs"], why: "Reports about the nations of the past and what happened to them when they went against the commandments of Allah." },
        { q: "Who benefits from the reminder, in 24:34?", a: "Those who have Taqwa", wrong: ["Those who sleep", "Those who mock", "Those who are rich"], why: "And an admonition for those who have Taqwa." }
      ]
    }
  ]
};

export const NUR_UNITS: readonly DeepUnit[] = [NUR_ONE];
