import type { LearningSection, LessonSource } from "../types";
import { hadith, quran, quranQuote, type DeepUnit } from "./deepKit";

// Deep units for daily life: rights in marriage (with Quran 4:34 explained as the scholars explain it), Hajj as the
// Prophet ﷺ did it, the two Eids and the special days of the year, and wudu and prayer with real examples. Every
// card is from the Quran, a hadith checked on sunnah.com (number and grade as sunnah.com gives them), or a scholar's
// words on a page we link to. Anything the scholars differ on is left out.

/** Islam Q&A (islamqa.info) answer 41199, which quotes the early scholars on Quran 4:34. */
const ISLAMQA_4_34 = (summary: string, highlight: string): LessonSource => ({
  id: "deep_islamqa_41199",
  site: "IslamQA",
  category: "article",
  title: "Beating Wife in Islam",
  url: "https://islamqa.info/en/answers/41199",
  reference: "Islam Q&A 41199",
  from: "Islam Q&A, quoting Ibn Abbas and al-Hasan al-Basri",
  grade: "Scholars' explanation",
  summary,
  highlight
});

const RIGHTS: DeepUnit = {
  key: "rights",
  topicId: "marriage",
  branchId: "marriage-rights-and-trust",
  name: "rights in marriage",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "like-rights",
      title: "Rights on both sides",
      line: "Wives have rights like the rights on them, in fairness.",
      facts: ["Quran 2:228", "In what is fair and known"],
      quote: quranQuote(2, 228),
      source: quran(2, 228, "Wives have rights similar to what is expected of them, according to what is reasonable; men have a degree of responsibility over them."),
      difficulty: 2,
      questions: [
        { q: "What does Quran 2:228 say about a wife's rights?", a: "She has rights like those on her", wrong: ["She has no rights", "Only her father has rights", "Rights begin after children"], why: "Rights go both ways, in fairness." },
        { q: "How should those rights be given?", a: "In fairness, as is known to be good", wrong: ["However the husband likes", "Only in Ramadan", "Only if written down"], why: "'According to what is reasonable.'" },
        { q: "In Islam, only the husband has rights in a marriage.", tf: false, why: "Both have rights over each other." }
      ]
    },
    {
      slug: "mahr",
      title: "The mahr is hers",
      line: "Give women their mahr as a gift: it belongs to the wife.",
      facts: ["Quran 4:4", "Not her father's, not his", "She may give some back freely"],
      quote: quranQuote(4, 4),
      source: quran(4, 4, "Give women their bridal gifts graciously; if they give up some of it willingly, you may take it with ease."),
      difficulty: 2,
      questions: [
        { q: "Who owns the mahr?", a: "The wife", wrong: ["Her father", "The husband", "The imam"], why: "Allah says: give the women their mahr." },
        { q: "How should the mahr be given?", a: "Graciously, as a gift", wrong: ["As a loan", "After ten years", "Only if she asks"], why: "Quran 4:4." },
        { q: "When may the husband take some of it?", a: "Only if she gives it willingly", wrong: ["Whenever he needs it", "After a quarrel", "Never, in any case"], why: "If they give up some willingly." }
      ]
    },
    {
      slug: "spend",
      title: "He provides for her",
      line: "A husband spends on his family as much as he can afford.",
      facts: ["Quran 65:7", "Rich spend more, poor what they can", "Ease comes after hardship"],
      quote: quranQuote(65, 7),
      source: quran(65, 7, "Let the man of wealth spend from his wealth, and the one whose provision is limited spend from what Allah gave him; Allah does not burden a soul beyond what He gave it."),
      difficulty: 3,
      questions: [
        { q: "How much must a husband spend on his family?", a: "What he can afford", wrong: ["Always the same as his neighbor", "Nothing", "More than he earns"], why: "Allah does not burden a soul beyond what He gave it." },
        { q: "Must a wife spend her own money on the home?", a: "No, providing is his duty", wrong: ["Yes, half of it", "Yes, all of it", "Only her mahr"], why: "Her wealth stays hers; she may give freely." },
        { q: "What does Allah promise at the end of 65:7?", a: "Ease after hardship", wrong: ["Riches for all", "No more tests", "A palace"], why: "Allah will bring ease after hardship." }
      ]
    },
    {
      slug: "her-rights",
      title: "Her rights, from the Prophet ﷺ",
      line: "Feed her, clothe her, and never hit her face.",
      facts: ["Asked by Mu'awiyah al-Qushayri", "Do not insult her", "Sahih (Al-Albani)"],
      source: hadith("abudawud", "2142", "Mu'awiyah al-Qushayri", "Sahih (Al-Albani)", "Asked about a wife's right, the Prophet ﷺ said: give her food when you eat, clothe her when you clothe yourself, do not strike her face, do not revile her, and do not leave her except within the house."),
      difficulty: 3,
      questions: [
        { q: "When should a husband feed his wife?", a: "When he eats", wrong: ["Once a week", "After the guests", "Only on Eid"], why: "Her food is as sure as his." },
        { q: "Which of these did the Prophet ﷺ forbid?", a: "Striking her face", wrong: ["Buying her clothes", "Eating with her", "Talking with her"], why: "And reviling her." },
        { q: "What did he say about insulting a wife?", a: "Do not do it", wrong: ["It is fine when angry", "Only in private", "Only if she starts"], why: "Do not revile her." }
      ]
    },
    {
      slug: "farewell-sermon",
      title: "Fear Allah about women",
      line: "At his last Hajj he said: fear Allah concerning women.",
      facts: ["The Farewell Sermon", "They are a trust from Allah", "Food and clothing, fairly"],
      source: hadith("muslim", "1218", "Jabir ibn Abdullah", "Sahih", "In the Farewell Sermon the Prophet ﷺ said: fear Allah concerning women; you took them on the security of Allah; their right on you is food and clothing in a fitting manner."),
      difficulty: 3,
      questions: [
        { q: "In his Farewell Sermon, what did the Prophet ﷺ warn men about?", a: "Fear Allah about women", wrong: ["Fear the Romans", "Save more money", "Build bigger houses"], why: "He said it to the whole ummah at Hajj." },
        { q: "How did he say a wife came into a man's care?", a: "On the security of Allah", wrong: ["Bought with money", "As a servant", "By luck"], why: "She is a trust from Allah." },
        { q: "The Farewell Sermon was given during what?", a: "His last Hajj", wrong: ["The Battle of Badr", "Ramadan in Madinah", "The Hijrah"], why: "Jabir described the whole Hajj." }
      ]
    },
    {
      slug: "best-to-wives",
      title: "Best to your wives",
      line: "The best of you are those who are best to their wives.",
      facts: ["Best faith: best character", "Hasan Sahih"],
      source: hadith("tirmidhi", "1162", "Abu Hurayrah", "Hasan Sahih (Al-Albani)", "The most complete believers in faith are those with the best character, and the best of you are those who are best to their women."),
      difficulty: 3,
      questions: [
        { q: "Who has the most complete faith, by Tirmidhi 1162?", a: "The one with the best character", wrong: ["The richest", "The loudest", "The one who fasts most"], why: "Faith shows in character." },
        { q: "Who are the best of you?", a: "Those best to their wives", wrong: ["Those with most children", "Those who travel most", "Those with big houses"], why: "Character starts at home." },
        { q: "How a man treats his wife shows his faith.", tf: true, why: "The Prophet ﷺ tied the two together." }
      ]
    },
    {
      slug: "treat-nicely",
      title: "Treat women nicely",
      line: "The Prophet ﷺ said twice: treat women nicely.",
      facts: ["Don't try to force change", "Be patient and gentle"],
      source: hadith("bukhari", "3331", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said: treat women nicely; a woman is like a rib, if you try to straighten it by force it breaks; so treat women nicely."),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ repeat at the start and end?", a: "Treat women nicely", wrong: ["Obey your wives", "Guard your money", "Travel often"], why: "He began and ended with it." },
        { q: "What happens when you try to straighten a rib by force?", a: "It breaks", wrong: ["It grows", "It bends back", "Nothing"], why: "Harshness breaks; gentleness keeps." },
        { q: "What is the lesson?", a: "Be gentle, not forceful", wrong: ["Change her by force", "Ignore her", "Leave her"], why: "Patience keeps the home whole." }
      ]
    },
    {
      slug: "qawwam",
      title: "He looks after her",
      line: "Quran 4:34: men are in charge of women's care, as they spend.",
      facts: ["Qawwam: protector, maintainer", "Comes with spending on her", "Responsibility, not ownership"],
      quote: quranQuote(4, 34),
      source: quran(4, 34, "Men are in charge of women by what Allah has given one over the other and what they spend from their wealth; righteous women are devoutly obedient and guard in the husband's absence what Allah would have them guard."),
      difficulty: 4,
      questions: [
        { q: "What does 'qawwam' in 4:34 mean?", a: "One who protects and provides", wrong: ["An owner", "A judge over her faith", "A guard who locks doors"], why: "It is a duty of care." },
        { q: "4:34 links the man's role to what?", a: "His spending on her", wrong: ["His height", "His age", "His tribe"], why: "'And what they spend from their wealth.'" },
        { q: "Being in charge means he may treat her however he likes.", tf: false, why: "It is a trust he answers to Allah for." }
      ]
    },
    {
      slug: "steps",
      title: "Steps before any discipline",
      line: "In 4:34, the first step is kind advice, then sleeping apart.",
      facts: ["1. Talk and advise", "2. Sleep apart", "3. A last, light step"],
      source: quran(4, 34, "For wives you fear will turn against the marriage: first advise them, then leave them in bed, then strike them; and if they obey, seek no means against them."),
      difficulty: 4,
      questions: [
        { q: "In 4:34, what is the FIRST step?", a: "Advise her kindly", wrong: ["Strike her", "Divorce her", "Tell her family"], why: "Words come first." },
        { q: "What is the second step?", a: "Sleep apart from her", wrong: ["Send her away", "Stop feeding her", "Shout at her"], why: "Forsake them in bed." },
        { q: "If she returns to the marriage, what must he do?", a: "Seek nothing against her", wrong: ["Punish her anyway", "Remind her daily", "Take her mahr"], why: "Allah is Exalted and Grand: He watches." },
        { q: "The steps are for small daily arguments.", tf: false, why: "Only for a serious turning away from the marriage." }
      ]
    },
    {
      slug: "siwak",
      title: "With a siwak and the like",
      line: "Ibn Abbas: the 'strike' in 4:34 is with a tiny siwak.",
      facts: ["A siwak: a small tooth-stick", "Al-Hasan: no pain", "No injury, no humiliation"],
      source: ISLAMQA_4_34("Ata asked Ibn Abbas what is the hitting that is not harsh; he said: with a siwak and the like. Al-Hasan al-Basri said it should not cause pain. It must not be harsh or cause injury.", "Hitting with a siwak and the like"),
      difficulty: 5,
      questions: [
        { q: "How did Ibn Abbas explain the 'strike' in 4:34?", a: "With a siwak and the like", wrong: ["With a stick or whip", "With the fist", "On the face"], why: "A tiny tooth-stick: to show upset, not to hurt." },
        { q: "What did al-Hasan al-Basri say it must not cause?", a: "Pain", wrong: ["Silence", "Tears of joy", "Talking"], why: "It should not cause pain." },
        { q: "4:34 allows a husband to bruise or injure his wife.", tf: false, why: "Scholars say: no harm, no injury, no marks." },
        { q: "What is the purpose, as the scholars explain it?", a: "To show her the wrong, not to hurt", wrong: ["To punish with pain", "To make her afraid", "To win an argument"], why: "Not to hurt or humiliate her." }
      ]
    },
    {
      slug: "not-severe",
      title: "Not severe, he said",
      line: "In his Farewell Sermon: any discipline must not be severe.",
      facts: ["Arabic: ghayra mubarrih", "Means: leaving no harm"],
      source: hadith("muslim", "1218", "Jabir ibn Abdullah", "Sahih", "In the Farewell Sermon: if wives let into your home someone you dislike, you may chastise them, but not severely (ghayra mubarrih)."),
      difficulty: 5,
      questions: [
        { q: "What did the Prophet ﷺ add about any discipline?", a: "It must not be severe", wrong: ["It must be public", "It must be daily", "It must be by her father"], why: "Ghayra mubarrih: not harmful." },
        { q: "Where did he say discipline must not be severe?", a: "In the Farewell Sermon", wrong: ["At Badr", "In a letter to Rome", "At Uhud"], why: "In front of the whole Hajj crowd." },
        { q: "A hit that bruises or marks breaks his rule.", tf: true, why: "Not severe means no harm." }
      ]
    },
    {
      slug: "never-hit",
      title: "He never hit a woman",
      line: "Aishah said: he never struck a woman or a servant.",
      facts: ["The best example", "He only fought in battle"],
      source: hadith("muslim", "2328", "Aishah", "Sahih", "Aishah said: the Messenger of Allah ﷺ never struck anyone with his hand, not a woman nor a servant, except when fighting in the path of Allah."),
      difficulty: 4,
      questions: [
        { q: "How many times did the Prophet ﷺ hit one of his wives?", a: "Never", wrong: ["Once", "Only when angry", "Only at night"], why: "Aishah said he never struck a woman." },
        { q: "Who told us this?", a: "Aishah, his wife", wrong: ["Abu Jahl", "A stranger", "His enemies"], why: "She knew him at home best." },
        { q: "Whose way should a Muslim husband follow?", a: "The Prophet's ﷺ", wrong: ["His own anger", "His friends'", "His tribe's"], why: "He is the best example (33:21)." }
      ]
    },
    {
      slug: "not-the-best",
      title: "Not the best of you",
      line: "Men who hit their wives are not the best of you.",
      facts: ["Women came to complain", "Sahih (Al-Albani)"],
      source: hadith("abudawud", "2146", "Iyas ibn Abdullah", "Sahih (Al-Albani)", "The Prophet ﷺ said: do not beat Allah's female servants. Later many women came complaining about their husbands, and he said: those men are not the best among you."),
      difficulty: 5,
      questions: [
        { q: "What did he first say about Allah's female servants?", a: "Do not beat them", wrong: ["Watch them", "Keep them home", "Pay them"], why: "His first word was a ban." },
        { q: "What did he say about men their wives complained of?", a: "They are not the best of you", wrong: ["They did right", "They are brave", "They are wise"], why: "Hitting is far from the best of men." },
        { q: "Who came to the Prophet's ﷺ family to complain?", a: "Many women", wrong: ["Many men", "The Ansar chiefs", "Traders"], why: "They complained about their husbands." }
      ]
    },
    {
      slug: "like-a-slave",
      title: "Never like a slave",
      line: "Never flog your wife like a slave, he said.",
      facts: ["Told by Abdullah ibn Zam'ah", "Love and harm don't mix"],
      source: hadith("bukhari", "5204", "Abdullah ibn Zam'ah", "Sahih", "The Prophet ﷺ said: none of you should flog his wife as he flogs a slave and then lie with her at the end of the day."),
      difficulty: 5,
      questions: [
        { q: "What did the Prophet ﷺ say men must not do to their wives?", a: "Flog them like a slave", wrong: ["Gift them", "Eat with them", "Pray with them"], why: "Bukhari 5204." },
        { q: "Why is harming a wife so wrong, by Bukhari 5204?", a: "Love and harm cannot go together", wrong: ["Nights are for rest", "Slaves have no rights", "Marriage is a contract only"], why: "You cannot hurt the one you love." },
        { q: "Who narrated it?", a: "Abdullah ibn Zam'ah", wrong: ["Ibn Abbas", "Aishah", "Abu Hurayrah"], why: "Sahih al-Bukhari 5204." }
      ]
    },
    {
      slug: "arbiters",
      title: "Call the families in",
      line: "If a couple may split, send a wise helper from each family.",
      facts: ["Quran 4:35", "If they want peace, Allah helps"],
      quote: quranQuote(4, 35),
      source: quran(4, 35, "If you fear a breach between the two, send an arbitrator from his people and one from hers; if they both want reconciliation, Allah will bring it about."),
      difficulty: 4,
      questions: [
        { q: "What does Quran 4:35 tell families to do in a big rift?", a: "Send one helper from each side", wrong: ["Stay out of it", "Pick a side", "End the marriage"], why: "Fair helpers from both families." },
        { q: "When does Allah bring the couple back together?", a: "When both want peace", wrong: ["Never", "Only if rich", "After a year"], why: "If they both desire reconciliation." },
        { q: "Why one helper from each family?", a: "So both are heard fairly", wrong: ["To double the fee", "To fight", "To decide alone"], why: "Each side has someone who knows them." }
      ]
    },
    {
      slug: "part-kindly",
      title: "Keep well or part well",
      line: "Either stay together kindly, or part with kindness.",
      facts: ["Quran 2:229", "Never take back her gifts unfairly"],
      quote: quranQuote(2, 229),
      source: quran(2, 229, "Divorce is twice; then either keep her in an acceptable manner or release her with good treatment."),
      difficulty: 4,
      questions: [
        { q: "What two choices does Quran 2:229 give?", a: "Stay kindly or part kindly", wrong: ["Stay or punish", "Part or take her money", "Wait forever"], why: "Kindness either way." },
        { q: "Even in divorce, Muslims must treat each other well.", tf: true, why: "Release her with good treatment." },
        { q: "Can a husband take back her mahr just because he wants to?", a: "No", wrong: ["Yes, always", "Yes, half", "Only at night"], why: "It is not lawful to take back what you gave." }
      ]
    }
  ]
};

