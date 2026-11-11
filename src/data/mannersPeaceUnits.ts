import { hadith, type DeepUnit } from "./deepKit";

// One more Manners unit: making peace, from the Book of Peacemaking and the Book of Wrongs in Sahih al-Bukhari.
// Going out to make peace between people who fought, the man who swore not to do a kindness, half a debt let go,
// the most quarrelsome person, putting a wrong right before the Day comes, and a case won unfairly. Every card is one
// sahih hadith with its number and narrator, and its exact English words to highlight, and none of them is taught
// anywhere else in the app.

const PEACE: DeepUnit = {
  key: "manners-making-peace",
  topicId: "manners",
  branchId: "manners-making-peace",
  branch: { title: "Making peace", description: "Going out to make peace, the man who swore, half a debt let go, the most quarrelsome, putting wrongs right before that Day, and a case won unfairly." },
  name: "making peace between people",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "let-us-make-peace",
      title: "Let us go and make peace",
      line: "When people fought, he ﷺ went himself to make peace.",
      facts: ["Told by Sahl ibn Sa'd", "The people of Quba had fought"],
      source: hadith("bukhari", "2693", "Sahl ibn Sa'd", "Sahih", "Sahl ibn Sa'd said: once the people of Quba fought each other until they threw stones at each other. When the Messenger of Allah ﷺ was told about it, he said: let us go and make peace between them.", "Let us go to bring about a reconciliation between them"),
      difficulty: 1,
      questions: [
        { q: "What did the people of Quba do to each other?", a: "They threw stones at each other", wrong: ["They raced their camels", "They built a new well", "They shared their dates"], why: "They fought with each other till they threw stones on each other." },
        { q: "What did he ﷺ say when he was told about the fight?", a: "Let us go and make peace", wrong: ["Bring me some water", "Tell me their names", "Let us eat first"], why: "Let us go to bring about a reconciliation between them, he ﷺ said." },
        { q: "Making peace between Muslims who fight is a good deed.", tf: true, why: "He ﷺ went out himself to bring about a reconciliation between them." }
      ]
    },
    {
      slug: "the-man-who-swore",
      title: "The man who swore",
      line: "He ﷺ asked who had sworn not to do a kindness.",
      facts: ["Told by Aishah", "Two men argued over a debt"],
      source: hadith("bukhari", "2705", "Aishah", "Sahih", "Aishah said: the Messenger of Allah ﷺ heard the loud voices of two men arguing at the door. One asked the other to let go of part of his debt and to be easy on him, and the other said: by Allah, I will not. He ﷺ went out to them and said: who swore by Allah that he would not do a good deed? The man said: I did, O Messenger of Allah, and he may have whatever he wishes.", "Who is the one who was swearing by Allah that he would not do a favor"),
      difficulty: 2,
      questions: [
        { q: "What did one man ask the other to do?", a: "Let go of part of his debt", wrong: ["Sell him a camel", "Lend him more money", "Leave the town"], why: "One of them was appealing to the other to deduct his debt and be lenient." },
        { q: "What did the man say once he ﷺ came out?", a: "He may have whatever he wishes", wrong: ["I will never forgive him", "Let a judge decide", "Come back next year"], why: "I am that person, O Messenger of Allah! I will give him whatever he wishes." },
        { q: "The man kept his harsh oath after he ﷺ came out.", tf: false, why: "No. The man gave way: I will give him whatever he wishes, he said." }
      ]
    },
    {
      slug: "let-go-of-half",
      title: "Let go of half",
      line: "He ﷺ asked Ka'b to drop half of what he was owed.",
      facts: ["Told by Ka'b ibn Malik", "Voices rose in the masjid"],
      source: hadith("bukhari", "2710", "Ka'b ibn Malik", "Sahih", "Ka'b ibn Malik asked Ibn Abi Hadrad in the masjid to pay back a debt, and their voices grew loud until the Messenger of Allah ﷺ heard them in his house. He lifted the curtain of his room and called: O Ka'b! Ka'b said: at your service, O Messenger of Allah. He pointed with his hand: drop half the debt. Ka'b said: I agree, O Messenger of Allah. Then he ﷺ said to the other man: get up and pay him the rest.", "He beckoned to him with his hand suggesting that he deduct half the debt"),
      difficulty: 2,
      questions: [
        { q: "Where did Ka'b and the other man argue loudly?", a: "In the masjid", wrong: ["In the market", "On a journey", "At a well"], why: "He demanded his debt from Ibn Abi Hadrad in the masjid, and voices grew loud." },
        { q: "What did he ﷺ ask Ka'b to do with the debt?", a: "Drop half of it", wrong: ["Ask for double", "Wait one more year", "Forget the whole of it"], why: "He beckoned to him with his hand suggesting that he deduct half the debt." },
        { q: "He ﷺ told the other man to pay the rest straight away.", tf: true, why: "Get up and pay him the rest, he ﷺ said to Ibn Abi Hadrad." }
      ]
    },
    {
      slug: "the-most-quarrelsome",
      title: "The one who always argues",
      line: "The most hated to Allah is the one who always quarrels.",
      facts: ["Told by Aishah", "Arguing hard, again and again"],
      source: hadith("bukhari", "2457", "Aishah", "Sahih", "The Prophet ﷺ said: the most hated person in the sight of Allah is the most quarrelsome person.", "The most hated person in the sight of Allah is the most quarrelsome person"),
      difficulty: 1,
      questions: [
        { q: "Which person is most hated in the sight of Allah, he ﷺ said?", a: "The most quarrelsome person", wrong: ["The quietest person", "The poorest person", "The youngest person"], why: "The one who argues the most, again and again, Aishah reported." },
        { q: "Who reported his words about the quarrelsome person?", a: "Aishah", wrong: ["Abu Bakr", "Umm Salamah", "Ka'b ibn Malik"], why: "Aishah narrated it, in Sahih al-Bukhari 2457." },
        { q: "Arguing again and again to win is loved by Allah.", tf: false, why: "No. The most quarrelsome person is the most hated in the sight of Allah." }
      ]
    },
    {
      slug: "before-that-day",
      title: "Put it right today",
      line: "If you wronged someone, ask them to forgive you now.",
      facts: ["Told by Abu Hurairah", "On that Day, no money pays it back"],
      source: hadith("bukhari", "2449", "Abu Hurairah", "Sahih", "The Messenger of Allah ﷺ said: whoever has wronged another person, in his good name or anything else, should ask him to forgive him today, before the Day of Resurrection, when there will be no money. If he has good deeds, they will be taken from him for the wrong he did, and if he has none, the sins of the one he wronged will be put on him.", "he should beg him to forgive him before the Day of Resurrection when there will be no money"),
      difficulty: 2,
      questions: [
        { q: "When should you ask forgiveness from someone you wronged?", a: "Now, before the Day comes", wrong: ["Only on the day of Eid", "Only when you are old", "Never, just forget it"], why: "Before the Day of Resurrection when there will be no money, he ﷺ said." },
        { q: "What is taken from the wrongdoer on that Day, if he has them?", a: "His good deeds", wrong: ["His house and land", "His gold coins", "His horses"], why: "Those good deeds will be taken from him according to the wrong he did." },
        { q: "Wronging someone's good name is a small thing with no cost.", tf: false, why: "No. Wronging his good name must be put right before the Day, or deeds are taken." }
      ]
    },
    {
      slug: "a-case-won-unfairly",
      title: "A case won unfairly",
      line: "Never take what is not yours, even if a judge allows it.",
      facts: ["Told by Umm Salamah", "People argued at his door"],
      source: hadith("bukhari", "2458", "Umm Salamah", "Sahih", "Umm Salamah said: the Messenger of Allah ﷺ heard people arguing at the door of his room. He came out and said: I am only a human being, and people with disputes come to me. One may put his case better than the other, so that I think he is right and judge for him. If I give someone a Muslim's right by mistake, it is a piece of the Fire, so let him take it or leave it.", "I am only a human being, and opponents come to me"),
      difficulty: 2,
      questions: [
        { q: "Why might someone win a case that is not his?", a: "He puts his case better", wrong: ["He is much older", "He is very rich", "He came first"], why: "Maybe someone amongst you can present his case more eloquently than the other." },
        { q: "What is a right taken unfairly, he ﷺ said?", a: "A piece of the Fire", wrong: ["A just reward", "A small mistake", "A lucky win"], why: "Then it is really a portion of the Fire, so take it or leave it." },
        { q: "If you win a case unfairly, the thing becomes truly yours.", tf: false, why: "No. A thing won unfairly is a portion of the Fire, he ﷺ said." }
      ]
    }
  ]
};

export const MANNERS_PEACE_UNITS: DeepUnit[] = [PEACE];
