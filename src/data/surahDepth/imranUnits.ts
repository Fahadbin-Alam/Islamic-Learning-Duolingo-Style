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

/** Ayahs 64 to 120: a fair word to the People of the Book, Ibrahim, keeping trusts, the first House, holding Allah's rope. */
const IMRAN_TWO: DeepUnit = {
  key: "imran2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-ali-imran",
  name: "Ali 'Imran, ayahs 64 to 120",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ali 'Imran",
  lessons: [
    {
      slug: "common-word",
      title: "A word in common",
      line: "Come to a fair word: we worship none but Allah.",
      facts: ["No partners with Allah", "No people as lords"],
      quote: q3(64),
      source: ik(64, "Say: O People of the Book, come to a word that is fair between us and you: that we worship none but Allah, associate nothing with Him, and none of us take others as lords besides Allah. This is the message of every messenger.", "that we worship none but Allah"),
      difficulty: 3,
      questions: [
        { q: "What 'word' does 3:64 call to?", a: "Worship none but Allah", wrong: ["Trade with us", "Join our tribe", "Leave your books"], why: "Alla na'buda illallah." },
        { q: "What should none of us take besides Allah, in 3:64?", a: "Others as lords", wrong: ["Friends", "Teachers", "Food"], why: "Wa la yattakhidha ba'duna ba'dan arbaban." },
        { q: "If they turn away, what do the believers say?", a: "Bear witness that we are Muslims", wrong: ["Then we give up", "Then we agree with you", "Then we stay silent"], why: "Ishhadu bi-anna muslimun." }
      ]
    },
    {
      slug: "letter-to-heraclius",
      title: "A letter to Heraclius",
      line: "The Prophet ﷺ wrote 3:64 in his letter to the Roman emperor.",
      facts: ["Sahih al-Bukhari 7", "Carried by Dihyah"],
      quote: q3(64),
      source: hadith("bukhari", "7", "Ibn Abbas", "Sahih", "The Prophet's ﷺ letter to Heraclius, ruler of the Romans, invited him to Islam and quoted: O People of the Book, come to a word common to you and us, that we worship none but Allah.", "Come to a word common to you and us"),
      difficulty: 3,
      questions: [
        { q: "To whom did the Prophet ﷺ send a letter with 3:64?", a: "Heraclius, the Roman emperor", wrong: ["The king of Yemen", "Abu Jahl", "The Persian army"], why: "Sahih al-Bukhari 7." },
        { q: "What did the letter invite Heraclius to?", a: "Islam", wrong: ["A war", "A trade deal", "A wedding"], why: "I invite you to Islam." },
        { q: "The Prophet ﷺ used an ayah of the Quran to invite a king.", tf: true, why: "He quoted Ali 'Imran 3:64." }
      ]
    },
    {
      slug: "ibrahim-hanif",
      title: "Ibrahim, upright",
      line: "Ibrahim was not a Jew or a Christian, but an upright Muslim.",
      facts: ["Tawrah and Injil came after him", "Hanif: turning to Allah alone"],
      quote: q3(67),
      source: ik(67, "The Jews and Christians each claimed Ibrahim as one of them, yet the Tawrah and the Injil were revealed long after him. Ibrahim was neither a Jew nor a Christian, but a true Muslim, hanif, and not one of those who joined partners with Allah.", "Ibrahim was neither a Jew nor a Christian, but he was a true Muslim Hanifa"),
      difficulty: 3,
      questions: [
        { q: "Why could Ibrahim not be a Jew or Christian, in 3:65?", a: "The Tawrah and Injil came after him", wrong: ["He lived in Egypt", "He had no children", "He was a king"], why: "Wa ma unzilatit-tawratu wal-injilu illa min ba'dih." },
        { q: "'Hanif' means...", a: "Turning to Allah alone", wrong: ["A traveler", "A king", "A poet"], why: "Upright, away from every false god." },
        { q: "Who are closest to Ibrahim, in 3:68?", a: "His followers, this Prophet ﷺ and the believers", wrong: ["Whoever claims him", "Only his tribe", "Nobody"], why: "Inna awlan-nasi bi-Ibrahima lalladhina-ttaba'uh." }
      ]
    },
    {
      slug: "mixing-truth",
      title: "Mixing truth with lies",
      line: "Do not mix truth with falsehood or hide the truth you know.",
      facts: ["A morning-and-evening trick", "Guidance is Allah's guidance"],
      quote: q3(71),
      source: ik(71, "Some People of the Book mixed truth with falsehood and hid the truth they knew. A group of them said: believe in the morning and reject it at the end of the day, so the believers may turn back. Say: true guidance is Allah's guidance.", "Why do you mix truth with falsehood and conceal the truth while you know"),
      difficulty: 3,
      questions: [
        { q: "What does 3:71 warn against?", a: "Mixing truth with falsehood", wrong: ["Learning to read", "Giving charity", "Praying at night"], why: "Lima talbisunal-haqqa bil-batil." },
        { q: "What trick does 3:72 describe?", a: "Believe in the morning, reject in the evening", wrong: ["Pray twice a day", "Fast in secret", "Travel at night"], why: "To make the believers doubt." },
        { q: "Whose guidance is the true guidance, in 3:73?", a: "Allah's", wrong: ["The crowd's", "The rabbis'", "The poets'"], why: "Innal-huda hudallah." }
      ]
    },
    {
      slug: "trusts",
      title: "Keeping a trust",
      line: "Some return a fortune they hold; some hold back even a coin.",
      facts: ["Qintar: a huge amount", "Allah loves the mindful"],
      quote: q3(75),
      source: ik(75, "Among the People of the Book is one who, if trusted with a great fortune, gives it back, and one who, if trusted with a single coin, will not return it unless you keep demanding. Whoever keeps his promise and fears Allah, Allah loves the mindful.", "if entrusted with a single silver coin, will not repay it unless you constantly stand demanding"),
      difficulty: 3,
      questions: [
        { q: "What is a 'qintar' in 3:75?", a: "A huge amount of wealth", wrong: ["A small coin", "A camel", "A book"], why: "A great amount of money." },
        { q: "Whom does Allah love, in 3:76?", a: "Those who keep their word and fear Him", wrong: ["The richest", "The loudest", "The strongest"], why: "Fa-innallaha yuhibbul-muttaqin." },
        { q: "3:75 says every one of the People of the Book is the same.", tf: false, why: "Some return a fortune; some hold back a coin." }
      ]
    },
    {
      slug: "false-oath",
      title: "A false oath for gain",
      line: "Whoever swears falsely to take a Muslim's property angers Allah.",
      facts: ["Sahih al-Bukhari 4549", "Allah will not speak to them"],
      quote: q3(77),
      source: hadith("bukhari", "4549", "Abdullah ibn Mas'ud", "Sahih", "The Messenger of Allah ﷺ said: whoever swears an oath to take a Muslim's property unjustly will meet Allah while He is angry with him. Allah revealed 3:77 to confirm it.", "will meet Allah Who will be angry with him"),
      difficulty: 4,
      questions: [
        { q: "What does 3:77 say false swearers sell Allah's covenant for?", a: "A small price", wrong: ["Paradise", "Knowledge", "Nothing"], why: "Yashtaruna bi-'ahdillahi thamanan qalila." },
        { q: "How will such a person meet Allah, in Bukhari 4549?", a: "With Allah angry with him", wrong: ["Smiling", "Forgiven at once", "As a hero"], why: "He will meet Allah Who is angry with him." },
        { q: "What will Allah not do for them on that Day, in 3:77?", a: "Speak to them or look at them", wrong: ["Count their deeds", "Raise them up", "Judge them"], why: "Wa la yukallimuhumullahu wa la yanzuru ilayhim." }
      ]
    },
    {
      slug: "twisting-tongues",
      title: "Twisting the Book",
      line: "Some twist the Book with their tongues and call it Allah's.",
      facts: ["They know it is a lie", "Lying about Allah"],
      quote: q3(78),
      source: ik(78, "A party of them twist the Book with their tongues so you think it is from the Book when it is not, and they say it is from Allah when it is not; they tell a lie about Allah knowingly. They change the words and alter their meanings.", "distort the Book with their tongues"),
      difficulty: 4,
      questions: [
        { q: "What did some do with their tongues, in 3:78?", a: "Twisted the Book", wrong: ["Recited it well", "Taught it truly", "Kept silent"], why: "Yalwuna alsinatahum bil-kitab." },
        { q: "Did they know they were lying, in 3:78?", a: "Yes, they knew", wrong: ["No, by mistake", "Only a little", "Nobody knows"], why: "Wa hum ya'lamun." },
        { q: "Saying something is from Allah when it is not is a lie about Allah.", tf: true, why: "Wa yaquluna 'alallahil-kadhib." }
      ]
    },
    {
      slug: "rabbaniyyun",
      title: "Be people of the Lord",
      line: "No prophet says: worship me. He says: be devoted to your Lord.",
      facts: ["Rabbaniyyun: devoted scholars", "By teaching and studying"],
      quote: q3(79),
      source: ik(79, "It is not for a person given the Book, wisdom and prophethood to tell people: worship me instead of Allah. Rather he says: be Rabbaniyyun, people devoted to the Lord, because you teach the Book and study it. If a prophet cannot claim this, no one else can.", "it is not the right of anyone else to issue such a claim"),
      difficulty: 4,
      questions: [
        { q: "What would a prophet never say, in 3:79?", a: "Worship me instead of Allah", wrong: ["Worship Allah", "Learn the Book", "Be patient"], why: "Kunu 'ibadan li min dunillah: never." },
        { q: "What does a prophet tell people to be, in 3:79?", a: "Rabbaniyyun, devoted to the Lord", wrong: ["Rich merchants", "Kings", "Poets"], why: "Kunu rabbaniyyin." },
        { q: "How do they become Rabbaniyyun, in 3:79?", a: "By teaching and studying the Book", wrong: ["By sleeping", "By fighting", "By traveling"], why: "Bima kuntum tu'allimunal-kitaba wa bima kuntum tadrusun." }
      ]
    },
    {
      slug: "prophets-pledge",
      title: "The prophets' pledge",
      line: "Every prophet pledged to believe in the last Messenger ﷺ.",
      facts: ["From Adam to Isa", "Believe in him and help him"],
      quote: q3(81),
      source: ik(81, "Allah took a pledge from every prophet He sent, from Adam to Isa, that if a Messenger came after them confirming what they had, they would believe in him and support him. They said: we agree. Allah said: then bear witness, and I am with you among the witnesses.", "Allah states that He took a pledge from every Prophet whom He sent from Adam until"),
      difficulty: 4,
      questions: [
        { q: "From whom did Allah take a pledge, in 3:81?", a: "From every prophet", wrong: ["From the angels only", "From kings", "From the jinn"], why: "Mithaq an-nabiyyin." },
        { q: "What did the prophets pledge to do for the coming Messenger?", a: "Believe in him and help him", wrong: ["Fight him", "Ignore him", "Test him"], why: "La-tu'minunna bihi wa la-tansurunnah." },
        { q: "What did the prophets answer, in 3:81?", a: "We agree", wrong: ["We refuse", "Let us think", "Ask later"], why: "Qalu aqrarna." }
      ]
    },
    {
      slug: "all-submit",
      title: "All creation submits",
      line: "All in the heavens and earth submit to Allah, willing or not.",
      facts: ["No difference among the prophets", "Islam is the only accepted deen"],
      quote: q3(85),
      source: ik(85, "All creation in the heavens and earth submits to Allah, willingly or unwillingly. Say: we believe in Allah and what was sent to Ibrahim, Isma'il, Ishaq, Ya'qub, Musa, Isa and the prophets. Whoever seeks a religion other than Islam, it will never be accepted from him.", "And whoever seeks a religion other than Islam, it will never be accepted of him"),
      difficulty: 4,
      questions: [
        { q: "Who submits to Allah, in 3:83?", a: "All in the heavens and earth", wrong: ["Only people", "Only angels", "Only animals"], why: "Wa lahu aslama man fis-samawati wal-ard." },
        { q: "What religion does Allah accept, in 3:85?", a: "Islam", wrong: ["Any religion", "None", "The religion of your parents"], why: "Wa man yabtaghi ghayral-islami dinan fa-lan yuqbala minh." },
        { q: "Do believers pick some prophets and reject others, in 3:84?", a: "No, they believe in all of them", wrong: ["Yes, only a few", "Only the Arab ones", "Only the first one"], why: "La nufarriqu bayna ahadin minhum." }
      ]
    },
    {
      slug: "door-of-return",
      title: "The door back is open",
      line: "One who left the faith can return by repenting and doing good.",
      facts: ["An Ansari man came back", "Allah is Forgiving"],
      quote: q3(89),
      source: ik(89, "Ibn Abbas said: a man of the Ansar became Muslim, then left and joined the idolaters, then regretted it and sent to ask if he could repent. Allah revealed these ayahs, ending: except those who repent after that and do good, and he came back to Islam.", "Except for those who repent after that and do righteous deeds"),
      difficulty: 4,
      questions: [
        { q: "Who can still be forgiven, in 3:89?", a: "Those who repent and do good", wrong: ["Nobody", "Only the rich", "Only angels"], why: "Illal-ladhina tabu min ba'di dhalika wa aslahu." },
        { q: "What did the Ansari man in the story do after regretting?", a: "Came back to Islam", wrong: ["Moved to Rome", "Stayed away", "Became a poet"], why: "His people sent word and he re-embraced Islam." },
        { q: "Repentance is closed once someone leaves the faith.", tf: false, why: "Allah is Oft-Forgiving, Most Merciful." }
      ]
    },
    {
      slug: "earth-of-gold",
      title: "An earth full of gold",
      line: "Dying in disbelief? Not even an earth of gold buys safety.",
      facts: ["Repent before death", "No ransom then"],
      quote: q3(91),
      source: ik(91, "Allah warns those who keep disbelieving until death: repentance at death will not be accepted, and on the Day of Resurrection even the whole earth full of gold would not be accepted as ransom from any of them.", "the (whole) earth full of gold will not be accepted from anyone of them if they offered it as a ransom"),
      difficulty: 4,
      questions: [
        { q: "What could not ransom them, in 3:91?", a: "The whole earth full of gold", wrong: ["A small coin", "A prayer", "A good deed"], why: "Mil'ul-ardi dhahaba." },
        { q: "When must a person repent, Ibn Kathir says?", a: "Before death comes", wrong: ["After death", "Only in old age", "Never"], why: "Repentance at death is not accepted." },
        { q: "Wealth can buy safety on the Day of Resurrection.", tf: false, why: "Not even an earth full of gold." }
      ]
    },
    {
      slug: "what-you-love",
      title: "Give what you love",
      line: "You will not reach true goodness until you give what you love.",
      facts: ["Al-birr: true goodness", "Allah knows what you give"],
      quote: q3(92),
      source: ik(92, "You will not attain al-birr, true goodness, until you spend from what you love. Amr ibn Maymun said al-birr here means Paradise. Whatever good you spend, Allah knows it.", "By no means shall you attain Al-Birr) is in reference to attaining Paradise"),
      difficulty: 4,
      questions: [
        { q: "How do you reach al-birr, in 3:92?", a: "By giving from what you love", wrong: ["By giving what you dislike", "By keeping everything", "By giving once"], why: "Hatta tunfiqu mimma tuhibbun." },
        { q: "Amr ibn Maymun said al-birr in 3:92 means...", a: "Paradise", wrong: ["Gold", "A city", "A river"], why: "Ibn Kathir reports it." },
        { q: "Who knows whatever you give, in 3:92?", a: "Allah", wrong: ["Only you", "Your friends", "Nobody"], why: "Fa-innallaha bihi 'alim." }
      ]
    },
    {
      slug: "bayruha",
      title: "Abu Talhah's garden",
      line: "Abu Talhah gave his most loved garden as soon as 3:92 came.",
      facts: ["Sahih al-Bukhari 4554", "Bayruha, facing the masjid"],
      quote: q3(92),
      source: hadith("bukhari", "4554", "Anas ibn Malik", "Sahih", "Abu Talhah's most loved property was the garden of Bayruha opposite the masjid, where the Prophet ﷺ drank its good water. When 3:92 came, he gave it in charity for Allah, and the Prophet ﷺ advised him to give it to his relatives.", "Bairuha garden which was standing opposite the Mosque"),
      difficulty: 4,
      questions: [
        { q: "What did Abu Talhah give when 3:92 came?", a: "His most loved garden", wrong: ["A few dates", "An old camel", "Nothing"], why: "Bayruha was the most beloved of his property." },
        { q: "Where did the Prophet ﷺ tell him to give it?", a: "To his relatives", wrong: ["To a king", "To the army", "To strangers only"], why: "Sahih al-Bukhari 4554." },
        { q: "Abu Talhah obeyed 3:92 right away.", tf: true, why: "He stood up and gave it at once." }
      ]
    },
    {
      slug: "first-house",
      title: "The first House",
      line: "The first House set up for people is the Ka'bah in Makkah.",
      facts: ["Sahih al-Bukhari 3366", "Then al-Aqsa, 40 years later"],
      quote: q3(96),
      source: hadith("bukhari", "3366", "Abu Dharr", "Sahih", "I asked: which masjid was built first on earth? He ﷺ said: al-Masjid al-Haram. I asked: then which? He said: al-Masjid al-Aqsa. I asked how long between them. He said: forty years.", "Which mosque was first built on the surface of the earth"),
      difficulty: 4,
      questions: [
        { q: "What is the first House for people, in 3:96?", a: "The Ka'bah in Makkah", wrong: ["Al-Aqsa", "The Prophet's ﷺ masjid", "A house in Egypt"], why: "Lalladhi bi-Bakkata mubaraka." },
        { q: "Which masjid was built second, in Bukhari 3366?", a: "Al-Aqsa", wrong: ["Quba", "Al-Haram", "Masjid an-Nabawi"], why: "Then al-Masjid al-Aqsa." },
        { q: "How long between the two, in Bukhari 3366?", a: "Forty years", wrong: ["Four years", "Four hundred years", "One year"], why: "He ﷺ said: forty years." }
      ]
    },
    {
      slug: "hajj-duty",
      title: "Hajj for those who can",
      line: "Hajj is due from everyone able to make the journey.",
      facts: ["Maqam Ibrahim", "Whoever enters is safe"],
      quote: q3(97),
      source: ik(97, "In it are clear signs, such as the Station of Ibrahim, and whoever enters it is safe. Hajj to the House is a duty people owe to Allah, for whoever is able to find a way there. Allah has no need of anyone.", "And Hajj to the House is a duty that mankind owes to Allah"),
      difficulty: 4,
      questions: [
        { q: "Who must perform Hajj, in 3:97?", a: "Whoever is able to make the journey", wrong: ["Every child", "Only Arabs", "Only the rich in Makkah"], why: "Manistata'a ilayhi sabila." },
        { q: "Which sign in the Ka'bah's area does 3:97 name?", a: "The Station of Ibrahim", wrong: ["The cave of Hira", "Mount Uhud", "The well of Yusuf"], why: "Maqamu Ibrahim." },
        { q: "What does 3:97 say about whoever enters it?", a: "He is safe", wrong: ["He must pay", "He must leave", "He is a king"], why: "Wa man dakhalahu kana amina." }
      ]
    },
    {
      slug: "blocking-the-path",
      title: "Blocking the path",
      line: "Why turn people from Allah's path, when Allah sees what you do?",
      facts: ["Allah is Witness", "They knew the truth"],
      quote: q3(99),
      source: ik(99, "Allah criticizes those of the People of the Book who rejected His signs and blocked those who wanted to believe from His path, though they knew from their own prophets that the Messenger ﷺ brought the truth. Allah is Witness to what they do.", "hindering those who seek to believe from His path"),
      difficulty: 4,
      questions: [
        { q: "What does 3:99 blame them for?", a: "Turning believers from Allah's path", wrong: ["Building houses", "Studying", "Trading fairly"], why: "Lima tasudduna 'an sabilillah." },
        { q: "Is Allah unaware of what they do, in 3:99?", a: "No, He is not unaware", wrong: ["Yes", "Sometimes", "Only at night"], why: "Wa mallahu bi-ghafilin 'amma ta'malun." },
        { q: "They blocked the path though they knew the truth.", tf: true, why: "They learned it from their own prophets." }
      ]
    },
    {
      slug: "messenger-among-you",
      title: "With the Messenger ﷺ among you",
      line: "How disbelieve, with the ayahs recited and the Prophet ﷺ here?",
      facts: ["Hold fast to Allah", "Then you are guided"],
      quote: q3(101),
      source: ik(101, "How could you disbelieve while the ayahs of Allah are recited to you and His Messenger ﷺ is among you? Disbelief is far from you, since revelation came down to him day and night. Whoever holds fast to Allah is guided to a straight path.", "And how would you disbelieve, while unto you are recited the verses of Allah, and among you is His Messenger"),
      difficulty: 4,
      questions: [
        { q: "What was among the believers, in 3:101?", a: "Allah's Messenger ﷺ", wrong: ["A king", "An angel in a body", "A treasure"], why: "Wa fikum rasuluh." },
        { q: "Who is guided to a straight path, in 3:101?", a: "Whoever holds fast to Allah", wrong: ["Whoever is rich", "Whoever is famous", "Whoever travels"], why: "Wa man ya'tasim billahi fa-qad hudiya." },
        { q: "What was recited to the believers, in 3:101?", a: "The ayahs of Allah", wrong: ["Poems", "Old stories", "Market prices"], why: "Tutla 'alaykum ayatullah." }
      ]
    },
    {
      slug: "true-taqwa",
      title: "Taqwa as it should be",
      line: "Fear Allah as He should be feared, and die only as Muslims.",
      facts: ["Obeyed, not disobeyed", "Remembered, not forgotten"],
      quote: q3(102),
      source: ik(102, "Abdullah ibn Mas'ud explained: have taqwa of Allah as is His due means that He is obeyed and not defied, remembered and not forgotten, thanked and not unthanked. And die not except as Muslims.", "That He is obeyed and not defied, remembered and not forgotten"),
      difficulty: 4,
      questions: [
        { q: "Ibn Mas'ud: taqwa as Allah deserves means He is...", a: "Obeyed, remembered and thanked", wrong: ["Feared only in Ramadan", "Thought of once a week", "Left to scholars"], why: "Obeyed and not defied, remembered and not forgotten." },
        { q: "How should a believer die, in 3:102?", a: "As a Muslim", wrong: ["Rich", "Famous", "Far from home"], why: "Wa la tamutunna illa wa antum muslimun." },
        { q: "Who explained 'taqwa as is His due' this way?", a: "Abdullah ibn Mas'ud", wrong: ["Abu Jahl", "Heraclius", "Abu Talhah"], why: "Ibn Kathir reports it with an authentic chain." }
      ]
    },
    {
      slug: "rope-of-allah",
      title: "Hold Allah's rope",
      line: "Hold fast to Allah's rope together, and do not split apart.",
      facts: ["Sahih Muslim 1715", "Enemies became brothers"],
      quote: q3(103),
      source: hadith("muslim", "1715a", "Abu Hurayrah", "Sahih", "The Messenger of Allah ﷺ said: Allah is pleased with three things for you: that you worship Him and join nothing with Him, that you hold fast to Allah's rope all together, and that you do not split apart.", "that you hold fast the rope of Allah, and be not scattered"),
      difficulty: 4,
      questions: [
        { q: "What does 3:103 command all together?", a: "Hold fast to Allah's rope", wrong: ["Build a wall", "Leave the city", "Choose a king"], why: "Wa'tasimu bi-hablillahi jami'a." },
        { q: "What did Allah's favor turn enemies into, in 3:103?", a: "Brothers", wrong: ["Strangers", "Kings", "Rivals"], why: "Fa-asbahtum bi-ni'matihi ikhwana." },
        { q: "Which is one of the three things Allah is pleased with, in Muslim 1715?", a: "That you do not split apart", wrong: ["That you ask many questions", "That you waste wealth", "That you gossip"], why: "Hold fast the rope of Allah and be not scattered." }
      ]
    },
    {
      slug: "a-group-calling",
      title: "A group that calls to good",
      line: "Let there be a group calling to good and stopping wrong.",
      facts: ["Al-ma'ruf: the right", "Al-munkar: the wrong"],
      quote: q3(104),
      source: ik(104, "Let there arise from you a group calling to all that is good, commanding what is right and forbidding what is wrong, in the way Allah commanded; they are the successful. Do not be like those who split and differed after clear proofs came.", "Let there arise out of you a group of people"),
      difficulty: 4,
      questions: [
        { q: "What does the group in 3:104 call to?", a: "All that is good", wrong: ["Wealth", "Fame", "Fighting"], why: "Yad'una ilal-khayr." },
        { q: "'Al-munkar' means...", a: "What is wrong", wrong: ["What is right", "A market", "A judge"], why: "They forbid al-munkar." },
        { q: "Who are the successful, in 3:104?", a: "Those who call to good and stop wrong", wrong: ["Those who stay quiet", "Those who argue", "Those who split"], why: "Wa ula'ika humul-muflihun." }
      ]
    },
    {
      slug: "change-it",
      title: "Change it with your hand",
      line: "See a wrong? Change it by hand, then tongue, then heart.",
      facts: ["Sahih Muslim 49", "The heart: the weakest faith"],
      quote: q3(104),
      source: hadith("muslim", "49a", "Abu Sa'id al-Khudri", "Sahih", "The Messenger of Allah ﷺ said: whoever of you sees a wrong, let him change it with his hand; if he cannot, then with his tongue; if he cannot, then with his heart, and that is the weakest faith.", "should modify it with the help of his hand"),
      difficulty: 4,
      questions: [
        { q: "What is the first way to change a wrong, in Muslim 49?", a: "With your hand", wrong: ["With your money", "With silence", "With a crowd"], why: "Let him change it with his hand." },
        { q: "What comes after the hand, if you cannot?", a: "The tongue", wrong: ["The feet", "Nothing", "A letter"], why: "Then with his tongue." },
        { q: "What is the weakest faith, in Muslim 49?", a: "Hating it in the heart", wrong: ["Speaking against it", "Stopping it", "Writing about it"], why: "That is the weakest of faith." }
      ]
    },
    {
      slug: "bright-faces",
      title: "Bright faces",
      line: "On that Day some faces will shine; they live in Allah's mercy.",
      facts: ["Faces bright and dark", "Allah wants no injustice"],
      quote: q3(107),
      source: ik(107, "On the Day of Resurrection some faces will become bright and some dark. Those whose faces are bright will be in Allah's mercy, Paradise, forever. These are the ayahs of Allah, and Allah wills no injustice to anyone.", "And for those whose faces will become white, they will be in Allah"),
      difficulty: 4,
      questions: [
        { q: "Where will the bright faces be, in 3:107?", a: "In Allah's mercy", wrong: ["In the market", "In a desert", "Nowhere"], why: "Fa-fi rahmatillah." },
        { q: "How long will they stay there?", a: "Forever", wrong: ["One year", "One day", "Until they leave"], why: "Hum fiha khalidun." },
        { q: "Does Allah want any injustice, in 3:108?", a: "No", wrong: ["Yes", "Sometimes", "Only to some"], why: "Wa mallahu yuridu zulman lil-'alamin." }
      ]
    },
    {
      slug: "best-nation",
      title: "The best nation",
      line: "The best nation for people: you call to good and stop wrong.",
      facts: ["Command good, forbid wrong", "Believe in Allah"],
      quote: q3(110),
      source: ik(110, "Allah states that the Ummah of Muhammad ﷺ is the best nation, because they command what is right, forbid what is wrong, and believe in Allah. Whoever has these qualities shares in this praise.", "Allah states that the Ummah of Muhammad ﷺ is the best nation ever"),
      difficulty: 4,
      questions: [
        { q: "Why is this Ummah the best nation, in 3:110?", a: "It commands good, forbids wrong and believes", wrong: ["It is the richest", "It is the biggest", "It is the oldest"], why: "Ta'muruna bil-ma'rufi wa tanhawna 'anil-munkar." },
        { q: "Whom was this nation brought out for?", a: "For people", wrong: ["For itself only", "For angels", "For nobody"], why: "Ukhrijat lin-nas." },
        { q: "Being born Muslim is enough to share this praise, with no deeds.", tf: false, why: "It is earned by these qualities." }
      ]
    },
    {
      slug: "not-all-alike",
      title: "Not all alike",
      line: "People of the Book are not all alike; some pray at night.",
      facts: ["Like Abdullah ibn Salam", "No good deed is lost"],
      quote: q3(113),
      source: ik(113, "These ayahs were revealed about the scholars of the People of the Book who believed, such as Abdullah ibn Salam. They recite Allah's ayahs in the night, prostrate, believe in Allah and the Last Day, call to good and hurry to good deeds.", "These Ayat were revealed about the clergy of the People of the Scriptures who embraced the faith"),
      difficulty: 4,
      questions: [
        { q: "Are all People of the Book the same, in 3:113?", a: "No", wrong: ["Yes", "Only the rich", "Nobody knows"], why: "Laysu sawa'." },
        { q: "Which Companion does Ibn Kathir name for 3:113?", a: "Abdullah ibn Salam", wrong: ["Abu Jahl", "Khalid ibn al-Walid", "Bilal"], why: "A rabbi of Madinah who became Muslim." },
        { q: "What happens to the good they do, in 3:115?", a: "It is never rejected", wrong: ["It is lost", "It is halved", "It is forgotten"], why: "Wa ma yaf'alu min khayrin fa-lan yukfaruh." }
      ]
    },
    {
      slug: "frozen-wind",
      title: "A freezing wind",
      line: "Spending without faith is like a frost that ruins a harvest.",
      facts: ["Sir: a freezing wind", "They wronged themselves"],
      quote: q3(117),
      source: ik(117, "What disbelievers spend in this world is like a wind of bitter frost that strikes the harvest of people who wronged themselves and destroys it. Allah did not wrong them; they wronged themselves.", "Allah wronged them not, but they wronged themselves"),
      difficulty: 4,
      questions: [
        { q: "What is their spending compared to, in 3:117?", a: "A harvest hit by frost", wrong: ["A growing tree", "A river", "A full well"], why: "Ka-mathali rihin fiha sirr." },
        { q: "Who wronged them, in 3:117?", a: "They wronged themselves", wrong: ["Allah", "Their neighbors", "The weather alone"], why: "Wa ma zalamahumullahu wa lakin anfusahum yazlimun." },
        { q: "'Sirr' in 3:117 is...", a: "A freezing wind", wrong: ["A secret", "A seed", "A song"], why: "A bitter, freezing cold." }
      ]
    },
    {
      slug: "patience-shield",
      title: "Patience is a shield",
      line: "Be patient and mindful, and their plots will not harm you.",
      facts: ["Bitanah: close advisors", "Allah surrounds what they do"],
      quote: q3(120),
      source: ik(120, "Do not take as close advisors those who want to harm you. If good comes to you it grieves them, and if harm comes they rejoice. But if you are patient and have taqwa, their plotting will not harm you at all; Allah surrounds what they do.", "But if you remain patient and have Taqwa, not the least harm will their cunning do to you"),
      difficulty: 4,
      questions: [
        { q: "What protects the believers from plots, in 3:120?", a: "Patience and taqwa", wrong: ["Gold", "Walls", "Spies"], why: "Wa in tasbiru wa tattaqu la yadurrukum kayduhum shay'a." },
        { q: "'Bitanah' in 3:118 means...", a: "Close advisors", wrong: ["A coat", "A city", "A camel"], why: "Those let into your secrets." },
        { q: "What does Allah do with all they do, in 3:120?", a: "He surrounds it", wrong: ["He forgets it", "He ignores it", "He fears it"], why: "Innallaha bima ya'maluna muhit." }
      ]
    }
  ]
};

