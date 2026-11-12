import { hadith, type DeepUnit } from "./deepKit";

// One more Akhirah unit: how people will be raised on the Day of Resurrection, from Sahih al-Bukhari, Sunan Abi
// Dawud, Sunan Ibn Majah and Jami at-Tirmidhi. The pilgrim who died at Arafah raised saying the talbiyah, an army
// swallowed by the earth but raised by their intentions, a wound for Allah's cause that smells of musk, grey hair that
// becomes light, the callers to prayer with the longest necks, and the proud gathered as tiny specks. Every card is
// one sahih or hasan hadith with its number, narrator and grade, and its exact English words to highlight. Points
// the schools differ on are left out, and none of these hadith is taught anywhere else in the app.

const RAISED: DeepUnit = {
  key: "akhirah-how-people-are-raised",
  topicId: "akhirah",
  branchId: "akhirah-how-people-are-raised",
  branch: { title: "How people will be raised", description: "A pilgrim raised saying the talbiyah, raised by intentions, a wound of musk, grey hair as light, the callers to prayer, and the proud made small." },
  name: "how people will be raised",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "raised-saying-the-talbiyah",
      title: "Raised saying the talbiyah",
      line: "A pilgrim who died at Arafah will rise saying the talbiyah.",
      facts: ["Told by Ibn Abbas", "He fell from his mount at Arafah and died", "Talbiyah: Labbayk Allahumma labbayk"],
      source: hadith("bukhari", "1849", "Ibn Abbas", "Sahih", "Ibn Abbas said: a man was standing with the Prophet ﷺ at Arafah when he fell from his mount and his neck was broken. The Prophet ﷺ told them to wash him with water and sidr and to shroud him in two pieces of cloth, and said: Allah will raise him on the Day of Resurrection reciting the talbiyah.", "Allah will resurrect him on the Day of Resurrection and he will be reciting Talbiya"),
      difficulty: 1,
      questions: [
        { q: "Where was the man when he fell from his mount?", a: "At Arafah, on Hajj", wrong: ["In the market", "At his home", "On a ship at sea"], why: "He was standing with the Prophet ﷺ at Arafah when he fell, Ibn Abbas said." },
        { q: "How will Allah raise him on the Day of Resurrection?", a: "Reciting the talbiyah", wrong: ["Crying for help", "Silent and afraid", "Calling for his family"], why: "Allah will resurrect him and he will be reciting Talbiya, he ﷺ said." },
        { q: "He will rise still in the state of a pilgrim.", tf: true, why: "He died in ihram, so he will be raised on the Day of Resurrection reciting the talbiyah." }
      ]
    },
    {
      slug: "raised-by-their-intentions",
      title: "Raised by their intentions",
      line: "Each person will be raised and judged by their intention.",
      facts: ["Told by Aishah", "An army will march to attack the Ka'bah", "At al-Bayda, the earth will swallow them all"],
      source: hadith("bukhari", "2118", "Aishah", "Sahih", "Aishah said: the Messenger of Allah ﷺ said: an army will march to attack the Ka'bah, and when they reach al-Bayda, the earth will swallow all of them. I said: how, when their market people are among them, and people who are not of them? He said: all of them will sink, but they will be raised and judged according to their intentions.", "all of those people will sink but they will be resurrected and judged according to their intentions"),
      difficulty: 2,
      questions: [
        { q: "Who will sink with the army, he ﷺ said?", a: "All of them, even those not of them", wrong: ["Only its leader", "Only its horses", "Not a single one"], why: "All of those people will sink, then be raised by their intentions, he ﷺ said." },
        { q: "How will each of them be raised and judged?", a: "By their intentions", wrong: ["By their wealth", "By their tribe", "By their age"], why: "They sink together, but each is judged by what was in their heart, he ﷺ said." },
        { q: "Two people can die in the same way yet be judged differently.", tf: true, why: "All will sink, but they will be judged according to their intentions, he ﷺ said." }
      ]
    },
    {
      slug: "a-wound-that-smells-of-musk",
      title: "A wound that smells of musk",
      line: "A wound taken in Allah's cause will smell of musk that Day.",
      facts: ["Told by Abu Hurairah", "The wound comes as fresh as the day it was made", "Its colour is blood, its scent is musk"],
      source: hadith("bukhari", "237", "Abu Hurairah", "Sahih", "Abu Hurairah said: the Prophet ﷺ said: a wound that a Muslim receives in Allah's cause will appear on the Day of Resurrection as it was when it was made, with blood flowing from it. Its colour will be the colour of blood, but it will smell of musk.", "its color will be that of the blood but will smell like musk"),
      difficulty: 2,
      questions: [
        { q: "How will the wound smell on the Day of Resurrection?", a: "Like musk", wrong: ["Like smoke", "Like burnt wood", "Like the sea"], why: "Its colour will be that of blood, but it will smell like musk, he ﷺ said." },
        { q: "What colour will the wound be?", a: "The colour of blood", wrong: ["The colour of gold", "The colour of grass", "The colour of snow"], why: "Blood will be flowing from the wound and its colour will be that of blood." },
        { q: "Allah honours what His servant suffered for His sake.", tf: true, why: "The wound comes as it was, with the scent of musk, he ﷺ said." }
      ]
    },
    {
      slug: "grey-hair-becomes-light",
      title: "Grey hair becomes light",
      line: "Grey hair grown in Islam will be light on that Day.",
      facts: ["Told by Amr ibn Shu'ayb, from his father, from his grandfather", "Each grey hair is light for the believer", "A good deed is written, and a sin wiped away"],
      source: hadith("abudawud", "4202", "Amr ibn Shu'ayb, from his grandfather", "Hasan Sahih (Al-Albani)", "Amr ibn Shu'ayb, from his father, from his grandfather: the Messenger of Allah ﷺ said: do not pluck out grey hair. If any believer grows a grey hair in Islam, he will have light on the Day of Resurrection. Another version says: Allah will record a good deed for it and wipe away a sin for it.", "If any believer grows a grey hair in Islam, he will have light on the Day of Resurrection"),
      difficulty: 1,
      questions: [
        { q: "What will a grey hair grown in Islam be on that Day?", a: "Light", wrong: ["A heavy burden", "Darkness", "Nothing at all"], why: "If any believer grows a grey hair in Islam, he will have light, he ﷺ said." },
        { q: "What does Allah write for each grey hair, in one version?", a: "A good deed, and a sin wiped away", wrong: ["A bad deed", "One more year", "Nothing at all"], why: "Allah will record a good deed for it, and will blot out a sin for it." },
        { q: "Growing old as a Muslim is honoured by Allah.", tf: true, why: "Each grey hair grown in Islam brings light on the Day of Resurrection." }
      ]
    },
    {
      slug: "the-callers-to-prayer",
      title: "The callers to prayer",
      line: "The callers to prayer will have the longest necks that Day.",
      facts: ["Told by Mu'awiyah", "Mu'adhdhin: the one who calls the adhan", "Five times a day, he calls people to pray"],
      source: hadith("ibnmajah", "725", "Mu'awiyah", "Sahih (Al-Albani)", "Isa ibn Talhah said: I heard Mu'awiyah say that the Messenger of Allah ﷺ said: the mu'adhdhins will have the longest necks of all people on the Day of Resurrection.", "will have the longest necks of all people on the Day of Resurrection"),
      difficulty: 1,
      questions: [
        { q: "Who will have the longest necks on the Day of Resurrection?", a: "Those who call the adhan", wrong: ["The richest traders", "The tallest people", "The fastest runners"], why: "The mu'adhdhin will have the longest necks of all people, he ﷺ said." },
        { q: "What does a mu'adhdhin do?", a: "Calls people to prayer", wrong: ["Leads the army", "Sells in the market", "Guards the city"], why: "Five times a day, the mu'adhdhin calls the adhan for the salah." },
        { q: "Calling the adhan is honoured on the Day of Resurrection.", tf: true, why: "Its callers will have the longest necks of all people on that Day, he ﷺ said." }
      ]
    },
    {
      slug: "the-proud-made-small",
      title: "The proud made small",
      line: "The proud will be gathered like tiny specks in human form.",
      facts: ["Told by Amr ibn Shu'ayb, from his father, from his grandfather", "Kibr: pride, looking down on people", "Humiliation will cover them from every side"],
      source: hadith("tirmidhi", "2492", "Amr ibn Shu'ayb, from his grandfather", "Hasan (Al-Albani)", "Amr ibn Shu'ayb, from his father, from his grandfather: the Prophet ﷺ said: the proud will be gathered on the Day of Judgement like tiny particles in the form of men, covered with humiliation from every side.", "The proud will be gathered on the Day of Judgement resembling tiny particles in the image of men"),
      difficulty: 2,
      questions: [
        { q: "How will the proud be gathered on that Day?", a: "Like tiny specks in human form", wrong: ["Taller than everyone", "Riding fine horses", "Wearing gold crowns"], why: "Resembling tiny particles in the image of men, covered with humiliation, he ﷺ said." },
        { q: "What will cover the proud from every side?", a: "Humiliation", wrong: ["Light", "Shade", "Honour"], why: "They will be covered with humiliation everywhere, he ﷺ said of the proud." },
        { q: "Whoever looks down on people now will be made small on that Day.", tf: true, why: "The proud will be gathered like tiny particles in the image of men, he ﷺ said." }
      ]
    }
  ]
};

export const AKHIRAH_RAISED_UNITS: readonly DeepUnit[] = [RAISED];
