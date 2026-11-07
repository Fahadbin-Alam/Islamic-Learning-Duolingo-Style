import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah At-Tawbah ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a
// lesson, explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one
// explains the ayah. Each source opens at the highlighted words that say the lesson's point. The lessons teach the
// surah's faith, trust, keeping promises and repentance, and leave the battle orders out.

/** Tafsir Ibn Kathir on At-Tawbah 9:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_9_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on At-Tawbah 9:${ayah}`,
    url: `https://quran.com/9:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 9:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q9 = (ayah: number) => quranQuote(9, ayah);

/** Ayahs 1 to 22: the last surah, no Bismillah, the day of sacrifice, keeping treaties, safe passage, the masjids. */
const TAWBAH_ONE: DeepUnit = {
  key: "tawbah1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-9",
  name: "At-Tawbah, ayahs 1 to 22",
  kind: "skill",
  lessonType: "surah",
  surahName: "At-Tawbah",
  lessons: [
    {
      slug: "among-the-last-surahs",
      title: "One of the last surahs",
      line: "At-Tawbah was among the last surahs to come down.",
      facts: ["Also called Bara'ah", "129 ayahs, Madani"],
      quote: q9(1),
      source: hadith("bukhari", "4654", "Al-Bara ibn Azib", "Sahih", "Al-Bara said the last ayah revealed was the one about al-kalalah (4:176), and the last surah revealed was Bara'ah, which is At-Tawbah.", "the last Sura which was revealed was Baraatun"),
      difficulty: 2,
      questions: [
        { q: "Per Al-Bara, which surah came down last?", a: "Bara'ah (At-Tawbah)", wrong: ["Al-Fatihah", "Al-Baqarah", "Al-Ikhlas"], why: "The last Sura which was revealed was Bara'ah." },
        { q: "At-Tawbah is also called Bara'ah.", tf: true, why: "Bara'ah is its first word: freedom from obligations." },
        { q: "What does the first word, bara'ah, mean?", a: "Freedom from obligations", wrong: ["A new treaty", "A great reward", "A long journey"], why: "Bara'atun minallahi wa rasulih: freedom from obligations." }
      ]
    },
    {
      slug: "no-bismillah",
      title: "The surah with no Bismillah",
      line: "At-Tawbah is the one surah that does not open with Bismillah.",
      facts: ["The Companions did not write it", "The mushaf follows them"],
      quote: q9(1),
      source: ik(1, "Ibn Kathir says the Basmalah is not at the start of this surah because the Companions did not write it there in the mushaf they collected.", "The Basmalah was not mentioned in the beginning of this Surah because the Companions did not write it"),
      difficulty: 2,
      questions: [
        { q: "Which surah does not open with Bismillah?", a: "At-Tawbah", wrong: ["Al-Anfal", "Yasin", "Al-Mulk"], why: "The Basmalah was not mentioned in the beginning of this Surah." },
        { q: "Why is there no Bismillah at its start, per Ibn Kathir?", a: "The Companions did not write it", wrong: ["It was lost", "The page was torn", "The surah is too short"], why: "The Companions did not write it in the mushaf they collected." },
        { q: "At-Tawbah is a very short surah.", tf: false, why: "It has 129 ayahs, one of the longer surahs." }
      ]
    },
    {
      slug: "four-months",
      title: "Four months to travel freely",
      line: "Those with open-ended treaties were given four months of safety.",
      facts: ["Travel freely for four months", "No one escapes Allah"],
      quote: q9(2),
      source: ik(4, "Those whose treaty had no set end were given four months to travel the land safely and find a place of safety. Treaties with a set end lasted until that end.", "They would have four months to travel the lands"),
      difficulty: 2,
      questions: [
        { q: "How long were they told to travel freely, in 9:2?", a: "Four months", wrong: ["Four days", "Four years", "Forty days"], why: "Fasihu fil-ardi arba'ata ashhur." },
        { q: "What does 9:2 say no one can do?", a: "Escape Allah", wrong: ["Count the months", "Leave the land", "Find water"], why: "Know that you cannot escape Allah." },
        { q: "A treaty with a set end date still lasted until that date.", tf: true, why: "The longest it would extend was to its agreed termination date." }
      ]
    },
    {
      slug: "greatest-day-of-hajj",
      title: "The greatest day of Hajj",
      line: "The greatest day of Hajj is the day of sacrifice.",
      facts: ["The 10th of Dhul-Hijjah", "The biggest gathering"],
      quote: q9(3),
      source: ik(3, "The declaration was made on the greatest day of Hajj, the day of sacrifice, the best and most visible day of the Hajj rites, when the largest crowd gathers. Even then, the door to repent stayed open.", "the day of Sacrifice, the best and most apparent day of the Hajj rituals"),
      difficulty: 2,
      questions: [
        { q: "What is the greatest day of Hajj, per Ibn Kathir?", a: "The day of sacrifice", wrong: ["The first of Ramadan", "The day of Ashura", "The Friday after Hajj"], why: "The day of Sacrifice, the best and most apparent day of the Hajj rituals." },
        { q: "Why is it called the greatest day?", a: "Most rites and the biggest crowd", wrong: ["It is the coldest day", "It is the first day", "Nobody travels that day"], why: "During which the largest gathering confers." },
        { q: "Even in 9:3, the door to repent was still open.", tf: true, why: "So if you repent, it is better for you." }
      ]
    },
    {
      slug: "announcement-at-mina",
      title: "The announcement at Mina",
      line: "At Mina it was announced: no more tawaf without clothes.",
      facts: ["On the day of sacrifice", "Bara'ah recited aloud"],
      quote: q9(3),
      source: hadith("bukhari", "4655", "Abu Hurayrah", "Sahih", "Abu Hurayrah was sent with announcers on the day of sacrifice at Mina to announce that no idol worshipper would do Hajj after that year and no one would circle the Ka'bah naked. Bara'ah was recited aloud to the people.", "none shall perform the Tawaf around the Ka`ba in a naked state"),
      difficulty: 3,
      questions: [
        { q: "What was banned from that year on, per Abu Hurayrah?", a: "Tawaf without clothes", wrong: ["Tawaf at night", "Drinking Zamzam", "Shaving the head"], why: "None shall perform the Tawaf around the Ka'ba in a naked state." },
        { q: "Where was the announcement made?", a: "Mina", wrong: ["Ta'if", "Badr", "Tabuk"], why: "To announce at Mina on the Day of Nahr." },
        { q: "Bara'ah was recited aloud to the people at Mina.", tf: true, why: "He recited Bara'a loudly before the people at Mina." }
      ]
    },
    {
      slug: "keep-your-treaties",
      title: "Keep your treaties to the end",
      line: "A treaty the other side keeps must be honored until its end.",
      facts: ["They did not break it", "Allah loves the God-fearing"],
      quote: q9(4),
      source: ik(4, "Those who kept their treaty and helped no one against the Muslims had it honored to its end. Allah encouraged keeping such peace treaties, and He loves those with taqwa, who keep their promises.", "Allah encouraged honoring such peace treaties"),
      difficulty: 3,
      questions: [
        { q: "How long must a kept treaty be honored, in 9:4?", a: "Until its term ends", wrong: ["Four days", "Until the next Hajj", "Only in Ramadan"], why: "So fulfill their treaty for them until the end of their term." },
        { q: "Whom does Allah love, at the end of 9:4?", a: "Those who have taqwa", wrong: ["Those who win", "The richest", "The strongest"], why: "Surely, Allah loves those who have Taqwa." },
        { q: "Ibn Kathir says those with taqwa keep their promises.", tf: true, why: "Allah loves those who have Taqwa, who keep their promises." }
      ]
    },
    {
      slug: "safety-to-hear-the-quran",
      title: "Safety to hear the Quran",
      line: "Give safety to anyone who asks, so he may hear Allah's Word.",
      facts: ["Then take him somewhere safe", "So the call spreads"],
      quote: q9(6),
      source: ik(6, "If an idol worshipper asks for protection, give it so he can hear the Quran, then escort him back to his place of safety. This was made law so that people learn the religion and Allah's call spreads.", "so that they may learn about the religion of Allah"),
      difficulty: 3,
      questions: [
        { q: "What must a person asking for protection get to hear?", a: "The Word of Allah", wrong: ["A poem", "A war song", "A list of prices"], why: "Grant him protection so that he may hear the Word of Allah." },
        { q: "After he hears it, where is he taken?", a: "To a place where he is safe", wrong: ["To prison", "To the desert", "To the market"], why: "Then escort him to where he can be secure." },
        { q: "The aim of the safe passage is that people learn about Islam.", tf: true, why: "So that they may learn about the religion of Allah." }
      ]
    },
    {
      slug: "true-while-they-are-true",
      title: "True as long as they are true",
      line: "As long as they stay true to you, stay true to them.",
      facts: ["The Treaty of Hudaybiyyah", "Peace for ten years"],
      quote: q9(7),
      source: ik(7, "The covenant near Al-Masjid Al-Haram was the treaty of Hudaybiyyah. As long as they kept its terms, including peace for ten years, the Muslims were to keep it too.", "including peace between you and them for ten years"),
      difficulty: 3,
      questions: [
        { q: "Which treaty does 9:7 mean, per Ibn Kathir?", a: "Hudaybiyyah", wrong: ["Aqabah", "Tabuk", "Hunayn"], why: "Those with whom you made a covenant on the day of Hudaybiyyah." },
        { q: "How long was the peace agreed for?", a: "Ten years", wrong: ["Ten days", "Ten months", "A hundred years"], why: "Including peace between you and them for ten years." },
        { q: "The Muslims could break it even while the other side kept it.", tf: false, why: "So long as they are true to you, stand you true to them." }
      ]
    },
    {
      slug: "brothers-in-religion",
      title: "Brothers in religion",
      line: "Whoever repents, prays and gives zakah is your brother in faith.",
      facts: ["Repentance wipes the past", "Faith makes brothers"],
      quote: q9(11),
      source: ik(11, "If they repent, pray and give zakah, they are your brothers in religion. Allah explains His ayat for people who know.", "But if they repent, perform the Salah"),
      difficulty: 4,
      questions: [
        { q: "Which three things make someone your brother, in 9:11?", a: "Repent, pray, give zakah", wrong: ["Travel, trade, marry", "Fast, sleep, eat", "Speak, write, read"], why: "If they repent, perform the Salah and give the Zakah, they are your brethren." },
        { q: "In 9:11, past enmity ends when someone repents.", tf: true, why: "Then they are your brethren in religion." },
        { q: "For whom does Allah explain the ayat in detail, in 9:11?", a: "A people who know", wrong: ["A people who sleep", "Only the rich", "Only the kings"], why: "We explain the Ayat in detail for a people who know." }
      ]
    },
    {
      slug: "not-left-untested",
      title: "Will you be left untested?",
      line: "Allah tests the believers to show who is truly sincere.",
      facts: ["Walijah: close insiders", "Sincere inside and out"],
      quote: q9(16),
      source: ik(16, "Allah does not leave the believers untested. Tests make clear who has a pure intention and who does not. The sincere take no close confidants besides Allah, His Messenger and the believers.", "We will leave you untested"),
      difficulty: 4,
      questions: [
        { q: "Why does Allah test the believers, per Ibn Kathir?", a: "To show who is sincere", wrong: ["To make them rich", "To tire them out", "To make them famous"], why: "To make apparent those who have pure intent from those who have false intent." },
        { q: "What does walijah mean in 9:16?", a: "Close supporters and confidants", wrong: ["Prayer rugs", "Swords", "Tents"], why: "Walijah: supporters and confidants." },
        { q: "Surah Al-Ankabut 29:2 makes the same point about tests.", tf: true, why: "Do people think they will be left alone because they say: We believe?" }
      ]
    },
    {
      slug: "houses-of-allah",
      title: "Who truly keeps the masjids",
      line: "Believers who pray and give zakah keep the masjids alive.",
      facts: ["Masjids: Allah's houses", "They fear none but Allah"],
      quote: q9(18),
      source: ik(18, "The masjids are kept by those who believe in Allah and the Last Day, pray, give zakah and fear only Allah. The Companions said the masjids are the houses of Allah on earth.", "The Masjids are the Houses of Allah on the earth"),
      difficulty: 4,
      questions: [
        { q: "Who maintains the masjids of Allah, in 9:18?", a: "Those who believe and pray", wrong: ["Anyone with money", "Only the kings", "The poets"], why: "Only by those who believe in Allah and the Last Day; perform the Salah." },
        { q: "What did the Companions call the masjids?", a: "The houses of Allah on earth", wrong: ["The markets of the town", "The homes of kings", "The halls of poets"], why: "The Masjids are the Houses of Allah on the earth." },
        { q: "Per 9:18, the true maintainers fear none but Allah.", tf: true, why: "And fear none but Allah. It is they who are on true guidance." }
      ]
    },
    {
      slug: "build-a-masjid",
      title: "Build a masjid, get a home",
      line: "Whoever builds a masjid, Allah builds him a place in Paradise.",
      facts: ["Built for Allah's pleasure", "Said while rebuilding a masjid"],
      quote: q9(18),
      source: hadith("bukhari", "450", "Uthman ibn Affan", "Sahih", "When people talked about his plan to rebuild the Prophet's ﷺ masjid, Uthman said he heard the Prophet ﷺ say: whoever builds a masjid, Allah builds for him a similar place in Paradise.", "Allah would build for him a similar place in Paradise"),
      difficulty: 4,
      questions: [
        { q: "What does Allah build for one who builds a masjid?", a: "A place in Paradise", wrong: ["A palace on earth", "A big shop", "A garden in town"], why: "Allah would build for him a similar place in Paradise." },
        { q: "What was being rebuilt when the hadith was told?", a: "The Prophet's ﷺ masjid", wrong: ["The Ka'bah", "A market", "A well"], why: "His intention to reconstruct the mosque of Allah's Messenger ﷺ." },
        { q: "The masjid should be built for Allah's pleasure.", tf: true, why: "Intending Allah's Pleasure." }
      ]
    },
    {
      slug: "water-for-pilgrims",
      title: "Water for pilgrims is not enough",
      line: "Serving pilgrims does not equal faith and striving for Allah.",
      facts: ["Three men argued by the minbar", "Then 9:19 came down"],
      quote: q9(19),
      source: hadith("muslim", "1879", "An-Nu'man ibn Bashir", "Sahih", "By the minbar, one man said giving pilgrims water was enough for him, another said keeping the Sacred Masjid, and a third said striving in Allah's way was better. Then 9:19 was revealed.", "Jihad in the way of Allah is better than what you have said"),
      difficulty: 5,
      questions: [
        { q: "What does 9:19 say is not equal to faith?", a: "Giving pilgrims water", wrong: ["Praying at night", "Fasting Ramadan", "Reading the Quran"], why: "Do you consider the providing of drinking water to the pilgrims as equal?" },
        { q: "Where did the men argue, per An-Nu'man?", a: "Near the minbar", wrong: ["In the market", "At Badr", "In a cave"], why: "As I was sitting near the pulpit of the Messenger of Allah ﷺ." },
        { q: "One man said serving pilgrims water was all he cared about.", tf: true, why: "I do not care if I do no good deed except giving pilgrims water." }
      ]
    },
    {
      slug: "faith-comes-first",
      title: "Good deeds need faith",
      line: "Serving the Ka'bah did not help those who worshipped idols.",
      facts: ["Shirk ruins good deeds", "Faith comes first"],
      quote: q9(19),
      source: ik(19, "The idol worshippers boasted of keeping the Sacred Masjid and giving pilgrims water. These deeds will not benefit them with Allah because they worship others with Him.", "will not benefit them with Allah because they associate others with Him"),
      difficulty: 5,
      questions: [
        { q: "Why did serving the House not help the idol worshippers?", a: "They worshipped others with Allah", wrong: ["They served too little", "They were too poor", "They served at night"], why: "Because they associate others with Him." },
        { q: "Good deeds done with shirk are accepted, per Ibn Kathir.", tf: false, why: "I do not accept the good deeds that are performed while in a state of Shirk." },
        { q: "What did they boast about, per Ibn Kathir?", a: "Keeping the Sacred Masjid", wrong: ["Their swords", "Their poetry", "Their horses"], why: "They used to boast that they were the maintainers of Al-Masjid Al-Haram." }
      ]
    },
    {
      slug: "mercy-pleasure-gardens",
      title: "Mercy, pleasure and gardens",
      line: "Their Lord gives them glad news of mercy, pleasure and Gardens.",
      facts: ["Far higher in rank", "They stay there forever"],
      quote: q9(21),
      source: ik(21, "Those who believed, emigrated and strove with their wealth and lives are far higher in rank with Allah. Their Lord gives them glad news of mercy, His pleasure and everlasting Gardens.", "are far higher in degree with Allah"),
      difficulty: 5,
      questions: [
        { q: "What three glad tidings does 9:21 give?", a: "Mercy, pleasure, Gardens", wrong: ["Gold, horses, land", "Fame, power, praise", "Sleep, food, rest"], why: "Glad tidings of mercy from Him, His being pleased, and Gardens." },
        { q: "How long do they stay in the Gardens, in 9:22?", a: "Forever", wrong: ["A thousand years", "Until the Judgment", "One lifetime"], why: "They will dwell therein forever." },
        { q: "Those who believed, emigrated and strove are higher in rank.", tf: true, why: "Are far higher in degree with Allah. They are the successful." }
      ]
    }
  ]
};

