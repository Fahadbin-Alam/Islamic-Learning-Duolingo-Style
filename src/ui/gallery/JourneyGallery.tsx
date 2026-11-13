import React, { useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { LESSONS_BY_ID } from "../../data/course";
import { DAY_SKY_LESSONS, SKY_STOPS, skyForLesson } from "../../data/daySky";
import { HAJJ_MAP_LESSONS, HAJJ_STOPS, hajjMapForLesson } from "../../data/hajjMap";
import { MOON_SCENES, moonForLesson } from "../../data/moonSky";
import { pictureForLesson } from "../../data/lessonPictures";
import { journeyForLesson, SEERAH_JOURNEYS } from "../../data/seerahMap";
import { SIGN_SCENES, signForLesson } from "../../data/signScenes";
import { setActiveLanguage } from "../../i18n";
import { localizeLessonContent } from "../../services/contentLocalization";
import type { Lesson, SupportedLanguage } from "../../types";
import { LearnCard, LessonScreen, getLessonLine } from "../lesson";
import { teacherFor } from "../lesson/Teacher";
import { DayOfPrayerBanner, DayOfPrayerSheet } from "../journey/DayOfPrayer";
import { DaySky } from "../journey/DaySky";
import { HajjMapBanner, HajjMapSheet } from "../journey/HajjMap";
import { JourneyMap } from "../journey/JourneyMap";
import { LifeMapBanner, LifeMapSheet } from "../journey/LifeMap";
import { MoonSky } from "../journey/MoonSky";
import { SignSceneView } from "../journey/SignScene";
import { colors, fonts, space } from "../theme";

/**
 * The Seerah and Hajj maps (src/ui/journey), for checking them by eye on the web:
 * #gallery-journey: every scene, with each lesson's own roads and touches (?still=0 lets them move);
 * #gallery-journey-lesson:<lesson id>: a Seerah, Hajj, sky, moon or sign lesson's first page as the app shows it (?lang=bn, ur or ar);
 * #gallery-journey-life: the map of his life ﷺ, playing;
 * #gallery-journey-hajj: the map of Hajj, playing;
 * #gallery-journey-prayer: the day of prayer in the sky, playing;
 * #gallery-journey-skies: every sky at its end (?still=0 plays them);
 * #gallery-journey-moons: every moon sky at its end (?still=0 plays them);
 * #gallery-journey-signs: every sign in creation at its end (?still=0 plays them).
 */

const noop = () => undefined;
const HEARTS = { current: 5, max: 5, unlimited: false };
const ACCENT = "#C9822B";

function language(): SupportedLanguage {
  const query = Platform.OS === "web" && typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("lang") : null;
  return (["en", "bn", "ur", "ar"].includes(query ?? "") ? query : "en") as SupportedLanguage;
}

function LessonStart({ lessonId }: { lessonId: string }) {
  setActiveLanguage(language());
  const english = (LESSONS_BY_ID[lessonId] ?? LESSONS_BY_ID["lesson-deep-seerah-hijrah-quba"]) as Lesson;
  const hajj = english.nodeId in HAJJ_MAP_LESSONS;
  const sky = english.nodeId in DAY_SKY_LESSONS;
  const journey = journeyForLesson(english) ?? hajjMapForLesson(english);
  const daySky = journey ? undefined : skyForLesson(english);
  // As in the app: the moon only for a lesson with no map and no day's sky.
  const moon = journey || daySky ? undefined : moonForLesson(english);
  const sign = journey || daySky || moon ? undefined : signForLesson(english);
  const lesson = localizeLessonContent(english, language());
  return (
    <LessonScreen progress={0.06} hearts={HEARTS} onClose={noop}>
      <LearnCard
        page="start"
        title={lesson.title}
        line={getLessonLine(lesson)}
        facts={lesson.learnFacts}
        learnSource={lesson.learnSource}
        picture={pictureForLesson(english)}
        journey={journey}
        sky={daySky}
        moon={moon}
        sign={sign}
        teacher={teacherFor(hajj ? "hajj" : sky ? "prayer" : moon ? "akhirah" : sign ? "quran_tafseer" : "prophets")}
        mascotVariant="boy"
        accent={ACCENT}
        onContinue={noop}
        onOpenSource={noop}
      />
    </LessonScreen>
  );
}

function LifeDemo() {
  setActiveLanguage(language());
  const [open, setOpen] = useState(true);
  return (
    <View style={styles.full}>
      <View style={styles.pad}>
        <LifeMapBanner accent={ACCENT} onOpen={() => setOpen(true)} />
      </View>
      <LifeMapSheet visible={open} onClose={() => setOpen(false)} accent={ACCENT} topGap={24} />
    </View>
  );
}

function HajjDemo() {
  setActiveLanguage(language());
  const [open, setOpen] = useState(true);
  return (
    <View style={styles.full}>
      <View style={styles.pad}>
        <HajjMapBanner accent={ACCENT} onOpen={() => setOpen(true)} />
      </View>
      <HajjMapSheet visible={open} onClose={() => setOpen(false)} accent={ACCENT} topGap={24} />
    </View>
  );
}

function PrayerDemo() {
  setActiveLanguage(language());
  const [open, setOpen] = useState(true);
  return (
    <View style={styles.full}>
      <View style={styles.pad}>
        <DayOfPrayerBanner accent={ACCENT} onOpen={() => setOpen(true)} />
      </View>
      <DayOfPrayerSheet visible={open} onClose={() => setOpen(false)} accent={ACCENT} topGap={24} />
    </View>
  );
}

/** Every sky, at its end (or playing, with ?still=0). */
function AllSkies() {
  setActiveLanguage(language());
  const moving = Platform.OS === "web" && typeof window !== "undefined" && new URLSearchParams(window.location.search).get("still") === "0";
  return (
    <ScrollView style={styles.full} contentContainerStyle={styles.wall}>
      {SKY_STOPS.map((stop) => (
        <View key={stop.scene.id} style={styles.wallItem} testID={`sky-${stop.scene.id}`}>
          <Text style={styles.caption}>{stop.scene.id}</Text>
          <View style={styles.mapBox}>
            <DaySky scene={stop.scene} width={360} height={270} still={!moving} />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

/** Every moon sky, at its end (or playing, with ?still=0). */
function AllMoons() {
  setActiveLanguage(language());
  const moving = Platform.OS === "web" && typeof window !== "undefined" && new URLSearchParams(window.location.search).get("still") === "0";
  return (
    <ScrollView style={styles.full} contentContainerStyle={styles.wall}>
      {MOON_SCENES.map((scene) => (
        <View key={scene.id} style={styles.wallItem} testID={`moon-${scene.id}`}>
          <Text style={styles.caption}>{scene.id}</Text>
          <View style={styles.mapBox}>
            <MoonSky scene={scene} width={360} height={270} still={!moving} />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

/** Every sign in creation, at its end (or playing, with ?still=0). */
function AllSigns() {
  setActiveLanguage(language());
  const moving = Platform.OS === "web" && typeof window !== "undefined" && new URLSearchParams(window.location.search).get("still") === "0";
  return (
    <ScrollView style={styles.full} contentContainerStyle={styles.wall}>
      {SIGN_SCENES.map((scene) => (
        <View key={scene.id} style={styles.wallItem} testID={`sign-${scene.id}`}>
          <Text style={styles.caption}>{scene.id}</Text>
          <View style={styles.mapBox}>
            <SignSceneView scene={scene} width={360} height={270} still={!moving} testID={`sign-scene-${scene.kind}`} />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

/** Every scene, and again for each lesson that adds its own road, note or touch; then the Hajj stops. */
function AllScenes() {
  setActiveLanguage(language());
  const moving = Platform.OS === "web" && typeof window !== "undefined" && new URLSearchParams(window.location.search).get("still") === "0";
  const items = SEERAH_JOURNEYS.flatMap((journey) =>
    journey.scenes.flatMap((scene, sceneIndex) => {
      const tagged = new Set<string>();
      [...scene.legs, ...(scene.effects ?? []), ...(scene.notes ?? [])].forEach((item) => item.lessons?.forEach((slug) => tagged.add(slug)));
      const focus = Object.entries(journey.lessons).find(([, own]) => (own.scene ?? 0) === sceneIndex && own.focus)?.[1].focus;
      return [{ key: scene.id, scene, slug: undefined as string | undefined, focus }, ...[...tagged].map((slug) => ({ key: `${scene.id}-${slug}`, scene, slug, focus: journey.lessons[slug]?.focus }))];
    })
  ).concat(HAJJ_STOPS.map((stop) => ({ key: stop.scene.id, scene: stop.scene, slug: undefined, focus: Object.values(HAJJ_MAP_LESSONS).find((own) => own.stop === stop.scene.id && own.focus)?.focus })));
  return (
    <ScrollView style={styles.full} contentContainerStyle={styles.wall}>
      {items.map((item) => (
        <View key={item.key} style={styles.wallItem} testID={`scene-${item.key}`}>
          <Text style={styles.caption}>{item.key}</Text>
          <View style={styles.mapBox}>
            <JourneyMap scene={item.scene} width={360} height={270} lessonSlug={item.slug} focus={item.focus} still={!moving} />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

export default function JourneyGallery({ hash }: { hash: string }) {
  if (hash.startsWith("#gallery-journey-lesson")) return <LessonStart key={hash} lessonId={decodeURIComponent(hash.split(":")[1] ?? "")} />;
  if (hash.startsWith("#gallery-journey-life")) return <LifeDemo />;
  if (hash.startsWith("#gallery-journey-hajj")) return <HajjDemo />;
  if (hash.startsWith("#gallery-journey-prayer")) return <PrayerDemo />;
  if (hash.startsWith("#gallery-journey-skies")) return <AllSkies />;
  if (hash.startsWith("#gallery-journey-moons")) return <AllMoons />;
  if (hash.startsWith("#gallery-journey-signs")) return <AllSigns />;
  return <AllScenes />;
}

const styles = StyleSheet.create({
  full: { flex: 1, backgroundColor: colors.snow },
  pad: { paddingTop: space.lg },
  wall: { flexDirection: "row", flexWrap: "wrap", padding: space.sm },
  wallItem: { width: 372, padding: space.xs },
  caption: { fontFamily: fonts.bodyBold, fontSize: 12, color: colors.inkSoft, marginBottom: 2 },
  mapBox: { width: 364, height: 274, borderWidth: 2, borderColor: colors.line, borderRadius: 12, overflow: "hidden" }
});
