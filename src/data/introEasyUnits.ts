import { hadith, type DeepUnit } from "./deepKit";

// A fifth deep unit for "New to Islam": the easy way of Islam, from Sahih al-Bukhari and Sunan Ibn Majah. Gentle with
// a Bedouin in the masjid, no burden beyond what you can bear, the duties that are enough for Paradise, mistakes
// forgiven, and a Lord who forgives each time. Every card is one sahih hadith with its number, narrator and grade, and
// its exact English words to highlight, and none of them is taught anywhere else in the app.

export const EASY_WAY: DeepUnit = {
  key: "easy-way",
  topicId: "intro",
  branchId: "intro-easy-way",
  branch: { title: "The easy way of Islam", description: "Gentle with a Bedouin in the masjid, no burden too heavy, duties that are enough for Paradise, mistakes forgiven, and a Lord who forgives." },
  name: "the easy way of Islam",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "sent-to-make-it-easy",
      title: "Sent to make it easy",
      line: "A Bedouin did wrong in the masjid, and he ﷺ stayed gentle.",
      facts: ["Told by Abu Hurairah", "He ﷺ had water poured over the place"],
      source: hadith("bukhari", "220", "Abu Hurairah", "Sahih", "Abu Hurairah said: a Bedouin stood up and began to pass water in the masjid. The people seized him, but the Prophet ﷺ told them to leave him and to pour a bucket of water over the place. Then he ﷺ said: you have been sent to make things easy, not to make them hard.", "You have been sent to make things easy and not to make them difficult"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ tell the people to do with the Bedouin?", a: "Leave him be", wrong: ["Chase him out", "Shout at him", "Punish him at once"], why: "The Prophet ﷺ ordered them to leave him and to pour water over the place." },
        { q: "How did he ﷺ have the place cleaned?", a: "With a bucket of water", wrong: ["With sand and stones", "By closing the masjid", "With strong perfume"], why: "He ﷺ had a bucket or a tumbler of water poured over the place." },
        { q: "He ﷺ told the people they were sent to make things easy.", tf: true, why: "You have been sent to make things easy and not to make them difficult, he ﷺ said." }
      ]
    },
    {
      slug: "no-heavy-burdens",
      title: "No heavy burdens",
      line: "Umar: we were forbidden to take on more than we can bear.",
      facts: ["Told by Anas ibn Malik", "Umar said it to those with him"],
      source: hadith("bukhari", "7293", "Anas ibn Malik", "Sahih", "Anas said: we were with Umar, and he said: we have been forbidden to burden ourselves with what is beyond us.", "We have been forbidden to undertake a difficult task beyond our capability"),
      difficulty: 2,
      questions: [
        { q: "What did Umar say they had been forbidden?", a: "Taking on more than they can bear", wrong: ["Visiting the sick", "Helping one another", "Praying at night"], why: "We have been forbidden to undertake a difficult task beyond our capability, Umar said." },
        { q: "A new Muslim wants to do every extra deed at once. What fits?", a: "Do what you can keep up", wrong: ["Do it all, even if it breaks you", "Do nothing at all", "Copy the hardest person"], why: "Umar said they had been forbidden to burden themselves beyond what they could do." },
        { q: "Islam asks you to burden yourself beyond what you can do.", tf: false, why: "No. We have been forbidden to undertake a task beyond our capability, Umar said." }
      ]
    },
    {
      slug: "enough-for-paradise",
      title: "Enough for Paradise",
      line: "The duties, done well, are a road to Paradise.",
      facts: ["Told by Abu Hurairah", "A Bedouin asked for a deed to enter Paradise", "He said he would do no more than that"],
      source: hadith("bukhari", "1397", "Abu Hurairah", "Sahih", "Abu Hurairah said: a Bedouin came to the Prophet ﷺ and said: tell me a deed that will take me into Paradise if I do it. He ﷺ said: worship Allah and worship none with Him, pray the five obligatory prayers, pay the obligatory zakat, and fast the month of Ramadan. The Bedouin said: by Him in whose hand my life is, I will not do more than this. When he left, the Prophet ﷺ said: whoever would like to see a man of Paradise, let him look at this man.", "Whoever likes to see a man of Paradise, then he may look at this man"),
      difficulty: 1,
      questions: [
        { q: "What did the Bedouin ask the Prophet ﷺ for?", a: "A deed to take him to Paradise", wrong: ["A camel for the road", "A seat in the masjid", "A share of the gold"], why: "Tell me of such a deed as will make me enter Paradise if I do it, he asked." },
        { q: "Which of these did he ﷺ name for the Bedouin?", a: "Fasting the month of Ramadan", wrong: ["Praying all night long", "Giving away all he owned", "Fasting every single day"], why: "Worship Allah alone, pray the five prayers, pay zakat, and fast Ramadan, he ﷺ said." },
        { q: "To reach Paradise, the Bedouin had to do far more than the duties.", tf: false, why: "No. He would do no more than that, and he ﷺ called him a man of Paradise." }
      ]
    },
    {
      slug: "mistakes-are-forgiven",
      title: "Mistakes are forgiven",
      line: "Allah forgives mistakes, forgetting, and what is forced on you.",
      facts: ["Told by Ibn Abbas", "A mercy for the whole ummah"],
      source: hadith("ibnmajah", "2045", "Ibn Abbas", "Sahih (Al-Albani)", "The Prophet ﷺ said: Allah has forgiven my ummah their mistakes, what they forget, and what they are forced to do.", "Allah has forgiven my nation for mistakes and forgetfulness, and what they are forced to do"),
      difficulty: 2,
      questions: [
        { q: "Which three things did he ﷺ say Allah has forgiven the ummah?", a: "Mistakes, forgetting, being forced", wrong: ["Lying, cheating, stealing", "Anger, envy, pride", "Laziness, greed, boasting"], why: "Allah has forgiven my nation for mistakes and forgetfulness, he ﷺ said." },
        { q: "A new Muslim makes an honest mistake. What should they know?", a: "Allah forgives mistakes", wrong: ["Their Islam is lost", "They must start over", "They should give up"], why: "Allah has forgiven my nation for mistakes, he ﷺ said, so do not lose hope." },
        { q: "Allah holds us to account for what we are forced to do.", tf: false, why: "No. Allah has forgiven my nation what they are forced to do, he ﷺ said." }
      ]
    },
    {
      slug: "a-lord-who-forgives",
      title: "A Lord who forgives",
      line: "Slip, then turn back to Allah; He forgives again and again.",
      facts: ["Told by Abu Hurairah", "A servant sinned and asked forgiveness three times"],
      source: hadith("bukhari", "7507", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: a servant sins and says: my Lord, I have sinned, so forgive me. Allah says: My servant knows that he has a Lord who forgives sins and holds to account for them; I have forgiven My servant. He sins again and asks again, and Allah forgives him again, and a third time too.", "My slave has known that he has a Lord who forgives sins and punishes for it"),
      difficulty: 2,
      questions: [
        { q: "What did the servant say after he sinned?", a: "My Lord, forgive me", wrong: ["No one saw me", "It does not matter", "I will hide it"], why: "O my Lord, I have sinned, so please forgive me, he said, turning back to Allah." },
        { q: "What did Allah say His servant knew?", a: "He has a Lord who forgives", wrong: ["He has no one to turn to", "His sins are too many", "He is better than others"], why: "My slave has known that he has a Lord who forgives sins, Allah says." },
        { q: "Allah forgave the servant only the first time he asked.", tf: false, why: "No. Each time the servant asked, Allah said: I have forgiven My servant." }
      ]
    }
  ]
};
