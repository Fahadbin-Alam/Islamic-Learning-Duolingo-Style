import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Al-A'raf ayah by ayah, the way Ali 'Imran, An-Nisa, Al-Ma'idah and Al-An'am are taught: every ayah or small
// group of ayahs gets a lesson, explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a
// sahih hadith where one explains the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-A'raf 7:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_7_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-A'raf 7:${ayah}`,
    url: `https://quran.com/7:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 7:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q7 = (ayah: number) => quranQuote(7, ayah);

/** Ayahs 1 to 27: the Book sent down, the scales, Adam honored, Iblis's pride, the tree, and the clothing of taqwa. */
const ARAF_ONE: DeepUnit = {
  key: "araf1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-7",
  name: "Al-A'raf, ayahs 1 to 27",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-A'raf",
  lessons: [
    {
      slug: "no-tight-chest",
      title: "Let your chest not be tight",
      line: "The Quran came down; carry it without doubt or worry.",
      facts: ["Alif Lam Mim Sad", "A Makkan surah"],
      quote: q7(2),
      source: ik(2, "The Book was sent down to the Prophet ﷺ, so his chest should not feel tight with it. Mujahid, Qatadah and As-Suddi said this means having no doubt about it; it was also said: do not hold back from warning with it.", "having doubt about it according to Mujahid, Qatadah and As-Suddi"),
      difficulty: 2,
      questions: [
        { q: "Which letters open Al-A'raf?", a: "Alif Lam Mim Sad", wrong: ["Alif Lam Mim", "Ta Ha", "Ya Sin"], why: "Alif-Lam-Mim-Sad, four letters." },
        { q: "What should the chest not feel about the Book, per Mujahid?", a: "Doubt", wrong: ["Joy", "Love", "Peace"], why: "So let not your breast be narrow: no doubt about it." },
        { q: "The Quran is a warning to deniers and a reminder to believers.", tf: true, why: "That you warn thereby; and a reminder unto the believers." }
      ]
    },
    {
      slug: "follow-revealed",
      title: "Follow what came down",
      line: "Follow what your Lord sent down, not other protectors.",
      facts: ["Ittabi'u: follow", "Awliya: protectors"],
      quote: q7(3),
      source: ik(3, "Allah tells the world: follow the unlettered Prophet ﷺ who brought a Book from the Lord of everything. Do not leave what he brought for something else, or you leave Allah's judgment for someone else's.", "follow and imitate the unlettered Prophet ﷺ, who brought you a Book"),
      difficulty: 2,
      questions: [
        { q: "What are we told to follow, in 7:3?", a: "What came down from our Lord", wrong: ["Our forefathers", "Whatever is popular", "The chiefs"], why: "Ittabi'u ma unzila ilaykum min rabbikum." },
        { q: "Leaving what the Prophet ﷺ brought means following someone else's judgment.", tf: true, why: "Deviating from Allah's judgment to someone else's." },
        { q: "How does 7:3 end?", a: "Little do you remember", wrong: ["Allah is Most Forgiving", "Peace be upon you", "Allah is the Greatest"], why: "Qalilan ma tadhakkarun." }
      ]
    },
    {
      slug: "night-or-nap",
      title: "By night or at the midday nap",
      line: "Towns that denied were seized at night or at their midday rest.",
      facts: ["Bayatan: by night", "Qa'ilun: midday nap"],
      quote: q7(4),
      source: ik(4, "Many towns were destroyed for denying their messengers. The punishment came at night or at the midday nap, both times of rest and heedlessness. Their only cry was: we were wrongdoers.", "Both of these times are periods of rest and leisure or heedlessness and amusement"),
      difficulty: 3,
      questions: [
        { q: "When did the punishment come, in 7:4?", a: "At night or at the midday nap", wrong: ["Only at dawn", "Only in winter", "On Fridays"], why: "Bayatan aw hum qa'ilun." },
        { q: "What did they cry when it came, in 7:5?", a: "We were wrongdoers", wrong: ["We were right", "Help us, idols", "It is magic"], why: "Inna kunna zalimin." },
        { q: "Why are those two times named, per Ibn Kathir?", a: "They are times of rest and heedlessness", wrong: ["They are prayer times", "They are market times", "They are travel times"], why: "Periods of rest and leisure or heedlessness." }
      ]
    },
    {
      slug: "all-asked",
      title: "Everyone will be asked",
      line: "Allah will ask the nations and ask the messengers too.",
      facts: ["Nations: how did you answer?", "Messengers: did you convey?"],
      quote: q7(6),
      source: ik(6, "On the Day of Resurrection Allah will question the nations about how they answered His messengers, and question the messengers about whether they conveyed. Then He will tell them their whole story, for He was never absent.", "Allah will question the nations, on the Day of Resurrection, how they responded to His Messengers"),
      difficulty: 3,
      questions: [
        { q: "Who will be questioned, in 7:6?", a: "The nations and the messengers", wrong: ["Only the angels", "Only the kings", "No one"], why: "We shall question those to whom it was sent, and the messengers." },
        { q: "What will the messengers be asked, per Ibn Abbas?", a: "About what they conveyed", wrong: ["About their wealth", "About their age", "About their homes"], why: "Ibn Abbas: about what they conveyed." },
        { q: "Allah was absent from some of what people did.", tf: false, why: "Wa ma kunna gha'ibin: We were never absent." }
      ]
    },
    {
      slug: "true-scale",
      title: "The true weighing",
      line: "Deeds are weighed with justice; heavy scales mean success.",
      facts: ["Al-wazn: the weighing", "Al-haqq: the truth"],
      quote: q7(8),
      source: ik(8, "The weighing of deeds on the Day of Resurrection is true, and Allah will not wrong anyone. Whose scale is heavy succeeds; whose scale is light has lost himself. Ibn Kathir says deeds, records and even doers may all be weighed.", "for Allah will not wrong anyone"),
      difficulty: 2,
      questions: [
        { q: "Who succeeds, in 7:8?", a: "Those whose scales are heavy", wrong: ["Those with most money", "Those who are tallest", "Those who are loudest"], why: "Faman thaqulat mawazinuhu fa ula'ika humul-muflihun." },
        { q: "Allah will wrong some people on the scale.", tf: false, why: "Ibn Kathir: Allah will not wrong anyone." },
        { q: "What may be weighed, per Ibn Kathir?", a: "Deeds, records and even doers", wrong: ["Only gold", "Only words", "Nothing at all"], why: "He combines the hadith: all this will occur." }
      ]
    },
    {
      slug: "fills-scale",
      title: "A word that fills the scale",
      line: "Al-hamdu lillah fills the scale, said the Prophet ﷺ.",
      facts: ["Al-hamdu lillah", "Subhan Allah"],
      quote: q7(8),
      source: hadith("muslim", "223", "Abu Malik al-Ash'ari", "Sahih", "The Prophet ﷺ said: cleanliness is half of faith, al-hamdu lillah fills the scale, and subhan Allah and al-hamdu lillah fill what is between the heavens and the earth.", "al-Hamdu Lillah (all praise and gratitude is for Allah alone) fills the scale"),
      difficulty: 3,
      questions: [
        { q: "What fills the scale, in Muslim 223?", a: "Al-hamdu lillah", wrong: ["Gold coins", "Long speeches", "Fine clothes"], why: "Al-hamdu lillah fills the scale." },
        { q: "What is half of faith, in the same hadith?", a: "Cleanliness", wrong: ["Sleep", "Wealth", "Travel"], why: "Cleanliness is half of faith." },
        { q: "A short word of praise can weigh heavy on the scale.", tf: true, why: "That is why 7:8 and Muslim 223 go together." }
      ]
    },
    {
      slug: "earth-home",
      title: "A home on the earth",
      line: "Allah gave us homes and a living on earth; few thank Him.",
      facts: ["Ma'ayish: livelihoods", "Shukr: thanks"],
      quote: q7(10),
      source: ik(10, "Allah reminds His servants that He made the earth a settled home, with mountains, rivers, rain clouds, and ways of earning a living. Yet most of them give little thanks.", "Allah reminds of His favor on His servants in that He made the earth a fixed place for dwelling"),
      difficulty: 2,
      questions: [
        { q: "What did Allah give us on the earth, in 7:10?", a: "A place and livelihoods", wrong: ["Nothing at all", "Only hardship", "Only idols"], why: "Wa ja'alna lakum fiha ma'ayish." },
        { q: "How much do people thank, in 7:10?", a: "Little", wrong: ["Always fully", "Too much", "Never asked to"], why: "Qalilan ma tashkurun." },
        { q: "Trade and work are part of Allah's favors, per Ibn Kathir.", tf: true, why: "He created the ways and means of earnings." }
      ]
    },
    {
      slug: "angels-bow",
      title: "The angels bow to Adam",
      line: "Allah shaped Adam, and the angels bowed; Iblis refused.",
      facts: ["Sujud: prostration", "Iblis refused"],
      quote: q7(11),
      source: ik(11, "Allah tells the children of Adam how He honored their father and how Shaytan envies them, so they should beware of him. Allah created Adam, shaped him, and the angels bowed, all except Iblis.", "Allah informs the Children of Adam about the honor of their father and the enmity of Shaytan"),
      difficulty: 2,
      questions: [
        { q: "Who refused to bow to Adam, in 7:11?", a: "Iblis", wrong: ["Jibril", "Mika'il", "Every angel"], why: "Illa Iblis, lam yakun minas-sajidin." },
        { q: "What should we learn from this story, per Ibn Kathir?", a: "Beware of Shaytan", wrong: ["Fear the angels", "Avoid clay", "Never sleep"], why: "So they should beware of him." },
        { q: "The angels heard and obeyed.", tf: true, why: "Ibn Kathir: the angels all heard, obeyed and prostrated." }
      ]
    },
    {
      slug: "i-am-better",
      title: "I am better than him",
      line: "Iblis said: fire beats clay. His excuse was worse than his sin.",
      facts: ["Ana khayrun minh", "A false comparison"],
      quote: q7(12),
      source: ik(12, "Asked why he did not bow, Iblis said: I am better, made from fire, and he from clay. Ibn Kathir says this excuse was worse than the crime; Iblis looked at what Adam was made of, not at the honor Allah gave him.", "this excuse is worse than the crime itself"),
      difficulty: 3,
      questions: [
        { q: "What did Iblis claim, in 7:12?", a: "I am better than him", wrong: ["I am sorry", "I forgot", "I am weaker"], why: "Ana khayrun minh." },
        { q: "What did Iblis look at, per Ibn Kathir?", a: "What Adam was made of", wrong: ["Adam's honor from Allah", "Adam's knowledge", "Adam's prayers"], why: "He looked at the origin, not at the honor bestowed." },
        { q: "Iblis was made from fire.", tf: true, why: "Khalaqtani min nar." }
      ]
    },
    {
      slug: "pride-lowered",
      title: "Pride brought low",
      line: "Iblis wanted to be high; Allah made him low and disgraced.",
      facts: ["As-saghirin: the humbled", "Respite till the Day"],
      quote: q7(13),
      source: ik(13, "Allah sent Iblis down: there is no room for pride there. He got the opposite of what he wanted, disgrace instead of greatness. Then he asked for time until the Resurrection, and Allah gave it by His wisdom.", "by giving him the opposite of what he intended (arrogance)"),
      difficulty: 3,
      questions: [
        { q: "What did Iblis get, per Ibn Kathir?", a: "The opposite of what he wanted", wrong: ["Exactly what he wanted", "A high rank", "A new home in Paradise"], why: "Disgrace, the opposite of his arrogance." },
        { q: "What did Iblis ask for, in 7:14?", a: "Respite until the Resurrection", wrong: ["Forgiveness", "A second chance to bow", "Wealth"], why: "Anzirni ila yawmi yub'athun." },
        { q: "Allah gave Iblis respite out of His wisdom.", tf: true, why: "Allah gave Shaytan what he asked for out of His wisdom." }
      ]
    },
    {
      slug: "mustard-of-pride",
      title: "A mustard seed of pride",
      line: "Pride is rejecting the truth and looking down on people.",
      facts: ["Kibr: pride", "Allah loves beauty"],
      quote: q7(13),
      source: hadith("muslim", "91", "Abdullah ibn Mas'ud", "Sahih", "The Prophet ﷺ said that whoever has a mustard seed's weight of pride in his heart will not enter Paradise. Liking fine clothes is not pride: pride is rejecting the truth and looking down on people.", "Pride is disdaining the truth (out of self-conceit) and contempt for the people"),
      difficulty: 4,
      questions: [
        { q: "What is pride, in Muslim 91?", a: "Rejecting truth and scorning people", wrong: ["Wearing nice shoes", "Being tall", "Being rich"], why: "Pride is disdaining the truth and contempt for the people." },
        { q: "Wanting fine clothes is itself pride.", tf: false, why: "Allah is beautiful and He loves beauty." },
        { q: "Whose sin was the first pride?", a: "Iblis", wrong: ["Adam", "The angels", "Hawwa"], why: "He refused out of pride in 7:12-13." }
      ]
    },
    {
      slug: "four-sides",
      title: "From every side",
      line: "Shaytan swore to come at us from front, back, right and left.",
      facts: ["Sirat mustaqim", "Not from above"],
      quote: q7(17),
      source: ik(17, "Iblis swore to sit on the straight path and come at people from before, behind, right and left. Ibn Abbas said: he did not say from above, because mercy comes down from above.", "He did not say that he will come from above them, because the mercy descends from above"),
      difficulty: 4,
      questions: [
        { q: "Where did Shaytan vow to sit, in 7:16?", a: "On the straight path", wrong: ["In the sky", "In the sea", "In the desert"], why: "La-aq'udanna lahum siratakal-mustaqim." },
        { q: "Why did he not say from above, per Ibn Abbas?", a: "Mercy comes down from above", wrong: ["He cannot fly", "He forgot", "Angels live there"], why: "Because the mercy descends from above." },
        { q: "What did Shaytan say about most people, in 7:17?", a: "Most will not be thankful", wrong: ["Most will be prophets", "Most will be angels", "Most will be rich"], why: "Wa la tajidu aktharahum shakirin." }
      ]
    },
    {
      slug: "guard-all-sides",
      title: "A du'a for every side",
      line: "Morning and evening the Prophet ﷺ asked to be guarded all round.",
      facts: ["Morning and evening", "Front, back, right, left, above"],
      quote: q7(17),
      source: hadith("abudawud", "5074", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ never left this du'a morning and evening: O Allah, guard me in front of me and behind me, on my right and on my left, and from above me.", "O Allah! guard me in front of me and behind me, on my right hand and on my left, and from above me"),
      difficulty: 4,
      questions: [
        { q: "When did the Prophet ﷺ say this du'a, in Abu Dawud 5074?", a: "Morning and evening", wrong: ["Only in Ramadan", "Only on journeys", "Once a year"], why: "He never failed to say it morning and evening." },
        { q: "Which sides does the du'a cover?", a: "Front, back, right, left and above", wrong: ["Only the front", "Only the left", "Only below"], why: "The very sides Shaytan named, and above too." },
        { q: "The du'a covers the four sides named in 7:17.", tf: true, why: "Ibn Kathir quotes it right after 7:17." }
      ]
    },
    {
      slug: "driven-out",
      title: "Driven out, disgraced",
      line: "Allah drove Iblis out, disgraced and expelled.",
      facts: ["Madh'um: disgraced", "Madhur: expelled"],
      quote: q7(18),
      source: ik(18, "Allah drove Iblis out, madh'um and madhur: disgraced and expelled, as Ibn Jarir explained. Whoever follows him, Allah will fill Hell with all of them.", "Madhur is the distanced, that is, he is banished and expelled"),
      difficulty: 4,
      questions: [
        { q: "What does madh'um mean, per Ibn Jarir?", a: "Disgraced", wrong: ["Honored", "Forgiven", "Hidden"], why: "Ibn Jarir: as for madh'um, it is disgraced." },
        { q: "What does madhur mean, per Ibn Jarir?", a: "Driven far away", wrong: ["Brought near", "Made king", "Given gifts"], why: "Madhur is the distanced: banished and expelled." },
        { q: "Following Shaytan ends with him in the Fire.", tf: true, why: "I will fill Hell with you all." }
      ]
    },
    {
      slug: "the-tree",
      title: "Do not go near this tree",
      line: "Adam and Hawwa could eat anything in the garden but one tree.",
      facts: ["Al-jannah: the garden", "Shaytan swore falsely"],
      quote: q7(19),
      source: ik(21, "Adam and his wife could eat from all of Paradise except one tree. Shaytan whispered that it would make them angels or live forever, and he swore by Allah he was their sincere adviser. A believer can be fooled by someone who swears.", "It is a fact that the believer in Allah might sometimes become the victim of deceit"),
      difficulty: 3,
      questions: [
        { q: "What were Adam and Hawwa told, in 7:19?", a: "Do not go near this tree", wrong: ["Do not eat anything", "Leave the garden", "Plant a tree"], why: "Wa la taqraba hadhihish-shajarah." },
        { q: "What did Shaytan promise them, in 7:20?", a: "To become angels or live forever", wrong: ["To become kings of earth", "Gold and silver", "A new garden"], why: "Illa an takuna malakayni aw takuna minal-khalidin." },
        { q: "How did Shaytan back up his lie, in 7:21?", a: "He swore by Allah", wrong: ["He showed a miracle", "He brought witnesses", "He wrote a book"], why: "Wa qasamahuma: he swore to them both." }
      ]
    },
    {
      slug: "we-wronged",
      title: "Our Lord, we have wronged ourselves",
      line: "Adam and Hawwa repented at once: Rabbana zalamna anfusana.",
      facts: ["Rabbana zalamna anfusana", "Repentance accepted"],
      quote: q7(23),
      source: ik(23, "After eating from the tree they were ashamed and covered themselves with leaves. They said: our Lord, we have wronged ourselves; if You do not forgive us we will be lost. Ad-Dahhak said these are the words Adam received from his Lord.", "These are the words that Adam received from his Lord"),
      difficulty: 3,
      questions: [
        { q: "What did Adam and Hawwa say, in 7:23?", a: "Our Lord, we wronged ourselves", wrong: ["It was not our fault", "Shaytan made us", "We did nothing"], why: "Rabbana zalamna anfusana." },
        { q: "What did Iblis ask for, unlike Adam?", a: "Respite, not forgiveness", wrong: ["Forgiveness", "Nothing", "A garden"], why: "Shaytan did not ask for forgiveness, but for respite." },
        { q: "Ad-Dahhak said 7:23 is the words Adam received from his Lord.", tf: true, why: "The words of 2:37, taught here in full." }
      ]
    },
    {
      slug: "down-to-earth",
      title: "Down to the earth",
      line: "On earth we live, die, and from it we are raised again.",
      facts: ["Mustaqarr: a dwelling", "Ila hin: for a time"],
      quote: q7(25),
      source: ik(24, "Allah sent them down: on earth they have homes and set terms, written in the First Record. On it they live, on it they die, and from it they will be brought out again.", "on earth you will have dwellings and known, designated, appointed terms"),
      difficulty: 3,
      questions: [
        { q: "What three things happen on the earth, in 7:25?", a: "We live, die, and are raised", wrong: ["We fly, swim, sleep", "We are born only", "Nothing happens"], why: "Fiha tahyawna wa fiha tamutuna wa minha tukhrajun." },
        { q: "Our time on earth is set and written, per Ibn Kathir.", tf: true, why: "Recorded by the Pen, counted by Predestination." },
        { q: "Ibn Kathir says the places they landed came from Israelite tales.", tf: true, why: "Only Allah knows if they are true." }
      ]
    },
    {
      slug: "clothing-taqwa",
      title: "The clothing of taqwa",
      line: "Clothes cover and beautify, but taqwa is the best clothing.",
      facts: ["Libas: clothing", "Libas at-taqwa"],
      quote: q7(26),
      source: ik(26, "Allah gave clothing to cover and rish to beautify: the first is needed, the second is extra. The clothing of taqwa is better. Abdur-Rahman ibn Zayd said: when one fears Allah, Allah covers his errors.", "When one fears Allah, Allah covers his errors"),
      difficulty: 3,
      questions: [
        { q: "What is rish, per Ibn Kathir?", a: "Adornment for beauty", wrong: ["A kind of food", "A weapon", "A tent"], why: "Rish refers to the outer adornments used for beautification." },
        { q: "What clothing is best, in 7:26?", a: "The clothing of taqwa", wrong: ["Silk", "Gold", "Wool"], why: "Wa libasut-taqwa dhalika khayr." },
        { q: "Who said fearing Allah makes Him cover your errors?", a: "Abdur-Rahman ibn Zayd", wrong: ["Iblis", "The chiefs", "Ibn Jarir only"], why: "Abdur-Rahman bin Zayd bin Aslam commented on the ayah." }
      ]
    },
    {
      slug: "unseen-enemy",
      title: "An enemy you cannot see",
      line: "Shaytan and his tribe see us from where we cannot see them.",
      facts: ["Ya bani Adam", "Qabiluh: his tribe"],
      quote: q7(27),
      source: ik(27, "Allah warns the children of Adam against Iblis, who got their parents out of Paradise. He and his tribe see us when we cannot see them, and the devils are allies of those who do not believe.", "Allah warns the Children of Adam against Iblis and his followers"),
      difficulty: 4,
      questions: [
        { q: "What does Shaytan see that we cannot, in 7:27?", a: "Us, from where we cannot see him", wrong: ["The future", "The unseen", "Allah"], why: "Innahu yarakum huwa wa qabiluhu min haythu la tarawnahum." },
        { q: "Whose allies are the devils, in 7:27?", a: "Those who do not believe", wrong: ["The angels", "The believers", "The prophets"], why: "Awliya'a lilladhina la yu'minun." },
        { q: "Shaytan got our parents out of Paradise.", tf: true, why: "Kama akhraja abawaykum minal-jannah." }
      ]
    }
  ]
};

/** Ayahs 28 to 58: adornment for the masjid, what Allah forbids, the people of the Fire, of Paradise, and of Al-A'raf. */
const ARAF_TWO: DeepUnit = {
  key: "araf2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-7",
  name: "Al-A'raf, ayahs 28 to 58",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-A'raf",
  lessons: [
    {
      slug: "fathers-did-it",
      title: "Our fathers did it",
      line: "They blamed their fathers; Allah never commands shameful deeds.",
      facts: ["Fahishah: a shameful deed", "Say about Allah with knowledge"],
      quote: q7(28),
      source: ik(28, "When they did a shameful deed they said: our fathers did it and Allah commanded it. Allah answered that He never commands such deeds; they were saying about Allah what they did not know.", "Allah does not order Fahsha"),
      difficulty: 2,
      questions: [
        { q: "What excuse did they give, in 7:28?", a: "Our fathers did it", wrong: ["We forgot", "We were sick", "It was night"], why: "Wajadna alayha aba'ana." },
        { q: "Allah commands shameful deeds.", tf: false, why: "Innallaha la ya'muru bil-fahsha'." },
        { q: "What were they saying about Allah, in 7:28?", a: "What they did not know", wrong: ["Only the truth", "Nothing", "Praise"], why: "A taquluna alallahi ma la ta'lamun?" }
      ]
    },
    {
      slug: "justice-sincerity",
      title: "Justice and sincerity",
      line: "Allah commands justice and worship that is sincere to Him alone.",
      facts: ["Al-qist: justice", "Mukhlisin: sincere"],
      quote: q7(29),
      source: ik(29, "Allah commands justice, facing Him alone in every masjid, and calling on Him with sincere religion. That means following the messengers and making worship sincere. As He began us, so we will return.", "He also commands sincerit"),
      difficulty: 3,
      questions: [
        { q: "What does Allah command first, in 7:29?", a: "Justice", wrong: ["Wealth", "Revenge", "Silence"], why: "Amara rabbi bil-qist." },
        { q: "As Allah began us, so we will return.", tf: true, why: "Kama bada'akum ta'udun." },
        { q: "What do the misguided think, in 7:30?", a: "That they are guided", wrong: ["That they are lost", "That they are angels", "That they will die soon"], why: "Wa yahsabuna annahum muhtadun." }
      ]
    },
    {
      slug: "adornment-masjid",
      title: "Dress well for every masjid",
      line: "Wear clean, proper clothes for prayer, the best you have.",
      facts: ["Zinah: adornment", "Especially Jumu'ah and Eid"],
      quote: q7(31),
      source: ik(31, "Some people used to go round the Ka'bah without clothes, so Allah commanded wearing adornment at every masjid. Ibn Abbas said it means clean, proper clothes, and people were told to wear their best for every prayer.", "people were commanded to wear their best clothes when performing every prayer"),
      difficulty: 2,
      questions: [
        { q: "What are we told to take to every masjid, in 7:31?", a: "Our adornment", wrong: ["Our money", "Our pets", "Our tools"], why: "Khudhu zinatakum inda kulli masjid." },
        { q: "Which prayers does Ibn Kathir single out for best clothes?", a: "Jumu'ah and Eid", wrong: ["Only Fajr", "Only night prayer", "None"], why: "Especially for Friday and Eid prayers." },
        { q: "Using siwak is part of adornment for prayer, per Ibn Kathir.", tf: true, why: "Siwak is part of what completes adornment." }
      ]
    },
    {
      slug: "no-bare-tawaf",
      title: "No more tawaf without clothes",
      line: "Abu Bakr's Hajj announced: no tawaf without clothes from now on.",
      facts: ["The year before the Farewell Hajj", "Abu Bakr led the pilgrims"],
      quote: q7(31),
      source: hadith("bukhari", "1622", "Abu Hurayrah", "Sahih", "The year before the Prophet's ﷺ last Hajj, Abu Bakr led the pilgrims and sent Abu Hurayrah to announce: no idol worshipper may do Hajj after this year, and no one may go round the Ka'bah without clothes.", "no naked person is allowed to perform Tawaf of the Ka`ba"),
      difficulty: 3,
      questions: [
        { q: "Who led the pilgrims that year, in Bukhari 1622?", a: "Abu Bakr", wrong: ["Umar", "Ali", "Uthman"], why: "The Prophet ﷺ made Abu Bakr the leader of the pilgrims." },
        { q: "What was announced about tawaf?", a: "It must be done in clothes", wrong: ["It was cancelled", "Only at night", "Only for men"], why: "No naked person is allowed to perform tawaf." },
        { q: "Bukhari 1622 shows 7:31 being put into practice.", tf: true, why: "The old custom was ended in public." }
      ]
    },
    {
      slug: "eat-no-waste",
      title: "Eat and drink, but do not waste",
      line: "Eat and drink, but Allah does not love those who waste.",
      facts: ["Israf: waste", "Two things to avoid"],
      quote: q7(31),
      source: ik(31, "Ibn Abbas said: eat what you wish and wear what you wish, as long as you avoid two things, waste and arrogance. Allah does not love those who go beyond the limits in what is allowed.", "Eat what you wish and wear what you wish, as long as you avoid two things: extravagance and arrogance"),
      difficulty: 3,
      questions: [
        { q: "Which two things did Ibn Abbas say to avoid?", a: "Waste and arrogance", wrong: ["Salt and sugar", "Sleep and rest", "Work and travel"], why: "Avoid two things: extravagance and arrogance." },
        { q: "Whom does Allah not love, in 7:31?", a: "The wasteful", wrong: ["The hungry", "The poor", "The travelers"], why: "Innahu la yuhibbul-musrifin." },
        { q: "Eating good food is forbidden in Islam.", tf: false, why: "Eat and drink: only waste is blamed." }
      ]
    },
    {
      slug: "a-third",
      title: "A third for food",
      line: "A third for food, a third for drink, a third for breath.",
      facts: ["The stomach is the worst pot", "A few bites are enough"],
      quote: q7(31),
      source: hadith("tirmidhi", "2380", "Al-Miqdam ibn Ma'dikarib", "Sahih", "The Prophet ﷺ said: a person fills no container worse than his stomach. A few bites to keep his back straight are enough; if more, then a third for food, a third for drink, and a third for breath.", "then a third for food, a third for drink, and third for his breath"),
      difficulty: 4,
      questions: [
        { q: "What is the worst container to fill, in Tirmidhi 2380?", a: "The stomach", wrong: ["A bucket", "A bag", "A purse"], why: "No container is worse than his stomach." },
        { q: "How should the stomach be shared, if one eats more?", a: "A third food, drink and breath", wrong: ["All food", "Half food, half drink", "Only drink"], why: "A third for food, a third for drink, a third for breath." },
        { q: "Tirmidhi 2380 explains the no-waste rule in 7:31.", tf: true, why: "Ibn Kathir quotes it under 7:31." }
      ]
    },
    {
      slug: "good-things-allowed",
      title: "Who forbade the good things?",
      line: "Allah made fine clothes and good food for His servants.",
      facts: ["At-tayyibat: good things", "Pure for believers on that Day"],
      quote: q7(32),
      source: ik(32, "Allah refutes those who forbid food, drink or clothes by their own opinion. These were made for believers in this life, though others share them now, and on the Day of Resurrection they are for believers alone.", "these things were created for those who believe in Allah and worship Him in this life"),
      difficulty: 3,
      questions: [
        { q: "Who may forbid good things by opinion, per Ibn Kathir?", a: "No one", wrong: ["Any chief", "Any elder", "Anyone who wishes"], why: "Allah refutes those who prohibit without His law." },
        { q: "Who has the good things alone on Judgment Day, in 7:32?", a: "The believers", wrong: ["The disbelievers", "Everyone equally", "No one"], why: "Khalisatan yawmal-qiyamah." },
        { q: "Disbelievers share some good things in this life.", tf: true, why: "Even though the disbelievers share in these bounties in this life." }
      ]
    },
    {
      slug: "what-is-forbidden",
      title: "What Allah really forbids",
      line: "Allah forbids shameful deeds, sin, oppression, shirk and lies.",
      facts: ["Al-ithm: sin", "Al-baghy: oppression"],
      quote: q7(33),
      source: hadith("bukhari", "4634", "Abdullah ibn Mas'ud", "Sahih", "The Prophet ﷺ said: none has more ghayrah than Allah, so He forbade shameful sins, open or secret; and none loves praise more than Allah, so He praised Himself.", "None has more sense of ghaira than Allah therefore - He prohibits shameful sins"),
      difficulty: 3,
      questions: [
        { q: "Why did Allah forbid shameful sins, in Bukhari 4634?", a: "None has more ghayrah than Allah", wrong: ["He needs us", "They are boring", "No reason"], why: "None has more sense of ghaira than Allah." },
        { q: "Which of these is forbidden in 7:33?", a: "Saying about Allah without knowledge", wrong: ["Eating good food", "Wearing nice clothes", "Praying in a masjid"], why: "Wa an taqulu alallahi ma la ta'lamun." },
        { q: "Who loves praise most, in the hadith?", a: "Allah", wrong: ["Kings", "Poets", "Chiefs"], why: "None loves to be praised more than Allah." }
      ]
    },
    {
      slug: "set-term",
      title: "Every nation has a term",
      line: "No nation can delay or advance its end by a single hour.",
      facts: ["Ajal: an appointed term", "Messengers from among you"],
      quote: q7(34),
      source: ik(35, "Every nation has a set time. Allah sent messengers reciting His ayat: whoever has taqwa and does right will have no fear or grief. Taqwa means leaving what is forbidden and doing what is commanded.", "by abandoning the prohibitions and performing acts of obedience"),
      difficulty: 3,
      questions: [
        { q: "Can a nation delay its term, in 7:34?", a: "Not even by an hour", wrong: ["By a year", "By a day", "If it pays"], why: "La yasta'khiruna sa'atan wa la yastaqdimun." },
        { q: "What will those with taqwa not feel, in 7:35?", a: "Fear or grief", wrong: ["Hunger", "Joy", "Peace"], why: "Fala khawfun alayhim wa la hum yahzanun." },
        { q: "What is taqwa, per Ibn Kathir under 7:35?", a: "Leaving sins and doing good", wrong: ["Being rich", "Being loud", "Staying home"], why: "Abandoning the prohibitions and performing acts of obedience." }
      ]
    },
    {
      slug: "where-are-they",
      title: "Where are your gods now?",
      line: "At death the angels ask: where are those you called on?",
      facts: ["Their share reaches them", "They testify against themselves"],
      quote: q7(37),
      source: ik(37, "None is more unjust than one who lies about Allah or denies His ayat. They get their share of life, until the angels come to take their souls and ask: where are those you called on? They say: they have left us.", "none is more unjust than whoever invents a lie about Allah"),
      difficulty: 3,
      questions: [
        { q: "Who is most unjust, in 7:37?", a: "One who lies about Allah", wrong: ["One who is poor", "One who is sick", "One who travels"], why: "Faman azlamu mimmaniftara alallahi kadhiba." },
        { q: "What do they say about their false gods at death?", a: "They have left us", wrong: ["They are coming", "They will save us", "They are angels"], why: "Dallu anna: they have vanished and deserted us." },
        { q: "They will testify against themselves that they disbelieved.", tf: true, why: "Wa shahidu ala anfusihim annahum kanu kafirin." }
      ]
    },
    {
      slug: "nations-blame",
      title: "Followers and leaders blame each other",
      line: "In the Fire, each nation curses the one before it.",
      facts: ["Followers blame leaders", "Each gets double"],
      quote: q7(38),
      source: ik(38, "Each new nation in the Fire curses the one before it. The followers ask double punishment for their leaders; Allah says each has double, each by its deeds. The leaders reply: you were no better than us.", "We did what you asked, and recompensed each according to their deeds"),
      difficulty: 4,
      questions: [
        { q: "What does each nation do to the one before, in 7:38?", a: "Curses it", wrong: ["Thanks it", "Helps it", "Forgets it"], why: "La'anat ukhtaha." },
        { q: "What do the later ones ask for the earlier ones?", a: "A double punishment", wrong: ["Forgiveness", "Paradise", "Water"], why: "Fa atihim adhaban di'fan minan-nar." },
        { q: "What do the leaders reply, in 7:39?", a: "You were no better than us", wrong: ["We are sorry", "We will save you", "It was all our fault"], why: "Fama kana lakum alayna min fadl." }
      ]
    },
    {
      slug: "camel-needle",
      title: "A camel through a needle's eye",
      line: "Proud deniers enter Paradise when a camel fits a needle's eye.",
      facts: ["Jamal: a camel", "Samm al-khiyat: needle's eye"],
      quote: q7(40),
      source: ik(40, "For those who deny Allah's ayat with pride, the gates of heaven do not open: their deeds and du'a do not rise, as Ibn Abbas and others said. They will not enter Paradise until a camel passes through the eye of a needle.", "their good deeds and supplication will not ascend through it"),
      difficulty: 4,
      questions: [
        { q: "What must pass through a needle's eye, in 7:40?", a: "A camel", wrong: ["A thread", "An ant", "A bird"], why: "Hatta yalijal-jamalu fi sammil-khiyat." },
        { q: "What does not rise through heaven's gates, per Ibn Abbas?", a: "Their deeds and du'a", wrong: ["The rain", "The birds", "The clouds"], why: "Their good deeds and supplication will not ascend." },
        { q: "The camel picture means it will never happen.", tf: true, why: "It describes the impossible." }
      ]
    },
    {
      slug: "no-grudges",
      title: "No grudges left in hearts",
      line: "Allah removes all envy and hatred from the people of Paradise.",
      facts: ["Ghill: hidden hatred", "Only within one's ability"],
      quote: q7(43),
      source: ik(43, "Allah burdens no soul beyond its ability. In Paradise He removes from the believers' hearts all envy and hatred. They praise Allah: we would never have been guided had Allah not guided us.", "meaning, envy and hatred"),
      difficulty: 3,
      questions: [
        { q: "What is ghill, per Ibn Kathir?", a: "Envy and hatred", wrong: ["Gold", "Rivers", "Clothes"], why: "Wa naza'na ma fi sudurihim min ghill: envy and hatred." },
        { q: "Allah burdens a soul beyond its ability.", tf: false, why: "La nukallifu nafsan illa wus'aha." },
        { q: "What do they say in 7:43?", a: "Praise Allah who guided us", wrong: ["We guided ourselves", "We earned it alone", "We were lucky"], why: "Al-hamdu lillahil-ladhi hadana li-hadha." }
      ]
    },
    {
      slug: "bridge-of-settling",
      title: "Settling before Paradise",
      line: "Believers settle wrongs on a bridge, then enter Paradise pure.",
      facts: ["Al-qantarah: a bridge", "Everyone knows his home"],
      quote: q7(43),
      source: hadith("bukhari", "2440", "Abu Sa'id al-Khudri", "Sahih", "The Prophet ﷺ said: when the believers pass safely over Hell, they are stopped at a bridge between Hell and Paradise to settle wrongs among them. Once purified they enter Paradise, and each knows his home there better than his home in this world.", "everybody will recognize his dwelling in Paradise better than he recognizes his dwelling in this world"),
      difficulty: 4,
      questions: [
        { q: "Where are the believers stopped, in Bukhari 2440?", a: "A bridge between Hell and Paradise", wrong: ["A market", "A mountain", "A river"], why: "Stopped at a bridge in between Hell and Paradise." },
        { q: "What happens on that bridge?", a: "Wrongs between them are settled", wrong: ["They eat a feast", "They sleep", "They pray Fajr"], why: "They retaliate upon each other for the injustices done." },
        { q: "Each knows his home in Paradise better than his worldly home.", tf: true, why: "Better than he recognizes his dwelling in this world." }
      ]
    },
    {
      slug: "found-it-true",
      title: "Did you find it true?",
      line: "Paradise calls to the Fire: we found our Lord's promise true.",
      facts: ["Na'am: yes", "A caller announces"],
      quote: q7(44),
      source: ik(44, "The people of Paradise call to the people of the Fire: we found our Lord's promise true; did you? They say yes. Then a caller announces Allah's curse on the wrongdoers who blocked others from His path.", "Allah mentioned how the people of the Fire will be addressed, chastised and admonished"),
      difficulty: 3,
      questions: [
        { q: "What do the people of the Fire answer, in 7:44?", a: "Yes", wrong: ["No", "Maybe", "Nothing"], why: "Qalu na'am." },
        { q: "Whom does the caller name, in 7:45?", a: "Those who blocked Allah's path", wrong: ["The poor", "The travelers", "The children"], why: "Alladhina yasudduna an sabilillah." },
        { q: "The people of Paradise found Allah's promise true.", tf: true, why: "Qad wajadna ma wa'adana rabbuna haqqa." }
      ]
    },
    {
      slug: "people-of-araf",
      title: "The people of Al-A'raf",
      line: "On the high wall are people whose good and bad are equal.",
      facts: ["Al-A'raf: the heights", "They hope to enter"],
      quote: q7(46),
      source: ik(46, "Between Paradise and the Fire is a wall, Al-A'raf, high ground. Hudhayfah, Ibn Abbas and Ibn Mas'ud said its people are those whose good and bad deeds are equal. They greet the people of Paradise and hope to enter.", "A people whose good and bad deeds are equal"),
      difficulty: 4,
      questions: [
        { q: "Where is Al-A'raf, per Ibn Kathir?", a: "A wall between Paradise and the Fire", wrong: ["A city in Yemen", "A mountain in Makkah", "A river in Paradise"], why: "A barrier between Paradise and the Fire, a wall that has a gate." },
        { q: "Who are its people, per Hudhayfah?", a: "Those whose good and bad are equal", wrong: ["The prophets", "The angels", "The worst sinners"], why: "A people whose good and bad deeds are equal." },
        { q: "What do they say to the people of Paradise, in 7:46?", a: "Peace be on you", wrong: ["Help us", "Go away", "Give us food"], why: "Salamun alaykum." }
      ]
    },
    {
      slug: "numbers-useless",
      title: "Your crowds did not help",
      line: "Al-A'raf asks the proud: what did your numbers do for you?",
      facts: ["Jam'ukum: your gathering", "The weak are in Paradise"],
      quote: q7(48),
      source: ik(48, "The people of Al-A'raf ask the proud chiefs in the Fire: what use were your numbers and pride? Your crowds and wealth did not save you. Then they are told: enter Paradise, no fear and no grief for you.", "your great numbers and wealth did not save you from"),
      difficulty: 4,
      questions: [
        { q: "What did not help the proud chiefs, per Ibn Kathir?", a: "Their numbers and wealth", wrong: ["Their prayers", "Their charity", "Their good manners"], why: "Your great numbers and wealth did not save you." },
        { q: "What are the people of Al-A'raf finally told, in 7:49?", a: "Enter Paradise", wrong: ["Stay forever", "Go to the Fire", "Wait again"], why: "Udkhulul-jannata la khawfun alaykum." },
        { q: "The chiefs swore Allah would never show mercy to the believers.", tf: true, why: "A ha'ula'il-ladhina aqsamtum la yanaluhumullahu bi-rahmah." }
      ]
    },
    {
      slug: "pour-water",
      title: "Pour us some water",
      line: "The Fire begs for water; Paradise's gifts are not for deniers.",
      facts: ["Afidu: pour", "They took religion as play"],
      quote: q7(50),
      source: ik(50, "The people of the Fire beg the people of Paradise for water or food and are refused. They took religion as play and were fooled by this life, so Allah treats them as if He forgot them, though He never forgets anything.", "Allah will treat them as if He has forgotten them"),
      difficulty: 3,
      questions: [
        { q: "What do the people of the Fire ask for, in 7:50?", a: "Water or food", wrong: ["Gold", "Clothes", "Books"], why: "Afidu alayna minal-ma'i aw mimma razaqakumullah." },
        { q: "How did they treat religion, in 7:51?", a: "As play and amusement", wrong: ["As serious", "As a duty", "As a gift"], why: "Ittakhadhu dinahum lahwan wa la'iba." },
        { q: "Allah really forgets things.", tf: false, why: "He treats them as forgotten; He never forgets anything." }
      ]
    },
    {
      slug: "no-excuse",
      title: "No excuse left",
      line: "A detailed Book came; on that Day deniers wish to go back.",
      facts: ["Fassalnahu: explained in detail", "Huda wa rahmah"],
      quote: q7(52),
      source: ik(52, "Allah left the idol worshippers no excuse: He sent a Book explained in detail with knowledge, guidance and mercy for believers. On the Day it comes true they will ask for intercessors or a return, but they have lost themselves.", "He has left no excuse for the idolators"),
      difficulty: 4,
      questions: [
        { q: "How is the Book described, in 7:52?", a: "Explained in detail with knowledge", wrong: ["Short and unclear", "Without guidance", "Only stories"], why: "Fassalnahu ala ilm." },
        { q: "What do deniers wish for, in 7:53?", a: "To be sent back to do good", wrong: ["To sleep forever", "To be angels", "To own the world"], why: "Aw nuraddu fa na'mala ghayral-ladhi kunna na'mal." },
        { q: "Allah sends a messenger before He punishes a people.", tf: true, why: "Ibn Kathir quotes 17:15: We never punish until We send a messenger." }
      ]
    },
    {
      slug: "six-days",
      title: "Created in six days",
      line: "Heavens and earth in six days: His is the creation and command.",
      facts: ["Sittati ayyam: six days", "Al-khalq wal-amr"],
      quote: q7(54),
      source: ik(54, "Allah created the heavens and earth in six days. The night chases the day, and the sun, moon and stars all work by His command, will and rule. His is the creation and the command: blessed is Allah, Lord of all.", "all are under His command, will and dominion"),
      difficulty: 3,
      questions: [
        { q: "In how many days were the heavens and earth made, in 7:54?", a: "Six", wrong: ["One", "Seven", "Forty"], why: "Fi sittati ayyam." },
        { q: "To whom belong creation and command, in 7:54?", a: "To Allah alone", wrong: ["To the stars", "To the kings", "To nature"], why: "Ala lahul-khalqu wal-amr." },
        { q: "The sun, moon and stars run by Allah's command.", tf: true, why: "Musakhkharatin bi-amrih." }
      ]
    },
    {
      slug: "call-humbly",
      title: "Call on Him humbly and quietly",
      line: "Make du'a humbly and quietly; the One you call is near.",
      facts: ["Tadarru': humility", "Khufyah: quietly"],
      quote: q7(55),
      source: hadith("bukhari", "2992", "Abu Musa al-Ash'ari", "Sahih", "On a journey the people raised their voices saying la ilaha illallah and Allahu akbar. The Prophet ﷺ said: be easy on yourselves, you are not calling one who is deaf or absent, but One who hears and is near.", "you are not calling a deaf or an absent one"),
      difficulty: 3,
      questions: [
        { q: "How should we call on Allah, in 7:55?", a: "Humbly and quietly", wrong: ["Shouting as loud as we can", "Only in groups", "Only once a year"], why: "Ud'u rabbakum tadarru'an wa khufyah." },
        { q: "Why need we not shout, in Bukhari 2992?", a: "He is not deaf or absent", wrong: ["Shouting is rude only", "He is asleep", "Angels shout for us"], why: "You are not calling a deaf or an absent one." },
        { q: "Whom does Allah not love, in 7:55?", a: "Those who go too far", wrong: ["Those who whisper", "Those who cry", "Those who hope"], why: "Innahu la yuhibbul-mu'tadin." }
      ]
    },
    {
      slug: "fear-and-hope",
      title: "With fear and hope",
      line: "Call with fear and hope: His mercy is near the good-doers.",
      facts: ["Khawfan wa tama'an", "Al-muhsinin: good-doers"],
      quote: q7(56),
      source: ik(56, "Do not spread corruption after the earth was set right, and call on Allah with fear and hope. Matar al-Warraq said: earn His promise by obeying Him, for He made His mercy near to those who do good.", "for He ordained that His mercy is near to the good-doers"),
      difficulty: 4,
      questions: [
        { q: "With what two feelings do we call on Allah, in 7:56?", a: "Fear and hope", wrong: ["Anger and pride", "Boredom and doubt", "Envy and greed"], why: "Wad'uhu khawfan wa tama'a." },
        { q: "To whom is Allah's mercy near, in 7:56?", a: "The good-doers", wrong: ["The proud", "The lazy", "The corrupt"], why: "Inna rahmatallahi qaribun minal-muhsinin." },
        { q: "Spreading corruption on the earth is forbidden in 7:56.", tf: true, why: "Wa la tufsidu fil-ardi ba'da islahiha." }
      ]
    },
    {
      slug: "winds-rain",
      title: "Winds, rain and the dead raised",
      line: "Rain brings dead land to life; so too will the dead rise.",
      facts: ["Bushra: good news", "Like the Resurrection"],
      quote: q7(57),
      source: ik(57, "Allah sends winds with good news before His mercy, the rain. Clouds are driven to dead land and fruit comes out. In the same way the dead will be raised; Allah often gives this example of the Resurrection.", "Allah often mentions this similarity in the Qur"),
      difficulty: 3,
      questions: [
        { q: "What comes before Allah's mercy, the rain, in 7:57?", a: "The winds", wrong: ["The snow", "The night", "The birds"], why: "Yursilur-riyaha bushran bayna yaday rahmatih." },
        { q: "What does reviving dead land show us, in 7:57?", a: "How the dead will be raised", wrong: ["How to farm", "How to trade", "How to sail"], why: "Kadhalika nukhrijul-mawta." },
        { q: "Rain is called Allah's mercy in 7:57.", tf: true, why: "Before His mercy means before the rain." }
      ]
    },
    {
      slug: "good-land",
      title: "Good land and bad land",
      line: "Good land grows easily; hearts are like land under rain.",
      facts: ["Al-baladut-tayyib", "Guidance is like rain"],
      quote: q7(58),
      source: hadith("bukhari", "79", "Abu Musa", "Sahih", "The Prophet ﷺ said the guidance and knowledge he brought is like heavy rain: some land drinks it and grows plants, some holds water for others, and some is barren. So are people who learn and teach, and those who ignore it.", "The example of guidance and knowledge with which Allah has sent me is like abundant rain falling on the earth"),
      difficulty: 5,
      questions: [
        { q: "What is guidance compared to, in Bukhari 79?", a: "Heavy rain", wrong: ["Fire", "Wind", "Sand"], why: "Like abundant rain falling on the earth." },
        { q: "Which land is like someone who learns and teaches?", a: "Land that drinks and grows plants", wrong: ["Barren land", "Land with no rain", "Rocky land only"], why: "The first is the one who learns and teaches others." },
        { q: "What does bad land bring out, in 7:58?", a: "Only a little, with difficulty", wrong: ["Rich fruit", "Rivers", "Nothing ever"], why: "La yakhruju illa nakida." }
      ]
    }
  ]
};

