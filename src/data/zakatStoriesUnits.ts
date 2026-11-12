import { hadith, type DeepUnit } from "./deepKit";

// One more Zakat unit: stories of charity, from Sahih al-Bukhari, Sunan Abi Dawud and Jami at-Tirmidhi. Charity
// that reached a thief, Nusaybah's sheep, a Bedouin's camels, a man deep in debt, a whip no one asked for, and what
// he ﷺ said in the shade of the Ka'bah. Every card is one sahih hadith with its number, narrator and grade, and its
// exact English words to highlight, and none of them is taught anywhere else in the app.

const STORIES: DeepUnit = {
  key: "zakat-stories-of-charity",
  topicId: "zakat",
  branchId: "zakat-stories-of-charity",
  branch: { title: "Stories of charity", description: "Charity that reached a thief, Nusaybah's sheep, a Bedouin's camels, a man deep in debt, a fallen whip, and the shade of the Ka'bah." },
  name: "stories of charity",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "charity-that-reached-a-thief",
      title: "Charity that reached a thief",
      line: "Charity that reached a thief might stop him from stealing.",
      facts: ["Told by Abu Hurairah", "Three nights, it went to the wrong hands", "Each time he said: O Allah, all praise is Yours"],
      source: hadith("bukhari", "1421", "Abu Hurairah", "Sahih", "Abu Hurairah said: the Messenger of Allah ﷺ said: a man said he would give some charity. He went out and, without knowing, gave it to a thief. In the morning people said: charity was given to a thief! He said: O Allah, all praise is Yours; I will give charity again. Then, without knowing, he gave it to a sinful woman, and then to a rich man, and each time people talked, and each time he praised Allah. Then someone came to him and said: your charity to the thief might make him stop stealing, to the woman might make her stop her sin, and to the rich man might make him learn and spend from what Allah has given him.", "The alms which you gave to the thief, might make him abstain from stealing"),
      difficulty: 1,
      questions: [
        { q: "Who got the man's charity on the first night?", a: "A thief", wrong: ["A poor orphan", "A sick old man", "A traveler"], why: "He went out and, without knowing, put his charity in the hand of a thief." },
        { q: "What did the man say each time people talked?", a: "O Allah, all praise is Yours", wrong: ["I will never give again", "I want my money back", "Who told you so?"], why: "He praised Allah each time, and said he would give charity again." },
        { q: "His charity might help the thief stop stealing.", tf: true, why: "The alms which you gave to the thief might make him abstain from stealing, he was told." }
      ]
    },
    {
      slug: "nusaybahs-sheep",
      title: "Nusaybah's sheep",
      line: "Once charity reaches the poor, they may give it as a gift.",
      facts: ["Told by Umm Atiyyah, whose name was Nusaybah", "She sent some of a charity sheep to Aishah", "He ﷺ asked Aishah for something to eat"],
      source: hadith("bukhari", "1446", "Umm Atiyyah", "Sahih", "Umm Atiyyah, Nusaybah al-Ansariyyah, said: a sheep was sent to me as charity, and I sent some of it to Aishah. The Prophet ﷺ asked Aishah for something to eat. She said there was nothing except what Nusaybah had sent of that sheep. He ﷺ said: bring it, for it has reached its place.", "Bring it as it has reached its place"),
      difficulty: 1,
      questions: [
        { q: "What was sent to Nusaybah as charity?", a: "A sheep", wrong: ["A camel", "A sack of wheat", "A bag of silver"], why: "A sheep was sent to me in charity, and I sent some of it to Aishah, she said." },
        { q: "What did he ﷺ say about the meat?", a: "Bring it, it has reached its place", wrong: ["Give it back to her", "We cannot touch it", "Throw it away"], why: "The charity had already reached Nusaybah, so what she sent on was a gift." },
        { q: "Aishah had plenty of other food that day.", tf: false, why: "No. Aishah said there was nothing except what Nusaybah had sent of that sheep." }
      ]
    },
    {
      slug: "a-bedouins-camels",
      title: "A Bedouin's camels",
      line: "Wherever you live, Allah will not waste your good deeds.",
      facts: ["Told by Abu Sa'id al-Khudri", "Moving for hijrah, he ﷺ said, is very hard", "The Bedouin had camels and paid their zakat"],
      source: hadith("bukhari", "1452", "Abu Sa'id al-Khudri", "Sahih", "Abu Sa'id said: a Bedouin asked the Messenger of Allah ﷺ about hijrah, moving to live in Madinah. He said: may Allah have mercy on you, hijrah is very hard. Do you have camels? Do you pay their zakat? He said: yes. He ﷺ said: then do good deeds even from beyond the seas, and Allah will not let any of your deeds go to waste.", "Work beyond the seas and Allah will not decrease"),
      difficulty: 2,
      questions: [
        { q: "What did the Bedouin ask about?", a: "Hijrah, moving to Madinah", wrong: ["Buying a horse", "Building a house", "Finding water"], why: "A Bedouin asked the Messenger of Allah ﷺ about the emigration, Abu Sa'id said." },
        { q: "What did he ﷺ ask the Bedouin about his camels?", a: "If he paid their zakat", wrong: ["If they were fast", "If they gave milk", "If he would sell them"], why: "The Bedouin said: yes, I have camels and I pay their zakat." },
        { q: "He ﷺ told the Bedouin his good deeds would not be wasted.", tf: true, why: "Work beyond the seas, and Allah will not decrease any of your good deeds, he ﷺ said." }
      ]
    },
    {
      slug: "a-man-deep-in-debt",
      title: "A man deep in debt",
      line: "When a man fell into debt, he ﷺ said: give him charity.",
      facts: ["Told by Abu Sa'id al-Khudri", "He lost money on fruit, and his debt grew", "The people gave, but it was not enough"],
      source: hadith("tirmidhi", "655", "Abu Sa'id al-Khudri", "Sahih (Al-Albani)", "Abu Sa'id said: in the time of the Messenger of Allah ﷺ, a man lost money on fruit he had traded, and his debt grew. He ﷺ said: give him charity. So the people gave him charity, but it did not cover his debt. Then he ﷺ told the men he owed: take what you find, and there is nothing more for you than that.", "a man suffered a loss on fruits that he had sold, resulting in more debt"),
      difficulty: 2,
      questions: [
        { q: "Why did the man fall into debt?", a: "He lost money on fruit", wrong: ["He lost his camel", "He built a big house", "He lent it all away"], why: "A man suffered a loss on fruits he had traded, and his debt grew, Abu Sa'id said." },
        { q: "What did he ﷺ tell the people to do?", a: "Give him charity", wrong: ["Take his house", "Leave him alone", "Send him away"], why: "So the people gave to the man, though it did not cover all of his debt." },
        { q: "The charity paid off all of the man's debt.", tf: false, why: "No. The people gave him charity, but it did not cover his debt." }
      ]
    },
    {
      slug: "even-a-fallen-whip",
      title: "Even a fallen whip",
      line: "They pledged never to beg, not even for a fallen whip.",
      facts: ["Told by Awf ibn Malik", "Seven, eight or nine of them were there", "He ﷺ said the last part quietly"],
      source: hadith("abudawud", "1642", "Awf ibn Malik", "Sahih (Al-Albani)", "Awf ibn Malik said: we were with the Messenger of Allah ﷺ, seven, eight or nine of us. He said: will you pledge to the Messenger of Allah? We said: we have already pledged to you. He said it three times, so we stretched out our hands and pledged. We asked: on what do we pledge? He said: that you worship Allah and join nothing with Him, pray the five prayers, listen and obey. And he said quietly: and do not ask people for anything. Later, when the whip of one of those men fell to the ground, he would not ask anyone to pick it up for him.", "When the whip fell on the ground, none of that group asked anyone to pick up the whip for him"),
      difficulty: 2,
      questions: [
        { q: "How many men were with him ﷺ that day?", a: "Seven, eight or nine", wrong: ["Two or three", "About forty", "A hundred"], why: "Awf said they were seven, eight or nine men with the Messenger of Allah ﷺ." },
        { q: "What did he ﷺ say quietly at the end?", a: "Do not beg from people", wrong: ["Do not sleep late", "Do not travel alone", "Do not eat standing"], why: "He uttered a word quietly: and do not beg from the people, Awf said." },
        { q: "Later, they would not even ask someone to pick up a fallen whip.", tf: true, why: "When the whip fell on the ground, none of that group asked anyone to pick it up." }
      ]
    },
    {
      slug: "in-the-shade-of-the-kabah",
      title: "In the shade of the Ka'bah",
      line: "The wealthy lose out, unless they give freely on every side.",
      facts: ["Told by Abu Dharr", "He ﷺ was sitting in the shade of the Ka'bah", "Abu Dharr feared it was about him"],
      source: hadith("bukhari", "6638", "Abu Dharr", "Sahih", "Abu Dharr said: I came to the Prophet ﷺ while he sat in the shade of the Ka'bah, saying: they are the losers, by the Lord of the Ka'bah! They are the losers, by the Lord of the Ka'bah! I said to myself: what is wrong with me? Has something been seen in me? I sat beside him and he kept saying it, and I could not stay quiet. So I said: who are they, may my father and mother be ransomed for you, O Messenger of Allah? He said: they are the wealthy, except the one who gives like this, and like this, and like this.", "They are the wealthy people, except the one who does like this and like this"),
      difficulty: 2,
      questions: [
        { q: "Where was he ﷺ sitting when Abu Dharr came?", a: "In the shade of the Ka'bah", wrong: ["Under a palm tree", "At the market", "On Mount Uhud"], why: "Abu Dharr reached him ﷺ while he sat there, saying: they are the losers." },
        { q: "Who did he ﷺ say were the losers?", a: "The wealthy, except those who give", wrong: ["The poor who have little", "Those who travel far", "Those who sleep early"], why: "They are the wealthy people, except the one who spends like this and like this." },
        { q: "Abu Dharr worried that the words were about him.", tf: true, why: "Abu Dharr asked himself what was wrong with him, and sat down, full of worry." }
      ]
    }
  ]
};

export const ZAKAT_STORIES_UNITS: DeepUnit[] = [STORIES];
