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

/** Ayahs 35 to 64: the parable of Allah's Light, the masjids and the men who fill them, everything glorifying Allah, clouds and creatures, "we hear and we obey", and the manners of home and gatherings. */
const NUR_TWO: DeepUnit = {
  key: "nur2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-24",
  name: "An-Nur, ayahs 35 to 64",
  kind: "skill",
  lessonType: "surah",
  surahName: "An-Nur",
  lessons: [
    {
      slug: "light-of-the-heavens",
      title: "The Light of the heavens and earth",
      line: "Allah is the Light of the heavens and the earth.",
      facts: ["Ibn Abbas: He guides all who live in them", "By His Light they are lit up"],
      quote: q24(35),
      source: ik(35, "Allah is the Light of the heavens and the earth. Ibn Abbas said it means He is the Guide of all who live in them. As-Suddi said by His Light the heavens and earth are lit up.", "means, the Guide of the inhabitants of the heavens and the earth"),
      difficulty: 2,
      questions: [
        { q: "What is Allah, in 24:35?", a: "The Light of the heavens and earth", wrong: ["A star in the sky", "The sun", "A lamp in a house"], why: "Allah is the Light of the heavens and the earth." },
        { q: "What does it mean, per Ibn Abbas?", a: "Guide of all who live in them", wrong: ["Maker of lamps", "Owner of the sun only", "Keeper of fire"], why: "Means, the Guide of the inhabitants of the heavens and the earth." },
        { tf: true, q: "As-Suddi said the heavens and earth are lit by His Light.", why: "By His Light the heavens and earth are illuminated." }
      ]
    },
    {
      slug: "night-prayer-dua-of-light",
      title: "The night prayer dua",
      line: "At night prayer, the Prophet ﷺ praised Allah as the Light.",
      facts: ["He prayed it at Tahajjud", "It praises Allah, Lord of all"],
      quote: q24(35),
      source: hadith("bukhari", "1120", "Abdullah ibn Abbas", "Sahih", "When the Prophet ﷺ got up for the night prayer he would say: O Allah, all praise is Yours, You are the Holder of the heavens and earth, and You are the Light of the heavens and the earth.", "You are the Light of the Heavens and the Earth"),
      difficulty: 2,
      questions: [
        { q: "When did the Prophet ﷺ say this dua?", a: "Rising for the night prayer", wrong: ["At lunch", "On a journey only", "At the market"], why: "When the Prophet ﷺ got up at night to offer the Tahajjud prayer, he used to say." },
        { q: "What does the dua call Allah?", a: "The Light of the heavens and earth", wrong: ["The lamp of the house", "The moon of the night", "One of many lights"], why: "You are the Light of the Heavens and the Earth." },
        { tf: true, q: "The dua begins by praising Allah.", why: "O Allah! All the praises are for you, You are the Holder of the Heavens and the Earth." }
      ]
    },
    {
      slug: "lamp-in-a-niche",
      title: "A lamp in a niche",
      line: "A believer's heart is like a bright lamp in clear glass.",
      facts: ["The Quran is like pure, shining oil", "Light upon light"],
      quote: q24(35),
      source: ik(35, "Allah gives a parable: a lamp in a niche, inside clear glass, lit with pure olive oil. The believer's pure heart is the lamp in the glass, and the Quran and Shari'ah that guide it are the pure, shining oil.", "The heart of the believer in its purity and clarity is likened to a lamp in transparent and jewel-like glass"),
      difficulty: 2,
      questions: [
        { q: "Where is the lamp, in 24:35?", a: "In a glass, in a niche", wrong: ["Under the sea", "On a mountain", "In a cave"], why: "The parable of His Light is as a niche and within it a lamp: the lamp is in a glass." },
        { q: "What is like the lamp in the glass, per Ibn Kathir?", a: "The believer's pure heart", wrong: ["The sun", "A king's palace", "A mirror"], why: "The heart of the believer in its purity and clarity is likened to a lamp in transparent and jewel-like glass." },
        { q: "What is like the pure shining oil?", a: "The Quran and Shari'ah", wrong: ["Gold coins", "Rain water", "Fresh milk"], why: "The Qur'an and Shari'ah by which it is guided are likened to good, pure, shining oil." }
      ]
    },
    {
      slug: "houses-of-allah",
      title: "The houses of Allah",
      line: "Masjids are Allah's houses, kept clean, where He is remembered.",
      facts: ["Idle talk is not for the masjid", "His Name is glorified morning and evening"],
      quote: q24(36),
      source: ik(36, "Allah's light belongs in the masjids, the places on earth He loves most. The masjids are His houses where He alone is worshipped. Allah ordered them raised and kept clean of filth and idle talk.", "The Masjids are His houses where He Alone is worshipped"),
      difficulty: 3,
      questions: [
        { q: "What happens in these houses, in 24:36?", a: "Allah's Name is remembered", wrong: ["People sell goods", "People play games", "People sleep all day"], why: "In houses which Allah has ordered to be raised, in them His Name is remembered." },
        { q: "What are the masjids, per Ibn Kathir?", a: "His houses where He alone is worshipped", wrong: ["Markets", "Schools only", "Places for parties"], why: "The Masjids are His houses where He Alone is worshipped." },
        { q: "What did Allah forbid in the masjids, per Ibn Abbas?", a: "Idle talk", wrong: ["Remembering Allah", "Praying", "Reading Quran"], why: "Allah forbade idle talk in them." }
      ]
    },
    {
      slug: "build-a-masjid",
      title: "Build a masjid, get a home",
      line: "Whoever builds a masjid for Allah gets a home in Paradise.",
      facts: ["Uthman rebuilt the Prophet's ﷺ masjid", "It must be for Allah's pleasure"],
      quote: q24(36),
      source: hadith("bukhari", "450", "Uthman ibn Affan", "Sahih", "When people argued about Uthman rebuilding the Prophet's ﷺ masjid, he said he heard the Prophet ﷺ say: whoever builds a masjid for Allah's pleasure, Allah builds for him a similar place in Paradise.", "Allah would build for him a similar place in Paradise"),
      difficulty: 3,
      questions: [
        { q: "What does Allah build for one who builds a masjid?", a: "A similar place in Paradise", wrong: ["A palace on earth", "A big shop", "Nothing"], why: "Allah would build for him a similar place in Paradise." },
        { q: "Which masjid did Uthman rebuild?", a: "The Prophet's ﷺ masjid", wrong: ["A masjid in Egypt", "A masjid in Syria", "No masjid"], why: "His intention to reconstruct the mosque of Allah's Messenger." },
        { tf: true, q: "The builder should intend Allah's pleasure.", why: "Whoever built a mosque, intending Allah's Pleasure." }
      ]
    },
    {
      slug: "trade-does-not-distract",
      title: "Trade does not distract them",
      line: "Their shopping and selling never keep them from Allah.",
      facts: ["Ibn Umar saw shops close for prayer", "What Allah has is better and lasting"],
      quote: q24(37),
      source: ik(37, "These men do not let trade or selling distract them from remembering Allah, praying and giving zakah. They know what Allah has is better and lasting. Ibn Umar saw people in the market close their shops for prayer.", "they give priority to obeying Allah and doing what He wants and what pleases Him"),
      difficulty: 3,
      questions: [
        { q: "What does not distract these men, in 24:37?", a: "Trade and business", wrong: ["Prayer", "Zakah", "Remembering Allah"], why: "Men whom neither trade nor business diverts from the remembrance of Allah." },
        { q: "What do they put first, per Ibn Kathir?", a: "Obeying Allah", wrong: ["Their profits", "Their games", "Their sleep"], why: "They give priority to obeying Allah and doing what He wants and what pleases Him." },
        { q: "What did the market people do at the iqamah?", a: "Closed their stores for prayer", wrong: ["Sold even more", "Went home to sleep", "Ignored it"], why: "They closed their stores and entered the Masjid." }
      ]
    },
    {
      slug: "deeds-like-a-mirage",
      title: "Deeds like a mirage",
      line: "Deeds without faith are like a mirage: water that is not there.",
      facts: ["A thirsty man runs to it", "He finds nothing when he arrives"],
      quote: q24(39),
      source: ik(39, "Allah compares the deeds of disbelievers who think they are doing well to a mirage in a flat desert. From far away it looks like water, but when the thirsty man reaches it he finds nothing.", "Their likeness is that of a mirage which is seen in a desert plain"),
      difficulty: 3,
      questions: [
        { q: "What are their deeds like, in 24:39?", a: "A mirage", wrong: ["A river", "A garden", "A well"], why: "As for those who disbelieved, their deeds are like a mirage." },
        { q: "What does the thirsty man think the mirage is?", a: "Water", wrong: ["Gold", "A house", "A friend"], why: "The thirsty one thinks it to be water until he comes up to it, he finds it to be nothing." },
        { q: "What is a Qi'ah, per Ibn Kathir?", a: "A vast, flat land", wrong: ["A deep sea", "A tall mountain", "A thick forest"], why: "The word Qi'ah refers to a vast, flat, level area of land in which the mirage may appear." }
      ]
    },
    {
      slug: "darkness-upon-darkness",
      title: "Darkness upon darkness",
      line: "Without Allah's guidance, a heart is like a dark, deep sea.",
      facts: ["Waves on waves, clouds on top", "No light except from Allah"],
      quote: q24(40),
      source: ik(40, "Another parable: darkness in a deep sea, waves upon waves, with clouds above, so dark a man can hardly see his own hand. Whoever Allah does not give light has no light.", "he can hardly see it because it is so intensely dark"),
      difficulty: 4,
      questions: [
        { q: "What covers the deep sea, in 24:40?", a: "Waves upon waves and clouds", wrong: ["Sunlight", "Ice and snow", "Boats and ships"], why: "Overwhelmed with waves topped by waves, topped by dark clouds." },
        { q: "What can a man hardly see there?", a: "His own hand", wrong: ["The sun", "A ship", "A fish"], why: "If a man stretches out his hand, he can hardly see it!" },
        { q: "Who has no light, in 24:40?", a: "One Allah gives no light", wrong: ["One without a lamp", "One who sleeps", "One at sea"], why: "And he for whom Allah has not appointed light, for him there is no light." }
      ]
    },
    {
      slug: "birds-glorify-allah",
      title: "Birds glorify Allah",
      line: "Everything glorifies Allah, even birds with wings spread.",
      facts: ["Each knows its own prayer and praise", "Allah taught each its way"],
      quote: q24(41),
      source: ik(41, "Everyone in the heavens and earth glorifies Allah: angels, people, jinn, animals, even objects. Birds glorify their Lord while flying, and each creature knows its own way of worship.", "while they are flying they glorify their Lord"),
      difficulty: 4,
      questions: [
        { q: "Which creatures are named in 24:41?", a: "Birds with wings outspread", wrong: ["Fish in the sea", "Lions in the forest", "Ants in a hill"], why: "And the birds with wings outspread." },
        { q: "When do birds glorify Allah, per Ibn Kathir?", a: "While they are flying", wrong: ["Only at night", "Only in nests", "Never"], why: "While they are flying they glorify their Lord." },
        { tf: true, q: "Each creature knows its own prayer and glorification.", why: "Of each one He knows indeed his Salah and his glorification." }
      ]
    },
    {
      slug: "allah-drives-the-clouds",
      title: "Allah drives the clouds",
      line: "Allah gently moves clouds, piles them up, and rain comes out.",
      facts: ["He joins scattered clouds", "Night and day take turns"],
      quote: q24(43),
      source: ik(43, "Allah drives the clouds gently when they are first formed, joins them after they were scattered, and piles them up in layers. Then you see the rain come out from the gaps between them.", "He piles them up on top of one another"),
      difficulty: 4,
      questions: [
        { q: "How does Allah drive the clouds, in 24:43?", a: "Gently", wrong: ["Roughly", "Never", "Only in summer"], why: "See you not that Allah drives the clouds gently." },
        { q: "What does Allah do with the clouds, per Ibn Kathir?", a: "Piles them up in layers", wrong: ["Paints them", "Freezes them", "Melts them"], why: "He piles them up on top of one another." },
        { q: "Where does the rain come from, in 24:43?", a: "From between the clouds", wrong: ["From the ground", "From the mountains", "From the sea directly"], why: "And you see the rain come forth from between them." }
      ]
    },
    {
      slug: "creatures-from-water",
      title: "Every creature from water",
      line: "Allah made every moving creature from water, in many shapes.",
      facts: ["Some creep, some walk on two or four", "Allah creates what He wills"],
      quote: q24(45),
      source: ik(45, "Allah created every moving creature from water. Some creep on their bellies like snakes, some walk on two legs like people and birds, and some on four like cattle. Allah creates what He wills.", "from one kind of water"),
      difficulty: 4,
      questions: [
        { q: "From what did Allah create every creature, in 24:45?", a: "Water", wrong: ["Fire", "Light", "Stone"], why: "Allah has created every moving creature from water." },
        { q: "Which walk on two legs, per Ibn Kathir?", a: "Humans and birds", wrong: ["Snakes", "Cattle", "Fish"], why: "And some that walk on two legs, like humans and birds." },
        { q: "Which creep on their bellies, per Ibn Kathir?", a: "Snakes and the like", wrong: ["Horses", "Birds", "People"], why: "Of them there are some that creep on their bellies, like snakes and so on." }
      ]
    },
    {
      slug: "we-hear-and-we-obey",
      title: "We hear and we obey",
      line: "When called to Allah and His Messenger ﷺ, believers obey.",
      facts: ["Hypocrites turned away", "The obedient are the successful"],
      quote: q24(51),
      source: ik(51, "Hypocrites said they obeyed but turned away. True believers, when called to Allah and His Messenger ﷺ, say: we hear and we obey. Allah calls them successful: they get what they want and are saved from what they fear.", "which is achieving what one wants and being saved from what one fears"),
      difficulty: 4,
      questions: [
        { q: "What do believers say, in 24:51?", a: "We hear and we obey", wrong: ["We will think about it", "Not today", "Ask someone else"], why: "Is that they say: We hear and we obey. And such are the successful." },
        { q: "What is success, per Ibn Kathir?", a: "Getting what you want, safe from what you fear", wrong: ["Getting rich fast", "Being famous", "Winning arguments"], why: "Achieving what one wants and being saved from what one fears." },
        { q: "Who are the successful, in 24:52?", a: "Those who obey Allah and His Messenger", wrong: ["Those who argue most", "Those with most money", "Those who turn away"], why: "And whosoever obeys Allah and His Messenger, fears Allah, and has Taqwa of Him, such are the successful." }
      ]
    },
    {
      slug: "promise-of-succession",
      title: "Allah's promise to the believers",
      line: "Allah promised believers strength and safety after fear.",
      facts: ["It came true for the Prophet's ﷺ Ummah", "The condition: worship Allah alone"],
      quote: q24(55),
      source: ik(55, "Allah promised those who believe and do good that He would make them successors in the land, let them practise their religion, and give them safety after fear. Allah fulfilled this for the Ummah of His Messenger ﷺ.", "He would cause his Ummah to become successors on earth"),
      difficulty: 4,
      questions: [
        { q: "What will believers get after fear, in 24:55?", a: "Safety and security", wrong: ["More fear", "Nothing", "Endless war"], why: "And He will surely give them in exchange a safe security after their fear." },
        { q: "What is the condition, in 24:55?", a: "Worship Allah, no partners", wrong: ["Be very rich", "Build tall towers", "Have big armies"], why: "If they worship Me and do not associate anything with Me." },
        { tf: true, q: "Ibn Kathir says Allah fulfilled the promise for the Ummah.", why: "This is what Allah did indeed do, may He be glorified and exalted." }
      ]
    },
    {
      slug: "pray-give-obey",
      title: "Pray, give, obey",
      line: "Pray, give zakah, and obey the Messenger ﷺ to get mercy.",
      facts: ["Zakah is kindness to the poor", "Obeying brings Allah's mercy"],
      quote: q24(56),
      source: ik(56, "Allah commands prayer, worshipping Him alone, and zakah, a kindness to His poor and weak creatures, and obeying the Messenger ﷺ so that Allah has mercy on them.", "which is an act of kindness towards His poor and weak creatures"),
      difficulty: 5,
      questions: [
        { q: "What three things are commanded, in 24:56?", a: "Salah, Zakah, obey the Messenger ﷺ", wrong: ["Sleep, eat, play", "Travel, trade, build", "Hunt, fish, farm"], why: "And perform the Salah, and give the Zakah and obey the Messenger ﷺ that you may receive mercy." },
        { q: "What is zakah, per Ibn Kathir?", a: "Kindness to the poor and weak", wrong: ["A tax for kings", "A gift to the rich", "A game"], why: "To pay the Zakah, which is an act of kindness towards His poor and weak creatures." },
        { q: "What do the obedient receive, in 24:56?", a: "Mercy", wrong: ["Fame", "Punishment", "Nothing"], why: "That you may receive mercy." }
      ]
    },
    {
      slug: "three-times-of-rest",
      title: "Three times to knock",
      line: "Children knock before entering at three times of family rest.",
      facts: ["Before Fajr, midday rest, after Isha", "Other times they may come in freely"],
      quote: q24(58),
      source: ik(58, "Allah tells families that young children and helpers should ask permission at three private times: before Fajr, at the midday rest, and after Isha, because people are resting or asleep then.", "because people are asleep in their beds at that time"),
      difficulty: 5,
      questions: [
        { q: "Which time is first, in 24:58?", a: "Before the Fajr prayer", wrong: ["After lunch", "At sunset", "At noon prayer"], why: "Before the Fajr prayer, and while you put off your clothes during the afternoon, and after the Isha prayer." },
        { q: "Why ask before Fajr, per Ibn Kathir?", a: "People are asleep", wrong: ["The door is broken", "It is too hot", "It is market time"], why: "Because people are asleep in their beds at that time." },
        { tf: true, q: "At other times there is no sin in moving about the home.", why: "Other than these times there is no sin on you or on them to move about." }
      ]
    },
    {
      slug: "salam-when-entering",
      title: "Salam when you come home",
      line: "When you enter a home, greet with a blessed, good salam.",
      facts: ["Greet your family with salam", "Eating together or apart is fine"],
      quote: q24(61),
      source: ik(61, "When you enter houses, greet one another with a greeting from Allah, blessed and good. Many scholars said it means salam. Mujahid said if a house is empty, say peace upon us and upon Allah's righteous servants.", "This means greet one another with Salam"),
      difficulty: 5,
      questions: [
        { q: "What should you do on entering houses, in 24:61?", a: "Greet with a greeting from Allah", wrong: ["Stay silent", "Shout loudly", "Take your shoes off only"], why: "But when you enter the houses, greet one another with a greeting from Allah, blessed and good." },
        { q: "What is that greeting, per the scholars?", a: "Salam", wrong: ["A wave", "A handshake only", "A song"], why: "This means greet one another with Salam." },
        { tf: true, q: "Allah says no sin whether you eat together or apart.", why: "No sin on you whether you eat together or apart." }
      ]
    },
    {
      slug: "salam-when-leaving",
      title: "Salam when you leave",
      line: "Ask before leaving a gathering, and say salam as you go.",
      facts: ["Believers asked the Prophet ﷺ before leaving", "Salam on leaving is as due as on arriving"],
      quote: q24(62),
      source: hadith("abudawud", "5208", "Abu Hurairah", "Hasan Sahih", "The Prophet ﷺ said: when one of you comes to a gathering, he should give salam, and when he wants to get up, he should give salam, for the first is not more of a duty than the last.", "When one of you comes to an assembly, he should give a salutation"),
      difficulty: 5,
      questions: [
        { q: "What did true believers do before leaving, in 24:62?", a: "Asked permission", wrong: ["Slipped away", "Ran out", "Said nothing"], why: "They go not away until they have asked his permission." },
        { q: "When should you say salam, per the hadith?", a: "On arriving and on leaving", wrong: ["Only arriving", "Only leaving", "Only at night"], why: "When one of you comes to an assembly, he should give a salutation and if he feels inclined to get up, he should give a salutation." },
        { tf: false, q: "The salam on arriving matters more than the salam on leaving.", why: "For the former is not more of a duty than the latter." }
      ]
    },
    {
      slug: "honor-the-messenger",
      title: "Honoring the Messenger ﷺ",
      line: "Call the Messenger ﷺ with respect, not like calling a friend.",
      facts: ["Say O Messenger of Allah", "Not just his first name"],
      quote: q24(63),
      source: ik(63, "People used to call him O Muhammad. Allah forbade calling him like they call each other, out of respect, and told them to say O Prophet of Allah or O Messenger of Allah ﷺ.", "Allah commanded that His Prophet should be treated with respect and honor"),
      difficulty: 5,
      questions: [
        { q: "What does 24:63 forbid?", a: "Calling him like calling each other", wrong: ["Praying at night", "Giving charity", "Visiting family"], why: "Make not the calling of the Messenger ﷺ among you as your calling one of another." },
        { q: "How should they address him, per Ibn Abbas?", a: "O Messenger of Allah", wrong: ["Hey you", "O friend", "O neighbor"], why: "And told them to say, O Prophet of Allah, O Messenger of Allah." },
        { q: "Why, per Qatadah?", a: "To treat him with respect and honor", wrong: ["To save time", "To be loud", "No reason"], why: "Allah commanded that His Prophet should be treated with respect and honor." }
      ]
    },
    {
      slug: "allah-knows-your-condition",
      title: "Allah knows your condition",
      line: "Everything belongs to Allah, and He knows what we do.",
      facts: ["Not one speck is hidden from Him", "He will tell us what we did"],
      quote: q24(64),
      source: ik(64, "The surah ends: to Allah belongs all in the heavens and earth. He knows the seen and unseen, what His servants do in secret and openly, and on the Day they return He will tell them what they did.", "He knows what His servants do in secret and in the open"),
      difficulty: 5,
      questions: [
        { q: "To whom belongs all in the heavens and earth, in 24:64?", a: "Allah", wrong: ["Kings", "Angels", "Nobody"], why: "Certainly, to Allah belongs all that is in the heavens and the earth." },
        { q: "What does Allah know, per Ibn Kathir?", a: "What we do secretly and openly", wrong: ["Only open deeds", "Only big deeds", "Only good deeds"], why: "He knows what His servants do in secret and in the open." },
        { tf: true, q: "On the Day of return, Allah will inform people of what they did.", why: "And the Day when they will be brought back to Him, then He will inform them of what they did." }
      ]
    }
  ]
};

export const NUR_UNITS: readonly DeepUnit[] = [NUR_ONE, NUR_TWO];
