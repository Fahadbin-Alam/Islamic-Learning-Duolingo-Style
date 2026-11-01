import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah An-Nisa ayah by ayah, the way Al-Baqarah and Ali 'Imran are taught: every ayah or small group of ayahs gets a
// lesson, explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one
// explains the ayah. Each source opens at the highlighted words that say the lesson's point. Rulings that are only for
// a court or for adults (the punishments of 4:15-16, the rulings on captives in 4:24-25) are left to the scholars, and
// the steps of 4:34 are taught with their full explanation in the marriage unit (lifeUnits.ts).

/** Tafsir Ibn Kathir on An-Nisa 4:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_4_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on An-Nisa 4:${ayah}`,
    url: `https://quran.com/4:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 4:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q4 = (ayah: number) => quranQuote(4, ayah);

/** Ayahs 1 to 43: one family from one soul, orphans, the mahr, inheritance, kindness to wives, neighbors, tayammum. */
const NISA_ONE: DeepUnit = {
  key: "nisa1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-nisa",
  name: "An-Nisa, ayahs 1 to 43",
  kind: "skill",
  lessonType: "surah",
  surahName: "An-Nisa",
  lessons: [
    {
      slug: "madinah",
      title: "A Madinah surah",
      line: "An-Nisa came down in Madinah, after the Hijrah.",
      facts: ["176 ayahs", "An-Nisa: The Women", "Ibn Mas'ud loved five of its ayahs"],
      quote: q4(1),
      source: ik(1, "Ibn Abbas said An-Nisa was revealed in Madinah. Ibn Mas'ud said five of its ayahs were dearer to him than the world and all in it.", "was revealed in Al-Madinah"),
      difficulty: 2,
      questions: [
        { q: "Where was An-Nisa revealed?", a: "Madinah", wrong: ["Makkah", "Taif", "Abyssinia"], why: "Ibn Abbas: it was revealed in Madinah." },
        { q: "How many ayahs does An-Nisa have?", a: "176", wrong: ["200", "286", "120"], why: "It is the fourth surah, with 176 ayahs." },
        { q: "Ibn Mas'ud loved five ayahs of An-Nisa more than the world.", tf: true, why: "Ibn Kathir quotes him naming 4:31, 40, 48, 64 and 110." }
      ]
    },
    {
      slug: "one-soul",
      title: "One soul, one family",
      line: "Allah made all people from one soul, then from him his wife.",
      facts: ["Adam and Hawwa", "Taqwa: be mindful of Allah"],
      quote: q4(1),
      source: ik(1, "Allah commands people to have taqwa of Him, and reminds them that He created them all from a single person, Adam, and from him his wife Hawwa, so they feel compassion for each other.", "He created them all from a single person, Adam"),
      difficulty: 2,
      questions: [
        { q: "From whom did Allah create all people, in 4:1?", a: "One person, Adam", wrong: ["Many first couples", "The angels", "The jinn"], why: "Min nafsin wahidah: from a single soul." },
        { q: "Who was created from Adam, in 4:1?", a: "His wife, Hawwa", wrong: ["His son Shith", "An angel", "Iblis"], why: "Wa khalaqa minha zawjaha." },
        { q: "Why remind us we have one father and one mother?", a: "So we feel compassion for each other", wrong: ["So we compete", "So we stay apart", "So we boast of family"], why: "Ibn Kathir: so they are kind to the weaker among them." }
      ]
    },
    {
      slug: "wombs",
      title: "Ties of the womb",
      line: "Fear Allah, and honor the ties of the womb.",
      facts: ["Arham: family ties", "Raqib: always watching"],
      quote: q4(1),
      source: ik(1, "Revere the wombs: do not cut the ties of family, but keep and honor them. Allah watches all your deeds and sees your every state.", "by not cutting the relations of the womb, but keep and honor them"),
      difficulty: 2,
      questions: [
        { q: "What does 'arham' mean in 4:1?", a: "Family ties", wrong: ["Prayers", "Neighbors", "Wealth"], why: "The ties of the womb: your relatives." },
        { q: "What does 4:1 ask us to do with family ties?", a: "Keep and honor them", wrong: ["Cut them", "Forget them", "Sell them"], why: "Ibn Kathir: do not cut them, keep and honor them." },
        { q: "How does 4:1 end?", a: "Allah is always watching over you", wrong: ["Allah is far away", "Allah forgets", "Allah sleeps"], why: "Innallaha kana 'alaykum raqiba." }
      ]
    },
    {
      slug: "orphans-wealth",
      title: "Their wealth is theirs",
      line: "Give orphans their wealth; never swap your bad for their good.",
      facts: ["Hub kabir: a great sin", "No mixing to eat it up"],
      quote: q4(2),
      source: ik(2, "Allah commands that orphans be given their property in full when they come of age. Do not swap a weak animal or a fake coin of yours for their good ones, and do not mix their wealth with yours to eat it up.", "Allah commands that the property of the orphans be surrendered to them in full"),
      difficulty: 2,
      questions: [
        { q: "What does 4:2 command about orphans' wealth?", a: "Give it to them in full", wrong: ["Keep half", "Spend it freely", "Give it to the poor"], why: "Wa atul-yatama amwalahum." },
        { q: "A guardian swaps his weak sheep for the orphan's fat one. This is...", a: "Forbidden", wrong: ["A fair trade", "A gift", "Allowed if quiet"], why: "Do not exchange your bad for their good." },
        { q: "What does 4:2 call eating up orphans' wealth?", a: "A great sin", wrong: ["A small slip", "A good deal", "A custom"], why: "Innahu kana huban kabira." }
      ]
    },
    {
      slug: "justice-one",
      title: "Justice first",
      line: "If you fear being unjust with more, then marry only one.",
      facts: ["Sahih al-Bukhari 4574", "Urwah asked Aishah"],
      quote: q4(3),
      source: hadith("bukhari", "4574", "Aishah", "Sahih", "Aishah explained 4:3: a guardian wanted to marry the orphan girl in his care for her wealth without a fair mahr. Guardians were forbidden unless they were just, and told to marry other women.", "So such guardians were forbidden to do that unless they did justice to their female wards"),
      difficulty: 3,
      questions: [
        { q: "Who explained 4:3 to Urwah?", a: "Aishah", wrong: ["Abu Hurayrah", "Umar", "Ali"], why: "Sahih al-Bukhari 4574." },
        { q: "What were guardians forbidden, in 4:3?", a: "Marrying orphan girls without a fair mahr", wrong: ["Feeding orphans", "Teaching orphans", "Visiting orphans"], why: "Unless they did justice and gave the highest mahr." },
        { q: "If a man fears he cannot be just with more, what does 4:3 say?", a: "Marry only one", wrong: ["Marry four anyway", "Never marry", "Ask a friend"], why: "Fa-in khiftum alla ta'dilu fa-wahidah." }
      ]
    },
    {
      slug: "mahr",
      title: "The mahr is her right",
      line: "Give women their mahr with a good heart; it is their right.",
      facts: ["Saduqat: dowries", "Nihlah: obligatory"],
      quote: q4(4),
      source: ik(4, "Nihlah means obligatory: a man must give his wife her mahr with a good heart, as he gives a gift. If she freely gives some of it back, he may take it.", "the man is required to pay a dowry to his wife with a good heart"),
      difficulty: 3,
      questions: [
        { q: "Whose is the mahr, in 4:4?", a: "The bride's", wrong: ["Her father's", "The groom's", "The judge's"], why: "Give the women their dowries." },
        { q: "'Nihlah' in 4:4 means...", a: "Obligatory", wrong: ["Optional", "Small", "Secret"], why: "Aishah and others: it is required." },
        { q: "If she freely gives part of it back, may he take it?", tf: true, why: "Take it and enjoy it, in 4:4." }
      ]
    },
    {
      slug: "unwise",
      title: "Guard it kindly",
      line: "Do not hand wealth to those who cannot manage it; feed them.",
      facts: ["Sufaha: those who cannot manage", "Speak to them kindly"],
      quote: q4(5),
      source: ik(5, "Allah forbids giving the unwise, like young children, free use of wealth. Spend on them for food and clothes, and speak to them kindly: this ayah commands kind treatment of those in your care.", "This honorable Ayah commands kind treatment"),
      difficulty: 3,
      questions: [
        { q: "Who are 'the unwise' in 4:5, for example?", a: "Young children", wrong: ["Scholars", "Traders", "Neighbors"], why: "Young people cannot yet make wise decisions." },
        { q: "What should you do for them, in 4:5?", a: "Feed and clothe them from it", wrong: ["Give them nothing", "Hand them everything", "Send them away"], why: "Warzuquhum fiha waksuhum." },
        { q: "How should you speak to them?", a: "With kind words", wrong: ["Harshly", "Not at all", "With threats"], why: "Wa qulu lahum qawlan ma'rufa." }
      ]
    },
    {
      slug: "test-orphans",
      title: "Test them first",
      line: "Test orphans; once mature and wise, give them their wealth.",
      facts: ["Rich guardian: no pay", "Poor guardian: what is fair", "Bring witnesses"],
      quote: q4(6),
      source: ik(6, "Test orphans, meaning test their intelligence, until they reach the age of marriage. If they show sound judgment, hand over their property, with witnesses present. A rich guardian takes no wage; a poor one takes what is fair.", "test their intelligence"),
      difficulty: 3,
      questions: [
        { q: "When is an orphan's wealth handed over, in 4:6?", a: "When grown and of sound judgment", wrong: ["At age seven", "Never", "Whenever asked"], why: "Fa-in anastum minhum rushda." },
        { q: "What may a rich guardian take for his work?", a: "Nothing", wrong: ["Half", "A tenth", "Whatever he likes"], why: "Fal-yasta'fif: let him refrain." },
        { q: "What should be present when the wealth is handed over?", a: "Witnesses", wrong: ["A feast", "Music", "Nothing"], why: "Fa-ashhidu 'alayhim." }
      ]
    },
    {
      slug: "share-for-women",
      title: "A share for women too",
      line: "Men and women both get a share of what parents leave.",
      facts: ["Before Islam: men only", "Small or large"],
      quote: q4(7),
      source: ik(7, "The idolaters gave inheritance only to grown men, and kept it from women and children. Allah revealed that men and women both have a share, whether the wealth is small or large.", "The idolators used to give adult men a share of inheritance and deprive women and children of it"),
      difficulty: 3,
      questions: [
        { q: "Before Islam, who did the idolaters leave out of inheritance?", a: "Women and children", wrong: ["Old men", "Eldest sons", "Brothers"], why: "Ibn Kathir: they gave adult men only." },
        { q: "What does 4:7 give women?", a: "A share of the inheritance", wrong: ["Nothing", "Only gifts", "Only clothes"], why: "Wa lin-nisa'i nasib." },
        { q: "Does it matter if the wealth left is small?", tf: false, why: "Mimma qalla minhu aw kathur: small or large." }
      ]
    },
    {
      slug: "fire",
      title: "Eating fire",
      line: "Those who wrongly eat orphans' wealth eat only fire.",
      facts: ["Sahih al-Bukhari 2766", "One of seven great sins"],
      quote: q4(10),
      source: hadith("bukhari", "2766", "Abu Hurayrah", "Sahih", "Avoid the seven destroying sins: shirk, magic, taking a life Allah made sacred, eating riba, eating an orphan's wealth, fleeing the battle, and slandering chaste women.", "Avoid the seven great destructive sins"),
      difficulty: 3,
      questions: [
        { q: "What do those who wrongly eat orphans' wealth eat, in 4:10?", a: "Fire into their bellies", wrong: ["Sweet food", "Nothing at all", "Bread only"], why: "Innama ya'kuluna fi butunihim nara." },
        { q: "Is eating an orphan's wealth among the seven destroying sins?", tf: true, why: "Bukhari 2766 names it." },
        { q: "Which of these is NOT in the seven sins of Bukhari 2766?", a: "Forgetting a name", wrong: ["Eating riba", "Magic", "Shirk"], why: "The seven are grave sins, not small slips." }
      ]
    },
    {
      slug: "inheritance",
      title: "Allah divides it",
      line: "Jabir asked about his wealth, and 4:11 came down.",
      facts: ["Sahih al-Bukhari 4577", "Al-Fara'id: the shares"],
      quote: q4(11),
      source: hadith("bukhari", "4577", "Jabir ibn Abdullah", "Sahih", "The Prophet ﷺ and Abu Bakr walked to visit Jabir, who was ill and unconscious. He made wudu and sprinkled water on him. Jabir woke and asked what to do with his wealth, and 4:11 was revealed.", "What do you order me to do as regards my wealth"),
      difficulty: 3,
      questions: [
        { q: "Why did the Prophet ﷺ visit Jabir?", a: "Jabir was ill", wrong: ["For a wedding", "To trade", "For a battle"], why: "He found him unconscious." },
        { q: "What did Jabir ask when he woke?", a: "What to do with his wealth", wrong: ["Where to travel", "When to pray", "Whom to marry"], why: "Bukhari 4577." },
        { q: "Who came walking with the Prophet ﷺ?", a: "Abu Bakr", wrong: ["Umar", "Uthman", "Bilal"], why: "They came on foot to Banu Salamah." }
      ]
    },
    {
      slug: "why-double",
      title: "Why the son gets two shares",
      line: "A son gets two daughters' share, as men must spend on others.",
      facts: ["Jahiliyyah: daughters got nothing", "Men pay mahr and upkeep"],
      quote: q4(11),
      source: ik(11, "The people of Jahiliyyah gave males and not females. Allah gave both a share, the male twice the female, because men must spend on their dependants, on trade and on their duties.", "Allah commands that both males and females take a share in the inheritance"),
      difficulty: 4,
      questions: [
        { q: "In 4:11, a son's share equals...", a: "Two daughters' shares", wrong: ["One daughter's share", "Half a daughter's share", "Everything"], why: "Lidh-dhakari mithlu hazzil-unthayayn." },
        { q: "Why is the male share larger, per Ibn Kathir?", a: "Men must spend on their dependants", wrong: ["Men are loved more", "Men are older", "Men pray more"], why: "He carries the costs of the family." },
        { q: "One daughter alone (with no son) gets...", a: "Half", wrong: ["A third", "All of it", "A quarter"], why: "Wa in kanat wahidatan fa-lahan-nisf." },
        { q: "'Knowledge of the shares is half of knowledge,' said...", a: "Ibn Uyaynah", wrong: ["Abu Jahl", "Fir'awn", "A poet"], why: "Because it touches all people." }
      ]
    },
    {
      slug: "debts-first",
      title: "Debts come first",
      line: "Before any share, debts are paid, then the will.",
      facts: ["1. Debts", "2. The will", "3. The shares"],
      quote: q4(12),
      source: ik(12, "Payment of debts comes before the will, then the will, then the inheritance, and the scholars agree on this. A husband gets half of what his wife leaves if she has no child.", "payment of debts comes before fulfilling the will"),
      difficulty: 4,
      questions: [
        { q: "What is paid first from what someone leaves?", a: "Their debts", wrong: ["The heirs", "The will", "A feast"], why: "Ibn Kathir: debts come before the will." },
        { q: "A wife dies with no child. Her husband gets...", a: "Half", wrong: ["A quarter", "An eighth", "Nothing"], why: "Wa lakum nisfu ma taraka azwajukum." },
        { q: "A husband dies with no child. His wife gets...", a: "A quarter", wrong: ["Half", "An eighth", "A third"], why: "Wa lahunnar-rubu'." }
      ]
    },
    {
      slug: "limits",
      title: "Allah's limits",
      line: "These shares are Allah's limits; whoever obeys enters Paradise.",
      facts: ["Hudud Allah: Allah's limits", "No tricks with shares"],
      quote: q4(13),
      source: ik(13, "The shares are Allah's limits: what He gave each heir. Whoever obeys and gives each his share enters Gardens; whoever changes them with tricks disputes Allah's judgment.", "This includes what Allah has alloted for the heirs"),
      difficulty: 4,
      questions: [
        { q: "What does 4:13 call the shares?", a: "Allah's limits", wrong: ["Suggestions", "Old customs", "Taxes"], why: "Tilka hududullah." },
        { q: "What is the reward for obeying them?", a: "Gardens with rivers", wrong: ["Gold", "Fame", "A palace on earth"], why: "Yudkhilhu jannatin tajri min tahtihal-anhar." },
        { q: "Changing heirs' shares with tricks is allowed if it is clever.", tf: false, why: "Ibn Kathir: no adding or cutting by tricks." }
      ]
    },
    {
      slug: "repent-soon",
      title: "Repent soon",
      line: "Allah accepts repentance from those who repent soon after.",
      facts: ["Before the last breath", "Not at death's door"],
      quote: q4(17),
      source: ik(17, "Allah accepts the repentance of the servant as long as the soul does not reach the throat. Waiting until death comes and only then saying 'now I repent' is of no use.", "Allah accepts the repentance of the servant as long as the soul does not reach the throat"),
      difficulty: 3,
      questions: [
        { q: "Until when is repentance accepted?", a: "Until the soul reaches the throat", wrong: ["Only in Ramadan", "Only once a year", "Only when young"], why: "Ibn Kathir quotes the hadith from Ibn Umar." },
        { q: "Whose repentance does 4:18 reject?", a: "One who waits until death comes", wrong: ["One who sins by mistake", "One who repents quickly", "One who cries"], why: "Hatta idha hadara ahadahumul-mawt." },
        { q: "Al-Hasan: 'soon after' means before...", a: "The last breath leaves", wrong: ["Sunset", "Friday", "The next meal"], why: "Just before his last breath leaves his throat." }
      ]
    },
    {
      slug: "not-property",
      title: "Not property to inherit",
      line: "Women cannot be inherited like property, against their will.",
      facts: ["Sahih al-Bukhari 4579", "A custom Islam ended"],
      quote: q4(19),
      source: hadith("bukhari", "4579", "Ibn Abbas", "Sahih", "Before 4:19, when a man died his relatives claimed his widow: one might marry her, give her away, or stop her marrying. Then this ayah was revealed.", "his relatives used to have the right to inherit his wife"),
      difficulty: 3,
      questions: [
        { q: "What did relatives do with a widow before 4:19?", a: "Claimed her like inheritance", wrong: ["Gave her wealth", "Built her a house", "Left her free"], why: "Bukhari 4579, from Ibn Abbas." },
        { q: "What does 4:19 forbid?", a: "Inheriting women against their will", wrong: ["Visiting widows", "Helping widows", "Feeding widows"], why: "La yahillu lakum an tarithun-nisa'a karha." },
        { q: "After 4:19, a widow decides about her own marriage.", tf: true, why: "No relative owns her choice." }
      ]
    },
    {
      slug: "live-kindly",
      title: "Live with them kindly",
      line: "Live with your wives kindly; what you dislike may hold good.",
      facts: ["Mu'asharah bil-ma'ruf", "Best to his family"],
      quote: q4(19),
      source: ik(19, "Live with them honorably: kind words, kind treatment, and looking nice for them as you like them to. The Prophet ﷺ said the best of you is the best to his family, and he raced with Aishah.", "by saying kind words to them, treating them kindly"),
      difficulty: 3,
      questions: [
        { q: "How does 4:19 tell husbands to live with wives?", a: "Honorably and kindly", wrong: ["Strictly", "Coldly", "Apart"], why: "Wa 'ashiruhunna bil-ma'ruf." },
        { q: "Who is the best of you, as Ibn Kathir quotes?", a: "The best to his family", wrong: ["The richest", "The strongest", "The loudest"], why: "And I am the best to my family." },
        { q: "What if a husband dislikes something in her?", a: "Allah may put much good in it", wrong: ["Leave at once", "Shout at her", "Tell everyone"], why: "Fa-'asa an takrahu shay'an." }
      ]
    },
    {
      slug: "keep-mahr",
      title: "Do not take it back",
      line: "Mahr given, even a heap of gold, is never taken back.",
      facts: ["Qintar: a huge sum", "A firm covenant"],
      quote: q4(20),
      source: ik(20, "When a man divorces a wife to marry another, he must not take back any of the mahr he gave the first wife, even if it was a qintar. They took from you a firm covenant.", "he must not take any portion of the dowry he gave to the first wife"),
      difficulty: 4,
      questions: [
        { q: "May a man take back the mahr when he divorces, in 4:20?", tf: false, why: "Fa-la ta'khudhu minhu shay'a." },
        { q: "'Qintar' in 4:20 means...", a: "A huge amount of wealth", wrong: ["A coin", "A camel", "A ring"], why: "Even a great sum stays hers." },
        { q: "What did wives take from husbands, in 4:21?", a: "A firm covenant", wrong: ["A loan", "A secret", "A key"], why: "Mithaqan ghaliza." }
      ]
    },
    {
      slug: "forbidden",
      title: "Whom no one may marry",
      line: "4:23 names the close relatives no one may ever marry.",
      facts: ["Seven by blood", "Seven by marriage", "Father's wife too (4:22)"],
      quote: q4(23),
      source: ik(23, "Ibn Abbas said Allah forbade seven kinds of relatives by blood and seven by marriage, then recited 4:23: mothers, daughters, sisters, aunts, nieces, foster mothers and more.", "seven types of relatives by blood and seven by marriage"),
      difficulty: 4,
      questions: [
        { q: "How many kinds by blood does Ibn Abbas count in 4:23?", a: "Seven", wrong: ["Three", "Ten", "Twelve"], why: "Seven by blood and seven by marriage." },
        { q: "Which of these may a man never marry?", a: "His mother's sister", wrong: ["A woman from another tribe", "His neighbor's daughter", "A widow"], why: "Wa khalatukum: your maternal aunts." },
        { q: "Which ayah forbids marrying a father's wife?", a: "4:22", wrong: ["4:1", "4:11", "4:43"], why: "Wa la tankihu ma nakaha aba'ukum." }
      ]
    },
    {
      slug: "milk",
      title: "Milk family",
      line: "A foster mother who nursed you is like your own mother.",
      facts: ["Sahih al-Bukhari 5099", "Rada'ah: nursing"],
      quote: q4(23),
      source: hadith("bukhari", "5099", "Aishah", "Sahih", "The Prophet ﷺ said: foster nursing makes unlawful all that birth makes unlawful.", "foster suckling relations make all those things unlawful which are unlawful through corresponding birth"),
      difficulty: 4,
      questions: [
        { q: "What does nursing make unlawful, in Bukhari 5099?", a: "All that birth makes unlawful", wrong: ["Nothing", "Only the mother", "Only food"], why: "Milk ties are like blood ties for marriage." },
        { q: "Your foster sister who nursed with you is...", a: "Not allowed to marry you", wrong: ["Allowed to marry you", "A stranger", "A cousin"], why: "Wa akhawatukum minar-rada'ah." },
        { q: "Who heard this from the Prophet ﷺ in Bukhari 5099?", a: "Aishah", wrong: ["Hafsah", "Fatimah", "Asma"], why: "She asked about her foster uncle." }
      ]
    },
    {
      slug: "made-light",
      title: "Allah makes it light",
      line: "Allah wants to make things light for you; man was made weak.",
      facts: ["Yukhaffif: lighten", "Insan da'if: man is weak"],
      quote: q4(28),
      source: ik(28, "Allah explains what is lawful and turns to you in mercy. Man was created weak, and this is why it suits him that the commands are made easy for him.", "and this is why it is suitable in his case that the commands are made easy for him"),
      difficulty: 3,
      questions: [
        { q: "What does Allah want for us, in 4:28?", a: "To lighten our burden", wrong: ["To make it heavy", "To leave us", "To test with no help"], why: "Yuridullahu an yukhaffifa 'ankum." },
        { q: "How was man created, in 4:28?", a: "Weak", wrong: ["Perfect", "All-knowing", "Never tired"], why: "Wa khuliqal-insanu da'ifa." },
        { q: "What do those who follow their lusts want, in 4:27?", a: "That you turn far away", wrong: ["That you pray more", "That you are happy", "That you learn"], why: "An tamilu maylan 'azima." }
      ]
    },
    {
      slug: "trade",
      title: "Fair trade only",
      line: "Do not eat each other's wealth wrongly; trade by consent.",
      facts: ["Batil: wrongful ways", "Tijarah: trade"],
      quote: q4(29),
      source: ik(29, "Allah forbids taking each other's wealth by riba, gambling and tricks. There is no harm in trade between buyer and seller with mutual consent.", "there is no harm in commercial transactions that transpire between the buyer and the seller with mutual consent"),
      difficulty: 3,
      questions: [
        { q: "Which way of earning does 4:29 allow?", a: "Trade with mutual consent", wrong: ["Gambling", "Cheating", "Riba"], why: "Illa an takuna tijaratan 'an taradin minkum." },
        { q: "Which of these is a wrongful way, per Ibn Kathir?", a: "Gambling", wrong: ["Fair selling", "Giving gifts", "Honest buying"], why: "Riba and gambling are forbidden ways." },
        { q: "A trade where one side is forced is fine.", tf: false, why: "It must be by mutual consent." }
      ]
    },
    {
      slug: "yourselves",
      title: "Do not destroy yourselves",
      line: "Do not destroy yourselves; Allah is Most Merciful to you.",
      facts: ["Amr ibn al-As", "A freezing night", "Tayammum"],
      quote: q4(29),
      source: ik(29, "Amr ibn al-As had a wet dream on a freezing night and feared that bathing would harm him. He remembered 4:29, made tayammum and prayed, and the Prophet ﷺ smiled.", "So I performed Tayammum and prayed"),
      difficulty: 4,
      questions: [
        { q: "Why did Amr ibn al-As not bathe that night?", a: "The cold might have harmed him", wrong: ["He was lazy", "No time", "He forgot"], why: "He feared he would perish." },
        { q: "What did he do instead?", a: "Tayammum, then prayed", wrong: ["Skipped prayer", "Slept", "Prayed without wudu"], why: "He remembered 4:29." },
        { q: "How did the Prophet ﷺ react?", a: "He smiled", wrong: ["He was angry", "He left", "He scolded him"], why: "He smiled and said nothing." }
      ]
    },
    {
      slug: "great-sins",
      title: "Avoid the great sins",
      line: "Avoid the great sins, and Allah erases the small ones.",
      facts: ["Kaba'ir: major sins", "Mudkhal karim: Paradise"],
      quote: q4(31),
      source: ik(31, "If you avoid the major evil deeds you were forbidden, Allah forgives your smaller sins and admits you to Paradise.", "if you avoid the major evil deeds that you were prohibited"),
      difficulty: 3,
      questions: [
        { q: "What erases small sins, in 4:31?", a: "Avoiding the great sins", wrong: ["Doing more great sins", "Sleeping", "Being rich"], why: "In tajtanibu kaba'ira ma tunhawna 'anh." },
        { q: "What is the 'noble entrance' in 4:31?", a: "Paradise", wrong: ["A palace gate", "A mosque door", "A city"], why: "Mudkhalan karima." },
        { q: "Is 4:31 one of the five ayahs Ibn Mas'ud loved?", tf: true, why: "He named it in Ibn Kathir's opening." }
      ]
    },
    {
      slug: "no-envy",
      title: "Do not envy",
      line: "Don't wish for what Allah gave others; ask Him of His bounty.",
      facts: ["Each earns their reward", "Ask Allah"],
      quote: q4(32),
      source: ik(32, "Do not wish for what others were given over you: wishing does not change the decree. Ask Allah, for He says: ask Me of My favor and I will grant it to you.", "ask Me of My favor and I will grant it to you"),
      difficulty: 3,
      questions: [
        { q: "What does 4:32 tell us not to do?", a: "Wish for what others were given", wrong: ["Work hard", "Make dua", "Give charity"], why: "Wa la tatamannaw." },
        { q: "What should we do instead?", a: "Ask Allah of His bounty", wrong: ["Take it from them", "Complain", "Give up"], why: "Was'alullaha min fadlih." },
        { q: "Do women earn reward for what they do, in 4:32?", tf: true, why: "For men and for women is what they earned." }
      ]
    },
    {
      slug: "qawwam",
      title: "Protectors and providers",
      line: "Men are protectors and providers of women, as they spend.",
      facts: ["Qawwamun: those who look after", "Linked to spending"],
      quote: q4(34),
      source: ik(34, "The man is responsible for the woman as her maintainer and caretaker, because Allah gave him that task and because he spends from his wealth: the mahr and all her costs.", "because they spend from their means"),
      difficulty: 4,
      questions: [
        { q: "What does 'qawwam' mean in 4:34?", a: "One who looks after and provides", wrong: ["An owner", "A guard who locks doors", "A judge of her faith"], why: "Her maintainer and caretaker." },
        { q: "What does 4:34 link his role to?", a: "His spending on her", wrong: ["His height", "His tribe", "His age"], why: "Wa bima anfaqu min amwalihim." },
        { q: "Being in charge lets him treat her however he likes.", tf: false, why: "It is a duty of care he answers to Allah for." }
      ]
    },
    {
      slug: "peacemakers",
      title: "Two peacemakers",
      line: "If a couple may split, send a peacemaker from each family.",
      facts: ["Hakam: an arbiter", "One from each side"],
      quote: q4(35),
      source: ik(35, "When a couple drifts apart, a trusted person from each family looks into it. Allah prefers that they stay together: if both want peace, Allah brings them together.", "Allah gives preference to staying together"),
      difficulty: 4,
      questions: [
        { q: "Whom does 4:35 send when a couple may split?", a: "One arbiter from each family", wrong: ["Only the police", "Only his friends", "Nobody"], why: "Hakaman min ahlihi wa hakaman min ahliha." },
        { q: "What does Allah prefer, per Ibn Kathir?", a: "That they stay together", wrong: ["That they part quickly", "That they argue", "That families fight"], why: "If they want peace, Allah unites them." },
        { q: "If the arbiters want peace, what does Allah do?", a: "Brings the couple together", wrong: ["Nothing", "Ends the marriage", "Punishes them"], why: "Yuwaffiqillahu baynahuma." }
      ]
    },
    {
      slug: "allahs-right",
      title: "Allah's right first",
      line: "Worship Allah alone, then be good to parents and family.",
      facts: ["Sahih al-Bukhari 2856", "Mu'adh on a donkey"],
      quote: q4(36),
      source: hadith("bukhari", "2856", "Mu'adh ibn Jabal", "Sahih", "Riding behind the Prophet ﷺ, Mu'adh was asked: do you know Allah's right on His servants? That they worship Him alone and join none with Him.", "that they should worship Him (Alone) and should not worship any besides Him"),
      difficulty: 3,
      questions: [
        { q: "What is Allah's right on His servants, in Bukhari 2856?", a: "To worship Him alone", wrong: ["To be rich", "To travel", "To fast all year"], why: "And join none with Him." },
        { q: "Who comes right after Allah in 4:36?", a: "Parents", wrong: ["Friends", "Kings", "Traders"], why: "Wa bil-walidayni ihsana." },
        { q: "Where was Mu'adh when he was asked?", a: "Riding behind the Prophet ﷺ", wrong: ["In the market", "At sea", "In Makkah alone"], why: "On a donkey called Ufair." }
      ]
    },
    {
      slug: "neighbors",
      title: "The neighbor next door",
      line: "Be good to near and far neighbors, companions and travelers.",
      facts: ["Sahih al-Bukhari 6014", "Jibril kept advising"],
      quote: q4(36),
      source: hadith("bukhari", "6014", "Aishah", "Sahih", "The Prophet ﷺ said Jibril kept advising him to be kind to neighbors until he thought he would make them heirs.", "Gabriel continued to recommend me about treating the neighbors Kindly"),
      difficulty: 4,
      questions: [
        { q: "Who kept advising the Prophet ﷺ about neighbors?", a: "Jibril", wrong: ["Abu Bakr", "Mika'il", "His uncle"], why: "Bukhari 6014." },
        { q: "What did the Prophet ﷺ think Jibril would do?", a: "Make neighbors heirs", wrong: ["Forbid visits", "Make them leaders", "Tell him to move"], why: "That is how strong the neighbor's right is." },
        { q: "Which of these does 4:36 tell us to be good to?", a: "The companion by your side", wrong: ["Only the rich", "Only family", "No one else"], why: "Was-sahibi bil-janb." }
      ]
    },
    {
      slug: "stingy",
      title: "The stingy and the show-off",
      line: "Allah dislikes the stingy and those who give to be seen.",
      facts: ["Bukhl: stinginess", "Ri'a: showing off"],
      quote: q4(37),
      source: ik(37, "Allah blames those who hold back what He ordered them to spend, and spread stinginess. The Prophet ﷺ asked: what disease is worse than stinginess? He also blames those who give only to be seen.", "What disease is more serious than being stingy"),
      difficulty: 4,
      questions: [
        { q: "What do the stingy do, in 4:37?", a: "Hold back and tell others to", wrong: ["Give in secret", "Share everything", "Feed orphans"], why: "Yabkhaluna wa ya'murunan-nasa bil-bukhl." },
        { q: "What did the Prophet ﷺ call stinginess?", a: "A serious disease", wrong: ["A smart plan", "A small habit", "A virtue"], why: "What disease is worse than stinginess?" },
        { q: "Giving only to be seen is praised in 4:38.", tf: false, why: "They spend to be seen by people." }
      ]
    },
    {
      slug: "speck",
      title: "Not a speck of injustice",
      line: "Allah wrongs no one a speck; He doubles every good deed.",
      facts: ["Mithqal dharrah: a speck's weight", "Good deeds multiplied"],
      quote: q4(40),
      source: ik(40, "Allah does not treat any servant unjustly on the Day of Resurrection, even by the weight of a mustard seed or a speck of dust. A good deed He multiplies.", "Allah states that He does not treat any of His servants with injustice"),
      difficulty: 4,
      questions: [
        { q: "How much does Allah wrong anyone, in 4:40?", a: "Not even a speck", wrong: ["A little", "Only sinners", "Half a deed"], why: "Innallaha la yazlimu mithqala dharrah." },
        { q: "What does Allah do with a good deed?", a: "Multiplies it", wrong: ["Ignores it", "Halves it", "Forgets it"], why: "Wa in taku hasanatan yuda'ifha." },
        { q: "Is 4:40 one of Ibn Mas'ud's five loved ayahs?", tf: true, why: "He named it in Ibn Kathir's opening." }
      ]
    },
    {
      slug: "witness",
      title: "Enough, he said",
      line: "The Prophet ﷺ wept when Ibn Mas'ud recited 4:41 to him.",
      facts: ["Sahih al-Bukhari 4582", "Every nation has a witness"],
      quote: q4(41),
      source: hadith("bukhari", "4582", "Abdullah ibn Mas'ud", "Sahih", "The Prophet ﷺ asked Ibn Mas'ud to recite to him. He recited An-Nisa until 4:41, and the Prophet ﷺ said: enough. His eyes were overflowing with tears.", "his eyes were overflowing with tears"),
      difficulty: 4,
      questions: [
        { q: "Who recited An-Nisa to the Prophet ﷺ?", a: "Abdullah ibn Mas'ud", wrong: ["Ubayy ibn Ka'b", "Bilal", "Zayd ibn Thabit"], why: "Sahih al-Bukhari 4582." },
        { q: "At which ayah did he say 'Enough'?", a: "4:41", wrong: ["4:1", "4:176", "4:11"], why: "The witness over every nation." },
        { q: "Why did the Prophet ﷺ like to hear the Quran from others?", a: "He said he loved to hear it", wrong: ["He forgot it", "He was tired", "He could not read"], why: "I like to hear it from others." }
      ]
    },
    {
      slug: "buried",
      title: "Wishing for the earth",
      line: "On that Day, deniers will wish the earth would cover them.",
      facts: ["Nothing hidden from Allah", "Hands and feet speak"],
      quote: q4(42),
      source: ik(42, "They will wish the earth would open and swallow them, from the horror and disgrace of that Day, yet they cannot hide a single fact from Allah.", "they will wish that the earth would open up and swallow them"),
      difficulty: 4,
      questions: [
        { q: "What will deniers wish, in 4:42?", a: "That the earth covered them", wrong: ["To be kings", "To be rich", "To sleep"], why: "Law tusawwa bihimul-ard." },
        { q: "Can they hide anything from Allah that Day?", tf: false, why: "Wa la yaktumunallaha hadith." },
        { q: "Why will they wish this, per Ibn Kathir?", a: "The horror and disgrace of that Day", wrong: ["The heat of summer", "Boredom", "Hunger"], why: "The gathering place is terrifying for them." }
      ]
    },
    {
      slug: "clear-mind",
      title: "Pray with a clear mind",
      line: "Do not come to prayer unless you know what you are saying.",
      facts: ["Before the full ban", "Umar: we abstain"],
      quote: q4(43),
      source: ik(43, "This ayah came before alcohol was fully forbidden. Later 5:90-91 came down and Umar said: we abstain, we abstain. Prayer needs a mind that knows what it says.", "This Ayah was revealed before alcohol consumption was completely prohibited"),
      difficulty: 4,
      questions: [
        { q: "When did 4:43 come down?", a: "Before alcohol was fully banned", wrong: ["After the full ban", "In Makkah", "At the Farewell Hajj"], why: "The ban came step by step." },
        { q: "Which ayahs fully forbade it?", a: "5:90-91", wrong: ["2:255", "4:1", "1:1-7"], why: "Then Umar said: we abstain." },
        { q: "What must you know when you pray, in 4:43?", a: "What you are saying", wrong: ["Who is watching", "The time", "The weather"], why: "Hatta ta'lamu ma taqulun." }
      ]
    },
    {
      slug: "tayammum",
      title: "Clean earth",
      line: "No water? Wipe your face and hands with clean earth.",
      facts: ["Sahih al-Bukhari 4583", "A lost necklace"],
      quote: q4(43),
      source: hadith("bukhari", "4583", "Aishah", "Sahih", "A necklace was lost and men went to look for it. Prayer time came and there was no water, so Allah revealed the ayah of tayammum.", "Then Allah revealed (the Verse of Tayammum)"),
      difficulty: 5,
      questions: [
        { q: "What was being searched for when tayammum came down?", a: "A lost necklace", wrong: ["A lost camel", "A well", "A sword"], why: "Bukhari 4583, from Aishah." },
        { q: "What do you wipe in tayammum, in 4:43?", a: "The face and hands", wrong: ["The feet only", "The whole body", "The head only"], why: "Famsahu bi-wujuhikum wa aydikum." },
        { q: "Tayammum is with clean earth when there is no water.", tf: true, why: "Fa-tayammamu sa'idan tayyiba." },
        { q: "Whose necklace was it, in Bukhari 4583?", a: "Asma's", wrong: ["Fatimah's", "Hafsah's", "Khadijah's"], why: "The necklace of Asma was lost." }
      ]
    }
  ]
};

