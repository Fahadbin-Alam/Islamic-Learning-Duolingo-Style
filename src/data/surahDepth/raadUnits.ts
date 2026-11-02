import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

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

export const RAAD_UNITS: readonly DeepUnit[] = [RAAD_ONE, RAAD_TWO];
