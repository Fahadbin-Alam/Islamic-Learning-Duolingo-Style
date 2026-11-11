import { hadith, type DeepUnit } from "./deepKit";

// One more Hajj unit: Madinah, the blessed city, from the Book of the Virtues of Madinah in Sahih al-Bukhari. Twice
// Makkah's blessing, faith going home to Madinah, a furnace that clears out the bad, hurrying home out of love, plots
// that melt like salt, and better for them if they only knew. Every card is one sahih hadith with its number and
// narrator, and its exact English words to highlight, and none of them is taught anywhere else in the app.

const MADINAH: DeepUnit = {
  key: "hajj-madinah",
  topicId: "hajj",
  branchId: "hajj-madinah",
  branch: { title: "Madinah, the blessed city", description: "Twice Makkah's blessing, faith going home, a furnace that clears out the bad, hurrying home with love, plots that melt like salt, and better for them if they knew." },
  name: "the blessed city of Madinah",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "twice-the-blessing",
      title: "Twice the blessing",
      line: "He ﷺ asked Allah to give Madinah twice Makkah's blessing.",
      facts: ["Told by Anas ibn Malik", "A du'a he ﷺ made for Madinah"],
      source: hadith("bukhari", "1885", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said: O Allah, give Madinah twice the blessing You gave Makkah.", "O Allah! Bestow on Medina twice the blessings You bestowed on Mecca"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ ask Allah to give Madinah?", a: "Twice Makkah's blessing", wrong: ["Half of Makkah's rain", "A wall of gold", "A bigger market"], why: "Bestow on Medina twice the blessings You bestowed on Mecca, he ﷺ asked Allah." },
        { q: "Which city did he ﷺ name in his du'a for Madinah?", a: "Makkah", wrong: ["Ta'if", "Jerusalem", "Damascus"], why: "Twice the blessings You bestowed on Mecca, he ﷺ said." },
        { q: "He ﷺ made du'a for more blessing in Madinah.", tf: true, why: "Bestow on Medina twice the blessings You bestowed on Mecca, he ﷺ asked Allah." }
      ]
    },
    {
      slug: "faith-goes-home",
      title: "Faith goes home to Madinah",
      line: "Faith returns to Madinah, as a snake returns to its hole.",
      facts: ["Told by Abu Hurairah", "Madinah stays a home for faith"],
      source: hadith("bukhari", "1876", "Abu Hurairah", "Sahih", "The Messenger of Allah ﷺ said: faith returns to Madinah, as a snake returns to its hole.", "Belief returns and goes back to Medina as a snake returns and goes back to its hole"),
      difficulty: 1,
      questions: [
        { q: "Where does faith return to, he ﷺ said?", a: "To Madinah", wrong: ["To the desert", "To the sea", "To the mountains"], why: "Belief returns and goes back to Medina, he ﷺ said." },
        { q: "How does faith return to Madinah, he ﷺ said?", a: "As a snake to its hole", wrong: ["As a bird to its nest", "As a ship to its port", "As rain to the sea"], why: "As a snake returns and goes back to its hole, he ﷺ said." },
        { q: "He ﷺ said faith would leave Madinah forever.", tf: false, why: "No. Faith returns to Madinah, as a snake returns to its hole, he ﷺ said." }
      ]
    },
    {
      slug: "like-a-furnace",
      title: "Like a furnace",
      line: "Madinah is like a furnace: out goes the bad, the good stays.",
      facts: ["Told by Jabir ibn Abdullah", "He ﷺ said no three times"],
      source: hadith("bukhari", "1883", "Jabir ibn Abdullah", "Sahih", "Jabir said: a Bedouin came to the Prophet ﷺ and gave him his pledge for Islam. The next day he came with a fever and said: cancel my pledge. He ﷺ refused three times and said: Madinah is like a furnace. It drives out what is bad and picks out the good, and makes it pure.", "Medina is like a furnace, it expels out the impurities"),
      difficulty: 2,
      questions: [
        { q: "What happened to the Bedouin the day after his pledge?", a: "He came with a fever", wrong: ["He found a treasure", "He lost his camel", "He bought a house"], why: "The next day he came with fever and said: Please cancel my pledge." },
        { q: "What is Madinah like, he ﷺ said?", a: "A furnace", wrong: ["A mirror", "A ship", "A tent"], why: "Medina is like a furnace, it expels out the impurities, he ﷺ said." },
        { q: "He ﷺ cancelled the Bedouin's pledge at once.", tf: false, why: "No. He ﷺ refused to cancel the Bedouin's pledge three times." }
      ]
    },
    {
      slug: "hurrying-home",
      title: "Hurrying home with love",
      line: "Seeing Madinah's walls, he ﷺ hurried his mount out of love.",
      facts: ["Told by Anas ibn Malik", "Coming back from a journey"],
      source: hadith("bukhari", "1886", "Anas ibn Malik", "Sahih", "Anas said: whenever the Prophet ﷺ came back from a journey and saw the walls of Madinah, he made his mount go faster, and if it was a horse he made it gallop, out of his love for Madinah.", "he would make it gallop because of his love for Medina"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ do on seeing Madinah's walls?", a: "Made his mount go faster", wrong: ["Got off to walk", "Waited for the others", "Stopped to look around"], why: "He ﷺ would make his mount go fast, Anas said." },
        { q: "Why did he ﷺ hurry when he saw Madinah?", a: "Out of love for Madinah", wrong: ["He was late for a meal", "A storm was coming", "He was racing someone"], why: "He ﷺ would make it gallop because of his love for Medina." },
        { q: "He ﷺ loved the city of Madinah.", tf: true, why: "He ﷺ would make it gallop because of his love for Medina, Anas said." }
      ]
    },
    {
      slug: "like-salt-in-water",
      title: "Like salt in water",
      line: "Whoever plots against Madinah's people melts like salt in water.",
      facts: ["Told by Sa'd ibn Abi Waqqas", "The plotter melts away like salt"],
      source: hadith("bukhari", "1877", "Sa'd ibn Abi Waqqas", "Sahih", "Sa'd said: I heard the Prophet ﷺ say: no one plots against the people of Madinah but he melts away, as salt melts in water.", "None plots against the people of Medina but that he will be dissolved"),
      difficulty: 2,
      questions: [
        { q: "What happens to one who plots against Madinah's people?", a: "He melts away like salt", wrong: ["He becomes their king", "He grows rich", "He is praised by all"], why: "None plots against the people of Medina but that he will be dissolved." },
        { q: "What does the plotter melt like, he ﷺ said?", a: "Salt in water", wrong: ["Ice in the sun", "Wax in a fire", "Snow on a hill"], why: "He will be dissolved like the salt is dissolved in water, he ﷺ said." },
        { q: "Plotting against the people of Madinah ends well.", tf: false, why: "No. Whoever plots against the people of Medina will melt like salt in water." }
      ]
    },
    {
      slug: "if-they-only-knew",
      title: "If they only knew",
      line: "Yemen, Sham and Iraq would open, but Madinah stays better.",
      facts: ["Told by Sufyan ibn Abi Zuhair", "Some would move away with their families"],
      source: hadith("bukhari", "1875", "Sufyan ibn Abi Zuhair", "Sahih", "Sufyan ibn Abi Zuhair heard the Messenger of Allah ﷺ say: Yemen will be opened, and some people will leave Madinah for it and call their families to come, though Madinah is better for them, if they only knew. Then Sham will be opened, and then Iraq, and the same will happen, though Madinah is better for them, if they only knew.", "although Medina will be better for them; if they but knew"),
      difficulty: 2,
      questions: [
        { q: "Which land did he ﷺ say would be opened first?", a: "Yemen", wrong: ["Iraq", "Sham", "Egypt"], why: "Yemen will be conquered, then Sham, and then Iraq, he ﷺ said." },
        { q: "Whom would those leaving Madinah call to join them?", a: "Their families", wrong: ["Their old enemies", "The desert tribes", "Strangers in the market"], why: "Some people will urge their families to migrate, he ﷺ said." },
        { q: "Madinah would still be better for those who left it.", tf: true, why: "Although Medina will be better for them; if they but knew, he ﷺ said." }
      ]
    }
  ]
};

export const HAJJ_MADINAH_UNITS: DeepUnit[] = [MADINAH];
