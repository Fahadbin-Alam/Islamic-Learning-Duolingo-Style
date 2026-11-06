import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah At-Tahrim ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on At-Tahrim 66:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_66_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on At-Tahrim 66:${ayah}`,
    url: `https://quran.com/66:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 66:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q66 = (ayah: number) => quranQuote(66, ayah);

/** Ayahs 1 to 5: do not forbid what Allah allowed, undoing an oath, keeping a secret, and turning back to Allah. */
const TAHRIM_ONE: DeepUnit = {
  key: "tahrim1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-66",
  name: "At-Tahrim, ayahs 1 to 5",
  kind: "skill",
  lessonType: "surah",
  surahName: "At-Tahrim",
  lessons: [
    {
      slug: "he-loved-honey",
      title: "He loved honey",
      line: "The Prophet ﷺ loved sweet things and honey.",
      facts: ["Honey is a blessing", "Aishah told us this"],
      quote: q66(1),
      source: hadith("bukhari", "5431", "Aishah", "Sahih", "Aishah said the Prophet ﷺ loved sweet things and honey.", "used to love sweet edible things and honey"),
      difficulty: 1,
      questions: [
        { q: "What did the Prophet ﷺ love, per Aishah?", a: "Sweet things and honey", wrong: ["Sour lemons", "Bitter herbs", "Salty fish"], why: "Allah's Messenger used to love sweet edible things and honey." },
        { q: "Who narrated it?", a: "Aishah", wrong: ["Abu Lahab", "Firawn", "Qarun"], why: "Narrated Aisha: Allah's Messenger used to love sweet edible things and honey." },
        { tf: false, q: "The Prophet ﷺ disliked honey.", why: "Allah's Messenger used to love sweet edible things and honey." }
      ]
    },
    {
      slug: "do-not-forbid-the-lawful",
      title: "Keep what Allah allowed",
      line: "He promised to give up honey; Allah said do not forbid it.",
      facts: ["Tahrim: making forbidden", "Only Allah sets halal and haram"],
      quote: q66(1),
      source: ik(1, "Ibn Kathir reports from Al-Bukhari that the Prophet ﷺ said he would never drink honey again to please his wives, and 66:1 was revealed.", "No, but I drank honey in the house of Zaynab bint Jahsh, and I will never drink it again"),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ say he would stop?", a: "Drinking honey", wrong: ["Eating bread", "Drinking milk", "Eating dates"], why: "I drank honey in the house of Zaynab bint Jahsh, and I will never drink it again." },
        { q: "What does 66:1 ask?", a: "Why forbid what Allah allowed?", wrong: ["Why drink so much?", "Why travel?", "Why sleep?"], why: "O Prophet! Why do you forbid that which Allah has allowed to you?" },
        { tf: true, q: "Only Allah decides what is halal and haram.", why: "Why do you forbid that which Allah has allowed to you, seeking to please your wives?" }
      ]
    },
    {
      slug: "forgiving-and-merciful",
      title: "Oft-Forgiving, Merciful",
      line: "Even in correcting, Allah reminds He is Forgiving and Merciful.",
      facts: ["Allah corrects gently", "Mercy comes first"],
      quote: q66(1),
      source: ik(1, "Ibn Kathir quotes 66:1, which ends by reminding that Allah is Oft-Forgiving, Most Merciful.", "And Allah is Oft-Forgiving, Most Merciful"),
      difficulty: 2,
      questions: [
        { q: "How does 66:1 end?", a: "Allah is Oft-Forgiving, Most Merciful", wrong: ["Allah is Severe", "Allah is far", "Allah is silent"], why: "And Allah is Oft-Forgiving, Most Merciful." },
        { q: "What does this teach about correcting others?", a: "Be gentle and merciful", wrong: ["Be harsh", "Shout loudly", "Shame them"], why: "Even when correcting, Allah says: And Allah is Oft-Forgiving, Most Merciful." },
        { tf: false, q: "Allah corrects without any mercy.", why: "And Allah is Oft-Forgiving, Most Merciful." }
      ]
    },
    {
      slug: "undoing-an-oath",
      title: "Undoing an oath",
      line: "Allah made a way out of an oath: do better, then expiate.",
      facts: ["Kaffarah: expiation", "Choose the better deed"],
      quote: q66(2),
      source: hadith("bukhari", "6622", "Abdur-Rahman bin Samura", "Sahih", "The Prophet ﷺ said if you swear to do something and then see something better, do the better thing and expiate your oath.", "then do the better one and make expiation for your oath"),
      difficulty: 3,
      questions: [
        { q: "What if you swear and then see something better?", a: "Do the better and expiate", wrong: ["Keep the oath anyway", "Forget it", "Swear again"], why: "Then do the better one and make expiation for your oath." },
        { q: "What has Allah ordained, per 66:2?", a: "A way to undo oaths", wrong: ["No oaths ever", "Oaths every day", "Only written oaths"], why: "Allah has already ordained for you the absolution from your oaths." },
        { tf: true, q: "Abdur-Rahman bin Samura narrated the oath hadith.", why: "Narrated Abdur-Rahman bin Samura: do the better one and make expiation for your oath." }
      ]
    },
    {
      slug: "allah-is-your-protector",
      title: "Allah is your Protector",
      line: "Allah is our Protector, All-Knowing and All-Wise.",
      facts: ["Al-Mawla: the Protector", "Al-Hakim: the All-Wise"],
      quote: q66(2),
      source: ik(2, "Ibn Kathir quotes 66:2: Allah is your Protector and He is the All-Knower, the All-Wise.", "And Allah is your Protector and He is the All-Knower, the All-Wise"),
      difficulty: 2,
      questions: [
        { q: "Who is our Protector, per 66:2?", a: "Allah", wrong: ["Our wealth", "Our tribe", "Our strength"], why: "And Allah is your Protector." },
        { q: "Which two Names end 66:2?", a: "All-Knower, All-Wise", wrong: ["First, Last", "King, Holy", "Rich, Kind"], why: "He is the All-Knower, the All-Wise." },
        { tf: true, q: "Allah's rules come from knowledge and wisdom.", why: "And Allah is your Protector and He is the All-Knower, the All-Wise." }
      ]
    },
    {
      slug: "a-secret-shared",
      title: "A secret shared",
      line: "A secret was told, then shared, and Allah informed him.",
      facts: ["Keep secrets safe", "Allah knows all"],
      quote: q66(3),
      source: ik(3, "Ibn Kathir quotes 66:3: a secret was told to one of his wives, she told it, and Allah made it known to him.", "And Allah made it known to him"),
      difficulty: 3,
      questions: [
        { q: "What happened to the secret?", a: "It was told to another", wrong: ["It was forgotten", "It was written", "It was buried"], why: "When the Prophet ﷺ disclosed a matter in confidence to one of his wives, then she told it." },
        { q: "Who told the Prophet ﷺ it was shared?", a: "Allah", wrong: ["A neighbor", "A servant", "A traveler"], why: "And Allah made it known to him." },
        { tf: true, q: "Keeping a trusted secret is good manners.", why: "He disclosed a matter in confidence, then she told it, and Allah made it known to him." }
      ]
    },
    {
      slug: "the-all-aware-told-me",
      title: "The All-Aware told me",
      line: "He said: the All-Knower, the All-Aware informed me.",
      facts: ["Al-Alim: All-Knower", "Al-Khabir: All-Aware"],
      quote: q66(3),
      source: ik(3, "Ibn Kathir quotes 66:3: she asked who told him, and he said the All-Knower, the All-Aware told him.", "The All-Knower, the All-Aware has told me"),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ answer?", a: "The All-Aware told me", wrong: ["A bird told me", "I guessed", "Someone wrote it"], why: "He said: The All-Knower, the All-Aware has told me." },
        { q: "What did she ask him?", a: "Who told you this?", wrong: ["Where are you going?", "What time is it?", "Is it raining?"], why: "She said: Who told you this?" },
        { tf: true, q: "Nothing said in secret is hidden from Allah.", why: "The All-Knower, the All-Aware has told me." }
      ]
    },
    {
      slug: "only-part-was-mentioned",
      title: "Only part was mentioned",
      line: "He mentioned only part of what was said, out of kindness.",
      facts: ["As-Sa'di explains", "Kind and gentle"],
      quote: q66(3),
      source: saadi(66, 3, "As-Sa'di says the Prophet ﷺ told his wife only some of what she had said and left the rest unmentioned, out of generosity and gentleness.", "فعرفها صلى الله عليه وسلم، ببعض ما قالت، وأعرض عن بعضه، كرمًا منه"),
      difficulty: 2,
      questions: [
        { q: "Why did the Prophet ﷺ mention only part of it?", a: "Out of kindness and gentleness", wrong: ["He forgot", "He was angry", "He did not know"], why: "He left some out from generosity, says as-Sa'di." },
        { q: "What can we learn from At-Tahrim 66:3?", a: "Do not list every mistake", wrong: ["Shout at people", "Tell everyone", "Never forgive"], why: "He overlooked part of it, out of gentleness." },
        { tf: true, q: "Allah knows every secret, even what is most hidden.", why: "As-Sa'di on 66:3." }
      ]
    },
    {
      slug: "turn-in-repentance",
      title: "Turn back to Allah",
      line: "Allah invited two of his wives to repent, and opened the door.",
      facts: ["Tawbah is always open", "Umar named them"],
      quote: q66(4),
      source: ik(4, "Ibn Kathir reports from Al-Bukhari that Umar named Aishah and Hafsah as the two invited to turn in repentance in 66:4.", "If you both turn in repentance to Allah, your hearts are indeed so inclined"),
      difficulty: 3,
      questions: [
        { q: "What does 66:4 invite them to?", a: "Turn in repentance", wrong: ["Leave Madinah", "Stay silent", "Fast a year"], why: "If you both turn in repentance to Allah, your hearts are indeed so inclined." },
        { q: "Who told Ibn Abbas who the two were?", a: "Umar", wrong: ["Abu Lahab", "Ibn Ubay", "Firawn"], why: "Umar did not like the question, but he still answered it, saying that they were Aishah and Hafsah." },
        { tf: true, q: "Even the best people are called to repent.", why: "If you both turn in repentance to Allah, your hearts are indeed so inclined." }
      ]
    },
    {
      slug: "his-helpers",
      title: "Allah, Jibril and the righteous",
      line: "Allah is his Protector, with Jibril and the righteous.",
      facts: ["Jibril: the great angel", "Abu Bakr and Umar named"],
      quote: q66(4),
      source: ik(4, "Ibn Kathir quotes 66:4 that Allah, Jibril, the righteous believers and the angels support the Prophet ﷺ, and some said the righteous means Abu Bakr and Umar.", "Allah is his Protector, and Jibril, and the righteous among the believers"),
      difficulty: 3,
      questions: [
        { q: "Who is the Prophet's ﷺ Protector, per 66:4?", a: "Allah", wrong: ["A king", "A tribe", "No one"], why: "Then verily, Allah is his Protector, and Jibril, and the righteous among the believers." },
        { q: "Which angel is named in 66:4?", a: "Jibril", wrong: ["Mikail", "Israfil", "Malik"], why: "Allah is his Protector, and Jibril, and the righteous among the believers." },
        { tf: true, q: "Some said the righteous believers means Abu Bakr and Umar.", why: "And the righteous among the believers, refers to Abu Bakr and Umar." }
      ]
    },
    {
      slug: "a-simple-room",
      title: "A very simple room",
      line: "Umar saw the Prophet's ﷺ room had almost nothing in it.",
      facts: ["He chose the Hereafter", "Simplicity is beautiful"],
      quote: q66(4),
      source: ik(4, "Ibn Kathir reports Umar's story: he found nothing of worldly value in the Prophet's ﷺ room except three hides, and the Prophet ﷺ said Persians and Romans got their reward in this world only.", "These people have been given rewards of their good deeds in this world only"),
      difficulty: 3,
      questions: [
        { q: "What did Umar see in the room?", a: "Almost nothing", wrong: ["Gold and silk", "Many servants", "A throne"], why: "By Allah, I could not see anything of importance, except three hides." },
        { q: "What did the Prophet ﷺ say of the Persians and Romans?", a: "Rewarded in this world only", wrong: ["They are the best", "Copy them", "They will win"], why: "These people have been given rewards of their good deeds in this world only." },
        { tf: false, q: "The Prophet ﷺ lived in a rich palace.", why: "I could not see anything of importance, except three hides." }
      ]
    },
    {
      slug: "qualities-of-good-wives",
      title: "Qualities of good believers",
      line: "66:5 praises faith, obedience, repentance and worship.",
      facts: ["Saihat: those who fast", "Good character matters most"],
      quote: q66(5),
      source: ik(5, "Ibn Kathir quotes the qualities in 66:5 and says Saihat means fasting, according to Abu Hurayrah, Aishah, Ibn Abbas and many others.", "means, fasting, according to Abu Hurayrah"),
      difficulty: 3,
      questions: [
        { q: "What does Saihat mean, per Ibn Kathir?", a: "Those who fast", wrong: ["Those who sing", "Those who sleep", "Those who travel far"], why: "Saihat means, fasting, according to Abu Hurayrah, Aishah, Ibn Abbas." },
        { q: "Which quality is in 66:5?", a: "Turning to Allah in repentance", wrong: ["Being famous", "Being rich", "Being tall"], why: "Muslims, believers, obedient, turning to Allah in repentance, worshipping Allah sincerely." },
        { tf: true, q: "66:5 praises faith, obedience and worship.", why: "Muslims, believers, obedient, turning to Allah in repentance, worshipping Allah sincerely." }
      ]
    }
  ]
};

