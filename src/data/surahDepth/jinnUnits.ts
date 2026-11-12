import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Al-Jinn ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Jinn 72:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_72_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Jinn 72:${ayah}`,
    url: `https://quran.com/72:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 72:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q72 = (ayah: number) => quranQuote(72, ayah);


/** Ayahs 1 to 7: a group of jinn hears the Quran, believes, and declares Allah far above having a wife or son. */
const JINN_ONE: DeepUnit = {
  key: "jinn1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-72",
  name: "Al-Jinn, ayahs 1 to 7",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Jinn",
  lessons: [
    {
      slug: "jinn-listened",
      title: "A group of jinn listened",
      line: "A group of jinn heard the Quran and believed in it.",
      facts: ["Jinn: hidden beings made by Allah", "The Quran is for jinn and humans"],
      quote: q72(1),
      source: ik(1, "Ibn Kathir says Allah told His Messenger to inform people that the jinn listened to the Quran, believed in it and followed it.", "to inform his people that the Jinns listened"),
      difficulty: 1,
      questions: [
        { q: "What did the group of jinn listen to?", a: "The Quran", wrong: ["A poem", "A song", "A story"], why: "Say: It has been revealed to me that a group of Jinn listened." },
        { q: "What did the jinn call the recitation?", a: "Wonderful", wrong: ["Boring", "Strange", "Too long"], why: "They said: Verily, we have heard a wonderful Recitation!" },
        { tf: false, q: "The jinn heard the Quran and turned away from it.", why: "The Jinns listened to the Quran, believed in it, affirmed its truthfulness and adhered to it." }
      ]
    },
    {
      slug: "why-the-jinn-searched",
      title: "Why the jinn went searching",
      line: "Blocked from the sky, the jinn searched and found the Quran.",
      facts: ["Nakhla: near Makkah", "Fajr prayer recited aloud"],
      quote: q72(1),
      source: hadith("bukhari", "4921", "Abdullah ibn Abbas", "Sahih", "Ibn Abbas said the devils were blocked from news of the heaven, searched east and west, and found the Prophet ﷺ leading Fajr at Nakhla; the jinn listened and believed.", "while he was offering the Fajr prayer with his companions"),
      difficulty: 2,
      questions: [
        { q: "What were the jinn suddenly blocked from?", a: "News of the heaven", wrong: ["Food and water", "Their homes", "The sea"], why: "Something has intervened between us and the news of the Heaven." },
        { q: "Which prayer was being recited when they heard?", a: "Fajr", wrong: ["Maghrib", "Isha", "Asr"], why: "They met him while he was offering the Fajr prayer with his companions." },
        { tf: true, q: "The jinn travelled east and west to find out what had changed.", why: "And so they set out and travelled all over the world, east and west." }
      ]
    },
    {
      slug: "guides-to-right-path",
      title: "A guide to the right path",
      line: "The Quran guides to what is right and to success.",
      facts: ["Rushd: right guidance", "Belief means no shirk"],
      quote: q72(2),
      source: ik(2, "Ibn Kathir says the right path means what is correct and success; the jinn believed and promised never to join anything with Allah.", "to what is correct and success"),
      difficulty: 1,
      questions: [
        { q: "Where does the Quran guide, per 72:2?", a: "To the right path", wrong: ["To riches", "To fame", "To power"], why: "It guides to the right path, and we have believed therein." },
        { q: "What did the jinn promise after believing?", a: "Never to join anything with Allah", wrong: ["To build a city", "To fight humans", "To hide forever"], why: "And we shall never join anything with our Lord." },
        { tf: false, q: "The jinn said they would add partners next to Allah.", why: "And we shall never join anything with our Lord." }
      ]
    },
    {
      slug: "no-wife-no-son",
      title: "Neither a wife nor a son",
      line: "Allah is far above taking a wife or having a son.",
      facts: ["Jadd: majesty and power", "Allah is One, with no family"],
      quote: q72(3),
      source: ik(3, "Ibn Abbas said the Jadd of our Lord means His actions, commands and power; Allah is far above taking a mate or having children.", "far exalted is He above taking a mate and having children"),
      difficulty: 2,
      questions: [
        { q: "What does Jadd mean, per Ibn Abbas?", a: "His actions, commands and power", wrong: ["His house", "His army", "His books"], why: "This means, His actions, His commands and His power." },
        { q: "What did the believing jinn declare about Allah?", a: "He has no wife or son", wrong: ["He has a son", "He has helpers", "He sleeps"], why: "He has taken neither a wife nor a son." },
        { tf: true, q: "The jinn praised Allah as above having a family.", why: "They professed Allah's magnificence above having taken a spouse and a child." }
      ]
    },
    {
      slug: "the-foolish-among-us",
      title: "The foolish one among them",
      line: "The foolish one who lied about Allah was Iblis.",
      facts: ["Safih: a foolish one", "Shaytan is a liar"],
      quote: q72(4),
      source: ik(4, "Mujahid, Ikrimah, Qatadah and As-Suddi said the foolish among the jinn refers to Iblis, who spoke a great lie about Allah.", "They were referring to Iblis"),
      difficulty: 2,
      questions: [
        { q: "Who is the foolish one, per Mujahid and others?", a: "Iblis", wrong: ["A king", "A poet", "A sailor"], why: "They were referring to Iblis." },
        { q: "What did the foolish one say about Allah?", a: "An enormous lie", wrong: ["Words of praise", "A true report", "A dua"], why: "The foolish among us used to utter against Allah that which was an enormity in falsehood." },
        { tf: false, q: "Iblis always spoke the truth about Allah.", why: "Against Allah that which was an enormity in falsehood, meaning, falsehood and a lie." }
      ]
    },
    {
      slug: "they-thought-none-would-lie",
      title: "They thought none would lie",
      line: "The jinn never thought anyone would dare lie about Allah.",
      facts: ["Hearing truth opens eyes", "Lies about Allah are grave"],
      quote: q72(5),
      source: ik(5, "Ibn Kathir explains the jinn did not think humans and jinn would join in lying about Allah, until the Quran showed them the truth.", "we did not think that humans and Jinns would join each other in lying about Allah"),
      difficulty: 2,
      questions: [
        { q: "What did the jinn not expect?", a: "That anyone would lie about Allah", wrong: ["That rain would fall", "That humans exist", "That stars shine"], why: "We thought that men and Jinn would not utter a lie against Allah." },
        { q: "What showed them the lie?", a: "Hearing the Quran", wrong: ["A dream", "A storm", "Old poems"], why: "So when we heard this Quran we believed in it." },
        { tf: true, q: "Humans and jinn had lied by giving Allah a spouse and son.", why: "By attributing a spouse and a son to Him." }
      ]
    },
    {
      slug: "refuge-with-the-jinn",
      title: "Seeking refuge with jinn",
      line: "People who sought jinn protection only grew more afraid.",
      facts: ["Rahaq: fear and sin", "Seek refuge only in Allah"],
      quote: q72(6),
      source: ik(6, "Ibn Kathir says some Arabs before Islam would seek refuge with the chief jinn of a valley, and the jinn only increased them in fear.", "This was the custom of the Arabs in the pre-Islamic days of ignorance"),
      difficulty: 2,
      questions: [
        { q: "What did some people do when stopping in a valley?", a: "Sought refuge with jinn", wrong: ["Prayed to Allah", "Built a masjid", "Gave charity"], why: "They used to seek refuge with the greatest Jinn of a particular place." },
        { q: "What does Rahaq mean, per Ibn Kathir?", a: "Fear, terror and fright", wrong: ["Joy", "Wealth", "Safety"], why: "They increased them in Rahaq which means fear, terror and fright." },
        { tf: false, q: "Seeking refuge with jinn made people safer and calmer.", why: "When they sought refuge with them instead of Allah, the Jinns would overcome them with harm." }
      ]
    },
    {
      slug: "the-perfect-words",
      title: "Seek refuge in Allah's words",
      line: "When you stop somewhere, seek refuge in Allah's perfect words.",
      facts: ["A travel dua", "Protection is from Allah"],
      quote: q72(6),
      source: hadith("muslim", "2708", "Khawlah bint Hakim", "Sahih", "The Prophet ﷺ taught that whoever stops at a place and seeks refuge in the perfect words of Allah from the evil of what He created, nothing harms him until he leaves.", "I seek refuge in the Perfect Word of Allah from the evil of what He has created"),
      difficulty: 2,
      questions: [
        { q: "When should we say the dua in the hadith?", a: "When stopping at a place", wrong: ["Only in Ramadan", "Only at Hajj", "After eating"], why: "When anyone lands at a place, and then says: I seek refuge in the Perfect Word of Allah." },
        { q: "What is promised to one who says it?", a: "Nothing harms him there", wrong: ["Great riches", "Many friends", "A long trip"], why: "Nothing would harm him until he marches from that stopping place." },
        { tf: true, q: "Muslims seek refuge in Allah, not in the jinn.", why: "I seek refuge in the Perfect Word of Allah from the evil of what He has created." }
      ]
    },
    {
      slug: "no-messenger-coming",
      title: "They thought no messenger would come",
      line: "Many thought Allah would never send another messenger.",
      facts: ["A long gap without prophets", "Allah sent Muhammad ﷺ"],
      quote: q72(7),
      source: ik(7, "Ibn Kathir says they thought Allah would never send a Messenger after such a long time; Al-Kalbi and Ibn Jarir said this.", "Allah would never send a Messenger after this long period of time"),
      difficulty: 2,
      questions: [
        { q: "What did they wrongly think, per 72:7?", a: "No messenger would be sent", wrong: ["The sky would fall", "Rain would stop", "Jinn would rule"], why: "And they thought as you thought, that Allah will not send any Messenger." },
        { q: "Why did they think this?", a: "A long time had passed", wrong: ["A king said so", "A book said so", "The stars said so"], why: "Allah would never send a Messenger after this long period of time." },
        { tf: false, q: "Allah never sent a messenger after that long gap.", why: "He sent His Messenger Muhammad and revealed the Quran to him." }
      ]
    },
    {
      slug: "denial-leads-to-sin",
      title: "Denial leads to sin",
      line: "Denying the rising again led them into shirk and wrong.",
      facts: ["As-Sa'di explains", "Belief guards deeds"],
      quote: q72(7),
      source: saadi(72, 7, "As-Sa'di says when the jinn and people denied that Allah would raise anyone, that denial led them boldly into shirk and transgression.", "فلما أنكروا البعث أقدموا على الشرك والطغيان"),
      difficulty: 2,
      questions: [
        { q: "What did denying the resurrection lead to, per as-Sa'di?", a: "Shirk and transgression", wrong: ["More prayer", "Kindness", "Nothing"], why: "When they denied it, they rushed into shirk, says as-Sa'di." },
        { q: "Who also thought no one would be raised, in Al-Jinn?", a: "Some jinn and people", wrong: ["The angels", "The prophets", "The believers"], why: "They thought as you thought." },
        { tf: true, q: "Believing in the Last Day helps keep us from sin.", why: "As-Sa'di on 72:7." }
      ]
    }
  ]
};