/** Ayahs 44 to 100: shirk, trusts, obeying Allah and the Messenger ﷺ, the oppressed, the Quran's harmony, salam, Hijrah. */
const NISA_TWO: DeepUnit = {
  key: "nisa2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-nisa",
  name: "An-Nisa, ayahs 44 to 100",
  kind: "skill",
  lessonType: "surah",
  surahName: "An-Nisa",
  lessons: [
    {
      slug: "shirk",
      title: "The one sin not forgiven",
      line: "Allah forgives any sin He wills, but not dying on shirk.",
      facts: ["Shirk: worshipping others with Allah", "Repent before death"],
      quote: q4(48),
      source: ik(48, "Allah does not forgive a servant who meets Him while associating partners with Him, but He forgives any other sin for whom He wills. Shirk is forgiven only by repenting from it before death.", "He does not forgive a servant if he meets Him while he is associating partners with Him"),
      difficulty: 3,
      questions: [
        { q: "Which sin does 4:48 say Allah does not forgive?", a: "Shirk, if one dies on it", wrong: ["Every sin", "Small slips", "Forgetting dua"], why: "Innallaha la yaghfiru an yushraka bih." },
        { q: "What about all other sins?", a: "He forgives whom He wills", wrong: ["Never forgiven", "Forgiven for no one", "Only by paying"], why: "Wa yaghfiru ma duna dhalika liman yasha'." },
        { q: "Can someone who did shirk repent before death and be forgiven?", tf: true, why: "Ibn Kathir: shirk is forgiven after repenting from it." }
      ]
    },
    {
      slug: "no-self-praise",
      title: "Do not praise yourself",
      line: "Do not claim you are pure; Allah purifies whom He wills.",
      facts: ["Tazkiyah: purifying", "Fatil: a date-stone thread"],
      quote: q4(49),
      source: ik(49, "Some claimed purity for themselves, saying they alone were loved by Allah. Allah purifies whom He wills, because He alone knows the reality of all things.", "the decision in this matter is with Allah Alone"),
      difficulty: 3,
      questions: [
        { q: "Who decides who is truly pure, in 4:49?", a: "Allah alone", wrong: ["The person himself", "His tribe", "His friends"], why: "Balillahu yuzakki man yasha'." },
        { q: "What does 'fatil' in 4:49 stand for?", a: "The smallest amount", wrong: ["A big reward", "A palace", "A long rope"], why: "Not even a thread on a date-stone of injustice." },
        { q: "Boasting 'I am surely better than all' fits 4:49.", tf: false, why: "Ayah 4:49 blames claiming purity for oneself." }
      ]
    },
    {
      slug: "envy-bounty",
      title: "Envy of Allah's gifts",
      line: "Envying people for what Allah gave them is blamed in 4:54.",
      facts: ["Hasad: envy", "Naqir: a date-stone speck"],
      quote: q4(54),
      source: ik(54, "If they owned the kingdom they would not give anyone even a naqir, the speck on the back of a date-stone. Allah asks: do they envy people for what He gave them of His bounty?", "even if it was the speck on the back of a date-stone"),
      difficulty: 3,
      questions: [
        { q: "What does 4:54 blame?", a: "Envying people for Allah's gifts", wrong: ["Thanking Allah", "Helping people", "Sharing food"], why: "Am yahsudunan-nasa 'ala ma atahumullahu min fadlih." },
        { q: "'Naqir' in 4:53 means...", a: "The speck on a date-stone", wrong: ["A gold coin", "A large field", "A camel"], why: "Ibn Abbas: the tiny speck on a date-stone." },
        { q: "To whom did Allah give the Book and wisdom, in 4:54?", a: "The family of Ibrahim", wrong: ["The family of Fir'awn", "The people of Ad", "The Romans"], why: "Fa-qad atayna ala Ibrahimal-kitaba wal-hikmah." }
      ]
    },
    {
      slug: "gardens",
      title: "Shade that lasts",
      line: "Believers who do good enter Gardens with deep, lasting shade.",
      facts: ["Khalidin: forever", "Zillan zalila: thick shade"],
      quote: q4(57),
      source: ik(57, "They live in Gardens with rivers flowing wherever they wish, forever. They will never be moved, nor would they want to move, and their spouses are purified of every fault.", "They will reside in it for eternity, and they will not be transferred or removed from it"),
      difficulty: 3,
      questions: [
        { q: "How long do believers stay in the Gardens, in 4:57?", a: "Forever", wrong: ["A thousand years", "A day", "Until they are bored"], why: "Khalidina fiha abada." },
        { q: "Will they want to leave, per Ibn Kathir?", tf: false, why: "They will not be moved, nor want to move." },
        { q: "What shade is promised in 4:57?", a: "Thick, lasting shade", wrong: ["No shade", "A thin tent", "Clouds only"], why: "Wa nudkhiluhum zillan zalila." }
      ]
    },
    {
      slug: "trusts",
      title: "Give back the trusts",
      line: "Allah commands you to return trusts and to judge with justice.",
      facts: ["Amanah: a trust", "Adl: justice"],
      quote: q4(58),
      source: ik(58, "Allah commands that every kind of trust be returned: rights owed to Allah like prayer and zakah, and what people entrust to each other. Those who judge must judge with justice.", "Allah commands that all types of trusts be fulfillled"),
      difficulty: 3,
      questions: [
        { q: "What does 4:58 command first?", a: "Return trusts to their owners", wrong: ["Build forts", "Collect taxes", "Travel far"], why: "An tu'addul-amanati ila ahliha." },
        { q: "Is prayer a trust too, per Ibn Kathir?", tf: true, why: "Allah's rights on His servants are trusts." },
        { q: "How must people be judged, in 4:58?", a: "With justice", wrong: ["By wealth", "By tribe", "By looks"], why: "An tahkumu bil-'adl." }
      ]
    },
    {
      slug: "obey",
      title: "Obey in what is good",
      line: "Obey Allah, the Messenger ﷺ, and leaders, only in good.",
      facts: ["Sahih al-Bukhari 7145", "Ulul-amr: those in charge"],
      quote: q4(59),
      source: hadith("bukhari", "7145", "Ali ibn Abi Talib", "Sahih", "A commander told his men in anger to enter a fire. They refused, and the Prophet ﷺ said: had they entered it they would never have come out; obedience is only in what is good.", "obedience is required only in what is good"),
      difficulty: 4,
      questions: [
        { q: "When must a leader be obeyed, per Bukhari 7145?", a: "Only in what is good", wrong: ["In everything", "Never", "Only when he is rich"], why: "No obedience in disobeying Allah." },
        { q: "What did the angry commander order?", a: "To enter a fire", wrong: ["To pray", "To rest", "To eat"], why: "Bukhari 7145, from Ali." },
        { q: "Whom does 4:59 name first to obey?", a: "Allah", wrong: ["The leaders", "The elders", "The army"], why: "Ati'ullaha wa ati'ur-rasul." }
      ]
    },
    {
      slug: "refer-back",
      title: "Take it back to the source",
      line: "When you disagree, return it to the Quran and the Sunnah.",
      facts: ["Raddu ilallah: back to Allah", "Back to the Messenger ﷺ"],
      quote: q4(59),
      source: ik(59, "Mujahid and others said: if you differ in anything, refer it to the Book of Allah and the Sunnah of His Messenger ﷺ, in big matters and small.", "(Refer) to the Book of Allah and the Sunnah of His Messenger"),
      difficulty: 4,
      questions: [
        { q: "Where do disputes go, in 4:59?", a: "The Quran and the Sunnah", wrong: ["Old customs", "The richest man", "A coin toss"], why: "Faruddu ilallahi war-rasul." },
        { q: "Does this apply to small matters too, per Ibn Kathir?", tf: true, why: "Major or minor areas of the religion." },
        { q: "What does 4:59 say this way is?", a: "Better and best in the end", wrong: ["Hard and useless", "Optional", "Only for scholars"], why: "Dhalika khayrun wa ahsanu ta'wila." }
      ]
    },
    {
      slug: "no-faith-until",
      title: "Accept his judgment",
      line: "No one truly believes until he accepts the Prophet's ﷺ judgment.",
      facts: ["Sahih al-Bukhari 4585", "Az-Zubayr and the stream"],
      quote: q4(65),
      source: hadith("bukhari", "4585", "Urwah ibn az-Zubayr", "Sahih", "Az-Zubayr and a man of the Ansar argued over a stream. The Prophet ﷺ judged, the man complained, and Az-Zubayr said he thought 4:65 came down about it.", "Irrigate (your lands) and then let the water flow to your neighbor"),
      difficulty: 4,
      questions: [
        { q: "What did Az-Zubayr and the Ansari argue about?", a: "Water from a stream", wrong: ["A camel", "A house", "A sword"], why: "Bukhari 4585." },
        { q: "What must believers feel about his judgment, in 4:65?", a: "No resistance, full acceptance", wrong: ["Doubt", "Anger", "Delay"], why: "Thumma la yajidu fi anfusihim harajan." },
        { q: "By whom does Allah swear in 4:65?", a: "By your Lord", wrong: ["By the sun", "By time", "By the fig"], why: "Fa-la wa rabbika la yu'minun." }
      ]
    },
    {
      slug: "best-company",
      title: "The best company",
      line: "Whoever obeys Allah and the Messenger ﷺ is with the prophets.",
      facts: ["Sahih al-Bukhari 4586", "Siddiqin, martyrs, righteous"],
      quote: q4(69),
      source: hadith("bukhari", "4586", "Aishah", "Sahih", "In his last illness the Prophet ﷺ, his voice hoarse, recited 4:69: with those Allah has blessed, the prophets, the siddiqin, the martyrs and the righteous.", "In the company of those whom is the Grace of Allah"),
      difficulty: 4,
      questions: [
        { q: "Which four groups does 4:69 name?", a: "Prophets, siddiqin, martyrs, righteous", wrong: ["Kings, poets, traders, soldiers", "Angels, jinn, men, birds", "Judges, rich, strong, young"], why: "How excellent these companions are!" },
        { q: "When did the Prophet ﷺ recite 4:69 aloud?", a: "In his last illness", wrong: ["At Badr", "On the Night Journey", "At his wedding"], why: "Aishah heard him, Bukhari 4586." },
        { q: "Every prophet is given a choice before death, Aishah heard.", tf: true, why: "Between this world and the Hereafter." }
      ]
    },
    {
      slug: "oppressed",
      title: "For the oppressed",
      line: "Stand up for the weak who cry: our Lord, rescue us.",
      facts: ["Sahih al-Bukhari 4587", "The weak in Makkah"],
      quote: q4(75),
      source: hadith("bukhari", "4587", "Ibn Abbas", "Sahih", "Ibn Abbas said: my mother and I were among the weak and oppressed in Makkah.", "My mother and I were among the weak and oppressed"),
      difficulty: 4,
      questions: [
        { q: "Who said he and his mother were among the oppressed?", a: "Ibn Abbas", wrong: ["Abu Bakr", "Khalid", "Umar"], why: "Sahih al-Bukhari 4587." },
        { q: "Where were the oppressed of 4:75?", a: "Makkah", wrong: ["Madinah", "Sham", "Yemen"], why: "Ibn Kathir: the weak Muslims kept in Makkah." },
        { q: "What did they pray, in 4:75?", a: "Our Lord, rescue us", wrong: ["Make us rich", "Make us kings", "Give us rain"], why: "Rabbana akhrijna min hadhihil-qaryah." }
      ]
    },
    {
      slug: "weak-plot",
      title: "Shaytan's weak plot",
      line: "The plot of Shaytan is always weak.",
      facts: ["Kayd: plot", "Da'if: weak"],
      quote: q4(76),
      source: ik(76, "The believers strive in obedience to Allah, the disbelievers in obedience to Shaytan; and ever feeble indeed is the plot of Shaytan.", "ever feeble indeed is the plot of Shaytan"),
      difficulty: 3,
      questions: [
        { q: "How strong is Shaytan's plot, in 4:76?", a: "Always weak", wrong: ["Unbeatable", "Very strong", "Equal to Allah"], why: "Inna kaydash-shaytani kana da'ifa." },
        { q: "For whom do the believers strive, in 4:76?", a: "In the cause of Allah", wrong: ["For fame", "For gold", "For a tribe"], why: "Fi sabilillah." },
        { q: "Whom do the disbelievers follow, per Ibn Kathir?", a: "Shaytan", wrong: ["The prophets", "Angels", "The wise"], why: "They fight in obedience to Shaytan." }
      ]
    },
    {
      slug: "high-towers",
      title: "No tower stops death",
      line: "Death will find you, even in high strong towers.",
      facts: ["Buruj mushayyadah: high forts", "This life: a short joy"],
      quote: q4(78),
      source: ik(78, "Wherever you are, death will reach you, even in fortresses built strong and high. No caution or fortification can ever avert death.", "No caution or fortification can ever avert death"),
      difficulty: 3,
      questions: [
        { q: "Can a strong tower keep death away, in 4:78?", tf: false, why: "Wa law kuntum fi burujin mushayyadah." },
        { q: "What does 4:77 call the joy of this world?", a: "Short", wrong: ["Endless", "The best thing", "Free of pain"], why: "Qul mata'ud-dunya qalil." },
        { q: "What is better, in 4:77?", a: "The Hereafter, for the mindful", wrong: ["Gold", "Fame", "A long life"], why: "Wal-akhiratu khayrun limanittaqa." }
      ]
    },
    {
      slug: "good-from-allah",
      title: "Good is from Allah",
      line: "Good that reaches you is from Allah; harm is from yourself.",
      facts: ["All is by Allah's decree", "Our sins bring harm"],
      quote: q4(79),
      source: ik(79, "When good came, hypocrites said it was from Allah; when hardship came, they blamed the Prophet ﷺ. Allah answers: all things are from Allah. Good is His favor; harm comes by your own deeds.", "This is from Allah"),
      difficulty: 4,
      questions: [
        { q: "Whom did the hypocrites blame for hardship, in 4:78?", a: "The Prophet ﷺ", wrong: ["Themselves", "The weather", "Shaytan"], why: "They said: this is from you." },
        { q: "Where does good come from, in 4:79?", a: "From Allah", wrong: ["From luck", "From stars", "From ourselves alone"], why: "Ma asabaka min hasanatin faminallah." },
        { q: "Where does harm come from, in 4:79?", a: "From our own deeds", wrong: ["From the Prophet ﷺ", "From a bad omen", "From nowhere"], why: "Wa ma asabaka min sayyi'atin fa-min nafsik." }
      ]
    },
    {
      slug: "obey-messenger",
      title: "Obeying him is obeying Allah",
      line: "Whoever obeys the Messenger ﷺ has obeyed Allah.",
      facts: ["Sahih al-Bukhari 7137", "He speaks by revelation"],
      quote: q4(80),
      source: hadith("bukhari", "7137", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said: whoever obeys me obeys Allah, and whoever disobeys me disobeys Allah.", "Whoever obeys me, obeys Allah, and whoever disobeys me, disobeys Allah"),
      difficulty: 3,
      questions: [
        { q: "Obeying the Messenger ﷺ is obeying whom, in 4:80?", a: "Allah", wrong: ["Only him", "The leaders", "No one"], why: "Man yuti'ir-rasula faqad ata'allah." },
        { q: "Whoever disobeys him, per Bukhari 7137, disobeys...", a: "Allah", wrong: ["Only his tribe", "No one", "The angels"], why: "Whoever disobeys me disobeys Allah." },
        { q: "Who narrated Bukhari 7137?", a: "Abu Hurayrah", wrong: ["Anas", "Aishah", "Ibn Umar"], why: "Sahih al-Bukhari 7137." }
      ]
    },
    {
      slug: "ponder",
      title: "No contradiction",
      line: "Ponder the Quran: from other than Allah, it would clash.",
      facts: ["Tadabbur: deep thought", "Ikhtilaf: contradiction"],
      quote: q4(82),
      source: ik(82, "Allah commands us to reflect on the Quran. There are no contradictions or conflicting statements in it, because it is revelation from the All-Wise.", "there are no inconsistencies, contradictions, conflicting statements or discrepancies"),
      difficulty: 4,
      questions: [
        { q: "What does 4:82 ask us to do with the Quran?", a: "Ponder it deeply", wrong: ["Only hang it", "Read it fast", "Sell it"], why: "Afala yatadabbarunal-Qur'an." },
        { q: "What would a man-made book have, in 4:82?", a: "Many contradictions", wrong: ["No words", "Only stories", "Perfect harmony"], why: "Lawajadu fihi-khtilafan kathira." },
        { q: "Ibn Kathir: the Quran has no contradictions at all.", tf: true, why: "It is from the Most-Wise." }
      ]
    },
    {
      slug: "rumors",
      title: "Do not spread rumors",
      line: "Do not spread news before those who know have checked it.",
      facts: ["Verify first", "Refer it to those who know"],
      quote: q4(83),
      source: ik(83, "This rebukes those who pass on what people say without checking it. The Sahih says: whoever narrates a hadith knowing it is false is one of the liars.", "without investigating the reliability and truth of what he is disclosing"),
      difficulty: 4,
      questions: [
        { q: "What does 4:83 blame people for?", a: "Spreading news without checking", wrong: ["Keeping quiet", "Asking scholars", "Making dua"], why: "Adha'u bih: they broadcast it." },
        { q: "Whom should news go to first, in 4:83?", a: "The Messenger ﷺ and those in charge", wrong: ["The whole market", "Enemies", "Children"], why: "Wa law raddahu ilar-rasul." },
        { q: "Passing on a false hadith knowingly makes you...", a: "One of the liars", wrong: ["A scholar", "A hero", "Excused"], why: "Ibn Kathir quotes the Sahih." }
      ]
    },
    {
      slug: "intercede",
      title: "A good word for others",
      line: "Speak up for a good cause and you share its reward.",
      facts: ["Shafa'ah: speaking for someone", "Sahih al-Bukhari 1432"],
      quote: q4(85),
      source: hadith("bukhari", "1432", "Abu Musa al-Ash'ari", "Sahih", "When someone in need came, the Prophet ﷺ would tell his companions: recommend him and you will be rewarded.", "Help and recommend him and you will receive the reward for it"),
      difficulty: 4,
      questions: [
        { q: "What does a person who speaks up for good get, in 4:85?", a: "A share of its reward", wrong: ["Nothing", "Blame", "Money only"], why: "Yakun lahu nasibun minha." },
        { q: "What about speaking up for evil?", a: "A share of its burden", wrong: ["A reward", "Nothing", "A gift"], why: "Yakun lahu kiflun minha." },
        { q: "What did the Prophet ﷺ tell his companions when a needy man came?", a: "Recommend him, and be rewarded", wrong: ["Send him away", "Ignore him", "Make him wait"], why: "Bukhari 1432." }
      ]
    },
    {
      slug: "salam",
      title: "Return the salam better",
      line: "When greeted, reply with a better greeting, or at least equal.",
      facts: ["As-salamu alaykum", "Add wa rahmatullah"],
      quote: q4(86),
      source: ik(86, "If a Muslim greets you with salam, return it with a better salam, or at least an equal one.", "if the Muslim greets you with the Salam, then return the greeting with a better Salam"),
      difficulty: 3,
      questions: [
        { q: "How should you answer a greeting, in 4:86?", a: "Better, or at least equal", wrong: ["Ignore it", "Shorter", "Only nod"], why: "Fa-hayyu bi-ahsana minha aw rudduha." },
        { q: "Someone says 'As-salamu alaykum'. Which reply is better?", a: "Wa alaykumus-salam wa rahmatullah", wrong: ["Hi", "Nothing", "A wave only"], why: "Adding more is the better reply." },
        { q: "Is replying to salam left to your mood?", tf: false, why: "4:86 commands returning it." }
      ]
    },
    {
      slug: "verify",
      title: "Check before you judge",
      line: "Never tell one who greets you with salam: you're no believer.",
      facts: ["Sahih al-Bukhari 4591", "A man with his sheep"],
      quote: q4(94),
      source: hadith("bukhari", "4591", "Ibn Abbas", "Sahih", "A man among his sheep greeted some Muslims with salam, but they did not accept it and took his sheep. Allah revealed 4:94.", "There was a man amidst his sheep"),
      difficulty: 5,
      questions: [
        { q: "What did the man say to the Muslims, in Bukhari 4591?", a: "Peace be on you", wrong: ["Go away", "Nothing", "I am lost"], why: "He greeted them with salam." },
        { q: "What does 4:94 command?", a: "Verify, and do not deny one's salam", wrong: ["Act quickly", "Trust rumors", "Take their sheep"], why: "Fa-tabayyanu." },
        { q: "What did Allah remind them in 4:94?", a: "You were like him before", wrong: ["You were always better", "He was a liar", "Sheep are better"], why: "Kadhalika kuntum min qabl." }
      ]
    },
    {
      slug: "excused",
      title: "Those with an excuse",
      line: "Allah excused the blind and disabled from going out to fight.",
      facts: ["Sahih al-Bukhari 4592", "Ibn Umm Maktum"],
      quote: q4(95),
      source: hadith("bukhari", "4592", "Zayd ibn Thabit", "Sahih", "As the Prophet ﷺ dictated 4:95, the blind Ibn Umm Maktum said he would strive if he could. Allah then revealed: except those who are disabled.", "Except those who are disabled"),
      difficulty: 5,
      questions: [
        { q: "Who said he would go if he could, in Bukhari 4592?", a: "Ibn Umm Maktum", wrong: ["Bilal", "Ammar", "Salman"], why: "He was a blind man." },
        { q: "Which words came down after he spoke?", a: "Except those who are disabled", wrong: ["Except the rich", "Except the old", "Except traders"], why: "Ghayru ulid-darar." },
        { q: "Who was writing the ayah for the Prophet ﷺ?", a: "Zayd ibn Thabit", wrong: ["Ali", "Mu'awiyah", "Uthman"], why: "The Prophet ﷺ dictated it to him." }
      ]
    },
    {
      slug: "wide-earth",
      title: "Allah's earth is wide",
      line: "Leave home for Allah and you find room; the reward is sure.",
      facts: ["Hijrah: leaving for Allah", "Muragham: places of refuge"],
      quote: q4(100),
      source: ik(100, "The angels ask those who stayed under oppression: was not Allah's earth spacious enough to emigrate? The truly weak, who could not leave, are excused.", "Was not the earth of Allah spacious enough for you"),
      difficulty: 5,
      questions: [
        { q: "What do the angels ask, in 4:97?", a: "Was Allah's earth not wide enough?", wrong: ["Where is your gold?", "Who is your king?", "Why are you late?"], why: "Alam takun ardullahi wasi'ah." },
        { q: "Who is excused in 4:98?", a: "The truly weak who cannot leave", wrong: ["The rich", "The lazy", "Everyone"], why: "Men, women and children with no way out." },
        { q: "What happens to one who dies on his way, in 4:100?", a: "His reward is sure with Allah", wrong: ["It is lost", "Halved", "Only if he arrives"], why: "Faqad waqa'a ajruhu 'alallah." }
      ]
    }
  ]
};

export const NISA_UNITS: readonly DeepUnit[] = [NISA_ONE, NISA_TWO];