/** Ayahs 6 to 8: protect yourselves and your families, the angels who obey, no excuses, and sincere repentance. */
const TAHRIM_TWO: DeepUnit = {
  key: "tahrim2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-66",
  name: "At-Tahrim, ayahs 6 to 8",
  kind: "skill",
  lessonType: "surah",
  surahName: "At-Tahrim",
  lessons: [
    {
      slug: "protect-your-family",
      title: "Protect your family",
      line: "Believers must guard themselves and their families from Fire.",
      facts: ["Start with yourself", "Then help your family"],
      quote: q66(6),
      source: ik(6, "Ibn Abbas explained 66:6: obey Allah, avoid disobeying Him, and tell your families to remember Allah, then Allah will save you from the Fire.", "Work in the obedience of Allah, avoid disobedience of Allah and order your families to remember Allah, then Allah will save you from the Fire"),
      difficulty: 2,
      questions: [
        { q: "Whom does 66:6 tell us to protect?", a: "Ourselves and our families", wrong: ["Only our friends", "Only strangers", "Only our animals"], why: "O you who believe! Protect yourselves and your families against a Fire." },
        { q: "What did Ibn Abbas say to order our families?", a: "To remember Allah", wrong: ["To get rich", "To be famous", "To sleep more"], why: "Order your families to remember Allah, then Allah will save you from the Fire." },
        { tf: true, q: "Helping your family obey Allah protects them.", why: "Work in the obedience of Allah and order your families to remember Allah." }
      ]
    },
    {
      slug: "teach-and-help",
      title: "Teach and help them",
      line: "Qatadah said: help your family act on what Allah commands.",
      facts: ["Teach what is required", "Gently stop what is wrong"],
      quote: q66(6),
      source: ik(6, "Qatadah said a believer orders his family to obey Allah and helps them act on His orders. Ad-Dahhak and Muqatil said a Muslim must teach his near family what Allah made obligatory and forbidden.", "he orders his family to obey His orders and helps them to act upon His orders … It is an obligation for the Muslim to teach his near family members"),
      difficulty: 2,
      questions: [
        { q: "What should a Muslim teach his family?", a: "What Allah requires and forbids", wrong: ["Only games", "Only sports", "Nothing at all"], why: "It is an obligation for the Muslim to teach his near family members what Allah has made obligatory." },
        { q: "Besides ordering, what else should he do?", a: "Help them act on it", wrong: ["Leave them alone", "Shout at them", "Ignore them"], why: "He orders his family to obey His orders and helps them to act upon His orders." },
        { tf: false, q: "Teaching the family about Islam is not needed.", why: "It is an obligation for the Muslim to teach his near family members." }
      ]
    },
    {
      slug: "everyone-is-a-guardian",
      title: "Everyone is a guardian",
      line: "Each of us is a guardian, responsible for those in our care.",
      facts: ["Parents care for children", "Leaders care for people"],
      quote: q66(6),
      source: hadith("bukhari", "893", "Ibn Umar", "Sahih", "The Prophet ﷺ said all of you are guardians and responsible for those under your care.", "All of you are guardians and responsible for your wards and the things under your care"),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ call all of us?", a: "Guardians", wrong: ["Strangers", "Kings", "Travelers only"], why: "All of you are guardians and responsible for your wards and the things under your care." },
        { q: "What are we responsible for?", a: "Those under our care", wrong: ["Nothing", "Only money", "Only ourselves"], why: "All of you are guardians and responsible for your wards and the things under your care." },
        { tf: false, q: "Only rulers are responsible for anyone.", why: "All of you are guardians and responsible for your wards and the things under your care." }
      ]
    },
    {
      slug: "teach-children-to-pray",
      title: "Teach children to pray",
      line: "Ibn Kathir links 66:6 to teaching children prayer at seven.",
      facts: ["Prayer begins at home", "Start young and gently"],
      quote: q66(6),
      source: ik(6, "Ibn Kathir says a hadith confirms 66:6: the Prophet ﷺ said to order children to pray when they reach seven.", "Order the children to pray when they reach the age of seven"),
      difficulty: 2,
      questions: [
        { q: "At what age should children be told to pray?", a: "Seven", wrong: ["Twenty", "Forty", "Two"], why: "Order the children to pray when they reach the age of seven." },
        { q: "Which ayah does the hadith explain?", a: "Protect yourselves and your families", wrong: ["Do not forbid honey", "Strive hard", "Build me a home"], why: "There is a Hadith that confirms the meaning of this Ayah: Order the children to pray." },
        { tf: true, q: "Families should teach children to pray early.", why: "Order the children to pray when they reach the age of seven." }
      ]
    },
    {
      slug: "fuel-of-the-fire",
      title: "What feeds the Fire",
      line: "The Fire is fed by people and stones, like the idols worshipped.",
      facts: ["Idols cannot save anyone", "Stay away from the Fire"],
      quote: q66(6),
      source: ik(6, "Ibn Kathir says the stones in 66:6 refer to the idols that were worshipped, as 21:98 says.", "in reference to the idols that were worshipped"),
      difficulty: 3,
      questions: [
        { q: "What does 66:6 say feeds the Fire?", a: "Men and stones", wrong: ["Wood and leaves", "Oil and coal", "Gold and silver"], why: "A Fire whose fuel is men and stones." },
        { q: "What stones does Ibn Kathir mention?", a: "Idols that were worshipped", wrong: ["Mountain rocks", "Gemstones", "Building bricks"], why: "And stones, in reference to the idols that were worshipped." },
        { tf: false, q: "Idols will protect their worshippers.", why: "Certainly you and that which you are worshipping besides Allah, are fuel for Hell." }
      ]
    },
    {
      slug: "angels-who-obey",
      title: "Angels who always obey",
      line: "The angels of the Fire never disobey; they rush to obey Allah.",
      facts: ["Angels never disobey", "Called Az-Zabaniyah"],
      quote: q66(6),
      source: ik(6, "Ibn Kathir says these angels rush to obey whatever Allah commands without delay, and they are called Az-Zabaniyah, the keepers of Hell.", "whatever Allah commands them, they rush to obey Him, without delay for even a twinkling of an eye"),
      difficulty: 3,
      questions: [
        { q: "How do these angels obey Allah?", a: "At once, without delay", wrong: ["Slowly", "Only sometimes", "They argue first"], why: "Whatever Allah commands them, they rush to obey Him, without delay for even a twinkling of an eye." },
        { q: "What are the keepers of Hell called?", a: "Az-Zabaniyah", wrong: ["Al-Ansar", "Al-Muhajirun", "Al-Hawariyyun"], why: "They are called Az-Zabaniyah, meaning, the keepers and guards of Hell." },
        { tf: false, q: "Some angels disobey Allah.", why: "Who disobey not the commands they receive from Allah, but do that which they are commanded." }
      ]
    },
    {
      slug: "no-excuses-that-day",
      title: "No excuses that Day",
      line: "On that Day, disbelievers are told: make no excuses now.",
      facts: ["Act now, not later", "Deeds will be repaid"],
      quote: q66(7),
      source: ik(7, "Ibn Kathir says on the Day of Resurrection the disbeliever is told not to offer excuses, as none will be accepted; each is repaid for what he did.", "Do not offer any excuse this Day, because it will not be accepted from you"),
      difficulty: 2,
      questions: [
        { q: "What will disbelievers be told that Day?", a: "Make no excuses", wrong: ["Try again", "Go back home", "Rest a while"], why: "O you who disbelieve! Make no excuses this Day!" },
        { q: "Why are excuses useless then?", a: "They will not be accepted", wrong: ["Nobody listens", "It is too loud", "They are too long"], why: "Do not offer any excuse this Day, because it will not be accepted from you." },
        { tf: true, q: "Each person is repaid for what they did.", why: "You are being requited only for what you used to do." }
      ]
    },
    {
      slug: "sincere-repentance",
      title: "Sincere repentance",
      line: "Allah calls believers to a true, firm repentance.",
      facts: ["Tawbah Nasuha: sincere repentance", "Quit the sin for good"],
      quote: q66(8),
      source: ik(8, "Ibn Kathir explains sincere repentance as a true, firm repentance that erases past sins and moves the person to quit the evil he used to do.", "a true, firm repentance that erases the evil sins that preceded it"),
      difficulty: 3,
      questions: [
        { q: "What kind of repentance does 66:8 ask for?", a: "Sincere repentance", wrong: ["Half-hearted", "Only spoken", "Only once a year"], why: "O you who believe! Turn to Allah with sincere repentance!" },
        { q: "What does sincere repentance do to past sins?", a: "Erases them", wrong: ["Doubles them", "Hides them", "Nothing"], why: "A true, firm repentance that erases the evil sins that preceded it." },
        { tf: false, q: "Sincere repentance means planning to repeat the sin.", why: "Directing him to quit the evil that he used to do." }
      ]
    },
    {
      slug: "for-every-sin",
      title: "For every sin",
      line: "Sincere repentance covers all sins, is for Allah, and lasts.",
      facts: ["As-Sa'di explains", "Tawbah Nasuh"],
      quote: q66(8),
      source: saadi(66, 8, "As-Sa'di says sincere repentance is a full repentance from all sins, made for Allah alone, seeking only His Face and nearness, and kept up in every state.", "التوبة العامة الشاملة للذنوب كلها"),
      difficulty: 3,
      questions: [
        { q: "What does sincere repentance cover, per as-Sa'di?", a: "All sins", wrong: ["Only big sins", "Only one sin", "Only old sins"], why: "It is a repentance that covers all sins, says as-Sa'di." },
        { q: "Who is sincere repentance for?", a: "Allah alone", wrong: ["People", "Fame", "Friends"], why: "Seeking only His Face and nearness." },
        { tf: true, q: "Sincere repentance is kept up, not dropped the next day.", why: "As-Sa'di on 66:8." }
      ]
    },
    {
      slug: "it-may-be-means-it-will",
      title: "When Allah says may be",
      line: "When Allah says it may be, it means He shall.",
      facts: ["Allah keeps His promise", "Hope in His mercy"],
      quote: q66(8),
      source: ik(8, "Ibn Kathir notes that when Allah says it may be in 66:8, it means He shall forgive and admit to Gardens.", "it means He shall"),
      difficulty: 3,
      questions: [
        { q: "When Allah says it may be, what does it mean?", a: "He shall do it", wrong: ["He might forget", "It is a joke", "It will never happen"], why: "And when Allah says, it may be, it means He shall." },
        { q: "What does 66:8 promise the repentant?", a: "Sins removed and Gardens", wrong: ["Gold coins", "Long life only", "A big house on earth"], why: "Your Lord will expiate from you your sins, and admit you into Gardens under which rivers flow." },
        { tf: true, q: "Allah promises Gardens to those who repent sincerely.", why: "Admit you into Gardens under which rivers flow." }
      ]
    },
    {
      slug: "he-repented-daily",
      title: "He repented every day",
      line: "The Prophet ﷺ asked forgiveness more than seventy times a day.",
      facts: ["Istighfar: asking forgiveness", "Make it a daily habit"],
      quote: q66(8),
      source: hadith("bukhari", "6307", "Abu Hurairah", "Sahih", "The Prophet ﷺ said he asks Allah for forgiveness and turns to Him in repentance more than seventy times a day.", "I ask for forgiveness from Allah and turn to Him in repentance more than seventy times a day"),
      difficulty: 2,
      questions: [
        { q: "How often did the Prophet ﷺ repent each day?", a: "More than seventy times", wrong: ["Once a year", "Never", "Twice a month"], why: "I ask for forgiveness from Allah and turn to Him in repentance more than seventy times a day." },
        { q: "What can we learn from him?", a: "Ask forgiveness daily", wrong: ["Wait until old age", "Only in Ramadan", "Never ask"], why: "I ask for forgiveness from Allah more than seventy times a day." },
        { tf: false, q: "Only sinful people need to ask forgiveness.", why: "Even the Prophet ﷺ said: I ask for forgiveness from Allah more than seventy times a day." }
      ]
    },
    {
      slug: "a-hundred-times",
      title: "A hundred times a day",
      line: "He said: repent, I repent a hundred times a day.",
      facts: ["Repentance is for everyone", "Al-Agharr narrated it"],
      quote: q66(8),
      source: hadith("muslim", "2702", "Al-Agharr al-Muzani", "Sahih", "The Prophet ﷺ said: O people, seek repentance from Allah; I seek repentance from Him a hundred times a day.", "O people, seek repentance from Allah. Verily, I seek repentance from Him a hundred times a day"),
      difficulty: 2,
      questions: [
        { q: "Whom did the Prophet ﷺ tell to repent?", a: "All people", wrong: ["Only kings", "Only scholars", "Nobody"], why: "O people, seek repentance from Allah." },
        { q: "How many times a day did he repent?", a: "A hundred", wrong: ["Three", "Ten", "One"], why: "Verily, I seek repentance from Him a hundred times a day." },
        { tf: true, q: "Asking forgiveness often is a Sunnah.", why: "I seek repentance from Him a hundred times a day." }
      ]
    },
    {
      slug: "light-of-the-believers",
      title: "The believers' light",
      line: "On that Day, the believers' light runs ahead and on their right.",
      facts: ["Allah will not disgrace them", "They ask for perfect light"],
      quote: q66(8),
      source: ik(8, "Ibn Kathir says the believers ask Allah to perfect their light on the Day of Resurrection, when they see the light of the hypocrites going out.", "when they witness the light of the hypocrites being extinguished"),
      difficulty: 3,
      questions: [
        { q: "Where does the believers' light run?", a: "Before them and on their right", wrong: ["Behind them", "Under the ground", "Nowhere"], why: "Their light will run forward before them and in their right hands." },
        { q: "What do the believers ask for?", a: "Perfect our light, forgive us", wrong: ["More gold", "A long sleep", "To go back"], why: "Our Lord! Keep perfect our light for us and grant us forgiveness." },
        { tf: false, q: "Allah will disgrace the Prophet ﷺ and the believers.", why: "The Day that Allah will not disgrace the Prophet ﷺ and those who believe with him." }
      ]
    }
  ]
};

