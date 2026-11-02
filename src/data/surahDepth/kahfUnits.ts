import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

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


export const KAHF_UNITS: readonly DeepUnit[] = [KAHF_ONE, KAHF_TWO];
