import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Al-A'la ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-A'la 87:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_87_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-A'la 87:${ayah}`,
    url: `https://quran.com/87:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 87:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q87 = (ayah: number) => quranQuote(87, ayah);


/** Ayahs 1 to 8: glorify your Lord, Who created, measured and guided, and Who keeps the Quran in the heart of His Messenger. */
const ALA_ONE: DeepUnit = {
  key: "ala1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-87",
  name: "Al-A'la, ayahs 1-8",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-A'la",
  lessons: [
    {
      slug: "glorify-your-lord",
      title: "Glorify your Lord, the Most High",
      line: "Glorify your Lord's name; we answer: Subhana Rabbiyal A'la.",
      facts: ["Sabbih: glorify", "Al-A'la: the Most High"],
      quote: q87(1),
      source: ik(1, "Ibn Abbas reported that when the Prophet ﷺ recited 87:1 he would say: Glory to my Lord, the Most High.", "Glory to my Lord, the Most High"),
      difficulty: 1,
      questions: [
        { q: "What does 87:1 command?", a: "Glorify the Name of your Lord", wrong: ["Count the stars", "Build a house", "Travel far"], why: "Glorify the Name of your Lord, the Most High." },
        { q: "What would he say after reciting 87:1?", a: "Glory to my Lord, the Most High", wrong: ["Peace be upon you", "Allah is One", "Thank you"], why: "He would say, Glory to my Lord, the Most High." },
        { tf: true, q: "We say Subhana Rabbiyal A'la in every sujood.", why: "Glory to my Lord, the Most High." }
      ]
    },
    {
      slug: "the-surah-of-eid-and-jumuah",
      title: "A surah for Eid and Jumuah",
      line: "Muhammad ﷺ recited Al-A'la and Al-Ghashiyah at Eid and Jumuah.",
      facts: ["Sunnah for Eid and Friday", "Al-A'la then Al-Ghashiyah"],
      quote: q87(1),
      source: ik(1, "Muslim records from An-Numan ibn Bashir that he ﷺ recited Al-A'la and Al-Ghashiyah in the two Eids and on Friday.", "If they occurred on the same day, he would recite them in both of them"),
      difficulty: 2,
      questions: [
        { q: "Which surah did he pair with Al-A'la at Eid?", a: "Al-Ghashiyah", wrong: ["Al-Baqarah", "Yasin", "Al-Kahf"], why: "Surat Al-A'la and Surat Al-Ghashiyah for the two Ids and Jumuah." },
        { q: "What if Eid fell on a Friday?", a: "He recited them in both prayers", wrong: ["He skipped Jumuah", "He recited nothing", "He chose other surahs"], why: "If they occurred on the same day, he would recite them in both of them." },
        { tf: true, q: "Reading Al-A'la at Eid follows the Sunnah.", why: "He used to recite Surat Al-A'la and Surat Al-Ghashiyah for the two Ids and Jumuah." }
      ]
    },
    {
      slug: "learned-before-the-prophet-came",
      title: "Learned before he arrived",
      line: "Al-A'la was learned in Madinah even before Muhammad ﷺ arrived.",
      facts: ["A Makkan surah", "Musab taught the Quran"],
      quote: q87(1),
      source: ik(1, "Al-Bara said Musab and Ibn Umm Maktum taught them the Quran, and he had learned Al-A'la before the Prophet ﷺ arrived.", "I have not seen the people of Al-Madinah happier with anything"),
      difficulty: 3,
      questions: [
        { q: "Who first came to teach the Quran?", a: "Musab ibn Umayr and Ibn Umm Maktum", wrong: ["Abu Bakr and Umar", "Ali and Uthman", "No one"], why: "The first people to come to us were Musab bin Umayr and Ibn Umm Maktum, who taught us the Quran." },
        { q: "What did the children say when he came?", a: "The Messenger of Allah has come", wrong: ["A king has come", "A trader has come", "Go home"], why: "I saw the children and little ones saying, This is the Messenger of Allah who has come." },
        { tf: false, q: "Al-A'la was revealed in Madinah.", why: "This Surah was revealed in Makkah before the migration to Al-Madinah." }
      ]
    },
    {
      slug: "created-and-proportioned",
      title: "Created and proportioned",
      line: "Allah created everything and shaped each in the best form.",
      facts: ["Khalaqa: created", "Sawwa: proportioned"],
      quote: q87(2),
      source: ik(2, "Ibn Kathir says Allah created all that is created and fashioned every creation in the best of forms.", "He fashioned every creation in the best of forms"),
      difficulty: 1,
      questions: [
        { q: "What did Allah do, per 87:2?", a: "Created, then proportioned", wrong: ["Broke, then fixed", "Forgot, then found", "Slept, then woke"], why: "Who has created, and then proportioned it." },
        { q: "In what form did He make each creation?", a: "The best of forms", wrong: ["A random form", "An ugly form", "No form"], why: "He fashioned every creation in the best of forms." },
        { tf: true, q: "Every creature is shaped by Allah.", why: "He created that which has been created, and He fashioned every creation." }
      ]
    },
    {
      slug: "measured-and-guided",
      title: "Measured, then guided",
      line: "Allah set a measure for each thing and guided it.",
      facts: ["Qaddara: measured", "Fahada: then guided"],
      quote: q87(3),
      source: ik(3, "Mujahid said Allah guided man to his path, and guided the cattle to their pastures, as in 20:50.", "he guided the cattle to their pastures"),
      difficulty: 2,
      questions: [
        { q: "What did Allah do, per 87:3?", a: "Measured, then guided", wrong: ["Waited, then left", "Built, then broke", "Wrote, then erased"], why: "And Who has measured; and then guided." },
        { q: "Where did He guide the cattle, per Mujahid?", a: "To their pastures", wrong: ["To the sea", "To the city", "To the sky"], why: "He guided the cattle to their pastures." },
        { q: "Who said the similar words of 20:50?", a: "Musa, to Fir'awn", wrong: ["Nuh, to his son", "Isa, to the disciples", "Yusuf, to the king"], why: "Our Lord is He Who gave to each thing its form and nature, then guided it aright." }
      ]
    },
    {
      slug: "measures-written-long-ago",
      title: "Measures written long ago",
      line: "Allah wrote all measures before the heavens and earth.",
      facts: ["Qadar: Allah's decree", "His Throne was over the water"],
      quote: q87(3),
      source: hadith("muslim", "2653", "Abdullah ibn Amr", "Sahih", "The Prophet ﷺ said Allah wrote the measures of creation fifty thousand years before He created the heavens and the earth, while His Throne was on the water.", "fifty thousand years before He created the heavens and the earth"),
      difficulty: 3,
      questions: [
        { q: "When did Allah ordain the measures?", a: "50,000 years before the heavens and earth", wrong: ["Yesterday", "After people came", "Never"], why: "Allah ordained the measure of all creation fifty thousand years before He created the heavens and the earth." },
        { q: "Where was His Throne then?", a: "Over the water", wrong: ["On a mountain", "In a garden", "Under the earth"], why: "And His Throne was over the water." },
        { tf: false, q: "Allah learns what will happen as it happens.", why: "Allah ordained the measure of all creation fifty thousand years before He created the heavens and the earth." }
      ]
    },
    {
      slug: "green-pasture-to-dry-stubble",
      title: "Green pasture to dry stubble",
      line: "Allah brings out green plants, then turns them dry and dark.",
      facts: ["Mar'a: pasture", "Ghutha'an ahwa: dark stubble"],
      quote: q87(4),
      source: ik(5, "Ibn Abbas said dark stubble means dried up and altered; Mujahid and Qatadah said the same.", "Dried up and altered"),
      difficulty: 2,
      questions: [
        { q: "What does Allah bring out, per 87:4?", a: "The pasturage", wrong: ["Gold", "Rocks", "Fire"], why: "And Who brings out the pasturage." },
        { q: "What does He then make it, per 87:5?", a: "Dark stubble", wrong: ["A forest", "A river", "Gold"], why: "And then makes it dark stubble." },
        { tf: true, q: "Plants turning dry reminds us that this world fades.", why: "Ibn Abbas said, Dried up and altered." }
      ]
    },
    {
      slug: "you-shall-not-forget",
      title: "You shall not forget",
      line: "Allah promised Muhammad ﷺ he would not forget the Quran.",
      facts: ["Sanuqri'uk: We will make you recite", "Allah protects the Quran"],
      quote: q87(6),
      source: ik(6, "Ibn Kathir says Allah promised to teach him a recitation he would not forget, except what Allah willed.", "a recitation that he will not forget"),
      difficulty: 2,
      questions: [
        { q: "What did Allah promise in 87:6?", a: "You shall not forget", wrong: ["You will be rich", "You will rule", "You will rest"], why: "We shall make you recite, so you shall not forget." },
        { q: "What exception does 87:7 give?", a: "Except what Allah may will", wrong: ["Except on Fridays", "Except at night", "Except long surahs"], why: "Except what Allah may will." },
        { q: "What did Qatadah say he forgot?", a: "Nothing except what Allah willed", wrong: ["Many surahs", "Half the Quran", "Every ayah"], why: "The Prophet ﷺ did not forget anything except what Allah willed." }
      ]
    },
    {
      slug: "he-knows-the-open-and-hidden",
      title: "He knows the open and hidden",
      line: "Allah knows what we show and what we hide.",
      facts: ["Al-Jahr: the open", "Ma yakhfa: what is hidden"],
      quote: q87(7),
      source: ik(7, "Ibn Kathir says Allah knows what creatures do openly and what they hide; none of that is hidden from Him.", "None of that is hidden from Him"),
      difficulty: 2,
      questions: [
        { q: "What does Allah know, per 87:7?", a: "What is apparent and what is hidden", wrong: ["Only the open", "Only the past", "Only words"], why: "He knows what is apparent and what is hidden." },
        { q: "Does His knowledge include deeds and words?", a: "Yes, both", wrong: ["Only deeds", "Only words", "Neither"], why: "Whether it be statements or deeds. None of that is hidden from Him." },
        { tf: false, q: "What we do in secret is hidden from Allah.", why: "He knows what the creatures do openly and what they hide." }
      ]
    },
    {
      slug: "we-make-it-easy",
      title: "We make it easy for you",
      line: "Allah made His religion easy, fair and straight.",
      facts: ["Yusra: ease", "Islam is not hardship"],
      quote: q87(8),
      source: ik(8, "Ibn Kathir says Allah made good deeds easy and gave a Law that is easy, tolerant, straight and just.", "easy, tolerant, straight and just"),
      difficulty: 2,
      questions: [
        { q: "What does Allah promise in 87:8?", a: "To make easy the easy", wrong: ["To make life hard", "To leave him alone", "To end the world"], why: "And We shall make easy for you the easy." },
        { q: "How is the Law described, per Ibn Kathir?", a: "Easy, tolerant, straight and just", wrong: ["Heavy and strict", "Hidden and secret", "Changing daily"], why: "We will legislate such Law for you that is easy, tolerant, straight and just." },
        { tf: true, q: "Islam has no crookedness or needless hardship.", why: "With no crookedness, difficulty or hardship in it." }
      ]
    }
  ]
};

/** Ayahs 9 to 19: remind where it helps, the one who fears takes heed, success through purity, and the lasting Hereafter. */
const ALA_TWO: DeepUnit = {
  key: "ala2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-87",
  name: "Al-A'la, ayahs 9-19",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-A'la",
  lessons: [
    {
      slug: "remind-where-it-helps",
      title: "Remind where it helps",
      line: "Allah tells us to remind people where reminding does good.",
      facts: ["Dhakkir: remind", "Choose the right moment"],
      quote: q87(9),
      source: ik(9, "Ibn Kathir says: remind where reminding is beneficial; knowledge should not be wasted on those not ready for it.", "remind where reminding is beneficial"),
      difficulty: 2,
      questions: [
        { q: "What does 87:9 command?", a: "Remind, in case it profits", wrong: ["Stay silent", "Argue always", "Leave people"], why: "Therefore remind in case the reminder profits." },
        { q: "What manner of teaching do we learn, per Ibn Kathir?", a: "Spread knowledge where it helps", wrong: ["Hide all knowledge", "Shout at everyone", "Only teach the rich"], why: "We get the etiquette of spreading knowledge." },
        { tf: true, q: "A good reminder suits the person and the time.", why: "Remind where reminding is beneficial." }
      ]
    },
    {
      slug: "speak-at-their-level",
      title: "Speak at their level",
      line: "Ali said: tell people what they can understand.",
      facts: ["Hikmah: wisdom", "Teach step by step"],
      quote: q87(9),
      source: ik(9, "Ali said a statement beyond people's understanding becomes a trial for some, so tell people what they know.", "Tell people that which they know"),
      difficulty: 3,
      questions: [
        { q: "What did Ali advise?", a: "Tell people what they know", wrong: ["Tell them riddles", "Say nothing", "Use hard words"], why: "Tell people that which they know." },
        { q: "What can a hard saying become for some?", a: "A trial", wrong: ["A gift", "A song", "A game"], why: "You do not tell people any statement that their intellects do not grasp except that it will be a Fitnah for some of them." },
        { tf: false, q: "Teachers should use words people cannot understand.", why: "Would you like for Allah and His Messenger to be rejected?" }
      ]
    },
    {
      slug: "the-one-who-fears-takes-heed",
      title: "The one who fears takes heed",
      line: "Whoever fears Allah and his meeting with Him takes heed.",
      facts: ["Yakhsha: fears", "Soft hearts listen"],
      quote: q87(10),
      source: ik(10, "Ibn Kathir says the one whose heart fears Allah and knows he will meet Him benefits from the reminder.", "he whose heart fears Allah"),
      difficulty: 2,
      questions: [
        { q: "Who receives the reminder, per 87:10?", a: "Him who fears", wrong: ["Him who is rich", "Him who is proud", "No one"], why: "The reminder will be received by him who fears." },
        { q: "What does he know, per Ibn Kathir?", a: "That he will meet Allah", wrong: ["Every secret", "The future", "Nothing"], why: "He whose heart fears Allah and who knows that he is going to meet Him." },
        { tf: true, q: "A heart that fears Allah benefits from advice.", why: "He whose heart fears Allah will receive admonition." }
      ]
    },
    {
      slug: "the-wretched-turn-away",
      title: "The wretched turn away",
      line: "The wretched avoid the reminder and end in the great Fire.",
      facts: ["Al-Ashqa: the most wretched", "Turning away is a loss"],
      quote: q87(11),
      source: ik(13, "Ibn Kathir says in the Fire he will neither die and rest, nor live a life that benefits him.", "he will not die and thus be allowed to rest"),
      difficulty: 3,
      questions: [
        { q: "Who avoids the reminder, per 87:11?", a: "The wretched", wrong: ["The fearful", "The wise", "The young"], why: "But it will be avoided by the wretched." },
        { q: "Where will he enter, per 87:12?", a: "The great Fire", wrong: ["A great garden", "A palace", "His home"], why: "Who will enter the great Fire." },
        { q: "What does 87:13 say of him there?", a: "He will neither die nor live", wrong: ["He will rest", "He will leave soon", "He will sleep"], why: "There he will neither die nor live." }
      ]
    },
    {
      slug: "mercy-brings-them-out",
      title: "Mercy brings believers out",
      line: "Believers punished for sins are brought out and grow like seeds.",
      facts: ["Shafa'ah: intercession", "Allah's mercy is vast"],
      quote: q87(13),
      source: hadith("muslim", "185", "Abu Sa'id al-Khudri", "Sahih", "The Prophet ﷺ said the true people of the Fire neither die nor live in it. Believers touched by it for sins are brought out by intercession and grow anew by the rivers of Paradise.", "then they would sprout forth like the sprouting of seed"),
      difficulty: 4,
      questions: [
        { q: "Who neither die nor live in the Fire?", a: "Its true people", wrong: ["Every believer", "The angels", "No one"], why: "The people of the Fire who are deserving of it, they will not die nor will they live." },
        { q: "How are the sinful believers brought out?", a: "By intercession", wrong: ["By running", "By paying gold", "By force"], why: "Then the intercession will be allowed and they will be brought group after group." },
        { q: "How do they grow again?", a: "Like seeds by a flowing stream", wrong: ["Like stones", "Like smoke", "Like ice"], why: "Then they will sprout like the growing of the seed that is upon the moist bank of the flowing stream." }
      ]
    },
    {
      slug: "whoever-purifies-succeeds",
      title: "Whoever purifies succeeds",
      line: "Success is for those who clean their hearts from bad traits.",
      facts: ["Tazakka: purified himself", "Aflaha: succeeded"],
      quote: q87(14),
      source: ik(14, "Ibn Kathir says he purifies himself from bad traits and follows what Allah revealed to the Messenger ﷺ.", "he purifies himself from despised characteristics"),
      difficulty: 2,
      questions: [
        { q: "Who achieves success, per 87:14?", a: "Whoever purifies himself", wrong: ["Whoever is famous", "Whoever is strong", "Whoever is loud"], why: "Indeed whosoever purifies himself shall achieve success." },
        { q: "What did Qatadah say he purifies?", a: "His wealth", wrong: ["His clothes only", "His house", "His car"], why: "He purifies his wealth and pleases his Creator." },
        { tf: true, q: "Purifying ourselves from bad traits leads to success.", why: "He purifies himself from despised characteristics." }
      ]
    },
    {
      slug: "remembers-and-prays",
      title: "Remembers Allah and prays",
      line: "The successful remember Allah and pray on time.",
      facts: ["Dhikr: remembering Allah", "Salah on time"],
      quote: q87(15),
      source: ik(15, "Ibn Kathir says he establishes the prayer on time, seeking Allah's pleasure; Umar ibn Abdul-Aziz linked it to Zakat al-Fitr.", "he establishes the prayer in its appointed time"),
      difficulty: 2,
      questions: [
        { q: "What does the successful one do, per 87:15?", a: "Remembers his Lord and prays", wrong: ["Sleeps and eats", "Buys and sells", "Plays and laughs"], why: "And remembers the Name of his Lord, and performs Salah." },
        { q: "How does he pray, per Ibn Kathir?", a: "In its appointed time", wrong: ["Whenever he likes", "Once a year", "Never"], why: "He establishes the prayer in its appointed time." },
        { q: "Which charity did Umar ibn Abdul-Aziz link to it?", a: "Sadaqat al-Fitr", wrong: ["A wedding gift", "A trade tax", "A loan"], why: "He used to command the people to give the Sadaqat Al-Fitr, and he would recite this Ayah." }
      ]
    },
    {
      slug: "prayer-the-scale-of-faith",
      title: "Prayer, the scale of faith",
      line: "A heart full of Allah's remembrance shows itself in prayer.",
      facts: ["As-Sa'di explains", "Salah measures iman"],
      quote: q87(15),
      source: saadi(87, 15, "As-Sa'di says when remembering Allah fills the heart, it leads to deeds that please Him, above all the prayer, which is the scale of faith.", "خصوصًا الصلاة، التي هي ميزان الإيمان"),
      difficulty: 2,
      questions: [
        { q: "As-Sa'di calls prayer the scale of...?", a: "Faith", wrong: ["Wealth", "Strength", "Age"], why: "Prayer is the scale of iman. As-Sa'di on 87:15." },
        { q: "What does a heart full of dhikr lead to?", a: "Deeds that please Allah", wrong: ["Laziness", "Pride", "Nothing"], why: "Above all, the prayer." },
        { tf: false, q: "Al-A'la 87:15 is only about the Eid prayer.", why: "Eid is included, but it is not the only meaning, says as-Sa'di." }
      ]
    },
    {
      slug: "you-prefer-this-world",
      title: "You prefer this world",
      line: "People put this world first, chasing its short benefits.",
      facts: ["Tu'thirun: you prefer", "Ad-Dunya: this world"],
      quote: q87(16),
      source: ik(16, "Ibn Kathir says people give this world precedence over the Hereafter for its income and benefits.", "you give it precedence over the matter of the Hereafter"),
      difficulty: 2,
      questions: [
        { q: "What do people prefer, per 87:16?", a: "The life of this world", wrong: ["The Hereafter", "Prayer", "Charity"], why: "Rather you prefer the life of this world." },
        { q: "Why do they prefer it, per Ibn Kathir?", a: "For its income and benefits", wrong: ["Because it lasts forever", "Because it is holy", "No reason"], why: "Because of what it contains of usefulness and benefit for you in livelihood." },
        { tf: false, q: "Putting this world first is wise.", why: "You give it precedence over the matter of the Hereafter." }
      ]
    },
    {
      slug: "better-and-more-lasting",
      title: "Better and more lasting",
      line: "The Hereafter is better than this world and lasts forever.",
      facts: ["Khayr: better", "Abqa: more lasting"],
      quote: q87(17),
      source: ik(17, "Ibn Kathir asks how a wise person can choose the short-lived over the eternal.", "this worldly life is lowly and temporal, whereas the Hereafter is noble and eternal"),
      difficulty: 2,
      questions: [
        { q: "How is the Hereafter described in 87:17?", a: "Better and more lasting", wrong: ["Shorter", "Weaker", "Smaller"], why: "Although the Hereafter is better and more lasting." },
        { q: "How does Ibn Kathir describe this world?", a: "Lowly and temporal", wrong: ["Eternal", "Perfect", "Noble"], why: "This worldly life is lowly and temporal, whereas the Hereafter is noble and eternal." },
        { tf: true, q: "A wise person chooses what lasts over what fades.", why: "How can an intelligent person prefer that which is short-lived over that which is eternal." }
      ]
    },
    {
      slug: "an-hour-for-forever",
      title: "An hour for forever",
      line: "A wise believer never trades an hour of fun for lasting sorrow.",
      facts: ["As-Sa'di explains", "Choose the better"],
      quote: q87(17),
      source: saadi(87, 17, "As-Sa'di says the Hereafter is better in every way and lasts, so a wise believer does not pick the worse, nor sell an hour of pleasure for lasting sorrow.", "ولا يبيع لذة ساعة، بترحة الأبد"),
      difficulty: 2,
      questions: [
        { q: "What does a wise believer never sell?", a: "Forever for one hour", wrong: ["His old shoes", "Extra food", "Spare time"], why: "He does not sell lasting joy for an hour of pleasure, says as-Sa'di." },
        { q: "How is the Hereafter better?", a: "In every way", wrong: ["Only in size", "In no way", "Only in colour"], why: "Better in every wanted quality, and lasting." },
        { tf: true, q: "This world is a home that ends.", why: "The Hereafter is the home of forever. As-Sa'di on 87:17." }
      ]
    },
    {
      slug: "scriptures-of-ibrahim-and-musa",
      title: "Scriptures of Ibrahim and Musa",
      line: "The same message was in the scriptures of Ibrahim and Musa.",
      facts: ["Suhuf: scriptures", "One message from Allah"],
      quote: q87(19),
      source: ik(19, "Abu Aliyah said the story of this surah is in the earlier Scriptures; Ibn Jarir said success and the lasting Hereafter.", "The story of this Surah is in the earlier Scriptures"),
      difficulty: 3,
      questions: [
        { q: "Where else is this message, per 87:18?", a: "In the former Scriptures", wrong: ["In poems", "In songs", "Nowhere"], why: "Verily, this is in the former Scripture." },
        { q: "Whose Scriptures does 87:19 name?", a: "Ibrahim and Musa", wrong: ["Nuh and Hud", "Dawud and Sulayman", "Isa and Yahya"], why: "The Scriptures of Ibrahim and Musa." },
        { q: "Which surah has a similar passage, per Ibn Kathir?", a: "An-Najm, 53:36-42", wrong: ["Al-Fatihah", "Al-Ikhlas", "Al-Kawthar"], why: "This Ayah is similar to Allah's statement in Surat An-Najm." }
      ]
    }
  ]
};

export const ALA_UNITS: readonly DeepUnit[] = [ALA_ONE, ALA_TWO];