const HAJJ_DEEP: DeepUnit = {
  key: "hajj",
  topicId: "hajj",
  branchId: "hajj-in-depth",
  branch: { title: "Hajj like the Prophet ﷺ", description: "His Farewell Hajj, step by step, with what each rite means." },
  name: "Hajj",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "once",
      title: "Once in a lifetime",
      line: "Hajj is due once in a life, for those able.",
      facts: ["Quran 3:97", "Asked: every year? He was silent"],
      quote: quranQuote(3, 97),
      source: hadith("muslim", "1337", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said Allah made Hajj a duty. A man asked: every year? He stayed silent, then said: if I said yes, it would become a duty and you could not do it."),
      difficulty: 2,
      questions: [
        { q: "How often is Hajj a duty?", a: "Once in a lifetime", wrong: ["Every year", "Every Ramadan", "Every ten years"], why: "More is extra reward." },
        { q: "Who must go to Hajj?", a: "Those who are able", wrong: ["Everyone, even the sick", "Only men", "Only Arabs"], why: "Quran 3:97." },
        { q: "Why didn't the Prophet ﷺ say 'every year'?", a: "It would be too hard for us", wrong: ["He forgot", "He did not know", "Makkah is small"], why: "Then it would be a duty no one could keep." }
      ]
    },
    {
      slug: "talbiyah",
      title: "Labbayk!",
      line: "Pilgrims call out: Here I am, O Allah, here I am!",
      facts: ["Called the talbiyah", "You have no partner", "Praise and blessings are Yours"],
      source: hadith("bukhari", "1549", "Abdullah ibn Umar", "Sahih", "The talbiyah of the Prophet ﷺ: Labbayk Allahumma labbayk, labbayk la sharika laka labbayk, inna al-hamda wan-ni'mata laka wal-mulk, la sharika lak."),
      difficulty: 2,
      questions: [
        { q: "What does 'Labbayk Allahumma labbayk' mean?", a: "Here I am, O Allah, here I am", wrong: ["Allah is the Greatest", "Glory be to Allah", "Peace be on you"], why: "The pilgrim answers Allah's call." },
        { q: "What is this call named?", a: "The talbiyah", wrong: ["The adhan", "The takbir", "The tashahhud"], why: "Pilgrims say it after entering ihram." },
        { q: "Which words are in the talbiyah?", a: "You have no partner", wrong: ["Forgive my parents", "Grant me wealth", "Bless this food"], why: "La sharika lak: pure tawhid." }
      ]
    },
    {
      slug: "no-fighting",
      title: "No arguing in Hajj",
      line: "In Hajj: no indecency, no sinning, no arguing.",
      facts: ["Quran 2:197", "Best provision: taqwa"],
      quote: quranQuote(2, 197),
      source: quran(2, 197, "Hajj is in well-known months; whoever takes it on, there is no indecency, no disobedience and no disputing in Hajj; take provision, and the best provision is taqwa."),
      difficulty: 3,
      questions: [
        { q: "Which of these is forbidden in Hajj by 2:197?", a: "Arguing", wrong: ["Walking", "Drinking water", "Making du'a"], why: "No disputing during Hajj." },
        { q: "What does Allah call the best provision?", a: "Taqwa", wrong: ["Gold", "Dates", "A strong camel"], why: "Being mindful of Allah." },
        { q: "In a hot, crowded line, a pilgrim pushes you. What fits Hajj?", a: "Stay calm and forgive", wrong: ["Push back", "Argue loudly", "Leave Hajj"], why: "No disputing in Hajj." }
      ]
    },
    {
      slug: "black-stone",
      title: "Umar and the Black Stone",
      line: "Umar told the Black Stone: you are only a stone.",
      facts: ["It can't harm or help", "We follow the Sunnah"],
      source: hadith("bukhari", "1597", "Abis ibn Rabi'ah", "Sahih", "Umar kissed the Black Stone and said: I know you are a stone that can neither benefit nor harm; had I not seen the Messenger of Allah ﷺ kiss you, I would not have kissed you."),
      difficulty: 3,
      questions: [
        { q: "Why did Umar kiss the Black Stone?", a: "He saw the Prophet ﷺ do it", wrong: ["It grants wishes", "It brings luck", "It heals the sick"], why: "Only to follow the Sunnah." },
        { q: "What did Umar say the stone can do?", a: "Neither benefit nor harm", wrong: ["Forgive sins", "Bring rain", "Speak"], why: "Only Allah benefits and harms." },
        { q: "What does this teach about tawhid?", a: "We worship Allah, not objects", wrong: ["Stones have power", "Old things are holy", "Kiss every stone"], why: "Following, not believing in the stone." }
      ]
    },
    {
      slug: "arafah",
      title: "Hajj is Arafah",
      line: "The Prophet ﷺ said: Hajj is Arafah. Miss it, and you miss Hajj.",
      facts: ["9th of Dhul-Hijjah", "Most freed from the Fire"],
      source: hadith("tirmidhi", "889", "Abd ar-Rahman ibn Ya'mar", "Sahih (Al-Albani)", "At Arafah the Prophet ﷺ had it called out: Hajj is Arafah; whoever reaches Jam' (Muzdalifah) before Fajr has caught the Hajj."),
      difficulty: 3,
      questions: [
        { q: "Which part of Hajj did he call 'the Hajj'?", a: "Standing at Arafah", wrong: ["Shaving the head", "Tawaf", "Buying a sacrifice"], why: "Without Arafah there is no Hajj." },
        { q: "On which day do pilgrims stand at Arafah?", a: "The 9th of Dhul-Hijjah", wrong: ["The 1st of Ramadan", "The 10th of Muharram", "The 27th of Rajab"], why: "The day before Eid al-Adha." },
        { q: "What happens on the Day of Arafah, in Sahih Muslim?", a: "Allah frees the most people from the Fire", wrong: ["The Quran was finished", "Badr was fought", "The Hijrah began"], why: "No day frees more from the Fire (Muslim 1348)." }
      ]
    },
    {
      slug: "no-harm",
      title: "Do it, no harm",
      line: "Rites done out of order? He said: do it, no harm.",
      facts: ["Shaved before sacrificing?", "Sacrificed before stoning?", "Answer: no harm"],
      source: hadith("bukhari", "1736", "Abdullah ibn Amr", "Sahih", "On the day of sacrifice people asked about doing rites out of order: shaving before sacrificing, sacrificing before stoning. To each he said: do it, there is no harm."),
      difficulty: 4,
      questions: [
        { q: "A pilgrim shaved before his sacrifice by mistake. What did the Prophet ﷺ say?", a: "Sacrifice now, no harm", wrong: ["Your Hajj is lost", "Come back next year", "Pay a fine of gold"], why: "Islam is easy." },
        { q: "What was his answer to every question that day?", a: "Do it, no harm", wrong: ["Ask a scholar", "Start again", "Wait for Jibril"], why: "For mistakes in order on Eid day." },
        { q: "What does this teach about Islam?", a: "It is easy, not harsh", wrong: ["Every mistake ruins worship", "Rules are pointless", "Do as you like"], why: "Mercy for the pilgrims." }
      ]
    },
    {
      slug: "stoning",
      title: "Seven pebbles, each with takbir",
      line: "Seven small pebbles at each pillar, Allahu akbar with each.",
      facts: ["Then face the qiblah", "Long du'a with raised hands"],
      source: hadith("bukhari", "1751", "Salim", "Sahih", "Ibn Umar threw seven small pebbles at the first jamrah with a takbir for each, then faced the qiblah and made long du'a with raised hands, saying he saw the Prophet ﷺ do so."),
      difficulty: 4,
      questions: [
        { q: "How many pebbles are thrown at a pillar each time?", a: "Seven", wrong: ["Three", "Ten", "Seventy"], why: "Small pebbles, one by one." },
        { q: "What is said with each pebble?", a: "Allahu akbar", wrong: ["Subhanallah", "Labbayk", "Bismillah only"], why: "A takbir for each throw." },
        { q: "What did Ibn Umar do after the first pillar?", a: "Made long du'a facing the qiblah", wrong: ["Left Mina", "Slept", "Threw more stones"], why: "Hajj is full of du'a." }
      ]
    },
    {
      slug: "for-parent",
      title: "Hajj for an old father",
      line: "May I do Hajj for my old father? He said: yes.",
      facts: ["He could not sit on a camel", "From the tribe of Khath'am"],
      source: hadith("bukhari", "1513", "Ibn Abbas", "Sahih", "A woman of Khath'am said: Hajj became due on my father, but he is too old to sit on a mount; may I do Hajj for him? He said: yes."),
      difficulty: 4,
      questions: [
        { q: "Why couldn't her father go himself?", a: "He was too old to ride", wrong: ["He was poor", "He was not Muslim", "He was traveling"], why: "He could not stay on a mount." },
        { q: "What did the Prophet ﷺ answer?", a: "Yes, do Hajj for him", wrong: ["No, never", "Only if he pays", "Only in Ramadan"], why: "Hajj can be done for one who cannot." },
        { q: "What does this show about family?", a: "We can help parents even in worship", wrong: ["Parents must manage alone", "Only sons can help", "Hajj is only for the young"], why: "A daughter served her father's faith." }
      ]
    },
    {
      slug: "mabrur",
      title: "An accepted Hajj",
      line: "The reward of an accepted Hajj is nothing less than Paradise.",
      facts: ["Hajj mabrur: accepted, pure", "Umrah to Umrah wipes sins"],
      source: hadith("bukhari", "1773", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said: an Umrah is an expiation for sins between it and the one before, and the reward of an accepted Hajj is nothing but Paradise."),
      difficulty: 4,
      questions: [
        { q: "What is the reward of a Hajj mabrur?", a: "Paradise", wrong: ["A new name", "Wealth", "A long life"], why: "Nothing less than Paradise." },
        { q: "What does one Umrah to the next do?", a: "Wipes the sins between them", wrong: ["Replaces Hajj", "Doubles wealth", "Nothing"], why: "Bukhari 1773." },
        { q: "For women, what did he call the best jihad?", a: "An accepted Hajj", wrong: ["Fighting", "Fasting", "Trading"], why: "Bukhari 1520." }
      ]
    },
    {
      slug: "best-ten-days",
      title: "The best ten days",
      line: "No deeds beat those of the first ten days of Dhul-Hijjah.",
      facts: ["Not even jihad, mostly", "Fast Arafah if not on Hajj"],
      source: hadith("bukhari", "969", "Ibn Abbas", "Sahih", "The Prophet ﷺ said: no good deeds on other days are better than those done in these ten days. Not even jihad? Not even jihad, except a man who risks himself and his wealth and returns with nothing."),
      difficulty: 5,
      questions: [
        { q: "Which days did he call the best for good deeds?", a: "The first ten of Dhul-Hijjah", wrong: ["The last ten of Shaban", "The first ten of Muharram", "Any ten days"], why: "Bukhari 969." },
        { q: "The companions asked: not even what?", a: "Jihad", wrong: ["Prayer", "Hajj", "Charity"], why: "Except one who gives his life and wealth." },
        { q: "Someone at home can't go to Hajj. What can they do in these days?", a: "Fast, give and remember Allah", wrong: ["Nothing, it's only for pilgrims", "Wait for Ramadan", "Sleep more"], why: "The reward is open to everyone." }
      ]
    }
  ]
};

