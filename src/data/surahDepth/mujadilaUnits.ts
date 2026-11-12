import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Al-Mujadila ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Mujadila 58:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_58_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Mujadila 58:${ayah}`,
    url: `https://quran.com/58:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 58:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q58 = (ayah: number) => quranQuote(58, ayah);

/** Ayahs 1 to 7: Allah heard the woman who pleaded, the old custom of Zihar corrected, and Allah with every secret meeting. */
const MUJADILA_ONE: DeepUnit = {
  key: "mujadila1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-58",
  name: "Al-Mujadila, ayahs 1 to 7",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Mujadila",
  lessons: [
    {
      slug: "allah-heard-her",
      title: "Allah heard her",
      line: "A woman pleaded about her husband, and Allah heard her.",
      facts: ["Al-Mujadila means the woman who pleaded", "Allah hears every voice"],
      quote: q58(1),
      source: ik(1, "Ibn Kathir reports Aishah said: All praise be to Allah, Who hears all voices, when the woman who pleaded came to the Prophet ﷺ.", "All praise be to Allah, Who hears all voices"),
      difficulty: 1,
      questions: [
        { q: "What does Al-Mujadila mean?", a: "The woman who pleaded", wrong: ["The iron", "The night journey", "The gathering"], why: "Indeed Allah has heard the statement of her that disputes with you concerning her husband." },
        { q: "What did Aishah praise Allah for?", a: "Hearing all voices", wrong: ["Sending rain", "Giving wealth", "Making the night"], why: "All praise be to Allah, Who hears all voices." },
        { tf: true, q: "Surah 58 begins with Allah hearing a woman.", why: "Indeed Allah has heard the statement of her that disputes with you." }
      ]
    },
    {
      slug: "aishah-could-not-hear",
      title: "Aishah could not hear",
      line: "Aishah was in the same room but could not hear her words.",
      facts: ["People nearby could not hear", "Allah above the heavens heard"],
      quote: q58(1),
      source: ik(1, "Ibn Kathir reports Aishah said she was in another part of the room, unable to hear what the woman said, yet Allah revealed this ayah.", "while I was in another part of the room, unable to hear what she said"),
      difficulty: 2,
      questions: [
        { q: "Where was Aishah when the woman spoke?", a: "In another part of the room", wrong: ["In another city", "On a journey", "In the masjid"], why: "While I was in another part of the room, unable to hear what she said." },
        { q: "Could Aishah hear what the woman said?", a: "No, she could not", wrong: ["Yes, every word", "Only her name", "Only the end"], why: "Unable to hear what she said." },
        { tf: true, q: "Allah heard what people in the same room missed.", why: "Unable to hear what she said. Allah the Exalted and Most Honored revealed this Ayah." }
      ]
    },
    {
      slug: "hearing-that-covers-all",
      title: "Hearing that covers all",
      line: "Allah's hearing covers every sound, near or far.",
      facts: ["No whisper is too quiet for Him", "We can always call on Allah"],
      quote: q58(1),
      source: ik(1, "Ibn Kathir reports Aishah said: Blessed is He, Whose hearing has encompassed all things.", "Blessed is He, Whose hearing has encompassed all things"),
      difficulty: 2,
      questions: [
        { q: "What did Aishah say about Allah's hearing?", a: "It encompasses all things", wrong: ["It is limited", "It needs loud voices", "It is only by day"], why: "Blessed is He, Whose hearing has encompassed all things." },
        { q: "What was the woman's name, per Aishah?", a: "Khawlah bint Thalabah", wrong: ["Khadijah", "Fatimah", "Asma"], why: "I heard what Khawlah bint Tha'labah said while some of it I could not hear." },
        { tf: true, q: "Even a quiet dua is heard by Allah.", why: "Blessed is He, Whose hearing has encompassed all things." }
      ]
    },
    {
      slug: "she-complained-to-allah",
      title: "She complained to Allah",
      line: "Khawlah took her worry to the Prophet ﷺ and to Allah.",
      facts: ["She had grown old with her husband", "She said: O Allah, I complain to You"],
      quote: q58(1),
      source: ik(1, "Ibn Kathir reports Aishah said Khawlah was complaining to the Prophet ﷺ about her husband, and soon after Jibril brought down the ayah.", "She was complaining to Allah…Soon after, Jibril brought down this Ayah"),
      difficulty: 2,
      questions: [
        { q: "Who brought down the ayah about her?", a: "Jibril", wrong: ["A poet", "Her husband", "A king"], why: "Soon after, Jibril brought down this Ayah." },
        { q: "To whom did she finally complain?", a: "To Allah", wrong: ["To a judge", "To her tribe", "To no one"], why: "O Allah! I complain to you." },
        { q: "Who was her husband?", a: "Aws bin As-Samit", wrong: ["Abu Bakr", "Umar", "Zayd"], why: "Her husband was Aws bin As-Samit." }
      ]
    },
    {
      slug: "all-hearer-all-seer",
      title: "All-Hearer, All-Seer",
      line: "Allah heard the whole talk between her and the Prophet ﷺ.",
      facts: ["As-Sami: the All-Hearer", "Al-Basir: the All-Seer"],
      quote: q58(1),
      source: ik(1, "Ibn Kathir quotes 58:1: Allah hears the argument between you both. Verily, Allah is All-Hearer, All-Seer.", "And Allah hears the argument between you both. Verily, Allah is All-Hearer, All-Seer"),
      difficulty: 1,
      questions: [
        { q: "Which two names end 58:1?", a: "All-Hearer, All-Seer", wrong: ["First, Last", "Rich, Praised", "Almighty, Wise"], why: "Verily, Allah is All-Hearer, All-Seer." },
        { q: "What did Allah hear, in 58:1?", a: "The talk between them both", wrong: ["Only the husband", "Only the crowd", "Nothing"], why: "And Allah hears the argument between you both." },
        { tf: true, q: "We can tell Allah our problems, and He hears.", why: "And complains to Allah. And Allah hears the argument between you both." }
      ]
    },
    {
      slug: "zihar-an-old-custom",
      title: "Zihar, an old custom",
      line: "In Jahiliyyah a husband could say: you are like my mother.",
      facts: ["Zihar comes from Zahr, the back", "Men used it to cruelly leave a wife"],
      quote: q58(2),
      source: ik(2, "Ibn Kathir says Zihar comes from Az-Zahr, the back; in Jahiliyyah a man would say to his wife: to me, you are like the back of my mother.", "During the time of Jahiliyyah, when one wanted to declare Zihar towards his wife, he would say"),
      difficulty: 2,
      questions: [
        { q: "What word does Zihar come from?", a: "Az-Zahr, the back", wrong: ["Az-Zuhr, noon", "Az-Zahrah, flower", "Az-Zahir, evident"], why: "Zihar, which is derived from Az-Zahr, meaning, the back." },
        { q: "When was Zihar a custom?", a: "In the time of Jahiliyyah", wrong: ["In Ramadan only", "After Islam came", "Never"], why: "During the time of Jahiliyyah, when one wanted to declare Zihar towards his wife." },
        { tf: true, q: "Zihar was a way people ended marriage before Islam.", why: "That was one way they issued divorce during that time." }
      ]
    },
    {
      slug: "no-longer-a-divorce",
      title: "No longer a divorce",
      line: "Islam did not count Zihar as divorce; it set an expiation.",
      facts: ["The marriage was not ended", "The husband must make up for his words"],
      quote: q58(2),
      source: ik(2, "Ibn Kathir says Allah allowed this Ummah to pay expiation for this statement and did not render it as a divorce.", "Allah allowed this Ummah to pay expiation for this statement and did not render it as a divorce"),
      difficulty: 2,
      questions: [
        { q: "Did Islam count Zihar as divorce?", a: "No, it set an expiation", wrong: ["Yes, always", "Only in Makkah", "Only for the old"], why: "Did not render it as a divorce, contrary to the case during the time of Jahiliyyah." },
        { q: "What must a man do after saying Zihar?", a: "Pay an expiation", wrong: ["Nothing", "Leave the town", "Pay his tribe"], why: "Allah allowed this Ummah to pay expiation for this statement." },
        { tf: true, q: "Islam protected the wife from this old custom.", why: "Did not render it as a divorce, contrary to the case during the time of Jahiliyyah." }
      ]
    },
    {
      slug: "only-she-who-gave-birth",
      title: "Only she who gave birth",
      line: "Words cannot make a wife a mother; a mother gives birth.",
      facts: ["Words cannot change who your mother is", "Only she who bore you is your mother"],
      quote: q58(2),
      source: ik(2, "Ibn Kathir says when a husband calls his wife like his mother, she does not become his mother; his mother is she who gave birth to him.", "Rather his mother is she who gave birth to him"),
      difficulty: 1,
      questions: [
        { q: "Who is a person's mother, per 58:2?", a: "She who gave birth to him", wrong: ["Anyone he names", "His wife", "His aunt"], why: "None can be their mothers except those who gave them birth." },
        { q: "Does saying the words make the wife a mother?", a: "No", wrong: ["Yes", "Only for a year", "Only at night"], why: "She does not become his mother. Rather his mother is she who gave birth to him." },
        { tf: false, q: "Words alone can turn a wife into a mother.", why: "They cannot be their mothers. None can be their mothers except those who gave them birth." }
      ]
    },
    {
      slug: "an-ill-word-and-a-lie",
      title: "An ill word and a lie",
      line: "Allah calls the words of Zihar an ill word and a lie.",
      facts: ["Hurtful words are a sin", "Guard the tongue, even in anger"],
      quote: q58(2),
      source: ik(2, "Ibn Kathir says an ill word and a lie means false and sinful speech.", "meaning, false and sinful speech"),
      difficulty: 2,
      questions: [
        { q: "What does Allah call the words of Zihar?", a: "An ill word and a lie", wrong: ["A kind word", "A promise", "A prayer"], why: "And verily, they utter an ill word and a lie." },
        { q: "What does Ibn Kathir say that means?", a: "False and sinful speech", wrong: ["A joke", "Good advice", "A poem"], why: "Meaning, false and sinful speech." },
        { tf: true, q: "Angry words can be a sin even if said quickly.", why: "And verily, they utter an ill word and a lie." }
      ]
    },
    {
      slug: "oft-pardoning",
      title: "Oft-Pardoning, Oft-Forgiving",
      line: "Allah forgives old ways and slips of the tongue.",
      facts: ["Al-Afuw: the Oft-Pardoning", "Al-Ghafur: the Oft-Forgiving"],
      quote: q58(2),
      source: ik(2, "Ibn Kathir says Allah pardons what they did in Jahiliyyah and what slips out of the mouth unintentionally.", "what accidentally slips out of your mouth, unintentionally"),
      difficulty: 2,
      questions: [
        { q: "How does 58:2 end?", a: "Oft-Pardoning, Oft-Forgiving", wrong: ["Severe in punishment", "Rich, Praised", "First, Last"], why: "And verily, Allah is Oft-Pardoning, Oft-Forgiving." },
        { q: "What does Allah pardon, per Ibn Kathir?", a: "Words that slip out by mistake", wrong: ["Nothing at all", "Only big deeds", "Only old sins"], why: "What accidentally slips out of your mouth, unintentionally." },
        { tf: true, q: "Allah forgives what people did before they knew better.", why: "What you used to do during the time of Jahiliyyah." }
      ]
    },
    {
      slug: "be-kind-to-him",
      title: "Be kind to him",
      line: "The Prophet ﷺ told Khuwaylah to be kind to her old husband.",
      facts: ["Her husband was old and difficult", "The Prophet ﷺ asked her to be gentle"],
      quote: q58(2),
      source: ik(2, "Ibn Kathir reports the Prophet ﷺ said to Khuwaylah: your cousin is an old man, so have Taqwa of Allah regarding him.", "Your cousin is an old man, so have Taqwa of Allah regarding him"),
      difficulty: 3,
      questions: [
        { q: "How did the Prophet ﷺ describe her husband?", a: "An old man, her cousin", wrong: ["A young soldier", "A rich trader", "A stranger"], why: "O Khuwaylah! Your cousin is an old man." },
        { q: "What did he ask her to have about him?", a: "Taqwa of Allah", wrong: ["Anger", "Fear of him", "Nothing"], why: "So have Taqwa of Allah regarding him." },
        { tf: true, q: "The Prophet ﷺ was gentle with both husband and wife.", why: "Your cousin is an old man, so have Taqwa of Allah regarding him." }
      ]
    },
    {
      slug: "revealed-before-she-left",
      title: "Revealed before she left",
      line: "Before Khuwaylah left, Quran came down about her.",
      facts: ["Revelation was heavy on the Prophet ﷺ", "Then he was relieved and recited it"],
      quote: q58(3),
      source: ik(3, "Ibn Kathir reports the Prophet ﷺ felt the hardship of revelation as usual, then was relieved, and said Allah has revealed something about you.", "felt the hardship upon receiving the revelation as he usually did and then became relieved"),
      difficulty: 3,
      questions: [
        { q: "When did the ayahs about her come down?", a: "Before she even left", wrong: ["A year later", "After she died", "Never"], why: "By Allah! Before I departed, parts of the Qur'an were revealed about me." },
        { q: "How did revelation feel for the Prophet ﷺ?", a: "Heavy, then relief", wrong: ["Light and easy", "Like a dream", "Like music"], why: "Felt the hardship upon receiving the revelation as he usually did and then became relieved." },
        { tf: true, q: "Allah revealed Quran about one woman's problem.", why: "O Khuwaylah! Allah has revealed something about you and your spouse." }
      ]
    },
    {
      slug: "first-free-a-slave",
      title: "First: free a slave",
      line: "The first expiation for Zihar is freeing a slave.",
      facts: ["Islam used expiations to free slaves", "This comes before they return to each other"],
      quote: q58(3),
      source: ik(3, "Ibn Kathir reports the Prophet ﷺ said: command him to free a slave.", "Command him to free a slave"),
      difficulty: 2,
      questions: [
        { q: "What is the first expiation, in 58:3?", a: "Freeing a slave", wrong: ["Building a house", "Going on Hajj", "Paying a judge"], why: "The penalty in that case is the freeing of a slave." },
        { q: "What did Khuwaylah say about her husband?", a: "He had no slave to free", wrong: ["He had many", "He refused", "He was away"], why: "O Allah's Messenger! He does not have any to free." },
        { tf: true, q: "58:3 calls the expiation an admonition to you.", why: "That is an admonition to you. And Allah is All-Aware of what you do." }
      ]
    },
    {
      slug: "then-fast-two-months",
      title: "Then fast two months",
      line: "Without a slave to free, he fasts two months in a row.",
      facts: ["The two months must be in a row", "The same order is in another Sahih hadith"],
      quote: q58(4),
      source: ik(4, "Ibn Kathir reports the Prophet ﷺ said: let him fast for two consecutive months.", "Let him fast for two consecutive months"),
      difficulty: 2,
      questions: [
        { q: "What is the second expiation?", a: "Fasting two months in a row", wrong: ["Fasting one day", "Praying all night", "Giving one coin"], why: "Let him fast for two consecutive months." },
        { q: "Why could Aws not fast, per Khuwaylah?", a: "He was an old man", wrong: ["He was traveling", "He was busy", "He refused"], why: "By Allah! He is an old man and cannot fast." },
        { tf: false, q: "The two months of fasting can have long gaps.", why: "Must fast two successive months." }
      ]
    },
    {
      slug: "then-feed-sixty",
      title: "Then feed sixty poor",
      line: "If he cannot fast, he feeds sixty poor people.",
      facts: ["A Wasq of dates was the amount", "Each step is easier than the one before"],
      quote: q58(4),
      source: ik(4, "Ibn Kathir reports the Prophet ﷺ said: let him feed sixty poor people a Wasq of dates.", "Let him feed sixty poor people a Wasq of dates"),
      difficulty: 2,
      questions: [
        { q: "How many poor must be fed, in 58:4?", a: "Sixty", wrong: ["Six", "Ten", "One hundred"], why: "Should feed sixty of the poor." },
        { q: "What food did the Prophet ﷺ name?", a: "A Wasq of dates", wrong: ["Bread", "Meat", "Milk"], why: "Let him feed sixty poor people a Wasq of dates." },
        { q: "What is the right order of the three?", a: "Free, then fast, then feed", wrong: ["Feed, fast, free", "Fast, free, feed", "Any order"], why: "Freeing of a slave... fast two successive months... feed sixty of the poor." }
      ]
    },
    {
      slug: "we-will-help-him",
      title: "We will help him",
      line: "Aws had nothing, so the Prophet ﷺ and Khuwaylah helped him.",
      facts: ["The Prophet ﷺ gave a basket of dates", "Khuwaylah added another basket"],
      quote: q58(4),
      source: ik(4, "Ibn Kathir reports the Prophet ﷺ said: we will help him with a basket of dates, and Khuwaylah said she would help with another.", "We will help him with a basket of dates…I will help him with another"),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ offer Aws?", a: "A basket of dates", wrong: ["A slave", "A horse", "Gold"], why: "We will help him with a basket of dates." },
        { q: "What did Khuwaylah offer?", a: "Another basket", wrong: ["Nothing", "Her house", "A camel"], why: "And I, O Allah's Messenger! I will help him with another." },
        { tf: true, q: "The Prophet ﷺ helped a poor man pay his expiation.", why: "We will help him with a basket of dates." }
      ]
    },
    {
      slug: "take-care-of-your-cousin",
      title: "Take care of your cousin",
      line: "The Prophet ﷺ praised her and told her to care for her husband.",
      facts: ["She gave the dates on his behalf", "Their marriage was kept"],
      quote: q58(4),
      source: ik(4, "Ibn Kathir reports the Prophet ﷺ said: you have done a good thing, so go and give away the dates on his behalf and take care of your cousin.", "So go and give away the dates on his behalf and take care of your cousin"),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ say about her offer?", a: "You have done a good thing", wrong: ["That is wrong", "Keep the dates", "Leave him"], why: "You have done a righteously good thing." },
        { q: "What was she told to do at the end?", a: "Take care of her cousin", wrong: ["Leave her home", "Stop talking", "Travel away"], why: "Take care of your cousin." },
        { tf: true, q: "Khuwaylah gave the dates for her husband.", why: "So go and give away the dates on his behalf." }
      ]
    },
    {
      slug: "that-you-may-have-faith",
      title: "That you may have faith",
      line: "Allah set these rules so that we believe and obey.",
      facts: ["Rules help faith grow", "These are the limits of Allah"],
      quote: q58(4),
      source: ik(4, "Ibn Kathir says Allah legislated this so that you acquire the trait of perfect faith in Allah and His Messenger.", "We legislated this punishment so that you acquire this trait"),
      difficulty: 2,
      questions: [
        { q: "Why did Allah set this expiation?", a: "So we have perfect faith", wrong: ["To make us poor", "For no reason", "To punish women"], why: "That is in order that you may have perfect faith in Allah and His Messenger." },
        { q: "What does 58:4 call these rules?", a: "The limits set by Allah", wrong: ["Old customs", "Advice only", "Stories"], why: "These are the limits set by Allah." },
        { tf: true, q: "Obeying Allah's rules is part of faith.", why: "That is in order that you may have perfect faith in Allah and His Messenger." }
      ]
    },
    {
      slug: "the-limits-of-allah",
      title: "The limits of Allah",
      line: "Allah's limits are what He forbids, so do not cross them.",
      facts: ["Hudud Allah means Allah's limits", "Stay inside them for safety"],
      quote: q58(4),
      source: ik(4, "Ibn Kathir says the limits of Allah are the things He has forbidden, so do not transgress them.", "the things that He has forbidden, so do not transgress them"),
      difficulty: 2,
      questions: [
        { q: "What are the limits of Allah, per Ibn Kathir?", a: "What He has forbidden", wrong: ["Mountains", "City walls", "Borders of land"], why: "The things that He has forbidden, so do not transgress them." },
        { q: "What should we do with these limits?", a: "Not cross them", wrong: ["Test them", "Move them", "Ignore them"], why: "So do not transgress them." },
        { tf: false, q: "Allah's limits are only suggestions.", why: "These are the limits set by Allah... so do not transgress them." }
      ]
    },
    {
      slug: "opposing-allah",
      title: "Opposing Allah",
      line: "Those who oppose Allah and His Messenger will be brought low.",
      facts: ["Nations before were brought low too", "Allah sent down clear ayat"],
      quote: q58(5),
      source: ik(5, "Ibn Kathir says those who defy Allah and His Messenger will be disgraced as those before them were disgraced.", "will be disgraced as those before them were disgraced"),
      difficulty: 2,
      questions: [
        { q: "What happens to those who oppose Allah, in 58:5?", a: "They are disgraced", wrong: ["They win", "They are honored", "Nothing"], why: "Will be disgraced as those before them were disgraced." },
        { q: "What has Allah sent down, in 58:5?", a: "Clear Ayat", wrong: ["Gold", "Armies", "Riddles"], why: "And We have sent down clear Ayat." },
        { tf: true, q: "People before them who opposed Allah were also brought low.", why: "As those before them were disgraced." }
      ]
    },
    {
      slug: "all-gathered-together",
      title: "All gathered together",
      line: "On that Day Allah gathers the first and last generations.",
      facts: ["Everyone from Adam onward", "All in one place"],
      quote: q58(6),
      source: ik(6, "Ibn Kathir says on the Day of Resurrection Allah will gather the early and the latter generations in one area.", "when He will gather the early and the latter generations in one area"),
      difficulty: 2,
      questions: [
        { q: "Who will be gathered, per Ibn Kathir?", a: "The early and latter generations", wrong: ["Only the kings", "Only the young", "Only one nation"], why: "He will gather the early and the latter generations in one area." },
        { q: "What will Allah tell them, in 58:6?", a: "What they did", wrong: ["Their future", "Old stories", "Nothing"], why: "And inform them of what they did." },
        { tf: true, q: "Allah will tell each person all they did, good or bad.", why: "He will tell them all that they did in detail, whether good or evil." }
      ]
    },
    {
      slug: "they-forgot-allah-counted",
      title: "They forgot, Allah counted",
      line: "People forget their deeds, but Allah kept count of them all.",
      facts: ["We forget much of what we did", "Nothing is lost with Allah"],
      quote: q58(6),
      source: ik(6, "Ibn Kathir says Allah recorded and kept all these actions, even though they have forgotten what they did.", "Allah recorded and kept all these actions, even though they have forgotten what they did"),
      difficulty: 2,
      questions: [
        { q: "What did Allah do with their deeds, in 58:6?", a: "Kept account of them", wrong: ["Lost them", "Forgot them", "Threw them away"], why: "Allah has kept account of it, while they have forgotten it." },
        { q: "What did the people do with their deeds?", a: "Forgot them", wrong: ["Wrote them", "Counted them", "Sold them"], why: "Even though they have forgotten what they did." },
        { tf: true, q: "A good deed we forgot is still kept by Allah.", why: "Allah recorded and kept all these actions." }
      ]
    },
    {
      slug: "witness-over-all-things",
      title: "Witness over all things",
      line: "Nothing escapes Allah, and nothing is hidden from Him.",
      facts: ["Ash-Shahid: the Witness", "He sees every matter fully"],
      quote: q58(6),
      source: ik(6, "Ibn Kathir says nothing escapes Allah's knowledge, and no matter is hidden from Him.", "nothing escapes His knowledge, and no matter is hidden from Him"),
      difficulty: 1,
      questions: [
        { q: "How does 58:6 end?", a: "Allah is Witness over all things", wrong: ["Allah is far", "Allah is tired", "Allah is silent"], why: "And Allah is Witness over all things." },
        { q: "What escapes Allah's knowledge?", a: "Nothing", wrong: ["Small things", "Secrets", "Night deeds"], why: "Nothing escapes His knowledge, and no matter is hidden from Him." },
        { tf: false, q: "Some matters are hidden from Allah.", why: "No matter is hidden from Him or escapes His complete observation." }
      ]
    },
    {
      slug: "the-fourth-of-three",
      title: "The fourth of three",
      line: "When three talk in secret, Allah is the fourth with them.",
      facts: ["Najwa means a secret talk", "If five, He is the sixth"],
      quote: q58(7),
      source: ik(7, "Ibn Kathir says Najwa of three means a secret consultation of three, and Allah is their fourth.", "secret consultation of three"),
      difficulty: 2,
      questions: [
        { q: "What does Najwa mean?", a: "A secret talk", wrong: ["A loud speech", "A song", "A letter"], why: "There is no Najwa of three... secret consultation of three." },
        { q: "If three talk in secret, who is the fourth?", a: "Allah", wrong: ["An angel only", "No one", "A guard"], why: "There is no Najwa of three but He is their fourth." },
        { q: "If five talk in secret, Allah is the...?", a: "Sixth", wrong: ["Fifth", "Seventh", "First"], why: "Nor of five but He is their sixth." }
      ]
    },
    {
      slug: "with-them-by-knowledge",
      title: "With them by His knowledge",
      line: "Scholars agree Allah is with them by His knowledge.",
      facts: ["He hears every word they say", "He sees wherever they are"],
      quote: q58(7),
      source: ik(7, "Ibn Kathir says there is a consensus among the scholars that this with refers to Allah's knowledge, along with His hearing and sight.", "there is a consensus among the scholars that this … knowledge"),
      difficulty: 3,
      questions: [
        { q: "What does Allah is with them mean, per scholars?", a: "With them by His knowledge", wrong: ["Sitting with them", "Living with them", "Only watching kings"], why: "There is a consensus among the scholars that this with refers to Allah's knowledge." },
        { q: "Does it matter how many are talking?", a: "No, more or less, He is with them", wrong: ["Yes, only three", "Only five", "Only crowds"], why: "Nor of less than that or more but He is with them wheresoever they may be." },
        { tf: true, q: "Allah hears whispered words as well as loud ones.", why: "Perfectly hearing their speech, whether uttered in public or secret." }
      ]
    },
    {
      slug: "angels-write-it-down",
      title: "Angels write it down",
      line: "Angels record what people say, though Allah knows it better.",
      facts: ["43:80: Our messengers record", "Allah knows more than the record"],
      quote: q58(7),
      source: ik(7, "Ibn Kathir says His angels record all that they say, even though He has better knowledge of it.", "His angels record all that they say, even though He has better knowledge of it"),
      difficulty: 2,
      questions: [
        { q: "Who records what people say?", a: "The angels", wrong: ["The birds", "Their friends", "No one"], why: "His angels record all that they say." },
        { q: "Which ayah says Our messengers are with them to record?", a: "43:80", wrong: ["1:7", "112:1", "2:1"], why: "And Our messengers are by them to record. (43:80)" },
        { tf: true, q: "Allah knows even better than the angels' record.", why: "Even though He has better knowledge of it." }
      ]
    },
    {
      slug: "begins-and-ends-with-knowledge",
      title: "Begins and ends with knowledge",
      line: "Imam Ahmad noted 58:7 opens and closes with Allah's knowledge.",
      facts: ["The ayah opens: Allah knows all", "The ayah closes: All-Knower of everything"],
      quote: q58(7),
      source: ik(7, "Ibn Kathir quotes Imam Ahmad: Allah began 58:7 by mentioning His knowledge and ended it by mentioning His knowledge.", "by mentioning His knowledge and ended it by mentioning His knowledge"),
      difficulty: 3,
      questions: [
        { q: "What did Imam Ahmad notice about 58:7?", a: "It opens and ends with knowledge", wrong: ["It is the longest", "It has no names", "It is about rain"], why: "Allah began the Ayah by mentioning His knowledge and ended it by mentioning His knowledge." },
        { q: "How does 58:7 end?", a: "Allah is All-Knower of everything", wrong: ["Allah is Forgiving", "Allah is Rich", "Allah is Strong"], why: "Verily, Allah is the All-Knower of everything." },
        { tf: true, q: "58:7 says Allah will tell them what they did.", why: "And afterwards on the Day of Resurrection He will inform them of what they did." }
      ]
    }
  ]
};

