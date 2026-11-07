import { hadith, quran, quranQuote, type DeepUnit } from "./deepKit";

// Deep units for the Zakat topic, added after its own four units: zakat as a pillar, zakat al-Fitr, everyday
// charity, and spending the way the Quran teaches. Every card is from the Quran or a hadith checked on sunnah.com
// (number and grade as sunnah.com gives them). Zakat amounts and rules the schools of fiqh differ on are left out.

const PILLAR: DeepUnit = {
  key: "zakat-pillar",
  topicId: "zakat",
  branchId: "zakat-pillar",
  branch: { title: "Zakat in Islam", description: "Why zakat stands next to prayer, and what it does for the giver." },
  name: "zakat in Islam",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "five-pillars",
      title: "One of five",
      line: "Islam is built on five, and paying zakat is one of them.",
      facts: ["The third pillar"],
      source: hadith("bukhari", "8", "Ibn Umar", "Sahih", "Islam is built on five: the testimony that none is worthy of worship but Allah and that Muhammad is His Messenger, prayer, zakat, Hajj, and fasting Ramadan."),
      difficulty: 1,
      questions: [
        { q: "How many pillars is Islam built on?", a: "Five", wrong: ["Three", "Seven", "Ten"], why: "Sahih al-Bukhari 8." },
        { q: "Which of these is a pillar of Islam?", a: "Paying zakat", wrong: ["Owning a shop", "Learning to swim", "Visiting Rome"], why: "Zakat is named among the five." },
        { q: "Zakat is an extra good deed, not a duty.", tf: false, why: "It is one of the five pillars." }
      ]
    },
    {
      slug: "with-prayer",
      title: "Prayer and zakat together",
      line: "Establish prayer, give zakat, and bow with those who bow.",
      facts: ["Quran 2:43", "Often named together"],
      quote: quranQuote(2, 43),
      source: quran(2, 43, "And establish prayer and give zakat and bow with those who bow."),
      difficulty: 1,
      questions: [
        { q: "In Quran 2:43, zakat is named right after what?", a: "Prayer", wrong: ["Hajj", "Trade", "Sleep"], why: "Establish prayer and give zakat." },
        { q: "What else does the ayah tell us to do?", a: "Bow with those who bow", wrong: ["Travel far", "Stay alone", "Build a tower"], why: "Pray together with the believers." },
        { q: "The Quran often names prayer and zakat together.", tf: true, why: "Like in Quran 2:43." }
      ]
    },
    {
      slug: "rich-to-poor",
      title: "From the rich to the poor",
      line: "Zakat is taken from their rich and given to their poor.",
      facts: ["Mu'adh sent to Yemen"],
      source: hadith("bukhari", "1395", "Ibn Abbas", "Sahih", "The Prophet ﷺ sent Mu'adh to Yemen: teach them that Allah has made zakat a duty on their wealth, taken from their rich and given to their poor."),
      difficulty: 1,
      questions: [
        { q: "Who is zakat taken from?", a: "Those with enough wealth", wrong: ["The poorest", "Only kings", "Only children"], why: "Taken from their rich." },
        { q: "Who did he ﷺ send to Yemen to teach this?", a: "Mu'adh", wrong: ["Abu Jahl", "Heraclius", "Abu Lahab"], why: "Sahih al-Bukhari 1395." },
        { q: "In Yemen, zakat went to Yemen's own poor.", tf: true, why: "Given to their poor." }
      ]
    },
    {
      slug: "purify",
      title: "It cleans and grows",
      line: "Charity from their wealth purifies them and makes them grow.",
      facts: ["Quran 9:103", "Purify and grow"],
      quote: quranQuote(9, 103),
      source: quran(9, 103, "Take from their wealth a charity by which you purify them and cause them increase, and pray for them."),
      difficulty: 2,
      questions: [
        { q: "What does charity do for the giver, says 9:103?", a: "Purifies them and makes them grow", wrong: ["Makes them poor", "Makes them proud", "Nothing"], why: "Purify them and cause them increase." },
        { q: "What was the Prophet ﷺ told to do for the givers?", a: "Pray for them", wrong: ["Scold them", "Ignore them", "Fine them"], why: "Your prayers are comfort for them." },
        { q: "Zakat helps the giver's heart, not only the poor.", tf: true, why: "It purifies the giver." }
      ]
    },
    {
      slug: "never-less",
      title: "Charity never lessens",
      line: "Charity never makes wealth less.",
      facts: ["Forgiving brings honor", "Humility raises you"],
      source: hadith("muslim", "2588", "Abu Hurairah", "Sahih", "Charity does not decrease wealth. Allah adds honor to one who forgives, and raises one who humbles himself for Allah."),
      difficulty: 1,
      questions: [
        { q: "Does charity make your wealth less?", a: "No, never", wrong: ["Yes, always", "Only on Fridays", "Only big gifts"], why: "Sahih Muslim 2588." },
        { q: "What does Allah give someone who forgives?", a: "More honor", wrong: ["Less money", "Shame", "Nothing"], why: "Allah adds honor to one who forgives." },
        { q: "Humbling yourself for Allah lowers you.", tf: false, why: "Allah raises the one who is humble for Him." }
      ]
    },
    {
      slug: "puts-out-sin",
      title: "Water on fire",
      line: "Charity puts out sins the way water puts out fire.",
      facts: ["Told to Mu'adh", "Doors of good"],
      source: hadith("tirmidhi", "2616", "Mu'adh bin Jabal", "Sahih", "Shall I not guide you to the doors of good? Fasting is a shield, and charity puts out sins as water puts out fire, and a man's prayer in the depth of the night."),
      difficulty: 2,
      questions: [
        { q: "What does charity do to sins?", a: "Puts them out like water on fire", wrong: ["Makes them bigger", "Hides them forever", "Nothing"], why: "Jami at-Tirmidhi 2616." },
        { q: "What did he ﷺ call fasting in the same hadith?", a: "A shield", wrong: ["A burden", "A game", "A trade"], why: "Fasting is a shield." },
        { q: "Night prayer is also among the doors of good.", tf: true, why: "A man's prayer in the depth of the night." }
      ]
    }
  ]
};

