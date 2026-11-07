import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Ar-Ra'd ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Ar-Ra'd 13:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_13_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Ar-Ra'd 13:${ayah}`,
    url: `https://quran.com/13:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 13:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q13 = (ayah: number) => quranQuote(13, ayah);

/** Ayahs 1 to 11: the truth from your Lord, the sky without pillars, signs on the earth, the unseen, and the guardian angels. */
const RAAD_ONE: DeepUnit = {
  key: "raad1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-13",
  name: "Ar-Ra'd, ayahs 1 to 11",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ar-Ra'd",
  lessons: [
    {
      slug: "the-truth-from-your-lord",
      title: "The truth from your Lord",
      line: "The Quran is the truth from Allah, yet most do not believe.",
      facts: ["Opening letters show its miracle", "Most refuse out of stubbornness"],
      quote: q13(1),
      source: ik(1, "Surahs that open with separate letters show that the Quran is a miracle and a revelation from Allah. What was sent to the Prophet ﷺ is the truth, yet most people still do not believe, out of stubbornness.", "is an evidence that it is a revelation from Allah"),
      difficulty: 2,
      questions: [
        { q: "What is revealed from your Lord, per 13:1?", a: "The truth", wrong: ["A poem", "A guess", "Old tales"], why: "And that which has been revealed unto you from your Lord is the truth." },
        { q: "How many people believe, per 13:1?", a: "Most do not believe", wrong: ["All believe", "Most believe", "None at all"], why: "But most men believe not." },
        { q: "Ibn Kathir says the opening letters show the Quran is a miracle.", tf: true, why: "Every Surah that starts with separate letters affirms the Quran is a revelation from Allah." }
      ]
    },
    {
      slug: "sky-without-pillars",
      title: "A sky without pillars",
      line: "Allah raised the heavens high without any pillars you can see.",
      facts: ["Raised by His order and power", "Seven heavens, one above another"],
      quote: q13(2),
      source: ik(2, "Allah raised the heavens high above the earth by His permission and order, with no pillars holding them up. This shows His perfect ability and power.", "the heaven is elevated (above the earth) without pillars, as you see"),
      difficulty: 2,
      questions: [
        { q: "How did Allah raise the heavens, in 13:2?", a: "Without pillars you can see", wrong: ["On tall pillars", "On mountains", "On ropes"], why: "Allah is He Who raised the heavens without any pillars that you can see." },
        { q: "What does the sky without pillars show, per Ibn Kathir?", a: "Allah's ability and power", wrong: ["Old building skill", "The work of angels only", "Nothing at all"], why: "This meaning best affirms Allah's ability and power." },
        { q: "Ibn Kathir says the sky stands on pillars made by people.", tf: false, why: "The heaven is elevated above the earth without pillars, as you see." }
      ]
    },
    {
      slug: "sun-and-moon-on-a-course",
      title: "The sun and moon on a course",
      line: "The sun and moon run a set course, by Allah's order.",
      facts: ["Brightest signs in the sky", "So you believe in meeting Allah"],
      quote: q13(2),
      source: ik(2, "Allah subjected the sun and the moon, each running for a set term. If He controls the brightest things in the sky, He controls everything else. He explains His signs so we believe we will meet Him.", "if Allah subjected these to His power, then it is clear that He has also subjected all other heavenly objects"),
      difficulty: 3,
      questions: [
        { q: "How long do the sun and moon run, in 13:2?", a: "For a term appointed", wrong: ["Forever", "For one year", "Until people stop them"], why: "He has subjected the sun and the moon, each running (its course) for a term appointed." },
        { q: "Why does Allah explain His signs, in 13:2?", a: "So you believe in meeting Him", wrong: ["So you fear the sun", "So you count the stars", "So you travel far"], why: "That you may believe with certainty in the meeting with your Lord." },
        { q: "Why mention the sun and moon, per Ibn Kathir?", a: "If those obey Him, all others do", wrong: ["They are gods", "They are the only lights", "They never move"], why: "If Allah subjected these to His power, He has also subjected all other heavenly objects." },
        { q: "We should prostrate to the sun because it is bright.", tf: false, why: "Prostrate yourselves not to the sun nor to the moon, but prostrate yourselves to Allah Who created them." }
      ]
    },
    {
      slug: "earth-spread-out",
      title: "The earth spread out",
      line: "Allah spread the earth with mountains, rivers and paired fruit.",
      facts: ["Night covers the day", "Signs for those who reflect"],
      quote: q13(3),
      source: ik(3, "Allah spread out the earth, set firm mountains on it and made rivers run, so fruits of every kind grow, in pairs. He brings the night over the day. These are signs for people who think.", "made it spacious in length and width"),
      difficulty: 2,
      questions: [
        { q: "What did Allah place in the earth, in 13:3?", a: "Firm mountains and rivers", wrong: ["Only deserts", "Only seas", "Tall towers"], why: "And placed therein firm mountains and rivers." },
        { q: "How did Allah make every kind of fruit, in 13:3?", a: "In pairs", wrong: ["One kind only", "In threes", "With no seeds"], why: "And of every kind of fruit He made Zawjayn Ithnayn (two in pairs)." },
        { q: "Who are these signs for, in 13:3?", a: "People who reflect", wrong: ["Only kings", "Only farmers", "No one"], why: "Verily, in these things, there are Ayat (signs) for people who reflect." }
      ]
    },
    {
      slug: "same-water-different-taste",
      title: "Same water, different taste",
      line: "Plants side by side drink one water, yet taste different.",
      facts: ["Some land rich, some salty", "Dates, grapes and crops differ"],
      quote: q13(4),
      source: ik(3, "Lands lie next to each other, some rich and some salty. Gardens, crops and palms drink the same water, yet differ in taste, color and scent. This points to the Creator Who does what He wills.", "all these variances and complex diversities are watered by the same water"),
      difficulty: 3,
      questions: [
        { q: "What waters the gardens and palms, in 13:4?", a: "The same water", wrong: ["Different rivers", "No water", "Sea water"], why: "Watered with the same water; yet some of them We make more excellent than others to eat." },
        { q: "What are the neighboring tracts, per Ibn Abbas?", a: "Lands side by side, rich or salty", wrong: ["Two cities", "Two oceans", "Mountain tops"], why: "Some of them are fertile and produce what benefits people, while others are dead, salty." },
        { q: "What do the many tastes from one water point to?", a: "The Creator Who does what He wills", wrong: ["Pure chance", "The weather only", "The farmer alone"], why: "All this indicates the existence of the Creator Who does what He wills." },
        { q: "Who understands these signs, in 13:4?", a: "People who understand", wrong: ["People who rush", "No one", "Only angels"], why: "Verily, in these things there are Ayat (signs) for the people who understand." }
      ]
    },
    {
      slug: "a-new-creation",
      title: "Wondering at their denial",
      line: "They saw Allah create all, yet denied He can raise the dead.",
      facts: ["Creating the heavens is greater", "Raising again is easier for Him"],
      quote: q13(5),
      source: ik(5, "The disbelievers admitted Allah created all things from nothing, yet denied He will raise people again. Creating the heavens and earth is greater than creating people, so He is surely able to bring them back.", "creating the heavens and earth is a greater feat than creating men"),
      difficulty: 3,
      questions: [
        { q: "What did the deniers say, in 13:5?", a: "When we are dust, shall we be raised?", wrong: ["We will live forever", "We believe in the Hour", "Teach us more"], why: "When we are dust, shall we indeed then be (raised) in a new creation?" },
        { q: "What did they admit, per Ibn Kathir?", a: "Allah began the creation", wrong: ["Nothing at all", "Idols made the sky", "The world made itself"], why: "They admit that Allah originated the creation of all things and brought them into existence." },
        { q: "Which is greater, per Ibn Kathir?", a: "Creating the heavens and earth", wrong: ["Creating one man", "Building a city", "Raising one person"], why: "Creating the heavens and earth is a greater feat than creating men." }
      ]
    },
    {
      slug: "forgiving-and-severe",
      title: "Full of forgiveness",
      line: "They rushed the punishment, yet Allah is full of forgiveness.",
      facts: ["Earlier nations were a lesson", "Fear and hope go together"],
      quote: q13(6),
      source: ik(6, "The disbelievers dared the Prophet ﷺ to bring the punishment. Allah is full of forgiveness despite people's wrongdoing, and also severe in punishment, so fear and hope are both mentioned.", "so that fear and hope are both addressed and mentioned"),
      difficulty: 3,
      questions: [
        { q: "What did they ask to hasten, in 13:6?", a: "The evil before the good", wrong: ["The rain", "The harvest", "The good news"], why: "They ask you to hasten the evil before the good." },
        { q: "What is Allah full of, in 13:6?", a: "Forgiveness for mankind", wrong: ["Anger only", "Need for people", "Doubt"], why: "But verily, your Lord is full of forgiveness for mankind, in spite of their wrongdoing." },
        { q: "Why are forgiveness and punishment named together, per Ibn Kathir?", a: "So fear and hope both stay", wrong: ["To scare children", "By chance", "To end hope"], why: "So that fear and hope are both addressed and mentioned." },
        { q: "Ibn Kathir says Allah could punish people sooner but forgives.", tf: true, why: "If it was not for His forbearance and forgiveness, Allah would have indeed punished them sooner." }
      ]
    },
    {
      slug: "only-a-warner",
      title: "Only a warner",
      line: "The Prophet ﷺ is a warner, and every people had a guide.",
      facts: ["They demanded miracles", "Guidance is from Allah"],
      quote: q13(7),
      source: ik(7, "The idolaters demanded miracles, like turning a hill into gold. Allah told the Prophet ﷺ his duty is only to convey the message, and every people had a caller sent to them.", "your duty is only to convey"),
      difficulty: 3,
      questions: [
        { q: "What did the disbelievers ask for, in 13:7?", a: "A sign sent down to him", wrong: ["More food", "A king", "A new city"], why: "Why is not a sign sent down to him from his Lord?" },
        { q: "What is the Prophet ﷺ called, in 13:7?", a: "Only a warner", wrong: ["A king", "A poet", "A guard"], why: "You are only a warner." },
        { q: "What does every people have, in 13:7?", a: "A guide", wrong: ["A palace", "A river", "An idol"], why: "And to every people there is a guide." },
        { q: "What does guide mean in 13:7, per Ibn Abbas?", a: "A caller", wrong: ["A map", "A star", "A road"], why: "For every people there has been a caller, according to Ibn Abbas." }
      ]
    },
    {
      slug: "knower-of-the-unseen",
      title: "Knower of the unseen",
      line: "Allah knows what every womb holds, and everything has a measure.",
      facts: ["He knows the seen and unseen", "The Most Great, the Most High"],
      quote: q13(8),
      source: ik(8, "Nothing is hidden from Allah. He knows what every mother carries, its life, its provision and its end. Everything with Him has a set measure. He knows what we see and what we cannot.", "Allah has the records of the provisions and terms of His creation and made an appointed term for everything"),
      difficulty: 3,
      questions: [
        { q: "What does Allah know, in 13:8?", a: "What every female bears", wrong: ["Only the weather", "Only the past", "Only what is spoken"], why: "Allah knows what every female bears." },
        { q: "How is everything with Allah, in 13:8?", a: "In due proportion", wrong: ["Random", "Unplanned", "Unknown"], why: "Everything with Him is in (due) proportion." },
        { q: "What two kinds of things does Allah know, in 13:9?", a: "The unseen and the seen", wrong: ["Only the seen", "Only the past", "Only the sky"], why: "All-Knower of the unseen and the seen, the Most Great, the Most High." },
        { q: "Qatadah said Allah gave everything an appointed term.", tf: true, why: "Allah has the records of the provisions and terms of His creation and made an appointed term for everything." }
      ]
    },
    {
      slug: "the-five-keys",
      title: "The five keys of the unseen",
      line: "Five things only Allah knows, like tomorrow and the rain.",
      facts: ["Where one will die", "When the Hour will come"],
      quote: q13(8),
      source: hadith("bukhari", "4697", "Ibn Umar", "Sahih", "The Prophet ﷺ said the keys of the unseen are five that only Allah knows: what will happen tomorrow, what is in the wombs, when it will rain, where one will die, and when the Hour will come.", "The keys of Unseen are five which none knows but Allah"),
      difficulty: 3,
      questions: [
        { q: "How many keys of the unseen are there?", a: "Five", wrong: ["Three", "Seven", "Ten"], why: "The keys of Unseen are five which none knows but Allah." },
        { q: "Which is one of the five keys?", a: "When it will rain", wrong: ["How tall a mountain is", "The color of the sky", "The name of a city"], why: "None knows when it will rain but Allah." },
        { q: "Who narrated the hadith of the five keys?", a: "Ibn Umar", wrong: ["Anas", "Aishah", "Abu Bakr"], why: "Narrated Ibn Umar: Allah's Messenger ﷺ said the keys of Unseen are five." },
        { q: "Some people know when the Hour will come.", tf: false, why: "None knows when the Hour will be established but Allah." }
      ]
    },
    {
      slug: "secret-or-open",
      title: "Secret or open, the same",
      line: "Whether you whisper or speak aloud, Allah hears it all.",
      facts: ["Hidden by night or out by day", "Aishah on the woman who complained"],
      quote: q13(10),
      source: ik(10, "Allah hears what we hide and what we say openly. Aishah praised Allah, Whose hearing covers all voices, when He heard a woman she could not hear in the same room.", "Whose hearing has encompassed all voices"),
      difficulty: 3,
      questions: [
        { q: "What is the same to Allah, in 13:10?", a: "Hiding speech or saying it openly", wrong: ["Day and night only", "Rich and poor", "Near and far towns"], why: "It is the same (to Him) whether any of you conceals his speech or declares it openly." },
        { q: "Whom does Allah see, in 13:10?", a: "The one hidden by night too", wrong: ["Only those out by day", "Only the loud", "Only the kings"], why: "Whether he be hid by night or goes forth freely by day." },
        { q: "What did Aishah praise Allah for?", a: "His hearing covers all voices", wrong: ["Rain that day", "A good harvest", "A long journey"], why: "All praise is due to Allah Whose hearing has encompassed all voices!" }
      ]
    },
    {
      slug: "angels-in-succession",
      title: "Angels in succession",
      line: "Angels take turns guarding each person, by Allah's command.",
      facts: ["Two record deeds, two guard", "Four by day, four by night"],
      quote: q13(11),
      source: ik(10, "Angels take turns around every person by night and day. Two write deeds, one on the right for good and one on the left for bad, and two guard from front and back.", "These angels protect each person from harm and accidents"),
      difficulty: 4,
      questions: [
        { q: "Who guards each person, in 13:11?", a: "Angels in succession", wrong: ["Soldiers", "Jinn", "Birds"], why: "For him (each person), there are angels in succession, before and behind him." },
        { q: "By whose command do they guard, in 13:11?", a: "By the command of Allah", wrong: ["By their own will", "By the king", "By people"], why: "They guard him by the command of Allah." },
        { q: "What does the angel on the right record?", a: "Good deeds", wrong: ["Bad deeds", "Dreams", "Words only"], why: "The angel to the right records the good deeds." },
        { q: "How many angels surround each person by day, per Ibn Kathir?", a: "Four", wrong: ["One", "Two", "Ten"], why: "There are four angels that surround each person by day." }
      ]
    },
    {
      slug: "angels-meet-at-fajr-and-asr",
      title: "They meet at Fajr and Asr",
      line: "The day and night angels meet at the Fajr and Asr prayers.",
      facts: ["Allah asks how they left us", "They left us praying"],
      quote: q13(11),
      source: hadith("bukhari", "555", "Abu Hurairah", "Sahih", "The Prophet ﷺ said angels come in turns by night and day and gather at the Fajr and Asr prayers. Allah asks them how they left His servants, and they say they left them praying and found them praying.", "all of them get together at the time of the Fajr and"),
      difficulty: 4,
      questions: [
        { q: "At which prayers do the angels gather?", a: "Fajr and Asr", wrong: ["Dhuhr and Isha", "Maghrib only", "Isha only"], why: "All of them get together at the time of the Fajr and Asr prayers." },
        { q: "What do the angels answer Allah?", a: "We left them praying", wrong: ["We left them asleep", "We did not see them", "They were busy"], why: "When we left them they were praying and when we reached them, they were praying." },
        { q: "Who narrated the hadith of the angels at Fajr and Asr?", a: "Abu Hurairah", wrong: ["Ibn Abbas", "Umar", "Anas"], why: "Narrated Abu Huraira: Angels come to you in succession by night and day." },
        { q: "Allah asks the angels because He does not know.", tf: false, why: "Allah asks them, though He knows everything about you." }
      ]
    },
    {
      slug: "change-what-is-in-yourselves",
      title: "Change starts with us",
      line: "Allah keeps a people's good state until they change themselves.",
      facts: ["Obey and blessings stay", "Turn away and they are lost"],
      quote: q13(11),
      source: ik(10, "Allah does not take away a people's good condition while they stay on goodness. If they turn from obeying Him to disobeying Him, He takes away what they love.", "every people of a village or a house who used to obey Allah but changed their behavior to disobeying Him"),
      difficulty: 4,
      questions: [
        { q: "When does Allah change a people's good condition, in 13:11?", a: "When they change themselves", wrong: ["Every hundred years", "Never", "At random"], why: "Allah will not change the (good) condition of a people as long as they do not change their state (of goodness) themselves." },
        { q: "What happens when Allah wills a punishment, in 13:11?", a: "No one can turn it back", wrong: ["It can be bought off", "Idols stop it", "It waits forever"], why: "But when Allah wills a people's punishment, there can be no turning it back." },
        { q: "What happens to people who turn from obeying to disobeying?", a: "They lose what they like", wrong: ["They get more", "Nothing changes", "They become kings"], why: "He will take away from them what they like and exchange it for what they dislike." },
        { q: "A people who keep obeying Allah lose their blessings anyway.", tf: false, why: "Allah will not change the (good) condition of a people as long as they do not change their state themselves." }
      ]
    },
    {
      slug: "change-works-both-ways",
      title: "Change works both ways",
      line: "Turn from sin to obedience, and Allah turns hardship into good.",
      facts: ["As-Sa'di explains", "Change starts within"],
      quote: q13(11),
      source: saadi(13, 11, "As-Sa'di says Allah does not take away a people's blessings until they move from faith to disbelief, from obedience to sin, or from thanks to arrogance; and likewise when people change from sin to obeying Allah, He changes their misery into good, joy and mercy.", "وكذلك إذا غير العباد ما بأنفسهم من المعصية، فانتقلوا إلى طاعة الله"),
      difficulty: 2,
      questions: [
        { q: "What happens when people turn from sin to obedience, per as-Sa'di on 13:11?", a: "Allah changes their state to good", wrong: ["Nothing changes", "They lose blessings", "They become poor"], why: "Allah changes their misery into good, joy and mercy." },
        { q: "When does Allah take a blessing away, per as-Sa'di on 13:11?", a: "When people change to sin or ingratitude", wrong: ["At random", "When they pray more", "When they give charity"], why: "He removes it when they change from faith, obedience or thanks." },
        { tf: true, q: "Changing for the better brings Allah's mercy.", why: "As-Sa'di on 13:11." }
      ]
    }
  ]
};

/** Ayahs 12 to 24: lightning and thunder, the word of truth, the parable of foam, and the qualities of the people of Paradise. */
const RAAD_TWO: DeepUnit = {
  key: "raad2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-13",
  name: "Ar-Ra'd, ayahs 12 to 24",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ar-Ra'd",
  lessons: [
    {
      slug: "lightning-fear-and-hope",
      title: "Lightning: fear and hope",
      line: "Lightning brings fear to travelers and hope of rain to others.",
      facts: ["Allah brings up heavy clouds", "Clouds heavy with rain"],
      quote: q13(12),
      source: ik(12, "Allah shows us lightning. Qatadah said travelers fear its harm, while people at home hope for the rain and blessing it brings. Allah raises clouds heavy with rain.", "Fear for travelers, for they feel afraid of its harm and hardship, and hope for residents"),
      difficulty: 2,
      questions: [
        { q: "How does Allah show the lightning, in 13:12?", a: "As a fear and as a hope", wrong: ["As a game", "As a gift of gold", "As a warning only"], why: "It is He Who shows you the lightning, as a fear and as a hope." },
        { q: "Who hopes when they see lightning, per Qatadah?", a: "People at home awaiting rain", wrong: ["Travelers", "Sailors only", "No one"], why: "Hope for residents, awaiting its blessing and benefit and anticipating Allah's provisions." },
        { q: "What clouds does Allah bring up, in 13:12?", a: "Heavy ones", wrong: ["Empty ones", "Red ones", "Tiny ones"], why: "And it is He Who brings up the clouds, heavy (with water)." }
      ]
    },
    {
      slug: "thunder-glorifies",
      title: "The thunder praises Him",
      line: "The thunder glorifies Allah, and so do the angels, in awe.",
      facts: ["Everything glorifies Him", "Ibn az-Zubayr stopped to praise Allah"],
      quote: q13(13),
      source: ik(12, "Ar-Ra'd means thunder. It glorifies Allah, and so do the angels in awe of Him. When Abdullah ibn az-Zubayr heard thunder, he stopped talking and praised the One Whom the thunder glorifies.", "bin Az-Zubayr used to hear thunder, he would stop talking and would supplicate"),
      difficulty: 3,
      questions: [
        { q: "What glorifies and praises Allah, in 13:13?", a: "The thunder", wrong: ["Only people", "Only birds", "The wind alone"], why: "And Ar-Ra'd (thunder) glorifies and praises Him." },
        { q: "Why do the angels glorify Him, in 13:13?", a: "Out of awe of Him", wrong: ["For reward from people", "By chance", "Out of boredom"], why: "And so do the angels because of His awe." },
        { q: "What did Ibn az-Zubayr do when he heard thunder?", a: "Stopped talking and praised Allah", wrong: ["Ran indoors", "Laughed", "Kept talking"], why: "When Abdullah bin Az-Zubayr used to hear thunder, he would stop talking and would supplicate." },
        { q: "What does Ar-Ra'd, the surah's name, mean?", a: "Thunder", wrong: ["Rain", "Light", "Cloud"], why: "And Ar-Ra'd (thunder) glorifies and praises Him." }
      ]
    },
    {
      slug: "the-word-of-truth",
      title: "The word of truth",
      line: "La ilaha illallah is the word of truth; idols answer no one.",
      facts: ["Like a hand stretched to far water", "The water never reaches his mouth"],
      quote: q13(14),
      source: ik(14, "The word of truth is La ilaha illallah. Calling on others besides Allah is like stretching a hand toward water far down a well: it never reaches the mouth, and brings no benefit.", "will never benefit from these deities in this life or the Hereafter"),
      difficulty: 3,
      questions: [
        { q: "What is the Word of Truth, per Ibn Abbas?", a: "La ilaha illallah", wrong: ["A poem", "A promise of wealth", "A greeting"], why: "For Him is the Word of Truth means La ilaha illallah." },
        { q: "What are false gods compared to, in 13:14?", a: "A hand stretched for far water", wrong: ["A full cup", "A strong rope", "A bright lamp"], why: "Answer them no more than one who stretches forth his hand for water to reach his mouth, but it reaches him not." },
        { q: "Does the water reach his mouth, in 13:14?", a: "No, it never reaches", wrong: ["Yes, slowly", "Only at night", "Only in winter"], why: "For water to reach his mouth, but it reaches him not." },
        { q: "Calling on idols brings benefit in the Hereafter.", tf: false, why: "Those idolators will never benefit from these deities in this life or the Hereafter." }
      ]
    },
    {
      slug: "even-the-shadows-bow",
      title: "Even the shadows bow",
      line: "All in the heavens and earth bow to Allah, even their shadows.",
      facts: ["Believers bow willingly", "Shadows in morning and evening"],
      quote: q13(15),
      source: ik(15, "Everything is subject to Allah. Believers prostrate to Him willingly, others unwillingly, and their shadows bow too, in the mornings and the afternoons.", "everything is subservient to Him"),
      difficulty: 3,
      questions: [
        { q: "Who prostrates to Allah, in 13:15?", a: "All in the heavens and the earth", wrong: ["Only angels", "Only birds", "No one"], why: "And unto Allah falls in prostration whoever is in the heavens and the earth." },
        { q: "What else bows, in 13:15?", a: "Their shadows", wrong: ["Their houses", "Their coins", "Their clothes"], why: "And so do their shadows in the mornings and in the afternoons." },
        { q: "How do believers prostrate, per Ibn Kathir?", a: "Willingly", wrong: ["Unwillingly", "Only once", "Never"], why: "Everything, including the believers, prostrate to Allah willingly." }
      ]
    },
    {
      slug: "blind-and-seeing",
      title: "The blind and the seeing",
      line: "The blind and the seeing are not equal, nor darkness and light.",
      facts: ["Idols cannot help themselves", "Allah alone created all"],
      quote: q13(16),
      source: ik(16, "The idolaters admitted Allah created the heavens and earth, yet worshipped others who cannot help or harm even themselves. One who worships Allah alone has light, unlike one in darkness.", "do not have the power to benefit or harm themselves"),
      difficulty: 3,
      questions: [
        { q: "Who is the Lord of the heavens and earth, in 13:16?", a: "Allah", wrong: ["The sun", "The kings", "The idols"], why: "Say: Who is the Lord of the heavens and the earth? Say: (It is) Allah." },
        { q: "What can the false protectors do, per 13:16?", a: "No benefit or harm, even to themselves", wrong: ["Bring rain", "Heal the sick", "Make the sky"], why: "Such as have no power either for benefit or for harm to themselves." },
        { q: "What is not equal to light, in 13:16?", a: "Darkness", wrong: ["The sun", "Fire", "The moon"], why: "Or darkness equal to light?" },
        { q: "What did the idols create, per 13:16?", a: "Nothing like His creation", wrong: ["Half the stars", "The seas", "The animals"], why: "Allah is the Creator of all things; and He is the One, the Irresistible." }
      ]
    },
    {
      slug: "foam-on-the-flood",
      title: "Foam on the flood",
      line: "Rain fills each valley; the foam on top soon washes away.",
      facts: ["Truth stays like the water", "Falsehood fades like foam"],
      quote: q13(17),
      source: ik(17, "Rain fills each valley by its size, and foam rises on top. The foam is carried off and scatters, but the water stays and benefits people. Truth remains and falsehood perishes.", "truth remains and increases, while falsehood diminishes and perishes"),
      difficulty: 3,
      questions: [
        { q: "How do the valleys flow, in 13:17?", a: "According to their measure", wrong: ["All the same", "Upward", "Without water"], why: "And the valleys flow according to their measure." },
        { q: "What happens to the foam, in 13:17?", a: "It passes away as scum", wrong: ["It turns to gold", "It stays forever", "It feeds the crops"], why: "Then, as for the foam it passes away as scum upon the banks." },
        { q: "What does the foam stand for, per Ibn Kathir?", a: "Falsehood", wrong: ["Truth", "Rain", "Knowledge"], why: "Truth remains and increases, while falsehood diminishes and perishes." },
        { q: "What do the different valleys show, per Ibn Kathir?", a: "Hearts hold different amounts of knowledge", wrong: ["Rivers are dangerous", "Rain is rare", "Land is equal"], why: "Some of them can retain substantial knowledge while others cannot." }
      ]
    },
    {
      slug: "metal-in-the-fire",
      title: "Metal in the fire",
      line: "Melted gold throws off scum too; what is useful remains.",
      facts: ["Doubt is like the scum", "Certainty is what stays"],
      quote: q13(17),
      source: ik(17, "When gold and silver are heated, scum rises and is thrown away, while the metal stays. Ibn Abbas said hearts carry knowledge like this: Allah keeps certainty and throws away doubt.", "similarly Allah accepts certainty and discards doubt"),
      difficulty: 4,
      questions: [
        { q: "What do people heat in the fire, in 13:17?", a: "Ore for ornaments or tools", wrong: ["Water for tea", "Sand for glass", "Wood for ash"], why: "From that (ore) which they heat in the fire in order to make ornaments or utensils, rises a foam like unto it." },
        { q: "What remains in the earth, in 13:17?", a: "What benefits mankind", wrong: ["The foam", "The smoke", "Nothing"], why: "While that which is for the good of mankind remains in the earth." },
        { q: "Per Ibn Abbas, what does Allah discard like scum?", a: "Doubt", wrong: ["Certainty", "Good deeds", "Knowledge"], why: "Similarly Allah accepts certainty and discards doubt." },
        { q: "Ibn Kathir says some of the early scholars wept when they could not understand a parable.", tf: true, why: "When I would read a parable in the Quran that I could not comprehend, I would cry for myself." }
      ]
    },
    {
      slug: "hearts-like-valleys",
      title: "Hearts like valleys",
      line: "A big valley holds much water; a big heart holds much knowledge.",
      facts: ["As-Sa'di explains", "The parable of the flood"],
      quote: q13(17),
      source: saadi(13, 17, "As-Sa'di says Allah likens His guidance to rain that gives life, and hearts to valleys: a big valley holds much water, like a big heart that holds much knowledge, and a small one holds little; doubts and desires are the foam that floats, until the heart fights them off and stays pure.", "فواد كبير يسع ماء كثيرا، كقلب كبير يسع علما كثيرا"),
      difficulty: 2,
      questions: [
        { q: "What are the valleys like, per as-Sa'di on 13:17?", a: "Hearts that hold guidance", wrong: ["Cities", "Kings", "Stars"], why: "Hearts take in guidance as valleys take in rain." },
        { q: "What is the foam like, per as-Sa'di on 13:17?", a: "Doubts and desires in the heart", wrong: ["Good deeds", "Knowledge", "Prayer"], why: "Doubts and desires float like foam, then fade away." },
        { tf: true, q: "The rain in the parable stands for the guidance Allah sent down.", why: "As-Sa'di on 13:17." }
      ]
    },
    {
      slug: "rain-on-three-lands",
      title: "Rain on three lands",
      line: "His guidance, said the Prophet ﷺ, is like rain on three lands.",
      facts: ["Some learn and teach", "Some do not care for it"],
      quote: q13(17),
      source: hadith("bukhari", "79", "Abu Musa", "Sahih", "The Prophet ﷺ said the guidance he brought is like rain. Fertile land grows plants, hard land holds water for others, and barren land does neither. The best learns, benefits and teaches.", "is like abundant rain falling on the earth"),
      difficulty: 4,
      questions: [
        { q: "What is the Prophet's ﷺ guidance compared to?", a: "Abundant rain", wrong: ["A strong wind", "A tall tree", "A bright star"], why: "The example of guidance and knowledge with which Allah has sent me is like abundant rain falling on the earth." },
        { q: "Who is like the fertile land?", a: "One who learns and teaches", wrong: ["One who sleeps", "One who travels", "One who sells"], why: "The first is the example of the person who comprehends Allah's religion and gets benefit." },
        { q: "What does barren land do with rain?", a: "Neither holds it nor grows plants", wrong: ["Grows a forest", "Holds a lake", "Turns green"], why: "A portion of it was barren which could neither hold the water nor bring forth vegetation." },
        { q: "Who narrated the hadith of rain on three lands?", a: "Abu Musa", wrong: ["Abu Hurairah", "Anas", "Ibn Umar"], why: "Narrated Abu Musa: The Prophet ﷺ said the example of guidance is like rain." }
      ]
    },
    {
      slug: "those-who-answered",
      title: "Those who answered",
      line: "Those who answer Allah's call get the best reward.",
      facts: ["Al-Husna is the good reward", "No ransom accepted from deniers"],
      quote: q13(18),
      source: ik(18, "Those who obey Allah and follow His Messenger ﷺ receive Al-Husna, the good reward. Those who refuse would give the whole earth twice over to save themselves, but it will not be accepted.", "which is the good reward"),
      difficulty: 3,
      questions: [
        { q: "What do those who answered their Lord get, in 13:18?", a: "Al-Husna", wrong: ["Gold now", "Long life", "Nothing"], why: "For those who answered their Lord's call is Al-Husna." },
        { q: "What does Al-Husna mean, per Ibn Kathir?", a: "The good reward", wrong: ["A palace", "A long journey", "A name"], why: "Al-Husna, which is the good reward." },
        { q: "Will a ransom be accepted from those who refused, per Ibn Kathir?", a: "No, never", wrong: ["Yes, in gold", "Yes, half", "Only from kings"], why: "Allah the Exalted will not accept any type of exchange from them." }
      ]
    },
    {
      slug: "knowing-the-truth",
      title: "One who knows the truth",
      line: "One who knows the Quran is truth is not like the blind.",
      facts: ["Every part of it is true", "Men of understanding take heed"],
      quote: q13(19),
      source: ik(19, "Believers know the Quran is true, with no contradiction, each part confirming the other. They are not like those blind to guidance. Only people of sound minds take the lesson.", "each part of it testifying to another"),
      difficulty: 3,
      questions: [
        { q: "Who is not like the one who knows the truth, in 13:19?", a: "The one who is blind", wrong: ["The traveler", "The rich man", "The child"], why: "Shall he then who knows that what has been revealed unto you from your Lord is the truth, be like him who is blind?" },
        { q: "Who pays heed, in 13:19?", a: "Men of understanding", wrong: ["Everyone", "No one", "Only the old"], why: "But it is only the men of understanding that pay heed." },
        { q: "Ibn Kathir says some parts of the Quran contradict others.", tf: false, why: "They believe that none of its parts contradicts the others, each part of it testifying to another." }
      ]
    },
    {
      slug: "keeping-the-covenant",
      title: "Keeping the covenant",
      line: "The people of Paradise keep their word and never break trust.",
      facts: ["Unlike hypocrites who betray", "They fear their Lord"],
      quote: q13(20),
      source: ik(20, "Those who will earn the final home keep Allah's covenant and never break a trust. They are not like the hypocrites, who break promises, lie and betray what is left with them.", "They are nothing like the hypocrites who when one of them makes a covenant, he breaks it"),
      difficulty: 3,
      questions: [
        { q: "What do the believers fulfill, in 13:20?", a: "The covenant of Allah", wrong: ["Every wish", "Their dreams", "Market deals only"], why: "Those who fulfill the covenant of Allah and break not the trust." },
        { q: "Whom are they not like, per Ibn Kathir?", a: "The hypocrites", wrong: ["The angels", "The Prophets", "The travelers"], why: "They are nothing like the hypocrites who when one of them makes a covenant, he breaks it." },
        { q: "Breaking a trust is a quality of the believers in 13:20.", tf: false, why: "Those who fulfill the covenant of Allah and break not the trust." }
      ]
    },
    {
      slug: "three-signs-of-a-hypocrite",
      title: "Three signs of a hypocrite",
      line: "A hypocrite lies, breaks promises and betrays trust.",
      facts: ["Believers do the opposite", "Keep your word"],
      quote: q13(20),
      source: hadith("bukhari", "33", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said the signs of a hypocrite are three: when he speaks he lies, when he promises he breaks it, and when trusted he betrays.", "The signs of a hypocrite are three"),
      difficulty: 3,
      questions: [
        { q: "How many signs of a hypocrite are in the hadith?", a: "Three", wrong: ["One", "Five", "Seven"], why: "The signs of a hypocrite are three." },
        { q: "What does a hypocrite do when he promises?", a: "He breaks it", wrong: ["He keeps it", "He forgets it", "He doubles it"], why: "Whenever he promises, he always breaks it." },
        { q: "Who narrated the hadith on the signs of a hypocrite?", a: "Abu Hurayrah", wrong: ["Ibn Umar", "Aishah", "Abu Musa"], why: "Narrated Abu Huraira: The Prophet ﷺ said the signs of a hypocrite are three." },
        { q: "Telling lies is one of the hypocrite's signs.", tf: true, why: "Whenever he speaks, he tells a lie." }
      ]
    },
    {
      slug: "joining-the-ties",
      title: "Joining the ties",
      line: "They join what Allah ordered joined: their family ties.",
      facts: ["Kind to the poor and needy", "Afraid of a hard reckoning"],
      quote: q13(21),
      source: ik(20, "Believers are good to their relatives and never cut family ties. They are kind to the poor and needy, and they remember Allah is watching all they do.", "they are good to their relatives and do not sever the bond of kinship"),
      difficulty: 3,
      questions: [
        { q: "What do they join, in 13:21?", a: "What Allah ordered to be joined", wrong: ["Two rivers", "Two tribes in war", "Their wealth"], why: "And those who join that which Allah has commanded to be joined." },
        { q: "What does joining mean in 13:21, per Ibn Kathir?", a: "Being good to relatives", wrong: ["Building walls", "Joining armies", "Mixing foods"], why: "They are good to their relatives and do not sever the bond of kinship." },
        { q: "What do they dread, in 13:21?", a: "The terrible reckoning", wrong: ["The rain", "Poverty", "Travel"], why: "And fear their Lord, and dread the terrible reckoning." }
      ]
    },
    {
      slug: "ties-bring-blessing",
      title: "Ties bring blessing",
      line: "Keeping family ties brings more provision and a longer life.",
      facts: ["Visit and help relatives", "Allah blesses the giver"],
      quote: q13(21),
      source: hadith("bukhari", "5986", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said whoever loves to be given more provision and a longer life should keep good relations with family.", "should keep good relations with his Kith and kin"),
      difficulty: 3,
      questions: [
        { q: "What should one who wants more provision do?", a: "Keep good ties with family", wrong: ["Travel more", "Sleep less", "Buy more"], why: "Whoever loves that he be granted more wealth... should keep good relations with his kith and kin." },
        { q: "What else grows by keeping ties, per the hadith?", a: "A longer life", wrong: ["Taller height", "More friends only", "Bigger houses"], why: "And his lease of life be prolonged then he should keep good relations." },
        { q: "Who narrated the hadith on keeping family ties?", a: "Anas ibn Malik", wrong: ["Abu Hurairah", "Abu Musa", "Ibn Abbas"], why: "Narrated Anas bin Malik: Allah's Apostle said whoever loves to be granted more wealth." }
      ]
    },
    {
      slug: "repel-evil-with-good",
      title: "Repel evil with good",
      line: "They are patient, pray, give, and answer harm with good.",
      facts: ["Patience for Allah's Face", "Forgive and pardon"],
      quote: q13(22),
      source: ik(20, "They are patient for Allah, pray properly, and spend by night and day, in secret and openly. When people harm them, they answer with patience, forgiveness and good.", "When the people harm them they face their harm with good patience"),
      difficulty: 4,
      questions: [
        { q: "Why are they patient, in 13:22?", a: "Seeking their Lord's Face", wrong: ["To be praised", "To get rich", "To win fights"], why: "And those who remain patient, seeking their Lord's Face." },
        { q: "How do they spend, in 13:22?", a: "Secretly and openly", wrong: ["Only in public", "Never", "Only once"], why: "And spend out of that which We have bestowed on them, secretly and openly." },
        { q: "What do they repel evil with, in 13:22?", a: "Good", wrong: ["Evil", "Silence only", "Anger"], why: "And repel evil with good, for such there is a good end." },
        { q: "How do they face harm from people, per Ibn Kathir?", a: "With patience and forgiveness", wrong: ["With revenge", "By running away", "With insults"], why: "When the people harm them they face their harm with good patience, forbearing, forgiveness and pardon." }
      ]
    },
    {
      slug: "peace-be-upon-you",
      title: "Peace be upon you",
      line: "In Adn, families meet and angels greet them with peace.",
      facts: ["Adn means a lasting home", "For your patience"],
      quote: q13(24),
      source: ik(20, "The righteous enter Gardens of Adn with their righteous parents, spouses and children. Angels enter from every gate saying peace be upon you, for you were patient.", "The angels will enter on them from every direction congratulating them for entering Paradise"),
      difficulty: 4,
      questions: [
        { q: "Who enters Adn with them, in 13:23?", a: "Their righteous parents, wives and children", wrong: ["Only kings", "No one", "Strangers"], why: "And (also) those who acted righteously from among their fathers, and their wives, and their offspring." },
        { q: "What do the angels say, in 13:24?", a: "Peace be upon you, for your patience", wrong: ["Go back", "Wait outside", "Pay first"], why: "Salamun Alaykum (peace be upon you) for you persevered in patience!" },
        { q: "What does Adn mean, per Ibn Kathir?", a: "A lasting residence", wrong: ["A short stay", "A garden of trials", "A market"], why: "Adn indicates continuous residence; they will reside in the gardens of everlasting life." },
        { q: "From where do the angels enter, in 13:23?", a: "From every gate", wrong: ["From one gate", "From the roof", "They do not enter"], why: "And angels shall enter unto them from every gate." }
      ]
    }
  ]
};

/** Ayahs 25 to 31: those who break the covenant, the brief world, hearts at rest in remembrance, Tuba, and the Quran. */
const RAAD_THREE: DeepUnit = {
  key: "raad3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-13",
  name: "Ar-Ra'd, ayahs 25 to 31",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ar-Ra'd",
  lessons: [
    {
      slug: "breaking-the-covenant",
      title: "Breaking the covenant",
      line: "Those who break Allah's covenant and cut ties face a bad home.",
      facts: ["The opposite of the believers", "They spread mischief"],
      quote: q13(25),
      source: ik(25, "The wretched ones are the opposite of the believers. They break Allah's covenant, cut what Allah ordered joined, and spread mischief, so they are far from His mercy.", "their characteristics were to the opposite of the believer"),
      difficulty: 3,
      questions: [
        { q: "What do the wretched ones break, in 13:25?", a: "The covenant of Allah", wrong: ["Their idols", "Their chains", "Their fast"], why: "And those who break the covenant of Allah, after its ratification." },
        { q: "What else do they do, in 13:25?", a: "Work mischief in the land", wrong: ["Plant trees", "Feed the poor", "Build mosques"], why: "And sever that which Allah has commanded to be joined, and work mischief in the land." },
        { q: "How do they compare to the believers, per Ibn Kathir?", a: "They are the opposite", wrong: ["They are the same", "They are better", "They are angels"], why: "Their characteristics were to the opposite of the believer's qualities in this life." },
        { q: "Ibn Kathir says the curse means being cast away from Allah's mercy.", tf: true, why: "On them is the curse: they will be cast away from Allah's mercy." }
      ]
    },
    {
      slug: "provision-in-his-hand",
      title: "Provision is in His hand",
      line: "Allah gives more or less provision; this world is brief.",
      facts: ["Wealth can be a test", "The Hereafter is better"],
      quote: q13(26),
      source: ik(26, "Allah alone gives more provision to whom He wills and less to whom He wills, by His wisdom and justice. Those who rejoice in this world do not know they are being tested. This life is brief next to the Hereafter.", "they do not know that they are being tested and tried"),
      difficulty: 3,
      questions: [
        { q: "Who increases and decreases provision, in 13:26?", a: "Allah", wrong: ["The market", "The king", "Luck"], why: "Allah increases the provision for whom He wills, and straitens (it for whom He wills)." },
        { q: "What is this world compared to the Hereafter, in 13:26?", a: "A brief passing enjoyment", wrong: ["Everlasting", "Better", "Equal"], why: "The life of this world compared to the Hereafter is but a brief passing enjoyment." },
        { q: "What do those who rejoice in wealth not know, per Ibn Kathir?", a: "They are being tested", wrong: ["Gold is heavy", "Prices will rise", "Rain will come"], why: "They do not know that they are being tested and tried." }
      ]
    },
    {
      slug: "a-finger-in-the-sea",
      title: "A finger in the sea",
      line: "Next to the Hereafter, this world is a drop on a finger.",
      facts: ["Look at what sticks to it", "The Hereafter is the ocean"],
      quote: q13(26),
      source: hadith("muslim", "2858", "Al-Mustawrid", "Sahih", "The Prophet ﷺ said this world next to the Hereafter is like one of you dipping a finger in the ocean, then seeing how much sticks to it.", "dip his finger"),
      difficulty: 3,
      questions: [
        { q: "What is this world compared to, in the hadith?", a: "Water on a finger dipped in the sea", wrong: ["A great river", "A tall mountain", "A full well"], why: "If one of you should dip his finger in the ocean and then see what has stuck to it." },
        { q: "Which finger did the Prophet ﷺ point with?", a: "The forefinger", wrong: ["The thumb", "The little finger", "No finger"], why: "And while saying this he pointed with his forefinger." },
        { q: "Who narrated the hadith of the finger in the sea?", a: "Al-Mustawrid", wrong: ["Abu Musa", "Anas", "Aishah"], why: "Narrated on the authority of Mustaurid, brother of Bani Fihr." },
        { q: "The hadith says this world is bigger than the Hereafter.", tf: false, why: "This world is so insignificant in comparison to the Hereafter, like a finger dipped in the ocean." }
      ]
    },
    {
      slug: "those-who-turn-to-him",
      title: "Those who turn to Him",
      line: "Allah guides to Himself those who turn to Him in repentance.",
      facts: ["Miracles alone do not guide", "The door of mercy was chosen"],
      quote: q13(27),
      source: ik(27, "The idolaters asked for a hill of gold. The Prophet ﷺ chose that the door of repentance and mercy stay open for them instead. Guidance does not come from miracles; Allah guides those who turn to Him.", "open for them the door to repentance and mercy"),
      difficulty: 3,
      questions: [
        { q: "Whom does Allah guide, in 13:27?", a: "Those who turn to Him", wrong: ["Those who ask for gold", "Those who mock", "Everyone by force"], why: "And guides unto Himself those who turn to Him in repentance." },
        { q: "What did the Prophet ﷺ choose for his people?", a: "The door of repentance and mercy", wrong: ["A mountain of gold", "A quick punishment", "A new river"], why: "Rather, open for them the door to repentance and mercy." },
        { q: "Ibn Kathir says guidance depends on seeing miracles.", tf: false, why: "Earning the misguidance or the guidance are not connected to the miracles or the lack of them." }
      ]
    },
    {
      slug: "hearts-find-rest",
      title: "Hearts find rest",
      line: "In the remembrance of Allah do hearts find rest.",
      facts: ["Believers feel calm with Allah", "He is their Protector"],
      quote: q13(28),
      source: ik(27, "Believers feel calm and at peace when Allah is remembered, happy to have Him as their Protector and Helper. Truly, in Allah's remembrance hearts find rest.", "become tranquil when He is remembered"),
      difficulty: 2,
      questions: [
        { q: "Where do hearts find rest, in 13:28?", a: "In the remembrance of Allah", wrong: ["In wealth", "In games", "In fame"], why: "Verily, in the remembrance of Allah do hearts find rest." },
        { q: "How do believers' hearts feel when Allah is remembered, per Ibn Kathir?", a: "Tranquil", wrong: ["Bored", "Angry", "Afraid of people"], why: "Their hearts become tranquil when He is remembered." },
        { q: "Whom are the believers pleased to have as Protector, per Ibn Kathir?", a: "Allah", wrong: ["A king", "Their tribe", "Their wealth"], why: "Pleased to have Him as their Protector and Supporter." }
      ]
    },
    {
      slug: "nothing-sweeter",
      title: "Nothing sweeter",
      line: "Nothing is sweeter to a heart than loving its Creator.",
      facts: ["As-Sa'di explains", "Love of Allah"],
      quote: q13(28),
      source: saadi(13, 28, "As-Sa'di says hearts truly rest only in Allah's remembrance, their worry gone and their joy come, for nothing is more delightful or sweeter to hearts than loving their Creator, being close to Him and knowing Him, and the more they know and love Him, the more they remember Him.", "فإنه لا شيء ألذ للقلوب ولا أشهى ولا أحلى من محبة خالقها"),
      difficulty: 2,
      questions: [
        { q: "What is sweetest to the heart, per as-Sa'di on 13:28?", a: "Loving its Creator", wrong: ["Wealth", "Fame", "Games"], why: "Nothing is sweeter to hearts than loving their Creator." },
        { q: "What makes a person remember Allah more, per as-Sa'di?", a: "Knowing and loving Him more", wrong: ["Sleeping more", "Eating more", "Talking more"], why: "The more one knows and loves Him, the more one remembers Him." },
        { tf: true, q: "Hearts find their rest in the remembrance of Allah.", why: "As-Sa'di on 13:28." }
      ]
    },
    {
      slug: "living-and-dead",
      title: "The living and the dead",
      line: "Remembering Allah is life; forgetting Him is like being dead.",
      facts: ["Dhikr gives life to the heart", "Remember Him often"],
      quote: q13(28),
      source: hadith("bukhari", "6407", "Abu Musa", "Sahih", "The Prophet ﷺ said the one who remembers his Lord compared to the one who does not is like the living compared to the dead.", "is that of a living creature compared to a dead one"),
      difficulty: 3,
      questions: [
        { q: "Who is like the living, in the hadith?", a: "One who remembers his Lord", wrong: ["One who is rich", "One who is strong", "One who travels"], why: "The example of the one who celebrates the praises of his Lord... is that of a living creature." },
        { q: "Who is like the dead, in the hadith?", a: "One who does not remember Allah", wrong: ["One who sleeps", "One who is old", "One who is poor"], why: "In comparison to the one who does not celebrate the praises of his Lord... a dead one." },
        { q: "Who narrated the hadith of the living and the dead?", a: "Abu Musa", wrong: ["Abu Hurayrah", "Ibn Umar", "Anas"], why: "Narrated Abu Musa: The Prophet ﷺ said the one who celebrates the praises of his Lord." }
      ]
    },
    {
      slug: "tuba-for-them",
      title: "Tuba for them",
      line: "For believers who do good is Tuba and a beautiful return.",
      facts: ["Tuba means joy and delight", "Also a tree in Paradise"],
      quote: q13(29),
      source: ik(27, "Ibn Abbas said Tuba means happiness and the comfort of the eye. Others said it means joy, or how excellent is what they earned. These meanings agree with each other.", "These meanings for Tuba are all synonymous and they do not contradict one another"),
      difficulty: 3,
      questions: [
        { q: "What is for believers who do good, in 13:29?", a: "Tuba and a beautiful return", wrong: ["Gold now", "A long journey", "Nothing yet"], why: "Those who believed, and work righteousness, Tuba is for them and a beautiful place of (final) return." },
        { q: "What does Tuba mean, per Ibn Abbas?", a: "Happiness and comfort of the eye", wrong: ["A river", "A city", "A warning"], why: "Tuba means happiness and comfort or refreshment of the eye." },
        { q: "Ibn Kathir says the meanings of Tuba contradict each other.", tf: false, why: "These meanings for Tuba are all synonymous and they do not contradict one another." }
      ]
    },
    {
      slug: "a-hundred-years-of-shade",
      title: "A hundred years of shade",
      line: "In Paradise, one tree's shade takes a rider over a century.",
      facts: ["Paradise is beyond imagining", "Its shade never ends"],
      quote: q13(29),
      source: hadith("bukhari", "3251", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said there is a tree in Paradise so huge that a rider traveling in its shade for a hundred years could not cross it.", "if a rider travels in its shade for one hundred years"),
      difficulty: 3,
      questions: [
        { q: "How long could a rider travel in the tree's shade?", a: "A hundred years", wrong: ["One day", "Ten years", "One month"], why: "If a rider travels in its shade for one hundred years, he would not be able to cross it." },
        { q: "Could the rider cross the shade?", a: "No", wrong: ["Yes, in a year", "Yes, quickly", "Only at night"], why: "He would not be able to cross it." },
        { q: "Who narrated the hadith of the great tree in Paradise?", a: "Anas ibn Malik", wrong: ["Abu Musa", "Ibn Umar", "Aishah"], why: "Narrated Anas bin Malik: There is a tree in Paradise." }
      ]
    },
    {
      slug: "he-is-my-lord",
      title: "He is my Lord",
      line: "The Prophet ﷺ said: He is my Lord; in Him is my trust.",
      facts: ["Sent like Messengers before", "They denied Ar-Rahman"],
      quote: q13(30),
      source: ik(30, "Allah sent the Prophet ﷺ to recite the revelation, as Messengers were sent before. The idolaters refused the name Ar-Rahman. He answered: He is my Lord, none deserves worship but Him, I trust Him and turn to Him.", "He is my Lord, there is no deity worthy of worship except Him"),
      difficulty: 3,
      questions: [
        { q: "Why was the Prophet ﷺ sent, in 13:30?", a: "To recite what was revealed", wrong: ["To rule a kingdom", "To build a city", "To collect wealth"], why: "In order that you might recite unto them what We have revealed to you." },
        { q: "Whom did they disbelieve in, in 13:30?", a: "The Most Gracious", wrong: ["The sun", "Their idols", "Their fathers"], why: "While they disbelieve in the Most Gracious (Allah)." },
        { q: "In whom is the Prophet's ﷺ trust, in 13:30?", a: "In Allah alone", wrong: ["In his tribe", "In wealth", "In kings"], why: "He is my Lord! None has the right to be worshipped but He! In Him is my trust." },
        { q: "What did they refuse to write at Al-Hudaybiyyah, per Ibn Kathir?", a: "Ar-Rahman Ar-Rahim", wrong: ["Their names", "The date", "A peace term"], why: "They refused to write, In the Name of Allah, Ar-Rahman Ar-Rahim." }
      ]
    },
    {
      slug: "names-dearest-to-allah",
      title: "Names dearest to Allah",
      line: "The names dearest to Allah are Abdullah and Abdur-Rahman.",
      facts: ["Servant of Allah", "Servant of the Most Merciful"],
      quote: q13(30),
      source: hadith("muslim", "2132", "Ibn Umar", "Sahih", "The Prophet ﷺ said the names dearest to Allah are Abdullah and Abdur-Rahman.", "The names dearest to Allah are"),
      difficulty: 3,
      questions: [
        { q: "Which names are dearest to Allah?", a: "Abdullah and Abdur-Rahman", wrong: ["Names of kings", "Names of stars", "Any long name"], why: "The names dearest to Allah are Abdullah and Abd al-Rahman." },
        { q: "What does Abdur-Rahman mean?", a: "Servant of the Most Merciful", wrong: ["Son of the king", "Lion of the desert", "Light of the moon"], why: "Ar-Rahman is the Most Merciful, a Name the idolaters refused in 13:30." },
        { q: "Who narrated the hadith on the names dearest to Allah?", a: "Ibn Umar", wrong: ["Anas", "Abu Musa", "Jabir"], why: "Ibn Umar reported that Allah's Messenger ﷺ said the names dearest to Allah." }
      ]
    },
    {
      slug: "a-quran-to-move-mountains",
      title: "A Quran to move mountains",
      line: "If any recitation could move mountains, it would be this Quran.",
      facts: ["No one can make a surah like it", "The decision is all Allah's"],
      quote: q13(31),
      source: ik(31, "If any revealed Book could move mountains, split the earth or make the dead speak, it would be the Quran, whose eloquence no one can match. Every Prophet's miracle ended with him, but the Quran remains for all time.", "will remain as evidence for all times"),
      difficulty: 4,
      questions: [
        { q: "What would a Quran that moves mountains be, per 13:31?", a: "This very Quran", wrong: ["An old poem", "A book of magic", "A king's letter"], why: "If there were a Book with which the mountains could be moved, it would have been this Quran and none else." },
        { q: "With whom is the decision of all things, in 13:31?", a: "With Allah", wrong: ["With people", "With the stars", "With the idols"], why: "But the decision of all things is certainly with Allah." },
        { q: "What happened to other Prophets' miracles, per Ibn Kathir?", a: "They ended with them", wrong: ["They grew", "They are still seen", "They moved to Makkah"], why: "Every Prophet's miracle disappeared upon his death, but this Quran will remain as evidence for all times." },
        { q: "Ibn Kathir says the Quran grows old the more it is read.", tf: false, why: "The miracle of the Quran will never end, nor will it become old the more it is read." }
      ]
    },
    {
      slug: "the-miracle-that-remains",
      title: "The miracle that remains",
      line: "Every Prophet had miracles; the Prophet ﷺ was given revelation.",
      facts: ["He hoped for the most followers", "The Quran lasts for all time"],
      quote: q13(31),
      source: hadith("bukhari", "4981", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said every Prophet was given miracles that made people believe, but what he was given is revelation from Allah, so he hoped to have the most followers on the Day of Resurrection.", "what I have been given, is Divine Inspiration which Allah has revealed to me"),
      difficulty: 4,
      questions: [
        { q: "What was the Prophet ﷺ given, in the hadith?", a: "Revelation from Allah", wrong: ["A staff", "A she-camel", "A mountain of gold"], why: "What I have been given, is Divine Inspiration which Allah has revealed to me." },
        { q: "What did the Prophet ﷺ hope for?", a: "The most followers", wrong: ["The most wealth", "The biggest palace", "The longest life"], why: "So I hope that my followers will outnumber the followers of the other Prophets." },
        { q: "Who narrated the hadith on the miracle of revelation?", a: "Abu Hurayrah", wrong: ["Anas", "Ibn Abbas", "Abu Musa"], why: "Narrated Abu Huraira: Every Prophet was given miracles because of which people believed." }
      ]
    }
  ]
};

/** Ayahs 32 to 43: respite for deniers, name your partners, Paradise, Messengers were men, the Mother of the Book, Allah as witness. */
const RAAD_FOUR: DeepUnit = {
  key: "raad4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-13",
  name: "Ar-Ra'd, ayahs 32 to 43",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ar-Ra'd",
  lessons: [
    {
      slug: "mocked-before-you",
      title: "Mocked before you",
      line: "Messengers before were mocked too; Allah gave the mockers time.",
      facts: ["A comfort for the Prophet ﷺ", "Respite, then reckoning"],
      quote: q13(32),
      source: ik(32, "Allah comforted the Prophet ﷺ: Messengers before him were mocked too, so he has an example in them. Allah gave the deniers time, then held them to account.", "comforting him in facing his people"),
      difficulty: 3,
      questions: [
        { q: "What happened to Messengers before, in 13:32?", a: "They were mocked", wrong: ["They were made kings", "They were never sent", "They were all obeyed"], why: "And indeed (many) Messengers were mocked at before you." },
        { q: "What did Allah give the deniers first, in 13:32?", a: "Respite", wrong: ["Gold", "Kingdoms", "Miracles"], why: "But I granted respite to those who disbelieved." },
        { q: "Why does Allah mention this, per Ibn Kathir?", a: "To comfort the Prophet ﷺ", wrong: ["To scare children", "To praise the mockers", "To end the surah"], why: "Allah says to His Messenger, while comforting him in facing his people's denial of him." }
      ]
    },
    {
      slug: "respite-for-the-unjust",
      title: "Respite for the unjust",
      line: "Allah gives the unjust time, but once He seizes, never lets go.",
      facts: ["Do not be fooled by delay", "Allah is never unjust"],
      quote: q13(32),
      source: hadith("bukhari", "4686", "Abu Musa", "Sahih", "The Prophet ﷺ said Allah gives respite to the oppressor, but when He takes him, He never releases him. Then he recited 11:102.", "Allah gives respite to the oppressor, but when He takes him over, He never releases him"),
      difficulty: 4,
      questions: [
        { q: "What does Allah give the oppressor first?", a: "Respite", wrong: ["Reward", "Praise", "A palace"], why: "Allah gives respite to the oppressor." },
        { q: "What happens when Allah takes the oppressor?", a: "He never releases him", wrong: ["He lets him go", "He waits again", "He rewards him"], why: "But when He takes him over, He never releases him." },
        { q: "Who narrated the hadith on respite for the oppressor?", a: "Abu Musa", wrong: ["Anas", "Ibn Umar", "Aishah"], why: "Narrated Abu Musa: Allah gives respite to the oppressor." },
        { q: "A delay in punishment means Allah has forgotten.", tf: false, why: "Allah gives respite to the oppressor, but when He takes him over, He never releases him." }
      ]
    },
    {
      slug: "name-them",
      title: "Name them!",
      line: "Allah watches every soul; the idols they call on do not exist.",
      facts: ["He knows all they earn", "Name them, if you can"],
      quote: q13(33),
      source: ik(33, "Allah watches every soul and knows all it does. The idols can neither hear nor see nor help themselves. Allah says: Name them! If they existed, Allah would know them, for nothing escapes Him.", "nothing ever escapes His knowledge"),
      difficulty: 4,
      questions: [
        { q: "Who takes charge of every person, in 13:33?", a: "Allah", wrong: ["The idols", "The kings", "The stars"], why: "Is then He (Allah) Who takes charge of every person and knows all that he has earned?" },
        { q: "What does Allah tell them to do, in 13:33?", a: "Name them!", wrong: ["Hide them", "Paint them", "Bury them"], why: "Say: Name them!" },
        { q: "What does Ibn Kathir say the idols cannot do?", a: "Hear, see or help themselves", wrong: ["Stand still", "Be carved", "Be carried"], why: "Idols which can neither hear nor see nor... bring good to themselves." },
        { q: "Ibn Kathir says something can exist on earth that Allah does not know.", tf: false, why: "Had that thing existed in or on the earth, Allah would have known about it because nothing ever escapes His knowledge." }
      ]
    },
    {
      slug: "rivers-and-lasting-shade",
      title: "Rivers and lasting shade",
      line: "Paradise has rivers below; its food and its shade last forever.",
      facts: ["Fruit that never runs out", "Paradise and Fire told together"],
      quote: q13(35),
      source: ik(34, "Paradise promised to those with Taqwa has rivers flowing beneath it, food and fruit that never end, and shade that lasts. Allah often mentions Paradise and the Fire together to make Paradise loved.", "for Paradise has foods, fruits and drinks that never end or finish"),
      difficulty: 3,
      questions: [
        { q: "What flows beneath Paradise, in 13:35?", a: "Rivers", wrong: ["Fire", "Sand", "Ice"], why: "Underneath it rivers flow." },
        { q: "What is eternal in Paradise, in 13:35?", a: "Its provision and its shade", wrong: ["Its walls only", "Its gates only", "Nothing"], why: "Its provision is eternal and so is its shade." },
        { q: "Who is Paradise promised to, in 13:35?", a: "Those who have Taqwa", wrong: ["The rich", "The strong", "Everyone who asks"], why: "The description of the Paradise which those who have Taqwa have been promised." },
        { q: "Why mention Paradise and the Fire together, per Ibn Kathir?", a: "To make Paradise loved and warn of the Fire", wrong: ["By chance", "To fill pages", "To confuse"], why: "To make Paradise appealing and warn against the Fire." }
      ]
    },
    {
      slug: "those-given-the-book-rejoice",
      title: "Those given the Book rejoice",
      line: "Truthful people of the Book rejoiced at the Quran's revelation.",
      facts: ["Their Books foretold it", "Worship Allah, no partners"],
      quote: q13(36),
      source: ik(36, "Those of the People of the Book who held to it rejoiced at the Quran, because their Books told of it. The Prophet ﷺ was told to say: I am commanded to worship Allah alone, I call to Him and to Him is my return.", "they have evidence in their Books affirming the truth of the"),
      difficulty: 4,
      questions: [
        { q: "Who rejoiced at the revelation, in 13:36?", a: "Those given the Book", wrong: ["The idol makers", "The mockers", "No one"], why: "Those to whom We have given the Book, rejoice at what has been revealed unto you." },
        { q: "Why did they rejoice, per Ibn Kathir?", a: "Their Books told of the Quran", wrong: ["They found gold", "They won a war", "They were bored"], why: "They have evidence in their Books affirming the truth of the Quran." },
        { q: "What was the Prophet ﷺ commanded, in 13:36?", a: "To worship Allah alone", wrong: ["To gather wealth", "To build idols", "To stay silent"], why: "I am commanded only to worship Allah and not to join partners with Him." }
      ]
    },
    {
      slug: "a-judgement-in-arabic",
      title: "A judgement in Arabic",
      line: "The Quran came in clear Arabic; never trade it for desires.",
      facts: ["An honor for the Prophet ﷺ", "A warning to people of knowledge"],
      quote: q13(37),
      source: ik(36, "Allah sent down the Quran as a clear judgement in Arabic, an honor to the Prophet ﷺ. Following people's desires after the knowledge came leaves one with no protector. This warns people of knowledge not to leave the Sunnah.", "This part of the Ayah warns people of knowledge against following the paths of misguid"),
      difficulty: 4,
      questions: [
        { q: "In which language was the Quran sent as a judgement, in 13:37?", a: "Arabic", wrong: ["Greek", "Persian", "Latin"], why: "And thus have We sent it (the Quran) down to be a judgement of authority in Arabic." },
        { q: "What happens if one follows desires after knowledge, in 13:37?", a: "No protector against Allah", wrong: ["More reward", "Nothing at all", "More friends"], why: "Then you will not have any Wali (protector) or defender against Allah." },
        { q: "Whom does 13:37 warn, per Ibn Kathir?", a: "People of knowledge", wrong: ["Only children", "Only traders", "Only travelers"], why: "This part of the Ayah warns people of knowledge against following the paths of misguidance." }
      ]
    },
    {
      slug: "messengers-had-families",
      title: "Messengers had families",
      line: "Messengers were human: they had wives and children.",
      facts: ["They ate food and walked markets", "Miracles only by Allah's leave"],
      quote: q13(38),
      source: ik(38, "The Messengers before the Prophet ﷺ were human beings who ate food, walked in markets, and had wives and children. No Prophet could bring a miracle except by Allah's leave.", "no Prophet could have brought a miracle to his people except by"),
      difficulty: 3,
      questions: [
        { q: "What did Allah give the Messengers, in 13:38?", a: "Wives and offspring", wrong: ["Thrones", "Wings", "Endless life"], why: "And indeed We sent Messengers before you, and made for them wives and offspring." },
        { q: "How can a Messenger bring a sign, in 13:38?", a: "Only by Allah's leave", wrong: ["Whenever he likes", "With magic", "By paying"], why: "And it was not for a Messenger to bring a sign except by Allah's leave." },
        { q: "What does every matter have, in 13:38?", a: "A decree", wrong: ["A price", "A doubt", "An end without plan"], why: "(For) every matter there is a decree (from Allah)." }
      ]
    },
    {
      slug: "my-sunnah",
      title: "This is my Sunnah",
      line: "The Prophet ﷺ fasted and ate, prayed and slept, and married.",
      facts: ["Balance, not extremes", "Turning from his Sunnah is wrong"],
      quote: q13(38),
      source: hadith("bukhari", "5063", "Anas ibn Malik", "Sahih", "Three men wanted to pray all night, fast every day and never marry. The Prophet ﷺ said he fasts and breaks his fast, prays and sleeps, and marries, and whoever turns from his Sunnah is not from him.", "I fast and break my fast"),
      difficulty: 4,
      questions: [
        { q: "What did one of the three men want?", a: "To pray all night forever", wrong: ["To travel", "To trade", "To build"], why: "One of them said, I will offer the prayer throughout the night forever." },
        { q: "What did the Prophet ﷺ say he does with fasting?", a: "He fasts and breaks his fast", wrong: ["He fasts every day", "He never fasts", "He fasts only in winter"], why: "I fast and break my fast." },
        { q: "Who narrated the hadith of the three men?", a: "Anas ibn Malik", wrong: ["Abu Musa", "Ibn Umar", "Abu Hurayrah"], why: "Narrated Anas bin Malik: A group of three men came to the houses of the wives of the Prophet ﷺ." },
        { q: "The Sunnah is to never sleep and pray all night.", tf: false, why: "I pray and sleep too... so he who does not follow my tradition in religion, is not from me." }
      ]
    },
    {
      slug: "the-mother-of-the-book",
      title: "The Mother of the Book",
      line: "Allah erases or keeps what He wills; the Mother Book is His.",
      facts: ["Every term has a record", "Good deeds and du'a help"],
      quote: q13(39),
      source: ik(38, "Everything has a set measure with Allah and a record. He blots out and confirms what He wills, and with Him is the Mother of the Book. Keeping family ties, a sahih hadith says, lengthens life.", "maintaining the ties of the womb increases the life span"),
      difficulty: 5,
      questions: [
        { q: "What does Allah do, in 13:39?", a: "Blots out and confirms what He wills", wrong: ["Forgets His Book", "Asks others", "Changes nothing ever"], why: "Allah blots out what He wills and confirms (what He wills)." },
        { q: "What is with Allah, in 13:39?", a: "The Mother of the Book", wrong: ["A list of kings", "A map of stars", "Nothing"], why: "And with Him is the Mother of the Book." },
        { q: "What increases the life span, per a sahih hadith Ibn Kathir notes?", a: "Keeping family ties", wrong: ["Sleeping more", "Eating more", "Travelling"], why: "There is also a Hadith recorded in the Sahih that affirms that maintaining the ties of the womb increases the life span." }
      ]
    },
    {
      slug: "only-to-convey",
      title: "Only to convey",
      line: "The Prophet's ﷺ duty is to convey; the reckoning is Allah's.",
      facts: ["He may see some of it, or not", "Land after land opened"],
      quote: q13(40),
      source: ik(40, "Whether the Prophet ﷺ saw some of what was promised or passed away before, his duty was only to convey the message, and the reckoning is Allah's. Ibn Abbas said Allah was granting him land after land.", "We are granting land after land to Muhammad"),
      difficulty: 4,
      questions: [
        { q: "What is the Prophet's ﷺ duty, in 13:40?", a: "Only to convey the message", wrong: ["To force belief", "To judge hearts", "To punish"], why: "Your duty is only to convey (the Message) and on Us is the reckoning." },
        { q: "On whom is the reckoning, in 13:40?", a: "On Allah", wrong: ["On the Prophet ﷺ", "On the angels", "On the tribe"], why: "And on Us is the reckoning." },
        { q: "What did Ibn Abbas say 13:41 means?", a: "Land after land for the Prophet ﷺ", wrong: ["Earthquakes", "Rising seas", "Falling stars"], why: "See they not that We are granting land after land to Muhammad ﷺ?" },
        { q: "Can anyone put back Allah's judgement, in 13:41?", a: "No one", wrong: ["The kings", "The idols", "Many people"], why: "And Allah judges, there is none to put back His judgement." }
      ]
    },
    {
      slug: "all-planning-is-allahs",
      title: "All planning is Allah's",
      line: "People before plotted, but all planning belongs to Allah.",
      facts: ["He knows what every soul earns", "The good end is for the godfearing"],
      quote: q13(42),
      source: ik(42, "Nations before plotted to drive out their Messengers, but Allah's plan won and the good end went to those who fear Him. He knows every secret and will judge each person by their deeds.", "the followers of the Messengers will earn the good end in this life and the Hereafter"),
      difficulty: 4,
      questions: [
        { q: "Whose is all planning, in 13:42?", a: "Allah's", wrong: ["The plotters'", "The kings'", "No one's"], why: "But all planning is Allah's." },
        { q: "What does Allah know, in 13:42?", a: "What every person earns", wrong: ["Only big deeds", "Only spoken words", "Only the past"], why: "He knows what every person earns." },
        { q: "Who gets the good end, per Ibn Kathir?", a: "The followers of the Messengers", wrong: ["The plotters", "The mockers", "No one"], why: "The followers of the Messengers will earn the good end in this life and the Hereafter." }
      ]
    },
    {
      slug: "allah-is-enough-as-witness",
      title: "Allah is enough as witness",
      line: "They said he was no Messenger; Allah is enough as witness.",
      facts: ["Scholars of the Book knew him", "The surah ends here"],
      quote: q13(43),
      source: ik(43, "When the disbelievers said he was not a Messenger, the Prophet ﷺ was told to say Allah is enough as witness. Those with knowledge of the Scripture found his description in their Books.", "in their Books and the good news of his advent"),
      difficulty: 4,
      questions: [
        { q: "What did the disbelievers say, in 13:43?", a: "You are not a Messenger", wrong: ["You are a king", "You are an angel", "You are our leader"], why: "And those who disbelieved, say: You are not a Messenger." },
        { q: "Who is sufficient as a witness, in 13:43?", a: "Allah", wrong: ["The crowd", "The kings", "The poets"], why: "Say: Sufficient as a witness between me and you is Allah." },
        { q: "What did scholars of the Scripture find, per Ibn Kathir?", a: "His description in their Books", wrong: ["Gold in the sand", "A lost city", "Nothing"], why: "The scholars of the People of the Scriptures who find the description of Muhammad ﷺ in their Books." }
      ]
    }
  ]
};

export const RAAD_UNITS: readonly DeepUnit[] = [RAAD_ONE, RAAD_TWO, RAAD_THREE, RAAD_FOUR];
