import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Ash-Shura ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Ash-Shura 42:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_42_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Ash-Shura 42:${ayah}`,
    url: `https://quran.com/42:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 42:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q42 = (ayah: number) => quranQuote(42, ayah);

/** Ayahs 1 to 18: revelation from the Almighty, the warning to Makkah, nothing is like Him, one religion for all the Messengers, and the Balance. */
const SHURA_ONE: DeepUnit = {
  key: "shura1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-42",
  name: "Ash-Shura, ayahs 1 to 18",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ash-Shura",
  lessons: [
    {
      slug: "ha-mim-opens-shura",
      title: "Ha Mim opens Ash-Shura",
      line: "Ash-Shura opens with Ha Mim, like the surahs just before it.",
      facts: ["Ash-Shura means The Consultation", "Ibn Kathir explained these letters before"],
      quote: q42(1),
      source: ik(1, "Ibn Kathir says the individual letters at the start of surahs were already discussed earlier in his tafsir.", "We have previously discussed the individual letters"),
      difficulty: 1,
      questions: [
        { q: "Which letters open Ash-Shura, in 42:1?", a: "Ha Mim", wrong: ["Alif Lam Mim", "Ta Ha", "Ya Sin"], why: "The surah opens: Ha Mim." },
        { q: "What does Ash-Shura mean?", a: "The Consultation", wrong: ["The Cave", "The Moon", "The Bee"], why: "Ash-Shura means consultation, named after 42:38." },
        { tf: true, q: "Ash-Shura is one of the Ha Mim surahs.", why: "Like Ghafir and Fussilat before it, Ash-Shura opens with Ha Mim." }
      ]
    },
    {
      slug: "ain-sin-qaf",
      title: "Ain Sin Qaf",
      line: "The second ayah is three more letters: Ain Sin Qaf.",
      facts: ["Five letters across two ayahs", "Recited letter by letter"],
      quote: q42(2),
      source: ik(2, "Ibn Kathir lists the second ayah of Ash-Shura as the letters Ain Sin Qaf.", "Ain Sin Qaf"),
      difficulty: 1,
      questions: [
        { q: "Which letters are in 42:2?", a: "Ain Sin Qaf", wrong: ["Ha Mim", "Ta Sin Mim", "Alif Lam Ra"], why: "The second ayah is: Ain Sin Qaf." },
        { q: "How many letters open Ash-Shura in total?", a: "Five", wrong: ["Two", "Three", "Seven"], why: "Ha Mim, then Ain Sin Qaf: five letters in all." },
        { tf: true, q: "The opening letters come in two separate ayahs.", why: "Ha Mim is ayah 1, and Ain Sin Qaf is ayah 2." }
      ]
    },
    {
      slug: "revelation-like-before",
      title: "Revelation, as before",
      line: "Allah sends revelation to you as He did to those before you.",
      facts: ["Like the ringing of a bell", "Sometimes the angel came as a man"],
      quote: q42(3),
      source: hadith("bukhari", "2", "Aishah", "Sahih", "The Prophet ﷺ was asked how revelation came. He said sometimes like the ringing of a bell, the hardest form, and sometimes the angel came as a man.", "like the ringing of a bell, this form of Inspiration is the hardest of all"),
      difficulty: 2,
      questions: [
        { q: "To whom else was revelation sent, in 42:3?", a: "Those before you", wrong: ["No one", "Only kings", "Only poets"], why: "Likewise Allah sends revelation to you as to those before you." },
        { q: "Which form was hardest, per Bukhari 2?", a: "Like the ringing of a bell", wrong: ["In a dream", "From a book", "From a friend"], why: "Sometimes it is like the ringing of a bell; this form is the hardest of all." },
        { q: "What did Aishah see on a cold day?", a: "Sweat on his forehead", wrong: ["Snow on his robe", "Tears of joy", "A bright light"], why: "She saw the sweat dropping from his forehead after the revelation." }
      ]
    },
    {
      slug: "most-high-most-great",
      title: "The Most High, the Most Great",
      line: "All in the heavens and earth belongs to Allah, Most High.",
      facts: ["Everything is under His control", "He is the Most Great"],
      quote: q42(4),
      source: ik(4, "Ibn Kathir says everything in the heavens and the earth is subject to His dominion and control.", "everything is subject to His dominion and control"),
      difficulty: 1,
      questions: [
        { q: "Which two names end 42:4?", a: "The Most High, the Most Great", wrong: ["The First, the Last", "The King, the Holy", "The Strong, the Firm"], why: "And He is the Most High, the Most Great." },
        { q: "What belongs to Allah, in 42:4?", a: "All in the heavens and earth", wrong: ["Only the sky", "Only Makkah", "Only the angels"], why: "To Him belongs all that is in the heavens and all that is on the earth." },
        { tf: true, q: "Everything is subject to Allah's control.", why: "Ibn Kathir: everything is subject to His dominion and control." }
      ]
    },
    {
      slug: "heavens-nearly-split",
      title: "The heavens nearly split",
      line: "The heavens nearly split in awe; angels ask forgiveness for us.",
      facts: ["Out of fear of His might", "Angels pray for people on earth"],
      quote: q42(5),
      source: ik(5, "Ibn Abbas and others said the heavens nearly split out of fear of His might.", "Out of fear of His might"),
      difficulty: 2,
      questions: [
        { q: "Why do the heavens nearly split, per Ibn Abbas?", a: "Out of fear of His might", wrong: ["From heat", "From age", "From storms"], why: "Ibn Abbas and others said: out of fear of His might." },
        { q: "What do the angels ask for, in 42:5?", a: "Forgiveness for those on earth", wrong: ["Rest", "Food", "Rain for themselves"], why: "And the angels ask for forgiveness for those on the earth." },
        { q: "Which names end 42:5?", a: "The Oft-Forgiving, the Most Merciful", wrong: ["The Strong, the Firm", "The First, the Last", "The King, the Holy"], why: "Verily, Allah is the Oft-Forgiving, the Most Merciful." }
      ]
    },
    {
      slug: "allah-watches-over-them",
      title: "Allah watches over them",
      line: "Allah keeps count of those who take other protectors.",
      facts: ["He records every deed", "The Prophet ﷺ was a warner"],
      quote: q42(6),
      source: ik(6, "Ibn Kathir says Allah witnesses and records their deeds, and the Prophet ﷺ is only a warner while Allah is the Trustee.", "you are just a warner, and Allah is the Trustee of all affairs"),
      difficulty: 2,
      questions: [
        { q: "What is Allah over them, in 42:6?", a: "Hafiz, watching over them", wrong: ["Far from them", "Unaware", "Asleep"], why: "Allah is Hafiz over them." },
        { q: "What was the Prophet ﷺ, per Ibn Kathir?", a: "Just a warner", wrong: ["Their guard", "Their judge", "Their trustee"], why: "You are just a warner, and Allah is the Trustee of all affairs." },
        { tf: false, q: "The Prophet ﷺ was made a trustee over the idolaters.", why: "And you are not a trustee over them." }
      ]
    },
    {
      slug: "warn-the-mother-of-towns",
      title: "Warn the Mother of Towns",
      line: "The Quran came in Arabic to warn Makkah and all around it.",
      facts: ["Mother of the Towns is Makkah", "All around means east and west"],
      quote: q42(7),
      source: ik(7, "Ibn Kathir says the Mother of the Towns is Makkah, and all around it means all lands, east and west.", "all the lands, east and west"),
      difficulty: 2,
      questions: [
        { q: "What is the Mother of the Towns?", a: "Makkah", wrong: ["Madinah", "Jerusalem", "Taif"], why: "Ibn Kathir says the Mother of the Towns is Makkah." },
        { q: "What does all around it mean, per Ibn Kathir?", a: "All the lands, east and west", wrong: ["Only Arabia", "Only the hills", "Only one city"], why: "And all around it means all the lands, east and west." },
        { q: "What Day is there no doubt about, in 42:7?", a: "The Day of Assembling", wrong: ["A market day", "A feast day", "A war day"], why: "And warn them of the Day of Assembling of which there is no doubt." }
      ]
    },
    {
      slug: "one-nation-if-he-willed",
      title: "One nation if He willed",
      line: "Had Allah willed, all would be one nation; He has wisdom.",
      facts: ["He admits whom He wills to mercy", "Wrongdoers have no helper"],
      quote: q42(8),
      source: ik(8, "Ibn Kathir says Allah made people different, guiding and leaving astray by His complete wisdom and perfect proof.", "He has complete wisdom and perfect proof"),
      difficulty: 2,
      questions: [
        { q: "What could Allah have done, in 42:8?", a: "Made them one nation", wrong: ["Made no people", "Made them angels", "Made them stars"], why: "And if Allah had willed, He could have made them one nation." },
        { q: "What does Allah have in His choices, per Ibn Kathir?", a: "Complete wisdom and perfect proof", wrong: ["Chance", "Haste", "Doubt"], why: "He has complete wisdom and perfect proof." },
        { tf: true, q: "Wrongdoers will have no protector or helper.", why: "And the wrongdoers will have neither a protector nor a helper." }
      ]
    },
    {
      slug: "allah-alone-is-protector",
      title: "He alone is the Protector",
      line: "Allah alone is the Protector, and He gives life to the dead.",
      facts: ["Other protectors are false", "He is Able to do all things"],
      quote: q42(9),
      source: ik(9, "Ibn Kathir says Allah denounces taking other gods; He alone is able to bring the dead back to life.", "He is the One Who is able to bring the dead back to life"),
      difficulty: 2,
      questions: [
        { q: "Who alone is the Protector, in 42:9?", a: "Allah", wrong: ["Idols", "Kings", "Stars"], why: "But Allah, He Alone is the Protector." },
        { q: "What can Allah do with the dead?", a: "Give them life", wrong: ["Nothing", "Only bury them", "Forget them"], why: "And He Who gives life to the dead, and He is Able to do all things." },
        { tf: false, q: "Worshipping others besides Allah is allowed.", why: "Ibn Kathir: it is not right to worship anyone except Him Alone." }
      ]
    },
    {
      slug: "decision-is-with-allah",
      title: "The decision is with Allah",
      line: "When we differ, we turn to Allah's Book and the Sunnah.",
      facts: ["He is the Judge of all things", "Trust Him and turn to Him"],
      quote: q42(10),
      source: ik(10, "Ibn Kathir says whatever we differ over is judged by Allah's Book and the Sunnah, like 4:59.", "according to His Book and the Sunnah"),
      difficulty: 2,
      questions: [
        { q: "With whom is the decision on differences, in 42:10?", a: "With Allah", wrong: ["With the crowd", "With elders only", "With the rich"], why: "And in whatsoever you differ, the decision thereof is with Allah." },
        { q: "How does Allah judge them, per Ibn Kathir?", a: "By His Book and the Sunnah", wrong: ["By customs", "By votes", "By dreams"], why: "He is the Judge of that, according to His Book and the Sunnah." },
        { q: "Which ayah does Ibn Kathir link to 42:10?", a: "4:59, refer it to Allah and His Messenger", wrong: ["2:255", "112:1", "1:1"], why: "If you differ in anything, refer it to Allah and His Messenger (4:59)." }
      ]
    },
    {
      slug: "nothing-like-him",
      title: "Nothing is like Him",
      line: "There is nothing like Him; He is the All-Hearer, All-Seer.",
      facts: ["He made pairs of people and cattle", "He has no equal"],
      quote: q42(11),
      source: ik(11, "Ibn Kathir says nothing is like the Creator of the pairs; He is Unique, with no peer or equal.", "there is nothing like the Creator of these pairs"),
      difficulty: 2,
      questions: [
        { q: "What does 42:11 say about Allah?", a: "There is nothing like Him", wrong: ["He is like a king", "He is like light", "He is like a man"], why: "There is nothing like Him, and He is the All-Hearer, the All-Seer." },
        { q: "What did He make for us, in 42:11?", a: "Mates from ourselves", wrong: ["Wings", "Crowns", "Rivers of gold"], why: "He has made for you mates from yourselves." },
        { q: "Which names end 42:11?", a: "The All-Hearer, the All-Seer", wrong: ["The First, the Last", "The King, the Holy", "The Strong, the Firm"], why: "And He is the All-Hearer, the All-Seer." }
      ]
    },
    {
      slug: "keys-of-heavens-and-earth",
      title: "Keys of the heavens and earth",
      line: "Allah holds the keys of all things and measures provision.",
      facts: ["He controls and governs them", "He knows everything"],
      quote: q42(12),
      source: ik(12, "Ibn Kathir says having the keys means He is the One Who controls and governs the heavens and the earth.", "is the One Who is controlling and governing them"),
      difficulty: 2,
      questions: [
        { q: "What belongs to Allah, in 42:12?", a: "The keys of the heavens and earth", wrong: ["Only the seas", "Only the hills", "Only the stars"], why: "To Him belong the keys of the heavens and the earth." },
        { q: "What do the keys mean, per Ibn Kathir?", a: "He controls and governs them", wrong: ["He locks the sky", "He hides them", "He lends them"], why: "He is the One Who is controlling and governing them." },
        { tf: true, q: "Allah gives more provision to some and less to others.", why: "He enlarges provision for whom He wills, and straitens." }
      ]
    },
    {
      slug: "one-religion-all-messengers",
      title: "One religion for all",
      line: "The religion given to Nuh, Ibrahim, Musa and Isa is ours.",
      facts: ["Prophets are like brothers", "Their religion is one"],
      quote: q42(13),
      source: hadith("bukhari", "3443", "Abu Hurairah", "Sahih", "The Prophet ﷺ said the prophets are brothers with different mothers, but their religion is one.", "their mothers are different, but their religion is one"),
      difficulty: 2,
      questions: [
        { q: "Which Messengers are named in 42:13?", a: "Nuh, Ibrahim, Musa and Isa", wrong: ["Hud and Salih", "Yusuf and Yaqub", "Dawud and Sulayman"], why: "Which He ordained for Nuh, and for Ibrahim, Musa and Isa." },
        { q: "What are the prophets like, per Bukhari 3443?", a: "Brothers with one religion", wrong: ["Rivals", "Strangers", "Kings"], why: "The prophets are brothers; their mothers are different, but their religion is one." },
        { q: "Who came first after Adam, per Ibn Kathir?", a: "Nuh", wrong: ["Musa", "Isa", "Ibrahim"], why: "Nuh is the first Messenger who was sent after Adam." }
      ]
    },
    {
      slug: "make-no-divisions",
      title: "Make no divisions",
      line: "Establish the religion and do not split into groups.",
      facts: ["All Prophets were told to unite", "Tawhid was hard for idolaters"],
      quote: q42(13),
      source: ik(13, "Ibn Kathir says Allah enjoined all the Prophets to be as one and forbade them to differ and be divided.", "Allah enjoined all the Prophets"),
      difficulty: 3,
      questions: [
        { q: "What were we told, in 42:13?", a: "Establish religion and make no divisions", wrong: ["Build towers", "Leave prayer", "Follow customs"], why: "You should establish religion and make no divisions in it." },
        { q: "What was hard for the idolaters, per Ibn Kathir?", a: "The call to Tawhid", wrong: ["Trade", "Travel", "Poetry"], why: "Ibn Kathir says they hate the call to Tawhid." },
        { q: "What did all Messengers bring, per 21:25?", a: "Worship Allah Alone", wrong: ["New idols", "Only rules of trade", "Only stories"], why: "None has the right to be worshipped but I, so worship Me (21:25)." }
      ]
    },
    {
      slug: "gatherings-that-unite",
      title: "Gatherings that unite",
      line: "Hajj, Eid, Jumu'ah and group prayers keep Muslims united.",
      facts: ["As-Sa'di explains", "Unity in the religion"],
      quote: q42(13),
      source: saadi(42, 13, "As-Sa'di says not splitting in the religion includes the gatherings Allah ordered, such as Hajj, the Eids, Jumu'ah, the five prayers in congregation, and worship that is only complete together.", "ومن أنواع الاجتماع على الدين وعدم التفرق فيه، ما أمر به الشارع من الاجتماعات العامة، كاجتماع الحج والأعياد"),
      difficulty: 2,
      questions: [
        { q: "Which gatherings help Muslims stay united, per as-Sa'di?", a: "Hajj, Eid and Jumu'ah", wrong: ["Markets", "Sports games", "Parties"], why: "Gatherings like Hajj, the Eids and Jumu'ah, says as-Sa'di." },
        { q: "What must Muslims not let divide them, per as-Sa'di on 42:13?", a: "Side issues", wrong: ["Prayer times", "The Quran", "Their names"], why: "Do not let issues split you into groups that fight." },
        { tf: true, q: "Allah gave Islam to the greatest Messengers: Nuh, Ibrahim, Musa, Isa and Muhammad ﷺ.", why: "As-Sa'di on 42:13." }
      ]
    },
    {
      slug: "divided-after-knowledge",
      title: "Divided after knowledge",
      line: "People split after knowledge came, out of envy and pride.",
      facts: ["The proof had reached them", "Many just copied their fathers"],
      quote: q42(14),
      source: ik(14, "Ibn Kathir says their opposition came after proof reached them, out of transgression and stubbornness.", "Nothing made them resist in this manner except their transgression and stubbornness"),
      difficulty: 3,
      questions: [
        { q: "When did they divide, in 42:14?", a: "After knowledge came to them", wrong: ["Before any Messenger", "In their sleep", "By mistake only"], why: "And they divided not till after knowledge had come to them." },
        { q: "What made them resist, per Ibn Kathir?", a: "Transgression and stubbornness", wrong: ["Lack of proof", "Hunger", "Fear of kings"], why: "Nothing made them resist except their transgression and stubbornness." },
        { q: "What delayed their punishment, in 42:14?", a: "A Word from your Lord", wrong: ["Their wealth", "Their army", "Their idols"], why: "Had it not been for a Word that went forth before from your Lord." }
      ]
    },
    {
      slug: "invite-and-stand-firm",
      title: "Invite and stand firm",
      line: "Call to this, stand firm, and do not follow their desires.",
      facts: ["The ayah holds ten ideas", "Like Ayat Al-Kursi in that"],
      quote: q42(15),
      source: ik(15, "Ibn Kathir says 42:15 holds ten separate ideas, and only Ayat Al-Kursi is like it in this.", "This Ayah includes ten separate and independent ideas"),
      difficulty: 3,
      questions: [
        { q: "How many ideas are in 42:15, per Ibn Kathir?", a: "Ten", wrong: ["Two", "Five", "Seven"], why: "This Ayah includes ten separate and independent ideas." },
        { q: "Which other ayah also has ten ideas?", a: "Ayat Al-Kursi, 2:255", wrong: ["1:1", "112:1", "114:1"], why: "There is nothing else like it, apart from Ayat Al-Kursi." },
        { q: "What should we not follow, in 42:15?", a: "Their desires", wrong: ["The Book", "Justice", "The truth"], why: "And stand firm as you are commanded, and follow not their desires." }
      ]
    },
    {
      slug: "our-lord-and-your-lord",
      title: "Our Lord and your Lord",
      line: "Allah is our Lord and yours; to Him is the final return.",
      facts: ["Believe in every revealed Book", "Be just among people"],
      quote: q42(15),
      source: ik(15, "Ibn Kathir says everyone in the universe prostrates to Allah, willingly or not.", "everyone in the universe prostrates to Him obediently and willingly"),
      difficulty: 3,
      questions: [
        { q: "What are we commanded, in 42:15?", a: "To do justice among you", wrong: ["To win every debate", "To get rich", "To stay silent"], why: "And I am commanded to do justice among you." },
        { q: "Which Books do we believe in, per Ibn Kathir?", a: "All Books revealed to the Prophets", wrong: ["Only one", "None", "Only poems"], why: "I believe in all the Books revealed from heaven to the Prophets." },
        { tf: true, q: "Allah will gather everyone together.", why: "Allah will assemble us all, and to Him is the final return." }
      ]
    },
    {
      slug: "disputing-is-futile",
      title: "Disputing is futile",
      line: "Arguing to turn believers away is useless before Allah.",
      facts: ["They wanted them back in Jahiliyyah", "Their argument is futile"],
      quote: q42(16),
      source: ik(16, "Ibn Kathir says those who argue to stop believers from guidance have an argument that is futile before Allah.", "it is futile before Allah"),
      difficulty: 3,
      questions: [
        { q: "What is their dispute worth, in 42:16?", a: "Of no use before their Lord", wrong: ["Very strong", "Half right", "A proof"], why: "Of no use is their dispute before their Lord." },
        { q: "What did they hope, per Ibn Abbas and Mujahid?", a: "That believers return to Jahiliyyah", wrong: ["To learn Islam", "To travel", "To trade"], why: "Hoping that they would return to Jahiliyyah." },
        { tf: false, q: "Arguing believers away from guidance is praised.", why: "On them is wrath, and for them will be a severe torment." }
      ]
    },
    {
      slug: "the-book-and-the-balance",
      title: "The Book and the Balance",
      line: "Allah sent down the Book in truth, and the Balance of justice.",
      facts: ["The Balance means justice", "The Hour may be close"],
      quote: q42(17),
      source: ik(17, "Mujahid and Qatadah said the Balance means justice and fairness.", "justice and fairness. This was the view of Mujahid and Qatadah"),
      difficulty: 3,
      questions: [
        { q: "What did Allah send down, in 42:17?", a: "The Book and the Balance", wrong: ["Gold and silver", "Rain and snow", "Kings and armies"], why: "It is Allah Who has sent down the Book in truth, and the Balance." },
        { q: "What does the Balance mean, per Mujahid?", a: "Justice and fairness", wrong: ["A market scale", "A star", "A boat"], why: "The Balance means justice and fairness." },
        { q: "What does 42:17 say about the Hour?", a: "Perhaps it is close at hand", wrong: ["It will never come", "It is far off", "It already came"], why: "And what can make you know that perhaps the Hour is close at hand?" }
      ]
    },
    {
      slug: "ready-for-the-hour",
      title: "Ready for the Hour",
      line: "Believers fear the Hour and know it is the truth.",
      facts: ["Prepare, do not ask when", "You will be with those you love"],
      quote: q42(18),
      source: hadith("bukhari", "3688", "Anas ibn Malik", "Sahih", "A man asked when the Hour will be. The Prophet ﷺ asked what he had prepared; he said love of Allah and His Messenger. He said: You will be with those whom you love.", "You will be with those whom you love"),
      difficulty: 3,
      questions: [
        { q: "How do believers feel about the Hour, in 42:18?", a: "Fearful, knowing it is true", wrong: ["Careless", "Mocking", "Unsure"], why: "Those who believe are fearful of it, and know that it is the very truth." },
        { q: "What did the Prophet ﷺ ask the man, per Bukhari 3688?", a: "What have you prepared for it?", wrong: ["Where do you live?", "How old are you?", "Who is your father?"], why: "The Prophet ﷺ said: What have you prepared for it?" },
        { q: "What was the good news, per Bukhari 3688?", a: "You will be with those you love", wrong: ["You will be rich", "You will live long", "You will be king"], why: "You will be with those whom you love." }
      ]
    }
  ]
};

