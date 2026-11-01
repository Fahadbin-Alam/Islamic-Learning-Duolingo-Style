import type { PassageDeep } from "./types";

/**
 * Ta-Ha in depth, passage by passage (the same passages as s020.ts). Our own plain summary of Tafsir Ibn
 * Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_020: Record<string, PassageDeep> = {
  "1-24": {
    meaning: [
      "Allah did not send the Quran down to make the Prophet ﷺ suffer, but as a reminder.",
      "Musa saw a fire, and at the sacred valley Allah called him: take off your sandals.",
      "Allah said: I am Allah, there is no god but Me, so worship Me and pray to remember Me."
    ],
    story: "The Prophet ﷺ said: whoever forgets a prayer should pray it as soon as he remembers, for Allah says: pray to remember Me.",
    hadith: { collection: "muslim", number: 684, narrator: "Anas ibn Malik", text: "Whoever forgets a prayer should pray it when he remembers it; there is no other expiation for it. Allah says: establish prayer for My remembrance." },
    takeaway: "Missed a prayer by forgetting? Pray it the moment you remember.",
    q: [
      ["Ayah 12: what was Musa told to take off in the valley?", "His sandals", "His cloak", "His ring", "His staff"],
      ["Missed a prayer by forgetting: when do you pray it?", "As soon as you remember", "Never", "Next year", "Only on Friday"]
    ]
  },
  "25-54": {
    meaning: [
      "Musa prayed: my Lord, open my chest, make my task easy, and untie the knot from my tongue.",
      "He asked for his brother Harun as a helper, and Allah granted it.",
      "Allah told them: speak to Pharaoh with gentle words; perhaps he will remember."
    ],
    takeaway: "Before a hard task, make Musa's dua: Rabbi-shrah li sadri.",
    q: [
      ["Ayah 29: whom did Musa ask for as a helper?", "His brother Harun", "His father", "Pharaoh's son", "A soldier"],
      ["Ayah 44: how should they speak to Pharaoh?", "With gentle words", "With shouting", "With threats", "Not at all"]
    ]
  },
  "55-76": {
    meaning: [
      "From the earth We created you, into it We return you, and from it We bring you out again.",
      "The magicians threw their ropes and staffs, and Musa felt fear inside; Allah said: do not fear.",
      "The magicians fell down in prostration: we believe in the Lord of Harun and Musa."
    ],
    takeaway: "Truth beats tricks: when the magicians saw it, they believed at once.",
    q: [
      ["Ayah 70: whose Lord did the magicians believe in?", "The Lord of Harun and Musa", "Pharaoh's lord", "The sun", "Their ropes"],
      ["Ayah 55: what were we created from?", "From the earth", "From fire", "From light", "From water only"]
    ]
  },
  "77-89": {
    meaning: [
      "Allah told Musa to take His servants by night, and struck a dry path for them through the sea.",
      "While Musa was away, as-Samiri made a calf from their ornaments, and it made a lowing sound.",
      "It could not answer them, nor bring them any harm or benefit."
    ],
    takeaway: "Anything that cannot answer or help you is not worth worshipping.",
    q: [
      ["Ayah 77: what kind of path went through the sea?", "A dry path", "A muddy path", "A bridge", "A tunnel"],
      ["Ayah 88: what did as-Samiri make from the ornaments?", "A calf", "A crown", "A ship", "A sword"]
    ]
  },
  "90-104": {
    meaning: [
      "Harun had warned them: my people, you are only being tested; your Lord is the Most Merciful.",
      "Musa asked: what made you do this? Then he scattered the calf into the sea.",
      "Your only god is Allah; there is no god but Him, and His knowledge covers everything."
    ],
    takeaway: "Speak up against wrong like Harun, even when few listen.",
    q: [
      ["Ayah 90: what did Harun tell his people?", "You are only being tested", "Follow the calf", "I am your lord", "Go home"],
      ["Ayah 98: what does Allah's knowledge cover?", "Everything", "Only the sky", "Only the past", "Only Egypt"]
    ]
  },
  "105-115": {
    meaning: [
      "They ask about the mountains: say, my Lord will blow them away like dust.",
      "Voices will be hushed before the Most Merciful; you will hear only whispers.",
      "Do not hurry with the Quran before its revelation is finished, and say: my Lord, increase me in knowledge."
    ],
    takeaway: "Make the dua every day: Rabbi zidni 'ilma, my Lord, increase me in knowledge.",
    q: [
      ["Ayah 114: what did Allah teach the Prophet ﷺ to ask for more of?", "Knowledge", "Wealth", "Sleep", "Power"],
      ["Ayah 108: what will voices be like before the Most Merciful?", "Hushed, only whispers", "Loud shouts", "Singing", "Laughter"]
    ]
  },
  "116-128": {
    meaning: [
      "Iblis refused to bow, and Allah warned Adam: he is an enemy to you and your wife.",
      "Shaytan whispered: shall I show you the tree of forever? They ate from it.",
      "Adam disobeyed and slipped; then his Lord chose him, turned to him and guided him."
    ],
    takeaway: "Shaytan promises 'forever' but brings loss: Allah's way is the true guidance.",
    q: [
      ["Ayah 120: what did Shaytan call the tree?", "The tree of forever", "The tree of light", "The tree of water", "The lucky tree"],
      ["Ayah 122: what did Allah do after Adam slipped?", "Chose him and guided him", "Forgot him", "Left him alone", "Made him an angel"]
    ]
  },
  "129-135": {
    meaning: [
      "Be patient with what they say, and glorify your Lord before sunrise and before sunset.",
      "Do not stare longingly at the luxuries others enjoy: your Lord's provision is better and lasting.",
      "Tell your family to pray, and be patient with it yourself; the good end is for the mindful."
    ],
    takeaway: "Do not envy what others have: pray, and tell your family to pray.",
    q: [
      ["Ayah 130: when should we glorify our Lord?", "Before sunrise and sunset", "Only at noon", "Only in Ramadan", "Never"],
      ["Ayah 132: whom should we tell to pray?", "Our family", "Only strangers", "No one", "Only kings"]
    ]
  }
};
