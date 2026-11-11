import { hadith, type DeepUnit } from "./deepKit";

// One more Zakat unit: sadaqah that everyone can give, rich or poor. Every card is one sahih hadith (number as
// sunnah.com gives it), with its exact English words to highlight.

const ANYONE: DeepUnit = {
  key: "zakat-anyone",
  topicId: "zakat",
  branchId: "zakat-charity-for-all",
  branch: { title: "Charity anyone can give", description: "Half a date, a kind word, food for your family: sadaqah is open to rich and poor alike." },
  name: "charity anyone can give",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "one-date",
      title: "A date as big as a mountain",
      line: "Allah grows one honest date of charity as big as a mountain.",
      facts: ["Told by Abu Hurairah", "Only from honest money"],
      source: hadith("bukhari", "1410", "Abu Hurayrah", "Sahih", "Whoever gives in charity the value of one date from honest earnings, and Allah accepts only what is honest, Allah takes it in His right hand and grows it for him, as one of you raises a foal, until it becomes as big as a mountain.", "and then enlarges its reward for that person"),
      difficulty: 1,
      questions: [
        { q: "How big can one date of charity grow?", a: "As big as a mountain", wrong: ["As big as a seed", "It stays the same", "It disappears"], why: "So much so that it becomes as big as a mountain." },
        { q: "What kind of money does Allah accept?", a: "Honestly earned money", wrong: ["Stolen money", "Any money at all", "Only gold coins"], why: "Allah accepts only the honestly earned money." },
        { q: "A small charity can carry a huge reward.", tf: true, why: "One date can grow as big as a mountain." }
      ]
    },
    {
      slug: "half-a-date",
      title: "Even half a date",
      line: "Protect yourself from the Fire, even with half a date.",
      facts: ["Told by Adi ibn Hatim"],
      source: hadith("bukhari", "1417", "Adi ibn Hatim", "Sahih", "Save yourself from the Fire even by giving half a date in charity.", "even by giving half a date-fruit in charity"),
      difficulty: 1,
      questions: [
        { q: "What is the smallest charity named in Bukhari 1417?", a: "Half a date", wrong: ["A bag of gold", "A house", "A camel"], why: "Even by giving half a date-fruit in charity." },
        { q: "Who narrated Bukhari 1417?", a: "Adi ibn Hatim", wrong: ["Anas", "Jabir", "Abu Dharr"], why: "Narrated Adi bin Hatim." },
        { q: "No charity is too small to give.", tf: true, why: "Even half a date counts." }
      ]
    },
    {
      slug: "if-you-have-nothing",
      title: "If you have nothing",
      line: "No money? Work, help someone, say good, or hold back harm.",
      facts: ["Told by Abu Musa al-Ash'ari", "Every Muslim gives sadaqah"],
      source: hadith("bukhari", "6022", "Abu Musa al-Ash'ari", "Sahih", "Every Muslim must give sadaqah. If he has nothing, he works with his hands and gives. If he cannot, he helps someone in need. If not, he tells people to do good. If not, he holds back from harm, and that is sadaqah for him.", "Then he should refrain from doing evil, for that will be considered for Him as a Sadaqa"),
      difficulty: 1,
      questions: [
        { q: "Who must give sadaqah?", a: "Every Muslim", wrong: ["Only the rich", "Only on Eid", "Only adults with jobs"], why: "On every Muslim there is enjoined a Sadaqa." },
        { q: "What if someone has no money at all?", a: "Work with his hands and give", wrong: ["He is excused from all good", "He should beg", "He should give up"], why: "He should work with his hands so that he may benefit himself and give in charity." },
        { q: "Even holding back from harm counts as sadaqah.", tf: true, why: "Refrain from doing evil, for that will be considered as a Sadaqa." }
      ]
    },
    {
      slug: "family-first",
      title: "Spending on your family",
      line: "Spending on your family for Allah's sake is sadaqah.",
      facts: ["Told by Abu Mas'ud al-Ansari", "Intention matters"],
      source: hadith("bukhari", "5351", "Abu Mas'ud Al-Ansari", "Sahih", "When a Muslim spends on his family hoping for Allah's reward, it is counted as sadaqah for him.", "When a Muslim spends something on his family intending to receive"),
      difficulty: 2,
      questions: [
        { q: "When is spending on family a sadaqah?", a: "When done hoping for Allah's reward", wrong: ["Never", "Only on Eid", "Only if others see"], why: "Intending to receive Allah's reward." },
        { q: "Whom does Bukhari 5351 mention spending on?", a: "His family", wrong: ["Strangers only", "Kings", "No one"], why: "When a Muslim spends something on his family." },
        { q: "Buying food for your family can earn reward.", tf: true, why: "It is regarded as sadaqa for him." }
      ]
    },
    {
      slug: "do-not-withhold",
      title: "Don't hold it back",
      line: "Do not hoard your money, or Allah will hold back blessings.",
      facts: ["Said to Asma bint Abi Bakr"],
      source: hadith("bukhari", "1433", "Asma bint Abi Bakr", "Sahih", "The Prophet ﷺ said to Asma: do not withhold your money, or Allah will withhold His blessings from you.", "Allah would withhold His blessings from you"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ tell Asma not to do?", a: "Withhold her money", wrong: ["Give charity", "Smile", "Help others"], why: "Do not withhold your money." },
        { q: "What happens if we hoard what we have?", a: "Allah holds back blessings", wrong: ["We get richer forever", "Nothing", "Angels praise us"], why: "Allah would withhold His blessings from you." },
        { q: "Giving opens the door to more blessings.", tf: true, why: "Holding back closes it, giving opens it." }
      ]
    },
    {
      slug: "lasting-charity",
      title: "Charity that never stops",
      line: "Three deeds go on after death: lasting charity is one.",
      facts: ["Jami at-Tirmidhi 1376", "Also useful knowledge, a righteous child"],
      source: hadith("tirmidhi", "1376", "Abu Hurairah", "Sahih", "When a person dies, his deeds end except three: an ongoing charity, knowledge that benefits others, and a righteous child who makes du'a for him.", "Continuing charity, knowledge that others benefited from, and a righteous son who supplicates for him"),
      difficulty: 2,
      questions: [
        { q: "How many deeds keep going after death?", a: "Three", wrong: ["None", "Ten", "One hundred"], why: "His deeds are cut off except for three." },
        { q: "Which of these is one of the three?", a: "An ongoing charity", wrong: ["A big house", "A fast car", "Fine clothes"], why: "Continuing charity." },
        { q: "A child's du'a for a parent keeps helping them.", tf: true, why: "A righteous son who supplicates for him." },
        { q: "What else lasts besides charity and a good child?", a: "Knowledge that benefits others", wrong: ["Money in the bank", "Famous photos", "Nice furniture"], why: "Knowledge that others benefited from." }
      ]
    }
  ]
};

export const ZAKAT_MORE_UNITS: DeepUnit[] = [ANYONE];