const FITR: DeepUnit = {
  key: "zakat-fitr",
  topicId: "zakat",
  branchId: "zakat-al-fitr",
  branch: { title: "Zakat al-Fitr", description: "The small charity at the end of Ramadan, so every family can enjoy Eid." },
  name: "zakat al-Fitr",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "everyone",
      title: "On every Muslim",
      line: "Zakat al-Fitr is due on every Muslim, young or old.",
      facts: ["A sa' of food", "Children too"],
      source: hadith("bukhari", "1503", "Ibn Umar", "Sahih", "The Messenger of Allah ﷺ made zakat al-Fitr one sa' of dates or barley due on every Muslim, male or female, young or old, and ordered it paid before people go out to the Eid prayer."),
      difficulty: 1,
      questions: [
        { q: "Who is zakat al-Fitr given for?", a: "Every Muslim, young or old", wrong: ["Only the rich", "Only men", "Only scholars"], why: "Sahih al-Bukhari 1503." },
        { q: "What is it paid in, in this hadith?", a: "A sa' of dates or barley", wrong: ["Gold coins", "Camels", "Silk"], why: "One sa' of dates or barley." },
        { q: "A baby's zakat al-Fitr is paid too.", tf: true, why: "Young or old; parents pay it for them." }
      ]
    },
    {
      slug: "before-prayer",
      title: "Before the Eid prayer",
      line: "Paid before the Eid prayer, it is zakat; after, plain charity.",
      facts: ["Timing matters"],
      source: hadith("abudawud", "1609", "Abdullah ibn Abbas", "Hasan", "Whoever pays it before the Eid prayer, it is accepted zakat; whoever pays it after the prayer, it is just one of the charities."),
      difficulty: 2,
      questions: [
        { q: "When should zakat al-Fitr be paid?", a: "Before the Eid prayer", wrong: ["A month after Eid", "At Hajj", "Next Ramadan"], why: "Sunan Abi Dawud 1609." },
        { q: "Paid after the prayer, what does it count as?", a: "Ordinary charity", wrong: ["Double zakat", "Nothing at all", "A fast"], why: "Just one of the charities." },
        { q: "The time it is paid matters.", tf: true, why: "Before the prayer it is zakat al-Fitr." }
      ]
    },
    {
      slug: "two-purposes",
      title: "Two reasons",
      line: "Zakat al-Fitr cleans the fast and feeds the poor on Eid.",
      facts: ["Cleans the fast", "Feeds the poor"],
      source: hadith("abudawud", "1609", "Abdullah ibn Abbas", "Hasan", "The Messenger of Allah ﷺ made zakat al-Fitr a purification for the fasting person from idle and bad talk, and food for the poor."),
      difficulty: 1,
      questions: [
        { q: "What does zakat al-Fitr clean?", a: "The fast, from idle talk", wrong: ["The house", "The masjid floor", "Your clothes"], why: "A purification for the fasting person." },
        { q: "Who does it feed?", a: "The poor", wrong: ["The rich", "Only guests", "Animals only"], why: "And food for the poor." },
        { q: "Zakat al-Fitr helps poor families enjoy Eid.", tf: true, why: "It is food for the poor at Eid." }
      ]
    },
    {
      slug: "foods",
      title: "What they gave",
      line: "They gave a sa' of food: barley, dates, cheese or raisins.",
      facts: ["A sa' is a measure", "Everyday food"],
      source: hadith("bukhari", "1506", "Abu Sa'id al-Khudri", "Sahih", "We used to give one sa' of food, or barley, or dates, or dried cheese, or raisins, as zakat al-Fitr."),
      difficulty: 2,
      questions: [
        { q: "What did the Companions give as zakat al-Fitr?", a: "A sa' of everyday food", wrong: ["Jewelry", "Horses", "Perfume"], why: "Sahih al-Bukhari 1506." },
        { q: "Which of these was on Abu Sa'id's list?", a: "Raisins", wrong: ["Honey cakes", "Olive oil", "Meat"], why: "Barley, dates, dried cheese or raisins." },
        { q: "A sa' is a measure of food.", tf: true, why: "Roughly a few kilograms of food." }
      ]
    }
  ]
};