const EID: DeepUnit = {
  key: "eid",
  topicId: "eid",
  branchId: "eid-two-eids",
  branch: { title: "The two Eids", description: "Eid al-Fitr and Eid al-Adha, as the Prophet ﷺ kept them." },
  name: "the Eids",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "two-days",
      title: "Two days, better than before",
      line: "Allah gave Muslims two Eids: al-Fitr and al-Adha.",
      facts: ["Replaced two old feast days", "In Madinah", "Sahih (Al-Albani)"],
      source: hadith("abudawud", "1134", "Anas ibn Malik", "Sahih (Al-Albani)", "In Madinah people had two days of play from before Islam. The Prophet ﷺ said: Allah has given you better than them: the day of al-Adha and the day of al-Fitr."),
      difficulty: 2,
      questions: [
        { q: "How many Eids do Muslims have each year?", a: "Two", wrong: ["One", "Three", "Seven"], why: "Eid al-Fitr and Eid al-Adha." },
        { q: "What did the two Eids replace?", a: "Two old days of play", wrong: ["Ramadan", "Friday prayer", "Hajj"], why: "Allah gave something better." },
        { q: "Eid al-Fitr comes right after which month?", a: "Ramadan", wrong: ["Dhul-Hijjah", "Muharram", "Rajab"], why: "Fitr means breaking the fast." }
      ]
    },
    {
      slug: "our-eid",
      title: "This is our Eid",
      line: "He said: every people has its Eid, and this is our Eid.",
      facts: ["Girls sang old Ansar poems", "Joy is part of Eid"],
      source: hadith("bukhari", "952", "Aishah", "Sahih", "On Eid two young Ansari girls sang poems of the day of Bu'ath at Aishah's house; the Prophet ﷺ said: O Abu Bakr, every nation has an Eid, and this is our Eid."),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ say every nation has?", a: "Its own Eid", wrong: ["Its own Ka'bah", "Its own Quran", "Its own prophet today"], why: "And this is our Eid." },
        { q: "Eid is a day of happiness for Muslims.", tf: true, why: "He let the girls enjoy the day." },
        { q: "Whose house was this in?", a: "Aishah's", wrong: ["Umar's", "Bilal's", "Abu Sufyan's"], why: "Her father Abu Bakr came in." }
      ]
    },
    {
      slug: "fitr-dates",
      title: "Dates before Eid prayer",
      line: "On Eid al-Fitr he ate odd-numbered dates before going out.",
      facts: ["Odd: 1, 3, 5...", "Shows the fast is over"],
      source: hadith("bukhari", "953", "Anas bin Malik", "Sahih", "The Prophet ﷺ did not go out on the day of Eid al-Fitr until he had eaten some dates, and he ate an odd number."),
      difficulty: 3,
      questions: [
        { q: "What did he eat before the Eid al-Fitr prayer?", a: "Dates", wrong: ["Meat", "Bread", "Nothing"], why: "An odd number of them." },
        { q: "How many dates fit this Sunnah?", a: "Three", wrong: ["Two", "Four", "Six"], why: "He ate an odd number." },
        { q: "Why eat before Eid al-Fitr prayer?", a: "To show Ramadan's fast has ended", wrong: ["To be strong for a race", "Because it is Friday", "No reason"], why: "Fasting on Eid day is forbidden." }
      ]
    },
    {
      slug: "zakat-fitr",
      title: "Zakat al-Fitr first",
      line: "Pay zakat al-Fitr, a sa' of food, before the Eid prayer.",
      facts: ["For every Muslim, young or old", "A sa': about 3 kg", "Dates or barley"],
      source: hadith("bukhari", "1503", "Ibn Umar", "Sahih", "The Prophet ﷺ made zakat al-Fitr a sa' of dates or barley on every Muslim, free or slave, male or female, young or old, to be paid before people go out to the Eid prayer."),
      difficulty: 3,
      questions: [
        { q: "When must zakat al-Fitr be paid?", a: "Before the Eid prayer", wrong: ["A month after Eid", "At Hajj", "Any time in the year"], why: "So the poor can enjoy Eid too." },
        { q: "Who is it due for?", a: "Every Muslim, even a baby", wrong: ["Only rich men", "Only adults", "Only scholars"], why: "Young or old, male or female." },
        { q: "What is it paid in, in the hadith?", a: "Food, like dates or barley", wrong: ["Gold only", "Clothes", "Camels"], why: "A sa' of dates or barley." }
      ]
    },
    {
      slug: "prayer-first",
      title: "Prayer, then the talk",
      line: "On Eid he began with the prayer, then gave the khutbah.",
      facts: ["At the open musalla", "People stayed in rows"],
      source: hadith("bukhari", "956", "Abu Sa'id al-Khudri", "Sahih", "On Eid al-Fitr and al-Adha the Prophet ﷺ went to the musalla; first he prayed, then stood before the people, who stayed in their rows, and advised them."),
      difficulty: 3,
      questions: [
        { q: "What came first on Eid?", a: "The Eid prayer", wrong: ["The khutbah", "The feast", "The sacrifice"], why: "Unlike Jumu'ah, the prayer comes first." },
        { q: "Where did he pray Eid?", a: "At an open prayer ground", wrong: ["In his house", "On a ship", "In Makkah only"], why: "The musalla, outside the masjid." },
        { q: "On Friday the khutbah comes first; on Eid the prayer does.", tf: true, why: "Remember the order for each." }
      ]
    },
    {
      slug: "everyone-out",
      title: "Everyone comes out",
      line: "He told women and girls to come out on Eid, too.",
      facts: ["Even young women at home", "To share the good and du'a"],
      source: hadith("bukhari", "974", "Umm Atiyyah", "Sahih", "Umm Atiyyah said: our Prophet ﷺ ordered us to bring out on Eid the young women and those who stay in seclusion; women on their period stayed away from the prayer place itself."),
      difficulty: 3,
      questions: [
        { q: "Who did the Prophet ﷺ tell to come out on Eid?", a: "Women and girls too", wrong: ["Only men", "Only scholars", "Only the rich"], why: "Eid is for the whole community." },
        { q: "Who told us this?", a: "Umm Atiyyah", wrong: ["Umm Salamah", "Fatimah", "Maryam"], why: "Sahih al-Bukhari 974." },
        { q: "Women on their period missed the joy of Eid entirely.", tf: false, why: "They came out, only staying away from the prayer spot." }
      ]
    },
    {
      slug: "other-way",
      title: "A different way home",
      line: "He went to Eid by one road and came home by another.",
      facts: ["Meet more people", "Spread the greeting"],
      source: hadith("bukhari", "986", "Jabir ibn Abdullah", "Sahih", "On the day of Eid the Prophet ﷺ returned by a different road from the one he took."),
      difficulty: 3,
      questions: [
        { q: "What did he do on the way back from Eid prayer?", a: "Took a different road", wrong: ["Ran home", "Rode a horse", "Stayed until night"], why: "Bukhari 986." },
        { q: "A good reason to follow this today?", a: "Greet more people", wrong: ["Avoid neighbors", "Save time", "Hide gifts"], why: "Two roads, twice the salams." },
        { q: "Who told us this Sunnah?", a: "Jabir ibn Abdullah", wrong: ["Anas", "Umar", "Bilal"], why: "Sahih al-Bukhari 986." }
      ]
    },
    {
      slug: "no-fasting",
      title: "No fasting on Eid",
      line: "The Prophet ﷺ forbade fasting on the two days of Eid.",
      facts: ["Told by Umar", "Eid is for eating and joy"],
      source: hadith("bukhari", "1990", "Abu Ubayd", "Sahih", "Umar said at Eid: the Messenger of Allah ﷺ forbade fasting on two days: the day you break your fast, and the day you eat your sacrifices."),
      difficulty: 3,
      questions: [
        { q: "Is it allowed to fast on Eid day?", a: "No, it is forbidden", wrong: ["Yes, it's best", "Only for men", "Only on Eid al-Adha"], why: "On both Eids." },
        { q: "Which day did Umar call 'the day you eat your sacrifices'?", a: "Eid al-Adha", wrong: ["Eid al-Fitr", "Ashura", "Arafah"], why: "The day of the udhiyah." },
        { q: "What are the days after Eid al-Adha (tashriq) for?", a: "Eating, drinking, remembering Allah", wrong: ["Fasting", "Silence", "Sleeping"], why: "Muslim 1141." }
      ]
    },
    {
      slug: "udhiyah",
      title: "Two rams for Allah",
      line: "On Eid al-Adha he sacrificed two rams with his own hands.",
      facts: ["Said Bismillah, Allahu akbar", "Black-and-white rams"],
      source: hadith("bukhari", "5565", "Anas ibn Malik", "Sahih", "The Prophet ﷺ sacrificed two horned black-and-white rams; he slaughtered them with his own hands, said Allah's name and the takbir."),
      difficulty: 4,
      questions: [
        { q: "What did he sacrifice on Eid al-Adha?", a: "Two rams", wrong: ["A hundred camels", "A cow", "Nothing"], why: "With his own hands." },
        { q: "What did he say when sacrificing?", a: "Bismillah, Allahu akbar", wrong: ["Labbayk", "Subhanallah only", "Nothing"], why: "Allah's name and the takbir." },
        { q: "Eid al-Adha remembers whose sacrifice?", a: "Ibrahim's, with Ismail", wrong: ["Musa's", "Nuh's", "Yusuf's"], why: "Quran 37:102-107." }
      ]
    }
  ]
};

