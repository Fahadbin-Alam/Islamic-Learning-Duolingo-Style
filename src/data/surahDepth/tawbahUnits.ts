import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

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

export const TAWBAH_UNITS: readonly DeepUnit[] = [TAWBAH_ONE, TAWBAH_TWO];
