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

/** Ayahs 25 to 49: Nuh calls his people, the ship, the Flood, his son, Mount Judi, and the news of the Unseen. */
const HUD_TWO: DeepUnit = {
  key: "hud2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-11",
  name: "Hud, ayahs 25 to 49",
  kind: "skill",
  lessonType: "surah",
  surahName: "Hud",
  lessons: [
    {
      slug: "nuh-the-plain-warner",
      title: "Nuh, a plain warner",
      line: "Nuh was the first Messenger sent to people who worshipped idols.",
      facts: ["He said: worship only Allah", "He feared a painful Day for them"],
      quote: q11(25),
      source: ik(25, "Nuh was the first Messenger Allah sent to the people of the earth after they began worshipping idols. He warned them openly of Allah's punishment.", "He was the first Messenger whom Allah sent to the people of the earth"),
      difficulty: 2,
      questions: [
        { q: "What did Nuh call himself, in 11:25?", a: "A plain warner", wrong: ["A great king", "A rich trader", "A poet"], why: "I have come to you as a plain warner." },
        { q: "What did Nuh fear for his people, in 11:26?", a: "The torment of a painful Day", wrong: ["A hard winter", "Losing their trade", "A long journey"], why: "Surely, I fear for you the torment of a painful Day." },
        { q: "Nuh was the first Messenger sent to people who worshipped idols.", tf: true, why: "He was the first Messenger whom Allah sent to the people of the earth who were polytheists." }
      ]
    },
    {
      slug: "the-weak-follow-the-truth",
      title: "The truth is not judged by its followers",
      line: "The chiefs mocked Nuh's followers as poor, but truth is truth.",
      facts: ["They called him a mere man", "Truth is noble in itself"],
      quote: q11(27),
      source: ik(27, "Truth is not rejected because its followers are poor. The followers of the truth are the noble ones, even if poor, and its rejecters are lowly, even if rich.", "the followers of the truth are the noble ones, even though they may be poor"),
      difficulty: 2,
      questions: [
        { q: "What did the chiefs say about Nuh, in 11:27?", a: "A man like ourselves", wrong: ["An angel from the sky", "A king of kings", "A great magician"], why: "We see you but a man like ourselves." },
        { q: "Who are the truly noble, per Ibn Kathir?", a: "Followers of the truth", wrong: ["The richest people", "The loudest people", "The oldest families"], why: "The followers of the truth are the noble ones, even though they may be poor." },
        { q: "The truth should be rejected if poor people follow it.", tf: false, why: "Verily, the truth is not to be rejected because of the lowly status of those who follow it." }
      ]
    },
    {
      slug: "the-poor-follow-messengers",
      title: "The poor follow the Messengers",
      line: "An emperor asked: do nobles or the poor follow him ﷺ?",
      facts: ["The answer: the poor", "So it was with all Messengers"],
      quote: q11(27),
      source: hadith("bukhari", "7", "Ibn Abbas", "Sahih", "Heraclius asked Abu Sufyan whether the nobles or the poor followed the Prophet ﷺ. He answered that the poor followed him, and Heraclius said such are the followers of Messengers.", "It is the poor who follow him"),
      difficulty: 2,
      questions: [
        { q: "Who mostly followed the Prophet ﷺ, per the answer to Heraclius?", a: "The poor", wrong: ["The kings", "The rich merchants", "The soldiers"], why: "Do the nobles or the poor follow him? I replied, It is the poor who follow him." },
        { q: "Who mocked Nuh's followers as the lowest, in 11:27?", a: "The chiefs of his people", wrong: ["The children", "The travellers", "The farmers"], why: "The chiefs who disbelieved among his people said... the meanest among us." },
        { q: "Heraclius also asked if the followers were growing in number.", tf: true, why: "He said, Are his followers increasing or decreasing? I replied, They are increasing." }
      ]
    },
    {
      slug: "no-forcing-the-truth",
      title: "Faith cannot be forced",
      line: "Nuh had clear proof, but would not force it on haters.",
      facts: ["A mercy hidden from their eyes", "They rushed to deny it"],
      quote: q11(28),
      source: ik(28, "Nuh had clear proof and prophethood, a mercy from Allah. They could not see it and rushed to deny it, and he asked: should we force it on you while you hate it?", "Should we force you to accept it, while you actually detest it"),
      difficulty: 3,
      questions: [
        { q: "What did Nuh have from his Lord, in 11:28?", a: "A clear proof", wrong: ["A great army", "A palace", "A treasure chest"], why: "Tell me, if I have a clear proof from my Lord." },
        { q: "Why did they reject the mercy, per Ibn Kathir?", a: "It was hidden from their sight", wrong: ["It was too heavy", "It came at night", "It was in Persian"], why: "It was hidden from you and you are not guided to it." },
        { q: "Nuh said he would force them to accept faith.", tf: false, why: "Shall we compel you to accept it when you have a strong hatred for it?" }
      ]
    },
    {
      slug: "no-wage-for-the-message",
      title: "No wage for the message",
      line: "Nuh asked no money, and would not drive the believers away.",
      facts: ["His reward is from Allah", "The poor believers stay"],
      quote: q11(29),
      source: ik(29, "Nuh asked no payment for his advice; he sought reward only from Allah. The chiefs wanted him to send the poor believers away, and he refused.", "I am only seeking the reward from Allah"),
      difficulty: 3,
      questions: [
        { q: "What did Nuh ask for in return, in 11:29?", a: "No wealth at all", wrong: ["A share of crops", "Gold and silver", "A house"], why: "O my people! I ask of you no wealth for it, my reward is from none but Allah." },
        { q: "What did the chiefs want Nuh to do with the believers?", a: "Drive them away", wrong: ["Make them chiefs", "Give them money", "Teach them poetry"], why: "I am not going to drive away those who have believed." },
        { q: "The Quraysh asked the Prophet ﷺ for something similar.", tf: true, why: "They wanted the Prophet ﷺ to sit with them in a special gathering of the elite." }
      ]
    },
    {
      slug: "no-treasures-no-unseen",
      title: "No treasures, no Unseen, no angel",
      line: "Nuh claimed no treasures, no Unseen, and no angel nature.",
      facts: ["A human Messenger", "Allah knows what is in hearts"],
      quote: q11(31),
      source: ik(31, "Nuh had no power over Allah's treasures and no knowledge of the Unseen except what Allah let him know. He was not an angel but a human Messenger aided with miracles.", "he is merely a human Messenger aided with miracles"),
      difficulty: 3,
      questions: [
        { q: "Which claim did Nuh deny making, in 11:31?", a: "That he was an angel", wrong: ["That Allah is One", "That he was a warner", "That he feared for them"], why: "Nor do I say I am an angel." },
        { q: "Who knows what is in the believers' hearts, per 11:31?", a: "Allah", wrong: ["The chiefs", "The crowd", "No one at all"], why: "Allah knows what is in their inner selves." },
        { q: "Nuh said he had the treasures of Allah with him.", tf: false, why: "And I do not say to you that with me are the treasures of Allah." }
      ]
    },
    {
      slug: "bring-what-you-threaten",
      title: "Bring what you threaten us with",
      line: "They dared Nuh to bring punishment; only Allah brings it.",
      facts: ["They were tired of his calls", "None escapes Allah"],
      quote: q11(32),
      source: ik(32, "The people told Nuh he had argued too long and dared him to bring the punishment. He said only Allah brings it, and nothing escapes Him.", "It is only Allah Who can punish you and hasten your punishment for you"),
      difficulty: 3,
      questions: [
        { q: "What did his people dare Nuh to do, in 11:32?", a: "Bring the punishment", wrong: ["Leave the town", "Build a palace", "Stop praying"], why: "Now bring upon us what you threaten us with, if you are of the truthful." },
        { q: "Who brings the punishment, per Nuh in 11:33?", a: "Only Allah", wrong: ["Nuh himself", "The chiefs", "The angels by choice"], why: "Only Allah will bring it on you, if He wills, and then you will escape not." },
        { q: "Nuh said his advice cannot help those Allah leaves astray.", tf: true, why: "And my advice will not profit you... if Allah's will is to keep you astray." }
      ]
    },
    {
      slug: "upon-me-be-my-crime",
      title: "A pause in the middle of the story",
      line: "Mid-story, Allah answers those who said he ﷺ made it up.",
      facts: ["The sin would be his alone", "The story is not invented"],
      quote: q11(35),
      source: ik(35, "In the middle of Nuh's story, Allah answers the Makkans who said the Prophet ﷺ invented it: if he had, the sin would be his. The story is true and not made up.", "This is presented in the middle of the story to affirm the story itself"),
      difficulty: 3,
      questions: [
        { q: "What did the Makkans claim, in 11:35?", a: "He made it up", wrong: ["He was a king", "He was an angel", "He was rich"], why: "Or they say: He has fabricated it." },
        { q: "Why does 11:35 come mid-story, per Ibn Kathir?", a: "To affirm the story is true", wrong: ["To end the surah", "To start a new surah", "To change the subject"], why: "This is presented in the middle of the story to affirm the story itself." },
        { q: "The Prophet ﷺ said: if I made it up, the sin is mine.", tf: true, why: "Say: If I have fabricated it, upon me be my crimes." }
      ]
    },
    {
      slug: "build-the-ship",
      title: "Build the ship under Our Eyes",
      line: "Allah told Nuh no more would believe, and to build the ship.",
      facts: ["Built under Allah's watch", "Taught by revelation"],
      quote: q11(37),
      source: ik(36, "Allah revealed to Nuh that no more of his people would believe, so he should not grieve. He was to build the ship under Allah's sight, with Allah teaching him how.", "We will teach you (Nuh) what to do"),
      difficulty: 3,
      questions: [
        { q: "What did Allah tell Nuh, in 11:36?", a: "No more of them will believe", wrong: ["All will believe soon", "Leave the land", "Stop calling them"], why: "None of your people will believe except those who have believed already." },
        { q: "How was the ship built, in 11:37?", a: "Under Our Eyes and revelation", wrong: ["By the chiefs", "In secret at night", "From stone"], why: "And construct the ship under Our Eyes and with Our revelation." },
        { q: "Nuh was told to plead for the wrongdoers.", tf: false, why: "And address Me not on behalf of those who did wrong; they are surely to be drowned." }
      ]
    },
    {
      slug: "they-mocked-the-ship",
      title: "They laughed at the ship",
      line: "Each time the chiefs passed the ship, they mocked Nuh.",
      facts: ["They denied any flood", "Soon they would know"],
      quote: q11(38),
      source: ik(38, "Whenever the chiefs passed by, they mocked Nuh and denied his warning of the flood. He warned that they would soon know who would be disgraced.", "they teased him and rejected his threat that they would drown"),
      difficulty: 3,
      questions: [
        { q: "What did the chiefs do as they passed, in 11:38?", a: "They mocked him", wrong: ["They helped him", "They brought wood", "They prayed with him"], why: "Whenever the chiefs of his people passed by him, they mocked at him." },
        { q: "What would come on the deniers, in 11:39?", a: "A disgracing torment", wrong: ["A rich harvest", "A peaceful life", "A great feast"], why: "A torment that will cover him with disgrace and on whom will fall a lasting torment." },
        { q: "The chiefs believed a flood was coming.", tf: false, why: "They teased him and rejected his threat that they would drown." }
      ]
    },
    {
      slug: "the-earth-gushed-water",
      title: "Water burst from the earth",
      line: "When the command came, water gushed from the face of the earth.",
      facts: ["Rain poured from the sky", "Pairs of each kind boarded"],
      quote: q11(40),
      source: ik(40, "Ibn Abbas said At-Tannur is the face of the earth: the whole earth burst into springs, even places where fire is lit. Nuh loaded a pair of every kind of creature.", "the face of the earth became gushing water springs"),
      difficulty: 4,
      questions: [
        { q: "What does At-Tannur mean, per Ibn Abbas?", a: "The face of the earth", wrong: ["A tall mountain", "A big river", "The sky"], why: "At-Tannur is the face of the earth." },
        { q: "How many of each kind went on the ship, in 11:40?", a: "Two, a male and a female", wrong: ["Ten of each", "One of each", "Only birds"], why: "Embark therein, of each kind two (male and female)." },
        { q: "The heavens poured and the earth gushed, and the waters met.", tf: true, why: "So the waters (of the heaven and the earth) met for a matter predestined. (54:12)" }
      ]
    },
    {
      slug: "only-a-few-believed",
      title: "Only a few believed",
      line: "After 950 years of calling, only a few believed with Nuh.",
      facts: ["About eighty people", "With their women"],
      quote: q11(40),
      source: ik(40, "Only a very small number believed, even after Nuh lived among them for nine hundred and fifty years. Ibn Abbas said they were about eighty people with their women.", "nine hundred and fifty years"),
      difficulty: 4,
      questions: [
        { q: "How long did Nuh call his people, per Ibn Kathir?", a: "950 years", wrong: ["50 years", "10 years", "500 years"], why: "Even after the long period of time that he (Nuh) was among them – nine hundred and fifty years." },
        { q: "How many believed with Nuh, per Ibn Abbas?", a: "About eighty", wrong: ["Ten thousand", "Only one", "Half the people"], why: "They were eighty people including their women." },
        { q: "Most of Nuh's people believed in the end.", tf: false, why: "And none believed with him, except a few." }
      ]
    },
    {
      slug: "in-the-name-of-allah",
      title: "In the Name of Allah it sails",
      line: "Nuh said: in Allah's Name is its sailing and its anchoring.",
      facts: ["Say Bismillah before things", "Even when you ride"],
      quote: q11(41),
      source: ik(41, "The ship's sailing and anchoring were by the Name of Allah. So it is preferred to say Bismillah at the start of every matter, including boarding a ship or a mount.", "it is preferred to mention the Name of Allah (Bismillah) at the beginning of all affairs"),
      difficulty: 4,
      questions: [
        { q: "What did Nuh say on boarding, in 11:41?", a: "In the Name of Allah", wrong: ["Good luck to us", "Hurry, hurry", "We are strong"], why: "Embark therein: in the Name of Allah will be its course and its anchorage." },
        { q: "When is Bismillah preferred, per Ibn Kathir?", a: "At the start of all affairs", wrong: ["Only at night", "Only in Ramadan", "Only when sad"], why: "It is preferred to mention the Name of Allah (Bismillah) at the beginning of all affairs." },
        { q: "Nuh called Allah Oft-Forgiving, Most Merciful as they set sail.", tf: true, why: "Surely, my Lord is Oft-Forgiving, Most Merciful." }
      ]
    },
    {
      slug: "the-riding-dua",
      title: "The prayer for riding",
      line: "The Prophet ﷺ praised Allah who made rides serve us.",
      facts: ["Bismillah, then Alhamdulillah", "Then ask forgiveness"],
      quote: q11(41),
      source: hadith("abudawud", "2602", "Ali ibn Rabi'ah", "Sahih", "On mounting a ride he said Bismillah, then Alhamdulillah, then: Glory be to Him who made this serve us, and to our Lord we return. He said the Prophet ﷺ did the same.", "Glory be to Him Who has made this subservient to us"),
      difficulty: 4,
      questions: [
        { q: "What is said first when mounting, per the hadith?", a: "In the name of Allah", wrong: ["Goodbye", "Let us race", "Nothing at all"], why: "When he put his foot in the stirrup, he said: In the name of Allah." },
        { q: "Who made the ride serve us, per the dua?", a: "Allah", wrong: ["The rider", "The trader", "The animal itself"], why: "Glory be to Him Who has made this subservient to us, for we had not the strength." },
        { q: "The dua ends by asking Allah's forgiveness.", tf: true, why: "Glory be to Thee, I have wronged myself, so forgive me, for only Thou forgivest sins." }
      ]
    },
    {
      slug: "no-mountain-saves",
      title: "No mountain could save him",
      line: "Nuh called his son aboard; he ran to a mountain and drowned.",
      facts: ["Waves like mountains", "None saved but by mercy"],
      quote: q11(43),
      source: ik(43, "The son thought the flood would not reach the mountain tops. Nuh told him nothing is saved that day from Allah's command except whom He shows mercy.", "nothing will be saved today from the command of Allah"),
      difficulty: 4,
      questions: [
        { q: "What were the waves like, in 11:42?", a: "Like mountains", wrong: ["Like small ripples", "Like a calm lake", "Like sand"], why: "So it sailed with them amidst waves like mountains." },
        { q: "Where did the son think he would be safe, in 11:43?", a: "On a mountain", wrong: ["In a cave", "In a tower", "In the desert"], why: "I will betake myself to some mountain, it will save me from the water." },
        { q: "That day, only those Allah showed mercy were saved.", tf: true, why: "This day there is no savior from the decree of Allah except him on whom He has mercy." }
      ]
    },
    {
      slug: "the-ship-rests-on-judi",
      title: "The ship rests on Judi",
      line: "The earth swallowed its water and the sky held its rain.",
      facts: ["The water went down", "The ship rested on Judi"],
      quote: q11(44),
      source: ik(44, "Allah commanded the earth to swallow its water and the sky to stop raining. The water went down and the ship came to rest on Mount Judi.", "He commanded the earth to swallow its water"),
      difficulty: 4,
      questions: [
        { q: "What was the earth told to do, in 11:44?", a: "Swallow its water", wrong: ["Shake hard", "Grow trees", "Split open"], why: "O earth! Swallow up your water, and O sky! Withhold your rain." },
        { q: "Where did the ship rest, in 11:44?", a: "On Mount Judi", wrong: ["On Mount Sinai", "In Makkah", "On an island"], why: "And it rested on (Mount) Judi." },
        { q: "The sky was told to keep raining.", tf: false, why: "And O sky! Withhold (your rain)." }
      ]
    },
    {
      slug: "not-of-your-family",
      title: "He is not of your family",
      line: "Nuh asked about his son; the promise was for believers.",
      facts: ["His deeds were not righteous", "Ask not without knowledge"],
      quote: q11(46),
      source: ik(45, "Allah promised to save Nuh's family who believed. His son disbelieved and opposed his father, so he was not among those promised to be saved.", "I only promised you that I would save those of your family who believe"),
      difficulty: 5,
      questions: [
        { q: "What did Nuh say to his Lord, in 11:45?", a: "My son is of my family", wrong: ["Punish my son", "Forget my son", "My son is a king"], why: "O my Lord! Verily, my son is of my family!" },
        { q: "Why was the son not of his family, in 11:46?", a: "His deeds were unrighteous", wrong: ["He was too young", "He lived far away", "He was a stranger"], why: "Surely, he is not of your family; verily, his work is unrighteous." },
        { q: "The promise was to save the believers of Nuh's family.", tf: true, why: "I only promised you that I would save those of your family who believe." }
      ]
    },
    {
      slug: "nuh-seeks-refuge",
      title: "Nuh seeks refuge and forgiveness",
      line: "Nuh sought refuge from asking without knowledge.",
      facts: ["He turned back at once", "He asked forgiveness"],
      quote: q11(47),
      source: ik(47, "Nuh said: O my Lord, I seek refuge with You from asking what I have no knowledge of. Unless You forgive me and have mercy on me, I will be among the losers.", "I seek refuge with You from asking You that of which I have no knowledge"),
      difficulty: 5,
      questions: [
        { q: "What did Nuh seek refuge from, in 11:47?", a: "Asking without knowledge", wrong: ["The cold wind", "His people", "The deep sea"], why: "O my Lord! I seek refuge with You from asking You that of which I have no knowledge." },
        { q: "Without Allah's forgiveness, what would Nuh be?", a: "Among the losers", wrong: ["Among the kings", "Among the rich", "Among the poets"], why: "And unless You forgive me and have mercy on me, I would indeed be one of the losers." },
        { q: "Nuh argued back after Allah answered him.", tf: false, why: "Nuh said: O my Lord! I seek refuge with You from asking You that of which I have no knowledge." }
      ]
    },
    {
      slug: "down-with-peace",
      title: "Come down with peace",
      line: "Nuh and the believers came down with peace and blessings.",
      facts: ["Peace for every believer after", "Later nations would deny"],
      quote: q11(48),
      source: ik(48, "When the ship rested, peace was sent on Nuh and the believers with him, and on every believer from their children until the Day of Resurrection.", "This salutation was also for every believer from his progeny until the Day of Resurrection"),
      difficulty: 5,
      questions: [
        { q: "With what did Nuh come down, in 11:48?", a: "Peace and blessings", wrong: ["Anger and fear", "Gold and silver", "Swords and shields"], why: "O Nuh! Come down with peace from Us and blessings on you." },
        { q: "Whom does that peace include, per Ibn Kathir?", a: "Every believer after them", wrong: ["Only Nuh", "Only the animals", "Only his ship"], why: "This salutation was also for every believer from his progeny until the Day of Resurrection." },
        { q: "Some later nations would enjoy life, then face torment.", tf: true, why: "But there will be other people to whom We shall grant their pleasures, but in the end a painful torment." }
      ]
    },
    {
      slug: "nuh-on-judgement-day",
      title: "Witnesses for Nuh",
      line: "On the Last Day, this Ummah testifies for Nuh.",
      facts: ["His people will deny it", "The Ummah testifies for him"],
      quote: q11(49),
      source: hadith("bukhari", "4487", "Abu Sa'id al-Khudri", "Sahih", "On the Day of Resurrection, Nuh will say he delivered the message, and his people will deny it. The Prophet ﷺ and his followers will testify that Nuh did deliver it.", "Did you convey the Message?"),
      difficulty: 5,
      questions: [
        { q: "What will Nuh's people say on that Day, per the hadith?", a: "No warner came to us", wrong: ["We believed him", "We were busy", "We forgot"], why: "They will say, No Warner came to us." },
        { q: "Who will testify for Nuh, per the hadith?", a: "This Ummah", wrong: ["His son", "The chiefs", "No one"], why: "Muhammad and his followers. So they will testify that he conveyed the Message." },
        { q: "Nuh will say that he conveyed the message.", tf: true, why: "Allah will say, Did you convey the Message? He will say, Yes." }
      ]
    },
    {
      slug: "news-of-the-unseen",
      title: "News of the Unseen",
      line: "News of the Unseen: be patient, the end is for the pious.",
      facts: ["No one knew it before", "Help comes to Messengers"],
      quote: q11(49),
      source: ik(49, "Allah revealed these stories as they happened, though neither the Prophet ﷺ nor his people knew them before. So be patient: the good end is for those with taqwa.", "Then, We will make the (good) end for you and those who follow you"),
      difficulty: 5,
      questions: [
        { q: "What are these stories, in 11:49?", a: "News of the Unseen", wrong: ["Old poems", "Market tales", "Dreams"], why: "This is of the news of the Unseen which We reveal unto you." },
        { q: "For whom is the good end, in 11:49?", a: "Those who have taqwa", wrong: ["The richest", "The strongest", "The oldest"], why: "So be patient. Surely, the (good) end is for those who have Taqwa." },
        { q: "The Prophet ﷺ and his people knew these stories before.", tf: false, why: "Neither you nor your people knew it before this." }
      ]
    }
  ]
};

