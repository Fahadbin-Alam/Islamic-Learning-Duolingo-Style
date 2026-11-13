import { bukhari, quran, type MapSource } from "./seerahMap";

/**
 * The signs in creation, alive. The lessons about the ayahs that ask us to look at Allah's signs in the world open on
 * a living scene of their own, in the place of their photo, as the lessons about the moon open on the moon's sky
 * (moonSky.ts):
 *
 * - rain on a dead land, which comes to life: so will the dead be raised (Quran 35:9, 7:57);
 * - the clouds driven, brought together and piled up, and the rain coming out from within them (Quran 24:43, 30:48);
 * - the crops that grow green, then turn yellow and become broken straw: so is the life of this world (Quran 57:20,
 *   18:45);
 * - the seed that grows seven ears, with a hundred grains in each, for those who spend in Allah's way (Quran 2:261);
 * - the two seas, one sweet and one salty, with a barrier between them (Quran 25:53, 55:19, 55:20);
 * - the ships that sail the sea by His command, tall like mountains (Quran 22:65, 42:32, 45:12);
 * - the earth spread out, and the mountains set firm on it like pegs (Quran 78:6, 78:7, 16:15);
 * - the bee, inspired to make its homes in the mountains and the trees, and its honey of many colors, with healing in
 *   it (Quran 16:68, 16:69);
 * - the spider's house, the weakest of houses (Quran 29:41);
 * - the good word, like a good tree whose root is firm and whose branches are in the sky (Quran 14:24, 14:25), drawn
 *   as a date palm, the tree the Prophet ﷺ likened to the Muslim (Sahih al-Bukhari 4698);
 * - the camel, the sky, the mountains and the earth that we are told to look at (Quran 88:17 to 88:20);
 * - the birds above us, their wings spread and folded in, held up by none but the Most Merciful (Quran 67:19, 16:79,
 *   24:41);
 * - the seed we sow, which Allah makes grow (Quran 56:63, 56:64);
 * - the water we drink, sent down from the clouds, sweet and not salty (Quran 56:68 to 56:70);
 * - the fire we kindle from the green tree, a reminder and a gift for travelers (Quran 56:71 to 56:73, 36:80);
 * - the shade He stretches out, the sun its guide, drawn in little by little (Quran 25:45, 25:46);
 *
 * and the parables told with things in creation (parableArt.ts draws them):
 *
 * - the foam on the flood and on melted metal, which passes away, while what benefits people remains (Quran 13:17);
 * - the rain on three lands: good, hard and barren (Sahih al-Bukhari 79; the good land, Quran 7:58);
 * - the deeds of those who reject their Lord, like ashes in a stormy wind (Quran 14:18);
 * - the garden struck in the night, black and bare by the morning (Quran 68:17 to 68:24);
 * - the two gardens of grapes, with palms around and crops between, whose fruit was destroyed (Quran 18:32 to 18:42);
 *
 * and the signs in the stories of the Quran (storyArt.ts and historyArt.ts draw them):
 *
 * - Nuh's ark, built of planks and nails, two of each kind carried in it, sailing on waves like mountains and coming to
 *   rest on al-Judi (Quran 11:37 to 11:44, 54:11 to 54:13);
 * - the sea split for Musa, each side like a great mountain, with a dry path through it (Quran 26:61, 26:63, 20:77);
 * - the clouds' shade, the manna and the quails, and the twelve springs from the rock (Quran 2:57, 2:60, 7:160);
 * - the she-camel of Salih, with her day to drink and theirs (Quran 26:149, 26:155, 26:156, 91:13);
 * - the ant who warned the others in their valley (Quran 27:18, 27:19);
 * - the hoopoe, missing, then back with news from Saba, then off with the letter (Quran 27:20, 27:22, 27:23, 27:28);
 * - the king's dream of seven fat cows and seven lean ones, and its meaning (Quran 12:43, 12:47 to 12:49);
 * - the cave, where the sun turned away from the sleepers and their dog lay at the entrance (Quran 18:10, 18:11, 18:17,
 *   18:18);
 * - the elephant held back from Makkah, and the birds in flocks with their stones of baked clay (Quran 105:1 to
 *   105:5, Sahih al-Bukhari 2731);
 * - the winter and summer journeys of Quraysh, fed against hunger and safe from fear (Quran 106:1 to 106:4).
 *
 * Each scene shows only what its ayahs say. Nothing in a scene is a person or an angel: only the land, the sky, the
 * sea, plants, animals and things; the people of a parable are never drawn, only their gardens, and no Prophet and no
 * one of their people is drawn in the stories: the sleepers stay inside the dark cave, and an army is only its dust.
 */

