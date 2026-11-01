import type { LearningSection } from "../types";
import { hadith, quran, quranQuote, type DeepUnit } from "./deepKit";

// The Day of Judgment topic: belief in the Last Day, the signs of the Hour, death and the grave, the Horn and the
// gathering, the reckoning and the scales, the intercession and the Pool, the bridge, Jannah and Jahannam, and how
// to get ready. Every card is from the Quran or a hadith checked on sunnah.com (number and grade as sunnah.com gives
// them). Anything the scholars differ on (the order of the major signs, dates, weak reports) is left out.

const LAST_DAY: DeepUnit = {
  key: "lastday",
  topicId: "akhirah",
  branchId: "akhirah-last-day",
  branch: { title: "Believing in the Last Day", description: "Why every Muslim believes in the Day of Judgment, and who knows when it comes." },
  name: "the Last Day",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "pillar",
      title: "A pillar of faith",
      line: "Faith in the Last Day is a pillar of iman.",
      facts: ["Jibril asked the Prophet ﷺ", "Allah, angels, books, messengers", "The Last Day and the decree"],
      source: hadith("muslim", "8a", "Umar ibn al-Khattab", "Sahih", "Jibril came as a man in white and asked about iman; the Prophet ﷺ said: to believe in Allah, His angels, His books, His messengers, the Last Day, and the decree, the good of it and the bad of it."),
      difficulty: 2,
      questions: [
        { q: "How many pillars of iman are there?", a: "Six", wrong: ["Two", "Four", "Ten"], why: "Allah, angels, books, messengers, the Last Day, the decree." },
        { q: "Which of these is a pillar of iman?", a: "Believing in the Last Day", wrong: ["Owning a house", "Living in Makkah", "Speaking Arabic"], why: "The Prophet ﷺ named it to Jibril." },
        { q: "Who asked the Prophet ﷺ about iman in this hadith?", a: "Jibril, looking like a man", wrong: ["Abu Jahl", "A king of Rome", "A child"], why: "Umar saw him come in white clothes." }
      ]
    },
    {
      slug: "righteousness",
      title: "True goodness",
      line: "True goodness starts with faith in Allah and the Last Day.",
      facts: ["Quran 2:177", "Faith first, then giving", "Then prayer and patience"],
      quote: quranQuote(2, 177),
      source: quran(2, 177, "Righteousness is not turning your faces east or west, but believing in Allah, the Last Day, the angels, the Book and the prophets, and giving wealth to those in need."),
      difficulty: 2,
      questions: [
        { q: "Quran 2:177 says true goodness is NOT just what?", a: "Turning your face east or west", wrong: ["Believing in Allah", "Giving to the poor", "Being patient"], why: "Goodness is faith and action, not only a direction." },
        { q: "Which belief does 2:177 name right after Allah?", a: "The Last Day", wrong: ["Your tribe", "Good luck", "The stars"], why: "One who believes in Allah and the Last Day." },
        { q: "Believing in the Last Day makes a person kinder to others.", tf: true, why: "2:177 joins it to giving and keeping promises." }
      ]
    },
    {
      slug: "only-allah",
      title: "Only Allah knows when",
      line: "No angel or prophet knows when the Hour comes. Only Allah.",
      facts: ["Quran 31:34", "One of five unseen things", "Anyone who names a date is wrong"],
      quote: quranQuote(31, 34),
      source: quran(31, 34, "Allah alone has knowledge of the Hour; He sends the rain and knows what is in the wombs; no soul knows what it will earn tomorrow or in what land it will die."),
      difficulty: 2,
      questions: [
        { q: "Who knows when the Hour will come?", a: "Only Allah", wrong: ["Fortune tellers", "Scientists", "The angels"], why: "Allah alone has knowledge of the Hour." },
        { q: "Someone online says the world ends next year. What do you think?", a: "Only Allah knows; they cannot know", wrong: ["They must be right", "Panic and stop praying", "Share it with everyone"], why: "Quran 31:34." },
        { q: "Which of these does 31:34 also say only Allah knows?", a: "Where each soul will die", wrong: ["Today's date", "The name of the moon", "How to cook"], why: "No soul knows in what land it will die." }
      ]
    },
    {
      slug: "jibril-hour",
      title: "Jibril asked about the Hour",
      line: "Asked by Jibril, he ﷺ said: I know no more than you.",
      facts: ["Even the Prophet ﷺ did not know", "He named its signs instead"],
      source: hadith("bukhari", "50", "Abu Hurairah", "Sahih", "Jibril asked: when will the Hour be? The Prophet ﷺ said: the one asked about it knows no better than the questioner, but I will tell you of its signs."),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ answer when Jibril asked when the Hour is?", a: "I know no more than you", wrong: ["In a hundred years", "Next Ramadan", "On a Friday soon"], why: "Only Allah knows its time." },
        { q: "What did he tell Jibril about instead?", a: "Its signs", wrong: ["Its exact year", "A secret code", "A map"], why: "He described signs before it." },
        { q: "The Prophet ﷺ knew the exact day of the Hour.", tf: false, why: "He said the one asked knows no better." }
      ]
    },
    {
      slug: "two-fingers",
      title: "Like two fingers",
      line: "He ﷺ joined two fingers: I and the Hour are this close.",
      facts: ["Index and middle finger", "He is the last prophet", "Next comes the Hour"],
      source: hadith("bukhari", "6504", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said: I have been sent, and the Hour, like these two, joining his two fingers."),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ show to say the Hour is close?", a: "Two fingers held together", wrong: ["A full hand", "A closed fist", "Ten fingers"], why: "I was sent and the Hour like these two." },
        { q: "What does this teach us?", a: "No prophet comes between him and the Hour", wrong: ["The Hour came already", "The Hour is a million years away", "Fingers are holy"], why: "He is the last messenger." },
        { q: "The Prophet ﷺ is the last messenger before the Hour.", tf: true, why: "That is why he said: like these two." }
      ]
    },
    {
      slug: "near",
      title: "The Hour has come near",
      line: "Allah says: the Hour has come near, and the moon split.",
      facts: ["Quran 54:1", "The moon split in his time", "A sign that the end is near"],
      quote: quranQuote(54, 1),
      source: quran(54, 1, "The Hour has come near, and the moon has split in two."),
      difficulty: 3,
      questions: [
        { q: "Which sign does Quran 54:1 mention?", a: "The moon split", wrong: ["The sun went out", "A star fell on Makkah", "The sea dried up"], why: "The Hour has come near, and the moon has split." },
        { q: "What does 54:1 say about the Hour?", a: "It has come near", wrong: ["It will never come", "It is a story", "It came long ago"], why: "Near, compared to all of history." },
        { q: "What should a believer do knowing the Hour is near?", a: "Get ready with good deeds", wrong: ["Stop working", "Be scared and do nothing", "Forget about it"], why: "Being ready is the point." }
      ]
    },
    {
      slug: "moon-split",
      title: "The moon split",
      line: "The moon split in two, and he ﷺ said: bear witness.",
      facts: ["In Makkah, before the Hijrah", "Sahih Muslim 2800a"],
      source: hadith("muslim", "2800a", "Abdullah ibn Mas'ud", "Sahih", "The moon was split into two parts in the lifetime of the Prophet ﷺ, and he said: bear witness to this."),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ say when the moon split?", a: "Bear witness", wrong: ["Run away", "Close your eyes", "Do not tell anyone"], why: "It was a miracle for all to see." },
        { q: "Which companion told us he saw it?", a: "Abdullah ibn Mas'ud", wrong: ["Abu Jahl", "Abu Lahab", "Fir'awn"], why: "Muslim 2800a." },
        { q: "The moon split happened in the time of the Prophet ﷺ.", tf: true, why: "Quran 54:1 and Muslim 2800a." }
      ]
    },
    {
      slug: "mercy-near",
      title: "Near is a mercy",
      line: "The Hour may be near, so do good and repent today.",
      facts: ["Quran 33:63", "Perhaps the Hour is near", "Live ready, not scared"],
      quote: quranQuote(33, 63),
      source: quran(33, 63, "People ask you about the Hour. Say: knowledge of it is only with Allah. And what will make you know? Perhaps the Hour is near."),
      difficulty: 3,
      questions: [
        { q: "When people asked about the Hour, what was the Prophet ﷺ told to say?", a: "Knowledge of it is only with Allah", wrong: ["It is in a hundred years", "Ask the stars", "It will never come"], why: "Quran 33:63." },
        { q: "What does 'perhaps the Hour is near' push you to do?", a: "Repent and do good today", wrong: ["Put off good deeds", "Waste time", "Argue about dates"], why: "Nobody is promised tomorrow." },
        { q: "Believers live in panic about the Hour.", tf: false, why: "They live ready, with hope in Allah's mercy." }
      ]
    },
    {
      slug: "asked-bedouin",
      title: "What did you prepare?",
      line: "Asked when the Hour is, he ﷺ said: what did you prepare?",
      facts: ["The man said: love of Allah and His Messenger", "You will be with those you love"],
      source: hadith("bukhari", "3688", "Anas ibn Malik", "Sahih", "A man asked the Prophet ﷺ about the Hour. He said: what have you prepared for it? The man said: nothing, except that I love Allah and His Messenger. He said: you will be with those you love."),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ ask the man back?", a: "What have you prepared for it?", wrong: ["Why do you ask?", "Who sent you?", "How old are you?"], why: "Getting ready matters more than the date." },
        { q: "What did the man say he had prepared?", a: "Love of Allah and His Messenger", wrong: ["A lot of gold", "A big house", "Nothing at all"], why: "He did not have many extra prayers or fasts." },
        { q: "What was the good news?", a: "You will be with those you love", wrong: ["You will be rich", "You will never die", "You will be famous"], why: "Anas said nothing made them happier." }
      ]
    }
  ]
};

