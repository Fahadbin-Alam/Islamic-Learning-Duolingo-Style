import { hadith, type DeepUnit } from "./deepKit";

// One more Manners unit: haya and gentle manners, from Jami at-Tirmidhi, Sunan Abi Dawud and Sunan Ibn Majah. Haya
// that makes everything beautiful, haya and faith that lead to Paradise, haya and a quiet tongue as branches of faith,
// Allah who loves haya and covering, forbearance that Allah loves, and laughing too much that deadens the heart. Every
// card is one sahih hadith with its number, narrator and grade, and its exact English words to highlight. Points the
// schools differ on are left out, and none of these hadith is taught anywhere else in the app.

const HAYA: DeepUnit = {
  key: "manners-haya-and-gentle-manners",
  topicId: "manners",
  branchId: "manners-haya-and-gentle-manners",
  branch: { title: "Haya and gentle manners", description: "Haya that beautifies, haya and Paradise, a quiet tongue, haya and covering, a trait Allah loves, and a heart kept alive." },
  name: "haya and gentle manners",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "haya-makes-it-beautiful",
      title: "Haya makes it beautiful",
      line: "Haya makes anything beautiful; rude words make it ugly.",
      facts: ["Told by Anas ibn Malik", "Haya: good shyness that keeps us from wrong", "Fuhsh: rude and ugly words or deeds"],
      source: hadith("tirmidhi", "1974", "Anas ibn Malik", "Sahih (Al-Albani)", "Anas ibn Malik said: the Messenger of Allah ﷺ said: rudeness is not in anything except that it makes it ugly, and haya is not in anything except that it makes it beautiful.", "is not present in anything but it beautifies it"),
      difficulty: 1,
      questions: [
        { q: "What does haya do to anything it is in?", a: "Makes it beautiful", wrong: ["Makes it weak", "Makes it boring", "Makes it heavy"], why: "Al-Haya is not present in anything but it beautifies it, he ﷺ said." },
        { q: "What do rude and ugly words do to anything?", a: "Spoil it", wrong: ["Make it shine", "Make it funnier", "Make it last longer"], why: "Al-Fuhsh is not present in anything but it mars it, he ﷺ said." },
        { q: "Rude words can make a good thing ugly.", tf: true, why: "Fuhsh, rude speech and deeds, mars whatever it is in, Anas ibn Malik told." }
      ]
    },
    {
      slug: "haya-leads-to-paradise",
      title: "Haya leads to Paradise",
      line: "Haya is from faith, and faith is in Paradise.",
      facts: ["Told by Abu Hurairah", "Obscene talk comes from harshness", "Harshness is in the Fire"],
      source: hadith("tirmidhi", "2009", "Abu Hurairah", "Sahih (Al-Albani)", "Abu Hurairah said: the Messenger of Allah ﷺ said: haya is from faith, and faith is in Paradise. Obscene talk is from harshness, and harshness is in the Fire.", "Al-Haya is from faith, and faith is in Paradise. Obscenity is from rudeness, and rudeness is in the Fire"),
      difficulty: 1,
      questions: [
        { q: "Where does faith lead, he ﷺ said?", a: "To Paradise", wrong: ["To fame", "To riches", "To an easy job"], why: "Al-Haya is from faith, and faith is in Paradise, he ﷺ said." },
        { q: "Obscene talk comes from what?", a: "Harshness", wrong: ["Kindness", "Patience", "Haya"], why: "Obscenity is from rudeness, and rudeness is in the Fire, he ﷺ said." },
        { q: "Obscene talk is a small thing with no harm.", tf: false, why: "No. Obscene talk is from harshness, and harshness is in the Fire, he ﷺ said." }
      ]
    },
    {
      slug: "haya-and-a-quiet-tongue",
      title: "Haya and a quiet tongue",
      line: "Haya and holding back the tongue are two branches of faith.",
      facts: ["Told by Abu Umamah", "Al-'iyy: speaking little, holding back the tongue", "Obscene and showy talk: branches of hypocrisy"],
      source: hadith("tirmidhi", "2027", "Abu Umamah", "Sahih (Al-Albani)", "Abu Umamah said: the Messenger of Allah ﷺ said: haya and al-'iyy, holding back the tongue, are two branches of faith, and obscene talk and showy speech are two branches of hypocrisy.", "are two branches of faith, and Al-Badha and Al-Bayan are two branches of Hypocrisy"),
      difficulty: 2,
      questions: [
        { q: "Haya and holding back the tongue are branches of what?", a: "Faith", wrong: ["Wealth", "Poetry", "Trade"], why: "Al-Haya and Al-'Iy are two branches of faith, he ﷺ said." },
        { q: "What is al-'iyy, a branch of faith?", a: "Holding back the tongue", wrong: ["Shouting to win", "Talking all day long", "Telling every secret"], why: "Al-'iyy is speaking little and holding back the tongue; he ﷺ named it with haya." },
        { q: "Obscene talk is a branch of faith.", tf: false, why: "No. Obscene talk and showy speech are two branches of hypocrisy, he ﷺ said." }
      ]
    },
    {
      slug: "haya-and-covering",
      title: "Haya and covering",
      line: "Allah loves haya and covering, so cover when you wash.",
      facts: ["Told by Ya'la ibn Umayyah", "He ﷺ saw a man washing in the open", "He ﷺ taught it from the minbar"],
      source: hadith("abudawud", "4012", "Ya'la ibn Umayyah", "Sahih (Al-Albani)", "Ya'la ibn Umayyah said: the Messenger of Allah ﷺ saw a man washing in an open place without a lower garment. He ﷺ went up on the minbar, praised Allah and said: Allah is Hayiyy and Sittir; He loves haya and covering. So when any of you washes, let him cover himself.", "Allah is characterised by modesty and concealment. So when any of you washes, he should conceal himself"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ say Allah loves?", a: "Haya and covering", wrong: ["Showing off to people", "Loud boasting", "Being seen by all"], why: "Allah is characterised by modesty and concealment, he ﷺ said from the minbar." },
        { q: "What should we do when we wash?", a: "Cover ourselves", wrong: ["Wash in the open", "Let everyone see", "Wash only at night"], why: "So when any of you washes, he should conceal himself, he ﷺ said." },
        { q: "He ﷺ went up on the minbar to teach about covering.", tf: true, why: "He mounted the pulpit, praised Allah, and taught that Allah loves covering, Ya'la said." }
      ]
    },
    {
      slug: "a-trait-allah-loves",
      title: "A trait Allah loves",
      line: "Forbearance and taking your time are traits Allah loves.",
      facts: ["Told by Ibn Abbas", "He ﷺ said it to al-Ashajj of Abd al-Qays", "Forbearance: staying calm and forgiving"],
      source: hadith("tirmidhi", "2011", "Ibn Abbas", "Sahih (Al-Albani)", "Ibn Abbas said: the Messenger of Allah ﷺ said to al-Ashajj of Abd al-Qays: there are two traits in you that Allah loves: forbearance and taking your time.", "Indeed there are two traits in you that Allah loves: Forbearance, and deliberateness"),
      difficulty: 2,
      questions: [
        { q: "Which trait of al-Ashajj did Allah love?", a: "Forbearance", wrong: ["Anger", "Boasting", "Haste"], why: "There are two traits in you that Allah loves, and forbearance is one, he ﷺ said." },
        { q: "What is forbearance?", a: "Staying calm and forgiving", wrong: ["Paying back every wrong", "Shouting to be heard", "Giving up at once"], why: "Forbearance is staying calm and forgiving; Allah loves it, he ﷺ told al-Ashajj." },
        { q: "Rushing in anger is a trait Allah loves.", tf: false, why: "No. Allah loves forbearance and deliberateness, not rushing in anger, he ﷺ taught." }
      ]
    },
    {
      slug: "a-heart-kept-alive",
      title: "Do not laugh too much",
      line: "Laughing too much deadens the heart, so keep it in balance.",
      facts: ["Told by Abu Hurairah", "The warning is about laughing a lot", "A dead heart: hard and heedless"],
      source: hadith("ibnmajah", "4193", "Abu Hurairah", "Sahih (Al-Albani)", "Abu Hurairah said: the Messenger of Allah ﷺ said: do not laugh a lot, for laughing a lot deadens the heart.", "Do not laugh a lot, for laughing a lot deadens the heart"),
      difficulty: 1,
      questions: [
        { q: "What does laughing a lot do to the heart?", a: "Deadens it", wrong: ["Makes it pure", "Makes it wiser", "Makes it braver"], why: "Do not laugh a lot, for laughing a lot deadens the heart, he ﷺ said." },
        { q: "What did he ﷺ warn us against?", a: "Laughing a lot", wrong: ["Smiling at people", "Being cheerful", "Greeting others"], why: "Do not laugh a lot, he ﷺ said; the warning is about too much, not a smile." },
        { q: "A smile is fine, but too much laughter harms the heart.", tf: true, why: "Laughing a lot deadens the heart, he ﷺ said, while a smile is a kindness." }
      ]
    }
  ]
};

export const MANNERS_HAYA_UNITS: readonly DeepUnit[] = [HAYA];
