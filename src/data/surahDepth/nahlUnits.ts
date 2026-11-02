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

export const NAHL_UNITS: readonly DeepUnit[] = [NAHL_ONE, NAHL_TWO, NAHL_THREE, NAHL_FOUR, NAHL_FIVE];
