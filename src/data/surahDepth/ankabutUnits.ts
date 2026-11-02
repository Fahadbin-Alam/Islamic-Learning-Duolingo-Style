import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Al-'Ankabut ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-'Ankabut 29:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_29_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-'Ankabut 29:${ayah}`,
    url: `https://quran.com/29:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 29:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q29 = (ayah: number) => quranQuote(29, ayah);
/** Ayahs 1 to 13: tested for faith, striving for yourself, kindness to parents, the hypocrite on the edge, and carrying loads. */
const ANKABUT_ONE: DeepUnit = {
  key: "ankabut1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-29",
  name: "Al-'Ankabut, ayahs 1 to 13",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-'Ankabut",
  lessons: [
    {
      slug: "will-they-not-be-tested",
      title: "Will they not be tested?",
      line: "Saying we believe is not enough; every believer is tested.",
      facts: ["Tests show true faith", "Alif Lam Mim opens the surah"],
      quote: q29(2),
      source: ik(2, "Allah asks, as a rebuke, whether people think they will be left alone for saying we believe without being tested. Allah tests His believers according to their faith.", "Allah will inevitably test His believing servants according to their level of faith"),
      difficulty: 2,
      questions: [
        { q: "Which letters open Al-'Ankabut?", a: "Alif Lam Mim", wrong: ["Ta Sin Mim", "Ya Sin", "Ha Mim"], why: "Alif Lam Mim." },
        { q: "What will believers face, in 29:2?", a: "Tests", wrong: ["Nothing", "Only ease", "Only riches"], why: "Do people think that they will be left alone because they say: We believe, and will not be tested." },
        { q: "How does Allah test, per Ibn Kathir?", a: "By their level of faith", wrong: ["By their wealth", "By their age", "By their height"], why: "Allah will inevitably test His believing servants according to their level of faith." }
      ]
    },
    {
      slug: "the-most-tested",
      title: "The most tested",
      line: "The Prophets are tested most, then the next best, then the next.",
      facts: ["Strong faith, strong tests", "Tests wipe away sins"],
      quote: q29(2),
      source: hadith("tirmidhi", "2398", "Sa'd ibn Abi Waqqas", "Hasan Sahih", "A man asked who is tried most severely. The Prophet ﷺ said the Prophets, then those nearest them. A person is tried by his religion, until he walks with no sins.", "A man is tried according to his religion"),
      difficulty: 3,
      questions: [
        { q: "Who are tried most severely, in the hadith?", a: "The Prophets", wrong: ["The kings", "The poor", "The children"], why: "He said: The Prophets, then those nearest to them, then those nearest to them." },
        { q: "What decides a person's test, in the hadith?", a: "His religion", wrong: ["His clothes", "His city", "His job"], why: "A man is tried according to his religion." },
        { tf: true, q: "In the hadith, trials can leave a servant with no sins.", why: "The servant shall continue to be tried until he is left walking upon the earth without any sins." }
      ]
    },
    {
      slug: "true-or-liars",
      title: "The truthful and the liars",
      line: "Allah tested those before us to show the truthful and the liars.",
      facts: ["Allah already knows all", "Tests make it plain"],
      quote: q29(3),
      source: ik(3, "Allah tested past nations to make plain who is sincere in their faith and who is lying. Allah already knows what was, what will be, and what would have been.", "He will make know which are sincere in their claim to be believers from those who are lying"),
      difficulty: 3,
      questions: [
        { q: "Who were tested before us, in 29:3?", a: "Those before them", wrong: ["No one", "Only angels", "Only animals"], why: "And We indeed tested those who were before them." },
        { q: "What do tests make plain, per Ibn Kathir?", a: "Who is sincere and who lies", wrong: ["Who is rich", "Who is tall", "Who is fast"], why: "He will make know which are sincere in their claim to be believers from those who are lying." },
        { tf: true, q: "Ibn Kathir says Allah knows what will happen before it happens.", why: "Allah knows what has happened in the past and what is yet to come." }
      ]
    },
    {
      slug: "none-can-outrun-allah",
      title: "None can outrun Allah",
      line: "Evildoers think they can escape Allah; evil is their judgment.",
      facts: ["No one escapes Allah", "Tests come to all"],
      quote: q29(4),
      source: ik(4, "Those who do evil should not think they can escape from Allah. A greater punishment lies ahead of them.", "those who are not believers should not think that they will escape such trials and tests"),
      difficulty: 3,
      questions: [
        { q: "What do evildoers think, in 29:4?", a: "They can outstrip Allah", wrong: ["They are wise", "They are poor", "They are kind"], why: "Or think those who do evil deeds that they can outstrip Us?" },
        { q: "What does outstrip mean, per Ibn Kathir?", a: "Escape", wrong: ["Win a race", "Grow rich", "Sleep"], why: "Outstrip Us, meaning, escape from Us." },
        { tf: false, q: "In 29:4 their judgment is called good.", why: "Evil is that which they judge!" }
      ]
    },
    {
      slug: "meeting-allah-is-coming",
      title: "The meeting is coming",
      line: "Whoever hopes to meet Allah: His set time will surely come.",
      facts: ["He hears every dua", "Hope with good deeds"],
      quote: q29(5),
      source: ik(5, "Whoever hopes to meet Allah and does good deeds, Allah will fulfill his hope. He hears all supplications and knows every need.", "Allah will fulfill his hopes and reward him for his deeds in full"),
      difficulty: 3,
      questions: [
        { q: "What is surely coming, in 29:5?", a: "Allah's term", wrong: ["A storm", "A king", "A feast"], why: "Then Allah's term is surely coming." },
        { q: "Which Names end 29:5?", a: "All-Hearer, All-Knower", wrong: ["Most Rich, Praised", "Mighty, Wise", "Forgiving, Kind"], why: "And He is the All-Hearer, the All-Knower." },
        { q: "What will Allah do for the hopeful, per Ibn Kathir?", a: "Fulfill his hopes", wrong: ["Ignore him", "Delay forever", "Forget him"], why: "Allah will fulfill his hopes and reward him for his deeds in full." }
      ]
    },
    {
      slug: "striving-for-yourself",
      title: "Striving for yourself",
      line: "Whoever strives, strives for himself; Allah needs no one.",
      facts: ["Good deeds benefit you", "Allah is free of need"],
      quote: q29(6),
      source: ik(6, "The benefit of every good deed returns to the doer. Even if everyone were as pious as the most pious, that would not add to Allah's dominion at all.", "the benefit of that deed will come back to him"),
      difficulty: 3,
      questions: [
        { q: "For whom does one strive, in 29:6?", a: "For himself", wrong: ["For Allah's need", "For the king", "For no one"], why: "And whosoever strives, he strives only for himself." },
        { q: "Does Allah need His creatures, in 29:6?", a: "No", wrong: ["Yes", "Sometimes", "Only angels"], why: "Verily, Allah stands not in need of any of the creatures." },
        { tf: false, q: "Ibn Kathir says people's piety adds to Allah's dominion.", why: "That would not add to His dominion in the slightest." }
      ]
    },
    {
      slug: "ten-to-seven-hundred",
      title: "Ten to seven hundred",
      line: "Allah wipes sins away and rewards believers by their best deeds.",
      facts: ["Good deeds multiply", "Bad deeds count once"],
      quote: q29(7),
      source: ik(7, "Though He needs nothing, Allah is generous. He wipes away the bad deeds of believers and gives ten to seven hundred rewards for one good deed.", "in return for one good deed will give anything between ten rewards and seven hundred"),
      difficulty: 3,
      questions: [
        { q: "What does Allah wipe away, in 29:7?", a: "Their evil deeds", wrong: ["Their names", "Their homes", "Their prayers"], why: "Surely, We shall expiate from them their evil deeds." },
        { q: "How much for one good deed, per Ibn Kathir?", a: "Ten to seven hundred", wrong: ["Only one", "Two", "None"], why: "In return for one good deed will give anything between ten rewards and seven hundred." },
        { q: "How much for one bad deed, per Ibn Kathir?", a: "Only one, or forgiven", wrong: ["Ten", "Seven hundred", "Seventy"], why: "But for every bad deed, He will give only one evil merit, or even that He may overlook and forgive." }
      ]
    },
    {
      slug: "kindness-to-parents",
      title: "Kindness to parents",
      line: "Be good to your parents, but never obey them in shirk.",
      facts: ["Parents deserve kindness", "No obedience in shirk"],
      quote: q29(8),
      source: ik(8, "Allah commands kindness to parents right after Tawhid, since they are the cause of our existence. If they push us to shirk, we do not obey them in that.", "he must treat them with the utmost kindness and respect"),
      difficulty: 3,
      questions: [
        { q: "What is enjoined on man, in 29:8?", a: "Being dutiful to parents", wrong: ["Being rich", "Being famous", "Being silent"], why: "And We have enjoined on man to be dutiful to his parents." },
        { q: "When do we not obey parents, in 29:8?", a: "When they push to shirk", wrong: ["When they are tired", "When they are old", "When they are poor"], why: "But if they strive to make you associate with Me, then obey them not." },
        { q: "Why must we honor parents, per Ibn Kathir?", a: "They caused our existence", wrong: ["They are rich", "They are strict", "They are famous"], why: "Because a person's parents are the cause of his existence." }
      ]
    },
    {
      slug: "sad-and-his-mother",
      title: "Sa'd and his mother",
      line: "Sa'd's mother refused food so he would leave Islam; he stayed.",
      facts: ["Firm faith with gentle manners", "Allah answered Sa'd's trial"],
      quote: q29(8),
      source: hadith("muslim", "1748", "Sa'd", "Sahih", "Sa'd's mother swore not to eat, drink or speak until he left Islam. Allah revealed 29:8: be kind to parents, but do not obey them in shirk.", "she neither ate nor drank"),
      difficulty: 4,
      questions: [
        { q: "What did Sa'd's mother refuse, in the hadith?", a: "To eat or drink", wrong: ["To travel", "To sleep", "To buy"], why: "She neither ate nor drank." },
        { q: "What did she want Sa'd to do, in the hadith?", a: "Abandon his faith", wrong: ["Move house", "Get married", "Be a trader"], why: "His mother had taken oath that she would never talk with him until he abandoned his faith." },
        { tf: true, q: "Ayah 29:8 was revealed about Sa'd.", why: "Many verses of the Qur'an had been revealed in connection with him." }
      ]
    },
    {
      slug: "among-the-righteous",
      title: "Among the righteous",
      line: "Believers who do good will be brought in among the righteous.",
      facts: ["Love decides your company", "Choose righteous friends"],
      quote: q29(9),
      source: ik(9, "Allah gathers the believer with the righteous, not with idol worshipping parents, for a person is raised with those he loves in faith.", "a person will be gathered on the Day of Resurrection with those whom he loves"),
      difficulty: 3,
      questions: [
        { q: "With whom are believers admitted, in 29:9?", a: "The righteous", wrong: ["The kings", "The rich", "The poets"], why: "Surely, We shall admit them among the righteous." },
        { q: "Whom are we gathered with, per Ibn Kathir?", a: "Those we love", wrong: ["Our neighbors", "Our classmates", "Strangers"], why: "A person will be gathered on the Day of Resurrection with those whom he loves." },
        { tf: true, q: "Ibn Kathir means love for the sake of the religion.", why: "With those whom he loves, meaning, religious love." }
      ]
    },
    {
      slug: "faith-on-the-edge",
      title: "Faith on the edge",
      line: "Some quit faith when hurt, yet claim it when victory comes.",
      facts: ["Stay firm in hard times", "Allah knows the hearts"],
      quote: q29(10),
      source: ik(10, "Some claim faith with their lips only. When hardship comes they see it as Allah's punishment and leave Islam, but when victory comes they say: we were with you.", "When a test or trial comes in this world, they think that this is a punishment from Allah"),
      difficulty: 4,
      questions: [
        { q: "What do they say when victory comes, in 29:10?", a: "We were with you", wrong: ["We are sorry", "We are tired", "We are leaving"], why: "And if victory comes from your Lord, they will say: Verily, we were with you." },
        { q: "How do they see a trial, per Ibn Kathir?", a: "As Allah's punishment", wrong: ["As a gift", "As a game", "As nothing"], why: "When a test or trial comes in this world, they think that this is a punishment from Allah." },
        { q: "Which ayah does Ibn Kathir link to 29:10?", a: "22:11", wrong: ["1:1", "2:255", "112:1"], why: "And among mankind is he who worships Allah as it were upon the edge. (22:11)" }
      ]
    },
    {
      slug: "allah-knows-the-hypocrites",
      title: "Allah knows the hypocrites",
      line: "Allah knows the true believers and the hypocrites alike.",
      facts: ["Obey in ease and hardship", "Tests sort hearts"],
      quote: q29(11),
      source: ik(11, "Allah tests people with hardship and ease to distinguish the believers who obey in both from the hypocrites who obey only when things suit them.", "so that He may distinguish the believers from the hypocrites"),
      difficulty: 4,
      questions: [
        { q: "Whom does Allah know, in 29:11?", a: "Believers and hypocrites", wrong: ["Only kings", "Only angels", "No one"], why: "And indeed Allah knows those who believe, and verily, He knows the hypocrites." },
        { q: "With what does Allah test, per Ibn Kathir?", a: "Calamities and times of ease", wrong: ["Only riches", "Only games", "Only sleep"], why: "Allah will test the people with calamities and with times of ease." },
        { tf: true, q: "Ibn Kathir links 29:11 to 47:31 about testing the patient.", why: "And surely, We shall try you till We test those who strive hard and the patient. (47:31)" }
      ]
    },
    {
      slug: "follow-us-we-carry-your-sins",
      title: "We will carry your sins",
      line: "Deniers said follow us, we will carry your sins; they lied.",
      facts: ["No one carries your sins", "Each answers for himself"],
      quote: q29(12),
      source: ik(12, "The Quraysh told the believers to return to their religion and promised to carry their sins. Allah says this is a lie, for no one bears another's sins.", "for no person will bear the sins of another"),
      difficulty: 3,
      questions: [
        { q: "What did the deniers offer, in 29:12?", a: "To bear their sins", wrong: ["To pay them", "To feed them", "To teach them"], why: "Follow our way and let us bear your sins." },
        { q: "Were they telling the truth, in 29:12?", a: "No, they are liars", wrong: ["Yes", "Partly", "Only once"], why: "Never will they bear anything of their sins. Surely, they are liars." },
        { q: "Why is it a lie, per Ibn Kathir?", a: "No one bears another's sins", wrong: ["They were poor", "They were few", "They forgot"], why: "For no person will bear the sins of another." }
      ]
    },
    {
      slug: "their-own-loads-and-more",
      title: "Their own loads and more",
      line: "Those who mislead carry their own sins and the sins they spread.",
      facts: ["Call only to good", "Questioned about lies"],
      quote: q29(13),
      source: ik(13, "Those who call others to misguidance carry their own sins and the sins of those they misled, without lessening the followers' load.", "because of the people they misguided"),
      difficulty: 4,
      questions: [
        { q: "What do they carry, in 29:13?", a: "Their loads and others", wrong: ["Nothing", "Only gold", "Only books"], why: "And verily, they shall bear their own loads, and other loads besides their own." },
        { q: "Why the extra loads, per Ibn Kathir?", a: "For the people they misguided", wrong: ["For their age", "For their wealth", "For their travel"], why: "Bear their own sins and the sins of others, because of the people they misguided." },
        { q: "About what will they be questioned, in 29:13?", a: "What they fabricated", wrong: ["Their food", "Their houses", "Their clothes"], why: "They shall be questioned on the Day of Resurrection about that which they used to fabricate." }
      ]
    },
    {
      slug: "callers-to-good",
      title: "Callers to good",
      line: "Who calls to good shares the reward of all who follow.",
      facts: ["Teach good to others", "Never invite to sin"],
      quote: q29(13),
      source: hadith("muslim", "2674", "Abu Hurairah", "Sahih", "The Prophet ﷺ said whoever calls to guidance gets the reward of those who follow, and whoever calls to error carries the sin of those who follow, with nothing lessened.", "He who called (people) to righteousness, there would be reward"),
      difficulty: 4,
      questions: [
        { q: "What does a caller to good get, in the hadith?", a: "Reward like his followers", wrong: ["Nothing", "Only praise", "Gold"], why: "There would be reward for him like the rewards of those who adhered to it." },
        { q: "Is the followers' reward lessened, in the hadith?", a: "No", wrong: ["Yes, by half", "Yes, fully", "Sometimes"], why: "Without their rewards being diminished in any respect." },
        { tf: true, q: "Calling to error brings the sin of those who follow.", why: "And he who called people to error, he shall have to carry the burden of its sin, like those who committed it." }
      ]
    },
    {
      slug: "the-truly-bankrupt",
      title: "The truly bankrupt",
      line: "The bankrupt one loses his good deeds to those he wronged.",
      facts: ["Wronging people costs deeds", "Settle rights in this life"],
      quote: q29(13),
      source: hadith("muslim", "2581", "Abu Hurairah", "Sahih", "The Prophet ﷺ asked who is poor. The truly poor comes with prayer, fasting and Zakah, but had abused, slandered and wronged others, so his good deeds go to them.", "Do you know who is poor"),
      difficulty: 5,
      questions: [
        { q: "What did the bankrupt bring, in the hadith?", a: "Prayers, fasts and Zakat", wrong: ["Only gold", "Nothing at all", "Only friends"], why: "He would come on the Day of Resurrection with prayers and fasts and Zakat." },
        { q: "Where do his good deeds go, in the hadith?", a: "To those he wronged", wrong: ["To his family", "To the poor", "Nowhere"], why: "His virtues would be credited to the account of one who suffered at his hand." },
        { q: "What did the Companions think poor meant?", a: "No money or wealth", wrong: ["No friends", "No house", "No food"], why: "A poor man amongst us is one who has neither dirham with him nor wealth." }
      ]
    }
  ]
};
/** Ayahs 14 to 30: Nuh's long call, Ibrahim's preaching and the fire, Lut's emigration, and Lut warning his people. */
const ANKABUT_TWO: DeepUnit = {
  key: "ankabut2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-29",
  name: "Al-'Ankabut, ayahs 14 to 30",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-'Ankabut",
  lessons: [
    {
      slug: "nine-hundred-fifty-years",
      title: "Nine hundred fifty years",
      line: "Nuh called his people for 950 years, yet few believed.",
      facts: ["Patience in dawah", "Guidance is from Allah"],
      quote: q29(14),
      source: ik(14, "Allah consoled the Prophet ﷺ with Nuh, who called his people night and day, secretly and openly, for a thousand years less fifty, yet only a few believed.", "calling them night and day, in secret and openly"),
      difficulty: 3,
      questions: [
        { q: "How long did Nuh stay among them, in 29:14?", a: "A thousand years less fifty", wrong: ["Forty years", "One hundred years", "Ten years"], why: "And he stayed among them a thousand years less fifty years." },
        { q: "How did Nuh call them, per Ibn Kathir?", a: "Night and day, secretly and openly", wrong: ["Only once", "Only by letter", "Only on Fridays"], why: "Calling them night and day, in secret and openly." },
        { q: "Why was Nuh's story told to the Prophet ﷺ, per Ibn Kathir?", a: "To console him", wrong: ["To scare him", "For fun", "To test his memory"], why: "Here Allah consoles His servant and Messenger Muhammad." }
      ]
    },
    {
      slug: "the-ark-a-sign",
      title: "The Ark, a sign",
      line: "Allah saved Nuh and those in the Ark, a sign for all.",
      facts: ["Allah saves believers", "Ships remind us of Him"],
      quote: q29(15),
      source: ik(15, "Allah saved Nuh and the believers on the Ark and left it as a sign for all people, either the ship itself, or ships in general as a reminder.", "the concept of sailing in ships was left as a reminder to mankind"),
      difficulty: 3,
      questions: [
        { q: "Whom did Allah save, in 29:15?", a: "Nuh and the people of the Boat", wrong: ["Only the animals", "No one", "Only the king"], why: "Then We saved him and the Companions of the Boat." },
        { q: "Where did the ship remain, per Qatadah?", a: "On Mount Judi", wrong: ["In Makkah", "In Egypt", "At sea forever"], why: "That it remained until the beginning of Islam, on Mount Judi." },
        { tf: true, q: "Ibn Kathir says sailing ships remind us of the rescue.", why: "The concept of sailing in ships was left as a reminder to mankind of how Allah had saved them." }
      ]
    },
    {
      slug: "worship-and-fear-allah",
      title: "Worship and fear Allah",
      line: "Ibrahim said: worship Allah and fear Him; that is best for you.",
      facts: ["Worship Allah sincerely", "Good in both worlds"],
      quote: q29(16),
      source: ik(16, "Ibrahim, the Imam of the monotheists, called his people to worship and fear Allah alone, which brings good in this world and the next.", "you will attain good in this world and the next"),
      difficulty: 2,
      questions: [
        { q: "What did Ibrahim tell his people, in 29:16?", a: "Worship Allah and fear Him", wrong: ["Build towers", "Gather gold", "Leave the city"], why: "Worship Allah, and have Taqwa of Him." },
        { q: "What do they gain, per Ibn Kathir?", a: "Good in both worlds", wrong: ["Only money", "Only fame", "Nothing"], why: "You will attain good in this world and the next." },
        { q: "What title does Ibn Kathir give Ibrahim?", a: "Imam of the monotheists", wrong: ["King of Babylon", "Poet of Iraq", "Chief trader"], why: "Ibrahim, the Imam of the monotheists, called his people to worship Allah alone." }
      ]
    },
    {
      slug: "seek-provision-from-allah",
      title: "Seek provision from Allah",
      line: "Idols cannot provide; seek provision from Allah and thank Him.",
      facts: ["Ask Allah alone", "Be grateful"],
      quote: q29(17),
      source: ik(17, "The idols cannot provide anything. Ask Allah alone for provision, worship Him, and thank Him for His blessings.", "do not seek it from anyone or anything other than Him"),
      difficulty: 3,
      questions: [
        { q: "What can idols not give, in 29:17?", a: "Provision", wrong: ["Shade", "Color", "Weight"], why: "Those whom you worship besides Allah have no power to give you provision." },
        { q: "From whom should we seek provision, per Ibn Kathir?", a: "Allah alone", wrong: ["Idols", "Kings", "Stars"], why: "Do not seek it from anyone or anything other than Him." },
        { q: "Which ayah does Ibn Kathir link to 29:17?", a: "1:5", wrong: ["2:255", "112:1", "36:1"], why: "You (Alone) we worship, and You (Alone) we ask for help. (1:5)" }
      ]
    },
    {
      slug: "only-to-convey",
      title: "Only to convey",
      line: "Nations before denied too; a Messenger must only convey clearly.",
      facts: ["Guidance is Allah's", "Our job is to share"],
      quote: q29(18),
      source: ik(18, "If they deny, nations before them denied too. The Messengers only have to convey the Message as Allah commanded; Allah guides whom He wills.", "All the Messengers have to do is to convey the Message as Allah has commanded them"),
      difficulty: 3,
      questions: [
        { q: "What is the duty of the Messenger ﷺ, in 29:18?", a: "To convey plainly", wrong: ["To force people", "To rule kings", "To get rich"], why: "And the duty of the Messenger ﷺ is only to convey plainly." },
        { q: "What did Qatadah call 29:18?", a: "Consolation to the Prophet ﷺ", wrong: ["A command to fight", "A poem", "A story of Musa"], why: "Qatadah said: These are words of consolation to His Prophet." },
        { tf: true, q: "In 29:18, nations before had denied as well.", why: "And if you deny, then nations before you have denied." }
      ]
    },
    {
      slug: "he-repeats-creation",
      title: "He repeats creation",
      line: "Allah began creation and will repeat it; that is easy for Him.",
      facts: ["Resurrection is easy for Allah", "We were once nothing"],
      quote: q29(19),
      source: ik(19, "Allah created people after they were nothing. The One Who began creation can repeat it, and that is very easy for Him.", "The One Who originated this is able to repeat it"),
      difficulty: 3,
      questions: [
        { q: "What is easy for Allah, in 29:19?", a: "Repeating creation", wrong: ["Nothing", "Only rain", "Only light"], why: "See they not how Allah originates the creation, then repeats it. Verily, that is easy for Allah." },
        { q: "What were we before creation, per Ibn Kathir?", a: "Nothing at all", wrong: ["Stars", "Angels", "Stones"], why: "Allah created them after they had been nothing at all." },
        { q: "Which ayah does Ibn Kathir link to 29:19?", a: "30:27", wrong: ["1:1", "2:255", "112:1"], why: "And He it is Who originates the creation, then He will repeat it. (30:27)" }
      ]
    },
    {
      slug: "travel-and-see",
      title: "Travel and see",
      line: "Travel the land, see how creation began, and know the Hereafter.",
      facts: ["Nature points to the Creator", "Allah can do all things"],
      quote: q29(20),
      source: ik(20, "Ibrahim taught them to reflect on the heavens, stars, mountains, rivers and fruits, which show there is a Creator Who says Be and it is.", "there must be a Creator Who does as He chooses"),
      difficulty: 3,
      questions: [
        { q: "What should we do, in 29:20?", a: "Travel and see", wrong: ["Sleep and forget", "Stay home always", "Close our eyes"], why: "Say: Travel in the land and see how He originated the creation." },
        { q: "What do the signs show, per Ibn Kathir?", a: "There must be a Creator", wrong: ["Nothing", "Chance", "Magic"], why: "There must be a Creator Who does as He chooses." },
        { tf: true, q: "In 29:20 Allah brings forth the creation of the Hereafter.", why: "And then Allah will bring forth the creation of the Hereafter." }
      ]
    },
    {
      slug: "punishes-and-shows-mercy",
      title: "Punishment and mercy",
      line: "Allah punishes or shows mercy as He wills, and always justly.",
      facts: ["Allah is never unjust", "We return to Him"],
      quote: q29(21),
      source: ik(21, "Allah is the Ruler Who does as He wills. Whatever He decides is fair and just; He cannot be unjust in the slightest.", "whatever He decides is fair and just"),
      difficulty: 4,
      questions: [
        { q: "To whom will we be returned, in 29:21?", a: "To Allah", wrong: ["To the earth", "To the kings", "To no one"], why: "And to Him you will be returned." },
        { q: "How are Allah's decisions, per Ibn Kathir?", a: "Fair and just", wrong: ["Random", "Unfair", "Hidden from Him"], why: "Whatever He decides is fair and just." },
        { tf: false, q: "Ibn Kathir says people can question Allah's judgment.", why: "None can question Him about what He does; rather it is they who will be questioned." }
      ]
    },
    {
      slug: "no-escape-in-earth-or-sky",
      title: "No escape",
      line: "None can escape Allah on earth or in the sky.",
      facts: ["Allah is above His servants", "Only He protects"],
      quote: q29(22),
      source: ik(22, "No one in heaven or earth can flee from Allah. He is above His servants, everything needs Him, and He needs nothing.", "No one in heaven or on earth can flee from Him"),
      difficulty: 3,
      questions: [
        { q: "Where can we escape Allah, in 29:22?", a: "Nowhere", wrong: ["In the sky", "In the sea", "In a cave"], why: "And you cannot escape in the earth or in the heaven." },
        { q: "Who is our helper besides Allah, in 29:22?", a: "No one", wrong: ["Our friends", "Our wealth", "Our idols"], why: "And besides Allah you have neither any protector nor any helper." },
        { tf: true, q: "Ibn Kathir says everything needs Allah.", why: "Everything fears Him and is in need of Him, while He is the One Who is Independent of all else." }
      ]
    },
    {
      slug: "no-hope-of-mercy",
      title: "No share in mercy",
      line: "Those who deny Allah's signs and the meeting lose hope of mercy.",
      facts: ["Believe in the meeting", "Mercy is for believers"],
      quote: q29(23),
      source: ik(23, "Those who disbelieve in Allah's signs and deny the Resurrection will have no share in His mercy, and a painful punishment awaits them.", "they will have no share in it"),
      difficulty: 4,
      questions: [
        { q: "What do they deny, in 29:23?", a: "Allah's Ayat and the meeting", wrong: ["The weather", "The market", "The seasons"], why: "Those who disbelieve in the Ayat of Allah and meeting with Him." },
        { q: "What is their share of mercy, per Ibn Kathir?", a: "None", wrong: ["A lot", "Half", "Some"], why: "Such have no hope of My mercy, they will have no share in it." },
        { tf: true, q: "Ibn Kathir says they denied the Resurrection.", why: "Those who disbelieved in the signs of Allah and denied the Resurrection." }
      ]
    },
    {
      slug: "saved-from-the-fire",
      title: "Saved from the fire",
      line: "They threw Ibrahim into the fire, and Allah saved him.",
      facts: ["Allah protects His friends", "Truth wins arguments"],
      quote: q29(24),
      source: ik(24, "After the proof was clear, Ibrahim's people turned to force and threw him into a huge fire. Allah made it cool and safe, and he came out unharmed.", "He rescued him from it by making it cool and safe for him"),
      difficulty: 3,
      questions: [
        { q: "What did his people answer, in 29:24?", a: "Harm him", wrong: ["We believe", "Teach us", "Stay with us"], why: "Instead of believing, they plotted to harm him and threw him in the fire." },
        { q: "How did Allah save him, per Ibn Kathir?", a: "Made the fire cool and safe", wrong: ["Sent rain", "Sent an army", "Hid him"], why: "He rescued him from it by making it cool and safe for him." },
        { q: "Why did they use force, per Ibn Kathir?", a: "The proof was against them", wrong: ["They were bored", "They were hungry", "They were afraid of rain"], why: "This was because proof had clearly been established against them." }
      ]
    },
    {
      slug: "friendship-that-ends",
      title: "Friendship that ends",
      line: "Friendship built on idols ends; that Day they disown each other.",
      facts: ["Friends for Allah last", "Taqwa keeps friendship"],
      quote: q29(25),
      source: ik(25, "Ibrahim said their love around idols lasts only in this world. On the Day of Resurrection it turns to enmity, except for those with Taqwa.", "this love and friendship will turn into hatred and enmity"),
      difficulty: 4,
      questions: [
        { q: "Where does their love last, in 29:25?", a: "Only in this world", wrong: ["Forever", "In Paradise", "Nowhere"], why: "The love between you is only in the life of this world." },
        { q: "What does their love become, per Ibn Kathir?", a: "Hatred and enmity", wrong: ["Deeper love", "Wealth", "Silence"], why: "This love and friendship will turn into hatred and enmity." },
        { q: "Which friends stay friends, per 43:67?", a: "Those with Taqwa", wrong: ["The rich", "The strong", "The famous"], why: "Friends on that Day will be foes one to another except those who have Taqwa. (43:67)" }
      ]
    },
    {
      slug: "lut-believed",
      title: "Lut believed",
      line: "Lut believed in Ibrahim, who said: I will emigrate for my Lord.",
      facts: ["Leave for Allah's sake", "Few can be enough"],
      quote: q29(26),
      source: ik(26, "From all of Ibrahim's people only Lut believed, along with Sarah. They emigrated to Syria to practice their religion openly.", "Among his people, only Lut believed in him"),
      difficulty: 3,
      questions: [
        { q: "Who believed in Ibrahim, in 29:26?", a: "Lut", wrong: ["Nimrod", "Azar", "Haman"], why: "So, Lut believed in him." },
        { q: "Where did they emigrate, per Qatadah?", a: "To Syria", wrong: ["To Egypt", "To Yemen", "To India"], why: "Qatadah said: They migrated together from Kutha and went to Syria." },
        { tf: true, q: "Ibn Kathir says only Lut among his people believed.", why: "Among his people, only Lut believed in him." }
      ]
    },
    {
      slug: "prophets-from-his-line",
      title: "Prophets from his line",
      line: "Allah gave Ibrahim Ishaq and Yaqub, and Prophets in his line.",
      facts: ["Every later Prophet is his descendant", "Reward in both worlds"],
      quote: q29(27),
      source: ik(27, "Allah gave Ibrahim Ishaq and Yaqub. After Ibrahim, every Prophet came from his descendants, ending with Muhammad ﷺ from Ismail's line.", "After the time of Ibrahim there was no Prophet who was not from among his descendants"),
      difficulty: 4,
      questions: [
        { q: "Whom did Allah give Ibrahim, in 29:27?", a: "Ishaq and Yaqub", wrong: ["Musa and Harun", "Dawud and Sulayman", "Yunus and Ayyub"], why: "And We bestowed on him, Ishaq and Ya'qub." },
        { q: "Which Prophets came from Ibrahim, per Ibn Kathir?", a: "Every Prophet after him", wrong: ["None", "Only one", "Only Arabs"], why: "After the time of Ibrahim there was no Prophet who was not from among his descendants." },
        { q: "From whose line is the last Prophet ﷺ, per Ibn Kathir?", a: "Ismail", wrong: ["Ishaq", "Yaqub", "Yusuf"], why: "From the descendants of Isma'il bin Ibrahim." }
      ]
    },
    {
      slug: "lut-warns-his-people",
      title: "Lut warns his people",
      line: "Lut warned his people of a shameful sin, never done before.",
      facts: ["Speak out against evil", "Prophets warn with care"],
      quote: q29(28),
      source: ik(28, "Prophet Lut denounced his people for an immoral deed that no people before them had done, along with their disbelief.", "denounced his people for their evil deed and their immoral actions"),
      difficulty: 4,
      questions: [
        { q: "Had anyone done their sin before, in 29:28?", a: "No one", wrong: ["Everyone", "Many nations", "Only kings"], why: "You commit immoral sins which none has preceded you in it in all creatures." },
        { q: "What did Lut do, per Ibn Kathir?", a: "Denounced their evil deed", wrong: ["Joined them", "Kept silent", "Praised them"], why: "Lut denounced his people for their evil deed and their immoral actions." },
        { tf: true, q: "Ibn Kathir says they also disbelieved in Allah.", why: "They also disbelieved in Allah and rejected and opposed His Messenger." }
      ]
    },
    {
      slug: "robbers-on-the-road",
      title: "Robbers on the road",
      line: "They robbed travelers, did evil openly, and mocked the warning.",
      facts: ["Public evil spreads", "Forbid wrong in gatherings"],
      quote: q29(29),
      source: ik(29, "Lut's people robbed travelers and did evil things in their gatherings without anyone forbidding it. They mocked him: bring the punishment if you are truthful.", "in your gatherings you do and say things that are not befitting"),
      difficulty: 4,
      questions: [
        { q: "Whom did they rob, in 29:29?", a: "The wayfarer", wrong: ["The king", "The angels", "The animals"], why: "And rob the wayfarer!" },
        { q: "What did they do in gatherings, per Ibn Kathir?", a: "Unbefitting things, unchecked", wrong: ["Read Quran", "Give charity", "Teach children"], why: "In your gatherings you do and say things that are not befitting, and you do not denounce one another." },
        { q: "What did they answer Lut, in 29:29?", a: "Bring the torment upon us", wrong: ["We repent", "Teach us", "We are sorry"], why: "Bring Allah's torment upon us if you are one of the truthful." }
      ]
    },
    {
      slug: "lut-asks-for-help",
      title: "Lut asks for help",
      line: "Lut prayed: my Lord, give me victory over the corrupt people.",
      facts: ["Turn to Allah in hardship", "Dua is a weapon"],
      quote: q29(30),
      source: ik(30, "Their mocking showed their disbelief and stubbornness, so Lut asked Allah for help against them.", "This is indicative of their disbelief, scornful attitude and stubbornness"),
      difficulty: 3,
      questions: [
        { q: "What did Lut pray for, in 29:30?", a: "Victory over the corrupt", wrong: ["Wealth", "A palace", "A long trip"], why: "My Lord! Give me victory over the people who are corrupt." },
        { q: "What did their answer show, per Ibn Kathir?", a: "Disbelief and stubbornness", wrong: ["Humility", "Fear of Allah", "Kindness"], why: "This is indicative of their disbelief, scornful attitude and stubbornness." },
        { tf: true, q: "Lut turned to Allah for help.", why: "So Allah's Prophet asked for help against them." }
      ]
    }
  ]
};
/** Ayahs 31 to 46: the angels visit Ibrahim and Lut, Shu'ayb, the ruined nations, the spider's house, prayer, and gentle debate. */
const ANKABUT_THREE: DeepUnit = {
  key: "ankabut3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-29",
  name: "Al-'Ankabut, ayahs 31 to 46",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-'Ankabut",
  lessons: [
    {
      slug: "guests-with-good-news",
      title: "Guests with good news",
      line: "Angels came to Ibrahim as guests with news of a son.",
      facts: ["Honor your guests", "Allah answers dua"],
      quote: q29(31),
      source: ik(31, "When Lut asked for help, Allah sent angels. They came first to Ibrahim as guests, and he served them well. They gave him news of a son from Sarah.", "They first came to Ibrahim in the form of guests"),
      difficulty: 3,
      questions: [
        { q: "What did the messengers bring Ibrahim, in 29:31?", a: "Glad tidings", wrong: ["Gold", "A letter", "Food"], why: "And when Our messengers came to Ibrahim with the glad tidings." },
        { q: "In what form did they come, per Ibn Kathir?", a: "As guests", wrong: ["As birds", "As soldiers", "As kings"], why: "They first came to Ibrahim in the form of guests." },
        { q: "Whose son did they announce, per Ibn Kathir?", a: "Sarah's", wrong: ["Hajar's", "Maryam's", "Asiyah's"], why: "The news of a righteous son born by his wife Sarah." }
      ]
    },
    {
      slug: "but-lut-is-there",
      title: "But Lut is there",
      line: "Ibrahim said Lut is there; the angels said they would save him.",
      facts: ["Care for believers", "Allah saves the righteous"],
      quote: q29(32),
      source: ik(32, "Ibrahim spoke up for the town, hoping they would be guided. The angels said they would save Lut and his family, except his wife, who supported the wrongdoers.", "hoping to win more time for them so that they might be guided by Allah"),
      difficulty: 3,
      questions: [
        { q: "Whom did Ibrahim mention, in 29:32?", a: "Lut", wrong: ["Ishaq", "Ismail", "Nuh"], why: "Ibrahim said: But there is Lut in it." },
        { q: "Why did Ibrahim speak up, per Ibn Kathir?", a: "Hoping they would be guided", wrong: ["To get gold", "To travel", "To rest"], why: "Hoping to win more time for them so that they might be guided by Allah." },
        { q: "Who stayed behind, per Ibn Kathir?", a: "Lut's wife", wrong: ["Lut", "His daughters", "No one"], why: "She used to support them in their disbelief and wrongdoing." }
      ]
    },
    {
      slug: "lut-worried-for-guests",
      title: "Lut worried for his guests",
      line: "Lut worried for his guests, but they said: do not fear.",
      facts: ["Protect your guests", "Allah's help is near"],
      quote: q29(33),
      source: ik(33, "The angels came to Lut looking like young men. He did not know who they were and feared what his people might do to his guests.", "At that point he did not know who they were"),
      difficulty: 3,
      questions: [
        { q: "How did Lut feel, in 29:33?", a: "Grieved and worried", wrong: ["Happy", "Bored", "Angry"], why: "He was grieved because of them, and felt straitened on their account." },
        { q: "What did the guests say, in 29:33?", a: "Have no fear", wrong: ["Run away", "Fight", "Hide"], why: "They said: Have no fear, and do not grieve!" },
        { tf: true, q: "Per Ibn Kathir, Lut did not yet know they were angels.", why: "At that point he did not know who they were." }
      ]
    },
    {
      slug: "for-their-rebellion",
      title: "For their rebellion",
      line: "The angels said the town would be punished for its rebellion.",
      facts: ["Sin has consequences", "Allah warns first"],
      quote: q29(34),
      source: ik(34, "The angels told Lut a great punishment from the sky would come on the town because they had been rebellious, as told in Surah Hud.", "because they have been rebellious"),
      difficulty: 4,
      questions: [
        { q: "From where was the punishment, in 29:34?", a: "From the sky", wrong: ["From the sea", "From a king", "From a fire"], why: "A great torment from the sky." },
        { q: "Why was it sent, in 29:34?", a: "They were rebellious", wrong: ["They were poor", "They were few", "They were far"], why: "Because they have been rebellious." },
        { tf: true, q: "Ibn Kathir refers to 11:82-83 for details.", why: "Stones of Sijjil, in a well-arranged manner one after another. (11:82-83)" }
      ]
    },
    {
      slug: "a-clear-sign-left",
      title: "A clear sign left",
      line: "Allah left a clear sign of that town for people who understand.",
      facts: ["Learn from ruins", "Reflect when you pass"],
      quote: q29(35),
      source: ik(35, "Allah left the place as a lesson until the Day of Resurrection: a clear sign for those who understand.", "which will remain as a lesson to mankind until the Day of Resurrection"),
      difficulty: 3,
      questions: [
        { q: "For whom is the sign, in 29:35?", a: "People who understand", wrong: ["Only kings", "No one", "Only animals"], why: "And indeed We have left thereof an evident Ayah for a folk who understand." },
        { q: "How long does the lesson remain, per Ibn Kathir?", a: "Until the Day of Resurrection", wrong: ["One year", "Ten years", "A day"], why: "Which will remain as a lesson to mankind until the Day of Resurrection." },
        { q: "Which ayah does Ibn Kathir link to 29:35?", a: "37:137-138", wrong: ["1:1", "2:255", "112:1"], why: "Verily, you pass by them in the morning and at night; will you not then reflect? (37:137-138)" }
      ]
    },
    {
      slug: "shuayb-calls-madyan",
      title: "Shu'ayb calls Madyan",
      line: "Shu'ayb said: worship Allah, hope for the Last Day, do no harm.",
      facts: ["Be honest in trade", "Do no harm"],
      quote: q29(36),
      source: ik(36, "Shu'ayb told Madyan to worship Allah alone and fear the Last Day. They cheated in weights and robbed travelers.", "They used to cheat in weights and measures"),
      difficulty: 3,
      questions: [
        { q: "Who was sent to Madyan, in 29:36?", a: "Shu'ayb", wrong: ["Hud", "Salih", "Lut"], why: "And to Madyan, We sent their brother Shu'ayb." },
        { q: "What did Madyan do, per Ibn Kathir?", a: "Cheated in weights", wrong: ["Gave charity", "Built masjids", "Fed travelers"], why: "They used to cheat in weights and measures, and ambush people on the road." },
        { q: "What is mischief, per Ibn Kathir?", a: "Doing evil to people", wrong: ["Playing games", "Sleeping late", "Eating sweets"], why: "Spreading corruption, which means going around doing evil to people." }
      ]
    },
    {
      slug: "the-earthquake",
      title: "The earthquake",
      line: "Madyan denied Shu'ayb, and an earthquake seized them at home.",
      facts: ["Denial brings ruin", "Heed the warners"],
      quote: q29(37),
      source: ik(37, "Madyan denied Shu'ayb, so Allah destroyed them with a mighty earthquake. Qatadah said they lay dead in their homes.", "So Allah destroyed them with a mighty earthquake that convulsed their land"),
      difficulty: 3,
      questions: [
        { q: "What seized Madyan, in 29:37?", a: "An earthquake", wrong: ["A flood", "A wind", "A drought"], why: "So the earthquake seized them." },
        { q: "Where did they lie, in 29:37?", a: "In their dwellings", wrong: ["At sea", "In the desert", "In a cave"], why: "And they lay, prostrate in their dwellings." },
        { tf: true, q: "Ibn Kathir says their story is also in Al-A'raf and Hud.", why: "We have already examined their story in detail in Surat Al-A'raf, Surat Hud and Surat Ash-Shu'ara'." }
      ]
    },
    {
      slug: "ad-and-thamud",
      title: "'Ad and Thamud",
      line: "The ruins of 'Ad and Thamud remain; Shaytan had fooled them.",
      facts: ["Cleverness is not guidance", "Ruins teach"],
      quote: q29(38),
      source: ik(38, "'Ad lived in the sand hills near Hadramawt in Yemen and Thamud lived in Al-Hijr. The Arabs knew their ruins well and often passed by them.", "The Arabs used to know their dwelling place very well"),
      difficulty: 3,
      questions: [
        { q: "Who made their deeds look good, in 29:38?", a: "Shaytan", wrong: ["Their Prophets", "The angels", "Their children"], why: "Shaytan made their deeds fair seeming to them." },
        { q: "Were they intelligent, in 29:38?", a: "Yes", wrong: ["No", "Not at all", "Only some"], why: "And turned them away from the path, though they were intelligent." },
        { q: "Where did 'Ad live, per Ibn Kathir?", a: "Near Hadramawt in Yemen", wrong: ["In Egypt", "In Syria", "In Iraq"], why: "Ad used to live in the Ahqaf, near Hadramawt, in the Yemen." }
      ]
    },
    {
      slug: "qarun-firawn-haman",
      title: "Qarun, Fir'awn and Haman",
      line: "Qarun, Fir'awn and Haman were too proud for clear signs.",
      facts: ["Pride blocks truth", "None outruns Allah"],
      quote: q29(39),
      source: ik(39, "Qarun owned immense treasures. Fir'awn was king of Egypt and Haman his minister. They rejected Musa's clear signs out of arrogance.", "Qarun was the owner of great wealth and had the keys to immense treasures"),
      difficulty: 3,
      questions: [
        { q: "Who came to them with clear signs, in 29:39?", a: "Musa", wrong: ["Isa", "Ibrahim", "Nuh"], why: "And indeed Musa came to them with clear Ayat." },
        { q: "Who was Haman, per Ibn Kathir?", a: "Fir'awn's minister", wrong: ["A Prophet", "A farmer", "Musa's brother"], why: "Fir'awn, the king of Egypt at the time of Musa, and his minister Haman." },
        { q: "What was Qarun known for, per Ibn Kathir?", a: "Great wealth", wrong: ["Great kindness", "Great poetry", "Great prayer"], why: "Qarun was the owner of great wealth and had the keys to immense treasures." }
      ]
    },
    {
      slug: "each-for-his-sins",
      title: "Each for his sins",
      line: "Each nation was punished for its own sins; Allah wronged none.",
      facts: ["Punishment fits the crime", "We wrong ourselves"],
      quote: q29(40),
      source: ik(40, "Each was punished in a way that fit their crime: wind, a mighty shout, the earth swallowing, or drowning. Allah did not wrong them; they wronged themselves.", "their punishments fit their crimes"),
      difficulty: 4,
      questions: [
        { q: "Who wronged them, in 29:40?", a: "They wronged themselves", wrong: ["Allah", "Their Prophets", "The angels"], why: "It was not Allah Who wronged them, but they wronged themselves." },
        { q: "Whom did the earth swallow, per Ibn Kathir?", a: "Qarun", wrong: ["Haman", "Fir'awn", "Thamud"], why: "This refers to Qarun... so Allah caused the earth to swallow him and his house." },
        { q: "Who were drowned, per Ibn Kathir?", a: "Fir'awn, Haman and their troops", wrong: ["'Ad", "Madyan", "Qarun"], why: "This refers to Fir'awn, his minister Haman and their troops, all of whom were drowned." }
      ]
    },
    {
      slug: "the-spiders-house",
      title: "The spider's house",
      line: "Relying on others than Allah is like a spider's flimsy house.",
      facts: ["Hold the firm handhold", "False gods are weak"],
      quote: q29(41),
      source: ik(41, "Those who rely on gods besides Allah are like someone holding a spider's web: no benefit. The believer holds the firmest handhold that never breaks.", "which is so weak and frail"),
      difficulty: 3,
      questions: [
        { q: "What is the weakest house, in 29:41?", a: "The spider's house", wrong: ["A tent", "A nest", "A cave"], why: "Indeed, the weakest of houses is the spider's house." },
        { q: "Whom are idol worshippers like, per Ibn Kathir?", a: "One holding a spider's web", wrong: ["One holding a rope", "One holding a rock", "One holding a tree"], why: "Like a person who holds on to a spider's web, who does not gain any benefit." },
        { q: "What does the believer hold, per Ibn Kathir?", a: "The most trustworthy handhold", wrong: ["A spider's web", "A loose thread", "Nothing"], why: "He has grasped the most trustworthy handle that will never break." }
      ]
    },
    {
      slug: "allah-knows-what-they-call",
      title: "Allah knows what they call on",
      line: "Allah knows whatever they call upon besides Him.",
      facts: ["Allah sees all worship", "He is Mighty and Wise"],
      quote: q29(42),
      source: ik(42, "Allah warns those who worship others besides Him that He knows what they do and the rivals they set up with Him.", "He knows what they do and the rivals they associate with Him"),
      difficulty: 3,
      questions: [
        { q: "What does Allah know, in 29:42?", a: "What they invoke besides Him", wrong: ["Nothing", "Only the past", "Only the sky"], why: "Verily, Allah knows what things they invoke instead of Him." },
        { q: "Which Names end 29:42?", a: "All-Mighty, All-Wise", wrong: ["Most Kind, Most Near", "All-Hearing, All-Seeing", "Rich, Praised"], why: "He is the All-Mighty, the All-Wise." },
        { tf: true, q: "Ibn Kathir calls 29:42 a warning to idol worshippers.", why: "Then Allah warns those who worship others besides Him." }
      ]
    },
    {
      slug: "examples-for-the-knowing",
      title: "Examples for the knowing",
      line: "Allah gives examples, but only people of knowledge grasp them.",
      facts: ["Seek knowledge", "Reflect on parables"],
      quote: q29(43),
      source: ik(43, "Only those with deep knowledge understand and ponder Allah's parables. Amr bin Murrah was grieved by any parable he did not understand.", "no one understands them or ponders them except those who are possessed of deep knowledge"),
      difficulty: 3,
      questions: [
        { q: "Who understands the examples, in 29:43?", a: "Those with knowledge", wrong: ["Everyone", "No one", "Only kings"], why: "But none will understand them except those who have knowledge." },
        { q: "What grieved Amr bin Murrah, per Ibn Kathir?", a: "An ayah he did not understand", wrong: ["Losing money", "Bad weather", "A long trip"], why: "I never came across an Ayah of the Book of Allah that I did not know, but it grieved me." },
        { tf: true, q: "Per Ibn Kathir, understanding parables needs deep knowledge.", why: "Except those who are possessed of deep knowledge." }
      ]
    },
    {
      slug: "created-with-truth",
      title: "Created with truth",
      line: "Allah created the heavens and earth with truth, not for play.",
      facts: ["Life has a purpose", "Signs for believers"],
      quote: q29(44),
      source: ik(44, "Allah created the heavens and the earth with truth, for a higher purpose than play, so that every soul is rewarded for its deeds.", "there is clear evidence that Allah is alone in creating"),
      difficulty: 3,
      questions: [
        { q: "How did Allah create the heavens and earth, in 29:44?", a: "With truth", wrong: ["For play", "By chance", "In vain"], why: "Allah created the heavens and the earth with truth." },
        { q: "For whom is the sign, in 29:44?", a: "Those who believe", wrong: ["Only scientists", "No one", "Only kings"], why: "Verily, therein is surely a sign for those who believe." },
        { q: "What does creation prove, per Ibn Kathir?", a: "Allah alone creates", wrong: ["Many gods", "Nothing", "Chance"], why: "There is clear evidence that Allah is alone in creating, controlling, and in His divinity." }
      ]
    },
    {
      slug: "prayer-stops-evil",
      title: "Prayer stops evil",
      line: "Recite the Book and pray; prayer stops evil, dhikr is greater.",
      facts: ["Pray with sincerity", "Remembering Allah is greatest"],
      quote: q29(45),
      source: ik(45, "Regular prayer helps a person give up immoral and evil deeds, and remembering Allah, its higher goal, is greater still.", "praying regularly enables a person to give up these things"),
      difficulty: 3,
      questions: [
        { q: "What does Salah prevent, in 29:45?", a: "Immoral and evil deeds", wrong: ["Hunger", "Sleep", "Rain"], why: "Verily, the Salah prevents from Al-Fahsha' and Al-Munkar." },
        { q: "What is greater, in 29:45?", a: "Remembering Allah", wrong: ["Wealth", "Fame", "Strength"], why: "And the remembering of Allah is greater indeed." },
        { q: "What three things make true prayer, per Abu Al-Aliyah?", a: "Sincerity, fear and remembrance", wrong: ["Speed, noise and length", "Wealth, fame and power", "Food, drink and sleep"], why: "Being done purely and sincerely for Allah alone, fear of Allah, and remembrance of Allah." }
      ]
    },
    {
      slug: "argue-in-the-best-way",
      title: "Argue in the best way",
      line: "Discuss kindly with the People of the Book; our God is One.",
      facts: ["Speak kindly", "Wisdom wins hearts"],
      quote: q29(46),
      source: ik(46, "Debate with the People of the Book in the best manner, as it is more effective. Allah told Musa and Harun to speak mildly even to Fir'awn.", "argue with them in a manner that is better, as this will be more effective"),
      difficulty: 4,
      questions: [
        { q: "How should we argue, in 29:46?", a: "With what is better", wrong: ["With shouting", "With insults", "Never at all"], why: "And argue not with the People of the Scripture, except with that which is better." },
        { q: "Why argue in the best way, per Ibn Kathir?", a: "It is more effective", wrong: ["It is faster", "It is louder", "It is cheaper"], why: "Argue with them in a manner that is better, as this will be more effective." },
        { q: "Which ayah does Ibn Kathir link about speaking mildly?", a: "20:44", wrong: ["1:1", "2:255", "112:1"], why: "And speak to him mildly, perhaps he may accept admonition or fear. (20:44)" }
      ]
    },
    {
      slug: "neither-believe-nor-deny",
      title: "Neither believe nor deny",
      line: "The Prophet ﷺ said: neither believe nor deny their reports.",
      facts: ["Be careful with old reports", "The Quran is preserved"],
      quote: q29(46),
      source: hadith("bukhari", "4485", "Abu Hurairah", "Sahih", "The People of the Book read the Torah in Hebrew and explained it in Arabic. The Prophet ﷺ said: do not believe them or deny them, but say we believe in Allah and what was revealed.", "Do not believe the people of the Scripture or disbelieve them"),
      difficulty: 4,
      questions: [
        { q: "In what language did they read the Torah, in the hadith?", a: "Hebrew", wrong: ["Greek", "Latin", "Persian"], why: "The people of the Scripture used to recite the Torah in Hebrew." },
        { q: "What should we say, in the hadith?", a: "We believe in Allah and His revelation", wrong: ["You are lying", "You are right", "Nothing"], why: "But say: We believe in Allah and what is revealed to us." },
        { tf: false, q: "In the hadith we must deny all their reports.", why: "Do not believe the people of the Scripture or disbelieve them." }
      ]
    }
  ]
};

/** Ayahs 47 to 69: the preserved Book, the unlettered Prophet ﷺ, migration, trust in Allah's provision, and guidance for those who strive. */
const ANKABUT_FOUR: DeepUnit = {
  key: "ankabut4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-29",
  name: "Al-'Ankabut, ayahs 47 to 69",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-'Ankabut",
  lessons: [
    {
      slug: "people-of-knowledge-believe",
      title: "People of knowledge believe",
      line: "Learned people of earlier Scripture believed in the Quran too.",
      facts: ["Truth is recognized", "Only deniers reject"],
      quote: q29(47),
      source: ik(47, "Allah sent this Book as He sent Books before. Learned rabbis and scholars, like Abdullah bin Salam and Salman Al-Farisi, believed in it.", "those knowledgable rabbis and scholars among them who learned it and recited it properly"),
      difficulty: 3,
      questions: [
        { q: "Who reject the Ayat, in 29:47?", a: "Only the disbelievers", wrong: ["The scholars", "The believers", "The angels"], why: "And none but the disbelievers reject Our Ayat." },
        { q: "Which Companion is named as a former scholar, per Ibn Kathir?", a: "Abdullah bin Salam", wrong: ["Abu Jahl", "Abu Lahab", "Fir'awn"], why: "Those knowledgable rabbis and scholars among them who learned it and recited it properly." },
        { tf: true, q: "Some of the Quraysh also believed, per Ibn Kathir.", why: "As also believe therein some of these, meaning, the Quraysh Arabs and others." }
      ]
    },
    {
      slug: "the-unlettered-prophet",
      title: "The unlettered Prophet ﷺ",
      line: "The Prophet ﷺ never read or wrote a book before the Quran.",
      facts: ["He could not read or write", "So no one could say he copied"],
      quote: q29(48),
      source: ik(48, "The Prophet ﷺ lived among his people for years without reading or writing. Had he been literate, some would have claimed he copied old books.", "you are an unlettered man who does not read or write"),
      difficulty: 3,
      questions: [
        { q: "What did he not do before the Quran, in 29:48?", a: "Read or write a book", wrong: ["Travel", "Trade", "Speak"], why: "Neither did you read any book before it nor did you write any book with your right hand." },
        { q: "Who might have doubted otherwise, in 29:48?", a: "The followers of falsehood", wrong: ["The angels", "The believers", "His family"], why: "In that case, indeed, the followers of falsehood might have doubted." },
        { q: "What would doubters have claimed, per Ibn Kathir?", a: "He learned it from older Books", wrong: ["He was a king", "He was a poet only", "He was rich"], why: "They would have said that you learned this from Books inherited from the Prophets which came before." }
      ]
    },
    {
      slug: "scribes-of-revelation",
      title: "Scribes of revelation",
      line: "Companions wrote down the revelation for the Prophet ﷺ.",
      facts: ["He had scribes", "Earlier Books described him"],
      quote: q29(48),
      source: ik(48, "The earlier Scriptures described the unlettered Prophet ﷺ. He had scribes who wrote down the revelation and his letters to other lands.", "He used to have scribes who would write down the revelation for him"),
      difficulty: 4,
      questions: [
        { q: "Who wrote the revelation down, per Ibn Kathir?", a: "His scribes", wrong: ["He alone", "No one", "Traders"], why: "He used to have scribes who would write down the revelation for him." },
        { q: "Which ayah calls him the unlettered Prophet ﷺ in the Tawrah and Injil?", a: "7:157", wrong: ["1:1", "112:1", "2:1"], why: "The unlettered about whom they find written with them in the Tawrah and the Injil. (7:157)" },
        { tf: true, q: "His scribes also wrote letters to other places.", why: "Or would write letters from him to be sent to different places." }
      ]
    },
    {
      slug: "kept-in-the-hearts",
      title: "Kept in the hearts",
      line: "The Quran is clear Ayat, kept in the hearts of the learned.",
      facts: ["Memorize the Quran", "Allah made it easy"],
      quote: q29(49),
      source: ik(49, "The Quran is clear signs of truth, commands and stories. Allah makes it easy for scholars to memorize, recite and explain.", "It is memorized by the scholars for whom Allah makes it easy to memorize"),
      difficulty: 3,
      questions: [
        { q: "Where are the clear Ayat preserved, in 29:49?", a: "In the breasts of the learned", wrong: ["Only on stone", "In palaces", "Nowhere"], why: "Clear Ayat, (preserved) in the breasts of those who have been given knowledge." },
        { q: "Who deny the Ayat, in 29:49?", a: "The wrongdoers", wrong: ["The scholars", "The children", "The travelers"], why: "And none but the wrongdoers deny Our Ayat." },
        { q: "Which ayah says the Quran is easy to remember, per Ibn Kathir?", a: "54:17", wrong: ["2:2", "36:1", "103:1"], why: "And We have indeed made the Qur'an easy to understand and remember. (54:17)" }
      ]
    },
    {
      slug: "a-book-water-cannot-wash",
      title: "A Book water cannot wash",
      line: "Allah sent a Book water cannot wash away; we recite it always.",
      facts: ["The Quran lives in hearts", "Recite it awake and at rest"],
      quote: q29(49),
      source: hadith("muslim", "2865", "Iyad ibn Himar", "Sahih", "In a sermon the Prophet ﷺ said Allah sent him a Book that water cannot wash away, to be recited while awake or asleep.", "And I sent the Book to you which cannot be washed away by water"),
      difficulty: 4,
      questions: [
        { q: "What cannot wash the Book away, in the hadith?", a: "Water", wrong: ["Fire", "Wind", "Sand"], why: "And I sent the Book to you which cannot be washed away by water." },
        { q: "When may it be recited, in the hadith?", a: "Awake or asleep", wrong: ["Only at dawn", "Only in Ramadan", "Only in Makkah"], why: "So that you may recite it while in the state of wakefulness or sleep." },
        { q: "Why does water not matter, per Ibn Kathir?", a: "The Quran is kept in hearts", wrong: ["Paper is waterproof", "No one writes it", "It is carved in gold"], why: "This is because it is preserved in the hearts and is easy on the tongue." }
      ]
    },
    {
      slug: "signs-are-with-allah",
      title: "Signs are with Allah",
      line: "They demanded miracles; signs are with Allah, he only warns.",
      facts: ["Allah decides the signs", "The Messenger ﷺ conveys"],
      quote: q29(50),
      source: ik(50, "The idolators stubbornly demanded signs. The matter rests with Allah, and the Prophet ﷺ was sent only to convey a clear warning.", "I have been sent to you only as a warner to bring a clear warning"),
      difficulty: 3,
      questions: [
        { q: "With whom are the signs, in 29:50?", a: "Only with Allah", wrong: ["With the Prophet ﷺ", "With the people", "With the kings"], why: "The signs are only with Allah." },
        { q: "What is the Prophet ﷺ, in 29:50?", a: "A plain warner", wrong: ["A king", "A magician", "A poet"], why: "And I am only a plain warner." },
        { q: "Which Prophet had the she-camel sign, per Ibn Kathir?", a: "Salih", wrong: ["Nuh", "Yunus", "Lut"], why: "Just as Salih was given the sign of the she-camel." }
      ]
    },
    {
      slug: "the-book-is-enough",
      title: "The Book is enough",
      line: "Is the Quran not sign enough? It holds mercy and a reminder.",
      facts: ["The Quran is the great sign", "Mercy for believers"],
      quote: q29(51),
      source: ik(51, "The Quran is enough as a sign. It tells of the past and the future, though the Prophet ﷺ could not read or write.", "this great Book which tells them about what happened before their time"),
      difficulty: 4,
      questions: [
        { q: "What is in the Book, in 29:51?", a: "Mercy and a reminder", wrong: ["Only laws", "Only stories", "Nothing new"], why: "Verily, herein is mercy and a reminder for a people who believe." },
        { q: "What could the most eloquent not do, per Ibn Kathir?", a: "Produce one Surah like it", wrong: ["Read it", "Hear it", "Write poems"], why: "The most eloquent of men could not match it or produce ten Surahs, or even one Surah like it." },
        { tf: true, q: "The Quran tells of the past and the future, per Ibn Kathir.", why: "Tells them about what happened before their time, what will happen after they are gone." }
      ]
    },
    {
      slug: "the-greatest-miracle",
      title: "The greatest miracle",
      line: "The Prophet ﷺ said his great miracle is the revelation.",
      facts: ["Every Prophet had signs", "Ours is the Quran"],
      quote: q29(51),
      source: hadith("bukhari", "4981", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said every Prophet was given miracles that made people believe, but what he was given is revelation from Allah, so he hoped to have the most followers.", "what I have been given, is Divine Inspiration which Allah has revealed to me"),
      difficulty: 4,
      questions: [
        { q: "What was the Prophet ﷺ given, in the hadith?", a: "Divine revelation", wrong: ["A staff", "A she-camel", "A ship"], why: "What I have been given, is Divine Inspiration which Allah has revealed to me." },
        { q: "What did he hope for, in the hadith?", a: "The most followers", wrong: ["Great wealth", "A palace", "A long life"], why: "So I hope that my followers will outnumber the followers of the other Prophets." },
        { tf: false, q: "Earlier Prophets were given no miracles, in the hadith.", why: "Every Prophet was given miracles because of which people believed." }
      ]
    },
    {
      slug: "allah-is-enough-witness",
      title: "Allah is enough as witness",
      line: "Allah is enough as a witness; nothing is hidden from Him.",
      facts: ["Allah knows the truth", "Falsehood ends in loss"],
      quote: q29(52),
      source: ik(52, "Allah knows the denials and knows the Prophet ﷺ speaks truth. He supported him with clear proof, and nothing is hidden from Him.", "nothing is hidden from Him at all"),
      difficulty: 4,
      questions: [
        { q: "Who is sufficient as witness, in 29:52?", a: "Allah", wrong: ["The crowd", "The kings", "The poets"], why: "Sufficient is Allah for a witness between me and you." },
        { q: "Who are the losers, in 29:52?", a: "Those who believe in falsehood", wrong: ["The patient", "The poor", "The travelers"], why: "And those who believe in falsehood, and disbelieve in Allah, it is they who are the losers." },
        { q: "What is hidden from Allah, per Ibn Kathir?", a: "Nothing at all", wrong: ["The sea floor", "Secrets", "The future"], why: "He knows what is in the heavens and the earth, means, nothing is hidden from Him at all." }
      ]
    },
    {
      slug: "a-term-appointed",
      title: "A term appointed",
      line: "They mocked by asking for punishment; Allah set a fixed time.",
      facts: ["Allah gives time to repent", "Do not mock warnings"],
      quote: q29(53),
      source: ik(53, "The deniers mockingly asked for punishment to come quickly. Allah has set its time, and delays it until the Day of Resurrection.", "Allah has decreed that the punishment should be delayed until the Day of Resurrection"),
      difficulty: 3,
      questions: [
        { q: "What held the punishment back, in 29:53?", a: "A term appointed", wrong: ["Their strength", "Their wealth", "Their idols"], why: "And had it not been for a term appointed, the torment would certainly have come to them." },
        { q: "How will it come, in 29:53?", a: "Suddenly", wrong: ["With a warning letter", "Slowly", "Never"], why: "And surely, it will come upon them suddenly while they perceive not." },
        { q: "Which ayah shows the same demand, per Ibn Kathir?", a: "8:32", wrong: ["1:5", "2:286", "112:4"], why: "And when they said: O Allah! If this is indeed the truth from You... (8:32)" }
      ]
    },
    {
      slug: "do-not-hasten-it",
      title: "Do not hasten it",
      line: "They asked to hasten it, yet it will surely come to deniers.",
      facts: ["Allah's promise is true", "Turn back to Allah now"],
      quote: q29(54),
      source: ik(54, "They kept asking for the punishment to come quickly, but it will certainly reach the deniers. A wise person repents while there is time.", "they ask you to hasten on the punishment, but it will undoubtedly befall them"),
      difficulty: 3,
      questions: [
        { q: "What did they ask to hasten, in 29:54?", a: "The torment", wrong: ["The rain", "The harvest", "The trade"], why: "They ask you to hasten on the torment." },
        { q: "Will the punishment come, per Ibn Kathir?", a: "Yes, undoubtedly", wrong: ["Never", "Only maybe", "Only in dreams"], why: "They ask you to hasten on the punishment, but it will undoubtedly befall them." },
        { tf: true, q: "Hell will encompass the disbelievers, in 29:54.", why: "And verily, Hell, of a surety, will encompass the disbelievers." }
      ]
    },
    {
      slug: "taste-what-you-did",
      title: "Taste what you did",
      line: "That Day the deniers will hear: taste what you used to do.",
      facts: ["Deeds return to their doers", "Allah is just"],
      quote: q29(55),
      source: ik(55, "On that Day the deniers will be told to taste the result of their deeds. Ibn Kathir calls the words a threat and a rebuke.", "This is a threat and a rebuke"),
      difficulty: 4,
      questions: [
        { q: "What will be said to them, in 29:55?", a: "Taste what you used to do", wrong: ["Welcome home", "Go in peace", "Rest now"], why: "And it will be said: Taste what you used to do." },
        { q: "What are those words, per Ibn Kathir?", a: "A threat and a rebuke", wrong: ["A greeting", "A gift", "A question"], why: "This is a threat and a rebuke." },
        { tf: false, q: "In 29:55 the deniers are rewarded for their deeds.", why: "And it will be said: Taste what you used to do." }
      ]
    },
    {
      slug: "spacious-is-my-earth",
      title: "Spacious is My earth",
      line: "Allah's earth is wide; worship Him wherever you are free.",
      facts: ["Hold on to your faith", "Allah opens a way"],
      quote: q29(56),
      source: ik(56, "Believers who could not practice Islam in Makkah migrated to Ethiopia, where they could worship freely, and later to Al-Madinah.", "they left and migrated to Ethiopia, where they were able to practice their religion"),
      difficulty: 3,
      questions: [
        { q: "What does Allah say about His earth, in 29:56?", a: "It is spacious", wrong: ["It is small", "It is closed", "It is cursed"], why: "Certainly, spacious is My earth. Therefore worship Me." },
        { q: "Where did the first believers migrate, per Ibn Kathir?", a: "Ethiopia", wrong: ["Persia", "Rome", "Yemen"], why: "They left and migrated to Ethiopia, where they were able to practice their religion." },
        { q: "What was Yathrib later known as, per Ibn Kathir?", a: "Al-Madinah", wrong: ["Makkah", "Ta'if", "Jerusalem"], why: "Migrated to Al-Madinah, formerly known as Yathrib." }
      ]
    },
    {
      slug: "the-kind-king",
      title: "The kind king",
      line: "The Negus of Ethiopia sheltered the Muslims and honored them.",
      facts: ["Kindness to the oppressed", "Be grateful to helpers"],
      quote: q29(56),
      source: ik(56, "Ashamah, the Negus, gave the Muslim migrants refuge in Ethiopia, helped them and honored them, so they could worship in peace.", "gave them refuge, helped them, supported them, and honored them in his land"),
      difficulty: 4,
      questions: [
        { q: "What was the Negus, per Ibn Kathir?", a: "The king of Ethiopia", wrong: ["A trader", "A poet", "A soldier"], why: "Where Ashamah, the Negus or king, may Allah have mercy on him, gave them refuge." },
        { q: "How did he treat the Muslims, per Ibn Kathir?", a: "He gave refuge and honor", wrong: ["He sent them away", "He ignored them", "He taxed them"], why: "Gave them refuge, helped them, supported them, and honored them in his land." },
        { tf: true, q: "The Muslims found Ethiopia a good place for guests.", why: "The Muslims found Ethiopia the best place for guest." }
      ]
    },
    {
      slug: "every-soul-tastes-death",
      title: "Every soul tastes death",
      line: "Everyone shall taste death, then return to Allah.",
      facts: ["Death comes to all", "Obey Allah wherever you are"],
      quote: q29(57),
      source: ik(57, "Death will reach everyone wherever they are, so obey Allah and be where He commands. Then all return to Him.", "Death is inevitable and there is no escape from it"),
      difficulty: 3,
      questions: [
        { q: "Who shall taste death, in 29:57?", a: "Everyone", wrong: ["Only the old", "Only the sick", "Only the wicked"], why: "Everyone shall taste death." },
        { q: "To whom do we return, in 29:57?", a: "To Allah", wrong: ["To dust only", "To our tribe", "To nothing"], why: "Then unto Us you shall be returned." },
        { q: "What advice does Ibn Kathir give?", a: "Always obey Allah", wrong: ["Fear travel", "Never move", "Hoard wealth"], why: "Wherever you are, death with catch up with you, so always obey Allah." }
      ]
    },
    {
      slug: "lofty-dwellings",
      title: "Lofty dwellings",
      line: "Believers who do good get high homes in Paradise, with rivers.",
      facts: ["Good deeds build homes", "Paradise lasts forever"],
      quote: q29(58),
      source: ik(58, "Allah gives believers who do good lofty homes in Paradise with rivers beneath. They stay forever and never wish to leave.", "they will remain there forever, never wanting to leave"),
      difficulty: 3,
      questions: [
        { q: "What flows beneath the dwellings, in 29:58?", a: "Rivers", wrong: ["Sand", "Smoke", "Ice"], why: "Lofty dwellings in Paradise, beneath which rivers flow." },
        { q: "How long do they stay, per Ibn Kathir?", a: "Forever", wrong: ["A year", "A lifetime", "A day"], why: "They will remain there forever, never wanting to leave." },
        { q: "Which four kinds of rivers does Ibn Kathir list?", a: "Water, wine, honey and milk", wrong: ["Gold, silver, pearl and jade", "Oil, tea, salt and juice", "Snow, ice, hail and rain"], why: "Various kinds of rivers flow, water, wine, honey and milk." }
      ]
    },
    {
      slug: "chambers-of-light",
      title: "Chambers you can see through",
      line: "Paradise has clear chambers for those who speak well and pray.",
      facts: ["Speak well and feed others", "Pray at night"],
      quote: q29(58),
      source: hadith("tirmidhi", "1984", "Ali", "Hasan", "The Prophet ﷺ said Paradise has chambers seen through from inside and out, for those who speak well, feed others, fast and pray at night.", "Indeed in Paradise there are chambers"),
      difficulty: 4,
      questions: [
        { q: "What is special about the chambers, in the hadith?", a: "You can see through them", wrong: ["They are dark", "They are tiny", "They move"], why: "Whose outside can be seen from their inside, and their inside can be seen from their outside." },
        { q: "Which deed earns them, in the hadith?", a: "Feeding others", wrong: ["Winning races", "Collecting gold", "Building towers"], why: "For those who speak well, feed others, fast regularly, and perform salat during the night." },
        { q: "When is the prayer in the hadith?", a: "At night while people sleep", wrong: ["Only at noon", "Only on Eid", "Only at sunset"], why: "Perform salat during the night while the people sleep." }
      ]
    },
    {
      slug: "patience-and-trust",
      title: "Patience and trust",
      line: "The rewarded are patient and put their trust in their Lord.",
      facts: ["Patience in faith", "Trust Allah in all things"],
      quote: q29(59),
      source: ik(59, "They stay patient in their religion, even leaving home for Allah, and trust their Lord in every matter, worldly and spiritual.", "in all their affairs, spiritual and worldly alike"),
      difficulty: 3,
      questions: [
        { q: "What two traits fill 29:59?", a: "Patience and trust", wrong: ["Wealth and fame", "Speed and strength", "Anger and pride"], why: "Those who are patient, and put their trust in their Lord." },
        { q: "In which affairs do they trust Allah, per Ibn Kathir?", a: "All, worldly and spiritual", wrong: ["Only prayer", "Only trade", "Only travel"], why: "In all their affairs, spiritual and worldly alike." },
        { tf: true, q: "Ibn Kathir says the patient migrated for Allah's sake.", why: "Who migrated for the sake of Allah." }
      ]
    },
    {
      slug: "allah-provides-for-all",
      title: "Allah provides for all",
      line: "Many creatures carry no food; Allah provides for them and you.",
      facts: ["Provision is from Allah", "He feeds even the ants"],
      quote: q29(60),
      source: ik(60, "Many creatures cannot store food for tomorrow, yet Allah provides for each, even ants in the earth, birds in the air and fish in the sea.", "even the ants in the depths of the earth, the birds in the air and the fish in the sea"),
      difficulty: 3,
      questions: [
        { q: "Who provides for the creatures, in 29:60?", a: "Allah", wrong: ["Their herd", "No one", "Hunters"], why: "Allah provides for it and for you." },
        { q: "What can many creatures not do, per Ibn Kathir?", a: "Save food for tomorrow", wrong: ["Move", "Breathe", "Sleep"], why: "It does not have the ability to gather its provision and save it for tomorrow." },
        { q: "What happened to the Muhajirin's provision, per Ibn Kathir?", a: "It became greater", wrong: ["It ran out", "It stayed the same", "It was stolen"], why: "When the Muhajirin migrated, their provision was greater and better than before." }
      ]
    },
    {
      slug: "like-the-birds",
      title: "Trust like the birds",
      line: "Trust Allah truly, and He provides as He provides the birds.",
      facts: ["Work and trust together", "Birds go out each morning"],
      quote: q29(60),
      source: hadith("tirmidhi", "2344", "Umar ibn al-Khattab", "Sahih", "The Prophet ﷺ said if we truly relied on Allah, He would provide for us as He does the birds, who leave hungry in the morning and return full.", "He would provide for you just as a bird is provided for"),
      difficulty: 4,
      questions: [
        { q: "How do the birds leave in the morning, in the hadith?", a: "Empty", wrong: ["Full", "Asleep", "Carrying food"], why: "It goes out in the morning empty, and returns full." },
        { q: "How do they come back, in the hadith?", a: "Full", wrong: ["Empty", "Lost", "Hurt"], why: "It goes out in the morning empty, and returns full." },
        { tf: true, q: "The birds still go out to seek food, in the hadith.", why: "It goes out in the morning empty, and returns full." }
      ]
    },
    {
      slug: "they-admit-the-creator",
      title: "They admit the Creator",
      line: "Asked who made the heavens, sun and moon, they say: Allah.",
      facts: ["Creator alone deserves worship", "Do not turn away"],
      quote: q29(61),
      source: ik(61, "Even the idolators admitted Allah alone created the heavens, earth, sun and moon. So He alone deserves worship and trust.", "He was the sole creator of the heavens and earth"),
      difficulty: 3,
      questions: [
        { q: "What did they answer, in 29:61?", a: "Allah", wrong: ["Their idols", "Nature", "No one"], why: "They will surely reply: Allah." },
        { q: "What did Allah subject, in 29:61?", a: "The sun and the moon", wrong: ["The idols", "The kings", "The ships"], why: "And subjected the sun and the moon." },
        { q: "What did they still do wrongly, per Ibn Kathir?", a: "Worship others too", wrong: ["Deny the sun", "Leave Makkah", "Stop trading"], why: "The idolators who worshipped others besides Him recognized that He was the sole creator." }
      ]
    },
    {
      slug: "allah-measures-provision",
      title: "Allah measures provision",
      line: "Allah gives more or less provision to whom He wills.",
      facts: ["Rich and poor are tested", "Allah knows what suits each"],
      quote: q29(62),
      source: ik(62, "Allah made people's provision different, some rich and some poor. He knows best what is suitable for each person.", "He knew best what was suitable for each of them"),
      difficulty: 4,
      questions: [
        { q: "Who expands and limits provision, in 29:62?", a: "Allah", wrong: ["Luck", "The market", "The stars"], why: "Allah expands the provision for whom He wills of His servants, and straitens it." },
        { q: "What does Allah know, per Ibn Kathir?", a: "What suits each person", wrong: ["Only the rich", "Only the poor", "Nothing of it"], why: "He knew best what was suitable for each of them." },
        { tf: true, q: "Allah is the All-Knower of everything, in 29:62.", why: "Verily, Allah is the All-Knower of everything." }
      ]
    },
    {
      slug: "rain-and-praise",
      title: "Rain and praise",
      line: "Allah sends rain and revives dead land; all praise is His.",
      facts: ["Thank Allah for rain", "Worship the One who gives"],
      quote: q29(63),
      source: ik(63, "If Allah alone creates and controls everything, why worship anyone else? Dominion is His alone, so worship is for Him alone.", "then why worship anyone else"),
      difficulty: 4,
      questions: [
        { q: "What does the rain revive, in 29:63?", a: "The dead earth", wrong: ["The idols", "The stones", "The sea"], why: "And gives life therewith to the earth after its death." },
        { q: "What are we told to say, in 29:63?", a: "All praise is for Allah", wrong: ["Thank the clouds", "Nothing", "Praise the idols"], why: "Say: All the praises and thanks be to Allah!" },
        { q: "What does Ibn Kathir ask about worship?", a: "Why worship anyone else?", wrong: ["Why pray at all?", "Why give charity?", "Why fast?"], why: "If this is how it is, then why worship anyone else?" }
      ]
    },
    {
      slug: "the-real-life",
      title: "The real life",
      line: "This world is play; the Hereafter is the true, lasting life.",
      facts: ["This world passes", "Prefer what lasts"],
      quote: q29(64),
      source: ik(64, "This world is small and passing. The Hereafter is the true life that never ends, and the wise prefer what lasts.", "the true everlasting life that will never end"),
      difficulty: 3,
      questions: [
        { q: "What is worldly life called, in 29:64?", a: "Amusement and play", wrong: ["The true life", "A forever home", "A palace"], why: "And this life of the world is only an amusement and a play!" },
        { q: "What is the Hereafter, per Ibn Kathir?", a: "Life that never ends", wrong: ["A short trip", "A dream", "A game"], why: "The true everlasting life that will never end." },
        { q: "What would they do if they knew, per Ibn Kathir?", a: "Prefer what lasts", wrong: ["Play more", "Sleep more", "Travel more"], why: "They would prefer that which will last over that which will pass away." }
      ]
    },
    {
      slug: "sincere-at-sea",
      title: "Sincere at sea",
      line: "At sea they call on Allah alone, then forget Him on land.",
      facts: ["Call on Allah in ease too", "He alone saves"],
      quote: q29(65),
      source: ik(65, "In hardship at sea the idolators called on Allah alone. Then why not call on Him alone all the time?", "at times of calamity, the idolators call upon Him alone"),
      difficulty: 3,
      questions: [
        { q: "How do they pray on the ship, in 29:65?", a: "With pure faith in Allah", wrong: ["To their idols", "Not at all", "To the sea"], why: "They invoke Allah, making their faith pure for Him only." },
        { q: "What do they do back on land, in 29:65?", a: "Share worship with others", wrong: ["Thank Allah only", "Give charity", "Fast"], why: "But when He brings them safely to land, behold, they give a share of their worship to others." },
        { q: "When do they call on Allah alone, per Ibn Kathir?", a: "At times of calamity", wrong: ["At feasts", "At markets", "Never"], why: "At times of calamity, the idolators call upon Him alone." }
      ]
    },
    {
      slug: "ikrimah-at-sea",
      title: "Ikrimah at sea",
      line: "A storm at sea led Ikrimah to Allah, and he became Muslim.",
      facts: ["Only Allah saves", "The Prophet ﷺ was merciful"],
      quote: q29(65),
      source: ik(65, "Ikrimah bin Abi Jahl fled by sea. In a storm the crew called on Allah alone. He realized Allah alone saves on land too, vowed to return, and did.", "I will go and put my hand in the hand of Muhammad"),
      difficulty: 4,
      questions: [
        { q: "Where was Ikrimah heading, per Ibn Kathir?", a: "Ethiopia", wrong: ["Persia", "Syria", "Yemen"], why: "When he was on the sea, headed for Ethiopia, the ship started to rock." },
        { q: "What did Ikrimah realize at sea?", a: "Allah alone saves on land too", wrong: ["The sea is safe", "Idols help", "Ships are strong"], why: "If there is none who can save us on the sea except Him, then there is none who can save us on land except Him either." },
        { tf: true, q: "Ikrimah kept his vow, per Ibn Kathir.", why: "And this is what indeed did happen." }
      ]
    },
    {
      slug: "ungrateful-for-gifts",
      title: "Ungrateful for gifts",
      line: "Saved, they turn ungrateful and enjoy a while; they will know.",
      facts: ["Thank Allah after relief", "Remember Him always"],
      quote: q29(66),
      source: ik(66, "If they call on Allah alone in hardship, why not always? Turning away after rescue is ingratitude for His gifts.", "so why do they not do that all the time"),
      difficulty: 4,
      questions: [
        { q: "What do they become, in 29:66?", a: "Ungrateful", wrong: ["Thankful", "Humble", "Generous"], why: "So that they become ingrate for that which We have given them." },
        { q: "What will happen in the end, in 29:66?", a: "They will come to know", wrong: ["They forget", "Nothing", "They win"], why: "And that they take their enjoyment, but they will come to know." },
        { q: "What should they do all the time, per Ibn Kathir?", a: "Call on Allah alone", wrong: ["Sail more", "Rest", "Hide"], why: "The idolators call upon Him alone, with no partner, so why do they not do that all the time?" }
      ]
    },
    {
      slug: "the-safe-sanctuary",
      title: "The safe sanctuary",
      line: "Allah made the Haram safe while people around were in danger.",
      facts: ["Makkah is a place of safety", "Thank Allah for security"],
      quote: q29(67),
      source: ik(67, "Allah blessed Quraysh with His safe sanctuary. Whoever enters it is safe, while desert raids happened all around.", "whoever enters it is safe, because he is in a place of great security"),
      difficulty: 3,
      questions: [
        { q: "What did Allah make, in 29:67?", a: "A secure sanctuary", wrong: ["A great army", "A tall tower", "A market"], why: "Have they not seen that We have made a secure sanctuary." },
        { q: "Who is safe in the Haram, per Ibn Kathir?", a: "Whoever enters it", wrong: ["Only kings", "Only merchants", "No one"], why: "Whoever enters it is safe, because he is in a place of great security." },
        { q: "Which surah does Ibn Kathir link about Quraysh's safety?", a: "Surah 106", wrong: ["Surah 1", "Surah 2", "Surah 114"], why: "For the protection of the Quraysh... and has made them safe from fear. (106:1-4)" }
      ]
    },
    {
      slug: "who-does-more-wrong",
      title: "Who does more wrong?",
      line: "None does more wrong than one who lies about Allah.",
      facts: ["Never invent lies about Allah", "Accept the truth"],
      quote: q29(68),
      source: ik(68, "The worst wrongdoer claims a revelation Allah never sent, or denies the truth when it comes. One fabricates, the other disbelieves.", "the former is a fabricator and the latter is a disbeliever"),
      difficulty: 4,
      questions: [
        { q: "Whom does 29:68 call the worst wrongdoer?", a: "One who lies against Allah", wrong: ["A poor man", "A traveler", "A child"], why: "And who does more wrong than he who invents a lie against Allah." },
        { q: "Who else does great wrong, in 29:68?", a: "One who denies the truth", wrong: ["One who asks questions", "One who travels", "One who sleeps"], why: "Or denies the truth, when it comes to him." },
        { q: "What does Ibn Kathir call the liar about Allah?", a: "A fabricator", wrong: ["A poet", "A judge", "A guest"], why: "The former is a fabricator and the latter is a disbeliever." }
      ]
    },
    {
      slug: "guided-to-our-paths",
      title: "Guided to Our paths",
      line: "Allah guides those who strive for Him; He is with the good.",
      facts: ["Act on what you know", "Allah is with the doers of good"],
      quote: q29(69),
      source: ik(69, "Allah helps those who strive for Him to follow His path. Abbas Al-Hamdani said: act on what you know, and Allah teaches you more.", "Those who act upon what they know, Allah will guide them to that which they do not know"),
      difficulty: 4,
      questions: [
        { q: "What does Allah promise strivers, in 29:69?", a: "To guide them to His paths", wrong: ["Gold", "Fame", "A long life"], why: "We will surely guide them to Our paths." },
        { q: "Who does Allah side with, in 29:69?", a: "The doers of good", wrong: ["The proud", "The rich", "The loud"], why: "And verily, Allah is with the doers of good." },
        { q: "What did Isa say righteousness means, per Ibn Kathir?", a: "Good even to those who hurt you", wrong: ["Good only to friends", "Revenge", "Silence"], why: "Righteousness means doing good to those who ill-treat you." }
      ]
    }
  ]
};

export const ANKABUT_UNITS: readonly DeepUnit[] = [ANKABUT_ONE, ANKABUT_TWO, ANKABUT_THREE, ANKABUT_FOUR];