/** Ayahs 59 to 102: Nuh, Hud, Salih, Lut and Shu'ayb, and the lesson of the towns that denied. */
const ARAF_THREE: DeepUnit = {
  key: "araf3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-7",
  name: "Al-A'raf, ayahs 59 to 102",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-A'raf",
  lessons: [
    {
      slug: "nuh-sent",
      title: "Nuh is sent",
      line: "Nuh was the first messenger to the people of earth after Adam.",
      facts: ["Worship Allah alone", "The first messenger"],
      quote: q7(59),
      source: ik(59, "After the story of Adam, Allah tells the stories of the prophets in order. Nuh comes first, because he was the first messenger sent to the people of the earth after Adam. He called: worship Allah, you have no god but Him.", "because he was the first Messenger Allah sent to the people of the earth after Adam"),
      difficulty: 2,
      questions: [
        { q: "Why does Nuh's story come first, per Ibn Kathir?", a: "He was the first messenger after Adam", wrong: ["He lived longest", "He was a king", "He wrote a book"], why: "The first Messenger Allah sent to the people of the earth after Adam." },
        { q: "What did Nuh call to, in 7:59?", a: "Worship Allah alone", wrong: ["Build a city", "Make idols", "Follow the chiefs"], why: "U'budullaha ma lakum min ilahin ghayruh." },
        { q: "What did Nuh fear for them, in 7:59?", a: "The punishment of a great Day", wrong: ["A bad harvest", "A war", "A long winter"], why: "Adhaba yawmin azim." }
      ]
    },
    {
      slug: "first-idols",
      title: "How idol worship began",
      line: "Statues of good men slowly turned into idols.",
      facts: ["It began with pictures", "Shaytan led them on slowly"],
      quote: q7(59),
      source: hadith("bukhari", "4920", "Ibn Abbas", "Sahih", "Ibn Abbas said the idols of Nuh's people carried the names of pious men. When they died, Shaytan inspired people to set up statues where they used to sit and name them after them. Later generations worshipped them.", "The names (of the idols) formerly belonged to some pious men of the people of Noah"),
      difficulty: 4,
      questions: [
        { q: "Whose names did the idols carry, in Bukhari 4920?", a: "Pious men of Nuh's people", wrong: ["Kings of Egypt", "Angels", "Stars"], why: "The names formerly belonged to some pious men." },
        { q: "Who inspired the statues?", a: "Shaytan", wrong: ["Nuh", "The angels", "The pious men"], why: "Satan inspired their people to place idols where they used to sit." },
        { q: "Idol worship started all at once, with no small steps.", tf: false, why: "Images, then statues, then worship, over generations." }
      ]
    },
    {
      slug: "no-error-in-me",
      title: "There is no error in me",
      line: "Called misguided, Nuh replied: I convey and advise sincerely.",
      facts: ["Risalat: messages", "Ansahu lakum: I advise you"],
      quote: q7(62),
      source: ik(62, "The chiefs said: you are plainly misguided, which is how evil people see the righteous. Nuh said: I am a messenger who conveys and advises sincerely. That is the mark of a messenger: clear words, sincere advice, knowledge of Allah.", "This is the attribute of a Messenger, that he conveys using plain, yet eloquent words, offers sincere advice and is knowledgeable about Allah"),
      difficulty: 3,
      questions: [
        { q: "What did the chiefs call Nuh, in 7:60?", a: "Plainly misguided", wrong: ["A king", "A poet", "A doctor"], why: "Inna lanaraka fi dalalin mubin." },
        { q: "What does a messenger give, per Ibn Kathir?", a: "Clear words and sincere advice", wrong: ["Gold and land", "Threats only", "Riddles"], why: "He conveys using plain words and offers sincere advice." },
        { q: "Evil people often call the righteous misguided.", tf: true, why: "Ibn Kathir: this is the attitude of evil people." }
      ]
    },
    {
      slug: "you-conveyed",
      title: "We bear witness you conveyed",
      line: "At the Farewell Hajj the Companions said: you conveyed it.",
      facts: ["Arafah", "O Allah, bear witness"],
      quote: q7(62),
      source: hadith("muslim", "1218", "Jabir ibn Abdullah", "Sahih", "In his Farewell Sermon the Prophet ﷺ said: you will be asked about me, so what will you say? They said: we bear witness you conveyed, fulfilled and gave sincere counsel. He pointed to the sky: O Allah, bear witness.", "We will bear witness that you have conveyed (the message), discharged (the ministry of Prophethood) and given wise (sincere) counsel"),
      difficulty: 4,
      questions: [
        { q: "What did the Companions testify, in Muslim 1218?", a: "That he conveyed the message", wrong: ["That he was rich", "That he was a king", "That he was tired"], why: "We will bear witness that you have conveyed." },
        { q: "Where was this said?", a: "At Arafah, the Farewell Hajj", wrong: ["At Badr", "In Ta'if", "In Madinah market"], why: "Ibn Kathir: on the Day of Arafah." },
        { q: "Sincere advice is a mark of every messenger.", tf: true, why: "Nuh: I give sincere advice to you." }
      ]
    },
    {
      slug: "the-ark",
      title: "Saved in the ark",
      line: "Nuh's people denied; the believers were saved in the ark.",
      facts: ["Al-fulk: the ark", "Qawman amin: a blind people"],
      quote: q7(64),
      source: ik(63, "Nuh said: do not wonder that a reminder came through a man from among you, as mercy and kindness. They denied, and only a few believed. Allah saved them in the ark and drowned those who denied.", "only a few of them believed in him"),
      difficulty: 2,
      questions: [
        { q: "How were Nuh and the believers saved, in 7:64?", a: "In the ark", wrong: ["On a mountain alone", "In a cave", "On camels"], why: "Fa anjaynahu wal-ladhina ma'ahu fil-fulk." },
        { q: "How many believed in Nuh, per Ibn Kathir?", a: "Only a few", wrong: ["Everyone", "Most people", "No one at all"], why: "Only a few of them believed in him." },
        { q: "What were the deniers called, in 7:64?", a: "A blind people", wrong: ["A wise people", "A rich people", "A brave people"], why: "Innahum kanu qawman amin." }
      ]
    },
    {
      slug: "hud-to-ad",
      title: "Hud is sent to 'Ad",
      line: "Hud was sent to 'Ad, tall people of the Yemen sand hills.",
      facts: ["Al-Ahqaf: sand hills", "Their brother Hud"],
      quote: q7(65),
      source: ik(65, "As Allah sent Nuh to his people, He sent Hud, one of their own, to 'Ad. They lived in Yemen, in Al-Ahqaf, meaning sand hills. He called them to worship Allah alone and have taqwa.", "lived in Yemen, in the area of Ahqaf, which means sand mounds"),
      difficulty: 2,
      questions: [
        { q: "Where did 'Ad live, per Ibn Kathir?", a: "Al-Ahqaf in Yemen", wrong: ["Egypt", "Iraq", "Makkah"], why: "They lived in Yemen, in the area of Ahqaf." },
        { q: "What does Al-Ahqaf mean?", a: "Sand hills", wrong: ["Green fields", "Rivers", "Caves"], why: "Ahqaf means sand mounds." },
        { q: "What did 'Ad call Hud, in 7:66?", a: "Foolish and a liar", wrong: ["Wise and true", "A king", "A healer"], why: "Inna lanaraka fi safahah." }
      ]
    },
    {
      slug: "remember-favors",
      title: "Remember Allah's favors",
      line: "Hud said: Allah made you taller and stronger, so remember Him.",
      facts: ["Khulafa: successors", "Bastatan: more stature"],
      quote: q7(69),
      source: ik(69, "Hud said: do not wonder that a reminder came through one of you. Remember Allah made you successors after Nuh's people and made you taller than others. Remember His favors so you may succeed.", "making you taller than other people"),
      difficulty: 3,
      questions: [
        { q: "Whom did 'Ad come after, in 7:69?", a: "The people of Nuh", wrong: ["The people of Musa", "The people of Lut", "The Romans"], why: "Ja'alakum khulafa'a min ba'di qawmi Nuh." },
        { q: "What did Allah increase in 'Ad, per Ibn Kathir?", a: "Their height", wrong: ["Their poverty", "Their weakness", "Their sleep"], why: "Making you taller than other people." },
        { q: "Hud said he was a trustworthy adviser.", tf: true, why: "Wa ana lakum nasihun amin." }
      ]
    },
    {
      slug: "mere-names",
      title: "Mere names you made up",
      line: "Hud said: your idols are only names, with no power from Allah.",
      facts: ["Asma': names", "Sultan: authority"],
      quote: q7(71),
      source: ik(71, "'Ad wanted to keep their fathers' gods and dared Hud to bring the punishment. He said: do you argue over names you and your fathers made up? Those idols bring no harm or benefit, and Allah gave them no authority.", "even though they do not bring harm or benefit"),
      difficulty: 3,
      questions: [
        { q: "What were the idols, said Hud in 7:71?", a: "Names they made up", wrong: ["Real gods", "Angels", "Prophets"], why: "Asma'un sammaytumuha antum wa aba'ukum." },
        { q: "What did the idols bring, per Ibn Kathir?", a: "No harm or benefit", wrong: ["Rain", "Wealth", "Health"], why: "They do not bring harm or benefit." },
        { q: "'Ad dared Hud to bring what he warned of.", tf: true, why: "Fa'tina bima ta'iduna." }
      ]
    },
    {
      slug: "the-west-wind",
      title: "The wind that ended 'Ad",
      line: "A barren wind destroyed 'Ad; Hud and believers were saved.",
      facts: ["Seven nights, eight days", "Ad-dabur: the west wind"],
      quote: q7(72),
      source: hadith("bukhari", "1035", "Ibn Abbas", "Sahih", "The Prophet ﷺ said: I was helped by the east wind, and 'Ad was destroyed by the west wind.", "I was granted victory with As-Saba"),
      difficulty: 4,
      questions: [
        { q: "What destroyed 'Ad, in Bukhari 1035?", a: "The west wind", wrong: ["A flood", "An earthquake", "A fire"], why: "The nation of 'Ad was destroyed by Ad-Dabur." },
        { q: "Which wind helped the Prophet ﷺ?", a: "The east wind, as-saba", wrong: ["The west wind", "No wind", "A storm of sand"], why: "I was granted victory with as-saba." },
        { q: "Hud and those with him were saved by Allah's mercy.", tf: true, why: "Fa anjaynahu wal-ladhina ma'ahu bi-rahmatin minna." }
      ]
    },
    {
      slug: "salih-camel",
      title: "Salih and the she-camel",
      line: "Thamud asked for a camel from a rock; Allah brought it out.",
      facts: ["Naqatullah: Allah's camel", "Al-Hijr"],
      quote: q7(73),
      source: ik(73, "Allah sent Salih to Thamud. They challenged him to bring a pregnant camel out of a rock they chose in Al-Hijr. Allah brought it out as a clear sign, and Salih said: leave her to graze and do not harm her.", "They asked him to bring a pregnant camel out of that stone"),
      difficulty: 2,
      questions: [
        { q: "What sign did Thamud ask for, per Ibn Kathir?", a: "A camel out of a rock", wrong: ["Rain from the sky", "A river", "A golden calf"], why: "They asked him to bring a pregnant camel out of that stone." },
        { q: "What did Salih tell them about the camel, in 7:73?", a: "Let her graze, do not harm her", wrong: ["Ride her daily", "Sell her", "Lock her up"], why: "Fadharuha ta'kul fi ardillah." },
        { q: "The camel is called Allah's camel in 7:73.", tf: true, why: "Hadhihi naqatullahi lakum ayah." }
      ]
    },
    {
      slug: "homes-in-mountains",
      title: "Homes carved in mountains",
      line: "Thamud carved rock homes; the weak believed, the proud refused.",
      facts: ["Palaces on plains", "Houses in rock"],
      quote: q7(74),
      source: ik(73, "Salih said Allah showed a miracle confirming his message. Thamud built palaces on plains and carved homes in mountains. Their arrogant chiefs mocked the weak who believed.", "a miracle has come to you from Allah testifying to the truth"),
      difficulty: 3,
      questions: [
        { q: "Where did Thamud carve homes, in 7:74?", a: "In the mountains", wrong: ["Under the sea", "In trees", "In clouds"], why: "Wa tanhitunal-jibala buyuta." },
        { q: "Who believed in Salih, in 7:75?", a: "Those counted weak", wrong: ["The proud chiefs", "Everyone", "No one"], why: "Lilladhinas-tud'ifu liman amana minhum." },
        { q: "What did the proud chiefs say, in 7:76?", a: "We disbelieve in what you believe", wrong: ["We believe too", "We are unsure", "We will think"], why: "Inna billadhi amantum bihi kafirun." }
      ]
    },
    {
      slug: "weeping-at-hijr",
      title: "Pass their ruins weeping",
      line: "At Al-Hijr the Prophet ﷺ said: enter only weeping.",
      facts: ["Thamud's ruins", "The earthquake seized them"],
      quote: q7(78),
      source: hadith("bukhari", "4419", "Ibn Umar", "Sahih", "Passing Al-Hijr, the Prophet ﷺ said: do not enter the homes of those who wronged themselves unless weeping, lest what struck them strike you. Then he covered his head and hurried through the valley.", "Do not enter the dwelling places of those people who were unjust to themselves unless you enter in a weeping state"),
      difficulty: 4,
      questions: [
        { q: "How did the Prophet ﷺ say to enter Al-Hijr's homes?", a: "Only weeping", wrong: ["Laughing", "Shopping", "Camping there"], why: "Unless you enter in a weeping state." },
        { q: "What did he do in the valley, in Bukhari 4419?", a: "Covered his head and hurried", wrong: ["Stayed three days", "Built a camp", "Held a feast"], why: "He covered his head and made his speed fast." },
        { q: "What seized Thamud, in 7:78?", a: "The earthquake", wrong: ["A flood", "A wind", "Locusts"], why: "Fa akhadhat-humur-rajfah." }
      ]
    },
    {
      slug: "salih-turns",
      title: "Salih turns away",
      line: "Salih told them: I gave you good advice, but you hate advisers.",
      facts: ["Nasihin: advisers", "A last word"],
      quote: q7(79),
      source: ik(79, "After they were destroyed, Salih spoke to them in blame: I conveyed my Lord's message and advised you, but you do not like advisers. They heard him, as a miracle. The Prophet ﷺ likewise spoke to the fallen at Badr.", "These are the words of admonishment that Salih conveyed to his people after Allah destroyed them"),
      difficulty: 4,
      questions: [
        { q: "What did Salih say they disliked, in 7:79?", a: "Sincere advisers", wrong: ["Camels", "Rain", "Mountains"], why: "Wa lakin la tuhibbunan-nasihin." },
        { q: "When did Salih say these words, per Ibn Kathir?", a: "After they were destroyed", wrong: ["Before he was sent", "At his birth", "Years earlier"], why: "Salih said these words after they perished." },
        { q: "Ibn Kathir links this to the Prophet ﷺ at Badr.", tf: true, why: "He stood by the well of Badr and addressed them." }
      ]
    },
    {
      slug: "lut-sent",
      title: "Lut is sent",
      line: "Lut, Ibrahim's nephew, warned a people of a shameful new sin.",
      facts: ["Nephew of Ibrahim", "Sadum (Sodom)"],
      quote: q7(80),
      source: ik(80, "Lut was the nephew of Ibrahim; he believed in him and migrated with him to Sham. Allah sent him to Sadum and nearby towns, whose people did a shameful sin no nation had done before them.", "he was the nephew of Ibrahim"),
      difficulty: 3,
      questions: [
        { q: "How was Lut related to Ibrahim?", a: "His nephew", wrong: ["His son", "His father", "His teacher"], why: "Lut was the nephew of Ibrahim." },
        { q: "Where did Lut migrate with Ibrahim?", a: "To Sham", wrong: ["To Yemen", "To Egypt", "To India"], why: "Lut migrated with him to the Sham area." },
        { q: "The sin of Lut's people was new to mankind, per 7:80.", tf: true, why: "Ma sabaqakum biha min ahadin minal-alamin." }
      ]
    },
    {
      slug: "pure-is-shameful",
      title: "Shamed for being pure",
      line: "They wanted Lut out because he and his followers stayed pure.",
      facts: ["Yatatahharun: keep pure", "His wife stayed behind"],
      quote: q7(82),
      source: ik(82, "Lut's people answered only: drive them out, they want to be pure. Qatadah said they shamed them for something that is no shame at all. Allah saved Lut and his family, except his wife, who stayed with her people.", "They shamed them (Lut and the believers) with what is not a shame at all"),
      difficulty: 4,
      questions: [
        { q: "Why did they want Lut out, in 7:82?", a: "He and his people kept pure", wrong: ["He was rich", "He was a stranger", "He was loud"], why: "Innahum unasun yatatahharun." },
        { q: "Who of Lut's family was not saved, in 7:83?", a: "His wife", wrong: ["His daughters", "Lut himself", "No one"], why: "Illam-ra'atahu kanat minal-ghabirin." },
        { q: "What fell on Lut's people, in 7:84?", a: "A rain of stones", wrong: ["Water", "Snow", "Fruit"], why: "Wa amtarna alayhim matara." }
      ]
    },
    {
      slug: "full-measure",
      title: "Give full measure",
      line: "Shu'ayb told Madyan: give full weight and do not cheat people.",
      facts: ["Al-kayl wal-mizan", "Madyan"],
      quote: q7(85),
      source: ik(85, "Allah sent Shu'ayb to Madyan, a tribe and city near Ma'an on the way to the Hijaz. He called them to Allah and to give full measure and weight, meaning stop cheating people in buying and selling.", "to refrain from cheating people in buying and selling"),
      difficulty: 2,
      questions: [
        { q: "What did Shu'ayb tell Madyan, in 7:85?", a: "Give full measure and weight", wrong: ["Raise prices", "Stop trading", "Hide goods"], why: "Fa awful-kayla wal-mizan." },
        { q: "What were they doing, per Ibn Kathir?", a: "Cheating in buying and selling", wrong: ["Giving too much", "Sharing freely", "Closing shops"], why: "Refrain from cheating people in buying and selling." },
        { q: "Honest trade is part of the call of Shu'ayb.", tf: true, why: "Wa la tabkhasun-nasa ashya'ahum." }
      ]
    },
    {
      slug: "roadblocks",
      title: "Do not sit on every road",
      line: "Shu'ayb forbade blocking roads to rob people and stop believers.",
      facts: ["Bandits on the road", "Wait for Allah's judgment"],
      quote: q7(86),
      source: ik(86, "Shu'ayb forbade sitting on every road threatening people for their money, as bandits did, and blocking believers from Allah's path. If some believe and some do not, be patient until Allah judges.", "threatening people with death if they do not give up their money, as they were bandits"),
      difficulty: 3,
      questions: [
        { q: "What were they doing on the roads, per As-Suddi?", a: "Robbing travelers", wrong: ["Building inns", "Selling food", "Fixing roads"], why: "As they were bandits." },
        { q: "What did Shu'ayb say to do if they split, in 7:87?", a: "Be patient until Allah judges", wrong: ["Fight at once", "Give up", "Run away"], why: "Fasbiru hatta yahkumallahu baynana." },
        { q: "Allah made Madyan many after they were few.", tf: true, why: "Wadhkuru idh kuntum qalilan fakath-tharakum." }
      ]
    },
    {
      slug: "trust-allah",
      title: "In Allah we trust",
      line: "Threatened with exile, Shu'ayb said: in Allah we put our trust.",
      facts: ["Tawakkul: trust", "Best of judges"],
      quote: q7(89),
      source: ik(89, "The chiefs threatened to expel Shu'ayb and the believers unless they returned to their religion. He said: we would be lying about Allah if we went back. In Allah we trust; judge between us, You are the Most Just.", "and You are the Most Just Who never wrongs any in His judgment"),
      difficulty: 4,
      questions: [
        { q: "What did the chiefs threaten, in 7:88?", a: "To drive them out of town", wrong: ["To give them gifts", "To make them chiefs", "Nothing"], why: "La nukhrijannaka ya Shu'ayb." },
        { q: "In whom did Shu'ayb put his trust, in 7:89?", a: "In Allah alone", wrong: ["In the chiefs", "In his wealth", "In his tribe"], why: "Alallahi tawakkalna." },
        { q: "Allah never wrongs anyone in His judgment.", tf: true, why: "He is the Most Just who never wrongs any." }
      ]
    },
    {
      slug: "who-lost",
      title: "Who were the losers?",
      line: "They said following Shu'ayb meant loss; they were the losers.",
      facts: ["Ar-rajfah: the earthquake", "As if never there"],
      quote: q7(92),
      source: ik(91, "The chiefs warned their people that following Shu'ayb meant loss. The earthquake shook them for threatening to expel Shu'ayb, and they became as if they had never lived there. They themselves were the losers.", "the earthquake shook them, as punishment for threatening to expel"),
      difficulty: 3,
      questions: [
        { q: "Who did the chiefs say would lose, in 7:90?", a: "Followers of Shu'ayb", wrong: ["The chiefs", "Strangers", "No one"], why: "La'init-taba'tum Shu'ayban innakum idhan lakhasirun." },
        { q: "Who really lost, in 7:92?", a: "Those who denied Shu'ayb", wrong: ["Shu'ayb's followers", "Shu'ayb", "The travelers"], why: "Kanu humul-khasirin." },
        { q: "After the earthquake it was as if they had never lived there.", tf: true, why: "Ka-allam yaghnaw fiha." }
      ]
    },
    {
      slug: "no-grief",
      title: "Why grieve for them?",
      line: "Shu'ayb said: I conveyed and advised; why grieve for deniers?",
      facts: ["Asa: grief", "The message delivered"],
      quote: q7(93),
      source: ik(93, "Shu'ayb turned from his people after the punishment and said: I conveyed my Lord's messages and advised you. I will not grieve for you, since you denied what I brought.", "so I will not feel any sorrow for you since you disbelieved in what I brought you"),
      difficulty: 3,
      questions: [
        { q: "What had Shu'ayb done, in 7:93?", a: "Conveyed and advised", wrong: ["Stayed silent", "Joined them", "Hidden the message"], why: "Laqad ablaghtukum risalati rabbi wa nasahtu lakum." },
        { q: "Why would he not grieve, per Ibn Kathir?", a: "They denied what he brought", wrong: ["He did not care", "He forgot them", "He was angry at Allah"], why: "Since you disbelieved in what I brought you." },
        { q: "Salih and Shu'ayb both spoke a last word to their people.", tf: true, why: "7:79 and 7:93 match." }
      ]
    },
    {
      slug: "hardship-ease",
      title: "Hardship, then ease, as a test",
      line: "Towns were tested with hardship, then ease, to turn to Allah.",
      facts: ["Ba'sa': illness", "Darra': poverty"],
      quote: q7(94),
      source: ik(94, "Allah struck past nations with illness and poverty so they would humble themselves and call on Him. When they did not, He changed it to ease to test them. They said: our fathers had good and bad times too, and were seized suddenly.", "Allah sent down severe afflictions to them so that they might invoke Him"),
      difficulty: 4,
      questions: [
        { q: "Why did Allah send hardship, in 7:94?", a: "So they would humble themselves", wrong: ["To destroy at once", "For no reason", "To make them rich"], why: "La'allahum yaddarra'un." },
        { q: "What did Allah change the hardship to, in 7:95?", a: "Ease and plenty", wrong: ["Worse hardship", "Silence", "Night"], why: "Thumma baddalna makanas-sayyi'atil-hasanah." },
        { q: "Ease can also be a test.", tf: true, why: "He changed the affliction into prosperity to test them." }
      ]
    },
    {
      slug: "blessings-taqwa",
      title: "Belief opens the blessings",
      line: "Belief and taqwa open blessings from the sky and the earth.",
      facts: ["Barakat: blessings", "Rain and plants"],
      quote: q7(96),
      source: ik(96, "Had the towns believed and had taqwa, Allah would have opened blessings from the heaven and the earth: rain from the sky and plants from the earth. But they denied, so they were seized for what they earned.", "in reference to the rain that falls from the sky and the vegetation of the earth"),
      difficulty: 3,
      questions: [
        { q: "What opens blessings, in 7:96?", a: "Belief and taqwa", wrong: ["Wealth and pride", "Idols", "Luck"], why: "Wa law anna ahlal-qura amanu wattaqaw." },
        { q: "Blessings from heaven and earth mean what, per Ibn Kathir?", a: "Rain and plants", wrong: ["Gold and silver", "Kings and armies", "Stars and moons"], why: "The rain from the sky and vegetation of the earth." },
        { q: "Only Yunus's whole town believed after seeing punishment, per Ibn Kathir.", tf: true, why: "No city believed in its entirety, except the city of Yunus." }
      ]
    },
    {
      slug: "feel-safe",
      title: "Do not feel safe from Allah's plan",
      line: "Only losers feel safe from Allah's plan, by night or by day.",
      facts: ["Makrullah: Allah's plan", "Fear with worship"],
      quote: q7(99),
      source: ik(99, "Did the towns feel safe from punishment at night as they slept, or by day as they played? Only losers feel safe from Allah's plan. Al-Hasan al-Basri said: the believer worships while still fearing; the sinner sins and feels safe.", "The believer performs the acts of worship, all the while feeling fear"),
      difficulty: 4,
      questions: [
        { q: "Who feels safe from Allah's plan, in 7:99?", a: "The losers", wrong: ["The believers", "The prophets", "The scholars"], why: "Fala ya'manu makrallahi illal-qawmul-khasirun." },
        { q: "How does the believer worship, per Al-Hasan?", a: "While still fearing", wrong: ["Feeling totally safe", "Without care", "Only when happy"], why: "The believer performs worship all the while feeling fear." },
        { q: "The punishment could come while people slept or played.", tf: true, why: "Bayatan wa hum na'imun, or duhan wa hum yal'abun." }
      ]
    },
    {
      slug: "hearts-sealed",
      title: "Hearts that will not hear",
      line: "Those who inherit the land are warned; Allah can seal hearts.",
      facts: ["Natba'u: We seal", "Inheritors of the land"],
      quote: q7(100),
      source: ik(100, "Is it not clear to those who inherit the land that Allah could punish them for their sins as He did those before? He places a cover over their hearts so they do not hear advice.", "We place a cover over their heart"),
      difficulty: 4,
      questions: [
        { q: "Who is warned, in 7:100?", a: "Those who inherit the land", wrong: ["Only the angels", "Only the prophets", "The animals"], why: "Alladhina yarithunal-arda min ba'di ahliha." },
        { q: "What happens to sealed hearts, in 7:100?", a: "They do not hear", wrong: ["They grow stronger", "They become wise", "They sleep"], why: "Fahum la yasma'un." },
        { q: "Allah could punish later people for their sins as He did earlier ones.", tf: true, why: "An law nasha'u asabnahum bi-dhunubihim." }
      ]
    },
    {
      slug: "covenant-broken",
      title: "Not true to the covenant",
      line: "Most of them broke their covenant and were rebellious.",
      facts: ["Ahd: covenant", "Fasiqin: rebellious"],
      quote: q7(102),
      source: ik(102, "After telling the stories of Nuh, Hud, Salih, Lut and Shu'ayb, Allah says their messengers came with clear proofs. Most did not keep the covenant that He is their Lord, and threw it behind their backs.", "they defied this covenant, threw it behind their backs and worshipped others besides Allah"),
      difficulty: 5,
      questions: [
        { q: "Which prophets' stories end at 7:102?", a: "Nuh, Hud, Salih, Lut, Shu'ayb", wrong: ["Musa and Harun", "Isa and Yahya", "Yusuf and Ya'qub"], why: "Ibn Kathir lists all five." },
        { q: "What covenant did they break, per Ibn Kathir?", a: "That Allah is their Lord", wrong: ["A trade deal", "A marriage", "A peace treaty"], why: "Their covenant that He is their Lord, King." },
        { q: "What did Allah find most of them to be, in 7:102?", a: "Rebellious", wrong: ["Grateful", "Patient", "Truthful"], why: "Wa in wajadna aktharahum lafasiqin." }
      ]
    }
  ]
};


