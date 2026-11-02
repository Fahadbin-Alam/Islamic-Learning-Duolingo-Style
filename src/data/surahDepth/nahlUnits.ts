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

export const NAHL_UNITS: readonly DeepUnit[] = [NAHL_ONE, NAHL_TWO, NAHL_THREE];
