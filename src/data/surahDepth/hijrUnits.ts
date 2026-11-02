import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Al-Hijr ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Hijr 15:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_15_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Hijr 15:${ayah}`,
    url: `https://quran.com/15:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 15:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q15 = (ayah: number) => quranQuote(15, ayah);

/** Ayahs 1 to 25: the guarded Quran, the mockers of old, the guarded sky, and Allah's treasures of rain and life. */
const HIJR_ONE: DeepUnit = {
  key: "hijr1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-15",
  name: "Al-Hijr, ayahs 1 to 25",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Hijr",
  lessons: [
    {
      slug: "wish-they-were-muslims",
      title: "They will wish they were Muslims",
      line: "One day the deniers will wish they had been Muslims.",
      facts: ["A plain, clear Quran", "Regret comes too late"],
      quote: q15(2),
      source: ik(2, "The surah opens with Alif-Lam-Ra and calls the Quran plain and clear. Allah tells us the disbelievers will one day regret their disbelief and wish they had been Muslims in this world.", "they will regret having lived in disbelief, and will wish that they had been Muslims in this world"),
      difficulty: 2,
      questions: [
        { q: "How is the Quran described, in 15:1?", a: "A plain Quran", wrong: ["A secret book", "A book of poems", "A hidden scroll"], why: "These are Ayat of the Book and a plain Qur'an." },
        { q: "What will the disbelievers wish, in 15:2?", a: "That they had been Muslims", wrong: ["That they were kings", "That they were rich", "That they were poets"], why: "How much would those who disbelieved wish that they had been Muslims." },
        { q: "Per Ibn Kathir, their regret is about having lived in disbelief.", tf: true, why: "They will regret having lived in disbelief, and will wish that they had been Muslims in this world." }
      ]
    },
    {
      slug: "busy-with-false-hope",
      title: "Busy with false hope",
      line: "Let them eat and enjoy, distracted by false hope for now.",
      facts: ["Hope that keeps from repentance", "They will come to know"],
      quote: q15(3),
      source: ik(3, "Allah warns those who only eat and enjoy: their false hopes distract them from repenting and turning to Allah, and soon they will come to know.", "distracted from repentance and turning to Allah"),
      difficulty: 3,
      questions: [
        { q: "What are they left to do, in 15:3?", a: "Eat and enjoy", wrong: ["Pray and fast", "Read and learn", "Build and plant"], why: "Leave them to eat and enjoy, and let them be preoccupied with (false) hope." },
        { q: "What does false hope distract them from, per Ibn Kathir?", a: "Repentance and turning to Allah", wrong: ["Their trade", "Their games", "Their homes"], why: "Distracted from repentance and turning to Allah." },
        { q: "How does 15:3 end?", a: "They will come to know", wrong: ["They are forgiven", "They are kings", "They will sleep"], why: "They will come to know!" }
      ]
    },
    {
      slug: "a-known-term",
      title: "Every town has a known term",
      line: "No nation can bring its end forward or put it back.",
      facts: ["Proofs come first", "A warning to Makkah"],
      quote: q15(5),
      source: ik(4, "Allah never destroys a town until He has given it clear proofs and its set time has ended. No nation can move its time earlier or later. It was a warning to the people of Makkah.", "He never destroys a township until He has established evidences for it and its allotted time has ended"),
      difficulty: 3,
      questions: [
        { q: "What did every destroyed town have, in 15:4?", a: "A known decree", wrong: ["A golden wall", "A great king", "A big army"], why: "And never did We destroy a township but there was a known decree for it." },
        { q: "Can a nation delay its term, in 15:5?", a: "No, not at all", wrong: ["Yes, with gold", "Yes, by asking", "Only a little"], why: "No nation can advance its term, nor delay it." },
        { q: "What does Allah establish before a town is destroyed, per Ibn Kathir?", a: "Evidences for it", wrong: ["A new king", "A wall", "A market"], why: "He never destroys a township until He has established evidences for it and its allotted time has ended." }
      ]
    },
    {
      slug: "called-a-madman",
      title: "They called him a madman",
      line: "They called the Prophet ﷺ mad and demanded angels.",
      facts: ["For calling them from their fathers' ways", "Fir'awn asked for angels too"],
      quote: q15(6),
      source: ik(6, "The disbelievers mocked the Prophet ﷺ and called him mad, only because he invited them to follow him and leave their forefathers' ways. They demanded that he bring angels as witnesses.", "by your invitation to us to follow you and leave the way of our forefathers"),
      difficulty: 3,
      questions: [
        { q: "What did they call the Prophet ﷺ, in 15:6?", a: "A madman", wrong: ["A king", "A trader", "A farmer"], why: "Verily, you are a madman." },
        { q: "What did they ask him to bring, in 15:7?", a: "Angels", wrong: ["Gold", "Rain", "Camels"], why: "Why do you not bring angels to us if you are of the truthful?" },
        { q: "Why did they call him mad, per Ibn Kathir?", a: "He called them to leave their forefathers' way", wrong: ["He was ill", "He was poor", "He was young"], why: "By your invitation to us to follow you and leave the way of our forefathers." }
      ]
    },
    {
      slug: "angels-come-with-truth",
      title: "Angels come down with the truth",
      line: "Angels come only with the truth, and then no delay is left.",
      facts: ["With the Message or the punishment", "Seeing them is no good news"],
      quote: q15(8),
      source: ik(8, "Allah sends the angels down only with the truth. Mujahid said that means with the Message, or with the punishment, and once they come for the deniers there is no more respite.", "with the Message and the punishment"),
      difficulty: 3,
      questions: [
        { q: "With what does Allah send the angels down, in 15:8?", a: "The truth", wrong: ["Games", "Gold", "Riddles"], why: "We do not send the angels down except with the truth." },
        { q: "What would the deniers lose if angels came, in 15:8?", a: "Their respite", wrong: ["Their homes", "Their names", "Their poems"], why: "And in that case, they (the disbelievers) would have no respite!" },
        { q: "What did Mujahid say the angels come with?", a: "The Message and the punishment", wrong: ["Food and drink", "Songs", "Maps"], why: "With the Message and the punishment." }
      ]
    },
    {
      slug: "allah-guards-the-quran",
      title: "Allah guards the Quran",
      line: "Allah sent down the Quran and He Himself guards it.",
      facts: ["Never changed or altered", "A promise from Allah"],
      quote: q15(9),
      source: ik(9, "Allah is the One Who revealed the Quran, and He protects it from being changed or altered.", "He is protecting it from being changed or altered"),
      difficulty: 2,
      questions: [
        { q: "Who revealed the Dhikr, in 15:9?", a: "Allah", wrong: ["The poets", "The angels alone", "The kings"], why: "Verily, We, it is We Who revealed the Dhikr." },
        { q: "What does Allah do for the Quran, in 15:9?", a: "He guards it", wrong: ["He hides it", "He changes it", "He leaves it"], why: "And surely We will guard it (from corruption)." },
        { q: "From what is the Quran protected, per Ibn Kathir?", a: "Being changed or altered", wrong: ["Being read", "Being learned", "Being loved"], why: "He is protecting it from being changed or altered." }
      ]
    },
    {
      slug: "messengers-were-mocked",
      title: "Every Messenger was mocked",
      line: "Every Messenger before was mocked, a comfort to the Prophet ﷺ.",
      facts: ["The Quraysh were not the first", "The ancients' end is known"],
      quote: q15(11),
      source: ik(10, "Allah comforted His Messenger ﷺ: every nation before mocked its Messenger. The end of those who rejected, and the saving of the Prophets and their followers, is well known.", "for the rejection of the disbelieving Quraysh, Allah says that He has sent Messengers before him"),
      difficulty: 3,
      questions: [
        { q: "How did nations treat their Messengers, in 15:11?", a: "They mocked them", wrong: ["They crowned them", "They paid them", "They thanked them"], why: "And there never came a Messenger to them but that they mocked him." },
        { q: "Why does Allah tell of earlier Messengers, per Ibn Kathir?", a: "To console the Prophet ﷺ", wrong: ["To praise the mockers", "To fill time", "To list kings"], why: "Consoling His Messenger for the rejection of the disbelieving Quraysh." },
        { q: "What enters the hearts of the guilty, per Anas and Al-Hasan?", a: "Shirk", wrong: ["Light", "Mercy", "Peace"], why: "Anas and Al-Hasan Al-Basri said that this referred to Shirk." }
      ]
    },
    {
      slug: "a-gate-to-the-sky",
      title: "Even a gate to the sky",
      line: "Even climbing into the sky, the stubborn would not believe.",
      facts: ["They would say: we are bewitched", "Stubbornness, not lack of proof"],
      quote: q15(14),
      source: ik(14, "The stubborn deniers would not believe even if a gate to the sky were opened and they climbed through it. They would say their eyes were dazzled and they were bewitched.", "even if a door to heaven were to be opened for them, and they were to be taken up through it, they would still not believe"),
      difficulty: 4,
      questions: [
        { q: "What if a gate to the heavens opened, in 15:14?", a: "They would still deny", wrong: ["They would all believe", "They would stay there", "They would sing"], why: "And even if We opened to them a gate to the heavens and they were to continue ascending through it." },
        { q: "What would they say about their eyes, in 15:15?", a: "They were dazzled", wrong: ["They were sharp", "They were closed", "They were tired"], why: "Our eyes have been (as if) dazzled." },
        { q: "What would they call themselves, in 15:15?", a: "A people bewitched", wrong: ["A people guided", "A people of kings", "A people asleep"], why: "Nay, we are a people bewitched." }
      ]
    },
    {
      slug: "stars-guard-the-sky",
      title: "Stars that guard the sky",
      line: "Allah beautified the sky with stars and guarded it from devils.",
      facts: ["Shooting stars chase eavesdroppers", "Fortune-tellers mix in lies"],
      quote: q15(16),
      source: ik(16, "Allah adorned the sky with great stars and made shooting stars guard it against devils who try to listen to news from on high.", "to guard it against the evil devils who try to listen to information conveyed at the highest heights"),
      difficulty: 3,
      questions: [
        { q: "What did Allah put in the heaven, in 15:16?", a: "Big stars", wrong: ["Mountains", "Rivers", "Cities"], why: "And indeed, We have put the big stars in the heaven." },
        { q: "From whom is the near heaven guarded, in 15:17?", a: "Every outcast Shaytan", wrong: ["Birds", "Clouds", "Angels"], why: "And We have guarded it (near heaven) from every outcast Shaytan." },
        { q: "What chases the one who steals a hearing, in 15:18?", a: "A clear flaming fire", wrong: ["A river", "A wind", "A bird"], why: "Except him (devil) who steals the hearing, then he is pursued by a clear flaming fire." }
      ]
    },
    {
      slug: "fortune-tellers-lies",
      title: "Why fortune-tellers lie",
      line: "A stolen word reaches a fortune-teller, who adds a hundred lies.",
      facts: ["Do not trust fortune-tellers", "Only Allah knows the unseen"],
      quote: q15(18),
      source: hadith("bukhari", "4701", "Abu Hurairah", "Sahih", "The Prophet ﷺ said that when Allah decrees a matter in heaven, the angels beat their wings in obedience. Devils try to overhear, a flame may strike them, and any word that reaches a fortune-teller is mixed with a hundred lies.", "who would add a hundred lies to it"),
      difficulty: 4,
      questions: [
        { q: "What do the angels do when Allah decrees a matter, in the hadith?", a: "Beat their wings in obedience", wrong: ["Sleep", "Argue", "Hide"], why: "The angels beat with their wings in obedience to His statement." },
        { q: "How many lies does the fortune-teller add?", a: "A hundred", wrong: ["One", "Ten", "None"], why: "Then the news is inspired to a sorcerer who would add a hundred lies to it." },
        { q: "Which ayah does the eavesdropping hadith explain?", a: "15:18", wrong: ["15:9", "15:26", "15:99"], why: "Except him (devil) who steals the hearing, then he is pursued by a clear flaming fire." }
      ]
    },
    {
      slug: "earth-spread-out",
      title: "The earth spread out",
      line: "Allah spread the earth, set mountains, and grew all in measure.",
      facts: ["Each plant in its place", "Provision for all creatures"],
      quote: q15(19),
      source: ik(19, "Allah spread out the earth, placed firm mountains in it, and made plants and fruits grow in their right places, each in due measure. He placed means of living in it for us and for creatures we do not feed.", "the plants and fruits that He causes to grow in their appropriate locations"),
      difficulty: 2,
      questions: [
        { q: "What did Allah place in the earth, in 15:19?", a: "Firm mountains", wrong: ["Golden towers", "Glass domes", "Iron walls"], why: "And We have spread out the earth, and have placed firm mountains in it." },
        { q: "How did all things grow, in 15:19?", a: "In due proportion", wrong: ["By chance", "Without order", "Only in spring"], why: "And caused all kinds of things to grow in it, in due proportion." },
        { q: "Who are those whom you provide not, per Mujahid?", a: "Riding animals and cattle", wrong: ["Kings", "Angels", "Stars"], why: "Mujahid said, This refers to the riding animals and the cattle." }
      ]
    },
    {
      slug: "treasures-with-allah",
      title: "All treasures are with Allah",
      line: "Allah holds the stores of everything and sends them in measure.",
      facts: ["Rain divided as He wills", "Wisdom and mercy in the measure"],
      quote: q15(21),
      source: ik(21, "Allah owns the supplies of all things and sends them down in a known measure, out of wisdom and mercy. Ibn Mas'ud said no year has more rain than another, but Allah divides it as He wills.", "No year has more rain than another, but Allah divides the rain between them as He wills"),
      difficulty: 3,
      questions: [
        { q: "Where are the supplies of everything, in 15:21?", a: "With Allah", wrong: ["With kings", "Under the sea", "In the markets"], why: "And there is not a thing, but the supplies for it are with Us." },
        { q: "How does Allah send things down, in 15:21?", a: "In a known measure", wrong: ["All at once", "Without limit", "By chance"], why: "And We do not send it down but in a known measure." },
        { q: "What did Ibn Mas'ud say about rain each year?", a: "Allah divides it as He wills", wrong: ["Some years have none", "It never changes place", "It falls only in Makkah"], why: "No year has more rain than another, but Allah divides the rain between them as He wills." }
      ]
    },
    {
      slug: "fertilizing-winds",
      title: "The fertilizing winds",
      line: "Allah sends winds to fill clouds and pollinate trees, then rain.",
      facts: ["He made the water sweet", "We do not own its stores"],
      quote: q15(22),
      source: ik(22, "The winds carry water to the clouds and pollinate the trees. Allah sends the rain down fresh and sweet to drink; had He willed, He could have made it salty. We do not keep its stores, He does.", "fertilizing the clouds so that they give rain, and fertilizing the trees so that they open their leaves and blossoms"),
      difficulty: 3,
      questions: [
        { q: "What kind of winds does Allah send, in 15:22?", a: "Fertilizing winds", wrong: ["Barren winds only", "Cold winds only", "Silent winds"], why: "And We send the winds fertilizing." },
        { q: "Who owns the stores of water, in 15:22?", a: "Not us, but Allah", wrong: ["The farmers", "The kings", "The wells"], why: "And it is not you who are the owners of its supply." },
        { q: "What could Allah have made the water, per Ibn Kathir?", a: "Salty and undrinkable", wrong: ["Sweet like honey", "Hot always", "Red"], why: "If We had wished, We could have made it salty (and undrinkable)." }
      ]
    },
    {
      slug: "allah-the-inheritor",
      title: "Allah, the Inheritor",
      line: "Allah gives life and death, and knows every generation.",
      facts: ["First, present and future people", "Everything returns to Him"],
      quote: q15(23),
      source: ik(23, "Allah brings life from nothing, causes death, and will raise all on the Day He gathers them. He inherits the earth and knows the first and last of people, from Adam to the Last Day.", "He is the One Who brings life to creatures out of nothingness, then He causes them to die, then He will resurrect all of them"),
      difficulty: 3,
      questions: [
        { q: "Who gives life and causes death, in 15:23?", a: "Allah", wrong: ["The stars", "The kings", "Time"], why: "And certainly We! It is We Who give life, and cause death." },
        { q: "What is Allah called at the end of 15:23?", a: "The Inheritor", wrong: ["The Guest", "The Traveler", "The Seeker"], why: "And We are the Inheritors." },
        { q: "Who are the first generations, per Ibn Abbas?", a: "All who passed since Adam", wrong: ["Only the Arabs", "Only kings", "Only Prophets"], why: "The first generations are all those who have passed away since the time of Adam." }
      ]
    }
  ]
};