/** Ayahs 9 to 12: strive firmly, the wives of Nuh and Lut, Asiyah the wife of Firawn, and Maryam. */
const TAHRIM_THREE: DeepUnit = {
  key: "tahrim3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-66",
  name: "At-Tahrim, ayahs 9 to 12",
  kind: "skill",
  lessonType: "surah",
  surahName: "At-Tahrim",
  lessons: [
    {
      slug: "stand-firm",
      title: "Stand firm",
      line: "Allah told him to stand firm against those who fought Islam.",
      facts: ["Firm in this life", "Their end is in Allah's hands"],
      quote: q66(9),
      source: ik(9, "Ibn Kathir says being firm with them is in this life, and their final abode is in the Hereafter.", "meaning, in this life"),
      difficulty: 2,
      questions: [
        { q: "Whom was the Prophet ﷺ told to strive against?", a: "Disbelievers and hypocrites", wrong: ["His neighbors", "The poor", "Children"], why: "O Prophet! Strive hard against the disbelievers and the hypocrites." },
        { q: "When is the firmness shown, per Ibn Kathir?", a: "In this life", wrong: ["Only in dreams", "Never", "Before birth"], why: "And be severe against them, meaning, in this life." },
        { tf: true, q: "Their final abode is decided in the Hereafter.", why: "Their abode will be Hell, that is, in the Hereafter." }
      ]
    },
    {
      slug: "faith-in-the-heart",
      title: "Faith must be in the heart",
      line: "Living near Muslims does not help without faith in the heart.",
      facts: ["Company alone is not enough", "Faith is personal"],
      quote: q66(10),
      source: ik(10, "Ibn Kathir says mixing with Muslims will not help disbelievers with Allah unless they gain faith in their hearts.", "until and unless they gain faith in their hearts"),
      difficulty: 3,
      questions: [
        { q: "What is needed to be saved, per Ibn Kathir?", a: "Faith in the heart", wrong: ["A famous family", "Living near Muslims", "Wealth"], why: "Will not avail them with Allah, until and unless they gain faith in their hearts." },
        { q: "Whom does the first example in 66:10 address?", a: "Those who disbelieve", wrong: ["The angels", "The prophets", "The animals"], why: "Allah sets forth an example for those who disbelieve." },
        { tf: false, q: "Living near believers saves you without faith.", why: "Will not avail them with Allah, until and unless they gain faith in their hearts." }
      ]
    },
    {
      slug: "wives-of-nuh-and-lut",
      title: "The wives of Nuh and Lut",
      line: "Married to two prophets, yet they did not follow their faith.",
      facts: ["Nuh and Lut were righteous", "Their wives refused the faith"],
      quote: q66(10),
      source: ik(10, "Ibn Abbas said the wives of Nuh and Lut betrayed them by not following their religion.", "They betrayed them by not following their religion"),
      difficulty: 3,
      questions: [
        { q: "Whose wives are in 66:10?", a: "Nuh and Lut", wrong: ["Ibrahim and Musa", "Isa and Yahya", "Yusuf and Yaqub"], why: "The wife of Nuh and the wife of Lut." },
        { q: "How did they betray them, per Ibn Abbas?", a: "By not following their religion", wrong: ["By stealing", "By running away", "By lying about food"], why: "They betrayed them by not following their religion." },
        { tf: true, q: "Their husbands were righteous servants of Allah.", why: "They were under two of our righteous servants." }
      ]
    },
    {
      slug: "kinship-does-not-save",
      title: "Family ties alone do not save",
      line: "Being a prophet's wife did not save them without faith.",
      facts: ["Each is judged by own faith", "Relatives cannot carry us"],
      quote: q66(10),
      source: ik(10, "Ibn Kathir says all their closeness to their husbands neither helped them nor kept punishment away, because they disbelieved.", "all the intimate knowledge of their husbands neither helped them nor prevented punishment"),
      difficulty: 3,
      questions: [
        { q: "Did being prophets' wives help them?", a: "No, they lacked faith", wrong: ["Yes, fully", "Only a little", "Only on Fridays"], why: "So, they availed them not against Allah, because their wives were disbelievers." },
        { q: "What saves a person with Allah?", a: "Their own faith and deeds", wrong: ["A famous relative", "Their money", "Their looks"], why: "Their closeness to their husbands neither helped them nor prevented punishment." },
        { tf: false, q: "A righteous relative can save a disbeliever.", why: "So, they availed them not against Allah." }
      ]
    },
    {
      slug: "wives-of-prophets-are-honored",
      title: "Prophets' wives were honorable",
      line: "Ibn Abbas: their betrayal was refusing the faith, nothing else.",
      facts: ["Prophets' homes are honored", "Guard people's honor"],
      quote: q66(10),
      source: ik(10, "Ibn Abbas said their betrayal was only refusing to follow the religion, and Ibn Kathir says Allah honored His Prophets.", "they betrayed them by refusing to follow their religion"),
      difficulty: 3,
      questions: [
        { q: "What was their betrayal, per Ibn Abbas?", a: "Refusing the religion", wrong: ["Taking money", "Breaking a pot", "Leaving the town"], why: "Rather, they betrayed them by refusing to follow their religion." },
        { q: "Why does Ibn Kathir say this matters?", a: "Allah honored His Prophets", wrong: ["To shame them", "For gossip", "No reason"], why: "On account of the honor that Allah has granted His Prophets." },
        { tf: true, q: "We should guard the honor of the prophets.", why: "On account of the honor that Allah has granted His Prophets." }
      ]
    },
    {
      slug: "asiyah-wife-of-firawn",
      title: "Asiyah, wife of Firawn",
      line: "The wife of Firawn is an example for all believers.",
      facts: ["Her name: Asiyah bint Muzahim", "A believer in a tyrant's house"],
      quote: q66(11),
      source: ik(11, "Ibn Kathir says her name was Asiyah bint Muzahim, may Allah be pleased with her.", "Her name was Asiyah bint Muzahim, may Allah be pleased with her"),
      difficulty: 2,
      questions: [
        { q: "What was the name of Firawn's wife?", a: "Asiyah bint Muzahim", wrong: ["Maryam", "Hajar", "Sarah"], why: "Her name was Asiyah bint Muzahim, may Allah be pleased with her." },
        { q: "For whom is she an example in 66:11?", a: "Those who believe", wrong: ["Those who disbelieve", "Only kings", "Only angels"], why: "And Allah has set forth an example for those who believe: the wife of Firawn." },
        { tf: false, q: "Firawn's wife followed his disbelief.", why: "Her name was Asiyah bint Muzahim, may Allah be pleased with her." }
      ]
    },
    {
      slug: "a-house-in-paradise",
      title: "A house near Allah",
      line: "Asiyah asked Allah for a home with Him in Paradise.",
      facts: ["She chose Paradise over a palace", "She asked to be saved"],
      quote: q66(11),
      source: ik(11, "Ibn Kathir explains her prayer: save me from Firawn and his deeds, because I am innocent of what he does.", "deliver me from him, because I am innocent of his actions"),
      difficulty: 2,
      questions: [
        { q: "What did Asiyah ask Allah for?", a: "A home with Him in Paradise", wrong: ["A bigger palace", "More servants", "Gold jewelry"], why: "My Lord! Build for me a home with You in Paradise." },
        { q: "Why did she ask to be saved from Firawn?", a: "She was innocent of his deeds", wrong: ["She was bored", "She wanted travel", "She was hungry"], why: "Deliver me from him, because I am innocent of his actions." },
        { tf: true, q: "She preferred Paradise over the palace of Firawn.", why: "My Lord! Build for me a home with You in Paradise, and save me from Firawn." }
      ]
    },
    {
      slug: "his-disbelief-did-not-harm-her",
      title: "His disbelief did not harm her",
      line: "Qatadah: her husband's disbelief did not hurt her faith.",
      facts: ["Each is judged for own deeds", "Allah is the Just Judge"],
      quote: q66(11),
      source: ik(11, "Qatadah said Firawn's wife was not affected by her husband's disbelief because she obeyed her Lord, and Allah punishes no one except for their own sins.", "was not affected by her husband … because she obeyed her Lord"),
      difficulty: 3,
      questions: [
        { q: "Why was she not affected by his disbelief?", a: "She obeyed her Lord", wrong: ["She was rich", "She lived far away", "She was a queen"], why: "His wife was not affected by her husband's disbelief, because she obeyed her Lord." },
        { q: "For whose sins does Allah punish a person?", a: "Only their own", wrong: ["Their spouse's", "Their neighbor's", "Their town's"], why: "Allah is the Just Judge Who will not punish anyone except for their own sins." },
        { tf: false, q: "A wife is punished for her husband's sins.", why: "Allah is the Just Judge Who will not punish anyone except for their own sins." }
      ]
    },
    {
      slug: "maryam-kept-pure",
      title: "Maryam kept herself pure",
      line: "Maryam, daughter of Imran, guarded her purity and honor.",
      facts: ["A model of modesty", "Mother of Isa"],
      quote: q66(12),
      source: ik(12, "Ibn Kathir says Maryam protected and purified her honor.", "who protected and purified her honor"),
      difficulty: 2,
      questions: [
        { q: "Who is the second believing example?", a: "Maryam, daughter of Imran", wrong: ["Asiyah", "Hawwa", "Bilqis"], why: "And Maryam, the daughter of Imran." },
        { q: "What did Maryam protect?", a: "Her honor and purity", wrong: ["A treasure", "A castle", "A garden"], why: "Who protected and purified her honor." },
        { tf: true, q: "Maryam is praised for her purity.", why: "Who protected and purified her honor." }
      ]
    },
    {
      slug: "isa-through-jibril",
      title: "Isa by Allah's command",
      line: "Allah sent Jibril to Maryam, and Isa was created by His command.",
      facts: ["Ruh here means Jibril", "Isa had no father"],
      quote: q66(12),
      source: ik(12, "Ibn Kathir says Our Ruh in 66:12 means the angel Jibril, whom Allah sent to Maryam.", "meaning, through the angel Jibril. Allah sent the angel Jibril to Maryam"),
      difficulty: 3,
      questions: [
        { q: "Who is meant by Our Ruh in 66:12?", a: "The angel Jibril", wrong: ["A human", "The wind", "A bird"], why: "Through Our Ruh, meaning, through the angel Jibril." },
        { q: "Which prophet was born to Maryam?", a: "Isa", wrong: ["Musa", "Yahya", "Harun"], why: "This is how Isa was conceived." },
        { tf: false, q: "Isa had a human father.", why: "Allah sent the angel Jibril to Maryam; this is how Isa was conceived." }
      ]
    },
    {
      slug: "she-believed-and-obeyed",
      title: "She believed and obeyed",
      line: "Maryam believed her Lord's words and books, and was obedient.",
      facts: ["Qanitin: the devoutly obedient", "Kalimat: His decree"],
      quote: q66(12),
      source: ik(12, "Ibn Kathir says Maryam testified to her Lord's Kalimat and Kutub, meaning His decree and His legislation, and she was of the Qanitin.", "meaning His decree and His legislation"),
      difficulty: 3,
      questions: [
        { q: "What did Maryam testify to?", a: "Her Lord's words and books", wrong: ["Firawn's power", "Old idols", "Magic"], why: "And she testified to the truth of her Lords Kalimat, and His Kutub." },
        { q: "What do Kalimat and Kutub mean?", a: "His decree and legislation", wrong: ["Songs and poems", "Stories for fun", "Old maps"], why: "Her Lords Kalimat, and His Kutub, meaning His decree and His legislation." },
        { tf: true, q: "Maryam was among the devoutly obedient.", why: "And she was of the Qanitin." }
      ]
    },
    {
      slug: "knowledge-and-deeds",
      title: "Knowledge and deeds",
      line: "Maryam was a siddiqah: complete in knowledge and in deeds.",
      facts: ["As-Sa'di explains", "Siddiqiyyah"],
      quote: q66(12),
      source: saadi(66, 12, "As-Sa'di says believing Allah's words and books shows Maryam's knowledge, being obedient shows her deeds, and being a siddiqah means having both in full.", "والصديقية: هي كمال العلم والعمل"),
      difficulty: 3,
      questions: [
        { q: "What is siddiqiyyah, per as-Sa'di?", a: "Full knowledge and full deeds", wrong: ["Only fasting", "Only wealth", "Only talking"], why: "Siddiqiyyah is complete knowledge and action, says as-Sa'di." },
        { q: "What does believing in Allah's books need?", a: "Knowing them", wrong: ["Nothing", "Money", "Travel"], why: "Believing in them needs knowledge and action." },
        { tf: true, q: "Maryam kept obeying Allah with humility.", why: "As-Sa'di on 66:12." }
      ]
    },
    {
      slug: "best-of-women",
      title: "The best of women",
      line: "The Prophet ﷺ named Asiyah and Maryam as women of perfection.",
      facts: ["Asiyah and Maryam honored", "Khadija the best of her nation"],
      quote: q66(12),
      source: hadith("bukhari", "3411", "Abu Musa al-Ash'ari", "Sahih", "The Prophet ﷺ said many men reached perfection but among women only Asiyah, the wife of Firawn, and Maryam, the daughter of Imran.", "Many amongst men reached (the level of) perfection but none amongst the women reached this level except Asia, Pharaoh"),
      difficulty: 2,
      questions: [
        { q: "Which two women in 66:11-12 reached perfection?", a: "Asiyah and Maryam", wrong: ["Wives of Nuh and Lut", "Hawwa and Sarah", "Bilqis and Hajar"], why: "None amongst the women reached this level except Asia, Pharaoh's wife, and Mary, the daughter of Imran." },
        { q: "Who reported the hadith of perfection?", a: "Abu Musa al-Ash'ari", wrong: ["Abu Jahl", "Firawn", "Haman"], why: "Narrated Abu Musa: Allah's Messenger said, Many amongst men reached perfection." },
        { tf: false, q: "No woman ever reached perfection.", why: "None amongst the women reached this level except Asia, Pharaoh's wife, and Mary." }
      ]
    },
    {
      slug: "maryam-and-khadija",
      title: "Maryam and Khadija",
      line: "Ali heard: Maryam and Khadija were the best women of their time.",
      facts: ["Khadija: first to believe", "Ali ibn Abi Talib narrated it"],
      quote: q66(12),
      source: hadith("bukhari", "3432", "Ali ibn Abi Talib", "Sahih", "The Prophet ﷺ said Mary, the daughter of Imran, was the best among the women, and Khadija is the best among the women.", "was the best among the women"),
      difficulty: 2,
      questions: [
        { q: "Which two women did the Prophet ﷺ call the best?", a: "Maryam and Khadija", wrong: ["Asiyah and Hawwa", "Sarah and Hajar", "Bilqis and Zulaykha"], why: "Mary, the daughter of Imran, was the best among the women and Khadija is the best amongst the women." },
        { q: "Who narrated that hadith?", a: "Ali ibn Abi Talib", wrong: ["Abu Lahab", "Qarun", "Haman"], why: "Narrated Ali: I heard the Prophet ﷺ saying, Mary, the daughter of Imran, was the best." },
        { tf: true, q: "Khadija was honored as best of the women of this nation.", why: "And Khadija is the best amongst the women of this nation." }
      ]
    }
  ]
};

export const TAHRIM_UNITS: readonly DeepUnit[] = [TAHRIM_ONE, TAHRIM_TWO, TAHRIM_THREE];