/** Ayahs 121 to 200: Uhud and its lessons, riba, the pious who control anger, death and the Hereafter, the closing duas. */
const IMRAN_THREE: DeepUnit = {
  key: "imran3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-ali-imran",
  name: "Ali 'Imran, ayahs 121 to 200",
  kind: "skill",
  lessonType: "surah",
  surahName: "Ali 'Imran",
  lessons: [
    {
      slug: "uhud",
      title: "The morning of Uhud",
      line: "The Prophet ﷺ left home at dawn to place the believers at Uhud.",
      facts: ["Shawwal, 3 AH", "A Saturday"],
      quote: q3(121),
      source: ik(121, "Most scholars say these ayahs describe the battle of Uhud, which happened on a Saturday in Shawwal in the third year after the Hijrah.", "The battle of Uhud occurred on a Saturday, in the month of Shawwal on the third year of Hijrah"),
      difficulty: 4,
      questions: [
        { q: "Which battle do ayahs 121 onward of Ali 'Imran describe?", a: "Uhud", wrong: ["Badr", "Khaybar", "Tabuk"], why: "Most scholars say Uhud." },
        { q: "In which year after the Hijrah was Uhud?", a: "The third", wrong: ["The first", "The fifth", "The tenth"], why: "Shawwal, in the third year." },
        { q: "Uhud happened on a Friday.", tf: false, why: "Ibn Kathir: on a Saturday." }
      ]
    },
    {
      slug: "two-parties",
      title: "Two groups almost lost heart",
      line: "Two groups nearly lost heart, but Allah was their Protector.",
      facts: ["Sahih al-Bukhari 4558", "Banu Harithah, Banu Salimah"],
      quote: q3(122),
      source: hadith("bukhari", "4558", "Jabir ibn Abdullah", "Sahih", "Jabir said 3:122 was revealed about us, the two groups Banu Harithah and Banu Salimah. We would not wish it had not come, because Allah says: Allah was their Protector.", "and we were the two parties"),
      difficulty: 4,
      questions: [
        { q: "Who were the two groups in 3:122, per Jabir?", a: "Banu Harithah and Banu Salimah", wrong: ["Quraysh and Thaqif", "Aws and Khazraj chiefs", "The Romans and Persians"], why: "Sahih al-Bukhari 4558." },
        { q: "Why was Jabir glad 3:122 came down?", a: "It says Allah was their Protector", wrong: ["It praised their wealth", "It named their poets", "It ended the war"], why: "Wallahu waliyyuhuma." },
        { q: "In whom should believers trust, in 3:122?", a: "Allah", wrong: ["Their numbers", "Their weapons", "Their walls"], why: "Wa 'alallahi fal-yatawakkalil-mu'minun." }
      ]
    },
    {
      slug: "weak-at-badr",
      title: "Few and weak at Badr",
      line: "Allah gave you victory at Badr when you were few and weak.",
      facts: ["Be grateful", "Help with angels"],
      quote: q3(123),
      source: ik(123, "Allah reminded the believers that He had already given them victory at Badr when they were a small, weak force, so they should have taqwa of Him and be grateful.", "And Allah has already made you victorious at Badr, when you were a weak little force"),
      difficulty: 4,
      questions: [
        { q: "How were the Muslims at Badr, in 3:123?", a: "Few and weak", wrong: ["Many and rich", "Strong with horses", "In a fortress"], why: "Wa antum adhillah." },
        { q: "What does 3:123 tell them to be?", a: "Grateful", wrong: ["Proud", "Afraid", "Silent"], why: "La'allakum tashkurun." },
        { q: "How many angels did Allah promise first, in 3:124?", a: "Three thousand", wrong: ["Three hundred", "Ten", "One million"], why: "Bi-thalathati alafin minal-mala'ikah." }
      ]
    },
    {
      slug: "victory-from-allah",
      title: "Victory is only from Allah",
      line: "The angels were good news; victory comes only from Allah.",
      facts: ["Five thousand if patient", "To calm your hearts"],
      quote: q3(126),
      source: ik(126, "If you are patient and have taqwa, your Lord will help you with five thousand marked angels. Allah made this only as good news and to calm your hearts; there is no victory except from Allah, the Mighty, the Wise.", "And there is no victory except from Allah, the All-Mighty, the All-Wise"),
      difficulty: 4,
      questions: [
        { q: "Where does victory come from, in 3:126?", a: "Only from Allah", wrong: ["From numbers", "From weapons", "From luck"], why: "Wa man-nasru illa min 'indillah." },
        { q: "How many angels if they stayed patient, in 3:125?", a: "Five thousand", wrong: ["Fifty", "Five hundred", "Fifty thousand"], why: "Bi-khamsati alafin minal-mala'ikah." },
        { q: "Why did Allah tell them about the angels, in 3:126?", a: "As good news to calm their hearts", wrong: ["To make them lazy", "To scare them", "To test the angels"], why: "Illa bushra lakum wa li-tatma'inna qulubukum." }
      ]
    },
    {
      slug: "not-for-you",
      title: "The matter is Allah's",
      line: "The final decision is not yours: Allah forgives or punishes.",
      facts: ["Sahih al-Bukhari 4559", "Allah forgives whom He wills"],
      quote: q3(128),
      source: hadith("bukhari", "4559", "Abdullah ibn Umar", "Sahih", "After Uhud the Prophet ﷺ prayed in Fajr against some leaders of the enemy, and Allah revealed 3:128: not for you is the decision; He may turn to them in mercy. Several of them later became Muslims.", "O Allah, curse such-and-such person"),
      difficulty: 4,
      questions: [
        { q: "Whose is the final decision about people, in 3:128?", a: "Allah's", wrong: ["The army's", "The people's", "The poets'"], why: "Laysa laka minal-amri shay'." },
        { q: "What might Allah do with them, in 3:128?", a: "Turn to them in mercy", wrong: ["Forget them", "Make them kings", "Nothing at all"], why: "Aw yatuba 'alayhim." },
        { q: "To whom does all in the heavens and earth belong, in 3:129?", a: "Allah", wrong: ["The strongest", "The richest", "Nobody"], why: "Wa lillahi ma fis-samawati wa ma fil-ard." }
      ]
    },
    {
      slug: "no-riba",
      title: "No riba",
      line: "Do not eat riba, doubled and multiplied; fear Allah.",
      facts: ["Riba: interest", "Obey to be shown mercy"],
      quote: q3(130),
      source: ik(130, "Allah forbids His believing servants from dealing in riba and eating it doubled and multiplied, as people did before Islam, adding more and more to a debt. Fear Allah so that you succeed, and obey Allah and the Messenger ﷺ to be shown mercy.", "Do not consume Riba doubled and multiplied"),
      difficulty: 4,
      questions: [
        { q: "What does 3:130 forbid?", a: "Riba, doubled and multiplied", wrong: ["Trade", "Charity", "Farming"], why: "La ta'kulur-riba ad'afan muda'afa." },
        { q: "'Riba' means...", a: "Interest on a loan", wrong: ["A gift", "A prayer", "Rent"], why: "Adding more to a debt over time." },
        { q: "Why obey Allah and the Messenger ﷺ, in 3:132?", a: "To be shown mercy", wrong: ["To get rich", "To be famous", "To win arguments"], why: "La'allakum turhamun." }
      ]
    },
    {
      slug: "wide-paradise",
      title: "A Paradise as wide as the heavens",
      line: "Hurry to forgiveness and a Paradise as wide as heaven and earth.",
      facts: ["Prepared for the mindful", "Hurry, don't wait"],
      quote: q3(133),
      source: ik(133, "Allah urges hurrying to good deeds to earn forgiveness from your Lord and a Paradise as wide as the heavens and the earth, prepared for the people of taqwa.", "Paradise as wide as the heavens and the earth"),
      difficulty: 4,
      questions: [
        { q: "How wide is Paradise, in 3:133?", a: "As wide as the heavens and earth", wrong: ["As wide as a city", "As wide as a field", "As wide as a sea"], why: "'Arduhas-samawatu wal-ard." },
        { q: "What should we hurry to, in 3:133?", a: "Forgiveness from our Lord", wrong: ["The market", "Sleep", "Games"], why: "Wa sari'u ila maghfiratin min rabbikum." },
        { q: "For whom is Paradise prepared, in 3:133?", a: "The mindful (muttaqin)", wrong: ["The famous", "The lucky", "The loud"], why: "U'iddat lil-muttaqin." }
      ]
    },
    {
      slug: "swallow-anger",
      title: "Swallowing anger",
      line: "They give in ease and hardship, hold in anger, and forgive.",
      facts: ["Sahih al-Bukhari 6114", "Allah loves the doers of good"],
      quote: q3(134),
      source: hadith("bukhari", "6114", "Abu Hurayrah", "Sahih", "The Messenger of Allah ﷺ said: the strong one is not the one who beats people in wrestling; the strong one is he who controls himself when angry.", "the strong is the one who controls himself while in anger"),
      difficulty: 4,
      questions: [
        { q: "Who is truly strong, in Bukhari 6114?", a: "One who controls himself when angry", wrong: ["One who wins every fight", "One who shouts loudest", "One who lifts the most"], why: "Sahih al-Bukhari 6114." },
        { q: "What do the pious do with anger, in 3:134?", a: "Hold it in", wrong: ["Let it all out", "Spread it", "Save it for later"], why: "Wal-kazimin al-ghayz." },
        { q: "Whom does Allah love, in 3:134?", a: "The doers of good", wrong: ["The quick-tempered", "The rich", "The proud"], why: "Wallahu yuhibbul-muhsinin." }
      ]
    },
    {
      slug: "after-a-sin",
      title: "After a sin",
      line: "When they sin, they remember Allah and ask Him to forgive them.",
      facts: ["Jami at-Tirmidhi 406", "Wudu, prayer, forgiveness"],
      quote: q3(135),
      source: hadith("tirmidhi", "406", "Abu Bakr as-Siddiq", "Hasan", "Abu Bakr said: I heard the Messenger of Allah ﷺ say: no man commits a sin, then makes wudu, prays, and asks Allah's forgiveness, except that Allah forgives him. Then he recited 3:135.", "There is no man who commits a sin, then makes Wudu, then performs Salat, then seeks forgiveness from Allah, except that Allah forgives him"),
      difficulty: 5,
      questions: [
        { q: "What do the pious do after a sin, in 3:135?", a: "Remember Allah and seek forgiveness", wrong: ["Hide it forever", "Blame others", "Give up"], why: "Dhakarullaha fastaghfaru li-dhunubihim." },
        { q: "Who forgives sins, in 3:135?", a: "Only Allah", wrong: ["Any scholar", "A priest", "Nobody"], why: "Wa man yaghfirudh-dhunuba illallah." },
        { q: "In Tirmidhi 406, what comes before asking forgiveness?", a: "Wudu and prayer", wrong: ["A feast", "A long trip", "Paying a fine"], why: "He makes wudu, then prays." }
      ]
    },
    {
      slug: "days-in-turns",
      title: "Days take turns",
      line: "Do not lose heart or grieve; Allah makes the days take turns.",
      facts: ["You will be uppermost", "A test of faith"],
      quote: q3(139),
      source: ik(139, "Do not weaken or grieve over Uhud; you will be uppermost if you are believers. If a wound touched you, a like wound touched the others. These are the days Allah gives to people in turns, to test those who believe.", "And so are the days, that We give to men by turns"),
      difficulty: 5,
      questions: [
        { q: "What does 3:139 tell the believers after Uhud?", a: "Don't lose heart or grieve", wrong: ["Give up", "Go home", "Blame the Prophet ﷺ"], why: "Wa la tahinu wa la tahzanu." },
        { q: "What does Allah do with the days, in 3:140?", a: "Gives them to people in turns", wrong: ["Stops them", "Gives all to one side", "Makes them equal"], why: "Wa tilkal-ayyamu nudawiluha baynan-nas." },
        { q: "One loss means Allah has left the believers.", tf: false, why: "Hard days are a test, and they take turns." }
      ]
    },
    {
      slug: "only-a-messenger",
      title: "Muhammad ﷺ is a messenger",
      line: "Muhammad ﷺ is a messenger; messengers died before him too.",
      facts: ["Sahih al-Bukhari 3668", "Abu Bakr recited 3:144"],
      quote: q3(144),
      source: hadith("bukhari", "3668", "Aishah", "Sahih", "When the Messenger of Allah ﷺ died, Abu Bakr said: whoever worshipped Muhammad, Muhammad has died; whoever worshipped Allah, Allah is Ever-Living and never dies. Then he recited 3:144.", "Whoever worshipped Muhammad, then Muhammad is dead, but whoever worshipped Allah, then Allah is Alive and shall never die"),
      difficulty: 5,
      questions: [
        { q: "What does 3:144 say Muhammad ﷺ is?", a: "A messenger, like those before him", wrong: ["A god", "An angel", "A king who never dies"], why: "Wa ma Muhammadun illa rasul." },
        { q: "Who recited 3:144 when the Prophet ﷺ died?", a: "Abu Bakr", wrong: ["Umar", "Ali", "Uthman"], why: "Sahih al-Bukhari 3668." },
        { q: "Who never dies, as Abu Bakr said?", a: "Allah", wrong: ["Any prophet", "The angels", "The caliph"], why: "Allah is Alive and shall never die." }
      ]
    },
    {
      slug: "appointed-term",
      title: "Each soul has its term",
      line: "No soul dies except by Allah's leave, at a written time.",
      facts: ["Kitaban mu'ajjala", "Reward of the grateful"],
      quote: q3(145),
      source: ik(145, "No person can die except by Allah's leave, at a term written down. Whoever wants the reward of this world, Allah gives him some of it; whoever wants the reward of the Hereafter, Allah gives him of it, and Allah rewards the grateful.", "And no person can ever die except by Allah"),
      difficulty: 5,
      questions: [
        { q: "When does a soul die, in 3:145?", a: "At a time Allah has written", wrong: ["Whenever luck says", "Only when old", "Never"], why: "Kitaban mu'ajjala." },
        { q: "Whom will Allah reward, in 3:145?", a: "The grateful", wrong: ["The boastful", "The lazy", "The angry"], why: "Wa sanajzish-shakirin." },
        { q: "What can a person aim for, in 3:145?", a: "This world or the Hereafter", wrong: ["Only gold", "Nothing at all", "Only fame"], why: "Thawabad-dunya or thawabal-akhirah." }
      ]
    },
    {
      slug: "ribbiyyun",
      title: "The firm followers",
      line: "Many prophets had godly followers who never lost heart.",
      facts: ["Allah loves the patient", "Their dua: firm our feet"],
      quote: q3(147),
      source: ik(147, "Many a prophet fought along with many godly followers who did not weaken or give in. Their only words were: our Lord, forgive us our sins and excesses, make our feet firm and help us. Allah loves the patient.", "Our Lord! Forgive us our sins and our transgressions, establish our feet firmly"),
      difficulty: 5,
      questions: [
        { q: "What did the prophets' followers ask, in 3:147?", a: "Forgive us and make our feet firm", wrong: ["Make us rich", "Let us go home", "Make us famous"], why: "Wa thabbit aqdamana." },
        { q: "Whom does Allah love, in 3:146?", a: "The patient", wrong: ["The boastful", "The fearful", "The lazy"], why: "Wallahu yuhibbus-sabirin." },
        { q: "What did Allah give them, in 3:148?", a: "Reward in this world and the next", wrong: ["Nothing", "Only gold", "Only a long life"], why: "Thawabad-dunya wa husna thawabil-akhirah." }
      ]
    },
    {
      slug: "the-archers",
      title: "The archers on the hill",
      line: "At Uhud, the archers left their post, and the battle turned.",
      facts: ["Sahih al-Bukhari 4561", "Abdullah ibn Jubayr led them"],
      quote: q3(153),
      source: hadith("bukhari", "4561", "Al-Bara ibn Azib", "Sahih", "The Prophet ﷺ put Abdullah ibn Jubayr in charge of the archers at Uhud. They came back defeated, as Allah says: the Messenger was calling you from behind. Only twelve men stayed with the Prophet ﷺ.", "None remained with the Prophet (ﷺ) then, but twelve men"),
      difficulty: 5,
      questions: [
        { q: "Who led the archers at Uhud?", a: "Abdullah ibn Jubayr", wrong: ["Khalid ibn al-Walid", "Abu Bakr", "Hamzah"], why: "Sahih al-Bukhari 4561." },
        { q: "How many men stayed with the Prophet ﷺ, in Bukhari 4561?", a: "Twelve", wrong: ["Two", "Three hundred", "One thousand"], why: "None remained but twelve men." },
        { q: "Why did the battle turn, in 3:152?", a: "Some disobeyed the order", wrong: ["It rained", "The enemy left", "The sun set"], why: "Wa 'asaytum min ba'di ma arakum ma tuhibbun." }
      ]
    },
    {
      slug: "he-forgave-you",
      title: "Yet He forgave you",
      line: "Allah tested them at Uhud, yet He forgave them.",
      facts: ["Some wanted this world", "Allah is gracious to believers"],
      quote: q3(152),
      source: ik(152, "Allah fulfilled His promise until they lost heart, argued about the order and disobeyed after He showed them what they loved. Some wanted this world and some the Hereafter. He turned them back to test them, but He forgave them; Allah is gracious to the believers.", "But surely, He forgave you, and Allah is Most Gracious to the believers"),
      difficulty: 5,
      questions: [
        { q: "What did Allah do after the mistake at Uhud, in 3:152?", a: "He forgave them", wrong: ["He left them", "He punished them all", "Nothing"], why: "Wa laqad 'afa 'ankum." },
        { q: "What did some of them want, in 3:152?", a: "This world", wrong: ["Only Paradise", "Rest", "Knowledge"], why: "Minkum man yuridud-dunya." },
        { q: "How is Allah toward the believers, in 3:152?", a: "Gracious", wrong: ["Careless", "Harsh", "Far"], why: "Wallahu dhu fadlin 'alal-mu'minin." }
      ]
    },
    {
      slug: "slumber",
      title: "Sleep as a calm",
      line: "After the distress, Allah sent a calm sleep over the believers.",
      facts: ["Sahih al-Bukhari 4562", "Abu Talhah's sword fell"],
      quote: q3(154),
      source: hadith("bukhari", "4562", "Abu Talhah", "Sahih", "Abu Talhah said: slumber overtook us at Uhud while we were in the front rows. My sword would fall from my hand and I would pick it up, and it would fall again.", "Slumber overtook us during the battle of Uhud"),
      difficulty: 5,
      questions: [
        { q: "What did Allah send down after the distress, in 3:154?", a: "A calm sleep", wrong: ["A storm", "An army", "A fire"], why: "Amanatan nu'asa." },
        { q: "What kept falling from Abu Talhah's hand?", a: "His sword", wrong: ["His shield", "His food", "A book"], why: "Sahih al-Bukhari 4562." },
        { q: "Whose is the whole affair, in 3:154?", a: "Allah's", wrong: ["The fighters'", "The leaders'", "Nobody's"], why: "Innal-amra kullahu lillah." }
      ]
    },
    {
      slug: "if-only",
      title: "Not 'if only'",
      line: "Do not say: had they stayed home they would not have died.",
      facts: ["Allah gives life and death", "Forgiveness is far better"],
      quote: q3(156),
      source: ik(156, "Allah forbids the believers from the false belief of those who said about people who died traveling or in battle: had they stayed with us they would not have died. It is Allah who gives life and causes death.", "Allah forbids His believing servants from the disbelievers"),
      difficulty: 5,
      questions: [
        { q: "What does 3:156 tell believers not to say?", a: "Had they stayed home, they would not have died", wrong: ["Allah is great", "Peace be upon you", "We belong to Allah"], why: "Law kanu 'indana ma matu." },
        { q: "Who gives life and death, in 3:156?", a: "Allah", wrong: ["Travel", "Doctors", "Luck"], why: "Wallahu yuhyi wa yumit." },
        { q: "What is better than all people gather, in 3:157?", a: "Forgiveness and mercy from Allah", wrong: ["More gold", "A big house", "Fame"], why: "La-maghfiratun minallahi wa rahmatun khayrun mimma yajma'un." }
      ]
    },
    {
      slug: "gentle",
      title: "Gentle by Allah's mercy",
      line: "By Allah's mercy he ﷺ was gentle; harshness drives people away.",
      facts: ["Sahih Muslim 2593", "Consult them, then trust Allah"],
      quote: q3(159),
      source: hadith("muslim", "2593", "Aishah", "Sahih", "The Messenger of Allah ﷺ said: Aishah, Allah is gentle and loves gentleness, and He gives for gentleness what He does not give for harshness or anything else.", "verily Allah is kind and He loves kindness"),
      difficulty: 5,
      questions: [
        { q: "Why was the Prophet ﷺ gentle, in 3:159?", a: "By Allah's mercy", wrong: ["Out of fear", "To get rich", "By chance"], why: "Fa-bima rahmatin minallahi linta lahum." },
        { q: "What would harshness have done, in 3:159?", a: "Driven people away", wrong: ["Made them stronger", "Made them richer", "Nothing"], why: "La-nfaddu min hawlik." },
        { q: "After consulting and deciding, what then, in 3:159?", a: "Trust in Allah", wrong: ["Change your mind", "Ask again forever", "Wait a year"], why: "Fa-idha 'azamta fa-tawakkal 'alallah." }
      ]
    },
    {
      slug: "a-messenger-from-them",
      title: "A Messenger from among them",
      line: "Allah's favor: a Messenger ﷺ sent from among the believers.",
      facts: ["He recites, purifies, teaches", "The Book and wisdom"],
      quote: q3(164),
      source: ik(164, "Allah did the believers a great favor when He sent among them a Messenger ﷺ from themselves, reciting His ayahs to them, purifying them and teaching them the Book and wisdom, though before that they were clearly astray.", "and purifying them, and instructing them (in) the Book"),
      difficulty: 5,
      questions: [
        { q: "What great favor does 3:164 name?", a: "A Messenger ﷺ from among them", wrong: ["A rich kingdom", "A big army", "A long life"], why: "Laqad mannallahu 'alal-mu'minin." },
        { q: "Which is one thing the Messenger ﷺ does, in 3:164?", a: "Teaches the Book and wisdom", wrong: ["Collects taxes only", "Writes poems", "Builds palaces"], why: "Wa yu'allimuhumul-kitaba wal-hikmah." },
        { q: "How were they before he came, in 3:164?", a: "Clearly astray", wrong: ["Perfectly guided", "Kings of the world", "Angels"], why: "Wa in kanu min qablu lafi dalalin mubin." }
      ]
    },
    {
      slug: "from-yourselves",
      title: "It came from yourselves",
      line: "When hardship hit, they asked why. Say: it came from yourselves.",
      facts: ["By Allah's leave", "To show who truly believes"],
      quote: q3(165),
      source: ik(165, "When a disaster struck you at Uhud, though you had struck the enemy twice as hard at Badr, you asked: where did this come from? Say: it is from yourselves, because you disobeyed the order. It came by Allah's leave, to test the believers and expose the hypocrites.", "It is from yourselves"),
      difficulty: 5,
      questions: [
        { q: "Where did the hardship at Uhud come from, in 3:165?", a: "From themselves", wrong: ["From bad luck", "From the stars", "From the weather"], why: "Qul huwa min 'indi anfusikum." },
        { q: "By whose leave did it happen, in 3:166?", a: "Allah's", wrong: ["The enemy's", "Nobody's", "The archers'"], why: "Fa-bi-idhnillah." },
        { q: "Whom did Uhud expose, in 3:167?", a: "The hypocrites", wrong: ["The angels", "The prophets", "The animals"], why: "Wa li-ya'lamal-ladhina nafaqu." }
      ]
    },
    {
      slug: "alive-with-their-lord",
      title: "Alive with their Lord",
      line: "Those who die in Allah's way are alive with their Lord.",
      facts: ["Sahih Muslim 1887", "They rejoice"],
      quote: q3(169),
      source: hadith("muslim", "1887", "Abdullah ibn Mas'ud", "Sahih", "Masruq asked Abdullah ibn Mas'ud about 3:169. He said: we asked the Prophet ﷺ, and he said their souls are in green birds that eat the fruits of Paradise wherever they like.", "The souls, of the martyrs live in the bodies of green birds"),
      difficulty: 5,
      questions: [
        { q: "What does 3:169 say about the martyrs?", a: "They are alive with their Lord", wrong: ["They are gone forever", "They sleep for a year", "Nobody remembers them"], why: "Bal ahya'un 'inda rabbihim yurzaqun." },
        { q: "Where are their souls, in Muslim 1887?", a: "In green birds in Paradise", wrong: ["In the stars", "In the sea", "In the graves alone"], why: "They eat the fruits of Paradise wherever they like." },
        { q: "How do they feel, in 3:170?", a: "They rejoice", wrong: ["They are sad", "They are bored", "They are afraid"], why: "Farihina bima atahumullahu min fadlih." }
      ]
    },
    {
      slug: "hasbunallah",
      title: "Allah is enough for us",
      line: "Told 'fear them', they said: Allah is enough for us.",
      facts: ["Sahih al-Bukhari 4563", "Ibrahim said it too"],
      quote: q3(173),
      source: hadith("bukhari", "4563", "Ibn Abbas", "Sahih", "Ibn Abbas said: Allah is enough for us and the best Guardian was said by Ibrahim when he was thrown into the fire, and said by Muhammad ﷺ when people told them a great army had gathered against them; it only increased their faith.", "but it only increased their faith"),
      difficulty: 5,
      questions: [
        { q: "What did the believers say when told to fear the army, in 3:173?", a: "Allah is enough for us", wrong: ["Let us run", "We give up", "Let us hide"], why: "Hasbunallahu wa ni'mal-wakil." },
        { q: "Which prophet said it when thrown into the fire, in Bukhari 4563?", a: "Ibrahim", wrong: ["Musa", "Nuh", "Yunus"], why: "Ibn Abbas: said by Ibrahim." },
        { q: "What did the threat do to their faith?", a: "Increased it", wrong: ["Ended it", "Weakened it", "Nothing"], why: "Fa-zadahum imana." }
      ]
    },
    {
      slug: "fear-only-allah",
      title: "Fear Allah alone",
      line: "Shaytan frightens you with his allies; fear Allah alone.",
      facts: ["They came back with grace", "Do not fear them"],
      quote: q3(175),
      source: ik(175, "They returned with grace and bounty from Allah, untouched by harm, following Allah's pleasure. It is only Shaytan who frightens you with his allies, so do not fear them; fear Me, if you are believers.", "So they returned with grace"),
      difficulty: 5,
      questions: [
        { q: "Who frightens people with his allies, in 3:175?", a: "Shaytan", wrong: ["The angels", "The prophets", "The scholars"], why: "Innama dhalikumush-shaytanu yukhawwifu awliya'ah." },
        { q: "Whom should believers fear, in 3:175?", a: "Allah", wrong: ["Shaytan's allies", "The dark", "Rumors"], why: "Wa khafuni in kuntum mu'minin." },
        { q: "How did they return, in 3:174?", a: "With grace and bounty, unharmed", wrong: ["Defeated", "Lost", "Hurt and poor"], why: "Lam yamsashum su'." }
      ]
    },
    {
      slug: "withheld-wealth",
      title: "Wealth held back",
      line: "Wealth kept back from zakah harms its owner on that Day.",
      facts: ["Sahih al-Bukhari 4565", "Allah inherits all"],
      quote: q3(180),
      source: hadith("bukhari", "4565", "Abu Hurayrah", "Sahih", "The Messenger of Allah ﷺ said: whoever is given wealth by Allah and does not pay its zakah, on the Day of Resurrection his wealth will come to him as a snake around his neck saying: I am your wealth, I am your treasure. Then he recited 3:180.", "I am your wealth; I am your treasure"),
      difficulty: 5,
      questions: [
        { q: "What does 3:180 say about holding back what Allah gave?", a: "It is bad for them", wrong: ["It is good for them", "It is smart", "It makes them safe"], why: "Bal huwa sharrun lahum." },
        { q: "Which duty is the hadith about?", a: "Zakah", wrong: ["Hajj", "Fasting", "Wudu"], why: "Whoever does not pay its zakah." },
        { q: "To whom does all inheritance of heaven and earth belong, in 3:180?", a: "Allah", wrong: ["The rich", "Kings", "Children"], why: "Wa lillahi mirathus-samawati wal-ard." }
      ]
    },
    {
      slug: "allah-is-not-poor",
      title: "Allah is not poor",
      line: "Allah heard those who said: Allah is poor and we are rich.",
      facts: ["Their words are written", "Allah is never unjust"],
      quote: q3(181),
      source: ik(181, "Allah heard those who mocked: Allah is poor and we are rich. Their words are recorded, along with their crimes against the prophets. That is for what their hands sent ahead, and Allah is never unjust to His servants.", "And certainly, Allah is never unjust to (His) servants"),
      difficulty: 5,
      questions: [
        { q: "What did some say, in 3:181?", a: "Allah is poor and we are rich", wrong: ["Allah is great", "We are poor", "We need Allah"], why: "Innallaha faqirun wa nahnu aghniya'." },
        { q: "What happens to their words, in 3:181?", a: "They are written down", wrong: ["They are forgotten", "They are praised", "They vanish"], why: "Sanaktubu ma qalu." },
        { q: "Is Allah ever unjust to His servants, in 3:182?", a: "Never", wrong: ["Sometimes", "Often", "Only to some"], why: "Wa annallaha laysa bi-zallamin lil-'abid." }
      ]
    },
    {
      slug: "taste-death",
      title: "Every soul tastes death",
      line: "Every soul will taste death; the real reward comes on that Day.",
      facts: ["Saved from the Fire: success", "This life: a deceiving joy"],
      quote: q3(185),
      source: ik(185, "Every soul shall taste death, and you will be paid in full only on the Day of Resurrection. Whoever is moved away from the Fire and entered into Paradise has truly succeeded; the life of this world is only an enjoyment that deceives.", "Every Soul Shall Taste Death"),
      difficulty: 5,
      questions: [
        { q: "What will every soul taste, in 3:185?", a: "Death", wrong: ["Wealth", "Fame", "Sleep only"], why: "Kullu nafsin dha'iqatul-mawt." },
        { q: "Who truly succeeds, in 3:185?", a: "One kept from the Fire and let into Paradise", wrong: ["One with most gold", "One with most friends", "One who lives longest"], why: "Fa-man zuhziha 'anin-nari wa udkhilal-jannata fa-qad faz." },
        { q: "What is this world's life, in 3:185?", a: "An enjoyment that deceives", wrong: ["The final home", "The real reward", "Forever"], why: "Mata'ul-ghurur." }
      ]
    },
    {
      slug: "tested",
      title: "You will be tested",
      line: "You will be tested in wealth and self; patience and taqwa win.",
      facts: ["Hurtful words too", "A matter of resolve"],
      quote: q3(186),
      source: ik(186, "You will surely be tested in your wealth and yourselves, and you will hear much that hurts you. But if you are patient and have taqwa, that is a matter of great resolve.", "You shall certainly be tried and tested in your wealth and properties and in yourselves"),
      difficulty: 5,
      questions: [
        { q: "In what will believers be tested, in 3:186?", a: "Their wealth and themselves", wrong: ["Only their clothes", "Only their games", "Nothing"], why: "La-tublawunna fi amwalikum wa anfusikum." },
        { q: "What is the answer to the tests, in 3:186?", a: "Patience and taqwa", wrong: ["Anger", "Running away", "Revenge"], why: "Wa in tasbiru wa tattaqu." },
        { q: "Believers will never hear hurtful words.", tf: false, why: "You will hear much that grieves you." }
      ]
    },
    {
      slug: "do-not-hide",
      title: "Do not hide the truth",
      line: "Those given the Book were told: make it clear, never hide it.",
      facts: ["Sold for a small price", "Praise for what they did not do"],
      quote: q3(187),
      source: ik(187, "Allah took a covenant from those given the Book to make it clear to people and not hide it, but they threw it behind their backs and sold it for a small price. Do not think those who love praise for what they did not do are safe.", "to make it (the truth) known and clear to mankind, and not to hide it"),
      difficulty: 5,
      questions: [
        { q: "What covenant was taken in 3:187?", a: "To make the Book clear and not hide it", wrong: ["To build a temple", "To pay a tax", "To leave the city"], why: "La-tubayyinunnahu lin-nasi wa la taktumunah." },
        { q: "What did they do with it, in 3:187?", a: "Threw it behind their backs", wrong: ["Taught it well", "Memorized it", "Wrote it in gold"], why: "Fa-nabadhuhu wara'a zuhurihim." },
        { q: "What do some love, in 3:188?", a: "Praise for what they did not do", wrong: ["Hard work", "Hiding good deeds", "Charity in secret"], why: "Wa yuhibbuna an yuhmadu bima lam yaf'alu." }
      ]
    },
    {
      slug: "signs-in-the-sky",
      title: "Signs in the sky",
      line: "The heavens, the earth, night and day: signs for the wise.",
      facts: ["Sahih al-Bukhari 4569", "He ﷺ looked at the sky"],
      quote: q3(190),
      source: hadith("bukhari", "4569", "Ibn Abbas", "Sahih", "Ibn Abbas stayed at the house of his aunt Maymunah. In the last third of the night the Prophet ﷺ got up, looked at the sky and recited 3:190, then made wudu, used the siwak and prayed.", "he got up and looked towards the sky"),
      difficulty: 5,
      questions: [
        { q: "What did the Prophet ﷺ do before reciting 3:190 at night?", a: "Looked at the sky", wrong: ["Ate a meal", "Went to the market", "Slept again"], why: "Sahih al-Bukhari 4569." },
        { q: "Whose house was Ibn Abbas staying at?", a: "His aunt Maymunah's", wrong: ["Abu Bakr's", "Umar's", "His own"], why: "Maymunah was his aunt and the Prophet's ﷺ wife." },
        { q: "Who sees the signs in creation, in 3:190?", a: "People of understanding", wrong: ["Only astronomers", "Nobody", "Only kings"], why: "La-ayatin li-ulil-albab." }
      ]
    },
    {
      slug: "standing-sitting",
      title: "Standing, sitting, lying down",
      line: "They remember Allah in every pose, and ponder creation.",
      facts: ["Not made without purpose", "Save us from the Fire"],
      quote: q3(191),
      source: ik(191, "People of understanding remember Allah standing, sitting and lying on their sides, and reflect on the creation of the heavens and earth, saying: our Lord, You did not create this in vain; glory be to You; save us from the Fire.", "Those who remember Allah standing, sitting, and lying down on their sides"),
      difficulty: 5,
      questions: [
        { q: "When do they remember Allah, in 3:191?", a: "Standing, sitting and lying down", wrong: ["Only on Fridays", "Only in the masjid", "Only when sad"], why: "Qiyaman wa qu'udan wa 'ala junubihim." },
        { q: "What do they say about creation, in 3:191?", a: "You did not create this in vain", wrong: ["It made itself", "It is a game", "It will last forever"], why: "Rabbana ma khalaqta hadha batila." },
        { q: "What do they think deeply about?", a: "The creation of the heavens and earth", wrong: ["Their dinner", "Other people's faults", "Money"], why: "Wa yatafakkaruna fi khalqis-samawati wal-ard." }
      ]
    },
    {
      slug: "we-heard-the-caller",
      title: "We heard the caller",
      line: "Our Lord, we heard a caller to faith, and we believed.",
      facts: ["Forgive us, erase our sins", "Die with the righteous"],
      quote: q3(193),
      source: ik(193, "They say: our Lord, we heard one calling to faith: believe in your Lord, and we believed. Our Lord, forgive us our sins, remove our bad deeds and let us die with the righteous. Grant us what You promised through Your messengers.", "we have heard the call of one calling to faith"),
      difficulty: 5,
      questions: [
        { q: "What did they hear, in 3:193?", a: "A caller to faith", wrong: ["A storm", "A song", "A market call"], why: "Sami'na munadiyan yunadi lil-iman." },
        { q: "With whom do they ask to die, in 3:193?", a: "The righteous", wrong: ["The rich", "The famous", "Their enemies"], why: "Wa tawaffana ma'al-abrar." },
        { q: "What do they ask for in 3:194?", a: "What Allah promised through His messengers", wrong: ["A kingdom", "A long life only", "Nothing"], why: "Wa atina ma wa'adtana 'ala rusulik." }
      ]
    },
    {
      slug: "male-or-female",
      title: "Male or female",
      line: "Allah answered: no one's good deed is ever lost with Me.",
      facts: ["Jami at-Tirmidhi 3023", "Umm Salamah asked"],
      quote: q3(195),
      source: hadith("tirmidhi", "3023", "Umm Salamah", "Sahih", "Umm Salamah said: O Messenger of Allah ﷺ, I have not heard Allah mention women in the Hijrah. So Allah revealed: never will I let the deed of any of you be lost, male or female.", "I have not heard Allah mentioning anything about women and emigration"),
      difficulty: 5,
      questions: [
        { q: "Whose deeds does Allah not let be lost, in 3:195?", a: "Every man and woman's", wrong: ["Only men's", "Only scholars'", "Only the rich"], why: "Min dhakarin aw untha." },
        { q: "Who asked about women and the Hijrah, in Tirmidhi 3023?", a: "Umm Salamah", wrong: ["Aishah", "Hafsah", "Fatimah"], why: "Then 3:195 came down." },
        { q: "What does 3:195 say about men and women?", a: "You are from one another", wrong: ["Men are better", "Women are better", "They are enemies"], why: "Ba'dukum min ba'd." }
      ]
    },
    {
      slug: "do-not-be-fooled",
      title: "Do not be fooled",
      line: "Do not be fooled by disbelievers moving freely in the land.",
      facts: ["A brief enjoyment", "What is with Allah is best"],
      quote: q3(196),
      source: ik(196, "Do not be deceived by the disbelievers moving about the land in comfort; it is a brief enjoyment. But for those who fear their Lord are gardens with rivers flowing beneath, and what is with Allah is best for the righteous.", "and that which is with Allah is the best for Al-Abrar"),
      difficulty: 5,
      questions: [
        { q: "What is their comfort, in 3:197?", a: "A brief enjoyment", wrong: ["Forever", "A sign of goodness", "The real reward"], why: "Mata'un qalil." },
        { q: "What is best for the righteous, in 3:198?", a: "What is with Allah", wrong: ["What is in the bank", "Fame", "A big house"], why: "Wa ma 'indallahi khayrun lil-abrar." },
        { q: "Seeing others enjoy the world should not shake a believer.", tf: true, why: "La yaghurrannaka: do not be deceived." }
      ]
    },
    {
      slug: "an-najashi",
      title: "The believing king",
      line: "Some People of the Book believe; the Prophet ﷺ prayed for one.",
      facts: ["Sahih al-Bukhari 3877", "Ashamah, the Negus"],
      quote: q3(199),
      source: hadith("bukhari", "3877", "Jabir ibn Abdullah", "Sahih", "When the Negus died, the Prophet ﷺ said: today a righteous man has died, so get up and pray the funeral prayer for your brother Ashamah.", "Today a pious man has died"),
      difficulty: 5,
      questions: [
        { q: "Whom did the Prophet ﷺ call 'your brother Ashamah'?", a: "The Negus of Abyssinia", wrong: ["Heraclius", "Abu Talib", "The king of Persia"], why: "Sahih al-Bukhari 3877." },
        { q: "What did the Prophet ﷺ do when he died?", a: "Prayed the funeral prayer for him", wrong: ["Sent an army", "Said nothing", "Wrote a poem"], why: "Get up and offer the funeral prayer." },
        { q: "What do the believers among them not do, in 3:199?", a: "Sell Allah's ayahs for a small price", wrong: ["Pray", "Believe", "Humble themselves"], why: "La yashtaruna bi-ayatillahi thamanan qalila." }
      ]
    },
    {
      slug: "be-patient",
      title: "Be patient, stand firm",
      line: "Be patient, outlast in patience, stay on guard, and fear Allah.",
      facts: ["Isbiru, sabiru, rabitu", "The last ayah of Ali 'Imran"],
      quote: q3(200),
      source: ik(200, "O you who believe, be patient, outdo others in patience, stand guard, and have taqwa of Allah so that you succeed. With this ayah, the surah of Ali 'Imran ends.", "O you who believe! Endure and be more patient"),
      difficulty: 5,
      questions: [
        { q: "What does the last ayah of Ali 'Imran command first?", a: "Be patient", wrong: ["Be rich", "Be loud", "Be fast"], why: "Isbiru." },
        { q: "'Rabitu' means...", a: "Stand guard and stay firm", wrong: ["Sleep well", "Travel far", "Trade more"], why: "Stay at your post." },
        { q: "Why do all this, in 3:200?", a: "So that you succeed", wrong: ["So that you are famous", "So that you rest", "So that you win money"], why: "La'allakum tuflihun." }
      ]
    }
  ]
};

export const IMRAN_UNITS: readonly DeepUnit[] = [IMRAN_ONE, IMRAN_TWO, IMRAN_THREE];