/** Ayahs 26 to 50: Adam from clay, the pride of Iblis, Allah's sincere servants, and the peace of Paradise. */
const HIJR_TWO: DeepUnit = {
  key: "hijr2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-15",
  name: "Al-Hijr, ayahs 26 to 50",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Hijr",
  lessons: [
    {
      slug: "clay-and-fire",
      title: "From clay and from fire",
      line: "Man was made from dried clay; jinn earlier, from smokeless fire.",
      facts: ["Jinn came before humans", "Angels were made from light"],
      quote: q15(26),
      source: ik(26, "Allah made man from dried sounding clay of smooth mud, and the jinn earlier, from a smokeless flame. The ayah points to the noble nature and pure origin of Adam.", "The Ayah is intended to point out the noble nature, good essence and pure origin of Adam"),
      difficulty: 2,
      questions: [
        { q: "From what was man created, in 15:26?", a: "Dried sounding clay", wrong: ["Fire", "Light", "Water only"], why: "And indeed, We created man from dried (sounding) clay of altered mud." },
        { q: "From what were the jinn created, in 15:27?", a: "Smokeless flame of fire", wrong: ["Clay", "Light", "Wind"], why: "And the Jinn, We created earlier from the smokeless flame of fire." },
        { q: "When were the jinn created, per Ibn Kathir?", a: "Before humans", wrong: ["After humans", "With the angels", "On the Last Day"], why: "And the Jinn, We created earlier means before creating humans." }
      ]
    },
    {
      slug: "angels-from-light",
      title: "Angels were made from light",
      line: "Angels came from light, jinn from fire, and Adam from clay.",
      facts: ["Three kinds of creation", "Narrated by Aishah"],
      quote: q15(27),
      source: hadith("muslim", "2996", "Aishah", "Sahih", "The Prophet ﷺ said the angels were created from light, the jinn from a spark of fire, and Adam from what was described in the Quran.", "The Angels were born out of light and the Jinns were born out of the spark of fire"),
      difficulty: 2,
      questions: [
        { q: "From what were the angels created, in the hadith?", a: "Light", wrong: ["Fire", "Clay", "Water"], why: "The Angels were born out of light." },
        { q: "From what was Adam created, in the hadith?", a: "As described in the Quran: clay", wrong: ["Light", "Fire", "Wind"], why: "And Adam was born as he has been defined (in the Qur'an) for you." },
        { q: "Who narrated the hadith on angels made of light?", a: "Aishah", wrong: ["Anas", "Jabir", "Abu Musa"], why: "A'isha reported that Allah's Messenger ﷺ said: The Angels were born out of light." }
      ]
    },
    {
      slug: "angels-bow-to-adam",
      title: "The angels bow to Adam",
      line: "Allah honored Adam: all the angels prostrated to him together.",
      facts: ["Allah breathed the soul into him", "An honor for mankind"],
      quote: q15(30),
      source: ik(29, "Allah told the angels about Adam before creating him, and honored him by commanding the angels to prostrate to him once He had shaped him and breathed the soul into him.", "He honored him by commanding the angels to prostrate to him"),
      difficulty: 2,
      questions: [
        { q: "Whom did Allah tell about Adam, in 15:28?", a: "The angels", wrong: ["The jinn only", "The birds", "The stars"], why: "And (remember) when your Lord said to the angels: I am going to create a man." },
        { q: "When were the angels to prostrate, in 15:29?", a: "After the soul was breathed in", wrong: ["Before he was made", "At night only", "Never"], why: "So, when I have fashioned him completely and breathed into him (Adam) of My spirit." },
        { q: "How many angels prostrated, in 15:30?", a: "All of them together", wrong: ["Half", "One", "None"], why: "So the angels prostrated themselves, all of them together." }
      ]
    },
    {
      slug: "iblis-refused",
      title: "Iblis refused out of pride",
      line: "Iblis refused to prostrate, out of envy and false pride.",
      facts: ["He looked down on clay", "Pride is a great sin"],
      quote: q15(33),
      source: ik(31, "Iblis refused to prostrate to Adam out of envy, disbelief, stubbornness, arrogance and false pride, saying he would not bow to a man made of clay.", "refused to prostrate to him out of envy, disbelief, stubbornness, arrogance, and false pride"),
      difficulty: 3,
      questions: [
        { q: "Who refused to prostrate, in 15:31?", a: "Iblis", wrong: ["Jibril", "Mika'il", "All the angels"], why: "Except Iblis (Shaytan) - he refused to be among the prostrate." },
        { q: "What was the excuse of Iblis, in 15:33?", a: "Adam was made of clay", wrong: ["He was tired", "He did not hear", "He was far away"], why: "I am not one to prostrate myself to a human, whom You created from dried (sounding) clay." },
        { q: "Per Ibn Kathir, Iblis refused out of humility.", tf: false, why: "He refused to prostrate to him out of envy, disbelief, stubbornness, arrogance, and false pride." }
      ]
    },
    {
      slug: "iblis-cast-out",
      title: "Iblis is cast out",
      line: "Allah cast Iblis out, cursed, and gave him time until the Day.",
      facts: ["He asked for respite", "Respite is not a reward"],
      quote: q15(34),
      source: ik(34, "Allah commanded Iblis to leave the high place he had, called him an outcast, and said the curse would follow him until the Day of Recompense. Iblis asked for respite, and was given it until the appointed Day.", "He told him that he was an outcast, i.e., cursed"),
      difficulty: 3,
      questions: [
        { q: "What did Allah call Iblis, in 15:34?", a: "An outcast", wrong: ["A friend", "A helper", "A guest"], why: "Then leave, for verily, you are an outcast." },
        { q: "Until when did Iblis ask for respite, in 15:36?", a: "The Day of resurrection", wrong: ["One year", "Until Friday", "Until sunset"], why: "Then give me respite until the Day they (the dead) will be resurrected." },
        { q: "Until when was he reprieved, in 15:38?", a: "The Day of the time appointed", wrong: ["Forever", "One hour", "Never"], why: "Until the Day of the time appointed." }
      ]
    },
    {
      slug: "iblis-makes-sin-fair",
      title: "Iblis makes sin look fair",
      line: "Iblis vowed to make sin look pretty, except to sincere servants.",
      facts: ["He works through temptation", "Sincere servants are safe"],
      quote: q15(39),
      source: ik(39, "Iblis vowed to adorn the path of error for people on earth, making sin dear to them and urging them on, except for Allah's chosen, sincere servants.", "I will make sin dear to them"),
      difficulty: 3,
      questions: [
        { q: "What did Iblis vow to adorn, in 15:39?", a: "The path of error", wrong: ["The masjids", "The gardens", "The rivers"], why: "I shall indeed adorn the path of error for them (mankind) on the earth." },
        { q: "Whom can Iblis not mislead, in 15:40?", a: "Allah's chosen servants", wrong: ["The rich", "The strong", "The old"], why: "Except Your chosen (guided) servants among them." },
        { q: "How does Iblis adorn error, per Ibn Kathir?", a: "He makes sin dear to them", wrong: ["He forces them", "He pays them", "He hides Allah"], why: "I will make sin dear to them, and will encourage, provoke and harass them to commit sin." }
      ]
    },
    {
      slug: "no-power-over-servants",
      title: "No power over Allah's servants",
      line: "Shaytan has no power over Allah's sincere servants.",
      facts: ["Seek refuge with Allah", "He strikes in anger and desire"],
      quote: q15(42),
      source: ik(42, "Allah told Iblis he has no way to reach those whom Allah guides, only those who follow him. In a story Ibn Kathir reports, Iblis admitted he seizes people at times of anger and desire.", "I seize him at times of anger and times of desire"),
      difficulty: 4,
      questions: [
        { q: "Over whom does Shaytan have no authority, in 15:42?", a: "Allah's servants", wrong: ["Nobody", "Only angels", "Only animals"], why: "Certainly, you shall have no authority over My servants." },
        { q: "Whom can he lead, in 15:42?", a: "The astray who follow him", wrong: ["The sincere", "The Prophets", "The angels"], why: "Except those of the astray who follow you." },
        { q: "When does Iblis seize people, in the story Ibn Kathir reports?", a: "In anger and desire", wrong: ["In prayer", "In charity", "In sleep only"], why: "I seize him at times of anger and times of desire." }
      ]
    },
    {
      slug: "enter-in-peace",
      title: "Enter in peace and security",
      line: "The godfearing dwell in Gardens and springs, safe and at peace.",
      facts: ["No fear of being sent out", "No worry ever again"],
      quote: q15(46),
      source: ik(45, "The people of Taqwa will live in Gardens and springs. They are told: enter in peace, free of every problem, and in security, free of every fear and worry, never fearing their joy will end.", "meaning free from all fear and concern"),
      difficulty: 2,
      questions: [
        { q: "Where will the godfearing dwell, in 15:45?", a: "Gardens and water springs", wrong: ["Deserts", "Caves", "Ships"], why: "Truly, those who have Taqwa, will dwell in Gardens and water springs." },
        { q: "How will they be told to enter, in 15:46?", a: "In peace and security", wrong: ["In a hurry", "In silence", "One by one only"], why: "Enter it in peace and security." },
        { q: "What does security mean, per Ibn Kathir?", a: "Free from all fear and concern", wrong: ["Locked doors", "Many guards", "High walls"], why: "And security, meaning free from all fear and concern." }
      ]
    },
    {
      slug: "brothers-on-thrones",
      title: "Brothers on thrones",
      line: "Bitterness is removed; believers sit as brothers on thrones.",
      facts: ["Wrongs settled before Paradise", "Hearts made pure"],
      quote: q15(47),
      source: hadith("bukhari", "2440", "Abu Sa'id al-Khudri", "Sahih", "The Prophet ﷺ said the believers will settle the wrongs between them at a bridge before Paradise, and once purified they will enter it.", "when they get purified of all their sins, they will be admitted into Paradise"),
      difficulty: 3,
      questions: [
        { q: "What does Allah remove from their breasts, in 15:47?", a: "Bitterness", wrong: ["Joy", "Faith", "Memory"], why: "And We shall remove any deep feeling of bitterness from their breasts." },
        { q: "How will they sit, in 15:47?", a: "As brothers facing each other", wrong: ["With their backs turned", "Alone", "In lines"], why: "(So they will be like) brothers facing each other on thrones." },
        { q: "When are believers admitted into Paradise, in the hadith?", a: "When purified of their wrongs", wrong: ["Before judgment", "Never", "After a year"], why: "When they get purified of all their sins, they will be admitted into Paradise." }
      ]
    },
    {
      slug: "no-fatigue-there",
      title: "No tiredness there",
      line: "In Paradise no tiredness touches them and none is sent out.",
      facts: ["Khadijah's palace without toil", "They stay forever"],
      quote: q15(48),
      source: hadith("bukhari", "3820", "Abu Hurairah", "Sahih", "Jibril brought greetings to Khadijah from her Lord and good news of a palace in Paradise with no noise and no tiredness.", "wherein there will be neither any noise nor any fatigue"),
      difficulty: 3,
      questions: [
        { q: "What will not touch them, in 15:48?", a: "Fatigue", wrong: ["Joy", "Light", "Peace"], why: "No sense of fatigue shall touch them." },
        { q: "Will they be asked to leave, in 15:48?", a: "Never", wrong: ["After a while", "If they tire", "On Fridays"], why: "Nor shall they be asked to leave it." },
        { q: "What was in Khadijah's palace, in the hadith?", a: "No noise and no fatigue", wrong: ["Many servants", "Great crowds", "Loud markets"], why: "Glad tidings of having a Qasab palace in Paradise wherein there will be neither any noise nor any fatigue." }
      ]
    },
    {
      slug: "young-forever",
      title: "Healthy and young forever",
      line: "In Paradise you stay healthy and young, and never die.",
      facts: ["An announcer calls it out", "Nothing ever ends there"],
      quote: q15(48),
      source: hadith("muslim", "2837", "Abu Sa'id al-Khudri and Abu Hurairah", "Sahih", "The Prophet ﷺ said an announcer in Paradise will call out: you will be healthy and never ill, live and never die, stay young and never grow old.", "you would remain young and never grow old"),
      difficulty: 2,
      questions: [
        { q: "Will people of Paradise fall ill, in the hadith?", a: "Never", wrong: ["Sometimes", "Once a year", "In winter"], why: "There is in store for you (everlasting) health and that you should never fall ill." },
        { q: "Will they grow old, in the hadith?", a: "No, they stay young", wrong: ["Yes, slowly", "Only some", "After a while"], why: "And that you would remain young and never grow old." },
        { q: "Which ayah is matched by never being asked to leave?", a: "15:48", wrong: ["15:9", "15:26", "15:94"], why: "No sense of fatigue shall touch them, nor shall they be asked to leave it." }
      ]
    },
    {
      slug: "forgiving-and-merciful",
      title: "The Forgiving, the Merciful",
      line: "Allah is Forgiving and Merciful, and His punishment is severe.",
      facts: ["Live between hope and fear", "Mercy has a hundred parts"],
      quote: q15(49),
      source: ik(49, "Allah tells His servants He is the source of forgiveness and mercy, and also of a painful punishment, so a believer lives between hope and fear.", "we must always be in a state between hope"),
      difficulty: 3,
      questions: [
        { q: "How does Allah describe Himself, in 15:49?", a: "The Forgiving, the Most Merciful", wrong: ["The Distant", "The Silent", "The Tired"], why: "Declare to My servants that I am truly the Forgiving, the Most Merciful." },
        { q: "What comes after mercy, in 15:50?", a: "His torment is most painful", wrong: ["Nothing", "A song", "A market"], why: "And that My torment is indeed the most painful torment." },
        { q: "Between what should a believer live, per Ibn Kathir?", a: "Hope and fear", wrong: ["Rich and poor", "Sleep and play", "Pride and anger"], why: "We must always be in a state between hope (for Allah's mercy) and fear (of His punishment)." }
      ]
    },
    {
      slug: "hundred-parts-of-mercy",
      title: "A hundred parts of mercy",
      line: "Allah sent one part of mercy to creation and kept ninety-nine.",
      facts: ["Never lose hope", "Never feel safe from His punishment"],
      quote: q15(49),
      source: hadith("bukhari", "6469", "Abu Hurairah", "Sahih", "The Prophet ﷺ said Allah made mercy in a hundred parts, kept ninety-nine and sent one to all creatures. A disbeliever who knew all His mercy would not lose hope, and a believer who knew His punishment would not feel safe.", "He withheld with Him ninety-nine parts, and sent its one part to all His creatures"),
      difficulty: 3,
      questions: [
        { q: "Into how many parts did Allah make mercy?", a: "One hundred", wrong: ["Ten", "Seven", "Two"], why: "The day He created it, He made it into one hundred parts." },
        { q: "How many parts did He send to all creatures?", a: "One", wrong: ["Ninety-nine", "Fifty", "Ten"], why: "He withheld with Him ninety-nine parts, and sent its one part to all His creatures." },
        { q: "Which ayah does the hundred parts hadith match?", a: "15:49", wrong: ["15:3", "15:17", "15:91"], why: "Declare to My servants that I am truly the Forgiving, the Most Merciful." }
      ]
    }
  ]
};