/** Ayahs 50 to 68: Hud and the people of 'Ad, then Salih, the she-camel and the people of Thamud. */
const HUD_THREE: DeepUnit = {
  key: "hud3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-11",
  name: "Hud, ayahs 50 to 68",
  kind: "skill",
  lessonType: "surah",
  surahName: "Hud",
  lessons: [
    {
      slug: "hud-sent-to-aad",
      title: "Hud is sent to 'Ad",
      line: "Allah sent Hud to his people 'Ad: worship Allah alone.",
      facts: ["Their idols were made-up names", "He asked them for no wage"],
      quote: q11(50),
      source: ik(50, "Hud told 'Ad to worship Allah alone and leave the idols they named as gods. He asked them for no reward; his reward was only from the One who created him.", "He only sought his reward from Allah, the One Who created him"),
      difficulty: 2,
      questions: [
        { q: "To which people was Hud sent, in 11:50?", a: "'Ad", wrong: ["Thamud", "Madyan", "Quraysh"], why: "And to the 'Ad (people We sent) their brother Hud." },
        { q: "Whom did Hud say his reward was from, in 11:51?", a: "The One who created him", wrong: ["The chiefs of 'Ad", "The traders", "His family"], why: "My reward is only from Him Who created me." },
        { q: "Hud called his people to worship Allah with no partner.", tf: true, why: "Hud came to them commanding them to worship Allah alone, without any associates." }
      ]
    },
    {
      slug: "repent-for-rain-and-strength",
      title: "Repent, and rain will come",
      line: "Hud promised rain and strength to those who repent.",
      facts: ["Forgiveness for the past", "Repentance for the future"],
      quote: q11(52),
      source: ik(52, "Whoever seeks forgiveness and repents, Allah makes his provision easy, eases his affairs and guards him. So Hud promised them abundant rain.", "Allah will make his sustenance easy for him, grant him ease in his affairs"),
      difficulty: 2,
      questions: [
        { q: "What did Hud promise if they repented, in 11:52?", a: "Abundant rain", wrong: ["Gold mines", "A new king", "Long winters"], why: "He will send you (from the sky) abundant rain." },
        { q: "What else would Allah add, in 11:52?", a: "Strength to their strength", wrong: ["Years to their age", "Land to the sea", "Stars to the sky"], why: "And add strength to your strength, so do not turn away as criminals." },
        { q: "Seeking forgiveness can make provision easier.", tf: true, why: "Allah will make his sustenance easy for him, grant him ease in his affairs." }
      ]
    },
    {
      slug: "our-gods-made-you-mad",
      title: "They said: our gods struck you",
      line: "'Ad said their idols had made Hud mad.",
      facts: ["They asked for proof", "Idols cannot harm or help"],
      quote: q11(54),
      source: ik(54, "They said some of their idols had struck Hud with madness for defaming them. Yet the idols could not hear, see, help or harm anyone.", "these idols were inanimate objects that could not hear, see, befriend, or make enmity"),
      difficulty: 3,
      questions: [
        { q: "What did 'Ad claim about Hud, in 11:54?", a: "Their gods made him mad", wrong: ["He was a king", "He was an angel", "He was rich"], why: "All that we say is that some of our gods have seized you with evil (madness)." },
        { q: "What could their idols do, per Ibn Kathir?", a: "Nothing at all", wrong: ["Send rain", "Heal the sick", "Give strength"], why: "These idols were inanimate objects that could not hear, see, befriend, or make enmity." },
        { q: "Hud declared himself free of everything they worshipped besides Allah.", tf: true, why: "I call Allah to witness and bear you witness that I am free from that which you ascribe as partners." }
      ]
    },
    {
      slug: "every-forelock-in-his-grasp",
      title: "Every forelock in His grasp",
      line: "Hud trusted Allah, who holds every creature by its forelock.",
      facts: ["Plot all of you, said Hud", "Allah is on the straight path"],
      quote: q11(56),
      source: ik(56, "Every creature is under Allah's power and authority. He is the Best Judge, the Most Just, and He never wrongs anyone in His judgment.", "He is the Best Judge, the Most Just"),
      difficulty: 3,
      questions: [
        { q: "In whom did Hud put his trust, in 11:56?", a: "Allah, his Lord and theirs", wrong: ["His strong tribe", "The idols", "His wealth"], why: "I put my trust in Allah, my Lord and your Lord!" },
        { q: "What does Allah hold of every creature, in 11:56?", a: "Its forelock", wrong: ["Its shadow", "Its food only", "Its house"], why: "There is not a moving creature but He has the grasp of its forelock." },
        { q: "Hud challenged them and their gods to plot against him.", tf: true, why: "So plot against me, all of you, and give me no respite." }
      ]
    },
    {
      slug: "aad-and-the-wind",
      title: "The wind that ended 'Ad",
      line: "Hud and the believers were saved; 'Ad was destroyed by a wind.",
      facts: ["A barren wind", "Saved by Allah's mercy"],
      quote: q11(58),
      source: hadith("bukhari", "1035", "Ibn Abbas", "Sahih", "The Prophet ﷺ said he was given victory by the east wind, and the people of 'Ad were destroyed by the west wind.", "I was granted victory with As-Saba"),
      difficulty: 3,
      questions: [
        { q: "Who was saved, in 11:58?", a: "Hud and the believers", wrong: ["The chiefs", "No one", "Only the rich"], why: "We saved Hud and those who believed with him by a mercy from Us." },
        { q: "What destroyed 'Ad, per the hadith?", a: "A wind", wrong: ["A flood", "An earthquake", "A fire"], why: "The nation of 'Ad was destroyed by Ad-Dabur (westerly wind)." },
        { q: "Hud and the believers were saved by Allah's mercy.", tf: true, why: "We saved Hud and those who believed with him by a mercy from Us." }
      ]
    },
    {
      slug: "denying-one-messenger",
      title: "Denying one Messenger is denying all",
      line: "Rejecting Hud counted as rejecting all the Messengers.",
      facts: ["They followed proud tyrants", "A curse followed them"],
      quote: q11(59),
      source: ik(59, "Whoever disbelieves in one Prophet has disbelieved in all of them, since belief in all of them is required. 'Ad followed every proud, stubborn leader instead.", "whoever disbelieves in a Prophet, then verily, he has disbelieved in all of the Prophets"),
      difficulty: 3,
      questions: [
        { q: "Whom did 'Ad disobey, in 11:59?", a: "His Messengers", wrong: ["Their kings", "Their parents", "Their guests"], why: "They rejected the Ayat of their Lord and disobeyed His Messengers." },
        { q: "Whom did 'Ad follow instead, in 11:59?", a: "Every proud, stubborn one", wrong: ["The humble poor", "The Prophets", "The scholars"], why: "And followed the command of every proud, obstinate (oppressor of the truth)." },
        { q: "Rejecting one Prophet counts as rejecting all of them.", tf: true, why: "Whoever disbelieves in a Prophet, then verily, he has disbelieved in all of the Prophets." }
      ]
    },
    {
      slug: "salih-sent-to-thamud",
      title: "Salih is sent to Thamud",
      line: "Thamud lived in rock-cut homes; Salih called them to Allah.",
      facts: ["Between Tabuk and Madinah", "Made from the earth"],
      quote: q11(61),
      source: ik(61, "Thamud lived in cities carved from rock between Tabuk and Madinah, after 'Ad. Salih told them Allah made them from the earth and settled them in it.", "living in cities carved from the rocks, between Tabuk and Al-Madinah"),
      difficulty: 3,
      questions: [
        { q: "To which people was Salih sent, in 11:61?", a: "Thamud", wrong: ["'Ad", "Madyan", "Saba"], why: "And to Thamud (people We sent) their brother Salih." },
        { q: "Where did Thamud live, per Ibn Kathir?", a: "Between Tabuk and Madinah", wrong: ["In Yemen", "In Egypt", "By the Nile"], why: "Living in cities carved from the rocks, between Tabuk and Al-Madinah." },
        { q: "Thamud lived before the people of 'Ad.", tf: false, why: "They lived after the people of 'Ad." }
      ]
    },
    {
      slug: "my-lord-is-near",
      title: "My Lord is Near and Responsive",
      line: "Salih said: seek forgiveness, for my Lord is Near and answers.",
      facts: ["Near by His knowledge", "Do not lose patience in dua"],
      quote: q11(61),
      source: hadith("muslim", "2735", "Abu Hurairah", "Sahih", "A person's supplication is answered as long as he does not grow impatient and say: I prayed, but it was not answered.", "The supplication of every one of you is granted if he does not grow impatient"),
      difficulty: 4,
      questions: [
        { q: "How did Salih describe his Lord, in 11:61?", a: "Near and Responsive", wrong: ["Far and silent", "Angry and harsh", "Busy and away"], why: "Certainly, my Lord is Near (to all by His knowledge), Responsive." },
        { q: "What stops a dua from being answered, per the hadith?", a: "Growing impatient", wrong: ["Praying quietly", "Praying at night", "Praying in Arabic"], why: "The supplication of every one of you is granted if he does not grow impatient." },
        { q: "Saying I prayed but got no answer can block a dua.", tf: true, why: "Is granted if he does not grow impatient and says: I supplicated but it was not granted." }
      ]
    },
    {
      slug: "you-were-our-hope",
      title: "You were our hope until now",
      line: "Thamud said Salih was their hope, until he spoke on idols.",
      facts: ["They clung to their fathers' ways", "Salih stood on clear proof"],
      quote: q11(62),
      source: ik(62, "They said they had hoped much from Salih's sharp mind until he forbade what their fathers worshipped. Salih said he was on clear proof and could not leave his call.", "We had hope in your strong intellect before you began saying what you have said"),
      difficulty: 4,
      questions: [
        { q: "How did Thamud see Salih before his call, in 11:62?", a: "As their hope", wrong: ["As a stranger", "As a thief", "As a poet"], why: "You have been among us as a figure of good hope until this!" },
        { q: "Why did they refuse, in 11:62?", a: "Their fathers worshipped idols", wrong: ["Salih was poor", "Salih was young", "Salih was far away"], why: "Do you forbid us the worship of what our fathers have worshipped?" },
        { q: "Salih said leaving his call would only bring him loss.", tf: true, why: "Then you increase me not but in loss." }
      ]
    },
    {
      slug: "the-she-camel-of-allah",
      title: "The she-camel of Allah",
      line: "They killed the she-camel, their sign, and had three days left.",
      facts: ["Leave her to graze", "Three days to enjoy"],
      quote: q11(64),
      source: ik(64, "The she-camel of Allah was a sign for Thamud, and they were told to leave her to graze. They killed her, and Salih told them they had three days left.", "This she-camel of Allah is a sign to you"),
      difficulty: 4,
      questions: [
        { q: "What was Thamud told to do with the she-camel, in 11:64?", a: "Leave her to graze", wrong: ["Ride her to war", "Sell her", "Lock her away"], why: "So leave her to graze in Allah's land, and touch her not with evil." },
        { q: "How many days were they given after killing her, in 11:65?", a: "Three", wrong: ["Seven", "Forty", "One hundred"], why: "Enjoy yourselves in your homes for three days." },
        { q: "Thamud left the she-camel unharmed.", tf: false, why: "But they harmed her, so he gave them three days." }
      ]
    },
    {
      slug: "the-awful-cry",
      title: "The awful cry",
      line: "A mighty cry seized the wrongdoers; the believers were saved.",
      facts: ["Saved from that Day's disgrace", "As if they never lived there"],
      quote: q11(67),
      source: ik(66, "When the command came, Allah saved Salih and those who believed with him by His mercy, and the awful cry overtook the wrongdoers in their homes.", "We saved Salih and those who believed with him by a mercy from Us"),
      difficulty: 4,
      questions: [
        { q: "What seized the wrongdoers of Thamud, in 11:67?", a: "An awful cry", wrong: ["A flood", "A wind", "A fire"], why: "And As-Sayhah (awful cry) overtook the wrongdoers." },
        { q: "How did they look afterwards, in 11:68?", a: "As if they never lived there", wrong: ["Rich and happy", "Busy at work", "Sleeping safely"], why: "As if they had never lived there." },
        { q: "Allah saved Salih and the believers with him.", tf: true, why: "We saved Salih and those who believed with him by a mercy from Us." }
      ]
    },
    {
      slug: "passing-their-ruins",
      title: "Passing their ruins with tears",
      line: "Passing Thamud's ruins, the Prophet ﷺ said: enter only weeping.",
      facts: ["He covered his head", "He hurried through the valley"],
      quote: q11(68),
      source: hadith("bukhari", "4419", "Ibn Umar", "Sahih", "Passing Al-Hijr, the Prophet ﷺ said not to enter the homes of those who wronged themselves except weeping, lest the same thing strike you. He covered his head and hurried on.", "unless you enter in a weeping state"),
      difficulty: 5,
      questions: [
        { q: "How should one pass the ruins of the punished, per the hadith?", a: "Weeping", wrong: ["Laughing", "Shopping", "Camping there"], why: "Do not enter the dwelling places of those people who were unjust to themselves unless you enter in a weeping state." },
        { q: "What did the Prophet ﷺ do in that valley?", a: "Hurried through it", wrong: ["Stayed a week", "Built a house", "Held a feast"], why: "Then he covered his head and made his speed fast till he crossed the valley." },
        { q: "Al-Hijr is where Thamud lived.", tf: true, why: "Thamud lived in cities carved from the rocks, between Tabuk and Al-Madinah." }
      ]
    }
  ]
};

