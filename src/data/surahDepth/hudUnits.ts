import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Hud ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Hud 11:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_11_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Hud 11:${ayah}`,
    url: `https://quran.com/11:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 11:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q11 = (ayah: number) => quranQuote(11, ayah);

/** Ayahs 1 to 24: the perfect Book, repentance, provision for every creature, the Throne over the water, patience, the Najwa. */
const HUD_ONE: DeepUnit = {
  key: "hud1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-11",
  name: "Hud, ayahs 1 to 24",
  kind: "skill",
  lessonType: "surah",
  surahName: "Hud",
  lessons: [
    {
      slug: "perfect-and-detailed",
      title: "A Book perfect and detailed",
      line: "Hud opens with a Book perfect in wording, detailed in meaning.",
      facts: ["From the All-Wise", "Complete in form and meaning"],
      quote: q11(1),
      source: ik(1, "The ayahs of the Quran are perfect in their wording and detailed in their meaning, from Allah, the All-Wise, the Well-Acquainted.", "This means perfect in its wording, detailed in its meaning"),
      difficulty: 2,
      questions: [
        { q: "Which letters open Surah Hud?", a: "Alif-Lam-Ra", wrong: ["Alif-Lam-Mim", "Ta-Ha", "Ya-Sin"], why: "Alif Lam Ra. (This is) a Book, the Ayat whereof are perfect." },
        { q: "What is perfect, per Ibn Kathir on 11:1?", a: "The wording of the Book", wrong: ["The weather", "The trade routes", "The poems of Arabia"], why: "This means perfect in its wording, detailed in its meaning." },
        { q: "The Book comes from One Who is All-Wise and Well-Acquainted.", tf: true, why: "From One (Allah), Who is All-Wise Well-Acquainted (with all things)." }
      ]
    },
    {
      slug: "surahs-that-turned-hair-gray",
      title: "Surahs that turned hair gray",
      line: "The Prophet ﷺ said Hud and its sisters turned his hair gray.",
      facts: ["Hud, Al-Waqi'ah, Al-Mursalat", "An-Naba and At-Takwir too"],
      quote: q11(1),
      source: hadith("tirmidhi", "3297", "Ibn Abbas", "Hasan", "When told his hair had turned gray, the Prophet ﷺ said Hud, Al-Waqi'ah, Al-Mursalat, An-Naba and At-Takwir had made it gray.", "I have gone gray from (Surat) Hud"),
      difficulty: 2,
      questions: [
        { q: "What did Surah Hud do to the Prophet ﷺ, per the hadith?", a: "Turned his hair gray", wrong: ["Made him sleep", "Made him travel", "Made him laugh"], why: "I have gone gray from (Surat) Hud, Al-Waqi'ah, Al-Mursalat..." },
        { q: "Which surah is named with Hud in that hadith?", a: "Al-Waqi'ah", wrong: ["Al-Fatihah", "Al-Kawthar", "An-Nasr"], why: "Hud, Al-Waqi'ah, Al-Mursalat and 'Amma Yatasa'alun and Idhash-Shamsu Kuwwirat." },
        { q: "The surahs in that hadith speak of the Last Day and its weight.", tf: true, why: "Each of these surahs describes the Day of Resurrection and what happens to nations who deny." }
      ]
    },
    {
      slug: "worship-none-but-allah",
      title: "Worship none but Allah",
      line: "The Book came down so that Allah alone is worshipped.",
      facts: ["A warner of punishment", "A bringer of good news"],
      quote: q11(2),
      source: ik(2, "The Quran came down, perfect and detailed, so that Allah alone is worshipped with no partner. The Prophet ﷺ warns of punishment and brings good news of reward.", "descended, perfect and detailed, with the purpose of"),
      difficulty: 2,
      questions: [
        { q: "Why did the Book come down, per 11:2?", a: "That Allah alone is worshipped", wrong: ["To tell stories only", "To teach poetry", "To praise kings"], why: "Saying worship none but Allah." },
        { q: "What two roles does the Messenger ﷺ have, in 11:2?", a: "Warner and bringer of good news", wrong: ["King and judge", "Poet and singer", "Trader and farmer"], why: "Verily, I am unto you from Him a warner and a bringer of glad tidings." },
        { q: "Every Messenger before was also told: worship Allah alone.", tf: true, why: "We did not send any Messenger before you but We revealed to him: worship Me. (21:25)" }
      ]
    },
    {
      slug: "seek-forgiveness-and-turn",
      title: "Seek forgiveness, then turn back",
      line: "Ask forgiveness for past sins and turn to Allah for the future.",
      facts: ["Good enjoyment in this life", "His grace in the next"],
      quote: q11(3),
      source: ik(3, "Seek forgiveness for the sins that are past and turn to Allah from future sins. Allah gives good enjoyment in this life and His grace in the Hereafter.", "to seek forgiveness from previous sins and to turn to Allah from future sins"),
      difficulty: 3,
      questions: [
        { q: "Forgiveness is for which sins, per Ibn Kathir on 11:3?", a: "Sins that are past", wrong: ["Sins not yet done", "Only big sins", "Only small sins"], why: "To seek forgiveness from previous sins and to turn to Allah from future sins." },
        { q: "What does Allah give those who repent, in 11:3?", a: "Good enjoyment for a set term", wrong: ["Endless wealth now", "Fame among people", "No tests at all"], why: "That He may grant you good enjoyment, for a term appointed." },
        { q: "Turning to Allah means staying away from sins in the future too.", tf: true, why: "To turn to Allah from future sins, and thereafter you abide by that." }
      ]
    },
    {
      slug: "to-allah-is-your-return",
      title: "To Allah is your return",
      line: "Everyone returns to Allah, and He is able to do all things.",
      facts: ["Return on Judgement Day", "Hope, then fear"],
      quote: q11(4),
      source: ik(4, "Your return is to Allah on the Day of Judgement. He is able to do whatever He wills, including bringing the creation back to life.", "This section encourages fear, just as the previous section encourages hope"),
      difficulty: 3,
      questions: [
        { q: "To whom is everyone's return, in 11:4?", a: "To Allah", wrong: ["To the earth only", "To the kings", "To nowhere"], why: "To Allah is your return, and He is able to do all things." },
        { q: "The section before 11:4 encourages what?", a: "Hope", wrong: ["Anger", "Laziness", "Pride"], why: "This section encourages fear, just as the previous section encourages hope." },
        { q: "Allah is able to bring His creatures back on the Day of Resurrection.", tf: true, why: "This also includes His ability to repeat the creation of His creatures on the Day of Resurrection." }
      ]
    },
    {
      slug: "nothing-hidden-from-him",
      title: "Nothing is hidden from Him",
      line: "Even under their clothes, Allah knows what people hide.",
      facts: ["He knows the hidden and open", "He knows what hearts hold"],
      quote: q11(5),
      source: ik(5, "Some people would cover themselves out of shyness, as if hiding from Allah. Yet He knows what they conceal and what they reveal.", "He knows what they conceal and what they reveal"),
      difficulty: 3,
      questions: [
        { q: "What does Allah know, in 11:5?", a: "What they hide and show", wrong: ["Only what they say", "Only what they show", "Only the past"], why: "He knows what they conceal and what they reveal." },
        { q: "Allah knows the secrets of what?", a: "The hearts", wrong: ["The markets only", "The stars only", "The seas only"], why: "Verily, He is the All-Knower of the (innermost secrets) of the breasts." },
        { q: "Covering yourself with a garment hides you from Allah.", tf: false, why: "Even when they cover themselves with their garments, He knows what they conceal." }
      ]
    },
    {
      slug: "every-creatures-provision",
      title: "Provision for every creature",
      line: "Allah provides for every moving creature, big or small.",
      facts: ["He knows where each one lives", "And where each one dies"],
      quote: q11(6),
      source: ik(6, "Allah is responsible for the provision of every creature on earth, small or large, in the sea or on land. He knows where it lives and where it will die.", "He is responsible for the provisions of all the creatures that dwell in the earth"),
      difficulty: 3,
      questions: [
        { q: "Whose provision is Allah responsible for, in 11:6?", a: "Every moving creature", wrong: ["Only people", "Only birds", "Only the rich"], why: "No moving creature is there on earth but its provision is due from Allah." },
        { q: "What does its deposit mean, per Ibn Abbas?", a: "Where it will die", wrong: ["Where it eats", "Where it was born", "Where it plays"], why: "And its deposit: he said it means where it will die." },
        { q: "All of this is written in a Clear Book.", tf: true, why: "All is in a Clear Book." }
      ]
    },
    {
      slug: "throne-over-the-water",
      title: "His Throne over the water",
      line: "Heavens and earth in six Days, His Throne over the water.",
      facts: ["Allah was before everything", "He wrote all things in the Book"],
      quote: q11(7),
      source: hadith("bukhari", "3191", "Imran ibn Husain", "Sahih", "The people of Yemen asked the Prophet ﷺ how creation began. He said first there was nothing but Allah, His Throne was over the water, and He wrote everything in the Book.", "First of all, there was nothing but Allah"),
      difficulty: 3,
      questions: [
        { q: "In how many Days were the heavens and earth made, in 11:7?", a: "Six", wrong: ["Two", "Ten", "Forty"], why: "He it is Who has created the heavens and the earth in six Days." },
        { q: "Where was His Throne, in 11:7?", a: "Over the water", wrong: ["Under the earth", "On a mountain", "In a city"], why: "And His Throne was over the water." },
        { q: "The people of Yemen accepted the good news and asked how creation began.", tf: true, why: "We accept it, O Allah's Messenger! We have come to ask you about this matter." }
      ]
    },
    {
      slug: "best-in-deeds",
      title: "Best in deeds, not most deeds",
      line: "Allah tests who is best in deeds, not who does most.",
      facts: ["Sincere for Allah", "Done as the Prophet ﷺ taught"],
      quote: q11(7),
      source: ik(7, "Allah did not say most in deeds but best in deeds. A deed is only good when it is sincerely for Allah and follows the way of the Messenger ﷺ.", "A deed cannot be considered a good deed until it is done sincerely for Allah"),
      difficulty: 3,
      questions: [
        { q: "What are we tested on, in 11:7?", a: "Who is best in deeds", wrong: ["Who is richest", "Who is strongest", "Who lives longest"], why: "That He might try you, which of you is the best in deeds." },
        { q: "What two things make a deed good, per Ibn Kathir?", a: "Sincerity and the Sunnah", wrong: ["Speed and noise", "Wealth and fame", "Size and number"], why: "Done sincerely for Allah, and in accordance with the legislation of the Messenger ﷺ." },
        { q: "Allah said most in deeds, not best in deeds.", tf: false, why: "Allah did not say, which of you has done the most deeds. Rather, He said, best in deeds." }
      ]
    },
    {
      slug: "spend-and-i-will-spend",
      title: "Spend, and Allah spends on you",
      line: "Allah's Hand is full; spending does not lessen what He has.",
      facts: ["Spend and He spends on you", "His treasure never runs low"],
      quote: q11(7),
      source: hadith("bukhari", "4684", "Abu Hurairah", "Sahih", "Allah said: Spend, and I shall spend on you. His Hand is full, and all He has spent since creating the heavens and earth has not lessened it.", "Spend (O man), and I shall spend on you"),
      difficulty: 3,
      questions: [
        { q: "What did Allah say, in the hadith on 11:7?", a: "Spend and I will spend on you", wrong: ["Save and never give", "Give only once", "Spend only on yourself"], why: "Allah said, Spend (O man), and I shall spend on you." },
        { q: "What happens to Allah's Hand after all His spending?", a: "Nothing is decreased", wrong: ["Half is gone", "It runs out", "It needs refilling"], why: "What is in His Hand is not decreased, and His Throne was over the water." },
        { q: "That hadith also says His Throne was over the water.", tf: true, why: "Nevertheless, what is in His Hand is not decreased, and His Throne was over the water." }
      ]
    },
    {
      slug: "what-keeps-it-back",
      title: "They mocked: what holds it back?",
      line: "When punishment is delayed, deniers mock and ask why it waits.",
      facts: ["Delayed to a set term", "None can turn it away"],
      quote: q11(8),
      source: ik(8, "When Allah delays the punishment to a set term, the deniers mock and ask what keeps it back. On the day it comes, nothing will turn it away from them.", "nothing will turn it away from them"),
      difficulty: 3,
      questions: [
        { q: "What did deniers say when punishment was delayed, in 11:8?", a: "What keeps it back?", wrong: ["We repent now", "Thank you Allah", "We are afraid"], why: "They are sure to say, What keeps it back?" },
        { q: "What happens on the day it reaches them, in 11:8?", a: "Nothing turns it away", wrong: ["They escape it", "It is cancelled", "It turns to rain"], why: "Verily, on the day it reaches them, nothing will turn it away from them." },
        { q: "They will be surrounded by the very thing they mocked.", tf: true, why: "They will be surrounded by that at which they used to mock." }
      ]
    },
    {
      slug: "despair-and-boasting",
      title: "Despair in loss, pride in ease",
      line: "When blessings go, man despairs; when they return, he boasts.",
      facts: ["Hardship brings despair", "Ease brings showing off"],
      quote: q11(9),
      source: ik(9, "When hardship follows blessings, man despairs as if he never saw good. When ease follows hardship, he says the bad is gone for good, and he boasts.", "he is disheartened and he despairs of any good in the future"),
      difficulty: 4,
      questions: [
        { q: "What does man do when mercy is taken away, in 11:9?", a: "He despairs", wrong: ["He gives thanks", "He prays more", "He helps others"], why: "Verily, he is despairing, ungrateful." },
        { q: "What does man say when good returns, in 11:10?", a: "Ills have left me", wrong: ["Allah tested me", "I must give thanks", "I should give charity"], why: "He is sure to say: Ills have departed from me." },
        { q: "In ease, the ungrateful man becomes boastful toward others.", tf: true, why: "At the same time he is boastful towards others." }
      ]
    },
    {
      slug: "the-patient-are-different",
      title: "The patient are different",
      line: "The patient who do good get forgiveness and a great reward.",
      facts: ["Patience in hardship", "Thanks in blessings"],
      quote: q11(11),
      source: hadith("muslim", "2999", "Suhaib", "Sahih", "The affair of the believer is all good: if good comes to him, he is thankful, and if hardship comes, he is patient, and both are good for him.", "there is good in every affair of his"),
      difficulty: 4,
      questions: [
        { q: "Who is excepted from despair and boasting, in 11:11?", a: "The patient who do good", wrong: ["The rich who rest", "The loud who argue", "The strong who fight"], why: "Except those who show patience and do righteous good deeds." },
        { q: "What does the believer do when good comes, per the hadith?", a: "He gives thanks", wrong: ["He boasts", "He forgets Allah", "He despairs"], why: "If he has an occasion to feel delight, he thanks (God), thus there is a good for him in it." },
        { q: "For the believer, both ease and hardship can be good.", tf: true, why: "If he gets into trouble and endures it patiently, there is a good for him in it." }
      ]
    },
    {
      slug: "even-a-thorn-prick",
      title: "Even the prick of a thorn",
      line: "Every hurt a Muslim suffers wipes away some of his sins.",
      facts: ["Tiredness and sickness count", "So do worry and sadness"],
      quote: q11(11),
      source: hadith("bukhari", "5641", "Abu Sa'id al-Khudri and Abu Hurairah", "Sahih", "No tiredness, illness, sorrow, sadness, hurt or distress befalls a Muslim, not even a thorn prick, but Allah wipes away some of his sins for it.", "even if it were the prick he receives from a thorn"),
      difficulty: 4,
      questions: [
        { q: "What does a thorn prick do for a Muslim, per the hadith?", a: "Wipes away some sins", wrong: ["Nothing at all", "Adds to his sins", "Ends his prayers"], why: "Even if it were the prick he receives from a thorn, Allah expiates some of his sins." },
        { q: "Why are the patient forgiven, per Ibn Kathir on 11:11?", a: "For the hardships they faced", wrong: ["For their wealth", "For their fame", "For their family name"], why: "They will be forgiven due to the calamities that afflicted them." },
        { q: "Sadness and worry also wipe away a Muslim's sins.", tf: true, why: "No fatigue, nor disease, nor sorrow, nor sadness... but that Allah expiates some of his sins." }
      ]
    },
    {
      slug: "only-a-warner",
      title: "Do not let their words grieve you",
      line: "Allah comforted the Prophet ﷺ against their mocking words.",
      facts: ["He ﷺ is only a warner", "Messengers before were patient"],
      quote: q11(12),
      source: ik(12, "Allah comforted His Messenger ﷺ against the words of the idolaters. He is only a warner, and the Messengers before him were rejected yet stayed patient until help came.", "the previous Messengers were rejected and harmed, yet they were patient until the help of Allah came to them"),
      difficulty: 4,
      questions: [
        { q: "What did the idolaters demand, in 11:12?", a: "A treasure or an angel", wrong: ["A new city", "A river of milk", "A golden throne"], why: "Why has not a treasure been sent down unto him, or an angel come with him?" },
        { q: "What is the Prophet ﷺ, in 11:12?", a: "Only a warner", wrong: ["A king", "A guard over them", "A poet"], why: "But you are only a warner. And Allah is a Guardian over all things." },
        { q: "The Messengers before were also rejected and stayed patient.", tf: true, why: "The previous Messengers were rejected and harmed, yet they were patient until the help of Allah came to them." }
      ]
    },
    {
      slug: "bring-ten-surahs",
      title: "Bring ten surahs like it",
      line: "They called it made up, so Allah said: bring ten surahs.",
      facts: ["No one could answer", "Proof it is from Allah"],
      quote: q11(13),
      source: ik(13, "No one can produce anything like the Quran, not ten surahs and not even one, because the speech of the Lord is not like the speech of the creation.", "the Speech of the Lord of all that exists is not like the speech of the created beings"),
      difficulty: 4,
      questions: [
        { q: "How many surahs did Allah challenge them to bring, in 11:13?", a: "Ten", wrong: ["One hundred", "Two", "Fifty"], why: "Say: Bring you then ten forged Surahs like unto it." },
        { q: "What does their failure prove, in 11:14?", a: "It is sent down by Allah", wrong: ["It is a poem", "It is old stories", "It is magic"], why: "Know then that it is sent down with the knowledge of Allah." },
        { q: "The speech of Allah is not like the speech of created beings.", tf: true, why: "The Speech of the Lord of all that exists is not like the speech of the created beings." }
      ]
    },
    {
      slug: "deeds-for-this-world",
      title: "Deeds done only for this world",
      line: "Whoever wants only this world is paid here, not after.",
      facts: ["Showing off loses reward", "Believers get both lives"],
      quote: q11(15),
      source: ik(15, "Whoever does a good deed only for worldly gain is paid in this life, and the deed is lost in the next. The believer is rewarded in this life and the Hereafter.", "he will be rewarded for his good deeds in this life and in the Hereafter as well"),
      difficulty: 4,
      questions: [
        { q: "Where are worldly-minded people paid, in 11:15?", a: "In this world", wrong: ["Only in the grave", "In Paradise", "Never at all"], why: "To them We shall pay in full (the wages of) their deeds therein." },
        { q: "What happens to a deed done to show off, per Ibn Abbas?", a: "It is wasted", wrong: ["It doubles", "It is saved", "It becomes charity"], why: "His deed that he did is wasted because he was only seeking the life of this world." },
        { q: "A believer is rewarded in this life and in the Hereafter.", tf: true, why: "Concerning the believer, he will be rewarded for his good deeds in this life and in the Hereafter as well." }
      ]
    },
    {
      slug: "born-on-the-fitrah",
      title: "Every child born on the fitrah",
      line: "The believer stands on clear proof: the fitrah and the Quran.",
      facts: ["Fitrah: knowing Allah is One", "The Quran confirms it"],
      quote: q11(17),
      source: hadith("bukhari", "1385", "Abu Hurayrah", "Sahih", "Every child is born on the fitrah, worshipping Allah alone, and then his parents turn him to another religion.", "Every child is born with a true faith of Islam"),
      difficulty: 4,
      questions: [
        { q: "What is every child born upon, per the hadith?", a: "The fitrah", wrong: ["Doubt", "Sadness", "Forgetfulness"], why: "Every child is born with a true faith of Islam, to worship none but Allah alone." },
        { q: "What came before the Quran as guidance and mercy, in 11:17?", a: "The Book of Musa", wrong: ["Old poems", "The Psalms only", "No book at all"], why: "And before it, came the Book of Musa, a guidance and a mercy." },
        { q: "The fitrah accepts the Shari'ah and believes in it.", tf: true, why: "The Fitrah accepts the Shari'ah and believes in it." }
      ]
    },
    {
      slug: "the-quran-is-the-truth",
      title: "Have no doubt about it",
      line: "The Quran is the truth, yet most people do not believe.",
      facts: ["It reaches everyone", "No doubt in it"],
      quote: q11(17),
      source: ik(17, "The Quran is the truth from Allah, with no doubt in it. Its call reaches everyone, whatever their colour, look or nation.", "regardless of their differences in color, appearance, or nationality"),
      difficulty: 4,
      questions: [
        { q: "What does 11:17 say about most people?", a: "Most do not believe", wrong: ["All believe", "Most are scholars", "Most are rich"], why: "Verily, it is the truth from your Lord, but most of mankind believe not." },
        { q: "To whom does the Quran's call reach, per Ibn Kathir?", a: "Everyone it reaches", wrong: ["Only Arabs", "Only the rich", "Only kings"], why: "This applies to all whom the Qur'an reaches, regardless of their differences in color, appearance, or nationality." },
        { q: "Allah tells the reader to have no doubt about the Quran.", tf: true, why: "So be not in doubt about it. Verily, it is the truth from your Lord." }
      ]
    },
    {
      slug: "the-secret-talk",
      title: "Sins kept covered for the believer",
      line: "On that Day Allah covers the believer's sins and forgives them.",
      facts: ["The believer confesses alone", "Liars are named before all"],
      quote: q11(18),
      source: hadith("bukhari", "2441", "Safwan ibn Muhriz", "Sahih", "Allah brings the believer near and covers him, and he admits his sins. Allah says: I covered them in the world and I forgive them today. Of the liars, the witnesses say: these lied against their Lord.", "I did screen your sins in the world and I forgive them for you today"),
      difficulty: 5,
      questions: [
        { q: "What does Allah say to the believer, per the hadith?", a: "I covered them and forgive them", wrong: ["You are ruined", "Go back to the world", "Wait one more year"], why: "I did screen your sins in the world and I forgive them for you today." },
        { q: "What will the witnesses say about the liars, in 11:18?", a: "They lied against their Lord", wrong: ["They were kind", "They were forgotten", "They were travellers"], why: "These are the ones who lied against their Lord!" },
        { q: "The believer's sins are shown to all of creation.", tf: false, why: "He will conceal him from the people and make him confess to his sins." }
      ]
    },
    {
      slug: "the-greatest-losers",
      title: "The greatest losers",
      line: "Those who block Allah's path lose their own selves.",
      facts: ["Their false gods leave them", "They cannot escape Allah"],
      quote: q11(21),
      source: ik(21, "They lost their own selves, and the idols they invented besides Allah left them and did not help them at all.", "these things did not avail them in the slightest"),
      difficulty: 5,
      questions: [
        { q: "What do those in 11:19 want the path to be?", a: "Crooked", wrong: ["Straight", "Short", "Hidden"], why: "Those who hinder others from the path of Allah, and seek a crookedness therein." },
        { q: "What happens to what they invented, in 11:21?", a: "It leaves them", wrong: ["It saves them", "It helps them", "It speaks for them"], why: "And that which they invented eluded them." },
        { q: "The deniers can escape Allah somewhere on earth.", tf: false, why: "By no means will they escape on earth, nor have they protectors besides Allah!" }
      ]
    },
    {
      slug: "humble-before-their-lord",
      title: "Humble before their Lord",
      line: "Humble believers who do good live in Paradise forever.",
      facts: ["Heart believes, limbs act", "No death, age or sickness"],
      quote: q11(23),
      source: ik(23, "Their hearts believed and their limbs did good. In Paradise they will never die, grow old, fall sick or sleep, and they will see their Lord.", "They will not die, nor will they grow old"),
      difficulty: 5,
      questions: [
        { q: "Which three things are named in 11:23?", a: "Belief, good deeds, humility", wrong: ["Wealth, fame, power", "Travel, trade, rest", "Speed, size, strength"], why: "Those who believe and do righteous good deeds, and humble themselves before their Lord." },
        { q: "How long do they stay in Paradise, in 11:23?", a: "Forever", wrong: ["A thousand years", "Until they age", "One lifetime"], why: "They will be the dwellers of Paradise to dwell therein forever." },
        { q: "People in Paradise will grow old over time.", tf: false, why: "They will not die, nor will they grow old." }
      ]
    },
    {
      slug: "the-blind-and-the-seer",
      title: "The blind and the seer",
      line: "Deniers are like the blind and deaf; believers see and hear.",
      facts: ["Blind to the truth", "The believer tells truth from lies"],
      quote: q11(24),
      source: ik(24, "The disbeliever is blind to the truth and deaf to the proofs. The believer sees the truth, tells it apart from falsehood, and follows the good.", "He sees the truth and distinguishes between the truth and falsehood"),
      difficulty: 5,
      questions: [
        { q: "Who is like the blind and deaf, in 11:24?", a: "The disbelievers", wrong: ["The believers", "The angels", "The Prophets"], why: "The first group is like one who is blind and deaf." },
        { q: "What does the believer do, per Ibn Kathir on 11:24?", a: "Tells truth from falsehood", wrong: ["Follows any voice", "Ignores proofs", "Stays silent always"], why: "He sees the truth and distinguishes between the truth and falsehood." },
        { q: "The two groups are equal, according to 11:24.", tf: false, why: "Are they equal when compared? Will you not then take heed?" }
      ]
    }
  ]
};

export const HUD_UNITS: readonly DeepUnit[] = [HUD_ONE];
