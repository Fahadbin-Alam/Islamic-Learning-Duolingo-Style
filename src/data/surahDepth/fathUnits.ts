import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Al-Fath ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Fath 48:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_48_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Fath 48:${ayah}`,
    url: `https://quran.com/48:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 48:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q48 = (ayah: number) => quranQuote(48, ayah);

/** Ayahs 1 to 10: the peace of Hudaybiyyah called a clear victory, calm sent into hearts, and the pledge under the tree. */
const FATH_ONE: DeepUnit = {
  key: "fath1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-48",
  name: "Al-Fath, ayahs 1 to 10",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Fath",
  lessons: [
    {
      slug: "a-clear-victory",
      title: "A clear victory",
      line: "Allah called the peace treaty of Hudaybiyyah a clear victory.",
      facts: ["Al-Fath means The Victory", "Revealed in year 6 after the Hijrah"],
      quote: q48(1),
      source: ik(1, "Ibn Kathir says the surah came down on the way back from Hudaybiyyah, and Allah declared that peace treaty a manifest victory.", "Allah declared the Al-Hudaybiyyah peace treaty a manifest victory"),
      difficulty: 1,
      questions: [
        { q: "What does 48:1 call a manifest victory?", a: "The Hudaybiyyah peace treaty", wrong: ["The Battle of Badr", "The Hijrah", "The Battle of Uhud"], why: "Allah declared the Al-Hudaybiyyah peace treaty a manifest victory." },
        { q: "In which year after the Hijrah was Al-Fath revealed?", a: "The sixth year", wrong: ["The first year", "The tenth year", "The third year"], why: "During the month of Dhul-Qa'dah, in the sixth year of Hijrah." },
        { tf: true, q: "Ibn Mas'ud said the Companions saw Hudaybiyyah as Al-Fath.", why: "To us, Al-Fath is the treaty conducted at Al-Hudaybiyyah." }
      ]
    },
    {
      slug: "peace-opened-hearts",
      title: "Why peace was a victory",
      line: "In peace, people met openly and many embraced Islam.",
      facts: ["Believers could share their faith", "Knowledge and faith spread"],
      quote: q48(1),
      source: ik(1, "Ibn Kathir says the treaty brought great goodness: people embraced Islam in large crowds and could meet each other openly.", "including people embracing Islam in large crowds"),
      difficulty: 2,
      questions: [
        { q: "What happened during the peace, per Ibn Kathir?", a: "Many people embraced Islam", wrong: ["Everyone left Makkah", "Trade stopped", "Nothing changed"], why: "Including people embracing Islam in large crowds." },
        { q: "What spread during the peace, per Ibn Kathir?", a: "Beneficial knowledge and faith", wrong: ["Fear", "Gold", "Sickness"], why: "Thus beneficial knowledge and faith spread all around." },
        { tf: false, q: "A peace treaty can never be a victory.", why: "Allah declared the Al-Hudaybiyyah peace treaty a manifest victory." }
      ]
    },
    {
      slug: "dearer-than-the-world",
      title: "Dearer than the world",
      line: "The Prophet ﷺ loved Al-Fath more than all the sun rises on.",
      facts: ["Revealed at night on a journey", "Umar feared Quran came about him"],
      quote: q48(1),
      source: hadith("bukhari", "4833", "Umar ibn al-Khattab", "Sahih", "On a night journey, the Prophet ﷺ told Umar a surah had come down that was dearer to him than all the sun rises on, then recited Al-Fath.", "it is dearer to me than that on which the sun rises"),
      difficulty: 2,
      questions: [
        { q: "How did the Prophet ﷺ describe Al-Fath, per Bukhari 4833?", a: "Dearer than all the sun rises on", wrong: ["The longest surah", "A short reminder", "The first surah"], why: "It is dearer to me than that on which the sun rises." },
        { q: "How many times did Umar ask before giving up, per Bukhari 4833?", a: "Three times", wrong: ["Once", "Ten times", "Seven times"], why: "He asked again, but he did not reply, and then he asked for the third time." },
        { q: "What did Umar fear, per Bukhari 4833?", a: "That Quran had come down about him", wrong: ["Getting lost", "The cold", "Wild animals"], why: "I was afraid that some Qur'anic Verses might be revealed about me." }
      ]
    },
    {
      slug: "a-thankful-servant",
      title: "A thankful servant",
      line: "Though forgiven, he ﷺ prayed long at night to thank Allah.",
      facts: ["His feet swelled from standing", "Worship is a way of thanks"],
      quote: q48(2),
      source: hadith("bukhari", "4836", "Al-Mughirah ibn Shu'bah", "Sahih", "The Prophet ﷺ prayed at night until his feet swelled. When told Allah had forgiven him, he asked: Should I not be a thankful servant?", "used to offer night prayers till his feet became swollen"),
      difficulty: 2,
      questions: [
        { q: "Why did he ﷺ pray so long, per Bukhari 4836?", a: "To be a thankful servant", wrong: ["To be seen", "Out of fear only", "To win a prize"], why: "Shouldn't I be a thankful slave of Allah?" },
        { q: "What happened to his feet, per Bukhari 4836?", a: "They became swollen", wrong: ["They were cold", "They were hurt by thorns", "Nothing"], why: "He used to offer night prayers till his feet became swollen." },
        { tf: true, q: "Prayer can be a way of thanking Allah for His gifts.", why: "Shouldn't I be a thankful slave of Allah?" }
      ]
    },
    {
      slug: "an-honor-only-for-him",
      title: "An honor only for him",
      line: "All past and future sins forgiven: an honor only for him.",
      facts: ["Allah completed His favor on him", "Guided on the straight path"],
      quote: q48(2),
      source: ik(2, "Ibn Kathir says forgiveness of all past and future sins is a special virtue of the Messenger ﷺ, and no one else shares it.", "no one else shares this honor with him"),
      difficulty: 3,
      questions: [
        { q: "Who alone was promised forgiveness of all past and future sins?", a: "Muhammad ﷺ", wrong: ["Every Companion", "Every scholar", "Every king"], why: "No one else shares this honor with him." },
        { q: "What else does 48:2 promise him?", a: "Allah completes His favor on him", wrong: ["A palace on earth", "Long life", "Many sons"], why: "And complete His favor on you, and guide you on the straight path." },
        { tf: false, q: "An authentic hadith gives others forgiveness of all future sins for deeds.", why: "There is not an authentic Hadith that states that any person other than the Messenger ﷺ earned forgiveness for all of his sins." }
      ]
    },
    {
      slug: "mighty-help",
      title: "Mighty help",
      line: "Because he obeyed, Allah raised his rank and helped him win.",
      facts: ["Obedience brings honor", "Allah is the true Helper"],
      quote: q48(3),
      source: ik(3, "Ibn Kathir says because of his obedience to Allah's orders, Allah will raise his status and give him victory over his enemies.", "Allah will elevate your status and give you victory above your enemies"),
      difficulty: 2,
      questions: [
        { q: "What does Allah promise in 48:3?", a: "Strong help", wrong: ["Rest", "Riches", "Silence"], why: "And that Allah may help you with strong help." },
        { q: "Why was he given strong help, per Ibn Kathir?", a: "Because he obeyed Allah", wrong: ["Because of his army", "Because of his wealth", "By chance"], why: "Due to your obedience of the orders of Allah." },
        { tf: true, q: "Ibn Kathir says Allah would raise his status.", why: "Allah will elevate your status and give you victory above your enemies." }
      ]
    },
    {
      slug: "humble-and-raised",
      title: "Humble and raised",
      line: "Whoever forgives gets honor; whoever is humble is raised.",
      facts: ["Charity does not lessen wealth", "Humility lifts you up"],
      quote: q48(3),
      source: hadith("muslim", "2588", "Abu Hurairah", "Sahih", "The Prophet ﷺ said charity does not decrease wealth, Allah increases the honor of one who forgives, and raises one who is humble for His sake.", "no one humbles himself for the sake of Allah except that Allah raises his status"),
      difficulty: 2,
      questions: [
        { q: "What happens to one humble for Allah, per Muslim 2588?", a: "Allah raises his status", wrong: ["He is forgotten", "He loses honor", "Nothing"], why: "No one humbles himself for the sake of Allah except that Allah raises his status." },
        { q: "What does charity not do, per Muslim 2588?", a: "Decrease wealth", wrong: ["Help the poor", "Please Allah", "Bring reward"], why: "Charity does not decrease wealth." },
        { tf: true, q: "Forgiving others brings more honor from Allah.", why: "No one forgives another except that Allah increases his honor." }
      ]
    },
    {
      slug: "calm-sent-into-hearts",
      title: "Calm sent into hearts",
      line: "Allah sent calm into believers' hearts, and their faith grew.",
      facts: ["Sakinah: calm, tranquility", "Faith can increase"],
      quote: q48(4),
      source: ik(4, "Ibn Kathir says when the Companions accepted Allah's decision, Allah increased their faith, joining it to the faith they already had.", "Allah increased their faith, joining it to the faith they already had"),
      difficulty: 2,
      questions: [
        { q: "What is As-Sakinah, per Ibn Kathir?", a: "Tranquility", wrong: ["Anger", "Rain", "A tree"], why: "He it is Who sent down As-Sakinah, meaning, tranquility." },
        { q: "What happened to their faith, in 48:4?", a: "It grew more", wrong: ["It left them", "It stayed the same", "It was lost"], why: "That they may grow more in faith along with their faith." },
        { tf: true, q: "Al-Bukhari used 48:4 to show that faith increases and decreases.", why: "Al-Bukhari relied on this Ayah as proof that faith increases and decreases in the hearts." }
      ]
    },
    {
      slug: "patience-grew-their-faith",
      title: "Patience grew their faith",
      line: "Patience with the hard treaty made their faith grow.",
      facts: ["As-Sa'di explains", "Sakinah"],
      quote: q48(4),
      source: saadi(48, 4, "As-Sa'di says Sakinah is calm and firmness when hard trials shake hearts; the Companions found the treaty terms hard, but when they were patient with them, their faith grew.", "فلما صبروا عليها ووطنوا أنفسهم لها، ازدادوا بذلك إيمانا مع إيمانهم"),
      difficulty: 2,
      questions: [
        { q: "What is Sakinah, per as-Sa'di?", a: "Calm and firmness in hard times", wrong: ["A kind of food", "A type of prayer", "A city"], why: "Calm and firmness when trials shake the heart, says as-Sa'di." },
        { q: "What did patience with the hard treaty terms do for the Companions?", a: "Their faith grew", wrong: ["They grew weak", "They left", "Nothing"], why: "They were patient, so their faith grew, says as-Sa'di." },
        { tf: true, q: "Allah may delay victory for the believers out of His wisdom.", why: "As-Sa'di on 48:4." }
      ]
    },
    {
      slug: "gardens-for-believers",
      title: "Good news for believers",
      line: "Believing men and women get Gardens forever and sins wiped away.",
      facts: ["The Companions asked: what about us?", "Like 3:185"],
      quote: q48(5),
      source: ik(5, "Ibn Kathir says when the Companions asked what good news they had, Allah sent 48:5: Gardens forever and sins forgiven.", "meaning they will remain in Paradise forever"),
      difficulty: 1,
      questions: [
        { q: "Who will enter the Gardens, in 48:5?", a: "Believing men and believing women", wrong: ["Only men", "Only kings", "Only scholars"], why: "That He may admit the believing men and the believing women to Gardens." },
        { q: "What else does Allah do for them, in 48:5?", a: "Wipes away their sins", wrong: ["Makes them famous", "Gives them land", "Nothing more"], why: "And He may expiate from them their sins." },
        { q: "What does 48:5 call it?", a: "Supreme success", wrong: ["A small gift", "A test", "A story"], why: "And that is with Allah supreme success." }
      ]
    },
    {
      slug: "thinking-badly-of-allah",
      title: "Thinking badly of Allah",
      line: "Hypocrites and idol worshippers thought badly of Allah's plan.",
      facts: ["Trust Allah's wisdom", "Think well of Allah"],
      quote: q48(6),
      source: ik(6, "Ibn Kathir says they questioned the wisdom in Allah's decisions and thought the Messenger ﷺ and his Companions would be destroyed.", "who question the wisdom in Allah"),
      difficulty: 3,
      questions: [
        { q: "What wrong thought did they have, in 48:6?", a: "Evil thoughts about Allah", wrong: ["Kind thoughts", "No thoughts", "Thoughts of travel"], why: "Who think evil thoughts about Allah." },
        { q: "What did they question, per Ibn Kathir?", a: "The wisdom in Allah's decisions", wrong: ["The weather", "Prices", "The road"], why: "Who question the wisdom in Allah's decisions." },
        { tf: true, q: "Ibn Kathir says Allah cast them away from His mercy.", why: "He has cast them away from His mercy." }
      ]
    },
    {
      slug: "armies-of-allah",
      title: "Allah's armies",
      line: "The armies of the heavens and the earth all belong to Allah.",
      facts: ["One angel would be enough", "Allah is All-Wise"],
      quote: q48(7),
      source: ik(7, "Ibn Kathir says if Allah willed to send just one angel, it would destroy all they had, but He willed struggle for great wisdom.", "had He willed to send only one angel to them"),
      difficulty: 2,
      questions: [
        { q: "To whom do the armies of heavens and earth belong, in 48:7?", a: "To Allah", wrong: ["To kings", "To nobody", "To the jinn"], why: "And to Allah belong the armies of the heavens and the earth." },
        { q: "How many angels would be enough, per Ibn Kathir?", a: "Only one", wrong: ["A thousand", "Ten", "Seventy"], why: "Had He willed to send only one angel to them." },
        { q: "Which two names end 48:7?", a: "All-Powerful, All-Wise", wrong: ["Most Loving, Most Near", "First, Last", "King, Holy"], why: "And Allah is Ever All-Powerful, All-Wise." }
      ]
    },
    {
      slug: "witness-and-bringer-of-good-news",
      title: "Witness and good news",
      line: "The Prophet ﷺ was sent as witness, bringer of good news, warner.",
      facts: ["Good news for believers", "A warning for deniers"],
      quote: q48(8),
      source: ik(8, "Ibn Kathir says he was sent as a witness over creation, with good news for believers and a warning for disbelievers, as in Al-Ahzab.", "We explained these meanings in the Tafsir of Surat Al-Ahzab"),
      difficulty: 1,
      questions: [
        { q: "Which three roles does 48:8 give him?", a: "Witness, bringer of good news, warner", wrong: ["King, judge, soldier", "Poet, singer, trader", "Farmer, builder, guard"], why: "Verily, We have sent you as a witness, as a bearer of glad tidings, and as a warner." },
        { q: "To whom does he bring good news, per Ibn Kathir?", a: "The believers", wrong: ["The disbelievers", "The angels", "Nobody"], why: "As a bearer of glad tidings, to the believers." },
        { q: "Where did Ibn Kathir explain these roles before?", a: "Surat Al-Ahzab", wrong: ["Surat Al-Fatihah", "Surat An-Nas", "Surat Al-Kawthar"], why: "We explained these meanings in the Tafsir of Surat Al-Ahzab." }
      ]
    },
    {
      slug: "honor-and-glorify",
      title: "Honor him, glorify Allah",
      line: "Honor the Messenger ﷺ and glorify Allah morning and evening.",
      facts: ["Tawqir: respect and high regard", "Bukrah and Asil: morning, evening"],
      quote: q48(9),
      source: ik(9, "Ibn Kathir says we honor and respect the Messenger ﷺ, and glorify Allah's praises early and late in the day.", "where Tawqir means, respect, honor and high regard"),
      difficulty: 2,
      questions: [
        { q: "What does Tawqir mean, per Ibn Kathir?", a: "Respect, honor and high regard", wrong: ["Speed", "Silence", "Travel"], why: "Where Tawqir means, respect, honor and high regard." },
        { q: "When do we glorify Allah, in 48:9?", a: "Early and late in the day", wrong: ["Only at midnight", "Only on Fridays", "Once a year"], why: "Bukrah and Asila, the early and late part of the day." },
        { tf: true, q: "48:9 asks us to believe in Allah and His Messenger.", why: "In order that you may believe in Allah and His Messenger." }
      ]
    },
    {
      slug: "whose-right-is-what",
      title: "Whose right is what",
      line: "Honor is for the Messenger ﷺ; glorifying is for Allah alone.",
      facts: ["As-Sa'di explains", "Rights of Allah and His Messenger ﷺ"],
      quote: q48(9),
      source: saadi(48, 9, "As-Sa'di says 48:9 shows three rights: faith is owed to Allah and His Messenger ﷺ together, honor and respect belong to the Messenger ﷺ, and glorifying in prayer and worship belongs to Allah alone.", "والمختص بالرسول، وهو التعزير والتوقير، والمختص بالله، وهو التسبيح له والتقديس بصلاة أو غيرها"),
      difficulty: 3,
      questions: [
        { q: "In Al-Fath 48:9, what right belongs to Allah alone, per as-Sa'di?", a: "Glorifying Him in worship", wrong: ["Being honored", "Being greeted", "Being thanked by kings"], why: "Glorifying and praising in prayer is for Allah alone." },
        { q: "What is owed to the Messenger ﷺ, in Al-Fath 48:9?", a: "Honor and respect", wrong: ["Worship", "Prayer to him", "Nothing"], why: "Honor and respect are his ﷺ, says as-Sa'di." },
        { tf: true, q: "Believing in Allah and His Messenger ﷺ is a right shared by both.", why: "As-Sa'di on 48:9." }
      ]
    },
    {
      slug: "the-hand-of-allah",
      title: "A pledge to Allah",
      line: "A pledge to the Messenger ﷺ is a pledge given to Allah.",
      facts: ["Like 4:80", "Allah hears and sees all"],
      quote: q48(10),
      source: ik(10, "Ibn Kathir says Allah is with them, hearing their words and seeing their stand, knowing them inside and out.", "He is with them, hearing their statements and witnessing their stand"),
      difficulty: 2,
      questions: [
        { q: "To whom are they really giving their pledge, in 48:10?", a: "To Allah", wrong: ["To a tribe", "To a king", "To nobody"], why: "Verily, those who give pledge to you, they are giving pledge to Allah." },
        { q: "Which ayah says obeying the Messenger ﷺ is obeying Allah?", a: "4:80", wrong: ["2:255", "112:1", "1:5"], why: "He who obeys the Messenger ﷺ, has indeed obeyed Allah. (4:80)" },
        { tf: true, q: "Ibn Kathir says Allah heard their words and saw their stand.", why: "He is with them, hearing their statements and witnessing their stand." }
      ]
    },
    {
      slug: "keep-your-promise",
      title: "Keep your promise",
      line: "Whoever breaks a pledge harms himself; keeping it brings reward.",
      facts: ["The Pledge of Ar-Ridwan", "Under a Samurah tree"],
      quote: q48(10),
      source: ik(10, "Ibn Kathir says breaking a pledge harms only the one who breaks it, and Allah gives a great reward to the one who keeps it.", "Then whosoever breaks his pledge, breaks it only to his own harm"),
      difficulty: 2,
      questions: [
        { q: "Whom does breaking a pledge harm, in 48:10?", a: "The one who breaks it", wrong: ["The Messenger ﷺ", "Allah", "Nobody"], why: "Then whosoever breaks his pledge, breaks it only to his own harm." },
        { q: "What does the one who keeps his pledge get, in 48:10?", a: "A great reward", wrong: ["Nothing", "A warning", "Land"], why: "He will bestow on him a great reward." },
        { q: "What was the pledge at Hudaybiyyah called?", a: "The Pledge of Ar-Ridwan", wrong: ["The Pledge of Aqabah", "The Pledge of Badr", "The Pledge of Uhud"], why: "The pledge of Ar-Ridwan which was pledged under a tree." }
      ]
    },
    {
      slug: "best-people-on-earth",
      title: "Best people on earth",
      line: "He ﷺ told the 1,400: you are the best people on earth.",
      facts: ["They were about 1,400", "Jabir remembered the place"],
      quote: q48(10),
      source: hadith("bukhari", "4154", "Jabir ibn Abdullah", "Sahih", "On the day of Hudaybiyyah, the Prophet ﷺ told the 1,400 Companions: You are the best people on the earth.", "You are the best people on the earth"),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ call them, per Bukhari 4154?", a: "The best people on the earth", wrong: ["The strongest army", "The richest tribe", "The last ones"], why: "You are the best people on the earth!" },
        { q: "How many were they, per Bukhari 4154?", a: "1,400", wrong: ["300", "10,000", "70"], why: "We were 1400 then." },
        { tf: true, q: "Ibn Kathir says 1,400 is the better choice for their number.", why: "However, 1,400 is the better choice." }
      ]
    },
    {
      slug: "water-between-his-fingers",
      title: "Water from his fingers",
      line: "Out of water, they saw water flow from between his fingers.",
      facts: ["A miracle at Hudaybiyyah", "Everyone drank and made wudu"],
      quote: q48(10),
      source: hadith("bukhari", "4152", "Jabir ibn Abdullah", "Sahih", "At Hudaybiyyah the people had no water, so the Prophet ﷺ put his hand in a pot and water flowed between his fingers like springs.", "the water started spouting out between his fingers like springs"),
      difficulty: 2,
      questions: [
        { q: "What happened when he put his hand in the pot, per Bukhari 4152?", a: "Water flowed between his fingers", wrong: ["The pot broke", "Milk came out", "Nothing"], why: "The water started spouting out between his fingers like springs." },
        { q: "What did Jabir say about their number?", a: "Even 100,000 would have had enough", wrong: ["Some went thirsty", "Only a few drank", "They left"], why: "Even if we had been one hundred thousand, that water would have been sufficient for us." },
        { tf: true, q: "The people both drank and made ablution, per Bukhari 4152.", why: "So we drank and performed ablution." }
      ]
    }
  ]
};