/** Ayahs 8 to 13: the manners of secret talk and greetings, making room in gatherings, and charity before a private talk. */
const MUJADILA_TWO: DeepUnit = {
  key: "mujadila2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-58",
  name: "Al-Mujadila, ayahs 8 to 13",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Mujadila",
  lessons: [
    {
      slug: "whispers-that-scare",
      title: "Whispers that scare",
      line: "Some people whispered in secret to frighten the believers.",
      facts: ["They were told to stop, but kept on", "A believer would change his path in fear"],
      quote: q58(8),
      source: ik(8, "Ibn Kathir quotes Muqatil: they would speak in secret when a believer passed; the Prophet ﷺ advised them to abandon their evil secret talks.", "they would speak among themselves in secret…advised them to abandon their evil secret talks"),
      difficulty: 2,
      questions: [
        { q: "What were they forbidden from, in 58:8?", a: "Holding secret counsels", wrong: ["Trading", "Praying", "Traveling"], why: "Those who were forbidden to hold secret counsels." },
        { q: "Did they stop when told?", a: "No, they returned to it", wrong: ["Yes, at once", "Only for a day", "They left town"], why: "And afterwards returned to that which they had been forbidden." },
        { tf: true, q: "Their whispers made believers feel unsafe.", why: "When the believer saw this, he feared for his safety and changed the route he was taking." }
      ]
    },
    {
      slug: "sin-and-wrongdoing",
      title: "Sin and wrongdoing",
      line: "Sin harms yourself; wrongdoing harms others.",
      facts: ["Ithm: sin against oneself", "Udwan: wrong against others"],
      quote: q58(8),
      source: ik(8, "Ibn Kathir says sin is what involves themselves, and wrongdoing is what affects others.", "which involves themselves…which effects others"),
      difficulty: 3,
      questions: [
        { q: "What does sin involve, per Ibn Kathir?", a: "Oneself", wrong: ["Only animals", "Only the land", "Nothing"], why: "For sin) which involves themselves." },
        { q: "What does wrongdoing affect?", a: "Other people", wrong: ["Only oneself", "Only the sky", "No one"], why: "And wrongdoing) which effects others." },
        { tf: true, q: "They also plotted disobedience to the Messenger ﷺ.", why: "And conspired together for sin and wrongdoing and disobedience to the Messenger ﷺ." }
      ]
    },
    {
      slug: "kind-in-all-matters",
      title: "Kind in all matters",
      line: "Some greeted the Prophet ﷺ rudely, and he stayed gentle.",
      facts: ["They said As-Samu, death, not Salam", "Allah loves kindness in all matters"],
      quote: q58(8),
      source: hadith("bukhari", "6024", "Aishah", "Sahih", "When some people greeted the Prophet ﷺ with As-Samu Alaikum, meaning death be upon you, and Aishah answered harshly, he said: be calm, Allah loves kindness and leniency in all matters.", "Allah loves that on, should be kind and lenient in all matters"),
      difficulty: 3,
      questions: [
        { q: "What did As-Samu Alaikum mean?", a: "Death be upon you", wrong: ["Peace be upon you", "Good morning", "Welcome"], why: "As-Samu-Alaikum. (death be upon you)." },
        { q: "What did the Prophet ﷺ tell Aishah?", a: "Allah loves kindness in all matters", wrong: ["Shout louder", "Leave the room", "Say nothing ever"], why: "Be calm, O Aisha! Allah loves that on, should be kind and lenient in all matters." },
        { tf: true, q: "58:8 mentions a greeting Allah did not give.", why: "They greet you with a greeting wherewith Allah greets you not." }
      ]
    },
    {
      slug: "and-upon-you",
      title: "And upon you",
      line: "The Prophet ﷺ answered the rude greeting with: and upon you.",
      facts: ["He did not curse back", "A short calm reply was enough"],
      quote: q58(8),
      source: hadith("bukhari", "6024", "Aishah", "Sahih", "The Prophet ﷺ said he had already answered them with: and upon you.", "And upon you"),
      difficulty: 3,
      questions: [
        { q: "How did the Prophet ﷺ reply to them?", a: "And upon you", wrong: ["A long curse", "Nothing at all", "Peace forever"], why: "I have (already) said (to them) And upon you." },
        { q: "What does this teach about answering rudeness?", a: "Stay calm and fair", wrong: ["Insult more", "Fight back", "Mock them"], why: "Be calm, O Aisha! Allah loves that on, should be kind and lenient in all matters." },
        { tf: false, q: "The Prophet ﷺ cursed them back loudly.", why: "I have (already) said (to them) And upon you." }
      ]
    },
    {
      slug: "no-rude-speech",
      title: "No rude speech",
      line: "Allah does not like rudeness and foul speech.",
      facts: ["Even when wronged, speak decently", "Foul words do not suit a believer"],
      quote: q58(8),
      source: ik(8, "Ibn Kathir reports the Prophet ﷺ said: O Aishah, Allah does not like rudeness and foul speech.", "Allah does not like rudeness and foul speech"),
      difficulty: 2,
      questions: [
        { q: "What does Allah not like, per the report?", a: "Rudeness and foul speech", wrong: ["Silence", "Smiling", "Greeting"], why: "Allah does not like rudeness and foul speech." },
        { q: "To whom did the Prophet ﷺ say this?", a: "Aishah", wrong: ["Abu Bakr", "Umar", "Ali"], why: "O A'ishah, Allah does not like rudeness and foul speech." },
        { tf: true, q: "Good manners matter even toward rude people.", why: "Allah does not like rudeness and foul speech." }
      ]
    },
    {
      slug: "why-no-punishment-now",
      title: "Why no punishment now?",
      line: "They mocked: if he were a prophet, Allah would punish us now.",
      facts: ["Allah's delay is not forgetting", "The Hereafter is enough for them"],
      quote: q58(8),
      source: ik(8, "Ibn Kathir says they said within themselves: had he been a Prophet, Allah would have punished us for what we said, so Allah replied that the Hereafter is sufficient for them.", "Had he been a Prophet, Allah would have punished us for what we said"),
      difficulty: 3,
      questions: [
        { q: "What did they say within themselves?", a: "Why does Allah not punish us?", wrong: ["We are sorry", "We believe", "Let us pray"], why: "And say within themselves: Why should Allah punish us not for what we say?" },
        { q: "Why was their thinking wrong?", a: "Allah's delay is not forgetting", wrong: ["Allah cannot see", "They were right", "Words do not count"], why: "Hell will be sufficient for them; they will enter therein." },
        { tf: true, q: "Allah may delay a matter but still knows it.", why: "Had he been a Prophet, Allah would have punished us... Allah the Exalted replied." }
      ]
    },
    {
      slug: "secret-talk-for-good",
      title: "Secret talk for good",
      line: "Believers may talk privately, but only for good and Taqwa.",
      facts: ["Al-Birr means righteousness", "Never plot sin in secret"],
      quote: q58(9),
      source: ik(9, "Ibn Kathir explains 58:9: do not hold evil secret talks, but do it for Al-Birr and Taqwa.", "but do it for Al-Birr and Taqwa"),
      difficulty: 2,
      questions: [
        { q: "For what may believers talk privately?", a: "Righteousness and Taqwa", wrong: ["Gossip", "Plotting", "Mocking"], why: "But do it for Al-Birr and Taqwa." },
        { q: "What must private talk not be for?", a: "Sin and wrongdoing", wrong: ["Planning charity", "Helping others", "Learning"], why: "When you hold secret counsel, do it not for sin and wrongdoing." },
        { tf: true, q: "Planning a good deed quietly is allowed.", why: "But do it for Al-Birr and Taqwa." }
      ]
    },
    {
      slug: "gathered-to-allah",
      title: "Gathered to Allah",
      line: "We will be gathered to Allah, Who recorded every word.",
      facts: ["Everything said is counted", "He judges with full justice"],
      quote: q58(9),
      source: ik(9, "Ibn Kathir says Allah will inform you of all your deeds and statements; He has counted and recorded them and will justly hold you accountable.", "He has counted and recorded them and will justly hold you accountable for them"),
      difficulty: 2,
      questions: [
        { q: "To Whom will we be gathered, in 58:9?", a: "To Allah", wrong: ["To the kings", "To the sea", "To no one"], why: "And have Taqwa of Allah unto Whom you shall be gathered." },
        { q: "What has Allah done with our words?", a: "Counted and recorded them", wrong: ["Forgotten them", "Erased them", "Ignored them"], why: "He has counted and recorded them." },
        { tf: true, q: "Allah will judge our words justly.", why: "And will justly hold you accountable for them." }
      ]
    },
    {
      slug: "whispers-from-shaytan",
      title: "Whispers from Shaytan",
      line: "Evil secret talk comes from Shaytan to make believers sad.",
      facts: ["Shaytan wants believers to grieve", "He cannot harm except by Allah's will"],
      quote: q58(10),
      source: ik(10, "Ibn Kathir says the devil seeks to bother the believers, even though his plots will not harm them except if Allah wills it.", "The devil seeks to bother the believers, even though his plots will not harm the believers, except if Allah wills it"),
      difficulty: 2,
      questions: [
        { q: "Where do evil secret talks come from, in 58:10?", a: "From Shaytan", wrong: ["From angels", "From the wind", "From books"], why: "Secret counsels are only from Shaytan." },
        { q: "What does Shaytan want with them?", a: "To make believers grieve", wrong: ["To help them", "To teach them", "To feed them"], why: "In order that he may cause grief to the believers." },
        { tf: false, q: "Shaytan can harm believers whenever he wants.", why: "But he cannot harm them in the least, except as Allah permits." }
      ]
    },
    {
      slug: "trust-in-allah",
      title: "Trust in Allah",
      line: "If people whisper about you, seek refuge in Allah and trust Him.",
      facts: ["Tawakkul means trusting Allah", "None of it will harm you, Allah willing"],
      quote: q58(10),
      source: ik(10, "Ibn Kathir says those who are the subject of evil whispers should seek refuge in Allah and put their trust in Him.", "should seek refuge in Allah and put his trust in Him"),
      difficulty: 2,
      questions: [
        { q: "What should we do if people whisper about us?", a: "Seek refuge in Allah and trust Him", wrong: ["Whisper back", "Get angry", "Give up"], why: "Should seek refuge in Allah and put his trust in Him." },
        { q: "How does 58:10 end?", a: "In Allah let believers trust", wrong: ["Fear the people", "Trust your wealth", "Trust the crowd"], why: "And in Allah let the believers put their trust." },
        { tf: true, q: "Evil whispers will not harm a trusting believer, Allah willing.", why: "For none of it will harm them, Allah willing." }
      ]
    },
    {
      slug: "do-not-leave-one-out",
      title: "Do not leave one out",
      line: "If three sit together, two should not whisper without the third.",
      facts: ["Whispering can hurt the left-out one", "Wait until more people join"],
      quote: q58(10),
      source: hadith("bukhari", "6290", "Abdullah ibn Mas'ud", "Sahih", "The Prophet ﷺ said when three sit together, no two should hold secret counsel excluding the third, for that would grieve him.", "no two of you should hold secret counsel excluding the third person…for that would grieve him"),
      difficulty: 2,
      questions: [
        { q: "When three sit together, what should two not do?", a: "Whisper without the third", wrong: ["Smile", "Greet him", "Share food"], why: "No two of you should hold secret counsel excluding the third person." },
        { q: "Why not, per Bukhari 6290?", a: "It would grieve him", wrong: ["It is too loud", "It wastes time", "It is boring"], why: "For that would grieve him." },
        { tf: true, q: "Good manners protect others' feelings.", why: "For that would grieve him." }
      ]
    },
    {
      slug: "until-others-join",
      title: "Until others join",
      line: "Two may talk privately once others are there with the third.",
      facts: ["Then he is not left alone", "Islam cares about loneliness"],
      quote: q58(10),
      source: hadith("muslim", "2184", "Abdullah ibn Mas'ud", "Sahih", "The Prophet ﷺ said two should not converse secretly excluding the third until some other people join him, for it may hurt his feelings.", "some other people join him…for it may hurt his feelings"),
      difficulty: 3,
      questions: [
        { q: "When may two talk privately, per Muslim 2184?", a: "When others join the third", wrong: ["Never", "Only at night", "Anytime"], why: "Until some other people join him." },
        { q: "What might whispering do to the third?", a: "Hurt his feelings", wrong: ["Make him rich", "Make him sleep", "Nothing"], why: "For it may hurt his feelings." },
        { tf: true, q: "Islam teaches us to include people nearby.", why: "Two amongst you should not converse secretly between yourselves to the exclusion of the other." }
      ]
    },
    {
      slug: "make-room",
      title: "Make room",
      line: "When asked to make room in gatherings, make room.",
      facts: ["Be kind when sitting together", "Spread out so others can sit"],
      quote: q58(11),
      source: ik(11, "Ibn Kathir says Allah teaches His servants good manners and orders them to be kind to each other when they are sitting together.", "Allah teaches His servants good manners and orders them to be kind to each other when they are sitting together"),
      difficulty: 1,
      questions: [
        { q: "What should we do when asked to make room?", a: "Make room", wrong: ["Ignore it", "Leave angrily", "Take more space"], why: "When you are told to make room in the assemblies, make room." },
        { q: "What does Allah teach in 58:11?", a: "Kind manners in gatherings", wrong: ["How to trade", "How to fight", "How to sleep"], why: "Orders them to be kind to each other when they are sitting together." },
        { tf: true, q: "Making space for others is a good deed.", why: "Make room. Allah will give you room." }
      ]
    },
    {
      slug: "allah-makes-room-for-you",
      title: "Allah makes room for you",
      line: "Make room for others, and Allah will make room for you.",
      facts: ["The reward matches the deed", "Give space, receive space"],
      quote: q58(11),
      source: ik(11, "Ibn Kathir says the reward or recompense depends on the type of action.", "the reward or recompense depends on the type of action"),
      difficulty: 2,
      questions: [
        { q: "What does Allah promise those who make room?", a: "He will give them room", wrong: ["Nothing", "A smaller seat", "A long wait"], why: "Make room. Allah will give you room." },
        { q: "What rule does Ibn Kathir state?", a: "Reward matches the action", wrong: ["Reward is random", "No reward", "Only wealth counts"], why: "The reward or recompense depends on the type of action." },
        { tf: true, q: "Kindness to others brings kindness from Allah.", why: "The reward or recompense depends on the type of action." }
      ]
    },
    {
      slug: "a-house-in-paradise",
      title: "A house in Paradise",
      line: "Whoever builds a masjid, Allah builds him a place in Paradise.",
      facts: ["The reward matches the deed", "Uthman heard this from the Prophet ﷺ"],
      quote: q58(11),
      source: hadith("bukhari", "450", "Uthman ibn Affan", "Sahih", "Uthman said he heard the Prophet ﷺ say: whoever builds a mosque, Allah builds for him a similar place in Paradise.", "Allah would build for him a similar place in Paradise"),
      difficulty: 2,
      questions: [
        { q: "What does Allah build for one who builds a masjid?", a: "A similar place in Paradise", wrong: ["A palace on earth", "A shop", "Nothing"], why: "Allah would build for him a similar place in Paradise." },
        { q: "Who narrated this, in Bukhari 450?", a: "Uthman ibn Affan", wrong: ["Ali", "Anas", "Abu Musa"], why: "I heard Uthman bin Affan saying... I heard the Prophet ﷺ saying." },
        { tf: true, q: "Ibn Kathir uses this to show reward matches the deed.", why: "Indeed, the reward or recompense depends on the type of action." }
      ]
    },
    {
      slug: "help-your-brother",
      title: "Help your brother",
      line: "Allah helps His servant as long as he helps his brother.",
      facts: ["Ease hardship, and Allah eases yours", "Hide faults, and Allah hides yours"],
      quote: q58(11),
      source: hadith("muslim", "2699", "Abu Hurairah", "Sahih", "The Prophet ﷺ said whoever relieves a believer's hardship, Allah relieves his hardship, and Allah helps a servant as long as he helps his brother.", "Allah is at the back of a servant so long as the servant is at the back of his brother"),
      difficulty: 2,
      questions: [
        { q: "When does Allah help a servant, per Muslim 2699?", a: "While he helps his brother", wrong: ["Only when rich", "Never", "Only on Fridays"], why: "Allah is at the back of a servant so long as the servant is at the back of his brother." },
        { q: "What happens if you ease someone's hardship?", a: "Allah eases yours", wrong: ["You lose", "Nothing", "You get tired"], why: "He who finds relief for one who is hard-pressed, Allah would make things easy for him." },
        { tf: true, q: "Hiding a Muslim's faults is rewarded.", why: "He who conceals (the faults) of a Muslim, Allah would conceal his faults." }
      ]
    },
    {
      slug: "dont-take-his-seat",
      title: "Do not take his seat",
      line: "Never make someone stand so you can take his seat.",
      facts: ["Spread out instead", "Respect the place others sit"],
      quote: q58(11),
      source: hadith("bukhari", "6270", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ forbade making a man get up from his seat so another could sit there, but said make room and spread out.", "forbade that a man should be made to get up from his seat so that another might sit on it, but one should make room and spread out"),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ forbid, in Bukhari 6270?", a: "Making someone leave his seat", wrong: ["Sitting down", "Talking", "Greeting"], why: "Forbade that a man should be made to get up from his seat so that another might sit on it." },
        { q: "What should we do instead?", a: "Make room and spread out", wrong: ["Push in", "Stand far away", "Leave"], why: "But one should make room and spread out." },
        { tf: true, q: "Ibn Umar disliked taking a seat someone left for him.", why: "Ibn Umar disliked that a man should get up from his seat and then somebody else sit at his place." }
      ]
    },
    {
      slug: "gatherings-of-remembrance",
      title: "Gatherings of remembrance",
      line: "58:11 came about gatherings where Allah is remembered.",
      facts: ["People held on to their places", "Allah told them to spread out"],
      quote: q58(11),
      source: ik(11, "Ibn Kathir quotes Qatadah: this ayah was revealed about gatherings where Allah is being remembered, when people would not give space to newcomers.", "This Ayah was revealed about gatherings in places where Allah is being remembered"),
      difficulty: 2,
      questions: [
        { q: "Which gatherings was 58:11 about, per Qatadah?", a: "Where Allah is remembered", wrong: ["Markets", "Weddings only", "Games"], why: "This Ayah was revealed about gatherings in places where Allah is being remembered." },
        { q: "Why did some not make room?", a: "Not to lose their places", wrong: ["They were asleep", "They were angry", "No reason"], why: "They would hesitate to offer them space so that they would not loose their places." },
        { tf: true, q: "Making room at a lesson or masjid is part of good manners.", why: "Allah the Exalted commanded them to spread out and make room for each other." }
      ]
    },
    {
      slug: "when-told-to-rise",
      title: "When told to rise",
      line: "Qatadah said: when called to any good, respond.",
      facts: ["Rise up means get up for good", "Answer the call quickly"],
      quote: q58(11),
      source: ik(11, "Ibn Kathir quotes Qatadah on rise up: when you are called to any type of good, then respond.", "When you are called to any type of good, then respond"),
      difficulty: 2,
      questions: [
        { q: "What does rise up mean, per Qatadah?", a: "Respond to any good", wrong: ["Go home", "Stand still", "Leave Islam"], why: "When you are called to any type of good, then respond." },
        { q: "What does 58:11 say when told to rise?", a: "Then rise up", wrong: ["Then sit", "Then argue", "Then sleep"], why: "And when you are told to rise up, then rise up." },
        { tf: true, q: "Answering a call to help is part of 58:11.", why: "When you are called to any type of good, then respond." }
      ]
    },
    {
      slug: "humility-raises-you",
      title: "Humility raises you",
      line: "Giving up your seat does not lower you; Allah raises you.",
      facts: ["Humility never loses honor", "Allah never wastes a good deed"],
      quote: q58(11),
      source: ik(11, "Ibn Kathir says making room does not diminish your honor; he who humbles himself before the command of his Lord, Allah will elevate his status.", "he who humbles himself by and before the command of his Lord, then Allah will elevate his status"),
      difficulty: 3,
      questions: [
        { q: "Does making room lower your honor?", a: "No, it raises it", wrong: ["Yes, always", "Only for the young", "Only in public"], why: "This will increase his virtue and status with Allah." },
        { q: "Whom does Allah raise, per Ibn Kathir?", a: "One who humbles himself", wrong: ["The proud", "The loud", "The rich only"], why: "He who humbles himself by and before the command of his Lord, then Allah will elevate his status." },
        { tf: true, q: "Allah never lets a good deed be lost.", why: "Allah the Exalted will never make his good deed be lost." }
      ]
    },
    {
      slug: "knowledge-raises-ranks",
      title: "Knowledge raises ranks",
      line: "Allah raises in ranks the believers and those given knowledge.",
      facts: ["Faith raises a person", "Knowledge raises a person more"],
      quote: q58(11),
      source: ik(11, "Ibn Kathir quotes 58:11: Allah will exalt in degrees those of you who believe, and those who have been granted knowledge.", "will exalt in degrees those of you who believe, and those who have been granted knowledge"),
      difficulty: 2,
      questions: [
        { q: "Whom does Allah raise in degrees, in 58:11?", a: "Believers and people of knowledge", wrong: ["The tallest", "The richest", "The fastest"], why: "Allah will exalt in degrees those of you who believe, and those who have been granted knowledge." },
        { q: "How does 58:11 end?", a: "Allah is Well-Acquainted with what you do", wrong: ["Allah is Rich", "Allah is First", "Allah is Severe"], why: "And Allah is Well-Acquainted with what you do." },
        { tf: true, q: "Learning Islam is a way to be raised by Allah.", why: "And those who have been granted knowledge." }
      ]
    },
    {
      slug: "raised-by-this-book",
      title: "Raised by this Book",
      line: "A freed slave who knew the Quran was put in charge.",
      facts: ["Umar asked why a freed slave led", "Knowing the Quran raised him"],
      quote: q58(11),
      source: hadith("muslim", "817", "Umar ibn al-Khattab", "Sahih", "Umar asked why Ibn Abza, a freed slave, was put in charge; told he knew the Book of Allah, Umar said the Prophet ﷺ said Allah raises some peoples by this Book and lowers others.", "He is well versed In the Book of Allah…By this Book, Allah would exalt some peoples and degrade others"),
      difficulty: 3,
      questions: [
        { q: "Who was put in charge of the valley people?", a: "Ibn Abza, a freed slave", wrong: ["A rich chief", "A poet", "A soldier"], why: "Ibn Abza... He is one of our freed slaves." },
        { q: "Why was he chosen?", a: "He knew the Book of Allah", wrong: ["He was rich", "He was tall", "He was old"], why: "He is well versed In the Book of Allah." },
        { q: "What did the Prophet ﷺ say about this Book?", a: "Allah raises some by it", wrong: ["It is for scholars only", "It is too hard", "It is just history"], why: "By this Book, Allah would exalt some peoples and degrade others." }
      ]
    },
    {
      slug: "charity-before-private-talk",
      title: "Charity before private talk",
      line: "Before a private talk with the Prophet ﷺ, they gave charity.",
      facts: ["The charity purified them", "Allah honored the Prophet's ﷺ time"],
      quote: q58(12),
      source: ik(12, "Ibn Kathir says Allah commanded those who wanted to speak privately with the Prophet ﷺ to give charity beforehand, to cleanse and purify them.", "to give away charity beforehand so that his charity cleanses and purifies him"),
      difficulty: 2,
      questions: [
        { q: "What was required before a private talk, in 58:12?", a: "Giving some charity", wrong: ["Fasting a week", "Bringing a gift", "Nothing"], why: "Spend something in charity before your private consultation." },
        { q: "What did the charity do, per Ibn Kathir?", a: "Cleansed and purified them", wrong: ["Paid the Prophet ﷺ", "Bought a seat", "Nothing"], why: "So that his charity cleanses and purifies him." },
        { tf: true, q: "58:12 says this is better and purer for you.", why: "That will be better and purer for you." }
      ]
    },
    {
      slug: "easy-for-the-poor",
      title: "Easy for the poor",
      line: "Those who could not afford it were excused.",
      facts: ["Only the able had to give", "Allah is Oft-Forgiving, Most Merciful"],
      quote: q58(12),
      source: ik(12, "Ibn Kathir says Allah only commanded those who are financially able to give this charity.", "He only commanded those who are financially able to give this type of charity"),
      difficulty: 2,
      questions: [
        { q: "Who had to give this charity?", a: "Only those able to", wrong: ["Everyone", "Only the poor", "Only women"], why: "He only commanded those who are financially able to give this type of charity." },
        { q: "What if someone could not find the means?", a: "Allah forgives him", wrong: ["He is punished", "He must borrow", "He must leave"], why: "But if you find not... then verily, Allah is Oft-Forgiving, Most Merciful." },
        { tf: false, q: "The poor were blamed for not giving.", why: "He only commanded those who are financially able." }
      ]
    },
    {
      slug: "too-many-questions",
      title: "Too many questions",
      line: "People asked the Prophet ﷺ so much that it became hard on him.",
      facts: ["Allah lightened his burden", "Ask what you truly need"],
      quote: q58(12),
      source: ik(12, "Ibn Kathir quotes Ibn Abbas: the Muslims kept asking the Prophet ﷺ questions until it became difficult on him, so Allah lightened his burden.", "questions until it became difficult on him"),
      difficulty: 3,
      questions: [
        { q: "Why was the charity rule given, per Ibn Abbas?", a: "Too many questions burdened the Prophet ﷺ", wrong: ["To build a masjid", "To pay soldiers", "To buy food"], why: "The Muslims kept asking Allah's Messenger questions until it became difficult on him." },
        { q: "What did Allah want, per Ibn Abbas?", a: "To lighten the Prophet's ﷺ burden", wrong: ["To stop all talk", "To raise money", "To test kings"], why: "Allah wanted to lighten the burden from His Prophet." },
        { tf: true, q: "Respecting a teacher's time is good manners.", why: "Allah wanted to lighten the burden from His Prophet." }
      ]
    },
    {
      slug: "allah-made-it-easy",
      title: "Allah made it easy",
      line: "Soon Allah lifted the rule and made things easy.",
      facts: ["58:13 removed the duty", "Pray, give zakah, obey instead"],
      quote: q58(13),
      source: ik(13, "Ibn Kathir quotes Ibn Abbas: after 58:13 came, Allah made things easy and lenient for them.", "Thus Allah made things easy and lenient for them"),
      difficulty: 2,
      questions: [
        { q: "What did 58:13 do to the charity rule?", a: "Lifted it", wrong: ["Doubled it", "Kept it forever", "Made it harder"], why: "Therefore, Allah abrogated the obligation of giving this charity." },
        { q: "What were they told to do instead?", a: "Pray, give Zakah, obey", wrong: ["Stop asking", "Leave Madinah", "Fast a year"], why: "Then perform Salah and give Zakah and obey Allah and His Messenger." },
        { tf: true, q: "Qatadah said the rule lasted only about an hour.", why: "Was abrogated after being in effect for only one hour of a day." }
      ]
    },
    {
      slug: "respect-stayed",
      title: "The respect stayed",
      line: "The charity rule was lifted, but respect for him ﷺ remains.",
      facts: ["As-Sa'di explains", "A means, not the goal"],
      quote: q58(13),
      source: saadi(58, 13, "As-Sa'di says Allah made it easy and lifted the charity before private talk, but honouring and respecting the Messenger ﷺ was not lifted, because the charity was only a means to that respect.", "وبقي التعظيم للرسول والاحترام بحاله لم ينسخ"),
      difficulty: 3,
      questions: [
        { q: "What stayed after the charity rule was lifted?", a: "Respect for the Messenger ﷺ", wrong: ["The charity", "Nothing", "Private talks banned"], why: "The honour and respect stayed and was not lifted, says as-Sa'di." },
        { q: "Why was the charity rule given, per as-Sa'di?", a: "To teach respect", wrong: ["To collect money", "To stop all talk", "To punish"], why: "It was a means; the goal was good manners with him." },
        { tf: true, q: "Allah saw the charity was hard and made it easy.", why: "As-Sa'di on 58:13." }
      ]
    },
    {
      slug: "ali-acted-on-it",
      title: "Ali acted on it",
      line: "Ali said only he acted on 58:12 before it was lifted.",
      facts: ["He was quick to obey", "The rule did not last long"],
      quote: q58(13),
      source: ik(13, "Ibn Kathir quotes Mujahid that Ali said: no one except me implemented this ayah, until it was lifted.", "No one except me implemented this Ayah, until it was abrogated"),
      difficulty: 3,
      questions: [
        { q: "Who acted on 58:12 before it was lifted?", a: "Ali bin Abi Talib", wrong: ["Abu Lahab", "No one", "Everyone"], why: "No one except me implemented this Ayah, until it was abrogated." },
        { q: "What does this show about Ali?", a: "He hurried to obey", wrong: ["He was rich", "He was lazy", "He refused"], why: "No one except me implemented this Ayah." },
        { tf: true, q: "58:13 ends: Allah is All-Aware of what you do.", why: "And Allah is All-Aware of what you do." }
      ]
    }
  ]
};

