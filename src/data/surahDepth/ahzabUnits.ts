import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Al-Ahzab ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Ahzab 33:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_33_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Ahzab 33:${ayah}`,
    url: `https://quran.com/33:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 33:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q33 = (ayah: number) => quranQuote(33, ayah);

/** Ayahs 1 to 27: obey Allah alone, adopted sons, the Prophet ﷺ and his wives, and the Battle of the Trench. */
const AHZAB_ONE: DeepUnit = {
  key: "ahzab1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-33",
  name: "Al-Ahzab, ayahs 1 to 27",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Ahzab",
  lessons: [
    {
      slug: "taqwa-first",
      title: "Taqwa first",
      line: "Allah tells the Prophet ﷺ to have Taqwa of Him.",
      facts: ["Do not obey disbelievers or hypocrites", "The command is for us too"],
      quote: q33(1),
      source: ik(1, "When Allah commands His Messenger ﷺ with Taqwa, He is also commanding everyone below him, even more so.", "He is also commanding those who are lower than him"),
      difficulty: 2,
      questions: [
        { q: "What is the Prophet ﷺ told to have, in 33:1?", a: "Taqwa of Allah", wrong: ["Fear of people", "Great wealth", "A big army"], why: "O Prophet! Have Taqwa of Allah." },
        { q: "Whom should he not obey, in 33:1?", a: "Disbelievers and hypocrites", wrong: ["His parents", "His Companions", "The poor"], why: "And obey not the disbelievers and the hypocrites." },
        { tf: true, q: "Ibn Kathir says the command is for believers too.", why: "He is also commanding those who are lower than him, and the command is addressed to them more so." }
      ]
    },
    {
      slug: "follow-the-revelation",
      title: "Follow the revelation",
      line: "Follow what your Lord reveals, the Quran and the Sunnah.",
      facts: ["Allah knows what you do", "Nothing is hidden from Him"],
      quote: q33(2),
      source: ik(2, "Follow what is revealed, meaning the Quran and the Sunnah. Nothing at all is hidden from Allah.", "nothing at all is hidden from Him"),
      difficulty: 2,
      questions: [
        { q: "What should he follow, in 33:2?", a: "What his Lord reveals", wrong: ["Old customs", "The crowd", "His wishes"], why: "And follow that which is revealed to you from your Lord." },
        { q: "What is revealed, per Ibn Kathir?", a: "The Quran and Sunnah", wrong: ["Poems", "Old tales", "Dreams only"], why: "Meaning, of the Qur'an and Sunnah." },
        { q: "What is hidden from Allah, per Ibn Kathir?", a: "Nothing at all", wrong: ["Our secrets", "The night", "Deep seas"], why: "Nothing at all is hidden from Him." }
      ]
    },
    {
      slug: "allah-is-enough",
      title: "Allah is enough",
      line: "Put your trust in Allah; He is enough as a Trustee.",
      facts: ["Trust Him in every affair", "He suffices whoever turns to Him"],
      quote: q33(3),
      source: ik(3, "Put your trust in Allah in all your affairs. He is enough for the one who trusts Him and turns to Him.", "sufficient is He as a Trustee for the one who puts his trust in Him"),
      difficulty: 2,
      questions: [
        { q: "In whom should we trust, in 33:3?", a: "Allah", wrong: ["Our wealth", "Our tribe", "Our strength"], why: "And put your trust in Allah." },
        { q: "What is Allah enough as, in 33:3?", a: "A Trustee", wrong: ["A judge only", "A guest", "A stranger"], why: "And sufficient is Allah as a Trustee." },
        { q: "In which affairs should we trust Him, per Ibn Kathir?", a: "In all affairs", wrong: ["Only in war", "Only in trade", "Only when sick"], why: "Put your trust in Allah, i.e., in all your affairs and situations." }
      ]
    },
    {
      slug: "not-two-hearts",
      title: "Not two hearts",
      line: "Allah did not give any man two hearts in his body.",
      facts: ["An adopted son is not a real son", "Words do not change lineage"],
      quote: q33(4),
      source: ik(4, "One man cannot have two hearts, and an adopted child does not become the son of the man who adopts him.", "a child cannot have two fathers just as a man cannot have two hearts in one body"),
      difficulty: 3,
      questions: [
        { q: "How many hearts did Allah give a man, in 33:4?", a: "One", wrong: ["Two", "Three", "None"], why: "Allah has not made for any man two hearts inside his body." },
        { q: "What is an adopted son, in 33:4?", a: "Not a real son", wrong: ["A real son", "An heir by law", "A brother by blood"], why: "Nor has He made your adopted sons your real sons." },
        { q: "How many fathers can a child have, per Ibn Kathir?", a: "One", wrong: ["Two", "Three", "As many as want"], why: "A child cannot have two fathers just as a man cannot have two hearts in one body." }
      ]
    },
    {
      slug: "call-them-by-their-fathers",
      title: "Call them by their fathers",
      line: "Call adopted children by their real fathers' names.",
      facts: ["Zayd was once called Zayd bin Muhammad", "Honest mistakes are forgiven"],
      quote: q33(5),
      source: hadith("bukhari", "4782", "Abdullah ibn Umar", "Sahih", "Zayd bin Harithah was called Zayd bin Muhammad until Allah revealed: Call them by their fathers.", "except Zaid bin Muhammad till the"),
      difficulty: 3,
      questions: [
        { q: "What were they told to call adopted sons, in 33:5?", a: "By their fathers", wrong: ["By their tribe", "By any name", "By their town"], why: "Call them by their fathers, that is more just with Allah." },
        { q: "What was Zayd called before, in the hadith?", a: "Zayd bin Muhammad", wrong: ["Zayd bin Thabit", "Zayd bin Amr", "Zayd the Elder"], why: "We used not to call Zaid bin Haritha... except Zaid bin Muhammad." },
        { q: "What if the father is unknown, in 33:5?", a: "Brothers in faith", wrong: ["Strangers", "Servants forever", "Nameless ones"], why: "But if you know not their father's, your brothers in faith." },
        { tf: false, q: "A mistake made by accident counts as a sin.", why: "And there is no sin on you concerning that in which you made a mistake." }
      ]
    },
    {
      slug: "closer-than-ourselves",
      title: "Closer than ourselves",
      line: "The Prophet ﷺ is closer to believers than their own selves.",
      facts: ["His wives are the Mothers of the Believers", "He paid the debts of the poor"],
      quote: q33(6),
      source: hadith("bukhari", "4781", "Abu Hurairah", "Sahih", "The Prophet ﷺ said he is closest to every believer, and he would care for the debts and children of a believer who died poor.", "I am the closest to him both in this world and in the Hereafter"),
      difficulty: 3,
      questions: [
        { q: "Who are his wives to believers, in 33:6?", a: "Their mothers", wrong: ["Their sisters", "Strangers", "Their aunts"], why: "And his wives are their mothers." },
        { q: "What would he do with a poor believer's debt, in the hadith?", a: "Take care of it", wrong: ["Ignore it", "Double it", "Sell the house"], why: "If he is in debt or he leaves poor children, let those come to me." },
        { q: "Who inherits a believer's wealth, in the hadith?", a: "His relatives", wrong: ["His neighbours", "The army", "His friends"], why: "If a believer leaves some property then his relatives will inherit that property." }
      ]
    },
    {
      slug: "the-strong-covenant",
      title: "The strong covenant",
      line: "Allah took a strong covenant from all the Prophets.",
      facts: ["Five are named in the ayah", "Our Prophet ﷺ is named first"],
      quote: q33(7),
      source: ik(7, "The ayah names the last Prophet ﷺ first as a token of respect, then the others in order: Nuh, Ibrahim, Musa and Isa.", "This Ayah begins with the last Prophet, as a token of respect"),
      difficulty: 3,
      questions: [
        { q: "What did Allah take from the Prophets, in 33:7?", a: "A strong covenant", wrong: ["Their wealth", "Their homes", "A tax"], why: "We took from them a strong covenant." },
        { q: "Which Prophet is named first, per Ibn Kathir?", a: "The last Prophet ﷺ", wrong: ["Adam", "Nuh", "Isa"], why: "This Ayah begins with the last Prophet, as a token of respect." },
        { q: "Which Prophet is NOT named in 33:7?", a: "Yusuf", wrong: ["Nuh", "Ibrahim", "Musa"], why: "And from Nuh, Ibrahim, Musa, and Isa son of Maryam." }
      ]
    },
    {
      slug: "asking-the-truthful",
      title: "Asking the truthful",
      line: "Allah will ask the truthful about their truth.",
      facts: ["The Messengers conveyed the Message", "Deniers face a painful punishment"],
      quote: q33(8),
      source: ik(8, "We bear witness that the Messengers conveyed the Message of their Lord and gave sincere advice to their nations.", "the Messengers did indeed convey the Message of their Lord"),
      difficulty: 3,
      questions: [
        { q: "Whom will Allah ask, in 33:8?", a: "The truthful", wrong: ["The angels", "The trees", "The mountains"], why: "That He may ask the truthful about their truth." },
        { q: "What did the Messengers do, per Ibn Kathir?", a: "Conveyed the Message", wrong: ["Hid it", "Changed it", "Sold it"], why: "The Messengers did indeed convey the Message of their Lord." },
        { tf: true, q: "Ibn Kathir says the Messengers advised their nations.", why: "And advised their nations, and that they clearly showed them the truth." }
      ]
    },
    {
      slug: "the-wind-and-unseen-forces",
      title: "The wind and unseen forces",
      line: "At the Trench, Allah sent a wind and unseen forces.",
      facts: ["The forces were angels", "The east wind brought victory"],
      quote: q33(9),
      source: hadith("bukhari", "1035", "Ibn Abbas", "Sahih", "The Prophet ﷺ said he was given victory by the east wind, As-Saba, and the people of Ad were destroyed by the west wind.", "I was granted victory with As-Saba"),
      difficulty: 3,
      questions: [
        { q: "What did Allah send against the armies, in 33:9?", a: "A wind and unseen forces", wrong: ["A flood", "An earthquake", "A plague"], why: "We sent against them a wind and forces that you saw not." },
        { q: "Which wind brought victory, in the hadith?", a: "As-Saba, the east wind", wrong: ["The west wind", "A south storm", "A sandstorm"], why: "I was granted victory with As-Saba." },
        { q: "Who were the unseen forces, per Ibn Kathir?", a: "The angels", wrong: ["Birds", "Jinn", "Other tribes"], why: "This refers to the angels who shook them and cast fear and terror into their hearts." }
      ]
    },
    {
      slug: "hearts-reached-the-throats",
      title: "Hearts reached the throats",
      line: "Armies came from above and below; hearts reached the throats.",
      facts: ["The Muslims dug a trench", "Salman gave the idea"],
      quote: q33(10),
      source: ik(10, "About ten thousand came against Al-Madinah, so the Muslims dug a trench on the advice of Salman Al-Farisi.", "This was on the advice of Salman Al-Farisi"),
      difficulty: 4,
      questions: [
        { q: "What reached the throats, in 33:10?", a: "The hearts", wrong: ["The water", "The dust", "The arrows"], why: "And the hearts reached to the throats." },
        { q: "Whose advice was the trench, per Ibn Kathir?", a: "Salman Al-Farisi", wrong: ["Abu Sufyan", "Bilal", "Khalid"], why: "This was on the advice of Salman Al-Farisi." },
        { q: "About how many came against them, per Ibn Kathir?", a: "Nearly ten thousand", wrong: ["One hundred", "Five hundred", "One million"], why: "In all they numbered nearly ten thousand." },
        { q: "What did the believers ask to say, per Ibn Kathir?", a: "Cover our weak points", wrong: ["We give up", "Let us run", "Call the Romans"], why: "Say: O Allah, cover our weak points and calm our fears." }
      ]
    },
    {
      slug: "a-mighty-shaking",
      title: "A mighty shaking",
      line: "There the believers were tested and shaken hard.",
      facts: ["The siege lasted almost a month", "Hypocrisy came out into the open"],
      quote: q33(11),
      source: ik(11, "The believers were besieged and tested. At that time hypocrisy came out, and the sick hearts spoke what they felt.", "At this time hypocrisy emerged"),
      difficulty: 3,
      questions: [
        { q: "What happened to the believers, in 33:11?", a: "They were tested and shaken", wrong: ["They feasted", "They slept", "They traded"], why: "There, the believers were tried and shaken with a mighty shaking." },
        { q: "What came out at that time, per Ibn Kathir?", a: "Hypocrisy", wrong: ["Rain", "Gold", "A new tribe"], why: "At this time hypocrisy emerged." },
        { q: "How long was the siege, per Ibn Kathir?", a: "Almost a month", wrong: ["One day", "Ten years", "One week"], why: "They besieged the Prophet ﷺ and his Companions for almost a month." }
      ]
    },
    {
      slug: "nothing-but-delusion",
      title: "Nothing but delusion",
      line: "Hypocrites said Allah's promise was nothing but a delusion.",
      facts: ["Weak faith spoke out", "Believers stayed sure of the promise"],
      quote: q33(12),
      source: ik(12, "When things got hard, the hypocrites showed what was in their hearts and called Allah's promise a delusion.", "Their hypocrisy became apparent"),
      difficulty: 3,
      questions: [
        { q: "What did the hypocrites call the promise, in 33:12?", a: "Nothing but delusion", wrong: ["A true word", "A gift", "A reward"], why: "Allah and His Messenger promised us nothing but delusion!" },
        { q: "What became apparent, per Ibn Kathir?", a: "Their hypocrisy", wrong: ["Their courage", "Their wealth", "Their kindness"], why: "Their hypocrisy became apparent." },
        { tf: false, q: "The believers called the promise a delusion too.", why: "The believers were certain that what Allah and His Messenger promised was true." }
      ]
    },
    {
      slug: "our-homes-lie-open",
      title: "Our homes lie open",
      line: "Some asked to leave, saying their homes were unguarded.",
      facts: ["Yathrib is the old name of Al-Madinah", "They only wanted to run"],
      quote: q33(13),
      source: ik(13, "They used the excuse that their homes lay open, but Allah said this was untrue; they only wanted to flee.", "they wanted to run away from the battlefield"),
      difficulty: 3,
      questions: [
        { q: "What city is Yathrib, per Ibn Kathir?", a: "Al-Madinah", wrong: ["Makkah", "Taif", "Jerusalem"], why: "O people of Yathrib...) meaning Al-Madinah." },
        { q: "What excuse did they give, in 33:13?", a: "Our homes lie open", wrong: ["We are sick", "We are hungry", "It is raining"], why: "Truly, our homes lie open." },
        { q: "What did they really want, in 33:13?", a: "To flee", wrong: ["To help", "To pray", "To dig"], why: "They but wished to flee." }
      ]
    },
    {
      slug: "faith-that-gives-way",
      title: "Faith that gives way",
      line: "Under pressure, hypocrites would quickly drop their faith.",
      facts: ["They would not stay firm", "The slightest fear would break them"],
      quote: q33(14),
      source: ik(14, "If the enemy had entered from every side and asked them to leave Islam, they would have done it at once.", "they would have promptly done so"),
      difficulty: 4,
      questions: [
        { q: "What would they do if pressed, per Ibn Kathir?", a: "Leave their faith at once", wrong: ["Stand firm", "Fight bravely", "Pray more"], why: "Then demanded that they become disbelievers, they would have promptly done so." },
        { q: "How long would they hesitate, in 33:14?", a: "But a little", wrong: ["Many years", "A whole month", "Forever"], why: "And would have hesitated thereupon but little." },
        { tf: true, q: "Ibn Kathir calls the ayah a clear condemnation of them.", why: "This is a condemnation of them in the clearest terms." }
      ]
    },
    {
      slug: "a-promise-to-allah",
      title: "A promise to Allah",
      line: "They had promised Allah not to turn their backs.",
      facts: ["A covenant with Allah is asked about", "Keep your promises"],
      quote: q33(15),
      source: ik(15, "Allah will surely ask them about the promise they made Him before the fear came.", "Allah will inevitably ask them about that covenant"),
      difficulty: 3,
      questions: [
        { q: "What had they promised, in 33:15?", a: "Not to turn their backs", wrong: ["To build a wall", "To pay a tax", "To leave town"], why: "They had already made a covenant with Allah not to turn their backs." },
        { q: "What will Allah do with the covenant, per Ibn Kathir?", a: "Ask them about it", wrong: ["Forget it", "Cancel it", "Hide it"], why: "Allah will inevitably ask them about that covenant." },
        { q: "Which word means covenant?", a: "A firm promise", wrong: ["A song", "A gift", "A journey"], why: "And a covenant with Allah must be answered for." }
      ]
    },
    {
      slug: "running-does-not-help",
      title: "Running does not help",
      line: "Fleeing will not add a single day to your life.",
      facts: ["Life in this world is short", "The Hereafter is better"],
      quote: q33(16),
      source: ik(16, "Fleeing from battle will not delay anyone's appointed time or make life any longer.", "will not delay their appointed demise"),
      difficulty: 4,
      questions: [
        { q: "Will fleeing help, in 33:16?", a: "No", wrong: ["Yes, always", "Sometimes", "Only at night"], why: "Flight will not avail you." },
        { q: "What does fleeing not do, per Ibn Kathir?", a: "Delay one's appointed time", wrong: ["Make you tired", "Lose your way", "Cost money"], why: "Fleeing from battle will not delay their appointed demise." },
        { q: "How long would they enjoy life, in 33:16?", a: "Only a little while", wrong: ["Forever", "A thousand years", "Twice as long"], why: "And then you will enjoy no more than a little while!" }
      ]
    },
    {
      slug: "no-protector-but-allah",
      title: "No protector but Allah",
      line: "No one can protect you from Allah's decree or His mercy.",
      facts: ["Only Allah answers our cries", "No helper besides Him"],
      quote: q33(17),
      source: ik(17, "They have no one but Allah to answer their cries.", "they have no one else except Allah to respond to their cries"),
      difficulty: 3,
      questions: [
        { q: "Who can protect you from Allah, in 33:17?", a: "No one", wrong: ["A king", "An army", "A fort"], why: "Who is he who can protect you from Allah if He intends to harm you, or intends mercy on you?" },
        { q: "Who answers their cries, per Ibn Kathir?", a: "Only Allah", wrong: ["Their tribe", "Their idols", "Their kings"], why: "They have no one else except Allah to respond to their cries." },
        { tf: true, q: "No one can stop the mercy Allah intends.", why: "Or intends mercy on you? And they will not find, besides Allah, any protector." }
      ]
    },
    {
      slug: "come-towards-us",
      title: "Come towards us",
      line: "Allah knows who held others back from helping.",
      facts: ["They called friends to the shade", "They came out very little"],
      quote: q33(18),
      source: ik(18, "The hypocrites told their friends to come and sit with them in the shade and enjoy fruit instead of helping.", "come to where we are in the shade and enjoying fruits"),
      difficulty: 3,
      questions: [
        { q: "What did they tell their brothers, in 33:18?", a: "Come towards us", wrong: ["Go and help", "Dig the trench", "Stand guard"], why: "Those who say to their brethren: come towards us." },
        { q: "To what did they invite them, per Ibn Kathir?", a: "To the shade and fruits", wrong: ["To the trench", "To the mosque", "To the market"], why: "Come to... the shade and enjoying fruits." },
        { q: "Who knows those who held back, in 33:18?", a: "Allah", wrong: ["No one", "Only their wives", "The enemy"], why: "Allah already knows those among you who keep back." }
      ]
    },
    {
      slug: "sharp-tongues-after-fear",
      title: "Sharp tongues after fear",
      line: "Scared in danger, boastful after it passes.",
      facts: ["Their eyes rolled in fear", "Later they claimed to be brave"],
      quote: q33(19),
      source: ik(19, "When safety returned, they spoke boldly and claimed to be the bravest of men, but they were lying.", "claiming that they were the bravest and most chivalrous of men"),
      difficulty: 4,
      questions: [
        { q: "What did they do when fear left, in 33:19?", a: "Spoke with sharp tongues", wrong: ["Stayed silent", "Said sorry", "Went to sleep"], why: "But when the fear departs, they will smite you with sharp tongues." },
        { q: "What did they claim, per Ibn Kathir?", a: "To be the bravest", wrong: ["To be poor", "To be sick", "To be lost"], why: "Claiming that they were the bravest and most chivalrous of men, but they are lying." },
        { q: "What does Allah do to their deeds, in 33:19?", a: "Makes them fruitless", wrong: ["Doubles them", "Hides them", "Rewards them"], why: "Therefore, Allah makes their deeds fruitless." }
      ]
    },
    {
      slug: "wishing-for-the-desert",
      title: "Wishing for the desert",
      line: "They wished to be far away in the desert asking for news.",
      facts: ["They thought the armies would return", "They would hardly fight"],
      quote: q33(20),
      source: ik(20, "If the armies came back, the hypocrites hoped to be away in the desert, only asking what happened.", "they hope that they will not be present with you in Al-Madinah"),
      difficulty: 4,
      questions: [
        { q: "What did they think, in 33:20?", a: "The armies had not left", wrong: ["The war was won", "The trench was full", "Rain would come"], why: "They think that the Confederates have not yet withdrawn." },
        { q: "Where did they wish to be, in 33:20?", a: "In the desert", wrong: ["In the front line", "In Makkah", "On a ship"], why: "They would wish they were in the deserts among the bedouins." },
        { q: "Why would they hardly fight, per Ibn Kathir?", a: "They had little faith", wrong: ["They were sick", "They had no swords", "They were far"], why: "Because they are so cowardly and weak, and have so little faith." }
      ]
    },
    {
      slug: "the-best-example",
      title: "The best example",
      line: "In the Messenger ﷺ of Allah you have the best example.",
      facts: ["He dug the trench with them", "Follow him in word and deed"],
      quote: q33(21),
      source: hadith("bukhari", "4101", "Jabir ibn Abdullah", "Sahih", "At the trench, the Prophet ﷺ came down to break a hard rock, with a stone tied to his belly from hunger.", "a stone was tied to his belly for we had not eaten anything for three days"),
      difficulty: 3,
      questions: [
        { q: "Whom should we take as our example, in 33:21?", a: "The Messenger ﷺ of Allah", wrong: ["A king", "A poet", "The richest man"], why: "Indeed in the Messenger of Allah you have a good example to follow." },
        { q: "How hungry were they, in the hadith?", a: "No food for three days", wrong: ["They had a feast", "One missed meal", "They had dates"], why: "We had not eaten anything for three days." },
        { q: "What did the Prophet ﷺ do to the rock, in the hadith?", a: "Struck it into sand", wrong: ["Walked away", "Asked others", "Left it there"], why: "The Prophet ﷺ took the spade and struck the big solid rock and it became like sand." },
        { tf: true, q: "Ibn Kathir calls the ayah an important principle.", why: "This Ayah is an important principle, to follow the Messenger of Allah in all his words, and deeds." }
      ]
    },
    {
      slug: "good-and-bad-examples",
      title: "Good and bad examples",
      line: "Following him ﷺ is the good example; going against him is bad.",
      facts: ["As-Sa'di explains", "Uswah Hasanah"],
      quote: q33(21),
      source: saadi(33, 21, "As-Sa'di says there are two kinds of example: the good one is following the Messenger ﷺ, the road to Allah's honor, and the bad one is following others against him, like the deniers who followed their fathers.", "فالأسوة نوعان: أسوة حسنة، وأسوة سيئة"),
      difficulty: 2,
      questions: [
        { q: "What are the two kinds of example, per as-Sa'di on 33:21?", a: "Good and bad", wrong: ["Old and new", "Near and far", "Big and small"], why: "An example can be good or bad, says as-Sa'di." },
        { q: "Who follows the good example, per as-Sa'di?", a: "Those who hope for Allah and the Last Day", wrong: ["Only the rich", "Only the strong", "Only scholars"], why: "Faith and hope in Allah push a person to follow him ﷺ." },
        { tf: true, q: "The Prophet ﷺ himself was present at the hardest moments of battle.", why: "As-Sa'di on 33:21." }
      ]
    },
    {
      slug: "what-allah-promised-us",
      title: "What Allah promised us",
      line: "Believers saw the armies and said: Allah spoke the truth.",
      facts: ["The trial only raised their faith", "Faith can rise and fall"],
      quote: q33(22),
      source: ik(22, "The trial only added to their faith. Faith can increase and decrease, as most scholars said.", "faith can increase and decrease"),
      difficulty: 3,
      questions: [
        { q: "What did believers say on seeing the armies, in 33:22?", a: "This is what Allah promised", wrong: ["We are lost", "Let us run", "We give up"], why: "This is what Allah and His Messenger had promised us." },
        { q: "What did the trial add to, in 33:22?", a: "Their faith", wrong: ["Their fear", "Their doubt", "Their wealth"], why: "And it only added to their faith and to their submissiveness." },
        { tf: true, q: "Ibn Kathir says faith can increase and decrease.", why: "Faith can increase and decrease." }
      ]
    },
    {
      slug: "true-to-their-promise",
      title: "True to their promise",
      line: "Some believers kept their promise to Allah and never changed.",
      facts: ["Some fulfilled it, some still wait", "Revealed about Anas bin An-Nadr"],
      quote: q33(23),
      source: hadith("bukhari", "4783", "Anas ibn Malik", "Sahih", "The Companions thought this ayah was revealed about Anas bin An-Nadr, who stayed true to his promise.", "was revealed in favor of Anas bin An-Nadr"),
      difficulty: 4,
      questions: [
        { q: "What were these men true to, in 33:23?", a: "Their covenant with Allah", wrong: ["Their tribe", "Their trade", "Their wishes"], why: "Men who have been true to their covenant with Allah." },
        { q: "About whom was it revealed, in the hadith?", a: "Anas bin An-Nadr", wrong: ["Abu Sufyan", "Zayd bin Thabit", "Salman"], why: "Was revealed in favor of Anas bin An-Nadr." },
        { q: "Did they change their promise, in 33:23?", a: "Never in the least", wrong: ["Yes, quickly", "Once or twice", "In fear"], why: "But they have never changed in the least." }
      ]
    },
    {
      slug: "reward-for-truth",
      title: "Reward for truth",
      line: "Allah rewards the truthful and may forgive the hypocrites.",
      facts: ["His mercy beats His anger", "Trials separate the good"],
      quote: q33(24),
      source: ik(24, "Allah tests His servants to show the good from the bad. His mercy over His creation is greater than His anger.", "His mercy and kindness towards His creation prevail over His wrath"),
      difficulty: 4,
      questions: [
        { q: "What do the truthful get, in 33:24?", a: "Reward for their truth", wrong: ["Nothing", "Blame", "Only praise"], why: "That Allah may reward the men of truth for their truth." },
        { q: "What may Allah do for hypocrites, in 33:24?", a: "Accept their repentance", wrong: ["Reward them", "Make them leaders", "Forget them"], why: "Or accept their repentance by turning to them." },
        { q: "What prevails over His anger, per Ibn Kathir?", a: "His mercy", wrong: ["His justice only", "His power", "Nothing"], why: "His mercy and kindness towards His creation prevail over His wrath." }
      ]
    },
    {
      slug: "allah-sufficed-the-believers",
      title: "Allah sufficed the believers",
      line: "Allah sent the armies back angry and empty-handed.",
      facts: ["The believers did not have to fight", "After this, they never attacked again"],
      quote: q33(25),
      source: ik(25, "The believers did not have to fight. Allah alone was enough, helped His servant and gave victory to His troops.", "Allah Alone sufficed them and helped His servant"),
      difficulty: 4,
      questions: [
        { q: "How did the armies leave, in 33:25?", a: "With no gain", wrong: ["With treasure", "As winners", "With prisoners"], why: "And Allah drove back those who disbelieved in their rage: they gained no advantage." },
        { q: "Who sufficed the believers, in 33:25?", a: "Allah", wrong: ["A new ally", "Their wealth", "A fortress"], why: "Allah sufficed for the believers in the fighting." },
        { q: "What happened after this, per Ibn Kathir?", a: "Idolators stopped attacking", wrong: ["A bigger attack", "Madinah fell", "A long famine"], why: "After this, the idolators did not attack the Muslims." }
      ]
    },
    {
      slug: "pray-asr-at-qurayzah",
      title: "Pray Asr at Qurayzah",
      line: "A tribe broke its treaty, and Allah brought them down.",
      facts: ["Banu Qurayzah broke their pledge", "Two understandings, no one blamed"],
      quote: q33(26),
      source: hadith("bukhari", "946", "Ibn Umar", "Sahih", "The Prophet ﷺ told them to pray Asr at Banu Qurayzah. Some prayed on the way, some waited, and he blamed neither group.", "he did not blame anyone of them"),
      difficulty: 4,
      questions: [
        { q: "Where did Allah bring them down from, in 33:26?", a: "Their forts", wrong: ["A ship", "A mountain", "Their camels"], why: "Allah brought them down from their forts." },
        { q: "Where were they to pray Asr, in the hadith?", a: "At Bani Quraiza", wrong: ["In Makkah", "At the trench", "At home"], why: "None should offer the Asr prayer but at Bani Quraiza." },
        { q: "Whom did the Prophet ﷺ blame, in the hadith?", a: "No one", wrong: ["Those who waited", "Those who prayed", "Both groups"], why: "He did not blame anyone of them." }
      ]
    },
    {
      slug: "lands-you-had-not-trodden",
      title: "Lands you had not trodden",
      line: "Allah gave them lands, homes, and lands they had never walked.",
      facts: ["Allah is able to do all things", "Later lands came by His will"],
      quote: q33(27),
      source: ik(27, "The land not yet trodden was said to be Khaybar, or the lands of the Persians and Romans; Ibn Jarir said all may be meant.", "It was said that this was Khaybar"),
      difficulty: 4,
      questions: [
        { q: "What did Allah give them, in 33:27?", a: "Lands, homes and riches", wrong: ["Only food", "Only camels", "Nothing"], why: "And He caused you to inherit their lands, and their houses, and their riches." },
        { q: "What other land is mentioned, in 33:27?", a: "One not yet trodden", wrong: ["The sea", "A garden", "A mountain"], why: "And a land which you had not trodden." },
        { q: "Which land was it said to be, per Ibn Kathir?", a: "Khaybar", wrong: ["Yemen", "Egypt", "India"], why: "It was said that this was Khaybar, or that it was the lands of the Persians and Romans." },
        { q: "What is Allah able to do, in 33:27?", a: "All things", wrong: ["Some things", "Only big things", "Nothing alone"], why: "And Allah is able to do all things." }
      ]
    }
  ]
};