/** Ayahs 103 to 141: Musa and Fir'awn, the staff and the magicians, the plagues, the sea, and the call for an idol. */
const ARAF_FOUR: DeepUnit = {
  key: "araf4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-7",
  name: "Al-A'raf, ayahs 103 to 141",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-A'raf",
  lessons: [
    {
      slug: "musa-to-firawn",
      title: "Musa is sent to Fir'awn",
      line: "After those prophets, Allah sent Musa with signs to Fir'awn.",
      facts: ["Fir'awn: ruler of Egypt", "Ayat: signs"],
      quote: q7(103),
      source: ik(103, "After Nuh, Hud, Salih, Lut and Shu'ayb, Allah sent Musa with clear signs to Fir'awn, ruler of Egypt, and his chiefs. They rejected the signs out of injustice and stubbornness.", "who was ruler of Egypt during the time of Musa"),
      difficulty: 2,
      questions: [
        { q: "Who ruled Egypt in Musa's time, per Ibn Kathir?", a: "Fir'awn", wrong: ["Namrud", "Haman", "Qarun"], why: "Fir'awn, who was ruler of Egypt during the time of Musa." },
        { q: "Why did they reject the signs, per Ibn Kathir?", a: "Injustice and stubbornness", wrong: ["They never saw them", "They were busy", "They were asleep"], why: "Out of injustice and stubbornness on their part." },
        { q: "Musa's story comes after the five prophets of 7:59-102.", tf: true, why: "Thumma ba'athna min ba'dihim Musa." }
      ]
    },
    {
      slug: "only-the-truth",
      title: "Only the truth about Allah",
      line: "Musa told Fir'awn: I say only the truth; let Bani Isra'il go.",
      facts: ["Rasul from the Lord of all", "Let them go with me"],
      quote: q7(105),
      source: ik(105, "Musa said: I am a messenger from the Lord of all that exists. It is my duty to say only the truth about Him, because of what I know of His might. I bring clear proof, so let the Children of Israel go with me.", "It is incumbent and a duty for me to convey only the Truth from Him"),
      difficulty: 2,
      questions: [
        { q: "What did Musa ask Fir'awn, in 7:105?", a: "Let Bani Isra'il go with me", wrong: ["Make me a minister", "Give me gold", "Build me a palace"], why: "Fa arsil ma'iya bani Isra'il." },
        { q: "What may Musa say about Allah, in 7:105?", a: "Only the truth", wrong: ["Whatever pleases Fir'awn", "Nothing at all", "Guesses"], why: "An la aqula alallahi illal-haqq." },
        { q: "What did Fir'awn demand, in 7:106?", a: "Show a sign", wrong: ["Leave Egypt", "Bow to him", "Pay a tax"], why: "In kunta ji'ta bi-ayatin fa'ti biha." }
      ]
    },
    {
      slug: "staff-and-hand",
      title: "The staff and the shining hand",
      line: "Musa's staff became a serpent; his hand shone white.",
      facts: ["Thu'ban: a great serpent", "Bayda: white, shining"],
      quote: q7(107),
      source: ik(108, "Musa threw his staff and it became a huge serpent. Then he took his hand out of his cloak and it was shining white, not from any illness. When he put it back, it returned to its normal color.", "it was shining, not because of leprosy or sickness"),
      difficulty: 2,
      questions: [
        { q: "What did the staff become, in 7:107?", a: "A huge serpent", wrong: ["A tree", "A bird", "A river"], why: "Fa idha hiya thu'banun mubin." },
        { q: "How did Musa's hand look, in 7:108?", a: "Shining white", wrong: ["Red", "Black", "Hidden"], why: "Fa idha hiya bayda'u lin-nazirin." },
        { q: "The white hand was from an illness.", tf: false, why: "It was shining, not because of leprosy or sickness." }
      ]
    },
    {
      slug: "called-magician",
      title: "They called it magic",
      line: "The chiefs called Musa a skilled magician to turn people away.",
      facts: ["Sahirun alim: skilled magician", "They feared losing power"],
      quote: q7(109),
      source: ik(109, "The chiefs agreed with Fir'awn that Musa was a skilled magician. They plotted to make him look like a liar, fearing he would win the people and drive them out of their land.", "They plotted to portray Musa as a liar and fake"),
      difficulty: 3,
      questions: [
        { q: "What did the chiefs call Musa, in 7:109?", a: "A skilled magician", wrong: ["A prophet", "A king", "A farmer"], why: "Inna hadha lasahirun alim." },
        { q: "What did they fear Musa would do, in 7:110?", a: "Drive them out of their land", wrong: ["Give them gifts", "Build temples", "Join them"], why: "Yuridu an yukhrijakum min ardikum." },
        { q: "They plotted to make Musa look like a liar.", tf: true, why: "They plotted to portray Musa as a liar and fake." }
      ]
    },
    {
      slug: "gather-magicians",
      title: "Gather every magician",
      line: "Fir'awn gathered magicians from every city, promising rewards.",
      facts: ["Magic was common then", "Close to Fir'awn"],
      quote: q7(112),
      source: ik(111, "They said: delay him, and send callers to every city to bring skilled magicians. Magic was the trade of that time, widespread and popular, and they thought Musa's signs were the same kind of magic.", "At this time, magic was the trade of the day and it was widespread and popular"),
      difficulty: 3,
      questions: [
        { q: "What did the chiefs advise, in 7:111-112?", a: "Gather magicians from the cities", wrong: ["Free the slaves", "Build a ship", "Leave Egypt"], why: "Wa arsil fil-mada'ini hashirin." },
        { q: "What did Fir'awn promise the magicians, in 7:114?", a: "Reward and nearness to him", wrong: ["Nothing", "Exile", "Prison"], why: "Na'am wa innakum laminal-muqarrabin." },
        { q: "Why magicians, per Ibn Kathir?", a: "Magic was the trade of the day", wrong: ["They were prophets", "They were soldiers", "They were farmers"], why: "Magic was widespread and popular at that time." }
      ]
    },
    {
      slug: "you-throw-first",
      title: "You throw first",
      line: "Musa let the magicians throw first, so truth shone after.",
      facts: ["Sahru a'yun an-nas", "A great trick"],
      quote: q7(116),
      source: ik(116, "Musa told the magicians to throw first. They bewitched people's eyes and scared them with a great trick. Ibn Kathir says the wisdom was that the truth came after, while all were waiting, making it more impressive to their hearts.", "thus making the truth even more impressive to their hearts"),
      difficulty: 3,
      questions: [
        { q: "Who threw first, in 7:116?", a: "The magicians", wrong: ["Musa", "Fir'awn", "Harun"], why: "Qala alqu: he said, you throw." },
        { q: "What did their magic do, in 7:116?", a: "Bewitched people's eyes", wrong: ["Changed real things", "Made rain", "Healed people"], why: "Saharu a'yunan-nas." },
        { q: "Letting them go first made the truth more striking, per Ibn Kathir.", tf: true, why: "Making the truth even more impressive to their hearts." }
      ]
    },
    {
      slug: "staff-swallows",
      title: "The staff swallows the tricks",
      line: "Musa's staff swallowed their tricks; the truth stood firm.",
      facts: ["Talqafu: swallowed", "Truth confirmed"],
      quote: q7(117),
      source: ik(117, "Allah told Musa to throw his staff, and it swallowed all their falsehood. Ibn Abbas said it swallowed every rope and stick the magicians threw. The magicians knew this was from heaven, not magic.", "stick swallowed all the ropes and sticks that the magicians threw"),
      difficulty: 3,
      questions: [
        { q: "What did the staff do, in 7:117?", a: "Swallowed their tricks", wrong: ["Broke in two", "Flew away", "Became gold"], why: "Fa idha hiya talqafu ma ya'fikun." },
        { q: "What did the staff swallow, per Ibn Abbas?", a: "All their ropes and sticks", wrong: ["Fir'awn's throne", "The river", "The palace"], why: "It swallowed all the ropes and sticks the magicians threw." },
        { q: "How did Fir'awn's side end, in 7:119?", a: "Defeated and humbled", wrong: ["Victorious", "Rewarded", "Unchanged"], why: "Faghulibu hunalika wanqalabu saghirin." }
      ]
    },
    {
      slug: "magicians-bow",
      title: "The magicians fall in sajdah",
      line: "The magicians knew the truth and fell down in prostration.",
      facts: ["Rabbil-alamin", "Rabbi Musa wa Harun"],
      quote: q7(121),
      source: ik(120, "The magicians realized this was from heaven and by no means magic. They fell in prostration and said: we believe in the Lord of all that exists, the Lord of Musa and Harun.", "The magicians realized that this was from heaven and was by no means magic"),
      difficulty: 3,
      questions: [
        { q: "What did the magicians do, in 7:120?", a: "Fell in prostration", wrong: ["Ran away", "Attacked Musa", "Laughed"], why: "Wa ulqiyas-saharatu sajidin." },
        { q: "Whom did they say they believe in, in 7:121-122?", a: "The Lord of Musa and Harun", wrong: ["Fir'awn", "The cows", "Their ropes"], why: "Rabbi Musa wa Harun." },
        { q: "The magicians knew it was not magic.", tf: true, why: "They realized this was from heaven and by no means magic." }
      ]
    },
    {
      slug: "pour-patience",
      title: "Pour patience upon us",
      line: "Threatened by Fir'awn, they prayed: Lord, pour patience on us.",
      facts: ["Afrigh alayna sabra", "Die as Muslims"],
      quote: q7(126),
      source: ik(126, "Fir'awn threatened them for believing without his permission. They said: we are returning to our Lord. Our Lord, pour patience on us, keep us firm in Your religion, and let us die as Muslims.", "with your religion and being firm in it"),
      difficulty: 4,
      questions: [
        { q: "What did the believing magicians ask, in 7:126?", a: "Patience, and to die as Muslims", wrong: ["Wealth", "Revenge", "To return to magic"], why: "Rabbana afrigh alayna sabran wa tawaffana muslimin." },
        { q: "Why was Fir'awn angry, in 7:123?", a: "They believed without his permission", wrong: ["They lost", "They were late", "They stole"], why: "Amantum bihi qabla an adhana lakum." },
        { q: "To whom did they say they would return, in 7:125?", a: "To their Lord", wrong: ["To Fir'awn", "To their homes", "To magic"], why: "Inna ila rabbina munqalibun." }
      ]
    },
    {
      slug: "seek-help-patience",
      title: "Seek help in Allah and be patient",
      line: "Musa said: seek help in Allah, be patient; the earth is Allah's.",
      facts: ["Ista'inu billah", "The end is for the pious"],
      quote: q7(128),
      source: ik(128, "When Fir'awn pressed on with his plot, Musa told his people to seek Allah's help and be patient, promising that the good end would be theirs. The earth is Allah's; He gives it to whom He wills.", "and promised them that the good end will be theirs and that they will prevail"),
      difficulty: 3,
      questions: [
        { q: "What did Musa tell his people, in 7:128?", a: "Seek Allah's help and be patient", wrong: ["Give up", "Fight at once", "Run to the desert"], why: "Ista'inu billahi wasbiru." },
        { q: "To whom does the earth belong, in 7:128?", a: "To Allah", wrong: ["To Fir'awn", "To the strong", "To no one"], why: "Innal-arda lillah." },
        { q: "For whom is the good end, in 7:128?", a: "The pious", wrong: ["The rich", "The proud", "The many"], why: "Wal-aqibatu lil-muttaqin." }
      ]
    },
    {
      slug: "how-you-act",
      title: "So He may see how you act",
      line: "Musa said: Allah may give you the land, then watch you.",
      facts: ["Before and after Musa", "Hardship then a test"],
      quote: q7(129),
      source: ik(129, "Bani Isra'il complained: we suffered before you came and after. Musa said: perhaps your Lord will destroy your enemy and make you successors, so He may see how you act, urging them to be thankful when hardship lifts.", "encouraging them to appreciate Allah when the afflictions are removed and replaced by a bounty"),
      difficulty: 4,
      questions: [
        { q: "What did Bani Isra'il complain, in 7:129?", a: "We suffered before and after you", wrong: ["We are too rich", "We are bored", "We miss Egypt"], why: "Udhina min qabli an ta'tiyana wa min ba'di ma ji'tana." },
        { q: "Why would Allah make them successors, in 7:129?", a: "To see how they act", wrong: ["To make them proud", "For no reason", "To punish them"], why: "Fa yanzura kayfa ta'malun." },
        { q: "Ease after hardship is also a test.", tf: true, why: "He wants to see how you act once the afflictions lift." }
      ]
    },
    {
      slug: "years-of-drought",
      title: "Years of drought",
      line: "Fir'awn's people got drought and blamed Musa for every bad year.",
      facts: ["Sinin: years of drought", "Tatayyur: bad omens"],
      quote: q7(130),
      source: ik(130, "Allah tried Fir'awn's people with years of drought and poor harvests so they would take heed. When good came they said: we deserve it; when bad came they blamed Musa. Their fortune is with Allah.", "Allah says that their afflictions are with and from Him"),
      difficulty: 3,
      questions: [
        { q: "What did they say when good came, in 7:131?", a: "This is ours", wrong: ["Thank Allah", "Thank Musa", "Share it"], why: "Qalu lana hadhihi." },
        { q: "Whom did they blame for bad times, in 7:131?", a: "Musa and those with him", wrong: ["Fir'awn", "Themselves", "The weather only"], why: "Yattayyaru bi-Musa wa man ma'ah." },
        { q: "Bad omens decide what happens to us.", tf: false, why: "Their omens are with Allah: all is from Him." }
      ]
    },
    {
      slug: "five-signs",
      title: "Flood, locusts, lice, frogs, blood",
      line: "Sign after sign came; each time they promised, then broke it.",
      facts: ["Five clear signs", "Promises broken"],
      quote: q7(133),
      source: ik(133, "They said they would never believe. So came the flood, the locusts, the lice, the frogs and the blood. Each time they begged Musa to pray, Allah removed it, and each time they broke their promise.", "Musa invoked his Lord and He removed the affliction from them, but they did not keep their promises"),
      difficulty: 4,
      questions: [
        { q: "Which of these was a sign sent in 7:133?", a: "Frogs", wrong: ["Snow", "Snakes", "Lions"], why: "At-tufan, al-jarad, al-qummal, ad-difa', ad-dam." },
        { q: "What did they do after each sign was lifted, in 7:135?", a: "Broke their promise", wrong: ["Believed", "Freed Bani Isra'il", "Thanked Allah"], why: "Idha hum yankuthun." },
        { q: "What happened to their water, per Ibn Kathir?", a: "It turned to blood", wrong: ["It turned to milk", "It froze", "It dried up only"], why: "Any water they collected turned to blood." }
      ]
    },
    {
      slug: "drowned-sea",
      title: "Drowned in the sea",
      line: "Fir'awn's army drowned; the weak inherited the blessed land.",
      facts: ["Al-yamm: the sea", "Sabr rewarded"],
      quote: q7(137),
      source: ik(137, "After sign upon sign, Allah drowned Fir'awn's people in the sea that Musa parted by Allah's power, after Musa and Bani Isra'il passed through. The weak inherited the blessed land, because of their patience.", "by drowning them in the sea that Musa parted by Allah"),
      difficulty: 3,
      questions: [
        { q: "How did Fir'awn's people end, in 7:136?", a: "Drowned in the sea", wrong: ["Burned", "Lost in sand", "Turned to stone"], why: "Fa aghraqnahum fil-yamm." },
        { q: "Who inherited the land, in 7:137?", a: "Those who were counted weak", wrong: ["Fir'awn's sons", "The magicians", "Strangers"], why: "Al-qawmal-ladhina kanu yustad'afun." },
        { q: "Why was Allah's promise fulfilled for them, in 7:137?", a: "Because of their patience", wrong: ["Because of their wealth", "Because of their army", "By luck"], why: "Bima sabaru." }
      ]
    },
    {
      slug: "make-us-a-god",
      title: "Make us a god like theirs",
      line: "Just saved, some asked for an idol; Musa called them ignorant.",
      facts: ["Jahilun: ignorant", "Idols are in vain"],
      quote: q7(138),
      source: ik(138, "Right after crossing the sea and seeing Allah's signs, some of Bani Isra'il passed people worshipping idols and said: make us a god like theirs. Musa said: you are an ignorant people; what they do is in vain.", "Allah mentions the words that the ignorant ones among the Children of Israel uttered to Musa after they crossed the sea"),
      difficulty: 4,
      questions: [
        { q: "What did some ask Musa, in 7:138?", a: "Make us a god like theirs", wrong: ["Take us back", "Give us food", "Teach us magic"], why: "Ij'al lana ilahan kama lahum alihah." },
        { q: "What did Musa call them, in 7:138?", a: "An ignorant people", wrong: ["A wise people", "A brave people", "A rich people"], why: "Innakum qawmun tajhalun." },
        { q: "They asked this right after crossing the sea.", tf: true, why: "After they crossed the sea and witnessed Allah's signs." }
      ]
    },
    {
      slug: "dhat-anwat",
      title: "A tree like theirs",
      line: "Going to Hunayn, the Prophet ﷺ warned against 7:138.",
      facts: ["Dhat Anwat", "Subhan Allah"],
      quote: q7(138),
      source: hadith("tirmidhi", "2180", "Abu Waqid al-Laythi", "Sahih", "On the way to Hunayn they passed a tree the idol worshippers hung weapons on, called Dhat Anwat. Some said: make one for us. The Prophet ﷺ said: Subhan Allah, this is like what Musa's people said: make for us a god like their gods.", "This is like what Musa"),
      difficulty: 5,
      questions: [
        { q: "Where were they going, in Tirmidhi 2180?", a: "To Hunayn", wrong: ["To Badr", "To Ta'if", "To Tabuk"], why: "When the Messenger of Allah went out to Hunain." },
        { q: "What did the Prophet ﷺ compare the request to?", a: "Musa's people asking for a god", wrong: ["Adam's tree", "Nuh's ark", "Yusuf's well"], why: "This is like what Musa's people said." },
        { q: "What did the Prophet ﷺ say first?", a: "Subhan Allah", wrong: ["Allahu akbar only", "Al-hamdu lillah", "Nothing"], why: "Subhan Allah! This is like what Musa's people said." }
      ]
    },
    {
      slug: "remember-rescue",
      title: "Remember who saved you",
      line: "Musa: shall I seek you a god other than Allah, your Saviour?",
      facts: ["Fir'awn's cruelty", "A great trial"],
      quote: q7(140),
      source: ik(140, "Musa reminded Bani Isra'il of Allah's blessings: He saved them from Fir'awn's tyranny and the disgrace they suffered, and they watched their enemy drown.", "Musa reminded the Children of Israel of Allah"),
      difficulty: 4,
      questions: [
        { q: "What did Musa ask them, in 7:140?", a: "Shall I seek a god besides Allah?", wrong: ["Shall we go back?", "Shall I be king?", "Shall we build a ship?"], why: "A ghayrallahi abghikum ilaha." },
        { q: "Whom did Allah save them from, in 7:141?", a: "Fir'awn's people", wrong: ["The people of 'Ad", "The jinn", "The Romans"], why: "Wa idh anjaynakum min ali Fir'awn." },
        { q: "Their hardship under Fir'awn was a great trial from their Lord.", tf: true, why: "Wa fi dhalikum bala'un min rabbikum azim." }
      ]
    }
  ]
};