const MINOR_SIGNS: DeepUnit = {
  key: "minorsigns",
  topicId: "akhirah",
  branchId: "akhirah-minor-signs",
  branch: { title: "The small signs", description: "Signs the Prophet ﷺ said would come before the Hour, many seen already." },
  name: "the small signs",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "buildings",
      title: "Tall buildings",
      line: "Poor camel shepherds will race to build tall buildings.",
      facts: ["Told to Jibril", "Poor herders become rich builders"],
      source: hadith("bukhari", "50", "Abu Hurairah", "Sahih", "Among the signs of the Hour: when the shepherds of black camels start boasting and competing with others in the construction of high buildings."),
      difficulty: 2,
      questions: [
        { q: "Who will compete in building tall buildings?", a: "Poor camel shepherds", wrong: ["Kings of old", "Angels", "Animals"], why: "A sign the Prophet ﷺ told Jibril." },
        { q: "What will they compete in?", a: "Building tall buildings", wrong: ["Racing camels", "Memorizing Quran", "Planting trees"], why: "Bukhari 50." },
        { q: "Tall buildings are a sign of the Hour named by the Prophet ﷺ.", tf: true, why: "Many see it today." }
      ]
    },
    {
      slug: "knowledge-goes",
      title: "Knowledge is taken",
      line: "Before the Hour, knowledge is taken and ignorance spreads.",
      facts: ["Scholars pass away", "So learn while you can"],
      source: hadith("bukhari", "80", "Anas ibn Malik", "Sahih", "Among the signs of the Hour: religious knowledge will be taken away, ignorance will prevail, drinking alcohol will be common, and open zina will spread."),
      difficulty: 2,
      questions: [
        { q: "What is taken away before the Hour?", a: "Religious knowledge", wrong: ["All the water", "The mountains", "The moon"], why: "Bukhari 80." },
        { q: "What spreads in its place?", a: "Ignorance", wrong: ["Wisdom", "Peace", "Gold"], why: "When knowledge goes, ignorance prevails." },
        { q: "What does this sign tell you to do now?", a: "Learn your deen while you can", wrong: ["Stop learning", "Wait for scholars", "Only play games"], why: "You are doing it right now in this app." }
      ]
    },
    {
      slug: "time-quick",
      title: "Time flies",
      line: "Time flies, earthquakes grow, and killing becomes common.",
      facts: ["Bukhari 1036", "Money will overflow too"],
      source: hadith("bukhari", "1036", "Abu Hurairah", "Sahih", "The Hour will not come until knowledge is taken away, earthquakes become very frequent, time passes quickly, afflictions appear, killing increases, and money overflows among you."),
      difficulty: 3,
      questions: [
        { q: "Which of these is a sign in Bukhari 1036?", a: "Time passing quickly", wrong: ["Days lasting longer", "No more rain", "Everyone stays young"], why: "Time will pass quickly." },
        { q: "What will become very frequent?", a: "Earthquakes", wrong: ["Eclipses every day", "Snow in Makkah", "Rainbows"], why: "Earthquakes will be very frequent." },
        { q: "What will increase among people?", a: "Killing", wrong: ["Kindness", "Patience", "Fasting"], why: "Al-harj: killing." }
      ]
    },
    {
      slug: "trust-lost",
      title: "When trust is lost",
      line: "When trust is lost, wait for the Hour.",
      facts: ["A bedouin asked the Prophet ﷺ", "Amanah means trust"],
      source: hadith("bukhari", "59", "Abu Hurairah", "Sahih", "When honesty is lost, then wait for the Hour. He was asked how it would be lost. He said: when authority is given to those who do not deserve it, then wait for the Hour."),
      difficulty: 3,
      questions: [
        { q: "What is lost before the Hour, in Bukhari 59?", a: "Trust (amanah)", wrong: ["The Kaaba", "The sun", "All animals"], why: "When honesty is lost, wait for the Hour." },
        { q: "How is trust lost?", a: "Jobs given to people who don't deserve them", wrong: ["When people pray too much", "When it rains", "When children learn"], why: "Authority given to the unfit." },
        { q: "You are made class leader. How do you keep the amanah?", a: "Be fair and do the job well", wrong: ["Only help friends", "Ignore the job", "Use it to boss people"], why: "Every job is a trust." }
      ]
    },
    {
      slug: "no-one-takes",
      title: "No one takes charity",
      line: "One day, no one will need the charity you carry.",
      facts: ["So give now", "Bukhari 1424"],
      source: hadith("bukhari", "1424", "Harithah ibn Wahb", "Sahih", "Give in charity, because a time will come when a person will carry his charity around and nobody will take it, saying: if you had brought it yesterday I would have taken it; today I do not need it."),
      difficulty: 3,
      questions: [
        { q: "What will happen to charity near the Hour?", a: "No one will need it", wrong: ["It will be banned", "Only kings get it", "It turns to stone"], why: "Wealth will be so much." },
        { q: "What did the Prophet ﷺ say to do because of this?", a: "Give charity now", wrong: ["Keep all your money", "Wait until later", "Give only on Eid"], why: "The chance to give will not last." },
        { q: "The poor man will say: if you had brought it yesterday...", tf: true, why: "Bukhari 1424." }
      ]
    },
    {
      slug: "euphrates",
      title: "A mountain of gold",
      line: "The Euphrates will uncover a mountain of gold: take none.",
      facts: ["People will fight over it", "99 of every 100 die"],
      source: hadith("bukhari", "7119", "Abu Hurairah", "Sahih", "Soon the Euphrates will uncover a treasure, a mountain of gold; whoever is present then should not take anything of it."),
      difficulty: 4,
      questions: [
        { q: "What will the Euphrates uncover?", a: "A mountain of gold", wrong: ["An old city", "A giant fish", "A spring of milk"], why: "Bukhari 7119." },
        { q: "What did the Prophet ﷺ say to do if you are there?", a: "Take nothing from it", wrong: ["Take all you can", "Sell it", "Hide it"], why: "Muslim 2894a says people will die fighting for it." },
        { q: "Most people who fight over it will die.", tf: true, why: "Ninety-nine of every hundred, says Muslim 2894a." }
      ]
    },
    {
      slug: "liars",
      title: "Thirty liars",
      line: "About thirty liars will claim to be prophets: none is true.",
      facts: ["He ﷺ is the last prophet", "Bukhari 7121"],
      source: hadith("bukhari", "7121", "Abu Hurairah", "Sahih", "The Hour will not come until about thirty liars appear, each claiming to be Allah's Messenger, and knowledge is taken away and earthquakes increase."),
      difficulty: 3,
      questions: [
        { q: "How many false prophets did he ﷺ warn of?", a: "About thirty", wrong: ["One", "Three", "A thousand"], why: "Bukhari 7121." },
        { q: "Someone claims to be a new prophet. What is true?", a: "He is lying: Muhammad ﷺ is the last", wrong: ["He might be real", "Follow him to check", "Ask him for proof"], why: "The Prophet ﷺ warned us of them." },
        { q: "There can be a prophet after Muhammad ﷺ.", tf: false, why: "He is the seal of the prophets (Quran 33:40)." }
      ]
    },
    {
      slug: "mosques",
      title: "Boasting about mosques",
      line: "People will boast to each other about their mosques.",
      facts: ["Sunan Abi Dawud 449", "Sahih (Al-Albani)", "Fill mosques, not just decorate"],
      source: hadith("abudawud", "449", "Anas ibn Malik", "Sahih (Al-Albani)", "The Last Hour will not come until people vie with one another about mosques."),
      difficulty: 3,
      questions: [
        { q: "What will people boast about before the Hour?", a: "Their mosques", wrong: ["Their prayers", "Their kindness", "Their fasting"], why: "Abu Dawud 449." },
        { q: "What matters most about a mosque?", a: "That people pray in it", wrong: ["Gold on the walls", "Being the biggest", "Beating the next town"], why: "Boasting is the problem." },
        { q: "Building a mosque to show off is a sign of the Hour.", tf: true, why: "Vying with one another about mosques." }
      ]
    },
    {
      slug: "sudden",
      title: "It comes suddenly",
      line: "The Hour comes so suddenly two people won't finish a sale.",
      facts: ["Bukhari 6506", "A man lifting food won't eat it"],
      source: hadith("bukhari", "6506", "Abu Hurairah", "Sahih", "The Hour will come so suddenly that two people spreading a garment to sell will not finish their deal or fold it, and a man will raise food to his mouth and not eat it."),
      difficulty: 3,
      questions: [
        { q: "How will the Hour come?", a: "Suddenly", wrong: ["Slowly, with warning", "After a countdown", "Only at night"], why: "People will be in the middle of things." },
        { q: "What won't two traders manage to do?", a: "Finish their sale", wrong: ["Say hello", "Count to ten", "See the sky"], why: "Bukhari 6506." },
        { q: "What is the best way to be ready for something sudden?", a: "Be doing good all the time", wrong: ["Do good only at the end", "Guess the date", "Ignore it"], why: "No one gets a warning." }
      ]
    }
  ]
};

const MAJOR_SIGNS: DeepUnit = {
  key: "majorsigns",
  topicId: "akhirah",
  branchId: "akhirah-major-signs",
  branch: { title: "The ten big signs", description: "The ten great signs, the Dajjal, Isa's return, and the sun rising from the west." },
  name: "the big signs",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "ten",
      title: "Ten big signs",
      line: "The Hour will not come until ten great signs appear.",
      facts: ["Smoke, Dajjal, the Beast", "Sun from the west, Isa", "Ya'juj and Ma'juj, three landslides, a fire"],
      source: hadith("muslim", "2901a", "Hudhayfah ibn Asid", "Sahih", "The Hour will not come until you see ten signs: the smoke, the Dajjal, the beast, the sun rising from the west, the descent of Isa son of Maryam, Ya'juj and Ma'juj, three landslides in the east, the west and Arabia, and a fire from Yemen that drives people to their gathering place."),
      difficulty: 3,
      questions: [
        { q: "How many great signs come before the Hour?", a: "Ten", wrong: ["Three", "Seven", "Forty"], why: "Muslim 2901a." },
        { q: "Which is one of the ten great signs?", a: "The sun rising from the west", wrong: ["A new phone", "A big storm", "A total eclipse"], why: "It is one of the ten." },
        { q: "Which prophet comes back as one of the signs?", a: "Isa (Jesus)", wrong: ["Musa", "Nuh", "Ibrahim"], why: "The descent of Isa son of Maryam." }
      ]
    },
    {
      slug: "dajjal-warned",
      title: "Every prophet warned",
      line: "Every prophet warned his people about the Dajjal, a liar.",
      facts: ["He is blind in one eye", "Allah has no flaw", "Kafir written between his eyes"],
      source: hadith("bukhari", "7131", "Anas ibn Malik", "Sahih", "No prophet was sent but that he warned his people of the one-eyed liar. He is blind in one eye, your Lord is not, and between his eyes is written: kafir."),
      difficulty: 3,
      questions: [
        { q: "Who warned about the Dajjal?", a: "Every prophet", wrong: ["Only Nuh", "No one", "Only kings"], why: "Bukhari 7131." },
        { q: "How can a believer tell he is a liar?", a: "He is blind in one eye; Allah is perfect", wrong: ["He is very short", "He wears green", "He speaks quietly"], why: "Allah is perfect, without any flaw." },
        { q: "What is written between his eyes?", a: "Kafir (disbeliever)", wrong: ["His name", "A number", "Nothing"], why: "Believers will read it." }
      ]
    },
    {
      slug: "dajjal-tricks",
      title: "His tricks",
      line: "The Dajjal brings rain to his followers, to fool them.",
      facts: ["He stays forty days", "One day like a year", "He moves like wind-blown cloud"],
      source: hadith("muslim", "2937a", "An-Nawwas ibn Sam'an", "Sahih", "The Dajjal will stay forty days: a day like a year, a day like a month, a day like a week, the rest like ours. He will order the sky to rain for those who believe him, and those who reject him will have drought."),
      difficulty: 4,
      questions: [
        { q: "How long will the Dajjal stay on earth?", a: "Forty days", wrong: ["Forty years", "Seven days", "One night"], why: "But one day is like a year." },
        { q: "How long is his first day?", a: "Like a year", wrong: ["Like an hour", "Like a minute", "Normal"], why: "Then like a month, then like a week." },
        { q: "The companions asked: do we pray one day's prayers in that year-long day?", tf: false, why: "He said: no, estimate the times and pray." }
      ]
    },
    {
      slug: "dajjal-safe",
      title: "Makkah and Madinah are safe",
      line: "The Dajjal can never enter Makkah or Madinah.",
      facts: ["Angels stand at every road", "Madinah shakes out the hypocrites"],
      source: hadith("bukhari", "1881", "Anas ibn Malik", "Sahih", "There is no town the Dajjal will not enter except Makkah and Madinah; on every road into them angels stand in rows guarding them; then Madinah will shake three times and Allah will expel every disbeliever and hypocrite."),
      difficulty: 3,
      questions: [
        { q: "Which two cities can the Dajjal not enter?", a: "Makkah and Madinah", wrong: ["Cairo and Baghdad", "Rome and London", "Taif and Jeddah"], why: "Bukhari 1881." },
        { q: "Who guards them?", a: "Angels in rows", wrong: ["Soldiers", "Lions", "A high wall"], why: "On every road into them." },
        { q: "Madinah will shake out the hypocrites.", tf: true, why: "It shakes three times." }
      ]
    },
    {
      slug: "kahf",
      title: "Your shield: Al-Kahf",
      line: "The first ten ayahs of Al-Kahf protect from the Dajjal.",
      facts: ["Sahih Muslim 809a", "Surah 18", "Start learning them today"],
      source: hadith("muslim", "809a", "Abu Darda", "Sahih", "Whoever memorizes the first ten verses of Surah al-Kahf will be protected from the Dajjal."),
      difficulty: 3,
      questions: [
        { q: "Which surah protects from the Dajjal?", a: "Al-Kahf", wrong: ["Al-Fil", "Al-Kawthar", "Quraysh"], why: "Muslim 809a." },
        { q: "How many of its ayahs should you memorize?", a: "The first ten", wrong: ["Just one", "The last two", "All 110"], why: "The first ten verses." },
        { q: "What number is Surah Al-Kahf?", a: "18", wrong: ["1", "36", "114"], why: "The Cave, surah 18." }
      ]
    },
    {
      slug: "tashahhud",
      title: "A dua in every prayer",
      line: "At the end of prayer, ask Allah to protect you from four.",
      facts: ["Hellfire, the grave", "Trials of life and death", "The Dajjal"],
      source: hadith("muslim", "588a", "Abu Hurairah", "Sahih", "When one of you finishes the tashahhud, let him seek refuge with Allah from four: the punishment of Hell, the punishment of the grave, the trial of life and death, and the evil of the Dajjal."),
      difficulty: 3,
      questions: [
        { q: "When do we say this dua?", a: "After the tashahhud in prayer", wrong: ["Before eating", "On waking up", "Only on Eid"], why: "Muslim 588a." },
        { q: "Which of these is one of the four?", a: "The trial of the Dajjal", wrong: ["Bad weather", "Losing a game", "Being late"], why: "Hell, the grave, life and death, the Dajjal." },
        { q: "How many things do we seek refuge from in it?", a: "Four", wrong: ["Two", "Seven", "Ten"], why: "Four trials." }
      ]
    },
    {
      slug: "isa-returns",
      title: "Isa comes back",
      line: "Isa son of Maryam will come down as a just ruler.",
      facts: ["He breaks the cross", "He kills the pig", "Wealth is so much no one takes charity"],
      source: hadith("bukhari", "2222", "Abu Hurairah", "Sahih", "By the One in whose hand is my soul, the son of Maryam will soon descend among you as a just ruler; he will break the cross, kill the pig and abolish the jizyah, and wealth will be so abundant no one accepts charity."),
      difficulty: 3,
      questions: [
        { q: "How will Isa come back?", a: "As a just ruler", wrong: ["As a new prophet with a new book", "As a baby", "As an angel"], why: "Bukhari 2222." },
        { q: "What will he break?", a: "The cross", wrong: ["The Kaaba", "His sword", "The moon"], why: "He follows Islam, the religion of all prophets." },
        { q: "Isa did not die; Allah raised him up, and he will return.", tf: true, why: "Quran 4:157-158 and this hadith." }
      ]
    },
    {
      slug: "isa-damascus",
      title: "The white minaret",
      line: "Isa comes down east of Damascus and ends the Dajjal.",
      facts: ["Hands on two angels' wings", "He catches the Dajjal at the gate of Ludd"],
      source: hadith("muslim", "2937a", "An-Nawwas ibn Sam'an", "Sahih", "Allah will send Isa son of Maryam; he will descend at the white minaret east of Damascus, his hands on the wings of two angels; he will search for the Dajjal and kill him at the gate of Ludd."),
      difficulty: 4,
      questions: [
        { q: "Where will Isa come down?", a: "The white minaret east of Damascus", wrong: ["The Kaaba roof", "Mount Sinai", "The sea"], why: "Muslim 2937a." },
        { q: "Who will end the Dajjal?", a: "Isa", wrong: ["An army of horses", "A storm", "No one"], why: "At the gate of Ludd." },
        { q: "Where will Isa catch the Dajjal?", a: "At the gate of Ludd", wrong: ["In Makkah", "In Madinah", "On a ship"], why: "Muslim 2937a." }
      ]
    },
    {
      slug: "yajuj",
      title: "Ya'juj and Ma'juj",
      line: "Ya'juj and Ma'juj will pour down from every high place.",
      facts: ["Dhul-Qarnayn built a barrier", "Quran 18:94 and 21:96"],
      quote: quranQuote(21, 96),
      source: quran(21, 96, "Until when Gog and Magog have been let loose, and they descend from every elevation."),
      difficulty: 4,
      questions: [
        { q: "Who built a barrier against Ya'juj and Ma'juj?", a: "Dhul-Qarnayn", wrong: ["Fir'awn", "Qarun", "Namrud"], why: "Quran 18:94." },
        { q: "What does 21:96 say they will do?", a: "Pour down from every high place", wrong: ["Stay asleep", "Build a city", "Fly to the moon"], why: "They descend from every elevation." },
        { q: "Ya'juj and Ma'juj are one of the ten great signs.", tf: true, why: "Muslim 2901a." }
      ]
    },
    {
      slug: "sun-west",
      title: "The sun rises in the west",
      line: "When the sun rises from the west, the door of repentance closes.",
      facts: ["Everyone will believe then", "Too late for new faith", "Quran 6:158"],
      quote: quranQuote(6, 158),
      source: hadith("bukhari", "4635", "Abu Hurairah", "Sahih", "The Hour will not come until the sun rises from the west; when people see it, all on earth will believe, and that is when no good will it do a soul to believe if it did not believe before."),
      difficulty: 4,
      questions: [
        { q: "What happens when the sun rises from the west?", a: "Repentance is no longer accepted", wrong: ["It is a normal day", "Night lasts forever", "Ramadan starts"], why: "Belief then will not help." },
        { q: "Which ayah does the Prophet ﷺ link to it?", a: "Quran 6:158", wrong: ["Quran 1:1", "Quran 112:1", "Quran 2:255"], why: "No soul will benefit from new faith." },
        { q: "So when is the best time to repent?", a: "Now, today", wrong: ["When the sun rises in the west", "When old", "Never"], why: "The door is open now." }
      ]
    }
  ]
};

