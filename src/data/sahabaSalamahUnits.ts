import { hadith, type DeepUnit } from "./deepKit";

// One more Sahabah unit: Salamah ibn al-Akwa', from Sahih al-Bukhari and Sunan Abi Dawud. His run to win back the
// she-camels of the Messenger of Allah ﷺ, pledging once more under the tree, the pillar he chose to pray by, a shirt
// fastened even with a thorn, the man who sneezed again, and Abu Qatadah taking on a dead man's debt. Every card is one
// sahih or hasan hadith with its number, narrator and grade, and its exact English words to highlight. Details that
// differ between narrations are not asked, and none of these hadith is taught anywhere else in the app.

const SALAMAH: DeepUnit = {
  key: "salamah",
  topicId: "sahabah",
  branchId: "sahabi-salamah-ibn-al-akwa",
  branch: { title: "Salamah ibn al-Akwa'", description: "A run to save the camels, pledging once more, the pillar he chose, a thorn for a button, a sneeze, and a debt paid." },
  name: "Salamah ibn al-Akwa'",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "a-run-to-save-the-camels",
      title: "A run to save the camels",
      line: "Salamah ran after raiders and won back his ﷺ camels.",
      facts: ["Told by Salamah ibn al-Akwa'", "He cried out: O Sabahah!", "He was a fine archer"],
      source: hadith("bukhari", "4194", "Salamah ibn al-Akwa'", "Sahih", "Salamah ibn al-Akwa' said: before the first adhan of Fajr I set out, and learned that raiders had taken the she-camels of the Messenger of Allah ﷺ. I cried out three times, O Sabahah, so that the people between the two mountains of Madinah heard me. Then I ran after the raiders and shot arrows at them, for I was a good archer, until I won the camels back. When the Prophet ﷺ came, I asked him to send men after them, and he said: O son of al-Akwa', you have overpowered them, so forgive them. Then he ﷺ seated me behind him on his she-camel until we entered Madinah.", "You have over-powered them, so forgive them"),
      difficulty: 2,
      questions: [
        { q: "What did Salamah do so Madinah would hear him?", a: "Cried out loudly", wrong: ["Lit a fire on a hill", "Waved a cloth", "Rode to every house"], why: "I made three loud cries, O Sabahah, so all Madinah heard me, Salamah said." },
        { q: "Where did Salamah sit on the ride back to Madinah?", a: "Behind him ﷺ on his camel", wrong: ["Beside him ﷺ on a horse", "Ahead of him ﷺ on a mule", "Far behind him ﷺ on a donkey"], why: "He ﷺ seated me behind him on his she-camel till we entered Madinah, Salamah said." },
        { q: "He ﷺ told Salamah to forgive the raiders.", tf: true, why: "O son of al-Akwa', you have over-powered them, so forgive them, he ﷺ said." }
      ]
    },
    {
      slug: "pledge-once-more",
      title: "Pledge once more",
      line: "Under the tree, he ﷺ asked Salamah to pledge once more.",
      facts: ["Told by Salamah ibn al-Akwa'", "The pledge under the tree was at Hudaybiyah", "Salamah had pledged already"],
      source: hadith("bukhari", "7208", "Salamah ibn al-Akwa'", "Sahih", "Salamah ibn al-Akwa' said: we gave the pledge of allegiance to the Prophet ﷺ under the tree. He said to me: O Salamah, will you not give the pledge? I said: O Messenger of Allah, I have already given it once. He said: give it again, a second time.", "I have already given the oath of allegiance for the first time"),
      difficulty: 2,
      questions: [
        { q: "Where did they give the pledge to him ﷺ?", a: "Under the tree", wrong: ["Inside the Ka'bah", "In a cave", "On a ship"], why: "We gave the oath of allegiance to the Prophet ﷺ under the tree, Salamah said." },
        { q: "What is an oath of allegiance?", a: "A pledge to be loyal", wrong: ["A peace treaty", "A trade deal", "A wedding feast"], why: "Salamah gave him ﷺ his oath of allegiance, a pledge to stand by him, under the tree." },
        { q: "Salamah gave the pledge more than once.", tf: true, why: "Give it again, a second time, he ﷺ told Salamah, who had already pledged." }
      ]
    },
    {
      slug: "the-pillar-he-chose",
      title: "The pillar he chose",
      line: "Salamah chose to pray where he had seen him ﷺ pray.",
      facts: ["Told by Yazid ibn Abi Ubayd", "Salamah was called Abu Muslim", "The pillar stood near the mushafs"],
      source: hadith("bukhari", "502", "Yazid ibn Abi Ubayd", "Sahih", "Yazid ibn Abi Ubayd said: I used to come with Salamah ibn al-Akwa', and he would pray by the pillar near where the copies of the Quran were kept. I said: O Abu Muslim, I see you always seeking to pray by this pillar. He said: I saw the Prophet ﷺ always seeking to pray by it.", "always seeking to pray near that pillar"),
      difficulty: 2,
      questions: [
        { q: "Why did Salamah pray by that pillar?", a: "To follow the Sunnah", wrong: ["To stay out of the sun", "To be near the door", "To sit with his tribe"], why: "I saw Allah's Messenger ﷺ always seeking to pray near that pillar, Salamah told Yazid." },
        { q: "What did Yazid call Salamah?", a: "Abu Muslim", wrong: ["Abu Hurairah", "Abu Dharr", "Abu Bakr"], why: "O Abu Muslim, I see you always seeking to pray by this pillar, Yazid said to Salamah." },
        { q: "Salamah followed even the place where he ﷺ used to pray.", tf: true, why: "He chose the pillar because he saw the Prophet ﷺ always seeking to pray near it." }
      ]
    },
    {
      slug: "fastened-with-a-thorn",
      title: "Fastened with a thorn",
      line: "One shirt is enough to pray in, fastened even with a thorn.",
      facts: ["Told by Salamah ibn al-Akwa'", "Salamah often went out hunting", "Keep well covered in prayer"],
      source: hadith("abudawud", "632", "Salamah ibn al-Akwa'", "Hasan (Al-Albani)", "Salamah ibn al-Akwa' said: I said: O Messenger of Allah, I am a man who goes out hunting; may I pray in a single shirt? He said: yes, but fasten it, even if only with a thorn.", "Yes, but fasten it even if it should be with a thorn"),
      difficulty: 2,
      questions: [
        { q: "What did Salamah often go out for?", a: "Hunting", wrong: ["Trading goods", "Farming", "Herding sheep"], why: "I am a man who goes out hunting; may I pray in a single shirt? Salamah asked him ﷺ." },
        { q: "If nothing else, what did he ﷺ say could fasten the shirt?", a: "A thorn", wrong: ["A date stone", "A palm leaf", "A pebble"], why: "Fasten it even if it should be with a thorn, he ﷺ told Salamah the hunter." },
        { q: "He ﷺ let Salamah pray in a single shirt.", tf: true, why: "Yes, but fasten it even if it should be with a thorn, he ﷺ said." }
      ]
    },
    {
      slug: "the-man-with-a-cold",
      title: "The man with a cold",
      line: "When a man sneezed again, he ﷺ said: he has a cold.",
      facts: ["Told by Salamah ibn al-Akwa'", "First he ﷺ said: may Allah have mercy on you", "Sneezing again and again can mean a cold"],
      source: hadith("abudawud", "5037", "Salamah ibn al-Akwa'", "Sahih (Al-Albani)", "Salamah ibn al-Akwa' said: a man sneezed near the Prophet ﷺ, and he said to him: may Allah have mercy on you. When he sneezed again, he said: the man has a cold.", "Allah have mercy on you, but when he sneezed again"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ say to the man after his first sneeze?", a: "May Allah have mercy on you", wrong: ["May Allah give you strength", "May Allah reward you", "May Allah make it easy"], why: "He said to him: Allah have mercy on you, Salamah said of the first sneeze." },
        { q: "What did he ﷺ say when the man sneezed again?", a: "The man has a cold", wrong: ["The man is hungry", "The man is tired", "The man needs water"], why: "When he sneezed again, he said: the man has a cold in the head, Salamah said." },
        { q: "He ﷺ made du'a for the man the first time he sneezed.", tf: true, why: "Allah have mercy on you, he ﷺ said to the man after his first sneeze." }
      ]
    },
    {
      slug: "a-debt-taken-on",
      title: "A debt taken on",
      line: "Abu Qatadah offered to pay a dead man's debt.",
      facts: ["Told by Salamah ibn al-Akwa'", "He ﷺ asked: is he in debt?", "Abu Qatadah said: I will pay his debt"],
      source: hadith("bukhari", "2289", "Salamah ibn al-Akwa'", "Sahih", "Salamah ibn al-Akwa' said: we were sitting with the Prophet ﷺ when a dead man was brought, and he was asked to lead his funeral prayer. He asked: is he in debt? They said no, and he prayed over him. A second man owed a debt and had left three dinars, and he prayed over him. A third owed three dinars and had left nothing, and he said: pray over your companion. Abu Qatadah said: O Messenger of Allah, lead his funeral prayer, and I will pay his debt. So he led the prayer.", "Lead his funeral prayer, and I will pay his debt"),
      difficulty: 2,
      questions: [
        { q: "Who offered to pay the dead man's debt?", a: "Abu Qatadah", wrong: ["Salamah ibn al-Akwa'", "Abu Hurairah", "Bilal ibn Rabah"], why: "Lead his funeral prayer, and I will pay his debt, Abu Qatadah said." },
        { q: "What did Abu Qatadah ask him ﷺ to do?", a: "Lead the funeral prayer", wrong: ["Wash the man's body", "Dig the man's grave", "Carry the man's body"], why: "O Allah's Messenger ﷺ, lead his funeral prayer, and I will pay his debt, Abu Qatadah said." },
        { q: "He ﷺ led the prayer once the debt was taken on.", tf: true, why: "So he led the prayer, Salamah said, once Abu Qatadah took on the debt." }
      ]
    }
  ]
};

export const SAHABA_SALAMAH_UNITS: readonly DeepUnit[] = [SALAMAH];