/** Ayahs 51 to 79: Ibrahim's guests, never despairing of mercy, Lut's family saved, and the ruins on the highroad. */
const HIJR_THREE: DeepUnit = {
  key: "hijr3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-15",
  name: "Al-Hijr, ayahs 51 to 79",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Hijr",
  lessons: [
    {
      slug: "ibrahims-guests",
      title: "Ibrahim's guests",
      line: "Angels visited Ibrahim as guests and greeted him with Salam.",
      facts: ["They did not eat his food", "So he felt afraid"],
      quote: q15(52),
      source: ik(51, "Angels came to Ibrahim as guests and said Salam. He felt afraid of them because they did not eat the fattened calf he had offered them.", "they noticed that these guests did not eat of the food that was offered"),
      difficulty: 2,
      questions: [
        { q: "Whose guests does 15:51 tell about?", a: "Ibrahim's guests", wrong: ["Nuh's guests", "Musa's guests", "Yusuf's guests"], why: "And tell them about the guests of Ibrahim, who were angels." },
        { q: "What did the guests say on entering, in 15:52?", a: "Salam, peace", wrong: ["Nothing", "Give us food", "Leave"], why: "When they entered upon him, and said: Salaman (peace!)." },
        { q: "Why was Ibrahim afraid, per Ibn Kathir?", a: "They did not eat his food", wrong: ["They were armed", "They were loud", "They came at night"], why: "They noticed that these guests did not eat of the food that was offered, which was a fattened calf." }
      ]
    },
    {
      slug: "news-of-a-son",
      title: "Good news of a wise son",
      line: "Angels gave old Ibrahim good news of a knowing son.",
      facts: ["The son was Ishaq", "Good news after good news"],
      quote: q15(53),
      source: ik(53, "The angels told Ibrahim not to fear and gave him good news of a knowing son, Ishaq. He wondered, being old, and they confirmed it: good news after good news.", "good news after good news"),
      difficulty: 3,
      questions: [
        { q: "What news did the angels bring, in 15:53?", a: "A boy with much knowledge", wrong: ["A great treasure", "A new house", "A long journey"], why: "We bring you the good news of a boy possessing much knowledge and wisdom." },
        { q: "Who was the boy, per Ibn Kathir?", a: "Ishaq", wrong: ["Isma'il", "Yusuf", "Lut"], why: "This refers to Ishaq, as was previously mentioned in Surat Hud." },
        { q: "Why did Ibrahim wonder, in 15:54?", a: "Old age had overtaken him", wrong: ["He was busy", "He was far away", "He was asleep"], why: "Do you give me this good news while old age has overtaken me?" }
      ]
    },
    {
      slug: "never-despair",
      title: "Never despair of mercy",
      line: "Only those astray give up hope of their Lord's mercy.",
      facts: ["Ibrahim never lost hope", "Keep hoping in Allah"],
      quote: q15(56),
      source: ik(55, "The angels said: we give you good news in truth, so do not despair. Ibrahim answered that only those who are astray despair of their Lord's mercy.", "So do not be of those who despair"),
      difficulty: 3,
      questions: [
        { q: "What did the angels tell Ibrahim not to be, in 15:55?", a: "Of those who despair", wrong: ["Of those who pray", "Of those who travel", "Of those who give"], why: "We give you good news in truth. So do not be of those who despair." },
        { q: "Who despairs of Allah's mercy, in 15:56?", a: "Those who are astray", wrong: ["The believers", "The Prophets", "The patient"], why: "And who despairs of the mercy of his Lord except those who are astray?" },
        { q: "A believer should keep hoping for Allah's mercy, as Ibrahim did.", tf: true, why: "And who despairs of the mercy of his Lord except those who are astray?" }
      ]
    },
    {
      slug: "lut-family-saved",
      title: "Lut's family to be saved",
      line: "The angels were sent to a guilty people, to save Lut's family.",
      facts: ["Except his wife", "She stayed with the wrongdoers"],
      quote: q15(59),
      source: ik(57, "Ibrahim asked why they had come. They said they were sent to the guilty people of Lut, and would save Lut's family, except his wife, who would remain behind.", "They told him that they were going to save the family of Lut from among those people"),
      difficulty: 3,
      questions: [
        { q: "To whom were the angels sent, in 15:58?", a: "A guilty people", wrong: ["A righteous people", "A sleeping people", "A new people"], why: "They said: We have been sent to a guilty people." },
        { q: "Who would be saved, in 15:59?", a: "The family of Lut", wrong: ["The whole city", "No one", "The kings"], why: "(All) except the family of Lut, all of whom we are to save." },
        { q: "Who would remain behind, in 15:60?", a: "Lut's wife", wrong: ["Lut's daughters", "Lut himself", "The angels"], why: "Except for his wife, of whom We have decreed that she shall be of those who remain behind." }
      ]
    },
    {
      slug: "angels-come-to-lut",
      title: "The angels come to Lut",
      line: "The angels came to Lut with the truth: he would be saved.",
      facts: ["He did not know them", "They tell the truth"],
      quote: q15(64),
      source: ik(61, "The angels came to Lut as strangers. They told him they brought what his people had doubted, and they spoke the truth: he would be saved and his people would be destroyed.", "that he would be saved and his people would be destroyed"),
      difficulty: 3,
      questions: [
        { q: "What did Lut say to the angels, in 15:62?", a: "You are people unknown to me", wrong: ["Welcome, old friends", "Leave at once", "Bring us food"], why: "He (Lut) said: Verily, you are people unknown to me." },
        { q: "What had his people doubted, in 15:63?", a: "What the angels brought", wrong: ["Their food", "The weather", "Their trade"], why: "Nay, we have come to you with that (torment) which they have been doubting." },
        { q: "What did the angels bring, in 15:64?", a: "The truth", wrong: ["Gold", "Riddles", "Gifts"], why: "And we have brought you the truth and certainly we tell the truth." }
      ]
    },
    {
      slug: "leave-by-night",
      title: "Leave by night",
      line: "Lut left at night, walking behind his family to protect them.",
      facts: ["No one should look back", "The Prophet ﷺ also walked at the rear"],
      quote: q15(65),
      source: ik(65, "The angels told Lut to leave with his family after part of the night, walking behind them to protect them. Likewise the Prophet ﷺ walked at the rear of the army to help the weak.", "in order to help the weak and carry those who had no means of transport"),
      difficulty: 3,
      questions: [
        { q: "When was Lut to travel, in 15:65?", a: "During part of the night", wrong: ["At noon", "At sunset only", "Next week"], why: "Then travel for a portion of the night with your family." },
        { q: "Where was Lut to walk, in 15:65?", a: "Behind them in the rear", wrong: ["In front", "Alone ahead", "On a ship"], why: "And you go behind them in the rear." },
        { q: "Why did the Prophet ﷺ walk at the rear, per Ibn Kathir?", a: "To help the weak", wrong: ["To rest", "To hide", "To lead the music"], why: "In order to help the weak and carry those who had no means of transport." }
      ]
    },
    {
      slug: "by-your-life",
      title: "By your life",
      line: "Allah swore by the life of the Prophet ﷺ, a great honor.",
      facts: ["No soul dearer to Allah", "The deniers wandered blindly"],
      quote: q15(72),
      source: ik(72, "In 15:72 Allah swore by the life of His Prophet ﷺ, a huge honor showing his high rank. Ibn Abbas said he never heard of Allah swearing by the life of anyone else.", "which is an immense honor reflecting his high rank and noble status"),
      difficulty: 4,
      questions: [
        { q: "By whose life did Allah swear, in 15:72?", a: "The Prophet ﷺ", wrong: ["Ibrahim", "Lut", "An angel"], why: "Allah swore by the life of His Prophet ﷺ." },
        { q: "What does Allah swearing by his life show, per Ibn Kathir?", a: "His high rank and noble status", wrong: ["Nothing special", "His wealth", "His age"], why: "Which is an immense honor reflecting his high rank and noble status." },
        { q: "How were the deniers wandering, in 15:72?", a: "Blindly", wrong: ["Wisely", "Happily", "Safely"], why: "In their wild intoxication, they were wandering blindly." }
      ]
    },
    {
      slug: "ruins-on-the-highroad",
      title: "Ruins on the highroad",
      line: "The ruined city lies on a known road, a sign to see.",
      facts: ["Signs for those with insight", "Travelers still pass it"],
      quote: q15(76),
      source: ik(75, "The traces of the ruined city are easy to see for anyone who reflects, and it lies on a road still used today. It is a sign for believers and for those with insight.", "those who have insight and discernment"),
      difficulty: 3,
      questions: [
        { q: "For whom are there signs, in 15:75?", a: "Those who see", wrong: ["Those who sleep", "Only kings", "No one"], why: "Surely, in this are signs for those who see." },
        { q: "Where was the city, in 15:76?", a: "Right on the highroad", wrong: ["Under the sea", "In the sky", "In a hidden cave"], why: "And verily, they were right on the highroad." },
        { q: "Who are those who see, per Mujahid?", a: "People of insight and discernment", wrong: ["Sailors", "Shepherds", "Soldiers"], why: "Those who have insight and discernment." }
      ]
    },
    {
      slug: "people-of-the-wood",
      title: "The people of the Wood",
      line: "The people of Al-Aykah, Shu'ayb's people, were wrongdoers too.",
      facts: ["They cheated in weights", "Their land was also on a known route"],
      quote: q15(78),
      source: ik(78, "The people of Al-Aykah, meaning thick trees, were Shu'ayb's people. Their wrongs were Shirk, robbery on the roads and cheating in weights and measures.", "Their evildoing included associating partners with Allah (Shirk), banditry and cheating in weights and measures"),
      difficulty: 3,
      questions: [
        { q: "Who were the Dwellers of Al-Aykah, per Ibn Kathir?", a: "The people of Shu'ayb", wrong: ["The people of Nuh", "The people of Hud", "The people of Yunus"], why: "The Dwellers of Al-Aykah, were the people of Shu'ayb." },
        { q: "What does Al-Aykah mean?", a: "Intertwined trees", wrong: ["A river", "A mountain", "A desert"], why: "Ad-Dahhak, Qatadah and others said that Al-Aykah refers to intertwined trees." },
        { q: "How did they cheat, per Ibn Kathir?", a: "In weights and measures", wrong: ["In poetry", "In races", "In games"], why: "Banditry and cheating in weights and measures." }
      ]
    }
  ]
};

