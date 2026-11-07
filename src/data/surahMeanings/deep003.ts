import type { PassageDeep } from "./types";

/**
 * Ali 'Imran in depth, passage by passage (the same passages as s003.ts). Our own plain summary of Tafsir Ibn
 * Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_003: Record<string, PassageDeep> = {
  "1-9": {
    meaning: [
      "Allah sent down the Quran, confirming the Torah and the Injil before it.",
      "Some ayahs are clear, the core of the Book; others are less clear, and twisted hearts chase them.",
      "Those firm in knowledge say: it is all from our Lord; do not let our hearts swerve."
    ],
    takeaway: "Build on the clear ayahs, and ask Allah to keep your heart firm.",
    q: [
      ["Who chases the less clear ayahs, in ayah 7?", "Those with twisted hearts", "Those firm in knowledge", "The angels", "All believers"],
      ["What does the dua of ayah 8 ask?", "Do not let our hearts swerve", "Make us rich", "Give us a long life", "Bring rain"]
    ]
  },
  "10-20": {
    meaning: [
      "Wealth and children will not save those who reject Allah.",
      "Badr was a sign: a small army fighting for Allah beat a bigger one.",
      "Allah, the angels and people of knowledge bear witness: there is no god but Him."
    ],
    takeaway: "This world's pleasures are good, but what is with Allah is better.",
    q: [
      ["Which battle does ayah 13 point to?", "Badr", "Uhud", "The Trench", "Tabuk"],
      ["Ayah 18: who bear witness there is no god but Allah?", "Allah, angels and people of knowledge", "Only the kings", "Only the poets", "Only the stars"]
    ]
  },
  "21-30": {
    meaning: [
      "Allah, Owner of all kingship, honours or humbles whom He wills; all good is in His hand.",
      "He brings night into day and day into night, and the living out of the dead.",
      "On the Day, each soul will find its good deeds there, and wish its evil were far away."
    ],
    takeaway: "Ask Allah, not people, for honour and good: it is all in His hand.",
    q: [
      ["Ayah 26: in whose hand is all good?", "Allah's", "The kings'", "The rich people's", "Nobody's"],
      ["Ayah 30: what will a soul wish about its evil deeds?", "That they were far away", "That they were bigger", "That others saw them", "Nothing at all"]
    ]
  },
  "31-41": {
    meaning: [
      "Say: if you love Allah, follow me, and Allah will love you and forgive you.",
      "Allah chose Adam, Nuh, the family of Ibrahim and the family of Imran.",
      "Zakariyya prayed for a child and was given Yahya; his sign was not speaking for three days."
    ],
    story: "Imran's wife promised her unborn baby to serve Allah. She had Maryam, and Zakariyya cared for her. He often found food with her, and she said: it is from Allah.",
    takeaway: "Love for Allah shows in following His Messenger ﷺ.",
    q: [
      ["What did Zakariyya find with Maryam?", "Food from Allah", "A golden key", "A letter", "A lamb"],
      ["Ayah 41: what was Zakariyya's sign?", "Not speaking for three days", "Seeing a bright star", "A dove landing", "Rain at night"]
    ]
  },
  "42-54": {
    meaning: [
      "The angels said: Maryam, Allah chose you and purified you above the women of the worlds.",
      "They gave her news of a word from Allah: Isa, who would speak to people as a baby.",
      "By Allah's permission Isa made a clay bird fly, healed the blind and gave life to the dead."
    ],
    story: "Isa asked who would help him for Allah. His disciples said: we are Allah's helpers; we believe in Allah.",
    takeaway: "Every miracle of a prophet is by Allah's permission, not his own power.",
    q: [
      ["Ayah 49: by whose permission did Isa do miracles?", "Allah's permission", "His own power", "The king's", "The disciples'"],
      ["What did the disciples call themselves, in ayah 52?", "Allah's helpers", "Isa's army", "The new kings", "The wise ones"]
    ]
  },
  "55-63": {
    meaning: [
      "Allah told Isa: I will take you and raise you to Myself.",
      "Isa is like Adam: Allah made him from dust, said 'Be', and he was.",
      "Those who still argued were invited to pray that Allah's curse fall on whoever lies."
    ],
    takeaway: "Isa is a great prophet and a servant of Allah, created by His word 'Be'.",
    q: [
      ["Ayah 59: what was Adam made from?", "Dust", "Fire", "Light", "Water only"],
      ["Ayah 55: where did Allah raise Isa?", "To Himself", "To a mountain", "To Egypt", "To the sea"]
    ]
  },
  "64-80": {
    meaning: [
      "People of the Book, come to a common word: we worship none but Allah.",
      "Ibrahim was not a Jew or a Christian, but an upright Muslim who worshipped Allah alone.",
      "Some People of the Book return a heap of gold you trust them with; some will not return one coin."
    ],
    takeaway: "Call others gently to the common word: worship Allah alone.",
    q: [
      ["Ayah 67: what was Ibrahim?", "An upright Muslim", "A king of Egypt", "An idol maker", "A Roman soldier"],
      ["Ayah 75: are all People of the Book alike in trust?", "No: some can be trusted, some not", "Yes, none can be trusted", "Yes, all can be trusted", "Only their kings can be"]
    ]
  },
  "81-101": {
    meaning: [
      "Whoever seeks a religion other than Islam, it will not be accepted from him.",
      "You will not reach true goodness until you give from what you love.",
      "The first House set up for people is at Bakkah, Makkah; Hajj is a duty for those able."
    ],
    story: "When this ayah came, Abu Talhah gave away Bayruha, his favourite garden, for Allah. The Prophet ﷺ praised it and told him to give it to his relatives.",
    hadith: { collection: "bukhari", number: 1461, narrator: "Anas ibn Malik", text: "When 3:92 was revealed, Abu Talhah gave his most loved property, the garden of Bayruha, in charity for Allah." },
    takeaway: "Give from what you love most, not only what you do not need.",
    q: [
      ["When ayah 92 came, what did Abu Talhah give?", "His favourite garden", "An old coat", "One date", "His sword"],
      ["Ayah 96: where is the first House set up for people?", "Bakkah, Makkah", "Jerusalem", "Madinah", "Ta'if"]
    ]
  },
  "102-109": {
    meaning: [
      "Be mindful of Allah as He deserves, and do not die except as Muslims.",
      "Remember you were enemies and He joined your hearts, so you became brothers.",
      "Let there be a group among you calling to good, enjoining right and forbidding wrong."
    ],
    story: "The Aws and the Khazraj of Madinah fought each other for years. Islam joined their hearts, and they became brothers.",
    takeaway: "Unity is a blessing from Allah: guard it, and never split apart.",
    q: [
      ["Ayah 103: what did Allah do to hearts that were enemies?", "Joined them as brothers", "Made them fight more", "Sent them far away", "Left them alone"],
      ["Which two tribes did Islam join as brothers?", "The Aws and the Khazraj", "Quraysh and Thaqif", "Ad and Thamud", "Rome and Persia"]
    ]
  },
  "110-120": {
    meaning: [
      "You are the best nation brought out for people: you enjoin good, forbid wrong and believe in Allah.",
      "Not all People of the Book are alike: some recite Allah's ayahs at night and prostrate.",
      "If you are patient and mindful of Allah, their plots will not harm you at all."
    ],
    takeaway: "Being the best nation is a duty: do good, stop wrong, and keep faith.",
    q: [
      ["Ayah 113: what do some People of the Book do at night?", "Recite Allah's ayahs and prostrate", "Count their gold", "Plan wars", "Sleep all night"],
      ["Ayah 120: what keeps believers safe from plots?", "Patience and mindfulness of Allah", "Big armies", "Tall walls", "Secret plans"]
    ]
  },
  "121-143": {
    meaning: [
      "Allah helped you at Badr when you were weak, sending angels to support you.",
      "Race to forgiveness and a Paradise as wide as the heavens and the earth.",
      "It is for those who give in ease and hardship, hold their anger, forgive, and turn back after a wrong."
    ],
    story: "At Badr the believers were few and weak, and Allah helped them. At Uhud they were tested, and Allah taught them that good and hard days take turns.",
    takeaway: "Paradise is for those who hold their anger, forgive, and return to Allah after a slip.",
    q: [
      ["Ayah 133: how wide is Paradise?", "As wide as the heavens and the earth", "As wide as a city", "As wide as a sea", "As wide as a desert"],
      ["Ayah 135: what do the mindful do after a wrong?", "Turn back to Allah for forgiveness", "Hide it forever", "Blame others", "Give up"]
    ]
  },
  "144-155": {
    meaning: [
      "Muhammad ﷺ is a messenger; messengers passed away before him. Would you turn back if he died?",
      "No soul dies except by Allah's permission, at a time written for it.",
      "At Uhud some ran after a mistake, yet Allah forgave them."
    ],
    story: "When the Prophet ﷺ passed away, Abu Bakr said: whoever worshipped Muhammad, he has died; whoever worships Allah, Allah is alive and never dies. Then he recited this ayah.",
    takeaway: "We follow the Prophet ﷺ, but we worship Allah alone, who never dies.",
    q: [
      ["When the Prophet ﷺ died, what did Abu Bakr remind people?", "Allah is alive and never dies", "Hide the news", "Leave Madinah", "Choose a new prophet"],
      ["Ayah 145: when does a soul die?", "At its written time, by Allah's leave", "Whenever it wants", "Only in battle", "Never"]
    ]
  },
  "156-171": {
    meaning: [
      "By Allah's mercy the Prophet ﷺ was gentle; had he been harsh, people would have left him.",
      "Forgive them, consult them, and once you decide, trust in Allah.",
      "If Allah helps you, no one can beat you; martyrs are alive with their Lord, given provision."
    ],
    takeaway: "Lead with gentleness: forgive, consult, then trust Allah.",
    q: [
      ["Ayah 159: had the Prophet ﷺ been harsh, what would happen?", "People would have left him", "More would follow him", "Nothing would change", "He would be king"],
      ["Ayah 160: if Allah helps you, who can beat you?", "No one", "A bigger army", "The richest man", "The weather"]
    ]
  },
  "172-189": {
    meaning: [
      "Told that armies were gathering, believers grew in faith and said: Allah is enough for us.",
      "Shaytan only frightens people with his allies; fear Allah instead.",
      "Every soul will taste death; this life is only a passing enjoyment that fools people."
    ],
    hadith: { collection: "bukhari", number: 4563, narrator: "Ibn Abbas", text: "'Allah is enough for us, and He is the best Disposer of affairs' was said by Ibrahim when he was thrown into the fire, and by Muhammad ﷺ when told the people had gathered against them." },
    takeaway: "Ibrahim said 'Allah is enough for us' when thrown into the fire, and so did the Prophet ﷺ.",
    q: [
      ["Who said 'Allah is enough for us' in the fire?", "Ibrahim", "Pharaoh", "Qarun", "Iblis"],
      ["Ayah 185: what will every soul taste?", "Death", "Gold", "Honey", "Fame"]
    ]
  },
  "190-200": {
    meaning: [
      "People of understanding remember Allah and think about creation: our Lord, You did not make this in vain.",
      "Allah answers them: I never waste the deeds of anyone among you, male or female.",
      "Be patient, outlast others in patience, stand firm and be mindful of Allah, so you succeed."
    ],
    story: "The Prophet ﷺ would wake at night, look up at the sky and recite these last ayahs of Ali 'Imran.",
    takeaway: "Look at the sky and think, then call on Allah and stay patient to the end.",
    q: [
      ["Ayah 191: what do thinkers say about creation?", "You did not make this in vain", "It made itself", "It is only luck", "It will never end"],
      ["Ayah 195: whose good deeds does Allah never waste?", "Anyone's, male or female", "Only the rich", "Only men's", "Only the old"]
    ]
  }
};
