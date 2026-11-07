import type { PassageDeep } from "./types";

/**
 * Al-Ma'idah in depth, passage by passage (the same passages as s005.ts). Our own plain summary of Tafsir Ibn
 * Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_005: Record<string, PassageDeep> = {
  "1-5": {
    meaning: [
      "Believers, keep your promises and agreements.",
      "Help each other in goodness and mindfulness, never in sin and wrongdoing.",
      "Today I have perfected your religion for you, completed My favour, and chosen Islam for you."
    ],
    story: "A man told Umar: if this ayah came to us, we would make that day a festival. Umar said: I know where it came down, at Arafah, on a Friday.",
    hadith: { collection: "bukhari", number: 45, narrator: "Umar ibn al-Khattab", text: "Umar said 5:3 was revealed to the Prophet ﷺ while he was standing at Arafah on a Friday." },
    takeaway: "Islam is complete: nothing needs adding to it.",
    q: [
      ["Where was 'Today I have perfected your religion' revealed?", "At Arafah, on a Friday", "In a cave", "In Ta'if", "On a ship"],
      ["Ayah 2: help each other in what?", "Goodness and mindfulness", "Sin and wrongdoing", "Only trade", "Only games"]
    ]
  },
  "6-11": {
    meaning: [
      "Before prayer, wash your face and arms to the elbows, wipe your head, and wash your feet.",
      "Allah does not want hardship for you; He wants to purify you.",
      "Do not let hate for a people stop you being just: justice is closest to mindfulness."
    ],
    takeaway: "Be fair even to people you dislike.",
    q: [
      ["Ayah 6: up to where do we wash the arms?", "To the elbows", "To the wrists", "To the shoulders", "Only the fingers"],
      ["Ayah 8: what is justice closest to?", "Mindfulness", "Wealth", "Fame", "Anger"]
    ]
  },
  "12-26": {
    meaning: [
      "A light and a clear Book have come to you from Allah, guiding to paths of peace.",
      "Musa told his people to enter the holy land; they refused out of fear.",
      "Two God-fearing men said: go in through the gate and you will win; trust in Allah."
    ],
    story: "Musa's people feared the strong people in the land and said: go, you and your Lord, and fight. So they wandered in the desert for forty years.",
    takeaway: "Fear holds people back; trust in Allah moves them forward.",
    q: [
      ["Ayah 23: what did the two God-fearing men say?", "Go in through the gate", "Turn back home", "Wait forty years", "Build a wall"],
      ["Ayah 16: where does the Book guide people?", "To paths of peace", "To gold mines", "To war", "Nowhere"]
    ]
  },
  "27-34": {
    meaning: [
      "Adam's two sons each offered a gift; Allah accepted from one and not the other.",
      "Allah accepts only from those who are mindful of Him.",
      "Whoever saves one life, it is as if he saved all people."
    ],
    story: "The jealous brother took his brother's life. Then Allah sent a crow scratching the ground, to show him how to bury his brother, and he was filled with regret.",
    takeaway: "Every single life is precious, like all of humanity.",
    q: [
      ["Ayah 32: saving one life is like what?", "Saving all people", "Saving a city", "Nothing much", "Saving a tree"],
      ["What did the crow show the son of Adam?", "How to bury his brother", "Where to find food", "How to fly", "The way home"]
    ]
  },
  "35-43": {
    meaning: [
      "Be mindful of Allah, seek the way to come near Him, and strive in His path.",
      "Allah owns the heavens and the earth; He forgives whoever turns back to Him.",
      "Do not grieve over those who rush to disbelief."
    ],
    takeaway: "Come near Allah by obeying Him, and He accepts whoever repents.",
    q: [
      ["Ayah 35: what should believers seek?", "A way to come near Allah", "Fame", "Power over others", "Easy money"],
      ["Ayah 39: whom does Allah forgive?", "Whoever turns back to Him", "No one", "Only the rich", "Only angels"]
    ]
  },
  "44-50": {
    meaning: [
      "The Torah had guidance and light, and the Injil confirmed it.",
      "The Quran came with the truth, confirming the books before it and guarding over them.",
      "To each We gave a way; so race one another in doing good."
    ],
    takeaway: "Don't just do good: race to it.",
    q: [
      ["Ayah 48: how does the Quran treat earlier books?", "Confirms them and guards over them", "Ignores them", "Copies them", "Hides them"],
      ["Ayah 48: what should people race in?", "Doing good", "Getting rich", "Arguing", "Sleeping"]
    ]
  },
  "51-56": {
    meaning: [
      "If anyone turns from their religion, Allah will bring a people He loves and who love Him.",
      "They are humble to believers, firm with enemies, and fear no one's blame.",
      "Your true ally is Allah, His Messenger ﷺ and the believers who pray and give zakah."
    ],
    takeaway: "Be humble with believers, and never fear blame for doing right.",
    q: [
      ["Ayah 54: whose blame do Allah's loved ones fear?", "No one's", "Everyone's", "Their friends'", "Their own"],
      ["Ayah 55: who is the believers' true ally?", "Allah, His Messenger ﷺ and the believers", "The richest tribe", "Any king", "No one"]
    ]
  },
  "57-66": {
    meaning: [
      "Do not take as friends those who mock your religion and your call to prayer.",
      "Why do their scholars not forbid them from lies and eating what is unlawful?",
      "Had they kept the Torah and Injil, blessings would rain from above and grow from below."
    ],
    takeaway: "Scholars must speak up against wrong, and obeying Allah brings blessing.",
    q: [
      ["Ayah 58: what did some people mock?", "The call to prayer", "The weather", "The market", "Their own songs"],
      ["Ayah 66: had they kept their books, what would come?", "Blessings from above and below", "Floods", "Nothing at all", "More arguments"]
    ]
  },
  "67-77": {
    meaning: [
      "Messenger, convey all that was sent to you; Allah will protect you from people.",
      "The Messiah, son of Maryam, was only a messenger; he and his mother both ate food.",
      "People of the Book, do not go to extremes in your religion beyond the truth."
    ],
    takeaway: "Speak the truth fully, and keep religion balanced: no extremes.",
    q: [
      ["Ayah 75: what did Isa and his mother do, showing they were human?", "They ate food", "They flew", "They never slept", "They lived forever"],
      ["Ayah 77: what should we avoid in religion?", "Going to extremes", "Praying", "Being kind", "Learning"]
    ]
  },
  "78-86": {
    meaning: [
      "Some of the Children of Israel were cursed because they did not stop each other from wrong.",
      "The nearest in love to believers are those who say 'we are Christians'; among them are humble priests.",
      "When they hear the Quran, their eyes overflow with tears, for they know it is the truth."
    ],
    takeaway: "Stop each other from wrong, and let the truth move your heart.",
    q: [
      ["Ayah 79: why were some cursed?", "They did not stop each other from wrong", "They prayed too much", "They were poor", "They travelled"],
      ["Ayah 83: what happened when some heard the Quran?", "Their eyes filled with tears", "They laughed", "They fell asleep", "They ran away"]
    ]
  },
  "87-93": {
    meaning: [
      "Do not forbid the good things Allah made lawful for you, and do not go too far.",
      "If you break an oath, feed or clothe ten poor people; if you cannot, fast three days.",
      "Wine, gambling, idols and arrows for luck are filth, Shaytan's work: avoid them."
    ],
    takeaway: "Enjoy the good Allah allows, and keep far from what He forbids.",
    q: [
      ["Ayah 89: how do you make up for a broken oath?", "Feed or clothe ten poor people", "Say sorry only", "Pay a king", "Nothing is needed"],
      ["Ayah 87: what must we not forbid?", "Good things Allah made lawful", "Lies", "Stealing", "Bad words"]
    ]
  },
  "94-108": {
    meaning: [
      "Allah made the Ka'bah, the sacred House, a support for people.",
      "Do not ask about things that would trouble you if they were shown to you.",
      "Near death, call two just witnesses when making a will."
    ],
    takeaway: "Ask about what helps you, and leave what does not concern you.",
    q: [
      ["Ayah 97: what did Allah make the Ka'bah for people?", "A support", "A market", "A fortress", "A palace"],
      ["Ayah 106: how many witnesses for a will near death?", "Two just witnesses", "None", "Ten", "One child"]
    ]
  },
  "109-120": {
    meaning: [
      "Isa's disciples asked: can your Lord send down to us a table spread from heaven?",
      "Isa prayed for it, and Allah sent it down as a sign and a festival.",
      "On the Day, Isa will say: I only told them what You commanded: worship Allah, my Lord and your Lord."
    ],
    takeaway: "On that Day, people's truthfulness will benefit them.",
    q: [
      ["Ayah 114: what did the table from heaven become for them?", "A sign and a festival", "A punishment", "A secret", "A market"],
      ["Ayah 117: what did Isa tell people?", "Worship Allah, my Lord and your Lord", "Worship me", "Worship my mother", "Follow the kings"]
    ]
  }
};
