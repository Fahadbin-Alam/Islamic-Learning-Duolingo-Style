import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah At-Talaq ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on At-Talaq 65:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_65_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on At-Talaq 65:${ayah}`,
    url: `https://quran.com/65:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 65:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q65 = (ayah: number) => quranQuote(65, ayah);

/** Ayahs 1 to 3: kindness and fairness when a marriage ends, the limits of Allah, and the way out for those with Taqwa. */
const TALAQ_ONE: DeepUnit = {
  key: "talaq1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-65",
  name: "At-Talaq, ayahs 1 to 3",
  kind: "skill",
  lessonType: "surah",
  surahName: "At-Talaq",
  lessons: [
    {
      slug: "prophet-addressed-first",
      title: "Called first, to honor him",
      line: "Allah called the Prophet ﷺ first to honor him, then all Muslims.",
      facts: ["At-Talaq means divorce", "The rules are for everyone"],
      quote: q65(1),
      source: ik(1, "Ibn Kathir says the Prophet ﷺ is addressed first in 65:1 to honor him, though the rule is for his whole Ummah.", "The Prophet ﷺ was addressed first in this Ayah, to honor him"),
      difficulty: 2,
      questions: [
        { q: "Why is the Prophet ﷺ named first in 65:1?", a: "To honor him", wrong: ["He was alone", "To warn him", "By chance"], why: "The Prophet ﷺ was addressed first in this Ayah, to honor him." },
        { q: "Who else does the ayah speak to?", a: "His whole Ummah", wrong: ["Only angels", "Only Jinn", "No one else"], why: "Even though his Ummah is also being addressed." },
        { tf: false, q: "The rules of 65:1 are only for the Prophet ﷺ.", why: "Even though his Ummah is also being addressed." }
      ]
    },
    {
      slug: "the-waiting-time",
      title: "A set waiting time",
      line: "When a marriage ends, Allah sets a waiting time called Iddah.",
      facts: ["Count the time carefully", "Have Taqwa in it"],
      quote: q65(1),
      source: ik(1, "Ibn Kathir explains that during the waiting time the wife keeps her right to housing from her husband.", "she has the right to housing from her husband"),
      difficulty: 3,
      questions: [
        { q: "What is the waiting time called?", a: "Iddah", wrong: ["Hajj", "Zakah", "Witr"], why: "Divorce them at their Iddah and count their Iddah." },
        { q: "What does she keep during that time?", a: "Her right to housing", wrong: ["Nothing at all", "Only her name", "Only her clothes"], why: "She has the right to housing from her husband, as long as the Iddah period continues." },
        { tf: true, q: "Allah tells us to count the waiting time.", why: "Divorce them at their Iddah and count their Iddah. And have Taqwa of Allah, your Lord." }
      ]
    },
    {
      slug: "do-not-turn-them-out",
      title: "Do not put them out",
      line: "A husband may not force his wife out of her home then.",
      facts: ["She stays in her home", "The bond is not yet over"],
      quote: q65(1),
      source: ik(1, "Ibn Kathir says the husband has no right to force her out of the house, and she does not leave, since the marriage contract still ties them.", "the husband does not have the right to force her out of her house"),
      difficulty: 3,
      questions: [
        { q: "Can he force her out during Iddah?", a: "No", wrong: ["Yes, any time", "Only at night", "Only on Fridays"], why: "The husband does not have the right to force her out of her house." },
        { q: "Why does she stay in the home?", a: "The marriage still ties them", wrong: ["She is a guest", "It is cheaper", "It is winter"], why: "Because she is still tied to the marriage contract." },
        { tf: false, q: "He may put her out of the home during Iddah.", why: "The husband does not have the right to force her out of her house." }
      ]
    },
    {
      slug: "the-limits-of-allah",
      title: "The limits of Allah",
      line: "These rules are Allah's limits; crossing them wrongs yourself.",
      facts: ["Hudud: set limits", "Sin harms the sinner"],
      quote: q65(1),
      source: ik(1, "Ibn Kathir says these are the limits Allah set, and whoever crosses them has wronged himself.", "these are from His legislation and prohibitions"),
      difficulty: 3,
      questions: [
        { q: "Whom does a person wrong by crossing the limits?", a: "Himself", wrong: ["Only Allah", "Only the angels", "No one"], why: "Whosoever transgresses the set limits of Allah, then indeed he has wronged himself." },
        { q: "What are the set limits, per Ibn Kathir?", a: "Allah's laws and prohibitions", wrong: ["City walls", "Old customs", "Kings' orders"], why: "These are from His legislation and prohibitions." },
        { tf: true, q: "Breaking Allah's rules hurts the one who breaks them.", why: "Then indeed he has wronged himself, by doing so." }
      ]
    },
    {
      slug: "something-new",
      title: "Allah may bring something new",
      line: "Staying near gives time for hearts to soften and come back.",
      facts: ["Many scholars said: taking her back", "Do not rush endings"],
      quote: q65(1),
      source: ik(1, "Ibn Kathir explains the waiting at home gives the husband a chance to change his mind, so returning is easier.", "This way, returning to his wife will be easier for him"),
      difficulty: 3,
      questions: [
        { q: "What new thing may Allah bring?", a: "Coming back together", wrong: ["A new house", "More money", "A long trip"], why: "You know not, it may be that Allah will afterward bring some new thing to pass, meaning taking her back." },
        { q: "Why does she wait in the home?", a: "So returning is easier", wrong: ["To guard it", "To clean it", "To sell it"], why: "This way, returning to his wife will be easier for him." },
        { tf: true, q: "Fatimah bint Qays said the new thing means taking her back.", why: "Fatimah bint Qays said about the ayah: Taking her back." }
      ]
    },
    {
      slug: "in-a-good-manner",
      title: "Always with kindness",
      line: "Whether staying together or parting, it must be with kindness.",
      facts: ["No insults", "Good manners always"],
      quote: q65(2),
      source: ik(2, "Ibn Kathir says the husband either keeps her kindly, or parts on good terms without insulting or hurting her.", "he should divorce her on good terms, observing kindness and good manners"),
      difficulty: 2,
      questions: [
        { q: "How must they part, if they part?", a: "In a good manner", wrong: ["In anger", "In secret", "With insults"], why: "Either take them back in a good manner or part with them in a good manner." },
        { q: "What should be avoided when parting?", a: "Insults and hurt", wrong: ["Kind words", "Fairness", "Good manners"], why: "Without abusing, cursing, or admonishing her." },
        { tf: false, q: "Insults are fine when a marriage ends.", why: "Without abusing, cursing, or admonishing her." }
      ]
    },
    {
      slug: "two-just-witnesses",
      title: "Two fair witnesses",
      line: "Allah asks for two fair witnesses to keep things clear.",
      facts: ["Witnesses protect rights", "Fairness for both"],
      quote: q65(2),
      source: ik(2, "Ibn Kathir quotes the ayah asking for two just witnesses, a rule followed by those who believe in Allah and the Last Day.", "And take as witness two just persons from among you"),
      difficulty: 3,
      questions: [
        { q: "How many witnesses does 65:2 mention?", a: "Two", wrong: ["One", "Four", "Ten"], why: "And take as witness two just persons from among you." },
        { q: "What kind of witnesses?", a: "Just, fair people", wrong: ["Rich people", "Famous people", "Strangers"], why: "Two just persons from among you." },
        { tf: true, q: "Ibn Kathir says this rule benefits those who fear Allah.", why: "This legislation is meant to benefit those who fear Allah." }
      ]
    },
    {
      slug: "witness-only-for-allah",
      title: "Witness only for Allah",
      line: "Give witness truly, without favouring a relative or a friend.",
      facts: ["As-Sa'di explains", "No more, no less"],
      quote: q65(2),
      source: saadi(65, 2, "As-Sa'di says witnesses must give their witness as it is, adding nothing and leaving nothing, for Allah alone, not favouring a relative or a friend.", "ولا تراعوا بها قريبًا لقرابته، ولا صاحبًا لمحبته"),
      difficulty: 2,
      questions: [
        { q: "How should a witness speak, per as-Sa'di on 65:2?", a: "As it is, for Allah", wrong: ["To help a friend", "To help family", "Add a little"], why: "No adding, no leaving out, for Allah alone, says as-Sa'di." },
        { q: "Who should a witness never favour?", a: "A relative or a friend", wrong: ["The truth", "Allah", "The judge"], why: "Not a relative for being family, nor a friend for love." },
        { tf: true, q: "Witnesses help stop quarrels later.", why: "As-Sa'di on 65:2." }
      ]
    },
    {
      slug: "a-way-out",
      title: "A way out",
      line: "Whoever has Taqwa, Allah makes a way out of every difficulty.",
      facts: ["Taqwa: mindful of Allah", "Obey and avoid the forbidden"],
      quote: q65(2),
      source: ik(2, "Ibn Kathir says whoever obeys Allah and avoids what He forbade, Allah makes a way out for him from every difficulty.", "Allah will make a way out for him from every difficulty"),
      difficulty: 2,
      questions: [
        { q: "What does Allah give the one with Taqwa?", a: "A way out", wrong: ["A heavy load", "A closed door", "Nothing"], why: "And whosoever has Taqwa of Allah, He will make a way for him to get out." },
        { q: "From what kind of difficulty?", a: "Every difficulty", wrong: ["Only small ones", "Only money ones", "None"], why: "Allah will make a way out for him from every difficulty." },
        { tf: true, q: "Taqwa means obeying Allah and avoiding the forbidden.", why: "Whoever has Taqwa of Allah in what He has commanded and avoids what He has forbidden." }
      ]
    },
    {
      slug: "ayah-of-relief",
      title: "The ayah of relief",
      line: "Ibn Masud called 65:2 the greatest Quran ayah of relief.",
      facts: ["16:90: most comprehensive", "65:2: greatest relief"],
      quote: q65(2),
      source: ik(2, "Ibn Kathir reports Abdullah bin Masud saying the most comprehensive ayah is 16:90 and the greatest ayah of relief is 65:2.", "that contains relief is"),
      difficulty: 3,
      questions: [
        { q: "Which ayah did Ibn Masud call the greatest relief?", a: "Whoever has Taqwa, a way out", wrong: ["Ayat al-Kursi", "Al-Fatihah 1", "An-Nas 1"], why: "The greatest Ayah in the Quran that contains relief is: And whosoever has Taqwa of Allah, He will make a way for him to get out." },
        { q: "Which ayah did he call most comprehensive?", a: "16:90", wrong: ["2:255", "112:1", "1:2"], why: "The most comprehensive Ayah in the Quran is: Allah enjoins justice and doing good. (16:90)" },
        { tf: true, q: "Abdullah bin Masud named the ayah of relief.", why: "Ibn Abi Hatim recorded that Abdullah bin Masud said it." }
      ]
    },
    {
      slug: "provision-unexpected",
      title: "From where you never expect",
      line: "Allah provides the one with Taqwa from where he never expected.",
      facts: ["Rizq: provision", "Allah has endless ways"],
      quote: q65(3),
      source: ik(3, "Ibn Kathir says Allah provides those with Taqwa from sources they never expected or thought of.", "from resources he never anticipated or thought about"),
      difficulty: 2,
      questions: [
        { q: "From where does Allah provide him?", a: "From where he never imagined", wrong: ["Only from his job", "Only from family", "Only from trade"], why: "And He will provide him from where he never could imagine." },
        { q: "What leads to this provision?", a: "Taqwa of Allah", wrong: ["Luck", "Shouting", "Laziness"], why: "Whoever has Taqwa of Allah, then Allah will provide for him from resources he never anticipated." },
        { tf: false, q: "Allah only provides through ways we expect.", why: "From resources he never anticipated or thought about." }
      ]
    },
    {
      slug: "he-will-suffice-him",
      title: "Allah is enough",
      line: "Whoever trusts Allah, Allah is enough for him.",
      facts: ["Hasbuhu: enough for him", "Trust and also work"],
      quote: q65(3),
      source: ik(3, "Ibn Kathir quotes the ayah: whoever puts his trust in Allah, He will suffice him.", "And whosoever puts his trust in Allah, then He will suffice him"),
      difficulty: 2,
      questions: [
        { q: "What does Allah do for the one who trusts Him?", a: "He suffices him", wrong: ["He ignores him", "He tests him only", "He leaves him"], why: "And whosoever puts his trust in Allah, then He will suffice him." },
        { q: "What is Tawakkul?", a: "Trusting Allah", wrong: ["Fearing people", "Saving money", "Being lazy"], why: "Whosoever puts his trust in Allah, then He will suffice him." },
        { tf: true, q: "Allah is enough for whoever relies on Him.", why: "And whosoever puts his trust in Allah, then He will suffice him." }
      ]
    },
    {
      slug: "in-its-right-time",
      title: "In its right time",
      line: "Allah suffices the one who trusts, yet may bring it later.",
      facts: ["As-Sa'di explains", "A measure for all"],
      quote: q65(3),
      source: saadi(65, 3, "As-Sa'di says Allah suffices whoever trusts Him, but His wisdom may delay the matter until its right time, since He set a time and amount for everything.", "ولكن ربما أن الحكمة الإلهية اقتضت تأخيره إلى الوقت المناسب له"),
      difficulty: 2,
      questions: [
        { q: "If help seems late after trusting Allah, why?", a: "Wisdom picks the right time", wrong: ["Allah forgot", "Trust failed", "Help is not coming"], why: "His wisdom may delay it to its right time, says as-Sa'di." },
        { q: "What did Allah set for everything in At-Talaq?", a: "A time and amount", wrong: ["No limit", "Only money", "Only rain"], why: "A time and measure it never passes or falls short of." },
        { tf: true, q: "Trust means relying on Allah for both religion and this world.", why: "As-Sa'di on 65:3." }
      ]
    },
    {
      slug: "o-boy-be-mindful",
      title: "O boy, be mindful of Allah",
      line: "The Prophet ﷺ taught young Ibn Abbas: be mindful of Allah.",
      facts: ["Ask Allah alone", "At-Tirmidhi: Hasan Sahih"],
      quote: q65(3),
      source: ik(3, "Ibn Kathir reports that the Prophet ﷺ taught young Ibn Abbas, riding behind him: be mindful of Allah and He will protect you; ask Allah and seek help from Allah.", "Be mindful of Allah and He will protect you"),
      difficulty: 2,
      questions: [
        { q: "What happens if you are mindful of Allah?", a: "He will protect you", wrong: ["You lose friends", "Nothing changes", "You get tired"], why: "Be mindful of Allah and He will protect you." },
        { q: "Whom should you ask when you need help?", a: "Allah", wrong: ["Only friends", "Only the strong", "Only the rich"], why: "If you ask, ask Allah, and if you seek help, seek it from Allah." },
        { tf: true, q: "Ibn Abbas was young when he heard these words.", why: "The Messenger of Allah said to him: O boy! I will teach you words." }
      ]
    },
    {
      slug: "patience-is-given",
      title: "Allah makes you patient",
      line: "Whoever tries to be patient, Allah makes him patient.",
      facts: ["No gift beats patience", "Seek self-sufficiency"],
      quote: q65(3),
      source: hadith("bukhari", "1469", "Abu Sa'id al-Khudri", "Sahih", "The Prophet ﷺ said whoever avoids asking people, Allah makes him content, and whoever tries to be patient, Allah makes him patient.", "And whoever remains patient, Allah will make him patient. Nobody can be given a blessing better and greater than patience"),
      difficulty: 3,
      questions: [
        { q: "What does Allah do for one who tries patience?", a: "Makes him patient", wrong: ["Makes him rich", "Makes him famous", "Nothing"], why: "And whoever remains patient, Allah will make him patient." },
        { q: "What is the best blessing, per the hadith?", a: "Patience", wrong: ["Gold", "Fame", "Sleep"], why: "Nobody can be given a blessing better and greater than patience." },
        { tf: true, q: "Whoever avoids asking people, Allah makes content.", why: "Whoever abstains from asking others, Allah will make him contented." }
      ]
    },
    {
      slug: "a-measure-for-all",
      title: "A measure for everything",
      line: "Allah carries out His plan and set a measure for all things.",
      facts: ["13:8 says the same", "Nothing is random"],
      quote: q65(3),
      source: ik(3, "Ibn Kathir says Allah will carry out His decisions as He wills, and has set a measure for all things, like 13:8.", "Allah will execute His decisions and judgement that He made for him"),
      difficulty: 3,
      questions: [
        { q: "What has Allah set for all things?", a: "A measure", wrong: ["A price", "A color", "A sound"], why: "Indeed Allah has set a measure for all things." },
        { q: "Which ayah does Ibn Kathir compare it to?", a: "13:8", wrong: ["2:2", "36:1", "55:1"], why: "Everything with Him is in due proportion. (13:8)" },
        { tf: true, q: "Allah will accomplish His purpose.", why: "Verily, Allah will accomplish his purpose." }
      ]
    }
  ]
};