const GRAVE: DeepUnit = {
  key: "grave",
  topicId: "akhirah",
  branchId: "akhirah-death-grave",
  branch: { title: "Death and the grave", description: "Every soul tastes death. What happens in the grave, the barzakh, and the deeds that keep going." },
  name: "death and the grave",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "taste",
      title: "Every soul tastes death",
      line: "Every soul tastes death; full rewards come on the Last Day.",
      facts: ["Quran 3:185", "Saved from the Fire: real success", "This life is short enjoyment"],
      quote: quranQuote(3, 185),
      source: quran(3, 185, "Every soul will taste death, and you will be paid in full only on the Day of Resurrection; whoever is drawn away from the Fire and admitted to Paradise has succeeded."),
      difficulty: 2,
      questions: [
        { q: "Who will taste death?", a: "Every soul", wrong: ["Only old people", "Only bad people", "Only animals"], why: "Quran 3:185." },
        { q: "When are rewards paid in full?", a: "On the Day of Resurrection", wrong: ["On your birthday", "Every Friday", "At school"], why: "Not all in this life." },
        { q: "What is real success in 3:185?", a: "Saved from the Fire, into Jannah", wrong: ["Being rich", "Being famous", "Living long"], why: "That is the true win." }
      ]
    },
    {
      slug: "remember",
      title: "Remember death often",
      line: "He ﷺ said: remember death often, the cutter of pleasures.",
      facts: ["Jami at-Tirmidhi 2307", "Hasan Sahih (Al-Albani)", "It keeps the heart soft"],
      source: hadith("tirmidhi", "2307", "Abu Hurairah", "Hasan Sahih (Al-Albani)", "Remember often the destroyer of pleasures, meaning death."),
      difficulty: 3,
      questions: [
        { q: "What did he call death?", a: "The cutter of pleasures", wrong: ["The long sleep", "The end of nothing", "A story"], why: "Tirmidhi 2307." },
        { q: "Why remember death?", a: "So we use our time well", wrong: ["To be sad all day", "To stop working", "To scare others"], why: "It keeps us from wasting life." },
        { q: "The Prophet ﷺ told us to remember death often.", tf: true, why: "Hasan Sahih." }
      ]
    },
    {
      slug: "three-follow",
      title: "Three follow, one stays",
      line: "Family, money and deeds follow you; only deeds stay.",
      facts: ["Sahih al-Bukhari 6514", "Family goes home", "Money stays behind"],
      source: hadith("bukhari", "6514", "Anas ibn Malik", "Sahih", "Three follow the dead person: his family, his wealth and his deeds; two return and one remains: his family and wealth go back, his deeds stay with him."),
      difficulty: 2,
      questions: [
        { q: "What stays with you in the grave?", a: "Your deeds", wrong: ["Your phone", "Your money", "Your friends"], why: "Bukhari 6514." },
        { q: "Which two go back home?", a: "Family and wealth", wrong: ["Deeds and prayers", "Angels and books", "Nothing goes back"], why: "Two return, one stays." },
        { q: "So what should you collect most?", a: "Good deeds", wrong: ["Toys", "Followers", "Clothes"], why: "Only they come with you." }
      ]
    },
    {
      slug: "barzakh",
      title: "The barzakh",
      line: "After death comes the barzakh, a barrier until the Day.",
      facts: ["Quran 23:99-100", "No going back", "\"My Lord, send me back\""],
      quote: quranQuote(23, 100),
      source: quran(23, 100, "When death comes to one of them, he says: my Lord, send me back so I may do good in what I left. No! It is only a word he says; behind them is a barrier until the Day they are resurrected."),
      difficulty: 3,
      questions: [
        { q: "What is the barzakh?", a: "The barrier between death and resurrection", wrong: ["A river in Jannah", "A city in Iraq", "A kind of prayer"], why: "Quran 23:100." },
        { q: "What does the one who wasted his life beg for?", a: "To be sent back to do good", wrong: ["Money", "Sleep", "Food"], why: "\"My Lord, send me back.\"" },
        { q: "Can anyone come back from death to fix their deeds?", a: "No", wrong: ["Yes, once", "Yes, if rich", "Only on Friday"], why: "\"No! It is only a word he says.\"" }
      ]
    },
    {
      slug: "footsteps",
      title: "He hears their footsteps",
      line: "In the grave, he hears them leave; then two angels come.",
      facts: ["They sit him up", "They ask about the Prophet ﷺ", "He sees his place in Jannah or Fire"],
      source: hadith("bukhari", "1338", "Anas ibn Malik", "Sahih", "When a person is laid in his grave and his companions leave, he hears their footsteps; two angels come, sit him up and ask: what did you say about this man, Muhammad?"),
      difficulty: 3,
      questions: [
        { q: "What does the dead person hear as people leave?", a: "Their footsteps", wrong: ["Music", "Nothing at all", "Thunder"], why: "Bukhari 1338." },
        { q: "How many angels come to question him?", a: "Two", wrong: ["One", "Seven", "None"], why: "Two angels sit him up." },
        { q: "What does the believer see from his grave?", a: "His place in Jannah", wrong: ["His old house", "His school", "Nothing"], why: "And the place in the Fire he was saved from." }
      ]
    },
    {
      slug: "three-questions",
      title: "The three questions",
      line: "Who is your Lord? What is your religion? Who is your Prophet?",
      facts: ["Sunan Abi Dawud 4753", "Sahih (Al-Albani)", "Answers come from how you lived"],
      source: hadith("abudawud", "4753", "Al-Bara ibn Azib", "Sahih (Al-Albani)", "Two angels sit him up and ask: who is your Lord? He says: Allah. What is your religion? He says: Islam. Who is this man sent among you? He says: the Messenger of Allah ﷺ."),
      difficulty: 3,
      questions: [
        { q: "What is the first question in the grave?", a: "Who is your Lord?", wrong: ["How rich were you?", "Where did you live?", "What was your job?"], why: "Abu Dawud 4753." },
        { q: "What does the believer answer about his religion?", a: "My religion is Islam", wrong: ["I don't know", "Whatever was popular", "My family's job"], why: "Allah keeps him firm." },
        { q: "Who can answer well in the grave?", a: "One who lived by the answers", wrong: ["One who memorized only the words", "Anyone rich", "Anyone loud"], why: "The disbeliever says: alas, I do not know." }
      ]
    },
    {
      slug: "garden",
      title: "A bed from Jannah",
      line: "The believer's grave gets a door and a bed from Jannah.",
      facts: ["\"My servant spoke the truth\"", "Its scent reaches him"],
      source: hadith("abudawud", "4753", "Al-Bara ibn Azib", "Sahih (Al-Albani)", "A caller from heaven says: my servant spoke the truth, so spread for him a bed from Paradise, clothe him from Paradise and open for him a door to Paradise; its breeze and scent reach him, and his grave is made wide as far as the eye can see."),
      difficulty: 3,
      questions: [
        { q: "What door is opened for the believer in the grave?", a: "A door to Jannah", wrong: ["A door to his house", "A window to the sky", "No door"], why: "Abu Dawud 4753." },
        { q: "How wide is his grave made?", a: "As far as the eye can see", wrong: ["One step", "Same as before", "As big as a house"], why: "A gift for the truthful." },
        { q: "What does the caller from heaven say?", a: "My servant spoke the truth", wrong: ["Wake up", "Go back", "Wait here"], why: "Then the gifts come." }
      ]
    },
    {
      slug: "refuge-grave",
      title: "Ask protection from the grave",
      line: "He ﷺ often asked Allah to save him from the grave's punishment.",
      facts: ["Sahih al-Bukhari 1377", "Make it your dua too"],
      source: hadith("bukhari", "1377", "Abu Hurairah", "Sahih", "The Prophet ﷺ used to say: O Allah, I seek refuge with You from the punishment of the grave, the punishment of the Fire, the trials of life and death, and the trial of the Dajjal."),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ seek refuge from, in Bukhari 1377?", a: "The punishment of the grave", wrong: ["Bad dreams only", "Hot weather", "Hunger"], why: "And the Fire, life's trials, the Dajjal." },
        { q: "Is the punishment of the grave real, by this hadith?", a: "Yes", wrong: ["No", "Only a story", "Only for animals"], why: "He would not seek refuge from something unreal." },
        { q: "Making this dua daily follows the Sunnah.", tf: true, why: "He used to say it." }
      ]
    },
    {
      slug: "continue",
      title: "Deeds that keep going",
      line: "When a person dies, deeds stop, except three that keep going.",
      facts: ["Ongoing charity", "Useful knowledge", "A good child who prays for them"],
      source: hadith("muslim", "1631", "Abu Hurairah", "Sahih", "When a person dies, his deeds end except three: ongoing charity, knowledge that benefits, or a righteous child who prays for him."),
      difficulty: 2,
      questions: [
        { q: "How many deeds keep going after death?", a: "Three", wrong: ["One", "Five", "None"], why: "Muslim 1631." },
        { q: "Which is one of them?", a: "Knowledge that benefits people", wrong: ["A big car", "Many photos", "Good grades"], why: "Teaching others keeps rewarding you." },
        { q: "Planting a tree people use, or building a well, is...", a: "Ongoing charity", wrong: ["A waste", "Only for the rich", "Not counted"], why: "Sadaqah jariyah keeps going." }
      ]
    }
  ]
};

