import { hadith, type DeepUnit } from "./deepKit";

// One more Du'as unit: remembering Allah always, from Sahih Muslim, Sunan Ibn Majah, Sunan Abi Dawud and Jami
// at-Tirmidhi. He ﷺ remembered Allah at all moments, Allah is with the one whose lips move with His name, the
// mufarridun who have gone ahead, a gathering with no dhikr, his ﷺ du'a as he lay down to sleep, and la ilaha
// illallah said sincerely rising to the Throne. Every card is one sahih or hasan hadith with its number, narrator and
// grade, and its exact English words to highlight. Points the schools differ on are left out, and none of these
// hadith is taught anywhere else in the app.

const ALWAYS: DeepUnit = {
  key: "duas-remembering-allah-always",
  topicId: "duas",
  branchId: "duas-remembering-allah-always",
  branch: { title: "Remembering Allah always", description: "At all moments, lips that move with His name, those who have gone ahead, a gathering with dhikr, a du'a before sleeping, and words that reach the Throne." },
  name: "remembering Allah always",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "at-all-moments",
      title: "At all moments",
      line: "He ﷺ remembered Allah at every moment of his day.",
      facts: ["Told by Aishah", "Dhikr: remembering Allah", "Not only after prayer, but at all moments"],
      source: hadith("muslim", "373", "Aishah", "Sahih", "Aishah said: the Messenger of Allah ﷺ used to remember Allah at all moments.", "used to remember Allah at all moments"),
      difficulty: 1,
      questions: [
        { q: "When did he ﷺ remember Allah, Aishah said?", a: "At all moments", wrong: ["Only on Fridays", "Only in Ramadan", "Only when traveling"], why: "The Messenger of Allah ﷺ used to remember Allah at all moments, Aishah said." },
        { q: "What is dhikr?", a: "Keeping Allah in mind and on the tongue", wrong: ["Counting your money", "Reading poems aloud", "Telling old stories"], why: "Dhikr is remembering Allah, which he ﷺ did at all moments, Aishah said." },
        { q: "Dhikr is only for after the five prayers.", tf: false, why: "No. He ﷺ remembered Allah at all moments, not only after the prayers, Aishah said." }
      ]
    },
    {
      slug: "when-your-lips-say-his-name",
      title: "When your lips say His name",
      line: "Allah is with you when your lips move to remember Him.",
      facts: ["Told by Abu Hurairah", "A hadith qudsi: Allah's words told by him ﷺ", "Quiet dhikr with the lips counts too"],
      source: hadith("ibnmajah", "3792", "Abu Hurairah", "Sahih (Al-Albani)", "Abu Hurairah said: the Prophet ﷺ said: Allah says: I am with My servant when he remembers Me and his lips move with My name.", "I am with My slave when he remembers Me and his lips move saying My Name"),
      difficulty: 1,
      questions: [
        { q: "When is Allah with His servant, Allah says?", a: "When he remembers Him", wrong: ["When he is the richest", "When he wins a fight", "When people praise him"], why: "I am with My slave when he remembers Me and his lips move with My name, Allah says." },
        { q: "What moves when the servant remembers Allah?", a: "His lips", wrong: ["His toes", "His ears", "His shoulders"], why: "His lips move saying My Name, Allah says of the servant who remembers Him." },
        { q: "Quiet dhikr with moving lips is remembering Allah.", tf: true, why: "I am with My slave when he remembers Me and his lips move, Allah says." }
      ]
    },
    {
      slug: "those-who-have-gone-ahead",
      title: "Those who have gone ahead",
      line: "Those who remember Allah much have gone ahead of everyone.",
      facts: ["Told by Abu Hurairah", "He ﷺ said it passing Mount Jumdan, near Makkah", "Mufarridun: men and women who remember Allah much"],
      source: hadith("muslim", "2676", "Abu Hurairah", "Sahih", "Abu Hurairah said: the Messenger of Allah ﷺ was travelling on the road to Makkah and passed a mountain called Jumdan. He ﷺ said: move on, this is Jumdan; the mufarridun have gone ahead. They asked: who are the mufarridun, O Messenger of Allah? He ﷺ said: the men and women who remember Allah much.", "They are those males and females who remember Allah much"),
      difficulty: 2,
      questions: [
        { q: "Who are the mufarridun, he ﷺ said?", a: "Those who remember Allah much", wrong: ["Those who travel far", "Those who own mountains", "Those who sleep early"], why: "They are those males and females who remember Allah much, he ﷺ said." },
        { q: "Where was he ﷺ when he spoke of the mufarridun?", a: "On the road to Makkah", wrong: ["In a market in Syria", "On a ship at sea", "In a garden in Ta'if"], why: "He was travelling along the path to Makkah and passed a mountain called Jumdan." },
        { q: "Women who remember Allah much are among the mufarridun too.", tf: true, why: "Males and females who remember Allah much have gone ahead, he ﷺ said." }
      ]
    },
    {
      slug: "a-gathering-with-dhikr",
      title: "A gathering with dhikr",
      line: "Remember Allah whenever you sit together with people.",
      facts: ["Told by Abu Hurairah", "A gathering with no dhikr is like a dead donkey", "Such a gathering brings regret"],
      source: hadith("abudawud", "4855", "Abu Hurairah", "Sahih (Al-Albani)", "Abu Hurairah said: the Prophet ﷺ said: people who get up from a gathering in which they did not remember Allah are as if they got up from a dead donkey, and it will be a cause of regret for them.", "People who get up from an assembly in which they did not remember Allah"),
      difficulty: 2,
      questions: [
        { q: "Leaving a gathering with no dhikr is like leaving what?", a: "A dead donkey", wrong: ["A happy feast", "A fresh garden", "A full well"], why: "As if they had got up from a donkey's corpse, he ﷺ said of such people." },
        { q: "What will a gathering with no dhikr bring them?", a: "Regret", wrong: ["Great reward", "More friends", "New wealth"], why: "It will be a cause of grief to them, he ﷺ said of a gathering with no dhikr." },
        { q: "Friends sitting together should remember Allah in their talk.", tf: true, why: "People who get up from an assembly without remembering Allah will grieve, he ﷺ said." }
      ]
    },
    {
      slug: "a-dua-before-sleeping",
      title: "A du'a before sleeping",
      line: "At bedtime he ﷺ asked Allah: save me from Your punishment.",
      facts: ["Told by Al-Bara ibn Azib", "His head rested on his right hand", "Even at bedtime he ﷺ remembered Allah"],
      source: hadith("tirmidhi", "3399", "Al-Bara ibn Azib", "Sahih (Al-Albani)", "Al-Bara ibn Azib said: when going to sleep, the Messenger of Allah ﷺ used to rest his head on his right hand and say: My Lord, save me from Your punishment on the Day You raise Your servants.", "My Lord, safeguard me from Your punishment the Day You resurrect Your slaves"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ ask Allah for before sleeping?", a: "Safety from His punishment", wrong: ["A soft bed", "A long sleep", "A big dinner"], why: "My Lord, safeguard me from Your punishment the Day You resurrect Your slaves, he ﷺ said." },
        { q: "Where did he ﷺ rest his head when going to sleep?", a: "On his right hand", wrong: ["On his left hand", "On a pile of books", "On a tree trunk"], why: "He used to lay his head upon his right hand when going to sleep, Al-Bara said." },
        { q: "He ﷺ remembered Allah even as he lay down to sleep.", tf: true, why: "Resting his head on his right hand, he ﷺ asked for Allah's protection, Al-Bara said." }
      ]
    },
    {
      slug: "words-that-reach-the-throne",
      title: "Words that reach the Throne",
      line: "Sincere la ilaha illallah rises until it reaches the Throne.",
      facts: ["Told by Abu Hurairah", "The gates of heaven open for it", "As long as major sins are kept away"],
      source: hadith("tirmidhi", "3590", "Abu Hurairah", "Hasan (Al-Albani)", "Abu Hurairah said: the Messenger of Allah ﷺ said: no servant ever says la ilaha illallah sincerely except that the gates of heaven are opened for it until it reaches the Throne, as long as he avoids the major sins.", "except that the gates of heaven are opened for it, until it reaches to the Throne, so long as he avoids the major sins"),
      difficulty: 3,
      questions: [
        { q: "What opens for la ilaha illallah said sincerely?", a: "The gates of heaven", wrong: ["The doors of the market", "The gates of the city", "The windows of the house"], why: "The gates of heaven are opened for it, until it reaches to the Throne, he ﷺ said." },
        { q: "How far does sincere la ilaha illallah rise?", a: "To the Throne", wrong: ["To the clouds only", "To the mountain tops", "To the roof of the masjid"], why: "Until it reaches to the Throne, so long as he avoids the major sins, he ﷺ said." },
        { q: "Keeping away from major sins matters for la ilaha illallah to rise.", tf: true, why: "So long as he avoids the major sins, the gates of heaven open for it, he ﷺ said." }
      ]
    }
  ]
};

export const DUA_ALWAYS_UNITS: readonly DeepUnit[] = [ALWAYS];