/** Ayahs 8 to 13: the sky is guarded, shooting stars, soothsayers, and the jinn admit Allah's power. */
const JINN_TWO: DeepUnit = {
  key: "jinn2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-72",
  name: "Al-Jinn, ayahs 8 to 13",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Jinn",
  lessons: [
    {
      slug: "sky-filled-with-guards",
      title: "The sky filled with guards",
      line: "When the Quran came, Allah filled the sky with stern guards.",
      facts: ["Allah protects the Quran", "Mercy to His servants"],
      quote: q72(8),
      source: ik(8, "Ibn Kathir says Allah filled the sky with guards when the Quran came, so devils could not steal from it, out of mercy and protection of His Book.", "filling sky with stern guards guarding it from all of its sides"),
      difficulty: 2,
      questions: [
        { q: "What did the jinn find when they reached for the sky?", a: "Stern guards and flames", wrong: ["Open doors", "Empty space", "Clouds of gold"], why: "But we found it filled with stern guards and flaming fires." },
        { q: "Why was the sky guarded, per Ibn Kathir?", a: "To protect the Quran", wrong: ["To scare birds", "To hide the sun", "To stop rain"], why: "His mercy upon His servants and His protection of His Mighty Book." },
        { tf: true, q: "Allah guarded the sky so the Quran would not get mixed up.", why: "So that they could not steal anything from the Quran and tell it to the soothsayers." }
      ]
    },
    {
      slug: "stations-in-the-sky",
      title: "No more stolen hearing",
      line: "Any devil who tries to listen now meets a flame waiting.",
      facts: ["Shihab: a flame", "Devils were driven out"],
      quote: q72(9),
      source: ik(9, "Ibn Kathir says whoever tries to steal information by listening will find a flaming fire waiting in ambush for him that will not miss him.", "whoever would like to steal some information by listening, he will find a flaming fire waiting in ambush for him"),
      difficulty: 2,
      questions: [
        { q: "What did the devils use to do in the sky?", a: "Sit and steal a hearing", wrong: ["Sing praise", "Build homes", "Plant trees"], why: "We used to sit there in stations, to steal a hearing." },
        { q: "What waits for one who listens now?", a: "A flaming fire", wrong: ["A reward", "A gate", "A friend"], why: "Any who listens now will find a flaming fire watching him in ambush." },
        { tf: false, q: "Devils can still listen in the sky freely.", why: "He will find a flaming fire waiting in ambush for him. It will not pass him or miss him." }
      ]
    },
    {
      slug: "soothsayers-add-lies",
      title: "Fortune tellers add lies",
      line: "Fortune tellers mix one stolen word with a hundred lies.",
      facts: ["Kahin: a fortune teller", "Do not trust fortune tellers"],
      quote: q72(9),
      source: hadith("bukhari", "3210", "Aishah", "Sahih", "The Prophet ﷺ said angels mention matters decreed in heaven, devils steal a word and pass it to soothsayers, who add a hundred lies of their own.", "add to it one-hundred lies of their own"),
      difficulty: 3,
      questions: [
        { q: "Whom do the devils pass stolen words to?", a: "Soothsayers", wrong: ["Kings", "Scholars", "Sailors"], why: "The devils listen stealthily to such a matter, come down to inspire the soothsayers with it." },
        { q: "How many lies do soothsayers add?", a: "One hundred", wrong: ["One", "Ten", "None"], why: "The latter would add to it one-hundred lies of their own." },
        { tf: false, q: "Fortune tellers can be trusted to tell the future.", why: "The latter would add to it one-hundred lies of their own." }
      ]
    },
    {
      slug: "shooting-stars",
      title: "What shooting stars are not",
      line: "Shooting stars are not for anyone's birth or death.",
      facts: ["Meteors obey Allah", "Drop old superstitions"],
      quote: q72(8),
      source: hadith("muslim", "2229", "Ibn Abbas", "Sahih", "When a meteor flashed, the Prophet ﷺ asked what people used to say; they said a great man was born or died, and he said meteors are not for anyone's death or birth.", "are shot neither at the death of anyone nor on the birth of anyone"),
      difficulty: 3,
      questions: [
        { q: "What did people say a shooting star meant?", a: "A great man born or died", wrong: ["Rain is coming", "A war is won", "Good luck"], why: "We used to say that that very night a great man had been born and a great man had died." },
        { q: "What did the Prophet ﷺ teach about meteors?", a: "Not for anyone's birth or death", wrong: ["They bring luck", "They are angels", "They show the future"], why: "These meteors are shot neither at the death of anyone nor on the birth of anyone." },
        { tf: false, q: "A shooting star means a great person was just born.", why: "These meteors are shot neither at the death of anyone nor on the birth of anyone." }
      ]
    },
    {
      slug: "good-manners-in-speech",
      title: "Good manners in speech",
      line: "The jinn linked good to Allah and blamed no one for evil.",
      facts: ["Adab: good manners", "Speak about Allah with respect"],
      quote: q72(10),
      source: ik(10, "Ibn Kathir says the jinn worded their speech with good manners, not linking evil to anyone and linking the good to Allah.", "they did not attribute the doing of evil to anyone and they attributed the good to Allah"),
      difficulty: 3,
      questions: [
        { q: "What were the jinn unsure about in 72:10?", a: "Evil or guidance for the earth", wrong: ["The time of day", "Where to live", "Who was king"], why: "We know not whether evil is intended for those on the earth, or whether their Lord intends for them guidance." },
        { q: "To whom did they link the good?", a: "To Allah", wrong: ["To the stars", "To Iblis", "To themselves"], why: "They did not attribute the doing of evil to anyone and they attributed the good to Allah." },
        { tf: true, q: "The jinn showed good manners in how they spoke.", why: "They stated this in such a manner out of their etiquette in phrasing their speech." }
      ]
    },
    {
      slug: "different-ways",
      title: "Groups on different paths",
      line: "Among the jinn are righteous ones and others who are not.",
      facts: ["Jinn have free will", "Some believe, some do not"],
      quote: q72(11),
      source: ik(11, "Ibn Abbas, Mujahid and others said the jinn are groups on different paths: among them are believers and disbelievers.", "among us are believers and among us are disbelievers"),
      difficulty: 2,
      questions: [
        { q: "How did the jinn describe themselves?", a: "Groups on different ways", wrong: ["All the same", "All evil", "All angels"], why: "We are groups having different ways." },
        { q: "What does different ways mean, per Ibn Abbas?", a: "Believers and disbelievers", wrong: ["Tall and short", "Old and young", "Rich and poor"], why: "This means among us are believers and among us are disbelievers." },
        { tf: false, q: "All jinn are evil.", why: "There are among us some that are righteous, and some the contrary." }
      ]
    },
    {
      slug: "cannot-escape-allah",
      title: "None can escape Allah",
      line: "The jinn admitted no one can escape Allah on earth.",
      facts: ["Allah's power covers all", "Running away is useless"],
      quote: q72(12),
      source: ik(12, "Ibn Kathir explains the jinn knew Allah's power is decisive over them and that none of them could escape Him, even by fleeing.", "we know that the power of Allah is decisive over us"),
      difficulty: 2,
      questions: [
        { q: "What did the jinn say about escaping Allah?", a: "No one can escape Him", wrong: ["Flying works", "Hiding works", "The sea is safe"], why: "We think that we cannot escape Allah in the earth, nor can we escape Him by flight." },
        { q: "What did they know about Allah's power?", a: "It is decisive over them", wrong: ["It is small", "It ends at sea", "It is shared"], why: "We know that the power of Allah is decisive over us." },
        { tf: true, q: "Even fleeing cannot take anyone out of Allah's control.", why: "Even if we try to flee, we know that He has complete control over us." }
      ]
    },
    {
      slug: "no-fear-of-injustice",
      title: "No fear of being wronged",
      line: "A believer never fears his good deeds being cut short.",
      facts: ["Allah is perfectly just", "Every good deed counts"],
      quote: q72(13),
      source: ik(13, "Ibn Abbas, Qatadah and others said the believer should not fear his reward being decreased or being burdened with more than his sins.", "he should not fear that the reward for his good deeds will be decreased"),
      difficulty: 2,
      questions: [
        { q: "What did the jinn do when they heard the guidance?", a: "They believed", wrong: ["They laughed", "They slept", "They argued"], why: "And indeed when we heard the Guidance, we believed therein." },
        { q: "What need a believer not fear, per 72:13?", a: "His reward being cut", wrong: ["Hard work", "Long prayers", "Fasting"], why: "He should not fear that the reward for his good deeds will be decreased." },
        { tf: false, q: "Allah may punish a believer for sins he did not do.", why: "Or that he will be burdened with anything other than his sins." }
      ]
    }
  ]
};