const GATHERING: DeepUnit = {
  key: "gathering",
  topicId: "akhirah",
  branchId: "akhirah-horn-gathering",
  branch: { title: "The Horn and the gathering", description: "The Horn is blown, the earth shakes, and everyone is raised and gathered." },
  name: "the Horn and the gathering",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "horn",
      title: "The Horn is blown",
      line: "The Horn is blown: all fall dead. Blown again: all stand.",
      facts: ["Quran 39:68", "Two blowings", "Except whom Allah wills"],
      quote: quranQuote(39, 68),
      source: quran(39, 68, "The Horn will be blown and all in the heavens and earth will fall dead, except whom Allah wills; then it will be blown again and at once they will be standing, looking on."),
      difficulty: 2,
      questions: [
        { q: "What happens at the first blowing of the Horn?", a: "Everyone falls dead", wrong: ["Everyone wakes", "Ramadan begins", "The sun rises"], why: "Quran 39:68." },
        { q: "What happens at the second blowing?", a: "All stand up, alive", wrong: ["Nothing", "Everyone sleeps", "The sea dries"], why: "They are standing, looking on." },
        { q: "How many times is the Horn blown in 39:68?", a: "Twice", wrong: ["Once", "Seven times", "Never"], why: "Then it will be blown again." }
      ]
    },
    {
      slug: "forty",
      title: "Forty what?",
      line: "Between the two blowings is forty. Forty what? Not said.",
      facts: ["He refused to guess", "All of the body decays but the tailbone", "From it Allah rebuilds us"],
      source: hadith("bukhari", "4814", "Abu Hurairah", "Sahih", "Between the two blowings is forty. They asked: forty days? forty years? He refused to answer. Everything of the body decays except the tailbone, and from it Allah rebuilds the body."),
      difficulty: 4,
      questions: [
        { q: "What did Abu Hurayrah do when asked 'forty days or years?'", a: "Refused to guess", wrong: ["Said forty years", "Said forty days", "Laughed"], why: "He only said what he heard." },
        { q: "Which bone does not decay?", a: "The tailbone", wrong: ["The skull", "The teeth", "The heart"], why: "From it Allah rebuilds the body." },
        { q: "Abu Hurayrah's lesson: don't add to what the Prophet ﷺ said.", tf: true, why: "If you don't know, say you don't know." }
      ]
    },
    {
      slug: "quake",
      title: "The great earthquake",
      line: "The earth will shake its final shake and tell its news.",
      facts: ["Quran 99:1-4", "The earth will speak", "It reports what was done on it"],
      quote: quranQuote(99, 1),
      source: quran(99, 1, "When the earth is shaken with its final earthquake and throws out its burdens, and man says: what is wrong with it? That Day it will report its news."),
      difficulty: 2,
      questions: [
        { q: "What will the earth do that Day, in Surah Az-Zalzalah?", a: "Report its news", wrong: ["Stay silent", "Fly away", "Turn to gold"], why: "Quran 99:4." },
        { q: "What does the earth throw out?", a: "Its burdens", wrong: ["Flowers", "Coins only", "Rain"], why: "Quran 99:2." },
        { q: "The ground you walk on will tell what you did on it.", tf: true, why: "That Day it will report its news." }
      ]
    },
    {
      slug: "sky-folded",
      title: "The sky is rolled up",
      line: "Allah rolls up the heavens and says: I am the King.",
      facts: ["Sahih al-Bukhari 4812", "All power is His", "Quran 21:104"],
      quote: quranQuote(21, 104),
      source: hadith("bukhari", "4812", "Abu Hurairah", "Sahih", "Allah will hold the whole earth and roll up the heavens in His right hand, and say: I am the King; where are the kings of the earth?"),
      difficulty: 3,
      questions: [
        { q: "What will Allah say that Day?", a: "I am the King: where are the kings of the earth?", wrong: ["Who is the richest?", "Who is tallest?", "Nothing"], why: "Bukhari 4812." },
        { q: "What will He roll up in His right hand?", a: "The heavens", wrong: ["A carpet", "The sea", "A scroll of poems"], why: "Like a written sheet is rolled up (21:104)." },
        { q: "What does this teach about kings and presidents?", a: "Their power ends; Allah's never does", wrong: ["They rule forever", "They judge on that Day", "They are safe"], why: "All the kingdom is His." }
      ]
    },
    {
      slug: "mountains",
      title: "Mountains like wool",
      line: "People like scattered moths, mountains like fluffed wool.",
      facts: ["Quran 101:4-5", "Al-Qari'ah: the Striking Day"],
      quote: quranQuote(101, 4),
      source: quran(101, 4, "It is the Day when people will be like moths, dispersed, and the mountains like wool, fluffed up."),
      difficulty: 3,
      questions: [
        { q: "What will the mountains be like?", a: "Fluffed-up wool", wrong: ["Gold", "Ice", "Glass"], why: "Quran 101:5." },
        { q: "What will people be like?", a: "Scattered moths", wrong: ["Sleeping cats", "Tall trees", "Calm birds"], why: "Quran 101:4." },
        { q: "Which surah describes this?", a: "Al-Qari'ah", wrong: ["Al-Fatihah", "Al-Kawthar", "Al-Ikhlas"], why: "The Striking Calamity, surah 101." }
      ]
    },
    {
      slug: "raised-barefoot",
      title: "Raised just as born",
      line: "People are raised barefoot, just as Allah first made them.",
      facts: ["Too busy to look at anyone", "As We began creation, We repeat it"],
      source: hadith("bukhari", "6527", "Aishah", "Sahih", "People will be gathered barefoot, naked and uncircumcised. Aishah asked: will men and women look at each other? He said: the matter will be too serious for that."),
      difficulty: 3,
      questions: [
        { q: "How will people be gathered?", a: "Barefoot and unclothed", wrong: ["In their best clothes", "On thrones", "In cars"], why: "Bukhari 6527." },
        { q: "Aishah asked if people would look at each other. The answer?", a: "It will be too serious for that", wrong: ["Yes, freely", "Only friends", "Only family"], why: "Everyone worries about themselves." },
        { q: "Allah brings us back just as He first made us.", tf: true, why: "Quran 21:104." }
      ]
    },
    {
      slug: "ibrahim-clothed",
      title: "First to be clothed",
      line: "The first to be clothed on the Day of Resurrection is Ibrahim.",
      facts: ["Sahih al-Bukhari 3349", "An honor for Allah's friend"],
      source: hadith("bukhari", "3349", "Ibn Abbas", "Sahih", "You will be gathered barefoot, naked and uncircumcised; the first to be clothed on the Day of Resurrection will be Ibrahim."),
      difficulty: 3,
      questions: [
        { q: "Who is first to be clothed on that Day?", a: "Ibrahim", wrong: ["Adam", "Nuh", "Musa"], why: "Bukhari 3349." },
        { q: "What is Ibrahim called in the Quran?", a: "Khalilullah, Allah's close friend", wrong: ["The king", "The sailor", "The doctor"], why: "Quran 4:125." },
        { q: "Every prophet is clothed at the same moment.", tf: false, why: "Ibrahim is first." }
      ]
    },
    {
      slug: "flee",
      title: "Running from family",
      line: "That Day a person runs even from his own family.",
      facts: ["Quran 80:34-37", "Each one busy with himself"],
      quote: quranQuote(80, 34),
      source: quran(80, 34, "On the Day a man will flee from his brother, his mother and father, his wife and children; every person that Day will have enough to worry about."),
      difficulty: 3,
      questions: [
        { q: "Who will a man run from that Day?", a: "Even his own family", wrong: ["Only enemies", "Nobody", "Only animals"], why: "Quran 80:34-36." },
        { q: "Why?", a: "Each person is busy with himself", wrong: ["They are angry", "They are hungry", "They forgot names"], why: "Quran 80:37." },
        { q: "What can you do now for your family?", a: "Help them do good today", wrong: ["Nothing matters", "Wait for that Day", "Only buy gifts"], why: "Protect yourselves and your families (66:6)." }
      ]
    },
    {
      slug: "long-day",
      title: "A very long Day",
      line: "That Day is as long as fifty thousand years.",
      facts: ["Quran 70:4", "The sun comes close", "People in sweat by their deeds"],
      quote: quranQuote(70, 4),
      source: quran(70, 4, "The angels and the Spirit ascend to Him in a Day the length of which is fifty thousand years."),
      difficulty: 3,
      questions: [
        { q: "How long is that Day, in Quran 70:4?", a: "Fifty thousand years", wrong: ["One day", "Forty minutes", "A hundred years"], why: "Quran 70:4." },
        { q: "How close does the sun come, in Muslim 2864?", a: "About a mile", wrong: ["Further away", "It disappears", "Same as today"], why: "People are in sweat by their deeds." },
        { q: "What makes the sweat less or more?", a: "Each person's deeds", wrong: ["Their height", "Their clothes", "Luck"], why: "Muslim 2864." }
      ]
    },
    {
      slug: "shade",
      title: "Seven in the shade",
      line: "Seven people get Allah's shade when there is no other.",
      facts: ["A just ruler, a youth who worships Allah", "Heart tied to the mosque", "Secret charity, tears alone"],
      source: hadith("bukhari", "660", "Abu Hurairah", "Sahih", "Seven will be shaded by Allah on the Day there is no shade but His: a just ruler, a youth raised worshipping Allah, a man whose heart is attached to the mosques, two who love each other for Allah, a man who refuses a sinful invitation fearing Allah, one who gives charity secretly, and one who remembers Allah alone and weeps."),
      difficulty: 3,
      questions: [
        { q: "How many people get Allah's shade in this hadith?", a: "Seven", wrong: ["Three", "Ten", "Forty"], why: "Bukhari 660." },
        { q: "Which young person is among them?", a: "A youth raised worshipping Allah", wrong: ["A youth with many followers", "A youth who wins races", "Any youth"], why: "You can be this one now." },
        { q: "How does one of them give charity?", a: "So secretly the left hand doesn't know", wrong: ["Loudly", "With a photo", "Only to friends"], why: "Bukhari 660." }
      ]
    }
  ]
};