export type SignKind =
  | "rain"
  | "clouds"
  | "fade"
  | "seed"
  | "seas"
  | "ships"
  | "mountains"
  | "bee"
  | "spider"
  | "tree"
  | "look"
  | "birds"
  | "sow"
  | "water"
  | "fire"
  | "shade"
  | "foam"
  | "lands"
  | "ashes"
  | "garden"
  | "twoGardens"
  | "ark"
  | "sea"
  | "springs"
  | "sheCamel"
  | "ants"
  | "hoopoe"
  | "dream"
  | "cave"
  | "elephant"
  | "journeys";

export type SignScene = {
  id: string;
  kind: SignKind;
  caption: string;
  sources: MapSource[];
};

export const SIGN_SCENES: readonly SignScene[] = [
  {
    id: "sign-rain",
    kind: "rain",
    caption: "Allah sends the winds; they stir up the clouds, and rain falls on a dead land and brings it to life. So will the dead be raised.",
    sources: [quran(35, 9), quran(7, 57)]
  },
  {
    id: "sign-clouds",
    kind: "clouds",
    caption: "Allah drives the clouds, brings them together and piles them up, and you see the rain come out from within them.",
    sources: [quran(24, 43), quran(30, 48)]
  },
  {
    id: "sign-fade",
    kind: "fade",
    caption: "After the rain the plants grow green; then they dry, turn yellow and become broken straw, scattered by the winds. So is the life of this world.",
    sources: [quran(57, 20), quran(18, 45)]
  },
  {
    id: "sign-seed",
    kind: "seed",
    caption: "Those who spend in Allah's way are like a seed that grows seven ears, with a hundred grains in each ear. Allah gives more to whom He wills.",
    sources: [quran(2, 261)]
  },
  {
    id: "sign-seas",
    kind: "seas",
    caption: "Allah let the two seas meet, one sweet and one salty, with a barrier between them that they do not cross.",
    sources: [quran(25, 53), quran(55, 19), quran(55, 20)]
  },
  {
    id: "sign-ships",
    kind: "ships",
    caption: "The ships sail through the sea by His command, tall like mountains, so that people may seek His bounty.",
    sources: [quran(22, 65), quran(42, 32), quran(45, 12)]
  },
  {
    id: "sign-mountains",
    kind: "mountains",
    caption: "Allah spread out the earth and set firm mountains on it, like pegs, so that it does not shake with us.",
    sources: [quran(78, 6), quran(78, 7), quran(16, 15)]
  },
  {
    id: "sign-bee",
    kind: "bee",
    caption: "Allah inspired the bee to make its homes in the mountains and the trees, and to eat from every fruit. From it comes honey of many colors, with healing for people.",
    sources: [quran(16, 68), quran(16, 69)]
  },
  {
    id: "sign-spider",
    kind: "spider",
    caption: "Those who rely on others than Allah are like the spider that builds a house, and the weakest of houses is the spider's house.",
    sources: [quran(29, 41)]
  },
  {
    id: "sign-tree",
    kind: "tree",
    caption: "A good word is like a good tree: its root is firm, its branches are in the sky, and it gives its fruit at every time by its Lord's leave.",
    sources: [quran(14, 24), quran(14, 25), bukhari("4698")]
  },
  {
    id: "sign-look",
    kind: "look",
    caption: "Do they not look at the camels, how they were created? At the sky, how it was raised? At the mountains, how they were set firm? At the earth, how it was spread out?",
    sources: [quran(88, 17), quran(88, 18), quran(88, 19), quran(88, 20)]
  },
  {
    id: "sign-birds",
    kind: "birds",
    caption: "Do they not see the birds above them, spreading their wings and folding them in? None holds them up but the Most Merciful. Each of them knows its own prayer and praise.",
    sources: [quran(67, 19), quran(16, 79), quran(24, 41)]
  },
  {
    id: "sign-sow",
    kind: "sow",
    caption: "Have you seen the seed you sow? Is it you who make it grow, or is it Allah who makes it grow?",
    sources: [quran(56, 63), quran(56, 64)]
  },
  {
    id: "sign-water",
    kind: "water",
    caption: "Have you seen the water you drink? Is it you who send it down from the clouds, or Allah? Had He willed, He would have made it salty. So why do you not give thanks?",
    sources: [quran(56, 68), quran(56, 69), quran(56, 70)]
  },
  {
    id: "sign-fire",
    kind: "fire",
    caption: "Have you seen the fire you kindle? Is it you who made its tree grow, or Allah? He made fire for you from the green tree, as a reminder and a gift for travelers.",
    sources: [quran(56, 71), quran(56, 72), quran(56, 73), quran(36, 80)]
  },
  {
    id: "sign-shade",
    kind: "shade",
    caption: "See how your Lord stretches out the shade; had He willed, He would have made it stand still. He made the sun its guide, then He draws it in, little by little.",
    sources: [quran(25, 45), quran(25, 46)]
  },
  {
    id: "sign-foam",
    kind: "foam",
    caption:
      "Allah sends down rain and the valleys flow, each by its measure, and the flood carries foam on top; metal melted in the fire throws up foam too. The foam passes away, and what benefits people remains on the earth.",
    sources: [quran(13, 17)]
  },
  {
    id: "sign-lands",
    kind: "lands",
    caption:
      "The guidance he ﷺ brought is like rain falling on the earth. Good land takes it in and grows much grass; hard land holds the water, so people drink and water their animals; and barren land neither holds it nor grows anything.",
    sources: [quran(7, 58), bukhari("79")]
  },
  {
    id: "sign-ashes",
    kind: "ashes",
    caption: "The deeds of those who reject their Lord are like ashes that the wind blows hard on a stormy day: they can keep nothing of what they earned.",
    sources: [quran(14, 18)]
  },
  {
    id: "sign-garden",
    kind: "garden",
    caption: "The owners of a garden full of fruit swore to pick it all at dawn and give nothing to the poor. In the night, while they slept, a calamity from Allah came upon it, and by morning it was black and bare.",
    sources: [quran(68, 17), quran(68, 19), quran(68, 20), quran(68, 24)]
  },
  {
    id: "sign-two-gardens",
    kind: "twoGardens",
    caption:
      "A man had two gardens of grapes, with palms all around them, crops between them and a river flowing between them. But he grew proud and forgot his Lord, and all his fruit was destroyed, his vines fallen on their trellises.",
    sources: [quran(18, 32), quran(18, 33), quran(18, 35), quran(18, 42)]
  },
  {
    id: "sign-ark",
    kind: "ark",
    caption:
      "Nuh built the ark as Allah taught him, of planks and nails, and two of each kind were carried in it. The gates of the sky opened with pouring water and the earth burst with springs. The ark sailed on waves like mountains, and when the water was swallowed up, it came to rest on al-Judi.",
    sources: [quran(11, 37), quran(11, 40), quran(11, 42), quran(11, 44), quran(54, 11), quran(54, 12), quran(54, 13)]
  },
  {
    id: "sign-sea",
    kind: "sea",
    caption:
      "With Pharaoh's army behind them and the sea before them, Allah told Musa to strike the sea with his staff. It split apart, each side like a great mountain, and a dry path opened through the sea, so they crossed without fear.",
    sources: [quran(26, 61), quran(26, 63), quran(20, 77)]
  },
  {
    id: "sign-springs",
    kind: "springs",
    caption:
      "In the desert, Allah shaded the Children of Israel with clouds and sent down manna and quails for them. When Musa asked for water for his people, Allah told him to strike the rock with his staff, and twelve springs gushed out of it: each tribe knew its own drinking place.",
    sources: [quran(2, 57), quran(2, 60), quran(7, 160)]
  },
  {
    id: "sign-she-camel",
    kind: "sheCamel",
    caption:
      "Thamud carved homes out of the mountains with skill. Allah sent them a she-camel as a sign: she had her day to drink and they had theirs, each on a known day, and Salih told them not to touch her with harm.",
    sources: [quran(26, 149), quran(26, 155), quran(26, 156), quran(91, 13)]
  },
  {
    id: "sign-ants",
    kind: "ants",
    caption:
      "When Sulayman and his army came to the valley of the ants, an ant called out to the others to go into their homes, so that they would not be crushed without the army knowing. He smiled at her words and thanked Allah.",
    sources: [quran(27, 18), quran(27, 19)]
  },
  {
    id: "sign-hoopoe",
    kind: "hoopoe",
    caption:
      "Sulayman looked over the birds and found the hoopoe missing. It soon came back with sure news from Saba, where a woman ruled the people. So he sent it back with his letter, to deliver it to them and see what they would answer.",
    sources: [quran(27, 20), quran(27, 22), quran(27, 23), quran(27, 28)]
  },
  {
    id: "sign-dream",
    kind: "dream",
    caption:
      "The king dreamed of seven fat cows eaten by seven lean ones, and of seven green ears of grain and others dry. Yusuf told its meaning: sow for seven years and leave the harvest in its ears; then seven hard years will eat what was stored; then a year of rain will come.",
    sources: [quran(12, 43), quran(12, 47), quran(12, 48), quran(12, 49)]
  },
  {
    id: "sign-cave",
    kind: "cave",
    caption:
      "The young believers took shelter in the cave and asked Allah for mercy, and He made them sleep there for years. The rising sun turned away from their cave and the setting sun passed them by, and their dog lay stretched out at the entrance.",
    sources: [quran(18, 10), quran(18, 11), quran(18, 17), quran(18, 18)]
  },
  {
    id: "sign-elephant",
    kind: "elephant",
    caption:
      "An army came with an elephant to destroy the Ka'bah, but Allah held the elephant back from Makkah. He sent against them birds in flocks, throwing stones of baked clay, and made them like straw eaten by cattle.",
    sources: [quran(105, 1), quran(105, 2), quran(105, 3), quran(105, 4), quran(105, 5), bukhari("2731")]
  },
  {
    id: "sign-journeys",
    kind: "journeys",
    caption: "Allah made the winter and summer journeys easy for Quraysh. So let them worship the Lord of this House, who fed them against hunger and made them safe from fear.",
    sources: [quran(106, 1), quran(106, 2), quran(106, 3), quran(106, 4)]
  }
];

