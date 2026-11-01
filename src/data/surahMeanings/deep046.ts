import type { PassageDeep } from "./types";

/**
 * Al-Ahqaf (the Sand Dunes) in depth, passage by passage (the same passages as s046.ts). Our own plain summary
 * of Tafsir Ibn Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_046: Record<string, PassageDeep> = {
  "1-10": {
    meaning: [
      "Who is more astray than one who calls on what will not answer him, till the Day of Resurrection?",
      "On that Day those false gods will be their enemies and will deny their worship.",
      "Say: I am nothing new among the messengers, and I only follow what is revealed to me."
    ],
    takeaway: "Call on Allah alone: only He hears every dua.",
    q: [
      ["Ayah 5: who is the most astray?", "One who calls on what will not answer", "One who prays", "One who learns", "One who gives"],
      ["Ayah 9: what did the Prophet ﷺ say he only follows?", "What is revealed to him", "His own ideas", "The poets", "His tribe"]
    ]
  },
  "11-20": {
    meaning: [
      "Allah told the human to be good to parents: his mother carried him and gave birth to him with hardship.",
      "Carrying and weaning take thirty months; when he reaches forty, he prays to be thankful.",
      "My Lord, help me thank Your favour on me and my parents, do good You love, and make my children good."
    ],
    story: "A man asked the Prophet ﷺ who most deserves his kindness. He said: your mother, three times, and then your father.",
    hadith: { collection: "bukhari", number: 5971, narrator: "Abu Hurairah", text: "A man asked: who among people most deserves my good company? He said: your mother. Then who? Your mother. Then who? Your mother. Then who? Your father." },
    takeaway: "Thank Allah, then honour your parents, starting with your mum.",
    q: [
      ["Ayah 15: how long are carrying and weaning?", "Thirty months", "Ten months", "One year", "Five years"],
      ["Whom did the Prophet ﷺ name three times for kindness?", "Your mother", "Your father", "Your teacher", "Your friend"]
    ]
  },
  "21-26": {
    meaning: [
      "Hud warned his people Ad among the sand dunes: worship none but Allah; I fear for you a great Day.",
      "When they saw a cloud coming toward their valleys, they said: this cloud will bring us rain.",
      "No, it was the wind they had rushed for, ruining all by its Lord's command; only their homes were left."
    ],
    story: "When the Prophet ﷺ saw a dark cloud, worry showed on his face. He said a cloud like it came to Ad, and they thought it would bring rain.",
    hadith: { collection: "bukhari", number: 4829, narrator: "Aisha", text: "When he saw clouds or wind, worry could be seen on his face. He said: what makes me sure it is not a punishment? A people were punished by wind; they saw it and said: this cloud will bring us rain." },
    takeaway: "Never feel safe from Allah's warning: thank Him and stay humble.",
    q: [
      ["Ayah 24: what did Ad think the cloud would bring?", "Rain", "Smoke", "Birds", "Dust"],
      ["Ayah 25: what was left of Ad after the wind?", "Only their homes", "Their gardens", "Their army", "Their idols"]
    ]
  },
  "27-35": {
    meaning: [
      "Allah sent a group of jinn to hear the Quran; they said: be silent! then went to warn their people.",
      "They said: our people, answer Allah's caller and believe in him; He will forgive your sins.",
      "Be patient as the messengers of firm resolve were patient; on that Day, life will seem like an hour."
    ],
    takeaway: "When the Quran is recited, go quiet and truly listen.",
    q: [
      ["Ayah 29: what did the jinn say on hearing the Quran?", "Be silent", "Run away", "Sing along", "Go to sleep"],
      ["Ayah 35: whose patience should we copy?", "The messengers of firm resolve", "The kings", "The poets", "The traders"]
    ]
  }
};
