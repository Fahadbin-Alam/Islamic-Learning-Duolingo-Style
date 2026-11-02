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

export const HUD_UNITS: readonly DeepUnit[] = [HUD_ONE, HUD_TWO];