/** Ayahs 4 to 7: clear rules for every case, ease for those with Taqwa, fair housing and care, and spending by one's means. */
const TALAQ_TWO: DeepUnit = {
  key: "talaq2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-65",
  name: "At-Talaq, ayahs 4 to 7",
  kind: "skill",
  lessonType: "surah",
  surahName: "At-Talaq",
  lessons: [
    {
      slug: "a-rule-for-every-case",
      title: "A clear rule for each case",
      line: "Allah gave clear waiting times for every kind of case.",
      facts: ["Some: three months", "Expecting mothers: until birth"],
      quote: q65(4),
      source: ik(4, "Ibn Kathir says Allah clarifies the waiting time for older women, and for expecting mothers it ends when the baby is born, as most scholars agreed.", "Allah the Exalted clarifies the waiting period"),
      difficulty: 3,
      questions: [
        { q: "When does an expecting mother's waiting end?", a: "When the baby is born", wrong: ["After one year", "After one week", "Never"], why: "And for those who are pregnant, their Iddah is until they lay down their burden." },
        { q: "How long is it for older women?", a: "Three months", wrong: ["Three days", "Three years", "One hour"], why: "Her Iddah is three months instead of the three monthly cycles." },
        { tf: true, q: "Most scholars agree it ends at birth for expecting mothers.", why: "According to the agreement of the majority of scholars of the Salaf and later generations." }
      ]
    },
    {
      slug: "makes-matters-easy",
      title: "He makes it easy",
      line: "Whoever has Taqwa, Allah makes his affairs easy for him.",
      facts: ["Relief comes soon", "A quick way out"],
      quote: q65(4),
      source: ik(4, "Ibn Kathir says Allah makes the matters of the one with Taqwa easy and soon brings relief and a quick way out.", "Allah will make his matters lenient for him and will soon bring forth relief and a quick way out"),
      difficulty: 2,
      questions: [
        { q: "What does Allah make easy for those with Taqwa?", a: "Their affairs", wrong: ["Their sins", "Their enemies", "Nothing"], why: "And whosoever has Taqwa of Allah, He will make his matter easy for him." },
        { q: "What does Allah soon bring, per Ibn Kathir?", a: "Relief", wrong: ["More trouble", "Silence", "Sadness"], why: "Allah will make his matters lenient for him and will soon bring forth relief." },
        { tf: true, q: "Taqwa is mentioned again and again in At-Talaq.", why: "And whosoever has Taqwa of Allah, He will make his matter easy for him." }
      ]
    },
    {
      slug: "sins-wiped-reward-grown",
      title: "Sins wiped, reward grown",
      line: "Taqwa wipes away sins and makes the reward bigger.",
      facts: ["Even small good grows", "Allah removes what you fear"],
      quote: q65(5),
      source: ik(5, "Ibn Kathir says Allah removes what the person with Taqwa fears and multiplies his reward, even for a little good.", "Allah will prevent what he fears and multiply his reward even for the little good he does"),
      difficulty: 2,
      questions: [
        { q: "What two gifts does 65:5 promise?", a: "Sins wiped, reward grown", wrong: ["Gold and silver", "Fame and power", "Sleep and food"], why: "He will expiate from him his sins, and will increase his reward." },
        { q: "Is even a little good rewarded?", a: "Yes, and multiplied", wrong: ["No", "Only big good", "Only on Fridays"], why: "And multiply his reward even for the little good he does." },
        { tf: true, q: "These rules were sent down by Allah.", why: "This is His commandment and legislation that He sent down to you through His Messenger." }
      ]
    },
    {
      slug: "the-command-of-allah",
      title: "The command of Allah",
      line: "These rules are Allah's command, sent through His Messenger.",
      facts: ["Not human customs", "Revealed law"],
      quote: q65(5),
      source: ik(5, "Ibn Kathir says this is Allah's command and law, sent down through His Messenger.", "this is His commandment and legislation that He sent down to you through His Messenger ﷺ"),
      difficulty: 2,
      questions: [
        { q: "Whose command are these rules?", a: "Allah's", wrong: ["A king's", "A tribe's", "A judge's"], why: "That is the command of Allah, which He has sent down to you." },
        { q: "Through whom were they sent down?", a: "His Messenger", wrong: ["A poet", "A trader", "A king"], why: "This is His commandment and legislation that He sent down to you through His Messenger." },
        { tf: true, q: "Following Allah's command brings reward.", why: "Whosoever has Taqwa of Allah, He will expiate from him his sins, and will increase his reward." }
      ]
    },
    {
      slug: "house-them-as-you-can",
      title: "House them as you can",
      line: "House them where you live, even in just a corner.",
      facts: ["According to your means", "Qatadah gave the example"],
      quote: q65(6),
      source: ik(6, "Ibn Kathir reports Qatadah: if you can only afford a corner of your house for her, then do so.", "If you can only afford to accommodate her in a corner of your house, then do so"),
      difficulty: 3,
      questions: [
        { q: "Where should they be housed, per 65:6?", a: "Where you live", wrong: ["Far away", "In the street", "In the market"], why: "Lodge them where you dwell, means, with you." },
        { q: "What if you can only give a corner?", a: "Give the corner", wrong: ["Give nothing", "Send her away", "Borrow a palace"], why: "If you can only afford to accommodate her in a corner of your house, then do so." },
        { tf: false, q: "Only a large house counts for housing them.", why: "If you can only afford to accommodate her in a corner of your house, then do so." }
      ]
    },
    {
      slug: "do-not-harm-them",
      title: "Do not harm them",
      line: "Do not make life hard for them to push them away.",
      facts: ["Muqatil explained it", "No pressure, no tricks"],
      quote: q65(6),
      source: ik(6, "Ibn Kathir reports Muqatil bin Hayyan: do not annoy her to force her to pay to leave, nor expel her.", "do not annoy her to force her to pay her way out nor expel her from your house"),
      difficulty: 3,
      questions: [
        { q: "What does 65:6 forbid?", a: "Harming them to pressure them", wrong: ["Feeding them", "Housing them", "Being kind"], why: "And do not harm them so as to suppress them." },
        { q: "Who explained it as do not annoy her?", a: "Muqatil bin Hayyan", wrong: ["Firawn", "Qarun", "Haman"], why: "Muqatil bin Hayyan said, meaning, do not annoy her to force her." },
        { tf: true, q: "Tricking someone into leaving is not allowed.", why: "Do not annoy her to force her to pay her way out nor expel her from your house." }
      ]
    },
    {
      slug: "deal-with-each-other-kindly",
      title: "Deal kindly with each other",
      line: "Parents who part must still be fair to each other.",
      facts: ["2:233 says the same", "No harm to mother or father"],
      quote: q65(6),
      source: ik(6, "Ibn Kathir says the affairs of the parted couple should be handled fairly without harm to either, as in 2:233.", "should be managed in a just way without causing harm to either one of them"),
      difficulty: 3,
      questions: [
        { q: "How should parted parents deal with each other?", a: "Fairly and kindly", wrong: ["With anger", "With silence", "With tricks"], why: "Let each of you deal with each other in a mannerly way." },
        { q: "Which ayah does Ibn Kathir link?", a: "2:233", wrong: ["2:255", "4:1", "9:60"], why: "No mother shall be treated unfairly on account of her child, nor father on account of child. (2:233)" },
        { tf: true, q: "Neither parent should be harmed.", why: "Managed in a just way without causing harm to either one of them." }
      ]
    },
    {
      slug: "spend-by-your-means",
      title: "Spend by your means",
      line: "The rich spend by their wealth; the poor by what Allah gave.",
      facts: ["Fair to every budget", "Allah sees the effort"],
      quote: q65(7),
      source: ik(7, "Ibn Kathir says the wealthy father should spend on the child according to his means, and the poorer one by what Allah gave him.", "the wealthy father or his representative should spend on the child according to his means"),
      difficulty: 2,
      questions: [
        { q: "How should a rich man spend?", a: "According to his means", wrong: ["As little as possible", "Nothing", "Only on himself"], why: "Let the rich man spend according to his means." },
        { q: "How should a poorer man spend?", a: "By what Allah gave him", wrong: ["By borrowing a lot", "Not at all", "Like the rich"], why: "Let him spend according to what Allah has given him." },
        { tf: true, q: "Parents must spend on their child.", why: "The wealthy father or his representative should spend on the child according to his means." }
      ]
    },
    {
      slug: "no-burden-beyond",
      title: "No burden too heavy",
      line: "Allah never asks a person for more than He has given him.",
      facts: ["2:286 says the same", "Allah is fair"],
      quote: q65(7),
      source: ik(7, "Ibn Kathir links the ayah to 2:286: Allah does not burden a person beyond what he can bear.", "Allah does not burden a person beyond what He can bear"),
      difficulty: 2,
      questions: [
        { q: "Does Allah burden us beyond what He gave?", a: "No", wrong: ["Yes", "Sometimes", "Only the poor"], why: "Allah puts no burden on any person beyond what He has given him." },
        { q: "Which ayah does Ibn Kathir compare?", a: "2:286", wrong: ["1:7", "3:1", "114:6"], why: "Allah does not burden a person beyond what He can bear. (2:286)" },
        { tf: false, q: "Allah asks some people for more than they can bear.", why: "Allah puts no burden on any person beyond what He has given him." }
      ]
    },
    {
      slug: "after-hardship-ease",
      title: "After hardship, ease",
      line: "Allah promises: after every hardship comes ease.",
      facts: ["94:5-6 says the same", "A sure promise"],
      quote: q65(7),
      source: ik(7, "Ibn Kathir says after hardship ease is a sure promise from Allah, Who never breaks His promises, as in 94:5-6.", "This is a sure promise from Him"),
      difficulty: 2,
      questions: [
        { q: "What comes after hardship?", a: "Ease", wrong: ["More hardship", "Nothing", "Only waiting"], why: "Allah will grant after hardship, ease." },
        { q: "Does Allah break His promises?", a: "Never", wrong: ["Sometimes", "Often", "When busy"], why: "Allah's promises are true and He never breaks them." },
        { tf: true, q: "Surah Ash-Sharh says the same, in 94:5-6.", why: "Verily, along with every hardship is relief. (94:5-6)" }
      ]
    },
    {
      slug: "make-things-easy",
      title: "Make things easy",
      line: "The Prophet ﷺ said: make things easy and give good news.",
      facts: ["Do not make it hard", "Do not drive people away"],
      quote: q65(7),
      source: hadith("bukhari", "69", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said make things easy for people and do not make them hard, give good news and do not drive them away.", "Facilitate things to people"),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ tell us to do?", a: "Make things easy", wrong: ["Make things hard", "Stay silent", "Be harsh"], why: "Facilitate things to people, and do not make it hard for them." },
        { q: "What should we give people?", a: "Good news", wrong: ["Bad news", "Fear only", "Nothing"], why: "And give them good tidings and do not make them run away." },
        { tf: true, q: "Anas ibn Malik narrated the make-things-easy hadith.", why: "Narrated Anas bin Malik: Facilitate things to people." }
      ]
    },
    {
      slug: "even-a-morsel",
      title: "Even a bite of food",
      line: "Even food you put in your wife's mouth earns reward.",
      facts: ["Spending on family is charity", "Intention for Allah"],
      quote: q65(7),
      source: hadith("bukhari", "56", "Sad ibn Abi Waqqas", "Sahih", "The Prophet ﷺ said you are rewarded for whatever you spend for Allah's sake, even a bite you put in your wife's mouth.", "You will be rewarded for whatever you spend"),
      difficulty: 2,
      questions: [
        { q: "Is spending on family rewarded?", a: "Yes, for Allah's sake", wrong: ["No", "Only on Eid", "Only if rich"], why: "You will be rewarded for whatever you spend for Allah's sake." },
        { q: "What small example did the Prophet ﷺ give?", a: "A bite for one's wife", wrong: ["A gold coin", "A new house", "A camel"], why: "Even if it were a morsel which you put in your wife's mouth." },
        { tf: true, q: "Sad ibn Abi Waqqas narrated the morsel hadith.", why: "Narrated Sad bin Abi Waqqas: You will be rewarded for whatever you spend." }
      ]
    }
  ]
};