/** Ayahs 23 to 40: loving Allah most, Hunayn, calm from Allah, His light, the sacred months, Tabuk and the cave. */
const TAWBAH_TWO: DeepUnit = {
  key: "tawbah2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-9",
  name: "At-Tawbah, ayahs 23 to 40",
  kind: "skill",
  lessonType: "surah",
  surahName: "At-Tawbah",
  lessons: [
    {
      slug: "nothing-dearer-than-allah",
      title: "Nothing dearer than Allah",
      line: "Family, wealth and homes must not be dearer than Allah.",
      facts: ["Eight things are listed", "Then wait for His decision"],
      quote: q9(24),
      source: ik(24, "Allah told His Messenger to warn those who love family, wealth, trade and homes more than Allah, His Messenger and striving in His cause: wait until Allah brings His decision.", "are dearer to you than Allah and His Messenger"),
      difficulty: 2,
      questions: [
        { q: "Which is NOT listed in 9:24?", a: "Knowledge", wrong: ["Wealth", "Trade", "Homes"], why: "Fathers, sons, brothers, spouses, kindred, wealth, commerce and dwellings." },
        { q: "What is said to those who love these more?", a: "Wait for Allah's decision", wrong: ["Go and rest", "Count your money", "Build more homes"], why: "Then wait until Allah brings about His decision." },
        { q: "9:24 mentions trade you fear will decline.", tf: true, why: "The commerce in which you fear a decline." }
      ]
    },
    {
      slug: "dearer-than-yourself",
      title: "Dearer than your own self",
      line: "Faith is complete when the Prophet ﷺ is dearer than yourself.",
      facts: ["Dearer than your family", "And dearer than yourself"],
      quote: q9(24),
      source: hadith("bukhari", "6632", "Abdullah ibn Hisham", "Sahih", "Umar said the Prophet ﷺ was dearer to him than everything except himself. The Prophet ﷺ said: not until I am dearer to you than yourself. Umar said: now you are. He said: now, O Umar.", "till I am dearer to you than your own self"),
      difficulty: 2,
      questions: [
        { q: "When is faith complete, per Abdullah ibn Hisham?", a: "When he ﷺ is dearer than oneself", wrong: ["When you are rich", "When you are old", "When you travel"], why: "Till I am dearer to you than your own self." },
        { q: "Umar first said: dearer than everything except myself.", tf: true, why: "You are dearer to me than everything except my own self." },
        { q: "After Umar changed his answer, the Prophet ﷺ said nothing.", tf: false, why: "He said: Now, O Umar." }
      ]
    },
    {
      slug: "numbers-at-hunayn",
      title: "Numbers did not win Hunayn",
      line: "At Hunayn, pride in big numbers did not help them.",
      facts: ["Shawwal, 8 AH", "Victory is from Allah"],
      quote: q9(25),
      source: ik(25, "Victory comes from Allah, by His help and decree, not from numbers or supplies. At Hunayn the Muslims were proud of their large numbers, and it did not help them at first.", "not because of their numbers or adequate supplies"),
      difficulty: 2,
      questions: [
        { q: "What were the Muslims proud of at Hunayn?", a: "Their large numbers", wrong: ["Their horses", "Their poems", "Their wealth"], why: "When you rejoiced at your great number." },
        { q: "When was Hunayn, per Ibn Kathir?", a: "After the opening of Makkah", wrong: ["Before Badr", "Before the Hijrah", "After Tabuk"], why: "It occurred after the victory of Makkah, in Shawwal of the eighth year." },
        { q: "Victory comes from Allah, not from numbers.", tf: true, why: "Not because of their numbers or adequate supplies." }
      ]
    },
    {
      slug: "white-mule",
      title: "The one who stood firm",
      line: "When many ran, the Prophet ﷺ stood firm on his white mule.",
      facts: ["He did not flee", "He called out who he was"],
      quote: q9(25),
      source: hadith("bukhari", "2864", "Al-Bara ibn Azib", "Sahih", "Al-Bara was asked if they fled at Hunayn. He said the Messenger of Allah ﷺ did not flee; he was on his white mule saying: I am the Prophet in truth, I am the son of Abdul-Muttalib.", "I saw him on his white mule"),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ ride at Hunayn, per Al-Bara?", a: "A white mule", wrong: ["A black horse", "A camel", "Nothing, he walked"], why: "I saw him on his white mule." },
        { q: "What did he ﷺ call out at Hunayn?", a: "I am the son of Abdul-Muttalib", wrong: ["I am going home", "I am tired", "Leave me alone"], why: "I am the son of Abdul Muttalib." },
        { q: "Al-Bara said the Messenger ﷺ did not flee.", tf: true, why: "Allah's Messenger ﷺ did not flee." }
      ]
    },
    {
      slug: "calm-from-allah",
      title: "Calm sent down from Allah",
      line: "Allah sent down calm on His Messenger and the believers.",
      facts: ["Sakinah: tranquillity", "Unseen forces: angels"],
      quote: q9(26),
      source: ik(26, "Allah sent down tranquillity and reassurance to His Messenger and the believers who stayed with him, and sent forces they did not see: the angels.", "He sent down tranquillity and reassurance to His Messenger"),
      difficulty: 3,
      questions: [
        { q: "What is the sakinah, per Ibn Kathir?", a: "Tranquillity and reassurance", wrong: ["A new sword", "A fast horse", "A strong wind"], why: "He sent down tranquillity and reassurance to His Messenger." },
        { q: "What were the forces the believers did not see?", a: "Angels", wrong: ["Birds", "Wind", "Horses"], why: "And sent down forces which you saw not: this refers to angels." },
        { q: "The sakinah came only to those who ran away.", tf: false, why: "And on the believers, who remained with him." }
      ]
    },
    {
      slug: "door-of-repentance",
      title: "The door of repentance stays open",
      line: "After Hunayn, many of the enemy became Muslim and were forgiven.",
      facts: ["At al-Ji'ranah", "Allah is Most Merciful"],
      quote: q9(27),
      source: ik(27, "After the battle Allah forgave the rest of Hawazin when they became Muslim and came to the Prophet ﷺ at al-Ji'ranah. Allah accepts the repentance of whom He wills.", "Allah forgave the rest of Huwazin when they embraced Islam"),
      difficulty: 3,
      questions: [
        { q: "What happened to many of Hawazin after Hunayn?", a: "They became Muslim", wrong: ["They moved away", "They hid in caves", "They built a fort"], why: "Allah forgave the rest of Huwazin when they embraced Islam." },
        { q: "9:27 says Allah accepts the repentance of whom He wills.", tf: true, why: "Allah will accept the repentance of whom He wills." },
        { q: "Which two names of Allah end 9:27?", a: "Oft-Forgiving, Most Merciful", wrong: ["All-Hearing, All-Seeing", "Mighty, Wise", "Rich, Praised"], why: "And Allah is Oft-Forgiving, Most Merciful." }
      ]
    },
    {
      slug: "afraid-of-poverty",
      title: "Afraid of losing trade?",
      line: "Fear of poverty must not stop obeying Allah; He provides.",
      facts: ["Allah will enrich you", "From His bounty"],
      quote: q9(28),
      source: ik(28, "When the idol worshippers were kept from the Sacred Masjid, people feared their markets would close and trade would stop. Allah promised to enrich them from His bounty.", "Our markets will be closed, our commerce disrupted"),
      difficulty: 3,
      questions: [
        { q: "What did people fear when the ban came, per Ibn Ishaq?", a: "Losing their trade", wrong: ["Losing their horses", "Losing their poems", "Getting lost"], why: "Our markets will be closed, our commerce disrupted." },
        { q: "What did Allah promise in 9:28?", a: "To enrich them from His bounty", wrong: ["A new market", "A mountain of gold", "A big army"], why: "If you fear poverty, Allah will enrich you, out of His bounty." },
        { q: "9:28 ends with: Allah is All-Knowing, All-Wise.", tf: true, why: "Surely, Allah is All-Knowing, All-Wise." }
      ]
    },
    {
      slug: "only-allah-makes-halal",
      title: "Only Allah makes things halal",
      line: "Only Allah decides what is allowed and what is forbidden.",
      facts: ["Obeying others in that is worship", "Adi ibn Hatim asked"],
      quote: q9(31),
      source: ik(31, "They took their rabbis and monks as lords by obeying them in whatever they allowed or forbade. What Allah forbids is forbidden and what He allows is allowed.", "whatever He renders prohibited is the prohibited, whatever He allowed is the allowed"),
      difficulty: 4,
      questions: [
        { q: "How did they take their rabbis as lords, per the tafsir?", a: "Obeying them in halal and haram", wrong: ["Bowing to statues", "Paying them gold", "Fasting for them"], why: "They obeyed their monks and rabbis in whatever they allowed or prohibited." },
        { q: "Who decides what is halal and haram?", a: "Allah", wrong: ["Any scholar", "The majority", "The king"], why: "Whatever He renders prohibited is the prohibited, whatever He allowed is the allowed." },
        { q: "Adi ibn Hatim became Muslim, per Ibn Kathir.", tf: true, why: "He embraced Islam and pronounced the Testimony of Truth." }
      ]
    },
    {
      slug: "blowing-at-the-sun",
      title: "Blowing at the sun",
      line: "Trying to put out Allah's light is like blowing at the sun.",
      facts: ["His light will be perfected", "Even if disbelievers hate it"],
      quote: q9(32),
      source: ik(32, "Those who try to put out the guidance with lies are like someone who tries to put out the sun or the moon by blowing at it. They will never manage it.", "extinguish the light of the sun or the moon by blowing at them"),
      difficulty: 4,
      questions: [
        { q: "What is trying to put out Allah's light like, per Ibn Kathir?", a: "Blowing at the sun", wrong: ["Climbing a hill", "Digging a well", "Lighting a lamp"], why: "Extinguish the light of the sun or the moon by blowing at them." },
        { q: "What does Allah allow, in 9:32?", a: "Only that His light is perfected", wrong: ["That His light is hidden", "That His light fades", "That His light is shared"], why: "Allah will not allow except that His Light should be perfected." },
        { q: "Kafir comes from a word meaning to cover.", tf: true, why: "A Kafir is the person who covers something." }
      ]
    },
    {
      slug: "guidance-and-truth",
      title: "Guidance and the true religion",
      line: "Allah sent His Messenger with guidance and the true religion.",
      facts: ["Guidance: true knowledge", "Truth: righteous deeds"],
      quote: q9(33),
      source: ik(33, "Guidance means the true news and beneficial faith he brought. The religion of truth means the righteous, lawful deeds that bring benefit in this life and the Hereafter.", "refers to the righteous, legal deeds that bring about benefit in this life and the Hereafter"),
      difficulty: 4,
      questions: [
        { q: "What does the religion of truth mean, per Ibn Kathir?", a: "Righteous deeds that benefit", wrong: ["A new language", "A big army", "A lot of money"], why: "Righteous, legal deeds that bring benefit in this life and the Hereafter." },
        { q: "What does guidance mean in 9:33, per Ibn Kathir?", a: "True news and beneficial faith", wrong: ["Maps of the land", "Old poems", "Rules of trade"], why: "Guidance refers to the true narrations, beneficial faith and true religion." },
        { q: "9:33 says Islam will be made superior over all religions.", tf: true, why: "To make it superior over all religions." }
      ]
    },
    {
      slug: "hoarding-without-zakah",
      title: "Hoarding without zakah",
      line: "Wealth whose zakah is paid is not forbidden hoarding.",
      facts: ["Zakah purifies wealth", "Explained by Ibn Umar"],
      quote: q9(34),
      source: hadith("bukhari", "1404", "Khalid ibn Aslam", "Sahih", "A man asked Ibn Umar about 9:34. He said: woe to whoever hoards and does not pay zakah; it came before the zakah ayahs, and then Allah made zakah a purifier of wealth.", "Allah made Zakat a purifier of the property"),
      difficulty: 4,
      questions: [
        { q: "Who is warned in 9:34, per Ibn Umar?", a: "Those who do not pay zakah", wrong: ["Anyone who saves", "Anyone with a house", "Anyone who trades"], why: "Whoever hoarded them and did not pay the Zakat thereof, then woe to him." },
        { q: "What did Allah make zakah, per Ibn Umar?", a: "A purifier of wealth", wrong: ["A tax for kings", "A gift to the rich", "A war fund"], why: "Allah made Zakat a purifier of the property." },
        { q: "Ibn Umar said 9:34 came before the zakah ayahs.", tf: true, why: "These Verses were revealed before the Verses of Zakat." }
      ]
    },
    {
      slug: "twelve-months",
      title: "Twelve months, four sacred",
      line: "A year has twelve months, and four of them are sacred.",
      facts: ["Dhul-Qa'dah, Dhul-Hijjah, Muharram", "And Rajab"],
      quote: q9(36),
      source: hadith("bukhari", "4662", "Abu Bakrah", "Sahih", "The Prophet ﷺ said the year is twelve months, four of them sacred: three in a row, Dhul-Qa'dah, Dhul-Hijjah and Muharram, and Rajab, between Jumada and Sha'ban.", "the year is twelve months, four of which are sacred"),
      difficulty: 5,
      questions: [
        { q: "How many sacred months are there?", a: "Four", wrong: ["Two", "Six", "Twelve"], why: "The year is twelve months, four of which are sacred." },
        { q: "Which sacred month falls between Jumada and Sha'ban?", a: "Rajab", wrong: ["Ramadan", "Safar", "Shawwal"], why: "Rajab, which stands between Jumad and Sha'ban." },
        { q: "Three of the sacred months come one after another.", tf: true, why: "Three of them are in succession." }
      ]
    },
    {
      slug: "do-not-wrong-yourselves",
      title: "Do not wrong yourselves",
      line: "Sin in the sacred months is heavier, and good deeds weigh more.",
      facts: ["Allah chose some times over others", "Ramadan, Fridays, Laylat al-Qadr"],
      quote: q9(36),
      source: ik(36, "Do not wrong yourselves in the sacred months, for sin in them is worse than in other months, and good deeds in them are rewarded more. Qatadah said Allah chose some times above others.", "sin in them is worse than sin in other months"),
      difficulty: 5,
      questions: [
        { q: "Why does 9:36 say not to wrong yourselves then?", a: "Sin in them is worse", wrong: ["They are short", "Nobody sees", "It is cold"], why: "Sin in them is worse than sin in other months." },
        { q: "Which night did Qatadah say Allah chose above all nights?", a: "Laylat al-Qadr", wrong: ["The night of Eid", "Any Friday night", "The first night of Rajab"], why: "And Laylatul-Qadr above all nights." },
        { q: "Rewards for good deeds are also multiplied in them.", tf: true, why: "Multiplying rewards of righteous deeds during them." }
      ]
    },
    {
      slug: "moving-the-months",
      title: "Moving the sacred months",
      line: "Shifting a sacred month to suit desires added to disbelief.",
      facts: ["Nasi': postponing", "Desire over Allah's law"],
      quote: q9(37),
      source: ik(37, "Before Islam they moved the sacred month of Muharram to Safar so they could fight, changing Allah's law by their desires. Allah called the postponing an addition to disbelief.", "delaying it to the month of Safar"),
      difficulty: 5,
      questions: [
        { q: "Which month did they swap Muharram with?", a: "Safar", wrong: ["Ramadan", "Rajab", "Shawwal"], why: "Delaying it to the month of Safar." },
        { q: "What does 9:37 call the postponing?", a: "An addition to disbelief", wrong: ["A good custom", "A small mistake", "A trade deal"], why: "The postponing is indeed an addition to disbelief." },
        { q: "Changing Allah's law to suit desires is praised in 9:37.", tf: false, why: "The evil of their deeds is made fair-seeming to them." }
      ]
    },
    {
      slug: "clinging-to-the-earth",
      title: "Clinging to the earth",
      line: "At Tabuk, some held back for shade and ripe fruit.",
      facts: ["Intense heat", "This life is little"],
      quote: q9(38),
      source: ik(38, "Allah blamed those who stayed behind from Tabuk, when fruit was ripe and shade was tempting in great heat. The enjoyment of this world is little next to the Hereafter.", "at a time when fruits were ripe and shades tempting"),
      difficulty: 5,
      questions: [
        { q: "Which journey does 9:38 mean, per Ibn Kathir?", a: "Tabuk", wrong: ["Badr", "Uhud", "The Hijrah"], why: "Those who lagged behind in the battle of Tabuk." },
        { q: "Why did some hold back, per Ibn Kathir?", a: "Shade and ripe fruit", wrong: ["Too much rain", "No camels", "A wedding"], why: "At a time when fruits were ripe and shades tempting." },
        { q: "The enjoyment of this world is little next to the Hereafter.", tf: true, why: "But little is the enjoyment of the life of this world." }
      ]
    },
    {
      slug: "finger-in-the-sea",
      title: "A finger dipped in the sea",
      line: "This world beside the Hereafter: water left on a dipped finger.",
      facts: ["See what sticks to it", "The sea is the Hereafter"],
      quote: q9(38),
      source: hadith("muslim", "2858", "Al-Mustawrid", "Sahih", "The Prophet ﷺ said: this world beside the Hereafter is like one of you dipping his finger in the sea and seeing what sticks to it.", "in the ocean and then he should see as to what has stuck to it"),
      difficulty: 5,
      questions: [
        { q: "What did the Prophet ﷺ compare this world to?", a: "Water on a finger from the sea", wrong: ["A full river", "A tall mountain", "A long road"], why: "Dip his finger in the ocean and see what has stuck to it." },
        { q: "Which finger was pointed to, per the narration in Muslim?", a: "The forefinger", wrong: ["The thumb", "The little finger", "The middle finger"], why: "Yahya pointed with his forefinger." },
        { q: "Next to the Hereafter, this world is very small.", tf: true, why: "This world is so insignificant in comparison to the Hereafter." }
      ]
    },
    {
      slug: "second-of-two",
      title: "The second of the two",
      line: "In the cave of Thawr, Allah kept His Messenger and friend safe.",
      facts: ["Three days in the cave", "Do not be sad"],
      quote: q9(40),
      source: ik(40, "In the year of the Hijrah the Prophet ﷺ and Abu Bakr hid in the cave of Thawr. They stayed three days until those chasing them went back.", "They remained in the cave for three days"),
      difficulty: 5,
      questions: [
        { q: "Which cave is meant in 9:40, per Ibn Kathir?", a: "Thawr", wrong: ["Hira", "Uhud", "Sinai"], why: "Escaped with his friend and Companion to the cave of Thawr." },
        { q: "How long did they stay in the cave?", a: "Three days", wrong: ["Three hours", "Three months", "Thirty days"], why: "They remained in the cave for three days." },
        { q: "In 9:40 the words are: do not be sad, Allah is with us.", tf: true, why: "Be not sad, surely, Allah is with us." }
      ]
    },
    {
      slug: "allah-the-third",
      title: "Two, with Allah as the third",
      line: "Allah is with those who trust Him, even in a hidden cave.",
      facts: ["If they looked down", "Allah was with them"],
      quote: q9(40),
      source: hadith("bukhari", "3653", "Abu Bakr", "Sahih", "In the cave Abu Bakr said: if one of them looked down, he would see us. The Prophet ﷺ said: what do you think of two, the third of whom is Allah?", "What do you think of two (persons) the third of whom is Allah"),
      difficulty: 5,
      questions: [
        { q: "What did the Prophet ﷺ say about the two in the cave?", a: "Allah is their third", wrong: ["Run at once", "Stay silent forever", "Hide deeper"], why: "What do you think of two, the third of whom is Allah?" },
        { q: "Abu Bakr feared they could be seen if the enemy looked down.", tf: true, why: "If any of them should look under his feet, he would see us." },
        { q: "What sums up the answer in the cave?", a: "Trust that Allah is with you", wrong: ["Trust your speed", "Trust your hiding place", "Trust your friends"], why: "Two, the third of whom is Allah." }
      ]
    },
    {
      slug: "word-of-allah-highest",
      title: "Allah's Word is the highest",
      line: "Allah's Word, La ilaha illallah, is always the highest.",
      facts: ["Shirk is made the lowest", "Strive for His Word"],
      quote: q9(40),
      source: ik(40, "Ibn Abbas said the word of the disbelievers is shirk and the Word of Allah is La ilaha illallah. Whoever strives so that Allah's Word is highest is in Allah's cause.", "La ilaha illallah"),
      difficulty: 5,
      questions: [
        { q: "What is the Word of Allah in 9:40, per Ibn Abbas?", a: "La ilaha illallah", wrong: ["A poem", "A battle cry", "A treaty"], why: "The Word of Allah is La ilaha illallah." },
        { q: "What is the lowermost word, per Ibn Abbas?", a: "Shirk", wrong: ["Poetry", "Trade", "Sleep"], why: "The word of those who disbelieved is Shirk." },
        { q: "Fighting to show off is still in Allah's cause.", tf: false, why: "He who fights so that Allah's Word is superior, he fights in Allah's cause." }
      ]
    }
  ]
};

