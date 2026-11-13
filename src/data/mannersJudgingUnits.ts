import { hadith, type DeepUnit } from "./deepKit";

// One more Manners unit: judging fairly, from Sahih al-Bukhari, Sunan Abi Dawud, Jami at-Tirmidhi and Sunan Ibn
// Majah. No judging while angry, a judge killed without a knife, Allah with the judge who is not unjust, the curse on
// giving and taking bribes, a claim that needs more than words, and no post for one who asks for it. Every card is one
// sahih or hasan hadith with its number, narrator and grade, and its exact English words to highlight. Points the
// schools differ on are left out, and none of these hadith is taught anywhere else in the app.

const JUDGING: DeepUnit = {
  key: "manners-judging-fairly",
  topicId: "manners",
  branchId: "manners-judging-fairly",
  branch: { title: "Judging fairly", description: "Never while angry, a heavy trust, Allah with the fair judge, no bribes, more than a claim, and no post for one who asks." },
  name: "judging fairly",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "not-while-angry",
      title: "Not while angry",
      line: "A judge must not judge between two people while angry.",
      facts: ["Told by Abu Bakrah", "He wrote it to his son in Sijistan", "He heard the Prophet ﷺ say it"],
      source: hadith("bukhari", "7158", "Abu Bakrah", "Sahih", "Abu Bakrah wrote to his son in Sijistan: do not judge between two people when you are angry, for I heard the Prophet ﷺ say: a judge should not judge between two persons while he is in an angry mood.", "between two persons while he is in an angry mood"),
      difficulty: 1,
      questions: [
        { q: "When must a judge not judge between two people?", a: "While he is angry", wrong: ["While he is smiling", "While he is sitting", "While he is travelling"], why: "A judge should not judge between two persons while he is in an angry mood, he ﷺ said." },
        { q: "Whom did Abu Bakrah write the advice to?", a: "His son", wrong: ["His brother", "His teacher", "His neighbor"], why: "Abu Bakrah wrote it to his son, who was in Sijistan." },
        { q: "Abu Bakrah heard the Prophet ﷺ forbid judging in anger.", tf: true, why: "Do not judge between two persons when you are angry, Abu Bakrah told his son." }
      ]
    },
    {
      slug: "a-heavy-trust",
      title: "A heavy trust",
      line: "One made a judge has been killed without a knife, he ﷺ said.",
      facts: ["Told by Abu Hurairah", "Said of one appointed as a judge", "From Abu Dawud's chapters on judges"],
      source: hadith("abudawud", "3571", "Abu Hurairah", "Sahih (Al-Albani)", "Abu Hurairah said: the Prophet ﷺ said: he who has been appointed a judge has been killed without a knife.", "appointed a judge has been killed without a knife"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ say happens to one made a judge?", a: "Killed without a knife", wrong: ["Crowned without a throne", "Paid without working", "Honored without a test"], why: "He who has been appointed a judge has been killed without a knife, he ﷺ said." },
        { q: "Which post did he ﷺ describe with a knife?", a: "Being a judge", wrong: ["Being a trader", "Being a farmer", "Being a shepherd"], why: "He who has been appointed a judge has been killed without a knife." },
        { q: "One appointed a judge has been killed without a knife.", tf: true, why: "Appointed a judge, he has been killed without a knife, the Prophet ﷺ said." }
      ]
    },
    {
      slug: "with-the-fair-judge",
      title: "With the fair judge",
      line: "Allah is with the judge as long as he is not unjust.",
      facts: ["Told by Abdullah ibn Abi Awfa", "When he is unjust, Allah leaves him", "Then Shaitan stays with him"],
      source: hadith("tirmidhi", "1330", "Abdullah ibn Abi Awfa", "Hasan (Darussalam)", "Abdullah ibn Abi Awfa said: the Messenger of Allah ﷺ said: Allah is with the judge as long as he is not unjust. When he is unjust, He leaves him, and Shaitan stays with him.", "the judge as long as he is not unjust"),
      difficulty: 2,
      questions: [
        { q: "Till when is Allah with the judge?", a: "As long as he is not unjust", wrong: ["As long as he is rich", "As long as he is young", "As long as he is famous"], why: "Allah is with the judge as long as he is not unjust, he ﷺ said." },
        { q: "What happens when the judge becomes unjust?", a: "Allah leaves him", wrong: ["Allah rewards him", "Allah praises him", "Allah raises him"], why: "When he is unjust, He leaves him and he is attended by Shaitan." },
        { q: "An unjust judge is left with Shaitan.", tf: true, why: "So when he is unjust, He leaves him and he is attended by Shaitan, he ﷺ said." }
      ]
    },
    {
      slug: "giving-and-taking-bribes",
      title: "Giving and taking bribes",
      line: "He ﷺ cursed both the giver and the taker of a bribe.",
      facts: ["Told by Abdullah ibn Amr", "The one who gives a bribe", "And the one who takes it"],
      source: hadith("abudawud", "3580", "Abdullah ibn Amr", "Sahih (Al-Albani)", "Abdullah ibn Amr said: the Messenger of Allah ﷺ cursed the one who gives a bribe and the one who takes a bribe.", "one who bribes and the one who takes bribe"),
      difficulty: 1,
      questions: [
        { q: "He ﷺ cursed the one who gives a bribe and who else?", a: "The one who takes it", wrong: ["The one who sees it", "The one who hears of it", "The one who warns of it"], why: "He ﷺ cursed the one who bribes and the one who takes bribe, said Abdullah ibn Amr." },
        { q: "Which two people did he ﷺ curse?", a: "Giver and taker of a bribe", wrong: ["Buyer and seller of bread", "Teacher and student of law", "Host and guest at a meal"], why: "The Messenger of Allah ﷺ cursed the one who bribes and the one who takes bribe." },
        { q: "Both sides of a bribe are cursed, not just one.", tf: true, why: "He ﷺ cursed the one who bribes and the one who takes bribe, Abdullah ibn Amr said." }
      ]
    },
    {
      slug: "more-than-a-claim",
      title: "More than a claim",
      line: "People are not given things just because they claim them.",
      facts: ["Told by Ibn Abbas", "Some would claim others' lives and wealth", "The one accused must swear an oath"],
      source: hadith("ibnmajah", "2321", "Ibn Abbas", "Sahih (Darussalam)", "Ibn Abbas said: the Messenger of Allah ﷺ said: if people were given whatever they claimed, some would claim the lives and wealth of others. But the one the claim is made against must swear an oath.", "is made against is obliged to swear an oath"),
      difficulty: 2,
      questions: [
        { q: "What would happen if people got whatever they claimed?", a: "Some would claim others' lives", wrong: ["All would become honest", "None would ever argue", "All would share fairly"], why: "Some would have claimed the lives and property of men, he ﷺ said." },
        { q: "Who must swear an oath, he ﷺ said?", a: "The one the claim is against", wrong: ["The judge of the case", "The oldest one present", "The first one to arrive"], why: "But the one the claim is made against is obliged to swear an oath, he ﷺ said." },
        { q: "A claim alone is enough to take a man's property.", tf: false, why: "No. If people were given what they claimed, some would claim others' lives." }
      ]
    },
    {
      slug: "not-for-those-who-ask",
      title: "Not for those who ask",
      line: "He ﷺ did not give power to those who asked for it.",
      facts: ["Told by Abu Musa", "Two men of his tribe asked to be governors", "Nor to those keen to have it"],
      source: hadith("bukhari", "7149", "Abu Musa", "Sahih", "Abu Musa said: two men of my tribe and I came to the Prophet ﷺ. One said: O Messenger of Allah ﷺ, make me a governor, and so did the other. He ﷺ said: we do not give the authority of ruling to those who ask for it, nor to those who are keen to have it.", "authority of ruling to those who ask for it"),
      difficulty: 2,
      questions: [
        { q: "What did the two men ask him ﷺ for?", a: "To be made governors", wrong: ["To be given camels", "To be taught the Quran", "To be sent to trade"], why: "Appoint me as a governor, one of the two men said, and so did the second." },
        { q: "To whom does he ﷺ not give the authority of ruling?", a: "Those who ask for it", wrong: ["Those who are humble", "Those who are honest", "Those who are learned"], why: "We do not assign the authority of ruling to those who ask for it, he ﷺ said." },
        { q: "Being keen to have power does not win a post from him ﷺ.", tf: true, why: "Nor to those who are keen to have it, he ﷺ said of the authority of ruling." }
      ]
    }
  ]
};

export const MANNERS_JUDGING_UNITS: readonly DeepUnit[] = [JUDGING];