/** Ayahs 69 to 83: the angels visit Ibrahim, the good news of Ishaq and Ya'qub, Lut and the end of his people. */
const HUD_FOUR: DeepUnit = {
  key: "hud4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-11",
  name: "Hud, ayahs 69 to 83",
  kind: "skill",
  lessonType: "surah",
  surahName: "Hud",
  lessons: [
    {
      slug: "ibrahims-guests",
      title: "Ibrahim welcomes his guests",
      line: "Angels came to Ibrahim, and he rushed to bring food.",
      facts: ["A roasted calf", "His greeting was even better"],
      quote: q11(69),
      source: ik(69, "Ibrahim answered their greeting of peace with a better one, then hurried to bring a roasted calf. The ayah teaches many manners of hosting guests.", "This verse contains many aspects of the etiquettes of hosting guests"),
      difficulty: 2,
      questions: [
        { q: "What did Ibrahim bring his guests, in 11:69?", a: "A roasted calf", wrong: ["Bread and water", "Dates only", "Nothing"], why: "And he hastened to entertain them with a roasted calf." },
        { q: "Who were the guests, per Ibn Kathir?", a: "Angels", wrong: ["Traders", "Kings", "Shepherds"], why: "The word messengers here means angels." },
        { q: "Ibrahim answered their greeting with peace too.", tf: true, why: "They said: Salaman! He answered, Salamun!" }
      ]
    },
    {
      slug: "honour-your-guest",
      title: "Honour your guest",
      line: "The Prophet ﷺ said a believer treats his guest generously.",
      facts: ["Do not harm your neighbour", "Speak good or stay quiet"],
      quote: q11(69),
      source: hadith("bukhari", "6018", "Abu Hurayrah", "Sahih", "Whoever believes in Allah and the Last Day should not harm his neighbour, should be generous to his guest, and should speak good or stay quiet.", "should entertain his guest generously"),
      difficulty: 2,
      questions: [
        { q: "How should a believer treat a guest, per the hadith?", a: "Generously", wrong: ["Quickly send him off", "Make him pay", "Ignore him"], why: "Anybody who believes in Allah and the Last Day should entertain his guest generously." },
        { q: "What should a believer do with his words, per the hadith?", a: "Speak good or stay quiet", wrong: ["Speak loudly", "Argue often", "Speak only in poetry"], why: "Should talk what is good or keep quiet." },
        { q: "Ibrahim hurried to serve his guests.", tf: true, why: "He (Ibrahim) left with haste in order to bring them food, as a host." }
      ]
    },
    {
      slug: "hands-did-not-reach",
      title: "Their hands did not reach the food",
      line: "The guests did not eat, so Ibrahim felt afraid.",
      facts: ["Angels do not eat", "Sent to the people of Lut"],
      quote: q11(70),
      source: ik(70, "Angels do not want food and do not eat it. When they did not touch the meal, Ibrahim grew uneasy, and they told him not to fear: they were sent to Lut's people.", "angels are not concerned with food"),
      difficulty: 3,
      questions: [
        { q: "Why did Ibrahim feel afraid, in 11:70?", a: "The guests did not eat", wrong: ["The guests shouted", "The food burned", "Night had come"], why: "But when he saw their hands went not towards it, he mistrusted them." },
        { q: "To whom were the angels sent, in 11:70?", a: "The people of Lut", wrong: ["The people of Hud", "Fir'awn", "Thamud"], why: "Fear not, we have been sent against the people of Lut." },
        { q: "Angels eat food like people do.", tf: false, why: "Angels are not concerned with food. They do not desire it, nor do they eat it." }
      ]
    },
    {
      slug: "good-news-of-ishaq",
      title: "Good news of Ishaq and Ya'qub",
      line: "Ibrahim's wife heard of a son, Ishaq, then Ya'qub.",
      facts: ["She was old", "Allah's mercy on the household"],
      quote: q11(71),
      source: ik(71, "Even after losing hope, Ibrahim's wife was given good news of a son, Ishaq, who would himself have a son, Ya'qub, and many children after him.", "she was rewarded with the glad tidings of a son, even after her despair"),
      difficulty: 3,
      questions: [
        { q: "Which son was promised, in 11:71?", a: "Ishaq", wrong: ["Yusuf", "Musa", "Dawud"], why: "But We gave her glad tidings of Ishaq." },
        { q: "Who would come after Ishaq, in 11:71?", a: "Ya'qub", wrong: ["Sulayman", "Yunus", "Harun"], why: "And after Ishaq, of Ya'qub." },
        { q: "Ya'qub was the son of Ishaq.", tf: true, why: "For verily, Ya'qub was the son of Ishaq." }
      ]
    },
    {
      slug: "do-you-wonder-at-allahs-decree",
      title: "Do you wonder at Allah's decree?",
      line: "She wondered how an old couple could have a child.",
      facts: ["She was old, he was old", "Mercy and blessings on them"],
      quote: q11(73),
      source: ik(72, "She was amazed: how could an old woman with an old husband have a child? The angels said: do you wonder at Allah's decree? His mercy and blessings are on you.", "Shall I bear a child while I am an old woman, and here is my husband an old man"),
      difficulty: 3,
      questions: [
        { q: "Why was she amazed, in 11:72?", a: "She and her husband were old", wrong: ["The guests were tall", "It was night", "They were far from home"], why: "Shall I bear a child while I am an old woman, and here is my husband an old man?" },
        { q: "What did the angels say, in 11:73?", a: "Do you wonder at Allah's decree?", wrong: ["Go back home", "Be very afraid", "Leave this land"], why: "Do you wonder at the decree of Allah? The mercy of Allah and His blessings be on you." },
        { q: "Allah is called All-Praiseworthy, All-Glorious at the end of 11:73.", tf: true, why: "Surely, He (Allah) is All-Praiseworthy, All-Glorious." }
      ]
    },
    {
      slug: "ibrahim-pleads",
      title: "Ibrahim pleads for the town",
      line: "Ibrahim, gentle and repentant, pleaded for Lut's town.",
      facts: ["Forbearing and humble", "The decree had come"],
      quote: q11(75),
      source: ik(74, "Ibrahim asked: would you destroy a town with even one believer in it? They said Lut is there, and he and his family would be saved except his wife.", "would you destroy it"),
      difficulty: 4,
      questions: [
        { q: "How does Allah describe Ibrahim, in 11:75?", a: "Forbearing, humble, repentant", wrong: ["Harsh and proud", "Rich and famous", "Quick to anger"], why: "Verily, Ibrahim was, without doubt, forbearing, used to invoke Allah with humility, and was repentant." },
        { q: "What was Ibrahim told, in 11:76?", a: "The command has gone forth", wrong: ["They are forgiven", "Wait ten years", "Go there yourself"], why: "O Ibrahim! Forsake this. Indeed, the commandment of your Lord has gone forth." },
        { q: "Ibrahim was told the torment could still be turned back.", tf: false, why: "Verily, there will come a torment for them which cannot be turned back." }
      ]
    },
    {
      slug: "a-distressful-day",
      title: "A distressful day for Lut",
      line: "Angels came to Lut as young men, and he feared for them.",
      facts: ["His people did shameful deeds", "He must defend his guests"],
      quote: q11(77),
      source: ik(77, "Lut was grieved by his guests coming, because he feared his wicked people would harm them. Ibn Abbas said a distressful day means a severe test for him.", "A severe test for him"),
      difficulty: 4,
      questions: [
        { q: "How did Lut feel when the guests came, in 11:77?", a: "Grieved and worried", wrong: ["Proud and happy", "Bored", "Angry at them"], why: "He was grieved on account of them and was concerned for them." },
        { q: "What did Lut call that day, in 11:77?", a: "A distressful day", wrong: ["A happy day", "A feast day", "A day of rest"], why: "He said: This is a distressful day." },
        { q: "Lut feared his people would harm his guests.", tf: true, why: "He was afraid that if he did not host them... someone else of his people would host them and harm them." }
      ]
    },
    {
      slug: "a-right-minded-man",
      title: "Is there no right-minded man?",
      line: "Lut begged them to fear Allah and not shame his guests.",
      facts: ["A Prophet is like a father", "He pointed them to the lawful"],
      quote: q11(78),
      source: ik(78, "Lut pointed them to their lawful wives, since every Prophet is like a father to his nation. He asked them to fear Allah and not disgrace him with his guests.", "Every Prophet is like a father to his nation"),
      difficulty: 4,
      questions: [
        { q: "What did Lut ask his people, in 11:78?", a: "Is there no right-minded man?", wrong: ["Who will pay me?", "Where is my house?", "Who is your king?"], why: "Is there not among you a single right-minded man?" },
        { q: "What is a Prophet like to his nation, per Mujahid?", a: "A father", wrong: ["A stranger", "A king", "A guard"], why: "Every Prophet is like a father to his nation." },
        { q: "Lut asked them to have taqwa of Allah.", tf: true, why: "So have Taqwa of Allah and disgrace me not with regard to my guests!" }
      ]
    },
    {
      slug: "a-powerful-support",
      title: "Lut wished for strong support",
      line: "Lut wished for strength, yet Allah was his strongest support.",
      facts: ["Allah is the strong support", "The angels revealed who they were"],
      quote: q11(80),
      source: hadith("bukhari", "3372", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: may Allah have mercy on Lut, he wished to have a powerful support.", "He wished to have a powerful support"),
      difficulty: 4,
      questions: [
        { q: "What did Lut wish for, in 11:80?", a: "Strength or a strong support", wrong: ["Gold", "A new house", "A long trip"], why: "Would that I had strength to overpower you, or that I could betake myself to some powerful support." },
        { q: "What did the Prophet ﷺ pray for Lut?", a: "Allah's mercy on him", wrong: ["A long life", "Great wealth", "A big army"], why: "May Allah send His mercy on Lut. He wished to have a powerful support." },
        { q: "The angels told Lut his people would not reach him.", tf: true, why: "O Lut! Verily, we are the messengers from your Lord! They shall not reach you!" }
      ]
    },
    {
      slug: "leave-by-night",
      title: "Leave by night, do not look back",
      line: "Lut left by night with his family; his wife stayed behind.",
      facts: ["Their time was the morning", "Do not look back"],
      quote: q11(81),
      source: ik(81, "The angels told Lut to leave with his family late at night and not turn back at the sound of the punishment. His wife would be struck with her people.", "do not rush towards that disturbing noise"),
      difficulty: 5,
      questions: [
        { q: "When was Lut told to leave, in 11:81?", a: "In part of the night", wrong: ["At noon", "After a month", "Never"], why: "So travel with your family in a part of the night." },
        { q: "When was the punishment set to come, in 11:81?", a: "In the morning", wrong: ["At sunset", "In a year", "At midday"], why: "Indeed, morning is their appointed time. Is not the morning near?" },
        { q: "Lut's wife was saved with him.", tf: false, why: "But your wife (will remain behind), verily, the punishment which will afflict them, will afflict her." }
      ]
    },
    {
      slug: "the-town-overturned",
      title: "The town turned upside down",
      line: "Their town was overturned and stones of clay rained down.",
      facts: ["It came at sunrise", "Never far from wrongdoers"],
      quote: q11(82),
      source: ik(82, "At sunrise the town was turned upside down and hard stones of baked clay rained on it. Such punishment is never far from those who do the same wrong.", "this vengeance (of Allah) is not far from similar wrongdoers"),
      difficulty: 5,
      questions: [
        { q: "What happened to the town, in 11:82?", a: "Turned upside down", wrong: ["Moved away", "Became rich", "Was rebuilt"], why: "We turned them upside down, and rained on them stones of clay." },
        { q: "What did Sijjil mean, per Ibn Abbas?", a: "Stones of clay", wrong: ["Drops of water", "Balls of fire", "Grains of sand"], why: "Sijjil is a Persian word meaning stones made of clay." },
        { q: "Such punishment is far from those who do the same wrong.", tf: false, why: "And they are not ever far from the wrongdoers." }
      ]
    }
  ]
};

/** Ayahs 84 to 99: Shu'ayb and the people of Madyan, then Musa and Fir'awn. */
const HUD_FIVE: DeepUnit = {
  key: "hud5",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-11",
  name: "Hud, ayahs 84 to 99",
  kind: "skill",
  lessonType: "surah",
  surahName: "Hud",
  lessons: [
    {
      slug: "shuayb-and-fair-measure",
      title: "Shu'ayb and the fair measure",
      line: "Shu'ayb told Madyan to worship Allah and stop cheating.",
      facts: ["Madyan, near Ma'an", "They were wealthy"],
      quote: q11(84),
      source: ik(84, "Madyan was an Arab tribe between the Hijaz and Sham. Shu'ayb told them to worship Allah alone and forbade them from cheating in weights and measures.", "He also prohibited them from cheating in their weights and measures"),
      difficulty: 2,
      questions: [
        { q: "To which people was Shu'ayb sent, in 11:84?", a: "Madyan", wrong: ["'Ad", "Thamud", "Saba"], why: "And to the Madyan people (We sent) their brother Shu'ayb." },
        { q: "What wrong did Shu'ayb forbid, in 11:84?", a: "Short measure and weight", wrong: ["Planting trees", "Building homes", "Travelling"], why: "And give not short measure or weight." },
        { q: "Shu'ayb said he saw them living in plenty.", tf: true, why: "I see you in prosperity." }
      ]
    },
    {
      slug: "what-allah-leaves-is-better",
      title: "Honest profit is better",
      line: "Give full measure; the honest profit Allah leaves you is better.",
      facts: ["Fair when giving and taking", "Do not spread corruption"],
      quote: q11(86),
      source: ik(86, "The profit you earn from honest trade with full measure is better for you than wrongly taking people's wealth.", "is better for you than wrongfully taking the wealth of the people"),
      difficulty: 2,
      questions: [
        { q: "What must they give, in 11:85?", a: "Full measure and weight", wrong: ["Half measure", "No measure", "Extra taxes"], why: "Give full measure and weight in justice." },
        { q: "What is better for them, in 11:86?", a: "What Allah leaves them", wrong: ["Stolen wealth", "Cheating profit", "Gold from robbers"], why: "That which is left by Allah is better for you, if you are believers." },
        { q: "Fair measure is needed only when selling, not buying.", tf: false, why: "He commanded them to give just measure and weight whether they were giving or receiving." }
      ]
    },
    {
      slug: "whoever-cheats",
      title: "Whoever cheats is not of us",
      line: "The Prophet ﷺ found hidden wet grain and warned cheaters.",
      facts: ["Show the faults of goods", "Honesty brings barakah"],
      quote: q11(85),
      source: hadith("muslim", "102", "Abu Hurairah", "Sahih", "The Prophet ﷺ found wet grain hidden under dry grain and said: why not put it on top so people can see it? Whoever cheats is not of me.", "He who deceives is not of me"),
      difficulty: 3,
      questions: [
        { q: "What did the seller hide, per the hadith?", a: "Wet grain under dry grain", wrong: ["Gold in a sack", "A broken scale", "Old dates"], why: "Why did you not place this (the drenched part) over other eatables so that the people could see it?" },
        { q: "What did the Prophet ﷺ say about one who deceives?", a: "He is not of me", wrong: ["He is clever", "He is rich", "He is forgiven"], why: "He who deceives is not of me (is not my follower)." },
        { q: "The Prophet ﷺ told the seller to put the wet part where people could see.", tf: true, why: "Why did you not place this over other eatables so that the people could see it?" }
      ]
    },
    {
      slug: "honest-trade-is-blessed",
      title: "Honest trade is blessed",
      line: "Buyers and sellers who are truthful are blessed in their deal.",
      facts: ["Tell the truth", "Lies remove the blessing"],
      quote: q11(85),
      source: hadith("bukhari", "2079", "Hakim ibn Hizam", "Sahih", "If the buyer and seller speak the truth and show the faults, their deal is blessed. If they lie or hide things, the blessing is lost.", "then they would be blessed in their transaction"),
      difficulty: 3,
      questions: [
        { q: "What makes a sale blessed, per the hadith?", a: "Truth and showing faults", wrong: ["A high price", "Fast talking", "Hiding faults"], why: "If both the parties spoke the truth and described the defects... they would be blessed in their transaction." },
        { q: "What happens if they lie or hide things?", a: "The blessing is lost", wrong: ["They earn more", "Nothing at all", "The price doubles"], why: "If they told lies or hid something, then the blessings of their transaction would be lost." },
        { q: "Shu'ayb told them not to spread corruption in the land.", tf: true, why: "And do not commit mischief in the land, causing corruption." }
      ]
    },
    {
      slug: "does-your-prayer-command-you",
      title: "Does your prayer order this?",
      line: "They mocked: does your prayer tell us to leave our ways?",
      facts: ["They wanted to cheat freely", "They mocked his good sense"],
      quote: q11(87),
      source: ik(87, "They mocked Shu'ayb: does your prayer order us to leave our fathers' idols, or to stop doing what we like with our wealth? They said it only to mock.", "These enemies of Allah were only saying this in mockery"),
      difficulty: 3,
      questions: [
        { q: "What did they ask Shu'ayb about, in 11:87?", a: "His prayer", wrong: ["His camel", "His house", "His father"], why: "Does your Salah command you that we give up what our fathers used to worship?" },
        { q: "What did they want to keep doing, in 11:87?", a: "What they liked with wealth", wrong: ["Giving charity", "Praying more", "Fasting"], why: "Or that we give up doing what we like with our property?" },
        { q: "They called him forbearing and right-minded only to mock him.", tf: true, why: "These enemies of Allah were only saying this in mockery." }
      ]
    },
    {
      slug: "i-practise-what-i-teach",
      title: "I do what I tell you",
      line: "Shu'ayb said he would never forbid something and do it himself.",
      facts: ["He wanted only to reform", "His success is from Allah"],
      quote: q11(88),
      source: ik(88, "Shu'ayb said he would not forbid them something and then secretly do it himself. He only wanted to set things right as much as he could.", "I do not forbid you all from something while I do it myself"),
      difficulty: 3,
      questions: [
        { q: "What did Shu'ayb want, in 11:88?", a: "Reform, as far as he could", wrong: ["Power over them", "Their money", "Fame"], why: "I only desire reform to the best of my power." },
        { q: "Where does his success come from, in 11:88?", a: "Only from Allah", wrong: ["His tribe", "His wealth", "His speech"], why: "And my guidance cannot come except from Allah, in Him I put my trust." },
        { q: "Shu'ayb did in secret what he told them not to do.", tf: false, why: "I do not forbid you all from something while I do it myself." }
      ]
    },
    {
      slug: "lut-is-not-far",
      title: "Lut's people are not far off",
      line: "Shu'ayb warned them not to share the end of Lut's people.",
      facts: ["Nuh, Hud, Salih and Lut", "My Lord is Most Loving"],
      quote: q11(89),
      source: ik(89, "Do not let your hatred of me keep you in corruption, or what struck the people of Nuh, Hud, Salih and Lut will strike you. Lut's people were close in time and place.", "Do not let your hatred and enmity of me cause you to persist in your corruption"),
      difficulty: 4,
      questions: [
        { q: "Whose people were not far off, in 11:89?", a: "The people of Lut", wrong: ["The people of Musa", "The people of Isa", "The Quraysh"], why: "And the people of Lut are not far off from you!" },
        { q: "How did Shu'ayb describe his Lord, in 11:90?", a: "Most Merciful, Most Loving", wrong: ["Far and silent", "Quick to anger", "Unaware"], why: "Verily, my Lord is Most Merciful, Most Loving." },
        { q: "Not far off can mean close in time and close in place.", tf: true, why: "It has been said that this refers to the period of time... It has also been said that it refers to place." }
      ]
    },
    {
      slug: "more-weight-than-allah",
      title: "Is my family weightier than Allah?",
      line: "They spared Shu'ayb for his family, not out of awe of Allah.",
      facts: ["The speaker of the Prophets", "Allah encircles all they do"],
      quote: q11(92),
      source: ik(92, "They left Shu'ayb alone out of respect for his family, not out of awe of Allah. He asked: is my family of more weight with you than Allah?", "Does not your awe of Allah prevent you from harming His Prophet"),
      difficulty: 4,
      questions: [
        { q: "Why did they not harm Shu'ayb, in 11:91?", a: "Because of his family", wrong: ["Because of his wealth", "Because they feared Allah", "Because he left"], why: "Were it not for your family, you would have been stoned." },
        { q: "What was Shu'ayb called, per Ath-Thawri?", a: "The speaker of the Prophets", wrong: ["The king of Madyan", "The poet of Arabs", "The rich trader"], why: "He (Shu'ayb) was called the orator of the Prophets." },
        { q: "Allah encircles all that they do.", tf: true, why: "Verily, my Lord is surrounding all that you do." }
      ]
    },
    {
      slug: "madyan-went-away",
      title: "Madyan went the way of Thamud",
      line: "Shu'ayb and the believers were saved; a cry seized Madyan.",
      facts: ["A cry, a quake and a cloud", "Neighbours of Thamud"],
      quote: q11(94),
      source: ik(94, "A cry, a quake and a shadowy cloud all came on Madyan in one day. Each surah names the one that fits its story, which is one of the Quran's fine secrets.", "They were one nation upon which all of these punishments were gathered on the day of their destruction"),
      difficulty: 4,
      questions: [
        { q: "Who was saved, in 11:94?", a: "Shu'ayb and the believers", wrong: ["The chiefs", "The traders", "No one"], why: "We saved Shu'ayb and those who believed with him by a mercy from Us." },
        { q: "Which people are Madyan compared to, in 11:95?", a: "Thamud", wrong: ["'Ad", "The Romans", "Quraysh"], why: "So away with Madyan just as Thamud went away." },
        { q: "Madyan and Thamud lived far from each other.", tf: false, why: "They (Thamud) were their neighbors and they did not live far from the homes of the people of Madyan." }
      ]
    },
    {
      slug: "fir-awn-leads-his-people",
      title: "Fir'awn leads his people",
      line: "Musa brought clear signs; Fir'awn's people followed him anyway.",
      facts: ["No right guidance in it", "He leads them on that Day too"],
      quote: q11(97),
      source: ik(97, "Fir'awn's chiefs followed his way, which had no guidance, only ignorance and stubbornness. As they followed him in this life, he will lead them on the Day of Resurrection.", "there was no right guidance in it"),
      difficulty: 5,
      questions: [
        { q: "Whom did Fir'awn's chiefs follow, in 11:97?", a: "Fir'awn's command", wrong: ["Musa's command", "Their own hearts", "The angels"], why: "But they followed the command of Fir'awn." },
        { q: "What was Fir'awn's command like, in 11:97?", a: "No right guide", wrong: ["Wise and fair", "Full of mercy", "Like revelation"], why: "And the command of Fir'awn was no right guide." },
        { q: "Musa was sent with signs and clear authority.", tf: true, why: "And indeed We sent Musa with Our Ayat and a manifest authority." }
      ]
    },
    {
      slug: "following-bad-leaders",
      title: "Following leaders into loss",
      line: "Followers of wrong leaders share their end in both lives.",
      facts: ["A curse in this world", "And another on that Day"],
      quote: q11(99),
      source: ik(99, "Mujahid said they are followed by a curse in this world and another on the Day of Resurrection: two curses.", "so these are two curses"),
      difficulty: 5,
      questions: [
        { q: "When does the curse follow them, in 11:99?", a: "Here and on Judgement Day", wrong: ["Only in this life", "Only for a week", "Never"], why: "They were pursued by a curse in this and on the Day of Resurrection." },
        { q: "How many curses did Mujahid count?", a: "Two", wrong: ["One", "Seven", "Ten"], why: "Another curse will be added to them on the Day of Resurrection, so these are two curses." },
        { q: "Following a leader into wrong saves you from blame.", tf: false, why: "Just as they followed him in this life... likewise he will lead them to the Hellfire." }
      ]
    }
  ]
};

/** Ayahs 100 to 123: lessons from the towns, the Day all gather, standing firm, prayer, and the purpose of the stories. */
const HUD_SIX: DeepUnit = {
  key: "hud6",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-11",
  name: "Hud, ayahs 100 to 123",
  kind: "skill",
  lessonType: "surah",
  surahName: "Hud",
  lessons: [
    {
      slug: "they-wronged-themselves",
      title: "They wronged themselves",
      line: "Some towns still stand, some are gone; Allah wronged none.",
      facts: ["Their idols did not help", "They only added loss"],
      quote: q11(101),
      source: ik(101, "Allah did not wrong them; they wronged themselves by denying their Messengers. Their idols could not save them and only added to their loss.", "the idols did not benefit them, nor did they save them"),
      difficulty: 2,
      questions: [
        { q: "Who wronged the destroyed towns, in 11:101?", a: "They wronged themselves", wrong: ["Allah wronged them", "Their neighbours", "Their animals"], why: "We wronged them not, but they wronged themselves." },
        { q: "What did their idols add, in 11:101?", a: "Nothing but ruin", wrong: ["Wealth", "Safety", "Rain"], why: "Nor did they add aught to them but destruction." },
        { q: "Some of those towns still stand today.", tf: true, why: "Of them, some are (still) standing, and some have been (already) reaped." }
      ]
    },
    {
      slug: "respite-then-seizure",
      title: "Respite, then seizure",
      line: "Allah gives the wrongdoer time, but when He seizes, none escape.",
      facts: ["Time is not safety", "His seizure is severe"],
      quote: q11(102),
      source: hadith("bukhari", "4686", "Abu Musa", "Sahih", "Allah gives the wrongdoer respite, but when He seizes him, He does not let him go. Then the Prophet ﷺ recited 11:102.", "Allah gives respite to the oppressor, but when He takes him over, He never releases him"),
      difficulty: 2,
      questions: [
        { q: "What does Allah give the wrongdoer first, per the hadith?", a: "Respite", wrong: ["Punishment at once", "A reward", "A new home"], why: "Allah gives respite to the oppressor." },
        { q: "What happens when Allah seizes him?", a: "He never lets him go", wrong: ["He lets him go", "He waits more", "He forgets him"], why: "But when He takes him over, He never releases him." },
        { q: "The Prophet ﷺ recited 11:102 after that hadith.", tf: true, why: "Then he recited: Such is the seizure of your Lord when He seizes towns in the midst of their wrong." }
      ]
    },
    {
      slug: "a-day-all-gather",
      title: "A Day when all are gathered",
      line: "On that Day all gather; none speaks without His leave.",
      facts: ["Its time is fixed", "Some wretched, some blessed"],
      quote: q11(105),
      source: ik(105, "On the Day of Judgement no one will speak except with Allah's permission. Even the Messengers will only say: O Allah, save us, save us.", "on the Day of Judgement no one will speak except with the permission of Allah"),
      difficulty: 3,
      questions: [
        { q: "Who gathers on that Day, in 11:103?", a: "All of mankind", wrong: ["Only kings", "Only the rich", "Only one nation"], why: "That is a Day whereon mankind will be gathered together." },
        { q: "Who may speak that Day, in 11:105?", a: "Only with His leave", wrong: ["Anyone loudly", "Only the rich", "Only kings"], why: "On the Day when it comes, no person shall speak except by His leave." },
        { q: "The time of that Day is already fixed.", tf: true, why: "And We delay it only for a term (already) fixed." }
      ]
    },
    {
      slug: "a-gift-without-end",
      title: "A gift without an end",
      line: "The blessed live in Paradise, a gift that is never cut off.",
      facts: ["Never sick, never old", "Never die"],
      quote: q11(108),
      source: hadith("muslim", "2837", "Abu Sa'id al-Khudri and Abu Hurairah", "Sahih", "A caller in Paradise will announce: you will be healthy and never fall ill, live and never die, stay young and never grow old.", "you would remain young and never grow old"),
      difficulty: 3,
      questions: [
        { q: "How is Paradise described, in 11:108?", a: "A gift without an end", wrong: ["A short rest", "A gift for a year", "A test"], why: "A gift without an end." },
        { q: "What will the caller in Paradise say, per the hadith?", a: "You will never grow old", wrong: ["Prepare to leave", "Work hard now", "Wait your turn"], why: "You would remain young and never grow old." },
        { q: "The joys of Paradise will one day be cut off.", tf: false, why: "A gift without an end. This means that it will never be cut off." }
      ]
    },
    {
      slug: "only-copying-fathers",
      title: "Only copying their fathers",
      line: "Idol worshippers had no proof; they only copied their fathers.",
      facts: ["No support for shirk", "Musa's Book was also argued over"],
      quote: q11(109),
      source: ik(109, "The idolaters had no support for their shirk; they only copied their fathers in ignorance. The Book of Musa was also argued over, so the Prophet ﷺ had an example before him.", "They are only mimicking their fathers in ignorance"),
      difficulty: 3,
      questions: [
        { q: "Why did the idolaters worship idols, in 11:109?", a: "Their fathers did", wrong: ["They saw proof", "A Prophet said so", "Angels told them"], why: "They worship nothing but what their fathers worshipped before them." },
        { q: "Which earlier Book did people also argue over, in 11:110?", a: "The Book of Musa", wrong: ["The Book of Nuh", "Poems of Arabia", "No book at all"], why: "Indeed, We gave the Book to Musa, but differences arose therein." },
        { q: "Allah punishes no one until a Messenger has come to them.", tf: true, why: "And We never punish until We have sent a Messenger (to give warning). (17:15)" }
      ]
    },
    {
      slug: "stand-firm-as-commanded",
      title: "Stand firm as commanded",
      line: "Stand straight as you were commanded, and do not go too far.",
      facts: ["Firm and upright", "Never cross the limits"],
      quote: q11(112),
      source: hadith("muslim", "38", "Sufyan ibn Abdullah ath-Thaqafi", "Sahih", "A man asked the Prophet ﷺ for one teaching about Islam. He said: say I believe in Allah, then stay firm on it.", "Say I affirm my faith in Allah and then remain steadfast to it"),
      difficulty: 4,
      questions: [
        { q: "What does 11:112 command?", a: "Stand firm and straight", wrong: ["Rest and wait", "Run away", "Stay quiet"], why: "So stand (ask Allah to make) you firm and straight as you are commanded." },
        { q: "What did the Prophet ﷺ say after: I believe in Allah?", a: "Then stay firm on it", wrong: ["Then travel", "Then be silent", "Then rest"], why: "Say I affirm my faith in Allah and then remain steadfast to it." },
        { q: "Going beyond the limits is allowed if the other side is wrong.", tf: false, why: "Transgression causes destruction to its practitioner, even if the transgression was directed against a polytheist." }
      ]
    },
    {
      slug: "do-not-lean-to-wrongdoers",
      title: "Do not lean toward wrongdoers",
      line: "Do not side with wrongdoers, or you share in their wrong.",
      facts: ["No help besides Allah", "Siding with them is approving"],
      quote: q11(113),
      source: ik(113, "Ibn Abbas said: do not side with those who do wrong. Seeking their help is like approving of what they do.", "Do not side with those who do wrong"),
      difficulty: 4,
      questions: [
        { q: "What does 11:113 forbid?", a: "Leaning toward wrongdoers", wrong: ["Helping the poor", "Praying at night", "Trading fairly"], why: "And incline not toward those who do wrong, lest the Fire should touch you." },
        { q: "What did Ibn Abbas say the ayah means?", a: "Do not side with them", wrong: ["Fight them all", "Copy their ways", "Make them leaders"], why: "Do not side with those who do wrong." },
        { q: "Seeking help from wrongdoers is like approving their wrong.", tf: true, why: "Do not seek assistance from wrongdoers, because it will be as if you are condoning their actions." }
      ]
    },
    {
      slug: "good-deeds-remove-bad",
      title: "Good deeds wipe out bad ones",
      line: "Pray at both ends of the day; good deeds erase bad ones.",
      facts: ["Like bathing five times daily", "Be patient in doing good"],
      quote: q11(114),
      source: hadith("bukhari", "528", "Abu Hurairah", "Sahih", "If a river ran by your door and you bathed in it five times a day, would any dirt remain? That is like the five prayers, by which Allah wipes out sins.", "That is the example of the five prayers with which Allah blots out (annuls) evil deeds"),
      difficulty: 4,
      questions: [
        { q: "What do good deeds do, in 11:114?", a: "Remove bad deeds", wrong: ["Add to sins", "Nothing at all", "Only bring wealth"], why: "Verily, the good deeds remove the evil deeds." },
        { q: "What are the five prayers like, per the hadith?", a: "Bathing in a river", wrong: ["Climbing a hill", "Eating a meal", "Lighting a fire"], why: "If there was a river at the door of anyone of you and he took a bath in it five times a day..." },
        { q: "Allah never wastes the reward of those who do good.", tf: true, why: "And be patient; verily, Allah wastes not the reward of the doers of good." }
      ]
    },
    {
      slug: "people-who-forbid-corruption",
      title: "People who stop corruption",
      line: "Few in earlier nations stopped corruption; those few were saved.",
      facts: ["Command good, forbid evil", "Change it as you can"],
      quote: q11(116),
      source: hadith("muslim", "49", "Abu Sa'id al-Khudri", "Sahih", "Whoever sees something evil should change it with his hand; if he cannot, then with his tongue; and if he cannot, then with his heart.", "He who amongst you sees something abominable should modify it with the help of his hand"),
      difficulty: 4,
      questions: [
        { q: "Who was saved among earlier nations, in 11:116?", a: "The few who forbade evil", wrong: ["The rich", "The chiefs", "No one"], why: "Prohibiting others from corruption in the earth, except a few of those whom We saved." },
        { q: "What is the first way to change evil, per the hadith?", a: "With the hand", wrong: ["With silence", "By running", "By joining in"], why: "He who amongst you sees something abominable should modify it with the help of his hand." },
        { q: "Allah destroys towns whose people do good.", tf: false, why: "And your Lord would never destroy the towns wrongfully, while their people were doers of good." }
      ]
    },
    {
      slug: "mercy-ends-disagreement",
      title: "Mercy for those who follow",
      line: "People will keep differing, except those Allah shows mercy.",
      facts: ["He could make all one nation", "Mercy is in following the Messengers"],
      quote: q11(119),
      source: ik(118, "People will always differ in beliefs. Those who receive Allah's mercy are those who follow the Messengers and hold to what they brought.", "those who have received the mercy of Allah by following the Messengers are excluded from this"),
      difficulty: 5,
      questions: [
        { q: "Could Allah have made all people one nation, per 11:118?", a: "Yes, if He willed", wrong: ["No, never", "Only the Arabs", "Only once"], why: "And if your Lord had so willed, He could surely have made mankind one Ummah." },
        { q: "Who is spared from disagreement, in 11:119?", a: "Those shown His mercy", wrong: ["The richest", "The loudest", "The strongest"], why: "Except him on whom your Lord has bestowed His mercy." },
        { q: "Allah's mercy comes through following the Messengers.", tf: true, why: "Those who have received the mercy of Allah by following the Messengers are excluded from this." }
      ]
    },
    {
      slug: "stories-that-steady-the-heart",
      title: "Stories that steady the heart",
      line: "Allah told these Prophets' stories to make the heart firm.",
      facts: ["Truth, warning and reminder", "Brothers before him were patient"],
      quote: q11(120),
      source: ik(120, "Allah tells the stories of the Messengers before to make the Prophet's ﷺ heart firm, so he takes them as an example. This surah brings truth, a warning and a reminder.", "in order to make your heart firm and so that you may take an example"),
      difficulty: 5,
      questions: [
        { q: "Why are the Messengers' stories told, in 11:120?", a: "To make the heart firm", wrong: ["Only for fun", "To fill time", "To praise kings"], why: "That We may make strong and firm your heart thereby." },
        { q: "What does Surah Hud bring believers, in 11:120?", a: "Truth and a reminder", wrong: ["Riddles", "Old poems", "Market news"], why: "And in this has come to you the truth, as well as an admonition and a reminder for the believers." },
        { q: "In 11:120, the truth that came refers to Surah Hud.", tf: true, why: "This is referring to this Surah itself... and it is the correct view." }
      ]
    },
    {
      slug: "worship-him-and-trust-him",
      title: "Worship Him and trust Him",
      line: "Hud ends: the Unseen is Allah's, so worship Him and trust Him.",
      facts: ["All affairs return to Him", "He is never unaware"],
      quote: q11(123),
      source: ik(123, "Allah knows the Unseen of the heavens and earth, and all returns to Him. So worship Him and rely on Him, for He is enough for whoever trusts Him.", "for verily, He is sufficient for whoever trusts and turns to Him"),
      difficulty: 5,
      questions: [
        { q: "To whom belongs the Unseen, in 11:123?", a: "To Allah", wrong: ["To the stars", "To fortune tellers", "To kings"], why: "And to Allah belongs the Ghayb of the heavens and the earth." },
        { q: "What two things does 11:123 command?", a: "Worship Him and trust Him", wrong: ["Travel and trade", "Sleep and eat", "Build and plant"], why: "So worship Him and put your trust in Him." },
        { q: "Allah is unaware of some things people do.", tf: false, why: "And your Lord is not unaware of what you (people) do." }
      ]
    }
  ]
};

export const HUD_UNITS: readonly DeepUnit[] = [HUD_ONE, HUD_TWO, HUD_THREE, HUD_FOUR, HUD_FIVE, HUD_SIX];
