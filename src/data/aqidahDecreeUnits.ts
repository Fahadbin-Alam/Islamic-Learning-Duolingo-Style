import { hadith, type DeepUnit } from "./deepKit";

// One more Aqidah unit: what Allah has written, from Sunan Ibn Majah, Jami at-Tirmidhi and Sahih al-Bukhari. His
// mercy is better than our deeds, no arguing about the Decree, nothing outruns the Decree, the two books, two kinds
// of advisers, and provision that will surely reach you. Every card is one sahih or hasan hadith with its number,
// narrator and grade, and its exact English words to highlight. None of these hadith is taught anywhere else in the
// app.

const DECREE: DeepUnit = {
  key: "aqidah-what-allah-has-written",
  topicId: "aqidah",
  branchId: "aqidah-what-allah-has-written",
  branch: { title: "What Allah has written", description: "His mercy better than our deeds, no arguing about the Decree, nothing outruns it, the two books, two kinds of advisers, and provision that will reach you." },
  name: "what Allah has written",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "mercy-better-than-deeds",
      title: "Better than our deeds",
      line: "Allah's mercy on us is better than our own deeds.",
      facts: ["Told by Zayd ibn Thabit", "Ibn ad-Daylami asked four Companions", "Good deeds need faith in the Decree"],
      source: hadith("ibnmajah", "77", "Zayd ibn Thabit", "Sahih (Al-Albani)", "Ibn ad-Daylami was troubled about the Divine Decree, so he asked Ubayy ibn Ka'b, then Abdullah ibn Mas'ud, then Hudhayfah, and each said much the same. Then Zayd ibn Thabit said: I heard the Messenger of Allah ﷺ say: if Allah punished the people of His heavens and His earth, He would not be unjust to them, and if He had mercy on them, His mercy would be better for them than their own deeds. If you spent as much as Mount Uhud in the cause of Allah, it would not be accepted from you until you believed in the Divine Decree.", "His mercy would be better for them than their own deeds"),
      difficulty: 2,
      questions: [
        { q: "What would be better for people than their own deeds, he ﷺ said?", a: "Allah's mercy on them", wrong: ["Their gold and silver", "Their sons and tribes", "Their strength in battle"], why: "His mercy would be better for them than their own deeds, Zayd heard him ﷺ say." },
        { q: "Spending as much as Mount Uhud is not accepted until what?", a: "You believe in the Decree", wrong: ["You give it in Makkah", "You give it on a Friday", "You give it all at once"], why: "It would not be accepted from you until you believed in the Divine Decree, he ﷺ said." },
        { q: "Ibn ad-Daylami asked several Companions, and they all said the same.", tf: true, why: "Ubayy, Abdullah and Hudhayfah each said something similar, then Zayd told the hadith." }
      ]
    },
    {
      slug: "no-arguing-about-the-decree",
      title: "No arguing about the Decree",
      line: "He ﷺ grew angry when the Companions argued about the Decree.",
      facts: ["Told by Abdullah ibn Amr", "His face went red, like burst pomegranate seeds", "Never set one part of the Quran against another"],
      source: hadith("ibnmajah", "85", "Abdullah ibn Amr", "Hasan Sahih (Al-Albani)", "Abdullah ibn Amr said: the Messenger of Allah ﷺ came out to his Companions while they were disputing about the Divine Decree, and his face was red with anger, as if pomegranate seeds had burst on it. He said: were you commanded to do this, or created for this? You are setting one part of the Quran against another, and this is what led to the doom of the nations before you. Abdullah said: I was never so glad to have missed a gathering with him ﷺ as I was to have missed that one.", "this is what led to the doom of the nations who came before you"),
      difficulty: 2,
      questions: [
        { q: "What were the Companions arguing about when he ﷺ came out?", a: "The Divine Decree", wrong: ["The price of dates", "The best camel", "The coming rain"], why: "They were disputing about the Divine Decree when he ﷺ came out, Abdullah said." },
        { q: "What led to the doom of the nations before, he ﷺ said?", a: "Setting the Quran against itself", wrong: ["Planting date palms", "Raising sheep and goats", "Digging deep wells"], why: "Using one part of the Quran against another doomed the nations before you, he ﷺ said." },
        { q: "Arguing about the Decree made him ﷺ angry.", tf: true, why: "His face went red as if pomegranate seeds had burst on it, Abdullah said." }
      ]
    },
    {
      slug: "nothing-outruns-the-decree",
      title: "Nothing outruns the Decree",
      line: "Even the evil eye cannot overcome what Allah has decreed.",
      facts: ["Told by Abdullah ibn Abbas", "The evil eye is strong, but the Decree is stronger", "If you are asked to wash for it, wash"],
      source: hadith("tirmidhi", "2062", "Abdullah ibn Abbas", "Sahih (Al-Albani)", "Ibn Abbas said: the Messenger of Allah ﷺ said: if anything could overcome the Decree, the evil eye would overcome it; and when you are asked to wash because of it, then wash.", "If there was anything that could overcome the Decree"),
      difficulty: 2,
      questions: [
        { q: "What would overcome the Decree, if anything could, he ﷺ said?", a: "The evil eye", wrong: ["A strong wind", "A loud shout", "A sharp sword"], why: "The evil eye is real and strong, yet even it cannot get ahead of what Allah decreed." },
        { q: "Can anything overcome what Allah has decreed?", a: "No, nothing can", wrong: ["Yes, great wealth can", "Yes, a big army can", "Yes, a clever plan can"], why: "The eye would, if anything could; so nothing overcomes what Allah has decreed." },
        { q: "If asked to wash because of the evil eye, he ﷺ said to wash.", tf: true, why: "When you are requested to wash due to it, then wash, he ﷺ said." }
      ]
    },
    {
      slug: "the-two-books",
      title: "The two books",
      line: "He ﷺ came out with two books from the Lord of the worlds.",
      facts: ["Told by Abdullah ibn Amr", "Right hand: the people of Paradise", "Left hand: the people of the Fire"],
      source: hadith("tirmidhi", "2141", "Abdullah ibn Amr", "Hasan (Al-Albani)", "Abdullah ibn Amr said: the Messenger of Allah ﷺ came out to us with two books in his hands. Of the one in his right hand he said: this is a book from the Lord of the worlds, with the names of the people of Paradise, their fathers and their tribes, and nothing will ever be added to it or taken from it. He said the same of the one in his left hand, with the names of the people of the Fire. They asked: then why work? He said: aim for what is right and come close to it.", "in it are the names of the people of Paradise, and the name of their fathers and their tribes"),
      difficulty: 3,
      questions: [
        { q: "What was in the book in his ﷺ right hand?", a: "Names of the people of Paradise", wrong: ["Names of the kings of Persia", "Names of the stars in the sky", "Names of the trees of Makkah"], why: "In it are the names of the people of Paradise, their fathers and their tribes, he ﷺ said." },
        { q: "Can anyone be added to those books or taken from them?", a: "No, never", wrong: ["Yes, by any person", "Yes, by the rich", "Yes, by the strong"], why: "There is no addition to them nor deduction from them forever, he ﷺ said." },
        { q: "He ﷺ still told them to aim for what is right.", tf: true, why: "When they asked why work, he said: seek to do what is right and draw nearer." }
      ]
    },
    {
      slug: "two-kinds-of-advisers",
      title: "Two kinds of advisers",
      line: "Every caliph has good advisers and bad ones, he ﷺ said.",
      facts: ["Told by Abu Sa'id al-Khudri", "A caliph is a leader of the Muslims", "Only Allah truly protects"],
      source: hadith("bukhari", "6611", "Abu Sa'id al-Khudri", "Sahih", "The Prophet ﷺ said: no caliph is appointed except that he has two groups of advisers: one group tells him to do good and urges him to it, and the other tells him to do bad and urges him to it. And the protected one is the one whom Allah protects.", "the protected is the one whom Allah protects"),
      difficulty: 2,
      questions: [
        { q: "How many groups of advisers does every caliph have?", a: "Two groups", wrong: ["One group", "Seven groups", "Ten groups"], why: "No caliph is appointed but has two groups of advisers, one good and one bad, he ﷺ said." },
        { q: "Who is truly protected, he ﷺ said?", a: "The one Allah protects", wrong: ["The one with most guards", "The one with most gold", "The one with most land"], why: "Good and bad advice both come, and the protected is the one whom Allah protects." },
        { q: "One group of advisers urges good, and the other urges bad.", tf: true, why: "Each caliph has both: one group urging him to do good, the other urging him to do bad." }
      ]
    },
    {
      slug: "your-provision-will-reach-you",
      title: "Your provision will reach you",
      line: "No soul dies before it gets all its provision, he ﷺ said.",
      facts: ["Told by Jabir ibn Abdullah", "Be moderate in seeking a living", "Take the lawful, leave the forbidden"],
      source: hadith("ibnmajah", "2144", "Jabir ibn Abdullah", "Sahih (Al-Albani)", "Jabir ibn Abdullah said: the Messenger of Allah ﷺ said: O people, fear Allah and be moderate in seeking a living, for no soul will die until it has received all its provision, even if it is slow in coming. So fear Allah and be moderate in seeking provision: take what is lawful and leave what is forbidden.", "no soul will die until it has received all its provision, even if it is slow in coming"),
      difficulty: 1,
      questions: [
        { q: "What will every soul receive before it dies, he ﷺ said?", a: "All its provision", wrong: ["All its wishes", "Great fame", "A big house"], why: "No soul will die until it has received all its provision, even if it is slow in coming." },
        { q: "How should we seek a living, he ﷺ said?", a: "Moderately, taking only what is lawful", wrong: ["Greedily, taking all we can", "Lazily, waiting at home", "Secretly, hiding it from all"], why: "Be moderate in seeking provision; take what is permissible and leave what is forbidden." },
        { q: "Provision may be slow, but it will still reach you.", tf: true, why: "Even if slow in coming, each soul gets all its provision before it dies, he ﷺ said." }
      ]
    }
  ]
};

export const AQIDAH_DECREE_UNITS: readonly DeepUnit[] = [DECREE];
