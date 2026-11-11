import { hadith, type DeepUnit } from "./deepKit";

// One more Names of Allah unit for the Aqidah topic, from the Prophet's ﷺ own words in Sahih al-Bukhari and Sunan
// Abi Dawud: none more patient than Allah, refuge in His might, As-Salam, the One who withholds and gives, the only
// King of kings, and the Turner of hearts. Every card is one sahih hadith with its number, narrator and grade, and its
// exact English words to highlight, and none of them is taught anywhere else in the app.

const NAMES_SUNNAH: DeepUnit = {
  key: "names-sunnah",
  topicId: "aqidah",
  branchId: "aqidah-names-sunnah",
  branch: { title: "Names of Allah: from the Sunnah", description: "None more patient than Allah, refuge in His might, As-Salam, the One who withholds and gives, the only King of kings, and the Turner of hearts." },
  name: "Names of Allah from the Sunnah",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "none-more-patient",
      title: "None more patient than Allah",
      line: "People claim Allah has children, yet He gives them health.",
      facts: ["Told by Abu Musa al-Ash'ari", "He hears the hurtful words", "He still gives them provision"],
      source: hadith("bukhari", "6099", "Abu Musa al-Ash'ari", "Sahih", "The Prophet ﷺ said: none is more patient than Allah with the hurtful words He hears. People claim He has children, yet He gives them health and provision.", "None is more patient than Allah against the harmful saying"),
      difficulty: 2,
      questions: [
        { q: "Who is the most patient with hurtful words, he ﷺ said?", a: "Allah", wrong: ["The kings", "The wise men", "The elders"], why: "None is more patient than Allah against the harmful saying, he ﷺ said." },
        { q: "Someone says hurtful words to you. What fits the lesson?", a: "Stay patient, and keep doing good", wrong: ["Shout back at once", "Stop speaking to everyone", "Plan to get even"], why: "Allah hears hurtful words, yet still gives health and provision, he ﷺ said." },
        { q: "Allah hears the hurtful words people say, yet still provides for them.", tf: true, why: "He hears from the people they ascribe children to Him, yet He gives them health." }
      ]
    },
    {
      slug: "refuge-in-his-might",
      title: "Refuge in His might",
      line: "He ﷺ sought refuge in Allah's might, the One who never dies.",
      facts: ["Told by Ibn Abbas", "'Izzah: His might and honor", "Jinn and people all die"],
      source: hadith("bukhari", "7383", "Ibn Abbas", "Sahih", "Ibn Abbas said the Prophet ﷺ used to say: I seek refuge in Your might; none has the right to be worshipped but You, who does not die, while the jinn and humans die.", "None has the right to be worshipped but You Who does not die while the Jinns and the human beings die"),
      difficulty: 2,
      questions: [
        { q: "Which word for Allah's might did he ﷺ use in the du'a?", a: "'Izzah", wrong: ["Rahmah", "Hikmah", "Barakah"], why: "I seek refuge by Your 'Izzat, he ﷺ used to say, as Ibn Abbas told." },
        { q: "What did he ﷺ say about the jinn and people?", a: "They all die", wrong: ["They never die", "They rule all things", "They know the unseen"], why: "You do not die, while the jinn and the human beings die, he ﷺ said." },
        { q: "Only Allah is worthy of worship, and He never dies.", tf: true, why: "None has the right to be worshipped but You, who does not die, he ﷺ said." }
      ]
    },
    {
      slug: "allah-is-as-salam",
      title: "Allah is As-Salam",
      line: "Do not say peace be on Allah, for Allah Himself is As-Salam.",
      facts: ["Told by Abdullah ibn Mas'ud", "As-Salam: the Source of peace", "Then say: at-tahiyyatu lillah"],
      source: hadith("bukhari", "6328", "Abdullah ibn Mas'ud", "Sahih", "Ibn Mas'ud said: in the prayer we used to say: peace be on Allah, peace be on so-and-so. One day the Prophet ﷺ said: Allah Himself is As-Salam. When you sit in the prayer, say: at-tahiyyatu lillah, all greetings are for Allah, up to the righteous slaves of Allah, for then your salam reaches every righteous slave in the heavens and on earth.", "Allah Himself is As-Salam; when anyone of you sits during his prayer, he should say"),
      difficulty: 2,
      questions: [
        { q: "What were they told not to say in the prayer?", a: "Peace be on Allah", wrong: ["At-tahiyyatu lillah", "Subhana Rabbiyal A'la", "Allahu akbar"], why: "Allah Himself is As-Salam, he ﷺ told them, so they should not say peace be on Allah." },
        { q: "What did he ﷺ teach them to say instead, when sitting?", a: "At-tahiyyatu lillah", wrong: ["Peace be on Allah", "Nothing at all", "Only ameen"], why: "When anyone of you sits during his prayer, he should say: at-tahiyyatu lillah." },
        { q: "The tashahhud sends salam to every righteous slave in heaven and earth.", tf: true, why: "He says his salam to all the righteous people in the heavens and on the earth." }
      ]
    },
    {
      slug: "he-withholds-and-gives",
      title: "He withholds and He gives",
      line: "When prices rose, he ﷺ said: Allah is the One who provides.",
      facts: ["Told by Anas ibn Malik", "Al-Qabid withholds, Al-Basit gives freely", "Ar-Razzaq: the Provider"],
      source: hadith("abudawud", "3451", "Anas ibn Malik", "Sahih (Al-Albani)", "Anas said: prices rose, and the people said: Messenger of Allah, fix prices for us. He ﷺ said: Allah is the One who sets prices, who withholds, gives freely and provides, and I hope to meet Allah with none of you holding a claim against me for any wrong in blood or wealth.", "Allah is the one Who fixes prices, Who withholds, gives lavishly and provides"),
      difficulty: 2,
      questions: [
        { q: "What did the people ask him ﷺ to do when prices rose?", a: "Fix the prices for them", wrong: ["Close the market", "Give them free food", "Leave Madinah"], why: "Messenger of Allah, prices have shot up, so fix prices for us, the people said." },
        { q: "Which of His names means the Provider?", a: "Ar-Razzaq", wrong: ["Al-Qabid", "Al-Basit", "Al-Hakam"], why: "Allah is the One who withholds, gives lavishly and provides, he ﷺ said." },
        { q: "He ﷺ hoped to meet Allah with no one holding a wrong against him.", tf: true, why: "I hope that when I meet Allah, none of you will have any claim on me for an injustice." }
      ]
    },
    {
      slug: "king-of-kings",
      title: "The King of kings",
      line: "The worst name is a man calling himself King of kings.",
      facts: ["Told by Abu Hurairah", "Only Allah is the true King", "Shahan Shah: the same title in Persian"],
      source: hadith("bukhari", "6206", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: the worst name in Allah's sight is that of a man calling himself king of kings. Sufyan said others explained king of kings as Shahan Shah.", "a man calling himself king of kings"),
      difficulty: 2,
      questions: [
        { q: "Which name did he ﷺ call the worst in Allah's sight?", a: "King of kings", wrong: ["Abdullah", "Abdur-Rahman", "Muhammad"], why: "The most awful name is that of a man calling himself king of kings, he ﷺ said." },
        { q: "Which title in Persian means king of kings, as Sufyan reported?", a: "Shahan Shah", wrong: ["Sultan", "Khalifah", "Emir"], why: "What is meant by the king of kings is Shahan Shah, someone told Sufyan." },
        { q: "Calling yourself king of kings is a good way to show honor.", tf: false, why: "No. That is the most awful name in Allah's sight, he ﷺ said." }
      ]
    },
    {
      slug: "turner-of-hearts",
      title: "By the One who turns hearts",
      line: "He ﷺ often swore: No, by the One who turns the hearts.",
      facts: ["Told by Abdullah ibn Umar", "Allah turns hearts as He wills", "Muqallib al-qulub: Turner of hearts"],
      source: hadith("bukhari", "6628", "Abdullah ibn Umar", "Sahih", "Ibn Umar said: the oath of the Prophet ﷺ used to be: No, by the One who turns the hearts.", "No, by Him who turns the hearts"),
      difficulty: 1,
      questions: [
        { q: "What does Allah turn, in his ﷺ frequent oath?", a: "The hearts", wrong: ["The mountains", "The seas", "The skies"], why: "No, by Him who turns the hearts, was the oath of the Prophet ﷺ, Ibn Umar said." },
        { q: "A believer asks Allah to keep his heart firm. Why?", a: "Allah turns the hearts", wrong: ["Hearts never change", "Only people change hearts", "Hearts do not matter"], why: "His ﷺ oath was: no, by Him who turns the hearts, Ibn Umar said." },
        { q: "He ﷺ swore by Allah, the One who turns the hearts.", tf: true, why: "The oath of the Prophet ﷺ used to be: no, by Him who turns the hearts." }
      ]
    }
  ]
};

export const AQIDAH_NAMES_SUNNAH_UNITS: DeepUnit[] = [NAMES_SUNNAH];