/** Ayahs 41 to 72: Tabuk, excuses, trusting Allah's decree, the zakah recipients, hypocrites and true believers. */
const TAWBAH_THREE: DeepUnit = {
  key: "tawbah3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-9",
  name: "At-Tawbah, ayahs 41 to 72",
  kind: "skill",
  lessonType: "surah",
  surahName: "At-Tawbah",
  lessons: [
    {
      slug: "light-or-heavy",
      title: "Go out, light or heavy",
      line: "Go out for Allah's cause, whether it feels easy or hard.",
      facts: ["Said for the journey to Tabuk", "Better for you, if you knew"],
      quote: q9(41),
      source: ik(41, "Allah ordered the believers to go out with the Messenger ﷺ to Tabuk whether they felt active or lazy, at ease or in hardship. Abu ad-Duha said this was the first part of Bara'ah revealed.", "regardless whether they felt active, lazy, at ease or had difficult circumstances"),
      difficulty: 2,
      questions: [
        { q: "What does light or heavy mean in 9:41, per Ibn Kathir?", a: "Whether it feels easy or hard", wrong: ["Thin or fat people", "Day or night", "Rich or poor towns"], why: "Whether they felt active, lazy, at ease or had difficult circumstances." },
        { q: "Which journey was 9:41 about?", a: "Tabuk", wrong: ["Badr", "Uhud", "Khaybar"], why: "Allah commanded mass mobilization for the battle of Tabuk." },
        { q: "9:41 says striving with wealth and lives is better for you.", tf: true, why: "This is better for you, if you but knew." }
      ]
    },
    {
      slug: "if-it-were-easy",
      title: "If only it were short",
      line: "They would have gone if the trip were short and easy.",
      facts: ["The road was long", "They swore false excuses"],
      quote: q9(42),
      source: ik(42, "Those who stayed back from Tabuk would have gone if the gain were close and the trip short. The distance was long, so they swore false excuses, and Allah knew they were lying.", "travel for only a short distance"),
      difficulty: 2,
      questions: [
        { q: "Why did some stay back, in 9:42?", a: "The journey was long", wrong: ["They were too old", "It was raining", "They had no food"], why: "But the distance was long for them." },
        { q: "What did they swear when the believers came back?", a: "That they would have come if able", wrong: ["That they had come", "That they were sick", "That they had no shoes"], why: "If we only could, we would certainly have come forth with you." },
        { q: "Allah knew they were telling the truth.", tf: false, why: "And Allah knows that they are liars." }
      ]
    },
    {
      slug: "forgiveness-before-blame",
      title: "Forgiveness before the blame",
      line: "Allah began with forgiveness before His gentle blame in 9:43.",
      facts: ["May Allah forgive you", "A very soft correction"],
      quote: q9(43),
      source: ik(43, "Awn said: have you heard a softer blame than this? It starts with forgiveness before the criticism, for allowing some to stay behind.", "starting with forgiveness before criticism"),
      difficulty: 2,
      questions: [
        { q: "How does 9:43 begin?", a: "May Allah forgive you", wrong: ["Woe to you", "Go back", "Be silent"], why: "May Allah forgive you. Why did you grant them leave?" },
        { q: "What did Awn notice about 9:43?", a: "Forgiveness comes before blame", wrong: ["It is very long", "It has no blame", "It is a story"], why: "Starting with forgiveness before criticism." },
        { q: "Gentle words help a correction be accepted.", tf: true, why: "Have you heard criticism softer than this?" }
      ]
    },
    {
      slug: "no-preparation",
      title: "They made no preparation",
      line: "Had they truly meant to go, they would have prepared.",
      facts: ["Intention shows in action", "Allah disliked their going"],
      quote: q9(46),
      source: ik(46, "Had they meant to go out with the Messenger ﷺ, they would have prepared for it. Allah disliked their going, as they would only have spread disorder.", "they would have prepared for such task"),
      difficulty: 3,
      questions: [
        { q: "What showed they never meant to go, in 9:46?", a: "They made no preparation", wrong: ["They left early", "They packed food", "They bought camels"], why: "They would have made some preparation for it." },
        { q: "What would they have added had they gone, in 9:47?", a: "Only disorder", wrong: ["More strength", "More food", "More courage"], why: "They would have added to you nothing except disorder." },
        { q: "A true intention shows in getting ready.", tf: true, why: "If they had intended to march out, they would have made preparation." }
      ]
    },
    {
      slug: "only-what-allah-wrote",
      title: "Only what Allah has written",
      line: "Nothing reaches us except what Allah has written for us.",
      facts: ["He is our Protector", "Believers trust in Him"],
      quote: q9(51),
      source: ik(51, "Say: nothing will happen to us except what Allah has decreed, for we are under His control and decree. He is our Master and Protector, and the believers trust in Him.", "we are under His control and decree"),
      difficulty: 3,
      questions: [
        { q: "What does 9:51 tell believers to say?", a: "Only what Allah wrote reaches us", wrong: ["We are always lucky", "We never get hurt", "Nothing is planned"], why: "Nothing shall ever happen to us except what Allah has ordained for us." },
        { q: "What does Mawla mean, per Ibn Kathir?", a: "Master and protector", wrong: ["A neighbour", "A teacher", "A guest"], why: "He is our Mawla: Master and protector." },
        { q: "In whom should the believers put their trust, in 9:51?", a: "In Allah", wrong: ["In their wealth", "In their numbers", "In their leaders"], why: "And in Allah let the believers put their trust." }
      ]
    },
    {
      slug: "two-best-things",
      title: "One of the two best things",
      line: "For a believer, every outcome in Allah's path is good.",
      facts: ["Victory is good", "Martyrdom is good"],
      quote: q9(52),
      source: ik(52, "The believers wait for one of two good things: martyrdom or victory, as Ibn Abbas, Mujahid and Qatadah explained.", "martyrdom or victory"),
      difficulty: 3,
      questions: [
        { q: "What are the two best things in 9:52, per Ibn Abbas?", a: "Martyrdom or victory", wrong: ["Gold or silver", "Rest or sleep", "Fame or praise"], why: "One of the two best things: martyrdom or victory." },
        { q: "For a sincere believer, both outcomes are good.", tf: true, why: "Except one of the two best things." },
        { q: "Who explained the two best things, besides Ibn Abbas?", a: "Mujahid and Qatadah", wrong: ["Abu Jahl and Utbah", "Pharaoh and Haman", "No one else"], why: "According to the meaning given by Ibn Abbas, Mujahid, Qatadah." }
      ]
    },
    {
      slug: "lazy-to-prayer",
      title: "Coming to prayer lazily",
      line: "Fajr and Isha are the heaviest prayers for the hypocrites.",
      facts: ["They came to prayer lazily", "They gave unwillingly"],
      quote: q9(54),
      source: hadith("bukhari", "657", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said no prayer is heavier on the hypocrites than Fajr and Isha, and if they knew their reward they would come even crawling.", "if they knew what is in them (in reward), they would have attended them, even if (it was) crawling"),
      difficulty: 3,
      questions: [
        { q: "Which two prayers are heaviest for the hypocrites?", a: "Fajr and Isha", wrong: ["Dhuhr and Asr", "Asr and Maghrib", "Jumu'ah and Eid"], why: "No prayer is heavier upon the hypocrites than the Fajr and the Isha." },
        { q: "How would they come if they knew the reward?", a: "Even crawling", wrong: ["Only riding", "Only if paid", "Only on Fridays"], why: "They would have attended them, even if crawling." },
        { q: "9:54 says they came to the prayer lazily.", tf: true, why: "They came not to the Salah except in a lazy state." }
      ]
    },
    {
      slug: "do-not-be-amazed",
      title: "Do not be amazed by their wealth",
      line: "Do not be dazzled by the wealth and children of the hypocrites.",
      facts: ["Wealth can be a test", "What is with Allah is better"],
      quote: q9(55),
      source: ik(55, "Allah told His Messenger not to be amazed by their wealth and children. Like 20:131, it teaches that worldly shine is a test, and what is with Allah is better and lasts longer.", "let not their wealth nor their children amaze you"),
      difficulty: 4,
      questions: [
        { q: "What must not amaze us, in 9:55?", a: "Their wealth and children", wrong: ["The stars", "The sea", "The mountains"], why: "So let not their wealth nor their children amaze you." },
        { q: "Which ayah does Ibn Kathir link to 9:55?", a: "20:131", wrong: ["1:1", "112:1", "2:255"], why: "Strain not your eyes in longing for the things We have given (20:131)." },
        { q: "More wealth always means Allah is pleased.", tf: false, why: "Do they think that in wealth and children We hasten unto them with good things? (23:55-56)" }
      ]
    },
    {
      slug: "allah-is-sufficient",
      title: "Allah is enough for us",
      line: "Be content with what Allah gives: Allah is enough for us.",
      facts: ["Contentment", "Hope in Allah alone"],
      quote: q9(59),
      source: ik(59, "Had they been content with what Allah and His Messenger gave them and said Allah is sufficient for us, hoping in Allah alone, it would have been better for them.", "Allah is sufficient for us"),
      difficulty: 4,
      questions: [
        { q: "What should they have said, in 9:59?", a: "Allah is sufficient for us", wrong: ["Give us more now", "We want it all", "This is unfair"], why: "And had said: Allah is sufficient for us." },
        { q: "Why were they angry, in 9:58?", a: "They were not given zakah", wrong: ["They lost a race", "Their camel ran", "It was too hot"], why: "If they are not given thereof, behold! They are enraged." },
        { q: "Contentment with Allah's giving is a sign of obedience.", tf: true, why: "He made these the indications of obedience." }
      ]
    },
    {
      slug: "eight-recipients",
      title: "Who receives zakah",
      line: "Allah Himself named the eight groups who receive zakah.",
      facts: ["The poor come first", "Not left to anyone else"],
      quote: q9(60),
      source: ik(60, "After the hypocrites complained about how the alms were shared, Allah said He Himself divided the zakah and named its groups, starting with the poor, whose need is greatest.", "it is He who divided the alms"),
      difficulty: 4,
      questions: [
        { q: "Who decided the zakah groups, per Ibn Kathir?", a: "Allah Himself", wrong: ["The collectors", "The richest man", "Each giver alone"], why: "It is He who divided the alms." },
        { q: "How many groups receive zakah in 9:60?", a: "Eight", wrong: ["Three", "Five", "Twelve"], why: "The poor, the needy, collectors, hearts, captives, debtors, Allah's cause, travellers." },
        { q: "Which of these is a zakah group in 9:60?", a: "Those in debt", wrong: ["The richest", "The famous", "The strongest"], why: "And for those in debt." }
      ]
    },
    {
      slug: "faqir-and-miskin",
      title: "The faqir and the miskin",
      line: "The faqir does not ask; the miskin asks people for help.",
      facts: ["Faqir: poor and dignified", "Miskin: needy and asking"],
      quote: q9(60),
      source: ik(60, "Ibn Abbas, Mujahid, Al-Hasan and others said the faqir is a dignified person who asks no one for anything, while the miskin goes after people asking.", "the Faqir is a graceful person who does not ask anyone for anything"),
      difficulty: 5,
      questions: [
        { q: "Who is the faqir, per Ibn Abbas and others?", a: "A poor person who does not ask", wrong: ["A rich trader", "A traveller", "A collector"], why: "The Faqir is a graceful person who does not ask anyone for anything." },
        { q: "Who is the miskin, per the same scholars?", a: "One who asks people", wrong: ["One who never needs", "One who collects zakah", "One who is a guest"], why: "The Miskin is the one who follows after people, begging." },
        { q: "The poor come first in 9:60 because their need is greatest.", tf: true, why: "Starting with the Fuqara' because they have more need." }
      ]
    },
    {
      slug: "the-hidden-poor",
      title: "The poor you do not notice",
      line: "The truly poor often hide their need and do not beg.",
      facts: ["Look for the quiet poor", "Give before they ask"],
      quote: q9(60),
      source: hadith("bukhari", "1479", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said the poor person is not the one who goes around asking for a bite or a date, but the one without enough whose state is unknown, so no one gives him, and who does not beg.", "whose condition is not known to others"),
      difficulty: 5,
      questions: [
        { q: "Who is the real poor person, per Abu Hurayrah?", a: "One whose need is hidden", wrong: ["One who asks loudly", "One with many friends", "One who travels"], why: "Whose condition is not known to others." },
        { q: "The real poor person, in the hadith, does not beg.", tf: true, why: "And who does not beg of people." },
        { q: "What does the hadith teach givers to do?", a: "Look out for quiet need", wrong: ["Give only to beggars", "Never give", "Give only once"], why: "Whose condition is not known to others, that others may give him." }
      ]
    },
    {
      slug: "an-ear-for-good",
      title: "He listens to what is good",
      line: "The Prophet ﷺ listened for good and was a mercy to believers.",
      facts: ["He believes the believers", "A mercy to them"],
      quote: q9(61),
      source: ik(61, "The hypocrites mocked the Messenger ﷺ as one who believes anything. Allah answered: he listens to what is best, he believes in Allah, he believes the believers, and he is a mercy to them.", "he believes the believers"),
      difficulty: 5,
      questions: [
        { q: "What did the hypocrites call the Prophet ﷺ, in 9:61?", a: "An ear for everything", wrong: ["A poet", "A king", "A trader"], why: "He is (lending his) ear to every news." },
        { q: "What is he to the believers, in 9:61?", a: "A mercy", wrong: ["A burden", "A stranger", "A judge only"], why: "And is a mercy to those of you who believe." },
        { q: "9:61 says he believes the believers.", tf: true, why: "He believes in Allah; has faith in the believers." }
      ]
    },
    {
      slug: "please-allah-first",
      title: "Please Allah first",
      line: "Pleasing Allah matters more than pleasing people.",
      facts: ["They swore to please people", "Allah has more right"],
      quote: q9(62),
      source: ik(62, "The hypocrites swore oaths to please the believers, but it is more fitting that they should please Allah and His Messenger, if they truly believe.", "it is more fitting that they should please Allah and His Messenger"),
      difficulty: 5,
      questions: [
        { q: "Whom should they have tried to please, in 9:62?", a: "Allah and His Messenger", wrong: ["Their chiefs", "The crowd", "Their friends"], why: "It is more fitting that they should please Allah and His Messenger." },
        { q: "Why did they swear oaths, in 9:62?", a: "To please the people", wrong: ["To please Allah", "To win a prize", "To end a war"], why: "They swear by Allah to you in order to please you." },
        { q: "Pleasing people comes before pleasing Allah.", tf: false, why: "It is more fitting that they should please Allah." }
      ]
    },
    {
      slug: "not-a-joke",
      title: "Allah's ayat are not a joke",
      line: "Mocking Allah, His ayat or His Messenger is never just a joke.",
      facts: ["We were only joking, they said", "No excuse was accepted"],
      quote: q9(65),
      source: ik(65, "On the way to Tabuk some mocked the reciters of the Quran. When asked, they said they were only talking idly and joking. Allah said: was it Allah, His ayat and His Messenger you were mocking?", "only talking idly and joking"),
      difficulty: 5,
      questions: [
        { q: "What excuse did the mockers give, in 9:65?", a: "We were only joking", wrong: ["We were asleep", "We were lost", "We were praying"], why: "We were only talking idly and joking." },
        { q: "What did Allah reply, in 9:65?", a: "Was it Allah you mocked?", wrong: ["You are forgiven", "Joke more", "Say it again"], why: "Was it at Allah, and His Ayat and His Messenger that you were mocking?" },
        { q: "Joking about Allah's ayat is harmless fun.", tf: false, why: "Make no excuse; you disbelieved after you had believed." }
      ]
    },
    {
      slug: "they-forgot-allah",
      title: "They forgot Allah",
      line: "Whoever forgets Allah is left forgotten by Him.",
      facts: ["Command good, forbid evil", "Open your hand to give"],
      quote: q9(67),
      source: ik(67, "The hypocrites order evil, forbid good and close their hands from giving. They forgot to remember Allah, so He treats them as forgotten.", "forgotten the remembrance of Allah"),
      difficulty: 5,
      questions: [
        { q: "What did the hypocrites forget, per Ibn Kathir?", a: "The remembrance of Allah", wrong: ["Their homes", "Their names", "Their money"], why: "They have forgotten the remembrance of Allah." },
        { q: "What does they close their hands mean?", a: "They do not spend for Allah", wrong: ["They pray badly", "They fight", "They sleep"], why: "They close their hands from spending in Allah's cause." },
        { q: "Hypocrites order good and forbid evil.", tf: false, why: "They enjoin evil, and forbid the good." }
      ]
    },
    {
      slug: "nations-before-them",
      title: "Learn from the nations before",
      line: "Nations before were not wronged; they wronged themselves.",
      facts: ["Six nations are named", "Allah wrongs no one"],
      quote: q9(70),
      source: ik(70, "Allah reminds the hypocrites of the nations before them who rejected the Messengers: the people of Nuh, Ad, Thamud, Ibrahim's people, Madyan and the overturned cities.", "learned the end of the nations before you who rejected the Messengers"),
      difficulty: 5,
      questions: [
        { q: "Who is named first in 9:70?", a: "The people of Nuh", wrong: ["The people of Musa", "The Romans", "The Persians"], why: "The people of Nuh, Ad, Thamud." },
        { q: "Who wronged those nations, in 9:70?", a: "They wronged themselves", wrong: ["Allah wronged them", "Their rivals", "The weather"], why: "It was not Allah Who wronged them, but they wronged themselves." },
        { q: "Ad perished by a barren wind, per Ibn Kathir.", tf: true, why: "Ad, who perished with the barren wind when they rejected Hud." }
      ]
    },
    {
      slug: "believers-help-each-other",
      title: "Believers help each other",
      line: "Believing men and women support and help one another.",
      facts: ["They command good", "They pray and give zakah"],
      quote: q9(71),
      source: ik(71, "After describing the hypocrites, Allah describes the believers: men and women who help and support each other, command good, forbid evil, pray, give zakah and obey Allah.", "they help and aid each other"),
      difficulty: 5,
      questions: [
        { q: "What are believers to one another, in 9:71?", a: "Supporters of one another", wrong: ["Rivals", "Strangers", "Judges"], why: "The believers, men and women, are supporters of one another." },
        { q: "Which is NOT a quality in 9:71?", a: "Closing their hands", wrong: ["Praying", "Giving zakah", "Obeying Allah"], why: "They perform the Salah, give the Zakah and obey Allah." },
        { q: "9:71 includes both believing men and women.", tf: true, why: "The believers, men and women." }
      ]
    },
    {
      slug: "like-a-wall",
      title: "Like bricks in a wall",
      line: "Believers hold each other up like bricks in one wall.",
      facts: ["He laced his fingers", "Each brick needs the others"],
      quote: q9(71),
      source: hadith("bukhari", "481", "Abu Musa al-Ash'ari", "Sahih", "The Prophet ﷺ said a believer to a believer is like the bricks of a wall, each strengthening the other, and he laced his fingers together.", "like the bricks of a wall, enforcing each other"),
      difficulty: 5,
      questions: [
        { q: "What are believers like, per Abu Musa's hadith?", a: "Bricks of one wall", wrong: ["Grains of sand", "Leaves in wind", "Stars far apart"], why: "Like the bricks of a wall, enforcing each other." },
        { q: "What did the Prophet ﷺ do with his hands?", a: "He laced his fingers", wrong: ["He clapped", "He waved", "He pointed up"], why: "He clasped his hands, by interlacing his fingers." },
        { q: "In a wall, each brick supports the others.", tf: true, why: "Enforcing each other." }
      ]
    },
    {
      slug: "one-body",
      title: "Like one body",
      line: "When one believer hurts, the others feel it like one body.",
      facts: ["Mercy, love, kindness", "Fever and no sleep"],
      quote: q9(71),
      source: hadith("bukhari", "6011", "An-Nu'man ibn Bashir", "Sahih", "The Prophet ﷺ said the believers, in their mercy, love and kindness to each other, are like one body: if one part is unwell, the whole body shares the sleeplessness and fever.", "resembling one body"),
      difficulty: 5,
      questions: [
        { q: "What are the believers like, in their mercy to each other?", a: "One body", wrong: ["Two armies", "A busy market", "A long road"], why: "Resembling one body." },
        { q: "What does the whole body share when one part is ill?", a: "Fever and sleeplessness", wrong: ["Food and drink", "Wealth", "Nothing at all"], why: "The whole body shares the sleeplessness and fever with it." },
        { q: "A believer should feel the pain of other believers.", tf: true, why: "If any part of the body is not well then the whole body shares." }
      ]
    },
    {
      slug: "fine-dwellings",
      title: "Fine homes in Eden",
      line: "Allah promised believers Gardens with rivers and fine homes.",
      facts: ["Gardens of Adn", "They stay forever"],
      quote: q9(72),
      source: ik(72, "Allah promised the believing men and women Gardens with rivers beneath, where they stay forever, and fine homes built beautifully in the Gardens of Eden.", "built beautifully in good surroundings"),
      difficulty: 5,
      questions: [
        { q: "What does Allah promise in 9:72, besides Gardens?", a: "Fine homes", wrong: ["Big armies", "Ships", "Crowns"], why: "And beautiful mansions in gardens of Adn." },
        { q: "What flows beneath the Gardens, in 9:72?", a: "Rivers", wrong: ["Sand", "Fire", "Ice"], why: "Gardens under which rivers flow." },
        { q: "Ibn Kathir says the homes are built beautifully.", tf: true, why: "Built beautifully in good surroundings." }
      ]
    },
    {
      slug: "allahs-pleasure",
      title: "The greatest joy: His pleasure",
      line: "Greater than Paradise itself is Allah being pleased with you.",
      facts: ["He will never be angry", "The supreme success"],
      quote: q9(72),
      source: hadith("bukhari", "6549", "Abu Sa'id al-Khudri", "Sahih", "Allah will ask the people of Paradise if they are pleased, then say He will give them something better: His pleasure, so that He will never be angry with them again.", "I will bestow My pleasure and contentment upon you"),
      difficulty: 5,
      questions: [
        { q: "What is the greatest bliss, in 9:72?", a: "The pleasure of Allah", wrong: ["The rivers", "The gold", "The homes"], why: "But the greatest bliss is the good pleasure of Allah." },
        { q: "What will Allah give that is better than Paradise?", a: "His pleasure forever", wrong: ["More gold", "More rivers", "A bigger home"], why: "I will bestow My pleasure and contentment upon you." },
        { q: "After that, Allah will never be angry with them.", tf: true, why: "So that I will never be angry with you after forever." }
      ]
    }
  ]
};

/** Ayahs 73 to 110: broken promises, small charity, true excuses, the foremost, charity that purifies, Quba. */
const TAWBAH_FOUR: DeepUnit = {
  key: "tawbah4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-9",
  name: "At-Tawbah, ayahs 73 to 110",
  kind: "skill",
  lessonType: "surah",
  surahName: "At-Tawbah",
  lessons: [
    {
      slug: "a-broken-promise",
      title: "A promise to Allah, then broken",
      line: "Some promised charity if Allah made them rich, then held back.",
      facts: ["Allah knows their secrets", "Keep promises to Allah"],
      quote: q9(75),
      source: ik(75, "Some swore that if Allah enriched them they would give charity and be righteous. When He did, they became stingy and broke their promise, so hypocrisy settled in their hearts.", "they did not fulfill their vows or say the truth with their words"),
      difficulty: 2,
      questions: [
        { q: "What did they promise Allah, in 9:75?", a: "To give charity if made rich", wrong: ["To travel far", "To build a wall", "To fast a month"], why: "If He bestowed on us of His bounty, we will verily give Sadaqah." },
        { q: "What did they do once Allah gave them wealth?", a: "They became stingy", wrong: ["They gave it all", "They moved away", "They built a masjid"], why: "When He gave them of His bounty, they became stingy." },
        { q: "9:78 says Allah knows their secret talk.", tf: true, why: "Allah knows their secret ideas, and their Najwa." }
      ]
    },
    {
      slug: "signs-of-a-hypocrite",
      title: "Three signs of a hypocrite",
      line: "A hypocrite lies, breaks promises and betrays trusts.",
      facts: ["Lying when speaking", "Breaking promises"],
      quote: q9(77),
      source: hadith("bukhari", "33", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said the signs of a hypocrite are three: when he speaks he lies, when he promises he breaks it, and when trusted he betrays.", "The signs of a hypocrite are three"),
      difficulty: 2,
      questions: [
        { q: "How many signs of a hypocrite are in the hadith?", a: "Three", wrong: ["One", "Five", "Ten"], why: "The signs of a hypocrite are three." },
        { q: "Which is NOT one of the three signs?", a: "Praying at night", wrong: ["Lying", "Breaking promises", "Betraying trusts"], why: "He lies, he breaks his promise, he betrays the trust." },
        { q: "Keeping promises protects a Muslim from hypocrisy.", tf: true, why: "Whenever he promises, he always breaks it, is a sign of hypocrisy." }
      ]
    },
    {
      slug: "small-charity",
      title: "Half a measure of dates",
      line: "Allah values a small gift given sincerely; mocking it is wrong.",
      facts: ["They mocked big and small gifts", "Allah sees the effort"],
      quote: q9(79),
      source: hadith("bukhari", "4668", "Abu Mas'ud", "Sahih", "When charity was urged, the Companions worked as porters to earn something to give. Abu Aqil brought half a sa', and the hypocrites mocked him; then 9:79 was revealed.", "came with one half of a Sa"),
      difficulty: 2,
      questions: [
        { q: "How did they earn something to give, per Abu Mas'ud?", a: "They worked as porters", wrong: ["They sold their homes", "They borrowed it", "They found treasure"], why: "We began to work as porters to earn something we could give." },
        { q: "What did the mockers say about the small gift?", a: "Allah does not need it", wrong: ["It is too much", "It is stolen", "It came late"], why: "Allah is not in need of the alms of this man." },
        { q: "A small gift from little means is precious to Allah.", tf: true, why: "Those who could not find to give except what is available to them." }
      ]
    },
    {
      slug: "hotter-than-summer",
      title: "Hotter than the summer heat",
      line: "They said: do not go in the heat. Hellfire is far hotter.",
      facts: ["They rejoiced at staying back", "Laugh little, cry much"],
      quote: q9(81),
      source: ik(81, "Those who stayed behind from Tabuk were glad and told others not to go out in the heat. Allah replied that the fire of Hell is far hotter, if only they understood.", "The fire of Hell is more intense in heat"),
      difficulty: 3,
      questions: [
        { q: "What excuse did they give, in 9:81?", a: "Do not go out in the heat", wrong: ["It is too cold", "It is too dark", "It is too wet"], why: "And they said: March not forth in the heat." },
        { q: "What was the reply, in 9:81?", a: "Hellfire is hotter", wrong: ["Rest at home", "Wait for winter", "Go at night"], why: "Say: The fire of Hell is more intense in heat." },
        { q: "9:82 says they will laugh a little and cry much.", tf: true, why: "So let them laugh a little and cry much." }
      ]
    },
    {
      slug: "laugh-little",
      title: "If you knew what I know",
      line: "Knowing what lies ahead would make us laugh little, weep much.",
      facts: ["The unseen is serious", "Live with awareness"],
      quote: q9(82),
      source: hadith("bukhari", "6485", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said: if you knew what I know, you would laugh little and weep much.", "you would laugh little and weep much"),
      difficulty: 3,
      questions: [
        { q: "What would we do if we knew what he ﷺ knew?", a: "Laugh little, weep much", wrong: ["Laugh much", "Sleep more", "Eat more"], why: "You would laugh little and weep much." },
        { q: "Which ayah carries the same words of laughing and crying?", a: "9:82", wrong: ["1:5", "2:255", "112:1"], why: "So let them laugh a little and cry much." },
        { q: "The hadith teaches taking the Hereafter seriously.", tf: true, why: "If you knew that which I know." }
      ]
    },
    {
      slug: "true-believers-strive",
      title: "They gave their best",
      line: "The Messenger ﷺ and the believers strove with wealth and lives.",
      facts: ["For them are the good things", "They are the successful"],
      quote: q9(88),
      source: ik(88, "After describing the hypocrites, Allah praised the faithful believers who strove with the Messenger ﷺ, and described their reward: good things and Gardens forever.", "This describes the qualities, as well as, the reward of faithful believers"),
      difficulty: 3,
      questions: [
        { q: "Whom does 9:88 praise?", a: "The Messenger ﷺ and the believers", wrong: ["Those who stayed", "The rich who asked leave", "The bedouins who lied"], why: "But the Messenger ﷺ and those who believed with him strove hard." },
        { q: "What has Allah prepared for them, in 9:89?", a: "Gardens with rivers", wrong: ["Gold coins", "Big houses on earth", "Long lives"], why: "For them Allah has prepared Gardens under which rivers flow." },
        { q: "9:89 calls it the supreme success.", tf: true, why: "That is the supreme success." }
      ]
    },
    {
      slug: "no-blame-on-the-weak",
      title: "No blame on the weak",
      line: "The weak, the sick and the poor carry no blame if sincere.",
      facts: ["Sincere to Allah", "No complaint against good-doers"],
      quote: q9(91),
      source: ik(91, "Allah names real excuses: lasting weakness like blindness or limping, illness, or poverty. There is no sin on them if they stay sincere and do not discourage others.", "He first mentions the excuses that remain with a person"),
      difficulty: 3,
      questions: [
        { q: "Who has no blame for staying back, in 9:91?", a: "The weak, ill and poor", wrong: ["The rich who asked", "The busy traders", "The lazy"], why: "There is no blame on those who are weak or ill or who find no resources." },
        { q: "What condition does 9:91 give them?", a: "Being sincere to Allah", wrong: ["Paying a fine", "Leaving town", "Staying silent"], why: "If they are sincere and true to Allah and His Messenger." },
        { q: "Islam asks no one more than they can bear.", tf: true, why: "No means of complaint can there be against the doers of good." }
      ]
    },
    {
      slug: "tears-of-the-sincere",
      title: "They left in tears",
      line: "With no mount to ride, they turned back weeping with grief.",
      facts: ["No mounts were left", "Their eyes overflowed"],
      quote: q9(92),
      source: ik(92, "Some came asking for a mount to ride. When none was left, they turned away with eyes overflowing with tears, sad they had nothing to spend.", "with their eyes overflowing with tears of grief"),
      difficulty: 4,
      questions: [
        { q: "Why did they come to the Prophet ﷺ, in 9:92?", a: "To ask for mounts", wrong: ["To ask for money", "To ask to stay", "To ask for food"], why: "Those who came to you to be provided with mounts." },
        { q: "How did they leave, in 9:92?", a: "Weeping with grief", wrong: ["Laughing", "Angry", "Running"], why: "With their eyes overflowing with tears of grief." },
        { q: "Their sadness showed how sincere they were.", tf: true, why: "Tears of grief that they could not find anything to spend." }
      ]
    },
    {
      slug: "with-you-by-intention",
      title: "With you in reward",
      line: "Those held back by a real excuse share the reward.",
      facts: ["They crossed no valley", "Yet they were with you"],
      quote: q9(92),
      source: hadith("bukhari", "4423", "Anas ibn Malik", "Sahih", "Returning from Tabuk, the Prophet ﷺ said some people in Madinah were with them on every step and valley, because a genuine excuse kept them back.", "they were stopped by a genuine excuse"),
      difficulty: 4,
      questions: [
        { q: "Why were some in Madinah counted as with them?", a: "A real excuse stopped them", wrong: ["They sent money", "They wrote letters", "They prayed longer"], why: "Because they were stopped by a genuine excuse." },
        { q: "When did the Prophet ﷺ say this, per Anas?", a: "Returning from Tabuk", wrong: ["Before Badr", "At Hunayn", "During Hajj"], why: "Allah's Messenger returned from the Ghazwa of Tabuk." },
        { q: "A sincere intention can earn reward without the deed.", tf: true, why: "They were with you all the time." }
      ]
    },
    {
      slug: "spending-for-nearness",
      title: "Giving to come closer",
      line: "Some bedouins gave to come closer to Allah.",
      facts: ["Charity as nearness", "And the Prophet's ﷺ du'a"],
      quote: q9(99),
      source: ik(99, "Among the bedouins are believers who see what they spend as a way to come near to Allah and to receive the Messenger's ﷺ prayers. Allah will admit them to His mercy.", "means of nearness to Allah"),
      difficulty: 4,
      questions: [
        { q: "How did the believing bedouins see their spending, in 9:99?", a: "A way to come near Allah", wrong: ["A heavy fine", "A waste", "A tax"], why: "Look upon what they spend as means of nearness to Allah." },
        { q: "How did the hypocrite bedouins see it, in 9:98?", a: "As a fine", wrong: ["As a gift", "As worship", "As a joy"], why: "Some look upon what they spend as a fine." },
        { q: "9:99 says Allah will admit them to His mercy.", tf: true, why: "Allah will admit them to His mercy." }
      ]
    },
    {
      slug: "the-foremost",
      title: "The foremost of the believers",
      line: "Allah is pleased with the first Muhajirun and Ansar.",
      facts: ["And those who followed well", "They are pleased with Him"],
      quote: q9(100),
      source: ik(100, "Allah is pleased with the foremost of the Muhajirun and Ansar and those who followed them in good. Some scholars said they are those who prayed towards both qiblahs.", "those who performed the prayer towards the two Qiblahs"),
      difficulty: 4,
      questions: [
        { q: "With whom is Allah pleased, in 9:100?", a: "The foremost Muhajirun and Ansar", wrong: ["Only kings", "Only the rich", "Only the old"], why: "The foremost of the Muhajirin and the Ansar." },
        { q: "Who are the foremost, per some scholars?", a: "Those who prayed to both qiblahs", wrong: ["Those born in Makkah", "Those who were rich", "Those who were tall"], why: "Those who performed the prayer towards the two Qiblahs." },
        { q: "Those who follow them in good share in Allah's pleasure.", tf: true, why: "And also those who followed them exactly in faith." }
      ]
    },
    {
      slug: "mixed-deeds",
      title: "Good and bad deeds mixed",
      line: "Those who admit their sins can hope for Allah's forgiveness.",
      facts: ["They admitted their error", "Allah is Most Merciful"],
      quote: q9(102),
      source: ik(102, "Some believers stayed behind out of laziness. They admitted their error to themselves and their Lord. They had good deeds and this bad deed, and Allah forgave them.", "These people admitted their error to themselves and their Lord"),
      difficulty: 4,
      questions: [
        { q: "What did these believers do, in 9:102?", a: "They admitted their sins", wrong: ["They hid them", "They blamed others", "They boasted"], why: "Others who have acknowledged their sins." },
        { q: "What had they mixed, in 9:102?", a: "A good deed with a bad one", wrong: ["Water with milk", "Gold with silver", "Truth with lies"], why: "They have mixed a deed that was righteous with another that was evil." },
        { q: "Admitting a sin opens the way to Allah's mercy.", tf: true, why: "Perhaps Allah will turn unto them in forgiveness." }
      ]
    },
    {
      slug: "charity-purifies",
      title: "Charity that purifies",
      line: "Charity cleans the giver, and the Prophet ﷺ prayed for givers.",
      facts: ["Purify and grow", "His prayer brings calm"],
      quote: q9(103),
      source: ik(103, "Allah told His Messenger to take charity from their wealth to purify them, and to pray for them, for his prayer is a calm and a mercy for them.", "to purify and sanctify them with it"),
      difficulty: 5,
      questions: [
        { q: "What does charity do to the giver, in 9:103?", a: "Purifies them", wrong: ["Makes them poor", "Makes them famous", "Makes them tired"], why: "Take Sadaqah from their wealth in order to purify them." },
        { q: "What does sakan mean, per Ibn Abbas?", a: "A mercy for them", wrong: ["A house", "A fine", "A long road"], why: "Your Salat are a Sakan for them: a mercy for them." },
        { q: "The Prophet ﷺ was told to pray for those who give.", tf: true, why: "And Salli for them: supplicate for them." }
      ]
    },
    {
      slug: "dua-for-the-giver",
      title: "A du'a for the giver",
      line: "The Prophet ﷺ made du'a for each person who brought charity.",
      facts: ["O Allah, bless them", "Thank the giver"],
      quote: q9(103),
      source: hadith("bukhari", "1497", "Abdullah ibn Abi Awfa", "Sahih", "Whenever someone brought charity, the Prophet ﷺ said: O Allah, send Your blessings on so-and-so. When Abdullah's father brought his, he prayed for the family of Abu Awfa.", "Send your blessings upon the offspring of Abu Aufa"),
      difficulty: 5,
      questions: [
        { q: "What did the Prophet ﷺ say when charity came?", a: "O Allah, bless them", wrong: ["Put it there", "Is that all?", "Come back later"], why: "O Allah! Send your Blessings upon so and so." },
        { q: "Whose family did he pray for, in the hadith?", a: "The family of Abu Awfa", wrong: ["The family of Pharaoh", "The family of Qarun", "No one"], why: "Send your blessings upon the offspring of Abu Aufa." },
        { q: "Praying for those who give is a Sunnah.", tf: true, why: "Whenever a person came with his alms, he would say: O Allah, send your blessings." }
      ]
    },
    {
      slug: "a-date-like-a-mountain",
      title: "A date that grows like a mountain",
      line: "Allah accepts pure charity and grows it like a mountain.",
      facts: ["Only from honest earnings", "Even one date"],
      quote: q9(104),
      source: hadith("bukhari", "1410", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said whoever gives even a date from honest earnings, Allah takes it in His right hand and grows it for him until it is as big as a mountain.", "it becomes as big as a mountain"),
      difficulty: 5,
      questions: [
        { q: "How big can one date of charity grow, per the hadith?", a: "As big as a mountain", wrong: ["As big as a tree", "As big as a house", "It stays small"], why: "It becomes as big as a mountain." },
        { q: "Which charity does Allah accept, per the hadith?", a: "From honest earnings", wrong: ["Any money at all", "Only gold", "Only large gifts"], why: "Allah accepts only the honestly earned money." },
        { q: "9:104 says Allah accepts repentance and charity.", tf: true, why: "Allah accepts repentance from His servants and accepts the Sadaqat." }
      ]
    },
    {
      slug: "do-deeds",
      title: "Do deeds, Allah will see",
      line: "Work well: Allah, His Messenger and the believers will see.",
      facts: ["Nothing is hidden", "Then He will tell you"],
      quote: q9(105),
      source: ik(105, "Mujahid said 9:105 warns those who disobey: their deeds will be shown to Allah, the Messenger ﷺ and the believers, on the Day when no secret is hidden.", "Their deeds will be shown to Allah"),
      difficulty: 5,
      questions: [
        { q: "Who will see your deeds, in 9:105?", a: "Allah, His Messenger, the believers", wrong: ["No one at all", "Only your family", "Only the angels"], why: "Allah will see your deeds, and so will His Messenger and the believers." },
        { q: "What will Allah do in the end, in 9:105?", a: "Tell you what you did", wrong: ["Forget it all", "Ask your friends", "Hide it forever"], why: "Then He will inform you of what you used to do." },
        { q: "9:105 is a call to do good deeds.", tf: true, why: "And say: Do deeds!" }
      ]
    },
    {
      slug: "masjid-of-taqwa",
      title: "A masjid built on taqwa",
      line: "Quba was built on taqwa; a masjid built to harm was rejected.",
      facts: ["Masjid of harm: Dirar", "Quba: built on piety"],
      quote: q9(108),
      source: ik(108, "Hypocrites built a masjid next to Quba to harm and divide the believers. Allah told the Prophet ﷺ never to pray in it, and praised Masjid Quba, built on taqwa from the first day.", "which was built on piety from the first day"),
      difficulty: 5,
      questions: [
        { q: "Which masjid was built on taqwa from the first day, per Ibn Kathir?", a: "Quba", wrong: ["Dirar", "A market hall", "A fort"], why: "Masjid Quba, which was built on piety from the first day." },
        { q: "Why was Masjid Ad-Dirar built?", a: "To harm and divide believers", wrong: ["To teach children", "To feed the poor", "To house travellers"], why: "By way of harm and disbelief and to disunite the believers." },
        { q: "The Prophet ﷺ was told never to pray in Masjid Ad-Dirar.", tf: true, why: "Never stand you therein." }
      ]
    },
    {
      slug: "visiting-quba",
      title: "Visiting Quba",
      line: "The Prophet ﷺ visited Quba every Saturday, walking or riding.",
      facts: ["Men who love purity", "Allah loves the pure"],
      quote: q9(108),
      source: hadith("bukhari", "1193", "Abdullah ibn Dinar", "Sahih", "Ibn Umar said the Prophet ﷺ used to go to Masjid Quba every Saturday, sometimes walking and sometimes riding, and Ibn Umar did the same.", "used to go to the Mosque of Quba every Saturday"),
      difficulty: 5,
      questions: [
        { q: "How often did he ﷺ visit Quba, per Ibn Umar?", a: "Every Saturday", wrong: ["Once a year", "Every Ramadan", "Only once"], why: "Used to go to the Mosque of Quba every Saturday." },
        { q: "How did he ﷺ go there?", a: "Walking or riding", wrong: ["Only by boat", "Only at night", "Only with an army"], why: "Sometimes walking and sometimes riding." },
        { q: "9:108 says Allah loves those who keep pure.", tf: true, why: "And Allah loves those who make themselves clean and pure." }
      ]
    },
    {
      slug: "edge-of-a-cliff",
      title: "Built on the edge of a cliff",
      line: "Building on taqwa is firm; building on harm crumbles.",
      facts: ["Taqwa is a firm base", "Harm is a crumbling edge"],
      quote: q9(109),
      source: ik(109, "A masjid built on taqwa and Allah's pleasure is not like one built to cause harm. The second is like a building on the edge of a cliff that collapses into the Fire.", "built their Masjid on the edge of a steep hole"),
      difficulty: 5,
      questions: [
        { q: "What is a building on harm like, in 9:109?", a: "On a crumbling cliff edge", wrong: ["On solid rock", "On a mountain top", "On a river"], why: "On the brink of an undetermined precipice ready to crumble down." },
        { q: "What is the better foundation, in 9:109?", a: "Taqwa and Allah's pleasure", wrong: ["Gold and silver", "Many people", "Tall walls"], why: "He who laid the foundation of his building on Taqwa to Allah and His good pleasure." },
        { q: "Ibn Kathir says the harmful masjid kept doubt in their hearts.", tf: true, why: "They inherited hypocrisy in their hearts." }
      ]
    }
  ]
};

/** Ayahs 111 to 129: the great bargain, the believers' qualities, Tabuk's hardship, the three forgiven, the Prophet ﷺ. */
const TAWBAH_FIVE: DeepUnit = {
  key: "tawbah5",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-9",
  name: "At-Tawbah, ayahs 111 to 129",
  kind: "skill",
  lessonType: "surah",
  surahName: "At-Tawbah",
  lessons: [
    {
      slug: "the-great-bargain",
      title: "The best trade ever made",
      line: "Allah bought the believers' lives and wealth for Paradise.",
      facts: ["A promise in three books", "Rejoice in the deal"],
      quote: q9(111),
      source: ik(111, "Allah gives Paradise in return for lives and wealth given in His cause. This shows His generosity: He accepts as a price what He Himself already owns and gave.", "favor, generosity and bounty"),
      difficulty: 2,
      questions: [
        { q: "What is the price Allah gives, in 9:111?", a: "Paradise", wrong: ["Gold", "Fame", "Long life"], why: "For the price that theirs shall be the Paradise." },
        { q: "Which books carry this promise, in 9:111?", a: "Tawrah, Injil and Quran", wrong: ["Only the Quran", "Only the Tawrah", "Only the Zabur"], why: "A promise in truth in the Tawrah and the Injil and the Qur'an." },
        { q: "Allah buys what He already owns and gave.", tf: true, why: "He has accepted the good that He already owns and bestowed, as a price." }
      ]
    },
    {
      slug: "nine-qualities",
      title: "Qualities of the believers",
      line: "They repent, worship, praise, fast, bow and prostrate.",
      facts: ["Command good, forbid evil", "Keep Allah's limits"],
      quote: q9(112),
      source: ik(112, "These are the believers Allah bought: they repent from all sins, worship, praise Him, fast, bow, prostrate, command good, forbid evil and keep His limits.", "who repent) from all sins and shun all evils"),
      difficulty: 2,
      questions: [
        { q: "Which quality comes first in 9:112?", a: "Repenting", wrong: ["Fasting", "Bowing", "Praising"], why: "Those who repent, who worship, who praise." },
        { q: "What does as-sa'ihun mean, per Ibn Kathir?", a: "Those who fast", wrong: ["Those who sleep", "Those who trade", "Those who sing"], why: "As-Sa'ihun: who fast." },
        { q: "Keeping Allah's limits is among the qualities.", tf: true, why: "And who observe the limits set by Allah." }
      ]
    },
    {
      slug: "ibrahim-the-humble",
      title: "Ibrahim, who called on Allah often",
      line: "Ibrahim was awwah: always calling on Allah, and forbearing.",
      facts: ["Awwah: calls on Allah often", "Halim: forbearing"],
      quote: q9(114),
      source: ik(114, "Ibrahim was awwah and forbearing. Ibn Mas'ud said awwah means one who calls on Allah often; others said humble, merciful or certain in faith.", "he invoked Allah always"),
      difficulty: 2,
      questions: [
        { q: "What does awwah mean, per Ibn Mas'ud?", a: "One who calls on Allah often", wrong: ["One who travels", "One who builds", "One who fights"], why: "He invoked Allah always, according to Abdullah bin Mas'ud." },
        { q: "Which two qualities of Ibrahim are in 9:114?", a: "Awwah and forbearing", wrong: ["Rich and strong", "Tall and fast", "Silent and alone"], why: "Verily, Ibrahim was Awwah and forbearing." },
        { q: "Some scholars said awwah also means humble and merciful.", tf: true, why: "Who invokes Allah with humility, merciful." }
      ]
    },
    {
      slug: "clear-before-judging",
      title: "Allah makes it clear first",
      line: "Allah does not let a guided people stray before showing them.",
      facts: ["The message comes first", "Then come the duties"],
      quote: q9(115),
      source: ik(115, "Allah does not lead a guided people astray until He makes clear to them what to avoid. Guidance and misguidance come after commands and prohibitions are made known.", "guidance or misguidance occurs after commands and prohibitions are established"),
      difficulty: 3,
      questions: [
        { q: "What does Allah do before holding a people to account, in 9:115?", a: "Makes clear what to avoid", wrong: ["Punishes at once", "Stays silent", "Sends wealth"], why: "Until He makes clear to them what they should avoid." },
        { q: "Who owns the heavens and the earth, in 9:116?", a: "Allah", wrong: ["The kings", "The angels", "No one"], why: "To Allah belongs the dominion of the heavens and the earth." },
        { q: "9:116 says Allah gives life and causes death.", tf: true, why: "He gives life and He causes death." }
      ]
    },
    {
      slug: "the-hour-of-hardship",
      title: "The hour of hardship",
      line: "On the way to Tabuk, two men shared one date.",
      facts: ["Little rain, great heat", "Allah forgave them"],
      quote: q9(117),
      source: ik(117, "Tabuk came in a year of little rain, intense heat and short supplies. Men shared a single date, and Allah forgave the Prophet ﷺ, the Muhajirun and the Ansar who followed him.", "It was a year with little rain, intense heat and scarcity of supplies and water"),
      difficulty: 3,
      questions: [
        { q: "What was the year of Tabuk like, per Mujahid?", a: "Little rain, great heat", wrong: ["Cold and snowy", "Rich and easy", "Rainy and green"], why: "A year with little rain, intense heat and scarcity of supplies and water." },
        { q: "How hungry were they, per Qatadah?", a: "Two men shared one date", wrong: ["They had feasts", "They ate meat daily", "They never ate"], why: "Two men used to divide a date between themselves." },
        { q: "9:117 calls it the hour of hardship.", tf: true, why: "Who followed him in the time of distress." }
      ]
    },
    {
      slug: "never-stronger",
      title: "Never stronger, yet he stayed",
      line: "Ka'b had two camels and strength, yet he kept delaying.",
      facts: ["Delay turned into missing it", "Do good while you can"],
      quote: q9(118),
      source: hadith("bukhari", "4418", "Ka'b ibn Malik", "Sahih", "Ka'b ibn Malik said he was never stronger or wealthier than when he stayed behind from Tabuk; he had two she-camels for the first time.", "I had never been stronger or wealthier than I was when I remained behind"),
      difficulty: 3,
      questions: [
        { q: "How was Ka'b when he stayed behind?", a: "Stronger and richer than ever", wrong: ["Very sick", "Very poor", "Very old"], why: "I had never been stronger or wealthier than I was." },
        { q: "How many she-camels did Ka'b have then?", a: "Two", wrong: ["None", "Ten", "One hundred"], why: "Never had I two she-camels before, but I had then." },
        { q: "The lesson is not to delay good deeds.", tf: true, why: "He had the means, yet he stayed behind." }
      ]
    },
    {
      slug: "saved-by-the-truth",
      title: "Saved by telling the truth",
      line: "Ka'b told the truth instead of an excuse, and Allah saved him.",
      facts: ["Fifty nights of waiting", "No lie, only truth"],
      quote: q9(118),
      source: ik(118, "Ka'b refused to make a false excuse and told the truth. After fifty hard nights Allah forgave the three. Ka'b said: Allah saved me for telling the truth.", "Allah has saved me for telling the truth"),
      difficulty: 4,
      questions: [
        { q: "Why was Ka'b saved, in his own words?", a: "He told the truth", wrong: ["He was rich", "He hid away", "He had friends"], why: "Allah has saved me for telling the truth." },
        { q: "How long did the three wait, per Ka'b?", a: "Fifty nights", wrong: ["Three nights", "One year", "Forty years"], why: "We remained in that condition for fifty nights." },
        { q: "9:118 says the earth felt narrow to them.", tf: true, why: "For them the earth, vast as it is, was straitened." }
      ]
    },
    {
      slug: "with-the-truthful",
      title: "Be with the truthful",
      line: "Fear Allah and stay with those who are truthful.",
      facts: ["Truth leads to good", "Good leads to Paradise"],
      quote: q9(119),
      source: hadith("bukhari", "6094", "Abdullah ibn Masud", "Sahih", "The Prophet ﷺ said truthfulness leads to righteousness and righteousness to Paradise; a man keeps telling the truth until he becomes truthful.", "Truthfulness leads to righteousness, and righteousness leads to Paradise"),
      difficulty: 4,
      questions: [
        { q: "What does 9:119 tell believers to do?", a: "Be with the truthful", wrong: ["Be with the rich", "Be alone", "Be with poets"], why: "Have Taqwa of Allah, and be with those who are true." },
        { q: "Where does truthfulness lead, per the hadith?", a: "To righteousness", wrong: ["To wealth", "To fame", "To trouble"], why: "Truthfulness leads to righteousness." },
        { q: "Telling the truth again and again makes a person truthful.", tf: true, why: "A man keeps on telling the truth until he becomes a truthful person." }
      ]
    },
    {
      slug: "truthful-inside-and-out",
      title: "Truthful inside and out",
      line: "The truthful are true in words, in deeds and in their states.",
      facts: ["As-Sa'di explains", "Sidq"],
      quote: q9(119),
      source: saadi(9, 119, "As-Sa'di says be with the truthful, whose words are true and whose deeds and states are only true, free of laziness and slackness, safe from bad aims, and full of sincerity and good intention, for truthfulness leads to righteousness, and righteousness leads to Paradise.", "الذين أقوالهم صدق، وأعمالهم، وأحوالهم لا تكون إلا صدقا"),
      difficulty: 2,
      questions: [
        { q: "In what are the truthful true, per as-Sa'di on 9:119?", a: "Words, deeds and states", wrong: ["Only words", "Only looks", "Only dreams"], why: "Their words, deeds and states are all true." },
        { q: "Where does truthfulness lead, per as-Sa'di on 9:119?", a: "To righteousness, then Paradise", wrong: ["To wealth", "To fame", "To nothing"], why: "Truthfulness leads to righteousness, and righteousness to Paradise." },
        { tf: true, q: "True deeds are free of laziness and bad aims.", why: "As-Sa'di on 9:119." }
      ]
    },
    {
      slug: "every-step-written",
      title: "Every step is written",
      line: "Thirst, tiredness and every step for Allah are written as good.",
      facts: ["Thirst, tiredness, hunger", "No good is wasted"],
      quote: q9(120),
      source: ik(120, "No thirst, tiredness or hunger in Allah's cause, nor any step or valley crossed, but it is written as a good deed. Allah does not waste the reward of those who do good.", "is written to their credit"),
      difficulty: 4,
      questions: [
        { q: "What does Allah write for each hardship in His cause?", a: "A good deed", wrong: ["Nothing", "A warning", "A fine"], why: "But is written to their credit as a deed of righteousness." },
        { q: "What does zama' mean, per Ibn Kathir?", a: "Thirst", wrong: ["Sleep", "Joy", "Rain"], why: "Zama: thirst." },
        { q: "Allah wastes the reward of those who do good.", tf: false, why: "Surely, Allah wastes not the reward of the doers of good." }
      ]
    },
    {
      slug: "learn-the-religion",
      title: "Some must stay to learn",
      line: "Not everyone goes out; some must learn the religion and teach.",
      facts: ["Learn, then warn", "Understanding is a gift"],
      quote: q9(122),
      source: hadith("bukhari", "71", "Mu'awiyah", "Sahih", "The Prophet ﷺ said: if Allah wants good for a person, He gives him understanding of the religion. I only distribute; Allah is the One who gives.", "If Allah wants to do good to a person, He makes him comprehend the religion"),
      difficulty: 4,
      questions: [
        { q: "Why should a group stay back, in 9:122?", a: "To learn the religion", wrong: ["To rest", "To trade", "To farm"], why: "That they may get instructions in religion." },
        { q: "What does Allah give someone He wants good for?", a: "Understanding of the religion", wrong: ["A big house", "Many camels", "Fame"], why: "He makes him comprehend the religion." },
        { q: "Those who learn should warn their people when they return.", tf: true, why: "And that they may warn their people when they return to them." }
      ]
    },
    {
      slug: "knowledge-is-for-sharing",
      title: "Knowledge is for sharing",
      line: "Spreading knowledge is a blessing and reward for the scholar.",
      facts: ["As-Sa'di explains", "Spreading knowledge"],
      quote: q9(122),
      source: saadi(9, 122, "As-Sa'di says the ayah shows the virtue of knowledge, above all understanding the religion, and that whoever learns must spread it and advise people, for knowledge spreading from a scholar is part of his blessing and reward that keeps growing; a scholar who keeps it to himself, his knowledge dies with him.", "فإن انتشار العلم عن العالم، من بركته وأجره"),
      difficulty: 2,
      questions: [
        { q: "What must a learner do with knowledge, per as-Sa'di on 9:122?", a: "Spread it and advise people", wrong: ["Hide it", "Sell it", "Forget it"], why: "Whoever learns must spread it and teach others." },
        { q: "What happens to a scholar who keeps knowledge to himself, per as-Sa'di?", a: "His knowledge dies with him", wrong: ["It grows anyway", "He gets more reward", "Nothing at all"], why: "When he dies, his knowledge and its fruit die too." },
        { tf: true, q: "Understanding the religion is among the most important matters.", why: "As-Sa'di on 9:122." }
      ]
    },
    {
      slug: "someone-for-every-need",
      title: "Someone for every need",
      line: "Muslims should prepare people to take care of each shared need.",
      facts: ["As-Sa'di explains", "Serving the Ummah"],
      quote: q9(122),
      source: saadi(9, 122, "As-Sa'di says the ayah also gives a fine lesson: Muslims should prepare, for every one of their shared needs, people who take it on, give it their time and work hard at it, not turning to other things, so that all their interests are cared for.", "أن المسلمين ينبغي لهم أن يعدوا لكل مصلحة من مصالحهم العامة من يقوم بها"),
      difficulty: 3,
      questions: [
        { q: "Why should not every believer go out at once, per as-Sa'di on 9:122?", a: "Other needs would be lost", wrong: ["They were lazy", "It was forbidden", "No one cared"], why: "If all went, much hardship would come and other needs would be lost." },
        { q: "What should Muslims prepare for each shared need, per as-Sa'di?", a: "People who take it on", wrong: ["Nothing at all", "Only money", "Only buildings"], why: "Each shared need should have people who work hard at it." },
        { tf: true, q: "Some believers stayed back to learn the religion and teach their people.", why: "As-Sa'di on 9:122." }
      ]
    },
    {
      slug: "faith-increases",
      title: "Faith goes up",
      line: "Each surah increased the believers in faith, and they rejoiced.",
      facts: ["Faith can rise and fall", "The Quran is a healing"],
      quote: q9(124),
      source: ik(124, "When a surah came down, it increased the believers in faith and they rejoiced. Ibn Kathir says this is one of the strongest proofs that faith increases and decreases.", "faith increases and decreases"),
      difficulty: 5,
      questions: [
        { q: "What did each new surah do for believers, in 9:124?", a: "Increased their faith", wrong: ["Made them bored", "Made them doubt", "Changed nothing"], why: "As for those who believe, it has increased their faith." },
        { q: "What does 9:124 prove, per Ibn Kathir?", a: "Faith goes up and down", wrong: ["Faith never changes", "Faith is only words", "Faith is wealth"], why: "One of the mightiest evidences that faith increases and decreases." },
        { q: "The same surah added doubt to diseased hearts.", tf: true, why: "It will add Rijs (doubt) to their Rijs." }
      ]
    },
    {
      slug: "tested-every-year",
      title: "Tested once or twice a year",
      line: "Trials come to wake us up, so we repent and learn.",
      facts: ["Learn from each trial", "Turn back to Allah"],
      quote: q9(126),
      source: ik(126, "The hypocrites are tested once or twice every year, yet they neither repent of past sins nor learn a lesson for the future. Mujahid said they were tested with drought and hunger.", "They neither repent from their previous sins nor learn a lesson for the future"),
      difficulty: 5,
      questions: [
        { q: "How often are they tested, in 9:126?", a: "Once or twice a year", wrong: ["Once a lifetime", "Never", "Every hour"], why: "They are put in trial once or twice every year." },
        { q: "What should a trial lead us to, per 9:126?", a: "Repentance and a lesson", wrong: ["Anger", "Giving up", "Blaming others"], why: "Yet, they turn not in repentance, nor do they learn a lesson." },
        { q: "Mujahid said they were tested with drought and hunger.", tf: true, why: "Mujahid said that hypocrites are tested with drought and hunger." }
      ]
    },
    {
      slug: "a-messenger-from-you",
      title: "A Messenger from among you",
      line: "A Messenger came from among you, speaking your language.",
      facts: ["Known for truth and honesty", "From your own people"],
      quote: q9(128),
      source: ik(128, "Allah sent a Messenger from among them, speaking their language. Ja'far told the Negus: Allah sent us a Messenger whose family, life, truth and honesty we know.", "whose family lineage , description, early days, truth and honesty we know"),
      difficulty: 5,
      questions: [
        { q: "Where did the Messenger ﷺ come from, in 9:128?", a: "From among yourselves", wrong: ["From far away", "From the angels", "From the jinn"], why: "There has come unto you a Messenger from among yourselves." },
        { q: "What did Ja'far tell the Negus they knew about him ﷺ?", a: "His family, truth and honesty", wrong: ["Only his name", "Only his wealth", "Nothing at all"], why: "Whose family lineage, description, early days, truth and honesty we know." },
        { q: "Ibrahim prayed for a Messenger from among them (2:129).", tf: true, why: "Our Lord! Send among them a Messenger of their own." }
      ]
    },
    {
      slug: "he-cares-for-you",
      title: "Your hardship grieves him",
      line: "Your hardship grieves him ﷺ; he is kind and merciful to you.",
      facts: ["He is eager for your good", "This religion is easy"],
      quote: q9(128),
      source: ik(128, "Whatever is hard on his Ummah grieves him. He is eager for their guidance and good, and kind and merciful to the believers. An authentic hadith says this religion is easy.", "Whatever would cause hardship to his Ummah or be difficult for them, then it grieves him"),
      difficulty: 5,
      questions: [
        { q: "What grieves the Prophet ﷺ, in 9:128?", a: "Any hardship you face", wrong: ["Your wealth", "Your joy", "Your rest"], why: "It grieves him that you should receive any injury or difficulty." },
        { q: "How is he ﷺ to the believers, in 9:128?", a: "Kind and merciful", wrong: ["Harsh and cold", "Distant", "Careless"], why: "For the believers he is full of pity, kind, and merciful." },
        { q: "An authentic hadith says this religion is easy.", tf: true, why: "Verily, this religion is easy." }
      ]
    },
    {
      slug: "allah-is-enough-for-me",
      title: "Allah is enough for me",
      line: "If they turn away, say: Allah is enough for me.",
      facts: ["Hasbiyallah", "Lord of the Mighty Throne"],
      quote: q9(129),
      source: ik(129, "The surah ends: if they turn away, say Allah is sufficient for me, there is no god but He, in Him I trust, and He is the Lord of the Mighty Throne.", "Allah is sufficient for me"),
      difficulty: 5,
      questions: [
        { q: "What should one say when people turn away, in 9:129?", a: "Allah is enough for me", wrong: ["I give up", "I am alone", "I will get angry"], why: "Say: Allah is sufficient for me." },
        { q: "Whose Lord is Allah called, at the end of 9:129?", a: "Lord of the Mighty Throne", wrong: ["Lord of the East", "Lord of the sea", "Lord of the city"], why: "He is the Lord of the Mighty Throne." },
        { q: "9:129 is the last ayah of At-Tawbah.", tf: true, why: "At-Tawbah has 129 ayahs." }
      ]
    }
  ]
};

export const TAWBAH_UNITS: readonly DeepUnit[] = [TAWBAH_ONE, TAWBAH_TWO, TAWBAH_THREE, TAWBAH_FOUR, TAWBAH_FIVE];