const EVERYDAY: DeepUnit = {
  key: "zakat-everyday",
  topicId: "zakat",
  branchId: "zakat-everyday-charity",
  branch: { title: "Everyday charity", description: "Charity is not only money: smiles, help, trees and a kind word count too." },
  name: "everyday charity",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "every-good",
      title: "Every good is charity",
      line: "Every good deed is a charity.",
      facts: ["Not only money"],
      source: hadith("bukhari", "6021", "Jabir bin Abdullah", "Sahih", "The Prophet ﷺ said: every good deed is a charity."),
      difficulty: 1,
      questions: [
        { q: "What counts as charity?", a: "Every good deed", wrong: ["Only gold", "Only big gifts", "Only zakat"], why: "Sahih al-Bukhari 6021." },
        { q: "Can a child with no money give charity?", a: "Yes, by doing good", wrong: ["No, never", "Only when grown", "Only on Eid"], why: "Every good deed is charity." },
        { q: "Charity is only about money.", tf: false, why: "Every good deed counts." }
      ]
    },
    {
      slug: "smile",
      title: "A smile is charity",
      line: "Smiling at your brother is charity.",
      facts: ["Guiding the lost too"],
      source: hadith("tirmidhi", "1956", "Abu Dharr", "Sahih", "Your smile in your brother's face is charity; enjoining good is charity; guiding a lost man is charity; removing a stone, thorn or bone from the road is charity."),
      difficulty: 1,
      questions: [
        { q: "What simple act is charity, says this hadith?", a: "Smiling at your brother", wrong: ["Frowning", "Ignoring people", "Shouting"], why: "Jami at-Tirmidhi 1956." },
        { q: "Showing a lost person the way is what?", a: "Charity", wrong: ["A waste of time", "Rude", "Not allowed"], why: "Guiding a lost man is charity." },
        { q: "Who narrated this hadith?", a: "Abu Dharr", wrong: ["Abu Jahl", "Heraclius", "Abu Lahab"], why: "Abu Dharr al-Ghifari." }
      ]
    },
    {
      slug: "road",
      title: "Clear the road",
      line: "Moving a stone, thorn or bone off the road is charity.",
      facts: ["Help everyone who passes"],
      source: hadith("tirmidhi", "1956", "Abu Dharr", "Sahih", "Your removing a stone, a thorn or a bone from the road is charity for you."),
      difficulty: 1,
      questions: [
        { q: "You see a thorn on the path. What do you do?", a: "Move it: that is charity", wrong: ["Walk around it", "Kick it at someone", "Leave it for later"], why: "Removing a thorn from the road is charity." },
        { q: "Which of these is named in the hadith?", a: "A stone, a thorn or a bone", wrong: ["A coin", "A book", "A shoe"], why: "Jami at-Tirmidhi 1956." },
        { q: "Helping strangers on the road gets reward.", tf: true, why: "It is charity for you." }
      ]
    },
    {
      slug: "tree",
      title: "Plant a tree",
      line: "Plant a tree; whatever eats from it is charity for you.",
      facts: ["Birds, people, animals"],
      source: hadith("bukhari", "2320", "Anas bin Malik", "Sahih", "No Muslim plants a tree or sows a seed, and then a bird, a person or an animal eats from it, except that it is charity for him."),
      difficulty: 1,
      questions: [
        { q: "A bird eats fruit from your tree. What is it for you?", a: "Charity", wrong: ["A loss", "A sin", "Nothing"], why: "Sahih al-Bukhari 2320." },
        { q: "Who eating from it counts?", a: "A bird, person or animal", wrong: ["Only people", "Only the poor", "Only family"], why: "All three are named." },
        { q: "Planting seeds can be worship.", tf: true, why: "It becomes charity for you." }
      ]
    },
    {
      slug: "thirsty-dog",
      title: "Water for a thirsty dog",
      line: "A man gave a thirsty dog water, and Allah forgave him.",
      facts: ["Water in his shoe", "Kindness to animals"],
      source: hadith("bukhari", "2363", "Abu Hurairah", "Sahih", "A man saw a dog so thirsty it was eating mud. He went down a well, filled his shoe with water and gave it to the dog. Allah thanked him and forgave him."),
      difficulty: 1,
      questions: [
        { q: "How did the man carry the water?", a: "In his shoe", wrong: ["In a bucket", "In a jar", "In his hat"], why: "Sahih al-Bukhari 2363." },
        { q: "What did Allah do for him?", a: "Thanked and forgave him", wrong: ["Nothing", "Made him a king", "Gave him a dog"], why: "Allah thanked him and forgave him." },
        { q: "Is there reward for kindness to animals?", a: "Yes, for every living thing", wrong: ["No", "Only for camels", "Only for cats"], why: "He ﷺ said so after this story." }
      ]
    },
    {
      slug: "upper-hand",
      title: "The upper hand",
      line: "The upper hand, the giver, is better than the lower hand.",
      facts: ["Upper hand gives", "Lower hand asks"],
      source: hadith("bukhari", "1429", "Ibn Umar", "Sahih", "Speaking about charity and not begging, he ﷺ said: the upper hand is better than the lower hand. The upper hand gives, and the lower hand asks."),
      difficulty: 2,
      questions: [
        { q: "Whose hand is the upper hand?", a: "The giver's", wrong: ["The asker's", "The richest man's", "The tallest man's"], why: "Sahih al-Bukhari 1429." },
        { q: "What does this teach?", a: "Give, and avoid begging", wrong: ["Always ask others", "Never share", "Hide your money"], why: "He ﷺ said it about charity and not begging." },
        { q: "The lower hand is the one that asks.", tf: true, why: "As the hadith explains." }
      ]
    },
    {
      slug: "give-now",
      title: "Give while you can",
      line: "The best charity is given while healthy and wishing to be rich.",
      facts: ["Don't wait for old age"],
      source: hadith("bukhari", "1419", "Abu Hurairah", "Sahih", "Asked which charity is best, he ﷺ said: what you give while healthy, holding on to wealth, fearing poverty and hoping to be rich. Don't delay it until death is near."),
      difficulty: 2,
      questions: [
        { q: "Which charity is best?", a: "Given while healthy and wanting money", wrong: ["Given only at death", "Given by force", "Given to show off"], why: "Sahih al-Bukhari 1419." },
        { q: "What did he ﷺ warn against?", a: "Waiting until death is near", wrong: ["Giving too early", "Giving secretly", "Giving dates"], why: "Don't delay it until the end." },
        { q: "Giving is harder, and better, when you want the money.", tf: true, why: "That is when it is best." }
      ]
    },
    {
      slug: "umar-land",
      title: "Charity that keeps going",
      line: "Umar kept his best land so its fruit went to charity forever.",
      facts: ["A waqf: an endowment", "Never to be sold"],
      source: hadith("bukhari", "2737", "Ibn Umar", "Sahih", "Umar got land in Khaybar, the best he ever had. The Prophet ﷺ said: if you like, keep the land itself and give its fruit in charity. So Umar did, on condition it is never sold."),
      difficulty: 3,
      questions: [
        { q: "What did Umar do with his best land?", a: "Gave its fruit to charity forever", wrong: ["Sold it fast", "Built a palace", "Left it empty"], why: "Sahih al-Bukhari 2737." },
        { q: "What is a waqf?", a: "Property kept for charity forever", wrong: ["A kind of prayer", "A tax on travel", "A market day"], why: "The land stays; its fruit goes to charity." },
        { q: "Umar's land could be sold later.", tf: false, why: "On condition that it is never sold." }
      ]
    }
  ]
};

