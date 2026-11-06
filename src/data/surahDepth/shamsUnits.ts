import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Ash-Shams ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Ash-Shams 91:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_91_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Ash-Shams 91:${ayah}`,
    url: `https://quran.com/91:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 91:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q91 = (ayah: number) => quranQuote(91, ayah);



/** Ayahs 1 to 6: oaths by the sun, the moon, the day, the night, the heaven and the earth. */
const SHAMS_ONE: DeepUnit = {
  key: "shams1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-91",
  name: "Ash-Shams, ayahs 1-6",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ash-Shams",
  lessons: [
    {
      slug: "a-short-surah-for-prayer",
      title: "A short surah for prayer",
      line: "Muhammad ﷺ told an imam to recite short surahs like Ash-Shams.",
      facts: ["Make prayer easy for others", "The old and weak pray behind you"],
      quote: q91(1),
      source: hadith("bukhari", "705", "Jabir ibn Abdullah", "Sahih", "Mu'adh led a long prayer and a tired man left. The Prophet ﷺ said it would have been better to recite Al-A'la, Ash-Shams or Al-Layl, for the old, the weak and the needy pray behind you.", "for the old, the weak and the needy pray behind you"),
      difficulty: 2,
      questions: [
        { q: "Which surah did he name besides Al-A'la and Al-Layl?", a: "Ash-Shams", wrong: ["Al-Baqarah", "An-Nisa", "Al-Kahf"], why: "Wash-shamsi wa duhaha." },
        { q: "Why should an imam keep prayer short?", a: "The old, weak and needy pray behind him", wrong: ["To finish quickly for games", "Because short is always better", "To save water"], why: "For the old, the weak and the needy pray behind you." },
        { tf: false, q: "Mu'adh had recited a short surah that night.", why: "Jabir said that Muadh recited Sura Al-Baqara in the Isha prayer." }
      ]
    },
    {
      slug: "by-the-sun-and-its-light",
      title: "By the sun and its light",
      line: "Allah swears by the sun and the bright light of its day.",
      facts: ["Ash-Shams: the sun", "Duha: its brightness"],
      quote: q91(1),
      source: ik(1, "Mujahid said Duhaha means its light; Qatadah said the whole day. Ibn Jarir said Allah swears by the sun and its daytime.", "This means, by its light"),
      difficulty: 1,
      questions: [
        { q: "By what does Allah swear in 91:1?", a: "The sun and its brightness", wrong: ["The stars", "The rain", "The wind"], why: "By the sun and Duhaha." },
        { q: "What does Duhaha mean, per Mujahid?", a: "Its light", wrong: ["Its heat", "Its size", "Its colour"], why: "This means, by its light." },
        { tf: true, q: "Qatadah said Duhaha means the whole day.", why: "Qatadah said, The whole day." }
      ]
    },
    {
      slug: "the-moon-follows",
      title: "The moon follows",
      line: "The moon follows the sun and shines after the day.",
      facts: ["Talaha: follows it", "The new crescent at sunset"],
      quote: q91(2),
      source: ik(2, "Mujahid said the moon follows the sun; Ibn Abbas said it follows the day; Qatadah said the crescent shows when the sun sets.", "It follows the day"),
      difficulty: 2,
      questions: [
        { q: "What does the moon do, per 91:2?", a: "It follows the sun", wrong: ["It hides forever", "It burns", "It falls"], why: "By the moon as it Talaha." },
        { q: "What did Ibn Abbas say Talaha means?", a: "It follows the day", wrong: ["It is bigger", "It is older", "It is hotter"], why: "It follows the day." },
        { tf: false, q: "Qatadah said the crescent is seen before sunset.", why: "When the sun goes down, the Hilal is visible." }
      ]
    },
    {
      slug: "the-day-shines",
      title: "The day shines",
      line: "Allah swears by the day when it brings light to everything.",
      facts: ["Jallaha: makes it bright", "Like 92:2, the day as it shines"],
      quote: q91(3),
      source: ik(3, "Mujahid said Jallaha means when it illuminates, like 92:2, by the day as it appears in brightness.", "When it illuminates"),
      difficulty: 1,
      questions: [
        { q: "What does the day do, per 91:3?", a: "It makes things bright", wrong: ["It makes things cold", "It hides the sun", "It stops"], why: "By the day as it Jallaha." },
        { q: "What does Jallaha mean, per Mujahid?", a: "When it illuminates", wrong: ["When it rains", "When it ends", "When it sleeps"], why: "Mujahid said, When it illuminates." },
        { q: "Which ayah did Mujahid say is similar?", a: "92:2, the day as it Tajalla", wrong: ["2:255", "1:1", "112:1"], why: "This is similar to Allah's statement, By the day as it Tajalla." }
      ]
    },
    {
      slug: "the-night-covers",
      title: "The night covers",
      line: "The night covers the sun's light and the horizon grows dark.",
      facts: ["Yaghshaha: covers it", "Day and night take turns"],
      quote: q91(4),
      source: ik(4, "Ibn Kathir says the night covers the sun when it sets and the horizons become dark.", "when it covers the sun"),
      difficulty: 1,
      questions: [
        { q: "What does the night do, per 91:4?", a: "It covers it", wrong: ["It lights it", "It warms it", "It follows it"], why: "By the night as it Yaghshaha." },
        { q: "What does the night cover, per Ibn Kathir?", a: "The sun", wrong: ["The sea", "The mountains", "The clouds"], why: "Meaning, when it covers the sun." },
        { tf: true, q: "When the sun sets the horizons become dark.", why: "When sun disappears and the horizons become dark." }
      ]
    },
    {
      slug: "day-and-night-in-order",
      title: "Day and night in order",
      line: "Light and dark take turns so neatly: proof Allah knows all.",
      facts: ["As-Sa'di explains", "Sun, moon, day, night"],
      quote: q91(4),
      source: saadi(91, 4, "As-Sa'di says light and dark, sun and moon taking turns in perfect order for our good is the greatest proof that Allah knows all, can do all, and alone deserves worship.", "أكبر دليل على أن الله بكل شيء عليم"),
      difficulty: 2,
      questions: [
        { q: "What does the neat order of day and night prove?", a: "Allah knows and can do all", wrong: ["Nature made itself", "It happens by chance", "The sun is a god"], why: "The greatest proof that Allah knows all and can do all, says as-Sa'di." },
        { q: "Who alone deserves worship, per as-Sa'di on 91:4?", a: "Allah", wrong: ["The sun", "The moon", "The stars"], why: "He alone is worshipped; all else worshipped is false." },
        { tf: true, q: "Day and night taking turns is for our good.", why: "For the good of His servants. As-Sa'di on 91:4." }
      ]
    },
    {
      slug: "the-sky-and-its-building",
      title: "The sky and its building",
      line: "Allah swears by the sky and how He raised it high.",
      facts: ["Bana: built, raised", "51:47: built with strength"],
      quote: q91(5),
      source: ik(5, "Qatadah said by the heaven and its construction; Mujahid said by its Constructor. Construction means raising it, as in 51:47.", "construction means raising"),
      difficulty: 2,
      questions: [
        { q: "By what does Allah swear in 91:5?", a: "The heaven and its building", wrong: ["The sea and its waves", "A city and its walls", "A tree and its roots"], why: "By the heaven and Ma Banaha." },
        { q: "What does construction mean, per Ibn Kathir?", a: "Raising", wrong: ["Painting", "Breaking", "Hiding"], why: "Both views are interrelated, and construction means raising." },
        { tf: false, q: "Mujahid and Qatadah agreed on only one meaning.", why: "Qatadah said its construction; Mujahid said its Constructor. Both views are interrelated." }
      ]
    },
    {
      slug: "the-earth-spread-out",
      title: "The earth spread out",
      line: "Allah swears by the earth, which He spread out for us.",
      facts: ["Taha: spread out", "A home for all creatures"],
      quote: q91(6),
      source: ik(6, "Mujahid, Qatadah and others said Tahaha means He spread it out; Ibn Abbas also said what He created in it.", "Tahaha means He spread it out"),
      difficulty: 2,
      questions: [
        { q: "By what does Allah swear in 91:6?", a: "The earth and its spreading", wrong: ["The moon and its phases", "The sea and its fish", "The sky and its stars"], why: "By the earth and Ma Tahaha." },
        { q: "What does Tahaha mean, per Mujahid?", a: "He spread it out", wrong: ["He shook it", "He froze it", "He lit it"], why: "Mujahid said, Tahaha means He spread it out." },
        { tf: true, q: "Ibn Abbas also said it means what He created in it.", why: "This means what He created in it." }
      ]
    }
  ]
};