/** Ayahs 14 to 22: the hypocrites and their false oaths, the party of Shaytan, and the party of Allah. */
const MUJADILA_THREE: DeepUnit = {
  key: "mujadila3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-58",
  name: "Al-Mujadila, ayahs 14 to 22",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Mujadila",
  lessons: [
    {
      slug: "secret-allies",
      title: "Secret allies",
      line: "Some hypocrites secretly helped those who opposed Allah.",
      facts: ["They showed faith in public", "In secret they sided with the enemy"],
      quote: q58(14),
      source: ik(14, "Ibn Kathir says Allah chastises the hypocrites for secretly aiding the disbelievers, though they truly belonged to neither side.", "secretly aiding and supporting the disbelievers"),
      difficulty: 2,
      questions: [
        { q: "Whom does 58:14 speak about?", a: "The hypocrites", wrong: ["The angels", "The Prophets", "The scholars"], why: "Allah chastises the hypocrites for secretly aiding and supporting the disbelievers." },
        { q: "How did they help the disbelievers?", a: "In secret", wrong: ["Openly in war", "With prayer", "Not at all"], why: "Secretly aiding and supporting the disbelievers." },
        { tf: true, q: "They took as friends a people who earned Allah's anger.", why: "Those who take as friends a people upon whom is the wrath of Allah." }
      ]
    },
    {
      slug: "neither-side",
      title: "Neither of you nor of them",
      line: "The hypocrites truly belonged to no side at all.",
      facts: ["Not with the believers", "Not truly with their allies either"],
      quote: q58(14),
      source: ik(14, "Ibn Kathir links this to 4:143, which describes them as swaying between this and that.", "swaying between this and that, belonging neither to these nor to those"),
      difficulty: 3,
      questions: [
        { q: "Which ayah does Ibn Kathir link to 58:14?", a: "4:143", wrong: ["2:255", "112:1", "36:1"], why: "Swaying between this and that, belonging neither to these nor to those. (4:143)" },
        { q: "How does 4:143 describe them?", a: "Swaying between two sides", wrong: ["Firm in faith", "Brave in battle", "Always silent"], why: "Swaying between this and that." },
        { tf: false, q: "The hypocrites were fully with the believers.", why: "They are neither of you nor of them." }
      ]
    },
    {
      slug: "the-ghamus-oath",
      title: "The Ghamus oath",
      line: "Swearing by Allah while knowing you lie is called Al-Ghamus.",
      facts: ["They swore they were believers", "They knew their oath was false"],
      quote: q58(14),
      source: ik(14, "Ibn Kathir says the hypocrites lie in their vows knowing they lie, which is called the vow of Al-Ghamus.", "knowing that they are lying, which is called the vow of Al-Ghamus"),
      difficulty: 3,
      questions: [
        { q: "What is a knowingly false oath called?", a: "Al-Ghamus", wrong: ["Al-Kawthar", "Al-Furqan", "Al-Ihsan"], why: "Knowing that they are lying, which is called the vow of Al-Ghamus." },
        { q: "What did the hypocrites swear to the Messenger ﷺ?", a: "That they were believers", wrong: ["That they were traders", "That they would travel", "That they were ill"], why: "They swore to him by Allah that they were believers." },
        { tf: true, q: "They knew they were lying when they swore.", why: "And they swear to a lie while they know." }
      ]
    },
    {
      slug: "among-the-biggest-sins",
      title: "Among the biggest sins",
      line: "The Prophet ﷺ counted the Ghamus oath among the biggest sins.",
      facts: ["Shirk is the first one listed", "A false oath on purpose is listed too"],
      quote: q58(14),
      source: hadith("bukhari", "6675", "Abdullah ibn Amr", "Sahih", "The Prophet ﷺ listed the biggest sins: joining others with Allah, being undutiful to parents, killing unlawfully, and the Ghamus oath.", "The biggest sins are…to take an oath Al-Ghamus"),
      difficulty: 3,
      questions: [
        { q: "What sin did the Prophet ﷺ list first?", a: "Joining others with Allah", wrong: ["Lying", "Being late", "Eating fast"], why: "The biggest sins are: To join others in worship with Allah." },
        { q: "Which oath is among the biggest sins?", a: "Al-Ghamus", wrong: ["An oath of kindness", "An oath to pray", "Any promise kept"], why: "And to take an oath Al-Ghamus." },
        { tf: true, q: "Being undutiful to parents is among the biggest sins.", why: "To be undutiful to one's parents." }
      ]
    },
    {
      slug: "three-signs",
      title: "Three signs of a hypocrite",
      line: "The Prophet ﷺ named three signs of a hypocrite to avoid.",
      facts: ["Lying when speaking", "Breaking promises, betraying trust"],
      quote: q58(14),
      source: hadith("bukhari", "33", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said the signs of a hypocrite are three: he lies when he speaks, breaks his promises, and betrays a trust.", "The signs of a hypocrite are three"),
      difficulty: 2,
      questions: [
        { q: "How many signs of a hypocrite are in Bukhari 33?", a: "Three", wrong: ["One", "Seven", "Ten"], why: "The signs of a hypocrite are three." },
        { q: "What does a hypocrite do when he speaks?", a: "He tells a lie", wrong: ["He whispers", "He sings", "He stays quiet"], why: "Whenever he speaks, he tells a lie." },
        { tf: true, q: "Breaking promises is a sign of a hypocrite.", why: "Whenever he promises, he always breaks it." }
      ]
    },
    {
      slug: "one-trait-at-a-time",
      title: "One trait at a time",
      line: "Even one trait of hypocrisy should be given up.",
      facts: ["Four traits make a pure hypocrite", "Having one means work to drop it"],
      quote: q58(14),
      source: hadith("bukhari", "34", "Abdullah ibn Amr", "Sahih", "The Prophet ﷺ said whoever has four traits is a pure hypocrite, and whoever has one has a trait of hypocrisy until he gives it up.", "unless and until he gives it up"),
      difficulty: 4,
      questions: [
        { q: "How many traits make a pure hypocrite?", a: "Four", wrong: ["Two", "Nine", "Twelve"], why: "Whoever has the following four (characteristics) will be a pure hypocrite." },
        { q: "What should someone with one trait do?", a: "Give it up", wrong: ["Hide it", "Ignore it", "Teach it"], why: "Unless and until he gives it up." },
        { tf: true, q: "Betraying a trust is one of the four traits.", why: "Whenever he is entrusted, he betrays." }
      ]
    },
    {
      slug: "deceit-and-betrayal",
      title: "Deceit and betrayal",
      line: "Allah warned them because they deceived the believers.",
      facts: ["They helped the disbelievers", "They betrayed the believers"],
      quote: q58(15),
      source: ik(15, "Ibn Kathir says the punishment is on account of their evil deeds, their support of the disbelievers, and their deceit and betrayal of the believers.", "their deceit and betrayal of the believers"),
      difficulty: 2,
      questions: [
        { q: "Whom did the hypocrites betray?", a: "The believers", wrong: ["Only strangers", "Only animals", "No one"], why: "Their deceit and betrayal of the believers." },
        { q: "How does 58:15 describe their deeds?", a: "Evil indeed", wrong: ["Small and harmless", "Brave", "Forgotten"], why: "Evil indeed is that which they used to do." },
        { tf: true, q: "Ibn Kathir names their support of the disbelievers.", why: "Their aid and support of the disbelievers." }
      ]
    },
    {
      slug: "oaths-as-a-shield",
      title: "Oaths as a shield",
      line: "They hid their disbelief behind false oaths, like a shield.",
      facts: ["Junnah means a screen or shield", "Their oaths hid what was inside"],
      quote: q58(16),
      source: ik(16, "Ibn Kathir says they pretended to be believers and hid disbelief under the shield of their false oaths.", "concealed disbelief under the shield of their false oaths"),
      difficulty: 2,
      questions: [
        { q: "What did they use as a screen?", a: "Their oaths", wrong: ["Their tents", "Their swords", "Their camels"], why: "They have made their oaths a screen." },
        { q: "What did the oaths hide?", a: "Their disbelief", wrong: ["Their money", "Their food", "Their faces"], why: "Concealed disbelief under the shield of their false oaths." },
        { tf: true, q: "They pretended to be believers.", why: "The hypocrites pretended to be believers." }
      ]
    },
    {
      slug: "blocking-the-path",
      title: "Blocking the path",
      line: "Their false oaths fooled people and kept some from Islam.",
      facts: ["Many trusted their oaths", "Some were held back from Allah's path"],
      quote: q58(16),
      source: ik(16, "Ibn Kathir says many did not know their true stance and were deceived by their oaths, so some were hindered from Allah's path.", "Many were unaware of their true stance and were thus deceived by their oaths"),
      difficulty: 3,
      questions: [
        { q: "What happened to people who trusted them?", a: "They were deceived", wrong: ["They grew rich", "They moved away", "Nothing at all"], why: "Many were unaware of their true stance and were thus deceived by their oaths." },
        { q: "What did the hypocrites hinder people from?", a: "The path of Allah", wrong: ["The market", "The sea", "Their homes"], why: "Thus they hinder (others) from the path of Allah." },
        { tf: false, q: "Everyone knew the hypocrites were lying.", why: "Many were unaware of their true stance." }
      ]
    },
    {
      slug: "honor-allahs-name",
      title: "Honor Allah's Name",
      line: "Swearing falsely by Allah makes light of His mighty Name.",
      facts: ["An oath by Allah is serious", "Lying in it is a great wrong"],
      quote: q58(16),
      source: ik(16, "Ibn Kathir says their humiliating punishment is for belittling swearing by the Mighty Name of Allah while lying.", "belittling the significance of swearing by the Mighty Name of Allah"),
      difficulty: 3,
      questions: [
        { q: "What did they belittle?", a: "Swearing by Allah's Name", wrong: ["Eating dates", "Visiting friends", "Building houses"], why: "Belittling the significance of swearing by the Mighty Name of Allah." },
        { q: "What kind of torment does 58:16 name?", a: "A humiliating torment", wrong: ["A short delay", "A small fine", "No torment"], why: "So they shall have a humiliating torment." },
        { tf: true, q: "They lied while hiding betrayal.", why: "While lying and concealing betrayal." }
      ]
    },
    {
      slug: "wealth-cannot-save",
      title: "Wealth cannot save",
      line: "Children and wealth will not help anyone against Allah.",
      facts: ["Possessions cannot stop Allah's decree", "Only faith and good deeds help"],
      quote: q58(17),
      source: ik(17, "Ibn Kathir says none of their possessions can avert the affliction when it is sent to them.", "none of their possessions can avert the affliction"),
      difficulty: 2,
      questions: [
        { q: "What two things avail them nothing?", a: "Children and wealth", wrong: ["Sun and moon", "Food and drink", "Rain and wind"], why: "Their children and their wealth will avail them nothing against Allah." },
        { q: "Can possessions avert Allah's affliction?", a: "No, none of them can", wrong: ["Yes, gold can", "Only big houses", "Only many sons"], why: "None of their possessions can avert the affliction." },
        { tf: false, q: "Rich hypocrites will be safe on that Day.", why: "Their children and their wealth will avail them nothing against Allah." }
      ]
    },
    {
      slug: "none-left-out",
      title: "None left out",
      line: "On Judgment Day, Allah raises everyone and misses no one.",
      facts: ["All are gathered together", "Not a single person is forgotten"],
      quote: q58(18),
      source: ik(18, "Ibn Kathir says on the Day of Resurrection Allah will gather them all together and leave none of them out.", "He will gather them all together and leave none of them out"),
      difficulty: 1,
      questions: [
        { q: "Who will Allah resurrect?", a: "All of them together", wrong: ["Only kings", "Only the young", "Only a few"], why: "On the Day when Allah will resurrect them all together." },
        { q: "Will anyone be left out?", a: "No one", wrong: ["Some sleepers", "The very old", "Those at sea"], why: "And leave none of them out." },
        { tf: true, q: "That Day is the Day of Resurrection.", why: "Referring to the Day of Resurrection." }
      ]
    },
    {
      slug: "swearing-to-allah",
      title: "Swearing even to Allah",
      line: "They will even swear falsely to Allah on that Day.",
      facts: ["They claim they were guided", "They think their oaths will help"],
      quote: q58(18),
      source: ik(18, "Ibn Kathir says they will swear to Allah that they followed the guidance, just as they swore to the believers in this life.", "will swear to Allah the Exalted and Most Honored that they were following the guidance"),
      difficulty: 3,
      questions: [
        { q: "What will they swear to Allah?", a: "That they were guided", wrong: ["That they were kings", "That they never lived", "That they forgot"], why: "That they were following the guidance and the correct path." },
        { q: "What do they think about their oaths?", a: "That the oaths will help them", wrong: ["That oaths are silly", "That oaths are lost", "Nothing at all"], why: "The hypocrites will think that their vows will help them with Allah." },
        { tf: true, q: "Allah calls them liars.", why: "Verily, they are liars!" }
      ]
    },
    {
      slug: "lies-that-grew",
      title: "Lies that grew",
      line: "False beliefs grew in them bit by bit until they fooled them.",
      facts: ["As-Sa'di explains", "Little by little"],
      quote: q58(18),
      source: saadi(58, 18, "As-Sa'di says the hypocrites will even swear to Allah, because their disbelief and false beliefs settled in their minds little by little until they fooled them into thinking they had something.", "لم تزل ترسخ في أذهانهم شيئا فشيئا، حتى غرتهم"),
      difficulty: 3,
      questions: [
        { q: "Why will hypocrites swear even to Allah, per as-Sa'di?", a: "Their lies grew until they believed them", wrong: ["They are truthful", "They forgot to pray", "They are angels"], why: "Their false beliefs settled little by little until they fooled them, says as-Sa'di." },
        { q: "How did the false beliefs settle in them?", a: "Little by little", wrong: ["All at once", "Never", "By a dream"], why: "Bit by bit, until they were fooled." },
        { tf: true, q: "Lies will not work with Allah on Judgment Day.", why: "As-Sa'di on 58:18." }
      ]
    },
    {
      slug: "live-on-a-path",
      title: "Live on a path",
      line: "People are raised on the path they lived and died on.",
      facts: ["Habits in life shape the end", "Choose a good path early"],
      quote: q58(18),
      source: ik(18, "Ibn Kathir says whoever lives following a certain path will most likely die on it, and be raised upon it.", "those who live following on a certain path will most likely die while on it"),
      difficulty: 3,
      questions: [
        { q: "On what path does a person usually die?", a: "The one he lived on", wrong: ["A random one", "A brand new one", "No path"], why: "Those who live following on a certain path will most likely die while on it." },
        { q: "How will the hypocrites be resurrected?", a: "Upon their path", wrong: ["As angels", "As children", "With no memory"], why: "Thus, they will be resurrected upon their path." },
        { tf: true, q: "Good habits in life matter for the end.", why: "Those who live following on a certain path will most likely die while on it." }
      ]
    },
    {
      slug: "made-to-forget",
      title: "Made to forget",
      line: "Shaytan took over their hearts until they forgot Allah.",
      facts: ["Istahwadha means overpowered", "Forgetting Allah is the loss"],
      quote: q58(19),
      source: ik(19, "Ibn Kathir says Shaytan took over their hearts until he made them forget Allah, and this is what he does to those he controls.", "Shaytan has taken over their hearts to the point that he made them forget Allah"),
      difficulty: 2,
      questions: [
        { q: "What did Shaytan make them forget?", a: "The remembrance of Allah", wrong: ["Their names", "Their homes", "Their food"], why: "So he has made them forget the remembrance of Allah." },
        { q: "What did Shaytan take over?", a: "Their hearts", wrong: ["Their lands", "Their animals", "Their tents"], why: "Shaytan has taken over their hearts." },
        { tf: true, q: "Shaytan does this to those he controls.", why: "This is what the devil does to those whom he controls." }
      ]
    },
    {
      slug: "living-heart",
      title: "A living heart",
      line: "Remembering Allah is like life; forgetting Him is like death.",
      facts: ["Dhikr keeps the heart alive", "Forgetting Allah dulls the heart"],
      quote: q58(19),
      source: hadith("bukhari", "6407", "Abu Musa", "Sahih", "The Prophet ﷺ compared one who praises his Lord and one who does not to a living creature compared with a dead one.", "is that of a living creature compared to a dead one"),
      difficulty: 3,
      questions: [
        { q: "One who remembers Allah is like what?", a: "A living creature", wrong: ["A stone", "A cloud", "A tree stump"], why: "Is that of a living creature compared to a dead one." },
        { q: "One who does not remember Allah is like what?", a: "A dead one", wrong: ["A king", "A bird", "A river"], why: "A living creature compared to a dead one." },
        { tf: true, q: "Remembering Allah protects from Shaytan's grip.", why: "Shaytan made them forget the remembrance of Allah." }
      ]
    },
    {
      slug: "party-of-shaytan",
      title: "The party of Shaytan",
      line: "Those Shaytan controls and who forget Allah are his party.",
      facts: ["Hizb means party or group", "Allah calls them the losers"],
      quote: q58(19),
      source: ik(19, "Ibn Kathir says the party of Shaytan are those controlled by the devil who, as a result, forgot the remembrance of Allah.", "those who are controlled by the devil and, as a result, forgot the remembrance of Allah"),
      difficulty: 2,
      questions: [
        { q: "Who is the party of Shaytan?", a: "Those he controls", wrong: ["All travelers", "All traders", "The angels"], why: "Referring to those who are controlled by the devil." },
        { q: "What will the party of Shaytan be?", a: "The losers", wrong: ["The winners", "The leaders", "The richest"], why: "Verily, it is the party of Shaytan that will be the losers!" },
        { tf: true, q: "They forgot the remembrance of Allah.", why: "As a result, forgot the remembrance of Allah." }
      ]
    },
    {
      slug: "far-from-guidance",
      title: "Far from guidance",
      line: "Those who oppose Allah stand far from guidance.",
      facts: ["They are among the most humiliated", "Guidance is in another place"],
      quote: q58(20),
      source: ik(20, "Ibn Kathir says those who defy Allah and His Messenger are in one area, while the guidance is in another area.", "are in one area, while the guidance is in another area"),
      difficulty: 2,
      questions: [
        { q: "Where does 58:20 place those who oppose Allah?", a: "Among the most humiliated", wrong: ["Among the honored", "Among the leaders", "Among the guided"], why: "They will be among those most humiliated." },
        { q: "Where is guidance, per Ibn Kathir?", a: "In another area", wrong: ["With the stubborn", "Nowhere", "Only in cities"], why: "While the guidance is in another area." },
        { tf: true, q: "Their humiliation is in this life and the next.", why: "They are the humiliated ones in this life and the Hereafter." }
      ]
    },
    {
      slug: "victory-is-written",
      title: "Victory is written",
      line: "Allah decreed that He and His Messengers will prevail.",
      facts: ["The decree cannot be changed", "Victory is for the believers too"],
      quote: q58(21),
      source: ik(21, "Ibn Kathir says Allah decreed that final victory is for Him, His Book, His Messengers and the faithful believers.", "final victory is for Him, His Book, His Messengers and the faithful believers"),
      difficulty: 2,
      questions: [
        { q: "Who shall be victorious, in 58:21?", a: "Allah and His Messengers", wrong: ["The hypocrites", "The richest", "Shaytan"], why: "Verily, I and My Messengers shall be the victorious." },
        { q: "Can this decree be changed?", a: "No, never", wrong: ["Yes, by kings", "Only by armies", "Every year"], why: "Which can never be resisted, changed or prevented." },
        { tf: true, q: "The faithful believers share in the final victory.", why: "Final victory is for Him, His Book, His Messengers and the faithful believers." }
      ]
    },
    {
      slug: "all-powerful-almighty",
      title: "All-Powerful, Almighty",
      line: "Allah is Qawiyy and Aziz, so His decree always wins.",
      facts: ["Qawiyy: All-Powerful", "Aziz: Almighty"],
      quote: q58(21),
      source: ik(21, "Ibn Kathir says the final triumph and victory are for the believers in this life and the Hereafter.", "the final triumph and victory are for the believers in this life and the Hereafter"),
      difficulty: 2,
      questions: [
        { q: "Which two Names end 58:21?", a: "All-Powerful, Almighty", wrong: ["Forgiving, Merciful", "Hearing, Seeing", "First, Last"], why: "Verily, Allah is All-Powerful, Almighty." },
        { q: "Where is the believers' final triumph?", a: "This life and the Hereafter", wrong: ["Only this life", "Only in dreams", "Nowhere"], why: "The final triumph and victory are for the believers in this life and the Hereafter." },
        { tf: true, q: "Ibn Kathir links 58:21 to 40:51.", why: "We will indeed make victorious Our Messengers and those who believe. (40:51)" }
      ]
    },
    {
      slug: "faith-comes-first",
      title: "Faith comes first",
      line: "A believer gives no loyalty to those at war with Allah.",
      facts: ["Not even close relatives who oppose Allah", "Loyalty to Allah comes first"],
      quote: q58(22),
      source: ik(22, "Ibn Kathir says this means do not befriend the deniers who oppose Allah, even if they are among the closest relatives.", "not befriend the deniers, even if they are among the closest relatives"),
      difficulty: 3,
      questions: [
        { q: "Whom do true believers not befriend?", a: "Those who oppose Allah", wrong: ["Their neighbors", "All strangers", "Other Muslims"], why: "Making friendship with those who oppose Allah and His Messenger." },
        { q: "Does this hold even for close relatives?", a: "Yes, even them", wrong: ["No, never", "Only for cousins", "Only for friends"], why: "Even if they are among the closest relatives." },
        { tf: true, q: "58:22 names fathers, sons, brothers and kindred.", why: "Even though they were their fathers or their sons or their brothers or their kindred." }
      ]
    },
    {
      slug: "loved-most",
      title: "Loved the most",
      line: "Faith is complete when the Prophet ﷺ is loved above everyone.",
      facts: ["More than father and children", "More than all mankind"],
      quote: q58(22),
      source: hadith("bukhari", "15", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said none of you has faith until he loves him more than his father, his children and all mankind.", "loves me more than his father, his children and all mankind"),
      difficulty: 3,
      questions: [
        { q: "Whom must a believer love most among people?", a: "The Prophet ﷺ", wrong: ["His neighbor", "His teacher", "A king"], why: "None of you will have faith till he loves me more than his father, his children and all mankind." },
        { q: "Who narrated Bukhari 15?", a: "Anas ibn Malik", wrong: ["Abu Musa", "Aishah", "Umar"], why: "Narrated Anas." },
        { tf: true, q: "This love is more than for one's own children.", why: "More than his father, his children and all mankind." }
      ]
    },
    {
      slug: "sweetness-of-faith",
      title: "The sweetness of faith",
      line: "Three qualities let a person taste the sweetness of faith.",
      facts: ["Allah and His Messenger dearest", "Loving others for Allah"],
      quote: q58(22),
      source: hadith("bukhari", "16", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said whoever has three qualities tastes the sweetness of faith, first that Allah and His Messenger are dearer than anything else.", "Allah and His Apostle become dearer than anything else"),
      difficulty: 3,
      questions: [
        { q: "How many qualities bring faith's sweetness?", a: "Three", wrong: ["One", "Five", "Ten"], why: "Whoever possesses the following three qualities will have the sweetness (delight) of faith." },
        { q: "Who should be dearer than anything else?", a: "Allah and His Messenger", wrong: ["Money", "Fame", "Sports"], why: "The one to whom Allah and His Apostle become dearer than anything else." },
        { tf: true, q: "Loving a person only for Allah is one quality.", why: "Who loves a person and he loves him only for Allah's sake." }
      ]
    },
    {
      slug: "faith-written-in-hearts",
      title: "Faith written in hearts",
      line: "Allah wrote faith in their hearts and made it dear to them.",
      facts: ["As-Suddi: He placed faith there", "Happiness lives in such hearts"],
      quote: q58(22),
      source: ik(22, "Ibn Kathir quotes As-Suddi that He has placed faith in their hearts, and says Allah made faith dear to their hearts.", "He has placed faith in their hearts"),
      difficulty: 3,
      questions: [
        { q: "What did Allah write in their hearts?", a: "Faith", wrong: ["Fear of people", "Love of money", "Their names"], why: "For such He has written faith in their hearts." },
        { q: "Who explained it as placing faith in hearts?", a: "As-Suddi", wrong: ["Muqatil", "Mujahid", "Qatadah"], why: "As-Suddi said... He has placed faith in their hearts." },
        { tf: true, q: "Allah made faith dear to their hearts.", why: "Made faith dear to their hearts and happiness reside therein." }
      ]
    },
    {
      slug: "strengthened-by-allah",
      title: "Strengthened by Allah",
      line: "Allah supported them with a Ruh from Himself.",
      facts: ["Ibn Abbas: He gave them strength", "Help comes only from Allah"],
      quote: q58(22),
      source: ik(22, "Ibn Kathir quotes Ibn Abbas that being strengthened with Ruh from Himself means He gave them strengths.", "He gave them strengths"),
      difficulty: 3,
      questions: [
        { q: "With what did Allah strengthen them?", a: "Ruh from Himself", wrong: ["Gold and silver", "Big armies", "Tall walls"], why: "And strengthened them with Ruh from Himself." },
        { q: "How did Ibn Abbas explain it?", a: "He gave them strengths", wrong: ["He gave them land", "He gave them sleep", "He gave them wealth"], why: "Ibn Abbas said... He gave them strengths." },
        { tf: true, q: "Their strength came from Allah.", why: "Strengthened them with Ruh from Himself." }
      ]
    },
    {
      slug: "a-beautiful-secret",
      title: "A beautiful secret",
      line: "Allah is pleased with them, and they are pleased with Him.",
      facts: ["They gave up ties for Allah", "Allah replaced it with His pleasure"],
      quote: q58(22),
      source: ik(22, "Ibn Kathir says the words, Allah is pleased with them and they with Him, contain a beautiful secret: He compensated them with His pleasure.", "contains a beautiful secret…He compensated them by being pleased with them"),
      difficulty: 4,
      questions: [
        { q: "What does Ibn Kathir say the pleasure line holds?", a: "A beautiful secret", wrong: ["A hidden map", "A riddle", "A warning"], why: "Allah is well pleased with them, and they are well pleased with Him. Contains a beautiful secret." },
        { q: "How did Allah compensate them?", a: "By being pleased with them", wrong: ["With gold", "With fame", "With long life"], why: "He compensated them by being pleased with them." },
        { tf: true, q: "They are also pleased with Allah.", why: "And they are well pleased with Him." }
      ]
    },
    {
      slug: "never-angry-again",
      title: "Never angry again",
      line: "In Paradise, Allah grants His pleasure and is never angry again.",
      facts: ["Allah asks: are you pleased?", "His pleasure is better than all else"],
      quote: q58(22),
      source: hadith("bukhari", "6549", "Abu Sa'id al-Khudri", "Sahih", "Allah will ask the people of Paradise if they are pleased, then give something better: His pleasure, never to be angry with them after.", "I will bestow My pleasure and contentment upon you"),
      difficulty: 3,
      questions: [
        { q: "What does Allah give that is better than all?", a: "His pleasure", wrong: ["More gold", "A bigger house", "More rivers"], why: "I will bestow My pleasure and contentment upon you." },
        { q: "Will Allah be angry with them after?", a: "Never", wrong: ["Sometimes", "Once a year", "Every Friday"], why: "So that I will never be angry with you after for-ever." },
        { tf: true, q: "Allah asks the people of Paradise if they are pleased.", why: "Allah will say, Are you pleased?" }
      ]
    },
    {
      slug: "party-of-allah",
      title: "The party of Allah",
      line: "The party of Allah are His servants worthy of His honor.",
      facts: ["Hizbullah: the party of Allah", "Opposite of the party of Shaytan"],
      quote: q58(22),
      source: ik(22, "Ibn Kathir says they are the party of Allah, meaning His servants who are worthy of earning His honor.", "His servants who are worthy of earning His honor"),
      difficulty: 2,
      questions: [
        { q: "Who is the party of Allah?", a: "His honored servants", wrong: ["The richest people", "The strongest army", "All travelers"], why: "His servants who are worthy of earning His honor." },
        { q: "Which party is in 58:19, not 58:22?", a: "The party of Shaytan", wrong: ["The party of Allah", "The party of angels", "The party of scholars"], why: "They are the party of Shaytan. (58:19)" },
        { tf: true, q: "Surah Al-Mujadila ends by naming the party of Allah.", why: "They are the party of Allah. Verily, the party of Allah will be the successful." }
      ]
    },
    {
      slug: "truly-successful",
      title: "Truly successful",
      line: "The party of Allah wins in this life and the Hereafter.",
      facts: ["Muflihun: the successful", "Success, happiness and triumph"],
      quote: q58(22),
      source: ik(22, "Ibn Kathir says this asserts their success, happiness and triumph in this life and the Hereafter.", "their success, happiness and triumph in this life and the Hereafter"),
      difficulty: 2,
      questions: [
        { q: "What will the party of Allah be?", a: "The successful", wrong: ["The losers", "The forgotten", "The lazy"], why: "Verily, the party of Allah will be the successful." },
        { q: "Where is their success?", a: "This life and the Hereafter", wrong: ["Only this life", "Only in a dream", "Nowhere"], why: "Their success, happiness and triumph in this life and the Hereafter." },
        { tf: false, q: "The party of Shaytan also succeeds.", why: "Verily, the party of Shaytan will be the losers!" }
      ]
    }
  ]
};

export const MUJADILA_UNITS: readonly DeepUnit[] = [MUJADILA_ONE, MUJADILA_TWO, MUJADILA_THREE];