/** Ayahs 14 to 20: Muslim jinn and unjust jinn, the test of plenty, the masjids, and calling on Allah alone. */
const JINN_THREE: DeepUnit = {
  key: "jinn3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-72",
  name: "Al-Jinn, ayahs 14 to 20",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Jinn",
  lessons: [
    {
      slug: "muslims-and-qasitun",
      title: "The just and the unjust",
      line: "Some jinn are Muslims, and some turn away from the truth.",
      facts: ["Qasit: unjust, turning from truth", "Muqsit: the just one"],
      quote: q72(14),
      source: ik(14, "Ibn Kathir says the Qasit behaves unjustly with the truth and turns from it, the opposite of the Muqsit, who is just.", "The Qasit is he who behaves unjustly with the truth and deviates from it"),
      difficulty: 3,
      questions: [
        { q: "Who is the Qasit, per Ibn Kathir?", a: "One who turns from the truth", wrong: ["A judge", "A traveller", "A teacher"], why: "The Qasit is he who behaves unjustly with the truth and deviates from it." },
        { q: "What is the opposite of the Qasit?", a: "The Muqsit, the just one", wrong: ["The rich one", "The strong one", "The old one"], why: "This is the opposite of the Muqsit, the one who is just." },
        { tf: true, q: "Those who embraced Islam sought the right path.", why: "And whosoever has embraced Islam, then such have sought the right path." }
      ]
    },
    {
      slug: "sought-salvation",
      title: "Seeking salvation",
      line: "Choosing Islam means seeking safety for yourself.",
      facts: ["Islam is a path to safety", "Each chooses his way"],
      quote: q72(15),
      source: ik(14, "Ibn Kathir says those who embraced Islam sought salvation for themselves, while the unjust will be fuel for the Fire.", "they sought salvation for themselves"),
      difficulty: 2,
      questions: [
        { q: "What did those who chose Islam seek?", a: "Salvation for themselves", wrong: ["Fame", "Gold", "Power over others"], why: "Meaning, they sought salvation for themselves." },
        { q: "What does 72:15 warn about the unjust?", a: "They face the Fire", wrong: ["They become kings", "They are rewarded", "They are forgotten"], why: "And as for the Qasitun, they shall be firewood for Hell." },
        { tf: false, q: "Turning from the truth has no result in the Hereafter.", why: "And as for the Qasitun, they shall be firewood for Hell." }
      ]
    },
    {
      slug: "water-in-abundance",
      title: "Plenty as a test",
      line: "Staying on the right way brings plenty, and plenty is a test.",
      facts: ["Blessings are tests", "Stay firm on guidance"],
      quote: q72(16),
      source: ik(16, "Many early scholars said if they stood firm on Islam, Allah would give them plenty of provision, to test who stays upon guidance.", "so that We may test them to see who will remain upon the guidance"),
      difficulty: 3,
      questions: [
        { q: "What would they get if they stayed on the way?", a: "Water in abundance", wrong: ["Endless night", "Strong winds", "Dry land"], why: "We would surely have bestowed on them water in abundance." },
        { q: "Why does Allah give plenty, per Zayd ibn Aslam?", a: "To test them", wrong: ["To spoil them", "To end their lives", "By chance"], why: "So that We may test them to see who will remain upon the guidance from those who will turn back to sin." },
        { tf: true, q: "Abundant water stands for plenty of provision.", why: "The intent behind this is to say that they would be given an abundance of sustenance." }
      ]
    },
    {
      slug: "turning-from-the-reminder",
      title: "Turning from the Reminder",
      line: "Whoever turns away from Allah's Reminder faces hardship.",
      facts: ["Dhikr: the Reminder", "Keep the Quran close"],
      quote: q72(17),
      source: ik(17, "Ibn Abbas, Mujahid, Ikrimah and Qatadah said the torment for turning from the Reminder is harsh, with no relief in it.", "This means harsh having no relaxation in it"),
      difficulty: 2,
      questions: [
        { q: "Who is warned in 72:17?", a: "Whoever turns from the Reminder", wrong: ["Whoever travels", "Whoever trades", "Whoever sleeps"], why: "And whosoever turns away from the Reminder of his Lord." },
        { q: "What does Sa'ad describe, per Ibn Abbas?", a: "Harsh, with no relief", wrong: ["Short and light", "Sweet and calm", "Easy and soft"], why: "This means harsh having no relaxation in it." },
        { tf: false, q: "Turning away from the Quran brings no harm.", why: "He will cause him to enter in a Sa'ad torment." }
      ]
    },
    {
      slug: "masjids-are-for-allah",
      title: "The masjids are for Allah",
      line: "Masjids belong to Allah, so call on no one besides Him.",
      facts: ["Masjid: place of sujud", "Worship Allah alone"],
      quote: q72(18),
      source: ik(18, "Ibn Kathir says Allah commands His servants to single Him out alone for worship, and that no one be called on along with Him.", "Allah commands His servants to single Him out alone for worship"),
      difficulty: 1,
      questions: [
        { q: "To whom do the masjids belong, per 72:18?", a: "To Allah", wrong: ["To kings", "To tribes", "To the rich"], why: "And the Masjids are for Allah, so invoke not anyone along with Allah." },
        { q: "What must we not do in them?", a: "Call on anyone besides Allah", wrong: ["Pray", "Read the Quran", "Make dua"], why: "So invoke not anyone along with Allah." },
        { tf: true, q: "Every masjid is for worshipping Allah alone.", why: "Allah commands His servants to single Him out alone for worship." }
      ]
    },
    {
      slug: "two-kinds-of-dua",
      title: "Two kinds of dua",
      line: "Call on Allah alone, in worship and in asking.",
      facts: ["As-Sa'di explains", "Dua of worship, dua of asking"],
      quote: q72(18),
      source: saadi(72, 18, "As-Sa'di says do not call on anyone with Allah, neither in the dua of worship nor in the dua of asking, because masjids are built on sincerity to Allah.", "لا دعاء عبادة، ولا دعاء مسألة"),
      difficulty: 3,
      questions: [
        { q: "Which kinds of dua belong only to Allah?", a: "Worship and asking", wrong: ["Only worship", "Only asking", "Neither"], why: "No dua of worship and no dua of asking to others, says as-Sa'di." },
        { q: "What are masjids built on, per as-Sa'di?", a: "Sincerity to Allah", wrong: ["Wealth", "Fame", "Tribes"], why: "Built on sincerity and humility to Allah." },
        { tf: true, q: "We ask Allah alone for what only He can give.", why: "As-Sa'di on 72:18." }
      ]
    },
    {
      slug: "dearest-places",
      title: "The dearest places to Allah",
      line: "The places on earth dearest to Allah are His masjids.",
      facts: ["Love the masjid", "Go there often"],
      quote: q72(18),
      source: hadith("muslim", "671", "Abu Hurairah", "Sahih", "The Prophet ﷺ said the parts of land dearest to Allah are its mosques, and the parts most hateful to Allah are markets.", "The parts of land dearest to Allah are its mosques"),
      difficulty: 1,
      questions: [
        { q: "Which places are dearest to Allah?", a: "The masjids", wrong: ["Markets", "Palaces", "Gardens"], why: "The parts of land dearest to Allah are its mosques." },
        { q: "Which places are least loved by Allah?", a: "Markets", wrong: ["Masjids", "Homes", "Schools"], why: "And the parts most hateful to Allah are markets." },
        { tf: false, q: "Markets are the most loved places to Allah.", why: "The parts of land dearest to Allah are its mosques, and the parts most hateful to Allah are markets." }
      ]
    },
    {
      slug: "crowding-around",
      title: "Crowding around the Prophet ﷺ",
      line: "When the Prophet ﷺ called to Allah, many crowded around him.",
      facts: ["Allah helps His religion", "Truth cannot be put out"],
      quote: q72(19),
      source: ik(19, "Qatadah said humans and jinn crowded together to put out the call, but Allah helped it and made it win; Ibn Kathir finds this the clearest meaning.", "Allah insisted upon helping it, supporting it and making it victorious over those who opposed it"),
      difficulty: 3,
      questions: [
        { q: "Who is the servant of Allah in 72:19?", a: "The Prophet ﷺ", wrong: ["Iblis", "A king", "A poet"], why: "When the Messenger of Allah stood up and said none has the right to be worshipped except Allah." },
        { q: "What did Allah do for His religion?", a: "Helped it win", wrong: ["Let it fade", "Left it alone", "Hid it"], why: "Allah insisted upon helping it, supporting it and making it victorious over those who opposed it." },
        { tf: true, q: "People crowded together trying to stop the message.", why: "Humans and Jinns both crowded together over this matter in order to extinguish it." }
      ]
    },
    {
      slug: "invoke-only-my-lord",
      title: "I call only on my Lord",
      line: "The Prophet ﷺ worshipped Allah alone and trusted only Him.",
      facts: ["Tawakkul: trust in Allah", "Tawhid: Allah is One"],
      quote: q72(20),
      source: ik(20, "Ibn Kathir says the Prophet ﷺ answered his opponents: I only worship my Lord alone, seek His help and put my trust in Him.", "I seek His help and I put my trust in Him"),
      difficulty: 1,
      questions: [
        { q: "Whom did the Prophet ﷺ call on, per 72:20?", a: "Only his Lord", wrong: ["The jinn", "The stars", "His tribe"], why: "Say: I invoke only my Lord, and I associate none as partners along with Him." },
        { q: "In whom did he put his trust?", a: "Allah", wrong: ["His wealth", "His army", "His friends"], why: "I seek His help and I put my trust in Him." },
        { tf: false, q: "The Prophet ﷺ joined partners with Allah in dua.", why: "And I associate none as partners along with Him." }
      ]
    }
  ]
};

