import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah An-Nahl ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on An-Nahl 16:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_16_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on An-Nahl 16:${ayah}`,
    url: `https://quran.com/16:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 16:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q16 = (ayah: number) => quranQuote(16, ayah);

/** Ayahs 1 to 18: the Hour draws near, revelation, and the countless blessings of cattle, rain, sea and stars. */
const NAHL_ONE: DeepUnit = {
  key: "nahl1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-16",
  name: "An-Nahl, ayahs 1 to 18",
  kind: "skill",
  lessonType: "surah",
  surahName: "An-Nahl",
  lessons: [
    {
      slug: "the-hour-has-come",
      title: "Allah's command is coming",
      line: "The Hour is told in the past tense: it will surely come.",
      facts: ["Do not seek to hasten it", "Allah is far above partners"],
      quote: q16(1),
      source: ik(1, "Allah speaks of the Hour in the past tense to confirm that it will surely come. What seemed far is now near, so do not try to rush it.", "in order to confirm that it will undoubtedly come to pass"),
      difficulty: 3,
      questions: [
        { q: "What has come, in 16:1?", a: "The Event ordained by Allah", wrong: ["A new king", "A great flood", "A harvest"], why: "The Event ordained by Allah has indeed come, so do not seek to hasten it." },
        { q: "What should people not do, in 16:1?", a: "Seek to hasten it", wrong: ["Pray", "Give charity", "Read"], why: "So do not seek to hasten it." },
        { q: "Why is the Hour told in the past tense, per Ibn Kathir?", a: "To confirm it will surely come", wrong: ["It already passed", "It is a story", "It will never come"], why: "In order to confirm that it will undoubtedly come to pass." }
      ]
    },
    {
      slug: "the-hour-comes-suddenly",
      title: "The Hour comes suddenly",
      line: "The Hour comes so suddenly that a spread cloth stays unfolded.",
      facts: ["A cup of milk not drunk", "Be ready every day"],
      quote: q16(1),
      source: hadith("bukhari", "6506", "Abu Hurairah", "Sahih", "The Prophet ﷺ said the Hour will come so suddenly that two men will not finish folding a cloth, and a man will not drink the milk he is carrying.", "two persons spreading a garment between them will not be able to finish their bargain, nor will they be able to fold it up"),
      difficulty: 3,
      questions: [
        { q: "What will the two men not finish, in the hadith?", a: "Folding their garment", wrong: ["Their prayer", "Their journey", "Their sleep"], why: "Two persons spreading a garment between them will not be able to finish their bargain, nor will they be able to fold it up." },
        { q: "What will the man with milk not do, in the hadith?", a: "Drink it", wrong: ["Sell it", "Share it", "Find it"], why: "The Hour will be established while a man is carrying the milk of his she-camel, but cannot drink it." },
        { q: "The hadith teaches that the Hour will come slowly with long warning.", tf: false, why: "The Hour will be established (so suddenly) that two persons spreading a garment between them will not be able to finish their bargain." }
      ]
    },
    {
      slug: "angels-bring-revelation",
      title: "Angels bring the revelation",
      line: "Allah sends angels with revelation to the Prophets He chooses.",
      facts: ["The message: none but Allah", "So have Taqwa of Him"],
      quote: q16(2),
      source: ik(2, "Allah sends the angels down with revelation to those of His servants He wills, the Prophets, to warn people that none deserves worship but Him, so they should fear going against Him.", "fear My punishment, if you go against My commands and worship anything other than Me"),
      difficulty: 3,
      questions: [
        { q: "What do the angels bring down, in 16:2?", a: "The Ruh, the revelation", wrong: ["Rain", "Gold", "Food"], why: "He sends down the angels with the Ruh (revelation) of His command." },
        { q: "To whom does revelation come, per Ibn Kathir?", a: "The Prophets", wrong: ["Kings", "Poets", "Everyone"], why: "To those servants of His whom He wills, meaning the Prophets." },
        { q: "What is the warning, in 16:2?", a: "None deserves worship but Allah", wrong: ["Travel more", "Build towers", "Store food"], why: "Warn mankind that none has the right to be worshipped but I, so have Taqwa of Me." }
      ]
    },
    {
      slug: "a-servant-not-an-opponent",
      title: "A servant, not an opponent",
      line: "Made from a small drop, man then argues openly with his Lord.",
      facts: ["The heavens made with truth", "We were made to serve Allah"],
      quote: q16(4),
      source: ik(3, "Allah created the heavens and earth with truth. Man began as something small and weak, yet once strong he argues with his Lord, though he was created to be a servant.", "man was created to be a servant, not an opponent"),
      difficulty: 3,
      questions: [
        { q: "How were the heavens and earth created, in 16:3?", a: "With truth", wrong: ["In play", "By chance", "Without aim"], why: "He has created the heavens and the earth with truth." },
        { q: "What does man become, in 16:4?", a: "An open opponent", wrong: ["An angel", "A star", "A mountain"], why: "He has created man from a Nutfah, then behold, this same (man) becomes an open opponent." },
        { q: "What was man created to be, per Ibn Kathir?", a: "A servant", wrong: ["An opponent", "A king", "A judge"], why: "But man was created to be a servant, not an opponent." }
      ]
    },
    {
      slug: "give-while-healthy",
      title: "Give while you are healthy",
      line: "The best charity is given while healthy, not at the end.",
      facts: ["Do not wait until too late", "Wealth soon passes to others"],
      quote: q16(4),
      source: hadith("bukhari", "1419", "Abu Hurairah", "Sahih", "The Prophet ﷺ said the best charity is given while you are healthy and hoping for wealth, not delayed until death is near, when it already belongs to others.", "The charity which you practice while you are healthy"),
      difficulty: 3,
      questions: [
        { q: "Which charity is best, in the hadith?", a: "Given while healthy", wrong: ["Given when dying", "Given once a year", "Given by kings"], why: "The charity which you practice while you are healthy, niggardly and afraid of poverty." },
        { q: "Until when should charity not be delayed?", a: "Approaching death", wrong: ["Friday", "Ramadan", "Old age only"], why: "Do not delay it to the time of approaching death." },
        { q: "Who narrated the hadith on giving while healthy?", a: "Abu Hurairah", wrong: ["Anas", "Jabir", "Abu Dharr"], why: "Narrated Abu Huraira: A man came to the Prophet ﷺ and asked which charity is best." }
      ]
    },
    {
      slug: "blessing-of-cattle",
      title: "The blessing of cattle",
      line: "Cattle give us warm clothes, milk, food and many benefits.",
      facts: ["Camels, cows and sheep", "Wool and hair for clothing"],
      quote: q16(5),
      source: ik(5, "Allah reminds us of the cattle He created: camels, cows and sheep. From their wool and hair come clothes and furnishings, and from them come milk and food.", "The blessings include the benefits derived from their wool and hair"),
      difficulty: 2,
      questions: [
        { q: "What is in cattle for us, in 16:5?", a: "Warmth and many benefits", wrong: ["Nothing at all", "Only danger", "Only noise"], why: "In them there is warmth (warm clothing), and numerous benefits, and you eat from them." },
        { q: "Which animals are the An'am, per Ibn Kathir?", a: "Camels, cows and sheep", wrong: ["Lions and tigers", "Birds and fish", "Horses only"], why: "This term includes camels, cows and sheep." },
        { q: "What does warmth refer to, per Ibn Abbas?", a: "Clothing", wrong: ["Fire", "Sunlight", "Houses"], why: "Ibn Abbas said, In them there is warmth refers to clothing." }
      ]
    },
    {
      slug: "beauty-and-burdens",
      title: "Beauty and carrying loads",
      line: "Cattle are beautiful at dusk and carry loads to far lands.",
      facts: ["Journeys for Hajj and trade", "Your Lord is Kind, Merciful"],
      quote: q16(7),
      source: ik(6, "Cattle are a beauty when they come home full in the evening and go out to graze in the morning. They carry heavy loads to lands we could hardly reach, for Hajj, Umrah and trade.", "the heavy burdens that you cannot move or carry by yourselves"),
      difficulty: 2,
      questions: [
        { q: "When is there beauty in cattle, in 16:6?", a: "Coming home and going to pasture", wrong: ["Only at noon", "Only when sold", "Never"], why: "And there is beauty in them for you, when you bring them home in the evening, and as you lead them forth to pasture." },
        { q: "What do they carry, in 16:7?", a: "Your loads", wrong: ["The clouds", "The ships", "The mountains"], why: "And they carry your loads to a land that you could not reach yourselves except with great trouble." },
        { q: "How does 16:7 describe your Lord?", a: "Full of kindness, Most Merciful", wrong: ["Distant", "Silent", "Tired"], why: "Truly, your Lord is full of kindness, Most Merciful." }
      ]
    },
    {
      slug: "horses-to-ride",
      title: "Horses, mules and donkeys",
      line: "Horses, mules and donkeys were made to ride and to look fine.",
      facts: ["More creations we do not know", "Each is a blessing"],
      quote: q16(8),
      source: ik(8, "Allah made horses, mules and donkeys for riding and as adornment, and He creates other things that we do not know.", "all of which He made for riding and adornment"),
      difficulty: 2,
      questions: [
        { q: "Which animals are named in 16:8?", a: "Horses, mules and donkeys", wrong: ["Lions and wolves", "Fish and whales", "Birds and bees"], why: "And (He has created) horses, mules and donkeys for you to ride, and as an adornment." },
        { q: "For what are they, in 16:8?", a: "To ride and as adornment", wrong: ["To fight", "To guard", "To sing"], why: "For you to ride, and as an adornment." },
        { q: "What else does Allah create, in 16:8?", a: "Things we have no knowledge of", wrong: ["Nothing else", "Only stars", "Only rivers"], why: "And He creates (other) things of which you have no knowledge." }
      ]
    },
    {
      slug: "the-right-way",
      title: "Allah shows the right way",
      line: "Allah shows the straight path, while other paths go astray.",
      facts: ["From travel to the path to Allah", "He could guide all"],
      quote: q16(9),
      source: ik(9, "After animals for journeys, Allah speaks of the journey to Him. He makes clear the straight path and the paths that stray, and had He willed He would have guided everyone.", "It is up to Allah to clarify, to explain the guidance and misguidance"),
      difficulty: 3,
      questions: [
        { q: "Whose is it to show the right way, in 16:9?", a: "Allah's", wrong: ["The kings'", "The poets'", "The stars'"], why: "And it is up to Allah to show the right way." },
        { q: "What else exists, in 16:9?", a: "Ways that stray", wrong: ["Only one way", "No ways", "Golden ways"], why: "But there are ways that stray." },
        { q: "What did Ibn Abbas say is up to Allah?", a: "Explaining guidance and misguidance", wrong: ["Building roads", "Naming stars", "Counting sand"], why: "It is up to Allah to clarify, to explain the guidance and misguidance." }
      ]
    },
    {
      slug: "rain-brings-crops",
      title: "Rain brings every fruit",
      line: "One water from the sky grows olives, dates, grapes and more.",
      facts: ["We drink it, cattle graze", "A sign for thinkers"],
      quote: q16(11),
      source: ik(10, "Allah sends down fresh rain to drink and to grow pasture. With one kind of water He makes plants of different tastes, colors, scents and shapes, a sign that there is no god but Him.", "with this one kind of water, He makes the earth sprout plants with different tastes, colors, scents and shapes"),
      difficulty: 2,
      questions: [
        { q: "What grows from the rain for cattle, in 16:10?", a: "Vegetation to pasture", wrong: ["Rocks", "Metals", "Sand"], why: "From it (grows) the vegetation on which you send your cattle to pasture." },
        { q: "Which crops are named in 16:11?", a: "Olives, date palms and grapes", wrong: ["Rice and tea", "Apples and pears", "Wheat only"], why: "With it He causes crops to grow for you, the olives, the date palms, the grapes." },
        { q: "What comes from one kind of water, per Ibn Kathir?", a: "Plants of many tastes and colors", wrong: ["Only one plant", "Only grass", "Nothing"], why: "With this one kind of water, He makes the earth sprout plants with different tastes, colors, scents and shapes." }
      ]
    },
    {
      slug: "night-day-and-stars",
      title: "Night, day, sun and moon",
      line: "Night, day, sun, moon and stars all serve us by His command.",
      facts: ["Each in its own orbit", "Earth's many colors"],
      quote: q16(12),
      source: ik(12, "Night and day follow each other, and the sun, moon and stars each travel in the orbit Allah set, never straying, all under His command.", "travels in its own orbit, which Allah has ordained for it"),
      difficulty: 2,
      questions: [
        { q: "What has Allah subjected, in 16:12?", a: "Night, day, sun and moon", wrong: ["Only the sea", "Only the wind", "Only the trees"], why: "And He has subjected the night and the day for you, and the sun and the moon." },
        { q: "How do the heavenly bodies move, per Ibn Kathir?", a: "Each in its own orbit", wrong: ["Randomly", "Not at all", "By people's will"], why: "Each of (these heavenly bodies) travels in its own orbit, which Allah has ordained for it." },
        { q: "What on earth is a sign, in 16:13?", a: "Its varying colors", wrong: ["Its noise", "Its borders", "Its kings"], why: "And all He has created of varying colors on the earth for you." }
      ]
    },
    {
      slug: "the-sea-and-ships",
      title: "The sea and its ships",
      line: "The sea serves us with fresh fish, pearls and sailing ships.",
      facts: ["Nuh was the first to sail", "Seek His bounty and give thanks"],
      quote: q16(14),
      source: ik(14, "Allah made the sea serve us: fish to eat, pearls to wear, and ships to sail. He taught people to build ships, knowledge passed down from Nuh, the first to sail.", "He is the One Who taught mankind to make ships, which is the inheritance of their forefather Nuh"),
      difficulty: 2,
      questions: [
        { q: "What do we eat from the sea, in 16:14?", a: "Fresh tender meat", wrong: ["Bread", "Fruit", "Honey"], why: "That you may eat from the fresh tender meat." },
        { q: "What do we bring out of the sea to wear, in 16:14?", a: "Ornaments", wrong: ["Wool", "Leather", "Cotton"], why: "And that you bring forth out of it ornaments to wear." },
        { q: "Who was the first to travel by ship, per Ibn Kathir?", a: "Nuh", wrong: ["Musa", "Yunus", "Sulaiman"], why: "Nuh was the first one to travel by ship." }
      ]
    },
    {
      slug: "mountains-roads-stars",
      title: "Mountains, roads and stars",
      line: "Mountains steady the earth; roads and stars guide travelers.",
      facts: ["Rivers bring provision", "Landmarks for the lost"],
      quote: q16(16),
      source: ik(15, "Allah fixed mountains so the earth does not shake, made rivers bring provision far away, and gave roads, landmarks and stars so travelers find their way.", "things that land and sea travelers use to find their way if they get lost"),
      difficulty: 2,
      questions: [
        { q: "Why were mountains set firm, in 16:15?", a: "So the earth does not shake", wrong: ["To block the sun", "To hide gold", "To stop rain"], why: "And He has driven firm standing mountains into the earth, lest it should shake with you." },
        { q: "By what do they guide themselves at night, in 16:16?", a: "The stars", wrong: ["The clouds", "The wind", "The birds"], why: "And by the stars, they guide themselves." },
        { q: "What are landmarks for, per Ibn Kathir?", a: "Finding the way when lost", wrong: ["Decoration", "Hiding", "Farming"], why: "Things that land and sea travelers use to find their way if they get lost." }
      ]
    },
    {
      slug: "count-the-favors",
      title: "You could never count them",
      line: "Allah creates, idols do not, and His favors are past counting.",
      facts: ["He forgives our weak thanks", "He rewards much for little"],
      quote: q16(18),
      source: ik(18, "The One who creates is not like what cannot create. If we tried to count Allah's favors we could not, and we could never thank Him fully, yet He forgives much and rewards much for little.", "He forgives much and rewards for little"),
      difficulty: 3,
      questions: [
        { q: "Is the One who creates like one who cannot, in 16:17?", a: "No, never", wrong: ["Yes", "Sometimes", "Only at night"], why: "Is then He Who creates the same as one who creates not? Will you not then reflect?" },
        { q: "Can you count Allah's favors, in 16:18?", a: "Never", wrong: ["Yes, easily", "With help", "Once a year"], why: "And if you would try to count the favors of Allah, you would never be able to count them." },
        { q: "How does Allah reward, per Ibn Kathir?", a: "Much for little", wrong: ["Little for much", "Never", "Only the rich"], why: "He forgives much and rewards for little." }
      ]
    }
  ]
};