/** Ayahs 7 to 10: the soul, its two ways, and success by purifying it. */
const SHAMS_TWO: DeepUnit = {
  key: "shams2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-91",
  name: "Ash-Shams, ayahs 7-10",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ash-Shams",
  lessons: [
    {
      slug: "the-soul-made-sound",
      title: "The soul made sound",
      line: "Allah made every soul sound and balanced on the Fitrah.",
      facts: ["Nafs: soul", "Fitrah: pure first nature"],
      quote: q91(7),
      source: ik(7, "Ibn Kathir says Allah created the soul sound and well-proportioned upon the correct nature, the Fitrah, as in 30:30.", "He created it sound and well-proportioned upon the correct nature"),
      difficulty: 2,
      questions: [
        { q: "By what does Allah swear in 91:7?", a: "The soul and Who shaped it", wrong: ["The body only", "The sea", "The sky"], why: "By Nafs, and Ma Sawwaha." },
        { q: "Upon what nature was it made, per Ibn Kathir?", a: "Al-Fitrah", wrong: ["Anger", "Greed", "Forgetfulness"], why: "Upon the correct nature, Al-Fitrah." },
        { q: "Which ayah speaks of Allah's Fitrah?", a: "30:30", wrong: ["2:2", "18:10", "55:1"], why: "Allah's Fitrah with which He has created mankind." }
      ]
    },
    {
      slug: "the-soul-a-great-sign",
      title: "The soul, a great sign",
      line: "Without the soul, the body would be only a useless statue.",
      facts: ["As-Sa'di explains", "Love, hate, worry, will"],
      quote: q91(7),
      source: saadi(91, 7, "As-Sa'di says the soul is one of Allah's great signs: light, quick and full of feelings, and without it the body would be a useless statue.", "لكان البدن مجرد تمثال لا فائدة فيه"),
      difficulty: 2,
      questions: [
        { q: "Without the soul, the body would be...?", a: "A useless statue", wrong: ["Stronger", "Lighter", "Faster"], why: "The body would be only a statue with no use, says as-Sa'di." },
        { q: "Which of these does the soul feel?", a: "Love and hate", wrong: ["Only hunger", "Nothing", "Only cold"], why: "Worry, will, aim, love and hate." },
        { tf: true, q: "The soul is one of Allah's great signs.", why: "As-Sa'di on 91:7." }
      ]
    },
    {
      slug: "born-on-the-fitrah",
      title: "Born on the Fitrah",
      line: "Every child is born on the Fitrah, the pure nature.",
      facts: ["Babies are born pure", "Like a healthy newborn animal"],
      quote: q91(7),
      source: hadith("bukhari", "1385", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said every child is born on the Fitrah, then his parents raise him on another religion, just as an animal is born whole.", "Every child is born with a true faith of Islam"),
      difficulty: 2,
      questions: [
        { q: "How is every child born?", a: "On the Fitrah", wrong: ["With sins", "With no nature", "As a scholar"], why: "Every child is born with a true faith of Islam." },
        { q: "What example did he give?", a: "An animal born whole", wrong: ["A tree in winter", "A broken pot", "A dry river"], why: "As an animal delivers a perfect baby animal. Do you find it mutilated?" },
        { tf: false, q: "Children are born carrying the sins of others.", why: "Every child is born with a true faith of Islam." }
      ]
    },
    {
      slug: "shown-right-and-wrong",
      title: "Shown right and wrong",
      line: "Allah taught each soul what is wrong and what is right.",
      facts: ["Fujur: wrongdoing", "Taqwa: mindfulness of Allah"],
      quote: q91(8),
      source: ik(8, "Ibn Abbas, Mujahid and Qatadah said Allah explained the good and the evil to the soul.", "He explained the good and the evil to it"),
      difficulty: 2,
      questions: [
        { q: "What did Allah show the soul, per 91:8?", a: "Its Fujur and its Taqwa", wrong: ["Its age", "Its wealth", "Its house"], why: "Then He showed it its Fujur and its Taqwa." },
        { q: "What did Ibn Abbas say it means?", a: "He explained good and evil to it", wrong: ["He hid good from it", "He made it forget", "He gave it gold"], why: "He explained the good and the evil to it." },
        { tf: true, q: "Sa'id bin Jubayr said Allah inspired it to see good and evil.", why: "He gave him inspiration to see what was good and evil." }
      ]
    },
    {
      slug: "allah-makes-it-easy",
      title: "Allah makes it easy",
      line: "Allah knows our end, and He makes the way easy for each.",
      facts: ["Qadr: Allah's decree", "Keep doing good deeds"],
      quote: q91(8),
      source: ik(8, "A man asked if deeds are already decreed. The Prophet ﷺ said yes, and that Allah makes the way easy for each, citing 91:7-8.", "He makes it easy for him"),
      difficulty: 3,
      questions: [
        { q: "What did the man ask about?", a: "Whether deeds are decreed", wrong: ["The price of dates", "The way to Syria", "A lost camel"], why: "Do you consider the actions of mankind and their struggles to be preordained for them?" },
        { q: "What does Allah do for each person, per the hadith?", a: "Makes the way easy for him", wrong: ["Forces him to sin", "Leaves him alone", "Hides the path"], why: "He makes it easy for him." },
        { tf: true, q: "He cited 91:7-8 as the proof.", why: "The proof of that is in the Book of Allah: By Nafs, and Ma Sawwaha." }
      ]
    },
    {
      slug: "success-by-purifying",
      title: "Success by purifying",
      line: "Whoever cleans his soul of bad manners and sins succeeds.",
      facts: ["Zakkaha: purified it", "Tazkiyah: cleaning the soul"],
      quote: q91(9),
      source: ik(9, "Whoever purifies himself by obeying Allah succeeds; Qatadah said he cleans it of low and ugly manners.", "He cleanses it from the lowly and despicable characteristics"),
      difficulty: 2,
      questions: [
        { q: "Who succeeds, per 91:9?", a: "He who purifies it", wrong: ["He who is richest", "He who is tallest", "He who sleeps most"], why: "Indeed he succeeds who purifies it." },
        { q: "How do we purify the soul, per Ibn Kathir?", a: "By obeying Allah", wrong: ["By shouting", "By hiding", "By buying things"], why: "Whoever purifies himself by obedience to Allah, then he will be successful." },
        { q: "What did Qatadah say he cleans it of?", a: "Low and ugly manners", wrong: ["Mud only", "Old clothes", "Sand"], why: "He cleanses it from the lowly and despicable characteristics." }
      ]
    },
    {
      slug: "failure-by-burying",
      title: "Failure by burying it",
      line: "Whoever buries his soul in sin and ignores guidance fails.",
      facts: ["Dassaha: buried, hid it", "Do not neglect the soul"],
      quote: q91(10),
      source: ik(10, "Ibn Kathir says Dassaha means he hides it and makes it dull, neglecting guidance until he disobeys.", "he makes it dull, and he disregards it"),
      difficulty: 2,
      questions: [
        { q: "Who fails, per 91:10?", a: "He who Dassaha, buries it", wrong: ["He who prays", "He who studies", "He who gives"], why: "And indeed he fails who Dassaha." },
        { q: "What does Dassaha mean, per Ibn Kathir?", a: "To conceal it and make it dull", wrong: ["To wash it", "To feed it", "To shine it"], why: "Meaning, to conceal it. He makes it dull, and he disregards it." },
        { tf: false, q: "Neglecting guidance has no effect on the soul.", why: "He disregards it by neglecting to allow it to receive guidance." }
      ]
    },
    {
      slug: "a-dua-to-purify-the-soul",
      title: "A dua to purify the soul",
      line: "Muhammad ﷺ asked Allah to give his soul goodness and purify it.",
      facts: ["Allah is the best Purifier", "Learn this dua"],
      quote: q91(9),
      source: hadith("muslim", "2722", "Zayd ibn Arqam", "Sahih", "The Prophet ﷺ used to say: O Allah, give my soul its goodness and purify it, for You are the best to purify it; You are its Guardian and Master.", "grant to my soul the sense of righteousness and purify it"),
      difficulty: 2,
      questions: [
        { q: "What did he ask Allah for his soul?", a: "Goodness and purity", wrong: ["Fame", "Long hair", "Riches"], why: "O Allah! Give my soul its good and purify it." },
        { q: "Who is the best to purify the soul?", a: "Allah", wrong: ["A doctor", "A king", "A friend"], why: "For You are the best to purify it." },
        { tf: true, q: "He also sought refuge from knowledge that does not benefit.", why: "I seek refuge in Thee from the knowledge which does not benefit." }
      ]
    }
  ]
};

/** Ayahs 11 to 15: Thamud, the she-camel of Allah, and their end. */
const SHAMS_THREE: DeepUnit = {
  key: "shams3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-91",
  name: "Ash-Shams, ayahs 11-15",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ash-Shams",
  lessons: [
    {
      slug: "thamud-denied",
      title: "Thamud denied",
      line: "Thamud rejected their Messenger because they were unjust.",
      facts: ["Thamud: people of Salih", "Tughwa: transgression"],
      quote: q91(11),
      source: ik(11, "Mujahid and Qatadah said Thamud rejected their Messenger because of their injustice and transgression.", "because of the injustice and transgression they practiced"),
      difficulty: 2,
      questions: [
        { q: "What did Thamud do, per 91:11?", a: "Denied through transgression", wrong: ["Believed at once", "Moved away", "Built a ship"], why: "Thamud denied through their transgression." },
        { q: "Why did they reject, per Ibn Kathir?", a: "Their injustice and transgression", wrong: ["They were too busy", "They were sick", "They never heard"], why: "Because of the injustice and transgression they practiced." },
        { tf: true, q: "Their wrongdoing closed their hearts to guidance.", why: "This resulted in a rejection in their hearts for the guidance." }
      ]
    },
    {
      slug: "the-most-wicked-one",
      title: "The most wicked one",
      line: "Their most wicked man, a strong leader, went to harm her.",
      facts: ["Ashqaha: the most wicked", "Power used for evil"],
      quote: q91(12),
      source: ik(12, "Ibn Kathir says the most wicked was the strong, respected leader who killed the she-camel.", "the most wicked person of the tribe"),
      difficulty: 2,
      questions: [
        { q: "Who went forth, per 91:12?", a: "Their most wicked", wrong: ["Their wisest", "Their youngest", "Their poorest"], why: "When their most wicked went forth." },
        { q: "What was he like among his people?", a: "Mighty and respected", wrong: ["Weak and hidden", "A stranger", "A child"], why: "This man was mighty and respected among his people." },
        { tf: false, q: "Being strong and noble made his deed good.", why: "Meaning, the most wicked person of the tribe." }
      ]
    },
    {
      slug: "the-she-camel-of-allah",
      title: "The she-camel of Allah",
      line: "Salih warned them: do not harm Allah's she-camel.",
      facts: ["Naqat Allah: Allah's she-camel", "A sign from the rock"],
      quote: q91(13),
      source: ik(13, "Their Messenger was Salih. He told them to beware of touching the she-camel of Allah with any harm.", "beware of touching the she-camel of Allah with any harm"),
      difficulty: 2,
      questions: [
        { q: "Which Messenger warned them in 91:13?", a: "Salih", wrong: ["Hud", "Nuh", "Lut"], why: "Referring to Salih." },
        { q: "What did he warn them about?", a: "Harming the she-camel", wrong: ["Planting trees", "Building houses", "Selling dates"], why: "Beware of touching the she-camel of Allah with any harm." },
        { tf: true, q: "Allah brought the she-camel out of the rock as a sign.", why: "The she-camel that Allah had brought out of the rock as a sign for them." }
      ]
    },
    {
      slug: "her-day-to-drink",
      title: "Her day to drink",
      line: "The camel had one day to drink; the people had the next.",
      facts: ["Suqyaha: her drink", "Sharing fairly"],
      quote: q91(13),
      source: ik(13, "Salih told them not to wrong her in her drinking; she had a day to drink and they had a day.", "she has been allocated a day to drink"),
      difficulty: 2,
      questions: [
        { q: "What else did Salih warn about?", a: "Her drink", wrong: ["Her colour", "Her name", "Her bell"], why: "And its drink!" },
        { q: "How was the water shared?", a: "She had a day, they had a day", wrong: ["She drank every day", "They never drank", "No rule at all"], why: "She has been allocated a day to drink and you have been allocated a day to drink." },
        { tf: false, q: "They were free to stop her drinking on her day.", why: "Do not transgress against her in her drinking." }
      ]
    },
    {
      slug: "they-killed-it",
      title: "They killed it",
      line: "They rejected Salih and killed her, so Allah destroyed them.",
      facts: ["Fa aqaruha: they killed it", "A sign rejected"],
      quote: q91(14),
      source: ik(14, "They rejected what Salih brought and killed the she-camel, so Allah was angry with them and destroyed them.", "He became angry with them and He annihilated them"),
      difficulty: 2,
      questions: [
        { q: "What did they do, per 91:14?", a: "Denied him and killed it", wrong: ["Fed it", "Hid it", "Sold it"], why: "Then they denied him and they killed it." },
        { q: "What did their Lord do?", a: "Destroyed them for their sin", wrong: ["Gave them more time", "Moved them away", "Rewarded them"], why: "So their Lord destroyed them because of their sin." },
        { q: "What does Fasawwaha mean, per Ibn Kathir?", a: "The punishment fell on all equally", wrong: ["They were forgiven", "Only one was punished", "They became rich"], why: "He made the punishment descend upon them all equally." }
      ]
    },
    {
      slug: "all-agreed-to-it",
      title: "All agreed to it",
      line: "Qatadah said the whole tribe backed it, so all were punished.",
      facts: ["Agreeing to evil is sharing in it", "Do not support wrongdoing"],
      quote: q91(14),
      source: ik(14, "Qatadah said the leader did not kill her until young and old, men and women, all pledged support to him.", "until their youth, their elderly, their males and their females all pledged allegiance to him"),
      difficulty: 3,
      questions: [
        { q: "Who backed the killer, per Qatadah?", a: "Young and old, men and women", wrong: ["No one", "Only his brother", "Only strangers"], why: "Their youth, their elderly, their males and their females all pledged allegiance to him." },
        { q: "Why were all of them punished?", a: "They all cooperated in it", wrong: ["By mistake", "They were far away", "They were asleep"], why: "When the people cooperated in killing her, Allah destroyed them all." },
        { tf: true, q: "Supporting a wrong deed makes us share in it.", why: "When the people cooperated in killing her, Allah destroyed them all with the same punishment." }
      ]
    },
    {
      slug: "allah-fears-nothing",
      title: "Allah fears nothing",
      line: "Allah fears no one; no one can punish Him for His judgement.",
      facts: ["Uqbaha: its consequences", "Allah is the Mighty"],
      quote: q91(15),
      source: ik(15, "Ibn Abbas, Mujahid and Al-Hasan said Allah does not fear any consequences from anyone.", "Allah does not fear any consequences from anyone else"),
      difficulty: 2,
      questions: [
        { q: "What does 91:15 say about Allah?", a: "He feared not the consequences", wrong: ["He was worried", "He asked for help", "He waited"], why: "And He feared not the consequences thereof." },
        { q: "What did Ibn Abbas say?", a: "Allah fears no consequences from anyone", wrong: ["Allah needs help", "Allah forgot them", "Allah was unsure"], why: "Allah does not fear any consequences from anyone else." },
        { tf: false, q: "Someone could take revenge on Allah for His punishment.", why: "Allah does not fear any consequences from anyone else." }
      ]
    }
  ]
};

export const SHAMS_UNITS: readonly DeepUnit[] = [SHAMS_ONE, SHAMS_TWO, SHAMS_THREE];