/** Ayahs 11 to 24: excuses of those who stayed behind, Allah's pleasure with the people of the tree, and hands held back. */
const FATH_TWO: DeepUnit = {
  key: "fath2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-48",
  name: "Al-Fath, ayahs 11 to 24",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Fath",
  lessons: [
    {
      slug: "busy-with-family-and-wealth",
      title: "Excuses of the stay-behinds",
      line: "Some stayed home and said: our wealth and families kept us busy.",
      facts: ["Words not matching hearts", "They asked for forgiveness to show off"],
      quote: q48(11),
      source: ik(11, "Ibn Kathir says they asked the Messenger ﷺ to pray for their forgiveness only to show off, not out of faith.", "They say with their tongues what is not in their hearts"),
      difficulty: 2,
      questions: [
        { q: "What excuse did they give, in 48:11?", a: "Our wealth and families kept us busy", wrong: ["We were sick", "We had no camels", "We were traveling"], why: "Our possessions and our families occupied us, so ask forgiveness for us." },
        { q: "Why did they ask for forgiveness, per Ibn Kathir?", a: "To show off and pretend", wrong: ["Out of true faith", "Because they cried", "Because they were scared of rain"], why: "Not because they had faith in the Prophet ﷺ and his invocation, but to show off and pretend." },
        { tf: true, q: "Their tongues said what was not in their hearts.", why: "They say with their tongues what is not in their hearts." }
      ]
    },
    {
      slug: "none-can-stop-allahs-decree",
      title: "None can stop His will",
      line: "No one can stop what Allah decides, whether harm or benefit.",
      facts: ["Allah knows what hearts hide", "Be the same inside and out"],
      quote: q48(11),
      source: ik(11, "Ibn Kathir says none can resist what Allah decides, and He knows the secrets hearts conceal.", "none can resist what Allah has decided in your case"),
      difficulty: 2,
      questions: [
        { q: "Who can stop Allah if He wills harm or benefit, in 48:11?", a: "No one", wrong: ["A strong tribe", "Wealth", "Family"], why: "Who then has any power at all on your behalf with Allah, if He intends you hurt or intends you benefit?" },
        { q: "What does Allah know, per Ibn Kathir?", a: "What hearts conceal", wrong: ["Only actions", "Only words", "Only the past"], why: "Allah is the Knower of your secrets and what your hearts conceal." },
        { tf: true, q: "48:11 ends by saying Allah is aware of what you do.", why: "Nay, but Allah is Aware of what you do." }
      ]
    },
    {
      slug: "they-thought-none-would-return",
      title: "They thought none would return",
      line: "They stayed home, sure the believers would never return.",
      facts: ["Bur: heading for ruin", "Bad thoughts were made to look fine"],
      quote: q48(12),
      source: ik(12, "Ibn Kathir says they stayed behind out of hypocrisy, thinking the Muslims would be killed and none would come back.", "because you thought that the Muslims would be killed"),
      difficulty: 3,
      questions: [
        { q: "What did they think, in 48:12?", a: "The believers would never return", wrong: ["The believers would get rich", "The trip was short", "It would rain"], why: "Nay, but you thought that the Messenger ﷺ and the believers would never return to their families." },
        { q: "What does Bur mean, per Ibn Abbas and Mujahid?", a: "Going for destruction", wrong: ["Very brave", "Very rich", "Well guided"], why: "And you became a people Bur, going for destruction." },
        { tf: false, q: "Ibn Kathir says their staying behind was only a small slip.", why: "Your lagging behind was not an excusable act or just a sin. Rather, your lagging behind was because of hypocrisy." }
      ]
    },
    {
      slug: "sincere-inside-and-out",
      title: "Sincere inside and out",
      line: "Faith must be true inside, not just shown to people.",
      facts: ["Showing faith is not enough", "Allah sees the heart"],
      quote: q48(13),
      source: ik(13, "Ibn Kathir says whoever does not make his actions pure inside and out for Allah will be punished, even if he shows people faith.", "does not purify his actions outwardly and inwardly for Allah"),
      difficulty: 2,
      questions: [
        { q: "What must actions be, per Ibn Kathir on 48:13?", a: "Pure inside and out for Allah", wrong: ["Seen by many", "Done quickly", "Kept secret from all"], why: "Whoever does not purify his actions outwardly and inwardly for Allah's sake." },
        { q: "What does 48:13 ask us to believe in?", a: "Allah and His Messenger", wrong: ["Our own wishes", "Luck", "Stars"], why: "And whosoever does not believe in Allah and His Messenger." },
        { tf: false, q: "Showing faith to people is enough, even if the heart differs.", why: "Even if he pretends to show people that he follows the faith, contradicting his true creed." }
      ]
    },
    {
      slug: "forgiving-most-merciful",
      title: "Forgiving, Most Merciful",
      line: "Allah owns the heavens and earth, and forgives those who repent.",
      facts: ["The door of repentance is open", "Allah is the only King"],
      quote: q48(14),
      source: ik(14, "Ibn Kathir says Allah is Forgiving and Most Merciful with those who repent, return and submit to Him.", "with those who repent, return and submit to Him"),
      difficulty: 1,
      questions: [
        { q: "Whom is Allah merciful with, per Ibn Kathir on 48:14?", a: "Those who repent and return", wrong: ["Those who boast", "Those who lie", "No one"], why: "With those who repent, return and submit to Him." },
        { q: "To whom does the kingdom of heavens and earth belong, in 48:14?", a: "To Allah", wrong: ["To kings", "To angels", "To people"], why: "And to Allah belongs the sovereignty of the heavens and the earth." },
        { q: "Which two names end 48:14?", a: "Forgiving, Most Merciful", wrong: ["Strong, Mighty", "First, Last", "Hearing, Seeing"], why: "And Allah is Forgiving, Most Merciful." }
      ]
    },
    {
      slug: "only-coming-for-the-spoils",
      title: "Only coming for spoils",
      line: "The stay-behinds wanted to join only when spoils were near.",
      facts: ["The march to Khaybar", "Allah had promised it to others"],
      quote: q48(15),
      source: ik(15, "Ibn Kathir says when the Muslims went to Khaybar, those who stayed behind asked to come, hoping only for spoils.", "They were hoping to collect war booty"),
      difficulty: 3,
      questions: [
        { q: "Where were the Muslims going, per Ibn Kathir on 48:15?", a: "Khaybar", wrong: ["Makkah", "Yemen", "Egypt"], why: "When the Prophet ﷺ and his Companions later went on to conquer Khaybar, the bedouins asked them to take them along." },
        { q: "Who was promised Khaybar, per Ibn Kathir?", a: "Those present at Hudaybiyyah", wrong: ["Everyone", "The bedouins", "Nobody"], why: "Allah has promised those who were present at Al-Hudaybiyyah to earn Khaybar's war spoils alone." },
        { q: "What did they claim, in 48:15?", a: "You envy us", wrong: ["You love us", "You fear us", "You forgot us"], why: "Then they will say: Nay, you envy us." }
      ]
    },
    {
      slug: "a-second-chance-to-obey",
      title: "A second chance to obey",
      line: "Allah gave those who stayed behind another chance to obey.",
      facts: ["Obey and get a fair reward", "Turning away again is a loss"],
      quote: q48(16),
      source: ik(16, "Ibn Kathir says if they answer the call this time and do their duty, Allah will give them a fair reward.", "if you accept the call to Jihad and prepare for it and fulfill your duty"),
      difficulty: 3,
      questions: [
        { q: "What will Allah give if they obey, in 48:16?", a: "A fair reward", wrong: ["Nothing", "Only praise", "Gold only"], why: "Then if you obey, Allah will give you a fair reward." },
        { q: "When had they turned away before, per Ibn Kathir?", a: "On the day of Hudaybiyyah", wrong: ["At Badr", "At the Hijrah", "Never"], why: "On the day of Al-Hudaybiyyah, when you were called to Jihad, yet lagged behind." },
        { tf: true, q: "Allah gives people chances to correct their mistakes.", why: "Then if you obey, Allah will give you a fair reward." }
      ]
    },
    {
      slug: "no-blame-on-the-sick",
      title: "No blame on the sick",
      line: "The blind, the lame and the sick are excused from going out.",
      facts: ["Islam is fair and easy", "Allah knows every excuse"],
      quote: q48(17),
      source: ik(17, "Ibn Kathir says blindness, being lame, and illnesses are true excuses for staying behind until the illness ends.", "such as blindness and being lame, and various illnesses"),
      difficulty: 1,
      questions: [
        { q: "Who is excused, in 48:17?", a: "The blind, the lame and the sick", wrong: ["The rich", "The busy", "The proud"], why: "No blame or sin is there upon the blind, nor is there sin upon the lame, nor is there sin upon the sick." },
        { q: "What does the one who obeys get, in 48:17?", a: "Gardens with rivers", wrong: ["Nothing", "A house in town", "Fame"], why: "He will admit him to Gardens beneath which rivers flow." },
        { tf: true, q: "A sick person keeps a valid excuse until the illness ends.", why: "He is allowed to remain behind and will have a valid excuse to do so, until his illness ends." }
      ]
    },
    {
      slug: "allah-was-pleased-with-them",
      title: "Allah was pleased",
      line: "Allah was pleased with the believers who pledged under the tree.",
      facts: ["The Samurah tree at Hudaybiyyah", "He knew what was in their hearts"],
      quote: q48(18),
      source: ik(18, "Ibn Kathir says Allah declares He is pleased with the believers who gave the pledge under the tree, and knew their truthfulness.", "Allah declares that He is pleased with the believers who gave the pledge"),
      difficulty: 1,
      questions: [
        { q: "With whom was Allah pleased, in 48:18?", a: "Believers who pledged under the tree", wrong: ["Those who stayed home", "Only the leaders", "No one"], why: "Indeed, Allah was pleased with the believers when they gave the pledge to you under the tree." },
        { q: "What did Allah know in their hearts, per Ibn Kathir?", a: "Truthfulness and obedience", wrong: ["Fear only", "Doubt", "Pride"], why: "Of truthfulness, trustworthiness, obedience and adherence." },
        { q: "What did Allah send down on them, in 48:18?", a: "As-Sakinah, calm", wrong: ["Rain", "Food", "Gold"], why: "And He sent down As-Sakinah upon them." }
      ]
    },
    {
      slug: "the-tree-was-forgotten",
      title: "The tree was forgotten",
      line: "A year later, even those who pledged could not find the tree.",
      facts: ["Sa'id ibn al-Musayyib's father was there", "Worship Allah, not places"],
      quote: q48(18),
      source: hadith("bukhari", "4163", "Sa'id ibn al-Musayyib", "Sahih", "Sa'id's father, who pledged under the tree, said that the next year they forgot the tree and could not recognize it.", "we forgot the Tree and were unable to recognize it"),
      difficulty: 3,
      questions: [
        { q: "What happened the next year, per Bukhari 4163?", a: "They forgot the tree", wrong: ["They built a wall", "They cut it down", "They prayed under it"], why: "When we set out the following year, we forgot the Tree and were unable to recognize it." },
        { q: "Whose father was at the pledge, per Bukhari 4163?", a: "Sa'id ibn al-Musayyib", wrong: ["Ibn Abbas", "Anas", "Abu Hurairah"], why: "My father said that he was amongst those who had given the Pledge of allegiance." },
        { tf: true, q: "Even the Companions could not find the tree later.", why: "The companions of the Prophet ﷺ could not recognize it." }
      ]
    },
    {
      slug: "people-of-the-tree",
      title: "People of the tree",
      line: "He ﷺ said the people of the tree are safe from Hellfire.",
      facts: ["Hafsah asked about 19:71", "The pious are saved, 19:72"],
      quote: q48(18),
      source: hadith("muslim", "2496", "Umm Mubashshir", "Sahih", "The Prophet ﷺ said, Allah willing, none of the people of the tree who pledged under it would enter the Fire.", "the people of the Tree would never enter the fire of Hell"),
      difficulty: 3,
      questions: [
        { q: "What did he ﷺ say about the people of the tree, per Muslim 2496?", a: "They would not enter the Fire", wrong: ["They would be kings", "They would live long", "They would be rich"], why: "God willing, the people of the Tree would never enter the fire of Hell." },
        { q: "Who asked about 19:71, per Muslim 2496?", a: "Hafsah", wrong: ["Aishah", "Fatimah", "Khadijah"], why: "Hafsa said: And there is none amongst you but shall have to pass over that." },
        { q: "Which ayah did he ﷺ answer with?", a: "19:72", wrong: ["2:255", "1:1", "112:1"], why: "We would rescue those persons who are God-conscious (19:72)." }
      ]
    },
    {
      slug: "a-near-victory",
      title: "A near victory",
      line: "The peace led to Khaybar, then Makkah, and much good after.",
      facts: ["Abundant spoils promised", "Glory in both worlds"],
      quote: q48(19),
      source: ik(19, "Ibn Kathir says after the treaty the Companions gained great benefits, leading to the conquest of Khaybar and Makkah.", "leading to the conquest of Khaybar and Makkah"),
      difficulty: 2,
      questions: [
        { q: "What did the peace lead to, per Ibn Kathir?", a: "The conquest of Khaybar and Makkah", wrong: ["A long war", "Nothing new", "Leaving Madinah"], why: "Leading to the conquest of Khaybar and Makkah." },
        { q: "Which two names end 48:19?", a: "All-Mighty, All-Wise", wrong: ["Most Kind, Most Near", "Hearing, Seeing", "First, Last"], why: "And Allah is Ever All-Mighty, All-Wise." },
        { tf: true, q: "Allah rewarded them with a near victory, in 48:18.", why: "And He rewarded them with a near victory." }
      ]
    },
    {
      slug: "hands-of-men-held-back",
      title: "Harm held back",
      line: "Allah kept enemies away from the believers and their families.",
      facts: ["Khaybar came soon", "A sign for the believers"],
      quote: q48(20),
      source: ik(20, "Ibn Kathir says Allah kept away the harm enemies planned, and also protected the families left behind.", "no harm that your enemies had planned against you"),
      difficulty: 2,
      questions: [
        { q: "What did Allah hasten, per Mujahid on 48:20?", a: "The conquest of Khaybar", wrong: ["The end of the world", "Rain", "A famine"], why: "And He has hastened for you this, means, the conquest of Khaybar." },
        { q: "Whom else did Allah protect, per Ibn Kathir?", a: "Their families left behind", wrong: ["Only the leaders", "Only the camels", "No one else"], why: "Allah also restrained the hands of men, whom you left behind close to your families and children, from harming them." },
        { tf: true, q: "Allah made the protection a sign for the believers.", why: "That it may be a sign for the believers." }
      ]
    },
    {
      slug: "good-in-what-you-dislike",
      title: "Good in what you dislike",
      line: "Allah's choice is best, even if it looks hard at first.",
      facts: ["Like 2:216", "Trust Allah's plan"],
      quote: q48(20),
      source: ik(20, "Ibn Kathir says the best decisions are those Allah prefers for His servants, even if they look unfavorable at first, as 2:216 says.", "the best decisions are those which He prefers for His believing servants"),
      difficulty: 3,
      questions: [
        { q: "Which decisions are best, per Ibn Kathir?", a: "Those Allah prefers for His servants", wrong: ["Those we like most", "Those that are easiest", "Those of the majority"], why: "The best decisions are those which He prefers for His believing servants." },
        { q: "Which ayah says you may dislike what is good for you?", a: "2:216", wrong: ["1:1", "112:1", "2:286"], why: "It may be that you dislike a thing that is good for you (2:216)." },
        { tf: true, q: "Hudaybiyyah looked hard but brought great good.", why: "Even though these decisions might look unfavorable outwardly." }
      ]
    },
    {
      slug: "victories-still-to-come",
      title: "Victories still to come",
      line: "Other victories were promised that were not yet in their hands.",
      facts: ["Allah has power over all things", "He provides from unexpected places"],
      quote: q48(21),
      source: ik(21, "Ibn Kathir says other spoils and victories were yet to come, and Ibn Abbas said they continue until today.", "They are the victories that are continuing until this day"),
      difficulty: 2,
      questions: [
        { q: "What did Ibn Abbas say about the other victories in 48:21?", a: "They continue until today", wrong: ["They never came", "They ended at once", "They were only dreams"], why: "They are the victories that are continuing until this day." },
        { q: "What does Allah encompass, in 48:21?", a: "Victories not yet in their power", wrong: ["Only the past", "Nothing", "Only Makkah"], why: "And other victories which are not yet within your power; indeed Allah encompasses them." },
        { tf: true, q: "Allah provides for the pious from where they never imagined.", why: "Allah the Exalted provides provisions and sustenance for His servants who have Taqwa, from resources they could never imagine." }
      ]
    },
    {
      slug: "they-would-have-fled",
      title: "They would have fled",
      line: "Had they fought at Hudaybiyyah, the deniers would have run away.",
      facts: ["No protector, no helper", "Allah helps His Messenger"],
      quote: q48(22),
      source: ik(22, "Ibn Kathir says had the idolators fought, Allah would have given victory to His Messenger and they would have fled.", "the army of the disbelievers would have been defeated"),
      difficulty: 2,
      questions: [
        { q: "What would the deniers have done if they fought, in 48:22?", a: "Turned their backs", wrong: ["Won", "Made a treaty", "Stayed home"], why: "They certainly would have turned their backs." },
        { q: "What would they not find, in 48:22?", a: "A protector or a helper", wrong: ["Water", "A road", "A tent"], why: "Then they would have found neither a protector nor a helper." },
        { tf: true, q: "Ibn Kathir says the army of the deniers would have been defeated.", why: "The army of the disbelievers would have been defeated and would have deserted the battlefield." }
      ]
    },
    {
      slug: "allahs-way-never-changes",
      title: "Allah's way never changes",
      line: "When faith meets disbelief, Allah raises truth, as at Badr.",
      facts: ["A sunnah of Allah", "Badr: few against many"],
      quote: q48(23),
      source: ik(23, "Ibn Kathir says whenever faith and disbelief meet, Allah gives victory to faith and raises the truth, as at Badr.", "Allah gives victory to faith over disbelief, raises high truth and destroys falsehood"),
      difficulty: 2,
      questions: [
        { q: "What will you never find, in 48:23?", a: "Any change in Allah's way", wrong: ["A friend", "A road", "An answer"], why: "And you will not find any change in the way of Allah." },
        { q: "Which battle does Ibn Kathir give as an example?", a: "Badr", wrong: ["Uhud", "Khaybar", "Hunayn"], why: "Allah the Exalted helped His loyal faithful supporters during the battle of Badr." },
        { tf: false, q: "At Badr the Muslims were many and heavily armed.", why: "Even though the Muslims were few in number and lightly armed." }
      ]
    },
    {
      slug: "hands-held-back-at-makkah",
      title: "Hands held back",
      line: "Allah held back both sides near Makkah and gave peace instead.",
      facts: ["No fighting near the Haram", "Peace brought good results"],
      quote: q48(24),
      source: ik(24, "Ibn Kathir says Allah saved both sides from battle near Al-Masjid Al-Haram and brought a treaty with good results.", "Allah saved both parties from battle and brought forth a peace treaty"),
      difficulty: 2,
      questions: [
        { q: "Whose hands did Allah hold back, in 48:24?", a: "Both sides", wrong: ["Only the Muslims", "Only Quraysh", "Nobody"], why: "And He it is Who has withheld their hands from you and your hands from them." },
        { q: "Where did this happen, in 48:24?", a: "In the midst of Makkah", wrong: ["In Madinah", "In Syria", "At sea"], why: "In the midst of Makkah, after He had made you victors over them." },
        { tf: true, q: "Ibn Kathir says the peace produced good results for the believers.", why: "Brought forth a peace treaty that produced good results for the believers." }
      ]
    },
    {
      slug: "the-captives-were-spared",
      title: "The attackers were spared",
      line: "Eighty men came to attack; he ﷺ caught, then freed them.",
      facts: ["From the mountain of Tan'im", "48:24 came down about it"],
      quote: q48(24),
      source: hadith("muslim", "1808", "Anas ibn Malik", "Sahih", "Eighty armed men from Makkah came down to attack by surprise; the Prophet ﷺ captured them and spared their lives, and 48:24 came down.", "captured them but spared their lives"),
      difficulty: 3,
      questions: [
        { q: "How many men came to attack, per Muslim 1808?", a: "Eighty", wrong: ["Ten", "Seven hundred", "Three"], why: "Eighty Persons from the inhabitants of Mecca swooped down upon the Messenger of Allah." },
        { q: "What did he ﷺ do with them, per Muslim 1808?", a: "Spared their lives", wrong: ["Kept them forever", "Sold them", "Sent them to sea"], why: "He captured them but spared their lives." },
        { tf: true, q: "48:24 came down about this event.", why: "So, God, the Exalted and Glorious, revealed the verses: It is He Who restrained your hands from them." }
      ]
    }
  ]
};