const SPEND: DeepUnit = {
  key: "zakat-spend",
  topicId: "zakat",
  branchId: "zakat-spend-quran",
  branch: { title: "Spending, the Quran's way", description: "What the Quran teaches about giving: grow it, keep it kind, give your best." },
  name: "spending in the Quran",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "seven-hundred",
      title: "One seed, 700 grains",
      line: "Spending for Allah is like a seed that grows seven ears.",
      facts: ["Quran 2:261", "100 grains each"],
      quote: quranQuote(2, 261),
      source: quran(2, 261, "Those who spend their wealth in the way of Allah are like a seed that grows seven ears; in each ear a hundred grains. And Allah multiplies for whom He wills."),
      difficulty: 1,
      questions: [
        { q: "One seed grows how many ears in this ayah?", a: "Seven", wrong: ["One", "Three", "Ten"], why: "Quran 2:261." },
        { q: "How many grains in each ear?", a: "A hundred", wrong: ["Ten", "Seven", "A thousand"], why: "In each ear a hundred grains." },
        { q: "Allah can multiply it even more.", tf: true, why: "Allah multiplies for whom He wills." }
      ]
    },
    {
      slug: "no-reminders",
      title: "No reminders, no hurt",
      line: "Don't follow your charity with reminders or hurt.",
      facts: ["Quran 2:262", "No fear, no grief"],
      quote: quranQuote(2, 262),
      source: quran(2, 262, "Those who spend in the way of Allah and do not follow it with reminders or hurt will have their reward with their Lord; no fear on them, nor will they grieve."),
      difficulty: 1,
      questions: [
        { q: "What spoils a charity, says 2:262?", a: "Reminders or hurt after it", wrong: ["Giving in secret", "Giving early", "Giving dates"], why: "Do not follow it with reminders or hurt." },
        { q: "What do kind givers get?", a: "Reward, with no fear or grief", wrong: ["A medal", "Nothing", "Fame"], why: "Their reward is with their Lord." },
        { q: "Saying 'remember what I gave you' is good manners.", tf: false, why: "Reminders spoil charity." }
      ]
    },
    {
      slug: "give-good",
      title: "Give the good, not the bad",
      line: "Give from the good things, not what you yourself wouldn't take.",
      facts: ["Quran 2:267"],
      source: quran(2, 267, "Spend from the good things you have earned, and do not pick out the bad to give, which you would not take yourself except with closed eyes."),
      difficulty: 2,
      questions: [
        { q: "What should we give from?", a: "The good things we have", wrong: ["Only broken things", "Only leftovers", "Other people's things"], why: "Quran 2:267." },
        { q: "Test: would you take it yourself?", a: "If not, don't give it", wrong: ["Give it anyway", "Sell it", "Hide it"], why: "You would not take it except with closed eyes." },
        { q: "Giving old, spoiled food is the best charity.", tf: false, why: "Allah tells us to give from the good." }
      ]
    },
    {
      slug: "secret",
      title: "In secret is better",
      line: "Open charity is good, but secret charity to the poor is better.",
      facts: ["Quran 2:271", "Wipes some sins"],
      quote: quranQuote(2, 271),
      source: quran(2, 271, "If you show your charity, it is good; but if you hide it and give it to the poor, that is better for you, and He removes some of your sins."),
      difficulty: 1,
      questions: [
        { q: "Which is better, says 2:271?", a: "Charity given in secret", wrong: ["Charity with a speech", "Charity with photos", "No charity"], why: "If you hide it, it is better for you." },
        { q: "Is showing charity wrong?", a: "No, it is good too", wrong: ["Yes, always", "Only on Friday", "Only for kids"], why: "If you show it, it is good." },
        { q: "Secret charity also wipes away some sins.", tf: true, why: "He removes some of your sins." }
      ]
    },
    {
      slug: "what-you-love",
      title: "Give what you love",
      line: "You won't reach true goodness until you give what you love.",
      facts: ["Quran 3:92"],
      quote: quranQuote(3, 92),
      source: quran(3, 92, "You will never attain righteousness until you spend from what you love. And whatever you spend, Allah knows it."),
      difficulty: 2,
      questions: [
        { q: "To reach true goodness, what should we give?", a: "Something we love", wrong: ["Only what we don't need", "Nothing", "Broken toys"], why: "Quran 3:92." },
        { q: "Does Allah know about small gifts too?", a: "Yes, whatever you spend", wrong: ["No", "Only big ones", "Only in Ramadan"], why: "Whatever you spend, Allah knows it." },
        { q: "Giving something you love is harder, and greater.", tf: true, why: "That is the path to righteousness." }
      ]
    },
    {
      slug: "bayruha",
      title: "Abu Talhah's garden",
      line: "Hearing 3:92, Abu Talhah gave his most loved garden, Bayruha.",
      facts: ["Facing his ﷺ masjid", "He ﷺ drank from its water"],
      source: hadith("bukhari", "1461", "Anas ibn Malik", "Sahih", "Abu Talhah's most loved property was Bayruha garden, facing the masjid. When 'you will not attain righteousness until you spend from what you love' came down, he gave it for Allah."),
      difficulty: 2,
      questions: [
        { q: "What did Abu Talhah give away?", a: "His most loved garden", wrong: ["An old camel", "A broken pot", "Nothing"], why: "Sahih al-Bukhari 1461." },
        { q: "What made him give it?", a: "The ayah about giving what you love", wrong: ["A debt", "A fight", "A storm"], why: "Quran 3:92 had just come down." },
        { q: "Bayruha faced his ﷺ masjid.", tf: true, why: "It was in front of the masjid." }
      ]
    },
    {
      slug: "ansar",
      title: "Others before themselves",
      line: "The Ansar put the Muhajirun first, even when in need themselves.",
      facts: ["Quran 59:9", "Saved from greed"],
      quote: quranQuote(59, 9),
      source: quran(59, 9, "They love those who came to them and prefer them over themselves, even though they are in need. Whoever is saved from the greed of his soul, those are the successful."),
      difficulty: 2,
      questions: [
        { q: "Whom did the Ansar put first?", a: "The Muhajirun who came to them", wrong: ["Only themselves", "Kings", "Traders"], why: "Quran 59:9." },
        { q: "Who are the successful, says 59:9?", a: "Those saved from greed", wrong: ["The richest", "The loudest", "The strongest"], why: "Whoever is saved from the greed of his soul." },
        { q: "The Ansar gave even when they were in need.", tf: true, why: "Even though they are in need." }
      ]
    },
    {
      slug: "for-allah",
      title: "Only for Allah",
      line: "We feed you only for Allah; we want no reward or thanks.",
      facts: ["Quran 76:8-9", "The needy, orphan, captive"],
      quote: quranQuote(76, 9),
      source: quran(76, 9, "They give food to the needy, the orphan and the captive, saying: we feed you only for the face of Allah; we want from you no reward and no thanks."),
      difficulty: 2,
      questions: [
        { q: "What do these believers want back?", a: "Nothing: it is for Allah", wrong: ["Thanks", "Payment", "Praise"], why: "Quran 76:9." },
        { q: "Whom do they feed in 76:8?", a: "The needy, orphan and captive", wrong: ["Only friends", "Only the rich", "Only family"], why: "All three are named." },
        { q: "Giving to be thanked is the goal.", tf: false, why: "We want no reward or thanks." }
      ]
    }
  ]
};

export const ZAKAT_UNITS: DeepUnit[] = [PILLAR, FITR, EVERYDAY, SPEND];