/** Ayahs 19 to 34: idols that create nothing, those who mislead others, and the good end of the godfearing. */
const NAHL_TWO: DeepUnit = {
  key: "nahl2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-16",
  name: "An-Nahl, ayahs 19 to 34",
  kind: "skill",
  lessonType: "surah",
  surahName: "An-Nahl",
  lessons: [
    {
      slug: "idols-create-nothing",
      title: "Idols create nothing",
      line: "Allah knows the hidden; idols create nothing and are lifeless.",
      facts: ["They are themselves made", "They do not know the Hour"],
      quote: q16(20),
      source: ik(19, "Allah knows what we hide and show. The idols people call on cannot create anything; they are made, lifeless, and do not hear, see or think.", "they are inanimate and lifeless, they do not hear, see, or think"),
      difficulty: 2,
      questions: [
        { q: "What does Allah know, in 16:19?", a: "What you conceal and reveal", wrong: ["Only what you say", "Only the past", "Nothing hidden"], why: "And Allah knows what you conceal and what you reveal." },
        { q: "What have the idols created, in 16:20?", a: "Nothing", wrong: ["The stars", "The rain", "Mankind"], why: "Those whom they invoke besides Allah have not created anything, but are themselves created." },
        { q: "What are the idols like, per Ibn Kathir?", a: "Lifeless, not hearing or seeing", wrong: ["Wise", "Strong", "Kind"], why: "They are inanimate and lifeless, they do not hear, see, or think." }
      ]
    },
    {
      slug: "your-god-is-one",
      title: "Your God is One",
      line: "Your God is One, but the proud hearts refuse to accept it.",
      facts: ["Allah knows what they hide", "He does not love the proud"],
      quote: q16(22),
      source: ik(22, "There is no god but Allah, the One. Those who deny the Hereafter refuse it in their hearts, too proud to worship Him alone, and Allah does not love the proud.", "they are too proud to worship Allah"),
      difficulty: 3,
      questions: [
        { q: "How many gods are there, in 16:22?", a: "One God", wrong: ["Two", "Three", "Many"], why: "Your god is one God." },
        { q: "Whom does Allah not like, in 16:23?", a: "The proud", wrong: ["The poor", "The young", "The travelers"], why: "Truly, He does not like the proud." },
        { q: "Why do they refuse, per Ibn Kathir?", a: "They are too proud to worship Allah", wrong: ["They never heard", "They were busy", "They were young"], why: "They are too proud to worship Allah, and their hearts reject the idea of singling Him out." }
      ]
    },
    {
      slug: "tales-of-old",
      title: "They said: tales of old",
      line: "Asked what Allah revealed, the deniers said: old tales.",
      facts: ["They kept changing their claims", "All of it was false"],
      quote: q16(24),
      source: ik(24, "When asked what their Lord had revealed, the deniers avoided the answer and said it was only old stories copied from earlier books. They called the Prophet ﷺ many names, all false.", "what he is reciting to us is just tales of the men of old"),
      difficulty: 3,
      questions: [
        { q: "What did they call the revelation, in 16:24?", a: "Tales of the men of old", wrong: ["Good news", "The truth", "A mercy"], why: "They say: Tales of the men of old!" },
        { q: "Did they answer the question honestly, per Ibn Kathir?", a: "No, they avoided it", wrong: ["Yes, fully", "They stayed silent", "They praised it"], why: "They say, not wanting to answer, Tales of the men of old!" },
        { q: "Per Ibn Kathir, their claims about the Prophet ﷺ agreed with each other.", tf: false, why: "They tell lies against the Messenger ﷺ and say things contradicting one another, but all of it is false." }
      ]
    },
    {
      slug: "callers-to-good",
      title: "Calling others to good",
      line: "Whoever calls to good gets the reward of all who follow him.",
      facts: ["Callers to error carry burdens", "Nothing is taken from followers"],
      quote: q16(25),
      source: hadith("muslim", "2674", "Abu Hurairah", "Sahih", "The Prophet ﷺ said whoever calls to guidance gets a reward like all who follow it, and whoever calls to error carries a sin like all who follow it, without lessening theirs.", "He who called (people) to righteousness, there would be reward (assured) for him like the rewards of those who adhered to it"),
      difficulty: 3,
      questions: [
        { q: "What will misleaders carry, in 16:25?", a: "Burdens of those they misled", wrong: ["Gold", "Flowers", "Nothing"], why: "And also the burdens of those whom they misled without knowledge." },
        { q: "What does one who calls to good get, in the hadith?", a: "A reward like his followers'", wrong: ["Nothing", "Half a reward", "Fame only"], why: "There would be reward (assured) for him like the rewards of those who adhered to it." },
        { q: "Is the followers' reward reduced, in the hadith?", a: "No, not at all", wrong: ["Yes, by half", "Yes, fully", "Only a little"], why: "Without their rewards being diminished in any respect." }
      ]
    },
    {
      slug: "plots-collapse",
      title: "Their plots collapse",
      line: "Earlier plotters schemed, but Allah struck their foundations.",
      facts: ["Their roof fell in", "It came from where they did not expect"],
      quote: q16(26),
      source: ik(26, "Those before plotted to mislead people, but Allah uprooted their schemes and brought their efforts to nothing, from a direction they never expected.", "He uprooted it and brought their efforts to naught"),
      difficulty: 3,
      questions: [
        { q: "Where did Allah strike, in 16:26?", a: "The foundation of their building", wrong: ["Their gardens", "Their wells", "Their boats"], why: "But Allah struck at the foundation of their building." },
        { q: "What fell on them, in 16:26?", a: "The roof", wrong: ["The rain", "The stars", "The trees"], why: "The roof fell down upon them from above them." },
        { q: "What did Allah do to their efforts, per Ibn Kathir?", a: "Brought them to nothing", wrong: ["Helped them", "Doubled them", "Rewarded them"], why: "He uprooted it and brought their efforts to naught." }
      ]
    },
    {
      slug: "secrets-made-public",
      title: "Secrets made public",
      line: "On that Day each betrayer gets a flag showing his betrayal.",
      facts: ["Where are the partners then?", "Hidden plots come to light"],
      quote: q16(27),
      source: hadith("bukhari", "6178", "Ibn Umar", "Sahih", "The Prophet ﷺ said a flag will be set up on the Day of Resurrection for every betrayer, announcing his betrayal before everyone.", "A flag will be fixed on the Day of Resurrection for every betrayer"),
      difficulty: 3,
      questions: [
        { q: "What will Allah ask them, in 16:27?", a: "Where are My so-called partners?", wrong: ["Where is your gold?", "Where are your homes?", "Where are your camels?"], why: "Where are My (so-called) partners, those over which you caused so much discord?" },
        { q: "What will be fixed for every betrayer, in the hadith?", a: "A flag", wrong: ["A crown", "A lamp", "A door"], why: "A flag will be fixed on the Day of Resurrection for every betrayer." },
        { q: "Who narrated the hadith on the betrayer's flag?", a: "Ibn Umar", wrong: ["Anas", "Abu Musa", "Jabir"], why: "Narrated Ibn Umar: Allah's Messenger ﷺ said, A flag will be fixed." }
      ]
    },
    {
      slug: "denial-at-death",
      title: "Denial at death",
      line: "At death some deny their wrong, but Allah knows what they did.",
      facts: ["Excuses do not help", "Allah knows every deed"],
      quote: q16(28),
      source: ik(28, "When the angels take the souls of those who wronged themselves, they pretend they did no evil. The angels reply that Allah knows best what they did.", "Truly, Allah is Most Knowing of what you did"),
      difficulty: 3,
      questions: [
        { q: "What do the wrongdoers claim at death, in 16:28?", a: "We did not do any evil", wrong: ["We are sorry", "We need more time", "We were rich"], why: "We did not do any evil." },
        { q: "What do the angels answer, in 16:28?", a: "Allah knows what you did", wrong: ["You are right", "Go back home", "Try again"], why: "Yes! Truly, Allah is Most Knowing of what you did." },
        { tf: false, q: "False excuses will hide deeds from Allah at death.", why: "Truly, Allah is Most Knowing of what you did." }
      ]
    },
    {
      slug: "home-of-the-arrogant",
      title: "An evil home for the arrogant",
      line: "Those too proud to follow the Messengers end in an evil home.",
      facts: ["Pride blocks the truth", "Humility opens the heart"],
      quote: q16(29),
      source: ik(29, "An evil home awaits those who were too arrogant to heed Allah's signs and follow His Messengers.", "for those who were too arrogant to pay attention to the signs of Allah and follow His Messengers"),
      difficulty: 4,
      questions: [
        { q: "For whom is the evil home, in 16:29?", a: "The arrogant", wrong: ["The poor", "The travelers", "The orphans"], why: "Indeed, what an evil abode there is for the arrogant." },
        { q: "What were they too proud to do, per Ibn Kathir?", a: "Follow His Messengers", wrong: ["Eat together", "Build houses", "Plant trees"], why: "Those who were too arrogant to pay attention to the signs of Allah and follow His Messengers." },
        { tf: true, q: "Pride kept them from Allah's signs, per Ibn Kathir.", why: "Those who were too arrogant to pay attention to the signs of Allah." }
      ]
    },
    {
      slug: "that-which-is-good",
      title: "They say: good",
      line: "Asked what Allah revealed, the godfearing say: good.",
      facts: ["Good for those who do good", "The Hereafter is better still"],
      quote: q16(30),
      source: ik(30, "The godfearing answer that their Lord revealed good: mercy and blessing for those who follow it. Whoever does good is rewarded in this world, and the Hereafter is better.", "He revealed something good, meaning mercy and blessings for those who followed it and believed in it"),
      difficulty: 2,
      questions: [
        { q: "What do the godfearing answer, in 16:30?", a: "That which is good", wrong: ["Old tales", "Nothing", "Magic"], why: "They say: That which is good." },
        { q: "Which home is better, in 16:30?", a: "The home of the Hereafter", wrong: ["A palace on earth", "A city house", "A tent"], why: "And the home of the Hereafter will be better." },
        { q: "What good was revealed, per Ibn Kathir?", a: "Mercy and blessings", wrong: ["Gold", "Kingdoms", "Riddles"], why: "He revealed something good, meaning mercy and blessings for those who followed it and believed in it." }
      ]
    },
    {
      slug: "gardens-of-eden",
      title: "Gardens of Eden",
      line: "The godfearing enter Gardens of Eden with all they wish.",
      facts: ["Rivers flow beneath", "They live there forever"],
      quote: q16(31),
      source: ik(31, "The home of the godfearing is Gardens of Eternity, with rivers flowing between trees and palaces, and everything they wish, where they live forever.", "in the Hereafter they will have Gardens of Eternity in which they will dwell forever"),
      difficulty: 2,
      questions: [
        { q: "Which Gardens will they enter, in 16:31?", a: "Adn, the Gardens of Eternity", wrong: ["Gardens of Babylon", "Gardens of Rome", "Gardens of kings"], why: "Adn (Eden) Paradise (Gardens of Eternity) which they will enter." },
        { q: "What will they have there, in 16:31?", a: "All that they wish", wrong: ["Half of it", "Only water", "Nothing new"], why: "In it they will have all that they wish." },
        { q: "How long will they dwell there, per Ibn Kathir?", a: "Forever", wrong: ["A year", "A century", "Until tired"], why: "They will have Gardens of Eternity in which they will dwell forever." }
      ]
    },
    {
      slug: "greeted-with-salam",
      title: "Greeted with Salam",
      line: "Angels greet the godfearing at death: peace, enter Paradise.",
      facts: ["Good news at the end", "A reward for their deeds"],
      quote: q16(32),
      source: ik(32, "When the godfearing die in a good state, free of Shirk, the angels greet them with peace and give them the good news of Paradise.", "The angels greet them and give them the good news of Paradise"),
      difficulty: 2,
      questions: [
        { q: "What do the angels say, in 16:32?", a: "Salamun Alaikum", wrong: ["Go away", "Wait here", "Nothing"], why: "Salamun Alaikum (peace be on you!)." },
        { q: "Why do they enter Paradise, in 16:32?", a: "Because of the good they did", wrong: ["Because of wealth", "Because of family", "By chance"], why: "Enter Paradise because of what (good) you used to do (in the world)." },
        { q: "What good news do the angels give, per Ibn Kathir?", a: "Paradise", wrong: ["Wealth", "Fame", "Long life"], why: "The angels greet them and give them the good news of Paradise." }
      ]
    },
    {
      slug: "wronging-themselves",
      title: "They wronged themselves",
      line: "Allah never wronged them; they wronged their own selves.",
      facts: ["Messengers warned them fully", "Mockery came back on them"],
      quote: q16(33),
      source: ik(33, "Allah did not wrong the earlier nations, for He sent Messengers and Books that warned them clearly. They wronged themselves by opposing the Messengers.", "because by sending His Messengers and revealing His Books He gave them enough warning"),
      difficulty: 3,
      questions: [
        { q: "Did Allah wrong them, in 16:33?", a: "No, never", wrong: ["Yes", "A little", "Sometimes"], why: "And Allah did not wrong them, but they were wronging themselves." },
        { q: "Whom were they wronging, in 16:33?", a: "Themselves", wrong: ["The angels", "The animals", "The stars"], why: "But they were wronging themselves." },
        { q: "How did Allah warn them, per Ibn Kathir?", a: "With Messengers and Books", wrong: ["With nothing", "With dreams only", "With kings"], why: "By sending His Messengers and revealing His Books He gave them enough warning." }
      ]
    }
  ]
};