/** Ayahs 25 to 29: the treaty and its wisdom, the true dream of Umrah, and the qualities of the Companions. */
const FATH_THREE: DeepUnit = {
  key: "fath3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-48",
  name: "Al-Fath, ayahs 25 to 29",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Fath",
  lessons: [
    {
      slug: "blocked-from-the-kaaba",
      title: "Blocked from the Kaaba",
      line: "Quraysh kept the believers and their camels from the Kaaba.",
      facts: ["Seventy camels for sacrifice", "They came only for Umrah"],
      quote: q48(25),
      source: ik(25, "Ibn Kathir says the deniers stopped the believers from Al-Masjid Al-Haram and kept the sacrificial animals from their place.", "There were seventy sacrificial camels designated for sacrifice"),
      difficulty: 2,
      questions: [
        { q: "What did Quraysh block, in 48:25?", a: "Al-Masjid Al-Haram", wrong: ["The road to Yemen", "The market", "The wells of Madinah"], why: "They are those who disbelieved and hindered you from Al-Masjid Al-Haram." },
        { q: "How many sacrificial camels were there, per Ibn Kathir?", a: "Seventy", wrong: ["Seven", "Seven hundred", "Two"], why: "There were seventy sacrificial camels designated for sacrifice." },
        { tf: true, q: "Ibn Kathir says the believers were more worthy of the Haram.", why: "Even though you are its people and more worthy of being responsible for it." }
      ]
    },
    {
      slug: "hidden-believers-in-makkah",
      title: "Hidden believers in Makkah",
      line: "Some believers in Makkah hid their faith; Allah protected them.",
      facts: ["Unknown to the army", "Mercy for those Allah wills"],
      quote: q48(25),
      source: ik(25, "Ibn Kathir says some believing men and women lived among the Makkans hiding their faith, so Allah delayed the fight to protect them.", "living among the Makkans hiding their faith"),
      difficulty: 3,
      questions: [
        { q: "Who lived among the Makkans, in 48:25?", a: "Believing men and women", wrong: ["Only traders", "Only children", "Nobody"], why: "Had there not been believing men and believing women whom you did not know." },
        { q: "Why did they hide their faith, per Ibn Kathir?", a: "Fearing for their safety", wrong: ["They were shy", "They forgot", "They were traveling"], why: "Living among the Makkans hiding their faith for fearing for their safety." },
        { tf: true, q: "Allah held back so that many might embrace Islam.", why: "And so that many of the idolators might embrace Islam." }
      ]
    },
    {
      slug: "pride-of-ignorance",
      title: "The pride of ignorance",
      line: "Quraysh refused to write Bismillah or Messenger of Allah.",
      facts: ["Hamiyyah: stubborn pride", "The believers stayed calm"],
      quote: q48(26),
      source: ik(26, "Ibn Kathir says their pride showed when they refused to write In the Name of Allah and Muhammad, Allah's Messenger in the treaty.", "when they refused to write"),
      difficulty: 2,
      questions: [
        { q: "What did Quraysh refuse to write, per Ibn Kathir?", a: "In the Name of Allah, the Most Gracious", wrong: ["The date", "Their own names", "The number of camels"], why: "When they refused to write, In the Name of Allah, the Most Gracious, the Most Merciful." },
        { q: "What did Allah send down on the believers, in 48:26?", a: "Calmness and tranquillity", wrong: ["Anger", "Rain", "Fear"], why: "Then Allah sent down His calmness and tranquillity upon His Messenger and upon the believers." },
        { q: "What kind of pride did the deniers have, in 48:26?", a: "Pride of the time of ignorance", wrong: ["Pride in good deeds", "Pride in Quran", "No pride"], why: "The pride and haughtiness of the time of ignorance." }
      ]
    },
    {
      slug: "the-word-of-taqwa",
      title: "The word of Taqwa",
      line: "Allah made the believers hold to the word of Taqwa.",
      facts: ["La ilaha illallah", "Mujahid: sincerity"],
      quote: q48(26),
      source: ik(26, "Ibn Kathir says the word of Taqwa means sincerity, according to Mujahid, and La ilaha illallah according to others.", "the word of Taqwa refers to sincerity, according to Mujahid"),
      difficulty: 2,
      questions: [
        { q: "What does the word of Taqwa mean, per Mujahid?", a: "Sincerity", wrong: ["Wealth", "Strength", "Speed"], why: "The word of Taqwa refers to sincerity, according to Mujahid." },
        { q: "Which words did Az-Zuhri give for the word of Taqwa?", a: "La ilaha illallah", wrong: ["Subhanallah", "Alhamdulillah", "Allahu Akbar"], why: "La ilaha illallah, alone without partners." },
        { tf: true, q: "48:26 says the believers were worthy of the word of Taqwa.", why: "And they were well entitled to it and worthy of it." }
      ]
    },
    {
      slug: "muhammad-son-of-abdullah",
      title: "Muhammad, son of Abdullah",
      line: "He ﷺ let the treaty say Muhammad bin Abdullah, to keep peace.",
      facts: ["Ali would not rub it out", "He was still Allah's Messenger"],
      quote: q48(26),
      source: hadith("bukhari", "2699", "Al-Bara ibn Azib", "Sahih", "Quraysh would not accept Messenger of Allah in the treaty. Ali would not rub it out, so the Prophet ﷺ wrote Muhammad bin Abdullah himself.", "I will never rub off your name"),
      difficulty: 3,
      questions: [
        { q: "What did Quraysh object to in the treaty, per Bukhari 2699?", a: "The words Allah's Messenger", wrong: ["The date", "The place", "The number of days"], why: "If we believed that you are Allah's Messenger we would not prevent you." },
        { q: "What did Ali say, per Bukhari 2699?", a: "I will never rub off your name", wrong: ["I will write it", "Let us leave", "Ask Abu Bakr"], why: "No, by Allah, I will never rub off your name." },
        { tf: true, q: "He ﷺ said: I am Allah's Messenger and also Muhammad bin Abdullah.", why: "I am Allah's Messenger and also Muhammad bin Abdullah." }
      ]
    },
    {
      slug: "umm-salamahs-advice",
      title: "Umm Salamah's advice",
      line: "Umm Salamah advised him ﷺ to sacrifice first, and all followed.",
      facts: ["Actions speak loudly", "A wise mother of the believers"],
      quote: q48(26),
      source: hadith("bukhari", "2731", "Al-Miswar and Marwan", "Sahih", "When people were slow to sacrifice, Umm Salamah advised the Prophet ﷺ to sacrifice and shave first without a word; then everyone followed.", "call your barber to shave your head"),
      difficulty: 3,
      questions: [
        { q: "What did Umm Salamah advise, per Bukhari 2731?", a: "Sacrifice and shave first, saying nothing", wrong: ["Give a long speech", "Wait a year", "Go home"], why: "So, the Prophet ﷺ went out and did not talk to anyone of them till he did that." },
        { q: "What did the Companions do when they saw him?", a: "They sacrificed and shaved", wrong: ["They left", "They argued", "They slept"], why: "Seeing that, the companions of the Prophet ﷺ got up and started shaving the heads of one another." },
        { tf: true, q: "Leading by example can move people more than words.", why: "Seeing that, the companions of the Prophet ﷺ got up and followed him." }
      ]
    },
    {
      slug: "the-true-dream",
      title: "The true dream",
      line: "He ﷺ dreamed of doing Tawaf; Allah made the dream true.",
      facts: ["Not that year, but the next", "Umar asked; Abu Bakr gave the same answer"],
      quote: q48(27),
      source: ik(27, "Ibn Kathir says the Messenger of Allah saw in a dream that he entered Makkah and did Tawaf, and Allah fulfilled it.", "saw himself entering Makkah and performing Tawaf around the House"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ see in his dream, per Ibn Kathir?", a: "Entering Makkah and doing Tawaf", wrong: ["A battle", "A storm", "A new city"], why: "In a dream, the Messenger of Allah saw himself entering Makkah and performing Tawaf around the House." },
        { q: "What did he ﷺ answer Umar about the dream?", a: "Did I say it would be this year?", wrong: ["Forget it", "It was nothing", "Ask later"], why: "Yes. Have I told you that you will go to it this year?" },
        { tf: true, q: "Abu Bakr gave Umar the same answer, letter for letter.", why: "Umar received the same answer from Abu Bakr As-Siddiq, letter for letter." }
      ]
    },
    {
      slug: "shaved-or-shortened",
      title: "Shaved or shortened",
      line: "He ﷺ prayed for those who shave, then those who cut short.",
      facts: ["Both are allowed", "Shaving has extra reward"],
      quote: q48(27),
      source: hadith("bukhari", "1727", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ prayed three times for mercy on those who shave their heads, and then for those who cut their hair short.", "Be merciful to those who have their head shaved"),
      difficulty: 2,
      questions: [
        { q: "Which two ways of finishing Umrah does 48:27 mention?", a: "Shaving or cutting hair short", wrong: ["Fasting or praying", "Running or walking", "Eating or drinking"], why: "Some having your heads shaved, and some having your hair cut short." },
        { q: "For whom did he ﷺ pray first, per Bukhari 1727?", a: "Those who shave their heads", wrong: ["Those who cut short", "Those who stay home", "The leaders"], why: "O Allah! Be merciful to those who have their head shaved." },
        { tf: true, q: "He ﷺ also prayed for those who cut their hair short.", why: "And to those who get their hair cut short." }
      ]
    },
    {
      slug: "keeping-promises",
      title: "Keeping his promise",
      line: "On the next Umrah, he ﷺ kept the weapons outside, as agreed.",
      facts: ["Swords stayed in sheaths", "Even enemies called him trustworthy"],
      quote: q48(27),
      source: ik(27, "Ibn Kathir says on the Umrah the next year, the weapons were sent to a valley outside, and Mikraz said: we knew you to be trustworthy.", "trustworthy and keeping to your promises"),
      difficulty: 2,
      questions: [
        { q: "What did Mikraz call him, per Ibn Kathir?", a: "Trustworthy and keeping promises", wrong: ["Weak", "Rich", "Stern"], why: "This is the way we knew you to be, trustworthy and keeping to your promises." },
        { q: "In which year after Hijrah was that Umrah?", a: "The seventh year", wrong: ["The second year", "The tenth year", "The first year"], why: "This occurred in the Umrah performed the following year, on the seventh year of Hijrah." },
        { tf: true, q: "48:27 says they would enter Makkah secure, having no fear.", why: "Certainly, you shall enter Al-Masjid Al-Haram, if Allah wills, secure, having no fear." }
      ]
    },
    {
      slug: "ramal-in-tawaf",
      title: "Walking briskly in Tawaf",
      line: "He ﷺ told them to walk briskly to show their strength.",
      facts: ["Ramal: brisk walking", "The first three rounds"],
      quote: q48(27),
      source: hadith("bukhari", "1602", "Ibn Abbas", "Sahih", "The idol worshippers said the Muslims were weak from Madinah's fever, so the Prophet ﷺ ordered Ramal in the first three rounds of Tawaf.", "ordered his companions to do Ramal in the first three rounds"),
      difficulty: 3,
      questions: [
        { q: "In how many rounds did they do Ramal, per Bukhari 1602?", a: "The first three", wrong: ["All seven", "Only the last", "None"], why: "The Prophet ﷺ ordered his companions to do Ramal in the first three rounds of Tawaf." },
        { q: "What had the idol worshippers said, per Bukhari 1602?", a: "They were weak from fever", wrong: ["They were rich", "They were many", "They were late"], why: "They had been weakened by the Fever of Yathrib." },
        { tf: true, q: "He ﷺ did not order Ramal in every round, out of kindness.", why: "The Prophet ﷺ did not order them to do Ramal in all the rounds of Tawaf out of pity for them." }
      ]
    },
    {
      slug: "the-religion-of-truth",
      title: "The religion of truth",
      line: "Allah sent His Messenger with guidance and the true religion.",
      facts: ["Knowledge and good deeds", "Allah is enough as Witness"],
      quote: q48(28),
      source: ik(28, "Ibn Kathir says guidance means beneficial knowledge and the true religion means righteous deeds; Islam has both.", "with beneficial knowledge and righteous good deeds"),
      difficulty: 2,
      questions: [
        { q: "What did Allah send His Messenger with, in 48:28?", a: "Guidance and the religion of truth", wrong: ["Gold and silver", "Armies only", "Poems"], why: "He it is Who has sent His Messenger with guidance and the religion of truth." },
        { q: "What two parts does the Shari'ah have, per Ibn Kathir?", a: "Knowledge and deeds", wrong: ["Wealth and power", "Songs and games", "Land and sea"], why: "Indeed, the Islamic Shari'ah has two factors, knowledge and deeds." },
        { q: "Who is enough as a Witness, in 48:28?", a: "Allah", wrong: ["The people", "The kings", "The scholars"], why: "And All-Sufficient is Allah as a Witness." }
      ]
    },
    {
      slug: "merciful-among-themselves",
      title: "Merciful to each other",
      line: "His Companions were firm against disbelief, kind to each other.",
      facts: ["Muhammad is the Messenger of Allah", "Believers are like one body"],
      quote: q48(29),
      source: hadith("bukhari", "6011", "An-Nu'man ibn Bashir", "Sahih", "The Prophet ﷺ said believers in their mercy, love and kindness are like one body: when one part is unwell, the whole body shares the fever.", "resembling one body"),
      difficulty: 2,
      questions: [
        { q: "How are believers among themselves, in 48:29?", a: "Merciful", wrong: ["Harsh", "Silent", "Jealous"], why: "And those who are with him are severe against disbelievers, and merciful among themselves." },
        { q: "What are believers like, per Bukhari 6011?", a: "One body", wrong: ["Strangers", "A crowd", "Rivals"], why: "Resembling one body, so that, if any part of the body is not well then the whole body shares the sleeplessness and fever with it." },
        { tf: true, q: "When one believer hurts, the others should feel it too.", why: "If any part of the body is not well then the whole body shares the sleeplessness and fever with it." }
      ]
    },
    {
      slug: "like-a-building",
      title: "Like one building",
      line: "Believers hold each other up like bricks in a wall.",
      facts: ["He ﷺ laced his fingers together", "Strength in unity"],
      quote: q48(29),
      source: hadith("bukhari", "481", "Abu Musa al-Ash'ari", "Sahih", "The Prophet ﷺ said a believer to a believer is like the bricks of a wall, each holding up the other, and he laced his fingers.", "is like the bricks of a wall, enforcing each other"),
      difficulty: 1,
      questions: [
        { q: "What are believers like, per Bukhari 481?", a: "Bricks of a wall", wrong: ["Leaves in wind", "Grains of sand", "Stars apart"], why: "A faithful believer to a faithful believer is like the bricks of a wall, enforcing each other." },
        { q: "What did he ﷺ do while saying it?", a: "Laced his fingers together", wrong: ["Pointed up", "Clapped", "Sat down"], why: "The Prophet ﷺ clasped his hands, by interlacing his fingers." },
        { tf: true, q: "Believers should support one another.", why: "Like the bricks of a wall, enforcing each other." }
      ]
    },
    {
      slug: "bowing-and-prostrating",
      title: "Bowing and prostrating",
      line: "You see them bowing and prostrating, seeking Allah's pleasure.",
      facts: ["Prayer is the best deed", "His pleasure is the greatest gift"],
      quote: q48(29),
      source: ik(29, "Ibn Kathir says the believers are active in good deeds and prayer, sincere to Allah and hoping for His reward alone.", "Allah describes the believers as active in performing righteous deeds and in praying"),
      difficulty: 1,
      questions: [
        { q: "What do you see them doing, in 48:29?", a: "Bowing and prostrating", wrong: ["Sleeping", "Trading", "Arguing"], why: "You see them bowing and falling down prostrate." },
        { q: "What are they seeking, in 48:29?", a: "Reward and acceptance from Allah", wrong: ["Fame", "Money", "Power"], why: "Seeking reward from Allah and acceptance." },
        { q: "Which ayah says Allah's pleasure is the greatest bliss?", a: "9:72", wrong: ["2:255", "1:2", "112:1"], why: "But the greatest bliss is the acceptance by Allah (9:72)." }
      ]
    },
    {
      slug: "the-mark-of-prostration",
      title: "The mark on their faces",
      line: "Their faces show the light of prostration and humble hearts.",
      facts: ["Good deeds brighten the face", "Mujahid: humbleness"],
      quote: q48(29),
      source: ik(29, "Ibn Kathir says the mark is a graceful look, and Mujahid said it means humbleness and reverence.", "It means, humbleness and reverence"),
      difficulty: 2,
      questions: [
        { q: "What is the mark on their faces, per Mujahid?", a: "Humbleness and reverence", wrong: ["A scar", "Paint", "Dust only"], why: "Mujahid and several others explained: It means, humbleness and reverence." },
        { q: "What does a good deed bring to the face, per Ibn Kathir?", a: "Brightness", wrong: ["Sadness", "Wrinkles", "Nothing"], why: "The righteous good deed brings light to the heart, brightness to the face." },
        { tf: true, q: "Good deeds bring love in people's hearts, per Ibn Kathir.", why: "Ampleness in provisions, and love in people's hearts." }
      ]
    },
    {
      slug: "the-seed-that-grows",
      title: "A seed that grows strong",
      line: "In the Injil they are a shoot that grows strong and tall.",
      facts: ["Also described in the Tawrah", "They supported the Messenger ﷺ"],
      quote: q48(29),
      source: ik(29, "Ibn Kathir says the Companions gave the Messenger ﷺ support and victory, just as a shoot makes a plant strong.", "just as the shoot hardens the plant"),
      difficulty: 2,
      questions: [
        { q: "What are they like in the Injil, in 48:29?", a: "A seed that grows strong", wrong: ["A falling star", "A river", "A mountain"], why: "Their description in the Injil is like a seed which sends forth its shoot, then makes it strong." },
        { q: "Whom does the plant delight, in 48:29?", a: "The sowers", wrong: ["The birds", "The kings", "Nobody"], why: "And it stands straight on its stem, delighting the sowers." },
        { tf: true, q: "48:29 says they are also described in the Tawrah.", why: "This is their description in the Tawrah." }
      ]
    },
    {
      slug: "honor-the-companions",
      title: "Honor the Companions",
      line: "Do not insult the Companions; their charity outweighs ours.",
      facts: ["Allah is pleased with them", "Gold like Uhud cannot match them"],
      quote: q48(29),
      source: hadith("bukhari", "3673", "Abu Sa'id al-Khudri", "Sahih", "The Prophet ﷺ said: Do not abuse my Companions; if one of you spent gold like Uhud, it would not equal a handful spent by one of them.", "Do not abuse my companions"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ forbid, per Bukhari 3673?", a: "Abusing his Companions", wrong: ["Giving charity", "Climbing Uhud", "Buying gold"], why: "Do not abuse my companions." },
        { q: "What would gold like Uhud not equal, per Bukhari 3673?", a: "A small Mudd they spent", wrong: ["A house", "A camel", "A sword"], why: "It would not be equal to a Mud or even a half Mud spent by one of them." },
        { tf: true, q: "Ibn Kathir says Allah praised the Companions and is pleased with them.", why: "It is sufficient that Allah the Exalted has praised them and declared that He is pleased with them." }
      ]
    },
    {
      slug: "forgiveness-and-a-mighty-reward",
      title: "Forgiveness and reward",
      line: "Believers who do good get forgiveness and a mighty reward.",
      facts: ["Allah's promise is true", "Follow the Companions' guidance"],
      quote: q48(29),
      source: ik(29, "Ibn Kathir says all who follow the guidance of the Companions will be like them, though the Companions stay ahead in virtue.", "Surely, all those who follow the guidance of the Companions"),
      difficulty: 2,
      questions: [
        { q: "What does 48:29 promise believers who do good?", a: "Forgiveness and a mighty reward", wrong: ["Only praise", "Long life", "Wealth"], why: "Allah has promised those among them who believe and do righteous good deeds, forgiveness and a mighty reward." },
        { q: "Who will be like the Companions, per Ibn Kathir?", a: "Those who follow their guidance", wrong: ["Anyone rich", "Anyone famous", "Nobody"], why: "Surely, all those who follow the guidance of the Companions will be similar to them." },
        { tf: false, q: "Someone today can reach the Companions' level, per Ibn Kathir.", why: "None among this Ummah will be able to attain their level." }
      ]
    }
  ]
};

export const FATH_UNITS: readonly DeepUnit[] = [FATH_ONE, FATH_TWO, FATH_THREE];
