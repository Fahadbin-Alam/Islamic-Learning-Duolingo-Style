import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Al-Kahf ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Kahf 18:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_18_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Kahf 18:${ayah}`,
    url: `https://quran.com/18:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 18:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q18 = (ayah: number) => quranQuote(18, ayah);

/** Ayahs 1 to 31: the straight Book, the world as a test, the young men of the Cave, saying If Allah wills, and good company. */
const KAHF_ONE: DeepUnit = {
  key: "kahf1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-kahf",
  name: "Al-Kahf, ayahs 1 to 31",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Kahf",
  lessons: [
    {
      slug: "a-book-without-crookedness",
      title: "A Book without crookedness",
      line: "Praise Allah, who sent down a straight Book with no twist.",
      facts: ["Brings people to light", "Good news and a warning"],
      quote: q18(1),
      source: ik(1, "Allah praises Himself for sending down the Quran, His greatest blessing to people. It is straight and clear, with nothing twisted or confusing in it.", "there is nothing twisted or confusing about it"),
      difficulty: 2,
      questions: [
        { q: "With what does Al-Kahf open, in 18:1?", a: "All praise is due to Allah", wrong: ["Say: He is One", "O you who believe", "By the dawn"], why: "All praise is due to Allah, Who has sent down to His servant the Book." },
        { q: "What has Allah not placed in the Book, in 18:1?", a: "Any crookedness", wrong: ["Any stories", "Any guidance", "Any ayahs"], why: "And has not placed therein any crookedness." },
        { q: "What does no crookedness mean, per Ibn Kathir?", a: "Nothing twisted or confusing", wrong: ["No long surahs", "No old words", "No stories"], why: "Meaning, there is nothing twisted or confusing about it." }
      ]
    },
    {
      slug: "the-tranquillity-came-down",
      title: "The tranquillity came down",
      line: "A cloud of Sakinah came down as a man recited Al-Kahf.",
      facts: ["His horse grew restless", "Sakinah comes with the Quran"],
      quote: q18(1),
      source: hadith("bukhari", "5011", "Al-Bara ibn Azib", "Sahih", "A man was reciting Al-Kahf when a cloud came down over him and his horse grew restless. The Prophet ﷺ said it was As-Sakinah, tranquillity, that came down because of the Quran.", "A cloud came down and spread over that man"),
      difficulty: 3,
      questions: [
        { q: "Which surah was the man reciting, in the hadith?", a: "Al-Kahf", wrong: ["Al-Mulk", "Yasin", "Al-Baqarah"], why: "A man was reciting Surat Al-Kahf and his horse was tied with two ropes beside him." },
        { q: "What came down over him?", a: "A cloud", wrong: ["Rain", "A bird", "Snow"], why: "A cloud came down and spread over that man." },
        { q: "What did the Prophet ﷺ call it?", a: "As-Sakinah, tranquillity", wrong: ["A storm", "A dream", "A warning"], why: "The Prophet ﷺ said, That was As-Sakina (tranquility) which descended because of the Quran." }
      ]
    },
    {
      slug: "the-first-ten-ayahs",
      title: "The first ten ayahs",
      line: "Memorising its first ten ayahs protects from the Dajjal.",
      facts: ["Learn them by heart", "A shield in hard times"],
      quote: q18(1),
      source: hadith("muslim", "809", "Abu ad-Darda", "Sahih", "The Prophet ﷺ said whoever learns by heart the first ten ayahs of Surah Al-Kahf will be protected from the Dajjal.", "he will be protected from the Dajjal"),
      difficulty: 3,
      questions: [
        { q: "How many ayahs should be memorised, in the hadith?", a: "The first ten", wrong: ["The first three", "The last two", "All of it"], why: "If anyone learns by heart the first ten verses of the Surah al-Kahf, he will be protected from the Dajjal." },
        { q: "From whom do they protect, in the hadith?", a: "The Dajjal", wrong: ["Hunger", "Sleep", "Thieves"], why: "He will be protected from the Dajjal." },
        { q: "Ibn Kathir lists the Dajjal hadith among the virtues of Al-Kahf.", tf: true, why: "Whoever memorizes ten Ayat from the beginning of Surat Al-Kahf will be protected from the Dajjal. This was also recorded by Muslim." }
      ]
    },
    {
      slug: "good-news-and-warning",
      title: "Good news and a warning",
      line: "The Quran warns deniers and gives believers good news of reward.",
      facts: ["A fair, lasting reward", "No child for Allah"],
      quote: q18(2),
      source: ik(2, "The straight Book warns those who reject it and gives good news to believers who do good deeds: a beautiful reward that never ends. It also denies the lie that Allah has a child.", "giving a warning to the disbelievers and good news to the believers"),
      difficulty: 3,
      questions: [
        { q: "Whom does the Book give good news to, in 18:2?", a: "Believers who do good", wrong: ["Everyone equally", "Only the rich", "Only scholars"], why: "To give good news to the believers, who do righteous deeds, that they shall have a fair reward." },
        { q: "How long is the reward, in 18:3?", a: "Forever", wrong: ["A year", "Until old age", "One day"], why: "They shall abide therein forever, meaning for always, never ending." },
        { q: "Which claim does 18:4 warn against?", a: "That Allah has a child", wrong: ["That Allah is One", "That the Quran is true", "That Paradise is real"], why: "And to warn those who say, Allah has begotten a child." }
      ]
    },
    {
      slug: "do-not-grieve-too-much",
      title: "Do not grieve too much",
      line: "Do not wear yourself out with grief; just convey the message.",
      facts: ["Guidance is from Allah", "Our job is to deliver"],
      quote: q18(6),
      source: ik(6, "Allah comforts His Messenger ﷺ, who was deeply sad that people would not believe: do not destroy yourself with sorrow, just convey the Message of Allah.", "just convey the Message of Allah to them"),
      difficulty: 3,
      questions: [
        { q: "Why was he ﷺ sad, in 18:6?", a: "People would not believe", wrong: ["He was hungry", "He was lost", "He was tired"], why: "Perhaps, you would kill yourself in grief, because they believe not in this narration." },
        { q: "What should he ﷺ do instead, per Ibn Kathir?", a: "Just convey the Message", wrong: ["Stop teaching", "Force them", "Leave people"], why: "Do not feel sorry for them, just convey the Message of Allah to them." },
        { q: "Whose loss is it if someone goes astray, per Ibn Kathir?", a: "His own", wrong: ["The teacher's", "His town's", "No one's"], why: "Whoever goes astray, then he strays at his own loss." }
      ]
    },
    {
      slug: "the-world-is-a-test",
      title: "The world is a test",
      line: "The earth's beauty is a test of who does the best deeds.",
      facts: ["Beauty does not last", "A trial, not a home"],
      quote: q18(7),
      source: ik(7, "Allah made this world a short stay, adorned with passing beauty, as a place of trial, not a place to settle. Its beauty will one day turn to bare, dry ground.", "He made it a place of trial"),
      difficulty: 3,
      questions: [
        { q: "Why did Allah adorn the earth, in 18:7?", a: "To test who is best in deeds", wrong: ["To make us lazy", "For no reason", "To make us rich"], why: "We have made that which is on earth an adornment for it, in order that We may test which of them are best in deeds." },
        { q: "What will the earth become, in 18:8?", a: "Bare, dry soil", wrong: ["A garden forever", "A sea", "Gold"], why: "And verily, We shall make all that is on it bare, dry soil." },
        { q: "Ibn Kathir calls this world a place to settle forever.", tf: false, why: "He made it a place of trial, not a place of settlement." }
      ]
    },
    {
      slug: "a-sign-among-many",
      title: "A sign among many",
      line: "The Cave is amazing, but Allah's other signs are greater still.",
      facts: ["Heavens and earth", "Night and day"],
      quote: q18(9),
      source: ik(9, "The story of the Cave was not more amazing than Allah's other signs: the heavens and earth, night and day, sun and moon. He is able to do even more amazing things.", "He is not incapable of doing more amazing things"),
      difficulty: 3,
      questions: [
        { q: "Who are named in 18:9?", a: "People of Al-Kahf and Ar-Raqim", wrong: ["People of Ad", "People of Lut", "People of the Ditch"], why: "Do you think that the people of Al-Kahf and Ar-Raqim were a wonder among Our signs?" },
        { q: "What is Al-Kahf, per Ibn Kathir?", a: "A cave in a mountain", wrong: ["A palace", "A ship", "A garden"], why: "Al-Kahf refers to a cave in a mountain, which is where the young men sought refuge." },
        { q: "Is the Cave Allah's most amazing sign, per Ibn Kathir?", a: "No, His signs include greater ones", wrong: ["Yes, the greatest", "It is not a sign", "No one knows"], why: "He is not incapable of doing more amazing things than the story of the people of the Cave." }
      ]
    },
    {
      slug: "the-young-mens-dua",
      title: "The young men's dua",
      line: "Fleeing for their faith, they asked Allah for mercy.",
      facts: ["Mercy from Allah", "A good end to their affair"],
      quote: q18(10),
      source: ik(10, "The young men fled from their people to keep their religion and hid in a cave. They asked Allah for His mercy, to hide them from their people, and to grant them a good end.", "give us Your mercy and conceal us from our people"),
      difficulty: 3,
      questions: [
        { q: "What did they ask for first, in 18:10?", a: "Mercy from Allah", wrong: ["Gold", "A king", "Food"], why: "Our Lord! Bestow on us mercy from Yourself." },
        { q: "Why did they flee, per Ibn Kathir?", a: "For the sake of their religion", wrong: ["For trade", "For adventure", "To find water"], why: "Those young men fled from their people for the sake of their religion, fearing persecution." },
        { q: "What did Allah do once they entered, in 18:11?", a: "Made them sleep for years", wrong: ["Sent them home", "Gave them a ship", "Made them kings"], why: "We covered up their hearing in the cave for a number of years, meaning We caused them to sleep." }
      ]
    },
    {
      slug: "young-hearts-accept-truth",
      title: "Young hearts accept truth",
      line: "They were young believers, and Allah increased their guidance.",
      facts: ["Youth are often first to accept", "Faith can increase"],
      quote: q18(13),
      source: ik(13, "The people of the Cave were young men, who are often more open to truth than elders set in their ways. Most of the first Muslims too were young. Allah increased them in guidance, showing faith can grow.", "they were more accepting of the truth and more guided than the elders"),
      difficulty: 3,
      questions: [
        { q: "Who were they, in 18:13?", a: "Young men who believed", wrong: ["Old kings", "Soldiers", "Merchants"], why: "Truly, they were young men who believed in their Lord, and We increased them in guidance." },
        { q: "Who mostly answered the Prophet ﷺ first, per Ibn Kathir?", a: "Young people", wrong: ["The elders of Quraysh", "Foreign kings", "Rich traders"], why: "Most of those who responded to Allah and His Messenger were young people." },
        { q: "What does 18:13 show about faith, per Ibn Kathir?", a: "It can increase", wrong: ["It never changes", "It is fixed at birth", "It is only words"], why: "Several scholars understood that faith may increase, that it may vary in degrees." }
      ]
    },
    {
      slug: "hearts-made-firm",
      title: "Hearts made firm",
      line: "Allah made their hearts firm to declare Him their only Lord.",
      facts: ["They left a life of ease", "They would call on none but Him"],
      quote: q18(14),
      source: ik(14, "Allah gave the young men patience to stand against their people and leave a life of luxury. They declared that their Lord is the Lord of the heavens and earth, and they would call on no other god.", "We gave them the patience to go against their people"),
      difficulty: 4,
      questions: [
        { q: "What did Allah do to their hearts, in 18:14?", a: "Made them firm and strong", wrong: ["Made them afraid", "Made them sleep", "Made them forget"], why: "And We made their hearts firm and strong when they stood up." },
        { q: "What did they declare, in 18:14?", a: "Our Lord is Lord of heavens and earth", wrong: ["We follow our fathers", "We fear the king", "We want gold"], why: "Our Lord is the Lord of the heavens and the earth, never shall we call upon any god other than Him." },
        { q: "What did they leave behind, per Ibn Kathir?", a: "A life of luxury and ease", wrong: ["A war", "A prison", "A desert"], why: "To leave behind the life of luxury and ease that they had been living." }
      ]
    },
    {
      slug: "the-sun-passed-them-by",
      title: "The sun passed them by",
      line: "The sun turned away from them, rising and setting.",
      facts: ["A sign of Allah", "Allah guides whom He wills"],
      quote: q18(17),
      source: ik(17, "As the sun rose and set, its light leaned away from the sleepers in the middle of the cave. Ibn Kathir explains the cave faced north, and calls this one of Allah's signs.", "the entrance to the cave faced north"),
      difficulty: 4,
      questions: [
        { q: "Which way did the sun turn when rising, in 18:17?", a: "To the right of their cave", wrong: ["Straight onto them", "Into their faces", "It never rose"], why: "You might have seen the sun, when it rose, declining to the right from their cave." },
        { q: "Which way did the cave face, per Ibn Kathir?", a: "North", wrong: ["East", "South", "West"], why: "This indicates that the entrance to the cave faced north." },
        { q: "What does 18:17 call the sun passing them?", a: "One of the Ayat of Allah", wrong: ["Chance", "Magic", "A dream"], why: "That is from the Ayat of Allah." }
      ]
    },
    {
      slug: "asleep-yet-seeming-awake",
      title: "Asleep, yet seeming awake",
      line: "They seemed awake while asleep, and their dog lay at the door.",
      facts: ["Turned right and left", "The dog guarded the door"],
      quote: q18(18),
      source: ik(18, "Their eyes stayed open so they looked awake. Allah turned them from side to side, and their dog lay at the threshold as if guarding them, sharing in their blessing.", "Their dog lay down at the door, as is the habit of dogs"),
      difficulty: 3,
      questions: [
        { q: "How did they look, in 18:18?", a: "Awake, though asleep", wrong: ["Old and weak", "Gone", "Afraid"], why: "And you would have thought them awake, whereas they were asleep." },
        { q: "Where was their dog, per Ibn Kathir?", a: "At the door", wrong: ["Outside the town", "On a hill", "In the middle"], why: "Their dog lay down at the door, as is the habit of dogs." },
        { q: "Who turned them on their sides, in 18:18?", a: "Allah", wrong: ["Their dog", "Visitors", "The wind"], why: "And We turned them on their right and on their left sides." }
      ]
    },
    {
      slug: "a-day-or-part-of-a-day",
      title: "A day or part of a day",
      line: "Waking after centuries, they thought they slept a day.",
      facts: ["Allah knows best", "Bodies kept intact"],
      quote: q18(19),
      source: ik(19, "Allah woke them with their bodies, hair and skin unchanged. Having entered in the morning and woken in the evening, they guessed they had slept a day or part of one.", "they entered the cave at the beginning of the day"),
      difficulty: 3,
      questions: [
        { q: "How long did they think they slept, in 18:19?", a: "A day or part of a day", wrong: ["A year", "A month", "A hundred years"], why: "They said: We have stayed a day or part of a day." },
        { q: "Why did they say part of a day, per Ibn Kathir?", a: "They woke near day's end", wrong: ["They counted wrong on purpose", "They had a clock", "An angel told them"], why: "Because they entered the cave at the beginning of the day, and they woke up at the end of the day." },
        { q: "What did they then say, in 18:19?", a: "Your Lord knows best", wrong: ["Let us go home", "We are lost", "Let us sleep"], why: "They said: Your Lord knows best how long you have stayed." }
      ]
    },
    {
      slug: "the-purest-food",
      title: "The purest food",
      line: "They sent one with a silver coin to buy the purest food.",
      facts: ["Azka means purest", "Be careful and quiet"],
      quote: q18(19),
      source: ik(19, "Hungry after waking, they sent one of them with a silver coin to the town to find the purest food, and told him to be careful so no one would discover them.", "Azka means"),
      difficulty: 4,
      questions: [
        { q: "What did they send to buy food with, in 18:19?", a: "A silver coin", wrong: ["A gold bar", "A sheep", "A sword"], why: "So send one of you with this silver coin of yours to the town." },
        { q: "What does Azka mean, per Ibn Kathir?", a: "Purest", wrong: ["Cheapest", "Largest", "Sweetest"], why: "Azka means purest, from the same root as Zakah, which purifies." },
        { q: "What was the messenger told, in 18:19?", a: "Be careful, let no one know", wrong: ["Shout their names", "Bring the king", "Stay in town"], why: "And let him be careful and let no man know of you." }
      ]
    },
    {
      slug: "a-sign-of-the-hour",
      title: "A sign that the Hour is true",
      line: "Allah revealed the sleepers so people knew the Hour is true.",
      facts: ["Allah raises the dead", "His promise is true"],
      quote: q18(21),
      source: ik(21, "People of that time doubted the Resurrection, so Allah let them find the young men of the Cave as a proof that bodies will be raised.", "Allah resurrected the people of the Cave as a sign and proof of resurrection"),
      difficulty: 3,
      questions: [
        { q: "Why did Allah make their case known, in 18:21?", a: "So people know His promise is true", wrong: ["To make them kings", "To build a market", "To start a war"], why: "That they might know that the promise of Allah is true." },
        { q: "What did some people doubt, per Ibn Kathir?", a: "The Resurrection", wrong: ["The sunrise", "The rain", "The seasons"], why: "The people of that time were skeptical about the Resurrection." },
        { tf: true, q: "Per Ikrimah, the sleepers were a proof of resurrection.", why: "Allah resurrected the people of the Cave as a sign and proof of resurrection." }
      ]
    },
    {
      slug: "leave-the-number-to-allah",
      title: "Leave the number to Allah",
      line: "People argued about their number; Allah knows it best.",
      facts: ["Do not argue without proof", "Few know it"],
      quote: q18(22),
      source: ik(22, "People guessed three, five or seven. The best way in such matters is to leave knowledge to Allah and not argue about things without knowledge.", "the best thing to do in matters like this is to refer knowledge to Allah"),
      difficulty: 4,
      questions: [
        { q: "Who knows their number best, in 18:22?", a: "Allah", wrong: ["The townspeople", "The king", "The dog"], why: "Say: My Lord knows best their number; none knows them but a few." },
        { q: "What is best in such matters, per Ibn Kathir?", a: "Refer knowledge to Allah", wrong: ["Argue loudly", "Guess often", "Ask strangers"], why: "The best thing to do in matters like this is to refer knowledge to Allah." },
        { q: "What does guessing at the unseen mean, per Ibn Kathir?", a: "Speaking without knowledge", wrong: ["Wise thinking", "Reading books", "Counting well"], why: "Meaning that they spoke without knowledge, like a person who aims at an unknown target." }
      ]
    },
    {
      slug: "say-if-allah-wills",
      title: "Say: If Allah wills",
      line: "Never say you will do something tomorrow without In sha Allah.",
      facts: ["Remember Allah when you forget", "All plans need His will"],
      quote: q18(23),
      source: ik(23, "Allah teaches the manners of planning: whatever we intend to do in the future, we should link to Allah's will, and if we forget, say it when we remember.", "this should always be referred to the will of Allah"),
      difficulty: 3,
      questions: [
        { q: "What should we add when we plan, in 18:24?", a: "If Allah wills", wrong: ["If I can", "Maybe", "Nothing"], why: "And never say of anything, I shall do such and such thing tomorrow, except with: If Allah wills!" },
        { q: "What if we forget to say it, in 18:24?", a: "Remember Allah when you recall", wrong: ["It is too late", "Start again", "Nothing"], why: "And remember your Lord when you forget." },
        { q: "To whose will should future plans be linked, per Ibn Kathir?", a: "Allah's will", wrong: ["Our friends' will", "Luck", "The weather"], why: "This should always be referred to the will of Allah, the Knower of the Unseen." }
      ]
    },
    {
      slug: "allah-knows-how-long",
      title: "Allah knows how long",
      line: "They stayed three hundred years and nine more; Allah knows best.",
      facts: ["He knows the unseen", "He shares His rule with none"],
      quote: q18(25),
      source: ik(25, "Allah told the length of their stay, and taught that if we are asked about such things without knowledge, we should say Allah knows best, for only He knows the unseen.", "no one knows about that except Him"),
      difficulty: 4,
      questions: [
        { q: "How long did they stay, in 18:25?", a: "Three hundred years, adding nine", wrong: ["Forty years", "Seven years", "One thousand years"], why: "And they stayed in their cave three hundred years, adding nine." },
        { q: "With whom is the unseen, in 18:26?", a: "Allah", wrong: ["Wise men", "Stars", "Kings"], why: "Say: Allah knows best how long they stayed. With Him is the unseen of the heavens and the earth." },
        { q: "With whom does Allah share His rule, in 18:26?", a: "No one", wrong: ["The angels", "The Prophets", "The kings"], why: "And He makes none to share in His decision and His rule." }
      ]
    },
    {
      slug: "stay-with-those-who-remember",
      title: "Stay with those who remember",
      line: "Keep company with those who call on Allah morning and evening.",
      facts: ["Rich or poor alike", "Do not chase glitter"],
      quote: q18(28),
      source: ik(28, "Allah tells His Prophet ﷺ to sit patiently with those who remember Allah morning and evening, rich or poor, strong or weak, and not to turn his eyes to worldly glitter.", "sit with those who remember Allah"),
      difficulty: 3,
      questions: [
        { q: "With whom should we stay, in 18:28?", a: "Those who call on their Lord", wrong: ["Only the rich", "Only the famous", "No one"], why: "And keep yourself patiently with those who call on their Lord morning and afternoon, seeking His Face." },
        { q: "Does wealth matter for this company, per Ibn Kathir?", a: "No, rich or poor alike", wrong: ["Only the rich", "Only the strong", "Only elders"], why: "All the servants of Allah, whether rich or poor, strong or weak." },
        { q: "What should our eyes not chase, in 18:28?", a: "The glitter of this world", wrong: ["The Quran", "The sky", "Good friends"], why: "And let not your eyes overlook them, desiring the pomp and glitter of the life of the world." }
      ]
    },
    {
      slug: "six-companions-kept-close",
      title: "Six Companions kept close",
      line: "Leaders wanted poor believers sent away; Allah said keep them.",
      facts: ["Sa'd and Ibn Mas'ud were there", "Faith over status"],
      quote: q18(28),
      source: hadith("muslim", "2413", "Sa'd ibn Abi Waqqas", "Sahih", "Sa'd said six of them, including himself and Ibn Mas'ud, were with the Prophet ﷺ when the idolaters asked him to send them away. Allah revealed that he must not drive away those who call on their Lord.", "This verse was revealed in relation to six persons"),
      difficulty: 4,
      questions: [
        { q: "How many believers were there, in the hadith?", a: "Six", wrong: ["Two", "Ten", "Forty"], why: "This verse was revealed in relation to six persons and I and Ibn Mas'ud were amongst them." },
        { q: "What did the idolaters want?", a: "Them sent away", wrong: ["Them made leaders", "Them paid", "Them invited to eat"], why: "The polytheists said to him: Do not keep such persons near you." },
        { q: "Allah allowed sending the poor believers away.", tf: false, why: "Drive not away those who call upon their Lord morning and evening desiring only His pleasure." }
      ]
    },
    {
      slug: "the-truth-is-from-your-lord",
      title: "The truth is from your Lord",
      line: "The truth is from your Lord; each person chooses.",
      facts: ["The Quran is the truth", "Our choices matter"],
      quote: q18(29),
      source: ik(29, "The Prophet ﷺ is told to say that what he brought is the truth from Allah. Whoever wills may believe or not, and this is a stern warning for wrongdoers.", "What I have brought to you from your Lord is the truth"),
      difficulty: 4,
      questions: [
        { q: "Where is the truth from, in 18:29?", a: "Your Lord", wrong: ["The poets", "The kings", "The stars"], why: "And say: The truth is from your Lord." },
        { q: "What is the whoever-wills line, per Ibn Kathir?", a: "A stern warning", wrong: ["A joke", "A song", "A riddle"], why: "This is a type of threat and stern warning." },
        { tf: false, q: "Ibn Kathir says the truth from Allah has some doubt in it.", why: "What I have brought to you from your Lord is the truth, in which there is no confusion or doubt." }
      ]
    },
    {
      slug: "gardens-of-eden",
      title: "Gardens of Eden",
      line: "Allah never loses the reward of those who do good.",
      facts: ["Adn means lasting", "Rivers flow beneath"],
      quote: q18(30),
      source: ik(30, "Allah never wastes the reward of believers who do good well. They will have lasting gardens with rivers below, fine green garments, and a most excellent place of rest.", "how blessed is Paradise as a reward for their good deeds"),
      difficulty: 3,
      questions: [
        { q: "Whose reward is never lost, in 18:30?", a: "Those who do deeds well", wrong: ["Only the rich", "Only the old", "No one"], why: "Certainly We shall not make the reward of anyone to be lost who does his deeds in the most perfect manner." },
        { q: "What does Adn mean, per Ibn Kathir?", a: "Lasting", wrong: ["Small", "Far away", "Hidden"], why: "They will have Jannatu Adn. Adn means lasting." },
        { q: "What colour are the garments, in 18:31?", a: "Green", wrong: ["Red", "Black", "Grey"], why: "And they will wear green garments of Sundus and Istabraq." }
      ]
    }
  ]
};

