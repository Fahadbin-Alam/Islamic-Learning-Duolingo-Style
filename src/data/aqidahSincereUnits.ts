import { hadith, type DeepUnit } from "./deepKit";

// One more Aqidah unit: sincere for Allah, from Sahih Muslim, Sunan an-Nasa'i, Sunan Abi Dawud and Sunan Ibn Majah.
// The hidden servant Allah loves, the first three to be judged, knowledge sought for His Face, the true wish that earns
// the same reward, the Hereafter as your aim, and a sincere du'a in the funeral prayer. Every card is one sahih or hasan
// hadith with its number, narrator and grade, and its exact English words to highlight, and none of these hadith is
// taught anywhere else in the app.

const SINCERE: DeepUnit = {
  key: "aqidah-sincere-for-allah",
  topicId: "aqidah",
  branchId: "aqidah-sincere-for-allah",
  branch: { title: "Sincere for Allah", description: "Loved for staying hidden, the first three to be judged, knowledge for His Face, the reward of a true wish, the Hereafter as your aim, and a du'a from the heart." },
  name: "being sincere for Allah",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "the-hidden-servant",
      title: "The hidden servant",
      line: "Allah loves the servant who is God-fearing, content and hidden.",
      facts: ["Told by Sa'd ibn Abi Waqqas", "Hidden: doing good without seeking fame", "Free from want: content with what Allah gives"],
      source: hadith("muslim", "2965", "Sa'd ibn Abi Waqqas", "Sahih", "Sa'd ibn Abi Waqqas said: I heard the Messenger of Allah ﷺ say: Allah loves the servant who is God-conscious, free from want, and hidden.", "Allah loves the servant who is God-conscious and is free from want and is hidden"),
      difficulty: 2,
      questions: [
        { q: "Which servant does Allah love, he ﷺ said?", a: "The God-fearing, content, hidden one", wrong: ["The loudest one", "The most famous one", "The one with the most gold"], why: "Allah loves the God-conscious servant, free from want and hidden, he ﷺ said." },
        { q: "What makes a servant hidden?", a: "Doing good without seeking fame", wrong: ["Wearing dark clothes", "Never going outside", "Living in a cave"], why: "The hidden servant does good quietly and does not seek a name among people." },
        { q: "Allah loves the one who chases fame and praise.", tf: false, why: "No. Allah loves the servant who is God-conscious, free from want, and hidden." }
      ]
    },
    {
      slug: "the-first-to-be-judged",
      title: "The first to be judged",
      line: "Three who did good only for praise are judged first.",
      facts: ["Told by Abu Hurairah", "A fighter, a scholar and a rich giver", "Each did it so people would praise him"],
      source: hadith("nasai", "3137", "Abu Hurairah", "Sahih (Al-Albani)", "Abu Hurairah said: I heard the Messenger of Allah ﷺ say: the first people to be judged on the Day of Resurrection are three. A man killed in battle says: I fought for You. Allah says: you lie; you fought so that it would be said you are brave, and it was said. Then a man who learned, taught and recited the Quran so he would be called a scholar and a reciter, and a rich man who gave so he would be called generous. Each is told the same, and is thrown into the Fire.", "You fought so that it would be said that so-and-so is brave, and it was said"),
      difficulty: 3,
      questions: [
        { q: "Who are the first three to be judged?", a: "A fighter, a scholar, a rich giver", wrong: ["A king, a farmer, a sailor", "Three brothers", "Three travellers"], why: "One fought, one learned and recited, one gave his wealth, all so people would praise them." },
        { q: "Why did the fighter fight, Allah tells him?", a: "To be called brave", wrong: ["To get rich", "To win a race", "To see new lands"], why: "You fought so that it would be said you are brave, and it was said, Allah tells him." },
        { q: "A deed done only for praise still pleases Allah.", tf: false, why: "No. Each of the three did it so people would praise him, and it did not save him." }
      ]
    },
    {
      slug: "knowledge-for-his-face",
      title: "Knowledge for His Face",
      line: "Learn the deen for Allah, not for gain in this world.",
      facts: ["Told by Abu Hurairah", "Knowledge of the deen is for Allah's Face", "The fragrance of Paradise: its sweet scent"],
      source: hadith("abudawud", "3664", "Abu Hurairah", "Sahih (Al-Albani)", "Abu Hurairah said: the Prophet ﷺ said: whoever learns knowledge that should be sought for the Face of Allah, but learns it only to get something of this world, will not find the fragrance of Paradise.", "If anyone acquires knowledge that should be sought seeking the Face of Allah, but he acquires it only to get some worldly advantage"),
      difficulty: 2,
      questions: [
        { q: "Knowledge of the deen should be sought for what?", a: "For the Face of Allah", wrong: ["For a big salary", "For people's praise", "To win debates"], why: "Knowledge that should be sought seeking the Face of Allah, he ﷺ said." },
        { q: "What will he miss who learns it only for the world?", a: "The fragrance of Paradise", wrong: ["A good harvest", "A long life", "The sight of the sea"], why: "He will not find the fragrance of Paradise, he ﷺ said of him." },
        { q: "Learning the deen just to gain the world is fine.", tf: false, why: "No. One who learns it only for some worldly gain will not smell Paradise, he ﷺ said." }
      ]
    },
    {
      slug: "if-i-had-what-he-has",
      title: "If I had what he has",
      line: "A true wish to do good can earn the same reward.",
      facts: ["Told by Abu Kabshah al-Anmari", "One man had wealth and knowledge", "One had only knowledge, and a true wish"],
      source: hadith("ibnmajah", "4228", "Abu Kabshah al-Anmari", "Sahih (Al-Albani)", "Abu Kabshah al-Anmari said: the Messenger of Allah ﷺ said: this Ummah is like four people. A man Allah gave wealth and knowledge, who spends his wealth rightly; and a man Allah gave knowledge but not wealth, who says: if I had wealth like him, I would do what he does. They are equal in reward. And a man Allah gave wealth but no knowledge, who wastes it; and a man given neither, who says: if I had wealth like him, I would do what he does. They are equal in sin.", "whom Allah gives knowledge, but he does not give him wealth, so he says"),
      difficulty: 3,
      questions: [
        { q: "What did the man with knowledge but no wealth say?", a: "If I had wealth, I would do the same", wrong: ["I want to keep my knowledge", "Wealth is a waste of time", "I will sell my knowledge"], why: "If I had been given wealth like this one, I would have done what he did, he says." },
        { q: "How is his reward, next to the man who spent?", a: "He gets the same reward", wrong: ["He gets nothing", "He gets the blame", "He gets half"], why: "They will be equal in reward, the Messenger of Allah ﷺ said of the two." },
        { q: "A sincere wish to do good can count with Allah.", tf: true, why: "They will be equal in reward, he ﷺ said of the man who only wished to spend." }
      ]
    },
    {
      slug: "the-hereafter-as-your-aim",
      title: "The Hereafter as your aim",
      line: "Aim for the Hereafter, and Allah will gather your affairs.",
      facts: ["Told by Zayd ibn Thabit", "A content heart, settled affairs", "Provision still comes to him"],
      source: hadith("ibnmajah", "4105", "Zayd ibn Thabit", "Sahih (Al-Albani)", "Zayd ibn Thabit said: I heard the Messenger of Allah ﷺ say: whoever has only this world as his concern, Allah scatters his affairs, makes him always fear poverty, and he gets of the world only what was written for him. Whoever has the Hereafter as his aim, Allah gathers his affairs for him, makes him content, and the world comes to him anyway.", "Whoever is focused on the Hereafter, Allah will settle his affairs for him and make him feel content with his lot"),
      difficulty: 2,
      questions: [
        { q: "What does Allah do for one whose aim is the Hereafter?", a: "Settles his affairs", wrong: ["Scatters his affairs", "Takes his home", "Makes him poor"], why: "Allah will settle his affairs for him and make him content, he ﷺ said." },
        { q: "What happens to one focused only on this world?", a: "He always fears poverty", wrong: ["He never feels hungry", "He gets all he wants", "He lives forever"], why: "Allah will confound his affairs and make him fear poverty constantly, he ﷺ said." },
        { q: "Provision still comes to one who aims for the Hereafter.", tf: true, why: "His provision and worldly gains will undoubtedly come to him, he ﷺ said." }
      ]
    },
    {
      slug: "a-dua-from-the-heart",
      title: "A du'a from the heart",
      line: "When you pray the funeral prayer, make your du'a sincere.",
      facts: ["Told by Abu Hurairah", "Salat al-janazah: the funeral prayer", "Pray for him with all your heart"],
      source: hadith("abudawud", "3199", "Abu Hurairah", "Hasan (Al-Albani)", "Abu Hurairah said: the Prophet ﷺ said: when you pray over the dead, make your du'a for him sincere.", "When you pray over the dead, make a sincere supplication for him"),
      difficulty: 1,
      questions: [
        { q: "How should your du'a be in the funeral prayer?", a: "Sincere, from the heart", wrong: ["Fast and careless", "Said for show", "Said without thinking"], why: "When you pray over the dead, make a sincere supplication for him, he ﷺ said." },
        { q: "Which prayer was he ﷺ speaking of?", a: "The funeral prayer", wrong: ["The Friday prayer", "The Isha prayer", "The eclipse prayer"], why: "When you pray over the dead, make your du'a for him sincere, he ﷺ said." },
        { q: "In the funeral prayer, we make du'a for the one who died.", tf: true, why: "Make a sincere supplication for him, he ﷺ said of the one who has died." }
      ]
    }
  ]
};

export const AQIDAH_SINCERE_UNITS: readonly DeepUnit[] = [SINCERE];
