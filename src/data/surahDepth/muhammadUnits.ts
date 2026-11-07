import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Muhammad ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Muhammad 47:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_47_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Muhammad 47:${ayah}`,
    url: `https://quran.com/47:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 47:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q47 = (ayah: number) => quranQuote(47, ayah);

/** Ayahs 1 to 15: deeds that count and deeds that are lost, rules for captives, help for those who help Allah's cause, and the rivers of Paradise. */
const MUHAMMAD_ONE: DeepUnit = {
  key: "muhammad1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-47",
  name: "Muhammad, ayahs 1 to 15",
  kind: "skill",
  lessonType: "surah",
  surahName: "Muhammad",
  lessons: [
    {
      slug: "deeds-made-vain",
      title: "Deeds made vain",
      line: "Those who block others from Allah's path lose their deeds.",
      facts: ["Surah Muhammad is surah 47", "Also called Surat Al-Qital"],
      quote: q47(1),
      source: ik(1, "Ibn Kathir says Allah renders their deeds vain and futile, and denies them any reward for them.", "He renders their deeds vain and futile"),
      difficulty: 1,
      questions: [
        { q: "What happens to the deeds of those in 47:1?", a: "They are made vain", wrong: ["They are doubled", "They are saved", "They are hidden"], why: "He will render their deeds vain." },
        { q: "What else did they do, besides disbelieve?", a: "Hindered others from Allah's path", wrong: ["Fed the poor", "Built mosques", "Read Quran"], why: "Those who disbelieve and hinder men from the path of Allah." },
        { tf: true, q: "Ibn Kathir calls Surah Muhammad Surat Al-Qital at its end.", why: "This concludes the Tafsir of Surat Al-Qital." }
      ]
    },
    {
      slug: "believe-in-what-came-to-muhammad",
      title: "Believe in what came down",
      line: "Believers who do good and accept the Quran have sins erased.",
      facts: ["The Quran is truth from Allah", "Allah sets their affairs right"],
      quote: q47(2),
      source: ik(2, "Ibn Kathir says after the Prophet ﷺ came, believing in him is a required condition of true faith.", "believing in him is a required condition for the true faith"),
      difficulty: 2,
      questions: [
        { q: "What does Allah do for believers, in 47:2?", a: "Wipes away sins, sets affairs right", wrong: ["Gives them gold", "Makes them kings", "Nothing"], why: "He expiates from them their sins and amends their Bal." },
        { q: "What does Bal mean, per Ibn Abbas?", a: "Their matter, their affairs", wrong: ["Their homes", "Their food", "Their names"], why: "Ibn Abbas said: This means their matter." },
        { tf: true, q: "Believing in the Prophet ﷺ is part of true faith since he came.", why: "Believing in him is a required condition for the true faith." }
      ]
    },
    {
      slug: "falsehood-or-truth",
      title: "Falsehood or truth",
      line: "Disbelievers follow falsehood; believers follow the truth.",
      facts: ["Choices lead to results", "Allah gives clear examples"],
      quote: q47(3),
      source: ik(3, "Ibn Kathir says the disbelievers choose falsehood over the truth, and Allah makes the end of their actions clear.", "they choose falsehood over the truth"),
      difficulty: 1,
      questions: [
        { q: "What do disbelievers follow, in 47:3?", a: "Falsehood", wrong: ["The truth", "The Quran", "The prophets"], why: "Those who disbelieve follow falsehood." },
        { q: "What do believers follow, in 47:3?", a: "The truth from their Lord", wrong: ["Their wishes", "Old stories", "Rumors"], why: "While those who believe follow the truth from their Lord." },
        { tf: true, q: "Allah sets forth examples so people see where actions lead.", why: "He makes the consequence of their actions clear to them." }
      ]
    },
    {
      slug: "rules-for-captives",
      title: "Rules for captives",
      line: "After a battle, captives are freed as a kindness or for ransom.",
      facts: ["Islam set rules even for war", "Mercy is one of the choices"],
      quote: q47(4),
      source: ik(4, "Ibn Kathir says after the war ends, the Muslims may act graciously and free captives without charge, or free them for a ransom.", "act graciously toward them by setting them free without charge"),
      difficulty: 3,
      questions: [
        { q: "What two choices for captives does 47:4 give?", a: "Free them kindly, or for ransom", wrong: ["Keep them forever", "Send them away to sea", "No choices"], why: "Thereafter is the time either for generosity or ransom." },
        { q: "When are captives freed, per Ibn Kathir?", a: "After the war ends", wrong: ["Before any battle", "Never", "Only in Ramadan"], why: "After the war ends and the conflict has ceased, you have a choice in regard to the captives." },
        { tf: true, q: "Allah could defeat His enemies without any battle.", why: "Had Allah so willed, He could have taken vengeance against them." }
      ]
    },
    {
      slug: "a-test-for-believers",
      title: "A test for believers",
      line: "Allah tests people with one another to show who is true.",
      facts: ["Struggle reveals the steadfast", "Like 3:142"],
      quote: q47(4),
      source: ik(4, "Ibn Kathir says Allah ordered struggle to try the believers and test their affairs, as 3:142 also says.", "in order to try you and test your affairs"),
      difficulty: 3,
      questions: [
        { q: "Why does Allah let people struggle, in 47:4?", a: "To test some by others", wrong: ["Because He needs help", "For fun", "No reason"], why: "But He lets you struggle so as to test with one another." },
        { q: "Which ayah asks if you will enter Paradise without being tested?", a: "3:142", wrong: ["1:1", "112:1", "2:255"], why: "Or did you think that you would enter the Paradise before Allah had made evident those of you who are steadfast? (3:142)" },
        { tf: true, q: "Allah never lets the deeds of those who die for His cause be lost.", why: "He will never let their deeds be lost." }
      ]
    },
    {
      slug: "they-know-their-homes-in-paradise",
      title: "They know their homes",
      line: "In Paradise, each believer will know the way to his own home.",
      facts: ["Better than they knew their homes here", "Allah made Paradise known to them"],
      quote: q47(6),
      source: hadith("bukhari", "6535", "Abu Sa'id al-Khudri", "Sahih", "The Prophet ﷺ said believers will be purified at a bridge, then enter Paradise, and each will know his dwelling there better than his dwelling in this world.", "everyone of them will know his dwelling in Paradise better t"),
      difficulty: 2,
      questions: [
        { q: "Where are believers stopped, per Bukhari 6535?", a: "A bridge between Paradise and the Fire", wrong: ["A river", "A mountain", "A market"], why: "They will be stopped at a bridge between Paradise and Hell." },
        { q: "What happens on that bridge?", a: "Wrongs between them are settled", wrong: ["They sleep", "They eat", "They forget everything"], why: "Mutual retaliation will be established among them regarding wrongs they have committed." },
        { q: "How well will they know their homes in Paradise?", a: "Better than their homes in this world", wrong: ["Not at all", "They need a guide", "Only after years"], why: "Everyone of them will know his dwelling in Paradise better than he knew his dwelling in this world." }
      ]
    },
    {
      slug: "guided-and-set-right",
      title: "Guided and set right",
      line: "Allah guides them to Paradise and sets their condition right.",
      facts: ["Paradise made known to them", "Mujahid: no one needs directions"],
      quote: q47(5),
      source: ik(5, "Mujahid said the people of Paradise will be guided to their homes without asking anyone for directions.", "nor will they ask anyone for directions to their dwellings"),
      difficulty: 2,
      questions: [
        { q: "What will Allah do for them, in 47:5?", a: "Guide them and amend their condition", wrong: ["Make them rich here", "Make them famous", "Nothing more"], why: "He will guide them and amend their condition." },
        { q: "Where will Allah admit them, in 47:6?", a: "Paradise He made known to them", wrong: ["A new city", "A palace on earth", "A garden in Makkah"], why: "And admit them to Paradise, which He has made known to them." },
        { tf: true, q: "Mujahid said no one will ask for directions to his home in Paradise.", why: "Nor will they ask anyone for directions to their dwellings." }
      ]
    },
    {
      slug: "help-allah-he-helps-you",
      title: "Help Allah's cause",
      line: "Support Allah's cause, and He will help you and keep you firm.",
      facts: ["Reward matches the deed", "Like 22:40"],
      quote: q47(7),
      source: ik(7, "Ibn Kathir says the reward is comparable to the type of deed done.", "the reward is comparable to the type of deed that is performed"),
      difficulty: 2,
      questions: [
        { q: "What does Allah promise in 47:7?", a: "He will support you", wrong: ["He will test you only", "He will leave you", "Nothing"], why: "If you support the cause of Allah, He will support you." },
        { q: "What else does Allah make firm, in 47:7?", a: "Your foothold", wrong: ["Your house", "Your wealth", "Your car"], why: "And make your foothold firm." },
        { tf: true, q: "Ibn Kathir says the reward matches the kind of deed.", why: "The reward is comparable to the type of deed that is performed." }
      ]
    },
    {
      slug: "misery-for-the-deniers",
      title: "Misery for the deniers",
      line: "Misery awaits disbelievers, and Allah makes their deeds vain.",
      facts: ["The opposite of firm footing", "Deeds without faith are lost"],
      quote: q47(8),
      source: ik(8, "Ibn Kathir says this misery is the opposite of the firm footing given to believers who support Allah's cause.", "This misery is the opposite of making firm the footholds of the believers"),
      difficulty: 2,
      questions: [
        { q: "What awaits the disbelievers, in 47:8?", a: "Misery", wrong: ["Firm footing", "Victory", "Reward"], why: "But as for those who disbelieve, misery awaits them." },
        { q: "What happens to their deeds, in 47:8?", a: "Allah makes them vain", wrong: ["Allah doubles them", "They are kept safe", "They are shown off"], why: "And Allah will make their deeds vain." },
        { tf: true, q: "Misery for them is the opposite of the believers' firm footing.", why: "This misery is the opposite of making firm the footholds of the believers." }
      ]
    },
    {
      slug: "they-hated-the-revelation",
      title: "They hated the revelation",
      line: "They hated what Allah sent, so their deeds bore no fruit.",
      facts: ["Hating guidance is a loss", "Love what Allah revealed"],
      quote: q47(9),
      source: ik(9, "Ibn Kathir says they did not want or like what Allah revealed.", "they did not want or like what Allah revealed"),
      difficulty: 2,
      questions: [
        { q: "Why were their deeds made fruitless, in 47:9?", a: "They hated what Allah sent down", wrong: ["They were poor", "They were few", "They were young"], why: "That is because they hate that which Allah has sent down." },
        { q: "What did they not like, per Ibn Kathir?", a: "What Allah revealed", wrong: ["Their food", "Their homes", "Their games"], why: "They did not want or like what Allah revealed." },
        { tf: false, q: "Hating Allah's revelation does no harm to one's deeds.", why: "So He has made their deeds fruitless." }
      ]
    },
    {
      slug: "travel-and-see",
      title: "Travel and see",
      line: "Travel the land and see how earlier deniers ended.",
      facts: ["Ruins teach lessons", "Believers were saved"],
      quote: q47(10),
      source: ik(10, "Ibn Kathir says Allah punished them for their denial and saved the believers from among them.", "saved the believers from among them"),
      difficulty: 2,
      questions: [
        { q: "What does 47:10 ask people to do?", a: "Travel and see past nations' end", wrong: ["Stay home", "Count money", "Build towers"], why: "Have they not traveled through the earth and seen what happened in the end to those before them?" },
        { q: "Who was saved, per Ibn Kathir?", a: "The believers among them", wrong: ["No one", "Only the rich", "The proud"], why: "Saved the believers from among them." },
        { tf: true, q: "47:10 warns that a similar end awaits deniers.", why: "And a similar end awaits the disbelievers." }
      ]
    },
    {
      slug: "allah-is-our-protector",
      title: "Allah is our Protector",
      line: "Allah protects believers; disbelievers have no protector.",
      facts: ["Mawla: Protector, Helper", "Said after Uhud"],
      quote: q47(11),
      source: hadith("bukhari", "3039", "Al-Bara ibn Azib", "Sahih", "After Uhud, when Abu Sufyan boasted of his idols, the Prophet ﷺ told the Companions to answer: Allah is our Helper and you have no helper.", "Say Allah is our Helper and you have no helper"),
      difficulty: 3,
      questions: [
        { q: "Who is the Protector of believers, in 47:11?", a: "Allah", wrong: ["Their army", "Their wealth", "Their tribe"], why: "Allah is the Protector of those who believe." },
        { q: "What did the Companions answer at Uhud, per Bukhari 3039?", a: "Allah is our Helper, you have none", wrong: ["We will return", "We are many", "We are rich"], why: "Say Allah is our Helper and you have no helper." },
        { q: "After which battle was it said?", a: "Uhud", wrong: ["Badr", "Khandaq", "Hunayn"], why: "On the day of the battle of Uhud." }
      ]
    },
    {
      slug: "eating-like-cattle",
      title: "Living only to enjoy",
      line: "Some live only to eat and enjoy, forgetting the next life.",
      facts: ["Believers live with purpose", "Gardens with rivers await"],
      quote: q47(12),
      source: ik(12, "Ibn Kathir says the disbelievers enjoy their worldly life and eat in it greedily, with no concern other than that.", "They have no concern other than that"),
      difficulty: 2,
      questions: [
        { q: "Where will Allah admit believers, in 47:12?", a: "Gardens under which rivers flow", wrong: ["Deserts", "Caves", "Castles on earth"], why: "Allah will admit those who believe into Gardens under which rivers flow." },
        { q: "How do the disbelievers live, in 47:12?", a: "Enjoying and eating like cattle", wrong: ["Praying all night", "Fasting often", "Giving charity"], why: "Those who disbelieve enjoy their life and eat as cattle eat." },
        { tf: true, q: "Ibn Kathir says they have no concern but this world.", why: "They have no concern other than that." }
      ]
    },
    {
      slug: "the-town-that-drove-you-out",
      title: "The town that drove you out",
      line: "Allah destroyed towns stronger than Makkah, which drove him out.",
      facts: ["A warning to Makkah", "His people drove him out"],
      quote: q47(13),
      source: ik(13, "Ibn Kathir says your town means Makkah, and the ayah is a great warning to its people.", "This is a great threat and severe warning to the people of Makkah"),
      difficulty: 3,
      questions: [
        { q: "Which town drove the Prophet ﷺ out, per Ibn Kathir?", a: "Makkah", wrong: ["Madinah", "Taif", "Jerusalem"], why: "Than your town that has driven you out, meaning, Makkah." },
        { q: "What happened to stronger towns before, in 47:13?", a: "Allah destroyed them", wrong: ["They won", "They grew", "Nothing"], why: "How many a town mightier than your town We have destroyed, with none to help them." },
        { tf: true, q: "Ibn Kathir says the people of Makkah drove the Prophet ﷺ out.", why: "Its people who have driven you out from amongst them, the people of Makkah." }
      ]
    },
    {
      slug: "clear-evidence-or-desire",
      title: "Clear proof or desire?",
      line: "One on clear proof is not like one who follows desires.",
      facts: ["Guided by revelation and fitrah", "Like 13:19 and 59:20"],
      quote: q47(14),
      source: ik(14, "Ibn Kathir says this is a person upon clear vision and certainty about Allah's religion, through revelation and the pure nature Allah gave him.", "because of the pure nature upon which Allah has created him"),
      difficulty: 2,
      questions: [
        { q: "Who stands on clear evidence, in 47:14?", a: "One guided by his Lord", wrong: ["One following lusts", "One who mocks", "One who is lazy"], why: "He who stands on clear evidence from his Lord." },
        { q: "What do the others follow, in 47:14?", a: "Their own lusts", wrong: ["The Quran", "The prophets", "Wise advice"], why: "While they follow their own lusts." },
        { q: "What helps a person see clearly, per Ibn Kathir?", a: "Revelation and pure nature", wrong: ["Wealth", "Fame", "Strength"], why: "Because of the guidance and knowledge revealed, and the pure nature upon which Allah has created him." }
      ]
    },
    {
      slug: "rivers-of-paradise",
      title: "Rivers of Paradise",
      line: "Paradise has rivers of water, milk, a pure drink, and honey.",
      facts: ["Water that never spoils", "Milk whose taste never changes"],
      quote: q47(15),
      source: ik(15, "Ibn Kathir says the water does not change or smell, the milk never changes, and the honey is of utmost purity.", "the honey is of utmost purity and pleasant color, taste, and smell"),
      difficulty: 2,
      questions: [
        { q: "Which rivers does 47:15 name?", a: "Water, milk, a pure drink, honey", wrong: ["Oil and sand", "Gold and silver", "Ice and fire"], why: "Rivers of water, rivers of milk, rivers of a delicious drink, and rivers of refined honey." },
        { q: "What is special about the water, per Ibn Abbas?", a: "It never changes", wrong: ["It is salty", "It is hot", "It is cloudy"], why: "Ibn Abbas, Al-Hasan, and Qatadah all said: It does not change." },
        { tf: true, q: "Paradise also has every kind of fruit and forgiveness.", why: "And therein for them are all kinds of fruits, and forgiveness from their Lord." }
      ]
    },
    {
      slug: "ask-for-al-firdaws",
      title: "Ask for Al-Firdaws",
      line: "When you ask Allah, ask for Al-Firdaws, highest in Paradise.",
      facts: ["Paradise has 100 levels", "Paradise rivers flow from Al-Firdaws"],
      quote: q47(15),
      source: hadith("bukhari", "2790", "Abu Hurairah", "Sahih", "The Prophet ﷺ said Paradise has a hundred grades, so when you ask Allah, ask for Al-Firdaus, the best and highest part of Paradise.", "ask for Al-firdaus which is the best and highest part of Paradise"),
      difficulty: 2,
      questions: [
        { q: "What should we ask Allah for, per Bukhari 2790?", a: "Al-Firdaws", wrong: ["Only this world", "A small house", "Nothing"], why: "When you ask Allah, ask for Al-firdaus which is the best and highest part of Paradise." },
        { q: "How many grades does Paradise have?", a: "One hundred", wrong: ["Seven", "Ten", "Three"], why: "Paradise has one-hundred grades." },
        { q: "What flows from Al-Firdaws?", a: "The rivers of Paradise", wrong: ["Fire", "Smoke", "Sand"], why: "And from it originate the rivers of Paradise." }
      ]
    }
  ]
};

