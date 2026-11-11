import React, { useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { LESSONS_BY_ID } from "../../data/course";
import { pictureForLesson } from "../../data/lessonPictures";
import { journeyForLesson, SEERAH_JOURNEYS } from "../../data/seerahMap";
import { setActiveLanguage } from "../../i18n";
import { localizeLessonContent } from "../../services/contentLocalization";
import type { Lesson, SupportedLanguage } from "../../types";
import { LearnCard, LessonScreen, getLessonLine } from "../lesson";
import { teacherFor } from "../lesson/Teacher";
import { JourneyMap } from "../journey/JourneyMap";
import { LifeMapBanner, LifeMapSheet } from "../journey/LifeMap";
import { colors, fonts, space } from "../theme";

/**
 * The Seerah maps (src/ui/journey), for checking them by eye on the web:
 * #gallery-journey: every scene, with each lesson's own roads and touches;
 * #gallery-journey-lesson:<lesson id>: a Seerah lesson's first page as the app shows it (?lang=bn, ur or ar);
 * #gallery-journey-life: the map of his life ﷺ, playing.
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
        journey={journeyForLesson(english)}
        teacher={teacherFor("prophets")}
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

/** Every scene, and again for each lesson that adds its own road, note or touch. */
function AllScenes() {
  setActiveLanguage(language());
  const items = SEERAH_JOURNEYS.flatMap((journey) =>
    journey.scenes.flatMap((scene, sceneIndex) => {
      const tagged = new Set<string>();
      [...scene.legs, ...(scene.effects ?? []), ...(scene.notes ?? [])].forEach((item) => item.lessons?.forEach((slug) => tagged.add(slug)));
      const focus = Object.entries(journey.lessons).find(([, own]) => (own.scene ?? 0) === sceneIndex && own.focus)?.[1].focus;
      return [{ key: scene.id, scene, slug: undefined as string | undefined, focus }, ...[...tagged].map((slug) => ({ key: `${scene.id}-${slug}`, scene, slug, focus: journey.lessons[slug]?.focus }))];
    })
  );
  return (
    <ScrollView style={styles.full} contentContainerStyle={styles.wall}>
      {items.map((item) => (
        <View key={item.key} style={styles.wallItem} testID={`scene-${item.key}`}>
          <Text style={styles.caption}>{item.key}</Text>
          <View style={styles.mapBox}>
            <JourneyMap scene={item.scene} width={360} height={270} lessonSlug={item.slug} focus={item.focus} still />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

export default function JourneyGallery({ hash }: { hash: string }) {
  if (hash.startsWith("#gallery-journey-lesson")) return <LessonStart key={hash} lessonId={decodeURIComponent(hash.split(":")[1] ?? "")} />;
  if (hash.startsWith("#gallery-journey-life")) return <LifeDemo />;
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
