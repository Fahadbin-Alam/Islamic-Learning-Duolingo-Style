import type { PassageDeep } from "./types";

/**
 * Al-Hajj in depth, passage by passage (the same passages as s022.ts). Our own plain summary of Tafsir Ibn
 * Kathir and Tafsir as-Sa'di, as in deep002.ts; anything the scholars differ on is left out.
 */
export const DEEP_022: Record<string, PassageDeep> = {
  "1-10": {
    meaning: [
      "People, be mindful of your Lord: the quake of the Hour is a tremendous thing.",
      "Allah created you from dust, then a drop, then a clinging clot, then a lump of flesh.",
      "You see the earth dry and lifeless; when rain falls on it, it stirs and swells with plants."
    ],
    takeaway: "The One who grows plants from dry earth can raise the dead.",
    q: [
      ["Ayah 5: what were we first created from?", "Dust", "Fire", "Light", "Stone"],
      ["Ayah 5: what happens when rain falls on dry earth?", "It stirs and swells with plants", "It cracks more", "Nothing at all", "It turns to sand"]
    ]
  },
  "11-22": {
    meaning: [
      "Some worship Allah on the edge: if good comes, they are content; if a test comes, they turn back.",
      "They lose this world and the next; that is the clear loss.",
      "Everything in the heavens and earth bows to Allah: sun, moon, stars, mountains, trees and animals."
    ],
    takeaway: "Worship Allah in good times and hard times, not only when life is easy.",
    q: [
      ["Ayah 11: what do 'edge' worshippers do when tested?", "Turn back", "Pray more", "Stay firm", "Give charity"],
      ["Ayah 18: which of these bows to Allah?", "Sun, moon and trees", "Nothing", "Only angels", "Only people"]
    ]
  },
  "23-25": {
    meaning: [
      "Allah will admit those who believe and do good into gardens with rivers flowing beneath.",
      "There they will wear bracelets of gold and pearls, and their clothes will be silk.",
      "They were guided to good words and to the path of the Praiseworthy."
    ],
    takeaway: "Kind speech leads to good places: speak kindly.",
    q: [
      ["Ayah 23: what will their clothes in Paradise be?", "Silk", "Wool", "Cotton", "Leather"],
      ["Ayah 24: what were the believers guided to?", "Good words", "Gold", "Fame", "Long games"]
    ]
  },
  "26-33": {
    meaning: [
      "Allah showed Ibrahim the place of the House: worship none with Me, and purify My House.",
      "Call people to Hajj: they will come on foot and on lean camels from every far road.",
      "Whoever honours Allah's symbols, that comes from the mindfulness of hearts."
    ],
    story: "The Prophet ﷺ said: whoever does Hajj for Allah, avoiding shameful talk and sin, returns as pure as the day his mother gave birth to him.",
    hadith: { collection: "bukhari", number: 1521, narrator: "Abu Hurairah", text: "Whoever performs Hajj for Allah's sake and does not speak obscenely or do evil returns like the day his mother bore him." },
    takeaway: "Hajj can wipe the slate clean: pray you get to go.",
    q: [
      ["Ayah 27: how will people come to Hajj?", "On foot and on lean camels", "Only by ship", "Only kings come", "No one comes"],
      ["After a pure Hajj, how does one return?", "Pure as a newborn", "Rich", "Famous", "Tired only"]
    ]
  },
  "34-38": {
    meaning: [
      "For every nation Allah set a rite of sacrifice, so they mention His name over the animals.",
      "Give good news to the humble, whose hearts tremble when Allah is mentioned.",
      "Their meat and blood do not reach Allah; what reaches Him is your mindfulness."
    ],
    takeaway: "Allah looks at the heart behind the deed, not the deed's size.",
    q: [
      ["Ayah 37: what reaches Allah from the sacrifice?", "Your mindfulness", "The meat", "The blood", "The price"],
      ["Ayah 35: what happens to humble hearts when Allah is mentioned?", "Tremble with awe", "Fall asleep", "Forget it", "Nothing"]
    ]
  },
  "39-48": {
    meaning: [
      "Allah defends those who believe; He does not love the treacherous and ungrateful.",
      "Those driven from their homes only for saying 'Our Lord is Allah' were allowed to defend themselves.",
      "It is not the eyes that are blind, but the hearts within the chests."
    ],
    takeaway: "Real blindness is in the heart: ask Allah for a seeing heart.",
    q: [
      ["Ayah 46: what is it that is truly blind?", "The hearts", "The eyes", "The ears", "The hands"],
      ["Ayah 40: why were they driven from their homes?", "For saying 'Our Lord is Allah'", "For stealing", "For lying", "For being poor"]
    ]
  },
  "49-57": {
    meaning: [
      "Say: people, I am only a clear warner to you.",
      "Those who believe and do good will have forgiveness and a noble provision.",
      "On that Day the kingdom is Allah's; He will judge between them."
    ],
    takeaway: "The Prophet ﷺ warned clearly: listen while there is time.",
    q: [
      ["Ayah 49: what did the Prophet ﷺ say he was?", "A clear warner", "A king", "A poet", "A merchant"],
      ["Ayah 50: what do believers who do good get?", "Forgiveness and a noble provision", "Nothing", "Only gold", "A long life"]
    ]
  },
  "58-64": {
    meaning: [
      "Those who migrate for Allah's sake and then die, Allah will give them a good provision.",
      "Allah merges night into day and day into night; He hears and sees all.",
      "Allah sends rain from the sky, and the earth turns green; He is Subtle, Aware."
    ],
    takeaway: "Leaving home for Allah is never a loss: He provides better.",
    q: [
      ["Ayah 63: what happens to the earth after rain?", "It turns green", "It turns red", "It floods forever", "Nothing"],
      ["Ayah 58: what does Allah give those who migrate for Him?", "A good provision", "Nothing", "Only a house", "Only fame"]
    ]
  },
  "65-72": {
    meaning: [
      "Allah made what is on earth serve you, and ships sail the sea by His command.",
      "He holds the sky back from falling on the earth, except by His permission.",
      "He gave you life, then will cause you to die, then give you life again."
    ],
    takeaway: "Every boat afloat is a sign of His mercy, and so is all He holds up.",
    q: [
      ["Ayah 65: by whose command do ships sail?", "By Allah's command", "By the wind alone", "By the captain", "By luck"],
      ["Ayah 65: what does Allah hold back, and from what?", "The sky, from falling", "The rain", "The trees", "The birds"]
    ]
  },
  "73-78": {
    meaning: [
      "Those you call on besides Allah could not create even a fly, even if they all joined together.",
      "If a fly snatched something from them, they could not take it back.",
      "Allah named you Muslims before; strive for Him and hold fast to Him: He is your Protector."
    ],
    takeaway: "Idols cannot make the tiniest insect: only Allah creates.",
    q: [
      ["Ayah 73: what could false gods not create?", "Even a fly", "A mountain only", "A river only", "A star only"],
      ["Ayah 78: what did Allah name the believers?", "Muslims", "Kings", "Travellers", "Strangers"]
    ]
  }
};