const RECKONING: DeepUnit = {
  key: "reckoning",
  topicId: "akhirah",
  branchId: "akhirah-reckoning",
  branch: { title: "The reckoning and the scales", description: "The book of deeds, the questions, the scales, and Allah's perfect justice." },
  name: "the reckoning",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "atom",
      title: "An atom's weight",
      line: "Even an atom's weight of good, you will see it.",
      facts: ["Quran 99:7-8", "Nothing is too small"],
      quote: quranQuote(99, 7),
      source: quran(99, 7, "Whoever does an atom's weight of good will see it, and whoever does an atom's weight of evil will see it."),
      difficulty: 2,
      questions: [
        { q: "How small a good deed will you see on that Day?", a: "Even an atom's weight", wrong: ["Only big ones", "Only ones people saw", "None"], why: "Quran 99:7." },
        { q: "You smile at a sad classmate. Does it count?", a: "Yes, even small good is seen", wrong: ["No, too small", "Only if filmed", "Only in Ramadan"], why: "An atom's weight of good." },
        { q: "Small bad deeds are forgotten on that Day.", tf: false, why: "Quran 99:8, unless Allah forgives them." }
      ]
    },
    {
      slug: "book",
      title: "The book of deeds",
      line: "Each person gets a book that missed nothing, small or big.",
      facts: ["Quran 18:49", "\"What is this book?\"", "Allah wrongs no one"],
      quote: quranQuote(18, 49),
      source: quran(18, 49, "The record will be placed and you will see the criminals fearful of it, saying: woe to us, what is this book that leaves nothing small or great except that it has counted it? They will find what they did present, and your Lord wrongs no one."),
      difficulty: 3,
      questions: [
        { q: "What does the book of deeds leave out?", a: "Nothing, small or great", wrong: ["Small things", "Secret things", "Things done at night"], why: "Quran 18:49." },
        { q: "Who wrote everything down?", a: "The angels, by Allah's command", wrong: ["Your friends", "Nobody", "You, in a diary"], why: "Noble scribes (82:10-12)." },
        { q: "Allah will wrong someone on that Day.", tf: false, why: "Your Lord wrongs no one." }
      ]
    },
    {
      slug: "right-hand",
      title: "Right hand or left",
      line: "Book in the right hand? You say: come, read my book!",
      facts: ["Quran 69:19", "Left hand: \"I wish I had not been given it\""],
      quote: quranQuote(69, 19),
      source: quran(69, 19, "As for the one given his record in his right hand, he will say: here, read my record! But the one given it in his left will say: I wish I had not been given my record."),
      difficulty: 2,
      questions: [
        { q: "What does the one with the book in his right hand say?", a: "Come, read my book!", wrong: ["Hide it!", "I lost it", "It is not mine"], why: "He is happy to show it." },
        { q: "What does the one with it in his left hand wish?", a: "That he never got it", wrong: ["For a bigger book", "To read it again", "For a pen"], why: "Quran 69:25." },
        { q: "Getting the book in the right hand is good news.", tf: true, why: "Quran 69:19-24." }
      ]
    },
    {
      slug: "easy",
      title: "An easy reckoning",
      line: "An easy reckoning: your deeds are shown, not argued.",
      facts: ["Quran 84:7-9", "Aishah asked about it", "Bukhari 103"],
      quote: quranQuote(84, 8),
      source: hadith("bukhari", "103", "Aishah", "Sahih", "The Prophet ﷺ said: whoever is called to account will be punished. Aishah asked about 'an easy reckoning' (84:8). He said: that is only the showing of deeds; whoever's account is argued over is ruined."),
      difficulty: 4,
      questions: [
        { q: "What is the 'easy reckoning'?", a: "Deeds are only shown, not argued", wrong: ["No deeds at all", "Paying money", "Doing a test"], why: "Bukhari 103." },
        { q: "Who asked the Prophet ﷺ about this ayah?", a: "Aishah", wrong: ["Abu Jahl", "Fir'awn", "Bilal"], why: "She always asked until she understood." },
        { q: "What does the one with an easy reckoning do next (84:9)?", a: "Returns to his people happy", wrong: ["Stays sad", "Runs away", "Sleeps"], why: "Quran 84:9." }
      ]
    },
    {
      slug: "five",
      title: "Asked about five",
      line: "You will be asked how you used your life and money.",
      facts: ["Your life and your knowledge", "How you earned and spent money", "How you used your body"],
      source: hadith("tirmidhi", "2417", "Abu Barzah al-Aslami", "Sahih (Al-Albani)", "The feet of a servant will not move on the Day of Judgment until he is asked about his life and how he spent it, his knowledge and what he did with it, his wealth, how he earned it and spent it, and his body and how he used it."),
      difficulty: 3,
      questions: [
        { q: "What will you be asked about your knowledge?", a: "What you did with it", wrong: ["How much you forgot", "Your test scores", "Nothing"], why: "Tirmidhi 2417." },
        { q: "What are you asked about money?", a: "How you earned it and spent it", wrong: ["How much you saved only", "Who was richer", "Nothing"], why: "Two questions about wealth." },
        { q: "Which is a good answer for 'how did you use your time'?", a: "Praying, learning, helping others", wrong: ["Only scrolling", "Only sleeping", "Being mean"], why: "Plan your answer now." }
      ]
    },
    {
      slug: "prayer-first",
      title: "First question: prayer",
      line: "The first deed a person is judged on is the prayer.",
      facts: ["Jami at-Tirmidhi 413", "Sahih (Al-Albani)", "Extra prayers fill gaps"],
      source: hadith("tirmidhi", "413", "Abu Hurairah", "Sahih (Al-Albani)", "The first of a servant's deeds to be judged on the Day of Resurrection is his prayer; if it is sound he succeeds, and if it is lacking, Allah says: see if My servant has voluntary prayers to complete it."),
      difficulty: 3,
      questions: [
        { q: "What is the first deed judged?", a: "The prayer", wrong: ["Fasting", "Hajj", "Your grades"], why: "Tirmidhi 413." },
        { q: "What fills the gaps in your fard prayers?", a: "Extra (sunnah) prayers", wrong: ["Money", "Sleep", "Nothing can"], why: "Allah says: see if he has voluntary prayers." },
        { q: "If your prayer is good, the rest goes well.", tf: true, why: "If it is sound he succeeds." }
      ]
    },
    {
      slug: "blood-first",
      title: "First between people",
      line: "The first cases judged between people are about killing.",
      facts: ["Sahih al-Bukhari 6533", "Life is sacred"],
      source: hadith("bukhari", "6533", "Abdullah ibn Mas'ud", "Sahih", "The first cases to be decided among people on the Day of Resurrection will be those of bloodshed."),
      difficulty: 3,
      questions: [
        { q: "What is first judged between people?", a: "Killing and bloodshed", wrong: ["Borrowed pens", "Sports results", "Who was louder"], why: "Bukhari 6533." },
        { q: "What does this show?", a: "Human life is very precious", wrong: ["Life is cheap", "Only money matters", "Nothing"], why: "That is why it comes first." },
        { q: "Prayer is the first deed judged between a person and Allah.", tf: true, why: "Tirmidhi 413; blood is first between people." }
      ]
    },
    {
      slug: "bankrupt",
      title: "Who is bankrupt?",
      line: "The bankrupt brings prayers, but also insults and hurt.",
      facts: ["His good deeds go to those he hurt", "Then their sins go on him"],
      source: hadith("muslim", "2581", "Abu Hurairah", "Sahih", "The bankrupt of my ummah comes on the Day of Resurrection with prayer, fasting and zakat, but he insulted this one, slandered that one, took this one's wealth and hit that one; his good deeds are given to them, and when they run out, their sins are put on him."),
      difficulty: 4,
      questions: [
        { q: "Who is truly bankrupt?", a: "One whose good deeds pay for hurting people", wrong: ["One with no money", "One with no house", "One who lost a game"], why: "Muslim 2581." },
        { q: "What happens to his good deeds?", a: "They go to the people he hurt", wrong: ["They vanish", "They double", "He keeps them"], why: "Justice for everyone." },
        { q: "Being mean online can cost you your good deeds.", tf: true, why: "Insults and slander are paid back that Day." }
      ]
    },
    {
      slug: "witnesses",
      title: "Your body speaks",
      line: "Mouths are sealed; hands speak and feet bear witness.",
      facts: ["Quran 36:65", "Skin, eyes and ears testify too (41:20)"],
      quote: quranQuote(36, 65),
      source: quran(36, 65, "That Day We will seal their mouths, and their hands will speak to Us, and their feet will testify about what they used to earn."),
      difficulty: 3,
      questions: [
        { q: "Who speaks when mouths are sealed?", a: "Hands", wrong: ["Friends", "Teachers", "Phones"], why: "Quran 36:65." },
        { q: "What else testifies, in 41:20?", a: "Hearing, eyes and skin", wrong: ["Clothes", "Houses", "Shoes"], why: "Every part tells the truth." },
        { q: "What should you do with your hands and eyes today?", a: "Use them for good", wrong: ["Anything, it's private", "Hide what they do", "Nothing"], why: "They will speak on that Day." }
      ]
    },
    {
      slug: "scales",
      title: "The scales of justice",
      line: "Allah sets up the scales: not even a mustard seed is missed.",
      facts: ["Quran 21:47", "Heavy scales: success (7:8)"],
      quote: quranQuote(21, 47),
      source: quran(21, 47, "We will set up the scales of justice for the Day of Resurrection, so no soul is wronged at all; even the weight of a mustard seed, We will bring it."),
      difficulty: 3,
      questions: [
        { q: "What does Allah set up to weigh deeds?", a: "The scales of justice", wrong: ["A ruler", "A clock", "A mirror"], why: "Quran 21:47." },
        { q: "How small a deed is weighed?", a: "Even a mustard seed", wrong: ["Only big ones", "Only a kilo", "None"], why: "Nothing is missed." },
        { q: "Who wins, in Quran 7:8?", a: "Those whose scales are heavy", wrong: ["Those whose scales are light", "Those with the most money", "Everyone"], why: "Heavy with good deeds." }
      ]
    },
    {
      slug: "heavy-words",
      title: "Two light, heavy words",
      line: "Two short phrases are light to say, heavy on the scale.",
      facts: ["Loved by the Most Merciful", "The last hadith in al-Bukhari"],
      source: hadith("bukhari", "6406", "Abu Hurairah", "Sahih", "Two words are light on the tongue, heavy on the scale and loved by the Most Merciful: SubhanAllahi wa bihamdihi, SubhanAllahil-Azim."),
      difficulty: 2,
      questions: [
        { q: "These two phrases are light on the tongue and...", a: "Heavy on the scale", wrong: ["Hard to say", "Only for scholars", "Only for Ramadan"], why: "Bukhari 6406." },
        { q: "Which is one of the two phrases?", a: "SubhanAllahi wa bihamdihi", wrong: ["Bismillah only", "Ameen", "Insha'Allah"], why: "And SubhanAllahil-Azim." },
        { q: "Who loves these words?", a: "The Most Merciful", wrong: ["Only angels", "Only parents", "Nobody"], why: "Habibatan ila ar-Rahman." }
      ]
    },
    {
      slug: "character",
      title: "Heaviest on the scale",
      line: "Nothing is heavier on the scale than good character.",
      facts: ["Jami at-Tirmidhi 2002", "Sahih (Al-Albani)", "Allah dislikes foul speech"],
      source: hadith("tirmidhi", "2002", "Abu Darda", "Sahih (Al-Albani)", "Nothing is heavier on the believer's scale on the Day of Judgment than good character, and Allah hates the shameless, foul-mouthed person."),
      difficulty: 3,
      questions: [
        { q: "What is heaviest on the scale?", a: "Good character", wrong: ["Gold", "Big muscles", "Many followers"], why: "Tirmidhi 2002." },
        { q: "Which is good character?", a: "Being kind and honest", wrong: ["Swearing at people", "Lying to win", "Mocking others"], why: "Character weighs most." },
        { q: "Allah dislikes foul, rude speech.", tf: true, why: "Tirmidhi 2002." }
      ]
    },
    {
      slug: "no-interpreter",
      title: "No translator",
      line: "Allah will speak to each person with no translator in between.",
      facts: ["Sahih al-Bukhari 7512", "Shield yourself, even with half a date"],
      source: hadith("bukhari", "7512", "Adi ibn Hatim", "Sahih", "Every one of you will be spoken to by his Lord with no interpreter between them; he looks right and left and sees only his deeds, and ahead he sees the Fire; so protect yourselves from the Fire, even with half a date."),
      difficulty: 3,
      questions: [
        { q: "Who will be between you and Allah when He speaks to you?", a: "No one, no translator", wrong: ["Your parents", "A lawyer", "Your teacher"], why: "Bukhari 7512." },
        { q: "What will you see to your right and left?", a: "Only your deeds", wrong: ["Your friends", "Your money", "Nothing"], why: "What you sent ahead." },
        { q: "How little charity can shield you from the Fire?", a: "Even half a date", wrong: ["Only a million", "Only gold", "None"], why: "Bukhari 7512 and 1417." }
      ]
    }
  ]
};

const HAWD: DeepUnit = {
  key: "hawd",
  topicId: "akhirah",
  branchId: "akhirah-intercession-pool",
  branch: { title: "The intercession and the Pool", description: "The Prophet ﷺ intercedes for all people, and his Pool of al-Kawthar." },
  name: "the intercession and the Pool",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "go-to-prophets",
      title: "Looking for help",
      line: "People ask prophet after prophet for help that Day.",
      facts: ["The sun is close, people suffer", "Each prophet says: myself"],
      source: hadith("bukhari", "4712", "Abu Hurairah", "Sahih", "Allah gathers all people on one plain; the sun comes near and they suffer; they go to Adam, then Nuh, Ibrahim, Musa and Isa, asking them to intercede, and each sends them on, until they come to Muhammad ﷺ."),
      difficulty: 3,
      questions: [
        { q: "Who do people go to first for help?", a: "Adam", wrong: ["Muhammad ﷺ", "Musa", "Nuh"], why: "The father of mankind." },
        { q: "Who do they come to at last?", a: "Muhammad ﷺ", wrong: ["Isa", "Ibrahim", "Sulayman"], why: "Bukhari 4712." },
        { q: "The other prophets each sent the people on to someone else.", tf: true, why: "Until they reached the Prophet ﷺ." }
      ]
    },
    {
      slug: "under-throne",
      title: "He falls in sujud",
      line: "He ﷺ falls in sujud; Allah says: ask, and it is given.",
      facts: ["Chief of mankind that Day", "Intercede and it is accepted"],
      source: hadith("bukhari", "4712", "Abu Hurairah", "Sahih", "I will go beneath the Throne and fall in prostration to my Lord; then it will be said: O Muhammad, raise your head; ask and it will be given; intercede and your intercession will be accepted."),
      difficulty: 3,
      questions: [
        { q: "What does the Prophet ﷺ do first?", a: "Falls in sujud to Allah", wrong: ["Gives a speech", "Leaves", "Sleeps"], why: "Beneath the Throne." },
        { q: "What does Allah tell him?", a: "Ask and you will be given", wrong: ["Go away", "Wait a year", "Ask another prophet"], why: "Intercede and it will be accepted." },
        { q: "What did he call himself that Day?", a: "Chief of the people", wrong: ["A stranger", "A king of gold", "The last in line"], why: "Bukhari 4712." }
      ]
    },
    {
      slug: "saved-dua",
      title: "The saved dua",
      line: "Every prophet had one special dua. He ﷺ saved his for his ummah.",
      facts: ["Sahih al-Bukhari 6304", "His love for us"],
      source: hadith("bukhari", "6304", "Abu Hurairah", "Sahih", "Every prophet has one dua that is answered, and I want to keep mine as intercession for my ummah in the Hereafter."),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ save his special dua for?", a: "To intercede for his ummah", wrong: ["Riches", "Victory in battle", "A long life"], why: "Bukhari 6304." },
        { q: "What does this show?", a: "How much he cared for us", wrong: ["He forgot to use it", "Nothing", "He wanted fame"], why: "He thought of us before himself." },
        { q: "How do we show love back?", a: "Follow his Sunnah and send salawat", wrong: ["Ignore him", "Only talk about him", "Nothing"], why: "Love shows in following." }
      ]
    },
    {
      slug: "kawthar",
      title: "Al-Kawthar",
      line: "Allah gave him ﷺ al-Kawthar, a river and a Pool.",
      facts: ["Quran 108:1", "Shortest surah"],
      quote: quranQuote(108, 1),
      source: quran(108, 1, "Indeed, We have granted you al-Kawthar."),
      difficulty: 2,
      questions: [
        { q: "What did Allah give the Prophet ﷺ in Surah 108?", a: "Al-Kawthar", wrong: ["A palace", "An army", "A ship"], why: "Quran 108:1." },
        { q: "Which is the shortest surah?", a: "Al-Kawthar", wrong: ["Al-Baqarah", "Yasin", "Al-Mulk"], why: "Just three ayahs." },
        { q: "Al-Kawthar is linked to the Pool of the Prophet ﷺ.", tf: true, why: "Its water flows into his Pool." }
      ]
    },
    {
      slug: "pool",
      title: "The Pool",
      line: "Drink from his ﷺ Pool once and never be thirsty again.",
      facts: ["Smells better than musk", "Cups as many as the stars"],
      source: hadith("bukhari", "6579", "Abdullah ibn Amr", "Sahih", "My Pool takes a month's journey to cross; its water is whiter than milk, its smell nicer than musk, its cups as many as the stars; whoever drinks from it will never be thirsty."),
      difficulty: 3,
      questions: [
        { q: "How wide is the Pool?", a: "A month's journey", wrong: ["A few steps", "One mile", "A day's walk"], why: "Bukhari 6579." },
        { q: "What happens to whoever drinks from it?", a: "Never thirsty again", wrong: ["Falls asleep", "Gets rich", "Grows wings"], why: "Bukhari 6579." },
        { q: "How many cups does it have?", a: "As many as the stars", wrong: ["Seven", "One", "A hundred"], why: "Countless." }
      ]
    },
    {
      slug: "barley",
      title: "A grain of faith",
      line: "Even a grain of faith gets a person out of the Fire.",
      facts: ["Then a wheat grain", "Then an atom's weight"],
      source: hadith("bukhari", "44", "Anas ibn Malik", "Sahih", "Whoever says la ilaha illallah with faith the weight of a barley grain in his heart will be taken out of the Fire; then a wheat grain; then an atom."),
      difficulty: 4,
      questions: [
        { q: "Who will be taken out of the Fire in this hadith?", a: "One with even a grain of faith", wrong: ["Only scholars", "Only the rich", "No one"], why: "Bukhari 44." },
        { q: "What must they have said?", a: "La ilaha illallah", wrong: ["Nothing", "Any words", "Good morning"], why: "With faith in the heart." },
        { q: "Smallest amount of faith named?", a: "An atom's weight", wrong: ["A mountain", "A brick", "A tree"], why: "Allah's mercy is huge." }
      ]
    }
  ]
};