/** Ayahs 21 to 28: the Messenger ﷺ only conveys, only Allah knows the Hour and the unseen, and He counts all things. */
const JINN_FOUR: DeepUnit = {
  key: "jinn4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-72",
  name: "Al-Jinn, ayahs 21 to 28",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Jinn",
  lessons: [
    {
      slug: "no-power-to-harm-or-guide",
      title: "Guidance is in Allah's hands",
      line: "The Prophet ﷺ could not harm people or force guidance on them.",
      facts: ["Only Allah guides hearts", "The Prophet ﷺ was a servant of Allah"],
      quote: q72(21),
      source: ik(21, "Ibn Kathir says the Prophet ﷺ was a servant of Allah who received revelation, with no control over anyone's guidance; all of it returns to Allah.", "I have no control over the affairs of your guidance or your misguidance"),
      difficulty: 2,
      questions: [
        { q: "What was not in the Prophet's ﷺ power, per 72:21?", a: "To harm them or guide them", wrong: ["To pray", "To speak", "To travel"], why: "It is not in my power to cause you harm, or to bring you to the right path." },
        { q: "To whom is all guidance referred?", a: "To Allah", wrong: ["To angels", "To parents", "To kings"], why: "Rather all of these things are referred to Allah." },
        { tf: false, q: "The Prophet ﷺ could put faith into any heart he chose.", why: "I have no control over the affairs of your guidance or your misguidance." }
      ]
    },
    {
      slug: "i-cannot-save-you",
      title: "Save yourselves with deeds",
      line: "The Prophet ﷺ told his own family to save themselves with deeds.",
      facts: ["Each soul answers for itself", "Family ties do not replace faith"],
      quote: q72(22),
      source: hadith("bukhari", "2753", "Abu Hurairah", "Sahih", "When told to warn his nearest kin, the Prophet ﷺ called out to Quraysh, his aunt Safiyyah and his daughter Fatimah: ask me for my wealth, but I cannot save you from Allah.", "Ask me anything from my wealth, but I cannot save you from … Punishment"),
      difficulty: 3,
      questions: [
        { q: "Whom did the Prophet ﷺ call when told to warn his kin?", a: "Quraysh and his own family", wrong: ["Only strangers", "Only kings", "Only the jinn"], why: "O people of Quraish! Buy yourselves as I cannot save you from Allah's Punishment." },
        { q: "What did he tell Fatimah she could ask for?", a: "His wealth", wrong: ["Safety from Allah", "A kingdom", "A long life"], why: "O Fatimah bint Muhammad! Ask me anything from my wealth, but I cannot save you from Allah's Punishment." },
        { tf: true, q: "Even the Prophet's ﷺ family needed their own faith and deeds.", why: "O Fatimah bint Muhammad! Ask me anything from my wealth, but I cannot save you from Allah's Punishment." }
      ]
    },
    {
      slug: "no-refuge-but-him",
      title: "No refuge except in Him",
      line: "No one can protect anyone from Allah; refuge is only with Him.",
      facts: ["Multahad: a place of refuge", "Run to Allah, not from Him"],
      quote: q72(22),
      source: ik(22, "Mujahid, Qatadah and As-Suddi said nor can I find refuge except in Him means there is no place to escape to.", "No place to escape to"),
      difficulty: 2,
      questions: [
        { q: "What does no refuge except in Him mean, per Mujahid?", a: "No place to escape to", wrong: ["A big house", "A strong fort", "A far land"], why: "Mujahid, Qatadah and As-Suddi all said: No place to escape to." },
        { q: "Who can protect someone from Allah?", a: "No one", wrong: ["A strong tribe", "Rich friends", "The jinn"], why: "Say: None can protect me from Allah's punishment." },
        { tf: false, q: "A strong family can shield someone from Allah.", why: "None can protect me from Allah's punishment, nor can I find refuge except in Him." }
      ]
    },
    {
      slug: "only-conveyance",
      title: "The Messenger's ﷺ duty: to convey",
      line: "The Messenger's ﷺ duty was to convey Allah's message in full.",
      facts: ["Balagh: conveying", "He conveyed it all"],
      quote: q72(23),
      source: ik(23, "Ibn Kathir explains nothing could save the Messenger ﷺ from Allah except conveying the Message that Allah made his duty.", "except my conveyance of the Message that He has obligated me to carry out"),
      difficulty: 2,
      questions: [
        { q: "What was the Messenger's ﷺ task, per 72:23?", a: "Conveying Allah's messages", wrong: ["Ruling the world", "Collecting wealth", "Forcing belief"], why: "Mine is but conveyance from Allah and His Messages." },
        { q: "Which ayah tells the Messenger ﷺ to proclaim all?", a: "5:67", wrong: ["2:255", "1:1", "112:1"], why: "O Messenger! Proclaim which has been sent down to you from your Lord. (5:67)" },
        { tf: true, q: "Disobeying Allah and His Messenger after hearing the message is serious.", why: "So whoever disobeys after that, then his reward will be the fire of Hell." }
      ]
    },
    {
      slug: "convey-even-one-ayah",
      title: "Convey even one ayah",
      line: "Pass on what you learn, even if it is a single sentence.",
      facts: ["Everyone can share good", "Never lie about the Prophet ﷺ"],
      quote: q72(23),
      source: hadith("bukhari", "3461", "Abdullah ibn Amr", "Sahih", "The Prophet ﷺ said to convey his teachings to people even if it were a single sentence, and warned against lying about him on purpose.", "to the people even if it were a single sentence"),
      difficulty: 2,
      questions: [
        { q: "How much should we convey, per the hadith?", a: "Even a single sentence", wrong: ["Only whole books", "Nothing", "Only in Arabic"], why: "Convey my teachings to the people even if it were a single sentence." },
        { q: "What did he warn against?", a: "Lying about him on purpose", wrong: ["Asking questions", "Learning slowly", "Teaching kids"], why: "And whoever tells a lie on me intentionally, will surely take his place in the Fire." },
        { tf: false, q: "Only scholars may share anything about Islam.", why: "Convey my teachings to the people even if it were a single sentence." }
      ]
    },
    {
      slug: "who-is-weaker",
      title: "They will know who is weaker",
      line: "Idolaters will see they had no helper at all.",
      facts: ["The believers are not alone", "Allah's soldiers are many"],
      quote: q72(24),
      source: ik(24, "Ibn Kathir says on the Day of Judgement the idolaters will know their helpers are weaker and fewer; in truth they have no helper at all.", "the idolators have no helper at all"),
      difficulty: 2,
      questions: [
        { q: "When will they know who is weaker?", a: "When they see the promise", wrong: ["Right away", "Never", "In a dream"], why: "Till, when they see that which they are promised, then they will know." },
        { q: "Who will have no helper at all?", a: "The idolaters", wrong: ["The believers", "The angels", "The prophets"], why: "This means that the idolators have no helper at all and they are fewer in number than the soldiers of Allah." },
        { tf: true, q: "The idolaters are fewer than the soldiers of Allah.", why: "They are fewer in number than the soldiers of Allah." }
      ]
    },
    {
      slug: "the-hour-is-unknown",
      title: "When is the Hour?",
      line: "The Prophet ﷺ did not know if the Hour is near.",
      facts: ["As-Sa'ah: the Hour", "Only Allah knows its time"],
      quote: q72(25),
      source: ik(25, "Ibn Kathir says Allah told His Messenger to tell people he has no knowledge of when the Hour will be, near or far.", "he has no knowledge of when the Hour will be"),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ say about the Hour, per 72:25?", a: "He did not know if it was near", wrong: ["Next year", "In 100 years", "Tomorrow"], why: "Say: I know not whether that which you are promised is near or whether my Lord will appoint for it a distant term." },
        { q: "What did Ibn Kathir call the thousand years claim?", a: "A baseless lie", wrong: ["A sahih hadith", "A wise saying", "A weak opinion"], why: "Will not remain under the earth more than one thousand years is a baseless lie." },
        { tf: false, q: "Someone can correctly name the year of the Hour.", why: "He has no knowledge of when the Hour will be and he does not know whether its time is near or far." }
      ]
    },
    {
      slug: "answerer-knows-no-more",
      title: "The asked knows no more",
      line: "Asked about the Hour, he knew no more than Jibril.",
      facts: ["Hadith of Jibril", "Some things only Allah knows"],
      quote: q72(25),
      source: hadith("bukhari", "50", "Abu Hurairah", "Sahih", "When Jibril asked when the Hour will be, the Prophet ﷺ replied that the one answering has no better knowledge than the one asking.", "The answerer has no better knowledge than the questioner"),
      difficulty: 3,
      questions: [
        { q: "Who asked the Prophet ﷺ about the Hour?", a: "Jibril", wrong: ["Abu Bakr", "A king", "A child"], why: "When Jibril appeared to him in the form of a bedouin Arab, one of the questions he asked was about the Hour." },
        { q: "What did the Prophet ﷺ answer?", a: "The answerer knows no more", wrong: ["Next Friday", "In Ramadan", "After a war"], why: "The answerer has no better knowledge than the questioner." },
        { tf: true, q: "Even Jibril did not know the time of the Hour.", why: "The answerer has no better knowledge than the questioner." }
      ]
    },
    {
      slug: "with-those-you-love",
      title: "With those you love",
      line: "Prepare for the Hour; you will be with those you love.",
      facts: ["Love Allah and His Messenger", "Ask what you have prepared"],
      quote: q72(25),
      source: hadith("bukhari", "3688", "Anas ibn Malik", "Sahih", "A man asked when the Hour will be; the Prophet ﷺ asked what he had prepared, and when he said love of Allah and His Messenger, he said you will be with those you love.", "You will be with those whom you love"),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ ask the man back?", a: "What have you prepared?", wrong: ["Where do you live?", "How old are you?", "Who is your father?"], why: "The Prophet ﷺ said: What have you prepared for it?" },
        { q: "What did the man say he had?", a: "Love of Allah and His Messenger", wrong: ["Much gold", "Many fasts", "A big house"], why: "Nothing, except that I love Allah and His Apostle." },
        { tf: true, q: "The Companions were very glad to hear this answer.", why: "We had never been so glad as we were on hearing that saying of the Prophet ﷺ." }
      ]
    },
    {
      slug: "knower-of-the-unseen",
      title: "The Knower of the unseen",
      line: "Allah shows His unseen to none but a chosen messenger.",
      facts: ["Ghayb: the unseen", "Fortune tellers do not know it"],
      quote: q72(26),
      source: ik(26, "Ibn Kathir says Allah knows the unseen and the seen, and none of His creation reaches His knowledge except what He allows.", "no one of His creation can attain any of His knowledge except that which Allah allows him to have"),
      difficulty: 2,
      questions: [
        { q: "Who is the All-Knower of the unseen?", a: "Allah", wrong: ["Fortune tellers", "The jinn", "Stargazers"], why: "The All-Knower of the Unseen, and He reveals to none His Unseen." },
        { q: "To whom may Allah show some of it?", a: "A messenger He has chosen", wrong: ["Any fortune teller", "Every jinn", "Stargazers"], why: "Except to a Messenger whom He has chosen." },
        { tf: false, q: "The jinn know the unseen by themselves.", why: "No one of His creation can attain any of His knowledge except that which Allah allows him to have." }
      ]
    },
    {
      slug: "keys-of-the-unseen",
      title: "Five keys of the unseen",
      line: "Five keys of the unseen are known only to Allah.",
      facts: ["Mafatih al-Ghayb: keys of the unseen", "Surah Luqman 31:34"],
      quote: q72(26),
      source: hadith("bukhari", "4697", "Ibn Umar", "Sahih", "The Prophet ﷺ said the keys of the unseen are five: tomorrow, what is in the wombs, when rain falls, where one dies, and when the Hour comes.", "The keys of Unseen are five which none knows but Allah"),
      difficulty: 3,
      questions: [
        { q: "How many keys of the unseen are named?", a: "Five", wrong: ["Two", "Seven", "Ten"], why: "The keys of Unseen are five which none knows but Allah." },
        { q: "Which is one of the five keys?", a: "When the Hour will come", wrong: ["Today's date", "The color of the sky", "Past events"], why: "None knows when the Hour will be established but Allah." },
        { tf: false, q: "People can know for sure where they will die.", why: "None knows at what place one will die." }
      ]
    },
    {
      slug: "watching-guards",
      title: "Guards before and behind",
      line: "Guardian angels protect the messenger and the revelation.",
      facts: ["Angels guard the revelation", "The message arrives safely"],
      quote: q72(27),
      source: ik(27, "Ibn Kathir says Allah gives His chosen Messenger extra guardian angels who protect him and the revelation he carries.", "He particularly gives him additional guardian angels who protect him"),
      difficulty: 2,
      questions: [
        { q: "Whom does Allah send with His messenger, per 72:27?", a: "Watching guards", wrong: ["An army of men", "Jinn helpers", "Kings"], why: "He makes a band of watching guards to march before him and behind him." },
        { q: "How many guardians, per Sa'id ibn Jubayr?", a: "Four along with Jibril", wrong: ["One", "Ten", "A thousand"], why: "These are four guardians among the angels along with Jibril." },
        { tf: true, q: "Allah protects His revelation until it is conveyed.", why: "He protects what He reveals to them of revelation so that He will know that they have indeed conveyed the Messages of their Lord." }
      ]
    },
    {
      slug: "keeps-count-of-all",
      title: "He counts all things",
      line: "Allah surrounds all things and keeps count of every one.",
      facts: ["Al-Muhsi: the One who counts", "Nothing is missed"],
      quote: q72(28),
      source: ik(28, "Ibn Kathir says Allah knows all things before they happen, and this is certain; He surrounds all that is with them and counts everything.", "He knows all things before they occur"),
      difficulty: 2,
      questions: [
        { q: "What does Allah keep count of, per 72:28?", a: "All things", wrong: ["Only big things", "Only people", "Only stars"], why: "And He surrounds all that which is with them, and He keeps count of all things." },
        { q: "When does Allah know things?", a: "Before they happen", wrong: ["Only after", "Only when told", "Never fully"], why: "He knows all things before they occur, and this is something definite and certain." },
        { tf: false, q: "Some small things are hidden from Allah.", why: "And He keeps count of all things." }
      ]
    }
  ]
};

export const JINN_UNITS: readonly DeepUnit[] = [JINN_ONE, JINN_TWO, JINN_THREE, JINN_FOUR];