/** Ayahs 32 to 59: the two gardens, Ma sha Allah, the passing world, deeds that last, the Book of deeds, and Iblis. */
const KAHF_TWO: DeepUnit = {
  key: "kahf2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-kahf",
  name: "Al-Kahf, ayahs 32 to 59",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Kahf",
  lessons: [
    {
      slug: "the-two-gardens",
      title: "The two gardens",
      line: "One man had two rich gardens and thought they would never end.",
      facts: ["Grapes, palms and crops", "A river ran between"],
      quote: q18(32),
      source: ik(32, "Allah gives the parable of a man with two fruitful gardens of grapes and palms, with a river between them. Fooled by their beauty, he thought they could never end.", "He thought that it could never come to an end"),
      difficulty: 2,
      questions: [
        { q: "What were the two gardens of, in 18:32?", a: "Grapes, with date palms around", wrong: ["Roses only", "Wheat only", "Olives only"], why: "Unto one of them We had given two gardens of grapes, and We had surrounded both with date palms." },
        { q: "What flowed between the gardens, in 18:33?", a: "A river", wrong: ["A road", "A wall", "Nothing"], why: "And We caused a river to gush forth in the midst of both." },
        { q: "What did the owner think, per Ibn Kathir?", a: "His gardens would never end", wrong: ["They would fail soon", "They belonged to Allah", "They were small"], why: "He thought that it could never come to an end or cease or be destroyed." }
      ]
    },
    {
      slug: "the-proud-boast",
      title: "The proud boast",
      line: "He boasted of wealth and doubted the Hour would ever come.",
      facts: ["More wealth, more people", "Unjust to himself"],
      quote: q18(34),
      source: ik(34, "The rich man boasted to his companion of more wealth and followers, doubted the Hour, and was fooled because he loved this world and its adornments.", "he was enamored with this world and its adornments"),
      difficulty: 3,
      questions: [
        { q: "What did he boast of, in 18:34?", a: "More wealth and people", wrong: ["More prayer", "More knowledge", "More patience"], why: "I am greater than you in wealth and have a mightier entourage." },
        { q: "What did he doubt, in 18:36?", a: "That the Hour would come", wrong: ["That rain falls", "That gardens grow", "That he was rich"], why: "And I do not think the Hour will ever come." },
        { q: "Why was he fooled, per Ibn Kathir?", a: "He loved this world too much", wrong: ["He was too humble", "He studied too much", "He prayed too much"], why: "Because he was enamored with this world and its adornments, and because he disbelieved in the Hereafter." }
      ]
    },
    {
      slug: "created-from-dust",
      title: "Created from dust",
      line: "His friend said: do not deny Allah, who made you from dust.",
      facts: ["We were nothing before", "He alone is my Lord"],
      quote: q18(37),
      source: ik(37, "The believing companion reminded him that Allah created him from dust and then fashioned him. Everyone knows they were nothing and their existence comes from their Creator.", "his existence is due to his Creator"),
      difficulty: 3,
      questions: [
        { q: "From what did Allah create him, in 18:37?", a: "Dust", wrong: ["Gold", "Fire", "Light"], why: "Do you disbelieve in Him Who created you out of dust, then out of Nutfah, then fashioned you into a man?" },
        { q: "What did the believer declare, in 18:38?", a: "Allah is my Lord, with no partner", wrong: ["My garden is best", "I am richer", "I fear you"], why: "But as for my part, He is Allah, my Lord, and none shall I associate as partner with my Lord." },
        { q: "To whom is our existence due, per Ibn Kathir?", a: "Our Creator", wrong: ["Ourselves", "Our parents alone", "Chance"], why: "He knows that his existence is due to his Creator, beside Whom there is no other god." }
      ]
    },
    {
      slug: "ma-sha-allah",
      title: "Ma sha Allah",
      line: "Seeing blessings, say: Ma sha Allah, la quwwata illa billah.",
      facts: ["What Allah wills", "No power but with Allah"],
      quote: q18(39),
      source: ik(39, "The believer told him he should have said, on entering his garden: That which Allah wills, there is no power but with Allah. One of the Salaf said to say this whenever something you have delights you.", "Whoever is delighted with something in his circumstances"),
      difficulty: 3,
      questions: [
        { q: "What should he have said on entering, in 18:39?", a: "That which Allah wills", wrong: ["This is mine forever", "I built this", "Nothing"], why: "It was better for you to say, when you entered your garden, That which Allah wills! There is no power but with Allah!" },
        { q: "When should we say it, per Ibn Kathir?", a: "When something we have delights us", wrong: ["Only when sad", "Only at night", "Never"], why: "Whoever is delighted with something in his circumstances or his wealth or his children, let him say it." },
        { q: "La quwwata illa billah means there is no power but with Allah.", tf: true, why: "That which Allah wills! There is no power but with Allah!" }
      ]
    },
    {
      slug: "a-treasure-of-paradise",
      title: "A treasure of Paradise",
      line: "La hawla wa la quwwata illa billah is a treasure of Paradise.",
      facts: ["Allah hears all", "No need to shout"],
      quote: q18(39),
      source: hadith("bukhari", "6384", "Abu Musa al-Ash'ari", "Sahih", "On a journey the Prophet ﷺ told the Companions they need not shout, for Allah hears and sees. He told Abu Musa that La hawla wa la quwwata illa billah is one of the treasures of Paradise.", "for it is one of the treasures of Paradise"),
      difficulty: 3,
      questions: [
        { q: "Which words are a treasure of Paradise?", a: "La hawla wa la quwwata illa billah", wrong: ["Any poem", "A loud shout", "A secret name"], why: "Say: La hawla wala quwwata illa billah, for it is one of the treasures of Paradise." },
        { q: "Why need they not shout, in the hadith?", a: "Allah hears and sees all", wrong: ["No one was near", "It was night", "They were tired"], why: "You are not calling upon a deaf or an absent one, but an All-Hearer, and an All-Seer." },
        { q: "Ibn Kathir links the treasure hadith to 18:39.", tf: true, why: "Shall I not tell you about some of the treasure of Paradise? La hawla wa la quwwata illa billah." }
      ]
    },
    {
      slug: "the-garden-ruined",
      title: "The garden ruined",
      line: "His fruits were destroyed, and he wrung his hands in regret.",
      facts: ["No one could help him", "Wished he had no partners"],
      quote: q18(42),
      source: ik(42, "What the believer warned of happened: a storm ruined the garden. The owner clasped his hands in regret over all he had spent, and wished he had never set up partners with Allah.", "He was clasping his hands together in a gesture of regret"),
      difficulty: 3,
      questions: [
        { q: "What happened to his fruits, in 18:42?", a: "They were ruined", wrong: ["They doubled", "They were sold", "They were stolen"], why: "So his fruits were encircled with ruin." },
        { q: "What did he wish, in 18:42?", a: "That he had no partners with Allah", wrong: ["For more gardens", "For a new river", "For more friends"], why: "He could only say: Would that I had ascribed no partners to my Lord!" },
        { q: "Could his people help him, in 18:43?", a: "No", wrong: ["Yes, his children", "Yes, his servants", "Yes, his tribe"], why: "And he had no group of men to help him against Allah, nor could he defend himself." }
      ]
    },
    {
      slug: "like-rain-on-plants",
      title: "Like rain on plants",
      line: "Worldly life is like green plants that soon dry and blow away.",
      facts: ["Fresh, then dry", "Allah can do all things"],
      quote: q18(45),
      source: ik(45, "This life is like rain that makes plants fresh and green, then they dry up and the wind scatters them. It shows how this world passes and comes to an end.", "its transient nature and how it will eventually cease"),
      difficulty: 3,
      questions: [
        { q: "What is worldly life like, in 18:45?", a: "Rain-fed plants that dry", wrong: ["A strong rock", "A deep sea", "A high mountain"], why: "It is like the water which We send down from the sky, then it becomes dry and broken pieces, which the winds scatter." },
        { q: "What scatters the dry plants, in 18:45?", a: "The winds", wrong: ["The birds", "The rivers", "The people"], why: "But later it becomes dry and broken pieces, which the winds scatter." },
        { q: "What does the parable show, per Ibn Kathir?", a: "This life passes away", wrong: ["Life lasts forever", "Plants are useless", "Rain is rare"], why: "The parable of the worldly life, its transient nature and how it will eventually cease and come to an end." }
      ]
    },
    {
      slug: "deeds-that-last",
      title: "Deeds that last",
      line: "Wealth and children adorn life; lasting good deeds are better.",
      facts: ["SubhanAllah, Alhamdulillah", "Prayer, charity, kindness"],
      quote: q18(46),
      source: ik(46, "Wealth and children are this life's adornment, but lasting good deeds are better: remembering Allah, prayer, fasting, charity, family ties and all good deeds, which remain for their doers.", "This is the celebration of the remembrance of Allah"),
      difficulty: 3,
      questions: [
        { q: "What are wealth and children, in 18:46?", a: "The adornment of this life", wrong: ["The goal of life", "The Hereafter", "Worthless"], why: "Wealth and children are the adornment of the life of this world." },
        { q: "What is better with Allah, in 18:46?", a: "Good deeds that last", wrong: ["More wealth", "More fame", "Bigger houses"], why: "But the good righteous deeds that last, are better with your Lord for reward and better for hope." },
        { q: "Which words count as lasting deeds, per Ibn Abbas?", a: "SubhanAllah, Alhamdulillah, Allahu Akbar", wrong: ["Only long speeches", "Only poems", "Only greetings"], why: "The good righteous deeds that last are Subhan Allah, Al-Hamdu Lillah, La ilaha illallah, and Allahu Akbar." }
      ]
    },
    {
      slug: "all-will-be-gathered",
      title: "All will be gathered",
      line: "Mountains will pass and all people be gathered, none left out.",
      facts: ["A flat, open earth", "First and last together"],
      quote: q18(47),
      source: ik(47, "On that Day the mountains will vanish and the earth will be a level plain where no one can hide. Allah will gather everyone, the first and the last, young and old.", "We shall gather them all, the first of them and the last of them"),
      difficulty: 4,
      questions: [
        { q: "What happens to the mountains, in 18:47?", a: "They pass away", wrong: ["They grow", "They turn to gold", "They stay"], why: "And remember the Day We shall cause the mountains to pass away." },
        { q: "Will anyone be left behind, in 18:47?", a: "No one", wrong: ["The young", "The poor", "Kings"], why: "And We shall gather them so that We will leave not one of them behind." },
        { q: "What will the earth be like, per Ibn Kathir?", a: "A level, open plain", wrong: ["A forest", "An ocean", "A maze"], why: "Clear and open, with no features that anyone may recognize and nothing for anyone to hide behind." }
      ]
    },
    {
      slug: "the-book-misses-nothing",
      title: "The Book misses nothing",
      line: "The Book of deeds leaves out nothing, small or large.",
      facts: ["All deeds present", "No one is wronged"],
      quote: q18(49),
      source: ik(49, "The Book of deeds records everything, small or large, good or bad, with complete precision. People will find all they did present, and Allah wrongs no one.", "it has left no sin, major or minor, and no action"),
      difficulty: 4,
      questions: [
        { q: "What does the Book leave out, in 18:49?", a: "Nothing, small or large", wrong: ["Small deeds", "Good deeds", "Old deeds"], why: "What sort of Book is this that leaves neither a small thing nor a large thing, but has recorded it with numbers!" },
        { q: "What will people find, in 18:49?", a: "All they did, present", wrong: ["Nothing at all", "Only good deeds", "Others' deeds"], why: "And they will find all that they did, present." },
        { q: "Does Allah wrong anyone, in 18:49?", a: "No one", wrong: ["Sometimes", "Only the weak", "Only the poor"], why: "And your Lord treats no one with injustice." }
      ]
    },
    {
      slug: "iblis-was-a-jinn",
      title: "Iblis was a jinn",
      line: "Iblis was a jinn who disobeyed, so never befriend him.",
      facts: ["Made from smokeless fire", "He is our enemy"],
      quote: q18(50),
      source: ik(50, "Iblis refused to bow because he was of the jinn, created from smokeless fire, while the angels were created from light. How can people take him and his followers as friends when they are enemies?", "He had been created from smokeless fire"),
      difficulty: 3,
      questions: [
        { q: "What was Iblis, in 18:50?", a: "One of the jinn", wrong: ["An angel", "A human", "An animal"], why: "So they prostrated themselves, except Iblis. He was one of the Jinn." },
        { q: "From what was Iblis made, per Ibn Kathir?", a: "Smokeless fire", wrong: ["Light", "Clay", "Water"], why: "He had been created from smokeless fire, whereas the angels had been created from light." },
        { q: "How does 18:50 describe Iblis and his offspring?", a: "Enemies to us", wrong: ["Helpers", "Friends", "Guides"], why: "Will you then take him and his offspring as protectors rather than Me while they are enemies to you?" }
      ]
    },
    {
      slug: "angels-from-light",
      title: "Angels from light",
      line: "Angels were made from light, jinn from fire, Adam from clay.",
      facts: ["Three kinds of creation", "Each as Allah described"],
      quote: q18(50),
      source: hadith("muslim", "2996", "Aishah", "Sahih", "The Prophet ﷺ said the angels were created from light, the jinn from a flame of fire, and Adam from what has been described to you.", "The Angels were born out of light"),
      difficulty: 3,
      questions: [
        { q: "From what were angels created, in the hadith?", a: "Light", wrong: ["Fire", "Clay", "Water"], why: "The Angels were born out of light." },
        { q: "From what were the jinn created?", a: "Fire", wrong: ["Light", "Clay", "Air"], why: "And the Jinns were born out of the spark of fire." },
        { q: "From what was Adam made, as described in the Quran?", a: "Clay", wrong: ["Light", "Fire", "Gold"], why: "And Adam was born as he has been defined for you, fashioned out of clay." }
      ]
    },
    {
      slug: "man-is-most-argumentative",
      title: "Man argues the most",
      line: "Every kind of example is in the Quran, yet man argues most.",
      facts: ["Clear examples given", "Argue less, act more"],
      quote: q18(54),
      source: ik(54, "Allah explained everything clearly in the Quran so people would not stray, yet man is very argumentative and opposes truth with falsehood, except those Allah guides.", "man is very quarrelsome and opposes truth with falsehood"),
      difficulty: 3,
      questions: [
        { q: "What has Allah given in the Quran, in 18:54?", a: "Every kind of example", wrong: ["Only one story", "Only laws", "Only names"], why: "And indeed We have given every kind of example in this Qur'an for mankind." },
        { q: "How is man described, in 18:54?", a: "More quarrelsome than anything", wrong: ["Most patient", "Most silent", "Most humble"], why: "But, man is ever more quarrelsome than anything." },
        { q: "Who is spared this, per Ibn Kathir?", a: "Those Allah guides", wrong: ["The clever", "The loud", "The rich"], why: "Man is very quarrelsome and opposes truth with falsehood, except for those whom Allah guides." }
      ]
    },
    {
      slug: "wont-you-pray",
      title: "Won't you pray?",
      line: "Waking Ali at night, he ﷺ recited: man argues most of all.",
      facts: ["A call to night prayer", "Gentle advice"],
      quote: q18(54),
      source: hadith("bukhari", "1127", "Ali ibn Abi Talib", "Sahih", "One night the Prophet ﷺ visited Ali and Fatimah and asked if they would pray. Ali answered that their souls are in Allah's hand. The Prophet ﷺ left, striking his thigh and reciting 18:54.", "But man is more quarrelsome than anything"),
      difficulty: 4,
      questions: [
        { q: "Whom did he ﷺ visit at night, in the hadith?", a: "Ali and Fatimah", wrong: ["Abu Bakr", "Umar", "Bilal"], why: "One night the Messenger ﷺ came to me and Fatimah, the daughter of the Prophet ﷺ." },
        { q: "What did he ﷺ ask them?", a: "Won't you pray?", wrong: ["Are you hungry?", "Where is Hasan?", "Shall we travel?"], why: "He asked, Won't you pray at night?" },
        { q: "Which ayah did he ﷺ recite leaving?", a: "18:54, man is most quarrelsome", wrong: ["18:1", "18:10", "18:110"], why: "I heard that he was hitting his thigh and saying, But man is more quarrelsome than anything." }
      ]
    },
    {
      slug: "good-news-and-warners",
      title: "Bearers of good news",
      line: "Messengers come with good news and with warnings.",
      facts: ["Good news for followers", "Warning for rejecters"],
      quote: q18(56),
      source: ik(56, "Allah sends Messengers to give good news to those who believe and follow them, and to warn those who reject them, before any punishment comes.", "they give good news to those who believe in them"),
      difficulty: 3,
      questions: [
        { q: "Why are Messengers sent, in 18:56?", a: "To give good news and warn", wrong: ["To become kings", "To gather wealth", "To build towers"], why: "And We send not the Messengers except as bearers of good news and warners." },
        { q: "Whom do they give good news, per Ibn Kathir?", a: "Those who believe in them", wrong: ["Everyone equally", "Only rulers", "Only rich people"], why: "They give good news to those who believe in them and follow them." },
        { q: "What do deniers do with the ayahs, in 18:56?", a: "Take them as a jest", wrong: ["Memorise them", "Teach them", "Follow them"], why: "And they take My Ayat and that which they are warned for jest." }
      ]
    },
    {
      slug: "turning-away-after-a-reminder",
      title: "Turning away after a reminder",
      line: "Who does more wrong than one reminded who turns away?",
      facts: ["Listen when reminded", "Remember your deeds"],
      quote: q18(57),
      source: ik(57, "No one does more wrong than a person reminded of Allah's signs who ignores them, forgetting the bad deeds he has sent ahead.", "does more wrong than one who is reminded of the signs of Allah then turns away"),
      difficulty: 4,
      questions: [
        { q: "Who does the most wrong, in 18:57?", a: "One reminded who turns away", wrong: ["One who asks", "One who forgets once", "One who travels"], why: "And who does more wrong than he who is reminded of the Ayat of his Lord, but turns away from them." },
        { q: "What does he forget, in 18:57?", a: "What his hands sent forth", wrong: ["His name", "His home", "His food"], why: "Forgetting what his hands have sent forth, meaning bad deeds and evil actions." },
        { q: "What should we do when reminded?", a: "Listen and pay attention", wrong: ["Ignore it", "Argue", "Leave quickly"], why: "He ignores them and does not listen or pay attention to them, which is the greatest wrong." }
      ]
    },
    {
      slug: "most-forgiving-owner-of-mercy",
      title: "Most Forgiving, full of mercy",
      line: "Allah is Most Forgiving and gives people time to turn back.",
      facts: ["He conceals faults", "He guides whom He wills"],
      quote: q18(58),
      source: ik(58, "Allah is Most Forgiving and full of mercy. If He punished people at once for what they earned, He would hasten it, but He is patient, hides faults, forgives sins and may guide wrongdoers.", "He is patient, He conceals faults and forgives sins"),
      difficulty: 3,
      questions: [
        { q: "How is Allah described in 18:58?", a: "Most Forgiving, Owner of mercy", wrong: ["Quick to anger", "Far away", "Unaware"], why: "And your Lord is Most Forgiving, Owner of mercy." },
        { q: "Why is punishment not hastened, per 18:58?", a: "His mercy and a set time", wrong: ["He forgot", "He cannot", "No one sinned"], why: "Were He to call them to account, He would have hastened their punishment. But they have their appointed time." },
        { q: "What does Allah do with faults, per Ibn Kathir?", a: "Conceals them and forgives", wrong: ["Spreads them", "Ignores the guilty", "Counts only good"], why: "He is patient, He conceals faults and forgives sins." }
      ]
    }
  ]
};