const SIRAT: DeepUnit = {
  key: "sirat",
  topicId: "akhirah",
  branchId: "akhirah-bridge",
  branch: { title: "The bridge", description: "The bridge over Jahannam: some cross like lightning, some crawl." },
  name: "the bridge",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "everyone",
      title: "Everyone comes to it",
      line: "Every one of us comes to it; Allah saves the mindful.",
      facts: ["Quran 19:71-72", "Wrongdoers left on their knees"],
      quote: quranQuote(19, 71),
      source: quran(19, 71, "There is none of you except he will come to it; this is a decree your Lord must fulfill. Then We will save those who feared Allah and leave the wrongdoers in it on their knees."),
      difficulty: 3,
      questions: [
        { q: "Who will come to it, in Quran 19:71?", a: "Every one of us", wrong: ["Only disbelievers", "Nobody", "Only animals"], why: "There is none of you except he will come to it." },
        { q: "Who does Allah save?", a: "Those who feared Him", wrong: ["The strongest", "The richest", "The fastest runners"], why: "Quran 19:72." },
        { q: "The scholars explain this coming as crossing the bridge.", tf: true, why: "The bridge is over Jahannam (Bukhari 7439)." }
      ]
    },
    {
      slug: "what-is",
      title: "What is the bridge?",
      line: "A slippery bridge laid over Jahannam, with hooks and thorns.",
      facts: ["Sahih al-Bukhari 7439", "The companions asked: what is it?"],
      source: hadith("bukhari", "7439", "Abu Sa'id al-Khudri", "Sahih", "Then the bridge will be laid across Hell. We asked: what is the bridge? He said: a slippery place with clamps and hooks like a thorny plant."),
      difficulty: 3,
      questions: [
        { q: "Where is the bridge laid?", a: "Across Jahannam", wrong: ["Over a river", "Between two mountains", "Over the sea"], why: "Bukhari 7439." },
        { q: "What is the bridge like?", a: "Slippery, with hooks", wrong: ["Wide and soft", "Made of gold", "Covered in flowers"], why: "Clamps and hooks." },
        { q: "The companions asked about it to learn more.", tf: true, why: "They said: what is the bridge?" }
      ]
    },
    {
      slug: "speeds",
      title: "Different speeds",
      line: "Some cross like a blink, some like wind, some crawl.",
      facts: ["Speed comes from deeds", "Some fall, some get scratched"],
      source: hadith("bukhari", "7439", "Abu Sa'id al-Khudri", "Sahih", "Some believers cross like the blink of an eye, some like lightning, a strong wind, fast horses or camels; some are safe, some scratched, some fall into Hell; the last crosses by being dragged."),
      difficulty: 3,
      questions: [
        { q: "How fast do the fastest cross?", a: "Like the blink of an eye", wrong: ["Like a turtle", "In a year", "They can't"], why: "Bukhari 7439." },
        { q: "What decides your speed?", a: "Your deeds", wrong: ["Your shoes", "Your age", "Your height"], why: "Each crosses by what he did." },
        { q: "Everyone crosses at the same speed.", tf: false, why: "Blink, lightning, wind, horses, dragging." }
      ]
    },
    {
      slug: "light",
      title: "Light ahead of them",
      line: "Believers' light runs ahead of them and on their right that Day.",
      facts: ["Quran 57:12", "Hypocrites beg for some light"],
      quote: quranQuote(57, 12),
      source: quran(57, 12, "On the Day you see the believing men and women, their light running ahead of them and on their right: your good news today is gardens with rivers flowing beneath."),
      difficulty: 3,
      questions: [
        { q: "What runs ahead of the believers?", a: "Their light", wrong: ["Their shadows", "Their animals", "Their money"], why: "Quran 57:12." },
        { q: "What good news is given?", a: "Gardens with rivers", wrong: ["A new house on earth", "Gold coins", "Nothing yet"], why: "Quran 57:12." },
        { q: "Both men and women believers get this light.", tf: true, why: "The believing men and believing women." }
      ]
    },
    {
      slug: "earth-changed",
      title: "Where will people be?",
      line: "When the earth is changed, people will be on the bridge.",
      facts: ["Quran 14:48", "Sahih Muslim 2791"],
      source: hadith("muslim", "2791", "Aishah", "Sahih", "Aishah asked about the Day the earth is changed into another earth: where will the people be then? He said: on the bridge."),
      difficulty: 4,
      questions: [
        { q: "Who asked where people will be when the earth is changed?", a: "Aishah", wrong: ["Umar", "Abu Bakr", "Bilal"], why: "Muslim 2791." },
        { q: "What was the answer?", a: "On the bridge", wrong: ["In houses", "In the sea", "On the moon"], why: "Muslim 2791." },
        { q: "Which ayah was she asking about?", a: "Quran 14:48", wrong: ["Quran 1:1", "Quran 112:1", "Quran 36:1"], why: "The Day the earth is changed." }
      ]
    },
    {
      slug: "brothers",
      title: "They ask for their brothers",
      line: "Saved believers plead for friends who prayed with them.",
      facts: ["Allah lets them take them out", "Faith like a dinar, half, an atom"],
      source: hadith("bukhari", "7439", "Abu Sa'id al-Khudri", "Sahih", "The believers, once safe, plead with Allah for their brothers: they used to pray, fast and do good with us. Allah says: go and take out anyone with faith the weight of a dinar in his heart."),
      difficulty: 4,
      questions: [
        { q: "Who do the saved believers plead for?", a: "Their brothers in the Fire", wrong: ["Themselves only", "Their pets", "Nobody"], why: "Bukhari 7439." },
        { q: "What do they tell Allah about them?", a: "They prayed and fasted with us", wrong: ["They were rich", "They were tall", "They were famous"], why: "Good friends help in the Akhirah too." },
        { q: "What does this teach about friends?", a: "Have friends who pray with you", wrong: ["Friends don't matter", "Have only rich friends", "Have no friends"], why: "They may plead for you." }
      ]
    }
  ]
};