const SPECIAL_DAYS: DeepUnit = {
  key: "days",
  topicId: "eid",
  branchId: "eid-special-days",
  branch: { title: "Special days of the year", description: "Arafah, Ashura, Shawwal and Friday: days the Prophet ﷺ marked." },
  name: "the special days",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "arafah-fast",
      title: "Fasting the Day of Arafah",
      line: "Fasting Arafah wipes the sins of the year before and after.",
      facts: ["9th of Dhul-Hijjah", "For those not on Hajj"],
      source: hadith("muslim", "1162", "Abu Qatadah", "Sahih", "The Prophet ﷺ said fasting the day of Arafah expiates the sins of the year before and the year after, and fasting Ashura expiates the year before."),
      difficulty: 3,
      questions: [
        { q: "Fasting the Day of Arafah expiates how much?", a: "Two years", wrong: ["One day", "One month", "Ten years"], why: "The year before and the year after." },
        { q: "On which date is Arafah?", a: "9 Dhul-Hijjah", wrong: ["1 Shawwal", "10 Muharram", "15 Shaban"], why: "The day before Eid al-Adha." },
        { q: "And fasting Ashura expiates?", a: "The year before", wrong: ["Two years", "Nothing", "A lifetime"], why: "Muslim 1162." }
      ]
    },
    {
      slug: "ashura",
      title: "Ashura and Musa",
      line: "Ashura is the day Allah saved Musa; the Prophet ﷺ fasted it.",
      facts: ["10th of Muharram", "We are closer to Musa"],
      source: hadith("bukhari", "2004", "Ibn Abbas", "Sahih", "The Prophet ﷺ saw the Jews of Madinah fasting Ashura, the day Allah saved Bani Isra'il and Musa fasted. He said: we have more right to Musa than you, fasted it and told Muslims to fast it."),
      difficulty: 3,
      questions: [
        { q: "What happened on the day of Ashura?", a: "Allah saved Musa and his people", wrong: ["The Quran came down", "Badr was won", "The Ka'bah was built"], why: "From Pharaoh." },
        { q: "What did the Prophet ﷺ say about Musa?", a: "We have more right to Musa", wrong: ["Musa is not our prophet", "Musa never fasted", "Forget Musa"], why: "Muslims believe in all the prophets." },
        { q: "Ashura is in which month?", a: "Muharram", wrong: ["Ramadan", "Shawwal", "Rajab"], why: "The 10th of Muharram." }
      ]
    },
    {
      slug: "six-shawwal",
      title: "Six days of Shawwal",
      line: "Ramadan plus six fasts in Shawwal is like fasting all year.",
      facts: ["Shawwal: month after Ramadan", "Told by Abu Ayyub"],
      source: hadith("muslim", "1164", "Abu Ayyub al-Ansari", "Sahih", "The Prophet ﷺ said: whoever fasts Ramadan and follows it with six days of Shawwal, it is as if he fasted for a lifetime."),
      difficulty: 4,
      questions: [
        { q: "How many fasts in Shawwal does the hadith mention?", a: "Six", wrong: ["Three", "Ten", "Thirty"], why: "After Ramadan." },
        { q: "What is the reward like?", a: "Fasting forever", wrong: ["One extra day", "A free Hajj", "Nothing"], why: "As if he fasted perpetually." },
        { q: "Can one fast them on Eid al-Fitr day?", a: "No, Eid fasting is forbidden", wrong: ["Yes, it's best", "Only the first", "Only for kids"], why: "Start from the 2nd of Shawwal." }
      ]
    },
    {
      slug: "friday",
      title: "Friday, the best day",
      line: "The best day the sun rises on is Friday.",
      facts: ["Adam entered Paradise on it", "The Hour comes on a Friday"],
      source: hadith("muslim", "854", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said: the best day the sun rises on is Friday; on it Adam was created, entered Paradise and was taken out of it, and the Hour will come on a Friday."),
      difficulty: 4,
      questions: [
        { q: "Which day is the best the sun rises on?", a: "Friday", wrong: ["Monday", "Saturday", "Sunday"], why: "Muslim 854." },
        { q: "Who was created on a Friday?", a: "Adam", wrong: ["Isa", "Nuh", "Ibrahim"], why: "And he entered Paradise on it." },
        { q: "What will happen on a Friday?", a: "The Last Hour", wrong: ["The next Hajj", "A new Quran", "Nothing"], why: "The Hour comes on a Friday." }
      ]
    },
    {
      slug: "tashriq",
      title: "Days of eating and dhikr",
      line: "Tashriq days are for eating, drinking and remembering Allah.",
      facts: ["11-13 Dhul-Hijjah", "Right after Eid al-Adha"],
      source: hadith("muslim", "1141", "Nubayshah al-Hudhali", "Sahih", "The Prophet ﷺ said: the days of tashriq are days of eating and drinking, and of remembering Allah."),
      difficulty: 4,
      questions: [
        { q: "The days of tashriq are for what?", a: "Eating, drinking and dhikr", wrong: ["Fasting", "Traveling", "Silence"], why: "Muslim 1141." },
        { q: "When are the days of tashriq?", a: "The three days after Eid al-Adha", wrong: ["The last ten of Ramadan", "Before Hajj", "In Muharram"], why: "11th to 13th of Dhul-Hijjah." },
        { q: "So Eid al-Adha's joy lasts several days.", tf: true, why: "Eid day plus the days of tashriq." }
      ]
    }
  ]
};

