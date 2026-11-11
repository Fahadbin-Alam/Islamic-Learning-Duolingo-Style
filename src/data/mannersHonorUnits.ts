import { hadith, type DeepUnit } from "./deepKit";

// One more Manners unit: guarding people's honor, from Sunan Abi Dawud and Jami at-Tirmidhi. Unjust talk about a
// Muslim called a kind of riba, nails of copper seen on the night he ﷺ was taken up, no hunting for faults, how
// fault-finding spoils people, a believer's honor more sacred than the Ka'bah, and an angel who answered for Abu Bakr.
// Every card is one sahih or hasan hadith with its number, narrator and grade, and its exact English words to
// highlight, and none of them is taught anywhere else in the app.

const HONOR: DeepUnit = {
  key: "manners-guarding-honor",
  topicId: "manners",
  branchId: "manners-guarding-honor",
  branch: { title: "Guarding people's honor", description: "Unjust talk called a kind of riba, nails of copper, no hunting for faults, an honor more sacred than the Ka'bah, and an angel who answered for Abu Bakr." },
  name: "guarding people's honor",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "a-riba-of-words",
      title: "A riba of words",
      line: "Unjust talk against a Muslim's honor is a kind of riba.",
      facts: ["Told by Sa'id ibn Zayd", "Riba is interest, which Allah forbade", "Going too far against a Muslim's honor"],
      source: hadith("abudawud", "4876", "Sa'id ibn Zayd", "Sahih (Al-Albani)", "Sa'id ibn Zayd said: the Prophet ﷺ said: the most widespread kind of riba is going too far in talking unjustly against a Muslim's honor.", "The most prevalent kind of usury is going to lengths in talking unjustly"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ call the most widespread kind of riba?", a: "Unjust talk about a Muslim", wrong: ["Giving a gift", "Paying a fair price", "Lending with no interest"], why: "Going to lengths in talking unjustly against a Muslim's honor, he ﷺ said." },
        { q: "How widespread did he ﷺ say this riba is?", a: "The most widespread kind", wrong: ["The rarest kind", "Only in the past", "Only among kings"], why: "The most prevalent kind of usury is going to lengths in talking unjustly." },
        { q: "Talking unjustly about a Muslim's honor is a small matter.", tf: false, why: "No. Talking unjustly about a Muslim's honor is a kind of riba, he ﷺ said." }
      ]
    },
    {
      slug: "nails-of-copper",
      title: "Nails of copper",
      line: "He ﷺ saw backbiters with copper nails, scratching their faces.",
      facts: ["Told by Anas ibn Malik", "When he ﷺ was taken up to the heavens", "Jibril told him who they were"],
      source: hadith("abudawud", "4878", "Anas ibn Malik", "Sahih (Al-Albani)", "Anas ibn Malik said: the Prophet ﷺ said: when I was taken up to the heavens, I passed by people with nails of copper, scratching their faces and their chests. I said: who are these, Jibril? He said: they are those who used to backbite and attack people's honor.", "I passed by people who had nails of copper and were scratching their faces and their breasts"),
      difficulty: 2,
      questions: [
        { q: "What did the people he ﷺ passed have?", a: "Nails of copper", wrong: ["Crowns of gold", "Wings of light", "Cups of silver"], why: "They were scratching their faces and their chests with them, he ﷺ said." },
        { q: "Who did Jibril say those people were?", a: "Those who backbit people", wrong: ["Those who gave charity", "Those who fasted a lot", "Those who fed the poor"], why: "They were given to backbiting and attacked people's honor, Jibril said." },
        { q: "Jibril was with him ﷺ when he saw them.", tf: true, why: "Who are these people, Jibril? he ﷺ asked, and Jibril told him." }
      ]
    },
    {
      slug: "do-not-hunt-for-faults",
      title: "Do not hunt for faults",
      line: "Whoever hunts for others' faults, Allah will search for his.",
      facts: ["Told by Abu Barzah al-Aslami", "Do not backbite Muslims", "Do not search for their faults"],
      source: hadith("abudawud", "4880", "Abu Barzah al-Aslami", "Hasan Sahih (Al-Albani)", "Abu Barzah al-Aslami said: the Prophet ﷺ said: O you who believe with your tongues, while faith has not entered your hearts: do not backbite Muslims, and do not search for their faults. For whoever searches for their faults, Allah will search for his fault, and whoever Allah searches for, He disgraces him even in his own house.", "do not back-bite Muslims, and do not search for their faults, for if anyone searches for their faults, Allah will search for his fault"),
      difficulty: 2,
      questions: [
        { q: "What happens to one who hunts for Muslims' faults?", a: "Allah will search for his faults", wrong: ["People will thank him", "He will be made a leader", "Nothing at all"], why: "And whoever Allah searches for, He disgraces him even in his own house, he ﷺ said." },
        { q: "Where will Allah disgrace the one He searches for?", a: "Even in his own house", wrong: ["Only at the market", "Only far from home", "Nowhere at all"], why: "If Allah searches for the fault of anyone, He disgraces him in his house, he ﷺ said." },
        { q: "He ﷺ told us not to backbite Muslims.", tf: true, why: "Do not backbite Muslims, and do not search for their faults, he ﷺ said." }
      ]
    },
    {
      slug: "looking-for-faults-spoils-people",
      title: "Looking for faults spoils people",
      line: "If you search for people's faults, you will spoil them.",
      facts: ["Told by Mu'awiyah", "He heard it from the Messenger of Allah ﷺ", "Abu ad-Darda said Allah benefited him by it"],
      source: hadith("abudawud", "4888", "Mu'awiyah", "Sahih (Al-Albani)", "Mu'awiyah said: I heard the Messenger of Allah ﷺ say: if you search for the faults of people, you will spoil them, or nearly spoil them. Abu ad-Darda said: these are words Mu'awiyah heard himself from the Messenger of Allah ﷺ, and Allah benefited him by them.", "If you search for the faults of the people, you will corrupt them, or will nearly corrupt them"),
      difficulty: 2,
      questions: [
        { q: "What happens when you search for people's faults?", a: "You spoil them", wrong: ["You make them better", "You make them happy", "You make them rich"], why: "You will corrupt them, or nearly so, the Messenger of Allah ﷺ said." },
        { q: "Who said Allah benefited Mu'awiyah by these words?", a: "Abu ad-Darda", wrong: ["Abu Hurairah", "Ibn Abbas", "Anas ibn Malik"], why: "These are words Mu'awiyah heard himself from the Messenger of Allah ﷺ, he said." },
        { q: "Looking for people's faults can spoil them.", tf: true, why: "If you search for the faults of people, you will corrupt them, he ﷺ said." }
      ]
    },
    {
      slug: "more-sacred-than-the-kabah",
      title: "More sacred than the Ka'bah",
      line: "A believer's honor is more sacred to Allah than the Ka'bah.",
      facts: ["Told by Ibn Umar", "He ﷺ called out loudly from the minbar", "Ibn Umar looked at the Ka'bah and spoke"],
      source: hadith("tirmidhi", "2032", "Ibn Umar", "Hasan Sahih (Al-Albani)", "Ibn Umar said: the Messenger of Allah ﷺ climbed the minbar and called out loudly: O you who have accepted Islam with your tongues, while faith has not reached your hearts! Do not harm the Muslims, do not insult them, and do not look for their hidden faults. For whoever looks for the hidden faults of his Muslim brother, Allah will expose his faults, even if he is deep inside his house. Nafi' said: one day Ibn Umar looked at the Ka'bah and said: how great you are, and how great your sacredness! Yet the honor of a believer is more sacred to Allah than yours.", "honor is more sacred to Allah than yours"),
      difficulty: 2,
      questions: [
        { q: "What did Ibn Umar say is more sacred to Allah than the Ka'bah?", a: "A believer's honor", wrong: ["A king's palace", "A pile of gold", "A high tower"], why: "How great you are, Ibn Umar told the Ka'bah, yet a believer is more sacred to Allah." },
        { q: "From where did he ﷺ call out these words loudly?", a: "From the minbar", wrong: ["From a rooftop", "From the market", "From a hilltop"], why: "He ﷺ climbed the minbar and called out with a raised voice, Ibn Umar said." },
        { q: "He ﷺ told us not to harm or insult Muslims.", tf: true, why: "Do not harm the Muslims, nor revile them, nor spy on them, he ﷺ said." }
      ]
    },
    {
      slug: "an-angel-was-answering",
      title: "An angel was answering",
      line: "While Abu Bakr was silent, an angel answered for him.",
      facts: ["Told by Sa'id ibn al-Musayyab", "A man insulted Abu Bakr three times", "Twice Abu Bakr stayed silent"],
      source: hadith("abudawud", "4896", "Sa'id ibn al-Musayyab", "Hasan (Al-Albani)", "Sa'id ibn al-Musayyab said: the Messenger of Allah ﷺ was sitting with some of his Companions when a man insulted Abu Bakr. Abu Bakr stayed silent. The man insulted him a second time, and Abu Bakr held back. He insulted him a third time, and Abu Bakr answered him back. Then the Messenger of Allah ﷺ got up. Abu Bakr asked: are you angry with me, O Messenger of Allah? He ﷺ said: an angel came down from the sky and was answering him for what he said to you. When you answered back, a devil came down, and I was not going to sit when the devil came down.", "An angel came down from Heaven and he was rejecting what he had said to you"),
      difficulty: 2,
      questions: [
        { q: "What did Abu Bakr do the first time he was insulted?", a: "He stayed silent", wrong: ["He walked away", "He left the city", "He called for help"], why: "A man insulted Abu Bakr, but Abu Bakr remained silent, Sa'id ibn al-Musayyab said." },
        { q: "Who answered the man while Abu Bakr was silent?", a: "An angel from the sky", wrong: ["A friend nearby", "A child passing by", "Nobody"], why: "An angel came down from Heaven and was rejecting what he said, he ﷺ said." },
        { q: "He ﷺ got up when Abu Bakr answered the man back.", tf: true, why: "When you took revenge, a devil came down, he ﷺ told Abu Bakr." }
      ]
    }
  ]
};

export const MANNERS_HONOR_UNITS: DeepUnit[] = [HONOR];