const JANNAH: DeepUnit = {
  key: "jannah",
  topicId: "akhirah",
  branchId: "akhirah-jannah",
  branch: { title: "Jannah", description: "What Allah has prepared for the believers: things no eye has seen." },
  name: "Jannah",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "no-eye",
      title: "No eye has seen",
      line: "Allah prepared what no eye has seen and no heart imagined.",
      facts: ["A hadith qudsi", "Quran 32:17"],
      quote: quranQuote(32, 17),
      source: hadith("bukhari", "3244", "Abu Hurairah", "Sahih", "Allah said: I have prepared for My righteous servants what no eye has seen, no ear has heard, and no human heart has imagined. Recite if you wish: no soul knows what joy is hidden for them (32:17)."),
      difficulty: 2,
      questions: [
        { q: "Can you imagine how good Jannah is?", a: "No, it is beyond imagining", wrong: ["Yes, exactly", "It's like a mall", "It's like a park"], why: "No heart has imagined it." },
        { q: "Who prepared Jannah's joys?", a: "Allah", wrong: ["People", "Kings", "Nobody"], why: "A hadith qudsi." },
        { q: "Which ayah did Abu Hurayrah recite with it?", a: "Quran 32:17", wrong: ["Quran 2:255", "Quran 1:1", "Quran 114:1"], why: "No soul knows what is hidden for them." }
      ]
    },
    {
      slug: "wide",
      title: "As wide as heaven and earth",
      line: "Race to a garden as wide as the heavens and earth.",
      facts: ["Quran 3:133", "Prepared for the mindful"],
      quote: quranQuote(3, 133),
      source: quran(3, 133, "Hasten to forgiveness from your Lord and a garden as wide as the heavens and earth, prepared for the righteous."),
      difficulty: 2,
      questions: [
        { q: "How wide is Jannah, in 3:133?", a: "As wide as the heavens and earth", wrong: ["As big as a city", "A small garden", "As big as Makkah"], why: "Quran 3:133." },
        { q: "What does Allah tell us to race toward?", a: "Forgiveness and Jannah", wrong: ["Money", "Fame", "Games"], why: "Hasten to forgiveness." },
        { q: "Jannah is prepared for whom?", a: "The righteous, mindful of Allah", wrong: ["Everyone no matter what", "Only kings", "Only Arabs"], why: "Quran 3:133." }
      ]
    },
    {
      slug: "whip",
      title: "Smaller than a whip",
      line: "A tiny spot in Jannah beats the whole world.",
      facts: ["Sahih al-Bukhari 3250", "The world is tiny next to it"],
      source: hadith("bukhari", "3250", "Sahl ibn Sa'd", "Sahih", "A place in Paradise the size of a whip is better than the world and all that is in it."),
      difficulty: 2,
      questions: [
        { q: "A whip-sized spot in Jannah is better than...", a: "The whole world", wrong: ["A small house", "One city", "Nothing"], why: "Bukhari 3250." },
        { q: "What does this teach?", a: "Don't trade Jannah for this world", wrong: ["Jannah is small", "The world is better", "Whips are holy"], why: "The smallest bit beats everything here." },
        { q: "All the gold on earth is worth less than a tiny spot in Jannah.", tf: true, why: "Bukhari 3250." }
      ]
    },
    {
      slug: "levels",
      title: "A hundred levels",
      line: "Jannah has a hundred levels: ask for al-Firdaws.",
      facts: ["Between levels: like sky and earth", "Rivers flow from Firdaws"],
      source: hadith("bukhari", "2790", "Abu Hurairah", "Sahih", "Paradise has one hundred levels Allah prepared for those who strive in His cause; between each two levels is like between the heaven and earth; when you ask Allah, ask for al-Firdaws, the best and highest part."),
      difficulty: 3,
      questions: [
        { q: "How many levels does Jannah have?", a: "One hundred", wrong: ["Seven", "Ten", "One"], why: "Bukhari 2790." },
        { q: "Which level should you ask for?", a: "Al-Firdaws", wrong: ["The lowest", "Any one", "None"], why: "The highest and best." },
        { q: "How far apart are two levels?", a: "Like the sky and the earth", wrong: ["One step", "A meter", "A mile"], why: "Bukhari 2790." }
      ]
    },
    {
      slug: "gates",
      title: "Eight gates",
      line: "Jannah has eight gates. Ar-Rayyan is only for those who fasted.",
      facts: ["Sahih al-Bukhari 3257", "Closed after the fasters enter"],
      source: hadith("bukhari", "1896", "Sahl bin Sa'd", "Sahih", "In Paradise there is a gate called ar-Rayyan; those who fasted enter through it on the Day of Resurrection and no one else; when they have entered it is closed."),
      difficulty: 2,
      questions: [
        { q: "How many gates does Jannah have?", a: "Eight", wrong: ["Two", "Seven", "Twelve"], why: "Bukhari 3257." },
        { q: "What is the gate for fasting people called?", a: "Ar-Rayyan", wrong: ["Al-Firdaws", "Al-Kawthar", "As-Salam"], why: "Bukhari 1896." },
        { q: "Anyone can enter by ar-Rayyan.", tf: false, why: "Only those who fasted." }
      ]
    },
    {
      slug: "moon-faces",
      title: "Faces like the full moon",
      line: "The first group to enter Jannah shine like the full moon.",
      facts: ["No illness or dirt", "Sweat like musk", "Hearts with no grudges"],
      source: hadith("bukhari", "3245", "Abu Hurairah", "Sahih", "The first group to enter Paradise will shine like the full moon; they will not spit or blow their noses; their vessels are of gold and their sweat smells of musk."),
      difficulty: 3,
      questions: [
        { q: "How will the first group in Jannah look?", a: "Like the full moon", wrong: ["Like shadows", "Like stones", "Tired"], why: "Bukhari 3245." },
        { q: "What will their sweat smell like?", a: "Musk", wrong: ["Smoke", "Nothing at all", "Rain"], why: "Bukhari 3245." },
        { q: "People in Jannah get sick.", tf: false, why: "No sickness, no dirt." }
      ]
    },
    {
      slug: "never-old",
      title: "Never sick, never old",
      line: "In Jannah: never sick, never old, never dying.",
      facts: ["Sahih Muslim 2837", "Joy forever, never poor"],
      source: hadith("muslim", "2837", "Abu Sa'id al-Khudri and Abu Hurairah", "Sahih", "A caller will announce: you will be healthy and never fall ill, you will live and never die, you will be young and never grow old, you will be in bliss and never be in need."),
      difficulty: 2,
      questions: [
        { q: "Will people in Jannah grow old?", a: "No, they stay young", wrong: ["Yes, slowly", "Only some", "After 100 years"], why: "Muslim 2837." },
        { q: "Will anyone die in Jannah?", a: "No, never", wrong: ["Yes", "Only animals", "Every 1000 years"], why: "Live and never die." },
        { q: "Life in Jannah has no sickness.", tf: true, why: "Healthy, never ill." }
      ]
    },
    {
      slug: "rivers",
      title: "Four rivers",
      line: "Jannah has rivers of fresh water, milk and pure honey.",
      facts: ["Quran 47:15", "And rivers of a drink with no harm", "Every kind of fruit"],
      quote: quranQuote(47, 15),
      source: quran(47, 15, "Paradise has rivers of water unaltered, rivers of milk whose taste never changes, rivers of drink delicious to those who drink it, and rivers of purified honey, with every kind of fruit and forgiveness from their Lord."),
      difficulty: 3,
      questions: [
        { q: "Which of these rivers is in Jannah, in 47:15?", a: "Milk that never changes taste", wrong: ["Soda", "Oil", "Coffee"], why: "Quran 47:15." },
        { q: "What kind of honey flows there?", a: "Purified honey", wrong: ["Burnt honey", "Fake honey", "No honey"], why: "Quran 47:15." },
        { q: "The water in Jannah never goes bad.", tf: true, why: "Rivers of water unaltered." }
      ]
    },
    {
      slug: "tree",
      title: "A giant tree",
      line: "A rider travels its shade for a hundred years.",
      facts: ["Sahih al-Bukhari 3251", "Still not crossed"],
      source: hadith("bukhari", "3251", "Anas ibn Malik", "Sahih", "There is a tree in Paradise so big that a rider could travel in its shade for a hundred years and not cross it."),
      difficulty: 2,
      questions: [
        { q: "How long to ride through the tree's shade?", a: "A hundred years", wrong: ["A minute", "One day", "One week"], why: "Bukhari 3251." },
        { q: "What does it teach about Jannah?", a: "Its size is beyond us", wrong: ["It is small", "It has no trees", "It is a desert"], why: "Things there are huge." },
        { q: "The rider crosses the shade in a day.", tf: false, why: "Not even in a hundred years." }
      ]
    },
    {
      slug: "market",
      title: "The Friday market",
      line: "Every Friday, the people of Jannah grow more beautiful.",
      facts: ["Sahih Muslim 2833", "The north wind blows scent", "Their families say: you look better!"],
      source: hadith("muslim", "2833", "Anas ibn Malik", "Sahih", "In Paradise there is a market they come to every Friday; the north wind blows on their faces and clothes and adds to their beauty; their families say: by Allah, you have grown more beautiful."),
      difficulty: 3,
      questions: [
        { q: "When do people of Jannah go to the market?", a: "Every Friday", wrong: ["Every Monday", "Once a year", "Never"], why: "Muslim 2833." },
        { q: "What happens to them there?", a: "They become more beautiful", wrong: ["They buy toys", "They get tired", "They pay money"], why: "The north wind blows scent on them." },
        { q: "What do their families say when they return?", a: "You look even better!", wrong: ["Where were you?", "You're late!", "Nothing"], why: "And they say the same back." }
      ]
    },
    {
      slug: "peace",
      title: "Only peace",
      line: "In Jannah no one hears bad talk or sin, only: peace, peace.",
      facts: ["Quran 56:25-26", "No arguing, no bullying"],
      quote: quranQuote(56, 25),
      source: quran(56, 25, "They will not hear there any ill speech or sinful talk, only the saying: peace, peace."),
      difficulty: 2,
      questions: [
        { q: "What will you hear in Jannah?", a: "Peace, peace", wrong: ["Shouting", "Gossip", "Lies"], why: "Quran 56:26." },
        { q: "Will there be bullying in Jannah?", a: "No, never", wrong: ["Sometimes", "Only jokes", "Yes"], why: "No ill speech at all." },
        { q: "Speaking kindly now is practice for Jannah.", tf: true, why: "Its people only speak peace." }
      ]
    },
    {
      slug: "families",
      title: "Families together",
      line: "Believing families are joined together in Jannah.",
      facts: ["Quran 52:21", "Parents, spouses, children (13:23)"],
      quote: quranQuote(52, 21),
      source: quran(52, 21, "Those who believed and whose descendants followed them in faith, We will join their descendants with them, and not lessen any of their deeds."),
      difficulty: 3,
      questions: [
        { q: "Who does Allah join with believers in Jannah?", a: "Their children who believed", wrong: ["Their enemies", "Their pets only", "Nobody"], why: "Quran 52:21." },
        { q: "Does anyone lose reward for this?", a: "No, nothing is lessened", wrong: ["Yes, parents lose some", "Children lose some", "Everyone loses half"], why: "Quran 52:21." },
        { q: "Helping your family believe helps you meet in Jannah.", tf: true, why: "Quran 52:21 and 13:23." }
      ]
    },
    {
      slug: "see-allah",
      title: "Seeing Allah",
      line: "Believers will see their Lord as clearly as the full moon.",
      facts: ["Quran 75:22-23", "Guard Fajr and Asr"],
      quote: quranQuote(75, 22),
      source: hadith("bukhari", "554", "Jarir ibn Abdullah", "Sahih", "The Prophet ﷺ looked at the full moon and said: you will see your Lord as you see this moon, with no trouble seeing Him; so if you can, do not miss the prayer before sunrise and before sunset."),
      difficulty: 3,
      questions: [
        { q: "How clearly will believers see Allah?", a: "Like the full moon", wrong: ["Not at all", "Only in dreams", "Blurry"], why: "Bukhari 554." },
        { q: "Which prayers did he link to this?", a: "Fajr and Asr", wrong: ["Dhuhr and Isha", "Only Jumu'ah", "Eid only"], why: "Before sunrise and before sunset." },
        { q: "Faces that Day are radiant, looking at their Lord.", tf: true, why: "Quran 75:22-23." }
      ]
    },
    {
      slug: "pleased",
      title: "Never angry again",
      line: "Allah tells them: I am pleased, and never angry again.",
      facts: ["Sahih al-Bukhari 6549", "Better than all of Jannah"],
      source: hadith("bukhari", "6549", "Abu Sa'id al-Khudri", "Sahih", "Allah will ask the people of Paradise: are you pleased? They say: how could we not be? He says: I will give you better: I bestow My pleasure on you and will never be angry with you after it."),
      difficulty: 3,
      questions: [
        { q: "What is the best gift in Jannah?", a: "Allah's pleasure forever", wrong: ["A golden house", "A fast horse", "A big meal"], why: "Bukhari 6549." },
        { q: "What does Allah promise them?", a: "To never be angry with them", wrong: ["More homework", "A test", "Nothing more"], why: "After it, never angry." },
        { q: "Allah's approval is greater than gardens.", tf: true, why: "Quran 9:72." }
      ]
    },
    {
      slug: "last-man",
      title: "The last man in",
      line: "The last one into Jannah gets ten times the world.",
      facts: ["Sahih al-Bukhari 6571", "He thinks Allah is joking", "The Prophet ﷺ laughed"],
      source: hadith("bukhari", "6571", "Abdullah ibn Mas'ud", "Sahih", "The last to leave the Fire and enter Paradise crawls out; Allah tells him to enter; he thinks it is full; Allah says: you have the like of the world and ten times more. He says: do You mock me while You are the King? The Prophet ﷺ laughed."),
      difficulty: 3,
      questions: [
        { q: "How much does the last man in Jannah get?", a: "Ten times the world", wrong: ["One small room", "Half the world", "A tent"], why: "Bukhari 6571." },
        { q: "What did he think when told?", a: "That Allah was joking", wrong: ["That it was too small", "That he was dreaming", "Nothing"], why: "It was too good to believe." },
        { q: "If the last man gets this much, imagine the first!", tf: true, why: "Allah's generosity has no end." }
      ]
    },
    {
      slug: "death-ram",
      title: "Death itself ends",
      line: "Death itself is ended: forever, no more dying.",
      facts: ["Sahih al-Bukhari 4730", "Forever in Jannah", "A Day of regret for others"],
      source: hadith("bukhari", "4730", "Abu Sa'id al-Khudri", "Sahih", "On the Day of Resurrection death will be brought in the form of a black and white ram and slaughtered, and it will be said: people of Paradise, eternity and no death; people of the Fire, eternity and no death."),
      difficulty: 4,
      questions: [
        { q: "What is death brought as?", a: "A ram", wrong: ["A lion", "A shadow", "An eagle"], why: "Bukhari 4730." },
        { q: "What is announced after?", a: "Forever, and no death", wrong: ["One more life", "Go back to earth", "Sleep now"], why: "Eternity." },
        { q: "Jannah never ends.", tf: true, why: "Abiding forever (9:72)." }
      ]
    }
  ]
};