/** Ayahs 35 to 50: a Messenger for every nation, the raising of the dead, the emigrants, and all things bowing to Allah. */
const NAHL_THREE: DeepUnit = {
  key: "nahl3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-16",
  name: "An-Nahl, ayahs 35 to 50",
  kind: "skill",
  lessonType: "surah",
  surahName: "An-Nahl",
  lessons: [
    {
      slug: "no-excuse-in-decree",
      title: "No excuse in Allah's decree",
      line: "Idolaters said: had Allah willed, we would not worship others.",
      facts: ["Allah forbade it clearly", "Messengers only convey"],
      quote: q16(35),
      source: ik(35, "The idolaters claimed their Shirk must please Allah, since He let it happen. But Allah clearly forbade it through His Messengers, so His decree is no excuse for them.", "The legislative will of Allah is clear and cannot be taken as an excuse by them"),
      difficulty: 4,
      questions: [
        { q: "What excuse did the idolaters give, in 16:35?", a: "Had Allah willed, we would not", wrong: ["We never heard", "We were forced", "We were young"], why: "If Allah had so willed, neither we nor our fathers would have worshipped any but Him." },
        { q: "What are the Messengers charged with, in 16:35?", a: "Clearly conveying the Message", wrong: ["Forcing people", "Ruling kingdoms", "Collecting wealth"], why: "Are the Messengers charged with anything but to clearly convey the Message?" },
        { q: "Can Allah's decree be an excuse for Shirk, per Ibn Kathir?", a: "No", wrong: ["Yes", "Sometimes", "For kings only"], why: "The legislative will of Allah is clear and cannot be taken as an excuse by them." }
      ]
    },
    {
      slug: "a-messenger-to-every-nation",
      title: "A Messenger to every nation",
      line: "Every nation got a Messenger: worship Allah and shun false gods.",
      facts: ["From Nuh to Muhammad ﷺ", "One message for all"],
      quote: q16(36),
      source: ik(36, "Allah sent a Messenger to every nation, from Nuh to Muhammad ﷺ, all with the same message: worship Allah alone and shun false gods. Some were guided and some strayed.", "All of the Messengers brought the same Message"),
      difficulty: 2,
      questions: [
        { q: "To whom did Allah send Messengers, in 16:36?", a: "Every nation", wrong: ["Only Arabs", "Only one city", "Only kings"], why: "And We have indeed sent a Messenger to every Ummah." },
        { q: "What was their message, in 16:36?", a: "Worship Allah and shun Taghut", wrong: ["Build towers", "Gather gold", "Follow your fathers"], why: "Worship Allah (Alone), and shun the Taghut (all false deities)." },
        { q: "Did the Messengers bring different messages, per Ibn Kathir?", a: "No, the same Message", wrong: ["Yes, all different", "Only two kinds", "Unknown"], why: "All of the Messengers brought the same Message." }
      ]
    },
    {
      slug: "a-true-promise",
      title: "A true promise",
      line: "They swore the dead stay dead, but Allah's promise is true.",
      facts: ["Most people do not know", "Disputes will be made clear"],
      quote: q16(38),
      source: ik(38, "The idolaters swore their strongest oaths that Allah would not raise the dead. Allah says yes, He will: a true promise binding on Him, so that every dispute is made clear.", "meaning it is inevitable"),
      difficulty: 3,
      questions: [
        { q: "What did they swear, in 16:38?", a: "Allah will not raise the dead", wrong: ["They would pray", "They would give", "They would travel"], why: "They swear by Allah with their strongest oaths, that Allah will not raise up one who dies." },
        { q: "What is Allah's answer, in 16:38?", a: "Yes, a true promise", wrong: ["Maybe", "No", "Silence"], why: "Yes, (He will raise them up), a promise (binding) upon Him in truth." },
        { q: "Why will people be raised, in 16:39?", a: "To make clear what they differed over", wrong: ["To build again", "To trade", "To rest"], why: "In order that He may make clear to them what they differed over." }
      ]
    },
    {
      slug: "be-and-it-is",
      title: "Be, and it is",
      line: "When Allah wills a thing, He only says Be, and it is.",
      facts: ["No need to repeat a command", "Nothing can stop Him"],
      quote: q16(40),
      source: ik(40, "When Allah wills something He gives the command once and it happens. He never needs to repeat it, for nothing can stop or oppose Him.", "We issue the command once, and then it happens"),
      difficulty: 2,
      questions: [
        { q: "What does Allah say to a thing He wills, in 16:40?", a: "Be!", wrong: ["Wait!", "Maybe", "Later"], why: "Our Word to a thing when We intend it, is only that We say unto it: Be! - and it is." },
        { q: "How many times does Allah need to command, per Ibn Kathir?", a: "Once", wrong: ["Twice", "Seven times", "Many times"], why: "We issue the command once, and then it happens." },
        { q: "Per Ibn Kathir, something can stop Allah's command.", tf: false, why: "There is nothing that can stop Him or oppose Him." }
      ]
    },
    {
      slug: "emigrants-rewarded",
      title: "The emigrants rewarded",
      line: "Those who left home for Allah were given a better home.",
      facts: ["The emigrants to Ethiopia", "The Hereafter is greater"],
      quote: q16(41),
      source: ik(41, "The Muslims who left Makkah for Ethiopia to worship Allah freely were promised good. Whoever gives up something for Allah, He replaces it with something better.", "Whoever gives up something for the sake of Allah, Allah compensates him with something that is better for him than that"),
      difficulty: 3,
      questions: [
        { q: "What will the emigrants get in the world, in 16:41?", a: "Good residence", wrong: ["Nothing", "Hardship forever", "Exile"], why: "We will certainly give them good residence in this world." },
        { q: "Where did those emigrants go, per Ibn Kathir?", a: "Ethiopia", wrong: ["Rome", "Persia", "Yemen"], why: "This may have been revealed concerning those who migrated to Ethiopia." },
        { q: "What does Allah give one who leaves something for Him, per Ibn Kathir?", a: "Something better", wrong: ["Nothing", "The same", "Less"], why: "Whoever gives up something for the sake of Allah, Allah compensates him with something that is better for him than that." }
      ]
    },
    {
      slug: "patient-and-trusting",
      title: "Patient and trusting",
      line: "The emigrants were patient and put their trust in their Lord.",
      facts: ["They bore hard treatment", "Allah made their end good"],
      quote: q16(42),
      source: ik(42, "The emigrants bore their people's harsh treatment with patience and trusted Allah, and He made their end good in this world and the next.", "they bore their people"),
      difficulty: 2,
      questions: [
        { q: "How are the emigrants described, in 16:42?", a: "Patient and trusting their Lord", wrong: ["Angry and proud", "Rich and famous", "Weak and lost"], why: "Those who remained patient, and put their trust in their Lord." },
        { q: "What did they bear with patience, per Ibn Kathir?", a: "Their people's persecution", wrong: ["Hunger only", "Long journeys only", "Nothing"], why: "They bore their people's persecution with patience, putting their trust in Allah." },
        { q: "How did Allah make their end, per Ibn Kathir?", a: "Good in both worlds", wrong: ["Sad", "Unknown", "Only good later"], why: "Putting their trust in Allah Who made their end good in this world and the Hereafter." }
      ]
    },
    {
      slug: "messengers-were-men",
      title: "The Messengers were men",
      line: "Every Messenger before was a man; ask those who know the Books.",
      facts: ["Not angels", "Ask the people of knowledge"],
      quote: q16(43),
      source: ik(43, "Some Arabs said Allah is too great to send a human Messenger. Allah answered that every Messenger before was a man, and told them to ask the People of earlier Books.", "what is meant by Ahl Adh-Dhikr is the People of the Book"),
      difficulty: 3,
      questions: [
        { q: "Whom did Allah send as Messengers, in 16:43?", a: "Men", wrong: ["Angels", "Jinn", "Kings only"], why: "And We sent not (as Our Messengers) before you any but men, whom We sent revelation." },
        { q: "Whom should they ask, in 16:43?", a: "Ahl Adh-Dhikr", wrong: ["The poets", "The fortune-tellers", "The children"], why: "So ask Ahl Adh-Dhikr, if you know not." },
        { q: "Who are Ahl Adh-Dhikr, per Ibn Abbas?", a: "The People of the Book", wrong: ["The angels", "The jinn", "The Quraysh"], why: "What is meant by Ahl Adh-Dhikr is the People of the Book." }
      ]
    },
    {
      slug: "explain-the-dhikr",
      title: "To explain the Quran",
      line: "The Quran came to the Prophet ﷺ so he explains it to people.",
      facts: ["He details what is brief", "So people reflect"],
      quote: q16(44),
      source: ik(44, "Allah revealed the Quran to the Prophet ﷺ so he would explain it to people, detailing what is brief and making clear what is unclear, so they reflect and are guided.", "So that you may explain in detail what has been mentioned in brief, and explain what is not clear"),
      difficulty: 3,
      questions: [
        { q: "Why was the Dhikr revealed to the Prophet ﷺ, in 16:44?", a: "To explain it clearly to people", wrong: ["To hide it", "To sell it", "To keep it secret"], why: "So that you may clearly explain to men what was revealed to them." },
        { q: "What does the Prophet ﷺ explain, per Ibn Kathir?", a: "What is brief and unclear", wrong: ["Old poems", "Trade prices", "Star signs"], why: "So that you may explain in detail what has been mentioned in brief, and explain what is not clear." },
        { q: "What should people do, at the end of 16:44?", a: "Reflect", wrong: ["Sleep", "Argue", "Forget"], why: "And that perhaps they may reflect." }
      ]
    },
    {
      slug: "do-not-feel-safe",
      title: "Do not feel safe from Allah",
      line: "Plotters should not feel safe; Allah delays out of patience.",
      facts: ["He can seize them anytime", "Yet He is Kind, Merciful"],
      quote: q16(45),
      source: ik(45, "Allah is patient with plotters and delays their punishment, though He could seize them any moment, while traveling or busy, as His kindness and mercy allow time to repent.", "Allah informs us about His patience, and how He delays the punishment"),
      difficulty: 4,
      questions: [
        { q: "Who should not feel secure, in 16:45?", a: "Those who devise evil plots", wrong: ["The patient", "The prayerful", "The kind"], why: "Do then those who devise evil plots feel secure?" },
        { q: "Why is punishment delayed, per Ibn Kathir?", a: "Allah is patient", wrong: ["He cannot", "He forgets", "He is busy"], why: "Allah informs us about His patience, and how He delays the punishment." },
        { q: "How does 16:47 describe your Lord?", a: "Full of kindness, Most Merciful", wrong: ["Harsh", "Distant", "Silent"], why: "Indeed, Your Lord is full of kindness, Most Merciful." }
      ]
    },
    {
      slug: "shadows-bow-down",
      title: "Even shadows bow down",
      line: "Shadows shift right and left, bowing humbly to Allah.",
      facts: ["Mountains bow by their shadows", "All creation submits"],
      quote: q16(48),
      source: ik(48, "Everything with a shadow, shifting through morning and evening, bows to Allah. Mujahid said the prostration of everything is its shadow, even of the mountains.", "The prostration of every thing is its shadow"),
      difficulty: 3,
      questions: [
        { q: "What do the shadows do, in 16:48?", a: "Prostrate to Allah", wrong: ["Hide", "Fight", "Sleep"], why: "Their shadows shift from right to left, prostrating to Allah while they are humble." },
        { q: "What is the prostration of everything, per Mujahid?", a: "Its shadow", wrong: ["Its sound", "Its color", "Its size"], why: "The prostration of every thing is its shadow." },
        { q: "How do the shadows bow, in 16:48?", a: "Humbly", wrong: ["Proudly", "Angrily", "Slowly only"], why: "Prostrating to Allah while they are humble." }
      ]
    },
    {
      slug: "angels-not-proud",
      title: "The angels are not proud",
      line: "All creation bows to Allah; the angels are never proud.",
      facts: ["They fear their Lord", "They do as they are told"],
      quote: q16(49),
      source: ik(49, "Everything in the heavens and earth, every creature and the angels, bows to Allah. The angels are not too proud to worship Him; they always obey, doing what He commands.", "they continually obey Allah, doing what He tells them to do"),
      difficulty: 3,
      questions: [
        { q: "Who prostrates to Allah, in 16:49?", a: "All in the heavens and earth", wrong: ["Only humans", "Only birds", "No one"], why: "And to Allah prostrate all that are in the heavens and all that are in the earth." },
        { q: "What are the angels not, in 16:49?", a: "Proud", wrong: ["Obedient", "Humble", "Busy"], why: "And the angels, and they are not proud." },
        { q: "What do the angels do, in 16:50?", a: "What they are commanded", wrong: ["Whatever they like", "Nothing", "Argue"], why: "They fear their Lord above them, and they do what they are commanded." }
      ]
    },
    {
      slug: "shaytan-weeps",
      title: "When you prostrate",
      line: "When we prostrate at an ayah of Sajdah, Shaytan weeps.",
      facts: ["16:50 is an ayah of Sajdah", "He was told and refused"],
      quote: q16(50),
      source: hadith("muslim", "81", "Abu Hurairah", "Sahih", "When a person recites an ayah of prostration and prostrates, Shaytan goes away weeping: the son of Adam was told to prostrate and did, and Shaytan was told and refused.", "the Satan goes into seclusion and weeps"),
      difficulty: 3,
      questions: [
        { q: "What does Shaytan do when a person prostrates, in the hadith?", a: "Goes away weeping", wrong: ["Laughs", "Joins in", "Sleeps"], why: "The Satan goes into seclusion and weeps." },
        { q: "Why does he weep, in the hadith?", a: "He refused to prostrate", wrong: ["He is tired", "He is hungry", "He is lost"], why: "The son of Adam was commanded to prostrate, and he prostrated, and I was commanded to prostrate, but I refused." },
        { q: "Who narrated the hadith on Shaytan weeping?", a: "Abu Hurairah", wrong: ["Anas", "Jabir", "Ibn Abbas"], why: "It is narrated on the authority of Abu Huraira." }
      ]
    }
  ]
};

