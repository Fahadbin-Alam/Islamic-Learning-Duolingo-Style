import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Al-Ma'arij ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Ma'arij 70:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_70_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Ma'arij 70:${ayah}`,
    url: `https://quran.com/70:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 70:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q70 = (ayah: number) => quranQuote(70, ayah);


/** Ayahs 1 to 7: the questioner, the Lord of the ways of ascent, the Day of fifty thousand years, and good patience. */
const MAARIJ_ONE: DeepUnit = {
  key: "maarij1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-70",
  name: "Al-Ma'arij, ayahs 1 to 7",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Ma'arij",
  lessons: [
    {
      slug: "a-questioner-asked",
      title: "A questioner asked",
      line: "A denier mockingly asked for the punishment to hurry up.",
      facts: ["Mocking the warning", "The promise will come"],
      quote: q70(1),
      source: ik(1, "Ibn Kathir says the meaning is that a questioner asked to hasten the punishment, as in 22:47, and Allah never fails His promise.", "a questioner requested to hasten on the torment that is about to fall"),
      difficulty: 2,
      questions: [
        { q: "What did the questioner ask for?", a: "To hasten the punishment", wrong: ["To learn the Quran", "To be forgiven", "To meet the Prophet ﷺ"], why: "A questioner requested to hasten on the torment that is about to fall." },
        { q: "What does 22:47 say about Allah?", a: "He never fails His promise", wrong: ["He forgets", "He delays forever", "He changes His mind"], why: "And they ask you to hasten on the torment! And Allah fails not His promise. (22:47)" },
        { tf: false, q: "Asking for punishment in mockery is a sign of wisdom.", why: "That is the questioning of the disbelievers about the torment of Allah and it will occur to them." }
      ]
    },
    {
      slug: "none-can-avert",
      title: "None can push it away",
      line: "When Allah wills it, no one can turn the punishment away.",
      facts: ["Waqi: coming", "Allah's will is done"],
      quote: q70(2),
      source: ik(2, "Ibn Kathir says no one can repel it if Allah wants it to happen; Ibn Abbas said Waqi means coming.", "there is no one who can repel it if Allah wants it to happen"),
      difficulty: 2,
      questions: [
        { q: "Who can avert what Allah wills?", a: "No one", wrong: ["Kings", "Armies", "Rich people"], why: "There is no one who can repel it if Allah wants it to happen." },
        { q: "What did Ibn Abbas say Waqi means?", a: "Coming", wrong: ["Leaving", "Sleeping", "Hiding"], why: "Ibn Abbas said, Waqi means coming." },
        { tf: true, q: "Nothing can stop what Allah decides.", why: "There is no one who can repel it if Allah wants it to happen." }
      ]
    },
    {
      slug: "lord-of-the-ways-of-ascent",
      title: "Lord of the ways of ascent",
      line: "Allah is Lord of Al-Ma'arij, the ways up to the heavens.",
      facts: ["Al-Ma'arij: ways of ascent", "Allah is Most High"],
      quote: q70(3),
      source: ik(3, "Ibn Abbas said it means loftiness and abundance; Mujahid said it means the ways of ascension into the heavens.", "Lord of the ways of ascent means the ways of ascension into the heavens"),
      difficulty: 2,
      questions: [
        { q: "What did Mujahid say Al-Ma'arij means?", a: "Ways up into the heavens", wrong: ["Rivers of milk", "Gates of a city", "Roads of trade"], why: "Mujahid said, Lord of the ways of ascent means the ways of ascension into the heavens." },
        { q: "What did Ibn Abbas say it means?", a: "Loftiness and abundance", wrong: ["Darkness and cold", "Rain and wind", "Sand and stone"], why: "Ibn Abbas said, Lord of the ways of ascent means loftiness and abundance." },
        { tf: false, q: "Al-Ma'arij is the name of a valley in Makkah.", why: "Mujahid said, Lord of the ways of ascent means the ways of ascension into the heavens." }
      ]
    },
    {
      slug: "angels-ascend",
      title: "The angels ascend",
      line: "The angels and the Ruh rise up to Allah.",
      facts:["Taruju: they ascend", "Ar-Ruh may be Jibril"],
      quote: q70(4),
      source: ik(4, "Qatadah said Taruju means to ascend; Ibn Kathir says the Ruh could mean Jibril, mentioned with the other angels.", "It could be that here it means Jibril"),
      difficulty: 3,
      questions: [
        { q: "What does Taruju mean, per Qatadah?", a: "To ascend", wrong: ["To sleep", "To descend", "To hide"], why: "Qatadah said that Taruju means to ascend." },
        { q: "Who may the Ruh be, per Ibn Kathir?", a: "Jibril", wrong: ["Iblis", "A prophet", "A star"], why: "It could be that the Ruh means Jibril, connecting the specific to the general, the other angels." },
        { tf: true, q: "The angels rise up to Allah.", why: "The angels and the Ruh ascend to Him." }
      ]
    },
    {
      slug: "fifty-thousand-years",
      title: "A Day of fifty thousand years",
      line: "The Day of Judgement is as long as fifty thousand years.",
      facts: ["For deniers it is long", "Prepare for that Day"],
      quote: q70(4),
      source: ik(4, "Ibn Abbas said the Day of fifty thousand years is the Day of Judgement, made that long for the disbelievers; Ibn Kathir calls the chain authentic.", "It is the Day of Judgement that Allah has made to be the measure of fifty thousand years for the disbelievers"),
      difficulty: 2,
      questions: [
        { q: "How long is that Day, per 70:4?", a: "Fifty thousand years", wrong: ["One day", "One thousand years", "Forty days"], why: "In a Day the measure whereof is fifty thousand years." },
        { q: "Which Day is it, per Ibn Abbas?", a: "The Day of Judgement", wrong: ["The day of Badr", "Eid day", "The first day of creation"], why: "Ibn Abbas said, It is the Day of Judgement." },
        { tf: false, q: "The Day of Judgement will feel short for the disbelievers.", why: "Allah has made it to be the measure of fifty thousand years for the disbelievers." }
      ]
    },
    {
      slug: "a-good-patience",
      title: "A good patience",
      line: "Be patient with a beautiful patience, without complaint.",
      facts: ["Sabr Jamil: good patience", "Bear rejection calmly"],
      quote: q70(5),
      source: ik(5, "Ibn Kathir says Allah told the Prophet ﷺ to be patient with his people rejecting him and asking to hasten the punishment.", "be patient, O Muhammad, with your people"),
      difficulty: 2,
      questions: [
        { q: "What kind of patience is asked for in 70:5?", a: "A good patience", wrong: ["A short patience", "An angry patience", "No patience"], why: "So be patient, with a good patience." },
        { q: "With what was he to be patient?", a: "His people rejecting him", wrong: ["Hunger only", "Bad weather", "Long trips"], why: "Be patient, O Muhammad, with your people's rejection and their seeking to hasten the torment." },
        { tf: true, q: "Patience is the right answer to mockery.", why: "So be patient, with a good patience." }
      ]
    },
    {
      slug: "far-for-them-near-for-us",
      title: "Far to them, near to Allah",
      line: "Deniers think the Day is far, but Allah sees it near.",
      facts: ["Every coming thing is near", "Only Allah knows its time"],
      quote: q70(7),
      source: ik(7, "Ibn Kathir says deniers see it as far-fetched, while believers know it is near, though only Allah knows its time.", "All of what is approaching then it is near and it will definitely happen"),
      difficulty: 3,
      questions: [
        { q: "How do the deniers see the Day?", a: "As far off", wrong: ["As near", "As already here", "As a joke only"], why: "Verily, they see it afar off. The disbelievers see this as something that is farfetched." },
        { q: "Who knows when the Hour will come?", a: "Only Allah", wrong: ["The angels", "The scholars", "The stars"], why: "Its time of occurrence is unknown and no one knows when it will be except Allah." },
        { tf: false, q: "Because its time is unknown, the Day will not come.", why: "All of what is approaching then it is near and it will definitely happen." }
      ]
    },
    {
      slug: "believers-fear-it",
      title: "Believers take it seriously",
      line: "Deniers rush the Day; believers fear it and know it is true.",
      facts: ["Know it is the truth", "Fear leads to good"],
      quote: q70(6),
      source: ik(6, "Ibn Kathir quotes 42:18: those who do not believe seek to hasten it, while believers are fearful of it and know it is the truth.", "while those believe are fearful of it, and know that it is the very truth"),
      difficulty: 3,
      questions: [
        { q: "Who seeks to hasten the Day, per 42:18?", a: "Those who do not believe", wrong: ["The believers", "The angels", "The prophets"], why: "Those who believe not therein seek to hasten it. (42:18)" },
        { q: "How do believers feel about it?", a: "Fearful, knowing it is true", wrong: ["Bored", "Doubtful", "Careless"], why: "While those believe are fearful of it, and know that it is the very truth." },
        { tf: false, q: "Believers mock the Day of Judgement.", why: "Those believe are fearful of it, and know that it is the very truth." }
      ]
    }
  ]
};

/** Ayahs 8 to 18: the sky and mountains on that Day, no friend asking a friend, no ransom, and hoarding wealth. */
const MAARIJ_TWO: DeepUnit = {
  key: "maarij2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-70",
  name: "Al-Ma'arij, ayahs 8 to 18",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Ma'arij",
  lessons: [
    {
      slug: "sky-like-molten-oil",
      title: "The sky like oil",
      line: "On that Day the sky will look like the dregs of oil.",
      facts: ["Al-Muhl: oil residue", "The sky will change"],
      quote: q70(8),
      source: ik(8, "Ibn Abbas, Mujahid, Ata, Said bin Jubayr, Ikrimah, As-Suddi and others said Al-Muhl is like the residue of oil.", "Like the residue of oil"),
      difficulty: 2,
      questions: [
        { q: "What will the sky be like in 70:8?", a: "Al-Muhl, residue of oil", wrong: ["Clear glass", "A blue sea", "A green field"], why: "The Day that the sky will be like the Al-Muhl." },
        { q: "What does Al-Muhl mean, per Ibn Abbas?", a: "Residue of oil", wrong: ["Fresh milk", "Snow", "Smoke"], why: "Ibn Abbas, Mujahid and others have all said, Like the residue of oil." },
        { tf: false, q: "The sky will look the same on that Day.", why: "The Day that the sky will be like the Al-Muhl, like the residue of oil." }
      ]
    },
    {
      slug: "mountains-like-wool",
      title: "Mountains like wool",
      line: "The mountains will be like fluffed wool.",
      facts: ["Ihn: fluffed wool", "Even mountains are weak"],
      quote: q70(9),
      source: ik(9, "Mujahid, Qatadah and As-Suddi said Ihn means fluffed wool, like 101:5.", "meaning, like fluffed wool"),
      difficulty: 1,
      questions: [
        { q: "What will the mountains be like?", a: "Fluffed wool", wrong: ["Hard rock", "Tall towers", "Ice"], why: "And the mountains will be like Ihn, meaning, like fluffed wool." },
        { q: "Which ayah is similar, per Ibn Kathir?", a: "Mountains like carded wool", wrong: ["By the fig", "Say: He is Allah", "By the pen"], why: "And the mountains will be like carded wool. (101:5)" },
        { tf: true, q: "Strong mountains will become light like wool.", why: "And the mountains will be like Ihn, meaning, like fluffed wool." }
      ]
    },
    {
      slug: "no-friend-asks",
      title: "No friend asks a friend",
      line: "Friends will see each other, yet none asks how the other is.",
      facts: ["Each worries for himself", "Hamim: close friend"],
      quote: q70(10),
      source: ik(10, "Ibn Kathir says no close friend will ask about his friend, though he sees him, because he is worried about himself.", "He will be worried about himself and will not be able to think of others"),
      difficulty: 2,
      questions: [
        { q: "Will a friend ask about his friend that Day?", a: "No", wrong: ["Yes, always", "Only once", "Only at night"], why: "And no friend will ask a friend, though they shall be made to see one another." },
        { q: "Why does no one ask?", a: "Each worries about himself", wrong: ["They are asleep", "They cannot see", "They are busy eating"], why: "He will be worried about himself and will not be able to think of others." },
        { tf: false, q: "On that Day friends cannot see each other at all.", why: "Though they shall be made to see one another." }
      ]
    },
    {
      slug: "enough-for-himself",
      title: "Enough to worry about",
      line: "That Day, every person is busy with his own matter.",
      facts: ["Each stands alone", "Do good now"],
      quote: q70(10),
      source: ik(10, "Ibn Abbas said they will know each other, then flee from each other, as in 80:34-37.", "Every man that Day will have enough to make him careless of others"),
      difficulty: 3,
      questions: [
        { q: "What happens after people recognize each other?", a: "They flee from each other", wrong: ["They hold a feast", "They play games", "They trade"], why: "Some of them will know others. Then, they will flee from each other after that." },
        { q: "Which ayah says each has enough to worry him?", a: "80:37", wrong: ["1:1", "112:1", "2:255"], why: "Every man that Day will have enough to make him careless of others. (80:37)" },
        { tf: true, q: "A father cannot carry his son's burden that Day.", why: "A Day when no father can avail aught for his son, and nor a son avail aught for his father. (31:33)" }
      ]
    },
    {
      slug: "no-ransom",
      title: "No ransom accepted",
      line: "He would give anyone to save himself, but no ransom is accepted.",
      facts: ["Fidya: ransom", "Only deeds count"],
      quote: q70(11),
      source: ik(11, "Ibn Kathir says no ransom will be accepted from him, even all the people of the earth or the earth full of gold.", "no ransom will be accepted from him even if he brought all of the people of the earth"),
      difficulty: 2,
      questions: [
        { q: "Whom would the criminal offer as ransom?", a: "His children, wife and brother", wrong: ["Only his servants", "Only his camels", "No one"], why: "The criminal would desire to ransom himself by his children, and his wife and his brother." },
        { q: "Will any ransom be accepted?", a: "No, none", wrong: ["Yes, gold", "Yes, family", "Only a little"], why: "No ransom will be accepted from him even if he brought all of the people of the earth." },
        { tf: false, q: "Earth full of gold could buy freedom that Day.", why: "Even if it was enough gold to fill the entire earth, no ransom will be accepted." }
      ]
    },
    {
      slug: "his-fasilah",
      title: "His Fasilah",
      line: "Even his kin who sheltered him cannot save him.",
      facts: ["Fasilah: tribe and kin", "Kalla: by no means"],
      quote: q70(13),
      source: ik(13, "Mujahid and As-Suddi said his Fasilah means his tribe and his kin; Ikrimah said the branch of his tribe.", "This means his tribe and his kin"),
      difficulty: 3,
      questions: [
        { q: "What is Fasilah, per Mujahid?", a: "His tribe and kin", wrong: ["His house", "His horse", "His sword"], why: "Mujahid and As-Suddi both said, This means his tribe and his kin." },
        { q: "What is Allah's answer to the ransom wish?", a: "By no means!", wrong: ["Yes, accepted", "Maybe later", "Pay more"], why: "And all that are in the earth, so that it might save him. By no means!" },
        { tf: false, q: "A strong tribe can shelter a person on that Day.", why: "And his Fasilah who sheltered him, and all that are in the earth. By no means!" }
      ]
    },
    {
      slug: "those-who-turned-away",
      title: "Those who turned away",
      line: "The Fire calls those who turned their backs on the truth.",
      facts: ["Denying with the heart", "Leaving good deeds"],
      quote: q70(17),
      source: ik(17, "Ibn Kathir says those called are the ones who turned their backs: they denied with their hearts and left good deeds.", "they denied with their hearts and abandoned the performance of deeds with their limbs"),
      difficulty: 3,
      questions: [
        { q: "Whom does the Fire call in 70:17?", a: "Those who turned away", wrong: ["Those who prayed", "Those who gave", "The prophets"], why: "Calling all such as turn their backs and turn away their faces." },
        { q: "What did turning away mean, per Ibn Kathir?", a: "Denying and leaving good deeds", wrong: ["Moving to a new town", "Sleeping late", "Looking at the sky"], why: "They denied with their hearts and abandoned the performance of deeds with their limbs." },
        { tf: true, q: "Faith in the heart should lead to good deeds.", why: "They denied with their hearts and abandoned the performance of deeds with their limbs." }
      ]
    },
    {
      slug: "collect-and-hide",
      title: "Collect and hide",
      line: "They piled up wealth and hid it, refusing Zakah.",
      facts: ["Hoarding is blamed", "Zakah is Allah's right"],
      quote: q70(18),
      source: ik(18, "Ibn Kathir says he gathered wealth, piled it up and hid it, refusing to pay the right of Allah and the Zakah.", "he gathered wealth piling it up, and he concealed it"),
      difficulty: 2,
      questions: [
        { q: "What did they do with wealth in 70:18?", a: "Collected and hid it", wrong: ["Shared it", "Gave it all", "Lost it"], why: "And collect wealth and hide it." },
        { q: "What right did they refuse?", a: "Spending and Zakah", wrong: ["Paying rent", "Buying gifts", "Traveling"], why: "He refused to give the obligatory right of Allah that was due on it of spending and paying the Zakah." },
        { tf: false, q: "Hiding wealth to avoid Zakah is praised.", why: "He hid it and refused to give the obligatory right of Allah that was due on it." }
      ]
    },
    {
      slug: "do-not-withhold",
      title: "Do not hold back",
      line: "Do not hold back your money, or Allah holds back His blessings.",
      facts: ["Giving brings barakah", "Do not hoard"],
      quote: q70(18),
      source: hadith("bukhari", "1433", "Asma bint Abi Bakr", "Sahih", "The Prophet ﷺ told Asma: do not withhold your money, for if you did, Allah would withhold His blessings from you.", "Allah would withhold His blessings from you"),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ tell Asma?", a: "Do not withhold your money", wrong: ["Hide your money", "Spend on yourself only", "Never give"], why: "Do not withhold your money." },
        { q: "What happens if we hoard?", a: "Allah withholds His blessings", wrong: ["We get richer", "Nothing happens", "We get praise"], why: "If you did so, Allah would withhold His blessings from you." },
        { tf: true, q: "Giving in charity brings Allah's blessings.", why: "Do not withhold your money, for if you did so, Allah would withhold His blessings from you." }
      ]
    }
  ]
};

/** Ayahs 19 to 35: man is impatient, except those who pray, and the qualities of the people of Paradise. */
const MAARIJ_THREE: DeepUnit = {
  key: "maarij3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-70",
  name: "Al-Ma'arij, ayahs 19 to 35",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Ma'arij",
  lessons: [
    {
      slug: "created-impatient",
      title: "Created impatient",
      line: "Allah tells us that people are by nature very impatient.",
      facts: ["Halu: very impatient", "Know your weakness"],
      quote: q70(19),
      source: ik(19, "Ibn Kathir says Allah informs about man and his inclination to bad behavior: he was created very impatient.", "Allah informs about man and his inclination to corrupt his behavior"),
      difficulty: 1,
      questions: [
        { q: "How was man created, per 70:19?", a: "Very impatient", wrong: ["Very patient", "Never worried", "Always calm"], why: "Verily, man was created very impatient." },
        { q: "What does Allah inform us about man?", a: "His leaning to bad behavior", wrong: ["He never errs", "He is an angel", "He needs no help"], why: "Allah informs about man and his inclination to corrupt his behavior." },
        { tf: false, q: "People are naturally perfect and never impatient.", why: "Verily, man was created very impatient." }
      ]
    },
    {
      slug: "anxious-in-hardship",
      title: "Anxious in hardship",
      line: "When harm touches him, he panics and loses hope.",
      facts: ["Jazu: panic", "Hope in Allah"],
      quote: q70(20),
      source: ik(20, "Ibn Kathir says when harm touches him he is frightened and worried, despairing of any good after it.", "he is frightful, worried and completely taken back"),
      difficulty: 2,
      questions: [
        { q: "How is man when evil touches him?", a: "Apprehensive and worried", wrong: ["Calm and thankful", "Happy", "Careless"], why: "Apprehensive when evil touches him." },
        { q: "What does he despair of?", a: "Any good after it", wrong: ["Losing money", "His friends", "Rain"], why: "His despair that he will receive any good after it." },
        { tf: true, q: "Panic and despair in hardship are blamed traits.", why: "Whenever any harm touches him he is frightful, worried and completely taken back." }
      ]
    },
    {
      slug: "stingy-in-ease",
      title: "Stingy in ease",
      line: "When good comes to him, he keeps it and will not share.",
      facts: ["Manu: withholding", "Share your blessings"],
      quote: q70(21),
      source: ik(21, "Ibn Kathir says if he gets a blessing from Allah he is stingy with it and withholds Allah's right in it.", "he is stingy with it, not sharing it with others"),
      difficulty: 2,
      questions: [
        { q: "How is man when good touches him?", a: "Withholding", wrong: ["Generous", "Thankful", "Humble"], why: "And suppressive when good touches him." },
        { q: "What does he do with a blessing?", a: "Keeps it from others", wrong: ["Shares it all", "Gives it away", "Forgets it"], why: "If he attains any blessing from Allah, he is stingy with it, not sharing it with others." },
        { tf: false, q: "Being stingy with blessings fulfils Allah's right.", why: "He will withhold the right of Allah with that blessing." }
      ]
    },
    {
      slug: "worst-traits",
      title: "Two bad traits",
      line: "The Prophet ﷺ warned of greedy stinginess and wild cowardice.",
      facts: ["Shuhh: greed", "Jubn: cowardice"],
      quote: q70(21),
      source: hadith("abudawud", "2511", "Abu Hurairah", "Sahih", "The Prophet ﷺ said the evil in a man is alarming stinginess and unrestrained cowardice.", "What is evil in a man are alarming niggardliness and unrestrained cowardice"),
      difficulty: 3,
      questions: [
        { q: "Which two traits did the Prophet ﷺ call evil?", a: "Stinginess and cowardice", wrong: ["Laughing and singing", "Sleeping and eating", "Walking and talking"], why: "What is evil in a man are alarming niggardliness and unrestrained cowardice." },
        { q: "What kind of stinginess is warned about?", a: "Alarming stinginess", wrong: ["Small savings", "Careful planning", "Paying debts"], why: "Alarming niggardliness and unrestrained cowardice." },
        { tf: true, q: "Greedy stinginess is a bad quality.", why: "What is evil in a man are alarming niggardliness and unrestrained cowardice." }
      ]
    },
    {
      slug: "except-those-who-pray",
      title: "Except those who pray",
      line: "Those who pray are saved from these bad traits.",
      facts: ["Salah protects", "Allah guides to good"],
      quote: q70(22),
      source: ik(22, "Ibn Kathir says man has these blameworthy traits except those whom Allah protects and guides, and these are those who pray.", "these are those people who perform Salah"),
      difficulty: 2,
      questions: [
        { q: "Who are excepted in 70:22?", a: "Those devoted to Salah", wrong: ["The rich", "The strong", "The famous"], why: "Except those who are devoted to Salah." },
        { q: "Who protects them from bad traits?", a: "Allah", wrong: ["Their tribe", "Their money", "Luck"], why: "Except for he whom Allah protects, helps and guides to good, and these are those people who perform Salah." },
        { tf: false, q: "Prayer has no effect on character.", why: "Man is described with blameworthy characteristics except for those people who perform Salah." }
      ]
    },
    {
      slug: "thankful-and-patient",
      title: "Thankful and patient",
      line: "Those who pray give thanks in good times, patience in hard.",
      facts: ["As-Sa'di explains", "Shukr and sabr"],
      quote: q70(22),
      source: saadi(70, 22, "As-Sa'di says the people of prayer are unlike the impatient: when good touches them they thank Allah and spend, and when harm touches them they are patient.", "فإنهم إذا مسهم الخير شكروا الله"),
      difficulty: 2,
      questions: [
        { q: "What do the people of prayer do in good times?", a: "Thank Allah and spend", wrong: ["Hold back", "Boast", "Forget Allah"], why: "They thank Allah and spend from what He gave, says as-Sa'di." },
        { q: "And in hard times?", a: "They are patient", wrong: ["They panic", "They give up", "They blame others"], why: "When harm touches them, they are patient." },
        { tf: true, q: "Prayer helps cure impatience and stinginess.", why: "As-Sa'di on 70:22." }
      ]
    },
    {
      slug: "constant-in-prayer",
      title: "Constant in prayer",
      line: "They keep up their prayers on time, every time.",
      facts: ["Daimun: constant", "Guard prayer times"],
      quote: q70(23),
      source: ik(23, "Ibn Masud, Masruq and Ibrahim An-Nakhai said Daimun means they guard its times and its obligatory parts.", "they guard its times and the elements obligatory in it"),
      difficulty: 2,
      questions: [
        { q: "What does Daimun mean, per Ibn Masud?", a: "Guarding prayer times", wrong: ["Praying once a year", "Praying fast", "Praying loudly"], why: "This means they guard its times and the elements obligatory in it." },
        { q: "What else do they guard in prayer?", a: "Its obligatory parts", wrong: ["Their shoes", "Their phones", "Their food"], why: "They guard its times and the elements obligatory in it." },
        { tf: true, q: "Praying on time is part of being constant in Salah.", why: "They guard its times and the elements obligatory in it." }
      ]
    },
    {
      slug: "calm-in-prayer",
      title: "Calm in prayer",
      line: "Pray with stillness, not pecking quickly like a crow.",
      facts: ["Tumaninah: stillness", "Do not rush"],
      quote: q70(23),
      source: ik(23, "Ibn Kathir says Daim is also used for still water, which proves stillness is required in prayer, unlike pecking like a crow.", "This proves the obligation of having tranquility in the prayer"),
      difficulty: 3,
      questions: [
        { q: "What does Daimun also point to?", a: "Stillness in prayer", wrong: ["Loud voice", "Long sleeves", "Fast movement"], why: "This proves the obligation of having tranquility in the prayer." },
        { q: "What should prayer not be like?", a: "A crow pecking", wrong: ["A calm lake", "A tall tree", "A quiet room"], why: "Rather he pecks in it quickly like the pecking of the crow." },
        { tf: false, q: "Rushing through ruku and sujud is fine.", why: "The one who does not have stillness in his bowing and prostrating is not being constant in his prayer." }
      ]
    },
    {
      slug: "small-but-constant",
      title: "Small but constant",
      line: "Allah loves deeds done regularly, even if they are small.",
      facts: ["Little but lasting", "Do what you can"],
      quote: q70(23),
      source: hadith("bukhari", "6465", "Aishah", "Sahih", "The Prophet ﷺ was asked what deeds Allah loves most. He said the most regular, constant deeds, even if few.", "The most regular constant deeds even though they may be few"),
      difficulty: 2,
      questions: [
        { q: "Which deeds does Allah love most?", a: "Regular, constant ones", wrong: ["Rare big ones", "Showy ones", "Ones done once"], why: "The most regular constant deeds even though they may be few." },
        { q: "What else did he advise?", a: "Do what is in your ability", wrong: ["Do too much", "Do nothing", "Copy others"], why: "Do not take upon yourselves, except the deeds which are within your ability." },
        { tf: true, q: "A small deed done daily is beloved to Allah.", why: "The most regular constant deeds even though they may be few." }
      ]
    },
    {
      slug: "a-known-right",
      title: "A known right",
      line: "Their wealth has a set share for the asker and the deprived.",
      facts: ["As-Sail: one who asks", "Al-Mahrum: the deprived"],
      quote: q70(24),
      source: ik(24, "Ibn Kathir says in their wealth is a determined portion for those who are in need.", "in their wealth is a determined portion for those who are in need"),
      difficulty: 2,
      questions: [
        { q: "What is in their wealth, per 70:24?", a: "A recognized right", wrong: ["A secret lock", "Nothing for others", "Only debts"], why: "And those in whose wealth there is a recognized right." },
        { q: "For whom is that right?", a: "The asker and the deprived", wrong: ["The rich", "Their rivals", "The king"], why: "For the one who asks, and for the deprived." },
        { tf: false, q: "The poor have no share in a believer's wealth.", why: "In their wealth is a determined portion for those who are in need." }
      ]
    },
    {
      slug: "the-quiet-needy",
      title: "The quiet needy",
      line: "Al-mahrum: the needy one who does not ask and goes unseen.",
      facts: ["As-Sa'di explains", "Look for them"],
      quote: q70(25),
      source: saadi(70, 25, "As-Sa'di says al-mahrum is the poor person who does not ask people and is not noticed, so no one gives to him; the believers' wealth has a share for him too.", "وهو المسكين الذي لا يسأل الناس فيعطوه، ولا يفطن له فيتصدق عليه"),
      difficulty: 2,
      questions: [
        { q: "Who is al-mahrum, per as-Sa'di?", a: "A needy person who does not ask", wrong: ["A rich trader", "A beggar who shouts", "A king"], why: "He does not ask and is not noticed, says as-Sa'di." },
        { q: "Why does al-mahrum often get nothing?", a: "No one notices him", wrong: ["He is rich", "He refuses all help", "He lives far away"], why: "He is not noticed, so no one gives to him." },
        { tf: true, q: "We should look out for needy people who stay quiet.", why: "As-Sa'di on 70:25." }
      ]
    },
    {
      slug: "believe-in-recompense",
      title: "Sure of the Recompense",
      line: "They believe in the Day of Recompense, so they act for it.",
      facts: ["Yawm ad-Din: the Day of Recompense", "Hope and fear"],
      quote: q70(26),
      source: ik(26, "Ibn Kathir says they are sure of the return, the Reckoning and the Recompense, so they act as one who hopes for reward and fears punishment.", "they perform the deeds of one who hopes for the reward and fears the punishment"),
      difficulty: 2,
      questions: [
        { q: "In what do they believe in 70:26?", a: "The Day of Recompense", wrong: ["Luck", "Stars", "Magic"], why: "And those who believe in the Day of Recompense." },
        { q: "How does that belief change their deeds?", a: "They hope reward, fear punishment", wrong: ["They stop working", "They boast", "They forget"], why: "They perform the deeds of one who hopes for the reward and fears the punishment." },
        { tf: true, q: "Belief in the Hereafter shapes how we act.", why: "Therefore, they perform the deeds of one who hopes for the reward and fears the punishment." }
      ]
    },
    {
      slug: "none-feel-secure",
      title: "No one feels safe",
      line: "They fear Allah's punishment; only Allah gives safety.",
      facts: ["Khawf: fear of Allah", "Safety is from Allah"],
      quote: q70(28),
      source: ik(28, "Ibn Kathir says no one is safe from it, except by the security that Allah Himself gives.", "except by the security of Allah Himself"),
      difficulty: 3,
      questions: [
        { q: "How do they feel about Allah's punishment?", a: "Fearful", wrong: ["Careless", "Mocking", "Bored"], why: "And those who fear the torment of their Lord, meaning, they are fearful and dreadful." },
        { q: "Who gives true safety?", a: "Allah Himself", wrong: ["Our own deeds alone", "Our friends", "Our wealth"], why: "No one is safe from it, except by the security of Allah Himself." },
        { tf: false, q: "A person can be sure he is safe without Allah.", why: "Verily, the torment of their Lord is that before which none can feel secure." }
      ]
    },
    {
      slug: "trusts-and-promises",
      title: "Trusts and promises",
      line: "They keep what is trusted to them and never break a promise.",
      facts: ["Amanah: trust", "Ahd: covenant"],
      quote: q70(32),
      source: ik(32, "Ibn Kathir says if they are given a trust they do not betray it, and when they make a covenant they do not break it.", "if they are given a trust they do not deceit and when they make a covenant they do not break it"),
      difficulty: 2,
      questions: [
        { q: "What do they keep, per 70:32?", a: "Trusts and covenants", wrong: ["Secrets of others", "Old clothes", "Grudges"], why: "And those who keep their trusts and covenants." },
        { q: "Whose traits are the opposite?", a: "The hypocrites", wrong: ["The angels", "The prophets", "The children"], why: "These are the characteristics of the believers which are opposite of the characteristics of the hypocrites." },
        { tf: false, q: "Breaking a promise is a believer's trait.", why: "When they make a covenant they do not break it." }
      ]
    },
    {
      slug: "signs-of-a-hypocrite",
      title: "Signs of a hypocrite",
      line: "A hypocrite lies, breaks his promises and betrays trust.",
      facts: ["Nifaq: hypocrisy", "Be truthful and loyal"],
      quote: q70(32),
      source: hadith("bukhari", "33", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said the signs of a hypocrite are three: he lies when he speaks, breaks his promise, and betrays a trust.", "The signs of a hypocrite are three"),
      difficulty: 2,
      questions: [
        { q: "How many signs of a hypocrite are named?", a: "Three", wrong: ["One", "Five", "Ten"], why: "The signs of a hypocrite are three." },
        { q: "Which is one of the signs?", a: "Breaking promises", wrong: ["Praying often", "Giving charity", "Smiling"], why: "Whenever he promises, he always breaks it." },
        { tf: true, q: "Lying is a sign of hypocrisy.", why: "Whenever he speaks, he tells a lie." }
      ]
    },
    {
      slug: "firm-in-testimony",
      title: "Firm in testimony",
      line: "They give true witness, adding nothing and hiding nothing.",
      facts: ["Shahadah: testimony", "Honesty in witness"],
      quote: q70(33),
      source: ik(33, "Ibn Kathir says they guard their testimonies: they do not add or decrease or hide them, as in 2:283.", "They do not add or decrease from what they testify to nor do they conceal their testimonies"),
      difficulty: 3,
      questions: [
        { q: "How do they give testimony?", a: "Firmly and honestly", wrong: ["With lies", "Only for money", "Never"], why: "And those who stand firm in their testimonies." },
        { q: "What do they never do with testimony?", a: "Add, remove or hide", wrong: ["Speak it", "Write it", "Remember it"], why: "They do not add or decrease from what they testify to nor do they conceal their testimonies." },
        { tf: false, q: "Hiding a testimony is a small matter.", why: "Who hides it, surely, his heart is sinful. (2:283)" }
      ]
    },
    {
      slug: "guarding-prayer",
      title: "Guarding the prayer",
      line: "The list begins and ends with prayer, showing its importance.",
      facts: ["Yuhafizun: they guard", "Prayer first and last"],
      quote: q70(34),
      source: ik(34, "Ibn Kathir says they keep its times, pillars, obligations and recommended acts; Allah begins and ends with prayer to show its importance.", "they maintain its proper times, its pillars, its obligations and its recommended acts"),
      difficulty: 2,
      questions: [
        { q: "What do they guard in 70:34?", a: "Their Salah", wrong: ["Their gold", "Their land", "Their fame"], why: "And those who are with their Salah, Yuhafizun." },
        { q: "Why does the list start and end with prayer?", a: "To show its importance", wrong: ["By chance", "To be short", "For rhyme only"], why: "Allah begins this discussion with prayer and He concludes it with prayer. This proves the importance of it." },
        { tf: true, q: "Guarding prayer includes its pillars and recommended acts.", why: "They maintain its proper times, its pillars, its obligations and its recommended acts." }
      ]
    },
    {
      slug: "honored-in-gardens",
      title: "Honored in the Gardens",
      line: "Such people will live in the Gardens, honored with delights.",
      facts: ["Mukramun: honored", "Reward of good traits"],
      quote: q70(35),
      source: ik(35, "Ibn Kathir says they will be honored with various types of pleasures and delights, like 23:10-11.", "they will be honored with various types of pleasures and delights"),
      difficulty: 1,
      questions: [
        { q: "Where will such people dwell?", a: "In the Gardens", wrong: ["In a desert", "In a cave", "On a ship"], why: "Such shall dwell in the Gardens, honored." },
        { q: "How will they be treated?", a: "With honor and delights", wrong: ["Ignored", "Questioned forever", "Sent away"], why: "They will be honored with various types of pleasures and delights." },
        { tf: false, q: "Good qualities have no reward in the Hereafter.", why: "Such shall dwell in the Gardens, honored." }
      ]
    }
  ]
};

/** Ayahs 36 to 44: the deniers who ran from the Prophet ﷺ, Allah's power to bring back, and the Day they were promised. */
const MAARIJ_FOUR: DeepUnit = {
  key: "maarij4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-70",
  name: "Al-Ma'arij, ayahs 36 to 44",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Ma'arij",
  lessons: [
    {
      slug: "running-from-guidance",
      title: "Running from guidance",
      line: "Deniers saw the Prophet ﷺ and his miracles, yet ran away.",
      facts: ["Muhtiin: rushing off", "Guidance was near them"],
      quote: q70(36),
      source: ik(36, "Ibn Kathir says they saw the Prophet ﷺ, the guidance and the miracles, then fled from him right and left, group by group.", "They fled right and left, group by group and party by party"),
      difficulty: 2,
      questions: [
        { q: "What did the deniers do near the Prophet ﷺ?", a: "Ran away from him", wrong: ["Sat to learn", "Helped him", "Prayed with him"], why: "They fled from him and separated themselves from him." },
        { q: "What did they witness first?", a: "Guidance and miracles", wrong: ["Nothing at all", "Only stories", "Only wealth"], why: "They witnessed the magnificent miracles Allah aided him with." },
        { tf: false, q: "They ran away because they had seen no proof.", why: "They witnessed the magnificent miracles Allah aided him with. Then they fled from him." }
      ]
    },
    {
      slug: "in-scattered-groups",
      title: "In scattered groups",
      line: "Izin means scattered groups, right and left.",
      facts: ["Izin: groups apart", "Unity in rows"],
      quote: q70(37),
      source: hadith("muslim", "430", "Jabir ibn Samurah", "Sahih", "The Prophet ﷺ saw people sitting in circles and said: How is it that I see you in separate groups? He told them to form rows like the angels.", "is it that I see you in separate groups"),
      difficulty: 3,
      questions: [
        { q: "What did Ibn Abbas say Al-Izin is?", a: "A group among the people", wrong: ["A tall tree", "A long road", "A deep well"], why: "Ibn Abbas said, Al-Izin is a group among the people." },
        { q: "What did the Prophet ﷺ ask people to form?", a: "Rows like the angels", wrong: ["Small circles", "Long lines to trade", "Separate camps"], why: "Why do not you draw yourselves up in rows as angels do in the presence of their Lord?" },
        { tf: true, q: "The Prophet ﷺ disliked seeing people split into groups.", why: "How is it that I see you in separate groups?" }
      ]
    },
    {
      slug: "hoping-for-paradise",
      title: "Hoping for Paradise?",
      line: "They fled the truth, yet hoped to enter Paradise. By no means!",
      facts: ["Wishes need deeds", "Kalla: by no means"],
      quote: q70(38),
      source: ik(38, "Ibn Kathir asks: they flee from the Messenger ﷺ in aversion to the truth, yet are they hoping to enter the Gardens of Delight?", "Are they hoping that they will be admitted into the Gardens of Delight"),
      difficulty: 2,
      questions: [
        { q: "What did each of them hope for?", a: "The Paradise of Delight", wrong: ["A palace on earth", "A long life", "A big farm"], why: "Does every man of them hope to enter the Paradise of Delight?" },
        { q: "What is Allah's answer?", a: "But no!", wrong: ["Yes, surely", "Maybe", "Later"], why: "Does every man of them hope to enter the Paradise of Delight? But no!" },
        { tf: false, q: "Running from the truth earns Paradise.", why: "They flee from the Messenger ﷺ in aversion to the truth? Are they hoping to be admitted into the Gardens of Delight? Nay." }
      ]
    },
    {
      slug: "created-from-what-they-know",
      title: "Created from what they know",
      line: "Allah made them once, so bringing them back is easier.",
      facts: ["First creation proves the second", "Resurrection is easy for Allah"],
      quote: q70(39),
      source: ik(39, "Ibn Kathir says Allah mentions the start of creation as proof, since repeating it is easier than doing it the first time.", "repeating the process is something easier than performing it the first time"),
      difficulty: 3,
      questions: [
        { q: "What proof does 70:39 give?", a: "Their own creation", wrong: ["The weather", "The market", "A dream"], why: "Allah mentions the initiation of creation, and that repeating the process is something easier." },
        { q: "Which is easier, per Ibn Kathir?", a: "Bringing back", wrong: ["Creating first", "Neither", "Both are impossible"], why: "Repeating the process is something easier than performing it the first time." },
        { tf: true, q: "The deniers themselves admit Allah created them.", why: "This is something that they themselves confess to." }
      ]
    },
    {
      slug: "lord-of-easts-and-wests",
      title: "Lord of the easts and wests",
      line: "Allah swears by the Lord of every sunrise and sunset point.",
      facts: ["Mashariq: the easts", "Stars rise and set by His command"],
      quote: q70(40),
      source: ik(40, "Ibn Kathir says the Lord of the easts and wests created the heavens and earth and made the stars appear in the east and vanish in the west.", "He is the One Who subjected the stars causing them to appear in the eastern parts of the sky and vanish in the western parts of it"),
      difficulty: 3,
      questions: [
        { q: "By Whom does Allah swear in 70:40?", a: "The Lord of the easts and wests", wrong: ["The moon", "The pen", "The fig"], why: "But no! I swear by the Lord of the easts and the wests." },
        { q: "What does Allah do with the stars?", a: "Makes them rise and set", wrong: ["Hides them forever", "Lets them fall", "Nothing"], why: "He is the One Who subjected the stars causing them to appear in the eastern parts of the sky and vanish in the western parts." },
        { tf: false, q: "The oath supports the deniers' claim.", why: "He is swearing by a denial of their claim. This is a refutation of their false claim of rejecting the Day of Judgement." }
      ]
    },
    {
      slug: "heavens-are-greater",
      title: "The heavens are greater",
      line: "Making the heavens is greater than making people again.",
      facts: ["Look at the sky", "Allah is able"],
      quote: q70(40),
      source: ik(40, "Ibn Kathir cites 40:57: the creation of the heavens and earth is greater than the creation of mankind.", "The creation of the heavens and the earth is indeed greater than the creation of mankind"),
      difficulty: 2,
      questions: [
        { q: "What is greater than creating mankind?", a: "Creating heavens and earth", wrong: ["Building a house", "Writing a book", "Planting a tree"], why: "The creation of the heavens and the earth is indeed greater than the creation of mankind. (40:57)" },
        { q: "What did Allah say to a thing He wills?", a: "Be! and it is", wrong: ["Wait", "Maybe", "Try again"], why: "His command, when He intends a thing, is only that He says to it, Be!, and it is! (36:82)" },
        { tf: true, q: "Allah was not tired by creating the heavens and the earth.", why: "Allah, Who created the heavens and the earth, and was not wearied by their creation. (46:33)" }
      ]
    },
    {
      slug: "not-to-be-outrun",
      title: "Allah is never unable",
      line: "Allah can bring them back in better bodies; nothing escapes Him.",
      facts: ["Masbuqin: outrun", "Allah's power is complete"],
      quote: q70(41),
      source: ik(41, "Ibn Kathir says on the Day of Judgement Allah will bring them back in better bodies, and He is not to be outrun, meaning not unable.", "We are not unable"),
      difficulty: 3,
      questions: [
        { q: "How will Allah bring them back?", a: "In better bodies", wrong: ["As animals", "As shadows", "Not at all"], why: "On the Day of Judgement We will bring them back in bodies that are better than these bodies." },
        { q: "What does not to be outrun mean?", a: "Allah is not unable", wrong: ["Allah is slow", "Allah forgets", "Allah waits"], why: "And We are not to be outrun, meaning, We are not unable." },
        { tf: false, q: "Something could escape Allah's power.", why: "And We are not to be outrun, meaning, We are not unable." }
      ]
    },
    {
      slug: "leave-them-for-now",
      title: "Leave them for now",
      line: "Leave them in idle talk until they meet their promised Day.",
      facts: ["The Day will come", "Truth wins in the end"],
      quote: q70(42),
      source: ik(42, "Ibn Kathir says leave them in their denial, disbelief and stubbornness until they meet their promised Day.", "leave them in their denial, disbelief and obstinance"),
      difficulty: 2,
      questions: [
        { q: "What does 70:42 tell the Prophet ﷺ?", a: "Leave them for now", wrong: ["Force them", "Pay them", "Join them"], why: "So, leave them to plunge in vain talk and play about." },
        { q: "Until when?", a: "They meet their promised Day", wrong: ["Next week", "Harvest time", "Forever"], why: "Until they meet their Day which they are promised." },
        { tf: true, q: "The deniers will meet the result of their choice.", why: "They are going to know the outcome of that and taste its evil consequences." }
      ]
    },
    {
      slug: "rushing-from-graves",
      title: "Rushing from the graves",
      line: "They rise from the graves, rushing as if to a flag.",
      facts: ["Nusub: a set-up mark", "All answer the call"],
      quote: q70(43),
      source: ik(43, "Ibn Abbas, Mujahid and Ad-Dahhak said they rush as if toward a flag; others said toward a goal.", "As if they were rushing towards a flag"),
      difficulty: 2,
      questions: [
        { q: "How do they come out of the graves?", a: "Quickly", wrong: ["Slowly", "Never", "Asleep"], why: "The Day when they will come out of the graves quickly as racing to a Nusub." },
        { q: "Toward what, per Ibn Abbas?", a: "A flag", wrong: ["A river", "A tree", "A house"], why: "Ibn Abbas, Mujahid and Ad-Dahhak, all said, As if they were rushing towards a flag." },
        { tf: false, q: "People can refuse to rise when Allah calls.", why: "They will stand up out of their graves when the Lord calls them to the place of the reckoning." }
      ]
    },
    {
      slug: "eyes-lowered",
      title: "Eyes lowered",
      line: "Their eyes are lowered, humbled for their pride in this life.",
      facts: ["Pride brings humiliation", "Be humble now"],
      quote: q70(44),
      source: ik(44, "Ibn Kathir says they are humbled in return for how they behaved arrogantly in the world by refusing to obey.", "in return for how they behaved arrogantly in the worldly life by refusing to be obedient"),
      difficulty: 2,
      questions: [
        { q: "How are their eyes on that Day?", a: "Lowered and humbled", wrong: ["Proud and high", "Closed in sleep", "Laughing"], why: "With their eyes lowered in fear, meaning humbled." },
        { q: "Why are they humbled?", a: "For their arrogance before", wrong: ["For being poor", "For being late", "For no reason"], why: "In return for how they behaved arrogantly in the worldly life by refusing to be obedient." },
        { tf: true, q: "Al-Ma'arij ends: That is the Day which they were promised.", why: "That is the Day which they were promised!" }
      ]
    }
  ]
};

export const MAARIJ_UNITS: readonly DeepUnit[] = [MAARIJ_ONE, MAARIJ_TWO, MAARIJ_THREE, MAARIJ_FOUR];