/** Ayahs 16 to 28: listening without heeding, guidance that grows, the signs of the Hour, La ilaha illallah, ties of kinship, and reflecting on the Quran. */
const MUHAMMAD_TWO: DeepUnit = {
  key: "muhammad2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-47",
  name: "Muhammad, ayahs 16 to 28",
  kind: "skill",
  lessonType: "surah",
  surahName: "Muhammad",
  lessons: [
    {
      slug: "what-did-he-just-say",
      title: "What did he just say?",
      line: "Hypocrites sat with the Prophet ﷺ but left asking what he said.",
      facts: ["Listening without caring", "Hearts sealed by desires"],
      quote: q47(16),
      source: ik(16, "Ibn Kathir says they listened without understanding anything, nor did they care about it.", "They did not understand what he said, nor did they care about it"),
      difficulty: 2,
      questions: [
        { q: "What did they ask after leaving, in 47:16?", a: "What did he say just now?", wrong: ["When is the next talk?", "Can we come back?", "Who will teach us?"], why: "What is it that he has said just now?" },
        { q: "Why were their hearts sealed, in 47:16?", a: "They followed their lusts", wrong: ["They were tired", "They were young", "They were far away"], why: "Such are men whose hearts Allah has sealed because they followed their lusts." },
        { tf: true, q: "Ibn Kathir says they did not care about what was said.", why: "They did not understand what he said, nor did they care about it." }
      ]
    },
    {
      slug: "guidance-grows",
      title: "Guidance grows",
      line: "Allah gives more guidance and Taqwa to those who seek guidance.",
      facts: ["Seek guidance, get more", "Allah makes it easy"],
      quote: q47(17),
      source: ik(17, "Ibn Kathir says Allah makes guidance easy for those who seek it, keeps them firm on it, and gives them more of it.", "He guides them to it, makes them firm on it, and gives them more of it"),
      difficulty: 1,
      questions: [
        { q: "What does Allah increase for the guided, in 47:17?", a: "Guidance", wrong: ["Wealth only", "Fame", "Sleep"], why: "As for those who accept guidance, He increases them in guidance." },
        { q: "What else does Allah give them, in 47:17?", a: "Their Taqwa", wrong: ["A crown", "A palace", "Nothing"], why: "And bestows on them their Taqwa." },
        { tf: true, q: "Seeking guidance leads Allah to give even more of it.", why: "Those who seek guidance, Allah facilitates it for them and gives them more of it." }
      ]
    },
    {
      slug: "signs-of-the-hour",
      title: "Signs of the Hour came",
      line: "Some signs of the Hour have come; the Prophet ﷺ is one.",
      facts: ["He is the last Messenger", "Remembering late does not help"],
      quote: q47(18),
      source: ik(18, "Ibn Kathir says the Messenger's ﷺ coming is one of the signs of the Hour, because he is the last of the Messengers.", "because he is the Finality of the Messengers"),
      difficulty: 3,
      questions: [
        { q: "How will the Hour come, in 47:18?", a: "Suddenly", wrong: ["Slowly with notice", "Never", "Only at night"], why: "Do they then await except that the Hour should come upon them suddenly?" },
        { q: "What has already come, in 47:18?", a: "Some of its signs", wrong: ["The Hour itself", "Nothing", "The Dajjal"], why: "But already there have come some of its portents." },
        { tf: false, q: "Remembering at the moment the Hour comes will help the deniers.", why: "When it is on them, how can they benefit then by their reminder?" }
      ]
    },
    {
      slug: "sent-like-two-fingers",
      title: "Like two fingers",
      line: "The Prophet ﷺ showed two fingers: the Hour is that close.",
      facts: ["The Hour is near", "Prepare today"],
      quote: q47(18),
      source: hadith("bukhari", "6503", "Sahl ibn Sa'd", "Sahih", "The Prophet ﷺ said: I have been sent and the Hour is like these two, showing two of his fingers.", "I have been sent and the Hour (is at hand) as these two"),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ show, per Bukhari 6503?", a: "Two fingers", wrong: ["A ring", "A stone", "A date"], why: "Showing his two fingers and sticking them out." },
        { q: "What did the two fingers mean?", a: "The Hour is near his sending", wrong: ["Two prayers", "Two wives", "Two cities"], why: "I have been sent and the Hour is at hand as these two." },
        { q: "Who narrates Bukhari 6503?", a: "Sahl ibn Sa'd", wrong: ["Abu Bakr", "Aishah", "Anas"], why: "Narrated Sahl." }
      ]
    },
    {
      slug: "know-la-ilaha-illallah",
      title: "Know La ilaha illallah",
      line: "Know none is worthy of worship but Allah, and seek forgiveness.",
      facts: ["Knowledge comes before deeds", "Pray for all believers too"],
      quote: q47(19),
      source: ik(19, "Ibn Kathir says this is a declaration that there is no true God except Allah, connected with asking forgiveness.", "This is a declaration that there is no true God except Allah"),
      difficulty: 1,
      questions: [
        { q: "What must we know, in 47:19?", a: "La ilaha illallah", wrong: ["How to get rich", "The stars", "Poetry"], why: "So know that La ilaha illallah." },
        { q: "For whom else should we seek forgiveness, in 47:19?", a: "Believing men and women", wrong: ["Only ourselves", "No one", "Only kings"], why: "And ask forgiveness for your sin, and also for believing men and women." },
        { tf: true, q: "Allah knows our moving about and our place of rest.", why: "And Allah knows well your moving about, and your place of rest." }
      ]
    },
    {
      slug: "roads-to-knowing-tawhid",
      title: "Roads to knowing Tawhid",
      line: "The greatest road to Tawhid is reflecting on Allah's names.",
      facts: ["As-Sa'di explains", "Tawhid"],
      quote: q47(19),
      source: saadi(47, 19, "As-Sa'di says knowing that none deserves worship but Allah is a duty on every person, and the greatest way to know it is to reflect on Allah's names, qualities and actions.", "والطريق إلى العلم بأنه لا إله إلا هو أمور: أحدها بل أعظمها: تدبر أسمائه وصفاته"),
      difficulty: 2,
      questions: [
        { q: "What is the greatest way to know Tawhid, per as-Sa'di?", a: "Reflecting on Allah's names and qualities", wrong: ["Reading stories", "Travelling far", "Asking anyone"], why: "The greatest way is reflecting on His names and qualities, says as-Sa'di." },
        { q: "Who must learn that none deserves worship but Allah?", a: "Every person", wrong: ["Only scholars", "Only the old", "Only kings"], why: "It is a duty on every person, and it falls from no one." },
        { tf: true, q: "Knowing that idols cannot help or harm also leads to Tawhid.", why: "As-Sa'di on 47:19." }
      ]
    },
    {
      slug: "seventy-times-a-day",
      title: "Seventy times a day",
      line: "The Prophet ﷺ sought forgiveness over seventy times a day.",
      facts: ["Istighfar: asking forgiveness", "Repent often"],
      quote: q47(19),
      source: hadith("bukhari", "6307", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: by Allah, I ask Allah for forgiveness and turn to Him in repentance more than seventy times a day.", "I ask for forgiveness from Allah and turn to Him in repentance more than seventy times a day"),
      difficulty: 2,
      questions: [
        { q: "How often did he seek forgiveness, per Bukhari 6307?", a: "More than seventy times a day", wrong: ["Once a year", "Once a week", "Never"], why: "More than seventy times a day." },
        { q: "What else did he do besides ask forgiveness?", a: "Turned to Allah in repentance", wrong: ["Slept", "Traveled", "Counted money"], why: "I ask for forgiveness from Allah and turn to Him in repentance." },
        { q: "Which ayah tells us to ask forgiveness?", a: "47:19", wrong: ["47:1", "47:15", "47:38"], why: "So know that La ilaha illallah and ask forgiveness for your sin." }
      ]
    },
    {
      slug: "allah-knows-day-and-night",
      title: "Allah knows day and night",
      line: "Allah knows your deeds by day and your rest at night.",
      facts: ["Like 6:60", "Nothing is hidden from Him"],
      quote: q47(19),
      source: ik(19, "Ibn Kathir says Allah knows how you behave during the day, and where you settle at night.", "He knows how you behave during the day, and where you settle at night"),
      difficulty: 1,
      questions: [
        { q: "What does Allah know, in 47:19?", a: "Your moving about and resting", wrong: ["Only your words", "Only big deeds", "Nothing"], why: "Allah knows well your moving about, and your place of rest." },
        { q: "What does place of rest mean, per Ibn Kathir?", a: "Where you settle at night", wrong: ["Your grave only", "Your job", "Your car"], why: "And where you settle at night." },
        { tf: true, q: "Ibn Kathir links it to 6:60, about Allah taking souls by night.", why: "It is He Who takes your souls by night and knows all that you do by day (6:60)." }
      ]
    },
    {
      slug: "fear-when-the-command-came",
      title: "Fear when the command came",
      line: "Some asked for a surah, then nearly fainted when it came.",
      facts: ["Hearts with disease", "Obedience was better"],
      quote: q47(20),
      source: ik(20, "Ibn Kathir says this was due to their fear, terror and cowardice about meeting the enemy.", "due to their fear, terror, and cowardice concerning meeting the enemies"),
      difficulty: 3,
      questions: [
        { q: "What did believers ask for, in 47:20?", a: "A surah to be sent down", wrong: ["Rain", "Gold", "A king"], why: "Those who believe say: Why is not a Surah sent down for us?" },
        { q: "How did those with diseased hearts look, in 47:20?", a: "Like one fainting from fear of death", wrong: ["Happy", "Calm", "Sleepy"], why: "Looking at you with the look of one who is about to faint for fear of death." },
        { tf: true, q: "Ibn Kathir compares it with 4:77.", why: "Similarly, Allah says in 4:77 that when fighting was ordained, a party of them feared people." }
      ]
    },
    {
      slug: "obedience-and-good-words",
      title: "Obedience and good words",
      line: "Better for them: obey, speak well, and be true to Allah.",
      facts: ["Sincerity matters", "Listen and obey"],
      quote: q47(21),
      source: ik(21, "Ibn Kathir says it would have been better for them to listen and obey, with sincere intentions for Allah.", "it would have been better for them to listen and obey in that present situation"),
      difficulty: 2,
      questions: [
        { q: "What was better for them, in 47:21?", a: "Obedience and good words", wrong: ["Running away", "Arguing", "Hiding"], why: "Obedience and good words." },
        { q: "What does true to Allah mean, per Ibn Kathir?", a: "Sincere intentions for Him", wrong: ["Loud voices", "Big crowds", "Fine clothes"], why: "If they had been true to Allah, meaning, by making their intentions sincerely for Him." },
        { tf: true, q: "Being true to Allah would have been better for them.", why: "If they had been true to Allah, it would have been better for them." }
      ]
    },
    {
      slug: "do-not-cut-family-ties",
      title: "Do not cut family ties",
      line: "Turning away leads to corruption and cutting family ties.",
      facts: ["Join ties in word, deed, money", "A clear prohibition"],
      quote: q47(22),
      source: ik(22, "Ibn Kathir says the ayah forbids spreading corruption, and especially forbids cutting ties of kinship.", "a specific prohibition of severing the ties of kinship"),
      difficulty: 2,
      questions: [
        { q: "What two wrongs does 47:22 name?", a: "Corruption and cutting family ties", wrong: ["Eating and sleeping", "Trading and traveling", "Reading and writing"], why: "Spread corruption on earth, and sever your ties of kinship." },
        { q: "How do we join family ties, per Ibn Kathir?", a: "In speech, actions and giving", wrong: ["Only by visiting once", "Only on Eid", "Only by letters"], why: "Treating the relatives well in speech, actions, and spending wealth in charity." },
        { tf: true, q: "Ibn Kathir says Allah commanded joining the ties of kinship.", why: "Allah has commanded the people to join the ties of kinship." }
      ]
    },
    {
      slug: "the-womb-seeks-refuge",
      title: "The womb seeks refuge",
      line: "Allah favors those who keep family ties, not those who cut them.",
      facts: ["Rahim: the womb, family ties", "Abu Hurairah recited 47:22"],
      quote: q47(22),
      source: hadith("bukhari", "4830", "Abu Hurairah", "Sahih", "The Prophet ﷺ said the womb sought refuge with Allah from those who cut ties, and Allah promised to favor whoever keeps them and withhold from whoever cuts them.", "I seek refuge with you from those who sever the ties of Kith and kin"),
      difficulty: 3,
      questions: [
        { q: "What did the womb seek refuge from, per Bukhari 4830?", a: "Those who cut family ties", wrong: ["Hunger", "Cold", "Storms"], why: "I seek refuge with you from those who sever the ties of Kith and kin." },
        { q: "What did Allah promise the one who keeps ties?", a: "His favor", wrong: ["Nothing", "Punishment", "Fame"], why: "I bestow My favors on him who keeps your ties." },
        { q: "Which ayah did Abu Hurairah recite with it?", a: "47:22", wrong: ["47:1", "47:38", "47:15"], why: "Would you then do mischief in the land and sever your ties of kinship?" }
      ]
    },
    {
      slug: "keep-ties-with-those-who-cut",
      title: "Keep ties even when cut",
      line: "Real kinship is keeping ties even with those who cut you off.",
      facts: ["Not just returning favors", "Kindness first"],
      quote: q47(22),
      source: hadith("bukhari", "5991", "Abdullah ibn Amr", "Sahih", "The Prophet ﷺ said the one who keeps ties is not one who only repays kindness, but one who keeps ties with relatives who cut him off.", "Al-Wasil is the one who keeps good relations with those relatives who had severed the bond of kinship with him"),
      difficulty: 3,
      questions: [
        { q: "Who truly keeps ties, per Bukhari 5991?", a: "One who keeps ties with those who cut him", wrong: ["One who repays only", "One who waits", "One who ignores"], why: "Al-Wasil is the one who keeps good relations with those relatives who had severed the bond." },
        { q: "What is not enough, per Bukhari 5991?", a: "Only returning good done to you", wrong: ["Praying", "Fasting", "Giving charity"], why: "Al-Wasil is not the one who recompenses the good done to him by his relatives." },
        { tf: true, q: "Keeping ties brings more provision and longer life, per Bukhari 5985.", why: "Whoever is pleased that he be granted more wealth and that his life be prolonged should keep good relations with his kin." }
      ]
    },
    {
      slug: "deaf-and-blind-to-truth",
      title: "Deaf and blind to truth",
      line: "Cutting ties and spreading harm cost Allah's mercy and insight.",
      facts: ["Cutting ties is a grave sin", "Mercy comes to the merciful"],
      quote: q47(23),
      source: ik(23, "Ibn Kathir says the ayah carries a general ban on spreading corruption and a specific ban on cutting ties of kinship.", "This involves a general prohibition of spreading corruption on earth"),
      difficulty: 3,
      questions: [
        { q: "What happens to them, in 47:23?", a: "Made deaf and their sight blinded", wrong: ["Made rich", "Made kings", "Nothing"], why: "Such are the ones whom Allah has cursed, so that He has made them deaf and blinded their vision." },
        { q: "What does Ibn Kathir say the ayah forbids in general?", a: "Spreading corruption on earth", wrong: ["Traveling", "Trading", "Eating"], why: "This involves a general prohibition of spreading corruption on earth." },
        { tf: true, q: "Ibn Kathir says the ayah also forbids cutting family ties.", why: "And a specific prohibition of severing the ties of kinship." }
      ]
    },
    {
      slug: "locks-on-hearts",
      title: "Locks on hearts?",
      line: "Will they not reflect on the Quran, or are their hearts locked?",
      facts: ["Tadabbur: deep reflection", "Ask Allah to open your heart"],
      quote: q47(24),
      source: ik(24, "Ibn Kathir says Allah commands people to reflect and ponder upon the Quran, and forbids turning away from it.", "prohibiting them from turning away from it"),
      difficulty: 2,
      questions: [
        { q: "What does 47:24 urge us to do?", a: "Reflect upon the Quran", wrong: ["Only listen to it", "Hang it on a wall", "Read it fast only"], why: "Will they not then reflect upon the Quran?" },
        { q: "What may be on some hearts, in 47:24?", a: "Locks", wrong: ["Crowns", "Flowers", "Lights"], why: "Or are there locks upon their hearts?" },
        { q: "What did a young man from Yemen say?", a: "Locks stay until Allah opens them", wrong: ["Hearts have no locks", "Only kings have locks", "He said nothing"], why: "Indeed, there are locks upon them until Allah opens them." }
      ]
    },
    {
      slug: "reflection-leads-to-all-good",
      title: "Reflection leads to all good",
      line: "Reflecting on the Quran guides to every good.",
      facts: ["As-Sa'di explains", "Tadabbur"],
      quote: q47(24),
      source: saadi(47, 24, "As-Sa'di says if people truly reflected on the Quran, it would guide them to every good, warn them of every evil, fill their hearts with faith and show them the road to Allah and Paradise.", "فإنهم لو تدبروه، لدلهم على كل خير، ولحذرهم من كل شر، ولملأ قلوبهم من الإيمان"),
      difficulty: 2,
      questions: [
        { q: "What would reflecting on the Quran do, per as-Sa'di?", a: "Guide to every good", wrong: ["Make life boring", "Change nothing", "Make people proud"], why: "It would guide them to every good, says as-Sa'di." },
        { q: "What fills the heart when a person reflects on the Quran?", a: "Faith", wrong: ["Fear of people", "Boredom", "Pride"], why: "Reflection fills hearts with faith and certainty." },
        { tf: true, q: "Reflecting on the Quran teaches us about our Lord's names.", why: "As-Sa'di on 47:24." }
      ]
    },
    {
      slug: "shaytan-made-it-look-good",
      title: "Shaytan made it look good",
      line: "Some turned back after guidance; Shaytan gave them false hopes.",
      facts: ["Guard your faith", "Shaytan beautifies wrong"],
      quote: q47(25),
      source: ik(25, "Ibn Kathir says Shaytan adorned and beautified turning back for them, tempted them and deceived them.", "he tempted them, and deceived them"),
      difficulty: 3,
      questions: [
        { q: "When did they turn back, in 47:25?", a: "After guidance became clear", wrong: ["Before any guidance", "As babies", "Never"], why: "Those who have turned back after guidance had become clear to them." },
        { q: "What did Shaytan do, in 47:25?", a: "Enticed them with false hopes", wrong: ["Warned them", "Guided them", "Left them alone"], why: "Shaytan has enticed them and filled them with false hopes." },
        { tf: true, q: "Ibn Kathir says Shaytan tempted and deceived them.", why: "He tempted them, and deceived them." }
      ]
    },
    {
      slug: "allah-knows-their-secrets",
      title: "Allah knows their secrets",
      line: "They made secret deals against the truth; Allah knows them.",
      facts: ["Hypocrites hide their plans", "Like 4:81"],
      quote: q47(26),
      source: ik(26, "Ibn Kathir says whatever they hide and conceal, Allah is well-acquainted with it and knows it.", "whatever they hide and conceal, Allah is well"),
      difficulty: 3,
      questions: [
        { q: "What did they promise, in 47:26?", a: "To obey in part of the matter", wrong: ["To pray more", "To give charity", "To leave"], why: "We will obey you in part of the matter." },
        { q: "What does Allah know, in 47:26?", a: "Their secrets", wrong: ["Only their words", "Nothing hidden", "Only their names"], why: "And Allah knows their secrets." },
        { tf: true, q: "Ibn Kathir says hypocrites show the opposite of what they hide.", why: "The hypocrites who declare the opposite of what they conceal." }
      ]
    },
    {
      slug: "a-hard-death-for-deniers",
      title: "A hard end for deniers",
      line: "At death, angels take the deniers' souls with harshness.",
      facts: ["Like 8:50", "Believers' souls leave gently"],
      quote: q47(27),
      source: ik(27, "Ibn Kathir compares it with 8:50, about the angels taking away the lives of the disbelievers.", "If you could but see when the angels take away the lives of the disbelievers"),
      difficulty: 3,
      questions: [
        { q: "Who takes the souls, in 47:27?", a: "The angels", wrong: ["The jinn", "Their friends", "No one"], why: "When the angels will take their souls at death." },
        { q: "Which ayah does Ibn Kathir compare it with?", a: "8:50", wrong: ["1:1", "2:255", "112:1"], why: "If you could but see when the angels take away the lives of the disbelievers (8:50)." },
        { q: "Why does this happen, in 47:28?", a: "They followed what angers Allah", wrong: ["They were poor", "They were sick", "They were young"], why: "That is because they followed that which angered Allah and hated what earns His pleasure." }
      ]
    },
    {
      slug: "what-earns-his-pleasure",
      title: "What earns His pleasure",
      line: "They chased what angers Allah and disliked what pleases Him.",
      facts: ["Seek Allah's pleasure", "Such deeds are worthless"],
      quote: q47(28),
      source: ik(28, "Ibn Kathir quotes the ayah: they pursued what angered Allah and disliked what earns His pleasure, so He made their deeds worthless.", "they pursued what angered Allah and disliked what earns His pleasure"),
      difficulty: 2,
      questions: [
        { q: "What did they hate, in 47:28?", a: "What earns Allah's pleasure", wrong: ["Laziness", "Lies", "Greed"], why: "And hated what earns His pleasure." },
        { q: "What happened to their deeds, in 47:28?", a: "Made worthless", wrong: ["Made great", "Kept forever", "Doubled"], why: "So He rendered their deeds worthless." },
        { tf: true, q: "A believer should seek what pleases Allah.", why: "They are blamed because they hated what earns His pleasure." }
      ]
    }
  ]
};

