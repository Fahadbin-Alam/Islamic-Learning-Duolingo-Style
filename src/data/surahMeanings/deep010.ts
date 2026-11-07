import type { PassageDeep } from "./types";

/**
 * Yunus in depth, passage by passage (the same passages as s010.ts). Our own plain summary of Tafsir Ibn
 * Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_010: Record<string, PassageDeep> = {
  "1-20": {
    meaning: [
      "Your Lord created the heavens and earth in six days, then rose over the Throne.",
      "He made the sun a shining glow and the moon a light, and set its phases so you can count years.",
      "When harm touches a person he calls on Allah lying down, sitting or standing; when it lifts, he forgets."
    ],
    takeaway: "Remember Allah in good times too, not only when trouble comes.",
    q: [
      ["Ayah 5: why did Allah set the moon's phases?", "So we can count the years", "To scare people", "For no reason", "To hide the sun"],
      ["Ayah 12: what does a person often do once harm lifts?", "Forgets Allah", "Thanks Allah more", "Prays all night", "Gives charity"]
    ]
  },
  "21-30": {
    meaning: [
      "People pray sincerely in a storm at sea; once saved, they go back to wrongdoing.",
      "This life is like rain that makes crops grow, then suddenly they are gone.",
      "Allah calls to the Home of Peace; those who do good get the best, and more."
    ],
    story: "The Prophet ﷺ explained 'and more' in ayah 26: when the people of Paradise enter it, the veil is lifted and they see their Lord, the dearest gift of all.",
    hadith: { collection: "muslim", number: 181, narrator: "Suhayb ar-Rumi", text: "When the people of Paradise enter Paradise, the veil is lifted, and nothing is dearer to them than looking at their Lord. Then he ﷺ recited 10:26." },
    takeaway: "This world fades fast like a crop; aim for the Home of Peace.",
    q: [
      ["What is the 'more' given to the people of Paradise?", "Seeing their Lord", "More gold", "Bigger houses", "Longer days"],
      ["Ayah 24: what is this life like?", "Rain making crops grow, then gone", "A mountain that never moves", "A sea with no end", "A long sleep"]
    ]
  },
  "31-56": {
    meaning: [
      "Ask them: who provides for you from the sky and earth? They will say: Allah.",
      "The Quran could not be made up by anyone but Allah; bring one surah like it if you can.",
      "Allah does not wrong people at all; it is people who wrong themselves."
    ],
    takeaway: "No one could ever write a surah like the Quran: it is Allah's word.",
    q: [
      ["Ayah 38: what were deniers dared to bring?", "One surah like it", "A whole army", "A golden book", "A new prophet"],
      ["Ayah 44: who wrongs people?", "People wrong themselves", "Allah", "The angels", "The animals"]
    ]
  },
  "57-70": {
    meaning: [
      "The Quran has come to you: advice from your Lord, healing for hearts, guidance and mercy.",
      "Rejoice in Allah's bounty and mercy: that is better than all they gather.",
      "Allah's friends will have no fear and no grief: those who believe and are mindful."
    ],
    takeaway: "The Quran heals the heart: read it when you feel low.",
    q: [
      ["Ayah 57: what does the Quran bring for hearts?", "Healing", "Fear", "Boredom", "Sadness"],
      ["Ayah 63: who are Allah's friends?", "Those who believe and are mindful", "The richest people", "The strongest", "The famous"]
    ]
  },
  "71-82": {
    meaning: [
      "Nuh told his people: I put my trust in Allah, and I ask you for no reward.",
      "The magicians came, and Musa said: what you brought is magic; Allah will undo it.",
      "Allah makes the truth win by His words, however much the wrongdoers hate it."
    ],
    takeaway: "Trust Allah like Nuh, and truth will win like it did for Musa.",
    q: [
      ["Ayah 72: what did Nuh ask his people for?", "No reward at all", "Gold", "A ship", "Land"],
      ["Ayah 82: how does Allah make the truth win?", "By His words", "By money", "By magic", "By luck"]
    ]
  },
  "83-93": {
    meaning: [
      "Allah told Musa and Harun: make your homes places of prayer, and give good news to believers.",
      "As Pharaoh drowned he said: I believe; but it was too late.",
      "Allah said: today We save your body, as a sign for those after you."
    ],
    takeaway: "Turn to Allah now: faith at the last breath came too late for Pharaoh.",
    q: [
      ["Ayah 87: what were the believers to make their homes?", "Places of prayer", "Markets", "Forts", "Stables"],
      ["Ayah 92: why was Pharaoh's body kept?", "As a sign for those after him", "To honour him", "For a museum", "By mistake"]
    ]
  },
  "94-103": {
    meaning: [
      "Only the people of Yunus believed in time, so Allah lifted the disgrace from them.",
      "Had your Lord willed, everyone on earth would believe; you cannot force people.",
      "Look at what is in the heavens and the earth."
    ],
    takeaway: "Invite people kindly; faith cannot be forced.",
    q: [
      ["Ayah 99: can people be forced to believe?", "No, you cannot force people", "Yes, always", "Only children", "Only with money"],
      ["Ayah 98: what did Allah lift from Yunus's people?", "The disgrace", "Their homes", "Their trade", "Their sight"]
    ]
  },
  "104-109": {
    meaning: [
      "Turn your face to the true faith, and do not call on others besides Allah.",
      "If Allah touches you with harm, none can remove it but Him; if He wants good for you, none can stop it.",
      "Follow what is revealed to you and be patient until Allah judges."
    ],
    takeaway: "Only Allah can remove harm or stop good: so ask Him alone.",
    q: [
      ["Ayah 107: who can remove a harm Allah sends?", "None but Him", "A doctor alone", "A king", "Luck"],
      ["Ayah 109: what must the Prophet ﷺ do until Allah judges?", "Follow the revelation and be patient", "Give up", "Hurry", "Argue"]
    ]
  }
};