const JAHANNAM: DeepUnit = {
  key: "jahannam",
  topicId: "akhirah",
  branchId: "akhirah-jahannam",
  branch: { title: "Jahannam", description: "The Fire Allah warns us of, so we stay far from it, and His mercy that saves." },
  name: "Jahannam",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "seventy",
      title: "Seventy times hotter",
      line: "Our fire is one part of seventy of the heat of Jahannam.",
      facts: ["Sahih al-Bukhari 3265", "Each part as hot as ours"],
      source: hadith("bukhari", "3265", "Abu Hurairah", "Sahih", "Your fire is one of seventy parts of the Fire of Hell; it has sixty-nine parts more, each as hot as this fire."),
      difficulty: 3,
      questions: [
        { q: "Our fire is how much of Jahannam's heat?", a: "One part of seventy", wrong: ["Half", "The same", "Twice as hot"], why: "Bukhari 3265." },
        { q: "Why did Allah tell us this?", a: "To warn us so we stay away", wrong: ["To scare kids for fun", "No reason", "To make us hopeless"], why: "A warning is a mercy." },
        { q: "Jahannam is like the fire we know.", tf: false, why: "Seventy times stronger." }
      ]
    },
    {
      slug: "fuel",
      title: "Protect your family",
      line: "Protect yourselves and your families from the Fire.",
      facts: ["Quran 66:6", "Strong angels guard it"],
      quote: quranQuote(66, 6),
      source: quran(66, 6, "O you who believe, protect yourselves and your families from a Fire whose fuel is people and stones, over which are harsh and strong angels who do not disobey Allah."),
      difficulty: 3,
      questions: [
        { q: "Who does 66:6 tell you to protect?", a: "Yourself and your family", wrong: ["Only yourself", "Only strangers", "Nobody"], why: "Quran 66:6." },
        { q: "What is the Fire's fuel?", a: "People and stones", wrong: ["Wood", "Gas", "Paper"], why: "Quran 66:6." },
        { q: "Teaching your little brother to pray protects him.", tf: true, why: "That is protecting your family." }
      ]
    },
    {
      slug: "gates",
      title: "Seven gates",
      line: "Jahannam has seven gates, each with its share of people.",
      facts: ["Quran 15:44", "Jannah has eight"],
      quote: quranQuote(15, 44),
      source: quran(15, 44, "It has seven gates; for every gate is a portion of them assigned."),
      difficulty: 3,
      questions: [
        { q: "How many gates does Jahannam have?", a: "Seven", wrong: ["Eight", "One", "Ten"], why: "Quran 15:44." },
        { q: "How many gates does Jannah have?", a: "Eight", wrong: ["Seven", "Two", "Twelve"], why: "Bukhari 3257: one more than the Fire." },
        { q: "Allah's mercy is greater than His anger.", tf: true, why: "Bukhari 3194." }
      ]
    },
    {
      slug: "surrounded",
      title: "What surrounds them",
      line: "Jannah is surrounded by hard things; the Fire by what we crave.",
      facts: ["Sahih Muslim 2822", "Bukhari 6487"],
      source: hadith("muslim", "2822", "Anas ibn Malik", "Sahih", "Paradise is surrounded by hardships, and the Fire is surrounded by desires."),
      difficulty: 3,
      questions: [
        { q: "What surrounds Jannah?", a: "Hard things", wrong: ["Easy fun", "Gold walls", "Nothing"], why: "Muslim 2822." },
        { q: "What surrounds the Fire?", a: "Desires and cravings", wrong: ["Hard work", "Prayer", "Patience"], why: "Muslim 2822." },
        { q: "Waking for Fajr when sleepy is a hard thing that leads to Jannah.", tf: true, why: "Good often feels hard at first." }
      ]
    },
    {
      slug: "one-dip",
      title: "One dip",
      line: "One dip in Jannah erases a lifetime of pain.",
      facts: ["Sahih Muslim 2807", "\"No, my Lord, never\""],
      source: hadith("muslim", "2807", "Anas ibn Malik", "Sahih", "The most comfortable person of this world from the people of the Fire is dipped in it once and asked: did you ever see any good? He says: no, my Lord. The most suffering person of the world from the people of Paradise is dipped in it once and asked: did you ever feel hardship? He says: no, my Lord."),
      difficulty: 4,
      questions: [
        { q: "After one dip in the Fire, what does the richest man say?", a: "I never saw any good", wrong: ["I was rich", "I want more", "It's fine"], why: "Muslim 2807." },
        { q: "After one dip in Jannah, what does the poorest man say?", a: "I never felt hardship", wrong: ["I was poor", "I'm still sad", "Nothing"], why: "Muslim 2807." },
        { q: "What does this teach?", a: "The Akhirah outweighs everything here", wrong: ["This world is all", "Rich people win", "Pain lasts forever"], why: "One moment there erases a lifetime here." }
      ]
    },
    {
      slug: "half-date",
      title: "Even half a date",
      line: "Shield yourself from the Fire, even with half a date in charity.",
      facts: ["Sahih al-Bukhari 1417", "If not, with a good word"],
      source: hadith("bukhari", "1417", "Adi ibn Hatim", "Sahih", "Save yourself from the Fire even by giving half a date in charity."),
      difficulty: 2,
      questions: [
        { q: "What small thing can shield you from the Fire?", a: "Half a date in charity", wrong: ["A selfie", "A loud voice", "Nothing small"], why: "Bukhari 1417." },
        { q: "If you have nothing to give?", a: "Say a good word", wrong: ["Do nothing", "Complain", "Take from others"], why: "Bukhari 6023." },
        { q: "Small charity matters to Allah.", tf: true, why: "Even half a date." }
      ]
    },
    {
      slug: "breaths",
      title: "Two breaths",
      line: "The Fire was allowed two breaths: one in summer, one in winter.",
      facts: ["Sahih al-Bukhari 3260", "The hottest heat, the bitterest cold"],
      source: hadith("bukhari", "3260", "Abu Hurairah", "Sahih", "The Fire complained to its Lord: parts of me eat other parts. So He allowed it two breaths, one in winter and one in summer: that is the strongest heat and the bitterest cold you feel."),
      difficulty: 4,
      questions: [
        { q: "How many breaths was the Fire allowed?", a: "Two", wrong: ["One", "Seven", "None"], why: "Bukhari 3260." },
        { q: "When are they?", a: "Summer and winter", wrong: ["Day and night", "Ramadan and Eid", "Spring and autumn"], why: "Strongest heat and bitterest cold." },
        { q: "A very hot day can remind you of the Fire.", tf: true, why: "Bukhari 3260." }
      ]
    },
    {
      slug: "mercy",
      title: "A hundred mercies",
      line: "Allah kept ninety-nine parts of mercy for that Day.",
      facts: ["Sahih al-Bukhari 6469", "Never lose hope", "Never feel too safe"],
      source: hadith("bukhari", "6469", "Abu Hurairah", "Sahih", "Allah created mercy in one hundred parts; He kept ninety-nine and sent one to all creatures. If the disbeliever knew all of Allah's mercy he would not lose hope of Paradise, and if the believer knew all of His punishment he would not feel safe from the Fire."),
      difficulty: 3,
      questions: [
        { q: "How many parts of mercy did Allah keep for that Day?", a: "Ninety-nine", wrong: ["One", "Fifty", "Ten"], why: "Bukhari 6469." },
        { q: "What is the one part used for?", a: "All creatures' mercy to each other", wrong: ["Only people", "Nothing", "Only angels"], why: "Even a mother animal lifts her hoof off her baby (Bukhari 6000)." },
        { q: "A believer lives between hope and fear.", tf: true, why: "Never hopeless, never too safe." }
      ]
    }
  ]
};

const READY: DeepUnit = {
  key: "ready",
  topicId: "akhirah",
  branchId: "akhirah-get-ready",
  branch: { title: "Getting ready", description: "What the Prophet ﷺ taught us to do today for that Day." },
  name: "getting ready",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "traveler",
      title: "Like a traveler",
      line: "Be in this world like a stranger or a traveler.",
      facts: ["Said to Ibn Umar", "Use health before sickness", "Use life before death"],
      source: hadith("bukhari", "6416", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ took my shoulder and said: be in this world as if you were a stranger or a traveler. Ibn Umar used to say: take from your health for your sickness and from your life for your death."),
      difficulty: 2,
      questions: [
        { q: "How should we live in this world?", a: "Like a traveler", wrong: ["Like we stay forever", "Like a king", "Like it's all that matters"], why: "Bukhari 6416." },
        { q: "What did Ibn Umar say to use your health for?", a: "Getting ready for sickness", wrong: ["Only playing", "Nothing", "Showing off"], why: "Take from your health for your sickness." },
        { q: "A traveler packs what he needs for the road. What is ours?", a: "Good deeds", wrong: ["Toys", "Clothes", "Phones"], why: "The best provision is taqwa (2:197)." }
      ]
    },
    {
      slug: "mercy-saves",
      title: "Saved by mercy",
      line: "We enter Jannah by Allah's mercy, not deeds alone.",
      facts: ["So do good steadily", "Morning, evening, part of night"],
      source: hadith("bukhari", "6463", "Abu Hurairah", "Sahih", "The deeds of anyone of you will not save him. They said: not even you? He said: not even me, unless Allah covers me with His mercy. So do good deeds properly, sincerely and moderately."),
      difficulty: 3,
      questions: [
        { q: "What gets us into Jannah in the end?", a: "Allah's mercy", wrong: ["Only our deeds", "Money", "Our family name"], why: "Bukhari 6463." },
        { q: "So should we stop doing good deeds?", a: "No: do them steadily and sincerely", wrong: ["Yes", "Only on Fridays", "Only when watched"], why: "Deeds are how we seek His mercy." },
        { q: "The Prophet ﷺ said even he needs Allah's mercy.", tf: true, why: "Not even me." }
      ]
    },
    {
      slug: "endings",
      title: "Deeds by their endings",
      line: "Deeds are judged by how they end: keep going till the end.",
      facts: ["Sahih al-Bukhari 6607", "Ask Allah for a good ending"],
      source: hadith("bukhari", "6607", "Sahl ibn Sa'd", "Sahih", "A person may do what looks like the deeds of the people of Paradise while he is of the people of the Fire, and the opposite; deeds are judged by their endings."),
      difficulty: 4,
      questions: [
        { q: "Deeds are judged by their...", a: "Endings", wrong: ["Beginnings", "Size", "Audience"], why: "Bukhari 6607." },
        { q: "What should you ask Allah for?", a: "A good ending", wrong: ["Fame", "A long nap", "Nothing"], why: "Stay steady till the end." },
        { q: "One good year means you can stop forever.", tf: false, why: "Keep going until you meet Allah." }
      ]
    },
    {
      slug: "last-words",
      title: "Last words",
      line: "Whoever's last words are la ilaha illallah will enter Jannah.",
      facts: ["Sunan Abi Dawud 3116", "Sahih (Al-Albani)", "Say it often now"],
      source: hadith("abudawud", "3116", "Mu'adh ibn Jabal", "Sahih (Al-Albani)", "Whoever's last words are la ilaha illallah will enter Paradise."),
      difficulty: 2,
      questions: [
        { q: "Whose last words lead to Jannah?", a: "One who says la ilaha illallah", wrong: ["One who says goodbye", "One who says nothing", "One who says my money"], why: "Abu Dawud 3116." },
        { q: "How do you make it your last words?", a: "Say it often all your life", wrong: ["Wait till you're old", "Write it once", "Hope for luck"], why: "Your tongue says what it's used to." },
        { q: "Who narrated this hadith?", a: "Mu'adh ibn Jabal", wrong: ["Abu Lahab", "Fir'awn", "Qarun"], why: "Abu Dawud 3116." }
      ]
    },
    {
      slug: "love-meet",
      title: "Loving to meet Allah",
      line: "Whoever loves to meet Allah, Allah loves to meet him.",
      facts: ["Sahih al-Bukhari 6507", "The believer gets good news at death"],
      source: hadith("bukhari", "6507", "Ubadah ibn as-Samit", "Sahih", "Whoever loves to meet Allah, Allah loves to meet him. Aishah said: we dislike death. He said: when death comes to a believer he is given good news of Allah's pleasure, so nothing is dearer to him than what is ahead."),
      difficulty: 3,
      questions: [
        { q: "Whoever loves to meet Allah...", a: "Allah loves to meet him", wrong: ["Will never die", "Gets rich", "Nothing happens"], why: "Bukhari 6507." },
        { q: "What does the believer hear when death comes?", a: "Good news of Allah's pleasure", wrong: ["Bad news", "Nothing", "Music"], why: "So he loves what is ahead." },
        { q: "Disliking the pain of death means you don't love to meet Allah.", tf: false, why: "Aishah asked; he explained it is about the good news." }
      ]
    },
    {
      slug: "dua",
      title: "His most frequent dua",
      line: "His ﷺ most frequent dua: good here, good there, no Fire.",
      facts: ["Quran 2:201", "Good here, good there", "Save us from the Fire"],
      quote: quranQuote(2, 201),
      source: hadith("bukhari", "6389", "Anas ibn Malik", "Sahih", "The most frequent dua of the Prophet ﷺ was: O Allah, our Lord, give us good in this world and good in the Hereafter, and save us from the punishment of the Fire."),
      difficulty: 2,
      questions: [
        { q: "What was the Prophet's ﷺ most frequent dua?", a: "Rabbana atina fid-dunya hasanah...", wrong: ["Only for rain", "Only for food", "A dua for wealth"], why: "Bukhari 6389." },
        { q: "What does it ask for?", a: "Good in both lives, safety from the Fire", wrong: ["Only this world", "Only money", "Only health"], why: "Quran 2:201." },
        { q: "You can say it in sujud and after prayer.", tf: true, why: "It is from the Quran and Sunnah." }
      ]
    },
    {
      slug: "people-of-good",
      title: "Patient to the end",
      line: "Angels greet them: peace on you for your patience.",
      facts: ["Quran 13:23-24", "The best final home"],
      quote: quranQuote(13, 24),
      source: quran(13, 24, "Angels will enter upon them from every gate, saying: peace be upon you for what you patiently endured; excellent is the final home."),
      difficulty: 3,
      questions: [
        { q: "What do the angels say to the people of Jannah?", a: "Peace be on you for your patience", wrong: ["Hurry up", "Who are you?", "Go back"], why: "Quran 13:24." },
        { q: "Why are they greeted this way?", a: "They were patient", wrong: ["They were rich", "They were famous", "They were lucky"], why: "For what you patiently endured." },
        { q: "Patience in hard times is rewarded in Jannah.", tf: true, why: "Excellent is the final home." }
      ]
    },
    {
      slug: "compete",
      title: "Race for good",
      line: "Allah says: for this, let the competitors compete.",
      facts: ["Quran 83:26", "Be first in good"],
      source: quran(83, 26, "Its seal is musk; so for this let the competitors compete."),
      difficulty: 3,
      questions: [
        { q: "What should people compete for, in 83:26?", a: "The joys of Jannah", wrong: ["Likes online", "Money", "Fame"], why: "For this let the competitors compete." },
        { q: "What is the drink of Jannah sealed with?", a: "Musk", wrong: ["Wax", "Glue", "Metal"], why: "Quran 83:26." },
        { q: "Your streak in this app can be a race for good.", tf: true, why: "Learning your deen is a good deed." }
      ]
    }
  ]
};

export const AKHIRAH_UNITS: readonly DeepUnit[] = [LAST_DAY, MINOR_SIGNS, MAJOR_SIGNS, GRAVE, GATHERING, RECKONING, HAWD, SIRAT, JANNAH, JAHANNAM, READY];

/** The Day of Judgment topic. Its units hold only deep lessons, added by addDeepUnits. */
export const AKHIRAH_SECTION: LearningSection = {
  id: "akhirah",
  topicId: "akhirah",
  title: "Day of Judgment",
  description: "The Last Day from the Quran and sahih hadith: the signs, the grave, the reckoning, Jannah and Jahannam.",
  badge: "Topic 11",
  focus: "Signs of the Hour, the grave, the scales, the bridge, Jannah, Jahannam, and getting ready.",
  mascot: "muslim_man",
  accentColor: "#6B5BD6",
  starsTarget: 0,
  branches: [],
  nodes: []
};