/** Ayahs 19 to 35: Allah's kindness and provision, the harvest of the Hereafter, repentance, rain after despair, and ships like mountains. */
const SHURA_TWO: DeepUnit = {
  key: "shura2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-42",
  name: "Ash-Shura, ayahs 19 to 35",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ash-Shura",
  lessons: [
    {
      slug: "kind-to-his-servants",
      title: "Kind to His servants",
      line: "Allah is kind to His servants and provides for every one.",
      facts: ["He forgets no creature", "He is All-Strong, Almighty"],
      quote: q42(19),
      source: ik(19, "Ibn Kathir says Allah provides for every last one of His creation and does not forget anyone.", "He provides for every last one of them and does not forget anyone"),
      difficulty: 1,
      questions: [
        { q: "How is Allah to His servants, in 42:19?", a: "Very gracious and kind", wrong: ["Harsh", "Unaware", "Far away"], why: "Allah is very Gracious and Kind to His servants." },
        { q: "Whom does Allah forget, per Ibn Kathir?", a: "No one", wrong: ["The poor", "The sinners", "The animals"], why: "He provides for every last one of them and does not forget anyone." },
        { q: "Which names end 42:19?", a: "The All-Strong, the Almighty", wrong: ["The First, the Last", "The King, the Holy", "The All-Hearer, the All-Seer"], why: "And He is the All-Strong, the Almighty." }
      ]
    },
    {
      slug: "harvest-of-the-hereafter",
      title: "The harvest of the Hereafter",
      line: "Work for the Hereafter and Allah increases your reward.",
      facts: ["Good deeds multiplied many times", "Chasing only this world loses"],
      quote: q42(20),
      source: ik(20, "Ibn Kathir says Allah multiplies every good deed for those who seek the Hereafter, between ten and seven hundred times.", "between ten and seven hundred good rewards"),
      difficulty: 2,
      questions: [
        { q: "What does Allah give one who seeks the Hereafter, in 42:20?", a: "Increase in his reward", wrong: ["Nothing", "Only wealth", "Only fame"], why: "Whosoever desires the reward of the Hereafter, We give him increase in his reward." },
        { q: "How much is a good deed multiplied, per Ibn Kathir?", a: "Between ten and seven hundred times", wrong: ["Once only", "Twice", "Three times"], why: "We will give him between ten and seven hundred good rewards." },
        { tf: false, q: "One who seeks only this world has a share in the Hereafter.", why: "And he has no portion in the Hereafter." }
      ]
    },
    {
      slug: "a-religion-allah-did-not-ordain",
      title: "Rules Allah did not give",
      line: "Some follow a religion that Allah never ordained.",
      facts: ["They made up false rules", "Only Allah makes the religion"],
      quote: q42(21),
      source: ik(21, "Ibn Kathir says they did not follow the upright religion Allah ordained, but rules they invented themselves.", "they do not follow what Allah has ordained for you of upright religion"),
      difficulty: 2,
      questions: [
        { q: "What did their partners do, in 42:21?", a: "Made a religion Allah did not ordain", wrong: ["Built wells", "Fed the poor", "Taught the Quran"], why: "Or have they partners with Allah who have instituted for them a religion which Allah has not ordained?" },
        { q: "What did they invent, per Ibn Kathir?", a: "False rules of halal and haram", wrong: ["Ships", "Writing", "Medicine"], why: "They came up with all kinds of false rulings on what was permitted and forbidden." },
        { tf: true, q: "Only Allah sets what the religion is.", why: "They follow what Allah has not ordained; the upright religion is from Allah." }
      ]
    },
    {
      slug: "flowering-meadows",
      title: "Flowering meadows",
      line: "Believers who do good will be in the meadows of Paradise.",
      facts: ["Whatever they wish with their Lord", "The supreme grace"],
      quote: q42(22),
      source: ik(22, "Ibn Kathir says the supreme grace means the ultimate victory and complete blessing.", "the ultimate victory and complete blessing"),
      difficulty: 2,
      questions: [
        { q: "Where will believers be, in 42:22?", a: "In the flowering meadows of the Gardens", wrong: ["In a desert", "In a cave", "On a ship"], why: "Those who believe and do righteous deeds will be in the flowering meadows of the Gardens." },
        { q: "What does supreme grace mean, per Ibn Kathir?", a: "Ultimate victory and complete blessing", wrong: ["A short rest", "A small gift", "A long trip"], why: "That is the supreme grace means the ultimate victory and complete blessing." },
        { q: "What will they have with their Lord?", a: "Whatever they desire", wrong: ["Only shade", "Only water", "Only rest"], why: "They shall have whatsoever they desire with their Lord." }
      ]
    },
    {
      slug: "kind-for-kinship",
      title: "Kind for kinship",
      line: "The Prophet ﷺ asked no wage, only kindness for kinship.",
      facts: ["He was related to every clan", "Leave him to convey the message"],
      quote: q42(23),
      source: hadith("bukhari", "4818", "Ibn Abbas", "Sahih", "Ibn Abbas explained 42:23: there was no branch of Quraysh but the Prophet ﷺ had relatives in it, so he asked them to be kind for that kinship.", "There was no branch of the tribe of Quraish but"),
      difficulty: 2,
      questions: [
        { q: "What reward did the Prophet ﷺ ask, in 42:23?", a: "None, only kindness for kinship", wrong: ["Gold", "Land", "A throne"], why: "No reward do I ask of you for this except to be kind to me for my kinship with you." },
        { q: "Why kinship, per Ibn Abbas in Bukhari 4818?", a: "He had relatives in every Quraysh clan", wrong: ["He was a king", "He was rich", "He was a poet"], why: "There was no branch of the tribe of Quraish but the Prophet ﷺ had relatives therein." },
        { q: "What did he want from them, per Ibn Kathir?", a: "To let him convey the message", wrong: ["Their wealth", "Their land", "Their praise"], why: "Withhold your evil from me and let me convey the Messages of my Lord." }
      ]
    },
    {
      slug: "good-deeds-increased",
      title: "Good deeds increased",
      line: "Whoever does a good deed, Allah adds more good to it.",
      facts: ["He forgives many sins", "He values small good deeds"],
      quote: q42(23),
      source: ik(23, "Ibn Kathir says Allah forgives many bad deeds and increases a small amount of good deeds.", "He forgives many bad deeds and increases a small amount of good deeds"),
      difficulty: 2,
      questions: [
        { q: "What does Allah give for a good deed, in 42:23?", a: "An increase of good", wrong: ["Nothing", "Half of it", "A warning"], why: "And whoever earns a good righteous deed, We shall give him an increase of good." },
        { q: "Which names end 42:23?", a: "Oft-Forgiving, Most Ready to appreciate", wrong: ["The First, the Last", "The King, the Holy", "The Strong, the Firm"], why: "Verily, Allah is Oft-Forgiving, Most Ready to appreciate." },
        { tf: true, q: "Allah increases even a small good deed.", why: "He forgives many bad deeds and increases a small amount of good deeds." }
      ]
    },
    {
      slug: "allah-establishes-the-truth",
      title: "Allah establishes the truth",
      line: "Allah wipes out falsehood and makes the truth firm.",
      facts: ["The Quran was not invented", "He knows what is in hearts"],
      quote: q42(24),
      source: ik(24, "Ibn Kathir says Allah establishes the truth, strengthens it and makes it clear by His Words, His evidence and signs.", "He establishes it and strengthens it and makes it clear by His Words"),
      difficulty: 3,
      questions: [
        { q: "What did the deniers claim, in 42:24?", a: "He invented a lie against Allah", wrong: ["He was a king", "He was rich", "He was a poet only"], why: "Or say they: He has invented a lie against Allah?" },
        { q: "What does Allah do to falsehood, in 42:24?", a: "Wipes it out", wrong: ["Keeps it", "Hides it", "Grows it"], why: "And Allah wipes out falsehood, and establishes the truth by His Word." },
        { q: "What does Allah know, in 42:24?", a: "What is in the breasts", wrong: ["Only deeds seen", "Only words said", "Only the past"], why: "Verily, He knows well what are in the breasts." }
      ]
    },
    {
      slug: "he-accepts-repentance",
      title: "He accepts repentance",
      line: "Allah accepts repentance, forgives sins, and knows our deeds.",
      facts: ["He is pleased when we repent", "Like finding a lost camel"],
      quote: q42(25),
      source: hadith("muslim", "2747", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said Allah is more pleased with a servant's repentance than a man who finds his lost camel with his food and drink in a waterless desert.", "Allah is more pleased with the repentance of a servant"),
      difficulty: 2,
      questions: [
        { q: "What does Allah accept, in 42:25?", a: "Repentance from His servants", wrong: ["Only gold", "Only prayers", "Nothing"], why: "And He it is Who accepts repentance from His servants, and forgives sins." },
        { q: "What did the man lose, per Muslim 2747?", a: "His camel with food and drink", wrong: ["His house", "His sword", "His book"], why: "He is upon a camel in a waterless desert, and it is lost by him." },
        { q: "How does Allah feel when we repent, per Muslim 2747?", a: "More pleased than that man", wrong: ["Uncaring", "Annoyed", "Unaware"], why: "Allah is more pleased with the repentance of a servant than this man." }
      ]
    },
    {
      slug: "he-answers-believers",
      title: "He answers the believers",
      line: "Allah answers believers who do good, and gives them more.",
      facts: ["He answers their duas", "He gives more of His bounty"],
      quote: q42(26),
      source: ik(26, "Ibn Jarir said Allah answers their supplication for themselves, their companions and their brothers.", "He answers their supplication for themselves, their companions and their brothers"),
      difficulty: 2,
      questions: [
        { q: "Whom does Allah answer, in 42:26?", a: "Those who believe and do good", wrong: ["Only the rich", "Only kings", "No one"], why: "And He answers those who believe and do righteous good deeds." },
        { q: "For whom do they pray, per Ibn Jarir?", a: "Themselves, companions and brothers", wrong: ["Only themselves", "Only rulers", "No one"], why: "He answers their supplication for themselves, their companions and their brothers." },
        { tf: true, q: "Allah gives believers even more of His bounty.", why: "And gives them increase of His bounty." }
      ]
    },
    {
      slug: "provision-by-measure",
      title: "Provision by measure",
      line: "Too much wealth could make people rebel, so He gives by measure.",
      facts: ["He knows what is best for us", "He is Well-Aware, All-Seer"],
      quote: q42(27),
      source: ik(27, "Ibn Kathir says Allah gives provision according to what is in people's best interests, and He knows best.", "He gives them provision according to what is in their best interests"),
      difficulty: 3,
      questions: [
        { q: "What if Allah gave too much provision, in 42:27?", a: "They would rebel in the earth", wrong: ["They would pray more", "They would sleep", "Nothing would change"], why: "If Allah were to extend the provision for His servants, they would surely rebel in the earth." },
        { q: "How does Allah send provision, in 42:27?", a: "By measure as He wills", wrong: ["Randomly", "Never", "All at once"], why: "But He sends down by measure as He wills." },
        { q: "Why by measure, per Ibn Kathir?", a: "It is in their best interests", wrong: ["He lacks more", "To tease them", "By chance"], why: "He gives them provision according to what is in their best interests." }
      ]
    },
    {
      slug: "rain-after-despair",
      title: "Rain after despair",
      line: "Allah sends rain after people lose hope, and spreads His mercy.",
      facts: ["Umar recited 42:28 in drought", "He is the Wali, Praiseworthy"],
      quote: q42(28),
      source: ik(28, "Ibn Kathir says Allah sends rain after people have given up hope, at their time of need.", "after the people have given up hope that rain will fall"),
      difficulty: 2,
      questions: [
        { q: "When does Allah send rain, in 42:28?", a: "After they have despaired", wrong: ["Only in winter", "Never", "Only at night"], why: "And He it is Who sends down the rain after they have despaired." },
        { q: "What did Umar recite in a drought, per Ibn Kathir?", a: "42:28 about rain after despair", wrong: ["A poem", "A song", "Nothing"], why: "Umar said: Rain will be sent upon you, and he recited 42:28." },
        { q: "Which names end 42:28?", a: "The Wali, Worthy of all praise", wrong: ["The First, the Last", "The King, the Holy", "The Strong, the Firm"], why: "And He is the Wali, Worthy of all praise." }
      ]
    },
    {
      slug: "creatures-spread-everywhere",
      title: "Creatures spread everywhere",
      line: "Heavens, earth and every creature are signs of Allah.",
      facts: ["Angels, people, jinn and animals", "He will gather them all"],
      quote: q42(29),
      source: ik(29, "Ibn Kathir says the moving creatures include angels, men, jinn and all animals of every shape and color.", "this includes the angels, men, Jinn and all the animals"),
      difficulty: 2,
      questions: [
        { q: "What is among His signs, in 42:29?", a: "The heavens, earth and creatures", wrong: ["Only the sea", "Only the moon", "Only cities"], why: "And among His Ayat is the creation of the heavens and the earth, and whatever moving creatures." },
        { q: "Who are the moving creatures, per Ibn Kathir?", a: "Angels, people, jinn and animals", wrong: ["Only birds", "Only fish", "Only people"], why: "This includes the angels, men, Jinn and all the animals." },
        { tf: true, q: "Allah is able to gather all creatures whenever He wills.", why: "And He is Able to assemble them whenever He wills." }
      ]
    },
    {
      slug: "even-a-thorn",
      title: "Even a thorn",
      line: "Hardships come by what we earn, and Allah pardons much.",
      facts: ["Hardship wipes away sins", "Even the prick of a thorn"],
      quote: q42(30),
      source: hadith("muslim", "2572e", "Aishah", "Sahih", "The Prophet ﷺ said no trouble comes to a believer, even the pricking of a thorn, but it wipes away some of his sins.", "even if it is the pricking of a thorn"),
      difficulty: 3,
      questions: [
        { q: "Why does misfortune befall us, in 42:30?", a: "Because of what our hands earned", wrong: ["By chance", "Because of stars", "For no reason"], why: "And whatever of misfortune befalls you, it is because of what your hands have earned." },
        { q: "What does Allah do with much, in 42:30?", a: "He pardons it", wrong: ["He doubles it", "He forgets it", "He writes it twice"], why: "And He pardons much." },
        { q: "What does even a thorn do, per Muslim 2572?", a: "Wipes away some sins", wrong: ["Nothing", "Adds sins", "Brings bad luck"], why: "No trouble comes to a believer, even the pricking of a thorn, but it obliterates from his sins." }
      ]
    },
    {
      slug: "no-escape-from-allah",
      title: "No escape from Allah",
      line: "No one escapes Allah on earth, and none helps besides Him.",
      facts: ["He pardons far more than He punishes", "Only Allah truly helps"],
      quote: q42(31),
      source: ik(31, "Ibn Kathir cites 35:45: if Allah punished people for all they earned, no creature would be left on earth.", "He would not leave a moving creature on the surface of the earth"),
      difficulty: 3,
      questions: [
        { q: "Can anyone escape Allah on earth, in 42:31?", a: "No", wrong: ["Yes, at sea", "Yes, in caves", "Yes, if rich"], why: "And you cannot escape from Allah in the earth." },
        { q: "Who helps besides Allah, in 42:31?", a: "No one", wrong: ["Idols", "Kings", "Stars"], why: "And besides Allah you have neither any protector nor any helper." },
        { q: "What would happen if Allah punished for every sin, per 35:45?", a: "No creature would be left", wrong: ["Nothing", "Only rain would stop", "Only kings would fall"], why: "He would not leave a moving creature on the surface of the earth." }
      ]
    },
    {
      slug: "ships-like-mountains",
      title: "Ships like mountains",
      line: "Ships sailing the sea like mountains are among His signs.",
      facts: ["Allah made the sea serve us", "Ships sail by His command"],
      quote: q42(32),
      source: ik(32, "Ibn Kathir says the ships on the sea are like mountains on land, sailing by His command.", "these ships on the sea are like mountains on land"),
      difficulty: 2,
      questions: [
        { q: "What are ships like, in 42:32?", a: "Mountains", wrong: ["Birds", "Leaves", "Stars"], why: "And among His signs are the ships in the sea like mountains." },
        { q: "How do ships sail, per Ibn Kathir?", a: "By His command", wrong: ["By luck", "By magic", "By themselves"], why: "He has subjugated the sea so that ships may sail in it by His command." },
        { tf: true, q: "Big ships on the sea are a sign of Allah's power.", why: "These ships on the sea are like mountains on land." }
      ]
    },
    {
      slug: "patient-and-grateful",
      title: "Patient and grateful",
      line: "If He stopped the wind, ships would stand still on the sea.",
      facts: ["Patient in hard times", "Grateful in easy times"],
      quote: q42(33),
      source: hadith("muslim", "2999", "Suhaib", "Sahih", "The Prophet ﷺ said the believer's affair is all good: he thanks Allah in joy and is patient in trouble, and both are good for him.", "there is good in every affair of his"),
      difficulty: 3,
      questions: [
        { q: "What happens if Allah stops the wind, in 42:33?", a: "Ships stand still", wrong: ["Ships fly", "Ships sink at once", "Ships go faster"], why: "If He wills, He causes the wind to cease, then they would become motionless." },
        { q: "For whom are these signs, in 42:33?", a: "Everyone patient and grateful", wrong: ["Only sailors", "Only kings", "Only scholars"], why: "Verily, in this are signs for everyone patient and grateful." },
        { q: "What is the believer's affair, per Muslim 2999?", a: "Good in every case", wrong: ["Always hard", "Always easy", "Bad in hardship"], why: "There is good in every affair of his." }
      ]
    },
    {
      slug: "wind-by-their-need",
      title: "Wind by their need",
      line: "Allah could sink ships, but He pardons much in His mercy.",
      facts: ["Wind sent as they need", "Rain sent as is sufficient"],
      quote: q42(34),
      source: ik(34, "Ibn Kathir says by His grace and mercy Allah sends wind according to their needs, and rain that is sufficient.", "But by His grace and mercy, He sends the wind according to their needs"),
      difficulty: 3,
      questions: [
        { q: "What could Allah do to ships, in 42:34?", a: "Destroy them", wrong: ["Paint them", "Sell them", "Nothing at all"], why: "Or He may destroy them because of that which their people have earned." },
        { q: "How does Allah send wind, per Ibn Kathir?", a: "According to their needs", wrong: ["Always too strong", "Never", "Only in summer"], why: "By His grace and mercy, He sends the wind according to their needs." },
        { q: "What would too much rain do, per Ibn Kathir?", a: "Destroy their houses", wrong: ["Grow more gold", "Make no change", "Cool the sun"], why: "If He sent too much rain, it would destroy their houses." }
      ]
    },
    {
      slug: "no-refuge-for-deniers",
      title: "No refuge for deniers",
      line: "Those who argue against His ayat will find no refuge.",
      facts: ["No escape from His power", "They are subdued by His might"],
      quote: q42(35),
      source: ik(35, "Ibn Kathir says those who dispute about His ayat have no means of escape, for they are subdued by His power.", "they have no means of escape"),
      difficulty: 3,
      questions: [
        { q: "What will deniers find, in 42:35?", a: "No place of refuge", wrong: ["A safe city", "A strong fort", "A hidden cave"], why: "There is no place of refuge for them." },
        { q: "Why can they not escape, per Ibn Kathir?", a: "They are subdued by His power", wrong: ["They are lazy", "They are lost", "They are asleep"], why: "They have no means of escape, for they are subdued by Our power." },
        { tf: true, q: "No one can hide from Allah's power.", why: "They have no means of escape, for they are subdued by Our power." }
      ]
    }
  ]
};

/** Ayahs 36 to 53: what is with Allah is better, consultation and forgiveness, answering the call before the Day, and how revelation comes. */
const SHURA_THREE: DeepUnit = {
  key: "shura3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-42",
  name: "Ash-Shura, ayahs 36 to 53",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ash-Shura",
  lessons: [
    {
      slug: "better-and-more-lasting",
      title: "Better and more lasting",
      line: "This world is brief joy; what Allah has is better and lasts.",
      facts: ["For those who believe", "And put their trust in their Lord"],
      quote: q42(36),
      source: ik(36, "Ibn Kathir says whatever we gather is only the enjoyment of this life, which will surely come to an end.", "it is only the enjoyment of this life"),
      difficulty: 1,
      questions: [
        { q: "What is what we have been given, in 42:36?", a: "A passing enjoyment of this life", wrong: ["Forever ours", "Worthless", "A punishment"], why: "So whatever you have been given is but a passing enjoyment for this worldly life." },
        { q: "What is with Allah, in 42:36?", a: "Better and more lasting", wrong: ["The same", "Smaller", "Shorter"], why: "But that which is with Allah is better and more lasting." },
        { tf: true, q: "We should not prefer what passes over what lasts.", why: "Do not give preference to that which is transient over that which is lasting." }
      ]
    },
    {
      slug: "they-forgive-when-angry",
      title: "They forgive when angry",
      line: "Believers avoid great sins, and when angry they forgive.",
      facts: ["Forgiving is their nature", "The Prophet ﷺ never took revenge for himself"],
      quote: q42(37),
      source: hadith("muslim", "2327", "Aishah", "Sahih", "Aishah said the Prophet ﷺ never took revenge on anyone for a personal wrong, unless something Allah made sacred was violated.", "never took revenge from anyone because of his personal grievance"),
      difficulty: 2,
      questions: [
        { q: "What do believers do when angry, in 42:37?", a: "They forgive", wrong: ["They shout", "They take revenge", "They leave"], why: "And when they are angry, they forgive." },
        { q: "What did the Prophet ﷺ never do, per Muslim 2327?", a: "Take revenge for himself", wrong: ["Pray at night", "Give charity", "Smile"], why: "He never took revenge from anyone because of his personal grievance." },
        { q: "What do believers shun, in 42:37?", a: "The greater sins and Al-Fawahish", wrong: ["Good deeds", "Prayer", "Charity"], why: "And those who shun the greater sins, and Al-Fawahish." }
      ]
    },
    {
      slug: "affairs-by-consultation",
      title: "Affairs by consultation",
      line: "Believers pray and settle their affairs by consulting together.",
      facts: ["The surah is named for consultation", "The Prophet ﷺ consulted his Companions"],
      quote: q42(38),
      source: ik(38, "Ibn Kathir says believers do not make a decision without consulting one another, so they help each other with ideas.", "they do not make a decision without consulting one another"),
      difficulty: 2,
      questions: [
        { q: "How do believers run their affairs, in 42:38?", a: "By mutual consultation", wrong: ["By one voice only", "By guessing", "By drawing lots"], why: "And who conduct their affairs by mutual consultation." },
        { q: "Which ayah does Ibn Kathir link to consultation?", a: "3:159, consult them in the affairs", wrong: ["2:255", "112:1", "1:1"], why: "This is like the Ayah: and consult them in the affairs (3:159)." },
        { q: "Whom did the Prophet ﷺ consult, per Ibn Kathir?", a: "His Companions", wrong: ["No one", "Only kings", "Only poets"], why: "The Prophet ﷺ used to consult with them concerning wars and other matters." }
      ]
    },
    {
      slug: "searching-for-the-right",
      title: "Searching for the right",
      line: "Allah loves us to discuss religious questions to find the right.",
      facts: ["As-Sa'di explains", "Shura"],
      quote: q42(38),
      source: saadi(42, 38, "As-Sa'di says consultation means no one forces his own view on shared matters; believers meet, discuss and act on what is best, and discussing religious questions to find what is right is loved by Allah.", "والبحث فيها لبيان الصواب مما يحبه الله"),
      difficulty: 2,
      questions: [
        { q: "What does consultation stop, per as-Sa'di?", a: "One person forcing his view", wrong: ["All talking", "Prayer", "Charity"], why: "No one forces his own view on shared matters." },
        { q: "What does Allah love believers to discuss, per as-Sa'di on 42:38?", a: "Religious questions, to find the right", wrong: ["Gossip", "Others' faults", "Nothing"], why: "Discussing them to find what is right is loved by Allah." },
        { tf: true, q: "Shura comes from believers loving each other and having full sense.", why: "As-Sa'di on 42:38." }
      ]
    },
    {
      slug: "answer-pray-and-spend",
      title: "Answer, pray and spend",
      line: "They answer their Lord, pray, and spend from what He gave.",
      facts: ["Salah is the greatest worship", "Spend on the closest first"],
      quote: q42(38),
      source: ik(38, "Ibn Kathir says spending means kindly treating Allah's creation, starting with those who are closest.", "kindly treating the creation of Allah, starting with those who are closest"),
      difficulty: 2,
      questions: [
        { q: "What does answering the call mean, per Ibn Kathir?", a: "Following His Messenger and obeying Him", wrong: ["Shouting back", "Leaving home", "Staying silent"], why: "They follow His Messenger and obey His commands and avoid what He prohibited." },
        { q: "Who comes first in spending, per Ibn Kathir?", a: "Those who are closest", wrong: ["Strangers only", "The rich", "No one"], why: "Kindly treating the creation of Allah, starting with those who are closest." },
        { tf: true, q: "Ibn Kathir calls Salah the greatest act of worship.", why: "And perform As-Salah, which is the greatest act of worship of Allah." }
      ]
    },
    {
      slug: "strong-yet-forgiving",
      title: "Strong, yet forgiving",
      line: "Believers can stand up to wrong, yet often choose to forgive.",
      facts: ["Yusuf forgave his brothers", "Forgiving from strength"],
      quote: q42(39),
      source: ik(39, "Ibn Kathir says believers are able to defend themselves, yet when they have the power, they prefer to forgive, as Yusuf did.", "they prefer to forgive"),
      difficulty: 2,
      questions: [
        { q: "What can believers do when wronged, in 42:39?", a: "Defend themselves", wrong: ["Nothing at all", "Only cry", "Only run"], why: "And those who, when an oppressive wrong is done to them, take revenge." },
        { q: "What do they prefer, per Ibn Kathir?", a: "To forgive", wrong: ["To shout", "To hurt back more", "To hold grudges"], why: "When they have the power to take revenge, they prefer to forgive." },
        { q: "Who said: No reproach on you this day?", a: "Yusuf, to his brothers", wrong: ["Nuh, to his son", "Musa, to Firawn", "Hud, to Ad"], why: "As when Yusuf said to his brothers: No reproach on you this day (12:92)." }
      ]
    },
    {
      slug: "forgive-and-make-peace",
      title: "Forgive and make peace",
      line: "Whoever forgives and makes peace, his reward is with Allah.",
      facts: ["Fair repayment is allowed", "Forgiving is better"],
      quote: q42(40),
      source: hadith("muslim", "2588", "Abu Hurairah", "Sahih", "The Prophet ﷺ said charity does not decrease wealth, and no one forgives another but Allah increases his honor.", "no one forgives another except that Allah increases his honor"),
      difficulty: 3,
      questions: [
        { q: "What is the recompense for an evil, in 42:40?", a: "An evil like it", wrong: ["Ten times more", "Nothing ever", "A gift"], why: "The recompense for an evil is an evil like thereof." },
        { q: "Where is the reward of one who forgives, in 42:40?", a: "With Allah", wrong: ["With the judge", "With the crowd", "Nowhere"], why: "But whoever forgives and makes reconciliation, his reward is with Allah." },
        { q: "What does Allah increase for one who forgives, per Muslim 2588?", a: "His honor", wrong: ["His debts", "His worries", "Nothing"], why: "No one forgives another except that Allah increases his honor." }
      ]
    },
    {
      slug: "treat-them-as-you-hope",
      title: "Treat them as you hope",
      line: "Pardon people as you hope Allah will pardon you.",
      facts: ["As-Sa'di explains", "Justice, grace, injustice"],
      quote: q42(40),
      source: saadi(42, 40, "As-Sa'di says 42:40 gives three levels: justice is paying back a wrong equally, grace is pardoning, and injustice is doing more; and we should treat people the way we want Allah to treat us.", "وأن يعامل العبد الخلق بما يحب أن يعامله الله به"),
      difficulty: 2,
      questions: [
        { q: "What are the three levels in Ash-Shura 42:40, per as-Sa'di?", a: "Justice, grace and injustice", wrong: ["Fear, hope and love", "Prayer, fasting and Hajj", "Day, night and dawn"], why: "Justice, grace and injustice, says as-Sa'di." },
        { q: "How should we treat people who wrong us, per as-Sa'di?", a: "As we want Allah to treat us", wrong: ["Twice as hard", "With silence forever", "With mockery"], why: "As you love that Allah pardons you, pardon them." },
        { tf: false, q: "Paying back more than the wrong done counts as justice.", why: "Doing more is injustice, says as-Sa'di." }
      ]
    },
    {
      slug: "no-blame-for-fair-right",
      title: "No blame for a fair right",
      line: "Taking back a fair right after a wrong brings no blame.",
      facts: ["Justice is allowed", "Only up to the wrong done"],
      quote: q42(41),
      source: ik(41, "Ibn Kathir says there is no sin on a person for taking fair recompense from one who wronged him.", "there is no sin on him for taking revenge against the one who wronged him"),
      difficulty: 3,
      questions: [
        { q: "Is there blame on one who was wronged, in 42:41?", a: "No way of blame against them", wrong: ["Yes, always", "Only on Fridays", "Only if poor"], why: "For such there is no way of blame against them." },
        { q: "What may the recompense be, in 42:40?", a: "Like the wrong, no more", wrong: ["Double", "Ten times", "Anything at all"], why: "The recompense for an evil is an evil like thereof." },
        { tf: true, q: "Islam allows fair justice and praises forgiveness more.", why: "Justice has been prescribed, but the better way, which means forgiving, is recommended." }
      ]
    },
    {
      slug: "blame-on-the-oppressor",
      title: "Blame on the oppressor",
      line: "Blame is on those who wrong people and spread injustice.",
      facts: ["The one who starts is to blame", "Unless the other goes too far"],
      quote: q42(42),
      source: hadith("muslim", "2587", "Abu Hurairah", "Sahih", "The Prophet ﷺ said when two people insult each other, the sin is on the one who started, as long as the wronged one does not go too far.", "it would be the first one who would be the sinner"),
      difficulty: 3,
      questions: [
        { q: "Against whom is the way of blame, in 42:42?", a: "Those who oppress people", wrong: ["The wronged", "The patient", "The forgiving"], why: "The way is only against those who oppress men and rebel in the earth without justification." },
        { q: "Who is the sinner, per Muslim 2587?", a: "The one who started", wrong: ["The one who answered", "Both equally always", "Neither"], why: "It would be the first one who would be the sinner." },
        { q: "When is the wronged one also to blame, per Muslim 2587?", a: "When he goes past the limit", wrong: ["Never", "Always", "When he is quiet"], why: "So long as the oppressed does not transgress the limits." }
      ]
    },
    {
      slug: "patience-and-forgiveness",
      title: "Patience and forgiveness",
      line: "Showing patience and forgiving is a great and noble deed.",
      facts: ["Bear insults with patience", "A great reward and praise"],
      quote: q42(43),
      source: ik(43, "Ibn Kathir says this means one who bears the insult with patience and conceals the evil action.", "whoever bears the insult with patience and conceals the evil action"),
      difficulty: 3,
      questions: [
        { q: "What does 42:43 praise?", a: "Patience and forgiving", wrong: ["Shouting back", "Holding grudges", "Running away"], why: "And verily, whosoever shows patience and forgives." },
        { q: "What does the patient one do, per Ibn Kathir?", a: "Bears insults and covers the wrong", wrong: ["Spreads the story", "Gets even", "Leaves forever"], why: "Whoever bears the insult with patience and conceals the evil action." },
        { q: "What did Sa'id bin Jubayr call it?", a: "One of the things enjoined by Allah", wrong: ["A weakness", "A small thing", "A custom"], why: "Sa'id bin Jubayr said: One of the things enjoined by Allah." }
      ]
    },
    {
      slug: "is-there-a-way-back",
      title: "Is there a way back?",
      line: "Wrongdoers will ask for a way back, but too late.",
      facts: ["Guidance is from Allah", "Act now while there is time"],
      quote: q42(44),
      source: ik(44, "Ibn Kathir says on the Day of Resurrection they will wish they could go back to this world.", "they will wish that they could go back to this world"),
      difficulty: 2,
      questions: [
        { q: "What will wrongdoers ask, in 42:44?", a: "Is there any way of return?", wrong: ["Where is the market?", "Who is the king?", "What time is it?"], why: "They will say: Is there any way of return?" },
        { q: "Where do they wish to go back, per Ibn Kathir?", a: "To this world", wrong: ["To their tribe", "To the sea", "To the hills"], why: "They will wish that they could go back to this world." },
        { tf: true, q: "Whom Allah sends astray has no protector after Him.", why: "Whomsoever Allah sends astray, for him there is no protector after Him." }
      ]
    },
    {
      slug: "the-true-losers",
      title: "The true losers",
      line: "The true losers lose themselves and their families that Day.",
      facts: ["Separated from loved ones", "Believers will speak the truth"],
      quote: q42(45),
      source: ik(45, "Ibn Kathir says they will lose themselves and be separated from their loved ones, companions and families.", "they will be separated from their loved ones, companions, families and relatives"),
      difficulty: 2,
      questions: [
        { q: "Who are the losers, in 42:45?", a: "Those who lose themselves and families", wrong: ["Those who lose money", "Those who lose games", "Those who lose land"], why: "The losers are they who lose themselves and their families on the Day of Resurrection." },
        { q: "Who will say this, in 42:45?", a: "Those who believe", wrong: ["The angels only", "The idols", "The kings"], why: "And those who believe will say: Verily, the losers are they who lose themselves." },
        { q: "How will they look, per Mujahid?", a: "With humble, fearful glances", wrong: ["Proudly", "Happily", "Calmly"], why: "Looking with stealthy glance; Mujahid said: in a humiliated manner." }
      ]
    },
    {
      slug: "no-helper-but-allah",
      title: "No helper but Allah",
      line: "They will have no protectors to help them other than Allah.",
      facts: ["False helpers vanish", "Only Allah can save"],
      quote: q42(46),
      source: ik(46, "Ibn Kathir says they will have no one to save them from the punishment.", "no one to save them from the punishment"),
      difficulty: 2,
      questions: [
        { q: "Who can help them, in 42:46?", a: "No one other than Allah", wrong: ["Their idols", "Their leaders", "Their wealth"], why: "And they will have no protectors to help them other than Allah." },
        { q: "What does no way mean, per Ibn Kathir?", a: "No salvation", wrong: ["No road", "No map", "No light"], why: "And he whom Allah sends astray, for him there is no way means no salvation." },
        { tf: true, q: "Only Allah can truly save us.", why: "They will have no protectors to help them other than Allah." }
      ]
    },
    {
      slug: "answer-before-the-day",
      title: "Answer before the Day",
      line: "Answer your Lord's call before a Day that cannot be pushed back.",
      facts: ["Comes in the blink of an eye", "No place to hide"],
      quote: q42(47),
      source: ik(47, "Ibn Kathir says once Allah commands it, the Day will come within the blinking of an eye and none can avert it.", "it will come to pass within the blinking of an eye"),
      difficulty: 3,
      questions: [
        { q: "What are we told to do, in 42:47?", a: "Answer the call of our Lord", wrong: ["Wait and see", "Build forts", "Gather wealth"], why: "Answer the Call of your Lord before there comes from Allah a Day which cannot be averted." },
        { q: "How fast will it come, per Ibn Kathir?", a: "Within the blink of an eye", wrong: ["Over years", "Slowly", "Never"], why: "It will come to pass within the blinking of an eye." },
        { q: "What will we have that Day, in 42:47?", a: "No refuge", wrong: ["A fort", "A cave", "A ship"], why: "You will have no refuge on that Day." }
      ]
    },
    {
      slug: "your-duty-is-to-convey",
      title: "Your duty is to convey",
      line: "The Prophet's ﷺ duty was to convey; guidance is from Allah.",
      facts: ["Not a guard over them", "People forget blessings in hardship"],
      quote: q42(48),
      source: ik(48, "Ibn Kathir says all that is required of the Prophet ﷺ is to convey the Message of Allah to them.", "all that We require you to do is to convey the Message of Allah to them"),
      difficulty: 3,
      questions: [
        { q: "What is the Prophet's ﷺ duty, in 42:48?", a: "To convey", wrong: ["To force", "To guard", "To punish"], why: "Your duty is to convey." },
        { q: "How does man act in hardship, per Ibn Kathir?", a: "He forgets past blessings", wrong: ["He thanks more", "He stays calm", "He gives more"], why: "He forgets the previous times of ease and blessings and acknowledges nothing but the present." },
        { tf: false, q: "The Prophet ﷺ was sent to force people to believe.", why: "We have not sent you as a Hafiz over them. Your duty is to convey." }
      ]
    },
    {
      slug: "daughters-and-sons",
      title: "Daughters and sons",
      line: "Allah gives daughters or sons to whomever He wills.",
      facts: ["Lut had daughters", "Ibrahim had sons"],
      quote: q42(49),
      source: ik(49, "Ibn Kathir explains people fall into four groups: daughters only, sons only, both, or none.", "some are given daughters, some are given sons"),
      difficulty: 2,
      questions: [
        { q: "What does Allah bestow, in 42:49?", a: "Daughters or sons as He wills", wrong: ["Only sons", "Only daughters", "Nothing"], why: "He bestows female upon whom He wills, and bestows male upon whom He wills." },
        { q: "Who was given daughters, per Al-Baghawi?", a: "Lut", wrong: ["Ibrahim", "Musa", "Nuh"], why: "And among them was Lut, peace be upon him." },
        { q: "Who was given sons, per Al-Baghawi?", a: "Ibrahim", wrong: ["Lut", "Yahya", "Isa"], why: "Like Ibrahim Al-Khalil, who did not have any daughters." }
      ]
    },
    {
      slug: "four-ways-of-creating",
      title: "Four ways of creating",
      line: "He gives both or none as He wills; He is All-Knowing, Able.",
      facts: ["Yahya and Isa had no children", "Isa created without a father"],
      quote: q42(50),
      source: ik(50, "Ibn Kathir notes Allah created people in four ways: Adam, Hawwa, all others, and Isa without a father.", "for He created people in four different ways"),
      difficulty: 3,
      questions: [
        { q: "Which names end 42:50?", a: "The All-Knower, Able", wrong: ["The First, the Last", "The King, the Holy", "The Strong, the Firm"], why: "Verily, He is the All-Knower and is Able to do all things." },
        { q: "Who had no children, per Al-Baghawi?", a: "Yahya and Isa", wrong: ["Ibrahim and Lut", "Musa and Harun", "Nuh and Hud"], why: "Like Yahya and Isa, peace be upon them." },
        { q: "How was Isa created, per Ibn Kathir?", a: "From a mother without a father", wrong: ["From clay", "From a man alone", "Like everyone"], why: "Isa bin Maryam was created from a female without a male." }
      ]
    },
    {
      slug: "how-allah-speaks",
      title: "How Allah speaks",
      line: "Allah speaks by revelation, from behind a veil, or by an angel.",
      facts: ["He spoke to Musa from behind a veil", "Jibril brought revelation"],
      quote: q42(51),
      source: ik(51, "Ibn Kathir says from behind a veil is how Allah spoke to Musa, and the Messenger ﷺ means angels like Jibril.", "as He spoke to Musa"),
      difficulty: 3,
      questions: [
        { q: "How many ways does 42:51 name?", a: "Three", wrong: ["One", "Two", "Five"], why: "By revelation, or from behind a veil, or He sends a Messenger." },
        { q: "To whom did Allah speak from behind a veil?", a: "Musa", wrong: ["Nuh", "Hud", "Salih"], why: "Or from behind a veil, as He spoke to Musa." },
        { q: "Which Messenger brought revelation, per Ibn Kathir?", a: "Jibril and other angels", wrong: ["A poet", "A bird", "A king"], why: "As Jibril and other angels came down to the Prophets." }
      ]
    },
    {
      slug: "a-light-that-guides",
      title: "A light that guides",
      line: "The Quran is a Ruh and a light by which Allah guides.",
      facts: ["Ruh of Our command is the Quran", "Guiding to a straight path"],
      quote: q42(52),
      source: ik(52, "Ibn Kathir says Ruh of Our command means the Quran, made a light to guide, and the Prophet ﷺ guides to a straight path.", "are indeed guiding to a straight path"),
      difficulty: 3,
      questions: [
        { q: "What is Ruh of Our command, per Ibn Kathir?", a: "The Quran", wrong: ["The wind", "The sun", "A dream"], why: "And thus We have sent to you Ruh of Our command means the Quran." },
        { q: "What did Allah make the Quran, in 42:52?", a: "A light to guide", wrong: ["A song", "A riddle", "A wall"], why: "But We have made it a light wherewith We guide whosoever of Our servants We will." },
        { q: "To what does the Prophet ﷺ guide, in 42:52?", a: "A straight path", wrong: ["A market", "A palace", "A desert"], why: "And verily, you are indeed guiding to a straight path." }
      ]
    },
    {
      slug: "all-matters-return",
      title: "All matters return to Allah",
      line: "All matters go back to Allah, the Owner of all things.",
      facts: ["His path is His law", "He judges every matter"],
      quote: q42(53),
      source: ik(53, "Ibn Kathir says all matters come back to Allah and He issues judgement concerning them.", "all matters come back to Him and He issues judgement concerning them"),
      difficulty: 3,
      questions: [
        { q: "Whose path is it, in 42:53?", a: "The path of Allah", wrong: ["The path of kings", "The path of poets", "The path of crowds"], why: "The path of Allah to Whom belongs all that is in the heavens and on the earth." },
        { q: "What does the path of Allah mean, per Ibn Kathir?", a: "His laws which He enjoins", wrong: ["A road in Makkah", "A trade route", "A river"], why: "The path of Allah means His Laws which He enjoins." },
        { tf: true, q: "In the end, every matter goes back to Allah.", why: "Verily, all matters at the end go to Allah." }
      ]
    }
  ]
};

export const SHURA_UNITS: readonly DeepUnit[] = [SHURA_ONE, SHURA_TWO, SHURA_THREE];
