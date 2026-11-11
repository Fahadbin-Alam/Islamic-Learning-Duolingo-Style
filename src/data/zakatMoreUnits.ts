import { hadith, type DeepUnit } from "./deepKit";

// One more Zakat unit: sadaqah that everyone can give, rich or poor. Every card is one sahih hadith of al-Bukhari
// (number as sunnah.com gives it), with its exact English words to highlight. None of these hadith is taught
// anywhere else in the app, so the unit is all new.

const ANYONE: DeepUnit = {
  key: "zakat-anyone",
  topicId: "zakat",
  branchId: "zakat-charity-for-all",
  branch: { title: "Charity anyone can give", description: "Earning a little to give, passing charity on honestly, good intentions, and caring for the poor." },
  name: "charity anyone can give",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "working-to-give",
      title: "Working to give",
      line: "The poor Sahabah worked as porters so they could give charity.",
      facts: ["Told by Abu Mas'ud al-Ansari", "A mudd: a small measure of grain"],
      source: hadith("bukhari", "1416", "Abu Mas'ud al-Ansari", "Sahih", "Whenever the Messenger of Allah ﷺ told us to give charity, we would go to the market and work as porters until we earned a mudd of grain, and then give it in charity. Those were days of poverty.", "we used to go to the market and work as porters and get a Mudd"),
      difficulty: 1,
      questions: [
        { q: "When told to give charity, what did the poor Sahabah do?", a: "Worked as porters to earn some", wrong: ["Said they had nothing", "Waited for the rich", "Borrowed from traders"], why: "We used to go to the market and work as porters." },
        { q: "What did they earn, and then give away?", a: "A mudd of grain", wrong: ["A bag of gold", "A fine horse", "A new house"], why: "And get a Mudd (a special measure of grain) and then give it in charity." },
        { q: "Being poor stopped the Sahabah from giving.", tf: false, why: "They worked in the market so that they could give." }
      ]
    },
    {
      slug: "honest-helper",
      title: "The honest helper",
      line: "Pass charity on fully and gladly, and you are a giver too.",
      facts: ["Told by Abu Musa al-Ash'ari", "One of the two givers"],
      source: hadith("bukhari", "1438", "Abu Musa al-Ash'ari", "Sahih", "An honest Muslim storekeeper who does what he is told, gives in full what he was ordered to give, gladly, and to the one he was told to give it to, counts as one of the two givers of charity.", "is regarded as one of the two charitable persons"),
      difficulty: 1,
      questions: [
        { q: "You hand out your dad's charity in full, and gladly. What are you then?", a: "One of the two givers", wrong: ["Only the messenger", "Someone with no reward", "The one who owes it"], why: "He is regarded as one of the two charitable persons." },
        { q: "What must the helper do to share the reward?", a: "Give all of it, gladly", wrong: ["Keep a little back", "Give it a week late", "Grumble while giving"], why: "Pays fully what he has been ordered to give with a good heart." },
        { q: "Only the person whose money it is gets a reward.", tf: false, why: "The honest storekeeper is one of the two charitable persons." }
      ]
    },
    {
      slug: "what-you-intended",
      title: "Rewarded for what you meant",
      line: "Yazid's charity reached his own son, and he was still rewarded.",
      facts: ["Told by Ma'n ibn Yazid", "Allah rewards the intention"],
      source: hadith("bukhari", "1422", "Ma'n bin Yazid", "Sahih", "Yazid left some gold coins with a man in the masjid to give to the poor. His son Ma'n took them from that man and brought them to his father, who said he had not meant them for him. The Prophet ﷺ said: Yazid, you will be rewarded for what you intended; Ma'n, what you have taken is yours.", "you will be rewarded for what you intended"),
      difficulty: 1,
      questions: [
        { q: "Who ended up with Yazid's charity?", a: "His own son, Ma'n", wrong: ["The man in the masjid", "A rich trader", "No one at all"], why: "I went and took them and brought them to him." },
        { q: "What did he ﷺ tell Yazid?", a: "You get the reward you intended", wrong: ["Take the coins back", "Give it all again", "Your charity is lost"], why: "O Yazid, you will be rewarded for what you intended." },
        { q: "Ma'n had to give the coins back.", tf: false, why: "O Ma'n, whatever you have taken is yours." }
      ]
    },
    {
      slug: "caring-for-the-poor",
      title: "Looking after the poor",
      line: "Caring for a widow or poor person is like praying all night.",
      facts: ["Told by Abu Hurairah", "And like fasting every day"],
      source: hadith("bukhari", "5353", "Abu Hurairah", "Sahih", "The one who looks after a widow or a poor person is like one who strives in the way of Allah, or like one who prays all night and fasts all day.", "or like him who performs prayers all the night and fasts all the day"),
      difficulty: 2,
      questions: [
        { q: "Looking after a widow or a poor person is like what?", a: "Praying all night and fasting all day", wrong: ["Saying salam once", "Reading one page", "Going to the market"], why: "Like him who performs prayers all the night and fasts all the day." },
        { q: "Whom does Bukhari 5353 tell us to look after?", a: "A widow or a poor person", wrong: ["Only kings", "Only the rich", "Only our friends"], why: "The one who looks after a widow or a poor person." },
        { q: "Helping the needy can be as great as long worship.", tf: true, why: "He ﷺ compared it to praying all night and fasting all day." }
      ]
    },
    {
      slug: "giver-and-miser",
      title: "The giver and the miser",
      line: "The giver's iron cloak grows wide; the miser's stays tight.",
      facts: ["Told by Abu Hurairah", "A picture he ﷺ drew in words"],
      source: hadith("bukhari", "1443", "Abu Hurairah", "Sahih", "The giver and the miser are like two men wearing iron cloaks from chest to collarbone. When the giver gives, his cloak spreads until it covers his whole body. When the miser wants to spend, every ring sticks in its place, and it will not widen.", "The example of a miser and an almsgiver is like the example of two persons wearing iron cloaks"),
      difficulty: 2,
      questions: [
        { q: "What were the two men wearing in his ﷺ example?", a: "Iron cloaks", wrong: ["Silk robes", "Woollen hats", "Leather shoes"], why: "Two persons wearing iron cloaks." },
        { q: "What happens to the giver's cloak when he gives?", a: "It spreads to cover him", wrong: ["It falls off", "It gets heavier", "It stays the same"], why: "The cloak becomes capacious till it covers his whole body." },
        { q: "The miser's cloak loosens when he tries to spend.", tf: false, why: "Every ring gets stuck to its place, and it did not become wide." }
      ]
    },
    {
      slug: "no-one-will-take-it",
      title: "Before no one needs it",
      line: "Give now: a day will come when no one will take charity.",
      facts: ["Told by Harithah ibn Wahb", "Give while people still need it"],
      source: hadith("bukhari", "1411", "Harithah ibn Wahb", "Sahih", "O people, give in charity, for a time will come when a man will walk about with his charity and find no one to accept it. The one he offers it to will say: had you brought it yesterday I would have taken it, but today I have no need of it.", "Give in charity as a time will come upon you when a person will wander about with his object of charity and will not find anybody to accept it"),
      difficulty: 2,
      questions: [
        { q: "Why give charity now, says Bukhari 1411?", a: "A time will come when no one takes it", wrong: ["Charity will be banned", "Money will vanish", "Only kings will give"], why: "A time will come upon you when a person will not find anybody to accept it." },
        { q: "What will the man offered charity say?", a: "I would have taken it yesterday", wrong: ["Give me double", "Come back next week", "I never take gifts"], why: "If you had brought it yesterday, I would have taken it." },
        { q: "There will always be someone to give to, so we can wait.", tf: false, why: "Give in charity, as a time will come when no one accepts it." }
      ]
    }
  ]
};

export const ZAKAT_MORE_UNITS: DeepUnit[] = [ANYONE];
