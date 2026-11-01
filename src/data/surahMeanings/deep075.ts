import type { PassageDeep } from "./types";

/**
 * Al-Qiyamah (the Resurrection) in depth, passage by passage (the same passages as s075.ts). Our own plain
 * summary of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_075: Record<string, PassageDeep> = {
  "1-15": {
    meaning: [
      "Allah swears by the Day of Resurrection, and by the self-blaming soul.",
      "Does man think We will not gather his bones? Yes, We can even reshape his fingertips.",
      "That Day man will be told what he sent ahead and what he left behind; he is a witness against himself."
    ],
    takeaway: "A conscience that blames you for wrong is a gift: listen to it and repent.",
    q: [
      ["Ayah 4: what can Allah even reshape?", "His fingertips", "Only his hair", "Only his teeth", "Nothing at all"],
      ["Ayah 2: by what kind of soul does Allah swear?", "The self-blaming soul", "The proud soul", "The sleeping soul", "The lost soul"]
    ]
  },
  "16-25": {
    meaning: [
      "Do not move your tongue with it to hurry it; upon Us is gathering it and its recitation.",
      "When We recite it, follow its recitation; then upon Us is making it clear.",
      "Some faces that Day will be radiant, looking at their Lord; other faces will be gloomy."
    ],
    story: "When revelation came, the Prophet ﷺ moved his lips quickly to memorise it. Then these ayahs came, and after that he listened, and Allah kept it in his heart.",
    hadith: { collection: "bukhari", number: 5, narrator: "Ibn Abbas", text: "The Messenger of Allah ﷺ used to bear the revelation with great trouble and would move his lips... so Allah revealed: move not your tongue with it to hasten it." },
    takeaway: "Learn the Quran calmly: Allah promised to keep it safe.",
    q: [
      ["Ayah 16: what should not be moved to hurry it?", "The tongue", "The hands", "The feet", "The eyes"],
      ["Ayah 23: at whom do the radiant faces look?", "At their Lord", "At the sun", "At each other", "At the stars"]
    ]
  },
  "26-40": {
    meaning: [
      "When the soul reaches the collarbones, and it is said: who can cure him?",
      "He knows it is the parting, and the drive that Day is to your Lord.",
      "Was he not a drop of fluid, then a clot, then shaped? Is that One not able to give life to the dead?"
    ],
    takeaway: "The One who made you from a drop can bring you back: get ready.",
    q: [
      ["Ayah 26: where does the soul reach at death?", "The collarbones", "The fingertips", "The knees", "The feet"],
      ["Ayah 37: what was man before he was shaped?", "A drop of fluid", "A stone", "A flame", "A tree"]
    ]
  }
};
