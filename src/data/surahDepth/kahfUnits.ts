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

export const KAHF_UNITS: readonly DeepUnit[] = [KAHF_ONE];