/** Ayahs 142 to 171: forty nights, the mountain, the Tablets, the calf, the seventy, the Prophet ﷺ foretold, the Sabbath town. */
const ARAF_FIVE: DeepUnit = {
  key: "araf5",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-7",
  name: "Al-A'raf, ayahs 142 to 171",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-A'raf",
  lessons: [
    {
      slug: "forty-nights",
      title: "Forty nights",
      line: "Allah set Musa thirty nights, then ten more: forty in all.",
      facts: ["Thirty plus ten", "Harun stood in his place"],
      quote: q7(142),
      source: ik(142, "Allah set thirty nights for Musa, which the scholars of tafsir say he fasted, then added ten to make forty. Musa left Harun with the people and told him to act rightly, only as a reminder, for Harun was a noble prophet.", "Musa left his brother Harun with the Children of Israel and commanded him to use wisdom and refrain from mischief"),
      difficulty: 2,
      questions: [
        { q: "How many nights in all, in 7:142?", a: "Forty", wrong: ["Thirty", "Seven", "Ten"], why: "Thirty, completed with ten: arba'ina laylah." },
        { q: "Whom did Musa leave in charge, in 7:142?", a: "His brother Harun", wrong: ["Yusha'", "As-Samiri", "Fir'awn"], why: "Ukhlufni fi qawmi." },
        { q: "Harun was himself a noble prophet.", tf: true, why: "Harun was an honorable and noble Prophet." }
      ]
    },
    {
      slug: "mountain-to-dust",
      title: "The mountain turned to dust",
      line: "Musa asked to see Allah; the mountain crumbled and Musa fainted.",
      facts: ["Lan tarani", "Subhanak, tubtu ilayk"],
      quote: q7(143),
      source: ik(143, "Musa asked to see Allah. Allah said: you cannot see Me, but look at the mountain. When His Lord appeared to it, it crumbled to dust and Musa fell unconscious. Waking, he glorified Allah and repented.", "Musa asks to see Allah"),
      difficulty: 3,
      questions: [
        { q: "What happened to the mountain, in 7:143?", a: "It crumbled to dust", wrong: ["It grew taller", "It moved", "Nothing"], why: "Ja'alahu dakka." },
        { q: "What happened to Musa, in 7:143?", a: "He fell unconscious", wrong: ["He ran away", "He laughed", "He became king"], why: "Wa kharra Musa sa'iqa." },
        { q: "What did Musa say on waking?", a: "Glory to You, I repent to You", wrong: ["Show me again", "I am tired", "Let me go home"], why: "Subhanaka tubtu ilayka." }
      ]
    },
    {
      slug: "the-tablets",
      title: "Hold the Tablets firmly",
      line: "Allah chose Musa and wrote guidance for him on the Tablets.",
      facts: ["Al-alwah: the Tablets", "Take the best of it"],
      quote: q7(145),
      source: ik(144, "Allah chose Musa above the people of his time by His message and by speaking to him, and gave him the Tablets. Ibn Kathir adds that Muhammad ﷺ is the chief of all the children of Adam.", "He has chosen him above the people of his time, by His Message and by speaking to him"),
      difficulty: 3,
      questions: [
        { q: "How was Musa chosen, in 7:144?", a: "By messages and Allah speaking to him", wrong: ["By wealth", "By an army", "By a crown"], why: "Bi-risalati wa bi-kalami." },
        { q: "What was Musa told to do with the Tablets, in 7:145?", a: "Hold them firmly", wrong: ["Hide them", "Sell them", "Bury them"], why: "Fa khudh-ha bi-quwwah." },
        { q: "Who is the chief of all the children of Adam, per Ibn Kathir?", a: "Muhammad ﷺ", wrong: ["Musa", "Adam", "Nuh"], why: "Muhammad is the chief of all the Children of Adam." }
      ]
    },
    {
      slug: "pride-blinds",
      title: "Pride blocks the signs",
      line: "Allah turns the proud from His signs; they pick the wrong road.",
      facts: ["Yatakabbarun: the proud", "Deeds wasted"],
      quote: q7(146),
      source: ik(146, "Allah keeps the hearts of the arrogant from understanding His signs. Even if they see every sign, they do not believe; if they see the right way they leave it, and if they see the wrong way they take it.", "I shall deprive the hearts of those who are too proud to obey Me"),
      difficulty: 4,
      questions: [
        { q: "Whom does Allah turn from His signs, in 7:146?", a: "The arrogant", wrong: ["The humble", "The poor", "Children"], why: "Alladhina yatakabbaruna fil-ard." },
        { q: "Which way do they take, in 7:146?", a: "The wrong way", wrong: ["The right way", "No way", "Both"], why: "In yaraw sabilal-ghayyi yattakhidhuhu sabila." },
        { q: "Even seeing every sign, the proud do not believe.", tf: true, why: "Wa in yaraw kulla ayatin la yu'minu biha." }
      ]
    },
    {
      slug: "golden-calf",
      title: "The calf that could not speak",
      line: "With Musa away, they worshipped a calf made from jewelry.",
      facts: ["As-Samiri", "It could not guide"],
      quote: q7(148),
      source: ik(148, "While Musa was away, As-Samiri shaped a calf from ornaments and it seemed to make a sound. Could they not see it neither spoke nor guided? Then they regretted: if our Lord does not forgive us, we are lost.", "He made the shape of a calf with these ornaments"),
      difficulty: 3,
      questions: [
        { q: "What was the calf made from, in 7:148?", a: "Their ornaments", wrong: ["Wood", "Clay", "Stone"], why: "Min huliyyihim ijlan." },
        { q: "What could the calf not do, in 7:148?", a: "Speak or guide them", wrong: ["Shine", "Be seen", "Be carried"], why: "Annahu la yukallimuhum wa la yahdihim sabila." },
        { q: "Who made the calf, per Ibn Kathir?", a: "As-Samiri", wrong: ["Harun", "Musa", "Fir'awn"], why: "The calf that As-Samiri made for them." }
      ]
    },
    {
      slug: "forgive-me-brother",
      title: "Forgive me and my brother",
      line: "Musa came back grieved, then prayed for himself and Harun.",
      facts: ["Ghadban asifa: angry, grieved", "Arhamur-rahimin"],
      quote: q7(151),
      source: ik(150, "Musa returned angry and full of regret, threw down the Tablets and took hold of his brother. Harun said: the people overpowered me. Musa then prayed: my Lord, forgive me and my brother, You are the Most Merciful.", "he became angry and full of regret"),
      difficulty: 4,
      questions: [
        { q: "How did Musa return, in 7:150?", a: "Angry and grieved", wrong: ["Happy", "Sleepy", "Calm"], why: "Ghadbana asifa." },
        { q: "What did Harun say, in 7:150?", a: "The people overpowered me", wrong: ["I joined them", "I was away", "I made the calf"], why: "Innal-qawmas-tad'afuni." },
        { q: "Whom did Musa ask forgiveness for, in 7:151?", a: "Himself and his brother", wrong: ["Only the people", "Only Fir'awn", "No one"], why: "Rabbighfir li wa li-akhi." }
      ]
    },
    {
      slug: "door-of-repentance",
      title: "The door of repentance",
      line: "Whoever repents after wrong and believes finds Allah forgiving.",
      facts: ["Tawbah: repentance", "Ghafur, Rahim"],
      quote: q7(153),
      source: ik(152, "Those who took the calf earned humiliation, and the same is for all who invent new things in religion. But whoever does evil, then repents and believes, finds Allah Oft-Forgiving, Most Merciful.", "is for all those who invent an innovation (in religion)"),
      difficulty: 4,
      questions: [
        { q: "Who finds Allah forgiving, in 7:153?", a: "Those who repent and believe", wrong: ["Only the sinless", "Only prophets", "No one"], why: "Thumma tabu min ba'diha wa amanu." },
        { q: "Whom does the warning in 7:152 cover, per Ibn Kathir?", a: "All who invent in religion", wrong: ["Only one tribe", "No one today", "Only kings"], why: "It is for all those who invent an innovation in religion." },
        { q: "After repentance, Allah is Oft-Forgiving, Most Merciful.", tf: true, why: "Inna rabbaka min ba'diha laghafurun rahim." }
      ]
    },
    {
      slug: "anger-calmed",
      title: "When the anger calmed",
      line: "Calmed, Musa took up the Tablets: guidance and mercy inside.",
      facts: ["Sakata: calmed", "Huda wa rahmah"],
      quote: q7(154),
      source: ik(154, "When Musa's anger calmed, he picked up the Tablets he had thrown out of anger for Allah's sake. In their writing was guidance and mercy for those who fear their Lord.", "which he had thrown out of jealousy for Allah and anger for His sake"),
      difficulty: 3,
      questions: [
        { q: "What did Musa do when calm, in 7:154?", a: "Took up the Tablets", wrong: ["Left the people", "Broke the calf", "Went to Egypt"], why: "Akhadhal-alwah." },
        { q: "What was in the Tablets, in 7:154?", a: "Guidance and mercy", wrong: ["Gold", "Maps", "Magic"], why: "Wa fi nuskhatiha hudan wa rahmah." },
        { q: "Musa's anger was for Allah's sake.", tf: true, why: "Out of jealousy for Allah and anger for His sake." }
      ]
    },
    {
      slug: "seventy-men",
      title: "The seventy chosen men",
      line: "Musa chose seventy men; when the earth shook, he begged mercy.",
      facts: ["Sab'ina rajula", "Anta waliyyuna"],
      quote: q7(155),
      source: ik(156, "Allah told Musa to choose seventy men to pray to their Lord. When the earthquake seized them, Musa said: will You destroy us for what the foolish did? You are our protector, so forgive us and have mercy.", "Allah commanded Musa to choose seventy men"),
      difficulty: 4,
      questions: [
        { q: "How many men did Musa choose, in 7:155?", a: "Seventy", wrong: ["Forty", "Twelve", "Seven"], why: "Sab'ina rajulan li-miqatina." },
        { q: "What seized them, in 7:155?", a: "A violent earthquake", wrong: ["A flood", "A fire", "A wind"], why: "Akhadhat-humur-rajfah." },
        { q: "What did Musa call Allah, in 7:155?", a: "Our Protector", wrong: ["Our judge only", "Our king only", "Our guest"], why: "Anta waliyyuna faghfir lana warhamna." }
      ]
    },
    {
      slug: "mercy-embraces",
      title: "My mercy embraces all things",
      line: "Allah's mercy covers all things; it is written for the pious.",
      facts: ["Wasi'at kulla shay'", "Taqwa, zakah, iman"],
      quote: q7(156),
      source: hadith("bukhari", "6000", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: Allah divided mercy into a hundred parts, kept ninety-nine with Him and sent one part down to earth. By that one part, creatures are merciful to each other, so a mare lifts her hoof away from her foal.", "Allah divided Mercy into one hundred parts"),
      difficulty: 3,
      questions: [
        { q: "What does Allah's mercy embrace, in 7:156?", a: "All things", wrong: ["Only angels", "Only Muslims", "Nothing"], why: "Wa rahmati wasi'at kulla shay'." },
        { q: "How many parts of mercy came to earth, in Bukhari 6000?", a: "One part of a hundred", wrong: ["All hundred", "Fifty", "Ninety-nine"], why: "He kept ninety-nine and sent down one." },
        { q: "For whom is mercy written, in 7:156?", a: "The pious who give zakah and believe", wrong: ["The proud", "The idle", "The cruel"], why: "Lilladhina yattaquna wa yu'tunaz-zakah." }
      ]
    },
    {
      slug: "foretold-prophet",
      title: "Written in the Tawrah and Injil",
      line: "The unlettered Prophet ﷺ is described in the Tawrah and Injil.",
      facts: ["An-nabiyy al-ummi", "Light sent down"],
      quote: q7(157),
      source: hadith("bukhari", "2125", "Ata ibn Yasar", "Sahih", "Abdullah ibn Amr said the Prophet ﷺ is described in the Torah with qualities the Quran gives him: O Prophet, We sent you as a witness, a giver of good news and a warner.", "he is described in Torah with some of the qualities attributed to him in the Qur"),
      difficulty: 4,
      questions: [
        { q: "Where is the Prophet ﷺ described, in 7:157?", a: "In the Tawrah and Injil", wrong: ["Only in poems", "Nowhere before", "In Greek books"], why: "Yajidunahu maktuban indahum fit-tawrati wal-injil." },
        { q: "Who told of the Torah's description, in Bukhari 2125?", a: "Abdullah ibn Amr", wrong: ["Abu Bakr", "Anas", "Ali"], why: "Ata met Abdullah bin Amr and asked him." },
        { q: "The Prophet ﷺ makes the good things lawful and the evil ones unlawful.", tf: true, why: "Yuhillu lahumut-tayyibati wa yuharrimu alayhimul-khaba'ith." }
      ]
    },
    {
      slug: "to-all-mankind",
      title: "Sent to all mankind",
      line: "The Prophet ﷺ was sent to all people, Arab and non-Arab alike.",
      facts: ["Ya ayyuhan-nas", "Jami'an: all of you"],
      quote: q7(158),
      source: hadith("bukhari", "335", "Jabir ibn Abdullah", "Sahih", "The Prophet ﷺ said he was given five things no one before him was given. Among them: every prophet was sent to his own nation only, but he was sent to all mankind.", "I have been given five things which were not given to any one else before me"),
      difficulty: 3,
      questions: [
        { q: "To whom was the Prophet ﷺ sent, in 7:158?", a: "To all mankind", wrong: ["Only Arabs", "Only Quraysh", "Only Makkah"], why: "Inni rasulullahi ilaykum jami'a." },
        { q: "How many special gifts does Bukhari 335 list?", a: "Five", wrong: ["Two", "Ten", "Seven"], why: "I have been given five things." },
        { q: "Earlier prophets were sent only to their own nation.", tf: true, why: "Every Prophet used to be sent to his nation only." }
      ]
    },
    {
      slug: "twelve-springs",
      title: "Twelve springs from the rock",
      line: "Musa struck the rock; twelve springs burst out, one per tribe.",
      facts: ["Twelve tribes", "Manna and quails"],
      quote: q7(160),
      source: ik(160, "Allah divided Bani Isra'il into twelve tribes. When they asked for water, Musa struck the stone and twelve springs gushed out, each tribe knowing its own. Allah shaded them with clouds and sent manna and quails.", "We revealed to Musa when his people asked him for water"),
      difficulty: 3,
      questions: [
        { q: "How many springs burst out, in 7:160?", a: "Twelve", wrong: ["One", "Seven", "Forty"], why: "Fanbajasat minhuthnata ashrata ayna." },
        { q: "What food was sent down, in 7:160?", a: "Manna and quails", wrong: ["Bread and fish", "Dates and milk", "Rice"], why: "Wa anzalna alayhimul-manna was-salwa." },
        { q: "Each tribe knew its own drinking place.", tf: true, why: "Qad alima kullu unasin mashrabahum." }
      ]
    },
    {
      slug: "say-forgive-us",
      title: "Enter humbly and say: forgive us",
      line: "Told to enter humbly asking forgiveness, some changed the word.",
      facts: ["Hittah: forgive us", "Sujjadan: bowing"],
      quote: q7(161),
      source: ik(161, "They were told to live in the town, eat freely, say: forgive our sins, and enter the gate bowing humbly. But the wrongdoers among them changed the word they were given, and a punishment came from the sky.", "and enter the gate prostrating (bowing with humility)"),
      difficulty: 4,
      questions: [
        { q: "How were they told to enter, in 7:161?", a: "Bowing humbly", wrong: ["Proudly", "Running", "Singing"], why: "Wadkhulul-baba sujjada." },
        { q: "What did the wrongdoers do, in 7:162?", a: "Changed the word", wrong: ["Said it twice", "Stayed silent", "Wrote it down"], why: "Fabaddalal-ladhina zalamu minhum qawlan." },
        { q: "What were they told to say?", a: "Forgive our sins", wrong: ["Give us gold", "We are best", "Nothing"], why: "Wa qulu hittah." }
      ]
    },
    {
      slug: "sabbath-town",
      title: "The town by the sea",
      line: "Fish came on the Sabbath only; it was a test they failed.",
      facts: ["As-sabt: the Sabbath", "A test by Allah"],
      quote: q7(163),
      source: ik(163, "The town by the sea broke the Sabbath. Their fish came openly on the Sabbath and not on other days, a test for their disobedience. They used tricks to get around Allah's command.", "for their evil actions, transgression and defiance by way of deceit"),
      difficulty: 4,
      questions: [
        { q: "When did the fish come, in 7:163?", a: "On the Sabbath", wrong: ["Every day", "Only at night", "Never"], why: "Idh ta'tihim hitanuhum yawma sabtihim shurra'a." },
        { q: "Why were they tested, in 7:163?", a: "For their disobedience", wrong: ["For their charity", "For no reason", "For their prayers"], why: "Bima kanu yafsuqun." },
        { q: "They used tricks to get around the command, per Ibn Kathir.", tf: true, why: "Defiance by way of deceit." }
      ]
    },
    {
      slug: "why-preach",
      title: "Why do you still advise them?",
      line: "Those who kept forbidding evil were saved; advice is a duty.",
      facts: ["Ma'dhiratan: an excuse", "Three groups"],
      quote: q7(165),
      source: ik(164, "The town split into three: those who broke the Sabbath, those who forbade them, and those who did neither and asked: why preach to them? The preachers said: to be free of blame before our Lord, and perhaps they will fear Him. The forbidders were saved.", "Another group prohibited them from transgression and avoided them"),
      difficulty: 4,
      questions: [
        { q: "Into how many groups was the town split, per Ibn Kathir?", a: "Three", wrong: ["Two", "Five", "Twelve"], why: "The people of this village were divided into three groups." },
        { q: "Why did the preachers keep advising, in 7:164?", a: "To be blameless before Allah", wrong: ["To get paid", "To show off", "To start a fight"], why: "Ma'dhiratan ila rabbikum wa la'allahum yattaqun." },
        { q: "Who was saved, in 7:165?", a: "Those who forbade evil", wrong: ["Those who stayed silent", "Those who broke it", "No one"], why: "Anjaynal-ladhina yanhawna anis-su'." }
      ]
    },
    {
      slug: "change-it",
      title: "Change it with your hand",
      line: "See wrong? Change it by hand, then tongue, else hate it.",
      facts: ["Hand, tongue, heart", "The weakest faith"],
      quote: q7(165),
      source: hadith("muslim", "49", "Abu Sa'id al-Khudri", "Sahih", "The Prophet ﷺ said: whoever of you sees something wrong, let him change it with his hand; if he cannot, then with his tongue; if he cannot, then with his heart, and that is the weakest of faith.", "He who amongst you sees something abominable should m"),
      difficulty: 5,
      questions: [
        { q: "What is the first way to change a wrong, in Muslim 49?", a: "With the hand", wrong: ["With silence", "With money", "By leaving"], why: "Let him change it with his hand." },
        { q: "What is the weakest of faith, in Muslim 49?", a: "Hating it in the heart", wrong: ["Using the tongue", "Using the hand", "Ignoring it"], why: "With his heart, and that is the weakest of faith." },
        { q: "The saved group in 7:165 acted on this teaching.", tf: true, why: "They forbade the wrong and were rescued." }
      ]
    },
    {
      slug: "hereafter-better",
      title: "The Hereafter is better",
      line: "Some grabbed this world, saying: we will be forgiven anyway.",
      facts: ["False hope", "Hold fast to the Book"],
      quote: q7(169),
      source: ik(169, "A later generation inherited the Book but grabbed the cheap things of this world, saying: we will be forgiven, then did the same again. The home of the Hereafter is better for those with taqwa; Allah never wastes the reward of those who hold to the Book and pray.", "And the home in the Hereafter is better for those who have Taqwa"),
      difficulty: 4,
      questions: [
        { q: "What did the later generation say, in 7:169?", a: "We will be forgiven", wrong: ["We will repent now", "We fear Allah", "We will share"], why: "Wa yaquluna sayughfaru lana." },
        { q: "Whose reward is never wasted, in 7:170?", a: "Those who hold the Book and pray", wrong: ["Those who grab the world", "The lazy", "The proud"], why: "Innaa la nudi'u ajral-muslihin." },
        { q: "Sinning while saying we will be forgiven is false hope.", tf: true, why: "They take the same sin again whenever it comes." }
      ]
    },
    {
      slug: "mountain-raised",
      title: "The mountain raised above them",
      line: "Allah raised the mountain over them: hold firm to the Book.",
      facts: ["Nataqna: We raised", "Khudhu ma ataynakum"],
      quote: q7(171),
      source: ik(171, "Ibn Abbas said Allah raised the mountain over them like a canopy, as in 4:154, and they thought it would fall. They were told: hold firmly to what We gave you and remember what is in it.", "We raised the mountain, as Allah"),
      difficulty: 5,
      questions: [
        { q: "What was raised over them, in 7:171?", a: "The mountain", wrong: ["A cloud", "A tent", "A wall"], why: "Wa idh nataqnal-jabala fawqahum." },
        { q: "What were they told, in 7:171?", a: "Hold firmly what We gave you", wrong: ["Leave the Book", "Run away", "Build a city"], why: "Khudhu ma ataynakum bi-quwwah." },
        { q: "Which ayah does Ibn Abbas link to 7:171?", a: "4:154", wrong: ["2:255", "1:1", "112:1"], why: "We raised over them the mountain, 4:154." }
      ]
    }
  ]
};

/** Ayahs 172 to 206: the covenant of Am I not your Lord, the Beautiful Names, the Hour, forgiveness, and the sajdah. */
const ARAF_SIX: DeepUnit = {
  key: "araf6",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-7",
  name: "Al-A'raf, ayahs 172 to 206",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-A'raf",
  lessons: [
    {
      slug: "am-i-not",
      title: "Am I not your Lord?",
      line: "Before this world, Adam's children said: yes, You are our Lord.",
      facts: ["Alastu bi-rabbikum", "Bala: yes"],
      quote: q7(172),
      source: ik(172, "Allah brought Adam's descendants out and they testified that He is their Lord and King, with no god but Him. He created them on this fitrah, so no one can say on Judgment Day: we did not know, or we only followed our fathers.", "Allah created them on this Fitrah"),
      difficulty: 2,
      questions: [
        { q: "What did Allah ask Adam's children, in 7:172?", a: "Am I not your Lord?", wrong: ["Who made you?", "Where are you?", "What do you want?"], why: "Alastu bi-rabbikum." },
        { q: "What did they answer, in 7:172?", a: "Yes, we testify", wrong: ["No", "We do not know", "Ask our fathers"], why: "Qalu bala shahidna." },
        { q: "Following our fathers is an excuse on Judgment Day.", tf: false, why: "7:173 removes that excuse." }
      ]
    },
    {
      slug: "threw-it-away",
      title: "He threw the signs away",
      line: "A man given knowledge threw it off and chased this world.",
      facts: ["Insalakha: slipped out", "Clung to the earth"],
      quote: q7(175),
      source: ik(175, "Allah tells of a man given His signs who threw them off, so Shaytan caught him and he went astray. Ibn Mas'ud said he was Bal'am of Bani Isra'il. He clung to this world and his desires, like a dog that pants either way.", "Is about Bal"),
      difficulty: 3,
      questions: [
        { q: "What did the man do with Allah's signs, in 7:175?", a: "Threw them off", wrong: ["Taught them", "Wrote them", "Kept them"], why: "Fansalakha minha." },
        { q: "What did he cling to, in 7:176?", a: "The earth and his desires", wrong: ["The Book", "The prayer", "The truth"], why: "Akhlada ilal-ardi wattaba'a hawah." },
        { q: "Knowledge without action can still lead someone astray.", tf: true, why: "He was given the signs and still went astray." }
      ]
    },
    {
      slug: "hearts-eyes-ears",
      title: "Hearts, eyes and ears unused",
      line: "Some have hearts, eyes and ears but never use them for truth.",
      facts: ["Like cattle", "Al-ghafilun: the heedless"],
      quote: q7(179),
      source: ik(178, "Whomever Allah guides is truly guided, and whomever He leaves astray is a loser. Whatever Allah wills happens, and what He does not will does not happen.", "Verily, whatever Allah wills occurs; and whatever He does not will, does not occur"),
      difficulty: 3,
      questions: [
        { q: "What do the heedless not do with their hearts, in 7:179?", a: "Understand", wrong: ["Beat", "Feel", "Grow"], why: "Lahum qulubun la yafqahuna biha." },
        { q: "What are they compared to, in 7:179?", a: "Cattle, or even more astray", wrong: ["Angels", "Lions", "Birds"], why: "Ula'ika kal-an'ami bal hum adall." },
        { q: "Whatever Allah wills happens, per Ibn Kathir.", tf: true, why: "Whatever Allah wills occurs." }
      ]
    },
    {
      slug: "beautiful-names",
      title: "The most beautiful names",
      line: "Allah has the most beautiful names: call on Him by them.",
      facts: ["Al-asma' al-husna", "Ninety-nine names"],
      quote: q7(180),
      source: hadith("bukhari", "2736", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: Allah has ninety-nine names, one hundred minus one; whoever knows them will enter Paradise.", "Allah has ninety-nine names"),
      difficulty: 3,
      questions: [
        { q: "How should we call on Allah, in 7:180?", a: "By His beautiful names", wrong: ["By idols' names", "Without names", "By numbers"], why: "Wa lillahil-asma'ul-husna fad'uhu biha." },
        { q: "How many names are in Bukhari 2736?", a: "Ninety-nine", wrong: ["Seven", "Forty", "Twelve"], why: "One hundred minus one." },
        { q: "Ibn Kathir says Allah's names are not limited to ninety-nine.", tf: true, why: "Allah's Names are not restricted to only ninety-nine." }
      ]
    },
    {
      slug: "group-on-truth",
      title: "A group always on the truth",
      line: "Some always guide by the truth; such a group never ends.",
      facts: ["Yahduna bil-haqq", "Until the Last Day"],
      quote: q7(181),
      source: hadith("bukhari", "3641", "Mu'awiyah", "Sahih", "The Prophet ﷺ said: a group of my followers will keep obeying Allah's orders, unharmed by those who desert or oppose them, until the Last Day comes while they are still on the right path.", "A group of people amongst my followers will remain obedient to Allah"),
      difficulty: 4,
      questions: [
        { q: "What does the community do, in 7:181?", a: "Guides with truth and justice", wrong: ["Stays silent", "Follows desires", "Hides away"], why: "Ummatun yahduna bil-haqqi wa bihi ya'dilun." },
        { q: "Until when will the group last, in Bukhari 3641?", a: "Until the Last Day", wrong: ["One century", "Ten years", "Until Badr"], why: "Till Allah's order comes upon them." },
        { q: "Those who oppose them will not harm them.", tf: true, why: "They will not be harmed by anyone who opposes them." }
      ]
    },
    {
      slug: "step-by-step",
      title: "Seized step by step",
      line: "Deniers get more and more, feel safe, then are seized.",
      facts: ["Istidraj: step by step", "Kaydi matin"],
      quote: q7(182),
      source: ik(182, "For those who deny His signs, Allah opens doors of provision and living. They are fooled and think they are on the right path, then they are seized when they do not expect it.", "They will be deceived by all this and think that they are on the correct path"),
      difficulty: 4,
      questions: [
        { q: "What opens for the deniers first, per Ibn Kathir?", a: "Doors of provision", wrong: ["Doors of Hell", "Prison doors", "Nothing"], why: "The doors of provisions will be opened for them." },
        { q: "What do they wrongly think, per Ibn Kathir?", a: "That they are on the right path", wrong: ["That they are lost", "That they are poor", "That they will die"], why: "They think that they are on the correct path." },
        { q: "Having lots of wealth always means Allah is pleased.", tf: false, why: "It may be istidraj: a slow test." }
      ]
    },
    {
      slug: "no-madness",
      title: "Your companion is not mad",
      line: "Reflect: the Prophet ﷺ is no madman but a clear warner.",
      facts: ["Sahibuhum: their companion", "Nadhirun mubin"],
      quote: q7(184),
      source: ik(184, "Do they not reflect? Muhammad ﷺ is not mad; he is truly Allah's Messenger, calling to the truth, a clear warner to anyone with a mind and heart to understand.", "Muhammad is not mad, rather, he is truly the Messenger of Allah"),
      difficulty: 3,
      questions: [
        { q: "What is the Prophet ﷺ called, in 7:184?", a: "A clear warner", wrong: ["A poet", "A magician", "A king"], why: "In huwa illa nadhirun mubin." },
        { q: "What are they told to do, in 7:184?", a: "Reflect", wrong: ["Sleep", "Shout", "Leave"], why: "Awalam yatafakkaru." },
        { q: "Is there madness in their companion, per 7:184?", a: "No", wrong: ["Yes", "A little", "Sometimes"], why: "Ma bi-sahibihim min jinnah." }
      ]
    },
    {
      slug: "look-and-think",
      title: "Look at the heavens and earth",
      line: "Look at the heavens and earth; your end may be near.",
      facts: ["Malakut: kingdom", "The end may be near"],
      quote: q7(185),
      source: ik(185, "Do they not think about the heavens, the earth and all Allah made, so they become sure He has no equal? They should be warned that their lives may be near their end.", "They should be warned that their lifes may have reached their end"),
      difficulty: 3,
      questions: [
        { q: "What should they look at, in 7:185?", a: "The kingdom of the heavens and earth", wrong: ["Only gold", "Only idols", "Only the market"], why: "Awalam yanzuru fi malakutis-samawati wal-ard." },
        { q: "What might be near, in 7:185?", a: "The end of their lives", wrong: ["A holiday", "A harvest", "A wedding"], why: "Wa an asa an yakuna qadiqtaraba ajaluhum." },
        { q: "Creation points to One with no equal.", tf: true, why: "He who has all this has no equal or rival." }
      ]
    },
    {
      slug: "the-hour",
      title: "When is the Hour?",
      line: "Only Allah knows when the Hour comes; it will come suddenly.",
      facts: ["As-sa'ah: the Hour", "Baghtatan: suddenly"],
      quote: q7(187),
      source: hadith("bukhari", "6503", "Sahl ibn Sa'd", "Sahih", "The Prophet ﷺ said: I have been sent and the Hour like these two, showing two of his fingers held together.", "I have been sent and the Hour (is at hand) as these two"),
      difficulty: 4,
      questions: [
        { q: "Who knows when the Hour comes, in 7:187?", a: "Only Allah", wrong: ["The angels", "The stars", "The scholars"], why: "Innama ilmuha inda rabbi." },
        { q: "How will the Hour come, in 7:187?", a: "Suddenly", wrong: ["Slowly", "With a date", "After a warning letter"], why: "La ta'tikum illa baghtah." },
        { q: "What did the Prophet ﷺ show with two fingers?", a: "He and the Hour are close", wrong: ["Two prayers", "Two wives", "Two cities"], why: "I have been sent and the Hour as these two." }
      ]
    },
    {
      slug: "no-unseen",
      title: "I do not know the unseen",
      line: "The Prophet ﷺ knew of the unseen only what Allah told him.",
      facts: ["Al-ghayb: the unseen", "A warner and bringer of good news"],
      quote: q7(188),
      source: ik(188, "Allah told His Prophet ﷺ to leave all matters to Him and say he does not know the unseen future, only what Allah tells him. If he did, he would have gained much good and no harm would touch him.", "he does not know the unseen future, but he knows of it only what Allah informs him"),
      difficulty: 4,
      questions: [
        { q: "What does the Prophet ﷺ know of the unseen, per Ibn Kathir?", a: "Only what Allah tells him", wrong: ["Everything", "The time of the Hour", "Every secret"], why: "He knows of it only what Allah informs him." },
        { q: "What is the Prophet ﷺ, in 7:188?", a: "A warner and bringer of good news", wrong: ["A fortune teller", "A magician", "A king"], why: "In ana illa nadhirun wa bashir." },
        { q: "The Prophet ﷺ owned benefit and harm by himself.", tf: false, why: "La amliku li-nafsi naf'an wa la darran illa ma sha'allah." }
      ]
    },
    {
      slug: "idols-helpless",
      title: "Idols that cannot help",
      line: "Idols create nothing, cannot help, and cannot even walk or hear.",
      facts: ["Created, not creators", "No feet, hands, eyes, ears"],
      quote: q7(195),
      source: ik(191, "Do they worship things that create nothing and are themselves created? They cannot help their worshippers or even themselves. Have they feet to walk, hands to hold, eyes to see, ears to hear?", "Do they attribute as partners to Allah those who created nothing but they themselves are created"),
      difficulty: 4,
      questions: [
        { q: "What do idols create, in 7:191?", a: "Nothing", wrong: ["Rain", "Children", "Food"], why: "Ma la yakhluqu shay'an wa hum yukhlaqun." },
        { q: "Can idols help themselves, in 7:192?", a: "No", wrong: ["Yes", "Sometimes", "Only at night"], why: "Wa la anfusahum yansurun." },
        { q: "Who protects the righteous, in 7:196?", a: "Allah", wrong: ["The idols", "The chiefs", "The jinn"], why: "Inna waliyyiyallahul-ladhi nazzalal-kitab." }
      ]
    },
    {
      slug: "hold-forgiveness",
      title: "Forgive, enjoin good, turn away",
      line: "Forgive, tell people what is good, and turn from the foolish.",
      facts: ["Khudhil-afw: forgive", "Al-urf: the good"],
      quote: q7(199),
      source: hadith("bukhari", "4644", "Abdullah ibn az-Zubayr", "Sahih", "Abdullah ibn az-Zubayr said: Allah ordered His Prophet ﷺ to forgive people their bad behavior toward him.", "Allah ordered His Prophet to forgive the people their misbehavior"),
      difficulty: 3,
      questions: [
        { q: "What three things does 7:199 command?", a: "Forgive, enjoin good, turn away", wrong: ["Fight, take, keep", "Sleep, eat, rest", "Shout, argue, leave"], why: "Khudhil-afwa wa'mur bil-urfi wa a'rid anil-jahilin." },
        { q: "What was 7:199 about, per Ibn az-Zubayr?", a: "People's manners", wrong: ["Trade rules", "Fasting", "War"], why: "Forgive the people their misbehavior." },
        { q: "Whom should we turn away from, in 7:199?", a: "The foolish", wrong: ["Our parents", "The poor", "Our teachers"], why: "Wa a'rid anil-jahilin." }
      ]
    },
    {
      slug: "seek-refuge",
      title: "Seek refuge with Allah",
      line: "When Shaytan stirs you, say: a'udhu billahi minash-shaytan.",
      facts: ["Isti'adhah", "Anger goes away"],
      quote: q7(200),
      source: hadith("bukhari", "3282", "Sulayman ibn Surad", "Sahih", "Two men argued before the Prophet ﷺ and one became red with anger. The Prophet ﷺ said: I know a word that would calm him: I seek refuge with Allah from Shaytan.", "I know a word, the saying of which will cause him to relax"),
      difficulty: 3,
      questions: [
        { q: "What should we do when Shaytan stirs us, in 7:200?", a: "Seek refuge with Allah", wrong: ["Shout back", "Ignore Allah", "Run outside"], why: "Fasta'idh billah." },
        { q: "What calms anger, in Bukhari 3282?", a: "Seeking refuge from Shaytan", wrong: ["Eating", "Sleeping", "Arguing more"], why: "I seek refuge with Allah from Satan." },
        { q: "Allah is All-Hearing, All-Knowing, says 7:200.", tf: true, why: "Innahu sami'un alim." }
      ]
    },
    {
      slug: "taqwa-sees",
      title: "They remember, then they see",
      line: "When Shaytan touches the pious, they remember Allah and see.",
      facts: ["Tadhakkaru: they remember", "Mubsirun: they see"],
      quote: q7(201),
      source: ik(201, "When an evil thought, anger or a whisper of Shaytan comes to the people of taqwa, they remember Allah's punishment and reward, repent and seek refuge. Then they see clearly and know their mistake.", "they become aright and aware of the error of their ways"),
      difficulty: 4,
      questions: [
        { q: "What do the pious do when Shaytan touches them, in 7:201?", a: "They remember Allah", wrong: ["They give up", "They follow him", "They blame others"], why: "Tadhakkaru fa idha hum mubsirun." },
        { q: "What happens after they remember, in 7:201?", a: "They see clearly", wrong: ["They forget", "They sleep", "They get lost"], why: "Fa idha hum mubsirun." },
        { q: "What do the devils do to their brothers, in 7:202?", a: "Pull them deeper into error", wrong: ["Leave them alone", "Guide them", "Teach them"], why: "Yamuddunahum fil-ghayy." }
      ]
    },
    {
      slug: "listen-quran",
      title: "Listen when the Quran is recited",
      line: "When the Quran is recited, listen and be quiet to get mercy.",
      facts: ["Istami'u: listen", "Ansitu: be silent"],
      quote: q7(204),
      source: ik(204, "After calling the Quran clear proof, guidance and mercy, Allah commanded listening when it is recited, out of respect for it. This is the opposite of the Quraysh idol worshippers, who said: do not listen, make noise.", "He commanded that one listen to the Qur"),
      difficulty: 3,
      questions: [
        { q: "What should we do when the Quran is recited, in 7:204?", a: "Listen and be silent", wrong: ["Talk over it", "Leave the room", "Play music"], why: "Fastami'u lahu wa ansitu." },
        { q: "What do listeners hope for, in 7:204?", a: "Mercy", wrong: ["Money", "Fame", "Sleep"], why: "La'allakum turhamun." },
        { q: "Who said: do not listen, make noise?", a: "The idol worshippers of Quraysh", wrong: ["The Companions", "The angels", "The jinn who believed"], why: "Ibn Kathir quotes 41:26." }
      ]
    },
    {
      slug: "morning-evening",
      title: "Remember Him morning and evening",
      line: "Remember your Lord humbly and softly, morning and evening.",
      facts: ["Bil-ghuduwwi wal-asal", "Not loudly"],
      quote: q7(205),
      source: ik(205, "Allah orders that He be remembered often in the mornings and evenings, humbly and with fear, in secret and not loudly. So Ibn Kathir says dhikr is best not done in a loud voice.", "remember your Lord in secret, not loudly, with eagerness and fear"),
      difficulty: 4,
      questions: [
        { q: "When does 7:205 tell us to remember Allah?", a: "Morning and evening", wrong: ["Only Fridays", "Only Ramadan", "Once a year"], why: "Bil-ghuduwwi wal-asal." },
        { q: "How should dhikr be, per Ibn Kathir?", a: "Humble and not loud", wrong: ["Shouted", "Rushed", "Hidden from Allah"], why: "In secret, not loudly, with eagerness and fear." },
        { q: "Whom are we told not to be like, in 7:205?", a: "The heedless", wrong: ["The angels", "The prophets", "The humble"], why: "Wa la takun minal-ghafilin." }
      ]
    },
    {
      slug: "sajdah-end",
      title: "The angels bow: a sajdah",
      line: "Al-A'raf ends with the angels' sajdah; we prostrate too.",
      facts: ["The first sajdah of the Quran", "Shaytan weeps"],
      quote: q7(206),
      source: hadith("muslim", "81", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: when a son of Adam recites a sajdah ayah and prostrates, Shaytan withdraws weeping and says: woe to me, he was told to prostrate and did, and Paradise is his; I was told and refused, and the Fire is mine.", "when, the son of Adam recites the Ayat of Sajdah (prostration) and then falls down in prostration, the Satan goes into seclusion and weeps"),
      difficulty: 5,
      questions: [
        { q: "What do the angels near Allah do, in 7:206?", a: "Glorify Him and prostrate", wrong: ["Rest", "Argue", "Refuse"], why: "Wa yusabbihunahu wa lahu yasjudun." },
        { q: "What does Shaytan do when we make sajdah, in Muslim 81?", a: "Withdraws weeping", wrong: ["Laughs", "Joins in", "Sleeps"], why: "The Satan goes into seclusion and weeps." },
        { q: "Al-A'raf began with Iblis refusing to bow and ends with a sajdah.", tf: true, why: "7:11-12 and 7:206 frame the whole surah." }
      ]
    }
  ]
};

export const ARAF_UNITS: readonly DeepUnit[] = [ARAF_ONE, ARAF_TWO, ARAF_THREE, ARAF_FOUR, ARAF_FIVE, ARAF_SIX];