/** Ayahs 80 to 99: the rock dwellers of Al-Hijr, the seven oft-repeated ayahs, and worship until the very end. */
const HIJR_FOUR: DeepUnit = {
  key: "hijr4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-15",
  name: "Al-Hijr, ayahs 80 to 99",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Hijr",
  lessons: [
    {
      slug: "dwellers-of-al-hijr",
      title: "The dwellers of Al-Hijr",
      line: "The people of Al-Hijr, Thamud, denied Salih and his clear signs.",
      facts: ["The she-camel from a rock", "Denying one Messenger denies all"],
      quote: q15(80),
      source: ik(80, "The people of Al-Hijr were Thamud, who rejected the Prophet Salih. Denying one Messenger is denying them all. He brought signs like the she-camel Allah brought out of a rock.", "Whoever denies even one Messenger, then he has disbelieved in all of the Messengers"),
      difficulty: 3,
      questions: [
        { q: "Who were the Dwellers of Al-Hijr, per Ibn Kathir?", a: "Thamud, the people of Salih", wrong: ["The people of Lut", "The people of Musa", "The people of Shu'ayb"], why: "The Dwellers of the Al Hijr were the people of Thamud who rejected their Prophet, Salih." },
        { q: "Why does 15:80 say they denied the Messengers?", a: "Denying one is denying all", wrong: ["They met many", "They traveled much", "They were many tribes"], why: "Whoever denies even one Messenger, then he has disbelieved in all of the Messengers." },
        { q: "From what did the she-camel come, per Ibn Kathir?", a: "A solid rock", wrong: ["The sea", "A cloud", "A tree"], why: "The she-camel which Allah created for them out of a solid rock in response to the supplication of Salih." }
      ]
    },
    {
      slug: "homes-in-the-mountains",
      title: "Homes carved in mountains",
      line: "They carved homes in mountains and felt safe, in vain.",
      facts: ["Their wealth did not save them", "Pass such places humbly"],
      quote: q15(82),
      source: ik(82, "Thamud carved houses in the mountains and felt safe, though they had no real need for them. In the end all their crops and wealth did not protect them.", "it was merely a form of extravagance and work without a purpose"),
      difficulty: 3,
      questions: [
        { q: "What did they carve from the mountains, in 15:82?", a: "Dwellings", wrong: ["Statues only", "Ships", "Wells"], why: "And they used to hew out dwellings from the mountains, (feeling) secure." },
        { q: "Did their earnings help them, in 15:84?", a: "No, not at all", wrong: ["Yes, fully", "A little", "Only their gold"], why: "And all that they used to earn availed them not." },
        { q: "What were those carved houses, per Ibn Kathir?", a: "Extravagance without purpose", wrong: ["Needed shelters", "Masjids", "Schools"], why: "It was merely a form of extravagance and work without a purpose." }
      ]
    },
    {
      slug: "pass-ruins-weeping",
      title: "Pass their ruins humbly",
      line: "Enter the places of punished people only while weeping.",
      facts: ["He hurried past Al-Hijr", "Fear what struck them"],
      quote: q15(83),
      source: hadith("bukhari", "433", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ told his Companions not to enter the places of people who were punished unless weeping, lest what struck them strike them too.", "unless you do so weeping"),
      difficulty: 3,
      questions: [
        { q: "How should one enter such places, in the hadith?", a: "Weeping", wrong: ["Laughing", "Singing", "Running"], why: "Do not enter (the places) of these people where Allah's punishment had fallen unless you do so weeping." },
        { q: "What if one cannot weep, in the hadith?", a: "Do not enter", wrong: ["Enter anyway", "Take photos", "Camp there"], why: "If you do not weep, do not enter (the places of these people)." },
        { q: "Who narrated the hadith on passing ruins weeping?", a: "Abdullah ibn Umar", wrong: ["Anas", "Jabir", "Abu Dharr"], why: "Narrated Abdullah bin Umar: Allah's Messenger ﷺ said, Do not enter." }
      ]
    },
    {
      slug: "created-with-truth",
      title: "Created with truth",
      line: "Allah made the heavens and earth with truth; the Hour is coming.",
      facts: ["Nothing was made in play", "Forgive graciously"],
      quote: q15(85),
      source: ik(85, "Allah did not create the heavens and earth without purpose, nor us in play. The Hour is surely coming, so the Prophet ﷺ was told to overlook the mockers with gracious forgiveness.", "Did you think that We created you in play"),
      difficulty: 3,
      questions: [
        { q: "How were the heavens and earth created, in 15:85?", a: "With the truth", wrong: ["In play", "By chance", "Without aim"], why: "And We did not create the heavens and the earth and all that is between them except with the truth." },
        { q: "What is surely coming, in 15:85?", a: "The Hour", wrong: ["A king", "A flood", "A feast"], why: "And the Hour is surely coming." },
        { q: "How should the Prophet ﷺ overlook their faults, in 15:85?", a: "With gracious forgiveness", wrong: ["With anger", "With revenge", "With silence forever"], why: "So overlook their faults with gracious forgiveness." }
      ]
    },
    {
      slug: "the-knowing-creator",
      title: "The Knowing Creator",
      line: "Your Lord is the Creator who knows all things.",
      facts: ["Nothing is beyond Him", "He says Be, and it is"],
      quote: q15(86),
      source: ik(86, "Allah is the Creator, nothing is beyond Him, and He knows every scattered part of people's bodies, so He is able to bring the Hour and raise everyone.", "He is the Creator and nothing is beyond Him"),
      difficulty: 3,
      questions: [
        { q: "What is your Lord called, in 15:86?", a: "The Knowing Creator", wrong: ["The Distant King", "The Silent One", "The Tired One"], why: "Verily, your Lord is the Knowing Creator." },
        { q: "What does 15:86 confirm, per Ibn Kathir?", a: "The Day of Resurrection", wrong: ["The price of gold", "A war", "The weather"], why: "This is a confirmation of the Day of Resurrection and that Allah is able to bring the Hour to pass." },
        { q: "Per Ibn Kathir, something is beyond the Creator.", tf: false, why: "He is the Creator and nothing is beyond Him." }
      ]
    },
    {
      slug: "seven-oft-repeated",
      title: "The seven oft-repeated",
      line: "Allah gave the Prophet ﷺ the seven oft-repeated and the Quran.",
      facts: ["Al-Fatihah, recited every prayer", "The greatest surah"],
      quote: q15(87),
      source: hadith("bukhari", "4704", "Abu Hurairah", "Sahih", "The Prophet ﷺ said the Mother of the Quran, Al-Fatihah, is the seven oft-repeated ayahs and the Great Quran.", "is the seven oft-repeated verses (Al-Mathani) and is the Great Qur"),
      difficulty: 3,
      questions: [
        { q: "What was the Prophet ﷺ given, in 15:87?", a: "Seven of the Mathani", wrong: ["Seven treasures", "Seven cities", "Seven armies"], why: "And indeed, We have bestowed upon you seven of the Mathani, and the Grand Qur'an." },
        { q: "Which surah is the seven Mathani, in the hadith?", a: "Al-Fatihah", wrong: ["Al-Baqarah", "Yasin", "Al-Ikhlas"], why: "The Um (substance) of the Qur'an is the seven oft-repeated verses (Al-Mathani)." },
        { q: "What did the Prophet ﷺ call Al-Fatihah in the hadith of Ibn al-Mu'alla?", a: "The greatest surah", wrong: ["The shortest surah", "The last surah", "A Madinan surah"], why: "I will teach you a Sura which is the greatest Sura in the Qur'an." }
      ]
    },
    {
      slug: "do-not-envy",
      title: "Do not look with envy",
      line: "With the Quran given, do not long for others' passing riches.",
      facts: ["Be gentle with the believers", "Do not wish for what others have"],
      quote: q15(88),
      source: ik(88, "Since the Prophet ﷺ was given the Grand Quran, he should not look longingly at the passing delights of this world given to others as a test, and should be gentle with the believers.", "then do not look at this world and its attractions"),
      difficulty: 3,
      questions: [
        { q: "What should one not look at ambitiously, in 15:88?", a: "What others were given", wrong: ["The Quran", "The sky", "The Kabah"], why: "Look not with your eyes ambitiously at what We have given to certain classes of them." },
        { q: "How should the Prophet ﷺ treat the believers, in 15:88?", a: "Lower his wing to them", wrong: ["Rule them harshly", "Avoid them", "Test them"], why: "And lower your wings to the believers." },
        { q: "What did Ibn Abbas say the ayah forbids?", a: "Wishing for what a companion has", wrong: ["Eating dates", "Travelling", "Trading"], why: "He forbade a man to wish for what his companion has." }
      ]
    },
    {
      slug: "a-plain-warner",
      title: "A plain warner",
      line: "The Prophet ﷺ warned like one who saw an army coming.",
      facts: ["Those who listened were safe", "Those who mocked were caught"],
      quote: q15(89),
      source: hadith("bukhari", "6482", "Abu Musa", "Sahih", "The Prophet ﷺ compared himself to a man who saw an army coming and warned his people. Those who believed him left at night and were safe; those who did not were caught in the morning.", "I am a naked warner (to you) so save yourself, save yourself"),
      difficulty: 3,
      questions: [
        { q: "What is the Prophet ﷺ told to say, in 15:89?", a: "I am a plain warner", wrong: ["I am a king", "I am a poet", "I am a trader"], why: "And say (O Muhammad): I am indeed a plain warner." },
        { q: "What did the man in the hadith see?", a: "An army coming", wrong: ["A flood", "A caravan", "A storm"], why: "I have seen with my own eyes the enemy forces." },
        { q: "What happened to those who obeyed the warner?", a: "They were safe", wrong: ["They were caught", "They got lost", "They got rich"], why: "A group of them obeyed him and went out at night, slowly and stealthily and were safe." }
      ]
    },
    {
      slug: "split-into-parts",
      title: "Splitting the Book into parts",
      line: "Some split scripture into parts, taking some and rejecting some.",
      facts: ["They swore to oppose the Prophets", "Believe in all of it"],
      quote: q15(91),
      source: ik(91, "The Muqtasimin swore together to oppose the Prophets. Ibn Abbas said they were the People of the Book, who believed in some of their Book and rejected some of it.", "believing in some of it, and rejecting some of it"),
      difficulty: 4,
      questions: [
        { q: "What did they make the Quran into, in 15:91?", a: "Parts", wrong: ["A song", "A wall", "A game"], why: "Who have made the Qur'an into parts." },
        { q: "Who were they, per Ibn Abbas?", a: "The People of the Book", wrong: ["The angels", "The jinn", "The Ansar"], why: "They are the People of the Book, who divided the Book into parts." },
        { q: "What did they do with their Book, per Ibn Abbas?", a: "Believed some, rejected some", wrong: ["Believed all", "Lost it", "Buried it"], why: "Believing in some of it, and rejecting some of it." }
      ]
    },
    {
      slug: "all-will-be-asked",
      title: "All will be asked",
      line: "Allah will question everyone about all they used to do.",
      facts: ["What did you worship?", "How did you answer the Messengers?"],
      quote: q15(92),
      source: ik(92, "Allah swears He will question all of them about their deeds. Abu Al-Aliyah said everyone will be asked two things: what they worshipped, and how they answered the Messengers.", "what they used to worship, and what their response was to the Messengers"),
      difficulty: 4,
      questions: [
        { q: "Whom will Allah call to account, in 15:92?", a: "All of them", wrong: ["Only kings", "Only a few", "No one"], why: "So, by your Lord, We shall certainly call all of them to account." },
        { q: "For what will they be asked, in 15:93?", a: "All that they used to do", wrong: ["Only their words", "Only their wealth", "Only their names"], why: "For all that they used to do." },
        { q: "What two things will all be asked, per Abu Al-Aliyah?", a: "Whom they worshipped and how they answered the Messengers", wrong: ["Their age and height", "Their wealth and land", "Their tribe and city"], why: "What they used to worship, and what their response was to the Messengers." }
      ]
    },
    {
      slug: "proclaim-openly",
      title: "Proclaim it openly",
      line: "The Prophet ﷺ was told to proclaim Islam openly.",
      facts: ["The call had been secret", "Then the Companions came out"],
      quote: q15(94),
      source: ik(94, "Ibn Mas'ud said the Prophet ﷺ had been practising and calling to Islam in secret until 15:94 came, then he and his Companions came out in the open.", "preaching Islam secretly until this Ayah was revealed"),
      difficulty: 3,
      questions: [
        { q: "What was the Prophet ﷺ told to do, in 15:94?", a: "Openly proclaim his command", wrong: ["Stay silent", "Leave Makkah", "Hide the Quran"], why: "Therefore openly proclaim what you have been commanded." },
        { q: "How was Islam preached before 15:94, per Ibn Mas'ud?", a: "Secretly", wrong: ["Loudly in markets", "By letters", "Not at all"], why: "The Prophet ﷺ was still practicing and preaching Islam secretly until this Ayah was revealed." },
        { q: "From whom should he turn away, in 15:94?", a: "The idolators", wrong: ["The believers", "The poor", "The orphans"], why: "And turn away from the idolators." }
      ]
    },
    {
      slug: "allah-suffices",
      title: "Allah is enough",
      line: "Allah promised to suffice His Prophet ﷺ against all the mockers.",
      facts: ["Do not fear them", "Allah protects His Messenger"],
      quote: q15(95),
      source: ik(95, "Allah told the Prophet ﷺ to convey the message and not fear the mockers, for Allah would suffice him against them and protect him.", "Do not fear them because Allah will suffice you against them, and He will protect you from them"),
      difficulty: 3,
      questions: [
        { q: "Against whom will Allah suffice the Prophet ﷺ, in 15:95?", a: "The mockers", wrong: ["The believers", "The angels", "The poor"], why: "Truly, We will suffice you against the mockers." },
        { q: "What do the mockers do, in 15:96?", a: "Make another god with Allah", wrong: ["Feed the poor", "Pray at night", "Read the Quran"], why: "Who make another god along with Allah; but they will come to know." },
        { q: "What does Allah promise, per Ibn Kathir?", a: "To protect him from them", wrong: ["To make him rich", "To give him a palace", "To end the call"], why: "Allah will suffice you against them, and He will protect you from them." }
      ]
    },
    {
      slug: "when-the-chest-is-tight",
      title: "When your chest feels tight",
      line: "When hurtful words weigh on you, glorify Allah and prostrate.",
      facts: ["Allah knows your sadness", "Prayer brings comfort"],
      quote: q15(98),
      source: ik(97, "Allah knew the Prophet ﷺ was hurt by their insults, and told him not to let it weaken him, but to keep busy remembering, praising and worshipping Allah.", "do not let that weaken your resolve or cause you to give up conveying the Message of Allah"),
      difficulty: 3,
      questions: [
        { q: "What does Allah know, in 15:97?", a: "His chest becomes tight", wrong: ["He is rich", "He is asleep", "He is far"], why: "Indeed, We know that your breast becomes tight because of what they say." },
        { q: "What should he do when sad, in 15:98?", a: "Glorify Allah and prostrate", wrong: ["Argue all night", "Give up", "Leave his people"], why: "So glorify the praises of your Lord and be of those who prostrate themselves." },
        { q: "What should he keep busy with, per Ibn Kathir?", a: "Remembering and worshipping Allah", wrong: ["Trade", "Games", "Arguments"], why: "Keep yourself busy with remembering Allah, praising Him, glorifying Him, and worshipping Him." }
      ]
    },
    {
      slug: "until-certainty-comes",
      title: "Until the certainty comes",
      line: "Worship your Lord until the certainty, meaning death, comes.",
      facts: ["Pray as you are able", "Worship never stops"],
      quote: q15(99),
      source: ik(99, "Salim said the certainty in 15:99 means death. Worship stays a duty as long as the mind is sound, and one prays as he is able. No level of knowledge frees anyone from it.", "what is meant by Yaqin here is death"),
      difficulty: 3,
      questions: [
        { q: "Until when should we worship, in 15:99?", a: "Until the certainty comes", wrong: ["Until we are rich", "Until Ramadan ends", "Until we are old"], why: "And worship your Lord until the certainty comes to you." },
        { q: "What is the certainty, per Ibn Kathir?", a: "Death", wrong: ["Wealth", "Old age", "Fame"], why: "What is meant by Yaqin here is death." },
        { q: "Can great knowledge free someone from worship, per Ibn Kathir?", a: "No, never", wrong: ["Yes", "For scholars", "After Hajj"], why: "The Prophets were the most knowledgeable, but they worshipped Him the most, until they died." }
      ]
    },
    {
      slug: "pray-as-you-can",
      title: "Pray as you are able",
      line: "Pray standing, else sitting, else lying on your side.",
      facts: ["Prayer never drops", "Islam makes it easy"],
      quote: q15(99),
      source: hadith("bukhari", "1117", "Imran ibn Husayn", "Sahih", "Imran was ill and asked the Prophet ﷺ about praying. He said: pray standing; if you cannot, sitting; and if not, lying on your side.", "Pray while standing and if you can"),
      difficulty: 2,
      questions: [
        { q: "How should one pray first, in the hadith?", a: "Standing", wrong: ["Lying down", "Walking", "Running"], why: "Pray while standing." },
        { q: "What if one cannot sit, in the hadith?", a: "Pray lying on the side", wrong: ["Skip prayer", "Pray later", "Pray once a week"], why: "If you cannot do even that, then pray lying on your side." },
        { q: "Who narrated the hadith on praying as you are able?", a: "Imran ibn Husayn", wrong: ["Anas", "Abu Musa", "Jabir"], why: "Narrated Imran bin Husain: I asked the Prophet ﷺ about the prayer." }
      ]
    }
  ]
};

export const HIJR_UNITS: readonly DeepUnit[] = [HIJR_ONE, HIJR_TWO, HIJR_THREE, HIJR_FOUR];