/** Ayahs 51 to 72: one God, every blessing is His, milk, honey, old age and family. */
const NAHL_FOUR: DeepUnit = {
  key: "nahl4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-16",
  name: "An-Nahl, ayahs 51 to 72",
  kind: "skill",
  lessonType: "surah",
  surahName: "An-Nahl",
  lessons: [
    {
      slug: "do-not-take-two-gods",
      title: "Do not take two gods",
      line: "Allah is only One God, so fear Him alone.",
      facts: ["All in heaven and earth is His", "Worship is purely for Him"],
      quote: q16(51),
      source: ik(51, "Allah tells us there is no god but He, and none should be worshipped except Him, alone, for He is the Sovereign, Creator and Lord of all things. Mujahid said the religion is purely for Him.", "no one else should be worshipped except Him, alone, without partners"),
      difficulty: 3,
      questions: [
        { q: "What does Allah forbid, in 16:51?", a: "Worshipping two gods", wrong: ["Eating dates", "Travelling", "Sleeping"], why: "Do not worship two gods. Indeed, He (Allah) is only One God." },
        { q: "To whom belongs all in the heavens and earth, in 16:52?", a: "Allah", wrong: ["The kings", "The angels", "No one"], why: "To Him belongs all that is in the heavens and the earth and the religion." },
        { q: "What does the religion being His mean, per Mujahid?", a: "Purely for Him", wrong: ["For sale", "For one tribe", "For a while"], why: "Mujahid said: It means purely for Him, worship is due to Him Alone." }
      ]
    },
    {
      slug: "every-blessing-is-from-allah",
      title: "Every blessing is from Allah",
      line: "Every good thing we have comes from Allah alone.",
      facts: ["In harm we cry to Him", "Do not forget Him after"],
      quote: q16(53),
      source: ik(53, "Allah alone has the power to benefit and harm. The provisions, blessings, good health and help that His servants enjoy are all from His bounty, so when harm comes, they turn to Him.", "the provisions, blessings, good health and help, His servants enjoy are from His bounty and graciousness towards them"),
      difficulty: 3,
      questions: [
        { q: "Where do our blessings come from, in 16:53?", a: "From Allah", wrong: ["From luck", "From the stars", "From idols"], why: "And whatever of blessings and good things you have, it is from Allah." },
        { q: "What do people do when harm touches them, in 16:53?", a: "Cry to Allah for help", wrong: ["Laugh", "Sleep", "Forget Him"], why: "Then, when harm touches you, unto Him you cry aloud for help." },
        { q: "What do some do once the harm is gone, in 16:54?", a: "Associate others with Him", wrong: ["Thank Him more", "Pray all night", "Give charity"], why: "Then, when He has removed the harm from you, behold! some of you associate others in worship with their Lord." },
        { q: "Why do people call Allah in harm, per Ibn Kathir?", a: "None else can remove it", wrong: ["It is a habit", "Others are asleep", "It is cheap"], why: "Because you know that none has the power to remove that harm except for Him." }
      ]
    },
    {
      slug: "a-share-for-idols",
      title: "A share for false gods",
      line: "They gave idols a share of Allah's gifts; they will be asked.",
      facts: ["All provision is from Allah", "Every lie will be questioned"],
      quote: q16(56),
      source: ik(56, "The idol worshippers set aside part of what Allah gave them for their idols. Allah swore that He will question them about these lies.", "so Allah swore by His Almighty Self to question them about these lies and fabrications"),
      difficulty: 3,
      questions: [
        { q: "What did they assign to false gods, in 16:56?", a: "A share of their provision", wrong: ["Nothing", "Their homes", "Their prayers only"], why: "And they assign a portion of that which We have provided them with." },
        { q: "What did Allah swear, per Ibn Kathir?", a: "To question them about their lies", wrong: ["To forget them", "To make them rich", "To leave them be"], why: "So Allah swore by His Almighty Self to question them about these lies and fabrications." },
        { q: "Who gives all provision, in 16:56?", a: "Allah", wrong: ["The idols", "The kings", "The stars"], why: "That which We have provided them with." }
      ]
    },
    {
      slug: "no-children-for-allah",
      title: "Allah has no children",
      line: "They said the angels were Allah's daughters; He has no children.",
      facts: ["Glorified is He", "The angels are His servants"],
      quote: q16(57),
      source: ik(57, "The idol worshippers called the angels Allah's daughters, yet Allah has no offspring, and the angels are servants of the Most Merciful.", "They attributed offspring to Him when He has no offspring"),
      difficulty: 3,
      questions: [
        { q: "What did they wrongly assign to Allah, in 16:57?", a: "Daughters", wrong: ["Sons only", "A palace", "A throne of gold"], why: "And they assign daughters to Allah! Glorified is He." },
        { q: "Does Allah have any offspring, per Ibn Kathir?", a: "No, none", wrong: ["Yes, angels", "Yes, many", "Only one"], why: "They attributed offspring to Him when He has no offspring." },
        { q: "What are the angels, per Ibn Kathir?", a: "Servants of the Most Merciful", wrong: ["Allah's children", "Idols", "Stars"], why: "The angels, who are servants of the Most Merciful." }
      ]
    },
    {
      slug: "sad-at-a-daughter",
      title: "Sad at a daughter",
      line: "In ignorance some grieved when a girl was born to them.",
      facts: ["A habit Islam ended", "Every child is a gift"],
      quote: q16(58),
      source: ik(58, "In the days of ignorance, a man told of a newborn daughter would grow dark with distress and grief. Allah blamed this attitude.", "meaning with distress and grief"),
      difficulty: 3,
      questions: [
        { q: "What happened to his face, in 16:58?", a: "It became dark", wrong: ["It glowed", "It smiled", "It turned red with joy"], why: "His face becomes dark, and he is filled with inner grief." },
        { q: "What does the dark face mean, per Ibn Kathir?", a: "Distress and grief", wrong: ["Sunburn", "Anger at a friend", "Tiredness"], why: "Meaning with distress and grief." },
        { tf: false, q: "Allah praised those who grieved at a girl's birth.", why: "Certainly, evil is their decision." }
      ]
    },
    {
      slug: "raising-two-girls",
      title: "Raising daughters well",
      line: "The Prophet ﷺ promised nearness to whoever raises girls well.",
      facts: ["Daughters bring reward", "Care for them with love"],
      quote: q16(58),
      source: hadith("muslim", "2631", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said: whoever raises two girls well until they grow up, he and I will come on the Day of Resurrection close together, and he joined his fingers.", "He, who brought up two girls properly till they grew up"),
      difficulty: 4,
      questions: [
        { q: "How many girls are named in the hadith?", a: "Two", wrong: ["Five", "Ten", "One hundred"], why: "He, who brought up two girls properly till they grew up." },
        { q: "What did the Prophet ﷺ show with his fingers?", a: "Nearness to him", wrong: ["A number", "A direction", "A warning"], why: "He interlaced his fingers, explaining the point of nearness." },
        { q: "Who narrated the hadith of raising two girls?", a: "Anas ibn Malik", wrong: ["Abu Hurairah", "Aishah", "Jabir"], why: "Anas b. Malik reported Allah's Messenger ﷺ as saying." }
      ]
    },
    {
      slug: "evil-is-their-decision",
      title: "Evil is their decision",
      line: "Allah condemned hiding or harming daughters as an evil choice.",
      facts: ["Islam protects girls", "Daughters inherit too"],
      quote: q16(59),
      source: ik(59, "The man would hide from people and wonder whether to keep her in humiliation, denying her inheritance and care, or to bury her, as was done in ignorance. Allah says evil is their decision.", "Certainly, evil is their decision"),
      difficulty: 4,
      questions: [
        { q: "What does Allah call their choice, in 16:59?", a: "Evil", wrong: ["Wise", "Kind", "Brave"], why: "Certainly, evil is their decision." },
        { q: "What did he do from the people, in 16:59?", a: "He hid himself", wrong: ["He threw a feast", "He gave gifts", "He traveled"], why: "He hides himself from the people." },
        { q: "What rights did they deny daughters, per Ibn Kathir?", a: "Inheritance and care", wrong: ["Only toys", "Only names", "Nothing at all"], why: "Not letting her inherit from him and not taking care of her." }
      ]
    },
    {
      slug: "the-highest-description",
      title: "The highest description",
      line: "Allah alone is perfect in every way.",
      facts: ["He is All-Mighty, All-Wise", "Idolaters wrongly gave Him daughters"],
      quote: q16(60),
      source: ik(60, "The idolaters wrongly claimed Allah had daughters while wanting sons for themselves. Allah is far above that: He has the highest description and is absolutely perfect in all ways.", "He is absolutely perfect in all ways and this absolute perfection is His Alone"),
      difficulty: 4,
      questions: [
        { q: "What belongs to Allah, in 16:60?", a: "The highest description", wrong: ["A weak name", "A family", "A partner"], why: "And for Allah is the highest description." },
        { q: "What does the highest description mean, per Ibn Kathir?", a: "He is perfect in all ways", wrong: ["He is old", "He is far", "He is hidden"], why: "He is absolutely perfect in all ways and this absolute perfection is His Alone." },
        { q: "Which two names end 16:60?", a: "All-Mighty, All-Wise", wrong: ["Most Kind, Forgiving", "Hearing, Seeing", "First, Last"], why: "And He is the All-Mighty, the All-Wise." }
      ]
    },
    {
      slug: "allah-gives-time",
      title: "Allah gives time",
      line: "If Allah punished at once, no creature would be left.",
      facts: ["He waits to an appointed term", "He covers people's faults"],
      quote: q16(61),
      source: ik(61, "Allah is patient with His creatures even though they do wrong. If He punished them straight away, no living creature would be left. He is forbearing, covers faults, and waits until the appointed time.", "He waits until the appointed time"),
      difficulty: 4,
      questions: [
        { q: "What would happen if Allah punished everyone at once, in 16:61?", a: "No creature would be left", wrong: ["Nothing", "Only rain", "More food"], why: "He would not leave on it (the earth) a single moving creature." },
        { q: "What does Allah do instead, in 16:61?", a: "Defers them to a set term", wrong: ["Forgets them", "Gives up", "Hurries"], why: "But He defers them to an appointed term." },
        { q: "Can a person delay their set term by an hour, in 16:61?", tf: false, why: "When their term comes, they can neither delay nor advance it an hour." },
        { q: "What does Allah do with people's faults, per Ibn Kathir?", a: "He covers them", wrong: ["He shouts them", "He writes songs", "He ignores Himself"], why: "The Lord is forbearing and He covers people's faults." }
      ]
    },
    {
      slug: "messengers-were-rejected-before",
      title: "You are not alone",
      line: "Messengers before were rejected too, so do not be sad.",
      facts: ["Shaytan made bad deeds look nice", "He cannot save anyone"],
      quote: q16(63),
      source: ik(63, "Allah comforts the Prophet ﷺ: Messengers were sent to nations before and were rejected, so he has an example in his brothers among the Messengers. Shaytan made people's deeds look attractive to them.", "You, O Muhammad, have an example in your brothers among the Messengers"),
      difficulty: 3,
      questions: [
        { q: "Did Allah send Messengers to nations before, in 16:63?", tf: true, why: "By Allah, We indeed sent (Messengers) to the nations before you." },
        { q: "What did Shaytan do to those nations, in 16:63?", a: "Made their deeds look fair", wrong: ["Helped them", "Taught them truth", "Fed them"], why: "But Shaytan made their deeds seeming fair to them." },
        { q: "Whom does the Prophet ﷺ have as an example, per Ibn Kathir?", a: "His brothers the Messengers", wrong: ["The kings", "The poets", "No one"], why: "You, O Muhammad, have an example in your brothers among the Messengers." }
      ]
    },
    {
      slug: "the-book-settles-disputes",
      title: "The Book settles disputes",
      line: "The Quran explains what people argue about, and guides hearts.",
      facts: ["A guidance for hearts", "A mercy for those who hold on"],
      quote: q16(64),
      source: ik(64, "Allah revealed the Book to explain the truth in matters people dispute over. The Quran decides every issue they argue about, and it is a guidance for hearts and a mercy for whoever holds to it.", "is a decisive arbitrator for every issue that they argue about"),
      difficulty: 4,
      questions: [
        { q: "Why was the Book revealed, in 16:64?", a: "To explain what they differ in", wrong: ["To hide truth", "To tell stories only", "To make poems"], why: "That you may clearly explain to them those things in which they differ." },
        { q: "What else is the Book, in 16:64?", a: "A guidance and a mercy", wrong: ["A puzzle", "A secret", "A burden"], why: "And (as) a guidance and a mercy for a people who believe." },
        { q: "The guidance is for whose hearts, per Ibn Kathir?", a: "Their hearts", wrong: ["Their wallets", "Their homes", "Their animals"], why: "And (as) a guidance) meaning, for their hearts." }
      ]
    },
    {
      slug: "rain-brings-earth-to-life",
      title: "Rain brings the earth to life",
      line: "Rain revives dead earth, like the Quran revives dead hearts.",
      facts: ["A sign for those who listen", "Listen and understand"],
      quote: q16(65),
      source: ik(65, "Just as the Quran brings life to hearts that were dead, Allah brings the earth to life after it died by sending down water from the sky.", "He brings the earth to life after it has died, by sending down water from the sky"),
      difficulty: 3,
      questions: [
        { q: "What does Allah send from the sky, in 16:65?", a: "Water", wrong: ["Gold", "Stones", "Bread"], why: "And Allah sends water down from the sky." },
        { q: "What does the rain do to the earth, in 16:65?", a: "Revives it after its death", wrong: ["Ruins it", "Freezes it", "Moves it"], why: "Then He revives the earth with it after its death." },
        { q: "What does the Quran do to hearts, per Ibn Kathir?", a: "Brings them to life", wrong: ["Makes them hard", "Makes them sleep", "Nothing"], why: "Just as Allah causes the Qur'an to bring life to hearts that were dead from disbelief." },
        { q: "The sign in 16:65 is for which people?", a: "People who listen", wrong: ["People who sleep", "People who boast", "People who travel"], why: "Surely that is a sign for people who listen." }
      ]
    },
    {
      slug: "pure-milk",
      title: "Pure milk",
      line: "Allah brings pure, tasty milk out of the cattle.",
      facts: ["It never mixes with the rest", "A sign of His wisdom"],
      quote: q16(66),
      source: ik(66, "In camels, cows and sheep there is a lesson: Allah brings out milk that is pure in its whiteness, taste and sweetness, and nothing in the animal mixes with it.", "it is free of blood, and is pure in its whiteness, taste and sweetness"),
      difficulty: 3,
      questions: [
        { q: "What drink comes from cattle, in 16:66?", a: "Pure milk", wrong: ["Juice", "Honey", "Water"], why: "We have made a drink for you out of what is in its belly, pure milk." },
        { q: "Which animals are the An'am, per Ibn Kathir?", a: "Camels, cows and sheep", wrong: ["Lions and wolves", "Birds and fish", "Bees and ants"], why: "In the cattle) meaning camels, cows and sheep." },
        { q: "How does Ibn Kathir describe the milk?", a: "Pure in whiteness, taste, sweetness", wrong: ["Bitter", "Mixed and dark", "Salty"], why: "It is free of blood, and is pure in its whiteness, taste and sweetness." },
        { q: "Per Ibn Kathir, one can choke on that milk.", tf: false, why: "Palatable to the drinkers.) meaning nothing to cause one to choke on it." }
      ]
    },
    {
      slug: "dates-and-grapes",
      title: "Dates, grapes and reason",
      line: "Dates and grapes are good food; intoxicants are forbidden.",
      facts: ["Reason is precious", "A sign for those who think"],
      quote: q16(67),
      source: ik(67, "Dates and grapes give a goodly provision. Allah later forbade this Ummah from intoxicating drinks to protect their reason, the noblest feature of man.", "Allah forbade this Ummah from drinking intoxicants, in order to protect their ability to reason"),
      difficulty: 4,
      questions: [
        { q: "Which fruits are named in 16:67?", a: "Date palms and grapes", wrong: ["Apples and figs", "Olives and pears", "Melons"], why: "And from the fruits of date palms and grapes." },
        { q: "What is the goodly provision, per Ibn Abbas?", a: "What is lawful from them", wrong: ["Only the leaves", "The seeds", "The wood"], why: "Strong drink is its unlawful, and the goodly provision is its lawful." },
        { q: "Why did Allah forbid intoxicants, per Ibn Kathir?", a: "To protect reason", wrong: ["They cost a lot", "They are heavy", "They are slow"], why: "Allah forbade this Ummah from drinking intoxicants, in order to protect their ability to reason." },
        { q: "What does Ibn Kathir call the noblest feature of man?", a: "Reason", wrong: ["Strength", "Wealth", "Height"], why: "It is appropriate to mention reason here, because it is the noblest feature of man." }
      ]
    },
    {
      slug: "the-bee-is-guided",
      title: "The bee is guided",
      line: "Allah guided the bee to build homes and find its way back.",
      facts: ["Hexagon combs, firmly built", "Easy paths from its Lord"],
      quote: q16(68),
      source: ik(68, "The inspiration to the bee means guidance. It builds its home in mountains, trees and buildings, with strong hexagon combs, then flies far and comes straight back to its hive.", "it comes straight back to its home where its offspring and honey are"),
      difficulty: 3,
      questions: [
        { q: "Whom did your Lord inspire, in 16:68?", a: "The bee", wrong: ["The ant", "The camel", "The bird"], why: "And your Lord inspired the bee." },
        { q: "What does inspiration mean for the bee, per Ibn Kathir?", a: "Guidance", wrong: ["A dream", "A book", "A song"], why: "What is meant by inspiration here is guidance." },
        { q: "Where does the bee make homes, in 16:68?", a: "Mountains, trees, buildings", wrong: ["Under the sea", "In the clouds", "In sand"], why: "Take you habitations in the mountains and in the trees and in what they erect." },
        { q: "What shape are the bee's combs, per Ibn Kathir?", a: "Hexagonal", wrong: ["Round", "Square", "Triangle"], why: "With its hexagonal shapes and interlocking forms there is no looseness in its combs." }
      ]
    },
    {
      slug: "honey-is-a-cure",
      title: "Honey has healing",
      line: "Honey of many colors comes from bees, and it has healing.",
      facts: ["Colors depend on what bees eat", "A sign for those who reflect"],
      quote: q16(69),
      source: ik(69, "Honey comes out white, yellow, red or other colors, depending on what the bees eat, and in it there is a cure for diseases people suffer from.", "there is a cure in honey for diseases that people suffer from"),
      difficulty: 3,
      questions: [
        { q: "What comes from the bees, in 16:69?", a: "A drink of varying colors", wrong: ["Milk", "Water", "Oil"], why: "There comes forth from their bellies, a drink of varying colors." },
        { q: "What is in honey, in 16:69?", a: "A cure for people", wrong: ["Poison", "Nothing", "Sadness"], why: "In which there is a cure for men." },
        { q: "Why does honey have different colors, per Ibn Kathir?", a: "What the bees eat", wrong: ["The weather", "The jar", "The time"], why: "White, yellow, red, or of other good colors, depending on the different things that the bees eat." }
      ]
    },
    {
      slug: "let-him-drink-honey",
      title: "Let him drink honey",
      line: "The Prophet ﷺ said honey again and again, and the man was cured.",
      facts: ["Allah has said the truth", "Keep trusting the cure"],
      quote: q16(69),
      source: hadith("bukhari", "5684", "Abu Sa'id al-Khudri", "Sahih", "A man said his brother had stomach trouble. The Prophet ﷺ told him to give honey, again and again, saying Allah has said the truth, until the brother was cured.", "Allah has said the truth, but your brother"),
      difficulty: 4,
      questions: [
        { q: "What did the Prophet ﷺ tell the man to give, in the hadith?", a: "Honey", wrong: ["Milk", "Dates", "Water"], why: "The Prophet ﷺ said to him, Let him drink honey." },
        { q: "What happened in the end, in the hadith?", a: "He was cured", wrong: ["He got worse", "He left", "Nothing"], why: "So he made him drink honey and he was cured." },
        { q: "What did the Prophet ﷺ say about Allah, in the hadith?", a: "Allah has said the truth", wrong: ["Allah forgot", "Allah is far", "Allah is silent"], why: "Allah has said the truth, but your brother's abdomen has told a lie." },
        { q: "Who narrated the honey hadith?", a: "Abu Sa'id al-Khudri", wrong: ["Aishah", "Anas", "Abu Musa"], why: "Narrated Abu Sa'id Al-Khudri." }
      ]
    },
    {
      slug: "from-weakness-to-old-age",
      title: "From strength to old age",
      line: "Allah creates us, and some grow so old they forget.",
      facts: ["He gives and takes strength", "He is Knowing, All-Able"],
      quote: q16(70),
      source: ik(70, "Allah created people from nothing and will cause them to die. Some He lets grow very old, until after knowing things they reach a stage where they know nothing, because of weakness of old age.", "after he knew things, he will reach a stage where he knows nothing because of weakness of mind due to old age"),
      difficulty: 3,
      questions: [
        { q: "Who creates us and causes us to die, in 16:70?", a: "Allah", wrong: ["Time", "Nature", "Luck"], why: "And Allah created you and then He will cause you to die." },
        { q: "What happens to some who grow very old, in 16:70?", a: "They know nothing after knowing", wrong: ["They grow taller", "They never tire", "They get younger"], why: "So that they know nothing after having known (much)." },
        { q: "Which two names end 16:70?", a: "Knowing, capable of all things", wrong: ["Forgiving, Kind", "Near, Answering", "First, Last"], why: "Truly, Allah is Knowing, capable of all things." }
      ]
    },
    {
      slug: "the-prophets-dua",
      title: "A dua for protection",
      line: "The Prophet ﷺ sought refuge from laziness and weak old age.",
      facts: ["Also from miserliness", "Ask Allah for protection"],
      quote: q16(70),
      source: hadith("bukhari", "4707", "Anas ibn Malik", "Sahih", "Al-Bukhari reported this dua when explaining 16:70: the Prophet ﷺ sought refuge with Allah from miserliness, laziness, weak old age and the trials of life and death.", "I seek refuge with You from miserliness, laziness"),
      difficulty: 4,
      questions: [
        { q: "What did the Prophet ﷺ seek refuge from, in the hadith?", a: "Miserliness and laziness", wrong: ["Rain", "Travel", "Friends"], why: "O Allah! I seek refuge with You from miserliness, laziness." },
        { q: "Old age is one of the things in the dua.", tf: true, why: "I seek refuge with You from miserliness, laziness; from old geriatric age." },
        { q: "Who narrated the dua hadith?", a: "Anas ibn Malik", wrong: ["Abu Hurairah", "Jabir", "Umar"], why: "Narrated Anas bin Malik." }
      ]
    },
    {
      slug: "no-equal-to-allah",
      title: "No servant is His equal",
      line: "You share no wealth equally with servants; Allah has no equal.",
      facts: ["Provision is a test", "Be content and thankful"],
      quote: q16(71),
      source: ik(71, "People would never make their servants equal partners in their wealth, so how could Allah accept His servants as His equals? Umar wrote that provision differs as a test.", "Be content with your provision in this world"),
      difficulty: 4,
      questions: [
        { q: "Who gave some more wealth than others, in 16:71?", a: "Allah", wrong: ["Luck", "The kings", "The stars"], why: "And Allah honored some of you over others with wealth and properties." },
        { q: "What is the point of the parable, per Ibn Abbas?", a: "Allah has no partner", wrong: ["Wealth is evil", "Share everything", "Servants rule"], why: "How can My servant have a share with Me in My power?" },
        { q: "What did Umar advise Abu Musa?", a: "Be content with your provision", wrong: ["Seek more gold", "Hide your wealth", "Leave your work"], why: "Be content with your provision in this world." }
      ]
    },
    {
      slug: "spouses-and-children",
      title: "Spouses and children",
      line: "Allah gave us spouses of our own kind, and children.",
      facts: ["Harmony, love and mercy", "And good provision"],
      quote: q16(72),
      source: ik(72, "Allah gave people mates of their own kind; otherwise there would be no harmony, love and mercy. From them come children and grandchildren, and He grants good food and drink.", "If He had given them mates of another kind, there would be no harmony, love and mercy between them"),
      difficulty: 3,
      questions: [
        { q: "What did Allah make for you, in 16:72?", a: "Mates of your own kind", wrong: ["Stars", "Castles", "Rivers"], why: "And Allah has made for you mates of your own kind." },
        { q: "Why mates of our own kind, per Ibn Kathir?", a: "For harmony, love and mercy", wrong: ["For speed", "For fame", "For strength"], why: "If He had given them mates of another kind, there would be no harmony, love and mercy between them." },
        { q: "What comes from our mates, in 16:72?", a: "Sons and grandsons", wrong: ["Gold", "Servants only", "Nothing"], why: "And has made for you, from your mates, sons and grandsons." },
        { q: "What does good provision mean, per Ibn Kathir?", a: "Food and drink", wrong: ["Gold", "Houses", "Books"], why: "And has granted you good provisions.) meaning your food and drink." }
      ]
    }
  ]
};

/** Ayahs 73 to 89: true examples, the twinkling Hour, our senses, birds, homes, and the witness of every nation. */
const NAHL_FIVE: DeepUnit = {
  key: "nahl5",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-16",
  name: "An-Nahl, ayahs 73 to 89",
  kind: "skill",
  lessonType: "surah",
  surahName: "An-Nahl",
  lessons: [
    {
      slug: "they-cannot-provide",
      title: "They cannot provide",
      line: "Idols cannot bring rain or grow a single plant.",
      facts: ["Do not liken anything to Allah", "Allah knows, we do not"],
      quote: q16(73),
      source: ik(73, "Allah alone is the Provider. The idols people worship cannot cause rain to fall or make plants and trees grow, not even for themselves. So do not set up rivals to Allah or describe anything as like Him.", "nobody can cause rain to fall, or make plants and trees grow"),
      difficulty: 3,
      questions: [
        { q: "What can false gods not grant, in 16:73?", a: "Any provision", wrong: ["Fear", "Noise", "Dust"], why: "Such as do not have power to grant them any provision from the heavens or the earth." },
        { q: "What does Allah say not to do, in 16:74?", a: "Give examples for Allah", wrong: ["Give charity", "Travel", "Learn"], why: "So do not give examples on behalf of Allah." },
        { q: "What does that mean, per Ibn Kathir?", a: "Do not liken anything to Him", wrong: ["Do not speak", "Do not write", "Do not count"], why: "Do not set up rivals to Him or describe anything as being like Him." },
        { q: "Who knows, in 16:74?", a: "Allah knows, you know not", wrong: ["Everyone knows", "No one knows", "Only kings know"], why: "Truly, Allah knows and you know not." }
      ]
    },
    {
      slug: "two-servants-not-equal",
      title: "Two servants, not equal",
      line: "A powerless servant and a generous giver are not the same.",
      facts: ["An example of belief and disbelief", "Or of idols and the True God"],
      quote: q16(75),
      source: ik(75, "Ibn Abbas said this is an example of the believer and the disbeliever: one has no power at all, the other spends of his good provision secretly and openly. Mujahid said it compares an idol with the True God.", "This is an example given of the idol and the True God"),
      difficulty: 4,
      questions: [
        { q: "How does the second man spend, in 16:75?", a: "Secretly and openly", wrong: ["Never", "Only for show", "Only once"], why: "And he spends from that secretly and openly." },
        { q: "Are the two equal, in 16:75?", tf: false, why: "Can they be equal? (By no means)." },
        { q: "What does the spender stand for, per Ibn Abbas?", a: "The believer", wrong: ["The idol", "The king", "The traveler"], why: "This is the example which Allah gives of the disbeliever and the believer." },
        { q: "What did Mujahid say the example compares?", a: "An idol and the True God", wrong: ["Two kings", "Two cities", "Two seasons"], why: "This is an example given of the idol and the True God." }
      ]
    },
    {
      slug: "the-one-who-commands-justice",
      title: "The one who commands justice",
      line: "A mute idol is not equal to one who commands justice.",
      facts: ["The idol cannot speak or act", "Justice and the straight path"],
      quote: q16(76),
      source: ik(76, "Mujahid said the dumb man is like the idol: it cannot speak or do anything and is a burden on its master. It is not equal to one who commands fairness and is on the straight path.", "the idol is dumb and cannot speak or say anything, good or otherwise"),
      difficulty: 4,
      questions: [
        { q: "What can the first man do, in 16:76?", a: "Nothing at all", wrong: ["Everything", "Lead armies", "Teach"], why: "One of them dumb, who has no power over anything." },
        { q: "What does the second man command, in 16:76?", a: "Justice", wrong: ["Fear", "Games", "Silence"], why: "Is such a man equal to one who commands justice?" },
        { q: "What does commanding justice mean, per Ibn Kathir?", a: "Fairness, true words, good deeds", wrong: ["Shouting loudly", "Owning land", "Being rich"], why: "Meaning fairness, one whose words are true and whose deeds are righteous." },
        { q: "Where is the just man, in 16:76?", a: "On the straight path", wrong: ["Lost", "Asleep", "Far away"], why: "And is himself on the straight path." }
      ]
    },
    {
      slug: "twinkling-of-an-eye",
      title: "In the blink of an eye",
      line: "The Hour comes as fast as a blink, or even nearer.",
      facts: ["Only Allah knows the Unseen", "He is able to do all things"],
      quote: q16(77),
      source: ik(77, "Allah alone knows the Unseen of the heavens and the earth. When He wills something it happens in a blink, and the coming of the Hour is like the twinkling of an eye, or nearer.", "whatever He wills happens in blinking"),
      difficulty: 3,
      questions: [
        { q: "To whom belongs the Unseen, in 16:77?", a: "Allah", wrong: ["Fortune-tellers", "Angels alone", "Stars"], why: "And to Allah belongs the Unseen of the heavens and the earth." },
        { q: "How fast is the Hour, in 16:77?", a: "A twinkling of the eye, or nearer", wrong: ["A thousand years", "A slow walk", "A long day"], why: "And the matter of the Hour is not but as a twinkling of the eye, or even nearer." },
        { q: "How quickly does what Allah wills happen, per Ibn Kathir?", a: "In a blink", wrong: ["In years", "Never", "In parts"], why: "Meaning, whatever He wills happens in blinking." }
      ]
    },
    {
      slug: "hearing-sight-and-hearts",
      title: "Hearing, sight and hearts",
      line: "Born knowing nothing, we got senses so we would be thankful.",
      facts: ["They grow little by little", "Use them to obey Allah"],
      quote: q16(78),
      source: ik(78, "Allah brought us from our mothers knowing nothing, then gave us hearing, sight and hearts, meaning reason. These grow gradually, and He created them so we can worship and obey Him.", "Allah has created these faculties in man to enable him to worship his Lord"),
      difficulty: 3,
      questions: [
        { q: "How much did we know at birth, in 16:78?", a: "Nothing", wrong: ["Everything", "Two languages", "Our letters"], why: "And Allah has brought you out from the wombs of your mothers while you knew nothing." },
        { q: "What three gifts are in 16:78?", a: "Hearing, sight, and hearts", wrong: ["Gold, silver, gems", "Land, sea, sky", "Food, drink, sleep"], why: "And He gave you hearing, sight, and hearts." },
        { q: "Why were they given, in 16:78?", a: "That you might give thanks", wrong: ["To boast", "To rest", "To argue"], why: "That you might give thanks." },
        { q: "What do hearts mean, per Ibn Kathir?", a: "Reason", wrong: ["Strength", "Blood", "Feelings only"], why: "And hearts - meaning reason." }
      ]
    },
    {
      slug: "when-allah-loves-a-servant",
      title: "When Allah loves a servant",
      line: "Extra good deeds bring us near until Allah loves us.",
      facts: ["First do the obligations", "Then add voluntary deeds"],
      quote: q16(78),
      source: hadith("bukhari", "6502", "Abu Hurairah", "Sahih", "Ibn Kathir quotes this hadith on 16:78: a servant keeps coming closer to Allah with extra deeds until Allah loves him, and then guides his hearing, sight, hands and feet.", "My slave keeps on coming closer to Me through performing Nawafil"),
      difficulty: 5,
      questions: [
        { q: "What is most beloved to Allah, in the hadith?", a: "What He has enjoined", wrong: ["Wealth", "Fame", "Sleep"], why: "The most beloved things with which My slave comes nearer to Me, is what I have enjoined upon him." },
        { q: "How does the servant keep coming closer, in the hadith?", a: "Through Nawafil, extra deeds", wrong: ["Through money", "Through travel", "Through fame"], why: "My slave keeps on coming closer to Me through performing Nawafil." },
        { q: "What happens if the loved servant asks, in the hadith?", a: "Allah gives him", wrong: ["He is ignored", "He waits forever", "He is refused"], why: "And if he asks Me, I will give him." },
        { q: "The loved servant only hears and sees what Allah allows, per Ibn Kathir.", tf: true, why: "He only hears for the sake of Allah, he only sees for the sake of Allah." }
      ]
    },
    {
      slug: "birds-held-in-the-sky",
      title: "Birds held in the sky",
      line: "None holds the birds up in the sky but Allah.",
      facts: ["He made the air carry them", "A sign for believers"],
      quote: q16(79),
      source: ik(79, "Look at the birds flying between heaven and earth. They are held up only by Allah, Who gave them the strength to fly and made the air carry them.", "They are held up only by Him, it is He Who gave them the strength to do that"),
      difficulty: 3,
      questions: [
        { q: "Who holds the birds up, in 16:79?", a: "Allah", wrong: ["The wind alone", "The clouds", "Nobody"], why: "None holds them up but Allah." },
        { q: "Where are the birds held, in 16:79?", a: "In the midst of the sky", wrong: ["Under the sea", "In caves", "On the ground"], why: "Do they not see the birds held (flying) in the midst of the sky?" },
        { q: "What did Allah make carry the birds, per Ibn Kathir?", a: "The air", wrong: ["Ropes", "Angels only", "Rain"], why: "Subjecting the air to carry them and support them." }
      ]
    },
    {
      slug: "homes-and-tents",
      title: "Homes and light tents",
      line: "Allah gave us homes of rest and light tents for travel.",
      facts: ["Wool, fur and hair for comfort", "Carpets, clothes and trade"],
      quote: q16(80),
      source: ik(80, "Allah gave people homes to rest in, and homes from cattle hides that are light to carry on journeys. From wool, fur and hair they make carpets, clothes and goods.", "which are light and easy to carry on journeys and can be erected wherever they stop"),
      difficulty: 3,
      questions: [
        { q: "What are our homes for, in 16:80?", a: "A place of rest", wrong: ["A place of fear", "A prison", "A market"], why: "And Allah had made your homes a place of rest for you." },
        { q: "What are the light homes made of, in 16:80?", a: "Hides of cattle", wrong: ["Stone", "Glass", "Gold"], why: "And made dwellings for you out of the hides of the cattle which you find so light." },
        { q: "Wool, fur and hair come from which animals, per Ibn Kathir?", a: "Sheep, camels and goats", wrong: ["Lions, bears, wolves", "Birds, fish, bees", "Horses only"], why: "Out of their wool, fur and hair) refers to sheep, camels and goats respectively." }
      ]
    },
    {
      slug: "shade-and-clothing",
      title: "Shade and clothing",
      line: "Trees give shade, and clothes protect us from the heat.",
      facts: ["Shelters in the mountains", "So we may submit to Him"],
      quote: q16(81),
      source: ik(81, "Qatadah said the shade is trees. Allah made shelters in the mountains and clothes of cotton, linen and wool against the heat, and so He perfects His favor so people can worship and obey Him.", "thus He gives you what you need to go about your business, so that this will help you to worship and obey Him"),
      difficulty: 3,
      questions: [
        { q: "What is the shade, per Qatadah?", a: "Trees", wrong: ["Clouds", "Walls", "Tents"], why: "Qatadah said: This means trees." },
        { q: "What do garments protect from, in 16:81?", a: "The heat", wrong: ["The stars", "The birds", "The sea"], why: "And He has made garments for you to protect you from the heat." },
        { q: "Why does Allah perfect His favor, in 16:81?", a: "That you may submit to Him", wrong: ["That you may boast", "That you may rest", "That you may sell"], why: "Thus does He perfect His favor for you, that you may submit yourselves to His will." }
      ]
    },
    {
      slug: "only-to-convey",
      title: "Only to convey",
      line: "The Messenger ﷺ only has to deliver the Message clearly.",
      facts: ["Do not worry if they turn away", "They know the blessings yet deny"],
      quote: q16(82),
      source: ik(82, "If people turn away after the reminder, the Prophet ﷺ should not worry about them: his duty is only to convey the Message clearly, and he has delivered it.", "do not worry about them"),
      difficulty: 3,
      questions: [
        { q: "What is the duty of the Messenger ﷺ, in 16:82?", a: "To convey clearly", wrong: ["To force people", "To punish", "To collect wealth"], why: "Your duty (O Muhammad) is only to convey (the Message) in a clear way." },
        { q: "What do many do with Allah's grace, in 16:83?", a: "Recognize it, yet deny it", wrong: ["Thank Him daily", "Never notice it", "Give it away"], why: "They recognize the grace of Allah, yet they deny it." },
        { q: "How do they deny the blessings, per Ibn Kathir?", a: "Worshipping others", wrong: ["Losing them", "Selling them", "Hiding them"], why: "They still deny this by worshipping others besides Him." }
      ]
    },
    {
      slug: "no-excuse-that-day",
      title: "No excuse that Day",
      line: "A witness rises from each nation; deniers get no excuse.",
      facts: ["Each Prophet testifies", "No return to repent"],
      quote: q16(84),
      source: ik(84, "On the Day of Resurrection Allah raises a witness from every nation, its Prophet, and the deniers are not allowed to offer excuses or go back to repent.", "He will raise a witness from every nation - that is - their Prophet"),
      difficulty: 3,
      questions: [
        { q: "Who is the witness from each nation, per Ibn Kathir?", a: "Their Prophet", wrong: ["Their king", "Their poet", "Their neighbor"], why: "He will raise a witness from every nation - that is - their Prophet." },
        { q: "What are the deniers not given, in 16:84?", a: "Leave to make excuses", wrong: ["Water", "Light", "Shade"], why: "Then those who disbelieve will not be given leave." },
        { tf: false, q: "In 16:84, deniers may return to the world to repent.", why: "Nor will they be allowed to return to the world to repent." }
      ]
    },
    {
      slug: "no-respite",
      title: "No delay",
      line: "When the wrongdoers see the punishment, it is not delayed.",
      facts: ["Repent now, not later", "Today the door is open"],
      quote: q16(85),
      source: ik(85, "Once the wrongdoers see the punishment, it is not lessened even for a moment, nor delayed, so the time to repent is now.", "it will not be reduced for them even for a moment"),
      difficulty: 4,
      questions: [
        { q: "Will the punishment be delayed, in 16:85?", a: "No", wrong: ["Yes, a year", "Yes, a day", "If they ask"], why: "Nor will they be given respite." },
        { q: "Will it be reduced, per Ibn Kathir?", a: "Not even for a moment", wrong: ["By half", "On Fridays", "At night"], why: "It will not be reduced for them even for a moment." },
        { tf: true, q: "The lesson of 16:85 is to repent before that Day.", why: "Nor will they be allowed to return to the world to repent." }
      ]
    },
    {
      slug: "idols-disown-them",
      title: "Their idols disown them",
      line: "The false gods call their worshippers liars on that Day.",
      facts: ["False gods cannot help", "Worship Allah alone"],
      quote: q16(86),
      source: ik(86, "On that Day the idols turn against those who worshipped them and call them liars, just when they need them most.", "their gods will disown them when they need them most"),
      difficulty: 4,
      questions: [
        { q: "What do the false gods say, in 16:86?", a: "You indeed are liars", wrong: ["Welcome", "We will help", "Follow us"], why: "But they will throw back their statement at them: You indeed are liars!" },
        { q: "When do the idols disown them, per Ibn Kathir?", a: "When they need them most", wrong: ["Never", "In childhood", "At a wedding"], why: "Their gods will disown them when they need them most." },
        { q: "Whom did the idol worshippers call upon, in 16:86?", a: "Partners besides Allah", wrong: ["Allah alone", "The Prophets", "No one"], why: "These are our partners whom we used to call upon besides you." }
      ]
    },
    {
      slug: "all-submit",
      title: "All submit that Day",
      line: "On that Day everyone submits to Allah, and lies vanish.",
      facts: ["Everyone hears and obeys", "Inventions disappear"],
      quote: q16(87),
      source: ik(87, "On that Day all will humble themselves and surrender to Allah, and every false thing they invented will vanish, leaving them no helper.", "they will all surrender to Allah, there will not be anyone who does not hear and obey"),
      difficulty: 4,
      questions: [
        { q: "What will everyone offer, in 16:87?", a: "Full submission to Allah", wrong: ["Gold", "Excuses", "Their idols"], why: "And they will offer their full submission to Allah on that Day." },
        { q: "What happens to their inventions, in 16:87?", a: "They wander away", wrong: ["They grow", "They help", "They speak"], why: "And what they falsely invented will wander away from them." },
        { q: "Will anyone refuse to obey, per Ibn Kathir?", a: "No one", wrong: ["Many will", "Kings will", "Half will"], why: "There will not be anyone who does not hear and obey." }
      ]
    },
    {
      slug: "misleading-others",
      title: "Misleading others",
      line: "Those who block others from Allah's path carry a double burden.",
      facts: ["Guide others to good", "Levels differ by deeds"],
      quote: q16(88),
      source: ik(88, "Those who disbelieved and also turned people away from Allah's path get one punishment for their disbelief and another for misleading others. Levels differ by deeds.", "one punishment for their disbelief and another punishment for turning others away from following the truth"),
      difficulty: 5,
      questions: [
        { q: "What did they do besides disbelieve, in 16:88?", a: "Obstruct Allah's path", wrong: ["Feed the poor", "Build mosques", "Teach Quran"], why: "Those who disbelieved and tried to obstruct the path of Allah." },
        { q: "Why is there a second punishment, per Ibn Kathir?", a: "For turning others away", wrong: ["For being poor", "For being sick", "For traveling"], why: "Another punishment for turning others away from following the truth." },
        { tf: true, q: "Ibn Kathir says levels differ, as Paradise has degrees.", why: "Just as there will be varying degrees of Paradise for the believers." }
      ]
    },
    {
      slug: "a-witness-from-each-nation",
      title: "A witness from each nation",
      line: "Each Prophet will be a witness for his nation.",
      facts: ["Muhammad ﷺ is witness for his Ummah", "A great honor from Allah"],
      quote: q16(89),
      source: ik(89, "On that Day Allah will bring a witness from every nation, their own Prophet, and bring Muhammad ﷺ as witness over his Ummah, a great honor and high position from Allah.", "the great honor and high position that Allah has bestowed upon you"),
      difficulty: 4,
      questions: [
        { q: "Who is raised from each nation, in 16:89?", a: "A witness from among themselves", wrong: ["A king", "A stranger", "An animal"], why: "And on the Day when We resurrect a witness from each nation from among themselves." },
        { q: "Who is the witness over the Ummah, in 16:89?", a: "Muhammad ﷺ", wrong: ["Musa", "Isa", "Ibrahim"], why: "And We bring you (O Muhammad) as a witness against these." },
        { q: "What does being a witness show for the Prophet ﷺ, per Ibn Kathir?", a: "Great honor and high position", wrong: ["Weakness", "Blame", "Nothing"], why: "The great honor and high position that Allah has bestowed upon you." }
      ]
    },
    {
      slug: "recite-to-me",
      title: "Recite to me",
      line: "Ibn Masud recited, and the Prophet ﷺ had tears in his eyes.",
      facts: ["He liked to hear the Quran", "He said: Enough for now"],
      quote: q16(89),
      source: hadith("bukhari", "5050", "Abdullah ibn Mas'ud", "Sahih", "Ibn Kathir mentions this on 16:89: Ibn Masud recited An-Nisa to the Prophet ﷺ, and at the ayah of a witness from each nation he said, Enough for the present, with eyes full of tears.", "Enough for the present"),
      difficulty: 4,
      questions: [
        { q: "What did the Prophet ﷺ ask Ibn Masud, in the hadith?", a: "Recite the Quran to me", wrong: ["Bring me water", "Go to Makkah", "Write a letter"], why: "The Prophet ﷺ said to me, Recite (the Qur'an) to me." },
        { q: "Which surah did Ibn Masud recite, in the hadith?", a: "An-Nisa", wrong: ["Al-Fatihah", "Yasin", "Al-Mulk"], why: "So I recited Surat-An-Nisa' (The Women)." },
        { q: "What did Ibn Masud see, in the hadith?", a: "Eyes overflowing with tears", wrong: ["A smile", "Him asleep", "Him leaving"], why: "I looked at him and behold! His eyes were overflowing with tears." }
      ]
    },
    {
      slug: "an-explanation-of-everything",
      title: "An explanation of everything",
      line: "The Quran explains everything, with mercy and good news.",
      facts: ["Past, future, lawful, unlawful", "Explained with the Sunnah"],
      quote: q16(89),
      source: ik(89, "The Quran contains all beneficial knowledge: news of the past and future, the lawful and unlawful, and what people need for their religion and this life. Al-Awzai said it is explained with the Sunnah.", "what is lawful and unlawful, and what people need to know about their worldly affairs"),
      difficulty: 4,
      questions: [
        { q: "What is the Book an explanation of, in 16:89?", a: "Everything", wrong: ["Only stories", "Only stars", "Only trade"], why: "And We have revealed the Book (the Qur'an) to you as an explanation of everything." },
        { q: "Which of these is in the Quran, per Ibn Kathir?", a: "What is lawful and unlawful", wrong: ["Football scores", "Star signs", "Secret codes"], why: "Information about what is yet to come, what is lawful and unlawful." },
        { q: "With what is the Book explained, per Al-Awzai?", a: "The Sunnah", wrong: ["Poetry", "Dreams", "Guesswork"], why: "As an explanation of everything,) meaning, with the Sunnah." },
        { q: "Whom is the good news for, in 16:89?", a: "The Muslims", wrong: ["No one", "Only kings", "Only angels"], why: "A guidance, a mercy, and good news for the Muslims." }
      ]
    }
  ]
};

/** Ayahs 90 to 105: justice and kindness, keeping promises, a good life, seeking refuge, and the clear Arabic Quran. */
const NAHL_SIX: DeepUnit = {
  key: "nahl6",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-16",
  name: "An-Nahl, ayahs 90 to 105",
  kind: "skill",
  lessonType: "surah",
  surahName: "An-Nahl",
  lessons: [
    {
      slug: "justice-and-kindness",
      title: "Justice and kindness",
      line: "Allah orders justice, kindness and giving to relatives.",
      facts: ["Be fair and moderate", "Keep the ties of kinship"],
      quote: q16(90),
      source: ik(90, "Allah commands His servants to be just, fair and moderate, encourages kindness and good treatment, and commands us to uphold the ties of kinship.", "He commands His servant to be just"),
      difficulty: 3,
      questions: [
        { q: "What three things does Allah order, in 16:90?", a: "Justice, kindness, giving to relatives", wrong: ["Wealth, fame, power", "Sleep, food, rest", "Travel, trade, play"], why: "Verily, Allah orders justice and kindness, and giving (help) to the relatives." },
        { q: "What does being just mean, per Ibn Kathir?", a: "Fair and moderate", wrong: ["Rich and strong", "Loud and fast", "Quiet and shy"], why: "He commands His servant to be just, fair and moderate." },
        { q: "What does giving to relatives mean, per Ibn Kathir?", a: "Upholding ties of kinship", wrong: ["Giving them orders", "Avoiding them", "Selling to them"], why: "Allah is commanding us to uphold the ties of kinship." }
      ]
    },
    {
      slug: "what-allah-forbids",
      title: "What Allah forbids",
      line: "Allah forbids shameful sins, evil and aggression.",
      facts: ["Ibn Masud: the most complete ayah", "He admonishes so we take heed"],
      quote: q16(90),
      source: ik(90, "Allah forbids Fahsha, all forbidden things; Munkar, wrong done openly; and Baghy, aggression towards people. Ibn Masud called 16:90 the most comprehensive ayah in the Quran.", "Baghy refers to aggression towards people"),
      difficulty: 4,
      questions: [
        { q: "What does Allah forbid, in 16:90?", a: "Immoral sins, evil, tyranny", wrong: ["Rest and food", "Trade and travel", "Smiling"], why: "And He forbids immoral sins, and evil and tyranny." },
        { q: "What is Baghy, per Ibn Kathir?", a: "Aggression towards people", wrong: ["Kindness", "Praying", "Learning"], why: "Baghy refers to aggression towards people." },
        { q: "What did Ibn Masud call 16:90?", a: "The most comprehensive ayah", wrong: ["The shortest ayah", "The first ayah", "The last ayah"], why: "The most comprehensive Ayah in the Qur'an is in Surat An-Nahl." },
        { q: "Why does Allah admonish us, in 16:90?", a: "So that we may take heed", wrong: ["To scare us", "To tire us", "To test machines"], why: "He admonishes you, so that perhaps you may take heed." }
      ]
    },
    {
      slug: "keep-your-promises",
      title: "Keep your promises",
      line: "Fulfil your promises; Allah is your witness to them.",
      facts: ["Do not break confirmed oaths", "Allah knows what you do"],
      quote: q16(91),
      source: ik(91, "One of Allah's commands is to fulfil covenants, keep promises and fulfil oaths after confirming them, because you have made Allah your guarantor.", "to fulfill covenants, keep promises and to fulfill oaths after confirming them"),
      difficulty: 3,
      questions: [
        { q: "What should we fulfil, in 16:91?", a: "The covenants of Allah", wrong: ["Our wishes", "Our dreams", "Our games"], why: "And fulfill the covenants (taken in the Name of) Allah when you have taken them." },
        { q: "Whom have you made your guarantor, in 16:91?", a: "Allah", wrong: ["A friend", "A judge", "No one"], why: "And indeed you have appointed Allah as your guarantor." },
        { q: "Keeping promises is one of Allah's commands, per Ibn Kathir.", tf: true, why: "This is one of the commands of Allah, to fulfill covenants, keep promises." }
      ]
    },
    {
      slug: "the-undone-thread",
      title: "Do not undo your thread",
      line: "Breaking a promise is like undoing thread you spun strong.",
      facts: ["Do not cheat with oaths", "Do not switch to the stronger side"],
      quote: q16(92),
      source: ik(92, "Mujahid, Qatadah and Ibn Zayd said the one who undoes her strong thread is like one who breaks a covenant after confirming it. Using oaths to trick people is forbidden.", "This is like the one who breaks a covenant after confirming it"),
      difficulty: 4,
      questions: [
        { q: "What does the woman do with her thread, in 16:92?", a: "Undoes it after it is strong", wrong: ["Sells it", "Gives it away", "Loses it"], why: "Do not be like the one who undoes the thread which she has spun, after it has become strong." },
        { q: "What is the undone thread like, per Mujahid?", a: "Breaking a covenant", wrong: ["Losing money", "Forgetting a name", "A long journey"], why: "This is like the one who breaks a covenant after confirming it." },
        { q: "What did some do with alliances, per Mujahid?", a: "Dropped them for stronger groups", wrong: ["Kept them always", "Wrote them down", "Shared them"], why: "They would cancel the alliance with the first group and make an alliance with the second who were more powerful." }
      ]
    },
    {
      slug: "what-allah-has-remains",
      title: "What Allah has remains",
      line: "What we have runs out; what is with Allah lasts forever.",
      facts: ["Do not sell oaths cheaply", "Patience brings the best reward"],
      quote: q16(96),
      source: ik(96, "Do not break an oath for a little worldly gain. What you have will come to an end, but the reward with Allah in Paradise will remain without end.", "His reward for you in Paradise will remain, without interruption or end"),
      difficulty: 3,
      questions: [
        { q: "What happens to what we have, in 16:96?", a: "It will be used up", wrong: ["It lasts forever", "It doubles", "It turns to gold"], why: "Whatever you have will be exhausted." },
        { q: "What happens to what is with Allah, in 16:96?", a: "It will remain", wrong: ["It ends", "It shrinks", "It is lost"], why: "And what is with Allah will remain." },
        { q: "How long does the reward in Paradise last, per Ibn Kathir?", a: "Without end", wrong: ["A year", "A lifetime", "A day"], why: "His reward for you in Paradise will remain, without interruption or end." },
        { q: "Whom will Allah reward for their best deeds, in 16:96?", a: "Those who are patient", wrong: ["The proud", "The lazy", "The loud"], why: "And to those who are patient, We will certainly grant them their rewards." }
      ]
    },
    {
      slug: "a-good-life",
      title: "A good life",
      line: "Man or woman, a believer who does good gets a good life.",
      facts: ["Contentment and peace", "The best reward later"],
      quote: q16(97),
      source: ik(97, "Allah promises any believer, male or female, who does righteous deeds a good life now and reward for their best deeds later. The good life includes peace in every part of life, contentment and happiness.", "The good life includes feeling tranquillity in all aspects of life"),
      difficulty: 3,
      questions: [
        { q: "Who is promised a good life, in 16:97?", a: "Believers, male or female, doing good", wrong: ["Only men", "Only the rich", "Only kings"], why: "Whoever does righteous deeds - whether male or female - while he (or she) is a believer." },
        { q: "What did Ali say the good life is, per Ibn Kathir?", a: "Contentment", wrong: ["Wealth", "Fame", "Power"], why: "It was reported that Ali bin Abi Talib interpreted as contentment." },
        { q: "What does the good life include, per Ibn Kathir?", a: "Tranquillity in all of life", wrong: ["Never working", "Big houses", "No tests"], why: "The good life includes feeling tranquillity in all aspects of life." }
      ]
    },
    {
      slug: "content-with-what-allah-gives",
      title: "Content with Allah's gift",
      line: "Successful is the one who is content with what Allah gives.",
      facts: ["Accepting Islam", "Having enough"],
      quote: q16(97),
      source: hadith("muslim", "1054", "Abdullah ibn Amr", "Sahih", "Ibn Kathir quotes this on 16:97: successful is the one who accepted Islam, was given enough, and was made content by Allah with what He gave him.", "been made contented by Allah with what He has given him"),
      difficulty: 4,
      questions: [
        { q: "Who is successful, in the hadith?", a: "One who accepted Islam", wrong: ["One who is famous", "One who is rich", "One who is strong"], why: "He Is successful who has accepted Islam." },
        { q: "How much provision does the successful one have, in the hadith?", a: "Sufficient for his needs", wrong: ["Huge amounts", "None at all", "More than all"], why: "Who has been provided with sufficient for his want." },
        { q: "What did Allah make him feel, in the hadith?", a: "Content", wrong: ["Greedy", "Sad", "Bored"], why: "And been made contented by Allah with what He has given him." }
      ]
    },
    {
      slug: "seek-refuge-before-reciting",
      title: "Seek refuge first",
      line: "Before reciting the Quran, seek refuge with Allah from Shaytan.",
      facts: ["So you are not confused", "So you can reflect"],
      quote: q16(98),
      source: ik(98, "When we want to read the Quran we should seek refuge with Allah from the cursed Shaytan, so we do not get confused and he cannot stop us from thinking about what we read.", "they should seek refuge with Allah from the cursed Shaytan"),
      difficulty: 3,
      questions: [
        { q: "When should we seek refuge, in 16:98?", a: "When reciting the Quran", wrong: ["When eating", "When sleeping", "When running"], why: "So when you recite the Qur'an, seek refuge with Allah from Shaytan, the outcast." },
        { q: "Why seek refuge before reading, per Ibn Kathir?", a: "So we are not confused", wrong: ["To read faster", "To sound loud", "To finish early"], why: "The reason for seeking refuge with Allah before reading is that the reader should not get confused or mixed up." },
        { q: "Most scholars say refuge is sought before starting to read.", tf: true, why: "Hence the majority of scholars said that refuge should be sought with Allah before starting to read." }
      ]
    },
    {
      slug: "refuge-calms-anger",
      title: "Refuge calms anger",
      line: "Saying I seek refuge with Allah from Shaytan calms anger.",
      facts: ["Two men argued", "One word helps"],
      quote: q16(98),
      source: hadith("bukhari", "3282", "Sulayman ibn Surad", "Sahih", "Two men argued and one grew very angry. The Prophet ﷺ said he knew a word that would calm him: I seek refuge with Allah from Satan.", "then all his anger will go away"),
      difficulty: 4,
      questions: [
        { q: "What were the two men doing, in the hadith?", a: "Arguing", wrong: ["Praying", "Eating", "Sleeping"], why: "Two men abused each other and the face of one of them became red with anger." },
        { q: "What word did the Prophet ﷺ teach, in the hadith?", a: "I seek refuge with Allah from Satan", wrong: ["Go away", "I am right", "Say nothing"], why: "If he says: I seek Refuge with Allah from Satan." },
        { q: "What would happen if he said it, in the hadith?", a: "His anger would go away", wrong: ["He would win", "He would cry", "Nothing"], why: "Then all his anger will go away." },
        { q: "Who narrated the anger hadith?", a: "Sulayman ibn Surad", wrong: ["Abu Hurairah", "Anas", "Aishah"], why: "Narrated Sulaiman bin Surad." }
      ]
    },
    {
      slug: "no-power-over-believers",
      title: "No power over believers",
      line: "Shaytan has no power over those who trust their Lord.",
      facts: ["Only over those who follow him", "Trust Allah alone"],
      quote: q16(99),
      source: ik(99, "Shaytan has no power over those who believe and put their trust in Allah. Ath-Thawri said he cannot make them commit a sin they will not repent from. His power is only over those who obey him.", "He has no power to make them commit a sin they will not repent from"),
      difficulty: 4,
      questions: [
        { q: "Over whom has Shaytan no power, in 16:99?", a: "Believers who trust their Lord", wrong: ["Everyone", "No one", "Only kings"], why: "Verily, he has no power over those who believe and put their trust only in their Lord." },
        { q: "What can Shaytan not make believers do, per Ath-Thawri?", a: "A sin they never repent from", wrong: ["Eat food", "Sleep", "Walk"], why: "He has no power to make them commit a sin they will not repent from." },
        { q: "Over whom is his power, in 16:100?", a: "Those who obey and follow him", wrong: ["The angels", "The Prophets", "The patient"], why: "His power is only over those who obey and follow him (Shaytan)." }
      ]
    },
    {
      slug: "allah-knows-what-he-reveals",
      title: "Allah knows what He reveals",
      line: "When a ruling was replaced, deniers cried forgery; Allah knows.",
      facts: ["Allah rules as He wills", "Believe in all of it"],
      quote: q16(101),
      source: ik(101, "When some rulings were replaced by others, the deniers called the Prophet a forger. But Allah does whatever He wills and rules as He wants, and He knows best what He reveals.", "But Allah is the Lord Who does whatever He wills, and rules as He wants"),
      difficulty: 4,
      questions: [
        { q: "Who knows best what is revealed, in 16:101?", a: "Allah", wrong: ["The poets", "The deniers", "The kings"], why: "And Allah knows best what He reveals." },
        { q: "What did the deniers call him, in 16:101?", a: "A forger", wrong: ["A king", "A poet", "A merchant"], why: "They say: You are but a forger." },
        { q: "How does Allah rule, per Ibn Kathir?", a: "As He wants", wrong: ["By vote", "By chance", "As people wish"], why: "But Allah is the Lord Who does whatever He wills, and rules as He wants." }
      ]
    },
    {
      slug: "the-holy-spirit-brought-it",
      title: "Jibril brought it down",
      line: "Jibril brought the Quran down from Allah with truth.",
      facts: ["It makes believers firm", "Guidance and good news"],
      quote: q16(102),
      source: ik(102, "Ruh-ul-Qudus is Jibril, who brought the Quran from Allah with truth and justice, to make believers firm, and as a guide and good news for the Muslims.", "He has made it a guide and good news to the Muslims who believe in Allah and His Messengers"),
      difficulty: 3,
      questions: [
        { q: "Who is Ruh-ul-Qudus, per Ibn Kathir?", a: "Jibril", wrong: ["Mikail", "Israfil", "A Prophet"], why: "Say: Ruh-ul-Qudus has brought it...) meaning, Jibril." },
        { q: "How did he bring it, in 16:102?", a: "With truth", wrong: ["With doubt", "In secret", "With music"], why: "Ruh-ul-Qudus has brought it (the Qur'an) down from your Lord with truth." },
        { q: "Whom is the Quran good news for, in 16:102?", a: "The Muslims", wrong: ["No one", "The proud", "Only angels"], why: "And as a guide and good news for the Muslims." }
      ]
    },
    {
      slug: "a-clear-arabic-tongue",
      title: "A clear Arabic tongue",
      line: "The Quran is clear Arabic; no foreigner could have taught it.",
      facts: ["Its style is eloquent", "Its meanings are perfect"],
      quote: q16(103),
      source: ik(103, "The idolaters claimed a foreign servant taught the Prophet ﷺ, but that man hardly spoke Arabic. The Quran, with its eloquent style and perfect meanings, could never come from him.", "which is more perfect than any Book revealed to any previously sent Prophet"),
      difficulty: 4,
      questions: [
        { q: "What did the idolaters claim, in 16:103?", a: "A man teaches him", wrong: ["An angel lied", "He wrote poems", "He read books"], why: "It is only a human being who teaches him." },
        { q: "What language is the Quran, in 16:103?", a: "Clear Arabic", wrong: ["Persian", "Greek", "Hebrew"], why: "While this (the Qur'an) is (in) a clear Arabic tongue." },
        { q: "How well did the man they named speak Arabic, per Ibn Kathir?", a: "Hardly at all", wrong: ["Perfectly", "Like a poet", "Better than all"], why: "He was a foreigner who did not know much Arabic, only enough simple phrases." }
      ]
    },
    {
      slug: "al-amin-the-trustworthy",
      title: "Al-Amin, the Trustworthy",
      line: "His people called the Prophet ﷺ Al-Amin, the Trustworthy.",
      facts: ["He was never a liar", "Liars are those who reject"],
      quote: q16(105),
      source: ik(105, "The Prophet ﷺ was the most honest and righteous of people. He was so well known for truthfulness that his people always called him Al-Amin, the Trustworthy.", "they always addressed him as Al-Amin"),
      difficulty: 3,
      questions: [
        { q: "Who fabricate falsehood, in 16:105?", a: "Those who reject Allah's Ayat", wrong: ["The believers", "The Prophets", "The angels"], why: "It is only those who do not believe in Allah's Ayat who fabricate the falsehood." },
        { q: "What did his people call the Prophet ﷺ, per Ibn Kathir?", a: "Al-Amin", wrong: ["Al-Malik", "Al-Qawi", "Al-Ghani"], why: "They always addressed him as Al-Amin (the Trustworthy)." },
        { q: "What does Al-Amin mean?", a: "The Trustworthy", wrong: ["The Strong", "The Rich", "The Tall"], why: "They always addressed him as Al-Amin (the Trustworthy)." }
      ]
    }
  ]
};

/** Ayahs 110 to 128: every soul pleads for itself, lawful food, Ibrahim, Friday, wise invitation and patience. */
const NAHL_SEVEN: DeepUnit = {
  key: "nahl7",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-16",
  name: "An-Nahl, ayahs 110 to 128",
  kind: "skill",
  lessonType: "surah",
  surahName: "An-Nahl",
  lessons: [
    {
      slug: "forced-heart-firm",
      title: "Forced, but the heart stays firm",
      line: "One forced to deny, his heart firm in faith, is excused.",
      facts: ["The heart is what counts", "Allah knows what is inside"],
      quote: q16(106),
      source: ik(106, "Whoever is forced by beatings to say words of disbelief, while his heart refuses them and stays at peace with faith, is excused by Allah.", "but his heart refuses to accept what he is saying"),
      difficulty: 4,
      questions: [
        { q: "Who is excused, in 16:106?", a: "One forced, his heart firm in faith", wrong: ["One who chose it freely", "One who joked", "One who forgot"], why: "Except one who was forced while his heart is at peace with the faith." },
        { q: "What matters most in this case, per Ibn Kathir?", a: "What his heart accepts", wrong: ["His clothes", "His tribe", "His wealth"], why: "But his heart refuses to accept what he is saying." },
        { tf: false, q: "In 16:106, choosing disbelief freely is excused.", why: "But whoever opens their breasts to disbelief, on them is wrath from Allah." }
      ]
    },
    {
      slug: "bilal-alone-alone",
      title: "Bilal stood firm",
      line: "Under harsh pressure, Bilal kept saying: Alone, Alone.",
      facts: ["Steadfastness is better", "Faith over comfort"],
      quote: q16(106),
      source: ik(106, "Scholars agreed one forced may go along to save himself, or refuse. Bilal refused under harsh torment, saying, Alone, Alone. Remaining steadfast is better.", "It is better and preferable for the Muslim to remain steadfast in his religion"),
      difficulty: 5,
      questions: [
        { q: "What did Bilal keep saying?", a: "Alone, Alone", wrong: ["Help me", "I give up", "Let me go"], why: "He refused, saying, Alone, Alone." },
        { q: "What is better, per Ibn Kathir?", a: "To remain steadfast", wrong: ["To give in", "To run away", "To stay silent"], why: "It is better and preferable for the Muslim to remain steadfast in his religion." },
        { tf: true, q: "Scholars agree one forced may go along to save himself.", why: "It is permissible for him to either go along with them in the interests of self-preservation, or to refuse." }
      ]
    },
    {
      slug: "this-world-over-the-next",
      title: "Choosing this world",
      line: "They left faith because they loved this world over the next.",
      facts: ["The Hereafter is lasting", "This world is passing"],
      quote: q16(107),
      source: ik(107, "Those who left the faith willingly did so because they preferred this life to the Hereafter, so Allah did not guide their hearts.", "because they preferred this life to the Hereafter"),
      difficulty: 4,
      questions: [
        { q: "What did they prefer, in 16:107?", a: "This world's life", wrong: ["The Hereafter", "Prayer", "Charity"], why: "That is because they preferred the life of this world over that of the Hereafter." },
        { q: "Whom does Allah not guide, in 16:107?", a: "Those who disbelieve", wrong: ["The poor", "The young", "The travelers"], why: "And Allah does not guide the people who disbelieve." },
        { tf: true, q: "Loving this world too much can pull one from faith.", why: "Because they preferred this life to the Hereafter." }
      ]
    },
    {
      slug: "sealed-hearts",
      title: "Sealed hearts",
      line: "Their hearts, ears and eyes were sealed; they are heedless.",
      facts: ["Use your senses for good", "Ask Allah to keep your heart"],
      quote: q16(108),
      source: ik(108, "Allah put a seal on their hearts, ears and eyes, so they could not understand or benefit from them, and they became heedless.", "He put a seal on their hearts so that they would not be able to understand what is beneficial for them"),
      difficulty: 4,
      questions: [
        { q: "What three things were sealed, in 16:108?", a: "Hearts, hearing and sight", wrong: ["Hands, feet and mouth", "Homes, gates and roads", "Books, pens and paper"], why: "Upon whose hearts, hearing and sight Allah has set a seal." },
        { q: "What does the seal stop, per Ibn Kathir?", a: "Understanding what benefits them", wrong: ["Eating", "Sleeping", "Walking"], why: "So that they would not be able to understand what is beneficial for them." },
        { q: "What are they called, in 16:108?", a: "The heedless", wrong: ["The wise", "The patient", "The grateful"], why: "And they are the heedless." }
      ]
    },
    {
      slug: "the-true-losers",
      title: "The true losers",
      line: "In the Hereafter, they are surely the losers.",
      facts: ["Loss of self and family", "Real loss is in the Hereafter"],
      quote: q16(109),
      source: ik(109, "It is certain that such people will be the losers in the Hereafter, losing themselves and their families on the Day of Resurrection.", "they will lose themselves and their families on the Day of Resurrection"),
      difficulty: 3,
      questions: [
        { q: "What will they be in the Hereafter, in 16:109?", a: "The losers", wrong: ["The winners", "The leaders", "The guests"], why: "No doubt, in the Hereafter they will be the losers." },
        { q: "What will they lose, per Ibn Kathir?", a: "Themselves and their families", wrong: ["Only money", "Only a house", "Nothing"], why: "They will lose themselves and their families on the Day of Resurrection." },
        { q: "What does no doubt mean, per Ibn Kathir?", a: "It is certain", wrong: ["It is a guess", "It might be", "It is a joke"], why: "No doubt means, it is inevitable." }
      ]
    },
    {
      slug: "forgiven-after-hardship",
      title: "Forgiven after hardship",
      line: "Those who slipped, then strove with patience, are forgiven.",
      facts: ["Allah is Most Merciful", "Patience after a slip"],
      quote: q16(110),
      source: ik(110, "Some weak believers in Makkah gave in under pressure, then escaped by migrating, struggled and stayed patient. Allah forgives them and shows them mercy.", "He will forgive them and show mercy to them when they are resurrected"),
      difficulty: 4,
      questions: [
        { q: "What did they do after their trial, in 16:110?", a: "Migrated, strove and were patient", wrong: ["Gave up", "Went back to idols", "Hid forever"], why: "For those who emigrated after they were put to trials and then performed Jihad, and were patient." },
        { q: "How does Allah treat them, in 16:110?", a: "Forgiving, Most Merciful", wrong: ["Harshly", "He forgets them", "He ignores them"], why: "Your Lord is indeed Forgiving, Most Merciful." },
        { q: "What did they leave behind, per Ibn Kathir?", a: "Homeland, families and wealth", wrong: ["Only shoes", "Nothing", "Their faith"], why: "Leaving their homeland, families and wealth behind." }
      ]
    },
    {
      slug: "every-soul-pleads-for-itself",
      title: "Every soul for itself",
      line: "On that Day each person pleads for himself alone.",
      facts: ["No one else pleads for him", "No one is wronged"],
      quote: q16(111),
      source: ik(111, "On that Day every person will make his own case. No one else will plead for him, not his father, son, brother or wife, and everyone is paid in full without any injustice.", "no one else will plead on his behalf"),
      difficulty: 3,
      questions: [
        { q: "For whom does each person plead, in 16:111?", a: "Himself", wrong: ["His friends", "His tribe", "His king"], why: "The Day when every person will come pleading for himself." },
        { q: "Who else will plead for him, per Ibn Kathir?", a: "No one", wrong: ["His father", "His brother", "His wife"], why: "No one else will plead on his behalf; not his father, not his son, nor his brother, nor his wife." },
        { q: "Will anyone be dealt with unjustly, in 16:111?", tf: false, why: "And every one will be paid in full for what he did, and they will not be dealt with unjustly." }
      ]
    },
    {
      slug: "the-secure-town",
      title: "The secure town",
      line: "Makkah was safe and full of provision, yet it was ungrateful.",
      facts: ["Whoever entered was safe", "Ingratitude changed it"],
      quote: q16(112),
      source: ik(112, "The example is of Makkah: secure and peaceful, a sanctuary where whoever entered was safe, with provision coming from every place. Its people denied the favors of Allah.", "Whoever entered Makkah, he was safe"),
      difficulty: 3,
      questions: [
        { q: "Which town is the example, per Ibn Kathir?", a: "Makkah", wrong: ["Madinah", "Damascus", "Cairo"], why: "This example refers to the people of Makkah." },
        { q: "How did provision come to it, in 16:112?", a: "In abundance from every place", wrong: ["Rarely", "From one well", "Never"], why: "Its provision coming to it in abundance from every place." },
        { q: "Who was safe in Makkah, per Ibn Kathir?", a: "Whoever entered it", wrong: ["No one", "Only kings", "Only traders"], why: "Whoever entered Makkah, he was safe." },
        { q: "What did its people do with Allah's favors, in 16:112?", a: "Denied them", wrong: ["Thanked Him", "Shared them", "Counted them"], why: "But it (its people) denied the favors of Allah." }
      ]
    },
    {
      slug: "the-greatest-favor",
      title: "The greatest favor",
      line: "The greatest blessing on Makkah was the Messenger ﷺ sent to it.",
      facts: ["A Messenger from themselves", "Believers became secure"],
      quote: q16(113),
      source: ik(113, "The greatest blessing Allah gave the people of Makkah was sending them a Messenger from among themselves. After the believers lived in fear, Allah gave them security and plenty.", "After the believers lived in fear, Allah granted them security"),
      difficulty: 4,
      questions: [
        { q: "Whom did Allah send them, in 16:113?", a: "A Messenger from themselves", wrong: ["A king", "A stranger", "An army"], why: "There has come to them a Messenger from among themselves." },
        { q: "What was their greatest blessing, per Ibn Kathir?", a: "The Messenger ﷺ sent to them", wrong: ["Their markets", "Their camels", "Their poems"], why: "The greatest of which was Muhammad being sent to them." },
        { q: "What did Allah give the believers after fear, per Ibn Kathir?", a: "Security", wrong: ["More fear", "Nothing", "Hunger"], why: "After the believers lived in fear, Allah granted them security." }
      ]
    },
    {
      slug: "eat-lawful-and-be-grateful",
      title: "Eat good food, give thanks",
      line: "Eat the lawful, good food Allah gives, and thank Him.",
      facts: ["He is the Giver of all favors", "He alone deserves worship"],
      quote: q16(114),
      source: ik(114, "Allah orders the believers to eat the good and lawful things He has provided and to thank Him, for He is the Giver of all favors and alone deserves worship.", "to eat the good and lawful things that He has provided, and to give thanks to Him for that"),
      difficulty: 3,
      questions: [
        { q: "What should we eat, in 16:114?", a: "Lawful and good food", wrong: ["Anything at all", "Only meat", "Only sweets"], why: "So eat of the lawful and good food which Allah has provided for you." },
        { q: "What should we be for Allah's favor, in 16:114?", a: "Grateful", wrong: ["Proud", "Silent", "Bored"], why: "And be grateful for Allah's favor, if it is He Whom you worship." },
        { q: "Why thank Allah for food, per Ibn Kathir?", a: "He is the Giver of all favors", wrong: ["It is cheap", "It is a habit", "Others told us"], why: "For He is the Giver and Originator of all favors." }
      ]
    },
    {
      slug: "the-forbidden-foods",
      title: "The forbidden foods",
      line: "Only a few foods are forbidden, and need makes it easy.",
      facts: ["Dead meat, blood, pork", "Allah is Pardoning, Merciful"],
      quote: q16(115),
      source: ik(115, "Allah forbade things that harm people in religion and in this life: dead meat, blood, the flesh of pigs, and what is offered to other than Allah. One forced by need is forgiven.", "dead meat, blood and the flesh of pigs"),
      difficulty: 3,
      questions: [
        { q: "Which of these is forbidden, in 16:115?", a: "The flesh of swine", wrong: ["Dates", "Milk", "Honey"], why: "He has only forbidden dead flesh, blood, the flesh of swine." },
        { q: "Why were these foods forbidden, per Ibn Kathir?", a: "They harm us", wrong: ["They cost a lot", "They taste bad", "No reason"], why: "Allah mentions what He has forbidden things which harm them in both religious and worldly affairs." },
        { q: "What about one forced by need, in 16:115?", a: "Allah is Pardoning, Merciful", wrong: ["He is never forgiven", "He must pay", "He must leave"], why: "But if one is forced by necessity, without willful disobedience, nor transgressing, then, Allah is Pardoning, Most Merciful." }
      ]
    },
    {
      slug: "do-not-make-up-rules",
      title: "Do not make up rules",
      line: "Never call something halal or haram without Allah's word.",
      facts: ["That is lying about Allah", "Liars never succeed"],
      quote: q16(116),
      source: ik(116, "This includes anyone who invents something new in religion without evidence, or calls lawful what Allah forbade, or forbids what Allah allowed, just because it suits their opinion.", "whoever declares something unlawful that Allah has permitted"),
      difficulty: 4,
      questions: [
        { q: "What should we not say with our tongues, in 16:116?", a: "This is lawful, this is forbidden", wrong: ["Thank you", "Peace be on you", "Allah is Great"], why: "Saying: This is lawful and this is forbidden, to invent lies against Allah." },
        { q: "Will those who invent lies against Allah succeed, in 16:116?", tf: false, why: "Verily, those who invent lies against Allah, will never succeed." },
        { q: "Who else is included, per Ibn Kathir?", a: "One who forbids what Allah allowed", wrong: ["One who prays", "One who studies", "One who gives"], why: "Whoever declares something unlawful that Allah has permitted, only because it suits his opinions." }
      ]
    },
    {
      slug: "a-brief-enjoyment",
      title: "A brief enjoyment",
      line: "Those who lie about Allah get brief joy, then a painful end.",
      facts: ["Do not invent rules", "This world is short"],
      quote: q16(117),
      source: ik(117, "Those who invent lies about Allah, making things lawful or forbidden by whim, never succeed. In this world they have passing pleasure, then severe punishment.", "As for this world, it is transient pleasure"),
      difficulty: 4,
      questions: [
        { q: "What do they get in this world, in 16:117?", a: "A brief enjoyment", wrong: ["Eternal joy", "Nothing", "Endless wealth"], why: "A passing brief enjoyment will be theirs." },
        { q: "Will liars against Allah succeed, in 16:116?", a: "Never", wrong: ["Always", "Sometimes", "If rich"], why: "Verily, those who invent lies against Allah, will never succeed." },
        { q: "What is this world for them, per Ibn Kathir?", a: "Transient pleasure", wrong: ["A lasting home", "A prison", "A palace"], why: "As for this world, it is transient pleasure." }
      ]
    },
    {
      slug: "we-did-not-wrong-them",
      title: "We did not wrong them",
      line: "Some foods were forbidden to the Jews; Allah did not wrong them.",
      facts: ["Allah desires ease for us", "Allah wrongs no one"],
      quote: q16(118),
      source: ik(118, "Allah made things easy for this Ummah. He mentions the foods He forbade the Jews before, as told in Al-An'am, and says He did not wrong them in these limits.", "meaning, in the restrictions that We imposed upon them"),
      difficulty: 4,
      questions: [
        { q: "Did Allah wrong them, in 16:118?", a: "No", wrong: ["Yes", "A little", "Only once"], why: "And We did not wrong them, but they wronged themselves." },
        { q: "What does Allah desire for this Ummah, per Ibn Kathir?", a: "Ease, not hardship", wrong: ["Hardship", "Hunger", "Fear"], why: "Because Allah desires ease for us, not hardship." },
        { q: "Which surah first lists these foods, per Ibn Kathir?", a: "Surah Al-An'am", wrong: ["Surah Yusuf", "Surah Maryam", "Surah Hud"], why: "Meaning in Surat Al-An'am." }
      ]
    },
    {
      slug: "the-door-of-repentance",
      title: "The door of repentance",
      line: "Whoever sins, then repents and does good, finds Allah merciful.",
      facts: ["Give up the sin", "Turn to obedience"],
      quote: q16(119),
      source: ik(119, "Whoever does wrong out of ignorance, then repents and does good, Allah accepts their repentance. They give up the sins and turn to obeying Allah, and He is Pardoning, Most Merciful.", "they give up the sins they used to commit and turn to doing acts of obedience to Allah"),
      difficulty: 3,
      questions: [
        { q: "What must those who did evil do, in 16:119?", a: "Repent and do good", wrong: ["Hide forever", "Give up hope", "Blame others"], why: "And afterward repent and do righteous deeds." },
        { q: "What does repenting mean, per Ibn Kathir?", a: "Give up sins, turn to obedience", wrong: ["Say sorry only", "Travel far", "Stay silent"], why: "They give up the sins they used to commit and turn to doing acts of obedience to Allah." },
        { q: "How does 16:119 describe your Lord?", a: "Pardoning, Most Merciful", wrong: ["Harsh", "Far away", "Silent"], why: "Verily, after that, your Lord is Pardoning, Most Merciful." }
      ]
    },
    {
      slug: "ibrahim-was-an-ummah",
      title: "Ibrahim was an Ummah",
      line: "Ibrahim was a leader to follow, obedient, a Hanif.",
      facts: ["Not one of the idolaters", "A nation on his own"],
      quote: q16(120),
      source: ik(120, "Ummah here means a leader who is followed. Qanit means humble and obedient, and Hanif means one who turns away from Shirk to Tawhid. Mujahid said he was a nation on his own.", "Ummah here means the leader who is followed"),
      difficulty: 4,
      questions: [
        { q: "What was Ibrahim, in 16:120?", a: "An Ummah, obedient, a Hanif", wrong: ["A king", "A poet", "A trader"], why: "Verily, Ibrahim was (himself) an Ummah, obedient to Allah, a Hanif." },
        { q: "What does Ummah mean in 16:120, per Ibn Kathir?", a: "A leader who is followed", wrong: ["A city", "A market", "A tribe"], why: "Ummah here means the leader who is followed." },
        { q: "What does Hanif mean, per Ibn Kathir?", a: "One who leaves Shirk for Tawhid", wrong: ["A traveler", "A builder", "A soldier"], why: "Hanif means one who deliberately steers clear of Shirk in favor of Tawhid." },
        { q: "What did Mujahid say Ummah means?", a: "A nation on his own", wrong: ["A small family", "A big army", "A teacher"], why: "Mujahid said: Ummah (here) means that he was a nation on his own." }
      ]
    },
    {
      slug: "ibrahim-was-thankful",
      title: "Ibrahim was thankful",
      line: "Ibrahim thanked Allah, who chose him and guided him.",
      facts: ["Good in this world", "Among the righteous later"],
      quote: q16(121),
      source: ik(121, "Ibrahim thanked Allah for His blessings. Allah chose him and guided him to worship Him alone, gave him good in this world, a truthful tongue, and he is among the righteous in the Hereafter.", "he gave thanks for the blessings that Allah gave him"),
      difficulty: 3,
      questions: [
        { q: "What was Ibrahim for Allah's favors, in 16:121?", a: "Thankful", wrong: ["Forgetful", "Proud", "Silent"], why: "(He was) thankful for His favors." },
        { q: "What did Allah do for Ibrahim, in 16:121?", a: "Chose and guided him", wrong: ["Left him", "Made him rich only", "Made him a king"], why: "He (Allah) chose him and guided him to a straight path." },
        { q: "What good did he get in this world, per Mujahid?", a: "A truthful tongue", wrong: ["Gold", "A palace", "An army"], why: "Mujahid said: This means a truthful tongue." }
      ]
    },
    {
      slug: "follow-ibrahim",
      title: "Follow the way of Ibrahim",
      line: "Allah told the Prophet ﷺ to follow the way of Ibrahim.",
      facts: ["Ibrahim was a Hanif", "Pure Tawhid"],
      quote: q16(123),
      source: ik(123, "Because of his perfection, greatness and the soundness of his Tawhid, Allah revealed to the Seal of the Messengers to follow the religion of Ibrahim, the Hanif.", "because of his perfection, greatness, and the soundness of his Tawhid and his way"),
      difficulty: 4,
      questions: [
        { q: "Whose religion should the Prophet ﷺ follow, in 16:123?", a: "Ibrahim", wrong: ["Nuh", "Adam", "Dawud"], why: "Follow the religion of Ibrahim (he was a) Hanif." },
        { q: "Why follow Ibrahim, per Ibn Kathir?", a: "His sound Tawhid", wrong: ["His wealth", "His age", "His city"], why: "Because of his perfection, greatness, and the soundness of his Tawhid and his way." },
        { q: "Was Ibrahim one of the idolaters, in 16:123?", tf: false, why: "And he was not one of the idolators." }
      ]
    },
    {
      slug: "friday-for-this-ummah",
      title: "Friday for this Ummah",
      line: "Allah gave this Ummah Friday as its day to gather.",
      facts: ["Each nation had a day", "Friday: creation completed"],
      quote: q16(124),
      source: ik(124, "For every nation Allah prescribed a day each week to gather and worship Him. For this Ummah He prescribed Friday, the day He completed His creation.", "For this Ummah He prescribed Friday"),
      difficulty: 4,
      questions: [
        { q: "What day did Allah give this Ummah, per Ibn Kathir?", a: "Friday", wrong: ["Monday", "Saturday", "Sunday"], why: "For this Ummah He prescribed Friday." },
        { q: "Why Friday, per Ibn Kathir?", a: "Allah completed creation on it", wrong: ["It is the longest", "It is the first", "It is cold"], why: "It is the sixth day, on which Allah completed and perfected His creation." },
        { q: "Did every nation get a day to gather for worship, per Ibn Kathir?", tf: true, why: "For every nation Allah prescribed one day of the week for people to gather to worship Him." }
      ]
    },
    {
      slug: "last-but-first",
      title: "Last, but first",
      line: "We came last, but we will be first on the Last Day.",
      facts: ["Allah guided us to Friday", "Others follow after us"],
      quote: q16(124),
      source: hadith("bukhari", "876", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said Muslims came last but will be foremost on the Day of Resurrection, and Allah guided us to Friday while other nations follow after us.", "So Allah gave us the guidance for it"),
      difficulty: 4,
      questions: [
        { q: "When did the Muslims come, in the hadith?", a: "Last", wrong: ["First", "In the middle", "Never"], why: "We (Muslims) are the last (to come)." },
        { q: "Where will Muslims be on the Day of Resurrection, in the hadith?", a: "Foremost", wrong: ["Last", "Forgotten", "Lost"], why: "But (will be) the foremost on the Day of Resurrection." },
        { q: "To which day did Allah guide us, in the hadith?", a: "Friday", wrong: ["Monday", "Saturday", "Sunday"], why: "So Allah gave us the guidance for it (Friday)." }
      ]
    },
    {
      slug: "invite-with-wisdom",
      title: "Invite with wisdom",
      line: "Call people to Allah with wisdom and kind, good words.",
      facts: ["Argue in the best way", "Guidance is from Allah"],
      quote: q16(125),
      source: ik(125, "Allah commands inviting people to Him with wisdom and good preaching, and if they debate, to do it with kindness, gentleness and good speech, as Musa and Harun were told to speak gently.", "with kindness, gentleness and good speech"),
      difficulty: 3,
      questions: [
        { q: "How should we invite to Allah, in 16:125?", a: "With wisdom and fair preaching", wrong: ["With shouting", "With force", "With tricks"], why: "Invite to the way of your Lord with wisdom and fair preaching." },
        { q: "How should we argue, per Ibn Kathir?", a: "With kindness and gentleness", wrong: ["Loudly", "Rudely", "Never kindly"], why: "With kindness, gentleness and good speech." },
        { q: "Who were told to speak gently to Pharaoh, per Ibn Kathir?", a: "Musa and Harun", wrong: ["Nuh and Hud", "Yusuf and Yaqub", "Isa and Yahya"], why: "Allah commanded him to speak gently, as He commanded Musa and Harun to do when he sent them to Pharaoh." },
        { q: "Is guiding people the caller's task, per Ibn Kathir?", tf: false, why: "It is not your task to guide them. You are just a warner." }
      ]
    },
    {
      slug: "patience-is-better",
      title: "Patience is better",
      line: "Patience is better, and it only comes by Allah's help.",
      facts: ["Do not grieve over them", "Do not worry about plots"],
      quote: q16(127),
      source: ik(127, "Allah commands patience and teaches that patience only comes by the will, help and power of Allah. Do not grieve or be upset by those who plot, for Allah protects and supports.", "patience cannot be acquired except by the will, help, decree and power of Allah"),
      difficulty: 4,
      questions: [
        { q: "What is better, in 16:126?", a: "Being patient", wrong: ["Being loud", "Being proud", "Being fast"], why: "But if you have patience with them, then it is better for those who are patient." },
        { q: "How does patience come, in 16:127?", a: "By the help of Allah", wrong: ["By money", "By sleep", "By luck"], why: "And be patient, and your patience will not be, but by the help of Allah." },
        { q: "What does do not be distressed mean, per Ibn Kathir?", a: "Do not be worried or upset", wrong: ["Do not eat", "Do not speak", "Do not travel"], why: "And do not be distressed) means do not be worried or upset." }
      ]
    },
    {
      slug: "allah-is-with-them",
      title: "Allah is with them",
      line: "Allah is with those who have Taqwa and do good.",
      facts: ["He supports and guides them", "The last ayah of An-Nahl"],
      quote: q16(128),
      source: ik(128, "Allah is with those who have Taqwa and do good, supporting, helping and guiding them, as He told Musa and Harun, and as the Prophet ﷺ told Abu Bakr in the cave: Allah is with us.", "He is with them in the sense of supporting them, helping them and guiding them"),
      difficulty: 4,
      questions: [
        { q: "With whom is Allah, in 16:128?", a: "Those with Taqwa who do good", wrong: ["The proud", "The lazy", "No one"], why: "Truly, Allah is with those who have Taqwa, and the doers of good." },
        { q: "How is Allah with them, per Ibn Kathir?", a: "Supporting, helping, guiding", wrong: ["Ignoring them", "Testing only", "Watching only"], why: "He is with them in the sense of supporting them, helping them and guiding them." },
        { q: "What did the Prophet ﷺ tell Abu Bakr in the cave, per Ibn Kathir?", a: "Do not worry, Allah is with us", wrong: ["Run away", "Stay quiet forever", "Go home"], why: "Do not worry, Allah is with us." },
        { q: "What do those with Taqwa do, per Ibn Kathir?", a: "Keep away from the forbidden", wrong: ["Sleep all day", "Boast", "Collect gold"], why: "Those who have Taqwa) means, they keep away from that which is forbidden." }
      ]
    }
  ]
};

export const NAHL_UNITS: readonly DeepUnit[] = [NAHL_ONE, NAHL_TWO, NAHL_THREE, NAHL_FOUR, NAHL_FIVE, NAHL_SIX, NAHL_SEVEN];
