import { hadith, type DeepUnit } from "./deepKit";

// One more Manners unit: beautiful character, from Sahih al-Bukhari, Sunan Abi Dawud and Jami' at-Tirmidhi. A cloak
// he ﷺ gave away though he needed it, mercy taken only from the miserable, the two-faced on the Day of Resurrection,
// taqwa and good character, keeping good company, and hosting a man who did not host you. Every card is one sahih or
// hasan hadith with its number, narrator and grade, and its exact English words to highlight, and none of them is
// taught anywhere else in the app.

const CHARACTER: DeepUnit = {
  key: "manners-beautiful-character",
  topicId: "manners",
  branchId: "manners-beautiful-character",
  branch: { title: "Beautiful character", description: "A cloak given away, mercy taken from the miserable, one face for all, taqwa and good character, good company, and hosting a man who did not host you." },
  name: "beautiful character",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "woven-with-her-own-hands",
      title: "Woven with her own hands",
      line: "A woman wove him ﷺ a cloak, and he gave it away.",
      facts: ["Told by Sahl ibn Sa'd", "He ﷺ needed the cloak himself", "He ﷺ never turned down a request"],
      source: hadith("bukhari", "1277", "Sahl ibn Sa'd", "Sahih", "Sahl said: a woman brought the Prophet ﷺ a woven cloak with a border and said: I wove it with my own hands, and I brought it for you to wear. He ﷺ took it, and he needed it, and came out wearing it as his waist-sheet. A man praised it and said: give it to me, how nice it is! The people said: that was not right; he ﷺ needs it, and you asked knowing he never turns anyone down. The man said: by Allah, I did not ask for it to wear, but to be my shroud. And it became his shroud.", "I have woven it with my own hands and I have brought it so that you may wear it"),
      difficulty: 1,
      questions: [
        { q: "Who made the cloak the woman brought him ﷺ?", a: "She wove it herself", wrong: ["A weaver from Yemen", "A trader in the market", "A tailor in Makkah"], why: "I have woven it with my own hands, the woman said." },
        { q: "Why did the man ask for the cloak?", a: "To be his shroud", wrong: ["To wear it at Eid", "To sell it in the market", "To give it to his son"], why: "Not to wear it, but to make it my shroud, the man said, and it became his shroud." },
        { q: "He ﷺ gave away the cloak even though he needed it.", tf: true, why: "He ﷺ was in need of it, and he never turned down anyone who asked, the people said." }
      ]
    },
    {
      slug: "mercy-taken-away",
      title: "Mercy taken away",
      line: "Mercy is taken away only from one who is miserable.",
      facts: ["Told by Abu Hurairah", "Abul-Qasim is the Prophet ﷺ, father of Al-Qasim", "He ﷺ spoke the truth, and his word was confirmed"],
      source: hadith("abudawud", "4942", "Abu Hurairah", "Hasan (Al-Albani)", "Abu Hurairah said: I heard Abul-Qasim ﷺ, who spoke the truth and whose word was confirmed, say: mercy is taken away only from one who is miserable.", "Mercy is taken away only from him who is miserable"),
      difficulty: 2,
      questions: [
        { q: "From whom is mercy taken away, he ﷺ said?", a: "One who is miserable", wrong: ["One who is poor", "One who is young", "One who is a stranger"], why: "Mercy is taken away only from him who is miserable, the truthful Abul-Qasim ﷺ said." },
        { q: "Who is Abul-Qasim, whom Abu Hurairah heard?", a: "The Prophet ﷺ", wrong: ["Abu Bakr", "Umar ibn al-Khattab", "Bilal ibn Rabah"], why: "Abul-Qasim, the father of Al-Qasim, is the Prophet ﷺ himself." },
        { q: "Abu Hurairah said that he ﷺ spoke the truth and his word was confirmed.", tf: true, why: "I heard Abul-Qasim ﷺ, who spoke the truth and whose word was verified, he said." }
      ]
    },
    {
      slug: "one-face-for-everyone",
      title: "One face for everyone",
      line: "The two-faced are the worst people in Allah's sight.",
      facts: ["Told by Abu Hurairah", "He ﷺ spoke of the Day of Resurrection", "They show one face to some, and another to others"],
      source: hadith("bukhari", "6058", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: the worst people in the sight of Allah on the Day of Resurrection will be the two-faced, who come to some people with one face and to others with another face.", "will be the double faced people who appear to some people with one face"),
      difficulty: 2,
      questions: [
        { q: "Who will be the worst people in Allah's sight on the Day of Resurrection?", a: "The two-faced", wrong: ["The poor", "The shy", "The quiet ones"], why: "The worst people in the Sight of Allah will be the double faced people, he ﷺ said." },
        { q: "What does a two-faced person do?", a: "Shows one face to some, another to others", wrong: ["Wears two cloaks at once", "Speaks in two languages", "Lives in two towns"], why: "They appear to some people with one face and to other people with another face." },
        { q: "Showing two faces is a small matter.", tf: false, why: "No. The two-faced will be the worst people in Allah's sight, he ﷺ said." }
      ]
    },
    {
      slug: "taqwa-and-good-character",
      title: "Taqwa and good character",
      line: "Taqwa and good character bring the most people into Paradise.",
      facts: ["Told by Abu Hurairah", "Taqwa is being mindful of Allah", "Good character is how we treat people"],
      source: hadith("tirmidhi", "2004", "Abu Hurairah", "Hasan (Al-Albani)", "Abu Hurairah said: the Messenger of Allah ﷺ was asked what brings people into Paradise the most, and he said: taqwa of Allah, and good character.", "was asked about that for which people are admitted into Paradise the most"),
      difficulty: 1,
      questions: [
        { q: "What brings the most people into Paradise, he ﷺ said?", a: "Taqwa and good character", wrong: ["Wealth and children", "Long life and health", "Fame and power"], why: "Taqwa of Allah, and good character, he ﷺ said when he was asked." },
        { q: "What does taqwa mean?", a: "Keeping Allah in mind", wrong: ["Being rich and strong", "Being loud and bold", "Being famous"], why: "Taqwa is keeping Allah in mind, and keeping away from what He forbids." },
        { q: "Good character is one of the things that brings people into Paradise.", tf: true, why: "Taqwa of Allah, and good character, admit people into Paradise the most, he ﷺ said." }
      ]
    },
    {
      slug: "choose-your-company",
      title: "Choose your company",
      line: "Sit with believers, and let the God-fearing eat your food.",
      facts: ["Told by Abu Sa'id al-Khudri", "Our friends shape who we become", "Invite the God-fearing to your meals"],
      source: hadith("abudawud", "4832", "Abu Sa'id al-Khudri", "Hasan (Al-Albani)", "The Prophet ﷺ said: keep company only with a believer, and let only a God-fearing person eat your food.", "Associate only with a believer, and let only a God-fearing man eat your meals"),
      difficulty: 1,
      questions: [
        { q: "Whom should we keep company with, he ﷺ said?", a: "A believer", wrong: ["Anyone who lies", "Anyone who cheats", "Anyone who is rude"], why: "Associate only with a believer, he ﷺ said." },
        { q: "Who should eat your meals, he ﷺ said?", a: "A God-fearing person", wrong: ["A proud person", "A rude person", "A lazy person"], why: "Let only a God-fearing man eat your meals, he ﷺ said." },
        { q: "The company we keep does not matter.", tf: false, why: "No. Keep company only with a believer, he ﷺ said." }
      ]
    },
    {
      slug: "host-him-anyway",
      title: "Host him anyway",
      line: "Host a man well, even if he did not host you.",
      facts: ["Told by the father of Abu al-Ahwas", "His host had not been kind to him", "Allah had given him camels and goats"],
      source: hadith("tirmidhi", "2006", "The father of Abu al-Ahwas", "Sahih (Al-Albani)", "The father of Abu al-Ahwas said: I asked: O Messenger of Allah, I stayed with a man who did not host me or treat me as a guest. Now he has come to stay with me; shall I treat him the same way? He ﷺ said: no, host him. He ﷺ saw me in worn-out clothes and asked: do you have wealth? I said: Allah has given me all kinds of wealth, camels and goats. He ﷺ said: then let it be seen on you.", "I stayed with a man who did not entertain me nor behave hospitably with me"),
      difficulty: 2,
      questions: [
        { q: "What did the man want to do to the host who had not hosted him?", a: "Treat him the same way", wrong: ["Give him a gift", "Help him build a house", "Teach him the Quran"], why: "Shall I reciprocate the same to him, the man asked, when his host came to stay." },
        { q: "What did he ﷺ tell the man to do?", a: "Host him well", wrong: ["Send him to the masjid", "Wait until he asks", "Ask him where he is from"], why: "No, entertain him, he ﷺ said." },
        { q: "He ﷺ told the man to let his wealth be seen on him.", tf: true, why: "Then let it be seen on you, he ﷺ said, since Allah had given him camels and goats." }
      ]
    }
  ]
};

export const MANNERS_CHARACTER_UNITS: DeepUnit[] = [CHARACTER];