/** Ayahs 8 to 12: towns that rebelled, the Reminder and the Messenger ﷺ who brings people from darkness to light, and the seven heavens. */
const TALAQ_THREE: DeepUnit = {
  key: "talaq3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-65",
  name: "At-Talaq, ayahs 8 to 12",
  kind: "skill",
  lessonType: "surah",
  surahName: "At-Talaq",
  lessons: [
    {
      slug: "towns-that-rebelled",
      title: "Towns that refused",
      line: "Many towns proudly refused Allah's command and His Messengers.",
      facts: ["Pride led them astray", "A warning for us"],
      quote: q65(8),
      source: ik(8, "Ibn Kathir says these towns rebelled and arrogantly refused to obey Allah or follow His Messengers.", "they rebelled, rejected and arrogantly refused to obey Allah"),
      difficulty: 2,
      questions: [
        { q: "What did the towns do, per 65:8?", a: "Revolted against Allah's command", wrong: ["Built mosques", "Fed the poor", "Followed Messengers"], why: "And many a town revolted against the command of its Lord and His Messengers." },
        { q: "How did they refuse, per Ibn Kathir?", a: "Arrogantly", wrong: ["Politely", "Secretly", "Sadly"], why: "They rebelled, rejected and arrogantly refused to obey Allah." },
        { tf: true, q: "Their story is told as a warning.", why: "By informing them of the end that earlier nations met who did the same." }
      ]
    },
    {
      slug: "regret-too-late",
      title: "Regret that came too late",
      line: "They regretted only when regret no longer helped.",
      facts: ["Repent while you can", "Loss was their result"],
      quote: q65(9),
      source: ik(9, "Ibn Kathir says they tasted the results of their defiance and regretted when regret was of no use.", "they regretted their actions when regret does not avail"),
      difficulty: 2,
      questions: [
        { q: "What was the end of their affair?", a: "Loss", wrong: ["Victory", "Wealth", "Peace"], why: "And the consequence of its affair was loss." },
        { q: "When did they regret?", a: "When it was too late", wrong: ["Right away", "Never at all", "Before they sinned"], why: "They regretted their actions when regret does not avail." },
        { tf: false, q: "Their late regret saved them.", why: "They regretted their actions when regret does not avail." }
      ]
    },
    {
      slug: "people-of-understanding",
      title: "O people of understanding",
      line: "Allah calls the wise believers: do not be like them.",
      facts: ["Ulul-albab: people of insight", "Learn from others"],
      quote: q65(10),
      source: ik(10, "Ibn Kathir says Allah tells those with sound understanding not to be like those towns, or they will suffer the same.", "do not be like them"),
      difficulty: 2,
      questions: [
        { q: "Whom does 65:10 call?", a: "People of understanding", wrong: ["Only kings", "Only traders", "Only travelers"], why: "So have Taqwa of Allah, O men of understanding, those who believe!" },
        { q: "What are they told?", a: "Do not be like them", wrong: ["Copy them", "Visit them", "Praise them"], why: "O you who have sound understanding, do not be like them." },
        { tf: true, q: "A wise person learns from others' mistakes.", why: "Do not be like them because if you do, you will suffer what they suffered." }
      ]
    },
    {
      slug: "the-reminder",
      title: "The Reminder",
      line: "Allah sent down the Quran as a Reminder, and He protects it.",
      facts: ["Dhikr: a Reminder", "15:9: Allah guards it"],
      quote: q65(10),
      source: ik(10, "Ibn Kathir says the Reminder is the Quran, and quotes 15:9 that Allah sent down the Dhikr and will preserve it.", "We Who have sent down the Dhikr and surely, We will preserve it"),
      difficulty: 2,
      questions: [
        { q: "What is the Reminder in 65:10?", a: "The Quran", wrong: ["A bell", "A letter", "A dream"], why: "Allah has indeed sent down to you a Reminder, meaning, this Quran." },
        { q: "Who preserves the Quran, per 15:9?", a: "Allah", wrong: ["Kings", "Poets", "No one"], why: "We Who have sent down the Dhikr and surely, We will preserve it. (15:9)" },
        { tf: true, q: "The Quran is kept safe by Allah.", why: "Verily, We, it is We Who have sent down the Dhikr and surely, We will preserve it." }
      ]
    },
    {
      slug: "clear-ayat",
      title: "Clear ayat",
      line: "The Messenger ﷺ recites Allah's ayat, clear and plain.",
      facts: ["The Messenger ﷺ explains", "Easy to understand"],
      quote: q65(11),
      source: ik(11, "Ibn Kathir says the Messenger ﷺ recites Allah's ayat with clear explanations, meaning plain and apparent.", "plain and apparent"),
      difficulty: 2,
      questions: [
        { q: "What does the Messenger ﷺ recite?", a: "Allah's clear ayat", wrong: ["Poems", "Old stories", "Songs"], why: "A Messenger, who recites to you the Ayat of Allah containing clear explanations." },
        { q: "What does clear mean, per Ibn Kathir?", a: "Plain and apparent", wrong: ["Hidden", "Secret", "Confusing"], why: "Containing clear explanations, meaning, plain and apparent." },
        { tf: true, q: "Ibn Jarir said the Messenger ﷺ explains the Reminder.", why: "Ibn Jarir said that what is correct is that the Messenger ﷺ explains the Dhikr." }
      ]
    },
    {
      slug: "darkness-to-light",
      title: "From darkness to light",
      line: "The Quran takes believers from darkness into light.",
      facts: ["Darkness: disbelief, ignorance", "Light: faith, knowledge"],
      quote: q65(11),
      source: ik(11, "Ibn Kathir says Allah brings believers out of the darkness of disbelief and ignorance into the light of faith and knowledge.", "out of the darkness of disbelief and ignorance into the light of faith and knowledge"),
      difficulty: 2,
      questions: [
        { q: "What is the darkness, per Ibn Kathir?", a: "Disbelief and ignorance", wrong: ["Night time", "A cave", "Clouds"], why: "Out of the darkness of disbelief and ignorance into the light of faith and knowledge." },
        { q: "What is the light?", a: "Faith and knowledge", wrong: ["A lamp", "The sun", "Gold"], why: "Into the light of faith and knowledge." },
        { tf: true, q: "Ibn Kathir also quotes 2:257 on this.", why: "Allah is the Guardian of those who believe. He brings them out from darkness into light. (2:257)" }
      ]
    },
    {
      slug: "revelation-is-ruh",
      title: "Revelation gives life",
      line: "Revelation is light and Ruh, since it gives hearts life.",
      facts: ["42:52 calls it Ruh", "Guidance is light"],
      quote: q65(11),
      source: ik(11, "Ibn Kathir says Allah called the revelation light because of its guidance, and Ruh because it gives life to hearts.", "Allah also called it Ruh, in that, it brings life to the hearts"),
      difficulty: 3,
      questions: [
        { q: "Why is revelation called Ruh?", a: "It gives life to hearts", wrong: ["It is wind", "It is old", "It is far"], why: "Allah also called it Ruh, in that, it brings life to the hearts." },
        { q: "Why is revelation called light?", a: "It guides", wrong: ["It is hot", "It is bright gold", "It is loud"], why: "Allah called the revelation that He has sent down, light, on account of the guidance that it brings." },
        { tf: true, q: "Ibn Kathir quotes 42:52 about Ruh.", why: "And thus We have sent to you Ruh of our command. (42:52)" }
      ]
    },
    {
      slug: "an-excellent-provision",
      title: "An excellent provision",
      line: "Believers who do good get Gardens and an excellent provision.",
      facts: ["Rivers flow beneath", "Forever"],
      quote: q65(11),
      source: ik(11, "Ibn Kathir quotes the ayah: whoever believes and does good enters Gardens with rivers forever, an excellent provision.", "Allah has indeed granted for him an excellent provision"),
      difficulty: 2,
      questions: [
        { q: "What flows under the Gardens?", a: "Rivers", wrong: ["Sand", "Fire", "Wind"], why: "He will admit him into Gardens under which rivers flow, to dwell therein forever." },
        { q: "How does Allah describe their provision?", a: "Excellent", wrong: ["Small", "Short", "Plain"], why: "Allah has indeed granted for him an excellent provision." },
        { tf: true, q: "The Gardens are for those who believe and do good.", why: "Whosoever believes in Allah and performs righteous deeds, He will admit him into Gardens." }
      ]
    },
    {
      slug: "seven-heavens",
      title: "Seven heavens",
      line: "Allah created seven heavens, showing His perfect power.",
      facts: ["71:15 says the same", "17:44: they glorify Him"],
      quote: q65(12),
      source: ik(12, "Ibn Kathir says Allah asserts His perfect power and greatness by creating seven heavens, as in 71:15 and 17:44.", "Allah the Exalted asserts His perfect power and infinite greatness"),
      difficulty: 2,
      questions: [
        { q: "How many heavens did Allah create?", a: "Seven", wrong: ["Three", "Five", "Ten"], why: "It is Allah Who has created seven heavens." },
        { q: "Which prophet mentioned the seven heavens in 71:15?", a: "Nuh", wrong: ["Yusuf", "Yunus", "Hud"], why: "Like what Prophet Nuh said to his people: See you not how Allah has created the seven heavens. (71:15)" },
        { tf: true, q: "The seven heavens glorify Allah.", why: "The seven heavens and the earth and all that is therein, glorify him. (17:44)" }
      ]
    },
    {
      slug: "seven-earths",
      title: "And of the earth the like",
      line: "Of the earth Allah made the like: seven earths.",
      facts: ["Hadith mentions seven earths", "Not seven continents"],
      quote: q65(12),
      source: ik(12, "Ibn Kathir says of the earth the like thereof means seven earths, and rejects the idea it means seven continents.", "means, He created seven earths"),
      difficulty: 3,
      questions: [
        { q: "What does of the earth the like mean?", a: "Seven earths", wrong: ["One earth", "Seven seas", "Seven cities"], why: "And of the earth the like thereof, means, He created seven earths." },
        { q: "Did Ibn Kathir accept seven continents?", a: "No, he rejected it", wrong: ["Yes, fully", "He did not say", "Only partly"], why: "Those who explained this Hadith to mean the seven continents have brought an implausible explanation." },
        { tf: false, q: "Ibn Kathir says the seven earths are seven continents.", why: "Those who explained this Hadith to mean the seven continents have brought an implausible explanation." }
      ]
    },
    {
      slug: "do-not-take-land",
      title: "Never take others' land",
      line: "Taking even a little land unfairly is a grave sin.",
      facts: ["Respect others' rights", "Seven earths are named"],
      quote: q65(12),
      source: hadith("bukhari", "2454", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ warned that whoever takes others' land unjustly will sink down the seven earths on the Day of Resurrection.", "Whoever takes a piece of the land of others unjustly"),
      difficulty: 3,
      questions: [
        { q: "What does the hadith warn against?", a: "Taking land unfairly", wrong: ["Planting trees", "Building homes", "Buying land"], why: "Whoever takes a piece of the land of others unjustly." },
        { q: "Which number appears in the hadith?", a: "Seven earths", wrong: ["Three seas", "Ten skies", "Two worlds"], why: "He will sink down the seven earths on the Day of Resurrection." },
        { tf: true, q: "Others' property must be respected.", why: "Whoever takes a piece of the land of others unjustly will be punished." }
      ]
    },
    {
      slug: "power-over-all",
      title: "Power over all things",
      line: "All this shows Allah has power over all and knows all.",
      facts: ["His command descends", "His knowledge surrounds all"],
      quote: q65(12),
      source: ik(12, "Ibn Kathir closes At-Talaq with the ayah: that you may know Allah has power over all things and surrounds all with His knowledge.", "that you may know that Allah has power over all things"),
      difficulty: 2,
      questions: [
        { q: "Why did Allah tell us of the heavens and earths?", a: "To know His power", wrong: ["To scare us", "To count them", "For a game"], why: "That you may know that Allah has power over all things." },
        { q: "What surrounds all things?", a: "Allah's knowledge", wrong: ["The ocean", "The air", "The clouds"], why: "And that Allah surrounds all things with His knowledge." },
        { tf: true, q: "At-Talaq has twelve ayahs.", why: "The surah ends at ayah 12: Allah surrounds all things with His knowledge." }
      ]
    },
    {
      slug: "why-we-were-made",
      title: "Why we were made",
      line: "Allah made all things so we would know Him and worship Him.",
      facts: ["As-Sa'di explains", "Know Him, worship Him"],
      quote: q65(12),
      source: saadi(65, 12, "As-Sa'di says Allah made creation and sent down His command so His servants would know His power and knowledge, and the goal of it all is to know Allah and worship Him.", "فهذه الغاية المقصودة من الخلق والأمر معرفة الله وعبادته"),
      difficulty: 2,
      questions: [
        { q: "What is the goal of creation, per as-Sa'di on 65:12?", a: "To know and worship Allah", wrong: ["To get rich", "To play", "To be famous"], why: "The goal is knowing Allah and worshipping Him, says as-Sa'di." },
        { q: "How do we come to know Allah?", a: "By His names and qualities", wrong: ["By guessing", "By stars", "We cannot"], why: "Knowing Him by His holy qualities and beautiful names." },
        { tf: true, q: "Allah's command includes the rules He sent to His Messengers.", why: "As-Sa'di on 65:12." }
      ]
    }
  ]
};

export const TALAQ_UNITS: readonly DeepUnit[] = [TALAQ_ONE, TALAQ_TWO, TALAQ_THREE];
