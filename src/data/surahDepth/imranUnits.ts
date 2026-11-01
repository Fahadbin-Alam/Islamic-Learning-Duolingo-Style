import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Ali 'Imran ayah by ayah, the way Al-Baqarah is taught (baqarahUnits.ts): after the unit's own circles and its
// passages, every ayah or small group of ayahs gets a lesson, explained as Tafsir Ibn Kathir explains it (the abridged
// English on quran.com), with a sahih hadith where one explains the ayah. Each source opens at the highlighted words
// that say the lesson's point. Where the scholars give different explanations, the card keeps to what they agree on.

/** Tafsir Ibn Kathir on Ali 'Imran 3:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_3_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Ali 'Imran 3:${ayah}`,
    url: `https://quran.com/3:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 3:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q3 = (ayah: number) => quranQuote(3, ayah);

/** Ayahs 1 to 63: the clear and the unclear ayahs, Badr as a sign, the family of Imran, Maryam, Zakariyya and Isa. */
const IMRAN_ONE: DeepUnit = {
  key: "imran1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-ali-imran",
  name: "Ali 'Imran, ayahs 1 to 63",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ali 'Imran",
  lessons: [
    {
      slug: "najran",
      title: "A Madinah surah",
      line: "Ali 'Imran came down in Madinah, after the Hijrah.",
      facts: ["200 ayahs", "Ayahs 1-83: the Najran visitors"],
      quote: q3(1),
      source: ik(1, "Ali 'Imran was revealed in Madinah: its first eighty-three ayahs relate to the delegation of Christians from Najran who came to Madinah.", "the first eighty-three Ayat in it relate to the delegation from Najran"),
      difficulty: 2,
      questions: [
        { q: "Where was Ali 'Imran revealed?", a: "Madinah", wrong: ["Makkah", "Taif", "Abyssinia"], why: "Its opening ayahs answer visitors who came to Madinah." },
        { q: "Which visitors do ayahs 1 to 83 of Ali 'Imran answer?", a: "The Christians of Najran", wrong: ["The Romans", "The Persians", "The Quraysh of Makkah"], why: "Ibn Kathir: they relate to the delegation from Najran." },
        { q: "Ali 'Imran means...", a: "The Family of Imran", wrong: ["The Women", "The Cow", "The Table"], why: "Imran was the father of Maryam." }
      ]
    },
    {
      slug: "ever-living",
      title: "The Ever-Living",
      line: "Allah: no god but Him, the Ever-Living, the Sustainer.",
      facts: ["Al-Hayy: the Ever-Living", "Al-Qayyum: the Sustainer"],
      quote: q3(2),
      source: ik(2, "Allah, none has the right to be worshipped but He, the Ever Living, the One Who sustains and protects all that exists. The same words are in Ayat al-Kursi.", "the Ever Living, the One Who sustains and protects all that exists"),
      difficulty: 2,
      questions: [
        { q: "What does 'Al-Hayy' mean?", a: "The Ever-Living", wrong: ["The Most Kind", "The First", "The King"], why: "Allah lives forever and never dies." },
        { q: "What does 'Al-Qayyum' mean?", a: "The Sustainer of all", wrong: ["The Hidden", "The Judge", "The Creator of light"], why: "He keeps everything that exists going." },
        { q: "Which other ayah has 'Al-Hayy al-Qayyum' too?", a: "Ayat al-Kursi", wrong: ["Al-Fatihah 1", "An-Nas 1", "Al-Kawthar 1"], why: "Al-Baqarah 2:255 says the same." }
      ]
    },
    {
      slug: "confirming",
      title: "Books that agree",
      line: "Allah sent the Quran, confirming the Tawrah and the Injil.",
      facts: ["Tawrah to Musa", "Injil to Isa", "Al-Furqan: the Criterion"],
      quote: q3(3),
      source: ik(3, "It is He Who sent down the Book to you with truth, confirming what came before it, and He sent down the Tawrah and the Injil before it as guidance for people, and He sent down the Criterion.", "And He sent down the Tawrah and the Injil"),
      difficulty: 2,
      questions: [
        { q: "What does the Quran do to the books before it?", a: "It confirms them", wrong: ["It ignores them", "It copies them", "It hides them"], why: "Musaddiqan lima bayna yadayh: confirming what came before." },
        { q: "Which two books does 3:3 name?", a: "The Tawrah and the Injil", wrong: ["The Zabur and the Suhuf", "Two books of poems", "Two history books"], why: "He sent down the Tawrah and the Injil." },
        { q: "'Al-Furqan' means...", a: "The Criterion", wrong: ["The Garden", "The Night", "The Promise"], why: "It tells truth from falsehood." }
      ]
    },
    {
      slug: "wombs",
      title: "He shapes you",
      line: "Nothing is hidden from Allah; He shapes you in the womb.",
      facts: ["Earth and heaven", "Male or female, as He wills"],
      quote: q3(6),
      source: ik(6, "Allah has perfect knowledge of the heavens and earth, and nothing in them is hidden from Him. He creates you in the wombs as He wills, male or female. Isa too was created in the womb, a servant of Allah like all people.", "Allah states that He has perfect knowledge in the heavens and earth and that nothing in them is hidden from His watch"),
      difficulty: 2,
      questions: [
        { q: "Who shapes every baby in the womb?", a: "Allah", wrong: ["The angels alone", "The parents", "Nature by chance"], why: "Huwa alladhi yusawwirukum fil-arham." },
        { q: "What does 3:5 say about the earth and the heaven?", a: "Nothing in them is hidden from Allah", wrong: ["Some things are hidden from Allah", "Only the earth is known", "They will last forever"], why: "La yakhfa 'alayhi shay'." },
        { q: "Ibn Kathir: Isa was shaped in the womb like every other person.", tf: true, why: "So he is a created servant of Allah." }
      ]
    },
    {
      slug: "clear-ayahs",
      title: "Clear and less clear",
      line: "Most ayahs are clear; they explain the few that are less clear.",
      facts: ["Muhkam: clear", "Mutashabih: less clear", "Umm al-Kitab: the core"],
      quote: q3(7),
      source: ik(7, "Some ayahs are muhkamat, entirely clear and plain: they are the foundation of the Book. Others are mutashabihat, not clear to many people. Whoever explains the unclear by the clear is rightly guided.", "Ayat that are Muhkamat, entirely clear and plain, and these are the foundations of the Book which are plain for everyone"),
      difficulty: 2,
      questions: [
        { q: "What are the clear ayahs called?", a: "Muhkamat", wrong: ["Mutashabihat", "Makkiyyat", "Suwar"], why: "Entirely clear and plain." },
        { q: "What are the clear ayahs, in 3:7?", a: "The core of the Book", wrong: ["The last pages", "A few rare ayahs", "Stories only"], why: "Hunna umm al-kitab: the foundation of the Book." },
        { q: "How do the rightly guided understand an unclear ayah?", a: "By the clear ayahs", wrong: ["By guessing", "By dreams", "By leaving the Quran"], why: "They refer the unclear back to the clear." }
      ]
    },
    {
      slug: "beware",
      title: "Chasing the unclear",
      line: "Those who chase only the unclear ayahs want trouble.",
      facts: ["Sahih al-Bukhari 4547", "Aishah heard it"],
      quote: q3(7),
      source: hadith("bukhari", "4547", "Aishah", "Sahih", "The Messenger of Allah ﷺ recited 3:7 and said: if you see those who follow what is not entirely clear in it, they are those Allah named, so beware of them.", "If you see those who follow thereof that is not entirely clear"),
      difficulty: 3,
      questions: [
        { q: "In 3:7, why do some follow only the unclear ayahs?", a: "To stir up trouble", wrong: ["To learn more Arabic", "To help others", "To memorize faster"], why: "Ibtigha'a al-fitnah: seeking trouble." },
        { q: "What did the Prophet ﷺ say about such people?", a: "Beware of them", wrong: ["Follow them", "Pay them", "Make them teachers"], why: "Bukhari 4547, from Aishah." },
        { q: "Who heard the Prophet ﷺ say this about 3:7?", a: "Aishah", wrong: ["Abu Hurayrah", "Anas", "Umar"], why: "Sahih al-Bukhari 4547." }
      ]
    },
    {
      slug: "grounded",
      title: "Firm in knowledge",
      line: "Those firm in knowledge say: it is all from our Lord.",
      facts: ["Ar-rasikhuna fil-'ilm", "Only the wise take heed"],
      quote: q3(7),
      source: ik(7, "Those who are firmly grounded in knowledge say: we believe in it, all of it, clear and unclear, is from our Lord. And none receive admonition except people of understanding.", "And those who are firmly grounded in knowledge say"),
      difficulty: 3,
      questions: [
        { q: "What do those firm in knowledge say about the Quran?", a: "All of it is from our Lord", wrong: ["Only the clear part is true", "Some of it is old", "We will check it first"], why: "Kullun min 'indi rabbina." },
        { q: "'Ar-rasikhuna fil-'ilm' are...", a: "Those firmly grounded in knowledge", wrong: ["Those who travel far", "Those who never ask", "Those who write poems"], why: "Rasikh means firmly rooted." },
        { q: "Who takes heed of the Quran, in 3:7?", a: "People of understanding", wrong: ["Everyone without thinking", "Only kings", "Nobody"], why: "Wa ma yadhdhakkaru illa ulul-albab." }
      ]
    },
    {
      slug: "firm-hearts",
      title: "Keep our hearts firm",
      line: "Our Lord, do not let our hearts swerve after You guided us.",
      facts: ["Jami at-Tirmidhi 3522", "Ya Muqallib al-qulub"],
      quote: q3(8),
      source: hadith("tirmidhi", "3522", "Umm Salamah", "Sahih", "The dua the Messenger of Allah ﷺ said most often was: O Changer of the hearts, make my heart firm upon Your religion.", "O Changer of the hearts, make my heart firm upon Your religion"),
      difficulty: 3,
      questions: [
        { q: "What do the firm believers ask in 3:8?", a: "Don't let our hearts swerve", wrong: ["Make us famous", "Give us gold", "Let us sleep"], why: "Rabbana la tuzigh qulubana ba'da idh hadaytana." },
        { q: "Which dua did the Prophet ﷺ say most, as Umm Salamah told?", a: "O Changer of hearts, keep my heart firm", wrong: ["O Allah, give me a palace", "O Allah, make me rich", "O Allah, make me a king"], why: "Ya Muqallib al-qulub, thabbit qalbi 'ala dinik." },
        { q: "Even a believer asks Allah to keep his heart firm.", tf: true, why: "The Prophet ﷺ said it more than any other dua." }
      ]
    },
    {
      slug: "no-help",
      title: "Wealth will not save",
      line: "Wealth and children will not save those who reject Allah.",
      facts: ["Like Fir'awn's people", "They denied the signs"],
      quote: q3(10),
      source: ik(10, "What the disbelievers were given in this life of wealth and children will not help them with Allah. Their way is like the way of Fir'awn's people and those before them, who denied Allah's signs.", "what they were granted in this life of wealth and offspring shall not avail them with Allah"),
      difficulty: 3,
      questions: [
        { q: "What will not help those who reject Allah, in 3:10?", a: "Their wealth and children", wrong: ["Their good deeds", "Their prayers", "Their charity"], why: "Lan tughniya 'anhum amwaluhum wa la awladuhum." },
        { q: "Whose people does 3:11 give as the example?", a: "Fir'awn's", wrong: ["Ibrahim's", "Yusuf's", "Sulayman's"], why: "Ka-da'bi ali Fir'awn." },
        { q: "Being rich in this life proves Allah is pleased with you.", tf: false, why: "Wealth will not avail them with Allah." }
      ]
    },
    {
      slug: "two-armies",
      title: "The sign of Badr",
      line: "At Badr, two armies met: a sign for those who think.",
      facts: ["One fought for Allah", "Allah helps whom He wills"],
      quote: q3(13),
      source: ik(13, "There was a sign in the two armies that met at Badr: one fought in the cause of Allah, the Muslims, and the other in disbelief, the idolaters of Quraysh. Allah supports with His help whom He wills.", "the idolators of Quraysh at Badr"),
      difficulty: 3,
      questions: [
        { q: "Which battle is the sign of the two armies, in 3:13?", a: "Badr", wrong: ["Uhud", "Khandaq", "Hunayn"], why: "Ibn Kathir: the two camps that met at Badr." },
        { q: "Who supports with His help whom He wills?", a: "Allah", wrong: ["The bigger army", "The richer army", "The army with horses"], why: "Wallahu yu'ayyidu bi-nasrihi man yasha'." },
        { q: "Who takes the lesson of Badr, in 3:13?", a: "Those who have insight", wrong: ["Those who sleep", "Those who boast", "Nobody"], why: "Inna fi dhalika la-'ibratan li-ulil-absar." }
      ]
    },
    {
      slug: "adornments",
      title: "The shine of this world",
      line: "Gold, horses and land are made attractive; Allah has better.",
      facts: ["Joys of this life", "The best return is with Allah"],
      quote: q3(14),
      source: ik(14, "Allah mentions the delights He put in this life for people: family, gold and silver, fine horses, cattle and farmland. These are the joys of this world, but the best return is with Allah.", "Allah mentions the delights that He put in this life for people"),
      difficulty: 3,
      questions: [
        { q: "What does 3:14 call gold, horses and land?", a: "The enjoyment of this life", wrong: ["Things to worship", "Evil in themselves", "The best reward"], why: "Dhalika mata'ul-hayatid-dunya." },
        { q: "Where is the best return, in 3:14?", a: "With Allah", wrong: ["In the market", "In a palace", "In the bank"], why: "Wallahu 'indahu husnul-ma'ab." },
        { q: "Which of these does 3:14 name?", a: "Gold and silver", wrong: ["Phones", "Cars", "Paper money"], why: "Al-qanatir al-muqantarah minadh-dhahabi wal-fiddah." }
      ]
    },
    {
      slug: "better-than",
      title: "Something better",
      line: "For the mindful: gardens with rivers, and Allah's pleasure.",
      facts: ["Gardens forever", "Ridwan: Allah's pleasure"],
      quote: q3(15),
      source: ik(15, "Say: shall I tell you of something better than all that? For those who have taqwa there are gardens with their Lord, with rivers flowing beneath, where they live forever with purified spouses, and Allah will be pleased with them.", "And Allah will be pleased with them"),
      difficulty: 3,
      questions: [
        { q: "What is better than this world's joys, in 3:15?", a: "Gardens with their Lord", wrong: ["More gold", "A bigger house", "Fame"], why: "Jannatun tajri min tahtihal-anhar." },
        { q: "'Ridwan' in 3:15 means...", a: "Allah being pleased with them", wrong: ["A river", "A gate", "A tree"], why: "Wa ridwanun minallah." },
        { q: "Who are the gardens for, in 3:15?", a: "Those who have taqwa", wrong: ["Everyone", "Only the rich", "Only Arabs"], why: "Lilladhina ittaqaw." }
      ]
    },
    {
      slug: "before-dawn",
      title: "Forgive us before dawn",
      line: "They are patient and truthful, and seek forgiveness before dawn.",
      facts: ["As-sabirin, as-sadiqin", "Bil-ashar: before dawn"],
      quote: q3(17),
      source: ik(17, "The pious say: our Lord, we have believed, so forgive us and save us from the Fire. They are patient, truthful, obedient, they spend, and they seek forgiveness in the last hours of the night, which shows the virtue of that time.", "this testifies to the virtue of seeking"),
      difficulty: 3,
      questions: [
        { q: "When do they seek forgiveness, in 3:17?", a: "Before dawn", wrong: ["At noon", "After lunch", "Only in Ramadan"], why: "Wal-mustaghfirina bil-ashar." },
        { q: "Which is one of their five qualities in 3:17?", a: "Patient", wrong: ["Proud", "Lazy", "Loud"], why: "Patient, truthful, obedient, spending, seeking forgiveness." },
        { q: "What do they ask before their qualities are listed, in 3:16?", a: "Forgive us and save us from the Fire", wrong: ["Give us more money", "Make us famous", "Let us rule"], why: "Faghfir lana dhunubana wa qina 'adhaban-nar." }
      ]
    },
    {
      slug: "last-third",
      title: "The last third of the night",
      line: "In the night's last third, Allah asks: who seeks forgiveness?",
      facts: ["Sahih al-Bukhari 1145", "Who asks, I give"],
      quote: q3(17),
      source: hadith("bukhari", "1145", "Abu Hurayrah", "Sahih", "Every night when the last third of the night remains, our Lord says: is there anyone to call on Me, that I may answer? Anyone to ask Me, that I may give? Anyone seeking My forgiveness, that I may forgive him?", "Is there anyone seeking My forgiveness, so that I may forgive him"),
      difficulty: 3,
      questions: [
        { q: "Which part of the night does Bukhari 1145 name?", a: "The last third", wrong: ["The first hour", "Midnight only", "Sunset"], why: "When the last third of the night remains." },
        { q: "What does Allah ask then, in Bukhari 1145?", a: "Who is seeking My forgiveness?", wrong: ["Who is the richest?", "Who is the strongest?", "Who is asleep?"], why: "So that I may forgive him." },
        { q: "Bukhari 1145 explains why 3:17 praises seeking forgiveness before dawn.", tf: true, why: "It is the time Allah answers and forgives." }
      ]
    },
    {
      slug: "witness",
      title: "Allah bears witness",
      line: "Allah, His angels and the learned bear witness: no god but Him.",
      facts: ["Shahida Allah", "He keeps justice"],
      quote: q3(18),
      source: ik(18, "Allah bears witness that there is no god but Him, and He is enough as a Witness. Then He mentions the testimony of His angels and the people of knowledge, which is an honor for the scholars.", "Allah then mentioned the testimony of His angels and those who have knowledge"),
      difficulty: 3,
      questions: [
        { q: "Who bear witness with Allah, in 3:18?", a: "The angels and people of knowledge", wrong: ["The kings and armies", "The poets", "The stars"], why: "Wal-mala'ikatu wa ulul-'ilm." },
        { q: "What do they bear witness to?", a: "No god but Him", wrong: ["The world is forever", "Wealth is everything", "Magic is real"], why: "Annahu la ilaha illa Huwa." },
        { q: "3:18 is an honor for people of knowledge.", tf: true, why: "Allah names their witness right after the angels." }
      ]
    },
    {
      slug: "deen-islam",
      title: "The religion with Allah",
      line: "The religion with Allah is Islam; the Prophet ﷺ must convey it.",
      facts: ["Inna ad-dina 'indallahil-islam", "Al-balagh: conveying"],
      quote: q3(19),
      source: ik(19, "Truly, the religion with Allah is Islam. The People of the Book differed only out of rivalry after knowledge came to them. If they turn away, your duty is only to convey the Message.", "Truly, the religion with Allah is Islam"),
      difficulty: 3,
      questions: [
        { q: "What is the religion with Allah, in 3:19?", a: "Islam", wrong: ["Whatever you like", "The religion of your tribe", "No religion"], why: "Inna ad-dina 'indallahil-islam." },
        { q: "Why did the People of the Book differ, in 3:19?", a: "Out of rivalry after knowledge came", wrong: ["They never got knowledge", "They were too young", "Allah told them to"], why: "Baghyan baynahum." },
        { q: "What was the Prophet's ﷺ duty if people turned away, in 3:20?", a: "Only to convey the message", wrong: ["To force them", "To give up", "To hide the Quran"], why: "Fa-innama 'alaykal-balagh." }
      ]
    },
    {
      slug: "pride",
      title: "Refusing the truth",
      line: "Pride is refusing the truth and looking down on people.",
      facts: ["Sahih Muslim 91", "Allah is beautiful, loves beauty"],
      quote: q3(21),
      source: hadith("muslim", "91", "Abdullah ibn Mas'ud", "Sahih", "Whoever has an atom's weight of pride in his heart will not enter Paradise. A man said he likes nice clothes and shoes. He ﷺ said: Allah is beautiful and loves beauty; pride is refusing the truth and looking down on people.", "Pride is disdaining the truth"),
      difficulty: 3,
      questions: [
        { q: "Ibn Kathir explains 3:21 with a hadith. What is pride?", a: "Refusing the truth and looking down on people", wrong: ["Wearing nice clothes", "Being happy", "Having good shoes"], why: "Sahih Muslim 91." },
        { q: "Liking nice clothes is pride.", tf: false, why: "Allah is beautiful and loves beauty." },
        { q: "Whom did the people in 3:21 harm for calling to justice?", a: "Prophets and people who ordered justice", wrong: ["Thieves", "Kings", "Soldiers"], why: "They rejected those who ordered fairness." }
      ]
    },
    {
      slug: "few-days",
      title: "A false hope",
      line: "Some said: the Fire will touch us only a few days.",
      facts: ["They fooled themselves", "Each soul paid in full"],
      quote: q3(24),
      source: ik(24, "They dared to turn from the truth because they claimed the Fire would touch them only for a few days. What they made up deceived them. On the Day with no doubt in it, every soul will be paid in full for what it earned.", "they deceived themselves"),
      difficulty: 3,
      questions: [
        { q: "What false claim does 3:24 tell of?", a: "The Fire would touch them only a few days", wrong: ["They would never die", "They owned Jannah", "They were angels"], why: "Lan tamassana an-naru illa ayyaman ma'dudat." },
        { q: "What happens to every soul, in 3:25?", a: "It is paid in full for what it earned", wrong: ["It is forgotten", "It gets half", "It is judged by luck"], why: "Wa wuffiyat kullu nafsin ma kasabat." },
        { q: "Will anyone be wronged on that Day, in 3:25?", a: "No", wrong: ["Yes, many", "Only the poor", "Only the weak"], why: "Wa hum la yuzlamun." }
      ]
    },
    {
      slug: "kingship",
      title: "Owner of all kingship",
      line: "Allah owns all kingship: He gives it and takes it at will.",
      facts: ["Malik al-mulk", "All good is in His Hand"],
      quote: q3(26),
      source: ik(26, "Say, O Allah, Possessor of the kingdom, meaning: all sovereignty is Yours. You give power to whom You will and take it from whom You will, You honor and humble whom You will; all good is in Your Hand.", "meaning, all sovereignty is Yours"),
      difficulty: 3,
      questions: [
        { q: "'Malik al-mulk' means...", a: "Owner of all kingship", wrong: ["King of one land", "A rich man", "A judge"], why: "All sovereignty is Allah's." },
        { q: "In whose Hand is all good, in 3:26?", a: "Allah's", wrong: ["The king's", "The army's", "The market's"], why: "Bi-yadikal-khayr." },
        { q: "A king keeps his power as long as he wants.", tf: false, why: "Allah takes power from whom He wills." }
      ]
    },
    {
      slug: "night-day",
      title: "Night into day",
      line: "He makes night pass into day, and brings life out of death.",
      facts: ["Living from the dead", "Provision without measure"],
      quote: q3(27),
      source: ik(27, "You make the night enter into the day and the day into the night; You bring the living out of the dead and the dead out of the living; and You give provision to whom You will without measure.", "You make the night to enter into the day"),
      difficulty: 3,
      questions: [
        { q: "What passes into the day, in 3:27?", a: "The night", wrong: ["The sea", "The moon", "The wind"], why: "Tulijul-layla fin-nahar." },
        { q: "What does Allah bring out of the dead?", a: "The living", wrong: ["Nothing", "Only stones", "Only water"], why: "Wa tukhrijul-hayya minal-mayyit." },
        { q: "How does Allah give provision, in 3:27?", a: "Without measure, to whom He wills", wrong: ["By luck", "Only to kings", "Never twice"], why: "Wa tarzuqu man tasha'u bi-ghayri hisab." }
      ]
    },
    {
      slug: "allies",
      title: "Whom to stand with",
      line: "Believers stand with believers, not with enemies of the faith.",
      facts: ["Awliya': close allies", "Allah warns of Himself"],
      quote: q3(28),
      source: ik(28, "Allah forbade the believers from taking the disbelievers as allies and close friends instead of the believers, unless they fear harm from them. Allah warns you of Himself, and to Him is the return.", "Allah prohibited His believing servants from becoming supporters of the disbelievers"),
      difficulty: 3,
      questions: [
        { q: "Whom should believers stand with first, in 3:28?", a: "The believers", wrong: ["Enemies of the faith", "Whoever pays most", "Nobody"], why: "Min dunil-mu'minin: not instead of the believers." },
        { q: "What is the one exception in 3:28?", a: "When fearing harm from them", wrong: ["When bored", "When they are rich", "There is none"], why: "Illa an tattaqu minhum tuqah." },
        { q: "To whom is the final return, in 3:28?", a: "To Allah", wrong: ["To the earth", "To the tribe", "To nobody"], why: "Wa ilallahil-masir." }
      ]
    },
    {
      slug: "hidden-chests",
      title: "He knows what you hide",
      line: "Hide it or show it: Allah knows what is in your heart.",
      facts: ["Every deed brought forward", "Allah is kind to His servants"],
      quote: q3(29),
      source: ik(29, "Allah knows the secret and the open; nothing escapes Him. On the Day of Resurrection every soul finds the good it did brought forward, and wishes its evil were far away. Allah warns you, and He is kind to His servants.", "Allah tells His servants that He knows the secrets and apparent matters"),
      difficulty: 3,
      questions: [
        { q: "What does Allah know, in 3:29?", a: "What you hide and what you show", wrong: ["Only what you say", "Only what you write", "Only big things"], why: "In tukhfu ma fi sudurikum aw tubduhu ya'lamhullah." },
        { q: "What will each soul find on that Day, in 3:30?", a: "The good it did, brought forward", wrong: ["Nothing at all", "Only its money", "Its friends"], why: "Ma 'amilat min khayrin muhdara." },
        { q: "How is Allah toward His servants, in 3:30?", a: "Kind", wrong: ["Careless", "Unaware", "Far away"], why: "Wallahu ra'ufun bil-'ibad." }
      ]
    },
    {
      slug: "follow-me",
      title: "Love Allah: follow",
      line: "Love Allah? Follow the Prophet ﷺ, and Allah will love you.",
      facts: ["The test of love", "He forgives your sins"],
      quote: q3(31),
      source: ik(31, "This ayah judges anyone who claims to love Allah but does not follow the way of Muhammad ﷺ. Al-Hasan al-Basri and others said: some people claimed to love Allah, so Allah tested them with this ayah.", "Some people claimed that they love Allah. So Allah tested them with this Ayah"),
      difficulty: 3,
      questions: [
        { q: "How do you show love for Allah, in 3:31?", a: "By following the Prophet ﷺ", wrong: ["By saying it loudly", "By getting rich", "By staying home"], why: "Fattabi'uni yuhbibkumullah." },
        { q: "What do followers get, in 3:31?", a: "Allah's love and forgiveness", wrong: ["Fame", "Gold", "Long life"], why: "Yuhbibkumullah wa yaghfir lakum dhunubakum." },
        { q: "Al-Hasan al-Basri called 3:31 a test for people who claim to love Allah.", tf: true, why: "Allah tested them with this ayah." }
      ]
    },
    {
      slug: "who-refuses",
      title: "Who refuses Jannah?",
      line: "All my Ummah enter Jannah, except one who refuses.",
      facts: ["Sahih al-Bukhari 7280", "Obey: enter Jannah"],
      quote: q3(32),
      source: hadith("bukhari", "7280", "Abu Hurayrah", "Sahih", "The Messenger of Allah ﷺ said: all my followers will enter Paradise except those who refuse. They asked: who would refuse? He said: whoever obeys me enters Paradise, and whoever disobeys me has refused.", "All my followers will enter Paradise except those who refuse"),
      difficulty: 3,
      questions: [
        { q: "Who refuses Jannah, in Bukhari 7280?", a: "Whoever disobeys the Prophet ﷺ", wrong: ["Whoever is poor", "Whoever is young", "Whoever lives far away"], why: "Whoever disobeys me has refused." },
        { q: "What does 3:32 command?", a: "Obey Allah and the Messenger ﷺ", wrong: ["Obey your wishes", "Obey the crowd", "Obey nobody"], why: "Ati'ullaha war-rasul." },
        { q: "In Bukhari 7280, obeying the Prophet ﷺ is the way into Jannah.", tf: true, why: "Whoever obeys me will enter Paradise." }
      ]
    },
    {
      slug: "chosen-families",
      title: "Chosen families",
      line: "Allah chose Adam, Nuh, Ibrahim's family and Imran's family.",
      facts: ["Nuh: the first messenger", "Imran: Maryam's father"],
      quote: q3(33),
      source: ik(33, "Allah chose these households over the people of the earth: Adam, Nuh, the first messenger to the people of the earth, the family of Ibrahim, which includes Muhammad ﷺ, and the family of Imran, the father of Maryam.", "Allah chose Nuh and made him the first Messenger to the people of the earth"),
      difficulty: 3,
      questions: [
        { q: "Which family is Ali 'Imran named after?", a: "Maryam's family", wrong: ["Musa's family", "Yusuf's family", "Nuh's family"], why: "Imran was the father of Maryam." },
        { q: "Ibn Kathir: who was the first messenger to the people of the earth?", a: "Nuh", wrong: ["Ibrahim", "Musa", "Hud"], why: "Allah made Nuh the first Messenger." },
        { q: "Which family includes Muhammad ﷺ, in 3:33?", a: "The family of Ibrahim", wrong: ["The family of Imran", "The family of Nuh's son", "None of them"], why: "He is from Ibrahim's offspring through Isma'il." }
      ]
    },
    {
      slug: "the-vow",
      title: "A promise before birth",
      line: "The wife of Imran promised her unborn child to Allah's service.",
      facts: ["Muharrar: given to Allah", "For Bayt al-Maqdis"],
      quote: q3(35),
      source: ik(35, "The wife of Imran, the mother of Maryam, had longed for a child. When she became pregnant, she vowed that her child would be given to worship and to serving Bayt al-Maqdis, saying: accept this from me.", "She vowed to make her child concentrate on worship and serving Bayt Al-Maqdis"),
      difficulty: 3,
      questions: [
        { q: "What did the wife of Imran promise, in 3:35?", a: "Her child would serve Allah", wrong: ["Her house to a king", "Her gold to the poor", "To move to Makkah"], why: "Nadhartu laka ma fi batni muharrara." },
        { q: "Where would the child serve, Ibn Kathir says?", a: "Bayt al-Maqdis", wrong: ["The Ka'bah", "Madinah", "Egypt"], why: "The masjid in Jerusalem." },
        { q: "What did she ask of Allah?", a: "Accept it from me", wrong: ["Make it a boy only", "Make it rich", "Keep it secret"], why: "Fa-taqabbal minni." }
      ]
    },
    {
      slug: "named-maryam",
      title: "She named her Maryam",
      line: "Every newborn is touched by Shaytan, except Maryam and her son.",
      facts: ["Sahih al-Bukhari 4548", "Her mother's dua for refuge"],
      quote: q3(36),
      source: hadith("bukhari", "4548", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said: no child is born except that Shaytan touches it at birth and it cries out, except Maryam and her son. Then Abu Hurayrah recited: I seek refuge with You for her and her offspring from Shaytan.", "except Mary and her son"),
      difficulty: 3,
      questions: [
        { q: "What name did her mother give her, in 3:36?", a: "Maryam", wrong: ["Asiyah", "Hajar", "Sarah"], why: "Wa inni sammaytuha Maryam." },
        { q: "Whom did Shaytan not touch at birth, in Bukhari 4548?", a: "Maryam and her son", wrong: ["Every child", "Only kings", "Nobody"], why: "Her mother's dua was answered." },
        { q: "For whom did Maryam's mother seek refuge in 3:36?", a: "Maryam and her children", wrong: ["Only herself", "Her husband", "Her neighbors"], why: "U'idhuha bika wa dhurriyyataha." }
      ]
    },
    {
      slug: "from-allah",
      title: "It is from Allah",
      line: "Zakariyya found food with Maryam: she said it is from Allah.",
      facts: ["Zakariyya cared for her", "The mihrab: prayer room"],
      quote: q3(37),
      source: ik(37, "Allah accepted Maryam, raised her well and made Zakariyya her guardian, so she learned from his knowledge and goodness. Each time he entered her prayer room he found food with her. She said: it is from Allah.", "Allah made Zakariyya her sponsor"),
      difficulty: 3,
      questions: [
        { q: "Who looked after Maryam, in 3:37?", a: "Zakariyya", wrong: ["Musa", "Yahya", "Dawud"], why: "Wa kaffalaha Zakariyya." },
        { q: "What did Zakariyya find with her?", a: "Food from Allah", wrong: ["Gold", "A sword", "A map"], why: "Wajada 'indaha rizqa." },
        { q: "What did Maryam answer when asked where it came from?", a: "It is from Allah", wrong: ["From the market", "From a friend", "I don't know"], why: "Huwa min 'indillah." }
      ]
    },
    {
      slug: "zakariyya-dua",
      title: "Zakariyya's dua",
      line: "Old Zakariyya asked for a good child, and Allah gave him Yahya.",
      facts: ["He asked in secret", "Yahya: noble and chaste"],
      quote: q3(38),
      source: ik(38, "When Zakariyya saw Allah feeding Maryam, he longed for a child. He was old and his wife could not have children, yet he called on Allah in secret. The angels called him while he prayed: Allah gives you good news of Yahya.", "Yet, he still supplicated to Allah and called Him in secret"),
      difficulty: 3,
      questions: [
        { q: "What did Zakariyya ask for, in 3:38?", a: "A good child", wrong: ["A kingdom", "Wealth", "A long journey"], why: "Hab li min ladunka dhurriyyatan tayyibah." },
        { q: "Where was Zakariyya when the angels called him?", a: "Praying in the mihrab", wrong: ["At the market", "On a ship", "Asleep at home"], why: "Wa huwa qa'imun yusalli fil-mihrab." },
        { q: "What was the son's name?", a: "Yahya", wrong: ["Isa", "Ishaq", "Yusuf"], why: "Allah gives you good news of Yahya." }
      ]
    },
    {
      slug: "three-days",
      title: "Three days of signs",
      line: "His sign: three days speaking only by signs, remembering Allah.",
      facts: ["Allah does what He wills", "Glorify Him morning and evening"],
      quote: q3(41),
      source: ik(41, "Zakariyya said: how can I have a son when I am very old and my wife is barren? Allah said: Allah does what He wills. His sign was that he would not speak to people for three days except by signals, while remembering his Lord much.", "Your sign is that you shall not speak to the people for three days except by signals"),
      difficulty: 3,
      questions: [
        { q: "What was Zakariyya's sign, in 3:41?", a: "Not speaking for three days", wrong: ["A rainbow", "A dream", "A star"], why: "Except by signals." },
        { q: "What should he do in those days?", a: "Remember Allah much", wrong: ["Sleep", "Travel", "Stay silent before Allah too"], why: "Wadhkur rabbaka kathiran." },
        { q: "What answered his wonder at being old, in 3:40?", a: "Allah does what He wills", wrong: ["Wait ten years", "It cannot happen", "Ask a doctor"], why: "Kadhalikallahu yaf'alu ma yasha'." }
      ]
    },
    {
      slug: "maryam-chosen",
      title: "Maryam, chosen",
      line: "Allah chose Maryam and purified her above all women.",
      facts: ["Sahih al-Bukhari 3432", "With her: Khadijah"],
      quote: q3(42),
      source: hadith("bukhari", "3432", "Ali ibn Abi Talib", "Sahih", "I heard the Prophet ﷺ say: Maryam, the daughter of Imran, was the best of the women of her time, and Khadijah is the best of the women of this Ummah.", "was the best among the women"),
      difficulty: 3,
      questions: [
        { q: "What did the angels tell Maryam, in 3:42?", a: "Allah chose and purified you", wrong: ["You will be a queen", "Leave the masjid", "You will be rich"], why: "Innallahastafaki wa tahharaki." },
        { q: "Who is named with Maryam as the best of women, in Bukhari 3432?", a: "Khadijah", wrong: ["Hind", "Bilqis", "Zulaykha"], why: "The best of the women of this Ummah." },
        { q: "What was Maryam told to do, in 3:43?", a: "Obey, prostrate and bow with those who bow", wrong: ["Rest and wait", "Leave prayer", "Travel to Egypt"], why: "Uqnuti li-rabbiki wasjudi warka'i." }
      ]
    },
    {
      slug: "the-pens",
      title: "Casting the pens",
      line: "Men cast their pens to choose who would care for Maryam.",
      facts: ["News of the unseen", "The Prophet ﷺ was not there"],
      quote: q3(44),
      source: ik(44, "This is news of the unseen that Allah revealed: you were not with them when they cast lots with their pens over which of them would take care of Maryam, nor when they disputed.", "when they cast lots with their pens as to which of them should be charged with the care of Maryam"),
      difficulty: 3,
      questions: [
        { q: "What did they cast to decide who would care for Maryam?", a: "Their pens", wrong: ["Stones", "Arrows of war", "Coins"], why: "Idh yulquna aqlamahum." },
        { q: "How did the Prophet ﷺ know this story, in 3:44?", a: "Allah revealed it", wrong: ["He read old books", "A traveler told him", "He was there"], why: "Min anba'il-ghayb: news of the unseen." },
        { q: "Who won the care of Maryam, in 3:37?", a: "Zakariyya", wrong: ["Yahya", "Imran", "Harun"], why: "Wa kaffalaha Zakariyya." }
      ]
    },
    {
      slug: "al-masih",
      title: "Al-Masih, Isa son of Maryam",
      line: "Good news of a Word from Allah: Al-Masih, Isa son of Maryam.",
      facts: ["Honored in both worlds", "Named after his mother"],
      quote: q3(45),
      source: ik(45, "The angels gave Maryam good news of a son made by a word from Allah, Be. He was called Al-Masih because when he touched the sick they were healed by Allah's leave, and Isa son of Maryam because he had no father.", "those afflicted with an illness, they would be healed by Allah"),
      difficulty: 3,
      questions: [
        { q: "Why is Isa called the son of Maryam, Ibn Kathir says?", a: "He had no father", wrong: ["To honor a king", "It was a custom", "His father asked it"], why: "Relating him to his mother." },
        { q: "Why was he called Al-Masih, Ibn Kathir says?", a: "The sick he touched were healed, by Allah's leave", wrong: ["He was a king", "He traveled far", "He was very tall"], why: "Mash means to touch or wipe." },
        { q: "How is Isa described in 3:45?", a: "Honored in this world and the next", wrong: ["Forgotten", "A rich trader", "A poet"], why: "Wajihan fid-dunya wal-akhirah." }
      ]
    },
    {
      slug: "in-the-cradle",
      title: "He spoke in the cradle",
      line: "Isa spoke to people as a baby in the cradle.",
      facts: ["Sahih al-Bukhari 3436", "Be, and it is"],
      quote: q3(46),
      source: hadith("bukhari", "3436", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said: none spoke in the cradle except three, and the first was Isa.", "None spoke in cradle but three"),
      difficulty: 3,
      questions: [
        { q: "When did Isa speak to people, in 3:46?", a: "In the cradle and as a grown man", wrong: ["Never as a child", "Only in dreams", "Only in Egypt"], why: "Fil-mahdi wa kahla." },
        { q: "How many spoke in the cradle, in Bukhari 3436?", a: "Three", wrong: ["One", "Seven", "Ten"], why: "None spoke in the cradle except three." },
        { q: "What does Allah say when He decrees a thing, in 3:47?", a: "Be, and it is", wrong: ["Wait", "Maybe", "Try"], why: "Kun fa-yakun." }
      ]
    },
    {
      slug: "by-allahs-leave",
      title: "By Allah's leave",
      line: "Isa healed the blind and raised the dead, by Allah's leave.",
      facts: ["A bird of clay", "Tawrah and Injil taught"],
      quote: q3(49),
      source: ik(49, "Allah taught Isa the Book, wisdom, the Tawrah, which He sent to Musa, and the Injil. He sent him to the Children of Israel: he made a bird of clay that became a bird, healed the blind and the leper and raised the dead, all by Allah's leave.", "The Tawrah is the Book that Allah sent down to Musa"),
      difficulty: 4,
      questions: [
        { q: "Whose permission made Isa's miracles happen?", a: "Allah's", wrong: ["His own power", "The angels'", "The people's"], why: "Bi-idhnillah, said again and again." },
        { q: "What did Isa shape from clay, in 3:49?", a: "A bird", wrong: ["A lion", "A house", "A boat"], why: "Ka-hay'atit-tayr." },
        { q: "To whom was Isa sent, in 3:49?", a: "The Children of Israel", wrong: ["The Arabs", "The Romans only", "All the world's kings"], why: "Wa rasulan ila bani Isra'il." }
      ]
    },
    {
      slug: "my-lord-your-lord",
      title: "My Lord and your Lord",
      line: "Isa said: Allah is my Lord and your Lord, so worship Him.",
      facts: ["He confirmed the Tawrah", "This is the straight path"],
      quote: q3(51),
      source: ik(51, "Isa came confirming the Tawrah before him and making lawful some of what had been forbidden to them. He said: Truly, Allah is my Lord and your Lord, so worship Him alone. This is the straight path.", "Truly, Allah is my Lord and your Lord, so worship Him"),
      difficulty: 4,
      questions: [
        { q: "What did Isa say about Allah, in 3:51?", a: "He is my Lord and your Lord", wrong: ["He is my father", "I am Allah", "He is far from us"], why: "Innallaha rabbi wa rabbukum." },
        { q: "What did Isa call worshipping Allah alone?", a: "The straight path", wrong: ["A hard road", "A new idea", "One way among many"], why: "Hadha siratun mustaqim." },
        { q: "What did Isa do to some things forbidden before, in 3:50?", a: "Made them lawful", wrong: ["Made them worse", "Hid them", "Forgot them"], why: "Li-uhilla lakum ba'dal-ladhi hurrima 'alaykum." }
      ]
    },
    {
      slug: "helpers",
      title: "Helpers of Allah",
      line: "The disciples said: we are Allah's helpers; we are Muslims.",
      facts: ["Al-Hawariyyun", "Like the Ansar later"],
      quote: q3(52),
      source: ik(52, "When Isa felt their disbelief he asked: who will be my helpers for Allah? The disciples answered: we are Allah's helpers, we believe and we are Muslims. It is like the Ansar, who helped the Prophet ﷺ and gave him refuge.", "The Ansar helped the Prophet ﷺ and gave him refuge"),
      difficulty: 4,
      questions: [
        { q: "What were Isa's disciples called?", a: "Al-Hawariyyun", wrong: ["Al-Ansar", "Al-Muhajirun", "Al-Ahbar"], why: "Qalal-hawariyyuna nahnu ansarullah." },
        { q: "What did the disciples say they were, in 3:52?", a: "Muslims", wrong: ["Kings", "Judges", "Poets"], why: "Washhad bi-anna muslimun." },
        { q: "Ibn Kathir compares the disciples to which later people?", a: "The Ansar", wrong: ["The Quraysh", "The Romans", "The Persians"], why: "They gave the Prophet ﷺ refuge." }
      ]
    },
    {
      slug: "raised-up",
      title: "Raised to Allah",
      line: "They plotted against Isa, but Allah raised him up to Himself.",
      facts: ["Allah is the best of planners", "He was not crucified"],
      quote: q3(55),
      source: ik(55, "Allah said: O Isa, I will take you and raise you to Myself and clear you of those who disbelieve. As another ayah says: they did not kill him or crucify him, but Allah raised him up to Himself.", "But Allah raised him up unto Himself"),
      difficulty: 4,
      questions: [
        { q: "What did Allah do with Isa, in 3:55?", a: "Raised him up to Himself", wrong: ["Left him alone", "Sent him to Egypt", "Made him a king"], why: "Wa rafi'uka ilayy." },
        { q: "Who is the best of planners, in 3:54?", a: "Allah", wrong: ["The plotters", "The Romans", "The disciples"], why: "Wallahu khayrul-makirin." },
        { q: "Isa was crucified.", tf: false, why: "He was not crucified; Allah raised him up to Himself." }
      ]
    },
    {
      slug: "like-adam",
      title: "Like Adam",
      line: "Isa is like Adam: Allah made him from dust and said, Be.",
      facts: ["Adam: no father or mother", "Isa: no father"],
      quote: q3(59),
      source: ik(59, "Isa before Allah is like Adam: Allah created Adam without a father or a mother, from dust, and said Be, and he was. So He who made Adam can make Isa without a father; if that made Isa a son of God, Adam would be more so, and both claims are false.", "for Allah created Adam without a father or a mother"),
      difficulty: 4,
      questions: [
        { q: "Whom is Isa compared to, in 3:59?", a: "Adam", wrong: ["Nuh", "Ibrahim", "Musa"], why: "Inna mathala 'Isa 'indallahi ka-mathali Adam." },
        { q: "What was Adam made from?", a: "Dust", wrong: ["Light", "Fire", "Water only"], why: "Khalaqahu min turab." },
        { q: "Why does 3:59 show Isa is not Allah's son?", a: "Adam had no parents and is only a servant", wrong: ["Adam was older", "Adam was a king", "Isa was taller"], why: "If no father made one divine, Adam would be more so." }
      ]
    },
    {
      slug: "mubahalah",
      title: "The call to pray it out",
      line: "The Prophet ﷺ called his family to pray against the liars.",
      facts: ["Sahih Muslim 2404d", "Ali, Fatimah, Hasan, Husayn"],
      quote: q3(61),
      source: hadith("muslim", "2404d", "Sa'd ibn Abi Waqqas", "Sahih", "When the ayah came, let us call our sons and your sons, the Messenger of Allah ﷺ called Ali, Fatimah, Hasan and Husayn, and said: O Allah, these are my family.", "Fatima, Hasan and Husain"),
      difficulty: 4,
      questions: [
        { q: "What does the Mubahalah in 3:61 ask for?", a: "Allah's curse on whoever is lying", wrong: ["A race", "A trade deal", "A poem contest"], why: "Fa-naj'al la'natallahi 'alal-kadhibin." },
        { q: "Whom did the Prophet ﷺ call for it, in Muslim 2404d?", a: "Ali, Fatimah, Hasan and Husayn", wrong: ["His soldiers", "The Quraysh chiefs", "Strangers"], why: "O Allah, these are my family." },
        { q: "Which ayah calls 'our sons and your sons'?", a: "3:61", wrong: ["3:7", "3:31", "3:103"], why: "The ayah of the Mubahalah." }
      ]
    },
    {
      slug: "trustworthy",
      title: "The trustworthy one",
      line: "Najran's leaders backed away and asked for a trustworthy man.",
      facts: ["Sahih al-Bukhari 4380", "Abu Ubaydah was sent"],
      quote: q3(61),
      source: hadith("bukhari", "4380", "Hudhayfah", "Sahih", "The leaders of Najran came meaning to do the mutual curse, then one said to the other: don't, for if he is a Prophet we will never succeed. They asked for a trustworthy man, and he ﷺ sent Abu Ubaydah: this is the trustworthy one of this Ummah.", "This is the Trustworthy man of this (Muslim) nation"),
      difficulty: 4,
      questions: [
        { q: "Why did Najran's leaders not go ahead, in Bukhari 4380?", a: "They feared he truly was a Prophet", wrong: ["They were sick", "It rained", "They forgot"], why: "If he is a Prophet, we will never succeed." },
        { q: "Whom did the Prophet ﷺ send with them?", a: "Abu Ubaydah", wrong: ["Khalid", "Abu Sufyan", "Amr ibn al-As"], why: "The trustworthy one of this Ummah." },
        { q: "The truth, in 3:62: there is no god except...", a: "Allah", wrong: ["Isa", "The angels", "The stars"], why: "Wa ma min ilahin illallah." }
      ]
    }
  ]
};

export const IMRAN_UNITS: readonly DeepUnit[] = [IMRAN_ONE];