const KAHF_THREE: DeepUnit = {
  key: "kahf3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-kahf",
  name: "Al-Kahf, ayahs 60 to 82",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Kahf",
  lessons: [
    {
      slug: "musa-will-not-give-up",
      title: "Musa will not give up",
      line: "Musa set out to find a learned man, however long it took.",
      facts: ["Where two seas meet", "Seeking knowledge takes effort"],
      quote: q18(60),
      source: ik(60, "Musa learned of a servant of Allah at the junction of the two seas with knowledge he did not have, so he set out with his young helper Yusha bin Nun, ready to travel for a very long time.", "even if I have to travel for a very long time"),
      difficulty: 2,
      questions: [
        { q: "Where did Musa want to reach, in 18:60?", a: "The junction of the two seas", wrong: ["The top of a mountain", "A great city", "The desert's edge"], why: "I will not give up until I reach the junction of the two seas." },
        { q: "Who was the young helper, per Ibn Kathir?", a: "Yusha bin Nun", wrong: ["Harun", "Yusuf", "Shuayb"], why: "The boy-servant was Yusha bin Nun, who later led the Children of Israel after Musa." },
        { q: "What does Huqub show, per Ibn Kathir?", a: "He would travel a very long time", wrong: ["He would rest", "He would turn back", "He would ride fast"], why: "Meaning, even if I have to travel for a very long time." }
      ]
    },
    {
      slug: "the-most-learned",
      title: "Who is the most learned?",
      line: "Musa said he was most learned, so Allah taught him humility.",
      facts: ["Knowledge belongs to Allah", "Say: Allah knows best"],
      quote: q18(60),
      source: hadith("bukhari", "122", "Ubayy ibn Ka'b", "Sahih", "Musa was asked who was the most learned of people and said he was. Allah corrected him for not leaving knowledge to Allah, and told him of a servant at the junction of the two seas.", "Allah admonished Moses as he did not attribute absolute knowledge to Him"),
      difficulty: 3,
      questions: [
        { q: "What was Musa asked, in the hadith?", a: "Who is the most learned?", wrong: ["Who is the strongest?", "Who is the richest?", "Who is the oldest?"], why: "He was asked who was the most learned person among the people." },
        { q: "Why was Musa corrected, in the hadith?", a: "He did not leave knowledge to Allah", wrong: ["He was late", "He was angry", "He forgot a prayer"], why: "Allah admonished Musa as he did not attribute absolute knowledge to Him." },
        { q: "What should a person say about knowledge?", a: "Allah knows best", wrong: ["I know best", "No one knows", "My teacher knows all"], why: "Musa was corrected for not referring the knowledge to Allah." }
      ]
    },
    {
      slug: "the-fish-was-the-sign",
      title: "The fish was the sign",
      line: "Where the fish was lost, they would find the learned man.",
      facts: ["The fish slipped into the sea", "It left a tunnel-like path"],
      quote: q18(61),
      source: ik(61, "Musa was told to carry a fish. Where they lost it would be the right place. It slipped into the sea and made a path like a tunnel.", "when you lose the fish, that will be a sign that you have reached the right place"),
      difficulty: 2,
      questions: [
        { q: "What would losing the fish mean, per Ibn Kathir?", a: "They reached the right place", wrong: ["They were lost", "Time to eat", "Time to go home"], why: "When you lose the fish, that will be a sign that you have reached the right place." },
        { q: "How did the fish go into the sea, in 18:61?", a: "As in a tunnel", wrong: ["As a bird", "As a stone", "As a wave"], why: "And it took its way through the sea as in a tunnel." },
        { q: "Who actually forgot the fish, per Ibn Kathir?", a: "Yusha", wrong: ["Musa", "Al-Khidr", "A sailor"], why: "Forgetfulness is attributed to them both even though it was actually Yusha who forgot." }
      ]
    },
    {
      slug: "that-is-what-we-sought",
      title: "That is what we sought",
      line: "Tired, they saw they had passed the spot, so they turned back.",
      facts: ["Shaytan made him forget", "They retraced their steps"],
      quote: q18(64),
      source: ik(62, "They walked on past the place and grew very tired. When Yusha said he had forgotten the fish, Musa said that was the place they sought, and they went back the way they came.", "their journey beyond the place where they should have stopped"),
      difficulty: 3,
      questions: [
        { q: "What did Musa ask for, in 18:62?", a: "Their morning meal", wrong: ["A boat", "A map", "Water to wash"], why: "Bring us our morning meal; truly, we have suffered much fatigue in this, our journey." },
        { q: "Whom did Yusha blame for forgetting, in 18:63?", a: "Shaytan", wrong: ["Musa", "The fish", "The rock"], why: "None but Shaytan made me forget to remember it." },
        { q: "What did they do once they knew, in 18:64?", a: "Went back on their footsteps", wrong: ["Went home", "Built a boat", "Waited a year"], why: "So they went back retracing their footsteps." }
      ]
    },
    {
      slug: "a-servant-given-knowledge",
      title: "A servant given knowledge",
      line: "They found Al-Khidr, given mercy and knowledge from Allah.",
      facts: ["Mercy from Allah", "Knowledge from Allah"],
      quote: q18(65),
      source: ik(65, "At the rock they found one of Allah's servants who had been given mercy and knowledge from Allah. The authentic hadith say he was Al-Khidr.", "This was Al-Khidr, peace be upon him"),
      difficulty: 2,
      questions: [
        { q: "What had Allah given the servant, in 18:65?", a: "Mercy and knowledge", wrong: ["Gold and silver", "An army", "A palace"], why: "On whom We had bestowed mercy from Us, and whom We had taught knowledge from Us." },
        { q: "Who was the servant, per Ibn Kathir?", a: "Al-Khidr", wrong: ["Luqman", "Harun", "Yahya"], why: "This was Al-Khidr, peace be upon him, as is indicated by the authentic Hadiths." },
        { q: "The servant's knowledge came from Allah, per 18:65.", tf: true, why: "And whom We had taught knowledge from Us." }
      ]
    },
    {
      slug: "why-he-was-called-al-khidr",
      title: "Why he was called Al-Khidr",
      line: "Where Al-Khidr sat on dry land, it turned green.",
      facts: ["Khadra means green", "A blessing from Allah"],
      quote: q18(65),
      source: hadith("bukhari", "3402", "Abu Hurairah", "Sahih", "The Prophet ﷺ said Al-Khidr was named so because he sat on barren land and it turned green with plants.", "it turned green with plantation"),
      difficulty: 2,
      questions: [
        { q: "What happened where he sat, in the hadith?", a: "The land turned green", wrong: ["It turned to sand", "Water froze", "Stones fell"], why: "He sat over a barren white land, and it turned green with plantation." },
        { q: "What kind of land did he sit on?", a: "Barren, dry land", wrong: ["A river bank", "A garden", "A snowy hill"], why: "He sat over a barren white land." },
        { q: "Khadra in Arabic means green.", tf: true, why: "It turned green (Khadra) beneath him." }
      ]
    },
    {
      slug: "may-i-follow-you",
      title: "May I follow you?",
      line: "Musa asked gently to learn, showing how a student speaks.",
      facts: ["Ask without force", "Seek useful knowledge"],
      quote: q18(66),
      source: ik(66, "Musa asked to follow Al-Khidr to learn from him. Ibn Kathir says it is a gentle request with no force, the way a seeker of knowledge should speak to a scholar.", "This is the manner in which the seeker of knowledge should address the scholar"),
      difficulty: 2,
      questions: [
        { q: "What did Musa ask, in 18:66?", a: "To follow him and learn", wrong: ["To fight him", "To buy his boat", "To take him home"], why: "May I follow you so that you teach me something of that knowledge which you have been taught?" },
        { q: "How did Musa ask, per Ibn Kathir?", a: "Gently, with no force", wrong: ["Loudly", "Angrily", "With a threat"], why: "This is a question phrased in gentle terms, with no sense of force or coercion." },
        { q: "Whom does the manner of Musa teach?", a: "Seekers of knowledge", wrong: ["Kings", "Traders", "Soldiers"], why: "This is the manner in which the seeker of knowledge should address the scholar." }
      ]
    },
    {
      slug: "you-will-not-have-patience",
      title: "You will not have patience",
      line: "Al-Khidr warned that Musa would find his actions hard to bear.",
      facts: ["Each had knowledge from Allah", "Hard to bear the unknown"],
      quote: q18(67),
      source: ik(67, "Al-Khidr said Musa would not be patient with what he saw, since each of them had knowledge from Allah the other did not have.", "I have knowledge from Allah that He has not taught you, and you have knowledge from Allah that He has not taught me"),
      difficulty: 3,
      questions: [
        { q: "What did Al-Khidr say, in 18:67?", a: "You will not have patience with me", wrong: ["You may lead me", "You are welcome", "You must pay me"], why: "Verily, you will not be able to have patience with me!" },
        { q: "Why is patience hard, in 18:68?", a: "About what one does not know", wrong: ["The road was long", "Food was short", "The sea was rough"], why: "And how can you have patience about a thing which you know not?" },
        { q: "Each of them had knowledge the other lacked, per Ibn Kathir.", tf: true, why: "I have knowledge from Allah that He has not taught you, and you have knowledge from Allah that He has not taught me." }
      ]
    },
    {
      slug: "if-allah-wills",
      title: "If Allah wills",
      line: "Musa promised patience, and agreed to ask nothing until told.",
      facts: ["Musa said: In sha Allah", "A clear agreement"],
      quote: q18(69),
      source: ik(69, "Musa said that, if Allah willed, he would be patient and obey. Al-Khidr set the condition that Musa should not ask about anything until Al-Khidr explained it first.", "until I initiate the discussion, before you ask me about it"),
      difficulty: 3,
      questions: [
        { q: "Which words did Musa add to his promise, in 18:69?", a: "If Allah wills", wrong: ["I swear", "Maybe", "For sure"], why: "If Allah wills, you will find me patient, and I will not disobey you in aught." },
        { q: "What was the condition, in 18:70?", a: "Ask about nothing until told", wrong: ["Walk ahead", "Carry the food", "Stay silent forever"], why: "Ask me not about anything till I myself mention of it to you." },
        { q: "Who would start the talk, per Ibn Kathir?", a: "Al-Khidr", wrong: ["Musa", "Yusha", "The sailors"], why: "Until I initiate the discussion, before you ask me about it." }
      ]
    },
    {
      slug: "the-sparrow-and-the-sea",
      title: "The sparrow and the sea",
      line: "A sparrow's sip of the sea shows how vast Allah's knowledge is.",
      facts: ["Our knowledge is tiny", "Allah's knowledge has no end"],
      quote: q18(71),
      source: hadith("bukhari", "122", "Ubayy ibn Ka'b", "Sahih", "On the boat a sparrow dipped its beak in the sea. Al-Khidr said their knowledge, next to Allah's, was like what the sparrow took from the sea.", "except as much as this sparrow has decreased the water of the sea with its beak"),
      difficulty: 3,
      questions: [
        { q: "Which bird came to the boat, in the hadith?", a: "A sparrow", wrong: ["An eagle", "A crow", "A hoopoe"], why: "A sparrow came and stood on the edge of the boat and dipped its beak once or twice in the sea." },
        { q: "What did the sparrow's sip stand for?", a: "How little we know next to Allah", wrong: ["How thirsty birds are", "How deep the sea is", "How long the trip was"], why: "My knowledge and your knowledge have not decreased Allah's knowledge except as much as the sparrow has decreased the water of the sea." },
        { q: "Why did the crew take them for free, in the hadith?", a: "They recognised Al-Khidr", wrong: ["They were lost", "It was a holiday", "Musa paid later"], why: "The crew recognized Al-Khidr and took them on board without fare." }
      ]
    },
    {
      slug: "the-damaged-boat",
      title: "The damaged boat",
      line: "Al-Khidr pulled a plank from the boat, and Musa objected.",
      facts: ["Musa forgot his promise", "There was a hidden reason"],
      quote: q18(71),
      source: ik(71, "Far out at sea, Al-Khidr pulled out a plank and patched it. Musa could not keep quiet, and Al-Khidr reminded him of their agreement, since there was a reason Musa did not know.", "there is a reason and purpose for it that you do not know about"),
      difficulty: 3,
      questions: [
        { q: "What did Al-Khidr do to the boat, per Ibn Kathir?", a: "Pulled out a plank, then patched it", wrong: ["Sank it fully", "Painted it", "Sold it"], why: "Al-Khidr got up and damaged the boat, pulling out one of its planks and then patching it up again." },
        { q: "What did Musa ask, in 18:71?", a: "Will its people drown?", wrong: ["Where are we going?", "Can I steer?", "Is it ours now?"], why: "Have you damaged it wherein its people will drown?" },
        { q: "What excuse did Musa give, in 18:73?", a: "He had forgotten", wrong: ["He was tired", "He was hungry", "He was scared"], why: "Call me not to account for what I forgot." }
      ]
    },
    {
      slug: "the-second-test",
      title: "The second test",
      line: "What happened to a boy upset Musa even more.",
      facts: ["Musa objected again", "His last chance"],
      quote: q18(76),
      source: ik(76, "When Al-Khidr took a young boy's life, Musa objected even more strongly. Al-Khidr reminded him again, and Musa said that if he asked once more, they should part, since his excuse had been accepted twice.", "you have accepted my apology twice"),
      difficulty: 4,
      questions: [
        { q: "How did Musa react the second time, per Ibn Kathir?", a: "More strongly than before", wrong: ["He stayed calm", "He laughed", "He left quietly"], why: "He denounced him even more fervently than in the first case." },
        { q: "What did Musa offer, in 18:76?", a: "To part if he asked again", wrong: ["To pay a fine", "To lead the way", "To fast"], why: "If I ask you anything after this, keep me not in your company." },
        { q: "How many times was his apology accepted, per Ibn Kathir?", a: "Twice", wrong: ["Once", "Three times", "Never"], why: "You have accepted my apology twice." }
      ]
    },
    {
      slug: "if-only-he-had-been-patient",
      title: "If only he had been patient",
      line: "The Prophet ﷺ wished Musa had been patient to see more wonders.",
      facts: ["Patience brings learning", "May Allah have mercy on Musa"],
      quote: q18(76),
      source: hadith("bukhari", "122", "Ubayy ibn Ka'b", "Sahih", "The Prophet ﷺ said: May Allah have mercy on Musa. If only he had been more patient, we would have learned more of his story with Al-Khidr.", "Would that he could have been more patient to learn more about his story with Al-Khadir"),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ wish for Musa?", a: "That he had been more patient", wrong: ["That he had gone home", "That he had a boat", "That he spoke first"], why: "Would that he could have been more patient to learn more about his story." },
        { q: "What would more patience have brought, in the hadith?", a: "More of the story told to us", wrong: ["More food", "More money", "A shorter trip"], why: "To learn more about his story with Al-Khidr." },
        { q: "The Prophet ﷺ prayed for mercy on Musa.", tf: true, why: "The Prophet ﷺ said, May Allah be Merciful to Musa!" }
      ]
    },
    {
      slug: "the-wall-set-straight",
      title: "The wall set straight",
      line: "Though a town was unkind, Al-Khidr fixed its falling wall.",
      facts: ["The town refused guests", "Musa asked about wages"],
      quote: q18(77),
      source: ik(77, "The people of a town refused to host them. Al-Khidr found a wall about to fall and set it straight with his hands. Musa said he could have taken wages since they were not welcomed.", "you should not have worked for them for free"),
      difficulty: 3,
      questions: [
        { q: "How did the townspeople treat them, in 18:77?", a: "They refused to host them", wrong: ["They held a feast", "They gave gifts", "They built a house"], why: "They asked them for food, but they refused to entertain them." },
        { q: "What did Al-Khidr fix, in 18:77?", a: "A wall about to fall", wrong: ["A bridge", "A well", "A boat"], why: "Then they found therein a wall about to collapse and he set it up straight." },
        { q: "What did Musa think he should have done?", a: "Taken wages for it", wrong: ["Left the town", "Built a house", "Asked for a boat"], why: "Because they did not entertain us as guests, you should not have worked for them for free." }
      ]
    },
    {
      slug: "this-is-the-parting",
      title: "This is the parting",
      line: "Al-Khidr said they must part, but first he would explain.",
      facts: ["Musa had set the condition", "The reasons are explained"],
      quote: q18(78),
      source: ik(78, "Since Musa had said they should part if he asked again, Al-Khidr said it was time to part, and he would explain what Musa could not bear.", "So this is the parting of the ways between me and you"),
      difficulty: 3,
      questions: [
        { q: "What did Al-Khidr say, in 18:78?", a: "This is the parting between us", wrong: ["Let us go on", "Let us rest", "Let us eat"], why: "This is the parting between you and I." },
        { q: "Why was it time to part, per Ibn Kathir?", a: "Musa had set that condition", wrong: ["Al-Khidr was angry", "The road ended", "Yusha was tired"], why: "Because you said after the boy was killed that if you asked me anything after that, you would not accompany me any further." },
        { q: "Al-Khidr explained his actions before parting, per 18:78.", tf: true, why: "I will tell you the interpretation of those things over which you were not able to be patient." }
      ]
    },
    {
      slug: "the-boat-was-saved",
      title: "The boat was saved",
      line: "A cruel king seized good boats, so a flaw saved this one.",
      facts: ["Owned by poor workers", "A small harm, a big good"],
      quote: q18(79),
      source: ik(79, "The boat belonged to poor people who worked at sea. A cruel king took every good boat by force, so the damage made it look faulty and kept it safe for its owners.", "so that its poor owners who had nothing else could benefit from it"),
      difficulty: 3,
      questions: [
        { q: "To whom did the boat belong, in 18:79?", a: "Poor people working at sea", wrong: ["The king", "Al-Khidr", "Rich traders"], why: "As for the boat, it belonged to poor people working in the sea." },
        { q: "What did the king do, in 18:79?", a: "Seized every good boat", wrong: ["Built boats", "Fixed boats", "Banned fishing"], why: "There was a king behind them who seized every boat by force." },
        { q: "Why damage the boat, per Ibn Kathir?", a: "So its poor owners could keep it", wrong: ["To sink it", "To sell it", "To punish them"], why: "So that its poor owners who had nothing else could benefit from it." }
      ]
    },
    {
      slug: "allahs-decree-is-good",
      title: "Allah's decree is good",
      line: "The boy would have led his parents astray; Allah knew best.",
      facts: ["A better child given", "Trust Allah's decree"],
      quote: q18(81),
      source: ik(80, "The boy's parents were believers, and he would have led them into disbelief. Allah would give them a better, kinder child. Ibn Kathir reminds us that Allah's decree for a believer is good for him.", "Allah does not decree anything for the believer except it is good for him"),
      difficulty: 4,
      questions: [
        { q: "What were the boy's parents, in 18:80?", a: "Believers", wrong: ["Kings", "Sailors", "Travellers"], why: "And as for the boy, his parents were believers." },
        { q: "What would Allah give them, in 18:81?", a: "A child better in righteousness", wrong: ["Great wealth", "A new house", "A long trip"], why: "One better in righteousness and nearer to mercy." },
        { q: "What does Allah decree for a believer, per Ibn Kathir?", a: "Only what is good for him", wrong: ["Only ease", "Only hardship", "Nothing at all"], why: "Allah does not decree anything for the believer except it is good for him." }
      ]
    },
    {
      slug: "the-orphans-treasure",
      title: "The orphans' treasure",
      line: "The wall hid two orphans' treasure, kept for their good father.",
      facts: ["A father's goodness helps his children", "All done by Allah's command"],
      quote: q18(82),
      source: ik(82, "The wall belonged to two orphans with treasure beneath it. Their father was righteous, so Allah protected it until they grew up. Al-Khidr said he did none of it on his own.", "the blessing of his worship will extend to them in this world and in the Hereafter"),
      difficulty: 4,
      questions: [
        { q: "What was under the wall, in 18:82?", a: "A treasure for two orphans", wrong: ["A spring", "A cave", "A map"], why: "There was under it a treasure belonging to them." },
        { q: "Why was it protected, in 18:82?", a: "Their father was righteous", wrong: ["They were rich", "The king asked", "The town was kind"], why: "And their father was a righteous man." },
        { q: "Did Al-Khidr act on his own, per Ibn Kathir?", a: "No, he was commanded", wrong: ["Yes, by himself", "Yes, for wages", "Yes, for fame"], why: "I was only commanded to do these things that were enjoined upon me." }
      ]
    },
    {
      slug: "patience-needs-knowing",
      title: "Patience needs knowing",
      line: "Knowing the purpose of something makes patience with it easier.",
      facts: ["As-Sa'di explains", "Lessons of Musa and Al-Khidr"],
      quote: q18(82),
      source: saadi(18, 82, "Among the many lessons as-Sa'di draws from the story, he says the main cause of patience is knowing the matter well: one who does not know its purpose and fruit has no reason to be patient, as Al-Khidr said, how can you be patient with what you do not know?", "أن السبب الكبير لحصول الصبر إحاطة الإنسان علما وخبرة بذلك الأمر"),
      difficulty: 2,
      questions: [
        { q: "What helps most to be patient, per as-Sa'di on Al-Kahf 18:82?", a: "Knowing the matter and its purpose", wrong: ["Being angry", "Ignoring it", "Rushing ahead"], why: "The main cause of patience is knowing the matter well." },
        { q: "What did as-Sa'di say about judging things quickly, from Al-Kahf?", a: "Wait until you understand", wrong: ["Judge at once", "Never ask", "Guess"], why: "Take your time and be sure before judging a thing." },
        { tf: true, q: "Whoever lacks patience will miss much knowledge.", why: "As-Sa'di on 18:82." }
      ]
    },
    {
      slug: "learn-from-the-skilled",
      title: "Learn from the skilled",
      line: "A great scholar still learns from those skilled in a field.",
      facts: ["As-Sa'di explains", "Humility in learning"],
      quote: q18(82),
      source: saadi(18, 82, "As-Sa'di says Musa, one of the greatest Messengers, still eagerly learned a special knowledge from Al-Khidr; so a scholar weak in a field, like Arabic grammar, should learn it from someone skilled in it, even if that teacher is below him in other knowledge.", "تعلم العالم الفاضل للعلم الذي لم يتمهر فيه، ممن مهر فيه"),
      difficulty: 2,
      questions: [
        { q: "What does Musa learning from Al-Khidr teach, per as-Sa'di?", a: "Learn from those skilled in a field", wrong: ["Learn only from kings", "Never ask anyone", "Learn alone"], why: "A scholar should learn what he lacks from one skilled in it." },
        { q: "How should a student speak to a teacher, per as-Sa'di on Al-Kahf?", a: "Gently and humbly", wrong: ["Proudly", "Harshly", "As an equal"], why: "Showing need for a teacher's knowledge benefits a student most." },
        { tf: true, q: "A student should thank Allah for knowledge, since it is from Him.", why: "As-Sa'di on 18:82." }
      ]
    },
    {
      slug: "what-useful-knowledge-is",
      title: "What useful knowledge is",
      line: "Useful knowledge guides you to good and warns you of evil.",
      facts: ["As-Sa'di explains", "Beneficial knowledge"],
      quote: q18(82),
      source: saadi(18, 82, "As-Sa'di says useful knowledge is knowledge that guides to good: any knowledge with guidance to the ways of good and warning against evil, or a means to that, is useful, and anything else is either harmful or of no benefit, as Musa asked to be taught right guidance.", "أن العلم النافع هو العلم المرشد إلى الخير"),
      difficulty: 2,
      questions: [
        { q: "What is useful knowledge, per as-Sa'di on Al-Kahf?", a: "Knowledge that guides to good", wrong: ["Any knowledge at all", "Only maths", "Gossip about people"], why: "Useful knowledge guides to good and warns of evil." },
        { q: "What did Musa ask Al-Khidr to teach him?", a: "Right guidance", wrong: ["Magic", "Wealth", "Poetry"], why: "He asked to be taught some of the right guidance he was given." },
        { tf: true, q: "Knowledge that is a means to good is also useful knowledge.", why: "As-Sa'di on 18:82." }
      ]
    }
  ]
};