/**
 * The lessons that open on a scene, each read to check that it teaches what its scene shows (by the lesson's nodeId).
 * Left out: lessons that only touch a sign among other things (a whole passage of a surah), stories of people at sea,
 * and the Day of Judgment's seas and mountains. The gardens of the parables are drawn, never their owners. For the
 * stories, the lessons on the moment a scene shows; not the ones on what came before or after it (Pharaoh drowning,
 * Nuh's son, the queen's throne), nor the reviews, nor the lessons on the twelve paths through the sea (its scene
 * shows the one dry path of 20:77).
 */
export const SIGN_LESSONS: Record<string, string> = {
  // Rain on a dead land, which comes to life.
  "deep-araf2-winds-rain": "sign-rain",
  "deep-hajj1-dead-earth-comes-alive": "sign-rain",
  "deep-furqan2-winds-bring-good-news": "sign-rain",
  "deep-furqan2-rain-shared-out": "sign-rain",
  "deep-ankabut4-rain-and-praise": "sign-rain",
  "deep-rum1-living-from-the-dead": "sign-rain",
  "deep-rum4-the-traces-of-mercy": "sign-rain",
  "deep-sajdah2-water-to-dry-land": "sign-rain",
  "deep-fatir1-winds-and-dead-land": "sign-rain",
  "deep-yasin2-the-dead-land-lives": "sign-rain",
  "deep-fussilat3-the-earth-comes-alive": "sign-rain",
  "deep-zukhruf1-rain-in-due-measure": "sign-rain",
  "deep-qaf1-the-dead-land-lives": "sign-rain",
  "deep-qaf1-blessed-rain": "sign-rain",
  "deep-hadid3-life-to-the-dead-earth": "sign-rain",
  "deep-nahl4-rain-brings-earth-to-life": "sign-rain",
  "deep-nahl1-rain-brings-crops": "sign-rain",
  "deep-anam2-rain-gardens": "sign-rain",
  "deep-zumar2-rain-then-crops": "sign-rain",
  "deep-abasa2-rain-and-split-earth": "sign-rain",
  "deep-abasa2-look-at-your-food": "sign-rain",
  "surah-meaning-80-17-32": "sign-rain",
  "deep-jathiyah1-night-day-rain-and-wind": "sign-rain",
  // Lightning in fear and hope, then the rain that revives the dead land: a sign of the Resurrection (Quran 30:24).
  "deep-rum2-lightning-fear-and-hope": "sign-rain",
  // The clouds driven and piled up, the rain from within them.
  "deep-nur2-allah-drives-the-clouds": "sign-clouds",
  "deep-rum4-clouds-and-raindrops": "sign-clouds",
  "deep-hijr1-fertilizing-winds": "sign-clouds",
  "deep-raad2-lightning-fear-and-hope": "sign-clouds",
  // Green, then yellow, then broken straw.
  "deep-zumar2-green-then-yellow": "sign-fade",
  "deep-hadid3-yellow-then-straw": "sign-fade",
  "deep-hadid3-like-rain-and-crops": "sign-fade",
  "deep-kahf2-like-rain-on-plants": "sign-fade",
  "deep-yunus2-world-like-crops": "sign-fade",
  "deep-ala1-green-pasture-to-dry-stubble": "sign-fade",
  // The seed of seven ears.
  "deep-zakat-spend-seven-hundred": "sign-seed",
  "surah-meaning-2-261-266": "sign-seed",
  "deep-baqarah3-seven-hundred": "sign-seed",
  // The two seas.
  "deep-furqan2-the-two-seas": "sign-seas",
  "deep-fatir1-two-seas": "sign-seas",
  "deep-rahman1-two-seas-meet": "sign-seas",
  "deep-rahman1-a-barrier-between": "sign-seas",
  "surah-meaning-55-14-25": "sign-seas",
  // The ships.
  "surah-meaning-22-65-72": "sign-ships",
  "deep-hajj3-ships-and-the-sky": "sign-ships",
  "surah-meaning-45-12-21": "sign-ships",
  "deep-jathiyah1-the-sea-made-of-service": "sign-ships",
  "deep-isra3-ships-on-the-sea": "sign-ships",
  "deep-luqman2-ships-by-his-grace": "sign-ships",
  "deep-shura2-ships-like-mountains": "sign-ships",
  "deep-rahman1-ships-like-mountains": "sign-ships",
  "deep-nahl1-the-sea-and-ships": "sign-ships",
  // The earth spread out, the mountains like pegs.
  "deep-naba1-mountains-as-pegs": "sign-mountains",
  "deep-naba1-the-earth-as-a-bed": "sign-mountains",
  "surah-meaning-78-1-16": "sign-mountains",
  "deep-qaf1-the-earth-spread-out": "sign-mountains",
  "deep-fussilat1-mountains-and-blessings": "sign-mountains",
  "deep-mursalat2-firm-mountains-sweet-water": "sign-mountains",
  "deep-naml4-a-steady-earth": "sign-mountains",
  "deep-anbiya1-mountains-and-a-guarded-sky": "sign-mountains",
  "deep-naziat3-mountains-fixed-firmly": "sign-mountains",
  "deep-hijr1-earth-spread-out": "sign-mountains",
  "deep-raad1-earth-spread-out": "sign-mountains",
  "deep-nahl1-mountains-roads-stars": "sign-mountains",
  // The bee and its honey.
  "surah-meaning-16-66-70": "sign-bee",
  "deep-nahl4-the-bee-is-guided": "sign-bee",
  "deep-nahl4-honey-is-a-cure": "sign-bee",
  "deep-nahl4-let-him-drink-honey": "sign-bee",
  // The spider's house.
  "surah-meaning-29-31-44": "sign-spider",
  "deep-ankabut3-the-spiders-house": "sign-spider",
  // The good tree.
  "surah-meaning-14-22-27": "sign-tree",
  "deep-ibrahim3-the-goodly-tree": "sign-tree",
  "deep-ibrahim3-the-date-palm": "sign-tree",
  // Look at the camel, the sky, the mountains and the earth.
  "surah-meaning-88-17-26": "sign-look",
  "deep-ghashiyah3-look-at-the-camel": "sign-look",
  "deep-ghashiyah3-the-sky-raised-high": "sign-look",
  "deep-ghashiyah3-mountains-and-earth": "sign-look",
  "deep-ghashiyah3-spread-and-still-round": "sign-look",
  // The birds held up in the sky.
  "deep-mulk-birds": "sign-birds",
  "surah-meaning-67-15-22": "sign-birds",
  "deep-mulk3-birds-held-up": "sign-birds",
  "deep-mulk3-gliding-and-flapping": "sign-birds",
  "deep-nahl5-birds-held-in-the-sky": "sign-birds",
  "deep-nur2-birds-glorify-allah": "sign-birds",
  "surah-meaning-24-41-50": "sign-birds",
  // The seed you sow.
  "deep-waqiah3-what-you-sow": "sign-sow",
  "deep-waqiah3-who-makes-it-grow": "sign-sow",
  "surah-meaning-56-57-74": "sign-sow",
  // The water you drink.
  "deep-waqiah3-the-water-you-drink": "sign-water",
  "deep-waqiah3-down-from-the-clouds": "sign-water",
  "deep-waqiah3-a-dua-for-rain": "sign-water",
  "deep-waqiah3-it-could-be-salty": "sign-water",
  // The fire you kindle, from the green tree.
  "deep-waqiah3-the-fire-you-kindle": "sign-fire",
  "deep-waqiah3-green-trees-that-spark": "sign-fire",
  "deep-waqiah3-a-reminder-of-the-fire": "sign-fire",
  "deep-waqiah3-a-gift-for-travelers": "sign-fire",
  "deep-waqiah3-fire-for-everyone": "sign-fire",
  "deep-yasin3-fire-from-green-trees": "sign-fire",
  // The shade stretched out and drawn in.
  "deep-furqan2-the-spreading-shadow": "sign-shade",
  "surah-meaning-25-45-60": "sign-shade",
  // The foam on the flood.
  "deep-raad2-foam-on-the-flood": "sign-foam",
  "deep-raad2-metal-in-the-fire": "sign-foam",
  "deep-raad2-hearts-like-valleys": "sign-foam",
  // The rain on three lands.
  "deep-raad2-rain-on-three-lands": "sign-lands",
  "deep-araf2-good-land": "sign-lands",
  // The ashes in a stormy wind.
  "surah-meaning-14-13-21": "sign-ashes",
  "deep-ibrahim2-deeds-like-ashes": "sign-ashes",
  // The garden struck in the night.
  "surah-meaning-68-17-33": "sign-garden",
  "deep-qalam3-the-garden-owners": "sign-garden",
  "deep-qalam3-a-secret-plan": "sign-garden",
  "deep-qalam3-like-a-dark-night": "sign-garden",
  // The two gardens.
  "deep-kahf2-the-two-gardens": "sign-two-gardens",
  "deep-kahf2-the-garden-ruined": "sign-two-gardens",
  "surah-meaning-18-32-44": "sign-two-gardens",
  "quran-surah-kahf-wealth-and-gardens": "sign-two-gardens",
  // Nuh's ark: built, boarded, carried on the flood, at rest on al-Judi.
  "prophets-early-messengers-nuh-and-patience": "sign-ark",
  "intro-nuh": "sign-ark",
  "deep-prophet-nuh-mocked": "sign-ark",
  "deep-prophet-nuh-flood": "sign-ark",
  "deep-prophet-nuh-judi": "sign-ark",
  "surah-meaning-11-25-49": "sign-ark",
  "surah-meaning-23-23-32": "sign-ark",
  "surah-meaning-26-105-122": "sign-ark",
  "deep-araf3-the-ark": "sign-ark",
  "deep-yunus4-saved-in-the-ark": "sign-ark",
  "deep-hud2-build-the-ship": "sign-ark",
  "deep-hud2-they-mocked-the-ship": "sign-ark",
  "deep-hud2-no-mountain-saves": "sign-ark",
  "deep-hud2-the-ship-rests-on-judi": "sign-ark",
  "deep-muminun1-dua-of-the-ark": "sign-ark",
  "deep-shuara2-the-laden-ship": "sign-ark",
  "deep-ankabut2-the-ark-a-sign": "sign-ark",
  "deep-yasin2-the-laden-ship": "sign-ark",
  "deep-qamar1-planks-and-nails": "sign-ark",
  "deep-qamar1-under-our-protection": "sign-ark",
  "deep-qamar1-gates-of-heaven-open": "sign-ark",
  "deep-haqqah1-carried-in-the-ship": "sign-ark",
  // The sea split for Musa, with a dry path through it.
  "deep-prophet-musa-sea": "sign-sea",
  "surah-meaning-26-53-69": "sign-sea",
  "surah-meaning-2-47-59": "sign-sea",
  "deep-baqarah1-sea-parted": "sign-sea",
  "deep-taha2-a-dry-path-in-the-sea": "sign-sea",
  "deep-dukhan2-leave-the-sea-calm": "sign-sea",
  // The clouds' shade, the manna and the quails, and the twelve springs.
  "deep-prophet-musa-twelve-springs": "sign-springs",
  "surah-meaning-2-60-61": "sign-springs",
  "deep-baqarah1-manna": "sign-springs",
  "deep-baqarah1-springs": "sign-springs",
  "deep-baqarah1-onions": "sign-springs",
  "deep-araf5-twelve-springs": "sign-springs",
  // The she-camel of Salih among Thamud's homes carved in the mountains.
  "prophets-early-messengers-hud-and-salih": "sign-she-camel",
  "deep-prophet-salih-rock-homes": "sign-she-camel",
  "deep-prophet-salih-turns": "sign-she-camel",
  "deep-prophet-salih-wretched": "sign-she-camel",
  "surah-meaning-11-61-68": "sign-she-camel",
  "surah-meaning-26-141-159": "sign-she-camel",
  "surah-meaning-91-11-15": "sign-she-camel",
  "deep-araf3-salih-camel": "sign-she-camel",
  "deep-hud3-the-she-camel-of-allah": "sign-she-camel",
  "deep-hijr4-dwellers-of-al-hijr": "sign-she-camel",
  "deep-shuara3-the-she-camel": "sign-she-camel",
  "deep-shuara3-touch-her-not": "sign-she-camel",
  "deep-qamar2-the-she-camel": "sign-she-camel",
  "deep-qamar2-they-harmed-the-camel": "sign-she-camel",
  "deep-shams3-the-she-camel-of-allah": "sign-she-camel",
  // The ant who warned the others, and Sulayman's thanks.
  "prophets-power-and-deliverance-sulayman-and-gratitude": "sign-ants",
  "deep-prophet-sulayman-ant": "sign-ants",
  "deep-dua-prophets-sulayman-thanks": "sign-ants",
  "deep-naml1-valley-of-the-ants": "sign-ants",
  "deep-naml1-a-smile-not-a-roar": "sign-ants",
  "surah-meaning-27-15-31": "sign-ants",
  // The hoopoe's news from Saba, and the letter.
  "deep-prophet-sulayman-hoopoe": "sign-hoopoe",
  "deep-quranwomen-saba-queen": "sign-hoopoe",
  "deep-naml2-the-missing-hoopoe": "sign-hoopoe",
  "deep-naml2-a-clear-reason": "sign-hoopoe",
  "deep-naml2-news-from-saba": "sign-hoopoe",
  "deep-naml2-the-noble-letter": "sign-hoopoe",
  // The king's dream of seven cows and seven ears, and its meaning.
  "deep-prophet-yusuf-kings-dream": "sign-dream",
  "surah-meaning-12-43-49": "sign-dream",
  "deep-yusuf3-seven-fat-cows": "sign-dream",
  "deep-yusuf3-store-it-in-the-ear": "sign-dream",
  "deep-yusuf3-a-year-of-relief": "sign-dream",
  // The cave: the sun turning away, the dog at the entrance, the years of sleep.
  "quran-surah-kahf-faith-under-trial": "sign-cave",
  "surah-meaning-18-1-12": "sign-cave",
  "surah-meaning-18-13-17": "sign-cave",
  "surah-meaning-18-18-22": "sign-cave",
  "deep-kahf1-the-young-mens-dua": "sign-cave",
  "deep-dua-believers-cave-mercy": "sign-cave",
  "deep-kahf1-the-sun-passed-them-by": "sign-cave",
  "deep-kahf1-asleep-yet-seeming-awake": "sign-cave",
  "deep-kahf1-a-sign-among-many": "sign-cave",
  "deep-kahf1-a-day-or-part-of-a-day": "sign-cave",
  // The elephant held back, and the birds with their stones of baked clay.
  "surah-meaning-105-1-2": "sign-elephant",
  "surah-meaning-105-3-5": "sign-elephant",
  "deep-fil1-the-owners-of-the-elephant": "sign-elephant",
  "deep-fil1-the-great-elephant": "sign-elephant",
  "deep-fil1-the-house-has-its-lord": "sign-elephant",
  "deep-fil1-the-elephant-kneels": "sign-elephant",
  "deep-fil1-their-plot-went-astray": "sign-elephant",
  "deep-fil2-held-back-from-makkah": "sign-elephant",
  "deep-fil2-birds-in-flocks": "sign-elephant",
  "deep-fil2-three-small-stones": "sign-elephant",
  "deep-fil2-stones-of-sijjil": "sign-elephant",
  "deep-fil2-like-eaten-straw": "sign-elephant",
  "deep-fil2-they-gained-no-good": "sign-elephant",
  "deep-fil2-the-year-of-his-birth": "sign-elephant",
  // The winter and summer journeys of Quraysh.
  "surah-meaning-106-1-2": "sign-journeys",
  "surah-meaning-106-3-4": "sign-journeys",
  "deep-quraysh1-winter-and-summer-journeys": "sign-journeys",
  "deep-quraysh1-ilaf-bringing-together": "sign-journeys",
  "deep-quraysh1-honored-travelers": "sign-journeys",
  "deep-quraysh2-fed-against-hunger": "sign-journeys",
  "deep-quraysh2-safe-from-fear": "sign-journeys",
  "deep-quraysh2-worship-the-lord-of-the-house": "sign-journeys"
};

export type LessonSign = { scene: SignScene; lessonSlug: string };

/** The scene a lesson opens on, or undefined for a lesson that has none. */
export function signForLesson(lesson: { nodeId: string }): LessonSign | undefined {
  const id = SIGN_LESSONS[lesson.nodeId];
  const scene = id ? SIGN_SCENES.find((each) => each.id === id) : undefined;
  return scene ? { scene, lessonSlug: lesson.nodeId } : undefined;
}