/** Ayahs 28 to 52: the choice of the Mothers of the Believers, good manners, Zayd and Zaynab, the last Prophet ﷺ, and remembering Allah. */
const AHZAB_TWO: DeepUnit = {
  key: "ahzab2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-33",
  name: "Al-Ahzab, ayahs 28 to 52",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Ahzab",
  lessons: [
    {
      slug: "the-choice-given",
      title: "The choice given",
      line: "The Prophet's ﷺ wives were given a choice: this world or Allah.",
      facts: ["Aishah was asked first", "She chose Allah at once"],
      quote: q33(28),
      source: hadith("bukhari", "4785", "Aishah", "Sahih", "The Prophet ﷺ told Aishah about the choice and said she need not hurry. She chose Allah, His Messenger ﷺ and the Hereafter.", "Verily, I seek Allah, His Apostle and the Home of the Hereafter"),
      difficulty: 3,
      questions: [
        { q: "What choice were they given, in 33:28?", a: "This world or Allah", wrong: ["Gold or silver", "Makkah or Madinah", "Silk or wool"], why: "If you desire the life of this world, and its glitter, then come!" },
        { q: "Whom did the Prophet ﷺ ask first, in the hadith?", a: "Aishah", wrong: ["Hafsah", "Sawdah", "Zaynab"], why: "Allah's Messenger started with me." },
        { q: "What did Aishah choose, in the hadith?", a: "Allah and the Hereafter", wrong: ["Wealth", "Her parents' home", "Time to think"], why: "Verily, I seek Allah, His Apostle and the Home of the Hereafter." }
      ]
    },
    {
      slug: "they-chose-allah",
      title: "They chose Allah",
      line: "All of his wives chose Allah, His Messenger ﷺ and the Hereafter.",
      facts: ["A great reward was promised", "They chose patience over riches"],
      quote: q33(29),
      source: ik(29, "They chose Allah, His Messenger ﷺ and the Hereafter, and Allah then gave them the best of this world and the next.", "Then Allah gave them the best both of this world and of the Hereafter"),
      difficulty: 3,
      questions: [
        { q: "What is prepared for the doers of good, in 33:29?", a: "An enormous reward", wrong: ["A small gift", "A palace on earth", "Nothing"], why: "Allah has prepared for the doers of good among you an enormous reward." },
        { q: "What did the wives choose, per Ibn Kathir?", a: "Allah and His Messenger ﷺ", wrong: ["The world", "Their families", "Riches"], why: "They chose Allah and His Messenger and the Home of the Hereafter." },
        { tf: true, q: "Allah then gave them the best of both worlds.", why: "Then Allah gave them the best both of this world and of the Hereafter." }
      ]
    },
    {
      slug: "a-higher-standard",
      title: "A higher standard",
      line: "Because their rank is high, any wrong by them would weigh more.",
      facts: ["The ayah speaks of a condition", "It does not mean it happened"],
      quote: q33(30),
      source: ik(30, "This is a conditional phrase. It does not mean any of them did it; their high rank makes the rule stricter to protect them.", "it does not imply that what is referred to would actually happen"),
      difficulty: 4,
      questions: [
        { q: "Whom does 33:30 address?", a: "The wives of the Prophet ﷺ", wrong: ["All people", "The angels", "The hypocrites"], why: "O wives of the Prophet ﷺ!" },
        { q: "Does the ayah say it happened, per Ibn Kathir?", a: "No, it is a condition", wrong: ["Yes, often", "Yes, once", "No one knows"], why: "This is a conditional phrase and it does not imply that what is referred to would actually happen." },
        { q: "Why is it stricter for them, per Ibn Kathir?", a: "Their status is so high", wrong: ["They were rich", "They were young", "They lived far"], why: "Because their status is so high." }
      ]
    },
    {
      slug: "reward-twice-over",
      title: "Reward twice over",
      line: "Whoever of them obeys Allah gets her reward twice over.",
      facts: ["A noble provision awaits", "Their homes in Paradise are highest"],
      quote: q33(31),
      source: ik(31, "Their reward is doubled, and in Paradise they will be in the dwellings of the Messenger ﷺ, near the Throne.", "the closest of the dwellings of Paradise to the Throne"),
      difficulty: 3,
      questions: [
        { q: "How much reward for the obedient, in 33:31?", a: "Twice over", wrong: ["Half", "The same", "None"], why: "We shall give her, her reward twice over." },
        { q: "What is prepared for her, in 33:31?", a: "A noble provision", wrong: ["A small house", "A long trip", "A crown of iron"], why: "And We have prepared for her a noble provision." },
        { q: "Where will they live, per Ibn Kathir?", a: "Near the Throne", wrong: ["On earth", "In the sea", "In a desert"], why: "Al-Wasilah which is the closest of the dwellings of Paradise to the Throne." }
      ]
    },
    {
      slug: "speak-in-an-honourable-way",
      title: "Speak in an honourable way",
      line: "Not like other women, they speak with dignity, not softly.",
      facts: ["Good, decent words", "An example for all women"],
      quote: q33(32),
      source: ik(32, "These manners were given so the Mothers of the Believers would be an example for the women of the Ummah.", "so that they would be an example for the women of the Ummah to follow"),
      difficulty: 3,
      questions: [
        { q: "Are they like other women, in 33:32?", a: "No", wrong: ["Yes", "Only some", "Only in Makkah"], why: "O wives of the Prophet ﷺ! You are not like any other women." },
        { q: "How should they speak, in 33:32?", a: "In an honourable way", wrong: ["Loudly", "In riddles", "Not at all"], why: "But speak in an honorable manner." },
        { q: "Why were these manners given, per Ibn Kathir?", a: "To set an example", wrong: ["To punish them", "To hide them", "To test men"], why: "So that they would be an example for the women of the Ummah to follow." }
      ]
    },
    {
      slug: "prayer-zakah-and-purity",
      title: "Prayer, Zakah and purity",
      line: "Pray, give Zakah, obey Allah; He wants to purify the household.",
      facts: ["No showing off like old times", "First leave evil, then do good"],
      quote: q33(33),
      source: ik(33, "Allah first forbids evil, then commands good: prayer, which is worship of Allah alone, and Zakah, which is doing good to people.", "Allah first forbids them from evil, then He enjoins them to do good"),
      difficulty: 4,
      questions: [
        { q: "Which two acts are commanded, in 33:33?", a: "Salah and Zakah", wrong: ["Hajj and Umrah", "Trade and travel", "Sleep and eat"], why: "And perform the Salah, and give Zakah and obey Allah and His Messenger." },
        { q: "What is Zakah about, per Ibn Kathir?", a: "Doing good to people", wrong: ["Getting rich", "Fasting", "Travelling"], why: "Paying Zakah, which means doing good to other people." },
        { q: "What does Allah wish for them, in 33:33?", a: "To purify them", wrong: ["To test them", "To scare them", "To make them rich"], why: "And to purify you with a thorough purification." }
      ]
    },
    {
      slug: "revelation-in-their-homes",
      title: "Revelation in their homes",
      line: "Remember the ayahs and wisdom recited in your homes.",
      facts: ["Al-Hikmah means the Sunnah", "A special favour to thank Allah for"],
      quote: q33(34),
      source: ik(34, "Remember the blessing that revelation came down in your houses, so thank Allah for it. Al-Hikmah means the Sunnah.", "Al-Hikmah means the Sunnah"),
      difficulty: 4,
      questions: [
        { q: "What was recited in their homes, in 33:34?", a: "Ayahs and wisdom", wrong: ["Poems", "Stories of kings", "Market news"], why: "That which is recited in your houses of the Ayat of Allah and Al-Hikmah." },
        { q: "What does Al-Hikmah mean, per Ibn Kathir?", a: "The Sunnah", wrong: ["Poetry", "Medicine", "Building"], why: "Al-Hikmah means the Sunnah." },
        { q: "How should they respond, per Ibn Jarir?", a: "Thank and praise Allah", wrong: ["Keep it secret", "Forget it", "Boast"], why: "So give thanks to Allah for that and praise Him." }
      ]
    },
    {
      slug: "men-and-women-alike",
      title: "Men and women alike",
      line: "Believing men and women alike get forgiveness and great reward.",
      facts: ["Umm Salamah asked about women", "Truthfulness leads to Paradise"],
      quote: q33(35),
      source: hadith("bukhari", "6094", "Abdullah ibn Masud", "Sahih", "Truthfulness leads to righteousness, and righteousness leads to Paradise.", "Truthfulness leads to righteousness, and righteousness leads to Paradise"),
      difficulty: 3,
      questions: [
        { q: "What is prepared for them all, in 33:35?", a: "Forgiveness and a great reward", wrong: ["Only praise", "Riches", "A long life"], why: "Allah has prepared for them forgiveness and a great reward." },
        { q: "Where does truthfulness lead, in the hadith?", a: "To righteousness", wrong: ["To wealth", "To fame", "To sadness"], why: "Truthfulness leads to righteousness." },
        { q: "Which group is named in 33:35?", a: "Those who fast", wrong: ["Those who boast", "Those who hoard", "Those who sleep"], why: "The men and the women who fast." },
        { tf: true, q: "The ayah names women as well as men.", why: "Verily, the Muslims: men and women, the believers: men and women." }
      ]
    },
    {
      slug: "when-allah-decides",
      title: "When Allah decides",
      line: "When Allah and His Messenger ﷺ decide, believers obey.",
      facts: ["The rule covers all matters", "A girl chose to obey and was blessed"],
      quote: q33(36),
      source: ik(36, "If Allah and His Messenger ﷺ decree a matter, no one may go against it or choose otherwise.", "This Ayah is general in meaning and applies to all matters"),
      difficulty: 4,
      questions: [
        { q: "Do believers have another option, in 33:36?", a: "No", wrong: ["Yes, always", "Only the rich", "Only elders"], why: "It is not for a believer, man or woman... that they should have any option in their decision." },
        { q: "Which matters does it cover, per Ibn Kathir?", a: "All matters", wrong: ["Only war", "Only trade", "Only prayer"], why: "This Ayah is general in meaning and applies to all matters." },
        { q: "What did the Prophet ﷺ pray for the girl, per Ibn Kathir?", a: "Blessings and ease", wrong: ["Wealth only", "Many sons", "A long trip"], why: "O Allah, pour blessings upon her and do not make her life hard." }
      ]
    },
    {
      slug: "zayd-and-zaynab",
      title: "Zayd and Zaynab",
      line: "Allah married Zaynab to the Prophet ﷺ to end an old custom.",
      facts: ["Zayd was beloved and freed", "Adopted sons are not real sons"],
      quote: q33(37),
      source: hadith("bukhari", "7420", "Anas ibn Malik", "Sahih", "Zaynab used to say that her family did not arrange her marriage; Allah did, from above the seven heavens.", "by Allah from over seven Heavens"),
      difficulty: 5,
      questions: [
        { q: "What did he tell Zayd, in 33:37?", a: "Keep your wife and fear Allah", wrong: ["Leave Madinah", "Go to war", "Build a house"], why: "Keep your wife to yourself, and have Taqwa of Allah." },
        { q: "Who arranged Zaynab's marriage, in the hadith?", a: "Allah", wrong: ["Her uncle", "Her brother", "Zayd"], why: "I was married (to the Prophet ﷺ) by Allah from over seven Heavens." },
        { q: "Why did it happen, in 33:37?", a: "To remove a hardship for believers", wrong: ["For wealth", "For an alliance", "For fame"], why: "So that there may be no difficulty to the believers in respect of the wives of their adopted sons." }
      ]
    },
    {
      slug: "no-blame-on-the-prophet",
      title: "No blame on the Prophet ﷺ",
      line: "No blame on the Prophet ﷺ in what Allah made lawful.",
      facts: ["Same way as the earlier Prophets", "Allah's decree always happens"],
      quote: q33(38),
      source: ik(38, "Whatever Allah decrees must come to pass. Nothing can stop it, and what He does not decree does not happen.", "whatever He wills happens, and whatever He does not decree, does not happen"),
      difficulty: 4,
      questions: [
        { q: "Is there blame on him, in 33:38?", a: "No", wrong: ["Yes", "A little", "Only at first"], why: "There is no blame on the Prophet ﷺ in that which Allah has made legal for him." },
        { q: "Whose way was this before, in 33:38?", a: "The earlier Prophets", wrong: ["Kings", "Poets", "Traders"], why: "That has been Allah's way with those who have passed away of old." },
        { q: "What happens when Allah wills, per Ibn Kathir?", a: "It happens", wrong: ["It might not", "People decide", "It waits"], why: "Whatever He wills happens." }
      ]
    },
    {
      slug: "fear-none-but-allah",
      title: "Fear none but Allah",
      line: "Those who carry Allah's Message fear Him and no one else.",
      facts: ["Allah is enough as a Reckoner", "Speak truth without fear"],
      quote: q33(39),
      source: ik(39, "Allah praises those who convey His Message and fear none but Him.", "Praise for Those Who convey the Message"),
      difficulty: 3,
      questions: [
        { q: "Whom do the messengers fear, in 33:39?", a: "None but Allah", wrong: ["Kings", "Crowds", "Enemies"], why: "And fear none save Allah." },
        { q: "What is Allah enough as, in 33:39?", a: "A Reckoner", wrong: ["A guest", "A partner", "A stranger"], why: "And sufficient is Allah as a Reckoner." },
        { q: "Whom does Allah praise, per Ibn Kathir?", a: "Those who convey the Message", wrong: ["Those who hide it", "Those who fight it", "Kings"], why: "Praise for Those Who convey the Message." }
      ]
    },
    {
      slug: "the-last-brick",
      title: "The last brick",
      line: "Muhammad ﷺ is the Messenger of Allah and the last Prophet.",
      facts: ["He is not the father of any man among you", "No Prophet comes after him"],
      quote: q33(40),
      source: hadith("bukhari", "3535", "Abu Hurairah", "Sahih", "The Prophet ﷺ compared the Prophets to a beautiful house missing one brick. He is that brick, the last of the Prophets.", "So I am that brick, and I am the last of the Prophets"),
      difficulty: 3,
      questions: [
        { q: "What is Muhammad ﷺ, in 33:40?", a: "The last of the Prophets", wrong: ["The first Prophet", "A king", "A poet"], why: "But he is the Messenger of Allah and the last of the Prophets." },
        { q: "What did the house lack, in the hadith?", a: "One brick", wrong: ["A door", "A roof", "A window"], why: "Except for a place of one brick in a corner." },
        { q: "Who is that brick, in the hadith?", a: "The Prophet ﷺ", wrong: ["Adam", "Musa", "Isa"], why: "So I am that brick, and I am the last of the Prophets." }
      ]
    },
    {
      slug: "remember-allah-much",
      title: "Remember Allah much",
      line: "Believers, remember Allah with much remembrance.",
      facts: ["Dhikr has no set limit", "Remembering Allah keeps the heart alive"],
      quote: q33(41),
      source: hadith("bukhari", "6407", "Abu Musa", "Sahih", "One who remembers his Lord compared to one who does not is like the living compared to the dead.", "is that of a living creature compared to a dead one"),
      difficulty: 3,
      questions: [
        { q: "How much should we remember Allah, in 33:41?", a: "Much", wrong: ["Once a year", "Only on Friday", "Only when sad"], why: "Remember Allah with much remembrance." },
        { q: "Who is like the living, in the hadith?", a: "One who remembers Allah", wrong: ["One who sleeps", "One who is rich", "One who travels"], why: "Is that of a living creature compared to a dead one." },
        { q: "What has no set limit, per Ibn Abbas?", a: "Dhikr", wrong: ["Fasting", "Hajj", "Zakah"], why: "Apart from Dhikr, for Allah has not set any limits for it." }
      ]
    },
    {
      slug: "the-least-of-much-dhikr",
      title: "The least of much dhikr",
      line: "At least keep the morning, evening and after-prayer adhkar.",
      facts: ["As-Sa'di explains", "Adhkar"],
      quote: q33(41),
      source: saadi(33, 41, "As-Sa'di says much remembrance includes tahlil, tahmid, tasbih and takbir; the least of it is keeping the morning and evening adhkar and those after the five prayers, and it is worship done even while resting.", "وأقل ذلك، أن يلازم الإنسان، أوراد الصباح، والمساء، وأدبار الصلوات الخمس"),
      difficulty: 2,
      questions: [
        { q: "What is the least of much dhikr, per as-Sa'di?", a: "Morning, evening and after-prayer adhkar", wrong: ["Once a year", "Only on Fridays", "Only in Ramadan"], why: "The least is keeping the morning, evening and after-prayer adhkar." },
        { q: "What does dhikr protect the tongue from, per as-Sa'di on 33:41?", a: "Ugly speech", wrong: ["Eating", "Smiling", "Greeting"], why: "Dhikr helps hold the tongue back from ugly speech." },
        { tf: true, q: "Dhikr is worship a person can do even while resting.", why: "As-Sa'di on 33:41." }
      ]
    },
    {
      slug: "morning-and-evening",
      title: "Morning and evening",
      line: "Glorify Allah in the morning and in the evening.",
      facts: ["Asila means evening", "Scholars wrote books of Adhkar"],
      quote: q33(42),
      source: ik(42, "Glorify Him morning and evening. Scholars wrote whole books of Adhkar to say at different times of day and night.", "have written books about the Adhkar to be recited at different times of the night and day"),
      difficulty: 3,
      questions: [
        { q: "When should we glorify Him, in 33:42?", a: "Morning and evening", wrong: ["Only at noon", "Only at night", "Once a week"], why: "And glorify His praises morning and Asila." },
        { q: "What does Asila mean, per Ibn Kathir?", a: "Evening", wrong: ["Noon", "Midnight", "Winter"], why: "In the morning and in the evening." },
        { tf: true, q: "Scholars wrote books of Adhkar for each time of day.", why: "An-Nasa'i and Al-Ma'mari and others have written books about the Adhkar." }
      ]
    },
    {
      slug: "from-darkness-into-light",
      title: "From darkness into light",
      line: "Allah and His angels send Salah to bring you into light.",
      facts: ["Allah praises believers to the angels", "He is kinder than a mother"],
      quote: q33(43),
      source: hadith("bukhari", "5999", "Umar ibn al-Khattab", "Sahih", "The Prophet ﷺ saw a mother hug her lost child and said Allah is more merciful to His servants than she is to her son.", "Allah is more merciful to His slaves than this lady to her son"),
      difficulty: 3,
      questions: [
        { q: "Where does Allah bring believers, in 33:43?", a: "From darkness into light", wrong: ["From light into dark", "To the desert", "To the sea"], why: "That He may bring you out from darkness into light." },
        { q: "What is Allah's Salah, per Ibn Kathir?", a: "Praising His servant to angels", wrong: ["A prayer mat", "A kind of fast", "A journey"], why: "Allah's Salah means that He praises His servant before the angels." },
        { q: "Who is more merciful than the mother, in the hadith?", a: "Allah", wrong: ["The father", "The king", "No one"], why: "Allah is more merciful to His slaves than this lady to her son." }
      ]
    },
    {
      slug: "greeted-with-salam",
      title: "Greeted with Salam",
      line: "On the Day they meet Him, their greeting will be Salam.",
      facts: ["Peace from the Most Merciful", "A generous reward waits"],
      quote: q33(44),
      source: ik(44, "The generous reward is Paradise, with joys no eye has seen, no ear has heard, and no mind has imagined.", "such as no eye has seen, no ear has heard"),
      difficulty: 3,
      questions: [
        { q: "What is their greeting, in 33:44?", a: "Salam", wrong: ["Goodbye", "Silence", "Welcome home"], why: "Their greeting on the Day they shall meet Him will be Salam." },
        { q: "What is the generous reward, per Ibn Kathir?", a: "Paradise", wrong: ["Gold on earth", "A long life", "Fame"], why: "And He has prepared for them a generous reward.) means Paradise." },
        { tf: true, q: "Paradise has joys no eye has ever seen.", why: "Such as no eye has seen, no ear has heard and has never entered the mind of man." }
      ]
    },
    {
      slug: "witness-and-bearer-of-news",
      title: "Witness and bearer of news",
      line: "He ﷺ was sent as witness, bringer of good news, and warner.",
      facts: ["Described in the Torah too", "He forgave and did not shout"],
      quote: q33(45),
      source: hadith("bukhari", "4838", "Abdullah ibn Amr", "Sahih", "The Torah described him as a witness and bringer of good news who is not harsh, does not repay evil with evil, but forgives.", "You do not return evil for evil, but excuse and forgive"),
      difficulty: 3,
      questions: [
        { q: "What three things was he sent as, in 33:45?", a: "Witness, bearer of news, warner", wrong: ["King, judge, poet", "Trader, guard, builder", "Soldier, guide, scribe"], why: "We have sent you as witness, and a bearer of glad tidings, and a warner." },
        { q: "What did he do with evil, in the hadith?", a: "Excused and forgave", wrong: ["Paid it back", "Shouted", "Ran away"], why: "You do not return evil for evil, but excuse and forgive." },
        { q: "Which book also described him, in the hadith?", a: "The Torah", wrong: ["A poem", "A map", "A diary"], why: "Appears in the Torah thus." }
      ]
    },
    {
      slug: "a-lamp-spreading-light",
      title: "A lamp spreading light",
      line: "He calls to Allah by His leave, like a lamp giving light.",
      facts: ["His Message is as clear as the sun", "Only the stubborn deny it"],
      quote: q33(46),
      source: ik(46, "The Message he brought is as clear as the bright sun, and only the stubborn deny it.", "the Message that you bring is as clear as the sun shining brightly"),
      difficulty: 3,
      questions: [
        { q: "What is he compared to, in 33:46?", a: "A lamp spreading light", wrong: ["A tall tree", "A river", "A mountain"], why: "And as a lamp spreading light." },
        { q: "How clear is his Message, per Ibn Kathir?", a: "As clear as the sun", wrong: ["Like fog", "Like a riddle", "Hard to see"], why: "The Message that you bring is as clear as the sun shining brightly." },
        { q: "By whose leave does he invite, in 33:46?", a: "By Allah's leave", wrong: ["By the king's", "By the tribe's", "By his own"], why: "And as one who invites to Allah by His leave." }
      ]
    },
    {
      slug: "a-great-bounty",
      title: "A great bounty",
      line: "Give believers the good news of a great bounty from Allah.",
      facts: ["Good news for believers", "Warning for those who deny"],
      quote: q33(47),
      source: ik(47, "He gives believers good news of a great reward, and warns the disbelievers of a great punishment.", "a bearer of glad tidings to the believers of a great reward"),
      difficulty: 2,
      questions: [
        { q: "What news is given to believers, in 33:47?", a: "A great bounty", wrong: ["A hard trial", "A new tax", "A long war"], why: "That they will have from Allah a great bounty." },
        { q: "Whom is the good news for, per Ibn Kathir?", a: "The believers", wrong: ["The hypocrites", "The idols", "The kings"], why: "A bearer of glad tidings to the believers of a great reward." },
        { tf: true, q: "The great bounty comes from Allah.", why: "That they will have from Allah a great bounty." }
      ]
    },
    {
      slug: "ignore-their-harm",
      title: "Ignore their harm",
      line: "Do not obey them, overlook their harm, and trust in Allah.",
      facts: ["Their matter rests with Allah", "Allah is enough as a Trustee"],
      quote: q33(48),
      source: ik(48, "Overlook and ignore them, for their matter rests entirely with Allah, and He is enough to deal with them.", "overlook and ignore them, for their matter rests entirely with Allah"),
      difficulty: 3,
      questions: [
        { q: "What does harm them not mean, per Ibn Kathir?", a: "Overlook and ignore them", wrong: ["Argue daily", "Chase them", "Copy them"], why: "Overlook and ignore them, for their matter rests entirely with Allah." },
        { q: "With whom does their matter rest, per Ibn Kathir?", a: "Allah", wrong: ["The tribe", "The judge", "The army"], why: "Their matter rests entirely with Allah." },
        { q: "What is Allah enough as, in 33:48?", a: "A Trustee", wrong: ["A guard", "A partner", "A guest"], why: "And sufficient is Allah as a Trustee." }
      ]
    },
    {
      slug: "part-in-a-kind-way",
      title: "Part in a kind way",
      line: "If a marriage ends before married life begins, part kindly.",
      facts: ["No waiting time is needed", "Give her a kind gift"],
      quote: q33(49),
      source: ik(49, "Scholars agree that in this case she has no waiting period and may marry again whenever she wishes; he gives her a gift.", "she may go and get married immediately to whomever she wishes"),
      difficulty: 4,
      questions: [
        { q: "What should be given, in 33:49?", a: "A present", wrong: ["Nothing", "A fine", "A warning"], why: "So, give them a present." },
        { q: "How should they part, in 33:49?", a: "In a handsome manner", wrong: ["In anger", "In secret", "With shouting"], why: "And set them free in a handsome manner." },
        { q: "Can she marry again soon, per Ibn Kathir?", a: "Yes, right away", wrong: ["Never", "After a year", "After ten years"], why: "She may go and get married immediately to whomever she wishes." }
      ]
    },
    {
      slug: "rules-for-the-prophet",
      title: "Rules for the Prophet ﷺ",
      line: "Some marriage rules were for the Prophet ﷺ alone.",
      facts: ["A privilege for him only", "Others must give a dowry"],
      quote: q33(50),
      source: hadith("bukhari", "5135", "Sahl bin Sa'd", "Sahih", "A poor man had not even an iron ring for a dowry, so the Prophet ﷺ married him with the Quran he knew.", "We have married her to you for what you know of the Qur"),
      difficulty: 4,
      questions: [
        { q: "Whom was the privilege for, in 33:50?", a: "The Prophet ﷺ only", wrong: ["All believers", "All leaders", "The Ansar"], why: "A privilege for you only, not for the (rest of) the believers." },
        { q: "What did the poor man lack, in the hadith?", a: "Even an iron ring", wrong: ["A house", "A horse", "A sword"], why: "Try (to find something), even if it were an iron ring." },
        { q: "What was his dowry in the end, in the hadith?", a: "The Quran he knew", wrong: ["A camel", "His cloak", "Gold"], why: "We have married her to you for what you know of the Qur'an." }
      ]
    },
    {
      slug: "fair-to-all-of-them",
      title: "Fair to all of them",
      line: "Allah gave him a choice, yet he still shared his time fairly.",
      facts: ["Allah knows what is in hearts", "Allah is Most Forbearing"],
      quote: q33(51),
      source: ik(51, "Even though he was given the choice, the Prophet ﷺ used to share his time equally between his wives.", "used to divide his time between them equally"),
      difficulty: 4,
      questions: [
        { q: "What did he still do, per Ibn Kathir?", a: "Divide his time equally", wrong: ["Favour one", "Travel alone", "Stay away"], why: "Nevertheless, the Prophet ﷺ used to divide his time between them equally." },
        { q: "What does Allah know, in 33:51?", a: "What is in your hearts", wrong: ["Only deeds", "Only words", "Nothing hidden"], why: "Allah knows what is in your hearts." },
        { q: "Why was the choice given, in 33:51?", a: "So they would be content", wrong: ["So they would leave", "To test men", "To end a war"], why: "That is better that they may be comforted and not grieved." }
      ]
    },
    {
      slug: "a-reward-for-their-choice",
      title: "A reward for their choice",
      line: "He was told not to marry others besides them.",
      facts: ["A reward for choosing Allah", "Allah watches over all"],
      quote: q33(52),
      source: ik(52, "Many scholars said this ayah was a reward to his wives for choosing Allah, His Messenger ﷺ and the Hereafter.", "this Ayah was revealed as a reward to the wives of the Prophet ﷺ"),
      difficulty: 4,
      questions: [
        { q: "Why was 33:52 revealed, per Ibn Kathir?", a: "As a reward to his wives", wrong: ["As a punishment", "For a war", "For trade"], why: "This Ayah was revealed as a reward to the wives of the Prophet ﷺ." },
        { q: "What did his wives choose, per Ibn Kathir?", a: "Allah and His Messenger ﷺ", wrong: ["Wealth", "Their tribes", "Silk"], why: "For their excellent decision in choosing Allah and His Messenger." },
        { q: "What is Allah over all things, in 33:52?", a: "A Watcher", wrong: ["A stranger", "Asleep", "Far away"], why: "And Allah is Ever a Watcher over all things." }
      ]
    }
  ]
};

