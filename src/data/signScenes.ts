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
 * - the camel, the sky, the mountains and the earth that we are told to look at (Quran 88:17 to 88:20).
 *
 * Each scene shows only what its ayahs say. Nothing in a scene is a person or an angel: only the land, the sky, the
 * sea, plants, animals and things.
 */

export type SignKind = "rain" | "clouds" | "fade" | "seed" | "seas" | "ships" | "mountains" | "bee" | "spider" | "tree" | "look";

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
  }
];

/**
 * The lessons that open on a scene, each read to check that it teaches what its scene shows (by the lesson's nodeId).
 * Left out: lessons that only touch a sign among other things (a whole passage of a surah), stories of people at sea
 * or in gardens, and the Day of Judgment's seas and mountains.
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
  "deep-ghashiyah3-spread-and-still-round": "sign-look"
};

export type LessonSign = { scene: SignScene; lessonSlug: string };

/** The scene a lesson opens on, or undefined for a lesson that has none. */
export function signForLesson(lesson: { nodeId: string }): LessonSign | undefined {
  const id = SIGN_LESSONS[lesson.nodeId];
  const scene = id ? SIGN_SCENES.find((each) => each.id === id) : undefined;
  return scene ? { scene, lessonSlug: lesson.nodeId } : undefined;
}