const PRAYER_EXAMPLES: DeepUnit = {
  key: "prayerlive",
  topicId: "prayer",
  branchId: "prayer-salah-basics",
  name: "wudu and prayer",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "uthman-wudu",
      title: "Uthman shows wudu",
      line: "Uthman showed wudu: hands, mouth, nose, face, arms, head, feet.",
      facts: ["Each part three times", "Head wiped once", "Then two rak'ahs"],
      source: hadith("bukhari", "159", "Humran", "Sahih", "Uthman washed his hands three times, rinsed his mouth and nose, washed his face and arms to the elbows three times, wiped his head, washed his feet three times, and said: I saw the Prophet ﷺ do wudu like this."),
      difficulty: 2,
      questions: [
        { q: "Example: you start wudu. What do you wash first?", a: "Your hands", wrong: ["Your feet", "Your head", "Your face"], why: "Uthman began with his hands." },
        { q: "How far are the arms washed?", a: "Up to and over the elbows", wrong: ["Only the fingers", "Up to the wrists", "Up to the shoulders"], why: "Arms to the elbows." },
        { q: "Which part is wiped, not washed?", a: "The head", wrong: ["The face", "The feet", "The hands"], why: "Wet hands pass over the head." },
        { q: "Put them in order: face, feet, arms. Which comes last?", a: "Feet", wrong: ["Face", "Arms", "Any order"], why: "Feet are washed last." }
      ]
    },
    {
      slug: "heels",
      title: "Save your heels!",
      line: "He saw dry heels after wudu: save your heels from the Fire!",
      facts: ["Wash the whole foot", "Don't rush wudu"],
      source: hadith("bukhari", "60", "Abdullah ibn Amr", "Sahih", "Some companions rushed wudu, just wiping their feet; the Prophet ﷺ called out two or three times: save your heels from the Fire."),
      difficulty: 3,
      questions: [
        { q: "Example: you're late and only splash the top of your feet. What's missing?", a: "Your heels stay dry", wrong: ["Nothing, it's fine", "Your hands", "Your hair"], why: "Water must reach the whole foot." },
        { q: "What did the Prophet ﷺ call out?", a: "Save your heels from the Fire", wrong: ["Hurry up", "Pray at home", "Use less water"], why: "Bukhari 60." },
        { q: "A rushed, careless wudu is a good wudu.", tf: false, why: "Every part must be washed." }
      ]
    },
    {
      slug: "breaks-wudu",
      title: "When wudu breaks",
      line: "After the toilet or passing wind, do wudu again to pray.",
      facts: ["Called hadath", "No prayer without wudu"],
      source: hadith("bukhari", "135", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: the prayer of one who has a hadath is not accepted until he does wudu. Abu Hurayrah explained hadath as passing wind."),
      difficulty: 3,
      questions: [
        { q: "Example: you did wudu, then used the toilet. Now it's prayer time. What do you do?", a: "Do wudu again", wrong: ["Pray as you are", "Skip the prayer", "Only wash hands"], why: "Your wudu broke." },
        { q: "What did Abu Hurayrah say 'hadath' means?", a: "Passing wind", wrong: ["Sleeping in class", "Eating", "Talking"], why: "Something that breaks wudu." },
        { q: "Is a prayer accepted without wudu?", a: "No", wrong: ["Yes", "Only short ones", "Only at night"], why: "Not until one does wudu." }
      ]
    },
    {
      slug: "after-wudu",
      title: "The words after wudu",
      line: "After wudu, say the shahadah: eight gates of Paradise open.",
      facts: ["Ash-hadu an la ilaha illallah", "Then two calm rak'ahs"],
      source: hadith("muslim", "234", "Uqbah ibn Amir", "Sahih", "The Prophet ﷺ said: whoever does wudu well, then says: I bear witness there is no god but Allah alone with no partner and Muhammad is His slave and Messenger, the eight gates of Paradise open for him."),
      difficulty: 3,
      questions: [
        { q: "What should you say after finishing wudu?", a: "The shahadah", wrong: ["Bismillah only", "Ameen", "Nothing"], why: "I bear witness there is no god but Allah..." },
        { q: "How many gates of Paradise open for him?", a: "Eight", wrong: ["One", "Three", "Seven"], why: "He may enter by whichever he wishes." },
        { q: "What did he say about two rak'ahs prayed with full heart after wudu?", a: "Paradise is guaranteed", wrong: ["They are useless", "Only for imams", "They break wudu"], why: "Also in Muslim 234." }
      ]
    },
    {
      slug: "no-water",
      title: "No water? Tayammum",
      line: "With no water, wipe your face and hands with clean earth.",
      facts: ["Called tayammum", "Ammar rolled in dust; too much!", "Strike the earth once"],
      source: hadith("bukhari", "338", "Abd ar-Rahman ibn Abza", "Sahih", "Ammar rolled in the dust for lack of water; the Prophet ﷺ said: this was enough, struck the earth with his hands, blew on them and wiped his face and hands."),
      difficulty: 4,
      questions: [
        { q: "Example: camping, no water at all, time for Fajr. What do you do?", a: "Tayammum with clean earth", wrong: ["Skip Fajr", "Wait until home", "Pray without anything"], why: "Allah made it easy." },
        { q: "Which parts are wiped in tayammum?", a: "Face and hands", wrong: ["Feet and head", "The whole body", "Only the feet"], why: "Bukhari 338." },
        { q: "What did Ammar do that was too much?", a: "Rolled in the dust", wrong: ["Used too much water", "Prayed twice", "Skipped prayer"], why: "Wiping face and hands was enough." }
      ]
    },
    {
      slug: "go-back",
      title: "Go back and pray",
      line: "A man rushed his prayer and was told: go back and pray.",
      facts: ["Told three times", "Be still in every position", "Then he was taught"],
      source: hadith("bukhari", "757", "Abu Hurairah", "Sahih", "A man prayed quickly; the Prophet ﷺ said three times: go back and pray, you have not prayed. Then he taught him: say takbir, recite, bow until at ease, stand straight, prostrate until at ease, sit calmly."),
      difficulty: 4,
      questions: [
        { q: "Example: you bow and stand up in one second. What's wrong?", a: "You didn't pause in ruku", wrong: ["Nothing", "You bowed too low", "You prayed too slowly"], why: "Bow until you are at ease." },
        { q: "How many times was the man sent back?", a: "Three", wrong: ["One", "Five", "Seven"], why: "Then he asked to be taught." },
        { q: "What word sums up how to pray?", a: "Calmly", wrong: ["Quickly", "Loudly", "Alone"], why: "Be still in each position." }
      ]
    },
    {
      slug: "sick-prayer",
      title: "Pray as you can",
      line: "Can't stand? Pray sitting. Can't sit? Pray lying on your side.",
      facts: ["Prayer is never dropped", "Asked by Imran ibn Husayn"],
      source: hadith("bukhari", "1117", "Imran ibn Husayn", "Sahih", "I was ill and asked about prayer. The Prophet ﷺ said: pray standing; if you cannot, then sitting; if you cannot, then on your side."),
      difficulty: 4,
      questions: [
        { q: "Example: your grandma has bad knees and can't stand. How does she pray?", a: "Sitting", wrong: ["She doesn't pray", "Only on Fridays", "Someone prays for her"], why: "Pray sitting if you cannot stand." },
        { q: "And if someone can't even sit?", a: "Lying on the side", wrong: ["Skip it", "Wait until well", "Stand anyway"], why: "Bukhari 1117." },
        { q: "What does this teach about salah?", a: "It is kept in every state", wrong: ["Only the healthy pray", "It can be dropped", "It is only in a masjid"], why: "Allah eases it, never removes it." }
      ]
    },
    {
      slug: "river",
      title: "A river five times a day",
      line: "Five prayers wash sins away, like a river five times a day.",
      facts: ["No dirt would remain", "Told by Abu Hurayrah"],
      source: hadith("bukhari", "528", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: if a river were at your door and you bathed in it five times a day, would any dirt remain? That is like the five prayers: Allah wipes out sins with them."),
      difficulty: 3,
      questions: [
        { q: "What did he compare the five prayers to?", a: "Bathing in a river five times a day", wrong: ["Eating five meals", "Climbing a mountain", "Five gold coins"], why: "Bukhari 528." },
        { q: "What do the prayers wash away?", a: "Sins", wrong: ["Clothes", "Money", "Memories"], why: "Allah wipes out sins with them." },
        { q: "Example: you made a mistake this morning. What helps at Dhuhr?", a: "Praying it well and repenting", wrong: ["Skipping it out of shame", "Waiting a week", "Nothing helps"], why: "Each prayer is a fresh wash." }
      ]
    },
    {
      slug: "pray-as-me",
      title: "Pray as you saw me",
      line: "He said: pray as you have seen me pray.",
      facts: ["Malik ibn al-Huwayrith's group", "Stayed twenty days to learn"],
      source: hadith("bukhari", "631", "Malik bin Al-Huwairith", "Sahih", "Young men stayed with the Prophet ﷺ twenty days; he sent them home to teach their families and said: pray as you have seen me pray; when prayer is due, one of you call the adhan, and the eldest lead."),
      difficulty: 4,
      questions: [
        { q: "Whose prayer is the model for every Muslim?", a: "The Prophet's ﷺ", wrong: ["Your teacher's only", "Whatever feels right", "Your friend's"], why: "Pray as you have seen me pray." },
        { q: "How long did the young men stay to learn?", a: "Twenty days", wrong: ["One hour", "A year", "Forty days"], why: "Then he sent them home to teach." },
        { q: "Who did he say should lead their prayer?", a: "The eldest", wrong: ["The youngest", "The richest", "The tallest"], why: "They were all of similar knowledge." }
      ]
    }
  ]
};

export const LIFE_UNITS: readonly DeepUnit[] = [PRAYER_EXAMPLES, RIGHTS, HAJJ_DEEP, EID, SPECIAL_DAYS];

/** The Eid and special days topic. Its units hold only deep lessons, added by addDeepUnits. */
export const EID_SECTION: LearningSection = {
  id: "eid",
  topicId: "eid",
  title: "Eid and special days",
  description: "The two Eids and the special days of the Islamic year, as the Prophet ﷺ kept them.",
  badge: "Topic 10",
  focus: "Eid al-Fitr, Eid al-Adha, Arafah, Ashura, Shawwal and Friday.",
  mascot: "hijabi",
  accentColor: "#E8833A",
  starsTarget: 0,
  branches: [],
  nodes: []
};