const KAHF_FOUR: DeepUnit = {
  key: "kahf4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-kahf",
  name: "Al-Kahf, ayahs 83 to 110",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Kahf",
  lessons: [
    {
      slug: "dhul-qarnayn-given-power",
      title: "Dhul-Qarnayn given power",
      line: "Allah gave Dhul-Qarnayn power and the means to all things.",
      facts: ["He ruled east and west", "Given knowledge and means"],
      quote: q18(84),
      source: ik(84, "People asked about Dhul-Qarnayn, a man who travelled far. Allah gave him great power on earth and the means to reach what he needed, which many early scholars said means knowledge.", "This means knowledge"),
      difficulty: 2,
      questions: [
        { q: "Who asked about Dhul-Qarnayn, in 18:83?", a: "People asking the Prophet ﷺ", wrong: ["The angels", "The jinn", "His army"], why: "And they ask you about Dhul-Qarnayn." },
        { q: "What did Allah give him, in 18:84?", a: "The means of everything", wrong: ["A magic ring", "Wings", "A golden city"], why: "Verily, We established him in the earth, and We gave him the means of everything." },
        { q: "What did Ibn Abbas say the means were?", a: "Knowledge", wrong: ["Gold", "Horses", "Ships"], why: "Ibn Abbas, Mujahid and others said: This means knowledge." }
      ]
    },
    {
      slug: "journey-to-the-west",
      title: "Journey to the west",
      line: "He travelled to the far west and judged its people with justice.",
      facts: ["Wrongdoers punished", "Good-doers rewarded and spoken to kindly"],
      quote: q18(86),
      source: ik(86, "Dhul-Qarnayn followed routes to the farthest west he could reach. Allah let him choose how to treat a people there, and his ruling showed his justice and faith.", "His justice and faith became apparent in the ruling he pronounced"),
      difficulty: 3,
      questions: [
        { q: "How far did he go, per Ibn Kathir?", a: "The farthest west one could reach", wrong: ["Into the sky", "Under the sea", "Only to the next town"], why: "He reached the furthest point that could be reached in the direction of the sun's setting." },
        { q: "What did his ruling show, per Ibn Kathir?", a: "His justice and faith", wrong: ["His anger", "His greed", "His fear"], why: "His justice and faith became apparent in the ruling he pronounced." },
        { q: "How would he speak to believers, in 18:88?", a: "With mild, kind words", wrong: ["Harshly", "Not at all", "With threats"], why: "And we shall speak unto him mild words." }
      ]
    },
    {
      slug: "a-just-ruler",
      title: "A just ruler",
      line: "Dhul-Qarnayn said wrongdoers are punished, then face their Lord.",
      facts: ["Justice is from faith", "Everyone returns to Allah"],
      quote: q18(87),
      source: ik(87, "Allah gave Dhul-Qarnayn power over a people. He ruled that those who persist in wrong are punished, then return to their Lord, showing his justice and faith.", "His justice and faith became apparent in the ruling he pronounced"),
      difficulty: 4,
      questions: [
        { q: "Who will be punished, in 18:87?", a: "Him who does wrong", wrong: ["The poor", "The travelers", "The children"], why: "As for him who does wrong, we shall punish him." },
        { q: "What did his ruling show, per Ibn Kathir?", a: "His justice and faith", wrong: ["His anger", "His wealth", "His fear"], why: "His justice and faith became apparent in the ruling he pronounced." },
        { tf: true, q: "Ibn Kathir says 18:87 confirms the Hereafter.", why: "This implies a confirmation of the Hereafter and the reward and punishment." }
      ]
    },
    {
      slug: "journey-to-the-east",
      title: "Journey to the east",
      line: "In the far east, a people had no shade from the sun.",
      facts: ["No buildings or trees", "Allah knew all about him"],
      quote: q18(90),
      source: ik(90, "Dhul-Qarnayn travelled east to where the sun rises and found a people with no buildings or trees to shade them. Allah knew everything about him and his army.", "they had no buildings or trees to cover them and shade them from the heat of the sun"),
      difficulty: 2,
      questions: [
        { q: "What did the eastern people lack, in 18:90?", a: "Shelter from the sun", wrong: ["Water", "Food", "Language"], why: "For whom We had provided no shelter against the sun." },
        { q: "What was missing there, per Ibn Kathir?", a: "Buildings and trees", wrong: ["Rivers and lakes", "Horses", "Roads"], why: "They had no buildings or trees to cover them and shade them from the heat of the sun." },
        { q: "What does 18:91 say Allah knew?", a: "All about him", wrong: ["Only his name", "Only his army", "Nothing"], why: "So it was! And We knew all about him." }
      ]
    },
    {
      slug: "the-people-between-two-mountains",
      title: "Between two mountains",
      line: "A people begged him for a barrier against Ya'juj and Ma'juj.",
      facts: ["They hardly understood speech", "They offered payment"],
      quote: q18(94),
      source: ik(94, "Between two mountains he found a people who could hardly understand speech. They said Ya'juj and Ma'juj spread mischief and offered to pay him for a barrier.", "he could not understand their speech, because they were so isolated from other people"),
      difficulty: 3,
      questions: [
        { q: "Where did he find the people, in 18:93?", a: "Between two mountains", wrong: ["On an island", "In a desert", "By a river"], why: "Until, when he reached between two mountains." },
        { q: "What were Ya'juj and Ma'juj doing, in 18:94?", a: "Great mischief in the land", wrong: ["Farming", "Trading", "Sleeping"], why: "Verily, Ya'juj and Ma'juj are doing great mischief in the land." },
        { q: "What did the people offer, in 18:94?", a: "To pay him", wrong: ["To fight him", "To leave", "To serve as soldiers"], why: "Shall we then pay you a tribute in order that you might erect a barrier?" }
      ]
    },
    {
      slug: "what-allah-gave-is-better",
      title: "What Allah gave is better",
      line: "He refused their money and asked only for help with the work.",
      facts: ["Allah's gift is enough", "Help with strength"],
      quote: q18(95),
      source: ik(95, "Dhul-Qarnayn kindly said the power Allah gave him was better than their money, but asked them to help with their labour so he could build the barrier.", "the power and authority that Allah has given me is better for me than what you have collected"),
      difficulty: 3,
      questions: [
        { q: "What did he say was better, in 18:95?", a: "What Allah had given him", wrong: ["Their gold", "Their land", "Their horses"], why: "That in which my Lord had established me is better." },
        { q: "What help did he ask for, in 18:95?", a: "Help with strength and labour", wrong: ["Money", "Soldiers to fight", "Nothing"], why: "So help me with strength, I will erect between you and them a barrier." },
        { q: "Which Prophet said something similar, per Ibn Kathir?", a: "Sulayman", wrong: ["Nuh", "Yunus", "Ayyub"], why: "This is like when Sulayman said: What Allah has given me is better than that which He has given you!" }
      ]
    },
    {
      slug: "the-iron-barrier",
      title: "The iron barrier",
      line: "He filled the gap with iron, heated it, then poured copper.",
      facts: ["Blocks of iron", "Molten copper"],
      quote: q18(96),
      source: ik(96, "He stacked iron blocks until the gap between the cliffs was filled, heated them with fire, then poured molten copper over them, which many early scholars said Qitran means.", "he put the blocks on top of one another, starting at the bottom, until he reached the tops of the mountains"),
      difficulty: 3,
      questions: [
        { q: "What did he ask for first, in 18:96?", a: "Pieces of iron", wrong: ["Wood", "Stones", "Sand"], why: "Give me Zubar of iron." },
        { q: "What is Qitran, per Ibn Kathir?", a: "Copper", wrong: ["Gold", "Glass", "Tar"], why: "Ibn Abbas, Mujahid, Ikrimah, Ad-Dahhak, Qatadah and As-Suddi said it was copper." },
        { q: "How high did the blocks go, per Ibn Kathir?", a: "To the tops of the mountains", wrong: ["Knee high", "Halfway up", "Just one row"], why: "Until he reached the tops of the mountains, filling the width and height of the gap." }
      ]
    },
    {
      slug: "a-mercy-from-my-lord",
      title: "A mercy from my Lord",
      line: "They could not climb or dig through; he called it Allah's mercy.",
      facts: ["He did not boast", "It falls when Allah wills"],
      quote: q18(98),
      source: ik(98, "Ya'juj and Ma'juj could not climb over the barrier or dig through it. Dhul-Qarnayn called it a mercy from his Lord, and said it will be levelled when Allah's promise comes.", "could not climb over the barrier or penetrate its lower portion"),
      difficulty: 3,
      questions: [
        { q: "What could they not do, in 18:97?", a: "Scale it or dig through it", wrong: ["See it", "Hear it", "Touch it"], why: "So they could not scale it or dig through it." },
        { q: "What did he call the barrier, in 18:98?", a: "A mercy from my Lord", wrong: ["My great work", "My palace", "A gift to me"], why: "This is a mercy from my Lord." },
        { q: "What will happen when the promise comes, per Ibn Kathir?", a: "It will be made flat", wrong: ["It will grow", "It will move", "It will turn gold"], why: "He shall Dakka it down to the ground, means, will make it flat." }
      ]
    },
    {
      slug: "the-trumpet-and-the-gathering",
      title: "The Trumpet and the gathering",
      line: "The Trumpet will be blown, and Allah will gather all creatures.",
      facts: ["As-Sur is a horn", "All gathered for the reckoning"],
      quote: q18(99),
      source: ik(99, "When the Trumpet is blown, Allah will gather all creatures together for the reckoning. Ibn Kathir explains that As-Sur is a horn that is blown.", "As-Sur, as explained in the Hadith, is a horn that is blown into"),
      difficulty: 3,
      questions: [
        { q: "What will be blown, in 18:99?", a: "The Trumpet", wrong: ["A wind", "A whistle", "A flute"], why: "And the Trumpet will be blown, and We shall collect them all together." },
        { q: "What is As-Sur, per Ibn Kathir?", a: "A horn that is blown", wrong: ["A bell", "A drum", "A star"], why: "As-Sur, as explained in the Hadith, is a horn that is blown into." },
        { q: "Which angel blows it, per Ibn Kathir?", a: "Israfil", wrong: ["Jibril", "Mika'il", "Malik"], why: "The one who will blow into it is the angel Israfil." }
      ]
    },
    {
      slug: "hell-shown-plainly",
      title: "Shown plainly",
      line: "On that Day, Hell is shown plainly to the disbelievers.",
      facts: ["Believe before you see", "Allah warns out of mercy"],
      quote: q18(100),
      source: ik(100, "On the Day of Resurrection Allah will bring Hell into view for the disbelievers before they enter it, adding to their grief.", "He will bring it forth for them to see"),
      difficulty: 4,
      questions: [
        { q: "To whom is Hell shown, in 18:100?", a: "The disbelievers", wrong: ["The angels", "The Prophets", "The believers"], why: "And on that Day We shall present Hell to the disbelievers, plain to view." },
        { q: "When is it shown, per Ibn Kathir?", a: "Before they enter it", wrong: ["Never", "In this world", "After a year"], why: "He will bring it forth for them to see its punishment before they enter it." },
        { tf: true, q: "Ibn Kathir says seeing it adds to their grief.", why: "This will intensify their distress and grief." }
      ]
    },
    {
      slug: "seventy-thousand-reins",
      title: "Seventy thousand reins",
      line: "The Prophet ﷺ said angels will bring Hell forward by reins.",
      facts: ["The Day is real", "Angels obey Allah"],
      quote: q18(100),
      source: hadith("muslim", "2842", "Abdullah ibn Mas'ud", "Sahih", "The Prophet ﷺ said Hell will be brought on the Day of Judgment with seventy thousand reins, each pulled by seventy thousand angels.", "Hell would be brought on that day"),
      difficulty: 5,
      questions: [
        { q: "How many reins, in the hadith?", a: "Seventy thousand", wrong: ["Seven", "Seventy", "One hundred"], why: "Hell would be brought on that day with seventy thousand bridles." },
        { q: "Who pull each rein, in the hadith?", a: "Seventy thousand angels", wrong: ["The people", "The jinn", "Horses"], why: "And seventy thousand angels dragging each bridle." },
        { q: "Who narrated the hadith of the reins?", a: "Abdullah ibn Mas'ud", wrong: ["Abu Hurairah", "Anas ibn Malik", "Aishah"], why: "Abdullah b. Mas'ud reported Allah's Messenger ﷺ as saying." }
      ]
    },
    {
      slug: "eyes-covered-from-the-reminder",
      title: "Eyes covered from the reminder",
      line: "Some turn a blind eye and deaf ear to Allah's reminder.",
      facts: ["They refused guidance", "Only Allah truly protects"],
      quote: q18(101),
      source: ik(101, "Some people neglect Allah's reminder, turning a blind eye and a deaf ear and refusing guidance. Taking others as protectors besides Allah will not help them.", "they neglected it, turning a blind eye and a deaf ear to it"),
      difficulty: 3,
      questions: [
        { q: "What covered their eyes, in 18:101?", a: "A covering from My Reminder", wrong: ["Sand", "A cloth", "Darkness of night"], why: "Those whose eyes had been under a covering from My Reminder." },
        { q: "What did they refuse, per Ibn Kathir?", a: "Guidance and the truth", wrong: ["Food", "Gifts", "Rest"], why: "Refusing to accept guidance and follow the truth." },
        { q: "Can others protect anyone besides Allah, per 18:102?", a: "No", wrong: ["Yes, always", "Yes, kings can", "Yes, idols can"], why: "Do then those who disbelieved think that they can take My servants as protectors besides Me?" }
      ]
    },
    {
      slug: "no-protector-but-allah",
      title: "No protector but Allah",
      line: "Can deniers take Allah's servants as protectors besides Him?",
      facts: ["Only Allah protects", "Those worshipped will disown them"],
      quote: q18(102),
      source: ik(102, "Allah asks if the disbelievers think taking His servants as protectors besides Him is right or will benefit them. Those servants will disown them.", "do they think that this is right for them and that it is going to benefit them"),
      difficulty: 4,
      questions: [
        { q: "Whom did they take as protectors, in 18:102?", a: "Allah's servants", wrong: ["Their parents", "Their animals", "Their homes"], why: "That they can take My servants as Awliya [protectors] besides Me?" },
        { q: "What does Allah ask about this, per Ibn Kathir?", a: "Will it benefit them?", wrong: ["Is it cheap?", "Is it far?", "Is it old?"], why: "Do they think that this is right for them and that it is going to benefit them?" },
        { tf: true, q: "Ibn Kathir links 19:82: they will deny that worship.", why: "Nay, but they will deny their worship of them, and become opponents to them. (19:82)" }
      ]
    },
    {
      slug: "the-greatest-losers",
      title: "The greatest losers",
      line: "The worst losers think they do good, yet their deeds are lost.",
      facts: ["Deeds must be right too", "Do not deny Allah's signs"],
      quote: q18(104),
      source: ik(104, "The greatest losers are those whose efforts are wasted while they think they are doing good. Ibn Kathir says the ayah is general, for anyone who worships in a way that is not acceptable yet thinks he is right.", "thinking that he is right in doing that and that his deeds will be accepted, but he is mistaken"),
      difficulty: 4,
      questions: [
        { q: "What do the losers think, in 18:104?", a: "That they are doing good", wrong: ["That they are losing", "That they are lazy", "That they are lost"], why: "While they thought that they were acquiring good by their deeds." },
        { q: "Is 18:103 about one group only, per Ibn Kathir?", a: "No, it is general", wrong: ["Yes, one tribe", "Yes, one town", "Yes, one family"], why: "So the Ayah is general and refers to everyone who worships Allah in a way that is not acceptable." },
        { q: "What do they deny, in 18:105?", a: "Allah's signs and meeting Him", wrong: ["Their names", "Their homes", "The weather"], why: "They are those who deny the Ayat of their Lord and the meeting with Him." }
      ]
    },
    {
      slug: "weightless-on-the-scale",
      title: "Weightless on the scale",
      line: "A big man without faith weighs less than a gnat's wing.",
      facts: ["Faith gives deeds weight", "Size and wealth do not count"],
      quote: q18(105),
      source: hadith("bukhari", "4729", "Abu Hurairah", "Sahih", "The Prophet ﷺ said a huge fat man will come on the Day of Resurrection and weigh less than a mosquito's wing in Allah's sight, then recited 18:105.", "a huge fat man will come who will not weigh, the weight of the wing of a mosquito"),
      difficulty: 4,
      questions: [
        { q: "What will the man weigh, in the hadith?", a: "Less than a mosquito's wing", wrong: ["A mountain", "A camel", "A house"], why: "He will not weigh the weight of the wing of a mosquito in Allah's Sight." },
        { q: "Which ayah did the Prophet ﷺ recite after?", a: "18:105", wrong: ["2:255", "112:1", "36:1"], why: "We shall not give them any weight on the Day of Resurrection." },
        { tf: false, q: "In the hadith, body size makes deeds heavy.", why: "A huge fat man will come who will not weigh the weight of the wing of a mosquito." }
      ]
    },
    {
      slug: "mocking-the-signs",
      title: "Mocking the signs",
      line: "Those who mocked Allah's signs and Messengers earn Hell.",
      facts: ["Respect Allah's signs", "Never mock the Messengers"],
      quote: q18(106),
      source: ik(106, "Their recompense is Hell because they disbelieved and treated Allah's signs and Messengers as a joke.", "they took the signs and Messengers of Allah as a joke"),
      difficulty: 4,
      questions: [
        { q: "What did they take as a jest, in 18:106?", a: "Allah's Ayat and Messengers", wrong: ["Their games", "Their food", "Their poems"], why: "Because they disbelieved and took My Ayat and My Messengers for jest." },
        { q: "Why are they punished, per Ibn Kathir?", a: "Disbelief and mocking", wrong: ["Being poor", "Being sick", "Traveling"], why: "Because of their disbelief and because they took the signs and Messengers of Allah as a joke." },
        { tf: true, q: "In 18:106 their recompense is Hell.", why: "That shall be their recompense, Hell." }
      ]
    },
    {
      slug: "gardens-of-al-firdaws",
      title: "Gardens of Al-Firdaws",
      line: "Good believers will live in Al-Firdaws and never wish to leave.",
      facts: ["The best part of Paradise", "Never bored, forever"],
      quote: q18(107),
      source: ik(107, "Believers who do righteous deeds will have the Gardens of Al-Firdaws as their welcome. They will stay forever and never wish to move.", "they will never choose or want anything else"),
      difficulty: 2,
      questions: [
        { q: "What is promised in 18:107?", a: "The Gardens of Al-Firdaws", wrong: ["A palace on earth", "A long life", "Great wealth"], why: "Shall have the Gardens of Al-Firdaws for their entertainment." },
        { q: "Will they want to leave, in 18:108?", a: "No, never", wrong: ["Yes, after a while", "Yes, often", "Only to visit"], why: "No desire will they have for removal therefrom." },
        { q: "Where is Al-Firdaws, per Qatadah?", a: "A hill in the centre of Paradise", wrong: ["At its edge", "Under the earth", "In the sea"], why: "Al-Firdaws is a hill in Paradise, at its center, the best of it." }
      ]
    },
    {
      slug: "ask-allah-for-al-firdaws",
      title: "Ask Allah for Al-Firdaws",
      line: "Ask Allah for Al-Firdaws, the highest part of Paradise.",
      facts: ["Paradise has 100 levels", "Rivers of Paradise flow from it"],
      quote: q18(107),
      source: hadith("bukhari", "2790", "Abu Hurairah", "Sahih", "Paradise has one hundred levels. The Prophet ﷺ said: When you ask Allah, ask for Al-Firdaws, the best and highest part of Paradise.", "ask for Al-firdaus which is the best and highest part of Paradise"),
      difficulty: 3,
      questions: [
        { q: "How many levels does Paradise have, in the hadith?", a: "One hundred", wrong: ["Seven", "Ten", "One thousand"], why: "Paradise has one-hundred grades." },
        { q: "What should we ask Allah for, in the hadith?", a: "Al-Firdaws", wrong: ["Wealth", "Fame", "A lower level"], why: "So, when you ask Allah, ask for Al-Firdaus which is the best and highest part of Paradise." },
        { q: "What flows from Al-Firdaws, in the hadith?", a: "The rivers of Paradise", wrong: ["Winds", "Light only", "Clouds"], why: "And from it originate the rivers of Paradise." }
      ]
    },
    {
      slug: "if-the-sea-were-ink",
      title: "If the sea were ink",
      line: "Seas of ink would run dry before Allah's Words ever ran out.",
      facts: ["Even more seas would not do", "Our knowledge is a drop"],
      quote: q18(109),
      source: ik(109, "If the sea were ink to write the words and wisdom of Allah, it would run dry before they were done, even with more seas added.", "the sea would run dry before it all could be written down"),
      difficulty: 3,
      questions: [
        { q: "What if the sea were ink, in 18:109?", a: "It would run out first", wrong: ["It would be enough", "It would grow", "It would freeze"], why: "Surely, the sea would be exhausted before the Words of my Lord would be finished." },
        { q: "Would another sea be enough, in 18:109?", a: "No, not even another", wrong: ["Yes, two are enough", "Yes, three", "Yes, a lake"], why: "Even if We brought like it for its aid." },
        { q: "What is our knowledge like, per Ar-Rabi?", a: "A drop next to the oceans", wrong: ["A whole ocean", "A river", "A mountain"], why: "The knowledge of all of mankind, in comparison to the knowledge of Allah, is that of a drop of water in comparison to all of the oceans." }
      ]
    },
    {
      slug: "do-good-for-allah-alone",
      title: "Do good for Allah alone",
      line: "Whoever hopes to meet Allah, do good and worship Him alone.",
      facts: ["The Prophet ﷺ was a man", "Two keys of accepted deeds"],
      quote: q18(110),
      source: ik(110, "The Prophet ﷺ is a man to whom revelation comes that Allah is One. A deed is accepted when it is done for Allah alone and in the way of the Messenger ﷺ.", "These are the two basic features of acceptable deeds"),
      difficulty: 4,
      questions: [
        { q: "What was revealed to him ﷺ, in 18:110?", a: "Your God is One God", wrong: ["Many gods exist", "No reckoning", "Nothing new"], why: "It has been revealed to me that your God is One God." },
        { q: "What must one who hopes to meet Allah do, in 18:110?", a: "Do good and worship Him alone", wrong: ["Gain wealth", "Travel far", "Stay silent"], why: "Let him work righteousness and associate none as a partner in the worship of his Lord." },
        { q: "What are the two keys of accepted deeds, per Ibn Kathir?", a: "For Allah alone, in the Sunnah way", wrong: ["Big and loud", "Seen by many", "Quick and easy"], why: "Their intent is for the sake of Allah alone, and are done in accordance with the way of the Messenger of Allah ﷺ." }
      ]
    },
    {
      slug: "allah-needs-no-partner",
      title: "Allah needs no partner",
      line: "Allah needs no partner, so do deeds for Him, not for show.",
      facts: ["Showing off spoils deeds", "Sincerity for Allah"],
      quote: q18(110),
      source: hadith("muslim", "2985", "Abu Hurairah", "Sahih", "Allah says: I am the One who has no need of a partner. Whoever does a deed for Me and for another, I leave him with what he joined with Me.", "I am the One, One Who does not stand in need of a partner"),
      difficulty: 4,
      questions: [
        { q: "What does Allah not need, in the hadith?", a: "A partner", wrong: ["Praise", "Thanks", "Worship"], why: "I am the One, One Who does not stand in need of a partner." },
        { q: "What happens to a deed shared with another?", a: "Allah leaves it to that other", wrong: ["It doubles", "It is fully kept", "Nothing"], why: "If anyone does anything in which he associates anyone else with Me, I shall abandon him with one whom he associates." },
        { q: "A deed done for Allah and for show is still accepted.", tf: false, why: "If anyone does anything in which he associates anyone else with Me, I shall abandon him with one whom he associates with Allah." }
      ]
    }
  ]
};

export const KAHF_UNITS: readonly DeepUnit[] = [KAHF_ONE, KAHF_TWO, KAHF_THREE, KAHF_FOUR];