/** Ayahs 53 to 73: manners in the Prophet's ﷺ homes, sending Salah on him, the Hour, speaking the truth, and the Trust. */
const AHZAB_THREE: DeepUnit = {
  key: "ahzab3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-33",
  name: "Al-Ahzab, ayahs 53 to 73",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Ahzab",
  lessons: [
    {
      slug: "good-guests",
      title: "Good guests",
      line: "Enter only when invited, eat, then leave without lingering.",
      facts: ["Guests stayed too long at a wedding", "The Prophet ﷺ was too shy to ask"],
      quote: q33(53),
      source: hadith("bukhari", "4791", "Anas ibn Malik", "Sahih", "At the wedding meal for Zaynab, three guests stayed talking after eating, so Allah revealed the manners for entering his houses.", "They took the meal and remained sitting and talking"),
      difficulty: 3,
      questions: [
        { q: "When may they enter, in 33:53?", a: "When invited for a meal", wrong: ["Any time", "At night only", "Without asking"], why: "Enter not the Prophet's ﷺ houses, unless permission is given to you for a meal." },
        { q: "What should guests do after eating, in 33:53?", a: "Leave", wrong: ["Stay all night", "Ask for more", "Start a debate"], why: "And when you have taken your meal, disperse without sitting for a talk." },
        { q: "What did the guests do, in the hadith?", a: "Stayed sitting and talking", wrong: ["Left early", "Brought gifts", "Cooked food"], why: "They took the meal and remained sitting and talking." },
        { q: "Why did he not ask them to go, in 33:53?", a: "He was shy", wrong: ["He was asleep", "He was away", "He was busy"], why: "And he is shy of (asking) you (to go)." }
      ]
    },
    {
      slug: "allah-knows-the-hidden",
      title: "Allah knows the hidden",
      line: "Whether you show a thing or hide it, Allah knows it all.",
      facts: ["Thoughts are known to Him", "Nothing is hidden at all"],
      quote: q33(54),
      source: ik(54, "Whatever you hide deep in your thoughts is not hidden from Allah at all.", "it is not hidden from Him at all"),
      difficulty: 2,
      questions: [
        { q: "What does Allah know, in 33:54?", a: "What we show and hide", wrong: ["Only what we say", "Only deeds", "Only the past"], why: "Whether you reveal anything or conceal it, verily, Allah is Ever All-Knower of everything." },
        { q: "Is anything hidden from Him, per Ibn Kathir?", a: "Not at all", wrong: ["Some thoughts", "Dreams", "The night"], why: "It is not hidden from Him at all." },
        { tf: true, q: "Allah knows even our innermost thoughts.", why: "Whatever you conceal in your innermost thoughts, it is not hidden from Him at all." }
      ]
    },
    {
      slug: "close-family",
      title: "Close family",
      line: "Close family members may see them, and Allah witnesses all.",
      facts: ["Fathers, sons, brothers, nephews", "Fear Allah in private and public"],
      quote: q33(55),
      source: ik(55, "Fear Allah in private and in public, for He witnesses all things; think of the One Who is always watching.", "so think of the One Who is always watching"),
      difficulty: 3,
      questions: [
        { q: "Which relative is named in 33:55?", a: "Their fathers", wrong: ["Neighbours", "Strangers", "Traders"], why: "It is no sin on them before their fathers." },
        { q: "What is Allah over everything, in 33:55?", a: "All-Witness", wrong: ["Unaware", "Far away", "Asleep"], why: "Verily, Allah is Ever All-Witness over everything." },
        { q: "What should we think of, per Ibn Kathir?", a: "The One always watching", wrong: ["Our looks", "Our wealth", "Our fame"], why: "So think of the One Who is always watching." }
      ]
    },
    {
      slug: "send-salah-on-him",
      title: "Send Salah on him",
      line: "Allah and His angels send Salah on him ﷺ; so should we.",
      facts: ["He taught how to say it", "One Salah brings ten from Allah"],
      quote: q33(56),
      source: hadith("muslim", "408", "Abu Hurairah", "Sahih", "Whoever sends Salah on the Prophet ﷺ once, Allah blesses him ten times.", "He who blesses me once, Allah would bless him ten times"),
      difficulty: 3,
      questions: [
        { q: "Who sends Salah on the Prophet ﷺ, in 33:56?", a: "Allah and His angels", wrong: ["Only people", "Only kings", "No one"], why: "Allah sends His Salah on the Prophet ﷺ, and also His angels." },
        { q: "How many blessings for one Salah, in the hadith?", a: "Ten", wrong: ["One", "Two", "Five"], why: "He who blesses me once, Allah would bless him ten times." },
        { q: "What is the angels' Salah, per Abu Al-Aliyah?", a: "Their supplication", wrong: ["Their singing", "Their fasting", "Their flying"], why: "The Salah of the angels is their supplication." },
        { q: "Whose family is named in the Salah, per Ibn Kathir?", a: "The family of Ibrahim", wrong: ["The family of Pharaoh", "The family of Qarun", "The family of Nuh"], why: "As You sent Your Salah upon the family of Ibrahim." }
      ]
    },
    {
      slug: "the-best-salah-on-him",
      title: "The best Salah on him",
      line: "The best Salah on him ﷺ is the one he taught us.",
      facts: ["As-Sa'di explains", "As-Salat al-Ibrahimiyyah"],
      quote: q33(56),
      source: saadi(33, 56, "As-Sa'di says Allah praises the Prophet ﷺ among the angels, and the best way to send Salah on him is what he taught his Companions: O Allah, send Salah on Muhammad and the family of Muhammad, as You did on the family of Ibrahim.", "وأفضل هيئات الصلاة عليه عليه الصلاة والسلام، ما علم به أصحابه"),
      difficulty: 2,
      questions: [
        { q: "What is the best way to send Salah on the Prophet ﷺ, per as-Sa'di?", a: "The words he taught his Companions", wrong: ["Any new words", "Only in Ramadan", "Only silently"], why: "The best form is what he ﷺ taught his Companions." },
        { q: "What does Allah's Salah on the Prophet ﷺ mean, per as-Sa'di?", a: "Praising him among the angels", wrong: ["Praying to him", "Forgetting him", "Testing him"], why: "Allah praises him among the angels on high." },
        { tf: true, q: "Sending Salah on the Prophet ﷺ adds good deeds and wipes out bad ones.", why: "As-Sa'di on 33:56." }
      ]
    },
    {
      slug: "do-not-hurt-the-messenger",
      title: "Do not hurt the Messenger ﷺ",
      line: "Those who hurt Allah and His Messenger ﷺ lose His mercy.",
      facts: ["Hurting him is hurting the faith", "Obeying him is obeying Allah"],
      quote: q33(57),
      source: ik(57, "Whoever annoys the Messenger ﷺ annoys Allah, just as whoever obeys him obeys Allah.", "whoever annoys him annoys Allah, just as whoever obeys him obeys Allah"),
      difficulty: 4,
      questions: [
        { q: "Whom do they annoy, in 33:57?", a: "Allah and His Messenger ﷺ", wrong: ["Only kings", "Only angels", "Only rivals"], why: "Verily, those who annoy Allah and His Messenger." },
        { q: "Whoever obeys him obeys whom, per Ibn Kathir?", a: "Allah", wrong: ["The tribe", "The crowd", "No one"], why: "Just as whoever obeys him obeys Allah." },
        { tf: true, q: "Ibn Kathir says the ayah is general in meaning.", why: "The Ayah appears to be general in meaning and to apply to all those who annoy him in any way." }
      ]
    },
    {
      slug: "no-false-blame",
      title: "No false blame",
      line: "Blaming believers for what they did not do is a plain sin.",
      facts: ["That is slander", "Backbiting is also wrong"],
      quote: q33(58),
      source: hadith("muslim", "2589", "Abu Hurayrah", "Sahih", "Backbiting is speaking about your brother in a way he dislikes. If it is untrue, it is slander.", "your talking about your brother in a manner which he does not like"),
      difficulty: 4,
      questions: [
        { q: "What do false accusers carry, in 33:58?", a: "Slander and plain sin", wrong: ["A reward", "A gift", "Nothing"], why: "They bear the crime of slander and plain sin." },
        { q: "What is backbiting, in the hadith?", a: "Saying what your brother dislikes", wrong: ["Praying for him", "Greeting him", "Helping him"], why: "Your talking about your brother in a manner which he does not like." },
        { q: "What if what you say is untrue, per Ibn Kathir?", a: "It is slander", wrong: ["It is fine", "It is a joke", "It is advice"], why: "And if it is not true, then you have slandered him." }
      ]
    },
    {
      slug: "the-outer-garment",
      title: "The outer garment",
      line: "Believing women are told to draw their outer garments over them.",
      facts: ["So they are known and not troubled", "Allah is Forgiving and Merciful"],
      quote: q33(59),
      source: ik(59, "The Jilbab is an outer wrap worn over the Khimar, so believing women are known and not troubled.", "worn over the Khimar"),
      difficulty: 4,
      questions: [
        { q: "Whom does 33:59 address?", a: "Believing women", wrong: ["Only men", "Only kings", "Only children"], why: "Tell your wives and your daughters and the women of the believers." },
        { q: "What is the Jilbab, per Ibn Kathir?", a: "An outer wrap", wrong: ["A ring", "A shoe", "A belt"], why: "Al-Jawhari said: The Jilbab is the outer wrapper." },
        { q: "Why is it better, in 33:59?", a: "So they are not troubled", wrong: ["To look rich", "To travel far", "To be famous"], why: "That will be better that they should be known so as not to be annoyed." }
      ]
    },
    {
      slug: "spreaders-of-false-news",
      title: "Spreaders of false news",
      line: "Those who spread false rumours in Al-Madinah were warned.",
      facts: ["They lied that an enemy had come", "Stop, or leave the city"],
      quote: q33(60),
      source: ik(60, "They spread false news that the enemy had come and war had begun, which was a lie.", "those who say that the enemy has come and war has started, which is a lie"),
      difficulty: 4,
      questions: [
        { q: "What did they spread, in 33:60?", a: "False news", wrong: ["Good news", "Gifts", "Seeds"], why: "And those who spread false news among the people in Al-Madinah." },
        { q: "What lie did they tell, per Ibn Kathir?", a: "That an enemy had come", wrong: ["That rain fell", "That food was cheap", "That a child was born"], why: "Those who say that the enemy has come and war has started, which is a lie." },
        { tf: true, q: "Muslims should check news before spreading it.", why: "And those who spread false news among the people in Al-Madinah stop not." }
      ]
    },
    {
      slug: "no-place-for-them",
      title: "No place for them",
      line: "If they did not stop, they would lose their place there.",
      facts: ["Only a short time left there", "Then they would be sent away"],
      quote: q33(61),
      source: ik(61, "This describes their state in Al-Madinah for a short time before they would be sent far away.", "before they are expelled and sent far away"),
      difficulty: 4,
      questions: [
        { q: "How long would they stay, in 33:60?", a: "But a little while", wrong: ["Forever", "Ten years", "As they wish"], why: "Then they will not be able to stay in it as your neighbors but a little while." },
        { q: "What would happen next, per Ibn Kathir?", a: "They would be sent away", wrong: ["Made leaders", "Given gold", "Left alone"], why: "Before they are expelled and sent far away." },
        { q: "Which city is meant, per Ibn Kathir?", a: "Al-Madinah", wrong: ["Makkah", "Taif", "Khaybar"], why: "Then they will not be able to stay in it) means, in Al-Madinah." }
      ]
    },
    {
      slug: "allahs-way-does-not-change",
      title: "Allah's way does not change",
      line: "Allah's way with people before does not change.",
      facts: ["It was so with those of old", "His way stays the same"],
      quote: q33(62),
      source: ik(62, "The way Allah deals with those who persist in hypocrisy does not alter or change.", "does not alter or change"),
      difficulty: 3,
      questions: [
        { q: "Will you find change in Allah's way, in 33:62?", a: "No", wrong: ["Yes", "Sometimes", "Every year"], why: "And you will not find any change in the way of Allah." },
        { q: "With whom was it His way, in 33:62?", a: "Those who passed of old", wrong: ["Only Arabs", "Only kings", "Only angels"], why: "That was the way of Allah in the case of those who passed away of old." },
        { tf: true, q: "Ibn Kathir says Allah's way does not alter.", why: "The way in which Allah deals with this does not alter or change." }
      ]
    },
    {
      slug: "the-hour-may-be-near",
      title: "The Hour may be near",
      line: "Only Allah knows when the Hour comes; it may be near.",
      facts: ["Even the Prophet ﷺ did not know", "Losing honesty is a sign"],
      quote: q33(63),
      source: hadith("bukhari", "59", "Abu Hurairah", "Sahih", "A man asked about the Hour. The Prophet ﷺ said when honesty is lost, wait for the Hour.", "When honesty is lost, then wait for the Hour"),
      difficulty: 3,
      questions: [
        { q: "Who knows when the Hour comes, in 33:63?", a: "Allah only", wrong: ["Scholars", "Stars", "Fortune tellers"], why: "The knowledge of it is with Allah only." },
        { q: "What sign was given, in the hadith?", a: "Honesty is lost", wrong: ["Rain falls", "Trees grow", "Birds sing"], why: "When honesty is lost, then wait for the Hour." },
        { q: "How near may it be, in 33:63?", a: "It may be near", wrong: ["Never coming", "A million years", "Already passed"], why: "What do you know? It may be that the Hour is near!" }
      ]
    },
    {
      slug: "far-from-mercy",
      title: "Far from mercy",
      line: "Those who deny are kept far from Allah's mercy.",
      facts: ["A punishment is prepared", "Curse means far from mercy"],
      quote: q33(64),
      source: ik(64, "Allah has cursed the disbelievers, which means He has distanced them from His mercy.", "He has distanced them from His mercy"),
      difficulty: 4,
      questions: [
        { q: "What does cursed mean, per Ibn Kathir?", a: "Distanced from His mercy", wrong: ["Made rich", "Made famous", "Made strong"], why: "He has distanced them from His mercy." },
        { q: "Where is their punishment, per Ibn Kathir?", a: "In the Hereafter", wrong: ["In a cave", "At sea", "Nowhere"], why: "And has prepared for them a flaming Fire.) means, in the Hereafter." },
        { tf: true, q: "Their punishment is prepared for the Hereafter.", why: "And has prepared for them a flaming Fire (Hell).) means, in the Hereafter." }
      ]
    },
    {
      slug: "no-helper-then",
      title: "No helper then",
      line: "They stay there forever and find no protector or helper.",
      facts: ["No one can rescue them", "Believe while there is time"],
      quote: q33(65),
      source: ik(65, "They will have no one to help them or rescue them from their state.", "they will have no saviour to help them or rescue them"),
      difficulty: 4,
      questions: [
        { q: "How long will they stay, in 33:65?", a: "Forever", wrong: ["One day", "A year", "Until they leave"], why: "Wherein they will abide forever." },
        { q: "Whom will they find, in 33:65?", a: "No protector or helper", wrong: ["Many friends", "Their idols", "Their kings"], why: "And they will find neither a protector nor a helper." },
        { q: "Who can rescue them, per Ibn Kathir?", a: "No one", wrong: ["Their tribe", "Their wealth", "Their chiefs"], why: "They will have no saviour to help them or rescue them." }
      ]
    },
    {
      slug: "if-only-we-had-obeyed",
      title: "If only we had obeyed",
      line: "They will wish they had obeyed Allah and the Messenger ﷺ.",
      facts: ["Regret comes too late", "Obey now in this world"],
      quote: q33(66),
      source: ik(66, "In that state they will wish they had been among those who obeyed Allah and His Messenger ﷺ in this world.", "they will wish that they had been among those who had obeyed Allah"),
      difficulty: 4,
      questions: [
        { q: "What will they say, in 33:66?", a: "Would that we had obeyed", wrong: ["We are happy", "We did well", "We want more"], why: "Oh, would that we had obeyed Allah and obeyed the Messenger ﷺ." },
        { q: "When should they have obeyed, per Ibn Kathir?", a: "In this world", wrong: ["Never", "In the grave", "After the Hour"], why: "Had obeyed Allah and His Messenger in this world." },
        { tf: false, q: "Their wish will help them on that Day.", why: "They will wish that they had obeyed... in this world." }
      ]
    },
    {
      slug: "blaming-their-leaders",
      title: "Blaming their leaders",
      line: "They will say: we obeyed our chiefs, and they misled us.",
      facts: ["Chiefs means nobles", "Great ones means their scholars"],
      quote: q33(67),
      source: ik(67, "Tawus said their chiefs were their nobles, and their great ones were their scholars.", "means their scholars"),
      difficulty: 4,
      questions: [
        { q: "Whom did they obey, in 33:67?", a: "Their chiefs and great ones", wrong: ["The Prophets", "The angels", "Their mothers"], why: "Verily, we obeyed our chiefs and our great ones." },
        { q: "Who are the great ones, per Tawus?", a: "Their scholars", wrong: ["Their soldiers", "Their children", "Their poets"], why: "Our great ones means their scholars." },
        { q: "What did the leaders do, in 33:67?", a: "Misled them", wrong: ["Guided them", "Fed them", "Freed them"], why: "And they misled us from the way." }
      ]
    },
    {
      slug: "double-for-misleading",
      title: "Double for misleading",
      line: "They ask that their misleaders get double punishment.",
      facts: ["For their own denial", "And for misleading others"],
      quote: q33(68),
      source: ik(68, "They ask double punishment for their leaders: for their own disbelief and for misleading others.", "for their disbelief and because they mislead us"),
      difficulty: 5,
      questions: [
        { q: "What do they ask for their leaders, in 33:68?", a: "Double punishment", wrong: ["A reward", "Forgiveness", "A palace"], why: "Our Lord! Give them double torment." },
        { q: "Why double, per Ibn Kathir?", a: "Disbelief and misleading", wrong: ["Being rich", "Being old", "Being far"], why: "For their disbelief and because they mislead us." },
        { tf: true, q: "Misleading others brings a heavier burden.", why: "For their disbelief and because they mislead us." }
      ]
    },
    {
      slug: "be-not-like-those-who-hurt-musa",
      title: "Be not like those who hurt Musa",
      line: "Do not hurt a Prophet as some hurt Musa; Allah cleared him.",
      facts: ["Musa was patient", "He was honoured by Allah"],
      quote: q33(69),
      source: hadith("bukhari", "3405", "Abdullah ibn Mas'ud", "Sahih", "When a man spoke unfairly of him, the Prophet ﷺ said Musa was harmed more than this, yet he was patient.", "for he was harmed more (in a worse manner) than this; yet he endured patiently"),
      difficulty: 4,
      questions: [
        { q: "Whom did some people hurt, in 33:69?", a: "Musa", wrong: ["Nuh", "Yunus", "Hud"], why: "Be not like those who annoyed Musa." },
        { q: "What did Musa do when harmed, in the hadith?", a: "Endured patiently", wrong: ["Took revenge", "Left forever", "Gave up"], why: "He was harmed more than this; yet he endured patiently." },
        { q: "What was Musa before Allah, in 33:69?", a: "Honourable", wrong: ["Unknown", "Blamed", "Forgotten"], why: "And he was honorable before Allah." }
      ]
    },
    {
      slug: "speak-the-straight-word",
      title: "Speak the straight word",
      line: "Have Taqwa of Allah and always speak the truth.",
      facts: ["No twisting or crookedness", "Taqwa and truth go together"],
      quote: q33(70),
      source: ik(70, "Speak in a straightforward way, with no crookedness or twisting of words.", "with no crookedness or distortion"),
      difficulty: 3,
      questions: [
        { q: "How should believers speak, in 33:70?", a: "Always the truth", wrong: ["Softly only", "Rarely", "In riddles"], why: "Have Taqwa of Allah and speak (always) the truth." },
        { q: "What should speech lack, per Ibn Kathir?", a: "Crookedness", wrong: ["Kindness", "Clarity", "Honesty"], why: "With no crookedness or distortion." },
        { q: "What is Taqwa like, per Ibn Kathir?", a: "Worship as if seeing Him", wrong: ["Being rich", "Being loud", "Being alone"], why: "Worshipping Him as if they can see Him." }
      ]
    },
    {
      slug: "gentle-words-are-straight",
      title: "Gentle words are straight",
      line: "Gentle words and good advice are part of the straight word.",
      facts: ["As-Sa'di explains", "Qawl Sadid"],
      quote: q33(70),
      source: saadi(33, 70, "As-Sa'di says the straight word is speech that hits the truth or comes close, like reciting, dhikr, and teaching, and it includes speaking to people gently and kindly, with sincere advice.", "ومن القول السديد، لين الكلام ولطفه، في مخاطبة الأنام"),
      difficulty: 2,
      questions: [
        { q: "What is part of the straight word, per as-Sa'di on 33:70?", a: "Speaking gently to people", wrong: ["Shouting", "Mocking", "Staying silent always"], why: "Gentle, kind speech is part of the straight word, says as-Sa'di." },
        { q: "What does the straight word include, per as-Sa'di?", a: "Dhikr and teaching good", wrong: ["Gossip", "Jokes that hurt", "Lies"], why: "Reciting, dhikr, enjoining good and teaching knowledge." },
        { tf: true, q: "Trying hard to reach the right answer is part of the straight word.", why: "As-Sa'di on 33:70." }
      ]
    },
    {
      slug: "a-great-victory",
      title: "A great victory",
      line: "Allah fixes your deeds and forgives you; obeying Him is victory.",
      facts: ["Past sins forgiven", "Help to repent later"],
      quote: q33(71),
      source: ik(71, "Allah will make their deeds righteous, forgive past sins, and inspire them to repent from future ones.", "He will inspire them to repent from them"),
      difficulty: 3,
      questions: [
        { q: "What will Allah do with your deeds, in 33:71?", a: "Make them righteous", wrong: ["Erase them", "Hide them", "Sell them"], why: "He will direct you to do righteous good deeds." },
        { q: "What about future sins, per Ibn Kathir?", a: "He inspires repentance", wrong: ["They don't count", "Nothing", "Double them"], why: "He will inspire them to repent from them." },
        { q: "What does the obedient achieve, in 33:71?", a: "A great victory", wrong: ["A small prize", "Nothing", "A long trip"], why: "He has indeed achieved a great victory." }
      ]
    },
    {
      slug: "the-trust",
      title: "The Trust",
      line: "Heavens, earth and mountains refused the Trust; man took it on.",
      facts: ["The Trust means our duties", "Do good, get rewarded"],
      quote: q33(72),
      source: ik(72, "All views agree the Trust is responsibility: accepting Allah's commands, with reward for those who fulfil it.", "There is no contradiction between all of these views"),
      difficulty: 5,
      questions: [
        { q: "Who refused the Trust, in 33:72?", a: "Heavens, earth and mountains", wrong: ["The angels", "The birds", "The seas"], why: "We did offer the Amanah to the heavens and the earth, and the mountains, but they declined." },
        { q: "What is the Amanah, per Ibn Abbas?", a: "The obligatory duties", wrong: ["Gold", "A house", "A book"], why: "Al-Amanah means Al-Fara'id (the obligatory duties)." },
        { q: "Why did they refuse, per Ibn Kathir?", a: "Respect for the religion", wrong: ["They were lazy", "They were proud", "They were asleep"], why: "Not because their intention was sinful, but because of their respect for the religion of Allah." },
        { tf: true, q: "Ibn Kathir says the views on the Trust agree.", why: "There is no contradiction between all of these views." }
      ]
    },
    {
      slug: "the-trust-in-secret",
      title: "The Trust in secret",
      line: "The Trust is obeying Allah in private just as in public.",
      facts: ["As-Sa'di explains", "Al-Amanah"],
      quote: q33(72),
      source: saadi(33, 72, "As-Sa'di says the Trust is obeying Allah's commands and avoiding what He forbade, in secret just as in public; the heavens, earth and mountains declined it out of fear, not disobedience.", "التي هي امتثال الأوامر، واجتناب المحارم، في حال السر والخفية، كحال العلانية"),
      difficulty: 3,
      questions: [
        { q: "What is the Trust, per as-Sa'di on 33:72?", a: "Obeying Allah in secret as in public", wrong: ["Keeping money safe", "Only keeping secrets", "Building homes"], why: "Obeying His commands and avoiding the forbidden, in secret as in public." },
        { q: "Why did the heavens and mountains decline the Trust, per as-Sa'di?", a: "Fear of failing it", wrong: ["Disobedience", "Pride", "Boredom"], why: "Out of fear of not fulfilling it, not out of disobedience." },
        { tf: true, q: "Hypocrites carry the Trust only on the outside.", why: "As-Sa'di on 33:72." }
      ]
    },
    {
      slug: "allah-pardons-believers",
      title: "Allah pardons believers",
      line: "Allah turns in mercy to believing men and women.",
      facts: ["Hypocrites are held to account", "He is Forgiving, Most Merciful"],
      quote: q33(73),
      source: ik(73, "Allah will show mercy to the believers who believe in Him, His angels, Books and Messengers, and who obey Him.", "He will show mercy to the believers among mankind"),
      difficulty: 3,
      questions: [
        { q: "Whom will Allah pardon, in 33:73?", a: "Believing men and women", wrong: ["Only men", "Only rulers", "No one"], why: "And Allah will pardon the believers, men and women." },
        { q: "What is Allah, in 33:73?", a: "Oft-Forgiving, Most Merciful", wrong: ["Harsh only", "Unaware", "Far away"], why: "And Allah is Ever Oft-Forgiving, Most Merciful." },
        { q: "What do these believers believe in, per Ibn Kathir?", a: "Allah, angels, Books, Messengers", wrong: ["Stars", "Idols", "Luck"], why: "Who believe in Allah and in His angels, Books and Messengers." }
      ]
    }
  ]
};

export const AHZAB_UNITS: readonly DeepUnit[] = [AHZAB_ONE, AHZAB_TWO, AHZAB_THREE];