/** Ayahs 29 to 38: hidden ill will exposed, tests that show the patient, guarding deeds, and spending freely because Allah is rich. */
const MUHAMMAD_THREE: DeepUnit = {
  key: "muhammad3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-47",
  name: "Muhammad, ayahs 29 to 38",
  kind: "skill",
  lessonType: "surah",
  surahName: "Muhammad",
  lessons: [
    {
      slug: "hidden-ill-will-exposed",
      title: "Hidden ill will exposed",
      line: "Hypocrites thought Allah would never expose their hidden hatred.",
      facts: ["Adghan: hidden envy and hatred", "Surah At-Tawbah exposed them"],
      quote: q47(29),
      source: ik(29, "Ibn Kathir says Adghan is what souls harbor of envy and hatred toward Islam and its people.", "which means what the souls harbor of envy and hatred toward Islam"),
      difficulty: 3,
      questions: [
        { q: "What did hypocrites think, in 47:29?", a: "Allah would not expose them", wrong: ["They would be praised", "They were safe forever", "They were angels"], why: "Do those in whose hearts is a disease think that Allah will not expose their ill-wills?" },
        { q: "What does Adghan mean, per Ibn Kathir?", a: "Hidden envy and hatred", wrong: ["Kind wishes", "Old friends", "Small gifts"], why: "Adghan is the plural of Dighn, which means what the souls harbor of envy and hatred." },
        { q: "Which surah exposed them, per Ibn Kathir?", a: "At-Tawbah", wrong: ["Al-Fatihah", "Yasin", "Al-Mulk"], why: "Allah revealed Surah Baraah, or At-Tawbah, in which He clarified the hypocrites' practices." }
      ]
    },
    {
      slug: "known-by-their-speech",
      title: "Known by their speech",
      line: "Words show what is in the heart, even when people hide it.",
      facts: ["Uthman: secrets show on the face", "Allah conceals many faults"],
      quote: q47(30),
      source: ik(30, "Uthman ibn Affan said no one hides a secret but Allah exposes it on his face and in the slips of his tongue.", "Never would one conceal a secret but Allah will expose it by the look on his face"),
      difficulty: 3,
      questions: [
        { q: "How would hypocrites be known, in 47:30?", a: "By the tone of their speech", wrong: ["By their clothes", "By their height", "By their names"], why: "But you will know them by the tone of their speech!" },
        { q: "Who said secrets show on the face and tongue?", a: "Uthman ibn Affan", wrong: ["Abu Lahab", "Firawn", "Qarun"], why: "As Uthman bin Affan said: Never would one conceal a secret but Allah will expose it." },
        { tf: true, q: "Allah did not reveal the name of every hypocrite.", why: "Allah did not do that in regard to all of the hypocrites. He conceals His creation." }
      ]
    },
    {
      slug: "tested-to-show-the-patient",
      title: "Tested to show the patient",
      line: "Allah tests us to make clear who strives and who is patient.",
      facts: ["Allah already knows", "Tests show it in deeds"],
      quote: q47(31),
      source: ik(31, "Ibn Kathir says Allah's knowledge comes before all events; until We know means until its happening is seen, as Ibn Abbas said.", "precedes the occurrence of all events"),
      difficulty: 3,
      questions: [
        { q: "Why does Allah test us, in 47:31?", a: "To show who strives and is patient", wrong: ["To learn something new", "For no reason", "To harm us"], why: "Until We know those who strive among you and the patient." },
        { q: "Does Allah learn anything new from tests?", a: "No, He already knows", wrong: ["Yes, always", "Sometimes", "Only on Fridays"], why: "There is absolutely no doubt that Allah's knowledge precedes the occurrence of all events." },
        { q: "What did Ibn Abbas say until We know means?", a: "So that We may see", wrong: ["So We may forget", "So We may guess", "So We may sleep"], why: "Except so that We may know, means, so that We may see." }
      ]
    },
    {
      slug: "they-cannot-harm-allah",
      title: "They cannot harm Allah",
      line: "Those who oppose the Messenger ﷺ cannot harm Allah at all.",
      facts: ["They only harm themselves", "Their deeds are lost"],
      quote: q47(32),
      source: ik(32, "Ibn Kathir says those people can never harm Allah in the least; they only harm themselves.", "they only harm themselves and become losers"),
      difficulty: 2,
      questions: [
        { q: "Can deniers harm Allah, in 47:32?", a: "Not in the least", wrong: ["A little", "Yes, a lot", "Only sometimes"], why: "They will not harm Allah in the least." },
        { q: "Whom do they harm, per Ibn Kathir?", a: "Only themselves", wrong: ["Allah", "The angels", "The sky"], why: "They only harm themselves and become losers." },
        { tf: true, q: "Their deeds will be made fruitless.", why: "But He will make their deeds fruitless." }
      ]
    },
    {
      slug: "do-not-ruin-your-deeds",
      title: "Do not ruin your deeds",
      line: "Obey Allah and the Messenger ﷺ; do not waste your good deeds.",
      facts: ["The Companions feared for their deeds", "Obedience protects them"],
      quote: q47(33),
      source: ik(33, "Ibn Kathir reports the Companions used to think every good deed would be accepted until 47:33 came, and then they asked what could ruin their deeds.", "What is it that can nullify our deeds"),
      difficulty: 3,
      questions: [
        { q: "What does 47:33 command?", a: "Obey Allah and the Messenger ﷺ", wrong: ["Obey your desires", "Obey the crowd", "Obey no one"], why: "Obey Allah, and obey the Messenger ﷺ and invalidate not your deeds." },
        { q: "What does 47:33 warn against?", a: "Ruining your own deeds", wrong: ["Doing good", "Praying", "Fasting"], why: "And invalidate not your deeds." },
        { tf: true, q: "Ibn Umar said 47:33 made the Companions ask what can ruin deeds.", why: "So we asked each other: What is it that can nullify our deeds?" }
      ]
    },
    {
      slug: "dying-upon-disbelief",
      title: "Dying upon disbelief",
      line: "One who blocks Allah's path and dies denying is not forgiven.",
      facts: ["Like 4:48", "Turn to Allah while alive"],
      quote: q47(34),
      source: ik(34, "Ibn Kathir links the ayah to 4:48: Allah does not forgive shirk, but forgives other than that to whom He wills.", "Verily, Allah does not forgive joining partners with Him in worship"),
      difficulty: 3,
      questions: [
        { q: "Who will not be forgiven, in 47:34?", a: "One who dies a disbeliever", wrong: ["One who repents", "One who prays", "Every sinner"], why: "Those who disbelieved and obstructed others from the path of Allah and then died as disbelievers." },
        { q: "Which ayah does Ibn Kathir compare it with?", a: "4:48", wrong: ["1:7", "2:1", "112:4"], why: "Verily, Allah does not forgive joining partners with Him in worship (4:48)." },
        { tf: true, q: "Repenting before death keeps the door of forgiveness open.", why: "Only those who die as disbelievers are named; Allah forgives other than shirk to whom He wills." }
      ]
    },
    {
      slug: "do-not-lose-heart",
      title: "Do not lose heart",
      line: "Do not lose heart: Allah is with you and keeps your deeds.",
      facts: ["Good news of victory", "A treaty can be wise, like Hudaybiyyah"],
      quote: q47(35),
      source: ik(35, "Ibn Kathir says Allah is with you contains good news of victory, and that a treaty may be made when it benefits the Muslims, as at Hudaybiyyah.", "This contains the good news of victory and triumph over the enemies"),
      difficulty: 3,
      questions: [
        { q: "Who is with the believers, in 47:35?", a: "Allah", wrong: ["No one", "The enemy", "Only their army"], why: "Allah is with you." },
        { q: "What will Allah never do, in 47:35?", a: "Deprive you of your deeds' reward", wrong: ["Help you", "Hear you", "See you"], why: "He will never deprive you of the reward of your deeds." },
        { q: "How long was the treaty the Prophet ﷺ agreed to, per Ibn Kathir?", a: "Ten years", wrong: ["One day", "Fifty years", "Forever"], why: "A treaty in which all fighting would stop between them for ten years." }
      ]
    },
    {
      slug: "life-is-play-and-amusement",
      title: "Life is play and amusement",
      line: "This world is only play and amusement, except what is for Allah.",
      facts: ["Taqwa brings reward", "Allah does not ask for all your wealth"],
      quote: q47(36),
      source: ik(36, "Ibn Kathir says such is the end of this world, except what is done for Allah's sake, and charity was set to help needy brothers.", "He only ordained giving charity from your wealth so that you would help your needy brothers"),
      difficulty: 2,
      questions: [
        { q: "What is this worldly life, in 47:36?", a: "Amusement and diversion", wrong: ["Forever", "All that matters", "Pure work"], why: "This worldly life is only amusement and diversion." },
        { q: "Why was charity ordained, per Ibn Kathir?", a: "To help needy brothers", wrong: ["Because Allah needs it", "To show off", "For taxes"], why: "He only ordained giving charity from your wealth so that you would help your needy brothers." },
        { tf: true, q: "Allah does not ask believers for all their wealth.", why: "And will not ask from you to sacrifice all of your possessions." }
      ]
    },
    {
      slug: "if-he-asked-for-everything",
      title: "If He asked for everything",
      line: "If Allah asked for all our wealth, we would hold back.",
      facts: ["Money is dear to people", "Allah is kind in His laws"],
      quote: q47(37),
      source: ik(37, "Qatadah said Allah knows that taking wealth from people stirs up ill feelings, and Ibn Kathir says money is dear to people.", "because money is dear to the people"),
      difficulty: 2,
      questions: [
        { q: "What would people do if asked for all, in 47:37?", a: "Hold back", wrong: ["Give it gladly", "Ask for more", "Laugh"], why: "If He would demand of you all of it and urge you, you would withhold." },
        { q: "Why, per Ibn Kathir?", a: "Money is dear to people", wrong: ["Money is useless", "People are rich", "No reason"], why: "Because money is dear to the people." },
        { tf: true, q: "Qatadah said taking wealth can stir up ill feelings.", why: "Allah knows that extracting wealth brings about ill-wills." }
      ]
    },
    {
      slug: "stingy-only-to-himself",
      title: "Stingy only to himself",
      line: "The stingy only hurt themselves; Allah is rich, we are needy.",
      facts: ["Al-Ghani: free of all need", "We always need Him"],
      quote: q47(38),
      source: ik(38, "Ibn Kathir says Allah is in need of nothing, while everything is ever in need of Him.", "Allah is in need of nothing else, whereas everything is ever in need of Him"),
      difficulty: 2,
      questions: [
        { q: "Whom does a stingy person harm, in 47:38?", a: "Himself", wrong: ["Allah", "The angels", "No one"], why: "Whoever acts stingily is but stingy toward himself." },
        { q: "What does Al-Ghani mean?", a: "Free of all need", wrong: ["Very poor", "Very old", "Very loud"], why: "For Allah is indeed Al-Ghani: Allah is in need of nothing else." },
        { q: "Who are the needy, in 47:38?", a: "We are", wrong: ["Allah", "The stars", "Nobody"], why: "For Allah is indeed free of needs, while you are the needy." }
      ]
    },
    {
      slug: "replaced-by-another-people",
      title: "Replaced by others",
      line: "If you turn away, Allah will bring others who obey Him.",
      facts: ["Allah's religion does not need us", "We need to obey"],
      quote: q47(38),
      source: ik(38, "Ibn Kathir says if you turn away from obeying Him, He will replace you with people who listen to Him and obey His commands.", "they will be people who will listen to Him and obey His commands"),
      difficulty: 2,
      questions: [
        { q: "What happens if we turn away, in 47:38?", a: "Allah brings other people", wrong: ["Nothing", "Allah needs us anyway", "The world ends"], why: "And if you turn away, He will replace you with other people." },
        { q: "How will the new people be, per Ibn Kathir?", a: "Listening and obeying", wrong: ["Lazy", "Proud", "The same"], why: "They will be people who will listen to Him and obey His commands." },
        { tf: false, q: "Allah's religion depends on any one people.", why: "He will replace you with other people; then they will not be like you." }
      ]
    }
  ]
};

export const MUHAMMAD_UNITS: readonly DeepUnit[] = [MUHAMMAD_ONE, MUHAMMAD_TWO, MUHAMMAD_THREE];
